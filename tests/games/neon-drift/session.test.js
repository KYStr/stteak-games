import test from 'node:test';
import assert from 'node:assert/strict';
import {createRace,stepRace,resetCar,finishTutorial} from '../../../games/neon-drift/src/physics.js';
import {SESSION_KEY,saveSession,loadSession} from '../../../games/neon-drift/src/session.js';
import {SAVE_KEY,BACKUP_KEY,loadSave,saveRace} from '../../../games/neon-drift/src/storage.js';
import {driveInput,driftInput} from './driver.js';
import {gamepadAxis} from '../../../games/neon-drift/src/input.js';
const store=()=>({value:new Map(),getItem(k){return this.value.get(k)||null;},setItem(k,v){this.value.set(k,v);},removeItem(k){this.value.delete(k);}});
test('resumable race preserves all physics state and produces the same legal result after reload',()=>{
  const storage=store(),race=createRace();for(let i=0;i<2000;i++)stepRace(race,driveInput(race),1/30);
  assert.equal(saveSession(race,storage),true);const restored=loadSession(storage)?.race;assert.ok(restored);
  for(let i=0;i<7000&&!race.finished;i++){const input=driveInput(race);stepRace(race,input,1/30);stepRace(restored,input,1/30);}
  assert.equal(race.result.success,true);assert.deepEqual(restored.result,race.result);assert.deepEqual(restored.completedGhost,race.completedGhost);
  assert.equal(storage.getItem(SAVE_KEY),null);
});
test('corrupt, incompatible and hostile session snapshots cannot enter physics',()=>{
  const storage=store(),race=createRace();for(let i=0;i<200;i++)stepRace(race,{},1/30);saveSession(race,storage);const raw=storage.getItem(SESSION_KEY);
  for(const mutate of [r=>{r.physics='old';},r=>{r.state.speed='fast';},r=>{r.state.ghostInputs=[null];},r=>{r.state.checkpointCount=-1;},r=>{r.state.tutorial={};},r=>{r.state.lastEvent={};},r=>{r.state.carId='unknown';}]){const obj=JSON.parse(raw);mutate(obj);storage.setItem(SESSION_KEY,JSON.stringify(obj));assert.equal(loadSession(storage),null);}
  storage.setItem(SESSION_KEY,'{bad');assert.equal(loadSession(storage),null);
});
test('missing primary recovers readable backup without modifying it',()=>{const storage=store(),save=loadSave(storage);save.tutorialComplete=true;const backup=JSON.stringify(save);storage.setItem(BACKUP_KEY,backup);const recovered=loadSave(storage);assert.equal(recovered.tutorialComplete,true);assert.match(recovered.notice,/備份/);assert.equal(storage.getItem(BACKUP_KEY),backup);});
test('gamepad axis rejects deadzone noise and clamps endpoints',()=>{assert.equal(gamepadAxis(.1),0);assert.equal(gamepadAxis(-.1),0);assert.equal(gamepadAxis(1),1);assert.equal(gamepadAxis(-1),-1);assert.equal(gamepadAxis(NaN),0);assert.ok(gamepadAxis(.5)>.4);});

test('school may finish early only after all five actual tasks; completion saves independently of records',()=>{
  const race=createRace({mode:'tutorial'});assert.equal(finishTutorial(race),false);assert.equal(finishTutorial(createRace()),false);
  for(let frame=0;frame<30*89&&!Object.values(race.tutorial).every(Boolean);frame++){
    stepRace(race,driftInput(race),1/30);if(race.tutorial.exit&&!race.tutorial.recover)resetCar(race);
  }
  assert.equal(finishTutorial(race),true);assert.ok(race.result.time<90);assert.equal(race.result.success,true);
  const storage=store(),saved=saveRace(loadSave(storage),race,storage);assert.equal(saved.ok,true);assert.equal(loadSave(storage).tutorialComplete,true);assert.deepEqual(loadSave(storage).records,{});assert.equal(finishTutorial(race),false);
});
