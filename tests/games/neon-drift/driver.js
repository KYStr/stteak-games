import { sampleTrack } from '../../../games/neon-drift/src/content.js';
import { createRace,stepRace } from '../../../games/neon-drift/src/physics.js';
const clamp=(n,a,b)=>Math.min(b,Math.max(a,n));
/** Test-only route oracle, deliberately outside runtime. It never assigns positions/checkpoints. */
export function driveInput(state,targetSpeed=25,cornerBudget=8.5) {
  const p=sampleTrack(state.track,state.s+Math.max(2,state.speed*.12));
  const speed=Math.abs(state.speed);
  const bend=Math.abs(p.curvature);
  const wanted=Math.min(targetSpeed,Math.sqrt(cornerBudget/Math.max(.0005,bend)));
  const speedFactor=clamp(speed/10,0,1)/(1+Math.max(0,speed-18)*.027);
  const desiredYaw=p.curvature*speed/state.car.grip-state.lateral*.035-state.velocityYaw*.4;
  const turnRate=p.curvature*speed+(desiredYaw-state.yaw)*3.5;
  return {throttle:clamp((wanted-state.speed)*.4,0,1),brake:clamp((state.speed-wanted)*.15,0,1),
    steer:clamp(-turnRate/Math.max(.2,state.car.steerRate*speedFactor),-1,1),handbrake:false};
}
export function driftInput(state,targetSpeed=23) {
  const p=sampleTrack(state.track,state.s+Math.max(2,state.speed*.12));
  const speed=Math.abs(state.speed),handbrake=Math.abs(p.curvature)>.005&&speed>12;
  const wanted=Math.min(targetSpeed,Math.sqrt(8.5/Math.max(.004,Math.abs(p.curvature))));
  const speedFactor=clamp(speed/10,0,1)/(1+Math.max(0,speed-18)*.027);
  const desiredYaw=p.curvature*speed/(handbrake?state.car.driftGrip:state.car.grip)-state.lateral*.035-state.velocityYaw*.4;
  const turnRate=p.curvature*speed+(desiredYaw-state.yaw)*3.5;
  return {throttle:clamp((wanted-state.speed)*.4,0,1),brake:clamp((state.speed-wanted)*.15,0,1),
    steer:clamp(-turnRate/Math.max(.2,state.car.steerRate*speedFactor*(handbrake?1.22:1)),-1,1),handbrake};
}
export function driveRace(options={},maxSeconds=305) {
  const state=createRace(options),tape=[];
  for(let frame=0;frame<maxSeconds*30&&!state.finished;frame++) {
    const input=driveInput(state);tape.push(input);stepRace(state,input,1/30);
  }
  return {state,tape};
}
