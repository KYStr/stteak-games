import * as THREE from "three";
import {
  createIsland,
  createPilot,
  createStation,
  createRelic,
  createWind,
} from "./models.js";
import { WORLD, routeWindActive } from "./world.js";
const V = THREE.Vector3;

// Render and simulation use the same persisted stage index. A completed course
// starts at stage zero on a new expedition; completion in this run hides entry.
export function courseVisualState(challenge, state, world = WORLD) {
  if (!challenge) return null;
  const saved = state.courseStages?.[challenge.id] || 0;
  const stages = challenge.stages || [];
  const stageIndex = saved >= stages.length ? 0 : saved;
  const stage = stages[stageIndex];
  const from = world.islands.find(
    (island) => island.id === stage?.fromIslandId,
  );
  const to = world.islands.find((island) => island.id === stage?.toIslandId);
  const entry = from
    ? { ...challenge, x: from.x + 18, y: from.y + 22, z: from.z - 18 }
    : challenge;
  const gates = stage?.gates || challenge.gates || [];
  const progress = state.challengeProgress?.[challenge.id] || 0;
  return {
    entry,
    stage,
    stageIndex,
    completed: state.challenges?.includes(challenge.id) || false,
    key: `${challenge.id}:${stageIndex}`,
    // The final point is the actual delivery centre, not the old entry loop.
    points: [entry, ...gates, to || entry],
    winds: (stage?.winds || challenge.winds || []).filter(
      (wind) => wind.gate === progress,
    ),
    progress,
  };
}

export function navigationVisualState(state) {
  const target = state.challengeHint || state.trackedHint || state.surveyHint;
  const label = state.challengeHint
    ? state.challengeHint.landing
      ? `第 ${state.challengeHint.stage}/${state.challengeHint.stageTotal} 段 · 落島交付`
      : `第 ${state.challengeHint.stage}/${state.challengeHint.stageTotal} 段 · 測風門 ${state.challengeHint.step}/${state.challengeHint.total - 1}`
    : state.trackedHint
      ? state.trackedHint.transit
        ? `安全接駁 ${state.trackedHint.transitStep}/${state.trackedHint.transitTotal}`
        : `${state.trackedHint.stageName || state.trackedHint.name}入口`
      : state.surveyHint
        ? `${state.surveyHint.name} ${state.surveyHint.step}/${state.surveyHint.total}`
        : null;
  return {
    target,
    label,
    surveyTarget: state.activeChallenge
      ? null
      : state.trackedHint
        ? state.trackedHint.transit
          ? state.trackedHint
          : null
        : state.surveyHint,
    mainRouteVisible: !state.activeChallenge && !state.trackedHint,
  };
}

export function navigationOverlapsCard(label, card) {
  return !!(
    label &&
    card &&
    card.width > 0 &&
    card.height > 0 &&
    label.left < card.right + 4 &&
    label.right > card.left - 4 &&
    label.top < card.bottom + 4 &&
    label.bottom > card.top - 4
  );
}

// ResizeObserver refreshes dimensions only when layout changes. Each flight
// frame compares cached rectangles, so moving the label needs no layout read.
export class NavigationLabelOcclusion {
  constructor(label, card, Observer = globalThis.ResizeObserver) {
    this.label = label;
    this.card = card;
    this.anchor = null;
    this.size = null;
    this.origin = { x: 0, y: 0 };
    this.cardRect = null;
    this.observer = new Observer(() => this.refresh());
    this.observer.observe(label);
    this.observer.observe(card);
  }
  refresh() {
    this.cardRect = this.card.getBoundingClientRect();
    const bounds = this.label.getBoundingClientRect();
    if (bounds.width > 0 && bounds.height > 0) {
      this.size = { width: bounds.width, height: bounds.height };
      if (this.anchor) {
        this.origin.x = bounds.left + bounds.width / 2 - this.anchor.x;
        this.origin.y = bounds.top + bounds.height / 2 - this.anchor.y;
      }
    }
    this.apply();
  }
  place(x, y) {
    this.anchor = { x, y };
    this.apply();
  }
  apply() {
    const bounds =
      this.anchor && this.size
        ? {
            left: this.anchor.x + this.origin.x - this.size.width / 2,
            right: this.anchor.x + this.origin.x + this.size.width / 2,
            top: this.anchor.y + this.origin.y - this.size.height / 2,
            bottom: this.anchor.y + this.origin.y + this.size.height / 2,
          }
        : null;
    // Visibility retains measurable bounds and never moves the world anchor.
    this.label.style.visibility = navigationOverlapsCard(bounds, this.cardRect)
      ? "hidden"
      : "";
  }
  dispose() {
    this.observer.disconnect();
  }
}

export function createWorldWind(data) {
  const thermal = data.type === "updraft" || data.type === "thermal";
  const length = data.start
    ? Math.hypot(data.end.x - data.start.x, data.end.z - data.start.z)
    : 30;
  const group = createWind(data.type, {
    radius: thermal ? data.radius * 0.65 : 5,
    height: thermal ? 32 : 9,
    length,
  });
  group.position.set(
    data.x,
    thermal
      ? data.ceiling - 29
      : data.start
        ? (data.start.y + data.end.y) / 2
        : 20,
    data.z,
  );
  if (!thermal && data.direction)
    group.rotation.y = Math.atan2(data.direction.x, data.direction.z);
  if (data.start && data.end) {
    // The corridor belongs to the same visibility group as its arrows. Local
    // coordinates preserve its world path while avoiding orphan route lines.
    const a = group.worldToLocal(
      new V(data.start.x, data.start.y ?? data.y, data.start.z),
    );
    const b = group.worldToLocal(
      new V(data.end.x, data.end.y ?? data.y, data.end.z),
    );
    const curve = new THREE.CatmullRomCurve3([
      a,
      new V().lerpVectors(a, b, 0.5).add(new V(0, 1, 0)),
      b,
    ]);
    const line = new THREE.Mesh(
      new THREE.TubeGeometry(curve, 24, 0.6, 5, false),
      new THREE.MeshBasicMaterial({
        color: data.type === "crosswind" ? "#e6bc73" : "#b6f1da",
        transparent: true,
        opacity: 0.15,
        depthWrite: false,
      }),
    );
    line.name = "wind-corridor-path";
    group.add(line);
  }
  return group;
}

function disposeSceneObject(object) {
  const geometries = new Set(),
    materials = new Set();
  object.traverse((child) => {
    if (child.geometry) geometries.add(child.geometry);
    for (const material of Array.isArray(child.material)
      ? child.material
      : child.material
        ? [child.material]
        : [])
      materials.add(material);
  });
  for (const geometry of geometries) geometry.dispose();
  for (const material of materials) material.dispose();
}

// Geometry is retained while the target moves. A directional ring keeps its
// plane normal aligned to the required flight heading instead of billboarding.
export class FlightTargetMarker {
  constructor(color = "#ffe1a2") {
    this.group = new THREE.Group();
    this.group.name = "flight-target";
    const material = new THREE.MeshBasicMaterial({ color, depthWrite: false });
    this.ring = new THREE.Mesh(
      new THREE.TorusGeometry(1, 0.018, 8, 48),
      material,
    );
    this.group.add(this.ring);
    this.arrow = new THREE.Group();
    this.shaft = new THREE.Mesh(
      new THREE.CylinderGeometry(0.1, 0.1, 1, 6),
      material,
    );
    this.tip = new THREE.Mesh(new THREE.ConeGeometry(0.75, 1.8, 7), material);
    this.shaft.rotation.x = this.tip.rotation.x = Math.PI / 2;
    this.arrow.add(this.shaft, this.tip);
    this.group.add(this.arrow);
    this.group.visible = false;
  }
  update(target, player) {
    this.group.visible = !!target;
    if (!target) return;
    const radius = target.radius || 10;
    const heading = target.heading;
    const directional = heading && Math.hypot(heading.x, heading.z) > 0;
    this.group.position.set(
      target.x,
      target.y + (target.landing ? 0.25 : 0),
      target.z,
    );
    this.ring.scale.setScalar(radius);
    this.group.rotation.set(
      target.landing ? -Math.PI / 2 : 0,
      target.landing
        ? 0
        : directional
          ? Math.atan2(heading.x, heading.z)
          : Math.atan2(player.x - target.x, player.z - target.z),
      0,
    );
    this.arrow.visible = !!directional && !target.landing;
    const length = Math.min(12, Math.max(6, radius));
    this.arrow.position.set(0, radius + 1.5, 0);
    this.shaft.scale.y = length - 1.8;
    this.shaft.position.z = -0.9;
    this.tip.position.z = length / 2 - 0.9;
  }
  dispose() {
    disposeSceneObject(this.group);
  }
}

function hierarchyVisible(object) {
  for (let current = object; current; current = current.parent)
    if (!current.visible) return false;
  return true;
}

// Keep geometric obstruction separate from its visual treatment. In particular,
// a faded column remains a raw ray hit in the camera observer.
function sampleForeground(camera, player, meshes, ray = new THREE.Raycaster()) {
  const visible = meshes.filter(hierarchyVisible),
    hits = new Map();
  for (const [sample, height] of [
    ["head", 1.65],
    ["torso", 1.05],
    ["hips", 0.55],
  ]) {
    const point = new V(player.x, player.y + height, player.z);
    const direction = point.sub(camera.position),
      distance = direction.length();
    if (distance <= camera.near + 0.1) continue;
    ray.set(camera.position, direction.normalize());
    ray.near = camera.near;
    ray.far = distance - 0.1;
    for (const hit of ray.intersectObjects(visible, false)) {
      const previous = hits.get(hit.object);
      if (!previous || hit.distance < previous.distance)
        hits.set(hit.object, { ...hit, sample });
    }
  }
  return [...hits.values()].sort((a, b) => a.distance - b.distance);
}

export class ForegroundOcclusion {
  constructor() {
    this.meshes = [];
    this.owners = new Map();
    this.materials = new Map();
    this.targets = new Set();
    this.ray = new THREE.Raycaster();
    this.sinceSample = Infinity;
    this.maxFadedMeshes = 8;
  }
  register(root, owner = {}) {
    root.updateWorldMatrix(true, true);
    root.traverse((mesh) => {
      if (
        !mesh.isMesh ||
        mesh.isInstancedMesh ||
        mesh.isSkinnedMesh ||
        this.owners.has(mesh)
      )
        return;
      const materials = Array.isArray(mesh.material)
        ? mesh.material
        : [mesh.material];
      if (
        !materials.some(
          (material) =>
            material.visible &&
            (!material.transparent || material.opacity >= 0.85),
        )
      )
        return;
      this.meshes.push(mesh);
      this.owners.set(mesh, owner);
    });
  }
  update(camera, player, dt, enabled = true) {
    const elapsed = Math.max(0, Math.min(dt, 0.1));
    this.sinceSample += elapsed;
    if (!enabled) {
      this.targets.clear();
      this.sinceSample = Infinity;
    } else if (this.sinceSample >= 0.075) {
      this.targets = new Set(
        sampleForeground(camera, player, this.meshes, this.ray)
          .slice(0, this.maxFadedMeshes)
          .map((hit) => hit.object),
      );
      this.sinceSample = 0;
    }
    // Keep the cap true during a fast camera sweep as well as at rest. If new
    // blockers fill the budget, old nonblocking meshes restore immediately;
    // otherwise their short fade-out is retained.
    let restoringBudget = Math.max(0, this.maxFadedMeshes - this.targets.size);
    for (const [mesh, entry] of this.materials) {
      if (
        entry.factor < 1 &&
        !this.targets.has(mesh) &&
        restoringBudget-- <= 0
      ) {
        entry.factor = 1;
        mesh.material = entry.original;
      }
    }
    for (const mesh of this.targets) {
      if (this.materials.has(mesh)) continue;
      // One retained clone per encountered mesh/material, never per frame. The
      // shared palette stays intact for other stations, islands and the pilot.
      const original = mesh.material;
      const sources = Array.isArray(original) ? original : [original];
      const copies = sources.map((material) => {
        const copy = material.clone();
        copy.transparent = true;
        copy.depthWrite = false;
        return copy;
      });
      this.materials.set(mesh, {
        original,
        sources,
        copies,
        factor: 1,
        faded: Array.isArray(original) ? copies : copies[0],
      });
    }
    for (const [mesh, entry] of this.materials) {
      const blocked =
        enabled && this.targets.has(mesh) && hierarchyVisible(mesh);
      entry.factor = blocked
        ? Math.max(0.16, entry.factor - elapsed * 8)
        : Math.min(1, entry.factor + elapsed * 6);
      if (entry.factor >= 1) {
        mesh.material = entry.original;
      } else {
        for (let i = 0; i < entry.copies.length; i++)
          entry.copies[i].opacity = entry.sources[i].opacity * entry.factor;
        mesh.material = entry.faded;
      }
    }
  }
  inspect(camera, player) {
    const hits = sampleForeground(camera, player, this.meshes);
    const describe = (mesh) => {
      const entry = this.materials.get(mesh);
      return {
        object: mesh.name || mesh.type,
        ...this.owners.get(mesh),
        opacityFactor:
          entry && mesh.material === entry.faded ? entry.factor : 1,
      };
    };
    return {
      hits,
      treatment: {
        method: "bounded-foreground-fade",
        applied: hits.some((hit) => describe(hit.object).opacityFactor < 1),
        maximumMeshes: this.maxFadedMeshes,
        targetOpacityFactor: 0.16,
        sampleIntervalSeconds: 0.075,
        rawBlockers: hits.map((hit) => ({
          ...describe(hit.object),
          sample: hit.sample,
        })),
        fadingMeshes: [...this.materials]
          .filter(([mesh, entry]) => mesh.material === entry.faded)
          .map(([mesh]) => describe(mesh)),
        retainedMaterialClones: [...this.materials.values()].reduce(
          (sum, entry) => sum + entry.copies.length,
          0,
        ),
      },
    };
  }
  dispose() {
    for (const [mesh, entry] of this.materials) {
      mesh.material = entry.original;
      for (const material of entry.copies) material.dispose();
    }
    this.materials.clear();
    this.targets.clear();
    this.meshes.length = 0;
    this.owners.clear();
  }
}

export class AetherScene {
  constructor(canvas) {
    this.canvas = canvas;
    this.mapScale = WORLD.mapScale || 1;
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color("#8fc8c8");
    this.scene.fog = new THREE.FogExp2("#a4d2ce", 0.0012 / this.mapScale);
    this.renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: false,
      powerPreference: "high-performance",
    });
    this.renderer.setPixelRatio(Math.min(devicePixelRatio, 1.5));
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.2;
    this.camera = new THREE.PerspectiveCamera(56, 1, 0.3, 1800 * this.mapScale);
    this.camera.position.set(100, 88, 145);
    this.scene.add(new THREE.HemisphereLight("#e9f3d4", "#277d81", 2.7));
    this.sun = new THREE.DirectionalLight("#fff1c5", 3);
    this.sun.position.set(-80, 130, 40);
    this.sun.castShadow = true;
    this.sun.shadow.mapSize.set(1024, 1024);
    Object.assign(this.sun.shadow.camera, {
      left: -45,
      right: 45,
      top: 45,
      bottom: -45,
      near: 1,
      far: 240,
    });
    this.sun.shadow.bias = -0.001;
    this.sun.shadow.normalBias = 0.2;
    this.scene.add(this.sun, this.sun.target);
    const sky = new THREE.Mesh(
      new THREE.SphereGeometry(1300 * this.mapScale, 32, 16),
      new THREE.ShaderMaterial({
        side: THREE.BackSide,
        depthWrite: false,
        uniforms: {
          top: { value: new THREE.Color("#438c9e") },
          bottom: { value: new THREE.Color("#b4d8d2") },
        },
        vertexShader:
          "varying vec3 p;void main(){p=position;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}",
        fragmentShader:
          "varying vec3 p;uniform vec3 top;uniform vec3 bottom;void main(){float h=clamp(normalize(p).y*.85+.18,0.,1.);vec3 c=mix(bottom,top,pow(h,.65));float sun=pow(max(0.,dot(normalize(p),normalize(vec3(-.5,.35,-.6)))),80.);gl_FragColor=vec4(c+vec3(.35,.24,.1)*sun,1.);}",
      }),
    );
    sky.material.fog = false;
    this.scene.add(sky);
    this.islands = [];
    this.stations = [];
    this.relics = [];
    this.winds = [];
    this.collidables = [];
    this.foreground = new ForegroundOcclusion();
    this.labels = [];
    WORLD.islands.forEach((data, i) => {
      const island = createIsland({
        radius: data.radius,
        region: data.region,
        index: i,
      });
      island.position.set(data.x, data.y, data.z);
      this.scene.add(island);
      this.islands.push(island);
      this.foreground.register(island, { kind: "island", id: data.id });
      island.traverse((o) => {
        if (o.isMesh && !o.isInstancedMesh) this.collidables.push(o);
      });
      if (data.station) {
        const station = createStation([0, 2, 1][this.stations.length % 3]);
        station.position.set(data.x, data.y + 0.1, data.z);
        station.scale.setScalar(1.8);
        this.scene.add(station);
        this.foreground.register(station, { kind: "station", id: data.id });
        this.stations.push({ data, group: station });
      } else if (i === 0) {
        const station = createStation("astral");
        station.position.set(data.x + 7, data.y, data.z + 5);
        station.scale.setScalar(1.4);
        this.scene.add(station);
        this.foreground.register(station, {
          kind: "camp-decoration",
          id: data.id,
        });
      }
      const label = document.createElement("div");
      label.className = "island-label";
      label.innerHTML = `<span>${String(i + 1).padStart(2, "0")} / ${data.region}</span>${data.name}<b>${data.station ? "◇" : "·"}</b>`;
      document.querySelector("#world-labels").append(label);
      this.labels.push({ label, data });
    });
    WORLD.relics.forEach((data, i) => {
      const group = createRelic(i);
      group.position.set(data.x, data.y + 1.2, data.z);
      this.scene.add(group);
      this.relics.push({ data, group });
    });
    WORLD.winds.forEach((data) => {
      const group = createWorldWind(data);
      this.scene.add(group);
      this.winds.push({ data, group });
    });
    this.hazards = WORLD.hazards.map((data) => {
      const group = new THREE.Group();
      const material = new THREE.MeshStandardMaterial({
        color: data.type === "thunder" ? "#34485d" : "#cbdfd4",
        transparent: true,
        opacity: data.type === "thunder" ? 0.57 : 0.19,
        roughness: 1,
        depthWrite: false,
      });
      const cloud = new THREE.InstancedMesh(
          new THREE.IcosahedronGeometry(1, 1),
          material,
          12,
        ),
        dummy = new THREE.Object3D();
      for (let i = 0; i < 12; i++) {
        const a = i * 2.399;
        dummy.position.set(
          Math.cos(a) * data.radius * 0.6,
          (i % 4) * 10 + 18,
          Math.sin(a) * data.radius * 0.6,
        );
        dummy.scale.set(data.radius * 0.42, 8, data.radius * 0.32);
        dummy.updateMatrix();
        cloud.setMatrixAt(i, dummy.matrix);
      }
      group.add(cloud);
      if (data.type === "thunder") {
        const core = new THREE.Mesh(
          new THREE.OctahedronGeometry(4, 0),
          new THREE.MeshStandardMaterial({
            color: "#d6a9f4",
            emissive: "#ad77cf",
            emissiveIntensity: 1,
          }),
        );
        core.position.y = 33;
        group.add(core);
        group.userData.core = core;
      }
      group.position.set(data.x, data.y, data.z);
      this.scene.add(group);
      return { group, data };
    });
    this.challenges = WORLD.challenges.map((data) => {
      const marker = new FlightTargetMarker("#f7d38e");
      this.scene.add(marker.group);
      return { data, group: marker.group, marker };
    });
    this.surveyMarker = new FlightTargetMarker();
    this.surveyMarker.group.name = "main-survey-target";
    this.scene.add(this.surveyMarker.group);
    this.pilot = createPilot();
    this.wasGrounded = true;
    this.landingTime = 0;
    this.scene.add(this.pilot.group);
    const shadowMat = new THREE.MeshBasicMaterial({
      color: "#082d39",
      transparent: true,
      opacity: 0.24,
      depthWrite: false,
    });
    this.contactShadow = new THREE.Mesh(
      new THREE.CircleGeometry(1.5, 24),
      shadowMat,
    );
    this.contactShadow.rotation.x = -Math.PI / 2;
    this.scene.add(this.contactShadow);
    this.marker = new THREE.Group();
    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(4.6, 0.12, 6, 56),
      new THREE.MeshBasicMaterial({
        color: "#ffe1a2",
        transparent: true,
        opacity: 0.8,
      }),
    );
    ring.rotation.x = -Math.PI / 2;
    this.marker.add(ring);
    const beam = new THREE.Mesh(
      new THREE.CylinderGeometry(0.15, 0.15, 38, 6),
      new THREE.MeshBasicMaterial({
        color: "#ffe5ae",
        transparent: true,
        opacity: 0.25,
        depthWrite: false,
      }),
    );
    beam.position.y = 19;
    this.marker.add(beam);
    this.scene.add(this.marker);
    const cloudGeo = new THREE.IcosahedronGeometry(1, 1),
      cloudMat = new THREE.MeshStandardMaterial({
        color: "#d1e2ce",
        roughness: 1,
        flatShading: true,
        transparent: true,
        opacity: 0.52,
        depthWrite: false,
      });
    this.clouds = new THREE.InstancedMesh(cloudGeo, cloudMat, 100);
    const dummy = new THREE.Object3D();
    for (let i = 0; i < 100; i++) {
      const a = i * 2.39996,
        r = (90 + Math.sqrt(i) * 62) * this.mapScale;
      dummy.position.set(
        Math.cos(a) * r + 70 * this.mapScale,
        -55 - (i % 5) * 8,
        Math.sin(a) * r - 80 * this.mapScale,
      );
      dummy.scale.set(
        (22 + (i % 5) * 7) * Math.sqrt(this.mapScale),
        10 + (i % 3) * 5,
        (15 + (i % 7) * 4) * Math.sqrt(this.mapScale),
      );
      dummy.rotation.y = a;
      dummy.updateMatrix();
      this.clouds.setMatrixAt(i, dummy.matrix);
    }
    this.scene.add(this.clouds);
    const dustGeo = new THREE.BufferGeometry(),
      positions = new Float32Array(180 * 3);
    for (let i = 0; i < 180; i++) {
      positions[i * 3] =
        ((Math.sin(i * 237.33) * 0.5 + 0.5) * 700 - 250) * this.mapScale;
      positions[i * 3 + 1] = (i % 47) * 2;
      positions[i * 3 + 2] = (Math.cos(i * 131.13) * 350 - 50) * this.mapScale;
    }
    dustGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    this.dust = new THREE.Points(
      dustGeo,
      new THREE.PointsMaterial({
        size: 0.5,
        color: "#eff5c9",
        transparent: true,
        opacity: 0.55,
        sizeAttenuation: true,
      }),
    );
    this.scene.add(this.dust);
    this.routeLine = null;
    this.courseLine = null;
    this.courseId = null;
    this.courseWindKey = "";
    this.courseWinds = [];
    this.yaw = 0;
    this.manualYaw = 0;
    this.cameraSnapPending = false;
    this.pitch = 0.63;
    this.distance = 26;
    this.overhead = false;
    this.reduced = false;
    this.menu = true;
    this.target = new V();
    this.ray = new THREE.Raycaster();
    this.frames = [];
    this.metrics = {
      frames: 0,
      drawCalls: 0,
      triangles: 0,
      geometries: 0,
      textures: 0,
    };
    this.navTarget = document.querySelector("#nav-target");
    this.navText = this.navTarget.querySelector("span");
    this.navOcclusion = new NavigationLabelOcclusion(
      this.navTarget,
      document.querySelector("#course"),
    );
    this.resize = () => {
      const w = canvas.clientWidth,
        h = canvas.clientHeight;
      this.renderer.setSize(w, h, false);
      this.camera.aspect = w / h;
      this.camera.updateProjectionMatrix();
      this.navOcclusion.refresh();
    };
    window.addEventListener("resize", this.resize);
    this.resize();
  }
  setQuality(q) {
    this.renderer.setPixelRatio(
      q === "low" ? 1 : Math.min(devicePixelRatio, 1.5),
    );
    this.renderer.shadowMap.enabled = q !== "low";
    this.clouds.visible = q !== "low";
    this.resize();
  }
  setRoute(route) {
    if (this.routeLine) {
      this.scene.remove(this.routeLine);
      this.routeLine.geometry.dispose();
      this.routeLine.material.dispose();
      this.routeLine = null;
    }
    if (!route?.waypoints?.length) return;
    const points = route.waypoints.map((p) => new V(p.x, p.y + 2, p.z));
    this.routeLine = new THREE.Line(
      new THREE.BufferGeometry().setFromPoints(points),
      new THREE.LineDashedMaterial({
        color: route.style === "shortcut" ? "#f2bf7a" : "#c7f4df",
        dashSize: 3,
        gapSize: 4,
        transparent: true,
        opacity: 0.55,
      }),
    );
    this.routeLine.computeLineDistances();
    this.scene.add(this.routeLine);
  }
  updateCourse(state, world = WORLD) {
    const course = world.challenges.find((c) => c.id === state.activeChallenge);
    const visual = courseVisualState(course, state, world);
    const courseKey = visual?.key || null;
    if (this.courseId !== courseKey) {
      if (this.courseLine) {
        this.scene.remove(this.courseLine);
        disposeSceneObject(this.courseLine);
        this.courseLine = null;
      }
      this.courseId = courseKey;
      if (visual) {
        const points = visual.points.map((q) => new V(q.x, q.y, q.z));
        this.courseLine = new THREE.Line(
          new THREE.BufferGeometry().setFromPoints(points),
          new THREE.LineDashedMaterial({
            color: "#f7d38e",
            dashSize: 2,
            gapSize: 4,
            transparent: true,
            opacity: 0.6,
          }),
        );
        this.courseLine.computeLineDistances();
        this.scene.add(this.courseLine);
      }
    }
    const windKey = visual ? `${visual.key}:${visual.progress}` : "";
    if (this.courseWindKey === windKey) return;
    for (const { group } of this.courseWinds) {
      this.scene.remove(group);
      disposeSceneObject(group);
    }
    this.courseWinds = [];
    this.courseWindKey = windKey;
    for (const data of visual?.winds || []) {
      const thermal = data.type === "thermal" || data.type === "updraft";
      const length = data.start
        ? Math.hypot(data.end.x - data.start.x, data.end.z - data.start.z)
        : 30;
      const group = createWind(data.type, {
        radius: thermal ? data.radius * 0.6 : 4,
        height: 25,
        length,
      });
      group.position.set(
        data.x,
        thermal
          ? data.ceiling - 22
          : data.start
            ? (data.start.y + data.end.y) / 2
            : data.y + data.height / 2,
        data.z,
      );
      if (!thermal && data.direction)
        group.rotation.y = Math.atan2(data.direction.x, data.direction.z);
      this.scene.add(group);
      this.courseWinds.push({ data, group });
    }
  }
  updateWorldWinds(state, dt) {
    for (const { data, group } of this.winds) {
      const active = routeWindActive(data, state);
      group.visible =
        active &&
        (data.type !== "crosswind" ||
          Math.sin(
            (state.elapsed / data.period) * Math.PI * 2 +
              ((state.seed % 1009) / 1009) * Math.PI * 2,
          ) > 0);
      if (active) group.userData.update?.(this.reduced ? 0 : dt);
    }
  }
  rotate(dx, dy) {
    this.manualYaw -= dx;
    this.pitch = THREE.MathUtils.clamp(this.pitch + dy, 0.23, 1.15);
  }
  zoom(d) {
    this.distance = THREE.MathUtils.clamp(this.distance + d, 16, 52);
  }
  recenter({ immediate = false } = {}) {
    this.manualYaw = 0;
    this.pitch = 0.63;
    this.distance = 26;
    if (immediate) {
      this.yaw = 0;
      this.cameraSnapPending = true;
    }
  }
  inspectCamera(player) {
    // On-demand observation only: never changes the camera, physics or render loop.
    // Renderer.render has already updated the matrices for the sampled frame.
    const point = new V(player.x, player.y + 2, player.z),
      ndc = point.clone().project(this.camera),
      distance = this.camera.position.distanceTo(point),
      inspection = this.foreground?.inspect(this.camera, player),
      hits =
        inspection?.hits ||
        sampleForeground(this.camera, player, this.collidables),
      hit = hits[0],
      platform = WORLD.islands.find(
        (island) =>
          Math.hypot(
            this.camera.position.x - island.x,
            this.camera.position.z - island.z,
          ) < island.radius,
      ),
      xyz = (vector) => ({ x: vector.x, y: vector.y, z: vector.z });
    return {
      position: xyz(this.camera.position),
      target: xyz(this.target),
      near: this.camera.near,
      far: this.camera.far,
      fov: this.camera.fov,
      mode: this.menu ? "menu" : this.overhead ? "overhead" : "follow",
      manualYaw: this.manualYaw,
      yaw: this.yaw,
      pitch: this.pitch,
      distance,
      canvas: {
        width: this.canvas.width,
        height: this.canvas.height,
        cssWidth: this.canvas.clientWidth,
        cssHeight: this.canvas.clientHeight,
        pixelRatio: this.renderer.getPixelRatio(),
      },
      playerNDC: xyz(ndc),
      playerInFrustum:
        Math.abs(ndc.x) <= 1 && Math.abs(ndc.y) <= 1 && Math.abs(ndc.z) <= 1,
      platformUnderCamera: platform
        ? {
            id: platform.id,
            surfaceY: platform.y,
            clearance: this.camera.position.y - platform.y,
          }
        : null,
      occlusion: {
        blocked: Boolean(hit),
        rawBlocked: Boolean(hit),
        distance: hit?.distance ?? null,
        point: hit ? xyz(hit.point) : null,
        object: hit ? hit.object.name || hit.object.type : null,
        sample: hit?.sample ?? null,
        rawBlockerCount: hits.length,
        treatment: inspection?.treatment ?? { method: "none", applied: false },
        method:
          "Camera-to-player head, torso and hips rays against visible island and independent station/camp meshes. Raw geometry hits remain blocked even while locally faded. Excludes hidden LOD ancestry, instanced vegetation and translucent wind/cloud effects.",
      },
    };
  }
  update(s, dt, time, objective) {
    const p = s.player;
    const navigationView = navigationVisualState(s);
    const speed = Math.hypot(p.vx || 0, p.vz || 0);
    this.pilot.group.position.set(p.x, p.y, p.z);
    this.pilot.group.rotation.y = Math.PI - (p.heading || 0);
    if (p.grounded && !this.wasGrounded) this.landingTime = 0.42;
    this.landingTime = Math.max(0, this.landingTime - dt);
    this.wasGrounded = p.grounded;
    this.pilot.update(dt, {
      grounded: p.grounded,
      gliding: p.gliding,
      speed,
      mode:
        this.landingTime > 0
          ? "land"
          : p.gliding
            ? "glide"
            : p.grounded
              ? speed > 0.4
                ? "run"
                : "idle"
              : "jump",
    });
    for (const { data, group } of this.relics) {
      group.visible = !s.relics.includes(data.id);
      if (!this.reduced) group.rotation.y = time * 0.7;
      group.position.y =
        data.y +
        1.2 +
        (this.reduced ? 0 : Math.sin(time * 1.5 + data.x) * 0.25);
    }
    this.updateWorldWinds(s, dt);
    for (const { data, marker } of this.challenges) {
      const visual = courseVisualState(data, s);
      marker.update(
        visual.completed
          ? null
          : s.activeChallenge === data.id && s.challengeHint
            ? s.challengeHint
            : visual.entry,
        p,
      );
    }
    this.surveyMarker.update(navigationView.surveyTarget, p);
    this.updateCourse(s);
    if (this.routeLine)
      this.routeLine.visible = navigationView.mainRouteVisible;
    for (const { data, group } of this.courseWinds) {
      group.userData.update?.(this.reduced ? 0 : dt);
      if (data.type === "crosswind")
        group.visible =
          Math.sin(
            (s.elapsed / data.period) * Math.PI * 2 +
              ((s.seed % 1009) / 1009) * Math.PI * 2,
          ) > 0;
    }
    for (const { data, group } of this.hazards) {
      if (group.userData.core) {
        const active =
          Math.sin((s.elapsed / data.period) * Math.PI * 2 + (s.seed % 19)) >
          0.15;
        group.userData.core.material.emissiveIntensity = active ? 2 : 0.25;
        group.userData.core.rotation.y = time * 0.3;
      }
    }
    this.scene.fog.density =
      s.hazard === "fog" ? 0.006 : 0.0012 / this.mapScale;
    const ground = WORLD.islands.find(
      (i) => Math.hypot(p.x - i.x, p.z - i.z) < i.radius,
    );
    this.contactShadow.visible = !!ground;
    if (ground) {
      this.contactShadow.position.set(p.x, ground.y + 0.09, p.z);
      this.contactShadow.scale.setScalar(
        Math.max(0.5, 1 - (p.y - ground.y) * 0.01),
      );
    }
    this.marker.visible =
      !!objective && navigationView.mainRouteVisible && !s.surveyHint;
    if (this.marker.visible) {
      this.marker.position.set(objective.x, objective.y + 0.2, objective.z);
      this.marker.rotation.y = time * 0.2;
    }
    const head = new V(p.x, p.y + 2, p.z);
    // Static foreground matrices are initialized on registration. Only camera
    // and LOD visibility need refreshing before the two foreground queries.
    this.camera.updateMatrixWorld();
    for (const island of this.islands)
      for (const child of island.children)
        if (child.isLOD) child.update(this.camera);
    let desired;
    if (this.menu) {
      desired = new V(82 + Math.sin(time * 0.03) * 10, 74, 112);
      this.target.set(-20, 7, -62);
      this.camera.position.lerp(desired, 1 - Math.exp(-dt * 2));
    } else {
      // A stable north-up flight frame gives immediate directional input; C restores its offset.
      this.yaw = this.manualYaw;
      const pitch = this.overhead ? 1.22 : this.pitch,
        dist = this.overhead
          ? 65
          : this.distance * (this.camera.aspect < 0.8 ? 1.3 : 1);
      desired = new V(
        Math.sin(this.yaw) * Math.cos(pitch) * dist,
        Math.sin(pitch) * dist,
        Math.cos(this.yaw) * Math.cos(pitch) * dist,
      ).add(head);
      const look = new V(
        p.x + (p.vx || 0) * 0.25,
        p.y + 2,
        p.z + (p.vz || 0) * 0.25,
      );
      // Starting or restoring a run changes location discontinuously. Its first
      // rendered frame must follow the new player, not ease from the old island.
      const immediate = this.reduced || this.cameraSnapPending;
      this.target.lerp(look, immediate ? 1 : 1 - Math.exp(-dt * 10));
      // Clamp above the platform under the camera; ray shorten protects foreground cliffs.
      for (const i of WORLD.islands)
        if (Math.hypot(desired.x - i.x, desired.z - i.z) < i.radius + 3)
          desired.y = Math.max(desired.y, i.y + 8);
      this.ray.set(head, new V().subVectors(desired, head).normalize());
      this.ray.far = head.distanceTo(desired);
      const hit = this.ray
        .intersectObjects(this.collidables.filter(hierarchyVisible), false)
        .find((h) => h.distance > 4);
      if (hit)
        desired.lerp(
          head,
          Math.min(0.7, 1 - (hit.distance - 2) / this.ray.far),
        );
      this.camera.position.lerp(
        desired,
        immediate ? 1 : 1 - Math.exp(-dt * 9),
      );
      this.cameraSnapPending = false;
    }
    this.camera.lookAt(this.target);
    this.camera.updateMatrixWorld();
    for (const island of this.islands)
      for (const child of island.children)
        if (child.isLOD) child.update(this.camera);
    this.foreground.update(this.camera, p, dt, !this.menu);
    const route = WORLD.routes.find((r) => r.id === s.objective?.routeId);
    let navigation = navigationView.target;
    if (!navigation && route) {
      let nearest = 0,
        best = Infinity;
      route.waypoints.forEach((q, i) => {
        const d = Math.hypot(q.x - p.x, q.z - p.z);
        if (d < best) {
          best = d;
          nearest = i;
        }
      });
      navigation = {
        ...route.waypoints[Math.min(nearest + 1, route.waypoints.length - 1)],
        label:
          nearest + 1 >= route.waypoints.length - 1 ? "目標島" : "風道節點",
      };
    }
    const nav = this.navTarget;
    nav.style.display = navigation ? "" : "none";
    if (navigation) {
      const v = new V(navigation.x, navigation.y, navigation.z);
      const projection = v.clone().project(this.camera),
        w = this.canvas.clientWidth,
        h = this.canvas.clientHeight;
      let x = (projection.x * 0.5 + 0.5) * w,
        y = (-projection.y * 0.5 + 0.5) * h;
      if (projection.z > 1) {
        x = w / 2;
        y = h - 170;
      }
      const labelWidth = Math.min(260, w - 24);
      const anchorX = THREE.MathUtils.clamp(
        x,
        labelWidth / 2 + 8,
        w - labelWidth / 2 - 8,
      );
      const anchorY = THREE.MathUtils.clamp(y, 100, h - 180);
      nav.style.width = `${labelWidth}px`;
      nav.style.left = `${anchorX}px`;
      nav.style.top = `${anchorY}px`;
      const label = navigationView.label || navigation.label;
      const navText = this.navText;
      navText.style.display = "inline-block";
      navText.style.maxWidth = "100%";
      navText.style.whiteSpace = "normal";
      const navContent = `${label} · ${Math.round(v.distanceTo(new V(p.x, p.y, p.z)))}m${navigation.heading ? " · 順箭頭入環" : ""}`;
      if (navText.textContent !== navContent) navText.textContent = navContent;
      this.navOcclusion.place(anchorX, anchorY);
    }
    this.sun.position.copy(head).add(new V(-70, 110, 45));
    this.sun.target.position.copy(head);
    this.sun.target.updateMatrixWorld();
    for (const { label, data } of this.labels) {
      const pos = new V(data.x, data.y + 14, data.z).project(this.camera);
      const distance = this.camera.position.distanceTo(
        new V(data.x, data.y, data.z),
      );
      label.style.display =
        pos.z < 1 &&
        pos.z > -1 &&
        Math.abs(pos.x) < 1.1 &&
        Math.abs(pos.y) < 1.1 &&
        distance > 35
          ? "block"
          : "none";
      label.style.left = `${(pos.x * 0.5 + 0.5) * this.canvas.clientWidth}px`;
      label.style.top = `${(-pos.y * 0.5 + 0.5) * this.canvas.clientHeight}px`;
      label.style.opacity = Math.max(
        0.35,
        1 - distance / (750 * this.mapScale),
      );
    }
    this.renderer.render(this.scene, this.camera);
    const r = this.renderer.info;
    this.metrics = {
      frames: this.metrics.frames + 1,
      drawCalls: r.render.calls,
      triangles: r.render.triangles,
      geometries: r.memory.geometries,
      textures: r.memory.textures,
    };
  }
  dispose() {
    window.removeEventListener("resize", this.resize);
    this.navOcclusion.dispose();
    this.foreground.dispose();
    this.scene.traverse((o) => {
      o.geometry?.dispose();
      if (o.material) {
        const m = Array.isArray(o.material) ? o.material : [o.material];
        m.forEach((x) => x.dispose());
      }
    });
    this.renderer.dispose();
  }
}
