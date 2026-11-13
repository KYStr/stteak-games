import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import {readFileSync} from 'node:fs';
import {SAVE_KEY,BACKUP_KEY,loadSave} from '../../../games/neon-drift/src/storage.js';
import {SESSION_KEY} from '../../../games/neon-drift/src/session.js';
const source=readFileSync(new URL('../../../games/neon-drift/src/main.js',import.meta.url),'utf8');
const deletion=source.slice(source.indexOf('function deleteAllLocalProgress(){'),source.indexOf('function selectedGhost'));
function fixture(failure){
  const data=new Map([SESSION_KEY,BACKUP_KEY,SAVE_KEY].map(key=>[key,'{}']));const removed=[],notices=[];let applications=0,menus=0;
  const localStorage={removeItem(key){removed.push(key);if(failure?.key===key&&failure?.operation==='remove')throw Error('blocked');data.delete(key);},getItem(key){if(failure?.key===key&&failure?.operation==='read')throw Error('blocked');return data.get(key)??null;}};
  const context=vm.createContext({localStorage,SESSION_KEY,BACKUP_KEY,SAVE_KEY,pendingSession:{race:{}},save:{settings:{volume:0}},settings:{volume:0},trackId:'skyway',carId:'phantom',mode:'drift',loadSave:()=>loadSave(localStorage),applySettings:()=>applications++,menu:()=>menus++,toast:s=>notices.push(s)});
  vm.runInContext(deletion,context);return {context,data,removed,notices,run(){vm.runInContext('deleteAllLocalProgress()',context);},get applications(){return applications;},get menus(){return menus;}};
}
test('full reset verifies all three keys, clears in-memory Continue and immediately applies defaults',()=>{
  const f=fixture();f.run();assert.deepEqual(f.removed,[SESSION_KEY,BACKUP_KEY,SAVE_KEY]);assert.equal(f.data.size,0);assert.equal(f.context.pendingSession,null);assert.equal(f.context.settings.volume,.55);assert.equal(f.context.settings.musicVolume,.28);assert.equal(f.context.save.tutorialComplete,false);assert.equal(Object.keys(f.context.save.records).length,0);assert.equal(f.context.trackId,'harbor');assert.equal(f.context.carId,'comet');assert.equal(f.applications,1);assert.equal(f.menus,1);assert.match(f.notices[0],/未完成比賽已清除/);
});
for(const key of [SESSION_KEY,BACKUP_KEY,SAVE_KEY])for(const operation of ['read','remove'])test(`partial reset ${operation} denial for ${key} remains visible and does not announce success`,()=>{
  const f=fixture({key,operation});f.run();assert.deepEqual(f.removed,[SESSION_KEY,BACKUP_KEY,SAVE_KEY]);assert.equal(f.applications,0);assert.equal(f.menus,0);assert.ok(f.context.pendingSession);assert.match(f.notices[0],/未能清除/);assert.doesNotMatch(f.notices[0],/已清除/);
});
