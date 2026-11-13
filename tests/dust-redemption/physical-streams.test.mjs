// Fixture events are captured from browser inputs. Replay tests do not claim to move real actors.
import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import {
  createWaterProgress,
  recordWaterEvent,
  canonicalWaterProgress,
} from "../../games/dust-redemption/water-flow.js";
import {
  createSignalProgress,
  recordSignalEvent,
  canonicalSignalProgress,
} from "../../games/dust-redemption/signal-flow.js";
import {
  createLedgerProgress,
  recordLedgerEvent,
  canonicalLedgerProgress,
} from "../../games/dust-redemption/ledger-flow.js";
import {
  createNightProgress,
  recordNightEvent,
  canonicalNightProgress,
} from "../../games/dust-redemption/night-flow.js";
import {
  createPactProgress,
  recordPactEvent,
  canonicalPactProgress,
} from "../../games/dust-redemption/pact-flow.js";
for (const [id, create, record, canonical] of [
  [
    "broken-water",
    createWaterProgress,
    recordWaterEvent,
    canonicalWaterProgress,
  ],
  [
    "last-signal",
    createSignalProgress,
    recordSignalEvent,
    canonicalSignalProgress,
  ],
  [
    "black-ledger",
    createLedgerProgress,
    recordLedgerEvent,
    canonicalLedgerProgress,
  ],
  ["long-night", createNightProgress, recordNightEvent, canonicalNightProgress],
  ["dawn-pact", createPactProgress, recordPactEvent, canonicalPactProgress],
])
  test(`${id}: successful physical event stream; duplicate IDs, premature receipt and truncated logs`, async () => {
    const fixtures = JSON.parse(
        await readFile(
          new URL("./fixtures/physical-streams.json", import.meta.url),
          "utf8",
        ),
      ),
      expected = fixtures[id];
    assert.ok(expected, `missing actual ${id} event fixture`);
    let state = create(id);
    const before = structuredClone(expected.progress);
    for (const event of expected.progress.events) {
      const next = record(id, state, event);
      state = next.state;
      const again = record(id, state, event);
      assert.deepEqual(again.state, state);
      assert.equal(again.duplicate, true);
    }
    assert.deepEqual(canonical(id, state), expected.result);
    assert.equal(canonical(id, state).complete, true);
    assert.deepEqual(expected.progress, before);
    assert.throws(() =>
      canonical(id, { ...state, events: state.events.slice(0, -1) }),
    );
    assert.throws(() =>
      canonical(id, {
        ...state,
        events: [state.events.at(-1), ...state.events.slice(0, -1)],
      }),
    );
    const conflict = { ...state.events[0], type: "unrecognized-event" };
    assert.throws(() => record(id, state, conflict));
  });
