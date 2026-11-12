import {test} from 'node:test';
import assert from 'node:assert/strict';
import {createRunner,animateRunner,createSecurity,animateSecurity,disposeInstance} from '../../games/signal-zero/src/models.js';
function close(a,b){assert.ok(Math.abs(a-b)<1e-10,`${a} != ${b}`)}
test('buffered animation tick preserves native mixer time and every bone pose',()=>{
 const actual=createRunner(),reference=createRunner(),state={animation:'run',facing:1},timing=new Float64Array(2);
 try{
  animateRunner(actual,state,0);animateRunner(reference,state,0);
  for(const dt of [.016,.033,.1,.004,0,.05,.023]){
   timing[0]=dt;animateRunner(actual,state,timing);reference.userData.mixer.timeScale=1;reference.userData.mixer.update(dt);
   close(actual.userData.mixer.time,reference.userData.mixer.time);
   const a=actual.userData.skeleton.bones,b=reference.userData.skeleton.bones;
   for(let i=0;i<a.length;i++)for(const key of ['x','y','z','w']){if(key!=='w')close(a[i].position[key],b[i].position[key]);close(a[i].quaternion[key],b[i].quaternion[key]);}
  }
 }finally{disposeInstance(actual);disposeInstance(reference)}
});
test('cached security appearance preserves scan, rotor, direction and disabled transitions',()=>{
 for(const type of ['camera','drone']){
  const group=createSecurity(type),state={state:'normal',dir:1,scanOffset:.3};
  try{
   for(const [disabled,dir,alert]of [[false,1,false],[false,-1,true],[true,-1,false],[false,1,false]]){
    state.dir=dir;state.state=alert?'tracking':'normal';animateSecurity(group,state,.025,disabled,2);
    close(group.rotation.y,dir<0?Math.PI:0);
    const data=group.userData;assert.equal(data.indicator.emissiveIntensity,disabled?0:alert?1.8:1.3);
    if(type==='camera'){close(data.moving.rotation.z,disabled?-.7:Math.atan(-.28)+.3*dir);close(data.moving.quaternion.z,Math.sin(data.moving.rotation.z/2));}
    else{close(data.moving.position.y,disabled?-.08:Math.sin(5.6)*.035);close(data.moving.rotation.z,disabled?-.35:Math.atan(-.23));for(const rotor of data.rotors)close(rotor.quaternion.y,Math.sin(rotor.rotation.y/2));}
   }
  }finally{disposeInstance(group)}
 }
 const guard=createSecurity('guard');assert.ok(guard.userData.animationState);disposeInstance(guard);
});
