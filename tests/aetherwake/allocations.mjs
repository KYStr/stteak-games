import inspector from 'node:inspector';
import assert from 'node:assert/strict';
import {mkdirSync,writeFileSync} from 'node:fs';
import {FlightSimulation} from '../../games/aetherwake/src/simulation.js';
const out=process.env.AETHERWAKE_EVIDENCE||'/tmp/aetherwake-acceptance';mkdirSync(out,{recursive:true});
const session=new inspector.Session();session.connect();const post=(method,params={})=>new Promise((res,rej)=>session.post(method,params,(e,r)=>e?rej(e):res(r)));
const sim=new FlightSimulation();sim.launch();sim.step({glide:true},1/60);const input={x:0,z:0,glide:false};
function fly(i){const angle=i/60*.65,dx=Math.cos(angle)*18-sim.player.x,dz=Math.sin(angle)*18-sim.player.z,n=Math.max(.001,Math.hypot(dx,dz));input.x=dx/n;input.z=dz/n;sim.step(input,1/60);sim.events.length=0;}
for(let i=0;i<21600;i++)fly(i);
const windows=[];
try {
 for(let w=0;w<2;w++){
  await post('HeapProfiler.startSampling',{samplingInterval:1024,includeObjectsCollectedByMajorGC:true,includeObjectsCollectedByMinorGC:true});
  for(let i=21600+w*10800;i<32400+w*10800;i++)fly(i);
  const {profile}=await post('HeapProfiler.stopSampling');const totals={};
  function walk(n){const f=n.callFrame;if(f.url.includes('/aetherwake/src/'))totals[`${f.url}:${f.functionName}:${f.lineNumber+1}`]=(totals[`${f.url}:${f.functionName}:${f.lineNumber+1}`]||0)+n.selfSize;for(const c of n.children||[])walk(c);}
  walk(profile.head);const bytes=Object.values(totals).reduce((a,b)=>a+b,0);windows.push({steps:10800,seconds:180,bytes,bytesPerStep:bytes/10800,totals,profile});
  // Includes engine numeric boxing. Budget guards the former ~10KB/step
  // temporary weather objects/arrays; it does not assert zero engine allocation.
  assert.ok(bytes/10800<512,`Hot application allocations: ${bytes/10800} bytes/step`);
  assert.equal(sim.stalls,0);console.log('PASS source flight allocation window',w,Math.round(bytes/10800),'sampled bytes/step');
 }
}finally{session.disconnect();writeFileSync(`${out}/source-allocation.json`,JSON.stringify({windows},null,2));}
