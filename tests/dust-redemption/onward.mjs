import assert from "node:assert/strict";
import {
  ONWARD,
  onwardAnswer,
} from "../../games/dust-redemption/onward-content.js";
import { action, mode, snapshot, walk, waitForProgress } from "./driver.mjs";
async function closePanel(p) {
  const d = await snapshot(p);
  if (d.mode === "playing") return;
  for (const name of [
    "field-close",
    "mission-close",
    "water-close",
    "signal-close",
    "ledger-close",
    "night-close",
    "pact-close",
  ]) {
    if (await p.locator(`#overlay [data-action="${name}"]:visible`).count()) {
      await action(p, name);
      return;
    }
  }
  throw Error(
    `No close control in ${d.mode}: ${await p.locator("#overlay").innerText()}`,
  );
}
export async function completeOnward(
  p,
  choiceId,
  { onEscort, stopAfterProbe = false } = {},
) {
  let d = await snapshot(p);
  if (d.field.onward.complete) return;
  assert.equal(
    d.field.onward.ready,
    true,
    "base fieldwork precedes onward work",
  );
  assert.equal(
    d.secured,
    false,
    "onward receipts remain necessary for extraction",
  );
  if (d.mission !== "dawn-pact" && d.stats.kills === 0)
    assert.equal(
      d.passageAccepted,
      true,
      "the original accepted passage survives the mandatory onward work",
    );
  await closePanel(p);
  const f = ONWARD[d.mission];
  for (let index = 0; index < f.steps.length; index++) {
    d = await snapshot(p);
    if (d.field.onward.index > index) continue;
    const s = d.field.onward.step;
    assert.equal(d.field.onward.index, index);
    if (s.kind === "escort") {
      const members = d.field.onward.members;
      assert.equal(
        members.length,
        f.party === "family" ? 3 : 1,
        "all original members remain present",
      );
      const center = members[Math.floor(members.length / 2)].position;
      await walk(p, { x: center[0], z: center[1] }, 0.1);
      await p.keyboard.press("KeyE");
      await mode(p, "field");
      if (!d.field.onward.choice)
        await action(
          p,
          "field-onward-choice",
          `[data-choice="${choiceId || f.choices[0].id}"]`,
        );
      await action(p, "field-onward-act");
      await mode(p, "playing");
      if (onEscort) {
        await onEscort(p);
        if (stopAfterProbe) return;
      }
      const destination = (await snapshot(p)).field.onward.target;
      await walk(p, { x: destination[0], z: destination[1] }, 0.1);
      await waitForProgress(
        p,
        (state) =>
          state.field.onward.members.every(
            (m) =>
              Math.hypot(
                m.position[0] - destination[0],
                m.position[1] - destination[1],
              ) <
              (f.party === "worker"
                ? 1.4
                : s.at === "arrival"
                  ? f.arrivalRadius - 0.1
                  : 2.4),
          ),
        {
          label: `onward ${s.id}`,
          simulationBudget: 30,
          valid: (state) =>
            assert.deepEqual(
              state.field.onward.members.map((m) => m.id).sort(),
              members.map((m) => m.id).sort(),
              "same onward member identities",
            ),
          stallEligible: (state) =>
            state.field.onward.members.every(
              (m) =>
                Math.hypot(
                  m.position[0] - state.player.x,
                  m.position[1] - state.player.z,
                ) <= 6,
            ),
          progress: (state) =>
            state.field.onward.members.reduce(
              (n, m) =>
                n +
                Math.hypot(
                  m.position[0] - destination[0],
                  m.position[1] - destination[1],
                ),
              0,
            ),
        },
      );
    } else {
      const target = d.field.onward.target;
      const cart =
        s.at === "cart"
          ? d.colliders.find((b) => b.kind === "pact-cart")
          : null;
      // The original cart remains solid after braking. Reach its near side;
      // never ask the input driver to occupy the centre of that solid body.
      const approach = cart
        ? { x: cart.min.x - 0.5, z: target[1] }
        : { x: target[0], z: target[1] + 0.8 };
      await walk(p, approach, 0.05);
    }
    await p.keyboard.press("KeyE");
    await mode(p, "field");
    d = await snapshot(p);
    assert.equal(d.field.active, f.id, `onward target ${s.id}`);
    if (!d.field.onward.choice) {
      await action(
        p,
        "field-onward-choice",
        `[data-choice="${choiceId || f.choices[0].id}"]`,
      );
      d = await snapshot(p);
    }
    if (
      process.env.DUST_EVIDENCE_DIR &&
      (index === 0 || index === f.steps.length - 1)
    ) {
      const old = p.viewportSize();
      for (const viewport of [
        { width: 1280, height: 720 },
        { width: 1920, height: 1080 },
      ]) {
        await p.setViewportSize(viewport);
        const panel = await p.locator("#overlay .panel").boundingBox();
        assert.ok(
          panel &&
            panel.x >= 0 &&
            panel.y >= 0 &&
            panel.x + panel.width <= viewport.width + 1 &&
            panel.y + panel.height <= viewport.height + 1,
        );
        await p.screenshot({
          path: `${process.env.DUST_EVIDENCE_DIR}/onward-${d.mission}-${index}-${viewport.width}.png`,
        });
      }
      await p.setViewportSize(old);
    }
    if (s.kind === "give") {
      // Let the actual carried object settle inside the marked handoff zone.
      await action(p, "field-close");
      await waitForProgress(
        p,
        (state) => {
          const cargo = state.field.tasks.find((t) => t.id === f.id).cargo,
            target = state.field.onward.target;
          return (
            cargo && Math.hypot(cargo.x - target[0], cargo.z - target[1]) < 2.4
          );
        },
        { label: `same-object handoff ${s.id}`, simulationBudget: 15 },
      );
      await p.keyboard.press("KeyE");
      await mode(p, "field");
    }
    let value = "";
    if (s.kind === "set") {
      value = onwardAnswer(d.mission, d.field.state.onward, s);
      value = `[data-value="${value}"]`;
    }
    await action(p, "field-onward-act", value);
    let after = await snapshot(p);
    if (
      after.field.onward.index === index &&
      after.mode === "field" &&
      /實體障礙/.test(await p.locator("#overlay").innerText())
    ) {
      await action(p, "field-close");
      const target = after.field.onward.target;
      await walk(p, { x: target[0], z: target[1] - 0.8 }, 0.05);
      await p.keyboard.press("KeyE");
      await mode(p, "field");
      await action(p, "field-onward-act", value);
      after = await snapshot(p);
    }
    assert.equal(
      after.field.onward.index,
      index + 1,
      `${s.id}: ${await p.locator("#overlay").innerText()}`,
    );
    console.log(`Onward ${d.mission}: ${index + 1}/${f.steps.length} ${s.id}`);
  }
  d = await snapshot(p);
  assert.equal(d.field.onward.complete, true);
  assert.equal(d.field.state.completed.length, 4);
  assert.equal(
    new Set(d.field.onward.events.map((e) => e.id)).size,
    f.steps.length,
  );
}
