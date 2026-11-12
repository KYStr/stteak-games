import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { mkdir,writeFile } from 'node:fs/promises';
import { chromium } from '/workspace/stteak8/tools/node_modules/playwright-core/index.mjs';
import { browserEnvironment } from './browser-environment.mjs';
const port=Number(process.env.AETHERWAKE_PORT||8101),url=`http://127.0.0.1:${port}/games/aetherwake/`,out=process.env.AETHERWAKE_EVIDENCE||'/tmp/aetherwake-acceptance';
let server,browser,env;const report={errors:[],failures:[]};await mkdir(out,{recursive:true});
try{
 try{assert.ok((await fetch(url)).ok);}catch{server=spawn('python3',['-m','http.server',String(port),'--bind','127.0.0.1','--directory',new URL('../../public',import.meta.url).pathname],{stdio:'ignore'});await new Promise(r=>setTimeout(r,500));}
 env=await browserEnvironment();browser=await chromium.launch({executablePath:'/usr/bin/google-chrome',env:env.env,args:['--no-sandbox','--use-angle=swiftshader','--enable-unsafe-swiftshader','--disable-frame-rate-limit','--autoplay-policy=no-user-gesture-required']});
 const context=await browser.newContext({viewport:{width:1280,height:720}});
 await context.addInitScript(()=>{const request=window.requestAnimationFrame.bind(window);let time=performance.now();window.requestAnimationFrame=callback=>request(()=>callback(time+=150));});
 const page=await context.newPage();page.setDefaultTimeout(60000);page.on('pageerror',e=>report.errors.push(e.message));page.on('console',m=>{if(m.type()==='error')report.errors.push(m.text());});page.on('requestfailed',r=>report.failures.push(r.url()));
 await page.goto(url);await page.waitForFunction(()=>window.__aetherwake);await page.click('#help');await page.getByRole('button',{name:'設定與存檔',exact:true}).click();await page.selectOption('#quality','low');await page.getByRole('button',{name:'完成',exact:true}).click();await page.click('#start');await page.setViewportSize({width:320,height:240});
 // Untouched grounded expedition. Accelerated native RAF timestamps, unchanged
 // fixed-step clamp. No progress, time or simulation-state injection.
 let last;
 for(let i=0;i<1800;i++){
  await page.waitForTimeout(1000);last=await page.evaluate(()=>__aetherwake.snapshot());
  if(i%30===0)console.log('Idle weather',last.activeSeconds.toFixed(2),'active seconds');
  if(last.status==='failed')break;
 }
 assert.equal(last.status,'failed');assert.equal(last.activeSeconds,2700);assert.equal(last.activated.length,0);assert.equal(last.stalls,0);report.idle={activeSeconds:last.activeSeconds,status:last.status,score:last.score};
 await page.setViewportSize({width:1280,height:720});await page.screenshot({path:`${out}/weather-failed.png`});
 await page.getByRole('button',{name:'設定與存檔',exact:true}).click();await page.getByRole('button',{name:'完成',exact:true}).click();assert.equal(await page.locator('#modal-title').innerText(),'天候窗口已關閉');
 await page.getByRole('button',{name:'設定與存檔',exact:true}).click();await page.keyboard.press('Escape');await page.keyboard.press('Escape');assert.equal((await page.evaluate(()=>__aetherwake.snapshot())).status,'failed');
 await page.keyboard.press('Escape');await page.click('#continue');assert.equal(await page.locator('#modal-title').innerText(),'天候窗口已關閉');
 await page.reload();await page.waitForFunction(()=>window.__aetherwake);await page.click('#continue');assert.equal((await page.evaluate(()=>__aetherwake.snapshot())).status,'failed');
 await page.getByRole('button',{name:'改為自由探索',exact:true}).click();await page.waitForFunction(()=>__aetherwake.snapshot().activeSeconds>2702);assert.equal((await page.evaluate(()=>__aetherwake.snapshot())).mode,'exploration');
 await page.keyboard.press('Escape');await page.getByRole('button',{name:'重新遠征',exact:true}).click();await page.getByRole('button',{name:'重新遠征',exact:true}).click();await page.keyboard.press('Space');await page.keyboard.down('KeyW');await page.waitForTimeout(500);await page.keyboard.up('KeyW');assert.equal((await page.evaluate(()=>__aetherwake.snapshot())).status,'running');
 report.success=true;assert.deepEqual(report.errors,[]);assert.deepEqual(report.failures,[]);console.log('PASS untouched expedition loses at 2700 active seconds; nested failure settings/reload/exploration/restart');
}finally{await writeFile(`${out}/weather.json`,JSON.stringify(report,null,2));await browser?.close();server?.kill();await env?.dispose();}
