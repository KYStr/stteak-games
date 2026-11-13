import test from 'node:test';
import assert from 'node:assert/strict';
import {approachFor,routeFor} from './flight.mjs';
import {createRun} from '../../public/games/orbit-fall/rules.js';
import {getCampaign} from '../../public/games/orbit-fall/content.js';
import {resolveRepair} from '../../public/games/orbit-fall/run-variants.js';

test('input controller can reach a clear interaction side for all seeded fixtures and phase transitions',t=>{
 let checked=0;
 for(const seed of [0,123,456,421,17,263]){const run=createRun('story',{seed});for(const room of getCampaign().rooms){const base=getCampaign().puzzles[room.puzzleId];if(!base)continue;let position={x:0,y:1.8,z:5};
 for(let phase=0;phase<base.phases.length;phase++){const p=resolveRepair(run,room.id,phase),devices=[];
 if(room.signalId)devices.push({id:'signal',position:[-5,0,3],range:3});
 const controls=p.type==='reflection'?p.mirrorPositions.map((position,index)=>({id:`mirror-${index}`,position,range:2.6})):p.type==='airlock'?p.valvePositions.map((position,index)=>({id:`valve-${index}`,position,range:2.5})):[];
 devices.push(...controls);if(p.requiresIsolation)devices.push({id:'power',position:p.powerPosition,range:2.5});const s={position,devices,roomId:room.id};if(p.type==='momentum'){for(const goal of [[p.crateStart[0],p.crateStart[1],p.crateStart[2]+1.8],[p.target[0],p.target[1],p.target[2]+1.3]]){assert.ok(routeFor(s,goal).length);s.position=position={x:goal[0],y:goal[1],z:goal[2]};checked++}}
 const order=p.type==='airlock'?p.sequence.map(i=>controls[i]):p.requiresIsolation?[devices.find(d=>d.id==='power'),...controls,devices.find(d=>d.id==='power')]:controls;
 for(const d of order){const a=approachFor(s,d);assert.ok(a.route.length);assert.ok(Math.hypot(...a.goal.map((n,i)=>n-d.position[i]))<d.range);position=s.position={x:a.goal[0],y:a.goal[1],z:a.goal[2]};checked++}
 if(p.requiresIsolation)assert.ok(routeFor(s,[0,1.8,6]).length);
 }} }
 assert.ok(checked>0);t.diagnostic(`${checked} fixture approaches validated`);
});

test('controller treats moving contact hazards separately from solid fixture reachability',async()=>{
 const {obstaclesFor}=await import('./flight.mjs');const s={position:{x:0,y:2,z:5},devices:[{id:'hazard',position:[0,3.5,-1],range:2}],roomId:'debris'};assert.deepEqual(obstaclesFor(s),[]);assert.deepEqual(routeFor(s,[0,2,-5]),[[0,2,-5]]);
});

test('device approaches stay inside range with a margin beyond flight tolerance',()=>{
 const s={position:{x:0,y:1.8,z:5},devices:[{id:'signal',position:[-5,0,3],range:3},{id:'mirror-0',position:[-2,2,0],range:2.6},{id:'mirror-1',position:[0,2,0],range:2.6}]};
 for(const d of s.devices){const {goal}=approachFor(s,d),distance=Math.hypot(...goal.map((v,i)=>v-d.position[i]));assert.ok(distance<=d.range-.25);for(const other of s.devices.filter(o=>o!==d)){const otherDistance=Math.hypot(...goal.map((v,i)=>v-other.position[i]));assert.ok(otherDistance>=other.range||otherDistance>=distance+.35)}}
});

test('precision steering settles the observed 0.125m console near miss in real physics',async()=>{
 const {steeringFor}=await import('./flight.mjs'),{PhysicsRoom,initializePhysics}=await import('../../public/games/orbit-fall/physics.js');await initializePhysics();
 const run=createRun('story',{seed:2474875763}),room=getCampaign().roomById['room-d2-airlock'],p=resolveRepair(run,room.id,2),physics=new PhysicsRoom(p,{player:[-1.4639992714,1.4830904007,.7427383661]},room),goal=[-1.4847,1.5,.8653],forward={x:-.4947370553,z:-.7256143478},fl=Math.hypot(forward.x,forward.z),fx=forward.x/fl,fz=forward.z/fl;let arrived=false;
 try{
  physics.player.setLinvel({x:0,y:-.36724478,z:0},true);physics.refreshSnapshots(true);
  for(let step=0;step<600;step+=6){const position=physics.playerPosition,velocity=physics.playerVelocity;if(Math.hypot(...goal.map((v,i)=>v-position[['x','y','z'][i]]))<.12&&Math.hypot(velocity.x,velocity.y,velocity.z)<.1){arrived=true;break}
   const wants=steeringFor({position,velocity,forward},goal,.12),side=Number(wants.has('d'))-Number(wants.has('a')),ahead=Number(wants.has('w'))-Number(wants.has('s'));let x=-fz*side+fx*ahead,z=fx*side+fz*ahead;const length=Math.hypot(x,z);if(length>1){x/=length;z/=length}const input={x,z,y:Number(wants.has('q'))-Number(wants.has('e')),brake:wants.has('Space')};for(let i=0;i<6;i++)physics.step(input);
  }
  assert.equal(arrived,true,JSON.stringify({position:physics.playerPosition,velocity:physics.playerVelocity,goal}));
 }finally{physics.dispose()}
});

test('console approach avoids sustained airflow instead of relaxing the stopping-speed assertion',async()=>{
 const s={position:{x:5.24,y:1.45,z:-1.11},roomId:'airflow',devices:[{id:'valve-0',position:[4,1.5,-2.65],range:2.5},{id:'valve-1',position:[-4,1.5,2],range:2.5},{id:'hazard',position:[7,2,-5],range:2}]},d=s.devices[0],a=approachFor(s,d);
 assert.ok(a.goal[0]<=3.8||a.goal[2]>=1.2,JSON.stringify(a));assert.ok(Math.hypot(...a.goal.map((v,i)=>v-d.position[i]))<=d.range-.25);
 const {PhysicsRoom,initializePhysics}=await import('../../public/games/orbit-fall/physics.js');await initializePhysics();const speedAt=point=>{const ph=new PhysicsRoom({type:'airlock',valvePositions:s.devices.filter(d=>d.id.startsWith('valve')).map(d=>d.position)},{player:point});try{for(let i=0;i<180;i++)ph.step({x:0,y:0,z:0,brake:true},{hazard:'leak'});return Math.hypot(ph.playerVelocity.x,ph.playerVelocity.y,ph.playerVelocity.z)}finally{ph.dispose()}};assert.ok(speedAt([5.24,1.45,-1.11])>.1,'old side cannot meet <0.1m/s using brake alone');assert.ok(speedAt(a.goal)<.1,'clean side supports the required stopping speed');
});

test('flight terminal predicate wins over the simultaneous intended result modal and releases held keys',async()=>{
 const {fly}=await import('./flight.mjs');
 const base={position:{x:0,y:2,z:5},velocity:{x:0,y:0,z:0},forward:{x:0,z:-1},devices:[{id:'signal',position:[0,0,2],range:3}],roomId:'test',elapsed:0,modal:null,longGaps:[],renderer:{renderCount:1},solvedPuzzles:[],phaseIndex:0};
 for(const terminal of [{modal:'result',status:'completed',solvedPuzzles:['intended']},{modal:null,status:'running',phaseIndex:1}]){let calls=0;const held=new Set(),downs=[];const page={evaluate:async()=>{calls++;return {...base,...(calls>=4?terminal:{}),elapsed:calls/10}},keyboard:{down:async key=>{held.add(key);downs.push(key)},up:async key=>held.delete(key)},waitForTimeout:async()=>{}};
 const result=await fly(page,[0,2,-5],{until:s=>s.solvedPuzzles.includes('intended')||s.phaseIndex===1});assert.equal(result.modal,terminal.modal);assert.equal(calls,4,'no subsequent waypoint after phase/repair completion');assert.equal(held.size,0);assert.ok(downs.length>0);
 }
});

test('flight rejects unintended result/failure modals and preserves structured collider diagnostics',async()=>{
 const {fly}=await import('./flight.mjs');for(const modal of ['result','failure']){const held=new Set(),state={position:{x:0,y:2,z:5},velocity:{x:0,y:0,z:0},forward:{x:0,z:-1},devices:[],roomId:'test',elapsed:0,modal,longGaps:[],solvedPuzzles:[]};const page={evaluate:async()=>state,keyboard:{down:async k=>held.add(k),up:async k=>held.delete(k)},screenshot:async()=>{},waitForTimeout:async()=>{}};await assert.rejects(()=>fly(page,[0,2,-5],{until:s=>s.solvedPuzzles.includes('intended')}),error=>{assert.match(error.stack,/Flight interrupted/);assert.equal(error.controllerDiagnostics.snapshot.modal,modal);assert.deepEqual(error.controllerDiagnostics.goal,[0,2,-5]);return true});assert.equal(held.size,0)}
});

test('exit staging remains outside the new optical power-console clearance',()=>{
 const run=createRun('story',{seed:123}),p=resolveRepair(run,'room-d3-work-3',0),devices=[{id:'power',position:p.powerPosition,range:2.5},...p.mirrorPositions.map((position,i)=>({id:`mirror-${i}`,position,range:2.6}))],s={position:{x:1.4940509796142578,y:1.528105616569519,z:2.5423011779785156},roomId:p.roomId,devices};
 assert.throws(()=>routeFor(s,[0,1.8,5]),/No clear route/);assert.ok(routeFor(s,[0,1.8,6]).length);
});

test('competent control approaches avoid live arc volumes and low debris-corridor stops',async()=>{
 const {unsafeControlAt}=await import('./flight.mjs');
 for(const s of [{position:{x:0,y:2,z:5},roomId:'optics',repair:{type:'reflection'},devices:[{id:'mirror-0',position:[0,1.5,-3],range:2.6},{id:'hazard',position:[0,1,-4],range:2}]},{position:{x:-4,y:2,z:3},roomId:'room-d3-airlock',repair:{type:'airlock'},devices:[{id:'valve-0',position:[-4,1.5,-3],range:2.5},{id:'hazard',position:[0,3.5,-1],range:2}]}]){const a=approachFor(s,s.devices[0]);assert.equal(unsafeControlAt(s,a.goal),false);assert.ok(Math.hypot(...a.goal.map((n,i)=>n-s.devices[0].position[i]))<s.devices[0].range)}
});

test('controller watchdog pauses only through the visible control after missing heartbeats',async()=>{
 const {controllerWatchdog}=await import('./controller-watchdog.mjs'),vm=await import('node:vm');let now=0,tick,clicks=0;const overlay={hidden:true},run={status:'running',modal:null,health:100,oxygen:100,elapsed:42},window={__orbitDiagnostics:{snapshot:()=>({...run})}},button={click(){clicks++;overlay.hidden=false}};
 const box=vm.createContext({window,performance:{now:()=>now},document:{querySelector:id=>id==='#overlay'?overlay:button},setInterval:fn=>tick=fn});vm.runInContext('('+controllerWatchdog.toString()+')()',box);now=1400;tick();assert.equal(clicks,0);window.testControllerHeartbeat();now=2500;tick();assert.equal(clicks,0);now=3100;tick();assert.equal(clicks,1);assert.equal(window.testControllerWatchdog.paused,true);assert.equal(window.testControllerWatchdog.events[0].reason,'controller-delay');assert.deepEqual(run,{status:'running',modal:null,health:100,oxygen:100,elapsed:42});now=9000;tick();assert.equal(clicks,1);overlay.hidden=true;window.testControllerHeartbeat();run.status='completed';now=12000;tick();assert.equal(clicks,1);
});
