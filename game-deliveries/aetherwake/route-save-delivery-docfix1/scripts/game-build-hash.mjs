import { createHash } from 'node:crypto';
import { readdir, readFile } from 'node:fs/promises';
import { resolve, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const sha256 = bytes => createHash('sha256').update(bytes).digest('hex');
export async function computeRuntimeHash(directory) {
  const files = [];
  async function walk(relative = '') {
    const entries = await readdir(join(directory, relative), { withFileTypes: true });
    for (const entry of entries) {
      if (!relative && entry.name === 'evidence') continue;
      const path = relative ? `${relative}/${entry.name}` : entry.name;
      if (entry.isSymbolicLink()) throw new Error(`Runtime 不可包含符號連結：${path}`);
      if (entry.isDirectory()) await walk(path);
      else if (entry.isFile()) {
        const bytes = await readFile(join(directory, path));
        files.push({ path, bytes: bytes.length, sha256: sha256(bytes) });
      }
    }
  }
  await walk();
  if (!files.some(file => file.path === 'index.html')) throw new Error('Runtime 缺少 index.html。');
  files.sort((a, b) => a.path < b.path ? -1 : a.path > b.path ? 1 : 0);
  return { artifactHash: sha256(JSON.stringify(files)), files };
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  try {
    const gameId = process.argv[2];
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(gameId || '')) throw new Error('用法：node scripts/game-build-hash.mjs <game-id>');
    const root = fileURLToPath(new URL('../', import.meta.url));
    const release = JSON.parse(await readFile(join(root, 'src/game-development/releases', `${gameId}.json`), 'utf8'));
    if (release.gameId !== gameId) throw new Error('版本 ID 不一致。');
    console.log(JSON.stringify({ gameId, ...await computeRuntimeHash(join(root, 'public/games', gameId)) }, null, 2));
  } catch (error) { console.error(error.message); process.exitCode = 1; }
}
