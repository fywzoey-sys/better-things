/**
 * Polite, legal fetching. Rules:
 *  - honours robots.txt; identifies itself honestly; low request rate; size/time limits;
 *  - never logs in, never solves/bypasses captchas, never retries around blocks (403/429/412 => "blocked");
 *  - refuses private / loopback hosts unless allowLocal (used only by local tests and --sample);
 *  - follows at most 3 redirects and refuses to follow to another site (needs human review).
 */
import { sha256 } from './data-loader.mjs';
import { SOURCE_STATUS } from './status.mjs';

export const USER_AGENT = 'HaoYunMapMonitor/1.0 (+https://github.com/fywzoey-sys/better-things; weekly low-frequency check)';
const BLOCK_CODES = new Set([401, 403, 412, 429]);
const BLOCK_MARKERS = /验证码|captcha|人机验证|安全验证|访问过于频繁|请登录后|滑动验证|Just a moment|Access Denied/i;

function isPrivateHost(h) {
  h = h.toLowerCase().replace(/^\[|\]$/g, '');
  if (h === 'localhost' || h.endsWith('.localhost') || h.endsWith('.local') || h.endsWith('.internal')) return true;
  if (/^(127\.|10\.|0\.|169\.254\.|192\.168\.)/.test(h) || /^172\.(1[6-9]|2\d|3[01])\./.test(h)) return true;
  return h === '::1' || h.startsWith('fc') || h.startsWith('fd') || h.startsWith('fe80');
}
const sameSite = (a, b) => {
  const n = (h) => h.replace(/^www\./, '');
  return n(new URL(a).hostname) === n(new URL(b).hostname);
};

function decode(buf, contentType) {
  let label = (/charset=([\w-]+)/i.exec(contentType || '') || [])[1];
  if (!label) label = (/<meta[^>]+charset=["']?([\w-]+)/i.exec(Buffer.from(buf.subarray(0, 2048)).toString('latin1')) || [])[1];
  try { return new TextDecoder(label || 'utf-8').decode(buf); } catch { return new TextDecoder('utf-8').decode(buf); }
}

function parseRobots(txt, ua = 'haoyunmapmonitor') {
  const groups = []; let cur = null;
  for (const raw of txt.split(/\r?\n/)) {
    const line = raw.replace(/#.*/, '').trim(); const m = /^([A-Za-z-]+)\s*:\s*(.*)$/.exec(line);
    if (!m) continue; const k = m[1].toLowerCase(), v = m[2].trim();
    if (k === 'user-agent') { if (!cur || cur.rules.length) { cur = { agents: [], rules: [] }; groups.push(cur); } cur.agents.push(v.toLowerCase()); }
    else if ((k === 'allow' || k === 'disallow') && cur) cur.rules.push([k, v]);
  }
  const mine = groups.find((g) => g.agents.some((a) => a !== '*' && ua.includes(a))) || groups.find((g) => g.agents.includes('*'));
  return mine ? mine.rules : [];
}
function robotsAllows(rules, path) {
  let best = null;
  for (const [k, v] of rules) {
    if (!v) continue;
    const re = new RegExp('^' + v.replace(/[.+?^${}()|[\]\\]/g, '\\$&').replace(/\*/g, '.*').replace(/\\\$$/, '$'));
    if (re.test(path) && (!best || v.length >= best.len)) best = { len: v.length, allow: k === 'allow' };
  }
  return best ? best.allow : true;
}

export function createFetcher(opts = {}) {
  const o = { timeoutMs: 15000, maxBytes: 2_000_000, delayMs: 1500, allowLocal: false, respectRobots: true,
    maxRedirects: 3, fetchImpl: globalThis.fetch, ...opts };
  const robotsCache = new Map();
  let last = 0;
  const wait = async () => { const d = o.delayMs - (Date.now() - last); if (d > 0) await new Promise((r) => setTimeout(r, d)); last = Date.now(); };

  async function raw(url) {
    await wait();
    const ctl = AbortSignal.timeout(o.timeoutMs);
    return o.fetchImpl(url, { redirect: 'manual', signal: ctl, headers: { 'user-agent': USER_AGENT, accept: 'text/html,application/xhtml+xml,text/plain;q=0.9' } });
  }
  async function readBody(res) {
    const chunks = []; let n = 0;
    for await (const c of res.body || []) { n += c.length; if (n > o.maxBytes) throw new Error(`响应超过 ${o.maxBytes} 字节上限`); chunks.push(c); }
    return Buffer.concat(chunks);
  }
  async function robotsOk(u) {
    if (!o.respectRobots) return { ok: true };
    const origin = u.origin;
    if (!robotsCache.has(origin)) {
      let rules = [], state = 'ok';
      try {
        const r = await raw(origin + '/robots.txt');
        if (r.status >= 500) state = 'unavailable';
        else if (r.status === 200) rules = parseRobots(decode(await readBody(r), r.headers.get('content-type')));
        else if (r.body) await r.body.cancel().catch(() => {});
      } catch { state = 'ok'; /* unreachable: the page fetch will report the real failure */ }
      robotsCache.set(origin, { rules, state });
    }
    const { rules, state } = robotsCache.get(origin);
    if (state === 'unavailable') return { ok: false, reason: 'robots.txt 返回 5xx，保守起见不访问' };
    return robotsAllows(rules, u.pathname + u.search) ? { ok: true } : { ok: false, reason: 'robots.txt 不允许自动访问该路径' };
  }

  /** Never throws. Always returns {status, ...} with fetchedAt. */
  async function fetchPage(url) {
    const fetchedAt = new Date().toISOString();
    const base = { url, fetchedAt, finalUrl: url, httpStatus: null, body: null, contentSha256: null };
    let cur;
    try { cur = new URL(url); } catch { return { ...base, status: SOURCE_STATUS.FETCH_FAILED, error: 'URL 不合法' }; }
    if (!/^https?:$/.test(cur.protocol)) return { ...base, status: SOURCE_STATUS.FETCH_FAILED, error: '仅支持 http/https' };
    try {
      for (let hop = 0; hop <= o.maxRedirects; hop++) {
        if (!o.allowLocal && isPrivateHost(cur.hostname)) return { ...base, finalUrl: cur.href, status: SOURCE_STATUS.FETCH_FAILED, error: '拒绝访问内网/本机地址' };
        const rb = await robotsOk(cur);
        if (!rb.ok) return { ...base, finalUrl: cur.href, status: SOURCE_STATUS.ROBOTS_DISALLOWED, error: rb.reason };
        const res = await raw(cur.href);
        if ([301, 302, 303, 307, 308].includes(res.status)) {
          const loc = res.headers.get('location'); if (res.body) await res.body.cancel().catch(() => {});
          if (!loc) return { ...base, httpStatus: res.status, finalUrl: cur.href, status: SOURCE_STATUS.FETCH_FAILED, error: '重定向缺少 Location' };
          const next = new URL(loc, cur);
          if (!sameSite(cur.href, next.href)) return { ...base, httpStatus: res.status, finalUrl: next.href, status: SOURCE_STATUS.REDIRECT_OFFSITE, error: `重定向到其他站点 ${next.hostname}，需人工确认来源是否变更` };
          cur = next; continue;
        }
        base.httpStatus = res.status; base.finalUrl = cur.href;
        if (BLOCK_CODES.has(res.status)) { if (res.body) await res.body.cancel().catch(() => {}); return { ...base, status: SOURCE_STATUS.BLOCKED, error: `HTTP ${res.status}：来源拒绝自动访问，未尝试绕过` }; }
        if (res.status < 200 || res.status >= 300) { if (res.body) await res.body.cancel().catch(() => {}); return { ...base, status: SOURCE_STATUS.FETCH_FAILED, error: `HTTP ${res.status}` }; }
        const ct = res.headers.get('content-type') || '';
        if (ct && !/text\/|html|xml/i.test(ct)) { await res.body?.cancel().catch(() => {}); return { ...base, status: SOURCE_STATUS.PARSE_FAILED, error: `非文本内容类型 ${ct}` }; }
        const buf = await readBody(res);
        const text = decode(buf, ct);
        if (BLOCK_MARKERS.test(text.slice(0, 20000)) && text.replace(/<[^>]+>/g, '').length < 1500)
          return { ...base, body: null, contentSha256: sha256(buf), status: SOURCE_STATUS.BLOCKED, error: '页面要求验证码/登录/人机验证，未尝试绕过' };
        return { ...base, status: SOURCE_STATUS.OK, body: text, contentSha256: sha256(buf), contentType: ct, error: null };
      }
      return { ...base, status: SOURCE_STATUS.FETCH_FAILED, error: `重定向超过 ${o.maxRedirects} 次` };
    } catch (e) {
      const msg = e.name === 'TimeoutError' ? `请求超时 (${o.timeoutMs}ms)` : (e.cause?.code || e.message);
      return { ...base, status: SOURCE_STATUS.FETCH_FAILED, error: String(msg) };
    }
  }
  return { fetchPage, options: o };
}
