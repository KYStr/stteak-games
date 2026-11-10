import test from 'node:test';
import assert from 'node:assert/strict';
import {SeaAudio} from '../../games/tidebound/src/audio.js';
function environment(){
  const original={window:globalThis.window,fetch:globalThis.fetch,location:globalThis.location};let fetches=0,fail=false;
  class Context{
    constructor(){this.state='suspended';this.currentTime=0;this.destination={};this.resumes=0;}
    createGain(){return {gain:{setTargetAtTime(){}},connect(){},disconnect(){}};}
    createBufferSource(){return {connect(){},start(){},stop(){this.onended?.()},disconnect(){}};}
    async resume(){this.resumes++;this.state='running';}
    async decodeAudioData(){return {};}
    async close(){this.state='closed';}
  }
  globalThis.window={AudioContext:Context};globalThis.location={href:'http://localhost/games/tidebound/'};
  globalThis.fetch=async()=>{fetches++;return{ok:!fail,arrayBuffer:async()=>new ArrayBuffer(1)}};
  return {get fetches(){return fetches},fail(value){fail=value},restore(){Object.assign(globalThis,original)}};
}
test('gesture unlock loads once, pause releases loops, repeated resume is bounded and suspended contexts recover',async()=>{
  const env=environment();try{const a=new SeaAudio();assert.equal(a.stats().context,'locked');a.setActive(true,true);await a.unlock();assert.equal(env.fetches,7);assert.equal(a.stats().loops,2);
    for(let i=0;i<20;i++){a.setActive(false);assert.equal(a.stats().loops,0);a.setActive(true,true);}assert.equal(a.stats().loops,2);
    a.ctx.state='suspended';a.ctx.onstatechange();await a.resumePending;assert.equal(a.stats().context,'running');await a.unlock();assert.equal(env.fetches,7);
    a.setPrefs({music:0,sfx:0});assert.equal(a.stats().music,0);a.dispose();assert.equal(a.stats().loops,0);assert.equal(a.stats().voices,0);
  }finally{env.restore()}
});
test('failed audio load can retry on a later gesture without duplicating loops',async()=>{
  const env=environment();try{const a=new SeaAudio();env.fail(true);await assert.rejects(a.unlock());assert.equal(a.pending,null);env.fail(false);a.setActive(true,true);await a.unlock();assert.equal(a.stats().loaded,7);assert.equal(a.stats().loops,2);a.dispose();}finally{env.restore()}
});
