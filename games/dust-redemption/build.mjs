import { mkdir, copyFile, readFile, writeFile, readdir, cp } from 'node:fs/promises';
const source = new URL('./', import.meta.url);
const runtime = new URL('../../public/games/dust-redemption/', source);
const vendor = new URL('vendor/', runtime);
await mkdir(vendor, { recursive: true });
for (const file of ['three.module.js', 'three.core.js'])
  await copyFile(new URL(`node_modules/three/build/${file}`, source), new URL(file, vendor));
await copyFile(new URL('node_modules/three/LICENSE', source), new URL('THREE-LICENSE.txt', vendor));
for (const [from, to] of [['loaders/GLTFLoader.js','GLTFLoader.js'],['utils/BufferGeometryUtils.js','BufferGeometryUtils.js'],['utils/SkeletonUtils.js','SkeletonUtils.js']]) {
  const code = (await readFile(new URL(`node_modules/three/examples/jsm/${from}`, source), 'utf8'))
    .replaceAll("from 'three'", "from './three.module.js'")
    .replaceAll("'../utils/BufferGeometryUtils.js'", "'./BufferGeometryUtils.js'");
  await writeFile(new URL(to, vendor), code);
}
for (const file of await readdir(source)) {
  if (/\.(js|html|css)$/.test(file))
    await writeFile(new URL(file, runtime), (await readFile(new URL(file, source), 'utf8')).replace(/\r\n?/g, '\n'));
}
await cp(new URL('assets/', source), new URL('assets/', runtime), { recursive: true });
console.log('Built complete Dust & Redemption runtime with pinned Three.js 0.180.0.');
