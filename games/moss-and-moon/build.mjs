import { copyFile, mkdir } from 'node:fs/promises';
const runtime = new URL('../../public/games/moss-and-moon/', import.meta.url);
await mkdir(new URL('vendor/', runtime), {recursive:true});
for (const file of ['three.module.js','three.core.js']) await copyFile(new URL('node_modules/three/build/'+file,import.meta.url),new URL('vendor/'+file,runtime));
await copyFile(new URL('node_modules/three/LICENSE',import.meta.url),new URL('vendor/THREE-LICENSE.txt',runtime));
console.log('Three.js 0.180.0 copied into fingerprinted runtime. Runtime source is maintained directly in public/games/moss-and-moon.');
