import test from "node:test";
import assert from "node:assert/strict";
import * as THREE from "../../public/games/dust-redemption/vendor/three.module.js";
import { FieldPropLibrary } from "../../games/dust-redemption/field-prop-library.js";
import { World } from "../../public/games/dust-redemption/world.js";
test("restarts reuse canonical meshes while all mechanism controls and materials remain independent", () => {
  const library = new FieldPropLibrary(THREE),
    first = library.create("medicine");
  const second = library.create("medicine");
  assert.equal(library.templates.size, 1);
  const a = [],
    b = [];
  first.traverse((n) => {
    if (n.isMesh) a.push(n);
  });
  second.traverse((n) => {
    if (n.isMesh) b.push(n);
  });
  assert.ok(a.length > 0);
  for (let i = 0; i < a.length; i++) {
    assert.equal(a[i].geometry, b[i].geometry);
    assert.notEqual(a[i].material, b[i].material);
    assert.deepEqual(
      a[i].geometry.attributes.position.array,
      b[i].geometry.attributes.position.array,
    );
    a[i].material.opacity = 0.1;
    assert.equal(b[i].material.opacity, 1);
    a[i].position.x += 3;
    assert.notEqual(a[i].position.x, b[i].position.x);
  }
  first.userData.dynamicParts.extra = { test: true };
  assert.equal(second.userData.dynamicParts.extra, undefined);
  const world = Object.create(World.prototype);
  world.fieldProps = library;
  let released = 0;
  for (const geometry of library.geometries)
    geometry.addEventListener("dispose", () => released++);
  world.disposeObjects([first, second]);
  assert.equal(
    released,
    0,
    "mission teardown cannot dispose library-owned collision meshes",
  );
  const count = library.geometries.size;
  library.dispose();
  assert.equal(
    released,
    count,
    "world shutdown releases every pooled mesh exactly once",
  );
  library.dispose();
  assert.equal(released, count);
});
