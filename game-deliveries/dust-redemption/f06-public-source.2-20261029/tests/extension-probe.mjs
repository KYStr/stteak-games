// 中文逐行說明：界定此檔只驗交付內容進入主程式，不重跑戰役，也不冒充瀏覽器測試。
// Delivery-only content probe, not a campaign replay or a browser test.
// 中文逐行說明：載入 Node 的嚴格斷言，讓不符預期的結果直接失敗。
import assert from 'node:assert/strict';
// 中文逐行說明：載入非同步檔案讀取功能，用來讀既有通關資料。
import fs from 'node:fs/promises';
// 中文逐行說明：載入路徑工具，把指定的執行時目錄轉為絕對路徑。
import path from 'node:path';
// 中文逐行說明：沿用原測試替身與記憶體儲存器，不在此改寫產品程式。
import { harness, memoryStorage } from './captured-dom-harness.mjs';
// 中文逐行說明：讀取四個命令列參數：執行時目錄、預期存在與否、標題及正文。
const [root, expected, title, text] = process.argv.slice(2);
// 中文逐行說明：檢查必要參數，且預期值只能是 present 或 absent。
assert.ok(root && ['present','absent'].includes(expected) && title && text,
  // 中文逐行說明：參數不合法時顯示正確呼叫方式；這一行完成前一行的斷言。
  'usage: node --experimental-vm-modules tests/extension-probe.mjs RUNTIME present|absent TITLE TEXT');
// 中文逐行說明：建立隔離的記憶體儲存，使用產品真正的 schema 2 存檔鍵。
const disk=memoryStorage(), key='stteak:dust-redemption:profile:v2';
// 中文逐行說明：讀入原先已賺得六任務成果的 fixture，不在此偽造新通關紀錄。
const raw=await fs.readFile(new URL('./earned-after-dawn-pact.json',import.meta.url),'utf8');
// 中文逐行說明：把原始 fixture 字串放入隔離存檔鍵，供真正載入流程讀取。
disk.setItem(key,raw);
// 中文逐行說明：以指定執行時及隔離儲存啟動既有 main 測試環境。
const h=await harness({root:path.resolve(root),disk});
// 中文逐行說明：確認產品確實載入有效存檔，而不是退回新遊戲。
assert.equal(h.api.get().loaded.status,'loaded');
// 中文逐行說明：保留載入後的 profile JSON，稍後核對閱讀結局沒有改狀態。
const before=JSON.stringify(h.api.get().profile);
// 中文逐行說明：確認 fixture 的旅費為 730，避免誤用其他進度資料。
assert.equal(h.api.get().profile.wallet,730);
// 中文逐行說明：確認 fixture 已完成六任務；這不是本次重新通關的聲稱。
assert.equal(h.api.get().profile.completed.length,6);
// 中文逐行說明：透過當下可見按鈕先進鎮上，再開啟結局頁。
h.click('hub'); h.click('ending');
// 中文逐行說明：確認真正主程式已切到 ending 模式。
assert.equal(h.api.get().mode,'ending');
// 中文逐行說明：取得替身 DOM 中主程式實際生成的覆蓋面板 HTML。
const html=h.get('overlay').innerHTML;
// 中文逐行說明：確認此存檔顯示的是眾人的黎明，而非其他結局。
assert.ok(html.includes('<h2>眾人的黎明</h2>'));
// 中文逐行說明：組合本次新增內容應輸出的完整標題與正文 HTML 片段。
const block='<h3>'+title+'</h3><p>'+text+'</p>';
// 中文逐行說明：依 present 或 absent 核對主程式輸出是否包含精確新增片段。
assert.equal(html.includes(block),expected==='present','actual main ending renders exact added outcome');
// 中文逐行說明：以片段出現次數檢查存在時恰好一次，缺席時為零次。
assert.equal(html.split(block).length-1,expected==='present'?1:0,'no duplicate rendered item');
// 中文逐行說明：核對閱讀結局前後的 profile JSON 完全不變。
assert.equal(JSON.stringify(h.api.get().profile),before,'reading ending must not change profile');
// 中文逐行說明：核對儲存器仍保留原始字串，閱讀動作沒有重寫 fixture。
assert.equal(disk.getItem(key),raw,'reading ending must not write the fixture');
// 中文逐行說明：確認 main 測試環境未記錄執行時錯誤。
assert.deepEqual(h.runtimeErrors,[]);
// 中文逐行說明：輸出本窄檢查的結果與範圍，明示 gui 為 false，不聲稱原生畫面通過。
console.log(JSON.stringify({status:'PASS',expected,title,actualMain:'ending()',route:'title -> hub -> visible ending button',profileUnchanged:true,diskUnchanged:true,gui:false}));
