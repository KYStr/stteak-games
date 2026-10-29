import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';

// Real installed production handlers and lifecycle bodies, invoked with explicit
// DOM/capture/audio substitutes. No browser, shot simulation or device claim.
function harness(mode='playing'){
 const source=readFileSync(new URL('../../../games/dust-redemption/game.js',import.meta.url),'utf8');
 function section(a,b){assert.equal(source.split(a).length,2,`unique ${a}`);const i=source.indexOf(a),j=source.indexOf(b,i);assert.ok(j>i);return source.slice(i,j)}
 const nodes=new Map();function node(id){if(!nodes.has(id)){const handlers=new Map(),capture=new Set(),nub={style:{}},classes=new Set(['hidden']);const n={id,handlers,capture,released:[],throwCapture:false,throwRelease:false,onRelease:null,style:{},innerHTML:'original',classList:{add:k=>classes.add(k),remove:k=>classes.delete(k),contains:k=>classes.has(k),toggle(k,v){if(v)classes.add(k);else classes.delete(k)}},querySelector:selector=>selector==='i'?nub:{focus(){}},focus(){},getBoundingClientRect:()=>({left:0,top:0,width:100,height:100}),addEventListener(t,fn){const all=handlers.get(t)||[];all.push(fn);handlers.set(t,all)},setPointerCapture(pid){if(n.throwCapture)throw Error('capture unavailable');capture.add(pid)},hasPointerCapture:pid=>capture.has(pid),releasePointerCapture(pid){n.released.push(pid);capture.delete(pid);if(n.throwRelease)throw Error('capture ended');emit(n,'lostpointercapture',{pointerId:pid});n.onRelease?.()}};nodes.set(id,n)}return nodes.get(id)}
 const calls={unlock:0,resume:0,pause:0,vault:0,states:[]};
 const context={mode,document:{hidden:false,body:{classList:node('body').classList}},window:node('window'),canvas:node('canvas'),overlay:node('overlay'),$:node,keys:new Set(),firing:false,aiming:false,joystick:{x:0,y:0},touchAim:{x:0,y:-1},mouseActive:false,pointerPosition:{x:0,y:0},aimPoint:{copy(){}},audio:{unlock(){calls.unlock++},resume(){calls.resume++},pause(){calls.pause++}},world:{aim:()=>null,rotate(){}},bridge:{state:s=>calls.states.push(s)},profile:{activeRun:null},run:{},previousMode:null,pauseReturn:null,lastTime:1,foreground:true,queueMicrotask:fn=>fn(),showHub(){context.mode='hub'},interact(){},reloadWeapon(){},vault(){calls.vault++},useItem(){},console};
 function emit(n,type,options={}){const e={pointerId:1,pointerType:n.id==='canvas'||n.id==='window'?'mouse':'touch',buttons:0,clientX:88,clientY:50,currentTarget:n,target:{tagName:'CANVAS'},code:'',repeat:false,preventDefault(){},...options};for(const fn of n.handlers.get(type)||[])fn(e);if(type==='pointerup'||type==='pointercancel')n.capture.delete(e.pointerId)}
 vm.createContext(context);vm.runInContext(section('let mouseActive = false;','let shuttingDown = false;')+section('function button(','function toast(')+section('function closeSheet() {','function failure(')+section('function bindPad(', '$("touch-interact").onclick')+section('window.addEventListener("keydown",','function bindPad(')+section('window.addEventListener("blur",','window.addEventListener("focus",'),context);
 return{context,calls,node,send:(id,type,options)=>emit(node(id),type,options),fireDown:pid=>emit(node('touch-fire'),'pointerdown',{pointerId:pid}),fireEnd:(pid,type='pointerup')=>emit(node('touch-fire'),type,{pointerId:pid}),mouseDown:buttons=>emit(node('canvas'),'pointerdown',{buttons}),mouseMove:(buttons,pointerType='mouse')=>emit(node('canvas'),'pointermove',{buttons,pointerType}),mouseUp:buttons=>emit(node('window'),'pointerup',{buttons}),aimDown:(pid=21,x=88,y=50)=>emit(node('aim-pad'),'pointerdown',{pointerId:pid,clientX:x,clientY:y}),aimEnd:pid=>emit(node('aim-pad'),'pointerup',{pointerId:pid}),key:(code,repeat=false)=>emit(node('window'),'keydown',{code,repeat}),clear:()=>context.clearInputs(),pause(){emit(node('window'),'keydown',{code:'Escape'})},blur:()=>emit(node('window'),'blur'),state:()=>({fire:context.firing,aim:context.aiming})};
}
function flags(h,fire,aim){assert.equal(h.context.firing,fire,'firing ownership');assert.equal(h.context.aiming,aim,'aim ownership')}
const orders=[['M','A','T'],['M','T','A'],['A','M','T'],['A','T','M'],['T','M','A'],['T','A','M']];
for(const count of [0,1,2])for(const mouse of [0,1,2,3])for(const aim of [false,true])test(`truth table T${count}/M${mouse}/A${Number(aim)} across all six arrival orders`,()=>{
 for(const order of orders){const h=harness();for(const source of order){if(source==='M'){h.mouseDown(mouse||1);if(!mouse)h.mouseUp(0)}if(source==='A'&&aim)h.aimDown();if(source==='T')for(let n=0;n<count;n++)h.fireDown(10+n)}flags(h,Boolean(mouse&1)||count>0,Boolean(mouse&2)||aim||count>0)}
});
for(const end of ['pointerup','pointercancel','lostpointercapture'])for(const first of [7,8])test(`two fire pointers: ${end} ${first} preserves remaining source`,()=>{
 const h=harness();h.fireDown(7);h.fireDown(8);h.fireEnd(first,end);flags(h,true,true);h.fireEnd(first===7?8:7);flags(h,false,false);
});
for(const mouse of [1,2,3])for(const first of ['mouse','touch'])test(`mouse mask${mouse}+touch release ${first} first`,()=>{
 const h=harness();h.mouseDown(mouse);h.fireDown(7);if(first==='mouse'){h.mouseUp(0);flags(h,true,true);h.fireEnd(7)}else{h.fireEnd(7);flags(h,Boolean(mouse&1),Boolean(mouse&2));h.mouseUp(0)}flags(h,false,false);
});
for(const first of ['aim','touch'])test(`aim pad+touch release ${first} first`,()=>{
 const h=harness();h.aimDown(21);h.fireDown(7);if(first==='aim'){h.aimEnd(21);flags(h,true,true);h.fireEnd(7)}else{h.fireEnd(7);flags(h,false,true);h.aimEnd(21)}flags(h,false,false);
});
for(const first of ['mouse','aim'])test(`right mouse+aim pad release ${first} first`,()=>{
 const h=harness();h.mouseDown(2);h.aimDown(21);if(first==='mouse'){h.mouseUp(0);flags(h,false,true);h.aimEnd(21)}else{h.aimEnd(21);flags(h,false,true);h.mouseUp(0)}flags(h,false,false);
});
for(const [touch,aim] of [[1,false],[0,true],[1,true],[2,true]])test(`canvas cancel clears only mouse, preserving T${touch}/A${Number(aim)}`,()=>{
 const h=harness();h.mouseDown(3);if(aim)h.aimDown();for(let i=0;i<touch;i++)h.fireDown(7+i);h.send('canvas','pointercancel');flags(h,touch>0,aim||touch>0);
});
test('original mouse chord 1→3→2→0 keeps fire/aim separation',()=>{
 const h=harness();h.mouseDown(1);flags(h,true,false);h.mouseMove(3);flags(h,true,true);h.mouseUp(2);flags(h,false,true);h.mouseUp(0);flags(h,false,false);
});
test('pure canvas mouse-left does not force aim and aim pad does not fire',()=>{
 const h=harness();h.mouseDown(1);flags(h,true,false);h.mouseUp(0);h.aimDown();flags(h,false,true);h.aimEnd(21);flags(h,false,false);
});
test('Space stays vault and is never a firing source',()=>{
 const h=harness();h.key('Space');h.key('Space',true);flags(h,false,false);assert.equal(h.calls.vault,1);h.fireDown(7);h.key('Space');flags(h,true,true);assert.equal(h.calls.vault,2);
});
test('canvas non-mouse pointer events retain the original mouse gate',()=>{
 const h=harness();h.mouseDown(1);h.mouseMove(0,'touch');flags(h,true,false);h.mouseUp(0);flags(h,false,false);
});
for(const mode of ['paused','help','settings','field','town-walk','title'])test(`${mode} rejects new fire and mouse gameplay claims`,()=>{
 const h=harness(mode);h.fireDown(7);h.mouseDown(3);flags(h,false,false);assert.deepEqual([...h.node('touch-fire').capture],[]);if(mode==='town-walk'){h.aimDown();flags(h,false,true)}
});
test('pause/resume clears every source; old releases cannot stop a fresh fire source',()=>{
 const h=harness();h.mouseDown(3);h.aimDown();h.fireDown(7);h.fireDown(8);h.pause();assert.equal(h.context.mode,'paused');flags(h,false,false);h.pause();assert.equal(h.context.mode,'playing');h.fireDown(9);h.fireEnd(7);h.fireEnd(8,'lostpointercapture');h.mouseMove(1);flags(h,true,true);h.fireEnd(9);flags(h,false,false);assert.deepEqual(h.calls.states,['paused','running']);
});
test('real blur handler neutralizes all sources and releases only owned fire captures',()=>{
 const h=harness();h.node('touch-fire').capture.add(99);h.fireDown(7);h.fireDown(8);h.aimDown();h.mouseDown(1);h.blur();flags(h,false,false);assert.equal(h.context.mode,'paused');assert.deepEqual(h.node('touch-fire').released,[7,8]);assert.deepEqual([...h.node('touch-fire').capture],[99]);
});
test('unknown and duplicate fire releases have no effect on other sources',()=>{
 const h=harness();h.mouseDown(1);h.aimDown();h.fireDown(7);h.fireEnd(55);flags(h,true,true);h.fireEnd(7);h.fireEnd(7,'lostpointercapture');flags(h,true,true);h.aimEnd(21);flags(h,true,false);h.mouseUp(0);flags(h,false,false);
});
test('duplicate fire down does not recapture or replay audio',()=>{
 const h=harness();h.fireDown(7);const before={...h.calls};h.fireDown(7);flags(h,true,true);assert.equal(h.calls.unlock,before.unlock);assert.equal(h.calls.resume,before.resume);assert.deepEqual([...h.node('touch-fire').capture],[7]);
});
for(const other of ['mouse','aim'])test(`capture failure cannot add fire ownership or clear existing ${other}`,()=>{
 const h=harness();if(other==='mouse')h.mouseDown(1);else h.aimDown();h.node('touch-fire').throwCapture=true;assert.doesNotThrow(()=>h.fireDown(7));flags(h,other==='mouse',other==='aim');h.node('touch-fire').throwCapture=false;h.fireDown(8);flags(h,true,true);
});
test('release failures do not prevent clearing remaining pointers or fresh ownership',()=>{
 const h=harness();h.fireDown(7);h.fireDown(8);h.node('touch-fire').throwRelease=true;assert.doesNotThrow(()=>h.clear());flags(h,false,false);assert.deepEqual(h.node('touch-fire').released,[7,8]);h.node('touch-fire').throwRelease=false;h.fireDown(9);flags(h,true,true);
});
test('clear rejects reentrant new touch/mouse/pad claims before any capture callback returns',()=>{
 const h=harness();h.fireDown(7);h.aimDown();h.mouseDown(3);h.node('touch-fire').onRelease=()=>{h.clear();h.fireDown(8);h.mouseDown(1);h.aimDown(22)};h.clear();flags(h,false,false);assert.deepEqual([...h.node('touch-fire').capture],[]);h.node('touch-fire').onRelease=null;h.fireDown(9);flags(h,true,true);
});
test('aim deadzone and retained heading remain unchanged when fire sources come and go',()=>{
 const h=harness();h.aimDown(21);h.send('aim-pad','pointermove',{pointerId:21,clientX:50,clientY:50});assert.equal(h.context.touchAim.x,1);h.fireDown(7);h.fireEnd(7);flags(h,false,true);assert.equal(h.context.touchAim.x,1);h.clear();flags(h,false,false);assert.equal(h.context.touchAim.x,1);
});
