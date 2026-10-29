import test from 'node:test';
import assert from 'node:assert/strict';
import { setMaxListeners } from 'node:events';
import { Controls } from '../../../public/games/hollow-crown/input.js';

// CPU-only spec-shaped Pointer Events, not native browser evidence.
// Native mouse: first physical button -> pointerdown, intermediate changes ->
// pointermove with buttons bitmask, final button -> pointerup then lostcapture.
function fixture(){
  const all=[],nodes=new Map();let enabled=true,gestures=0;
  class E extends EventTarget{
    constructor(tagName='DIV'){super();this.tagName=tagName;this.style={};this.captures=new Set();this.classes=new Set();this.classList={add:x=>this.classes.add(x),remove:x=>this.classes.delete(x)};all.push(this);}
    querySelector(){return this.nub??=new E('I');}
    getBoundingClientRect(){return{left:0,top:0,width:100,height:100};}
    setPointerCapture(id){this.captures.add(id);}
    hasPointerCapture(id){return this.captures.has(id);}
    releasePointerCapture(id){if(this.captures.delete(id))emit(this,'lostpointercapture',{pointerId:id,pointerType:'mouse'});}
  }
  const win=new E('WINDOW');globalThis.window=win;globalThis.document={getElementById(id){if(!nodes.has(id))nodes.set(id,new E(id==='world'?'CANVAS':'DIV'));return nodes.get(id);},querySelectorAll(sel){return sel==='.held'?all.filter(n=>n.classes.has('held')):all.filter(n=>n.tagName==='I');}};
  const canvas=document.getElementById('world');
  const c=new Controls(canvas,{screenToGround:()=>({x:1,z:1})},{pause(){},gesture(){gestures++;},enabled:()=>enabled});setMaxListeners(0,c.abort.signal);
  function emit(el,type,props={}){const e=new Event(type,{cancelable:true});for(const[k,v]of Object.entries(props))Object.defineProperty(e,k,{value:v});el.dispatchEvent(e);}
  function pointer(type,button,buttons,id=1,pointerType='mouse',target=canvas){
    emit(target,type,{pointerId:id,pointerType,button,buttons,clientX:50,clientY:50});
    if(['pointerup','pointercancel'].includes(type)&&target!==win)emit(win,type,{pointerId:id,pointerType,button,buttons});
    if(['pointerup','pointercancel'].includes(type))for(const n of all)if(n.captures.has(id))n.releasePointerCapture(id);
  }
  const read=()=>c.read({x:0,z:0},false),key=(type,code='KeyJ')=>emit(win,type,{code,repeat:false,target:canvas});
  const neutral=()=>{const x=read();for(const k of ['attackHeld','attackPressed','attackReleased','block','dodge'])assert.equal(x[k],false,k);};
  return{c,canvas,win,pointer,key,read,neutral,emit,nodes,setEnabled:v=>{enabled=v;},get gestures(){return gestures;}};
}
function run(name,fn){test(name,()=>{const f=fixture();try{fn(f);}finally{f.c.dispose();delete globalThis.window;delete globalThis.document;}});}
const down=(f,b)=>f.pointer('pointerdown',b,b===0?1:2),add=(f,b)=>f.pointer('pointermove',b,3),release=(f,b,remaining)=>f.pointer(remaining?'pointermove':'pointerup',b,remaining);
for(const first of [0,2])for(const firstReleased of [0,2])run(`native chord first=${first} release-first=${firstReleased}`,f=>{
  down(f,first);f.read();add(f,first===0?2:0);let x=f.read();assert.equal(x.attackHeld,true);assert.equal(x.block,true);assert.equal(x.attackPressed,first===2);
  const remains=firstReleased===0?2:1;release(f,firstReleased,remains);x=f.read();assert.equal(x.attackHeld,firstReleased!==0);assert.equal(x.block,firstReleased!==2);assert.equal(x.attackReleased,firstReleased===0);
  release(f,firstReleased===0?2:0,0);x=f.read();assert.equal(x.attackHeld,false);assert.equal(x.block,false);assert.equal(x.attackReleased,firstReleased===2);assert.equal(f.canvas.captures.size,0);f.neutral();
});
run('same buttons pointermove never repeats pressed or gesture',f=>{down(f,0);f.read();const g=f.gestures;for(let i=0;i<5;i++){f.pointer('pointermove',-1,1);const x=f.read();assert.equal(x.attackHeld,true);assert.equal(x.attackPressed,false);}assert.equal(f.gestures,g);});
run('keyboard attack survives intermediate mouse left release',f=>{f.key('keydown');down(f,0);add(f,2);f.read();release(f,0,2);let x=f.read();assert.equal(x.attackHeld,true);assert.equal(x.attackReleased,false);assert.equal(x.block,true);f.key('keyup');x=f.read();assert.equal(x.attackHeld,false);assert.equal(x.attackReleased,true);assert.equal(x.block,true);});
run('keyboard guard survives intermediate mouse right release',f=>{f.key('keydown','KeyK');down(f,2);add(f,0);f.read();release(f,2,1);let x=f.read();assert.equal(x.block,true);assert.equal(x.attackHeld,true);f.key('keyup','KeyK');x=f.read();assert.equal(x.block,false);assert.equal(x.attackHeld,true);});
run('touch attack survives chord mouse removal',f=>{const el=document.getElementById('attack');f.pointer('pointerdown',0,1,11,'touch',el);down(f,0);add(f,2);f.read();release(f,0,2);let x=f.read();assert.equal(x.attackHeld,true);assert.equal(x.attackReleased,false);f.pointer('pointerup',0,0,11,'touch',el);x=f.read();assert.equal(x.attackHeld,false);assert.equal(x.attackReleased,true);});
for(const type of ['pointercancel','lostpointercapture'])run(`chord ${type} cancels final mouse attack without release`,f=>{down(f,0);add(f,2);f.pointer(type,-1,0);f.neutral();f.pointer('pointermove',0,3);f.neutral();});
for(const type of ['pointercancel','lostpointercapture'])run(`${type} preserves keyboard union`,f=>{f.key('keydown');down(f,0);add(f,2);f.read();f.pointer(type,-1,0);const x=f.read();assert.equal(x.attackHeld,true);assert.equal(x.attackReleased,false);assert.equal(x.block,false);f.key('keyup');assert.equal(f.read().attackReleased,true);});
run('foreign pointer move/up/cancel cannot erase owner',f=>{down(f,0);add(f,2);f.read();for(const type of ['pointermove','pointerup','pointercancel']){f.pointer(type,-1,0,99);const x=f.read();assert.equal(x.attackHeld,true);assert.equal(x.block,true);}assert.equal(f.canvas.hasPointerCapture(1),true);});
run('unowned move with held buttons cannot start any source',f=>{for(const buttons of [0,1,2,3,4,7]){f.pointer('pointermove',-1,buttons);f.neutral();}assert.equal(f.canvas.captures.size,0);});
run('clear before stale chord move cannot resurrect actions',f=>{down(f,0);add(f,2);f.c.clear();f.pointer('pointermove',-1,3);f.pointer('pointerup',2,0);f.neutral();assert.equal(f.canvas.captures.size,0);});
run('blur before stale chord move cannot resurrect actions',f=>{down(f,2);add(f,0);f.emit(f.win,'blur');f.pointer('pointermove',-1,3);f.neutral();});
run('disabled fresh pointerdown/move cannot acquire owner',f=>{f.setEnabled(false);down(f,0);add(f,2);f.neutral();f.setEnabled(true);f.pointer('pointermove',-1,3);f.neutral();});
run('disabled owned pointer cannot add a new action',f=>{down(f,2);f.read();f.setEnabled(false);add(f,0);assert.equal(f.read().attackHeld,false);f.c.clear();f.setEnabled(true);f.pointer('pointermove',-1,3);f.neutral();});
run('touch canvas sequence cannot masquerade as mouse chord',f=>{f.pointer('pointerdown',0,1,2,'touch');f.pointer('pointermove',2,3,2,'touch');f.neutral();});
run('unbound middle-first still accepts later left and right additions',f=>{f.pointer('pointerdown',1,4);f.neutral();f.pointer('pointermove',0,5);let x=f.read();assert.equal(x.attackPressed,true);assert.equal(x.attackHeld,true);f.pointer('pointermove',2,7);x=f.read();assert.equal(x.attackHeld,true);assert.equal(x.block,true);f.pointer('pointermove',0,6);x=f.read();assert.equal(x.attackReleased,true);assert.equal(x.attackHeld,false);assert.equal(x.block,true);f.pointer('pointermove',2,4);f.neutral();f.pointer('pointerup',1,0);f.neutral();assert.equal(f.canvas.captures.size,0);});
run('left to middle-only keeps session but releases attack once',f=>{down(f,0);f.read();f.pointer('pointermove',1,5);f.read();f.pointer('pointermove',0,4);assert.equal(f.read().attackReleased,true);assert.equal(f.canvas.hasPointerCapture(1),true);f.pointer('pointermove',-1,4);f.neutral();f.pointer('pointerup',1,0);f.neutral();});
run('owned buttons zero recovers missed final up without cancelling release',f=>{down(f,0);f.read();f.pointer('pointermove',-1,0);const x=f.read();assert.equal(x.attackHeld,false);assert.equal(x.attackReleased,true);assert.equal(f.canvas.captures.size,0);f.neutral();});
run('two pointer owners: zero mask affects only matching owner',f=>{down(f,0);f.pointer('pointerdown',0,1,2,'pen');f.read();f.pointer('pointermove',-1,0,1);let x=f.read();assert.equal(x.attackHeld,true);assert.equal(x.attackReleased,false);f.pointer('pointerup',0,0,2,'pen');assert.equal(f.read().attackReleased,true);});
run('normally released left attack survives later right cancellation',f=>{down(f,0);add(f,2);f.read();release(f,0,2);f.pointer('pointercancel',-1,0);const x=f.read();assert.equal(x.attackReleased,true);assert.equal(x.attackHeld,false);assert.equal(x.block,false);});
run('dispose prevents subsequent chord sequence',f=>{down(f,0);f.c.dispose();down(f,2);add(f,0);f.neutral();});
