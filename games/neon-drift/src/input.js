const controlViews=new WeakMap();
export const CONTROL_VALUE=Object.freeze({throttle:0,brake:1,steer:2});
export function getControlsNumericView(controls){return controlViews.get(controls);}
const controlDescriptors=Object.fromEntries(Object.entries(CONTROL_VALUE).map(([key,index])=>[key,{enumerable:true,configurable:true,get(){return controlViews.get(this)[index];},set(value){controlViews.get(this)[index]=value;}}]));
export function gamepadAxis(value){const n=Number.isFinite(value)?value:0;return Math.abs(n)<.14?0:Math.sign(n)*Math.min(1,(Math.abs(n)-.14)/.86);}
export function createInput({onPause,onReset,onGesture,onChange=()=>{}}){
  const controls={throttle:0,brake:0,steer:0,handbrake:false},counts={throttle:0,brake:0,left:0,right:0,handbrake:0};let pad=null;
  const values=new Float64Array(3),previousValues=new Float64Array(3),sampleAxes=new Float64Array(3);controlViews.set(controls,values);Object.defineProperties(controls,controlDescriptors);
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
    previousValues[0]=values[0];previousValues[1]=values[1];previousValues[2]=values[2];const oldHandbrake=controls.handbrake;
    const left=keys.has('KeyA')||keys.has('ArrowLeft')||counts.left>0,right=keys.has('KeyD')||keys.has('ArrowRight')||counts.right>0;
    sampleAxes[1]=sampleAxes[2]=0;
    if(pad){const throttle=pad.buttons[7]?.value,brake=pad.buttons[6]?.value;if(typeof throttle==='number'&&throttle===throttle&&throttle!==Infinity&&throttle!==-Infinity)sampleAxes[1]=throttle;if(typeof brake==='number'&&brake===brake&&brake!==Infinity&&brake!==-Infinity)sampleAxes[2]=brake;}
    values[0]=values[1]=0;
    if(enabled){values[0]=Math.max(keys.has('KeyW')||keys.has('ArrowUp')||counts.throttle>0||(touch&&autoThrottle)?1:0,sampleAxes[1]);values[1]=Math.max(keys.has('KeyS')||keys.has('ArrowDown')||counts.brake>0?1:0,sampleAxes[2]);}
    const axis=pad?.axes[0];sampleAxes[0]=0;if(typeof axis==='number'&&axis===axis&&axis!==Infinity&&axis!==-Infinity)sampleAxes[0]=axis;
    if(!enabled)values[2]=0;else if(left||right)values[2]=Number(right)-Number(left);else if(Math.abs(sampleAxes[0])<.14)values[2]=0;else values[2]=Math.sign(sampleAxes[0])*Math.min(1,(Math.abs(sampleAxes[0])-.14)/.86);
    controls.handbrake=enabled&&(keys.has('Space')||counts.handbrake>0||!!pad?.buttons[0]?.pressed);
    if(previousValues[0]!==values[0]||previousValues[1]!==values[1]||previousValues[2]!==values[2]||oldHandbrake!==controls.handbrake)onChange(controls);
    return controls;
  }
  return {clear,pollGamepad,setEnabled(value){enabled=value;if(!value)clear();},setOptions(o){autoThrottle=o.autoThrottle;touch=o.touch??touch;document.body.classList.toggle('touch',touch);document.querySelector('#touch-throttle').hidden=autoThrottle;},get touch(){return touch;},sample,dispose(){clear();for(const remove of listeners)remove();}};
}
