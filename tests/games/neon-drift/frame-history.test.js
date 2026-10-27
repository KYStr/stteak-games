import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';
import {createFrameHistory,FRAME_HISTORY_CAPACITY} from '../../../games/neon-drift/src/frame-history.js';

const mainSource=readFileSync(new URL('../../../games/neon-drift/src/main.js',import.meta.url),'utf8');
const p95=values=>{const sorted=[...values].sort((a,b)=>a-b);return sorted.length?sorted[Math.floor((sorted.length-1)*.95)]:null;};

test('empty history has the existing 54000 limit and a bounded omitted descriptor',()=>{
  assert.equal(FRAME_HISTORY_CAPACITY,54000);
  const history=createFrameHistory();assert.equal(history.length,0);assert.deepEqual(history.snapshot(),[]);
  assert.deepEqual(history.summary(),{omitted:true,retainedCount:0,note:'完整資料保留於診斷匯出檔'});
  for(const capacity of [0,-1,1.5,NaN,Infinity,'4'])assert.throws(()=>createFrameHistory(capacity),RangeError);
});

test('54000 and 54001 samples preserve exact values, chronological order and p95',()=>{
  const history=createFrameHistory(),input=Array.from({length:54001},(_,i)=>(i%997)/7+Math.PI);
  for(let i=0;i<54000;i++)history.push(input[i]);
  assert.equal(history.length,54000);assert.deepEqual(history.snapshot(),input.slice(0,54000));
  history.push(input[54000]);const expected=input.slice(1),actual=history.snapshot();
  assert.equal(history.length,54000);assert.deepEqual(actual,expected);assert.equal(p95(actual),p95(expected));
  assert.equal(history.summary().retainedCount,54000);
});

test('multiple wraps and a one-slot history match legacy append/remove-first semantics',()=>{
  for(const capacity of [1,4,7]){
    const history=createFrameHistory(capacity),legacy=[];
    for(let i=0;i<capacity*5+3;i++){
      const value=(i%5)*.1234567890123456+i/3;legacy.push(value);if(legacy.length>capacity)legacy.shift();history.push(value);
      assert.deepEqual(history.snapshot(),legacy);assert.equal(history.length,legacy.length);assert.equal(p95(history.snapshot()),p95(legacy));
    }
  }
});

test('snapshots are ordinary detached Arrays and retain JavaScript double precision',()=>{
  const history=createFrameHistory(8),values=[-0,Number.MIN_VALUE,1/3,Math.PI,999.9999999999999,Number.MAX_SAFE_INTEGER];
  for(const value of values)history.push(value);
  const copy=history.snapshot();assert.ok(Array.isArray(copy));assert.deepEqual(copy,values);assert.ok(Object.is(copy[0],-0));
  copy[0]=888;copy.sort((a,b)=>a-b);copy.push(777);assert.deepEqual(history.snapshot(),values);
  const before=history.snapshot();history.push(.3141592653589793);assert.deepEqual(before,values);
  const summary=history.summary();summary.retainedCount=99;assert.equal(history.summary().retainedCount,7);
});

test('invalid values do not change the stored samples or count',()=>{
  const history=createFrameHistory(2);history.push(1.25);
  for(const value of [NaN,Infinity,-Infinity,'2',undefined,null])assert.throws(()=>history.push(value),TypeError);
  assert.deepEqual(history.snapshot(),[1.25]);assert.equal(history.length,1);
});

test('append writes one fixed slot and summary never reads or copies the data buffer',()=>{
  let blocked=true,reads=0,allocations=0;const writes=[];
  function GuardedFloat64Array(capacity){
    allocations++;return new Proxy(new Float64Array(capacity),{
      get(target,key){reads++;if(blocked)throw new Error('frame buffer read blocked');return Reflect.get(target,key,target);},
      set(target,key,value){writes.push(Number(key));return Reflect.set(target,key,value,target);},
    });
  }
  const source=readFileSync(new URL('../../../games/neon-drift/src/frame-history.js',import.meta.url),'utf8');
  const create=vm.runInNewContext(source.replace(/^export /gm,'')+'\ncreateFrameHistory;', {Float64Array:GuardedFloat64Array});
  const history=create(7);for(let i=0;i<31;i++)history.push(i+.125);
  assert.equal(allocations,1);assert.equal(writes.length,31);assert.deepEqual(writes,Array.from({length:31},(_,i)=>i%7));
  assert.equal(history.length,7);assert.equal(history.summary().retainedCount,7);assert.equal(reads,0);
  assert.throws(()=>history.snapshot(),/frame buffer read blocked/);blocked=false;
  assert.deepEqual(Array.from(history.snapshot()),Array.from({length:7},(_,i)=>24+i+.125));
});

test('actual diagnostics, summary and window performance keep their external array/count shapes',()=>{
  const history=createFrameHistory(4);for(let i=0;i<8;i++)history.push(i+.1234567890123);
  let blockSnapshot=false;
  const guardedHistory={snapshot(){if(blockSnapshot)throw new Error('summary requested complete history');return history.snapshot();},summary:history.summary};
  const env={BUILD:'fixture',VERSION:'fixture',navigator:{userAgent:'fixture'},innerWidth:1920,innerHeight:1080,devicePixelRatio:1,phase:'paused',frameSamples:guardedHistory,frameGaps:[],events:[],renderer:{stats:{calls:1},summary:{calls:1}},profiler:{snapshot:()=>({rows:[]}),summary:()=>({rows:{omitted:true,retainedCount:0}})},completedFrameProfile:null,browserTiming:null,lastCompletedRun:null,window:{},runFrames:8};
  const start=mainSource.indexOf('function diagnostics(){'),end=mainSource.indexOf('\nconst track=',start);
  assert.ok(start>=0&&end>start);
  const apiSource=mainSource.slice(mainSource.indexOf("Object.defineProperty(window,'neonDrift'"));
  const api=new Function('env',`const {${Object.keys(env).join(',')}}=env;\n${mainSource.slice(start,end)}\n${apiSource}\nreturn {diagnostics,diagnosticsSummary,window};`)(env);
  const raw=api.diagnostics(),publicCapture=api.window.neonDrift.performance(),expected=history.snapshot();
  assert.ok(Array.isArray(raw.frameMs));assert.ok(Array.isArray(publicCapture.frames));assert.equal(publicCapture.frames.length,4);assert.equal(publicCapture.count,8);
  assert.deepEqual(raw.frameMs,expected);assert.deepEqual(publicCapture.frames,expected);assert.deepEqual(JSON.parse(JSON.stringify(raw)).frameMs,expected);
  raw.frameMs[0]=999;publicCapture.frames.pop();assert.deepEqual(history.snapshot(),expected);
  blockSnapshot=true;const summary=api.diagnosticsSummary();assert.equal(summary.frameMs.omitted,true);assert.equal(summary.frameMs.retainedCount,4);assert.match(summary.frameMs.note,/匯出/);
  blockSnapshot=false;history.push(8.1234567890123);assert.deepEqual(api.diagnostics().frameMs,history.snapshot());
});

test('actual sample condition and settings p95 retain cross-run history and the original precision',()=>{
  const history=createFrameHistory(4);
  const sampleLine=mainSource.split('\n').find(line=>line.includes('frameSamples.push(rawDt*1000)'));
  assert.ok(sampleLine);const append=new Function('frameSamples','state',`let {phase,rawDt,race}=state;let runFrames=0;${sampleLine}\nreturn runFrames;`);
  assert.equal(append(history,{phase:'running',rawDt:.0166666666666667,race:{countdown:0}}),1);
  for(const state of [{phase:'paused',rawDt:.2,race:{countdown:0}},{phase:'menu',rawDt:.3,race:{countdown:0}},{phase:'running',rawDt:0,race:{countdown:0}},{phase:'running',rawDt:.4,race:{countdown:1}}])assert.equal(append(history,state),0);
  assert.equal(append(history,{phase:'running',rawDt:.0234567890123456,race:{countdown:0}}),1);
  assert.deepEqual(history.snapshot(),[.0166666666666667*1000,.0234567890123456*1000]);
  assert.equal(mainSource.split('createFrameHistory()').length-1,1,'History is initialized once, not per race');
  const settingsLine=mainSource.split('\n').find(line=>line.includes('sorted=frameSamples.snapshot().sort'));
  assert.ok(settingsLine);const label={textContent:''};new Function('frameSamples','renderer','frameGaps','BUILD','$',settingsLine)(history,{summary:{calls:1,triangles:2}},[],'fixture',()=>label);
  assert.match(label.textContent,new RegExp(`已量測 2 遊玩影格，p95 ${p95(history.snapshot()).toFixed(1).replace('.','\\.')} ms`));
  assert.deepEqual(history.snapshot(),[.0166666666666667*1000,.0234567890123456*1000]);
});
