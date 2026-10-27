/** Source-only original ledger attachments. Metres, +Y up, +Z forward.
 * The original ledger and copy are borrowed real Field meshes, never cloned.
 * Controller owns evidence, events, Field cargo motion and final story choice.
 */
export function createLedgerProps(THREE, world, flow, { field, player } = {}) {
  const carriage = field?.tasks.find((t) => t.id === "ledger-carriage"),
    carbon = field?.tasks.find((t) => t.id === "ledger-carbon"),
    press = field?.tasks.find((t) => t.id === "ledger-copy");
  const pages = carriage?.object.getObjectByName("field-ledger-pages"),
    cover = carriage?.object.getObjectByName(
      carriage.object.userData.dynamicParts?.["book-cover"]?.node,
    ),
    copy = press?.parts["copy-tray"];
  if (
    !THREE?.BufferGeometry ||
    !world?.solid ||
    !flow?.original?.unique ||
    !player?.object ||
    !carriage ||
    !carbon ||
    !press ||
    !pages ||
    !cover ||
    !copy
  )
    throw TypeError(
      "Ledger props require loaded World, real Field ledger tasks, flow and player actor",
    );
  const receiverDefinitions = [
    { ...flow.notice.witness, template: "npc-elias", role: "bookkeeper" },
    { ...flow.courier, template: "npc-sol", role: "courier" },
  ];
  const candidates = receiverDefinitions.map((def) => {
    const found = world.actors.filter(
      (a) =>
        a.object.userData.missionActorId === def.id ||
        a.object.userData.characterId === def.characterId ||
        (def.characterId === "orin" && a.name === "npc-sol"),
    );
    if (found.length > 1) throw Error(`Duplicate physical receiver ${def.id}`);
    return { def, actor: found[0] };
  });
  const group = new THREE.Group();
  group.name = "ledger-mission-props";
  world.level.add(group);
  const palette = {
    wood: "#79583b",
    lightWood: "#ad8855",
    teal: "#397d7a",
    cream: "#e5d5a6",
    iron: "#414b4b",
    brass: "#c3a35d",
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
      vertexColors: true,
      roughness: 0.96,
    }),
  };
  for (const m of Object.values(materials)) {
    m.side = THREE.DoubleSide;
    m.forceSinglePass = true;
  }
  const geometries = new Set(),
    ownMaterials = new Set(Object.values(materials)),
    ownSolids = new Set(),
    ownColliders = new Set(),
    borrowed = new Map(),
    hiddenBooks = [],
    stationStates = new Map(),
    receiverStates = [];
  const parts = {},
    anchors = {},
    recipients = new Map();
  let disposed = false,
    custody = null;
  group.userData = {
    assetId: "dust-redemption.ledger-props.v1",
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
        flow.original.position,
        flow.copy.position,
        flow.notice.position,
        flow.notice.witness.position,
        flow.courier.position,
      ],
    },
  };
  const part = (size, position, color = "wood", rotation = [0, 0, 0]) => ({
    size,
    position,
    color,
    rotation,
  });
  function geometry(entries) {
    const positions = [],
      normals = [],
      uvs = [],
      colors = [];
    for (const e of entries) {
      const primitive = new THREE.BoxGeometry(...e.size),
        g = primitive.toNonIndexed();
      g.applyMatrix4(
        new THREE.Matrix4().compose(
          new THREE.Vector3(...e.position),
          new THREE.Quaternion().setFromEuler(new THREE.Euler(...e.rotation)),
          new THREE.Vector3(1, 1, 1),
        ),
      );
      const a = g.attributes,
        c = new THREE.Color(palette[e.color] || e.color);
      for (let i = 0; i < a.position.count; i++) {
        positions.push(
          a.position.getX(i),
          a.position.getY(i),
          a.position.getZ(i),
        );
        normals.push(a.normal.getX(i), a.normal.getY(i), a.normal.getZ(i));
        uvs.push(a.uv.getX(i), a.uv.getY(i));
        colors.push(c.r, c.g, c.b);
      }
      g.dispose();
      primitive.dispose();
    }
    const g = new THREE.BufferGeometry();
    for (const [name, array, size] of [
      ["position", positions, 3],
      ["normal", normals, 3],
      ["uv", uvs, 2],
      ["color", colors, 3],
    ])
      g.setAttribute(name, new THREE.Float32BufferAttribute(array, size));
    g.computeBoundingBox();
    g.computeBoundingSphere();
    geometries.add(g);
    return g;
  }
  function mesh(name, entries, material, parent) {
    const n = new THREE.Mesh(geometry(entries), materials[material]);
    n.name = name;
    n.castShadow = true;
    n.receiveShadow = true;
    parent.add(n);
    return n;
  }
  function bounds(box, object) {
    object.updateWorldMatrix(true, true);
    const b = new THREE.Box3().setFromObject(object),
      s = b.getSize(new THREE.Vector3()),
      c = b.getCenter(new THREE.Vector3());
    Object.assign(box, { x: c.x, z: c.z, w: s.x, h: s.y, d: s.z });
    Object.assign(box.min, b.min);
    Object.assign(box.max, b.max);
    return box;
  }
  function snapshot(node) {
    return {
      node,
      parent: node.parent,
      index: node.parent.children.indexOf(node),
      position: node.position.clone(),
      quaternion: node.quaternion.clone(),
      scale: node.scale.clone(),
      visible: node.visible,
    };
  }
  function restore(s) {
    s.parent.add(s.node);
    s.node.position.copy(s.position);
    s.node.quaternion.copy(s.quaternion);
    s.node.scale.copy(s.scale);
    s.node.visible = s.visible;
    const children = s.parent.children,
      at = children.indexOf(s.node);
    children.splice(at, 1);
    children.splice(Math.min(s.index, children.length), 0, s.node);
    s.node.updateWorldMatrix(true, true);
  }
  function rememberQueries(object) {
    object.traverse((n) => {
      if (n.isMesh && !borrowed.has(n))
        borrowed.set(n, {
          box: world.solidBoxes.get(n),
          registered: world.solids.includes(n),
        });
    });
  }
  function bindQuery(id, object) {
    const box = bounds(
      { id, kind: "ledger-document", vaultable: false, min: {}, max: {} },
      object,
    );
    rememberQueries(object);
    object.traverse((n) => {
      if (!n.isMesh) return;
      if (!world.solids.includes(n)) world.solids.push(n);
      world.solidBoxes.set(n, box);
    });
    group.userData.collisionProxies.push(box);
    return box;
  }
  function station(id, position) {
    const node = new THREE.Group();
    node.name = id;
    node.position.set(position[0], 0, position[1]);
    group.add(node);
    return node;
  }
  function registerStation(id, node) {
    const box = bounds(
        { id, kind: "ledger-station", vaultable: false, min: {}, max: {} },
        node,
      ),
      meshes = [];
    node.traverse((n) => {
      if (n.isMesh) meshes.push(n);
    });
    group.userData.collisionProxies.push(box);
    stationStates.set(id, { node, box, meshes, active: false });
    node.visible = false;
    return box;
  }
  function activateStation(id, active) {
    const s = stationStates.get(id);
    s.node.visible = active;
    if (s.active === active) return;
    s.active = active;
    if (active) {
      for (const n of s.meshes) {
        if (!world.solids.includes(n)) world.solids.push(n);
        world.solidBoxes.set(n, s.box);
        ownSolids.add(n);
      }
      world.colliders.push(s.box);
      ownColliders.add(s.box);
    } else {
      world.solids = world.solids.filter((n) => !s.meshes.includes(n));
      world.colliders = world.colliders.filter((b) => b !== s.box);
      for (const n of s.meshes) {
        world.solidBoxes.delete(n);
        ownSolids.delete(n);
      }
      ownColliders.delete(s.box);
    }
  }
  // Preserve the actual original ledger: normalize a wrapper pivot, reparent its two existing nodes.
  const originalBefore = [snapshot(pages), snapshot(cover)],
    copyBefore = snapshot(copy);
  const original = new THREE.Group();
  original.name = flow.original.id;
  original.userData.entityId = flow.original.id;
  original.position.set(0.03, 0.6875, 0.02);
  carriage.object.add(original);
  carriage.object.updateWorldMatrix(true, true);
  original.attach(pages);
  original.attach(cover);
  const originalDeskPose = {
    position: original.position.clone(),
    quaternion: original.quaternion.clone(),
    scale: original.scale.clone(),
  };
  const originalBox = bindQuery(flow.original.id, original),
    copyBox = bindQuery(flow.copy.id, copy);
  // Other desks' decorative books are not extra copies of this objective. Keep real carbon/copy parts.
  for (const task of [carbon, press])
    for (const name of [
      "field-ledger-pages",
      task.object.userData.dynamicParts["book-cover"].node,
    ]) {
      const n = task.object.getObjectByName(name);
      hiddenBooks.push({ node: n, visible: n.visible });
      rememberQueries(n);
      n.visible = false;
      const nodes = [];
      n.traverse((child) => {
        if (child.isMesh) nodes.push(child);
      });
      world.solids = world.solids.filter((child) => !nodes.includes(child));
    }
  const satchel = new THREE.Group();
  satchel.name = "ledger-player-satchel";
  player.object.add(satchel);
  mesh(
    "ledger-satchel-harness",
    [
      part([0.55, 0.51, 0.045], [0, 0.95, -0.285], "wood"),
      ...[-1, 1].map((s) =>
        part([0.045, 0.6, 0.055], [s * 0.22, 0.95, -0.33], "brass"),
      ),
      part([0.5, 0.04, 0.055], [0, 0.7, -0.32], "wood"),
    ],
    "wood",
    satchel,
  );
  satchel.visible = false;
  const satchelMeshes = [];
  satchel.traverse((n) => {
    if (n.isMesh) satchelMeshes.push(n);
  });
  const satchelBox = bounds(
    {
      id: "ledger-player-satchel",
      kind: "ledger-satchel",
      vaultable: false,
      min: {},
      max: {},
    },
    satchel,
  );
  const notice = station(flow.notice.id, flow.notice.position);
  mesh(
    "ledger-notice-timber",
    [
      part([1.28, 0.85, 0.1], [0, 1.3, 0], "wood"),
      part([1.42, 0.09, 0.17], [0, 1.78, 0], "lightWood"),
      ...[-1, 1].flatMap((s) => [
        part([0.09, 1.8, 0.12], [s * 0.58, 0.9, 0], "wood"),
        part([0.26, 0.08, 0.45], [s * 0.58, 0.04, 0], "wood"),
      ]),
    ],
    "wood",
    notice,
  );
  mesh(
    "ledger-notice-hardware",
    [
      part([0.52, 0.035, 0.035], [0, 1.51, 0.08], "brass"),
      ...[-1, 1].map((s) =>
        part([0.04, 0.33, 0.03], [s * 0.21, 1.3, 0.08], "iron"),
      ),
      part([0.13, 0.045, 0.035], [-0.43, 1.64, 0.08], "teal"),
      part([0.045, 0.13, 0.035], [-0.43, 1.64, 0.08], "teal"),
    ],
    "metal",
    notice,
  );
  const noticeClip = mesh(
    "ledger-notice-page-clip",
    [
      part([0.13, 0.05, 0.035], [0, 0, 0], "brass"),
      part([0.035, 0.14, 0.035], [0, -0.055, 0], "iron"),
    ],
    "metal",
    notice,
  );
  noticeClip.position.set(0, 1.52, 0.125);
  const courierDesk = station("ledger-courier-receiving-case", [
    flow.courier.position[0] - 1.25,
    flow.courier.position[1] + 0.15,
  ]);
  mesh(
    "ledger-courier-case-timber",
    [
      part([0.95, 0.09, 0.65], [0, 0.85, 0], "lightWood"),
      ...[-0.37, 0.37].flatMap((x) =>
        [-0.24, 0.24].map((z) => part([0.08, 0.8, 0.08], [x, 0.4, z], "wood")),
      ),
      part([0.58, 0.05, 0.4], [0, 0.95, 0], "teal"),
      part([0.58, 0.13, 0.045], [0, 1.025, -0.18], "wood"),
      ...[-1, 1].map((s) =>
        part([0.045, 0.13, 0.4], [s * 0.27, 1.025, 0], "wood"),
      ),
    ],
    "wood",
    courierDesk,
  );
  mesh(
    "ledger-courier-case-hardware",
    [
      ...[-1, 1].map((s) =>
        part([0.055, 0.15, 0.43], [s * 0.2, 1.025, 0], "brass"),
      ),
      part([0.12, 0.05, 0.04], [0, 1, 0.22], "iron"),
    ],
    "metal",
    courierDesk,
  );
  const seal = mesh(
    "ledger-courier-seal-bar",
    [
      part([0.035, 0.21, 0.04], [0, -0.1, 0], "brass"),
      part([0.1, 0.08, 0.05], [0, -0.2, 0], "rust"),
    ],
    "metal",
    courierDesk,
  );
  seal.position.set(0, 1.11, 0.22);
  seal.rotation.z = -0.8;
  const receipt = mesh(
    flow.receipt.id,
    [
      part([0.25, 0.012, 0.12], [0, 0, 0], "cream"),
      part([0.06, 0.016, 0.05], [0.07, 0.01, 0], "rust"),
      part([0.12, 0.008, 0.015], [-0.03, 0.01, 0], "iron"),
    ],
    "paper",
    group,
  );
  receipt.visible = false;
  parts.original = original;
  parts.copy = copy;
  parts["notice-clip"] = noticeClip;
  parts["courier-seal"] = seal;
  parts["notice-board"] = notice;
  parts["courier-case"] = courierDesk;
  parts.receipt = receipt;
  parts.satchel = satchel;
  registerStation(flow.notice.id, notice);
  registerStation(flow.courier.id, courierDesk);
  anchors.original = new THREE.Vector3(
    ...[flow.original.position[0], 0.75, flow.original.position[1]],
  );
  anchors[flow.notice.id] = new THREE.Vector3(
    flow.notice.position[0],
    1.3,
    flow.notice.position[1],
  );
  anchors[flow.notice.witness.id] = new THREE.Vector3(
    flow.notice.witness.position[0],
    0,
    flow.notice.witness.position[1],
  );
  anchors[flow.courier.id] = new THREE.Vector3(
    flow.courier.position[0],
    0,
    flow.courier.position[1],
  );
  for (const candidate of candidates) {
    const { def } = candidate,
      actor = candidate.actor || world.actor(def.template, ...def.position),
      owned = !candidate.actor;
    const before = {
      position: actor.position.clone(),
      visible: actor.object.visible,
      name: actor.object.name,
      characterId: actor.object.userData.characterId,
      missionActorId: actor.object.userData.missionActorId,
    };
    actor.position.set(def.position[0], 0, def.position[1]);
    actor.object.name = def.id;
    actor.object.userData.characterId = def.characterId;
    actor.object.userData.missionActorId = def.id;
    actor.object.visible = false;
    recipients.set(def.id, actor);
    receiverStates.push({ def, actor, owned, before });
  }
  function alive() {
    if (disposed) throw Error("Ledger props have been disposed");
  }
  function shown(node) {
    for (let n = node; n; n = n.parent) if (!n.visible) return false;
    return true;
  }
  function worldPosition(node) {
    node.updateWorldMatrix(true, true);
    return node.getWorldPosition(new THREE.Vector3());
  }
  function setOriginalCarrier(carrier) {
    alive();
    if (!["desk", "player-satchel"].includes(carrier))
      throw TypeError("Original carrier must be desk or player-satchel");
    if (carrier === "desk") {
      carriage.object.add(original);
      original.position.copy(originalDeskPose.position);
      original.quaternion.copy(originalDeskPose.quaternion);
      original.scale.copy(originalDeskPose.scale);
      satchel.visible = false;
      world.solids = world.solids.filter((n) => !satchelMeshes.includes(n));
      for (const n of satchelMeshes) {
        ownSolids.delete(n);
        world.solidBoxes.delete(n);
      }
    } else {
      player.object.add(original);
      original.position.set(0.02, 0.95, -0.335);
      original.rotation.set(-Math.PI / 2, 0, 0);
      original.scale.set(1, 1, 1);
      cover.rotation.z = 0;
      satchel.visible = true;
      for (const n of satchelMeshes) {
        if (!world.solids.includes(n)) world.solids.push(n);
        ownSolids.add(n);
        world.solidBoxes.set(n, satchelBox);
      }
    }
    update();
    return readOriginalSnapshot();
  }
  function setCustody(choice) {
    alive();
    if (!["sealed-courier", "notice-copy"].includes(choice))
      throw TypeError("Unknown ledger custody");
    if (custody && custody !== choice)
      throw Error("Ledger custody is already selected");
    custody = choice;
    activateStation(flow.notice.id, choice === "notice-copy");
    activateStation(flow.courier.id, choice === "sealed-courier");
    for (const s of receiverStates)
      s.actor.object.visible =
        s.def.role === (choice === "notice-copy" ? "bookkeeper" : "courier");
    return custody;
  }
  function readOriginalSnapshot() {
    alive();
    const complete = pages.parent === original && cover.parent === original,
      carrier =
        complete && original.parent === player.object
          ? "player-satchel"
          : complete && original.parent === carriage.object
            ? "original-table"
            : "invalid";
    return {
      entityId: flow.original.id,
      parentCarrier: carrier,
      worldPosition: worldPosition(original).toArray(),
      visible: complete && shown(pages) && shown(cover),
    };
  }
  function readCopySnapshot() {
    alive();
    const position = worldPosition(copy),
      p = worldPosition(player.object);
    let carrier = "invalid";
    if (copy.parent === notice) carrier = flow.notice.id;
    else if (copy.parent === courierDesk) carrier = flow.courier.id;
    else if (copy.parent === press.object) carrier = "copy-tray";
    else if (copy.parent === field.group)
      carrier =
        press.cargo === copy &&
        press.carrying &&
        Math.hypot(position.x - p.x, position.z - p.z) <=
          flow.copy.tether + 1e-8
          ? "player"
          : press.carrying
            ? "invalid"
            : "ground";
    return {
      entityId: flow.copy.id,
      parentCarrier: carrier,
      worldPosition: position.toArray(),
      visible: shown(copy),
    };
  }
  function readCarriageSnapshot() {
    alive();
    const frame = carriage.parts["matching-frame"],
      slots = frame.userData.fieldControl.slots,
      joint = frame.localToWorld(new THREE.Vector3(0, 0, -0.09));
    frame.updateWorldMatrix(true, true);
    const nearest = slots
      .map((s) => ({
        id: s.id,
        distance: joint.distanceTo(worldPosition(s.node)),
      }))
      .sort((a, b) => a.distance - b.distance)[0];
    return {
      tagAngle: carriage.parts.tag.rotation.y,
      frameSlot: nearest.distance <= 0.015 ? nearest.id : "open",
      frameDistance: nearest.distance,
    };
  }
  function readCarbonSnapshot() {
    alive();
    const sheet = carbon.parts["carbon-sheet"],
      pins = carbon.parts.pins;
    sheet.updateWorldMatrix(true, true);
    pins.updateWorldMatrix(true, true);
    const distance = Math.max(
      ...[-0.24, 0.24].map((x) =>
        sheet
          .localToWorld(new THREE.Vector3(x, 0.02, 0))
          .distanceTo(pins.localToWorld(new THREE.Vector3(x, 0.04, 0))),
      ),
    );
    return {
      sheetOffset: distance,
      lampAngle: carbon.parts["raking-lamp"].rotation.z,
    };
  }
  function readPressAngle() {
    alive();
    return press.parts["press-handle"].rotation.z;
  }
  function dockCopy(destination) {
    alive();
    const expected =
      custody === "notice-copy"
        ? flow.notice
        : custody === "sealed-courier"
          ? flow.courier
          : null;
    if (!expected || destination !== expected.id)
      throw Error("Select this copy custodian before delivery");
    const holder = destination === flow.notice.id ? notice : courierDesk;
    if (copy.parent === holder) return readCopySnapshot();
    const measured = readCopySnapshot(),
      p = worldPosition(player.object),
      c = measured.worldPosition,
      near = (x, z) =>
        Math.hypot(x - expected.position[0], z - expected.position[1]) <=
        expected.radius + 1e-8;
    if (
      measured.parentCarrier !== "player" ||
      !measured.visible ||
      !near(p.x, p.z) ||
      !near(c[0], c[2])
    )
      throw Error(
        "Player and the same held copy must both reach the selected physical custodian",
      );
    holder.attach(copy);
    copy.position.set(
      ...(destination === flow.notice.id ? [0, 1.3, 0.13] : [0, 0.99, 0]),
    );
    copy.rotation.set(destination === flow.notice.id ? Math.PI / 2 : 0, 0, 0);
    copy.scale.copy(copyBefore.scale);
    update();
    return readCopySnapshot();
  }
  function showReceipt() {
    alive();
    const target =
      custody === "notice-copy"
        ? notice
        : custody === "sealed-courier"
          ? courierDesk
          : null;
    if (
      !target ||
      copy.parent !== target ||
      readOriginalSnapshot().parentCarrier !== "player-satchel"
    )
      throw Error(
        "Dock the same copy while retaining the original before issuing a receipt",
      );
    target.add(receipt);
    receipt.position.set(
      ...(target === notice ? [0.42, 1.12, 0.12] : [0.29, 0.91, 0.17]),
    );
    receipt.rotation.set(target === notice ? Math.PI / 2 : 0, 0, 0);
    receipt.visible = true;
    if (target === notice) noticeClip.rotation.z = 1.05;
    else seal.rotation.z = 0;
    if (!ownSolids.has(receipt)) {
      world.solids.push(receipt);
      ownSolids.add(receipt);
    }
    const box = bounds(
      {
        id: flow.receipt.id,
        kind: "ledger-receipt",
        vaultable: false,
        min: {},
        max: {},
      },
      receipt,
    );
    world.solidBoxes.set(receipt, box);
    return readReceiptSnapshot();
  }
  function readReceiptSnapshot() {
    alive();
    return {
      entityId: flow.receipt.id,
      visible: shown(receipt),
      custodianId:
        receipt.parent === notice
          ? flow.notice.id
          : receipt.parent === courierDesk
            ? flow.courier.id
            : null,
      worldPosition: worldPosition(receipt).toArray(),
      closureAngle:
        custody === "notice-copy" ? noticeClip.rotation.z : seal.rotation.z,
    };
  }
  function update() {
    alive();
    bounds(originalBox, original);
    bounds(copyBox, copy);
    if (satchel.visible) bounds(satchelBox, satchel);
  }
  function dispose() {
    if (disposed) return;
    disposed = true;
    world.solids = world.solids.filter((n) => !ownSolids.has(n));
    world.colliders = world.colliders.filter((b) => !ownColliders.has(b));
    for (const n of ownSolids) world.solidBoxes.delete(n);
    restore(copyBefore);
    for (const s of originalBefore.sort((a, b) => a.index - b.index))
      restore(s);
    original.removeFromParent();
    satchel.removeFromParent();
    for (const s of hiddenBooks) s.node.visible = s.visible;
    for (const [n, before] of borrowed) {
      if (before.registered && !world.solids.includes(n)) world.solids.push(n);
      if (!before.registered)
        world.solids = world.solids.filter((v) => v !== n);
      if (before.box) world.solidBoxes.set(n, before.box);
      else world.solidBoxes.delete(n);
    }
    for (const s of receiverStates) {
      if (s.owned) {
        s.actor.mixer.stopAllAction();
        s.actor.mixer.uncacheRoot(s.actor.visual);
        world.disposeObjects([s.actor.object]);
        s.actor.object.removeFromParent();
        world.actors = world.actors.filter((a) => a !== s.actor);
      } else {
        s.actor.position.copy(s.before.position);
        s.actor.object.visible = s.before.visible;
        s.actor.object.name = s.before.name;
        for (const key of ["characterId", "missionActorId"])
          if (s.before[key] === undefined) delete s.actor.object.userData[key];
          else s.actor.object.userData[key] = s.before[key];
      }
    }
    group.removeFromParent();
    receipt.removeFromParent();
    for (const g of geometries) g.dispose();
    for (const m of ownMaterials) m.dispose();
    group.clear();
    satchel.clear();
  }
  update();
  return {
    group,
    parts,
    anchors,
    original,
    copy,
    notice,
    courierDesk,
    originalCollider: originalBox,
    copyCollider: copyBox,
    recipients,
    bookkeeper: recipients.get(flow.notice.witness.id),
    courier: recipients.get(flow.courier.id),
    setOriginalCarrier,
    setCustody,
    dockCopy,
    showReceipt,
    readOriginalSnapshot,
    readCopySnapshot,
    readCarriageSnapshot,
    readCarbonSnapshot,
    readPressAngle,
    readReceiptSnapshot,
    update,
    dispose,
  };
}
