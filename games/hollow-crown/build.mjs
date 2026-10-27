import { mkdir, copyFile } from 'node:fs/promises';
const root = new URL('../../', import.meta.url);
const output = new URL('public/games/hollow-crown/vendor/', root);
await mkdir(output, { recursive: true });
for (const name of ['three.module.js', 'three.core.js']) {
  await copyFile(new URL(`node_modules/three/build/${name}`, import.meta.url), new URL(name, output));
}
await copyFile(new URL('node_modules/three/LICENSE', import.meta.url), new URL('THREE-LICENSE.txt', output));
await import('../../assets/games/hollow-crown/recipes/export-assets.mjs');
await import('../../assets/games/hollow-crown/audio/generate.mjs');
console.log('Hollow Crown: pinned Three.js 0.180.0, original GLB/textures/audio rebuilt. Runtime source is public/games/hollow-crown/.');
