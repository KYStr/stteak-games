const depthOrder = (a, b) => b.depth - a.depth || a.sequence - b.sequence;
const buildingDepthOrder = (a, b) =>
  b.depth - a.depth || a.source.id - b.source.id;
// Current-frame membership without allocating a fresh Set backing table on clear.
export class FrameMeshSet {
  constructor() {
    this.marks = new WeakMap();
    this.generation = 0;
  }
  clear() {
    this.generation++;
  }
  add(mesh) {
    this.marks.set(mesh, this.generation);
    return this;
  }
  has(mesh) {
    return this.marks.get(mesh) === this.generation;
  }
}
/** Render-only batching. Original scene meshes remain the collision/fade authority. */
export class BuildingBatches {
  constructor(THREE, buildings, parent) {
    this.THREE = THREE;
    this.parent = parent;
    this.records = [];
    this.buckets = [];
    this.disposed = false;
    parent.updateWorldMatrix(true, true);
    for (const [buildingIndex, building] of buildings.entries()) {
      for (const source of building.children) {
        const material = source.material;
        if (
          !source.isMesh ||
          source.geometry.type !== "BoxGeometry" ||
          Array.isArray(material) ||
          !(
            material.isMeshLambertMaterial ||
            (material.isMeshStandardMaterial &&
              material.roughness === 0.94 &&
              material.metalness === 0)
          ) ||
          material.emissive.getHex() !== 0 ||
          material.map ||
          material.normalMap ||
          material.roughnessMap ||
          material.metalnessMap ||
          material.alphaMap
        )
          throw new Error(
            "Building batch requires untextured authored boxes with diffuse or .94/0 physical materials",
          );
        const { width, height, depth } = source.geometry.parameters;
        this.records.push({
          source,
          buildingIndex,
          originalVisible: source.visible,
          worldMatrix: source.matrixWorld
            .clone()
            .multiply(new THREE.Matrix4().makeScale(width, height, depth)),
          color: material.color.clone(),
          center: new THREE.Vector3().setFromMatrixPosition(source.matrixWorld),
          depth: 0,
        });
      }
    }
    this.geometry = new THREE.BoxGeometry(1, 1, 1);
    this.opaqueMaterial = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.94,
      metalness: 0,
      side: THREE.DoubleSide,
      forceSinglePass: true,
    });
    this.fadedMaterial = this.opaqueMaterial.clone();
    this.fadedMaterial.transparent = true;
    this.fadedMaterial.opacity = 0.22;
    this.fadedMaterial.depthWrite = false;
    this.localMatrix = new THREE.Matrix4();
    this.projected = new THREE.Vector3();
    this.opaque = this.makeBucket(
      "building-opaque-batch",
      this.records,
      this.opaqueMaterial,
    );
    this.faded = buildings.map((_, index) =>
      this.makeBucket(
        `building-faded-batch-${index}`,
        this.records.filter((record) => record.buildingIndex === index),
        this.fadedMaterial,
      ),
    );
    for (const record of this.records) record.source.visible = false;
  }
  makeBucket(name, candidates, material) {
    const T = this.THREE;
    const mesh = new T.InstancedMesh(
      this.geometry,
      material,
      Math.max(1, candidates.length),
    );
    mesh.name = name;
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    mesh.instanceMatrix.setUsage(
      material.transparent ? T.DynamicDrawUsage : T.StaticDrawUsage,
    );
    mesh.count = 0;
    mesh.visible = false;
    // A faded batch sorts near its own building, not at the world origin.
    const worldBounds = new T.Box3();
    for (const record of candidates)
      worldBounds.union(new T.Box3().setFromObject(record.source));
    const center = worldBounds.getCenter(new T.Vector3());
    this.parent.worldToLocal(center);
    mesh.position.copy(center);
    this.parent.add(mesh);
    mesh.updateWorldMatrix(true, false);
    const inverse = mesh.matrixWorld.clone().invert();
    const bounds = new T.Box3();
    const unit = new T.Box3(
      new T.Vector3(-0.5, -0.5, -0.5),
      new T.Vector3(0.5, 0.5, 0.5),
    );
    for (const record of candidates)
      bounds.union(
        unit.clone().applyMatrix4(inverse.clone().multiply(record.worldMatrix)),
      );
    mesh.boundingBox = bounds;
    mesh.boundingSphere = bounds.getBoundingSphere(new T.Sphere());
    // Allocate colour once; subsequent frames only update existing storage.
    mesh.setColorAt(0, new T.Color(0xffffff));
    mesh.instanceColor.setUsage(T.DynamicDrawUsage);
    const bucket = {
      mesh,
      inverse,
      members: [],
      count: 0,
      sourceOrder: [],
      orderCount: 0,
      key: null,
    };
    this.buckets.push(bucket);
    return bucket;
  }
  sync(hits, camera) {
    if (this.disposed) throw new Error("Building batch has been disposed");
    for (let i = 0; i < this.buckets.length; i++) this.buckets[i].count = 0;
    camera.updateMatrixWorld();
    for (let i = 0; i < this.records.length; i++) {
      const record = this.records[i];
      if (hits.has(record.source)) {
        record.depth = this.projected.copy(record.center).project(camera).z;
        const bucket = this.faded[record.buildingIndex];
        bucket.members[bucket.count++] = record;
      } else this.opaque.members[this.opaque.count++] = record;
    }
    for (let i = 0; i < this.faded.length; i++) {
      const bucket = this.faded[i];
      // Sort the active prefix without trimming/refilling its backing store.
      for (let j = 1; j < bucket.count; j++) {
        const record = bucket.members[j];
        let k = j - 1;
        while (k >= 0 && buildingDepthOrder(bucket.members[k], record) > 0) {
          bucket.members[k + 1] = bucket.members[k];
          k--;
        }
        bucket.members[k + 1] = record;
      }
    }
    for (let i = 0; i < this.buckets.length; i++) {
      const bucket = this.buckets[i];
      const order = (bucket.sourceOrder ??= []);
      let changed = bucket.orderCount !== bucket.count;
      for (let i = 0; i < bucket.count && !changed; i++)
        if (order[i] !== bucket.members[i].source) changed = true;
      if (!changed) continue;
      bucket.orderCount = bucket.count;
      for (let i = 0; i < bucket.count; i++)
        order[i] = bucket.members[i].source;
      bucket.mesh.count = bucket.count;
      bucket.mesh.visible = bucket.count > 0;
      for (let index = 0; index < bucket.count; index++) {
        const record = bucket.members[index];
        this.localMatrix.multiplyMatrices(bucket.inverse, record.worldMatrix);
        bucket.mesh.setMatrixAt(index, this.localMatrix);
        bucket.mesh.setColorAt(index, record.color);
      }
      bucket.mesh.instanceMatrix.needsUpdate = true;
      bucket.mesh.instanceColor.needsUpdate = true;
    }
  }
  dispose() {
    if (this.disposed) return;
    this.disposed = true;
    for (const record of this.records)
      record.source.visible = record.originalVisible;
    for (const bucket of this.buckets) {
      bucket.mesh.removeFromParent();
      bucket.mesh.dispose();
    }
    this.geometry.dispose();
    this.opaqueMaterial.dispose();
    this.fadedMaterial.dispose();
    this.records.length = 0;
    this.buckets.length = 0;
  }
}

export class TracerBatch {
  constructor(THREE, parent, initialCapacity = 32) {
    this.THREE = THREE;
    this.effects = [];
    this.pool = [];
    this.ordered = [];
    this.capacity = 0;
    this.disposed = false;
    this.color = new THREE.Color();
    this.sequence = 0;
    this.camera = null;
    this.projected = new THREE.Vector3();
    this.bounds = new THREE.Box3();
    this.material = new THREE.LineBasicMaterial({
      color: 0xffffff,
      vertexColors: true,
      transparent: true,
      opacity: 1,
      // Preserve original LineBasicMaterial depth writing.
      depthWrite: true,
    });
    this.mesh = new THREE.LineSegments(
      new THREE.BufferGeometry(),
      this.material,
    );
    this.mesh.name = "tracer-batch";
    this.mesh.frustumCulled = false;
    this.mesh.visible = false;
    parent.add(this.mesh);
    this.ensureCapacity(initialCapacity);
  }
  ensureCapacity(required) {
    if (required <= this.capacity) return;
    let capacity = Math.max(1, this.capacity);
    while (capacity < required) capacity *= 2;
    const T = this.THREE,
      geometry = new T.BufferGeometry();
    geometry.setAttribute(
      "position",
      new T.BufferAttribute(new Float32Array(capacity * 6), 3).setUsage(
        T.DynamicDrawUsage,
      ),
    );
    geometry.setAttribute(
      "color",
      new T.BufferAttribute(new Float32Array(capacity * 8), 4).setUsage(
        T.DynamicDrawUsage,
      ),
    );
    geometry.setDrawRange(0, 0);
    const old = this.mesh.geometry;
    this.mesh.geometry = geometry;
    this.capacity = capacity;
    old.dispose();
  }
  add(a, b, color = 0xffd69a) {
    if (this.disposed) throw new Error("Tracer batch has been disposed");
    this.color.set(color);
    const effect = this.pool.pop() || {
      a: [0, 0, 0],
      b: [0, 0, 0],
      color: [0, 0, 0],
      time: 0,
      alpha: 0,
      sequence: 0,
      depth: 0,
    };
    effect.a[0] = a.x;
    effect.a[1] = a.y;
    effect.a[2] = a.z;
    effect.b[0] = b.x;
    effect.b[1] = b.y;
    effect.b[2] = b.z;
    effect.color[0] = this.color.r;
    effect.color[1] = this.color.g;
    effect.color[2] = this.color.b;
    effect.time = 0.1;
    effect.alpha = 0.85;
    effect.sequence = this.sequence++;
    effect.depth = 0;
    this.effects.push(effect);
    this.ensureCapacity(this.effects.length);
    this.upload();
  }
  update(dt, camera = this.camera) {
    this.camera = camera;
    if (!this.effects.length && !this.mesh.visible) return;
    let kept = 0;
    for (const effect of this.effects) {
      effect.time -= dt;
      effect.alpha = Math.max(0, effect.time * 8);
      if (effect.time > 0) this.effects[kept++] = effect;
      else this.pool.push(effect);
    }
    this.effects.length = kept;
    this.upload();
  }
  upload() {
    const geometry = this.mesh.geometry,
      p = geometry.attributes.position,
      c = geometry.attributes.color;
    // Three sorts each original Line by its bounding-sphere centre, then ID.
    // Match that order inside this batch; other transparent draws cannot be
    // interleaved between individual segments of a single draw.
    const ordered = this.ordered;
    ordered.length = this.effects.length;
    for (let i = 0; i < ordered.length; i++) ordered[i] = this.effects[i];
    if (this.camera) {
      this.camera.updateMatrixWorld();
      for (const effect of ordered)
        effect.depth = this.projected
          .set(
            (effect.a[0] + effect.b[0]) / 2,
            (effect.a[1] + effect.b[1]) / 2,
            (effect.a[2] + effect.b[2]) / 2,
          )
          .applyMatrix4(this.mesh.parent.matrixWorld)
          .project(this.camera).z;
      ordered.sort(depthOrder);
    }
    this.bounds.makeEmpty();
    for (let index = 0; index < ordered.length; index++) {
      const effect = ordered[index];
      p.array.set(effect.a, index * 6);
      p.array.set(effect.b, index * 6 + 3);
      const offset = index * 8;
      c.array[offset] = c.array[offset + 4] = effect.color[0];
      c.array[offset + 1] = c.array[offset + 5] = effect.color[1];
      c.array[offset + 2] = c.array[offset + 6] = effect.color[2];
      c.array[offset + 3] = c.array[offset + 7] = effect.alpha;
      this.bounds.expandByPoint(this.projected.fromArray(effect.a));
      this.bounds.expandByPoint(this.projected.fromArray(effect.b));
    }
    geometry.boundingSphere ||= new this.THREE.Sphere();
    this.bounds.getBoundingSphere(geometry.boundingSphere);
    p.needsUpdate = true;
    c.needsUpdate = true;
    geometry.setDrawRange(0, this.effects.length * 2);
    this.mesh.visible = this.effects.length > 0;
  }
  clear() {
    for (const effect of this.effects) this.pool.push(effect);
    this.effects.length = 0;
    this.upload();
  }
  dispose() {
    if (this.disposed) return;
    this.disposed = true;
    this.effects.length = 0;
    this.mesh.removeFromParent();
    this.mesh.geometry.dispose();
    this.material.dispose();
  }
}
