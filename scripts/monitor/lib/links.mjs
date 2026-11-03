/** Booking-link validation. Only checks reachability; it never marks a link "verified". */
import { SOURCE_STATUS } from './status.mjs';

export async function checkLink(fetcher, url, { allowHttp = false, max } = {}) {
  let u;
  try { u = new URL(url); } catch { return { url, result: 'invalid', reason: 'URL 格式不合法' }; }
  if (u.username || u.password || /[\s\\]/.test(url)) return { url, result: 'invalid', reason: 'URL 含凭证或非法字符' };
  if (u.protocol !== 'https:' && !(allowHttp && u.protocol === 'http:')) return { url, result: 'invalid', reason: '预约链接必须使用 HTTPS' };
  if (u.pathname === '/' && !u.search) return { url, result: 'invalid', reason: '指向站点首页，不是具体预约入口' };
  const page = await fetcher.fetchPage(url);
  const base = { url, checkedAt: page.fetchedAt, httpStatus: page.httpStatus, finalUrl: page.finalUrl };
  if (page.status === SOURCE_STATUS.OK) return { ...base, result: 'ok', reason: null };
  if (page.status === SOURCE_STATUS.BLOCKED || page.status === SOURCE_STATUS.ROBOTS_DISALLOWED || page.status === SOURCE_STATUS.REDIRECT_OFFSITE)
    return { ...base, result: 'unverifiable', reason: page.error };
  if (page.status === SOURCE_STATUS.PARSE_FAILED) return { ...base, result: 'ok', reason: '可访问（非 HTML 内容）' };
  if (page.httpStatus === 404 || page.httpStatus === 410 || (page.httpStatus && page.httpStatus >= 500)) return { ...base, result: 'invalid', reason: page.error };
  if (/ENOTFOUND|ECONNREFUSED|EAI_AGAIN|CERT|certificate/i.test(page.error || '')) return { ...base, result: 'invalid', reason: page.error };
  return { ...base, result: 'unverifiable', reason: page.error };
}
