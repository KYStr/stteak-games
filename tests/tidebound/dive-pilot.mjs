import assert from 'node:assert/strict';
import {diveTarget,diveStage,valvePhase} from '../../games/tidebound/src/world.js';
export async function driveDive({page,snap,hold}){
 const start=await snap(),tasks=[];
 for(let task=0;!(await snap()).diveCollected;task++){
  assert.ok(task<=diveStage(start).stations.length,'dive interactions must make progress');
  const before=await snap(),completedBefore=before.diveTasks[before.activeDive].completedStationIds.length;
  let last=-1,watch=Date.now(),lastPoll=Date.now(),arrived=false;
  for(let i=0;i<4000;i++){const s=await snap();const observed=Date.now(),gap=observed-lastPoll;if(gap>2000)watch+=gap;lastPoll=observed;assert.equal(s.mode,'diving','unexpected dive rescue');if(s.time!==last){last=s.time;watch=Date.now();}assert.ok(Date.now()-watch<120000,'dive simulation stalled');const target=diveTarget(s),dx=target.x-s.diver.x,dz=target.z-s.diver.z;if(Math.hypot(dx,dz)<3.8){arrived=true;break;}await hold([...(Math.abs(dx)>.55?[dx>0?'d':'a']:[]),...(Math.abs(dz)>.55?[dz>0?'s':'w']:[])]);await page.waitForTimeout(140);}assert.ok(arrived,'station navigation stalled');
  await hold([]);
  let succeeded=false;for(let n=0;n<100;n++){const s=await snap();if(diveStage(s).mechanic!=='valves'||valvePhase(s.time,s.voyage.variantId)<2.7){await page.keyboard.press('e');const after=await snap();if(after.diveCollected||after.diveTasks[after.activeDive].completedStationIds.length>completedBefore){succeeded=true;break;}}await page.waitForTimeout(100);}assert.ok(succeeded,'station interaction failed');const s=await snap();tasks.push({index:task,time:s.time,oxygen:s.oxygen,completed:s.diveTasks[s.activeDive].completedStationIds.length});
 }
 await hold([]);return tasks;
}
