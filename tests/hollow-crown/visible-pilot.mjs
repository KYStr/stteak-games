import {VisibleController,publicView} from './visible-controller.js';
export async function installVisiblePilot(page,strategy='mobility',mode='competent'){
 const source=`return {VisibleController:(${VisibleController.toString()}),publicView:(${publicView.toString()})}`;
 await page.evaluate(async({source,strategy,mode})=>{
  const rules=await import('./rules.js'),{VisibleController,publicView}=new Function('findPath','lineClear','shapeHits','blocked',source)(rules.findPath,rules.lineClear,rules.shapeHits,rules.blocked),bot=new VisibleController(strategy);
  const held=new Set(),metrics={history:[],decisions:0,stages:[],builds:[],introductions:[],menuMs:0,progressSamples:[],strategy,mode};const started=performance.now();let lastTime=started,rng=731;
  const key=(code,down)=>{if(held.has(code)===down)return;if(down)held.add(code);else held.delete(code);window.dispatchEvent(new KeyboardEvent(down?'keydown':'keyup',{code,key:code==='Space'?' ':code.replace('Key','').toLowerCase(),bubbles:true}));};
  const release=()=>{for(const code of held)key(code,false);};
  const random=()=>{rng=(Math.imul(rng,1664525)+1013904223)>>>0;return rng/4294967296;};
  const timer=setInterval(()=>{
   const snap=hollowCrownDiagnostics.snapshot(),run=snap.run,now=performance.now();if(!run)return;if(snap.overlay)metrics.menuMs+=now-lastTime;lastTime=now;
   if(run.phase==='result'){release();return;}
   if(snap.overlay){release();if(run.phase==='reward'){
    const replacements=[...document.querySelectorAll('[data-action="replace"]')];if(replacements.length){const replace=replacements.find(b=>b.dataset.id!==run.startTalent&&rules.TALENTS.find(t=>t.id===b.dataset.id).school!==strategy);if(replace)replace.click();else document.querySelector('[data-action="cancel-replace"]')?.click();return;}
    const choices=[...document.querySelectorAll('[data-action="reward"]')],school=choices.find(b=>rules.TALENTS.find(t=>t.id===b.dataset.id)?.school===strategy),replace=run.talents.find(id=>id!==run.startTalent&&rules.TALENTS.find(t=>t.id===id).school!==strategy);
    const button=mode==='random'?choices[Math.floor(random()*choices.length)]:run.player.hp<75||!school||run.talents.length===4&&!replace?choices.find(b=>b.dataset.id==='restore'):school;button?.click();
   }else if(run.phase==='route'){const story=document.querySelector('[data-action="story"]');if(story){story.click();return;}document.querySelector('[data-action="room"]')?.click();}return;}
   const view=publicView(run);metrics.decisions++;
   if(!metrics.stages.some(r=>r.index===run.roomIndex)){metrics.stages.push({index:run.roomIndex,id:run.room.id,entryHp:run.player.hp,at:run.time,wall:now,roster:run.enemies.map(e=>({type:e.type,hp:e.hp,speed:rules.ENEMIES[e.type].speed,damage:rules.ENEMIES[e.type].damage,windup:rules.ENEMIES[e.type].windup})),risk:run.roomRisk});const mechanic=run.objective?.shape||run.objective?.kind||'boss';if(!metrics.introductions.some(m=>m.kind===mechanic))metrics.introductions.push({kind:mechanic,at:run.time});}
   const ids=run.talents.join(',');if(metrics.builds.at(-1)?.ids!==ids)metrics.builds.push({ids,at:run.time});
   if(metrics.decisions%25===0)metrics.progressSamples.push({at:run.time,room:run.roomIndex,kills:run.stats.kills,objective:run.objective?.completed,damage:run.stats.damageDealt});
   let c=mode==='idle'?{}:mode==='random'?{moveX:random()*2-1,moveZ:random()*2-1,attackPressed:random()<.65,attackHeld:random()<.3,attackReleased:random()<.3,block:random()<.2,dodge:random()<.2}:bot.decide(view);
   metrics.history.push({active:run.time,wall:now-started,stage:run.roomIndex+1,hp:run.player.hp,energy:run.player.energy,action:run.player.action,bosses:run.enemies.filter(e=>rules.ENEMIES[e.type].boss).map(e=>({hp:e.hp,phase:e.phase,state:e.state,attack:view.enemies.find(v=>v.id===e.id)?.attack})),input:{...c}});while(metrics.history.length>1&&(metrics.history[0].active<run.time-20||metrics.history.length>200))metrics.history.shift();
   key('KeyD',c.moveX>.3);key('KeyA',c.moveX<-.3);key('KeyS',c.moveZ>.3);key('KeyW',c.moveZ<-.3);key('KeyK',!!c.block);key('Space',!!c.dodge);
   if(c.attackHeld&&!c.attackPressed)key('KeyJ',true);else{key('KeyJ',false);if(c.attackPressed)key('KeyJ',true);}
  },200);
  window.visiblePilot={metrics,stop(){clearInterval(timer);release();bot.path.length=0;if(bot.path._pool)bot.path._pool.length=0;bot.guardAge.clear();delete window.visiblePilot;return metrics;}};
 },{source,strategy,mode});
}
