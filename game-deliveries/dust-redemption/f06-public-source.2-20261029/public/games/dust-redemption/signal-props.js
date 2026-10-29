/** Original source-only signal attachments. Metres, +Y up, +Z forward.
 * No rules imports, DOM, textures, clocks, input handlers or canonical success flags.
 * Bind the existing FieldSystem contacts; controller owns proximity, events and cargo motion.
 */
export function createSignalProps(THREE, world, flow) {
  if (!THREE?.BufferGeometry || !world?.solid || !flow?.pouch?.unique)
    throw new TypeError("Pass THREE, a loaded World and the last-signal flow");
  const existing = world.actors.filter(
    (a) => a.name === "npc-sol" || a.object.userData.characterId === "orin",
  );
  if (existing.length > 1)
    throw Error("Resolve duplicate Orin actors before creating signal props");
  const group = new THREE.Group();
  group.name = "signal-mission-props";
  world.level.add(group);
  const palette = {
    wood: "#79583b",
    lightWood: "#ad8855",
    cream: "#e5d5a6",
    iron: "#414b4b",
    brass: "#c3a35d",
    teal: "#397d7a",
    rust: "#a7553c",
  };
  const materials = {
    wood: new THREE.MeshStandardMaterial({
      vertexColors: true,
      roughness: 0.88,
    }),
    metal: new THREE.MeshStandardMaterial({
      vertexColors: true,
      roughness: 0.5,
      metalness: 0.6,
    }),
    paper: new THREE.MeshStandardMaterial({
      color: palette.cream,
      roughness: 0.96,
    }),
    lamp: new THREE.MeshStandardMaterial({
      vertexColors: true,
      roughness: 0.4,
      emissive: palette.teal,
      emissiveIntensity: 0.12,
    }),
    query: new THREE.MeshBasicMaterial({ side: THREE.DoubleSide }),
  };
  for (const material of Object.values(materials)) {
    material.side = THREE.DoubleSide;
    material.forceSinglePass = true;
  }
  const geometries = new Set(),
    ownMaterials = new Set(Object.values(materials)),
    solids = new Set(),
    colliders = new Set(),
    instances = new Set();
  const fixedEntries = { wood: [], metal: [] },
    parts = {},
    anchors = {},
    bindings = new Map(),
    borrowedMaterials = new Map();
  let disposed = false,
    selectedEndpoint = null,
    field = null,
    pendingReply = null;
  const [px, pz] = flow.patch.position,
    [rx, rz] = flow.receiver.position;
  group.userData = {
    assetId: "dust-redemption.signal-props.v1",
    version: "1.0.0",
    units: "metres",
    up: "+Y",
    forward: "+Z",
    provenance: {
      method: "original-procedural",
      rights: "Original project geometry; no external bitmap or font",
      textures: [],
    },
    collisionProxies: [],
    placement: {
      exclusionPoints: [
        flow.earth.position,
        flow.patch.position,
        flow.receiver.position,
        ...Object.values(flow.endpoints).map((e) => e.position),
      ],
      pouchShelfY: flow.pouch.shelfY,
    },
  };
  const boxPart = (size, position, color = "wood", rotation = [0, 0, 0]) => ({
    size,
    position,
    color,
    rotation,
  });
  function geometry(entries) {
    const p = [],
      n = [],
      uv = [],
      c = [];
    for (const entry of entries) {
      const primitive = new THREE.BoxGeometry(...entry.size),
        g = primitive.toNonIndexed();
      g.applyMatrix4(
        new THREE.Matrix4().compose(
          new THREE.Vector3(...entry.position),
          new THREE.Quaternion().setFromEuler(
            new THREE.Euler(...entry.rotation),
          ),
          new THREE.Vector3(1, 1, 1),
        ),
      );
      const a = g.attributes,
        color = new THREE.Color(palette[entry.color] || entry.color);
      for (let i = 0; i < a.position.count; i++) {
        p.push(a.position.getX(i), a.position.getY(i), a.position.getZ(i));
        n.push(a.normal.getX(i), a.normal.getY(i), a.normal.getZ(i));
        uv.push(a.uv.getX(i), a.uv.getY(i));
        c.push(color.r, color.g, color.b);
      }
      g.dispose();
      primitive.dispose();
    }
    const g = new THREE.BufferGeometry();
    for (const [key, values, size] of [
      ["position", p, 3],
      ["normal", n, 3],
      ["uv", uv, 2],
      ["color", c, 3],
    ])
      g.setAttribute(key, new THREE.Float32BufferAttribute(values, size));
    g.computeBoundingBox();
    g.computeBoundingSphere();
    geometries.add(g);
    return g;
  }
  function mesh(name, entries, material = materials.metal, parent = group) {
    const node = new THREE.Mesh(geometry(entries), material);
    node.name = name;
    node.castShadow = true;
    node.receiveShadow = true;
    parent.add(node);
    return node;
  }
  function bounds(box, object) {
    object.updateWorldMatrix(true, true);
    const b = new THREE.Box3().setFromObject(object),
      size = b.getSize(new THREE.Vector3()),
      center = b.getCenter(new THREE.Vector3());
    Object.assign(box, {
      x: center.x,
      z: center.z,
      w: size.x,
      h: size.y,
      d: size.z,
    });
    Object.assign(box.min, b.min);
    Object.assign(box.max, b.max);
    return box;
  }
  function register(
    id,
    object,
    movement = true,
    kind = "signal-apparatus",
    borrowed = false,
  ) {
    const box = bounds(
      { id, kind, vaultable: false, min: {}, max: {} },
      object,
    );
    object.traverse((node) => {
      if (!node.isMesh || world.solids.includes(node)) return;
      if (borrowed)
        for (const m of Array.isArray(node.material)
          ? node.material
          : [node.material])
          if (!borrowedMaterials.has(m))
            borrowedMaterials.set(m, {
              side: m.side,
              forceSinglePass: m.forceSinglePass,
            });
      world.solid(node, box, { occludes: false });
      solids.add(node);
    });
    if (movement) {
      colliders.add(box);
      world.colliders.push(box);
    }
    group.userData.collisionProxies.push(box);
    return box;
  }
  function fixed(id, type, entries, movement = true, kind) {
    fixedEntries[type].push(...entries);
    const query = mesh(`${id}-query`, entries, materials.query);
    query.visible = false;
    register(id, query, movement, kind);
    return query;
  }
  function cable(id, points, color = "iron") {
    const entries = [];
    for (let i = 1; i < points.length; i++) {
      const a = new THREE.Vector3(...points[i - 1]),
        b = new THREE.Vector3(...points[i]),
        d = b.clone().sub(a),
        q = new THREE.Quaternion().setFromUnitVectors(
          new THREE.Vector3(0, 1, 0),
          d.clone().normalize(),
        ),
        r = new THREE.Euler().setFromQuaternion(q);
      entries.push(
        boxPart(
          [0.035, d.length(), 0.035],
          a.add(b).multiplyScalar(0.5).toArray(),
          color,
          [r.x, r.y, r.z],
        ),
      );
    }
    fixed(id, "metal", entries, false);
  }
  function lever(id, position, color = "rust", length = 0.24) {
    const node = mesh(id, [
      boxPart([0.045, length, 0.035], [0, length / 2, 0], "brass"),
      boxPart([0.14, 0.055, 0.07], [0, length, 0.01], color),
    ]);
    node.position.set(...position);
    parts[id] = node;
    anchors[id] = node.position.clone();
    register(id, node, false);
    return node;
  }
  // New controls sit in front of the existing patch board; the original earth/power stay untouched.
  fixed(
    "signal-control-face",
    "wood",
    [boxPart([1.42, 0.4, 0.06], [px, 1.19, pz + 0.56], "teal")],
    false,
  );
  const selector = lever(
    flow.patch.selectorId,
    [px - 0.47, 1.1, pz + 0.61],
    "teal",
  );
  const branch = lever(flow.traceBranch.id, [px + 0.47, 1.1, pz + 0.61]);
  const keys = new Map();
  keys.set(
    null,
    lever(flow.patch.sendKeyId, [px, 1.1, pz + 0.61], "cream", 0.18),
  );
  // Branch's bridge leaves a real gap at the upper contact. Main line is separate fixed geometry.
  fixed(
    "signal-selector-marks",
    "metal",
    [
      boxPart([0.06, 0.06, 0.04], [px - 0.325, 1.29, pz + 0.6], "cream"),
      boxPart([0.06, 0.06, 0.04], [px - 0.615, 1.29, pz + 0.6], "teal"),
      boxPart([0.09, 0.055, 0.06], [px + 0.47, 1.34, pz + 0.61], "brass"),
      boxPart([0.09, 0.055, 0.06], [px + 0.47, 1.1, pz + 0.61], "brass"),
      boxPart([0.09, 0.14, 0.035], [px + 0.66, 1.28, pz + 0.6], "rust"),
    ],
    false,
  );
  fixed(
    "signal-pouch-shelf",
    "wood",
    [
      boxPart(
        [0.86, 0.06, 0.4],
        [px, flow.pouch.shelfY - 0.03, pz],
        "lightWood",
      ),
      ...[-1, 1].map((s) =>
        boxPart(
          [0.07, 0.85, 0.07],
          [px + s * 0.4, flow.pouch.shelfY - 0.455, pz - 0.16],
          "wood",
        ),
      ),
    ],
    false,
  );
  // An authored M17 code plaque beside the single bag; text UI reads this physical record.
  const codePlate = fixed(
    "receiver-code-plate",
    "wood",
    [boxPart([0.39, 0.24, 0.045], [px + 0.63, 1.6, pz + 0.18], "teal")],
    false,
  );
  codePlate.geometry.translate(-px - 0.63, -1.6, -pz - 0.18);
  codePlate.position.set(px + 0.63, 1.6, pz + 0.18);
  codePlate.userData.record = {
    receiverId: flow.receiver.id,
    batch: flow.roster.batch,
  };
  parts["receiver-code-plate"] = codePlate;
  anchors["receiver-code-plate"] = new THREE.Vector3(px + 0.63, 1.6, pz + 0.18);
  fixed(
    "receiver-code-glyphs",
    "metal",
    [
      boxPart([0.025, 0.14, 0.025], [px + 0.49, 1.6, pz + 0.21], "cream"),
      boxPart([0.025, 0.14, 0.025], [px + 0.59, 1.6, pz + 0.21], "cream"),
      boxPart(
        [0.025, 0.09, 0.025],
        [px + 0.515, 1.625, pz + 0.21],
        "cream",
        [0, 0, 0.6],
      ),
      boxPart(
        [0.025, 0.09, 0.025],
        [px + 0.565, 1.625, pz + 0.21],
        "cream",
        [0, 0, -0.6],
      ),
      boxPart([0.025, 0.14, 0.025], [px + 0.65, 1.6, pz + 0.21], "cream"),
      boxPart([0.08, 0.025, 0.025], [px + 0.745, 1.665, pz + 0.21], "cream"),
      boxPart(
        [0.025, 0.14, 0.025],
        [px + 0.765, 1.6, pz + 0.21],
        "cream",
        [0, 0, -0.25],
      ),
    ],
    false,
  );
  for (const [id, endpoint] of Object.entries(flow.endpoints)) {
    const [x, z] = endpoint.position;
    keys.set(
      id,
      lever(`${id}-dispatch-key`, [x + 0.43, 0.65, z + 0.24], "cream", 0.18),
    );
    fixed(
      `${id}-key-bracket`,
      "metal",
      [boxPart([0.22, 0.06, 0.25], [x + 0.43, 0.61, z + 0.24], "iron")],
      false,
    );
    anchors[id] = new THREE.Vector3(x, 0.6, z);
    cable(
      `main-line-${id}`,
      [
        [px - 0.47, 1.1, pz + 0.59],
        [px - 0.7, 0.045, pz - 0.7],
        [x, 0.045, pz - 0.7],
        [x, 0.045, z],
        [x, 0.6, z],
      ],
      "teal",
    );
    if (endpoint.cover) {
      const {
        position: [cx, cz],
        size: [w, h, d],
      } = endpoint.cover;
      const entries = [boxPart([w, h, d], [cx, h / 2, cz], "wood")];
      for (let j = 0; j < 5; j++)
        entries.push(
          boxPart(
            [w + 0.025, 0.045, d + 0.025],
            [cx, 0.18 + j * 0.35, cz],
            "lightWood",
          ),
        );
      // A single full opaque box forms actual cover. Narrow decorative bands stay inside its proxy.
      fixed(endpoint.cover.id, "wood", entries, true, "crate-high");
      fixed(
        `${endpoint.cover.id}-straps`,
        "metal",
        [-0.7, 0.7].map((dz) =>
          boxPart([w + 0.03, h, 0.065], [cx, h / 2, cz + dz], "iron"),
        ),
        false,
      );
    }
  }
  cable(
    "trace-branch-line",
    [
      [px + 0.47, 1.34, pz + 0.61],
      [px + 0.8, 0.045, pz + 0.7],
      [flow.response.sourcePosition[0], 0.045, pz + 0.7],
      [flow.response.sourcePosition[0], 0.045, flow.response.sourcePosition[1]],
    ],
    "rust",
  );
  cable(
    "south-receiving-line",
    [
      [px - 0.47, 1.1, pz + 0.59],
      [px - 0.7, 0.045, pz + 0.85],
      [rx - 1.25, 0.045, pz + 0.85],
      [rx - 1.25, 0.045, rz + 0.15],
      [rx - 1.25, 1.08, rz + 0.15],
    ],
    "teal",
  );
  // Receiver stands at the exact authored point; table is beside, not on top of, that point.
  const deskX = rx - 1.25,
    deskZ = rz + 0.15;
  fixed("signal-receiving-table", "wood", [
    boxPart([1.1, 0.1, 0.65], [deskX, 0.9, deskZ], "lightWood"),
    ...[-0.45, 0.45].flatMap((x) =>
      [-0.23, 0.23].map((z) =>
        boxPart([0.08, 0.85, 0.08], [deskX + x, 0.425, deskZ + z], "wood"),
      ),
    ),
    boxPart([0.38, 0.25, 0.05], [deskX - 0.31, 1.18, deskZ - 0.23], "teal"),
  ]);
  anchors[flow.receiver.id] = new THREE.Vector3(rx, 0, rz);
  anchors["reply-paper"] = new THREE.Vector3(deskX + 0.1, 0.97, deskZ + 0.07);
  anchors["roster-sheet"] = new THREE.Vector3(px, flow.pouch.shelfY + 0.3, pz);
  const lamp = lever(
    "signal-reply-lamp",
    [deskX - 0.31, 1.11, deskZ - 0.18],
    "cream",
    0.17,
  );
  lamp.material = materials.lamp;
  const marker = lever(
    "signal-reply-session-marker",
    [deskX + 0.39, 1, deskZ + 0.1],
    "teal",
    0.12,
  );
  function papers(name, max, parent, size) {
    const g = new THREE.BoxGeometry(...size);
    geometries.add(g);
    const node = new THREE.InstancedMesh(g, materials.paper, max);
    node.name = name;
    node.castShadow = true;
    node.receiveShadow = true;
    node.userData.records = [];
    parent.add(node);
    instances.add(node);
    return node;
  }
  const pouch = new THREE.Group();
  pouch.name = flow.pouch.id;
  pouch.userData.entityId = flow.pouch.id;
  pouch.position.set(
    flow.pouch.position[0],
    flow.pouch.shelfY,
    flow.pouch.position[1],
  );
  group.add(pouch);
  mesh(
    "roster-pouch-body",
    [
      boxPart([0.56, 0.35, 0.22], [0, 0.175, 0], "teal"),
      boxPart([0.59, 0.06, 0.25], [0, 0.35, 0], "wood"),
      boxPart([0.045, 0.4, 0.035], [-0.19, 0.2, 0.13], "brass"),
      boxPart([0.045, 0.4, 0.035], [0.19, 0.2, 0.13], "brass"),
      boxPart([0.22, 0.035, 0.03], [0, 0.43, 0], "wood"),
      ...[-1, 1].map((s) =>
        boxPart([0.035, 0.08, 0.03], [s * 0.11, 0.39, 0], "wood"),
      ),
    ],
    materials.wood,
    pouch,
  );
  const contents = papers(
    "complete-roster-pages",
    4,
    pouch,
    [0.095, 0.17, 0.018],
  );
  contents.userData.rosterId = flow.roster.id;
  contents.userData.batch = flow.roster.batch;
  const pouchMatrices = flow.roster.memberIds.map((id, i) => {
    const m = new THREE.Matrix4().makeTranslation(
      -0.165 + i * 0.11,
      0.32,
      0.125,
    );
    contents.setMatrixAt(i, m);
    contents.userData.records.push({
      id,
      name: flow.roster.names[i],
      batch: flow.roster.batch,
    });
    return m.clone();
  });
  contents.instanceMatrix.needsUpdate = true;
  parts[flow.roster.sourcePart] = contents;
  const pouchBox = register(flow.pouch.id, pouch, false, "signal-pouch");
  parts[flow.pouch.id] = pouch;
  const replyPaper = papers(
    "signal-current-reply-paper",
    4,
    group,
    [0.15, 0.018, 0.3],
  );
  replyPaper.position.copy(anchors["reply-paper"]);
  replyPaper.count = 0;
  const replyMatrices = Array.from({ length: 4 }, (_, i) =>
    new THREE.Matrix4().makeTranslation(-0.24 + i * 0.16, 0, 0),
  );
  replyMatrices.forEach((m, i) => replyPaper.setMatrixAt(i, m));
  replyPaper.instanceMatrix.needsUpdate = true;
  replyPaper.count = 4;
  replyPaper.computeBoundingBox();
  replyPaper.computeBoundingSphere();
  register("signal-current-reply", replyPaper, false);
  replyPaper.count = 0;
  parts["reply-paper"] = replyPaper;
  parts["reply-lamp"] = lamp;
  parts["session-marker"] = marker;
  const receiverOwned = !existing.length,
    receiver = existing[0] || world.actor("npc-sol", rx, rz);
  const receiverBefore = {
    position: receiver.position.clone(),
    name: receiver.object.name,
    visible: receiver.object.visible,
    characterId: receiver.object.userData.characterId,
    missionActorId: receiver.object.userData.missionActorId,
  };
  receiver.position.set(rx, 0, rz);
  receiver.object.visible = true;
  receiver.object.name = flow.receiver.id;
  receiver.object.userData.characterId = "orin";
  receiver.object.userData.missionActorId = flow.receiver.id;
  function alive() {
    if (disposed) throw Error("Signal props have been disposed");
  }
  function finishFixed() {
    for (const type of ["wood", "metal"]) {
      const old = parts[`static-${type}`];
      if (old) {
        geometries.delete(old.geometry);
        old.geometry.dispose();
        old.removeFromParent();
      }
      parts[`static-${type}`] = mesh(
        `signal-static-${type}`,
        fixedEntries[type],
        materials[type],
      );
    }
  }
  finishFixed();
  function bindField(tasks) {
    alive();
    if (field) throw Error("Signal field controls are already bound");
    const earth = tasks?.earth,
      patch = tasks?.patch,
      relay = tasks?.relay;
    const plug = earth?.parts?.[flow.earth.earthPart],
      power = earth?.parts?.[flow.earth.powerPart],
      slots = plug?.userData.fieldControl?.slots;
    if (
      !plug ||
      !power ||
      slots?.length !== 3 ||
      !patch?.object ||
      !relay?.parts
    )
      throw TypeError(
        "Bind the real signal-earth, signal-patch and signal-relay tasks",
      );
    for (const id of Object.keys(flow.endpoints)) {
      const root = relay.parts[id],
        knife = root?.getObjectByName(
          root?.userData.dynamicParts?.["knife-switch"]?.node,
        );
      if (!knife) throw Error(`Missing original ${id} knife`);
    }
    field = { plug, power, slots };
    for (const id of Object.keys(flow.endpoints)) {
      const root = relay.parts[id],
        knife = root.getObjectByName(
          root.userData.dynamicParts["knife-switch"].node,
        ),
        original = knife.rotation.x;
      // The legacy upper contact remains; the lower dispatch jack now gives 1.15 a real mating surface.
      knife.rotation.x = 1.15;
      root.updateWorldMatrix(true, true);
      const contact = knife.localToWorld(new THREE.Vector3(0, 0.32, 0.005));
      knife.rotation.x = original;
      root.updateWorldMatrix(true, true);
      const contactNode = fixed(
        `${id}-dispatch-contact`,
        "metal",
        [boxPart([0.09, 0.055, 0.07], contact.toArray(), "brass")],
        false,
      );
      const socket = new THREE.Object3D();
      socket.name = `${id}-dispatch-socket`;
      socket.position.copy(contact);
      group.add(socket);
      const box = register(
        `signal-${id}-apparatus`,
        root,
        true,
        "signal-relay",
        true,
      );
      bindings.set(id, {
        root,
        knife,
        socket,
        original,
        contactNode,
        box,
        boxAngle: original,
      });
      parts[`${id}-socket`] = socket;
      parts[`${id}-knife`] = knife;
    }
    parts["earth-plug"] = plug;
    parts["power-lever"] = power;
    finishFixed();
    return readContacts();
  }
  function readContacts() {
    alive();
    if (!field) throw Error("Bind existing earth contacts before reading");
    field.plug.updateWorldMatrix(true, true);
    const joint = field.plug.localToWorld(new THREE.Vector3(0, 0, -0.09));
    const nearest = field.slots
      .map((slot) => ({
        id: slot.id,
        distance: joint.distanceTo(
          slot.node.getWorldPosition(new THREE.Vector3()),
        ),
      }))
      .sort((a, b) => a.distance - b.distance)[0];
    return {
      earthSocketId:
        nearest.distance <= flow.earth.maximumSeatedDistance
          ? nearest.id
          : "open",
      earthDistance: nearest.distance,
      powerAngle: field.power.rotation.z,
    };
  }
  function setChannel(id) {
    alive();
    const channel = flow.channels[id];
    if (!channel) throw TypeError("Unknown signal channel");
    selector.rotation.z = channel.selectorAngle;
    selector.updateWorldMatrix(true, true);
  }
  function readChannelAngle() {
    alive();
    return selector.rotation.z;
  }
  function setTraceBranch(connected) {
    alive();
    if (typeof connected !== "boolean")
      throw TypeError("Pass a connected boolean");
    branch.rotation.z = connected
      ? flow.traceBranch.closedAngle
      : flow.traceBranch.cutAngle;
    branch.updateWorldMatrix(true, true);
  }
  function readTraceBranchAngle() {
    alive();
    return branch.rotation.z;
  }
  function connectEndpoint(id, connected = true) {
    alive();
    const binding = bindings.get(id);
    if (!binding || typeof connected !== "boolean")
      throw TypeError("Bind a known relay and pass a boolean");
    if (selectedEndpoint && selectedEndpoint !== id)
      throw Error("Only the selected physical relay may be changed");
    selectedEndpoint = id;
    binding.knife.rotation.x = connected ? 1.15 : 0;
    binding.root.updateWorldMatrix(true, true);
    bounds(binding.box, binding.root);
    binding.boxAngle = binding.knife.rotation.x;
    return readEndpoint();
  }
  function readEndpoint(id = selectedEndpoint) {
    alive();
    if (id === null) return { endpointId: null, connected: false };
    const b = bindings.get(id);
    if (!b) throw TypeError("Unknown bound endpoint");
    b.knife.updateWorldMatrix(true, true);
    const distance = b.knife
      .localToWorld(new THREE.Vector3(0, 0.32, 0.005))
      .distanceTo(b.socket.getWorldPosition(new THREE.Vector3()));
    return { endpointId: id, connected: distance <= 0.015 };
  }
  function pressKey(id = null, pressed = true) {
    alive();
    if (!keys.has(id) || typeof pressed !== "boolean")
      throw TypeError("Unknown key or state");
    keys.get(id).rotation.z = pressed ? 1.05 : 0;
    keys.get(id).updateWorldMatrix(true, true);
    return readKeyAngle(id);
  }
  function readKeyAngle(id = null) {
    alive();
    if (!keys.has(id)) throw TypeError("Unknown key");
    return keys.get(id).rotation.z;
  }
  function readRecords(node, matrices) {
    const records = [],
      actual = new THREE.Matrix4();
    for (let i = 0; i < Math.min(node.count, matrices.length); i++) {
      node.getMatrixAt(i, actual);
      if (
        actual.elements.every(
          (v, j) => Math.abs(v - matrices[i].elements[j]) < 1e-6,
        ) &&
        node.userData.records[i]
      )
        records.push(node.userData.records[i].id);
    }
    return records;
  }
  function readRoster() {
    alive();
    return {
      rosterId: contents.userData.rosterId,
      batch: contents.userData.batch,
      memberIds: readRecords(contents, pouchMatrices),
    };
  }
  function readReceiverCode() {
    alive();
    return { ...codePlate.userData.record };
  }
  function setPouchPose(position, { grounded = false } = {}) {
    alive();
    if (pouch.parent === receiver.object)
      throw Error("已簽收的同一信袋由奧林保管，不能再次搬動。");
    const xyz = Array.isArray(position)
      ? position
      : [position?.x, position?.y, position?.z];
    if (
      xyz.length !== 3 ||
      !xyz.every(Number.isFinite) ||
      typeof grounded !== "boolean"
    )
      throw TypeError(
        "Pouch pose requires actual [x,y,z] and grounded boolean",
      );
    pouch.position.set(...xyz);
    bounds(pouchBox, pouch);
    if (grounded && !colliders.has(pouchBox)) {
      colliders.add(pouchBox);
      world.colliders.push(pouchBox);
    }
    if (!grounded && colliders.has(pouchBox)) {
      colliders.delete(pouchBox);
      world.colliders = world.colliders.filter((b) => b !== pouchBox);
    }
    return readPouch();
  }
  // This is an actual handoff to the existing actor, not a second bag or a new
  // floor obstacle. Preview the entire short hand-to-hand segment before the
  // controller commits its receipt; existing pickup/range/ray proof still applies.
  function preparePouchTransfer() {
    alive();
    if (pouch.parent === receiver.object) return readPouch().position;
    pouch.updateWorldMatrix(true, true);
    receiver.object.updateWorldMatrix(true, true);
    const localPose = new THREE.Vector3(0, 0.8, 0.28),
      target = receiver.object.localToWorld(localPose.clone()),
      start = pouch.getWorldPosition(new THREE.Vector3()),
      localBounds = new THREE.Box3()
        .setFromObject(pouch)
        .applyMatrix4(pouch.matrixWorld.clone().invert()),
      receivingBounds = localBounds.clone().applyMatrix4(
        receiver.object.matrixWorld.clone().multiply(
          new THREE.Matrix4().makeTranslation(...localPose.toArray()),
        ),
      ),
      steps = Math.max(1, Math.ceil(start.distanceTo(target) / 0.08));
    for (let i = 0; i <= steps; i++) {
      const position = start.clone().lerp(target, i / steps),
        box = receivingBounds.clone().translate(position.sub(target));
      if (Math.max(Math.abs(box.min.x), Math.abs(box.max.x), Math.abs(box.min.z), Math.abs(box.max.z)) > 23)
        throw Error("收件員持袋位置越出現場邊界，請返回可交接的位置。");
      if (world.colliders.some((b) => b !== pouchBox &&
        box.min.x < b.max.x - 1e-6 && box.max.x > b.min.x + 1e-6 &&
        box.min.y < b.max.y - 1e-6 && box.max.y > b.min.y + 1e-6 &&
        box.min.z < b.max.z - 1e-6 && box.max.z > b.min.z + 1e-6))
        throw Error("信袋到奧林手邊的交接路徑被擋住，請從收件台前靠近。");
    }
    return target.toArray();
  }
  function receivePouch() {
    const target = preparePouchTransfer();
    if (pouch.parent === receiver.object) return readPouch();
    receiver.object.attach(pouch);
    pouch.position.copy(receiver.object.worldToLocal(new THREE.Vector3(...target)));
    pouch.quaternion.identity();
    pouch.scale.set(1, 1, 1);
    bounds(pouchBox, pouch);
    colliders.delete(pouchBox);
    world.colliders = world.colliders.filter((b) => b !== pouchBox);
    return readPouch();
  }
  function readPouch() {
    alive();
    const p = pouch.getWorldPosition(new THREE.Vector3());
    return {
      entityId: pouch.userData.entityId,
      position: p.toArray(),
      grounded: colliders.has(pouchBox),
      parentId: pouch.parent?.name || null,
      carrier: pouch.parent === receiver.object ? flow.receiver.id : null,
      ...readRoster(),
    };
  }
  function clearReply() {
    alive();
    pendingReply = null;
    lamp.rotation.z = 0;
    materials.lamp.emissiveIntensity = 0.12;
    marker.rotation.z = 0;
    replyPaper.count = 0;
    replyPaper.userData.records = [];
    delete replyPaper.userData.message;
  }
  function requestReply(value) {
    alive();
    if (
      !value ||
      !Number.isInteger(value.revision) ||
      value.revision < 0 ||
      !["messageId", "rosterId", "receiverId"].every(
        (k) => typeof value[k] === "string" && value[k].length,
      ) ||
      !Array.isArray(value.contentIds) ||
      !value.contentIds.length ||
      value.contentIds.length > 4 ||
      new Set(value.contentIds).size !== value.contentIds.length ||
      !value.contentIds.every((id) => typeof id === "string")
    )
      throw TypeError(
        "Reply needs a message identity, revision and one to four distinct paper records",
      );
    clearReply();
    pendingReply = {
      messageId: value.messageId,
      revision: value.revision,
      rosterId: value.rosterId,
      receiverId: value.receiverId,
      contentIds: [...value.contentIds],
    };
  }
  function update(dt) {
    alive();
    for (const binding of bindings.values()) {
      if (binding.boxAngle === binding.knife.rotation.x) continue;
      bounds(binding.box, binding.root);
      binding.boxAngle = binding.knife.rotation.x;
    }
    if (!Number.isFinite(dt) || dt <= 0 || !pendingReply) return false;
    const reply = pendingReply;
    pendingReply = null;
    replyPaper.userData.message = {
      messageId: reply.messageId,
      rosterId: reply.rosterId,
      receiverId: reply.receiverId,
    };
    replyPaper.userData.records = reply.contentIds.map((id) => ({ id }));
    replyPaper.count = reply.contentIds.length;
    replyMatrices.forEach((m, i) => replyPaper.setMatrixAt(i, m));
    replyPaper.instanceMatrix.needsUpdate = true;
    replyPaper.computeBoundingBox();
    replyPaper.computeBoundingSphere();
    lamp.rotation.z = 1.05;
    materials.lamp.emissiveIntensity = 0.65;
    marker.rotation.z = reply.revision * 0.08;
    group.updateWorldMatrix(true, true);
    return true;
  }
  function readReply() {
    alive();
    const message = replyPaper.userData.message;
    if (!message || !replyPaper.count) return null;
    const revision = marker.rotation.z / 0.08;
    if (Math.abs(revision - Math.round(revision)) > 1e-6) return null;
    return {
      ...message,
      revision: Math.round(revision),
      contentIds: readRecords(replyPaper, replyMatrices),
      lampAngle: lamp.rotation.z,
    };
  }
  function dispose() {
    if (disposed) return;
    disposed = true;
    world.solids = world.solids.filter((n) => !solids.has(n));
    world.colliders = world.colliders.filter((b) => !colliders.has(b));
    for (const node of solids) world.solidBoxes.delete(node);
    for (const b of bindings.values()) {
      b.knife.rotation.x = b.original;
      b.root.updateWorldMatrix(true, true);
    }
    for (const [m, before] of borrowedMaterials) Object.assign(m, before);
    // The pouch always belongs to this props owner, even while held by a borrowed
    // or owned receiver. Detach before actor disposal traverses its children.
    if (pouch.parent === receiver.object) group.attach(pouch);
    if (receiverOwned) {
      receiver.mixer.stopAllAction();
      receiver.mixer.uncacheRoot(receiver.visual);
      world.disposeObjects([receiver.object]);
      receiver.object.removeFromParent();
      world.actors = world.actors.filter((a) => a !== receiver);
    } else {
      receiver.position.copy(receiverBefore.position);
      receiver.object.name = receiverBefore.name;
      receiver.object.visible = receiverBefore.visible;
      for (const key of ["characterId", "missionActorId"])
        if (receiverBefore[key] === undefined)
          delete receiver.object.userData[key];
        else receiver.object.userData[key] = receiverBefore[key];
    }
    group.removeFromParent();
    for (const node of instances) node.dispose();
    for (const g of geometries) g.dispose();
    for (const m of ownMaterials) m.dispose();
    group.clear();
    bindings.clear();
  }
  setTraceBranch(true);
  clearReply();
  return {
    group,
    parts,
    anchors,
    receiver,
    pouch,
    pouchCollider: pouchBox,
    keys,
    bindField,
    readContacts,
    setChannel,
    readChannelAngle,
    setTraceBranch,
    readTraceBranchAngle,
    connectEndpoint,
    readEndpoint,
    pressKey,
    readKeyAngle,
    readRoster,
    readReceiverCode,
    setPouchPose,
    preparePouchTransfer,
    receivePouch,
    readPouch,
    requestReply,
    clearReply,
    update,
    readReply,
    dispose,
  };
}
