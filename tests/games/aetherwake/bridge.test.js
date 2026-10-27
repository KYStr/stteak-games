import test from "node:test";
import assert from "node:assert/strict";
import { HostBridge } from "../../../games/aetherwake/src/bridge.js";

// Minimal MessageEvent boundary: no document, canvas, browser or GPU. Assertions
// inspect externally visible messages and game callbacks, not bridge internals.
function harness(
  t,
  { standalone = false, session = "flight-session-42" } = {},
) {
  const originalWindow = Object.getOwnPropertyDescriptor(globalThis, "window");
  const originalLocation = Object.getOwnPropertyDescriptor(
    globalThis,
    "location",
  );
  const sent = [],
    commands = [],
    listeners = new Set();
  const origin = "https://stteak.example";
  const parent = {
    postMessage(data, targetOrigin) {
      sent.push({ data, targetOrigin });
    },
  };
  const window = {
    parent,
    addEventListener(type, callback) {
      if (type === "message") listeners.add(callback);
    },
    removeEventListener(type, callback) {
      if (type === "message") listeners.delete(callback);
    },
  };
  if (standalone) window.parent = window;
  Object.defineProperty(globalThis, "window", {
    value: window,
    configurable: true,
  });
  Object.defineProperty(globalThis, "location", {
    value: { search: session ? `?session=${session}` : "", origin },
    configurable: true,
  });
  let bridge;
  bridge = new HostBridge(
    Object.fromEntries(
      [
        ["host:start", "running"],
        ["host:pause", "paused"],
        ["host:resume", "running"],
        ["host:restart", "running"],
      ].map(([command, state]) => [
        command,
        () => {
          commands.push(command);
          bridge.state(state);
        },
      ]),
    ),
  );
  t.after(() => {
    bridge.dispose();
    if (originalWindow)
      Object.defineProperty(globalThis, "window", originalWindow);
    else delete globalThis.window;
    if (originalLocation)
      Object.defineProperty(globalThis, "location", originalLocation);
    else delete globalThis.location;
  });
  const envelope = (type, payload = {}) => ({
    protocol: "stteak-game",
    version: 1,
    sessionId: session,
    type,
    payload,
  });
  const dispatch = (data, overrides = {}) => {
    const event = { data, source: parent, origin, ...overrides };
    for (const listener of listeners) listener(event);
  };
  const init = () =>
    dispatch(
      envelope("host:init", {
        gameId: "aetherwake",
        title: "風起之境",
        image: `${origin}/cover.webp`,
        accent: "#80bfaf",
      }),
    );
  const states = () =>
    sent
      .filter((message) => message.data.type === "game:state")
      .map((message) => message.data.payload.state);
  return {
    bridge,
    sent,
    commands,
    origin,
    parent,
    envelope,
    dispatch,
    init,
    states,
  };
}

test("initial readiness waits for resources and targets the exact parent origin", (t) => {
  const h = harness(t);
  h.init();
  h.dispatch(h.envelope("host:start"));
  assert.deepEqual(h.sent, []);
  assert.deepEqual(h.commands, []);
  h.bridge.setReady();
  assert.deepEqual(
    h.sent.map((message) => message.data.type),
    ["game:ready", "game:state"],
  );
  assert.deepEqual(h.states(), ["ready"]);
  for (const message of h.sent) {
    assert.equal(message.targetOrigin, h.origin);
    assert.equal(message.data.sessionId, "flight-session-42");
    assert.equal(message.data.protocol, "stteak-game");
    assert.equal(message.data.version, 1);
  }
});

test("valid host lifecycle commands dispatch once and report resulting game states", (t) => {
  const h = harness(t);
  h.bridge.setReady();
  for (const type of [
    "host:start",
    "host:pause",
    "host:resume",
    "host:restart",
  ])
    h.dispatch(h.envelope(type));
  assert.deepEqual(h.commands, [
    "host:start",
    "host:pause",
    "host:resume",
    "host:restart",
  ]);
  assert.deepEqual(h.states(), [
    "ready",
    "running",
    "paused",
    "running",
    "running",
  ]);
});

test("repeated host:init during flight acknowledges readiness without falsely resetting running", (t) => {
  const h = harness(t);
  h.bridge.setReady();
  h.dispatch(h.envelope("host:start"));
  h.init();
  h.init();
  assert.deepEqual(
    h.commands,
    ["host:start"],
    "Retry handshake must not restart the game",
  );
  assert.equal(
    h.sent.filter((message) => message.data.type === "game:ready").length,
    3,
  );
  assert.deepEqual(h.states(), ["ready", "running", "running", "running"]);
});

test("repeated host:init while paused preserves paused until an explicit resume", (t) => {
  const h = harness(t);
  h.bridge.setReady();
  h.dispatch(h.envelope("host:start"));
  h.dispatch(h.envelope("host:pause"));
  h.init();
  h.init();
  assert.deepEqual(h.commands, ["host:start", "host:pause"]);
  assert.deepEqual(h.states(), [
    "ready",
    "running",
    "paused",
    "paused",
    "paused",
  ]);
  h.dispatch(h.envelope("host:resume"));
  assert.equal(h.states().at(-1), "running");
});

test("untrusted frame, origin, session, version, protocol and malformed payloads have no effect", (t) => {
  const h = harness(t);
  h.bridge.setReady();
  h.dispatch(h.envelope("host:start"));
  const initialMessages = h.sent.length;
  const validPause = h.envelope("host:pause");
  const probes = [
    ["other frame", validPause, { source: {} }],
    ["missing frame", validPause, { source: null }],
    ["different origin", validPause, { origin: "https://attacker.example" }],
    [
      "lookalike origin",
      validPause,
      { origin: `${h.origin}.attacker.example` },
    ],
    ["different scheme", validPause, { origin: "http://stteak.example" }],
    ["opaque origin", validPause, { origin: "null" }],
    ["stale session", { ...validPause, sessionId: "previous-session" }],
    ["missing session", { ...validPause, sessionId: undefined }],
    ["unsupported version", { ...validPause, version: 2 }],
    ["coercible version", { ...validPause, version: "1" }],
    ["wrong protocol", { ...validPause, protocol: "other-game" }],
    ["unknown type", { ...validPause, type: "host:delete-save" }],
    ["nonempty command payload", { ...validPause, payload: { restart: true } }],
    ["missing payload", { ...validPause, payload: undefined }],
    ["null payload", { ...validPause, payload: null }],
    ["array payload", { ...validPause, payload: [] }],
    ["text payload", { ...validPause, payload: "{}" }],
    ["array packet", [validPause]],
    ["null packet", null],
    ["text packet", JSON.stringify(validPause)],
  ];
  for (const [name, packet, overrides] of probes) {
    assert.doesNotThrow(() => h.dispatch(packet, overrides), name);
    assert.equal(h.sent.length, initialMessages, `${name} produced a response`);
    assert.deepEqual(
      h.commands,
      ["host:start"],
      `${name} invoked a game command`,
    );
  }
});

test("invalid initialization data cannot reannounce readiness or change current state", (t) => {
  const h = harness(t);
  h.bridge.setReady();
  h.dispatch(h.envelope("host:start"));
  const initialMessages = h.sent.length;
  for (const payload of [
    {},
    { gameId: "another-game", title: "Other" },
    { gameId: "aetherwake" },
    { gameId: "aetherwake", title: 42 },
  ])
    h.dispatch(h.envelope("host:init", payload));
  assert.equal(h.sent.length, initialMessages);
  assert.deepEqual(h.states(), ["ready", "running"]);
});

test("standalone games do not emit bridge messages or execute host commands", (t) => {
  const h = harness(t, { standalone: true });
  h.bridge.setReady();
  h.init();
  h.dispatch(h.envelope("host:start"));
  assert.deepEqual(h.sent, []);
  assert.deepEqual(h.commands, []);
});

test("missing embedded session disables host commands and disposal removes the message listener", (t) => {
  const h = harness(t, { session: "" });
  h.bridge.setReady();
  h.dispatch(h.envelope("host:start"));
  assert.deepEqual(h.sent, []);
  assert.deepEqual(h.commands, []);
  h.bridge.dispose();
  h.dispatch(h.envelope("host:pause"));
  assert.deepEqual(h.commands, []);
});

test("disposed embedded bridge no longer accepts an otherwise valid parent command", (t) => {
  const h = harness(t);
  h.bridge.setReady();
  const initialMessages = h.sent.length;
  h.bridge.dispose();
  h.dispatch(h.envelope("host:start"));
  assert.deepEqual(h.commands, []);
  assert.equal(h.sent.length, initialMessages);
});

test("empty non-record payloads and non-record envelopes cannot invoke a lifecycle command", (t) => {
  const h = harness(t);
  h.bridge.setReady();
  h.dispatch(h.envelope("host:start"));
  const initialMessages = h.sent.length;
  const constructors = [
    ["Date", () => new Date(0)],
    ["Map", () => new Map()],
    ["Set", () => new Set()],
    ["typed array", () => new Uint8Array(0)],
  ];
  for (const [name, create] of constructors) {
    const payload = create();
    assert.equal(
      Object.keys(payload).length,
      0,
      `${name} probes the empty-key loophole`,
    );
    h.dispatch(h.envelope("host:pause", payload));
    assert.deepEqual(
      h.commands,
      ["host:start"],
      `${name} payload must not pause the game`,
    );
    h.dispatch(Object.assign(create(), h.envelope("host:pause")));
    assert.deepEqual(
      h.commands,
      ["host:start"],
      `${name} envelope must not pause the game`,
    );
    assert.equal(
      h.sent.length,
      initialMessages,
      `${name} must not produce a state response`,
    );
  }
});

test("plain objects and null-prototype records remain valid envelopes and payloads", (t) => {
  const h = harness(t);
  h.bridge.setReady();
  h.dispatch(h.envelope("host:start"));
  h.dispatch(
    Object.assign(
      Object.create(null),
      h.envelope("host:pause", Object.create(null)),
    ),
  );
  h.dispatch(h.envelope("host:resume", Object.create(null)));
  h.dispatch(
    Object.assign(
      Object.create(null),
      h.envelope(
        "host:init",
        Object.assign(Object.create(null), {
          gameId: "aetherwake",
          title: "風起之境",
        }),
      ),
    ),
  );
  assert.deepEqual(h.commands, ["host:start", "host:pause", "host:resume"]);
  assert.deepEqual(h.states(), [
    "ready",
    "running",
    "paused",
    "running",
    "running",
  ]);
});
