/**
 * Read-only loader for the formal data. js/data.js is a browser script that assigns window.BT;
 * we evaluate it in an isolated vm context and return a deep JSON clone, so callers cannot
 * mutate anything that is later written back. Nothing in scripts/monitor writes to data.js.
 */
import { readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import vm from 'node:vm';

export async function loadFormalData(dataJsPath) {
  const code = await readFile(dataJsPath, 'utf8');
  const ctx = { window: {} };
  vm.createContext(ctx);
  vm.runInContext(code, ctx, { timeout: 5000, filename: dataJsPath });
  const BT = ctx.window.BT;
  if (!BT || !Array.isArray(BT.PLACES) || !Array.isArray(BT.CITIES)) {
    throw new Error(`${dataJsPath} did not define BT.CITIES / BT.PLACES`);
  }
  return JSON.parse(JSON.stringify({ CITIES: BT.CITIES, WISHES: BT.WISHES || [], PLACES: BT.PLACES }));
}

export async function sha256File(path) {
  try { return createHash('sha256').update(await readFile(path)).digest('hex'); }
  catch (e) { if (e.code === 'ENOENT') return null; throw e; }
}
export const sha256 = (buf) => createHash('sha256').update(buf).digest('hex');

export async function readJson(path) {
  return JSON.parse(await readFile(path, 'utf8'));
}
