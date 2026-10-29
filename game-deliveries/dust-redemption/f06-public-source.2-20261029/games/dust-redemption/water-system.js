import * as THREE from "./vendor/three.module.js";
import {
  WATER_FLOW,
  createWaterProgress,
  recordWaterEvent,
  canonicalWaterProgress,
} from "./water-flow.js";
import { createWaterProps } from "./water-props.js";
import { moveCircle } from "./physics.js";
import {
  planTacticalPath,
  certifyTacticalPath,
  tacticalSegmentClear,
  tacticalGeometryKey,
} from "./enemy-tactics.js";

const point = (p) => [p.x, p.z];
const vector = (p) => new THREE.Vector3(p[0], 0, p[1]);
const gap = (a, b) => Math.hypot(a.x - b.x, a.z - b.z);
const esc = (s) =>
  String(s ?? "").replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ],
  );
const button = (action, title, data = "", disabled = false) =>
  `<button data-action="water-${action}" ${data} ${disabled ? "disabled" : ""}>${esc(title)}</button>`;
const near = (player, position, radius) =>
  gap(player.position, vector(position)) <= radius + 1e-8;

export function waterPlacementPoints(id) {
  const flow = WATER_FLOW[id];
  if (!flow) return [];
  return [
    ...Object.values(flow.tasks)
      .filter((task) => task.position)
      .map((task) => task.position),
    ...Object.values(flow.routes).flatMap((route) =>
      [route.gatePosition, ...route.path].filter(Boolean),
    ),
    ...Object.values(flow.recipients).map((recipient) => recipient.position),
    ...Object.values(flow.reserve.stations).map((station) => station.position),
  ];
}

/** Scene adapter: events follow live FieldSystem operations, never canonical answers.
 * Host must bracket field.handle with beforeFieldAction / afterFieldAction.
 * Fresh construction always starts at the entry; saved local events are not replayed into scene objects.
 */
export class WaterSystem {
  constructor(world, id, field, player, enemies, callbacks = {}) {
    this.world = world;
    this.id = id;
    this.flow = WATER_FLOW[id];
    if (!this.flow) throw new Error(`No water flow for ${id}`);
    this.field = field;
    this.player = player;
    this.enemies = enemies;
    this.callbacks = callbacks;
    this.progress = createWaterProgress(id);
    this.status = canonicalWaterProgress(id, this.progress, {
      requireComplete: false,
    });
    this.serial = 0;
    this.appliedEffects = new Set();
    this.orders = new Map(
      Object.entries(this.flow.actors).map(([actorId, actor]) => [
        actorId,
        { order: actor.initialOrder, targetId: null },
      ]),
    );
    this.bypass = field.tasks.find((task) => task.id === "water-bypass");
    this.allocation = field.tasks.find(
      (task) => task.id === "water-allocation",
    );
    this.reserve = field.tasks.find((task) => task.id === "water-reserve");
    if (!this.bypass || !this.allocation || !this.reserve)
      throw new Error("Water flow requires the three original field tasks");
    this.props = createWaterProps(THREE, world, this.flow);
    this.props.bindControls({
      "bypass-wheel": this.bypass.parts["bypass-wheel"],
      clinic: this.allocation.parts.clinic,
      homes: this.allocation.parts.homes,
      mine: this.allocation.parts.mine,
    });
    this.diverterTouched = false;
    this.calibrationColumns = ["clinic", "homes", "mine"].map((id) => {
      const node = this.allocation.parts[`flow-${id}`];
      return { node, visible: node.visible };
    });
    this.calibrationLabels = ["診所 2格", "住區 2格", "礦場 1格"].map(
      (text) => {
        const node = this.allocation.object.getObjectByName(`label-${text}`);
        if (!node) throw new Error(`Missing calibration label: ${text}`);
        return { node, visible: node.visible };
      },
    );
    this.pendingFieldTask = null;
    this.pendingResponse = false;
    this.disposed = false;
    this.reserveOriginal = {
      position: [...this.reserve.position],
      object: this.reserve.object.position.clone(),
      marker: this.reserve.marker.position.clone(),
      visible: this.reserve.object.visible,
      markerVisible: this.reserve.marker.visible,
      colliderPresent: world.colliders.includes(this.reserve.collider),
    };
    this.reserveSolids = world.solids.filter(
      (node) => world.solidBoxes.get(node) === this.reserve.collider,
    );
    // This is the original bucket. It appears at the selected maintenance station once,
    // rather than leaving a duplicate bucket/interaction at the former northern objective.
    this.reserve.object.visible = false;
    this.reserve.marker.visible = false;
    world.colliders = world.colliders.filter(
      (box) => box !== this.reserve.collider,
    );
    world.solids = world.solids.filter(
      (node) => !this.reserveSolids.includes(node),
    );
    this.allocation.description =
      "先在三個輪子校正二、二、一，再決定今日供水與實際可通行的河岸。校正讀值與當日最低保證是不同階段。";
    this.allocation.hints = [
      "三輪的二、二、一是五格入口的校正；之後導流柄可把住區的一格送入維修旁通。",
      "水契保證三處各至少一格；西淺灘是否開啟取決於真實分流與驗流。",
    ];
    this.allocation.choices = this.allocation.choices.map((choice) =>
      choice.id === "two-two-one"
        ? {
            ...choice,
            label: "完成三輪校正，準備選擇今日供水",
            message:
              "校正完成。選擇今日配水，再操作實體導流柄並讀取四根流量柱。",
          }
        : choice,
    );
  }
  get complete() {
    return this.status.complete;
  }
  dispatch(type, payload = {}) {
    const result = recordWaterEvent(this.id, this.progress, {
      id: `water-event-${++this.serial}`,
      type,
      ...payload,
    });
    this.progress = result.state;
    this.status = result.status;
    for (const effect of result.effects) {
      if (this.appliedEffects.has(effect.effectId)) continue;
      this.apply(effect);
      this.appliedEffects.add(effect.effectId);
    }
    return result;
  }
  toast(message) {
    this.callbacks.toast?.(message);
  }
  apply(effect) {
    switch (effect.type) {
      case "showWaterEvidence":
      case "recordWaterInspection":
      case "setWaterValveState": // The field operation already moved the physical control.
      case "setWaterPressure":
      case "confirmWaterCalibration":
      case "confirmLegacyWaterReserve": // Only FieldSystem owns healing and the +15 reward.
        break;
      case "showWaterAllocationTarget":
        // Once the local diversion begins, show the four actual outlet meters.
        // The older three columns described calibration, not final destinations.
        for (const { node } of [
          ...this.calibrationColumns,
          ...this.calibrationLabels,
        ])
          node.visible = false;
        this.props.setRecipient(effect.recipientId);
        this.toast(effect.message);
        break;
      case "bindWaterReserveStation":
        this.moveReserve(effect.position);
        break;
      case "setWaterDistribution":
        this.props.setDistribution(effect.validated);
        break;
      case "setWaterRouteState":
        this.props.setRouteState(effect.routeId, effect.open, {
          occupants: this.occupants(),
        });
        break;
      case "announceWaterResponse":
        this.pendingResponse = true;
        this.responseWarning = effect.text;
        break;
      case "setActorOrder":
        for (const id of effect.actorIds) {
          const enemy = this.enemies.find((entry) => entry.id === id);
          if (!enemy || enemy.hp <= 0) continue;
          this.orders.set(id, {
            order: effect.order,
            targetId: effect.targetId,
          });
          enemy.windup = 0;
          enemy.alert = 0;
          enemy.waterPath = null;
          if (effect.resetEngagement) enemy.engaged = false;
        }
        break;
      case "setResponseState":
        if (effect.status !== "warned") this.pendingResponse = false;
        break;
      case "publishWaterGuarantee":
        this.toast(effect.text);
        break;
      case "issueWaterReceipt":
        this.toast(
          "伊妮絲已簽收五格供水。出示回條確認停火或清場，再由南側撤離；永久水權留待結算決定。",
        );
        break;
      case "recoverableMistake":
        this.callbacks.effect?.(effect, {
          taskId: this.field.active?.id || "water-allocation",
          position: point(this.player.position),
        });
        break;
      default:
        throw new Error(`Unimplemented water effect: ${effect.type}`);
    }
  }
  occupants() {
    const entries = [
      { id: "player", position: this.player.position, radius: 0.34 },
    ];
    const seen = new Set([this.player.position]);
    for (const enemy of this.enemies) {
      const position = enemy.actor?.position;
      if (!position || seen.has(position)) continue;
      seen.add(position);
      if (enemy.hp <= 0) continue;
      entries.push({ id: enemy.id, position, radius: 0.38 });
    }
    for (const actor of this.world.actors || []) {
      if (
        !actor.position ||
        seen.has(actor.position) ||
        actor.object?.visible === false
      )
        continue;
      seen.add(actor.position);
      entries.push({
        id: actor.object?.name || actor.name || "npc",
        position: actor.position,
        radius: 0.34,
      });
    }
    for (const task of this.field.tasks) {
      if (
        !task.cargo ||
        task.cargo.visible === false ||
        seen.has(task.cargo.position)
      )
        continue;
      seen.add(task.cargo.position);
      entries.push({
        id: `${task.id}-cargo`,
        position: task.cargo.position,
        radius: 0.55,
      });
    }
    return entries;
  }
  moveReserve(position) {
    const task = this.reserve;
    task.position = [...position];
    task.object.position.set(position[0], 0, position[1]);
    task.marker.position.set(position[0], 0.055, position[1]);
    task.object.visible = true;
    task.marker.visible = true;
    this.moveReserveCollider(position);
    if (task.collider && !this.world.colliders.includes(task.collider))
      this.world.colliders.push(task.collider);
    for (const node of this.reserveSolids)
      if (!this.world.solids.includes(node)) this.world.solids.push(node);
    task.object.updateWorldMatrix(true, true);
  }
  moveReserveCollider(position) {
    const box = this.reserve.collider;
    if (!box) return;
    box.x = position[0];
    box.z = position[1];
    box.min.x = box.x - box.w / 2;
    box.max.x = box.x + box.w / 2;
    box.min.z = box.z - box.d / 2;
    box.max.z = box.z + box.d / 2;
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
  recordStep(task, step) {
    const spec = this.flow.tasks[task.id]?.inspect;
    if (
      spec?.stepId !== step.id ||
      !task.inspections.has(step.id) ||
      !this.field.recorded(task, step)
    )
      return "";
    this.dispatch("part-inspected", {
      taskId: task.id,
      partId: spec.partId,
      playerPosition: point(this.player.position),
    });
    return task.id === "water-bypass"
      ? "裂口位在直管；轉旁通輪後，請讀取壓力針確認卸壓。"
      : "這是獨立的一桶維修備水，不占五格主供水；左向維修槽，右向公用槽。";
  }
  beforeFieldAction(action, dataset = {}) {
    this.pendingFieldTask =
      this.field.active || this.field.traversal?.task || null;
    const task = this.pendingFieldTask;
    if (!task || action === "field-close") return true;
    if (!this.atTask(task) && !["field-view", "field-focus"].includes(action)) {
      this.field.renderPanel(
        "請返回現場並靠近工作台，再操作或提交；目前進度保持不變。",
      );
      return false;
    }
    if (task.id === "water-reserve" && !this.status.localChoices.routing) {
      this.toast(
        "先在配水工作台選定今日水路，才會把同一桶備水送至該岸維修槽。",
      );
      return false;
    }
    if (
      this.complete &&
      !["field-view", "field-focus", "field-resume"].includes(action)
    ) {
      this.toast("已簽收的供水與備水封存；回條可在接收者旁確認。");
      return false;
    }
    if (action === "field-adjust" && task === this.bypass) {
      const step = this.field.step(task, dataset.step);
      if (
        step?.target === "bypass-wheel" &&
        task.values[step.target] + Math.sign(Number(dataset.delta)) > 2
      ) {
        this.toast("旁通輪的實體止擋只有零、一、二檔；請向回轉。");
        return false;
      }
    }
    return true;
  }
  afterFieldAction(action) {
    const task = this.pendingFieldTask || this.field.active;
    this.pendingFieldTask = null;
    if (!task || action === "field-close") return;
    if (action === "field-adjust") {
      this.syncTask(task);
      this.props.refreshMeters();
    }
    if (action === "field-choice") this.acceptFieldChoice(task);
  }
  syncTask(task) {
    const spec = this.flow.tasks[task.id];
    if (!spec || !near(this.player, task.position, spec.radius))
      throw new Error("請走到實際工作台再操作閥門。");
    const values = this.props.readValveValues();
    for (const [id, valve] of Object.entries(this.flow.valves)) {
      if (
        valve.taskId !== task.id ||
        id === "maintenance-diverter" ||
        !task.touched.has(id)
      )
        continue;
      let value;
      if (id === "reserve-spout") {
        const raw = task.values[id],
          node = task.parts[id];
        if (raw === 0) continue; // Neutral is neither legacy reserve choice.
        if (
          ![-1, 1].includes(raw) ||
          Math.abs(node.rotation.y - raw * 0.65) >= 0.01
        )
          throw new Error("備水導口的實際角度與檔位不符；請重新轉動導口。");
        value = raw === -1 ? 0 : 1;
      } else {
        value = values[id];
        if (!Number.isInteger(value) || value !== task.values[id])
          throw new Error("實體閥輪與刻度不符；請重新操作。");
      }
      this.dispatch("valve-operated", {
        valveId: id,
        value,
        playerPosition: point(this.player.position),
      });
    }
  }
  beforeChoice(task, choice) {
    if (!this.atTask(task)) {
      this.field.renderPanel("請靠近工作台再提交，配水與備水尚未結算。");
      return false;
    }
    if (!choice.success) return true;
    if (task === this.bypass && !this.status.pressureVerified) {
      this.toast("先實際讀取壓力針，確認旁通已卸壓。");
      return false;
    }
    if (
      task === this.allocation &&
      (!this.status.pressureVerified ||
        Object.keys(this.flow.evidence).some((id) => !this.status.evidence[id]))
    ) {
      this.toast("先確認旁通壓力並讀取三份證據，再提交三輪校正。");
      return false;
    }
    if (task === this.reserve && !this.status.localChoices.routing) {
      this.toast("先選定今日水路，前往該岸的同一桶備水。");
      return false;
    }
    return true;
  }
  acceptFieldChoice(task) {
    const choiceId = this.field.state.choices[task.id];
    if (!this.field.done(task) || !choiceId) return;
    if (
      task === this.allocation &&
      choiceId === "two-two-one" &&
      !this.status.calibrated
    ) {
      this.syncTask(task);
      this.dispatch("distribution-calibrated", {
        playerPosition: point(this.player.position),
      });
    }
    if (task === this.reserve && !this.status.reserve) {
      this.syncTask(task);
      this.dispatch("reserve-committed", {
        choiceId,
        playerPosition: point(this.player.position),
      });
    }
    if (this.field.active) this.field.renderPanel();
  }
  beforeCargo() {
    return undefined;
  }
  route() {
    return undefined;
  }
  available(task) {
    return task !== this.reserve || Boolean(this.status.localChoices.routing);
  }
  interactionRadius(task) {
    return this.flow.tasks[task.id]?.radius;
  }
  atTask(task) {
    return near(this.player, task.position, this.interactionRadius(task));
  }
  openDistribution() {
    this.requireAt(this.allocation);
    // A completed field task is excluded by FieldSystem.open/getNearby. This local
    // continuation reuses its live camera and panel without reopening field rewards.
    this.field.active = this.allocation;
    this.field.focus(
      this.allocation,
      this.status.localChoices.routing
        ? this.props.group.getObjectByName("water-distribution-board")
        : undefined,
      this.status.localChoices.routing ? 0.55 : undefined,
    );
    this.field.renderPanel();
  }
  controls(task) {
    if (task === this.bypass && !this.complete)
      return `<h3>現場壓力</h3><p>${this.status.pressureVerified ? "已讀取安全刻記；若再轉輪，需重測。" : "轉動實體旁通輪後，讀取眼前壓力針。"}</p>${button("pressure", "讀取壓力針")}`;
    if (task !== this.allocation) return "";
    if (!this.status.calibrated)
      return "<p>接受三輪校正後，這裡會開放今日水路與公開供水保證。</p>";
    if (!this.status.localChoices.routing)
      return `<h3>今日供水與通路</h3><p>三輪校正效果會先結清。選定後仍須真扳導流柄並讀取四根柱；水權不在此決定。</p><div class="actions">${Object.entries(
        this.flow.decision.choices,
      )
        .map(([id, choice]) =>
          button("routing", choice.title, `data-choice="${id}"`),
        )
        .join(
          "",
        )}</div><p>民用加量：診所2、住區2、礦場1，走東橋；保留旁通：2、1、1另留旁通1，驗流後可過西淺灘。</p>`;
    const readings = this.props.readMeterValues();
    return `<h3>${esc(this.flow.decision.choices[this.status.localChoices.routing].title)}</h3><p>現場柱讀值：${readings ? `診所 ${readings.clinic}、住區 ${readings.settlement}、礦場 ${readings.mine}、旁通 ${readings.bypass}` : "刻度或柱身無法讀取，請檢查實體控制"}。${this.status.flowValid ? "驗流有效。" : "尚待驗流，五格水留在入口槽。"}</p><div class="actions">${button("diverter", "扳向住區全收（0）", 'data-value="0"', this.complete)}${button("diverter", "扳向維修旁通（1）", 'data-value="1"', this.complete)}${button("measure", "讀取四柱並驗流", "", this.complete)}${button("guarantee", "公開三處最低供水保證", "", this.status.guaranteePublished)}</div><p>校正輪仍可調整；調錯不耗水，但須重新驗流。</p><div class="actions">${["clinic", "homes", "mine"].map((id) => `${button("wheel", `${{ clinic: "診所", homes: "住區", mine: "礦場" }[id]} −`, `data-valve="${id}" data-delta="-1"`, this.complete)}${button("wheel", `${{ clinic: "診所", homes: "住區", mine: "礦場" }[id]} ＋`, `data-valve="${id}" data-delta="1"`, this.complete)}`).join("")}</div>`;
  }
  requireAt(task) {
    if (!near(this.player, task.position, this.flow.tasks[task.id].radius))
      throw new Error("角色必須親自站在工作台旁。");
  }
  readLiveSnapshot() {
    const valveValues = this.props.readValveValues(),
      meterValues = this.props.readMeterValues();
    if (
      !meterValues ||
      Object.values(valveValues).some((value) => !Number.isInteger(value))
    )
      throw new Error(
        "流量柱或閥位無法讀取；請回工作台檢查，不可用預期配額代替量測。",
      );
    for (const id of ["bypass-wheel", "clinic", "homes", "mine"]) {
      const task = id === "bypass-wheel" ? this.bypass : this.allocation;
      if (task.values[id] !== valveValues[id])
        throw new Error("模型閥位與實際操作紀錄不同；請重新操作並驗流。");
    }
    return { valveValues, meterValues };
  }
  pressure() {
    this.requireAt(this.bypass);
    this.syncTask(this.bypass);
    const angle = this.bypass.parts["pressure-needle"].rotation.z;
    const safe = this.props.readValveValues()["bypass-wheel"] === 1;
    if (Math.abs(angle - (safe ? 0 : 1.1)) >= 0.01)
      throw new Error("眼前壓力針與旁通輪狀態不符；請重新轉動實體輪。");
    this.dispatch("pressure-tested", {
      playerPosition: point(this.player.position),
    });
  }
  handle(action, dataset = {}) {
    if (!String(action).startsWith("water-")) return false;
    try {
      if (action === "water-close") {
        if (this.field.active) this.field.close();
        else this.callbacks.close?.();
        return true;
      }
      if (action === "water-confirm") {
        this.confirmHandoff();
        return true;
      }
      if (action === "water-pressure") this.pressure();
      else if (action === "water-routing") {
        this.requireAt(this.allocation);
        if (!this.status.calibrated) throw new Error("請先真正完成三輪校正。");
        if (!Object.hasOwn(this.flow.decision.choices, dataset.choice))
          throw new Error("未知供水方案。");
        // close() delivers legacy pendingEffects synchronously after its close callback.
        // Only after it RETURNS may local diversion supersede old calibration visuals.
        this.field.close();
        if (this.field.pendingEffects.length)
          throw new Error("校正效果尚未結清，請返回現場後再選水路。");
        this.dispatch("local-choice-committed", {
          decisionId: this.flow.decision.id,
          choiceId: dataset.choice,
        });
        this.openDistribution();
      } else if (
        [
          "water-diverter",
          "water-wheel",
          "water-measure",
          "water-guarantee",
        ].includes(action)
      ) {
        this.requireAt(this.allocation);
        if (!this.status.localChoices.routing)
          throw new Error("先選定今日供水方案。");
        if (this.complete && action !== "water-guarantee")
          throw new Error("供水已簽收，閥位封存。");
        if (action === "water-diverter") {
          const value = Number(dataset.value);
          if (![0, 1].includes(value))
            throw new Error("導流柄只有兩個實體止擋。");
          const actual = this.props.setLeverDetent(value);
          this.diverterTouched = true;
          this.dispatch("valve-operated", {
            valveId: "maintenance-diverter",
            value: actual,
            playerPosition: point(this.player.position),
          });
        } else if (action === "water-wheel")
          this.adjustCompletedWheel(dataset.valve, Number(dataset.delta));
        else if (action === "water-measure")
          this.dispatch("flow-measured", {
            playerPosition: point(this.player.position),
            ...this.readLiveSnapshot(),
          });
        else
          this.dispatch("minimum-guarantee-published", {
            guaranteeId: this.flow.guarantee.id,
            playerPosition: point(this.player.position),
          });
      } else return false;
      if (this.field.active) this.field.renderPanel();
    } catch (error) {
      this.toast(error.message);
    }
    return true;
  }
  adjustCompletedWheel(id, delta) {
    if (!["clinic", "homes", "mine"].includes(id) || ![-1, 1].includes(delta))
      throw new Error("未知配水輪操作。");
    const task = this.allocation,
      value = Math.max(0, Math.min(3, task.values[id] + delta));
    // Do not call FieldSystem.adjust after its task completed: its unrecord() would
    // destroy the legitimate earlier two-two-one calibration in saved field history.
    task.values[id] = value;
    task.touched.add(id);
    task.parts[id].rotation.z = (value * Math.PI) / 2;
    const column = task.parts[`flow-${id}`];
    column.scale.y = 0.25 + value;
    column.position.y =
      0.2 + (column.geometry.parameters.height * column.scale.y) / 2;
    this.syncTask(task);
    this.props.refreshMeters();
  }
  nearest() {
    const candidates = [];
    if (
      this.status.calibrated &&
      near(
        this.player,
        this.allocation.position,
        this.flow.tasks["water-allocation"].radius,
      )
    )
      candidates.push({
        type: "mission",
        kind: "distribution",
        title: "今日供水／驗流／最低保證",
        position: [...this.allocation.position],
        radius: this.flow.tasks["water-allocation"].radius,
        distance: gap(this.player.position, vector(this.allocation.position)),
      });
    if (this.status.recipientId && this.props.witness.object.visible) {
      const recipient = this.flow.recipients[this.status.recipientId];
      const position = point(this.props.witness.position),
        distance = gap(this.player.position, this.props.witness.position);
      if (distance <= recipient.radius)
        candidates.push({
          type: "mission",
          kind: "handoff",
          title: this.complete ? "出示供水回條／確認通行" : recipient.title,
          position,
          radius: recipient.radius,
          distance,
        });
    }
    return candidates.sort((a, b) => a.distance - b.distance)[0] || null;
  }
  interact(nearby) {
    if (!nearby || nearby.type !== "mission") return;
    if (nearby.kind === "distribution") {
      if (this.nearest()?.kind === "distribution") this.openDistribution();
      return;
    }
    if (nearby.kind !== "handoff") return;
    if (this.nearest()?.kind !== "handoff") {
      this.toast("請親自走到伊妮絲簽收台旁。");
      return;
    }
    const selected =
      this.flow.decision.choices[this.status.localChoices.routing];
    this.callbacks.panel?.(
      `<p class="eyebrow">WATER HANDOFF</p><h2>具名供水回條</h2><p>今日安排：診所 ${selected.allocation.clinic}、住區 ${selected.allocation.settlement}、礦場 ${selected.allocation.mine}、維修旁通 ${selected.allocation.bypass}。這是待核對的安排；簽收會重新讀取當下閥位與流量柱。</p><p>${this.complete ? "供水已簽收。確認停火協議或清場後，由南側撤離。" : "先完成驗流與同一桶備水安排，再由伊妮絲實際簽收。"}</p><div class="actions">${button("confirm", this.complete ? "確認通行並帶回條撤離" : "核對現場供水並簽收")}${button("close", "返回現場")}</div>`,
    );
  }
  confirmHandoff() {
    if (this.nearest()?.kind !== "handoff") {
      this.toast("需親自回到選定接收者旁簽收。");
      return;
    }
    if (!this.field.complete || this.field.pendingEffects.length) {
      this.toast("先完成三項工作並返回現場，讓備水效果結清。");
      return;
    }
    this.dispatch("supply-received", {
      recipientId: this.status.recipientId,
      playerPosition: point(this.player.position),
      recipientPosition: point(this.props.witness.position),
      ...this.readLiveSnapshot(),
    });
    const kills = this.callbacks.kills?.() ?? this.status.defeatedActors.length;
    if (kills !== this.status.defeatedActors.length)
      throw new Error("守軍傷亡與現場紀錄不同，尚不可結算。");
    if (kills) {
      if (
        this.enemies.some((enemy) => enemy.hp > 0) ||
        this.status.defeatedActors.length !==
          Object.keys(this.flow.actors).length
      ) {
        this.toast("仍有守軍在場；清場後回簽收台確認。");
        return;
      }
      this.callbacks.secure?.("combat");
    } else if (
      !this.status.guaranteePublished ||
      (this.callbacks.clueCount?.() ?? 3) !== 3
    ) {
      this.toast("停火通行需要三份調查證據與在配水牌公開的最低供水保證。");
    } else this.callbacks.secure?.("nonlethal");
  }
  defeated(id) {
    const enemy = this.enemies.find((entry) => entry.id === id);
    if (!enemy || enemy.hp > 0)
      throw new Error(
        "Only an actually defeated existing water guard can be recorded",
      );
    this.dispatch("actor-defeated", { actorId: id });
  }
  controlEnemy(enemy, dt) {
    const order = this.orders.get(enemy.id);
    if (
      !order ||
      order.order === "guard" ||
      enemy.hp <= 0 ||
      this.callbacks.secured?.()
    )
      return false;
    if (enemy.engaged || enemy.suppressed > 0) return false;
    const recipient = this.flow.recipients[order.targetId];
    const target =
      order.order === "investigate" && recipient
        ? vector(recipient.position)
        : vector(this.flow.actors[enemy.id].position);
    if (
      order.order === "investigate" &&
      gap(enemy.actor.position, this.player.position) < 10
    ) {
      enemy.alert = 5;
      return false;
    }
    enemy.state =
      order.order === "investigate"
        ? "inspect-water"
        : order.order === "hold"
          ? "awaiting-dispatch"
          : "standby";
    this.moveOrderedEnemy(enemy, target, 1.6, dt);
    enemy.windup = 0;
    return true;
  }
  moveOrderedEnemy(enemy, target, speed, dt) {
    if (enemy.hp <= 0) return;
    const actor = enemy.actor,
      from = actor.position,
      colliders = this.world.colliders;
    const geometry = tacticalGeometryKey(colliders, 0.38, 23);
    let cache = enemy.waterPath;
    if (
      !cache ||
      cache.geometry !== geometry ||
      gap(cache.goal, target) > 0.5
    ) {
      const options = {
        from,
        to: target,
        colliders,
        radius: 0.38,
        bounds: 23,
        maxDistance: 64,
      };
      const proof = certifyTacticalPath(
        planTacticalPath(options),
        options,
        moveCircle,
      );
      cache = enemy.waterPath = {
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
      if (waypoint) enemy.waterPath = null;
      this.world.animate(actor, "idle");
      return;
    }
    const dx = waypoint.x - from.x,
      dz = waypoint.z - from.z,
      length = Math.hypot(dx, dz);
    const amount = Math.min(length, Math.max(0, speed * dt));
    const steps = Math.max(1, Math.ceil(amount / 0.1));
    for (let i = 0; i < steps; i++) {
      const moved = moveCircle(
        from,
        ((dx / length) * amount) / steps,
        ((dz / length) * amount) / steps,
        colliders,
        0.38,
      );
      from.x = moved.x;
      from.z = moved.z;
    }
    actor.object.rotation.y = Math.atan2(dx, dz);
    this.world.animate(actor, "walk");
  }
  update() {
    if (this.disposed) return;
    this.props.updateClosure(this.occupants());
    if (this.pendingResponse && this.status.response.status === "warned") {
      if (!this.status.response.presented) {
        this.toast(this.responseWarning);
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
    if (!this.status.pressureVerified)
      return "調查裂管、操作原旁通輪，再實際讀取壓力針。";
    if (!this.status.calibrated)
      return "找齊三份證據，在原配水台完成二、二、一校正。";
    if (!this.status.localChoices.routing)
      return "在配水台選擇今日供水與可用河岸。";
    if (!this.status.flowValid)
      return "真扳導流柄並讀取四根流量柱；五格水尚留在入口。";
    if (!this.status.reserve)
      return "前往所選岸邊的同一桶備水，決定保留治療或送公用槽。";
    if (!this.complete)
      return `沿${this.flow.routes[this.status.routeId].title}到伊妮絲簽收台；非致命通行還需公開最低供水保證。`;
    return "在伊妮絲旁確認停火通行或清場，再攜具名供水回條向南撤離。";
  }
  labels() {
    const result = [];
    const add = (p, text) =>
      result.push({ position: { x: p[0], y: 1.9, z: p[1] }, text });
    add([12, 0], "東橋 · 始終可通行");
    add(
      [-13, 0],
      this.props.routeState.open
        ? "西淺灘 · 低水可通行"
        : "西淺灘 · 深水；保留旁通並驗流後開啟",
    );
    if (this.status.localChoices.routing) {
      const choice =
        this.flow.decision.choices[this.status.localChoices.routing];
      if (!this.status.reserve)
        add(
          this.flow.reserve.stations[choice.reserveStationId].position,
          "◇ 同一桶維修備水",
        );
      add(
        point(this.props.witness.position),
        this.complete ? "◇ 供水回條／通行確認" : "◇ 伊妮絲供水簽收台",
      );
      if (!this.status.guaranteePublished)
        add(this.flow.guarantee.position, "◇ 公開最低供水保證");
    }
    if (this.props.routeState.pendingClose)
      add(
        this.flow.routes["west-ford"].gatePosition,
        "水路待關閉 · 先離開淺灘",
      );
    return result;
  }
  diagnostics() {
    return {
      kind: "water",
      version: this.flow.version,
      missionId: this.id,
      witness: {
        id: this.props.selectedRecipient,
        visible: this.props.witness.object.visible,
        position: point(this.props.witness.position),
      },
      valveValues: this.props.readValveValues(),
      meterValues: this.props.readMeterValues(),
      pressureNeedleAngle: this.bypass.parts["pressure-needle"].rotation.z,
      reserve: {
        position: point(this.reserve.object.position),
        visible: this.reserve.object.visible,
        spoutValue: this.reserve.values["reserve-spout"],
        spoutAngle: this.reserve.parts["reserve-spout"].rotation.y,
      },
      route: this.props.routeState,
      distributionValidated: this.props.distributionValidated,
      pendingFieldEffects: this.field.pendingEffects.length,
      orders: Object.fromEntries(
        [...this.orders].map(([id, order]) => [id, { ...order }]),
      ),
    };
  }
  dispose() {
    if (this.disposed) return;
    this.disposed = true;
    this.pendingResponse = false;
    for (const { node, visible } of [
      ...this.calibrationColumns,
      ...this.calibrationLabels,
    ])
      node.visible = visible;
    this.props.dispose();
    this.appliedEffects.clear();
    this.orders.clear();
    for (const enemy of this.enemies) delete enemy.waterPath;
    const original = this.reserveOriginal;
    this.reserve.position = [...original.position];
    this.reserve.object.position.copy(original.object);
    this.reserve.marker.position.copy(original.marker);
    this.reserve.object.visible = original.visible;
    this.reserve.marker.visible = original.markerVisible;
    this.moveReserveCollider(original.position);
    if (
      original.colliderPresent &&
      this.reserve.object.parent &&
      !this.world.colliders.includes(this.reserve.collider)
    )
      this.world.colliders.push(this.reserve.collider);
    if (this.reserve.object.parent)
      for (const node of this.reserveSolids)
        if (!this.world.solids.includes(node)) this.world.solids.push(node);
  }
}
