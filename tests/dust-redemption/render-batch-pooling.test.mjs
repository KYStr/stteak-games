import test from "node:test";
import assert from "node:assert/strict";
import * as THREE from "../../public/games/dust-redemption/vendor/three.module.js";
import {
  BuildingBatches,
  FrameMeshSet,
} from "../../games/dust-redemption/render-batches.js";
test("frame membership clears logically while retaining one weak workspace", () => {
  const marks = new FrameMeshSet(),
    nodes = [{}, {}, {}],
    storage = marks.marks;
  for (let i = 0; i < 240; i++) {
    marks.clear();
    assert.equal(marks.has(nodes[i % 3]), false);
    marks.add(nodes[i % 3]);
    for (let j = 0; j < 3; j++) assert.equal(marks.has(nodes[j]), j === i % 3);
    assert.equal(marks.marks, storage);
  }
});
test("building pools preserve the active draw order, colour and transforms across changing faded subsets", () => {
  const parent = new THREE.Group(),
    building = new THREE.Group();
  parent.add(building);
  const sources = [0xff0000, 0x00ff00, 0x0000ff].map((color, i) => {
    const mesh = new THREE.Mesh(
      new THREE.BoxGeometry(1 + i, 2, 1),
      new THREE.MeshStandardMaterial({ color, roughness: 0.94, metalness: 0 }),
    );
    mesh.position.set(i * 2, 1, i);
    building.add(mesh);
    return mesh;
  });
  const batch = new BuildingBatches(THREE, [building], parent),
    camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
  camera.position.set(10, 10, 15);
  camera.lookAt(0, 0, 0);
  const hits = new FrameMeshSet(),
    storage = batch.faded[0].members,
    matrix = new THREE.Matrix4(),
    color = new THREE.Color();
  for (let frame = 0; frame < 240; frame++) {
    hits.clear();
    for (let i = 0; i < 3; i++) if ((frame + i) % 3 !== 0) hits.add(sources[i]);
    batch.sync(hits, camera);
    const faded = batch.faded[0];
    assert.equal(faded.members, storage);
    assert.equal(faded.mesh.count, 2);
    assert.equal(batch.opaque.mesh.count, 1);
    for (let i = 0; i < faded.count; i++) {
      const r = faded.members[i];
      assert.equal(hits.has(r.source), true);
      faded.mesh.getMatrixAt(i, matrix);
      const expected = new THREE.Matrix4().multiplyMatrices(
        faded.inverse,
        r.worldMatrix,
      );
      for (let j = 0; j < 16; j++)
        assert.ok(Math.abs(matrix.elements[j] - expected.elements[j]) < 1e-5);
      faded.mesh.getColorAt(i, color);
      assert.ok(
        Math.abs(color.r - r.color.r) +
          Math.abs(color.g - r.color.g) +
          Math.abs(color.b - r.color.b) <
          1e-5,
      );
      if (i) assert.ok(faded.members[i - 1].depth >= r.depth);
    }
    const version = faded.mesh.instanceMatrix.version;
    batch.sync(hits, camera);
    assert.equal(faded.mesh.instanceMatrix.version, version);
  }
  hits.clear();
  batch.sync(hits, camera);
  assert.equal(batch.faded[0].mesh.count, 0);
  assert.equal(batch.opaque.mesh.count, 3);
  hits.add(sources[0]);
  batch.sync(hits, camera);
  assert.equal(batch.faded[0].mesh.count, 1);
  assert.equal(batch.faded[0].members[0].source, sources[0]);
  batch.dispose();
  for (const source of sources) assert.equal(source.visible, true);
});
