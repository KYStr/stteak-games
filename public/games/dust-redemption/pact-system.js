import * as THREE from "./vendor/three.module.js";
import {
  PACT_FLOW,
  createPactProgress,
  recordPactEvent,
  canonicalPactProgress,
} from "./pact-flow.js";
import { createPactProps } from "./pact-props.js";
import { applyFieldChoice } from "./expansion-content.js";
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
const esc = (v) =>
  String(v ?? "").replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ],
  );
const button = (action, text, data = "", disabled = false) =>
  `<button data-action="pact-${action}" ${data} ${disabled ? "disabled" : ""}>${esc(text)}</button>`;
export const PACT_EFFECT_TYPES = Object.freeze([
  "showPactEvidence",
  "confirmPactFeed",
  "confirmPactLighting",
  "selectPactSiding",
  "recordPactCartCheckpoint",
  "setPactStock",
  "confirmPactCart",
  "announcePactResponse",
  "confirmPactWarning",
  "setActorOrder",
  "setResponseState",
  "transferPactAmmo",
  "recoverableMistake",
  "confirmPactClearance",
  "disarmPactGuards",
  "setPactDeedCarrier",
  "issuePactReceipt",
]);
export function pactPlacementPoints(id) {
  const f = PACT_FLOW[id];
  return f
    ? [
        f.feed.position,
        f.lights.position,
        f.cart.position,
        f.handoff.position,
        f.handoff.witnessPosition,
        ...Object.values(f.bays).flatMap((b) => b.route),
        ...Object.values(f.actors)
          .map((a) => a.withdrawPosition)
          .filter(Boolean),
      ]
    : [];
}
export class PactSystem {
  constructor(world, id, field, player, enemies, callbacks = {}) {
    Object.assign(this, { world, id, field, player, enemies, callbacks });
    this.flow = PACT_FLOW[id];
    if (!this.flow) throw Error(`No pact flow for ${id}`);
    this.feed = field.tasks.find((t) => t.id === "pact-feed");
    this.cart = field.tasks.find((t) => t.id === "pact-cart");
    this.lights = field.tasks.find((t) => t.id === "pact-lights");
    if (
      ![this.feed, this.cart, this.lights].every(
        (t) => t?.pactFlowVersion === 1,
      )
    )
      throw Error("Pact controller requires pact-v1 expansion patch");
    this.progress = createPactProgress(id);
    this.status = canonicalPactProgress(id, this.progress, {
      requireComplete: false,
    });
    this.serial = 0;
    this.disposed = false;
    this.appliedEffects = new Set();
    this.originalTasks = new Map(
      [this.feed, this.cart, this.lights].map((t) => [
        t,
        {
          description: t.description,
          hints: t.hints,
          physicalSteps: t.physicalSteps,
          choices: t.choices,
          selectedChoice: t.selectedChoice,
        },
      ]),
    );
    this.feed.parts["military-feed"].rotation.z = 1.05;
    this.feed.values["military-feed"] = 1;
    this.batteryStart = this.lights.parts.battery.position.clone();
    this.batteryParent = this.lights.parts.battery.parent;
    this.cart.description =
      "同一礦車只推一趟。先選完整交涉側線或進攻掩體側線；車輪、把手及車尾都必須進入所選白框，再扣煞車。";
    this.cart.hints = [
      "完整交涉保留車上全部剩餘彈藥；掩體用途會封存其中六發，不能再算作整車可交涉物資。",
      "E可放手，回同車把手旁續推；沒有第二輛車或補一趟物資。",
    ];
    this.props = createPactProps(THREE, world, this.flow, { field, player });
    this.originalMethods = new Map();
    const wrap = (key, handler) => {
      const old = field[key],
        descriptor = Object.getOwnPropertyDescriptor(field, key);
      this.originalMethods.set(key, { old, descriptor });
      field[key] = handler(old.bind(field));
    };
    wrap(
      "cargoColliders",
      (old) => (task, colliders) =>
        task === this.cart
          ? old(task, colliders).filter((b) => b !== this.cart.collider)
          : old(task, colliders),
    );
    wrap("moveSafe", (old) => (object, dx, dz, colliders, radius) => {
      if (object !== this.cart.cargo)
        return old(object, dx, dz, colliders, radius);
      return this.props.resolveCartMotion(
        dx,
        dz,
        Math.atan2(dx, dz),
        colliders.filter((b) => b !== this.cart.collider),
      );
    });
    wrap("removeCargoCollider", (old) => (task) => {
      if (task === this.cart) return this.props.syncCartCollider();
      return old(task);
    });
    wrap("restoreCargoCollider", (old) => (task) => {
      if (task === this.cart) return this.props.syncCartCollider();
      return old(task);
    });
    wrap("checkpointRadius", (old) => (step, goal, colliders) => {
      if (step !== this.field.step(this.cart, "push-cart"))
        return old(step, goal, colliders);
      const bay = this.flow.bays[this.status.localChoices.siding];
      if (!bay) return 0;
      const final = gap(goal, vector(bay.position)) < 0.01;
      if (
        final &&
        this.props.readCartSnapshot().containedBayId !==
          this.status.localChoices.siding
      )
        return 0;
      return final ? 0.3 : 1.15;
    });
    wrap("applyWorld", (old) => (task, effect) => {
      old(task, effect);
      if (task === this.lights) {
        const choice = effect.flags?.includes("pact-dark-approach")
          ? "darken-approach"
          : effect.flags?.includes("pact-lit-approach")
            ? "preserve-battery"
            : null;
        if (choice) this.props.setLights(choice);
      }
      this.props.update();
    });
    this.props.update();
  }
  get complete() {
    return this.status.complete;
  }
  get handsOccupied() {
    return Boolean(this.cart.carrying);
  }
  get carrying() {
    return this.handsOccupied;
  }
  toast(message) {
    this.callbacks.toast?.(message);
  }
  near(p, r = 2.3) {
    return gap(this.player.position, vector(p)) <= r + 1e-8;
  }
  requireNear(p, r = 2.3) {
    if (!this.near(p, r)) throw Error("請親自走到同一實體工作或交接點旁。");
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
    const self = new Set();
    if (this.props.deed?.parent === this.player.object)
      this.props.deed.traverse((n) => self.add(n));
    this.props.parts?.satchel?.traverse((n) => self.add(n));
    const query = Object.create(this.world);
    query.solids = this.world.solids.filter((n) => !self.has(n));
    const hit = this.world.trace.call(query, eye, target),
      ok =
        !hit ||
        boxes.has(hit.box) ||
        hit.distance >= eye.distanceTo(target) - 0.06;
    if (!ok)
      this.lastOcclusion = {
        target: node.name,
        hit: hit?.box?.id,
        distance: hit?.distance,
      };
    return ok;
  }
  requireVisible(node, allowed = []) {
    if (!this.visible(node, allowed))
      throw Error("實體控制或見證人被遮住，請走到能直接看見的一側。");
  }
  report(message) {
    this.interactionNotice = message;
    this.toast(message);
    this.refresh();
  }
  refresh() {
    if (this.field.active) this.field.renderPanel();
    else if (this.activeInteraction)
      this.renderInteraction(this.activeInteraction);
  }
  dispatch(type, payload = {}) {
    const r = recordPactEvent(this.id, this.progress, {
      id: `pact-event-${++this.serial}`,
      type,
      ...payload,
    });
    for (const e of r.effects)
      if (!PACT_EFFECT_TYPES.includes(e.type))
        throw Error(`Unhandled pact effect: ${e.type}`);
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
      case "showPactEvidence":
      case "confirmPactLighting":
      case "recordPactCartCheckpoint":
      case "confirmPactCart":
      case "confirmPactWarning":
      case "setResponseState":
      case "confirmPactClearance":
        break;
      case "confirmPactFeed":
        this.props.setFeed(false, true);
        break; // .8 belongs only to original deferred Field effect.
      case "selectPactSiding": {
        const bay = this.flow.bays[e.choiceId];
        this.props.setCartUse(e.choiceId);
        this.cart.choices = this.originalTasks
          .get(this.cart)
          .choices.map((c) =>
            c.id === "brake-in-siding"
              ? {
                  ...c,
                  label:
                    e.choiceId === "assault-siding"
                      ? "進攻側線扣煞車，封存六發作掩體"
                      : "交涉側線扣煞車，保全車上剩餘物資",
                  message:
                    e.choiceId === "assault-siding"
                      ? "同車完整進入進攻側線。六發已封存作掩體，已領彈藥另記，其餘仍可交涉。"
                      : "同車完整進入交涉側線。車上剩餘物資全數保留，已領彈藥另行盤點。",
                }
              : c,
          );
        this.cart.physicalSteps = this.originalTasks
          .get(this.cart)
          .physicalSteps.map((s) =>
            s.id === "push-cart"
              ? { ...s, waypoints: bay.route.map((p) => [...p]) }
              : s.id === "park-cart"
                ? { ...s, position: [...bay.position], radius: bay.radius }
                : s,
          );
        break;
      }
      case "setPactStock":
        this.props.setStock(e.stock);
        break;
      case "announcePactResponse":
        this.warning = e.text;
        break;
      case "setActorOrder":
        for (const id of e.actorIds) {
          const enemy = this.enemies.find((a) => a.id === id);
          if (!enemy || enemy.hp <= 0) continue;
          delete enemy.pactPath;
          enemy.windup = 0;
          enemy.state = e.order === "guard" ? "idle" : `pact-${e.order}`;
          if (e.order === "surrender") {
            enemy.engaged = false;
            enemy.alert = 0;
            enemy.state = "pact-surrender";
          }
        }
        break;
      case "transferPactAmmo": {
        const enemy = this.enemies.find((a) => a.id === e.actorId);
        if (!enemy || enemy.hp <= 0 || enemy.rounds !== e.roundsBefore)
          throw Error("Real finite resupply actor changed before transfer");
        enemy.rounds = e.roundsAfter;
        break;
      }
      case "recoverableMistake":
        this.field.pendingEffects.push({
          task: this.field.active || this.feed,
          effect: {
            alertDelta: e.alertDelta,
            exposureSeconds: e.exposureSeconds,
            message: e.message,
          },
        });
        this.field.state.mistakes++;
        this.report(e.message);
        break;
      case "disarmPactGuards":
        for (const id of e.actorIds) {
          const enemy = this.enemies.find((a) => a.id === id);
          if (!enemy || enemy.hp <= 0) continue;
          enemy.rounds = 0;
          enemy.magazine = 0;
          enemy.windup = 0;
          enemy.alert = 0;
          enemy.state = "pact-surrender";
          if (enemy.actor.weaponModel) enemy.actor.weaponModel.visible = false;
        }
        break;
      case "setPactDeedCarrier":
        this.props.setDeedCarrier(e.carrier);
        break;
      case "issuePactReceipt":
        this.props.showReceipt();
        this.toast("同車庫存已盤點，地契在背包、具名回條已簽署；從南側撤離。");
        break;
      default:
        throw Error(`Unhandled pact effect: ${e.type}`);
    }
  }
  observeClue(id) {
    const d = this.flow.evidence[id];
    if (!d) return "";
    this.dispatch("evidence-observed", {
      sourceId: id,
      recordId: d.recordId,
      playerPosition: point(this.player.position),
    });
    return d.text;
  }
  available(task) {
    if (task === this.lights) return true;
    if (task === this.cart) return this.field.done(this.feed);
    return true;
  }
  interactionRadius(task, fallback) {
    return task === this.cart ? 2.6 : fallback;
  }
  route(task, step, route) {
    return task === this.cart &&
      step.id === "push-cart" &&
      this.status.localChoices.siding
      ? this.flow.bays[this.status.localChoices.siding].route.map((p) => [...p])
      : route;
  }
  recordStep(task, step) {
    if (task === this.cart && step.id === "push-cart") {
      this.syncCheckpoint(true);
      // A parked full cart remains on its wheels, not Field's hand-held cargo lane.
      task.carrying = false;
      task.cargo.position.y = 0;
    }
    return "";
  }
  syncFeed() {
    this.props.update();
    const s = this.props.readFeedSnapshot();
    if (
      !this.status.feedCut &&
      !s.militaryPowered &&
      s.civilianPowered &&
      this.status.evidence["pact-wages"] &&
      this.near(this.flow.feed.position)
    )
      this.dispatch("feed-confirmed", {
        feedSnapshot: s,
        playerPosition: point(this.player.position),
      });
  }
  syncCheckpoint(final = false) {
    if (!this.status.localChoices.siding || this.status.cart.parked) return;
    const next = this.status.cart.checkpoint + 1,
      bay = this.flow.bays[this.status.localChoices.siding],
      tr = this.field.traversal;
    if (next >= bay.route.length) return;
    if (
      !(tr?.task === this.cart && tr.index > next) &&
      !(final && next === bay.route.length - 1)
    )
      return;
    this.dispatch("cart-checkpoint", {
      index: next,
      cartSnapshot: this.props.readCartSnapshot(),
      playerPosition: point(this.player.position),
    });
  }
  beforeFieldAction(action, dataset = {}) {
    this.interactionNotice = null;
    this.pendingFieldTask = this.field.active || this.field.traversal?.task;
    const task = this.pendingFieldTask;
    if (action === "field-close") {
      this.activeInteraction = null;
      return true;
    }
    if (!task) return true;
    try {
      if (
        this.complete &&
        !["field-view", "field-focus", "field-choice"].includes(action)
      )
        throw Error("地契交接已簽署，不能再改動物資。");
      const step = this.field.step(task, dataset.step);
      if (
        [
          "field-adjust",
          "field-seat",
          "field-inspect",
          "field-step",
          "field-resume",
          "field-release",
        ].includes(action)
      ) {
        const p =
          task === this.cart
            ? point(this.cart.cargo.getWorldPosition(new THREE.Vector3()))
            : task.position;
        this.requireNear(p, task === this.cart ? 2.6 : 2.3);
        if (step?.target)
          this.requireVisible(task.parts[step.target], [task.collider]);
        if (
          task === this.cart &&
          step?.id === "push-cart" &&
          !this.status.localChoices.siding
        )
          throw Error("先選這一趟礦車的停靠用途。");
        if (task === this.cart && step?.id === "park-cart") {
          const bay = this.flow.bays[this.status.localChoices.siding];
          if (
            !bay ||
            this.status.cart.checkpoint !== bay.route.length - 1 ||
            this.props.readCartSnapshot().containedBayId !==
              this.status.localChoices.siding
          )
            throw Error("繼續推同一礦車，等車輪、把手與車尾完整進框再扣煞車。");
        }
      }
      return true;
    } catch (error) {
      this.report(error.message);
      return false;
    }
  }
  afterFieldAction() {
    const task = this.pendingFieldTask;
    this.pendingFieldTask = null;
    this.props.update();
    if (task === this.feed) this.syncFeed();
    if (
      task === this.lights &&
      this.field.done(task) &&
      !this.status.localChoices.lighting
    )
      this.dispatch("lights-confirmed", {
        choiceId: this.field.state.choices[task.id],
        lightSnapshot: this.props.readLightSnapshot(),
        playerPosition: point(this.player.position),
      });
    if (
      task === this.cart &&
      this.field.recorded(task, this.field.step(task, "park-cart")) &&
      !this.status.cart.parked
    )
      this.dispatch("cart-parked", {
        cartSnapshot: this.props.readCartSnapshot(),
        playerPosition: point(this.player.position),
      });
  }
  beforeChoice(task, choice) {
    try {
      if (this.field.done(task)) return true;
      if (!choice.success) return true;
      this.requireNear(
        task === this.cart ? point(this.cart.cargo.position) : task.position,
        task === this.cart ? 2.6 : 2.3,
      );
      const candidate = applyFieldChoice(this.field.state, task.id, choice.id);
      if (!candidate.complete) return true;
      if (task === this.feed) {
        this.requireVisible(task.parts["military-feed"], [task.collider]);
        this.requireVisible(task.parts["civilian-feed"], [task.collider]);
        const s = this.props.readFeedSnapshot();
        if (s.militaryPowered || !s.civilianPowered)
          throw Error("軍用桿必須實際斷開，民生桿及水醫線保持供電。");
        this.syncFeed();
      }
      if (task === this.cart) {
        this.requireVisible(this.cart.parts["cart-brake"], [task.collider]);
        const s = this.props.readCartSnapshot();
        if (
          !this.status.cart.parked ||
          s.containedBayId !== this.status.localChoices.siding ||
          Math.abs(s.brakeAngle - 1.05) > 0.01
        )
          throw Error("同一礦車需完整停入所選框並扣煞車。");
      }
      if (task === this.lights) {
        this.requireVisible(task.parts.battery, [task.collider]);
        const battery = task.parts.battery,
          s = this.props.readLightSnapshot();
        const removed =
          battery.parent === this.batteryParent &&
          battery.position.distanceTo(this.batteryStart) > 0.35;
        if (
          choice.id === "darken-approach" &&
          (!removed || Math.abs(s.lidAngle - 1.05) > 0.01)
        )
          throw Error("先打開箱蓋，親手抽出同一組電池。");
        if (
          choice.id === "preserve-battery" &&
          (removed ||
            battery.parent !== this.batteryParent ||
            Math.abs(s.lidAngle) > 0.01)
        )
          throw Error("完整電池必須仍在原接點，箱蓋實際關好。");
      }
      return true;
    } catch (error) {
      this.report(error.message);
      return false;
    }
  }
  beforeCargo(task, action) {
    if (task !== this.cart) return !this.handsOccupied;
    try {
      this.requireNear(point(task.cargo.position), 2.6);
      this.requireVisible(task.cargo, [task.collider]);
      if (action === "pickup" && !this.status.localChoices.siding)
        throw Error("先選同車停靠用途。");
      return true;
    } catch (error) {
      this.report(error.message);
      return false;
    }
  }
  controls(task) {
    const notice = this.interactionNotice
      ? `<p class="banner" role="status">${esc(this.interactionNotice)}</p>`
      : "";
    if (task === this.cart)
      return `${notice}<p>24發原庫存：可交涉 ${this.status.cart.stock.available}／已領用 ${this.status.cart.stock.issued}／掩體封存 ${this.status.cart.stock.cover}。</p>${
        this.status.localChoices.siding
          ? `<p>這一趟：${esc(this.flow.bays[this.status.localChoices.siding].title)}</p>`
          : Object.entries(this.flow.bays)
              .map(([id, b]) =>
                button("siding", b.title, `data-choice="${id}"`),
              )
              .join("")
      }`;
    if (task === this.feed)
      return `${notice}<p>軍用與民生端點分別顯示供電；斷軍線阻止尚未領取的補給，水與醫療線繼續供電。</p>`;
    if (task === this.lights)
      return `${notice}<p>把電池拆入回收槽會熄燈；完整保留可領20旅費。兩個選項均可在越過防線前準備。</p>`;
    return "";
  }
  witness() {
    return this.props.witness;
  }
  deskPayload() {
    const actor = this.witness();
    if (!actor) throw Error("缺少實際盤點見證人。");
    return {
      playerPosition: point(this.player.position),
      witnessPosition: point(actor.position),
    };
  }
  requireDesk() {
    this.requireNear(this.flow.handoff.position, this.flow.handoff.radius);
    this.requireVisible(this.props.desk);
    this.requireVisible(this.witness()?.object);
  }
  proof() {
    return {
      cartSnapshot: this.props.readCartSnapshot(),
      feedSnapshot: this.props.readFeedSnapshot(),
      lightSnapshot: this.props.readLightSnapshot(),
      ...this.deskPayload(),
    };
  }
  actorSnapshots() {
    return this.enemies.map((e) => ({
      id: e.id,
      position: point(e.actor.position),
      hp: Math.max(0, e.hp),
      rounds: e.rounds,
      magazine: Math.min(e.magazine, e.rounds),
      order:
        e.hp <= 0
          ? "defeated"
          : {
              "pact-surrender": "surrender",
              "pact-resupply": "resupply",
              "pact-withdraw": "withdraw",
            }[e.state] || "guard",
    }));
  }
  presentClearance(reasonId) {
    this.requireDesk();
    if (this.field.pendingEffects.length)
      throw Error("先返回現場，讓先前工作效果完成，再確認交接。");
    this.dispatch("clearance-presented", { reasonId, ...this.proof() });
  }
  handoff() {
    this.requireDesk();
    if (!this.field.complete || this.field.pendingEffects.length)
      throw Error("三項工作須實際完成並返回現場結清，才能盤點與領地契。");
    const kills = this.callbacks.kills?.();
    if (
      !Number.isInteger(kills) ||
      kills !== this.status.defeatedActors.length ||
      !(kills === 6 || (kills === 0 && this.status.clearance))
    )
      throw Error(
        "需要零擊殺的可核驗交械，或六名既有守軍全部解除；不能跳過同車盤點。",
      );
    const inventory = !this.status.inventory
      ? {
          actorSnapshots: this.actorSnapshots(),
          cartSnapshot: this.props.readCartSnapshot(),
          ...this.deskPayload(),
        }
      : null;
    let deed = null;
    if (this.status.deed.carrier !== "player-satchel") {
      this.requireVisible(this.props.deed);
      deed = {
        deedSnapshot: this.props.readDeedSnapshot(),
        ...this.proof(),
      };
    }
    // Validate all current physical inputs before disarming anyone or moving the deed.
    let preview = this.progress;
    for (const [type, payload] of [
      ["inventory-confirmed", inventory],
      ["deed-collected", deed],
    ])
      if (payload)
        preview = recordPactEvent(this.id, preview, {
          id: `pact-preflight-${this.serial}-${type}`,
          type,
          ...payload,
        }).state;
    if (inventory) this.dispatch("inventory-confirmed", inventory);
    if (deed) this.dispatch("deed-collected", deed);
    if (!this.complete)
      this.dispatch("handoff-received", {
        deedSnapshot: this.props.readDeedSnapshot(),
        cartSnapshot: this.props.readCartSnapshot(),
        actorSnapshots: this.actorSnapshots(),
        ...this.deskPayload(),
      });
    if (this.complete && !this.callbacks.secured?.())
      this.callbacks.secure?.(kills === 0 ? "nonlethal" : "combat");
  }
  nearest() {
    const p = this.flow.handoff.position;
    if (this.near(p, this.flow.handoff.radius))
      return {
        type: "mission",
        kind: "handoff",
        position: p,
        radius: this.flow.handoff.radius,
        distance: gap(this.player.position, vector(p)),
        title: this.complete
          ? "地契與具名回條／南撤"
          : "同車物資盤點／地契交接",
      };
    return null;
  }
  interact(nearby) {
    if (
      !nearby ||
      nearby.type !== "mission" ||
      !this.near(nearby.position, nearby.radius)
    )
      return false;
    this.activeInteraction = nearby;
    this.renderInteraction(nearby);
    return true;
  }
  renderInteraction(nearby) {
    this.callbacks.panel?.(
      `<p class="eyebrow">PACT INVENTORY</p><h2>${esc(nearby.title)}</h2><p>${esc(this.objective())}</p>${this.interactionNotice ? `<p class="banner" role="status">${esc(this.interactionNotice)}</p>` : ""}<div class="actions">${button("clearance", "以安全撤離與公開聽證換交械", 'data-reason="safe-departure-and-hearing"')}${button("clearance", "保證公司會照舊發薪", 'data-reason="keep-paying-contract"')}${button("handoff", "盤點同車物資、領地契與具名回條")}${button("close", "返回現場")}</div>`,
    );
  }
  handle(action, data = {}) {
    if (!String(action).startsWith("pact-") || this.disposed) return false;
    this.interactionNotice = null;
    try {
      if (action === "pact-close") {
        this.activeInteraction = null;
        this.field.close();
        return true;
      }
      if (this.complete && action !== "pact-handoff")
        throw Error("具名回條已簽署，物資用途已封存。");
      if (action === "pact-siding") {
        this.requireNear(point(this.cart.cargo.position), 2.6);
        this.requireVisible(this.cart.cargo, [this.cart.collider]);
        this.dispatch("siding-selected", {
          choiceId: data.choice,
          cartSnapshot: this.props.readCartSnapshot(),
          playerPosition: point(this.player.position),
        });
      } else if (action === "pact-clearance")
        this.presentClearance(data.reason);
      else if (action === "pact-handoff") this.handoff();
      else return false;
      if (!this.complete) this.refresh();
    } catch (error) {
      this.report(error.message);
    }
    return true;
  }
  defeated(id) {
    const enemy = this.enemies.find((e) => e.id === id);
    if (!enemy || enemy.hp > 0)
      throw Error("Only a truly defeated authored pact guard may be recorded");
    this.dispatch("actor-defeated", { actorId: id });
  }
  constrainMove(previous, proposed) {
    return this.handsOccupied
      ? this.field.constrainMovement(previous, proposed)
      : proposed;
  }
  controlEnemy(enemy, dt) {
    const a = this.status.actors[enemy.id];
    if (!a || enemy.hp <= 0) return false;
    if (a.order === "surrender") {
      enemy.windup = 0;
      enemy.alert = 0;
      enemy.engaged = false;
      enemy.state = "pact-surrender";
      this.world.animate(enemy.actor, "idle");
      return true;
    }
    if (
      !["resupply", "withdraw"].includes(a.order) ||
      this.callbacks.secured?.() ||
      enemy.engaged ||
      enemy.suppressed > 0
    )
      return false;
    const target =
      a.order === "resupply"
        ? this.props.pickupAnchors.get(enemy.id)
        : vector(this.flow.actors[enemy.id].withdrawPosition);
    if (!target) return true;
    enemy.state = a.order === "resupply" ? "pact-resupply" : "pact-withdraw";
    enemy.windup = 0;
    this.moveOrderedEnemy(enemy, target, 1.6, dt);
    if (
      a.order === "resupply" &&
      gap(enemy.actor.position, target) <= this.flow.response.pickupRadius
    ) {
      this.dispatch("resupply-received", {
        actorId: enemy.id,
        actorPosition: point(enemy.actor.position),
        pickupPosition: point(target),
        cartSnapshot: this.props.readCartSnapshot(),
        feedSnapshot: this.props.readFeedSnapshot(),
        roundsBefore: enemy.rounds,
      });
    }
    return true;
  }
  moveOrderedEnemy(enemy, target, speed, dt) {
    if (enemy.hp <= 0 || !Number.isFinite(dt) || dt <= 0) return;
    const from = enemy.actor.position,
      colliders = this.world.colliders,
      geometry = tacticalGeometryKey(colliders, 0.38, 23);
    let cache = enemy.pactPath;
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
      cache = enemy.pactPath = {
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
  update(dt) {
    if (this.disposed) return;
    this.props.update();
    this.syncCheckpoint();
    if (!this.status.feedCut) this.syncFeed();
    if (
      !this.complete &&
      this.status.response.status === "waiting" &&
      this.player.position.z <= this.flow.response.approachZ
    )
      this.dispatch("approach-observed", {
        feedSnapshot: this.props.readFeedSnapshot(),
        playerPosition: point(this.player.position),
      });
    if (this.status.response.status === "warned") {
      if (!this.status.response.presented) {
        this.toast(this.warning || this.flow.response.warning);
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
    if (this.complete)
      return "同車庫存已盤點；地契在背包、具名回條已簽署，直接南撤。";
    if (!this.status.feedCut)
      return "沿真軍民線找到分電桿；只切軍線以阻止剩餘補給，保留民生。";
    if (!this.status.localChoices.lighting)
      return "南側電池箱可提前選熄燈或保留電池；先準備再跨主防線。";
    if (!this.status.localChoices.siding)
      return "到同一礦車選完整交涉側線或進攻掩體側線。";
    if (!this.status.cart.parked)
      return "親手推同一車到所選側線，整車進框後扣煞車。";
    return `車上可交涉 ${this.status.cart.stock.available}發、已領 ${this.status.cart.stock.issued}發、掩體封存 ${this.status.cart.stock.cover}發。到盤點台出示三份承諾並交械，或解除六人防線，再領地契回條。`;
  }
  labels() {
    return [
      {
        position: {
          x: this.flow.handoff.position[0],
          y: 2.8,
          z: this.flow.handoff.position[1],
        },
        text: "◆ 物資盤點／地契",
      },
      ...Object.entries(this.flow.bays)
        .filter(
          ([id]) =>
            !this.status.localChoices.siding ||
            id === this.status.localChoices.siding,
        )
        .map(([, b]) => ({
          position: { x: b.position[0], y: 2, z: b.position[1] },
          text: b.title,
        })),
    ];
  }
  diagnostics() {
    return {
      kind: "pact",
      version: 1,
      missionId: this.id,
      feed: this.props.readFeedSnapshot(),
      cart: this.props.readCartSnapshot(),
      lights: this.props.readLightSnapshot(),
      deed: this.props.readDeedSnapshot(),
      actors: this.actorSnapshots(),
      handsOccupied: this.handsOccupied,
      pendingFieldEffects: this.field.pendingEffects.length,
    };
  }
  dispose() {
    if (this.disposed) return;
    this.disposed = true;
    for (const [key, { descriptor }] of this.originalMethods) {
      if (descriptor) Object.defineProperty(this.field, key, descriptor);
      else delete this.field[key];
    }
    this.originalMethods.clear();
    this.props.dispose();
    for (const [task, old] of this.originalTasks) Object.assign(task, old);
    this.originalTasks.clear();
    for (const e of this.enemies) delete e.pactPath;
    this.appliedEffects.clear();
    this.activeInteraction = null;
  }
}
