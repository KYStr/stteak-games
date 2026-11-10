import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile,readdir} from 'node:fs/promises';
import {defaultSave,validateSave} from '../../games/signal-zero/src/save.js';
import {createRun,step,restoreRun,checkpointSnapshot} from '../../games/signal-zero/src/core.js';
import {LEVELS} from '../../games/signal-zero/src/levels.js';

test('Escape is reserved through untrusted saved bindings',()=>{
 const s=defaultSave();s.settings.bindings.left='Escape';s.settings.bindings.pause='KeyZ';
 const validated=validateSave(s);assert.equal(validated.settings.bindings.pause,'Escape');assert.equal(validated.settings.bindings.left,'KeyA');
});
test('mute and system reduced motion survive save validation',()=>{
 const s=defaultSave();s.settings.muted=true;s.settings.reducedMotion=true;
 assert.equal(validateSave(s).settings.muted,true);assert.equal(validateSave(s).settings.reducedMotion,true);
});
test('guards turn at physical cargo instead of staying jammed',()=>{
 const run=createRun(0),guard=run.devices.find(d=>d.type==='guard');
 guard.x=27.7;guard.dir=1;run.player.x=3;run.player.crouched=true;
 for(let n=0;n<60;n++)step(run,{},1/60);
 assert.equal(guard.dir,-1);assert.ok(guard.x<27.7);
});
test('each chapter has an early checkpoint and four bounded recovery points',()=>{
 for(let index=0;index<6;index++){
  const level=LEVELS[index];assert.equal(level.checkpoints.length,4);assert.ok(level.checkpoints[0].x<60);
  const run=createRun(index);run.devices=[];run.objectives=[level.terminals[0].id];run.player.x=level.checkpoints[0].x;step(run,{});
  assert.ok(run.checkpoint);assert.equal(restoreRun(checkpointSnapshot(run)).player.x,level.checkpoints[0].x);
 }
});
test('build reproduces runtime and resolves every Three import locally',async()=>{
 for(const file of await readdir(new URL('../../games/signal-zero/src/',import.meta.url))){
  const source=(await readFile(new URL('../../games/signal-zero/src/'+file,import.meta.url),'utf8')).replace(/\r\n/g,'\n').replace(/from 'three'/g,"from './vendor/three.module.js'").replace(/from 'three\/addons\/utils\/BufferGeometryUtils.js'/g,"from './vendor/BufferGeometryUtils.js'");
  assert.equal(await readFile(new URL('../../public/games/signal-zero/'+file,import.meta.url),'utf8'),source,file);
 }
});

test('clearing input releases native pointer capture as well as held actions',async()=>{
 const {Input}=await import('../../games/signal-zero/src/input.js');
 const button=new EventTarget(),captures=new Set();button.dataset={input:'right'};
 button.classList={add(){},remove(){}};button.setPointerCapture=id=>captures.add(id);
 button.hasPointerCapture=id=>captures.has(id);button.releasePointerCapture=id=>captures.delete(id);
 globalThis.window=new EventTarget();globalThis.document={querySelectorAll:()=>[button]};
 const input=new Input({},()=>{},()=>{});input.enabled=true;
 try{const e=new Event('pointerdown',{cancelable:true});Object.assign(e,{pointerId:7});button.dispatchEvent(e);assert.equal(input.read().axis,1);assert.ok(captures.has(7));input.clear();assert.equal(captures.size,0);assert.equal(input.read().axis,0)}finally{input.dispose();delete globalThis.window;delete globalThis.document}
});
