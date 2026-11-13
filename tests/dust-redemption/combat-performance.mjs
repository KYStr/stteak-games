import assert from "node:assert/strict";
import { readFile, writeFile } from "node:fs/promises";
import { action, mode, snapshot, walk, waitForProgress } from "./driver.mjs";
import { resourceSnapshot, boundedResources } from "./resource-snapshot.mjs";
export async function activeCombat(
  page,
  client,
  evidence,
  allocationSummary,
  updateDifference,
) {
  const fixture = JSON.parse(
    await readFile(`${evidence}/long-night-earned.json`, "utf8"),
  );
  for (let attempt = 1; attempt <= 3; attempt++) {
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
    await action(page, "brief", "[data-id=dawn-pact]");
    await page.selectOption("#loadout-weapon", "rifle");
    await page.selectOption("#loadout-item", "medkit");
    await page.selectOption("#loadout-difficulty", "standard");
    await action(page, "deploy");
    await mode(page, "playing");
    let d = await snapshot(page);
    const covers = d.colliders
      .filter(
        (b) =>
          ["crate-high", "crate-low", "rock"].includes(b.kind) &&
          b.h <= 2.2 &&
          b.z > 4,
      )
      .sort(
        (a, b) =>
          Math.hypot(a.x - d.player.x, a.z - d.player.z) -
          Math.hypot(b.x - d.player.x, b.z - d.player.z),
      );
    assert.ok(covers.length, "existing southern cover");
    const cover = covers[Math.min(attempt - 1, covers.length - 1)];
    await walk(page, { x: cover.x, z: cover.max.z + 0.65 }, 0.05);
    await page.keyboard.press("KeyE");
    d = await snapshot(page);
    assert.equal(d.mode, "playing");
    assert.ok(d.player.cover, "physical cover entered through native E");
    let warmed = false;
    for (const enemy of d.enemies) {
      if (enemy.hp <= 0) continue;
      await page.mouse.move(enemy.screen.x, enemy.screen.y);
      await page.mouse.down({ button: "right" });
      await page.waitForTimeout(80);
      const warmState = await snapshot(page);
      if (warmState.enemies.find((e) => e.id === enemy.id)?.shotLineClear) {
        const count = warmState.stats.shots;
        await page.mouse.down();
        try {
          await waitForProgress(page, (state) => state.stats.shots > count, {
            label: "accepted warmup shot",
            simulationBudget: 2,
            wallWatchdog: 120000,
          });
        } finally {
          await page.mouse.up();
        }
        warmed = true;
      }
      await page.mouse.up({ button: "right" });
      if (warmed) break;
    }
    if (!warmed) {
      await writeFile(
        `${evidence}/final-combat-warmup-${attempt}.json`,
        JSON.stringify(
          {
            status: "failed",
            reason: "no clear aimed shot from this actual cover",
            cover,
            state: await snapshot(page),
          },
          null,
          2,
        ),
      );
      assert.ok(
        attempt < 3,
        "a viable cover with a real firing line is required",
      );
      continue;
    }
    await page.waitForTimeout(5000);
    const before = await resourceSnapshot(page, client),
      events = [],
      collect = (data) => events.push(...data.value);
    client.on("Tracing.dataCollected", collect);
    await client.send("Tracing.start", {
      categories: "v8,disabled-by-default-v8.gc",
      transferMode: "ReportEvents",
    });
    await client.send("HeapProfiler.startSampling", {
      samplingInterval: 32768,
      includeObjectsCollectedByMajorGC: true,
      includeObjectsCollectedByMinorGC: true,
    });
    const started = Date.now(),
      samples = [];
    let failed = null,
      shots = 0,
      lastFireSim = -Infinity;
    try {
      while (Date.now() - started < 45000) {
        d = await snapshot(page);
        samples.push({
          at: Date.now() - started,
          mode: d.mode,
          hp: d.player.hp,
          cover: d.player.cover,
          render: d.render,
          shots: d.stats.shots,
          enemyShots: d.enemies.reduce((n, e) => n + e.shots, 0),
          warning: d.enemies.some((e) => e.hp > 0 && e.windup > 0),
        });
        assert.equal(d.mode, "playing", "full active combat window");
        if (d.player.hp < 65 && d.stats.itemsUsed === 0)
          await page.keyboard.press("KeyF");
        const warning = d.enemies.some(
          (e) =>
            e.hp > 0 &&
            e.windup > 0 &&
            e.windup <= 0.4 &&
            Math.hypot(e.x - d.player.x, e.z - d.player.z) < 30,
        );
        if (!warning && d.player.reload <= 0) {
          if (d.player.ammo < 3) await page.keyboard.press("KeyR");
          else if (d.challenge.activeSeconds - lastFireSim >= 1.2) {
            const enemy = d.enemies.find(
              (e) =>
                e.hp > 0 &&
                e.screen.x > 0 &&
                e.screen.x < 1280 &&
                e.screen.y > 0 &&
                e.screen.y < 720,
            );
            if (enemy) {
              await page.mouse.move(enemy.screen.x, enemy.screen.y);
              await page.mouse.down({ button: "right" });
              await page.waitForTimeout(80);
              const peek = await snapshot(page);
              if (
                peek.enemies.find((e) => e.id === enemy.id)?.shotLineClear &&
                !peek.enemies.some((e) => e.hp > 0 && e.windup > 0)
              ) {
                await page.mouse.down();
                try {
                  await waitForProgress(
                    page,
                    (state) => state.stats.shots > peek.stats.shots,
                    {
                      label: "accepted aimed combat shot",
                      simulationBudget: 2,
                      wallWatchdog: 120000,
                    },
                  );
                } finally {
                  await page.mouse.up();
                }
                lastFireSim = peek.challenge.activeSeconds;
              }
              await page.mouse.up({ button: "right" });
            }
          }
        }
        await page.waitForTimeout(400);
        shots = d.stats.shots;
      }
      assert.equal((await snapshot(page)).mode, "playing");
      assert.ok(
        (await snapshot(page)).stats.shots > before.state.stats.shots,
        "accepted aimed shots with a clear physical line during the complete window",
      );
    } catch (error) {
      failed = error;
    }
    await page.mouse.up();
    await page.mouse.up({ button: "right" });
    const { profile } = await client.send("HeapProfiler.stopSampling");
    const done = new Promise((r) => client.once("Tracing.tracingComplete", r));
    await client.send("Tracing.end");
    await done;
    client.off("Tracing.dataCollected", collect);
    const after = await resourceSnapshot(page, client);
    const row = {
      workload: "final-combat",
      attempt,
      chapterAccessFixture: "actually earned chapter-5 profile",
      status: failed ? "failed" : "measured; gates pending",
      durationMs: Date.now() - started,
      before,
      after,
      samples,
      shots,
      update: updateDifference(before.update, after.update),
      gc: events.filter((e) =>
        /MinorGC|MajorGC|V8.GCScavenger$|V8.GCCompactor$/.test(e.name),
      ),
      allocations: allocationSummary(profile),
    };
    await writeFile(
      `${evidence}/final-combat-attempt-${attempt}.json`,
      JSON.stringify(row, null, 2),
    );
    await writeFile(
      `${evidence}/final-combat-${attempt}-allocation.heapprofile`,
      JSON.stringify(profile),
    );
    if (failed) {
      await page.screenshot({
        path: `${evidence}/final-combat-failed-${attempt}.png`,
      });
      if (attempt === 3) throw failed;
      continue;
    }
    assert.ok(row.durationMs >= 45000);
    assert.ok(
      after.state.stats.shots > before.state.stats.shots,
      "actual accepted shots during the active window",
    );
    assert.ok(row.update.p95Ms <= 6);
    const maxima = {
      drawCalls: 0,
      triangles: 0,
      textureBytesEstimate: 0,
      effects: 0,
    };
    for (const sample of samples)
      for (const key of Object.keys(maxima))
        maxima[key] = Math.max(maxima[key], sample.render[key] || 0);
    assert.ok(
      maxima.drawCalls <= 250 &&
        maxima.triangles <= 1500000 &&
        maxima.textureBytesEstimate <= 256 * 1024 * 1024,
    );
    boundedResources(before, after, "45 seconds live combat", {
      geometry: false,
    });
    assert.equal(
      after.render.persistentGeometries,
      before.render.persistentGeometries,
    );
    assert.ok(maxima.effects <= 64, "bounded transient tracer effects");
    row.maxima = maxima;
    row.status = "passed";
    await writeFile(
      `${evidence}/final-combat.json`,
      JSON.stringify(row, null, 2),
    );
    return row;
  }
}
