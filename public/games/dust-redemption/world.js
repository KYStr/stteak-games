import * as THREE from "./vendor/three.module.js";
import { GLTFLoader } from "./vendor/GLTFLoader.js";
import { clone } from "./vendor/SkeletonUtils.js";
import { firstHit, makeBox } from "./physics.js";
import {
  BuildingBatches,
  TracerBatch,
  FrameMeshSet,
} from "./render-batches.js";

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
      antialias: false,
      alpha: false,
      powerPreference: "high-performance",
    });
    const gl = this.renderer.getContext();
    const debug = gl.getExtension("WEBGL_debug_renderer_info");
    this.softwareRenderer = /swiftshader|llvmpipe|software/i.test(
      debug ? gl.getParameter(debug.UNMASKED_RENDERER_WEBGL) : "",
    );
    // The software path uses the same colors, textures and animated geometry
    // with diffuse lighting, avoiding a physical BRDF on every fragment.
    const DiffuseMaterial = class extends THREE.MeshLambertMaterial {
      constructor(options = {}) {
        const {
          roughness,
          metalness,
          roughnessMap,
          metalnessMap,
          normalMap,
          ...diffuse
        } = options;
        super(diffuse);
      }
    };
    this.graphics = this.softwareRenderer
      ? { ...THREE, MeshStandardMaterial: DiffuseMaterial }
      : THREE;
    this.lowQuality = this.softwareRenderer;
    this.lowSetting = false;
    this.adaptiveReduced = false;
    this.slowFrameCount = 0;
    this.inspection = false;
    this.dirty = true;
    this.occlusionKey = null;
    this.cameraState = new Float64Array(32);
    this.cameraRevision = 0;
    this.fadeState = { x: NaN, y: NaN, z: NaN, revision: -1 };
    this.updateMs = 0;
    this.renderedFrames = 0;
    this.skippedFrames = 0;
    this.fadeRaycasts = 0;
    this.shadowWrites = 0;
    this.shadowPosition = new THREE.Vector3();
    this.shadowScale = new THREE.Vector3(0.55, 0.4, 1);
    this.fadeDirection = new THREE.Vector3();
    this.fadeOrigin = new THREE.Vector3();
    this.traceOrigin = new THREE.Vector3();
    this.traceDirection = new THREE.Vector3();
    this.localRay = new THREE.Ray();
    this.rayPoint = new THREE.Vector3();
    this.worldPoint = new THREE.Vector3();
    this.triangleA = new THREE.Vector3();
    this.triangleB = new THREE.Vector3();
    this.triangleC = new THREE.Vector3();
    this.traceResult = {};
    this.proxyResult = {};
    this.fadeHits = [];
    this.fadedMeshes = new FrameMeshSet();
    this.collisionRecords = new WeakMap();
    this.colliderState = new WeakMap();
    this.lastColliderArray = null;
    this.lastColliderCount = -1;
    this.collisionRevision = 0;
    this.matricesReady = false;
    this.projectVector = new THREE.Vector3();
    this.fadeMaterials = new WeakMap();
    this.fadeEligible = new WeakSet();
    this.shadowTransforms = [];
    this.renderer.setPixelRatio(1);
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.22;
    this.scene = new THREE.Scene();
    this.camera = new THREE.OrthographicCamera(-24, 24, 20, -20, 0.1, 160);
    this.camera.layers.enable(1);
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
    this.sun.shadow.mapSize.set(1024, 1024);
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
    if (this.softwareRenderer) {
      const converted = new Map();
      gltf.scene.traverse((node) => {
        if (!node.material) return;
        const convert = (material) => {
          if (!material.isMeshStandardMaterial) return material;
          if (!converted.has(material)) {
            converted.set(
              material,
              new this.graphics.MeshStandardMaterial({
                color: material.color,
                map: material.map,
                emissive: material.emissive,
                emissiveMap: material.emissiveMap,
                emissiveIntensity: material.emissiveIntensity,
                transparent: material.transparent,
                opacity: material.opacity,
                alphaTest: material.alphaTest,
                side: material.side,
                vertexColors: material.vertexColors,
              }),
            );
          }
          return converted.get(material);
        };
        node.material = Array.isArray(node.material)
          ? node.material.map(convert)
          : convert(node.material);
      });
      for (const original of converted.keys()) original.dispose();
    }
  }
  resize() {
    const canvas = this.renderer.domElement,
      w = Math.max(1, canvas.clientWidth),
      h = Math.max(1, canvas.clientHeight);
    this.resizeBuffer(w, h);
    const aspect = w / h,
      half = aspect < 1 ? 26 : 22;
    this.camera.left = -half * aspect;
    this.camera.right = half * aspect;
    this.camera.top = half;
    this.camera.bottom = -half;
    this.camera.updateProjectionMatrix();
    this.orient();
  }
  invalidate(occlusion = false) {
    this.dirty = true;
    if (occlusion) this.occlusionKey = null;
  }
  resizeBuffer(
    w = this.renderer.domElement.clientWidth,
    h = this.renderer.domElement.clientHeight,
  ) {
    // Inspection always preserves the symbols, including on the software path.
    const limit = this.inspection
      ? 1600
      : this.lowSetting
        ? 960
        : this.adaptiveReduced
          ? 1024
          : this.softwareRenderer
            ? 1120
            : 1440;
    const scale = Math.min(
      devicePixelRatio,
      this.softwareRenderer ? 1 : 1.5,
      limit / Math.max(1, w),
    );
    this.renderer.setPixelRatio(scale);
    this.renderer.setSize(w, h, false);
    this.invalidate();
  }
  noteFrame(seconds) {
    if (this.inspection || this.adaptiveReduced) return;
    this.slowFrameCount =
      seconds > 0.075
        ? this.slowFrameCount + 1
        : Math.max(0, this.slowFrameCount - 2);
    if (this.slowFrameCount < 90) return;
    this.adaptiveReduced = true;
    this.lowQuality = true;
    this.renderer.shadowMap.enabled = false;
    if (this.groundShadows) this.groundShadows.visible = true;
    if (this.actorShadows) this.actorShadows.visible = true;
    this.resizeBuffer();
  }
  setInspection(value) {
    if (this.inspection === value) return;
    // A close camera sees the mechanism through the player's render layer.
    // Keep object.visible and all collision/evidence geometry authoritative.
    for (const actor of this.actors)
      if (actor.name === "hero")
        actor.object.traverse((node) => node.layers.set(1));
    if (value) this.camera.layers.disable(1);
    else this.camera.layers.enable(1);
    this.inspection = value;
    this.occlusionKey = null;
    this.resizeBuffer();
  }
  orient() {
    this.invalidate(true);
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
    this.lowSetting = Boolean(low);
    this.lowQuality = Boolean(
      low || this.softwareRenderer || this.adaptiveReduced,
    );
    this.renderer.shadowMap.enabled = !this.lowQuality;
    if (this.groundShadows) this.groundShadows.visible = this.lowQuality;
    if (this.actorShadows) this.actorShadows.visible = this.lowQuality;
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
      new this.graphics.MeshStandardMaterial({ color, roughness: 0.94 }),
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
    this.invalidate(true);
    this.shadowTransforms.length = 0;
    this.textureEstimate = null;
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
    this.groundShadows = null;
    this.actorShadows = null;
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
    this.matricesReady = false;
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
    if (occludes) {
      this.occluders.push(object);
      object.traverse((node) => {
        if (node.isMesh) this.fadeEligible.add(node);
      });
    }
    return object;
  }
  scenery(name, x, z, scale = 1) {
    const object = this.model(name, x, z, scale);
    this.level.add(object);
    this.solid(object);
    return object;
  }
  build(sceneName, points = []) {
    this.matricesReady = false;
    this.collisionRecords = new WeakMap();
    this.fadeMaterials = new WeakMap();
    this.collisionRevision++;
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
          new this.graphics.MeshStandardMaterial({
            color: p.rock,
            roughness: 1,
          }),
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
      this.buildingBatches = new BuildingBatches(
        this.graphics,
        buildings,
        this.level,
      );
      this.buildingBatches.sync(new Set(), this.camera);
    }
    this.addGroundShadows();
  }
  addGroundShadows() {
    // One draw call supplies stylized contact shadows when dynamic maps are off.
    const material = new THREE.MeshBasicMaterial({
      color: 0x5b4028,
      transparent: true,
      opacity: 0.19,
      depthWrite: false,
    });
    const boxes = this.colliders.filter((b) => b.h > 0.8);
    this.groundShadows = new THREE.InstancedMesh(
      new THREE.PlaneGeometry(1, 1),
      material,
      Math.max(1, boxes.length),
    );
    this.groundShadows.count = boxes.length;
    const matrix = new THREE.Matrix4(),
      rotation = new THREE.Quaternion().setFromEuler(
        new THREE.Euler(-Math.PI / 2, 0, 0),
      );
    boxes.forEach((b, i) => {
      matrix.compose(
        new THREE.Vector3(b.x + b.h * 0.35, 0.032, b.z - b.h * 0.2),
        rotation,
        new THREE.Vector3(b.w + b.h * 0.55, b.d + b.h * 0.35, 1),
      );
      this.groundShadows.setMatrixAt(i, matrix);
    });
    this.groundShadows.visible = this.lowQuality;
    this.level.add(this.groundShadows);
    this.actorShadows = new THREE.InstancedMesh(
      new THREE.CircleGeometry(1, 16),
      material.clone(),
      32,
    );
    this.actorShadows.count = 0;
    this.actorShadows.visible = this.lowQuality;
    this.shadowTransforms.length = 0;
    this.dynamic.add(this.actorShadows);
    this.shadowMatrix = matrix;
    this.shadowRotation = rotation;
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
      new this.graphics.MeshStandardMaterial({ color: p.ground, roughness: 1 }),
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
      new this.graphics.MeshStandardMaterial({ color: p.rock, roughness: 1 }),
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
      new this.graphics.MeshStandardMaterial({
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
          new this.graphics.MeshStandardMaterial({
            color: 0x424d43,
            roughness: 1,
          }),
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
    if (name === "hero") object.traverse((node) => node.layers.set(1));
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
      new this.graphics.MeshStandardMaterial({
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
  project(position, out = {}) {
    const p = this.projectVector
      .set(position.x, position.y ?? 1.8, position.z)
      .project(this.camera);
    out.x = (p.x * 0.5 + 0.5) * this.renderer.domElement.clientWidth;
    out.y = (-p.y * 0.5 + 0.5) * this.renderer.domElement.clientHeight;
    return out;
  }
  beginCollisionUpdate() {
    delete this.colliders.collisionRevision;
    this.matricesReady = false;
  }
  syncCollisionMatrices(force = false) {
    if (this.matricesReady && !force) return;
    this.level.updateWorldMatrix(true, true);
    let changed = false;
    for (let i = 0; i < this.solids.length; i++) {
      const mesh = this.solids[i],
        matrix = mesh.matrixWorld.elements;
      let record = this.collisionRecords.get(mesh);
      if (!record || record.geometry !== mesh.geometry) {
        if (!mesh.geometry.boundingBox) mesh.geometry.computeBoundingBox();
        record = {
          geometry: mesh.geometry,
          inverse: new THREE.Matrix4(),
          matrix: new Float64Array(16).fill(NaN),
        };
        this.collisionRecords.set(mesh, record);
      }
      let dirty = false;
      for (let j = 0; j < 16; j++)
        if (matrix[j] !== record.matrix[j]) {
          dirty = true;
          record.matrix[j] = matrix[j];
        }
      if (dirty) {
        record.inverse.copy(mesh.matrixWorld).invert();
        changed = true;
      }
    }
    if (
      this.lastColliderArray !== this.colliders ||
      this.lastColliderCount !== this.colliders.length
    ) {
      changed = true;
      this.lastColliderArray = this.colliders;
      this.lastColliderCount = this.colliders.length;
    }
    for (let i = 0; i < this.colliders.length; i++) {
      const b = this.colliders[i];
      let values = this.colliderState.get(b);
      if (!values) {
        values = new Float64Array(6).fill(NaN);
        this.colliderState.set(b, values);
      }
      for (let j = 0; j < 6; j++) {
        const axis = j % 3,
          value =
            j < 3
              ? axis === 0
                ? b.min.x
                : axis === 1
                  ? b.min.y
                  : b.min.z
              : axis === 0
                ? b.max.x
                : axis === 1
                  ? b.max.y
                  : b.max.z;
        if (values[j] !== value) {
          values[j] = value;
          changed = true;
        }
      }
    }
    if (changed) {
      this.collisionRevision++;
      this.occlusionKey = null;
    }
    this.colliders.collisionRevision = this.collisionRevision;
    this.matricesReady = true;
  }
  // Allocation-free exact mesh triangles. Local-space bounds are only a broad
  // phase; transparent/faded walls still block, and no coarse box replaces them.
  meshDistance(mesh, origin, maxDistance) {
    const record = this.collisionRecords.get(mesh);
    if (!record || !mesh.geometry.attributes.position) return Infinity;
    const ray = this.localRay
        .copy(this.shotRaycaster.ray)
        .applyMatrix4(record.inverse),
      geometry = record.geometry;
    if (!ray.intersectsBox(geometry.boundingBox)) return Infinity;
    const positions = geometry.attributes.position,
      index = geometry.index,
      end = Math.min(
        index ? index.count : positions.count,
        geometry.drawRange.start + geometry.drawRange.count,
      );
    let closest = maxDistance;
    for (let i = geometry.drawRange.start; i + 2 < end; i += 3) {
      this.triangleA.fromBufferAttribute(positions, index ? index.getX(i) : i);
      this.triangleB.fromBufferAttribute(
        positions,
        index ? index.getX(i + 1) : i + 1,
      );
      this.triangleC.fromBufferAttribute(
        positions,
        index ? index.getX(i + 2) : i + 2,
      );
      if (
        ray.intersectTriangle(
          this.triangleA,
          this.triangleB,
          this.triangleC,
          false,
          this.rayPoint,
        )
      ) {
        const distance = this.worldPoint
          .copy(this.rayPoint)
          .applyMatrix4(mesh.matrixWorld)
          .distanceTo(origin);
        if (distance < closest) closest = distance;
      }
    }
    return closest < maxDistance ? closest : Infinity;
  }
  trace(a, b, extraBoxes = World.emptyBoxes) {
    const origin = this.traceOrigin.set(a.x, a.y, a.z),
      direction = this.traceDirection.set(b.x - a.x, b.y - a.y, b.z - a.z),
      distance = direction.length();
    if (distance < 1e-8) return null;
    this.syncCollisionMatrices();
    this.shotRaycaster.set(origin, direction.divideScalar(distance));
    let closest = distance + 1e-8,
      box = null;
    for (let i = 0; i < this.solids.length; i++) {
      const mesh = this.solids[i],
        hit = this.meshDistance(mesh, origin, closest);
      if (hit < closest) {
        closest = hit;
        box = this.solidBoxes.get(mesh);
      }
    }
    const proxy = firstHit(a, b, extraBoxes, this.proxyResult);
    if (proxy && (!box || proxy.distance < closest - 1e-5)) return proxy;
    if (!box) return null;
    this.traceResult.box = box;
    this.traceResult.distance = closest;
    return this.traceResult;
  }
  tracer(a, b, color = 0xffd69a) {
    if (!this.tracerBatch) {
      this.tracerBatch = new TracerBatch(THREE, this.dynamic);
      this.effects = this.tracerBatch.effects;
    }
    this.tracerBatch.add(a, b, color);
  }
  update(dt, player, reduced) {
    const start = performance.now();
    let cameraChanged = false;
    for (let i = 0; i < 32; i++) {
      const value =
        i < 16
          ? this.camera.matrixWorld.elements[i]
          : this.camera.projectionMatrix.elements[i - 16];
      if (this.cameraState[i] !== value) {
        this.cameraState[i] = value;
        cameraChanged = true;
      }
    }
    if (cameraChanged) {
      this.cameraRevision++;
      this.invalidate();
    }
    if (!dt && !this.dirty) {
      this.updateMs = performance.now() - start;
      this.skippedFrames++;
      return;
    }
    if (dt)
      for (const actor of this.actors) {
        actor.mixer.update(dt);
        actor.poseBlend = Math.max(0, actor.poseBlend - dt);
        if (actor.poseBlend === 0)
          actor.colliderHeight = actor.state === "cover" ? 0.95 : 1.85;
      }
    if (this.actorShadows?.visible) {
      let changed =
        this.actorShadows.count !== Math.min(32, this.actors.length);
      this.actorShadows.count = Math.min(32, this.actors.length);
      for (let i = 0; i < this.actorShadows.count; i++) {
        const actor = this.actors[i],
          previous = this.shadowTransforms[i];
        if (
          previous &&
          previous.x === actor.position.x &&
          previous.z === actor.position.z
        )
          continue;
        const record = previous || (this.shadowTransforms[i] = { x: 0, z: 0 });
        record.x = actor.position.x;
        record.z = actor.position.z;
        this.shadowPosition.set(
          actor.position.x + 0.18,
          0.035,
          actor.position.z - 0.1,
        );
        this.shadowMatrix.compose(
          this.shadowPosition,
          this.shadowRotation,
          this.shadowScale,
        );
        this.actorShadows.setMatrixAt(i, this.shadowMatrix);
        this.shadowWrites++;
        changed = true;
      }
      if (changed) this.actorShadows.instanceMatrix.needsUpdate = true;
    }
    this.tracerBatch?.update(dt, this.camera);
    const position = player?.position || this.target,
      previous = this.fadeState;
    if (
      this.occlusionKey === null ||
      position.x !== previous.x ||
      position.y !== previous.y ||
      position.z !== previous.z ||
      previous.revision !== this.cameraRevision
    ) {
      this.occlusionKey = true;
      previous.x = position.x;
      previous.y = position.y;
      previous.z = position.z;
      previous.revision = this.cameraRevision;
      const hits = this.fadedMeshes;
      hits.clear();
      if (player && !this.inspection) {
        this.syncCollisionMatrices();
        this.fadeDirection
          .subVectors(this.camera.position, player.position)
          .normalize();
        this.fadeOrigin.copy(player.position);
        this.fadeOrigin.y += 1;
        this.raycaster.set(this.fadeOrigin, this.fadeDirection);
        this.raycaster.near = 0;
        this.raycaster.far = this.camera.position.distanceTo(player.position);
        this.shotRaycaster.set(this.fadeOrigin, this.fadeDirection);
        for (let i = 0; i < this.solids.length; i++) {
          const mesh = this.solids[i];
          if (
            this.fadeEligible.has(mesh) &&
            this.meshDistance(mesh, this.fadeOrigin, this.raycaster.far) <
              Infinity
          )
            hits.add(mesh);
        }
        this.fadeRaycasts++;
      }
      for (let i = 0; i < this.solids.length; i++) {
        const node = this.solids[i],
          faded = hits.has(node);
        if (!this.fadeEligible.has(node)) continue;
        if (this.fadeMaterials.get(node) === faded) continue;
        this.fadeMaterials.set(node, faded);
        const materials = node.material;
        if (Array.isArray(materials))
          for (let j = 0; j < materials.length; j++) {
            materials[j].transparent = true;
            materials[j].opacity = faded ? 0.22 : 1;
            materials[j].depthWrite = !faded;
          }
        else {
          materials.transparent = true;
          materials.opacity = faded ? 0.22 : 1;
          materials.depthWrite = !faded;
        }
      }
      this.buildingBatches?.sync(hits, this.camera);
    }
    this.updateMs = performance.now() - start;
    this.renderer.render(this.scene, this.camera);
    this.renderedFrames++;
    this.dirty = false;
  }
  stats() {
    const r = this.renderer.info;
    let visibleInstances = 0;
    this.scene.traverseVisible((node) => {
      if (node.isInstancedMesh) visibleInstances += node.count;
    });
    if (
      !this.textureEstimate ||
      this.textureEstimate.count !== r.memory.textures
    ) {
      const textures = new Set();
      this.scene.traverse((node) => {
        if (!node.material) return;
        for (const material of materialList(node))
          for (const value of Object.values(material))
            if (value?.isTexture) textures.add(value);
      });
      let bytes = 0;
      for (const texture of textures) {
        const image = texture.image;
        bytes +=
          (image?.width || 0) *
          (image?.height || 0) *
          4 *
          (texture.generateMipmaps ? 4 / 3 : 1);
      }
      this.textureEstimate = {
        count: r.memory.textures,
        bytes: Math.ceil(bytes),
      };
    }
    return {
      effects: this.effects.length,
      persistentGeometries: r.memory.geometries - (this.tracerBatch ? 1 : 0),
      drawCalls: r.render.calls,
      textureBytesEstimate: this.textureEstimate.bytes,
      visibleInstances,
      buildingInstances: this.buildingBatches?.records.length || 0,
      renderedFrames: this.renderedFrames,
      skippedFrames: this.skippedFrames,
      fadeRaycasts: this.fadeRaycasts,
      shadowWrites: this.shadowWrites,
      bufferWidth: this.renderer.domElement.width,
      bufferHeight: this.renderer.domElement.height,
      inspection: this.inspection,
      lowSetting: this.lowSetting,
      adaptiveReduced: this.adaptiveReduced,
      pixelRatio: this.renderer.getPixelRatio(),
      triangles: r.render.triangles,
      geometries: r.memory.geometries,
      textures: r.memory.textures,
      characters: this.actors.length,
      shadow: this.renderer.shadowMap.enabled,
      dpr: this.renderer.getPixelRatio(),
      software: this.softwareRenderer,
      contextLost: this.renderer.getContext().isContextLost(),
    };
  }
}

World.emptyBoxes = Object.freeze([]);
