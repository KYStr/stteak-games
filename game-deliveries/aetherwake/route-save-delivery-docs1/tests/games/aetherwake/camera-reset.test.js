import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { runInNewContext } from "node:vm";
import * as THREE from "../../../games/aetherwake/node_modules/three/build/three.module.js";
import { AetherScene } from "../../../games/aetherwake/src/scene.js";
import { FlightSimulation } from "../../../games/aetherwake/src/simulation.js";
import { FlightInput } from "../../../games/aetherwake/src/input.js";
import { defaultSave } from "../../../games/aetherwake/src/storage.js";
import { WORLD, STATIONS } from "../../../games/aetherwake/src/world.js";

// Actual scene update/camera/raycast mathematics; no WebGL renderer, DOM, or performance claim.
function sceneFixture({ overhead = false, width = 1440, height = 900 } = {}) {
  const scene = Object.create(AetherScene.prototype), renders = [];
  const world = new THREE.Scene();
  world.fog = new THREE.FogExp2("#a4d2ce", 0.0012 / WORLD.mapScale);
  const camera = new THREE.PerspectiveCamera(56, width / height, 0.3, 1800 * WORLD.mapScale);
  camera.position.set(82, 74, 112);
  const target = new THREE.Vector3(-20, 7, -62);
  camera.lookAt(target);
  camera.updateMatrixWorld(true);
  Object.assign(scene, {
    scene: world, camera, target, mapScale: WORLD.mapScale,
    canvas: { width, height, clientWidth: width, clientHeight: height },
    renderer: {
      getPixelRatio: () => 1,
      render: (_world, currentCamera) => renders.push(currentCamera.position.clone()),
      info: { render: { calls: 0, triangles: 0 }, memory: { geometries: 0, textures: 0 } },
    },
    pilot: { group: new THREE.Group(), update() {} },
    relics: [], winds: [], challenges: [], courseWinds: [], hazards: [], islands: [], labels: [],
    surveyMarker: { update() {} }, updateCourse() {}, routeLine: null,
    contactShadow: new THREE.Object3D(), marker: new THREE.Object3D(),
    ray: new THREE.Raycaster(), collidables: [], foreground: { update() {}, inspect() { return null; } },
    navTarget: { style: {} }, navText: { style: {}, textContent: "" }, navOcclusion: { place() {} },
    sun: new THREE.DirectionalLight(), metrics: { frames: 0 },
    menu: false, reduced: false, overhead, yaw: 1.7, manualYaw: 1.7,
    pitch: 0.63, distance: 26, cameraSnapPending: false, wasGrounded: true, landingTime: 0,
  });
  return { scene, renders };
}

function simulationAt(id, extra = {}) {
  assert.ok(WORLD.islands.some(island => island.id === id));
  return new FlightSimulation({ save: { ...defaultSave(), seed: 2718, checkpoint: id, ...extra } });
}
function update(scene, sim, dt) {
  const state = sim.snapshot();
  AetherScene.prototype.update.call(scene, state, dt, state.elapsed, null);
  return state;
}
const head = player => new THREE.Vector3(player.x, player.y + 2, player.z);
const look = player => head(player).add(new THREE.Vector3((player.vx || 0) * 0.25, 0, (player.vz || 0) * 0.25));
function nearVector(actual, expected, message) {
  assert.ok(actual.distanceTo(expected) < 1e-8, `${message}: ${actual.toArray()} versus ${expected.toArray()}`);
}
function betweenMoved(actual, previous, destination, message) {
  const originalDistance = previous.distanceTo(destination);
  assert.ok(originalDistance > 1e-7, `${message}: fixture has a genuine displacement`);
  assert.ok(actual.distanceTo(previous) > 1e-8, `${message}: moved on this frame`);
  assert.ok(actual.distanceTo(destination) < originalDistance, `${message}: moved toward destination`);
  assert.ok(actual.distanceTo(destination) > 1e-8, `${message}: retained smoothing, not an immediate jump`);
}

const sizes = [{ name: "desktop", width: 1440, height: 900 }, { name: "portrait", width: 360, height: 640 }];
for (const transition of ["restart", "continue"])
  for (const overhead of [false, true])
    for (const size of sizes)
      for (const dt of [0, 1 / 60])
        test(`${transition} first update dt=${dt === 0 ? "0" : "1/60"}: ${overhead ? "overhead" : "follow"} ${size.name} immediately contains the restored player`, () => {
          const { scene, renders } = sceneFixture({ ...size, overhead });
          let sim;
          if (transition === "restart") {
            sim = simulationAt("island-storm");
            sim.launch();
            scene.recenter({ immediate: true });
            update(scene, sim, 0);
            sim.reset();
          } else {
            sim = simulationAt("island-dawn");
            scene.menu = true;
            update(scene, sim, 0);
          }
          sim.launch();
          const previous = scene.camera.position.clone();
          assert.ok(previous.distanceTo(head(sim.player)) > 500, "test really begins at a distant camera pose");
          scene.menu = false;
          const countBefore = renders.length;
          scene.recenter({ immediate: true });
          assert.equal(scene.yaw, 0, "input basis is reset synchronously, before any update");
          update(scene, sim, dt);
          assert.equal(renders.length, countBefore + 1);
          assert.equal(scene.inspectCamera(sim.player).playerInFrustum, true, "the first rendered camera pose contains the player's head");
          nearVector(scene.target, look(sim.player), "the first camera target has no previous-island lag");
          nearVector(scene.pilot.group.position, new THREE.Vector3(sim.player.x, sim.player.y, sim.player.z), "pilot and camera use the same restored state");
          assert.ok(scene.camera.position.distanceTo(head(sim.player)) < 100, "camera is local to the restored player");
          assert.equal(scene.cameraSnapPending, false);
        });

test("after the first snap, the next real simulation movement follows smoothly in both modes and aspect ratios", () => {
  for (const overhead of [false, true]) for (const size of sizes) {
    const { scene } = sceneFixture({ ...size, overhead });
    const sim = simulationAt("island-reed");
    sim.launch();
    scene.recenter({ immediate: true });
    update(scene, sim, 0);
    const previousPosition = scene.camera.position.clone(), previousTarget = scene.target.clone();
    for (let frame = 0; frame < 8; frame++) sim.step({ x: 1, z: 0 }, 1 / 60);
    const { scene: reference } = sceneFixture({ ...size, overhead });
    reference.recenter({ immediate: true });
    update(reference, sim, 0);
    update(scene, sim, 1 / 60);
    betweenMoved(scene.camera.position, previousPosition, reference.camera.position, "normal camera follow");
    betweenMoved(scene.target, previousTarget, look(sim.player), "normal target follow");
    assert.equal(scene.inspectCamera(sim.player).playerInFrustum, true);
  }
});

test("ordinary recenter keeps its smooth transition and does not introduce an immediate camera jump", () => {
  const { scene } = sceneFixture();
  const sim = simulationAt("island-camp");
  scene.recenter({ immediate: true });
  scene.rotate(-1.2, 0);
  update(scene, sim, 0);
  const previous = scene.camera.position.clone();
  scene.recenter();
  assert.equal(scene.cameraSnapPending, false);
  update(scene, sim, 0);
  nearVector(scene.camera.position, previous, "ordinary C with zero elapsed time retains its camera pose");
  const { scene: reference } = sceneFixture();
  reference.recenter({ immediate: true }); update(reference, sim, 0);
  update(scene, sim, 1 / 60);
  betweenMoved(scene.camera.position, previous, reference.camera.position, "ordinary C follow");
});

test("a menu frame does not consume a pending reset before the first non-menu update", () => {
  const { scene } = sceneFixture();
  const sim = simulationAt("island-storm");
  scene.menu = true;
  scene.recenter({ immediate: true });
  update(scene, sim, 1 / 60);
  assert.equal(scene.cameraSnapPending, true);
  scene.menu = false;
  update(scene, sim, 0);
  nearVector(scene.target, look(sim.player), "first non-menu target");
  assert.equal(scene.inspectCamera(sim.player).playerInFrustum, true);
  assert.equal(scene.cameraSnapPending, false);
});

test("immediate reset still ray-shortens the camera before a real foreground mesh", () => {
  const { scene } = sceneFixture();
  const sim = simulationAt("island-camp");
  scene.recenter({ immediate: true }); update(scene, sim, 0);
  const origin = head(sim.player), fullPose = scene.camera.position.clone();
  const geometry = new THREE.BoxGeometry(8, 8, 2), material = new THREE.MeshBasicMaterial();
  const blocker = new THREE.Mesh(geometry, material);
  blocker.position.copy(origin).lerp(fullPose, 0.65);
  blocker.updateMatrixWorld(true);
  scene.collidables.push(blocker);
  const ray = new THREE.Raycaster(origin, fullPose.clone().sub(origin).normalize());
  const obstruction = ray.intersectObject(blocker, false)[0];
  assert.ok(obstruction && obstruction.distance > 4, "fixture intersects the original head-to-camera ray");
  try {
    scene.camera.position.set(1000, 300, -800);
    scene.target.set(1000, 300, -800);
    scene.recenter({ immediate: true }); update(scene, sim, 0);
    assert.ok(scene.camera.position.distanceTo(origin) < obstruction.distance, "camera stops in front of the obstacle");
    assert.equal(scene.inspectCamera(sim.player).playerInFrustum, true);
    nearVector(scene.target, look(sim.player), "ray shortening preserves the new player target");
  } finally { geometry.dispose(); material.dispose(); }
});

// Execute the original begin function, without importing main.js bootstrapping or constructing a renderer.
const mainSource = readFileSync(new URL("../../../games/aetherwake/src/main.js", import.meta.url), "utf8");
const beginStart = mainSource.indexOf("function begin(");
const beginEnd = mainSource.indexOf("\nfunction pause(", beginStart);
assert.ok(beginStart >= 0 && beginEnd > beginStart, "locate the unchanged complete begin-function boundaries");
const beginSource = mainSource.slice(beginStart, beginEnd);
for (const mode of ["new-run", "resume", "completed-save"])
  test(`actual begin ${mode} resets input yaw before enabling or presenting the restored run`, () => {
    const { scene, renders } = sceneFixture();
    const old = simulationAt("island-storm");
    const loaded = mode === "completed-save"
      ? { ...defaultSave(), activated: [...STATIONS], completed: true }
      : { ...defaultSave(), checkpoint: "island-dawn" };
    const input = Object.create(FlightInput.prototype);
    Object.assign(input, { keys: new Set(["KeyW"]), axes: { x: 0, z: 0 }, glide: false, touchBrake: false, enabled: false });
    const enabledCalls = [], uiCalls = [];
    input.setEnabled = value => {
      assert.equal(scene.yaw, 0, "begin resets yaw before input.setEnabled");
      assert.equal(scene.manualYaw, 0);
      assert.equal(renders.length, 0, "no scene update was needed to reset the input basis");
      input.enabled = value;
      enabledCalls.push(value);
      if (value) {
        const movement = FlightInput.prototype.read.call(input, scene.yaw);
        assert.equal(movement.x, 0, "forward input is not rotated by the previous run's camera yaw");
        assert.equal(movement.z, -1);
      }
    };
    const context = {
      FlightSimulation, sim: old, loaded, scene, input, selectedModule: "turn",
      started: false, accumulator: 123, previous: 0, guideHidden: true,
      resultAudioTimer: null, clearTimeout() {}, closeModal() {},
      audio: { unlock() {}, setPaused() {} }, bridge: { state() {} },
      performance: { now: () => 1234 }, matchMedia: () => ({ matches: false }),
      $: selector => selector === "#seed" ? { value: "2718" } : { focus() {} },
      show() {}, persist() {}, notify() {}, updateHud: () => uiCalls.push("hud"), showResults: () => uiCalls.push("results"),
      resumeFixture: mode !== "new-run",
    };
    runInNewContext(`${beginSource}\nbegin(resumeFixture);`, context, { timeout: 1000 });
    assert.deepEqual(enabledCalls, [mode !== "completed-save"]);
    assert.equal(context.sim.status, mode === "completed-save" ? "complete" : "running");
    assert.equal(scene.cameraSnapPending, true);
    if (mode === "completed-save") assert.ok(uiCalls.includes("results"));
    update(scene, context.sim, 0);
    nearVector(scene.target, look(context.sim.player), "begin-wired first update target");
    assert.equal(scene.inspectCamera(context.sim.player).playerInFrustum, true);
  });
