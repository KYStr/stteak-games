import assert from 'node:assert/strict';
import {LEVELS} from '../../games/signal-zero/src/levels.js';
export async function runBrowserChapter(page,index,{artifacts,clock=false,route='upper',seedLabel='current',fromCurrent=false}={}){
 const level=LEVELS[index],keys=new Set(),trace=[],introductions=[],seen=new Set();let jumpUntil=0,lastToolAt=-10;
 async function setKeys(desired){for(const k of keys)if(!desired.includes(k)){await page.keyboard.up(k);keys.delete(k);}for(const k of desired)if(!keys.has(k)){await page.keyboard.down(k);keys.add(k);}}
 const starting=fromCurrent?await page.evaluate(()=>signalZeroControlState):null;let actions=level.terminals.map(t=>({...t,kind:'hack'}));if(route==='upper')for(const entry of level.upperEntries)actions.push({kind:'ladder',x:entry.x,y:entry.y1});actions.push({kind:'exit',...level.exit});actions.sort((a,b)=>a.x-b.x);if(starting)actions=actions.filter(a=>a.x>=starting.player.x-1&&!(a.kind==='hack'&&starting.objectives.includes(a.id)));
 let last,competent25;
 try{for(const action of actions){const start=Date.now();for(let frame=0;frame<10000;frame++){
  if(frame%200===0)console.log('TRAVERSE',index,action.kind,action.x,frame);const s=await page.evaluate(()=>window.signalZeroControlState);last=s;if(!competent25&&s.time>=25)competent25={time:s.time,x:s.player.x,objectives:s.objectives.length,alerts:s.alerts};assert.equal(s.levelIndex,index);if(s.screen==='pause'){await page.click('#resume',{force:true});continue;}if(s.phase!=='playing')break;
  for(const encounter of s.encounters)if(!seen.has(encounter.id)){seen.add(encounter.id);introductions.push(encounter);}
  const p=s.player,delta=action.x-p.x,near=Math.abs(delta)<.55;
  if(action.kind==='hack'&&s.objectives.includes(action.id))break;
  if(action.kind==='ladder'&&Math.abs(delta)<1.8&&p.y>=action.y-.03)break;
  const cover=level.covers.some(c=>Math.abs(c.x-p.x)<2.4&&(c.x-p.x)*Math.sign(delta)>0&&p.y<c.y+c.h/2-.05&&c.y-c.h/2<p.y+1.65);
  const guard=s.devices.find(d=>d.type==='guard'&&Math.abs(d.x-p.x)<3&&(d.x-p.x)*Math.sign(delta)>0&&Math.abs(d.y-p.y)<1.2);
  const support=level.platforms.find(a=>Math.abs(a.y+a.h/2-p.y)<.06&&p.x>=a.x-a.w/2-.1&&p.x<=a.x+a.w/2+.1),edge=support?support.x+support.w/2:Infinity;
  const landing=support&&level.platforms.some(a=>a!==support&&a.x-a.w/2>edge+.05&&a.x-a.w/2<edge+3.2&&a.y+a.h/2>=p.y-1.5&&a.y+a.h/2<=p.y+1.3);
  const gap=p.grounded&&landing&&edge-p.x<1.35&&edge-p.x>-.2;if(gap)jumpUntil=s.time+.7;
  const desired=[];if(!near)desired.push(delta>0?'KeyD':'KeyA');if(near&&action.kind!=='exit')desired.push('KeyW');
  const jump=p.grounded&&!near&&(cover||guard||gap);if((jump||s.time<jumpUntil||(!p.grounded&&p.vy>0))&&!(p.grounded&&keys.has('Space')))desired.push('Space');
  const threat=s.devices.find(d=>!d.rewired&&d.disabledUntil<=s.time&&Math.abs(d.x-p.x)<(d.type==='guard'?7:5)&&Math.abs(d.y-p.y)<(d.type==='guard'?1.2:5)&&d.state!=='searching'&&d.state!=='disabled');
  if(threat&&s.time-lastToolAt>1){lastToolAt=s.time;const tool=threat.type==='guard'?1:threat.type==='drone'?0:2;if(s.tools[tool]>0){if(s.selectedTool!==tool)await page.click('[data-tool="'+tool+'"]',{force:true});await page.keyboard.press('KeyE');}}
  await setKeys(desired);if(clock)await page.clock.fastForward(100);else await page.waitForTimeout(50);
  if(Date.now()-start>1200000)throw Error('Timed out '+JSON.stringify({action,s}));
 }
 trace.push({kind:action.kind,x:action.x,actualX:last.player.x,y:last.player.y,time:last.time,objectives:last.objectives.length,phase:last.phase});if(last.phase!=='playing')break;}
 await setKeys([]);last=await page.evaluate(()=>window.signalZeroControlState);assert.equal(last.phase,'complete','Input-only traversal failed: '+JSON.stringify({last,trace}));assert.equal(last.objectives.length,4);if(artifacts)await page.screenshot({path:`${artifacts}/chapter-${index+1}-${seedLabel}.png`});
 return {chapter:index+1,phase:last.phase,seed:last.seed,time:last.time,alerts:last.alerts,traceRemaining:last.traceRemaining,tools:last.tools,trace,introductions,competent25,clock:clock?'virtual 100ms RAF ticks; real keyboard, live renderer':'wall clock'};
 }finally{await setKeys([]);}
}
