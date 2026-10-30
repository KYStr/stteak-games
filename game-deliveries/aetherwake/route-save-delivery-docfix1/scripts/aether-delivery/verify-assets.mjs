// Current, read-only asset-structure check. Not the historical Windows verifier.
// Adapted from assets/games/aetherwake/recipes/verify-assets.mjs; no old logs needed.
import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import assert from 'node:assert/strict';
import { fileURLToPath, pathToFileURL } from 'node:url';

assert.equal(process.argv.length, 2, 'No arguments: run this copy from its source tree');
const root = fileURLToPath(new URL('../../', import.meta.url));
const at = (rel) => path.join(root, rel);
const sourceRoot = 'assets/games/aetherwake';
const runtimeRoot = 'public/games/aetherwake/assets';
function member(base, rel) {
  assert(typeof rel === 'string' && rel.length && !path.isAbsolute(rel));
  assert(!rel.includes('\\') && !rel.split('/').some(x => x === '..' || x === '' || x === '.'));
  return at(`${base}/${rel}`);
}
const { GLTFLoader } = await import(pathToFileURL(at('games/aetherwake/node_modules/three/examples/jsm/loaders/GLTFLoader.js')));
const { createPilot, createIsland, createWind } = await import(pathToFileURL(at('games/aetherwake/src/models.js')));
const manifest = JSON.parse(await fs.readFile(at(`${sourceRoot}/manifest.json`), 'utf8'));
const sha = bytes => crypto.createHash('sha256').update(bytes).digest('hex');
const seen = new Set();
const totals = { assets: manifest.entries.length, glb: 0, wav: 0, svg: 0, bytes: 0 };
for (const entry of manifest.entries) {
  await fs.access(member(sourceRoot, entry.source));
  for (const rel of entry.runtime) {
    assert(!seen.has(rel), `Duplicate runtime asset: ${rel}`); seen.add(rel);
    const bytes = await fs.readFile(member(runtimeRoot, rel));
    assert.equal(sha(bytes), entry.sha256[rel], `${rel} hash`);
    assert.equal(bytes.length, entry.budget.runtimeBytes, `${rel} bytes`);
    totals.bytes += bytes.length;
    if (rel.endsWith('.glb')) {
      const buffer = bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength);
      const gltf = await new GLTFLoader().parseAsync(buffer, '');
      let meshes = 0;
      gltf.scene.traverse(object => {
        if (!object.isMesh) return;
        meshes++;
        for (const name of ['position', 'normal', 'uv']) assert(object.geometry.attributes[name], `${rel} ${name}`);
        assert([...object.geometry.attributes.position.array].every(Number.isFinite), `${rel} finite vertices`);
      });
      assert(meshes > 0, `${rel} meshes`);
      if (rel === 'models/pilot.glb') {
        assert.deepEqual(gltf.animations.map(a => a.name), ['idle', 'run', 'jump', 'glide', 'land']);
        let bones = 0;
        gltf.scene.traverse(object => {
          if (object.isSkinnedMesh) { bones = object.skeleton.bones.length; assert(object.geometry.attributes.skinWeight); }
        });
        assert.equal(bones, 8);
      }
      totals.glb++;
    } else if (rel.endsWith('.wav')) {
      assert.equal(bytes.toString('ascii', 0, 4), 'RIFF');
      assert.equal(bytes.toString('ascii', 8, 12), 'WAVE');
      assert.equal(bytes.readUInt32LE(24), 22050);
      assert.equal(bytes.readUInt16LE(22), 1);
      assert.equal(bytes.readUInt16LE(34), 16);
      let peak = 0;
      for (let i = 44; i < bytes.length; i += 2) peak = Math.max(peak, Math.abs(bytes.readInt16LE(i)));
      assert(peak < 32767, `${rel} unclipped PCM`);
      if (entry.spec.loop) assert(Math.abs(bytes.readInt16LE(44) - bytes.readInt16LE(bytes.length - 2)) < 1000, `${rel} loop boundary`);
      totals.wav++;
    } else if (rel.endsWith('.svg')) {
      assert(bytes.toString().includes('viewBox="0 0 64 64"'), `${rel} viewBox`);
      totals.svg++;
    } else assert.fail(`Unsupported asset format: ${rel}`);
  }
}
const pilot = createPilot();
for (const name of ['idle', 'run', 'jump', 'glide', 'land']) {
  pilot.update(.2, { mode: name, speed: 8 });
  for (const bone of pilot.group.children[0].skeleton.bones) assert(bone.quaternion.toArray().every(Number.isFinite));
}
assert.equal(pilot.clips.length, 5);
for (let i = 0; i < 6; i++) {
  const island = createIsland({ radius: 15, index: i, region: Math.floor(i / 2) });
  assert.equal(island.userData.collider.radius, 15);
  assert.equal(island.children[0].levels.length, 2);
  assert.equal(island.children[0].levels[1].distance, 145);
}
for (const type of ['tailwind', 'updraft', 'crosswind']) {
  const effect = createWind(type); effect.userData.update(1 / 60);
  assert(effect.children[0].isInstancedMesh);
  assert([...effect.children[0].instanceMatrix.array].every(Number.isFinite));
}
for (const name of ['models.js', 'audio.js']) {
  assert.deepEqual(await fs.readFile(at(`${sourceRoot}/sources/${name}`)), await fs.readFile(at(`games/aetherwake/src/${name}`)), `${name} source snapshot`);
}
assert.deepEqual(await fs.readFile(at(`${sourceRoot}/recipes/export-assets.mjs`)), await fs.readFile(at('games/aetherwake/scripts/export-assets.mjs')), 'export recipe snapshot');
assert.equal(totals.bytes, manifest.totalRuntimeBytes);
assert.deepEqual([totals.assets, seen.size, totals.glb, totals.wav, totals.svg], [53, 53, 31, 10, 12]);
console.log(JSON.stringify({ status: 'PASS_SCOPED_ASSET_STRUCTURE', checkedAt: new Date().toISOString(), totals, writes: 0,
  historicalWindowsEnvironmentComparison: 'NOT_RUN: both historical logs were not delivered',
  limits: ['CPU geometry/format/hash/source checks only', 'No GPU rendering, real listening, browser or performance acceptance', 'Does not regenerate or alter historical asset-verification.json'] }, null, 2));
