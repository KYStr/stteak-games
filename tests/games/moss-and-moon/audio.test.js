import test from 'node:test';
import assert from 'node:assert/strict';
import {createAudio,AUDIO_OUTPUT_GAIN,AUDIO_FADE_SECONDS} from '../../../public/games/moss-and-moon/audio.js';

const flush=async()=>{for(let i=0;i<12;i++)await Promise.resolve();};
const near=(actual,expected)=>assert.ok(Math.abs(actual-expected)<1e-8,`${actual} != ${expected}`);

function fixture(t,{deferFetch=false}={}){
 const timers=new Map(),contexts=[],responses=[];let wall=0,nextTimer=0;
 class Param{
  value=1;events=[];
  cancelScheduledValues(time){this.events=this.events.filter(e=>e.time<time);}
  setValueAtTime(value,time){this.events.push({kind:'set',value,time});}
  linearRampToValueAtTime(value,time){this.events.push({kind:'linear',value,time});}
  setTargetAtTime(value,time,constant){this.events.push({kind:'target',value,time,constant});}
  at(time){let value=this.value,previousTime=0;for(const event of this.events){if(event.time>time){if(event.kind==='linear')return value+(event.value-value)*(time-previousTime)/(event.time-previousTime);break;}value=event.value;previousTime=event.time;}return value;}
 }
 class Node{
  connections=[];connect(node){this.connections.push(node);return node;}disconnect(){this.connections=[];}
 }
 class Context{
  state='suspended';currentTime=0;destination={};gains=[];sources=[];suspends=0;resumes=0;closes=0;deferSuspend=false;deferResume=false;
  constructor(){contexts.push(this);}
  createGain(){const n=new Node();n.gain=new Param();this.gains.push(n);return n;}
  createBufferSource(){const n=new Node();n.playbackRate=new Param();n.start=()=>{n.started=this.currentTime;};n.stop=()=>{n.stopped=true;n.onended?.();};this.sources.push(n);return n;}
  async decodeAudioData(){return{duration:1.2};}
  resume(){this.resumes++;if(this.deferResume)return new Promise(resolve=>{this.completeResume=()=>{this.state='running';resolve();};});this.state='running';return Promise.resolve();}
  suspend(){this.suspends++;if(this.deferSuspend)return new Promise(resolve=>{this.completeSuspend=()=>{this.state='suspended';resolve();};});this.state='suspended';return Promise.resolve();}
  close(){this.closes++;this.state='closed';return Promise.resolve();}
 }
 const originalWindow=globalThis.window;globalThis.window={AudioContext:Context};t.after(()=>{if(originalWindow===undefined)delete globalThis.window;else globalThis.window=originalWindow;});
 t.mock.method(globalThis,'fetch',()=>{const response={ok:true,arrayBuffer:async()=>new ArrayBuffer(0)};return deferFetch?new Promise(resolve=>responses.push(()=>resolve(response))):Promise.resolve(response);});
 t.mock.method(globalThis,'setTimeout',(fn,ms)=>{const id=++nextTimer;timers.set(id,{fn,due:wall+ms});return id;});
 t.mock.method(globalThis,'clearTimeout',id=>timers.delete(id));
 const advance=(ms,audioClock=true)=>{
  const target=wall+ms;let guard=0;
  const move=to=>{if(audioClock)for(const c of contexts)if(c.state==='running')c.currentTime+=(to-wall)/1000;wall=to;};
  while(true){let next=null;for(const [id,timer]of timers)if(timer.due<=target&&(!next||timer.due<next.timer.due))next={id,timer};if(!next)break;assert.ok(++guard<1000,'timer loop');move(next.timer.due);timers.delete(next.id);next.timer.fn();}move(target);
 };
 const sound=createAudio();
 return{sound,contexts,timers,advance,resolveFetch:()=>responses.forEach(resolve=>resolve()),async start(){sound.setActive(true);await sound.unlock();return contexts[0];}};
}

test('all three preferences route through fixed headroom and a silent first-start ramp',async t=>{
 const f=fixture(t);f.sound.update({music:.2,ambient:.6,sfx:.9});const c=await f.start(),[output,envelope,...buses]=c.gains;
 assert.equal(output.gain.value,AUDIO_OUTPUT_GAIN);assert.deepEqual(output.connections,[envelope]);assert.deepEqual(envelope.connections,[c.destination]);
 for(const bus of buses)assert.deepEqual(bus.connections,[output]);
 assert.deepEqual(buses.map(b=>b.gain.value),[.2,.6,.9]);assert.equal(c.sources.length,2);assert.ok(c.sources.every(s=>s.loop));
 near(envelope.gain.at(0),0);f.advance(AUDIO_FADE_SECONDS*500);near(envelope.gain.at(c.currentTime),.5);f.advance(AUDIO_FADE_SECONDS*500);near(envelope.gain.at(c.currentTime),1);
 f.sound.update({music:1,ambient:0,sfx:.4});assert.deepEqual(f.sound.metrics().volumes,{music:1,ambient:0,sfx:.4});assert.equal(output.gain.value,.3);
 await f.sound.unlock();await f.sound.setActive(true);assert.equal(c.sources.length,2,'unlock/resume must retain one source per loop');
});

test('rapid pause/resume holds the interrupted fade and rejects even an already queued old timer',async t=>{
 const f=fixture(t),c=await f.start();f.advance(40);f.sound.setActive(false);const stale=[...f.timers.values()][0].fn;
 f.advance(15);near(f.sound.metrics().envelope,.5);await f.sound.setActive(true);near(f.sound.metrics().envelope,.5);
 stale();f.advance(40);await flush();assert.equal(c.suspends,0);assert.equal(c.state,'running');near(f.sound.metrics().envelope,1);assert.equal(c.sources.length,2);
});

test('pause waits for the audio-clock fade, then resume begins silently without new loops',async t=>{
 const f=fixture(t),c=await f.start();f.advance(40);f.sound.setActive(false);
 f.advance(30,false);assert.equal(c.suspends,0,'early wall timer must not truncate the audio envelope');
 f.advance(34);await flush();assert.equal(c.suspends,1);assert.equal(c.state,'suspended');near(f.sound.metrics().envelope,0);
 await f.sound.setActive(true);near(f.sound.metrics().envelope,0);f.advance(30);near(f.sound.metrics().envelope,1);assert.equal(c.sources.length,2);
});

test('resume waits for an already issued delayed suspend, so its late completion cannot win',async t=>{
 const f=fixture(t),c=await f.start();f.advance(40);c.deferSuspend=true;f.sound.setActive(false);f.advance(34);
 assert.equal(c.suspends,1);const before=c.resumes,resuming=f.sound.setActive(true);await flush();assert.equal(c.resumes,before);
 c.completeSuspend();await resuming;assert.equal(c.resumes,before+1);assert.equal(c.state,'running');near(f.sound.metrics().envelope,0);f.advance(30);near(f.sound.metrics().envelope,1);
});

test('a pause while resume is pending ends suspended and silent',async t=>{
 const f=fixture(t);await f.sound.unlock();const c=f.contexts[0];c.deferResume=true;const resuming=f.sound.setActive(true);f.sound.setActive(false);c.completeResume();await resuming;f.advance(34);await flush();assert.equal(c.state,'suspended');near(f.sound.metrics().envelope,0);assert.equal(c.sources.length,0);
});

test('global cooldown, six-effect cap, playback gains and rates remain unchanged',async t=>{
 const f=fixture(t),c=await f.start();f.advance(100);f.sound.effect('harvest');f.sound.effect('plant');assert.equal(f.sound.metrics().voices,1);
 for(let i=1;i<6;i++){f.advance(70);f.sound.effect(i===5?'craft':'harvest');}
 f.advance(70);f.sound.effect('water');assert.equal(f.sound.metrics().voices,6);assert.equal(c.sources.length,8);
 const effects=c.sources.slice(2);assert.deepEqual(effects.map(s=>s.playbackRate.value),[.965,1,1.035,.965,1,1.035]);assert.deepEqual(effects.map(s=>s.connections[0].gain.value),[.8,.8,.8,.8,.8,.65]);
 effects[0].onended();f.advance(70);f.sound.effect('water');assert.equal(f.sound.metrics().voices,6);f.sound.setActive(false);f.advance(70);f.sound.effect('water');assert.equal(c.sources.length,9);
});

test('dispose during delayed suspension completes and cancels future activation',async t=>{
 const f=fixture(t),c=await f.start();f.advance(40);c.deferSuspend=true;f.sound.setActive(false);f.advance(34);
 const closed=f.sound.dispose();c.completeSuspend();await flush();f.advance(34);await closed;assert.equal(c.state,'closed');assert.equal(c.closes,1);assert.ok(c.sources.every(s=>s.stopped));await f.sound.setActive(true);await f.sound.unlock();assert.equal(c.closes,1);assert.equal(c.sources.length,2);
});

test('late audio loading after disposal cannot start sources or revive the context',async t=>{
 const f=fixture(t,{deferFetch:true});f.sound.setActive(true);const loading=f.sound.unlock();await flush();const c=f.contexts[0],closed=f.sound.dispose();f.advance(34);await closed;f.resolveFetch();await loading;assert.equal(c.state,'closed');assert.equal(c.sources.length,0);assert.equal(f.sound.metrics().ready,false);
});
