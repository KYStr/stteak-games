import assert from 'node:assert/strict';
import {join} from 'node:path';
export const snapshot=page=>page.evaluate(()=>window.__orbitDiagnostics.snapshot());
export async function dismissInterruption(page){
 const s=await snapshot(page);if(s.modal!=='interruption')return false;
 await page.evaluate(s=>{(window.testHostInterruptions ||= []).push(s);document.querySelector('.overlay[data-screen="interruption"] #resume')?.click()},s);return true;
}
export async function resumeGame(page){
 await dismissInterruption(page);const s=await snapshot(page);if(s.modal===null)return;
 assert.equal(s.modal,'pause',`Resume expected pause, got ${s.modal}`);
 await page.locator('.overlay[data-screen="pause"] #resume').click();
 await dismissInterruption(page);assert.equal((await snapshot(page)).modal,null);
}
export async function pauseMenu(page){
 for(let i=0;i<4;i++){await dismissInterruption(page);const s=await snapshot(page);if(s.modal==='pause')return;assert.equal(s.modal,null,`Cannot open pause from ${s.modal}`);await page.keyboard.press('Escape');await page.waitForTimeout(120)}
 throw Error('Pause menu did not open: '+JSON.stringify(await snapshot(page)));
}
export async function press(page,key){await dismissInterruption(page);await page.keyboard.press(key);await page.waitForTimeout(120)}
export function obstaclesFor(s){
 const boxes=[],add=(x,y,z,hx,hy,hz)=>boxes.push({x,y,z,hx:hx+.5,hy:hy+.86,hz:hz+.5});
 for(const d of s.devices){const [x,y,z]=d.position;
  // Hazards are contact regions, never hard colliders. PhysicsRoom fixtures only.
  if(d.id==='signal')add(x,1.05,z,.78,1.05,.55);
  if(d.id==='tools')add(x,1.05,z,.78,1.05,.55);
  if(d.id==='oxygen')add(x,1.3,z,1,1.3,.7);
  if(d.id==='ending')add(x,1.3,z,1,1.3,.8);
  if(d.id.startsWith('valve'))add(x,y-.5,z,.78,1.05,.55);
  if(d.id.startsWith('mirror')){add(x,y/2,z,.16,y/2,.16);add(x,y,z,.72,.75,.16)}
 }
 return boxes;
}
function clearLine(a,b,boxes){
 for(const box of boxes){let lo=0,hi=1;const center=[box.x,box.y,box.z],half=[box.hx,box.hy,box.hz];let inside=true,dot=0;
  for(let i=0;i<3;i++){inside&&=Math.abs(a[i]-center[i])<half[i];dot+=(a[i]-center[i])*(b[i]-a[i]);const delta=b[i]-a[i];if(Math.abs(delta)<1e-7){if(Math.abs(a[i]-center[i])>half[i]){lo=2;break}}else{let t1=(center[i]-half[i]-a[i])/delta,t2=(center[i]+half[i]-a[i])/delta;if(t1>t2)[t1,t2]=[t2,t1];lo=Math.max(lo,t1);hi=Math.min(hi,t2)}}
  if(lo<=hi&&hi>1e-4&&lo<.9999&&!(inside&&dot>0))return false;
 }
 return true;
}
export function routeFor(s,goal){
 const start=[s.position.x,s.position.y,s.position.z],boxes=obstaclesFor(s);if(clearLine(start,goal,boxes))return [goal];
 const points=[start,goal],heights=[start[1],goal[1],6.9];
 for(const b of boxes)for(const y of heights)for(const x of [b.x-b.hx-.22,b.x+b.hx+.22])for(const z of [b.z-b.hz-.22,b.z+b.hz+.22])if(Math.abs(x)<7.5&&z>-6.5&&z<6.8)points.push([x,y,z]);
 const dist=Array(points.length).fill(Infinity),parent=Array(points.length).fill(-1),done=new Set();dist[0]=0;
 for(let count=0;count<points.length;count++){let i=-1,best=Infinity;for(let j=0;j<points.length;j++)if(!done.has(j)&&dist[j]<best){i=j;best=dist[j]}if(i<0)break;if(i===1){const path=[];while(i>0){path.unshift(points[i]);i=parent[i]}return path}done.add(i);for(let j=1;j<points.length;j++)if(!done.has(j)&&clearLine(points[i],points[j],boxes)){const cost=best+Math.hypot(...points[i].map((n,k)=>n-points[j][k]));if(cost<dist[j]){dist[j]=cost;parent[j]=i}}}
 throw Error('No clear route: '+JSON.stringify({start,goal,room:s.roomId}));
}
export async function fly(page,goal,options={}){
 try{
  for(let retry=0;retry<5;retry++){
   try{const route=routeFor(await snapshot(page),goal);let result;for(let i=0;i<route.length;i++)result=await flyLeg(page,route[i],{...options,radius:i===route.length-1?(options.radius??.65):.2});return result}
   catch(error){if(error.code!=='STALLED'||retry===4)throw error;
    const s=await snapshot(page),escape=[s.position.x,Math.max(1.2,Math.min(6.9,s.position.y+(s.position.y>5.4?-1.5:1.5))),s.position.z];
    await page.evaluate(v=>(window.testFlightRecoveries ||= []).push(v),{goal,escape,room:s.roomId,elapsed:s.elapsed});
    await flyLeg(page,escape,{radius:.25,timeout:12000,recover:false});
   }
  }
 }catch(error){const s=await snapshot(page);error.message+=' Controller diagnostics: '+JSON.stringify({goal,colliders:obstaclesFor(s),nearest:nearestFor(s)?.id,snapshot:s});if(process.env.ORBIT_TEST_EVIDENCE)await page.screenshot({path:join(process.env.ORBIT_TEST_EVIDENCE,`flight-failure-${Date.now()}.png`)}).catch(()=>{});throw error}
}
export function steeringFor(s,goal,radius=.65){
 const p=s.position,v=s.velocity,d=goal.map((n,i)=>n-p[['x','y','z'][i]]),distance=Math.hypot(...d);
      const wants=new Set(),precision=distance<.8;
      if(precision)wants.add('Space');
      if(distance<radius)wants.add('Space');
      else {
        const f=s.forward,fl=Math.hypot(f.x,f.z),fx=f.x/fl,fz=f.z/fl;
        const ax=d[0]*1.5-v.x*1.65,az=d[2]*1.5-v.z*1.65,ay=d[1]*2-v.y*1.8;
        const horizontal=ax*(-fz)+az*fx,forward=ax*fx+az*fz;
        if(Math.abs(horizontal)>(precision ? .025 : .14))wants.add(horizontal>0?'d':'a');
        if(Math.abs(forward)>(precision ? .025 : .14))wants.add(forward>0?'w':'s');
        if(Math.abs(ay)>(precision ? .025 : .14))wants.add(ay>0?'q':'e');
        if(Math.hypot(ax,az)<.2&&Math.abs(ay)<.2)wants.add('Space');
      }
 return wants;
}
async function flyLeg(page,goal,{radius=.65,timeout=120000,tetherApproach=false,recover=true,until=null}={}){
  const wallStart=Date.now(),started=performance.now(),initial=await snapshot(page);let last=null,held=new Set(),watchPosition=initial.position,watchTime=initial.elapsed;
  try {
    while(performance.now()-started<3600000){
      const s=await snapshot(page);if(s.modal==='interruption'){await page.evaluate(s=>{(window.testHostInterruptions ||= []).push(s)},s);for(const k of held)await page.keyboard.up(k);held.clear();await page.evaluate(()=>document.getElementById('resume').click());continue;}assert.equal(s.modal,null,`Flight interrupted: ${JSON.stringify({modal:s.modal,hidden:s.hidden,longGaps:s.longGaps,elapsed:s.elapsed,simulationSteps:s.simulationSteps})}`);
      if(s.elapsed-initial.elapsed>timeout/1000)throw Error('Flight simulation budget exhausted: '+JSON.stringify({goal,last:s}));
      if(until?.(s))return s;
      const p=s.position,v=s.velocity,d=goal.map((n,i)=>n-p[['x','y','z'][i]]),distance=Math.hypot(...d),speed=Math.hypot(v.x,v.y,v.z);
      if(tetherApproach&&s.crate&&Math.hypot(p.x-s.crate.x,p.y-s.crate.y,p.z-s.crate.z)<3.5&&speed<.4)return s;
      if(distance<radius&&speed<(radius<=.2?.1:.4))return s;
      if(recover&&s.elapsed-watchTime>4){const moved=Math.hypot(p.x-watchPosition.x,p.y-watchPosition.y,p.z-watchPosition.z);watchTime=s.elapsed;watchPosition=p;if(moved<.2&&distance>Math.max(.35,radius*2))throw Object.assign(Error('No movement for four active seconds'),{code:'STALLED'})}
      const wants=steeringFor(s,goal,radius);
      for(const k of held)if(!wants.has(k))await page.keyboard.up(k);
      for(const k of wants)if(!held.has(k))await page.keyboard.down(k);
      held=wants;last=s;await page.waitForTimeout(100);
    }
    throw Error(`Flight timed out: ${JSON.stringify({goal,wallMs:Date.now()-wallStart,controllerMonotonicMs:performance.now()-started,clockSkewMs:Date.now()-wallStart-(performance.now()-started),simulationSeconds:last?.elapsed-initial.elapsed,frames:last?.renderer.renderCount-initial.renderer.renderCount,lastProgress:last,hostInterrupted:!!last?.longGaps.length})}`);
  } finally {for(const k of held)await page.keyboard.up(k);const clock={wallMs:Date.now()-wallStart,monotonicMs:performance.now()-started};if(Math.abs(clock.wallMs-clock.monotonicMs)>1000)await page.evaluate(clock=>{(window.testClockAdjustments ||= []).push(clock)},clock)}
}
export async function openMap(page){
 for(let attempt=0;attempt<3;attempt++){
  const s=await snapshot(page);if(s.modal==='map')return;
  if(s.modal==='interruption'){await page.evaluate(s=>{(window.testHostInterruptions ||= []).push(s);document.querySelector('#resume')?.click()},s)}
  await press(page,'m');if((await snapshot(page)).modal==='map')return;
 }
 throw Error('Map did not open: '+JSON.stringify(await snapshot(page)));
}
export async function travel(page,id){
  let s=await snapshot(page);if(!s.roomId.endsWith('safe'))await fly(page,[0,1.8,5],{radius:.6});
  await openMap(page);await page.click(`[data-room="${id}"]`);await page.waitForTimeout(200);assert.equal((await snapshot(page)).roomId,id);
}
const distanceTo=(point,d)=>Math.hypot(point[0]-d.position[0],point[1]-d.position[1],point[2]-d.position[2]);
function eligible(s,d){return !['hazard','target','light-target'].includes(d.id)&&!d.id.startsWith('crate-cell-')&&!d.id.startsWith('chamber-')&&!(s.tethered&&d.id==='crate')&&(!d.id.startsWith('rail-')||Number(d.id.slice(5))===s.railIndex+1)}
export function nearestFor(s,point=[s.position.x,s.position.y,s.position.z]){
 if(s.anchored&&s.route==='rail'&&s.railIndex<2)return s.devices.find(d=>d.id===`rail-${s.railIndex+1}`);
 return s.devices.filter(d=>eligible(s,d)&&distanceTo(point,d)<(d.range??3)).sort((a,b)=>distanceTo(point,a)-distanceTo(point,b))[0];
}
function airflowAt(s,point){return point[0]>3.8&&point[2]<1.2&&s.devices.some(d=>d.id==='hazard'&&d.position[0]===7&&d.position[2]===-5)}
export function approachFor(s,d){
 const [x,y,z]=d.position,height=Math.max(1.3,y),boxes=obstaclesFor(s),candidates=[];
 for(const radius of [1.8,2.1,1.45])for(const [dx,dz]of [[0,1],[1,0],[-1,0],[0,-1],[.707,.707],[-.707,.707],[.707,-.707],[-.707,-.707]])candidates.push([x+radius*dx,height,z+radius*dz]);
 candidates.push([x,Math.min(6.9,height+1.9),z]);let best=null;
 for(const goal of candidates){
  const distance=distanceTo(goal,d);if(Math.abs(goal[0])>7.5||Math.abs(goal[2])>7.5||distance>(d.range??3)-.25||!clearLine(goal,goal,boxes))continue;
  if(s.devices.some(other=>other.id!==d.id&&eligible(s,other)&&distanceTo(goal,other)<(other.range??3)&&distanceTo(goal,other)<distance+.35))continue;
  try{const route=routeFor(s,goal);let prev=[s.position.x,s.position.y,s.position.z],cost=0;for(const q of route){cost+=Math.hypot(...q.map((n,i)=>n-prev[i]));prev=q}if(airflowAt(s,goal))cost+=1000;if(!best||cost<best.cost)best={goal,route,cost}}catch{}
 }
 if(best)return best;throw Error('No reachable unambiguous device approach: '+JSON.stringify({id:d.id,room:s.roomId,position:s.position,device:d,boxes}));
}
export async function device(page,id){
 await dismissInterruption(page);let s=await snapshot(page);const phase=s.phaseIndex,solved=s.solvedPuzzles.length,phaseDone=q=>q.phaseIndex!==phase||q.solvedPuzzles.length!==solved;let d=s.devices.find(d=>d.id===id);assert.ok(d,`Missing ${id}`);
 const point=[s.position.x,s.position.y,s.position.z];
 if(nearestFor(s)?.id!==id||distanceTo(point,d)>(d.range??3)-.25||airflowAt(s,point)){const {goal}=approachFor(s,d);await fly(page,goal,{radius:.12,until:phaseDone});if(phaseDone(await snapshot(page)))return}
 await page.keyboard.down('Space');
 try{
  for(let i=0;i<100;i++){await dismissInterruption(page);await page.keyboard.down('Space');s=await snapshot(page);if(phaseDone(s))return;if(Math.hypot(s.velocity.x,s.velocity.y,s.velocity.z)<.1)break;await page.waitForTimeout(100)}
  s=await snapshot(page);if(phaseDone(s))return;assert.ok(Math.hypot(s.velocity.x,s.velocity.y,s.velocity.z)<.1,'Brake before interaction');assert.equal(nearestFor(s)?.id,id,`Nearest device must be intended ${id}: ${JSON.stringify(s)}`);
  const before=s;await press(page,'f');s=await snapshot(page);
  if(id.startsWith('mirror')&&s.phaseIndex===before.phaseIndex&&s.solvedPuzzles.length===before.solvedPuzzles.length){const i=Number(id.slice(7));assert.equal(s.angles[i],(before.angles[i]+1)%8,`Intended ${id} dial must turn exactly once`)}
 }finally{await page.keyboard.up('Space')}
}

export async function dock(page,puzzleId,{pointer=false}={}){
 const start=performance.now(),initial=await snapshot(page),button=page.locator('[data-action=brake]');
 const down=async()=>{if(pointer){const b=await button.boundingBox();await page.mouse.move(b.x+b.width/2,b.y+b.height/2);await page.mouse.down()}else await page.keyboard.down('Space')};
 await down();try{while(performance.now()-start<120000){const s=await snapshot(page);if(s.elapsed-initial.elapsed>12)break;if(s.solvedPuzzles.includes(puzzleId)||s.status==='completed')return;if(s.modal==='interruption'){await page.evaluate(s=>{(window.testHostInterruptions ||= []).push(s)},s);await page.mouse.up();await page.keyboard.up('Space');await page.evaluate(()=>document.getElementById('resume').click());await down()}else assert.equal(s.modal,null);await page.waitForTimeout(100)}throw Error('Docking did not complete: '+JSON.stringify(await snapshot(page)))}finally{await page.mouse.up();await page.keyboard.up('Space')}
}
