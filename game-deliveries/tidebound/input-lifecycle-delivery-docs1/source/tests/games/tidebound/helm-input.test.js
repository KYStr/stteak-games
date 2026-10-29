import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';

// Exact production declarations/functions/assigned handlers are evaluated,
// not rewritten. DOM geometry/capture/style are explicit CPU stand-ins.
function harness(){
 const source=readFileSync(new URL('../../../games/tidebound/src/main.js',import.meta.url),'utf8');
 function section(start,end){assert.equal(source.split(start).length,2,`unique ${start}`);const i=source.indexOf(start),j=source.indexOf(end,i);assert.ok(j>i);return source.slice(i,j)}
 const state=section('const keys=new Set(),holds=new Map(),samples=[];','let markedObservation');
 const clear=section('function clearInput(){','function notify(');
 const binding=section("const helm=document.createElement('div');","document.querySelectorAll('[data-hold]')");
 const blur=section("window.addEventListener('blur',", "document.addEventListener('visibilitychange'");
 const capture=new Set(),released=[],attributes={},style={setProperty(k,v){this[k]=v}};
 let throwRelease=false,throwCapture=false;
 const helm={style,attributes,setAttribute(k,v){attributes[k]=v},setPointerCapture(id){if(throwCapture)throw Error('inactive pointer');capture.add(id)},hasPointerCapture:id=>capture.has(id),releasePointerCapture(id){released.push(id);capture.delete(id);if(throwRelease)throw Error('capture already ended');this.onlostpointercapture?.({pointerId:id})},getBoundingClientRect:()=>({left:10,top:20,width:100,height:100})};
 const knob={style:{setProperty(k,v){this[k]=v}}};
 const context={paused:false,overlay:null,phase:'running',window:new EventTarget(),document:{createElement:()=>helm},steer:{prepend(){}},$:selector=>selector==='#helm'?helm:knob,unlock(){},pause(){context.paused=true},console};
 vm.createContext(context);vm.runInContext(state+clear+binding+blur+'\nglobalThis.snapshot=()=>({owner:helmPointer,x:helmInput.x,y:helmInput.y});globalThis.clear=clearInput;',context);
 const send=(type,id,x=92,y=70)=>{let prevented=false;helm['on'+type]({pointerId:id,clientX:x,clientY:y,preventDefault(){prevented=true}});return prevented};
 return{helm,context,knob,attributes,capture,released,send,state:()=>context.snapshot(),clear:()=>context.clear(),failRelease(){throwRelease=true},failCapture(value=true){throwCapture=value}};
}
const neutral=h=>{assert.equal(h.state().owner,null);assert.equal(h.state().x,0);assert.equal(h.state().y,0);assert.equal(h.attributes['aria-valuenow'],'0')};
const right=h=>{assert.equal(h.state().owner,7);assert.equal(h.state().x,1);assert.equal(h.state().y,0)};
for(const end of ['pointerup','pointercancel','lostpointercapture'])test(`non-owner ${end} cannot terminate owner`,()=>{
 const h=harness();h.send('pointerdown',7);right(h);h.send(end,8);right(h);h.send('pointerup',7);neutral(h);
});
test('second pointer cannot hijack or capture the active helm',()=>{
 const h=harness();assert.equal(h.send('pointerdown',7),true);right(h);assert.equal(h.send('pointerdown',8,28,70),false);right(h);assert.deepEqual([...h.capture],[7]);h.send('pointermove',8,28,70);right(h);
});
for(const end of ['pointerup','pointercancel','lostpointercapture'])test(`owner ${end} neutralizes and allows a fresh pointer`,()=>{
 const h=harness();h.send('pointerdown',7);right(h);h.send(end,7);neutral(h);h.send('pointerdown',8,28,70);assert.equal(h.state().owner,8);assert.equal(h.state().x,-1);h.send('pointerup',7);assert.equal(h.state().owner,8);h.send('pointerup',8);neutral(h);
});
for(const gate of ['paused','overlay'])test(`${gate} blocks new and stale moves, then fresh ownership works`,()=>{
 const h=harness();h.send('pointerdown',7);right(h);h.context[gate]=gate==='paused'?true:'map';h.clear();neutral(h);assert.deepEqual(h.released,[7]);h.send('pointermove',7,28,70);neutral(h);assert.equal(h.send('pointerdown',8,28,70),false);neutral(h);h.context[gate]=gate==='paused'?false:null;h.send('pointermove',7,28,70);neutral(h);h.send('pointerdown',8,28,70);assert.equal(h.state().owner,8);assert.equal(h.state().x,-1);
});
test('real production blur handler clears owner/capture; old events cannot resume steering',()=>{
 const h=harness();h.send('pointerdown',7);right(h);h.context.window.dispatchEvent(new Event('blur'));neutral(h);assert.equal(h.context.paused,true);assert.deepEqual(h.released,[7]);h.context.paused=false;h.send('pointermove',7,28,70);neutral(h);h.send('pointerdown',8,28,70);assert.equal(h.state().owner,8);h.send('lostpointercapture',7);assert.equal(h.state().owner,8);
});
test('clear is idempotent and releases only its own capture',()=>{
 const h=harness();h.capture.add(44);h.send('pointerdown',7);h.clear();h.clear();neutral(h);assert.deepEqual(h.released,[7]);assert.deepEqual([...h.capture],[44]);
});
test('ended capture failure cannot prevent neutral state or fresh ownership',()=>{
 const h=harness();h.send('pointerdown',7);h.failRelease();assert.doesNotThrow(()=>h.clear());neutral(h);h.send('pointerdown',8,28,70);assert.equal(h.state().owner,8);
});
for(const [x,y,wantX,wantY] of [[60,70,0,0],[92,70,1,0],[28,70,-1,0],[60,38,0,-1],[60,102,0,1],[124,134,Math.SQRT1_2,Math.SQRT1_2]])test(`owner geometry remains normalized at ${x},${y}`,()=>{
 const h=harness();h.send('pointerdown',7,x,y);assert.equal(h.state().owner,7);assert.ok(Math.abs(h.state().x-wantX)<1e-12);assert.ok(Math.abs(h.state().y-wantY)<1e-12);assert.equal(h.attributes['aria-valuenow'],String(Math.round(wantX*100)));
});

test('failed capture does not throw or claim a fake owner; the next active pointer works',()=>{
 const h=harness();h.failCapture();assert.doesNotThrow(()=>h.send('pointerdown',7));neutral(h);assert.deepEqual([...h.capture],[]);h.failCapture(false);h.send('pointerdown',8,28,70);assert.equal(h.state().owner,8);assert.equal(h.state().x,-1);
});
