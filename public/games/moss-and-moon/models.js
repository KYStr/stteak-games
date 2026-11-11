import * as THREE from "./vendor/three.module.js";

/** Moss & Moon original model kit 1.2.0. Metres; Y up; +Z forward; base-centre pivots.
 * Editable procedural source: every visible part is closed 3D geometry.
 * Shared meshes/materials are owned by this module, not by individual instances.
 */
export const ASSET_VERSION = "1.2.0";
export const PLANT_IDS = [
  "moss",
  "moonflower",
  "fern",
  "bluebell",
  "pumpkin",
  "starcap",
  "lavender",
  "lotus",
];
export const DECORATION_IDS = [
  "planter",
  "lantern",
  "bench",
  "arch",
  "birdbath",
  "windchime",
  "pond",
  "stones",
  "fence",
  "table",
  "moonstand",
  "garland",
];
export const DISCOVERY_IDS = [
  "dew",
  "snail",
  "seedwing",
  "leafprint",
  "shellspiral",
  "waterbeetle",
  "roundstone",
  "reed",
  "mica",
  "moth",
  "quartz",
  "lichen",
];
export const PALETTE = Object.freeze({
  moss: 0x769959,
  leaf: 0x507a4a,
  dark: 0x355744,
  cream: 0xf2e7c7,
  moon: 0xa6cbd2,
  blue: 0x7a9fbc,
  wood: 0x9e7854,
  bark: 0x665845,
  soil: 0x75604b,
  stone: 0x9daca3,
  gold: 0xe4bf72,
  pink: 0xd7a7b9,
  purple: 0xa4a1c6,
  water: 0x739da6,
});
const geometryCache = new Map();
const modelCache = new Map();
const colorCache = new Map();
const solidMaterial = new THREE.MeshLambertMaterial({
  name: "handmade-matte",
  color: 0xffffff,
  vertexColors: true,
  flatShading: true,
});
const glowMaterial = new THREE.MeshStandardMaterial({
  name: "warm-lantern-glass",
  color: 0xffe2a0,
  roughness: 0.38,
  metalness: 0.05,
  emissive: 0xf2bd69,
  emissiveIntensity: 0.4,
});
function color(c) {
  if (!colorCache.has(c)) colorCache.set(c, new THREE.Color(c));
  return colorCache.get(c);
}
function closedCap(widthSegments = 10, heightSegments = 6) {
  const g = new THREE.SphereGeometry(1, widthSegments, heightSegments),
    p = g.attributes.position;
  for (let i = 0; i < p.count; i++)
    if (p.getY(i) < 0) p.setY(i, p.getY(i) * 0.08);
  g.computeVertexNormals();
  return g;
}
// Grid objects can repeat 64 times in both main and shadow passes. Preserve each
// authored component and its extent while lowering only its surface subdivision.
function matchPrimitiveBounds(g, reference) {
  g.computeBoundingBox();
  reference.computeBoundingBox();
  const scale = reference.boundingBox
    .getSize(new THREE.Vector3())
    .divide(g.boundingBox.getSize(new THREE.Vector3()));
  g.scale(scale.x, scale.y, scale.z);
  g.computeBoundingBox();
  return g;
}
function gable() {
  const s = new THREE.Shape();
  s.moveTo(-0.5, 0);
  s.lineTo(0.5, 0);
  s.lineTo(0, 1);
  s.closePath();
  const g = new THREE.ExtrudeGeometry(s, { depth: 1, bevelEnabled: false });
  g.translate(0, 0, -0.5);
  return g;
}
// Preserve authored bounds while using twenty-face rounded parts at diorama scale.
function roundedPrimitive() {
  const reference = new THREE.IcosahedronGeometry(1, 1);
  const result = matchPrimitiveBounds(
    new THREE.IcosahedronGeometry(1, 0),
    reference,
  );
  reference.dispose();
  return result;
}
function geometry(kind) {
  if (!geometryCache.has(kind)) {
    const g =
      kind === "grid-sphere"
        ? matchPrimitiveBounds(
            new THREE.IcosahedronGeometry(1, 0),
            geometry("sphere"),
          )
        : kind === "grid-leaf"
          ? new THREE.OctahedronGeometry(1, 0)
          : kind === "grid-cap"
            ? matchPrimitiveBounds(closedCap(8, 4), geometry("hemisphere"))
            : kind === "sphere"
              ? roundedPrimitive()
              : kind === "pebble"
                ? new THREE.IcosahedronGeometry(1, 0)
                : kind === "box"
                  ? new THREE.BoxGeometry(1, 1, 1)
                  : kind === "cylinder"
                    ? new THREE.CylinderGeometry(1, 1, 1, 8)
                    : kind === "hex-cylinder"
                      ? new THREE.CylinderGeometry(1, 1, 1, 6)
                      : kind === "cone"
                        ? new THREE.ConeGeometry(1, 1, 8)
                        : kind === "hex-cone"
                          ? new THREE.ConeGeometry(1, 1, 6)
                          : kind === "torus"
                            ? new THREE.TorusGeometry(1, 0.13, 5, 16)
                            : kind === "hemisphere"
                              ? closedCap()
                              : kind === "gable"
                                ? gable()
                                : new THREE.CylinderGeometry(0.68, 1, 1, 10);
    geometryCache.set(kind, g);
  }
  return geometryCache.get(kind);
}
function part(
  group,
  kind,
  c,
  p = [0, 0, 0],
  s = [1, 1, 1],
  r = [0, 0, 0],
  bone = 0,
) {
  if (group.userData.gridPlaceable) {
    if (kind === "sphere") kind = "grid-sphere";
    else if (kind === "hemisphere") kind = "grid-cap";
  }
  const mesh = new THREE.Mesh(geometry(kind));
  mesh.position.set(...p);
  mesh.scale.set(...s);
  mesh.rotation.set(...r);
  mesh.userData.paint = c;
  mesh.userData.bone = bone;
  group.add(mesh);
  return mesh;
}
function ball(g, c, p, s, r, b) {
  return part(g, "sphere", c, p, s, r, b);
}
function box(g, c, p, s, r, b) {
  return part(g, "box", c, p, s, r, b);
}
function rod(g, c, a, b, width = 0.03, bone = 0) {
  const dir = new THREE.Vector3()
    .fromArray(b)
    .sub(new THREE.Vector3().fromArray(a));
  const m = part(
    g,
    "cylinder",
    c,
    new THREE.Vector3()
      .fromArray(a)
      .add(new THREE.Vector3().fromArray(b))
      .multiplyScalar(0.5)
      .toArray(),
    [width, dir.length(), width],
    [0, 0, 0],
    bone,
  );
  m.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir.normalize());
  return m;
}
function leaf(g, c, x, y, z, angle = 0, size = 0.19) {
  return part(
    g,
    g.userData.gridPlaceable ? "grid-leaf" : "sphere",
    c,
    [x, y, z],
    [size, 0.035, size * 0.45],
    [0.3, angle, 0.3],
  );
}
function petals(g, c, center, radius = 0.14, count = 5) {
  for (let k = 0; k < count; k++) {
    const a = (k * Math.PI * 2) / count;
    ball(
      g,
      c,
      [
        center[0] + Math.cos(a) * radius * 0.65,
        center[1],
        center[2] + Math.sin(a) * radius * 0.65,
      ],
      [radius, 0.045, radius * 0.48],
      [0, -a, 0],
    );
  }
  ball(
    g,
    PALETTE.gold,
    [center[0], center[1] + 0.025, center[2]],
    [radius * 0.3, 0.035, radius * 0.3],
  );
}
/** Collapse procedural primitives into one vertex-coloured mesh. A single material
 * keeps 64 garden tiles inexpensive while preserving real geometry and normals. */
function mergedGeometry(group, skinned = false) {
  group.updateMatrixWorld(true);
  const pos = [],
    norm = [],
    col = [],
    uv = [],
    skinIndex = [],
    skinWeight = [];
  group.traverse((mesh) => {
    if (!mesh.isMesh) return;
    let g = mesh.geometry.index
      ? mesh.geometry.toNonIndexed()
      : mesh.geometry.clone();
    g.applyMatrix4(mesh.matrixWorld);
    const p = g.attributes.position,
      n = g.attributes.normal,
      u = g.attributes.uv,
      c = color(mesh.userData.paint || PALETTE.cream);
    for (let i = 0; i < p.count; i++) {
      pos.push(p.getX(i), p.getY(i), p.getZ(i));
      norm.push(n.getX(i), n.getY(i), n.getZ(i));
      col.push(c.r, c.g, c.b);
      uv.push(u ? u.getX(i) : 0, u ? u.getY(i) : 0);
      if (skinned) {
        skinIndex.push(mesh.userData.bone || 0, 0, 0, 0);
        skinWeight.push(1, 0, 0, 0);
      }
    }
    g.dispose();
  });
  const g = new THREE.BufferGeometry();
  g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
  g.setAttribute("normal", new THREE.Float32BufferAttribute(norm, 3));
  g.setAttribute("color", new THREE.Float32BufferAttribute(col, 3));
  g.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));
  if (skinned) {
    g.setAttribute("skinIndex", new THREE.Uint16BufferAttribute(skinIndex, 4));
    g.setAttribute(
      "skinWeight",
      new THREE.Float32BufferAttribute(skinWeight, 4),
    );
  }
  g.computeBoundingBox();
  g.computeBoundingSphere();
  return g;
}
function staticModel(id, builder, collider, extra = {}) {
  if (!modelCache.has(id)) {
    const raw = new THREE.Group();
    raw.userData.gridPlaceable =
      id.startsWith("plant-") || id.startsWith("decoration-");
    builder(raw);
    modelCache.set(id, mergedGeometry(raw));
  }
  const group = new THREE.Group();
  group.name = id;
  const mesh = new THREE.Mesh(modelCache.get(id), solidMaterial);
  mesh.name = id + "-visual";
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  group.add(mesh);
  group.userData = {
    assetId: "moss-and-moon." + id,
    version: ASSET_VERSION,
    collider: structuredClone(collider),
    ...extra,
  };
  return group;
}
const cylinderCollider = (radius, height) => ({
  type: "cylinder",
  radius,
  height,
  center: [0, height / 2, 0],
});
const boxCollider = (x, y, z) => ({
  type: "box",
  size: [x, y, z],
  center: [0, y / 2, 0],
});

export function createPlant(id = "moss", stage = 3) {
  if (!PLANT_IDS.includes(id)) throw new Error("Unknown plant: " + id);
  stage = Math.max(0, Math.min(3, Math.floor(stage)));
  const h = [0.13, 0.28, 0.5, 0.72][stage];
  return staticModel(
    "plant-" + id + "-" + stage,
    (g) => {
      // Pebbly seed collar is visible in every state, clarifying occupied garden tiles.
      part(g, "cylinder", PALETTE.soil, [0, 0.025, 0], [0.16, 0.05, 0.16]);
      if (stage === 0) {
        const seedColour = {
          moss: PALETTE.moss,
          moonflower: PALETTE.cream,
          fern: PALETTE.dark,
          bluebell: PALETTE.blue,
          pumpkin: PALETTE.gold,
          starcap: PALETTE.purple,
          lavender: PALETTE.purple,
          lotus: PALETTE.pink,
        }[id];
        ball(
          g,
          seedColour,
          [0, 0.075, 0],
          [id === "pumpkin" ? 0.065 : 0.045, 0.045, 0.035],
        );
        if (id === "moss") {
          for (let k = 0; k < 4; k++) {
            const a = k * 1.57;
            ball(
              g,
              PALETTE.moss,
              [Math.cos(a) * 0.055, 0.075, Math.sin(a) * 0.055],
              [0.038, 0.03, 0.035],
            );
          }
        } else if (id === "starcap") {
          for (let k = 0; k < 3; k++) {
            const a = k * 2.1;
            ball(
              g,
              PALETTE.cream,
              [Math.cos(a) * 0.045, 0.08, Math.sin(a) * 0.045],
              [0.018, 0.04, 0.018],
            );
          }
        } else {
          const count = id === "fern" || id === "lavender" ? 3 : 2;
          for (let k = 0; k < count; k++) {
            const a = (k * Math.PI * 2) / count + 0.2;
            const size =
              id === "lotus"
                ? 0.09
                : id === "lavender"
                  ? 0.055
                  : id === "fern"
                    ? 0.065
                    : 0.075;
            leaf(
              g,
              k % 2 ? PALETTE.leaf : PALETTE.moss,
              Math.cos(a) * 0.045,
              0.085 + k * 0.012,
              Math.sin(a) * 0.045,
              a,
              size,
            );
          }
        }
        return;
      }
      const young = stage === 1,
        full = stage === 3,
        scale = young ? 0.58 : stage === 2 ? 0.8 : 1;
      if (id === "moss") {
        for (let k = 0; k < (young ? 3 : full ? 8 : 5); k++) {
          const a = k * 2.399,
            r = young ? 0.07 : 0.12 + (k % 2) * 0.05;
          ball(
            g,
            k % 2 ? PALETTE.moss : PALETTE.leaf,
            [Math.cos(a) * r, 0.075 + (k % 3) * 0.025, Math.sin(a) * r],
            [0.12, 0.09, 0.1],
          );
        }
        if (!young)
          for (let k = 0; k < (full ? 5 : 2); k++) {
            const a = k * 2.4;
            rod(
              g,
              PALETTE.leaf,
              [Math.cos(a) * 0.15, 0.08, Math.sin(a) * 0.15],
              [Math.cos(a) * 0.17, 0.3 + (k % 2) * 0.09, Math.sin(a) * 0.17],
              0.009,
            );
            ball(
              g,
              full ? PALETTE.gold : PALETTE.moss,
              [Math.cos(a) * 0.17, 0.31 + (k % 2) * 0.09, Math.sin(a) * 0.17],
              [0.025, 0.04, 0.025],
            );
          }
      } else if (id === "fern") {
        for (let k = 0; k < (young ? 3 : full ? 7 : 5); k++) {
          const a = k * 2.399;
          const end = [
            Math.cos(a) * 0.3 * scale,
            0.44 * scale,
            Math.sin(a) * 0.3 * scale,
          ];
          rod(g, PALETTE.dark, [0, 0.04, 0], end, 0.013);
          for (let j = 1; j < 5; j++) {
            const t = j / 5;
            for (const side of [-1, 1]) {
              leaf(
                g,
                k % 2 ? PALETTE.moss : PALETTE.leaf,
                end[0] * t + Math.cos(a + 1.57) * side * 0.085 * scale,
                end[1] * t + 0.025,
                end[2] * t + Math.sin(a + 1.57) * side * 0.085 * scale,
                a + side * 0.7,
                (0.13 - j * 0.015) * scale,
              );
            }
          }
        }
      } else if (id === "starcap") {
        for (let k = 0; k < (young ? 1 : full ? 4 : 2); k++) {
          const a = k * 2.399,
            r = k ? 0.19 : 0;
          const x = Math.cos(a) * r,
            z = Math.sin(a) * r,
            y = (0.25 + (k % 2) * 0.12) * scale;
          rod(g, PALETTE.cream, [x, 0.04, z], [x, y, z], 0.035);
          part(
            g,
            "hemisphere",
            k % 2 ? PALETTE.purple : PALETTE.blue,
            [x, y, z],
            [0.15 * scale, 0.095 * scale, 0.15 * scale],
          );
          if (full)
            for (let j = 0; j < 4; j++) {
              const t = j * 1.57;
              ball(
                g,
                PALETTE.cream,
                [x + Math.cos(t) * 0.075, y + 0.07, z + Math.sin(t) * 0.075],
                [0.018, 0.012, 0.018],
              );
            }
        }
      } else if (id === "pumpkin") {
        for (let k = 0; k < (young ? 3 : 5); k++) {
          const a = k * 1.256;
          leaf(
            g,
            k % 2 ? PALETTE.leaf : PALETTE.moss,
            Math.cos(a) * 0.18 * scale,
            0.08,
            Math.sin(a) * 0.18 * scale,
            a,
            0.17 * scale,
          );
        }
        rod(g, PALETTE.dark, [0, 0.06, 0], [0.03, 0.22 * scale, 0.02], 0.02);
        if (full) {
          for (let k = 0; k < 8; k++) {
            const a = (k * Math.PI) / 4;
            ball(
              g,
              k % 2 ? 0xd1aa64 : 0xe3bd77,
              [Math.cos(a) * 0.11, 0.2, Math.sin(a) * 0.11],
              [0.105, 0.16, 0.105],
            );
          }
          rod(g, PALETTE.wood, [0, 0.31, 0], [0.025, 0.4, 0.01], 0.03);
        } else if (!young) petals(g, PALETTE.gold, [0, 0.23, 0], 0.075);
      } else if (id === "lotus") {
        for (let k = 0; k < (young ? 2 : 3); k++) {
          const a = k * 2.1;
          ball(
            g,
            PALETTE.moss,
            [Math.cos(a) * 0.14, 0.06, Math.sin(a) * 0.14],
            [0.19 * scale, 0.028, 0.16 * scale],
            [0, a, 0],
          );
        }
        rod(g, PALETTE.leaf, [0, 0.05, 0], [0, 0.42 * scale, 0], 0.018);
        if (full) {
          for (let tier = 0; tier < 2; tier++)
            for (let k = 0; k < 7; k++) {
              const a = (k * Math.PI * 2) / 7 + tier * 0.4;
              ball(
                g,
                tier ? PALETTE.cream : PALETTE.pink,
                [
                  Math.cos(a) * (0.1 - tier * 0.03),
                  0.42 + tier * 0.025,
                  Math.sin(a) * (0.1 - tier * 0.03),
                ],
                [0.085, 0.11, 0.035],
                [0.4, -a, Math.cos(a) * 0.45],
              );
            }
          ball(g, PALETTE.gold, [0, 0.45, 0], [0.04, 0.025, 0.04]);
        } else
          ball(g, PALETTE.pink, [0, 0.42 * scale, 0], [0.045, 0.075, 0.045]);
      } else {
        const count =
          id === "lavender"
            ? young
              ? 2
              : full
                ? 6
                : 4
            : id === "bluebell"
              ? young
                ? 1
                : full
                  ? 4
                  : 2
              : young
                ? 1
                : full
                  ? 3
                  : 2;
        for (let k = 0; k < count; k++) {
          const a = k * 2.399,
            r = k ? 0.11 : 0;
          const x = Math.cos(a) * r,
            z = Math.sin(a) * r,
            y = (id === "lavender" ? 0.55 : 0.48) + (k % 2) * 0.12;
          rod(
            g,
            PALETTE.leaf,
            [x * 0.5, 0.035, z * 0.5],
            [x, y * scale, z],
            0.014,
          );
          for (let t = 0; t < 2; t++)
            leaf(
              g,
              PALETTE.moss,
              x + (t ? -0.075 : 0.075),
              (0.14 + t * 0.13) * scale,
              z,
              a + t * 1.6,
              0.12 * scale,
            );
          if (id === "lavender") {
            for (let j = 0; j < (full ? 4 : young ? 1 : 2); j++) {
              const yy = (y - 0.1 + j * 0.05) * scale;
              ball(
                g,
                j % 2 ? PALETTE.purple : 0x8d94b7,
                [x, yy, z],
                [0.05 * scale, 0.045, 0.05 * scale],
              );
            }
          } else if (id === "bluebell") {
            rod(
              g,
              PALETTE.leaf,
              [x, y * scale, z],
              [x + 0.07, (y - 0.025) * scale, z],
              0.012,
            );
            part(
              g,
              "cone",
              full ? PALETTE.blue : PALETTE.moss,
              [x + 0.07, (y - 0.055) * scale, z],
              [0.07 * scale, 0.12 * scale, 0.07 * scale],
              [0, 0, Math.PI],
            );
            if (full)
              ball(
                g,
                PALETTE.cream,
                [x + 0.07, (y - 0.1) * scale, z],
                [0.055, 0.015, 0.055],
              );
          } else if (full) petals(g, PALETTE.cream, [x, y, z], 0.115, 6);
          else
            ball(
              g,
              young ? PALETTE.moss : PALETTE.cream,
              [x, y * scale, z],
              [0.04, 0.07, 0.04],
            );
        }
      }
    },
    cylinderCollider(0.3, h),
    {
      plantId: id,
      stage,
      lod: "shared closed 3D geometry; 20-triangle rounded parts, 8-triangle leaves, 48-triangle mushroom caps; all authored components retained",
    },
  );
}

function quat(axis, angle) {
  return new THREE.Quaternion()
    .setFromAxisAngle(new THREE.Vector3(...axis), angle)
    .toArray();
}
function rotationTrack(name, times, angles, axis = [1, 0, 0]) {
  return new THREE.QuaternionKeyframeTrack(
    name + ".quaternion",
    times,
    angles.flatMap((a) => quat(axis, a)),
  );
}
function makeClips() {
  return [
    new THREE.AnimationClip("idle", 3, [
      rotationTrack("torso", [0, 1.5, 3], [0, 0.018, 0]),
      rotationTrack("head", [0, 1.5, 3], [-0.025, 0.025, -0.025], [0, 1, 0]),
    ]),
    new THREE.AnimationClip("walk", 0.7, [
      rotationTrack("leg-left", [0, 0.35, 0.7], [-0.45, 0.45, -0.45]),
      rotationTrack("leg-right", [0, 0.35, 0.7], [0.45, -0.45, 0.45]),
      rotationTrack("arm-left", [0, 0.35, 0.7], [0.25, -0.25, 0.25]),
      rotationTrack("arm-right", [0, 0.35, 0.7], [-0.25, 0.25, -0.25]),
    ]),
    new THREE.AnimationClip("plant", 1.2, [
      rotationTrack("torso", [0, 0.4, 0.85, 1.2], [0, 0.65, 0.65, 0]),
      rotationTrack("arm-right", [0, 0.4, 0.85, 1.2], [0, -0.7, -1, 0]),
    ]),
    new THREE.AnimationClip("water", 1.4, [
      rotationTrack("arm-right", [0, 0.35, 1.05, 1.4], [0, -1.1, -1.1, 0]),
      rotationTrack("head", [0, 0.35, 1.05, 1.4], [0, 0.25, 0.25, 0]),
    ]),
    new THREE.AnimationClip("harvest", 1.3, [
      rotationTrack("torso", [0, 0.35, 0.8, 1.3], [0, 0.5, 0.15, 0]),
      rotationTrack("arm-left", [0, 0.35, 0.8, 1.3], [0, -0.65, -1.2, 0]),
      rotationTrack("arm-right", [0, 0.35, 0.8, 1.3], [0, -0.65, -1.2, 0]),
    ]),
    new THREE.AnimationClip("celebrate", 1.8, [
      rotationTrack(
        "arm-left",
        [0, 0.4, 0.9, 1.4, 1.8],
        [0, 2.4, 2.2, 2.4, 0],
        [0, 0, 1],
      ),
      rotationTrack(
        "arm-right",
        [0, 0.4, 0.9, 1.4, 1.8],
        [0, -2.4, -2.2, -2.4, 0],
        [0, 0, 1],
      ),
      rotationTrack(
        "head",
        [0, 0.4, 0.9, 1.4, 1.8],
        [0, -0.15, 0.15, -0.15, 0],
        [0, 1, 0],
      ),
    ]),
    new THREE.AnimationClip("interact", 1.4, [
      rotationTrack(
        "arm-right",
        [0, 0.3, 0.65, 1, 1.4],
        [0, -1.7, -1.9, -1.7, 0],
        [0, 0, 1],
      ),
      rotationTrack("head", [0, 0.5, 1.4], [0, 0.12, 0]),
    ]),
  ];
}
export function createCharacter(index = 0) {
  index = Math.max(0, Math.min(6, Math.floor(index)));
  const id = index ? "resident-" + index : "gardener";
  if (!modelCache.has(id)) {
    const g = new THREE.Group(),
      cloth = [
        PALETTE.moss,
        PALETTE.blue,
        PALETTE.pink,
        PALETTE.gold,
        PALETTE.purple,
        PALETTE.cream,
        0x9bb6a4,
      ][index],
      skin = [
        0xe8c69c, 0xb78764, 0xe2b994, 0xcca47d, 0xf0ceb0, 0x9b7459, 0xe5bb94,
      ][index],
      hair = [
        0x675744, 0x514b42, 0x806551, 0xaaa99a, 0x4b5147, 0xd0c6aa, 0x785648,
      ][index];
    // Bone 0 root, 1 hips, 2 torso, 3 head, 4/5 arms, 6/7 legs.
    ball(g, cloth, [0, 0.68, 0], [0.205, 0.285, 0.14], [0, 0, 0], 2);
    part(g, "cone", cloth, [0, 0.52, 0], [0.23, 0.28, 0.17], [0, 0, 0], 1);
    box(g, PALETTE.cream, [0, 0.66, 0.13], [0.23, 0.26, 0.025], [0, 0, 0], 2);
    box(g, PALETTE.wood, [0, 0.56, 0.155], [0.11, 0.08, 0.025], [0, 0, 0], 2);
    ball(g, skin, [0, 1.03, 0], [0.205, 0.215, 0.18], [0, 0, 0], 3);
    ball(g, hair, [0, 1.12, -0.035], [0.211, 0.15, 0.173], [0, 0, 0], 3);
    ball(g, skin, [-0.2, 1.02, 0], [0.035, 0.06, 0.035], [0, 0, 0], 3);
    ball(g, skin, [0.2, 1.02, 0], [0.035, 0.06, 0.035], [0, 0, 0], 3);
    for (const sign of [-1, 1]) {
      const bone = sign < 0 ? 4 : 5;
      ball(
        g,
        cloth,
        [sign * 0.255, 0.73, 0],
        [0.075, 0.17, 0.075],
        [0, 0, sign * 0.12],
        bone,
      );
      ball(
        g,
        skin,
        [sign * 0.275, 0.56, 0.015],
        [0.058, 0.066, 0.058],
        [0, 0, 0],
        bone,
      );
      ball(
        g,
        PALETTE.dark,
        [sign * 0.09, 0.29, 0],
        [0.075, 0.18, 0.08],
        [0, 0, 0],
        sign < 0 ? 6 : 7,
      );
      ball(
        g,
        PALETTE.bark,
        [sign * 0.095, 0.09, 0.04],
        [0.085, 0.085, 0.13],
        [0, 0, 0],
        sign < 0 ? 6 : 7,
      );
      ball(
        g,
        0x35463f,
        [sign * 0.069, 1.04, 0.165],
        [0.018, 0.026, 0.012],
        [0, 0, 0],
        3,
      );
      ball(
        g,
        0xd7a197,
        [sign * 0.12, 0.995, 0.153],
        [0.032, 0.018, 0.012],
        [0, 0, 0],
        3,
      );
    }
    ball(g, skin, [0, 1, 0.183], [0.025, 0.025, 0.035], [0, 0, 0], 3);
    box(g, 0x8c6555, [0, 0.96, 0.169], [0.045, 0.012, 0.009], [0, 0, 0], 3);
    if (index === 0 || index === 3) {
      part(
        g,
        "cylinder",
        PALETTE.cream,
        [0, 1.22, 0],
        [0.3, 0.045, 0.26],
        [0, 0, 0],
        3,
      );
      part(
        g,
        "cone",
        PALETTE.cream,
        [0, 1.3, 0],
        [0.2, 0.2, 0.18],
        [0, 0, 0],
        3,
      );
      part(
        g,
        "cylinder",
        cloth,
        [0, 1.25, 0],
        [0.205, 0.04, 0.185],
        [0, 0, 0],
        3,
      );
      leaf(g, PALETTE.leaf, 0.18, 1.26, 0.1, 0.4, 0.1).userData.bone = 3;
    } else if (index === 1) {
      part(g, "cone", cloth, [0, 1.3, 0], [0.22, 0.26, 0.2], [0, 0, 0.15], 3);
      ball(g, PALETTE.gold, [0.03, 1.43, 0], [0.05, 0.05, 0.05], [0, 0, 0], 3);
    } else if (index === 2) {
      ball(g, hair, [-0.2, 1.06, -0.05], [0.09, 0.18, 0.09], [0, 0, 0.2], 3);
      ball(g, hair, [0.2, 1.06, -0.05], [0.09, 0.18, 0.09], [0, 0, -0.2], 3);
      petals(g, PALETTE.cream, [0.15, 1.23, 0.06], 0.055, 5);
      for (const m of g.children.slice(-6)) m.userData.bone = 3;
    } else if (index === 4) {
      part(
        g,
        "torus",
        PALETTE.gold,
        [-0.075, 1.05, 0.18],
        [0.045, 0.045, 0.045],
        [0, 0, 0],
        3,
      );
      part(
        g,
        "torus",
        PALETTE.gold,
        [0.075, 1.05, 0.18],
        [0.045, 0.045, 0.045],
        [0, 0, 0],
        3,
      );
      box(g, PALETTE.gold, [0, 1.05, 0.18], [0.07, 0.009, 0.009], [0, 0, 0], 3);
    } else if (index === 5) {
      ball(g, hair, [0, 0.94, 0.11], [0.15, 0.13, 0.09], [0, 0, 0], 3);
    } else if (index === 6) {
      part(
        g,
        "cylinder",
        PALETTE.moss,
        [0, 1.22, 0],
        [0.24, 0.055, 0.21],
        [0, 0, 0],
        3,
      );
    }
    modelCache.set(id, mergedGeometry(g, true));
  }
  const group = new THREE.Group();
  group.name = id;
  const bones = Array.from({ length: 8 }, () => new THREE.Bone());
  [
    "root",
    "hips",
    "torso",
    "head",
    "arm-left",
    "arm-right",
    "leg-left",
    "leg-right",
  ].forEach((n, i) => (bones[i].name = n));
  bones[0].add(bones[1]);
  bones[1].position.y = 0.5;
  bones[1].add(bones[2], bones[6], bones[7]);
  bones[2].position.y = 0.15;
  bones[2].add(bones[3], bones[4], bones[5]);
  bones[3].position.y = 0.25;
  bones[4].position.set(-0.23, 0.14, 0);
  bones[5].position.set(0.23, 0.14, 0);
  bones[6].position.set(-0.09, -0.03, 0);
  bones[7].position.set(0.09, -0.03, 0);
  const mesh = new THREE.SkinnedMesh(modelCache.get(id), solidMaterial);
  mesh.name = id + "-skin";
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  mesh.add(bones[0]);
  mesh.bind(new THREE.Skeleton(bones));
  group.add(mesh);
  group.animations = makeClips().filter(
    (clip) => index === 0 || clip.name === "idle" || clip.name === "interact",
  );
  group.userData = {
    assetId: "moss-and-moon." + id,
    version: ASSET_VERSION,
    characterIndex: index,
    collider: cylinderCollider(0.23, 1.45),
    clipNames: group.animations.map((c) => c.name),
    skeleton: {
      bones: bones.map((b) => b.name),
      rootMotion: false,
      retarget: "moss-humanoid-v1",
      bindPose: "standing, arms down, +Z forward",
    },
    animationEvents: {
      plant: [0.85, "commit-visual"],
      water: [0.35, "pour-visual"],
      harvest: [0.8, "lift-visual"],
    },
  };
  Object.defineProperty(group.userData, "clips", {
    value: group.animations,
    enumerable: false,
  });
  Object.defineProperty(group.userData, "bones", {
    value: bones,
    enumerable: false,
  });
  return group;
}

export function createDecoration(id = "lantern") {
  if (!DECORATION_IDS.includes(id))
    throw new Error("Unknown decoration: " + id);
  const size = {
    planter: [0.7, 0.65, 0.65],
    lantern: [0.32, 1.2, 0.32],
    bench: [0.85, 0.65, 0.5],
    arch: [0.88, 1.7, 0.3],
    birdbath: [0.65, 0.8, 0.65],
    windchime: [0.65, 1.5, 0.35],
    pond: [0.8, 0.18, 0.8],
    stones: [0.7, 0.12, 0.7],
    fence: [0.85, 0.6, 0.18],
    table: [0.8, 0.6, 0.65],
    moonstand: [0.5, 1.3, 0.5],
    garland: [0.88, 1.2, 0.25],
  }[id];
  const group = staticModel(
    "decoration-" + id,
    (g) => {
      if (id === "planter") {
        part(g, "pot", 0xb58b72, [0, 0.21, 0], [0.29, 0.4, 0.26]);
        part(g, "cylinder", PALETTE.cream, [0, 0.41, 0], [0.3, 0.07, 0.27]);
        part(g, "cylinder", PALETTE.soil, [0, 0.44, 0], [0.26, 0.02, 0.23]);
        for (let k = 0; k < 4; k++) {
          const a = k * 1.57;
          rod(
            g,
            PALETTE.leaf,
            [Math.cos(a) * 0.1, 0.44, Math.sin(a) * 0.1],
            [Math.cos(a) * 0.14, 0.68, Math.sin(a) * 0.14],
            0.014,
          );
          petals(
            g,
            k % 2 ? PALETTE.pink : PALETTE.cream,
            [Math.cos(a) * 0.14, 0.68, Math.sin(a) * 0.14],
            0.065,
          );
        }
      }
      if (id === "lantern") {
        part(g, "cylinder", PALETTE.stone, [0, 0.06, 0], [0.2, 0.12, 0.2]);
        rod(g, PALETTE.wood, [0, 0.12, 0], [0, 1.05, 0], 0.04);
        rod(g, PALETTE.wood, [0, 1.05, 0], [0.15, 1.05, 0], 0.025);
        box(g, PALETTE.gold, [0.15, 0.84, 0], [0.19, 0.24, 0.19]);
        for (const x of [0.055, 0.245])
          for (const z of [-0.095, 0.095])
            rod(g, PALETTE.dark, [x, 0.7, z], [x, 0.97, z], 0.012);
        part(g, "cone", PALETTE.dark, [0.15, 1, 0], [0.18, 0.13, 0.18]);
        box(g, PALETTE.dark, [0.15, 0.69, 0], [0.24, 0.04, 0.24]);
      }
      if (id === "bench") {
        for (const x of [-0.32, 0.32]) {
          box(g, PALETTE.wood, [x, 0.22, 0], [0.065, 0.44, 0.35]);
          box(g, PALETTE.wood, [x, 0.48, -0.16], [0.065, 0.5, 0.055]);
        }
        for (const z of [-0.13, 0, 0.13])
          box(g, PALETTE.cream, [0, 0.44, z], [0.88, 0.06, 0.11]);
        for (const y of [0.57, 0.69])
          box(g, PALETTE.cream, [0, y, -0.19], [0.88, 0.09, 0.055]);
      }
      if (id === "arch") {
        for (const x of [-0.37, 0.37]) {
          box(g, PALETTE.cream, [x, 0.72, 0], [0.075, 1.44, 0.15]);
          box(g, PALETTE.stone, [x, 0.08, 0], [0.16, 0.16, 0.25]);
        }
        const curve = [];
        for (let i = 0; i < 9; i++)
          curve.push([
            Math.cos(Math.PI - (i * Math.PI) / 8) * 0.37,
            1.37 + Math.sin(Math.PI - (i * Math.PI) / 8) * 0.28,
            0,
          ]);
        for (let i = 1; i < curve.length; i++)
          rod(g, PALETTE.cream, curve[i - 1], curve[i], 0.05);
        for (let k = 0; k < 7; k++) {
          const a = k * 0.5;
          leaf(
            g,
            PALETTE.moss,
            Math.cos(a) * 0.37,
            1.4 + Math.sin(a) * 0.25,
            0.04,
            a,
            0.13,
          );
          if (k % 2 === 0)
            petals(
              g,
              PALETTE.pink,
              [Math.cos(a) * 0.37, 1.4 + Math.sin(a) * 0.25, 0.07],
              0.055,
            );
        }
      }
      if (id === "birdbath") {
        part(g, "pot", PALETTE.stone, [0, 0.12, 0], [0.23, 0.24, 0.23]);
        part(g, "cylinder", PALETTE.cream, [0, 0.42, 0], [0.085, 0.6, 0.085]);
        part(g, "pot", PALETTE.stone, [0, 0.7, 0], [0.32, 0.14, 0.32]);
        part(g, "cylinder", PALETTE.water, [0, 0.78, 0], [0.27, 0.015, 0.27]);
        ball(g, PALETTE.blue, [0.24, 0.84, 0], [0.075, 0.06, 0.055]);
        part(
          g,
          "cone",
          PALETTE.gold,
          [0.31, 0.85, 0],
          [0.02, 0.06, 0.02],
          [0, 0, -Math.PI / 2],
        );
      }
      if (id === "windchime") {
        part(g, "cylinder", PALETTE.stone, [0, 0.045, 0], [0.17, 0.09, 0.17]);
        rod(g, PALETTE.wood, [0, 0.09, 0], [0, 1.4, 0], 0.035);
        rod(g, PALETTE.wood, [0, 1.4, 0], [0.28, 1.4, 0], 0.025);
        for (let k = 0; k < 3; k++) {
          const x = 0.13 + k * 0.07;
          rod(g, PALETTE.cream, [x, 1.4, 0], [x, 1.19 - k * 0.05, 0], 0.008);
          part(
            g,
            "cylinder",
            k % 2 ? PALETTE.gold : PALETTE.moon,
            [x, 1.06 - k * 0.05, 0],
            [0.022, 0.25, 0.022],
          );
        }
      }
      if (id === "pond") {
        for (let k = 0; k < 11; k++) {
          const a = (k * Math.PI * 2) / 11;
          ball(
            g,
            k % 2 ? PALETTE.stone : PALETTE.dark,
            [Math.cos(a) * 0.31, 0.09, Math.sin(a) * 0.3],
            [0.12, 0.09, 0.1],
          );
        }
        part(g, "cylinder", PALETTE.water, [0, 0.07, 0], [0.31, 0.07, 0.29]);
        ball(g, PALETTE.moss, [0.1, 0.115, 0.08], [0.12, 0.018, 0.09]);
        petals(g, PALETTE.cream, [0.1, 0.14, 0.08], 0.045);
      }
      if (id === "stones") {
        for (let k = 0; k < 5; k++) {
          const a = k * 2.4;
          ball(
            g,
            k % 2 ? PALETTE.stone : PALETTE.cream,
            [Math.cos(a) * 0.19, 0.04, Math.sin(a) * 0.19],
            [0.15, 0.065, 0.12],
            [0, a, 0],
          );
        }
      }
      if (id === "fence") {
        for (const x of [-0.35, 0, 0.35]) {
          box(g, PALETTE.cream, [x, 0.3, 0], [0.075, 0.6, 0.075]);
          part(
            g,
            "cone",
            PALETTE.moss,
            [x, 0.63, 0],
            [0.07, 0.08, 0.07],
            [0, Math.PI / 4, 0],
          );
        }
        for (const y of [0.2, 0.45])
          box(g, PALETTE.wood, [0, y, 0], [0.85, 0.065, 0.055]);
      }
      if (id === "table") {
        for (const x of [-0.29, 0.29])
          for (const z of [-0.22, 0.22])
            box(g, PALETTE.wood, [x, 0.27, z], [0.06, 0.54, 0.06]);
        box(g, PALETTE.cream, [0, 0.56, 0], [0.8, 0.07, 0.65]);
        box(g, PALETTE.blue, [0, 0.605, 0], [0.22, 0.018, 0.66]);
        for (const x of [-0.23, 0.23]) {
          part(g, "cylinder", PALETTE.cream, [x, 0.62, 0], [0.09, 0.025, 0.09]);
          ball(g, PALETTE.gold, [x, 0.66, 0], [0.065, 0.035, 0.065]);
        }
        part(g, "pot", PALETTE.pink, [0, 0.67, 0], [0.05, 0.1, 0.05]);
      }
      if (id === "moonstand") {
        part(g, "cylinder", PALETTE.stone, [0, 0.07, 0], [0.24, 0.14, 0.24]);
        part(g, "cylinder", PALETTE.cream, [0, 0.47, 0], [0.1, 0.8, 0.1]);
        part(g, "cylinder", PALETTE.gold, [0, 0.91, 0], [0.2, 0.08, 0.2]);
        for (let k = 0; k < 9; k++) {
          const a = -Math.PI * 0.65 + (k * Math.PI * 1.3) / 8;
          ball(
            g,
            PALETTE.moon,
            [Math.cos(a) * 0.16, 1.15 + Math.sin(a) * 0.16, 0],
            [0.055, 0.055, 0.055],
          );
        }
        ball(g, PALETTE.gold, [0.06, 1.17, 0.01], [0.045, 0.045, 0.045]);
      }
      if (id === "garland") {
        for (const x of [-0.38, 0.38]) {
          part(g, "cylinder", PALETTE.stone, [x, 0.05, 0], [0.11, 0.1, 0.11]);
          rod(g, PALETTE.wood, [x, 0.06, 0], [x, 1.15, 0], 0.025);
          ball(g, PALETTE.gold, [x, 1.16, 0], [0.045, 0.045, 0.045]);
        }
        for (let k = 0; k < 6; k++) {
          const x = -0.38 + k * 0.152,
            y = 1.1 - Math.sin((k * Math.PI) / 5) * 0.12;
          if (k)
            rod(
              g,
              PALETTE.cream,
              [x - 0.152, 1.1 - Math.sin(((k - 1) * Math.PI) / 5) * 0.12, 0],
              [x, y, 0],
              0.009,
            );
          part(
            g,
            "cone",
            k % 2 ? PALETTE.blue : PALETTE.pink,
            [x, y - 0.09, 0],
            [0.065, 0.14, 0.025],
            [0, 0, Math.PI],
          );
        }
      }
    },
    boxCollider(...size),
    {
      decorationId: id,
      lod: "shared closed 3D geometry; 20-triangle rounded parts and 8-triangle leaves; all authored components retained",
    },
  );
  if (id === "lantern") {
    const glow = new THREE.Mesh(geometry("sphere"), glowMaterial);
    glow.name = "lantern-glow";
    glow.position.set(0.15, 0.84, 0);
    glow.scale.set(0.055, 0.085, 0.055);
    group.add(glow);
  }
  return group;
}

export function createHouse() {
  return staticModel(
    "moon-cottage",
    (g) => {
      box(g, PALETTE.stone, [0, 0.12, 0], [2.7, 0.24, 2.35]);
      box(g, PALETTE.cream, [0, 0.95, 0], [2.35, 1.7, 1.9]);
      part(g, "gable", PALETTE.cream, [0, 1.65, 0], [2.35, 0.67, 1.9]);
      // Gable built as closed triangular prism, with a visible ridge and roof tiles.
      for (const sign of [-1, 1]) {
        box(
          g,
          PALETTE.dark,
          [sign * 0.67, 1.98, 0],
          [1.65, 0.13, 2.35],
          [0, 0, -sign * 0.47],
        );
        for (let j = 0; j < 5; j++)
          box(
            g,
            j % 2 ? PALETTE.moss : PALETTE.leaf,
            [sign * 0.67, 2.01, -1 + j * 0.5],
            [1.68, 0.06, 0.38],
            [0, 0, -sign * 0.47],
          );
      }
      part(
        g,
        "cylinder",
        PALETTE.wood,
        [0, 2.37, 0],
        [0.085, 2.45, 0.085],
        [Math.PI / 2, 0, 0],
      );
      box(g, PALETTE.bark, [0, 0.58, 1.005], [0.59, 1.05, 0.1]);
      box(g, PALETTE.wood, [0, 0.58, 1.065], [0.47, 0.94, 0.03]);
      ball(g, PALETTE.gold, [0.16, 0.56, 1.1], [0.035, 0.035, 0.025]);
      for (const x of [-0.77, 0.77]) {
        box(g, PALETTE.wood, [x, 1.02, 1.015], [0.57, 0.59, 0.08]);
        box(g, PALETTE.moon, [x, 1.02, 1.065], [0.43, 0.45, 0.025]);
        box(g, PALETTE.cream, [x, 1.02, 1.09], [0.04, 0.49, 0.025]);
        box(g, PALETTE.cream, [x, 1.02, 1.09], [0.47, 0.04, 0.025]);
        box(g, PALETTE.wood, [x, 0.73, 1.1], [0.62, 0.065, 0.22]);
      }
      box(g, PALETTE.wood, [1.18, 1.03, 0], [0.08, 0.6, 0.6]);
      box(g, PALETTE.moon, [1.225, 1.03, 0], [0.02, 0.45, 0.45]);
      box(g, PALETTE.wood, [-1.18, 1.03, 0], [0.08, 0.6, 0.6]);
      box(g, PALETTE.moon, [-1.225, 1.03, 0], [0.02, 0.45, 0.45]);
      box(g, PALETTE.stone, [0, 0.13, 1.35], [0.85, 0.16, 0.6]);
      box(g, PALETTE.stone, [0.7, 2.14, -0.5], [0.3, 0.75, 0.35]);
      box(g, PALETTE.cream, [0.7, 2.53, -0.5], [0.4, 0.12, 0.45]);
    },
    boxCollider(2.7, 2.6, 2.4),
    { entrance: [0, 0, 1.7], gridSnap: 0.5, lod: "1 merged mesh; 1 draw call" },
  );
}

export function createTree(kind = "oak") {
  kind = ["oak", "willow", "pine", "birch"].includes(kind) ? kind : "oak";
  return staticModel(
    "tree-" + kind,
    (g) => {
      part(
        g,
        "cone",
        kind === "birch" ? PALETTE.cream : PALETTE.bark,
        [0, 0.8, 0],
        [0.16, 1.6, 0.15],
      );
      if (kind === "pine") {
        for (let k = 0; k < 3; k++)
          part(
            g,
            "cone",
            k % 2 ? PALETTE.moss : PALETTE.leaf,
            [0, 1.1 + k * 0.5, 0],
            [0.75 - k * 0.13, 1.15, 0.75 - k * 0.13],
          );
      } else {
        for (let k = 0; k < 5; k++) {
          const a = k * 2.399,
            x = Math.cos(a) * 0.45,
            z = Math.sin(a) * 0.45;
          rod(g, PALETTE.bark, [0, 0.85, 0], [x, 1.5, z], 0.055);
          ball(
            g,
            k % 2 ? PALETTE.moss : PALETTE.leaf,
            [x, 1.7 + (k % 2) * 0.2, z],
            [0.58, 0.57, 0.55],
          );
          if (kind === "willow")
            for (let j = 0; j < 3; j++)
              ball(
                g,
                j % 2 ? PALETTE.leaf : PALETTE.moss,
                [
                  x + Math.cos(j * 2.1) * 0.28,
                  1.25,
                  z + Math.sin(j * 2.1) * 0.28,
                ],
                [0.13, 0.65, 0.13],
              );
        }
        ball(g, PALETTE.moss, [0, 2.15, 0], [0.6, 0.5, 0.55]);
      }
      for (let k = 0; k < 5; k++) {
        const a = k * 1.256;
        rod(
          g,
          PALETTE.bark,
          [0, 0.18, 0],
          [Math.cos(a) * 0.3, 0.035, Math.sin(a) * 0.3],
          0.045,
        );
      }
    },
    cylinderCollider(0.22, 2.7),
    {
      treeKind: kind,
      lod: "shared geometry; renderer may distance-cull canopy shadows",
    },
  );
}
export function createRock() {
  return staticModel(
    "moss-rock",
    (g) => {
      ball(g, PALETTE.stone, [0, 0.22, 0], [0.43, 0.3, 0.34], [0.12, 0.4, 0.1]);
      ball(g, PALETTE.moss, [-0.08, 0.43, 0.03], [0.25, 0.06, 0.23]);
      for (let k = 0; k < 3; k++)
        ball(
          g,
          PALETTE.leaf,
          [-0.22 + k * 0.1, 0.4, 0.12],
          [0.09, 0.055, 0.07],
        );
    },
    cylinderCollider(0.4, 0.5),
  );
}

export function createTool(kind = "watering-can") {
  const aliases = {
    water: "watering-can",
    watering: "watering-can",
    plant: "trowel",
    harvest: "basket",
    hoe: "hoe",
  };
  kind = aliases[kind] || kind;
  if (!["watering-can", "trowel", "basket", "hoe", "seed-pouch"].includes(kind))
    kind = "trowel";
  return staticModel(
    "tool-" + kind,
    (g) => {
      if (kind === "watering-can") {
        part(g, "cylinder", PALETTE.blue, [0, 0.16, 0], [0.16, 0.28, 0.13]);
        part(g, "cylinder", PALETTE.cream, [0, 0.31, 0], [0.13, 0.025, 0.11]);
        rod(g, PALETTE.blue, [0.1, 0.15, 0], [0.35, 0.28, 0], 0.035);
        part(
          g,
          "cylinder",
          PALETTE.cream,
          [0.36, 0.3, 0],
          [0.065, 0.04, 0.065],
          [0, 0, -0.9],
        );
        part(
          g,
          "torus",
          PALETTE.wood,
          [-0.16, 0.2, 0],
          [0.11, 0.11, 0.11],
          [0, 0, 0],
        );
      }
      if (kind === "trowel") {
        rod(g, PALETTE.wood, [0, 0.14, 0], [0, 0.4, 0], 0.035);
        ball(g, PALETTE.stone, [0, 0.1, 0], [0.065, 0.12, 0.025]);
      }
      if (kind === "hoe") {
        rod(g, PALETTE.wood, [0, 0.06, 0], [0, 0.7, 0], 0.022);
        box(g, PALETTE.stone, [0.08, 0.07, 0], [0.22, 0.04, 0.15]);
      }
      if (kind === "basket") {
        part(g, "pot", PALETTE.wood, [0, 0.12, 0], [0.2, 0.24, 0.16]);
        part(
          g,
          "torus",
          PALETTE.cream,
          [0, 0.27, 0],
          [0.19, 0.19, 0.16],
          [0, 0, 0],
        );
        for (let j = 0; j < 3; j++)
          part(
            g,
            "cylinder",
            PALETTE.gold,
            [0, 0.05 + j * 0.07, 0],
            [0.205 - j * 0.015, 0.018, 0.165 - j * 0.012],
          );
      }
      if (kind === "seed-pouch") {
        ball(g, PALETTE.cream, [0, 0.12, 0], [0.12, 0.14, 0.085]);
        part(g, "cylinder", PALETTE.wood, [0, 0.23, 0], [0.06, 0.035, 0.04]);
        ball(g, PALETTE.moss, [0, 0.13, 0.08], [0.045, 0.05, 0.012]);
      }
    },
    boxCollider(0.4, 0.7, 0.3),
    {
      toolKind: kind,
      attachment: "arm-right",
      attachmentLocal: [0, -0.18, 0.06],
    },
  );
}

export function createTerrain(kind = "forest") {
  kind = ["forest", "brook", "hill"].includes(kind) ? kind : "forest";
  return staticModel(
    "terrain-" + kind,
    (g) => {
      box(
        g,
        kind === "brook" ? 0x91a69a : PALETTE.moss,
        [0, -0.11, 0],
        [2, 0.22, 2],
      );
      box(g, PALETTE.soil, [0, -0.25, 0], [1.98, 0.18, 1.98]);
      if (kind === "forest") {
        for (let k = 0; k < 7; k++) {
          const a = k * 2.399;
          ball(
            g,
            k % 2 ? PALETTE.leaf : PALETTE.moss,
            [Math.cos(a) * 0.7, 0.04, Math.sin(a) * 0.7],
            [0.22, 0.08, 0.2],
          );
        }
        for (let k = 0; k < 3; k++)
          box(
            g,
            PALETTE.wood,
            [-0.65 + k * 0.65, 0.04, -0.45 + k * 0.4],
            [0.17, 0.04, 0.06],
            [0, k, 0],
          );
      }
      if (kind === "brook") {
        box(g, PALETTE.water, [0, 0.018, 0], [0.64, 0.035, 2]);
        for (let k = 0; k < 6; k++) {
          const side = k % 2 ? 1 : -1;
          ball(
            g,
            PALETTE.stone,
            [side * 0.48, 0.06, -0.8 + k * 0.31],
            [0.18, 0.09, 0.15],
          );
        }
        box(g, PALETTE.wood, [0, 0.12, 0], [0.95, 0.1, 0.65]);
        for (let j = 0; j < 4; j++)
          box(g, PALETTE.cream, [-0.36 + j * 0.24, 0.18, 0], [0.2, 0.04, 0.63]);
      }
      if (kind === "hill") {
        ball(g, PALETTE.leaf, [0, -0.03, 0], [0.86, 0.31, 0.84]);
        for (let k = 0; k < 5; k++) {
          const a = k * 1.26;
          part(
            g,
            "pebble",
            PALETTE.stone,
            [Math.cos(a) * 0.65, 0.11, Math.sin(a) * 0.65],
            [0.17, 0.14, 0.16],
            [0, a, 0],
          );
        }
        for (let k = 0; k < 4; k++) {
          const a = k * 1.57;
          rod(
            g,
            PALETTE.leaf,
            [Math.cos(a) * 0.3, 0.16, Math.sin(a) * 0.3],
            [Math.cos(a) * 0.32, 0.4, Math.sin(a) * 0.32],
            0.01,
          );
          petals(
            g,
            PALETTE.cream,
            [Math.cos(a) * 0.32, 0.42, Math.sin(a) * 0.32],
            0.045,
          );
        }
      }
    },
    { type: "terrain", size: [2, 0.5, 2], walkable: true, gridSnap: 2 },
    {
      terrainKind: kind,
      connectors: [
        [1, 0, 0],
        [-1, 0, 0],
        [0, 0, 1],
        [0, 0, -1],
      ],
      lod: "2m tile; shared merged geometry",
    },
  );
}

/** Twelve specific nature discoveries. These are tangible little specimens,
 * including full bodies, undersides, raised veins and shell/wing markings.
 * Waterbeetle is the stable content ID for a water strider (not a beetle).
 */
export function createDiscovery(id = "dew") {
  if (!DISCOVERY_IDS.includes(id)) throw new Error("Unknown discovery: " + id);
  const heights = {
    dew: 0.38,
    snail: 0.7,
    seedwing: 0.4,
    leafprint: 0.38,
    shellspiral: 0.55,
    waterbeetle: 0.43,
    roundstone: 0.44,
    reed: 0.95,
    mica: 0.48,
    moth: 0.48,
    quartz: 0.88,
    lichen: 0.38,
  };
  return staticModel(
    "discovery-" + id,
    (g) => {
      if (id === "dew") {
        ball(g, PALETTE.soil, [0, 0.075, 0], [0.4, 0.085, 0.32]);
        for (let k = 0; k < 8; k++) {
          const a = k * 2.399,
            r = k ? 0.14 + 0.06 * (k % 2) : 0,
            x = Math.cos(a) * r,
            z = Math.sin(a) * r,
            y = 0.14 + (k % 3) * 0.026;
          ball(
            g,
            k % 2 ? PALETTE.moss : PALETTE.leaf,
            [x, y, z],
            [0.16, 0.11, 0.13],
          );
          ball(
            g,
            PALETTE.moon,
            [x - 0.018, y + 0.105, z],
            [0.034, 0.052, 0.034],
          );
          ball(
            g,
            PALETTE.cream,
            [x - 0.025, y + 0.13, z + 0.018],
            [0.011, 0.014, 0.011],
          );
        }
      }
      if (id === "snail") {
        ball(g, 0xb2b786, [0, 0.1, 0.025], [0.19, 0.09, 0.39]);
        ball(g, 0xc5c89b, [0, 0.19, 0.26], [0.115, 0.14, 0.115]);
        ball(g, PALETTE.wood, [0, 0.36, -0.1], [0.27, 0.28, 0.25]);
        // A raised logarithmic spiral on both shell faces remains readable on rotation.
        const onShell = (angle, radius, side) => {
          const y = Math.cos(angle) * radius,
            z = Math.sin(angle) * radius,
            x =
              side *
              (0.27 *
                Math.sqrt(
                  Math.max(0.02, 1 - (y / 0.28) ** 2 - (z / 0.25) ** 2),
                ) +
                0.009);
          return [x, 0.36 + y, -0.1 + z];
        };
        for (const side of [-1, 1])
          for (let k = 1; k < 31; k++) {
            const t0 = (k - 1) / 30,
              t1 = k / 30,
              a0 = t0 * Math.PI * 4.4,
              a1 = t1 * Math.PI * 4.4,
              r0 = 0.225 * (1 - t0) + 0.015,
              r1 = 0.225 * (1 - t1) + 0.015;
            rod(
              g,
              k % 5 < 2 ? PALETTE.cream : PALETTE.gold,
              onShell(a0, r0, side),
              onShell(a1, r1, side),
              0.017,
            );
          }
        for (const side of [-1, 1]) {
          rod(
            g,
            0xb2b786,
            [side * 0.06, 0.27, 0.29],
            [side * 0.105, 0.44, 0.36],
            0.013,
          );
          ball(
            g,
            PALETTE.dark,
            [side * 0.105, 0.445, 0.36],
            [0.023, 0.025, 0.023],
          );
          rod(
            g,
            0xb2b786,
            [side * 0.065, 0.18, 0.34],
            [side * 0.105, 0.2, 0.41],
            0.009,
          );
        }
        ball(g, PALETTE.cream, [0, 0.13, 0.375], [0.027, 0.008, 0.013]);
      }
      if (id === "seedwing") {
        ball(g, PALETTE.moss, [0, 0.045, 0], [0.3, 0.045, 0.22]);
        for (const side of [-1, 1]) {
          ball(
            g,
            PALETTE.gold,
            [side * 0.055, 0.145, 0.055],
            [0.07, 0.09, 0.055],
            [0, 0, side * 0.2],
          );
          ball(
            g,
            side < 0 ? PALETTE.cream : 0xd1bc84,
            [side * 0.22, 0.245, -0.04],
            [0.27, 0.027, 0.105],
            [0, -side * 0.55, side * 0.28],
          );
          rod(
            g,
            PALETTE.wood,
            [side * 0.04, 0.18, 0.03],
            [side * 0.4, 0.29, -0.14],
            0.009,
          );
          for (let j = 1; j < 4; j++) {
            const t = j / 4;
            rod(
              g,
              0xbba26f,
              [side * (0.05 + t * 0.33), 0.19 + t * 0.1, 0.03 - t * 0.16],
              [side * (0.07 + t * 0.32), 0.19 + t * 0.1, 0.09 - t * 0.1],
              0.004,
            );
          }
        }
        rod(g, PALETTE.wood, [0, 0.12, 0.04], [0, 0.31, 0.01], 0.012);
      }
      if (id === "leafprint") {
        ball(g, PALETTE.stone, [0, 0.17, 0], [0.42, 0.17, 0.33], [0, 0.25, 0]);
        rod(g, 0x687d67, [0, 0.345, -0.22], [0, 0.345, 0.22], 0.013);
        for (let j = 0; j < 6; j++) {
          const z = -0.18 + j * 0.065,
            length = 0.16 - Math.abs(j - 2.5) * 0.028;
          for (const side of [-1, 1]) {
            rod(
              g,
              0x687d67,
              [0, 0.346, z],
              [side * length, 0.328, z + 0.045],
              0.012,
            );
            for (let k = 1; k < 3; k++)
              rod(
                g,
                0x82917b,
                [(side * length * k) / 3, 0.337, z + (0.045 * k) / 3],
                [
                  side * ((length * k) / 3 + 0.02),
                  0.333,
                  z + (0.045 * k) / 3 - 0.025,
                ],
                0.006,
              );
          }
        }
      }
      if (id === "shellspiral") {
        ball(g, PALETTE.stone, [0, 0.055, 0], [0.32, 0.055, 0.27]);
        ball(g, PALETTE.cream, [0, 0.26, -0.015], [0.235, 0.225, 0.205]);
        for (let k = 1; k < 35; k++) {
          const t0 = (k - 1) / 34,
            t1 = k / 34,
            a0 = t0 * Math.PI * 4.5,
            a1 = t1 * Math.PI * 4.5,
            r0 = 0.21 * (1 - t0) + 0.012,
            r1 = 0.21 * (1 - t1) + 0.012;
          rod(
            g,
            k % 5 < 2 ? PALETTE.gold : 0xd7bea0,
            [Math.cos(a0) * r0, 0.26 + Math.sin(a0) * r0, 0.18],
            [Math.cos(a1) * r1, 0.26 + Math.sin(a1) * r1, 0.18],
            0.019,
          );
        }
        ball(
          g,
          PALETTE.cream,
          [0.13, 0.13, 0.17],
          [0.12, 0.11, 0.13],
          [0.2, 0, -0.3],
        );
        ball(g, PALETTE.bark, [0.15, 0.13, 0.278], [0.068, 0.065, 0.017]);
        part(
          g,
          "torus",
          PALETTE.cream,
          [0.15, 0.13, 0.28],
          [0.078, 0.078, 0.055],
          [0, 0, -0.25],
        );
      }
      if (id === "waterbeetle") {
        part(g, "cylinder", PALETTE.water, [0, 0.025, 0], [0.46, 0.05, 0.42]);
        ball(g, PALETTE.dark, [0, 0.29, -0.025], [0.065, 0.065, 0.22]);
        ball(g, PALETTE.cream, [0, 0.346, -0.04], [0.015, 0.008, 0.16]);
        ball(g, PALETTE.dark, [0, 0.31, 0.205], [0.055, 0.055, 0.055]);
        for (const side of [-1, 1]) {
          for (let j = 0; j < 3; j++) {
            const z = 0.14 - j * 0.14,
              tipZ = [0.31, -0.015, -0.31][j];
            rod(
              g,
              PALETTE.moon,
              [side * 0.045, 0.29, z],
              [side * 0.23, 0.23, tipZ * 0.65],
              0.009,
            );
            rod(
              g,
              PALETTE.cream,
              [side * 0.23, 0.23, tipZ * 0.65],
              [side * 0.4, 0.065, tipZ],
              0.008,
            );
            ball(
              g,
              PALETTE.moon,
              [side * 0.4, 0.058, tipZ],
              [0.034, 0.009, 0.025],
            );
          }
          rod(
            g,
            PALETTE.dark,
            [side * 0.025, 0.33, 0.24],
            [side * 0.075, 0.37, 0.34],
            0.007,
          );
          ball(
            g,
            PALETTE.gold,
            [side * 0.034, 0.34, 0.227],
            [0.012, 0.012, 0.012],
          );
        }
        for (const side of [-1, 1])
          part(
            g,
            "torus",
            PALETTE.moon,
            [side * 0.37, 0.055, -0.015],
            [0.075, 0.075, 0.075],
            [Math.PI / 2, 0, 0],
          );
      }
      if (id === "roundstone") {
        ball(g, 0xa6b7af, [0, 0.205, 0], [0.42, 0.2, 0.34], [0.08, 0.12, 0.03]);
        const line = [
          [-0.27, 0.33, -0.13],
          [-0.16, 0.388, -0.07],
          [-0.02, 0.408, 0],
          [0.12, 0.392, 0.07],
          [0.25, 0.34, 0.13],
        ];
        for (let k = 1; k < line.length; k++)
          rod(g, PALETTE.cream, line[k - 1], line[k], 0.009);
        ball(g, PALETTE.stone, [-0.25, 0.045, 0.18], [0.07, 0.04, 0.06]);
      }
      if (id === "reed") {
        ball(g, PALETTE.soil, [0, 0.045, 0], [0.3, 0.045, 0.24]);
        for (let k = 0; k < 3; k++) {
          const x = (k - 1) * 0.16,
            z = (k % 2) * 0.09 - 0.045,
            tip = 0.7 + (k % 2) * 0.14;
          rod(g, 0x88975d, [x * 0.45, 0.045, z], [x, tip, z], 0.012);
          ball(
            g,
            PALETTE.cream,
            [x, tip + 0.035, z],
            [0.055, 0.09, 0.05],
            [0, 0, (k - 1) * 0.13],
          );
          for (let j = 0; j < 4; j++) {
            const y = 0.15 + j * 0.105,
              side = j % 2 ? -1 : 1;
            ball(
              g,
              j % 2 ? PALETTE.moss : PALETTE.leaf,
              [x + side * 0.1, y, z],
              [0.15, 0.012, 0.026],
              [0, j * 0.7, side * 0.55],
            );
          }
        }
      }
      if (id === "mica") {
        ball(g, PALETTE.stone, [0, 0.06, 0], [0.37, 0.06, 0.28]);
        for (let k = 0; k < 6; k++) {
          const x = ((k % 3) - 1) * 0.055,
            z = ((k % 2) - 0.5) * 0.065,
            y = 0.1 + k * 0.052;
          part(
            g,
            "hex-cylinder",
            k % 3 === 0
              ? PALETTE.moon
              : k % 3 === 1
                ? PALETTE.cream
                : PALETTE.purple,
            [x, y, z],
            [0.28, 0.035, 0.22],
            [0.08 * k, k * 0.15, 0.05 * k],
          );
        }
        for (let j = 0; j < 3; j++)
          rod(
            g,
            0xe5e4dc,
            [-0.19 + j * 0.08, 0.421, -0.11],
            [0.08 + j * 0.08, 0.421, 0.11],
            0.006,
          );
      }
      if (id === "moth") {
        ball(g, PALETTE.stone, [0, 0.055, 0], [0.28, 0.055, 0.23]);
        rod(g, PALETTE.wood, [-0.24, 0.07, -0.18], [0.24, 0.14, 0.18], 0.022);
        for (const side of [-1, 1]) {
          ball(
            g,
            PALETTE.cream,
            [side * 0.245, 0.245, 0.06],
            [0.245, 0.04, 0.19],
            [0, side * 0.3, side * 0.24],
          );
          ball(
            g,
            PALETTE.moon,
            [side * 0.17, 0.22, -0.19],
            [0.185, 0.035, 0.15],
            [0, -side * 0.25, side * 0.17],
          );
          for (let k = 0; k < 8; k++) {
            const a = -Math.PI * 0.63 + (k * Math.PI * 1.26) / 7;
            ball(
              g,
              PALETTE.purple,
              [
                side * 0.26 + Math.cos(a) * 0.065 * side,
                0.31 + Math.cos(a) * 0.016,
                0.055 + Math.sin(a) * 0.065,
              ],
              [0.018, 0.009, 0.018],
            );
          }
          rod(
            g,
            PALETTE.dark,
            [side * 0.023, 0.29, 0.23],
            [side * 0.09, 0.37, 0.32],
            0.008,
          );
          for (let j = 0; j < 3; j++)
            rod(
              g,
              PALETTE.dark,
              [side * 0.025, 0.22, 0.1 - j * 0.09],
              [side * 0.11, 0.12, 0.14 - j * 0.11],
              0.006,
            );
        }
        ball(g, 0xd2ccaa, [0, 0.25, -0.015], [0.047, 0.067, 0.24]);
        ball(g, PALETTE.cream, [0, 0.28, 0.22], [0.06, 0.055, 0.06]);
        for (const side of [-1, 1])
          ball(
            g,
            PALETTE.dark,
            [side * 0.036, 0.3, 0.257],
            [0.014, 0.015, 0.012],
          );
      }
      if (id === "quartz") {
        ball(g, PALETTE.stone, [0, 0.055, 0], [0.34, 0.055, 0.28]);
        for (let k = 0; k < 5; k++) {
          const a = k * 2.399,
            r = k ? 0.19 : 0,
            x = Math.cos(a) * r,
            z = Math.sin(a) * r,
            height = k ? 0.33 + (k % 2) * 0.1 : 0.57;
          const tint = k % 2 ? PALETTE.moon : PALETTE.cream;
          part(
            g,
            "hex-cylinder",
            tint,
            [x, 0.07 + height * 0.5, z],
            [0.085, height, 0.085],
            [0, a, 0],
          );
          part(
            g,
            "hex-cone",
            k % 2 ? 0xc6dde1 : 0xf2f0dd,
            [x, 0.07 + height + 0.1, z],
            [0.085, 0.2, 0.085],
            [0, a, 0],
          );
          rod(
            g,
            0xffffff,
            [x - 0.04, 0.1, z + 0.065],
            [x - 0.04, 0.07 + height, z + 0.065],
            0.005,
          );
        }
      }
      if (id === "lichen") {
        ball(
          g,
          PALETTE.dark,
          [0, 0.14, 0],
          [0.41, 0.14, 0.32],
          [0.08, 0.2, 0.04],
        );
        for (let k = 0; k < 10; k++) {
          const a = k * 2.399,
            r = k ? 0.07 + (k % 4) * 0.052 : 0,
            x = Math.cos(a) * r,
            z = Math.sin(a) * r,
            y = 0.26 - Math.pow(r, 2) * 0.35;
          ball(g, PALETTE.gold, [x, y, z], [0.105, 0.025, 0.085], [0, a, 0.05]);
          ball(
            g,
            k % 2 ? 0xb6b279 : PALETTE.moss,
            [x, y + 0.021, z],
            [0.075, 0.018, 0.057],
            [0, a, 0.05],
          );
        }
        for (let k = 0; k < 4; k++) {
          const a = k * 1.57;
          rod(
            g,
            PALETTE.gold,
            [Math.cos(a) * 0.13, 0.28, Math.sin(a) * 0.13],
            [Math.cos(a) * 0.14, 0.34, Math.sin(a) * 0.14],
            0.008,
          );
          ball(
            g,
            PALETTE.gold,
            [Math.cos(a) * 0.14, 0.35, Math.sin(a) * 0.14],
            [0.022, 0.012, 0.022],
          );
        }
      }
    },
    cylinderCollider(
      id === "waterbeetle" || id === "moth" ? 0.49 : 0.43,
      heights[id],
    ),
    {
      discoveryId: id,
      interaction: "observe-only; independent collider; no creature capture",
      lod: "one shared merged mesh; one opaque PBR draw call",
      sourceBrief: "content.js DISCOVERIES descriptions",
    },
  );
}

/** Optional batching for distant/repeated static objects. All transforms are world
 * matrices. Each batch shares one geometry/material and costs one draw call. */
export function createPlantInstances(id, stage, transforms) {
  const sample = createPlant(id, stage),
    base = sample.children[0],
    mesh = new THREE.InstancedMesh(
      base.geometry,
      base.material,
      transforms.length,
    );
  transforms.forEach((matrix, i) => mesh.setMatrixAt(i, matrix));
  mesh.instanceMatrix.needsUpdate = true;
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  mesh.userData = {
    assetId: sample.userData.assetId,
    instanceCount: transforms.length,
  };
  mesh.computeBoundingSphere();
  return mesh;
}
export function getModelStats(object) {
  let triangles = 0,
    meshes = 0,
    skinnedMeshes = 0;
  const materials = new Set();
  object.traverse((n) => {
    if (n.isMesh) {
      meshes++;
      triangles +=
        (n.geometry.index
          ? n.geometry.index.count
          : n.geometry.attributes.position.count) / 3;
      if (n.isSkinnedMesh) skinnedMeshes++;
      for (const m of Array.isArray(n.material) ? n.material : [n.material])
        materials.add(m.name);
    }
  });
  object.updateMatrixWorld(true);
  const bounds = new THREE.Box3().setFromObject(object);
  return {
    triangles,
    meshes,
    skinnedMeshes,
    dimensions: bounds
      .getSize(new THREE.Vector3())
      .toArray()
      .map((v) => +v.toFixed(4)),
    materialSlots: [...materials],
    animations: object.animations.map((c) => ({
      name: c.name,
      duration: c.duration,
      loop: ["idle", "walk"].includes(c.name),
      tracks: c.tracks.length,
    })),
  };
}
export function disposeModelCache() {
  for (const g of geometryCache.values()) g.dispose();
  for (const g of modelCache.values()) g.dispose();
  solidMaterial.dispose();
  glowMaterial.dispose();
  geometryCache.clear();
  modelCache.clear();
}

// Quality variants own their colors and material; authored high-quality assets stay intact.
const lightweightCache = new WeakMap();
export function lightweightVariant(geometry, material) {
  let variants = lightweightCache.get(geometry);
  if (!variants) lightweightCache.set(geometry, variants = new Map());
  const key = material.color?.getHexString() || "ffffff";
  if (variants.has(key)) return variants.get(key);
  const g = geometry.index ? geometry.toNonIndexed() : geometry.clone();
  g.computeVertexNormals();
  const n = g.attributes.normal, colors = g.attributes.color;
  const base = material.color || new THREE.Color(1, 1, 1);
  const sun = new THREE.Vector3(-9, 15, 8).normalize();
  const rgb = new Float32Array(n.count * 3);
  for (let i = 0; i < n.count; i++) {
    const hemi = (n.getY(i) + 1) * 0.5;
    const direct = Math.max(0, n.getX(i)*sun.x + n.getY(i)*sun.y + n.getZ(i)*sun.z);
    // Warm sun, cool sky and moss-green bounce, computed once in linear color space.
    const lighting = [0.48 + hemi*0.65 + direct*1.05,
                      0.57 + hemi*0.65 + direct*0.98,
                      0.54 + hemi*0.82 + direct*0.78];
    for (let c = 0; c < 3; c++) {
      const paint = colors ? colors.array[i*3+c] : 1;
      rgb[i*3+c] = Math.min(1, paint * [base.r,base.g,base.b][c] * lighting[c]);
    }
  }
  g.setAttribute("color", new THREE.BufferAttribute(rgb, 3));
  const m = new THREE.MeshBasicMaterial({ vertexColors:true, toneMapped:false, name:"baked-moonlight" });
  const result = { geometry:g, material:m };
  variants.set(key, result);
  return result;
}
