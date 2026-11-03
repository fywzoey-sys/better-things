/** Compare candidate values against FORMAL values (read-only). Produces review records, never patches. */
import { timeTokens, ticketTokens, reservationSignal } from './extract.mjs';

export const FIELD_LABEL = {
  openingHours: '开放时间', ticket: '门票/费用', address: '地址', reservationPolicy: '预约政策', bookingLinks: '官方预约链接'
};
export const FORMAL_PATH = {
  openingHours: 'bookingInfo.openScheduleNote', ticket: 'bookingInfo.ticketNote', address: 'address',
  reservationPolicy: 'bookingInfo.official.status', bookingLinks: 'bookingInfo.official.url'
};
const VERIFICATION_KEY = { openingHours: 'openingHours', ticket: 'ticket', address: 'address', reservationPolicy: 'officialBooking', bookingLinks: 'officialBooking' };
const normAddr = (s) => (s || '').replace(/[\s,，。.、()（）⚠️]/gu, '').replace(/^中国/, '');
/** Street-level tail after the last province/city/district marker, so "…西湖区法云弄1号" == "…灵隐路法云弄1号" but "1号" != "2号". */
const addrTail = (s) => { const n = normAddr(s); const m = [...n.matchAll(/[省市区县]/g)].pop(); return m ? n.slice(m.index + 1) : n; };
export function sameAddress(a, b) {
  const x = normAddr(a), y = normAddr(b);
  if (!x || !y) return false;
  if (x.includes(y) || y.includes(x)) return true;
  const tx = addrTail(a), ty = addrTail(b);
  return tx.length >= 3 && ty.length >= 3 && (tx.endsWith(ty) || ty.endsWith(tx));
}

export function formalValue(place, field) {
  const bi = place.bookingInfo || {};
  switch (field) {
    case 'openingHours': return bi.openScheduleNote || '';
    case 'ticket': return bi.ticketNote || '';
    case 'address': return place.address || '';
    case 'reservationPolicy': {
      const st = bi.official && bi.official.status;
      if (st === 'not_required') return '无需预约';
      if (st === 'verified') return '需预约';
      const sig = reservationSignal(`${bi.openScheduleNote || ''} ${bi.ticketNote || ''}`);
      return sig ? sig.value : '';
    }
    case 'bookingLinks': return (bi.official && bi.official.url) || '';
    default: return '';
  }
}
export function formalTokens(place, field) {
  const v = formalValue(place, field);
  if (field === 'openingHours') return [...timeTokens(v).keys()];
  if (field === 'ticket') return [...ticketTokens(v).keys()];
  return v ? [v] : [];
}

function suggest(currentStatus, kind) {
  if (currentStatus === 'verified') return '该字段当前为「已核验」：请人工打开来源核对后再决定是否修改，禁止直接覆盖';
  if (kind === 'new_information') return '正式数据尚无该信息：人工核对来源后可补充，并将字段标记为「已核验」';
  return '人工打开来源核对；确认后更新正式数据并更新核验状态，否则忽略本条';
}

/** @returns {Array} change records for one source's extraction */
export function compareExtraction(place, source, page, extraction, verificationRec) {
  const changes = [];
  const fieldsStatus = (verificationRec && verificationRec.fields) || {};
  for (const [field, items] of Object.entries(extraction.candidates)) {
    if (field === 'bookingLinks') continue; // handled by link check in run.mjs
    const formalText = formalValue(place, field);
    const current = (fieldsStatus[VERIFICATION_KEY[field]] || {}).status || 'unverified';
    const values = [...new Set(items.map((i) => i.value))];
    let diff, kind = formalText ? 'changed' : 'new_information', formalOnly = [];
    if (field === 'openingHours' || field === 'ticket') {
      const f = new Set(formalTokens(place, field));
      diff = values.filter((v) => !f.has(v));
      formalOnly = [...f].filter((v) => !values.includes(v));
      if (f.size === 0) kind = 'new_information';
    } else if (field === 'address') {
      diff = sameAddress(values[0], formalText) ? [] : values;
    } else if (field === 'reservationPolicy') {
      const f = formalValue(place, field);
      diff = values.filter((v) => v !== f);
      kind = f ? 'changed' : 'new_information';
    }
    if (!diff.length) continue;
    changes.push({
      field, fieldLabel: FIELD_LABEL[field], formalPath: FORMAL_PATH[field], kind,
      oldValue: formalText || null, candidateValue: diff, formalValuesNotFoundOnSource: formalOnly,
      evidence: items.filter((i) => diff.includes(i.value)).map((i) => i.evidence),
      sourceId: source.id, sourceUrl: page.finalUrl, fetchedAt: page.fetchedAt,
      candidateVerificationStatus: 'unverified_candidate', currentFieldStatus: current,
      suggestedAction: suggest(current, kind),
      uncertainty: formalOnly.length ? `正式数据中的 ${formalOnly.join('、')} 未在该来源页面出现（可能是其他来源或季节性安排），不视为已失效` : null
    });
  }
  return changes;
}

/** Detect disagreements between multiple sources (or inside one source) for the same place. */
export function detectConflicts(perSource) {
  const conflicts = [];
  const fields = new Set(perSource.flatMap((s) => Object.keys(s.extraction.candidates)));
  fields.delete('bookingLinks');
  for (const field of fields) {
    const sets = perSource.filter((s) => s.extraction.candidates[field]).map((s) => ({
      sourceId: s.source.id, url: s.page.finalUrl,
      values: [...new Set(s.extraction.candidates[field].map((i) => i.value))],
      evidence: s.extraction.candidates[field].map((i) => i.evidence)
    }));
    for (const s of perSource) {
      const items = s.extraction.candidates[field] || [];
      if (items.some((i) => i.internalConflict)) conflicts.push({ field, fieldLabel: FIELD_LABEL[field], kind: 'internal', detail: `来源 ${s.source.id} 同一页面对「${FIELD_LABEL[field]}」表述自相矛盾`, sources: sets.filter((x) => x.sourceId === s.source.id) });
    }
    for (let i = 0; i < sets.length; i++) for (let j = i + 1; j < sets.length; j++) {
      const A = new Set(sets[i].values), B = new Set(sets[j].values);
      const sub = (x, y) => [...x].every((v) => y.has(v));
      const differ = field === 'address'
        ? !sameAddress(sets[i].values[0], sets[j].values[0])
        : (field === 'reservationPolicy' ? [...A].join() !== [...B].join() : !sub(A, B) && !sub(B, A));
      if (differ) conflicts.push({ field, fieldLabel: FIELD_LABEL[field], kind: 'cross_source', detail: `来源 ${sets[i].sourceId} 与 ${sets[j].sourceId} 对「${FIELD_LABEL[field]}」给出不一致的值`, sources: [sets[i], sets[j]] });
    }
  }
  return conflicts;
}
