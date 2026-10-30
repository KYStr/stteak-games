import assert from 'node:assert/strict';
import {mainHarness} from './main-continuity-fixture.mjs';
export const plain=v=>JSON.parse(JSON.stringify(v));
export function controlledDisk(initial){const map=new Map();if(initial!==undefined)map.set('aetherwake-save',typeof initial==='string'?initial:JSON.stringify(initial));return {failWrites:false,writes:[],getItem:k=>map.get(k)??null,setItem(k,v){if(this.failWrites)throw Error('fixture quota');map.set(k,String(v));this.writes.push({key:k,value:String(v)});},removeItem:k=>map.delete(k)}};
export function drive(h,control){
 const i=h.api.get().input,joy=h.get('#joystick');const point={pointerId:21,pointerType:'touch',button:0,buttons:1,clientX:50+32*(control.x||0),clientY:50+32*(control.z||0)};
 joy.emit(i.joyPointer===null?'pointerdown':'pointermove',point);
 const held=i.keys.has('ShiftLeft');if(!!control.brake!==held)h.win.emit(control.brake?'keydown':'keyup',{code:'ShiftLeft',target:h.get('#world')});
 if(control.glide){h.key('Space');h.win.emit('keyup',{code:'Space'});}
 h.advance(1000/60+1e-6);
}
// Adapt the retained ordinary-control deterministic pilot. Only observations
// and joystick/keyboard event doubles are used; no simulation state teleport,
// injected counters, artificial recovery or completion shortcut.
export async function fullJourney({disk=controlledDisk(),stopAfterStation=4,onFrame,project}={}){
 const h=await mainHarness({disk,...(project?{project}:{})});
 const root=project||process.env.AETHER_PROJECT||new URL('../../../',import.meta.url).pathname;
 const {steer}=await import(new URL('tests/games/aetherwake/flight-test-pilot.mjs','file://'+root.replace(/\/$/,'')+'/'));
 const {islandById}=await import(new URL('games/aetherwake/src/world.js','file://'+root.replace(/\/$/,'')+'/'));
 h.get('#seed').value=20261028;h.click('#start');
 const pilot={get player(){return h.api.get().sim.player},step:control=>drive(h,control)};
 const stages=[];let frames=0,lastStation=0;
 while(frames++<1800*60){
  const a=h.api.get(),s=a.sim,p=s.player;
  if(s.status==='complete')break;
  if(s.activated.length!==lastStation){lastStation=s.activated.length;stages.push({station:lastStation,elapsed:s.elapsed,checkpoint:s.checkpoint,stored:JSON.parse(disk.getItem('aetherwake-save'))});if(lastStation>=stopAfterStation)break;}
  if(a.modalKind==='dialogue'){h.action('繼續航程 / 跳過');continue;}
  assert.equal(s.status,'running');assert.equal(s.state.activeChallenge,null);assert.equal(s.state.trackedHint,null);
  const target=s.state.surveyHint;const island=islandById(s.state.objective.islandId);const d=Math.hypot(p.x-island.x,p.z-island.z);
  if(!target&&p.grounded&&d<8){h.key('KeyE');h.win.emit('keyup',{code:'KeyE'});continue;}
  steer(pilot,target||island,{landing:!target});
  assert.equal(s.stalls,0,'informed pilot must not conceal recovery');onFrame?.(h,frames);
 }
 const s=h.api.get().sim;assert.ok(frames<1800*60,'main journey timeout');assert.deepEqual(h.errors,[]);
 return {h,disk,frames,stages,summary:{status:s.status,activated:plain(s.activated),mainSamples:plain(s.state.mainSamples),checkpoint:s.checkpoint,elapsed:s.elapsed,stalls:s.stalls,modalKind:h.api.get().modalKind,records:plain(s.saveData().records)}};
}
