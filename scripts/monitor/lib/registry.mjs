/**
 * City / place / source registry validation. A new city needs only data (BT.CITIES entry, its places,
 * a verification record per place and optional source entries) — no collector or component code.
 */
import { FIELD_STATUS_VALUES } from './status.mjs';

export const CITY_ID_RE = /^[a-z][a-z0-9-]{1,31}$/;
export const PLACE_ID_RE = /^[a-z][a-z0-9]*(-[a-z0-9]+)+$/;
export const EXTRACT_FIELDS = ['openingHours', 'ticket', 'address', 'reservationPolicy', 'bookingLinks'];

export function validateRegistry({ data, verification, sources }) {
  const errors = [];
  const err = (m) => errors.push(m);
  const cityIds = new Set();
  for (const c of data.CITIES) {
    if (!CITY_ID_RE.test(c.id || '')) err(`城市 ID 不合法: ${c.id}`);
    if (cityIds.has(c.id)) err(`城市 ID 重复: ${c.id}`);
    cityIds.add(c.id);
    if (!c.name) err(`城市 ${c.id} 缺少 name`);
  }
  const placeIds = new Set();
  for (const p of data.PLACES) {
    if (!PLACE_ID_RE.test(p.id || '')) err(`地点 ID 不合法: ${p.id}`);
    if (placeIds.has(p.id)) err(`地点 ID 重复: ${p.id}`);
    placeIds.add(p.id);
    if (!cityIds.has(p.city)) err(`地点 ${p.id} 引用了未注册的城市 ${p.city}`);
    if (!p.name) err(`地点 ${p.id} 缺少 name`);
    if (!p.bookingInfo || typeof p.bookingInfo !== 'object') err(`地点 ${p.id} 缺少 bookingInfo`);
  }
  if (verification) {
    if (verification.schemaVersion !== 1) err('verification.schemaVersion 必须为 1');
    const vp = verification.places || {};
    for (const id of placeIds) if (!vp[id]) err(`地点 ${id} 缺少字段核验记录 (data/monitor/verification.json)`);
    for (const [id, rec] of Object.entries(vp)) {
      const place = data.PLACES.find((p) => p.id === id);
      if (!place) { err(`核验记录 ${id} 没有对应地点`); continue; }
      if (rec.cityId !== place.city) err(`核验记录 ${id} 的 cityId 与地点不一致`);
      const check = (name, v) => {
        if (!FIELD_STATUS_VALUES.includes(v && v.status)) err(`${id}.${name} 状态非法: ${v && v.status}`);
        else if (v.status === 'verified' && !(v.source && v.source.url)) err(`${id}.${name} 标记为已核验但缺少来源`);
      };
      for (const [f, v] of Object.entries(rec.fields || {})) {
        if (f === 'platformBooking') for (const [plat, pv] of Object.entries(v || {})) check(`platformBooking.${plat}`, pv);
        else check(f, v);
      }
    }
  }
  if (sources) {
    if (sources.schemaVersion !== 1) err('sources.schemaVersion 必须为 1');
    const seen = new Set();
    for (const s of sources.sources || []) {
      if (!s.id || seen.has(s.id)) err(`来源 ID 缺失或重复: ${s.id}`);
      seen.add(s.id);
      if (!placeIds.has(s.placeId)) err(`来源 ${s.id} 引用了不存在的地点 ${s.placeId}`);
      try { const u = new URL(s.url); if (!/^https?:$/.test(u.protocol)) throw 0; } catch { err(`来源 ${s.id} 的 URL 不合法: ${s.url}`); }
      const fields = s.extract || EXTRACT_FIELDS;
      for (const f of fields) if (!EXTRACT_FIELDS.includes(f)) err(`来源 ${s.id} 含未知提取字段 ${f}`);
    }
  }
  return errors;
}
