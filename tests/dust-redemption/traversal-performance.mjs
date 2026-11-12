import assert from "node:assert/strict";
import { writeFile, readFile } from "node:fs/promises";
import { url, snapshot, action, mode } from "./driver.mjs";
import { completeMail, completeNight } from "./campaign.mjs";
import { resourceSnapshot, boundedResources } from "./resource-snapshot.mjs";
export async function traversalPerformance(
  page,
  client,
  evidence,
  allocationSummary,
) {
  const rows = [];
  for (const kind of ["carry", "escort"]) {
    if ((await snapshot(page)).mode === "playing") {
      await page.keyboard.press("Escape");
      await mode(page, "paused");
      await action(page, "abandon");
    }
    const fixture = JSON.parse(
      await readFile(
        `${evidence}/${kind === "carry" ? "dawn-pact" : "black-ledger"}-earned.json`,
        "utf8",
      ),
    );
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
    await action(
      page,
      "brief",
      `[data-id=${kind === "carry" ? "dry-mail" : "long-night"}]`,
    );
    await action(page, "deploy");
    await mode(page, "playing");
    await page.evaluate(async () => {
      const { FieldSystem } = await import("./field-system.js");
      if (FieldSystem.prototype.__identityBase) return;
      const base = FieldSystem.prototype.update;
      FieldSystem.prototype.__identityBase = base;
      window.__fieldIdentity = {
        carry: { updates: 0, newIdentities: 0, last: null },
        escort: { updates: 0, newIdentities: 0, last: null },
      };
      FieldSystem.prototype.update = function auditFieldResult(
        dt,
        player,
        colliders,
      ) {
        const result = base.call(this, dt, player, colliders),
          kind =
            this.traversal?.type === "escort" || this.onward?.following
              ? "escort"
              : this.carrying
                ? "carry"
                : null;
        if (kind) {
          const row = window.__fieldIdentity[kind];
          row.updates++;
          if (
            kind === "escort" &&
            this.onward?.members.some((m) => m.state === "walk")
          )
            row.movingUpdates = (row.movingUpdates || 0) + 1;
          if (row.last && row.last !== result) row.newIdentities++;
          row.last = result;
        }
        return result;
      };
    });
    const probe = async () => {
      await page.waitForTimeout(3000);
      const windows = [];
      for (let window = 0; window < 2; window++) {
        const before = await resourceSnapshot(page, client);
        const identityBefore = await page.evaluate(
          (k) => ({
            updates: __fieldIdentity[k].updates,
            newIdentities: __fieldIdentity[k].newIdentities,
            movingUpdates: __fieldIdentity[k].movingUpdates || 0,
          }),
          kind,
        );
        await client.send("HeapProfiler.startSampling", {
          samplingInterval: 32768,
          includeObjectsCollectedByMajorGC: true,
          includeObjectsCollectedByMinorGC: true,
        });
        const events = [],
          collect = (data) => events.push(...data.value);
        client.on("Tracing.dataCollected", collect);
        await client.send("Tracing.start", {
          categories: "v8,disabled-by-default-v8.gc",
          transferMode: "ReportEvents",
        });
        const start = Date.now();
        let turns = 0;
        while (Date.now() - start < 60000) {
          const d = await snapshot(page);
          assert.equal(d.mode, "playing");
          assert.ok(
            kind === "escort"
              ? d.field.traversal?.type === "escort" ||
                  d.field.onward?.following
              : d.player.handsOccupied,
            "real traversal remains active",
          );
          const key = turns++ % 2 ? "KeyA" : "KeyD";
          await page.keyboard.down(key);
          await page.waitForTimeout(600);
          await page.keyboard.up(key);
        }
        const { profile } = await client.send("HeapProfiler.stopSampling");
        const done = new Promise((r) =>
          client.once("Tracing.tracingComplete", r),
        );
        await client.send("Tracing.end");
        await done;
        client.off("Tracing.dataCollected", collect);
        const after = await resourceSnapshot(page, client);
        const identityAfter = await page.evaluate(
          (k) => ({
            updates: __fieldIdentity[k].updates,
            newIdentities: __fieldIdentity[k].newIdentities,
            movingUpdates: __fieldIdentity[k].movingUpdates || 0,
          }),
          kind,
        );
        const gc = events.filter((e) =>
          /MinorGC|MajorGC|V8.GCScavenger$|V8.GCCompactor$/.test(e.name),
        );
        const row = {
          kind,
          window,
          fixture:
            "earned chapter access; all fieldwork entered through native input",
          durationMs: Date.now() - start,
          before,
          after,
          updates: identityAfter.updates - identityBefore.updates,
          newIdentities:
            identityAfter.newIdentities - identityBefore.newIdentities,
          movingUpdates:
            identityAfter.movingUpdates - identityBefore.movingUpdates,
          pathRecalculations:
            after.state.field.routing.recalculations -
            before.state.field.routing.recalculations,
          gc,
          allocations: allocationSummary(profile),
        };
        await writeFile(
          `${evidence}/${kind}-${window}-allocation.heapprofile`,
          JSON.stringify(profile),
        );
        await writeFile(
          `${evidence}/${kind}-${window}.json`,
          JSON.stringify(row, null, 2),
        );
        assert.ok(
          row.updates >= 120,
          `at least 120 consecutive ${kind} updates; observed ${row.updates}`,
        );
        assert.equal(row.newIdentities, 0);
        boundedResources(before, after, `${kind} window ${window}`);
        windows.push(row);
      }
      if (kind === "escort")
        assert.ok(
          windows.reduce((n, r) => n + r.movingUpdates, 0) >= 120,
          "at least 120 actual moving follower updates",
        );
      const first = windows[0],
        second = windows[1];
      const bytes = (r) =>
        r.allocations.application.reduce((n, a) => n + a.bytes, 0);
      assert.ok(
        bytes(second) <= bytes(first) * 1.5 + 131072,
        "bounded equivalent-window application allocations",
      );
      assert.ok(
        second.gc.length <= first.gc.length * 1.5 + 8,
        "bounded equivalent-window GC observations",
      );
      for (const row of windows)
        for (const stack of row.allocations.application) {
          assert.ok(
            !(
              stack.bytes > 32768 &&
              /escortTarget|readFeedSnapshot/.test(stack.stack.join("\n")) &&
              /map|readFeedSnapshot/.test(stack.function)
            ),
            "no frame-proportional collider/feed snapshot allocation stack",
          );
        }
      rows.push({ kind, windows });
    };
    if (kind === "carry")
      await completeMail(page, { onCarry: probe, stopAfterProbe: true });
    else
      await completeNight(page, "west-ford", {
        onwardProbe: probe,
      });
  }
  return rows;
}
