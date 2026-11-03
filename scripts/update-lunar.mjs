/** Fetches only official Gregorian-to-lunar date data. No unsupported Yi/Ji scraping. */
import { writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
const today = new Intl.DateTimeFormat('en-CA',{timeZone:'Asia/Shanghai',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date());
const url = 'https://data.weather.gov.hk/weatherAPI/opendata/lunardate.php?date='+encodeURIComponent(today);
const res = await fetch(url, {signal:AbortSignal.timeout(15000)});
if (!res.ok) throw new Error('HKO API HTTP '+res.status);
const body = await res.json();
if (!body || typeof body.LunarDate !== 'string' || !body.LunarDate.trim() || typeof body.LunarYear !== 'string') throw new Error('Unexpected HKO response');
const output = {date:today,lunarDate:body.LunarDate,lunarYear:body.LunarYear,source:'香港天文台公历与农历对照 API',sourceUrl:url,updatedAt:new Date().toISOString()};
await writeFile(resolve('data/lunar-today.json'), JSON.stringify(output,null,2)+'\n');
console.log('Updated lunar calendar:',today,body.LunarDate);
