import * as THREE from "./vendor/three.module.js";
import {
  LEDGER_FLOW,
  createLedgerProgress,
  recordLedgerEvent,
  canonicalLedgerProgress,
} from "./ledger-flow.js";
import { createLedgerProps } from "./ledger-props.js";
import { moveCircle } from "./physics.js";
import {
  planTacticalPath,
  certifyTacticalPath,
  tacticalSegmentClear,
  tacticalGeometryKey,
} from "./enemy-tactics.js";

const point = (p) => [p.x, p.z],
  vector = (p) => new THREE.Vector3(p[0], 0, p[1]),
  gap = (a, b) => Math.hypot(a.x - b.x, a.z - b.z);
const same = (a, b) => JSON.stringify(a) === JSON.stringify(b);
const esc = (v) =>
  String(v ?? "").replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ],
  );
const button = (action, text, data = "", disabled = false) =>
  `<button data-action="ledger-${action}" ${data} ${disabled ? "disabled" : ""}>${esc(text)}</button>`;
export const LEDGER_EFFECT_TYPES = Object.freeze([
  "showLedgerEvidence",
  "invalidateLedgerProof",
  "recoverableMistake",
  "confirmLedgerShipment",
  "confirmLedgerPayment",
  "setLedgerOriginalCarrier",
  "selectLedgerCustody",
  "confirmLedgerCopy",
  "setLedgerCopyCarrier",
  "transferLedgerCopy",
  "announceLedgerResponse",
  "setActorOrder",
  "setResponseState",
  "confirmLedgerClearance",
  "issueLedgerReceipt",
]);
export function ledgerPlacementPoints(id) {
  const f = LEDGER_FLOW[id];
  return f
    ? [
        f.original.position,
        f.copy.position,
        f.notice.position,
        f.notice.witness.position,
        f.courier.position,
        ...Object.values(f.actors)
          .map((a) => a.inspectPosition)
          .filter(Boolean),
      ]
    : [];
}

/** Source controller. Runtime forwards ordinary Field hooks/actions and calls update
 * only while playing. All world evidence is read from the original borrowed nodes. */
export class LedgerSystem {
  constructor(world, id, field, player, enemies, callbacks = {}) {
    this.world = world;
    this.id = id;
    this.flow = LEDGER_FLOW[id];
    this.field = field;
    this.player = player;
    this.enemies = enemies;
    this.callbacks = callbacks;
    if (!this.flow) throw Error(`No ledger flow for ${id}`);
    this.carriage = field.tasks.find((t) => t.id === "ledger-carriage");
    this.carbon = field.tasks.find((t) => t.id === "ledger-carbon");
    this.press = field.tasks.find((t) => t.id === "ledger-copy");
    if (![this.carriage, this.carbon, this.press].every((t) => t?.flowV1))
      throw Error("Ledger controller requires ledger-v1 expansion patch");
    this.progress = createLedgerProgress(id);
    this.status = canonicalLedgerProgress(id, this.progress, {
      requireComplete: false,
    });
    this.serial = 0;
    this.disposed = false;
    this.appliedEffects = new Set();
    this.pendingFieldTask = null;
    this.orders = new Map(
      Object.entries(this.flow.actors).map(([actorId, a]) => [
        actorId,
        { order: a.initialOrder, targetId: null },
      ]),
    );
    this.originalText = new Map();
    for (const task of [this.carriage, this.carbon, this.press]) {
      this.originalText.set(task, {
        description: task.description,
        hints: task.hints,
        choices: task.choices,
        physicalSteps: task.physicalSteps,
        selectedChoice: task.selectedChoice,
      });
      const ui = task.flowV1;
      task.description = ui.description;
      task.hints = [...ui.hints];
      task.physicalSteps = task.physicalSteps.map((s) => ({
        ...s,
        title: ui.stepLabels?.[s.id] || s.title,
      }));
      task.choices = task.choices.map((c) => ({
        ...c,
        label: ui.choiceLabels?.[c.id] || c.label,
        requiredSteps: c.requiredSteps?.map((s) => ({
          ...s,
          title: ui.stepLabels?.[s.id] || s.title,
        })),
      }));
    }
    this.props = createLedgerProps(THREE, world, this.flow, { field, player });
    this.borrowedTargets = [];
    for (const key of ["evidence-envelope", "notice-board"]) {
      const node = this.press.parts[key],
        queries = [];
      node.traverse((n) =>
        queries.push({
          node: n,
          visible: n.visible,
          registered: world.solids.includes(n),
          box: world.solidBoxes.get(n),
        }),
      );
      this.borrowedTargets.push({
        key,
        node,
        parent: node.parent,
        position: node.position.clone(),
        quaternion: node.quaternion.clone(),
        scale: node.scale.clone(),
        queries,
      });
      world.solids = world.solids.filter(
        (n) => !queries.some((q) => q.node === n),
      );
      for (const q of queries) world.solidBoxes.delete(q.node);
      if (key === "evidence-envelope") {
        this.props.courierDesk.add(node);
        node.position.set(0, 0.925, 0);
        node.rotation.set(0, 0, 0);
        node.scale.setScalar(0.5);
        for (const child of node.children) child.visible = false;
      } else {
        node.visible = false;
        this.press.parts[key] = this.props.notice;
      }
    }
  }
  get complete() {
    return this.status.complete;
  }
  get handsOccupied() {
    return this.press.carrying && this.status.copy.carrier === "player";
  }
  get carrying() {
    return this.handsOccupied;
  }
  toast(m) {
    this.callbacks.toast?.(m);
  }
  reportInteraction(message) {
    this.interactionNotice = message;
    this.toast(message);
    // Modal panels blur the HUD toast. Repaint only presentation, never retry
    // a physical action or weaken the original reach/occlusion validation.
    this.refreshInteraction();
  }
  refreshInteraction() {
    if (this.field.active) this.field.renderPanel();
    else if (this.activeInteraction)
      this.renderInteraction(this.activeInteraction);
  }
  near(p, r = 2.3) {
    return gap(this.player.position, vector(p)) <= r + 1e-8;
  }
  requireNear(p, r = 2.3) {
    if (!p || !this.near(p, r))
      throw Error("請親自走到這個實體工作或交接點旁。");
  }
  visible(node, allowed = []) {
    if (!node) return false;
    for (let n = node; n; n = n.parent) if (!n.visible) return false;
    node.updateWorldMatrix(true, true);
    const box = new THREE.Box3().setFromObject(node),
      target = box.isEmpty()
        ? node.getWorldPosition(new THREE.Vector3())
        : box.getCenter(new THREE.Vector3()),
      eye = this.player.position.clone();
    eye.y = 1.55;
    const boxes = new Set(allowed);
    node.traverse((n) => {
      const b = this.world.solidBoxes.get(n);
      if (b) boxes.add(b);
    });
    // A ray starts inside the player's body. Ignore only their attached original
    // and satchel meshes, then trace the entire remaining ray (including walls).
    // Do not treat the first self-hit as clear: a real wall may be behind it.
    const self = new Set();
    if (this.props?.original.parent === this.player.object)
      this.props.original.traverse((n) => self.add(n));
    this.props?.parts.satchel?.traverse((n) => self.add(n));
    const query = Object.create(this.world);
    query.solids = this.world.solids.filter((n) => !self.has(n));
    const hit = this.world.trace.call(query, eye, target);
    const visible =
      !hit ||
      boxes.has(hit.box) ||
      hit.distance >= eye.distanceTo(target) - 0.06;
    if (!visible)
      this.lastOcclusion = {
        target: node.name,
        hit: hit?.box?.id,
        distance: hit?.distance,
        eye: eye.toArray(),
        point: target.toArray(),
      };
    return visible;
  }
  requireVisible(node, allowed = []) {
    if (!this.visible(node, allowed))
      throw Error("證物或接收者被遮住，請走到能直接看見的一側。");
  }
  entityPayload() {
    return {
      originalSnapshot: this.props.readOriginalSnapshot(),
      playerPosition: point(this.player.position),
    };
  }
  requireCurrentEvidence(payment = true) {
    if (
      !this.status.shipmentVerified ||
      !same(this.props.readCarriageSnapshot(), this.status.carriageSnapshot) ||
      (payment &&
        (!this.status.paymentVerified ||
          !same(this.props.readCarbonSnapshot(), this.status.carbonSnapshot)))
    )
      throw Error(
        "原證物的實際位置已改變或尚未核證；請回工作台修正並重新核對。",
      );
  }
  receiver() {
    return this.status.localChoices.custody === "sealed-courier"
      ? this.flow.courier
      : this.flow.notice.witness;
  }
  receiverActor() {
    return this.props.recipients.get(this.receiver().id);
  }
  destination() {
    return this.status.localChoices.custody === "sealed-courier"
      ? this.flow.courier
      : this.flow.notice;
  }
  destinationNode() {
    return this.status.localChoices.custody === "sealed-courier"
      ? this.props.courierDesk
      : this.props.notice;
  }
  dispatch(type, payload = {}) {
    const result = recordLedgerEvent(this.id, this.progress, {
      id: `ledger-event-${++this.serial}`,
      type,
      ...payload,
    });
    for (const e of result.effects)
      if (!LEDGER_EFFECT_TYPES.includes(e.type))
        throw Error(`Unhandled ledger effect: ${e.type}`);
    this.progress = result.state;
    this.status = result.status;
    for (const e of result.effects)
      if (!this.appliedEffects.has(e.effectId)) {
        this.apply(e);
        this.appliedEffects.add(e.effectId);
      }
    return result;
  }
  apply(e) {
    switch (e.type) {
      case "showLedgerEvidence":
      case "invalidateLedgerProof":
      case "confirmLedgerShipment":
      case "confirmLedgerPayment":
      case "confirmLedgerCopy":
      case "setLedgerCopyCarrier":
      case "setResponseState":
      case "confirmLedgerClearance":
        break;
      case "setLedgerOriginalCarrier":
        this.props.setOriginalCarrier(e.carrier);
        break;
      case "selectLedgerCustody":
        this.props.setCustody(e.choiceId);
        break;
      case "transferLedgerCopy": {
        this.props.dockCopy(e.custodianId);
        this.press.carrying = false;
        this.press.cargoDelivered = true;
        this.press.anchor = this.destinationNode();
        if (this.field.traversal?.task === this.press)
          this.field.traversal = null;
        break;
      }
      case "announceLedgerResponse":
        this.warning = e.text;
        break;
      case "setActorOrder":
        for (const id of e.actorIds) {
          const enemy = this.enemies.find((a) => a.id === id);
          if (!enemy || enemy.hp <= 0) continue;
          this.orders.set(id, { order: e.order, targetId: e.targetId });
          if (e.resetEngagement) {
            enemy.engaged = false;
            enemy.alert = 0;
            enemy.windup = 0;
          }
          delete enemy.ledgerPath;
        }
        break;
      case "issueLedgerReceipt":
        this.props.showReceipt();
        this.toast("原帳仍在背包，副本已有具名保管回條；從南側撤離。");
        break;
      case "recoverableMistake":
        this.field.pendingEffects.push({
          task: this.field.active || this.carriage,
          effect: {
            alertDelta: e.alertDelta,
            exposureSeconds: e.exposureSeconds,
            permanentDamage: 0,
            blocksInput: false,
            message: e.message,
          },
        });
        this.field.state.mistakes++;
        this.reportInteraction(e.message);
        break;
      default:
        throw Error(`Unhandled ledger effect: ${e.type}`);
    }
  }
  observeClue(id) {
    const source = this.flow.evidence[id];
    if (!source) return "";
    this.dispatch("evidence-observed", {
      sourceId: id,
      recordId: source.recordId,
      playerPosition: point(this.player.position),
    });
    return source.text;
  }
  syncEvidence(task) {
    if (task === this.carriage) {
      const carriageSnapshot = this.props.readCarriageSnapshot();
      if (!same(carriageSnapshot, this.status.carriageSnapshot))
        this.dispatch("carriage-observed", {
          carriageSnapshot,
          playerPosition: point(this.player.position),
        });
    } else if (task === this.carbon) {
      const carbonSnapshot = this.props.readCarbonSnapshot();
      if (!same(carbonSnapshot, this.status.carbonSnapshot))
        this.dispatch("carbon-observed", {
          carbonSnapshot,
          playerPosition: point(this.player.position),
        });
    }
  }
  available(task) {
    return (
      task !== this.carbon || this.status.original.carrier === "player-satchel"
    );
  }
  interactionRadius(task, fallback = 2.3) {
    return [this.carriage, this.carbon, this.press].includes(task)
      ? Math.min(fallback, 2.3)
      : fallback;
  }
  route(task, step, route) {
    return route;
  }
  recordStep() {
    return "";
  }
  beforeChoice(task, choice) {
    this.interactionNotice = null;
    try {
      if (this.complete) throw Error("收據已簽署，證據與保管選擇已封存。");
      if (task === this.carriage) {
        this.requireNear(task.position);
        this.requireVisible(task.parts.tag, [task.collider]);
        this.requireVisible(task.parts["matching-frame"], [task.collider]);
        this.syncEvidence(task);
        const [ticket, wagon] = choice.id.split("-");
        this.dispatch("carriage-verified", {
          ticket: ticket.toUpperCase(),
          wagon,
          batch: this.flow.evidence["ledger-ticket"].facts.batch,
          carriageSnapshot: this.props.readCarriageSnapshot(),
          playerPosition: point(this.player.position),
        });
        return choice.success && this.status.shipmentVerified;
      }
      if (task === this.carbon) {
        this.requireNear(task.position);
        this.requireVisible(task.parts["carbon-sheet"], [task.collider]);
        this.requireVisible(task.parts["raking-lamp"], [task.collider]);
        this.syncEvidence(task);
        const payee =
          choice.id === "manager-impression"
            ? "manager"
            : choice.id === "ink-only"
              ? "bookkeeper"
              : "erased";
        this.dispatch("carbon-verified", {
          payee,
          batch: this.flow.evidence["ledger-payment"].facts.batch,
          workerIds: this.status.evidence["ledger-names"]
            ? [...this.flow.evidence["ledger-names"].facts.workerIds]
            : [],
          carbonSnapshot: this.props.readCarbonSnapshot(),
          playerPosition: point(this.player.position),
        });
        return choice.success && this.status.paymentVerified;
      }
      if (task === this.press) {
        if (!this.status.localChoices.custody) {
          this.selectCustody(choice.id);
          return false;
        }
        if (choice.id !== this.status.localChoices.custody)
          throw Error("本次副本保管人已選定。");
        if (!this.status.copy.delivered) {
          this.reportInteraction("帶同一副本實際走到接收者，再按正式交付。");
          return false;
        }
        const dest = this.destination();
        this.requireNear(dest.position, dest.radius);
        return true;
      }
      return true;
    } catch (error) {
      this.reportInteraction(error.message);
      return false;
    }
  }
  beforeFieldAction(action, dataset = {}) {
    this.interactionNotice = null;
    if (action === "field-close") this.activeInteraction = null;
    this.pendingFieldTask = this.field.active || this.field.traversal?.task;
    const task = this.pendingFieldTask;
    if (!task || action === "field-close") return true;
    try {
      if (
        this.complete &&
        !["field-view", "field-focus", "field-choice"].includes(action)
      )
        throw Error("已取得回條，不能再改動證物。");
      const step = this.field.step(task, dataset.step);
      if (
        ["field-adjust", "field-seat", "field-inspect"].includes(action) ||
        (action === "field-step" && step?.kind !== "carry-drop-zone")
      ) {
        const p =
          step?.kind === "carry-pickup"
            ? point(this.props.copy.getWorldPosition(new THREE.Vector3()))
            : step?.position || task.position;
        this.requireNear(p, step?.radius || 2.3);
        if (step?.target && task.parts[step.target])
          this.requireVisible(task.parts[step.target], [task.collider]);
      }
      if (
        ["field-adjust", "field-seat"].includes(action) &&
        [this.carriage, this.carbon].includes(task)
      )
        this.syncEvidence(task);
      if (
        task === this.press &&
        step?.kind === "carry-drop-zone" &&
        action === "field-step"
      ) {
        if (step.id !== this.deliveryStep()?.id)
          throw Error("只能向本次選定的保管人交付。");
        if (this.status.copy.delivered) throw Error("同一副本已交付。");
      }
      return true;
    } catch (error) {
      this.reportInteraction(error.message);
      return false;
    }
  }
  afterFieldAction(action) {
    const task = this.pendingFieldTask;
    this.pendingFieldTask = null;
    if (
      task &&
      ["field-adjust", "field-seat"].includes(action) &&
      [this.carriage, this.carbon].includes(task)
    )
      this.syncEvidence(task);
  }
  beforeCargo(task, action) {
    if (task !== this.press) return !this.handsOccupied;
    this.interactionNotice = null;
    try {
      if (action === "pickup") {
        this.requireCurrentEvidence();
        const copySnapshot = this.props.readCopySnapshot();
        this.requireNear(
          [copySnapshot.worldPosition[0], copySnapshot.worldPosition[2]],
          Math.min(this.flow.copy.radius, this.flow.copy.tether),
        );
        this.requireVisible(this.props.copy, [this.press.collider]);
        if (!this.status.copy.created)
          this.dispatch("copy-created", {
            pressAngle: this.props.readPressAngle(),
            copySnapshot,
            ...this.entityPayload(),
          });
        this.dispatch("copy-picked-up", {
          copySnapshot: this.props.readCopySnapshot(),
          ...this.entityPayload(),
        });
        return true;
      }
      if (action === "drop") {
        this.dispatch("copy-dropped", {
          copySnapshot: this.props.readCopySnapshot(),
          ...this.entityPayload(),
        });
        return true;
      }
      if (action === "deliver") {
        this.deliver();
        return false;
      } // Controller docks before Field can turn off carrying or overwrite local pose.
      throw Error("Unknown cargo operation");
    } catch (error) {
      this.reportInteraction(error.message);
      return false;
    }
  }
  deliveryStep() {
    const id = this.status.localChoices.custody;
    return id
      ? this.field.step(
          this.press,
          id === "sealed-courier" ? "deliver-envelope" : "post-notice",
        )
      : null;
  }
  selectCustody(id) {
    this.requireCurrentEvidence();
    this.requireNear(this.flow.press.position);
    this.requireVisible(this.press.parts["press-handle"], [
      this.press.collider,
    ]);
    if (!this.field.done(this.carbon) || this.field.pendingEffects.length)
      throw Error("先完成付款核證，返回現場結清原工作效果。");
    this.dispatch("custody-selected", {
      choiceId: id,
      ...this.entityPayload(),
    });
    this.press.selectedChoice = id;
  }
  secureOriginal() {
    this.requireCurrentEvidence(false);
    this.requireNear(this.flow.original.position);
    this.requireVisible(this.props.original, [this.carriage.collider]);
    if (!this.field.done(this.carriage))
      throw Error("先完成真車廂與貨票核證。");
    if (this.status.original.carrier === "player-satchel") return;
    this.dispatch("original-secured", {
      originalSnapshot: this.props.readOriginalSnapshot(),
      playerPosition: point(this.player.position),
    });
  }
  deliver() {
    this.requireCurrentEvidence();
    const dest = this.destination(),
      step = this.deliveryStep();
    if (!step) throw Error("先選定副本保管人。");
    this.requireNear(dest.position, dest.radius);
    this.requireVisible(this.destinationNode());
    this.requireVisible(this.props.copy);
    const required = this.press.physicalSteps;
    if (required.some((s) => !this.field.recorded(this.press, s)))
      throw Error("先完成真印壓與同一副本拿取。");
    if (this.status.copy.delivered) return;
    this.dispatch("copy-delivered", {
      custodianId: dest.id,
      receiverPosition: point(this.props.anchors[dest.id]),
      copySnapshot: this.props.readCopySnapshot(),
      ...this.entityPayload(),
    });
    this.field.record(this.press, step);
    this.field.active = this.press;
    this.field.choose(this.press, this.status.localChoices.custody);
  }
  presentClearance() {
    this.requireCurrentEvidence();
    if (!this.status.localChoices.custody) throw Error("先選副本保管人。");
    const def = this.receiver(),
      actor = this.receiverActor();
    this.requireNear(point(actor.position), def.radius);
    this.requireVisible(actor.object);
    this.dispatch("clearance-presented", {
      receiverId: def.id,
      receiverPosition: point(actor.position),
      ...this.entityPayload(),
    });
  }
  confirmHandoff() {
    this.requireCurrentEvidence();
    const def = this.receiver(),
      actor = this.receiverActor();
    this.requireNear(point(actor.position), def.radius);
    this.requireVisible(actor.object);
    if (!this.field.complete || this.field.pendingEffects.length)
      throw Error("先完成三項工作並返回現場，結清原副本工作效果。");
    const kills = this.callbacks.kills?.() ?? this.status.defeatedActors.length;
    if (
      kills !== this.status.defeatedActors.length ||
      kills !== this.enemies.filter((e) => e.hp <= 0).length
    )
      throw Error("實際傷亡與已記錄守軍不一致。");
    if (kills !== 0 && kills !== Object.keys(this.flow.actors).length)
      throw Error("仍有守軍在場；交戰需完成清場。");
    if (kills === 0 && !this.status.clearance)
      throw Error("非致命通行需要先向具名接收者出示完整互證資料。");
    this.dispatch("custody-receipt-issued", {
      receiverId: def.id,
      receiverPosition: point(actor.position),
      copySnapshot: this.props.readCopySnapshot(),
      ...this.entityPayload(),
    });
    if (!this.callbacks.secured?.())
      this.callbacks.secure?.(kills ? "combat" : "nonlethal");
  }
  repair(task, action, dataset) {
    this.requireNear(task.position);
    const step = this.field.step(task, dataset.step);
    if (!step || !["rotate-part", "align-parts"].includes(step.kind))
      throw Error("未知證物控制。");
    this.requireVisible(task.parts[step.target], [task.collider]);
    this.syncEvidence(task);
    const saved = structuredClone(this.field.state);
    try {
      if (action === "seat") this.field.seat(task, step);
      else {
        const delta = Number(dataset.delta);
        if (![-1, 1].includes(delta)) throw Error("未知操作方向。");
        this.field.adjust(task, step, delta);
      }
    } finally {
      if (saved.completed.includes(task.id)) this.field.state = saved;
    }
    this.syncEvidence(task);
  }
  controls(task) {
    const notice = this.interactionNotice
      ? `<p class="banner" role="status">${esc(this.interactionNotice)}</p>`
      : "";
    if (task === this.carriage)
      return `${notice}${button("original", "將這份原帳收入可見背包", "", !this.field.done(task) || this.status.original.carrier === "player-satchel")}${this.field.done(task) ? this.repairControls(task) : ""}`;
    if (task === this.carbon)
      return (
        notice +
        (this.field.done(task)
          ? this.repairControls(task)
          : "<p>付款壓痕、批次與完整工名須能互相支持。</p>")
      );
    if (task === this.press)
      return `${notice}<p>${esc(this.status.localChoices.custody ? this.flow.choices[this.status.localChoices.custody].text : "先選副本保管人，再實際印壓、搬同一副本。")}</p>${
        !this.status.localChoices.custody
          ? Object.entries(this.flow.choices)
              .map(([id, c]) =>
                button("custody", c.title, `data-choice="${id}"`),
              )
              .join("")
          : ""
      }${this.handsOccupied ? button("deliver", "在此向保管人正式交付") : ""}`;
    return "";
  }
  repairControls(task) {
    return `<p>重新調整會使當前核證失效，原歷史保留；修正後重新提交判讀。</p>${task.physicalSteps.map((s) => `${button("repair", "−", `data-task="${task.id}" data-step="${s.id}" data-delta="-1"`)}${button("repair", "＋", `data-task="${task.id}" data-step="${s.id}" data-delta="1"`)}${s.kind === "align-parts" ? button("seat", "扣入定位", `data-task="${task.id}" data-step="${s.id}"`) : ""}`).join("")}${task.choices.map((c) => button("verify", c.label, `data-task="${task.id}" data-choice="${c.id}"`)).join("")}`;
  }
  interactTraversal() {
    if (!this.handsOccupied || !this.status.localChoices.custody) return false;
    const dest = this.destination(), copy = this.props.readCopySnapshot();
    if (!this.near(dest.position, dest.radius) ||
        Math.hypot(copy.worldPosition[0] - dest.position[0], copy.worldPosition[2] - dest.position[1]) > dest.radius)
      return false;
    // The authored receiver uses the flow's physical reach. Give its explicit
    // handoff panel first refusal before legacy Field E can release the page.
    // deliver() still verifies the same page, current evidence and the real ray.
    return this.interact({ type: "mission", kind: "destination",
      position: dest.position, radius: dest.radius, title: "同一副本／正式交付" });
  }
  nearest() {
    const entries = [],
      add = (kind, p, r, title, extra = {}) => {
        if (this.near(p, r))
          entries.push({
            type: "mission",
            kind,
            position: p,
            radius: r,
            title,
            distance: gap(this.player.position, vector(p)),
            ...extra,
          });
      };
    for (const task of [this.carriage, this.carbon])
      if (this.field.done(task))
        add("work", task.position, 2.3, task.title, { taskId: task.id });
    if (this.status.localChoices.custody) {
      const dest = this.destination(),
        def = this.receiver(),
        actor = this.receiverActor();
      add(
        "receiver",
        point(actor.position),
        def.radius,
        this.complete ? "具名回條／確認南撤" : "出示互證資料／具名回條",
      );
      if (!this.status.copy.delivered)
        add("destination", dest.position, dest.radius, "同一副本／正式交付");
    }
    if (this.handsOccupied)
      add("carrying", point(this.player.position), 1, "暫放同一副本");
    return (
      entries.sort((a, b) =>
        a.kind === "receiver"
          ? -1
          : b.kind === "receiver"
            ? 1
            : a.kind === "destination"
              ? -1
              : b.kind === "destination"
                ? 1
                : a.distance - b.distance,
      )[0] || null
    );
  }
  interact(nearby) {
    if (
      !nearby ||
      nearby.type !== "mission" ||
      !this.near(nearby.position, nearby.radius)
    )
      return false;
    this.activeInteraction = nearby;
    if (nearby.kind === "work") {
      const task = this.field.tasks.find((t) => t.id === nearby.taskId);
      this.field.active = task;
      this.field.focus(task);
      this.field.renderPanel();
      return true;
    }
    this.renderInteraction(nearby);
    return true;
  }
  renderInteraction(nearby) {
    const controls =
      nearby.kind === "carrying"
        ? button("drop", "將同一副本暫放地上")
        : nearby.kind === "destination"
          ? button("deliver", "正式交付同一副本")
          : button("clearance", "出示原帳與完整互證資料") +
            (!this.status.copy.delivered
              ? button("deliver", "正式交付同一副本")
              : "") +
            button("confirm", "取得具名回條／確認撤離");
    this.callbacks.panel?.(
      `<p class="eyebrow">LEDGER CUSTODY</p><h2>${esc(nearby.title)}</h2><p>${esc(this.objective())}</p>${this.interactionNotice ? `<p class="banner" role="status">${esc(this.interactionNotice)}</p>` : ""}<div class="actions">${controls}${button("close", "返回現場")}</div>`,
    );
  }
  handle(action, dataset = {}) {
    if (!String(action).startsWith("ledger-") || this.disposed) return false;
    this.interactionNotice = null;
    try {
      if (action === "ledger-close") {
        this.activeInteraction = null;
        this.field.close();
        return true;
      }
      if (
        this.complete &&
        !["ledger-clearance", "ledger-confirm"].includes(action)
      )
        throw Error("回條已取得，證物與副本保管已封存。");
      if (action === "ledger-original") this.secureOriginal();
      else if (action === "ledger-custody") this.selectCustody(dataset.choice);
      else if (action === "ledger-deliver") this.deliver();
      else if (action === "ledger-clearance") this.presentClearance();
      else if (action === "ledger-confirm") this.confirmHandoff();
      else if (action === "ledger-drop") {
        this.field.active = this.press;
        this.field.release();
      } else if (
        ["ledger-repair", "ledger-seat", "ledger-verify"].includes(action)
      ) {
        const task = [this.carriage, this.carbon].find(
          (t) => t.id === dataset.task,
        );
        if (!task) throw Error("未知證物工作。");
        if (action === "ledger-verify") {
          const choice = task.choices.find((c) => c.id === dataset.choice);
          if (!choice) throw Error("未知證據判讀。");
          this.beforeChoice(task, choice);
        } else
          this.repair(
            task,
            action === "ledger-seat" ? "seat" : "adjust",
            dataset,
          );
      } else return false;
      if (!this.complete) this.refreshInteraction();
    } catch (error) {
      this.reportInteraction(error.message);
    }
    return true;
  }
  defeated(id) {
    const enemy = this.enemies.find((e) => e.id === id);
    if (!enemy || enemy.hp > 0)
      throw Error(
        "Only an actually defeated existing ledger guard may be recorded",
      );
    this.dispatch("actor-defeated", { actorId: id });
  }
  constrainMove(previous, proposed) {
    return this.handsOccupied
      ? this.field.constrainMovement(previous, proposed)
      : proposed;
  }
  controlEnemy(enemy, dt) {
    const order = this.orders.get(enemy.id);
    if (
      !order ||
      order.order === "guard" ||
      enemy.hp <= 0 ||
      this.callbacks.secured?.() ||
      enemy.engaged ||
      enemy.suppressed > 0
    )
      return false;
    const a = this.flow.actors[enemy.id],
      target = vector(
        order.order === "investigate"
          ? a.inspectPosition || a.position
          : a.position,
      );
    if (
      order.order === "investigate" &&
      gap(enemy.actor.position, this.player.position) < 10
    ) {
      enemy.alert = 5;
      return false;
    }
    enemy.state = order.order === "investigate" ? "inspect-ledger" : "standby";
    this.moveOrderedEnemy(enemy, target, 1.6, dt);
    enemy.windup = 0;
    return true;
  }
  moveOrderedEnemy(enemy, target, speed, dt) {
    if (enemy.hp <= 0 || !Number.isFinite(dt) || dt <= 0) return;
    const from = enemy.actor.position,
      colliders = this.world.colliders,
      geometry = tacticalGeometryKey(colliders, 0.38, 23);
    let cache = enemy.ledgerPath;
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
      cache = enemy.ledgerPath = {
        geometry,
        goal: { x: target.x, z: target.z },
        path: proof.ok ? proof.path.slice(1) : [],
      };
    }
    while (cache.path.length && gap(from, cache.path[0]) <= 0.025)
      cache.path.shift();
    const waypoint = cache.path[0];
    if (
      !waypoint ||
      !tacticalSegmentClear({
        from,
        to: waypoint,
        colliders,
        radius: 0.38,
        bounds: 23,
      })
    ) {
      if (waypoint) delete enemy.ledgerPath;
      this.world.animate(enemy.actor, "idle");
      return;
    }
    const dx = waypoint.x - from.x,
      dz = waypoint.z - from.z,
      length = Math.hypot(dx, dz),
      amount = Math.min(length, speed * dt),
      steps = Math.max(1, Math.ceil(amount / 0.1));
    for (let i = 0; i < steps; i++) {
      const p = moveCircle(
        from,
        ((dx / length) * amount) / steps,
        ((dz / length) * amount) / steps,
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
  update(dt) {
    if (this.disposed || !Number.isFinite(dt) || dt <= 0) return;
    this.props.update();
    if (this.status.response.status === "warned") {
      if (!this.status.response.presented) {
        this.toast(this.warning);
        this.dispatch("response-warning-presented", {
          responseId: this.flow.response.id,
        });
      } else
        this.dispatch("response-activated", {
          responseId: this.flow.response.id,
        });
    }
  }
  objective() {
    if (!this.status.shipmentVerified)
      return "找貨運票，翻真貨牌並比對車號與批次。";
    if (this.status.original.carrier !== "player-satchel")
      return "在原車廂旁，把核證的同一原帳放入可見背包。";
    if (!this.status.paymentVerified)
      return "對齊複寫頁與側光，核對付款壓痕及完整工名。";
    if (!this.status.localChoices.custody)
      return "在印臺選同一副本的保管人：南西信差或月台帳房。";
    if (!this.status.copy.delivered)
      return this.status.localChoices.custody === "sealed-courier"
        ? "把唯一副本親自帶給南西奧林，原帳仍在背包。"
        : "把唯一副本帶到原公告欄貼一頁，帳房在旁見證。";
    if (!this.complete)
      return "在具名接收者旁出示互證資料，取得副本保管與原帳通行回條。";
    return "帶原帳與具名保管回條，直接從南側撤離；最終公開或封存由你決定。";
  }
  labels() {
    const entries = [];
    if (this.status.original.carrier === "player-satchel")
      entries.push({
        position: {
          x: this.player.position.x,
          y: 2,
          z: this.player.position.z,
        },
        text: "原帳／背包保管",
      });
    if (this.status.localChoices.custody) {
      const dest = this.destination(),
        r = this.receiver(),
        a = this.receiverActor();
      entries.push(
        {
          position: { x: dest.position[0], y: 1.8, z: dest.position[1] },
          text: "◇ 唯一副本／交付點",
        },
        {
          position: { x: a.position.x, y: 1.9, z: a.position.z },
          text:
            r.id === this.flow.courier.id
              ? "◇ 奧林／保管回條"
              : "◇ 帳房／核證見證",
        },
      );
    }
    return entries;
  }
  diagnostics() {
    return {
      kind: "ledger",
      version: 1,
      missionId: this.id,
      original: this.props.readOriginalSnapshot(),
      copy: this.props.readCopySnapshot(),
      carriage: this.props.readCarriageSnapshot(),
      carbon: this.props.readCarbonSnapshot(),
      pressAngle: this.props.readPressAngle(),
      receipt: this.props.readReceiptSnapshot(),
      handsOccupied: this.handsOccupied,
      orders: Object.fromEntries(this.orders),
      pendingFieldEffects: this.field.pendingEffects.length,
    };
  }
  dispose() {
    if (this.disposed) return;
    this.disposed = true;
    this.activeInteraction = null;
    this.interactionNotice = null;
    for (const s of this.borrowedTargets) {
      s.parent.add(s.node);
      s.node.position.copy(s.position);
      s.node.quaternion.copy(s.quaternion);
      s.node.scale.copy(s.scale);
      this.press.parts[s.key] = s.node;
      for (const q of s.queries) {
        q.node.visible = q.visible;
        if (q.registered && !this.world.solids.includes(q.node))
          this.world.solids.push(q.node);
        if (q.box) this.world.solidBoxes.set(q.node, q.box);
        else this.world.solidBoxes.delete(q.node);
      }
    }
    this.props.dispose();
    for (const [task, text] of this.originalText) Object.assign(task, text);
    for (const enemy of this.enemies) delete enemy.ledgerPath;
    this.originalText.clear();
    this.orders.clear();
    this.appliedEffects.clear();
  }
}
