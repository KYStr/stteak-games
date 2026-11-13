import test from "node:test";
import assert from "node:assert/strict";
import * as THREE from "../../public/games/dust-redemption/vendor/three.module.js";
import { FieldSystem } from "../../public/games/dust-redemption/field-system.js";
import { EscortRouting } from "../../games/dust-redemption/escort-routing.js";
import { cachedTacticalSegmentClear } from "../../games/dust-redemption/enemy-tactics.js";
test("ordered movement reuses its segment proof options and observes changed bounds", () => {
  const actor = {},
    from = { x: -2, z: 0 },
    to = { x: 2, z: 0 };
  const colliders = [
    { min: { x: -0.5, y: 0, z: 2 }, max: { x: 0.5, y: 2, z: 3 } },
  ];
  assert.equal(cachedTacticalSegmentClear(actor, from, to, colliders), true);
  const options = actor.segmentOptions;
  for (let i = 0; i < 240; i++) {
    to.x += 0.001;
    assert.equal(cachedTacticalSegmentClear(actor, from, to, colliders), true);
    assert.equal(actor.segmentOptions, options);
  }
  colliders[0].min.z = -1;
  assert.equal(cachedTacticalSegmentClear(actor, from, to, colliders), false);
});
test("night escort takes independent party snapshots on events, never unchanged frames", async () => {
  const { NightSystem } = await import(
    "../../public/games/dust-redemption/night-system.js"
  );
  const controller = Object.create(NightSystem.prototype);
  const escort = {},
    traversal = { task: escort, index: 3, paused: false };
  let reads = 0;
  Object.assign(controller, {
    escort,
    field: { traversal },
    status: { started: true, checkpoint: 2, paused: false },
    player: { position: { x: 0, z: 0 } },
    props: { readBridgeAngle: () => 1.05 },
    partySnapshot() {
      reads++;
      return { members: [{ id: "original", position: [3, 4] }] };
    },
    dispatch(type, event) {
      this.event = { type, ...event };
      this.status.checkpoint = event.index;
    },
  });
  for (let i = 0; i < 240; i++) controller.syncEscort();
  assert.equal(reads, 0);
  traversal.index = 4;
  controller.syncEscort();
  assert.equal(reads, 1);
  assert.equal(controller.event.type, "escort-checkpoint");
  assert.deepEqual(controller.event.snapshot.members[0].position, [3, 4]);
  for (let i = 0; i < 240; i++) controller.syncEscort();
  assert.equal(reads, 1);
});
function fixture() {
  const f = Object.create(FieldSystem.prototype);
  Object.assign(f, {
    updateState: { speedMultiplier: 1, objective: "" },
    updateLabelState: {},
    world: { colliders: [], animate() {} },
    state: { effects: [], progress: {} },
    tasks: [],
    group: new THREE.Group(),
    escortRouting: new EscortRouting(),
  });
  return f;
}
test("every steady carry update retains one return object; release clears prior objective", () => {
  const f = fixture(),
    object = new THREE.Group(),
    task = { id: "carry", cargo: object, carrying: true, stepCache: [] };
  f.tasks = [task];
  const player = new THREE.Vector3();
  const result = f.update(0.02, player);
  for (let i = 0; i < 240; i++) {
    player.x += 0.001;
    assert.equal(f.update(0.02, player), result);
  }
  assert.equal(result.speedMultiplier, 0.8);
  assert.ok(result.objective);
  task.carrying = false;
  assert.equal(f.update(0.02, player), result);
  assert.equal(result.objective, "");
});
test("active traversal returns the same record and caches unchanged rounded guidance", () => {
  const f = fixture(),
    object = new THREE.Group(),
    task = {
      id: "route",
      cargo: object,
      members: [],
      wheels: [],
      carrying: true,
    };
  f.tasks = [task];
  f.traversal = {
    task,
    type: "carry",
    carrying: true,
    route: [[10, 10]],
    index: 0,
    lastPlayer: new THREE.Vector3(),
    distanceTravelled: 0,
    offset: new THREE.Vector3(),
    step: { kind: "carry-route" },
  };
  const player = new THREE.Vector3(),
    result = f.update(0.02, player),
    label = result.objective;
  for (let i = 0; i < 240; i++) {
    assert.equal(f.update(0.02, player), result);
    assert.equal(result.objective, label);
  }
});
test("escort workspace and routes retain identity; movable collisions invalidate paths", () => {
  const boxes = [{ min: { x: -1, z: -1 }, max: { x: 1, z: 1 } }],
    routing = new EscortRouting(boxes),
    member = { position: { x: -3, z: 0 } },
    target = { x: 3, z: 0 };
  const points = routing.prepare(member).points,
    costs = routing.costs,
    first = routing.target(member, target, boxes, 1);
  assert.ok(first);
  const plans = routing.recalculations;
  for (let i = 0; i < 240; i++) routing.target(member, target, boxes, 1);
  assert.equal(routing.costs, costs);
  assert.equal(member.fieldRoute.points, points);
  assert.equal(routing.recalculations, plans);
  boxes[0].min.z = -2;
  routing.target(member, target, boxes, 1);
  assert.equal(routing.recalculations, plans + 1);
});

test("three original followers share a reusable update result across 240 active updates", () => {
  const f = fixture();
  const members = [0, 1, 2].map((i) => {
    const object = new THREE.Group();
    object.position.x = (i - 1) * 0.3;
    return { object, position: object.position };
  });
  for (const m of members) f.escortRouting.prepare(m);
  const task = { id: "escort", members };
  f.tasks = [task];
  f.traversal = {
    task,
    type: "escort",
    carrying: false,
    route: [[10, 10]],
    index: 0,
    lastPlayer: new THREE.Vector3(),
    distanceTravelled: 0,
    step: { kind: "escort-route" },
  };
  const result = f.update(0.01, new THREE.Vector3());
  for (let i = 0; i < 240; i++)
    assert.equal(f.update(0.01, new THREE.Vector3()), result);
  assert.equal(f.escortRouting.recalculations, 0);
});

test("the frame completing a traversal retains the record and clears its old objective", () => {
  const f = fixture(),
    node = new THREE.Group(),
    task = {
      id: "checkpoint",
      members: [],
      reached: new Set(),
      parts: { lever: node },
    };
  f.focus = () => {};
  f.renderPanel = () => {};
  f.tasks = [task];
  f.traversal = {
    task,
    type: "checkpoint",
    route: [[0, 0]],
    index: 0,
    lastPlayer: new THREE.Vector3(),
    distanceTravelled: 0,
    step: { id: "contact", kind: "checkpoint-operate", target: "lever" },
  };
  const record = f.updateState;
  record.objective = "old task";
  assert.equal(f.update(0.01, new THREE.Vector3()), record);
  assert.equal(record.objective, "");
  assert.equal(f.traversal, null);
});

test("actual feed reader reuses optional output while public event snapshots remain independent", async () => {
  const { readFile } = await import("node:fs/promises");
  const source = await readFile(
    new URL("../../games/dust-redemption/pact-props.js", import.meta.url),
    "utf8",
  );
  const from = source.indexOf("function readFeedSnapshot("),
    to = source.indexOf("  function setFeed(", from);
  const feed = {
    parts: {
      "military-feed": new THREE.Group(),
      "civilian-feed": new THREE.Group(),
    },
  };
  feed.parts["civilian-feed"].position.x = 1;
  const contacts = {
    "military-feed": new THREE.Object3D(),
    "civilian-feed": new THREE.Object3D(),
  };
  contacts["military-feed"].position.y = 0.3;
  contacts["civilian-feed"].position.set(1, 0.3, 0);
  const lamps = {
    "military-feed": { visible: true },
    "civilian-feed": { visible: true },
  };
  const read = new Function(
    "alive",
    "feed",
    "feedReadTip",
    "feedReadContact",
    "contactNodes",
    "visible",
    "powerLamps",
    source.slice(from, to) + ";return readFeedSnapshot;",
  )(
    () => {},
    feed,
    new THREE.Vector3(),
    new THREE.Vector3(),
    contacts,
    (node) => node.visible,
    lamps,
  );
  const out = {},
    event = read();
  assert.equal(event.militaryPowered, true);
  for (let i = 0; i < 240; i++) assert.equal(read(out), out);
  feed.parts["military-feed"].rotation.z = 1;
  assert.equal(read(out), out);
  assert.equal(out.militaryPowered, false);
  assert.equal(out.civilianPowered, true);
  assert.equal(event.militaryPowered, true);
});
