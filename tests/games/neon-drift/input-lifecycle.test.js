import test from 'node:test';
import assert from 'node:assert/strict';
import {createInput} from '../../../games/neon-drift/src/input.js';

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
