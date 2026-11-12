import test from 'node:test';
import assert from 'node:assert/strict';
import {TRACKS,CARS,TOUR_STAGES,resolveTourTrack,TRACK_SAMPLE,ROAD_SAMPLE,sampleTrackInto,sampleTrackBufferAt,roadStatusInto,roadStatusBufferInto} from '../../../games/neon-drift/src/content.js';
import {createRace,stepRace,resetCar} from '../../../games/neon-drift/src/physics.js';
import {createTour,recordStageResult} from '../../../games/neon-drift/src/tour.js';
import {loadSave,saveRace,saveTourStage,SAVE_KEY} from '../../../games/neon-drift/src/storage.js';
import {saveSession,loadSession} from '../../../games/neon-drift/src/session.js';
import {driveInput,driftInput} from './driver.js';
const store=()=>{const map=new Map();return {setItem:(k,v)=>map.set(k,v),getItem:k=>map.get(k)||null,removeItem:k=>map.delete(k)};};
for(const patch of [{mode:'tutorial'},{trackId:'skyway'},{layoutId:'harbor:original:v1'},{seed:2},{carId:'phantom'}])test(`Tour rejects mismatched result without mutation: ${JSON.stringify(patch)}`,()=>{
 const tour=createTour(1);tour.status='running';const before=structuredClone(tour);
 for(const success of [true,false]){assert.equal(recordStageResult(tour,{...TOUR_STAGES[0],carId:'comet',seed:1,layoutId:'harbor:mirrored:v1',success,...patch}),false);assert.deepEqual(tour,before);}
});
const finish=(track,mode,seed)=>{const r=createRace({trackId:track.id,track:resolveTourTrack(track.id,seed),mode,seed});for(let i=0;i<305*30&&!r.finished;i++)stepRace(r,mode==='time'?driveInput(r,23):driftInput(r,28),1/30);assert.equal(r.result.success,true);return r;};
test('legal Tour medals unlock six canonical cards, survive reload/migration, and cannot be farmed across variants or Free Drive',()=>{
 const storage=store();let save=loadSave(storage),races=[];
 for(const track of TRACKS)for(const mode of ['time','drift']){const race=finish(track,mode,7);races.push(race);save=saveTourStage(save,race,storage).save;assert.equal(save.unlocks.medals,races.length);}
 assert.equal(save.unlocks.colors.length,6);assert.equal(save.unlocks.decals.length,4);assert.equal(Object.keys(save.records).length,0);
 for(const race of races)save=saveTourStage(save,race,storage).save;assert.equal(save.unlocks.medals,6);
 for(const track of TRACKS)for(const mode of ['time','drift']){const race=finish(track,mode,0);save=saveTourStage(save,race,storage).save;save=saveRace(save,race,storage).save;assert.equal(save.unlocks.medals,6);}
 assert.equal(loadSave(storage).unlocks.medals,6);
 save.unlocks.medals=0;save.records={};save.tourRecords['tour:harbor:time:skyway:original:v1']={bestTime:100,bestScore:0,medal:'gold'};storage.setItem(SAVE_KEY,JSON.stringify(save));const recovered=loadSave(storage);assert.equal(recovered.unlocks.medals,6);assert.equal(Object.keys(recovered.tourRecords).length,12);
 const lost=createRace({mode:'drift'});for(let i=0;i<124*30&&!lost.finished;i++)stepRace(lost,{},1/30);const clean=loadSave(store());assert.deepEqual(saveTourStage(clean,lost,storage).save,clean);
 const denied={getItem:()=>null,setItem(){throw Error('denied');}};const result=saveTourStage(loadSave(store()),races[0],denied);assert.equal(result.ok,false);assert.equal(result.save.unlocks.medals,1);assert.match(result.notice,/儲存失敗/);
});
test('numeric race fields serialize and resume exactly, including Infinity before first lap',()=>{
 for(const car of CARS){const r=createRace({carId:car.id});for(let i=0;i<150;i++)stepRace(r,driveInput(r),1/30);const storage=store();assert.equal(r.bestLap,Infinity);saveSession(r,storage);const loaded=loadSession(storage).race;for(const key of Object.keys(r))if(typeof r[key]==='number')assert.equal(loaded[key],r[key],key);assert.equal(loaded.bestLap,Infinity);assert.equal(JSON.stringify(loaded).includes('"bestLap":null'),true);}
});
test('typed physics scratch samples equal public track and road samples at every district/layout',()=>{
 for(const track of TRACKS)for(const seed of [0,7])for(let distance=0;distance<track.length;distance+=13){const t=resolveTourTrack(track.id,seed),p=sampleTrackInto(t,distance,{}),buffer=sampleTrackInto(t,distance,new Float64Array(8));for(const [key,index] of Object.entries(TRACK_SAMPLE))assert.equal(buffer[index],p[key]);assert.deepEqual(sampleTrackBufferAt(t,new Float64Array([distance]),0,new Float64Array(8)),buffer);for(const lateral of [0,12,-15]){const a=roadStatusInto(t,distance,lateral,{}),b=roadStatusBufferInto(t,distance,lateral,new Float64Array(4));for(const [key,index] of Object.entries(ROAD_SAMPLE))assert.equal(b[index],key==='offset'?(a[key]??NaN):Number(a[key]));}}
});

test('active Tour snapshots round-trip the full advertised uint32 seed range',()=>{
 for(const seed of [0,100000000,100000001,4294967295]){const tour=createTour(seed);tour.status='running';const r=createRace({seed,track:resolveTourTrack('harbor',seed)});for(let i=0;i<150;i++)stepRace(r,{},1/30);const storage=store();assert.equal(saveSession(r,storage,tour),true);const restored=loadSession(storage);assert.ok(restored,`seed ${seed} must remain resumable`);assert.equal(restored.tour.seed,seed);assert.equal(restored.race.seed,seed);assert.equal(restored.race.elapsed,r.elapsed);}
});

test('quantized history exports the existing decimal format and records recovery in metres',()=>{
 const r=createRace();r.ghostSamples=[[3.1415,1400.1234,-6.1234,-3.1416,-7.5]];r.ghostInputs=[[36,.1234,.5678,-.9999,1]];assert.deepEqual(r.ghostSamples,[[3.1415,1400.1234,-6.1234,-3.1416,-7.5]]);assert.deepEqual(r.ghostInputs,[[36,.1234,.5678,-.9999,1]]);
 for(let i=0;i<240;i++)stepRace(r,driveInput(r,23),1/30);const distance=Math.round((((r.s%r.track.length)+r.track.length)%r.track.length)*10000)/10000;assert.ok(distance>1);assert.equal(resetCar(r),true);assert.equal(r.ghostSamples.at(-3)[1],distance);assert.equal(r.ghostSamples.at(-2)[1],distance);
});
