// Pure deterministic local supply/custody log; no clocks, money, world mutation or spawns.
const clone = (v) => JSON.parse(JSON.stringify(v));
const freeze = (v) => {
  if (v && typeof v === "object") {
    Object.values(v).forEach(freeze);
    Object.freeze(v);
  }
  return v;
};
const plain = (v) =>
  Boolean(
    v &&
      typeof v === "object" &&
      !Array.isArray(v) &&
      [Object.prototype, null].includes(Object.getPrototypeOf(v)),
  );
const stable = (v) =>
  JSON.stringify(
    Array.isArray(v)
      ? v.map((x) => JSON.parse(stable(x)))
      : plain(v)
        ? Object.fromEntries(
            Object.keys(v)
              .sort()
              .map((k) => [k, JSON.parse(stable(v[k]))]),
          )
        : v,
  );
const same = (a, b) => stable(a) === stable(b);
const check = (v, m) => {
  if (!v) throw Error(`Pact flow: ${m}`);
};
const exact = (v, keys, name) =>
  check(
    plain(v) &&
      Object.keys(v).length === keys.length &&
      keys.every((k) => Object.hasOwn(v, k)),
    `${name} has missing/unknown fields`,
  );
const point = (v) =>
  Array.isArray(v) &&
  v.length === 2 &&
  v.every((n) => Number.isFinite(n) && Math.abs(n) <= 23);
const gap = (a, b) => Math.hypot(a[0] - b[0], a[1] - b[1]);
const near = (a, b, r, label) =>
  check(
    point(a) && point(b) && gap(a, b) <= r + 1e-8,
    `${label} is out of physical reach`,
  );
const angle = (a, b) => Number.isFinite(a) && Math.abs(a - b) < 0.01;
const pos = (s) => [s.worldPosition[0], s.worldPosition[2]];
export const PACT_FLOW = freeze({
  "dawn-pact": {
    version: 1,
    missionId: "dawn-pact",
    title: "黎明之前的約定：同車補給與地契交接",
    evidence: {
      "pact-shares": {
        recordId: "mine-shares-released",
        position: [-16, 8],
        radius: 2.8,
        text: "公司已放棄礦場股權；同車剩餘物資可保全，但不再是督軍的私人所有物。",
      },
      "pact-wages": {
        recordId: "joint-unpaid-wages",
        position: [16, 4],
        radius: 2.8,
        text: "守軍和礦工同被欠薪。軍線供彈、民線供水與醫療；只截軍線，不讓民生跟著斷電。",
      },
      "pact-train": {
        recordId: "last-train-hearing",
        position: [-15, -8],
        radius: 2.8,
        text: "末班車仍有撤離席位；交還地契、交械並接受公開聽證，才是可核驗的安全離境承諾。",
      },
    },
    feed: { taskId: "pact-feed", position: [-12, 4], radius: 2.3 },
    lights: {
      taskId: "pact-lights",
      position: [-5, 12],
      radius: 2.3,
      batteryId: "pact-original-battery",
    },
    cart: {
      taskId: "pact-cart",
      id: "pact-original-supply-cart",
      position: [11, 13],
      radius: 2.6,
      initialStock: 24,
      coverStock: 6,
    },
    bays: {
      "negotiation-siding": {
        id: "negotiation-siding",
        title: "完整交涉側線",
        position: [12, 5],
        radius: 1.2,
        width: 4,
        depth: 4.2,
        route: [
          [11, 13],
          [12, 9],
          [12, 5],
        ],
        coverStock: 0,
      },
      "assault-siding": {
        id: "assault-siding",
        title: "進攻掩體側線",
        position: [6, 2],
        radius: 1.2,
        width: 4,
        depth: 4.2,
        route: [
          [11, 13],
          [12, 9],
          [12, 5],
          [6.7, 5],
          [6, 2],
        ],
        coverStock: 6,
      },
    },
    handoff: {
      id: "pact-inventory-desk",
      position: [9, 3],
      radius: 2.3,
      witnessId: "inez",
      witnessPosition: [9, 1.9],
      deedId: "frontier-land-deed",
      receiptId: "pact-supply-deed-receipt",
      exit: [-12, 18],
    },
    actors: {
      "pact-1": { position: [-7, 0], rounds: 30 },
      "pact-2": { position: [7, -3], rounds: 30, withdrawPosition: [3, -6] },
      "pact-3": { position: [-5, -10], rounds: 16 },
      "pact-4": { position: [9, -12], rounds: 30 },
      "pact-5": { position: [1, -5], rounds: 30, withdrawPosition: [8, -6] },
      "pact-6": { position: [-11, -4], rounds: 16 },
    },
    response: {
      id: "pact-finite-resupply",
      actorIds: ["pact-2", "pact-5"],
      amount: 6,
      approachZ: 7,
      pickupRadius: 1.2,
      anchorDistance: 3.6,
      minimumAttackTelegraphMs: 800,
      warning:
        "兩名既有補給守軍將沿側線接近礦車，各只可取六發；先切軍用桿可阻止尚未領取的彈藥，民生線仍運作。",
      spawn: false,
    },
  },
});
const definitions = (id) => {
  check(Object.hasOwn(PACT_FLOW, id), "unknown mission");
  return PACT_FLOW[id];
};
const eventKeys = {
  "evidence-observed": ["sourceId", "recordId", "playerPosition"],
  "feed-confirmed": ["feedSnapshot", "playerPosition"],
  "lights-confirmed": ["choiceId", "lightSnapshot", "playerPosition"],
  "siding-selected": ["choiceId", "cartSnapshot", "playerPosition"],
  "cart-checkpoint": ["index", "cartSnapshot", "playerPosition"],
  "cart-parked": ["cartSnapshot", "playerPosition"],
  "approach-observed": ["feedSnapshot", "playerPosition"],
  "response-warning-presented": ["responseId"],
  "response-activated": ["responseId"],
  "resupply-received": [
    "actorId",
    "actorPosition",
    "pickupPosition",
    "cartSnapshot",
    "feedSnapshot",
    "roundsBefore",
  ],
  "actor-defeated": ["actorId"],
  "clearance-presented": [
    "reasonId",
    "cartSnapshot",
    "feedSnapshot",
    "lightSnapshot",
    "playerPosition",
    "witnessPosition",
  ],
  "inventory-confirmed": [
    "actorSnapshots",
    "cartSnapshot",
    "playerPosition",
    "witnessPosition",
  ],
  "deed-collected": [
    "deedSnapshot",
    "cartSnapshot",
    "feedSnapshot",
    "lightSnapshot",
    "playerPosition",
    "witnessPosition",
  ],
  "handoff-received": [
    "deedSnapshot",
    "cartSnapshot",
    "actorSnapshots",
    "playerPosition",
    "witnessPosition",
  ],
};
function entity(s) {
  exact(
    s,
    ["entityId", "parentCarrier", "worldPosition", "visible"],
    "entity snapshot",
  );
  check(
    typeof s.entityId === "string" &&
      typeof s.parentCarrier === "string" &&
      Array.isArray(s.worldPosition) &&
      s.worldPosition.length === 3 &&
      s.worldPosition.every((n) => Number.isFinite(n) && Math.abs(n) <= 24) &&
      typeof s.visible === "boolean",
    "invalid entity",
  );
}
function stock(s) {
  exact(s, ["available", "issued", "cover"], "stock");
  check(
    Object.values(s).every((n) => Number.isInteger(n) && n >= 0 && n <= 24) &&
      s.available + s.issued + s.cover === 24,
    "stock conservation",
  );
}
function feed(s) {
  exact(
    s,
    ["militaryAngle", "civilianAngle", "militaryPowered", "civilianPowered"],
    "feed",
  );
  check(
    [s.militaryAngle, s.civilianAngle].every(
      (n) => angle(n, 0) || angle(n, 1.05),
    ) &&
      typeof s.militaryPowered === "boolean" &&
      typeof s.civilianPowered === "boolean",
    "invalid feed",
  );
  check(
    s.militaryPowered === angle(s.militaryAngle, 1.05) &&
      s.civilianPowered === angle(s.civilianAngle, 1.05),
    "feed actual endpoint disagrees with lever",
  );
}
function cart(s) {
  exact(
    s,
    [
      "entityId",
      "worldPosition",
      "yaw",
      "brakeAngle",
      "visible",
      "containedBayId",
      "stock",
    ],
    "cart",
  );
  check(
    s.entityId === "pact-original-supply-cart" &&
      Array.isArray(s.worldPosition) &&
      s.worldPosition.length === 3 &&
      s.worldPosition.every((n) => Number.isFinite(n) && Math.abs(n) <= 24) &&
      Number.isFinite(s.yaw) &&
      Math.abs(s.yaw) <= Math.PI * 2 &&
      Number.isFinite(s.brakeAngle) &&
      typeof s.visible === "boolean" &&
      (s.containedBayId === null ||
        ["negotiation-siding", "assault-siding"].includes(s.containedBayId)),
    "invalid cart",
  );
  stock(s.stock);
}
function light(s) {
  exact(s, ["lidAngle", "battery", "beamVisible"], "light");
  check(
    (angle(s.lidAngle, 0) || angle(s.lidAngle, 1.05)) &&
      typeof s.beamVisible === "boolean",
    "invalid light",
  );
  entity(s.battery);
  check(s.battery.entityId === "pact-original-battery", "substitute battery");
}
function actors(s) {
  check(Array.isArray(s) && s.length === 6, "six actual actors required");
  const ids = new Set();
  for (const a of s) {
    exact(
      a,
      ["id", "position", "hp", "rounds", "magazine", "order"],
      "actor snapshot",
    );
    check(
      typeof a.id === "string" &&
        !ids.has(a.id) &&
        point(a.position) &&
        Number.isFinite(a.hp) &&
        a.hp >= 0 &&
        a.hp <= 110 &&
        Number.isInteger(a.rounds) &&
        a.rounds >= 0 &&
        a.rounds <= 36 &&
        Number.isInteger(a.magazine) &&
        a.magazine >= 0 &&
        a.magazine <= 6 &&
        a.magazine <= a.rounds &&
        ["guard", "resupply", "withdraw", "surrender", "defeated"].includes(
          a.order,
        ),
      "invalid actor snapshot",
    );
    ids.add(a.id);
  }
}
function validateEvent(e) {
  check(plain(e) && Object.hasOwn(eventKeys, e.type), "unknown event type");
  exact(e, ["id", "type", ...eventKeys[e.type]], "event");
  check(
    typeof e.id === "string" && /^[A-Za-z0-9][A-Za-z0-9:._-]{0,95}$/.test(e.id),
    "invalid event ID",
  );
  for (const key of eventKeys[e.type]) {
    const v = e[key];
    if (key.endsWith("Position")) check(point(v), `invalid ${key}`);
    else if (key === "cartSnapshot") cart(v);
    else if (key === "feedSnapshot") feed(v);
    else if (key === "lightSnapshot") light(v);
    else if (key === "deedSnapshot") entity(v);
    else if (key === "actorSnapshots") actors(v);
    else if (["index", "roundsBefore"].includes(key))
      check(Number.isInteger(v) && v >= 0 && v <= 36, `invalid ${key}`);
    else
      check(
        typeof v === "string" && v.length > 0 && v.length <= 96,
        `invalid ${key}`,
      );
  }
}
function initial(f) {
  return {
    evidence: {},
    feedCut: false,
    lightChoice: null,
    siding: null,
    checkpoint: -1,
    parked: false,
    stock: { available: 24, issued: 0, cover: 0 },
    clearance: false,
    inventory: null,
    deed: false,
    receipt: null,
    response: {
      status: "waiting",
      warned: false,
      presented: false,
      activated: false,
      reason: null,
    },
    actors: Object.fromEntries(
      Object.keys(f.actors).map((id) => [
        id,
        { defeated: false, order: "guard", issued: 0 },
      ]),
    ),
  };
}
function apply(f, prev, e) {
  const v = clone(prev),
    effects = [],
    add = (type, data = {}) => effects.push({ type, ...data }),
    dup = () => ({ view: prev, effects: [], changed: false });
  const known = (id) => {
    check(Object.hasOwn(v.actors, id), "unknown actor");
    return v.actors[id];
  };
  const orders = (ids, order) => {
    const live = ids.filter((id) => !v.actors[id].defeated);
    for (const id of live) v.actors[id].order = order;
    if (live.length) add("setActorOrder", { actorIds: live, order });
  };
  const cancel = (reason) => {
    if (v.response.status === "neutralized") return;
    v.response.status = v.response.warned ? "cancelled" : "prevented";
    v.response.reason = reason;
    orders(f.response.actorIds, "withdraw");
    add("setResponseState", { ...v.response });
  };
  const sameCart = () => {
    check(e.cartSnapshot.visible, "cart invisible");
    check(
      same(e.cartSnapshot.stock, v.stock),
      "physical stock differs from conservation ledger",
    );
  };
  const cutoff = (s) =>
    check(
      !s.militaryPowered &&
        s.civilianPowered &&
        angle(s.militaryAngle, 0) &&
        angle(s.civilianAngle, 1.05),
      "cut military only; keep civilian power",
    );
  const lighting = (s) => {
    check(v.lightChoice, "lighting not selected");
    check(s.battery.visible, "battery must remain a visible same object");
    const dark = v.lightChoice === "darken-approach";
    check(
      s.beamVisible === !dark &&
        angle(s.lidAngle, dark ? 1.05 : 0) &&
        s.battery.parentCarrier === (dark ? "salvage-tray" : "power-socket"),
      "actual battery/beam differs from choice",
    );
  };
  const parked = () => {
    sameCart();
    check(v.parked && v.siding, "cart has not parked");
    const bay = f.bays[v.siding];
    near(pos(e.cartSnapshot), bay.position, bay.radius, "parked cart");
    check(
      angle(e.cartSnapshot.brakeAngle, 1.05) &&
        e.cartSnapshot.containedBayId === v.siding,
      "whole cart/brake not in selected bay",
    );
  };
  const proof = () => {
    check(
      Object.keys(v.evidence).length === 3 && v.feedCut && v.lightChoice,
      "three documents, military cutoff and lighting required",
    );
    cutoff(e.feedSnapshot);
    lighting(e.lightSnapshot);
    parked();
  };
  const atDesk = () => {
    near(
      e.playerPosition,
      f.handoff.position,
      f.handoff.radius,
      "inventory handoff",
    );
    near(
      e.witnessPosition,
      f.handoff.witnessPosition,
      0.08,
      "actual witness station",
    );
    near(e.playerPosition, e.witnessPosition, 2.6, "witness");
  };
  const actorTruth = () => {
    for (const a of e.actorSnapshots) {
      const record = known(a.id);
      check(
        (a.hp === 0) === record.defeated,
        "actual casualties differ from ledger",
      );
      check(
        a.rounds <= f.actors[a.id].rounds + record.issued,
        "actor ammunition exceeds finite allowance",
      );
    }
    check(
      Object.keys(v.actors).every((id) =>
        e.actorSnapshots.some((a) => a.id === id),
      ),
      "actor set mismatch",
    );
  };
  if (v.receipt && e.type !== "handoff-received")
    throw Error("Pact flow: signed custody is sealed");
  if (e.type === "evidence-observed") {
    const def = f.evidence[e.sourceId];
    check(def && e.recordId === def.recordId, "unknown document");
    near(e.playerPosition, def.position, def.radius, "document");
    if (v.evidence[e.sourceId]) return dup();
    v.evidence[e.sourceId] = e.recordId;
    add("showPactEvidence", { sourceId: e.sourceId });
  } else if (e.type === "feed-confirmed") {
    near(e.playerPosition, f.feed.position, f.feed.radius, "military control");
    check(v.evidence["pact-wages"], "wages evidence required");
    cutoff(e.feedSnapshot);
    if (v.feedCut) return dup();
    v.feedCut = true;
    cancel("military-feed-cut");
    add("confirmPactFeed", {
      military: false,
      civilian: true,
      legacyAmmoMultiplierOwner: "field",
    });
  } else if (e.type === "lights-confirmed") {
    near(
      e.playerPosition,
      f.lights.position,
      f.lights.radius,
      "lighting control",
    );
    check(
      ["darken-approach", "preserve-battery"].includes(e.choiceId),
      "unknown lighting choice",
    );
    if (v.lightChoice) {
      check(v.lightChoice === e.choiceId, "lighting already committed");
      return dup();
    }
    v.lightChoice = e.choiceId;
    lighting(e.lightSnapshot);
    check(
      angle(
        e.lightSnapshot.lidAngle,
        e.choiceId === "darken-approach" ? 1.05 : 0,
      ),
      "battery lid not prepared",
    );
    add("confirmPactLighting", {
      choiceId: e.choiceId,
      fieldRewardDelta: e.choiceId === "preserve-battery" ? 20 : 0,
    });
  } else if (e.type === "siding-selected") {
    check(v.feedCut && v.evidence["pact-shares"], "cutoff and shares required");
    sameCart();
    near(e.playerPosition, pos(e.cartSnapshot), f.cart.radius, "cart selector");
    check(Object.hasOwn(f.bays, e.choiceId), "unknown siding");
    if (v.siding) {
      check(v.siding === e.choiceId, "cart use already committed");
      return dup();
    }
    near(pos(e.cartSnapshot), f.cart.position, 1.2, "original starting cart");
    v.siding = e.choiceId;
    add("selectPactSiding", { choiceId: e.choiceId });
  } else if (e.type === "cart-checkpoint") {
    check(v.siding && !v.parked, "select siding before pushing");
    sameCart();
    check(
      e.index === v.checkpoint + 1 && e.index < f.bays[v.siding].route.length,
      "ordered physical cart checkpoints required",
    );
    near(
      pos(e.cartSnapshot),
      f.bays[v.siding].route[e.index],
      1.2,
      "cart checkpoint",
    );
    near(e.playerPosition, pos(e.cartSnapshot), f.cart.radius, "cart pusher");
    check(angle(e.cartSnapshot.brakeAngle, 0), "release cart brake");
    v.checkpoint = e.index;
    add("recordPactCartCheckpoint", { index: e.index });
  } else if (e.type === "cart-parked") {
    check(v.siding, "siding required");
    sameCart();
    near(e.playerPosition, pos(e.cartSnapshot), f.cart.radius, "parking brake");
    near(pos(e.cartSnapshot), f.bays[v.siding].position, 1.2, "parking bay");
    check(
      e.cartSnapshot.containedBayId === v.siding &&
        angle(e.cartSnapshot.brakeAngle, 1.05),
      "entire cart must be contained and braked",
    );
    if (v.parked) return dup();
    check(
      v.checkpoint === f.bays[v.siding].route.length - 1,
      "continuous pushing not complete",
    );
    const n = f.bays[v.siding].coverStock;
    check(v.stock.available >= n, "cover stock insufficient");
    v.stock.available -= n;
    v.stock.cover += n;
    v.parked = true;
    add("setPactStock", { stock: v.stock });
    add("confirmPactCart", { choiceId: v.siding });
  } else if (e.type === "approach-observed") {
    check(
      e.playerPosition[1] <= f.response.approachZ,
      "not in warned approach",
    );
    if (v.response.status !== "waiting") return dup();
    if (v.feedCut || !e.feedSnapshot.militaryPowered) {
      cancel("military-feed-cut");
    } else if (f.response.actorIds.every((id) => v.actors[id].defeated)) {
      v.response.status = "neutralized";
      v.response.reason = "existing-responders-defeated";
      add("setResponseState", { ...v.response });
    } else {
      v.response.status = "warned";
      v.response.warned = true;
      add("announcePactResponse", {
        text: f.response.warning,
        responseId: f.response.id,
      });
    }
  } else if (e.type === "response-warning-presented") {
    check(
      e.responseId === f.response.id && v.response.warned,
      "warning not issued",
    );
    if (v.response.presented) return dup();
    check(v.response.status === "warned", "warning no longer active");
    v.response.presented = true;
    add("confirmPactWarning");
  } else if (e.type === "response-activated") {
    check(
      e.responseId === f.response.id && v.response.presented,
      "actual warning presentation required",
    );
    if (v.response.activated) return dup();
    check(
      v.response.status === "warned" && !v.feedCut,
      "resupply already cancelled",
    );
    v.response.status = "active";
    v.response.activated = true;
    orders(
      f.response.actorIds.filter((id) => !v.actors[id].issued),
      "resupply",
    );
    add("setResponseState", { ...v.response });
  } else if (e.type === "resupply-received") {
    const a = known(e.actorId);
    check(
      f.response.actorIds.includes(e.actorId) && !a.defeated,
      "only living authored supply group",
    );
    sameCart();
    check(
      !v.feedCut &&
        e.feedSnapshot.militaryPowered &&
        e.feedSnapshot.civilianPowered,
      "cut wire forbids new ammunition",
    );
    check(
      v.response.status === "active" && a.order === "resupply",
      "no active supply order",
    );
    if (a.issued) return dup();
    near(
      e.pickupPosition,
      pos(e.cartSnapshot),
      f.response.anchorDistance,
      "physical cart-side station",
    );
    near(
      e.actorPosition,
      e.pickupPosition,
      f.response.pickupRadius,
      "resupply actor",
    );
    check(
      e.roundsBefore <= f.actors[e.actorId].rounds,
      "initial ammo capacity exceeded",
    );
    check(v.stock.available >= 6, "finite stock exhausted");
    a.issued = 6;
    v.stock.available -= 6;
    v.stock.issued += 6;
    a.order = "withdraw";
    add("transferPactAmmo", {
      actorId: e.actorId,
      amount: 6,
      roundsBefore: e.roundsBefore,
      roundsAfter: e.roundsBefore + 6,
    });
    add("setPactStock", { stock: v.stock });
    orders([e.actorId], "withdraw");
  } else if (e.type === "actor-defeated") {
    const a = known(e.actorId);
    if (a.defeated) return dup();
    a.defeated = true;
    a.order = "defeated";
    v.clearance = false;
    if (f.response.actorIds.every((id) => v.actors[id].defeated)) {
      v.response.status = "neutralized";
      v.response.reason = "existing-responders-defeated";
      add("setResponseState", { ...v.response });
    }
  } else if (e.type === "clearance-presented") {
    atDesk();
    proof();
    check(
      Object.values(v.actors).every((a) => !a.defeated),
      "casualties close nonlethal surrender",
    );
    if (e.reasonId !== "safe-departure-and-hearing") {
      add("recoverableMistake", {
        message:
          "欠薪與股權證明需要搭配交還地契、安全撤離及公開聽證承諾，不能保證照舊領薪。",
        alertDelta: 1,
        exposureSeconds: 1.5,
      });
      return { view: v, effects, changed: true };
    }
    if (v.clearance) return dup();
    v.clearance = true;
    cancel("verified-surrender");
    orders(Object.keys(v.actors), "surrender");
    add("confirmPactClearance");
  } else if (e.type === "inventory-confirmed") {
    atDesk();
    parked();
    actorTruth();
    check(
      v.clearance || Object.values(v.actors).every((a) => a.defeated),
      "verify surrender or clear all six",
    );
    if (v.clearance)
      check(
        e.actorSnapshots.every((a) => a.order === "surrender" && a.hp > 0),
        "all six must actually stand down",
      );
    if (v.inventory) return dup();
    v.inventory = {
      guardRounds: e.actorSnapshots.reduce((n, a) => n + a.rounds, 0),
      actorIds: Object.keys(v.actors),
      cartStock: clone(v.stock),
    };
    add("disarmPactGuards", {
      actorIds: Object.keys(v.actors).filter((id) => !v.actors[id].defeated),
      rounds: v.inventory.guardRounds,
    });
  } else if (e.type === "deed-collected") {
    atDesk();
    proof();
    check(v.inventory, "physical inventory required");
    check(
      e.deedSnapshot.entityId === f.handoff.deedId && e.deedSnapshot.visible,
      "same visible deed required",
    );
    if (v.deed) {
      check(
        e.deedSnapshot.parentCarrier === "player-satchel",
        "deed custody lost",
      );
      return dup();
    }
    check(
      e.deedSnapshot.parentCarrier === "deed-desk",
      "deed must come from original desk",
    );
    near(pos(e.deedSnapshot), f.handoff.position, 1.2, "same deed");
    v.deed = true;
    add("setPactDeedCarrier", { carrier: "player-satchel" });
  } else if (e.type === "handoff-received") {
    atDesk();
    parked();
    actorTruth();
    check(v.inventory && v.deed, "inventory and same deed required");
    check(
      e.deedSnapshot.entityId === f.handoff.deedId &&
        e.deedSnapshot.parentCarrier === "player-satchel" &&
        e.deedSnapshot.visible,
      "same carried deed required",
    );
    near(pos(e.deedSnapshot), e.playerPosition, 1.8, "carried deed");
    const dead = Object.values(v.actors).filter((a) => a.defeated).length;
    check(
      dead === 6 ||
        (dead === 0 &&
          v.clearance &&
          e.actorSnapshots.every(
            (a) =>
              a.order === "surrender" && a.rounds === 0 && a.magazine === 0,
          )),
      "six dead or verified six disarmed required",
    );
    if (v.receipt) return dup();
    v.receipt = {
      id: f.handoff.receiptId,
      witnessId: f.handoff.witnessId,
      deedId: f.handoff.deedId,
      cartId: f.cart.id,
      siding: v.siding,
      stock: clone(v.stock),
      lighting: v.lightChoice,
    };
    add("issuePactReceipt", {
      receipt: v.receipt,
      exit: f.handoff.exit,
      rewardDelta: 0,
    });
  }
  return { view: v, effects, changed: true };
}
function replay(id, state) {
  const f = definitions(id);
  exact(state, ["version", "missionId", "events"], "pact progress");
  check(
    state.version === 1 &&
      state.missionId === id &&
      Array.isArray(state.events) &&
      state.events.length <= 512,
    "invalid pact header",
  );
  let view = initial(f);
  const ids = new Set();
  for (const e of state.events) {
    validateEvent(e);
    check(!ids.has(e.id), "duplicate event ID");
    ids.add(e.id);
    const r = apply(f, view, e);
    check(r.changed, "saved semantic duplicate");
    view = r.view;
  }
  return { flow: f, view };
}
function summary(f, v) {
  return {
    version: 1,
    missionId: f.missionId,
    complete: Boolean(v.receipt),
    evidence: clone(v.evidence),
    feedCut: v.feedCut,
    localChoices: {
      ...(v.siding ? { siding: v.siding } : {}),
      ...(v.lightChoice ? { lighting: v.lightChoice } : {}),
    },
    cart: {
      entityId: f.cart.id,
      checkpoint: v.checkpoint,
      parked: v.parked,
      stock: clone(v.stock),
    },
    clearance: v.clearance,
    inventory: clone(v.inventory),
    deed: {
      entityId: f.handoff.deedId,
      carrier: v.deed ? "player-satchel" : "deed-desk",
    },
    response: clone(v.response),
    actors: clone(v.actors),
    defeatedActors: Object.keys(v.actors).filter((id) => v.actors[id].defeated),
    receipt: clone(v.receipt),
    fieldChoices: v.lightChoice
      ? {
          "pact-feed": "military-only",
          "pact-cart": "brake-in-siding",
          "pact-lights": v.lightChoice,
        }
      : {},
    rewardDelta: 0,
  };
}
export function createPactProgress(id) {
  definitions(id);
  return { version: 1, missionId: id, events: [] };
}
export function recordPactEvent(id, state, event) {
  const { flow, view } = replay(id, state);
  validateEvent(event);
  const old = state.events.find((e) => e.id === event.id);
  if (old) {
    check(same(old, event), "event ID reused with different payload");
    return {
      state: clone(state),
      accepted: false,
      duplicate: true,
      effects: [],
      status: summary(flow, view),
    };
  }
  const r = apply(flow, view, event);
  if (!r.changed)
    return {
      state: clone(state),
      accepted: false,
      duplicate: true,
      effects: [],
      status: summary(flow, view),
    };
  check(state.events.length < 512, "event log limit reached");
  return {
    state: { ...clone(state), events: [...clone(state.events), clone(event)] },
    accepted: true,
    duplicate: false,
    effects: r.effects.map((effect, i) => ({
      effectId: `${id}:pact-v1:${event.id}:${i}`,
      ...effect,
    })),
    status: summary(flow, r.view),
  };
}
export function canonicalPactProgress(
  id,
  state,
  { requireComplete = true } = {},
) {
  check(typeof requireComplete === "boolean", "invalid completion option");
  const { flow, view } = replay(id, state);
  if (requireComplete)
    check(
      view.receipt &&
        view.feedCut &&
        view.parked &&
        view.lightChoice &&
        view.deed &&
        view.inventory,
      "same supply cart/deed handoff is incomplete",
    );
  return summary(flow, view);
}
export function pactFlowRecord(id, state) {
  return { progress: clone(state), result: canonicalPactProgress(id, state) };
}
export function validPactFlowRecord(row) {
  try {
    if (!plain(row)) return false;
    if (!Object.hasOwn(row, "pactFlow")) return true;
    exact(row.pactFlow, ["progress", "result"], "pact history");
    return same(
      row.pactFlow.result,
      canonicalPactProgress(row.missionId, row.pactFlow.progress),
    );
  } catch {
    return false;
  }
}
export function validPactFlowRequirement(run) {
  return (
    plain(run) &&
    (!Object.hasOwn(run, "pactFlowVersion") ||
      (run.missionId === "dawn-pact" && run.pactFlowVersion === 1))
  );
}
export function entryPactProgress(run) {
  check(validPactFlowRequirement(run), "unsupported pact version");
  return {
    pactFlowVersion: 1,
    pactProgress: createPactProgress(run.missionId),
    notice:
      "已回安全入口；同一礦車、24發有限庫存、軍民線、電池與地契回原位，重新準備交接；先前現場進度未保留，沒有永久消耗。",
  };
}
