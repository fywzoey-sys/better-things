#!/usr/bin/env node
/**
 * One-off, deterministic migration: derive field-level verification records from the EXISTING data.js.
 * Writes data/monitor/verification.json ONLY (never data.js). Refuses to overwrite unless --force.
 * Rule: nothing becomes "verified" unless the existing record already says 已核实 (with a source URL);
 * missing information is "not_supplied"/"unverified" and is never read as "cannot be booked".
 */
import { writeFile, access } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadFormalData } from './lib/data-loader.mjs';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
const target = resolve(ROOT, 'data/monitor/verification.json');
if (!process.argv.includes('--force')) { try { await access(target); console.error('verification.json 已存在；如需重新生成请加 --force（会覆盖人工维护的状态！）'); process.exit(1); } catch { /* ok */ } }
const data = await loadFormalData(resolve(ROOT, 'js/data.js'));

const baseStatus = (v) => /^已核实/.test(v || '') ? 'verified' : /部分核实|冲突|待确认|待核实|待寺院确认|需.*核实|修正/.test(v || '') ? 'needs_review' : 'unverified';
const places = {};
for (const p of data.PLACES) {
  const bi = p.bookingInfo || {}, src = { url: p.sourceUrl || '', label: p.source || '' };
  const base = baseStatus(p.verificationStatus);
  const f = (status, value, extra = {}) => ({ status: value === '' || value == null ? 'not_supplied' : status, source: src, verifiedAt: status === 'verified' ? (p.verifiedAt || null) : null, lastCollectedAt: null, note: '', ...extra });
  const warn = (s) => (s || '').includes('⚠️');
  const off = bi.official || {};
  const offStatus = off.status === 'verified' || off.status === 'not_required' || off.status === 'unavailable' ? 'verified' : 'unverified';
  const platforms = {};
  for (const [name, rec] of Object.entries(bi.platforms || {})) platforms[name] = { status: rec.status === 'verified' ? 'verified' : 'unverified', source: rec.source && rec.source.url ? { url: rec.source.url, label: rec.source.label || '' } : { url: '', label: '' }, verifiedAt: rec.status === 'verified' ? (bi.verifiedAt || null) : null, lastCollectedAt: null, note: '' };
  places[p.id] = {
    cityId: p.city,
    lastCollectedAt: null,
    lastFactCheckedAt: p.verifiedAt || null,
    sourceStatusText: p.verificationStatus || '',
    fields: {
      basicInfo: f(base, p.name),
      address: f(warn(p.address) ? 'needs_review' : base, p.address),
      openStatus: f(bi.openStatus === 'unknown' || !bi.openStatus ? 'unverified' : base, bi.openStatus ? 'x' : ''),
      openingHours: f(warn(bi.openScheduleNote) ? 'needs_review' : base, bi.openScheduleNote),
      ticket: f(warn(bi.ticketNote) ? 'needs_review' : base, bi.ticketNote),
      officialBooking: { status: offStatus, source: off.source && off.source.url ? { url: off.source.url, label: off.source.label || '' } : src, verifiedAt: offStatus === 'verified' ? (bi.verifiedAt || null) : null, lastCollectedAt: null, note: '开放状态/预约入口未核验不代表不可预约' },
      platformBooking: platforms
    },
    migration: { at: new Date().toISOString().slice(0, 10), from: 'js/data.js (V1.0 bookingInfo + verificationStatus text)', rule: 'verified 仅当原核验文本以「已核实」开头；含⚠️的字段降为 needs_review；预约/平台 pending → unverified；本次迁移未访问任何外部来源' }
  };
}
const doc = { schemaVersion: 1, statusMeaning: { not_supplied: '未补充', unverified: '未核验', verified: '已核验', needs_review: '需要复核', not_applicable: '不适用' },
  note: '字段级核验状态的唯一维护处。正式展示数据仍在 js/data.js。人工核验后在此更新 status/verifiedAt/source。', places };
await writeFile(target, JSON.stringify(doc, null, 2) + '\n');
console.log(`已生成 ${target}（${Object.keys(places).length} 个地点）`);
