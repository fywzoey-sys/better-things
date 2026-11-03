#!/usr/bin/env node
/**
 * 好运地图 monitor CLI.  READ-ONLY on formal data; writes only a review report under --out.
 *   node scripts/monitor/run.mjs --sample            # simulated local sources, no internet
 *   node scripts/monitor/run.mjs --live              # real sources in data/monitor/sources.json
 *   node scripts/monitor/run.mjs --validate          # only validate registry/data
 * Exit codes: 0 done (see report for per-place problems) · 1 config/validation error · 2 --strict and problems found · 3 formal-data integrity violation
 */
import { mkdir, writeFile, appendFile } from 'node:fs/promises';
import { resolve, dirname, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseArgs } from 'node:util';
import { loadFormalData, readJson, sha256File } from './lib/data-loader.mjs';
import { validateRegistry } from './lib/registry.mjs';
import { createFetcher } from './lib/fetcher.mjs';
import { runMonitor } from './lib/pipeline.mjs';
import { buildReport, toMarkdown, toHtml } from './lib/report.mjs';
import { startSampleServer } from './lib/sample.mjs';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
const { values: a } = parseArgs({ options: {
  sample: { type: 'boolean' }, live: { type: 'boolean' }, validate: { type: 'boolean' }, strict: { type: 'boolean' }, print: { type: 'boolean' },
  data: { type: 'string', default: resolve(ROOT, 'js/data.js') },
  verification: { type: 'string', default: resolve(ROOT, 'data/monitor/verification.json') },
  sources: { type: 'string', default: resolve(ROOT, 'data/monitor/sources.json') },
  out: { type: 'string', default: resolve(ROOT, 'reports') }, places: { type: 'string' },
  delay: { type: 'string', default: '1500' }, 'run-id': { type: 'string' }
} });

function fail(code, msg) { console.error(msg); process.exit(code); }
if (!a.sample && !a.live && !a.validate) fail(1, '请指定 --sample、--live 或 --validate');

const dataDir = dirname(resolve(a.data));
const guarded = [resolve(a.data), resolve(a.verification), resolve(a.sources), resolve(dataDir, '../data/reviewed-content.json')];
const out = resolve(a.out);
for (const dir of [dataDir, resolve(dataDir, '../data')]) {
  const rel = relative(dir, out);
  if (rel === '' || (!rel.startsWith('..') && !rel.startsWith(sep) )) fail(1, `报告输出目录不得位于正式数据目录内：${out}`);
}
const hashAll = async () => Object.fromEntries(await Promise.all(guarded.map(async (f) => [relative(ROOT, f), await sha256File(f)])));

const before = await hashAll();
const data = await loadFormalData(a.data);
const verification = await readJson(a.verification).catch(() => null);
let sources = a.sample ? null : await readJson(a.sources).catch((e) => fail(1, `无法读取来源配置 ${a.sources}: ${e.message}`));
const errors = validateRegistry({ data, verification, sources });
if (errors.length) fail(1, '数据/注册校验失败：\n- ' + errors.join('\n- '));
console.log(`校验通过：${data.CITIES.length} 个城市，${data.PLACES.length} 个地点。`);
if (a.validate) process.exit(0);

let server = null;
if (a.sample) { server = await startSampleServer(data); sources = server.sources; }
const runId = a['run-id'] || new Date().toISOString().replace(/[:.]/g, '-');
const fetcher = createFetcher({ delayMs: Number(a.delay), allowLocal: !!a.sample });
const run = await runMonitor({ data, verification, sources, fetcher, mode: a.sample ? 'sample' : 'live',
  limitPlaces: a.places ? a.places.split(',') : null, allowHttpLinks: !!a.sample });
if (server) await server.close();

const after = await hashAll();
const unchanged = JSON.stringify(before) === JSON.stringify(after);
const gh = process.env.GITHUB_RUN_ID ? { runId: process.env.GITHUB_RUN_ID, repository: process.env.GITHUB_REPOSITORY, sha: process.env.GITHUB_SHA } : null;
const report = buildReport({ run, hashes: { unchanged, after }, runId, ghRun: gh });
const dir = resolve(out, runId);
await mkdir(dir, { recursive: true });
const md = toMarkdown(report);
await writeFile(resolve(dir, 'report.json'), JSON.stringify(report, null, 2) + '\n');
await writeFile(resolve(dir, 'report.md'), md + '\n');
await writeFile(resolve(dir, 'report.html'), toHtml(report));
console.log(`报告已生成：${relative(process.cwd(), dir) || dir}/report.{json,md,html}`);
for (const p of report.places) console.log(` - ${p.placeId.padEnd(16)} ${p.status}${p.changes.length ? ` (${p.changes.length} 条候选变化)` : ''}`);
if (a.print) console.log('\n===== REPORT (markdown) =====\n' + md + '\n===== END REPORT =====');
if (process.env.GITHUB_STEP_SUMMARY) await appendFile(process.env.GITHUB_STEP_SUMMARY, md + '\n');
if (!unchanged) fail(3, '❌ 正式数据文件在运行期间发生变化，已中止（这是不允许的）');
const problems = report.places.some((p) => !['unchanged', 'candidate_changes'].includes(p.status));
if (a.strict && problems) process.exit(2);
