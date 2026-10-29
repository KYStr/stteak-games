export function createInput({onPause,onReset,onGesture}){
  const keys=new Set(),pointers=new Map(),pointerListeners=[];let touch=matchMedia('(pointer:coarse)').matches,autoThrottle=true,enabled=false,disposed=false; // 保留監聽器參照與已釋放狀態，避免舊控制器再次接收輸入。
  const clear=()=>{keys.clear();pointers.clear();document.querySelectorAll('[data-control]').forEach(e=>e.classList.remove('pressed'));};
  function down(e){if(e.target.closest('input,select,textarea')||document.querySelector('dialog[open]'))return;const key=e.code;if(['ArrowUp','ArrowDown','ArrowLeft','ArrowRight','Space','KeyW','KeyA','KeyS','KeyD','Escape','KeyR'].includes(key))e.preventDefault();if(key==='Escape'&&!e.repeat){onPause();return;}if(!enabled)return;if(key==='KeyR'&&!e.repeat)onReset();keys.add(key);onGesture();}
  function up(e){keys.delete(e.code);}
  addEventListener('keydown',down);addEventListener('keyup',up);
  for(const button of document.querySelectorAll('[data-control]')){
    const start=e=>{if(!enabled)return;e.preventDefault();touch=true;button.setPointerCapture(e.pointerId);pointers.set(e.pointerId,button.dataset.control);button.classList.add('pressed');onGesture();}; // 使用具名參照，dispose 才能解除同一個 pointerdown 函式。
    const end=e=>{pointers.delete(e.pointerId);if(![...pointers.values()].includes(button.dataset.control))button.classList.remove('pressed');};
    button.addEventListener('pointerdown',start);pointerListeners.push({button,start,end}); // 記錄每個按鈕的完整監聽生命週期。
    button.addEventListener('pointerup',end);button.addEventListener('pointercancel',end);button.addEventListener('lostpointercapture',end);
  }
  return {clear,setEnabled(value){if(disposed)return;enabled=value;if(!value)clear();},setOptions(o){autoThrottle=o.autoThrottle;touch=o.touch??touch;document.body.classList.toggle('touch',touch);document.querySelector('#touch-throttle').hidden=autoThrottle;},get touch(){return touch;},sample(){const has=(k,c)=>keys.has(k)||[...pointers.values()].includes(c);return {throttle:enabled&&(has('KeyW','throttle')||keys.has('ArrowUp')||(touch&&autoThrottle))?1:0,brake:enabled&&(has('KeyS','brake')||keys.has('ArrowDown'))?1:0,steer:enabled?((has('KeyD','right')||keys.has('ArrowRight')?1:0)-(has('KeyA','left')||keys.has('ArrowLeft')?1:0)):0,handbrake:enabled&&has('Space','handbrake')};},dispose(){ // setEnabled 對已釋放實例直接返回，防止外部再啟用舊輸入。
    if(disposed)return;disposed=true;enabled=false; // 釋放必須可重複呼叫，並讓自動油門與重啟舊實例保持停用。
    clear();removeEventListener('keydown',down);removeEventListener('keyup',up); // 保留既有狀態清理及鍵盤解除行為。
    for(const {button,start,end} of pointerListeners){ // 只解除本實例在建立時註冊的指標監聽器。
      button.removeEventListener('pointerdown',start); // 停止舊按鈕再次寫入狀態或觸發手勢。
      button.removeEventListener('pointerup',end);button.removeEventListener('pointercancel',end);button.removeEventListener('lostpointercapture',end); // 結束事件也不能殘留於舊按鈕。
    }
    pointerListeners.length=0; // 解除後不再保留按鈕與事件函式參照。
  }};
}
