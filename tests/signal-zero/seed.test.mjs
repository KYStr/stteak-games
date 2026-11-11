import test from 'node:test';
import assert from 'node:assert/strict';
import {createRun,resolveEncounter,step,checkpointSnapshot,restoreRun} from '../../games/signal-zero/src/core.js';
import {LEVELS} from '../../games/signal-zero/src/levels.js';
import {defaultSave,recordCompletion,validateSave} from '../../games/signal-zero/src/save.js';
import {traverseMission} from './controller.mjs';
test('encounters vary reproducibly by uint32 seed; checkpoints restore phase and position',()=>{
 for(let i=0;i<6;i++){const a=resolveEncounter(LEVELS[i],1009),b=resolveEncounter(LEVELS[i],9999);assert.deepEqual(a,resolveEncounter(LEVELS[i],1009));assert.ok(a.filter((d,n)=>d.phase!==b[n].phase||d.x!==b[n].x||d.dir!==b[n].dir).length>=3);const r=createRun(i,null,9999);r.player.x=LEVELS[i].checkpoint.x;r.objectives=[LEVELS[i].terminals[0].id];step(r,{},.1);const restored=restoreRun(checkpointSnapshot(r));assert.equal(restored.seed,9999);assert.deepEqual(restored.devices.map(d=>[d.id,d.phase,d.x,d.dir]),r.checkpoint.devices.map(d=>[d.id,d.phase,d.x,d.dir]));}
});
test('records distinguish seeds and difficulty while aggregate standard medals persist',()=>{
 const r=createRun(0,null,9999);r.phase='complete';r.objectives=LEVELS[0].terminals.map(t=>t.id);r.time=245;let s=recordCompletion(defaultSave(),r);assert.ok(s.variantBests['antenna:standard:9999']);r.difficulty='relaxed';r.time=1;s=validateSave(recordCompletion(s,r));assert.equal(s.bests.antenna.time,245);assert.equal(s.relaxedBests['antenna:relaxed:9999'].time,1);assert.ok(s.medals.antenna.ghost);
});
test('twelve seeds preserve competent finite-tool reachability in all chapters',()=>{
 const seeds=(process.env.SIGNAL_ZERO_SEEDS||'1009,9999,2001,2002,2003,2004,2005,2006,2007,2008,2009,2010').split(',').map(Number),results=[];for(const seed of seeds)for(let chapter=0;chapter<6;chapter++){const {run}=traverseMission(chapter,'upper',0,true,30,seed);results.push({seed,chapter,phase:run.phase,alerts:run.alerts,time:run.time,tools:run.tools});}console.log('SEED_MATRIX '+JSON.stringify(results));const rates=LEVELS.map((_,i)=>results.filter(r=>r.chapter===i&&r.phase==='complete').length/seeds.length);assert.ok(rates.every(r=>r>=.8),JSON.stringify(rates));for(let i=1;i<6;i++)assert.ok(rates[i-1]-rates[i]<=.4);
});
