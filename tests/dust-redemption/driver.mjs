import assert from "node:assert/strict";
import { planTacticalPath } from "../../games/dust-redemption/enemy-tactics.js";
export const port = Number(process.env.DUST_PORT ?? 8102);
assert.ok(
  Number.isInteger(port) && port >= 1 && port <= 65535,
  "DUST_PORT must be an integer 1–65535",
);
export const url = `http://127.0.0.1:${port}/games/dust-redemption/`;
export const snapshot = (p) => p.evaluate(() => dustDiagnostics());
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
export async function walk(p, target, radius = 1.6) {
  let d = await snapshot(p);
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
  let path = null,
    pathLength = Infinity;
  for (const bodyRadius of [d.player.handsOccupied ? 0.8 : 0.35, 0.45, 0.35]) {
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
        const length = candidate
          .slice(1)
          .reduce(
            (sum, v, i) =>
              sum + Math.hypot(v.x - candidate[i].x, v.z - candidate[i].z),
            0,
          );
        if (length < pathLength) {
          path = candidate;
          pathLength = length;
        }
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
      for (const waypoint of path.slice(1)) {
        for (let tries = 0; ; tries++) {
          d = await snapshot(p);
          if (reachedSheet(d, target)) return;
          assert.equal(d.mode, "playing");
          if (d.player.hp < 45 && d.stats.itemsUsed === 0)
            await p.keyboard.press("KeyF");
          if (
            d.field.traversal?.type === "escort" &&
            d.nightFlow?.party.members.some(
              (m) =>
                Math.hypot(
                  m.position[0] - d.player.x,
                  m.position[1] - d.player.z,
                ) > 4,
            )
          ) {
            await p.mouse.move(cx, cy);
            await p.waitForTimeout(180);
            continue;
          }
          const dx = waypoint.x - d.player.x,
            dz = waypoint.z - d.player.z,
            gap = Math.hypot(dx, dz);
          if (gap < 0.12) break;
          assert.ok(
            tries < 160,
            `Analog movement stuck ${JSON.stringify(d.player)} heading ${JSON.stringify(waypoint)}`,
          );
          const a = Math.PI / 4 + (d.camera * Math.PI) / 2;
          const pressure = Math.min(
            d.field.traversal?.type === "push" ? 0.4 : 1,
            Math.max(0.1, gap / 0.9),
          );
          await p.mouse.move(
            cx + ((dx * Math.cos(a) - dz * Math.sin(a)) / gap) * r * pressure,
            cy + ((dx * Math.sin(a) + dz * Math.cos(a)) / gap) * r * pressure,
          );
          await p.waitForTimeout(Math.max(50, Math.min(220, (gap / 5) * 850)));
        }
      }
    } finally {
      await p.mouse.up();
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
    while (true) {
      d = await snapshot(p);
      if (reachedSheet(d, target)) return;
      assert.equal(d.mode, "playing", `Walking interrupted: ${d.mode}`);
      if (d.player.hp < 45 && d.stats.itemsUsed === 0)
        await p.keyboard.press("KeyF");
      const dx = waypoint.x - d.player.x,
        dz = waypoint.z - d.player.z,
        gap = Math.hypot(dx, dz);
      if (gap < 0.26 || (tries > 12 && gap < 0.6)) break;
      assert.ok(
        ++tries < 180,
        `Movement stuck at ${JSON.stringify(d.player)} heading ${JSON.stringify(waypoint)}`,
      );
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
