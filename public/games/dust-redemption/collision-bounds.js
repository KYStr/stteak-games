// Cached exact hierarchy bounds. Scalar matrix comparisons catch parent motion,
// child articulation and instance-buffer edits without allocating each update.
export function createBoundsTracker(THREE) {
  const cache = new WeakMap(),
    box = new THREE.Box3();
  return function bounds(object, id, kind = "prop") {
    object.updateWorldMatrix(true, true);
    let record = cache.get(object);
    if (!record || record.children !== object.children.length) {
      const nodes = [];
      object.traverse((node) => {
        nodes.push({
          node,
          children: node.children.length,
          geometry: node.geometry,
          matrix: new Float64Array(16).fill(NaN),
          version: -1,
        });
      });
      record = {
        children: object.children.length,
        nodes,
        result: {
          id,
          kind,
          vaultable: false,
          x: 0,
          z: 0,
          w: 0,
          h: 0,
          d: 0,
          min: {},
          max: {},
        },
      };
      cache.set(object, record);
    }
    let changed = false;
    for (let n = 0; n < record.nodes.length; n++) {
      const row = record.nodes[n],
        m = row.node.matrixWorld.elements,
        version = row.node.instanceMatrix?.version ?? 0;
      if (row.children !== row.node.children.length) {
        cache.delete(object);
        return bounds(object, id, kind);
      }
      if (row.geometry !== row.node.geometry) {
        row.geometry = row.node.geometry;
        changed = true;
      }
      if (row.version !== version) {
        row.version = version;
        changed = true;
      }
      for (let i = 0; i < 16; i++)
        if (row.matrix[i] !== m[i]) {
          row.matrix[i] = m[i];
          changed = true;
        }
    }
    const out = record.result;
    out.id = id;
    out.kind = kind;
    if (changed) {
      box.setFromObject(object);
      out.x = (box.min.x + box.max.x) / 2;
      out.z = (box.min.z + box.max.z) / 2;
      out.w = box.max.x - box.min.x;
      out.h = box.max.y - box.min.y;
      out.d = box.max.z - box.min.z;
      out.min.x = box.min.x;
      out.min.y = box.min.y;
      out.min.z = box.min.z;
      out.max.x = box.max.x;
      out.max.y = box.max.y;
      out.max.z = box.max.z;
    }
    return out;
  };
}
