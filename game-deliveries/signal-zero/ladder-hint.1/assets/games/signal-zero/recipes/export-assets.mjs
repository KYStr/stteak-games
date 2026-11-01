import { readFile, writeFile, mkdir, copyFile } from 'node:fs/promises';
import { resolve, dirname, relative } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { createHash } from 'node:crypto';
import assert from 'node:assert/strict';

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, '../../../..');
const assets = resolve(here, '..');
const runtime = resolve(root, 'public/games/signal-zero/assets');
const threeRoot = resolve(root, 'games/signal-zero/node_modules/three');
const THREE = await import(pathToFileURL(resolve(threeRoot, 'build/three.module.js')).href);
const { GLTFExporter } = await import(pathToFileURL(resolve(threeRoot, 'examples/jsm/exporters/GLTFExporter.js')).href);
const { GLTFLoader } = await import(pathToFileURL(resolve(threeRoot, 'examples/jsm/loaders/GLTFLoader.js')).href);
const { createRunner, createSecurity, createProp, createSetpiece, animateRunner, animateSecurity, ASSET_KIT_VERSION } = await import(pathToFileURL(resolve(root, 'games/signal-zero/src/models.js')).href);
const { LEVELS } = await import(pathToFileURL(resolve(root, 'games/signal-zero/src/levels.js')).href);
const { PHYSICS } = await import(pathToFileURL(resolve(root, 'games/signal-zero/src/core.js')).href);
const maxInChapter = count => Math.max(...LEVELS.map(count));
const securityMaximum = type => maxInChapter(level => level.devices.filter(device => device.type === type).length);

// GLTFExporter only needs FileReader for binary buffer packaging; there are no textures.
globalThis.FileReader = class {
  readAsArrayBuffer(blob) { blob.arrayBuffer().then(buffer => { this.result = buffer; this.onloadend?.(); }).catch(error => this.onerror?.(error)); }
  readAsDataURL(blob) { blob.arrayBuffer().then(buffer => { this.result = `data:${blob.type};base64,${Buffer.from(buffer).toString('base64')}`; this.onloadend?.(); }).catch(error => this.onerror?.(error)); }
};

await mkdir(resolve(runtime, 'models'), { recursive: true });
await mkdir(resolve(runtime, 'data'), { recursive: true });
await mkdir(resolve(assets, 'sources'), { recursive: true });
await mkdir(resolve(assets, 'generation'), { recursive: true });
await copyFile(resolve(root, 'games/signal-zero/src/models.js'), resolve(assets, 'sources/procedural-models.js'));
const sourceHash = createHash('sha256').update(await readFile(resolve(assets, 'sources/procedural-models.js'))).digest('hex');

const definitions = [
  ['runner', 'character', createRunner, 'base-center', 1],
  ['guard', 'security', () => createSecurity('guard'), 'base-center', securityMaximum('guard')],
  ['camera', 'security', () => createSecurity('camera'), 'wall-mount', securityMaximum('camera')],
  ['drone', 'security', () => createSecurity('drone'), 'center', securityMaximum('drone')],
  ['laser', 'security', () => createSecurity('laser'), 'base-center', securityMaximum('laser')],
  ['terminal', 'prop', () => createProp('terminal'), 'base-center', 4],
  ['exit', 'prop', () => createProp('exit'), 'base-center', 1],
  ['packet', 'prop', () => createProp('packet'), 'center', 1],
  ['cover', 'prop', () => createProp('cover', { w: 2, h: 1.4, d: .8 }), 'base-center', maxInChapter(level => level.covers.length)],
  ['ladder', 'prop', () => createProp('ladder', { h: 3 }), 'base-center', maxInChapter(level => level.ladders.length)],
  ['platform', 'prop', () => createProp('platform', { w: 4, h: .35, d: 1.4 }), 'top-center', maxInChapter(level => level.platforms.length)],
  ['city', 'environment', () => createSetpiece('city'), 'base-center', 4],
  ['archive', 'environment', () => createSetpiece('archive'), 'base-center', 4],
  ['core', 'environment', () => createSetpiece('core'), 'base-center', 4],
];
const colliders = {
  schemaVersion: 1, unit: 'meter', up: '+Y', forward: '+X', note: 'Independent asset proxies. Runner AABB and parameterized cover/platform boxes match the authoritative core rules. Other model volumes are reference-only, never solid or occluding in this game. Sensor interactions are separately specified below. Render meshes never serve as collision source.',
  gameplayInteractions: {
    source: 'games/signal-zero/src/core.js',
    solids: ['level.platforms', 'level.covers'],
    guardCapture: {requires:'tracking and unobstructed sight', absDeltaXBelow:.74, absDeltaYBelow:1.15},
    terminal: {absDeltaXBelow:1.4,absDeltaYBelow:.65,requires:'grounded and speed below 0.3 m/s; interact held 1.05 seconds'},
    packet: {absDeltaXBelow:1,absDeltaYBelow:1},
    exit: {absDeltaXBelow:1.6,absDeltaYBelow:.7,requires:'all chapter objectives'},
    ladder: {absDeltaXBelow:.75,yRange:'y0 - 0.12 through y1 + 0.12'},
  },
  models: {
    runner: { shape: 'box', size: [PHYSICS.radius * 2, PHYSICS.height, .6], center: [0, PHYSICS.height / 2, 0], crouchHeight: PHYSICS.crouchHeight, crouchCenter: [0, PHYSICS.crouchHeight / 2, 0], occluder: false, authoritative: true },
    guard: { shape: 'capsule-y', radius: .22, height: 1.65, center: [0, .825, 0], occluder: false },
    camera: { shape: 'box', size: [.74, .45, .30], center: [.015, 0, 0], occluder: false },
    drone: { shape: 'box', size: [.70, .26, .92], center: [0, 0, 0], occluder: false },
    laser: { shape: 'box', size: [.29, .75, .31], center: [0, .375, 0], occluder: false, emitter: [0, .7425, 0], direction: [0, 1, 0] },
    terminal: { shape: 'box', size: [.72, 1.40, .70], center: [0, .70, .05], occluder: false, referenceOnly: true },
    exit: { shape: 'compound', parts: [{ shape: 'box', size: [.20, 2.6, .38], center: [-.9, 1.3, 0] }, { shape: 'box', size: [.20, 2.6, .38], center: [.9, 1.3, 0] }, { shape: 'box', size: [2, .24, .38], center: [0, 2.48, 0] }], trigger: { shape: 'box', size: [1.6, 2.3, .8], center: [0, 1.15, 0] }, occluder: false },
    packet: { shape: 'sphere', radius: .35, center: [0, 0, 0], triggerOnly: true, occluder: false },
    cover: { shape: 'box', size: [2, 1.4, .8], center: [0, .7, 0], parameterized: { size: ['w', 'h', 'd'], center: [0, 'h/2', 0] }, occluder: true },
    ladder: { shape: 'box', size: [.8, 3, .5], center: [0, 1.5, 0], parameterized: { height: 'h', centerY: 'h/2' }, triggerOnly: true, occluder: false },
    platform: { shape: 'box', size: [4, .35, 1.4], center: [0, -.175, 0], parameterized: { size: ['w', 'h', 'd'], center: [0, '-h/2', 0] }, occluder: true, standingPlaneY: 0 },
    city: { shape: 'none', decorative: true, collidable: false, occluder: false, standingSurface: false, recommendedWorldZ: -5 },
    archive: { shape: 'none', decorative: true, collidable: false, occluder: false, standingSurface: false, recommendedWorldZ: -5 },
    core: { shape: 'none', decorative: true, collidable: false, occluder: false, standingSurface: false, recommendedWorldZ: -5 },
  },
};
await writeFile(resolve(runtime, 'data/colliders.json'), JSON.stringify(colliders, null, 2) + '\n');
const collisionBytes = await readFile(resolve(runtime, 'data/colliders.json'));
await writeFile(resolve(assets, 'sources/colliders.json'), collisionBytes);
const colliderHash = createHash('sha256').update(collisionBytes).digest('hex');

const priorManifest = await readFile(resolve(assets, 'manifest.json'), 'utf8').then(JSON.parse).catch(() => ({ assets: [] }));
const manifest = {
  schemaVersion: 1, gameId: 'signal-zero', version: ASSET_KIT_VERSION, createdAt: '2026-10-25',
  coordinateContract: { unit: 'meter', up: '+Y', forward: '+X', runnerHeight: 1.65, moduleGrid: .1 },
  runtimeStrategy: 'The game uses the identical source module games/signal-zero/src/models.js, copied into its fingerprinted runtime as models.js. GLB files are reusable derivative exports, not downloaded by normal gameplay. No runtime code depends on evidence/.',
  assets: priorManifest.assets.filter(a => a.kind === 'audio'),
};
const checks = [];
for (const [name, kind, create, pivot, maxInstances] of definitions) {
  const group = create(); group.updateMatrixWorld(true);
  group.traverse(o => { if (o.isSkinnedMesh) o.skeleton.update(); });
  const bounds = new THREE.Box3().setFromObject(group); let dimensions = bounds.getSize(new THREE.Vector3()).toArray().map(n => +n.toFixed(4));
  let triangles = 0; let drawCalls = 0; let bones = 0; const materials = new Set();
  group.traverse(o => { if (o.isMesh) { triangles += (o.geometry.index?.count ?? o.geometry.attributes.position.count) / 3; drawCalls += o.geometry.groups.length || 1; for (const m of Array.isArray(o.material) ? o.material : [o.material]) materials.add(m.name); } if (o.isBone) bones++; });
  const animationNames = group.animations.map(a => a.name);
  const clipMetadata = group.animations.map(a => ({ name: a.name, duration: +a.duration.toFixed(4), ...a.userData }));
  if (kind === 'environment') { assert.ok(drawCalls <= 8); assert.ok(triangles <= 4000); assert.ok(dimensions[0] <= 8 && dimensions[1] <= 8 && dimensions[2] <= 3); assert.equal(group.userData.standingSurface, false); }
  if (name === 'runner') {
    assert.equal(animationNames.length, 9); assert.ok(dimensions[1] > 1.6 && dimensions[1] < 1.7);
    assert.ok(bones >= 20); const thigh = group.getObjectByName('thigh-l'); const start = thigh.quaternion.clone();
    animateRunner(group, { animation: 'run', facing: 1 }, .1); animateRunner(group, { animation: 'run', facing: 1 }, .1);
    assert.ok(start.angleTo(thigh.quaternion) > .1, 'Runner clip actually changes bones');
    for (const animation of animationNames) { animateRunner(group, { animation, facing: -1 }, .05); assert.equal(group.userData.activeAnimation, animation); }
    group.userData.mixer.stopAllAction(); group.userData.skeleton.pose(); group.rotation.set(0, 0, 0);
  }
  if (kind === 'security') {
    for (const state of ['patrol', 'suspicious', 'search', 'chase']) animateSecurity(group, { state, disabled: false, dir: 1, time: 1 }, .016);
    animateSecurity(group, { disabled: true, dir: 1 }, .016);
    group.userData.mixer?.stopAllAction(); group.userData.skeleton?.pose();
    if (group.userData.moving) { group.userData.moving.position.set(0, 0, 0); group.userData.moving.rotation.set(0, 0, 0); }
    for (const rotor of group.userData.rotors ?? []) rotor.rotation.set(0, 0, 0);
    if (group.userData.indicator) { group.userData.indicator.color.setHex(0x71ffe2); group.userData.indicator.emissive.setHex(0x32eac8); group.userData.indicator.emissiveIntensity = 1.8; }
  }
  group.updateMatrixWorld(true);
  group.traverse(o => { if (o.isSkinnedMesh) { o.skeleton.update(); o.boundingBox = null; o.boundingSphere = null; } });
  bounds.setFromObject(group);
  dimensions = bounds.getSize(new THREE.Vector3()).toArray().map(n => +n.toFixed(4));
  // Exclude mixers/caches and live object references from glTF extras; preserve serializable asset identity.
  group.traverse(o => { o.userData = { assetId: `signal-zero.${kind}.${name}` }; });
  const exportBytes = await new GLTFExporter().parseAsync(group, { binary: true, animations: group.animations, onlyVisible: true });
  const binary = Buffer.from(exportBytes); const file = `models/${name}.glb`;
  await writeFile(resolve(runtime, file), binary);
  const glb = await new Promise((accept, reject) => new GLTFLoader().parse(exportBytes, '', accept, reject));
  assert.deepEqual(glb.animations.map(a => a.name), animationNames);
  let reloadedSkin = 0; glb.scene.traverse(o => { if (o.isSkinnedMesh) { reloadedSkin++; assert.ok(o.skeleton.bones.length >= 20); } });
  // glTF stores one primitive per material, so GLTFLoader creates several
  // SkinnedMeshes sharing the same exported skeleton from our one source mesh.
  if (name === 'runner' || name === 'guard') assert.equal(reloadedSkin, materials.size);
  const sha256 = createHash('sha256').update(binary).digest('hex');
  manifest.assets.push({
    id: `signal-zero.${kind}.${name}`, version: '1.0.0', kind: 'model', source: 'sources/procedural-models.js', sourceSha256: sourceHash,
    runtime: [file], sha256: { [file]: sha256 },
    provenance: { method: 'original-procedural', creator: 'Signal Zero asset maker', createdAt: '2026-10-25', tool: 'Three.js 0.180.0 + project procedural asset recipe', promptRecord: 'generation/model-brief.md', referenceSources: [], rights: 'Original project-authored geometry, rig, materials and animation. Reuse within and derivative from this project is permitted. Three.js code is MIT; see runtime vendor/THREE-LICENSE.txt.' },
    spec: { unit: 'meter', up: '+Y', forward: '+X', pivot, dimensions, bounds: { min: bounds.min.toArray().map(n => +n.toFixed(4)), max: bounds.max.toArray().map(n => +n.toFixed(4)) }, triangles, drawCalls, bones, collision: 'data/colliders.json#models/' + name, materialSlots: [...materials], lod: [{ level: 0, triangles, policy: 'Single low-polygon geometry LOD; reduce scene density/shadows/DPR externally. No sprite substitution.' }], textureColorSpace: {}, uv: 'Primitive UVs retained; all current PBR materials are untextured scalar materials.', animations: clipMetadata },
    budget: { runtimeBytes: binary.byteLength, maxSimultaneousInstances: maxInstances, instanceBudgetScope: 'Maximum resident instances in one authored full chapter, not visible-only. Platform count conservatively includes ground boxes; one regional environment type is present per chapter.' },
    reuse: { tags: [kind, 'industrial', 'mint-magenta', 'modular'], compatibleWith: ['signal-zero-kit-v1'] },
    dependencies: ['three@0.180.0'], derivatives: [file],
  });
  checks.push({ name, bytes: binary.byteLength, sha256, triangles, drawCalls, bones, animations: animationNames, glbReload: 'pass' });
}
manifest.assets.push({ id: 'signal-zero.data.colliders', version: '1.0.0', kind: 'collision-data', source: 'sources/colliders.json', runtime: ['data/colliders.json'], sha256: { 'data/colliders.json': colliderHash }, provenance: { method: 'original-procedural', creator: 'Signal Zero asset maker', createdAt: '2026-10-25', rights: 'Original project-authored independent collision data.' }, spec: { unit: 'meter', up: '+Y', forward: '+X', shapes: ['box', 'capsule-y', 'sphere', 'compound'] }, budget: { runtimeBytes: collisionBytes.byteLength }, dependencies: [], derivatives: [] });
await writeFile(resolve(assets, 'manifest.json'), JSON.stringify(manifest, null, 2) + '\n');
await writeFile(resolve(assets, 'generation/validation.json'), JSON.stringify({ generatedAt: new Date().toISOString(), sourceSha256: sourceHash, checks, result: 'pass', note: 'Asset integrity and animation structure validation only. This is not gameplay, device performance or independent Reviewer acceptance.' }, null, 2) + '\n');
console.log(JSON.stringify({ result: 'pass', models: checks.length, totalGLBBytes: checks.reduce((s, c) => s + c.bytes, 0), checks }, null, 2));
