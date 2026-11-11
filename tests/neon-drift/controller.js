// Acceptance-only input driver. No race-state writes or shortcuts are shipped in the game.
import {TRACKS,CARS} from '../../games/neon-drift/src/content.js';
import {driveInput,driftInput} from '../games/neon-drift/driver.js';
window.__pilot=false;
const buttons=Array.from({length:17},()=>({pressed:false,touched:false,value:0}));
window.__pad={connected:true,mapping:'standard',index:0,id:'Acceptance controller',axes:[0,0,0,0],buttons};
Object.defineProperty(navigator,'getGamepads',{value:()=>[window.__pad]});
function control(){
  if(window.__pilot&&window.neonDrift){const s=neonDrift.snapshot({renderer:false});if(s.phase==='running'){
    const state={...s,car:CARS.find(c=>c.id===s.carId),track:TRACKS.find(t=>t.id===s.trackId)};
    if(state.track){const controls=s.mode==='drift'?driftInput(state,28):driveInput(state,23);
      __pad.axes[0]=Math.abs(controls.steer)<.001?0:Math.sign(controls.steer)*(.14+Math.abs(controls.steer)*.86);
      for(const [id,v] of [[7,controls.throttle],[6,controls.brake],[0,Number(controls.handbrake)]]){buttons[id].value=v;buttons[id].pressed=v>.5;}
    }
  }}else{__pad.axes[0]=0;for(const id of [0,6,7]){buttons[id].value=0;buttons[id].pressed=false;}}
  requestAnimationFrame(control);
}
requestAnimationFrame(control);
