import test from "node:test";
import assert from "node:assert/strict";
import * as THREE from "../../public/games/dust-redemption/vendor/three.module.js";
import { OnwardSystem } from "../../public/games/dust-redemption/onward-system.js";
import { FieldSystem } from "../../public/games/dust-redemption/field-system.js";
import {
  ONWARD,
  createOnwardProgress,
  onwardFact,
  recordOnward,
} from "../../games/dust-redemption/onward-content.js";

test("the family's onward roll call cannot shadow the original arrival receipt", () => {
  const onward = Object.create(OnwardSystem.prototype);
  const field = Object.create(FieldSystem.prototype);
  const task = { onward: true, dependencies: ["original-escort"] };
  Object.assign(field, {
    callbacks: {},
    state: { completed: ["original-escort"] },
    onward,
  });
  Object.assign(onward, {
    id: "long-night",
    field,
    task,
    controller: { status: { receipt: null } },
  });
  assert.equal(onward.ready, false);
  assert.equal(field.available(task), false);
  onward.controller.status.receipt = { id: "original-arrival" };
  assert.equal(onward.ready, true);
  assert.equal(field.available(task), true);
});

for (const choice of ["sheltered", "exposed"])
  test(`physical relay controller records the ${choice} node's actual returned checksum`, () => {
    const controller = Object.create(OnwardSystem.prototype);
    controller.id = "last-signal";
    controller.controller = {
      status: { receipt: { id: "original-receiver" } },
    };
    controller.flow = ONWARD[controller.id];
    let state = createOnwardProgress();
    state.choice = choice;
    for (let i = 0; i < 2; i++) {
      const step = controller.flow.steps[i];
      const at = controller.flow.sites.find(
        (s) => s.id === (i === 1 && choice === "exposed" ? "ne" : step.at),
      ).position;
      state = recordOnward(controller.id, state, {
        id: step.id,
        kind: step.kind,
        sequence: i,
        siteId: step.at,
        player: [...at],
        target: [...at],
        visible: true,
        normalDot: 1,
        fact: onwardFact(controller.id, state, step),
      });
    }
    let refusal = "";
    controller.field = {
      state: { onward: state, completed: [] },
      playerPosition: new THREE.Vector3(0, 0, 0.8),
      callbacks: {},
      record() {},
      close() {},
      notify(message) {
        refusal = message;
      },
    };
    controller.task = {
      dependencies: [],
      physicalSteps: controller.flow.steps.map((s) => s.id),
    };
    controller.sites = { se: new THREE.Object3D(), ne: new THREE.Object3D() };
    controller.currentSite =
      controller.sites[choice === "sheltered" ? "se" : "ne"];
    controller.currentSite.userData = {
      relayTag: choice === "sheltered" ? "A" : "C",
      needle: new THREE.Object3D(),
      gauge: { material: new THREE.MeshStandardMaterial() },
    };
    const at = controller.flow.sites.find(
      (s) => s.id === (choice === "sheltered" ? "se" : "ne"),
    ).position;
    controller.targetVector = new THREE.Vector3(at[0], 0, at[1]);
    controller.field.playerPosition.set(at[0], 0, at[1] + 0.8);
    controller.world = { trace: () => null };
    controller.updateTarget = () => {};
    controller.render = () => {};
    controller.handle("field-onward-act", {
      value: choice === "sheltered" ? "1" : "0",
    });
    assert.equal(controller.state.events.length, 3, refusal);
    assert.equal(
      controller.state.events[2].returnedChecksum,
      choice === "sheltered" ? "17-A2" : "17-C1",
    );
    assert.equal(
      controller.currentSite.userData.needle.rotation.z,
      choice === "sheltered" ? 0.7 : 0,
    );
    assert.equal(
      controller.currentSite.userData.gauge.material.emissiveIntensity,
      0.6,
    );
  });
