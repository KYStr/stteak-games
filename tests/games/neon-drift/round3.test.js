import test from 'node:test';
import assert from 'node:assert/strict';
import {TRACKS,CARS,TOUR_STAGES,resolveTourTrack,sampleTrack,sampleTrackInto,roadStatusInto} from '../../../games/neon-drift/src/content.js';
import {createRace,stepRace,validGhost} from '../../../games/neon-drift/src/physics.js';
import {createTour,recordStageResult,advanceStage,retryStage,restoreTour} from '../../../games/neon-drift/src/tour.js';
import {createAutoQuality} from '../../../games/neon-drift/src/quality.js';
import {saveSession,loadSession} from '../../../games/neon-drift/src/session.js';
import {driveInput,driftInput} from './driver.js';
const store=()=>{const map=new Map();return {setItem:(k,v)=>map.set(k,v),getItem:k=>map.get(k)||null,removeItem:k=>map.delete(k)};};
test('idle drift loses on each course; bronze boundary and pending banking',()=>{
 for(const track of TRACKS)for(const delta of [-track.medals.drift[2],-1,0]){const r=createRace({trackId:track.id,mode:'drift'});r.countdown=0;r.elapsed=120-1/120;r.score=track.medals.drift[2]+delta;stepRace(r);assert.equal(r.result.success,delta===0);}
 const r=createRace({mode:'drift'});r.countdown=0;r.elapsed=120-1/120;r.pendingScore=600;stepRace(r);assert.equal(r.result.success,true);
});
test('scratch samples preserve identity and values',()=>{const out={},road={};assert.equal(sampleTrackInto(TRACKS[0],42,out),out);assert.deepEqual(out,sampleTrack(TRACKS[0],42));assert.equal(roadStatusInto(TRACKS[0],42,0,road),road);});
test('Auto quality uses consecutive cost windows with bounded recovery',()=>{const q=createAutoQuality();q.window(7,10,100);assert.equal(q.tier,0);q.window(7,10,100);assert.equal(q.tier,1);for(let i=0;i<5;i++)q.window(1,10,100);assert.equal(q.tier,0);q.reset();assert.equal(q.tier,0);});
test('Tour stage failure, duplicate prevention, full progression and boundary reload',()=>{
 const t=createTour(1);t.status='running';assert.equal(recordStageResult(t,{success:false}),true);assert.equal(advanceStage(t),false);retryStage(t);
 for(let i=0;i<6;i++){t.status='running';const stage=TOUR_STAGES[i],result={...stage,layoutId:resolveTourTrack(stage.trackId,t.seed).layoutId,success:true,time:130,activeSeconds:130,score:900,collisions:0,medal:'bronze'};assert.equal(recordStageResult(t,result),true);assert.equal(recordStageResult(t,result),false);const storage=store();assert.equal(saveSession(null,storage,t),true);assert.deepEqual(loadSession(storage).tour,t);if(i<5)assert.equal(advanceStage(t),true);}
 assert.equal(t.status,'complete');assert.equal(t.activeSeconds,780);assert.deepEqual(restoreTour(t),t);
});
test('seed variants, mirrored checkpoint wins, all cars viable and active Tour restore',()=>{
 for(const track of TRACKS){assert.notDeepEqual(resolveTourTrack(track.id,0).points,resolveTourTrack(track.id,7).points);assert.equal(resolveTourTrack(track.id,1),resolveTourTrack(track.id,1));
 for(const car of CARS)for(const mode of ['time','drift']){const r=createRace({track:resolveTourTrack(track.id,7),trackId:track.id,carId:car.id,mode,seed:7});for(let i=0;i<305*30&&!r.finished;i++)stepRace(r,mode==='time'?driveInput(r,23):driftInput(r,28),1/30);assert.equal(r.result?.success,true,`${track.id} ${car.id} ${mode}`);if(mode==='time'){assert.equal(r.checkpointCount,16);assert.equal(validGhost(r.completedGhost,track.id),false);assert.equal(validGhost(r.completedGhost,track.id,r.layoutId),true);}}}
 const t=createTour(7);t.status='running';const r=createRace({seed:7,track:resolveTourTrack('harbor',7)});for(let i=0;i<150;i++)stepRace(r,driveInput(r),1/30);const storage=store();saveSession(r,storage,t);const restored=loadSession(storage);assert.equal(restored.race.s,r.s);assert.equal(restored.race.layoutId,r.layoutId);assert.deepEqual(restored.tour,t);
});
test('drift failures preserve good records and variant records remain isolated',async()=>{
 const {loadSave,saveRace,saveTourStage,saveTourBest}=await import('../../../games/neon-drift/src/storage.js');const storage=store();let save=loadSave(storage);
 const r=createRace({mode:'drift'});r.countdown=0;r.elapsed=120-1/120;r.score=600;stepRace(r);save=saveRace(save,r,storage).save;const previous=JSON.stringify(save.records);
 const lost=createRace({mode:'drift'});lost.countdown=0;lost.elapsed=120-1/120;stepRace(lost);save=saveRace(save,lost,storage).save;assert.equal(JSON.stringify(save.records),previous);
 const variant=createRace({mode:'drift',seed:7,track:resolveTourTrack('harbor',7)});variant.countdown=0;variant.elapsed=120-1/120;variant.score=700;stepRace(variant);save=saveTourStage(save,variant,storage).save;assert.equal(save.records['harbor:drift'].bestScore,600);assert.equal(loadSave(storage).tourRecords['tour:harbor:drift:harbor:mirrored:v1'].bestScore,700);
});
test('Free Drive ghosts use their original layout even when metadata seed has mirrored bits; interpolation reuses pose',async()=>{
 const {PHYSICS_VERSION,TRACK_VERSION}=await import('../../../games/neon-drift/src/content.js');const {getGhostPose}=await import('../../../games/neon-drift/src/physics.js');
 const ghost={schemaVersion:1,physicsVersion:PHYSICS_VERSION,trackVersion:TRACK_VERSION,trackId:'harbor',layoutId:'harbor:original:v1',seed:1337,carId:'comet',time:2,samples:[[0,40,0,0,20],[2,80,0,0,20]]};
 const pose=getGhostPose(ghost,1),expected=sampleTrack(TRACKS[0],60);assert.equal(pose.x,expected.x);assert.equal(pose.z,expected.z);assert.equal(getGhostPose(ghost,1.1),pose);
});
test('a corrupted partial session cannot claim Tour completion',()=>{const t=createTour(0);t.status='complete';assert.equal(restoreTour(t),null);});
