/**
 * Original, reusable 3D mission mechanisms. No image, CDN or runtime dependency.
 * Pass the game's pinned THREE namespace. The caller owns returned GPU resources.
 * +Y up, +Z facing, metres, ground-centred pivot. Gameplay owns interaction rules.
 */
export const FIELD_PROP_KINDS = Object.freeze([
  "water-valve",
  "telegraph",
  "medicine",
  "ledger",
  "signal",
  "evacuation",
]);

export function createFieldProp(kind, THREE) {
  if (!FIELD_PROP_KINDS.includes(kind))
    throw new RangeError(`Unknown field prop: ${kind}`);
  if (!THREE?.BufferGeometry)
    throw new TypeError("Pass the pinned THREE namespace.");

  const palette = {
    wood: "#79583b",
    woodLight: "#ad8855",
    woodDark: "#493b32",
    iron: "#414b4b",
    steel: "#8d9a90",
    brass: "#c3a35d",
    teal: "#397d7a",
    cream: "#e5d5a6",
    rust: "#a7553c",
    coal: "#303631",
    stone: "#9d8060",
    paper: "#d7c99c",
  };
  const root = new THREE.Group();
  root.name = `field-${kind}`;
  const dynamicParts = {};
  const interactionPoints = [];
  const proxyBoxes = [];
  const materials = {
    body: new THREE.MeshStandardMaterial({
      name: "frontier-painted-wood",
      vertexColors: true,
      roughness: 0.88,
    }),
    metal: new THREE.MeshStandardMaterial({
      name: "frontier-forged-metal",
      vertexColors: true,
      metalness: 0.6,
      roughness: 0.5,
    }),
    goods: new THREE.MeshStandardMaterial({
      name: "frontier-cloth-paper",
      vertexColors: true,
      roughness: 0.96,
    }),
    lamp: new THREE.MeshStandardMaterial({
      name: "frontier-amber-lamp",
      vertexColors: true,
      emissive: "#d6a256",
      emissiveIntensity: 0.65,
      roughness: 0.4,
    }),
  };
  const box = (x, y, z) => new THREE.BoxGeometry(x, y, z);
  const cylinder = (top, bottom, height, sides = 10) =>
    new THREE.CylinderGeometry(top, bottom, height, sides);
  const torus = (radius, tube, segments = 24) =>
    new THREE.TorusGeometry(radius, tube, 6, segments);
  const part = (geometry, position, color, rotation = [0, 0, 0]) => ({
    geometry,
    position,
    color: palette[color] || color,
    rotation,
  });

  // Merge all primitives sharing a material into one draw call. Vertex colours
  // retain the palette without extra material groups or texture uploads.
  function mesh(name, parts, material = "body", parent = root) {
    const positions = [],
      normals = [],
      uvs = [],
      colors = [];
    for (const entry of parts) {
      const original = entry.geometry;
      const geometry = original.index ? original.toNonIndexed() : original;
      geometry.applyMatrix4(
        new THREE.Matrix4().compose(
          new THREE.Vector3(...entry.position),
          new THREE.Quaternion().setFromEuler(
            new THREE.Euler(...entry.rotation),
          ),
          new THREE.Vector3(1, 1, 1),
        ),
      );
      const p = geometry.getAttribute("position"),
        n = geometry.getAttribute("normal"),
        uv = geometry.getAttribute("uv");
      const color = new THREE.Color(entry.color);
      for (let i = 0; i < p.count; i++) {
        positions.push(p.getX(i), p.getY(i), p.getZ(i));
        normals.push(n.getX(i), n.getY(i), n.getZ(i));
        uvs.push(uv?.getX(i) ?? p.getX(i), uv?.getY(i) ?? p.getZ(i));
        colors.push(color.r, color.g, color.b);
      }
      geometry.dispose();
      if (geometry !== original) original.dispose();
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(positions, 3),
    );
    geometry.setAttribute(
      "normal",
      new THREE.Float32BufferAttribute(normals, 3),
    );
    geometry.setAttribute("uv", new THREE.Float32BufferAttribute(uvs, 2));
    geometry.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));
    geometry.computeBoundingBox();
    geometry.computeBoundingSphere();
    const object = new THREE.Mesh(geometry, materials[material]);
    object.name = `${root.name}-${name}`;
    object.castShadow = material !== "lamp";
    object.receiveShadow = true;
    parent.add(object);
    return object;
  }
  function moving(name, position, contract) {
    const object = new THREE.Group();
    object.name = `${root.name}-${name}`;
    object.position.set(...position);
    root.add(object);
    dynamicParts[name] = { node: object.name, ...contract };
    return object;
  }
  function interaction(id, point, action) {
    interactionPoints.push({ id, position: point, facing: [0, 0, 1], action });
  }
  function proxy(center, size) {
    proxyBoxes.push({ shape: "box", center, size });
  }
  function cable(points, radius = 0.012) {
    return new THREE.TubeGeometry(
      new THREE.CatmullRomCurve3(points.map((p) => new THREE.Vector3(...p))),
      16,
      radius,
      5,
      false,
    );
  }

  if (kind === "water-valve") {
    mesh("foundation", [
      part(box(0.76, 0.14, 0.62), [0, 0.07, 0], "stone"),
      part(box(0.5, 0.055, 0.42), [0, 0.167, 0], "woodDark"),
    ]);
    mesh(
      "pipe",
      [
        part(cylinder(0.085, 0.085, 0.82), [0, 0.58, 0], "iron"),
        part(cylinder(0.11, 0.11, 0.18), [0, 0.96, 0], "steel"),
        part(cylinder(0.08, 0.08, 0.42), [0, 0.96, 0.19], "iron", [
          Math.PI / 2,
          0,
          0,
        ]),
        part(cylinder(0.135, 0.135, 0.035, 12), [0, 0.96, 0.34], "brass", [
          Math.PI / 2,
          0,
          0,
        ]),
        part(cylinder(0.1, 0.1, 0.12), [0, 0.24, 0], "brass"),
        part(cylinder(0.13, 0.13, 0.045, 16), [0.2, 1.11, 0.11], "iron", [
          Math.PI / 2,
          0,
          0,
        ]),
        part(cylinder(0.112, 0.112, 0.01, 16), [0.2, 1.11, 0.139], "cream", [
          Math.PI / 2,
          0,
          0,
        ]),
      ],
      "metal",
    );
    const wheel = moving("wheel", [0, 0.96, 0.4], {
      property: "rotation.z",
      range: [0, Math.PI * 4],
      initial: 0,
      loop: false,
      purpose: "Turn through two revolutions to open the supply valve.",
    });
    mesh(
      "handwheel",
      [
        part(torus(0.23, 0.025), [0, 0, 0], "rust"),
        part(cylinder(0.06, 0.06, 0.055), [0, 0, 0], "brass", [
          Math.PI / 2,
          0,
          0,
        ]),
        ...[0, Math.PI / 3, (Math.PI * 2) / 3].map((angle) =>
          part(box(0.43, 0.035, 0.032), [0, 0, 0], "rust", [0, 0, angle]),
        ),
      ],
      "metal",
      wheel,
    );
    const needle = moving("gauge-needle", [0.2, 1.11, 0.152], {
      property: "rotation.z",
      range: [-0.9, 0.9],
      initial: -0.9,
      loop: false,
      purpose: "Visible supply-pressure feedback; not a hidden gameplay value.",
    });
    needle.rotation.z = -0.9;
    mesh(
      "needle",
      [part(box(0.015, 0.09, 0.012), [0, 0.033, 0], "rust")],
      "body",
      needle,
    );
    proxy([0, 0.6, 0.14], [0.76, 1.2, 0.9]);
    interaction("wheel", [0, 0.96, 0.48], "rotate");
  }

  if (kind === "telegraph") {
    mesh("desk", [
      part(box(1.05, 0.1, 0.64), [0, 0.82, 0], "woodLight"),
      part(box(0.92, 0.06, 0.51), [0, 0.55, 0], "woodDark"),
      ...[-0.43, 0.43].flatMap((x) =>
        [-0.23, 0.23].map((z) =>
          part(box(0.065, 0.79, 0.065), [x, 0.395, z], "wood"),
        ),
      ),
      part(box(0.48, 0.055, 0.32), [-0.16, 0.9, 0], "teal"),
    ]);
    mesh(
      "circuit",
      [
        part(cylinder(0.07, 0.07, 0.16), [-0.29, 1, -0.06], "brass"),
        part(cylinder(0.07, 0.07, 0.16), [-0.08, 1, -0.06], "brass"),
        part(box(0.35, 0.035, 0.05), [-0.18, 1.08, -0.06], "iron"),
        part(box(0.06, 0.12, 0.11), [-0.18, 0.98, 0.17], "steel"),
        part(
          cable([
            [-0.35, 0.9, -0.12],
            [-0.42, 0.98, -0.22],
            [-0.42, 1.05, -0.34],
            [0.35, 1.05, -0.34],
            [0.39, 0.93, -0.12],
          ]),
          [0, 0, 0],
          "iron",
        ),
        part(
          cable([
            [-0.04, 0.92, -0.11],
            [0.03, 0.95, -0.24],
            [0.33, 0.95, -0.26],
            [0.36, 0.92, -0.06],
          ]),
          [0, 0, 0],
          "brass",
        ),
        part(cylinder(0.04, 0.04, 0.1), [0.35, 0.95, -0.08], "steel"),
      ],
      "metal",
    );
    const lever = moving("lever", [-0.18, 1.04, 0.17], {
      property: "rotation.x",
      range: [0, 0.22],
      initial: 0,
      loop: false,
      purpose: "Press and release a physical telegraph key.",
    });
    mesh(
      "key",
      [
        part(box(0.04, 0.035, 0.28), [0, 0, 0.09], "brass"),
        part(cylinder(0.055, 0.055, 0.045), [0, 0.025, 0.22], "coal"),
      ],
      "metal",
      lever,
    );
    mesh(
      "paper",
      [
        part(cylinder(0.065, 0.065, 0.25), [0.31, 0.94, 0.13], "cream", [
          0,
          0,
          Math.PI / 2,
        ]),
        part(box(0.25, 0.008, 0.18), [0.31, 0.885, 0.24], "paper"),
        ...[0, 1, 2, 3].map((i) =>
          part(
            box(0.13, 0.003, 0.008),
            [0.31, 0.891, 0.19 + i * 0.025],
            "woodDark",
          ),
        ),
      ],
      "goods",
    );
    proxy([0, 0.5, 0], [1.05, 1, 0.64]);
    interaction("key", [-0.18, 1.08, 0.38], "press-release");
  }

  if (kind === "medicine") {
    mesh("crate", [
      part(box(0.96, 0.12, 0.7), [0, 0.06, 0], "woodDark"),
      ...[-0.43, 0.43].map((x) =>
        part(box(0.1, 0.59, 0.68), [x, 0.385, 0], "wood"),
      ),
      ...[-0.3, 0.3].map((z) =>
        part(box(0.84, 0.59, 0.1), [0, 0.385, z], "woodLight"),
      ),
      ...[-0.28, 0.28].map((x) =>
        part(box(0.06, 0.65, 0.035), [x, 0.375, 0.365], "woodDark"),
      ),
    ]);
    mesh(
      "hardware",
      [
        ...[-0.29, 0.29].map((x) =>
          part(box(0.12, 0.045, 0.1), [x, 0.72, -0.32], "iron"),
        ),
        part(box(0.1, 0.12, 0.03), [0, 0.58, 0.372], "brass"),
        ...[-0.49, 0.49].map((x) =>
          part(torus(0.09, 0.014, 16), [x, 0.47, 0], "iron", [
            0,
            Math.PI / 2,
            0,
          ]),
        ),
      ],
      "metal",
    );
    const lid = moving("lid", [0, 0.72, -0.34], {
      property: "rotation.x",
      range: [0, -1.35],
      initial: 0,
      loop: false,
      purpose: "Open the cargo lid after verifying its seal.",
    });
    mesh(
      "lid-board",
      [
        part(box(1.02, 0.08, 0.74), [0, 0.04, 0.34], "woodLight"),
        ...[-0.3, 0.3].map((x) =>
          part(box(0.06, 0.035, 0.74), [x, 0.095, 0.34], "woodDark"),
        ),
      ],
      "body",
      lid,
    );
    const seal = moving("seal", [0, 0.58, 0.399], {
      property: "visible",
      range: [true, false],
      initial: true,
      loop: false,
      purpose:
        "The intact seal disappears only when the accepted interaction opens it.",
    });
    mesh(
      "cargo-seal",
      [
        part(box(0.2, 0.19, 0.014), [0, 0, 0], "cream"),
        part(box(0.074, 0.074, 0.014), [0, 0, 0.012], "teal", [
          0,
          0,
          Math.PI / 4,
        ]),
      ],
      "goods",
      seal,
    );
    mesh(
      "bottles",
      [-0.24, 0, 0.24].flatMap((x) => [
        part(cylinder(0.07, 0.075, 0.26), [x, 0.31, 0.01], "teal"),
        part(cylinder(0.035, 0.035, 0.08), [x, 0.48, 0.01], "cream"),
        part(box(0.11, 0.1, 0.016), [x, 0.32, 0.087], "paper"),
      ]),
      "goods",
    );
    proxy([0, 0.4, 0], [1.02, 0.8, 0.76]);
    interaction("seal", [0, 0.58, 0.43], "inspect-seal");
    interaction("lid", [0, 0.8, 0.34], "open");
  }

  if (kind === "ledger") {
    mesh("document-case", [
      part(box(0.92, 0.1, 0.66), [0, 0.05, 0], "woodDark"),
      part(box(0.92, 0.08, 0.66), [0, 0.66, 0], "woodLight"),
      ...[-0.42, 0.42].map((x) =>
        part(box(0.08, 0.56, 0.66), [x, 0.36, 0], "wood"),
      ),
      part(box(0.82, 0.56, 0.07), [0, 0.36, -0.29], "woodDark"),
      part(box(0.79, 0.035, 0.5), [0, 0.34, 0], "woodDark"),
    ]);
    mesh(
      "case-hardware",
      [
        ...[-0.37, 0.37].flatMap((x) =>
          [0.14, 0.6].map((y) =>
            part(box(0.07, 0.07, 0.018), [x, y, 0.342], "brass"),
          ),
        ),
        part(box(0.22, 0.1, 0.018), [0, 0.55, 0.345], "brass"),
        part(box(0.11, 0.045, 0.014), [0, 0.55, 0.36], "coal"),
      ],
      "metal",
    );
    const drawer = moving("drawer", [0, 0.15, 0.02], {
      property: "position.z",
      range: [0.02, 0.34],
      initial: 0.02,
      loop: false,
      purpose: "Pull out the document drawer to compare stored accounts.",
    });
    mesh(
      "drawer",
      [
        part(box(0.77, 0.035, 0.53), [0, 0, 0], "woodDark"),
        part(box(0.79, 0.21, 0.055), [0, 0.095, 0.285], "teal"),
        part(box(0.22, 0.035, 0.035), [0, 0.095, 0.335], "brass"),
        ...[0, 1, 2].map((i) =>
          part(
            box(0.48, 0.025, 0.29),
            [-0.05, 0.035 + i * 0.027, 0.03],
            "paper",
          ),
        ),
      ],
      "body",
      drawer,
    );
    mesh(
      "pages",
      [
        part(box(0.43, 0.085, 0.42), [0.03, 0.745, 0.02], "cream"),
        part(box(0.46, 0.025, 0.44), [0.03, 0.7, 0.02], "teal"),
        ...[0, 1, 2, 3, 4].map((i) =>
          part(
            box(0.28, 0.003, 0.012),
            [0.035, 0.792, -0.13 + i * 0.062],
            "woodLight",
          ),
        ),
        part(box(0.025, 0.09, 0.4), [-0.2, 0.745, 0.02], "woodDark"),
      ],
      "goods",
    );
    const cover = moving("book-cover", [-0.205, 0.79, 0.02], {
      property: "rotation.z",
      range: [0, 1.65],
      initial: 0,
      loop: false,
      purpose: "Open the ledger cover; document text remains localisable UI.",
    });
    mesh(
      "book-cover",
      [
        part(box(0.46, 0.025, 0.44), [0.23, 0, 0], "teal"),
        part(box(0.2, 0.012, 0.26), [0.23, 0.02, 0], "brass"),
        part(box(0.14, 0.012, 0.19), [0.23, 0.029, 0], "woodDark"),
      ],
      "body",
      cover,
    );
    proxy([0, 0.42, 0], [0.92, 0.84, 0.72]);
    interaction("drawer", [0, 0.25, 0.4], "pull");
    interaction("ledger", [0.03, 0.82, 0.24], "read-open");
  }

  if (kind === "signal") {
    mesh("mast", [
      part(box(0.68, 0.12, 0.56), [0, 0.06, 0], "stone"),
      part(box(0.11, 2.12, 0.11), [0, 1.18, 0], "woodDark"),
      part(box(0.9, 0.08, 0.1), [0, 1.98, 0], "wood"),
      part(box(0.3, 0.44, 0.15), [0, 0.83, 0.13], "teal"),
      part(box(0.34, 0.3, 0.28), [-0.19, 0.27, 0.07], "coal"),
    ]);
    mesh(
      "circuit",
      [
        ...[-0.29, -0.1].map((x) =>
          part(cylinder(0.022, 0.022, 0.045), [x, 0.44, 0.07], "brass"),
        ),
        part(
          cable([
            [-0.29, 0.45, 0.07],
            [-0.3, 0.56, 0.18],
            [-0.12, 0.61, 0.22],
            [0, 0.62, 0.24],
          ]),
          [0, 0, 0],
          "iron",
        ),
        part(
          cable([
            [0.05, 0.98, 0.22],
            [0.07, 1.4, 0.07],
            [0.07, 1.91, 0.07],
            [0.39, 1.91, 0.07],
          ]),
          [0, 0, 0],
          "iron",
        ),
        part(box(0.09, 0.045, 0.08), [0, 0.67, 0.25], "brass"),
        part(box(0.09, 0.045, 0.08), [0, 0.97, 0.25], "brass"),
        part(cylinder(0.13, 0.13, 0.035, 12), [0.39, 1.82, 0], "iron"),
        part(cylinder(0.13, 0.13, 0.035, 12), [0.39, 2.07, 0], "iron"),
        ...[-0.09, 0.09].map((x) =>
          part(box(0.018, 0.25, 0.018), [0.39 + x, 1.945, 0], "brass"),
        ),
      ],
      "metal",
    );
    const lever = moving("knife-switch", [0, 0.67, 0.29], {
      property: "rotation.x",
      range: [0, 1.15],
      initial: 0,
      loop: false,
      purpose:
        "Pull the knife switch away from its upper contact to cut the signal.",
    });
    mesh(
      "switch",
      [
        part(box(0.045, 0.3, 0.025), [0, 0.15, 0], "brass"),
        part(box(0.12, 0.065, 0.065), [0, 0.32, 0.005], "rust"),
      ],
      "metal",
      lever,
    );
    const lamp = mesh(
      "indicator",
      [part(cylinder(0.09, 0.09, 0.2, 10), [0.39, 1.945, 0], "cream")],
      "lamp",
    );
    dynamicParts.indicator = {
      node: lamp.name,
      property: "material.emissiveIntensity",
      range: [0.65, 0],
      initial: 0.65,
      loop: false,
      purpose: "Visible powered/cut state; no extra dynamic light.",
    };
    const flag = moving("semaphore", [0, 2.17, 0], {
      property: "rotation.z",
      range: [0, -0.85],
      initial: 0,
      loop: false,
      purpose: "Mechanical fallback status visible when the lamp is cut.",
    });
    mesh(
      "semaphore-arm",
      [
        part(box(0.55, 0.14, 0.05), [-0.27, 0, 0], "rust"),
        part(box(0.055, 0.14, 0.06), [-0.4, 0, 0], "cream"),
      ],
      "body",
      flag,
    );
    proxy([0, 1.12, 0], [1.02, 2.24, 0.56]);
    interaction("switch", [0, 0.84, 0.37], "disconnect");
  }

  if (kind === "evacuation") {
    mesh("cart", [
      part(box(1.12, 0.13, 1.5), [0, 0.67, 0], "woodDark"),
      ...[-0.54, 0.54].flatMap((x) =>
        [0.88, 1.07].map((y) =>
          part(box(0.08, 0.13, 1.5), [x, y, 0], "woodLight"),
        ),
      ),
      ...[-0.7, 0.7].map((z) =>
        part(box(1.12, 0.24, 0.07), [0, 0.88, z], "wood"),
      ),
      ...[-0.48, 0.48].map((x) =>
        part(box(0.075, 0.075, 1.25), [x, 0.73, -1.13], "wood"),
      ),
      ...[-0.48, 0.48].map((x) =>
        part(box(0.1, 0.18, 0.3), [x, 0.77, -1.65], "woodDark"),
      ),
    ]);
    mesh(
      "frame",
      [
        part(cylinder(0.045, 0.045, 1.46), [0, 0.41, 0], "iron", [
          0,
          0,
          Math.PI / 2,
        ]),
        ...[-0.42, 0.42].map((x) =>
          part(box(0.065, 0.28, 0.06), [x, 0.5, 0], "iron"),
        ),
        ...[-0.5, 0.5].flatMap((x) =>
          [-0.62, 0.62].map((z) =>
            part(box(0.055, 0.5, 0.055), [x, 0.9, z], "iron"),
          ),
        ),
      ],
      "metal",
    );
    for (const side of [-1, 1]) {
      const name = side < 0 ? "left-wheel" : "right-wheel";
      const wheel = moving(name, [side * 0.67, 0.4, 0], {
        property: "rotation.x",
        range: [0, Math.PI * 2],
        initial: 0,
        loop: true,
        purpose: "Rotate by travelled distance / 0.39 metre wheel radius.",
      });
      mesh(
        name,
        [
          part(torus(0.36, 0.04), [0, 0, 0], "iron", [0, Math.PI / 2, 0]),
          part(cylinder(0.07, 0.07, 0.12), [0, 0, 0], "brass", [
            0,
            0,
            Math.PI / 2,
          ]),
          ...[0, Math.PI / 3, (Math.PI * 2) / 3].map((angle) =>
            part(box(0.045, 0.035, 0.68), [0, 0, 0], "woodLight", [
              angle,
              0,
              0,
            ]),
          ),
        ],
        "metal",
        wheel,
      );
    }
    mesh(
      "luggage",
      [
        part(box(0.53, 0.34, 0.65), [-0.22, 0.91, 0.11], "teal"),
        part(box(0.32, 0.45, 0.54), [0.25, 0.97, -0.17], "rust"),
        part(box(0.45, 0.18, 0.43), [-0.13, 1.17, 0.12], "cream"),
        ...[-0.36, -0.08].map((x) =>
          part(box(0.035, 0.35, 0.66), [x, 0.91, 0.11], "woodDark"),
        ),
        part(box(0.34, 0.035, 0.055), [0.25, 1.2, -0.17], "woodDark"),
        part(box(0.08, 0.11, 0.016), [-0.22, 0.96, 0.445], "paper"),
      ],
      "goods",
    );
    mesh(
      "lamp-frame",
      [
        part(cylinder(0.11, 0.11, 0.035), [0.45, 1.12, 0.54], "iron"),
        part(cylinder(0.11, 0.11, 0.035), [0.45, 1.37, 0.54], "iron"),
        part(torus(0.09, 0.012, 16), [0.45, 1.46, 0.54], "brass"),
        ...[-0.075, 0.075].map((x) =>
          part(box(0.015, 0.25, 0.015), [0.45 + x, 1.245, 0.54], "brass"),
        ),
      ],
      "metal",
    );
    const lamp = mesh(
      "lantern",
      [part(cylinder(0.075, 0.075, 0.2), [0.45, 1.245, 0.54], "cream")],
      "lamp",
    );
    dynamicParts.lantern = {
      node: lamp.name,
      property: "material.emissiveIntensity",
      range: [0.3, 0.9],
      initial: 0.65,
      loop: false,
      purpose: "Route-ready feedback without a costly extra light.",
    };
    proxy([0, 0.7, -0.3], [1.46, 1.4, 2.9]);
    interaction("handles", [0, 0.85, -1.72], "escort-pull");
  }

  // Normalize all roots, including articulated pivots, to the agreed footprint.
  root.updateMatrixWorld(true);
  const originalBounds = new THREE.Box3().setFromObject(root),
    center = originalBounds.getCenter(new THREE.Vector3());
  const offset = new THREE.Vector3(-center.x, -originalBounds.min.y, -center.z);
  for (const child of root.children) child.position.add(offset);
  for (const entry of interactionPoints)
    entry.position = entry.position.map(
      (v, i) => +(v + offset.getComponent(i)).toFixed(5),
    );
  for (const entry of proxyBoxes)
    entry.center = entry.center.map(
      (v, i) => +(v + offset.getComponent(i)).toFixed(5),
    );
  // Translating a root-level moving group also translates its absolute limits.
  for (const part of Object.values(dynamicParts))
    if (part.property.startsWith("position.")) {
      const axis = part.property.at(-1),
        shift = offset[axis];
      part.range = part.range.map((v) => v + shift);
      part.initial += shift;
    }
  root.updateMatrixWorld(true);
  const bounds = new THREE.Box3().setFromObject(root),
    size = bounds.getSize(new THREE.Vector3());
  let drawCalls = 0,
    triangles = 0;
  const usedMaterials = new Set();
  root.traverse((object) => {
    if (object.isMesh) {
      drawCalls++;
      triangles += object.geometry.getAttribute("position").count / 3;
      usedMaterials.add(object.material);
    }
  });
  for (const material of Object.values(materials))
    if (!usedMaterials.has(material)) material.dispose();
  root.userData = {
    assetId: `dust-redemption.field-prop.${kind}`,
    version: "1.0.0",
    kind,
    unit: "meter",
    up: "+Y",
    forward: "+Z",
    pivot: "base-center",
    dimensions: size.toArray().map((v) => +v.toFixed(5)),
    dynamicParts,
    interactionPoints,
    collision: {
      movementProxies: proxyBoxes,
      shotOcclusion: "render-mesh",
      animatedGeometryRequiresWorldMatrixUpdate: true,
    },
    materialSlots: [...usedMaterials].map((material) => material.name),
    textureRightsIndex: {
      id: "dust-redemption.original-vertex-palette-v1",
      textures: [],
      method:
        "Original procedural geometry and vertex colour; no external images, fonts or symbols.",
      rights:
        "Original project asset; reusable and editable with this project.",
    },
    budget: { drawCalls, triangles, textureBytes: 0 },
    lifecycle:
      "Caller owns geometry and materials; no shared texture allocation. Dispose unique geometry/material once after removing the root.",
  };
  return root;
}
