import assert from 'node:assert/strict';
import { mkdir, writeFile, readFile } from 'node:fs/promises';
import { spawn } from 'node:child_process';
import { chromium } from '/workspace/stteak8/tools/node_modules/playwright-core/index.mjs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { instrumentBrowser, summarize } from './browser-instrumentation.mjs';
const root = fileURLToPath(new URL('../../', import.meta.url));
const output = process.env.AETHERWAKE_EVIDENCE || '/tmp/aetherwake-acceptance';
await mkdir(output, { recursive: true });
const port = Number(process.env.AETHERWAKE_PORT || 8101);
assert.ok(Number.isInteger(port) && port >= 1024 && port <= 65535);
const url = `http://127.0.0.1:${port}/games/aetherwake/`;
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
async function assertVisibleFocus(page) {
  await page.waitForFunction(() => document.activeElement.closest('#modal'));
  const visible = await page.evaluate(() => {
    const panel = document.querySelector('#modal .modal-panel').getBoundingClientRect();
    const active = document.activeElement.getBoundingClientRect();
    return active.top >= panel.top && active.bottom <= panel.bottom;
  });
  assert.ok(visible, 'Initial dialog focus must be visible inside the panel');
}
async function assertReadingDialog(page, size, name) {
  await page.waitForFunction(() => document.activeElement.id === 'close-modal');
  const state = await page.evaluate(() => {
    const panel = document.querySelector('#modal .modal-panel'), bounds = panel.getBoundingClientRect();
    const inside = el => { const b=el.getBoundingClientRect(); return b.top>=bounds.top && b.bottom<=bounds.bottom; };
    return { scroll:panel.scrollTop, focused:document.activeElement.id,
      title:inside(document.querySelector('#modal-title')), close:inside(document.querySelector('#close-modal')),
      document:{width:document.documentElement.scrollWidth,height:document.documentElement.scrollHeight} };
  });
  assert.equal(state.scroll, 0, name); assert.equal(state.focused, 'close-modal', name);
  assert.ok(state.title && state.close, name);
  assert.deepEqual(state.document, size);
  await screenshot(page, `${name}-${size.width}`);
  await page.keyboard.press('Shift+Tab');
  assert.equal(await page.evaluate(() => document.activeElement.closest('#modal')?.id), 'modal');
  await page.keyboard.press('Tab');
  assert.equal(await page.evaluate(() => document.activeElement.id), 'close-modal');
  // Every lower action can be reached by keyboard with intentional panel scrolling.
  const count = await page.locator('#modal button:not([disabled]), #modal input, #modal select').count();
  for(let i=0;i<count;i++) {
    await page.keyboard.press('Tab');
    assert.equal(await page.evaluate(() => document.activeElement.closest('#modal')?.id), 'modal');
    await assertVisibleFocus(page);
  }
}
const preservedProgress = s => Object.fromEntries(['mainSamples','courseStages','relics','completedChallenges','stalls'].map(key=>[key,s[key]]));
async function storageAndCourses(browser) {
  const blocked = await browser.newContext({viewport:{width:1280,height:720},reducedMotion:'reduce'});
  await blocked.addInitScript(() => Object.defineProperty(window, 'localStorage', {get(){throw new DOMException('Storage blocked','SecurityError');}}));
  const page = await blocked.newPage(); watch(page); await ready(page);
  assert.equal(await page.locator('#storage-warning').isVisible(),true);
  await page.click('#help'); await page.getByRole('button',{name:'設定與存檔',exact:true}).click();
  assert.equal(await page.locator('#reduced-motion').isChecked(),true);
  await page.getByRole('button',{name:'完成',exact:true}).click();
  await page.click('#start'); await page.keyboard.press('Escape');
  assert.equal((await snap(page)).status,'paused');
  await page.getByRole('button',{name:'繼續航程',exact:true}).click();
  assert.equal((await snap(page)).status,'running');
  await blocked.close();
  check('real browser blocked storage warns and remains playable; OS reduced motion is respected');
  const course = await browser.newContext({viewport:{width:1280,height:720}});
  const flight = await course.newPage(); watch(flight); await ready(flight); await flight.click('#start');
  const choose = async () => {
    await flight.keyboard.press('Escape');
    await flight.getByRole('button',{name:'選擇測風遠征',exact:true}).click();
  };
  const cancel = async () => {
    const before = await snap(flight);
    await choose();
    await flight.getByRole('button',{name:/自由探索（保留進度）/}).click();
    const after = await snap(flight);
    assert.equal(after.status,'running');
    for(const key of ['trackedHint','activeChallenge','challengeHint']) assert.equal(after[key],null,key);
    assert.equal(after.player.grounded,true);
    assert.equal(await flight.locator('#route-toggle').isDisabled(),false);
    assert.equal(await flight.locator('#leave-course').isVisible(),false);
    assert.deepEqual(preservedProgress(after),preservedProgress(before));
    await ready(flight); await flight.click('#continue');
    assert.deepEqual(preservedProgress(await snap(flight)),preservedProgress(before));
  };
  await choose(); await flight.getByRole('button',{name:'標記 初帆競速',exact:true}).click();
  assert.equal((await snap(flight)).trackedHint.id,'challenge-1');
  assert.equal(await flight.locator('#route-toggle').isDisabled(),true);
  await cancel();
  await choose(); await flight.getByRole('button',{name:'標記 初帆競速',exact:true}).click();
  // Enter the camp's gold course ring with ordinary flight controls.
  await flight.keyboard.press('Space');
  await flight.keyboard.down('KeyW'); await flight.keyboard.down('KeyD');
  await flight.waitForFunction(() => __aetherwake.snapshot().activeChallenge === 'challenge-1', null, {timeout:15000});
  await flight.keyboard.up('KeyW'); await flight.keyboard.up('KeyD');
  await cancel();
  await screenshot(flight,'course-exit');
  await course.close();
  check('tracked and active expedition Free exploration clear all optional objectives, preserve progress/penalties and reload safely');
}
async function verifyNavigationAnchors(page, expectBehind = false) {
  await page.waitForTimeout(300);
  const anchor = await page.evaluate(() => {
    const s = __aetherwake.snapshot(), camera = __aetherwake.metrics().camera;
    const target = s.challengeHint || s.trackedHint || s.surveyHint || s.objective;
    const forward = {x:camera.target.x-camera.position.x,y:camera.target.y-camera.position.y,z:camera.target.z-camera.position.z};
    const behind = (target.x-camera.position.x)*forward.x+(target.y-camera.position.y)*forward.y+(target.z-camera.position.z)*forward.z < 0;
    const nav = document.querySelector('#nav-target'), box = nav.getBoundingClientRect();
    const matrix = new DOMMatrix(getComputedStyle(nav).transform);
    // The CSS transform contains both the pixel translation and the anchor offset.
    const game = document.querySelector('#game').getBoundingClientRect();
    const actual = {x:box.left+box.width/2-game.left,y:box.top+box.height/2-game.top};
    const match = nav.style.transform.match(/translate3d\(([-.0-9]+)px, ([-.0-9]+)px/);
    const cards = [...document.querySelectorAll('#course,.telemetry')].filter(el=>!el.classList.contains('hidden'));
    const overlap = cards.some(el=> {const b=el.getBoundingClientRect();return box.left<b.right+4 && box.right>b.left-4 && box.top<b.bottom+4 && box.bottom>b.top-4;});
    return {behind,actual,expected:{x:Number(match[1]),y:Number(match[2])},finite:Number.isFinite(matrix.m41),
      visible:getComputedStyle(nav).visibility!=='hidden',overlap};
  });
  assert.ok(anchor.finite);
  if (expectBehind) assert.equal(anchor.behind,true,'Orbit check must include a target behind the camera');
  (report.navigation ||= []).push(anchor);
  assert.ok(Math.abs(anchor.actual.x-anchor.expected.x)<1 && Math.abs(anchor.actual.y-anchor.expected.y)<1,'Navigation anchor must agree with measured bounds');
  if(anchor.visible) assert.equal(anchor.overlap,false,'Visible navigation text must avoid course/telemetry cards');
  assert.equal(await page.locator('#map').isVisible(),true);
}
async function measureStability(browser, run) {
  const soak = await browser.newContext({viewport:{width:1280,height:720}});
  await soak.addInitScript(instrumentBrowser);
  const page = await soak.newPage(); watch(page);
  try {
    await ready(page); await page.click('#start'); await page.keyboard.press('Space');
    await page.waitForTimeout(10000);
    const cdp = await soak.newCDPSession(page);
    await cdp.send('Performance.enable');
    const sample = async () => {
      await cdp.send('HeapProfiler.collectGarbage');
      return {heap:await cdp.send('Runtime.getHeapUsage'),dom:await cdp.send('Memory.getDOMCounters'),
        performance:await cdp.send('Performance.getMetrics'),metrics:await metrics(page),
        raf:await page.evaluate(()=>testRAF.pending),status:(await snap(page)).status};
    };
    const before = await sample();
    await page.evaluate(()=>{testRAF.frames=[];testRAF.previous=null;testRAF.collecting=true;});
    const duration = Number(process.env.AETHERWAKE_SOAK_MS || 180000);
    const windows=[];let last=0;
    for(let elapsed=0;elapsed<duration;elapsed+=15000) {
      await page.waitForTimeout(Math.min(15000,duration-elapsed));
      const frames = await page.evaluate(()=>testRAF.frames.slice());
      const diagnostic = await sample();
      windows.push({elapsedMs:Math.min(elapsed+15000,duration),timing:summarize(frames.slice(last)),...diagnostic});
      last=frames.length;
      console.log('Stability',run,Math.min(elapsed+15000,duration)/1000,'s',windows.at(-1).timing.averageMs.toFixed(2),'ms');
    }
    const rawFrames = await page.evaluate(()=>{testRAF.collecting=false;return testRAF.frames;});
    const after = await sample();
    const result = {durationMs:duration,timing:summarize(rawFrames),rawFrames,windows,before,after,heapGrowth:after.heap.usedSize-before.heap.usedSize};
    // Compare equal running UI states after lazily initializing the pause dialog.
    const cycle = async count => {
      for(let i=0;i<count;i++) {await page.keyboard.press('Escape');await page.getByRole('button',{name:'繼續航程',exact:true}).click();}
      await page.waitForTimeout(800); return sample();
    };
    result.modalCycles=[await cycle(3),await cycle(15),await cycle(15)];
    await screenshot(page,`stability-${run}-end`);
    await writeFile(path.join(output,`stability-${run}.json`),JSON.stringify(result,null,2));
    assert.ok(result.timing.frames>duration/150);
    assert.ok(result.heapGrowth<12*1024*1024);
    const middle=windows[Math.floor(windows.length/2)];
    assert.ok(after.metrics.geometries<=middle.metrics.geometries+2);
    assert.ok(after.metrics.audio.peakVoices<=20);
    assert.equal(after.metrics.inputListeners,before.metrics.inputListeners);
    assert.ok(after.metrics.audio.musicBeats>before.metrics.audio.musicBeats);
    for(const w of windows) { assert.equal(w.raf,1);assert.equal(w.status,'running');assert.ok(w.dom.jsEventListeners<=before.dom.jsEventListeners+2); }
    const [warm,first,second]=result.modalCycles;
    // A live audio callback may vary by a few listeners; per-cycle growth cannot.
    assert.ok(second.dom.jsEventListeners<=first.dom.jsEventListeners+2);
    assert.ok(second.dom.nodes<=first.dom.nodes+3);
    assert.ok(second.dom.nodes<=warm.dom.nodes+5);
    for(const entry of result.modalCycles) {assert.equal(entry.raf,1);assert.equal(entry.status,'running');}
    check(`real-time stability ${run}: avg ${result.timing.averageMs.toFixed(2)}ms, p95 ${result.timing.p95Ms.toFixed(2)}ms; bounded heap, DOM, listeners and one game RAF`);
    return result;
  } finally { await soak.close(); }
}

try {
  const validServer = async () => {
    const response = await fetch(url);
    assert.ok(response.ok, `Server returned ${response.status}`);
    assert.match(await response.text(), /<title>[^<]*Aetherwake<\/title>/i, 'Port must serve Aetherwake');
  };
  let reachable = false;
  try { await fetch(url); reachable = true; } catch {}
  if (reachable) await validServer();
  else {
    server = spawn('python3', ['-m', 'http.server', String(port), '--bind', '127.0.0.1', '--directory', path.join(root, 'public')], { stdio: 'ignore' });
    for (let i = 0; i < 40; i++) { await sleep(100); try { if ((await fetch(url)).ok) break; } catch {} }
  }
  await validServer();
  browser = await chromium.launch({ executablePath: '/usr/bin/google-chrome', headless: true, args: ['--no-sandbox', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'] });
  const context = await browser.newContext({ viewport: { width: 1280, height: 720 } });
  await context.addInitScript(instrumentBrowser);
  const page = await context.newPage(); watch(page); await ready(page);
  assert.equal((await metrics(page)).audio.contextState, 'uninitialized');
  await screenshot(page, 'menu-1280');
  // Reading dialogs begin at the top, keep visible focus and restore the invoker.
  for (const size of [{width:1280,height:720},{width:1920,height:1080}]) {
    await page.setViewportSize(size);
    await page.click('#help');
    await assertReadingDialog(page, size, 'help');
    await page.getByRole('button', {name:'文明碎片',exact:true}).click();
    await assertReadingDialog(page, size, 'journal');
    await page.getByRole('button', {name:'返回航行誌',exact:true}).click();
    await page.getByRole('button', {name:'六趟測風遠征',exact:true}).click();
    await assertReadingDialog(page, size, 'courses');
    await page.keyboard.press('Escape');
    await page.getByRole('button', {name:'設定與存檔',exact:true}).click();
    await assertVisibleFocus(page);
    await page.getByRole('button', {name:'重設全部進度',exact:true}).click();
    await assertVisibleFocus(page);
    await page.keyboard.press('Escape');
    await page.getByRole('button', {name:'完成',exact:true}).click();
    assert.equal(await page.locator('#modal').isVisible(), false);
    assert.equal((await snap(page)).status, 'ready');
    // Return focus belongs to the original Help invoker across nested menus.
    assert.equal(await page.evaluate(() => document.activeElement.id), 'help');
  }
  await page.setViewportSize({width:1280,height:720});
  check('reading dialogs start at scroll zero with visible trapped focus at both desktop sizes; preparation settings and erase/back return safely');
  await page.click('#start');
  await page.waitForFunction(() => __aetherwake.metrics().audio.loadedSamples === 6);
  await page.waitForFunction(() => __aetherwake.metrics().audio.contextState === 'running' && testRMS() > .00001);
  const beatsAtUnlock = (await metrics(page)).audio.musicBeats;
  await page.waitForTimeout(1000);
  assert.ok((await metrics(page)).audio.musicBeats > beatsAtUnlock);
  report.audio = { audibleRMS: await page.evaluate(() => testRMS()) };
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
  await page.waitForTimeout(650);
  report.audio.mutedRMS = await page.evaluate(() => testRMS());
  assert.ok(report.audio.mutedRMS < .000001);
  await page.evaluate(() => window.testAudio.suspend());
  await page.keyboard.press('Escape'); await page.keyboard.press('Escape');
  await page.waitForFunction(() => __aetherwake.metrics().audio.contextState === 'running');
  check('pause freezes state and audio; modal traps focus; mute and external audio suspension recover');
  await page.keyboard.down('KeyW');
  await page.mouse.move(520,380); await page.mouse.down({button:'right'});
  await page.mouse.move(570,390);
  assert.equal(await page.locator('#world').evaluate(el => el.hasPointerCapture(1)), true);
  await page.evaluate(() => window.dispatchEvent(new Event('blur')));
  assert.equal(await page.locator('#world').evaluate(el => el.hasPointerCapture(1)), false);
  const blurSnapshot = await snap(page);
  const yawAfterBlur = (await metrics(page)).camera.manualYaw;
  await page.mouse.move(660,420); await page.waitForTimeout(300);
  assert.deepEqual(await snap(page), blurSnapshot);
  assert.equal((await metrics(page)).camera.manualYaw, yawAfterBlur);
  await page.keyboard.up('KeyW'); await page.mouse.up({button:'right'});
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
  await verifyNavigationAnchors(page);
  await screenshot(page, 'play-1280');
  await page.mouse.move(320,430); await page.mouse.down({button:'right'});
  await page.mouse.move(950,430,{steps:8}); await page.mouse.up({button:'right'});
  await verifyNavigationAnchors(page, true);
  await screenshot(page,'orbit-behind-1280');
  await page.keyboard.press('KeyC');
  await page.setViewportSize({ width: 1920, height: 1080 });
  await page.waitForTimeout(500); await verifyNavigationAnchors(page); await screenshot(page, 'play-1920');
  await page.keyboard.press('Escape');
  for (const selector of ['#close-modal', '#modal-actions button', '#quality']) {
    const boxes = await page.locator(selector).evaluateAll(els => els.map(e => {const b=e.getBoundingClientRect(); return {top:b.top,bottom:b.bottom,left:b.left,right:b.right};}));
    for (const b of boxes) assert.ok(b.top >= 0 && b.bottom <= 1080 && b.left >= 0 && b.right <= 1920);
  }
  await page.keyboard.press('Escape');
  await page.keyboard.press('Escape');
  await page.getByRole('button', {name:'操作與航行誌',exact:true}).click();
  await page.getByRole('button', {name:'設定與存檔',exact:true}).click();
  await page.getByRole('button', {name:'完成',exact:true}).click();
  await page.getByRole('button', {name:'繼續航程',exact:true}).click();
  assert.equal((await snap(page)).status, 'running');
  // Visibility restoration requires an explicit resume.
  await page.evaluate(() => { Object.defineProperty(document, 'hidden', {configurable:true,get:()=>true}); document.dispatchEvent(new Event('visibilitychange')); });
  const hiddenState = await snap(page); await page.waitForTimeout(250);
  assert.deepEqual(await snap(page), hiddenState);
  await page.evaluate(() => { delete document.hidden; document.dispatchEvent(new Event('visibilitychange')); });
  assert.equal((await snap(page)).status, 'paused');
  await page.keyboard.press('Escape');
  check('1280×720 and 1920×1080 layouts; active settings Done and visibility resume');
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
  await storageAndCourses(browser);
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
  const resultTitle = await flight.locator('#modal-title').innerText();
  const openCompletedSettings = async () => {
    await flight.getByRole('button', {name:'讀文明碎片',exact:true}).click();
    await flight.getByRole('button', {name:'返回航行誌',exact:true}).click();
    await flight.getByRole('button', {name:'設定與存檔',exact:true}).click();
  };
  await openCompletedSettings();
  await flight.getByRole('button', {name:'完成',exact:true}).click();
  assert.equal((await snap(flight)).status, 'complete');
  assert.equal(await flight.locator('#modal-title').innerText(), resultTitle);
  assert.equal(await flight.getByRole('button', {name:'繼續航程',exact:true}).count(), 0);
  await openCompletedSettings();
  await flight.keyboard.press('Escape'); await flight.keyboard.press('Escape');
  assert.equal(await flight.locator('#modal-title').innerText(), resultTitle);
  await flight.keyboard.press('Escape');
  assert.equal(await flight.locator('#landing').isVisible(), true);
  await flight.click('#continue');
  assert.equal(await flight.locator('#modal-title').innerText(), resultTitle);
  // Explicit exploration is allowed to leave the completed simulation.
  await flight.getByRole('button', {name:'繼續探索',exact:true}).click();
  await flight.getByRole('button', {name:'自由探索（保留進度）',exact:true}).click();
  assert.equal((await snap(flight)).status, 'running');
  assert.equal((await snap(flight)).trackedHint, null);
  assert.deepEqual((await snap(flight)).mainSamples, completed.mainSamples);
  await flight.keyboard.press('KeyE');
  await flight.waitForFunction(() => __aetherwake.snapshot().status === 'complete');
  check('completed campaign settings Done/Escape return to results; preparation Continue reopens results; explicit exploration preserves samples');
  await flight.getByRole('button', {name:'再飛一趟',exact:true}).click();
  assert.equal((await snap(flight)).activated.length, 0);
  assert.equal((await snap(flight)).status, 'running');
  await flight.keyboard.press('Space'); await flight.keyboard.down('KeyW');
  await flight.waitForTimeout(500); await flight.keyboard.up('KeyW');
  assert.ok((await snap(flight)).distance > 0);
  check('keyboard-only campaign: 24 survey gates, three station deliveries, return, results and restart');
  await campaign.close();
  report.stabilityRuns = [];
  for (let run = 1; run <= Number(process.env.AETHERWAKE_SOAK_RUNS || 2); run++) {
    report.stabilityRuns.push(await measureStability(browser, run));
  }
  // Keep both full samples, raw intervals and diagnostics even if pacing fails.
  for (const result of report.stabilityRuns) {
    assert.ok(result.timing.averageMs <= 33.5, `Mean frame target missed: ${JSON.stringify(result.timing)}`);
    assert.ok(result.timing.p95Ms <= 50.1, `p95 frame target missed: ${JSON.stringify(result.timing)}`);
  }
  assert.deepEqual(report.errors, []); assert.deepEqual(report.failures, []);
  check('zero console errors, uncaught errors, failed requests or HTTP errors');
  report.success = true;
} catch (error) {
  report.success = false;
  report.failure = { name: error.name, message: error.message, stack: error.stack };
  throw error;
} finally {
  await browser?.close(); server?.kill();
  await writeFile(path.join(output, 'acceptance.json'), JSON.stringify(report, null, 2));
}
