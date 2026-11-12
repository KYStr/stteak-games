import assert from 'node:assert/strict';
import {step,interact} from '../../games/tidebound/src/rules.js';
import {diveTarget,diveStage,valvePhase} from '../../games/tidebound/src/world.js';
// Continuous rules pilot: never moves the position directly or skips a task.
export function swim(state,target,tolerance=1){
 for(let i=0;i<1200;i++){assert.equal(state.mode,'diving','diver was rescued');const dx=target.x-state.diver.x,dz=target.z-state.diver.z,d=Math.hypot(dx,dz);if(d<tolerance)return;step(state,.1,{diveX:dx/d,diveZ:dz/d});}throw Error('Swim progress stalled');
}
export function completeDive(state){
 const stage=diveStage(state);for(let i=0;i<stage.stations.length+1;i++){const target=diveTarget(state);swim(state,target,2.8);for(let n=0;n<70&&stage.mechanic==='valves'&&valvePhase(state.time,state.voyage.variantId)>=3;n++)step(state,.05);interact(state);}
 assert.ok(state.parts.includes(stage.partId));
}
