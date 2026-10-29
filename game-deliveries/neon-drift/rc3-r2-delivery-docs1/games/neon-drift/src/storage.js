import { CARS,TRACKS,COLORS,DECALS,PHYSICS_VERSION,TRACK_VERSION } from './content.js';
import { validGhost } from './physics.js';

export const SAVE_KEY='stteak:neon-drift:save';
export const BACKUP_KEY=`${SAVE_KEY}:backup`;
export const SAVE_VERSION=2;
export const DEFAULT_SETTINGS=Object.freeze({
  carId:'comet',trackId:'harbor',mode:'time',colorId:'cyan',decalId:'none',sensitivity:1,
  sensitivityByCar:{comet:1,stinger:1,phantom:1},autoThrottle:true,ghost:true,volume:.55,musicVolume:.28,
  reducedMotion:false,speedFov:true,quality:'auto',touchControls:false,
});
const rank={none:0,bronze:1,silver:2,gold:3};
const plain=value=>value&&typeof value==='object'&&!Array.isArray(value);
const finite=value=>typeof value==='number'&&Number.isFinite(value);
const positive=value=>finite(value)&&value>0;
const clamp=(n,a,b)=>Math.min(b,Math.max(a,n));
function emptySave(){return {schemaVersion:SAVE_VERSION,physicsVersion:PHYSICS_VERSION,trackVersion:TRACK_VERSION,
  settings:{...DEFAULT_SETTINGS,sensitivityByCar:{...DEFAULT_SETTINGS.sensitivityByCar}},records:{},unlocks:{medals:0,colors:['cyan','rose'],decals:['none']},tutorialComplete:false,notice:''};}
function getStorage(storage) {
  if(storage)return storage;
  try{return globalThis.localStorage||null;}catch{return null;}
}
function settingsFrom(raw={}) {
  const out={...DEFAULT_SETTINGS,sensitivityByCar:{...DEFAULT_SETTINGS.sensitivityByCar}};
  if(CARS.some(c=>c.id===raw.carId))out.carId=raw.carId;
  if(TRACKS.some(t=>t.id===raw.trackId))out.trackId=raw.trackId;
  if(['time','drift'].includes(raw.mode))out.mode=raw.mode;
  if(COLORS.some(c=>c.id===raw.colorId))out.colorId=raw.colorId;
  if(DECALS.some(d=>d.id===raw.decalId))out.decalId=raw.decalId;
  for(const key of ['autoThrottle','ghost','reducedMotion','speedFov','touchControls'])if(typeof raw[key]==='boolean')out[key]=raw[key];
  for(const key of ['volume','musicVolume'])if(finite(raw[key]))out[key]=clamp(raw[key],0,1);
  if(['auto','low','medium','high'].includes(raw.quality))out.quality=raw.quality;
  if(raw.quality==='balanced')out.quality='medium';
  if([0,1,2].includes(raw.sensitivity))out.sensitivity=raw.sensitivity;
  if(plain(raw.sensitivityByCar)) {
    for(const car of CARS)if([0,1,2].includes(raw.sensitivityByCar[car.id]))out.sensitivityByCar[car.id]=raw.sensitivityByCar[car.id];
  }else out.sensitivityByCar[out.carId]=out.sensitivity;
  out.sensitivity=out.sensitivityByCar[out.carId];
  return out;
}
function unlocksFor(records,previous={}) {
  const earned=Object.values(records).filter(r=>rank[r.medal]>0).length;
  // Cosmetics remain readable even if a damaged or migrated record loses its detailed timing data.
  const retained=Number.isInteger(previous.medals)?clamp(previous.medals,0,6):0;
  const medals=Math.max(earned,retained);
  return {medals,colors:COLORS.filter(c=>c.unlock<=medals).map(c=>c.id),decals:DECALS.filter(c=>c.unlock<=medals).map(c=>c.id)};
}
function sanitize(raw) {
  const out=emptySave();let droppedGhost=false;
  if(!plain(raw))return out;
  out.settings=settingsFrom(plain(raw.settings)?raw.settings:{});out.tutorialComplete=raw.tutorialComplete===true;
  if(plain(raw.records))for(const track of TRACKS)for(const mode of ['time','drift']) {
    const key=`${track.id}:${mode}`,r=raw.records[key];if(!plain(r))continue;
    const record={bestTime:positive(r.bestTime)?r.bestTime:null,bestScore:finite(r.bestScore)&&r.bestScore>=0?Math.floor(r.bestScore):0,
      bestLap:positive(r.bestLap)?r.bestLap:null,medal:Object.hasOwn(rank,r.medal)?r.medal:'none',
      carId:CARS.some(c=>c.id===r.carId)?r.carId:'comet',attempts:Number.isInteger(r.attempts)&&r.attempts>=0?r.attempts:0,
      updatedAt:typeof r.updatedAt==='string'?r.updatedAt.slice(0,40):'',ghost:null,
      sectors:Array.isArray(r.sectors)?r.sectors.filter(s=>plain(s)&&positive(s.time)&&Number.isInteger(s.sector)&&s.sector>=1&&s.sector<=8).slice(0,8).map(s=>({sector:s.sector,time:s.time})):[]};
    if(r.ghost) {
      if(validGhost(r.ghost,track.id)&&r.ghost.samples.length<=7000)record.ghost=r.ghost;
      else droppedGhost=true;
    }
    out.records[key]=record;
  }
  out.unlocks=unlocksFor(out.records,plain(raw.unlocks)?raw.unlocks:{});
  if(!out.unlocks.colors.includes(out.settings.colorId))out.settings.colorId='cyan';
  if(!out.unlocks.decals.includes(out.settings.decalId))out.settings.decalId='none';
  if(droppedGhost)out.notice='物理／賽道版本更新或幽靈資料損壞：舊幽靈已停用，獎牌與最佳紀錄保留。';
  if(raw.schemaVersion!==SAVE_VERSION)out.notice=out.notice||'已轉換可讀的舊存檔，獎牌與設定保留。';
  return out;
}
export function loadSave(storage) {
  const target=getStorage(storage);if(!target){const save=emptySave();save.notice='此瀏覽器無法使用本機儲存；本次進度僅保留至離開。';return save;}
  try {
    const text=target.getItem(SAVE_KEY);if(!text)return emptySave();
    try {
      const parsed=JSON.parse(text);if(!plain(parsed))throw Error('Invalid save');return sanitize(parsed);
    }catch {
      const backup=target.getItem(BACKUP_KEY);
      if(backup){try {const parsed=JSON.parse(backup);if(!plain(parsed))throw Error('Invalid backup');const save=sanitize(parsed);save.notice='主要存檔損壞，已恢復上次可讀備份。';return save;}catch{ /* use clean fallback */ }}
      const save=emptySave();save.notice='本機存檔無法讀取，已安全建立新進度。';return save;
    }
  }catch {const save=emptySave();save.notice='瀏覽器封鎖本機儲存；本次進度僅保留至離開。';return save;}
}
function payload(save){const {notice,...rest}=save;return JSON.stringify(rest);}
function persist(save,storage) {
  const target=getStorage(storage);if(!target)return {ok:false,save,notice:'無法儲存：瀏覽器未提供本機儲存，進度暫留本次遊玩。'};
  let readableMain=false;
  try {
    const old=target.getItem(SAVE_KEY);
    if(old){try{readableMain=Boolean(plain(JSON.parse(old)));if(readableMain)target.setItem(BACKUP_KEY,old);}catch{/* Main write remains atomic if backup is unavailable. */}}
    target.setItem(SAVE_KEY,payload(save));save.notice='';return {ok:true,save,notice:''};
  }catch(error) {
    if(error?.name==='QuotaExceededError') {
      const reduced=sanitize(save);for(const record of Object.values(reduced.records))record.ghost=null;
      // A failed main write must not discard the only readable recovery copy.
      try {if(readableMain)target.removeItem(BACKUP_KEY);target.setItem(SAVE_KEY,payload(reduced));reduced.notice='儲存空間不足：已保存獎牌、成績與設定，本次幽靈未保存。';return {ok:true,save:reduced,notice:reduced.notice};}catch{/* Fall through to visible failure. */}
    }
    save.notice='儲存失敗：進度暫留本次遊玩，重新載入前請檢查瀏覽器儲存權限。';return {ok:false,save,notice:save.notice};
  }
}
/** Only a legally finished race reaches storage. Incomplete laps never replace a record. */
export function saveRace(current,state,storage) {
  const save=sanitize(current);
  if(!state?.finished||!state.result||!state.result.success)return {ok:false,save:current,notice:'本場未合法完成，最佳紀錄保持不變。',newBest:false};
  if(state.mode==='tutorial') {save.tutorialComplete=true;return {...persist(save,storage),newBest:false};}
  const key=`${state.trackId}:${state.mode}`,old=save.records[key]||{bestTime:null,bestScore:0,bestLap:null,medal:'none',ghost:null,attempts:0,sectors:[]};
  const result=state.result;
  const newBest=state.mode==='time'?old.bestTime===null||result.time<old.bestTime:result.score>old.bestScore;
  const bestLap=positive(result.bestLap)&&(old.bestLap===null||result.bestLap<old.bestLap);
  const replaceGhost=validGhost(state.completedGhost,state.trackId)&&(!old.ghost||state.completedGhost.time<old.ghost.time);
  const rebuiltGhost=replaceGhost&&!old.ghost&&positive(old.bestLap);
  const fastestLap=result.lapTimes?.indexOf(result.bestLap)+1;
  save.records[key]={...old,bestTime:state.mode==='time'&&newBest?result.time:old.bestTime,
    bestScore:state.mode==='drift'?Math.max(result.score,old.bestScore):old.bestScore,
    bestLap:bestLap?result.bestLap:old.bestLap,
    medal:rank[result.medal]>rank[old.medal]?result.medal:old.medal,
    ghost:replaceGhost?state.completedGhost:old.ghost,
    sectors:bestLap?result.sectors.filter(s=>s.lap===fastestLap).map(s=>({sector:s.sector,time:s.time})):old.sectors,
    carId:newBest?state.carId:old.carId||state.carId,attempts:old.attempts+1,updatedAt:new Date().toISOString()};
  save.unlocks=unlocksFor(save.records,save.unlocks);
  const persisted=persist(save,storage);
  if(rebuiltGhost&&persisted.ok&&!persisted.notice)persisted.notice='已建立目前物理版本的最佳圈幽靈；歷史最佳成績與獎牌保留。';
  return {...persisted,newBest};
}
export function saveSettings(current,patch,storage) {
  const save=sanitize(current),combined={...save.settings,...patch,sensitivityByCar:{...save.settings.sensitivityByCar,...patch.sensitivityByCar}};
  if([0,1,2].includes(patch.sensitivity))combined.sensitivityByCar[combined.carId]=patch.sensitivity;
  save.settings=settingsFrom(combined);
  if(!save.unlocks.colors.includes(save.settings.colorId))save.settings.colorId='cyan';
  if(!save.unlocks.decals.includes(save.settings.decalId))save.settings.decalId='none';
  return persist(save,storage);
}
