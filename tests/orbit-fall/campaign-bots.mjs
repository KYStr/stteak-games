import assert from 'node:assert/strict';
import {mkdir,writeFile} from 'node:fs/promises';
import {fileURLToPath,pathToFileURL} from 'node:url';
import {chromium} from '/workspace/stteak8/tools/node_modules/playwright-core/index.mjs';
import {graphicsProbe} from './graphics-probe.mjs';
import {snapshot,press,fly,travel,device} from './flight.mjs';

export async function waitActive(page,predicate,{timeout=30000,brake=false}={}){const start=performance.now(),initial=await snapshot(page);if(brake)await page.keyboard.down('Space');try{while(performance.now()-start<3600000){const s=await snapshot(page);if(s.elapsed-initial.elapsed>timeout/1000)throw Error('Active wait exceeded simulation budget: '+JSON.stringify(s));if(predicate(s))return s;if(s.modal==='interruption'){await page.evaluate(()=>document.querySelector('#resume')?.click());if(brake)await page.keyboard.down('Space')}else assert.equal(s.modal,null,`Unexpected modal ${s.modal}`);await page.waitForTimeout(100)}throw Error('Timed out: '+JSON.stringify(await snapshot(page)))}finally{if(brake)await page.keyboard.up('Space')}}
export async function solveRepair(page,{route='direct',log=[],reloadPhase=false}={}){
 let first=await snapshot(page);const id=first.repair.id;let reloaded=false;
 while(!(await snapshot(page)).solvedPuzzles.includes(id)){
  let s=await snapshot(page);const p=s.repair,index=s.phaseIndex;console.log(`${p.roomId} ${index+1}/${p.phaseCount} ${p.type} @ ${s.elapsed.toFixed(1)}s`);
  log.push({event:'phase-start',room:s.roomId,index,type:p.type,renderer:s.renderer,feature:p.phases.some(ph=>ph.type!==p.phases[0].type)?(p.deck===1?'mixed-relay':p.deck===2?'cold-restart':'power-distribution'):p.routeEnabled?(p.deck===3?'core-freight':'freight-routes'):p.type==='reflection'?(p.mirrorPositions.length===2?'two-mirror':p.deck===3?'core-optics':p.deck===2?'height-relay':'bypass-optics'):p.type==='airlock'?(p.valvePositions.length>3?(p.phases.length>3?'four-chamber-relay':'chamber-transfer'):p.deck===3?'core-interlock':p.deck===2?'vertical-interlock':'pressure-interlock'):'multi-cell',elapsed:s.elapsed,activeBrowserSeconds:s.activeBrowserSeconds+log.filter(e=>e.event==='reload').reduce((n,e)=>n+e.previousPageActiveSeconds,0),controllerMs:performance.now()});
  if(p.type==='momentum'){
   if(p.routeEnabled&&route==='bypass')await device(page,'bypass');
   await fly(page,[s.crate.x,s.crate.y,s.crate.z+1.8],{radius:.55});if(!(await snapshot(page)).tethered)await press(page,'t');assert.equal((await snapshot(page)).tethered,true);
   if(p.routeEnabled&&route==='rail'){
    await device(page,'rail-0');
    for(let i=0;i<3;i++){
     if(i>0)await press(page,'f');const goal=p.railPoints[i];await waitActive(page,s=>Math.hypot(s.position.x-goal[0],s.position.y-goal[1],s.position.z-goal[2])<.15,{timeout:30000});
    }
   }else await fly(page,[p.target[0],p.target[1],p.target[2]+1.3],{radius:.45});
   await waitActive(page,s=>s.phaseIndex!==index||s.solvedPuzzles.includes(id),{brake:true,timeout:20000});
  }else if(p.type==='reflection'){
   for(let i=0;i<p.mirrorPositions.length;i++){
    s=await snapshot(page);if(s.phaseIndex!==index||s.solvedPuzzles.includes(id))break;
    await device(page,`mirror-${i}`);
    for(let turns=1;turns<8;turns++){s=await snapshot(page);if(s.phaseIndex!==index||s.solvedPuzzles.includes(id)||s.angles[i]===p.targetAngles[i])break;await press(page,'f')}
   }
  }else{
   for(let n=s.sequence.length;n<p.sequence.length;n++)await device(page,`valve-${p.sequence[n]}`);
  }
  s=await snapshot(page);assert.ok(s.phaseIndex!==index||s.solvedPuzzles.includes(id),'Each physical work cycle must advance');
  if(reloadPhase&&!reloaded&&!s.solvedPuzzles.includes(id)){
   await press(page,'Escape');await page.click('#save-now');const before=await snapshot(page);await page.reload();await page.click('#continue');s=await snapshot(page);assert.equal(s.phaseIndex,before.phaseIndex);assert.equal(s.seed,before.seed);assert.deepEqual(s.repair,before.repair);assert.ok(Math.hypot(s.velocity.x,s.velocity.y,s.velocity.z)<.2);reloaded=true;log.push({event:'reload',elapsed:s.elapsed,previousPageActiveSeconds:before.activeBrowserSeconds});
  }
 }
 return snapshot(page);
}

export async function campaign(browser,url,evidence,{seed=null,reloadPhase=true}={}){
 const result={fresh:true,progressionMutation:false,clockAcceleration:false,events:[],errors:[],requests:[]},start=performance.now();let context,page;
 try{
  context=await browser.newContext({viewport:{width:1280,height:720}});await context.addInitScript(graphicsProbe);page=await context.newPage();page.on('pageerror',e=>result.errors.push(e.message));page.on('console',m=>{if(m.type()==='error')result.errors.push(m.text())});page.on('requestfailed',r=>result.requests.push(r.url()));
  await page.goto(url);await page.locator('#story').waitFor({timeout:60000});result.initialTransferBytes=await page.evaluate(()=>performance.getEntriesByType('resource').reduce((sum,r)=>sum+r.transferSize,0)+performance.getEntriesByType('navigation')[0].transferSize);await page.click('#preferences');await page.check('#reduced');await page.check('#low');await page.click('#preferences-back');await page.click('#story');await device(page,'tools');
  // The fresh journey seed comes exclusively from crypto. Seeded challenge trials
  // below use the visible seed input. No URL or hidden progression hook is used.
  result.seed=(await snapshot(page)).seed;
  const content=await page.evaluate(async()=>{const c=(await import('./content.js')).getCampaign();return {decks:c.decks,rooms:c.rooms}});
  const activeStart=await snapshot(page);let previousActive=0;
  for(const deck of content.decks){const begin=await snapshot(page),stage={deck:deck.id,startElapsed:begin.elapsed,startActive:begin.activeBrowserSeconds+result.events.filter(e=>e.event==='reload').reduce((n,e)=>n+e.previousPageActiveSeconds,0)};
   if(deck.id>1)await travel(page,`room-d${deck.id}-safe`);
   for(const id of deck.puzzleIds){const room=content.rooms.find(r=>r.puzzleId===id);await travel(page,room.id);await solveRepair(page,{route:'bypass',log:result.events,reloadPhase:reloadPhase&&id===deck.puzzleIds[0]});if(room.signalId){await device(page,'signal');await page.click('#signal-back')}
    // Refill between long standard repairs; this is physical travel via the exit.
    if((await snapshot(page)).oxygen<35)await travel(page,`room-d${deck.id}-safe`);
   }
   const story=content.rooms.find(r=>r.deck===deck.id&&r.type==='signal');await travel(page,story.id);await device(page,'signal');await page.click('#signal-back');const end=await snapshot(page);Object.assign(stage,{endElapsed:end.elapsed,endActive:end.activeBrowserSeconds+result.events.filter(e=>e.event==='reload').reduce((n,e)=>n+e.previousPageActiveSeconds,0),health:end.health,oxygen:end.oxygen,deaths:end.stats.deaths});(result.stages ||= []).push(stage);
  }
  await device(page,'ending');await page.click('[data-ending=beacon]');result.firstEnding=await snapshot(page);result.controllerMonotonicMs=performance.now()-start;result.simulationSeconds=result.firstEnding.elapsed;result.activeBrowserSeconds=result.firstEnding.activeBrowserSeconds+result.events.filter(e=>e.event==='reload').reduce((n,e)=>n+e.previousPageActiveSeconds,0);
  result.exposures=[];const seen=new Set();for(const event of result.events){const feature=event.feature||event.type;if(!seen.has(feature)){seen.add(feature);result.exposures.push({feature,simulationSeconds:event.elapsed,activeBrowserSeconds:event.activeBrowserSeconds})}}
  result.exposureGaps=result.exposures.slice(1).map((e,i)=>e.simulationSeconds-result.exposures[i].simulationSeconds);
  for(const width of [1280,1920]){await page.setViewportSize({width,height:width*9/16});await page.screenshot({path:fileURLToPath(new URL(`new-ending-${width}.png`,evidence))})}
  await page.click('#result-continue');await press(page,'f');await page.click('[data-ending=memory]');await context.storageState({path:fileURLToPath(new URL('campaign-storage.json',evidence))});assert.deepEqual((await snapshot(page)).endings,['beacon','memory']);assert.equal(result.firstEnding.solvedPuzzles.length,18);assert.equal(result.firstEnding.signals.length,6);
  assert.deepEqual(result.errors,[]);assert.deepEqual(result.requests,[]);
  result.maxDrawCalls=Math.max(...result.events.filter(e=>e.renderer).map(e=>e.renderer.drawCalls));result.maxTriangles=Math.max(...result.events.filter(e=>e.renderer).map(e=>e.renderer.triangles));result.textureBudget=await page.evaluate(()=>window.testTextureBudget);assert.ok(result.maxDrawCalls<=250);assert.ok(result.maxTriangles<=1500000);assert.ok(result.textureBudget.peakBytes<=256*1024*1024);assert.ok(result.initialTransferBytes<=30*1024*1024);
  result.durationPassed=result.simulationSeconds>=600&&result.activeBrowserSeconds>=600;
  assert.ok(result.exposureGaps.every(gap=>gap<=180),'New mechanic exposure gaps <=180 simulation seconds');assert.equal(result.durationPassed,true,`Active campaign duration: simulation ${result.simulationSeconds}s, active browser ${result.activeBrowserSeconds}s; needs >=600 each`);
  result.passed=true;return result;
 }catch(e){result.failure=e.stack;result.lastSnapshot=page?await snapshot(page).catch(()=>null):null;if(page)await page.screenshot({path:fileURLToPath(new URL('campaign-failure.png',evidence))}).catch(()=>{});throw e}finally{await writeFile(new URL('campaign.json',evidence),JSON.stringify(result,null,2));await context?.close()}
}

if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){
 const evidence=process.env.ORBIT_TEST_EVIDENCE?pathToFileURL(process.env.ORBIT_TEST_EVIDENCE.replace(/\/$/,'')+'/'):new URL(`./evidence/campaign-${Date.now()}/`,import.meta.url);await mkdir(evidence,{recursive:true});const browser=await chromium.launch({executablePath:'/usr/bin/google-chrome',args:['--use-angle=swiftshader','--enable-unsafe-swiftshader','--renderer-process-limit=1','--num-raster-threads=1','--disable-dev-shm-usage','--autoplay-policy=no-user-gesture-required']});try{await campaign(browser,process.env.ORBIT_TEST_URL||'http://127.0.0.1:8106/games/orbit-fall/',evidence);console.log('Fresh campaign passed')}finally{await browser.close()}
}

export async function routeAndSeedBots(browser,url,evidence){
 const result={routes:[],trials:[],naturalBots:[],failures:[],seedLayouts:{},fixtureAssisted:false},seeds=[123,456,17,29,43,61,89,131,197,263].slice(0,Number(process.env.ORBIT_MATRIX_SEEDS||10));let context;
 try{
  context=await browser.newContext({viewport:{width:1280,height:720},storageState:fileURLToPath(new URL('campaign-storage.json',evidence))});const page=await context.newPage();
  const openMenu=async()=>{let s=await snapshot(page);if(s.modal==='result'){await page.click('#result-challenges');return}if(s.modal==='failure'){await page.click('#challenge-return');s=await snapshot(page)}if(s.modal==='start'){await page.click('#continue');s=await snapshot(page);if(s.modal==='result'){await page.click('#result-challenges');return}}if(s.modal)await press(page,'Escape');await press(page,'Escape');await page.click('#map');await page.click('#challenge-menu')};
  const launch=async(id,seed)=>{await openMenu();await page.fill('#challenge-seed',String(seed));await page.selectOption('#challenge-mode','standard');await page.click(`[data-challenge=${id}]`)};
  await page.goto(url);await page.locator('#continue').waitFor();
  for(const route of ['direct','rail','bypass'])for(let trial=0;trial<3;trial++){
   await launch('challenge-engineering',123);await travel(page,'room-d2-cargo');const before=await snapshot(page);await solveRepair(page,{route});const after=await snapshot(page);result.routes.push({route,trial,win:after.solvedPuzzles.includes('puzzle-momentum-2'),seconds:after.elapsed-before.elapsed,oxygen:after.stats.oxygenUsed-before.stats.oxygenUsed,thrust:after.stats.thrustSeconds-before.stats.thrustSeconds,health:after.health,hits:after.stats.hazardHits-before.stats.hazardHits,exposure:after.stats.hazardExposureSeconds-before.stats.hazardExposureSeconds});await press(page,'Escape');await page.click('#title-back');await page.click('#continue');
  }
  const median=(route,key)=>{const a=result.routes.filter(r=>r.route===route).map(r=>r[key]).sort((a,b)=>a-b);return a[1]};
  if(!(median('direct','seconds')<=median('bypass','seconds')*.85))result.failures.push('Direct median must be >=15% faster than bypass');
  if(!(median('rail','oxygen')<=median('direct','oxygen')*.8))result.failures.push('Rail median must save >=20% oxygen');
  if(!(median('rail','thrust')<=median('direct','thrust')*.8))result.failures.push('Rail median must save >=20% thrust');
  if(!result.routes.filter(r=>r.route==='bypass').every(r=>r.hits===0))result.failures.push('Bypass must avoid all hazard hits');
  for(const seed of seeds)for(const [deck,id] of [[1,'challenge-cargo'],[2,'challenge-engineering'],[3,'challenge-core']]){
   const trial={seed,deck,id,win:false};try{await launch(id,seed);const initial=await snapshot(page);if(seed===123||seed===456){await travel(page,deck===1?'room-d1-cargo':deck===2?'room-d2-cargo':'room-d3-optics');result.seedLayouts[`${seed}:${deck}`]=(await snapshot(page)).repair}
    const tasks=await page.evaluate(async id=>(await import('./content.js')).challenges.find(c=>c.id===id).puzzleIds,id);
    for(const puzzleId of tasks){const roomId=await page.evaluate(async id=>(await import('./content.js')).puzzles[id].roomId,puzzleId);if((await snapshot(page)).roomId!==roomId)await travel(page,roomId);await solveRepair(page)}
    const final=await snapshot(page);Object.assign(trial,{win:final.status==='completed',seconds:final.elapsed,oxygen:final.stats.oxygenUsed,thrust:final.stats.thrustSeconds,health:final.health});
    assert.equal(trial.win,true);
   }catch(e){trial.failure=e.stack;result.failures.push(`seed ${seed} deck ${deck}: ${e.message}`)}result.trials.push(trial);await writeFile(new URL('bots-progress.json',evidence),JSON.stringify(result,null,2));
  }
  for(const kind of ['idle','random']){
   await launch('challenge-cargo',421);const start=performance.now(),initial=await snapshot(page);let rng=421,inputs=0;const random=()=>{rng^=rng<<13;rng^=rng>>>17;rng^=rng<<5;return(rng>>>0)/4294967296};
   while((await snapshot(page)).status==='running'){
    const s=await snapshot(page);if(s.modal==='interruption')await page.evaluate(()=>document.querySelector('#resume')?.click());else if(s.modal==='signal')await page.click('#signal-back');
    if(kind==='random'){const keys=['w','a','s','d','q','e','Space','f','t'];const key=keys[Math.floor(random()*keys.length)];await page.keyboard.down(key);await page.waitForTimeout(250);await page.keyboard.up(key);inputs++}else await page.waitForTimeout(500);
   }
   const final=await snapshot(page);result.naturalBots.push({kind,inputs,wallMs:performance.now()-start,simulationSeconds:final.elapsed-initial.elapsed,status:final.status,repairs:final.solvedPuzzles.length,reason:final.modal,health:final.health,oxygenUsed:final.stats.oxygenUsed});assert.equal(final.status,'failed');assert.equal(final.solvedPuzzles.length,0);
  }
  result.stageFailureFractions=[1,2,3].map(deck=>{const trials=result.trials.filter(t=>t.deck===deck);return trials.filter(t=>!t.win).length/trials.length});for(let i=1;i<3;i++)if(result.stageFailureFractions[i]-result.stageFailureFractions[i-1]>.4)result.failures.push('Stage failure spike >40pp');
  const shape=p=>({start:p.crateStart,target:p.target,mirrors:p.mirrorPositions,sequence:p.sequence});assert.notDeepEqual(shape(result.seedLayouts['123:1']),shape(result.seedLayouts['456:1']));assert.equal(seeds.length,10,'Final matrix requires ten seeds');assert.deepEqual(result.failures,[]);result.passed=true;return result;
 }catch(e){result.failure=e.stack;throw e}finally{await writeFile(new URL('campaign-bots.json',evidence),JSON.stringify(result,null,2));await context?.close()}
}
