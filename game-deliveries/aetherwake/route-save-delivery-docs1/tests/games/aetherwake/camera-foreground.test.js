import test from "node:test";
import assert from "node:assert/strict";
import * as THREE from "../../../games/aetherwake/node_modules/three/build/three.module.js";
import {
  AetherScene,
  ForegroundOcclusion,
} from "../../../games/aetherwake/src/scene.js";
import { createStation } from "../../../games/aetherwake/src/models.js";

function cameraAt(player, yaw = 0) {
  const camera = new THREE.PerspectiveCamera(56, 16 / 9, 0.3, 1800);
  const head = new THREE.Vector3(player.x, player.y + 2, player.z);
  camera.position
    .set(
      Math.sin(yaw) * Math.cos(0.63) * 26,
      Math.sin(0.63) * 26,
      Math.cos(yaw) * Math.cos(0.63) * 26,
    )
    .add(head);
  camera.lookAt(head);
  camera.updateMatrixWorld(true);
  return camera;
}
function advance(controller, camera, player, frames = 24, enabled = true) {
  for (let i = 0; i < frames; i++)
    controller.update(camera, player, 1 / 60, enabled);
}

test("real station geometry: three centres by four angles preserve raw obstruction and locally fade every blocker", () => {
  const sites = [
    { id: "island-reed", type: 0, x: -80, y: 8, z: -180 },
    { id: "island-storm", type: 2, x: 255, y: 28, z: -195 },
    { id: "island-dawn", type: 1, x: 65, y: 4, z: 185 },
  ];
  let reproducedStormCases = 0;
  for (const player of sites) {
    const station = createStation(player.type);
    station.position.set(player.x, player.y + 0.1, player.z);
    station.scale.setScalar(1.8);
    station.updateMatrixWorld(true);
    const controller = new ForegroundOcclusion();
    controller.register(station, { kind: "station", id: player.id });
    for (let angle = 0; angle < 4; angle++) {
      const camera = cameraAt(player, (angle * Math.PI) / 2);
      const position = camera.position.toArray(),
        matrix = camera.matrixWorld.toArray();
      const before = controller.inspect(camera, player);
      if (player.id === "island-storm" && angle % 2 === 1) {
        assert.ok(
          before.hits.length > 0,
          `storm angle ${angle} reproduces the physical column obstruction`,
        );
        reproducedStormCases++;
      }
      advance(controller, camera, player);
      const after = controller.inspect(camera, player);
      assert.equal(
        after.hits.length,
        before.hits.length,
        "fading must not rewrite raw geometry evidence",
      );
      assert.ok(
        after.treatment.rawBlockers.every(
          (entry) => entry.opacityFactor <= 0.17,
        ),
        `${player.id} angle ${angle}: every sampled blocker is faded`,
      );
      assert.ok(
        after.treatment.rawBlockers.every(
          (entry) => entry.kind === "station" && entry.id === player.id,
        ),
      );
      assert.deepEqual(
        camera.position.toArray(),
        position,
        "foreground treatment never pushes the camera",
      );
      assert.deepEqual(camera.matrixWorld.toArray(), matrix);
      advance(controller, camera, player, 24, false);
      assert.equal(
        controller.inspect(camera, player).treatment.fadingMeshes.length,
        0,
        "menu/disabled state restores exact original materials",
      );
    }
    controller.dispose();
  }
  assert.equal(reproducedStormCases, 2);
});

test("fades restore within 0.5 seconds, cache clones, preserve shared materials and dispose only owned clones", () => {
  const player = { x: 0, y: 0, z: 0 },
    camera = cameraAt(player);
  const shared = new THREE.MeshStandardMaterial({ color: "#f5eed8" });
  const geometry = new THREE.BoxGeometry(6, 8, 2),
    root = new THREE.Group();
  const blocker = new THREE.Mesh(geometry, shared),
    unaffected = new THREE.Mesh(geometry, shared);
  blocker.position.set(0, 8, 10);
  unaffected.position.set(30, 8, 10);
  root.add(blocker, unaffected);
  root.updateMatrixWorld(true);
  const controller = new ForegroundOcclusion();
  controller.register(root, { kind: "camp-decoration", id: "island-camp" });
  let clone = null;
  for (let cycle = 0; cycle < 4; cycle++) {
    blocker.position.x = 0;
    root.updateMatrixWorld(true);
    advance(controller, camera, player);
    assert.notEqual(blocker.material, shared);
    clone ??= blocker.material;
    assert.equal(
      blocker.material,
      clone,
      "the mesh reuses its retained clone on subsequent occlusion",
    );
    assert.equal(unaffected.material, shared);
    assert.equal(shared.transparent, false);
    assert.equal(shared.depthWrite, true);
    assert.equal(shared.opacity, 1);
    assert.equal(
      controller.inspect(camera, player).treatment.retainedMaterialClones,
      1,
    );
    blocker.position.x = -30;
    root.updateMatrixWorld(true);
    advance(controller, camera, player, 24);
    assert.equal(
      blocker.material,
      shared,
      "the original reference is restored in 0.4 seconds",
    );
    assert.equal(
      controller.inspect(camera, player).treatment.fadingMeshes.length,
      0,
    );
  }
  let cloneDisposals = 0,
    originalDisposals = 0;
  clone.addEventListener("dispose", () => cloneDisposals++);
  shared.addEventListener("dispose", () => originalDisposals++);
  controller.dispose();
  controller.dispose();
  assert.equal(cloneDisposals, 1);
  assert.equal(originalDisposals, 0);
  assert.equal(controller.materials.size, 0);
  geometry.dispose();
  shared.dispose();
});

test("hidden LOD ancestors, instancing and translucent effects do not become foreground blockers", () => {
  const player = { x: 0, y: 0, z: 0 },
    camera = cameraAt(player);
  const root = new THREE.Group(),
    hiddenLevel = new THREE.Group();
  const geometry = new THREE.BoxGeometry(6, 8, 2),
    material = new THREE.MeshBasicMaterial();
  const blocker = new THREE.Mesh(geometry, material);
  blocker.position.set(0, 8, 10);
  hiddenLevel.add(blocker);
  root.add(hiddenLevel);
  const wind = new THREE.Mesh(
    geometry,
    new THREE.MeshBasicMaterial({ transparent: true, opacity: 0.3 }),
  );
  wind.position.copy(blocker.position);
  const plants = new THREE.InstancedMesh(geometry, material, 1);
  plants.position.copy(blocker.position);
  root.add(wind, plants);
  root.updateMatrixWorld(true);
  const controller = new ForegroundOcclusion();
  controller.register(root);
  assert.equal(controller.meshes.length, 1);
  advance(controller, camera, player);
  assert.equal(controller.inspect(camera, player).treatment.applied, true);
  hiddenLevel.visible = false;
  advance(controller, camera, player);
  assert.equal(controller.inspect(camera, player).hits.length, 0);
  assert.equal(blocker.material, material);
  controller.dispose();
  geometry.dispose();
  material.dispose();
  wind.material.dispose();
});

test("camera observer reports a mitigated station as physically blocked without mutating its material", () => {
  const player = { x: 255, y: 28, z: -195 },
    camera = cameraAt(player, Math.PI / 2);
  const station = createStation(2);
  station.position.set(player.x, player.y + 0.1, player.z);
  station.scale.setScalar(1.8);
  station.updateMatrixWorld(true);
  const foreground = new ForegroundOcclusion();
  foreground.register(station, { kind: "station", id: "island-storm" });
  advance(foreground, camera, player);
  const scene = Object.assign(Object.create(AetherScene.prototype), {
    camera,
    target: new THREE.Vector3(player.x, player.y + 2, player.z),
    foreground,
    canvas: { width: 1280, height: 720, clientWidth: 1280, clientHeight: 720 },
    renderer: { getPixelRatio: () => 1 },
    menu: false,
    overhead: false,
    manualYaw: Math.PI / 2,
    yaw: Math.PI / 2,
    pitch: 0.63,
  });
  const materialsBefore = foreground.meshes.map((mesh) => mesh.material);
  const observed = scene.inspectCamera(player);
  assert.equal(observed.occlusion.blocked, true);
  assert.equal(observed.occlusion.rawBlocked, true);
  assert.equal(observed.occlusion.treatment.applied, true);
  assert.equal(observed.occlusion.treatment.method, "bounded-foreground-fade");
  assert.ok(observed.occlusion.rawBlockerCount > 0);
  assert.ok(
    observed.occlusion.treatment.rawBlockers.every(
      (entry) => entry.kind === "station",
    ),
  );
  assert.deepEqual(
    foreground.meshes.map((mesh) => mesh.material),
    materialsBefore,
  );
  foreground.dispose();
});

test("foreground fading stays bounded while a camera sweep replaces its blockers", () => {
  const player = { x: 0, y: 0, z: 0 },
    camera = cameraAt(player);
  const root = new THREE.Group(),
    geometry = new THREE.BoxGeometry(6, 8, 2);
  const material = new THREE.MeshBasicMaterial(),
    meshes = [];
  for (let i = 0; i < 12; i++) {
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(0, 8, 10 + i * 0.01);
    root.add(mesh);
    meshes.push(mesh);
  }
  root.updateMatrixWorld(true);
  const controller = new ForegroundOcclusion();
  controller.register(root);
  advance(controller, camera, player);
  const before = controller.inspect(camera, player);
  assert.equal(
    before.hits.length,
    12,
    "the observer retains blockers beyond the treatment cap",
  );
  assert.equal(before.treatment.fadingMeshes.length, 8);
  const originalTargets = [...controller.targets];
  for (const mesh of originalTargets) mesh.position.x = 30;
  root.updateMatrixWorld(true);
  for (let frame = 0; frame < 24; frame++) {
    controller.update(camera, player, 1 / 60);
    assert.ok(
      controller.inspect(camera, player).treatment.fadingMeshes.length <= 8,
    );
  }
  assert.equal(controller.inspect(camera, player).hits.length, 4);
  controller.dispose();
  assert.ok(meshes.every((mesh) => mesh.material === material));
  geometry.dispose();
  material.dispose();
});
