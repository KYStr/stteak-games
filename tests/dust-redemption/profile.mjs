// CPU profiling fixtures are chapter access setup, never campaign completion evidence.
import { chromium } from "/workspace/stteak8/tools/node_modules/playwright-core/index.mjs";
import { mkdir, writeFile } from "node:fs/promises";
import { url, action, mode, snapshot } from "./driver.mjs";
import {
  createProfile,
  beginMission,
  completeMission,
} from "../../games/dust-redemption/rules.js";
import { MISSIONS } from "../../games/dust-redemption/content.js";
const dir = process.env.DUST_EVIDENCE_DIR || "/tmp/dust-redemption-profile";
await mkdir(dir, { recursive: true });
const browser = await chromium.launch({
  executablePath: "/usr/bin/google-chrome",
  args: ["--use-angle=swiftshader", "--enable-unsafe-swiftshader"],
});
try {
  const page = await browser.newPage({
    viewport: { width: 1280, height: 720 },
  });
  page.setDefaultTimeout(60000);
  for (const id of ["dry-mail", "dawn-pact"]) {
    let profile = createProfile();
    for (const m of MISSIONS) {
      if (m.id === id) break;
      const b = beginMission(profile, m.id);
      profile = completeMission(b.profile, b.run, {
        strategy: "nonlethal",
        choice: m.choice?.options[0].id,
      }).profile;
    }
    await page.goto(url);
    await mode(page, "title");
    await page.evaluate((p) => {
      localStorage.clear();
      localStorage.setItem(
        "stteak:dust-redemption:profile:v2",
        JSON.stringify(p),
      );
    }, profile);
    await page.reload();
    await mode(page, "title");
    await action(page, "hub");
    await action(page, "brief", `[data-id="${id}"]`);
    await action(page, "deploy");
    await mode(page, "playing");
    await page.waitForTimeout(2000);
    const client = await page.context().newCDPSession(page);
    await client.send("Profiler.enable");
    await client.send("Performance.enable");
    for (const moving of [false, true]) {
      await page.evaluate(() => {
        window.__intervals = [];
        window.__last = 0;
        window.__measuring = true;
        function sample(t) {
          if (!window.__measuring) return;
          if (window.__last) __intervals.push(t - window.__last);
          window.__last = t;
          requestAnimationFrame(sample);
        }
        requestAnimationFrame(sample);
      });
      const beforeUpdate = (await snapshot(page)).performance.updateTotals;
      await client.send("Profiler.start");
      if (moving)
        await client.send("HeapProfiler.startSampling", {
          samplingInterval: 32768,
          includeObjectsCollectedByMajorGC: true,
          includeObjectsCollectedByMinorGC: true,
        });
      for (let i = 0; i < 10; i++) {
        if (moving) await page.keyboard.down(i % 2 ? "KeyA" : "KeyD");
        await page.waitForTimeout(1500);
        if (moving) await page.keyboard.up(i % 2 ? "KeyA" : "KeyD");
      }
      const { profile: cpu } = await client.send("Profiler.stop");
      const allocation = moving
        ? (await client.send("HeapProfiler.stopSampling")).profile
        : null;
      const metrics = await client.send("Performance.getMetrics");
      const intervals = await page.evaluate(() => {
        window.__measuring = false;
        return window.__intervals;
      });
      const state = await snapshot(page);
      const name = `${process.env.DUST_PROFILE_PHASE || "baseline"}-${id}-${moving ? "moving" : "stationary"}`;
      await writeFile(`${dir}/${name}.cpuprofile`, JSON.stringify(cpu));
      if (allocation)
        await writeFile(
          `${dir}/${name}-allocation.heapprofile`,
          JSON.stringify(allocation),
        );
      const total = state.performance.updateTotals,
        histogram = total.histogram.map(
          (n, i) => n - beforeUpdate.histogram[i],
        ),
        count = total.count - beforeUpdate.count;
      let sum = 0,
        p95 = Infinity;
      for (let i = 0; i < histogram.length - 1; i++) {
        sum += histogram[i];
        if (sum >= count * 0.95) {
          p95 = (i + 1) * total.binMs;
          break;
        }
      }
      const update = {
        samples: count,
        meanMs: (total.totalMs - beforeUpdate.totalMs) / count,
        p95Ms: p95,
      };
      console.log("UPDATE", name, JSON.stringify(update));
      await writeFile(
        `${dir}/${name}.json`,
        JSON.stringify(
          {
            fixture: true,
            update,
            intervals,
            metrics,
            render: state.render,
            performance: state.performance,
          },
          null,
          2,
        ),
      );
      console.log(name, state.render);
    }
    await client.detach();
  }
} finally {
  await browser.close();
}
