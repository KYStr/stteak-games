import assert from 'node:assert/strict';
import {mkdir,writeFile,access,copyFile} from 'node:fs/promises';
import {unlockFixture} from './fixtures.mjs';
import {fileURLToPath,pathToFileURL} from 'node:url';
import {chromium} from '/workspace/stteak8/tools/node_modules/playwright-core/index.mjs';
import {controllerWatchdog} from './controller-watchdog.mjs';
import {graphicsProbe} from './graphics-probe.mjs';
import {snapshot,press,fly,travel,device,pauseMenu,dismissInterruption} from './flight.mjs';

export async function waitActive(page,predicate,{timeout=30000,brake=false}={}){const start=performance.now(),initial=await snapshot(page);if(brake)await page.keyboard.down('Space');try{while(performance.now()-start<3600000){const s=await snapshot(page);if(s.elapsed-initial.elapsed>timeout/1000)throw Error('Active wait exceeded simulation budget: '+JSON.stringify(s));if(predicate(s))return s;if(await dismissInterruption(page)){if(brake)await page.keyboard.down('Space')}else assert.equal(s.modal,null,`Unexpected modal ${s.modal}`);await page.waitForTimeout(100)}throw Error('Timed out: '+JSON.stringify(await snapshot(page)))}finally{if(brake)await page.keyboard.up('Space')}}
export async function solveRepair(page,{route='direct',log=[],reloadPhase=false}={}){
 let first=await snapshot(page);const id=first.repair.id;let reloaded=false;
 while(!(await snapshot(page)).solvedPuzzles.includes(id)){
  let s=await snapshot(page);const p=s.repair,index=s.phaseIndex,phaseDone=q=>q.phaseIndex!==index||q.solvedPuzzles.includes(id);console.log(`${p.roomId} ${index+1}/${p.phaseCount} ${p.type} @ ${s.elapsed.toFixed(1)}s`);
  log.push({event:'phase-start',room:s.roomId,index,type:p.type,renderer:s.renderer,feature:p.requiresIsolation?'optical-isolation':p.phases.some(ph=>ph.type!==p.phases[0].type)?(p.deck===1?'mixed-relay':p.deck===2?'cold-restart':'power-distribution'):p.routeEnabled?(p.deck===3?'core-freight':'freight-routes'):p.type==='reflection'?(p.mirrorPositions.length===2?'two-mirror':p.deck===3?'core-optics':p.deck===2?'height-relay':'bypass-optics'):p.type==='airlock'?(p.valvePositions.length>3?(p.phases.length>3?'four-chamber-relay':'chamber-transfer'):p.deck===3?'core-interlock':p.deck===2?'vertical-interlock':'pressure-interlock'):'multi-cell',elapsed:s.elapsed,activeBrowserSeconds:s.activeBrowserSeconds+log.filter(e=>e.event==='reload').reduce((n,e)=>n+e.previousPageActiveSeconds,0),controllerMs:performance.now()});
  phaseWork: {
  if(p.type==='momentum'){
   if(p.routeEnabled&&route==='bypass')await device(page,'bypass');s=await snapshot(page);
   if(Math.hypot(s.position.x-s.crate.x,s.position.y-s.crate.y,s.position.z-s.crate.z)>3.5)await fly(page,[s.crate.x,s.crate.y,s.crate.z+1.8],{radius:.55,tetherApproach:true,until:phaseDone});if(phaseDone(await snapshot(page)))break phaseWork;if(!(await snapshot(page)).tethered)await press(page,'t');assert.equal((await snapshot(page)).tethered,true);
   if(p.routeEnabled&&route==='rail'){
    await device(page,'rail-0');if(phaseDone(await snapshot(page)))break phaseWork;
    for(let i=0;i<3;i++){
     if(i>0)await device(page,`rail-${i}`);if(phaseDone(await snapshot(page)))break;const goal=p.railPoints[i],protectedStart=await snapshot(page);await waitActive(page,s=>phaseDone(s)||Math.hypot(s.position.x-goal[0],s.position.y-goal[1],s.position.z-goal[2])<.35,{timeout:30000});const protectedEnd=await snapshot(page);assert.equal(protectedEnd.stats.hazardExposureSeconds,protectedStart.stats.hazardExposureSeconds,'Anchored rail movement cannot accumulate eligible corridor exposure');log.push({event:'rail-protection',elapsed:protectedEnd.elapsed,eligibleExposureDelta:protectedEnd.stats.hazardExposureSeconds-protectedStart.stats.hazardExposureSeconds});
    }
    if(phaseDone(await snapshot(page)))break phaseWork;
    // A crate can rest against the suit on the far side of the rail grip.
    // Releasing and stepping aside physically clears its path into the socket.
    const settling=await snapshot(page);await waitActive(page,q=>phaseDone(q)||q.elapsed-settling.elapsed>=2.5,{brake:true,timeout:5000});if(phaseDone(await snapshot(page)))break phaseWork;
    const arrived=await snapshot(page);log.push({event:'rail-clearance',room:s.roomId,index,elapsed:arrived.elapsed,position:arrived.position,crate:arrived.crate});if(Math.hypot(arrived.crate.x-p.target[0],arrived.crate.y-p.target[1],arrived.crate.z-p.target[2])>p.targetRadius){await press(page,'Shift');const side=p.target[0]>0?-1:1;await fly(page,[p.target[0]+side*1.5,p.target[1],p.target[2]+.6],{radius:.25,until:phaseDone})}
   }else await fly(page,[p.target[0],p.target[1],p.target[2]+1.3],{radius:.45,until:phaseDone});
   if(phaseDone(await snapshot(page)))break phaseWork;await waitActive(page,s=>s.phaseIndex!==index||s.solvedPuzzles.includes(id),{brake:true,timeout:20000});
  }else if(p.type==='reflection'){
   if(p.requiresIsolation){if((await snapshot(page)).circuitPowered)await device(page,'power');assert.equal((await snapshot(page)).circuitPowered,false)}
   for(let i=0;i<p.mirrorPositions.length;i++){
    s=await snapshot(page);if(s.phaseIndex!==index||s.solvedPuzzles.includes(id))break;
    await device(page,`mirror-${i}`);
    for(let turns=1;turns<8;turns++){s=await snapshot(page);if(s.phaseIndex!==index||s.solvedPuzzles.includes(id)||s.angles[i]===p.targetAngles[i])break;await device(page,`mirror-${i}`)}
   }
   if(p.requiresIsolation){assert.equal((await snapshot(page)).phaseIndex,index);await device(page,'power')}
  }else{
   for(let n=s.sequence.length;n<p.sequence.length;n++)await device(page,`valve-${p.sequence[n]}`);
  }
  }
  s=await snapshot(page);assert.ok(s.phaseIndex!==index||s.solvedPuzzles.includes(id),'Each physical work cycle must advance');
  if(p.type!=='momentum'&&s.status==='running'&&s.health<65&&(!s.solvedPuzzles.includes(id)||s.challengeId)){const room=s.roomId;await travel(page,`room-d${p.deck}-safe`);assert.equal((await snapshot(page)).health,100);await travel(page,room);s=await snapshot(page);log.push({event:'suit-refill',room,elapsed:s.elapsed,phaseIndex:s.phaseIndex})}
  if(reloadPhase&&!reloaded&&!s.solvedPuzzles.includes(id)){
   await press(page,'Escape');await page.click('#save-now');const before=await snapshot(page);await page.reload();await page.click('#continue');s=await snapshot(page);assert.equal(s.phaseIndex,before.phaseIndex);assert.equal(s.seed,before.seed);assert.deepEqual(s.repair,before.repair);assert.ok(Math.hypot(s.velocity.x,s.velocity.y,s.velocity.z)<.2);reloaded=true;log.push({event:'reload',elapsed:s.elapsed,previousPageActiveSeconds:before.activeBrowserSeconds});
  }
 }
 return snapshot(page);
}

export async function campaign(browser,url,evidence,{seed=null,reloadPhase=true}={}){
 const result={fresh:true,progressionMutation:false,clockAcceleration:false,events:[],errors:[],requests:[]},start=performance.now();let context,page;
 try{
  context=await browser.newContext({viewport:{width:1280,height:720}});await context.addInitScript(graphicsProbe);await context.addInitScript(controllerWatchdog);page=await context.newPage();page.on('pageerror',e=>result.errors.push(e.message));page.on('console',m=>{if(m.type()==='error')result.errors.push(m.text())});page.on('requestfailed',r=>result.requests.push(r.url()));
  await page.goto(url);await page.locator('#story').waitFor({timeout:60000});result.initialTransferBytes=await page.evaluate(()=>performance.getEntriesByType('resource').reduce((sum,r)=>sum+r.transferSize,0)+performance.getEntriesByType('navigation')[0].transferSize);await page.click('#preferences');await page.check('#reduced');await page.check('#low');await page.click('#preferences-back');if(seed!==null){result.seededSetup={seed,zeroProgress:true};await page.evaluate(async seed=>{const r=(await import('./rules.js')).createRun('story',{seed});localStorage.setItem('stteak:orbit-fall:story',JSON.stringify(r))},seed);await page.reload();await page.locator('#continue').waitFor({timeout:60000});await page.click('#continue')}else await page.click('#story');await device(page,'tools');
  // Unseeded journeys use crypto. Deterministic reproductions install a clearly
  // labelled zero-progress save before gameplay, never mutate a live campaign.
  result.seed=(await snapshot(page)).seed;
  const content=await page.evaluate(async()=>{const c=(await import('./content.js')).getCampaign();return {decks:c.decks,rooms:c.rooms}});

  for(const deck of content.decks){const begin=await snapshot(page),stage={deck:deck.id,startElapsed:begin.elapsed,startActive:begin.activeBrowserSeconds+result.events.filter(e=>e.event==='reload').reduce((n,e)=>n+e.previousPageActiveSeconds,0)};
   if(deck.id>1)await travel(page,`room-d${deck.id}-safe`);
   for(const id of deck.puzzleIds){const room=content.rooms.find(r=>r.puzzleId===id);await travel(page,room.id);await solveRepair(page,{route:'bypass',log:result.events,reloadPhase:reloadPhase&&id===deck.puzzleIds[0]});if(room.signalId){await device(page,'signal');await page.click('#signal-back')}
    // Refill between long standard repairs; this is physical travel via the exit.
    if((await snapshot(page)).oxygen<35||(await snapshot(page)).health<65)await travel(page,`room-d${deck.id}-safe`);
   }
   const story=content.rooms.find(r=>r.deck===deck.id&&r.type==='signal');await travel(page,story.id);await device(page,'signal');await page.click('#signal-back');const end=await snapshot(page);Object.assign(stage,{endElapsed:end.elapsed,endActive:end.activeBrowserSeconds+result.events.filter(e=>e.event==='reload').reduce((n,e)=>n+e.previousPageActiveSeconds,0),health:end.health,oxygen:end.oxygen,deaths:end.stats.deaths});(result.stages ||= []).push(stage);
  }
  await pauseMenu(page);await page.uncheck('#low');await page.click('#resume');await device(page,'ending');await page.click('[data-ending=beacon]');result.firstEnding=await snapshot(page);result.controllerMonotonicMs=performance.now()-start;result.simulationSeconds=result.firstEnding.elapsed;result.activeBrowserSeconds=result.firstEnding.activeBrowserSeconds+result.events.filter(e=>e.event==='reload').reduce((n,e)=>n+e.previousPageActiveSeconds,0);
  result.exposures=[];const seen=new Set();for(const event of result.events){const feature=event.feature;if(feature&&!seen.has(feature)){seen.add(feature);result.exposures.push({feature,simulationSeconds:event.elapsed,activeBrowserSeconds:event.activeBrowserSeconds})}}
  result.exposureGaps=result.exposures.slice(1).map((e,i)=>e.simulationSeconds-result.exposures[i].simulationSeconds);result.exposureGaps.push(result.simulationSeconds-result.exposures.at(-1).simulationSeconds);
  for(const width of [1280,1920]){await page.setViewportSize({width,height:width*9/16});await page.screenshot({path:fileURLToPath(new URL(`new-ending-${width}.png`,evidence))})}
  await page.click('#result-continue');await press(page,'f');await page.click('[data-ending=memory]');await context.storageState({path:fileURLToPath(new URL('campaign-storage.json',evidence))});assert.deepEqual((await snapshot(page)).endings,['beacon','memory']);assert.equal(result.firstEnding.solvedPuzzles.length,18);assert.equal(result.firstEnding.signals.length,6);
  result.controllerInterruptions=await page.evaluate(()=>window.testControllerWatchdog?.events||[]);result.hostInterruptions=await page.evaluate(()=>window.testHostInterruptions||[]);assert.deepEqual(result.errors,[]);assert.deepEqual(result.requests,[]);
  result.maxDrawCalls=Math.max(...result.events.filter(e=>e.renderer).map(e=>e.renderer.drawCalls));result.maxTriangles=Math.max(...result.events.filter(e=>e.renderer).map(e=>e.renderer.triangles));result.textureBudget=await page.evaluate(()=>window.testTextureBudget);assert.ok(result.maxDrawCalls<=250);assert.ok(result.maxTriangles<=1500000);assert.ok(result.textureBudget.peakBytes<=256*1024*1024);assert.ok(result.initialTransferBytes<=30*1024*1024);
  result.durationPassed=result.simulationSeconds>=600&&result.activeBrowserSeconds>=600;
  assert.ok(result.exposureGaps.every(gap=>gap<=180),'New mechanic exposure gaps <=180 simulation seconds');assert.equal(result.durationPassed,true,`Active campaign duration: simulation ${result.simulationSeconds}s, active browser ${result.activeBrowserSeconds}s; needs >=600 each`);
  result.passed=true;return result;
 }catch(e){result.failure=e.stack;result.controllerDiagnostics=e.controllerDiagnostics;result.lastSnapshot=page?await snapshot(page).catch(()=>null):null;await context?.storageState({path:fileURLToPath(new URL('campaign-recovery-storage.json',evidence))}).catch(()=>{});if(page)await page.screenshot({path:fileURLToPath(new URL('campaign-failure.png',evidence))}).catch(()=>{});throw e}finally{await writeFile(new URL('campaign.json',evidence),JSON.stringify(result,null,2));await context?.close()}
}

if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){
 const evidence=process.env.ORBIT_TEST_EVIDENCE?pathToFileURL(process.env.ORBIT_TEST_EVIDENCE.replace(/\/$/,'')+'/'):new URL(`./evidence/campaign-${Date.now()}/`,import.meta.url);await mkdir(evidence,{recursive:true});const browser=await chromium.launch({executablePath:'/usr/bin/google-chrome',args:['--use-angle=swiftshader','--enable-unsafe-swiftshader','--renderer-process-limit=1','--num-raster-threads=1','--disable-dev-shm-usage','--autoplay-policy=no-user-gesture-required']});try{await campaign(browser,process.env.ORBIT_TEST_URL||'http://127.0.0.1:8106/games/orbit-fall/',evidence);console.log('Fresh campaign passed')}finally{await browser.close()}
}

export async function routeAndSeedBots(browser,url,evidence){
 const result={routes:[],trials:[],naturalBots:[],failures:[],seedLayouts:{},fixtureAssisted:false},seeds=[123,456,17,29,43,61,89,131,197,263].slice(0,Number(process.env.ORBIT_MATRIX_SEEDS||10));let context;
 try{
  let storageState;try{await access(new URL('campaign-storage.json',evidence));storageState=fileURLToPath(new URL('campaign-storage.json',evidence))}catch{result.fixtureAssisted='unlock-only story fixture; every challenge starts with zero progress'}
  context=await browser.newContext({viewport:{width:1280,height:720},storageState});await context.addInitScript(controllerWatchdog);const page=await context.newPage();
  const openMenu=async()=>{
   for(let attempt=0;attempt<8;attempt++){
    await dismissInterruption(page);const s=await snapshot(page);
    if(s.modal==='challenges')return;
    if(s.modal==='result')await page.click('.overlay[data-screen=result] #result-challenges');
    else if(s.modal==='failure')await page.click('.overlay[data-screen=failure] #challenge-return');
    else if(s.modal==='start')await page.click('#continue');
    else if(s.modal==='map')await page.click('.overlay[data-screen=map] #challenge-menu');
    else if(s.modal==='pause')await page.click('.overlay[data-screen=pause] #map');
    else if(s.modal)await press(page,'Escape');
    else await press(page,'m');
   }
   throw Error('Challenge menu failed: '+JSON.stringify(await snapshot(page)));
  };
  const launch=async(id,seed)=>{await openMenu();await page.fill('#challenge-seed',String(seed));await page.selectOption('#challenge-mode','standard');await page.click(`[data-challenge=${id}]`);assert.equal((await snapshot(page)).solvedPuzzles.length,0,'Challenge starts with zero progress')};
  await page.goto(url);await page.locator('#panel button').first().waitFor({timeout:60000});
  if(!storageState)await unlockFixture(page);
  await page.locator('#continue').waitFor();
  for(const route of ['direct','rail','bypass'])for(let trial=0;trial<3;trial++){
   try{await launch('challenge-engineering',123);await travel(page,'room-d2-cargo');const before=await snapshot(page);await solveRepair(page,{route});const after=await snapshot(page);result.routes.push({route,trial,win:after.solvedPuzzles.includes('puzzle-momentum-2'),seconds:after.elapsed-before.elapsed,oxygen:after.stats.oxygenUsed-before.stats.oxygenUsed,thrust:after.stats.thrustSeconds-before.stats.thrustSeconds,health:after.health,hits:after.stats.hazardHits-before.stats.hazardHits,exposure:after.stats.hazardExposureSeconds-before.stats.hazardExposureSeconds});}catch(error){result.failures.push(`route ${route} trial ${trial}: ${error.stack}`);result.routes.push({route,trial,win:false,failure:error.stack,controllerDiagnostics:error.controllerDiagnostics,lastSnapshot:await snapshot(page).catch(()=>null)})}await writeFile(new URL('route-progress.json',evidence),JSON.stringify(result,null,2));
  }
  const median=(route,key)=>{const a=result.routes.filter(r=>r.route===route).map(r=>r[key]).sort((a,b)=>a-b);return a[1]};
  if(!(median('direct','seconds')<=median('bypass','seconds')*.85))result.failures.push('Direct median must be >=15% faster than bypass');
  if(!(median('rail','oxygen')<=median('direct','oxygen')*.8))result.failures.push('Rail median must save >=20% oxygen');
  if(!(median('rail','thrust')<=median('direct','thrust')*.8))result.failures.push('Rail median must save >=20% thrust');
  if(!result.routes.filter(r=>r.route==='bypass').every(r=>r.hits===0&&r.exposure===0))result.failures.push('Bypass must avoid all hazard hits');
  for(const seed of seeds)for(const [deck,id] of [[1,'challenge-cargo'],[2,'challenge-engineering'],[3,'challenge-core']]){
   const trial={seed,deck,id,win:false};try{await launch(id,seed);const initial=await snapshot(page);if(seed===123||seed===456){await travel(page,deck===1?'room-d1-cargo':deck===2?'room-d2-cargo':'room-d3-optics');result.seedLayouts[`${seed}:${deck}`]=(await snapshot(page)).repair}
    const tasks=await page.evaluate(async id=>(await import('./content.js')).challenges.find(c=>c.id===id).puzzleIds,id);
    for(const puzzleId of tasks){const roomId=await page.evaluate(async id=>(await import('./content.js')).puzzles[id].roomId,puzzleId);if((await snapshot(page)).roomId!==roomId)await travel(page,roomId);await solveRepair(page)}
    const final=await snapshot(page);Object.assign(trial,{win:final.status==='completed',seconds:final.elapsed,oxygen:final.stats.oxygenUsed,thrust:final.stats.thrustSeconds,health:final.health});
    assert.equal(trial.win,true);
   }catch(e){trial.failure=e.stack;trial.controllerDiagnostics=e.controllerDiagnostics;trial.lastSnapshot=await snapshot(page).catch(()=>null);result.failures.push(`seed ${seed} deck ${deck}: ${e.message}`)}result.trials.push(trial);await writeFile(new URL('bots-progress.json',evidence),JSON.stringify(result,null,2));
  }
  try{await launch('challenge-cargo',421);await solveRepair(page);const final=await snapshot(page);result.naturalBots.push({kind:'competent',seed:421,status:final.status,repairs:final.solvedPuzzles.length,simulationSeconds:final.elapsed,oxygenUsed:final.stats.oxygenUsed});assert.equal(final.status,'completed');assert.equal(final.solvedPuzzles.length,1)}catch(error){result.failures.push(`competent bot: ${error.stack}`);result.naturalBots.push({kind:'competent',failure:error.stack,controllerDiagnostics:error.controllerDiagnostics,lastSnapshot:await snapshot(page).catch(()=>null)})}
  for(const kind of ['idle','random']){
   try{await launch('challenge-cargo',421);const start=performance.now(),initial=await snapshot(page);let rng=421,inputs=0;const random=()=>{rng^=rng<<13;rng^=rng>>>17;rng^=rng<<5;return(rng>>>0)/4294967296};
   while((await snapshot(page)).status==='running'){
    const s=await snapshot(page);if(await dismissInterruption(page))continue;else if(s.modal&& !['result','failure'].includes(s.modal))await press(page,'Escape');
    if(kind==='random'){const keys=['w','a','s','d','q','e','Space','f','t'];const key=keys[Math.floor(random()*keys.length)];await page.keyboard.down(key);await page.waitForTimeout(250);await page.keyboard.up(key);inputs++}else await page.waitForTimeout(500);
   }
   const final=await snapshot(page);result.naturalBots.push({kind,seed:421,inputs,wallMs:performance.now()-start,simulationSeconds:final.elapsed-initial.elapsed,status:final.status,repairs:final.solvedPuzzles.length,reason:final.modal,health:final.health,oxygenUsed:final.stats.oxygenUsed});assert.equal(final.status,'failed');assert.equal(final.solvedPuzzles.length,0);
   }catch(error){result.failures.push(`${kind} bot: ${error.stack}`);result.naturalBots.push({kind,failure:error.stack,controllerDiagnostics:error.controllerDiagnostics,lastSnapshot:await snapshot(page).catch(()=>null)})}
  }
  result.stageDenominators=[1,2,3].map(deck=>({deck,trials:result.trials.filter(t=>t.deck===deck).length,failures:result.trials.filter(t=>t.deck===deck&&!t.win).length}));result.stageFailureFractions=[1,2,3].map(deck=>{const trials=result.trials.filter(t=>t.deck===deck);return trials.filter(t=>!t.win).length/trials.length});for(let i=1;i<3;i++)if(result.stageFailureFractions[i]-result.stageFailureFractions[i-1]>.4)result.failures.push('Stage failure spike >40pp');
  const shape=p=>({start:p.crateStart,target:p.target,mirrors:p.mirrorPositions,sequence:p.sequence});if(result.seedLayouts['123:1']&&result.seedLayouts['456:1'])assert.notDeepEqual(shape(result.seedLayouts['123:1']),shape(result.seedLayouts['456:1']));else result.failures.push('Both seed layout observations are required');assert.equal(seeds.length,10,'Final matrix requires ten seeds');assert.deepEqual(result.failures,[]);result.passed=true;return result;
 }catch(e){result.failure=e.stack;throw e}finally{await writeFile(new URL('campaign-bots.json',evidence),JSON.stringify(result,null,2));await context?.close()}
}

export async function campaignAcceptance(browser,url,evidence){
 const result={campaigns:[]};let storageCopied=false;
 for(const seed of [3095359210,1853268288,null]){const label=seed===null?'fresh-random':`zero-progress-seed-${seed}`,dir=new URL(label+'/',evidence);await mkdir(dir,{recursive:true});
  try{const run=await campaign(browser,url,dir,{seed});result.campaigns.push({label,seed:run.seed,simulationSeconds:run.simulationSeconds,activeBrowserSeconds:run.activeBrowserSeconds,exposures:run.exposures,exposureGaps:run.exposureGaps,passed:run.passed});if(!storageCopied){await copyFile(new URL('campaign-storage.json',dir),new URL('campaign-storage.json',evidence));storageCopied=true}}
  catch(error){result.campaigns.push({label,setupSeed:seed,passed:false,failure:error.stack,controllerDiagnostics:error.controllerDiagnostics});console.error(`Campaign ${label} failure retained; continuing independent seeds`,error.message)}
  await writeFile(new URL('campaigns.json',evidence),JSON.stringify(result,null,2));
 }
 result.passed=result.campaigns.every(c=>c.passed);await writeFile(new URL('campaigns.json',evidence),JSON.stringify(result,null,2));assert.equal(result.passed,true,'All three fresh campaigns must complete duration/cadence gates');return result;
}
