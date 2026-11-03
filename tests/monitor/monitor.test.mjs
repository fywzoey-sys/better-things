// Run: node --test tests/monitor/
import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, readFile, writeFile, readdir, cp } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join, resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';
import http from 'node:http';
import { loadFormalData, sha256File } from '../../scripts/monitor/lib/data-loader.mjs';
import { validateRegistry } from '../../scripts/monitor/lib/registry.mjs';
import { createFetcher } from '../../scripts/monitor/lib/fetcher.mjs';
import { runMonitor } from '../../scripts/monitor/lib/pipeline.mjs';
import { startSampleServer, pageFor } from '../../scripts/monitor/lib/sample.mjs';
import { buildReport, toMarkdown, toHtml } from '../../scripts/monitor/lib/report.mjs';
import { buildPullRequestPlan } from '../../scripts/monitor/lib/pr-interface.mjs';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
const DATA_JS = join(ROOT, 'js/data.js');
const data = await loadFormalData(DATA_JS);
const verification = JSON.parse(await readFile(join(ROOT, 'data/monitor/verification.json'), 'utf8'));
const mkFetcher = () => createFetcher({ delayMs: 0, allowLocal: true, timeoutMs: 3000 });
const deepFreeze = (o) => { Object.values(o).forEach((v) => typeof v === 'object' && v && deepFreeze(v)); return Object.freeze(o); };
const place = (run, id) => run.places.find((p) => p.placeId === id);

async function withSample(fn) {
  const server = await startSampleServer(data);
  try { return await fn(server); } finally { await server.close(); }
}
const runSample = (server, extra = {}) => runMonitor({ data: deepFreeze(structuredClone(data)), verification: deepFreeze(structuredClone(verification)), sources: server.sources, fetcher: mkFetcher(), mode: 'sample', allowHttpLinks: true, ...extra });

test('0. 注册/数据校验通过，且 19 个地点、3 个城市保持不变', () => {
  assert.deepEqual(validateRegistry({ data, verification, sources: { schemaVersion: 1, sources: [] } }), []);
  assert.equal(data.PLACES.length, 19);
  assert.deepEqual(data.CITIES.map((c) => c.id), ['shanghai', 'beijing', 'hangzhou']);
  assert.equal(new Set(data.PLACES.map((p) => p.id)).size, 19);
});

test('0b. 真实来源配置有效：5 个已有地点', async () => {
  const sources = JSON.parse(await readFile(join(ROOT, 'data/monitor/sources.json'), 'utf8'));
  assert.equal(sources.sources.length, 5);
  assert.equal(sources.sources.filter((x) => x.enabled !== false).length, 4); // 雍和宫 403，已停用
  assert.deepEqual(validateRegistry({ data, verification, sources }), []);
});

test('1. 来源正常且数据未变化', () => withSample(async (srv) => {
  const run = await runSample(srv);
  const p = place(run, 'bj-guozijian');
  assert.equal(p.status, 'unchanged'); assert.equal(p.changes.length, 0); assert.equal(p.unresolved.length, 0);
  assert.equal(p.sources[0].status, 'ok'); assert.ok(p.sources[0].fetchedAt); assert.ok(p.sources[0].contentSha256);
}));

test('2. 来源正常且发现候选变化（含旧值/新值/证据/来源/时间/建议）', () => withSample(async (srv) => {
  const p = place(await runSample(srv), 'hz-lingyin');
  assert.equal(p.status, 'candidate_changes');
  const hours = p.changes.find((c) => c.field === 'openingHours');
  assert.deepEqual(hours.candidateValue, ['07:00-18:30']);
  assert.match(hours.oldValue, /07:30-17:30/);
  assert.ok(hours.evidence[0].includes('07:00-18:30'));
  assert.match(hours.sourceUrl, /\/changed$/); assert.ok(hours.fetchedAt);
  assert.equal(hours.candidateVerificationStatus, 'unverified_candidate');
  assert.equal(hours.currentFieldStatus, 'verified');           // 已核验字段
  assert.match(hours.suggestedAction, /禁止直接覆盖/);
  assert.ok(p.changes.find((c) => c.field === 'address'));
}));

test('3. 访问失败（HTTP 500 / 连接被拒 / 验证码）不产生候选，不改正式数据', () => withSample(async (srv) => {
  const sources = { schemaVersion: 1, sources: [...srv.sources.sources, { id: 'dead-port', placeId: 'hz-jingci', url: 'http://127.0.0.1:1/x' }] };
  const run = await runSample(srv, { sources });
  assert.equal(place(run, 'bj-wutasi').status, 'fetch_failed');
  assert.equal(place(run, 'hz-jingci').status, 'fetch_failed');
  const cap = place(run, 'sh-longhua');
  assert.equal(cap.status, 'blocked'); assert.match(cap.unresolved[0].detail, /未尝试绕过/);
  for (const id of ['bj-wutasi', 'hz-jingci', 'sh-longhua']) assert.equal(place(run, id).changes.length, 0);
}));

test('3b. 无法解析：页面可访问但提取不到字段', async () => {
  const s = http.createServer((q, r) => { r.writeHead(200, { 'content-type': 'text/html' }); r.end(q.url === '/robots.txt' ? '' : '<html><body>欢迎光临</body></html>'); });
  await new Promise((ok) => s.listen(0, '127.0.0.1', ok));
  try {
    const sources = { schemaVersion: 1, sources: [{ id: 'empty', placeId: 'sh-yufo', url: `http://127.0.0.1:${s.address().port}/` }] };
    const run = await runMonitor({ data, verification, sources, fetcher: mkFetcher(), mode: 'sample' });
    assert.equal(run.places[0].status, 'parse_failed'); assert.equal(run.places[0].changes.length, 0);
  } finally { s.close(); }
});

test('3c. robots.txt 禁止 / 跨站重定向 / 内网地址 均不抓取', async () => {
  const s = http.createServer((q, r) => {
    if (q.url === '/robots.txt') { r.writeHead(200); return r.end('User-agent: *\nDisallow: /private\n'); }
    if (q.url === '/redir') { r.writeHead(302, { location: 'http://example.org/' }); return r.end(); }
    r.writeHead(200, { 'content-type': 'text/html' }); r.end('x');
  });
  await new Promise((ok) => s.listen(0, '127.0.0.1', ok));
  const base = `http://127.0.0.1:${s.address().port}`;
  try {
    const f = mkFetcher();
    assert.equal((await f.fetchPage(base + '/private/a')).status, 'robots_disallowed');
    assert.equal((await f.fetchPage(base + '/redir')).status, 'redirect_offsite');
    const strict = createFetcher({ delayMs: 0 });
    const r = await strict.fetchPage(base + '/ok');
    assert.equal(r.status, 'fetch_failed'); assert.match(r.error, /内网/);
  } finally { s.close(); }
});

test('4. 来源数据冲突：保留证据但标记 withheld，不给出采纳建议', () => withSample(async (srv) => {
  const p = place(await runSample(srv), 'bj-yonghegong');
  assert.equal(p.status, 'conflict');
  assert.ok(p.conflicts.length >= 2);
  assert.ok(p.changes.every((c) => c.withheld === true));
  assert.ok(buildPullRequestPlan({ runId: 'x', places: [p] }, { approved: p.changes.map((c) => `${p.placeId}:${c.field}:${c.sourceId}`) }).operations.length === 0, '冲突条目即使被勾选也不会进入 PR 计划');
}));

test('5. 预约链接无效被识别，有效链接仅作为未核验候选', () => withSample(async (srv) => {
  const p = place(await runSample(srv), 'sh-yufo');
  assert.equal(p.status, 'link_invalid');
  assert.equal(p.linkChecks.find((l) => l.url.endsWith('/dead')).result, 'invalid');
  assert.equal(p.linkChecks.find((l) => l.url.endsWith('/ok')).result, 'ok');
  assert.ok(p.unresolved.some((u) => u.reason === 'booking_link_invalid'));
  const link = p.changes.find((c) => c.field === 'bookingLinks');
  assert.equal(link.candidateVerificationStatus, 'unverified_candidate'); assert.match(link.uncertainty, /未验证/);
}));

test('5b. 预约链接规则：非 HTTPS、首页、含凭证均无效', async () => {
  const { checkLink } = await import('../../scripts/monitor/lib/links.mjs');
  const f = mkFetcher();
  for (const u of ['http://a.example.com/book', 'https://a.example.com/', 'https://user:pw@a.example.com/b', 'not a url'])
    assert.equal((await checkLink(f, u)).result, 'invalid', u);
});

test('6. 未核验候选与正式数据隔离', () => withSample(async (srv) => {
  const frozen = deepFreeze(structuredClone(data));       // 任何写入都会在严格模式下抛错
  const before = await Promise.all(['js/data.js', 'data/reviewed-content.json', 'data/monitor/verification.json'].map((f) => sha256File(join(ROOT, f))));
  const run = await runMonitor({ data: frozen, verification: deepFreeze(structuredClone(verification)), sources: srv.sources, fetcher: mkFetcher(), mode: 'sample', allowHttpLinks: true });
  const after = await Promise.all(['js/data.js', 'data/reviewed-content.json', 'data/monitor/verification.json'].map((f) => sha256File(join(ROOT, f))));
  assert.deepEqual(before, after);
  assert.deepEqual(JSON.parse(JSON.stringify(frozen)), data);
  for (const p of run.places) for (const c of p.changes) assert.equal(c.candidateVerificationStatus, 'unverified_candidate');
  // 前端不引用任何监测产物
  const files = [...(await readdir(join(ROOT, 'js'))).map((f) => 'js/' + f), 'index.html', 'place.html', 'discover.html', 'weekly.html'];
  for (const f of files) assert.doesNotMatch(await readFile(join(ROOT, f), 'utf8'), /reports\/|data\/monitor|report\.json|unverified_candidate/, f);
}));

test('8. 报告：JSON/Markdown/HTML 含全部必需信息', () => withSample(async (srv) => {
  const run = await runSample(srv);
  const report = buildReport({ run, hashes: { unchanged: true, after: {} }, runId: 't1' });
  const md = toMarkdown(report), html = toHtml(report);
  for (const k of ['地点名称', '候选变化'].slice(1)) assert.ok(md.includes(k));
  for (const s of ['灵隐寺', '杭州', '开放时间', '07:00-18:30', '旧值（正式数据）', '候选新值', '证据', '来源 / 采集时间', '建议处理', '不确定原因', '无法确认的原因', '未核验', 'http://127.0.0.1']) assert.ok(md.includes(s), s);
  assert.ok(html.includes('<table>') && !/<script/i.test(html));
  const c = report.places.find((p) => p.placeId === 'hz-lingyin').changes[0];
  for (const k of ['field', 'oldValue', 'candidateValue', 'sourceUrl', 'evidence', 'fetchedAt', 'candidateVerificationStatus', 'suggestedAction']) assert.ok(k in c, k);
  assert.ok(toHtml({ ...report, places: [{ ...report.places[0], placeName: '<img src=x onerror=1>' }] }).includes('&lt;img'));
}));

test('7. CLI 端到端 + 工作流静态检查（真实 GitHub 运行需在仓库里手动触发，见 MONITOR-V1.md）', async () => {
  const out = await mkdtemp(join(tmpdir(), 'mon-'));
  const r = spawnSync('node', [join(ROOT, 'scripts/monitor/run.mjs'), '--sample', '--delay', '0', '--out', out, '--run-id', 'cli'], { encoding: 'utf8' });
  assert.equal(r.status, 0, r.stderr + r.stdout);
  for (const f of ['report.json', 'report.md', 'report.html']) assert.ok((await readFile(join(out, 'cli', f), 'utf8')).length > 100);
  const rep = JSON.parse(await readFile(join(out, 'cli/report.json'), 'utf8'));
  assert.equal(rep.integrity.formalFilesUnchanged, true);
  // 输出到正式数据目录会被拒绝
  const bad = spawnSync('node', [join(ROOT, 'scripts/monitor/run.mjs'), '--sample', '--out', join(ROOT, 'data/monitor/x')], { encoding: 'utf8' });
  assert.equal(bad.status, 1);
  const wf = await readFile(join(ROOT, '.github/workflows/place-monitor.yml'), 'utf8');
  assert.match(wf, /workflow_dispatch:/); assert.match(wf, /contents:\s*read/); assert.match(wf, /upload-artifact@/);
  assert.doesNotMatch(wf, /contents:\s*write|git push|git commit|pull-requests:\s*write/);
  assert.match(wf, /#\s*-\s*cron:\s*'23 1 \* \* 1'/);   // 每周一 09:23 Asia/Shanghai = 01:23 UTC，默认注释，首次手动运行成功后启用
});

test('9. 原有前端不变：既有预约组件测试通过', () => {
  const r = spawnSync('node', [join(ROOT, 'tests/booking.cjs')], { encoding: 'utf8', cwd: ROOT });
  assert.equal(r.status, 0, r.stdout + r.stderr); assert.match(r.stdout, /passed/);
});

test('10. 新增测试城市：只加数据，不复制业务逻辑', () => withSample(async (srv) => {
  const dir = await mkdtemp(join(tmpdir(), 'newcity-'));
  const code = (await readFile(DATA_JS, 'utf8')).replace("BT.CITIES = [", "BT.CITIES = [\n  { id: 'testcity', name: '测试城', emoji: '🧪' },");
  const extra = { id: 'tc-temple', city: 'testcity', name: '测试寺', subtitle: '', wishes: ['health'], cover: '', description: 'd', address: '测试城测试路1号', lat: 0, lng: 0, customs: [], transport: '',
    source: 's', verifiedAt: '2026-11-03', verificationStatus: '未核验', sourceUrl: '', verificationNote: '',
    bookingInfo: { schemaVersion: 1, openStatus: 'unknown', openScheduleNote: '09:00-17:00', ticketNote: '免费', official: { status: 'pending', url: '', placeId: 'tc-temple', source: {} }, platforms: {} } };
  const withPlace = code.replace('BT.PLACES = [', `BT.PLACES = [\n  ${JSON.stringify(extra)},`);
  await writeFile(join(dir, 'data.js'), withPlace);
  const d2 = await loadFormalData(join(dir, 'data.js'));
  assert.equal(d2.PLACES.length, 20);
  // 无核验记录 => 校验器要求补齐
  assert.ok(validateRegistry({ data: d2, verification }).some((e) => e.includes('tc-temple')));
  const v2 = structuredClone(verification);
  v2.places['tc-temple'] = { cityId: 'testcity', fields: { openingHours: { status: 'unverified' }, ticket: { status: 'not_supplied' } } };
  const s = await (async () => { const sv = http.createServer((q, r) => { r.writeHead(200, { 'content-type': 'text/html' }); r.end(q.url === '/robots.txt' ? '' : pageFor(extra, { hours: ['09:00-17:00', '10:00-11:00'] })); }); await new Promise((ok) => sv.listen(0, '127.0.0.1', ok)); return sv; })();
  try {
    const sources = { schemaVersion: 1, sources: [{ id: 'tc-src', placeId: 'tc-temple', url: `http://127.0.0.1:${s.address().port}/` }] };
    assert.deepEqual(validateRegistry({ data: d2, verification: v2, sources }), []);
    const run = await runMonitor({ data: d2, verification: v2, sources, fetcher: mkFetcher(), mode: 'sample' });
    assert.equal(run.places[0].cityName, '测试城'); assert.equal(run.places[0].status, 'candidate_changes');
    assert.deepEqual(run.places[0].changes[0].candidateValue, ['10:00-11:00']);
    // 引用未注册城市会被拒绝
    const broken = structuredClone(d2); broken.PLACES[0].city = 'nowhere';
    assert.ok(validateRegistry({ data: broken, verification: v2 }).some((e) => e.includes('未注册的城市')));
  } finally { s.close(); }
}));

test('11. 实测误报回归：地址措辞差异、交通通告时间段、法会预订链接不产生候选', async () => {
  const { sameAddress } = await import('../../scripts/monitor/lib/compare.mjs');
  const { extractCandidates } = await import('../../scripts/monitor/lib/extract.mjs');
  assert.ok(sameAddress('上海市安远路170号', '上海市普陀区安远路170号'));
  assert.ok(sameAddress('浙江省杭州市灵隐路法云弄1号', '浙江省杭州市西湖区法云弄1号'));
  assert.ok(!sameAddress('浙江省杭州市西湖区法云弄2号', '浙江省杭州市西湖区法云弄1号'));
  const html = '<p>旅游大巴预约停车实施时间：工作日7:00至17:00</p><p>开放时间：08:00-16:30</p><a href="/fhyd.html">法会预定</a><a href="/book">预约参观</a>';
  const c = extractCandidates(html, { baseUrl: 'https://a.example.com/', fields: ['openingHours', 'bookingLinks'] }).candidates;
  assert.deepEqual(c.openingHours.map((x) => x.value), ['08:00-16:30']);
  assert.deepEqual(c.bookingLinks.map((x) => x.value), ['https://a.example.com/book']);
});

test('字段状态：缺失数据不被解释为不可预约', () => {
  for (const rec of Object.values(verification.places)) {
    const f = rec.fields;
    assert.notEqual(f.officialBooking.status, 'verified', 'V1.0 迁移不应产生已核验的官方预约');
    assert.match(f.officialBooking.note, /不代表不可预约/);
    assert.equal(f.openStatus.status, 'unverified');
  }
  const stat = {}; for (const r of Object.values(verification.places)) stat[r.fields.basicInfo.status] = (stat[r.fields.basicInfo.status] || 0) + 1;
  assert.ok(stat.verified >= 1 && stat.needs_review >= 1);
});
