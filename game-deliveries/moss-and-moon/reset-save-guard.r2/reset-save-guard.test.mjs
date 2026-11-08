import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import {createState,transact} from './working/public/games/moss-and-moon/rules.js';
import {saveSlot,loadSlot,storageKeys} from './working/public/games/moss-and-moon/storage.js';
const source=fs.readFileSync(process.env.MOSS_MAIN || new URL('./working/public/games/moss-and-moon/main.js',import.meta.url),'utf8');
const persist=source.match(/^function persist\(.*$/m)?.[0];
const branch=source.match(/else if\('resetConfirm'in d\)\{([^\n]*)\}\n/)?.[1];
assert.ok(persist&&branch);
function setup(slot,stage){
 const map=new Map();let fail=null;
 const storage={getItem:k=>map.get(k)??null,setItem(k,v){if(k===fail)throw Error('quota');map.set(k,String(v))},removeItem:k=>map.delete(k)};
 const old=createState(slot),other=createState(slot===1?2:1);saveSlot(old,storage);saveSlot(other,storage);
 const original=transact(old,{type:'sleep'}).state;fail=stage?storageKeys(slot)[stage]:null;
 const notices=[],effects=[];const status={};let context;
 context={state:original,slot,selected:7,createState,saveSlot(candidate){assert.equal(context.state,original,'state must not change before persistence');return saveSlot(candidate,storage)},$:()=>status,notice:(...a)=>notices.push(a),closePanel:()=>effects.push('close'),render:()=>effects.push('render'),resume:()=>effects.push('resume')};
 vm.createContext(context);vm.runInContext(persist+'\nfunction reset(){'+branch+'}',context);
 return {context,original,old,other,notices,effects,storage,status,clearFailure(){fail=null},run(){vm.runInContext('reset()',context,{timeout:1000})}};
}
test('pending/backup/current failure preserves exact memory, committed garden and other slot',()=>{
 for(const slot of [1,2])for(const stage of ['pending','backup','current']){
  const h=setup(slot,stage);h.run();assert.equal(h.context.state,h.original);assert.equal(h.context.selected,7);
  assert.deepEqual(loadSlot(slot,h.storage).state,h.old);assert.deepEqual(loadSlot(h.other.slot,h.storage).state,h.other);
  assert.deepEqual(h.effects,[]);assert.equal(h.notices.some(n=>n[0]==='新的庭園，新的第一天。'),false);assert.match(h.status.textContent,/無法保存/);
 }
});
test('successful reset commits before replacing state, keeping the other garden',()=>{
 for(const slot of [1,2]){const h=setup(slot,null);h.run();assert.notEqual(h.context.state,h.original);assert.deepEqual(h.context.state,createState(slot));assert.deepEqual(loadSlot(slot,h.storage).state,h.context.state);assert.deepEqual(loadSlot(h.other.slot,h.storage).state,h.other);assert.equal(h.context.selected,-1);assert.deepEqual(h.effects,['close','render','resume']);}
});
test('retry after failed reset commits fresh state only when persistence recovers',()=>{
 const h=setup(1,'current');h.run();assert.equal(h.context.state,h.original);h.clearFailure();h.run();assert.deepEqual(h.context.state,createState(1));assert.deepEqual(loadSlot(1,h.storage).state,h.context.state);assert.equal(h.notices.filter(n=>n[0]==='新的庭園，新的第一天。').length,1);
});
