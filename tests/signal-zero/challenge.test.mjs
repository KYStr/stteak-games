import test from 'node:test';
import assert from 'node:assert/strict';
import {createRun,step,checkpointSnapshot,restoreRun} from '../../games/signal-zero/src/core.js';
import {LEVELS} from '../../games/signal-zero/src/levels.js';
import {defaultSave,validateSave} from '../../games/signal-zero/src/save.js';
import {traverseMission} from './controller.mjs';
test('standard idle loses visibly before 600 active seconds in every chapter; relaxed has no deadline',()=>{
 for(let chapter=0;chapter<6;chapter++){const r=createRun(chapter);for(let i=0;i<6000&&r.phase==='playing';i++)step(r,{},.1);assert.equal(r.phase,'caught');assert.ok(r.time<600);assert.match(r.lastFailure.reason,/追蹤/);const relaxed=createRun(chapter,null,undefined,'relaxed');for(let i=0;i<6000;i++)step(relaxed,{},.1);assert.equal(relaxed.phase,'playing');}
});
test('deadline/checkpoint, difficulty and seed survive validation and reload; old layout migrates safely',()=>{
 const r=createRun(2,null,9999);r.player.x=LEVELS[2].checkpoint.x;r.objectives=[LEVELS[2].terminals[0].id];r.time=71;r.traceRemaining=330;step(r,{});const s=defaultSave();s.unlocked=3;s.checkpoint=checkpointSnapshot(r);s.settings.difficulty='relaxed';const d=validateSave(s),restored=restoreRun(d.checkpoint);assert.equal(restored.seed,9999);assert.equal(restored.traceRemaining,r.checkpoint.traceRemaining);assert.equal(d.settings.difficulty,'relaxed');const time=restored.traceRemaining;restored.phase='paused';step(restored,{},.1);assert.equal(restored.traceRemaining,time);s.checkpoint.levelRevision=3;s.bests.archive={time:200,alerts:0,completions:1};const old=validateSave(s);assert.equal(old.activeLevel,2);assert.equal(old.checkpoint,null);assert.equal(old.bests.archive.time,200);
});
test('three strategies across six chapters and five arrival phases remain viable with a smooth curve',()=>{
 const results=[];for(let chapter=0;chapter<6;chapter++)for(const route of ['ground','upper','ghost'])for(const wait of [0,2,5,8,11]){const {run,toolUses,elevatedDistance}=traverseMission(chapter,route==='ground'?'ground':'upper',wait,route==='ghost',30);results.push({chapter,route,wait,phase:run.phase,time:run.time,alerts:run.alerts,remainingTrace:run.traceRemaining,tools:run.tools,uses:toolUses.length,elevatedDistance});}
 console.log('CHALLENGE_MATRIX '+JSON.stringify(results));const rates=LEVELS.map((_,i)=>{const rows=results.filter(r=>r.chapter===i);return rows.filter(r=>r.phase==='complete').length/rows.length;});assert.ok(rates.every(r=>r>=.8),JSON.stringify(rates));for(let i=1;i<6;i++)assert.ok(rates[i-1]-rates[i]<=.4);for(const route of ['ground','upper','ghost'])assert.ok(results.filter(r=>r.route===route&&r.phase==='complete').length>=24);
});
