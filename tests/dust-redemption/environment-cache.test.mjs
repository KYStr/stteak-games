import test from "node:test";
import assert from "node:assert/strict";
import * as THREE from "../../public/games/dust-redemption/vendor/three.module.js";
import { World } from "../../public/games/dust-redemption/world.js";
test("static environment reuse preserves collision meshes, releases mission objects, and disposes owned resources at shutdown", () => {
  const w = Object.create(World.prototype),
    staticRoot = new THREE.Group();
  const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(2, 1, 2),
    new THREE.MeshBasicMaterial(),
  );
  staticRoot.add(mesh);
  const shadow = new THREE.InstancedMesh(
    new THREE.PlaneGeometry(1, 1),
    new THREE.MeshBasicMaterial(),
    1,
  );
  const box = { id: "canonical", min: { x: -1, z: -1 }, max: { x: 1, z: 1 } };
  const record = {
    roots: [staticRoot, shadow],
    colliders: [box],
    solids: [mesh],
    occluders: [staticRoot],
    boxes: [[mesh, box]],
    groundShadows: shadow,
    shadowMatrix: new THREE.Matrix4(),
    shadowRotation: new THREE.Quaternion(),
  };
  Object.assign(w, {
    level: new THREE.Group(),
    dynamic: new THREE.Group(),
    scene: new THREE.Scene(),
    shadowTransforms: [],
    actors: [],
    effects: [],
    colliders: [box],
    solids: [mesh],
    occluders: [staticRoot],
    collisionRevision: 0,
    renderer: { renderLists: { dispose() {} }, dispose() {} },
    fieldProps: { geometries: new Set(), dispose() {} },
    templates: new Map(),
    sharedTextures: new Set(),
    clips: [],
    sun: { shadow: {} },
    lowQuality: true,
    environmentCache: new Map([[JSON.stringify(["station", []]), record]]),
    activeEnvironment: record,
  });
  w.level.add(...record.roots);
  let canonicalDisposals = 0,
    missionDisposals = 0;
  mesh.geometry.addEventListener("dispose", () => canonicalDisposals++);
  const missionMesh = new THREE.Mesh(
    new THREE.BoxGeometry(),
    new THREE.MeshBasicMaterial(),
  );
  missionMesh.geometry.addEventListener("dispose", () => missionDisposals++);
  w.level.add(missionMesh);
  w.build("station");
  assert.equal(missionDisposals, 1);
  assert.equal(canonicalDisposals, 0);
  assert.equal(w.level.children.includes(missionMesh), false);
  assert.equal(w.solids[0], mesh);
  assert.equal(w.colliders[0], box);
  assert.equal(w.solidBoxes.get(mesh), box);
  assert.notEqual(
    w.colliders,
    record.colliders,
    "live mission arrays cannot mutate cached membership",
  );
  w.colliders.push({ id: "mission-only" });
  assert.equal(record.colliders.length, 1);
  w.build("station");
  assert.equal(w.colliders.length, 1);
  assert.equal(canonicalDisposals, 0);
  w.dispose();
  assert.equal(canonicalDisposals, 1);
  assert.equal(w.environmentCache.size, 0);
});
