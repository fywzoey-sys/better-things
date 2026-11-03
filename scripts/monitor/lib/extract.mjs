/**
 * Candidate extraction. Pure functions: HTML -> candidate values + evidence snippets.
 * Conservative on purpose: only well-delimited patterns are extracted, each with the surrounding
 * text as evidence. Nothing here is a verified fact; every output is an "unverified candidate".
 */
export function htmlToText(html) {
  return html
    .replace(/<!--[\s\S]*?-->/g, ' ').replace(/<(script|style|noscript)[\s\S]*?<\/\1>/gi, ' ')
    .replace(/<\/(p|div|li|tr|h[1-6]|br|section|article)>|<br\s*\/?>/gi, '\n')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;|&#160;/g, ' ').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'")
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(+n))
    .replace(/[ \t　]+/g, ' ').replace(/\s*\n\s*/g, '\n').trim();
}
const pad = (n) => String(n).padStart(2, '0');
export function normalizeRange(h1, m1, h2, m2) { return `${pad(h1)}:${m1}-${pad(h2)}:${m2}`; }
const RANGE_RE = /(\d{1,2})\s*[:：]\s*(\d{2})\s*[-–—~～至到]\s*(\d{1,2})\s*[:：]\s*(\d{2})/g;
const PRICE_RE = /(\d+(?:\.\d+)?)\s*元/g;

/** Evidence = the source line containing the match (max ~140 chars, centred on the match). */
const snippet = (text, idx, len) => {
  const s = text.lastIndexOf('\n', idx) + 1; let e = text.indexOf('\n', idx); if (e < 0) e = text.length;
  let line = text.slice(s, e), at = idx - s;
  if (line.length > 140) { const from = Math.max(0, at - 60); line = (from ? '…' : '') + line.slice(from, from + 140) + '…'; }
  return line.replace(/\s+/g, ' ').trim();
};

export function timeTokens(text) {
  const out = new Map();
  for (const m of text.matchAll(RANGE_RE)) {
    const [h1, h2] = [+m[1], +m[3]];
    if (h1 > 24 || h2 > 24 || +m[2] > 59 || +m[4] > 59) continue;
    const tok = normalizeRange(h1, m[2], h2, m[4]);
    if (!out.has(tok)) out.set(tok, m.index);
  }
  return out;
}
export function ticketTokens(text) {
  const out = new Map();
  for (const m of text.matchAll(/免费|免票/g)) if (!out.has('免费')) out.set('免费', m.index);
  for (const m of text.matchAll(PRICE_RE)) { const t = `${+m[1]}元`; if (!out.has(t)) out.set(t, m.index); }
  return out;
}
export function reservationSignal(text) {
  if (/无需预约|不需要预约|无须预约|免预约/.test(text)) return { value: '无需预约', idx: text.search(/无需预约|不需要预约|无须预约|免预约/) , both: /(?<!无)(?<!不)(需|须|必须|需要)[^。，\n]{0,6}预约|实名预约/.test(text.replace(/无需预约|不需要预约|无须预约|免预约/g, '')) };
  const m = /(?<!无)(?<!不)(需|须|必须|需要)[^。，\n]{0,6}预约|实名预约/.exec(text);
  return m ? { value: '需预约', idx: m.index, both: false } : null;
}

export function extractBookingLinks(html, baseUrl) {
  const out = new Map();
  for (const m of html.matchAll(/<a\b[^>]*?href\s*=\s*["']([^"'#][^"']*)["'][^>]*>([\s\S]*?)<\/a>/gi)) {
    const label = htmlToText(m[2]);
    if (!/预约|预定|预订|购票|book|yuyue|reserve/i.test(label + ' ' + m[1])) continue;
    if (/^(javascript|mailto|tel):/i.test(m[1])) continue;
    if (/法会|法事|佛事|斋|供灯|祈福|超度|放生|水陆/.test(label)) continue; // 宗教活动预订，不是参观预约
    try {
      const abs = new URL(m[1], baseUrl).href;
      if (!out.has(abs)) out.set(abs, label.slice(0, 40));
    } catch { /* ignore malformed */ }
  }
  return [...out].map(([url, label]) => ({ url, label }));
}

/**
 * @returns {{title, candidates:{field:[{value,evidence}]}, empty:boolean}}
 */
export function extractCandidates(html, { baseUrl, fields }) {
  const text = htmlToText(html);
  const want = new Set(fields);
  const c = {};
  const title = (/<title[^>]*>([\s\S]*?)<\/title>/i.exec(html) || [])[1];
  if (want.has('openingHours')) {
    const items = [];
    for (const [tok, idx] of timeTokens(text)) {
      const ctx = text.slice(Math.max(0, idx - 60), idx + 40);
      const ls = text.lastIndexOf('\n', idx) + 1, le = text.indexOf('\n', idx);
      if (/停车|大巴|交通|公交|车辆|限行|地铁|班车/.test(text.slice(ls, le < 0 ? text.length : le))) continue; // 交通通告里的时间段不是开放时间
      if (/开放|开门|开馆|时间|营业|参观|入寺|入园|闭馆|开园/.test(ctx)) items.push({ value: tok, evidence: snippet(text, idx, 12, 50) });
    }
    if (items.length) c.openingHours = items;
  }
  if (want.has('ticket')) {
    const items = [];
    for (const [tok, idx] of ticketTokens(text)) {
      const ctx = text.slice(Math.max(0, idx - 40), idx + 40);
      if (/票|费|拜|参观|门|入寺|香花券|预约/.test(ctx)) items.push({ value: tok, evidence: snippet(text, idx, tok.length, 40) });
    }
    if (items.length) c.ticket = items;
  }
  if (want.has('address')) {
    const m = /地址\s*[:：]\s*([^\s，。;；\n]{6,50})/.exec(text);
    if (m) c.address = [{ value: m[1], evidence: snippet(text, m.index, m[0].length, 20) }];
  }
  if (want.has('reservationPolicy')) {
    const r = reservationSignal(text);
    if (r) {
      c.reservationPolicy = [{ value: r.value, evidence: snippet(text, r.idx, 12, 40) }];
      if (r.both) c.reservationPolicy.push({ value: '需预约', evidence: '同一页面同时出现「无需预约」与「需预约」类表述', internalConflict: true });
    }
  }
  if (want.has('bookingLinks')) {
    const links = extractBookingLinks(html, baseUrl);
    if (links.length) c.bookingLinks = links.map((l) => ({ value: l.url, evidence: `链接文字「${l.label}」→ ${l.url}` }));
  }
  return { title: title ? htmlToText(title).slice(0, 120) : null, candidates: c, empty: Object.keys(c).length === 0, textLength: text.length };
}
