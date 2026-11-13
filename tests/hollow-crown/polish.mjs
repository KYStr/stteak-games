// Targeted visual assertions; the boss checkpoint is an offline fixture, not victory evidence.
import assert from 'node:assert/strict';
import {writeFile} from 'node:fs/promises';
import {createRun,createObjective,startTutorial,step,chooseReward,chooseStory,enterRoom,checkpoint} from '../../public/games/hollow-crown/rules.js';
import {freshProfile} from '../../public/games/hollow-crown/storage.js';
import {installPilot} from './browser-pilot.js';
import {origin,url,artifact,harness} from './test-config.mjs';
const fixture=createRun({seed:4837,challenge:'long-watch',difficulty:'pilgrim'});
for(let i=0;i<6;i++){for(const enemy of fixture.enemies)enemy.hp=0;fixture.pendingWaves=[];step(fixture,{},.02);if(fixture.story)chooseStory(fixture,fixture.story.choices[0].id);chooseReward(fixture,'restore');const next=fixture.routeOptions[0];enterRoom(fixture,next.roomId,next.risk);}
const profile=freshProfile();profile.tutorialDone=true;profile.checkpoint={run:checkpoint(fixture),runId:'polish-fixture',credited:{rooms:0,parries:0,flawless:0}};
let runner,browser;const errors=[];const report={};
try{
  runner=await harness();browser=runner.browser;
  const page=await browser.newPage({viewport:{width:1280,height:720}});page.on('pageerror',e=>errors.push(e.message));page.on('console',e=>{if(e.type()==='error')errors.push(e.text())});
  const ready=()=>page.waitForFunction(()=>window.hollowCrownDiagnostics&&hollowCrownDiagnostics.metrics().render.frameSamples>=3);
  const shot=name=>page.screenshot({path:artifact(name+'.png')});
  await page.goto(url);await ready();
  report.camp=await page.locator('.camp-panel').evaluate(el=>({height:el.clientHeight,content:el.scrollHeight}));
  assert.ok(report.camp.content<=report.camp.height+2,'camp choices and instructions fit at 1280×720');
  assert.ok(await page.locator('.camp-panel').evaluate(el=>{const r=el.getBoundingClientRect();return el.scrollTop===0&&[...el.querySelectorAll('.menu-main button,.menu-links button,.subnote:last-child')].every(n=>{const b=n.getBoundingClientRect();return b.top>=r.top&&b.bottom<=r.bottom;});}),'all camp actions and control note are visible without scrolling');
  assert.equal(await page.locator('button.primary').evaluate(el=>el===document.activeElement),true);
  await shot('camp-1280');await page.setViewportSize({width:1920,height:1080});await shot('camp-1920');
  await page.setViewportSize({width:390,height:844});await shot('camp-mobile');
  await page.setViewportSize({width:1280,height:720});await page.evaluate(value=>localStorage.setItem('stteak.hollow-crown.v1',JSON.stringify(value)),profile);
  await page.reload();await ready();await page.click('[data-action="continue"]');
  await page.waitForFunction(()=>document.querySelector('#room-status').textContent.includes('王座守衛'));
  assert.doesNotMatch(await page.locator('#room-status').innerText(),/0 \/ 0/);
  const toast=await page.locator('#toast').boundingBox(),boss=await page.locator('#boss-hud').boundingBox();
  assert.ok(toast&&boss&&toast.x+toast.width<boss.x,'notices do not obscure the boss HUD');
  await shot('boss-combat');await page.keyboard.press('Escape');await page.click('[data-action="settings"]');await page.keyboard.press('Escape');assert.equal((await page.evaluate(()=>hollowCrownDiagnostics.snapshot())).overlay,'pause');
  // Stable tutorial play allows 30 seconds of real adaptation at each desktop size.
  const load=async state=>{const p=freshProfile();p.tutorialDone=true;p.checkpoint={run:checkpoint(state),runId:'visual-fixture',credited:{rooms:0,parries:0,flawless:0}};await page.evaluate(p=>localStorage.setItem('stteak.hollow-crown.v1',JSON.stringify(p)),p);await page.reload();await ready();await page.click('[data-action="continue"]');await page.waitForTimeout(600);};
  report.adapted=[];
  for(const width of [1280,1920]){
    await page.setViewportSize({width,height:width*9/16});await load(startTutorial());await page.waitForTimeout(30000);const m=await page.evaluate(()=>hollowCrownDiagnostics.metrics());assert.ok(m.render.drawingBuffer[0]>=768);assert.ok(m.render.drawingBuffer[1]>=432);report.adapted.push({width,...m});await shot('adapted-'+width);
  }
  const tour=createRun({seed:72,challenge:'crown-pilgrimage',difficulty:'pilgrim'});report.rooms=[];
  for(let i=0;i<14;i++){
    await load(tour);if(tour.objective?.attack)await page.waitForFunction(()=>hollowCrownDiagnostics.snapshot().run.objective?.phase==='telegraph',null,{timeout:15000});report.rooms.push({id:tour.room.id,index:i,render:await page.evaluate(()=>hollowCrownDiagnostics.metrics().render)});await shot('room-'+String(i+1).padStart(2,'0')+'-'+tour.room.id);if(tour.objective?.kind!=='clear'){for(const width of [1280,1920]){await page.setViewportSize({width,height:width*9/16});await shot(`mechanic-${i+1}-${tour.objective?.kind||'boss'}-${width}`);}}
    if(i===0){await page.setViewportSize({width:390,height:844});await page.waitForTimeout(300);assert.ok(await page.locator('#journey').evaluate(el=>{const r=el.getBoundingClientRect();return r.left>=0&&r.right<=innerWidth;}));await shot('journey-mobile');await page.setViewportSize({width:1920,height:1080});}
    for(const enemy of tour.enemies)enemy.hp=0;tour.pendingWaves=[];if(tour.objective){for(const t of tour.objective.targets){t.done=true;t.hp=0;t.progress=tour.objective.chargeRequired;}tour.objective.completed=tour.objective.targets.length;}step(tour,{},.02);
    if(tour.phase==='result')break;
    if(tour.story)chooseStory(tour,tour.story.choices[0].id);
    if(i===3){await load(tour);await shot('reward-comparison');const card=page.locator('[data-action="reward"]').first();await card.click();}
    chooseReward(tour,'restore');enterRoom(tour,tour.routeOptions[0].roomId,tour.routeOptions[0].risk);
  }
  // Naturally generated warning overlaps, observed through the functional pilot.
  await load(fixture);await installPilot(page);await page.waitForTimeout(5000);await shot('boss-warnings-1920');await page.evaluate(()=>acceptancePilot.stop());
  // Read-only rendering fixture: verify overlapping authoritative-sized warnings
  // at the minimum buffer, and the tutorial callback after material batching.
  await page.route(origin+'/',route=>route.fulfill({contentType:'text/html',body:'<!doctype html><link rel="icon" href="data:,"><title>Read-only warning fixture</title>'}));
  await page.goto(origin);
  await page.evaluate(async()=>{
    const {SceneView}=await import('/games/hollow-crown/scene.js'),{startTutorial}=await import('/games/hollow-crown/rules.js');
    document.body.style.margin='0';const canvas=document.createElement('canvas');canvas.style.cssText='width:100vw;height:100vh;display:block';document.body.replaceChildren(canvas);
    const view=new SceneView(canvas),s=startTutorial();view.budget.scale=.8;view.resize();
    const enemy=s.enemies[0];enemy.state='telegraph';enemy.attack={shape:'cone',x:0,z:0,heading:0,range:3,width:1,radius:3,innerRadius:0,angle:1.5};
    const cue=view.render(s,1/60,true);window.warningVisual={view,s,cue};
  });
  assert.equal(await page.evaluate(()=>warningVisual.cue?.kind),'windup','tutorial cue callback recognizes batched environment');
  await page.waitForFunction(()=>warningVisual.view.kit.shared.textures.every(t=>t.image?.width>0));
  report.warningCue='windup';
  await page.evaluate(()=>{const {s}=warningVisual,base=s.enemies[0];s.phase='combat';s.enemies=[base,{...base,id:'visual-line',x:3,z:-1,attack:{...base.attack,shape:'line',x:3,z:-1,heading:-.8,range:6,width:1.1}},{...base,id:'visual-ring',type:'regent',x:-3,z:-2,attack:{...base.attack,shape:'ring',x:-3,z:-2,radius:5,innerRadius:2.8}}];});
  for(const width of [1280,1920]){await page.setViewportSize({width,height:width*9/16});await page.evaluate(()=>{warningVisual.view.resize();warningVisual.view.render(warningVisual.s,1/60);});await shot('overlapping-warnings-'+width);}
  await page.evaluate(()=>warningVisual.view.dispose());
  assert.deepEqual(errors,[]);report.passed=true;console.log('PASS responsive layouts, adapted resolution, all rooms/crowns, reward comparisons, warning overlap and tutorial cue callback');
}catch(e){report.passed=false;report.failure=e.stack;process.exitCode=1;console.error(e);
}finally{report.errors=errors;await writeFile(artifact('polish.json'),JSON.stringify(report,null,2)+'\n');await runner?.cleanup();}
