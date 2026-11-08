import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
const source=fs.readFileSync(process.env.MOSS_MAIN || new URL('./overlay/public/games/moss-and-moon/main.js',import.meta.url),'utf8');
// Evaluate the exact production persist function and slot branch, without loading
// renderer, browser, audio, timers, or player storage. Only dependencies are doubles.
const persist=source.match(/^function persist\(\).*$/m)?.[0];
const branch=source.match(/else if\('slot'in d\)\{([^\n]*)\}\n/)?.[1];
assert.ok(persist && branch, 'production entry points must remain locatable');
function run(ok, target=2){
 const original={slot:1,day:9,unsaved:true}; const loadedState={slot:target,day:2};
 const calls=[];const status={};
 const c={state:original,slot:1,d:{slot:String(target)},loaded:null,selected:4,started:true,
  saveSlot(s){calls.push(['save',s]);return {ok,error:ok?null:'quota exceeded'}},
  $(selector){assert.equal(selector,'#save-status');return status},
  notice(...args){calls.push(['notice',...args])},
  loadSlot(s){calls.push(['load',s]);return {state:loadedState}},
  createState(){throw Error('unexpected fallback')},closePanel(){calls.push(['close'])},
  render(){calls.push(['render'])},start(){calls.push(['start'])},resume(){calls.push(['resume'])}};
 vm.createContext(c);vm.runInContext(persist+'\nfunction click(){'+branch+'}\nclick();',c,{timeout:1000});
 return {c,calls,original,loadedState,status};
}
test('failed save preserves exact unsaved garden and does not load or close',()=>{
 const {c,calls,original,status}=run(false);
 assert.equal(c.state,original); assert.equal(c.slot,1);assert.equal(c.selected,4);
 assert.equal(calls.some(x=>['load','close','render','resume','start'].includes(x[0])),false);
 assert.match(status.textContent,/無法保存/);
 assert.equal(calls.filter(x=>x[0]==='notice' && x[2]===true).length,1);
});
test('successful save permits one switch after persistence',()=>{
 const {c,calls,loadedState,status}=run(true);
 assert.equal(c.state,loadedState);assert.equal(c.slot,2);assert.equal(c.selected,-1);
 assert.deepEqual(calls.slice(0,2).map(x=>x[0]),['save','load']);
 assert.equal(calls.filter(x=>x[0]==='load').length,1);assert.match(status.textContent,/已保存/);
});
test('failed same-slot click also preserves in-memory progress',()=>{
 const {c,calls,original}=run(false,1);assert.equal(c.state,original);
 assert.equal(calls.some(x=>x[0]==='load'),false);
});
