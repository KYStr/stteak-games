import * as THREE from "./vendor/three.module.js";
import {
  MISSION_FLOW,
  createMissionProgress,
  recordMissionEvent,
  canonicalMissionProgress,
} from "./mission-flow.js";
import { createMissionProps } from "./mission-props.js";
import { moveCircle } from "./physics.js";
import { createDepartureGuidance } from "./departure-guidance.js";
import {
  planTacticalPath,
  certifyTacticalPath,
  tacticalSegmentClear,
  tacticalGeometryKey,
  enemyWeaponRange,
} from "./enemy-tactics.js";

const point = (p) => [p.x, p.z];
const vector = (p) => new THREE.Vector3(p[0], 0, p[1]);
const gap = (a, b) => Math.hypot(a.x - b.x, a.z - b.z);
const guardTitle = (id) =>
  ({
    "mail-1": "哨兵隊長",
    "mail-2": "側翼守軍",
    "mail-3": "北側查驗守軍",
    "mail-4": "霰彈守軍",
  })[id] || "守軍";
const esc = (value) =>
  String(value ?? "").replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ],
  );
const button = (action, title, data = "", disabled = false) =>
  `<button data-action="mission-${action}" ${data} ${disabled ? "disabled" : ""}>${esc(title)}</button>`;

export function missionPlacementPoints(id) {
  const flow = MISSION_FLOW[id];
  if (!flow) return [];
  return [
    flow.objective.position,
    flow.communication.position,
    flow.worker.position,
    flow.worker.safePosition,
    ...Object.values(flow.routes).flatMap((route) => [
      route.gatePosition,
      ...route.path,
    ]),
    ...Object.values(flow.recipients).map((receiver) => receiver.position),
    ...Object.values(flow.evidence)
      .filter((source) => source.hook.anchor)
      .map((source) => source.hook.anchor),
  ];
}

/** Real scene controller. Saves only validated events; every position comes from live objects. */
export class MissionSystem {
  constructor(world, id, field, player, enemies, callbacks) {
    this.world = world;
    this.id = id;
    this.flow = MISSION_FLOW[id];
    if (!this.flow) throw new Error(`No mission flow for ${id}`);
    this.field = field;
    this.player = player;
    this.enemies = enemies;
    this.callbacks = callbacks;
    this.progress = createMissionProgress(id);
    this.status = canonicalMissionProgress(id, this.progress, {
      requireComplete: false,
    });
    this.serial = 0;
    this.appliedEffects = new Set();
    this.orders = new Map(
      Object.entries(this.flow.actors).map(([actorId, actor]) => [
        actorId,
        { order: actor.initialOrder, index: 0 },
      ]),
    );
    this.props = createMissionProps(THREE, world, this.flow);
    this.departureGuidance = createDepartureGuidance({ moveCircle });
    this.seal = field.tasks.find((task) => task.id === "mail-seal");
    this.unload = field.tasks.find((task) => task.id === "mail-unload");
    this.seal.title = "核驗藥品與收貨授權";
    this.seal.description =
      "轉動同一箱藥，讀取背面記錄；比對運單與旁邊的當月收貨牌，再確認交付依據。";
    this.seal.hints = [
      "運單說明送出什麼；收貨牌說明誰有權接收；箱身與內封證明眼前實物。三者必須相符。",
      "稅費收據只能證明運輸繳費，不能代替收貨授權。",
    ];
    this.seal.physicalSteps = structuredClone(this.seal.physicalSteps);
    this.seal.physicalSteps.find((step) => step.id === "inspect-seal").title =
      "讀取藥箱背面與原始內封";
    this.seal.choices = this.seal.choices.map((choice) => ({
      ...choice,
      label:
        choice.id === "three-notches" ? "完成核證，解除運輸鎖" : choice.label,
    }));
    this.unload.physicalSteps = structuredClone(this.unload.physicalSteps);
    this.unload.choices = this.unload.choices.map((choice) => ({
      ...choice,
      label:
        choice.id === "secure-pallet"
          ? "確認藥品已交付並收妥回條"
          : choice.label,
      message:
        choice.id === "secure-pallet"
          ? "接收者已收妥兩份藥。返回現場，在接收者旁出示回條，確認停火通行或清場，再向南撤離。"
          : choice.message,
    }));
    this.unload.title = "交付同一箱藥品";
    this.unload.description =
      "先決定兩份藥的接收安排，再沿所開啟的庭院入口運送。人與貨物都要進入接收圈。";
    const turnout = field.tasks.find((task) => task.id === "mail-switch");
    turnout.choices = turnout.choices.map((choice) => ({
      ...choice,
      ...(choice.id === "siding"
        ? {
            label: "走西側貨棚線，利用外牆掩護",
            tradeoff: "沿西側繞過守軍視線，再從所選接收門入院。",
          }
        : {}),
      ...(choice.id === "direct"
        ? {
            label: "走中央直線，從月台切入庭院",
            tradeoff: "中央通道較暴露；開門會提高警戒。",
          }
        : {}),
    }));
    for (const routeId of Object.keys(this.flow.routes))
      this.props.setRouteState(routeId, false);
  }
  get complete() {
    return this.status.complete;
  }
  dispatch(type, payload = {}) {
    const result = recordMissionEvent(this.id, this.progress, {
      id: `event-${++this.serial}`,
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
  apply(effect) {
    switch (effect.type) {
      case "showEvidenceRecord":
        break;
      case "setSealVerification":
        this.callbacks.toast(effect.message);
        break;
      case "recoverableMistake":
        this.callbacks.effect(effect);
        break;
      case "setRouteState":
        this.props.setRouteState(effect.routeId, effect.open);
        if (effect.message) this.callbacks.toast(effect.message);
        break;
      case "setAllocationPreview":
        this.props.setAllocation(effect.allocation, { delivered: false });
        this.setRecipient(effect.recipientId);
        this.callbacks.toast(effect.message);
        break;
      case "setAllocationProposal":
        this.props.setAllocation(effect.allocation, { delivered: false });
        this.callbacks.toast(effect.message);
        break;
      case "setCommunicationState":
        this.props.setCommunication(effect.connected);
        this.callbacks.toast(effect.message);
        break;
      case "setActorOrder":
        for (const id of effect.actorIds) {
          if (id === this.flow.worker.id) continue;
          const enemy = this.enemies.find((enemy) => enemy.id === id);
          if (enemy?.hp > 0) {
            this.orders.set(id, {
              order: effect.order,
              index: 0,
              // A promise stops the living guard at their actual position.
              // Returning to an authored post would cross the player's lane.
              holdPosition:
                effect.order === "hold" ? enemy.actor.position.clone() : null,
            });
            enemy.windup = 0;
            enemy.alert = 0;
            if (["hold", "standby"].includes(effect.order))
              enemy.engaged = false;
          }
        }
        break;
      case "announceResponse":
        this.pendingResponse = true;
        this.warningPresented = false;
        this.responseWarning = effect.text;
        break;
      case "setResponseState":
        if (
          effect.status === "warned" &&
          effect.reason === "communication-restored"
        ) {
          this.pendingResponse = true;
          // The original warning may have been cut before its first playing
          // frame. Preserve whether it was actually presented, not just queued.
          this.warningPresented = Boolean(this.warningPresented);
        } else if (effect.status !== "active") this.pendingResponse = false;
        break;
      case "setObjectiveCarrier":
        break; // FieldSystem transfers this exact scene object after the accepted event.
      case "transferMedicine":
        this.props.setAllocation(effect.allocation, { delivered: true });
        break;
      case "issueReceipt":
        this.callbacks.toast(
          "已收到具名藥品回條。完成接收確認，再決定停火或清場，最後返回南側。 ",
        );
        break;
      case "beginEscort":
        this.callbacks.toast(
          "搬運工開始跟隨；保持六公尺內，帶他到西側安全圈。他會打開貨棚捷徑。",
        );
        break;
      case "setWorkerCommand":
        this.workerThreat = null;
        this.workerShelter = null;
        this.workerShelterKey = null;
        this.workerGuide = null;
        this.workerMover = null;
        this.props.worker.fieldPath = null;
        this.callbacks.toast(
          effect.command === "follow"
            ? "搬運工跟上。前方若被守軍射線覆蓋，他會停在遮蔽物後並指出威脅；清除或繞路即可續行。"
            : "搬運工原位停等；靠近後可再命令跟隨。",
        );
        break;
      default:
        throw new Error(`Unimplemented mission effect: ${effect.type}`);
    }
  }
  setRecipient(id) {
    const receiver = this.flow.recipients[id],
      task = this.unload;
    const drop = task.physicalSteps.find(
      (step) => step.kind === "carry-drop-zone",
    );
    drop.position = [...receiver.position];
    drop.radius = receiver.radius;
    task.pallet.position.set(receiver.position[0], 0.045, receiver.position[1]);
    task.position = [...receiver.position];
    task.marker.position.set(receiver.position[0], 0.055, receiver.position[1]);
    task.object.position.set(receiver.position[0], 0, receiver.position[1]);
    task.dropMarker?.position.set(
      receiver.position[0],
      0.055,
      receiver.position[1],
    );
    task.description = `${receiver.title}：${receiver.display} 人與箱子都進入光圈，選「放入接收區並交付」。暫放地上不算交付；靠近箱子按 E 可重新開啟交付面板。`;
  }
  observeClue(id) {
    const source = this.flow.evidence[id];
    if (!source || source.hook.kind !== "clue-read") return "";
    this.dispatch("evidence-observed", {
      sourceId: id,
      recordId: source.recordId,
    });
    return source.text;
  }
  recordStep(task, step) {
    if (task.id === "mail-seal" && step.id === "inspect-seal") {
      const source = this.flow.evidence["consignment-backplate"];
      this.dispatch("evidence-observed", {
        sourceId: "consignment-backplate",
        recordId: source.recordId,
      });
      return source.text;
    }
    return "";
  }
  beforeChoice(task, choice) {
    if (
      task.id === "mail-seal" &&
      choice.id === "three-notches" &&
      !this.status.verified
    ) {
      this.field.renderPanel(
        "先讀取三份資料，選擇核證依據；完成後才能解除運輸鎖。",
      );
      return false;
    }
    if (task.id === "mail-unload" && !this.status.complete) {
      this.field.renderPanel(
        "尚未取得接收回條；必須讓人與同一箱藥到達所選接收區，親手交付。",
      );
      return false;
    }
    return true;
  }
  beforeCargo(task, action) {
    if (task.id !== "mail-unload") return true;
    const cargo = task.cargo.getWorldPosition(new THREE.Vector3());
    const payload = {
      entityId: this.flow.objective.id,
      playerPosition: point(this.player.position),
      cargoPosition: point(cargo),
    };
    if (
      action !== "deliver" &&
      gap(this.player.position, cargo) > this.flow.objective.pickupRadius
    ) {
      this.field.notify("請先走近藥箱提把；搬運與放下都需要在手邊完成。");
      return false;
    }
    if (action === "pickup" && !this.status.localChoices.handoff) {
      this.field.renderPanel(
        "分藥仍是提案；先向現場哨兵出示核證記錄，或清場後在同一藥箱旁接管，對應庭院門才會開啟。",
      );
      return false;
    }
    if (action === "deliver") {
      const selected =
        this.flow.decision.choices[this.status.localChoices.handoff];
      if (!selected) return false;
      this.dispatch("cargo-delivered", {
        ...payload,
        recipientId: selected.recipientId,
      });
    } else
      this.dispatch(
        action === "pickup" ? "cargo-picked-up" : "cargo-dropped",
        payload,
      );
    return true;
  }
  route(task, step, original) {
    if (task.id !== "mail-unload" || step.kind !== "carry-route")
      return original;
    const selected =
      this.flow.decision.choices[this.status.localChoices.handoff];
    if (!selected) return [];
    const gate = this.flow.routes[selected.routeId].gatePosition;
    // Each route leads continuously from the same crate to the chosen real gate.
    // Do not retain obsolete waypoints behind the new courtyard, which would add a pointless return lap.
    const siding = this.field.state.choices["mail-switch"] === "siding";
    const approach = siding
      ? [
          [-17, 8],
          [-17, 2],
        ]
      : [
          [-7, 8],
          [-7, 2],
        ];
    return [
      ...approach,
      [gate[0], gate[1] + 2],
      [gate[0], gate[1] - 1.2],
      [...this.flow.recipients[selected.recipientId].position],
    ];
  }
  controls(task) {
    if (task.id === "mail-switch")
      return `<section class="field-step"><b>旁側哨兵通訊</b>${this.communicationControls()}</section>`;
    if (!["mail-seal", "mail-unload"].includes(task.id)) return "";
    const evidence = Object.entries(this.flow.evidence)
      .map(
        ([id, source]) =>
          `<p>${this.status.evidence[id] ? "✓" : "○"} ${esc(source.title)}${this.status.evidence[id] ? `<small>${esc(source.text)}</small>` : ""}</p>`,
      )
      .join("");
    const inspect =
      task.id === "mail-seal"
        ? `<div class="field-toolbar">${button("observe", "查看旁邊的當月收貨牌", 'data-source="clinic-receiving-board"')}${button("observe", "讀取箱面稅費印記", 'data-source="expired-tax-stamp"')}</div>`
        : "";
    const verify = this.status.verified
      ? "<p>✓ 貨物與收貨授權已核證。</p>"
      : `<p>以哪一組資料作為交付依據？</p><div class="field-options">${Object.entries(
          this.flow.verification.reasons,
        )
          .map(([id, reason]) =>
            button(
              "verify",
              reason.label,
              `data-reason="${id}"`,
              this.status.missingEvidence.length > 0,
            ),
          )
          .join("")}</div>`;
    const choice = this.status.localChoices.handoff;
    const choices = choice
      ? `<p>已承諾：${esc(this.flow.decision.choices[choice].label)}。${esc(this.flow.recipients[this.flow.decision.choices[choice].recipientId].display)}</p>`
      : `<p>${this.status.proposedHandoff ? `目前提案：${esc(this.flow.decision.choices[this.status.proposedHandoff].label)}。須到哨兵現位交涉才會接受與開門；接受前可修改。` : "兩份藥的接收提案（尚未獲哨兵接受）："}</p><div class="field-options">${Object.entries(
          this.flow.decision.choices,
        )
          .map(
            ([id, option]) =>
              `<div>${button("allocate", option.label, `data-choice="${id}"`, !this.status.verified)}<small>${esc(option.message)}</small></div>`,
          )
          .join("")}</div>`;
    return `<section class="field-step"><b>交付記錄</b><details><summary>比對已讀資料 ${Object.keys(this.status.evidence).length}/4</summary>${evidence}</details>${inspect}${verify}${choices}${this.status.receipt ? `<p>✓ ${esc(this.status.receipt.title)}：診所 ${this.status.allocation.clinic} 份／守軍醫護 ${this.status.allocation.guard} 份。</p>` : ""}</section>`;
  }
  handle(action, dataset) {
    if (!action.startsWith("mission-")) return false;
    if (action === "mission-confirm") {
      this.confirmHandoff();
      return true;
    }
    if (action === "mission-close") {
      this.callbacks.close();
      return true;
    }
    if (["mission-accept", "mission-reclaim"].includes(action)) {
      this.acceptHandoff(action === "mission-reclaim");
      return true;
    }
    if (
      ["mission-disconnect", "mission-restore", "mission-relay"].includes(
        action,
      )
    ) {
      this.operateCommunication(action.slice(8));
      return true;
    }
    if (["mission-worker-follow", "mission-worker-wait"].includes(action)) {
      this.commandWorker(
        action === "mission-worker-follow" ? "follow" : "wait",
      );
      return true;
    }
    const task = this.field.active;
    if (!task) return true;
    if (action === "mission-observe") {
      const source = this.flow.evidence[dataset.source];
      if (!source) return true;
      if (dataset.source === "clinic-receiving-board") {
        const anchor = this.props.anchors.receivingBoard;
        if (gap(this.player.position, anchor) > 2.6) {
          this.field.renderPanel(
            "收貨牌在箱子西側；返回現場，走近收貨牌再讀取。",
          );
          return true;
        }
        this.field.focus(
          task,
          this.props.group.getObjectByName("receiving-board") ||
            this.seal.object,
        );
      } else if (dataset.source === "expired-tax-stamp") {
        if (this.seal.values.case !== 0) {
          this.field.renderPanel("稅印貼在箱子正面；先把箱子轉回第零檔。");
          return true;
        }
      } else return true;
      this.dispatch("evidence-observed", {
        sourceId: dataset.source,
        recordId: source.recordId,
      });
      this.field.renderPanel(source.text);
    } else if (action === "mission-verify") {
      const result = this.dispatch("seal-verification-attempted", {
        reasonId: dataset.reason,
      });
      this.field.renderPanel(
        result.effects.find((effect) => effect.message)?.message ||
          "這項核證結果已記錄。",
      );
    } else if (action === "mission-allocate") {
      this.dispatch("allocation-proposed", {
        decisionId: "handoff",
        choiceId: dataset.choice,
      });
      this.field.renderPanel(
        "分藥提案已記下；返回現場，向哨兵出示核證記錄。接受前可改提案，門尚未開。",
      );
    }
    return true;
  }
  nearest() {
    const p = this.player.position;
    const candidates = [];
    candidates.push({
      kind: "communication",
      title: this.status.communicationConnected
        ? "通訊接點：傳達／斷線"
        : "通訊已斷：可恢復接點",
      position: this.flow.communication.position,
      radius: this.flow.communication.interactionRadius,
    });
    if (this.status.workerStatus !== "safe")
      candidates.push({
        kind: "worker",
        title: "搬運工：跟隨／原位停等（可選）",
        position: point(this.props.worker.position),
        radius: this.flow.worker.interactionRadius,
      });
    if (
      this.status.verified &&
      this.status.proposedHandoff &&
      !this.status.handoffAccepted
    ) {
      const inspector = this.enemies.find(
        (enemy) => enemy.id === "mail-1" && enemy.hp > 0,
      );
      if (inspector)
        candidates.push({
          kind: "negotiation",
          title: "向哨兵出示核證記錄與分藥提案",
          position: point(inspector.actor.position),
          radius: 2.8,
        });
      else if (this.allGuardsDefeated())
        candidates.push({
          kind: "reclaim",
          title: "清場後接管同一箱藥的交付",
          position: point(
            this.unload.cargo.getWorldPosition(new THREE.Vector3()),
          ),
          radius: this.flow.objective.pickupRadius,
        });
    }
    if (this.complete && this.field.complete && !this.callbacks.secured()) {
      const receiver = this.flow.recipients[this.status.receipt.recipientId];
      candidates.push({
        kind: "handoff",
        title: "出示交付回條，協商撤離",
        position: receiver.position,
        radius: 2.4,
      });
    }
    return (
      candidates
        .map((entry) => ({
          ...entry,
          type: "mission",
          distance: gap(p, vector(entry.position)),
        }))
        .filter((entry) => entry.distance <= entry.radius)
        .sort((a, b) => a.distance - b.distance)[0] || null
    );
  }
  interact(near) {
    if (near.kind === "communication") this.communicationPanel();
    else if (near.kind === "worker") this.workerPanel();
    else if (["negotiation", "reclaim"].includes(near.kind))
      this.negotiationPanel();
    else if (near.kind === "handoff") this.handoffPanel();
  }
  handoffPanel(message = "") {
    this.callbacks.panel(
      `<p class="eyebrow">MEDICINE HANDOFF</p><h2>回條上的兩份藥</h2>${message ? `<p role="status">${esc(message)}</p>` : ""}<p>診所收到 ${this.status.allocation.clinic} 份，守軍醫護收到 ${this.status.allocation.guard} 份。${this.status.receipt ? "眼前整箱已由接收者收妥。" : "實體交付尚未確認。"}</p><p>${this.callbacks.kills() ? "已有守軍倒下；清除仍在場的守軍後，才能帶回條撤離。" : "以現場已被接受的承諾、三份調查證據與接收者簽認的交付回條提出停火通行。"}</p><div class="actions">${button("confirm", this.callbacks.kills() ? "確認清場與撤離" : "提出停火通行協議")}${button("close", "返回現場")}</div>`,
    );
  }
  allGuardsDefeated() {
    return Object.keys(this.flow.actors).every((id) => {
      const enemy = this.enemies.find((entry) => entry.id === id);
      return enemy && enemy.hp <= 0 && this.status.actors[id]?.defeated;
    });
  }
  visiblePoint(target, radius) {
    if (gap(this.player.position, target) > radius) return false;
    const eye = this.player.position.clone();
    eye.y += 1.55;
    return !this.world.trace(eye, target);
  }
  negotiationSnapshot() {
    const enemy = this.enemies.find((entry) => entry.id === "mail-1");
    if (!enemy || enemy.hp <= 0) return null;
    const chest = enemy.actor.object.getWorldPosition(new THREE.Vector3());
    chest.y += 1.15;
    return {
      actorId: enemy.id,
      actorPosition: point(chest),
      playerPosition: point(this.player.position),
      visible: this.visiblePoint(chest, 2.8),
      alive: enemy.hp > 0,
      recordIds: this.flow.verification.requiredSources.map(
        (id) => this.status.evidence[id],
      ),
    };
  }
  negotiationPanel(message = "") {
    const choice = this.flow.decision.choices[this.status.proposedHandoff];
    const reclaimed = this.allGuardsDefeated();
    this.callbacks.panel(
      `<p class="eyebrow">MEDICINE TERMS</p><h2>${reclaimed ? "清場後接管交付" : "在哨兵面前出示核證"}</h2>${message ? `<p role="status">${esc(message)}</p>` : ""}<p>${choice ? esc(choice.label) : "先在藥箱旁核證並提出分藥安排。"}</p><p>運單、當月授權與同一藥箱背牌互證；兩份藥均須實際交付。${this.status.proposedHandoff === "mutual-aid" ? "接受後，到通訊接點傳達共同醫護承諾，其餘守軍才會停止干預。" : "診所收兩份。哨兵本人讓行，其餘守軍仍守各自通路。"}</p><div class="actions">${button(reclaimed ? "reclaim" : "accept", reclaimed ? "接管同一藥箱的交付" : "出示三份核證記錄，確認承諾", "", !choice || this.status.handoffAccepted)}${button("close", "返回現場")}</div>`,
    );
  }
  acceptHandoff(reclaimed = false) {
    if (this.status.handoffAccepted) return;
    if (!this.status.verified || !this.status.proposedHandoff) {
      this.negotiationPanel("尚未核證並提出分藥安排。");
      return;
    }
    const snapshot = this.negotiationSnapshot();
    if (reclaimed) {
      const cargo = this.unload.cargo.getWorldPosition(new THREE.Vector3());
      const eye = this.player.position.clone();
      eye.y += 1.55;
      const target = cargo.clone();
      target.y += 0.5;
      const hit = this.world.trace(eye, target);
      let visible = true;
      for (let node = this.unload.cargo; node; node = node.parent)
        visible &&= node.visible;
      if (
        !this.allGuardsDefeated() ||
        gap(this.player.position, cargo) > this.flow.objective.pickupRadius ||
        !visible ||
        (hit && hit.box !== this.seal.collider)
      ) {
        this.negotiationPanel(
          "接管需四名守軍已倒下，並親自站在同一藥箱旁；中間不能隔牆。",
        );
        return;
      }
      this.dispatch("handoff-reclaimed", {
        entityId: this.flow.objective.id,
        playerPosition: point(this.player.position),
        cargoPosition: point(cargo),
      });
    } else {
      if (!snapshot?.alive || !snapshot.visible) {
        this.negotiationPanel(
          "需走到仍在場哨兵的面前，保持 2.8 公尺內且中間沒有牆或掩體。",
        );
        return;
      }
      this.dispatch("handoff-accepted", { snapshot });
    }
    this.callbacks.close();
    this.callbacks.toast(
      this.status.localChoices.handoff === "mutual-aid" && !reclaimed
        ? "哨兵接受一人一份的醫護承諾；到原通訊接點傳達，才會通知其他守軍。"
        : "所選庭院門已開。仍需把同一箱藥送到接收者手中。",
    );
  }
  communicationControls() {
    const connected = this.props.readCommunicationSnapshot().connected;
    const canRelay =
      this.status.localChoices.handoff === "mutual-aid" &&
      !this.status.promiseRelayed &&
      this.status.handoffMethod !== "reclaimed";
    return `<p>${connected ? "線路接通：可傳達已被接受的共同醫護承諾；待命組也能接收查驗指令。" : "線路已斷：待命回應受抑制，醫護承諾也無法傳達。可在同一接點恢復。"}</p><div class="field-toolbar">${button(connected ? "disconnect" : "restore", connected ? "斷開實體接點" : "恢復同一接點")}${canRelay ? button("relay", "傳達已接受的共同醫護承諾", "", !connected) : ""}</div>${this.status.promiseRelayed ? "<p>✓ 本次承諾已傳達。重接線路不會再次叫出待命組。</p>" : ""}`;
  }
  communicationPanel(message = "") {
    if (this.field.active) {
      this.field.renderPanel(message);
      return;
    }
    this.callbacks.panel(
      `<p class="eyebrow">DISPATCH CONTACT</p><h2>同一條哨兵通訊線</h2>${message ? `<p role="status">${esc(message)}</p>` : ""}${this.communicationControls()}<div class="actions">${button("close", "返回現場")}</div>`,
    );
  }
  operateCommunication(action) {
    if (
      gap(this.player.position, vector(this.flow.communication.position)) >
        this.flow.communication.interactionRadius ||
      !this.visiblePoint(
        this.props.anchors.communication,
        this.flow.communication.interactionRadius,
      )
    ) {
      this.communicationPanel("請走近可見的道岔通訊接點；隔牆不能操作。");
      return;
    }
    if (
      action === "relay" &&
      (this.status.localChoices.handoff !== "mutual-aid" ||
        this.status.promiseRelayed ||
        this.status.handoffMethod === "reclaimed")
    ) {
      this.communicationPanel("須先由現場哨兵接受共同醫護提案，才能傳達。");
      return;
    }
    if (action !== "relay") this.props.setCommunication(action === "restore");
    const communicationSnapshot = this.props.readCommunicationSnapshot();
    if (action === "relay" && !communicationSnapshot.connected) {
      this.communicationPanel("線路仍斷開；先恢復同一接點。");
      return;
    }
    this.dispatch(
      action === "relay"
        ? "promise-relayed"
        : action === "restore"
          ? "communication-restored"
          : "communication-disconnected",
      {
        playerPosition: point(this.player.position),
        communicationSnapshot,
      },
    );
    this.communicationPanel(
      action === "relay"
        ? "共同醫護承諾已傳達，既有守軍停止干預。"
        : action === "restore"
          ? "同一接點已恢復；哨兵接續原來的查驗。"
          : "線路斷開；查驗回應受抑制，承諾也暫時無法傳達。",
    );
  }
  workerPanel(message = "") {
    this.callbacks.panel(
      `<p class="eyebrow">PORTER</p><h2>搬運工的下一段路</h2>${message ? `<p role="status">${esc(message)}</p>` : ""}<p>${this.workerThreat ? `前方受${guardTitle(this.workerThreat)}的射線覆蓋；可先解除威脅或換到掩體後方帶路。` : "跟隨時只走可達的連續路段；受射線覆蓋會找既有遮蔽物停靠。原位停等會持續到你再下跟隨命令。"}</p><div class="actions">${button("worker-follow", "跟上", "", this.status.workerStatus === "safe")}${button("worker-wait", "留在原位", "", this.status.workerStatus === "safe")}${button("close", "返回現場")}</div>`,
    );
  }
  commandWorker(command) {
    const worker = this.props.worker;
    if (this.status.workerStatus === "safe") return;
    const chest = worker.position.clone();
    chest.y += 1.1;
    if (!this.visiblePoint(chest, this.flow.worker.interactionRadius)) {
      this.workerPanel("請走近搬運工並面對他；隔牆不能下指令。");
      return;
    }
    this.dispatch("worker-commanded", {
      workerId: this.flow.worker.id,
      command,
      playerPosition: point(this.player.position),
      workerPosition: point(worker.position),
    });
    this.callbacks.close();
  }
  confirmHandoff() {
    const near = this.nearest();
    if (
      !near ||
      near.kind !== "handoff" ||
      !this.complete ||
      !this.field.complete
    ) {
      this.handoffPanel("需親自回到接收者旁確認交付。");
      return;
    }
    if (this.callbacks.kills()) {
      if (this.enemies.some((enemy) => enemy.hp > 0)) {
        this.handoffPanel("仍有守軍在場；先完成清場。");
        return;
      }
      this.callbacks.secure("combat");
    } else if (
      !this.status.handoffAccepted ||
      (this.status.localChoices.handoff === "mutual-aid" &&
        !this.status.promiseRelayed)
    )
      this.handoffPanel(
        "交付前的現場承諾必須成立；共同醫護安排還需要在通訊接點傳達。",
      );
    else if (this.callbacks.clueCount() !== 3)
      this.handoffPanel("需要找齊三份調查證據，才能提出停火通行。");
    else this.callbacks.secure("nonlethal");
  }
  defeated(id) {
    this.dispatch("actor-defeated", { actorId: id });
  }
  moveActor(actor, target, speed, dt) {
    const next = this.field.escortTarget(
      actor,
      target.clone(),
      this.world.colliders,
    );
    const dx = next.x - actor.position.x,
      dz = next.z - actor.position.z,
      length = Math.hypot(dx, dz);
    if (length < 0.04) {
      this.world.animate(actor, "idle");
      return;
    }
    const amount = Math.min(length, speed * dt);
    const moved = moveCircle(
      actor.position,
      (dx / length) * amount,
      (dz / length) * amount,
      this.world.colliders,
      0.3,
    );
    const walked = gap(actor.position, moved);
    actor.position.x = moved.x;
    actor.position.z = moved.z;
    actor.object.rotation.y = Math.atan2(dx, dz);
    this.world.animate(actor, walked > 0.001 ? "walk" : "idle");
  }
  controlEnemy(enemy, dt) {
    const order = this.orders.get(enemy.id);
    if (!order || order.order === "guard") return false;
    if (this.callbacks.secured()) return false;
    // Standby soldiers remain tangible and can defend themselves when directly attacked.
    if (enemy.engaged || enemy.suppressed > 0) return false;
    if (order.order === "investigate") {
      const path = this.flow.actors[enemy.id].responsePath;
      const target =
        order.index < path.length
          ? vector(path[order.index])
          : this.unload.cargo.position;
      if (gap(enemy.actor.position, target) < 0.7 && order.index < path.length)
        order.index++;
      if (gap(enemy.actor.position, this.player.position) < 10) {
        enemy.alert = 5;
        return false;
      }
      enemy.state = "inspect-cargo";
      this.moveOrderedEnemy(enemy, target, 1.6, dt);
    } else {
      enemy.state = order.order === "hold" ? "awaiting-dispatch" : "standby";
      this.moveOrderedEnemy(
        enemy,
        order.holdPosition || vector(this.flow.actors[enemy.id].position),
        1.6,
        dt,
      );
    }
    enemy.windup = 0;
    return true;
  }
  moveOrderedEnemy(enemy, target, speed, dt, radius = 0.38) {
    const actor = enemy.actor,
      from = actor.position;
    const colliders = this.world.colliders;
    const geometry = tacticalGeometryKey(colliders, radius, 23);
    let cache = enemy.missionPath;
    if (
      !cache ||
      cache.geometry !== geometry ||
      gap(cache.goal, target) > 0.5
    ) {
      const options = {
        from,
        to: target,
        colliders,
        radius,
        bounds: 23,
        maxDistance: 64,
      };
      const path = planTacticalPath(options);
      const proof = certifyTacticalPath(path, options, moveCircle);
      cache = enemy.missionPath = {
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
        radius,
        bounds: 23,
      })
    ) {
      if (waypoint) enemy.missionPath = null;
      this.world.animate(actor, "idle");
      return;
    }
    const dx = waypoint.x - from.x,
      dz = waypoint.z - from.z;
    const length = Math.hypot(dx, dz);
    const amount = Math.min(length, speed * Math.max(0, dt));
    const steps = Math.max(1, Math.ceil(amount / 0.1));
    for (let i = 0; i < steps; i++) {
      const moved = moveCircle(
        from,
        ((dx / length) * amount) / steps,
        ((dz / length) * amount) / steps,
        colliders,
        radius,
      );
      from.x = moved.x;
      from.z = moved.z;
    }
    actor.object.rotation.y = Math.atan2(dx, dz);
    this.world.animate(actor, "walk");
  }
  workerThreatAt(position, crouched = false) {
    if (this.callbacks.secured()) return null;
    const target = position.clone();
    target.y = crouched ? 0.65 : 1.05;
    for (const enemy of this.enemies) {
      const order = this.orders.get(enemy.id)?.order || "guard";
      if (
        enemy.hp <= 0 ||
        enemy.rounds === 0 ||
        (!enemy.engaged && ["hold", "standby"].includes(order))
      )
        continue;
      if (
        gap(enemy.actor.position, position) >=
        enemyWeaponRange(enemy.type || "guard")
      )
        continue;
      const from = enemy.actor.position.clone();
      from.y += 1.35;
      if (!this.world.trace(from, target)) return enemy;
    }
    return null;
  }
  workerShelterPoint(threat, next) {
    const worker = this.props.worker;
    const candidates = [];
    for (const box of this.world.colliders) {
      if (box.max.y < 0.9 || box.min.y > 0.2) continue;
      const margin = 0.36,
        edgePoints = [];
      // Oblique crossfire can leave a protected shoulder rather than a safe
      // side midpoint. Test actual mesh shadows along each existing edge.
      for (const t of [0, 0.25, 0.5, 0.75, 1]) {
        const x = box.min.x + (box.max.x - box.min.x) * t;
        const z = box.min.z + (box.max.z - box.min.z) * t;
        edgePoints.push(
          [box.min.x - margin, z],
          [box.max.x + margin, z],
          [x, box.min.z - margin],
          [x, box.max.z + margin],
        );
      }
      for (const [x, z] of edgePoints) {
        const candidate = new THREE.Vector3(x, 0, z);
        if (
          Math.abs(x) > 22.6 ||
          Math.abs(z) > 22.6 ||
          gap(candidate, worker.position) > 6 ||
          this.workerThreatAt(candidate, true)
        )
          continue;
        const options = {
          from: worker.position,
          to: candidate,
          colliders: this.world.colliders,
          radius: 0.3,
          bounds: 23,
          maxDistance: 10,
        };
        const proof = certifyTacticalPath(
          planTacticalPath(options),
          options,
          moveCircle,
        );
        if (!proof.ok) continue;
        // It may retreat from current exposure, but never enter a new exposed
        // segment from an already protected position just to reach another box.
        if (!this.workerThreatAt(worker.position)) {
          let exposed = false;
          for (let i = 1; i < proof.path.length; i++) {
            const a = proof.path[i - 1],
              b = proof.path[i],
              distance = Math.hypot(b.x - a.x, b.z - a.z);
            for (let t = 1; t <= Math.ceil(distance / 0.25); t++) {
              const p = new THREE.Vector3(a.x, 0, a.z).lerp(
                new THREE.Vector3(b.x, 0, b.z),
                Math.min(1, (t * 0.25) / distance),
              );
              if (this.workerThreatAt(p)) {
                exposed = true;
                break;
              }
            }
            if (exposed) break;
          }
          if (exposed) continue;
        }
        candidates.push({
          point: candidate,
          score: gap(worker.position, candidate) + gap(candidate, next) * 0.1,
          boxId: box.id,
        });
      }
    }
    candidates.sort((a, b) => a.score - b.score);
    return candidates[0] || null;
  }
  updateWorker(dt) {
    if (this.status.workerStatus !== "following") {
      this.world.animate(this.props.worker, "idle");
      return;
    }
    const worker = this.props.worker,
      safe = vector(this.flow.worker.safePosition);
    const playerNearSafe =
      gap(this.player.position, safe) <= this.flow.worker.safeRadius;
    const target = playerNearSafe ? safe : this.player.position;
    if (gap(worker.position, this.player.position) >= 6) {
      this.world.animate(worker, "idle");
      return;
    }
    const options = {
      from: worker.position,
      to: target,
      colliders: this.world.colliders,
      radius: 0.3,
      bounds: 23,
      maxDistance: 24,
    };
    const geometry = tacticalGeometryKey(this.world.colliders, 0.3, 23);
    if (
      !this.workerGuide ||
      this.workerGuide.geometry !== geometry ||
      gap(this.workerGuide.goal, target) > 0.4
    ) {
      const proof = certifyTacticalPath(
        planTacticalPath(options),
        options,
        moveCircle,
      );
      this.workerGuide = {
        geometry,
        goal: target.clone(),
        path: proof.ok ? proof.path.slice(1) : [],
      };
    }
    while (
      this.workerGuide.path.length &&
      gap(worker.position, this.workerGuide.path[0]) < 0.04
    )
      this.workerGuide.path.shift();
    const next = this.workerGuide.path[0];
    let threat = null;
    if (next) {
      const aim = new THREE.Vector3(next.x, 0, next.z);
      const distance = gap(worker.position, aim);
      if (distance > 2)
        aim
          .copy(worker.position)
          .lerp(new THREE.Vector3(next.x, 0, next.z), 2 / distance);
      for (const fraction of [0.25, 0.5, 0.75, 1]) {
        threat = this.workerThreatAt(
          worker.position.clone().lerp(aim, fraction),
        );
        if (threat) break;
      }
    }
    this.workerMover ||= { actor: worker, missionPath: null };
    if (threat) {
      const key = `${threat.id}:${Math.round(threat.actor.position.x * 2)}:${Math.round(threat.actor.position.z * 2)}:${geometry}:${Math.round(target.x * 2)}:${Math.round(target.z * 2)}`;
      if (this.workerShelterKey !== key) {
        this.workerShelterKey = key;
        this.workerShelter = this.workerShelterPoint(threat, target);
        this.workerMover.missionPath = null;
      }
      if (this.workerThreat !== threat.id)
        this.callbacks.toast(
          `搬運工：${guardTitle(threat.id)}正覆蓋前方；${this.workerShelter ? "我先退到遮蔽物後" : "附近沒有可安全到達的遮蔽物"}，請解除威脅或換方向帶路。`,
        );
      this.workerThreat = threat.id;
      const shelter = this.workerShelter?.point;
      if (
        shelter &&
        !this.workerThreatAt(shelter, true) &&
        gap(worker.position, shelter) > 0.05
      ) {
        this.moveOrderedEnemy(this.workerMover, shelter, 2.4, dt, 0.3);
        this.workerGuide = null;
      } else this.world.animate(worker, "cover");
      return;
    }
    this.workerThreat = null;
    this.workerShelter = null;
    this.workerShelterKey = null;
    if (next && gap(worker.position, target) > (playerNearSafe ? 0.15 : 1.2))
      this.moveOrderedEnemy(this.workerMover, target, 2.4, dt, 0.3);
    else this.world.animate(worker, "idle");
    if (
      playerNearSafe &&
      gap(worker.position, safe) <= this.flow.worker.safeRadius
    )
      this.dispatch("worker-safe", {
        workerId: this.flow.worker.id,
        playerPosition: point(this.player.position),
        workerPosition: point(worker.position),
      });
  }
  update(dt) {
    if (this.pendingResponse) {
      if (this.warningPresented) {
        this.pendingResponse = false;
        this.dispatch("response-activated", {
          responseId: this.flow.response.id,
        });
      } else {
        this.callbacks.toast(this.responseWarning);
        this.warningPresented = true;
      }
    }
    this.updateWorker(dt);
    const departure = this.departure();
    this.departureState = (this.departureGuidance ??= createDepartureGuidance({
      moveCircle,
    })).update({
      enabled: Boolean(departure?.target),
      position: this.player.position,
      target: departure?.target,
      colliders: this.world.colliders,
    });
    this.props.setDepartureGuidance?.(this.departureState.chevrons);
  }
  departure() {
    if (
      !(this.status.receipt && this.field.complete && this.callbacks.secured())
    )
      return null;
    const route = this.flow.routes[this.status.routeId];
    if (!route) return null;
    const courtyard = this.props.group.userData.placement?.courtyard || {
      min: [-15.5, -7],
      max: [-6.5, -1],
    };
    const p = this.player.position;
    // A player who vaulted another wall should continue toward extraction,
    // rather than being told to re-enter the courtyard.
    const inside =
      p.x >= courtyard.min[0] - 0.34 &&
      p.x <= courtyard.max[0] + 0.34 &&
      p.z >= courtyard.min[1] - 0.34 &&
      p.z <= courtyard.max[1] + 1.2;
    if (inside)
      return {
        stage: "courtyard",
        title: "回條已收妥 · 先走出庭院",
        detail: "沿地面箭頭走過已開的庭院門。門口直接通行。",
        target: { x: route.gatePosition[0], z: route.gatePosition[1] + 2 },
      };
    const exit = this.callbacks.exitPosition?.();
    return {
      stage: "extraction",
      title: "帶著具名回條 · 返回南側撤離",
      detail: "沿地面箭頭前往南側撤離圈，靠近後按 E 返回暮砂鎮。",
      target: exit ? { x: exit[0], z: exit[1] } : null,
    };
  }
  objective() {
    const missingFor = (id) => {
      const task = this.field.tasks.find((task) => task.id === id);
      return this.field
        .missingClues(task)
        .map((clue) => `「${this.field.callbacks.clueTitle?.(clue) || clue}」`)
        .join("、");
    };
    if (!this.status.verified) return "核對運單、收貨牌與同一箱藥的背面記錄。";
    if (!this.status.proposedHandoff)
      return "在藥品工作面板提出兩份藥的接收安排。";
    if (!this.status.handoffAccepted)
      return this.allGuardsDefeated()
        ? "回到同一藥箱旁，確認清場後的交付接管。"
        : "親自到哨兵面前出示核證記錄與分藥提案。";
    if (!this.field.state.completed.includes("mail-seal"))
      return "在藥品工作面板確認核驗結果，再前往道岔。";
    if (!this.field.state.completed.includes("mail-switch")) {
      const missing = missingFor("mail-switch");
      return missing
        ? `先查閱${missing}，再到道岔工作台選定出貨線。`
        : "到道岔工作台選定出貨線，再回原藥箱開始搬運。";
    }
    if (
      this.status.localChoices.handoff === "mutual-aid" &&
      !this.status.promiseRelayed &&
      this.status.handoffMethod !== "reclaimed"
    )
      return this.status.communicationConnected
        ? "到道岔通訊接點傳達已接受的共同醫護承諾。"
        : "共同醫護承諾尚未傳達；恢復道岔的同一通訊接點，再傳達。";
    if (!this.complete) {
      const missing = missingFor("mail-unload");
      if (missing) return `先查閱${missing}，再回原藥箱開始搬運。`;
      return `搬同一箱藥，穿過已開啟的庭院門，交給${this.flow.recipients[this.flow.decision.choices[this.status.localChoices.handoff].recipientId].title}。`;
    }
    if (!this.field.complete) return "藥品已交付；在接收工作面板確認回條。";
    return "回接收者旁出示回條，完成停火協議或清場確認，再向南撤離。";
  }
  labels() {
    const entries = [];
    const add = (p, text) =>
      entries.push({ position: { x: p[0], y: 1.9, z: p[1] }, text });
    const leavingCourtyard = Boolean(
      this.status.receipt && this.field.complete && this.callbacks.secured(),
    );
    if (!leavingCourtyard)
      add(
        this.flow.communication.position,
        this.status.communicationConnected
          ? "◇ 通訊接點 · 可傳達／斷線"
          : "◇ 通訊接點 · 已斷，可恢復",
      );
    if (this.status.proposedHandoff && !this.status.handoffAccepted) {
      const inspector = this.enemies.find(
        (enemy) => enemy.id === "mail-1" && enemy.hp > 0,
      );
      if (inspector)
        add(point(inspector.actor.position), "◇ 哨兵 · 出示核證與分藥提案");
      else if (this.allGuardsDefeated())
        add(point(this.unload.cargo.position), "◇ 同一藥箱 · 清場接管");
    }
    if (this.status.workerStatus !== "safe")
      add(
        point(this.props.worker.position),
        this.status.workerStatus === "following"
          ? this.workerThreat
            ? `搬運工 · ${guardTitle(this.workerThreat)}覆蓋前方，掩護後續行`
            : gap(this.props.worker.position, this.player.position) > 6
              ? "搬運工 · 停等中，靠近帶路"
              : "搬運工 · 跟隨中"
          : "◇ 搬運工 · 原位停等（可選）",
      );
    if (this.status.workerStatus === "following")
      add(this.flow.worker.safePosition, "◇ 搬運工安全處");
    if (this.workerThreat && this.status.workerStatus === "following") {
      const threat = this.enemies.find(
        (enemy) => enemy.id === this.workerThreat && enemy.hp > 0,
      );
      if (threat)
        add(
          point(threat.actor.position),
          `⚠ ${guardTitle(threat.id)} · 覆蓋搬運工前方`,
        );
    }
    if (this.status.localChoices.handoff && !leavingCourtyard)
      add(
        this.flow.recipients[
          this.flow.decision.choices[this.status.localChoices.handoff]
            .recipientId
        ].position,
        this.complete ? "◇ 接收回條／通行協議" : "◇ 藥品接收處",
      );
    if (leavingCourtyard && this.departure()?.stage === "courtyard") {
      const route = this.flow.routes[this.status.routeId];
      // Ground-level anchor ties the label to the actual opening.
      entries.push({
        position: {
          x: route.gatePosition[0],
          y: 0.12,
          z: route.gatePosition[1],
        },
        text: "◇ 已開門口 · 直接走過",
      });
    }
    return entries;
  }
  dispose() {
    this.props.dispose();
    this.appliedEffects.clear();
  }
}
