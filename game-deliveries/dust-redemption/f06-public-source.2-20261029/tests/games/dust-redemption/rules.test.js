import test from 'node:test';
import assert from 'node:assert/strict';
import { MISSIONS, SCENES, NPCS, WEAPONS, dialogueFor } from '../../../public/games/dust-redemption/content.js';
import { createProfile, beginMission, completeMission, failMission, endingFor, reportStats, validateProfile } from '../../../public/games/dust-redemption/rules.js';
import { createStorage, migrateProfile, SAVE_KEY } from '../../../public/games/dust-redemption/storage.js';

const clone=value=>JSON.parse(JSON.stringify(value));
const baseStats={shots:20,hits:13,damageTaken:15,reloads:2,itemsUsed:1,kills:3,seconds:490,assisted:false};
function finish(profile,mission,strategy='nonlethal',choiceIndex=0,options={}){
  const started=beginMission(profile,mission.id,options);
  return completeMission(started.profile,started.run,{strategy,choice:mission.choice?.options[choiceIndex].id,stats:baseStats});
}
function campaign(bits=[0,0,0],strategy='nonlethal'){
  let profile=createProfile(),choiceIndex=0;
  for(const mission of MISSIONS) profile=finish(profile,mission,strategy,mission.choice?bits[choiceIndex++]:0).profile;
  return profile;
}
function memoryStorage(){
  const values=new Map();
  return {values,getItem:key=>values.get(key)??null,setItem:(key,value)=>values.set(key,String(value)),removeItem:key=>values.delete(key)};
}

test('six authored missions expose both concrete strategies, dialogue and safe spatial targets',()=>{
  assert.equal(MISSIONS.length,6);assert.equal(NPCS.length,4);assert.equal(Object.keys(WEAPONS).length,2);assert.equal(Object.keys(SCENES).length,3);
  assert.equal(MISSIONS.filter(m=>m.choice).length,3);
  for(const scene of Object.values(SCENES)){
    assert.equal(scene.routes.length,2);
    assert.notDeepEqual(scene.routes[0].waypoints,scene.routes[1].waypoints);
  }
  for(const mission of MISSIONS){
    assert.deepEqual(mission.strategies,['nonlethal','combat']);
    assert.equal(mission.clues.length,3);
    assert.equal(mission.interactables.filter(i=>i.type==='parley').length,1);
    assert.equal(mission.interactables.filter(i=>i.type==='cargo').length,1);
    assert.ok(mission.briefing.length>=2);
    assert.ok(mission.debrief.nonlethal.length && mission.debrief.combat.length);
    assert.notDeepEqual(mission.effects.nonlethal,mission.effects.combat);
    for(const pos of [mission.entry,mission.exit,...mission.clues.map(c=>c.position),...mission.enemies.map(c=>c.position),...mission.interactables.map(c=>c.position)]){
      assert.equal(pos.length,2);assert.ok(pos.every(v=>Number.isFinite(v)&&Math.abs(v)<=20));
    }
    for(const enemy of mission.enemies)assert.ok(Math.hypot(enemy.position[0]-mission.entry[0],enemy.position[1]-mission.entry[1])>10);
  }
});

for(let combination=0;combination<8;combination++){
  const bits=[(combination>>2)&1,(combination>>1)&1,combination&1];
  test(`branch combination ${bits.join('')} reaches its documented complete ending`,()=>{
    const profile=campaign(bits),ending=endingFor(profile);
    const expected=bits[1]?'quiet_frontier':(!bits[0]&&!bits[2]?'common_dawn':'guarded_peace');
    assert.equal(ending.id,expected);assert.equal(ending.outcomes.length,3);assert.equal(Object.keys(ending.responses).length,4);
    assert.equal(profile.completed.length,6);assert.equal(profile.rewards.length,6);assert.equal(profile.history.length,6);
    assert.deepEqual(Object.keys(profile.choices).sort(),['future','ledger','water']);assert.equal(validateProfile(profile),true);
    assert.equal(profile.lastResult.ending,expected);
  });
}

for(const strategy of ['nonlethal','combat'])test(`all six ${strategy} rule outcomes yield distinct debrief and exact resources`,()=>{
  let profile=createProfile(),wallet=0;
  for(const mission of MISSIONS){
    const outcome=finish(profile,mission,strategy);
    wallet+=mission.reward+(mission.effects[strategy].wallet||0)+(mission.choice?.options[0].effect.wallet||0);
    assert.equal(outcome.profile.wallet,wallet);
    assert.equal(outcome.result.strategy,strategy);assert.equal(outcome.result.consequence,mission.consequence[strategy]);
    assert.equal(outcome.result.stats.accuracy,65);assert.ok(dialogueFor(mission,outcome.profile,'debrief',strategy).length);
    profile=outcome.profile;
  }
});

test('three key decisions are required, binary, and committed exactly once after extraction',()=>{
  let profile=createProfile();
  for(const mission of MISSIONS){
    const start=beginMission(profile,mission.id),before=clone(start.profile);
    if(mission.choice){
      assert.throws(()=>completeMission(start.profile,start.run,{strategy:'nonlethal'}),/關鍵決策/);
      assert.throws(()=>completeMission(start.profile,start.run,{strategy:'nonlethal',choice:'both'}),/關鍵決策/);
      assert.deepEqual(start.profile,before);
    }
    const done=completeMission(start.profile,start.run,{strategy:'nonlethal',choice:mission.choice?.options[0].id,stats:baseStats});
    for(let click=0;click<10;click++){
      const duplicate=completeMission(done.profile,start.run,{strategy:'combat',choice:mission.choice?.options[1].id,stats:baseStats});
      assert.equal(duplicate.result.duplicate,true);assert.deepEqual(duplicate.profile,done.profile);
    }
    profile=done.profile;
  }
});

test('ten write/reload/duplicate clicks per mission cannot collect a second reward or opposite choice',()=>{
  const memory=memoryStorage(),store=createStorage(memory);let profile=createProfile();
  for(const mission of MISSIONS){
    const start=beginMission(profile,mission.id);
    profile=completeMission(start.profile,start.run,{strategy:'nonlethal',choice:mission.choice?.options[0].id}).profile;
    const original=clone(profile);
    for(let i=0;i<10;i++){
      assert.equal(store.save(profile).ok,true);profile=store.load().profile;
      profile=completeMission(profile,start.run,{strategy:'combat',choice:mission.choice?.options[1].id}).profile;
      assert.deepEqual(profile,original);
    }
  }
});

test('replaying all six missions preserves story, money, trust, inventory and original debrief',()=>{
  let profile=campaign([0,0,0]);
  const story=({choices,wallet,npcTrust,completed,rewards,history,revision,inventory,equipment})=>({choices,wallet,npcTrust,completed,rewards,history,revision,inventory,equipment});
  const original=clone(story(profile));
  for(const mission of MISSIONS){
    const start=beginMission(profile,mission.id,{replay:true,weapon:'rifle',item:'smoke'});
    const done=completeMission(start.profile,start.run,{strategy:'combat',choice:mission.choice?.options[1].id,stats:{...baseStats,shots:10,hits:9}});
    profile=done.profile;
    assert.deepEqual(story(profile),original);assert.equal(done.result.reward,0);assert.equal(done.result.stats.weapon,'rifle');
    assert.equal(profile.challenges[mission.id].attempts,1);assert.equal(profile.challenges[mission.id].bestAccuracy,90);
    assert.throws(()=>completeMission(profile,start.run,{strategy:'combat',choice:mission.choice?.options[1].id}),/已結束/);
  }
  assert.equal(Object.keys(profile.challenges).length,6);assert.equal(endingFor(profile).id,'common_dawn');
});

test('thirty failure/retries restore the exact pre-mission snapshot on all three scenes',()=>{
  let profile=createProfile();
  for(const mission of MISSIONS.slice(0,3)){
    const original=clone(profile);
    for(let i=0;i<10;i++){
      const start=beginMission(profile,mission.id,{weapon:i%2?'rifle':'revolver',item:i%2?'smoke':'medkit'});
      start.run.stats={damageTaken:100,itemsUsed:1,shots:30};
      const failed=failMission(start.profile,start.run);
      assert.deepEqual(failed.profile,original);assert.deepEqual(failed.run.entry,mission.entry);
      assert.equal(failed.run.stats.damageTaken,0);assert.equal(failed.run.stats.itemsUsed,0);profile=failed.profile;
    }
    profile=finish(profile,mission).profile;
  }
});

test('reload restores an active mission at entry with its untouched safety snapshot',()=>{
  const memory=memoryStorage(),store=createStorage(memory),profile=createProfile();
  const start=beginMission(profile,MISSIONS[0].id,{weapon:'rifle'});
  assert.equal(store.save(start.profile).ok,true);
  const restored=store.load();
  assert.equal(restored.status,'recovered-entry');assert.deepEqual(restored.profile.safeSnapshot,profile);
  assert.deepEqual(restored.profile.activeRun.entry,MISSIONS[0].entry);
  assert.deepEqual(failMission(restored.profile,restored.profile.activeRun).profile,profile);
});

test('stats are derived from measured inputs, cannot exceed 100% and preserve assistance disclosure',()=>{
  assert.deepEqual(reportStats({shots:0,hits:4}).accuracy,0);
  const stats=reportStats({shots:10,hits:999,damageTaken:-2,seconds:NaN,reloads:2.5,assisted:true,slowAim:true,weapon:'rifle'});
  assert.equal(stats.accuracy,100);assert.equal(stats.hits,10);assert.equal(stats.damageTaken,0);assert.equal(stats.seconds,0);
  assert.equal(stats.assisted,true);assert.equal(stats.slowAim,true);assert.equal(stats.weapon,'rifle');
});

test('no out-of-order story, incomplete replay or invalid equipment can begin',()=>{
  const profile=createProfile();
  assert.throws(()=>beginMission(profile,MISSIONS[5].id),/故事順序/);
  assert.throws(()=>beginMission(profile,MISSIONS[0].id,{replay:true}),/先完成/);
  assert.throws(()=>beginMission(profile,MISSIONS[0].id,{weapon:'rocket'}),/裝備/);
  const started=beginMission(profile,MISSIONS[0].id);
  assert.throws(()=>beginMission(started.profile,MISSIONS[0].id),/目前委託/);
  assert.throws(()=>completeMission(started.profile,{...started.run,id:'stale'},{strategy:'combat'}),/已結束/);
  assert.equal(endingFor(profile),null);
});

test('later briefing explicitly reflects water and ledger decisions',()=>{
  const a=campaign([0,0,0]),b=campaign([1,1,1]);
  assert.notDeepEqual(dialogueFor(MISSIONS[2],a),dialogueFor(MISSIONS[2],b));
  assert.notDeepEqual(dialogueFor(MISSIONS[4],a),dialogueFor(MISSIONS[4],b));
});

test('corrupt JSON, truncated schema, illegal choice and future version are preserved before recovery',()=>{
  for(const raw of ['{truncated',JSON.stringify({schema:2}),JSON.stringify({...createProfile(),choices:{water:'both'}}),JSON.stringify({...createProfile(),schema:999})]){
    const memory=memoryStorage();memory.setItem(SAVE_KEY,raw);const store=createStorage(memory);
    const loaded=store.load();assert.equal(loaded.status,'corrupt');assert.equal(validateProfile(loaded.profile),true);
    assert.equal(memory.getItem(SAVE_KEY),raw);
    assert.equal(store.save(loaded.profile).ok,true);assert.equal(memory.getItem(`${SAVE_KEY}:recovery`),raw);
    assert.equal(store.load().status,'loaded');
  }
});

test('read denial, write denial and quota errors are explicit and do not claim a save',()=>{
  const denied={getItem(){throw new Error('denied');},setItem(){throw new Error('denied');},removeItem(){throw new Error('denied');}};
  assert.equal(createStorage(denied).load().status,'unavailable');assert.equal(createStorage(denied).save(createProfile()).ok,false);
  assert.equal(createStorage(denied).clear().ok,false);assert.equal(createStorage(null).save(createProfile()).status,'unavailable');
  const quota={getItem(){return null;},setItem(){const error=new Error('full');error.name='QuotaExceededError';throw error;}};
  assert.equal(createStorage(quota).save(createProfile()).status,'quota');
});

test('invalid mutation never overwrites a valid save; schema 1 migrates explicitly',()=>{
  const memory=memoryStorage(),store=createStorage(memory);const valid=campaign([1,0,1]);store.save(valid);
  const old=memory.getItem(SAVE_KEY);assert.equal(store.save({...valid,wallet:-1}).status,'invalid');assert.equal(memory.getItem(SAVE_KEY),old);
  const v1={...valid,schema:1};delete v1.challenges;delete v1.revision;
  const migrated=migrateProfile(v1);assert.equal(migrated.schema,2);assert.equal(migrated.revision,6);assert.deepEqual(migrated.choices,valid.choices);
  memory.setItem(SAVE_KEY,JSON.stringify(v1));assert.equal(store.load().status,'migrated');
});
