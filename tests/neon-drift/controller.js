// Acceptance-only input driver. No race-state writes or shortcuts are shipped in the game.
import {TRACKS,CARS,PRACTICE_TRACK,resolveTourTrack} from '../../games/neon-drift/src/content.js';
import {driveInput,driftInput} from '../games/neon-drift/driver.js';
window.__pilot=false;window.__bot="competent";let randomSeed=12345,lastRandom=-1,randomControls=null;const random=()=>((randomSeed=(Math.imul(randomSeed,1664525)+1013904223)>>>0)/4294967296);
const buttons=Array.from({length:17},()=>({pressed:false,touched:false,value:0}));
window.__pad={connected:true,mapping:'standard',index:0,id:'Acceptance controller',axes:[0,0,0,0],buttons};
const pads=[window.__pad];Object.defineProperty(navigator,'getGamepads',{configurable:true,value:()=>pads});
function control(){
  if(window.__pilot&&window.neonDrift){const s=neonDrift.snapshot({renderer:false});if(s.phase==='running'){
    const state={...s,car:CARS.find(c=>c.id===s.carId),track:s.mode==='tutorial'?PRACTICE_TRACK:s.tour?resolveTourTrack(s.trackId,s.seed):TRACKS.find(t=>t.id===s.trackId)};
    if(state.track){let controls=s.mode==='drift'||s.mode==='tutorial'?driftInput(state,window.__target??28):driveInput(state,23);if(window.__bot==='random'){const interval=Math.floor(s.elapsed*2);if(interval!==lastRandom){lastRandom=interval;randomControls={throttle:random(),brake:random()*.5,steer:random()*2-1,handbrake:random()>.5};}controls=randomControls;}
      __pad.axes[0]=Math.abs(controls.steer)<.001?0:Math.sign(controls.steer)*(.14+Math.abs(controls.steer)*.86);
      for(const [id,v] of [[7,controls.throttle],[6,controls.brake],[0,Number(controls.handbrake)]]){buttons[id].value=v;buttons[id].pressed=v>.5;}
    }
  }}else{__pad.axes[0]=0;for(const id of [0,6,7]){buttons[id].value=0;buttons[id].pressed=false;}}
  requestAnimationFrame(control);
}
requestAnimationFrame(control);
