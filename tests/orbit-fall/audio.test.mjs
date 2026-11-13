import test from 'node:test';
import assert from 'node:assert/strict';
import {AudioEngine} from '../../public/games/orbit-fall/audio.js';
import {sanitizeSettings} from '../../public/games/orbit-fall/settings.js';
const param=()=>({value:0,setValueAtTime(){},exponentialRampToValueAtTime(){}});
function harness({throwStart=false}={}){
 const calls=[],sources=[];const engine=new AudioEngine();
 engine.sfxGain={};engine.context={currentTime:1,createGain:()=>({gain:param(),connect(){},disconnect(){calls.push('gain-disconnect')}}),createOscillator(){let started=false;const source={frequency:param(),connect(){},disconnect(){calls.push('source-disconnect')},start(){calls.push('start');if(throwStart)throw Error('scheduling injection');started=true},stop(){assert.equal(started,true,'stop must follow start');calls.push('stop')}};sources.push(source);return source}};
 return {engine,calls,sources};
}
test('fallback audio starts before stop and ended voices disconnect both nodes',()=>{const {engine,calls,sources}=harness();engine.play('brake');assert.deepEqual(calls,['start','stop']);assert.equal(engine.voices.size,1);sources[0].onended();assert.equal(sources[0].onended,null);assert.equal(engine.voices.size,0);assert.deepEqual(calls,['start','stop','source-disconnect','gain-disconnect']);});
test('scheduling errors are bounded diagnostics and never escape gameplay',()=>{const {engine}=harness({throwStart:true});for(let i=0;i<50;i++){engine.context.currentTime++;assert.doesNotThrow(()=>engine.play('brake'))}assert.equal(engine.voices.size,0);assert.equal(engine.playbackErrors.length,32);assert.match(engine.playbackErrors[0].message,/scheduling injection/)});
test('already ended voice eviction cannot prevent another sound',()=>{const {engine}=harness();engine.maxVoices=1;engine.voices.add({stop(){throw Error('already ended')}});assert.doesNotThrow(()=>engine.play('brake'));assert.equal(engine.voices.size,1);assert.deepEqual(engine.playbackErrors,[])});
test('exact hints are opt-in and only boolean preferences persist',()=>{assert.equal(sanitizeSettings(null).directHints,false);assert.equal(sanitizeSettings({directHints:true}).directHints,true);assert.equal(sanitizeSettings({directHints:'true'}).directHints,false)});
