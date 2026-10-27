import test from 'node:test';
import assert from 'node:assert/strict';
import { PHYSICS_VERSION,TRACK_VERSION } from '../../../games/neon-drift/src/content.js';
import { SAVE_KEY,BACKUP_KEY,loadSave,saveSettings } from '../../../games/neon-drift/src/storage.js';

class MemoryStorage {
  constructor(entries=[]){this.values=new Map(entries);}
  getItem(key){return this.values.get(key)??null;}
  setItem(key,value){this.values.set(key,String(value));}
  removeItem(key){this.values.delete(key);}
}
const storageError=name=>Object.assign(new Error(name),{name});
function savedRecord({ghost=false}={}) {
  const save=loadSave(new MemoryStorage());
  save.settings.volume=.4;
  save.records['harbor:time']={bestTime:123,bestLap:60,bestScore:0,medal:'gold',carId:'comet',attempts:3,
    updatedAt:'2026-10-25T00:00:00.000Z',sectors:[],ghost:ghost?{
      schemaVersion:1,physicsVersion:PHYSICS_VERSION,trackVersion:TRACK_VERSION,trackId:'harbor',carId:'comet',time:60,
      samples:[[0,0,0,0,20],[60,100,0,0,20]],
    }:null};
  return save;
}

test('corrupt main plus two quota failures preserves the exact recovery backup across reload',()=>{
  const backup=JSON.stringify(savedRecord(),null,2);
  const storage=new MemoryStorage([[SAVE_KEY,'{bad'],[BACKUP_KEY,backup]]),writes=[];
  storage.setItem=(key,value)=>{writes.push({key,value});throw storageError('QuotaExceededError');};
  const recovered=loadSave(storage);
  assert.equal(recovered.records['harbor:time'].bestTime,123);
  assert.match(recovered.notice,/已恢復.*備份/);

  const result=saveSettings(recovered,{volume:.8},storage);
  assert.equal(result.ok,false);
  assert.match(result.notice,/儲存失敗/);
  assert.equal(writes.filter(write=>write.key===SAVE_KEY).length,2);
  assert.equal(storage.getItem(SAVE_KEY),'{bad');
  assert.equal(storage.getItem(BACKUP_KEY),backup);
  const reloaded=loadSave(storage);
  assert.equal(reloaded.records['harbor:time'].bestTime,123);
  assert.equal(reloaded.settings.volume,.4);
  assert.match(reloaded.notice,/已恢復.*備份/);
});

for(const backup of ['null','[]','false','123','"saved"'])test(`non-object backup ${backup} is not reported as recovered`,()=>{
  const storage=new MemoryStorage([[SAVE_KEY,'{bad'],[BACKUP_KEY,backup]]);
  const save=loadSave(storage);
  assert.deepEqual(save.records,{});
  assert.match(save.notice,/無法讀取/);
  assert.doesNotMatch(save.notice,/已恢復/);
  assert.equal(storage.getItem(BACKUP_KEY),backup);
});

test('readable main can release its backup and save a reduced payload under quota',()=>{
  const original=JSON.stringify(savedRecord({ghost:true}));
  const storage=new MemoryStorage([[SAVE_KEY,original],[BACKUP_KEY,original]]);
  // Model an available quota that has shrunk below the two existing copies.
  // The full write cannot fit; removing the redundant backup permits recovery.
  const limit=original.length*2-1,write=storage.setItem.bind(storage);
  let quotaFailures=0;
  storage.setItem=(key,value)=>{
    const next=new Map(storage.values);next.set(key,String(value));
    if([...next.values()].reduce((total,text)=>total+text.length,0)>limit){quotaFailures++;throw storageError('QuotaExceededError');}
    write(key,value);
  };
  const current=loadSave(storage);
  assert.ok(current.records['harbor:time'].ghost);
  const result=saveSettings(current,{volume:.8},storage);
  assert.equal(result.ok,true);
  assert.ok(quotaFailures>=2);
  assert.match(result.notice,/空間不足/);
  assert.equal(result.save.records['harbor:time'].ghost,null);
  assert.equal(storage.getItem(BACKUP_KEY),null);
  const reloaded=loadSave(storage);
  assert.equal(reloaded.records['harbor:time'].bestTime,123);
  assert.equal(reloaded.records['harbor:time'].medal,'gold');
  assert.equal(reloaded.records['harbor:time'].attempts,3);
  assert.equal(reloaded.records['harbor:time'].ghost,null);
  assert.equal(reloaded.settings.volume,.8);
});

test('readable main remains recoverable when both quota writes fail',()=>{
  const original=JSON.stringify(savedRecord());
  const storage=new MemoryStorage([[SAVE_KEY,original],[BACKUP_KEY,original]]);
  storage.setItem=()=>{throw storageError('QuotaExceededError');};
  const result=saveSettings(loadSave(storage),{volume:.8},storage);
  assert.equal(result.ok,false);
  assert.equal(storage.getItem(SAVE_KEY),original);
  assert.equal(loadSave(storage).records['harbor:time'].bestTime,123);
});

test('blocked reads produce a visible failure without trying destructive storage operations',()=>{
  const storage={
    getItem(){throw storageError('SecurityError');},
    setItem(){assert.fail('Writing must not follow a blocked main read');},
    removeItem(){assert.fail('A blocked read must not remove a backup');},
  };
  assert.match(loadSave(storage).notice,/封鎖/);
  const result=saveSettings(savedRecord(),{volume:.8},storage);
  assert.equal(result.ok,false);
  assert.match(result.notice,/儲存失敗/);
  assert.equal(result.save.records['harbor:time'].bestTime,123);
});

test('blocked writes preserve both existing copies and report failure',()=>{
  const original=JSON.stringify(savedRecord());
  const storage=new MemoryStorage([[SAVE_KEY,original],[BACKUP_KEY,original]]);
  storage.setItem=()=>{throw storageError('SecurityError');};
  const result=saveSettings(loadSave(storage),{volume:.8},storage);
  assert.equal(result.ok,false);
  assert.match(result.notice,/儲存失敗/);
  assert.equal(storage.getItem(SAVE_KEY),original);
  assert.equal(storage.getItem(BACKUP_KEY),original);
  assert.equal(loadSave(storage).records['harbor:time'].bestTime,123);
});
