import { MISSIONS } from "../../games/dust-redemption/content.js";
import assert from "node:assert/strict";
import { url, action, mode, snapshot, click } from "./driver.mjs";
import {
  createProfile,
  beginMission,
  completeMission,
} from "../../games/dust-redemption/rules.js";
export async function regressions(page, pass) {
  await page.goto(url);
  await mode(page, "title");
  await page.locator("[data-action=hub]").focus();
  await page.keyboard.press("Space");
  await mode(page, "hub");
  await action(page, "brief");
  await page.selectOption("#loadout-weapon", "rifle");
  await page.selectOption("#loadout-item", "smoke");
  for (const back of ["button", "Escape"]) {
    await action(page, "help");
    await mode(page, "help");
    await page.locator("summary").focus();
    await page.keyboard.press("Space");
    assert.equal(await page.locator("details").evaluate((n) => n.open), true);
    if (back === "button") await action(page, "close-sheet");
    else await page.keyboard.press("Escape");
    await mode(page, "briefing");
    assert.equal(await page.inputValue("#loadout-weapon"), "rifle");
    assert.equal(await page.inputValue("#loadout-item"), "smoke");
    assert.equal(
      await page.evaluate(() => document.activeElement.dataset.action),
      "help",
    );
  }
  await page.evaluate(() => window.dispatchEvent(new Event("blur")));
  await mode(page, "paused");
  await page.evaluate(() => window.dispatchEvent(new Event("focus")));
  await action(page, "help");
  await page.keyboard.press("Escape");
  await mode(page, "paused");
  assert.equal((await snapshot(page)).audio.active, false);
  await action(page, "resume");
  await mode(page, "briefing");
  assert.equal(await page.inputValue("#loadout-weapon"), "rifle");
  await action(page, "deploy");
  await mode(page, "playing");
  assert.deepEqual((await snapshot(page)).profile.equipment, {
    weapon: "rifle",
    item: "smoke",
  });
  for (const back of ["button", "Escape"]) {
    await page.keyboard.press("Escape");
    await mode(page, "paused");
    await action(page, "settings");
    await page.locator("[data-setting=music]").focus();
    const prior = Number(await page.inputValue("[data-setting=music]"));
    await page.keyboard.press("ArrowRight");
    assert.ok(Number(await page.inputValue("[data-setting=music]")) > prior);
    if (back === "button") await action(page, "close-sheet");
    else {
      await page.locator("[data-setting=reduced]").focus();
      await page.keyboard.press("Escape");
    }
    await mode(page, "paused");
    await page.waitForFunction(
      () => dustDiagnostics().audio.state === "suspended",
    );
    const audio = (await snapshot(page)).audio;
    assert.equal(audio.active, false);
    assert.equal(audio.voices, 0);
    await action(page, "resume");
    await mode(page, "playing");
    await page.waitForFunction(
      () => dustDiagnostics().audio.state === "running",
    );
  }
  pass(
    "native Space/arrows/Escape; live loadout, invoking focus and blur/nested sheet restoration; paused audio",
  );
  // Explicit funded fixture, independent of the earned browser campaign.
  let fixture = createProfile();
  for (const mission of MISSIONS) {
    const started = beginMission(fixture, mission.id);
    fixture = completeMission(started.profile, started.run, {
      strategy: "nonlethal",
      choice: mission.choice?.options[0].id,
    }).profile;
  }
  await page.evaluate(
    (p) =>
      localStorage.setItem(
        "stteak:dust-redemption:profile:v2",
        JSON.stringify(p),
      ),
    fixture,
  );
  await page.reload();
  await mode(page, "title");
  await action(page, "hub");
  await action(page, "supplies");
  const before = (await snapshot(page)).profile;
  const disk = await page.evaluate(() =>
    localStorage.getItem("stteak:dust-redemption:profile:v2"),
  );
  for (const kind of ["QuotaExceededError", "SecurityError"]) {
    await page.waitForTimeout(550);
    await page.evaluate((kind) => {
      window.__nativeWrite = Storage.prototype.setItem;
      Storage.prototype.setItem = function () {
        throw new DOMException("QA write denial", kind);
      };
    }, kind);
    try {
      await action(page, "buy-supply", "[data-id=ammo]");
      const after = (await snapshot(page)).profile;
      assert.equal(after.wallet, before.wallet);
      assert.equal(after.supplies.ammo, before.supplies.ammo);
      assert.equal(
        await page.evaluate(() =>
          localStorage.getItem("stteak:dust-redemption:profile:v2"),
        ),
        disk,
      );
      assert.equal(await page.locator("[data-save-retry]:enabled").count(), 1);
      assert.match(
        await page.locator("[data-save-status]").innerText(),
        /無法|失敗|不足|限制|拒絕|未/,
      );
      assert.match(
        await page.locator("#toast").innerText(),
        /升級未完成，旅費未扣除/,
      );
      assert.doesNotMatch(await page.locator("#toast").innerText(), /已升為/);
    } finally {
      await page.evaluate(() => {
        Storage.prototype.setItem = window.__nativeWrite;
        delete window.__nativeWrite;
      });
    }
    await action(page, "retry-save");
    assert.equal((await snapshot(page)).profile.wallet, before.wallet);
    assert.equal((await snapshot(page)).profile.supplies.ammo, 0);
  }
  await page.waitForTimeout(550);
  await page.locator("[data-action=buy-supply][data-id=ammo]").dblclick();
  assert.equal((await snapshot(page)).profile.wallet, before.wallet - 50);
  assert.equal((await snapshot(page)).profile.supplies.ammo, 1);
  await page.reload();
  await mode(page, "title");
  assert.equal((await snapshot(page)).profile.wallet, before.wallet - 50);
  assert.equal((await snapshot(page)).profile.supplies.ammo, 1);
  pass(
    "labelled storage fixture: quota/security denial atomic, visible retry, exactly one double-click purchase survives reload",
  );
  await page.evaluate(() => localStorage.clear());
  await page.reload();
  await mode(page, "title");
}
export async function audioSignal(page, pass) {
  await page.waitForFunction(() => dustDiagnostics().audio.decoded === 11);
  await page.evaluate(() => {
    const c = window.__qaContexts[0],
      a = c.__tap;
    a.fftSize = 2048;
    window.__signal = a;
    // Keep the analyser processing even when a muted graph has no live sources.
    const keep = c.createConstantSource(),
      gain = c.createGain();
    keep.offset.value = 0;
    keep.connect(a);
    a.connect(gain);
    gain.gain.value = 0;
    window.__nativeConnect.call(gain, c.destination);
    keep.start();
  });
  const signal = () =>
    page.evaluate(() => {
      const a = window.__signal,
        data = new Float32Array(a.fftSize);
      a.getFloatTimeDomainData(data);
      return {
        rms: Math.sqrt(data.reduce((s, v) => s + v * v, 0) / data.length),
        peak: Math.max(...data.map(Math.abs)),
      };
    });
  await page.waitForTimeout(1000);
  assert.ok((await signal()).rms > 0, "music output after real gesture");
  await action(page, "settings");
  for (const bus of ["music", "sfx"]) {
    await page.locator(`[data-setting=${bus}]`).fill("0");
    await page.locator(`[data-setting=${bus}]`).dispatchEvent("input");
  }
  await action(page, "close-sheet");
  await page.waitForTimeout(700);
  assert.deepEqual(await signal(), { rms: 0, peak: 0 });
  await action(page, "settings");
  await page.locator("[data-setting=music]").fill("0.3");
  await page.locator("[data-setting=music]").dispatchEvent("input");
  await page.locator("[data-setting=sfx]").fill("0.65");
  await page.locator("[data-setting=sfx]").dispatchEvent("input");
  await action(page, "close-sheet");
  await page.waitForTimeout(800);
  assert.ok((await signal()).rms > 0);
  pass(
    "continuous analyser: real music signal, both buses muted to zero, restored nonzero",
  );
}
