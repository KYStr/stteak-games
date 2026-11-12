// Checkpoint fixtures inspect rendering, not traversal or campaign completion.
import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { chromium } from '/workspace/stteak8/tools/node_modules/playwright-core/index.mjs';
import { defaultSave } from '../../games/aetherwake/src/storage.js';
import { browserEnvironment } from './browser-environment.mjs';

const root = fileURLToPath(new URL('../../', import.meta.url));
const output = process.env.AETHERWAKE_EVIDENCE || '/tmp/aetherwake-visual';
const port = Number(process.env.AETHERWAKE_PORT || 8101);
const url = `http://127.0.0.1:${port}/games/aetherwake/`;
const report = { checks: [], errors: [], failures: [], screenshots: [] };
let server, browser, browserEnv;
await mkdir(output, {recursive:true});
try {
  try { assert.ok((await fetch(url)).ok); }
  catch {
    server = spawn('python3',['-m','http.server',String(port),'--bind','127.0.0.1','--directory',path.join(root,'public')],{stdio:'ignore'});
    for (let i=0;i<40;i++) {
      await new Promise(r=>setTimeout(r,100));
      try { if ((await fetch(url)).ok) break; } catch {}
    }
  }
  assert.match(await (await fetch(url)).text(), /<title>[^<]*Aetherwake<\/title>/i);
  for (const viewport of [{width:1280,height:720},{width:1920,height:1080}]) {
    if(process.env.AETHERWAKE_VISUAL_WIDTH && viewport.width!==Number(process.env.AETHERWAKE_VISUAL_WIDTH)) continue;
    for (const quality of ['auto','high']) {
      if(process.env.AETHERWAKE_VISUAL_QUALITY && quality!==process.env.AETHERWAKE_VISUAL_QUALITY) continue;
      browserEnv = await browserEnvironment();
      browser = await chromium.launch({executablePath:'/usr/bin/google-chrome',headless:true,env:browserEnv.env,
        args:['--no-sandbox','--use-angle=swiftshader','--enable-unsafe-swiftshader']});
      try {
      for (const id of ['camp','reed','bridge','storm','archive','dawn']) {
      const context = await browser.newContext({viewport});
      try {
        // Seed after the old document's pagehide/beforeunload save has run.
        await context.addInitScript(({save,quality}) => {
          const checkpoint = new URL(location.href).searchParams.get('checkpoint');
          if (!checkpoint) return;
          save.elapsed = 1; save.checkpoint = checkpoint; save.settings.quality = quality;
          localStorage.setItem('aetherwake-save',JSON.stringify(save));
        },{save:defaultSave(),quality});
          // Fresh contexts isolate checkpoints; the browser/cache is renewed after
          // each six-island batch to bound both shader caches and process churn.
          const page = await context.newPage();
          page.setDefaultTimeout(120000);
          page.on('pageerror',e=>report.errors.push(e.message));
          page.on('console',m=>{if(m.type()==='error')report.errors.push(m.text());});
          page.on('requestfailed',r=>report.failures.push(r.url()+': '+r.failure()?.errorText));
          page.on('response',r=>{if(r.status()>=400)report.failures.push(r.status()+' '+r.url());});
          await page.goto(url+`?checkpoint=island-${id}`);
          await page.waitForFunction(()=>window.__aetherwake || !document.querySelector('#fatal').classList.contains('hidden'));
          assert.ok(await page.evaluate(()=>!!window.__aetherwake), 'WebGL game initialization must succeed');
          await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))));
          await page.locator('#continue').click();
          const settle = () => page.evaluate(() => new Promise(resolve => {
            let left=10; const next=()=>--left?requestAnimationFrame(next):resolve();
            requestAnimationFrame(next);
          }));
          const shot = async suffix => {
            const file = path.join(output,`${viewport.width}-${quality}-${id}-${suffix}.png`);
            await page.screenshot({path:file}); report.screenshots.push(file);
          };
          await settle(); await shot('ground');
          const before = await page.evaluate(()=>__aetherwake.metrics());
          // Three orbit angles plus both zoom directions, with successive frames
          // at each authored island to expose view-dependent depth shimmer.
          const orbit = async capture => {
            for (let angle=1;angle<=3;angle++) {
              await page.mouse.move(viewport.width*.5,viewport.height*.5);
              await page.mouse.down({button:'right'});
              await page.mouse.move(viewport.width*.5+140,viewport.height*.5+angle*8,{steps:3});
              await page.mouse.up({button:'right'});
              await page.mouse.wheel(0,angle===2?-220:110);
              await settle(); if(capture) await shot(`orbit-${angle}`);
            }
          };
          await orbit(true);
          await shot('successive-frame');
          await page.keyboard.press('KeyC'); await settle();
          const after = await page.evaluate(()=>__aetherwake.metrics());
          const state = await page.evaluate(()=>__aetherwake.snapshot());
          assert.equal(state.status,'running');
          assert.equal(state.player.grounded,true);
          assert.equal(state.checkpoint,`island-${id}`);
          assert.equal(after.textures,before.textures);
          assert.ok(after.drawCalls<=250 && after.triangles<=1500000);
          report.checks.push({viewport,quality,checkpoint:state.checkpoint,before,after});
          console.log('PASS visual checkpoint',viewport.width,quality,id);
          await page.close();
      } finally { await context.close(); }
      }
      } finally { await browser.close(); browser=undefined; await browserEnv.dispose(); browserEnv=undefined; }
    }
  }
  assert.equal(report.checks.length,(process.env.AETHERWAKE_VISUAL_WIDTH?1:2)*(process.env.AETHERWAKE_VISUAL_QUALITY?1:2)*6);
  assert.deepEqual(report.errors,[]); assert.deepEqual(report.failures,[]);
  report.success = true;
} catch (error) {
  report.success = false; report.failure = error.stack; throw error;
} finally {
  await browser?.close(); server?.kill();
  await browserEnv?.dispose();
  await writeFile(path.join(output,'visual.json'),JSON.stringify(report,null,2));
}
