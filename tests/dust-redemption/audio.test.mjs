import test from 'node:test';
import assert from 'node:assert/strict';
import {FrontierAudio} from '../../games/dust-redemption/audio.js';
const param=()=>({value:0,cancelScheduledValues(){},setValueAtTime(){},linearRampToValueAtTime(){},exponentialRampToValueAtTime(){}});
class Context {
 constructor(){this.state='suspended';this.currentTime=0;this.destination={};}
 createGain(){return {gain:param(),connect(){},disconnect(){}};}
 createDynamicsCompressor(){return {threshold:param(),knee:param(),ratio:param(),attack:param(),release:param(),connect(){}};}
 resume(){this.state='running';return Promise.resolve();}
 suspend(){this.state='suspended';return Promise.resolve();}
 close(){this.state='closed';return Promise.resolve();}
 decodeAudioData(){return Promise.resolve({duration:.1});}
 createBufferSource(){return {connect(){},disconnect(){},start(){},stop(){this.onended?.()}};}
}
test('audio retries only the missing WAV on the next gesture and releases voices on pause',async()=>{
 const savedFetch=globalThis.fetch,savedContext=globalThis.AudioContext;
 const calls=[];let failed=false;
 globalThis.AudioContext=Context;
 globalThis.fetch=async url=>{const name=String(url).split('/').at(-1);calls.push(name);if(name==='hit.wav'&&!failed){failed=true;throw new Error('one transient failure');}return {ok:true,arrayBuffer:async()=>new ArrayBuffer(16)}};
 const audio=new FrontierAudio();
 try{
  assert.equal(audio.context,null);
  audio.unlock();await audio.loadPromise;
  assert.equal(audio.buffers.size,10);assert.equal(audio.loadPromise,null);
  audio.unlock();await audio.loadPromise;
  assert.equal(audio.buffers.size,11);assert.equal(calls.length,12);assert.equal(calls.at(-1),'hit.wav');
  audio.resume();audio.play('hit');assert.equal(audio.voices.size,1);
  audio.pause();assert.equal(audio.voices.size,0);assert.equal(audio.context.state,'suspended');
  audio.resume();assert.equal(audio.context.state,'running');
  audio.configure({music:0,sfx:0});assert.equal(audio.canPlay(),false);assert.equal(audio.canPlay('music'),false);
 }finally{audio.dispose();globalThis.fetch=savedFetch;globalThis.AudioContext=savedContext;}
 assert.equal(audio.context.state,'closed');assert.equal(audio.buffers.size,0);
});
