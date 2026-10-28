import test from 'node:test'; // 使用既有的Node測試執行器，不新增遊戲內測試介面。
import assert from 'node:assert/strict'; // 以嚴格斷言核對正規存檔與畫面文字。
import {readFileSync} from 'node:fs'; // 讀取實際產品來源，避免另寫一份假畫面邏輯。
import vm from 'node:vm'; // 沿用既有測試模式，在隔離環境執行真正的refreshMenu。
import {TRACKS,CARS} from '../../../games/neon-drift/src/content.js'; // 保留正式選單資料。
import {createRace,stepRace,resetCar} from '../../../games/neon-drift/src/physics.js'; // 教學結算由既有輸入與物理流程取得。
import {SAVE_KEY,BACKUP_KEY,loadSave,saveRace} from '../../../games/neon-drift/src/storage.js'; // 測試使用正式保存與讀取路徑。
import {trackMenuLabel} from '../../../games/neon-drift/src/presentation.js'; // 選單標籤沿用既有呈現函式。
import {driftInput} from './driver.js'; // 使用既有純邏輯駕駛測試器，不代表真人操作驗收。
const source=readFileSync(new URL('../../../games/neon-drift/src/main.js',import.meta.url),'utf8'); // 檢查最終來源而非預先抄錄的函式。
const refreshSource=source.slice(source.indexOf('function refreshMenu(){'),source.indexOf('\nfunction showPreview')); // 只隔離選單刷新，不載入WebGL。
class MemoryStorage { // 可控儲存媒介僅存在於測試程式。
  constructor(){this.values=new Map();} // 每個案例從獨立儲存開始。
  getItem(key){return this.values.get(key)??null;} // 模擬標準Storage缺值行為。
  setItem(key,value){this.values.set(key,String(value));} // 保留實際序列化內容。
  removeItem(key){this.values.delete(key);} // 驗證既有清除紀錄後的顯示。
} // 不變更產品的Storage schema。
function menuFixture(save){ // 載入實際選單函式，DOM替身只記錄呈現效果。
  let progress='',writes=0;const nodes=new Map(); // 記錄更新次數，防止同狀態反覆播報。
  const progressNode={get textContent(){return progress;},set textContent(value){progress=value;writes++;}}; // 模擬狀態節點。
  nodes.set('#tutorial-progress',progressNode); // 與正式HTML使用相同ID。
  const $=selector=>{if(!nodes.has(selector))nodes.set(selector,{});return nodes.get(selector);}; // 其他既有選單節點維持可寫。
  const context=vm.createContext({save,$,TRACKS,CARS,trackId:'harbor',carId:'comet',mode:'time',trackMenuLabel,trackPath:()=>'',track:()=>TRACKS[0],car:()=>CARS[0],record:()=>null,fmt:String,document:{querySelectorAll:()=>[]}}); // 隔離選單依賴，不觸發輸入或渲染。
  vm.runInContext(refreshSource,context); // 執行原檔案中的函式定義。
  return {refresh(next=save){context.save=next;vm.runInContext('refreshMenu()',context);},get text(){return progress;},get writes(){return writes;}}; // 測試介面只存在於測試檔。
} // 實際產品不提供新debug API。
function completedTutorial(){ // 透過既有正常邏輯完成90秒教學。
  const race=createRace({mode:'tutorial'}); // 不直接寫入完成旗標。
  for(let frame=0;frame<93*30&&!race.finished;frame++){ // 包含倒數，保持既有時間與難度。
    stepRace(race,driftInput(race),1/30); // 由既有控制輸入推進教學目標。
    if(race.elapsed>70&&!race.tutorial.recover)resetCar(race); // 使用正式回正規則完成最後目標。
  } // 迴圈只用於純邏輯測試。
  assert.equal(race.result.success,true);return race; // 必須合法成功才交給保存流程。
} // 不把模擬完成當作真人品質分數。
test('全新進度顯示未完成，重複刷新不寫存檔也不重播相同狀態',()=>{ // 驗證初始與重複選單刷新。
  const save=loadSave(new MemoryStorage()),before=JSON.stringify(save),menu=menuFixture(save); // 使用正規預設存檔。
  menu.refresh();menu.refresh();assert.equal(menu.text,'教學進度：尚未完成'); // 未完成的文案不暗示尚未開始或永久保存。
  assert.equal(menu.writes,1);assert.equal(JSON.stringify(save),before); // 顯示路徑沒有副作用。
}); // 初始案例結束。
test('合法完成後、返回車庫與重新載入都讀正規tutorialComplete',()=>{ // 涵蓋完成與重載的資料契約。
  const storage=new MemoryStorage(),save=loadSave(storage),menu=menuFixture(save);menu.refresh(); // 初始為未完成。
  const result=saveRace(save,completedTutorial(),storage);assert.equal(result.ok,true); // 由既有正式保存流程結算。
  menu.refresh(result.save);assert.equal(menu.text,'教學進度：已完成（目前進度）'); // 返回選單即讀最新記憶體存檔。
  menu.refresh(loadSave(storage));assert.equal(menu.text,'教學進度：已完成（目前進度）'); // 重載後從持久資料還原。
  assert.equal(menu.writes,2);assert.equal(JSON.parse(storage.getItem(SAVE_KEY)).tutorialComplete,true); // 相同完成狀態不重播報。
}); // 完成案例結束。
test('中途離開或教學未達目標不會顯示已完成',()=>{ // 防止只開始教學就誤報。
  const storage=new MemoryStorage(),save=loadSave(storage),race=createRace({mode:'tutorial'}); // 全新教學尚未完成。
  const interrupted=saveRace(save,race,storage);assert.equal(interrupted.ok,false); // 非合法結算不得保存完成。
  const menu=menuFixture(interrupted.save);menu.refresh();assert.equal(menu.text,'教學進度：尚未完成'); // 放棄仍未完成。
  for(let frame=0;frame<93*30&&!race.finished;frame++)stepRace(race,{},1/30); // 不操作直到正式失敗結果。
  assert.equal(race.result.success,false);menu.refresh(saveRace(save,race,storage).save); // 讀取失敗結算返回的存檔。
  assert.equal(menu.text,'教學進度：尚未完成');assert.equal(storage.getItem(SAVE_KEY),null); // 不新增假的完成記錄。
}); // 未完成案例結束。
test('寫入被擋只顯示目前進度，不宣稱已保存且重新載入仍忠於可讀存檔',()=>{ // 涵蓋記憶體完成與持久寫入失敗的區別。
  const storage=new MemoryStorage(),save=loadSave(storage);storage.setItem=()=>{throw Error('blocked');}; // 只模擬儲存寫入受阻。
  const result=saveRace(save,completedTutorial(),storage);assert.equal(result.ok,false); // 正式保存函式保留失敗語意。
  const menu=menuFixture(result.save);menu.refresh();assert.equal(menu.text,'教學進度：已完成（目前進度）'); // 本次完成仍可如實呈現。
  assert.match(result.notice,/儲存失敗/);assert.doesNotMatch(menu.text,/已保存|永久|同步/); // 沒有覆蓋原失敗通知或虛構持久性。
  menu.refresh(loadSave(storage));assert.equal(menu.text,'教學進度：尚未完成'); // 重載不得假造沒有寫入的進度。
}); // 儲存受阻案例結束。
test('損壞主檔恢復、非布林舊值與清除紀錄沿用正規讀取規則',()=>{ // 覆蓋恢復及清除的選單狀態。
  const storage=new MemoryStorage();saveRace(loadSave(storage),completedTutorial(),storage); // 先取得正式可讀完成存檔。
  storage.setItem(BACKUP_KEY,storage.getItem(SAVE_KEY));storage.setItem(SAVE_KEY,'{bad'); // 模擬既有備份恢復情境。
  const recovered=loadSave(storage),menu=menuFixture(recovered);menu.refresh(); // 正式讀取負責恢復。
  assert.match(recovered.notice,/備份/);assert.equal(menu.text,'教學進度：已完成（目前進度）'); // 完成提示與恢復通知互不覆蓋。
  storage.setItem(SAVE_KEY,JSON.stringify({...recovered,tutorialComplete:'true'}));menu.refresh(loadSave(storage)); // 非布林舊值交由sanitize處理。
  assert.equal(menu.text,'教學進度：尚未完成'); // 不把任意truthy值當完成。
  storage.removeItem(SAVE_KEY);storage.removeItem(BACKUP_KEY);menu.refresh(loadSave(storage)); // 模擬正式清除的同一組儲存鍵。
  assert.equal(menu.text,'教學進度：尚未完成'); // 清除後不保留舊文字。
}); // 恢復案例結束。
test('讀取被瀏覽器阻擋時顯示安全預設且保留正式通知',()=>{ // 不猜測無法讀取的持久進度。
  const save=loadSave({getItem(){throw Error('blocked');}}),menu=menuFixture(save); // 用正式讀取流程處理權限失敗。
  menu.refresh();assert.equal(menu.text,'教學進度：尚未完成');assert.match(save.notice,/封鎖本機儲存/); // 顯示安全預設但不清除原提示。
}); // 讀取受阻案例結束。
for(const retryWorks of [true,false])test(`配額失敗後重試${retryWorks?'成功':'失敗'}的教學文字不誇大持久性`,()=>{ // 分開驗證配額降級成功與徹底失敗。
  const storage=new MemoryStorage(),save=loadSave(storage);storage.setItem(SAVE_KEY,JSON.stringify(save)); // 預先保留可讀的未完成進度。
  const write=storage.setItem.bind(storage);let mainWrites=0; // 只針對主要儲存寫入模擬配額限制。
  storage.setItem=(key,value)=>{if(key===SAVE_KEY&&++mainWrites<(retryWorks?2:3))throw Object.assign(Error('quota'),{name:'QuotaExceededError'});write(key,value);}; // 沿正式persist的重試分支。
  const result=saveRace(save,completedTutorial(),storage),menu=menuFixture(result.save);menu.refresh(); // 正式保存結果仍是目前完成進度。
  assert.equal(result.ok,retryWorks);assert.equal(mainWrites,2);assert.equal(menu.text,'教學進度：已完成（目前進度）'); // 目前文字不捏造持久寫入結果。
  assert.match(result.notice,retryWorks?/儲存空間不足/:/儲存失敗/);menu.refresh(loadSave(storage)); // 重載交由既有Storage解析。
  assert.equal(menu.text,retryWorks?'教學進度：已完成（目前進度）':'教學進度：尚未完成'); // 有寫入才在重載後顯示完成。
}); // 配額案例結束。
test('已完成進度在重練未完成後不倒退',()=>{ // 已取得進度不被新的未完成練習覆寫。
  const storage=new MemoryStorage(),done=saveRace(loadSave(storage),completedTutorial(),storage).save; // 合法取得完成進度。
  const retry=saveRace(done,createRace({mode:'tutorial'}),storage),menu=menuFixture(retry.save);menu.refresh(); // 中途結束重練。
  assert.equal(menu.text,'教學進度：已完成（目前進度）'); // 原完成進度保持。
}); // 重練案例結束。
test('新提示保留原按鈕、12px下限與自然換行，不新增焦點或隱藏API',()=>{ // 這是靜態契約，不冒充390px與1600px真人畫面驗收。
  const html=readFileSync(new URL('../../../games/neon-drift/src/index.html',import.meta.url),'utf8'),css=readFileSync(new URL('../../../games/neon-drift/src/style.css',import.meta.url),'utf8'); // 檢查最終HTML與CSS。
  assert.match(html,/<button id="tutorial-button" aria-describedby="tutorial-progress">90 秒駕駛學堂<\/button>/); // 教學按鈕身份及動作文字不變。
  const node=html.match(/<p id="tutorial-progress"[^>]*>/)[0];assert.match(node,/role="status"/);assert.match(node,/aria-atomic="true"/); // 進度可被輔助技術讀取。
  assert.doesNotMatch(node,/tabindex|autofocus|hidden/); // 不增加焦點或隱藏顯示。
  const rule=css.match(/#garage \.tutorial-progress\{([^}]+)\}/)[1];assert.match(rule,/font-size:max\(12px,\.75rem\)/);assert.match(rule,/overflow-wrap:anywhere/); // 窄螢幕不靠縮字塞入。
  assert.doesNotMatch(rule,/(?:^|;)(?:height:|overflow:hidden|position:)/);assert.match(css,/#garage\{[^}]*overflow-y:auto/); // 沿正常文流與既有車庫捲動，不把line-height誤當固定高度。
  assert.match(source,/BUILD='neon-drift-tutorial-progress-0015',VERSION='1\.0\.13'/); // 不冒用0014候選身份。
  assert.doesNotMatch(refreshSource,/localStorage|saveRace\(|saveSettings\(|focus\(|scrollTo\(|scrollTop\s*=/); // 顯示不寫入、移焦或重設捲動。
}); // 靜態契約案例結束。
