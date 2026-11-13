// Diagnostic only: node tests/dust-redemption/heap-comparison.mjs before.heapsnapshot after.heapsnapshot output.json
import { readFile, writeFile } from "node:fs/promises";
import assert from "node:assert/strict";
const [beforePath, afterPath, output] = process.argv.slice(2);
assert.ok(beforePath && afterPath && output);
const categories = {
  World: /^(World)$/,
  controllers:
    /^(MissionSystem|WaterSystem|SignalSystem|LedgerSystem|NightSystem|PactSystem)$/,
  FieldSystem: /^FieldSystem$/,
  OnwardSystem: /^OnwardSystem$/,
  actors: /^(AnimationMixer|AnimationAction|Skeleton|SkinnedMesh|Bone)$/,
  meshes:
    /^(Mesh|InstancedMesh|Group|Object3D|BufferGeometry|BufferAttribute)$/,
  materials: /Material$/,
  textures: /Texture$/,
  detachedPanels:
    /Detached.*(HTML|Element)|^HTML(Div|Button|Canvas|Span)Element$/,
  ArrayBuffers: /ArrayBuffer|JSArrayBufferData/,
};
function readGraph(raw) {
  const nf = raw.snapshot.meta.node_fields,
    ef = raw.snapshot.meta.edge_fields;
  const ns = nf.length,
    es = ef.length,
    ni = Object.fromEntries(nf.map((n, i) => [n, i])),
    ei = Object.fromEntries(ef.map((n, i) => [n, i]));
  const types = raw.snapshot.meta.node_types[ni.type],
    edgeTypes = raw.snapshot.meta.edge_types[ei.type];
  const rows = [],
    ids = new Set(),
    summary = {};
  let edge = 0;
  for (let offset = 0; offset < raw.nodes.length; offset += ns) {
    const row = {
      offset,
      id: raw.nodes[offset + ni.id],
      name: raw.strings[raw.nodes[offset + ni.name]],
      type: types[raw.nodes[offset + ni.type]],
      bytes: raw.nodes[offset + ni.self_size],
      edge,
      edges: raw.nodes[offset + ni.edge_count],
      detachedness: raw.nodes[offset + ni.detachedness],
    };
    rows.push(row);
    ids.add(row.id);
    edge += row.edges * es;
    const key = `${row.type}:${row.name}`,
      aggregate = (summary[key] ??= { count: 0, bytes: 0 });
    aggregate.count++;
    aggregate.bytes += row.bytes;
  }
  return { raw, rows, ids, summary, ns, es, ei, edgeTypes };
}
const before = readGraph(JSON.parse(await readFile(beforePath, "utf8"))),
  after = readGraph(JSON.parse(await readFile(afterPath, "utf8")));
// Breadth-first owning paths from the V8 synthetic root, excluding weak edges.
const parents = new Int32Array(after.rows.length).fill(-1),
  links = new Array(after.rows.length);
const queue = new Uint32Array(after.rows.length);
let head = 0,
  tail = 1;
queue[0] = 0;
parents[0] = 0;
while (head < tail) {
  const index = queue[head++],
    row = after.rows[index];
  for (
    let edge = row.edge;
    edge < row.edge + row.edges * after.es;
    edge += after.es
  ) {
    const type = after.edgeTypes[after.raw.edges[edge + after.ei.type]];
    if (type === "weak") continue;
    const child = after.raw.edges[edge + after.ei.to_node] / after.ns;
    if (parents[child] !== -1) continue;
    parents[child] = index;
    const name = after.raw.edges[edge + after.ei.name_or_index];
    links[child] =
      type === "element" || type === "hidden"
        ? String(name)
        : after.raw.strings[name];
    queue[tail++] = child;
  }
}
function pathTo(index) {
  const result = [];
  for (let n = 0; n < 80 && index > 0 && parents[index] >= 0; n++) {
    result.push({
      owner: after.rows[parents[index]].name,
      property: links[index],
      target: after.rows[index].name,
    });
    index = parents[index];
  }
  return result.reverse();
}
const report = {
  before: beforePath,
  after: afterPath,
  categories: {},
  largestDeltas: [],
};
for (const [name, pattern] of Object.entries({
  ...categories,
  compiledCode: /^CODE_CATEGORY$/,
})) {
  const match = (row) =>
    name === "compiledCode"
      ? row.type === "code"
      : ["object", "native"].includes(row.type) &&
        pattern.test(row.name) &&
        (name !== "detachedPanels" ||
          row.detachedness === 2 ||
          row.name.startsWith("Detached"));
  const a = before.rows.filter(match),
    b = after.rows.filter(match);
  report.categories[name] = {
    before: { count: a.length, bytes: a.reduce((n, r) => n + r.bytes, 0) },
    after: { count: b.length, bytes: b.reduce((n, r) => n + r.bytes, 0) },
    newOwners: b
      .filter((r) => !before.ids.has(r.id))
      .slice(0, 3)
      .map((r) => ({
        id: r.id,
        name: r.name,
        bytes: r.bytes,
        retainingPath: pathTo(r.offset / after.ns),
      })),
  };
  report.categories[name].countDelta = b.length - a.length;
  report.categories[name].byteDelta =
    report.categories[name].after.bytes - report.categories[name].before.bytes;
}
for (const key of new Set([
  ...Object.keys(before.summary),
  ...Object.keys(after.summary),
])) {
  const a = before.summary[key] || { count: 0, bytes: 0 },
    b = after.summary[key] || { count: 0, bytes: 0 };
  report.largestDeltas.push({
    name: key,
    countDelta: b.count - a.count,
    byteDelta: b.bytes - a.bytes,
  });
}
report.largestDeltas.sort((a, b) => b.byteDelta - a.byteDelta);
report.largestDeltas.length = Math.min(80, report.largestDeltas.length);
await writeFile(output, JSON.stringify(report, null, 2));
console.log(JSON.stringify(report.categories, null, 2));
