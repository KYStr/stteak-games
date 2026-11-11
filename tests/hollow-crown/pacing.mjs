// Reaction-limited browser play. Samples visible actor positions/actions every
// 200ms; never reads enemy timers, attack objects, future geometry or mutates runs.
// This is automated pacing evidence, not a human assessment of fun.
import {writeFile} from 'node:fs/promises';
import {url,artifact,harness} from './test-config.mjs';
import {freshProfile} from '../../public/games/hollow-crown/storage.js';
const runner=await harness(),report={reactionMs:200,humanPlay:false,cases:[],errors:[]};
const limit=Number(process.env.HOLLOW_PACING_CASE_MS||900000);
report.clockMode='live wall clock';
const scenarios=['standard','pilgrim'].flatMap(difficulty=>[72,4837].flatMap(seed=>['mobility','counter','burn'].map(strategy=>({difficulty,seed,strategy}))));
try {
 const page=await runner.browser.newPage({viewport:{width:1280,height:720}});page.on('pageerror',e=>report.errors.push(e.message));page.on('console',e=>{if(e.type()==='error')report.errors.push(e.text());});
 for(const scenario of scenarios){
  await page.goto(url);await page.waitForFunction(()=>window.hollowCrownDiagnostics);const profile=freshProfile();profile.tutorialDone=true;profile.unlocked.push('kindling');
  await page.evaluate(p=>{localStorage.clear();localStorage.setItem('stteak.hollow-crown.v1',JSON.stringify(p));},profile);await page.reload();await page.waitForFunction(()=>window.hollowCrownDiagnostics);
  await page.click('[data-action="progress"]');await page.locator('[data-config="seed"]').fill(String(scenario.seed));await page.locator('[data-config="seed"]').dispatchEvent('change');await page.keyboard.press('Escape');
  await page.locator('[data-config="difficulty"]').selectOption(scenario.difficulty);await page.locator('[data-config="startTalent"]').selectOption({mobility:'fleet-ash',counter:'wide-oath',burn:'kindling'}[scenario.strategy]);await page.click('[data-action="begin"]');
  await page.evaluate(async strategy=>{
   const {findPath,lineClear}=await import('./rules.js');let held=new Set(),ticks=0,menuSince=0,lastPhase='',lastWall=performance.now();const metrics={menus:0,builds:[],rooms:[],samples:0};
   const key=(code,down)=>{if(held.has(code)===down)return;if(down)held.add(code);else held.delete(code);window.dispatchEvent(new KeyboardEvent(down?'keydown':'keyup',{code,key:code==='Space'?' ':code.replace('Key','').toLowerCase(),bubbles:true}));};const release=()=>{for(const code of [...held])key(code,false);};
   const timer=setInterval(()=>{
    const snap=hollowCrownDiagnostics.snapshot(),run=snap.run;if(!run)return;metrics.samples++;const now=performance.now();if(snap.overlay)metrics.menus+=now-lastWall;lastWall=now;
    // Only copy visible actor state. Intentionally do not access attack or timer.
    const p=run.player,enemies=run.enemies.filter(e=>e.hp>0).map(e=>({x:e.x,z:e.z,type:e.type,state:e.state,shieldBroken:e.shieldBroken}));
    if(!metrics.rooms.some(r=>r.index===run.roomIndex))metrics.rooms.push({id:run.room.id,index:run.roomIndex,simulation:run.time,wall:now});
    const build=run.talents.join(',');if(metrics.builds.at(-1)?.ids!==build)metrics.builds.push({ids:build,simulation:run.time});
    if(run.phase==='result'){release();return;}
    if(snap.overlay){release();if(lastPhase!==run.phase){menuSince=now;lastPhase=run.phase;}if(now-menuSince<1600)return;
     if(run.phase==='reward'){const choices=[...document.querySelectorAll('[data-action="reward"]')];let button;if(p.hp<55)button=choices.find(b=>b.dataset.id==='restore');if(!button){button=choices.find(b=>b.querySelector('.tag')?.textContent==={mobility:'機動',counter:'反擊',burn:'燃燒'}[strategy])||choices.find(b=>b.dataset.id!=='restore')||choices[0];}button?.click();const replacement=document.querySelector('[data-action="replace"]');replacement?.click();}
     if(run.phase==='route'){const story=document.querySelector('[data-action="story"]');if(story){story.click();return;}document.querySelector('[data-action="room"]')?.click();}return;
    }
    lastPhase='';ticks++;enemies.sort((a,b)=>Math.hypot(a.x-p.x,a.z-p.z)-Math.hypot(b.x-p.x,b.z-p.z));const target=enemies[0];if(!target){release();return;}
    const dx=target.x-p.x,dz=target.z-p.z,d=Math.hypot(dx,dz)||1,desired=target.type==='shield'?3.1:target.type==='spear'?3.2:3;
    let mx=dx/d,mz=dz/d;if(d<desired-.25){mx=-mx;mz=-mz;}else if(d<desired+.2){mx=0;mz=0;}
    if(!lineClear(run.room,p.x,p.z,target.x,target.z,p.radius+.05)){const path=findPath(run.room,p,target,p.radius);const node=path.find(n=>Math.hypot(n.x-p.x,n.z-p.z)>.45);if(node){const dist=Math.hypot(node.x-p.x,node.z-p.z);mx=(node.x-p.x)/dist;mz=(node.z-p.z)/dist;}}
    const danger=enemies.find(e=>['telegraph','attack'].includes(e.state)&&Math.hypot(e.x-p.x,e.z-p.z)<5.2);let block=false,dodge=false;
    if(danger){if(strategy==='counter'&&['soldier','spear','shield'].includes(danger.type)&&d<3.4)block=true;else if(p.energy>35&&ticks%4===0){dodge=true;mx=dz/d;mz=-dx/d;}}
    key('KeyD',mx>.3);key('KeyA',mx<-.3);key('KeyS',mz>.3);key('KeyW',mz<-.3);key('KeyK',block);key('Space',dodge);
    if(target.type==='shield'&&target.shieldBroken<=0&&d<4.5&&!block){if(p.heldTime>=.8)key('KeyJ',false);else key('KeyJ',true);}else{key('KeyJ',false);if(!block&&!dodge&&d<3.6&&p.cooldown<=0)key('KeyJ',true);}
   },200);
   window.pacingController={metrics,stop(){clearInterval(timer);release();}};
  },scenario.strategy);
  const started=performance.now();while(performance.now()-started<limit){await page.waitForTimeout(1000);if(await page.evaluate(()=>hollowCrownDiagnostics.snapshot().run.phase==='result'))break;}
  const result=await page.evaluate(()=>{pacingController.stop();const s=hollowCrownDiagnostics.snapshot().run;return{simulationSeconds:s.time,encounters:s.roomHistory,builds:pacingController.metrics.builds,menuMs:pacingController.metrics.menus,roomsSeen:pacingController.metrics.rooms,hits:s.stats.hits,deaths:s.result?.won===false?1:0,won:s.result?.won??null,complete:s.phase==='result',samples:pacingController.metrics.samples};});report.cases.push({...scenario,wallMs:performance.now()-started,...result});console.log(JSON.stringify(report.cases.at(-1)));await writeFile(artifact('pacing-progress.json'),JSON.stringify(report,null,2));
 }
 report.complete=report.cases.length===12&&report.cases.every(c=>c.complete);report.tenMinuteProgressingSession=report.cases.some(c=>c.simulationSeconds>=600&&c.roomsSeen.some(r=>r.index>=6)&&c.builds.length>=3);report.passed=report.complete&&report.tenMinuteProgressingSession&&report.errors.length===0;if(!report.passed)process.exitCode=1;
} catch(e){report.failure=e.stack;process.exitCode=1;console.error(e);} finally{await writeFile(artifact('pacing.json'),JSON.stringify(report,null,2));await runner.cleanup();}
