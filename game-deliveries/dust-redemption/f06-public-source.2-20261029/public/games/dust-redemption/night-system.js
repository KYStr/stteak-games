import * as THREE from "./vendor/three.module.js";
import {
  NIGHT_FLOW,
  createNightProgress,
  recordNightEvent,
  canonicalNightProgress,
} from "./night-flow.js";
import { createNightProps } from "./night-props.js";
import { moveCircle } from "./physics.js";
import {
  planTacticalPath,
  certifyTacticalPath,
  tacticalSegmentClear,
  tacticalGeometryKey,
} from "./enemy-tactics.js";
const point = (p) => [p.x, p.z],
  vector = (p) => new THREE.Vector3(p[0], 0, p[1]),
  gap = (a, b) => Math.hypot(a.x - b.x, a.z - b.z),
  same = (a, b) => JSON.stringify(a) === JSON.stringify(b);
const esc = (v) =>
  String(v ?? "").replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ],
  );
const button = (action, label, data = "") =>
  `<button data-action="night-${action}" ${data}>${esc(label)}</button>`;
export const NIGHT_EFFECT_TYPES = Object.freeze([
  "showNightEvidence",
  "setNightDocumentCarrier",
  "selectNightRoute",
  "invalidateNightBridge",
  "showNightBrace",
  "confirmNightBridge",
  "confirmNightPassage",
  "confirmNightClearance",
  "confirmNightEscort",
  "recordNightCheckpoint",
  "confirmNightCommand",
  "announceNightResponse",
  "setActorOrder",
  "setResponseState",
  "issueNightReceipt",
  "recoverableMistake",
]);
export function nightPlacementPoints(id) {
  const f = NIGHT_FLOW[id];
  return f
    ? [
        f.documents.position,
        f.routeTask.position,
        f.brace.position,
        f.bridge.hingePosition,
        f.arrival.position,
        ...Object.values(f.safeCovers).map((c) => c.position),
        ...Object.values(f.routes).map((r) => r.responseTarget),
      ]
    : [];
}
/** Scene adapter: family motion remains entirely in the original FieldSystem. */
export class NightSystem {
  constructor(world, id, field, player, enemies, callbacks = {}) {
    this.world = world;
    this.id = id;
    this.flow = NIGHT_FLOW[id];
    if (!this.flow) throw Error(`No night flow ${id}`);
    this.field = field;
    this.player = player;
    this.enemies = enemies;
    this.callbacks = callbacks;
    [this.routeTask, this.brace, this.escort] = [
      "night-route-plan",
      "night-brace",
      "night-escort",
    ].map((id) => field.tasks.find((t) => t.id === id));
    if (!this.routeTask || !this.brace || this.escort?.members.length !== 3)
      throw Error("Night needs the original three Field family actors");
    this.memberObjects = this.escort.members.map((m) => m.object);
    this.progress = createNightProgress(id);
    this.status = canonicalNightProgress(id, this.progress, {
      requireComplete: false,
    });
    this.serial = 0;
    this.appliedEffects = new Set();
    this.orders = new Map();
    this.disposed = false;
    this.testStart = null;
    this.lastBrace = null;
    this.originalText = new Map(
      [this.routeTask, this.brace, this.escort].map((t) => [
        t,
        { description: t.description, hints: t.hints, choices: t.choices },
      ]),
    );
    this.routeTask.description =
      "先讀水位並扳原路牌。西線有掩蔽、末段連動便橋；東線較直接、穿過明示開口。原三人沿選定路線一起走。";
    this.brace.description =
      "把原斜撐兩端接到對角插座，親自試走。西側同一連動便橋隨修復開通，不用再做第二次維修。";
    this.escort.description =
      "靠近三人一起跟隨，保持六公尺內。可在原路點的掩體停等；三人都到南側就核對回條，不再去北方取鈴。";
    this.escort.choices = this.escort.choices.map((c) =>
      c.id === "count-three"
        ? {
            ...c,
            label: "核對同三位家屬到達南側",
            message:
              "三人已在集合圈。返回現場，核對通行文件或清場紀錄後領回條，直接南撤。",
          }
        : c,
    );
    this.props = createNightProps(THREE, world, this.flow);
    this.props.bindField(
      { route: this.routeTask, brace: this.brace, escort: this.escort },
      player,
    );
  }
  get complete() {
    return this.status.complete;
  }
  get handsOccupied() {
    return false;
  }
  near(p, r = 2.3) {
    return gap(this.player.position, vector(p)) <= r + 1e-8;
  }
  requireNear(p, r = 2.3) {
    if (!p || !this.near(p, r)) throw Error("請親自走近這個實體操作點。");
  }
  toast(m) {
    this.callbacks.toast?.(m);
  }
  showError(message) {
    this.interactionNotice = message;
    this.toast(message);
    if (this.field.active) this.field.renderPanel(message);
    else if (this.activeInteraction !== undefined)
      this.panel(this.activeInteraction);
  }
  visible(node) {
    if (!node || node.visible === false) return false;
    node.updateWorldMatrix(true, true);
    const box = new THREE.Box3().setFromObject(node),
      target = box.isEmpty()
        ? node.getWorldPosition(new THREE.Vector3())
        : box.getCenter(new THREE.Vector3()),
      origin = this.player.position.clone();
    origin.y = 1.55;
    const allowed = new Set();
    node.traverse((n) => {
      const b = this.world.solidBoxes.get(n);
      if (b) allowed.add(b);
    });
    let hit = this.world.trace(origin, target);
    // Carried papers are part of the player's own equipment. If they are the
    // first hit, re-test every other real solid; never waive a wall behind them.
    if (
      node !== this.props.parts.documents &&
      hit?.box?.id === this.flow.documents.id &&
      this.props.readDocuments().carrier === "player"
    ) {
      const own = new Set();
      this.props.parts.documents.traverse((n) => own.add(n));
      const ray = new THREE.Raycaster(
        origin,
        target.clone().sub(origin).normalize(),
        0,
        origin.distanceTo(target),
      );
      const meshHit = ray.intersectObjects(
        this.world.solids.filter((n) => !own.has(n)),
        false,
      )[0];
      hit = meshHit
        ? {
            box: this.world.solidBoxes.get(meshHit.object),
            distance: meshHit.distance,
          }
        : null;
    }
    return (
      !hit ||
      allowed.has(hit.box) ||
      hit.distance >= origin.distanceTo(target) - 0.06
    );
  }
  requireVisible(node) {
    if (!this.visible(node))
      throw Error("實體被遮住，請到可看清與操作的一側。");
  }
  preview(type, payload) {
    return recordNightEvent(this.id, this.progress, {
      id: `night-event-${this.serial + 1}`,
      type,
      ...payload,
    });
  }
  dispatch(type, payload = {}) {
    const r = this.preview(type, payload);
    for (const e of r.effects)
      if (!NIGHT_EFFECT_TYPES.includes(e.type))
        throw Error(`Unhandled night effect ${e.type}`);
    this.serial++;
    this.progress = r.state;
    this.status = r.status;
    for (const e of r.effects)
      if (!this.appliedEffects.has(e.effectId)) {
        this.apply(e);
        this.appliedEffects.add(e.effectId);
      }
    return r;
  }
  apply(e) {
    switch (e.type) {
      case "setNightDocumentCarrier":
        this.props.setDocumentCarrier(this.player);
        break;
      case "invalidateNightBridge":
        this.props.setBridgeOpen(false, { occupants: this.occupants() });
        break;
      case "announceNightResponse":
        this.warning = e.message;
        break;
      case "setActorOrder": {
        const enemy = this.enemies.find((x) => x.id === e.actorId);
        if (enemy?.hp > 0) {
          this.orders.set(e.actorId, {
            order: e.order,
            position: [...e.position],
          });
          if (e.order === "hold") {
            enemy.engaged = false;
            enemy.windup = 0;
            enemy.alert = 0;
          }
          delete enemy.nightPath;
        }
        break;
      }
      case "issueNightReceipt":
        this.props.createReceipt?.(e.receipt);
        this.toast("羅絲、塔文、米洛都已抵達，帶回條由南側撤離。");
        break;
      case "recoverableMistake":
        this.callbacks.effect?.(
          {
            alertDelta: e.alertDelta,
            exposureSeconds: e.exposureSeconds,
            permanentDamage: 0,
            blocksInput: false,
            message: e.message,
          },
          { taskId: "night-flow", position: point(this.player.position) },
        );
        this.toast(e.message);
        break;
      case "showNightEvidence":
      case "selectNightRoute":
      case "showNightBrace":
      case "confirmNightBridge":
      case "confirmNightPassage":
      case "confirmNightClearance":
      case "confirmNightEscort":
      case "recordNightCheckpoint":
      case "confirmNightCommand":
      case "setResponseState":
        break;
      default:
        throw Error(`Unhandled night effect ${e.type}`);
    }
  }
  observeClue(id) {
    const d = this.flow.evidence[id];
    if (!d) return "";
    this.requireNear(d.position, d.radius);
    if (id === "night-papers" && !this.status.documentsCollected)
      this.requireVisible(this.props.parts.documents);
    this.dispatch("evidence-observed", {
      clueId: id,
      recordId: d.recordId,
      playerPosition: point(this.player.position),
    });
    if (id === "night-papers" && !this.status.documentsCollected)
      this.dispatch("documents-collected", {
        snapshot: this.props.readDocuments(),
        playerPosition: point(this.player.position),
      });
    return d.text;
  }
  available() {
    return true;
  }
  interactionRadius(task, fallback = 2.3) {
    return [this.routeTask, this.brace, this.escort].includes(task)
      ? Math.min(fallback, 2.3)
      : fallback;
  }
  beforeCargo() {
    return true;
  }
  route(task, step, route) {
    return route;
  }
  routeLength() {
    return this.flow.routes[this.status.routeId]?.waypoints.length || 0;
  }
  partySnapshot() {
    if (
      this.escort.members.length !== 3 ||
      this.escort.members.some((m, i) => m.object !== this.memberObjects[i])
    )
      throw Error("家屬實體與起始三人不同。");
    const t =
        this.field.traversal?.task === this.escort
          ? this.field.traversal
          : null,
      finished = this.field.recorded(this.escort, "group-checkpoints"),
      paused = t ? t.paused : !t;
    return {
      members: this.escort.members.map((m, i) => ({
        id: this.flow.members[i].id,
        position: point(m.position),
        state:
          !t && finished && this.nearMemberArrival(m)
            ? "safe"
            : paused
              ? "wait"
              : gap(m.position, this.player.position) > 6
                ? "leash"
                : "follow",
      })),
      paused,
      routeIndex: t ? t.index : finished ? this.routeLength() : 0,
    };
  }
  nearMemberArrival(m) {
    return (
      gap(m.position, vector(this.flow.arrival.position)) <=
      this.flow.arrival.radius + 1e-8
    );
  }
  coverId(snapshot) {
    return (
      (this.flow.routes[this.status.routeId]?.coverIds || []).find((id) => {
        const c = this.flow.safeCovers[id];
        return snapshot.members.every(
          (m) => gap(vector(m.position), vector(c.position)) <= c.radius,
        );
      }) || null
    );
  }
  syncEscort() {
    if (!this.status.started) return;
    const t =
      this.field.traversal?.task === this.escort ? this.field.traversal : null;
    if (!t) return;
    const s = this.partySnapshot();
    if (t.index > this.status.checkpoint + 1) {
      if (t.index !== this.status.checkpoint + 2)
        throw Error("護送路點跳躍，不能補造中間位置。");
      this.dispatch("escort-checkpoint", {
        index: t.index - 1,
        snapshot: s,
        playerPosition: point(this.player.position),
        gateAngle: this.props.readBridgeAngle(),
      });
    }
    if (t.paused !== this.status.paused) {
      this.dispatch("escort-command", {
        command: t.paused ? "wait" : "follow",
        coverId: this.coverId(s),
        snapshot: s,
        playerPosition: point(this.player.position),
      });
    }
  }
  recordStep(task, step) {
    if (task === this.escort && step.id === "group-checkpoints")
      this.syncEscort();
    if (task === this.brace && step.id === "test-load")
      this.pendingBridgeTest = true;
    return task === this.escort && step.id === "group-safe"
      ? "三名原家屬的實際位置都在南集合圈；領回條後直接撤離。"
      : "";
  }
  beforeChoice(task, choice) {
    try {
      if (this.complete) throw Error("回條已簽收，護送紀錄封存。");
      this.requireNear(
        task === this.escort
          ? point(this.escort.members[1].position)
          : task.position,
      );
      if (!choice.success) return true;
      if (
        this.field.currentSteps(task).some((s) => !this.field.recorded(task, s))
      )
        throw Error("先完成每個實體步驟，不能用選項跳過。");
      if (task === this.routeTask) {
        this.requireVisible(task.parts["route-arm"]);
        const r = this.preview("route-selected", {
          choiceId: choice.id,
          snapshot: this.props.readRoute(),
          playerPosition: point(this.player.position),
        });
        if (!r.status.routeId) {
          this.dispatch("route-selected", {
            choiceId: choice.id,
            snapshot: this.props.readRoute(),
            playerPosition: point(this.player.position),
          });
          return false;
        }
      }
      if (task === this.brace) {
        this.syncBridge();
        if (!this.status.bridgeTested) throw Error("原斜撐與真試重尚未成立。");
      }
      if (task === this.escort) {
        const s = this.partySnapshot();
        if (
          !this.status.started ||
          this.status.checkpoint !== this.routeLength() - 1 ||
          !s.paused ||
          s.members.some((m) => m.state !== "safe")
        )
          throw Error("三位原家屬還沒有全部實際抵達南集合圈。");
      }
      return true;
    } catch (e) {
      this.showError(e.message);
      return false;
    }
  }
  beforeFieldAction(action, dataset = {}) {
    try {
      if (action === "field-close" || action === "field-view") return true;
      const task = this.field.active || this.field.traversal?.task;
      if (!task) return true;
      if (this.complete) throw Error("護送已簽收。");
      this.requireNear(
        task === this.escort
          ? point(this.escort.members[1].position)
          : task.position,
      );
      const step = dataset.step ? this.field.step(task, dataset.step) : null;
      if (
        task === this.escort &&
        (action === "field-resume" || step?.kind === "escort-start")
      ) {
        if (
          this.escort.members.some(
            (m) =>
              gap(m.position, this.player.position) >
              (step?.kind === "escort-start" ? 3 : 6),
          )
        )
          throw Error("先走到三名家屬都在身邊的位置，再一起跟隨。");
        if (!this.status.routeId || !this.status.bridgeTested)
          throw Error("先選路線並完成原橋的實際試重。");
      }
      if (
        step?.target &&
        task.parts[step.target] &&
        ![
          "escort-start",
          "escort-route",
          "escort-arrival",
          "player-overlap",
        ].includes(step.kind)
      )
        this.requireVisible(task.parts[step.target]);
      if (
        task === this.brace &&
        step?.id === "test-load" &&
        action === "field-step"
      )
        this.testStart = point(this.player.position);
      return true;
    } catch (e) {
      this.showError(e.message);
      return false;
    }
  }
  afterFieldAction(action, dataset = {}) {
    if (this.field.done(this.routeTask) && !this.status.routeId)
      this.dispatch("route-selected", {
        choiceId: this.field.state.choices[this.routeTask.id],
        snapshot: this.props.readRoute(),
        playerPosition: point(this.player.position),
      });
    if (this.field.traversal?.task === this.escort && !this.status.started)
      this.dispatch("escort-started", {
        snapshot: this.partySnapshot(),
        playerPosition: point(this.player.position),
      });
    this.syncBridge();
    this.syncEscort();
  }
  syncBridge() {
    if (!this.status.routeId) return;
    const snapshot = this.props.readBrace();
    if (!snapshot) throw Error("無法讀取原斜撐與試重板。");
    if (
      this.pendingBridgeTest &&
      this.field.recorded(this.brace, "test-load") &&
      Math.abs(snapshot.boardHeight - 0.015) < 0.01
    ) {
      if (!this.testStart) throw Error("缺少實際試走起點。");
      this.dispatch("bridge-tested", {
        snapshot,
        fromPosition: this.testStart,
        playerPosition: point(this.player.position),
      });
      this.pendingBridgeTest = false;
      this.lastBrace = structuredClone(snapshot);
    } else if (
      (this.brace.touched.has("brace") || this.status.bridgeTested) &&
      this.near(this.flow.brace.position) &&
      !same(this.lastBrace, snapshot)
    ) {
      this.dispatch("brace-observed", {
        snapshot,
        playerPosition: point(this.player.position),
      });
      this.lastBrace = structuredClone(snapshot);
    }
    if (
      this.field.done(this.brace) &&
      !this.field.pendingEffects.length &&
      this.status.bridgeTested &&
      this.status.routeId === "west-ford" &&
      !this.status.bridgeOpen
    ) {
      this.requireNear(this.flow.brace.position);
      this.props.setBridgeOpen(true);
      this.dispatch("bridge-opened", {
        snapshot: { gateAngle: this.props.readBridgeAngle(), brace: snapshot },
        playerPosition: point(this.player.position),
      });
    }
  }
  controls(task) {
    return `<div class="night-controls">${this.interactionNotice ? `<p role="status">${esc(this.interactionNotice)}</p>` : ""}<p>${esc(this.objective())}</p>${task === this.escort && this.field.traversal ? button(this.field.traversal.paused ? "follow" : "wait", this.field.traversal.paused ? "跟上原路線" : "留在這處掩體") : ""}${this.near(this.flow.clearancePosts["north-passage-post"].position) ? button("papers", "在北路口出示實體文件", 'data-post="north-passage-post"') : ""}${this.near(this.flow.arrival.position) ? button("papers", "在南集合處出示實體文件", 'data-post="south-assembly"') + button("receipt", "核對三人並領取到達回條") : ""}</div>`;
  }
  nearest() {
    const candidates = [];
    for (const [id, p] of Object.entries(this.flow.clearancePosts))
      if (this.near(p.position, p.radius))
        candidates.push({
          type: "mission",
          nightKind: "post",
          postId: id,
          title:
            id === "south-assembly"
              ? "三位家屬的南側集合與回條"
              : "出示 PASS-17 通行文件",
          position: p.position,
          distance: gap(this.player.position, vector(p.position)),
        });
    if (
      this.status.started &&
      this.escort.members.every(
        (m) => gap(m.position, this.player.position) <= 6,
      )
    )
      candidates.push({
        type: "mission",
        nightKind: "party",
        title: "家屬跟隨／掩體停等",
        position: point(this.escort.members[1].position),
        distance: gap(this.player.position, this.escort.members[1].position),
      });
    return candidates.sort((a, b) => a.distance - b.distance)[0] || null;
  }
  interact(near) {
    this.panel(near.postId || null);
  }
  panel(postId = null) {
    this.activeInteraction = postId;
    this.callbacks.panel?.(
      `<div><h2>長夜同行</h2>${this.interactionNotice ? `<p class="banner" role="status">${esc(this.interactionNotice)}</p>` : ""}<p>${esc(this.objective())}</p>${postId ? button("papers", "出示三人文件與已到期封路令", `data-post="${esc(postId)}" data-reason="expired-order-and-civilians"`) + button("papers", "依昨日封路令繼續扣留", `data-post="${esc(postId)}" data-reason="old-order-still-valid"`) : ""}${this.field.traversal?.task === this.escort ? button(this.field.traversal.paused ? "follow" : "wait", this.field.traversal.paused ? "跟上原路線" : "留在這處掩體") : ""}${this.near(this.flow.arrival.position) ? button("receipt", "核對三位家屬並領回條") : ""}${button("close", "返回現場")}</div>`,
    );
  }
  present(postId, reason) {
    const post = this.flow.clearancePosts[postId];
    if (!post) throw Error("請在具名通行點出示。");
    this.requireNear(post.position, post.radius);
    this.requireVisible(this.props.parts.documents);
    this.dispatch("clearance-presented", {
      postId,
      reason: reason || "expired-order-and-civilians",
      documents: this.props.readDocuments(),
      playerPosition: point(this.player.position),
    });
  }
  command(command) {
    const t = this.field.traversal;
    if (t?.task !== this.escort) throw Error("先讓原三名家屬開始護送。");
    if (
      this.escort.members.some((m) => gap(m.position, this.player.position) > 6)
    )
      throw Error("先回到全三位家屬六公尺內。");
    const before = this.partySnapshot(),
      coverId = this.coverId(before);
    if (command === "wait" && !coverId)
      throw Error(
        "這裡不是作者標示的掩體；E 可立即一般停等，掩體命令須全三人進圈。",
      );
    if (command === "wait") this.field.release();
    else this.field.resume(this.escort);
    this.syncEscort();
  }
  /** Optional host first refusal before field.interactTraversal; no Field patch. */
  interactTraversal() {
    const t = this.field.traversal;
    if (t?.task !== this.escort) return false;
    if (t.paused) {
      if (!this.near(point(this.escort.members[1].position), 2.5)) return false;
      if (
        this.escort.members.some(
          (m) => gap(m.position, this.player.position) > 6,
        )
      )
        this.interactionNotice =
          "仍有家屬超過六公尺；請移到能同時照應三人的位置。";
      this.panel();
      return true;
    }
    return false;
  }
  confirmReceipt() {
    this.requireNear(
      this.flow.arrival.position,
      this.flow.arrival.playerRadius,
    );
    if (!this.field.complete || this.field.pendingEffects.length)
      throw Error("先完成原三工作並返回現場，結清一次工作效果。");
    const kills = this.callbacks.kills?.() ?? this.status.defeatedActors.length;
    if (
      kills !== this.status.defeatedActors.length ||
      kills !== this.enemies.filter((e) => e.hp <= 0).length
    )
      throw Error("守軍傷亡與真場景不同。");
    if (kills !== 0 && kills !== 6)
      throw Error("仍有守軍在場，清場路線需處理全六名既有守軍。");
    if (!kills && (!this.status.clearance || this.status.evidence.length !== 3))
      throw Error("零擊殺通行需要三證據與實體文件放行。");
    if (this.escort.members.some((m) => !this.nearMemberArrival(m)))
      throw Error("仍有家屬未進南集合圈。");
    this.escort.members.forEach((m) => this.requireVisible(m.object));
    this.requireVisible(this.props.parts.documents);
    this.dispatch("arrival-received", {
      snapshot: this.partySnapshot(),
      documents: this.props.readDocuments(),
      playerPosition: point(this.player.position),
    });
    if (!this.callbacks.secured?.())
      this.callbacks.secure?.(kills ? "combat" : "nonlethal");
  }
  handle(action, dataset = {}) {
    if (!action.startsWith("night-")) return false;
    this.interactionNotice = null;
    try {
      if (action === "night-close") {
        this.activeInteraction = undefined;
        this.field.close();
        this.callbacks.close?.();
        return true;
      }
      if (this.complete && action !== "night-papers") {
        if (action === "night-receipt") this.confirmReceipt();
        return true;
      }
      if (action === "night-papers") this.present(dataset.post, dataset.reason);
      else if (action === "night-wait") this.command("wait");
      else if (action === "night-follow") this.command("follow");
      else if (action === "night-receipt") this.confirmReceipt();
      else throw Error("未知護送操作。");
      if (!["night-wait", "night-follow", "night-receipt"].includes(action))
        this.panel(dataset.post);
      return true;
    } catch (e) {
      this.showError(e.message);
      return false;
    }
  }
  defeated(id) {
    const e = this.enemies.find((x) => x.id === id);
    if (!e || e.hp > 0)
      throw Error("Only actual defeated existing night enemy");
    this.dispatch("actor-defeated", { actorId: id });
  }
  controlEnemy(e, dt) {
    const order = this.orders.get(e.id);
    if (
      !order ||
      e.hp <= 0 ||
      this.callbacks.secured?.() ||
      e.engaged ||
      e.suppressed > 0
    )
      return false;
    const target = vector(order.position);
    if (order.order === "flank" && gap(e.actor.position, target) < 0.5)
      return false;
    e.state = order.order === "flank" ? "flank" : "standby";
    this.moveOrderedEnemy(e, target, order.order === "flank" ? 2.4 : 1.6, dt);
    e.windup = 0;
    return true;
  }
  moveOrderedEnemy(enemy, target, speed, dt) {
    if (enemy.hp <= 0 || !Number.isFinite(dt) || dt <= 0) return;
    const from = enemy.actor.position,
      colliders = this.world.colliders,
      geometry = tacticalGeometryKey(colliders, 0.38, 23);
    let cache = enemy.nightPath;
    if (
      !cache ||
      cache.geometry !== geometry ||
      gap(cache.goal, target) > 0.1
    ) {
      const options = {
          from,
          to: target,
          colliders,
          radius: 0.38,
          bounds: 23,
          maxDistance: 64,
        },
        proof = certifyTacticalPath(
          planTacticalPath(options),
          options,
          moveCircle,
        );
      cache = enemy.nightPath = {
        geometry,
        goal: { x: target.x, z: target.z },
        path: proof.ok ? proof.path.slice(1) : [],
      };
    }
    while (cache.path.length && gap(from, cache.path[0]) <= 0.025)
      cache.path.shift();
    const next = cache.path[0];
    if (
      !next ||
      !tacticalSegmentClear({
        from,
        to: next,
        colliders,
        radius: 0.38,
        bounds: 23,
      })
    ) {
      if (next) delete enemy.nightPath;
      this.world.animate(enemy.actor, "idle");
      return;
    }
    const dx = next.x - from.x,
      dz = next.z - from.z,
      d = Math.hypot(dx, dz),
      amount = Math.min(d, speed * dt),
      steps = Math.max(1, Math.ceil(amount / 0.1));
    for (let i = 0; i < steps; i++) {
      const p = moveCircle(
        from,
        ((dx / d) * amount) / steps,
        ((dz / d) * amount) / steps,
        colliders,
        0.38,
        23,
      );
      from.x = p.x;
      from.z = p.z;
    }
    enemy.actor.object.rotation.y = Math.atan2(dx, dz);
    this.world.animate(enemy.actor, "walk");
  }
  occupants() {
    const enemyObjects = new Set(this.enemies.map((e) => e.actor.object));
    return [
      ...this.world.actors.filter((a) => !enemyObjects.has(a.object)),
      ...this.enemies.filter((e) => e.hp > 0).map((e) => e.actor),
    ];
  }
  update(dt) {
    if (this.disposed || !Number.isFinite(dt) || dt <= 0) return;
    this.props.update?.(this.occupants());
    this.syncBridge();
    this.syncEscort();
    if (this.status.response.status === "warned") {
      if (!this.status.response.presented) {
        this.toast(this.warning || this.flow.response.warning);
        this.dispatch("response-warning-presented");
      } else this.dispatch("response-activated");
    }
  }
  objective() {
    if (!this.status.routeId)
      return "查三份線索，讀真水尺並扳原路牌選西線或東線。";
    if (!this.status.bridgeTested)
      return "接好原斜撐，親自踏上試重板；西末段連動橋隨修復開通。";
    if (!this.status.started) return "到北段原三名家屬旁，開始同隊護送。";
    if (!this.field.done(this.escort))
      return "保持六公尺內帶三人走原路線；可在標示掩體停等，文件可預防／取消側繞。";
    if (!this.complete) return "三人到南圈後核對文件放行或清場，領取具名回條。";
    return "帶同三名家屬的到達回條，由南側直接撤離。";
  }
  labels() {
    const labels = [
      { position: { x: -12, y: 2, z: 17 }, text: "◇ 三家屬集合／到達回條" },
    ];
    for (const [id, c] of Object.entries(this.flow.safeCovers))
      if (this.flow.routes[this.status.routeId]?.coverIds.includes(id))
        labels.push({
          position: { x: c.position[0], y: 1.5, z: c.position[1] },
          text: "◇ 停等掩體（留意側路）",
        });
    return labels;
  }
  diagnostics() {
    return {
      kind: "night",
      version: 1,
      missionId: this.id,
      route: this.props.readRoute(),
      brace: this.props.readBrace(),
      bridgeAngle: this.props.readBridgeAngle(),
      documents: this.props.readDocuments(),
      party: this.partySnapshot(),
      orders: Object.fromEntries(this.orders),
      pendingFieldEffects: this.field.pendingEffects.length,
    };
  }
  dispose() {
    if (this.disposed) return;
    this.disposed = true;
    this.props.dispose();
    for (const [task, original] of this.originalText)
      Object.assign(task, original);
    for (const e of this.enemies) delete e.nightPath;
    this.orders.clear();
    this.originalText.clear();
    this.appliedEffects.clear();
  }
}
