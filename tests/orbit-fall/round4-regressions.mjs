import assert from 'node:assert/strict';
import {writeFile} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import {snapshot,press,device,resumeGame,pauseMenu,openMap} from './flight.mjs';
import {unlockFixture} from './fixtures.mjs';
import {solveRepair} from './campaign-bots.mjs';
export async function round4Regressions(browser,url,evidence){
 const result={checks:[],fixtureAssisted:'story unlock and record fixtures; zero challenge progress',errors:[],requests:[]};const context=await browser.newContext({viewport:{width:1280,height:720}});const page=await context.newPage();
 page.on('pageerror',e=>result.errors.push(e.message));page.on('console',m=>{if(m.type()==='error')result.errors.push(m.text())});page.on('requestfailed',r=>result.requests.push(r.url()));
 await context.tracing.start({screenshots:true,snapshots:true});
 try{
  await page.goto(url);await page.locator('#story').waitFor({timeout:60000});
  const records={};for(const [seed,mode,elapsed,oxygenUsed,thrustSeconds]of [[123,'standard',88,12,9],[456,'standard',77,0,0],[123,'story',66,8,7]])records[`challenge-cargo|${mode}|v1|${seed}`]={elapsed,oxygenUsed,thrustSeconds};
  await unlockFixture(page,{records});
  const openChallenges=async()=>{await openMap(page);await page.click('.overlay[data-screen=map] #challenge-menu')};
  const checkRecords=async()=>{
   await openChallenges();const record=page.locator('[data-record-for=challenge-cargo]');
   for(const [seed,mode,text]of [[123,'standard','最佳 1:28 / 耗氧 12.0 / 推進 9.0 s'],[456,'standard','最佳 1:17 / 耗氧 0.0 / 推進 0.0 s'],[123,'story','最佳 1:06 / 耗氧 8.0 / 推進 7.0 s'],[456,'story','尚無紀錄'],[0,'standard','尚無紀錄']]){
    await page.fill('#challenge-seed',String(seed));assert.equal(await page.evaluate(()=>document.activeElement.id),'challenge-seed');await page.selectOption('#challenge-mode',mode);assert.equal(await record.innerText(),text);
   }
   await page.fill('#challenge-seed','');assert.match(await record.innerText(),/請輸入有效種子/);await page.click('[data-challenge=challenge-cargo]');assert.equal((await snapshot(page)).modal,'challenges');await page.fill('#challenge-seed','-1');assert.match(await record.innerText(),/請輸入有效種子/);
   await page.fill('#challenge-seed','123');await page.selectOption('#challenge-mode','standard');assert.equal(await record.innerText(),'最佳 1:28 / 耗氧 12.0 / 推進 9.0 s');
  };
  await page.click('#continue');await checkRecords();await page.screenshot({path:fileURLToPath(new URL('challenge-records-1280.png',evidence))});await page.reload();await page.click('#continue');await checkRecords();
  result.checks.push('matching seed/mode records refresh without replacing inputs, zero metrics/seed valid, invalid seed blocked, reload preserves records');
  await page.fill('#challenge-seed','789');await page.click('[data-challenge=challenge-cargo]');assert.equal((await snapshot(page)).solvedPuzzles.length,0);await solveRepair(page);assert.equal((await snapshot(page)).status,'completed');
  const final=await snapshot(page);await page.click('#result-challenges');await page.fill('#challenge-seed','789');await page.selectOption('#challenge-mode','standard');const label=await page.locator('[data-record-for=challenge-cargo]').innerText();const time=`${Math.floor(final.elapsed/60)}:${String(Math.floor(final.elapsed%60)).padStart(2,'0')}`;assert.equal(label,`最佳 ${time} / 耗氧 ${final.stats.oxygenUsed.toFixed(1)} / 推進 ${final.stats.thrustSeconds.toFixed(1)} s`);result.completedChallenge={elapsed:final.elapsed,stats:final.stats,label};
  await page.setViewportSize({width:1920,height:1080});await page.screenshot({path:fileURLToPath(new URL('challenge-records-1920.png',evidence))});
  result.checks.push('real completed challenge returns to matching best metrics in menu');
  // Reload while the active run is frozen before replacing the storage fixture.
  await page.reload();await unlockFixture(page,{campaignVersion:1,records:{'challenge-cargo':{elapsed:42,oxygenUsed:0,thrustSeconds:0}}});await page.click('#continue');await openChallenges();assert.equal(await page.locator('[data-record-for=challenge-cargo]').innerText(),'最佳 0:42 / 耗氧 0.0 / 推進 0.0 s');await page.fill('#challenge-seed','0');await page.selectOption('#challenge-mode','story');assert.match(await page.locator('[data-record-for=challenge-cargo]').innerText(),/0:42/);result.checks.push('legacy unqualified best remains visible');
  for(const version of [1,2]){
   await page.reload();await unlockFixture(page,{campaignVersion:version});await page.click('#continue');await openMap(page);const labels=await page.locator('[data-room]').allTextContents();const codes=labels.map(s=>s.match(/[ABC]\d+/)[0]);assert.equal(new Set(codes).size,version===1?12:24);assert.deepEqual(codes,Array.from('ABC',letter=>Array.from({length:version===1?4:8},(_,i)=>letter+(i+1))).flat());await press(page,'Escape');await press(page,'?');assert.match(await page.locator('#panel').innerText(),new RegExp(version===1?'C4 · 訊號核心':'C8 · 訊號核心'));await press(page,'Escape');
   for(const width of [1280,1920]){await page.setViewportSize({width,height:width*9/16});await openMap(page);await page.screenshot({path:fileURLToPath(new URL(`map-v${version}-${width}.png`,evidence))});await press(page,'Escape')}
  }
  result.checks.push('version 1 retains twelve unique rooms/C4 directions; version 2 has A1–C8 and C8 directions at both viewports');
  // Reach each native control using Tab; Space and Enter each cause one action.
  for(const key of ['Space','Enter'])for(const target of ['camera','hint','map']){
   await page.locator('#world').focus();const selector=target==='map'?'#map-button':`[data-action=${target}]`;
   for(let i=0;i<30&&!(await page.locator(selector).evaluate(el=>el===document.activeElement));i++)await page.keyboard.press('Tab');assert.equal(await page.locator(selector).evaluate(el=>el===document.activeElement),true);
   await page.evaluate(()=>{window.testButtonClicks=0;document.activeElement.addEventListener('click',()=>window.testButtonClicks++,{once:true})});const before=await snapshot(page);await page.keyboard.press(key);const after=await snapshot(page);assert.equal(await page.evaluate(()=>window.testButtonClicks),1,`${key} ${target} native activation count`);assert.equal(after.braking,false);
   if(target==='camera')assert.notEqual(after.renderer.camera,before.renderer.camera);else{assert.equal(after.modal,target);await press(page,'Escape');assert.equal((await snapshot(page)).modal,null)}
  }
  await page.locator('#world').focus();await page.keyboard.down('Space');assert.equal((await snapshot(page)).braking,true);await page.keyboard.up('Space');assert.equal((await snapshot(page)).braking,false);result.checks.push('Tab-focused camera/hint/map activate exactly once on Space and Enter; canvas held Space still brakes');
  assert.deepEqual(result.errors,[]);assert.deepEqual(result.requests,[]);result.passed=true;return result;
 }catch(error){result.failure=error.stack;result.lastSnapshot=await snapshot(page).catch(()=>null);await page.screenshot({path:fileURLToPath(new URL('round4-failure.png',evidence))}).catch(()=>{});throw error}
 finally{await context.tracing.stop({path:fileURLToPath(new URL('round4-trace.zip',evidence))});await writeFile(new URL('round4-regressions.json',evidence),JSON.stringify(result,null,2));await context.close()}
}
