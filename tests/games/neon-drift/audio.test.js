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
