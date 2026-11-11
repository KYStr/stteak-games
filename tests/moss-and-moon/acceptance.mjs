import assert from "node:assert/strict";
import { measureMovement, assertBudget } from "./performance.mjs";
import os from "node:os";
import { performance } from "node:perf_hooks";
import { mkdir, writeFile } from "node:fs/promises";
import {
  PLANTS,
  DISCOVERIES,
  PUZZLES,
} from "../../public/games/moss-and-moon/content.js";
const { chromium } = await import(
  "/workspace/stteak8/tools/node_modules/playwright-core/index.mjs"
);
import { base, ensureServer } from "./server.mjs";
const artifacts = process.env.MOSS_ARTIFACTS || "/tmp/moss-and-moon-acceptance";
await mkdir(artifacts, { recursive: true });
let server, browser;
const errors = [],
  failed = [],
  report = {};
try {
  server = await ensureServer();
  browser = await chromium.launch({
    executablePath: "/usr/bin/google-chrome",
    args: [
      "--use-angle=swiftshader",
      "--enable-unsafe-swiftshader",
    ],
  });
  const context = await browser.newContext({
    viewport: { width: 1280, height: 720 },
  });
  await context.addInitScript(() => {
    const corruption = sessionStorage.getItem("moss-test-corruption");
    if (corruption) {
      localStorage.setItem("moss-and-moon:v1:slot:2", "{broken");
      if (corruption === "both")
        localStorage.setItem("moss-and-moon:v1:slot:2:backup", "[]");
      sessionStorage.removeItem("moss-test-corruption");
    }
    const Original = window.AudioContext;
    window.__audioContexts = [];
    window.AudioContext = class extends Original {
      constructor(...args) {
        super(...args);
        window.__audioContexts.push(this);
      }
    };
  });
  await context.addInitScript(() => {
    window.__pageShows = [];
    addEventListener("pageshow", e => window.__pageShows.push({persisted:e.persisted,time:performance.now()}));
  });
  const p = await context.newPage();
  await p.route('**/__qa-away.html', route => route.fulfill({ contentType:'text/html', body:
    '<!doctype html><html><head><link rel="icon" href="data:,"><title>QA away</title></head><body>History lifecycle check</body></html>' }));
  p.setDefaultTimeout(30000);
  p.on("pageerror", (e) => errors.push(e.message));
  p.on("console", (m) => {
    if (m.type() === "error") errors.push(m.text());
  });
  p.on("requestfailed", (r) =>
    failed.push(r.url() + ": " + r.failure()?.errorText),
  );
  p.on("response", (r) => {
    if (r.status() >= 400) failed.push(r.status() + " " + r.url());
  });
  const diagnostic = () => p.evaluate(() => window.mossDiagnostics());
  const snapshot = () =>
    p.evaluate(() =>
      JSON.parse(
        JSON.parse(
          localStorage.getItem(
            "moss-and-moon:v1:slot:" + window.mossDiagnostics().slot,
          ),
        ).payload,
      ),
    );
  const close = async () => {
    if (await p.locator("#panel").evaluate((el) => el.open))
      await p.keyboard.press("Escape");
  };
  const open = async (name) => {
    await close();
    await p.locator(`[data-open="${name}"]`).first().click();
  };
  const grid = async () => {
    await open("journal");
    await p.locator('#panel [data-open="grid"]').click();
  };
  const use = async (index) => {
    await p.locator(`[data-grid-select="${index}"]`).click();
    await p.locator("[data-grid-use]").click();
  };
  const plant = async (id, indices) => {
    await grid();
    await p.locator('[data-grid-tool="plant"]').click();
    await p.selectOption("#grid-seed", id);
    for (const i of indices) await use(i);
    await close();
  };
  const water = async () => {
    await close();
    await p.locator('[data-tool="water"]').click();
    if (await p.locator('[data-action="waterAll"]').isEnabled())
      await p.locator('[data-action="waterAll"]').click();
  };
  const night = async () => {
    await open("sleep");
    await p.locator("[data-sleep]").click();
    await p.locator("[data-close]").click();
  };
  const harvest = async () => {
    await close();
    await p.locator('[data-tool="harvest"]').click();
    await p.locator('[data-action="harvestAll"]').click();
  };
  const buy = async (id, n = 1) => {
    await open("shop");
    for (let i = 0; i < n; i++) await p.locator(`[data-buy="${id}"]`).click();
    await close();
  };
  const quest = async (id) => {
    await open("quests");
    await p.locator('[data-resident="all"]').click();
    await p.locator(`[data-accept="${id}"]`).click();
    assert.equal(await p.evaluate(()=>document.querySelector("#panel").contains(document.activeElement)),true);
    await p.locator(`[data-deliver="${id}"]`).click();
    assert.ok(
      (await snapshot()).completedQuests.includes(id),
      id + " delivered",
    );
    await close();
  };
  const place = async (id, index) => {
    await grid();
    await p.locator('[data-grid-tool="decorate"]').click();
    await p.locator(`[data-decor="${id}"]`).click();
    await grid();
    await use(index);
    await p.locator("[data-confirm-place]").click();
  };
  await p.goto(base);
  await p.waitForFunction(() => !!window.mossDiagnostics);
  assert.equal((await diagnostic()).audio.state, "locked");
  await p.screenshot({ path: artifacts + "/welcome-1280.png" });
  await p.setViewportSize({width:1920,height:1080});
  await p.screenshot({path:artifacts + "/welcome-1920.png"});
  await p.setViewportSize({width:1280,height:720});
  await p.locator("#switch-slot").click();
  assert.equal((await diagnostic()).audio.state,"locked");
  await close();
  assert.equal(await p.evaluate(()=>document.activeElement.id),"switch-slot");
  await p.locator("#start").click();
  await p.waitForFunction(()=>window.mossDiagnostics().audio.ready);
  assert.match(await p.locator("#panel-title").textContent(), /慢慢來/);
  await close();
  await p.waitForFunction(() => window.mossDiagnostics().audio.ready);
  assert.equal((await diagnostic()).audio.loopSources, 2);
  assert.equal(await p.locator('.hud').evaluate(el=>getComputedStyle(el).visibility), 'visible');
  // A real canvas raycast plants and waters plot zero; this is not the text-grid path.
  await p.mouse.click(640,98);
  assert.equal((await snapshot()).grid[0]?.id,'moss');
  await p.keyboard.press('2');
  await p.mouse.click(640,98);
  assert.equal((await snapshot()).grid[0]?.watered,true);
  await p.keyboard.press('1');
  // The onboarding action opens the real keyboard-accessible garden. Focus survives rendering.
  await p.locator("[data-guide]").click();
  await p.locator('[data-grid-select="0"]').focus();
  await p.keyboard.press("ArrowRight");
  assert.equal(
    await p.evaluate(() => document.activeElement.dataset.gridSelect),
    "1",
  );
  await p.keyboard.press("Enter");
  assert.equal(
    await p.evaluate(() => document.activeElement.dataset.gridSelect),
    "1",
  );
  await use(1);
  await close();
  for (let day = 0; day < 3; day++) {
    await water();
    await night();
  }
  await harvest();
  assert.equal((await snapshot()).inventory.moss, 2);
  await quest("mira-1");
  console.log("PASS first harvest and quest");
  report.coreLoop =
    "real UI: plant → water → sleep ×3 → harvest → deliver first quest";
  // Save, refresh, exact restoration, no offline progression and no repeat onboarding.
  const saved = await snapshot();
  await p.reload();
  await p.waitForFunction(() => !!window.mossDiagnostics);
  await p.locator("#start").click();
  await p.waitForFunction(()=>window.mossDiagnostics().audio.ready);
  assert.equal(await p.locator("#panel").evaluate((el) => el.open), false);
  assert.deepEqual(await snapshot(), saved);
  // Blur releases keyboard input, pauses the scene and suspends audio until explicit resume.
  await p.locator("#world").focus();
  await p.keyboard.down("w");
  await p.evaluate(() => window.dispatchEvent(new Event("blur")));
  await p.keyboard.up("w");
  assert.equal((await diagnostic()).paused, true);
  await p.waitForFunction(
    () => window.mossDiagnostics().audio.state === "suspended",
  );
  const pausedPosition = (await diagnostic()).world.position;
  await p.waitForTimeout(200);
  assert.deepEqual((await diagnostic()).world.position, pausedPosition);
  await p.locator("[data-resume]").click();
  await p.waitForFunction(
    () => window.mossDiagnostics().audio.state === "running",
  );
  // Canvas, movement and tool gestures recover browser-level suspensions under normal autoplay.
  const cdp = await context.newCDPSession(p);
  const listeners = (await cdp.send('Memory.getDOMCounters')).jsEventListeners;
  for (let i=0;i<23;i++) {
    await p.evaluate(()=>window.__audioContexts[0].suspend());
    if (i===0) await p.mouse.click(640,98);
    else { await p.keyboard.press(i===1 ? '1' : 'w'); }
    await p.waitForFunction(()=>window.mossDiagnostics().audio.state==='running');
    assert.equal((await diagnostic()).audio.loopSources,2);
  }
  assert.equal((await cdp.send('Memory.getDOMCounters')).jsEventListeners,listeners);
  await p.keyboard.press('Escape');
  await p.waitForFunction(()=>window.mossDiagnostics().audio.state==='suspended');
  await p.keyboard.press('w');
  assert.equal((await diagnostic()).audio.state,'suspended');
  await p.locator('[data-resume]').click();
  await open("settings");
  for (const bus of ["music", "ambient", "sfx"])
    await p.locator(`[data-setting="${bus}"]`).fill("0");
  await close();
  assert.deepEqual((await diagnostic()).audio.volumes, {
    music: 0,
    ambient: 0,
    sfx: 0,
  });
  await open("settings");
  await close();
  assert.deepEqual((await diagnostic()).audio.volumes, { music:0, ambient:0, sfx:0 });
  await open("settings");
  for (const bus of ["music", "ambient", "sfx"])
    await p.locator(`[data-setting="${bus}"]`).fill("0.4");
  await close();
  console.log("PASS save, focus and audio lifecycle");
  report.lifecycle =
    "exact reload; blur/input release; explicit resume; external audio suspension; volume controls";
  const inDialog = async () => assert.equal(await p.evaluate(()=>document.querySelector('#panel').contains(document.activeElement)),true);
  const tabsStayInside = async () => {
    await inDialog();
    for (let i=0;i<30;i++) { await p.keyboard.press('Tab'); await inDialog(); }
    for (let i=0;i<30;i++) { await p.keyboard.press('Shift+Tab'); await inDialog(); }
  };
  await open('journal');
  await p.locator('#panel [data-open="grid"]').click();
  await tabsStayInside();
  await close();
  assert.notEqual(await p.evaluate(()=>document.activeElement.tagName),'BODY');
  await open('shop');
  await p.locator('[data-buy="planter"]').click();
  await inDialog();
  await p.locator('#panel [data-open="craft"]').click();
  await inDialog();
  await close();
  // Regression: every furniture exit from a pause submenu resumes the actual world.
  const pausedPicker = async () => {
    await close();
    await p.keyboard.press('Escape');
    assert.equal((await diagnostic()).paused,true);
    await p.locator('#panel [data-open="help"]').click(); await inDialog();
    await p.locator('#panel [data-open="grid"]').click(); await inDialog();
    await p.locator('[data-grid-tool="decorate"]').click(); await inDialog();
    await p.locator('[data-decor="planter"]').click();
    assert.equal(await p.locator('#panel').evaluate(el=>el.open),false);
    assert.equal((await diagnostic()).paused,false);
    await p.waitForFunction(()=>window.mossDiagnostics().audio.state==='running');
  };
  await pausedPicker();
  const beforeMove = (await diagnostic()).world.position;
  await p.keyboard.down('d'); await p.waitForTimeout(350); await p.keyboard.up('d');
  const afterMove = (await diagnostic()).world.position;
  assert.notDeepEqual(afterMove,beforeMove);
  await p.waitForTimeout(150);
  assert.deepEqual((await diagnostic()).world.position,afterMove);
  await p.keyboard.press('q'); const turn = (await diagnostic()).world.cameraTurn;
  await p.keyboard.press('r'); assert.equal((await diagnostic()).world.cameraTurn,(turn+1)%4);
  // Re-enter the placement dialog through a paused grid (without selecting furniture again).
  const pausedPlacement = async () => {
    await p.keyboard.press('Escape');
    await p.locator('#panel [data-open="help"]').click();
    await p.locator('#panel [data-open="grid"]').click();
    await use(63);
    assert.equal((await diagnostic()).paused,true);
  };
  await pausedPlacement();
  await p.locator('[data-cancel-place]').click();
  assert.equal((await diagnostic()).paused,false);
  await pausedPlacement();
  await p.locator('[data-confirm-place]').click();
  assert.equal((await diagnostic()).paused,false);
  assert.equal((await snapshot()).grid[63]?.id,'planter');
  await p.locator('[data-action="undo"]').click();
  await grid(); await use(63);
  await p.locator('[data-confirm-place]').click();
  assert.equal((await diagnostic()).paused,false);
  await p.locator('[data-action="undo"]').click();
  // Unrelated UI actions preserve the garden's instance batches.
  const rebuilds = (await diagnostic()).world.plantRebuilds;
  await open('settings'); await p.locator('#panel [data-open="slots"]').click(); await inDialog();
  await p.locator('#panel [data-open="reset"]').click(); await inDialog();
  await tabsStayInside();
  await close();
  assert.equal((await diagnostic()).world.plantRebuilds,rebuilds);
  // Synthetic document visibility, followed by real same-origin history navigation.
  await p.evaluate(()=>{
    Object.defineProperty(document,'hidden',{configurable:true,get:()=>true});
    document.dispatchEvent(new Event('visibilitychange',{bubbles:true}));
    delete document.hidden;
  });
  assert.equal((await diagnostic()).paused,true);
  await p.locator('[data-resume]').click();
  const beforeHistory = await snapshot();
  await p.goto(new URL('__qa-away.html',base).href);
  await p.goBack();
  await p.waitForFunction(()=>!!window.mossDiagnostics);
  report.history = await p.evaluate(()=>({pageshows:window.__pageShows,navigation:performance.getEntriesByType('navigation').map(n=>n.type)}));
  if (!(await diagnostic()).started) await p.locator('#start').click();
  else if ((await diagnostic()).paused) await p.locator('[data-resume]').click();
  assert.deepEqual(await snapshot(),beforeHistory);
  report.regressions = 'paused selection/cancel/confirm/unpaused placement; audio canvas/WASD/tool + 20 recoveries; modal transitions/60 Tabs; canvas plant/water; movement/key release/Q/R; synthetic visibility; real history';
  console.log('PASS round 2 interaction regressions');
  // Explore every area, record all discoveries and solve all three puzzles through the actual UI.
  report.exploration = [];
  for (const region of ["forest", "brook", "ridge"]) {
    const transitionStart = performance.now();
    await open("map");
    await p.locator(`#panel [data-region="${region}"]`).click();
    const transitionMs = performance.now()-transitionStart;
    await p.waitForTimeout(3000);
    await p.screenshot({path:artifacts+`/${region}-1280.png`});
    report.exploration.push({region,transitionMs,movement:await measureMovement(p,6000)});
    await p.locator(`[data-gather="${region}"]`).click();
    await p.locator('[data-open="fieldguide"]').click();
    for (const d of DISCOVERIES.filter((d) => d.region === region)) {
      const locator = p.locator(`[data-discover="${d.id}"]`);
      if (await locator.count()) await locator.click();
    }
    await p.locator(`[data-open="puzzle:${region}"]`).click();
    const puzzle = PUZZLES.find((q) => q.region === region);
    await p
      .locator(`[data-puzzle="${puzzle.id}"][data-answer="${puzzle.answer}"]`)
      .click();
    await close();
    await p.locator('[data-region="garden"]').first().click();
  }
  assert.equal((await snapshot()).discoveries.length, 12);
  assert.equal((await snapshot()).puzzles.length, 3);
  console.log("PASS all exploration and puzzles");
  await quest("rowan-1");
  await quest("pip-1");
  await buy("planter");
  await quest("sage-2");
  await buy("lantern");
  await buy("table");
  await place("lantern", 8);
  await place("table", 9);
  await quest("mira-2");
  await plant("moonflower", [2, 3]);
  await quest("lumi-2");
  await buy("stones");
  await buy("birdbath");
  await place("stones", 10);
  await place("birdbath", 11);
  await quest("pip-2");
  await buy("seed:pumpkin", 2);
  await plant("pumpkin", [4, 5]);
  for (let i = 0; i < 5; i++) {
    await water();
    await night();
  }
  await harvest();
  await quest("noa-1");
  await buy("arch");
  await place("arch", 12);
  await plant("moss", [16, 17]);
  await plant("bluebell", [18]);
  await plant("starcap", [19]);
  // Craft a real item and place it in the garden as well.
  await open("craft");
  await p.locator('[data-craft="make-lantern"]').click();
  assert.ok((await snapshot()).stats.crafted >= 1);
  await close();
  await open("journal");
  await p.locator("[data-festival]").click();
  assert.equal((await snapshot()).festival, true);
  assert.match(await p.locator("#panel-title").textContent(), /月光/);
  await p.screenshot({ path: artifacts + "/festival-1280.png" });
  await close();
  console.log("PASS festival campaign");
  report.campaign =
    "8 quests, 12 discoveries, 3 puzzles, craft, 5 placed decorations, festival win: no state injection";
  // Export the actual progress, switch slots, reload the preferred slot, reset it, import the backup.
  await open("settings");
  const downloadPromise = p.waitForEvent("download");
  await p.locator("[data-export]").click();
  const download = await downloadPromise;
  await download.saveAs(artifacts + "/garden-backup.json");
  await p.locator('[data-open="slots"]').click();
  await p.locator('[data-slot="2"]').click();
  await plant("moss", [0]);
  await p.reload();
  await p.waitForFunction(() => window.mossDiagnostics?.().slot === 2);
  await p.locator("#start").click();
  await p.waitForFunction(()=>window.mossDiagnostics().audio.ready);
  assert.equal((await snapshot()).grid[0].id, "moss");
  await open("settings");
  await p.locator('[data-open="slots"]').click();
  await p.locator('[data-open="reset"]').click();
  await p.locator("[data-reset-confirm]").click();
  assert.equal((await snapshot()).stats.planted, 0);
  assert.equal((await snapshot()).day, 1);
  await open("settings");
  await p
    .locator("#import-file")
    .setInputFiles(artifacts + "/garden-backup.json");
  await p.waitForFunction(() => window.mossDiagnostics().completedQuests === 8);
  assert.equal((await snapshot()).festival, true);
  await close();
  // Slot faults use only real UI-earned save payloads; no campaign resources are injected.
  const earnedSlot1 = await p.evaluate(()=>localStorage.getItem('moss-and-moon:v1:slot:1'));
  const slot2Before = await p.evaluate(()=>localStorage.getItem('moss-and-moon:v1:slot:2'));
  for (const mode of ['valid','recovered','both','unsupported','save-denied']) {
    await p.evaluate(({raw,mode})=>{
      const current='moss-and-moon:v1:slot:1', backup=current+':backup';
      const unsupported=JSON.stringify({...JSON.parse(raw),version:999});
      localStorage.setItem(current,mode==='valid' ? raw : mode==='unsupported' ? unsupported : '{broken');
      localStorage.setItem(backup,['recovered','save-denied'].includes(mode) ? raw : mode==='valid' ? raw : '[]');
      if (mode==='save-denied') {
        window.__originalSet = Storage.prototype.setItem;
        Storage.prototype.setItem=function(k,v) {
          if(k.startsWith('moss-and-moon:v1:slot:1')) throw new DOMException('Injected quota failure','QuotaExceededError');
          return window.__originalSet.call(this,k,v);
        };
      }
    },{raw:earnedSlot1,mode});
    await open('settings'); await p.locator('#panel [data-open="slots"]').click();
    await p.locator('[data-slot="1"]').click();
    const toast = await p.locator('#toast').textContent();
    if(mode==='valid') assert.match(toast,/已進入庭園 1/);
    if(mode==='recovered') {
      assert.match(toast,/恢復庭園.*修復/);
      assert.equal(await p.evaluate(()=>JSON.parse(localStorage.getItem('moss-and-moon:v1:slot:1')).version),1);
    }
    if(mode==='both'||mode==='unsupported') {
      assert.match(await p.locator('#save-warning').textContent(),/無法讀取.*原始資料保留/);
      assert.equal((await diagnostic()).day,1);
      assert.notEqual(await p.evaluate(()=>localStorage.getItem('moss-and-moon:v1:slot:1')), earnedSlot1);
    }
    if(mode==='save-denied') {
      assert.match(toast,/瀏覽器未能保存/);
      assert.equal(await p.evaluate(()=>localStorage.getItem('moss-and-moon:v1:slot:1')),'{broken');
      await p.evaluate(()=>{Storage.prototype.setItem=window.__originalSet;delete window.__originalSet;});
    }
    assert.equal(await p.evaluate(()=>localStorage.getItem('moss-and-moon:v1:slot:2')),slot2Before);
    await open('settings'); await p.locator('#panel [data-open="slots"]').click();
    await p.locator('[data-slot="2"]').click();
  }
  console.log('PASS in-session save fault reporting and repair');
  // Warm the renderer before measuring. Read-only diagnostics; scene remains interactive.
  await p.waitForTimeout(12000);
  await p.screenshot({ path: artifacts + "/garden-1280.png" });
  await p.setViewportSize({ width: 1920, height: 1080 });
  await p.waitForTimeout(1500);
  await p.screenshot({ path: artifacts + "/garden-1920.png" });
  assert.equal(
    await p
      .locator(".dock")
      .evaluate((el) => el.getBoundingClientRect().bottom <= innerHeight),
    true,
  );
  await p.setViewportSize({ width: 1280, height: 720 });
  const sample = async () => {
    await p.evaluate(() => window.gc?.());
    return await p.evaluate(() => ({
      diagnostic: window.mossDiagnostics(),
      heap: performance.memory?.usedJSHeapSize || 0,
      labels: document.querySelectorAll(".world-label").length,
      nodes: document.querySelectorAll("*").length,
    }));
  };
  report.beforeSoak = await sample();
  const soak = Number(process.env.MOSS_SOAK_MS || 15000);
  for (let elapsed = 0; elapsed < soak; elapsed += 10000) {
    await p.waitForTimeout(Math.min(10000, soak - elapsed));
    if (elapsed % 30000 === 0)
      console.log("Soak", Math.min(elapsed + 10000, soak) + "/" + soak + " ms");
  }
  report.afterSoak = await sample();
  assert.equal(report.afterSoak.labels, report.beforeSoak.labels);
  assert.equal(report.afterSoak.nodes, report.beforeSoak.nodes);
  assert.equal(
    report.afterSoak.diagnostic.world.geometries,
    report.beforeSoak.diagnostic.world.geometries,
  );
  assert.equal(report.afterSoak.diagnostic.audio.loopSources, 2);
  report.machine = { chrome:browser.version(), platform:os.platform(), arch:os.arch(), cpu:os.cpus()[0]?.model, cores:os.cpus().length, loadavg:os.loadavg(), timestamp:new Date().toISOString(), autoplay:'Chrome default' };
  report.warmupMs = 18000;
  report.movement = [];
  for (const viewport of [{width:1280,height:720},{width:1920,height:1080}]) {
    await p.setViewportSize(viewport); await p.waitForTimeout(6000);
    const measurement = await measureMovement(p,12000);
    report.movement.push(measurement);
    await writeFile(artifacts + '/movement.json',JSON.stringify(report.movement,null,2));
    console.log('Movement',viewport,measurement.raf,measurement.completion,measurement.update,measurement.submit);

  }
  await p.setViewportSize({width:1280,height:720});
  // Context loss is an accessible recoverable screen, and reloading keeps all progress.
  await p.evaluate(() =>
    document
      .querySelector("canvas")
      .getContext("webgl2")
      .getExtension("WEBGL_lose_context")
      .loseContext(),
  );
  await p.locator("#fatal button").waitFor();
  assert.equal(await p.locator("#fatal").getAttribute("role"), "alertdialog");
  await p.locator("#fatal button").click();
  await p.waitForFunction(() => !!window.mossDiagnostics);
  await p.locator("#start").click();
  await p.waitForFunction(()=>window.mossDiagnostics().audio.ready);
  assert.equal((await snapshot()).festival, true);
  // Corrupt primary falls back to the preceding valid state; both corrupt starts safely.
  await p.evaluate(() =>
    sessionStorage.setItem("moss-test-corruption", "primary"),
  );
  await p.reload();
  await p.waitForFunction(() => !!window.mossDiagnostics);
  await p.locator("#start").click();
  await p.waitForFunction(()=>window.mossDiagnostics().audio.ready);
  assert.equal((await snapshot()).festival, true);
  await p.evaluate(() => {
    sessionStorage.setItem("moss-test-corruption", "both");
  });
  await p.reload();
  await p.waitForFunction(() => !!window.mossDiagnostics);
  await p.locator("#start").click();
  await p.waitForFunction(()=>window.mossDiagnostics().audio.ready);
  await close();
  assert.equal((await diagnostic()).day, 1);
  report.functionalChecks = 'all interaction, campaign, slots, corrupt/unsupported saves, context loss and history checks passed';
  report.errors = errors;
  report.failedRequests = failed;
  assert.deepEqual(errors, []);
  assert.deepEqual(failed, []);
  await writeFile(artifacts + "/acceptance.json",JSON.stringify(report,null,2));
  for (const measurement of report.movement) assertBudget(measurement,`${measurement.viewport.width} movement`);
  console.log("PASS Moss & Moon acceptance", JSON.stringify({...report,movement:report.movement.map(({samples,...m})=>({...m,samples:samples.length}))}, null, 2));
  await writeFile(
    artifacts + "/acceptance.json",
    JSON.stringify(report, null, 2),
  );
} catch (e) {
  console.error("FAIL Moss & Moon acceptance:", e);
  if (browser) {
    const pages = browser.contexts().flatMap((c) => c.pages());
    if (pages[0])
      await pages[0]
        .screenshot({ path: artifacts + "/failure.png" })
        .catch(() => {});
  }
  await writeFile(
    artifacts + "/failure.json",
    JSON.stringify({ error: String(e), errors, failed, report }, null, 2),
  );
  process.exitCode = 1;
} finally {
  if (browser) await browser.close();
  if (server) server.kill("SIGTERM");
}
