import test from 'node:test'; // 使用內建測試器核對真正初始化警告，而非只看字串patch。
import assert from 'node:assert/strict'; // 對警告數與API形狀採嚴格斷言。
import {execFileSync} from 'node:child_process'; // 每案以fresh Node程序避免Rapier既有快取掩蓋首次初始化。
const physicsUrl=new URL('../../../public/games/orbit-fall/physics.js',import.meta.url).href; // 載入正式app物理入口，不替換它的零參數API。
test('actual candidate initialization removes the internal deprecated-argument warning without console suppression',()=>{ // 0012在此實際輸出一條警告而紅燈。
    const source=`const messages=[],nativeWarn=console.warn;console.warn=(...args)=>{messages.push(args.map(String).join(' '));nativeWarn(...args)};const {initializePhysics,RAPIER}=await import(${JSON.stringify(physicsUrl)});await initializePhysics();await initializePhysics();console.log(JSON.stringify({messages,appArgs:initializePhysics.length,publicArgs:RAPIER.init.length}));`; // 測試觀察器保留原樣stderr，並執行兩次公開初始化。
    const result=JSON.parse(execFileSync(process.execPath,['--input-type=module','-e',source],{encoding:'utf8',stdio:['ignore','pipe','pipe']}).trim()); // 只分析真正入口輸出，不改生產程式。
    assert.equal(result.messages.filter(x=>x.includes('deprecated parameters')).length,0);assert.equal(result.appArgs,0);assert.equal(result.publicArgs,0); // 不能靠改app API或吞warning取得綠燈。
}); // 結束真入口反例。
import {readFile,mkdtemp,mkdir,writeFile,rm,readdir} from 'node:fs/promises'; // 讀取保留原件並建立受控build拒絕案例。
import {tmpdir} from 'node:os'; // 暫存測試不接觸使用者設定。
import {join} from 'node:path'; // 組合只屬於本測試的路徑。
import {fileURLToPath} from 'node:url'; // 將測試模組路徑傳給fresh程序。
import {patchRapierInit,RAPIER_INIT_PATCH,sha256} from '../../../games/orbit-fall/rapier-init-patch.mjs'; // 測真正guarded recipe，不複製轉換邏輯。
const retained=new URL('../../../assets/games/orbit-fall/vendor-sources/',import.meta.url),upstream=await readFile(new URL('rapier-0.19.0.mjs',retained)),wasm=await readFile(new URL('rapier-0.19.0.wasm',retained)),license=await readFile(new URL('rapier-LICENSE.txt',retained)); // 原vendor、WASM與license都是可核對的實檔。
test('audited single-call patch preserves original source/WASM/license and exact output identity',async()=>{ // 完整來源與輸出hash雙向鎖定。
    const original=Buffer.from(upstream),result=patchRapierInit(upstream),manifest=JSON.parse(await readFile(new URL('manifest.json',retained),'utf8')); // 使用正式retained manifest。
    assert.equal(sha256(upstream),RAPIER_INIT_PATCH.upstreamSha256);assert.equal(sha256(license),RAPIER_INIT_PATCH.licenseSha256);assert.equal(sha256(wasm),RAPIER_INIT_PATCH.wasmSha256);assert.equal(wasm.length,1555075); // 不升版或改引擎／授權。
    assert.equal(sha256(result.vendor),RAPIER_INIT_PATCH.outputSha256);assert.deepEqual(result.wasm,wasm);assert.deepEqual(upstream,original);assert.equal(manifest.patchId,RAPIER_INIT_PATCH.id);assert.equal(manifest.patchedRuntimeSha256,sha256(result.vendor));assert.equal(manifest.upstreamSourceSha256,RAPIER_INIT_PATCH.upstreamSha256);assert.equal(manifest.wasmSha256,RAPIER_INIT_PATCH.wasmSha256);assert.equal(manifest.wasmBytes,RAPIER_INIT_PATCH.wasmBytes);assert.equal(manifest.licenseSha256,RAPIER_INIT_PATCH.licenseSha256);assert.equal(manifest.exactCallOffset,RAPIER_INIT_PATCH.callOffset);assert.equal(manifest.exactCallBytes,RAPIER_INIT_PATCH.callBytes);assert.equal(manifest.exactCallSha256,RAPIER_INIT_PATCH.callSha256); // 產物、原件與記錄一致且輸入不變。
    const before=upstream.toString('utf8'),after=result.vendor.toString('utf8'),old=before.slice(RAPIER_INIT_PATCH.callOffset,RAPIER_INIT_PATCH.callOffset+RAPIER_INIT_PATCH.callBytes),replacement='yield xA({module_or_path:'+old.slice('yield xA('.length,-1)+'})'; // 明確計算唯一允許的包裹內容。
    assert.equal(after,before.slice(0,RAPIER_INIT_PATCH.callOffset)+replacement+before.slice(RAPIER_INIT_PATCH.callOffset+RAPIER_INIT_PATCH.callBytes)); // 其他vendor bytes不能一起被修改。
}); // 結束精確轉換案例。
for(const index of [0,141650,150000,upstream.length-1])test(`unknown upstream mutation at byte${index} fails closed`,()=>{ // 來源任意部位改動都不接受。
    const changed=Buffer.from(upstream);changed[index]^=1;assert.throws(()=>patchRapierInit(changed),/refuses unknown upstream/); // 不先做模糊replace再警告。
}); // 結束逐位元突變案例。
test('duplicate, appended, already patched and invalid-type inputs cannot silently repatch',()=>{ // 包含錯版本／非原件常見誤用。
    const call=upstream.subarray(RAPIER_INIT_PATCH.callOffset,RAPIER_INIT_PATCH.callOffset+RAPIER_INIT_PATCH.callBytes); // 使用真正單一原呼叫而非隨意字串。
    for(const input of [Buffer.concat([upstream,call]),Buffer.concat([upstream,Buffer.from('\n')]),patchRapierInit(upstream).vendor,'not bytes'])assert.throws(()=>patchRapierInit(input),/refuses unknown upstream/); // 完整hash不符一律停止。
}); // 結束錯誤來源案例。
async function guardFixture(t,{badUpstream=false,badWasm=false,badLicense=false}={}){ // 真正執行build腳本，核對錯誤時沒有任何runtime寫入。
    const root=await mkdtemp(join(tmpdir(),'orbit-rapier-build-guard-'));t.after(()=>rm(root,{recursive:true,force:true})); // 只清理本測試回傳的唯一暫存資料夾。
    const game=join(root,'games/orbit-fall'),source=join(root,'assets/games/orbit-fall/vendor-sources'),out=join(root,'public/games/orbit-fall/vendor'),npm=join(game,'node_modules/@dimforge/rapier3d-compat'); // 建立最小但真實相對路徑。
    for(const p of [game,source,out,npm])await mkdir(p,{recursive:true}); // 所有資料都在已知測試root下。
    for(const n of ['build.mjs','rapier-init-patch.mjs'])await writeFile(join(game,n),await readFile(new URL('../../../games/orbit-fall/'+n,import.meta.url))); // 執行原production recipe而非重寫的mock。
    const input=Buffer.from(upstream),binary=Buffer.from(wasm),text=Buffer.from(license);if(badUpstream)input[0]^=1;if(badWasm)binary[0]^=1;if(badLicense)text[0]^=1; // 精準破壞一項來源條件。
    await writeFile(join(npm,'rapier.mjs'),input);await writeFile(join(source,'rapier-0.19.0.mjs'),upstream);await writeFile(join(source,'rapier-0.19.0.wasm'),binary);await writeFile(join(source,'rapier-LICENSE.txt'),license);await writeFile(join(game,'rapier-LICENSE.txt'),text); // 原件與被破壞物保持可區分。
    const sentinel=Buffer.from('existing runtime must stay byte-identical');await writeFile(join(out,'rapier.mjs'),sentinel);let failure;try{execFileSync(process.execPath,[join(game,'build.mjs')],{encoding:'utf8',stdio:['ignore','pipe','pipe']});}catch(error){failure=error;} // 保留真程序的失敗，不把它當測試自身例外跳過。
    assert.ok(failure,'Invalid recipe input must fail');assert.match(failure.stderr,badUpstream?/refuses unknown upstream/:/retained original source\/WASM\/license mismatch/);assert.deepEqual(await readFile(join(out,'rapier.mjs')),sentinel);assert.deepEqual(await readdir(out),['rapier.mjs']); // 既有輸出及目錄內容均未被部分寫入。
} // 結束真build拒絕場景。
test('actual build rejects unknown npm vendor before any runtime write',t=>guardFixture(t,{badUpstream:true})); // 不能只在純函式測來源guard。
test('actual build rejects changed retained WASM before any runtime write',t=>guardFixture(t,{badWasm:true})); // retained引擎原件也受guard。
test('actual build rejects changed license before any runtime write',t=>guardFixture(t,{badLicense:true})); // 授權原件不能悄悄漂移。
test('fresh upstream versus candidate:12 actual rooms/4320 steps and every120-step binary snapshot are identical',()=>{ // 警告修補不得改物理行為。
    const probe=fileURLToPath(new URL('rapier-equivalence-probe.mjs',import.meta.url)),run=variant=>JSON.parse(execFileSync(process.execPath,[probe,variant],{encoding:'utf8',stdio:['ignore','pipe','pipe'],maxBuffer:4*1024*1024,timeout:30000}).trim()); // 兩版分別fresh程序，不共用初始化狀態。
    const a=run('upstream'),b=run('candidate');assert.equal(a.warnings.filter(x=>x.includes('deprecated parameters')).length,1);assert.equal(b.warnings.length,0);assert.equal(a.rooms,12);assert.equal(b.rooms,12);assert.equal(a.fixedSteps,4320);assert.equal(b.fixedSteps,4320);assert.deepEqual(b.trace,a.trace); // 不以相近位置或最後reset之後的狀態代替全trace相等。
}); // 結束實際物理反事實比對。
