// Deterministic, immutable local evidence/custody rules. No clocks, money, DOM or actor creation.
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
  if (!v) throw new Error(`Ledger flow: ${m}`);
};
const exact = (v, keys, label) =>
  check(
    plain(v) &&
      Object.keys(v).length === keys.length &&
      keys.every((k) => Object.hasOwn(v, k)),
    `${label} has missing/unknown fields`,
  );
const point = (v) =>
  Array.isArray(v) &&
  v.length === 2 &&
  v.every((n) => Number.isFinite(n) && Math.abs(n) <= 23);
const dist = (a, b) => Math.hypot(a[0] - b[0], a[1] - b[1]);
const angle = (v, target) => Number.isFinite(v) && Math.abs(v - target) < 0.01;
const pos = (snapshot) => [
  snapshot.worldPosition[0],
  snapshot.worldPosition[2],
];

export const LEDGER_FLOW = freeze({
  "black-ledger": {
    version: 1,
    missionId: "black-ledger",
    title: "黑帳與白晝：核證原帳與副本保管",
    evidence: {
      "ledger-ticket": {
        recordId: "night-freight-ticket",
        position: [-16, 8],
        radius: 2.8,
        title: "夜班貨運票",
        facts: { ticket: "A17", wagon: "314", batch: "N17" },
        text: "夜班過站票正面 A17，背面車號 314，批次 N17。車牌要同時符合兩欄，不能只挑相同票號。",
      },
      "ledger-payment": {
        recordId: "overwritten-manager-payment",
        position: [16, 4],
        radius: 2.8,
        title: "守衛付款收據",
        facts: {
          batch: "N17",
          inkPayee: "bookkeeper",
          impressionPayee: "manager",
        },
        text: "N17 的表面墨水寫帳房領款；複寫頁還留著原筆壓痕。對齊定位孔，再用側光讀原收款人，不能只信改寫後的墨水。",
      },
      "ledger-names": {
        recordId: "missing-workers-n17",
        position: [-15, -8],
        radius: 2.8,
        title: "被塗抹的姓名",
        facts: {
          batch: "N17",
          workerIds: ["worker-014", "worker-027", "worker-031", "worker-046"],
        },
        text: "N17 的四筆耗材支出對應 014 艾達、027 巴斯、031 柯爾、046 黛拉。核證付款頁時，要連同完整工號一起保存。",
      },
    },
    carriage: {
      taskId: "ledger-carriage",
      position: [-14, 2],
      radius: 2.3,
      tagAngle: Math.PI,
      frameSlot: "A17-314",
      frameDistance: 0.015,
      fieldChoiceId: "a17-314",
    },
    carbon: {
      taskId: "ledger-carbon",
      position: [6, 14],
      radius: 2.3,
      sheetOffset: 0,
      lampAngle: Math.PI / 2,
      fieldChoiceId: "manager-impression",
    },
    press: {
      taskId: "ledger-copy",
      position: [11, -7],
      radius: 2.3,
      pressedAngle: 1.05,
    },
    original: {
      id: "original-company-ledger",
      position: [-14, 2],
      radius: 2.3,
      tether: 1.8,
      carrier: "player-satchel",
      unique: true,
    },
    copy: {
      id: "verified-ledger-copy",
      position: [11, -7],
      radius: 2.3,
      tether: 1.8,
      unique: true,
      sourcePart: "copy-tray",
    },
    notice: {
      id: "ledger-notice-board",
      position: [11, 1],
      radius: 1.8,
      witness: {
        id: "ledger-bookkeeper",
        position: [9, 1],
        characterId: "ledger-bookkeeper",
        radius: 1.8,
        poseTolerance: 0.08,
      },
    },
    courier: {
      id: "ledger-south-courier",
      position: [-13, 14],
      characterId: "orin",
      radius: 1.8,
      poseTolerance: 0.08,
    },
    choices: {
      "sealed-courier": {
        title: "密封託付",
        custodianId: "ledger-south-courier",
        scope: "sealed-copy",
        fieldRewardDelta: -10,
        text: "同一副本隨密封信袋交南西奧林保管；原帳始終由你背著。10 旅費只由原現場工作結算一次。",
      },
      "notice-copy": {
        title: "先公開一頁",
        custodianId: "ledger-notice-board",
        scope: "one-page-public",
        fieldRewardDelta: 0,
        text: "同一副本張貼原公告欄，由帳房具名見證；並未替你決定原帳最終全面公開或封存。",
      },
    },
    actors: {
      "ledger-1": {
        initialOrder: "guard",
        position: [-7, 0],
        inspectPosition: [6, 1],
      },
      "ledger-2": { initialOrder: "guard", position: [7, -3] },
      "ledger-3": { initialOrder: "guard", position: [-5, -10] },
      "ledger-4": { initialOrder: "guard", position: [9, -12] },
      "ledger-5": {
        initialOrder: "guard",
        position: [1, -5],
        inspectPosition: [6, 3],
      },
    },
    response: {
      id: "ledger-notice-inspection",
      actorIds: ["ledger-1", "ledger-5"],
      targetId: "ledger-public-passage",
      sourcePosition: [1, -5],
      warning:
        "兩名既有守軍將查驗公示通路；在帳房身旁出示貨票、付款壓痕與完整工名，可令查驗停止。",
      minimumAttackTelegraphMs: 800,
      spawn: false,
    },
    mistake: {
      alertDelta: 1,
      exposureSeconds: 1.5,
      permanentResourceCost: 0,
      blocksInput: false,
    },
    receipt: {
      id: "ledger-custody-receipt-n17",
      title: "具名副本保管與原帳通行回條",
      replaces: "black-ledger-cargo",
      exit: [-12, 18],
      rewardDelta: 0,
    },
  },
});
const definitions = (id) => {
  check(Object.hasOwn(LEDGER_FLOW, id), "unknown mission");
  return LEDGER_FLOW[id];
};
const eventKeys = {
  "evidence-observed": ["sourceId", "recordId", "playerPosition"],
  "carriage-observed": ["carriageSnapshot", "playerPosition"],
  "carriage-verified": [
    "ticket",
    "wagon",
    "batch",
    "carriageSnapshot",
    "playerPosition",
  ],
  "carbon-observed": ["carbonSnapshot", "playerPosition"],
  "carbon-verified": [
    "payee",
    "batch",
    "workerIds",
    "carbonSnapshot",
    "playerPosition",
  ],
  "original-secured": ["originalSnapshot", "playerPosition"],
  "custody-selected": ["choiceId", "originalSnapshot", "playerPosition"],
  "copy-created": [
    "pressAngle",
    "copySnapshot",
    "originalSnapshot",
    "playerPosition",
  ],
  "copy-picked-up": ["copySnapshot", "originalSnapshot", "playerPosition"],
  "copy-dropped": ["copySnapshot", "originalSnapshot", "playerPosition"],
  "copy-delivered": [
    "custodianId",
    "receiverPosition",
    "copySnapshot",
    "originalSnapshot",
    "playerPosition",
  ],
  "clearance-presented": [
    "receiverId",
    "receiverPosition",
    "originalSnapshot",
    "playerPosition",
  ],
  "response-warning-presented": ["responseId"],
  "response-activated": ["responseId"],
  "actor-defeated": ["actorId"],
  "custody-receipt-issued": [
    "receiverId",
    "receiverPosition",
    "copySnapshot",
    "originalSnapshot",
    "playerPosition",
  ],
};
function carriage(c) {
  exact(c, ["tagAngle", "frameSlot", "frameDistance"], "carriage snapshot");
  check(
    Number.isFinite(c.tagAngle) &&
      Math.abs(c.tagAngle) <= Math.PI * 2 &&
      ["A17-341", "A17-314", "A71-314", "open"].includes(c.frameSlot) &&
      Number.isFinite(c.frameDistance) &&
      c.frameDistance >= 0 &&
      c.frameDistance <= 5,
    "invalid carriage controls",
  );
}
function carbon(c) {
  exact(c, ["sheetOffset", "lampAngle"], "carbon snapshot");
  check(
    Number.isFinite(c.sheetOffset) &&
      Math.abs(c.sheetOffset) <= 5 &&
      Number.isFinite(c.lampAngle) &&
      Math.abs(c.lampAngle) <= Math.PI * 2,
    "invalid carbon controls",
  );
}
function entity(c) {
  exact(
    c,
    ["entityId", "parentCarrier", "worldPosition", "visible"],
    "physical entity snapshot",
  );
  check(
    typeof c.entityId === "string" &&
      typeof c.parentCarrier === "string" &&
      c.entityId.length <= 96 &&
      c.parentCarrier.length <= 96 &&
      Array.isArray(c.worldPosition) &&
      c.worldPosition.length === 3 &&
      c.worldPosition.every((n) => Number.isFinite(n) && Math.abs(n) <= 24) &&
      typeof c.visible === "boolean",
    "invalid physical entity",
  );
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
    else if (key === "carriageSnapshot") carriage(v);
    else if (key === "carbonSnapshot") carbon(v);
    else if (key === "originalSnapshot" || key === "copySnapshot") entity(v);
    else if (key === "pressAngle")
      check(Number.isFinite(v), "invalid press angle");
    else if (key === "workerIds")
      check(
        Array.isArray(v) &&
          v.length <= 8 &&
          v.every(
            (x) => typeof x === "string" && x.length > 0 && x.length <= 96,
          ) &&
          new Set(v).size === v.length,
        "invalid worker list",
      );
    else
      check(
        typeof v === "string" && v.length > 0 && v.length <= 96,
        `invalid ${key}`,
      );
  }
}
function initial(flow) {
  return {
    evidence: {},
    carriage: null,
    carbon: null,
    shipmentVerified: false,
    paymentVerified: false,
    originalSecured: false,
    choice: null,
    copy: {
      created: false,
      carrier: null,
      position: [...flow.copy.position],
      delivered: false,
    },
    clearance: false,
    receipt: null,
    actors: Object.fromEntries(
      Object.entries(flow.actors).map(([id, a]) => [
        id,
        { defeated: false, order: a.initialOrder },
      ]),
    ),
    response: {
      status: "waiting",
      warned: false,
      presented: false,
      activated: false,
      reason: null,
    },
  };
}
function apply(flow, current, e) {
  const v = clone(current),
    effects = [],
    add = (type, data) => effects.push({ type, ...clone(data) });
  const duplicate = () => ({ view: current, effects: [], changed: false });
  const near = (a, b, r, label) =>
    check(dist(a, b) <= r + 1e-8, `${label} requires actual nearby position`);
  const mistake = (message) =>
    add("recoverableMistake", { ...flow.mistake, message });
  const proof = () =>
    check(
      v.shipmentVerified &&
        v.paymentVerified &&
        Object.keys(flow.evidence).every((id) => v.evidence[id]),
      "current complete cross-evidence is required",
    );
  const heldOriginal = () => {
    check(
      v.originalSecured &&
        e.originalSnapshot.entityId === flow.original.id &&
        e.originalSnapshot.parentCarrier === "player-satchel" &&
        e.originalSnapshot.visible,
      "same visible original must remain in player satchel",
    );
    near(
      pos(e.originalSnapshot),
      e.playerPosition,
      flow.original.tether,
      "original satchel",
    );
  };
  const copy = (carrier) =>
    check(
      e.copySnapshot.entityId === flow.copy.id &&
        e.copySnapshot.parentCarrier === carrier &&
        e.copySnapshot.visible,
      "same visible copy has wrong physical holder",
    );
  const living = () =>
    flow.response.actorIds.filter((id) => !v.actors[id].defeated);
  const order = (ids, name, targetId) => {
    const alive = ids.filter((id) => !v.actors[id].defeated);
    if (alive.length) {
      for (const id of alive) v.actors[id].order = name;
      add("setActorOrder", {
        actorIds: alive,
        order: name,
        targetId,
        resetEngagement: ["hold", "standby"].includes(name),
      });
    }
  };
  const stop = (reason) => {
    if (["prevented", "cancelled", "neutralized"].includes(v.response.status))
      return;
    v.response.status = v.response.warned ? "cancelled" : "prevented";
    v.response.reason = reason;
    order(flow.response.actorIds, "standby", "original-ledger-posts");
    add("setResponseState", { responseId: flow.response.id, ...v.response });
  };
  const receiver = () =>
    v.choice === "sealed-courier" ? flow.courier : flow.notice.witness;
  if (
    v.receipt &&
    ![
      "clearance-presented",
      "actor-defeated",
      "response-warning-presented",
      "response-activated",
      "custody-receipt-issued",
    ].includes(e.type)
  )
    check(
      false,
      "custody receipt seals the completed evidence and physical ownership",
    );
  if (e.type === "evidence-observed") {
    const source = flow.evidence[e.sourceId];
    check(source && e.recordId === source.recordId, "unknown evidence");
    near(e.playerPosition, source.position, source.radius, "evidence");
    if (v.evidence[e.sourceId]) return duplicate();
    v.evidence[e.sourceId] = e.recordId;
    add("showLedgerEvidence", { sourceId: e.sourceId, ...source });
  } else if (e.type === "carriage-observed") {
    near(
      e.playerPosition,
      flow.carriage.position,
      flow.carriage.radius,
      "carriage controls",
    );
    if (same(v.carriage, e.carriageSnapshot)) return duplicate();
    v.carriage = clone(e.carriageSnapshot);
    v.shipmentVerified = false;
    v.clearance = false;
    add("invalidateLedgerProof", {
      proof: "shipment",
      reason: "physical-carriage-changed",
    });
  } else if (e.type === "carriage-verified") {
    near(
      e.playerPosition,
      flow.carriage.position,
      flow.carriage.radius,
      "carriage verification",
    );
    check(
      v.evidence["ledger-ticket"] && same(v.carriage, e.carriageSnapshot),
      "read ticket and current physical carriage first",
    );
    const c = e.carriageSnapshot,
      physical =
        angle(c.tagAngle, flow.carriage.tagAngle) &&
        c.frameSlot === flow.carriage.frameSlot &&
        c.frameDistance <= flow.carriage.frameDistance;
    if (
      !physical ||
      e.ticket !== "A17" ||
      e.wagon !== "314" ||
      e.batch !== "N17"
    ) {
      v.shipmentVerified = false;
      v.clearance = false;
      mistake(
        `票號${e.ticket === "A17" ? "相符" : "仍矛盾"}；車號${e.wagon === "314" ? "相符" : "仍矛盾"}；批次${e.batch === "N17" ? "相符" : "仍矛盾"}。還須翻到貨票背面並讓驗證框實際接合；可立即修正。`,
      );
      add("invalidateLedgerProof", {
        proof: "shipment",
        reason: "contradictory-submission",
      });
    } else if (v.shipmentVerified) return duplicate();
    else {
      v.shipmentVerified = true;
      add("confirmLedgerShipment", {
        fieldChoiceId: flow.carriage.fieldChoiceId,
        originalEntityId: flow.original.id,
      });
    }
  } else if (e.type === "carbon-observed") {
    near(
      e.playerPosition,
      flow.carbon.position,
      flow.carbon.radius,
      "carbon controls",
    );
    if (same(v.carbon, e.carbonSnapshot)) return duplicate();
    v.carbon = clone(e.carbonSnapshot);
    v.paymentVerified = false;
    v.clearance = false;
    add("invalidateLedgerProof", {
      proof: "payment",
      reason: "physical-carbon-changed",
    });
  } else if (e.type === "carbon-verified") {
    near(
      e.playerPosition,
      flow.carbon.position,
      flow.carbon.radius,
      "payment verification",
    );
    check(
      v.shipmentVerified &&
        v.evidence["ledger-payment"] &&
        v.evidence["ledger-names"] &&
        same(v.carbon, e.carbonSnapshot),
      "read payment and complete names with current physical carbon first",
    );
    const c = e.carbonSnapshot,
      workers = flow.evidence["ledger-names"].facts.workerIds;
    if (
      Math.abs(c.sheetOffset) > 0.015 ||
      !angle(c.lampAngle, flow.carbon.lampAngle) ||
      e.payee !== "manager" ||
      e.batch !== "N17" ||
      !same(e.workerIds, workers)
    ) {
      v.paymentVerified = false;
      v.clearance = false;
      mistake(
        `收款壓痕${e.payee === "manager" ? "相符" : "仍與表面墨水矛盾"}；批次${e.batch === "N17" ? "相符" : "不符"}；工名${same(e.workerIds, workers) ? "完整" : "不完整"}。定位孔和側光須同時正確，原頁保留，可立即修正。`,
      );
      add("invalidateLedgerProof", {
        proof: "payment",
        reason: "contradictory-submission",
      });
    } else if (v.paymentVerified) return duplicate();
    else {
      v.paymentVerified = true;
      add("confirmLedgerPayment", {
        fieldChoiceId: flow.carbon.fieldChoiceId,
        workerIds: workers,
      });
    }
  } else if (e.type === "original-secured") {
    check(
      v.shipmentVerified,
      "verify the carriage before securing its original",
    );
    near(
      e.playerPosition,
      flow.original.position,
      flow.original.radius,
      "original pickup",
    );
    check(
      e.originalSnapshot.entityId === flow.original.id &&
        e.originalSnapshot.parentCarrier === "original-table" &&
        e.originalSnapshot.visible,
      "take the same original from its real table",
    );
    near(
      pos(e.originalSnapshot),
      flow.original.position,
      0.7,
      "original table",
    );
    if (v.originalSecured) return duplicate();
    v.originalSecured = true;
    add("setLedgerOriginalCarrier", {
      entityId: flow.original.id,
      carrier: "player-satchel",
      unique: true,
    });
  } else if (e.type === "custody-selected") {
    proof();
    heldOriginal();
    near(
      e.playerPosition,
      flow.press.position,
      flow.press.radius,
      "custody selection",
    );
    check(Object.hasOwn(flow.choices, e.choiceId), "unknown custody choice");
    if (v.choice === e.choiceId) return duplicate();
    check(!v.choice, "custody choices are mutually exclusive");
    v.choice = e.choiceId;
    add("selectLedgerCustody", {
      choiceId: e.choiceId,
      ...flow.choices[e.choiceId],
      rewardDelta: 0,
    });
    if (e.choiceId === "sealed-courier") stop("sealed-south-courier");
  } else if (e.type === "copy-created") {
    proof();
    heldOriginal();
    check(v.choice, "select the one copy custodian");
    near(
      e.playerPosition,
      flow.press.position,
      flow.press.radius,
      "copy press",
    );
    copy("copy-tray");
    near(pos(e.copySnapshot), flow.copy.position, 0.8, "original copy tray");
    check(
      angle(e.pressAngle, flow.press.pressedAngle),
      "press the actual copy lever",
    );
    if (v.copy.created) return duplicate();
    v.copy.created = true;
    v.copy.position = pos(e.copySnapshot);
    add("confirmLedgerCopy", {
      entityId: flow.copy.id,
      sourcePart: flow.copy.sourcePart,
      copyCount: 1,
    });
  } else if (e.type === "copy-picked-up") {
    proof();
    heldOriginal();
    check(
      v.copy.created && !v.copy.delivered,
      "create the one copy before carrying",
    );
    copy(
      v.copy.carrier === "player"
        ? "player"
        : v.copy.carrier === null
          ? "copy-tray"
          : v.copy.carrier,
    );
    near(pos(e.copySnapshot), v.copy.position, 0.08, "same copy pickup");
    near(
      e.playerPosition,
      pos(e.copySnapshot),
      flow.copy.radius,
      "copy pickup",
    );
    if (v.copy.carrier === "player") return duplicate();
    v.copy.carrier = "player";
    add("setLedgerCopyCarrier", { entityId: flow.copy.id, carrier: "player" });
  } else if (e.type === "copy-dropped") {
    heldOriginal();
    check(
      v.copy.carrier === "player" && !v.copy.delivered,
      "hold the copy before dropping",
    );
    copy("player");
    near(
      e.playerPosition,
      pos(e.copySnapshot),
      flow.copy.tether,
      "physical carried copy",
    );
    v.copy.carrier = "ground";
    v.copy.position = pos(e.copySnapshot);
    add("setLedgerCopyCarrier", {
      entityId: flow.copy.id,
      carrier: "ground",
      position: v.copy.position,
    });
  } else if (e.type === "copy-delivered") {
    proof();
    heldOriginal();
    check(
      v.choice && v.copy.carrier === "player" && !v.copy.delivered,
      "carry the same copy to its selected custodian",
    );
    copy("player");
    const target = v.choice === "sealed-courier" ? flow.courier : flow.notice;
    check(e.custodianId === target.id, "wrong copy custodian");
    near(e.receiverPosition, target.position, 0.08, "copy destination");
    near(e.playerPosition, e.receiverPosition, target.radius, "player handoff");
    near(
      pos(e.copySnapshot),
      e.receiverPosition,
      target.radius,
      "copy handoff",
    );
    near(
      pos(e.copySnapshot),
      e.playerPosition,
      flow.copy.tether,
      "held copy handoff",
    );
    v.copy.delivered = true;
    v.copy.carrier = target.id;
    v.copy.position = clone(target.position);
    add("transferLedgerCopy", {
      entityId: flow.copy.id,
      custodianId: target.id,
      position: target.position,
      scope: flow.choices[v.choice].scope,
      originalCarrier: "player-satchel",
    });
    if (v.choice === "notice-copy" && v.response.status === "waiting") {
      if (!living().length) {
        v.response.status = "neutralized";
        v.response.reason = "existing-responders-defeated";
      } else if (v.clearance) stop("complete-cross-evidence");
      else {
        v.response.status = "warned";
        v.response.warned = true;
        order(flow.response.actorIds, "hold", "original-ledger-posts");
        add("announceLedgerResponse", {
          responseId: flow.response.id,
          text: flow.response.warning,
          actorIds: living(),
          targetId: flow.response.targetId,
          minimumAttackTelegraphMs: 800,
          spawn: false,
        });
      }
      add("setResponseState", { responseId: flow.response.id, ...v.response });
    }
  } else if (e.type === "clearance-presented") {
    proof();
    heldOriginal();
    check(v.choice, "choose a custodian before presenting the originals");
    const target = receiver();
    check(e.receiverId === target.id, "wrong clearance witness");
    near(
      e.receiverPosition,
      target.position,
      target.poseTolerance,
      "clearance witness",
    );
    near(
      e.playerPosition,
      e.receiverPosition,
      target.radius,
      "clearance presentation",
    );
    if (v.clearance) return duplicate();
    v.clearance = true;
    stop("complete-cross-evidence");
    add("confirmLedgerClearance", {
      receiverId: target.id,
      originalCarrier: "player-satchel",
      workerIds: flow.evidence["ledger-names"].facts.workerIds,
    });
  } else if (e.type === "response-warning-presented") {
    check(e.responseId === flow.response.id, "unknown response");
    if (
      v.response.presented ||
      ["prevented", "cancelled", "neutralized"].includes(v.response.status)
    )
      return duplicate();
    check(v.response.status === "warned", "warn before presentation");
    v.response.presented = true;
  } else if (e.type === "response-activated") {
    check(e.responseId === flow.response.id, "unknown response");
    if (
      v.response.activated ||
      ["prevented", "cancelled", "neutralized"].includes(v.response.status)
    )
      return duplicate();
    check(
      v.response.status === "warned" && v.response.presented,
      "actually present warning before guard movement",
    );
    v.response.activated = true;
    v.response.status = "active";
    order(flow.response.actorIds, "investigate", flow.response.targetId);
    add("setResponseState", { responseId: flow.response.id, ...v.response });
  } else if (e.type === "actor-defeated") {
    check(Object.hasOwn(v.actors, e.actorId), "unknown existing ledger guard");
    if (v.actors[e.actorId].defeated) return duplicate();
    v.actors[e.actorId] = { defeated: true, order: "defeated" };
    if (
      !living().length &&
      ["waiting", "warned", "active"].includes(v.response.status)
    ) {
      v.response.status = "neutralized";
      v.response.reason = "existing-responders-defeated";
      add("setResponseState", { responseId: flow.response.id, ...v.response });
    }
  } else if (e.type === "custody-receipt-issued") {
    proof();
    heldOriginal();
    check(v.copy.delivered, "actual copy custody must precede receipt");
    const target = receiver();
    check(e.receiverId === target.id, "wrong receipt signatory");
    near(
      e.receiverPosition,
      target.position,
      target.poseTolerance,
      "receipt signatory",
    );
    near(
      e.playerPosition,
      e.receiverPosition,
      target.radius,
      "receipt handoff",
    );
    copy(v.copy.carrier);
    near(
      pos(e.copySnapshot),
      v.copy.position,
      target.id === flow.courier.id ? flow.courier.radius : 0.8,
      "same entrusted copy",
    );
    if (v.receipt) return duplicate();
    v.receipt = {
      id: flow.receipt.id,
      receiverId: target.id,
      custodianId: v.copy.carrier,
      originalEntityId: flow.original.id,
      originalCarrier: "player-satchel",
      copyEntityId: flow.copy.id,
      scope: flow.choices[v.choice].scope,
      fieldRewardDelta: flow.choices[v.choice].fieldRewardDelta,
      batch: "N17",
    };
    add("issueLedgerReceipt", {
      receipt: v.receipt,
      replaces: flow.receipt.replaces,
      exit: flow.receipt.exit,
      rewardDelta: 0,
      lockEvidence: true,
    });
  }
  return { view: v, effects, changed: true };
}
function replay(id, state) {
  const flow = definitions(id);
  exact(state, ["version", "missionId", "events"], "ledger progress");
  check(
    state.version === 1 &&
      state.missionId === id &&
      Array.isArray(state.events) &&
      state.events.length <= 512,
    "invalid ledger header",
  );
  let view = initial(flow);
  const ids = new Set();
  for (const e of state.events) {
    validateEvent(e);
    check(!ids.has(e.id), "duplicate event ID");
    ids.add(e.id);
    const result = apply(flow, view, e);
    check(result.changed, "saved semantic duplicate");
    view = result.view;
  }
  return { flow, view };
}
function summary(flow, v) {
  return {
    version: 1,
    missionId: flow.missionId,
    complete: Boolean(v.receipt),
    evidence: clone(v.evidence),
    carriageSnapshot: clone(v.carriage),
    carbonSnapshot: clone(v.carbon),
    shipmentVerified: v.shipmentVerified,
    paymentVerified: v.paymentVerified,
    original: {
      entityId: flow.original.id,
      carrier: v.originalSecured ? "player-satchel" : "original-table",
    },
    copy: clone(v.copy),
    localChoices: v.choice ? { custody: v.choice } : {},
    clearance: v.clearance,
    receipt: clone(v.receipt),
    response: clone(v.response),
    actors: clone(v.actors),
    defeatedActors: Object.keys(v.actors).filter((id) => v.actors[id].defeated),
    fieldChoices: v.choice
      ? {
          "ledger-carriage": "a17-314",
          "ledger-carbon": "manager-impression",
          "ledger-copy": v.choice,
        }
      : {},
    rewardDelta: 0,
  };
}
export function createLedgerProgress(id) {
  definitions(id);
  return { version: 1, missionId: id, events: [] };
}
export function recordLedgerEvent(id, state, event) {
  const { flow, view } = replay(id, state);
  validateEvent(event);
  const existing = state.events.find((e) => e.id === event.id);
  if (existing) {
    check(same(existing, event), "event ID reused with different payload");
    return {
      state: clone(state),
      accepted: false,
      duplicate: true,
      effects: [],
      status: summary(flow, view),
    };
  }
  const result = apply(flow, view, event);
  if (!result.changed)
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
    effects: result.effects.map((effect, i) => ({
      effectId: `${id}:ledger-v1:${event.id}:${i}`,
      ...effect,
    })),
    status: summary(flow, result.view),
  };
}
export function canonicalLedgerProgress(
  id,
  state,
  { requireComplete = true } = {},
) {
  check(typeof requireComplete === "boolean", "invalid completion option");
  const { flow, view } = replay(id, state);
  if (requireComplete)
    check(
      view.receipt &&
        view.shipmentVerified &&
        view.paymentVerified &&
        view.originalSecured &&
        view.copy.delivered,
      "actual original and entrusted-copy custody receipt is incomplete",
    );
  return summary(flow, view);
}
export function ledgerFlowRecord(id, state) {
  return { progress: clone(state), result: canonicalLedgerProgress(id, state) };
}
export function validLedgerFlowRecord(row) {
  try {
    if (!plain(row)) return false;
    if (!Object.hasOwn(row, "ledgerFlow")) return true;
    exact(row.ledgerFlow, ["progress", "result"], "ledger history");
    return same(
      row.ledgerFlow.result,
      canonicalLedgerProgress(row.missionId, row.ledgerFlow.progress),
    );
  } catch {
    return false;
  }
}
export function validLedgerFlowRequirement(run) {
  return (
    plain(run) &&
    (!Object.hasOwn(run, "ledgerFlowVersion") ||
      (run.missionId === "black-ledger" && run.ledgerFlowVersion === 1))
  );
}
export function entryLedgerProgress(run) {
  check(validLedgerFlowRequirement(run), "unsupported ledger version");
  return {
    ledgerFlowVersion: 1,
    ledgerProgress: createLedgerProgress(run.missionId),
    notice:
      "已回委託安全入口；重新核對貨票、付款壓痕與工名，原帳與唯一副本回到原位置，先前現場保管進度未保留。",
  };
}
