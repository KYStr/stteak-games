import test from "node:test";
import assert from "node:assert/strict";
import * as THREE from "../../public/games/dust-redemption/vendor/three.module.js";
import { World } from "../../public/games/dust-redemption/world.js";
function fixture() {
  const w = Object.create(World.prototype);
  Object.assign(w, {
    level: new THREE.Group(),
    solids: [],
    colliders: [],
    colliderState: new WeakMap(),
    solidBoxes: new WeakMap(),
    collisionRecords: new WeakMap(),
    collisionRevision: 0,
    matricesReady: false,
    traceOrigin: new THREE.Vector3(),
    traceDirection: new THREE.Vector3(),
    localRay: new THREE.Ray(),
    rayPoint: new THREE.Vector3(),
    worldPoint: new THREE.Vector3(),
    triangleA: new THREE.Vector3(),
    triangleB: new THREE.Vector3(),
    triangleC: new THREE.Vector3(),
    traceResult: {},
    proxyResult: {},
    shotRaycaster: new THREE.Raycaster(),
  });
  const box = new THREE.Mesh(
    new THREE.BoxGeometry(2, 1.8, 1),
    new THREE.MeshBasicMaterial({ side: THREE.DoubleSide }),
  );
  box.rotation.y = 0.37;
  w.level.add(box);
  w.solids.push(box);
  w.solidBoxes.set(box, { id: "real-wall" });
  return { w, box };
}
test("reused exact triangle query agrees with Three raycast across four sides and moved geometry", () => {
  const { w, box } = fixture(),
    reference = new THREE.Raycaster();
  for (const position of [
    [0, 0, 0],
    [2, 0.4, -3],
  ]) {
    box.position.set(...position);
    w.syncCollisionMatrices(true);
    for (let side = 0; side < 4; side++)
      for (let sample = 0; sample < 20; sample++) {
        const a = new THREE.Vector3(
            Math.sin((side * Math.PI) / 2) * 6,
            0.1 + sample * 0.12,
            Math.cos((side * Math.PI) / 2) * 6,
          ),
          b = new THREE.Vector3(position[0], 0.5, position[2]);
        reference.set(a, b.clone().sub(a).normalize());
        reference.far = a.distanceTo(b);
        const expected = reference.intersectObject(box, false)[0],
          actual = w.trace(a, b);
        assert.equal(Boolean(actual), Boolean(expected));
        if (expected)
          assert.ok(Math.abs(actual.distance - expected.distance) < 1e-7);
      }
  }
  const revision = w.collisionRevision;
  w.syncCollisionMatrices(true);
  assert.equal(w.collisionRevision, revision);
  box.rotation.y += 0.2;
  w.syncCollisionMatrices(true);
  assert.ok(w.collisionRevision > revision);
  box.geometry.dispose();
  box.material.dispose();
});

test("cached hierarchy bounds retain exact moved, articulated and instance geometry", async () => {
  const { createBoundsTracker } = await import(
    "../../games/dust-redemption/collision-bounds.js"
  );
  const track = createBoundsTracker(THREE),
    root = new THREE.Group(),
    arm = new THREE.Group(),
    mesh = new THREE.Mesh(
      new THREE.BoxGeometry(2, 0.5, 0.7),
      new THREE.MeshBasicMaterial(),
    );
  root.add(arm);
  arm.add(mesh);
  const original = new THREE.Box3();
  for (let i = 0; i < 20; i++) {
    root.position.x = i * 0.2;
    arm.rotation.y = i * 0.1;
    root.updateWorldMatrix(true, true);
    const actual = track(root, "cart");
    original.setFromObject(root);
    assert.ok(Math.abs(actual.min.x - original.min.x) < 1e-8);
    assert.ok(Math.abs(actual.max.z - original.max.z) < 1e-8);
    assert.equal(track(root, "cart"), actual);
  }
  const child = mesh.clone();
  arm.add(child);
  child.position.z = 4;
  root.updateWorldMatrix(true, true);
  const actual = track(root, "cart");
  original.setFromObject(root);
  assert.equal(actual.max.z, original.max.z);
  mesh.geometry.dispose();
  mesh.material.dispose();
});

test("mutable runtime tactics preserve immutable decision and route semantics", async () => {
  const { createEnemyTacticsState, updateEnemyTactics } = await import(
    "../../games/dust-redemption/enemy-tactics.js"
  );
  const { moveCircle, makeBox, firstHit } = await import(
    "../../games/dust-redemption/physics.js"
  );
  let cold = createEnemyTacticsState("guard"),
    hot = createEnemyTacticsState("guard");
  const boxes = [makeBox("cover", 3, 0, 2, 1.8, 3)],
    p = { x: 0, z: 3 },
    threat = { x: 10, z: 0 };
  for (let i = 0; i < 120; i++) {
    threat.z = Math.sin(i * 0.02);
    const view = {
      id: "guard",
      type: "guard",
      position: p,
      threat,
      underFire: i > 10,
      suppressed: 0,
      rounds: 30,
      enabled: true,
      now: i * 0.05,
      colliders: boxes,
      radius: 0.38,
      bounds: 23,
    };
    const a = updateEnemyTactics(cold, view, {
        trace: (a, b) => firstHit(a, b, boxes),
        moveCircle,
      }),
      b = updateEnemyTactics(hot, view, {
        trace: (a, b) => firstHit(a, b, boxes),
        moveCircle,
        mutable: true,
      });
    cold = a.state;
    hot = b.state;
    assert.equal(b.reason, a.reason);
    assert.deepEqual(b.movement?.waypoint, a.movement?.waypoint);
    assert.equal(b.movement?.kind, a.movement?.kind);
    if (a.movement) {
      const t = a.movement.waypoint,
        dx = t.x - p.x,
        dz = t.z - p.z,
        len = Math.hypot(dx, dz);
      if (len) {
        const n = moveCircle(
          p,
          (dx / len) * 0.03,
          (dz / len) * 0.03,
          boxes,
          0.38,
        );
        p.x = n.x;
        p.z = n.z;
      }
    }
  }
});

test("instance-buffer edits invalidate cached bounds without transforming the parent", async () => {
  const { createBoundsTracker } = await import(
    "../../games/dust-redemption/collision-bounds.js"
  );
  const track = createBoundsTracker(THREE),
    g = new THREE.BoxGeometry(1, 1, 1),
    m = new THREE.MeshBasicMaterial(),
    mesh = new THREE.InstancedMesh(g, m, 2),
    matrix = new THREE.Matrix4();
  for (let i = 0; i < 5; i++) {
    mesh.setMatrixAt(0, matrix.makeTranslation(i, 0, 0));
    mesh.setMatrixAt(1, matrix.makeTranslation(i + 3, 0, 0));
    mesh.instanceMatrix.needsUpdate = true;
    mesh.computeBoundingBox();
    assert.equal(track(mesh, "stock").max.x, i + 3.5);
  }
  mesh.dispose();
  g.dispose();
  m.dispose();
});

test("geometry cache keeps radius and bounds independent", async () => {
  const { tacticalGeometryKey } = await import(
    "../../games/dust-redemption/enemy-tactics.js"
  );
  const boxes = [];
  const a = tacticalGeometryKey(boxes, 0.5, 23),
    b = tacticalGeometryKey(boxes, 0.25, 25023);
  assert.notEqual(a, b);
  assert.equal(tacticalGeometryKey(boxes, 0.5, 23), a);
  assert.equal(tacticalGeometryKey(boxes, 0.25, 25023), b);
});
