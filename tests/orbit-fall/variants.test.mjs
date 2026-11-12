import test from 'node:test';
import assert from 'node:assert/strict';
import {getCampaign} from '../../public/games/orbit-fall/content.js';
import {createRun,getProgress,enterRoom,solvePuzzle,refreshUnlocks,recordChallenge,startChallenge,storeSnapshot} from '../../public/games/orbit-fall/rules.js';
import {variantFor,resolveRepair,xorshift32,challengeRecordKey} from '../../public/games/orbit-fall/run-variants.js';
import {traceOptics} from '../../public/games/orbit-fall/optics.js';
import {sanitizeRun} from '../../public/games/orbit-fall/storage.js';
import {encodePlayerBackup,decodePlayerBackup} from '../../public/games/orbit-fall/player-backup.js';

test('expanded campaign has 24 rooms, eighteen multicycle repairs and data-derived unlocks',()=>{
 const c=getCampaign(),r=createRun('story',{seed:123});r.tools=['thruster','boots','tether'];
 assert.equal(c.rooms.length,24);assert.equal(c.requiredPuzzleIds.length,18);
 for(const d of c.decks){assert.equal(d.puzzleIds.length,6);assert.equal(c.rooms.filter(r=>r.deck===d.id).length,8);for(const id of d.puzzleIds){const p=c.puzzles[id];assert.ok(p.phases.length>=3);enterRoom(r,p.roomId);solvePuzzle(r,id)}}
 assert.equal(getProgress(r).canFinish,true);assert.equal(getProgress(r).requiredCount,18);
});
test('all seeded phase geometry is bounded, deterministic and optically solvable',()=>{
 const hashes=new Set();for(const seed of [0,1,123,456,4294967295]){const r=createRun('story',{seed}),layouts=[];
 for(const room of getCampaign().rooms){const base=getCampaign().puzzles[room.puzzleId];if(!base)continue;for(let i=0;i<base.phases.length;i++){const p=resolveRepair(r,room.id,i);assert.deepEqual(p,resolveRepair(r,room.id,i));layouts.push(p);
 const points=p.type==='reflection'?p.mirrorPositions:p.type==='airlock'?p.valvePositions:[p.crateStart,p.target];for(const point of points){assert.ok(Math.abs(point[0])<=7&&point[1]>=.75&&point[1]<=7.25&&Math.abs(point[2])<=7)}
 if(p.type==='reflection')assert.equal(traceOptics(p,p.targetAngles).powered,true,`${seed} ${room.id} phase ${i}`);
 }}hashes.add(JSON.stringify(layouts));}assert.equal(hashes.size,5);assert.deepEqual(variantFor(123,'room-d1-cargo'),variantFor(123,'room-d1-cargo'));assert.notDeepEqual(variantFor(123,'room-d1-cargo'),variantFor(456,'room-d1-cargo'));const a=xorshift32(0),b=xorshift32(0);for(let i=0;i<100;i++)assert.equal(a(),b());
});
test('schema two completion stays legacy; phase, object and route identities survive save and backup',()=>{
 const old=getCampaign(1),legacy=sanitizeRun({schema:2,solvedPuzzles:old.requiredPuzzleIds,endings:['beacon'],roomId:'room-d3-signal',status:'completed'});assert.equal(legacy.campaignVersion,1);assert.equal(legacy.seed,0);assert.equal(getProgress(legacy).canFinish,true);assert.deepEqual(legacy.unlockedDecks,[1,2,3]);
 const r=createRun('story',{seed:456});r.roomId='room-d1-cargo';storeSnapshot(r,r.roomId,{phaseIndex:1,activeObjectId:'crate-cell-2',route:'bypass',bypass:true,railIndex:1,player:[1,2,3],objects:[{id:'crate-cell-2',position:[-2,4,1]}]});const clean=sanitizeRun(r),backup=decodePlayerBackup(encodePlayerBackup(r,'orbit-fall-0019')).run;assert.deepEqual(backup,clean);assert.equal(backup.snapshots[r.roomId].phaseIndex,1);assert.equal(backup.snapshots[r.roomId].bypass,true);assert.deepEqual(resolveRepair(backup,r.roomId,1),resolveRepair(r,r.roomId,1));
});
test('challenge records separate difficulty, seed and variant from legacy records',()=>{const story=createRun();story.endings=['beacon'];for(const seed of [123,456])for(const mode of ['story','standard']){const r=startChallenge('challenge-cargo',story,{seed,mode}).run;r.status='completed';r.result={type:'challenge'};r.elapsed=70;recordChallenge(story,r);assert.equal(story.challengeRecords[challengeRecordKey(r)].elapsed,70)}assert.equal(Object.keys(sanitizeRun(story).challengeRecords).length,4)});

test('pressure interlocks reject unsafe operations and never open both chambers',async()=>{const {pressureState,operatePressure}=await import('../../public/games/orbit-fall/pressure.js');for(const seed of [123,456]){const r=createRun('story',{seed}),p=resolveRepair(r,'room-d2-airlock',0),sequence=[];assert.equal(operatePressure(p,sequence,1).ok,false);assert.equal(operatePressure(p,sequence,2).ok,false);for(const index of p.sequence){assert.equal(operatePressure(p,sequence,index).ok,true);const s=pressureState(sequence);assert.equal(s.outerOpen&&s.innerOpen,false)}assert.equal(pressureState(sequence).innerOpen,true)}});

test('mixed relay preserves dormant cargo while pressure/optics are active',async()=>{const {PhysicsRoom,initializePhysics}=await import('../../public/games/orbit-fall/physics.js');await initializePhysics();const run=createRun('story',{seed:123}),roomId='room-d1-work-6',p=resolveRepair(run,roomId,1),objects=[{id:'crate-cell-1',position:[3,4,-2],rotation:[0,0,0,1]},{id:'crate-cell-4',position:[-4,2,3],rotation:[0,0,0,1]}],physics=new PhysicsRoom(p,{objects},getCampaign().roomById[roomId]);try{assert.deepEqual(physics.snapshot().objects,objects)}finally{physics.dispose()}});

test('every expanded repair resets locally while retaining all permanent progress',async()=>{const {resetPuzzle}=await import('../../public/games/orbit-fall/rules.js');const c=getCampaign(),r=createRun('story',{seed:123});r.tools=['thruster','boots','tether'];r.solvedPuzzles=[...c.requiredPuzzleIds];refreshUnlocks(r);for(const id of c.requiredPuzzleIds){r.roomId=c.puzzles[id].roomId;storeSnapshot(r,r.roomId,{phaseIndex:1,angles:[2,3,4],sequence:[0],objects:[{id:'crate-cell-1',position:[3,4,1]}]});assert.equal(resetPuzzle(r,id).ok,true);assert.equal(r.snapshots[r.roomId],undefined);assert.deepEqual(r.solvedPuzzles,c.requiredPuzzleIds)}});

test('reused docking label layout holds its chosen side across tiny contact motion',async()=>{const {placeRuntimeMarkers}=await import('../../public/games/orbit-fall/marker-layout.js');const crate={x:640,anchorX:640.01,y:300,width:80,height:24,hidden:false},target={x:640,anchorX:640,y:300,width:80,height:24,hidden:false};const items=[crate,target];placeRuntimeMarkers(items,1280);const first=target.x;crate.anchorX=639.99;placeRuntimeMarkers(items,1280);assert.ok(Math.abs(target.x-first)<1);assert.ok(Math.abs(target.x-crate.x)>=88);crate.anchorX=400;placeRuntimeMarkers(items,1280);assert.equal(target.x,target.anchorX)});

test('seeded pressure consoles and recording consoles occupy separate physical volumes',()=>{for(const seed of [0,123,456,421,17,263]){const r=createRun('story',{seed});for(const room of getCampaign().rooms){const base=getCampaign().puzzles[room.puzzleId];if(!base)continue;for(let i=0;i<base.phases.length;i++){const p=resolveRepair(r,room.id,i);if(p.type!=='airlock')continue;const centers=p.valvePositions.map(v=>[v[0],v[1]-.5,v[2]]);if(room.signalId)centers.push([-5,1.05,3]);for(let a=0;a<centers.length;a++)for(let b=a+1;b<centers.length;b++)assert.ok(Math.abs(centers[a][0]-centers[b][0])>=1.56||Math.abs(centers[a][1]-centers[b][1])>=2.1||Math.abs(centers[a][2]-centers[b][2])>=1.1,`${seed} ${room.id} ${i} consoles ${a}/${b}`)}}}});

test('navigation codes are unique and sequential in each campaign, preserving room IDs',()=>{
 for(const version of [1,2]){const campaign=getCampaign(version),labels=campaign.rooms.map(room=>room.name.split(' · ')[0]);assert.equal(new Set(labels).size,campaign.rooms.length);for(const deck of campaign.decks)assert.deepEqual(campaign.rooms.filter(r=>r.deck===deck.id).map(r=>r.name.split(' · ')[0]),Array.from({length:version===1?4:8},(_,i)=>'ABC'[deck.id-1]+(i+1)))}
 for(const room of getCampaign(1).rooms)assert.ok(getCampaign(2).roomById[room.id]);
});

test('physics snapshots reuse numeric storage and remain current after each fixed step',async()=>{
 const {PhysicsRoom,initializePhysics}=await import('../../public/games/orbit-fall/physics.js');await initializePhysics();const run=createRun('story',{seed:123}),room=getCampaign().roomById['room-d1-cargo'],physics=new PhysicsRoom(resolveRepair(run,room.id,0),null,room);
 try{const position=physics.playerPosition,velocity=physics.playerVelocity,crate=physics.cratePosition;for(let i=0;i<60;i++)physics.step({x:1,y:0,z:0,brake:false});assert.equal(physics.playerPosition,position);assert.equal(physics.playerVelocity,velocity);assert.equal(physics.cratePosition,crate);assert.deepEqual(position,{...physics.player.translation()});assert.deepEqual(velocity,{...physics.player.linvel()});assert.deepEqual(crate,{...physics.crate.translation()});assert.ok(position.x>0)}finally{physics.dispose()}
});

test('tethering a crate behind the suit cannot push a braking player; release restores contact',async()=>{
 const {PhysicsRoom,initializePhysics}=await import('../../public/games/orbit-fall/physics.js');await initializePhysics();
 const puzzle={type:'momentum',crateStart:[0,2,1.7],target:[6,2,-5]},physics=new PhysicsRoom(puzzle,{player:[0,2,0]});
 try{assert.equal(physics.tether(),'attached');for(let i=0;i<300;i++)physics.step({x:0,y:0,z:0,brake:true});assert.ok(Math.hypot(physics.playerPosition.x,physics.playerPosition.y-2,physics.playerPosition.z)<.02);assert.ok(physics.cratePosition.z<-.9,'crate settles on tow point without pushing the suit');assert.equal(physics.crateCollider.collisionGroups(),0x0002fffe);assert.equal(physics.tether(),'released');physics.step({x:0,y:0,z:0,brake:true});assert.equal(physics.crateCollider.collisionGroups(),0x0002ffff)}finally{physics.dispose()}
});

test('upper freight rail lifts the load clear of waiting cells before crossing',async()=>{
 const {PhysicsRoom,initializePhysics}=await import('../../public/games/orbit-fall/physics.js');await initializePhysics();const run=createRun('story',{seed:123});
 for(let phase=0;phase<3;phase++){const p=resolveRepair(run,'room-d2-cargo',phase),physics=new PhysicsRoom(p,{player:p.railStartPosition},getCampaign().roomById[p.roomId]);
  try{for(let node=0;node<3;node++){physics.rail(node);let reached=false;for(let step=0;step<1800;step++){physics.step({x:0,y:0,z:0,brake:true});const pos=physics.playerPosition,goal=p.railPoints[node];if(Math.hypot(pos.x-goal[0],pos.y-goal[1],pos.z-goal[2])<.05){reached=true;break}}assert.equal(reached,true,`phase ${phase} rail ${node} reachable`)}
   for(const o of physics.objects.filter(o=>o.body!==physics.crate)){const start=p.objects.find(p=>p.id===o.id).start;assert.ok(Math.hypot(...start.map((v,i)=>v-o.position[['x','y','z'][i]]))<.05,`waiting ${o.id} stays on its work point`)}
  }finally{physics.dispose()}
 }
});
