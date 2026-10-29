// State-contract regression tests with an explicit WebAudio mock. These checks
// do not claim browser autoplay compatibility or perceptual listening results.
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import {fileURLToPath,pathToFileURL} from 'node:url';
import path from 'node:path';
const here=path.dirname(fileURLToPath(import.meta.url)),root=path.resolve(here,'../../../..');
class Param{constructor(value=0){this.value=value;}setTargetAtTime(value){this.value=value;}setValueAtTime(value){this.value=value;}exponentialRampToValueAtTime(value){this.value=value;}cancelScheduledValues(){}}
class Node{constructor(){this.gain=new Param();this.frequency=new Param();for(const p of ['threshold','knee','ratio','attack','release'])this[p]=new Param();}connect(node){return node;}disconnect(){}start(){this.started=true;}stop(){this.stopped=true;this.onended?.();}}
let contextCreations=0;
class Context{constructor(){contextCreations++;this.currentTime=1;this.state='suspended';this.destination=new Node();this.suspends=0;this.resumes=0;this.sources=[];}createGain(){return new Node();}createDynamicsCompressor(){return new Node();}createBiquadFilter(){return new Node();}createBufferSource(){const n=new Node();this.sources.push(n);return n;}createOscillator(){return this.createBufferSource();}async decodeAudioData(){return {duration:1};}async resume(){this.resumes++;this.state='running';}async suspend(){this.suspends++;this.state='suspended';}async close(){this.state='closed';}}
globalThis.AudioContext=Context;
globalThis.fetch=async url=>new Response(await fs.readFile(fileURLToPath(url)));
const {AudioEngine}=await import(pathToFileURL(path.join(root,'public/games/orbit-fall/audio.js')));
const a=new AudioEngine();a.setPaused(true);a.setVolumes(.6,.7);a.setHidden(true);a.setHidden(false);assert.equal(contextCreations,0,'settings and visibility cannot create an audio context');
await a.unlock();await a.loading;const c=a.context;assert.equal(c.state,'running');assert.equal(a.musicGain.gain.value,0,'paused unlock leaves ambience muted');assert.equal(a.ready,true);assert.deepEqual(a.loadErrors,[]);
const stingers=['signal','ending','fail','success','click'];
for(const name of stingers){const old=a.voices.size;a.play(name);assert.equal(a.voices.size,old+1,`${name} can start from a paused menu`);}
const count=a.voices.size;for(const name of ['damage','door','power','magnet','tether','low-oxygen'])a.play(name);assert.equal(a.voices.size,count,'simulation events do not start in menus');
a.setVolumes(.9,.45);assert.equal(a.musicGain.gain.value,0,'volume changes cannot unmute a paused menu');assert.equal(a.sfxGain.gain.value,.45);
a.setPaused(false);a.update(1);assert.equal(a.musicGain.gain.value,.45);assert(a.thrustGain.gain.value>0);const endingSource=[...a.voices][1];a.setPaused(true);assert.equal(c.suspends,0,'menu pause does not freeze an ending cue');assert(!endingSource.stopped,'in-flight ending cue continues');assert.equal(a.thrustGain.gain.value,0);assert.equal(a.musicGain.gain.value,0);
a.setHidden(true);assert.equal(c.state,'suspended');assert.equal(c.suspends,1);c.currentTime=3;const hiddenCount=a.voices.size;a.play('ending');assert.equal(a.voices.size,hiddenCount,'hidden documents queue no new cues');a.update(1);assert.equal(a.thrustGain.gain.value,0);
a.setHidden(false);assert.equal(c.state,'running');assert.equal(a.paused,true);assert.equal(a.musicGain.gain.value,0,'returning to a paused menu preserves silence');a.play('ending');assert.equal(a.voices.size,hiddenCount+1);
a.setVolumes(1,0);c.currentTime=4;const mutedCount=a.voices.size;a.play('click');assert.equal(a.voices.size,mutedCount,'SFX mute covers menu cues');a.dispose();a.dispose();assert.equal(c.state,'closed');assert.equal(a.context,null);assert.equal(a.voices.size,0);assert.equal(await a.unlock(),false);
const report={schemaVersion:1,checkedAt:new Date().toISOString(),runtime:'public/games/orbit-fall/audio.js',checks:{contextCreatedOnlyByUnlock:true,pausedMusicMute:true,pausedThrustMute:true,allFiveMenuStingers:true,pausedSimulationEventsBlocked:true,volumeDoesNotUnpause:true,inflightCueNotSuspended:true,hiddenContextSuspended:true,visibleKeepsPausedState:true,sfxMuteCoversMenus:true,idempotentDisposal:true},limitations:['WebAudio API mock: no claim of perceptual listening, browser autoplay policy, or real-device validation.']};
await fs.writeFile(path.resolve(here,'../generation/audio-verification.json'),JSON.stringify(report,null,2)+'\n');console.log(JSON.stringify(report.checks,null,2));
