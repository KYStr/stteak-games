import {test} from 'node:test';
import assert from 'node:assert/strict';
import {Sound} from '../../games/signal-zero/src/audio.js';
class FakeAudio {
 constructor(){this.state='running';this.currentTime=0;this.destination={};this.created=[];this.pending=[]}
 createGain(){return{gain:{value:0,setValueAtTime(){},setTargetAtTime(){},exponentialRampToValueAtTime(){}},connect(){},disconnect(){}}}
 createOscillator(){const o={frequency:{setValueAtTime(){},exponentialRampToValueAtTime(){}},connect(){},disconnect(){},start(){},stop(){},end(){this.onended?.()}};this.created.push(o);return o}
 resume(){return new Promise(resolve=>this.pending.push(()=>{this.state='running';resolve()}))}
 suspend(){this.state='suspended';return Promise.resolve()}
 close(){this.state='closed'}
 resolve(){for(const fn of this.pending.splice(0))fn()}
}
function fixture(settings={}){const s=new Sound({sfx:.6,music:0,...settings});s.context=new FakeAudio();s.master=s.context.createGain();return s}
test('both outcomes create exactly one voice, stop music, and suspend at the envelope tail',()=>{
 for(const type of ['caught','complete']){const s=fixture();s.running=true;s.tone(110,1,.1);s.finishRun(type);assert.equal(s.running,false);assert.equal(s.voices.size,1);assert.equal(s.context.state,'running');const cue=s.context.created.at(-1);cue.end();assert.equal(s.voices.size,0);assert.equal(s.context.state,'suspended')}
});
test('suspended result waits for resume before creating an envelope',async()=>{const s=fixture();s.context.state='suspended';const task=s.finishRun('complete');assert.equal(s.context.created.length,0);s.context.resolve();await task;assert.equal(s.context.created.length,1);assert.equal(s.voices.size,1)});
for(const action of ['pause','restart','dispose'])test('pending result cannot survive '+action,async()=>{const s=fixture();s.context.state='suspended';const task=s.finishRun('caught');if(action==='dispose')s.dispose();else s.setRunning(action==='restart');s.context.resolve();await task;assert.equal(s.context.created.length,0);assert.equal(s.voices.size,0);if(action==='pause')assert.equal(s.context.state,'suspended')});
test('stale cue end cannot suspend a restarted mission or subsequent gesture',()=>{for(const gesture of [false,true]){const s=fixture();s.finishRun('complete');const old=s.context.created[0];if(gesture){globalThis.window={AudioContext:FakeAudio};s.gesture()}else s.setRunning(true);old.end();assert.equal(s.context.state,'running')}});
test('mute and SFX zero create no result voice and leave transport suspended',()=>{for(const settings of [{muted:true},{sfx:0}]){const s=fixture(settings);s.finishRun('complete');assert.equal(s.context.created.length,0);assert.equal(s.running,false);assert.equal(s.context.state,'suspended')}});

test('a late native suspend completion cannot override a new mission',async()=>{
 const s=fixture(),suspends=[];s.context.suspend=()=>new Promise(resolve=>suspends.push(()=>{s.context.state='suspended';resolve()}));
 s.finishRun('complete');s.context.created[0].end();assert.equal(suspends.length,1);
 s.setRunning(true);suspends.shift()();await Promise.resolve();assert.equal(s.context.pending.length,1);
 s.context.resolve();await Promise.resolve();assert.equal(s.context.state,'running');assert.equal(s.running,true);
});


test('buffered music timing schedules the same notes and alert cues as numeric updates',()=>{
 const settings={music:.45,sfx:.7},actual=new Sound(settings),reference=new Sound(settings),a=[],b=[],timing=new Float64Array(8);
 actual.running=reference.running=true;actual.tone=(...args)=>a.push(args);reference.tone=(...args)=>b.push(args);
 for(let i=0;i<240;i++){const dt=[.016,.033,.1][i%3],alert=i%7===0?.4:0;timing[0]=dt;timing[7]=alert;actual.update(timing);reference.update(dt,alert);}
 assert.equal(actual.beat,reference.beat);assert.equal(actual.clock,reference.clock);assert.deepEqual(a,b);assert.ok(a.length>20);
});
