import assert from 'node:assert/strict';
import { mkdirSync, writeFileSync } from 'node:fs';
import { FlightSimulation } from '../../games/aetherwake/src/simulation.js';
import { WORLD, islandById, EXPEDITION_LIMIT_SECONDS } from '../../games/aetherwake/src/world.js';
import { defaultSave, migrateSave } from '../../games/aetherwake/src/storage.js';
import { steer, distance } from '../games/aetherwake/flight-test-pilot.mjs';
const output = process.env.AETHERWAKE_EVIDENCE || '/tmp/aetherwake-acceptance';
mkdirSync(output,{recursive:true});
const runs=[];
function campaign({module,style,seed,hz=60,digital=false}) {
 const sim=new FlightSimulation({module,seed});sim.setRouteStyle(style);sim.launch();
 let approach=null,errorX=0,errorZ=0,key='',segment=null,maxStep=0,gates=0,returnGates=0,lastMechanic=0,maxMechanicGap=0;
 const stages=[];
 const input={x:0,z:0,brake:false,glide:false};
 for(let f=0;f<2700*hz&&sim.status==='running';f++) {
  const s=sim.state,p=s.player,target=s.surveyHint||s.objective,landing=!s.surveyHint||target.landing;
  const phase=s.activeCampaignCircuit==null?`route-${s.activated.length+1}`:`circuit-${s.activeCampaignCircuit+1}-${s.campaignCircuitStages[s.activeCampaignCircuit]+1}`;
  if(phase!==key) {
   if(segment){segment.seconds=s.activeSeconds-segment.start;segment.distance=s.distance-segment.distance;stages.push(segment);}
   segment={phase,start:s.activeSeconds,distance:s.distance,minEnergy:100,maxCorridorError:0,failures:0};key=phase;
  }
  if(s.nearby?.canInteract) {sim.interact();continue;}
  const ox=p.x,oy=p.y,oz=p.z;
  if(!digital) steer(sim,target,{landing});
  else {
   let aim=target; const d=distance(p,target);
   if(approach?.id!==target.id)approach=null;
   if(!landing&&target.heading&&d<target.radius*1.6&&!approach){
    const len=Math.hypot(target.heading.x,target.heading.z),speed=Math.hypot(p.vx,p.vz),dot=(p.vx*target.heading.x+p.vz*target.heading.z)/Math.max(.001,speed*len);
    if(dot<(target.heading.minDot??.5))approach={id:target.id,x:target.x-target.heading.x/len*65,z:target.z-target.heading.z/len*65};
   }
   if(approach){if(distance(p,approach)<12)approach=null;else aim=approach;}
   const ad=Math.max(.001,distance(p,aim)),x=(aim.x-p.x)/ad,z=(aim.z-p.z)/ad;
   errorX+=Math.abs(x);errorZ+=Math.abs(z);input.x=input.z=0;
   if(errorX>=.7){input.x=Math.sign(x);errorX-=1;}if(errorZ>=.7){input.z=Math.sign(z);errorZ-=1;}
   input.brake=landing?!p.grounded&&d<Math.max(26,Math.max(0,p.y-target.y)/7*5.2+9):p.y>target.y+(target.radius||15)*.65&&d<55;
   input.glide=p.grounded&&(!landing||d>50||Math.abs(p.y-target.y)>2)||!p.grounded&&!p.gliding;
   for(let i=0;i<60/hz;i++){sim.step(input,1/60);input.glide=false;}
  }
  maxStep=Math.max(maxStep,Math.hypot(p.x-ox,p.y-oy,p.z-oz));
  segment.minEnergy=Math.min(segment.minEnergy,p.energy);
  const route=WORLD.routes.find(r=>r.id===s.objective.routeId),stage=sim.campaignStage();
  const index=stage?s.campaignGate:s.activated.length===3?s.returnSamples:s.mainSamples[s.activated.length]||0;
  const points=stage?[stage.launch,...stage.gates]:route.waypoints;
  const a=points[Math.min(index,points.length-1)],b=points[Math.min(index+1,points.length-1)];
  if(!p.grounded&&a&&b) { const dx=b.x-a.x,dz=b.z-a.z,t=Math.max(0,Math.min(1,((p.x-a.x)*dx+(p.z-a.z)*dz)/(dx*dx+dz*dz||1)));
   segment.maxCorridorError=Math.max(segment.maxCorridorError,Math.hypot(p.x-a.x-t*dx,p.z-a.z-t*dz)); }
  assert.equal(s.activeChallenge,null,'No unselected optional course');
  assert.equal(sim.stalls,0,`${module}/${style}/${seed}/${hz}: recovery in ${phase}`);
  for(const e of sim.drainEvents()){if(['survey','challenge-gate','station','land','campaign-stage'].includes(e.type)){maxMechanicGap=Math.max(maxMechanicGap,s.activeSeconds-lastMechanic);lastMechanic=s.activeSeconds;}if(e.type==='challenge-gate')gates++;if(e.type==='survey'&&e.id.startsWith('sample-return'))returnGates++;}
 }
 if(segment){segment.seconds=sim.state.activeSeconds-segment.start;segment.distance=sim.state.distance-segment.distance;stages.push(segment);}
 const result={module,style,seed,hz,digital,status:sim.status,activeSeconds:sim.state.activeSeconds,scoredSeconds:sim.elapsed,stalls:sim.stalls,distance:sim.state.distance,cargoDamage:sim.state.cargoDamage,gates,returnGates,maxStep,maxMechanicGap,stages};
 runs.push(result);writeFileSync(`${output}/gameplay.json`,JSON.stringify({runs},null,2));
 assert.equal(sim.status,'complete',JSON.stringify(result));assert.deepEqual(sim.state.campaignCircuitStages,[3,3,3]);
 assert.equal(gates,81);assert.equal(returnGates,6);assert.ok(maxStep<4,'Continuous movement; no teleport-sized control steps');
 assert.ok(result.activeSeconds>=600&&result.activeSeconds<EXPEDITION_LIMIT_SECONDS);assert.ok(maxMechanicGap<=180,'Gate/condition/area transition within three minutes');
 console.log(`PASS ${digital?'digital':'analog'} ${module}/${style} seed ${seed} ${hz}Hz: ${result.activeSeconds.toFixed(2)} active seconds, 81+6 gates, zero stalls`);
 return sim;
}
for(const seed of [2718,42,173])for(const module of ['turn','reserve','tailwind'])for(const style of ['safe','shortcut'])campaign({module,style,seed});
for(const hz of [60,30,20,10])for(const module of ['turn','reserve','tailwind'])for(const style of ['safe','shortcut'])campaign({module,style,seed:2718,hz,digital:true});
const bots=[];
for(const kind of ['idle-ground','idle-air','random']) {
 const sim=new FlightSimulation({seed:2718});sim.launch();let seed=173;
 const input={};
 for(let frame=0;frame<2700*60+1&&sim.status==='running';frame++){
  if(kind==='random'&&frame%30===0){seed=(Math.imul(seed,1664525)+1013904223)>>>0;input.x=(seed%3)-1;input.z=((seed>>>8)%3)-1;input.brake=(seed&16)!==0;input.glide=(seed&31)===0;}
  else input.glide=kind==='idle-air'&&frame===0;
  sim.step(input,1/60);sim.events.length=0;
 }
 assert.equal(sim.status,'failed');assert.equal(sim.state.activeSeconds,2700);assert.equal(sim.activated.length,0);assert.deepEqual(sim.saveData().records,{});
 const before=sim.snapshot();sim.step({glide:true,x:1},1/60);assert.equal(sim.interact(),false);assert.deepEqual(sim.snapshot(),before);
 const restored=new FlightSimulation({save:sim.saveData()});assert.equal(restored.status,'failed');assert.equal(restored.launch(),false);
 sim.setExploration();sim.setPaused(false);sim.step({},.1);assert.equal(sim.status,'running');assert.ok(sim.state.activeSeconds>2700);assert.deepEqual(sim.saveData().records,{});
 bots.push({kind,activeSeconds:before.activeSeconds,stalls:before.stalls,status:before.status,stations:before.activated.length});
}
const old=migrateSave({...defaultSave(),schemaVersion:3,completed:true,records:{turn:{time:400,score:2000,stalls:0}}}).save;
assert.deepEqual(old.activated,[]);assert.equal(old.completed,false);assert.equal(old.legacyRecords['v3:turn'].time,400);assert.deepEqual(old.records,{});
const fastest=Math.min(...runs.map(r=>r.activeSeconds));
writeFileSync(`${output}/gameplay.json`,JSON.stringify({fastest,runs,bots},null,2));
console.log(`PASS ${runs.length} competent campaigns; fastest ${fastest.toFixed(2)}s; idle/random timeout; migration separates records`);
