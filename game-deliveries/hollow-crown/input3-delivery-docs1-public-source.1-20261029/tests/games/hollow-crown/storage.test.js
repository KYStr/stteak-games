import test from 'node:test';
import assert from 'node:assert/strict';
import { SaveStore, SAVE_KEY, freshProfile, validateProfile, settleRun } from '../../../public/games/hollow-crown/storage.js';
const memory=()=>{const data=new Map();return{getItem:k=>data.get(k)??null,setItem:(k,v)=>data.set(k,v),data};};
test('new profile and preferences are versioned and round-trip',()=>{const s=new SaveStore(memory()),p=s.load();p.settings.music=0;p.settings.shake=false;s.save(p);assert.equal(s.load().settings.music,0);assert.equal(s.load().schemaVersion,1);assert.equal(s.load().revision,1);});
test('damaged primary restores last valid backup with visible notice',()=>{const m=memory(),s=new SaveStore(m),p=freshProfile();p.wins=3;s.save(p);p.wins=4;s.save(p);m.setItem(SAVE_KEY,'broken');assert.equal(s.load().wins,3);assert.match(s.notice,/備份/);});
test('invalid primary without backup safely rebuilds',()=>{const m=memory();m.setItem(SAVE_KEY,'null');const s=new SaveStore(m);assert.equal(s.load().wins,0);assert.match(s.notice,/重建/);});
test('damaged primary and backup rebuild without misreporting storage denial',()=>{ // 兩份資料損壞不代表瀏覽器拒絕儲存。
  const m=memory();m.setItem(SAVE_KEY,'bad');m.setItem(SAVE_KEY+'.backup','bad');const s=new SaveStore(m); // 建立仍可正常讀寫的雙損壞資料。
  assert.deepEqual(s.load(),freshProfile());assert.equal(s.available,true);assert.match(s.notice,/損壞|重建/); // 應回傳新營地並顯示正確原因。
  assert.doesNotMatch(s.notice,/無法存取儲存空間/);assert.equal(m.getItem(SAVE_KEY),'bad');assert.equal(m.getItem(SAVE_KEY+'.backup'),'bad'); // 載入不得偽稱API拒絕或覆寫原資料。
}); // 結束雙損壞存檔回歸。
test('successful retry clears a stale write failure without losing progress',()=>{ // 儲存恢復後不得殘留失敗告示。
  const m=memory();let fail=true;const s=new SaveStore({...m,setItem(k,v){if(fail)throw Error('quota');m.setItem(k,v);}}),p=freshProfile();p.wins=7; // 僅第一輪寫入模擬額度不足。
  assert.equal(s.save(p),false);assert.equal(s.available,false);assert.match(s.notice,/無法寫入/);assert.equal(p.revision,0);assert.equal(p.wins,7); // 失敗保留記憶體進度與原修訂。
  fail=false;assert.equal(s.save(p),true);assert.equal(s.available,true);assert.doesNotMatch(s.notice,/無法寫入/); // 正常重試回復可用並清除舊失敗。
  assert.equal(s.load().wins,7);assert.equal(p.revision,1);assert.equal(JSON.parse(m.getItem(SAVE_KEY)).revision,1); // 成功後資料及修訂確實已寫入。
}); // 結束寫入恢復回歸。
test('primary read denial remains distinct from damaged save data',()=>{ // 真正讀取拒絕必須仍顯示不可用。
  const s=new SaveStore({getItem(){throw Error('denied');},setItem(){throw Error('denied');}}); // 模擬瀏覽器封鎖儲存API。
  assert.deepEqual(s.load(),freshProfile());assert.equal(s.available,false);assert.match(s.notice,/無法存取儲存空間/); // 不得將API拒絕誤報為資料損壞。
}); // 結束主資料讀取拒絕回歸。
test('backup read denial remains a storage access failure',()=>{ // 主資料損壞後讀備份被拒絕仍屬API問題。
  const s=new SaveStore({getItem(k){if(k===SAVE_KEY)return 'bad';throw Error('denied');},setItem(){throw Error('denied');}}); // 僅允許主資料讀取。
  assert.deepEqual(s.load(),freshProfile());assert.equal(s.available,false);assert.match(s.notice,/無法存取儲存空間/); // 保留外層儲存拒絕處理。
}); // 結束備份讀取拒絕回歸。
test('storage denial is visible and does not throw or lose in-memory progress',()=>{const s=new SaveStore({getItem(){throw Error();},setItem(){throw Error();}});const p=s.load();p.wins=7;assert.equal(s.save(p),false);assert.equal(p.wins,7);assert.equal(s.available,false);assert.match(s.notice,/無法寫入/);});
test('settlement is idempotent per run ID and retry is a distinct run',()=>{const p=freshProfile(),r={won:true,rooms:[{id:'x'}],seed:1,time:99,challenge:'normal',challengeComplete:true};assert.equal(settleRun(p,'a',r),true);assert.equal(settleRun(p,'a',r),false);assert.equal(p.wins,1);assert.equal(settleRun(p,'b',r),true);assert.equal(p.wins,2);assert.deepEqual(p.skins,['ivory','cinder']);});
test('failed optional challenge does not earn challenge completion',()=>{const p=freshProfile();settleRun(p,'a',{won:true,challenge:'unbroken',challengeComplete:false});assert.deepEqual(p.challengeWins,[]);});
test('v0 preferences migrate without accepting unknown version',()=>{assert.equal(validateProfile({schemaVersion:0,settings:{music:0}}).settings.music,0);assert.throws(()=>validateProfile({schemaVersion:20}));});
test('values and arrays are bounded; mandatory starting choices stay available',()=>{const p=validateProfile({schemaVersion:1,wins:Infinity,settings:{music:7,effects:-2,quality:'ultra'},unlocked:['<script>'],completed:Array.from({length:200},(_,i)=>'r'+i)});assert.equal(p.wins,0);assert.equal(p.settings.music,1);assert.equal(p.settings.effects,0);assert.equal(p.settings.quality,'high');assert.equal(p.completed.length,150);assert.deepEqual(p.unlocked.sort(),['fleet-ash','wide-oath']);});
