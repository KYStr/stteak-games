import { ProgressClock } from "./progress-clock.mjs";
import assert from "node:assert/strict";
import { planTacticalPath } from "../../games/dust-redemption/enemy-tactics.js";
export const port = Number(process.env.DUST_PORT ?? 8102);
assert.ok(
  Number.isInteger(port) && port >= 1 && port <= 65535,
  "DUST_PORT must be an integer 1–65535",
);
export const url = `http://127.0.0.1:${port}/games/dust-redemption/`;
export const snapshot = (p) => p.evaluate(() => dustDiagnostics());
export function completedEscortWaypoint(d, target) {
  const traversal = d.field?.traversal;
  if (
    traversal?.type !== "escort" ||
    !Array.isArray(traversal.route) ||
    !Number.isInteger(traversal.index) ||
    traversal.index <= 0
  )
    return false;
  return traversal.route.some(
    (point, index) =>
      index < traversal.index &&
      Math.hypot(point[0] - target.x, point[1] - target.z) <= 0.01,
  );
}
export function needsSupply(d) {
  const threshold =
    d.profile?.equipment?.item === "medkit"
      ? Math.min(45, 65 - 10 * (d.profile.supplies?.medicine || 0))
      : 45;
  return d.stats.itemsUsed === 0 && d.player.hp < threshold;
}
export function trailingFollowers(d, target) {
  const members = d.field.onward?.following
    ? d.field.onward.members
    : d.field.traversal?.type === "escort"
      ? d.nightFlow?.party.members
      : null;
  if (!members) return false;
  const remaining = Math.hypot(d.player.x - target.x, d.player.z - target.z);
  return members.some(
    (m) =>
      Math.hypot(m.position[0] - d.player.x, m.position[1] - d.player.z) > 4 &&
      Math.hypot(m.position[0] - target.x, m.position[1] - target.z) >
        remaining + 0.1,
  );
}
export async function waitForProgress(page, predicate, options = {}) {
  const initial = await snapshot(page),
    mission = initial.mission;
  const clock = new ProgressClock({
    ...options,
    stallEligible:
      options.stallEligible ||
      (options.escort
        ? (d) =>
            d.nightFlow.party.members.every(
              (m) =>
                Math.hypot(
                  m.position[0] - d.player.x,
                  m.position[1] - d.player.z,
                ) <= 6,
            )
        : undefined),
    valid(d) {
      assert.equal(d.mission, mission, `${options.label}: wrong mission`);
      assert.ok(
        ["playing", "field"].includes(d.mode),
        `${options.label}: unexpected modal ${d.mode}`,
      );
      if (options.escort) {
        const members = d.nightFlow?.party.members;
        assert.equal(
          members?.length,
          3,
          `${options.label}: missing family member`,
        );
        assert.deepEqual(
          members.map((m) => m.id).sort(),
          initial.nightFlow.party.members.map((m) => m.id).sort(),
        );
      }
      options.valid?.(d);
    },
  });
  let lastLog = Date.now();
  while (true) {
    const d = await snapshot(page);
    clock.observe(d);
    if (predicate(d)) return d;
    if (Date.now() - lastLog >= 30000) {
      console.log(
        `${options.label}: ${Math.round(clock.lastSim - clock.startSim)} simulated seconds progressed`,
      );
      lastLog = Date.now();
    }
    await page.waitForTimeout(500);
  }
}
export async function click(p, selector) {
  const target = p.locator(selector).filter({ visible: true }).first();
  await target.waitFor({ state: "visible" });
  assert.equal(await target.isEnabled(), true, `disabled control ${selector}`);
  // Static inspection scenes deliberately skip WebGL submissions. Under shared
  // SwiftShader Chrome's frame-based stability poll can stall even on an
  // unchanged button. Scroll, validate the actual hit target, then send native
  // pointer input; never force a click or invoke the DOM/event handler.
  await target.evaluate((el) =>
    el.scrollIntoView({
      block: "nearest",
      inline: "nearest",
      behavior: "instant",
    }),
  );
  const rect = await target.boundingBox();
  assert.ok(
    rect && rect.width > 0 && rect.height > 0,
    `visible bounds ${selector}`,
  );
  const point = { x: rect.x + rect.width / 2, y: rect.y + rect.height / 2 };
  assert.equal(
    await target.evaluate((el, point) => {
      const hit = document.elementFromPoint(point.x, point.y);
      return hit === el || el.contains(hit);
    }, point),
    true,
    `unobstructed control ${selector}`,
  );
  await p.mouse.click(point.x, point.y);
}
export async function action(p, a, extra = "") {
  await click(p, `#overlay [data-action="${a}"]:not(:disabled)${extra}`);
}
export async function mode(p, expected) {
  await p.waitForFunction((m) => dustDiagnostics().mode === m, expected, {
    timeout: 180000,
  });
}
export async function start(p) {
  await p.goto(url);
  await mode(p, "title");
  await action(p, "hub");
  await action(p, "brief");
  await action(p, "deploy");
  await mode(p, "playing");
}
function reachedSheet(d, target) {
  if (d.mode !== "field" || d.field?.traversal) return false;
  const gap = Math.hypot(d.player.x - target.x, d.player.z - target.z);
  if (gap < 2) return true;
  // Escort completion opens its real sheet within the authored 3m arrival
  // threshold. All three identities must have arrived; this never accepts an
  // arbitrary interruption or changes their/player positions.
  return (
    gap < 3.1 &&
    d.field.active === "night-escort" &&
    d.field.state.progress["night-escort"]?.includes("group-checkpoints") &&
    d.nightFlow?.party.members.length === 3 &&
    d.nightFlow.party.members.every((m) => m.state === "safe")
  );
}
export async function walk(p, target, radius = 1.6, replans = 0, onSample) {
  let d = await snapshot(p);
  if (completedEscortWaypoint(d, target)) {
    assert.equal(
      d.mode,
      "playing",
      "completed waypoint cannot hide a death or interruption",
    );
    return;
  }
  const from = d.player;
  // The attached cart moves with input. Keep its real collider in the game;
  // omit that one moving body only from this driver's static route search.
  const planningColliders =
    d.field?.traversal?.type === "push"
      ? d.colliders.filter((b) => b.kind !== "pact-cart")
      : d.colliders;
  const candidates = [
    target,
    ...Array.from({ length: 24 }, (_, i) => ({
      x: target.x + Math.cos((i * Math.PI) / 12) * radius,
      z: target.z + Math.sin((i * Math.PI) / 12) * radius,
    })),
  ];
  let path = null;
  for (const bodyRadius of [d.player.handsOccupied ? 0.8 : 0.45, 0.4, 0.34]) {
    for (const to of candidates) {
      const candidate = planTacticalPath({
        from,
        to,
        colliders: planningColliders,
        radius: bodyRadius,
        bounds: 22.5,
        maxDistance: 120,
      });
      if (candidate) {
        // Prefer the exact target, then the first reachable point inside the
        // requested tolerance. Re-solving every candidate for a global minimum
        // blocks the Node driver under shared CPU load without improving proof.
        path = candidate;
        break;
      }
    }
    if (path) break;
  }
  assert.ok(path, `No reachable route to ${JSON.stringify(target)}`);
  if (
    await p.locator("body").evaluate((el) => el.classList.contains("touch"))
  ) {
    const pad = await p.locator("#move-pad").boundingBox(),
      cx = pad.x + pad.width / 2,
      cy = pad.y + pad.height / 2,
      r = pad.width * 0.38;
    await p.mouse.move(cx, cy);
    await p.mouse.down();
    try {
      let previous = path[0];
      for (const waypoint of path.slice(1)) {
        let lastMoveX = d.player.x,
          lastMoveZ = d.player.z,
          lastMoveSim = d.challenge.activeSeconds;

        const clock = new ProgressClock({
          label: "analog movement",
          simulationBudget:
            Math.hypot(waypoint.x - d.player.x, waypoint.z - d.player.z) / 2.4 +
            30,
        });
        for (let tries = 0; ; tries++) {
          d = await snapshot(p);
          if (completedEscortWaypoint(d, target)) {
            assert.equal(
              d.mode,
              "playing",
              "completed waypoint cannot hide a death or interruption",
            );
            return;
          }
          if (reachedSheet(d, target)) return;
          assert.equal(d.mode, "playing");
          if (onSample && (await onSample(d))) {
            await p.mouse.move(cx, cy);
            await p.mouse.down();
            d = await snapshot(p);
          }
          if (needsSupply(d)) await p.keyboard.press("KeyF");
          if (trailingFollowers(d, waypoint)) {
            clock.observe(d);
            lastMoveSim = d.challenge.activeSeconds;
            lastMoveX = d.player.x;
            lastMoveZ = d.player.z;
            await p.mouse.move(cx, cy);
            await p.waitForTimeout(180);
            continue;
          }
          const dx = waypoint.x - d.player.x,
            dz = waypoint.z - d.player.z,
            gap = Math.hypot(dx, dz);
          if (gap < 0.06) break;
          clock.observe(d);
          if (
            Math.hypot(d.player.x - lastMoveX, d.player.z - lastMoveZ) > 0.025
          ) {
            lastMoveX = d.player.x;
            lastMoveZ = d.player.z;
            lastMoveSim = d.challenge.activeSeconds;
          } else if (d.challenge.activeSeconds - lastMoveSim > 2) {
            assert.ok(
              replans < 2,
              `Native movement stalled after replanning: ${JSON.stringify({ player: d.player, waypoint, target, colliders: d.colliders })}`,
            );
            // Release and re-acquire the real stick, briefly retrace the last
            // certified segment, then plan again from current collision bounds.
            await p.mouse.up();
            await p.mouse.move(cx, cy);
            await p.mouse.down();
            const rx = previous.x - d.player.x,
              rz = previous.z - d.player.z,
              len = Math.hypot(rx, rz),
              angle = Math.PI / 4 + (d.camera * Math.PI) / 2;
            if (len > 0.05) {
              await p.mouse.move(
                cx +
                  ((rx * Math.cos(angle) - rz * Math.sin(angle)) / len) *
                    r *
                    0.4,
                cy +
                  ((rx * Math.sin(angle) + rz * Math.cos(angle)) / len) *
                    r *
                    0.4,
              );
              await p.waitForTimeout(500);
            }
            await p.mouse.up();
            return walk(p, target, radius, replans + 1, onSample);
          }
          const a = Math.PI / 4 + (d.camera * Math.PI) / 2;
          const pressure = Math.min(
            d.field.traversal?.type === "push" ? 0.4 : 1,
            Math.max(0.12, gap / 1.6),
          );
          await p.mouse.move(
            cx + ((dx * Math.cos(a) - dz * Math.sin(a)) / gap) * r * pressure,
            cy + ((dx * Math.sin(a) + dz * Math.cos(a)) / gap) * r * pressure,
          );
          await p.waitForTimeout(Math.max(50, Math.min(120, (gap / 5) * 700)));
        }
        previous = waypoint;
      }
    } finally {
      // Neutralize the real stick before releasing capture. A slow software
      // render can otherwise leave the last deflection active past the sampled
      // arrival position while the pointer-up command is being delivered.
      await p.mouse.move(cx, cy);
      await p.mouse.up();
    }
    const settled = await snapshot(p),
      end = path.at(-1);
    if (
      settled.mode === "playing" &&
      !completedEscortWaypoint(settled, target) &&
      Math.hypot(settled.player.x - end.x, settled.player.z - end.z) > 0.3
    ) {
      assert.ok(
        replans < 2,
        `native stick release did not settle: ${JSON.stringify({ target, end, player: settled.player, replans })}`,
      );
      return walk(p, target, radius, replans + 1, onSample);
    }
    return;
  }
  const route = [];
  for (let i = 1; i < path.length; i++) {
    const a = path[i - 1],
      b = path[i],
      n = Math.ceil(Math.hypot(b.x - a.x, b.z - a.z) / 0.75);
    for (let j = 1; j <= n; j++)
      route.push({
        x: a.x + ((b.x - a.x) * j) / n,
        z: a.z + ((b.z - a.z) * j) / n,
      });
  }
  for (const waypoint of route) {
    let tries = 0;
    const clock = new ProgressClock({
      label: "keyboard movement",
      simulationBudget:
        Math.hypot(waypoint.x - d.player.x, waypoint.z - d.player.z) / 2.4 + 30,
    });
    while (true) {
      d = await snapshot(p);
      if (completedEscortWaypoint(d, target)) {
        assert.equal(
          d.mode,
          "playing",
          "completed waypoint cannot hide a death or interruption",
        );
        return;
      }
      if (reachedSheet(d, target)) return;
      assert.equal(d.mode, "playing", `Walking interrupted: ${d.mode}`);
      if (onSample && (await onSample(d))) d = await snapshot(p);
      if (needsSupply(d)) await p.keyboard.press("KeyF");
      if (trailingFollowers(d, waypoint)) {
        clock.observe(d);
        await p.waitForTimeout(500);
        continue;
      }
      const dx = waypoint.x - d.player.x,
        dz = waypoint.z - d.player.z,
        gap = Math.hypot(dx, dz);
      if (gap < 0.26 || (tries > 12 && gap < 0.6)) break;
      tries++;
      clock.observe(d);
      const a = Math.PI / 4 + (d.camera * Math.PI) / 2,
        x = dx * Math.cos(a) - dz * Math.sin(a),
        z = dx * Math.sin(a) + dz * Math.cos(a),
        angle = Math.atan2(z, x),
        sector = Math.round(angle / (Math.PI / 4));
      const sx = Math.round(Math.cos((sector * Math.PI) / 4)),
        sz = Math.round(Math.sin((sector * Math.PI) / 4));
      const held = [
        ...(sx ? [sx > 0 ? "KeyD" : "KeyA"] : []),
        ...(sz ? [sz > 0 ? "KeyS" : "KeyW"] : []),
      ];
      for (const k of held) await p.keyboard.down(k);
      await p.waitForTimeout(Math.max(35, Math.min(130, (gap / 5) * 1000)));
      for (const k of held) await p.keyboard.up(k);
    }
  }
}
