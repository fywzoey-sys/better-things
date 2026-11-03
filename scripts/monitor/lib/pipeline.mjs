/**
 * Orchestrates one monitoring run. READ-ONLY with respect to formal data: it receives deep clones,
 * and only returns a report object. Whoever calls it decides where the report is written.
 */
import { extractCandidates } from './extract.mjs';
import { compareExtraction, detectConflicts } from './compare.mjs';
import { checkLink } from './links.mjs';
import { EXTRACT_FIELDS } from './registry.mjs';
import { SOURCE_STATUS, PLACE_STATUS } from './status.mjs';

export async function runMonitor({ data, verification, sources, fetcher, mode, limitPlaces, allowHttpLinks = false, now = () => new Date() }) {
  const byPlace = new Map();
  for (const s of sources.sources) {
    if (s.enabled === false) continue;
    if (limitPlaces && !limitPlaces.includes(s.placeId)) continue;
    if (!byPlace.has(s.placeId)) byPlace.set(s.placeId, []);
    byPlace.get(s.placeId).push(s);
  }
  const cityName = new Map(data.CITIES.map((c) => [c.id, c.name]));
  const places = [];
  for (const [placeId, list] of byPlace) {
    const place = data.PLACES.find((p) => p.id === placeId);
    const vrec = (verification && verification.places && verification.places[placeId]) || null;
    const entry = { placeId, placeName: place.name, cityId: place.city, cityName: cityName.get(place.city) || place.city,
      status: PLACE_STATUS.UNCHANGED, sources: [], changes: [], conflicts: [], linkChecks: [], unresolved: [] };
    const ok = [];
    for (const source of list) {
      const page = await fetcher.fetchPage(source.url);
      const rec = { id: source.id, url: source.url, finalUrl: page.finalUrl, type: source.type || 'official', fetchedAt: page.fetchedAt,
        httpStatus: page.httpStatus, status: page.status, error: page.error || null, contentSha256: page.contentSha256, title: null, fieldsExtracted: [] };
      entry.sources.push(rec);
      if (page.status !== SOURCE_STATUS.OK) {
        entry.unresolved.push({ sourceId: source.id, reason: page.status, detail: page.error });
        continue;
      }
      const extraction = extractCandidates(page.body, { baseUrl: page.finalUrl, fields: source.extract || EXTRACT_FIELDS });
      rec.title = extraction.title; rec.fieldsExtracted = Object.keys(extraction.candidates);
      if (extraction.empty) {
        rec.status = SOURCE_STATUS.PARSE_FAILED; rec.error = '页面可访问，但未能按规则提取到任何候选字段';
        entry.unresolved.push({ sourceId: source.id, reason: 'parse_failed', detail: rec.error });
        continue;
      }
      ok.push({ source, page, extraction });
    }
    for (const o of ok) entry.changes.push(...compareExtraction(place, o.source, o.page, o.extraction, vrec));
    entry.conflicts = detectConflicts(ok);
    for (const o of ok) {
      const links = o.extraction.candidates.bookingLinks || [];
      const formalUrl = (place.bookingInfo.official || {}).url || '';
      for (const l of links.slice(0, 5)) {
        const res = await checkLink(fetcher, l.value, { allowHttp: allowHttpLinks });
        entry.linkChecks.push({ ...res, sourceId: o.source.id, evidence: l.evidence });
        if (res.result === 'invalid') entry.unresolved.push({ sourceId: o.source.id, reason: 'booking_link_invalid', detail: `${l.value}：${res.reason}` });
        else if (res.result === 'unverifiable') entry.unresolved.push({ sourceId: o.source.id, reason: 'booking_link_unverifiable', detail: `${l.value}：${res.reason}` });
        else if (l.value !== formalUrl) entry.changes.push({
          field: 'bookingLinks', fieldLabel: '官方预约链接', formalPath: 'bookingInfo.official.url', kind: formalUrl ? 'changed' : 'new_information',
          oldValue: formalUrl || null, candidateValue: [l.value], formalValuesNotFoundOnSource: [], evidence: [l.evidence],
          sourceId: o.source.id, sourceUrl: o.page.finalUrl, fetchedAt: o.page.fetchedAt, candidateVerificationStatus: 'unverified_candidate',
          currentFieldStatus: ((vrec && vrec.fields.officialBooking) || {}).status || 'unverified',
          suggestedAction: '链接可访问，但「可访问」不等于「是该地点的官方预约产品」：人工确认后才能写入，且须同时填写 source.url / source.note',
          uncertainty: '仅检查了可访问性；未验证该链接对应的地点与产品' });
      }
    }
    // status priority: conflict > link_invalid > candidate_changes > failures > unchanged
    const reasons = entry.unresolved.map((u) => u.reason);
    const allFailed = ok.length === 0;
    if (allFailed) {
      const r = entry.sources.map((s) => s.status);
      entry.status = r.includes('blocked') ? PLACE_STATUS.BLOCKED : r.includes('parse_failed') ? PLACE_STATUS.PARSE_FAILED
        : r.every((x) => x === 'robots_disallowed') ? PLACE_STATUS.SKIPPED : PLACE_STATUS.FETCH_FAILED;
    } else if (entry.conflicts.length) entry.status = PLACE_STATUS.CONFLICT;
    else if (reasons.includes('booking_link_invalid')) entry.status = PLACE_STATUS.LINK_INVALID;
    else if (entry.changes.length) entry.status = PLACE_STATUS.CANDIDATE_CHANGES;
    else if (reasons.length) entry.status = entry.sources.some((s) => s.status === 'parse_failed') ? PLACE_STATUS.PARSE_FAILED : PLACE_STATUS.FETCH_FAILED;
    // changes are kept for human reading, but flagged when sources disagree
    if (entry.conflicts.length) for (const c of entry.changes) { c.withheld = true; c.suggestedAction = '来源之间存在冲突，本候选值仅供参考：请先人工判断哪个来源更权威'; }
    places.push(entry);
  }
  return { places, generatedAt: now().toISOString(), mode };
}
