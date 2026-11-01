export const DEFAULT_BINDINGS={left:'KeyA',right:'KeyD',up:'KeyW',crouch:'KeyS',jump:'Space',cycle:'KeyQ',tool:'KeyE'};
export class Input{
 constructor(bindings,onPause,onGesture){this.bindings={...DEFAULT_BINDINGS,...bindings};this.down=new Set();this.pressed=new Set();this.pointers=new Map();this.keyActions=new Map();this.claimedKeys=new Set();this.enabled=false;this.capture=null;this.abort=new AbortController();const signal=this.abort.signal;
 window.addEventListener('keydown',e=>{
  // A physical gameplay/capture press owns its repeats and release even if a
  // result screen appears meanwhile. A fresh press clears a stale claim after
  // blur (the keyup may have gone to another window) and remains native in menus.
  if(e.repeat&&this.claimedKeys.has(e.code)){e.preventDefault();return}
  if(!e.repeat)this.claimedKeys.delete(e.code);
  if(this.capture){e.preventDefault();this.claimedKeys.add(e.code);this.capture(e.code);this.capture=null;return}
  if(e.code==='Escape'){e.preventDefault();this.claimedKeys.add(e.code);onPause();return}
  if(!this.enabled||e.repeat)return;
  const action=Object.keys(this.bindings).find(a=>this.bindings[a]===e.code)||({ArrowLeft:'left',ArrowRight:'right',ArrowUp:'up',ArrowDown:'crouch'}[e.code]);
  if(action){e.preventDefault();this.claimedKeys.add(e.code);onGesture();const previous=this.keyActions.get(e.code);this.keyActions.set(e.code,action);if(previous&&previous!==action)this.syncAction(previous);this.syncAction(action)}
 },{signal});
 window.addEventListener('keyup',e=>{const owned=this.claimedKeys.delete(e.code),bound=Object.keys(this.bindings).find(a=>this.bindings[a]===e.code)||({ArrowLeft:'left',ArrowRight:'right',ArrowUp:'up',ArrowDown:'crouch'}[e.code]),action=this.keyActions.get(e.code);if(owned||(bound&&this.enabled))e.preventDefault();this.keyActions.delete(e.code);if(action)this.syncAction(action)},{signal});
 for(const button of document.querySelectorAll('[data-input]')){button.addEventListener('pointerdown',e=>{e.preventDefault();onGesture();button.setPointerCapture(e.pointerId);button.classList.add('held');if(this.enabled){this.pointers.set(e.pointerId,button.dataset.input);this.syncAction(button.dataset.input)}},{signal});const up=e=>{const action=this.pointers.get(e.pointerId);this.pointers.delete(e.pointerId);if(action)this.syncAction(action);if(![...this.pointers.values()].includes(button.dataset.input))button.classList.remove('held')};button.addEventListener('pointerup',up,{signal});button.addEventListener('pointercancel',up,{signal});button.addEventListener('lostpointercapture',up,{signal})}
 window.addEventListener('blur',()=>this.clear(),{signal});
 }
 // Releasing one physical source must not release another key or touch holding
 // the same action. Keep this separate from native-menu key ownership.
 syncAction(action){this.hold(action,[...this.keyActions.values(),...this.pointers.values()].includes(action))}
 hold(action,value){if(value){if(!this.down.has(action))this.pressed.add(action);this.down.add(action)}else this.down.delete(action)}
 read(){const d=this.down,p=this.pressed,result={axis:Number(d.has('right'))-Number(d.has('left')),jumpHeld:d.has('jump'),jumpPressed:p.has('jump'),crouch:d.has('crouch'),up:d.has('up'),interactPressed:p.has('up'),toolPressed:p.has('tool'),cyclePressed:p.has('cycle')};this.pressed.clear();return result}
 // Transitions clear actions, not ownership of physically held keys.
 clear(){this.down.clear();this.pressed.clear();this.keyActions.clear();this.pointers.clear();document.querySelectorAll('.held').forEach(n=>n.classList.remove('held'))}
 dispose(){this.abort.abort();this.clear();this.claimedKeys.clear()}
}
