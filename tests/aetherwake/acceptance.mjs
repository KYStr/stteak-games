import assert from 'node:assert/strict';
import { mkdir, writeFile, readFile } from 'node:fs/promises';
import { spawn } from 'node:child_process';
import { chromium } from '/workspace/stteak8/tools/node_modules/playwright-core/index.mjs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
const root = fileURLToPath(new URL('../../', import.meta.url));
const output = process.env.AETHERWAKE_EVIDENCE || '/tmp/aetherwake-acceptance';
await mkdir(output, { recursive: true });
const url = 'http://127.0.0.1:8101/games/aetherwake/';
let server, browser;
const report = { checks: [], errors: [], failures: [], screenshots: [] };
const check = (message) => { report.checks.push(message); console.log('PASS', message); };
const sleep = ms => new Promise(r => setTimeout(r, ms));
async function ready(page, suffix = '') { await page.goto(url + suffix); await page.waitForFunction(() => window.__aetherwake); }
async function snap(page) { return page.evaluate(() => __aetherwake.snapshot()); }
async function metrics(page) { return page.evaluate(() => __aetherwake.metrics()); }
async function screenshot(page, name) { const file = path.join(output, name + '.png'); await page.screenshot({ path: file }); report.screenshots.push(file); }
function watch(page) {
  page.on('pageerror', e => report.errors.push(e.message));
  page.on('console', m => { if (m.type() === 'error') report.errors.push(m.text()); });
  page.on('requestfailed', r => report.failures.push(r.url() + ': ' + r.failure()?.errorText));
  page.on('response', r => { if (r.status() >= 400) report.failures.push(r.status() + ' ' + r.url()); });
}
try {
  try { await fetch(url); } catch {
    server = spawn('python3', ['-m', 'http.server', '8101', '--bind', '127.0.0.1', '--directory', path.join(root, 'public')], { stdio: 'ignore' });
    for (let i = 0; i < 40; i++) { await sleep(100); try { if ((await fetch(url)).ok) break; } catch {} }
  }
  browser = await chromium.launch({ executablePath: '/usr/bin/google-chrome', headless: true, args: ['--no-sandbox', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--autoplay-policy=no-user-gesture-required'] });
  const context = await browser.newContext({ viewport: { width: 1280, height: 720 } });
  await context.addInitScript(() => {
    const Constructor = window.AudioContext;
    window.AudioContext = new Proxy(Constructor, { construct(Target, args) { const instance = new Target(...args); window.testAudio = instance; return instance; } });
  });
  const page = await context.newPage(); watch(page); await ready(page);
  assert.equal((await metrics(page)).audio.contextState, 'uninitialized');
  await screenshot(page, 'menu-1280');
  await page.click('#start');
  await page.waitForFunction(() => __aetherwake.metrics().audio.loadedSamples === 6);
  await page.keyboard.press('Space'); await page.keyboard.down('KeyW');
  await page.waitForTimeout(1500); await page.keyboard.up('KeyW');
  assert.equal((await snap(page)).player.grounded, false);
  assert.ok((await snap(page)).distance > 5);
  check('load, gesture audio unlock, all six samples and keyboard flight');
  await page.keyboard.press('Escape');
  const frozen = await snap(page);
  await page.waitForTimeout(500);
  assert.deepEqual(await snap(page), frozen);
  assert.equal((await metrics(page)).audio.contextState, 'suspended');
  assert.equal(await page.locator('#world').evaluate(el => el.inert), true);
  await page.keyboard.press('Shift+Tab');
  assert.equal(await page.evaluate(() => document.activeElement.closest('#modal')?.id), 'modal');
  await page.locator('#music-volume').fill('0'); await page.locator('#sfx-volume').fill('0');
  await page.keyboard.press('Escape');
  await page.waitForFunction(() => __aetherwake.metrics().audio.contextState === 'running');
  assert.equal((await metrics(page)).audio.musicVolume, 0);
  await page.evaluate(() => window.testAudio.suspend());
  await page.keyboard.press('Escape'); await page.keyboard.press('Escape');
  await page.waitForFunction(() => __aetherwake.metrics().audio.contextState === 'running');
  check('pause freezes state and audio; modal traps focus; mute and external audio suspension recover');
  await page.evaluate(() => window.dispatchEvent(new Event('blur')));
  assert.equal((await snap(page)).status, 'paused');
  const stored = await page.evaluate(() => JSON.parse(localStorage.getItem('aetherwake-save')));
  assert.ok(stored.elapsed > 1);
  await ready(page); await page.click('#continue');
  const restored = await snap(page);
  assert.equal(restored.checkpoint, stored.checkpoint);
  assert.deepEqual(restored.mainSamples, stored.mainSamples);
  assert.deepEqual(restored.relics, stored.relics);
  assert.ok(restored.player.grounded);
  assert.equal((await metrics(page)).audio.musicVolume, 0);
  check('blur saves; reload and continue restore progress, preferences and safe ground');
  await page.evaluate(() => { const gl = document.querySelector('#world').getContext('webgl2'); window.testLoss = gl.getExtension('WEBGL_lose_context'); window.testLoss.loseContext(); });
  await page.waitForFunction(() => __aetherwake.metrics().contextLost);
  const lost = await snap(page); await page.waitForTimeout(350);
  assert.deepEqual(await snap(page), lost);
  await page.keyboard.press('Escape'); assert.equal(await page.locator('#modal').isVisible(), true);
  await page.evaluate(() => window.testLoss.restoreContext());
  await page.waitForFunction(() => !__aetherwake.metrics().contextLost);
  assert.equal((await snap(page)).status, 'paused');
  await page.keyboard.press('Escape');
  assert.equal((await snap(page)).status, 'running');
  check('real WebGL loss freezes input, saves, restores rendering and waits for explicit resume');
  await screenshot(page, 'play-1280');
  await page.setViewportSize({ width: 1920, height: 1080 });
  await page.waitForTimeout(500); await screenshot(page, 'play-1920');
  await page.keyboard.press('Escape');
  for (const selector of ['#close-modal', '#modal-actions button', '#quality']) {
    const boxes = await page.locator(selector).evaluateAll(els => els.map(e => {const b=e.getBoundingClientRect(); return {top:b.top,bottom:b.bottom,left:b.left,right:b.right};}));
    for (const b of boxes) assert.ok(b.top >= 0 && b.bottom <= 1080 && b.left >= 0 && b.right <= 1920);
  }
  await page.keyboard.press('Escape');
  check('1280×720 and 1920×1080 layouts, settings and modal bounds');
  // Corrupt and migrated saves use real browser storage; no state debug API is mutated.
  await page.addInitScript(() => { if(location.search === '?save=corrupt') localStorage.setItem('aetherwake-save', '{bad-json'); if(location.search === '?save=old') localStorage.setItem('aetherwake-save', JSON.stringify({version:1,island:'island-reed',fragments:['relic-01'],elapsed:12})); });
  await ready(page, '?save=corrupt'); assert.equal(await page.locator('#storage-warning').isVisible(), true);
  await page.click('#start'); assert.equal((await snap(page)).checkpoint, 'island-camp');
  await page.waitForFunction(() => __aetherwake.metrics().audio.loadedSamples === 6);
  await ready(page, '?save=old'); await page.click('#continue');
  assert.deepEqual((await snap(page)).relics, ['relic-01']);
  assert.equal((await snap(page)).checkpoint, 'island-reed');
  await page.waitForFunction(() => __aetherwake.metrics().audio.loadedSamples === 6);
  check('corrupt save warns and remains playable; v1 save migrates into a safe checkpoint');
  await context.close();
  // The full campaign below uses ordinary keyboard events and the shipped HUD.
  // RAF timestamps are accelerated only in this context; performance uses a fresh real-time context.
  const campaign = await browser.newContext({ viewport: { width: 1280, height: 720 } });
  await campaign.addInitScript(() => {
    const request = window.requestAnimationFrame.bind(window);
    let origin;
    window.requestAnimationFrame = callback => request(t => { origin ??= t; window.flightPilot?.(); callback(origin + (t-origin)*6); });
  });
  const flight = await campaign.newPage(); watch(flight); await ready(flight); await flight.click('#start');
  await flight.evaluate(() => {
    let approach = null, held = new Set(), errorX = 0, errorZ = 0;
    const key = (type, code) => document.querySelector('#world').dispatchEvent(new KeyboardEvent(type, {code, key:code==='Space'?' ':code, bubbles:true}));
    const press = code => { key('keydown', code); key('keyup', code); };
    window.flightPilot = () => {
      const s = __aetherwake.snapshot(), p = s.player;
      if (s.status === 'complete') { for(const c of held)key('keyup',c); held.clear(); return; }
      if (s.status === 'paused') { document.querySelector('#modal-actions button')?.click(); return; }
      if (s.nearby?.canInteract) { press('KeyE'); return; }
      const target = s.surveyHint || s.objective;
      const d = Math.hypot(target.x-p.x,target.z-p.z), landing = !s.surveyHint;
      let aim = target;
      if (approach?.id !== target.id) approach = null;
      if (!landing && target.heading && d < target.radius*1.6 && !approach) {
        const len=Math.hypot(target.heading.x,target.heading.z), speed=Math.hypot(p.vx,p.vz);
        const dot=(p.vx*target.heading.x+p.vz*target.heading.z)/Math.max(.001,speed*len);
        if(dot<(target.heading.minDot??.5))approach={id:target.id,x:target.x-target.heading.x/len*65,z:target.z-target.heading.z/len*65};
      }
      if(approach){if(Math.hypot(p.x-approach.x,p.z-approach.z)<12)approach=null;else aim=approach;}
      const ad=Math.max(.001,Math.hypot(aim.x-p.x,aim.z-p.z));
      const x=(aim.x-p.x)/ad,z=(aim.z-p.z)/ad;
      // Pulse axis keys to preserve the analog course direction at fixed-step speed.
      errorX+=Math.abs(x);errorZ+=Math.abs(z);
      const next = new Set();
      if(errorX>=.7){next.add(x<0?'KeyA':'KeyD');errorX-=1;}
      if(errorZ>=.7){next.add(z<0?'KeyW':'KeyS');errorZ-=1;}
      const brake=landing?!p.grounded&&d<Math.max(26,Math.max(0,p.y-target.y)/7*5.2+9):p.y>target.y+(target.radius||15)*.65&&d<55;
      if(brake)next.add('ShiftLeft');
      for(const c of held)if(!next.has(c))key('keyup',c);
      for(const c of next)if(!held.has(c))key('keydown',c);
      held=next;
      if(p.grounded&&(!landing||d>50||Math.abs(p.y-target.y)>2)||!p.grounded&&!p.gliding)press('Space');
    };
  });
  let lastMission = 0;
  for (let i = 0; i < 240; i++) {
    await flight.waitForTimeout(1000);
    const s = await snap(flight);
    if (i % 20 === 0) console.log('Flight', s.elapsed.toFixed(1), 's, samples', s.mainSamples.join('/'), 'stalls', s.stalls);
    if (s.activated.length > lastMission) { lastMission = s.activated.length; console.log('Delivered station', lastMission, 'at', s.elapsed.toFixed(1), 'simulation seconds'); }
    if (s.status === 'complete') break;
    if (i === 239) throw new Error('Keyboard campaign timed out: '+JSON.stringify(s));
  }
  const completed = await snap(flight);
  assert.equal(completed.status, 'complete'); assert.deepEqual(completed.mainSamples, [8,8,8]);
  await screenshot(flight, 'campaign-complete');
  report.campaign = { elapsed:completed.elapsed, stalls:completed.stalls, samples:completed.mainSamples };
  await flight.evaluate(() => { window.flightPilot = null; });
  await flight.getByRole('button', {name:'再飛一趟',exact:true}).click();
  assert.equal((await snap(flight)).activated.length, 0);
  assert.equal((await snap(flight)).status, 'running');
  check('keyboard-only campaign: 24 survey gates, three station deliveries, return, results and restart');
  await campaign.close();
  const soak = await browser.newContext({ viewport:{width:1280,height:720} });
  const stable = await soak.newPage(); watch(stable); await ready(stable); await stable.click('#start'); await stable.keyboard.press('Space');
  await stable.waitForTimeout(6000);
  const cdp = await stable.context().newCDPSession(stable);
  await cdp.send('HeapProfiler.collectGarbage');
  const before = { heap: await cdp.send('Runtime.getHeapUsage'), metrics: await metrics(stable) };
  await stable.evaluate(() => {
    window.frameTimes=[];let previous;
    const sample=t=>{if(previous)frameTimes.push(t-previous);previous=t;window.soakRAF=requestAnimationFrame(sample);};requestAnimationFrame(sample);
  });
  const duration = Number(process.env.AETHERWAKE_SOAK_MS || 180000);
  let middle;
  for(let elapsed=0;elapsed<duration;elapsed+=15000) { await stable.waitForTimeout(Math.min(15000,duration-elapsed)); console.log('Stability',Math.min(elapsed+15000,duration)/1000,'s'); if (!middle && elapsed + 15000 >= duration / 2) middle = await metrics(stable); }
  await cdp.send('HeapProfiler.collectGarbage');
  const after = { heap: await cdp.send('Runtime.getHeapUsage'), metrics: await metrics(stable) };
  const timing = await stable.evaluate(() => {cancelAnimationFrame(soakRAF);const a=frameTimes.sort((a,b)=>a-b);return{frames:a.length,averageMs:a.reduce((s,x)=>s+x,0)/a.length,p95Ms:a[Math.floor(a.length*.95)]};});
  report.stability = { durationMs:duration, timing, before, middle, after, heapGrowth:after.heap.usedSize-before.heap.usedSize };
  assert.ok(timing.frames > duration/150);
  assert.ok(timing.averageMs < 55, JSON.stringify(timing));
  assert.ok(timing.p95Ms < 100, JSON.stringify(timing));
  assert.ok(report.stability.heapGrowth < 12*1024*1024);
  // Compare after the flight has warmed its local GPU geometry allocations.
  assert.ok(after.metrics.geometries <= middle.geometries+2);
  assert.ok(after.metrics.audio.peakVoices <= 20);
  assert.equal(after.metrics.inputListeners, before.metrics.inputListeners);
  assert.ok(after.metrics.audio.musicBeats > before.metrics.audio.musicBeats);
  await screenshot(stable, 'stability-end');
  check(`three-minute real-time stability: avg ${timing.averageMs.toFixed(2)}ms, p95 ${timing.p95Ms.toFixed(2)}ms, heap growth ${report.stability.heapGrowth} bytes`);
  await soak.close();
  assert.deepEqual(report.errors, []); assert.deepEqual(report.failures, []);
  check('zero console errors, uncaught errors, failed requests or HTTP errors');
} finally {
  await browser?.close(); server?.kill();
  await writeFile(path.join(output, 'acceptance.json'), JSON.stringify(report, null, 2));
}
