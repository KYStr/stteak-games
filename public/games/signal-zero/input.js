import {numericRecord} from './numeric.js';
import {Timer} from './telemetry.js';
export const DEFAULT_BINDINGS={left:'KeyA',right:'KeyD',up:'KeyW',crouch:'KeyS',jump:'Space',cycle:'KeyQ',tool:'KeyE'};
export class Input{
 constructor(bindings,onPause,onGesture){this.bindings={...DEFAULT_BINDINGS,...bindings};this.sample={};numericRecord(this,{receivedAt:0,consumedAt:1});this.timing=this.numeric;this.timer=new Timer(this.timing);this.down=new Set();this.pressed=new Set();this.pointers=new Map();this.keyActions=new Map();this.claimedKeys=new Set();this.enabled=false;this.capture=null;this.abort=new AbortController();const signal=this.abort.signal;
 const keyDown=e=>{
  // A physical gameplay/capture press owns its repeats and release even if a
  // result screen appears meanwhile. A fresh press clears a stale claim after
  // blur (the keyup may have gone to another window) and remains native in menus.
  if(e.repeat&&this.claimedKeys.has(e.code)){e.preventDefault();return}
  if(!e.repeat)this.claimedKeys.delete(e.code);
  if(this.capture){e.preventDefault();this.claimedKeys.add(e.code);this.capture(e.code);this.capture=null;return}
  if(e.code==='Escape'){e.preventDefault();this.claimedKeys.add(e.code);onPause();return}
  if(!this.enabled||e.repeat)return;
  const action=Object.keys(this.bindings).find(a=>this.bindings[a]===e.code)||({ArrowLeft:'left',ArrowRight:'right',ArrowUp:'up',ArrowDown:'crouch'}[e.code]);
  if(action){this.timer.mark(0);e.preventDefault();this.claimedKeys.add(e.code);onGesture();const previous=this.keyActions.get(e.code);this.keyActions.set(e.code,action);if(previous&&previous!==action)this.syncAction(previous);this.syncAction(action)}
 };window.addEventListener('keydown',keyDown,{signal});
 const keyUp=e=>{const owned=this.claimedKeys.delete(e.code),bound=Object.keys(this.bindings).find(a=>this.bindings[a]===e.code)||({ArrowLeft:'left',ArrowRight:'right',ArrowUp:'up',ArrowDown:'crouch'}[e.code]),action=this.keyActions.get(e.code);if(owned||(bound&&this.enabled))e.preventDefault();this.keyActions.delete(e.code);if(action)this.syncAction(action)};window.addEventListener('keyup',keyUp,{signal});
 for(const button of document.querySelectorAll('[data-input]')){button.addEventListener('pointerdown',e=>{e.preventDefault();onGesture();button.setPointerCapture(e.pointerId);button.classList.add('held');if(this.enabled){this.pointers.set(e.pointerId,button.dataset.input);this.syncAction(button.dataset.input)}},{signal});const up=e=>{const action=this.pointers.get(e.pointerId);this.pointers.delete(e.pointerId);if(action)this.syncAction(action);if(![...this.pointers.values()].includes(button.dataset.input))button.classList.remove('held')};button.addEventListener('pointerup',up,{signal});button.addEventListener('pointercancel',up,{signal});button.addEventListener('lostpointercapture',up,{signal})}
 window.addEventListener('blur',()=>this.clear(),{signal});
 }
 // Releasing one physical source must not release another key or touch holding
 // the same action. Keep this separate from native-menu key ownership.
 syncAction(action){this.hold(action,[...this.keyActions.values(),...this.pointers.values()].includes(action))}
 hold(action,value){if(value){if(!this.down.has(action))this.pressed.add(action);this.down.add(action)}else this.down.delete(action)}
 read(){const d=this.down,p=this.pressed,r=this.sample;this.timer.mark(1);r.axis=Number(d.has('right'))-Number(d.has('left'));r.jumpHeld=d.has('jump');r.jumpPressed=p.has('jump');r.crouch=d.has('crouch');r.up=d.has('up');r.interactPressed=p.has('up');r.toolPressed=p.has('tool');r.cyclePressed=p.has('cycle');if(this.pressed.size)this.pressed.clear();return r;}

 // Transitions clear actions, not ownership of physically held keys.
 clear(){this.capture=null;if(this.pointers.size){const ids=[...this.pointers.keys()];for(const button of document.querySelectorAll('[data-input]'))for(const id of ids)if(button.hasPointerCapture?.(id))button.releasePointerCapture(id)}this.down.clear();this.pressed.clear();this.keyActions.clear();this.pointers.clear();document.querySelectorAll('.held').forEach(n=>n.classList.remove('held'))}
 dispose(){this.abort.abort();this.clear();this.claimedKeys.clear()}
}
