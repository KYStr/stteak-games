import {test} from 'node:test';
import assert from 'node:assert/strict';
import {Input} from '../../../games/signal-zero/src/input.js';

// Event-boundary tests complement native browser button/checkbox regressions.
// They assert ownership of a physical press, not just the current screen flag.
function harness(bindings={}){
 globalThis.window=new EventTarget();globalThis.document={querySelectorAll:()=>[]};
 let input,pauses=0,captures=0;
 input=new Input(bindings,()=>{pauses++;input.enabled=false;input.clear()},()=>{});
 const send=(type,code='Space',repeat=false)=>{
  const event=new Event(type,{cancelable:true});Object.assign(event,{code,repeat});
  window.dispatchEvent(event);return event.defaultPrevented;
 };
 return {input,send,pauseCount:()=>pauses,capture(){input.capture=()=>captures++},captureCount:()=>captures,close(){input.dispose();delete globalThis.window;delete globalThis.document}};
}

test('fresh menu Space retains native down/up behavior',()=>{
 const h=harness();try{assert.equal(h.send('keydown'),false);assert.equal(h.send('keyup'),false);assert.equal(h.input.read().jumpPressed,false)}finally{h.close()}
});
test('gameplay press cannot activate the menu that appears before release',()=>{
 const h=harness();try{
  h.input.enabled=true;assert.equal(h.send('keydown'),true);assert.equal(h.input.read().jumpPressed,true);
  h.input.enabled=false;h.input.clear();
  assert.equal(h.send('keydown','Space',true),true,'held repeat stays owned by gameplay');
  assert.equal(h.send('keyup'),true,'release cannot activate the newly focused retry button');
  assert.equal(h.input.read().jumpHeld,false);
  assert.equal(h.send('keydown'),false,'a deliberate new menu press remains native');assert.equal(h.send('keyup'),false);
 }finally{h.close()}
});
test('normal gameplay release clears the held action',()=>{
 const h=harness();try{h.input.enabled=true;h.send('keydown');assert.equal(h.input.read().jumpHeld,true);assert.equal(h.send('keyup'),true);assert.equal(h.input.read().jumpHeld,false)}finally{h.close()}
});
test('key binding capture owns its release but not the next menu press',()=>{
 const h=harness();try{h.capture();assert.equal(h.send('keydown'),true);assert.equal(h.captureCount(),1);assert.equal(h.send('keyup'),true);assert.equal(h.send('keydown'),false);assert.equal(h.send('keyup'),false)}finally{h.close()}
});
test('pause clears movement while retaining the release boundary',()=>{
 const h=harness();try{h.input.enabled=true;h.send('keydown','KeyD');h.send('keydown','Escape');assert.equal(h.pauseCount(),1);assert.equal(h.input.read().axis,0);assert.equal(h.send('keyup','KeyD'),true);assert.equal(h.input.read().axis,0)}finally{h.close()}
});
test('a fresh menu keydown recovers from a keyup lost during blur',()=>{
 const h=harness();try{h.input.enabled=true;h.send('keydown');window.dispatchEvent(new Event('blur'));h.input.enabled=false;assert.equal(h.input.read().jumpHeld,false);assert.equal(h.send('keydown'),false);assert.equal(h.send('keyup'),false)}finally{h.close()}
});
test('ownership follows a remapped jump key across a result transition',()=>{
 const h=harness({jump:'KeyX'});try{h.input.enabled=true;h.send('keydown','KeyX');h.input.enabled=false;h.input.clear();assert.equal(h.send('keyup','KeyX'),true);assert.equal(h.send('keydown','KeyX'),false);assert.equal(h.send('keyup','KeyX'),false)}finally{h.close()}
});
