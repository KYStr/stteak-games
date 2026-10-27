import {copyFile,mkdir,readFile,writeFile} from 'node:fs/promises'; // 僅將原lock依賴與本款模組產出到固定runtime。
import {patchRapierInit,RAPIER_INIT_PATCH,sha256} from './rapier-init-patch.mjs'; // 來源不符時先停止，不能模糊修改第三方vendor。
const root=new URL('../../public/games/orbit-fall/vendor/',import.meta.url),retained=new URL('../../assets/games/orbit-fall/vendor-sources/',import.meta.url); // 原件與輸出清楚分開。
const upstream=await readFile(new URL('node_modules/@dimforge/rapier3d-compat/rapier.mjs',import.meta.url)); // 只讀已安裝的原0.19.0套件，不在build下載或升版。
const {vendor,wasm,patchId}=patchRapierInit(upstream); // 完整來源hash／單一呼叫／WASM／輸出hash全通過後才可寫runtime。
const original=await readFile(new URL('rapier-0.19.0.mjs',retained)),originalWasm=await readFile(new URL('rapier-0.19.0.wasm',retained)),license=await readFile(new URL('rapier-LICENSE.txt',import.meta.url)),retainedLicense=await readFile(new URL('rapier-LICENSE.txt',retained)); // 保留上游JS、WASM及原授權原件。
if(!upstream.equals(original)||!wasm.equals(originalWasm)||sha256(license)!==RAPIER_INIT_PATCH.licenseSha256||!license.equals(retainedLicense))throw Error('RAPIER retained original source/WASM/license mismatch'); // 原件不符也在任何runtime寫入前拒絕。
await mkdir(root,{recursive:true}); // 所有Rapier guard先成功，才建立輸出目錄。
for(const [src,out] of [['three/build/three.module.js','three.module.js'],['three/build/three.core.js','three.core.js'],['three/LICENSE','three-LICENSE.txt']])await copyFile(new URL(`node_modules/${src}`,import.meta.url),new URL(out,root)); // Three版本與原建置內容不變。
const distributionNotice="// 修改標示：此公開副本由 gent a 於 2026-10-27 整理，基於 @dimforge/rapier3d-compat 0.19.0。\n// 已有修改 compat-0.19.0-init-object-1：只將內部 WASM init 的原 ArrayBuffer 包入 module_or_path；公開 init API 與 WASM 不變。\n// 本輪僅新增此顯著變更標示；上游原始碼、WASM、原 Apache-2.0 授權及精確修補配方均另行保留。\n"; // 公開副本保留顯著修改標示，精確 patch payload guard 仍維持原樣。
await writeFile(new URL('rapier.mjs',root),Buffer.concat([Buffer.from(distributionNotice),vendor]));await copyFile(new URL('rapier-LICENSE.txt',import.meta.url),new URL('rapier-LICENSE.txt',root)); // 僅寫入已核輸出並保留原license。
for(const name of ['optics.js','hazards.js'])await copyFile(new URL(name,import.meta.url),new URL(`../${name}`,root)); // 保留兩個唯一source原有複製流程。
console.log(`Pinned Three.js 0.180.0 / Rapier 0.19.0 with audited ${patchId}; original WASM and public init() unchanged.`); // 明示本地patch，不冒充未修改上游vendor。
