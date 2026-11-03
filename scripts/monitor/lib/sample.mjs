/**
 * Local simulated sources for end-to-end testing WITHOUT touching the internet.
 * Pages are generated from the real formal data so "unchanged" stays unchanged when data is edited.
 * Scenarios (each bound to an existing place id):
 *   unchanged -> bj-guozijian   changed -> hz-lingyin   fetch failure -> bj-wutasi (HTTP 500)
 *   conflict -> bj-yonghegong (two sources disagree)   bad link -> sh-yufo   blocked(captcha) -> sh-longhua
 */
import http from 'node:http';
import { timeTokens, ticketTokens } from './extract.mjs';

const cleanAddr = (a) => (a || '').split(/[⚠（(]/)[0].trim();
export function pageFor(place, o = {}) {
  const bi = place.bookingInfo || {};
  const hours = o.hours || [...timeTokens(bi.openScheduleNote || '').keys()];
  const tickets = o.tickets || [...ticketTokens(bi.ticketNote || '').keys()];
  const addr = o.address ?? cleanAddr(place.address);
  const links = (o.links || []).map((l) => `<a href="${l}">在线预约</a>`).join(' ');
  return `<!doctype html><html><head><meta charset="utf-8"><title>${place.name} 参观须知（模拟页面）</title></head><body><h1>${place.name}</h1>
<p>开放时间：${hours.join('，')}</p><p>${tickets.map((t) => (t === '免费' ? '凭证免费' : `门票${t}`)).join('，')}</p>
<p>地址：${addr}</p>${o.reservation ? `<p>${o.reservation}</p>` : ''}${links}<footer>此页面为本地模拟样例，不代表真实来源</footer></body></html>`;
}

export const SAMPLE_PLACES = ['bj-guozijian', 'hz-lingyin', 'bj-wutasi', 'bj-yonghegong', 'sh-yufo', 'sh-longhua'];

export async function startSampleServer(data) {
  const P = (id) => data.PLACES.find((p) => p.id === id);
  const routes = {
    '/unchanged': () => [200, pageFor(P('bj-guozijian'))],
    '/changed': () => [200, pageFor(P('hz-lingyin'), { hours: [...timeTokens(P('hz-lingyin').bookingInfo.openScheduleNote).keys(), '07:00-18:30'], address: '浙江省杭州市西湖区法云弄2号' })],
    '/broken': () => [500, 'Internal Server Error'],
    '/conflict-a': () => [200, pageFor(P('bj-yonghegong'), { hours: ['09:00-17:00'], tickets: ['25元'], reservation: '需实名预约' })],
    '/conflict-b': () => [200, pageFor(P('bj-yonghegong'), { hours: ['10:00-15:00'], tickets: ['25元'], reservation: '无需预约' })],
    '/badlink': () => [200, pageFor(P('sh-yufo'), { links: ['/booking/dead', '/booking/ok'] })],
    '/booking/dead': () => [404, 'not found'],
    '/booking/ok': () => [200, '<html><body>预约入口（模拟）</body></html>'],
    '/captcha': () => [200, '<html><body>请输入验证码以继续访问</body></html>']
  };
  const server = http.createServer((req, res) => {
    if (req.url === '/robots.txt') { res.writeHead(200, { 'content-type': 'text/plain' }); return res.end('User-agent: *\nAllow: /\n'); }
    const r = routes[req.url.split('?')[0]];
    if (!r) { res.writeHead(404); return res.end('nf'); }
    const [code, body] = r(); res.writeHead(code, { 'content-type': 'text/html; charset=utf-8' }); res.end(body);
  });
  await new Promise((ok) => server.listen(0, '127.0.0.1', ok));
  const base = `http://127.0.0.1:${server.address().port}`;
  const mk = (id, placeId, path) => ({ id, placeId, url: base + path, type: 'sample' });
  const sources = { schemaVersion: 1, sources: [
    mk('sample-unchanged', 'bj-guozijian', '/unchanged'), mk('sample-changed', 'hz-lingyin', '/changed'),
    mk('sample-broken', 'bj-wutasi', '/broken'), mk('sample-conflict-a', 'bj-yonghegong', '/conflict-a'), mk('sample-conflict-b', 'bj-yonghegong', '/conflict-b'),
    mk('sample-badlink', 'sh-yufo', '/badlink'), mk('sample-captcha', 'sh-longhua', '/captcha')
  ] };
  return { base, sources, close: () => new Promise((ok) => server.close(ok)) };
}
