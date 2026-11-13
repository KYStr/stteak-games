import test from 'node:test';
import assert from 'node:assert/strict';
import {createInput,getControlsNumericView,CONTROL_VALUE as C} from '../../../games/neon-drift/src/input.js';

function fixture({dialog=false,editable=false}={}){
  const listeners=new Map(),old={};
  const element={addEventListener(name,fn){listeners.set(name,fn);},removeEventListener(){}};
  for(const key of ['window','document','matchMedia'])old[key]=globalThis[key];
  globalThis.window=element;
  globalThis.document={...element,querySelector:()=>dialog?{}:null,querySelectorAll:()=>[]};
  globalThis.matchMedia=()=>({matches:false});
  let pauses=0,prevented=0;
  const input=createInput({onPause:()=>pauses++,onReset(){},onGesture(){}});
  return {input,send(repeat){listeners.get('keydown')({code:'Escape',repeat,target:{closest:()=>editable?{}:null},preventDefault(){prevented++;}});},get pauses(){return pauses;},get prevented(){return prevented;},close(){input.dispose();for(const key of Object.keys(old)){if(old[key]===undefined)delete globalThis[key];else globalThis[key]=old[key];}}};
}
for(const target of [{dialog:true},{editable:true},{dialog:true,editable:true}])test(`repeated Escape is consumed before target/dialog guards ${JSON.stringify(target)}`,()=>{
  const f=fixture(target);try{f.send(true);assert.equal(f.prevented,1);assert.equal(f.pauses,0);f.send(false);assert.equal(f.prevented,1);assert.equal(f.pauses,0);}finally{f.close();}
});
test('distinct Escape presses retain their own pause actions',()=>{
  const f=fixture();try{f.send(false);f.send(true);f.send(false);assert.equal(f.pauses,2);assert.equal(f.prevented,1);}finally{f.close();}
});

test('control numeric storage retains one view with the existing enumerable number interface',()=>{
  const f=fixture();try{const controls=f.input.sample(),view=getControlsNumericView(controls);assert.ok(view instanceof Float64Array);assert.equal(view,getControlsNumericView(controls));controls.throttle=.375;controls.brake=.125;controls.steer=-.123456789;assert.equal(view[C.throttle],.375);assert.equal(view[C.brake],.125);assert.equal(view[C.steer],-.123456789);assert.deepEqual(JSON.parse(JSON.stringify(controls)),{throttle:.375,brake:.125,steer:-.123456789,handbrake:false});assert.equal(f.input.sample(),controls);}finally{f.close();}
});
