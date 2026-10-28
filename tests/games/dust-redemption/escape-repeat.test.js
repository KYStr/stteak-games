import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';

// Evaluate exact production handler and transition function text. The DOM,
// audio and field routing are explicit substitutes; this is not browser QA.
function harness(mode='playing',saved=null){
 const source=readFileSync(new URL('../../../games/dust-redemption/game.js',import.meta.url),'utf8');
 function section(start,end){assert.equal(source.split(start).length,2,`unique ${start}`);const i=source.indexOf(start),j=source.indexOf(end,i);assert.ok(j>i);return source.slice(i,j)}
 const classList=()=>{const set=new Set(['hidden']);return{add:k=>set.add(k),remove:k=>set.delete(k),contains:k=>set.has(k),toggle(k,v){if(v)set.add(k);else set.delete(k)}}};
 const calls={pause:0,resume:0,unlock:0,interact:0,reload:0,vault:0,item:0,rotations:[],states:[],fieldClose:0,storage:0};
 const listeners={},profile={activeRun:null,wallet:123},run={missionId:'test-only'},knob={style:{}};
 const context={mode,previousMode:null,pauseReturn:saved,lastTime:5,profile,run,mouseActive:true,keys:new Set(['KeyD']),firing:true,aiming:true,joystick:{x:1,y:0},overlay:{innerHTML:'original',classList:classList(),querySelector:()=>({focus(){}})},document:{body:{classList:classList()}},canvas:{focus(){}},$:()=>({querySelector:()=>knob}),audio:{pause(){calls.pause++},resume(){calls.resume++},unlock(){calls.unlock++}},bridge:{state:v=>calls.states.push(v)},window:{addEventListener:(type,fn)=>listeners[type]=fn},queueMicrotask:fn=>fn(),showHub(){context.mode='hub'},interact(){calls.interact++},reloadWeapon(){calls.reload++},vault(){calls.vault++},useItem(){calls.item++},world:{rotate:v=>calls.rotations.push(v)},localStorage:{setItem(){calls.storage++},getItem(){calls.storage++}},updateHud(){},console};
 vm.createContext(context);
 const fieldClose=section('    close() {\n      mode = "playing";','    effect: applyFieldEffect,');
 vm.runInContext(section('function button(', 'function toast(')+section('function closeSheet() {','function failure(')+section('window.addEventListener("keydown",','function syncMouseButtons(')+'\nglobalThis.closeField=({'+fieldClose+'}).close;',context);
 context.field={handle(action){assert.equal(action,'field-close');calls.fieldClose++;context.closeField()}};
 const key=(code='Escape',repeat=false,tagName='CANVAS')=>{let prevented=false;listeners.keydown({code,repeat,target:{tagName},preventDefault(){prevented=true}});return prevented};
 const up=(code='Escape')=>listeners.keyup({code,target:{tagName:'CANVAS'}});
 return{context,calls,key,up,profile,run};
}
const saved=mode=>({mode,html:'prior '+mode,hidden:mode==='playing'||mode==='town-walk'});
for(const mode of ['playing','town-walk','hub','dead','result'])test(`${mode}: one Escape press pauses once; held repeats cannot resume`,()=>{
 const h=harness(mode);assert.equal(h.key(),true);assert.equal(h.context.mode,'paused');for(let n=0;n<10;n++)assert.equal(h.key('Escape',true),true);assert.equal(h.context.mode,'paused');assert.deepEqual(h.calls.states,['paused']);assert.equal(h.calls.pause,1);assert.equal(h.calls.resume,0);assert.equal(h.context.keys.size,0);assert.equal(h.context.firing,false);assert.equal(h.context.aiming,false);assert.equal(h.context.joystick.x,0);
});
for(const mode of ['playing','town-walk'])test(`paused return to ${mode}: repeated Escape does not re-pause`,()=>{
 const h=harness('paused',saved(mode));h.key();assert.equal(h.context.mode,mode);for(let n=0;n<5;n++)h.key('Escape',true);assert.equal(h.context.mode,mode);assert.deepEqual(h.calls.states,['running']);
});
for(const mode of ['help','settings'])for(const parent of ['playing','paused'])test(`${mode} exits only one layer to ${parent}, even while Escape repeats`,()=>{
 const record={...saved(parent),parent:parent==='paused'?saved('playing'):null};const h=harness(mode,record);h.key();assert.equal(h.context.mode,parent);const audioCount=h.calls.resume;for(let n=0;n<5;n++)h.key('Escape',true);assert.equal(h.context.mode,parent);assert.equal(h.calls.resume,audioCount);assert.deepEqual(h.calls.states,[]);
});
test('settings over help preserves the parent sheet across held repeats',()=>{
 const h=harness('settings',{...saved('help'),parent:{...saved('paused'),parent:saved('playing')}});h.key();assert.equal(h.context.mode,'help');h.key('Escape',true);h.key('Escape',true);assert.equal(h.context.mode,'help');assert.equal(h.context.pauseReturn.mode,'paused');
});
test('field close uses the actual close callback once; held repeat cannot pause resumed play',()=>{
 const h=harness('field');h.key();assert.equal(h.context.mode,'playing');h.key('Escape',true);h.key('Escape',true);assert.equal(h.context.mode,'playing');assert.equal(h.calls.fieldClose,1);assert.deepEqual(h.calls.states,[]);
});
test('keyup and a deliberate new Escape press still resume once',()=>{
 const h=harness();h.key();h.key('Escape',true);h.up();assert.equal(h.context.mode,'paused');h.key();assert.equal(h.context.mode,'playing');h.key('Escape',true);assert.equal(h.context.mode,'playing');assert.deepEqual(h.calls.states,['paused','running']);
});
for(const tag of ['INPUT','SELECT'])test(`${tag} keeps its original Escape exemption`,()=>{
 const h=harness();assert.equal(h.key('Escape',false,tag),false);assert.equal(h.key('Escape',true,tag),false);assert.equal(h.context.mode,'playing');assert.deepEqual(h.calls.states,[]);
});
for(const mode of ['loading','title'])test(`${mode} stays unchanged on fresh and repeated Escape`,()=>{
 const h=harness(mode);h.key();h.key('Escape',true);assert.equal(h.context.mode,mode);assert.deepEqual(h.calls.states,[]);
});
test('non-Escape movement repeat retains held key and release behavior',()=>{
 const h=harness();h.context.keys.clear();h.key('KeyD');h.key('KeyD',true);assert.equal(h.context.keys.has('KeyD'),true);assert.equal(h.calls.unlock,1);h.up('KeyD');assert.equal(h.context.keys.has('KeyD'),false);assert.equal(h.context.mode,'playing');
});
test('other action shortcuts keep their existing one-action-per-fresh-press semantics',()=>{
 const h=harness();for(const code of ['KeyE','KeyR','Space','KeyF','KeyQ','KeyC']){h.key(code);h.key(code,true);h.up(code)}assert.equal(h.calls.interact,1);assert.equal(h.calls.reload,1);assert.equal(h.calls.vault,1);assert.equal(h.calls.item,1);assert.deepEqual(h.calls.rotations,[-1,1]);assert.equal(h.context.mode,'playing');
});
test('pause/repeat/resume does not mutate the profile/run or access storage',()=>{
 const h=harness();const before=JSON.stringify({profile:h.profile,run:h.run});h.key();for(let n=0;n<30;n++)h.key('Escape',true);h.up();h.key();assert.equal(JSON.stringify({profile:h.profile,run:h.run}),before);assert.equal(h.calls.storage,0);assert.equal(h.context.mode,'playing');
});
