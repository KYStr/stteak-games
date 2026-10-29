import * as THREE from "./vendor/three.module.js";
import { moveCircle, makeBox } from "./physics.js";
import { createFieldProp } from "./field-props.js";
import { tetherPosition } from "./cargo-tether.js";
import {
  FIELD_WORK,
  createFieldState,
  recordFieldStep,
  applyFieldChoice,
  fieldWorkComplete,
} from "./expansion-content.js";

const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const distance = (a, b) => Math.hypot(a.x - b.x, a.z - b.z);
const position = (p, y = 0) => new THREE.Vector3(p[0], y, p[1]);
const escape = (value) =>
  String(value ?? "").replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ],
  );
const travelKinds = new Set([
  "carry-route",
  "push-route",
  "escort-route",
  "escort-arrival",
  "player-overlap",
  "checkpoint-operate",
  "carry-drop-zone",
  "park-object",
]);
const choiceDetents = {
  siding: -1,
  direct: 1,
  "keep-first-aid": -1,
  "donate-reserve": 1,
  "sheltered-relay": -1,
  "direct-mast": 1,
  "west-ford": -1,
  "east-ridge": 1,
};
const baseKinds = {
  "mail-seal": "medicine",
  "mail-switch": "signal",
  "mail-unload": "medicine",
  "water-bypass": "water-valve",
  "water-allocation": "water-valve",
  "water-reserve": "water-valve",
  "signal-earth": "signal",
  "signal-patch": "telegraph",
  "signal-relay": "signal",
  "ledger-carriage": "ledger",
  "ledger-carbon": "ledger",
  "ledger-copy": "ledger",
  "night-route-plan": "water-valve",
  "night-brace": "ledger",
  "night-escort": "evacuation",
  "pact-feed": "signal",
  "pact-cart": "evacuation",
  "pact-lights": "signal",
};

// Snapshot nearby collision triangles once per explicit placement attempt. Use
// the original World.solids even when render batching hides their source mesh.
function placementSurfaces(solids, region) {
  const surfaces = [],
    matrix = new THREE.Matrix4(),
    instance = new THREE.Matrix4();
  for (const mesh of solids) {
    const geometry = mesh.geometry;
    if (!mesh.isMesh || !geometry?.attributes.position || !mesh.material)
      continue;
    mesh.updateWorldMatrix(true, true);
    if (!geometry.boundingBox) geometry.computeBoundingBox();
    for (let n = 0; n < (mesh.isInstancedMesh ? mesh.count : 1); n++) {
      matrix.copy(mesh.matrixWorld);
      if (mesh.isInstancedMesh) {
        mesh.getMatrixAt(n, instance);
        matrix.multiply(instance);
      }
      const box = geometry.boundingBox.clone().applyMatrix4(matrix);
      if (!box.intersectsBox(region)) continue;
      const indices = geometry.index,
        count = indices ? indices.count : geometry.attributes.position.count,
        ranges = Array.isArray(mesh.material)
          ? geometry.groups.filter((g) => mesh.material[g.materialIndex])
          : [{ start: 0, count }];
      for (const range of ranges) {
        const first = Math.max(geometry.drawRange.start, range.start),
          last = Math.min(
            count,
            geometry.drawRange.start + geometry.drawRange.count,
            range.start + range.count,
          );
        for (let i = first; i + 2 < last; i += 3) {
          const points = [0, 1, 2].map((offset) =>
            mesh
              .getVertexPosition(
                indices ? indices.getX(i + offset) : i + offset,
                new THREE.Vector3(),
              )
              .applyMatrix4(matrix),
          );
          const bounds = new THREE.Box3().setFromPoints(points);
          if (bounds.intersectsBox(region)) surfaces.push({ points, bounds });
        }
      }
    }
  }
  return surfaces;
}

function placementSurfaceHeight(surfaces, footprint, ceiling) {
  let highest = 0;
  for (const { points, bounds } of surfaces) {
    if (
      bounds.max.x < footprint.minX ||
      bounds.min.x > footprint.maxX ||
      bounds.max.z < footprint.minZ ||
      bounds.min.z > footprint.maxZ
    )
      continue;
    let polygon = points;
    // Exact triangle/rectangle projection clipping, retaining interpolated Y.
    // A linear triangle reaches its clipped maximum at one of these vertices;
    // this covers narrow ribs between samples and sloped/vertical faces too.
    for (const [axis, edge, sign] of [
      ["x", footprint.minX, 1],
      ["x", footprint.maxX, -1],
      ["z", footprint.minZ, 1],
      ["z", footprint.maxZ, -1],
    ]) {
      const clipped = [];
      for (let i = 0; i < polygon.length; i++) {
        const a = polygon[i],
          b = polygon[(i + 1) % polygon.length],
          da = (a[axis] - edge) * sign,
          db = (b[axis] - edge) * sign;
        if (da >= 0) clipped.push(a);
        if (da >= 0 !== db >= 0)
          clipped.push(a.clone().lerp(b, da / (da - db)));
      }
      polygon = clipped;
      if (!polygon.length) break;
    }
    if (!polygon.length) continue;
    const low = Math.min(...polygon.map((p) => p.y)),
      high = Math.max(...polygon.map((p) => p.y));
    if (high < -1 || low > ceiling) continue;
    // A face continuing above the low landing band is an obstacle, not a
    // surface onto which releasing may lift cargo. Do not clamp into that face.
    if (high > 0.5) return Infinity;
    highest = Math.max(highest, high);
  }
  return highest;
}

/**
 * Mission-local physical work. The host pauses combat while panel() is open and
 * calls update only while playing. No document listeners, storage writes, wallet
 * mutation, timers or player teleportation are installed by this class.
 *
 * Effects are delivered once, after close(), as effect(effect,{taskId,position}).
 * Keys are the authored world/flags/route/escortRoute/allocation,
 * carrySpeedMultiplier, alertDelta, exposureSeconds, permanentDamage,
 * blocksInput, message, fieldHealCharges/fieldHealAmount,
 * extractionRewardDelta, enemyAmmoMultiplier. Extraction deltas stay in state;
 * the host commits them only at extraction. Error alert is capped at +3 per exit.
 */
export class FieldSystem {
  constructor(world, missionId, callbacks = {}) {
    if (!FIELD_WORK[missionId])
      throw new Error(`Unknown field mission: ${missionId}`);
    this.world = world;
    this.missionId = missionId;
    this.callbacks = callbacks;
    this.state = createFieldState(missionId);
    this.traversal = null;
    this.active = null;
    this.cameraSnapshot = null;
    this.playerPosition = null;
    this.lastPlayer = null;
    this.pendingEffects = [];
    this.textures = new Set();
    this.ownedColliders = [];
    this.group = new THREE.Group();
    this.group.name = `field-work-${missionId}`;
    world.level.add(this.group);
    this.group.addEventListener("removed", () => this.releaseTextures());
    this.tasks = FIELD_WORK[missionId].tasks.map((data) => ({
      ...data,
      data,
      parts: {},
      values: {},
      seated: {},
      touched: new Set(),
      inspections: new Set(),
      completedEvents: new Set(),
      reached: new Set(),
      selectedChoice: null,
      members: [],
      cargo: null,
      carrying: false,
      anchor: null,
    }));
    for (const task of this.tasks) this.buildTask(task);
    if (missionId === "dry-mail") {
      const unload = this.tasks.find((t) => t.id === "mail-unload"),
        seal = this.tasks.find((t) => t.id === "mail-seal");
      unload.cargo = seal.object;
      unload.cargoOwner = seal;
      unload.parts["medicine-crate"] = seal.object;
      unload.anchor = seal.object;
    }
    this.group.updateMatrixWorld(true);
  }
  get complete() {
    return fieldWorkComplete(this.state);
  }
  get carrying() {
    return Boolean(
      this.traversal?.carrying || this.tasks.some((task) => task.carrying),
    );
  }
  get handsOccupied() {
    return this.carrying;
  }
  missingClues(task) {
    return this.callbacks.hasClue
      ? (task.requiredClues || []).filter((id) => !this.callbacks.hasClue(id))
      : [];
  }
  available(task) {
    return (
      this.callbacks.available?.(task) !== false &&
      (task.dependencies || []).every((id) => this.state.completed.includes(id))
    );
  }
  done(task) {
    return this.state.completed.includes(task.id);
  }
  recorded(task, step) {
    return (this.state.progress[task.id] || []).includes(
      typeof step === "string" ? step : step.id,
    );
  }
  allSteps(task) {
    const steps = [
      ...task.physicalSteps,
      ...task.choices.flatMap((option) => option.requiredSteps || []),
    ];
    return [...new Map(steps.map((step) => [step.id, step])).values()];
  }
  currentSteps(task) {
    return [
      ...task.physicalSteps,
      ...(task.choices.find((c) => c.id === task.selectedChoice)
        ?.requiredSteps || []),
    ];
  }
  notify(text) {
    this.callbacks.toast?.(text);
  }

  material(color, extra = {}) {
    return new THREE.MeshStandardMaterial({ color, roughness: 0.83, ...extra });
  }
  addMesh(
    parent,
    name,
    geometry,
    color,
    xyz = [0, 0, 0],
    rotation = [0, 0, 0],
    extra = {},
  ) {
    const object = new THREE.Mesh(geometry, this.material(color, extra));
    object.name = name;
    object.position.set(...xyz);
    object.rotation.set(...rotation);
    object.castShadow = true;
    object.receiveShadow = true;
    parent.add(object);
    return object;
  }
  box(parent, name, size, color, xyz = [0, 0, 0], rotation = [0, 0, 0]) {
    return this.addMesh(
      parent,
      name,
      new THREE.BoxGeometry(...size),
      color,
      xyz,
      rotation,
    );
  }
  label(parent, text, xyz, size = [0.9, 0.22], rotation = [0, 0, 0]) {
    const canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 128;
    const context = canvas.getContext("2d");
    context.fillStyle = "#e5d5a6";
    context.fillRect(0, 0, 512, 128);
    context.strokeStyle = "#76674a";
    context.lineWidth = 8;
    context.strokeRect(4, 4, 504, 120);
    context.fillStyle = "#293d37";
    context.font = "bold 43px sans-serif";
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillText(text, 256, 64, 480);
    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    this.textures.add(texture);
    return this.addMesh(
      parent,
      `label-${text}`,
      new THREE.PlaneGeometry(...size),
      0xffffff,
      xyz,
      rotation,
      { map: texture, side: THREE.DoubleSide, roughness: 1 },
    );
  }
  marker(point, radius = 1, color = 0xb9e2c3) {
    const ring = this.addMesh(
      this.group,
      "field-zone",
      new THREE.RingGeometry(radius - 0.045, radius, 32),
      color,
      [point[0], 0.055, point[1]],
      [-Math.PI / 2, 0, 0],
      { side: THREE.DoubleSide },
    );
    ring.castShadow = false;
    return ring;
  }
  bind(task, key, node, type = "lever", initial = 0, extra = {}) {
    task.parts[key] = node;
    task.values[key] = initial;
    node.userData.fieldControl = {
      type,
      initial,
      basePosition: node.position.clone(),
      baseRotation: node.rotation.clone(),
      ...extra,
    };
    if (type === "lever" && initial) node.rotation.z = initial * 1.05;
    return node;
  }
  control(
    task,
    key,
    type = "lever",
    initial = 0,
    xyz = [0, 1, 0.5],
    extra = {},
  ) {
    const node = new THREE.Group();
    node.name = `${task.id}--${key}`;
    node.position.set(...xyz);
    task.object.add(node);
    if (type === "wheel" || type === "meter") {
      this.addMesh(
        node,
        "rim",
        new THREE.TorusGeometry(0.18, 0.023, 5, 20),
        0xa7553c,
      );
      for (const angle of [0, Math.PI / 3, (Math.PI * 2) / 3])
        this.box(
          node,
          "spoke",
          [0.32, 0.025, 0.03],
          0xc3a35d,
          [0, 0, 0],
          [0, 0, angle],
        );
      this.box(
        node,
        "pointer",
        [0.025, 0.1, 0.025],
        0xe5d5a6,
        [0, 0.12, 0.025],
      );
    } else if (type === "sheet") {
      this.box(node, "surface", [0.6, 0.035, 0.38], 0xd7c99c);
      for (const x of [-0.24, 0.24])
        this.addMesh(
          node,
          "registration-hole",
          new THREE.TorusGeometry(0.035, 0.009, 4, 12),
          0x303631,
          [x, 0.026, 0],
          [-Math.PI / 2, 0, 0],
        );
    } else if (type === "frame") {
      for (const x of [-0.31, 0.31])
        this.box(node, "frame-side", [0.025, 0.36, 0.035], 0xc3a35d, [x, 0, 0]);
      for (const y of [-0.17, 0.17])
        this.box(node, "frame-edge", [0.64, 0.025, 0.035], 0xc3a35d, [0, y, 0]);
    } else if (type === "plug") {
      this.addMesh(
        node,
        "grip",
        new THREE.CylinderGeometry(0.055, 0.055, 0.15, 8),
        0xc3a35d,
        [0, 0, 0],
        [Math.PI / 2, 0, 0],
      );
      this.addMesh(
        node,
        "pin",
        new THREE.CylinderGeometry(0.024, 0.024, 0.12, 8),
        0x84918d,
        [0, 0, -0.1],
        [Math.PI / 2, 0, 0],
      );
    } else if (type === "brace")
      this.box(node, "diagonal-plank", [0.12, 1.3, 0.09], 0xad8855);
    else {
      this.box(node, "shaft", [0.045, 0.3, 0.04], 0xc3a35d, [0, 0.15, 0]);
      this.box(node, "grip", [0.15, 0.055, 0.065], 0xa7553c, [0, 0.31, 0]);
    }
    return this.bind(task, key, node, type, initial, extra);
  }
  slotPanel(task, step, index) {
    const options =
      step.socket === "earth-socket"
        ? ["battery-socket", "earth-socket", "service-socket"]
        : step.kind === "socket-match"
          ? ["company-square", "triangle-public", "circle-families"]
          : step.slot === "A17-314"
            ? ["A17-341", "A17-314", "A71-314"]
            : step.slot === "two-pins"
              ? ["left-offset", "two-pins", "right-offset"]
              : ["horizontal", "upper-left-lower-right", "reverse-diagonal"];
    const glyphs =
      step.socket === "earth-socket"
        ? ["⚡", "≡", "□"]
        : step.kind === "socket-match"
          ? ["□", "△", "○"]
          : step.slot === "A17-314"
            ? options
            : step.slot === "two-pins"
              ? ["偏左", "兩孔重合", "偏右"]
              : ["橫撐", "對角插座", "反對角"];
    const height = 1.08 + index * 0.42;
    this.box(task.object, "patch-board", [1.45, 0.34, 0.07], 0x397d7a, [
      0,
      height,
      0.39,
    ]);
    const slots = options.map((id, i) => {
      const node = new THREE.Group();
      node.name = `${task.id}--${step.target}-slot-${i}`;
      node.position.set(-0.5 + i * 0.5, height, 0.45);
      task.object.add(node);
      this.addMesh(
        node,
        "socket",
        new THREE.TorusGeometry(0.065, 0.018, 5, 16),
        0xc3a35d,
      );
      this.label(node, glyphs[i], [0, 0.12, 0.018], [0.32, 0.12]);
      return { id, node };
    });
    const node = this.control(
      task,
      step.target,
      step.kind === "socket-match"
        ? "plug"
        : step.slot === "upper-left-lower-right"
          ? "brace"
          : step.slot === "two-pins"
            ? "sheet"
            : "frame",
      0,
      [-0.5, height, 0.76],
      { slots, goal: step.socket || step.slot },
    );
    if (step.target === "brace") {
      node.scale.set(0.75, 0.75, 0.75);
      node.position.set(0, 0.68, 0.42);
      node.userData.fieldControl.basePosition = node.position.clone();
      const sockets = [
        new THREE.Vector3(-0.3447, 1.0247, 0.42),
        new THREE.Vector3(0.3447, 0.3353, 0.42),
      ];
      node.userData.fieldControl.endSockets = sockets;
      for (const p of sockets)
        this.addMesh(
          task.object,
          "brace-end-socket",
          new THREE.TorusGeometry(0.06, 0.016, 5, 16),
          0xc3a35d,
          p.toArray(),
        );
    }
    if (step.target === "carbon-sheet") {
      node.position.y = 1.04;
      node.position.z = 0.1;
      node.userData.fieldControl.basePosition = node.position.clone();
    }
    return node;
  }
  buildTask(task) {
    const object = createFieldProp(baseKinds[task.id], THREE);
    object.name = `task-${task.id}`;
    object.position.copy(position(task.position));
    task.object = object;
    this.group.add(object);
    const take = (key) =>
      object.getObjectByName(object.userData.dynamicParts[key]?.node);
    if (task.id === "mail-unload") {
      object.visible = false;
      task.pallet = this.box(
        this.group,
        "receiving-pallet",
        [1.8, 0.09, 1.5],
        0xd7c99c,
        [...position(task.position, 0.045)],
      );
      task.parts["receiving-pallet"] = task.pallet;
      task.dropMarker = this.marker(task.position, 1.25);
    }
    if (task.id === "mail-seal") {
      this.bind(task, "case", object, "case", 0);
      const seal = new THREE.Group();
      seal.position.set(0, 0.55, -0.39);
      seal.rotation.y = Math.PI;
      object.add(seal);
      this.addMesh(
        seal,
        "lead-seal",
        new THREE.CylinderGeometry(0.1, 0.1, 0.025, 12),
        0xc3a35d,
        [0, 0, 0],
        [Math.PI / 2, 0, 0],
      );
      for (const x of [-0.055, 0, 0.055])
        this.box(seal, "notch", [0.018, 0.07, 0.022], 0x303631, [
          x,
          0.055,
          0.02,
        ]);
      this.label(seal, "△  三缺口", [0, -0.16, 0.025], [0.55, 0.14]);
      task.parts.seal = seal;
    }
    if (task.id === "water-bypass") {
      this.bind(task, "bypass-wheel", take("wheel"), "wheel", 0);
      this.bind(task, "pressure-needle", take("gauge-needle"), "wheel", 0);
      const split = this.addMesh(
        object,
        "split-joint",
        new THREE.CylinderGeometry(0.095, 0.095, 0.55, 10),
        0x84918d,
        [-0.3, 0.55, 0.1],
      );
      this.box(
        split,
        "crack",
        [0.045, 0.22, 0.015],
        0x303631,
        [0, 0, 0.09],
        [0, 0, 0.25],
      );
      task.parts["split-joint"] = split;
    }
    if (task.id === "water-allocation") {
      take("wheel").visible = false;
      for (const [i, key] of ["clinic", "homes", "mine"].entries()) {
        this.control(task, key, "meter", 0, [-0.55 + i * 0.55, 1.05, 0.48]);
        const flow = this.box(
          object,
          `flow-${key}`,
          [0.07, 0.12, 0.07],
          0x6cbbb0,
          [-0.55 + i * 0.55, 0.35, 0.5],
        );
        task.parts[`flow-${key}`] = flow;
        this.label(
          object,
          `${["診所", "住區", "礦場"][i]} ${[2, 2, 1][i]}格`,
          [-0.55 + i * 0.55, 1.36, 0.49],
          [0.48, 0.15],
        );
      }
    }
    if (task.id === "water-reserve") {
      this.control(task, "reserve-spout", "wheel", 0, [0, 1.08, 0.45], {
        axis: "y",
        branch: true,
      });
      task.parts["reserve-level"] = this.addMesh(
        object,
        "reserve-level",
        new THREE.CylinderGeometry(0.2, 0.2, 0.45, 12),
        0x6cbbb0,
        [0.4, 0.42, 0.1],
      );
      for (const [i, key] of [
        "maintenance-trough",
        "public-trough",
      ].entries()) {
        task.parts[key] = this.box(object, key, [0.35, 0.13, 0.3], 0x397d7a, [
          -0.4 + i * 0.8,
          0.1,
          0.6,
        ]);
        this.label(
          object,
          i ? "公用 +15" : "備水 +20生命",
          [-0.4 + i * 0.8, 0.45, 0.62],
          [0.62, 0.15],
        );
      }
    }
    if (task.id === "ledger-carriage") {
      const tag = this.box(
        object,
        "freight-tag",
        [0.6, 0.35, 0.04],
        0xe5d5a6,
        [0, 1.4, 0.2],
      );
      this.label(tag, "A17 / 過站票", [0, 0, 0.024], [0.55, 0.28]);
      this.label(
        tag,
        "A17 / 314",
        [0, 0, -0.024],
        [0.55, 0.28],
        [0, Math.PI, 0],
      );
      this.bind(task, "tag", tag, "case", 0);
    }
    if (task.id === "ledger-carbon") {
      const pins = new THREE.Group();
      pins.position.set(0, 1.02, 0.1);
      object.add(pins);
      for (const x of [-0.24, 0.24])
        this.addMesh(
          pins,
          "pin",
          new THREE.CylinderGeometry(0.018, 0.018, 0.12, 8),
          0xc3a35d,
          [x, 0.04, 0],
        );
      task.parts.pins = pins;
      const lamp = this.control(task, "raking-lamp", "wheel", 0, [0, 1.1, 0]);
      const light = new THREE.SpotLight(0xffe5ad, 2, 5, 0.65, 0.4, 1);
      light.position.set(-1.05, 0.25, 0.95);
      light.castShadow = true;
      light.shadow.mapSize.set(256, 256);
      lamp.add(light);
      light.target = pins;
      task.parts["raking-light"] = light;
      const marks = this.box(
        object,
        "raised-impression",
        [0.3, 0.025, 0.025],
        0x6d5f41,
        [0, 1.067, 0.1],
        [0, 0.3, 0],
      );
      this.box(
        marks,
        "signature-stroke",
        [0.025, 0.035, 0.16],
        0x6d5f41,
        [0.08, 0.01, 0],
      );
      task.parts["raised-impression"] = marks;
    }
    if (task.id === "ledger-copy") {
      const paper = this.box(
        object,
        "copy-tray",
        [0.37, 0.025, 0.28],
        0xe5d5a6,
        [0.35, 0.86, 0.1],
      );
      task.parts["copy-tray"] = paper;
      task.cargo = paper;
      this.control(task, "press-handle", "lever", 0, [-0.3, 1, 0.1]);
    }
    if (task.id === "night-brace") {
      object.visible = false;
      task.object = new THREE.Group();
      task.object.name = object.name;
      task.object.position.copy(position(task.position));
      this.group.add(task.object);
      for (const x of [-0.6, 0.6])
        this.box(task.object, "support-post", [0.12, 1.3, 0.12], 0x79583b, [
          x,
          0.65,
          -0.5,
        ]);
      task.parts["test-board"] = this.box(
        task.object,
        "test-board",
        [1.35, 0.08, 1.2],
        0xad8855,
        [0, 0.04, 0.1],
      );
      this.marker(task.position, 1.1);
    }
    if (task.id === "night-escort") {
      object.visible = false;
      task.members = ["npc-mara", "npc-june", "npc-elias"].map((name, i) =>
        this.world.actor(
          name,
          task.position[0] + (i - 1) * 0.65,
          task.position[1] + Math.abs(i - 1) * 0.35,
        ),
      );
      task.parts["evacuee-group"] = task.members[1].object;
      task.anchor = task.members[1].object;
    }
    if (task.id === "pact-cart") {
      object.rotation.y = Math.PI;
      task.cargo = object;
      task.parts.cart = object;
      this.control(task, "cart-brake", "lever", 1, [0.55, 0.8, -0.7]);
    }
    if (task.id === "pact-lights") {
      const lid = this.control(
        task,
        "battery-lid",
        "lever",
        0,
        [-0.25, 0.6, 0.3],
      );
      lid.children.forEach((c) => (c.visible = false));
      this.box(lid, "lid", [0.48, 0.08, 0.4], 0x397d7a, [0.15, 0, 0]);
      task.parts.battery = this.box(
        object,
        "removable-battery",
        [0.24, 0.25, 0.2],
        0x303631,
        [-0.25, 0.3, 0.35],
      );
      const beam = this.addMesh(
        object,
        "searchlight-beam",
        new THREE.ConeGeometry(1, 3, 20, 1, true),
        0xf4d784,
        [0, 1.5, 1.8],
        [-Math.PI / 2, 0, 0],
        {
          transparent: true,
          opacity: 0.17,
          depthWrite: false,
          side: THREE.DoubleSide,
        },
      );
      beam.castShadow = false;
      task.parts.searchlight = beam;
    }
    let socketRow = 0;
    for (const step of this.allSteps(task)) {
      // Flow controllers bind their actual scene props after construction.
      // A generic substitute here would create a second, unrelated control.
      if (step.flowOnly) continue;
      if (
        ["socket-match", "align-parts"].includes(step.kind) &&
        !task.parts[step.target]
      )
        this.slotPanel(task, step, socketRow++);
      if (
        ["operate-part", "ordered-lever", "rotate-part"].includes(step.kind) &&
        !task.parts[step.target]
      )
        this.control(
          task,
          step.target,
          step.kind === "rotate-part" ||
            /wheel|selector|spout|arm/.test(step.target)
            ? "wheel"
            : "lever",
          step.targetDetent === 0 ? 1 : 0,
          [0, 1.13, 0.48],
          {
            branch: [
              "switch",
              "reserve-spout",
              "route-arm",
              "relay-selector",
            ].includes(step.target),
          },
        );
      if (step.kind === "inspect-part" && !task.parts[step.target]) {
        const plaque = this.box(
          task.object,
          step.target,
          [0.68, 0.3, 0.045],
          0x397d7a,
          [0, 1.42, 0.5],
        );
        this.label(
          plaque,
          task.id === "pact-feed"
            ? "軍用 ↔ 民生"
            : task.id === "night-route-plan"
              ? "水位 1 / 安全 2"
              : "← 西線 / 東線 →",
          [0, 0, 0.03],
          [0.64, 0.25],
        );
        task.parts[step.target] = plaque;
      }
      if (step.kind === "checkpoint-operate" && !task.parts[step.target]) {
        const relay = createFieldProp("signal", THREE);
        relay.scale.setScalar(0.65);
        relay.position.copy(position(step.position));
        relay.name = `${task.id}-${step.target}`;
        this.group.add(relay);
        task.parts[step.target] = relay;
        this.marker(step.position, step.radius);
      }
      if (step.kind === "carry-drop-zone" && !task.parts[step.target]) {
        const receiving = this.box(
          this.group,
          step.target,
          [0.9, 0.08, 0.7],
          0xd7c99c,
          [...position(step.position, 0.04)],
        );
        task.parts[step.target] = receiving;
        this.marker(step.position, step.radius);
        this.label(
          receiving,
          step.target === "notice-board" ? "公告欄" : "接收區",
          [0, 0.1, 0.35],
          [0.75, 0.18],
        );
      }
    }
    if (task.id === "mail-switch") {
      const railGroup = new THREE.Group();
      railGroup.position.set(0, 0.03, 0.15);
      task.object.add(railGroup);
      for (const x of [-0.16, 0.16])
        this.box(railGroup, "turnout-rail", [0.055, 0.07, 1.4], 0x84918d, [
          x,
          0,
          0,
        ]);
      task.parts.points = railGroup;
    }
    if (task.id === "signal-relay") {
      task.parts.antenna = this.addMesh(
        task.object,
        "telescopic-antenna",
        new THREE.CylinderGeometry(0.025, 0.035, 1.2, 8),
        0x84918d,
        [0, 1.9, 0],
      );
    }
    if (task.id === "pact-feed") {
      for (const [i, key] of ["military-feed", "civilian-feed"].entries()) {
        if (!task.parts[key])
          this.control(task, key, "lever", 1, [-0.35 + i * 0.7, 1.05, 0.42]);
        this.label(
          task.object,
          i ? "水 / 醫療" : "軍用 彈藥",
          [-0.35 + i * 0.7, 1.55, 0.43],
          [0.62, 0.18],
        );
        const end = this.box(
          task.object,
          `${key}-store`,
          [0.42, 0.28, 0.32],
          i ? 0x397d7a : 0xa7553c,
          [-0.55 + i * 1.1, 0.2, 0.05],
        );
        const curve = new THREE.CatmullRomCurve3([
          new THREE.Vector3(-0.35 + i * 0.7, 1.05, 0.38),
          new THREE.Vector3(-0.55 + i * 1.1, 0.7, 0.25),
          end.position,
        ]);
        this.addMesh(
          task.object,
          `${key}-pipe`,
          new THREE.TubeGeometry(curve, 8, 0.025, 5, false),
          0xc3a35d,
        );
      }
    }
    task.marker = this.marker(task.position, 0.7, 0xb9c29b);
    if (!["night-brace", "night-escort", "mail-unload"].includes(task.id)) {
      const b = makeBox(
        `field-${task.id}`,
        task.position[0],
        task.position[1],
        task.prop.footprint[0],
        1.5,
        task.prop.footprint[1],
        "field-work",
      );
      b.fieldTask = task.id;
      task.collider = b;
      this.ownedColliders.push(b);
      this.world.colliders.push(b);
      this.world.solid?.(task.object, b, { occludes: false });
    }
  }

  taskPoint(task) {
    const object = task.anchor || task.object;
    return object.getWorldPosition(new THREE.Vector3());
  }
  interactionRadius(task, fallback = 2.5) {
    return this.callbacks.interactionRadius?.(task) ?? fallback;
  }
  getNearby(playerPosition) {
    this.playerPosition = new THREE.Vector3(
      playerPosition.x,
      playerPosition.y || 0,
      playerPosition.z,
    );
    if (
      this.traversal &&
      distance(this.playerPosition, this.taskPoint(this.traversal.task)) <
        this.interactionRadius(this.traversal.task)
    )
      return this.traversal.task;
    return (
      this.tasks
        .filter((task) => !this.done(task) && this.available(task))
        .map((task) => ({
          task,
          d: distance(this.playerPosition, this.taskPoint(task)),
        }))
        .filter((entry) => entry.d <= this.interactionRadius(entry.task))
        .sort((a, b) => a.d - b.d)[0]?.task || null
    );
  }
  saveCamera() {
    if (this.cameraSnapshot) return;
    const camera = this.world.camera;
    this.cameraSnapshot = {
      position: camera.position.clone(),
      quaternion: camera.quaternion.clone(),
      up: camera.up.clone(),
      left: camera.left,
      right: camera.right,
      top: camera.top,
      bottom: camera.bottom,
      zoom: camera.zoom,
    };
  }
  focus(task, node = task.anchor || task.object, angle = 0) {
    this.saveCamera();
    task.focus = node;
    task.viewAngle = angle;
    const center = node.getWorldPosition(new THREE.Vector3());
    if (node === task.object) center.y += 0.9;
    const camera = this.world.camera,
      aspect = Math.max(
        1,
        this.world.renderer.domElement.clientWidth /
          this.world.renderer.domElement.clientHeight,
      ),
      height = 3.8,
      width = height * aspect;
    camera.left = -width * 0.32;
    camera.right = width * 0.68;
    camera.top = height / 2;
    camera.bottom = -height / 2;
    camera.zoom = 1;
    camera.position
      .copy(center)
      .add(
        new THREE.Vector3(Math.sin(angle) * 3.8, 1.55, Math.cos(angle) * 3.8),
      );
    camera.lookAt(center);
    camera.updateProjectionMatrix();
    camera.updateMatrixWorld(true);
    this.renderWorld();
  }
  restoreCamera() {
    if (!this.cameraSnapshot) return;
    const camera = this.world.camera,
      saved = this.cameraSnapshot;
    camera.position.copy(saved.position);
    camera.quaternion.copy(saved.quaternion);
    camera.up.copy(saved.up);
    for (const key of ["left", "right", "top", "bottom", "zoom"])
      camera[key] = saved[key];
    camera.updateProjectionMatrix();
    camera.updateMatrixWorld(true);
    this.cameraSnapshot = null;
  }
  renderWorld() {
    this.group.updateMatrixWorld(true);
    this.world.renderer.render(this.world.scene, this.world.camera);
  }
  open(task) {
    task =
      typeof task === "string"
        ? this.tasks.find((entry) => entry.id === task)
        : task;
    if (!task || this.done(task) || !this.available(task)) return false;
    if (this.missingClues(task).length) {
      this.notify(
        `先查閱所需線索：${this.missingClues(task)
          .map((id) => this.callbacks.clueTitle?.(id) || "附近的委託線索")
          .join("、")}。`,
      );
      return false;
    }
    if (
      !this.playerPosition ||
      distance(this.playerPosition, this.taskPoint(task)) >
        this.interactionRadius(task, 2.6)
    ) {
      this.notify("請走近實體工作台再操作。");
      return false;
    }
    this.active = task;
    this.focus(task);
    this.renderPanel();
    return true;
  }
  button(action, label, data = "", disabled = false) {
    return `<button type="button" data-action="field-${action}" ${data} ${disabled ? "disabled" : ""}>${escape(label)}</button>`;
  }
  renderPanel(message = "") {
    const task = this.active;
    if (!task) return;
    if (this.done(task)) {
      this.callbacks.panel?.(
        `<div class="field-work"><p class="eyebrow">現場工作完成</p><h2>${escape(task.title)}</h2><p>${escape(message || "實體操作與方案已記錄。")}</p>${this.callbacks.extraControls?.(task) || ""}${this.button("close", "返回現場")}</div>`,
      );
      this.renderWorld();
      return;
    }
    const steps = this.currentSteps(task),
      remaining = steps.find((step) => !this.recorded(task, step));
    const controls = steps
      .map((step) => {
        const recorded = this.recorded(task, step),
          node = task.parts[step.target],
          value = task.values[step.target],
          control = node?.userData.fieldControl;
        let ui = "";
        if (
          [
            "rotate-part",
            "operate-part",
            "ordered-lever",
            "set-meter",
          ].includes(step.kind)
        )
          ui = `<span class="field-value">目前 ${value ?? 0} ${step.kind === "set-meter" ? "格" : "檔"}</span>${this.button("adjust", "−", `data-step="${step.id}" data-delta="-1"`)}${this.button("adjust", "＋", `data-step="${step.id}" data-delta="1"`)}`;
        else if (["socket-match", "align-parts"].includes(step.kind))
          ui = `<span class="field-value">${escape(control?.slots?.[value]?.id || "未對位")}</span>${this.button("adjust", "移左", `data-step="${step.id}" data-delta="-1"`)}${this.button("adjust", "移右", `data-step="${step.id}" data-delta="1"`)}${this.button("seat", step.kind === "socket-match" ? "推入插頭" : "扣入插座", `data-step="${step.id}"`)}`;
        else if (step.kind === "inspect-part")
          ui =
            this.button("focus", "拉近觀看", `data-step="${step.id}"`) +
            this.button("inspect", "讀取零件", `data-step="${step.id}"`);
        else
          ui = this.button(
            "step",
            recorded
              ? "已完成"
              : step.kind === "carry-drop-zone"
                ? this.dropZoneReady(task, step)
                  ? "放入接收區並交付"
                  : "前往接收區"
                : travelKinds.has(step.kind)
                  ? "前往 / 現場操作"
                  : "操作實體",
            `data-step="${step.id}"`,
            recorded,
          );
        return `<div class="field-step"><b>${recorded ? "✓" : "○"} ${escape(step.title)}</b><div>${ui}</div></div>`;
      })
      .join("");
    const choices = task.choices
      .map(
        (choice) =>
          this.button(
            "choice",
            `${task.selectedChoice === choice.id ? "已選方案 · " : ""}${choice.label}`,
            `data-choice="${choice.id}"`,
          ) +
          (choice.tradeoff ? `<small>${escape(choice.tradeoff)}</small>` : ""),
      )
      .join("");
    const held =
      !task.cargoDelivered &&
      (this.traversal?.task === task || task.carrying || task.cargoEverPicked);
    this.callbacks.panel?.(
      `<div class="field-work"><style>.field-work{font-size:13px;line-height:1.6}.field-work h2{font-size:22px;margin:8px 0}.field-work p{font-size:13px}.field-step{padding:10px 0;border-top:1px solid #b4b19150}.field-step b{display:block}.field-step div{display:flex;gap:6px;flex-wrap:wrap;align-items:center;margin-top:6px}.field-work button{padding:8px 11px;min-height:44px;font-size:13px}.field-value{min-width:76px;color:#e5ca89}.field-options{display:grid;gap:8px;margin-top:16px}.field-options small{color:#b9c8b0}.field-work details{margin:12px 0}.field-message{color:#f1d68c;padding:8px 0}.field-toolbar{display:flex;gap:7px;flex-wrap:wrap}</style><p class="eyebrow">現場工作 · ${this.state.completed.length + 1} / ${this.tasks.length}</p><h2>${escape(task.title)}</h2><p>${escape(task.description)}</p><div class="field-toolbar">${this.button("view", "視角 ↶", 'data-delta="-1"')}${this.button("view", "視角 ↷", 'data-delta="1"')}${this.button("close", "返回現場")}</div>${message ? `<div class="field-message" role="status">${escape(message)}</div>` : ""}<details><summary>查看刻記與提示（免費）</summary>${task.hints.map((h) => `<p>${escape(h)}</p>`).join("")}</details>${controls}${this.callbacks.extraControls?.(task) || ""}${held ? `<div class="field-toolbar">${this.button("release", task.cargo ? "暫放地上（尚未交付）" : "在此停等")}${this.button("resume", "重新拿起 / 跟隨")}</div>` : ""}<div class="field-options">${choices}</div><small>閱讀時戰場暫停；返回現場後，才套用警戒與資源效果。${remaining ? " 下一步：" + escape(remaining.title) : " 實體步驟已完成，可以確認方案。"}</small></div>`,
    );
    this.renderWorld();
  }
  close() {
    this.active = null;
    this.restoreCamera();
    this.callbacks.close?.();
    const effects = this.pendingEffects.splice(0);
    let errorAlert = 0;
    for (const entry of effects) {
      const effect = { ...entry.effect };
      if (effect.blocksInput === false && effect.alertDelta > 0) {
        const allowed = Math.min(effect.alertDelta, 3 - errorAlert);
        errorAlert += allowed;
        effect.alertDelta = allowed;
      }
      this.callbacks.effect?.(effect, {
        taskId: entry.task.id,
        position: [...entry.task.position],
      });
    }
  }
  step(task, id) {
    return this.allSteps(task).find((entry) => entry.id === id);
  }
  record(task, step) {
    const result = recordFieldStep(this.state, task.id, step.id);
    this.state = result.state;
    if (result.accepted) {
      task.completedEvents.add(step.id);
      task.lastObservation = this.callbacks.recordStep?.(task, step) || "";
    }
    return result.accepted;
  }
  unrecord(task, step) {
    this.state.progress[task.id] = (this.state.progress[task.id] || []).filter(
      (id) => id !== step.id,
    );
    task.completedEvents.delete(step.id);
    for (const dependent of this.allSteps(task).filter(
      (entry) => entry.after === step.id,
    )) {
      this.unrecord(task, dependent);
      if (dependent.kind === "ordered-lever") {
        task.values[dependent.target] = 0;
        task.parts[dependent.target].rotation.z = 0;
        task.touched.delete(dependent.target);
      }
    }
  }
  actualControlValid(task, step) {
    const node = task.parts[step.target],
      control = node?.userData.fieldControl,
      value = task.values[step.target];
    if (!node || !task.touched.has(step.target)) return false;
    if (step.kind === "set-meter")
      return (
        value === step.value &&
        Math.abs(node.rotation.z - (value * Math.PI) / 2) < 0.01
      );
    if (step.kind === "rotate-part") {
      const axis = control?.type === "case" ? "y" : control?.axis || "z";
      return (
        value === step.targetDetent &&
        Math.abs(node.rotation[axis] - (value * Math.PI) / 2) < 0.01
      );
    }
    if (["socket-match", "align-parts"].includes(step.kind)) {
      const slot = control.slots?.[value];
      return Boolean(
        task.seated[step.target] &&
          slot?.id === (step.socket || step.slot) &&
          node.userData.seatedDistance < 0.015,
      );
    }
    if (step.kind === "ordered-lever")
      return value === 1 && this.recorded(task, step.after);
    if (step.kind === "operate-part")
      return step.targetDetent !== undefined
        ? value === step.targetDetent
        : control?.branch
          ? Math.abs(value) === 1
          : value === 1 || task.completedEvents.has(step.id);
    return this.recorded(task, step);
  }
  adjust(task, step, delta) {
    const node = task.parts[step.target],
      control = node?.userData.fieldControl;
    if (!node || !control) return;
    const isSlot = ["socket-match", "align-parts"].includes(step.kind),
      maximum = isSlot
        ? control.slots.length - 1
        : step.kind === "set-meter" || step.kind === "rotate-part"
          ? 3
          : 1;
    const minimum = control.branch ? -1 : 0;
    task.values[step.target] = clamp(
      task.values[step.target] + Math.sign(delta),
      minimum,
      maximum,
    );
    const value = task.values[step.target];
    task.touched.add(step.target);
    task.seated[step.target] = false;
    if (isSlot) {
      const slot = control.slots[value];
      if (control.type === "brace") {
        node.rotation.z =
          value === 1 ? Math.PI / 4 : value === 2 ? -Math.PI / 4 : Math.PI / 2;
      } else {
        node.position.x = slot.node.position.x;
        node.position.z = control.basePosition.z;
      }
      node.userData.seatedDistance = Infinity;
    } else {
      const axis = control.type === "case" ? "y" : control.axis || "z";
      node.rotation[axis] =
        value *
        (control.branch
          ? 0.65
          : step.kind === "set-meter" || step.kind === "rotate-part"
            ? Math.PI / 2
            : 1.05);
    }
    if (step.kind === "set-meter") {
      const flow = task.parts[`flow-${step.target}`];
      flow.scale.y = 0.25 + value;
      flow.position.y =
        0.2 + (flow.geometry.parameters.height * flow.scale.y) / 2;
    }
    if (step.target === "switch" && task.parts.points)
      task.parts.points.rotation.y = value * 0.3;
    if (step.target === "raking-lamp" && task.parts["raking-light"])
      task.parts["raking-light"].intensity = value === 1 ? 12 : 2;
    if (step.target === "antenna-handwheel" && task.parts.antenna)
      task.parts.antenna.position.y = 1.9 + value * 0.8;
    if (step.target === "bypass-wheel" && task.parts["pressure-needle"])
      task.parts["pressure-needle"].rotation.z = value === 1 ? 0 : 1.1;
    for (const related of this.allSteps(task).filter(
      (s) => s.target === step.target,
    )) {
      if (this.actualControlValid(task, related)) this.record(task, related);
      else if (
        related.kind !== "operate-part" ||
        related.targetDetent !== undefined
      )
        this.unrecord(task, related);
    }
    if (
      step.kind === "ordered-lever" &&
      !this.recorded(task, step.after) &&
      value === 1
    ) {
      node.rotation.z = 0;
      task.values[step.target] = 0;
      this.mistake(task, "先接地，再送電。保護桿已退回，現在可以立即改接。");
    }
    this.focus(task, node, task.viewAngle || 0);
    this.renderPanel();
  }
  seat(task, step) {
    const node = task.parts[step.target],
      control = node?.userData.fieldControl,
      slot = control?.slots?.[task.values[step.target]];
    if (!slot) return;
    task.touched.add(step.target);
    if (control.type === "brace") {
      node.position.copy(control.basePosition);
      node.rotation.z =
        task.values[step.target] === 1
          ? Math.PI / 4
          : task.values[step.target] === 2
            ? -Math.PI / 4
            : Math.PI / 2;
      node.updateMatrix();
      const endpoints = [
        new THREE.Vector3(0, 0.65, 0),
        new THREE.Vector3(0, -0.65, 0),
      ].map((p) => p.applyMatrix4(node.matrix));
      const sockets = control.endSockets;
      node.userData.seatedDistance = Math.min(
        Math.max(
          endpoints[0].distanceTo(sockets[0]),
          endpoints[1].distanceTo(sockets[1]),
        ),
        Math.max(
          endpoints[0].distanceTo(sockets[1]),
          endpoints[1].distanceTo(sockets[0]),
        ),
      );
    } else if (control.type === "sheet" && step.target === "carbon-sheet") {
      node.position.set(
        slot.node.position.x,
        control.basePosition.y,
        control.basePosition.z,
      );
      node.userData.seatedDistance = Math.abs(node.position.x);
    } else {
      node.position.x = slot.node.position.x;
      node.position.y = slot.node.position.y;
      node.position.z = slot.node.position.z + 0.09;
      node.userData.seatedDistance = Math.hypot(
        node.position.x - slot.node.position.x,
        node.position.y - slot.node.position.y,
      );
    }
    task.seated[step.target] = true;
    if (this.actualControlValid(task, step)) {
      this.record(task, step);
      this.renderPanel("接合完成：模型的插頭／定位孔已在正確插座。");
    } else {
      this.unrecord(task, step);
      this.mistake(task, "接合符號或孔位不相同；可以立即移動並重插。");
    }
    this.focus(task, node, task.viewAngle || 0);
  }
  inspect(task, step) {
    const node = task.parts[step.target];
    if (!node || task.focus !== node) {
      this.focus(task, node || task.object);
      this.renderPanel(
        "已拉近實體零件。轉到可看清正面的視角，再按「讀取零件」。",
      );
      return;
    }
    this.group.updateMatrixWorld(true);
    const p = node.getWorldPosition(new THREE.Vector3()),
      normal = new THREE.Vector3(0, 0, 1).transformDirection(node.matrixWorld),
      view = this.world.camera.position.clone().sub(p).normalize();
    const close =
        distance(this.playerPosition, p) <= (step.maximumDistance || 2.5),
      visible = normal.dot(view) > 0.18;
    if (!close || !visible) {
      this.renderPanel(
        !close
          ? "角色距離太遠；返回現場走近零件。"
          : "目前看見的是背面；轉動物件或操作視角，讓刻記朝向鏡頭。",
      );
      return;
    }
    if (task.id === "mail-seal" && task.values.case !== 2) {
      this.renderPanel("先轉動藥箱到第二檔，露出背面的原始鉛封。");
      return;
    }
    task.inspections.add(step.id);
    this.record(task, step);
    this.renderPanel(task.lastObservation || `讀到刻記：${task.hints[0]}`);
  }
  mistake(task, message) {
    task.marker.material.color.set(0xcc7657);
    this.pendingEffects.push({
      task,
      effect: {
        alertDelta: 1,
        exposureSeconds: 1.5,
        permanentDamage: 0,
        blocksInput: false,
        message,
      },
    });
    this.state.mistakes++;
    this.renderPanel(message);
  }

  handle(action, dataset = {}) {
    if (!String(action).startsWith("field-")) return false;
    const task = this.active || this.traversal?.task;
    if (!task && action !== "field-close") return true;
    if (action === "field-close") {
      this.close();
      return true;
    }
    if (this.done(task)) return true;
    if (this.missingClues(task).length) {
      this.notify("所需線索尚未查閱；請先返回現場找齊證據。");
      return true;
    }
    if (action === "field-view") {
      this.focus(
        task,
        task.focus || task.object,
        (task.viewAngle || 0) + (Number(dataset.delta) * Math.PI) / 4,
      );
      return true;
    }
    if (action === "field-release") {
      this.release();
      return true;
    }
    if (action === "field-resume") {
      this.resume(task);
      return true;
    }
    if (action === "field-choice") {
      this.choose(task, dataset.choice);
      return true;
    }
    const step = this.step(task, dataset.step);
    if (!step) return true;
    if (action === "field-adjust")
      this.adjust(task, step, Number(dataset.delta));
    if (action === "field-seat") this.seat(task, step);
    if (action === "field-focus") {
      this.focus(task, task.parts[step.target]);
      this.renderPanel();
    }
    if (action === "field-inspect") this.inspect(task, step);
    if (action === "field-step") this.physicalStep(task, step);
    return true;
  }
  choose(task, id) {
    const option = task.choices.find((c) => c.id === id);
    if (!option) return;
    if (this.callbacks.beforeChoice?.(task, option) === false) return;
    task.selectedChoice = id;
    for (const step of task.physicalSteps)
      if (
        [
          "rotate-part",
          "set-meter",
          "socket-match",
          "align-parts",
          "ordered-lever",
        ].includes(step.kind) &&
        !this.actualControlValid(task, step)
      )
        this.unrecord(task, step);
    if (option.success && choiceDetents[id] !== undefined) {
      const selector = Object.values(task.parts).find(
        (node) => node.userData.fieldControl?.branch,
      );
      const key = Object.keys(task.parts).find(
        (key) => task.parts[key] === selector,
      );
      if (selector && task.values[key] !== choiceDetents[id]) {
        this.renderPanel(
          `所選方案要求${choiceDetents[id] < 0 ? "左" : "右"}檔；請先實際扳動選擇器。`,
        );
        return;
      }
    }
    const result = applyFieldChoice(this.state, task.id, id);
    this.state = result.state;
    if (result.complete && !result.duplicate) {
      task.marker.material.color.set(0x397d7a);
      for (const effect of result.effects) {
        this.applyWorld(task, effect);
        this.pendingEffects.push({ task, effect });
      }
      this.renderPanel(option.message || result.message);
      this.notify(`${task.title}：完成`);
    } else if (result.effects?.length) {
      for (const effect of result.effects)
        this.pendingEffects.push({ task, effect });
      task.marker.material.color.set(0xcc7657);
      this.renderPanel(result.message);
    } else
      this.renderPanel(
        result.message +
          (result.missingSteps?.length
            ? " 選定方案後，新增的實體步驟已列在上方。"
            : ""),
      );
  }
  applyWorld(task, effect) {
    for (const change of effect.world || []) {
      const node = task.parts[change.target];
      if (!node) continue;
      if (change.detent !== undefined) {
        node.rotation.z = change.detent * 0.65;
        continue;
      }
      node.userData.fieldState = change.state;
      if (["off", "removed"].includes(change.state)) node.visible = false;
      if (
        ["on", "full", "posted", "lit", "linked", "open", "verified"].includes(
          change.state,
        )
      )
        node.visible = true;
      if (change.target === "seal" && change.state === "verified")
        node.rotation.z = 0.35;
      if (change.target === "searchlight") node.visible = change.state === "on";
      if (change.target === "antenna" && change.state === "raised")
        node.position.y = 2.7;
      node.traverse?.((part) => {
        if (
          part.isMesh &&
          part.material?.emissive &&
          ["lit", "linked", "balanced", "verified"].includes(change.state)
        ) {
          part.material.emissive.set(0x397d7a);
          part.material.emissiveIntensity = 0.2;
        }
      });
    }
  }
  near(point, radius = 2.3) {
    return (
      this.playerPosition && distance(this.playerPosition, point) <= radius
    );
  }
  dropZoneReady(task, step) {
    const goal = position(step.position),
      radius = step.radius ?? 1.2;
    // Opening the placement panel must guarantee that placement can succeed.
    // Route checkpoints have separate allowances for occupied workbenches.
    return Boolean(
      task.carrying &&
        task.cargo &&
        this.near(goal, radius) &&
        distance(task.cargo.position, goal) <= radius,
    );
  }
  reopenPlacement(task) {
    if (!task || this.done(task) || !this.available(task)) return false;
    const next = this.currentSteps(task).find(
      (step) => !this.recorded(task, step),
    );
    if (next?.kind !== "carry-drop-zone" || !this.dropZoneReady(task, next))
      return false;
    // Returning from a temporary drop or closing the arrival panel must leave
    // the explicit placement reachable. E opens it; it never delivers cargo.
    this.traversal = null;
    task.anchor = task.parts[next.target] || task.cargo;
    this.active = task;
    this.focus(task, task.anchor);
    this.renderPanel(
      "人與貨物都已到接收區。選「放入接收區並交付」完成正式交接；暫放地上不算交付。",
    );
    return true;
  }
  routeFor(task, step) {
    let route = step.waypoints;
    if (step.routeFrom) {
      const effect = this.state.effects.find(
        (entry) => entry.taskId === step.routeFrom,
      )?.effect;
      route = effect?.escortRoute || effect?.route || [];
    }
    route ||= step.position ? [step.position] : [];
    return this.callbacks.route?.(task, step, route) || route;
  }
  checkpointRadius(step, goal, colliders = this.world.colliders) {
    const obstacle = colliders.find(
      (box) =>
        goal.x >= box.min.x &&
        goal.x <= box.max.x &&
        goal.z >= box.min.z &&
        goal.z <= box.max.z,
    );
    return step.kind === "carry-route" && obstacle
      ? Math.max(1.15, Math.hypot(obstacle.w, obstacle.d) / 2 + 0.65)
      : step.radius || 1.15;
  }
  removeCargoCollider(task) {
    const owner = task.cargoOwner || task;
    if (owner.collider && task.cargo === owner.object)
      this.world.colliders = this.world.colliders.filter(
        (box) => box !== owner.collider,
      );
  }
  cargoColliders(task, colliders) {
    const owner = task.cargoOwner || task;
    // A page is lifted off its own tabletop. The desk still blocks the player,
    // but its floor proxy must not trap the small object above the surface.
    return task.cargo !== owner.object
      ? colliders.filter((box) => box !== owner.collider)
      : colliders;
  }
  restoreCargoCollider(task) {
    const owner = task.cargoOwner || task,
      b = owner.collider;
    if (!b || task.cargo !== owner.object) return;
    const x = task.cargo.position.x,
      z = task.cargo.position.z;
    Object.assign(b, makeBox(b.id, x, z, b.w, b.h, b.d, b.kind));
    if (!this.world.colliders.includes(b)) this.world.colliders.push(b);
  }
  cargoPlacement(task, step, floorY = 0) {
    const cargo = task.cargo,
      owner = task.cargoOwner || task,
      solid = cargo === owner.object ? owner.collider : null,
      pushed = task.physicalSteps?.some((s) => s.kind === "push-route"),
      start = cargo.position,
      player = this.playerPosition;
    if (!player || distance(start, player) > (pushed ? 2.6 : 2.3) + 1e-8)
      return null;
    const reach = pushed ? 2.6 : Math.max(1.8, distance(start, player));
    cargo.updateWorldMatrix(true, true);
    const bounds = new THREE.Box3().setFromObject(cargo);
    // Preserve the restored movement proxy AND the rotated real model footprint.
    // A paper is a borrowed subpart: its owner's tabletop remains an obstacle.
    const shape = {
      minX: Math.min(
        bounds.isEmpty() ? 0 : bounds.min.x - start.x,
        solid ? -solid.w / 2 : 0,
      ),
      maxX: Math.max(
        bounds.isEmpty() ? 0 : bounds.max.x - start.x,
        solid ? solid.w / 2 : 0,
      ),
      minZ: Math.min(
        bounds.isEmpty() ? 0 : bounds.min.z - start.z,
        solid ? -solid.d / 2 : 0,
      ),
      maxZ: Math.max(
        bounds.isEmpty() ? 0 : bounds.max.z - start.z,
        solid ? solid.d / 2 : 0,
      ),
    };
    const minY = bounds.isEmpty() ? 0 : bounds.min.y - start.y,
      centerY = bounds.isEmpty()
        ? 0
        : bounds.getCenter(new THREE.Vector3()).y - start.y,
      expand = (b) => ({
        minX: b.min.x - shape.maxX - 0.02,
        maxX: b.max.x - shape.minX + 0.02,
        minZ: b.min.z - shape.maxZ - 0.02,
        maxZ: b.max.z - shape.minZ + 0.02,
      }),
      barriers = this.world.colliders.filter((b) => b !== solid).map(expand);
    barriers.push(
      expand(makeBox("carrier", player.x, player.z, 0.68, 1.85, 0.68)),
    );
    const inside = (p, b) =>
      p.x > b.minX + 1e-8 &&
      p.x < b.maxX - 1e-8 &&
      p.z > b.minZ + 1e-8 &&
      p.z < b.maxZ - 1e-8;
    const clearSegment = (a, b) =>
      barriers.every((box) => {
        const dx = b.x - a.x,
          dz = b.z - a.z;
        if (inside(a, box)) {
          // Carrying can already overlap a floor proxy. Separate or slide along
          // its nearest face without deepening that overlap; never cross through.
          const edges = [
              a.x - box.minX,
              box.maxX - a.x,
              a.z - box.minZ,
              box.maxZ - a.z,
            ],
            depth = Math.min(...edges);
          return edges.some(
            (v, i) => v <= depth + 1e-8 && [dx, -dx, dz, -dz][i] <= 1e-8,
          );
        }
        let lo = 0,
          hi = 1;
        for (const [p, delta, min, max] of [
          [a.x, dx, box.minX, box.maxX],
          [a.z, dz, box.minZ, box.maxZ],
        ]) {
          if (Math.abs(delta) < 1e-10) {
            if (p <= min + 1e-8 || p >= max - 1e-8) return true;
          } else {
            const t0 = (min - p) / delta,
              t1 = (max - p) / delta;
            lo = Math.max(lo, Math.min(t0, t1));
            hi = Math.min(hi, Math.max(t0, t1));
          }
        }
        return lo >= hi - 1e-8 || hi <= 1e-8 || lo >= 1 - 1e-8;
      });
    const self = new Set();
    cargo.traverse((node) => self.add(node));
    this.world.actors
      ?.find((actor) => actor.name === "hero")
      ?.object.traverse((node) => self.add(node));
    const query = Object.create(this.world);
    query.solids = (this.world.solids || []).filter((node) => !self.has(node));
    const trace = (a, b) => this.world.trace?.call(query, a, b);
    // Include every face crossed while lowering the held body. A raised strip
    // above the allowed .5m landing band must not disappear from this query.
    const surfaceCeiling = Math.max(
      0.5,
      bounds.isEmpty() ? start.y : bounds.max.y,
    );
    const surfaces = pushed
      ? []
      : placementSurfaces(
          query.solids,
          new THREE.Box3(
            new THREE.Vector3(
              player.x - reach + shape.minX,
              -1,
              player.z - reach + shape.minZ,
            ),
            new THREE.Vector3(
              player.x + reach + shape.maxX,
              surfaceCeiling,
              player.z + reach + shape.maxZ,
            ),
          ),
        );
    const landing = (p) => {
      if (barriers.some((b) => inside(p, b))) return null;
      if (
        step &&
        distance(p, position(step.position)) > (step.radius ?? 1.2) + 1e-8
      )
        return null;
      let y = pushed ? floorY : Math.max(floorY, -minY + 0.02);
      if (!pushed) {
        const support = placementSurfaceHeight(
          surfaces,
          {
            minX: p.x + shape.minX,
            maxX: p.x + shape.maxX,
            minZ: p.z + shape.minZ,
            maxZ: p.z + shape.maxZ,
          },
          surfaceCeiling,
        );
        if (!Number.isFinite(support)) return null;
        y = Math.max(y, support - minY + 0.02);
      }
      const eye = { x: player.x, y: 1.55, z: player.z },
        target = {
          x: p.x + (shape.minX + shape.maxX) / 2,
          y: y + centerY,
          z: p.z + (shape.minZ + shape.maxZ) / 2,
        },
        hit = trace(eye, target);
      if (
        hit &&
        hit.distance <
          Math.hypot(target.x - eye.x, target.y - eye.y, target.z - eye.z) -
            0.06
      )
        return null;
      return new THREE.Vector3(p.x, y, p.z);
    };
    const valid = (p) =>
      distance(p, player) <= reach + 1e-8 &&
      p.x + shape.minX >= -23 &&
      p.x + shape.maxX <= 23 &&
      p.z + shape.minZ >= -23 &&
      p.z + shape.maxZ <= 23;
    if (valid(start)) {
      const here = landing(start);
      if (here) return here;
    }
    // A cart is already on its wheels. Never move it into a bay by releasing or
    // setting its brake; its real push controller owns all cart motion.
    if (pushed) return null;
    // Bounded hand placement, not transport: at most 625 grid centres around the
    // carrier. Every edge sweeps the complete footprint, including thin walls.
    const queue = [{ x: start.x, z: start.z, ix: 0, iz: 0 }],
      seen = new Set(["0,0"]);
    for (let head = 0; head < queue.length && head < 625; head++) {
      const from = queue[head];
      for (const [dx, dz] of [
        [0, 1],
        [0, -1],
        [1, 0],
        [-1, 0],
        [1, 1],
        [-1, 1],
        [1, -1],
        [-1, -1],
      ]) {
        const ix = from.ix + dx,
          iz = from.iz + dz,
          key = `${ix},${iz}`;
        if (seen.has(key)) continue;
        const next = { x: start.x + ix * 0.15, z: start.z + iz * 0.15, ix, iz };
        if (!valid(next) || !clearSegment(from, next)) continue;
        seen.add(key);
        const placed = landing(next);
        if (placed) return placed;
        queue.push(next);
      }
    }
    return null;
  }
  placeCargo(task, action, step, floorY = 0) {
    const owner = task.cargoOwner || task;
    // Formal subpart delivery can be taken over by a controller (ledger dock).
    // It must observe the held pose and retain its own parent/height transaction.
    if (action === "deliver" && task.cargo !== owner.object)
      return this.callbacks.beforeCargo?.(task, action) !== false;
    const placed = this.cargoPlacement(task, step, floorY);
    if (!placed) {
      const message =
        "手邊沒有能安全放下並重新拿取的空位；仍然拿著貨物。請帶到較開闊的一側再試。";
      if (this.active) this.renderPanel(message);
      else this.notify(message);
      return false;
    }
    const previous = task.cargo.position.clone();
    // Controllers must read the actual accepted landing pose. A rejected guard
    // restores that pose before any carry flag, collider or progress changes.
    task.cargo.position.copy(placed);
    let accepted = false;
    try {
      accepted =
        !action || this.callbacks.beforeCargo?.(task, action) !== false;
      return accepted;
    } finally {
      if (!accepted) task.cargo.position.copy(previous);
      task.cargo.updateWorldMatrix(true, true);
    }
  }
  detachCargo(task, node) {
    node.updateWorldMatrix(true, true);
    this.group.attach(node);
    task.cargo = node;
    task.carrying = true;
    task.cargoEverPicked = true;
    task.anchor = node;
    task.carryOffset = node.position.clone().sub(this.playerPosition);
    task.carryOffset.y = 0;
    if (task.carryOffset.length() > 0.75) task.carryOffset.setLength(0.75);
    this.removeCargoCollider(task);
  }
  physicalStep(task, step) {
    const previous = this.currentSteps(task).slice(
      0,
      this.currentSteps(task).findIndex((s) => s.id === step.id),
    );
    if (previous.some((s) => !this.recorded(task, s))) {
      this.renderPanel("先完成前面的實體步驟。");
      return;
    }
    if (step.kind === "carry-pickup") {
      const cargo = task.parts[step.target] || task.cargo;
      if (!cargo) return;
      const p = cargo.getWorldPosition(new THREE.Vector3());
      if (!this.near(p, 2.3)) {
        task.anchor = cargo;
        this.renderPanel("請返回現場，走到貨物提把旁再拿起。");
        return;
      }
      if (step.target === "battery") {
        cargo.position.x -= 0.35;
        cargo.position.y += 0.2;
        task.touched.add(step.target);
        this.record(task, step);
        this.renderPanel("已將實體電池從接點抽出。");
        return;
      }
      if (this.callbacks.beforeCargo?.(task, "pickup") === false) return;
      this.detachCargo(task, cargo);
      cargo.position.y = 0.65;
      this.record(task, step);
      const next = this.currentSteps(task).find((s) => !this.recorded(task, s));
      if (next?.kind === "carry-route") this.startTraversal(task, next);
      else this.renderPanel("副本已拿在手中。選定交付方式，再實際走到接收點。");
      return;
    }
    if (step.kind === "escort-start") {
      if (!task.members.every((member) => this.near(member.position, 3))) {
        this.renderPanel("請走近三位家屬，確認所有人都在身邊。");
        return;
      }
      this.record(task, step);
      this.startTraversal(
        task,
        task.physicalSteps.find((s) => s.kind === "escort-route"),
      );
      return;
    }
    if (step.kind === "carry-drop-zone") {
      if (!task.cargo || !task.carrying) {
        this.renderPanel("先拿起實體貨物，不能只靠選項完成交付。");
        return;
      }
      if (!this.dropZoneReady(task, step)) {
        this.startTraversal(task, step);
        return;
      }
      if (!this.placeCargo(task, "deliver", step, 0.12)) return;
      task.cargoDelivered = true;
      if (task.cargo !== (task.cargoOwner || task).object)
        task.cargo.position.y = 0.12;
      task.carrying = false;
      this.restoreCargoCollider(task);
      this.record(task, step);
      task.anchor = task.parts[step.target] || task.cargo;
      this.renderPanel("貨物已實際放入接收區。");
      return;
    }
    if (step.kind === "park-object") {
      if (
        !task.cargo ||
        distance(task.cargo.position, position(step.position)) > step.radius
      ) {
        this.renderPanel("車身仍在白框外；繼續推到停車灣。");
        return;
      }
      if (!this.placeCargo(task, null, step)) return;
      task.parts["cart-brake"].rotation.z = 1.05;
      task.values["cart-brake"] = 1;
      task.carrying = false;
      this.restoreCargoCollider(task);
      this.record(task, step);
      this.renderPanel("車身位於白框內，實體煞車已扣上。");
      return;
    }
    if (step.kind === "escort-arrival") {
      if (
        task.members.length === step.requiredCount &&
        task.members.every(
          (member) =>
            distance(member.position, position(step.position)) <= step.radius,
        )
      ) {
        this.record(task, step);
        this.renderPanel("三位家屬的實際位置都在集合圈內。");
      } else this.renderPanel("仍有人在集合圈外；回去靠近並帶他們走完。");
      return;
    }
    if (
      step.kind === "checkpoint-operate" &&
      task.reached.has(step.id) &&
      this.near(position(step.position), step.radius)
    ) {
      const relay = task.parts[step.target];
      const switchNode = relay.getObjectByName(
        relay.userData.dynamicParts["knife-switch"].node,
      );
      switchNode.rotation.x = 1.15;
      this.record(task, step);
      this.renderPanel("已在接點旁親手接通實體開關。");
      return;
    }
    if (travelKinds.has(step.kind)) {
      this.startTraversal(task, step);
      return;
    }
  }
  startTraversal(task, step) {
    if (!step) return;
    let route = this.routeFor(task, step);
    if (!route.length) {
      this.renderPanel("先完成路線選擇器，才有可追蹤的路點。");
      return;
    }
    const type = step.kind.startsWith("escort")
      ? "escort"
      : step.kind === "push-route"
        ? "push"
        : step.kind === "player-overlap"
          ? "overlap"
          : step.kind === "checkpoint-operate"
            ? "checkpoint"
            : task.carrying
              ? "carry"
              : "walk";
    const cargo = task.cargo;
    const carrying = type === "carry" || type === "push";
    if (type === "push") {
      const handle = new THREE.Vector3(0, 0.7, -1.2);
      cargo.updateWorldMatrix(true, true);
      cargo.localToWorld(handle);
      if (!this.near(handle, 1.5)) {
        this.renderPanel("請走到礦車後方的雙把手旁，再開始推車。");
        return;
      }
      task.carrying = true;
      this.removeCargoCollider(task);
    }
    if (carrying && !cargo) {
      this.renderPanel("現場沒有可搬運的實體物件。");
      return;
    }
    const previous =
      this.traversal?.task === task && this.traversal.step.id === step.id
        ? this.traversal
        : null;
    this.traversal = {
      task,
      step,
      type,
      carrying,
      route: route.map((p) => [...p]),
      index: previous?.index || 0,
      paused: false,
      distanceTravelled: previous?.distanceTravelled || 0,
      startPosition: this.playerPosition.clone(),
      offset: cargo
        ? cargo.position.clone().sub(this.playerPosition)
        : new THREE.Vector3(),
      lastPlayer: this.playerPosition.clone(),
    };
    if (this.traversal.offset.length() > 2.3)
      this.traversal.offset.set(0, 0, -0.75);
    this.traversal.offset.y = 0;
    if (type === "carry" && this.traversal.offset.length() > 0.75)
      this.traversal.offset.setLength(0.75);
    if (!task.routeMarkers) task.routeMarkers = [];
    for (const p of route)
      task.routeMarkers.push(
        this.marker(p, this.checkpointRadius(step, position(p)), 0xe6ca86),
      );
    this.close();
    this.notify(
      type === "escort"
        ? "家屬開始跟隨；保持在六公尺內，沿金色路點前進。"
        : carrying
          ? "貨物會沿你的路線跟隨；繞開障礙，讓貨物進入每個金色光圈。E 可放下。"
          : "沿金色路點實際移動；E 可暫停。",
    );
  }
  release() {
    const traversal = this.traversal,
      task =
        this.active ||
        traversal?.task ||
        this.tasks.find((entry) => entry.carrying);
    if (!task) return;
    if (task.carrying && task.cargo && !this.placeCargo(task, "drop")) return;
    if (traversal) {
      traversal.paused = true;
      traversal.carrying = false;
    }
    task.carrying = false;
    this.restoreCargoCollider(task);
    for (const member of task.members) this.world.animate(member, "idle");
    this.close();
    this.notify("已放下／停等；走近物件按 E 可繼續，進度保留。");
  }
  resume(task) {
    if (task.cargoDelivered) {
      this.open(task);
      return;
    }
    const traversal = this.traversal;
    if (!traversal || traversal.task !== task) {
      if (
        task.cargoEverPicked &&
        task.cargo &&
        this.near(task.cargo.position, 2.3)
      ) {
        if (this.callbacks.beforeCargo?.(task, "pickup") === false) return;
        task.carrying = true;
        task.carryOffset = task.cargo.position.clone().sub(this.playerPosition);
        task.carryOffset.y = 0;
        if (task.carryOffset.length() > 0.75) task.carryOffset.setLength(0.75);
        task.cargo.position.y = 0.65;
        this.removeCargoCollider(task);
        if (this.reopenPlacement(task)) return;
        this.close();
        return;
      }
      this.renderPanel("請從尚未完成的搬運或護送步驟繼續。");
      return;
    }
    if (task.cargo && !this.near(task.cargo.position, 2.3)) {
      this.renderPanel("走近留在原地的貨物再拿起。");
      return;
    }
    if (
      ["carry", "push"].includes(traversal.type) &&
      this.callbacks.beforeCargo?.(task, "pickup") === false
    )
      return;
    traversal.paused = false;
    traversal.carrying = ["carry", "push"].includes(traversal.type);
    task.carrying = traversal.carrying;
    if (task.carrying) this.removeCargoCollider(task);
    if (task.cargo && traversal.type === "carry") task.cargo.position.y = 0.65;
    traversal.offset = task.cargo
      ? task.cargo.position.clone().sub(this.playerPosition)
      : new THREE.Vector3();
    traversal.offset.y = 0;
    if (traversal.type === "carry" && traversal.offset.length() > 0.75)
      traversal.offset.setLength(0.75);
    traversal.lastPlayer = this.playerPosition.clone();
    if (this.reopenPlacement(task)) return;
    this.close();
  }
  interactTraversal(playerPosition) {
    this.playerPosition = new THREE.Vector3(
      playerPosition.x,
      playerPosition.y || 0,
      playerPosition.z,
    );
    const placement = this.tasks.find((task) => task.carrying);
    if (placement && this.reopenPlacement(placement)) return true;
    if (this.traversal) {
      const task = this.traversal.task;
      if (this.traversal.paused) {
        if (!this.near(this.taskPoint(task), 2.5)) return false;
        this.resume(task);
      } else this.release();
      return true;
    }
    const carried = this.tasks.find((task) => task.carrying);
    if (carried) {
      this.release();
      return true;
    }
    const dropped = this.tasks.find(
      (task) =>
        !this.done(task) &&
        !task.cargoDelivered &&
        task.cargoEverPicked &&
        task.cargo &&
        this.near(task.cargo.position, 2.3),
    );
    if (dropped) {
      this.resume(dropped);
      return true;
    }
    return false;
  }
  moveSafe(object, dx, dz, colliders, radius) {
    const count = Math.max(1, Math.ceil(Math.hypot(dx, dz) / 0.12));
    for (let i = 0; i < count; i++) {
      const next = moveCircle(
        object.position,
        dx / count,
        dz / count,
        colliders,
        radius,
      );
      object.position.x = next.x;
      object.position.z = next.z;
    }
  }
  escortTarget(member, target, colliders) {
    // Visibility paths around inflated solid boxes preserve the same body radius
    // used by moveCircle. Authored checkpoints may lie beside an occupied desk.
    const margin = 0.27;
    const boxes = colliders.map((b) => ({
      minX: b.min.x - margin,
      maxX: b.max.x + margin,
      minZ: b.min.z - margin,
      maxZ: b.max.z + margin,
    }));
    const inside = (p, b) =>
      p.x > b.minX && p.x < b.maxX && p.z > b.minZ && p.z < b.maxZ;
    for (const b of boxes)
      if (inside(target, b)) {
        const candidates = [
          new THREE.Vector3(b.minX - 0.02, 0, target.z),
          new THREE.Vector3(b.maxX + 0.02, 0, target.z),
          new THREE.Vector3(target.x, 0, b.minZ - 0.02),
          new THREE.Vector3(target.x, 0, b.maxZ + 0.02),
        ];
        candidates.sort(
          (a, c) => distance(a, member.position) - distance(c, member.position),
        );
        target.copy(
          candidates.find((p) => !boxes.some((box) => inside(p, box))) ||
            candidates[0],
        );
      }
    const clear = (a, b) =>
      !boxes.some((box) => {
        let lo = 0,
          hi = 1;
        for (const [axis, min, max] of [
          ["x", box.minX, box.maxX],
          ["z", box.minZ, box.maxZ],
        ]) {
          const d = b[axis] - a[axis];
          if (Math.abs(d) < 1e-8) {
            if (a[axis] <= min || a[axis] >= max) return false;
          } else {
            let p = (min - a[axis]) / d,
              q = (max - a[axis]) / d;
            if (p > q) [p, q] = [q, p];
            lo = Math.max(lo, p);
            hi = Math.min(hi, q);
            if (lo >= hi) return false;
          }
        }
        return lo < hi;
      });
    if (clear(member.position, target)) {
      member.fieldPath = null;
      return target;
    }
    const key = `${target.x.toFixed(2)},${target.z.toFixed(2)}`;
    if (!member.fieldPath || member.fieldPath.key !== key) {
      const nodes = [member.position.clone(), target.clone()];
      for (const box of boxes)
        for (const x of [box.minX - 0.03, box.maxX + 0.03])
          for (const z of [box.minZ - 0.03, box.maxZ + 0.03]) {
            const p = new THREE.Vector3(x, 0, z);
            if (
              Math.abs(x) < 22.7 &&
              Math.abs(z) < 22.7 &&
              !boxes.some((b) => inside(p, b))
            )
              nodes.push(p);
          }
      const costs = nodes.map(() => Infinity),
        previous = nodes.map(() => -1),
        open = new Set([0]);
      costs[0] = 0;
      while (open.size) {
        let current = -1,
          best = Infinity;
        for (const i of open) {
          const score = costs[i] + distance(nodes[i], target);
          if (score < best) {
            best = score;
            current = i;
          }
        }
        if (current === 1 || current < 0) break;
        open.delete(current);
        for (let i = 1; i < nodes.length; i++) {
          const next = costs[current] + distance(nodes[current], nodes[i]);
          if (next + 1e-6 < costs[i] && clear(nodes[current], nodes[i])) {
            costs[i] = next;
            previous[i] = current;
            open.add(i);
          }
        }
      }
      const path = [];
      if (Number.isFinite(costs[1]))
        for (let i = 1; i > 0; i = previous[i]) path.unshift(nodes[i]);
      member.fieldPath = { key, path };
    }
    const path = member.fieldPath.path;
    while (path.length > 1 && distance(member.position, path[0]) < 0.12)
      path.shift();
    return path[0] || member.position;
  }
  constrainMovement(previous, proposed) {
    const task = this.tasks.find((task) => task.carrying && task.cargo);
    if (!task) return proposed;
    const reach = this.traversal?.type === "push" ? 2.6 : 1.8;
    const target = tetherPosition(
      previous,
      proposed,
      task.cargo.position,
      reach,
    );
    const checked = moveCircle(
      previous,
      target.x - previous.x,
      target.z - previous.z,
      this.world.colliders,
    );
    const limit = Math.max(reach, distance(previous, task.cargo.position));
    return distance(checked, task.cargo.position) <= limit + 1e-8
      ? checked
      : previous;
  }
  update(dt, player, colliders = this.world.colliders) {
    const p = player.position || player;
    this.playerPosition = new THREE.Vector3(p.x, p.y || 0, p.z);
    const traversal = this.traversal;
    if (!traversal || traversal.paused) {
      const carried = this.tasks.find((task) => task.carrying && task.cargo);
      if (carried) {
        const target = this.playerPosition
            .clone()
            .add(carried.carryOffset || new THREE.Vector3(0, 0, -0.7)),
          delta = target.sub(carried.cargo.position);
        delta.y = 0;
        const length = delta.length();
        if (length > 0.001) {
          const amount = Math.min(length, dt * 3.4);
          this.moveSafe(
            carried.cargo,
            (delta.x / length) * amount,
            (delta.z / length) * amount,
            this.cargoColliders(carried, colliders),
            0.25,
          );
        }
        carried.cargo.position.y = 0.65;
        this.lastPlayer = this.playerPosition.clone();
        const next = this.currentSteps(carried).find(
          (step) => !this.recorded(carried, step),
        );
        return {
          speedMultiplier: 0.8,
          objective:
            next?.kind === "carry-drop-zone" &&
            this.dropZoneReady(carried, next)
              ? "已到接收區 · E 開啟正式交付"
              : "貨物跟隨中 · 靠近 ⚙ 標記繼續作業 · E 暫放",
        };
      }
      this.lastPlayer = this.playerPosition.clone();
      return {
        speedMultiplier: 1,
        objective: traversal?.paused
          ? traversal.type === "escort"
            ? "護送已暫停 · 靠近家屬按 E 繼續"
            : `作業已暫停 · 靠近${traversal.task.cargo ? "貨物" : "⚙ 標記"}按 E 繼續`
          : "",
      };
    }
    const task = traversal.task,
      goal = position(traversal.route[traversal.index]),
      delta = this.playerPosition.clone().sub(traversal.lastPlayer),
      travel = delta.length();
    traversal.lastPlayer.copy(this.playerPosition);
    traversal.distanceTravelled += travel;
    let reached = false,
      blocked = false;
    if (traversal.type === "escort") {
      for (const [i, member] of task.members.entries()) {
        const leash = distance(member.position, this.playerPosition);
        if (leash > 6) {
          this.world.animate(member, "idle");
          continue;
        }
        const desired = goal.clone();
        desired.x += (i - 1) * 0.38;
        desired.z += Math.abs(i - 1) * 0.25;
        const target = this.escortTarget(member, desired, colliders);
        const dx = target.x - member.position.x,
          dz = target.z - member.position.z,
          length = Math.hypot(dx, dz);
        if (length > 0.03) {
          const amount = Math.min(length, Math.max(0, dt) * 2.4);
          this.moveSafe(
            member.object,
            (dx / length) * amount,
            (dz / length) * amount,
            colliders,
            0.27,
          );
          member.object.rotation.y = Math.atan2(dx, dz);
          this.world.animate(member, "walk");
        } else this.world.animate(member, "idle");
      }
      reached =
        distance(this.playerPosition, goal) < 3 &&
        task.members.every((member) => distance(member.position, goal) < 1.2);
      task.anchor = task.members[1].object;
    } else if (traversal.carrying) {
      const cargo = task.cargo,
        target = this.playerPosition.clone().add(traversal.offset),
        dx = target.x - cargo.position.x,
        dz = target.z - cargo.position.z,
        length = Math.hypot(dx, dz),
        amount = Math.min(
          length,
          Math.max(0, dt) * (traversal.type === "push" ? 2.6 : 3.4),
        );
      if (length > 0.005) {
        const before = cargo.position.clone();
        this.moveSafe(
          cargo,
          (dx / length) * amount,
          (dz / length) * amount,
          this.cargoColliders(task, colliders),
          traversal.type === "push" ? 0.55 : 0.38,
        );
        blocked = distance(before, cargo.position) < amount * 0.2;
        const moved = distance(before, cargo.position);
        if (moved > 0.001) {
          cargo.rotation.y = Math.atan2(dx, dz);
          for (const part of ["left-wheel", "right-wheel"]) {
            const id = cargo.userData.dynamicParts?.[part]?.node;
            if (id) cargo.getObjectByName(id).rotation.x += moved / 0.39;
          }
        }
      }
      cargo.position.y = traversal.type === "carry" ? 0.65 : 0;
      task.anchor = cargo;
      const checkpointRadius = this.checkpointRadius(
        traversal.step,
        goal,
        colliders,
      );
      reached =
        traversal.step.kind === "carry-drop-zone"
          ? this.dropZoneReady(task, traversal.step)
          : distance(cargo.position, goal) < checkpointRadius &&
            distance(this.playerPosition, cargo.position) < 2.5;
    } else
      reached =
        distance(this.playerPosition, goal) < (traversal.step.radius || 1.2) &&
        (!["overlap"].includes(traversal.type) ||
          (traversal.distanceTravelled > 0.15 &&
            distance(this.playerPosition, traversal.startPosition) > 0.15));
    if (reached) {
      traversal.index++;
      if (traversal.index >= traversal.route.length) {
        if (traversal.type === "checkpoint") {
          task.reached.add(traversal.step.id);
          task.anchor = task.parts[traversal.step.target];
        } else if (traversal.step.kind === "carry-drop-zone") {
          task.anchor = task.parts[traversal.step.target];
        } else {
          this.record(task, traversal.step);
          if (traversal.type === "overlap" && task.parts["test-board"])
            task.parts["test-board"].position.y = 0.015;
        }
        for (const member of task.members) this.world.animate(member, "idle");
        this.traversal = null;
        this.active = task;
        this.focus(task, task.anchor || task.object);
        this.renderPanel("已抵達實體路點。請完成現場的放置／開關／確認步驟。");
        return { speedMultiplier: 1 };
      }
    }
    this.group.updateMatrixWorld(true);
    const next =
      traversal.route[Math.min(traversal.index, traversal.route.length - 1)];
    const speed =
      blocked &&
      task.cargo &&
      distance(task.cargo.position, this.playerPosition) > 1.8
        ? 0.35
        : traversal.carrying
          ? this.state.effects.find((e) => e.effect.carrySpeedMultiplier)
              ?.effect.carrySpeedMultiplier || 0.8
          : 1;
    const remaining = Math.ceil(distance(this.playerPosition, position(next)));
    const lagging =
      traversal.type === "escort" &&
      task.members.some(
        (member) => distance(member.position, this.playerPosition) > 6,
      );
    const cargoGap =
      traversal.carrying && task.cargo
        ? distance(task.cargo.position, this.playerPosition)
        : 0;
    const guidance = blocked
      ? "貨物受阻 · 回頭繞開障礙"
      : lagging
        ? "家屬停等中 · 靠近落後的人"
        : cargoGap > 2.5
          ? "貨物落後 · 靠近貨物重新帶路"
          : traversal.carrying && remaining <= 2
            ? "停在光圈旁，讓貨物跟上"
            : traversal.carrying
              ? "貨物跟隨中 · E 放下"
              : "沿金色光圈前進";
    return {
      speedMultiplier: speed,
      objective: `${traversal.type === "escort" ? "護送三位家屬" : traversal.type === "push" ? "推車" : traversal.type === "carry" ? "搬運" : "前往"} · 路點 ${Math.min(traversal.index + 1, traversal.route.length)} / ${traversal.route.length} · ${remaining} 公尺 · ${guidance}`,
    };
  }
  labels() {
    const labels = this.tasks
      .filter((task) => !this.done(task) && this.available(task))
      .map((task) => {
        const p = this.taskPoint(task);
        return {
          position: { x: p.x, y: p.y + 1.9, z: p.z },
          text: `⚙ ${task.title}${task.carrying ? " · 跟隨中" : task.cargoEverPicked && !this.done(task) ? " · 已放下，E 拿起" : ""}`,
        };
      });
    if (this.traversal) {
      const t = this.traversal,
        p = t.route[Math.min(t.index, t.route.length - 1)];
      labels.push({
        position: { x: p[0], y: 0.6, z: p[1] },
        text: t.paused
          ? "停等中 · E 繼續"
          : `路點 ${t.index + 1}/${t.route.length}`,
      });
      if (t.type === "escort")
        t.task.members.forEach((member, i) =>
          labels.push({
            position: { x: member.position.x, y: 2.2, z: member.position.z },
            text: `家屬 ${i + 1}/3${distance(member.position, this.playerPosition) > 6 ? " · 等你靠近" : ""}`,
          }),
        );
    }
    return labels;
  }
  releaseTextures() {
    for (const texture of this.textures) texture.dispose();
    this.textures.clear();
  }
  dispose() {
    this.restoreCamera();
    this.releaseTextures();
    this.pendingEffects = [];
    const meshes = new Set();
    this.group.traverse((node) => {
      if (node.isMesh) meshes.add(node);
    });
    this.world.solids = this.world.solids.filter((node) => !meshes.has(node));
    this.world.colliders = this.world.colliders.filter(
      (box) => !this.ownedColliders.includes(box),
    );
    for (const task of this.tasks)
      for (const actor of task.members) {
        actor.mixer.stopAllAction();
        actor.mixer.uncacheRoot(actor.visual);
        this.world.disposeObjects?.([actor.object]);
        actor.object.removeFromParent();
        this.world.actors = this.world.actors.filter(
          (entry) => entry !== actor,
        );
      }
    this.world.disposeObjects?.([this.group]);
    this.group.removeFromParent();
    this.active = null;
    this.traversal = null;
  }
}
