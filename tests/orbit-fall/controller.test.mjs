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
 devices.push(...controls);const s={position,devices,roomId:room.id};if(p.type==='momentum'){for(const goal of [[p.crateStart[0],p.crateStart[1],p.crateStart[2]+1.8],[p.target[0],p.target[1],p.target[2]+1.3]]){assert.ok(routeFor(s,goal).length);s.position=position={x:goal[0],y:goal[1],z:goal[2]};checked++}}
 const order=p.type==='airlock'?p.sequence.map(i=>controls[i]):controls;
 for(const d of order){const a=approachFor(s,d);assert.ok(a.route.length);assert.ok(Math.hypot(...a.goal.map((n,i)=>n-d.position[i]))<d.range);position=s.position={x:a.goal[0],y:a.goal[1],z:a.goal[2]};checked++}
 }} }
 assert.ok(checked>0);t.diagnostic(`${checked} fixture approaches validated`);
});
