import test from "node:test";
import assert from "node:assert/strict";
import * as THREE from "../../../games/aetherwake/node_modules/three/build/three.module.js";
import { AetherScene } from "../../../games/aetherwake/src/scene.js";

test("read-only camera evidence distinguishes visible foreground, hidden LOD and geometry behind the player", () => {
  const scene = Object.create(AetherScene.prototype);
  scene.camera = new THREE.PerspectiveCamera(56, 16 / 9, 0.3, 1800);
  scene.camera.position.set(0, 10, 20);
  scene.target = new THREE.Vector3(0, 2, 0);
  scene.camera.lookAt(scene.target);
  scene.camera.updateMatrixWorld(true);
  Object.assign(scene, {
    canvas: {
      width: 1920,
      height: 1080,
      clientWidth: 1920,
      clientHeight: 1080,
    },
    renderer: { getPixelRatio: () => 1 },
    menu: false,
    overhead: false,
    manualYaw: 0,
    yaw: 0,
    pitch: 0.63,
    collidables: [],
  });
  const player = { x: 0, y: 0, z: 0 };
  const positionBefore = scene.camera.position.toArray();
  const matrixBefore = scene.camera.matrixWorld.toArray();
  const empty = scene.inspectCamera(player);
  assert.equal(empty.playerInFrustum, true);
  assert.ok(
    Math.abs(empty.playerNDC.x) < 1e-12 && Math.abs(empty.playerNDC.y) < 1e-12,
  );
  assert.equal(empty.occlusion.blocked, false);
  assert.equal(empty.platformUnderCamera.id, "island-camp");
  assert.equal(empty.platformUnderCamera.clearance, 10);

  const parent = new THREE.Group();
  const blocker = new THREE.Mesh(
    new THREE.BoxGeometry(6, 5, 3),
    new THREE.MeshBasicMaterial(),
  );
  blocker.position.set(0, 6, 10);
  blocker.name = "foreground-cliff";
  parent.add(blocker);
  parent.updateMatrixWorld(true);
  scene.collidables.push(blocker);
  const blocked = scene.inspectCamera(player);
  assert.equal(blocked.occlusion.blocked, true);
  assert.equal(blocked.occlusion.object, "foreground-cliff");
  assert.ok(
    blocked.occlusion.distance > scene.camera.near &&
      blocked.occlusion.distance < blocked.distance,
  );

  parent.visible = false;
  assert.equal(
    scene.inspectCamera(player).occlusion.blocked,
    false,
    "Hidden LOD ancestry must not count as a rendered foreground occluder",
  );
  parent.visible = true;
  blocker.position.set(0, -2, -10);
  parent.updateMatrixWorld(true);
  assert.equal(
    scene.inspectCamera(player).occlusion.blocked,
    false,
    "Geometry behind the player must not block the camera-to-head segment",
  );

  empty.position.y = -999;
  empty.target.z = 999;
  assert.deepEqual(scene.camera.position.toArray(), positionBefore);
  assert.deepEqual(scene.camera.matrixWorld.toArray(), matrixBefore);
  assert.deepEqual(scene.target.toArray(), [0, 2, 0]);
  blocker.geometry.dispose();
  blocker.material.dispose();
});
