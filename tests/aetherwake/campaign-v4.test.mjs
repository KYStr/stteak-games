import test from 'node:test';
import assert from 'node:assert/strict';
import { FlightSimulation } from '../../games/aetherwake/src/simulation.js';
import { defaultSave, migrateSave, validateSave } from '../../games/aetherwake/src/storage.js';
import { WORLD, STATIONS } from '../../games/aetherwake/src/world.js';
import { flyMainSegment, flyCourse } from '../games/aetherwake/flight-test-pilot.mjs';
const finished = () => ({...defaultSave(),activated:[...STATIONS],mainSamples:[8,8,8],campaignCircuitStages:[3,3,3],returnSamples:6});
test('v4 final E rejects missing return beacons and each mandatory delivered leg',()=>{
 for(const patch of [{returnSamples:5},{campaignCircuitStages:[3,2,3]},{mainSamples:[8,7,8]}]){
  const sim=new FlightSimulation({save:{...finished(),...patch}});sim.launch();assert.equal(sim.interact(),false);assert.equal(sim.status,'running');assert.deepEqual(sim.saveData().records,{});
 }
 const sim=new FlightSimulation({save:finished()});sim.launch();assert.equal(sim.interact(),true);assert.equal(sim.status,'complete');assert.ok(sim.saveData().records.turn);
});
test('mandatory phase cannot be canceled, optional badges cannot satisfy it, reload resets only undelivered gates',()=>{
 const sim=new FlightSimulation({save:{...defaultSave(),activated:[STATIONS[0]],mainSamples:[8,0,0],checkpoint:STATIONS[0],campaignCircuitStages:[1,0,0],activeCampaignCircuit:0,completedChallenges:WORLD.challenges.map(c=>c.id)}});
 sim.launch();sim.state.campaignGate=6;sim._objective();assert.equal(sim.trackChallenge('challenge-1'),false);assert.equal(sim.cancelChallenge(),false);assert.equal(sim.state.campaignGate,6);
 const reload=new FlightSimulation({save:sim.saveData()});assert.equal(reload.state.activeCampaignCircuit,0);assert.deepEqual(reload.state.campaignCircuitStages,[1,0,0]);assert.equal(reload.state.campaignGate,0);assert.equal(reload.state.surveyHint.campaign,true);
 sim._recover('test');assert.equal(sim.state.campaignGate,0);assert.deepEqual(sim.state.campaignCircuitStages,[1,0,0]);
 sim.reset();assert.deepEqual(sim.state.campaignCircuitStages,[0,0,0]);assert.equal(sim.state.returnSamples,0);
});
test('return beacons survive reload/recovery; final E cannot bypass the next visible beacon',()=>{
 const sim=new FlightSimulation({save:{...finished(),checkpoint:'island-dawn',returnSamples:4}});sim.launch();assert.equal(sim.state.surveyHint.rejoin,true);sim._recover('test');assert.equal(sim.state.returnSamples,4);assert.equal(sim.state.surveyHint.rejoin,true);
 const reload=new FlightSimulation({save:sim.saveData()});assert.equal(reload.state.returnSamples,4);assert.equal(reload.state.surveyHint.rejoin,true);
 const stalls=sim.stalls; flyMainSegment(sim,4,'shortcut'); assert.equal(sim.status,'complete'); assert.equal(sim.stalls,stalls);
});
test('weather counts only running fixed steps; pause and reload preserve it; penalty does not spend weather',()=>{
 const sim=new FlightSimulation();sim.launch();for(let i=0;i<60;i++)sim.step({},1/60);
 sim.setPaused(true);const time=sim.state.activeSeconds;for(let i=0;i<60;i++)sim.step({},1/60);assert.equal(sim.state.activeSeconds,time);
 const reload=new FlightSimulation({save:sim.saveData()});assert.equal(reload.state.activeSeconds,time);reload.launch();reload._recover('test');assert.equal(reload.state.activeSeconds,time);assert.ok(reload.elapsed>=time+8);
 const expired=new FlightSimulation({save:{...defaultSave(),activeSeconds:2699.9}});expired.launch();expired.step({},.1);assert.equal(expired.status,'failed');assert.equal(expired.state.activeSeconds,2700);assert.equal(expired.drainEvents().filter(e=>e.type==='failed').length,1);expired.step({},.1);assert.equal(expired.drainEvents().length,0);
 assert.equal(new FlightSimulation({save:expired.saveData()}).status,'failed');expired.reset();assert.equal(expired.state.activeSeconds,0);assert.equal(expired.status,'ready');
});
test('untimed mode remains unranked on completion, reload and reset',()=>{
 const sim=new FlightSimulation({save:{...finished(),mode:'exploration',activeSeconds:3600}});sim.launch();sim.step({},1/60);assert.equal(sim.status,'running');assert.equal(sim.interact(),true);assert.deepEqual(sim.saveData().records,{});assert.deepEqual(sim.saveData().routeRecords,{});
 sim.reset();assert.equal(sim.state.mode,'exploration');assert.equal(sim.state.activeSeconds,0);
});
test('v3 migration archives campaign/route records and preserves authored optional stages, fragments and settings',()=>{
 const old={...finished(),schemaVersion:3,completed:true,elapsed:400,checkpoint:'island-dawn',relics:['relic-11'],courseStages:{'challenge-1':2},completedChallenges:['challenge-2'],records:{turn:{time:400,score:1000}},routeRecords:{'route-4-shortcut':{time:45,module:'tailwind',seed:42}},settings:{music:0,reducedMotion:true}};
 const {save,migrated}=migrateSave(old);assert.equal(migrated,true);assert.equal(save.schemaVersion,4);assert.equal(save.checkpoint,'island-camp');assert.deepEqual(save.activated,[]);assert.deepEqual(save.mainSamples,[0,0,0]);assert.deepEqual(save.campaignCircuitStages,[0,0,0]);assert.equal(save.completed,false);assert.equal(save.legacyRecords['v3:turn'].time,400);assert.equal(save.legacyRouteRecords['v3:route-4-shortcut'].time,45);assert.deepEqual(save.records,{});assert.deepEqual(save.relics,['relic-11']);assert.equal(save.courseStages['challenge-1'],2);assert.equal(save.settings.music,0);assert.equal(save.settings.reducedMotion,true);
 assert.deepEqual(validateSave(save),save);
});

test('leaving an optional leg at another island offers the safe main-route connection',()=>{
 const sim=new FlightSimulation(); sim.launch(); flyCourse(sim,WORLD.challenges[0],{stopAfterStage:1});
 assert.equal(sim.checkpoint,'island-bridge'); assert.equal(sim.cancelChallenge(),true);
 assert.equal(sim.state.surveyHint.mainTransit,true); assert.ok(sim.state.mainTransit.length>0);
 assert.deepEqual(sim.state.mainSamples,[0,0,0]); assert.equal(sim.stalls,0);
});

test('speed grades use the expanded campaign duration rather than retired short-run budgets',()=>{
 for (const [elapsed,grade] of [[1050,'S'],[1500,'A'],[2000,'B'],[2400,'C']]) {
  const sim=new FlightSimulation({save:{...finished(),completed:true,elapsed,activeSeconds:elapsed}});
  assert.equal(sim.state.rating.speed,grade);
 }
});
