import test from 'node:test';
import assert from 'node:assert/strict';
import { FlightSimulation } from '../../../games/aetherwake/src/simulation.js';
import { SaveStore, SAVE_KEY, defaultSave, validateSave, migrateSave } from '../../../games/aetherwake/src/storage.js';
import { islandById } from '../../../games/aetherwake/src/world.js';
import { steer, distance } from './flight-test-pilot.mjs';
const close=(a,b)=>assert.ok(Math.abs(a-b)<1e-7,`${a} !== ${b}`);
function disk(){const m=new Map();return {fail:false,getItem:k=>m.get(k)??null,setItem(k,v){if(this.fail)throw Error('quota fixture');m.set(k,String(v));}};}
function landing(sim,store){
 const count=sim.activated.length;sim.launch();
 for(let frame=0;frame<480*60;frame++){
  const target=sim.state.surveyHint,island=islandById(sim.state.objective.islandId);
  if(!target&&sim.player.grounded&&distance(sim.player,island)<8){assert.equal(sim.activated.length,count);return;}
  steer(sim,target||island,{landing:!target});
  for(const e of sim.drainEvents())if(e.type==='save')store.save(sim.saveData());
  assert.equal(sim.stalls,0);
 }
 assert.fail('ordinary fixed-step route navigation timeout');
}
function deliver(sim,store){assert.equal(sim.interact(),true);store.save(sim.saveData());sim.drainEvents();}
function fresh(){const d=disk(),store=new SaveStore(d),sim=new FlightSimulation({seed:20261028,module:'turn'});return {d,store,sim};}

for(const wait of [0,2])test(`natural first landing/save/reload plus ${wait}s retains the full route clock`,()=>{
 const {d,store,sim}=fresh();landing(sim,store);
 const saved=JSON.parse(d.getItem(SAVE_KEY));assert.equal(saved.segmentStart,0);assert.equal(saved.mainSamples[0],8);assert.deepEqual(saved.activated,[]);
 const nextStore=new SaveStore(d),next=new FlightSimulation({save:nextStore.load().save});next.launch();
 for(let n=0;n<wait*60;n++)next.step({},1/60);
 deliver(next,nextStore);close(nextStore.load().save.routeRecords['route-1-safe'].time,saved.elapsed+wait);
});
test('second route retains its own nonzero origin, not campaign total, through two reloads',()=>{
 const {d,store,sim}=fresh();landing(sim,store);deliver(sim,store);const origin=sim.elapsed;
 landing(sim,store);const saved=JSON.parse(d.getItem(SAVE_KEY));close(saved.segmentStart,origin);
 let next=new FlightSimulation({save:new SaveStore(d).load().save});next.launch();next.step({},1/60);store.save(next.saveData());
 next=new FlightSimulation({save:new SaveStore(d).load().save});next.launch();deliver(next,store);
 const records=store.load().save.routeRecords;close(records['route-1-safe'].time,origin);close(records['route-2-safe'].time,next.elapsed-origin);assert.ok(records['route-2-safe'].time<next.elapsed);
});
test('legacy v3 missing clock preserves legitimate PB, skips only unknown current route, then resumes recording',()=>{
 const {d,store,sim}=fresh();landing(sim,store);deliver(sim,store);const best=store.load().save.routeRecords['route-1-safe'];
 sim.reset();landing(sim,store);const legacy=JSON.parse(d.getItem(SAVE_KEY));delete legacy.segmentStart;d.setItem(SAVE_KEY,JSON.stringify(legacy));
 const nextStore=new SaveStore(d),next=new FlightSimulation({save:nextStore.load().save});assert.equal(next.state.segmentStart,null);next.launch();deliver(next,nextStore);
 assert.deepEqual(nextStore.load().save.routeRecords['route-1-safe'],best);assert.equal(next.state.routeTimes.length,0);const origin=next.elapsed;close(next.state.segmentStart,origin);
 landing(next,nextStore);deliver(next,nextStore);close(nextStore.load().save.routeRecords['route-2-safe'].time,next.elapsed-origin);
});
test('legacy v3 already in second route skips that route and records the following third route',()=>{
 const {d,store,sim}=fresh();landing(sim,store);deliver(sim,store);landing(sim,store);
 const legacy=JSON.parse(d.getItem(SAVE_KEY)),first=structuredClone(legacy.routeRecords['route-1-safe']);delete legacy.segmentStart;d.setItem(SAVE_KEY,JSON.stringify(legacy));
 const nextStore=new SaveStore(d),next=new FlightSimulation({save:nextStore.load().save});next.launch();deliver(next,nextStore);
 assert.equal(nextStore.load().save.routeRecords['route-2-safe'],undefined);assert.deepEqual(nextStore.load().save.routeRecords['route-1-safe'],first);const start=next.elapsed;
 landing(next,nextStore);deliver(next,nextStore);close(nextStore.load().save.routeRecords['route-3-safe'].time,next.elapsed-start);
});
test('final return route records exact known elapsed after safe camp reload and restores completion',()=>{
 const {d,store,sim}=fresh();for(let n=0;n<3;n++){landing(sim,store);deliver(sim,store);}const start=sim.elapsed;
 landing(sim,store);const before=JSON.parse(d.getItem(SAVE_KEY));assert.equal(before.checkpoint,'island-camp');assert.equal(before.completed,false);
 const nextStore=new SaveStore(d),next=new FlightSimulation({save:nextStore.load().save});next.launch();deliver(next,nextStore);
 const result=nextStore.load().save;assert.equal(result.completed,true);close(result.routeRecords['route-4-safe'].time,result.elapsed-start);assert.equal(new FlightSimulation({save:result}).status,'complete');
});
test('clock validation uses unknown for missing, negative, nonnumeric or future origins, without deleting prior PBs',()=>{
 const pb={time:99,assisted:false,module:'turn',seed:5};
 for(const value of [undefined,null,-1,101,NaN,Infinity,'12',{},[]]){
  const raw={...defaultSave(),elapsed:100,segmentStart:value,routeRecords:{'route-1-safe':pb}};
  assert.equal(validateSave(raw).segmentStart,null);assert.deepEqual(validateSave(raw).routeRecords['route-1-safe'],pb);
 }
 for(const value of [0,12.25,100])assert.equal(validateSave({...defaultSave(),elapsed:100,segmentStart:value}).segmentStart,value);
 assert.equal(defaultSave().segmentStart,0);
});
test('v1/v2 migration never invents an active current-route clock',()=>{
 for(const version of [1,2]){
  const old={...defaultSave(),schemaVersion:version,elapsed:80,segmentStart:0};
  const result=migrateSave(old);assert.equal(result.migrated,true);assert.equal(result.save.segmentStart,null);assert.equal(result.save.elapsed,80);
 }
});
test('quota pending memory retains clock and next explicit successful save writes it atomically',()=>{
 const {d,store,sim}=fresh();landing(sim,store);deliver(sim,store);const start=sim.elapsed,old=d.getItem(SAVE_KEY);d.fail=true;
 landing(sim,store);const latest=store.load();assert.match(latest.warning,/記憶體/);close(latest.save.segmentStart,start);assert.equal(d.getItem(SAVE_KEY),old);
 const next=new FlightSimulation({save:latest.save});next.launch();deliver(next,store);assert.equal(d.getItem(SAVE_KEY),old);d.fail=false;assert.equal(store.save(next.saveData()).ok,true);
 close(new SaveStore(d).load().save.routeRecords['route-2-safe'].time,next.elapsed-start);
});
test('existing zero PB remains preserved; this revision cannot reconstruct discarded history',()=>{
 const raw={...defaultSave(),elapsed:100,segmentStart:null,routeRecords:{'route-1-safe':{time:0,assisted:false,module:'turn',seed:1}}};
 const d=disk();d.setItem(SAVE_KEY,JSON.stringify(raw));const store=new SaveStore(d);assert.equal(store.load().save.routeRecords['route-1-safe'].time,0);
 store.save({settings:{music:.2}});assert.equal(new SaveStore(d).load().save.routeRecords['route-1-safe'].time,0);
});
test('explicit restart and clear reset the new clock to zero while keeping their established retention contracts',()=>{
 const {store,sim}=fresh();landing(sim,store);deliver(sim,store);const best=sim.saveData().routeRecords;
 sim.reset();assert.equal(sim.state.segmentStart,0);assert.equal(sim.elapsed,0);assert.deepEqual(sim.saveData().routeRecords,best);
 store.save(sim.saveData());assert.equal(store.clearProgress().ok,true);assert.equal(store.load().save.segmentStart,0);assert.deepEqual(store.load().save.routeRecords,{});
});

test('malformed raw elapsed cannot launder zero into a trusted segment origin',()=>{
 for(const elapsed of [undefined,null,-1,Infinity,NaN,'99',{},[],1e9+1]) {
  const raw={...defaultSave(),elapsed,segmentStart:0,checkpoint:'island-reed',mainSamples:[8,0,0]};
  const save=validateSave(raw);assert.equal(save.segmentStart,null);
  const sim=new FlightSimulation({save});sim.launch();assert.equal(sim.interact(),true);assert.equal(sim.saveData().routeRecords['route-1-safe'],undefined);
 }
});
