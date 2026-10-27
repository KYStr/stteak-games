import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';

/** Signal Zero original modular asset kit. Metres, Y up, +X forward.
 * All materials and primitive geometries are shared; no frame-time geometry allocation.
 * The runner is one rigid-weighted SkinnedMesh, with 21 named bones and nine clips.
 * Exportable sources and collision proxies: assets/games/signal-zero/.
 */
const geoCache = new Map();
const palette = {
  fabric: [0x101d32, .16, .87], armor: [0x334c63, .72, .42],
  edge: [0x8ea7b7, .82, .29], rubber: [0x080f1c, .10, .92],
  mint: [0x71ffe2, .40, .25, 0x32eac8, 1.8],
  pink: [0xec5eaa, .38, .34, 0xa42672, .8],
  screen: [0x103c4c, .35, .28, 0x228d97, .65],
  amber: [0xf5b66a, .55, .3, 0xcc6b28, 1.2],
};
export const assetMaterials = Object.fromEntries(Object.entries(palette).map(([name, p]) => {
  const material = new THREE.MeshStandardMaterial({ name: `sz-${name}`, color: p[0], metalness: p[1], roughness: p[2], emissive: p[3] ?? 0, emissiveIntensity: p[4] ?? 0 });
  return [name, material];
}));
// Hero-only values keep the player readable against the night architecture without
// lifting the value of every platform, cabinet and guard in the shared palette.
const runnerMaterials = new Map([
  [assetMaterials.fabric, new THREE.MeshStandardMaterial({ name: 'sz-runner-fabric', color: 0x2c465d, metalness: .13, roughness: .83 })],
  [assetMaterials.armor, new THREE.MeshStandardMaterial({ name: 'sz-runner-armor', color: 0x64879b, metalness: .50, roughness: .42 })],
  [assetMaterials.edge, new THREE.MeshStandardMaterial({ name: 'sz-runner-edge', color: 0xb4d4dc, metalness: .67, roughness: .30 })],
]);
const archiveGlass = new THREE.MeshStandardMaterial({ name: 'sz-archive-glass', color: 0x599cae, metalness: .30, roughness: .18, emissive: 0x163846, emissiveIntensity: .3, transparent: true, opacity: .23, depthWrite: false });
function geometry(kind, a, b, c, n = 8) {
  const key = [kind, a, b, c, n].join(':');
  if (!geoCache.has(key)) {
    let g;
    if (kind === 'box') g = new THREE.BoxGeometry(a, b, c);
    else if (kind === 'cyl') g = new THREE.CylinderGeometry(a, b, c, n);
    else if (kind === 'sphere') g = new THREE.SphereGeometry(a, n, Math.max(4, n / 2));
    else if (kind === 'torus') g = new THREE.TorusGeometry(a, b, 4, n);
    g.name = `sz-${key}`; geoCache.set(key, g);
  }
  return geoCache.get(key);
}
function piece(parent, name, kind, dimensions, material, position = [0, 0, 0], rotation = [0, 0, 0]) {
  const mesh = new THREE.Mesh(geometry(kind, ...dimensions), typeof material === 'string' ? assetMaterials[material] : material);
  mesh.name = name; mesh.position.fromArray(position); mesh.rotation.fromArray(rotation);
  mesh.castShadow = true; mesh.receiveShadow = true; parent.add(mesh); return mesh;
}
const box = (p, n, dim, mat, at, rot) => piece(p, n, 'box', dim, mat, at, rot);
const cyl = (p, n, dim, mat, at, rot) => piece(p, n, 'cyl', dim, mat, at, rot);
const sphere = (p, n, rad, mat, at, scale) => { const m = piece(p, n, 'sphere', [rad, 0, 0, 12], mat, at); if (scale) m.scale.fromArray(scale); return m; };
const torus = (p, n, r, tube, mat, at, rot) => piece(p, n, 'torus', [r, tube, 0, 16], mat, at, rot);
function bone(parent, name, position) { const b = new THREE.Bone(); b.name = name; b.position.fromArray(position); parent.add(b); return b; }

// Collapse static pieces by material. Animated subgroups are excluded when recursive=false.
function batch(group, recursive = true) {
  group.updateMatrixWorld(true); const inverse = group.matrixWorld.clone().invert(); const materials = new Map(); const meshes = [];
  group.traverse(o => { if (o.isMesh && !o.isSkinnedMesh && (recursive || o.parent === group)) meshes.push(o); });
  for (const m of meshes) {
    const g = m.geometry.clone().applyMatrix4(inverse.clone().multiply(m.matrixWorld));
    const list = materials.get(m.material) ?? []; list.push(g); materials.set(m.material, list); m.removeFromParent();
  }
  for (const [material, geometries] of materials) {
    const merged = mergeGeometries(geometries, false); merged.userData.assetInstanceOwned = true; geometries.forEach(g => g.dispose());
    const m = new THREE.Mesh(merged, material); m.name = `${group.name}-${material.name}`; m.castShadow = true; m.receiveShadow = true; group.add(m);
  }
  return group;
}

function skinRigidPieces(group, rootBone) {
  group.updateMatrixWorld(true); const bones = []; rootBone.traverse(o => { if (o.isBone) bones.push(o); });
  const byMaterial = new Map(); const meshes = []; group.traverse(o => { if (o.isMesh) meshes.push(o); });
  for (const mesh of meshes) {
    let owner = mesh.parent; while (owner && !owner.isBone) owner = owner.parent;
    const index = bones.indexOf(owner); const g = mesh.geometry.clone().applyMatrix4(mesh.matrixWorld);
    const vertexCount = g.attributes.position.count; const indices = new Uint16Array(vertexCount * 4); const weights = new Float32Array(vertexCount * 4);
    for (let i = 0; i < vertexCount; i++) { indices[i * 4] = index; weights[i * 4] = 1; }
    g.setAttribute('skinIndex', new THREE.Uint16BufferAttribute(indices, 4)); g.setAttribute('skinWeight', new THREE.Float32BufferAttribute(weights, 4));
    const collection = byMaterial.get(mesh.material) ?? []; collection.push(g); byMaterial.set(mesh.material, collection); mesh.removeFromParent();
  }
  const geometryGroups = []; const materialList = [];
  for (const [material, geometries] of byMaterial) { geometryGroups.push(mergeGeometries(geometries, false)); materialList.push(material); geometries.forEach(g => g.dispose()); }
  const merged = mergeGeometries(geometryGroups, true); merged.userData.assetInstanceOwned = true; geometryGroups.forEach(g => g.dispose());
  const mesh = new THREE.SkinnedMesh(merged, materialList); mesh.name = 'runner-skinned-armor'; mesh.castShadow = true; mesh.receiveShadow = true;
  const skeleton = new THREE.Skeleton(bones); mesh.bind(skeleton); mesh.frustumCulled = false; group.add(mesh); return skeleton;
}

const clipsCache = new Map();
function createClips(guard = false) {
  if (clipsCache.has(guard)) return clipsCache.get(guard);
  const definitions = {
    idle: { duration: 2.4, hip: [.88, .885, .89, .885, .88], chest: [-.025, 0, .025, 0, -.025] },
    run: { duration: .64, hip: [.88, .91, .88, .91, .88], chest: [-.12, -.10, -.12, -.10, -.12], lThigh: [.65, 0, -.65, 0, .65], rThigh: [-.65, 0, .65, 0, -.65], lShin: [-.1, -.85, -.6, -.05, -.1], rShin: [-.6, -.05, -.1, -.85, -.6], lArm: [-.65, 0, .65, 0, -.65], rArm: [.65, 0, -.65, 0, .65], lForearm: [1, .6, .4, .6, 1], rForearm: [.4, .6, 1, .6, .4] },
    jump: { duration: .5, hip: [.83, .88, .91, .91, .91], chest: [-.2, -.15, -.1, -.08, -.08], lThigh: [.7, .9, .8, .6, .6], rThigh: [-.2, .1, .35, .3, .3], lShin: [-1, -.8, -.55, -.4, -.4], rShin: [-.65, -.6, -.4, -.4, -.4], lArm: [-.5, -.9, -1.1, -.8, -.8], rArm: [.4, .8, 1.2, .8, .8] },
    fall: { duration: .8, chest: [-.05, .02, -.05, .02, -.05], lThigh: [.2, .24, .2, .16, .2], rThigh: [-.15, -.1, -.15, -.2, -.15], lShin: [-.3], rShin: [-.2], lArm: [1.1, 1, .9, 1, 1.1], rArm: [-.7, -.6, -.5, -.6, -.7], lForearm: [.6], rForearm: [.6] },
    crouch: { duration: 1.2, hip: [.55, .56, .55, .56, .55], chest: [-.42], lThigh: [1.1], rThigh: [1.05], lShin: [-1.8], rShin: [-1.74], lFoot: [.7], rFoot: [.69], lArm: [.65], rArm: [.58], lForearm: [.55], rForearm: [.65] },
    ladder: { duration: 1, hip: [.88, .9, .88, .9, .88], chest: [-.08], lThigh: [1.05, .5, .1, .5, 1.05], rThigh: [.1, .5, 1.05, .5, .1], lShin: [-1.1, -.7, -.2, -.7, -1.1], rShin: [-.2, -.7, -1.1, -.7, -.2], lArm: [2.6, 2, 1.6, 2, 2.6], rArm: [1.6, 2, 2.6, 2, 1.6], lForearm: [.4], rForearm: [.4] },
    climb: { duration: .7, hip: [.57, .62, .75, .86, .88], chest: [-.6, -.5, -.3, -.1, 0], lThigh: [1.3, 1.4, .9, .4, 0], rThigh: [.5, .8, 1, .5, 0], lShin: [-1.6, -1.3, -.8, -.3, 0], rShin: [-.9, -1.2, -1, -.4, 0], lArm: [2.4, 2, 1.4, .5, 0], rArm: [2.4, 2, 1.4, .5, 0], lForearm: [.8, .4, .2, .1, 0], rForearm: [.8, .4, .2, .1, 0] },
    hack: { duration: .9, chest: [-.1], lArm: [1.2, 1.3, 1.2, 1.3, 1.2], rArm: [1.45, 1.4, 1.3, 1.4, 1.45], lForearm: [.6, .7, .6, .55, .6], rForearm: [.3, .45, .3, .2, .3], lHand: [.1, -.1, .1, -.1, .1], rHand: [-.1, .1, -.1, .1, -.1] },
    caught: { duration: .9, hip: [.88, .78, .64, .61, .61], chest: [0, .2, .45, .5, .5], lThigh: [0, .3, .75, .85, .85], rThigh: [0, .2, .6, .7, .7], lShin: [0, -.4, -1.3, -1.4, -1.4], rShin: [0, -.4, -1.1, -1.2, -1.2], lArm: [0, .4, .8, .5, .5], rArm: [0, -.2, -.5, -.7, -.7] },
  };
  const boneMap = { chest: 'chest', lThigh: 'thigh-l', rThigh: 'thigh-r', lShin: 'shin-l', rShin: 'shin-r', lFoot: 'foot-l', rFoot: 'foot-r', lArm: 'arm-l', rArm: 'arm-r', lForearm: 'forearm-l', rForearm: 'forearm-r', lHand: 'hand-l', rHand: 'hand-r' };
  const clips = Object.entries(definitions).map(([name, d]) => {
    const times = [0, .25, .5, .75, 1].map(t => t * d.duration); const tracks = [];
    const hips = d.hip ?? [.88]; tracks.push(new THREE.VectorKeyframeTrack('hips.position', times, times.flatMap((_, i) => [0, hips[i] ?? hips[0], 0])));
    for (const [key, b] of Object.entries(boneMap)) {
      const vals = d[key] ?? [0]; const quaternions = times.flatMap((_, i) => { const angle = vals[i] ?? vals[0]; return [0, 0, Math.sin(angle / 2), Math.cos(angle / 2)]; });
      tracks.push(new THREE.QuaternionKeyframeTrack(`${b}.quaternion`, times, quaternions));
    }
    const clip = new THREE.AnimationClip(name, d.duration, tracks);
    clip.userData = { loop: !['jump', 'climb', 'caught'].includes(name), rootMotion: false, events: name === 'run' ? [{ time: .16, event: 'footstep-l' }, { time: .48, event: 'footstep-r' }] : name === 'hack' ? [{ time: .45, event: 'tap' }] : [] }; return clip;
  });
  if (guard) {
    for (const [name, source, speed] of [['patrol', 'run', .60], ['notice', 'idle', .85], ['search', 'run', .36], ['chase', 'run', 1.18]]) {
      const clip = clips.find(c => c.name === source).clone(); clip.name = name; clip.duration /= speed; clip.tracks.forEach(t => t.scale(1 / speed));
      clip.userData = { loop: true, rootMotion: false, events: [] };
      if (name === 'notice') { const times = [0, .3, .65, 1].map(t => t * clip.duration); const values = [0, -.3, .3, 0].flatMap(a => [0, Math.sin(a / 2), 0, Math.cos(a / 2)]); clip.tracks.push(new THREE.QuaternionKeyframeTrack('head.quaternion', times, values)); }
      clips.push(clip);
    }
  }
  clipsCache.set(guard, clips); return clips;
}

function humanoid(guard = false) {
  const g = new THREE.Group(); g.name = guard ? 'security-guard' : 'zero-runner';
  const hips = bone(g, 'hips', [0, .88, 0]); const spine = bone(hips, 'spine', [0, .12, 0]); const chest = bone(spine, 'chest', [0, .26, 0]);
  const neck = bone(chest, 'neck', [0, .16, 0]); const head = bone(neck, 'head', [0, .11, 0]);
  box(hips, 'pelvis', [.23, .17, .29], 'fabric'); box(hips, 'utility-belt', [.255, .055, .315], 'rubber', [0, .07, 0]);
  box(hips, 'belt-clasp', [.04, .04, .09], guard ? 'amber' : 'mint', [.145, .075, 0]);
  box(spine, 'waist-flex', [.20, .23, .25], 'rubber', [0, .03, 0]);
  sphere(chest, 'torso-shell', .21, 'fabric', [0, -.025, 0], [.63, .87, .89]);
  box(chest, 'chest-plate', [.07, .23, .28], 'armor', [.11, 0, 0], [0, 0, -.1]);
  box(chest, 'chest-core', [.015, .06, .11], guard ? 'amber' : 'mint', [.152, .025, 0]);
  box(chest, 'chest-divider', [.018, .015, .22], 'edge', [.153, -.055, 0]);
  box(chest, 'signal-pack', [.10, .25, .21], 'armor', [-.15, -.005, 0]);
  box(chest, 'signal-pack-strip', [.013, .19, .035], guard ? 'amber' : 'pink', [-.208, -.005, 0]);
  for (const z of [-.073, .073]) box(chest, 'pack-vent', [.014, .14, .016], 'rubber', [-.208, -.015, z]);
  cyl(neck, 'neck-seal', [.065, .07, .08, 8], 'rubber', [0, .025, 0]);
  sphere(head, 'helmet', .127, guard ? 'armor' : 'fabric', [0, 0, 0], [1, .90, 1]);
  box(head, 'visor-frame', [.07, .095, .224], 'rubber', [.092, .005, 0], [0, 0, -.12]);
  box(head, 'visor', [.075, .047, .205], guard ? 'amber' : 'mint', [.105, .019, 0], [0, 0, -.12]);
  box(head, 'chin-guard', [.09, .045, .125], 'armor', [.072, -.078, 0]);
  for (const side of [-1, 1]) {
    const suffix = side === -1 ? 'l' : 'r'; const z = side * .185;
    const arm = bone(chest, `arm-${suffix}`, [0, .065, z]); const forearm = bone(arm, `forearm-${suffix}`, [0, -.235, 0]); const hand = bone(forearm, `hand-${suffix}`, [0, -.225, 0]);
    sphere(arm, 'shoulder', .095, 'armor', [0, -.015, 0], [.9, .9, 1]);
    cyl(arm, 'upper-sleeve', [.065, .052, .195, 8], 'fabric', [0, -.13, 0]);
    sphere(forearm, 'elbow', .057, 'rubber', [0, 0, 0]);
    cyl(forearm, 'forearm-shell', [.06, .045, .175, 8], 'armor', [0, -.115, 0]);
    box(forearm, 'wrist-signal', [.045, .055, .014], guard ? 'amber' : 'mint', [.015, -.14, side * .05]);
    box(hand, 'glove', [.085, .095, .074], 'rubber', [.009, -.046, 0]);
    bone(hand, `socket-hand-${suffix}`, [.02, -.086, 0]);
    const thigh = bone(hips, `thigh-${suffix}`, [0, -.025, side * .096]); const shin = bone(thigh, `shin-${suffix}`, [0, -.395, 0]); const foot = bone(shin, `foot-${suffix}`, [0, -.37, 0]);
    cyl(thigh, 'thigh-suit', [.085, .062, .33, 8], 'fabric', [0, -.195, 0]);
    box(thigh, 'thigh-plate', [.075, .21, .107], 'armor', [.057, -.17, side * .012], [0, 0, -.05]);
    sphere(shin, 'knee', .073, 'rubber', [0, 0, 0]);
    box(shin, 'knee-cap', [.06, .095, .11], 'edge', [.056, -.005, 0]);
    cyl(shin, 'shin-shell', [.062, .048, .30, 8], 'armor', [0, -.18, 0]);
    box(shin, 'calf-light', [.025, .16, .015], guard ? 'amber' : 'pink', [-.026, -.18, side * .049]);
    box(foot, 'boot', [.215, .13, .13], 'rubber', [.047, -.025, 0]);
    box(foot, 'boot-sole', [.23, .028, .142], 'edge', [.049, -.078, 0]);
    bone(foot, `socket-foot-${suffix}`, [.055, -.092, 0]);
  }
  if (guard) {
    box(chest, 'guard-shoulder-bridge', [.19, .075, .46], 'armor', [0, .095, 0]);
    box(chest, 'guard-badge', [.014, .045, .055], 'amber', [.156, .07, -.07]);
    box(hips, 'guard-holster', [.12, .22, .07], 'rubber', [-.01, -.08, .19]);
  }
  if (!guard) g.traverse(o => { if (o.isMesh && runnerMaterials.has(o.material)) o.material = runnerMaterials.get(o.material); });
  const skeleton = skinRigidPieces(g, hips); const clips = createClips(guard); const mixer = new THREE.AnimationMixer(g);
  const actions = Object.fromEntries(clips.map(c => { const action = mixer.clipAction(c); if (!c.userData.loop) { action.setLoop(THREE.LoopOnce, 1); action.clampWhenFinished = true; } return [c.name, action]; }));
  const sockets = {}; skeleton.bones.filter(b => b.name.startsWith('socket-')).forEach(b => { sockets[b.name] = b; });
  g.animations = clips; g.userData = { assetOwned: true, assetId: guard ? 'signal-zero.security.guard' : 'signal-zero.character.runner', mixer, animations: clips, actions, sockets, skeleton, activeAnimation: null, forward: '+X', unit: 'meter' };
  animateRunner(g, { animation: 'idle', facing: 1 }, 0); return g;
}
export function createRunner() { return humanoid(false); }
export function animateRunner(group, state, dt) {
  const data = group.userData; const name = data.actions[state.animation] ? state.animation : 'idle';
  if (data.activeAnimation !== name) {
    const previous = data.actions[data.activeAnimation]; const next = data.actions[name]; next.reset().setEffectiveTimeScale(1).setEffectiveWeight(1).play();
    if (previous) { previous.fadeOut(.12); next.fadeIn(.12); } data.activeAnimation = name;
  }
  if (state.facing !== undefined && state.facing !== 0) group.rotation.y = state.facing < 0 ? Math.PI : 0;
  data.mixer.update(Math.min(Math.max(dt || 0, 0), .1));
}

export function createSecurity(type) {
  if (type === 'guard') { const g = humanoid(true); g.userData.securityType = type; return g; }
  const g = new THREE.Group(); g.name = `security-${type}`; const indicator = assetMaterials.mint.clone(); indicator.name = 'sz-security-indicator'; indicator.userData.assetInstanceOwned = true;
  const moving = new THREE.Group(); moving.name = `${type}-gimbal`; g.add(moving);
  const rotors = [];
  if (type === 'camera') {
    box(g, 'wall-plate', [.09, .45, .30], 'armor', [-.31, 0, 0]);
    box(g, 'mount-arm', [.28, .07, .075], 'edge', [-.18, -.08, 0]);
    cyl(g, 'gimbal-pin', [.065, .065, .18, 10], 'rubber', [-.07, 0, 0]);
    box(moving, 'camera-shell', [.40, .18, .25], 'armor', [.06, .025, 0]);
    box(moving, 'camera-hood', [.47, .035, .29], 'edge', [.085, .13, 0]);
    cyl(moving, 'lens-ring', [.091, .083, .085, 12], 'rubber', [.30, .025, 0], [0, 0, Math.PI / 2]);
    cyl(moving, 'lens-glass', [.061, .061, .013, 12], indicator, [.35, .025, 0], [0, 0, Math.PI / 2]);
    box(moving, 'camera-status', [.08, .025, .012], indicator, [.08, .06, .132]);
    for (let i = 0; i < 4; i++) box(moving, 'camera-vents', [.018, .08, .013], 'rubber', [-.08 + i * .045, 0, -.132]);
  } else if (type === 'drone') {
    sphere(moving, 'drone-shell', .24, 'armor', [0, 0, 0], [1.3, .46, .85]);
    box(moving, 'drone-keel', [.36, .12, .18], 'rubber', [0, -.07, 0]);
    sphere(moving, 'drone-eye', .072, indicator, [.275, -.025, 0], [.48, .8, 1]);
    box(moving, 'drone-spine', [.26, .018, .045], 'pink', [-.015, .115, 0]);
    for (const x of [-.18, .18]) for (const z of [-.30, .30]) {
      box(moving, 'rotor-outrigger', [.065, .035, .28], 'edge', [x, .015, z * .65]);
      torus(moving, 'rotor-guard', .145, .015, 'armor', [x, .065, z], [Math.PI / 2, 0, 0]);
      cyl(moving, 'rotor-hub', [.035, .025, .07, 8], 'rubber', [x, .065, z]);
      const rotor = new THREE.Group(); rotor.name = `rotor-${rotors.length}`; rotor.position.set(x, .1, z); moving.add(rotor);
      box(rotor, 'blade-a', [.24, .008, .025], 'edge'); box(rotor, 'blade-b', [.025, .008, .24], 'edge'); batch(rotor); rotors.push(rotor);
    }
  } else if (type === 'laser') {
    box(g, 'laser-base', [.29, .08, .31], 'edge', [0, .04, 0]);
    box(moving, 'laser-post', [.16, .59, .18], 'armor', [0, .36, 0]);
    box(moving, 'laser-bezel', [.22, .08, .22], 'rubber', [0, .66, 0]);
    cyl(moving, 'laser-lens', [.065, .065, .055, 12], indicator, [0, .715, 0]);
    for (const y of [.15, .23, .31]) box(moving, 'laser-fin', [.23, .025, .24], 'edge', [0, y, 0]);
  } else throw new Error(`Unknown security asset: ${type}`);
  batch(g, false); batch(moving, false);
  g.animations = ['idle', 'alert', 'disabled'].map(name => {
    const duration = name === 'alert' ? .5 : 2; const times = [0, .25, .5, .75, 1].map(t => t * duration);
    const angles = name === 'disabled' ? [-.22, -.22, -.22, -.22, -.22] : name === 'alert' ? [-.15, 0, .15, 0, -.15] : [-.25, 0, .25, 0, -.25];
    const values = angles.flatMap(a => { const z = type === 'camera' ? Math.atan(-.28) + a : type === 'drone' || name === 'disabled' ? a : 0; return [0, 0, Math.sin(z / 2), Math.cos(z / 2)]; });
    const tracks = [new THREE.QuaternionKeyframeTrack(`${moving.name}.quaternion`, times, values)];
    if (type === 'drone' && name !== 'disabled') for (const rotor of rotors) tracks.push(new THREE.QuaternionKeyframeTrack(`${rotor.name}.quaternion`, times, [0, Math.PI / 2, Math.PI, Math.PI * 1.5, Math.PI * 2].flatMap(a => [0, Math.sin(a / 2), 0, Math.cos(a / 2)])));
    const clip = new THREE.AnimationClip(name, duration, tracks); clip.userData = { loop: name !== 'disabled', rootMotion: false, events: [] }; return clip;
  });
  g.userData = { assetOwned: true, assetId: `signal-zero.security.${type}`, securityType: type, moving, indicator, rotors, animationTime: 0 }; return g;
}
export function animateSecurity(group, state, dt) {
  const data = group.userData; const status = state.state ?? 'patrol'; const disabled = !!state.disabled;
  if (data.securityType === 'guard') {
    const animation = disabled ? 'caught' : ['chase', 'tracking', 'pursuit', 'alert'].includes(status) ? 'chase' : ['search', 'searching'].includes(status) ? 'search' : ['suspicious', 'notice'].includes(status) ? 'notice' : status === 'idle' ? 'idle' : 'patrol';
    animateRunner(group, { animation, facing: state.dir ?? 1 }, dt); return;
  }
  data.animationTime += Math.min(Math.max(dt || 0, 0), .1); const t = state.time ?? data.animationTime;
  const alert = ['alert', 'chase', 'tracking', 'pursuit'].includes(status); data.indicator.color.setHex(disabled ? 0x354451 : alert ? 0xff77ac : 0x71ffe2);
  data.indicator.emissive.setHex(disabled ? 0x000000 : alert ? 0xc92c61 : 0x32eac8); data.indicator.emissiveIntensity = disabled ? 0 : alert ? 1.8 : 1.3;
  if (state.dir !== undefined && state.dir !== 0) group.rotation.y = state.dir < 0 ? Math.PI : 0;
  if (data.securityType === 'camera') { data.moving.rotation.y = 0; data.moving.rotation.z = disabled ? -.7 : Math.atan(-.28) + (state.scanOffset ?? 0) * (state.dir ?? 1); }
  if (data.securityType === 'drone') { data.moving.position.y = disabled ? -.08 : Math.sin(t * 2.8) * .035; data.moving.rotation.z = disabled ? -.35 : Math.atan(-.23); for (const rotor of data.rotors) rotor.rotation.y += disabled ? 0 : dt * 36; }
}

export function createProp(type, options = {}) {
  const g = new THREE.Group(); g.name = `prop-${type}`; g.userData.assetId = `signal-zero.prop.${type}`; g.userData.assetOwned = true;
  const w = options.w ?? 2; const h = options.h ?? (type === 'ladder' ? options.length ?? 3 : 1.4); const d = options.d ?? .8;
  const accent = options.color ? new THREE.MeshStandardMaterial({ color: options.color, emissive: options.color, emissiveIntensity: .6, metalness: .45, roughness: .35, name: 'sz-custom-accent' }) : assetMaterials.mint;
  if (options.color) accent.userData.assetInstanceOwned = true;
  if (type === 'terminal') {
    box(g, 'terminal-plinth', [.72, .1, .60], 'rubber', [0, .05, 0]);
    box(g, 'terminal-cabinet', [.55, .95, .44], 'armor', [0, .55, 0]);
    box(g, 'terminal-face', [.59, .44, .12], 'rubber', [0, 1.16, .13], [-.2, 0, 0]);
    box(g, 'terminal-screen', [.46, .30, .018], 'screen', [0, 1.17, .20], [-.2, 0, 0]);
    for (let i = 0; i < 4; i++) box(g, 'screen-signal', [.23 - i * .035, .013, .01], accent, [-.075 + i * .02, 1.26 - i * .055, .226 + i * .011], [-.2, 0, 0]);
    box(g, 'keyboard-tray', [.60, .045, .31], 'edge', [0, .91, .28]);
    for (let i = 0; i < 3; i++) box(g, 'keyboard-row', [.42, .012, .025], 'rubber', [0, .94, .21 + i * .055]);
    box(g, 'terminal-power', [.035, .62, .014], accent, [-.22, .52, .23]);
    for (let i = 0; i < 5; i++) box(g, 'terminal-vent', [.30, .022, .014], 'rubber', [.04, .25 + i * .06, .23]);
  } else if (type === 'exit') {
    const width = options.w ?? 1.6; const height = options.h ?? 2.6;
    for (const side of [-1, 1]) { box(g, 'door-pillar', [.20, height, .38], 'armor', [side * (width / 2 + .1), height / 2, 0]); box(g, 'door-guide', [.025, height - .22, .045], accent, [side * (width / 2 - .005), height / 2, .20]); box(g, 'door-foot', [.35, .17, .48], 'edge', [side * (width / 2 + .1), .085, 0]); }
    box(g, 'door-header', [width + .4, .24, .38], 'armor', [0, height - .12, 0]); box(g, 'door-threshold', [width, .06, .45], 'edge', [0, .03, 0]);
    box(g, 'door-status', [.48, .07, .02], accent, [0, height - .10, .205]);
    for (const side of [-1, 1]) box(g, 'door-stripe', [.2, .10, .018], 'pink', [side * (width / 2 + .1), height - .55, .202], [0, 0, side * .4]);
  } else if (type === 'packet') {
    box(g, 'data-core', [.22, .29, .09], 'screen');
    box(g, 'data-shell', [.31, .36, .06], 'armor', [0, 0, -.04]);
    box(g, 'data-window', [.15, .22, .014], accent, [0, .015, .054]);
    box(g, 'data-label', [.11, .018, .02], 'pink', [0, -.11, .06]);
    for (let i = 0; i < 4; i++) { box(g, 'data-contact', [.035, .055, .022], 'edge', [-.09 + i * .06, -.19, 0]); box(g, 'data-top-fin', [.025, .06, .065], 'rubber', [-.09 + i * .06, .19, -.015]); }
  } else if (type === 'cover') {
    box(g, 'cabinet-body', [w, h, d], 'armor', [0, h / 2, 0]);
    box(g, 'cabinet-cap', [w + .10, .08, d + .08], 'edge', [0, h - .04, 0]);
    box(g, 'cabinet-base', [w + .08, .08, d + .06], 'rubber', [0, .04, 0]);
    for (const side of [-1, 1]) {
      box(g, 'cabinet-rib', [.045, h - .12, .028], 'rubber', [side * (w / 2 - .11), h / 2, d / 2 + .018]);
      for (let i = 0; i < 5; i++) box(g, 'cabinet-louvre', [Math.min(.5, w * .32), .025, .042], 'rubber', [side * w * .23, h * .45 + i * .075, d / 2 + .02]);
    }
    box(g, 'cabinet-handle', [.09, .18, .07], 'edge', [.10, h * .62, d / 2 + .03]);
    box(g, 'cabinet-status', [.16, .028, .021], accent, [-w * .23, h * .83, d / 2 + .025]);
    for (const x of [-w / 2 + .08, w / 2 - .08]) for (const y of [.15, h - .15]) cyl(g, 'cabinet-fastener', [.025, .025, .018, 6], 'edge', [x, y, d / 2 + .025], [Math.PI / 2, 0, 0]);
  } else if (type === 'ladder') {
    const width = options.w ?? .62; const depth = options.d ?? .14;
    for (const side of [-1, 1]) {
      box(g, 'ladder-rail', [.055, h, .065], 'edge', [side * width / 2, h / 2, 0]);
      for (const y of [.22, h - .22]) box(g, 'ladder-bracket', [.12, .065, depth + .12], 'armor', [side * width / 2, y, -depth / 2]);
    }
    const count = Math.max(2, Math.floor(h / .30));
    for (let i = 0; i <= count; i++) { const y = .12 + i * (h - .24) / count; cyl(g, 'ladder-rung', [.025, .025, width, 6], 'armor', [0, y, .015], [0, 0, Math.PI / 2]); }
    for (const side of [-1, 1]) box(g, 'ladder-top-marker', [.07, .22, .075], accent, [side * width / 2, h - .12, .006]);
  } else if (type === 'platform') {
    const height = options.h ?? .35;
    box(g, 'platform-core', [w, height, d], 'armor', [0, -height / 2, 0]);
    box(g, 'platform-top', [w, .035, d], 'edge', [0, -.0175, 0]);
    box(g, 'platform-face-inset', [Math.max(.1, w - .15), Math.max(.04, height * .45), .025], 'rubber', [0, -height * .56, d / 2 + .013]);
    box(g, 'platform-edge-light', [Math.max(.1, w - .08), .032, .02], accent, [0, -.055, d / 2 + .016]);
    const panels = Math.max(1, Math.floor(w / 1.4));
    for (let i = 1; i < panels; i++) { const x = -w / 2 + i * w / panels; box(g, 'platform-seam', [.018, .005, Math.max(.1, d - .04)], 'rubber', [x, .003, 0]); box(g, 'platform-reinforcement', [.06, height * .62, .035], 'armor', [x, -height * .65, d / 2 + .03]); }
    for (const x of [-w / 2 + .12, w / 2 - .12]) box(g, 'platform-end-marker', [.09, .006, Math.min(d * .75, .4)], 'pink', [x, .004, 0]);
  } else throw new Error(`Unknown prop asset: ${type}`);
  return batch(g);
}

/** Decorative background landmarks. Bounds stay inside an 8 × 8 × 3 m envelope.
 * These are intentionally non-collidable and never create a gameplay standing
 * surface. Put the entire root behind the traversal plane, normally z=-5.
 * Optional color changes only the landmark's functional emissive accents.
 */
export function createSetpiece(type, options = {}) {
  const group = new THREE.Group(); group.name = `setpiece-${type}`;
  group.userData = { assetOwned: true, assetId: `signal-zero.environment.${type}`, decorative: true, collidable: false, standingSurface: false };
  const accent = options.color !== undefined ? new THREE.MeshStandardMaterial({ name: 'sz-landmark-accent', color: options.color, emissive: options.color, emissiveIntensity: .75, metalness: .4, roughness: .35 }) : assetMaterials[type === 'city' ? 'amber' : type === 'core' ? 'pink' : 'mint'];
  if (options.color !== undefined) accent.userData.assetInstanceOwned = true;
  box(group, 'landmark-foundation', [7.8, .35, 2.8], 'armor', [0, .175, 0]);
  box(group, 'landmark-foundation-inset', [7.2, .085, .035], 'rubber', [0, .18, 1.417]);
  if (type === 'city') {
    // A rooftop cooling station: transformer coils, rising feed pipes and a
    // guarded axial fan are distinct silhouettes even without color cues.
    box(group, 'fan-duct', [3.25, 3.25, 2.35], 'armor', [1.85, 4.86, -.12]);
    box(group, 'fan-dark-baffle', [2.95, 2.95, .035], 'rubber', [1.85, 4.86, 1.08]);
    torus(group, 'fan-cowling', 1.40, .095, 'edge', [1.85, 4.86, 1.22]);
    torus(group, 'fan-inner-rim', 1.24, .025, accent, [1.85, 4.86, 1.27]);
    for (let i = 0; i < 10; i++) {
      const angle = i * Math.PI / 5; const x = 1.85 + Math.cos(angle) * .71; const y = 4.86 + Math.sin(angle) * .71;
      box(group, 'fan-blade', [.34, 1.0, .065], 'armor', [x, y, 1.24], [0, .18, angle - Math.PI / 2 + .22]);
    }
    cyl(group, 'fan-hub', [.23, .28, .17, 12], 'edge', [1.85, 4.86, 1.25], [Math.PI / 2, 0, 0]);
    box(group, 'fan-safety-cross-h', [2.72, .035, .04], 'rubber', [1.85, 4.86, 1.39]);
    box(group, 'fan-safety-cross-v', [.035, 2.72, .04], 'rubber', [1.85, 4.86, 1.39]);
    for (const x of [.48, 3.22]) box(group, 'fan-support', [.20, 3.0, 1.8], 'armor', [x, 1.85, -.1]);
    box(group, 'transformer-vessel', [2.15, 2.6, 1.8], 'armor', [-1.16, 1.65, .25]);
    box(group, 'transformer-cap', [2.35, .18, 1.98], 'edge', [-1.16, 2.99, .25]);
    for (let i = 0; i < 8; i++) box(group, 'transformer-radiator', [.09, 1.94, .15], 'rubber', [-2.00 + i * .24, 1.7, 1.20]);
    for (const x of [-1.85, -1.16, -.47]) {
      cyl(group, 'transformer-insulator', [.11, .15, .8, 8], 'rubber', [x, 3.46, .25]);
      for (let i = 0; i < 4; i++) torus(group, 'transformer-insulator-disc', .18, .037, 'edge', [x, 3.15 + i * .19, .25], [Math.PI / 2, 0, 0]);
      sphere(group, 'transformer-terminal', .09, accent, [x, 3.92, .25]);
    }
    for (const x of [-3.35, -2.80]) {
      cyl(group, 'vertical-coolant-pipe', [.16, .16, 7.15, 10], 'edge', [x, 3.925, -.62]);
      sphere(group, 'pipe-elbow', .18, 'edge', [x, 7.50, -.62]);
      const length = 1.85 - x; cyl(group, 'overhead-feed', [.16, .16, length, 10], 'edge', [(x + 1.85) / 2, x === -3.35 ? 7.50 : 7.10, -.62], [0, 0, Math.PI / 2]);
      for (const y of [1.1, 3.1, 5.1, 6.7]) { box(group, 'pipe-clamp', [.48, .12, .50], 'armor', [x, y, -.62]); box(group, 'pipe-clamp-light', [.22, .045, .018], accent, [x, y, -.354]); }
    }
    box(group, 'plant-inlet', [.75, .42, .90], 'rubber', [1.85, 6.70, -.62]);
  } else if (type === 'archive') {
    // Three vitrines reveal real internal data cartridges and vertical light
    // rails. Metal gantries read as infrastructure, not a transparent image.
    for (const x of [-3.62, 3.62]) {
      box(group, 'archive-gantry-pillar', [.28, 7.45, .48], 'armor', [x, 4.075, -.75]);
      box(group, 'archive-pillar-guide', [.045, 6.9, .04], accent, [x, 4.0, -.49]);
    }
    box(group, 'archive-gantry-header', [7.52, .25, .55], 'edge', [0, 7.67, -.75]);
    for (const [x, height] of [[-2.34, 5.55], [0, 6.85], [2.34, 6.1]]) {
      box(group, 'archive-tower-foot', [1.82, .25, 2.02], 'rubber', [x, .475, .15]);
      box(group, 'archive-tower-glass', [1.52, height, 1.56], archiveGlass, [x, .60 + height / 2, .15]);
      box(group, 'archive-tower-cap', [1.78, .20, 1.88], 'edge', [x, .67 + height, .15]);
      for (const side of [-1, 1]) {
        for (const z of [-.68, .98]) box(group, 'archive-frame', [.065, height + .12, .065], 'armor', [x + side * .80, .60 + height / 2, z]);
        box(group, 'archive-optical-rail', [.045, height - .32, .055], accent, [x + side * .57, .60 + height / 2, .45]);
      }
      const cartridges = Math.floor(height / .65);
      for (let i = 0; i < cartridges; i++) {
        const y = .92 + i * .65; box(group, 'archive-data-cartridge', [1.06, .25, .93], 'armor', [x, y, -.02]);
        box(group, 'archive-cartridge-face', [.82, .13, .025], 'screen', [x, y, .46]);
        box(group, 'archive-data-status', [.045, .10, .035], i % 3 === 0 ? 'pink' : accent, [x + .34, y, .49]);
      }
      box(group, 'archive-optical-uplink', [.16, .42, .18], 'armor', [x, .68 + height, -.65]);
    }
  } else if (type === 'core') {
    // Coaxial containment rings are distributed in depth. Eight segmented
    // shield blocks connect the rings around a volumetric luminous reactor.
    const cy = 4.35;
    for (const x of [-3.55, 3.55]) {
      box(group, 'reactor-stabilizer', [.50, 5.5, 1.7], 'armor', [x, 3.1, 0]);
      box(group, 'reactor-stabilizer-strip', [.07, 4.8, .04], accent, [x, 3.1, .88]);
      for (const y of [1.0, 2.0, 3.0, 4.0, 5.0]) box(group, 'reactor-cooling-fin', [.68, .11, 1.95], 'edge', [x, y, 0]);
    }
    cyl(group, 'reactor-chamber', [1.76, 1.76, 1.35, 20], 'rubber', [0, cy, 0], [Math.PI / 2, 0, 0]);
    cyl(group, 'reactor-plasma-volume', [1.40, 1.40, 1.52, 20], 'screen', [0, cy, 0], [Math.PI / 2, 0, 0]);
    cyl(group, 'reactor-core-lens', [.65, .65, .12, 16], accent, [0, cy, .83], [Math.PI / 2, 0, 0]);
    for (const z of [-1.12, 0, 1.12]) {
      torus(group, 'reactor-containment-ring', 2.52, .16, 'edge', [0, cy, z]);
      torus(group, 'reactor-field-ring', 2.11, .035, accent, [0, cy, z]);
    }
    torus(group, 'reactor-face-bezel', 1.56, .09, 'armor', [0, cy, .83]);
    for (let i = 0; i < 8; i++) {
      const angle = i * Math.PI / 4, x = Math.cos(angle), y = Math.sin(angle);
      box(group, 'reactor-segment-shield', [.90, .36, 2.66], 'armor', [x * 2.55, cy + y * 2.55, 0], [0, 0, angle + Math.PI / 2]);
      box(group, 'reactor-segment-marker', [.64, .045, .032], accent, [x * 2.55, cy + y * 2.55, 1.355], [0, 0, angle + Math.PI / 2]);
      box(group, 'reactor-radial-brace', [.78, .12, .22], 'rubber', [x * 2.0, cy + y * 2.0, .87], [0, 0, angle]);
    }
    box(group, 'reactor-base-cradle', [3.5, .50, 2.1], 'rubber', [0, .60, 0]);
    for (const x of [-.95, .95]) box(group, 'reactor-cradle-arm', [.38, 1.55, 1.7], 'armor', [x, 1.35, 0], [0, 0, x < 0 ? -.25 : .25]);
    box(group, 'reactor-control-spine', [.28, .85, 1.8], 'armor', [0, 7.36, 0]);
    box(group, 'reactor-spine-marker', [.14, .62, .035], accent, [0, 7.36, .92]);
  } else throw new Error(`Unknown setpiece asset: ${type}`);
  return batch(group);
}

export const ASSET_KIT_VERSION = '1.1.0';
export const ANIMATION_NAMES = ['idle', 'run', 'jump', 'fall', 'crouch', 'ladder', 'climb', 'hack', 'caught'];

/** Dispose only this kit's instance-owned resources, never shared primitives or palette.
 * Safe to call once on a whole stage or separately on individual asset roots.
 */
export function disposeInstance(group) {
  const geometries = new Set(); const materials = new Set(); const skeletons = new Set();
  group.traverse(o => {
    if (o.userData.mixer) { o.userData.mixer.stopAllAction(); o.userData.mixer.uncacheRoot(o); }
    if (o.geometry?.userData.assetInstanceOwned) geometries.add(o.geometry);
    if (o.skeleton) skeletons.add(o.skeleton);
    if (o.material) for (const material of Array.isArray(o.material) ? o.material : [o.material]) if (material.userData.assetInstanceOwned) materials.add(material);
  });
  geometries.forEach(g => g.dispose()); materials.forEach(m => m.dispose()); skeletons.forEach(s => s.dispose());
}
