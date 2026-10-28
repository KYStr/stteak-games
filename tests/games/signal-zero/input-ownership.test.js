import {test} from 'node:test';
import assert from 'node:assert/strict';
import {Input} from '../../../games/signal-zero/src/input.js';

// CPU event-boundary regression. Native Node EventTarget is real; DOM buttons,
// pointer capture and classList are explicit stand-ins, not browser/mobile QA.
function harness(){
 const buttons=new Map(['left','right','up','crouch','jump','tool'].map(action=>{
  const button=new EventTarget(),classes=new Set();
  button.dataset={input:action};
  button.classList={add:c=>classes.add(c),remove:c=>classes.delete(c),contains:c=>classes.has(c)};
  button.setPointerCapture=()=>{};
  return [action,button];
 }));
 globalThis.window=new EventTarget();
 globalThis.document={querySelectorAll:selector=>selector==='[data-input]'?[...buttons.values()]:[...buttons.values()].filter(b=>b.classList.contains('held'))};
 let input;input=new Input({},()=>{input.enabled=false;input.clear()},()=>{});input.enabled=true;
 const key=(type,code,repeat=false)=>{const e=new Event(type,{cancelable:true});Object.assign(e,{code,repeat});window.dispatchEvent(e);return e.defaultPrevented};
 const pointer=(type,action,id)=>{const e=new Event(type,{cancelable:true});Object.assign(e,{pointerId:id});buttons.get(action).dispatchEvent(e);return e.defaultPrevented};
 return {input,buttons,key,pointer,close(){input.dispose();delete globalThis.window;delete globalThis.document}};
}
const value=(sample,action)=>action==='left'?(sample.axis===0?0:-sample.axis):action==='right'?sample.axis:sample[action];
for(const [action,key,alias] of [['left','KeyA','ArrowLeft'],['right','KeyD','ArrowRight'],['up','KeyW','ArrowUp'],['crouch','KeyS','ArrowDown']]){
 for(const first of [key,alias])test(`${action}: ${first} release preserves the other held physical key`,()=>{
  const h=harness();try{
   h.key('keydown',key);h.key('keydown',alias);assert.equal(value(h.input.read(),action),action==='up'||action==='crouch'?true:1);
   h.key('keyup',first);assert.equal(value(h.input.read(),action),action==='up'||action==='crouch'?true:1);
   h.key('keyup',first===key?alias:key);assert.equal(value(h.input.read(),action),action==='up'||action==='crouch'?false:0);
  }finally{h.close()}
 });
}
for(const [action,code] of [['right','KeyD'],['jump','Space']])for(const first of ['key','touch'])test(`${action}: keyboard+touch release ${first} first`,()=>{
 const h=harness();try{
  h.key('keydown',code);h.input.read();h.pointer('pointerdown',action,11);
  const second=h.input.read();assert.equal(action==='jump'?second.jumpHeld:second.axis,action==='jump'?true:1);assert.equal(second.jumpPressed,false,'additional source is not a new jump edge');
  if(first==='key')h.key('keyup',code);else h.pointer('pointerup',action,11);
  assert.equal(action==='jump'?h.input.read().jumpHeld:h.input.read().axis,action==='jump'?true:1);
  if(first==='key')h.pointer('pointerup',action,11);else h.key('keyup',code);
  assert.equal(action==='jump'?h.input.read().jumpHeld:h.input.read().axis,action==='jump'?false:0);
 }finally{h.close()}
});
for(const end of ['pointerup','pointercancel','lostpointercapture'])for(const first of [11,12])test(`two touches: ${end} id${first} preserves other touch and held style`,()=>{
 const h=harness();try{
  h.pointer('pointerdown','right',11);h.pointer('pointerdown','right',12);assert.equal(h.input.read().axis,1);
  h.pointer(end,'right',first);assert.equal(h.input.read().axis,1);assert.equal(h.buttons.get('right').classList.contains('held'),true);
  h.pointer('pointerup','right',first===11?12:11);assert.equal(h.input.read().axis,0);assert.equal(h.buttons.get('right').classList.contains('held'),false);
 }finally{h.close()}
});
for(const boundary of ['blur','pause','result'])test(`${boundary} clears all sources but preserves physical menu release ownership`,()=>{
 const h=harness();try{
  h.key('keydown','KeyD');h.key('keydown','ArrowRight');h.key('keydown','Space');h.pointer('pointerdown','jump',21);h.input.read();
  if(boundary==='blur'){window.dispatchEvent(new Event('blur'));h.input.enabled=false}
  else if(boundary==='pause')h.key('keydown','Escape');
  else{h.input.enabled=false;h.input.clear()}
  assert.equal(h.input.read().axis,0);assert.equal(h.input.read().jumpHeld,false);
  assert.equal(h.key('keydown','Space',true),true);assert.equal(h.key('keyup','Space'),true);
  h.pointer('pointerup','jump',21);h.key('keyup','ArrowRight');h.key('keyup','KeyD');
  assert.equal(h.input.read().axis,0);assert.equal(h.input.read().jumpHeld,false);
  assert.equal(h.key('keydown','Space'),false,'new intentional menu press remains native');assert.equal(h.key('keyup','Space'),false);
  h.input.enabled=true;assert.equal(h.input.read().jumpHeld,false);h.key('keydown','KeyD');assert.equal(h.input.read().axis,1);h.key('keyup','KeyD');assert.equal(h.input.read().axis,0);
 }finally{h.close()}
});
test('an unowned alias keyup cannot release a held mapped key',()=>{
 const h=harness();try{h.key('keydown','KeyD');h.input.read();h.key('keyup','ArrowRight');assert.equal(h.input.read().axis,1);h.key('keyup','KeyD');assert.equal(h.input.read().axis,0)}finally{h.close()}
});
test('release remembers the action bound at keydown if bindings change meanwhile',()=>{
 const h=harness();try{h.key('keydown','KeyD');h.input.read();h.input.bindings.right='KeyX';h.key('keyup','KeyD');assert.equal(h.input.read().axis,0);h.key('keydown','KeyX');assert.equal(h.input.read().axis,1);h.key('keyup','KeyX');assert.equal(h.input.read().axis,0)}finally{h.close()}
});
test('a touch begun while disabled does not become a stale gameplay owner',()=>{
 const h=harness();try{h.input.enabled=false;h.pointer('pointerdown','right',9);h.input.enabled=true;h.key('keydown','KeyD');h.input.read();h.key('keyup','KeyD');assert.equal(h.input.read().axis,0);h.pointer('pointerup','right',9);assert.equal(h.input.read().axis,0)}finally{h.close()}
});
test('duplicate releases do not disturb another input source',()=>{
 const h=harness();try{h.key('keydown','KeyD');h.pointer('pointerdown','right',11);h.input.read();h.pointer('pointerup','right',11);h.pointer('lostpointercapture','right',11);assert.equal(h.input.read().axis,1);h.key('keyup','KeyD');assert.equal(h.input.read().axis,0)}finally{h.close()}
});
