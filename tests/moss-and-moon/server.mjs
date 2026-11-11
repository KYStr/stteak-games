import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { readFile } from 'node:fs/promises';
const value = process.env.MOSS_PORT ?? '8104';
if (!/^\d+$/.test(value) || !Number.isInteger(Number(value)) || Number(value) < 1 || Number(value) > 65535)
  throw new Error('MOSS_PORT must be an integer in 1..65535');
export const port = Number(value);
export const base = `http://127.0.0.1:${port}/games/moss-and-moon/`;
const wait = ms => new Promise(r => setTimeout(r,ms));
export async function ensureServer() {
  const check = async () => {
    let response;
    try { response = await fetch(base, { signal:AbortSignal.timeout(1000) }); }
    catch (error) { if (error.name === 'TimeoutError') throw new Error(`Port ${port} did not respond`); return false; }
    const html = await response.text();
    if (!response.ok || !html.includes('苔蘚與月光 · Moss & Moon') || !html.includes('id="world"'))
      throw new Error(`Port ${port} is occupied by a service other than Moss & Moon`);
    const source = await fetch(new URL('main.js',base),{signal:AbortSignal.timeout(1000)});
    const expected = await readFile(new URL('../../public/games/moss-and-moon/main.js',import.meta.url),'utf8');
    if(!source.ok || await source.text() !== expected) throw new Error(`Port ${port} serves a different Moss & Moon source build`);
    return true;
  };
  if (await check()) return null;
  const server = spawn('python3', ['-m','http.server',String(port),'--bind','127.0.0.1','--directory',
    fileURLToPath(new URL('../../public/',import.meta.url))], { stdio:'ignore' });
  try {
    for (let i=0;i<60;i++) {
      await wait(100);
      if (server.exitCode !== null) throw new Error(`HTTP server exited on port ${port}`);
      if (await check()) return server;
    }
    throw new Error(`Moss & Moon server failed to become ready on port ${port}`);
  } catch (error) { server.kill('SIGTERM'); throw error; }
}
