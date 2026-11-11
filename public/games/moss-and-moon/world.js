import * as THREE from "./vendor/three.module.js";
import {
  createPlant,
  createCharacter,
  createDecoration,
  createHouse,
  createTree,
  createRock,
  createTool,
  createTerrain,
  createDiscovery,
  lightweightVariant,
} from "./models.js";
import { RESIDENTS, DISCOVERIES, REGIONS, PUZZLES } from "./content.js"; // 場景入口依真內容存在性判斷，不以所有非garden區都可採集／解謎。
import { growthPreview } from "./rules.js";

const TILE = 1.08;
export const tilePosition = (i) =>
  new THREE.Vector3(
    ((i % 8) - 3.5) * TILE,
    0,
    (Math.floor(i / 8) - 3.5) * TILE,
  );
const mat = (color) =>
  new THREE.MeshLambertMaterial({ color, flatShading: true });
export function createWorld(canvas, callbacks) {
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: false,
    alpha: false,
    powerPreference: "high-performance",
  });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 1.5));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.BasicShadowMap;
  renderer.shadowMap.autoUpdate = false;
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.3;
  const scene = new THREE.Scene();
  scene.background = new THREE.Color("#203f3c");
  scene.fog = new THREE.Fog("#203f3c", 30, 65);
  const camera = new THREE.OrthographicCamera(-12, 12, 9, -9, 0.1, 100);
  let cameraTurn = 0,
    zoom = 1,
    view = "garden",
    state = null,
    enabled = false,
    reduced = false;
  const ambient = new THREE.HemisphereLight("#d7eaf2", "#4f6444", 2.4);
  scene.add(ambient);
  const sun = new THREE.DirectionalLight("#fff1ca", 3);
  sun.position.set(-9, 15, 8);
  sun.castShadow = true;
  sun.shadow.mapSize.set(1024, 1024);
  sun.shadow.camera.left = -14;
  sun.shadow.camera.right = 14;
  sun.shadow.camera.top = 14;
  sun.shadow.camera.bottom = -14;
  sun.shadow.bias = -0.0005;
  sun.shadow.normalBias = 0.035;
  scene.add(sun);
  const moon = new THREE.DirectionalLight("#89b5dd", 1.5);
  moon.position.set(8, 10, -10);
  scene.add(moon);
  const environment = new THREE.Group(),
    objects = new THREE.Group(),
    flora = new THREE.Group();
  scene.add(environment, objects, flora);
  const interactables = [],
    labels = [],
    obstacles = [],
    mixers = [],
    regionOwned = [],
    foliage = [],
    cutaways = [],
    cutawayMaterials = [];
  let plantBatches = [],
    actionTime = 0,
    actionName = "idle",
    preview = null;
  const soilMat = mat("#796d4c"),
    rimMat = mat("#83936a");
  const baseGeo = new THREE.BoxGeometry(TILE - 0.08, 0.13, TILE - 0.08),
    tileInstances = new THREE.InstancedMesh(baseGeo, soilMat, 64);
  tileInstances.receiveShadow = true;
  tileInstances.userData.kind = "tile";
  const wetInstances = new THREE.InstancedMesh(
    new THREE.CircleGeometry(0.12, 12),
    mat("#80bbbd"),
    64,
  );
  wetInstances.count = 0;
  const selectionMesh = new THREE.Mesh(
    new THREE.BoxGeometry(TILE, 0.035, TILE),
    new THREE.MeshBasicMaterial({
      color: "#eff4bb",
      transparent: true,
      opacity: 0.55,
      depthWrite: false,
    }),
  );
  selectionMesh.position.y = 0.09;
  selectionMesh.visible = false;
  scene.add(selectionMesh);
  const player = createCharacter(0);
  player.position.set(0, 0, 5);
  scene.add(player);
  let playerMixer = new THREE.AnimationMixer(player);
  let playerActions = {};
  for (const clip of player.animations || [])
    playerActions[clip.name] = playerMixer.clipAction(clip);
  playerActions.idle?.play();
  const playerActionList=Object.values(playerActions);
  const contactMaterial = new THREE.MeshBasicMaterial({
    color: "#243f35",
    transparent: true,
    opacity: 0.2,
    depthWrite: false,
  });
  const contactGeometry = new THREE.CircleGeometry(0.28, 16);
  function contactShadow(person) {
    const shadow = new THREE.Mesh(contactGeometry, contactMaterial);
    shadow.rotation.x = -Math.PI / 2;
    shadow.position.y = 0.018;
    person.add(shadow);
    person.traverse((c) => {
      if (c.isSkinnedMesh) c.castShadow = false;
    });
  }
  contactShadow(player);
  const tool = createTool("watering-can");
  tool.visible = false;
  player.add(tool);
  tool.position.set(0.5, 0.55, 0.2);
  tool.scale.setScalar(0.55);
  let target = null,
    arrival = null,
    path = [],
    celebrating = 0,
    celebrationPositions = [];
  const keys = new Set();
  // Fixed storage avoids shift/copy churn in the drawing path. Full runs are collected by tests.
  const frames = new Float64Array(2048), updates = new Float64Array(2048),
    submissions = new Float64Array(2048), completions = new Float64Array(2048);
  let frameCount = 0, renderCount = 0, lastCompletion = 0, updateMs = 0, submissionMs = 0;
  let totalUpdateMs = 0, totalSubmissionMs = 0, gridSignature = "", plantRebuilds = 0;
  const moveVector = new THREE.Vector3();
  let movementSin = Math.SQRT1_2, movementCos = Math.SQRT1_2;
  const residents = [];
  let qualityMode = "", lightweight = true;
  // Original procedural journey markers. Fixed pools survive region/save changes.
  const journeyRoot = new THREE.Group(); scene.add(journeyRoot);
  const socketGeometry = new THREE.TorusGeometry(.48,.055,5,20);
  const crystalGeometry = new THREE.OctahedronGeometry(.23,0);
  const shadeGeometry = new THREE.ConeGeometry(.3,.7,5);
  const socketMaterial = new THREE.MeshBasicMaterial({color:'#f0d897'});
  const shadeMaterial = new THREE.MeshBasicMaterial({color:'#563763'});
  const markers=[], shades=[], links=[];
  const linkGeometry=new THREE.CylinderGeometry(.035,.035,1,5);
  const linkMaterial=new THREE.MeshBasicMaterial({color:'#92d0d1'});
  const linkDirection=new THREE.Vector3(),linkUp=new THREE.Vector3(0,1,0);
  for(let i=0;i<4;i++){const link=new THREE.Mesh(linkGeometry,linkMaterial);journeyRoot.add(link);links.push(link);}
  let feedbackNode=-1,feedbackSeconds=0;
  for(let i=0;i<4;i++) {
    const root=new THREE.Group(),ring=new THREE.Mesh(socketGeometry,socketMaterial),crystal=new THREE.Mesh(crystalGeometry,socketMaterial.clone());
    ring.rotation.x=-Math.PI/2;ring.position.y=.11;crystal.position.y=.8;
    const arrow=new THREE.Mesh(shadeGeometry,socketMaterial);
    arrow.scale.set(.35,.65,.35);arrow.position.set(0,.22,.3);arrow.rotation.x=Math.PI/2;
    const direction=new THREE.Group();direction.add(arrow);root.add(direction);
    root.userData.direction=direction;
    root.add(ring,crystal);root.userData.interaction={kind:'campaign',id:i};
    root.traverse(m=>{if(m.isMesh)m.userData.root=root;});journeyRoot.add(root);markers.push(root);
    const el=document.createElement('div');el.className='journey-marker';el.textContent='◇ '+(i+1);document.getElementById('labels').append(el);
    el.hidden=true;
    root.userData.label=el;root.userData.crystal=crystal;
  }
  for(let i=0;i<7;i++){const mesh=new THREE.Mesh(shadeGeometry,shadeMaterial);journeyRoot.add(mesh);shades.push(mesh);}
  let campaignVisible=false;
  function updateCampaignModels(dt) {
    const c=state?.mode==='journey'?state.campaign:null;
    journeyRoot.visible=!!c;
    if(!c){
      if(campaignVisible)for(let i=0;i<4;i++)markers[i].userData.label.hidden=true;
      campaignVisible=false;return;
    }
    campaignVisible=true;
    if(feedbackSeconds>0)feedbackSeconds=Math.max(0,feedbackSeconds-dt);
    for(let i=0;i<4;i++) {
      const root=markers[i],el=root.userData.label;
      if(!c){el.hidden=true;continue;}
      const n=c.taskNodes[i];root.position.set(n.x,0,n.z);
      root.userData.crystal.material.color.setHex(feedbackSeconds>0&&feedbackNode===i?0xffffff:c.shieldTimers[i]>0?0xa4d2ad:n.done?0x86b0a1:0xf0d897);
      root.userData.crystal.rotation.y = n.rotation*Math.PI/2;
      root.userData.direction.visible=n.kind==='path';
      root.userData.direction.rotation.y=n.rotation*Math.PI/2;
      if(root.userData.labelKind!==n.kind||root.userData.labelDone!==n.done||root.userData.labelRotation!==n.rotation){
        el.textContent=(n.done?'✓ ':n.kind==='path'?'↻ ':n.kind==='deliver'?'♧ ':'◇ ')+(i+1);
        root.userData.labelKind=n.kind;root.userData.labelDone=n.done;root.userData.labelRotation=n.rotation;
      }
      root.userData.crystal.scale.setScalar(feedbackSeconds>0&&feedbackNode===i&&!reduced?1.5:1);
      if(invalidated || labelCameraRevision!==root.userData.revision) {
        labelPoint.set(n.x,1.35,n.z).project(camera);
        el.style.left=(labelPoint.x*.5+.5)*canvas.clientWidth+'px';
        el.style.top=(-labelPoint.y*.5+.5)*canvas.clientHeight+'px';root.userData.revision=labelCameraRevision;
      }
      el.hidden=false;
    }
    for(let i=0;i<4;i++) {
      const link=links[i];link.visible=!!c&&c.stage>=2&&(c.stage===3||i<2);
      if(link.visible){const a=c.taskNodes[i],b=c.taskNodes[(i+1)%4];link.position.set((a.x+b.x)/2,.15,(a.z+b.z)/2);linkDirection.set(b.x-a.x,0,b.z-a.z);const length=linkDirection.length();link.scale.y=length;linkDirection.normalize();link.quaternion.setFromUnitVectors(linkUp,linkDirection);}
    }
    for(let i=0;i<7;i++) {
      const h=c?.hazards[i],mesh=shades[i];mesh.visible=!!h;
      if(h){mesh.position.set(h.x,.5,h.z);mesh.rotation.z=h.attached?Math.PI:0;}
    }
  }
  function qualityMesh(mesh) {
    if (!mesh.isMesh || mesh.isSkinnedMesh || mesh === selectionMesh) return;
    if (!mesh.userData.authored) mesh.userData.authored = { geometry:mesh.geometry, material:mesh.material };
    const original = mesh.userData.authored;
    if (lightweight && !original.material.transparent) {
      const variant = lightweightVariant(original.geometry, original.material);
      mesh.geometry = variant.geometry;
      if (mesh.userData.uniqueMaterial) {
        if (!mesh.userData.bakedMaterial) {
          mesh.userData.bakedMaterial = variant.material.clone();
          cutawayMaterials.push(mesh.userData.bakedMaterial);
        }
        mesh.material = mesh.userData.bakedMaterial;
      } else mesh.material = variant.material;
    } else {
      mesh.geometry = original.geometry;
      mesh.material = original.material;
    }
  }
  const stageMaterial = new THREE.MeshBasicMaterial({vertexColors:true,toneMapped:false,name:"baked-static-stage"});
  const staticStage = new THREE.Mesh(new THREE.BufferGeometry(),stageMaterial);
  staticStage.name = "static-garden-stage";
  staticStage.visible = false;
  scene.add(staticStage);
  const stageSources = [];
  const stageMatrix = new THREE.Matrix4(), instanceMatrix = new THREE.Matrix4(), stagePoint = new THREE.Vector3();
  let staticStageRebuilds = 0, staticVertexCapacity = 0;
  let stagePositions = new Float32Array(0), stageColors = new Float32Array(0), stageCursor = 0;
  function clearStaticStage() {
    for (const mesh of stageSources) mesh.visible = true;
    stageSources.length = 0;
    staticStage.visible = false;
  }
  function appendStage(mesh, matrix) {
    const g = mesh.geometry, p = g.attributes.position, c = g.attributes.color, indices = g.index;
    const count = indices ? indices.count : p.count;
    for (let i=0;i<count;i++) {
      const v = indices ? indices.getX(i) : i;
      stagePoint.fromBufferAttribute(p,v).applyMatrix4(matrix);
      stagePositions[stageCursor] = stagePoint.x;
      stagePositions[stageCursor+1] = stagePoint.y;
      stagePositions[stageCursor+2] = stagePoint.z;
      stageColors[stageCursor] = c ? c.getX(v) : mesh.material.color.r;
      stageColors[stageCursor+1] = c ? c.getY(v) : mesh.material.color.g;
      stageColors[stageCursor+2] = c ? c.getZ(v) : mesh.material.color.b;
      stageCursor += 3;
    }
  }
  function collectStage(node) {
    if (!node.visible || node.userData.interaction?.kind === "resident") return;
    if (node.isMesh && !node.isSkinnedMesh && !node.material.transparent) stageSources.push(node);
    for (const child of node.children) collectStage(child);
  }
  function rebuildStaticStage() {
    clearStaticStage();
    if (!lightweight) return;
    staticStageRebuilds++;
    for (const root of [environment,objects,flora]) {
      root.updateMatrixWorld(true);
      collectStage(root);
    }
    let required = 0;
    for (const mesh of stageSources) required += (mesh.geometry.index?.count || mesh.geometry.attributes.position.count) * (mesh.isInstancedMesh ? mesh.count : 1);
    if (required > staticVertexCapacity) {
      staticVertexCapacity = Math.min(524288, Math.max(65536, 2 ** Math.ceil(Math.log2(required))));
      if (required > staticVertexCapacity) throw new Error("Static scene exceeds supported garden capacity");
      stagePositions = new Float32Array(staticVertexCapacity * 3);
      stageColors = new Float32Array(staticVertexCapacity * 3);
      staticStage.geometry.dispose();
      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute("position",new THREE.BufferAttribute(stagePositions,3));
      geometry.setAttribute("color",new THREE.BufferAttribute(stageColors,3));
      staticStage.geometry = geometry;
    }
    stageCursor = 0;
    for (const mesh of stageSources) {
      if (mesh.isInstancedMesh) {
        for (let i=0;i<mesh.count;i++) {
          mesh.getMatrixAt(i,instanceMatrix);
          stageMatrix.multiplyMatrices(mesh.matrixWorld,instanceMatrix);
          appendStage(mesh,stageMatrix);
        }
      } else appendStage(mesh,mesh.matrixWorld);
      mesh.visible = false;
    }
    const g = staticStage.geometry;
    g.setDrawRange(0,required);
    g.attributes.position.needsUpdate = true;
    g.attributes.color.needsUpdate = true;
    staticStage.frustumCulled = false;
    staticStage.visible = required > 0;
  }
  function qualityScene() {
    // Restore authored visibility before collecting a new cached stage.
    clearStaticStage();
    environment.traverse(qualityMesh);
    objects.traverse(qualityMesh);
    flora.traverse(qualityMesh);
    rebuildStaticStage();
  }
  let renderScale = 0.85,
    renderSampleTotal = 0, renderSampleCount = 0,
    lastScaleChange = 0,
    renderedFrames = 0,
    invalidated = true;
  let last = performance.now(),
    running = true,
    frameRequest = 0; // 保存排程識別碼，讓銷毀能立即取消尚未執行的畫面。
  const starsGeo = new THREE.BufferGeometry(),
    points = [];
  for (let i = 0; i < 80; i++) {
    const a = i * 2.399;
    points.push(
      Math.cos(a) * (4 + (i % 11)),
      1 + (i % 7) * 0.48,
      Math.sin(a) * (4 + (i % 11)),
    );
  }
  starsGeo.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(points, 3),
  );
  const fireflies = new THREE.Points(
    starsGeo,
    new THREE.PointsMaterial({
      size: 0.045,
      color: "#e9e7aa",
      transparent: true,
      opacity: 0.65,
      depthWrite: false,
    }),
  );
  scene.add(fireflies);
  const moonDisc = new THREE.Mesh(
    new THREE.SphereGeometry(1.2, 24, 16),
    new THREE.MeshBasicMaterial({ color: "#dbe4c2" }),
  );
  moonDisc.position.set(-11, 12, -14);
  scene.add(moonDisc);
  const floorGeo = new THREE.CylinderGeometry(10.4, 9.6, 0.7, 64),
    floorMat = mat("#70856a");
  const island = new THREE.Mesh(floorGeo, floorMat);
  island.position.y = -0.49;
  island.receiveShadow = true;
  environment.add(island);
  const underside = new THREE.Mesh(
    new THREE.CylinderGeometry(9.7, 7.5, 2, 24),
    mat("#334e47"),
  );
  underside.position.y = -1.7;
  environment.add(underside);
  function addMesh(geometry, material, x, y, z, parent = environment) {
    const m = new THREE.Mesh(geometry, material);
    m.position.set(x, y, z);
    m.castShadow = true;
    m.receiveShadow = true;
    parent.add(m);
    return m;
  }
  const pathMat = mat("#b6b396");
  const steppingGeo = new THREE.CylinderGeometry(0.42, 0.46, 0.05, 7);
  for (let i = 0; i < 12; i++) {
    addMesh(
      steppingGeo,
      pathMat,
      Math.sin(i * 0.7) * 0.18,
      -0.07,
      4.75 + i * 0.38,
    );
  }
  for (let i = 0; i < 28; i++) {
    const a = (i / 28) * Math.PI * 2,
      r = 9.25 + (i % 3) * 0.15;
    const tree = createTree(["oak", "pine", "birch"][i % 3]);
    tree.position.set(Math.cos(a) * r, -0.1, Math.sin(a) * r);
    tree.scale.setScalar(0.8 + (i % 4) * 0.16);
    environment.add(tree);
    foliage.push(tree);
  }
  for (let i = 0; i < 18; i++) {
    const a = i * 2.4;
    const r = 8.5 + (i % 3) * 0.3,
      rock = createRock();
    rock.position.set(Math.cos(a) * r, -0.1, Math.sin(a) * r);
    rock.scale.setScalar(0.35 + (i % 3) * 0.12);
    rock.rotation.y = a;
    environment.add(rock);
  }
  const smallGrass = new THREE.InstancedMesh(
      new THREE.ConeGeometry(0.07, 0.3, 4),
      mat("#93ac71"),
      180,
    ),
    dummy = new THREE.Object3D();
  for (let i = 0; i < 180; i++) {
    const a = i * 2.399,
      r = 5.7 + (i % 17) * 0.19;
    dummy.position.set(Math.cos(a) * r, 0.02, Math.sin(a) * r);
    dummy.rotation.z = Math.sin(i) * 0.3;
    dummy.updateMatrix();
    smallGrass.setMatrixAt(i, dummy.matrix);
  }
  environment.add(smallGrass);
  // Static scenery is instanced by shared geometry/material (trees, pebbles, path).
  // Keep source transforms so camera cutaways can update the same GPU buffers.
  const sceneryBatches = [];
  const sceneryGroups = new Map();
  environment.updateMatrixWorld(true);
  environment.traverse((mesh) => {
    if (!mesh.isMesh || mesh.isInstancedMesh) return;
    const key = mesh.geometry.uuid + ":" + mesh.material.uuid;
    if (!sceneryGroups.has(key)) sceneryGroups.set(key, []);
    sceneryGroups.get(key).push(mesh);
  });
  for (const sources of sceneryGroups.values()) {
    if (sources.length < 2) continue;
    const batch = new THREE.InstancedMesh(
      sources[0].geometry,
      sources[0].material,
      sources.length,
    );
    batch.castShadow = true;
    batch.receiveShadow = true;
    environment.add(batch);
    for (const source of sources) source.visible = false;
    sceneryBatches.push({ batch, sources });
  }
  function updateScenery() {
    environment.updateMatrixWorld(true);
    for (const { batch, sources } of sceneryBatches) {
      sources.forEach((source, i) => batch.setMatrixAt(i, source.matrixWorld));
      batch.instanceMatrix.needsUpdate = true;
      batch.computeBoundingSphere();
    }
  }
  function label(text, obj, height = 1.8) {
    const el = document.createElement("span");
    el.className = "world-label";
    el.textContent = text;
    document.querySelector("#labels").append(el);
    labels.push({ obj, el, height });
  }
  function clickable(obj, data) {
    obj.userData.interaction = data;
    obj.traverse((c) => {
      if (c.isMesh) c.userData.root = obj;
    });
    interactables.push(obj);
    objects.add(obj);
    return obj;
  }
  function clearBatches() {
    for (const mesh of plantBatches) mesh.dispose();
    plantBatches = [];
    flora.clear();
  }
  function clearPreview() {
    if (!preview) return;
    preview.traverse((c) => {
      if (c.isMesh) c.material.dispose();
    });
    scene.remove(preview);
    preview = null;
  }
  function clearRegion() {
    clearStaticStage();
    cancelPointer();
    clearPreview();
    for (const l of labels) l.el.remove();
    labels.length = 0;
    interactables.length = 0;
    obstacles.length = 0;
    for (const m of mixers) {
      m.stopAllAction();
      m.uncacheRoot(m.getRoot());
    }
    mixers.length = 0;
    residents.length = 0;
    objects.traverse((c) => {
      if (c.isSkinnedMesh) c.skeleton.dispose();
    });
    for (const obj of regionOwned) {
      obj.geometry.dispose();
      obj.material.dispose();
    }
    for (const material of cutawayMaterials) material.dispose();
    cutawayMaterials.length = 0;
    cutaways.length = 0;
    regionOwned.length = 0;
    objects.clear();
    clearBatches();
    tileInstances.removeFromParent();
    wetInstances.removeFromParent();
    target = null;
    arrival = null;
    path = [];
    selectionMesh.visible = false;
  } // 切換區域時撤銷未完成手勢，避免舊按下套到新區域。
  function makeRegion(region) {
    clearRegion();
    view = region;
    player.position.set(0, 0, 5);
    floorMat.color.set(
      region === "garden"
        ? "#70856a"
        : region === "brook"
          ? "#6b9290"
          : region === "ridge"
            ? "#6f7a8c"
            : "#647d58",
    );
    if (region === "garden") {
      objects.add(tileInstances, wetInstances);
      for (let i = 0; i < 64; i++) {
        dummy.position.copy(tilePosition(i));
        dummy.position.y = -0.05;
        dummy.rotation.set(0, 0, 0);
        dummy.scale.set(1, 1, 1);
        dummy.updateMatrix();
        tileInstances.setMatrixAt(i, dummy.matrix);
      }
      tileInstances.instanceMatrix.needsUpdate = true;
      interactables.push(tileInstances);
      const border = new THREE.Mesh(
        new THREE.BoxGeometry(9, 0.13, 9),
        rimMat.clone(),
      );
      border.position.y = -0.17;
      objects.add(border);
      regionOwned.push(border);
      const house = createHouse();
      house.position.set(-6, -0.1, -4.9);
      house.rotation.y = 0.28;
      house.traverse((c) => {
        if (c.isMesh) {
          c.userData.uniqueMaterial = true;
          c.material = c.material.clone();
          cutawayMaterials.push(c.material);
        }
      });
      cutaways.push(house);
      clickable(house, { kind: "house" });
      obstacles.push({ x: -6, z: -4.9, r: 1.6 });
      label("⌂ 小屋 · 睡個好覺", house, 2.8);
      const table = createDecoration("table");
      table.position.set(6, 0, -4.8);
      clickable(table, { kind: "shop" });
      label("◈ 森林小舖", table, 1.8);
      const positions = [
        [-5.8, -1.3],
        [5.9, -1.3],
        [-5.8, 2.2],
        [5.9, 2.2],
        [-3.3, 6.1],
        [3.3, 6.1],
      ];
      RESIDENTS.forEach((r, i) => {
        const person = createCharacter(i + 1);
        contactShadow(person);
        person.position.set(positions[i][0], 0, positions[i][1]);
        person.rotation.y = Math.atan2(-positions[i][0], -positions[i][1]);
        clickable(person, { kind: "resident", id: r.id });
        const skin = person.children.find((c) => c.isSkinnedMesh);
        const distant = new THREE.Mesh(skin.geometry, skin.material);
        distant.name = person.name + "-distant";
        distant.visible = false;
        distant.userData.root = person;
        person.add(distant);
        residents.push({person, skin, distant});
        const m = new THREE.AnimationMixer(person);
        m.clipAction(
          person.animations?.find((c) => c.name === "idle") ||
            new THREE.AnimationClip("idle", 1, []),
        ).play();
        mixers.push(m);
        label(r.name, person, 1.7);
        obstacles.push({ x: positions[i][0], z: positions[i][1], r: 0.35 });
      });
      const water = addMesh(
        new THREE.CylinderGeometry(1.1, 1.05, 0.08, 32),
        new THREE.MeshStandardMaterial({
          color: "#78b5bd",
          roughness: 0.25,
          metalness: 0.1,
        }),
        6.8,
        -0.03,
        5,
        objects,
      );
      label("露水小池", water, 0.4);
      regionOwned.push(water);
    } else {
      const terrain = createTerrain(region === "ridge" ? "hill" : region);
      terrain.position.set(0, -0.08, 0);
      objects.add(terrain);
      const discoveries = DISCOVERIES.filter(
        (d) => d.region === region || d.regionId === region,
      );
      discoveries.forEach((d, i) => {
        const obj = createDiscovery(d.id),
          x = [-3.7, 2.9, -2.5, 3.9][i % 4],
          z = [-2.8, -2.5, 2.2, 2.6][i % 4];
        obj.position.set(x, 0, z);
        obj.scale.setScalar(1.5);
        clickable(obj, { kind: "discovery", id: d.id });
        label(d.name, obj, 1.5);
      });
      if (REGIONS.some((r) => r.id === region)) {
        const basket = createDecoration("planter");
        basket.position.set(0, 0, -3.5);
        clickable(basket, { kind: "gather", region });
        label("♧ 採集今日贈禮", basket, 1.2);
      } // cottage沒有今日贈禮，三個合法採集區仍保留真籃子入口。
      if (PUZZLES.some((p) => p.region === region)) {
        const puzzle = createDecoration("moonstand");
        puzzle.position.set(0, 0, 1);
        clickable(puzzle, { kind: "puzzle", region });
        label("✧ 森林的小謎題", puzzle, 1.5);
      } // 只呈現資料表有定義的三個謎題物件，consumer另有缺項fallback。
      const gate = createDecoration("arch");
      gate.position.set(0, 0, 6.3);
      clickable(gate, { kind: "return" });
      label("回到庭園", gate, 2);
    }
    updateProjection();
    updateCutaways();
  }
  function sync(next) {
    const region = next.region || "garden";
    const regionChanged = view !== region || objects.children.length === 0;
    const signature = region === "garden" ? next.grid.map((cell,i) => !cell ? "-" :
      [cell.type,cell.id,cell.type === "plant" ? growthPreview(next,i).stage : 0,
       !!cell.watered,cell.rotation || 0].join(":")).join("|") : region;
    const changed = regionChanged || signature !== gridSignature;
    state = next;
    if (regionChanged) makeRegion(region);
    reduced = !!next.settings?.reducedMotion;
    fireflies.visible = !reduced;
    applyQuality();
    if (changed) renderer.shadowMap.needsUpdate = true;
    invalidated = true;
    if (view === "garden" && changed) {
      plantRebuilds++;
      clearBatches();
      const groups = new Map();
      let wet = 0;
      state.grid.forEach((cell, i) => {
        if (!cell) return;
        const p = tilePosition(i);
        let obj =
          cell.type === "plant"
            ? createPlant(cell.id, growthPreview(state, i).stage)
            : createDecoration(cell.id);
        obj.position.copy(p);
        obj.rotation.y = ((cell.rotation || 0) * Math.PI) / 2;
        obj.updateMatrixWorld(true);
        obj.traverse((mesh) => {
          if (!mesh.isMesh) return;
          const key = mesh.geometry.uuid + ":" + mesh.material.uuid;
          let group = groups.get(key);
          if (!group) {
            group = {
              geometry: mesh.geometry,
              material: mesh.material,
              matrices: [],
            };
            groups.set(key, group);
          }
          group.matrices.push(mesh.matrixWorld.clone());
        });
        if (cell.type === "plant" && cell.watered) {
          dummy.position.copy(p);
          dummy.position.x += 0.34;
          dummy.position.z += 0.34;
          dummy.position.y = 0.04;
          dummy.rotation.set(-Math.PI / 2, 0, 0);
          dummy.updateMatrix();
          wetInstances.setMatrixAt(wet++, dummy.matrix);
        }
      });
      for (const g of groups.values()) {
        const batch = new THREE.InstancedMesh(
          g.geometry,
          g.material,
          g.matrices.length,
        );
        g.matrices.forEach((m, i) => batch.setMatrixAt(i, m));
        batch.castShadow = true;
        batch.receiveShadow = true;
        flora.add(batch);
        plantBatches.push(batch);
      }
      wetInstances.count = wet;
      wetInstances.instanceMatrix.needsUpdate = true;
    }
    gridSignature = signature;
    if (changed) qualityScene();
  }
  function select(i) {
    invalidated = true;
    selectionMesh.visible = view === "garden" && i >= 0;
    if (i >= 0) {
      selectionMesh.position.copy(tilePosition(i));
      selectionMesh.position.y = 0.075;
    }
    callbacks.select?.(i);
  }
  function canPlace(index) {
    if (index < 0 || index >= 64) return false;
    const p = tilePosition(index);
    return (
      Math.abs(player.position.x - p.x) > 0.68 ||
      Math.abs(player.position.z - p.z) > 0.68
    );
  }
  function blocked(x, z) {
    if (Math.hypot(x, z) > 8.7) return true;
    for (let obstacleIndex=0;obstacleIndex<obstacles.length;obstacleIndex++) {
      const o=obstacles[obstacleIndex];
      if (Math.hypot(x - o.x, z - o.z) < o.r + 0.18) return true;
    }
    if (view === "garden" && state)
      for (let i = 0; i < 64; i++) {
        if (state.grid[i]?.type !== "decor") continue;
        const px = ((i % 8) - 3.5) * TILE, pz = (Math.floor(i / 8) - 3.5) * TILE;
        if (Math.abs(x - px) < 0.58 && Math.abs(z - pz) < 0.58) return true;
      }
    return false;
  }
  function animate(name, duration = 0.7) {
    actionName = name;
    actionTime = duration;
    for (const [n, a] of Object.entries(playerActions))
      if (n !== name) a.stop();
    (playerActions[name] || playerActions.idle)?.reset().play();
    tool.visible = name === "water";
  }
  function activate(i) {
    select(i);
    animate(callbacks.tool?.() || "plant");
    callbacks.tile?.(i);
  }
  function moveTo(x, z, done) {
    // A bounded A* grid routes around furniture; movement never depends on teleporting through it.
    const spacing = 0.45,
      min = -8.1,
      size = 37,
      toNode = (v) =>
        Math.max(0, Math.min(size - 1, Math.round((v - min) / spacing))),
      toWorld = (n) => min + n * spacing;
    const start = [toNode(player.position.x), toNode(player.position.z)],
      end = [toNode(x), toNode(z)],
      key = (a, b) => a + "," + b;
    const open = [{ x: start[0], z: start[1], g: 0, f: 0 }],
      cost = new Map([[key(...start), 0]]),
      parents = new Map();
    let found = null,
      nodes = 0;
    while (open.length && nodes++ < 1500) {
      open.sort((a, b) => a.f - b.f);
      const n = open.shift();
      if (Math.hypot(n.x - end[0], n.z - end[1]) <= 1) {
        found = n;
        break;
      }
      for (const [dx, dz] of [
        [1, 0],
        [-1, 0],
        [0, 1],
        [0, -1],
      ]) {
        let nx = n.x + dx,
          nz = n.z + dz;
        if (
          nx < 0 ||
          nz < 0 ||
          nx >= size ||
          nz >= size ||
          blocked(toWorld(nx), toWorld(nz))
        )
          continue;
        const k = key(nx, nz),
          g = n.g + 1;
        if (g >= (cost.get(k) ?? Infinity)) continue;
        cost.set(k, g);
        parents.set(k, n);
        open.push({
          x: nx,
          z: nz,
          g,
          f: g + Math.hypot(nx - end[0], nz - end[1]),
        });
      }
    }
    if (!found) {
      callbacks.notice?.("這條路暫時過不去。可以從外圍走道繞行。");
      return;
    }
    const route = [];
    let n = found;
    while (n && !(n.x === start[0] && n.z === start[1])) {
      route.unshift(new THREE.Vector3(toWorld(n.x), 0, toWorld(n.z)));
      n = parents.get(key(n.x, n.z));
    }
    path = route;
    arrival = done;
    target = path.shift() || null;
    if (!target) {
      arrival?.();
      arrival = null;
    }
  }
  const raycaster = new THREE.Raycaster(),
    pointer = new THREE.Vector2();
  let pointerDown = null;
  const labelPoint = new THREE.Vector3();
  let labelCameraRevision = 0,
    labelWidth = 0,
    labelHeight = 0;
  function updateLabels() {
    if (labelWidth <= 0 || labelHeight <= 0) return;
    for (let labelIndex=0;labelIndex<labels.length;labelIndex++) {
      const label=labels[labelIndex];
      const { obj, el, height } = label,
        p = obj.position,
        previous = label.projection;
      if (
        previous &&
        previous.revision === labelCameraRevision &&
        previous.x === p.x &&
        previous.y === p.y &&
        previous.z === p.z &&
        previous.height === height
      )
        continue;
      labelPoint.copy(p);
      labelPoint.y += height;
      labelPoint.project(camera);
      const left = (labelPoint.x * 0.5 + 0.5) * labelWidth + "px",
        top = (-labelPoint.y * 0.5 + 0.5) * labelHeight + "px",
        display = labelPoint.z < 1 ? "" : "none";
      if (!previous || previous.left !== left) el.style.left = left;
      if (!previous || previous.top !== top) el.style.top = top;
      if (!previous || previous.display !== display) el.style.display = display;
      label.projection = {
        revision: labelCameraRevision,
        x: p.x,
        y: p.y,
        z: p.z,
        height,
        left,
        top,
        display,
      };
    }
  }
  function pointerdown(e) {
    // 只有啟用中、主要指標的左鍵按下能取得一次手勢所有權。
    if (
      !running ||
      !enabled ||
      e.isPrimary === false ||
      e.button !== 0 ||
      !Number.isInteger(e.pointerId)
    )
      return; // 非主要、多鍵或停用輸入不能建立新token。
    pointerDown = {
      x: e.clientX,
      y: e.clientY,
      time: performance.now(),
      id: e.pointerId,
      type: e.pointerType,
    };
    canvas.focus({ preventScroll: true }); // 保留原聚焦與時間紀錄，不新增長按閾值。
  } // 完成當次按下登記。
  function cancelPointer() {
    pointerDown = null;
  } // 取消、失焦、模式切換及銷毀立即撤銷未消耗手勢。
  function pointerup(e) {
    // 先消耗token，再判斷所有權；命中回呼即使重入也不能重複執行。
    const press = pointerDown;
    cancelPointer(); // 任一次放開最多消耗一個原始按下，錯owner採安全中止。
    if (
      !running ||
      !enabled ||
      !press ||
      e.pointerId !== press.id ||
      e.pointerType !== press.type ||
      e.isPrimary === false ||
      e.button !== 0 ||
      Math.hypot(e.clientX - press.x, e.clientY - press.y) > 12
    )
      return; // 保留原拖移門檻，只接受匹配的主要左鍵手勢。
    const rect = canvas.getBoundingClientRect();
    pointer.set(
      ((e.clientX - rect.left) / rect.width) * 2 - 1,
      (-(e.clientY - rect.top) / rect.height) * 2 + 1,
    );
    raycaster.setFromCamera(pointer, camera);
    if(state?.mode==='journey') {
      const taskHits=raycaster.intersectObjects(markers,true);
      if(taskHits.length){const root=taskHits[0].object.userData.root;moveTo(root.position.x,root.position.z);callbacks.notice?.("走近信標後按 E，或用右側任務列照顧。");return;}
    }
    const hits = raycaster.intersectObjects(interactables, true); // 具名處理函式保持原本命中判定。
    if (hits.length) {
      const tileHit = hits.find((h) => h.object === tileInstances),
        hit =
          hits[0].object.userData.root?.userData.cutaway && tileHit
            ? tileHit
            : hits[0];
      if (hit.object === tileInstances) {
        select(hit.instanceId);
        activate(hit.instanceId);
        return;
      }
      const root = hit.object.userData.root;
      const interaction =
        root?.userData.interaction || hit.object.userData.interaction;
      if (interaction) {
        animate("harvest");
        callbacks.interact?.(interaction);
        return;
      }
    }
    const p = new THREE.Vector3();
    if (
      raycaster.ray.intersectPlane(
        new THREE.Plane(new THREE.Vector3(0, 1, 0), 0),
        p,
      )
    )
      moveTo(p.x, p.z);
  } // 結束具名放開處理，保留既有點選與尋路行為。
  canvas.addEventListener("pointerdown", pointerdown);
  canvas.addEventListener("pointerup", pointerup);
  canvas.addEventListener("pointercancel", cancelPointer);
  canvas.addEventListener("lostpointercapture", cancelPointer);
  canvas.addEventListener("pointerleave", cancelPointer); // 取消、失去捕捉或離開畫布均撤銷token，銷毀時成對解除。
  addEventListener("pointerup", cancelPointer);
  addEventListener("pointercancel", cancelPointer); // 冒泡階段在正常canvas處理之後撤銷；畫布外放開也不能殘留同mouse owner。
  function interact() {
    if (!enabled) return;
    if(state?.mode==='journey') {
      let closest=-1,distance=1.7;
      for(let i=0;i<4;i++){const n=state.campaign.taskNodes[i],d=Math.hypot(player.position.x-n.x,player.position.z-n.z);if(d<distance){distance=d;closest=i;}}
      if(closest>=0){callbacks.interact?.({kind:'campaign',id:closest});return;}
    }
    if (view === "garden") {
      let nearest = -1,
        distance = Infinity;
      for (let i = 0; i < 64; i++) {
        let d = player.position.distanceTo(tilePosition(i));
        if (d < distance) {
          nearest = i;
          distance = d;
        }
      }
      if (distance < 1.7) {
        activate(nearest);
        return;
      }
    }
    let near = null,
      dist = Infinity;
    for (const obj of interactables) {
      if (!obj.userData.interaction) continue;
      const d = player.position.distanceTo(obj.position);
      if (d < dist) {
        near = obj;
        dist = d;
      }
    }
    if (near && dist < 2.5) {
      animate("harvest");
      callbacks.interact?.(near.userData.interaction);
    } else callbacks.notice?.("走近田地或居民後按 E；也可直接點選物件。");
  }
  function keydown(e) {
    if (!enabled || e.target.closest("dialog,input,select,textarea")) return;
    const k = e.key.toLowerCase();
    if (
      [
        "w",
        "a",
        "s",
        "d",
        "arrowup",
        "arrowleft",
        "arrowdown",
        "arrowright",
        "e",
        "q",
        "r",
        "1",
        "2",
        "3",
        "4",
      ].includes(k)
    ) {
      e.preventDefault();
      if (k === "e" && !e.repeat) interact();
      else if (k === "q" && !e.repeat) rotate(-1);
      else if (k === "r" && !e.repeat) rotate(1);
      else if ("1234".includes(k))
        callbacks.chooseTool?.(
          ["plant", "water", "harvest", "decorate"][+k - 1],
        );
      else keys.add(k);
    }
  }
  function keyup(e) {
    keys.delete(e.key.toLowerCase());
  } // 以同一函式身分解除按鍵放開事件。
  function blur() {
    keys.clear();
    cancelPointer();
  } // 失焦同時清除按鍵與尚未完成的指標手勢。
  addEventListener("keydown", keydown);
  addEventListener("keyup", keyup);
  addEventListener("blur", blur); // 所有全域輸入皆能在銷毀時成對解除。
  let projectionWidth = -1, projectionHeight = -1, projectionZoom = -1, projectionTurn = -1;
  function updateProjection() {
    if (projectionWidth === canvas.clientWidth && projectionHeight === canvas.clientHeight && projectionZoom === zoom && projectionTurn === cameraTurn) return;
    projectionWidth = canvas.clientWidth; projectionHeight = canvas.clientHeight; projectionZoom = zoom; projectionTurn = cameraTurn;
    invalidated = true;
    renderer.shadowMap.needsUpdate = true;
    const width = canvas.clientWidth,
      height = canvas.clientHeight,
      aspect = width / height,
      span = (height < 450 ? 15 : aspect < 0.8 ? 9.2 : 12.8) * zoom,
      halfHeight = span / aspect,
      topReserve = height < 450 ? 50 : width < 600 ? 190 : 80,
      bottomReserve = height < 450 ? 145 : width < 600 ? 250 : 205,
      offset = ((topReserve - bottomReserve) / height) * halfHeight;
    camera.left = -span;
    camera.right = span;
    camera.top = halfHeight + offset;
    camera.bottom = -halfHeight + offset;
    const angle = Math.PI / 4 + (cameraTurn * Math.PI) / 2;
    camera.position.set(Math.sin(angle) * 20, 22, Math.cos(angle) * 20);
    camera.lookAt(0, 0, 0);
    camera.updateProjectionMatrix();
    camera.updateMatrixWorld(true);
    labelWidth = width;
    labelHeight = height;
    labelCameraRevision++;
  }
  function updateCutaways() {
    const angle = Math.PI / 4 + (cameraTurn * Math.PI) / 2;
    movementSin = Math.sin(angle); movementCos = Math.cos(angle);
    for (const tree of foliage) {
      const foreground =
        tree.position.x * Math.sin(angle) + tree.position.z * Math.cos(angle) >
        4;
      tree.scale.y = tree.scale.x * (foreground ? 0.25 : 1);
    }
    updateScenery();
    for (const obj of cutaways) {
      const foreground =
        obj.position.x * Math.sin(angle) + obj.position.z * Math.cos(angle) >
        1.5;
      obj.userData.cutaway = foreground;
      obj.traverse((c) => {
        if (c.isMesh) {
          c.material.opacity = foreground ? 0.16 : 1;
          c.material.transparent = foreground;
          c.material.depthWrite = !foreground;
        }
      });
    }
  }

  function rotate(direction) {
    cameraTurn = (cameraTurn + direction + 4) % 4;
    updateProjection();
    updateCutaways();
    if (state && qualityMode) qualityScene();
    callbacks.camera?.(cameraTurn);
  }
  function endCelebration() {
    celebrating = 0;
    for (const { obj, position, rotation } of celebrationPositions) {
      obj.position.copy(position);
      obj.rotation.copy(rotation);
    }
    celebrationPositions = [];
    for (const m of mixers) {
      m.stopAllAction();
      const clip = m.getRoot().animations?.find((c) => c.name === "idle");
      if (clip) m.clipAction(clip).play();
    }
    sun.intensity = 3;
    moon.intensity = 1.5;
    fireflies.material.size = 0.045;
  }
  function celebrate() {
    endCelebration();
    celebrating = reduced ? 0 : 16;
    if (!reduced) animate("celebrate", 16);
    const crowd = [player, ...mixers.map((m) => m.getRoot())];
    crowd.forEach((obj, i) => {
      celebrationPositions.push({
        obj,
        position: obj.position.clone(),
        rotation: obj.rotation.clone(),
      });
      obj.position.set((i - 3) * 0.85, 0, 5.3 + Math.sin(i * 0.5) * 0.55);
      obj.rotation.y = 0.6;
    });
    for (const m of mixers) {
      m.stopAllAction();
      const clip = m.getRoot().animations?.find((c) => c.name === "interact");
      if (clip && !reduced) m.clipAction(clip).reset().play();
    }
    sun.intensity = 1.5;
    moon.intensity = 3;
    fireflies.material.size = 0.09;
  }
  function applyQuality() {
    const mode = state?.settings?.quality || "auto";
    if (mode === qualityMode) return;
    qualityMode = mode;
    renderSampleTotal = 0;
    renderSampleCount = 0;
    lastScaleChange = performance.now();
    lightweight = mode !== "high";
    renderer.shadowMap.enabled = mode === "high";
    sun.castShadow = mode === "high";
    renderScale = mode === "high" ? 1 : mode === "low" ? 0.75 : 0.85;
    renderer.shadowMap.needsUpdate = true;
    qualityScene();
    invalidated = true;
    if (state) resizeFramebuffer();
  }
  let framebufferWidth = -1, framebufferHeight = -1, framebufferDpr = -1;
  function resizeFramebuffer() {
    const width = canvas.clientWidth, height = canvas.clientHeight;
    const budget = qualityMode === "high" ? 1 : Math.min(1, Math.sqrt(1500000 / (width * height)));
    const scale = qualityMode === "high" ? 1 : renderScale;
    const dpr = Math.min(devicePixelRatio, 1.25) * budget * scale;
    if (width === framebufferWidth && height === framebufferHeight && dpr === framebufferDpr) return;
    framebufferWidth = width; framebufferHeight = height; framebufferDpr = dpr;
    renderer.setPixelRatio(dpr);
    renderer.setSize(width,height,false);
    invalidated = true;
  }
  function resize() { resizeFramebuffer(); updateProjection(); }
  const ro = new ResizeObserver(resize);
  ro.observe(canvas);
  resize();
  function frame(now) {
    if (!running) return;
    frameRequest = requestAnimationFrame(frame);
    const updateStart = performance.now();
    callbacks.tick?.(Math.max(0,now-last));
    const lastFrameTime = last,
      dt = Math.min((now - last) / 1000, 0.1);
    last = now; // 保存下一畫面排程，其餘動畫更新規則不變。
    if (enabled || celebrating > 0) {
      if (celebrating > 0) {
        celebrating -= dt;
        if (celebrating <= 0) endCelebration();
      }
      let dx = 0,
        dz = 0;
      if (keys.has("w") || keys.has("arrowup")) dz--;
      if (keys.has("s") || keys.has("arrowdown")) dz++;
      if (keys.has("a") || keys.has("arrowleft")) dx--;
      if (keys.has("d") || keys.has("arrowright")) dx++;
      let moving = false;
      if (dx || dz) {
        target = null;
        path.length = 0;
        arrival = null;
        const v = moveVector.set(dx * movementCos + dz * movementSin, 0, dz * movementCos - dx * movementSin).normalize();
        const nx = player.position.x + v.x * dt * 3,
          nz = player.position.z + v.z * dt * 3;
        if (!blocked(nx, player.position.z)) player.position.x = nx;
        if (!blocked(player.position.x, nz)) player.position.z = nz;
        player.rotation.y = Math.atan2(v.x, v.z);
        moving = true;
      } else if (target) {
        const v = moveVector.copy(target).sub(player.position);
        if (v.length() < 0.12) {
          target = path.shift() || null;
          if (!target) {
            arrival?.();
            arrival = null;
          }
        } else {
          v.normalize();
          const nx = player.position.x + v.x * dt * 3,
            nz = player.position.z + v.z * dt * 3;
          if (!blocked(nx, nz)) {
            player.position.set(nx, 0, nz);
            player.rotation.y = Math.atan2(v.x, v.z);
            moving = true;
          } else {
            target = null;
            path = [];
            arrival = null;
          }
        }
      }
      if (actionTime > 0) actionTime -= dt;
      else {
        tool.visible = false;
        const name = moving ? "walk" : "idle";
        if (actionName !== name) {
          for (let a=0;a<playerActionList.length;a++) playerActionList[a].stop();
          playerActions[name]?.reset().play();
          actionName = name;
        }
      }
      if (!reduced || moving || actionTime > 0) playerMixer.update(dt);
      for (let i = 0; i < residents.length; i++) {
        const {person,skin,distant} = residents[i];
        const near = !lightweight || celebrating > 0 || person.position.distanceToSquared(player.position) < 9;
        skin.visible = near;
        distant.visible = !near;
        if (near && (!reduced || celebrating > 0)) mixers[i]?.update(dt);
      }
      if (!reduced) {
        fireflies.rotation.y += dt * 0.025;
        fireflies.material.opacity = 0.5 + Math.sin(now * 0.0007) * 0.15;
      }
    }
    updateCampaignModels(dt);
    updateLabels();
      if (enabled) {
        renderSampleTotal += now - lastFrameTime;
        renderSampleCount++;
        if (qualityMode === "auto" && renderSampleCount >= 90 && now - lastScaleChange > 8000) {
          const avg = renderSampleTotal / renderSampleCount;
          const next = avg > 38 ? Math.max(0.75, renderScale - 0.05)
            : avg < 24 ? Math.min(1, renderScale + 0.05) : renderScale;
          if (next !== renderScale) { renderScale = next; resizeFramebuffer(); }
          lastScaleChange = now;
          renderSampleTotal = 0;
          renderSampleCount = 0;
        }
      }
    updateMs = performance.now() - updateStart;
    if (enabled || celebrating > 0 || invalidated) {
      const renderStart = performance.now();
      renderer.render(scene, camera);
      const complete = performance.now();
      submissionMs = complete - renderStart;
      if (enabled) {
        const i = renderCount++ % updates.length;
        frames[i] = now - lastFrameTime;
        frameCount++;
        updates[i] = updateMs;
        submissions[i] = submissionMs;
        completions[i] = lastCompletion ? complete - lastCompletion : 0;
        totalUpdateMs += updateMs;
        totalSubmissionMs += submissionMs;
      }
      lastCompletion = complete;
      renderedFrames++;
      invalidated = false;
      if (enabled) {
        const tail = performance.now() - complete;
        updates[(renderCount-1)%updates.length] += tail;
        totalUpdateMs += tail;
      }

    }
  }
  frameRequest = requestAnimationFrame(frame); // 保存第一個排程，避免尚未繪製就銷毀時保留閉包。
  return {
    sync,
    position() {return {x:player.position.x,z:player.position.z};},
    walkToTask(index) {if(!enabled||state?.mode!=='journey')return;const n=state.campaign.taskNodes[index];if(n)moveTo(n.x,n.z);},
    campaignFeedback(index) {feedbackNode=index;feedbackSeconds=.3;invalidated=true;},
    select,
    canPlace,
    interact,
    rotate,
    celebrate,
    endCelebration,
    clearPreview,
    preview(id, index, rotation) {
      clearPreview();
      if (index < 0 || state.grid[index] || !canPlace(index)) return;
      preview = createDecoration(id);
      preview.position.copy(tilePosition(index));
      preview.rotation.y = (rotation * Math.PI) / 2;
      preview.traverse((c) => {
        if (c.isMesh) {
          c.userData.uniqueMaterial = true;
          c.material = c.material.clone();
          c.material.transparent = true;
          c.material.opacity = 0.65;
          c.material.depthWrite = false;
        }
      });
      scene.add(preview);
    },
    zoom(delta) {
      zoom = THREE.MathUtils.clamp(zoom + delta * 0.12, 0.45, 1.5);
      updateProjection();
    },
    setEnabled(value) {
      invalidated = true;
      cancelPointer();
      if (enabled !== value) lastCompletion = 0;
      enabled = value;
      keys.clear();
      if (!value) {
        target = null;
        path = [];
        arrival = null;
      }
    },
    move(direction, down) {
      const key = { up: "w", down: "s", left: "a", right: "d" }[direction];
      down ? keys.add(key) : keys.delete(key);
    },
    animate,
    metrics(since) {
      const recent = Array.from(frames.subarray(0, Math.min(frameCount, frames.length)));
      const sorted = [...recent].sort((a, b) => a - b);
      const stats = (buffer) => {
        const values = Array.from(buffer.subarray(0, Math.min(renderCount, buffer.length))).sort((a,b)=>a-b);
        return { mean:values.reduce((a,b)=>a+b,0)/(values.length||1), p95:values[Math.floor(values.length*.95)]||0, max:values.at(-1)||0 };
      };
      return {
        samples: Number.isInteger(since) ? Array.from({length: Math.min(renderCount - since, updates.length)}, (_,offset) => {
          const sequence = Math.max(since, renderCount - updates.length) + offset;
          const i = sequence % updates.length;
          return { sequence:sequence+1, rafMs:frames[i], updateMs:updates[i], submitMs:submissions[i], completionMs:completions[i] };
        }) : undefined,
        frames: frameCount,
        avg: recent.reduce((a,b)=>a+b,0)/(recent.length||1),
        plantRebuilds, staticStageRebuilds, staticVertexCapacity,
        staticBufferBytes: stagePositions.byteLength + stageColors.byteLength,
        textureBytesBound: 16 * 1024 * 1024,
        update:stats(updates), submission:stats(submissions), completion:stats(completions),
        totalUpdateMs, totalSubmissionMs, activeRenderedFrames:renderCount,
        framebuffer: { width:canvas.width, height:canvas.height },
        lightweight,
        renderedFrames,
        renderScale,
        shadows: renderer.shadowMap.enabled,
        quality: state?.settings?.quality,
        p50: sorted[Math.floor(sorted.length * 0.5)] || 0,
        p95: sorted[Math.floor(sorted.length * 0.95)] || 0,
        drawCalls: renderer.info.render.calls,
        triangles: renderer.info.render.triangles,
        geometries: renderer.info.memory.geometries,
        textures: renderer.info.memory.textures,
        cameraTurn,
        sceneRegion:view,
        position: player.position.toArray(),
        dpr: renderer.getPixelRatio(),
        renderer: renderer
          .getContext()
          .getParameter(renderer.getContext().RENDERER),
        three: THREE.REVISION,
      };
    },
    dispose() {
      if (!running) return;
      running = false;
      enabled = false;
      cancelAnimationFrame(frameRequest);
      keys.clear();
      pointerDown = null;
      endCelebration();
      ro.disconnect();
      clearRegion();
      for (const { batch } of sceneryBatches) batch.dispose();
      contactGeometry.dispose();
      contactMaterial.dispose();
      player.traverse((c) => {
        if (c.isSkinnedMesh) c.skeleton.dispose();
      });
      removeEventListener("keydown", keydown);
      removeEventListener("keyup", keyup);
      removeEventListener("blur", blur);
      canvas.removeEventListener("pointerdown", pointerdown);
      canvas.removeEventListener("pointerup", pointerup);
      canvas.removeEventListener("pointercancel", cancelPointer);
      canvas.removeEventListener("lostpointercapture", cancelPointer);
      canvas.removeEventListener("pointerleave", cancelPointer);
      removeEventListener("pointerup", cancelPointer);
      removeEventListener("pointercancel", cancelPointer);
      clearStaticStage();
      staticStage.geometry.dispose();
      stageMaterial.dispose();
      socketGeometry.dispose();crystalGeometry.dispose();shadeGeometry.dispose();socketMaterial.dispose();shadeMaterial.dispose();linkGeometry.dispose();linkMaterial.dispose();
      for(const root of markers){root.userData.label.remove();root.userData.crystal.material.dispose();}
      renderer.dispose();
    },
    get region() {
      return view;
    },
  }; // 銷毀具冪等性，會清慶典錨點、輸入及排程；共用模型快取仍由模型模組擁有。
}
