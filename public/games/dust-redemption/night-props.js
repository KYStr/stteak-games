/** Original source-only night attachments. Metres, +Y up, +Z forward.
 * No WaterProps state, NPC creation, event submission or movement controller.
 */
export function createNightProps(THREE, world, flow) {
  if (!THREE?.BufferGeometry || !world?.solid || !flow?.bridge?.hingePosition)
    throw TypeError(
      "Night props require World and authored bridge hingePosition",
    );
  const group = new THREE.Group();
  group.name = "night-mission-props";
  world.level.add(group);
  const material = new THREE.MeshStandardMaterial({
    vertexColors: true,
    roughness: 0.88,
    side: THREE.DoubleSide,
  });
  material.forceSinglePass = true;
  const geometrySet = new Set(),
    solids = new Set(),
    colliders = new Set(),
    parts = {},
    anchors = {},
    before = [];
  let bound = null,
    disposed = false,
    pendingClose = false;
  const colors = {
    wood: 0x79583b,
    pale: 0xad8855,
    rock: 0x975b40,
    dark: 0x414b4b,
    metal: 0xc3a35d,
    teal: 0x397d7a,
    water: 0x517b80,
    cream: 0xe5d5a6,
    amber: 0xd2a247,
    rust: 0xa7553c,
  };
  const piece = (size, position, color = "wood", rotation = [0, 0, 0]) => ({
    size,
    position,
    color,
    rotation,
  });
  function geometry(entries) {
    const a = { position: [], normal: [], uv: [], color: [] };
    for (const e of entries) {
      const base = new THREE.BoxGeometry(...e.size),
        g = base.toNonIndexed(),
        color = new THREE.Color(colors[e.color] ?? e.color);
      g.applyMatrix4(
        new THREE.Matrix4().compose(
          new THREE.Vector3(...e.position),
          new THREE.Quaternion().setFromEuler(new THREE.Euler(...e.rotation)),
          new THREE.Vector3(1, 1, 1),
        ),
      );
      for (let i = 0; i < g.attributes.position.count; i++) {
        for (const key of ["position", "normal"])
          a[key].push(
            g.attributes[key].getX(i),
            g.attributes[key].getY(i),
            g.attributes[key].getZ(i),
          );
        a.uv.push(g.attributes.uv.getX(i), g.attributes.uv.getY(i));
        a.color.push(color.r, color.g, color.b);
      }
      g.dispose();
      base.dispose();
    }
    const g = new THREE.BufferGeometry();
    for (const [key, values] of Object.entries(a))
      g.setAttribute(
        key,
        new THREE.Float32BufferAttribute(values, key === "uv" ? 2 : 3),
      );
    g.computeBoundingBox();
    g.computeBoundingSphere();
    geometrySet.add(g);
    return g;
  }
  function mesh(name, entries, parent = group) {
    const n = new THREE.Mesh(geometry(entries), material);
    n.name = name;
    n.castShadow = true;
    n.receiveShadow = true;
    parent.add(n);
    return n;
  }
  function bbox(id, object, kind = "night-prop") {
    object.updateWorldMatrix(true, true);
    const box = new THREE.Box3().setFromObject(object),
      size = box.getSize(new THREE.Vector3()),
      center = box.getCenter(new THREE.Vector3());
    return {
      id,
      kind,
      vaultable: false,
      x: center.x,
      z: center.z,
      w: size.x,
      h: size.y,
      d: size.z,
      min: { ...box.min },
      max: { ...box.max },
    };
  }
  function proxy(id, x, z, w, h, d) {
    return {
      id,
      kind: "night-prop",
      vaultable: false,
      x,
      z,
      w,
      h,
      d,
      min: { x: x - w / 2, y: 0, z: z - d / 2 },
      max: { x: x + w / 2, y: h, z: z + d / 2 },
    };
  }
  function shot(n, box = bbox(n.name, n)) {
    if (!solids.has(n)) {
      world.solids.push(n);
      solids.add(n);
    }
    world.solidBoxes.set(n, box);
    return box;
  }
  function movement(box, active = true) {
    if (active && !colliders.has(box)) {
      world.colliders.push(box);
      colliders.add(box);
    } else if (!active && colliders.has(box)) {
      world.colliders = world.colliders.filter((b) => b !== box);
      colliders.delete(box);
    }
  }
  function alive() {
    if (disposed) throw Error("Night props disposed");
  }
  function position(n) {
    n.updateWorldMatrix(true, true);
    return n.getWorldPosition(new THREE.Vector3());
  }
  function visible(n) {
    for (let p = n; p; p = p.parent) if (!p.visible) return false;
    return true;
  }
  const hinge = flow.bridge.hingePosition,
    bankZ = hinge[1] + 0.8;
  const bankRanges = [
      [-29, -14.7],
      [-11.3, 2],
      [6, 29],
    ],
    bankBoxes = [];
  const banks = mesh(
    "night-gully-banks",
    bankRanges.flatMap(([lo, hi]) => [
      piece([hi - lo, 0.68, 1.6], [(lo + hi) / 2, 0.34, bankZ], "rock"),
      piece(
        [hi - lo, 0.07, 0.15],
        [(lo + hi) / 2, 0.715, bankZ - 0.69],
        "pale",
      ),
      piece(
        [hi - lo, 0.07, 0.15],
        [(lo + hi) / 2, 0.715, bankZ + 0.69],
        "wood",
      ),
    ]),
  );
  shot(banks);
  bankRanges.forEach(([lo, hi], i) => {
    const b = proxy(
      `night-gully-bank-${i}`,
      (lo + hi) / 2,
      bankZ,
      hi - lo,
      0.75,
      1.6,
    );
    bankBoxes.push(b);
    movement(b);
  });
  const bridge = new THREE.Group();
  bridge.name = flow.bridge.id;
  bridge.position.set(hinge[0], 0.045, hinge[1]);
  group.add(bridge);
  const bridgeDeck = mesh(
    "night-linked-bridge-deck",
    [
      piece([3.3, 1.6, 0.075], [0, 0.8, 0], "pale", [0, 0, 0]),
      ...[-1.45, 1.45].map((x) =>
        piece([0.12, 1.6, 0.14], [x, 0.8, 0], "wood"),
      ),
      ...[0.2, 0.4, 0.6, 0.8, 1, 1.2, 1.4].map((y) =>
        piece([3.25, 0.022, 0.085], [0, y, 0], "dark"),
      ),
    ],
    bridge,
  );
  bridgeDeck.rotation.x = Math.PI / 2 - flow.bridge.openAngle;
  const bridgeBox = bbox(flow.bridge.id, bridge, "night-bridge");
  shot(bridgeDeck, bridgeBox);
  movement(bridgeBox);
  parts["bridge-gate"] = bridge;
  parts.bridgeDeck = bridgeDeck;
  anchors.bridge = new THREE.Vector3(...[hinge[0], 0.8, hinge[1] + 0.8]);
  // Each cover leaves both original incoming and outgoing route segments clear.
  const coverDefs = {
    "north-shelter": {
      p: [9.8, -3.3],
      size: [3.5, 1.85, 0.25],
      threat: [7, -3],
    },
    "junction-shelter": {
      p: [5.85, 2.9],
      size: [0.3, 1.85, 4.4],
      threat: [7, -3],
    },
    "west-shelter": {
      p: [-11, 5.8],
      size: [2.3, 1.85, 0.25],
      threat: flow.routes["west-ford"].responseTarget,
    },
    "east-shelter": {
      p: [4.3, 15],
      size: [0.3, 1.85, 3],
      threat: flow.routes["east-ridge"].responseTarget,
    },
  };
  const coverMeshes = new Map();
  for (const [id, d] of Object.entries(coverDefs)) {
    const n = mesh(id, [
      piece(d.size, [d.p[0], d.size[1] / 2, d.p[1]], "rock"),
      piece(
        [d.size[0], 0.07, d.size[2]],
        [d.p[0], d.size[1] + 0.035, d.p[1]],
        "pale",
      ),
    ]);
    const b = bbox(id, n, "night-shelter");
    shot(n, b);
    movement(b);
    coverMeshes.set(id, n);
    parts[id] = n;
    anchors[id] = new THREE.Vector3(
      flow.safeCovers[id].position[0],
      0,
      flow.safeCovers[id].position[1],
    );
  }
  const markerEntries = [];
  for (const [id, d] of Object.entries(flow.safeCovers)) {
    const [x, z] = d.position;
    for (const sign of [-1, 1]) {
      markerEntries.push(
        piece(
          [0.55, 0.035, 0.075],
          [x + sign * 0.6, 0.025, z + sign * 0.6],
          "teal",
        ),
      );
      markerEntries.push(
        piece(
          [0.075, 0.035, 0.55],
          [x + sign * 0.6, 0.025, z + sign * 0.6],
          "teal",
        ),
      );
    }
  }
  // Amber threshold and sightline teeth announce the exposed eastern opening.
  for (const z of [hinge[1] - 0.15, hinge[1] + 1.75])
    for (const x of [2.35, 3.05, 3.75, 4.45, 5.15, 5.85])
      markerEntries.push(piece([0.4, 0.035, 0.14], [x, 0.025, z], "amber"));
  const markers = mesh("night-route-safe-and-exposed-markers", markerEntries);
  markers.castShadow = false;
  parts.exposedOpening = markers;
  anchors.exposedOpening = new THREE.Vector3(4, 0, bankZ);
  const source = new THREE.Group();
  source.name = "night-document-source";
  source.position.set(
    flow.documents.position[0],
    0.835,
    flow.documents.position[1],
  );
  group.add(source);
  const documents = new THREE.Group();
  documents.name = flow.documents.id;
  documents.userData.entityId = flow.documents.id;
  source.add(documents);
  const pages = flow.members.map((m, i) => {
    const n = mesh(
      `night-pass-${m.id}`,
      [
        piece([0.28, 0.012, 0.35], [0, 0, 0], "cream"),
        piece([0.055, 0.014, 0.055], [0.07, 0.009, 0.09], "teal"),
        ...Array.from({ length: 3 }, (_, j) =>
          piece(
            [0.17 - j * 0.025, 0.008, 0.014],
            [-0.015, 0.009, -0.09 + j * 0.055],
            "dark",
          ),
        ),
      ],
      documents,
    );
    n.position.set((i - 1) * 0.16, 0.015 * i, 0);
    n.userData.memberId = m.id;
    n.userData.batch = flow.documents.batch;
    return n;
  });
  const documentBox = bbox(flow.documents.id, documents, "night-documents");
  pages.forEach((n) => shot(n, documentBox));
  parts.documents = documents;
  parts.documentPages = pages;
  anchors.documents = position(source);
  const receipt = mesh(flow.receipt.id, [
    piece([0.42, 0.015, 0.28], [0, 0, 0], "cream"),
    ...[-0.12, 0, 0.12].map((x) =>
      piece([0.06, 0.018, 0.08], [x, 0.012, 0.02], "teal"),
    ),
  ]);
  receipt.position.set(-13.8, 0.835, 18.3);
  receipt.visible = false;
  parts.receipt = receipt;
  anchors.receipt = receipt.position.clone();
  const staticEntries = [];
  for (const [x, z] of [[...flow.documents.position], [-13.8, 18.3]]) {
    staticEntries.push(piece([0.85, 0.07, 0.55], [x, 0.78, z], "pale"));
    for (const dx of [-0.31, 0.31])
      staticEntries.push(piece([0.08, 0.75, 0.42], [x + dx, 0.375, z], "wood"));
    movement(
      proxy(
        x === flow.documents.position[0]
          ? "night-paper-stand"
          : "night-receipt-stand",
        x,
        z,
        0.85,
        0.815,
        0.55,
      ),
    );
  }
  for (const [lo, hi] of [
    [-14.7, -11.3],
    [2, 6],
  ])
    staticEntries.push(
      piece([hi - lo, 0.025, 1.6], [(lo + hi) / 2, 0.008, bankZ], "water"),
    );
  // A visible transmission cable joins the original repaired brace to this same bridge.
  const ropePath = [
    [4.45, 0.35, 5.42],
    [4.3, 0.12, 7],
    [-15, 0.12, 7],
    [-15, 0.12, hinge[1]],
    [hinge[0], 0.12, hinge[1]],
  ];
  for (let i = 1; i < ropePath.length; i++) {
    const a = new THREE.Vector3(...ropePath[i - 1]),
      b = new THREE.Vector3(...ropePath[i]),
      v = b.clone().sub(a),
      mid = a.clone().add(b).multiplyScalar(0.5),
      q = new THREE.Quaternion().setFromUnitVectors(
        new THREE.Vector3(0, 1, 0),
        v.clone().normalize(),
      ),
      e = new THREE.Euler().setFromQuaternion(q);
    staticEntries.push(
      piece([0.035, v.length(), 0.035], mid.toArray(), "metal", [
        e.x,
        e.y,
        e.z,
      ]),
    );
  }
  let fittings = null,
    water = null,
    waterBox = null;
  function bindField({ route, brace, escort }, player) {
    alive();
    if (bound) throw Error("Night Field parts already bound");
    if (
      !route?.parts["route-arm"] ||
      !route.parts["water-gauge"] ||
      !brace?.parts.brace?.userData.fieldControl.endSockets ||
      !brace.parts["test-board"] ||
      escort?.members?.length !== 3 ||
      !player?.object
    )
      throw TypeError(
        "Night requires the original Field controls, three family actors and player",
      );
    bound = { route, brace, escort, player };
    before.push({
      object: brace.parts,
      key: "bridge-gate",
      value: brace.parts["bridge-gate"],
      had: Object.hasOwn(brace.parts, "bridge-gate"),
    });
    brace.parts["bridge-gate"] = bridge;
    escort.members.forEach((a, i) => {
      before.push({
        object: a.object.userData,
        key: "missionActorId",
        value: a.object.userData.missionActorId,
        had: Object.hasOwn(a.object.userData, "missionActorId"),
      });
      a.object.userData.missionActorId = flow.members[i].id;
    });
    const gauge = route.parts["water-gauge"];
    // Add an actual one-unit water column to the borrowed fixed scale plate.
    water = mesh(
      "night-water-level-column",
      [piece([0.055, 0.06, 0.035], [0, 0.03, 0], "water")],
      gauge,
    );
    water.position.set(0.23, -0.105, 0.045);
    parts.waterLevel = water;
    waterBox = shot(water);
    for (let i = 0; i <= 3; i++) {
      const p = gauge.localToWorld(
        new THREE.Vector3(0.245, -0.105 + i * 0.06, 0.065),
      );
      staticEntries.push(
        piece([0.13, 0.012, 0.018], p.toArray(), i === 2 ? "amber" : "cream"),
      );
    }
    fittings = mesh("night-stands-cable-water-and-gauge-marks", staticEntries);
    shot(fittings);
    parts.fittings = fittings;
    parts["route-arm"] = route.parts["route-arm"];
    parts["water-gauge"] = gauge;
    parts.brace = brace.parts.brace;
    parts["test-board"] = brace.parts["test-board"];
    return api;
  }
  function readRoute() {
    alive();
    if (!bound) throw Error("Bind Field first");
    const top = bound.route.parts["water-gauge"].worldToLocal(
      water.localToWorld(new THREE.Vector3(0, 0.06, 0)),
    );
    return {
      armAngle: bound.route.parts["route-arm"].rotation.z,
      waterLevel: (top.y + 0.105) / 0.06,
    };
  }
  function readBrace() {
    alive();
    if (!bound) throw Error("Bind Field first");
    const n = bound.brace.parts.brace,
      sockets = n.userData.fieldControl.endSockets;
    n.updateWorldMatrix(true, true);
    bound.brace.object.updateWorldMatrix(true, true);
    const endDistances = [0.65, -0.65].map((y, i) =>
      n
        .localToWorld(new THREE.Vector3(0, y, 0))
        .distanceTo(bound.brace.object.localToWorld(sockets[i].clone())),
    );
    return {
      angle: n.rotation.z,
      endDistances,
      boardHeight: bound.brace.parts["test-board"].position.y,
    };
  }
  function readBridgeAngle() {
    alive();
    return bridge.rotation.x;
  }
  function occupants(extra = []) {
    return [...(bound ? [bound.player, ...bound.escort.members] : []), ...extra]
      .map((a) => a.position || a.object?.position || a)
      .filter((p) => Number.isFinite(p?.x) && Number.isFinite(p?.z));
  }
  function onDeck(extra) {
    return occupants(extra).some(
      (p) =>
        Math.abs(p.x - hinge[0]) < 1.65 + 0.38 &&
        p.z > hinge[1] - 0.38 &&
        p.z < hinge[1] + 1.6 + 0.38,
    );
  }
  function syncBridge() {
    Object.assign(bridgeBox, bbox(flow.bridge.id, bridge, "night-bridge"));
    movement(
      bridgeBox,
      Math.abs(bridge.rotation.x - flow.bridge.openAngle) > 0.01,
    );
  }
  function setBridgeOpen(open, { occupants: extra = [] } = {}) {
    alive();
    if (typeof open !== "boolean")
      throw TypeError("Bridge state must be boolean");
    if (!open && onDeck(extra)) {
      pendingClose = true;
      return {
        open: Math.abs(readBridgeAngle() - flow.bridge.openAngle) < 0.01,
        pendingClose,
      };
    }
    pendingClose = false;
    bridge.rotation.x = open ? flow.bridge.openAngle : 0;
    syncBridge();
    return { open, pendingClose };
  }
  function setDocumentCarrier(carrier) {
    alive();
    if (!bound) throw Error("Bind Field first");
    if (carrier === "source") {
      source.add(documents);
      documents.position.set(0, 0, 0);
      documents.rotation.set(0, 0, 0);
    } else if (carrier === "player" || carrier === bound.player) {
      bound.player.object.add(documents);
      documents.position.set(0.04, 0.96, -0.34);
      documents.rotation.set(-Math.PI / 2, 0, 0);
    } else throw TypeError("Document carrier must be source or bound player");
    update();
    return readDocuments();
  }
  function readDocuments() {
    alive();
    const p = position(documents),
      carrier =
        documents.parent === source
          ? "source"
          : bound && documents.parent === bound.player.object
            ? "player"
            : "invalid";
    return {
      entityId: documents.userData.entityId,
      batch: pages.every((n) => n.userData.batch === pages[0].userData.batch)
        ? pages[0].userData.batch
        : "mismatch",
      memberIds: pages.map((n) => n.userData.memberId),
      position: [p.x, p.z],
      carrier,
      visible: pages.every((n) => n.parent === documents && visible(n)),
    };
  }
  function createReceipt() {
    alive();
    if (!bound) throw Error("Bind Field first");
    const docs = readDocuments(),
      members = bound.escort.members;
    if (
      docs.carrier !== "player" ||
      !docs.visible ||
      members.some(
        (a) =>
          Math.hypot(
            a.position.x - flow.arrival.position[0],
            a.position.z - flow.arrival.position[1],
          ) > flow.arrival.radius,
      )
    )
      throw Error(
        "All three real family actors and the same held papers must arrive",
      );
    receipt.userData.memberIds = members.map(
      (a) => a.object.userData.missionActorId,
    );
    receipt.visible = true;
    shot(receipt);
    return receipt;
  }
  function update(extra = []) {
    alive();
    if (pendingClose && !onDeck(extra)) {
      pendingClose = false;
      bridge.rotation.x = 0;
    }
    syncBridge();
    Object.assign(
      documentBox,
      bbox(flow.documents.id, documents, "night-documents"),
    );
    if (water) Object.assign(waterBox, bbox(water.name, water));
  }
  function dispose() {
    if (disposed) return;
    disposed = true;
    world.solids = world.solids.filter((n) => !solids.has(n));
    world.colliders = world.colliders.filter((b) => !colliders.has(b));
    for (const n of solids) world.solidBoxes.delete(n);
    for (const s of before.reverse()) {
      if (s.had) s.object[s.key] = s.value;
      else delete s.object[s.key];
    }
    documents.removeFromParent();
    water?.removeFromParent();
    group.removeFromParent();
    for (const g of geometrySet) g.dispose();
    material.dispose();
    group.clear();
  }
  group.userData = {
    assetId: "dust-redemption.night-props.v1",
    units: "metres",
    up: "+Y",
    forward: "+Z",
    provenance: {
      method: "original-procedural",
      rights: "Original project geometry; no external bitmaps or fonts",
      textures: [],
    },
    collisionProxies: [...bankBoxes, bridgeBox, ...colliders].filter(
      (v, i, a) => a.indexOf(v) === i,
    ),
    bankRanges,
    bankZ,
    openings: { west: [-14.7, -11.3], east: [2, 6] },
    coverDirections: coverDefs,
    exclusionPoints: [
      flow.documents.position,
      ...Object.values(flow.safeCovers).map((d) => d.position),
      hinge,
      [-13.8, 18.3],
    ],
  };
  const api = {
    group,
    parts,
    anchors,
    documents,
    receipt,
    bridge,
    coverMeshes,
    bindField,
    readRoute,
    readBrace,
    readBridgeAngle,
    setBridgeOpen,
    readDocuments,
    setDocumentCarrier,
    createReceipt,
    update,
    dispose,
    get pendingClose() {
      return pendingClose;
    },
  };
  return api;
}
