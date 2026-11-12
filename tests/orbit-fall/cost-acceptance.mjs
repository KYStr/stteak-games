import assert from 'node:assert/strict';
import {writeFile} from 'node:fs/promises';
import {graphicsProbe} from './graphics-probe.mjs';
import {unlockFixture} from './fixtures.mjs';
import {performanceSoak} from './performance.mjs';
import {snapshot,resumeGame} from './flight.mjs';
export async function costAcceptance(browser,url,evidence){
 const context=await browser.newContext({viewport:{width:1280,height:720}}),errors=[],requests=[];let page;const result={fixtureAssisted:'completed-story room unlock only'};
 try{
  await context.addInitScript(graphicsProbe);await context.addInitScript(()=>{window.testPendingRaf=new Set();const request=requestAnimationFrame.bind(window),cancel=cancelAnimationFrame.bind(window);window.requestAnimationFrame=callback=>{const id=request(t=>{testPendingRaf.delete(id);callback(t)});testPendingRaf.add(id);return id};window.cancelAnimationFrame=id=>{testPendingRaf.delete(id);cancel(id)}});
  page=await context.newPage();page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push(m.text())});page.on('requestfailed',r=>requests.push(r.url()));
  await page.goto(url);await page.locator('#story').waitFor({timeout:60000});await unlockFixture(page,{room:'room-d3-optics'});await page.click('#continue');result.soak=await performanceSoak(page,context,evidence);
  await page.evaluate(()=>{window.testContextLoss=document.querySelector('canvas').getContext('webgl2').getExtension('WEBGL_lose_context');testContextLoss.loseContext()});await page.waitForFunction(()=>__orbitDiagnostics.snapshot().modal==='context');await page.waitForTimeout(1200);await page.evaluate(()=>testContextLoss.restoreContext());await page.waitForFunction(()=>__orbitDiagnostics.snapshot().modal==='pause');await resumeGame(page);const before=(await snapshot(page)).totalActiveFrames;await page.waitForFunction(n=>__orbitDiagnostics.snapshot().totalActiveFrames>n+2,before);result.contextRestored=true;
  assert.deepEqual(errors,[]);assert.deepEqual(requests,[]);result.passed=true;return result;
 }catch(error){result.failure=error.stack;throw error}finally{result.errors=errors;result.requests=requests;await writeFile(new URL('cost-acceptance.json',evidence),JSON.stringify(result,null,2));await context.close()}
}
