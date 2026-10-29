import test from 'node:test';
import assert from 'node:assert/strict';
import { createProfile, beginMission, failMission, validateProfile, normalizeProfile } from '../../../public/games/dust-redemption/rules.js';
import { buySupply } from '../../../public/games/dust-redemption/expansion-content.js';
import { createStorage, migrateProfile, SAVE_KEY } from '../../../public/games/dust-redemption/storage.js';
const clone=value=>JSON.parse(JSON.stringify(value));
function memory(){const values=new Map();return {values,getItem:key=>values.get(key)??null,setItem:(key,value)=>values.set(key,String(value)),removeItem:key=>values.delete(key)};}

test('new profile supplies are explicit zero-level defaults',()=>{
  assert.deepEqual(createProfile().supplies,{ammo:0,medicine:0,smoke:0});assert.equal(validateProfile(createProfile()),true);
});

for(const schema of [1,2])test(`schema ${schema} without supplies migrates to zero levels without spending or changing story`,()=>{
  const old={...createProfile(),schema,wallet:123};delete old.supplies;
  const original=clone(old),migrated=migrateProfile(old);
  assert.equal(migrated.wallet,123);assert.equal(migrated.schema,2);assert.deepEqual(migrated.supplies,{ammo:0,medicine:0,smoke:0});assert.deepEqual(old,original);
  const disk=memory();disk.setItem(SAVE_KEY,JSON.stringify(old));const loaded=createStorage(disk).load();
  assert.equal(loaded.status,'migrated');assert.equal(validateProfile(loaded.profile),true);
});

test('migration normalizes nested safe snapshots and old active runs without invented progress',()=>{
  const profile=createProfile();delete profile.supplies;
  const active=beginMission(profile,'dry-mail');delete active.profile.activeRun.supplyBonuses;delete active.profile.activeRun.requireFieldwork;
  const disk=memory();disk.setItem(SAVE_KEY,JSON.stringify(active.profile));const loaded=createStorage(disk).load();
  assert.equal(loaded.status,'recovered-entry');
  for(const saved of [loaded.profile,loaded.profile.safeSnapshot,loaded.profile.activeRun.before])assert.deepEqual(saved.supplies,{ammo:0,medicine:0,smoke:0});
  assert.equal(loaded.profile.activeRun.requireFieldwork,false);
  assert.deepEqual(failMission(loaded.profile,loaded.profile.activeRun).profile,normalizeProfile(profile));
});

for(const supplies of [null,[],{ammo:-1},{ammo:4},{medicine:1.5},{smoke:'2'},{extra:1}])test(`malformed supplies ${JSON.stringify(supplies)} are rejected, never silently repaired`,()=>{
  const profile={...createProfile(),supplies};assert.equal(validateProfile(profile),false);assert.equal(migrateProfile(profile),null);
  const disk=memory(),raw=JSON.stringify(profile);disk.setItem(SAVE_KEY,raw);const store=createStorage(disk),loaded=store.load();
  assert.equal(loaded.status,'corrupt');assert.equal(disk.getItem(SAVE_KEY),raw);
  assert.equal(store.save(loaded.profile).ok,true);assert.equal(disk.getItem(`${SAVE_KEY}:recovery`),raw);
});

test('invalid levels inside either safety snapshot are rejected before recovery',()=>{
  const active=beginMission(createProfile(),'dry-mail',{requireFieldwork:true});
  for(const location of ['safeSnapshot','before']){
    const corrupted=clone(active.profile),target=location==='safeSnapshot'?corrupted.safeSnapshot:corrupted.activeRun.before;
    target.supplies.ammo=8;assert.equal(validateProfile(corrupted),false);assert.equal(migrateProfile(corrupted),null);
  }
});

test('valid but inconsistent mid-mission supply upgrades cannot leak out through save recovery',()=>{
  const active=beginMission(createProfile(),'dry-mail',{requireFieldwork:true}),forged=clone(active.profile);
  forged.supplies.ammo=1;assert.equal(validateProfile(forged),false);
  const mismatched=clone(active.profile);mismatched.activeRun.before.supplies.smoke=1;assert.equal(validateProfile(mismatched),false);
});

test('successful purchase survives write/reload/retry with fieldwork requirement intact',()=>{
  const bought=buySupply({...createProfile(),wallet:200},'medicine').profile;
  const active=beginMission(bought,'dry-mail',{requireFieldwork:true}),disk=memory(),store=createStorage(disk);
  assert.equal(store.save(active.profile).ok,true);const loaded=store.load();
  assert.equal(loaded.profile.activeRun.requireFieldwork,true);assert.equal(loaded.profile.activeRun.supplyBonuses.medkitHeal,50);
  assert.deepEqual(failMission(loaded.profile,loaded.profile.activeRun).profile,bought);
});

test('write denial cannot overwrite the prior on-disk purchase or mutate a new in-memory purchase',()=>{
  const old={...createProfile(),wallet:200},disk=memory(),store=createStorage(disk);store.save(old);
  const prior=disk.getItem(SAVE_KEY),bought=buySupply(old,'ammo').profile,before=clone(bought);
  disk.setItem=()=>{throw new Error('denied');};
  const result=store.save(bought);assert.equal(result.ok,false);assert.equal(result.status,'denied');
  assert.equal(disk.getItem(SAVE_KEY),prior);assert.deepEqual(bought,before);assert.deepEqual(old.supplies,{ammo:0,medicine:0,smoke:0});
});

test('partial/corrupt profile missing the challenges container is rejected without throwing',()=>{
  const missing=createProfile();delete missing.challenges;assert.doesNotThrow(()=>validateProfile(missing));assert.equal(validateProfile(missing),false);
});
