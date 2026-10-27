import test from 'node:test';
import assert from 'node:assert/strict';
import { TRACKS,CARS,COLORS,DECALS,CHALLENGES,PRACTICE_TRACK,PHYSICS_VERSION,sampleTrack,roadStatus,shortcutOffset } from '../../../games/neon-drift/src/content.js';
import { createRace,stepRace,resetCar,getGhostPose,validGhost } from '../../../games/neon-drift/src/physics.js';
import { SAVE_KEY,BACKUP_KEY,loadSave,saveRace,saveSettings } from '../../../games/neon-drift/src/storage.js';
import { driveInput,driveRace,driftInput } from './driver.js';

class MemoryStorage {
  constructor(){this.values=new Map();}
  getItem(key){return this.values.get(key)||null;}
  setItem(key,value){this.values.set(key,String(value));}
  removeItem(key){this.values.delete(key);}
}
const advance=(state,input,seconds)=>{for(let frame=0;frame<seconds*120&&!state.finished;frame++)stepRace(state,input,1/120);return state;};
let recorded;
test('complete scope: 3 closed hand-authored 3D tracks, 3 cars, 6 challenges, 6 colors, 3 actual decals plus plain',()=>{
  assert.equal(TRACKS.length,3);assert.equal(CARS.length,3);assert.equal(CHALLENGES.length,6);assert.equal(COLORS.length,6);assert.equal(DECALS.filter(d=>d.id!=='none').length,3);
  for(const track of TRACKS){
    const a=sampleTrack(track,0),b=sampleTrack(track,track.length);
    assert.ok(Math.hypot(a.x-b.x,a.z-b.z)<1e-9);assert.ok(track.length>1000);assert.equal(track.checkpoints.length,8);
    assert.ok(Math.max(...track.nodes.map(p=>p[1]))-Math.min(...track.nodes.map(p=>p[1]))>=3);
    const mid=(track.shortcut.start+track.shortcut.end)/2,offset=shortcutOffset(track,mid);
    assert.ok(Math.abs(offset)>track.width/2);assert.equal(roadStatus(track,mid,offset).shortcut,true);
    assert.equal(roadStatus(track,mid,offset+track.shortcut.width).legal,false);
  }
});
test('all 9 car/course combinations finish by actual control input with 16 sequential checkpoints',()=>{
  for(const track of TRACKS)for(const car of CARS){
    const run=driveRace({trackId:track.id,carId:car.id});if(track.id==='harbor'&&car.id==='comet')recorded=run;
    assert.equal(run.state.result.success,true,`${track.id}/${car.id}`);assert.equal(run.state.checkpointCount,16);
    assert.equal(run.state.lapTimes.length,2);assert.equal(run.state.collisions,0);
    assert.equal(run.state.sectors.length,16);assert.ok(run.state.completedGhost.samples.length>500);
  }
});
test('30/60/120 FPS each replayed five times: identical legal finish time and position',()=>{
  recorded||=driveRace();const reference=recorded.state;
  for(const fps of [30,60,120])for(let repeat=0;repeat<5;repeat++) {
    const state=createRace();
    for(const input of recorded.tape){for(let sub=0;sub<fps/30;sub++)stepRace(state,input,1/fps);}
    assert.equal(state.result.success,true);assert.ok(Math.abs(state.elapsed-reference.elapsed)<.1);
    assert.ok(Math.hypot(state.x-reference.x,state.z-reference.z)<state.car.dimensions[2]*.1);
    assert.equal(state.checkpointCount,reference.checkpointCount);
    assert.equal(state.collisions,reference.collisions);
  }
});
test('holding accelerator without steering collides; track-relative coordinates do not auto-drive turns',()=>{
  const state=advance(createRace(),{throttle:1,brake:0,steer:0,handbrake:false},30);
  assert.ok(state.collisions>0);assert.equal(state.finished,false);assert.ok(state.checkpointCount<8);
});
test('D steers screen-right and A screen-left with a +Y-up camera looking forward along +Z',()=>{
  const right=createRace(),left=createRace(),neutral=createRace(),p=sampleTrack(right.track,0);
  for(const state of [right,left,neutral]){state.countdown=0;state.speed=20;}
  advance(right,{throttle:1,steer:1},.5);advance(left,{throttle:1,steer:-1},.5);advance(neutral,{throttle:1},.5);
  const projectedRight=state=>(state.x-neutral.x)*-Math.cos(p.heading)+(state.z-neutral.z)*Math.sin(p.heading);
  const yawDelta=state=>Math.atan2(Math.sin(state.heading-neutral.heading),Math.cos(state.heading-neutral.heading));
  assert.ok(projectedRight(right)>0);assert.ok(projectedRight(left)<0);
  assert.ok(yawDelta(right)<0);assert.ok(yawDelta(left)>0);
});
test('the separate 90-second driving school completes all five tasks by actual input with a >2-second slide',()=>{
  const state=createRace({mode:'tutorial'});assert.equal(state.track,PRACTICE_TRACK);assert.ok(!TRACKS.includes(state.track));
  let longest=0;
  for(let frame=0;frame<93*30&&!state.finished;frame++){
    stepRace(state,driftInput(state),1/30);longest=Math.max(longest,state.cleanDriftTime);
    assert.ok(state.speed<=22);if(state.elapsed>70&&!state.tutorial.recover)resetCar(state);
  }
  assert.equal(state.result.success,true);assert.ok(Object.values(state.tutorial).every(Boolean));
  assert.ok(longest>=2);assert.equal(state.collisions,0);assert.equal(state.result.time,90);
});
test('drift medal thresholds are attainable by actual controls: Comet bronze and Phantom gold on every course',()=>{
  for(const track of TRACKS)for(const carId of ['comet','phantom']){
    const state=createRace({trackId:track.id,carId,mode:'drift'});
    for(let frame=0;frame<123*30&&!state.finished;frame++)stepRace(state,driftInput(state,34),1/30);
    assert.equal(state.result.success,true);assert.equal(state.collisions,0);
    assert.notEqual(state.result.medal,'none',`${track.id}/${carId}`);
    if(carId==='phantom')assert.equal(state.result.medal,'gold',track.id);
  }
});
test('five runs per car/course show each car a flying-sector advantage under its physical cornering limit',()=>{
  const winners=new Set();
  for(const track of TRACKS){
    const rows=[];
    for(const car of CARS){
      const runs=[];
      for(let run=0;run<5;run++){
        const state=createRace({trackId:track.id,carId:car.id});
        for(let frame=0;frame<305*30&&!state.finished;frame++)stepRace(state,driveInput(state,car.topSpeed,car.cornerGrip*.85),1/30);
        assert.equal(state.result.success,true);assert.equal(state.collisions,0);runs.push(state.sectors.slice(8).map(s=>s.time));
      }
      rows.push({car:car.id,mean:runs[0].map((_,sector)=>runs.reduce((sum,run)=>sum+run[sector],0)/runs.length)});
    }
    for(let sector=0;sector<8;sector++){
      const sorted=[...rows].sort((a,b)=>a.mean[sector]-b.mean[sector]);
      if(sorted[1].mean[sector]-sorted[0].mean[sector]>.02)winners.add(sorted[0].car);
    }
  }
  assert.deepEqual([...winners].sort(),CARS.map(c=>c.id).sort());
});
test('3 courses × 20 recovery cases: wall/reverse/missed checkpoint/outside cases do not skip legal order',()=>{
  for(const track of TRACKS)for(let index=0;index<20;index++) {
    const state=createRace({trackId:track.id});state.countdown=0;state.lastLegalS=track.checkpoints[2];
    state.checkpointCount=2;state.nextCheckpoint=3;state.s=state.lastLegalS;
    const scenario=index%4;
    if(scenario===0){state.lateral=track.width*3;state.speed=25;advance(state,{throttle:1,steer:1},.25);assert.ok(state.collisions>0);}
    if(scenario===1){state.speed=-7;advance(state,{brake:1},.25);assert.equal(state.checkpointCount,2);}
    if(scenario===2){state.s=track.length*1.05;advance(state,{throttle:1},.25);assert.equal(state.checkpointCount,2);assert.equal(state.finished,false);}
    if(scenario===3){state.lateral=-track.width*2;advance(state,{throttle:1},.25);assert.ok(state.collisions>0);}
    const before=state.elapsed;assert.equal(resetCar(state),true);assert.equal(state.penalty,2);
    assert.ok(Math.abs(state.elapsed-before-2)<1e-8);assert.equal(state.checkpointCount,2);
    assert.equal(state.nextCheckpoint,3);assert.equal(state.lateral,0);assert.equal(state.speed,0);
    assert.ok(Math.abs(state.s-state.lastLegalS-.1)<1e-8);assert.equal(roadStatus(track,state.s,state.lateral).legal,true);
    assert.equal(state.combo,1);assert.equal(state.pendingScore,0);
  }
});
test('60-second exploits: stationary spin, low speed, reverse, repeated wall pressure never create sustained combos',()=>{
  const attacks=[['stationary',{throttle:0,brake:0,steer:1,handbrake:true}],['low speed',{throttle:.1,brake:0,steer:1,handbrake:true}],
    ['reverse',{throttle:0,brake:1,steer:1,handbrake:true}],['wall',{throttle:1,brake:0,steer:1,handbrake:false}]];
  for(const [name,input]of attacks) {
    const state=createRace({mode:'drift'});advance(state,input,63);
    assert.equal(state.finished,false);assert.equal(state.combo,1,name);assert.equal(state.pendingScore,0,name);
    assert.equal(state.score,0,name);
  }
});
test('drift and tutorial timers are 120 and 90 seconds after countdown; time trial has a failure result',()=>{
  const drift=advance(createRace({mode:'drift'}),{},123);assert.equal(drift.finished,true);assert.equal(drift.result.time,120);
  const tutorial=advance(createRace({mode:'tutorial'}),{},93);assert.equal(tutorial.finished,true);assert.equal(tutorial.result.time,90);assert.equal(tutorial.result.success,false);
  const timed=advance(createRace(),{},304);assert.equal(timed.finished,true);assert.equal(timed.result.success,false);assert.ok(timed.result.time<=300.01);
});
test('paused races freeze time, input, and pose; recovery records tutorial and +2 seconds',()=>{
  const state=createRace({mode:'tutorial'});advance(state,{throttle:1},4);state.paused=true;
  const snapshot=JSON.stringify(state);advance(state,{throttle:1,steer:1},2);assert.equal(JSON.stringify(state),snapshot);
  state.paused=false;assert.equal(resetCar(state),true);assert.equal(state.tutorial.recover,true);assert.equal(state.penalty,2);
});
test('legal race save/load 10 times preserves ghost checkpoint timings and does not affect physics',()=>{
  recorded||=driveRace();const storage=new MemoryStorage();let save=loadSave(storage);
  const stored=saveRace(save,recorded.state,storage);assert.equal(stored.ok,true);assert.equal(stored.newBest,true);
  for(let n=0;n<10;n++){
    save=loadSave(storage);const ghost=save.records['harbor:time'].ghost;assert.ok(validGhost(ghost,'harbor'));
    assert.equal(ghost.samples[0][0],0);assert.equal(ghost.samples.at(-1)[0],ghost.time);
    assert.deepEqual(ghost.checkpoints,recorded.state.completedGhost.checkpoints);
    for(const [,time]of ghost.checkpoints){const pose=getGhostPose(ghost,time);assert.ok(pose);assert.ok(Number.isFinite(pose.y));}
  }
  const ghost=save.records['harbor:time'].ghost,a=createRace(),b=createRace({ghost});
  for(const input of recorded.tape.slice(0,1000)){stepRace(a,input,1/30);stepRace(b,input,1/30);}
  assert.equal(a.x,b.x);assert.equal(a.z,b.z);assert.equal(a.collisions,b.collisions);assert.equal(a.score,b.score);
});
test('five incomplete departures never overwrite the best, including a completed first lap',()=>{
  recorded||=driveRace();const storage=new MemoryStorage();saveRace(loadSave(storage),recorded.state,storage);
  const snapshot=storage.getItem(SAVE_KEY);
  for(let n=0;n<5;n++){
    const state=createRace();for(const input of recorded.tape){stepRace(state,input,1/30);if(state.lap===2)break;}
    assert.ok(state.completedGhost);assert.equal(state.finished,false);assert.equal(saveRace(loadSave(storage),state,storage).ok,false);
    assert.equal(storage.getItem(SAVE_KEY),snapshot);
  }
});
test('five slower completions retain best time and ghost; settings are independent per car',()=>{
  recorded||=driveRace();const storage=new MemoryStorage();let save=saveRace(loadSave(storage),recorded.state,storage).save;
  const original=save.records['harbor:time'];
  for(let n=0;n<5;n++){
    const slower={...recorded.state,result:{...recorded.state.result,time:original.bestTime+10,bestLap:original.bestLap+5}};
    const result=saveRace(save,slower,storage);assert.equal(result.newBest,false);save=result.save;
    assert.equal(save.records['harbor:time'].bestTime,original.bestTime);assert.deepEqual(save.records['harbor:time'].ghost,original.ghost);
  }
  save=saveSettings(save,{carId:'comet',sensitivity:0},storage).save;
  save=saveSettings(save,{carId:'stinger',sensitivity:2,volume:0,reducedMotion:true},storage).save;
  save=loadSave(storage);assert.equal(save.settings.sensitivityByCar.comet,0);assert.equal(save.settings.sensitivityByCar.stinger,2);
  assert.equal(save.settings.volume,0);assert.equal(save.settings.reducedMotion,true);
});
test('five physics-version migrations preserve readable medal records and invalidate incompatible ghost',()=>{
  recorded||=driveRace();
  for(let n=0;n<5;n++){
    const storage=new MemoryStorage();saveRace(loadSave(storage),recorded.state,storage);
    const raw=JSON.parse(storage.getItem(SAVE_KEY));raw.records['harbor:time'].ghost.physicsVersion='obsolete';storage.setItem(SAVE_KEY,JSON.stringify(raw));
    const save=loadSave(storage);assert.equal(save.records['harbor:time'].ghost,null);assert.equal(save.records['harbor:time'].medal,recorded.state.result.medal);
    assert.match(save.notice,/幽靈/);assert.ok(save.unlocks.medals>0);
  }
});
test('corrupt main save recovers backup; unreadable, hostile and unavailable storage degrade visibly',()=>{
  const storage=new MemoryStorage();let save=loadSave(storage);
  save=saveSettings(save,{volume:.4},storage).save;saveSettings(save,{volume:.8},storage);
  assert.ok(storage.getItem(BACKUP_KEY));storage.setItem(SAVE_KEY,'{bad');const recovered=loadSave(storage);
  assert.equal(recovered.settings.volume,.4);assert.match(recovered.notice,/備份/);
  storage.values.clear();storage.setItem(SAVE_KEY,'null');assert.match(loadSave(storage).notice,/無法讀取/);
  storage.setItem(SAVE_KEY,JSON.stringify({schemaVersion:2,settings:{volume:'max',sensitivityByCar:{comet:999}},records:{'harbor:time':{medal:'gold',ghost:{samples:[null]}}}}));
  const safe=loadSave(storage);assert.equal(safe.settings.volume,.55);assert.equal(safe.settings.sensitivityByCar.comet,1);assert.equal(safe.records['harbor:time'].ghost,null);
  storage.setItem(SAVE_KEY,JSON.stringify({schemaVersion:1,unlocks:{medals:4},settings:{colorId:'pearl'},records:'damaged'}));
  const migrated=loadSave(storage);assert.equal(migrated.unlocks.medals,4);assert.equal(migrated.settings.colorId,'pearl');
  const blocked={getItem(){throw Error('denied')},setItem(){throw Error('denied')}};
  assert.match(loadSave(blocked).notice,/封鎖/);assert.equal(saveSettings(save,{volume:0},blocked).ok,false);
});
test('a compatible ghost rebuilds after migration and improves independently of historical lap records',()=>{
  recorded||=driveRace();const storage=new MemoryStorage();saveRace(loadSave(storage),recorded.state,storage);
  const raw=JSON.parse(storage.getItem(SAVE_KEY)),historical=raw.records['harbor:time'].bestLap-5;
  raw.records['harbor:time'].bestLap=historical;raw.records['harbor:time'].ghost.physicsVersion='obsolete';
  storage.setItem(SAVE_KEY,JSON.stringify(raw));let save=loadSave(storage);assert.equal(save.records['harbor:time'].ghost,null);
  const run=speed=>{const state=createRace();for(let i=0;i<300*30&&!state.finished;i++)stepRace(state,driveInput(state,speed),1/30);assert.ok(state.result?.success);return state;};
  const slow=run(22),faster=run(24);assert.ok(faster.result.bestLap<slow.result.bestLap);assert.ok(faster.result.bestLap>historical);
  let result=saveRace(save,slow,storage);assert.equal(result.ok,true);assert.match(result.notice,/目前物理版本/);save=result.save;
  assert.equal(save.records['harbor:time'].ghost.time,slow.completedGhost.time);assert.equal(save.records['harbor:time'].bestLap,historical);
  result=saveRace(save,faster,storage);assert.equal(result.save.records['harbor:time'].ghost.time,faster.completedGhost.time);assert.equal(result.save.records['harbor:time'].bestLap,historical);
});
test('quota exhaustion drops only ghosts and reports the degradation, preserving medals and settings',()=>{
  recorded||=driveRace();const storage=new MemoryStorage();const write=storage.setItem.bind(storage);
  storage.setItem=(key,value)=>{if(value.length>5000){const error=Error('quota');error.name='QuotaExceededError';throw error;}write(key,value);};
  const result=saveRace(loadSave(storage),recorded.state,storage);
  assert.equal(result.ok,true);assert.equal(result.save.records['harbor:time'].ghost,null);assert.match(result.notice,/空間不足/);
  assert.equal(result.save.records['harbor:time'].medal,recorded.state.result.medal);
});
