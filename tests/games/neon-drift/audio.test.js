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
