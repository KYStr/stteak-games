import test from "node:test";
import assert from "node:assert/strict";
import {
  ONWARD,
  onwardFact,
  onwardAnswer,
  createOnwardProgress,
  recordOnward,
  canonicalOnward,
} from "../../games/dust-redemption/onward-content.js";
import {
  createFieldState,
  FIELD_WORK,
  recordFieldStep,
  applyFieldChoice,
} from "../../games/dust-redemption/expansion-content.js";
import {
  canonicalFieldwork,
  normalizeProfile,
} from "../../games/dust-redemption/rules.js";
import { readFile } from "node:fs/promises";
function stream(id, choiceIndex = 0) {
  const f = ONWARD[id],
    choice = f.choices[choiceIndex];
  let state = createOnwardProgress();
  state.choice = choice.id;
  for (let i = 0; i < f.steps.length; i++) {
    const s = f.steps[i],
      target =
        f.sites.find(
          (p) =>
            p.id ===
            (id === "dry-mail" &&
            choiceIndex === 1 &&
            s.id === "parcel-02-receipt"
              ? "nw"
              : id === "long-night" && choiceIndex === 1 && s.at === "se"
                ? "sw"
                : id === "last-signal" && choiceIndex === 1
                  ? s.at === "se"
                    ? "ne"
                    : s.at === "ne"
                      ? "se"
                      : s.at
                  : s.at),
        )?.position ||
        (s.at === "worker-safe"
          ? [-13, 5]
          : s.at === "arrival"
            ? f.arrivalPosition
            : [0, 0]);
    const e = {
      id: s.id,
      sequence: i,
      kind: s.kind,
      siteId: s.at,
      player: [...target],
      target: [...target],
    };
    if (s.kind === "read")
      Object.assign(e, {
        fact: onwardFact(id, state, s),
        visible: true,
        normalDot: 0.9,
      });
    if (s.kind === "set") {
      const n = Number(s.id.match(/branch-(\d)/)?.[1]) - 1;
      e.value = onwardAnswer(id, state, s);
      e.physical = true;
      if (id === "last-signal") {
        const n = Number(s.id.match(/relay-(\d)/)[1]),
          tag = n === 2 ? "B" : (n === 1) === (choiceIndex === 0) ? "A" : "C";
        e.returnedChecksum = `17-${tag}${e.value + 1}`;
      }
      if (id === "broken-water" && s.id.endsWith("-test")) {
        e.valveClosed = true;
        e.pressure = [3, 2, 2][n];
      }
      if (s.id === "alternate-repair") e.bridgeAngle = 0;
    }
    if (s.cargo) Object.assign(e, { cargo: s.cargo, entity: s.cargo });
    if (s.kind === "give") {
      e.cargoPosition = [...target];
      if (id === "dry-mail") {
        e.quantity = 1;
        e.recipientId =
          s.cargo === "R-01"
            ? "clinic-front-desk"
            : choiceIndex === 1
              ? "household-relief-house"
              : "clinic-field-post";
      }
      if (id === "broken-water")
        e.quantity =
          choice.quantities[Number(s.id.match(/sample-(\d)/)[1]) - 1];
    }
    if (["escort", "hold"].includes(s.kind) || s.id === "party-recall")
      e.members = (
        f.party === "family"
          ? ["night-family-1", "night-family-2", "night-family-3"]
          : ["mail-porter"]
      ).map((id) => ({ id, position: [...target] }));
    if (
      s.id.startsWith("depot-") &&
      (s.kind === "give" || s.id === "depot-reconciliation")
    ) {
      e.stock = { initial: 24, issued: 0, cart: 24, sealed: 0 };
      e.reserve =
        choiceIndex === 0 ? { clinic: 16, road: 8 } : { clinic: 8, road: 16 };
    }
    if (s.id === "alternate-load-test") {
      e.bridgeAngle = 0;
      e.members = state.events.find((e) => e.kind === "hold").members;
    }
    if (s.id === "depot-a-seal" || s.id === "depot-b-seal")
      e.sealId = s.id === "depot-a-seal" ? "D-A-14" : "D-B-10";
    state = recordOnward(id, state, e);
  }
  return state;
}
for (const id of Object.keys(ONWARD))
  for (const choiceIndex of [0, 1])
    test(`${id} choice ${choiceIndex}: complete second phase has ordered independent receipts and never bypasses canonical fieldwork`, () => {
      const state = stream(id, choiceIndex);
      assert.equal(canonicalOnward(id, state).complete, true);
      const truncated = structuredClone(state);
      truncated.events.pop();
      assert.throws(() => canonicalOnward(id, truncated), /尚未全部完成/);
      const duplicate = structuredClone(state);
      duplicate.events.push(duplicate.events.at(-1));
      assert.throws(() => canonicalOnward(id, duplicate), /重複回條/);
      const field = createFieldState(id);
      field.onward = state;
      assert.throws(() => canonicalFieldwork(id, field), /尚未全部完成/);
      assert.equal(FIELD_WORK[id].tasks.length, 4);
    });
test("one missing parcel, absent original family member, stale relay acknowledgment and stock mismatch fail", () => {
  for (const [id, edit] of [
    [
      "dry-mail",
      (s) => {
        s.events.find((e) => e.id === "parcel-02-receipt").entity = "R-01";
      },
    ],
    [
      "long-night",
      (s) => {
        s.events.find((e) => e.id === "rendezvous-two").members.pop();
      },
    ],
    [
      "last-signal",
      (s) => {
        s.events.splice(3, 1);
      },
    ],
    [
      "dawn-pact",
      (s) => {
        s.events.find((e) => e.id === "depot-a-cart").stock.cart++;
      },
    ],
    [
      "broken-water",
      (s) => {
        s.events.find((e) => e.id === "sample-1-receipt").quantity++;
      },
    ],
  ]) {
    const state = stream(id);
    edit(state);
    assert.throws(() => canonicalOnward(id, state), id);
  }
});
test("legacy earned story, wallet, receipts and rewards survive expanded fieldwork version", async () => {
  const p = JSON.parse(
    await readFile(
      new URL("./fixtures/legacy-earned-mail.json", import.meta.url),
      "utf8",
    ),
  );
  const normalized = normalizeProfile(p);
  assert.ok(normalized);
  assert.deepEqual(normalized.history, p.history);
  assert.equal(normalized.wallet, p.wallet);
  assert.deepEqual(normalized.rewards, p.rewards);
});
test("the expanded depot audit uses the original cart's actual ledger, not another conserved pool", async () => {
  const profile = JSON.parse(
    await readFile(
      new URL("./fixtures/onward-earned-campaign.json", import.meta.url),
      "utf8",
    ),
  );
  assert.ok(
    normalizeProfile(profile),
    "actually earned six-chapter checkpoint remains valid",
  );
  const row = profile.history.at(-1);
  for (const event of row.onwardFlow.events) {
    if (!event.stock) continue;
    event.stock.cart--;
    event.stock.issued++;
    const main = Math.ceil((event.stock.cart * 2) / 3);
    event.reserve = { clinic: main, road: event.stock.cart - main };
  }
  assert.equal(
    canonicalOnward("dawn-pact", row.onwardFlow).complete,
    true,
    "the contradictory audit still conserves twenty-four internally",
  );
  assert.equal(
    normalizeProfile(profile),
    null,
    "cross-phase validation rejects the second pool while preserving the actual earned version",
  );
});

for (const id of Object.keys(ONWARD))
  test(`${id}: all four work items canonicalize only with current complete onward proof`, () => {
    let field = createFieldState(id);
    for (const task of FIELD_WORK[id].tasks) {
      const option = task.choices.find((c) => c.success);
      if (task.onward) field.onward = stream(id);
      for (const step of [
        ...task.physicalSteps,
        ...(option.requiredSteps || []),
      ])
        field = recordFieldStep(field, task.id, step.id).state;
      const result = applyFieldChoice(field, task.id, option.id);
      assert.equal(result.complete, true);
      field = result.state;
    }
    assert.equal(canonicalFieldwork(id, field).rows.length, 4);
    field.onward.version = 2;
    assert.throws(() => canonicalFieldwork(id, field), /證據版本不符/);
  });
