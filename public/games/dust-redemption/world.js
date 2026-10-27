import * as THREE from "./vendor/three.module.js";
import { GLTFLoader } from "./vendor/GLTFLoader.js";
import { clone } from "./vendor/SkeletonUtils.js";
import { firstHit, makeBox } from "./physics.js";
import { BuildingBatches, TracerBatch } from "./render-batches.js";

const palettes = {
  station: { ground: 0xc19b68, sky: 0xcfb78e, rock: 0xb47950 },
  canyon: { ground: 0xb57b52, sky: 0xcda17b, rock: 0x975b40 },
  mine: { ground: 0xa78c70, sky: 0xb8aaa0, rock: 0x756459 },
  town: { ground: 0xc5a275, sky: 0xd8c39e, rock: 0xae7952 },
};
const onceStates = new Set(["hurt", "down", "reload"]);
const materialList = (object) =>
  Array.isArray(object.material) ? object.material : [object.material];

export class World {
  constructor(canvas) {
    this.renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: false,
      powerPreference: "high-performance",
    });
    this.renderer.setPixelRatio(Math.min(devicePixelRatio, 1.6));
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.22;
    this.scene = new THREE.Scene();
    this.camera = new THREE.OrthographicCamera(-24, 24, 20, -20, 0.1, 160);
    this.cameraIndex = 0;
    this.scene.add(new THREE.HemisphereLight(0xf3ddbd, 0x78624c, 2.5));
    this.sun = new THREE.DirectionalLight(0xffdfad, 3.4);
    this.sun.position.set(-18, 28, 12);
    this.sun.castShadow = true;
    Object.assign(this.sun.shadow.camera, {
      left: -32,
      right: 32,
      top: 32,
      bottom: -32,
      near: 1,
      far: 85,
    });
    this.sun.shadow.mapSize.set(2048, 2048);
    this.sun.shadow.bias = -0.0004;
    this.sun.shadow.normalBias = 0.045;
    this.scene.add(this.sun);
    this.level = new THREE.Group();
    this.scene.add(this.level);
    this.dynamic = new THREE.Group();
    this.scene.add(this.dynamic);
    this.raycaster = new THREE.Raycaster();
    this.shotRaycaster = new THREE.Raycaster();
    this.pointer = new THREE.Vector2();
    this.plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
    this.target = new THREE.Vector3();
    this.templates = new Map();
    this.clips = [];
    this.actors = [];
    this.colliders = [];
    this.occluders = [];
    this.solids = [];
    this.solidBoxes = new WeakMap();
    this.effects = [];
    this.buildingBatches = null;
    this.tracerBatch = null;
    this.sharedTextures = new Set();
    this.resize();
  }
  async load() {
    if (this.templates.size) return;
    const gltf = await new GLTFLoader().loadAsync(
      new URL("./assets/models/frontier-kit.glb", import.meta.url).href,
    );
    gltf.scene.children.forEach((object) =>
      this.templates.set(object.name, object),
    );
    this.clips = gltf.animations;
    // Instances borrow these immutable textures; only dispose() owns their lifetime.
    gltf.scene.traverse((object) => {
      if (object.material)
        for (const material of materialList(object))
          for (const value of Object.values(material))
            if (value?.isTexture) this.sharedTextures.add(value);
    });
  }
  resize() {
    const canvas = this.renderer.domElement,
      w = Math.max(1, canvas.clientWidth),
      h = Math.max(1, canvas.clientHeight);
    this.renderer.setSize(w, h, false);
    const aspect = w / h,
      half = aspect < 1 ? 26 : 22;
    this.camera.left = -half * aspect;
    this.camera.right = half * aspect;
    this.camera.top = half;
    this.camera.bottom = -half;
    this.camera.updateProjectionMatrix();
    this.orient();
  }
  orient() {
    const a = Math.PI / 4 + (this.cameraIndex * Math.PI) / 2;
    this.camera.position.set(Math.sin(a) * 42, 48, Math.cos(a) * 42);
    this.camera.lookAt(0, 0, 0);
    this.camera.updateMatrixWorld();
  }
  rotate(direction) {
    this.cameraIndex = (this.cameraIndex + direction + 4) % 4;
    this.orient();
  }
  quality(low) {
    this.renderer.setPixelRatio(Math.min(devicePixelRatio, low ? 1 : 1.6));
    this.renderer.shadowMap.enabled = !low;
    this.resize();
  }
  model(name, x = 0, z = 0, scale = 1) {
    const source = this.templates.get(name);
    if (!source) throw new Error(`Missing model: ${name}`);
    const object = clone(source),
      geometries = new Map(),
      materials = new Map();
    object.visible = true;
    object.position.set(x, 0, z);
    object.scale.multiplyScalar(scale);
    object.traverse((node) => {
      if (!node.isMesh) return;
      node.castShadow = true;
      node.receiveShadow = true;
      if (!geometries.has(node.geometry))
        geometries.set(node.geometry, node.geometry.clone());
      node.geometry = geometries.get(node.geometry);
      const ownMaterial = (material) => {
        if (!materials.has(material)) materials.set(material, material.clone());
        return materials.get(material);
      };
      node.material = Array.isArray(node.material)
        ? node.material.map(ownMaterial)
        : ownMaterial(node.material);
    });
    return object;
  }
  box(w, h, d, color, x, y, z, parent = this.level) {
    const mesh = new THREE.Mesh(
      new THREE.BoxGeometry(w, h, d),
      new THREE.MeshStandardMaterial({ color, roughness: 0.94 }),
    );
    mesh.position.set(x, y, z);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    parent.add(mesh);
    return mesh;
  }
  disposeObjects(roots, { textures = false } = {}) {
    const geometries = new Set(),
      materials = new Set(),
      skeletons = new Set(),
      shadows = new Set(),
      maps = new Set();
    for (const root of roots)
      root.traverse((object) => {
        if (object.geometry) geometries.add(object.geometry);
        if (object.skeleton) skeletons.add(object.skeleton);
        if (object.isLight && object.shadow) shadows.add(object.shadow);
        if (object.material)
          for (const material of materialList(object)) {
            materials.add(material);
            if (textures)
              for (const value of Object.values(material))
                if (value?.isTexture) maps.add(value);
          }
        if (object.isInstancedMesh) object.dispose();
      });
    // Dispose only lights owned by these roots; the scene sun has its own owner.
    for (const shadow of shadows) shadow.dispose();
    for (const skeleton of skeletons) skeleton.dispose();
    for (const geometry of geometries) geometry.dispose();
    for (const material of materials) material.dispose();
    for (const texture of maps) texture.dispose();
  }
  clear() {
    // Helpers own and detach their GPU resources before the generic scene sweep.
    // Building sources are restored, then disposed exactly once with the level.
    this.buildingBatches?.dispose();
    this.buildingBatches = null;
    this.tracerBatch?.dispose();
    this.tracerBatch = null;
    for (const actor of this.actors) {
      actor.mixer.stopAllAction();
      actor.mixer.uncacheRoot(actor.visual);
    }
    this.disposeObjects([this.level, this.dynamic]);
    this.level.clear();
    this.dynamic.clear();
    this.actors = [];
    this.effects = [];
    this.colliders = [];
    this.occluders = [];
    this.solids = [];
    this.solidBoxes = new WeakMap();
    this.renderer.renderLists.dispose();
  }
  dispose() {
    this.clear();
    this.disposeObjects([...this.templates.values()]);
    for (const texture of this.sharedTextures) texture.dispose();
    this.sharedTextures.clear();
    this.templates.clear();
    this.clips = [];
    this.sun.shadow.map?.dispose();
    this.sun.shadow.mapPass?.dispose();
    this.renderer.dispose();
  }
  solid(object, box = null, { occludes = true } = {}) {
    object.updateWorldMatrix(true, true);
    if (!box) {
      const bounds = new THREE.Box3().setFromObject(object),
        size = bounds.getSize(new THREE.Vector3()),
        center = bounds.getCenter(new THREE.Vector3());
      box = makeBox(
        `scenery-${this.solids.length}`,
        center.x,
        center.z,
        size.x,
        size.y,
        size.z,
        object.name || "scenery",
      );
      box.min = { x: bounds.min.x, y: bounds.min.y, z: bounds.min.z };
      box.max = { x: bounds.max.x, y: bounds.max.y, z: bounds.max.z };
    }
    object.traverse((node) => {
      if (node.isMesh) {
        this.solids.push(node);
        this.solidBoxes.set(node, box);
        for (const material of materialList(node)) {
          material.side = THREE.DoubleSide;
          material.forceSinglePass = true;
        }
      }
    });
    if (occludes) this.occluders.push(object);
    return object;
  }
  scenery(name, x, z, scale = 1) {
    const object = this.model(name, x, z, scale);
    this.level.add(object);
    this.solid(object);
    return object;
  }
  build(sceneName, points = []) {
    this.clear();
    const p = palettes[sceneName] || palettes.station;
    this.scene.background = new THREE.Color(p.sky);
    this.scene.fog = new THREE.Fog(p.sky, 70, 140);
    const ground = this.box(58, 0.4, 58, p.ground, 0, -0.22, 0);
    ground.castShadow = false;
    this.solid(ground, null, { occludes: false });
    const road = this.box(8, 0.035, 50, 0xac895d, 0, 0.005, 0);
    road.castShadow = false;
    this.dressGround(p, sceneName, points);
    const covers = [
      [-9, 11, 3, 1.05, 1.4],
      [-2, 8, 3, 1.8, 1.3],
      [8, 10, 3, 1.05, 1.3],
      [-10, 1, 2, 1.8, 2],
      [1, 1, 3, 1.05, 1.4],
      [10, -1, 3, 1.8, 1.6],
      [-8, -8, 3, 1.05, 1.5],
      [3, -8, 3, 1.8, 1.4],
      [9, -13, 3, 1.05, 1.5],
      [-2, -17, 2, 1.05, 1.4],
    ];
    covers.forEach(([x, z, w, h, d], i) => {
      if (points.some((v) => Math.hypot(x - v[0], z - v[1]) < 3)) return;
      const kind =
          sceneName === "canyon"
            ? h > 1.3
              ? "rock-high"
              : "rock-low"
            : h > 1.3
              ? "crate-high"
              : "crate-low",
        b = makeBox(`cover-${i}`, x, z, w, h, d, kind);
      this.colliders.push(b);
      const model = this.model(kind, x, z);
      this.fit(model, w, h, d);
      this.level.add(model);
      this.solid(model, b);
      // Rectangular trim follows crates; rounded rocks keep their visible contour.
      if (sceneName !== "canyon") {
        const edge = new THREE.LineSegments(
          new THREE.EdgesGeometry(
            new THREE.BoxGeometry(w + 0.025, h + 0.025, d + 0.025),
          ),
          new THREE.LineBasicMaterial({
            color: h > 1.3 ? 0x66533e : 0xe6cda4,
            transparent: true,
            opacity: 0.35,
          }),
        );
        edge.position.set(x, h / 2, z);
        this.level.add(edge);
      }
    });
    if (sceneName === "station" || sceneName === "town") {
      for (const x of [-21, 21])
        for (let z = -17; z <= 16; z += 11) {
          const building = new THREE.Group();
          building.name = "frontier-building";
          this.level.add(building);
          this.box(5, 4, 7, x < 0 ? 0xa16c48 : 0x8b947d, x, 2, z, building);
          const b = makeBox(`building-${x}-${z}`, x, z, 5, 4, 7);
          this.colliders.push(b);
          this.box(5.8, 0.35, 7.8, 0x535c52, x, 4.15, z, building);
          for (const dz of [-1.8, 1.8])
            this.box(
              0.06,
              1.1,
              1.25,
              0x364a46,
              x + (x < 0 ? 2.53 : -2.53),
              2,
              z + dz,
              building,
            );
          this.box(
            0.12,
            2,
            1.4,
            0x6c4a36,
            x + (x < 0 ? 2.6 : -2.6),
            1,
            z,
            building,
          );
          this.box(6, 0.3, 0.7, 0x67523e, x, 0.25, z + 4, building);
          const front = x + (x < 0 ? 2.66 : -2.66);
          this.box(0.14, 0.55, 2.8, 0xd0b281, front, 3.1, z, building);
          this.box(0.2, 0.07, 2.9, 0x544c40, front, 3.42, z, building);
          this.solid(building, b);
        }
      if (sceneName === "station") {
        for (let z = -21; z <= 20; z += 5) this.scenery("rail-segment", 14, z);
        this.scenery("station-canopy", -4, -21);
      }
    } else if (sceneName === "canyon") {
      for (let i = 0; i < 14; i++) {
        const x = (i % 2 ? -1 : 1) * (22 + Math.sin(i) * 1.5),
          z = -22 + Math.floor(i / 2) * 7;
        this.scenery("rock-high", x, z, 2.4 + (i % 3) * 0.35);
      }
      for (let x = -15; x <= 15; x += 5) this.scenery("rock-low", x, -24, 1.8);
    } else {
      for (const x of [-19, 19]) this.scenery("mine-arch", x, -12, 1.6);
      for (let z = -20; z < 18; z += 5) this.scenery("rail-segment", 5, z);
      this.scenery("water-tower", -20, 15, 1.1);
    }
    for (let i = 0; i < 8; i++) {
      const lod = new THREE.LOD();
      for (const [detail, distance] of [
        [1, 0],
        [0, 65],
      ]) {
        const mesh = new THREE.Mesh(
          new THREE.IcosahedronGeometry(7, detail),
          new THREE.MeshStandardMaterial({ color: p.rock, roughness: 1 }),
        );
        mesh.scale.set(1, 1.4, 0.8);
        lod.addLevel(mesh, distance);
      }
      lod.position.set(Math.sin(i) * 42, -1, Math.cos(i) * 42);
      this.level.add(lod);
    }
    this.level.updateMatrixWorld(true);
    const buildings = this.level.children.filter(
      (object) => object.name === "frontier-building",
    );
    if (buildings.length) {
      this.buildingBatches = new BuildingBatches(THREE, buildings, this.level);
      this.buildingBatches.sync(new Set(), this.camera);
    }
  }
  dressGround(p, sceneName, points) {
    const matrix = new THREE.Matrix4(),
      rotation = new THREE.Quaternion(),
      color = new THREE.Color(),
      safe = (x, z, r = 2) =>
        !points.some((v) => Math.hypot(x - v[0], z - v[1]) < r);
    // Low raised patches, stone clusters and grass are instanced volumetric dressing.
    const patches = new THREE.InstancedMesh(
      new THREE.IcosahedronGeometry(1, 0),
      new THREE.MeshStandardMaterial({ color: p.ground, roughness: 1 }),
      46,
    );
    for (let i = 0; i < 46; i++) {
      const x = Math.sin(i * 15.71) * 26,
        z = Math.cos(i * 4.13) * 26;
      matrix.compose(
        new THREE.Vector3(x, -0.015, z),
        rotation.setFromAxisAngle(new THREE.Vector3(0, 1, 0), i * 0.73),
        new THREE.Vector3(1.2 + (i % 4) * 0.48, 0.035, 1 + (i % 3) * 0.4),
      );
      patches.setMatrixAt(i, matrix);
      patches.setColorAt(
        i,
        color.set(p.ground).multiplyScalar(0.88 + (i % 5) * 0.035),
      );
    }
    patches.receiveShadow = true;
    this.level.add(patches);
    const rocks = new THREE.InstancedMesh(
      new THREE.IcosahedronGeometry(0.35, 0),
      new THREE.MeshStandardMaterial({ color: p.rock, roughness: 1 }),
      150,
    );
    for (let i = 0; i < 150; i++) {
      const x = Math.sin(i * 19.17) * 26,
        z = Math.cos(i * 7.43) * 26;
      matrix.compose(
        new THREE.Vector3(x, 0.05, z),
        rotation.setFromEuler(new THREE.Euler(i, 0.2 * i, 0)),
        new THREE.Vector3(0.3 + (i % 4) * 0.2, 0.28, 0.4),
      );
      rocks.setMatrixAt(i, matrix);
    }
    rocks.receiveShadow = true;
    this.level.add(rocks);
    const grass = new THREE.InstancedMesh(
      new THREE.ConeGeometry(0.09, 0.5, 3),
      new THREE.MeshStandardMaterial({
        color: sceneName === "mine" ? 0x80765a : 0x8d8654,
        roughness: 1,
      }),
      210,
    );
    for (let i = 0; i < 210; i++) {
      const clump = Math.floor(i / 3),
        edge = clump % 2 ? -1 : 1,
        x =
          edge * (7 + Math.abs(Math.sin(clump * 3.19)) * 18) +
          ((i % 3) - 0.8) * 0.12,
        z = Math.cos(clump * 5.37) * 25;
      matrix.compose(
        new THREE.Vector3(x, 0.18, z),
        rotation.setFromEuler(
          new THREE.Euler(0.2 * Math.sin(i), i * 0.47, 0.2 * Math.cos(i)),
        ),
        new THREE.Vector3(1, 0.65 + (i % 4) * 0.2, 1),
      );
      grass.setMatrixAt(i, matrix);
    }
    grass.receiveShadow = true;
    this.level.add(grass);
    for (const x of [-27, 27]) {
      const rim = this.box(
        3,
        0.035,
        55,
        new THREE.Color(p.ground).multiplyScalar(0.89),
        x,
        0.003,
        0,
      );
      rim.castShadow = false;
    }
    for (const [x, z] of [
      [-15, 14],
      [16, -10],
    ])
      if (safe(x, z, 2.5)) {
        const sign = new THREE.Group();
        sign.name = "trail-sign";
        this.level.add(sign);
        this.box(0.12, 1.6, 0.12, 0x66513b, x, 0.8, z, sign);
        this.box(1.25, 0.38, 0.12, 0xb19463, x, 1.39, z, sign);
        const arrow = new THREE.Shape();
        arrow.moveTo(-0.37, -0.06);
        arrow.lineTo(0.12, -0.06);
        arrow.lineTo(0.12, -0.14);
        arrow.lineTo(0.35, 0);
        arrow.lineTo(0.12, 0.14);
        arrow.lineTo(0.12, 0.06);
        arrow.lineTo(-0.37, 0.06);
        arrow.closePath();
        const badge = new THREE.Mesh(
          new THREE.ExtrudeGeometry(arrow, {
            depth: 0.012,
            bevelEnabled: false,
          }),
          new THREE.MeshStandardMaterial({ color: 0x424d43, roughness: 1 }),
        );
        badge.position.set(x, 1.39, z + 0.067);
        sign.add(badge);
        this.solid(sign, null, { occludes: false });
      }
  }
  fit(object, w, h, d) {
    object.updateMatrixWorld(true);
    const bounds = new THREE.Box3().setFromObject(object),
      size = bounds.getSize(new THREE.Vector3());
    object.scale.set(w / size.x, h / size.y, d / size.z);
  }
  actor(name, x, z, weapon = "revolver") {
    const object = new THREE.Group();
    object.name = `${name}__actor`;
    object.position.set(x, 0, z);
    const visual = this.model(name);
    object.add(visual);
    this.dynamic.add(object);
    const mixer = new THREE.AnimationMixer(visual),
      actions = {};
    this.clips
      .filter((clip) => clip.name.startsWith(`${name}:`))
      .forEach((clip) => {
        const state = clip.name.split(":")[1],
          action = mixer.clipAction(clip);
        action.setLoop(
          onceStates.has(state) ? THREE.LoopOnce : THREE.LoopRepeat,
          onceStates.has(state) ? 1 : Infinity,
        );
        action.clampWhenFinished = onceStates.has(state);
        actions[state] = action;
      });
    const actor = {
      name,
      object,
      visual,
      mixer,
      actions,
      state: null,
      position: object.position,
      weapon: null,
      weaponModel: null,
      colliderHeight: 1.85,
      poseBlend: 0,
    };
    this.actors.push(actor);
    if (name === "hero") {
      const ring = new THREE.Mesh(
        new THREE.RingGeometry(0.49, 0.58, 32),
        new THREE.MeshBasicMaterial({
          color: 0xaff2d4,
          transparent: true,
          opacity: 0.78,
          depthWrite: false,
          side: THREE.DoubleSide,
        }),
      );
      ring.rotation.x = -Math.PI / 2;
      ring.position.y = 0.045;
      object.add(ring);
      actor.groundRing = ring;
    }
    if (name === "hero" || name.startsWith("enemy-"))
      this.equip(
        actor,
        name === "enemy-sniper" || name === "enemy-shotgun" ? "rifle" : weapon,
      );
    this.animate(actor, "idle");
    return actor;
  }
  equip(actor, weapon = "revolver") {
    if (actor.weaponModel) {
      actor.weaponModel.removeFromParent();
      this.disposeObjects([actor.weaponModel]);
    }
    const socket = actor.visual.getObjectByName(`${actor.name}__weaponSocket`);
    if (!socket) return;
    const chosen = weapon === "rifle" ? "rifle" : "revolver",
      model = this.model(`weapon-${chosen}`);
    const attachment = model.userData.attachment;
    if (!attachment || attachment.schemaVersion !== 1)
      throw new Error(`Missing weapon attachment: ${chosen}`);
    model.position.fromArray(attachment.position);
    model.rotation.fromArray(attachment.rotation);
    socket.add(model);
    actor.weapon = chosen;
    actor.weaponModel = model;
  }
  animate(actor, state, force = false) {
    if (
      !actor.actions[state] ||
      (actor.state === state && !force) ||
      (actor.state === "down" && state !== "down" && !force)
    )
      return;
    actor.actions[actor.state]?.fadeOut(0.14);
    actor.actions[state]
      .reset()
      .setEffectiveTimeScale(1)
      .setEffectiveWeight(1)
      .fadeIn(0.14)
      .play();
    actor.state = state;
    actor.poseBlend = 0.14;
    // A crouch only gains full protection when the body finishes lowering.
    if (state !== "cover") actor.colliderHeight = 1.85;
  }
  marker(x, z, color = 0x80beb0) {
    const group = new THREE.Group();
    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(0.8, 0.045, 6, 32),
      new THREE.MeshBasicMaterial({ color, depthTest: true }),
    );
    ring.rotation.x = Math.PI / 2;
    ring.position.y = 0.08;
    group.add(ring);
    const pin = new THREE.Mesh(
      new THREE.OctahedronGeometry(0.24),
      new THREE.MeshStandardMaterial({
        color,
        emissive: color,
        emissiveIntensity: 0.25,
      }),
    );
    pin.position.y = 2.45;
    group.add(pin);
    group.position.set(x, 0, z);
    this.dynamic.add(group);
    return group;
  }
  aim(clientX, clientY) {
    const r = this.renderer.domElement.getBoundingClientRect();
    this.pointer.set(
      ((clientX - r.left) / r.width) * 2 - 1,
      (-(clientY - r.top) / r.height) * 2 + 1,
    );
    this.raycaster.setFromCamera(this.pointer, this.camera);
    // A visible actor's body is a valid pointer target at every camera angle.
    // Shot collision still independently stops at the nearest world surface.
    const targets = this.actors.filter(
      (actor) =>
        actor.object.name.startsWith("enemy-") && actor.state !== "down",
    );
    for (const actor of targets) actor.object.updateMatrixWorld(true);
    const bodyHit = this.raycaster.intersectObjects(
      targets.map((actor) => actor.visual),
      true,
    )[0];
    if (bodyHit) {
      const actor = targets.find((candidate) => {
        let node = bodyHit.object;
        while (node) {
          if (node === candidate.visual) return true;
          node = node.parent;
        }
        return false;
      });
      if (actor)
        return actor.position
          .clone()
          .add(new THREE.Vector3(0, actor.state === "cover" ? 0.55 : 1.05, 0));
    }
    return this.raycaster.ray.intersectPlane(this.plane, this.target)?.clone();
  }
  project(position) {
    const p = new THREE.Vector3(
      position.x,
      position.y ?? 1.8,
      position.z,
    ).project(this.camera);
    return {
      x: (p.x * 0.5 + 0.5) * this.renderer.domElement.clientWidth,
      y: (-0.5 * p.y + 0.5) * this.renderer.domElement.clientHeight,
    };
  }
  trace(a, b, extraBoxes = []) {
    const origin = new THREE.Vector3(a.x, a.y, a.z),
      direction = new THREE.Vector3(b.x - a.x, b.y - a.y, b.z - a.z),
      distance = direction.length();
    if (distance < 1e-8) return null;
    this.level.updateWorldMatrix(true, true);
    this.shotRaycaster.set(origin, direction.divideScalar(distance));
    this.shotRaycaster.near = 0;
    this.shotRaycaster.far = distance;
    // Material opacity never bypasses geometry: faded foreground walls still stop bullets.
    const meshHit = this.shotRaycaster.intersectObjects(this.solids, false)[0],
      proxyHit = firstHit(a, b, extraBoxes);
    if (proxyHit && (!meshHit || proxyHit.distance < meshHit.distance - 1e-5))
      return proxyHit;
    return meshHit
      ? { box: this.solidBoxes.get(meshHit.object), distance: meshHit.distance }
      : proxyHit;
  }
  tracer(a, b, color = 0xffd69a) {
    if (!this.tracerBatch) {
      this.tracerBatch = new TracerBatch(THREE, this.dynamic);
      this.effects = this.tracerBatch.effects;
    }
    this.tracerBatch.add(a, b, color);
  }
  update(dt, player, reduced) {
    for (const actor of this.actors) {
      actor.mixer.update(dt);
      actor.poseBlend = Math.max(0, actor.poseBlend - dt);
      if (actor.poseBlend === 0)
        actor.colliderHeight = actor.state === "cover" ? 0.95 : 1.85;
    }
    this.tracerBatch?.update(dt, this.camera);
    const hits = new Set();
    if (player) {
      this.level.updateWorldMatrix(true, true);
      const direction = new THREE.Vector3()
        .subVectors(this.camera.position, player.position)
        .normalize();
      this.raycaster.set(
        player.position.clone().add(new THREE.Vector3(0, 1, 0)),
        direction,
      );
      this.raycaster.near = 0;
      this.raycaster.far = this.camera.position.distanceTo(player.position);
      for (const hit of this.raycaster.intersectObjects(this.occluders, true))
        hits.add(hit.object);
    }
    for (const root of this.occluders)
      root.traverse((node) => {
        if (node.isMesh)
          for (const material of materialList(node)) {
            material.transparent = true;
            material.opacity = hits.has(node) ? 0.22 : 1;
            material.depthWrite = !hits.has(node);
          }
      });
    this.buildingBatches?.sync(hits, this.camera);
    this.renderer.render(this.scene, this.camera);
  }
  stats() {
    const r = this.renderer.info;
    return {
      drawCalls: r.render.calls,
      triangles: r.render.triangles,
      geometries: r.memory.geometries,
      textures: r.memory.textures,
      characters: this.actors.length,
      shadow: this.renderer.shadowMap.enabled,
      dpr: this.renderer.getPixelRatio(),
    };
  }
}
