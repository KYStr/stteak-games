// Development-only fixed legal input tape; no telemetry/pilot snapshots during capture.
import inspector from 'node:inspector';
import {writeFile,readFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import assert from 'node:assert/strict';
import {createRace,stepRace} from '../../games/neon-drift/src/physics.js';
import {CARS,TRACKS,resolveTourTrack} from '../../games/neon-drift/src/content.js';
import {driveInput,driftInput} from '../games/neon-drift/driver.js';
const cases=[];const results=[];
for(const car of CARS)for(const district of TRACKS)for(const seed of [0,7])for(const mode of ['time','drift']){
 const options={carId:car.id,trackId:district.id,seed,mode,track:resolveTourTrack(district.id,seed)},race=createRace(options),tape=[];
 for(let i=0;i<305*30&&!race.finished;i++){const input=mode==='time'?driveInput(race,23):driftInput(race,28);tape.push({...input});stepRace(race,input,1/30);}
 cases.push({options,tape});
}
const session=new inspector.Session();session.connect();const send=(method,params={})=>new Promise((resolve,reject)=>session.post(method,params,(e,r)=>e?reject(e):resolve(r)));
await send('HeapProfiler.startSampling',{samplingInterval:32768,includeObjectsCollectedByMajorGC:true,includeObjectsCollectedByMinorGC:true});
for(const {options,tape} of cases){const race=createRace(options),crossings=[];let last=0;for(const input of tape){stepRace(race,input,1/30);if(race.checkpointCount!==last){crossings.push([race.checkpointCount,race.lastLegalCheckpoint,race.ticks]);last=race.checkpointCount;}}
 results.push({car:race.carId,layout:race.layoutId,mode:race.mode,ticks:race.ticks,checkpoints:crossings,score:race.score,collisions:race.collisions,penalty:race.penalty,result:race.result});}
const profile=await send('HeapProfiler.stopSampling');session.disconnect();
const out=process.env.NEON_TRACE_OUT||'/tmp/neon-physics-trace';await writeFile(out+'.json',JSON.stringify(profile));
const digest=createHash('sha256').update(JSON.stringify(results)).digest('hex');
const golden=new URL('./physics-tape-golden.json',import.meta.url);
if(process.argv.includes('--record'))await writeFile(golden,JSON.stringify({digest,results},null,2));else assert.deepEqual(results,JSON.parse(await readFile(golden)).results,'Representation refactor must preserve exact outcomes and checkpoint/finish ticks');
const sites=[];function visit(n){if(n.selfSize&&/physics.js|content.js/.test(n.callFrame.url))sites.push({bytes:n.selfSize,...n.callFrame});for(const c of n.children)visit(c);}visit(profile.profile.head);
await writeFile(out+'-sites.json',JSON.stringify(sites.sort((a,b)=>b.bytes-a.bytes),null,2));console.log('Input tape: 36 exact outcomes',digest,'allocation sites',sites.slice(0,8));
