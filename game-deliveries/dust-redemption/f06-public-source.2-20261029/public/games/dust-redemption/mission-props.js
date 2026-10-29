/**
 * Original procedural frontier attachments; source-only until explicitly built.
 * Metres, +Y up, +Z facing. No textures, external models, DOM, timers or game state.
 * The injected World owns borrowed character textures; this view owns its clones.
 */
export function createMissionProps(THREE, world, flow) {
  if (!THREE?.BufferGeometry || !world?.solid || !flow?.routes)
    throw new TypeError(
      "Pass THREE, a loaded World and a mission flow definition",
    );
  const group = new THREE.Group();
  group.name = `mission-props-${flow.missionId}`;
  world.level.add(group);
  const palette = {
    wood: "#79583b",
    light: "#ad8855",
    dark: "#493b32",
    iron: "#414b4b",
    steel: "#8d9a90",
    brass: "#c3a35d",
    teal: "#397d7a",
    cream: "#e5d5a6",
    rust: "#a7553c",
  };
  const materials = {
    wood: new THREE.MeshStandardMaterial({
      vertexColors: true,
      roughness: 0.88,
      side: THREE.DoubleSide,
    }),
    metal: new THREE.MeshStandardMaterial({
      vertexColors: true,
      roughness: 0.5,
      metalness: 0.6,
      side: THREE.DoubleSide,
    }),
    query: new THREE.MeshBasicMaterial({ side: THREE.DoubleSide }),
  };
  // Inspection affects only the enclosure and moving gate leaves. Keep their
  // materials separate from receiving marks, medicine, platforms and switches.
  materials.fence = materials.wood.clone();
  materials.gateWood = materials.wood.clone();
  materials.gateMetal = materials.metal.clone();
  const inspectionMaterials = [
    materials.fence,
    materials.gateWood,
    materials.gateMetal,
  ];
  for (const material of inspectionMaterials) material.forceSinglePass = true;
  const ownedMaterials = new Set(Object.values(materials));
  const spareGeometries = new Set();
  const staticParts = { wood: [], metal: [] };
  const fenceParts = [];
  const solids = new Set(),
    colliders = new Set(),
    ownActors = new Set();
  const routes = new Map(),
    recipients = new Map(),
    anchors = {};
  let disposed = false;
  group.userData = {
    assetId: "dust-redemption.mission-props.dry-mail-v1",
    source: "games/dust-redemption/mission-props.js",
    provenance: {
      method: "original-procedural",
      rights: "Original project geometry; no external bitmap or font",
      textures: [],
    },
    units: "metres",
    up: "+Y",
    forward: "+Z",
    routes: {},
    collisionProxies: [],
    allocation: { clinic: 0, guard: 0, delivered: false },
    communicationConnected: true,
    inspectionActive: false,
    placement: {
      courtyard: { min: [-15.5, -7], max: [-6.5, -1] },
      porterFence: {
        from: [-23, 12],
        to: [-3, 12],
        unlockedBypass: "main road x > -2.5",
      },
      receivingPlatforms:
        "Non-solid ground frames only. Controller relocates the original receiving-pallet/collider.",
      exclusionPoints: Object.values(flow.routes).map((route) => [
        ...route.gatePosition,
      ]),
    },
  };
  const point = (value, y = 0) => new THREE.Vector3(value[0], y, value[1]);
  // One small instanced ground mesh; ordinary depth testing lets scenery hide
  // the marks. It never enters movement/shot solids or changes the scene state.
  const departureGeometry = new THREE.BufferGeometry();
  departureGeometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(
      [
        -0.22, 0, -0.1, -0.14, 0, -0.18, 0, 0, 0.02, -0.22, 0, -0.1, 0, 0, 0.02,
        0, 0, 0.2, 0, 0, 0.02, 0.14, 0, -0.18, 0.22, 0, -0.1, 0, 0, 0.02, 0.22,
        0, -0.1, 0, 0, 0.2,
      ],
      3,
    ),
  );
  departureGeometry.computeVertexNormals();
  const departureMaterial = new THREE.MeshBasicMaterial({
    color: 0x80beb0,
    side: THREE.DoubleSide,
    depthTest: true,
    depthWrite: true,
  });
  ownedMaterials.add(departureMaterial);
  const departureChevrons = new THREE.InstancedMesh(
    departureGeometry,
    departureMaterial,
    8,
  );
  departureChevrons.name = "departure-ground-chevrons";
  departureChevrons.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
  departureChevrons.count = 0;
  departureChevrons.visible = false;
  group.add(departureChevrons);
  const departureMatrix = new THREE.Matrix4();
  function setDepartureGuidance(chevrons = []) {
    assertLive();
    if (
      !Array.isArray(chevrons) ||
      !chevrons.every((p) => p && [p.x, p.z, p.yaw].every(Number.isFinite))
    )
      throw new TypeError("Pass finite departure chevrons");
    departureChevrons.count = Math.min(8, chevrons.length);
    departureChevrons.visible = departureChevrons.count > 0;
    for (let i = 0; i < departureChevrons.count; i++) {
      const p = chevrons[i];
      departureMatrix.makeRotationY(p.yaw).setPosition(p.x, 0.035, p.z);
      departureChevrons.setMatrixAt(i, departureMatrix);
    }
    departureChevrons.instanceMatrix.needsUpdate = true;
    if (departureChevrons.count) departureChevrons.computeBoundingSphere();
    return {
      visible: departureChevrons.visible,
      count: departureChevrons.count,
    };
  }
  const part = (size, position, color = "wood", rotation = [0, 0, 0], tag) => ({
    size,
    position,
    color,
    rotation,
    tag,
  });
  function geometry(parts) {
    const positions = [],
      normals = [],
      colors = [],
      uvs = [],
      tintIndices = [];
    for (const entry of parts) {
      const primitive = entry.path
        ? new THREE.TubeGeometry(
            new THREE.CatmullRomCurve3(
              entry.path.map((p) => new THREE.Vector3(...p)),
            ),
            12,
            0.018,
            6,
            false,
          )
        : new THREE.BoxGeometry(...entry.size);
      const g = primitive.toNonIndexed();
      g.applyMatrix4(
        new THREE.Matrix4().compose(
          new THREE.Vector3(...(entry.position || [0, 0, 0])),
          new THREE.Quaternion().setFromEuler(
            new THREE.Euler(...(entry.rotation || [0, 0, 0])),
          ),
          new THREE.Vector3(1, 1, 1),
        ),
      );
      const p = g.attributes.position,
        n = g.attributes.normal,
        uv = g.attributes.uv;
      const color = new THREE.Color(palette[entry.color] || entry.color);
      for (let i = 0; i < p.count; i++) {
        if (entry.tag === "allocation") tintIndices.push(colors.length / 3);
        positions.push(p.getX(i), p.getY(i), p.getZ(i));
        normals.push(n.getX(i), n.getY(i), n.getZ(i));
        uvs.push(uv.getX(i), uv.getY(i));
        colors.push(color.r, color.g, color.b);
      }
      g.dispose();
      primitive.dispose();
    }
    const result = new THREE.BufferGeometry();
    result.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(positions, 3),
    );
    result.setAttribute("normal", new THREE.Float32BufferAttribute(normals, 3));
    result.setAttribute("uv", new THREE.Float32BufferAttribute(uvs, 2));
    result.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));
    result.computeBoundingBox();
    result.computeBoundingSphere();
    result.userData.tintIndices = tintIndices;
    return result;
  }
  function mesh(name, parts, material, parent = group) {
    const node = new THREE.Mesh(geometry(parts), material);
    node.name = name;
    node.castShadow = true;
    node.receiveShadow = true;
    parent.add(node);
    return node;
  }
  function updateBox(box, object) {
    object.updateWorldMatrix(true, true);
    const bounds = new THREE.Box3().setFromObject(object),
      size = bounds.getSize(new THREE.Vector3()),
      center = bounds.getCenter(new THREE.Vector3());
    Object.assign(box, {
      x: center.x,
      z: center.z,
      w: size.x,
      h: size.y,
      d: size.z,
    });
    Object.assign(box.min, bounds.min);
    Object.assign(box.max, bounds.max);
    return box;
  }
  function solid(id, object, kind = "mission-prop") {
    const box = { id, kind, vaultable: false, min: {}, max: {} };
    updateBox(box, object);
    world.colliders.push(box);
    colliders.add(box);
    // Shared palette batches never enter foreground fade; original geometry
    // remains authoritative for shots independently of visual materials.
    world.solid(object, box, { occludes: false });
    object.traverse((node) => {
      if (node.isMesh) solids.add(node);
    });
    group.userData.collisionProxies.push(box);
    return box;
  }
  function fixed(id, wood, metal = [], collision = true, inspection = false) {
    if (inspection) fenceParts.push(...wood, ...metal);
    else {
      staticParts.wood.push(...wood);
      staticParts.metal.push(...metal);
    }
    if (collision) {
      // Identical primitive geometry to the rendered static batch, not a broad
      // invisible box used in place of actual fence rails/pickets for shots.
      const query = mesh(
        `${id}-shot-geometry`,
        [...wood, ...metal],
        materials.query,
      );
      query.visible = false;
      solid(id, query);
    }
  }
  function fence(id, a, b) {
    const dx = b[0] - a[0],
      dz = b[1] - a[1],
      length = Math.hypot(dx, dz);
    if (length < 0.05) return;
    const yaw = -Math.atan2(dz, dx),
      center = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
    const place = (x, y, z = 0) => [
      center[0] + Math.cos(yaw) * x + Math.sin(yaw) * z,
      y,
      center[1] - Math.sin(yaw) * x + Math.cos(yaw) * z,
    ];
    const wood = [0.43, 1.06].map((y) =>
      part([length, 0.16, 0.16], place(0, y), "dark", [0, yaw, 0]),
    );
    const count = Math.max(1, Math.ceil(length / 0.4));
    for (let i = 0; i <= count; i++)
      wood.push(
        part(
          [0.17, 1.5, 0.16],
          place(-length / 2 + (i * length) / count, 0.75),
          i % 3 ? "wood" : "light",
          [0, yaw, 0],
        ),
      );
    fixed(id, wood, [], true, true);
  }
  function routeGate(routeId, route) {
    const [x, z] = route.gatePosition,
      [width, height, depth] = route.gateSize;
    const pivot = new THREE.Group();
    pivot.name = route.gateId;
    pivot.position.set(x - width / 2, 0, z);
    group.add(pivot);
    const wood = [
      part([width, 0.17, depth], [width / 2, 0.43, 0], "dark"),
      part([width, 0.17, depth], [width / 2, 1.06, 0], "light"),
    ];
    const count = Math.ceil(width / 0.28);
    for (let i = 0; i < count; i++)
      wood.push(
        part(
          [width / count - 0.055, height - 0.16, depth * 0.55],
          [((i + 0.5) * width) / count, height / 2, 0],
          i % 3 ? "wood" : "light",
        ),
      );
    const diagonalLength = Math.hypot(width - 0.2, 0.7),
      diagonalAngle = Math.atan2(0.7, width - 0.2);
    wood.push(
      part(
        [diagonalLength, 0.11, 0.075],
        [width / 2, 0.75, depth / 2 + 0.025],
        "light",
        [0, 0, diagonalAngle],
      ),
    );
    mesh(`${route.gateId}-wood`, wood, materials.gateWood, pivot);
    mesh(
      `${route.gateId}-hardware`,
      [
        part([0.3, 0.07, depth + 0.05], [0.15, 0.43, 0], "iron"),
        part([0.3, 0.07, depth + 0.05], [0.15, 1.06, 0], "iron"),
        part(
          [0.22, 0.08, 0.1],
          [width - 0.18, 1.06, depth / 2 + 0.06],
          "brass",
        ),
      ],
      materials.gateMetal,
      pivot,
    );
    fixed(
      `${route.gateId}-left-post`,
      [
        part(
          [0.2, height + 0.14, depth + 0.08],
          [x - width / 2 - 0.1, (height + 0.14) / 2, z],
          "dark",
        ),
      ],
      [],
      true,
      true,
    );
    fixed(
      `${route.gateId}-right-post`,
      [
        part(
          [0.2, height + 0.14, depth + 0.08],
          [x + width / 2 + 0.1, (height + 0.14) / 2, z],
          "dark",
        ),
      ],
      [],
      true,
      true,
    );
    const box = solid(route.gateId, pivot, "mission-gate"),
      contract = {
        gateId: route.gateId,
        node: pivot.name,
        open: false,
        hinge: pivot.position.toArray(),
        handle: [x + width / 2 - 0.18, 1.06, z + depth / 2 + 0.06],
        closedBounds: { min: { ...box.min }, max: { ...box.max } },
      };
    pivot.rotation.y = Math.PI / 2;
    updateBox(box, pivot);
    contract.openBounds = { min: { ...box.min }, max: { ...box.max } };
    pivot.rotation.y = 0;
    updateBox(box, pivot);
    pivot.userData.routeId = routeId;
    pivot.userData.colliderId = route.gateId;
    group.userData.routes[routeId] = contract;
    anchors[routeId] = new THREE.Vector3(...contract.handle);
    routes.set(routeId, { pivot, box, contract });
  }
  for (const [id, route] of Object.entries(flow.routes)) routeGate(id, route);
  // Shared receiving courtyard, with two controlled openings in its south wall.
  const entrance = ["clinic-delivery", "aid-delivery"]
    .map((id) => flow.routes[id])
    .sort((a, b) => a.gatePosition[0] - b.gatePosition[0]);
  let end = -15.5;
  entrance.forEach((route, i) => {
    const start = route.gatePosition[0] - route.gateSize[0] / 2;
    fence(`receiving-south-${i}`, [end, -1], [start, -1]);
    end = route.gatePosition[0] + route.gateSize[0] / 2;
  });
  fence("receiving-south-end", [end, -1], [-6.5, -1]);
  fence("receiving-west", [-15.5, -1], [-15.5, -7]);
  fence("receiving-north", [-15.5, -7], [-6.5, -7]);
  fence("receiving-east", [-6.5, -7], [-6.5, -1]);
  const porter = flow.routes["porter-egress"];
  fence(
    "porter-west",
    [-23, 12],
    [porter.gatePosition[0] - porter.gateSize[0] / 2, 12],
  );
  fence(
    "porter-east",
    [porter.gatePosition[0] + porter.gateSize[0] / 2, 12],
    [-3, 12],
  );

  function cross(x, y, z, scale = 1, color = "teal") {
    return [
      part([0.28 * scale, 0.07 * scale, 0.045], [x, y, z], color),
      part([0.07 * scale, 0.28 * scale, 0.045], [x, y, z], color),
    ];
  }
  const boardPoint = flow.evidence["clinic-receiving-board"].hook.anchor;
  const [bx, bz] = boardPoint;
  fixed("clinic-receiving-board", [
    part([0.12, 1.5, 0.12], [bx, 0.75, bz], "dark"),
    part([1.1, 0.62, 0.1], [bx, 1.45, bz], "cream"),
    ...cross(bx - 0.24, 1.5, bz + 0.073),
    ...cross(bx + 0.24, 1.5, bz + 0.073),
    part([0.7, 0.045, 0.04], [bx, 1.22, bz + 0.073], "rust"),
  ]);
  anchors.receivingBoard = new THREE.Vector3(bx, 1.45, bz + 0.1);
  const receivingFocus = new THREE.Object3D();
  receivingFocus.name = "receiving-board";
  receivingFocus.position.copy(anchors.receivingBoard);
  receivingFocus.userData.role = "camera-focus-anchor-for-batched-board";
  group.add(receivingFocus);
  group.userData.receivingMark = "double-blue-cross";

  for (const [id, recipient] of Object.entries(flow.recipients)) {
    const [x, z] = recipient.position;
    // Thin, non-solid frame only: the existing receiving-pallet is controller-owned.
    fixed(
      `${id}-ground-frame`,
      [
        part([1.6, 0.025, 0.07], [x, 0.025, z - 0.55], "cream"),
        part([1.6, 0.025, 0.07], [x, 0.025, z + 0.55], "cream"),
        part([0.07, 0.025, 1.1], [x - 0.8, 0.025, z], "teal"),
        part([0.07, 0.025, 1.1], [x + 0.8, 0.025, z], "teal"),
      ],
      [],
      false,
    );
    anchors[id] = point(recipient.position, 0.1);
    const actor = world.actor(
      id === "clinic-receiver" ? "npc-mara" : "npc-elias",
      x,
      z - 1.15,
    );
    actor.object.userData.missionActorId = id;
    ownActors.add(actor);
    recipients.set(id, actor);
  }
  const worker = world.actor("npc-sol", ...flow.worker.position);
  worker.object.userData.missionActorId = flow.worker.id;
  ownActors.add(worker);
  anchors.worker = point(flow.worker.position, 1.05);
  anchors.workerSafe = point(flow.worker.safePosition, 0.1);

  const [cx, cz] = flow.communication.position;
  fixed(
    `${flow.communication.id}-stand`,
    [
      part([0.12, 1.55, 0.13], [cx, 0.775, cz - 0.5], "dark"),
      part([0.55, 0.45, 0.16], [cx, 1.13, cz - 0.5], "wood"),
    ],
    [
      part([0.43, 0.06, 0.09], [cx, 1.13, cz - 0.38], "steel"),
      part([0.09, 0.09, 0.09], [cx - 0.17, 1.13, cz - 0.31], "brass"),
      part([0.09, 0.09, 0.09], [cx + 0.17, 1.13, cz - 0.31], "brass"),
    ],
  );
  const cableConnected = geometry([
    {
      path: [
        [cx - 0.65, 1.55, cz - 0.5],
        [cx - 0.17, 1.13, cz - 0.31],
        [cx + 0.17, 1.13, cz - 0.31],
        [cx + 0.65, 1.55, cz - 0.5],
      ],
      color: "iron",
    },
  ]);
  const cableCut = geometry([
    {
      path: [
        [cx - 0.65, 1.55, cz - 0.5],
        [cx - 0.25, 1.13, cz - 0.31],
        [cx - 0.12, 0.93, cz - 0.28],
      ],
      color: "iron",
    },
    {
      path: [
        [cx + 0.12, 0.93, cz - 0.28],
        [cx + 0.25, 1.13, cz - 0.31],
        [cx + 0.65, 1.55, cz - 0.5],
      ],
      color: "iron",
    },
  ]);
  spareGeometries.add(cableConnected);
  spareGeometries.add(cableCut);
  const wire = new THREE.Mesh(cableConnected, materials.metal);
  wire.name = flow.communication.id + "-wire";
  group.add(wire);
  const lever = mesh(
    flow.communication.id + "-switch",
    [
      part([0.07, 0.28, 0.075], [0, 0.1, 0], "brass"),
      part([0.15, 0.09, 0.11], [0, 0.25, 0], "rust"),
    ],
    materials.metal,
  );
  lever.position.set(cx, 1.06, cz - 0.25);
  lever.rotation.z = -0.55;
  anchors.communication = new THREE.Vector3(cx, 1.13, cz - 0.25);
  group.userData.communication = {
    id: flow.communication.id,
    wire: wire.name,
    switch: lever.name,
    anchor: anchors.communication.toArray(),
  };

  const unitParts = [
    part([0.38, 0.24, 0.32], [0, 0.12, 0], "cream"),
    part([0.4, 0.055, 0.34], [0, 0.23, 0], "light"),
    part([0.08, 0.25, 0.325], [0, 0.125, 0], "teal", [0, 0, 0], "allocation"),
    part([0.22, 0.06, 0.035], [0, 0.13, 0.18], "teal", [0, 0, 0], "allocation"),
  ];
  const units = Array.from({ length: 2 }, (_, i) => {
    const material = materials.wood.clone();
    ownedMaterials.add(material);
    const node = mesh(`medicine-unit-${i}`, unitParts, material);
    node.visible = false;
    node.userData = { units: 1, recipient: null, delivered: false };
    return node;
  });
  mesh("mission-static-wood", staticParts.wood, materials.wood);
  mesh("mission-static-metal", staticParts.metal, materials.metal);
  mesh("mission-fences", fenceParts, materials.fence);
  group.updateWorldMatrix(true, true);

  function assertLive() {
    if (disposed) throw new Error("Mission props have been disposed");
  }
  function setInspection(active) {
    assertLive();
    if (typeof active !== "boolean")
      throw new TypeError("Inspection state must be boolean");
    if (group.userData.inspectionActive === active) return;
    for (const material of inspectionMaterials) {
      material.transparent = active;
      material.opacity = active ? 0.14 : 1;
      material.depthWrite = !active;
      material.needsUpdate = true;
    }
    group.userData.inspectionActive = active;
  }
  function setRouteState(routeId, open) {
    assertLive();
    const route = routes.get(routeId);
    if (!route || typeof open !== "boolean")
      throw new TypeError("Unknown route or non-boolean gate state");
    route.pivot.rotation.y = open ? Math.PI / 2 : 0;
    updateBox(route.box, route.pivot);
    route.contract.open = open;
    route.pivot.userData.open = open;
    anchors[routeId].copy(
      route.pivot.localToWorld(
        new THREE.Vector3(
          flow.routes[routeId].gateSize[0] - 0.18,
          1.06,
          flow.routes[routeId].gateSize[2] / 2 + 0.06,
        ),
      ),
    );
  }
  function setCommunication(connected) {
    assertLive();
    if (typeof connected !== "boolean")
      throw new TypeError("Communication state must be boolean");
    wire.geometry = connected ? cableConnected : cableCut;
    lever.rotation.z = connected ? -0.55 : 0.9;
    group.userData.communicationConnected = connected;
    group.updateWorldMatrix(true, true);
  }
  function readCommunicationSnapshot() {
    assertLive();
    // Geometry and lever pose are the evidence. Metadata is descriptive only.
    const cableConnectedNow = wire.geometry === cableConnected;
    let visible = true;
    for (let node = lever; node; node = node.parent) visible &&= node.visible;
    for (let node = wire; node; node = node.parent) visible &&= node.visible;
    return {
      sourceId: flow.communication.id,
      leverAngle: lever.rotation.z,
      connected:
        visible &&
        cableConnectedNow &&
        Math.abs(lever.rotation.z + 0.55) <= 0.01,
      cableConnected: visible && cableConnectedNow,
    };
  }
  function setAllocation(allocation, { delivered = false } = {}) {
    assertLive();
    const { clinic, guard } = allocation || {};
    if (
      ![clinic, guard].every((n) => Number.isInteger(n) && n >= 0 && n <= 2) ||
      ![0, 2].includes(clinic + guard) ||
      typeof delivered !== "boolean" ||
      (delivered && clinic + guard !== 2)
    )
      throw new TypeError("Allocation must conserve the two medicine units");
    group.userData.allocation = { clinic, guard, delivered };
    const selected = guard ? "joint-aid-receiver" : "clinic-receiver";
    const [x, z] = flow.recipients[selected].position;
    const side = guard ? 1 : -1;
    units.forEach((unit, index) => {
      const recipient = index < clinic ? "clinic" : "guard";
      unit.visible = clinic + guard === 2;
      unit.position.set(x + side * 1.1 + (index - 0.5) * 0.46, 0.035, z - 0.75);
      unit.userData.recipient = unit.visible ? recipient : null;
      unit.userData.delivered = delivered;
      unit.material.transparent = !delivered;
      unit.material.opacity = delivered ? 1 : 0.28;
      unit.material.depthWrite = delivered;
      const color = new THREE.Color(
        recipient === "clinic" ? palette.teal : palette.rust,
      );
      const attribute = unit.geometry.attributes.color;
      for (const i of unit.geometry.userData.tintIndices)
        attribute.setXYZ(i, color.r, color.g, color.b);
      attribute.needsUpdate = true;
    });
    group.updateWorldMatrix(true, true);
  }
  function dispose() {
    if (disposed) return;
    disposed = true;
    world.solids = world.solids.filter((node) => !solids.has(node));
    world.colliders = world.colliders.filter((box) => !colliders.has(box));
    for (const node of solids) world.solidBoxes.delete(node);
    for (const actor of ownActors) {
      actor.mixer.stopAllAction();
      actor.mixer.uncacheRoot(actor.visual);
      world.disposeObjects([actor.object]);
      actor.object.removeFromParent();
    }
    world.actors = world.actors.filter((actor) => !ownActors.has(actor));
    // Own geometries/materials only; no shared character textures or scene sun.
    const geometries = new Set(spareGeometries);
    group.traverse((node) => {
      if (node.geometry) geometries.add(node.geometry);
    });
    group.removeFromParent();
    departureChevrons.dispose();
    for (const resource of geometries) resource.dispose();
    for (const material of ownedMaterials) material.dispose();
    group.clear();
    solids.clear();
    colliders.clear();
    ownActors.clear();
  }
  return {
    group,
    worker,
    recipients,
    anchors,
    parts: {
      communicationLever: lever,
      communicationWire: wire,
      departureChevrons,
    },
    setDepartureGuidance,
    setInspection,
    setRouteState,
    setCommunication,
    readCommunicationSnapshot,
    setAllocation,
    dispose,
  };
}
