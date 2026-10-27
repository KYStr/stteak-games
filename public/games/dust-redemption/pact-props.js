/** Original source-only supply scene. One borrowed Field cart/battery; no enemy spawns.
 * All lengths are metres, +Y up, +Z forward. Controller owns events and finite transfers.
 */
export function createPactProps(THREE, world, flow, { field, player } = {}) {
  const feed = field?.tasks.find((t) => t.id === flow.feed.taskId),
    cart = field?.tasks.find((t) => t.id === flow.cart.taskId),
    lights = field?.tasks.find((t) => t.id === flow.lights.taskId);
  if (
    !feed?.parts["military-feed"] ||
    !cart?.parts.cart ||
    cart.cargo !== cart.object ||
    !lights?.parts.battery ||
    !player?.object ||
    !flow.handoff.witnessPosition
  )
    throw TypeError(
      "Pact requires original Field cart/controls, player and authored witnessPosition",
    );
  const witnessCandidates = world.actors.filter(
    (a) => a.object.userData.characterId === flow.handoff.witnessId,
  );
  if (witnessCandidates.length > 1)
    throw Error("Duplicate physical Inez witness");
  const group = new THREE.Group();
  group.name = "pact-mission-props";
  world.level.add(group);
  const palette = {
    wood: 0x79583b,
    pale: 0xad8855,
    metal: 0xc3a35d,
    iron: 0x414b4b,
    teal: 0x397d7a,
    cream: 0xe5d5a6,
    rust: 0xa7553c,
    water: 0x517b80,
  };
  const material = new THREE.MeshStandardMaterial({
    vertexColors: true,
    roughness: 0.88,
    side: THREE.DoubleSide,
  });
  material.forceSinglePass = true;
  const glowMaterial = new THREE.MeshStandardMaterial({
    color: 0xd6a256,
    emissive: 0xd6a256,
    emissiveIntensity: 0.65,
    roughness: 0.4,
  });
  const geometrySet = new Set(),
    materials = new Set([material, glowMaterial]),
    ownSolids = new Set(),
    ownColliders = new Set(),
    borrowedQueries = new Map(),
    parts = {},
    anchors = {},
    pickupAnchors = new Map();
  let disposed = false,
    cartUse = null;
  const piece = (size, position, color = "wood", rotation = [0, 0, 0]) => ({
    size,
    position,
    color,
    rotation,
  });
  function geometry(entries) {
    const a = { position: [], normal: [], uv: [], color: [] };
    for (const e of entries) {
      const b = new THREE.BoxGeometry(...e.size),
        g = b.toNonIndexed(),
        c = new THREE.Color(palette[e.color] ?? e.color);
      g.applyMatrix4(
        new THREE.Matrix4().compose(
          new THREE.Vector3(...e.position),
          new THREE.Quaternion().setFromEuler(new THREE.Euler(...e.rotation)),
          new THREE.Vector3(1, 1, 1),
        ),
      );
      for (let i = 0; i < g.attributes.position.count; i++) {
        for (const k of ["position", "normal"])
          a[k].push(
            g.attributes[k].getX(i),
            g.attributes[k].getY(i),
            g.attributes[k].getZ(i),
          );
        a.uv.push(g.attributes.uv.getX(i), g.attributes.uv.getY(i));
        a.color.push(c.r, c.g, c.b);
      }
      g.dispose();
      b.dispose();
    }
    const g = new THREE.BufferGeometry();
    for (const [k, v] of Object.entries(a))
      g.setAttribute(
        k,
        new THREE.Float32BufferAttribute(v, k === "uv" ? 2 : 3),
      );
    g.computeBoundingBox();
    g.computeBoundingSphere();
    geometrySet.add(g);
    return g;
  }
  function mesh(name, entries, parent = group, m = material) {
    const n = new THREE.Mesh(geometry(entries), m);
    n.name = name;
    n.castShadow = true;
    n.receiveShadow = true;
    parent.add(n);
    return n;
  }
  function snapshot(n) {
    return {
      n,
      parent: n.parent,
      index: n.parent.children.indexOf(n),
      position: n.position.clone(),
      quaternion: n.quaternion.clone(),
      rotation: n.rotation.clone(),
      scale: n.scale.clone(),
      visible: n.visible,
    };
  }
  function restore(s) {
    s.parent.add(s.n);
    s.n.position.copy(s.position);
    s.n.rotation.copy(s.rotation);
    s.n.scale.copy(s.scale);
    s.n.visible = s.visible;
    const a = s.parent.children;
    a.splice(a.indexOf(s.n), 1);
    a.splice(Math.min(s.index, a.length), 0, s.n);
  }
  function alive() {
    if (disposed) throw Error("Pact props disposed");
  }
  function position(n) {
    n.updateWorldMatrix(true, true);
    return n.getWorldPosition(new THREE.Vector3());
  }
  function visible(n) {
    for (let p = n; p; p = p.parent) if (!p.visible) return false;
    return true;
  }
  function bounds(n, id) {
    n.updateWorldMatrix(true, true);
    const b = new THREE.Box3().setFromObject(n),
      s = b.getSize(new THREE.Vector3()),
      c = b.getCenter(new THREE.Vector3());
    return {
      id,
      x: c.x,
      z: c.z,
      w: s.x,
      h: s.y,
      d: s.z,
      kind: "pact-prop",
      vaultable: false,
      min: { ...b.min },
      max: { ...b.max },
    };
  }
  function shot(n, box = bounds(n, n.name)) {
    if (!ownSolids.has(n)) {
      world.solids.push(n);
      ownSolids.add(n);
    }
    world.solidBoxes.set(n, box);
    return box;
  }
  function rememberQueries(n) {
    n.traverse((m) => {
      if (m.isMesh && !geometrySet.has(m.geometry) && !borrowedQueries.has(m))
        borrowedQueries.set(m, {
          present: world.solids.includes(m),
          box: world.solidBoxes.get(m),
        });
    });
  }
  function bindBorrowed(n, box) {
    rememberQueries(n);
    n.traverse((m) => {
      if (!m.isMesh || geometrySet.has(m.geometry)) return;
      if (!world.solids.includes(m)) world.solids.push(m);
      world.solidBoxes.set(m, box);
    });
  }
  function addCollider(n, id) {
    const b = bounds(n, id);
    world.colliders.push(b);
    ownColliders.add(b);
    return b;
  }
  const lightBefore = snapshot(lights.object),
    lightPositionBefore = [...lights.position],
    lightMarkerBefore = snapshot(lights.marker),
    lightColliderBefore = structuredClone(lights.collider),
    cartColliderBefore = structuredClone(cart.collider),
    cartPoseBefore = snapshot(cart.object),
    batteryBefore = snapshot(lights.parts.battery),
    beamBefore = lights.parts.searchlight.visible;
  const battery = lights.parts.battery,
    beam = lights.parts.searchlight,
    cartCollider = cart.collider;
  const cartRegistered = world.colliders.includes(cartCollider);
  lights.object.position.set(
    flow.lights.position[0],
    0,
    flow.lights.position[1],
  );
  lights.position = [...flow.lights.position];
  lights.marker.position.x = flow.lights.position[0];
  lights.marker.position.z = flow.lights.position[1];
  Object.assign(lights.collider, {
    x: flow.lights.position[0],
    z: flow.lights.position[1],
  });
  lights.collider.min.x = lights.collider.x - lights.collider.w / 2;
  lights.collider.max.x = lights.collider.x + lights.collider.w / 2;
  lights.collider.min.z = lights.collider.z - lights.collider.d / 2;
  lights.collider.max.z = lights.collider.z + lights.collider.d / 2;
  rememberQueries(cart.object);
  rememberQueries(battery);
  // Exact original local footprint, including handles and the real wheels; it is not a new cart.
  cart.object.updateWorldMatrix(true, true);
  const inv = new THREE.Matrix4().copy(cart.object.matrixWorld).invert(),
    localBounds = new THREE.Box3();
  cart.object.traverse((n) => {
    if (!n.isMesh) return;
    const p = n.geometry.attributes.position,
      m = inv.clone().multiply(n.matrixWorld);
    for (let i = 0; i < p.count; i++)
      localBounds.expandByPoint(
        new THREE.Vector3().fromBufferAttribute(p, i).applyMatrix4(m),
      );
  });
  const localCorners = [
    [localBounds.min.x, localBounds.min.z],
    [localBounds.max.x, localBounds.min.z],
    [localBounds.max.x, localBounds.max.z],
    [localBounds.min.x, localBounds.max.z],
  ];
  const rack = mesh(
    "pact-same-cart-stock-rack",
    [
      piece([1.05, 0.045, 0.56], [0, 1.325, 0.55], "wood"),
      piece([0.035, 0.15, 0.58], [0, 1.405, 0.55], "metal"),
      piece([1.05, 0.07, 0.035], [0, 1.37, 0.83], "teal"),
    ],
    cart.object,
  );
  const useSeal = mesh(
    "pact-cart-cover-use-seal",
    [
      piece([0.62, 0.06, 0.035], [0, 1.35, 0.86], "rust"),
      piece([0.045, 0.3, 0.03], [0, 1.25, 0.86], "metal"),
    ],
    cart.object,
  );
  useSeal.visible = false;
  const desk = new THREE.Group();
  desk.name = flow.handoff.id;
  desk.position.set(flow.handoff.position[0], 0, flow.handoff.position[1]);
  group.add(desk);
  const stand = mesh(
    "pact-inventory-desk-frame",
    [
      piece([1.15, 0.08, 0.72], [0, 0.8, 0], "pale"),
      ...[-0.44, 0.44].map((x) =>
        piece([0.09, 0.76, 0.55], [x, 0.38, 0], "wood"),
      ),
      piece([0.75, 0.08, 0.4], [0, 0.92, -0.1], "teal"),
      piece([0.8, 0.18, 0.05], [0, 1.04, -0.3], "wood"),
    ],
    desk,
  );
  const deskBox = addCollider(stand, flow.handoff.id);
  shot(stand, deskBox);
  const deed = mesh(
    flow.handoff.deedId,
    [
      piece([0.38, 0.014, 0.3], [0, 0, 0], "cream"),
      piece([0.09, 0.018, 0.06], [0.1, 0.01, 0.07], "rust"),
      ...[-0.07, -0.015, 0.04].map((z) =>
        piece([0.21, 0.008, 0.014], [-0.035, 0.01, z], "iron"),
      ),
    ],
    desk,
  );
  deed.position.set(0.28, 0.855, 0.27);
  const deedBox = shot(deed);
  parts.deed = deed;
  anchors.handoff = position(desk);
  anchors.deed = position(deed);
  const receipt = mesh(
    flow.handoff.receiptId,
    [
      piece([0.32, 0.014, 0.24], [0, 0, 0], "cream"),
      piece([0.07, 0.02, 0.07], [0.07, 0.015, 0.04], "teal"),
    ],
    desk,
  );
  receipt.position.set(-0.3, 0.855, 0.16);
  receipt.visible = false;
  parts.receipt = receipt;
  const salvage = new THREE.Group();
  salvage.name = "pact-battery-salvage-tray";
  salvage.position.set(
    flow.lights.position[0] + 0.9,
    0,
    flow.lights.position[1] - 0.15,
  );
  group.add(salvage);
  const salvageMesh = mesh(
    "pact-salvage-tray-frame",
    [
      piece([0.5, 0.07, 0.4], [0, 0.35, 0], "wood"),
      ...[-0.23, 0.23].map((x) =>
        piece([0.04, 0.14, 0.4], [x, 0.42, 0], "teal"),
      ),
      piece([0.5, 0.14, 0.035], [0, 0.42, -0.18], "wood"),
    ],
    salvage,
  );
  const salvageBox = addCollider(salvageMesh, "pact-battery-salvage-tray");
  shot(salvageMesh, salvageBox);
  const batteryBox = bounds(battery, flow.lights.batteryId);
  bindBorrowed(battery, batteryBox);
  const markEntries = [];
  for (const bay of Object.values(flow.bays)) {
    const [x, z] = bay.position;
    for (const s of [-1, 1]) {
      markEntries.push(
        piece(
          [bay.width, 0.025, 0.05],
          [x, 0.025, z + (s * bay.depth) / 2],
          bay.id === "negotiation-siding" ? "cream" : "rust",
        ),
      );
      markEntries.push(
        piece(
          [0.05, 0.025, bay.depth],
          [x + (s * bay.width) / 2, 0.025, z],
          bay.id === "negotiation-siding" ? "cream" : "rust",
        ),
      );
    }
  }
  const markings = mesh("pact-two-siding-frames", markEntries);
  markings.castShadow = false;
  parts.bayFrames = markings;
  // Original levers form the moving knife contacts. Fixed sockets are separate true geometry.
  const contactNodes = {},
    powerLamps = {},
    contactEntries = [];
  for (const [key, color] of [
    ["military-feed", "rust"],
    ["civilian-feed", "teal"],
  ]) {
    const lever = feed.parts[key],
      n = new THREE.Object3D();
    n.name = `pact-${key}-contact`;
    n.position
      .copy(lever.position)
      .add(new THREE.Vector3(-Math.sin(1.05) * 0.3, Math.cos(1.05) * 0.3, 0));
    feed.object.add(n);
    contactNodes[key] = n;
    contactEntries.push(
      piece([0.08, 0.075, 0.07], position(n).toArray(), color),
    );
    const lamp = mesh(
      `pact-${key}-power-lamp`,
      [piece([0.065, 0.065, 0.065], [0, 0, 0], color)],
      group,
      glowMaterial,
    );
    lamp.position.copy(position(n)).add(new THREE.Vector3(0, 0.14, 0));
    powerLamps[key] = lamp;
  }
  function segment(a, b, color) {
    const va = new THREE.Vector3(...a),
      vb = new THREE.Vector3(...b),
      d = vb.clone().sub(va),
      q = new THREE.Quaternion().setFromUnitVectors(
        new THREE.Vector3(0, 1, 0),
        d.clone().normalize(),
      ),
      r = new THREE.Euler().setFromQuaternion(q);
    return piece(
      [0.045, d.length(), 0.045],
      va.add(vb).multiplyScalar(0.5).toArray(),
      color,
      [r.x, r.y, r.z],
    );
  }
  const militaryStart = position(contactNodes["military-feed"]).toArray(),
    civilianStart = position(contactNodes["civilian-feed"]).toArray();
  const militaryPath = [
    militaryStart,
    [-12.4, 0.18, 5.3],
    [10, 0.18, 5.3],
    [10, 0.18, 12.3],
    [11, 0.18, 12.3],
  ];
  const civilianPath = [
    civilianStart,
    [-11.4, 0.13, 5],
    [-9.5, 0.13, 5],
    [-9.5, 0.13, 11],
    [flow.lights.position[0] - 0.3, 0.3, flow.lights.position[1]],
  ];
  for (const [p, c] of [
    [militaryPath, "rust"],
    [civilianPath, "teal"],
  ])
    for (let i = 1; i < p.length; i++)
      contactEntries.push(segment(p[i - 1], p[i], c));
  const connections = mesh(
    "pact-military-civilian-real-connections",
    contactEntries,
  );
  shot(connections);
  parts.connections = connections;
  parts.contactNodes = contactNodes;
  parts.powerLamps = powerLamps;
  parts.cart = cart.object;
  parts.battery = battery;
  parts.searchlight = beam;
  parts.salvage = salvage;
  parts.desk = desk;
  const bulletGeometry = new THREE.CylinderGeometry(0.012, 0.022, 0.13, 8);
  const bulletColors = [];
  for (let i = 0; i < bulletGeometry.attributes.position.count; i++) {
    const c = new THREE.Color(
      bulletGeometry.attributes.position.getY(i) > 0.035
        ? palette.rust
        : palette.metal,
    );
    bulletColors.push(c.r, c.g, c.b);
  }
  bulletGeometry.setAttribute(
    "color",
    new THREE.Float32BufferAttribute(bulletColors, 3),
  );
  geometrySet.add(bulletGeometry);
  const stockMesh = new THREE.InstancedMesh(
    bulletGeometry,
    material,
    flow.cart.initialStock,
  );
  stockMesh.name = "pact-same-24-supply-rounds";
  stockMesh.castShadow = true;
  stockMesh.receiveShadow = true;
  group.add(stockMesh);
  parts.stock = stockMesh;
  const stockBox = { id: stockMesh.name };
  shot(stockMesh, stockBox);
  let stockCartMatrix = cart.object.matrixWorld.clone();
  function stockPoint(kind, index) {
    if (kind === "issued")
      return desk.localToWorld(
        new THREE.Vector3(
          -0.27 + (index % 6) * 0.095,
          1.08,
          -0.22 + Math.floor(index / 6) * 0.075,
        ),
      );
    return cart.object.localToWorld(
      new THREE.Vector3(
        (kind === "available" ? -0.47 : 0.08) + (index % 6) * 0.065,
        1.43,
        0.32 + Math.floor(index / 6) * 0.1,
      ),
    );
  }
  function stockClasses() {
    stockMesh.updateWorldMatrix(true, false);
    const inverse = stockCartMatrix.clone().invert(),
      classes = [];
    for (let i = 0; i < stockMesh.count; i++) {
      const m = new THREE.Matrix4();
      stockMesh.getMatrixAt(i, m);
      const p = new THREE.Vector3()
          .setFromMatrixPosition(m)
          .applyMatrix4(stockMesh.matrixWorld),
        local = p.clone().applyMatrix4(inverse),
        d = desk.worldToLocal(p.clone());
      const full = visible(stockMesh) && Math.abs(m.determinant()) > 0.9;
      classes.push(
        !full
          ? "invalid"
          : d.y > 1 &&
              d.y < 1.16 &&
              Math.abs(d.x) < 0.38 &&
              d.z > -0.3 &&
              d.z < 0.15
            ? "issued"
            : local.y > 1.35 &&
                local.y < 1.51 &&
                local.z > 0.25 &&
                local.z < 0.76
              ? local.x > -0.51 && local.x < -0.1
                ? "available"
                : local.x > 0.04 && local.x < 0.47
                  ? "cover"
                  : "invalid"
              : "invalid",
      );
    }
    return classes;
  }
  function layoutStock(classes) {
    cart.object.updateWorldMatrix(true, true);
    desk.updateWorldMatrix(true, true);
    const counts = { available: 0, issued: 0, cover: 0 };
    classes.forEach((kind, i) => {
      if (!Object.hasOwn(counts, kind)) return;
      const p = stockMesh.worldToLocal(stockPoint(kind, counts[kind]++)),
        m = new THREE.Matrix4().makeTranslation(p.x, p.y, p.z);
      stockMesh.setMatrixAt(i, m);
    });
    stockMesh.instanceMatrix.needsUpdate = true;
    stockMesh.computeBoundingBox();
    stockMesh.computeBoundingSphere();
    stockCartMatrix.copy(cart.object.matrixWorld);
    Object.assign(stockBox, bounds(stockMesh, stockMesh.name));
  }
  function setStock(value) {
    alive();
    if (
      !value ||
      !["available", "issued", "cover"].every(
        (k) => Number.isInteger(value[k]) && value[k] >= 0,
      ) ||
      value.available + value.issued + value.cover !== stockMesh.count
    )
      throw TypeError("The same 24 rounds must remain conserved");
    layoutStock([
      ...Array(value.available).fill("available"),
      ...Array(value.issued).fill("issued"),
      ...Array(value.cover).fill("cover"),
    ]);
  }
  function readStock() {
    const result = { available: 0, issued: 0, cover: 0 };
    for (const c of stockClasses()) if (Object.hasOwn(result, c)) result[c]++;
    return result;
  }
  setStock({ available: flow.cart.initialStock, issued: 0, cover: 0 });
  const witness =
      witnessCandidates[0] ||
      world.actor("npc-june", ...flow.handoff.witnessPosition),
    ownsWitness = !witnessCandidates.length;
  const witnessBefore = {
    position: witness.position.clone(),
    visible: witness.object.visible,
    characterId: witness.object.userData.characterId,
    missionActorId: witness.object.userData.missionActorId,
  };
  witness.position.set(
    flow.handoff.witnessPosition[0],
    0,
    flow.handoff.witnessPosition[1],
  );
  witness.object.userData.characterId = flow.handoff.witnessId;
  witness.object.userData.missionActorId = "pact-inez-witness";
  anchors.witness = witness.position;
  parts.witness = witness.object;
  function corners(
    x = cart.object.position.x,
    z = cart.object.position.z,
    yaw = cart.object.rotation.y,
  ) {
    const c = Math.cos(yaw),
      s = Math.sin(yaw);
    return localCorners.map(([lx, lz]) => [
      x + c * lx + s * lz,
      z - s * lx + c * lz,
    ]);
  }
  function intersects(poly, b) {
    const rect = [
        [b.min.x, b.min.z],
        [b.max.x, b.min.z],
        [b.max.x, b.max.z],
        [b.min.x, b.max.z],
      ],
      axes = [
        [1, 0],
        [0, 1],
      ];
    for (let i = 0; i < 2; i++) {
      const dx = poly[i + 1][0] - poly[i][0],
        dz = poly[i + 1][1] - poly[i][1];
      axes.push([-dz, dx]);
    }
    for (const [x, z] of axes) {
      const a = poly.map((p) => p[0] * x + p[1] * z),
        v = rect.map((p) => p[0] * x + p[1] * z);
      if (
        Math.max(...a) <= Math.min(...v) + 1e-7 ||
        Math.max(...v) <= Math.min(...a) + 1e-7
      )
        return false;
    }
    return true;
  }
  function canPlaceCart(x, z, yaw, boxes = world.colliders) {
    const c = corners(x, z, yaw);
    if (c.some(([px, pz]) => Math.abs(px) > 23 || Math.abs(pz) > 23))
      return false;
    return !boxes.some(
      (b) => b !== cartCollider && b.max.y > 0 && intersects(c, b),
    );
  }
  function syncCartCollider() {
    alive();
    const classes = stockClasses();
    const c = corners(),
      xs = c.map((p) => p[0]),
      zs = c.map((p) => p[1]);
    Object.assign(cartCollider, {
      x: cart.object.position.x,
      z: cart.object.position.z,
      w: Math.max(...xs) - Math.min(...xs),
      d: Math.max(...zs) - Math.min(...zs),
      h: localBounds.max.y,
      kind: "pact-cart",
      vaultable: false,
    });
    Object.assign(cartCollider.min, {
      x: Math.min(...xs),
      y: cart.object.position.y + localBounds.min.y,
      z: Math.min(...zs),
    });
    Object.assign(cartCollider.max, {
      x: Math.max(...xs),
      y: cart.object.position.y + localBounds.max.y,
      z: Math.max(...zs),
    });
    if (!world.colliders.includes(cartCollider))
      world.colliders.push(cartCollider);
    bindBorrowed(cart.object, cartCollider);
    shot(rack, cartCollider);
    if (useSeal.visible) shot(useSeal, cartCollider);
    else {
      world.solids = world.solids.filter((n) => n !== useSeal);
      ownSolids.delete(useSeal);
      world.solidBoxes.delete(useSeal);
    }
    flow.response.actorIds.forEach((id, i) => {
      if (!pickupAnchors.has(id)) pickupAnchors.set(id, new THREE.Vector3());
      pickupAnchors
        .get(id)
        .set(
          i ? cartCollider.max.x + 0.7 : cartCollider.min.x - 0.7,
          0,
          cartCollider.z,
        );
    });
    layoutStock(classes);
    return cartCollider;
  }
  function resolveCartMotion(dx, dz, yaw, boxes = world.colliders) {
    alive();
    if (![dx, dz, yaw].every(Number.isFinite))
      throw TypeError("Finite cart movement required");
    const x = cart.object.position.x,
      z = cart.object.position.z,
      old = cart.object.rotation.y,
      turn = Math.atan2(Math.sin(yaw - old), Math.cos(yaw - old)),
      steps = Math.max(
        1,
        Math.ceil(Math.hypot(dx, dz) / 0.08),
        Math.ceil(Math.abs(turn) / (Math.PI / 36)),
      );
    for (let i = 1; i <= steps; i++)
      if (
        !canPlaceCart(
          x + (dx * i) / steps,
          z + (dz * i) / steps,
          old + (turn * i) / steps,
          boxes,
        )
      )
        return { moved: false, blocked: true, position: [x, z], yaw: old };
    cart.object.position.x += dx;
    cart.object.position.z += dz;
    cart.object.rotation.y = Math.atan2(
      Math.sin(old + turn),
      Math.cos(old + turn),
    );
    syncCartCollider();
    return {
      moved: Math.hypot(dx, dz) > 1e-8 || Math.abs(turn) > 1e-8,
      blocked: false,
      position: [cart.object.position.x, cart.object.position.z],
      yaw: cart.object.rotation.y,
    };
  }
  function containedBay() {
    const c = corners();
    return (
      Object.values(flow.bays).find((b) =>
        c.every(
          ([x, z]) =>
            x >= b.position[0] - b.width / 2 - 1e-8 &&
            x <= b.position[0] + b.width / 2 + 1e-8 &&
            z >= b.position[1] - b.depth / 2 - 1e-8 &&
            z <= b.position[1] + b.depth / 2 + 1e-8,
        ),
      )?.id ?? null
    );
  }
  function readCartSnapshot() {
    alive();
    return {
      entityId: flow.cart.id,
      worldPosition: position(cart.object).toArray(),
      yaw: cart.object.rotation.y,
      brakeAngle: cart.parts["cart-brake"].rotation.z,
      visible: visible(cart.object),
      containedBayId: containedBay(),
      stock: readStock(),
    };
  }
  function readFeedSnapshot() {
    alive();
    const value = {};
    for (const [key, label] of [
      ["military-feed", "military"],
      ["civilian-feed", "civilian"],
    ]) {
      const lever = feed.parts[key],
        tip = lever.localToWorld(new THREE.Vector3(0, 0.3, 0));
      value[`${label}Angle`] = lever.rotation.z;
      value[`${label}Powered`] =
        tip.distanceTo(position(contactNodes[key])) < 0.015 &&
        visible(powerLamps[key]);
    }
    return value;
  }
  function setFeed(military, civilian) {
    alive();
    if (typeof military !== "boolean" || typeof civilian !== "boolean")
      throw TypeError("Feed display expects booleans");
    powerLamps["military-feed"].visible = military;
    powerLamps["civilian-feed"].visible = civilian;
    return readFeedSnapshot();
  }
  function setCartUse(id) {
    alive();
    if (!flow.bays[id]) throw TypeError("Unknown cart use");
    if (cartUse && cartUse !== id) throw Error("Cart use already selected");
    cartUse = id;
    useSeal.visible = id === "assault-siding";
    syncCartCollider();
  }
  function setLights(choice) {
    alive();
    if (choice === "darken-approach") {
      salvage.add(battery);
      battery.position.set(0, 0.53, 0);
      battery.rotation.set(0, 0, 0);
      battery.visible = true;
      beam.visible = false;
    } else if (choice === "preserve-battery") {
      restore(batteryBefore);
      battery.visible = true;
      beam.visible = true;
    } else throw TypeError("Unknown lighting choice");
    Object.assign(batteryBox, bounds(battery, flow.lights.batteryId));
    return readLightSnapshot();
  }
  function readLightSnapshot() {
    alive();
    return {
      lidAngle: lights.parts["battery-lid"].rotation.z,
      battery: {
        entityId: flow.lights.batteryId,
        parentCarrier:
          battery.parent === salvage
            ? "salvage-tray"
            : battery.parent === lights.object &&
                battery.position.distanceTo(batteryBefore.position) < 0.015 &&
                battery.quaternion.angleTo(batteryBefore.quaternion) < 0.015 &&
                battery.scale.distanceTo(batteryBefore.scale) < 0.015
              ? "power-socket"
              : "invalid",
        worldPosition: position(battery).toArray(),
        visible: visible(battery),
      },
      beamVisible: visible(beam),
    };
  }
  function setDeedCarrier(carrier) {
    alive();
    if (carrier === "desk") {
      desk.add(deed);
      deed.position.set(0.28, 0.855, 0.27);
      deed.rotation.set(0, 0, 0);
    } else if (carrier === "player-satchel") {
      player.object.add(deed);
      deed.position.set(0, 0.98, -0.34);
      deed.rotation.set(-Math.PI / 2, 0, 0);
    } else throw TypeError("Unknown deed carrier");
    Object.assign(deedBox, bounds(deed, flow.handoff.deedId));
    return readDeedSnapshot();
  }
  function readDeedSnapshot() {
    alive();
    return {
      entityId: flow.handoff.deedId,
      parentCarrier:
        deed.parent === desk
          ? "deed-desk"
          : deed.parent === player.object
            ? "player-satchel"
            : "invalid",
      worldPosition: position(deed).toArray(),
      visible: visible(deed),
    };
  }
  function showReceipt() {
    alive();
    if (readDeedSnapshot().parentCarrier !== "player-satchel")
      throw Error("Retain the same deed before showing custody receipt");
    receipt.visible = true;
    shot(receipt);
    return receipt;
  }
  function update() {
    alive();
    syncCartCollider();
    Object.assign(deedBox, bounds(deed, flow.handoff.deedId));
    Object.assign(batteryBox, bounds(battery, flow.lights.batteryId));
    const connected = (key) =>
      feed.parts[key]
        .localToWorld(new THREE.Vector3(0, 0.3, 0))
        .distanceTo(position(contactNodes[key])) < 0.015;
    setFeed(connected("military-feed"), connected("civilian-feed"));
  }
  function dispose() {
    if (disposed) return;
    disposed = true;
    world.solids = world.solids.filter((n) => !ownSolids.has(n));
    world.colliders = world.colliders.filter((b) => !ownColliders.has(b));
    for (const n of ownSolids) world.solidBoxes.delete(n);
    rack.removeFromParent();
    useSeal.removeFromParent();
    deed.removeFromParent();
    for (const n of Object.values(contactNodes)) n.removeFromParent();
    restore(batteryBefore);
    restore(lightBefore);
    restore(lightMarkerBefore);
    lights.position = lightPositionBefore;
    Object.assign(lights.collider, lightColliderBefore);
    beam.visible = beamBefore;
    restore(cartPoseBefore);
    Object.assign(cartCollider, cartColliderBefore);
    world.colliders = world.colliders.filter((b) => b !== cartCollider);
    if (cartRegistered) world.colliders.push(cartCollider);
    for (const [n, q] of borrowedQueries) {
      world.solids = world.solids.filter((v) => v !== n);
      if (q.present) world.solids.push(n);
      if (q.box) world.solidBoxes.set(n, q.box);
      else world.solidBoxes.delete(n);
    }
    if (ownsWitness) {
      witness.mixer.stopAllAction();
      witness.mixer.uncacheRoot(witness.visual);
      world.disposeObjects([witness.object]);
      witness.object.removeFromParent();
      world.actors = world.actors.filter((a) => a !== witness);
    } else {
      witness.position.copy(witnessBefore.position);
      witness.object.visible = witnessBefore.visible;
      for (const k of ["characterId", "missionActorId"])
        if (witnessBefore[k] === undefined) delete witness.object.userData[k];
        else witness.object.userData[k] = witnessBefore[k];
    }
    group.removeFromParent();
    for (const g of geometrySet) g.dispose();
    for (const m of materials) m.dispose();
    group.clear();
  }
  syncCartCollider();
  update();
  group.userData = {
    assetId: "dust-redemption.pact-props.v1",
    units: "metres",
    up: "+Y",
    forward: "+Z",
    provenance: {
      method: "original-procedural",
      rights: "Original project geometry; no external bitmap or font",
      textures: [],
    },
    cartLocalBounds: {
      min: localBounds.min.toArray(),
      max: localBounds.max.toArray(),
    },
    collisionProxies: [cartCollider, deskBox, salvageBox],
    exclusionPoints: [
      flow.lights.position,
      flow.handoff.position,
      flow.handoff.witnessPosition,
      ...Object.values(flow.bays).flatMap((b) => b.route),
    ],
  };
  return {
    group,
    parts,
    anchors,
    pickupAnchors,
    witness,
    desk,
    deed,
    cart: cart.object,
    cartCollider,
    localCorners,
    readFeedSnapshot,
    readCartSnapshot,
    readLightSnapshot,
    readDeedSnapshot,
    setFeed,
    setStock,
    setCartUse,
    setLights,
    setDeedCarrier,
    showReceipt,
    resolveCartMotion,
    syncCartCollider,
    canPlaceCart,
    update,
    dispose,
  };
}
