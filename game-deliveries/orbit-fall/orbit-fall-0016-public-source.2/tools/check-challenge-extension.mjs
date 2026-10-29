// 【逐行中文】說明此工具只做作者新增指南自查，不能當獨立評分或原生遊戲驗證。
// Newly authored docs.1 check; not an independent score or native gameplay test.
// 【逐行中文】匯入嚴格斷言，任何不符合預期的狀態都會使此檢查失敗。
import assert from 'node:assert/strict';
// 【逐行中文】匯入檔案網址與檔案系統路徑之間的轉換函式。
import {fileURLToPath,pathToFileURL} from 'node:url';
// 【逐行中文】匯入路徑組合工具，後續模組位置不依賴呼叫端的目前目錄。
import path from 'node:path';
// 【逐行中文】載入保留的完整主程式測試夾具；夾具的受控替身邊界不變。
import {mainFixture} from './fixtures/main-fixture.mjs';
// 【逐行中文】以這支檔案的位置解析目標遊戲 runtime 的絕對路徑。
const root=fileURLToPath(new URL('../public/games/orbit-fall/',import.meta.url));
// 【逐行中文】從目標 runtime 載入真實房間、謎題及挑戰配置。
const {rooms,puzzles,challenges}=await import(pathToFileURL(path.join(root,'content.js')));
// 【逐行中文】從同一 runtime 載入真實規則模組，不另寫一套模擬規則。
const rules=await import(pathToFileURL(path.join(root,'rules.js')));
// 【逐行中文】從同一 runtime 載入真實保存與載入函式。
const {saveRun,loadRun}=await import(pathToFileURL(path.join(root,'storage.js')));
// 【逐行中文】固定本指南新增挑戰的識別碼，避免把其他測試內容當成本例。
const id='challenge-docs-reflection';
// 【逐行中文】要求指南複本恰有四個挑戰；原候選仍只有三個，因此原件不可誤作已擴充。
assert.equal(challenges.length,4,'Follow CONTENT-EXTENSION.md in a disposable copy first');
// 【逐行中文】找到新挑戰，逐一核對房間、謎題清單及一百二十秒時限。
const c=challenges.find(x=>x.id===id);assert.ok(c);assert.equal(c.roomId,'room-d1-optics');assert.deepEqual(c.puzzleIds,['puzzle-reflection-1']);assert.equal(c.timeLimit,120);
// 【逐行中文】用全新旅程確認挑戰仍受結局解鎖限制，不能因新增配置繞過門檻。
assert.equal(rules.startChallenge(id,rules.createRun()).reason,'challenge-locked');
// 【逐行中文】說明下段只是用公開規則建立已達結局的測試前提，並非原生完整遊玩。
// Public rules APIs create an earned-ending precondition. This is not a native campaign playthrough.
// 【逐行中文】建立故事狀態，透過原規則取得磁靴及牽引束。
const story=rules.createRun();rules.grantTool(story,'boots');rules.grantTool(story,'tether');
// 【逐行中文】逐房呼叫原規則進入與完成修復，以建立測試前提；不宣稱人類已解謎。
for(const room of rooms){assert.equal(rules.enterRoom(story,room.id).ok,true);if(room.puzzleId)assert.equal(rules.solvePuzzle(story,room.puzzleId).ok,true);}
// 【逐行中文】在測試前提中選擇返航結局，並確認原規則允許完成。
assert.equal(rules.finishEnding(story,'beacon').ok,true);
// 【逐行中文】建立記憶體鍵值儲存介面；它模擬儲存呼叫，不使用真瀏覽器 localStorage。
const entries=new Map(),storage={getItem:k=>entries.get(k)??null,setItem:(k,v)=>entries.set(k,String(v)),removeItem:k=>entries.delete(k)};
// 【逐行中文】經真保存流程寫入故事，再讀回作為永久進度比對基準。
assert.equal(saveRun(storage,story).ok,true);const before=loadRun(storage).run;
// 【逐行中文】將明確 runtime 路徑與同一儲存資料交給完整主程式夾具啟動。
let f=await mainFixture({root,entries});
// 【逐行中文】以結束清理區塊包住互動斷言，即使中途失敗也要釋放夾具。
try{
 // 【逐行中文】透過真主程式的繼續、結果及挑戰選單回呼選到新增識別碼。
 f.click('continue');assert.equal(f.snapshot().modal,'result');f.click('result-challenges');f.dataset('challenge',id);
 // 【逐行中文】確認進入指定光學房間，且新挑戰處於執行中。
 assert.equal(f.snapshot().roomId,c.roomId);assert.equal(f.snapshot().status,'running');
 // 【逐行中文】取得此挑戰使用的真謎題配置，避免在檢查內另造目標角度。
 const p=puzzles[c.puzzleIds[0]];
 // 【逐行中文】依目標角度呼叫原鏡面互動；一旦謎題完成便停止額外旋轉。
 for(let i=0;i<p.targetAngles.length;i++)for(let n=0;n<p.targetAngles[i]&&!f.snapshot().solvedPuzzles.includes(p.id);n++)f.interact('mirror-'+i,i);
 // 【逐行中文】要求原主程式將挑戰轉為完成狀態並顯示結果彈層。
 assert.equal(f.snapshot().status,'completed');assert.equal(f.snapshot().modal,'result');
 // 【逐行中文】讀回保存資料，確認新增紀錄存在且故事修復與結局不被挑戰覆寫。
 const saved=loadRun(f.storage).run;assert.ok(saved.challengeRecords[id]);assert.deepEqual(saved.solvedPuzzles,before.solvedPuzzles);assert.deepEqual(saved.endings,before.endings);
 // 【逐行中文】從結果回到故事，確認執行狀態與核心訊號房間都恢復正確。
 f.click('result-continue');assert.equal(f.snapshot().status,'running');assert.equal(f.snapshot().roomId,'room-d3-signal');
// 【逐行中文】無論成功或斷言失敗，都清理第一個夾具的物理資源及全域替身。
}finally{f.dispose();}
// 【逐行中文】用同份保存啟動新主程式，核新紀錄仍在，並由地圖選單啟動舊貨艙挑戰；最後一定清理。
f=await mainFixture({root,entries});try{f.click('continue');assert.ok(loadRun(f.storage).run.challengeRecords[id]);f.click('map-button');f.click('challenge-menu');f.dataset('challenge','challenge-cargo');assert.equal(f.snapshot().roomId,'room-d1-cargo');}finally{f.dispose();}
// 【逐行中文】輸出有限檢查結果與受控替身說明；不把這份輸出當作原生或品質評分。
console.log(JSON.stringify({status:'PASS',extension:id,checks:['locked-before-ending','real-main-menu-discovers-new-ID','actual-mirror-handlers-solve','new-record-saved','story-progress-preserved','return-story','fresh-main-reloads-record','old-challenge-launch-still-works'],boundary:'Whole main/rules/storage/optics/physics; synthetic DOM/render/audio/bridge/proximity/RAF; precondition made with public rules APIs, no GUI/native travel or product quality score.'}));
