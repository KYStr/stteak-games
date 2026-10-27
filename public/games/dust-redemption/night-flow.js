/** Original local evacuation rules. CPU event replay is not proof of UI movement. */
const clone = (v) => structuredClone(v);
const freeze = (v) => {
  if (v && typeof v === "object") {
    Object.values(v).forEach(freeze);
    Object.freeze(v);
  }
  return v;
};
const plain = (v) => v !== null && typeof v === "object" && !Array.isArray(v);
const stable = (v) =>
  JSON.stringify(
    v && typeof v === "object"
      ? Array.isArray(v)
        ? v.map((x) => JSON.parse(stable(x)))
        : Object.fromEntries(
            Object.keys(v)
              .sort()
              .map((k) => [k, JSON.parse(stable(v[k]))]),
          )
      : v,
  );
const same = (a, b) => stable(a) === stable(b);
const check = (v, m) => {
  if (!v) throw Error(`Night flow: ${m}`);
};
const exact = (v, keys, label) =>
  check(
    plain(v) &&
      Object.keys(v).length === keys.length &&
      keys.every((k) => Object.hasOwn(v, k)),
    `${label} missing/unknown fields`,
  );
const point = (v) =>
  Array.isArray(v) &&
  v.length === 2 &&
  v.every((n) => Number.isFinite(n) && Math.abs(n) <= 23);
const distance = (a, b) => Math.hypot(a[0] - b[0], a[1] - b[1]);
const near = (a, b, r, m) =>
  check(point(a) && point(b) && distance(a, b) <= r + 1e-8, m);
const angle = (a, b) => Number.isFinite(a) && Math.abs(a - b) < 0.01;
const ids = ["night-family-1", "night-family-2", "night-family-3"];
export const NIGHT_FLOW = freeze({
  "long-night": {
    version: 1,
    missionId: "long-night",
    title: "長夜過峽：同一隊家屬安全抵達",
    evidence: {
      "night-order": {
        recordId: "expired-road-order-n17",
        position: [-16, 8],
        radius: 2.8,
        title: "過期的封路令",
        facts: { order: "ROAD-16", expired: true, currentPass: "PASS-17" },
        text: "ROAD-16 昨夜到期；今日 PASS-17 允許三名無武裝家屬返回診所。請比對三名證件與當日通行章。",
      },
      "night-papers": {
        recordId: "civilian-family-pass-17",
        position: [16, 4],
        radius: 2.8,
        title: "親屬證件",
        facts: { batch: "PASS-17", memberIds: ids, armed: false },
        text: "PASS-17：羅絲、塔文、米洛；三人皆為無武裝返鄉家屬。這份同一文件可帶到北段路口或南側集合處出示。",
      },
      "night-route": {
        recordId: "two-evacuation-routes",
        position: [-15, -8],
        radius: 2.8,
        title: "未淹的渡口",
        facts: { waterLevel: 1, safeBelow: 2 },
        text: "實測水位 1 低於安全刻線 2。西線末段須開連動便橋擋板；東線經明示的開口，沒有第三條捷徑。",
      },
    },
    members: ids.map((id, i) => ({
      id,
      name: ["羅絲", "塔文", "米洛"][i],
      model: ["npc-mara", "npc-june", "npc-elias"][i],
      position: [13 + (i - 1) * 0.65, -7 + Math.abs(i - 1) * 0.35],
    })),
    documents: {
      id: "family-passage-papers",
      batch: "PASS-17",
      memberIds: ids,
      position: [16, 4],
      radius: 2.8,
      tether: 1.8,
    },
    routeTask: { id: "night-route-plan", position: [-13, 13], radius: 2.3 },
    brace: {
      taskId: "night-brace",
      position: [5, 5],
      radius: 2.3,
      angle: Math.PI / 4,
      maxEndDistance: 0.015,
      testRadius: 1.1,
    },
    escort: {
      taskId: "night-escort",
      position: [13, -7],
      leash: 6,
      speed: 2.4,
      memberRadius: 0.27,
      checkpointRadius: 1.3,
    },
    routes: {
      "west-ford": {
        title: "西側淺灘與末段便橋",
        armAngle: -0.65,
        waypoints: [
          [13, -7],
          [12, -4],
          [5, -4],
          [5, 5],
          [-13, 5],
          [-13, 13],
          [-12, 17],
        ],
        bridgeIndex: 5,
        responseTarget: [-9, 6],
        coverIds: ["north-shelter", "junction-shelter", "west-shelter"],
        consequence: "較長路線有實際掩蔽；末段連動便橋須親手打開。",
      },
      "east-ridge": {
        title: "東側岩脊開口",
        armAngle: 0.65,
        waypoints: [
          [13, -7],
          [12, -4],
          [5, -4],
          [5, 5],
          [3, 16],
          [-12, 17],
        ],
        bridgeIndex: null,
        responseTarget: [6, 12.5],
        coverIds: ["north-shelter", "junction-shelter", "east-shelter"],
        consequence:
          "較直接但經暴露開口；已知側翼者可能繞向此處，先出示文件可取消。",
      },
    },
    safeCovers: {
      "north-shelter": { position: [12, -4], radius: 1.5 },
      "junction-shelter": { position: [5, 5], radius: 1.5 },
      "west-shelter": { position: [-13, 5], radius: 1.5 },
      "east-shelter": { position: [3, 16], radius: 1.5 },
    },
    bridge: {
      id: "night-west-bridge-gate",
      position: [-13, 13],
      hingePosition: [-13, 10.2],
      radius: 2.3,
      openAngle: 1.05,
    },
    clearancePosts: {
      "north-passage-post": { position: [12, -4], radius: 2.3 },
      "south-assembly": { position: [-12, 17], radius: 2.3 },
    },
    arrival: {
      id: "south-assembly",
      position: [-12, 17],
      radius: 2.1,
      playerRadius: 2.3,
    },
    actors: Object.fromEntries(
      [
        [-7, 0],
        [7, -3],
        [-5, -10],
        [9, -12],
        [1, -5],
        [-11, -4],
      ].map((position, i) => [
        `night-${i + 1}`,
        {
          position,
          type: ["guard", "flanker", "shotgun", "sniper", "guard", "guard"][i],
        },
      ]),
    ),
    response: {
      actorId: "night-2",
      triggerCheckpoint: 3,
      title: "側翼者塔洛正在查看隊伍路線",
      warning:
        "塔洛會沿側路繞向你選的路段。家屬可留在掩體；出示 PASS-17 與過期令可取消查驗。",
    },
    receipt: {
      id: "three-family-arrival-pass-17",
      title: "羅絲、塔文、米洛到達回條",
      replaces: ["long-night-cargo", "long-night-parley"],
      exit: [-12, 18],
    },
  },
});
const schema = {
  "evidence-observed": ["clueId", "recordId", "playerPosition"],
  "documents-collected": ["snapshot", "playerPosition"],
  "route-selected": ["choiceId", "snapshot", "playerPosition"],
  "brace-observed": ["snapshot", "playerPosition"],
  "bridge-tested": ["snapshot", "fromPosition", "playerPosition"],
  "bridge-opened": ["snapshot", "playerPosition"],
  "clearance-presented": ["postId", "reason", "documents", "playerPosition"],
  "escort-started": ["snapshot", "playerPosition"],
  "escort-checkpoint": ["index", "snapshot", "playerPosition", "gateAngle"],
  "escort-command": ["command", "coverId", "snapshot", "playerPosition"],
  "response-warning-presented": [],
  "response-activated": [],
  "actor-defeated": ["actorId"],
  "arrival-received": ["snapshot", "playerPosition", "documents"],
};
function validateEvent(e) {
  check(
    plain(e) &&
      typeof e.id === "string" &&
      e.id.length > 0 &&
      e.id.length <= 96 &&
      Object.hasOwn(schema, e.type),
    "unknown event or invalid ID",
  );
  exact(e, ["id", "type", ...schema[e.type]], "event");
  if (Object.hasOwn(e, "playerPosition"))
    check(point(e.playerPosition), "invalid player position");
}
function definition(id) {
  check(Object.hasOwn(NIGHT_FLOW, id), "unknown mission");
  return NIGHT_FLOW[id];
}
function documentSnapshot(s) {
  exact(
    s,
    ["entityId", "batch", "memberIds", "position", "carrier", "visible"],
    "documents",
  );
  check(
    point(s.position) &&
      Array.isArray(s.memberIds) &&
      s.memberIds.every((x) => typeof x === "string") &&
      typeof s.visible === "boolean" &&
      ["source", "player"].includes(s.carrier),
    "invalid document snapshot",
  );
}
function party(s) {
  exact(s, ["members", "paused", "routeIndex"], "party");
  check(
    Array.isArray(s.members) &&
      s.members.length === 3 &&
      typeof s.paused === "boolean" &&
      Number.isInteger(s.routeIndex) &&
      s.routeIndex >= 0,
    "invalid party",
  );
  check(
    s.members.every((m, i) => {
      exact(m, ["id", "position", "state"], "member");
      return (
        m.id === ids[i] &&
        point(m.position) &&
        ["follow", "wait", "leash", "safe"].includes(m.state)
      );
    }),
    "same three physical members required",
  );
}
function braceSnapshot(s) {
  exact(s, ["angle", "endDistances", "boardHeight"], "brace");
  check(
    Number.isFinite(s.angle) &&
      Array.isArray(s.endDistances) &&
      s.endDistances.length === 2 &&
      s.endDistances.every((x) => Number.isFinite(x) && x >= 0) &&
      Number.isFinite(s.boardHeight),
    "invalid brace measurement",
  );
}
const braceReady = (flow, s) =>
  angle(s.angle, flow.brace.angle) &&
  s.endDistances.every((x) => x <= flow.brace.maxEndDistance);
function initial(flow) {
  return {
    evidence: [],
    documentsCollected: false,
    routeId: null,
    brace: null,
    bridgeTested: false,
    bridgeOpen: false,
    clearance: false,
    started: false,
    checkpoint: -1,
    paused: true,
    party: null,
    commands: [],
    receipt: null,
    mistakes: 0,
    actors: Object.fromEntries(
      Object.keys(flow.actors).map((id) => [
        id,
        { defeated: false, order: "ordinary" },
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
function apply(flow, old, e) {
  const v = clone(old),
    effects = [];
  const add = (type, data = {}) => effects.push({ type, ...data });
  const duplicate = () => ({ view: old, effects: [], changed: false });
  const needParty = () => {
    party(e.snapshot);
    check(
      e.snapshot.routeIndex === v.checkpoint + 1,
      "route index does not match visited physical checkpoints",
    );
  };
  const allNear = (p, r) =>
    e.snapshot.members.every((m) => distance(m.position, p) <= r + 1e-8);
  const validDocuments = (s) => {
    documentSnapshot(s);
    return (
      v.documentsCollected &&
      s.entityId === flow.documents.id &&
      s.batch === flow.documents.batch &&
      same(s.memberIds, ids) &&
      s.visible &&
      s.carrier === "player" &&
      distance(s.position, e.playerPosition) <= flow.documents.tether
    );
  };
  const mistake = (message) => {
    v.mistakes++;
    add("recoverableMistake", {
      message,
      alertDelta: 1,
      exposureSeconds: 1.5,
      permanentDamage: 0,
      blocksInput: false,
    });
  };
  const order = (order, target) => {
    const a = v.actors["night-2"];
    if (!a.defeated && a.order !== order) {
      a.order = order;
      add("setActorOrder", { actorId: "night-2", order, position: target });
    }
  };
  const prevent = () => {
    if (["waiting", "warned", "active"].includes(v.response.status)) {
      v.response.status = v.response.warned ? "cancelled" : "prevented";
      v.response.reason = "valid-family-papers";
      order("hold", flow.actors["night-2"].position);
      add("setResponseState", { status: v.response.status });
    }
  };
  if (v.receipt && !["actor-defeated", "clearance-presented"].includes(e.type))
    return duplicate();
  if (e.type === "evidence-observed") {
    const d = flow.evidence[e.clueId];
    check(d && e.recordId === d.recordId, "unknown evidence");
    near(e.playerPosition, d.position, d.radius, "observe actual clue");
    if (v.evidence.includes(e.clueId)) return duplicate();
    v.evidence.push(e.clueId);
    add("showNightEvidence", { clueId: e.clueId, text: d.text });
  } else if (e.type === "documents-collected") {
    documentSnapshot(e.snapshot);
    check(v.evidence.includes("night-papers"), "read family papers first");
    near(
      e.playerPosition,
      flow.documents.position,
      flow.documents.radius,
      "collect actual papers",
    );
    check(
      e.snapshot.entityId === flow.documents.id &&
        e.snapshot.batch === flow.documents.batch &&
        same(e.snapshot.memberIds, ids) &&
        e.snapshot.carrier === "source" &&
        e.snapshot.visible,
      "same actual three-person document",
    );
    near(e.snapshot.position, flow.documents.position, 0.15, "source papers");
    if (v.documentsCollected) return duplicate();
    v.documentsCollected = true;
    add("setNightDocumentCarrier", {
      entityId: flow.documents.id,
      carrier: "player",
    });
  } else if (e.type === "route-selected") {
    exact(e.snapshot, ["armAngle", "waterLevel"], "route");
    check(
      Number.isFinite(e.snapshot.armAngle) &&
        Number.isFinite(e.snapshot.waterLevel),
      "invalid route reading",
    );
    near(
      e.playerPosition,
      flow.routeTask.position,
      flow.routeTask.radius,
      "route sign nearby",
    );
    check(
      v.evidence.includes("night-order") && v.evidence.includes("night-route"),
      "read route and order",
    );
    const route = flow.routes[e.choiceId];
    if (
      !route ||
      !angle(e.snapshot.armAngle, route.armAngle) ||
      e.snapshot.waterLevel >= 2 ||
      e.snapshot.waterLevel < 0
    ) {
      mistake(
        "水位必須低於安全刻線，路標箭頭也要指向你選的真路線；可立即重調。",
      );
    } else {
      check(!v.routeId || v.routeId === e.choiceId, "route already selected");
      if (v.routeId) return duplicate();
      v.routeId = e.choiceId;
      add("selectNightRoute", {
        routeId: e.choiceId,
        waypoints: route.waypoints,
        consequence: route.consequence,
      });
    }
  } else if (e.type === "brace-observed" || e.type === "bridge-tested") {
    braceSnapshot(e.snapshot);
    check(v.routeId, "select route first");
    near(
      e.playerPosition,
      flow.brace.position,
      flow.brace.radius,
      "inspect actual brace",
    );
    if (!braceReady(flow, e.snapshot)) {
      v.brace = clone(e.snapshot);
      v.bridgeTested = false;
      v.bridgeOpen = false;
      add("invalidateNightBridge");
      mistake("斜撐兩端尚未實際接合；安全擋板保持關閉，可立即重新安裝。");
    } else {
      v.brace = clone(e.snapshot);
      if (e.type === "bridge-tested") {
        check(
          point(e.fromPosition) &&
            distance(e.fromPosition, e.playerPosition) > 0.15,
          "step onto board from a distinct physical position",
        );
        near(
          e.playerPosition,
          flow.brace.position,
          flow.brace.testRadius,
          "actual load board overlap",
        );
        check(
          angle(e.snapshot.boardHeight, 0.015),
          "read settled actual load board",
        );
        if (v.bridgeTested) return duplicate();
        v.bridgeTested = true;
        add("confirmNightBridge", { snapshot: e.snapshot });
      } else add("showNightBrace", { snapshot: e.snapshot });
    }
  } else if (e.type === "bridge-opened") {
    exact(e.snapshot, ["gateAngle", "brace"], "bridge gate");
    braceSnapshot(e.snapshot.brace);
    near(
      e.playerPosition,
      flow.brace.position,
      flow.brace.radius,
      "operate original linked bridge rig",
    );
    check(
      v.routeId === "west-ford" &&
        v.bridgeTested &&
        braceReady(flow, e.snapshot.brace) &&
        angle(e.snapshot.brace.boardHeight, 0.015),
      "repair remains physically valid",
    );
    check(
      angle(e.snapshot.gateAngle, flow.bridge.openAngle),
      "open actual gate before passage",
    );
    if (v.bridgeOpen) return duplicate();
    v.bridgeOpen = true;
    add("confirmNightPassage", { routeId: v.routeId });
  } else if (e.type === "clearance-presented") {
    const post = flow.clearancePosts[e.postId];
    check(post, "unknown clearance post");
    near(
      e.playerPosition,
      post.position,
      post.radius,
      "present papers locally",
    );
    check(validDocuments(e.documents), "actual carried papers required");
    if (v.evidence.length !== 3 || e.reason !== "expired-order-and-civilians") {
      mistake(
        "核對今日 PASS-17 的三個名字、昨夜已到期的封路令及安全渡口；文件未齊可以補查。",
      );
    } else {
      if (v.clearance) return duplicate();
      v.clearance = true;
      add("confirmNightClearance", {
        documentId: flow.documents.id,
        memberIds: ids,
      });
      prevent();
    }
  } else if (e.type === "escort-started") {
    needParty();
    check(
      v.routeId && v.bridgeTested,
      "route and physical brace test required",
    );
    near(e.playerPosition, flow.escort.position, 3, "start near family");
    check(
      !e.snapshot.paused &&
        allNear(flow.escort.position, 1.2) &&
        e.snapshot.members.every((m) => m.state === "follow"),
      "all three physical family members must be following",
    );
    if (v.started) return duplicate();
    v.started = true;
    v.paused = false;
    v.party = clone(e.snapshot);
    add("confirmNightEscort", { memberIds: ids });
  } else if (e.type === "escort-checkpoint") {
    party(e.snapshot);
    check(
      v.started &&
        !e.snapshot.paused &&
        Number.isInteger(e.index) &&
        e.index === v.checkpoint + 1,
      "visit next physical checkpoint",
    );
    const route = flow.routes[v.routeId],
      goal = route.waypoints[e.index];
    check(goal, "unknown checkpoint");
    check(
      e.snapshot.routeIndex === e.index + 1,
      "actual advanced Field route index",
    );
    near(e.playerPosition, goal, 3, "player at checkpoint");
    check(
      allNear(goal, flow.escort.checkpointRadius) &&
        e.snapshot.members.every((m) => m.state === "follow"),
      "all three must actually reach checkpoint",
    );
    check(Number.isFinite(e.gateAngle), "read actual passage");
    if (route.bridgeIndex !== null && e.index >= route.bridgeIndex)
      check(
        v.bridgeOpen && angle(e.gateAngle, flow.bridge.openAngle),
        "west bridge is physically open",
      );
    v.checkpoint = e.index;
    v.party = clone(e.snapshot);
    v.paused = false;
    add("recordNightCheckpoint", { index: e.index, memberIds: ids });
    if (
      e.index >= flow.response.triggerCheckpoint &&
      v.response.status === "waiting"
    ) {
      if (v.actors["night-2"].defeated) v.response.status = "neutralized";
      else if (v.clearance) prevent();
      else {
        v.response.status = "warned";
        v.response.warned = true;
        add("announceNightResponse", {
          actorId: "night-2",
          title: flow.response.title,
          message: flow.response.warning,
          position: route.responseTarget,
        });
      }
    }
  } else if (e.type === "escort-command") {
    needParty();
    check(
      v.started && ["wait", "follow"].includes(e.command),
      "start escort before commands",
    );
    if (e.command === "follow")
      check(
        e.snapshot.members.every(
          (m) => distance(m.position, e.playerPosition) <= flow.escort.leash,
        ),
        "stay within the same six-metre leash",
      );
    check(
      e.snapshot.paused === (e.command === "wait") &&
        e.snapshot.members.every(
          (m) => m.state === (e.command === "wait" ? "wait" : "follow"),
        ),
      "command must match actual pause and member states",
    );
    if (e.coverId !== null) {
      const cover = flow.safeCovers[e.coverId];
      check(
        cover && flow.routes[v.routeId].coverIds.includes(e.coverId),
        "cover is not on selected route",
      );
      check(
        allNear(cover.position, cover.radius),
        "family must physically occupy the authored cover",
      );
    }
    if (v.paused === e.snapshot.paused) return duplicate();
    v.paused = e.snapshot.paused;
    v.party = clone(e.snapshot);
    v.commands.push({ command: e.command, coverId: e.coverId });
    add("confirmNightCommand", { command: e.command, coverId: e.coverId });
  } else if (e.type === "response-warning-presented") {
    check(v.response.status === "warned", "no pending response warning");
    if (v.response.presented) return duplicate();
    v.response.presented = true;
    add("setResponseState", { status: "warned" });
  } else if (e.type === "response-activated") {
    if (["cancelled", "prevented", "neutralized"].includes(v.response.status))
      return duplicate();
    check(
      v.response.status === "warned" && v.response.presented,
      "show warning before activating",
    );
    check(!v.response.activated, "only one response");
    v.response.status = "active";
    v.response.activated = true;
    order("flank", flow.routes[v.routeId].responseTarget);
    add("setResponseState", { status: "active" });
  } else if (e.type === "actor-defeated") {
    check(Object.hasOwn(v.actors, e.actorId), "unknown existing enemy");
    if (v.actors[e.actorId].defeated) return duplicate();
    v.actors[e.actorId].defeated = true;
    v.actors[e.actorId].order = "down";
    if (
      e.actorId === "night-2" &&
      !["prevented", "cancelled"].includes(v.response.status)
    ) {
      v.response.status = "neutralized";
      add("setResponseState", { status: "neutralized" });
    }
  } else if (e.type === "arrival-received") {
    party(e.snapshot);
    check(
      v.started && v.checkpoint === flow.routes[v.routeId].waypoints.length - 1,
      "complete actual route first",
    );
    check(
      e.snapshot.routeIndex === flow.routes[v.routeId].waypoints.length,
      "finished actual route index",
    );
    near(
      e.playerPosition,
      flow.arrival.position,
      flow.arrival.playerRadius,
      "receive arrival receipt at south",
    );
    check(
      e.snapshot.paused &&
        allNear(flow.arrival.position, flow.arrival.radius) &&
        e.snapshot.members.every((m) => m.state === "safe"),
      "all three same members must be stationary in south assembly",
    );
    check(validDocuments(e.documents), "same carried identity papers required");
    v.party = clone(e.snapshot);
    v.paused = true;
    v.receipt = {
      id: flow.receipt.id,
      title: flow.receipt.title,
      memberIds: ids,
      routeId: v.routeId,
      position: flow.arrival.position,
    };
    add("issueNightReceipt", {
      receipt: v.receipt,
      replaces: flow.receipt.replaces,
      exit: flow.receipt.exit,
      rewardDelta: 0,
    });
  }
  return { view: v, effects, changed: true };
}
function replay(id, state) {
  const flow = definition(id);
  exact(state, ["version", "missionId", "events"], "progress");
  check(
    state.version === 1 &&
      state.missionId === id &&
      Array.isArray(state.events) &&
      state.events.length <= 512,
    "invalid progress",
  );
  let view = initial(flow);
  const seen = new Set();
  for (const e of state.events) {
    validateEvent(e);
    check(!seen.has(e.id), "duplicate stored event ID");
    seen.add(e.id);
    const r = apply(flow, view, e);
    check(r.changed, "stored semantic duplicate");
    view = r.view;
  }
  return { flow, view };
}
function summary(flow, v) {
  return {
    version: 1,
    missionId: flow.missionId,
    complete: Boolean(v.receipt),
    evidence: clone(v.evidence),
    documentsCollected: v.documentsCollected,
    routeId: v.routeId,
    bridgeTested: v.bridgeTested,
    bridgeOpen: v.bridgeOpen,
    clearance: v.clearance,
    started: v.started,
    checkpoint: v.checkpoint,
    paused: v.paused,
    party: clone(v.party),
    commands: clone(v.commands),
    receipt: clone(v.receipt),
    mistakes: v.mistakes,
    response: clone(v.response),
    actors: clone(v.actors),
    defeatedActors: Object.keys(v.actors).filter((id) => v.actors[id].defeated),
    fieldChoices: v.routeId
      ? {
          "night-route-plan": v.routeId,
          "night-brace": "diagonal-brace",
          "night-escort": "count-three",
        }
      : {},
    rewardDelta: 0,
  };
}
export function createNightProgress(id) {
  definition(id);
  return { version: 1, missionId: id, events: [] };
}
export function recordNightEvent(id, state, event) {
  const { flow, view } = replay(id, state);
  validateEvent(event);
  const found = state.events.find((e) => e.id === event.id);
  if (found) {
    check(same(found, event), "event ID reused");
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
  check(state.events.length < 512, "event log limit");
  return {
    state: { ...clone(state), events: [...clone(state.events), clone(event)] },
    accepted: true,
    duplicate: false,
    effects: result.effects.map((effect, i) => ({
      effectId: `${id}:night-v1:${event.id}:${i}`,
      ...effect,
    })),
    status: summary(flow, result.view),
  };
}
export function canonicalNightProgress(
  id,
  state,
  { requireComplete = true } = {},
) {
  check(typeof requireComplete === "boolean", "invalid completion option");
  const { flow, view } = replay(id, state);
  if (requireComplete)
    check(
      view.receipt && view.bridgeTested,
      "actual three-family arrival receipt incomplete",
    );
  return summary(flow, view);
}
export function nightFlowRecord(id, state) {
  return { progress: clone(state), result: canonicalNightProgress(id, state) };
}
export function validNightFlowRecord(row) {
  try {
    if (!plain(row)) return false;
    if (!Object.hasOwn(row, "nightFlow")) return true;
    exact(row.nightFlow, ["progress", "result"], "history");
    return same(
      row.nightFlow.result,
      canonicalNightProgress(row.missionId, row.nightFlow.progress),
    );
  } catch {
    return false;
  }
}
export function validNightFlowRequirement(run) {
  return (
    plain(run) &&
    (!Object.hasOwn(run, "nightFlowVersion") ||
      (run.missionId === "long-night" && run.nightFlowVersion === 1))
  );
}
export function entryNightProgress(run) {
  check(validNightFlowRequirement(run), "unsupported night version");
  return {
    nightFlowVersion: 1,
    nightProgress: createNightProgress(run.missionId),
    notice:
      "已回委託安全入口；三名家屬與通行文件回到原處，重新核對路線、便橋與安全到達，先前局部護送進度未保留。",
  };
}
