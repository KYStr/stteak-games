export function gamepadAxis(value){const n=Number.isFinite(value)?value:0;return Math.abs(n)<.14?0:Math.sign(n)*Math.min(1,(Math.abs(n)-.14)/.86);}
export function createInput({onPause,onReset,onGesture}){
  const keys=new Set(),pointers=new Map(),listeners=[];let touch=matchMedia('(pointer:coarse)').matches,autoThrottle=true,enabled=false,previousStart=false,previousReset=false;
  const listen=(el,name,handler)=>{el.addEventListener(name,handler);listeners.push(()=>el.removeEventListener(name,handler));};
  const clear=()=>{keys.clear();for(const [id,button] of pointers){try{if(button.hasPointerCapture(id))button.releasePointerCapture(id);}catch{}}pointers.clear();document.querySelectorAll('[data-control]').forEach(e=>e.classList.remove('pressed'));};
  function down(e){if(e.code==='Escape'&&e.repeat){e.preventDefault();return;}if(e.target.closest('input,select,textarea')||document.querySelector('dialog[open]'))return;const key=e.code;if(enabled&&['ArrowUp','ArrowDown','ArrowLeft','ArrowRight','Space','KeyW','KeyA','KeyS','KeyD','Escape','KeyR'].includes(key))e.preventDefault();if(key==='Escape'&&!e.repeat){onPause();return;}if(!enabled)return;if(key==='KeyR'&&!e.repeat)onReset();keys.add(key);onGesture();}
  listen(window,'keydown',down);listen(window,'keyup',e=>keys.delete(e.code));
  listen(document,'pointerdown',()=>onGesture());
  for(const button of document.querySelectorAll('[data-control]')){
    listen(button,'pointerdown',e=>{if(!enabled)return;e.preventDefault();touch=true;button.setPointerCapture(e.pointerId);pointers.set(e.pointerId,button);button.classList.add('pressed');onGesture();});
    const end=e=>{pointers.delete(e.pointerId);if(![...pointers.values()].includes(button))button.classList.remove('pressed');};
    for(const name of ['pointerup','pointercancel','lostpointercapture'])listen(button,name,end);
  }
  function pollGamepad(){
    const pad=Array.from(navigator.getGamepads?.()||[]).find(p=>p?.connected&&p.mapping==='standard');
    const start=!!pad?.buttons[9]?.pressed,reset=!!pad?.buttons[3]?.pressed;
    if(start&&!previousStart){onGesture();onPause();}if(reset&&!previousReset&&enabled)onReset();previousStart=start;previousReset=reset;return pad;
  }
  return {clear,pollGamepad,setEnabled(value){enabled=value;if(!value)clear();},setOptions(o){autoThrottle=o.autoThrottle;touch=o.touch??touch;document.body.classList.toggle('touch',touch);document.querySelector('#touch-throttle').hidden=autoThrottle;},get touch(){return touch;},sample(){
    const has=(k,c)=>keys.has(k)||[...pointers.values()].some(b=>b.dataset.control===c);
    const pad=Array.from(navigator.getGamepads?.()||[]).find(p=>p?.connected&&p.mapping==='standard');
    if(!enabled)return {throttle:0,brake:0,steer:0,handbrake:false};
    return {throttle:Math.max(has('KeyW','throttle')||keys.has('ArrowUp')||(touch&&autoThrottle)?1:0,pad?.buttons[7]?.value||0),brake:Math.max(has('KeyS','brake')||keys.has('ArrowDown')?1:0,pad?.buttons[6]?.value||0),steer:has('KeyA','left')||has('KeyD','right')||keys.has('ArrowLeft')||keys.has('ArrowRight')?((has('KeyD','right')||keys.has('ArrowRight')?1:0)-(has('KeyA','left')||keys.has('ArrowLeft')?1:0)):gamepadAxis(pad?.axes[0]),handbrake:has('Space','handbrake')||!!pad?.buttons[0]?.pressed};
  },dispose(){clear();for(const remove of listeners)remove();}};
}
