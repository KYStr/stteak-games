// Targeted visual assertions; the boss checkpoint is an offline fixture, not victory evidence.
import assert from 'node:assert/strict';
import {spawn} from 'node:child_process';
import {fileURLToPath} from 'node:url';
import {writeFile} from 'node:fs/promises';
import {createRun,step,chooseReward,chooseStory,enterRoom,checkpoint} from '../../public/games/hollow-crown/rules.js';
import {freshProfile} from '../../public/games/hollow-crown/storage.js';
const {chromium}=await import(process.env.PLAYWRIGHT_PATH||'/workspace/stteak8/tools/node_modules/playwright-core/index.mjs');
const root=fileURLToPath(new URL('../../',import.meta.url)),url='http://127.0.0.1:8103/games/hollow-crown/';
const fixture=createRun({seed:4837,challenge:'long-watch',difficulty:'pilgrim'});
for(let i=0;i<6;i++){for(const enemy of fixture.enemies)enemy.hp=0;fixture.pendingWaves=[];step(fixture,{},.02);if(fixture.story)chooseStory(fixture,fixture.story.choices[0].id);chooseReward(fixture,'restore');const next=fixture.routeOptions[0];enterRoom(fixture,next.roomId,next.risk);}
const profile=freshProfile();profile.tutorialDone=true;profile.checkpoint={run:checkpoint(fixture),runId:'polish-fixture',credited:{rooms:0,parries:0,flawless:0}};
let server,browser;const errors=[];const report={};
try{
  try{await fetch(url);throw Error('Port 8103 is in use.');}catch(e){if(!String(e).includes('fetch failed'))throw e;}
  server=spawn('python3',['-m','http.server','8103','--bind','127.0.0.1','--directory',root+'public'],{stdio:'ignore'});
  for(let i=0;i<40;i++){try{if((await fetch(url)).ok)break;}catch{}await new Promise(r=>setTimeout(r,100));}
  browser=await chromium.launch({executablePath:'/usr/bin/google-chrome',args:['--no-sandbox','--use-angle=swiftshader','--enable-unsafe-swiftshader','--autoplay-policy=no-user-gesture-required']});
  const page=await browser.newPage({viewport:{width:1280,height:720}});page.on('pageerror',e=>errors.push(e.message));page.on('console',e=>{if(e.type()==='error')errors.push(e.text())});
  const ready=()=>page.waitForFunction(()=>window.hollowCrownDiagnostics&&hollowCrownDiagnostics.metrics().render.frameSamples>=3);
  const shot=name=>page.screenshot({path:root+'tests/hollow-crown/artifacts/'+name+'.png'});
  await page.goto(url);await ready();
  report.camp=await page.locator('.camp-panel').evaluate(el=>({height:el.clientHeight,content:el.scrollHeight}));
  assert.ok(report.camp.content<=report.camp.height+2,'camp choices and instructions fit at 1280×720');
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
  assert.deepEqual(errors,[]);report.passed=true;console.log('PASS camp fit, immediate primary focus, 1920/mobile screenshots, boss caption, unobscured notices, Escape');
}catch(e){report.passed=false;report.failure=e.stack;process.exitCode=1;console.error(e);
}finally{report.errors=errors;await writeFile(root+'tests/hollow-crown/artifacts/polish.json',JSON.stringify(report,null,2)+'\n');await browser?.close();server?.kill();if(server&&server.exitCode===null)await new Promise(r=>server.once('exit',r));}
