/** Source-only original procedural water attachments. Metres, +Y up, +Z facing.
 * No DOM/textures/timers/rules imports. World owns borrowed GLB textures.
 * Controller supplies all occupants during deferred ford closure and owns NPC travel.
 */
export function createWaterProps(THREE, world, flow) {
  if (!THREE?.BufferGeometry || !world?.solid || !flow?.routes?.["west-ford"])
    throw new TypeError("Pass THREE, a loaded World and the broken-water flow");
  const existingWitnesses = world.actors.filter(
    (actor) =>
      actor.name === "npc-june" || actor.object.userData.characterId === "inez",
  );
  if (existingWitnesses.length > 1)
    throw new Error(
      "More than one Inez actor exists; controller must resolve duplicates before creating water props",
    );
  const group = new THREE.Group();
  group.name = "water-mission-props";
  world.level.add(group);
  const palette = {
    stone: "#a87450",
    lightStone: "#ba8c63",
    darkStone: "#795640",
    wood: "#79583b",
    cream: "#e5d5a6",
    iron: "#414b4b",
    brass: "#c3a35d",
    teal: "#397d7a",
    blue: "#558f95",
    rust: "#a7553c",
    green: "#8b947d",
  };
  const mats = {
    stone: new THREE.MeshStandardMaterial({
      vertexColors: true,
      roughness: 0.96,
    }),
    wood: new THREE.MeshStandardMaterial({
      vertexColors: true,
      roughness: 0.88,
    }),
    metal: new THREE.MeshStandardMaterial({
      vertexColors: true,
      roughness: 0.5,
      metalness: 0.6,
    }),
    water: new THREE.MeshStandardMaterial({
      color: palette.teal,
      roughness: 0.34,
      transparent: true,
      opacity: 0.76,
      depthWrite: false,
    }),
    meter: new THREE.MeshStandardMaterial({
      color: palette.blue,
      roughness: 0.4,
    }),
    query: new THREE.MeshBasicMaterial({ side: THREE.DoubleSide }),
  };
  for (const material of Object.values(mats)) {
    material.side = THREE.DoubleSide;
    material.forceSinglePass = true;
  }
  const ownGeometries = new Set(),
    ownMaterials = new Set(Object.values(mats));
  const solids = new Set(),
    colliders = new Set(),
    stationary = { stone: [], wood: [], metal: [] };
  const parts = {},
    anchors = {},
    meters = new Map(),
    controls = new Map();
  const channels = [
    { id: "river-west", a: [-24, 0], b: [-14.9, 0] },
    { id: "river-ford-east", a: [-11.1, 0], b: [-9.8, 0] },
    { id: "river-west-bend", a: [-9.8, 0], b: [-9.8, -4.7] },
    { id: "river-north-reach", a: [-9.8, -4.7], b: [0, -4.7] },
    { id: "river-east-bend", a: [0, -4.7], b: [0, 0] },
    { id: "river-bridge-west", a: [0, 0], b: [10.1, 0] },
    { id: "river-east", a: [13.9, 0], b: [24, 0] },
  ];
  const ford = flow.routes["west-ford"],
    [fx, fz] = ford.gatePosition;
  const [fw, , fd] = ford.gateSize;
  let disposed = false,
    targetOpen = false,
    actualOpen = false,
    pendingClose = false,
    selectedRecipient = null;
  let lastControlSnapshot = "",
    distributionValidated = false;
  group.userData = {
    assetId: "dust-redemption.water-props.v1",
    version: "1.0.0",
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
    placement: {
      channels,
      eastBridge: { center: [12, 0], width: 3.8, alwaysOpen: true },
      exclusionPoints: [
        [-13, 0],
        [12, 0],
        ...flow.routes["east-bridge"].path,
        ...flow.routes["west-ford"].path,
      ],
      reserve:
        "Controller moves the single original FieldSystem reserve; frames add no solids or second bucket.",
    },
  };
  const boxPart = (size, position, color = "wood", rotation = [0, 0, 0]) => ({
    size,
    position,
    color,
    rotation,
  });
  function geo(entries) {
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
    const result = new THREE.BufferGeometry();
    result.setAttribute("position", new THREE.Float32BufferAttribute(p, 3));
    result.setAttribute("normal", new THREE.Float32BufferAttribute(n, 3));
    result.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));
    result.setAttribute("color", new THREE.Float32BufferAttribute(c, 3));
    result.computeBoundingBox();
    result.computeBoundingSphere();
    ownGeometries.add(result);
    return result;
  }
  function mesh(name, entries, material, parent = group) {
    const node = new THREE.Mesh(geo(entries), material);
    node.name = name;
    node.castShadow = material !== mats.water;
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
  function solid(id, object, movement = true, kind = "water-bank") {
    const box = bounds(
      { id, kind, vaultable: false, min: {}, max: {} },
      object,
    );
    world.solid(object, box, { occludes: false });
    object.traverse((node) => {
      if (node.isMesh) solids.add(node);
    });
    if (movement) {
      colliders.add(box);
      world.colliders.push(box);
    }
    group.userData.collisionProxies.push(box);
    return box;
  }
  function fixed(id, type, entries, movement = true) {
    stationary[type].push(...entries);
    if (movement !== null) {
      const query = mesh(`${id}-query`, entries, mats.query);
      query.visible = false;
      solid(id, query, movement);
    }
  }
  const riverSurfaces = [];
  for (const channel of channels) {
    const horizontal = channel.a[1] === channel.b[1],
      length = Math.hypot(
        channel.b[0] - channel.a[0],
        channel.b[1] - channel.a[1],
      );
    const x = (channel.a[0] + channel.b[0]) / 2,
      z = (channel.a[1] + channel.b[1]) / 2;
    const stones = [];
    for (const side of [-1, 1]) {
      stones.push(
        boxPart(
          horizontal ? [length + 0.1, 0.5, 0.24] : [0.24, 0.5, length + 0.1],
          [
            x + (horizontal ? 0 : side * 0.75),
            0.25,
            z + (horizontal ? side * 0.75 : 0),
          ],
          "darkStone",
        ),
      );
      const count = Math.ceil(length / 0.85);
      for (let i = 0; i < count; i++) {
        const along = -length / 2 + ((i + 0.5) * length) / count;
        stones.push(
          boxPart(
            horizontal
              ? [length / count, 0.26, 0.29]
              : [0.29, 0.26, length / count],
            [
              x + (horizontal ? along : side * 0.75),
              0.5 + (i % 2) * 0.025,
              z + (horizontal ? side * 0.75 : along),
            ],
            i % 3 ? "stone" : "lightStone",
          ),
        );
      }
    }
    fixed(channel.id, "stone", stones);
    riverSurfaces.push(
      boxPart(
        horizontal ? [length + 0.1, 0.06, 1.5] : [1.5, 0.06, length + 0.1],
        [x, 0.04, z],
        "teal",
      ),
    );
  }
  // The bridge is a walkable opening in movement proxies, with true low deck/rail shot meshes.
  const bridge = [];
  for (let z = -1.8; z <= 1.81; z += 0.3)
    bridge.push(boxPart([3.8, 0.08, 0.27], [12, 0, z], "wood"));
  fixed("east-bridge-deck", "wood", bridge, false);
  for (const side of [-1, 1]) {
    const rail = [boxPart([0.16, 0.16, 4], [12 + side * 2, 1.05, 0], "wood")];
    for (const z of [-1.8, -0.6, 0.6, 1.8])
      rail.push(boxPart([0.18, 1.14, 0.18], [12 + side * 2, 0.57, z], "wood"));
    fixed(`east-bridge-${side < 0 ? "west" : "east"}-rail`, "wood", rail);
  }
  riverSurfaces.push(boxPart([3.8, 0.04, 1.5], [12, 0.01, 0], "teal"));
  mesh("river-water", riverSurfaces, mats.water);
  const fordWater = mesh(
    ford.gateId,
    [boxPart([fw, 1, fd], [0, 0.5, 0], "teal")],
    mats.water,
  );
  fordWater.position.set(fx, 0, fz);
  fordWater.scale.y = ford.closedWaterLevel;
  const fordBox = solid(ford.gateId, fordWater, true, "water-level-barrier");
  parts.ford = fordWater;
  for (const side of [-1, 1]) {
    const x = fx + side * (fw / 2 + 0.15);
    fixed(`ford-depth-post-${side}`, "wood", [
      boxPart([0.13, 1.5, 0.13], [x, 0.75, fz], "wood"),
      ...[0.25, 0.5, 0.75, 1, 1.2].map((y) =>
        boxPart([0.24, 0.035, 0.16], [x, y, fz], y === 0.25 ? "cream" : "rust"),
      ),
    ]);
  }
  anchors["west-ford"] = new THREE.Vector3(fx, 0.3, fz);
  anchors["east-bridge"] = new THREE.Vector3(12, 0.2, 0);

  // Four separate live columns plus five physically conserved main-water blocks.
  const [tx, tz] = flow.tasks["water-allocation"].position;
  const meterKeys = ["clinic", "settlement", "mine", "bypass"],
    meterBaseY = 1.15,
    unitHeight = 0.16;
  const board = [boxPart([2.5, 0.06, 0.14], [tx, 1.09, tz - 0.7], "brass")];
  const frame = [boxPart([2.55, 1.2, 0.12], [tx, 1.7, tz - 0.83], "wood")];
  const colors = ["teal", "green", "rust", "brass"];
  for (let i = 0; i < 4; i++) {
    const key = meterKeys[i],
      x = tx - 0.9 + i * 0.6;
    for (let mark = 0; mark <= 5; mark++)
      board.push(
        boxPart(
          [0.37, 0.025, 0.06],
          [x, meterBaseY + mark * unitHeight, tz - 0.63],
          "cream",
        ),
      );
    // Distinct geometry marks: cross / house roof / mine picks / right turn.
    if (i === 0)
      board.push(
        boxPart([0.22, 0.05, 0.05], [x, 2.19, tz - 0.6], colors[i]),
        boxPart([0.05, 0.22, 0.05], [x, 2.19, tz - 0.6], colors[i]),
      );
    if (i === 1)
      board.push(
        boxPart([0.2, 0.045, 0.05], [x - 0.06, 2.23, tz - 0.6], colors[i], [
          0,
          0,
          Math.PI / 4,
        ]),
        boxPart([0.2, 0.045, 0.05], [x + 0.06, 2.23, tz - 0.6], colors[i], [
          0,
          0,
          -Math.PI / 4,
        ]),
        boxPart([0.19, 0.13, 0.05], [x, 2.12, tz - 0.6], colors[i]),
      );
    if (i === 2)
      board.push(
        boxPart([0.28, 0.045, 0.05], [x, 2.19, tz - 0.6], colors[i], [
          0,
          0,
          Math.PI / 4,
        ]),
        boxPart([0.28, 0.045, 0.05], [x, 2.19, tz - 0.6], colors[i], [
          0,
          0,
          -Math.PI / 4,
        ]),
      );
    if (i === 3)
      board.push(
        boxPart([0.24, 0.05, 0.05], [x, 2.19, tz - 0.6], colors[i]),
        boxPart([0.12, 0.05, 0.05], [x + 0.08, 2.23, tz - 0.6], colors[i], [
          0,
          0,
          -Math.PI / 4,
        ]),
      );
    const column = mesh(
      `water-meter-${key}`,
      [boxPart([0.22, 1, 0.08], [0, 0.5, 0], colors[i])],
      mats.meter,
    );
    column.position.set(x, meterBaseY, tz - 0.56);
    column.scale.y = 0;
    column.visible = false;
    column.userData = { physicalMeter: key, unitHeight, baseY: meterBaseY };
    meters.set(key, column);
    parts[`meter-${key}`] = column;
    anchors[key] = new THREE.Vector3(x, 1.7, tz - 0.5);
  }
  fixed("water-distribution-meter-frame", "wood", frame, false);
  fixed("water-distribution-scale-marks", "metal", board, false);
  const lever = mesh(
    "maintenance-diverter",
    [
      boxPart([0.07, 0.4, 0.08], [0, 0.18, 0], "brass"),
      boxPart([0.2, 0.09, 0.12], [0, 0.4, 0], "rust"),
    ],
    mats.metal,
  );
  lever.position.set(tx + 1.35, 1.05, tz + 0.1);
  fixed(
    "maintenance-diverter-mount",
    "metal",
    [
      boxPart([0.5, 0.2, 0.2], [tx + 1.35, 1.03, tz], "iron"),
      boxPart([0.09, 0.8, 0.09], [tx + 1.35, 0.6, tz], "iron"),
      boxPart([0.06, 0.14, 0.08], [tx + 1.1, 1.45, tz], "cream"),
      boxPart([0.06, 0.14, 0.08], [tx + 1.6, 1.45, tz], "cream"),
    ],
    false,
  );
  parts["maintenance-diverter"] = lever;
  controls.set("maintenance-diverter", lever);
  lever.userData.waterControl = { detentAngles: [-0.65, 0.65] };
  anchors.diverter = lever.position.clone();
  anchors.distribution = new THREE.Vector3(tx, 1.7, tz - 0.56);
  const focus = new THREE.Object3D();
  focus.name = "water-distribution-board";
  focus.position.copy(anchors.distribution);
  group.add(focus);
  const unitsGeometry = geo([boxPart([0.13, 0.1, 0.13], [0, 0.05, 0], "blue")]);
  const supplyUnits = new THREE.InstancedMesh(unitsGeometry, mats.meter, 5);
  supplyUnits.name = "main-supply-five-units";
  supplyUnits.castShadow = true;
  group.add(supplyUnits);
  parts.supplyUnits = supplyUnits;
  const inlet = new THREE.Vector3(tx, 2.48, tz - 0.65);
  fixed(
    "inlet-five-unit-rack",
    "wood",
    [
      boxPart([1.15, 0.08, 0.22], [tx, 2.45, tz - 0.65], "wood"),
      ...Array.from({ length: 6 }, (_, i) =>
        boxPart(
          [0.035, 0.18, 0.2],
          [tx - 0.525 + i * 0.21, 2.55, tz - 0.65],
          "cream",
        ),
      ),
    ],
    false,
  );
  anchors.inlet = inlet.clone();

  // Non-solid receiving/reserve outlines. The existing reserve remains one object.
  function groundFrame(id, position, color) {
    const [x, z] = position;
    fixed(
      id,
      "wood",
      [
        boxPart([1.4, 0.025, 0.05], [x, 0.025, z - 0.5], color),
        boxPart([1.4, 0.025, 0.05], [x, 0.025, z + 0.5], color),
        boxPart([0.05, 0.025, 1], [x - 0.7, 0.025, z], color),
        boxPart([0.05, 0.025, 1], [x + 0.7, 0.025, z], color),
      ],
      null,
    );
  }
  for (const [id, recipient] of Object.entries(flow.recipients)) {
    groundFrame(id, recipient.position, "cream");
    anchors[id] = new THREE.Vector3(
      recipient.position[0],
      0.1,
      recipient.position[1],
    );
  }
  for (const [id, station] of Object.entries(flow.reserve.stations)) {
    groundFrame(id, station.position, "teal");
    anchors[id] = new THREE.Vector3(
      station.position[0],
      0.1,
      station.position[1],
    );
  }
  const ownedWitness = !existingWitnesses.length;
  const witness =
    existingWitnesses[0] ||
    world.actor("npc-june", ...flow.recipients["east-water-witness"].position);
  const witnessBefore = {
    position: witness.position.clone(),
    name: witness.object.name,
    visible: witness.object.visible,
    characterId: witness.object.userData.characterId,
    missionActorId: witness.object.userData.missionActorId,
  };
  witness.object.name = "npc-inez__actor";
  witness.object.userData.characterId = "inez";
  witness.object.userData.missionActorId = "water-witness";
  witness.object.visible = false;
  for (const [type, entries] of Object.entries(stationary))
    mesh(`water-static-${type}`, entries, mats[type]);

  function live() {
    if (disposed) throw new Error("Water props have been disposed");
  }
  function readDetent(node, angles) {
    if (!node) return null;
    const match = angles.findIndex(
      (angle) => Math.abs(node.rotation.z - angle) < 0.01,
    );
    return match < 0 ? null : match;
  }
  function readValveValues() {
    live();
    const result = {};
    for (const key of ["bypass-wheel", "clinic", "homes", "mine"])
      result[key] = readDetent(
        controls.get(key),
        Array.from(
          { length: key === "bypass-wheel" ? 3 : 4 },
          (_, i) => (i * Math.PI) / 2,
        ),
      );
    result["maintenance-diverter"] = readDetent(
      lever,
      lever.userData.waterControl.detentAngles,
    );
    return result;
  }
  function readMeterValues() {
    live();
    const result = {};
    for (const [key, column] of meters) {
      const value = column.scale.y / unitHeight,
        rounded = Math.round(value);
      if (
        Math.abs(value - rounded) > 0.01 ||
        rounded < 0 ||
        rounded > 5 ||
        Math.abs(column.position.y - meterBaseY) > 0.01 ||
        Math.abs(column.rotation.x) +
          Math.abs(column.rotation.y) +
          Math.abs(column.rotation.z) >
          0.01 ||
        column.visible !== rounded > 0
      )
        return null;
      result[key] = rounded;
    }
    return result;
  }
  function setDistribution(validated = false) {
    live();
    if (typeof validated !== "boolean")
      throw new TypeError(
        "Distribution accepts a validation flag, not canonical water quantities",
      );
    const read = readMeterValues();
    if (
      validated &&
      (!read || Object.values(read).reduce((a, b) => a + b, 0) !== 5)
    )
      throw new Error("Current physical meters do not conserve five units");
    distributionValidated = validated;
    const positions = [];
    if (validated)
      for (const key of meterKeys)
        for (let i = 0; i < read[key]; i++)
          positions.push({
            key,
            point: new THREE.Vector3(
              meters.get(key).position.x,
              meterBaseY + 0.04 + i * 0.15,
              tz - 0.4,
            ),
          });
    else
      for (let i = 0; i < 5; i++)
        positions.push({
          key: "inlet",
          point: inlet.clone().add(new THREE.Vector3((i - 2) * 0.21, 0, 0)),
        });
    positions.forEach(({ point }, index) =>
      supplyUnits.setMatrixAt(
        index,
        new THREE.Matrix4().makeTranslation(point.x, point.y, point.z),
      ),
    );
    supplyUnits.instanceMatrix.needsUpdate = true;
    supplyUnits.computeBoundingSphere();
    supplyUnits.userData.units = positions.map(({ key }) => key);
    group.userData.distribution = {
      validated,
      mainUnits: 5,
      reserveUnits: "owned by original FieldSystem",
      destinations: [...supplyUnits.userData.units],
    };
    return {
      ...group.userData.distribution,
      destinations: [...group.userData.distribution.destinations],
    };
  }
  function refreshMeters() {
    live();
    const values = readValveValues(),
      snapshot = JSON.stringify(values);
    if (snapshot !== lastControlSnapshot) setDistribution(false);
    lastControlSnapshot = snapshot;
    const safe =
      Object.values(values).every(Number.isInteger) &&
      values["bypass-wheel"] === 1 &&
      values.homes >= values["maintenance-diverter"] &&
      values.clinic + values.homes + values.mine === 5;
    const readings = safe
      ? {
          clinic: values.clinic,
          settlement: values.homes - values["maintenance-diverter"],
          mine: values.mine,
          bypass: values["maintenance-diverter"],
        }
      : { clinic: 0, settlement: 0, mine: 0, bypass: 0 };
    for (const [key, column] of meters) {
      column.scale.y = readings[key] * unitHeight;
      column.visible = readings[key] > 0;
    }
    group.updateWorldMatrix(true, true);
    return readMeterValues();
  }
  function bindControls(nodes) {
    live();
    for (const key of ["bypass-wheel", "clinic", "homes", "mine"]) {
      if (!nodes?.[key]?.isObject3D)
        throw new TypeError(`Missing actual FieldSystem part: ${key}`);
    }
    for (const key of ["bypass-wheel", "clinic", "homes", "mine"])
      controls.set(key, nodes[key]);
    return refreshMeters();
  }
  function setLeverDetent(value) {
    live();
    if (![0, 1].includes(value))
      throw new TypeError("Diverter detent must be 0 or 1");
    lever.rotation.z = lever.userData.waterControl.detentAngles[value];
    refreshMeters();
    return readValveValues()["maintenance-diverter"];
  }
  function snapshotRoute() {
    return {
      targetOpen,
      open: actualOpen,
      pendingClose,
      waterLevel: fordWater.scale.y,
      colliderActive: world.colliders.includes(fordBox),
      egressOccupants: [
        ...(group.userData.routes["west-ford"]?.egressOccupants || []),
      ],
    };
  }
  function overlapOccupants(occupants) {
    if (!Array.isArray(occupants))
      throw new TypeError("Pass the complete current occupant array");
    return occupants
      .filter((occupant, index) => {
        const p = occupant.position || occupant,
          x = Array.isArray(p) ? p[0] : p.x,
          z = Array.isArray(p) ? p[1] : p.z,
          r = occupant.radius ?? 0.34;
        if (![x, z, r].every(Number.isFinite) || r < 0)
          throw new TypeError(`Invalid occupant ${index}`);
        return (
          x + r > fx - fw / 2 - 1e-5 &&
          x - r < fx + fw / 2 + 1e-5 &&
          z + r > fz - fd / 2 - 1e-5 &&
          z - r < fz + fd / 2 + 1e-5
        );
      })
      .map((occupant, index) => String(occupant.id ?? index));
  }
  function applyFord(open) {
    actualOpen = open;
    fordWater.scale.y = open ? ford.openWaterLevel : ford.closedWaterLevel;
    bounds(fordBox, fordWater);
    if (open)
      world.colliders = world.colliders.filter((box) => box !== fordBox);
    else if (!world.colliders.includes(fordBox)) world.colliders.push(fordBox);
  }
  function setRouteState(routeId, open, { occupants = [] } = {}) {
    live();
    if (routeId === "east-bridge") {
      if (open !== true) throw new Error("The east bridge is always open");
      return { open: true, pendingClose: false };
    }
    if (routeId !== "west-ford" || typeof open !== "boolean")
      throw new TypeError("Unknown route or non-boolean state");
    targetOpen = open;
    const overlapping = overlapOccupants(occupants);
    pendingClose = !open && actualOpen && overlapping.length > 0;
    if (!pendingClose) applyFord(open);
    group.userData.routes["west-ford"] = {
      targetOpen,
      open: actualOpen,
      pendingClose,
      egressOccupants: pendingClose ? overlapping : [],
    };
    return snapshotRoute();
  }
  function updateClosure(occupants) {
    live();
    return setRouteState("west-ford", targetOpen, { occupants });
  }
  function setRecipient(id) {
    live();
    const recipient = flow.recipients[id];
    if (!recipient) throw new TypeError("Unknown water witness recipient");
    // One existing actor is positioned once on commitment; later travel belongs to controller.
    if (selectedRecipient && selectedRecipient !== id)
      throw new Error("Witness recipient is already selected");
    if (!selectedRecipient)
      witness.position.set(recipient.position[0], 0, recipient.position[1]);
    selectedRecipient = id;
    witness.object.visible = true;
    group.userData.recipientId = id;
    return witness;
  }
  function dispose() {
    if (disposed) return;
    disposed = true;
    world.solids = world.solids.filter((node) => !solids.has(node));
    world.colliders = world.colliders.filter((box) => !colliders.has(box));
    for (const node of solids) world.solidBoxes.delete(node);
    if (ownedWitness) {
      witness.mixer.stopAllAction();
      witness.mixer.uncacheRoot(witness.visual);
      world.disposeObjects([witness.object]);
      witness.object.removeFromParent();
      world.actors = world.actors.filter((actor) => actor !== witness);
    } else {
      witness.position.copy(witnessBefore.position);
      witness.object.name = witnessBefore.name;
      witness.object.visible = witnessBefore.visible;
      for (const key of ["characterId", "missionActorId"]) {
        if (witnessBefore[key] === undefined)
          delete witness.object.userData[key];
        else witness.object.userData[key] = witnessBefore[key];
      }
    }
    group.removeFromParent();
    supplyUnits.dispose();
    for (const resource of ownGeometries) resource.dispose();
    for (const material of ownMaterials) material.dispose();
    group.clear();
    controls.clear();
    solids.clear();
    colliders.clear();
  }
  setLeverDetent(0);
  setDistribution(false);
  setRouteState("west-ford", false);
  return {
    group,
    parts,
    anchors,
    witness,
    bindControls,
    setLeverDetent,
    readValveValues,
    refreshMeters,
    readMeterValues,
    setDistribution,
    setRouteState,
    updateClosure,
    setRecipient,
    get routeState() {
      return snapshotRoute();
    },
    get selectedRecipient() {
      return selectedRecipient;
    },
    get distributionValidated() {
      return distributionValidated;
    },
    dispose,
  };
}
