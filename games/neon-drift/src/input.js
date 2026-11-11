export function gamepadAxis(value){const n=Number.isFinite(value)?value:0;return Math.abs(n)<.14?0:Math.sign(n)*Math.min(1,(Math.abs(n)-.14)/.86);}
export function createInput({onPause,onReset,onGesture,onChange=()=>{}}){
  const controls={throttle:0,brake:0,steer:0,handbrake:false},counts={throttle:0,brake:0,left:0,right:0,handbrake:0};let pad=null;
  const keys=new Set(),pointers=new Map(),listeners=[];let touch=matchMedia('(pointer:coarse)').matches,autoThrottle=true,enabled=false,previousStart=false,previousReset=false;
  const listen=(el,name,handler)=>{el.addEventListener(name,handler);listeners.push(()=>el.removeEventListener(name,handler));};
  const clear=()=>{keys.clear();for(const [id,button] of pointers){try{if(button.hasPointerCapture(id))button.releasePointerCapture(id);}catch{}}pointers.clear();for(const k in counts)counts[k]=0;sample();document.querySelectorAll('[data-control]').forEach(e=>e.classList.remove('pressed'));};
  function down(e){if(e.code==='Escape'&&e.repeat){e.preventDefault();return;}if(e.target.closest('input,select,textarea')||document.querySelector('dialog[open]'))return;const key=e.code;if(enabled&&['ArrowUp','ArrowDown','ArrowLeft','ArrowRight','Space','KeyW','KeyA','KeyS','KeyD','Escape','KeyR'].includes(key))e.preventDefault();if(key==='Escape'&&!e.repeat){onPause();return;}if(!enabled)return;if(key==='KeyR'&&!e.repeat)onReset();keys.add(key);sample();onGesture();}
  listen(window,'keydown',down);listen(window,'keyup',e=>{keys.delete(e.code);sample();});
  listen(document,'pointerdown',()=>onGesture());
  for(const button of document.querySelectorAll('[data-control]')){
    listen(button,'pointerdown',e=>{if(!enabled)return;e.preventDefault();touch=true;button.setPointerCapture(e.pointerId);if(!pointers.has(e.pointerId))counts[button.dataset.control]++;pointers.set(e.pointerId,button);sample();button.classList.add('pressed');onGesture();});
    const end=e=>{if(pointers.has(e.pointerId)){counts[button.dataset.control]--;pointers.delete(e.pointerId);}sample();if(!counts[button.dataset.control])button.classList.remove('pressed');};
    for(const name of ['pointerup','pointercancel','lostpointercapture'])listen(button,name,end);
  }
  function pollGamepad(){
    const pads=navigator.getGamepads?.();pad=null;for(let i=0;pads&&i<pads.length;i++){const candidate=pads[i];if(candidate?.connected&&candidate.mapping==='standard'){pad=candidate;break;}}
    const start=!!pad?.buttons[9]?.pressed,reset=!!pad?.buttons[3]?.pressed;
    if(start&&!previousStart){onGesture();onPause();}if(reset&&!previousReset&&enabled)onReset();previousStart=start;previousReset=reset;sample();return pad;
  }
  function sample(){
    const oldThrottle=controls.throttle,oldBrake=controls.brake,oldSteer=controls.steer,oldHandbrake=controls.handbrake;
    const left=keys.has('KeyA')||keys.has('ArrowLeft')||counts.left>0,right=keys.has('KeyD')||keys.has('ArrowRight')||counts.right>0;
    controls.throttle=enabled?Math.max(keys.has('KeyW')||keys.has('ArrowUp')||counts.throttle>0||(touch&&autoThrottle)?1:0,pad?.buttons[7]?.value||0):0;
    controls.brake=enabled?Math.max(keys.has('KeyS')||keys.has('ArrowDown')||counts.brake>0?1:0,pad?.buttons[6]?.value||0):0;
    controls.steer=enabled?(left||right?Number(right)-Number(left):gamepadAxis(pad?.axes[0])):0;
    controls.handbrake=enabled&&(keys.has('Space')||counts.handbrake>0||!!pad?.buttons[0]?.pressed);
    if(oldThrottle!==controls.throttle||oldBrake!==controls.brake||oldSteer!==controls.steer||oldHandbrake!==controls.handbrake)onChange(controls);
    return controls;
  }
  return {clear,pollGamepad,setEnabled(value){enabled=value;if(!value)clear();},setOptions(o){autoThrottle=o.autoThrottle;touch=o.touch??touch;document.body.classList.toggle('touch',touch);document.querySelector('#touch-throttle').hidden=autoThrottle;},get touch(){return touch;},sample,dispose(){clear();for(const remove of listeners)remove();}};
}
