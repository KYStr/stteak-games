import test from "node:test";
import assert from "node:assert/strict";
import * as THREE from "../../../games/aetherwake/node_modules/three/build/three.module.js";
import {
  AetherScene,
  FlightTargetMarker,
  courseVisualState,
  navigationVisualState,
  createWorldWind,
  NavigationLabelOcclusion,
} from "../../../games/aetherwake/src/scene.js";
import { WORLD, routeWindActive } from "../../../games/aetherwake/src/world.js";

const islands = [
  { id: "from", x: -320, y: 8, z: -720 },
  { id: "mid", x: 360, y: 18, z: -1340 },
  { id: "to", x: 1020, y: 28, z: -780 },
];
const wind = (id, gate) => ({
  id,
  gate,
  type: "tailwind",
  x: 0,
  y: -30,
  z: -100,
  radius: 20,
  height: 100,
  ceiling: 45,
  start: { x: 0, y: 30, z: 0 },
  end: { x: 0, y: 45, z: -200 },
  direction: { x: 0, z: -1 },
});
const challenge = {
  id: "course",
  x: 10,
  y: 22,
  z: 10,
  radius: 10,
  stages: [
    {
      id: "stage-one",
      fromIslandId: "from",
      toIslandId: "mid",
      gates: [{ x: 0, y: 40, z: -900 }],
      winds: [wind("one-gate", 0), wind("one-landing", 1)],
    },
    {
      id: "stage-two",
      fromIslandId: "mid",
      toIslandId: "to",
      gates: [{ x: 700, y: 46, z: -1200 }],
      winds: [wind("two-gate", 0), wind("two-landing", 1)],
    },
  ],
};
const world = { islands, challenges: [challenge] };
const state = (stage = 0, gate = 0) => ({
  activeChallenge: challenge.id,
  courseStages: { course: stage },
  challengeProgress: { course: gate },
  challenges: [],
});

test("the floating navigation label hides behind the course card and restores without moving its anchor or reading layout each frame", () => {
  let anchor = { x: 138, y: 110 },
    layoutReads = 0;
  let cardBounds = {
    left: 165,
    top: 85,
    right: 425,
    bottom: 199,
    width: 260,
    height: 114,
  };
  const label = {
    style: { left: "138px", top: "110px" },
    getBoundingClientRect: () => {
      layoutReads++;
      return {
        left: anchor.x - 130,
        top: anchor.y - 25,
        right: anchor.x + 130,
        bottom: anchor.y + 25,
        width: 260,
        height: 50,
      };
    },
  };
  const card = {
    getBoundingClientRect: () => {
      layoutReads++;
      return cardBounds;
    },
  };
  let observer;
  class Observer {
    constructor(callback) {
      this.callback = callback;
      this.targets = [];
      observer = this;
    }
    observe(target) {
      this.targets.push(target);
    }
    disconnect() {
      this.disconnected = true;
    }
  }
  const controller = new NavigationLabelOcclusion(label, card, Observer);
  controller.place(anchor.x, anchor.y);
  observer.callback();
  assert.deepEqual(observer.targets, [label, card]);
  assert.equal(
    label.style.visibility,
    "hidden",
    "640×360 reported overlap hides the whole label",
  );
  assert.equal(label.style.left, "138px");
  assert.equal(
    label.style.top,
    "110px",
    "occlusion never moves the target to another world position",
  );
  const initialReads = layoutReads;
  for (let frame = 0; frame < 120; frame++)
    controller.place(138 + frame / 10, 110);
  assert.equal(
    layoutReads,
    initialReads,
    "camera movement compares cached bounds only",
  );
  anchor = { x: 138, y: 260 };
  controller.place(anchor.x, anchor.y);
  assert.equal(
    label.style.visibility,
    "",
    "clear navigation restores automatically",
  );
  anchor = { x: 138, y: 110 };
  controller.place(anchor.x, anchor.y);
  assert.equal(label.style.visibility, "hidden");
  cardBounds = { left: 0, top: 0, right: 0, bottom: 0, width: 0, height: 0 };
  observer.callback();
  assert.equal(
    label.style.visibility,
    "",
    "hidden course card no longer masks the label",
  );
  controller.dispose();
  assert.equal(observer.disconnected, true);
});

test("route style and active course visibility match physics without recreating wind meshes or orphan corridor paths", () => {
  const winds = WORLD.winds.map((data) => ({
    data,
    group: createWorldWind(data),
  }));
  const scene = Object.assign(Object.create(AetherScene.prototype), {
    winds,
    reduced: true,
  });
  const retained = winds.map(({ group }) => [...group.children]);
  const geometry = new Set(),
    materials = new Set();
  let disposals = 0;
  for (const { group } of winds)
    group.traverse((child) => {
      if (child.geometry) geometry.add(child.geometry);
      if (child.material) materials.add(child.material);
    });
  for (const resource of [...geometry, ...materials])
    resource.addEventListener("dispose", () => disposals++);
  for (let repeat = 0; repeat < 3; repeat++) {
    for (const routeStyle of ["safe", "shortcut"]) {
      for (const activeChallenge of [null, WORLD.challenges[0].id]) {
        const current = { routeStyle, activeChallenge, elapsed: 2, seed: 0 };
        scene.updateWorldWinds(current, 1 / 60);
        for (const [index, { data, group }] of winds.entries()) {
          const expected =
            !data.routeId || (!activeChallenge && data.style === routeStyle);
          assert.equal(routeWindActive(data, current), expected);
          assert.equal(group.visible, expected, data.id);
          assert.deepEqual(group.children, retained[index]);
          const path = group.getObjectByName("wind-corridor-path");
          if (data.start && data.end) {
            assert.equal(path.parent, group);
            assert.equal(path.visible && group.visible, expected);
            const start = group.localToWorld(
              path.geometry.parameters.path.getPoint(0),
            );
            const end = group.localToWorld(
              path.geometry.parameters.path.getPoint(1),
            );
            assert.ok(
              start.distanceTo(
                new THREE.Vector3(data.start.x, data.start.y, data.start.z),
              ) < 1e-6,
            );
            assert.ok(
              end.distanceTo(
                new THREE.Vector3(data.end.x, data.end.y, data.end.z),
              ) < 1e-6,
            );
          }
        }
      }
    }
  }
  for (const trackedHint of [{ transit: true }, { entry: true }]) {
    const tracked = {
      routeStyle: "shortcut",
      activeChallenge: null,
      trackedHint,
      elapsed: 2,
      seed: 0,
    };
    scene.updateWorldWinds(tracked, 1 / 60);
    for (const [index, { data, group }] of winds.entries()) {
      const expected = !data.routeId || data.style === "safe";
      assert.equal(routeWindActive(data, tracked), expected);
      assert.equal(
        group.visible,
        expected,
        `${data.id}: tracking uses the safe network even with shortcut selected`,
      );
      assert.deepEqual(group.children, retained[index]);
    }
  }
  const cross = winds.find(
    ({ data }) =>
      data.type === "crosswind" && data.routeId && data.style === "safe",
  );
  scene.updateWorldWinds(
    {
      routeStyle: "safe",
      activeChallenge: null,
      elapsed: cross.data.period * 0.75,
      seed: 0,
    },
    1 / 60,
  );
  assert.equal(
    cross.group.visible,
    false,
    "inactive crosswind pulse remains visually inactive",
  );
  assert.equal(
    disposals,
    0,
    "style/course switches retain all original resources",
  );
  for (const resource of [...geometry, ...materials]) resource.dispose();
});

test("tracked expedition entry overrides the survey marker until a course becomes active", () => {
  const course = WORLD.challenges[0];
  const saved = {
    activeChallenge: null,
    courseStages: { [course.id]: 1 },
    challengeProgress: {},
    challenges: [],
    surveyHint: { ...WORLD.routes[0].samples[0], step: 1, total: 8 },
  };
  const entry = courseVisualState(course, saved);
  const from = WORLD.islands.find(
    (island) => island.id === course.stages[1].fromIslandId,
  );
  assert.deepEqual(
    [entry.entry.x, entry.entry.y, entry.entry.z],
    [from.x + 18, from.y + 22, from.z - 18],
  );
  saved.trackedHint = {
    ...entry.entry,
    entry: true,
    stageName: entry.stage.name,
    stage: 2,
    stageTotal: course.stages.length,
  };
  const tracked = navigationVisualState(saved);
  assert.equal(tracked.target, saved.trackedHint);
  assert.equal(tracked.label, `${entry.stage.name}入口`);
  assert.equal(tracked.surveyTarget, null);
  assert.equal(tracked.mainRouteVisible, false);
  assert.equal(
    entry.completed,
    false,
    "tracking retains the existing entry ring",
  );
  const transitHint = {
    ...saved.trackedHint,
    ...WORLD.routes[0].samples[0],
    entry: false,
    transit: true,
    transitStep: 2,
    transitTotal: 5,
  };
  const transit = navigationVisualState({ ...saved, trackedHint: transitHint });
  assert.equal(transit.target, transitHint);
  assert.equal(transit.label, "安全接駁 2/5");
  assert.equal(transit.surveyTarget, transitHint);
  assert.equal(transit.mainRouteVisible, false);
  const transitMarker = new FlightTargetMarker();
  transitMarker.update(transit.surveyTarget, { x: 0, y: 0, z: 0 });
  assert.equal(transitMarker.group.visible, true);
  assert.deepEqual(transitMarker.group.position.toArray(), [
    transitHint.x,
    transitHint.y,
    transitHint.z,
  ]);
  transitMarker.update(tracked.surveyTarget, { x: 0, y: 0, z: 0 });
  assert.equal(
    transitMarker.group.visible,
    false,
    "arrival leaves the course entry ring as the only entry marker",
  );
  transitMarker.dispose();
  const gate = {
    ...entry.stage.gates[0],
    stage: 2,
    stageTotal: course.stages.length,
    step: 1,
    total: entry.stage.gates.length + 1,
  };
  const active = navigationVisualState({
    ...saved,
    activeChallenge: course.id,
    challengeHint: gate,
  });
  assert.equal(active.target, gate);
  assert.match(active.label, /測風門 1\//);
  assert.equal(active.surveyTarget, null);
  const cancelled = navigationVisualState({ ...saved, trackedHint: null });
  assert.equal(cancelled.target, saved.surveyHint);
  assert.equal(cancelled.surveyTarget, saved.surveyHint);
  assert.equal(cancelled.mainRouteVisible, true);
});

test("course markers follow saved stages, select only current wind and terminate at delivery centre", () => {
  const saved = state(1, 1);
  const original = structuredClone(saved);
  const view = courseVisualState(challenge, saved, world);
  assert.equal(view.stage.id, "stage-two");
  assert.equal(view.entry.x, islands[1].x + 18);
  assert.equal(view.entry.y, islands[1].y + 22);
  assert.equal(view.entry.z, islands[1].z - 18);
  assert.equal(view.points.at(-1), islands[2]);
  assert.deepEqual(
    view.winds.map((item) => item.id),
    ["two-landing"],
  );
  assert.deepEqual(saved, original, "render selection never mutates a save");
  assert.equal(courseVisualState(challenge, state(2), world).stageIndex, 0);
  assert.equal(
    courseVisualState(challenge, { ...saved, challenges: ["course"] }, world)
      .completed,
    true,
    "completion in this expedition hides the ring",
  );
});

test("directional survey rings keep their true heading and delivery rings lie above the landing surface", () => {
  const marker = new FlightTargetMarker();
  const target = {
    x: 120,
    y: 40,
    z: -480,
    radius: 13,
    heading: { x: 0.6, z: -0.8, minDot: 0.6 },
  };
  const resources = [];
  marker.group.traverse((child) => {
    if (child.geometry) resources.push(child.geometry);
  });
  for (let step = 0; step < 120; step++) {
    marker.update(target, { x: step * 10, y: 30, z: 30 });
    const normal = new THREE.Vector3(0, 0, 1).applyQuaternion(
      marker.group.quaternion,
    );
    assert.ok(normal.distanceTo(new THREE.Vector3(0.6, 0, -0.8)) < 1e-10);
    assert.equal(marker.arrow.visible, true);
  }
  assert.equal(marker.ring.scale.x, 13);
  marker.update({ ...target, y: 18, landing: true }, { x: 0, y: 18, z: 0 });
  const normal = new THREE.Vector3(0, 0, 1).applyQuaternion(
    marker.group.quaternion,
  );
  assert.ok(normal.distanceTo(new THREE.Vector3(0, 1, 0)) < 1e-10);
  assert.equal(marker.group.position.y, 18.25);
  assert.equal(marker.arrow.visible, false);
  const after = [];
  marker.group.traverse((child) => {
    if (child.geometry) after.push(child.geometry);
  });
  assert.deepEqual(after, resources, "moving between targets retains geometry");
  marker.update(null, {});
  assert.equal(marker.group.visible, false);
  marker.dispose();
});

test("course stage and gate changes release obsolete visual resources and leave no detached scene children", () => {
  const scene = Object.assign(Object.create(AetherScene.prototype), {
    scene: new THREE.Scene(),
    courseId: null,
    courseLine: null,
    courseWindKey: "",
    courseWinds: [],
  });
  const disposed = new Map();
  const watch = (object) => {
    object.traverse((child) => {
      for (const resource of [child.geometry, child.material]) {
        if (!resource || disposed.has(resource)) continue;
        disposed.set(resource, 0);
        resource.addEventListener("dispose", () => {
          disposed.set(resource, disposed.get(resource) + 1);
        });
      }
    });
  };
  for (let cycle = 0; cycle < 12; cycle++) {
    for (let stage = 0; stage < 2; stage++) {
      for (let gate = 0; gate < 2; gate++) {
        const current = state(stage, gate);
        scene.updateCourse(current, world);
        const line = scene.courseLine;
        const windGroup = scene.courseWinds[0].group;
        scene.updateCourse(current, world);
        assert.equal(scene.courseLine, line, "same state retains the line");
        assert.equal(scene.courseWinds[0].group, windGroup);
        assert.equal(scene.scene.children.length, 2);
        assert.equal(
          scene.courseWinds[0].data.id,
          `${stage ? "two" : "one"}-${gate ? "landing" : "gate"}`,
        );
        watch(line);
        watch(windGroup);
      }
    }
    scene.updateCourse({ ...state(), activeChallenge: null }, world);
    assert.equal(scene.scene.children.length, 0);
    assert.equal(scene.courseWinds.length, 0);
    assert.equal(scene.courseLine, null);
    assert.ok([...disposed.values()].every((count) => count === 1));
  }
});
