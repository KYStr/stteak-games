export function createInput({onPause,onReset,onGesture}){
  const keys=new Set(),pointers=new Map();let touch=matchMedia('(pointer:coarse)').matches,autoThrottle=true,enabled=false;
  const clear=()=>{keys.clear();pointers.clear();document.querySelectorAll('[data-control]').forEach(e=>e.classList.remove('pressed'));};
  function down(e){if(e.target.closest('input,select,textarea')||document.querySelector('dialog[open]'))return;const key=e.code;if(['ArrowUp','ArrowDown','ArrowLeft','ArrowRight','Space','KeyW','KeyA','KeyS','KeyD','Escape','KeyR'].includes(key))e.preventDefault();if(key==='Escape'&&!e.repeat){onPause();return;}if(!enabled)return;if(key==='KeyR'&&!e.repeat)onReset();keys.add(key);onGesture();}
  function up(e){keys.delete(e.code);}
  addEventListener('keydown',down);addEventListener('keyup',up);
  for(const button of document.querySelectorAll('[data-control]')){
    button.addEventListener('pointerdown',e=>{if(!enabled)return;e.preventDefault();touch=true;button.setPointerCapture(e.pointerId);pointers.set(e.pointerId,button.dataset.control);button.classList.add('pressed');onGesture();});
    const end=e=>{pointers.delete(e.pointerId);if(![...pointers.values()].includes(button.dataset.control))button.classList.remove('pressed');};
    button.addEventListener('pointerup',end);button.addEventListener('pointercancel',end);button.addEventListener('lostpointercapture',end);
  }
  return {clear,setEnabled(value){enabled=value;if(!value)clear();},setOptions(o){autoThrottle=o.autoThrottle;touch=o.touch??touch;document.body.classList.toggle('touch',touch);document.querySelector('#touch-throttle').hidden=autoThrottle;},get touch(){return touch;},sample(){const has=(k,c)=>keys.has(k)||[...pointers.values()].includes(c);return {throttle:enabled&&(has('KeyW','throttle')||keys.has('ArrowUp')||(touch&&autoThrottle))?1:0,brake:enabled&&(has('KeyS','brake')||keys.has('ArrowDown'))?1:0,steer:enabled?((has('KeyD','right')||keys.has('ArrowRight')?1:0)-(has('KeyA','left')||keys.has('ArrowLeft')?1:0)):0,handbrake:enabled&&has('Space','handbrake')};},dispose(){clear();removeEventListener('keydown',down);removeEventListener('keyup',up);}};
}
