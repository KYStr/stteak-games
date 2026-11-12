import test from "node:test";
import assert from "node:assert/strict";
import * as THREE from "../../games/dust-redemption/node_modules/three/build/three.module.js";
import { createSignalProps } from "../../games/dust-redemption/signal-props.js";
import { SIGNAL_FLOW } from "../../games/dust-redemption/signal-flow.js";
const f = SIGNAL_FLOW["last-signal"];
function fixture() {
  const receiverObject = new THREE.Group();
  const receiver = {
    name: "npc-sol",
    object: receiverObject,
    position: receiverObject.position,
  };
  const world = {
    level: new THREE.Group(),
    actors: [receiver],
    solids: [],
    solidBoxes: new WeakMap(),
    colliders: [],
    solid(node, box) {
      this.solids.push(node);
      this.solidBoxes.set(node, box);
    },
    disposeObjects() {},
  };
  const relay = { parts: {} },
    plug = new THREE.Object3D(),
    power = new THREE.Object3D();
  plug.userData.fieldControl = {
    slots: [0, 1, 2].map((i) => ({
      id: String(i),
      node: new THREE.Object3D(),
    })),
  };
  const originals = new Map();
  for (const [id, endpoint] of Object.entries(f.endpoints)) {
    const root = new THREE.Group(),
      housing = new THREE.Mesh(
        new THREE.BoxGeometry(0.8, 0.5, 0.4),
        new THREE.MeshBasicMaterial(),
      ),
      knife = new THREE.Mesh(
        new THREE.BoxGeometry(0.1, 0.35, 0.07),
        new THREE.MeshBasicMaterial(),
      );
    root.position.set(endpoint.position[0], 1, endpoint.position[1]);
    knife.name = id + "-knife";
    root.userData.dynamicParts = { "knife-switch": { node: knife.name } };
    root.add(housing, knife);
    world.level.add(root);
    relay.parts[id] = root;
    const original = { id: id + "-original" };
    world.solid(housing, original);
    originals.set(id, original);
  }
  const props = createSignalProps(THREE, world, f);
  props.bindField({
    earth: { parts: { "earth-plug": plug, "power-lever": power } },
    patch: { object: new THREE.Group() },
    relay,
  });
  return { world, props, originals };
}
test("endpoint whitelist contains actual borrowed mesh records and own dispatch contact only", () => {
  const { world, props, originals } = fixture();
  const south = props.endpointInteractionColliders("relay-south"),
    west = props.endpointInteractionColliders("relay-west");
  assert.ok(Object.isFrozen(south));
  assert.equal(new Set(south).size, south.length);
  assert.ok(south.includes(originals.get("relay-south")));
  assert.ok(south.some((b) => b.id === "relay-south-dispatch-contact"));
  assert.ok(!south.includes(undefined));
  assert.ok(!south.includes(originals.get("relay-west")));
  assert.ok(!west.some((b) => south.includes(b)));
  assert.throws(() => props.endpointInteractionColliders("other"));
  for (const connected of [true, false, true]) {
    props.connectEndpoint("relay-south", connected);
    assert.equal(props.readEndpoint().connected, connected);
    assert.equal(props.endpointInteractionColliders("relay-south"), south);
  }
  props.clearReply();
  assert.deepEqual(props.replyState(), {
    paperCount: 0,
    lampAngle: 0,
    pending: false,
  });
  props.dispose();
});

test("both front approaches operate in both knife states; unrelated cover still rejects visibility", async () => {
  const { SignalSystem } = await import(
    "../../public/games/dust-redemption/signal-system.js"
  );
  const { world, props } = fixture(),
    ray = new THREE.Raycaster();
  world.trace = (a, b) => {
    world.level.updateWorldMatrix(true, true);
    const from = new THREE.Vector3(a.x, a.y, a.z),
      to = new THREE.Vector3(b.x, b.y, b.z),
      length = from.distanceTo(to);
    ray.set(from, to.sub(from).normalize());
    ray.far = length;
    const hit = ray.intersectObjects(world.solids, false)[0];
    return hit
      ? { box: world.solidBoxes.get(hit.object), distance: hit.distance }
      : null;
  };
  const player = { position: new THREE.Vector3() },
    controller = { world, props, player };
  for (const [x, z] of [
    [-11.821, -2.609],
    [-12.8, -2.8],
  ])
    for (const connected of [false, true]) {
      player.position.set(x, 0, z);
      props.connectEndpoint("relay-south", connected);
      const knife = props.parts["relay-south-knife"],
        allowed = props.endpointInteractionColliders("relay-south");
      assert.equal(
        SignalSystem.prototype.visible.call(controller, knife, allowed),
        true,
      );
      const blocker = new THREE.Mesh(
        new THREE.BoxGeometry(1, 2, 0.1),
        new THREE.MeshBasicMaterial({ side: THREE.DoubleSide }),
      );
      blocker.position.set((x - 12) / 2, 1, (z - 4) / 2);
      world.level.add(blocker);
      world.solid(blocker, { id: "unrelated-cover" });
      assert.equal(
        SignalSystem.prototype.visible.call(controller, knife, allowed),
        false,
      );
      world.solids.pop();
      blocker.removeFromParent();
      blocker.geometry.dispose();
      blocker.material.dispose();
    }
  props.requestReply({
    messageId: "one",
    revision: 1,
    rosterId: f.roster.id,
    receiverId: f.receiver.id,
    contentIds: f.roster.memberIds,
  });
  assert.equal(props.replyState().pending, true);
  props.clearReply();
  props.update(0.05);
  assert.equal(props.readReply(), null);
  props.requestReply({
    messageId: "two",
    revision: 2,
    rosterId: f.roster.id,
    receiverId: f.receiver.id,
    contentIds: f.roster.memberIds,
  });
  props.update(0.05);
  assert.equal(props.replyState().paperCount, 4);
  assert.equal(props.replyState().lampAngle, 1.05);
  props.clearReply();
  assert.deepEqual(props.replyState(), {
    paperCount: 0,
    lampAngle: 0,
    pending: false,
  });
  props.dispose();
});
