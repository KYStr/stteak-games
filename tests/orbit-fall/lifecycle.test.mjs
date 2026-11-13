import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile,readdir} from 'node:fs/promises';
import {createRun,storeSnapshot,legalizeSnapshot,resetPuzzle} from '../../public/games/orbit-fall/rules.js';
import {loadRun,saveRun} from '../../public/games/orbit-fall/storage.js';
import {PhysicsRoom,initializePhysics} from '../../public/games/orbit-fall/physics.js';
import {getCampaign} from '../../public/games/orbit-fall/content.js';

const {puzzles,roomById}=getCampaign(1);

test('reload preserves physical position and partial puzzle controls with zero velocity',async()=>{
  await initializePhysics();
  const run=createRun(), data=new Map(),storage={getItem:k=>data.get(k)??null,setItem:(k,v)=>data.set(k,v),removeItem:k=>data.delete(k)};
  run.roomId='room-d1-optics';
  storeSnapshot(run,run.roomId,{objects:[],player:[-2,2,1],angles:[2,3],sequence:[]});
  assert.ok(saveRun(storage,run).ok);const restored=loadRun(storage).run;
  assert.deepEqual(restored.snapshots[run.roomId].angles,[2,3]);
  const physics=new PhysicsRoom(puzzles['puzzle-reflection-1'],restored.snapshots[run.roomId],roomById[run.roomId]);
  try{assert.deepEqual({...physics.player.translation()},{x:-2,y:2,z:1});assert.deepEqual({...physics.player.linvel()},{x:0,y:0,z:0})}finally{physics.dispose()}
  assert.ok(resetPuzzle(restored).ok);assert.equal(restored.snapshots[run.roomId],undefined);
});
test('transient snapshot inputs are bounded and reject invalid position triples',()=>{
  assert.deepEqual(legalizeSnapshot({objects:[],player:[Infinity,1,2]}),{objects:[]});
  assert.deepEqual(legalizeSnapshot({player:[-99,99,99],angles:[NaN,7,100,3],sequence:[2,0,-1,1,1]}),{objects:[],player:[-7,7.25,7],angles:[0,7,0],sequence:[2,0,1,1]});
});
test('every recovered application file and original root module matches its shipped runtime',async()=>{
  const source=new URL('../../games/orbit-fall/src/',import.meta.url),runtime=new URL('../../public/games/orbit-fall/',import.meta.url);
  for(const name of await readdir(source))assert.equal(await readFile(new URL(name,source),'utf8'),await readFile(new URL(name,runtime),'utf8'),name);
  for(const name of ['optics.js','hazards.js'])assert.equal(await readFile(new URL(`../../games/orbit-fall/${name}`,import.meta.url),'utf8'),await readFile(new URL(name,runtime),'utf8'));
});
