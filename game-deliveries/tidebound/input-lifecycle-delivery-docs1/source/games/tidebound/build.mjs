import { build } from 'esbuild';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
const out = new URL('../../public/games/tidebound/', import.meta.url);
await mkdir(out, { recursive: true });
await build({ entryPoints: [new URL('src/main.js', import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1')], bundle: true, minify: true, format: 'esm', target: 'es2022', outfile: new URL('game.js', out).pathname.replace(/^\/([A-Za-z]:)/, '$1'), legalComments: 'eof' });
for (const name of ['index.html', 'style.css']) await writeFile(new URL(name, out), (await readFile(new URL(`src/${name}`, import.meta.url),'utf8')).replace(/\r\n/g,'\n'));
await writeFile(new URL('THREE-LICENSE.txt', out), (await readFile(new URL('node_modules/three/LICENSE', import.meta.url),'utf8')).replace(/\r\n/g,'\n'));
console.log('Tidebound runtime rebuilt; all dependencies are bundled inside public/games/tidebound.');
