import test from 'node:test';
import assert from 'node:assert/strict';
import {DriveAudio} from '../../../games/neon-drift/src/audio.js';
const node=()=>({connections:[],gain:{value:1,setValueAtTime(v){this.value=v;}},connect(to){this.connections.push(to);return to;},disconnect(){},start(){this.started=true;},stop(){}});
test('changing SFX volume immediately controls already-playing sample voices through the shared bus',()=>{
  const audio=new DriveAudio(),sources=[];
  audio.ctx={state:'running',currentTime:10,createBufferSource(){const n=node();sources.push(n);return n;},createGain:node};
  audio.master=node();audio.sfxGain=node();audio.sfxGain.connect(audio.master);audio.buffers.success={};
  assert.equal(audio.play('success'),true);assert.equal(sources[0].started,true);
  const local=sources[0].connections[0];assert.equal(local.connections[0],audio.sfxGain);
  audio.setOptions({sfx:0});assert.equal(audio.sfxGain.gain.value,0);assert.equal(local.gain.value,1);
  audio.setOptions({sfx:.8});assert.equal(audio.sfxGain.gain.value,.8);
});
test('a restart cancels delayed fallback success tones and rejects a late prior-race unlock',async()=>{
  const audio=new DriveAudio(),played=[];audio.ctx={state:'running'};audio.tone=f=>played.push(f);
  const generation=audio.successGeneration;audio.success();audio.resetSuccess();audio.success(generation);
  await new Promise(r=>setTimeout(r,260));assert.deepEqual(played,[]);assert.equal(audio.successTimers.size,0);
});
test('a delayed AudioContext resume cannot undo a newer pause',async()=>{
  const audio=new DriveAudio();let resolveResume,suspensions=0;
  audio.ctx={state:'suspended',currentTime:0,resume(){return new Promise(resolve=>{resolveResume=()=>{this.state='running';resolve();};});},async suspend(){suspensions++;this.state='suspended';}};
  audio.motorGain=node();audio.tireGain=node();
  const pending=audio.unlock();audio.pause();resolveResume();await pending;
  assert.equal(audio.ctx.state,'suspended');assert.equal(audio.active,false);assert.equal(suspensions,2);
});
test('failure cue descends, uses cancellable outcome timers and rejects stale generations',async()=>{
  const audio=new DriveAudio(),played=[];audio.ctx={state:'running'};audio.tone=f=>played.push(f);audio.failure();await new Promise(r=>setTimeout(r,220));assert.deepEqual(played,[165,110]);assert.equal(audio.successTimers.size,0);
  const old=audio.successGeneration;audio.failure();audio.resetSuccess();audio.failure(old);await new Promise(r=>setTimeout(r,220));assert.deepEqual(played,[165,110]);
});

const controls=(throttle=0,brake=0,handbrake=false,steer=0)=>({throttle,brake,handbrake,steer});
function feedbackAudio(){const audio=new DriveAudio(),cues=[];audio.ctx={state:'running'};audio.wantsContext=true;audio.tone=(...cue)=>{cues.push(cue);};return {audio,cues};}
test('control edges synchronously acknowledge all pedals with priority and quiet releases',()=>{
  const {audio,cues}=feedbackAudio();
  audio.controlFeedback(controls(1),true);audio.controlFeedback(controls(1),true);audio.controlFeedback(controls(1,0,false,.8),true);
  assert.deepEqual(cues,[[110,.035,.025,'triangle','sfx']]);
  audio.controlFeedback(controls(0,1),true);audio.controlFeedback(controls(0,1,true),true);audio.controlFeedback(controls(),true);
  assert.deepEqual(cues.slice(1).map(x=>[x[0],x[2]]),[[85,.025],[160,.025],[160,.0125]]);
});
test('analog hysteresis and steering jitter do not cause repeated cues',()=>{
  const {audio,cues}=feedbackAudio();
  for(const value of [.1,.49,.5,.48,.3,.21,.2,.21,.49,.51])audio.controlFeedback(controls(value,0,false,value),true);
  assert.deepEqual(cues.map(x=>x[2]),[.025,.0125,.025]);
});
test('countdown/result/pause suppress edges and reset pending feedback',()=>{
  const {audio,cues}=feedbackAudio();audio.controlFeedback(controls(1),false);audio.controlFeedback(controls(0,1),false);assert.equal(cues.length,0);
  audio.ctx.state='suspended';audio.controlFeedback(controls(1),true);assert.equal(audio.pendingCue,1);audio.controlFeedback(controls(),false);assert.equal(audio.pendingCue,0);
  audio.ctx={state:'running',currentTime:0,suspend:async()=>{}};audio.motorGain=node();audio.tireGain=node();audio.pause();assert.equal(audio.feedbackEnabled,false);assert.equal(audio.throttleHeld,false);
});
test('unlock flushes only latest active cue; late unlock after blur discards it',async()=>{
  for(const paused of [false,true]){
    const {audio,cues}=feedbackAudio();let resume;
    audio.ctx={state:'suspended',currentTime:0,resume(){return new Promise(r=>resume=()=>{this.state='running';r();});},async suspend(){this.state='suspended';}};
    audio.motorGain=node();audio.tireGain=node();const unlocking=audio.unlock();audio.controlFeedback(controls(1),true);audio.controlFeedback(controls(1,1),true);
    if(paused)audio.pause();resume();await unlocking;
    assert.equal(audio.pendingCue,0);assert.equal(cues.length,paused?0:1);if(!paused)assert.equal(cues[0][0],85);
  }
});
test('real mechanical oscillator is connected to muted SFX bus with no extra context',()=>{
  const audio=new DriveAudio(),oscillators=[];audio.wantsContext=true;
  audio.ctx={state:'running',currentTime:0,createOscillator(){const o=node();o.frequency={setValueAtTime(v){o.frequency.value=v;}};oscillators.push(o);return o;},createGain(){const g=node();g.gain.exponentialRampToValueAtTime=()=>{};return g;}};
  audio.master=node();audio.sfxGain=node();audio.setOptions({sfx:0});audio.controlFeedback(controls(1),true);
  assert.equal(oscillators.length,1);assert.equal(oscillators[0].frequency.value,110);assert.equal(oscillators[0].connections[0].connections[0],audio.sfxGain);assert.equal(audio.sfxGain.gain.value,0);
});

test('steady synthesis skips unchanged automation; pitch/cutoff/gains use audible quantization',()=>{
  const audio=new DriveAudio(),calls=[];
  const target=name=>({setTargetAtTime(value){calls.push([name,value]);}});
  audio.ctx={state:'running',currentTime:2};audio.music={};audio.motor={frequency:target('pitch')};audio.filter={frequency:target('filter')};audio.motorGain={gain:target('motor')};audio.tireGain={gain:target('tire')};audio.musicGain={gain:target('music')};
  const state={speed:20,driftAngle:.1,drifting:false};audio.update(state,true);assert.equal(calls.length,5);calls.length=0;
  for(let i=0;i<100;i++)audio.update(state,true);assert.deepEqual(calls,[]);
  state.speed=20.001;audio.update(state,true);assert.deepEqual(calls,[]);
  state.speed=21;audio.update(state,true);assert.ok(calls.some(([name])=>name==='pitch'));assert.ok(calls.some(([name])=>name==='filter'));assert.ok(calls.every(([name])=>name!=='music'));
});
