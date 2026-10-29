import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';

// Exact production declarations, installed pad handlers, callbacks and lifecycle
// functions. DOM geometry/capture/audio are explicit CPU substitutes, not touch QA.
function harness(mode='playing'){
 const source=readFileSync(new URL('../../../games/dust-redemption/game.js',import.meta.url),'utf8');
 function section(start,end){assert.equal(source.split(start).length,2,`unique ${start}`);const i=source.indexOf(start),j=source.indexOf(end,i);assert.ok(j>i);return source.slice(i,j)}
 const classes=()=>{const s=new Set(['hidden']);return{add:k=>s.add(k),remove:k=>s.delete(k),contains:k=>s.has(k),toggle(k,v){if(v)s.add(k);else s.delete(k)}}};
 const pads=new Map(['move-pad','aim-pad'].map(name=>{
  const el=new EventTarget(),nub={style:{}},capture=new Set(),callbacks=new Map();el.addEventListener=(type,fn)=>{const all=callbacks.get(type)||[];all.push(fn);callbacks.set(type,all)};el.emit=e=>{for(const fn of callbacks.get(e.type)||[])fn(e)};el.capture=capture;el.released=[];el.throwCapture=false;el.throwRelease=false;el.onRelease=null;
  el.getBoundingClientRect=()=>({left:8,top:14,width:100,height:100});el.querySelector=()=>nub;el.nub=nub;
  el.setPointerCapture=id=>{if(el.throwCapture)throw Error('inactive pointer');capture.add(id)};
  el.hasPointerCapture=id=>capture.has(id);
  el.releasePointerCapture=id=>{el.released.push(id);capture.delete(id);if(el.throwRelease)throw Error('capture ended outside');const e=new Event('lostpointercapture');Object.assign(e,{pointerId:id});el.emit(e);el.onRelease?.()};
  return[name,el];
 }));
 const window=new EventTarget(),listeners={},add=window.addEventListener.bind(window);window.addEventListener=(type,fn)=>{listeners[type]=fn;add(type,fn)};
 const audioCalls={unlock:0,pause:0,resume:0},states=[];
 const context={mode,window,document:{hidden:false,body:{classList:classes()}},foreground:true,lastTime:10,previousMode:null,pauseReturn:null,profile:{activeRun:null},run:{},mouseActive:true,keys:new Set(['KeyD']),firing:true,aiming:false,joystick:{x:0,y:0},touchAim:{x:0,y:-1},$:id=>pads.get(id),overlay:{innerHTML:'original',classList:classes(),querySelector:()=>({focus(){}})},canvas:{focus(){}},audio:{unlock(){audioCalls.unlock++},pause(){audioCalls.pause++},resume(){audioCalls.resume++}},bridge:{state:s=>states.push(s)},queueMicrotask:fn=>fn(),showHub(){context.mode='hub'},interact(){},reloadWeapon(){},vault(){},useItem(){},world:{rotate(){}},console};
 vm.createContext(context);
 const code=section('let mouseActive = false;','let shuttingDown = false;')+section('function button(','function toast(')+section('function closeSheet() {','function failure(')+section('function bindPad(', '$("touch-fire").addEventListener')+section('window.addEventListener("keydown",','function syncMouseButtons(')+section('window.addEventListener("blur",','window.addEventListener("focus",');
 vm.runInContext(code+'\nglobalThis.padSnapshot=()=>({x:joystick.x,y:joystick.y,aiming,touchX:touchAim.x,touchY:touchAim.y,clearing:typeof clearingInputs===\'undefined\'?false:clearingInputs});',context);
 const send=(name,type,id,x=96,y=64)=>{const e=new Event(type,{cancelable:true});Object.assign(e,{pointerId:id,clientX:x,clientY:y});const pad=pads.get(name);pad.emit(e);if(type==='pointerup'||type==='pointercancel')pad.capture.delete(id)};
 const key=(repeat=false)=>listeners.keydown({code:'Escape',repeat,target:{tagName:'CANVAS'},preventDefault(){}});
 return{pads,context,audioCalls,states,send,key,state:()=>context.padSnapshot(),clear:()=>context.clearInputs(),blur:()=>window.dispatchEvent(new Event('blur'))};
}
const sample=(h,name)=>name==='move-pad'?h.state().x:h.state().touchX;
const active=(h,name)=>name==='move-pad'?h.state().x!==0:h.state().aiming;
const neutral=(h,name)=>{if(name==='move-pad'){assert.equal(h.state().x,0);assert.equal(h.state().y,0)}else assert.equal(h.state().aiming,false)};
for(const name of ['move-pad','aim-pad'])for(const mode of ['playing','town-walk'])test(`${name}/${mode}: second pointer cannot hijack first owner`,()=>{
 const h=harness(mode);h.send(name,'pointerdown',7);assert.equal(sample(h,name),1);h.send(name,'pointerdown',8,20,64);assert.equal(sample(h,name),1);assert.deepEqual([...h.pads.get(name).capture],[7]);h.send(name,'pointermove',8,20,64);assert.equal(sample(h,name),1);
});
for(const name of ['move-pad','aim-pad'])for(const end of ['pointerup','pointercancel','lostpointercapture'])test(`${name}: non-owner ${end} cannot clear active gesture`,()=>{
 const h=harness();h.send(name,'pointerdown',7);h.send(name,end,8);assert.equal(active(h,name),true);assert.equal(sample(h,name),1);
});
for(const name of ['move-pad','aim-pad'])for(const end of ['pointerup','pointercancel','lostpointercapture'])test(`${name}: owner ${end} clears and fresh pointer can take over`,()=>{
 const h=harness();h.send(name,'pointerdown',7);h.send(name,end,7);neutral(h,name);h.send(name,'pointerdown',8,20,64);assert.equal(sample(h,name),-1);h.send(name,'lostpointercapture',7);assert.equal(sample(h,name),-1);assert.equal(active(h,name),true);
});
for(const name of ['move-pad','aim-pad'])test(`${name}: clear invalidates held pointer; old move stays neutral and fresh works`,()=>{
 const h=harness();h.send(name,'pointerdown',7);h.clear();neutral(h,name);assert.deepEqual(h.pads.get(name).released,[7]);h.send(name,'pointermove',7,20,64);neutral(h,name);h.send(name,'pointerdown',8,20,64);assert.equal(sample(h,name),-1);h.send(name,'pointerup',7);assert.equal(sample(h,name),-1);
});
for(const name of ['move-pad','aim-pad'])for(const mode of ['paused','help','field'])test(`${name}: ${mode} rejects stale moves and new down`,()=>{
 const h=harness();h.send(name,'pointerdown',7);h.context.mode=mode;h.send(name,'pointermove',7,20,64);assert.equal(sample(h,name),1);h.clear();h.send(name,'pointerdown',8,20,64);neutral(h,name);h.context.mode='playing';h.send(name,'pointermove',7,20,64);neutral(h,name);h.send(name,'pointerdown',8,20,64);assert.equal(sample(h,name),-1);
});
for(const name of ['move-pad','aim-pad'])test(`${name}: capture exception cannot install a fake owner`,()=>{
 const h=harness(),pad=h.pads.get(name);pad.throwCapture=true;h.send(name,'pointerdown',7);neutral(h,name);pad.throwCapture=false;h.send(name,'pointerdown',8,20,64);assert.equal(sample(h,name),-1);assert.deepEqual([...pad.capture],[8]);
});
for(const name of ['move-pad','aim-pad'])test(`${name}: release exception still leaves neutral input and reusable owner`,()=>{
 const h=harness(),pad=h.pads.get(name);h.send(name,'pointerdown',7);pad.throwRelease=true;assert.doesNotThrow(()=>h.clear());neutral(h,name);assert.equal(h.state().clearing,false);pad.throwRelease=false;h.send(name,'pointerdown',8,20,64);assert.equal(sample(h,name),-1);
});
for(const name of ['move-pad','aim-pad'])test(`${name}: capture-release reentrancy cannot claim an input during clear`,()=>{
 const h=harness(),pad=h.pads.get(name);h.send(name,'pointerdown',7);pad.onRelease=()=>{h.clear();h.send(name,'pointerdown',8,20,64)};h.clear();neutral(h,name);assert.equal(h.state().clearing,false);assert.deepEqual([...pad.capture],[]);pad.onRelease=null;h.send(name,'pointerdown',8,20,64);assert.equal(sample(h,name),-1);
});
test('clear releases only recorded capture owners on both pads, once',()=>{
 const h=harness();h.pads.get('move-pad').capture.add(44);h.send('move-pad','pointerdown',7);h.send('aim-pad','pointerdown',8,20,64);h.clear();h.clear();neutral(h,'move-pad');neutral(h,'aim-pad');assert.deepEqual(h.pads.get('move-pad').released,[7]);assert.deepEqual(h.pads.get('aim-pad').released,[8]);assert.deepEqual([...h.pads.get('move-pad').capture],[44]);
});
test('actual Escape pause/resume clears both pad owners and requires fresh down',()=>{
 const h=harness();h.send('move-pad','pointerdown',7);h.send('aim-pad','pointerdown',8);h.key();assert.equal(h.context.mode,'paused');neutral(h,'move-pad');neutral(h,'aim-pad');h.send('move-pad','pointermove',7,20,64);h.send('aim-pad','pointermove',8,20,64);neutral(h,'move-pad');neutral(h,'aim-pad');h.key(true);assert.equal(h.context.mode,'paused');h.key();assert.equal(h.context.mode,'playing');h.send('move-pad','pointermove',7,20,64);neutral(h,'move-pad');h.send('move-pad','pointerdown',9,20,64);assert.equal(h.state().x,-1);assert.deepEqual(h.states,['paused','running']);
});
test('real production blur clears both pad captures without reviving old pointers',()=>{
 const h=harness();h.send('move-pad','pointerdown',7);h.send('aim-pad','pointerdown',8);h.blur();assert.equal(h.context.mode,'paused');neutral(h,'move-pad');neutral(h,'aim-pad');assert.deepEqual(h.pads.get('move-pad').released,[7]);assert.deepEqual(h.pads.get('aim-pad').released,[8]);h.key();h.send('aim-pad','pointermove',8,20,64);neutral(h,'aim-pad');h.send('aim-pad','pointerdown',9,20,64);assert.equal(h.state().touchX,-1);
});
for(const [x,y,ex,ey] of [[58,64,0,0],[96,64,1,0],[20,64,-1,0],[58,26,0,-1],[58,102,0,1],[134,140,Math.SQRT1_2,Math.SQRT1_2]])test(`move pad retains 0.38 radius/normalization at ${x},${y}`,()=>{
 const h=harness();h.send('move-pad','pointerdown',7,x,y);assert.ok(Math.abs(h.state().x-ex)<1e-12);assert.ok(Math.abs(h.state().y-ey)<1e-12);
});
for(const [x,y,ex,ey] of [[96,64,1,0],[20,64,-1,0],[58,26,0,-1],[58,102,0,1],[134,140,Math.SQRT1_2,Math.SQRT1_2]])test(`aim pad retains original heading at ${x},${y}`,()=>{
 const h=harness();h.send('aim-pad','pointerdown',7,x,y);assert.ok(Math.abs(h.state().touchX-ex)<1e-12);assert.ok(Math.abs(h.state().touchY-ey)<1e-12);assert.equal(h.state().aiming,true);h.clear();assert.equal(h.state().aiming,false);assert.ok(Math.abs(h.state().touchX-ex)<1e-12);assert.ok(Math.abs(h.state().touchY-ey)<1e-12);
});
test('aim deadzone retains last heading and existing aiming behavior',()=>{
 const h=harness();h.send('aim-pad','pointerdown',7);h.send('aim-pad','pointermove',7,58,64);assert.equal(h.state().touchX,1);assert.equal(h.state().touchY,0);assert.equal(h.state().aiming,true);h.send('aim-pad','pointerup',7);assert.equal(h.state().aiming,false);assert.equal(h.state().touchX,1);
});
