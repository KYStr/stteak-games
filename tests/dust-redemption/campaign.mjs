import assert from "node:assert/strict";
import { walk, snapshot, action, mode } from "./driver.mjs";
export async function completeMail(
  p,
  { combat = false, route = "siding" } = {},
) {
  await walk(p, { x: -16, z: 8 });
  await p.keyboard.press("KeyE");
  await mode(p, "clue");
  await action(p, "back-playing");
  await walk(p, { x: -13, z: 11 });
  await p.keyboard.press("KeyE");
  await mode(p, "field");
  await action(p, "field-adjust", '[data-step="show-back"][data-delta="1"]');
  await action(p, "field-adjust", '[data-step="show-back"][data-delta="1"]');
  await action(p, "field-focus", '[data-step="inspect-seal"]');
  await action(p, "field-inspect", '[data-step="inspect-seal"]');
  await captureWork(p, "medicine-seal");
  await action(p, "mission-observe", '[data-source="clinic-receiving-board"]');
  await action(p, "mission-verify", '[data-reason="cross-source-match"]');
  await action(p, "mission-allocate", '[data-choice="mutual-aid"]');
  await action(p, "field-choice", '[data-choice="three-notches"]');
  assert.deepEqual((await snapshot(p)).field.state.completed, ["mail-seal"]);
  await action(p, "field-close");
  console.log("Mail: medicine verified");
  const guard = (await snapshot(p)).enemies.find((e) => e.id === "mail-1");
  await walk(p, { x: guard.x, z: guard.z + 1.6 }, 0.3);
  await p.keyboard.press("KeyE");
  await action(p, "mission-accept");
  assert.equal((await snapshot(p)).missionFlow.status.handoffAccepted, true);
  console.log("Mail: handoff negotiated");
  await walk(p, { x: 16, z: 4 });
  await p.keyboard.press("KeyE");
  await action(p, "back-playing");
  await walk(p, { x: 6, z: 5 });
  await p.keyboard.press("KeyE");
  if ((await snapshot(p)).mode === "parley") {
    await action(p, "mission-relay");
    await action(p, "mission-close");
    await walk(p, { x: 7.5, z: 5.8 }, 0.2);
    await p.keyboard.press("KeyE");
  }
  await action(p, "field-focus", '[data-step="inspect-track"]');
  await action(p, "field-inspect", '[data-step="inspect-track"]');
  await action(
    p,
    "field-adjust",
    `[data-step="throw-switch"][data-delta="${route === "siding" ? -1 : 1}"]`,
  );
  await action(p, "field-choice", `[data-choice="${route}"]`);
  if (!(await snapshot(p)).missionFlow.status.promiseRelayed)
    await action(p, "mission-relay");
  await action(p, "field-close");
  console.log("Mail: siding set, truce relayed");
  if (combat) await defeatGuards(p);
  await walk(p, { x: -15, z: -8 });
  await p.keyboard.press("KeyE");
  await action(p, "back-playing");
  await walk(p, { x: -13, z: 11 });
  await p.keyboard.press("KeyE");
  await action(p, "field-step", '[data-step="take-crate"]');
  const traversal = (await snapshot(p)).field.traversal;
  assert.equal(traversal.type, "carry");
  for (let i = 0; i < traversal.route.length; i++) {
    const [x, z] = traversal.route[i],
      offset = traversal.offset || { x: 0, z: 0 };
    await walk(p, { x: x - offset.x, z: z - offset.z }, 0.2);
    await p.waitForFunction(
      (index) => {
        const t = dustDiagnostics().field.traversal;
        return !t || t.index > index;
      },
      i,
      { timeout: 15000 },
    );
  }
  console.log("Mail: same crate carried through the open gate");
  await p.keyboard.press("KeyE");
  await action(p, "field-step", '[data-step="place-crate"]');
  await action(p, "field-choice", '[data-choice="secure-pallet"]');
  await action(p, "field-close");
  await p.keyboard.press("KeyE");
  await action(p, "mission-confirm");
  assert.equal((await snapshot(p)).secured, true);
  console.log("Mail: receipt secured");
  await walk(p, { x: -12, z: 17 });
  await p.keyboard.press("KeyE");
  await mode(p, "result");
}
import { MISSIONS } from "../../games/dust-redemption/content.js";
import { WATER_FLOW } from "../../games/dust-redemption/water-flow.js";
import { SIGNAL_FLOW } from "../../games/dust-redemption/signal-flow.js";
import { LEDGER_FLOW } from "../../games/dust-redemption/ledger-flow.js";
import { NIGHT_FLOW } from "../../games/dust-redemption/night-flow.js";
import { PACT_FLOW } from "../../games/dust-redemption/pact-flow.js";
export async function clues(p) {
  const d = await snapshot(p),
    m = MISSIONS.find((m) => m.id === d.mission);
  for (const c of m.clues) {
    if ((await snapshot(p)).clues.includes(c.id)) continue;
    await walk(p, { x: c.position[0], z: c.position[1] });
    await p.keyboard.press("KeyE");
    await mode(p, "clue");
    console.log("Evidence", c.id);
    await action(p, "back-playing");
  }
}
async function go(p, position, r = 0.4) {
  await walk(
    p,
    Array.isArray(position) ? { x: position[0], z: position[1] } : position,
    r,
  );
}
async function open(p, id, position, approachRadius = position ? 0.4 : 1.8) {
  console.log("Work", id);
  let d = await snapshot(p);
  const task = d.field.tasks.find((t) => t.id === id);
  await go(p, position || task.position, approachRadius);
  await p.keyboard.press("KeyE");
  await mode(p, "field");
  assert.equal((await snapshot(p)).field.active, id);
  await captureWork(p, id);
}
async function inspect(p, step) {
  await action(p, "field-focus", `[data-step="${step}"]`);
  await action(p, "field-inspect", `[data-step="${step}"]`);
}
async function adjust(p, step, n = 1) {
  for (let i = 0; i < Math.abs(n); i++)
    await action(
      p,
      "field-adjust",
      `[data-step="${step}"][data-delta="${Math.sign(n)}"]`,
    );
}
async function choose(p, id) {
  console.log("Choice", id);
  await action(p, "field-choice", `[data-choice="${id}"]`);
}
async function done(p, id) {
  assert.ok(
    (await snapshot(p)).field.state.completed.includes(id),
    `${id} failed: ${await p.locator("#overlay").innerText()}`,
  );
}
async function close(p) {
  await action(p, "field-close");
  await mode(p, "playing");
}
async function extract(p) {
  const d = await snapshot(p),
    m = MISSIONS.find((m) => m.id === d.mission);
  assert.equal(d.secured, true);
  await go(p, m.exit);
  await p.keyboard.press("KeyE");
  if (m.choice) {
    await mode(p, "extraction");
    await action(p, "commit", `[data-id="${m.choice.options[0].id}"]`);
  }
  await mode(p, "result");
}
export async function completeWater(p, route = "retain-bypass") {
  await clues(p);
  await open(p, "water-bypass");
  await inspect(p, "trace-pipe");
  await adjust(p, "turn-bypass", 1);
  await action(p, "water-pressure");
  await choose(p, "bypass-downstream");
  await done(p, "water-bypass");
  await close(p);
  await open(p, "water-allocation");
  await adjust(p, "set-clinic", 2);
  await adjust(p, "set-homes", 2);
  await adjust(p, "set-mine", 1);
  await choose(p, "two-two-one");
  await done(p, "water-allocation");
  await action(p, "water-routing", `[data-choice="${route}"]`);
  const f = WATER_FLOW["broken-water"],
    choice = f.decision.choices[route];
  // An incorrect live wheel invalidates measurement and can be corrected without consuming water.
  await action(p, "water-diverter", `[data-value="${choice.diverter}"]`);
  await action(p, "water-wheel", '[data-valve=mine][data-delta="-1"]');
  await action(p, "water-measure");
  assert.equal((await snapshot(p)).waterFlow.status.flowValid, false);
  await action(p, "water-wheel", '[data-valve=mine][data-delta="1"]');
  await action(p, "water-measure");
  assert.equal((await snapshot(p)).waterFlow.status.flowValid, true);
  await action(p, "water-guarantee");
  await close(p);
  await open(p, "water-reserve");
  await inspect(p, "inspect-reserve");
  await adjust(p, "turn-spout", -1);
  await choose(p, "keep-first-aid");
  await done(p, "water-reserve");
  await close(p);
  await go(p, f.recipients[choice.recipientId].position);
  await p.keyboard.press("KeyE");
  await action(p, "water-confirm");
  assert.ok((await snapshot(p)).waterFlow.status.receipt);
  await extract(p);
}
export async function completeSignal(p, channel = "ceasefire-line") {
  await clues(p);
  await open(p, "signal-earth");
  assert.match(await p.locator(".field-value").first().innerText(), /電池端子/);
  await action(p, "field-seat", "[data-step=earth-connected]");
  assert.equal((await snapshot(p)).field.state.completed.length, 0);
  await adjust(p, "earth-connected", 1);
  assert.match(await p.locator(".field-value").first().innerText(), /接地端子/);
  await action(p, "field-seat", "[data-step=earth-connected]");
  await adjust(p, "power-on", 1);
  await action(p, "signal-power");
  await choose(p, "earth-then-power");
  await done(p, "signal-earth");
  await close(p);
  await open(p, "signal-patch", { x: 11, z: 6.6 });
  await inspect(p, "inspect-full-roster");
  await close(p);
  await open(p, "signal-patch", { x: 12.7, z: 5.8 });
  await inspect(p, "inspect-receiver-code");
  await choose(p, "verify-complete-roster");
  await done(p, "signal-patch");
  await close(p);
  await go(p, { x: 11, z: 6.5 });
  await p.keyboard.press("KeyE");
  await action(p, "signal-channel", `[data-choice="${channel}"]`);
  if (channel === "ceasefire-line") {
    await action(p, "signal-send", "[data-content=standdown-order]");
    await action(p, "signal-pickup");
    await action(p, "signal-submit-relay");
    await done(p, "signal-relay");
    await close(p);
    assert.equal((await snapshot(p)).signalFlow.status.pouch.carrier, "player");
    await go(p, [11, 8]);
    await p.keyboard.press("KeyE");
    await action(p, "signal-drop");
    await action(p, "signal-close");
    assert.equal((await snapshot(p)).signalFlow.status.pouch.carrier, null);
    await p.keyboard.press("KeyE");
    await action(p, "signal-pickup");
    await action(p, "signal-close");
    assert.equal((await snapshot(p)).signalFlow.status.pouch.carrier, "player");
  } else {
    await action(p, "signal-branch", "[data-connected=false]");
    await close(p);
    await go(p, [-12, -2.7], .1);
    await p.keyboard.press("KeyE");
    await action(
      p,
      "signal-connect",
      "[data-endpoint=relay-south][data-connected=true]",
    );
    await action(p, "signal-send", "[data-content=full-roster]");
    const original = (await snapshot(p)).signalFlow.status.transmission
      .messageId;
    await action(
      p,
      "signal-connect",
      "[data-endpoint=relay-south][data-connected=false]",
    );
    assert.equal((await snapshot(p)).signalFlow.status.transmission, null);
    assert.equal((await snapshot(p)).signalFlow.reply, null);
    await action(
      p,
      "signal-connect",
      "[data-endpoint=relay-south][data-connected=true]",
    );
    await action(p, "signal-send", "[data-content=full-roster]");
    assert.notEqual(
      (await snapshot(p)).signalFlow.status.transmission.messageId,
      original,
    );
    await action(p, "signal-submit-relay");
    await action(p, "signal-close");
  }
  await go(p, [-10, 15.5]);
  if (channel === "ceasefire-line")
    await p.waitForFunction(() => {
      const d = dustDiagnostics(),
        b = d.signalFlow.pouch.position,
        r = d.signalFlow.receiver.position;
      return Math.hypot(b[0] - r[0], b[2] - r[1]) < 1.78;
    });
  await p.keyboard.press("KeyE");
  await action(p, "signal-reply");
  await action(p, "signal-confirm");
  assert.ok((await snapshot(p)).signalFlow.status.receipt);
  await extract(p);
}
export async function completeLedger(p, custody = "sealed-courier") {
  await clues(p);
  await open(p, "ledger-carriage", { x: -14, z: 3.6 });
  await adjust(p, "read-tag-back", 2);
  await adjust(p, "align-serials", 1);
  await action(p, "field-seat", "[data-step=align-serials]");
  await choose(p, "a17-314");
  await done(p, "ledger-carriage");
  await action(p, "ledger-original");
  assert.equal(
    (await snapshot(p)).ledgerFlow.status.original.carrier,
    "player-satchel",
  );
  await close(p);
  await open(p, "ledger-carbon", { x: 6, z: 15.6 });
  await adjust(p, "align-holes", 1);
  await action(p, "field-seat", "[data-step=align-holes]");
  await adjust(p, "rake-light", 1);
  await choose(p, "manager-impression");
  await done(p, "ledger-carbon");
  await close(p);
  await open(p, "ledger-copy", { x: 11, z: -5.7 }, .1);
  await action(p, "ledger-custody", `[data-choice="${custody}"]`);
  await adjust(p, "press-copy", 1);
  await action(p, "field-step", "[data-step=collect-copy]");
  assert.equal((await snapshot(p)).player.handsOccupied, true);
  await close(p);
  const f = LEDGER_FLOW["black-ledger"];
  const dest = custody === "sealed-courier" ? f.courier : f.notice;
  await go(p, { x: dest.position[0], z: dest.position[1] + 1.3 });
  await p.waitForTimeout(700);
  await p.keyboard.press("KeyE");
  await action(p, "ledger-deliver");
  await done(p, "ledger-copy");
  await close(p);
  const receiver = custody === "sealed-courier" ? f.courier : f.notice.witness;
  await go(p, { x: receiver.position[0], z: receiver.position[1] + 1.3 });
  await p.keyboard.press("KeyE");
  await action(p, "ledger-clearance");
  await action(p, "ledger-confirm");
  assert.ok((await snapshot(p)).ledgerFlow.status.receipt);
  await extract(p);
}
export async function completeNight(p, route = "west-ford") {
  await clues(p);
  await open(p, "night-route-plan");
  await inspect(p, "read-water");
  await adjust(p, "point-route", route === "west-ford" ? -1 : 1);
  await choose(p, route);
  await done(p, "night-route-plan");
  await close(p);
  await open(p, "night-brace", { x: 5, z: 6.3 });
  await action(p, "field-seat", "[data-step=seat-brace]");
  assert.ok(
    !(await snapshot(p)).field.state.progress["night-brace"]?.includes(
      "seat-brace",
    ),
  );
  await adjust(p, "seat-brace", 1);
  await action(p, "field-seat", "[data-step=seat-brace]");
  await action(p, "field-step", "[data-step=test-load]");
  await mode(p, "playing");
  await go(p, [5, 5], 0.1);
  await mode(p, "field");
  await choose(p, "diagonal-brace");
  await done(p, "night-brace");
  await close(p);
  await go(p, [12, -4]);
  await p.keyboard.press("KeyE");
  await action(p, "night-papers", "[data-reason=expired-order-and-civilians]");
  await action(p, "night-close");
  await open(p, "night-escort", { x: 13, z: -7.8 });
  await action(p, "field-step", "[data-step=group-follows]");
  for (
    let i = 0;
    i < NIGHT_FLOW["long-night"].routes[route].waypoints.length;
    i++
  ) {
    const point = NIGHT_FLOW["long-night"].routes[route].waypoints[i];
    await go(p, point, 1.5);
    await p.waitForFunction(
      (index) => {
        const t = dustDiagnostics().field.traversal;
        return !t || t.index > index;
      },
      i,
      { timeout: 90000 },
    );
    console.log(`Escort checkpoint ${i + 1}`);
    if (i === 1) {
      await p.keyboard.press("Escape");
      await mode(p, "paused");
      await action(p, "resume");
      assert.equal((await snapshot(p)).nightFlow.party.members.length, 3);
      await p.keyboard.press("KeyE");
      assert.equal((await snapshot(p)).field.traversal.paused, true);
      await p.waitForFunction(
        () => dustDiagnostics().nightFlow.status.paused === true,
      );
      await p.keyboard.press("KeyE");
      await action(p, "night-follow");
      assert.equal((await snapshot(p)).field.traversal.paused, false);
      await p.waitForFunction(
        () => dustDiagnostics().nightFlow.status.paused === false,
      );
      assert.equal((await snapshot(p)).nightFlow.party.members.length, 3);
    }
  }
  await mode(p, "field");
  await action(p, "field-step", "[data-step=group-safe]");
  await choose(p, "count-three");
  await done(p, "night-escort");
  await close(p);
  await p.keyboard.press("KeyE");
  await action(p, "night-receipt");
  assert.ok((await snapshot(p)).nightFlow.status.receipt);
  await extract(p);
}
export async function completePact(p, siding = "negotiation-siding") {
  await clues(p);
  await open(p, "pact-feed", { x: -12, z: 5.6 });
  await inspect(p, "trace-feeds");
  await adjust(p, "disconnect-military", -1);
  await choose(p, "military-only");
  await done(p, "pact-feed");
  await close(p);
  await open(p, "pact-lights", { x: -5, z: 13.6 });
  await adjust(p, "inspect-battery", 1);
  if (siding === "negotiation-siding") {
    await choose(p, "darken-approach");
    await action(p, "field-step", "[data-step=remove-battery]");
    await choose(p, "darken-approach");
  } else {
    await choose(p, "preserve-battery");
    await adjust(p, "seal-battery", -1);
    await choose(p, "preserve-battery");
  }
  await done(p, "pact-lights");
  await close(p);
  await open(p, "pact-cart", { x: 11, z: 14.4 });
  await action(p, "pact-siding", `[data-choice="${siding}"]`);
  await adjust(p, "release-brake", -1);
  await action(p, "field-step", "[data-step=push-cart]");
  assert.equal((await snapshot(p)).field.traversal, null);
  assert.match(await p.locator("#overlay").innerText(), /後退半步/);
  await close(p);
  await open(p, "pact-cart", { x: 11, z: 15.25 }, 0.05);
  const grip = await snapshot(p);
  await action(p, "field-step", "[data-step=push-cart]");
  const attached = await snapshot(p);
  assert.equal(attached.field.traversal?.type, "push");
  assert.ok(
    Math.abs(
      attached.field.traversal.offset.x -
        (grip.pactFlow.cart.worldPosition[0] - grip.player.x),
    ) < 1e-6,
  );
  assert.ok(
    Math.abs(
      attached.field.traversal.offset.z -
        (grip.pactFlow.cart.worldPosition[2] - grip.player.z),
    ) < 1e-6,
  );
  await p.keyboard.press("KeyF");
  const route = PACT_FLOW["dawn-pact"].bays[siding].route;
  for (let i = 0; i < route.length; i++) {
    const d = await snapshot(p),
      offset = d.field.traversal?.offset || { x: 0, z: 0 };
    await go(p, { x: route[i][0] - offset.x, z: route[i][1] - offset.z }, 0.1);
    await p.waitForFunction(
      (index) => {
        const t = dustDiagnostics().field.traversal;
        return !t || t.index > index;
      },
      i,
      { timeout: 30000 },
    );
    console.log(`Cart checkpoint ${i + 1}`);
    if (i === 1) {
      const beforeRelease = await snapshot(p);
      await p.keyboard.press("KeyE");
      assert.equal((await snapshot(p)).field.traversal.paused, true);
      await p.keyboard.press("KeyE");
      const reacquired = await snapshot(p);
      assert.equal(reacquired.field.traversal.paused, false);
      assert.equal(
        reacquired.field.traversal.index,
        beforeRelease.field.traversal.index,
      );
      assert.equal(
        reacquired.pactFlow.cart.entityId,
        beforeRelease.pactFlow.cart.entityId,
      );
    }
  }
  await mode(p, "field");
  await action(p, "field-step", "[data-step=park-cart]");
  await choose(p, "brake-in-siding");
  await done(p, "pact-cart");
  await close(p);
  const stock = (await snapshot(p)).pactFlow.status.cart.stock;
  assert.equal(stock.available + stock.issued + stock.cover, 24);
  await go(p, [7.5, 3.4]);
  await p.keyboard.press("KeyE");
  await action(p, "pact-clearance", "[data-reason=safe-departure-and-hearing]");
  await action(p, "pact-handoff");
  assert.ok((await snapshot(p)).pactFlow.status.receipt);
  await extract(p);
}
export async function prematureExtraction(p) {
  await p.keyboard.press("KeyE");
  const d = await snapshot(p);
  if(d.mission === "long-night"){
    // The arrival desk shares this exit and intentionally gets first refusal.
    await mode(p, "parley");await action(p, "night-receipt");
    assert.match(await p.locator("#overlay").innerText(), /先完成原三工作/);
    assert.equal((await snapshot(p)).nightFlow.status.receipt, null);
    await action(p, "night-close");
  }else{
    await mode(p, "withdraw");
    assert.match(await p.locator("#overlay").innerText(), /目標尚未完成/);
    await action(p, "back-playing");
  }
  await mode(p, "playing");assert.equal((await snapshot(p)).secured, false);
}

export const campaignFunctions = [
  completeMail,
  completeWater,
  completeSignal,
  completeLedger,
  completeNight,
  completePact,
];

export async function defeatGuards(p) {
  for (const id of (await snapshot(p)).enemies.map((e) => e.id)) {
    let d = await snapshot(p),
      enemy = d.enemies.find((e) => e.id === id);
    if (enemy.hp <= 0) continue;
    await walk(p, { x: enemy.x, z: enemy.z + 3 }, 0.5);
    for (let attempt = 0; attempt < 35; attempt++) {
      d = await snapshot(p);
      assert.equal(d.mode, "playing");
      enemy = d.enemies.find((e) => e.id === id);
      if (enemy.hp <= 0) break;
      if (d.player.hp < 60) await p.keyboard.press("KeyF");
      if (d.player.ammo < 4) {
        await p.keyboard.press("KeyR");
        await p.waitForFunction(
          () => dustDiagnostics().player.reload <= 0,
          null,
          { timeout: 15000 },
        );
      }
      await p.mouse.move(enemy.screen.x, enemy.screen.y);
      await p.mouse.down();
      await p.waitForTimeout(500);
      await p.mouse.up();
      assert.ok(attempt < 34, `Could not physically defeat ${id}`);
    }
  }
  assert.ok((await snapshot(p)).enemies.every((e) => e.hp <= 0));
}

async function captureWork(p, label) {
  const dir = process.env.DUST_EVIDENCE_DIR;
  if (!dir) return;
  const original = p.viewportSize();
  for (const viewport of [
    { width: 1280, height: 720 },
    { width: 1920, height: 1080 },
  ]) {
    await p.setViewportSize(viewport);
    await p.waitForTimeout(150);
    const box = await p.locator(".panel").boundingBox();
    assert.ok(
      box.x >= 0 &&
        box.x + box.width <= viewport.width + 1 &&
        box.height <= viewport.height + 1,
    );
    assert.ok(
      (await snapshot(p)).render.bufferWidth >= Math.min(viewport.width, 1280),
    );
    await p.screenshot({ path: `${dir}/${label}-${viewport.width}.png` });
  }
  await p.setViewportSize(original);
  if (label === "signal-earth") {
    const before = await p.locator(".panel").evaluate((n) => {
      n.scrollTop = Math.min(100, n.scrollHeight - n.clientHeight);
      return n.scrollTop;
    });
    await p.evaluate(() => window.dispatchEvent(new Event("blur")));
    await mode(p, "paused");
    await p.evaluate(() => window.dispatchEvent(new Event("focus")));
    await action(p, "help");
    await p.keyboard.press("Escape");
    await mode(p, "paused");
    await action(p, "settings");
    await p.keyboard.press("Escape");
    await mode(p, "paused");
    assert.equal((await snapshot(p)).audio.active, false);
    await action(p, "resume");
    await mode(p, "field");
    assert.equal(
      await p.locator(".panel").evaluate((n) => n.scrollTop),
      before,
    );
  }
}
