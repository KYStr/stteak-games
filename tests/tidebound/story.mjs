import assert from 'node:assert/strict';
import {writeFile} from 'node:fs/promises';
import {ISLANDS,CONTRACTS,DIVE_SITES} from '../../games/tidebound/src/world.js';
export async function runStory({page,base,output:out,report:acceptance,check}){
 const report={method:'Fresh storage; real keyboard/mouse only; read-only snapshots; no fixtures, teleports or time acceleration',legs:[],dives:[],errors:[],requests:[]};acceptance.story=report;const errorStart=acceptance.errors.length,requestStart=acceptance.requests.length;let started=Date.now();
const snap=()=>page.evaluate(()=>tidebound.snapshot());let held=new Set();
async function hold(wanted){const next=new Set(wanted);for(const k of held)if(!next.has(k))await page.keyboard.up(k);for(const k of next)if(!held.has(k))await page.keyboard.down(k);held=next;}
async function persist(){await writeFile(out+'/story.json',JSON.stringify(report,null,2))}
async function leg(points,id){const start=await snap(),wall=Date.now();console.log('LEG',id,'start',Math.round(start.time));
 for(const [idx,p]of points.entries()){
  const final=idx===points.length-1,deadline=Date.now()+360000;let n=0,lastTime=-1,lastProgress=Date.now();
  while(true){const s=await snap();assert.equal(s.mode,'sailing',JSON.stringify(s));if(s.time!==lastTime){lastProgress=Date.now();lastTime=s.time;}if(Date.now()-lastProgress>30000)throw Error('Simulation stopped '+JSON.stringify({id,sim:s.time,metrics:await page.evaluate(()=>tidebound.metrics()),held:[...held]}));const dx=p.x-s.boat.x,dz=p.z-s.boat.z,d=Math.hypot(dx,dz);if(d<(final?8:4))break;
   if(Date.now()>deadline||Date.now()-started>1800000)throw Error('Story navigation deadline '+JSON.stringify({id,target:p,distance:d,boat:s.boat,simulation:s.time,metrics:await page.evaluate(()=>tidebound.metrics()),held:[...held]}));
   if(n++%120===0)console.log('NAV',id,idx,Math.round(d),Math.round(s.time),'hull',s.boat.hull);
   const target=Math.atan2(dx,-dz),error=Math.atan2(Math.sin(target-s.boat.heading),Math.cos(target-s.boat.heading));
   await hold([...(Math.abs(error)>.07?[error>0?'d':'a']:[]),Math.abs(error)>.8?'Space':'w']);await page.waitForTimeout(180);
  }
 }
 await hold(['Space']);for(let i=0;i<30&&(await snap()).boat.speed>.5;i++)await page.waitForTimeout(100);await hold([]);const before=await snap();await page.keyboard.press('e');const after=await snap();assert.equal(after.currentIsland,id);assert.ok(['island','result'].includes(after.mode));
 report.legs.push({id,wallSeconds:(Date.now()-wall)/1000,simulationSeconds:after.time-start.time,hullBeforeDock:before.boat.hull,damage:after.voyage.damage,rescues:after.records.rescues});await page.screenshot({path:out+`/${report.legs.length}-${id}.png`});await persist();
}
async function dive(id){const site=DIVE_SITES.find(s=>s.id===id);await page.click('#dive');const start=await snap();console.log('DIVE',id);
 for(let i=0;i<250;i++){const s=await snap();assert.equal(s.mode,'diving');const dx=site.target.x-s.diver.x,dz=site.target.z-s.diver.z;if(Math.hypot(dx,dz)<4.1)break;await hold([...(Math.abs(dx)>1?[dx>0?'d':'a']:[]),...(Math.abs(dz)>1?[dz>0?'s':'w']:[])]);await page.waitForTimeout(140)}
 await hold([]);await page.keyboard.press('e');const end=await snap();assert.ok(end.parts.includes(site.partId));await page.screenshot({path:out+'/'+id+'.png'});report.dives.push({id,seconds:end.time-start.time,oxygen:end.oxygen});await page.click('#surface-button');assert.equal((await snap()).mode,'island');await persist();
}
 try{await page.evaluate(()=>sessionStorage.setItem('tidebound.test.fresh','1'));await page.goto(base);await page.waitForFunction(()=>window.tidebound);assert.equal((await snap()).time,0);assert.deepEqual((await snap()).discoveries,[]);assert.deepEqual((await snap()).parts,[]);report.startedAt=new Date().toISOString();await persist();started=Date.now();await page.click('#depart');
 for(const l of CONTRACTS[0].routes[0].legs){await leg(l.waypoints.slice(1),l.toIslandId);if(l.toIslandId==='harbor')continue;await page.click('#investigate');for(const o of CONTRACTS[0].objectives.filter(o=>o.islandId===l.toIslandId&&o.siteId))await dive(o.siteId);await page.click('#leave-island')}
 report.firstCommission=await snap();assert.ok(report.firstCommission.completed.includes('coral-survey'));await page.click('#next-voyage');await page.selectOption('#contract','star-reading');await page.click('#depart');
 await leg(CONTRACTS.find(c=>c.id==='star-reading').routes[0].waypoints.slice(1),'ruin');await page.click('#investigate');await dive('ruin-dive');await page.click('#leave-island');
 await leg([{x:60,z:-150},ISLANDS.find(i=>i.id==='lighthouse').dock],'lighthouse');await page.click('#investigate');assert.equal((await snap()).lighthouseFixed,true);await page.screenshot({path:out+'/lighthouse-fixed.png'});await page.click('#leave-island');
 await leg([...CONTRACTS.find(c=>c.id==='keepers-journal').routes[0].waypoints].reverse().slice(1),'harbor');report.final=await snap();assert.equal(report.final.storyComplete,true);await page.screenshot({path:out+'/full-story-ending.png'});report.wallSeconds=(Date.now()-started)/1000;report.metrics=await page.evaluate(()=>tidebound.metrics());
 await page.click('#next-voyage');await page.click('#depart');assert.equal((await snap()).mode,'sailing');report.replay=true;report.errors=acceptance.errors.slice(errorStart);report.requests=acceptance.requests.slice(requestStart);assert.deepEqual(report.errors,[]);assert.deepEqual(report.requests,[]);report.passed=true;check('fresh storage: first commission, three dives, lighthouse, homecoming and replay');

 }catch(e){report.passed=false;report.failure=e.stack;report.failureState=await snap().catch(()=>null);await page.screenshot({path:out+'/story-failure.png'}).catch(()=>{});throw e;}finally{await hold([]);await persist();}
}
