import test from 'node:test';import assert from 'node:assert/strict';
import {createState,depart,dock,startDive,interact,step,surface,restore,serialize,collectObservation,sampleTideInto,tideAt,currentAt,currentAtInto,contractProgress} from '../../games/tidebound/src/rules.js';
import {DIVE_SITES,STORY_STAGES,ISLANDS,voyageVariant,diveStage,diveTarget,guardianInto} from '../../games/tidebound/src/world.js';
import {completeDive} from './pilot-rules.mjs';
function enter(seed,index=0){let s=createState(seed);depart(s);s.parts=STORY_STAGES.slice(0,index).map(s=>s.partId);const site=DIVE_SITES.find(s=>s.id===STORY_STAGES[index].siteId);Object.assign(s.boat,ISLANDS.find(i=>i.id===site.islandId).dock);dock(s);startDive(s,site.id);return s;}
test('later challenges explain prerequisite; original schema-one parts unlock their saved tasks',()=>{let s=createState();depart(s);Object.assign(s.boat,ISLANDS.find(i=>i.id==='ruin').dock);dock(s);assert.equal(startDive(s,'ruin-dive')[0].type,'info');assert.equal(s.mode,'island');s.parts=['gear'];let r=restore(serialize(s)).state;assert.equal(r.diveTasks['ruin-dive'].opened,true);assert.equal(r.diveTasks['ruin-dive'].completedStationIds.length,4);});
test('three variants have deterministic safe encounter layouts and at least five differences',()=>{assert.deepEqual(voyageVariant(1),voyageVariant(1));const a=voyageVariant(1),b=voyageVariant(3);assert.ok(a.observations.filter(p=>!b.observations.some(q=>q.id===p.id&&q.x===p.x&&q.z===p.z)).length>=5);for(const id of [2,3])for(const p of voyageVariant(id).observations){assert.ok(ISLANDS.every(i=>Math.hypot(p.x-i.x,p.z-i.z)>i.radius+9));const base=voyageVariant(1).observations.find(q=>q.id===p.id);assert.ok(Math.abs(Math.hypot(base.x-p.x,base.z-p.z)-15)<1e-6);}for(const stage of a.stages)for(const p of stage.stations){const site=DIVE_SITES.find(s=>s.id===stage.siteId);assert.ok(Math.hypot(p.x-site.entry.x,p.z-site.entry.z)<site.radius);}});
test('five competent starts per stage and variant finish; tasks, surface, retries and saves preserve progress',()=>{for(const seed of [1,2,3])for(let stage=0;stage<3;stage++)for(let run=0;run<5;run++){let s=enter(seed,stage);s.time=run*1.6;const site=DIVE_SITES.find(d=>d.id===s.activeDive);completeDive(s);assert.equal(s.records.rescues,0);assert.ok(s.oxygen>0);assert.ok(s.diveTasks[site.id].opened);assert.equal(s.supplyRemaining,900);const parts=[...s.parts],tasks=structuredClone(s.diveTasks);s=restore(serialize(s)).state;assert.deepEqual(s.parts,parts);assert.deepEqual(s.diveTasks[site.id],tasks[site.id]);surface(s);startDive(s,site.id);assert.equal(s.diveCollected,true);}});
test('stations cannot be skipped and E repeat is idempotent; every intermediate save/retry retains completed station IDs',()=>{for(let stage=0;stage<3;stage++){let s=enter(1,stage),site=DIVE_SITES.find(d=>d.id===s.activeDive);Object.assign(s.diver,site.target);interact(s);assert.ok(!s.parts.includes(site.partId));for(const p of diveStage(s).stations){Object.assign(s.diver,p);s.time=0;interact(s);let count=s.diveTasks[site.id].completedStationIds.length;interact(s);assert.equal(s.diveTasks[site.id].completedStationIds.length,count);s=restore(serialize(s)).state;assert.equal(s.diveTasks[site.id].completedStationIds.length,count);surface(s);startDive(s,site.id);}assert.equal(s.diveTasks[site.id].opened,true);}});
test('supply warns at 120/60/15, idling rescues exactly once, relaxed sailing has no pressure',()=>{let s=createState();depart(s);s.supplyRemaining=121;const warnings=[];for(let i=0;i<1220;i++)warnings.push(...step(s,.1));assert.equal(s.records.rescues,1);assert.ok(warnings.filter(e=>e.type==='warning'&&e.text.includes('遠航補給')).length===3);let r=createState();r.difficulty='relaxed';depart(r);for(let i=0;i<1000;i++)step(r,1);assert.equal(r.records.rescues,0);assert.equal(r.supplyRemaining,900);});
test('restore validates optional state and defaults old saves without discarding discoveries',()=>{let s=createState();s.discoveries=['tern'];s.diveTasks={'coral-dive':{completedStationIds:['bad','coral-dive-0','coral-dive-0'],opened:true}};s.supplyRemaining=-1;s.difficulty='bogus';let r=restore(serialize(s)).state;assert.deepEqual(r.diveTasks['coral-dive'].completedStationIds,['coral-dive-0']);assert.equal(r.diveTasks['coral-dive'].opened,false);assert.equal(r.supplyRemaining,0);assert.equal(r.difficulty,'standard');delete s.diveTasks;delete s.supplyRemaining;r=restore(serialize(s)).state;assert.equal(r.supplyRemaining,900);assert.deepEqual(r.discoveries,['tern']);});
test('physics output arrays and scalar sampling reuse storage and match public helpers',()=>{let s=createState();depart(s);const events=[],out={},current={};assert.equal(step(s,.1,{},events),events);for(let i=0;i<100;i++){const t=i*2.3;assert.equal(sampleTideInto(t,out),out);assert.equal(out.height,tideAt(t).height);assert.deepEqual(currentAtInto(-50,-10,t,1,current),currentAt(-50,-10,t,1));}});
test('guardian grants saved two-second entry grace at every compulsory overlap phase',()=>{
 for(const seed of [1,3])for(const phase of [0,3.9,4,4.1]){
  let s=enter(seed,2);s.time=phase-(seed===3?2:0)+8;assert.equal(s.guardianCooldown,2);
  let events=step(s,.5);assert.ok(!events.some(e=>e.text?.includes('氧氣 -4')));s=restore(serialize(s)).state;assert.ok(Math.abs(s.guardianCooldown-1.5)<1e-6);
  events=step(s,1.49);assert.ok(!events.some(e=>e.text?.includes('氧氣 -4')));assert.ok(Math.abs(s.oxygen-43.01)<1e-6);assert.ok(s.guardianCooldown>0&&s.guardianCooldown<.011);
  // Hazard is still active after grace: canonical entry overlaps time zero.
  s.time=0;s.guardianCooldown=0;const site=DIVE_SITES.find(d=>d.id==='ruin-dive');const angle=(seed===3?2:0)/8*Math.PI*2;s.diver={x:site.entry.x+Math.sin(angle)*10,z:site.entry.z+Math.cos(angle)*7};
  // Explicit hazardous centre from the production scalar sampler.
  const point={};guardianInto(0,site,point,s.voyage.variantId);s.diver={x:point.x,z:point.z};const before=s.oxygen;events=step(s,.01);assert.ok(events.some(e=>e.text?.includes('氧氣 -4')));assert.ok(Math.abs(s.oxygen-(before-4.01))<1e-6);assert.equal(s.guardianCooldown,2);assert.ok(!step(s,.1).some(e=>e.text?.includes('氧氣 -4')));
 }
});

test('all three dives distinguish permanent parts from observations on this voyage, including stale saves',()=>{
 for(let index=0;index<STORY_STAGES.length;index++){
  let s=enter(1,index);const site=DIVE_SITES.find(d=>d.id===s.activeDive);
  completeDive(s);assert.ok(s.voyage.observed.includes(site.discoveryId));
  surface(s);startDive(s,site.id);assert.equal(s.diveCollected,true,'same-voyage completion');
  surface(s);depart(s);Object.assign(s.boat,ISLANDS[0].dock);dock(s);depart(s,'coral-survey');
  Object.assign(s.boat,ISLANDS.find(i=>i.id===site.islandId).dock);dock(s);interact(s);
  const tasks=structuredClone(s.diveTasks[site.id]),parts=[...s.parts];
  const entry=startDive(s,site.id);assert.match(entry[0].text,/各站保持解鎖/);assert.match(entry[0].text,/本趟重新調查/);
  assert.equal(s.diveCollected,false);assert.ok(!s.voyage.observed.includes(site.discoveryId));assert.deepEqual(s.diveTasks[site.id],tasks);
  // Exercise both live-position and safe-dock restoration branches.
  for(const sailingPosition of [false,true]){
   const stale=structuredClone(s);stale.diveCollected=true;if(sailingPosition)stale.boat={...stale.boat,...ISLANDS[0].dock};else stale.boat.x=999;
   const repaired=restore(serialize(stale)).state;assert.equal(repaired.mode,'diving');assert.equal(repaired.diveCollected,false);assert.ok(!repaired.voyage.observed.includes(site.discoveryId));
  }
  s.diveCollected=true;s=restore(serialize(s)).state;const progress=contractProgress(s).completedCount;
  s.supplyRemaining=470;Object.assign(s.diver,site.target);interact(s);
  assert.equal(s.diveCollected,true);assert.deepEqual(s.parts,parts);assert.equal(s.supplyRemaining,470);
  assert.equal(s.voyage.observed.filter(id=>id===site.discoveryId).length,1);
  if(site.id!=='ruin-dive')assert.equal(contractProgress(s).completedCount,progress+1);
  const after=serialize(s);interact(s);assert.equal(serialize(s),after,'repeat E grants no duplicate cargo, parts, rewards or refill');
  s=restore(serialize(s)).state;assert.equal(s.diveCollected,true);assert.deepEqual(s.diveTasks[site.id],tasks);
 }
});
