// A slow external controller must pause through the normal UI before leaving
// thrust held unattended. No run state, clocks, health or progression are changed.
export function controllerWatchdog(){
 const control=window.testControllerWatchdog={last:performance.now(),paused:false,events:[]};
 window.testControllerHeartbeat=()=>{control.last=performance.now();if(document.querySelector('#overlay')?.hidden)control.paused=false};
 setInterval(()=>{const now=performance.now(),overlay=document.querySelector('#overlay'),button=document.querySelector('#pause-button');
  if(control.paused||!overlay?.hidden||!button||now-control.last<1500)return;
  const s=window.__orbitDiagnostics?.snapshot();if(s?.status!=='running'||s.modal!==null)return;
  control.events.push({reason:'controller-delay',gapMs:now-control.last,elapsed:s.elapsed,room:s.roomId});control.paused=true;button.click();
 },250);
}
