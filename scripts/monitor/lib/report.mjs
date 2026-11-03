/** Structured JSON + human-readable Markdown/HTML review reports. */
import { PLACE_STATUS_LABEL, FIELD_STATUS_LABEL } from './status.mjs';

export function buildReport({ run, hashes, runId, ghRun }) {
  const counts = {};
  for (const p of run.places) counts[p.status] = (counts[p.status] || 0) + 1;
  return {
    schemaVersion: 1, runId, generatedAt: run.generatedAt, mode: run.mode, github: ghRun || null,
    policy: '本报告只含「未核验候选信息」。未经人工批准不得写入正式数据；本次运行未修改任何正式数据文件。',
    integrity: { formalFilesUnchanged: hashes.unchanged, hashes: hashes.after },
    summary: { placesChecked: run.places.length, byStatus: counts,
      candidateChanges: run.places.reduce((n, p) => n + p.changes.length, 0), conflicts: run.places.reduce((n, p) => n + p.conflicts.length, 0) },
    places: run.places
  };
}

const esc = (s) => String(s ?? '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const md = (s) => String(s ?? '').replace(/\|/g, '\\|').replace(/\n/g, ' ');
const arr = (v) => (Array.isArray(v) ? v.join('；') : v);

export function toMarkdown(r) {
  const L = [];
  L.push(`# 好运地图｜待审核报告`, '', `- 运行编号：${r.runId}`, `- 生成时间：${r.generatedAt}　模式：${r.mode}`,
    `- 完整性：正式数据文件${r.integrity.formalFilesUnchanged ? '**未被修改** ✅' : '**检测到变化 ❌ 请勿使用本报告**'}`,
    `- ⚠️ ${r.policy}`, '', '## 概览', '', '| 状态 | 地点数 |', '|---|---|');
  for (const [k, v] of Object.entries(r.summary.byStatus)) L.push(`| ${PLACE_STATUS_LABEL[k] || k} | ${v} |`);
  L.push('', `候选变化条目：${r.summary.candidateChanges}　来源冲突：${r.summary.conflicts}`, '');
  for (const p of r.places) {
    L.push(`## ${p.cityName}｜${p.placeName}（${p.placeId}）— ${PLACE_STATUS_LABEL[p.status] || p.status}`, '');
    L.push('**来源**', '');
    for (const s of p.sources) L.push(`- \`${s.id}\` ${s.url} — ${s.status}${s.httpStatus ? ` (HTTP ${s.httpStatus})` : ''}，获取时间 ${s.fetchedAt}${s.error ? `，${s.error}` : ''}`);
    L.push('');
    if (p.changes.length) {
      L.push('**候选变化**（候选核验状态：未核验）', '', '| 字段 | 旧值（正式数据） | 候选新值 | 证据 | 来源 / 采集时间 | 当前字段状态 | 建议处理 | 不确定原因 |', '|---|---|---|---|---|---|---|---|');
      for (const c of p.changes) L.push(`| ${c.fieldLabel}${c.withheld ? '（⚠️冲突）' : ''} | ${md(c.oldValue ?? '（空）')} | ${md(arr(c.candidateValue))} | ${md(arr(c.evidence))} | ${c.sourceUrl}<br>${c.fetchedAt} | ${FIELD_STATUS_LABEL[c.currentFieldStatus] || c.currentFieldStatus} | ${md(c.suggestedAction)} | ${md(c.uncertainty || '—')} |`);
      L.push('');
    }
    if (p.conflicts.length) { L.push('**来源冲突**', ''); for (const c of p.conflicts) L.push(`- ${c.detail}：` + c.sources.map((s) => `${s.sourceId}=[${s.values.join('、')}]`).join(' vs ')); L.push(''); }
    if (p.linkChecks.length) { L.push('**预约链接检查**', ''); for (const l of p.linkChecks) L.push(`- ${l.url} → ${l.result}${l.reason ? `（${l.reason}）` : ''}`); L.push(''); }
    if (p.unresolved.length) { L.push('**无法确认的原因**', ''); for (const u of p.unresolved) L.push(`- [${u.reason}] ${u.sourceId}：${u.detail || ''}`); L.push(''); }
    if (p.status === 'unchanged') L.push('_无需处理。_', '');
  }
  return L.join('\n');
}

export function toHtml(r) {
  const rows = r.places.map((p) => `<section><h2>${esc(p.cityName)}｜${esc(p.placeName)} <small>${esc(p.placeId)}</small> — <span class="s-${esc(p.status)}">${esc(PLACE_STATUS_LABEL[p.status] || p.status)}</span></h2>
<ul>${p.sources.map((s) => `<li><code>${esc(s.id)}</code> ${esc(s.url)} — ${esc(s.status)} ${esc(s.fetchedAt)} ${esc(s.error || '')}</li>`).join('')}</ul>
${p.changes.length ? `<table><tr><th>字段</th><th>旧值</th><th>候选新值</th><th>证据</th><th>来源/时间</th><th>建议</th><th>不确定原因</th></tr>${p.changes.map((c) => `<tr><td>${esc(c.fieldLabel)}</td><td>${esc(c.oldValue ?? '（空）')}</td><td>${esc(arr(c.candidateValue))}</td><td>${esc(arr(c.evidence))}</td><td>${esc(c.sourceUrl)}<br>${esc(c.fetchedAt)}</td><td>${esc(c.suggestedAction)}</td><td>${esc(c.uncertainty || '—')}</td></tr>`).join('')}</table>` : ''}
${p.conflicts.map((c) => `<p class="warn">冲突：${esc(c.detail)}</p>`).join('')}
${p.unresolved.map((u) => `<p class="warn">无法确认 [${esc(u.reason)}] ${esc(u.sourceId)}：${esc(u.detail || '')}</p>`).join('')}</section>`).join('\n');
  return `<!doctype html><html lang="zh-CN"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex"><title>好运地图 待审核报告 ${esc(r.runId)}</title>
<style>body{font:15px/1.6 system-ui,sans-serif;max-width:1100px;margin:24px auto;padding:0 16px}table{border-collapse:collapse;width:100%;margin:8px 0}td,th{border:1px solid #ccc;padding:6px;vertical-align:top;word-break:break-all}.warn{color:#a40}small{color:#777}</style></head><body>
<h1>好运地图｜待审核报告</h1><p>运行 ${esc(r.runId)} · ${esc(r.generatedAt)} · 模式 ${esc(r.mode)} · 正式数据${r.integrity.formalFilesUnchanged ? '未被修改' : '检测到变化，请勿使用'}</p><p><strong>${esc(r.policy)}</strong></p>${rows}</body></html>`;
}
