import assert from 'node:assert/strict';
import {writeFile} from 'node:fs/promises';
import {TRACKS,CARS,TOUR_STAGES,resolveTourTrack,sampleTrack} from '../../games/neon-drift/src/content.js';
import {createRace,stepRace} from '../../games/neon-drift/src/physics.js';
import {driveInput,driftInput} from '../games/neon-drift/driver.js';
const rows=[];
for(const seed of [0,7])for(const car of CARS)for(const target of [20,23,26])for(let stageIndex=0;stageIndex<6;stageIndex++){
 const stage=TOUR_STAGES[stageIndex];for(let trial=0;trial<3;trial++){
  const r=createRace({...stage,carId:car.id,seed,track:resolveTourTrack(stage.trackId,seed)});let rng=trial+71,noise=0;
  for(let i=0;i<305*30&&!r.finished;i++){if(i%15===0){rng=(Math.imul(rng,1664525)+1013904223)>>>0;noise=(rng/4294967296-.5)*.03;}const controls=stage.mode==='time'?driveInput(r,target):driftInput(r,target);controls.steer=Math.max(-1,Math.min(1,controls.steer+noise));stepRace(r,controls,1/30);}
  rows.push({seed,car:car.id,target,stage:stageIndex+1,trial,...r.result});
 }
}
const stages=TOUR_STAGES.map((stage,i)=>{const runs=rows.filter(r=>r.stage===i+1),failures=runs.filter(r=>!r.success).length;const p=failures/runs.length,z=1.96,n=runs.length,den=1+z*z/n,center=(p+z*z/(2*n))/den,half=z*Math.sqrt(p*(1-p)/n+z*z/(4*n*n))/den;const track=TRACKS.find(t=>t.id===stage.trackId);let maxCurvature=0;for(let s=0;s<track.length;s+=5)maxCurvature=Math.max(maxCurvature,Math.abs(sampleTrack(track,s).curvature));return {...stage,length:track.length,maxCurvature,bronze:track.medals[stage.mode][2],limitSeconds:stage.mode==='time'?300:120,n,failures,failureRate:p,wilson95:[Math.max(0,center-half),Math.min(1,center+half)],width:TRACKS.find(t=>t.id===stage.trackId).width};});
const paceGroups=[20,23,26].map(target=>({target,stages:Array.from({length:6},(_,i)=>{const runs=rows.filter(r=>r.target===target&&r.stage===i+1);return {stage:i+1,n:runs.length,failures:runs.filter(r=>!r.success).length};})}));
for(const group of paceGroups)for(let i=1;i<group.stages.length;i++){const before=group.stages[i-1],after=group.stages[i];assert.ok(after.failures/after.n-before.failures/before.n<=.40,`Pace ${group.target}: stage ${i+1} failure spike exceeds 40 points`);}
for(const car of CARS)assert.ok(rows.filter(r=>r.car===car.id&&r.target===26).every(r=>r.success),`${car.id} must have a viable all-stage 26 m/s policy`);
await writeFile(process.env.NEON_CALIBRATION_OUT||'/tmp/neon-calibration.json',JSON.stringify({paceGroups,interpretation:`Measured failure rates by stage: ${stages.map(s=>(100*s.failureRate).toFixed(2)+'%').join(', ')}. Every fixed pace passes the <=40-point upward-jump gate. Every car wins all stages at 26 m/s. Source controller simulations, not human failure rates.`,scope:'Source simulation only; legal input controller; three steering perturbation seeds per car, speed and layout. Not human failure rates.',stages,rows},null,2));console.log(JSON.stringify(stages,null,2));
