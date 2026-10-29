import {copyFile,mkdir,readFile,writeFile} from 'node:fs/promises'; // 僅將原lock依賴與本款模組產出到固定runtime。
import {patchRapierInit,RAPIER_INIT_PATCH,sha256} from './rapier-init-patch.mjs'; // 來源不符時先停止，不能模糊修改第三方vendor。
const root=new URL('../../public/games/orbit-fall/vendor/',import.meta.url),retained=new URL('../../assets/games/orbit-fall/vendor-sources/',import.meta.url); // 原件與輸出清楚分開。
const upstream=await readFile(new URL('node_modules/@dimforge/rapier3d-compat/rapier.mjs',import.meta.url)); // 只讀已安裝的原0.19.0套件，不在build下載或升版。
const {vendor,wasm,patchId}=patchRapierInit(upstream); // 完整來源hash／單一呼叫／WASM／輸出hash全通過後才可寫runtime。
const original=await readFile(new URL('rapier-0.19.0.mjs',retained)),originalWasm=await readFile(new URL('rapier-0.19.0.wasm',retained)),license=await readFile(new URL('rapier-LICENSE.txt',import.meta.url)),retainedLicense=await readFile(new URL('rapier-LICENSE.txt',retained)); // 保留上游JS、WASM及原授權原件。
if(!upstream.equals(original)||!wasm.equals(originalWasm)||sha256(license)!==RAPIER_INIT_PATCH.licenseSha256||!license.equals(retainedLicense))throw Error('RAPIER retained original source/WASM/license mismatch'); // 原件不符也在任何runtime寫入前拒絕。
await mkdir(root,{recursive:true}); // 所有Rapier guard先成功，才建立輸出目錄。
for(const [src,out] of [['three/build/three.module.js','three.module.js'],['three/build/three.core.js','three.core.js'],['three/LICENSE','three-LICENSE.txt']])await copyFile(new URL(`node_modules/${src}`,import.meta.url),new URL(out,root)); // Three版本與原建置內容不變。
await writeFile(new URL('rapier.mjs',root),vendor);await copyFile(new URL('rapier-LICENSE.txt',import.meta.url),new URL('rapier-LICENSE.txt',root)); // 僅寫入已核輸出並保留原license。
for(const name of ['optics.js','hazards.js'])await copyFile(new URL(name,import.meta.url),new URL(`../${name}`,root)); // 保留兩個唯一source原有複製流程。
console.log(`Pinned Three.js 0.180.0 / Rapier 0.19.0 with audited ${patchId}; original WASM and public init() unchanged.`); // 明示本地patch，不冒充未修改上游vendor。
