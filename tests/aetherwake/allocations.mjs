import {auditAllocationContract} from './allocation-contract.mjs';
import inspector from 'node:inspector';
import assert from 'node:assert/strict';
import {mkdirSync,writeFileSync} from 'node:fs';
import {FlightSimulation} from '../../games/aetherwake/src/simulation.js';
const out=process.env.AETHERWAKE_EVIDENCE||'/tmp/aetherwake-acceptance';mkdirSync(out,{recursive:true});
const contract=await auditAllocationContract();
const session=new inspector.Session();session.connect();const post=(method,params={})=>new Promise((res,rej)=>session.post(method,params,(e,r)=>e?rej(e):res(r)));
const sim=new FlightSimulation();sim.launch();sim.step({glide:true},1/60);const input={x:0,z:0,glide:false};
function fly(i){const angle=i/60*.65,dx=Math.cos(angle)*18-sim.player.x,dz=Math.sin(angle)*18-sim.player.z,n=Math.max(.001,Math.hypot(dx,dz));input.x=dx/n;input.z=dz/n;sim.step(input,1/60);eventCount+=sim.events.length;sim.events.length=0;}
let eventCount=0;
for(let i=0;i<21600;i++)fly(i);
const windows=[];
try {
 for(let w=0;w<2;w++){
  const eventsBefore=eventCount;
  await post('HeapProfiler.startSampling',{samplingInterval:1024,includeObjectsCollectedByMajorGC:true,includeObjectsCollectedByMinorGC:true});
  for(let i=21600+w*10800;i<32400+w*10800;i++)fly(i);
  const {profile}=await post('HeapProfiler.stopSampling');const totals={};
  function walk(n){const f=n.callFrame;if(f.url.includes('/aetherwake/src/'))totals[`${f.url}:${f.functionName}:${f.lineNumber+1}`]=(totals[`${f.url}:${f.functionName}:${f.lineNumber+1}`]||0)+n.selfSize;for(const c of n.children||[])walk(c);}
  walk(profile.head);const bytes=Object.values(totals).reduce((a,b)=>a+b,0);windows.push({steps:10800,seconds:180,bytes,bytesPerStep:bytes/10800,bytesPerSecond:bytes/180,events:eventCount-eventsBefore,totals,profile});
  assert.equal(eventCount-eventsBefore,0,'Measured flight steps are event-free');
  assert.equal(sim.stalls,0);console.log('PASS source flight allocation window',w,Math.round(bytes/10800),'sampled bytes/step');
 }
 const recurring=Object.keys(windows[0].totals).filter(site=>windows.every(w=>(w.totals[site]||0)>1024));
 assert.deepEqual(recurring,[],'No recurring source allocation site on warmed event-free steps');
 for(const w of windows)assert.ok(w.bytes<=4096,'Only isolated sampling/compilation noise may remain, not a per-step budget');
}finally{session.disconnect();writeFileSync(`${out}/source-allocation.json`,JSON.stringify({contract,windows},null,2));}
