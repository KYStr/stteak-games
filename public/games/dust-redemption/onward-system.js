import * as THREE from "./vendor/three.module.js";
import { mergeGeometries } from "./vendor/BufferGeometryUtils.js";
import { planTacticalPath } from "./enemy-tactics.js";
import {
  ONWARD,
  onwardFact,
  onwardAnswer,
  canonicalOnward,
  recordOnward,
} from "./onward-content.js";
const point = (p) => [p.x, p.z];
const gap = (a, b) => Math.hypot(a.x - b.x, a.z - b.z);
const esc = (s) =>
  String(s)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll('"', "&quot;");
export class OnwardSystem {
  constructor(field, controller) {
    this.field = field;
    this.world = field.world;
    this.controller = controller;
    this.id = field.missionId;
    this.flow = ONWARD[this.id];
    this.task = field.tasks.find((t) => t.onward);
    this.sites = {};
    this.cargos = {};
    this.following = false;
    this.scratch = { x: 0, z: 0 };
    this.moveOut = {};
    this.targetVector = new THREE.Vector3();
    this.revision = 0;
    this.members =
      this.flow.party === "worker"
        ? [controller.props.worker]
        : this.flow.party === "family"
          ? controller.escort.members
          : [];
    this.memberIds =
      this.flow.party === "worker"
        ? ["mail-porter"]
        : ["night-family-1", "night-family-2", "night-family-3"];
    for (const m of this.members) field.escortRouting.prepare(m);
    const pieces = [];
    for (const site of this.flow.sites) {
      const at = this.place(site.position),
        node = new THREE.Group();
      node.name = `onward-${site.id}`;
      node.position.set(at.x, 0, at.z);
      field.group.add(node);
      this.sites[site.id] = node;
      // Original reused frontier table/sign language; static parts submit as one mesh.
      const top = new THREE.BoxGeometry(1.05, 0.08, 0.6);
      top.translate(at.x, 0.7, at.z);
      pieces.push(top);
      for (const dx of [-0.4, 0.4]) {
        const g = new THREE.BoxGeometry(0.08, 0.7, 0.1);
        g.translate(at.x + dx, 0.35, at.z);
        pieces.push(g);
      }
      const sign = new THREE.BoxGeometry(1.05, 0.55, 0.06);
      sign.translate(at.x, 1.15, at.z - 0.16);
      pieces.push(sign);
      field.label(node, site.title, [0, 1.33, -0.12], [1.02, 0.2]);
      const gauge = field.addMesh(
        node,
        `gauge-${site.id}`,
        new THREE.CylinderGeometry(0.14, 0.14, 0.04, 12),
        0xc3a35d,
        [0.3, 0.78, 0.1],
        [Math.PI / 2, 0, 0],
      );
      const needle = field.box(
        node,
        `needle-${site.id}`,
        [0.02, 0.15, 0.025],
        0x397d7a,
        [0.3, 0.8, 0.14],
      );
      this.sites[site.id].userData.gauge = gauge;
      this.sites[site.id].userData.needle = needle;
      if (this.id === "last-signal")
        node.userData.relayTag = { se: "A", sw: "B", ne: "C" }[site.id] || null;
      if (this.id === "broken-water" && ["nw", "ne", "sw"].includes(site.id)) {
        const pressure = { nw: 3, ne: 2, sw: 2 }[site.id];
        needle.rotation.z = -pressure * 0.3;
        node.userData.pressure = pressure;
        node.userData.demandSelector = field.box(
          node,
          `quota-${site.id}`,
          [0.17, 0.045, 0.05],
          0x397d7a,
          [-0.3, 0.85, -0.1],
        );
        node.userData.valve = field.box(
          node,
          `isolation-${site.id}`,
          [0.28, 0.05, 0.06],
          0xa7553c,
          [-0.3, 0.85, 0.14],
        );
        field.label(node, `P${pressure}`, [0.3, 0.99, 0.16], [0.22, 0.14]);
      }
      if (this.id === "long-night" && ["se", "sw"].includes(site.id)) {
        const hinge = new THREE.Group();
        hinge.position.set(0, 0.2, -0.8);
        hinge.rotation.x = Math.PI / 2;
        node.add(hinge);
        field.box(
          hinge,
          `crossing-${site.id}`,
          [1.2, 0.08, 1.6],
          0xad8855,
          [0, 0, -0.8],
        );
        node.userData.crossing = hinge;
      }
      if (this.id === "dawn-pact" && ["nw", "ne"].includes(site.id)) {
        node.userData.sealId = site.id === "nw" ? "D-A-14" : "D-B-10";
        field.box(
          node,
          `seal-${site.id}`,
          [0.22, 0.13, 0.08],
          0x397d7a,
          [-0.3, 0.85, 0.1],
        );
        field.label(
          node,
          node.userData.sealId,
          [-0.2, 0.99, 0.16],
          [0.5, 0.15],
        );
      }
    }
    for (const site of this.flow.sites) {
      const facts = this.flow.steps
        .filter((s) => s.at === site.id && s.fact)
        .map((s) => s.fact);
      if (facts.length)
        field.label(
          this.sites[site.id],
          facts
            .join("；")
            .match(/.{1,18}/gu)
            .join("\n"),
          [0, 1.06, -0.11],
          [1.03, 0.27],
        );
    }
    const geometry = mergeGeometries(pieces);
    for (const g of pieces) g.dispose();
    const frame = new THREE.Mesh(geometry, field.material(0x79583b));
    frame.castShadow = true;
    frame.receiveShadow = true;
    field.group.add(frame);
    for (const step of this.flow.steps)
      if (step.cargo && !this.cargos[step.cargo]) {
        const node = new THREE.Group();
        node.name = step.cargo;
        node.userData.onwardEntity = step.cargo;
        const source = this.sites[step.at];
        node.position.copy(source.position);
        node.position.y = 0.75;
        field.group.add(node);
        field.box(
          node,
          `parcel-${step.cargo}`,
          [0.42, 0.22, 0.32],
          this.id === "broken-water" ? 0x397d7a : 0xc3a35d,
        );
        field.label(node, step.cargo, [0, 0.16, 0.17], [0.4, 0.15]);
        this.cargos[step.cargo] = node;
      }
    this.task.object.visible = false;
    this.task.anchor = this.sites.nw;
    this.task.carryOffset = new THREE.Vector3(0, 0, -0.7);
    this.inspectionAnchor = new THREE.Object3D();
    field.group.add(this.inspectionAnchor);
    this.marker = this.task.marker;
    this.updateTarget();
  }
  place(authored) {
    const from = this.field.callbacks.entryPosition?.() || { x: 0, z: 17 };
    for (let ring = 0; ring <= 3; ring++)
      for (let i = 0; i < (ring ? 16 : 1); i++) {
        const x = authored[0] + Math.cos((i * Math.PI) / 8) * ring,
          z = authored[1] + Math.sin((i * Math.PI) / 8) * ring;
        if (Math.abs(x) > 21.5 || Math.abs(z) > 21.5) continue;
        const path = planTacticalPath({
          from,
          to: { x, z },
          colliders: this.world.colliders,
          radius: 0.8,
          bounds: 22.5,
          maxDistance: 128,
        });
        if (path) return { x, z };
      }
    throw Error(`Unreachable onward anchor ${authored}`);
  }
  get state() {
    return this.field.state.onward;
  }
  get step() {
    return this.flow.steps[this.state.events.length];
  }
  get ready() {
    // Finish the first delivery before its onward assignment. The pact's audit
    // instead precedes its deed handoff. Family handoffs share the same actors.
    if (this.id !== "dawn-pact" && !this.controller.status.receipt)
      return false;
    for (let i = 0; i < this.task.dependencies.length; i++)
      if (!this.field.state.completed.includes(this.task.dependencies[i]))
        return false;
    return true;
  }
  get workerOwned() {
    return (
      this.flow.party === "worker" &&
      this.ready &&
      !this.complete &&
      this.state.events.length >= 6
    );
  }
  get complete() {
    return this.field.done(this.task);
  }
  location(at) {
    if (at === "worker") return this.controller.props.worker.position;
    if (at === "worker-safe") {
      const p = this.controller.flow.worker.safePosition;
      return (this.workerSafePoint ??= new THREE.Vector3()).set(p[0], 0, p[1]);
    }
    if (at === "party") return this.members[1].position;
    if (at === "arrival") {
      const p = this.flow.arrivalPosition;
      return (this.arrivalPoint ??= new THREE.Vector3()).set(p[0], 0, p[1]);
    }
    if (at === "receiver") {
      const p = this.controller.flow.receiver?.position || [-12, 17];
      return (this.receiverPoint ??= new THREE.Vector3()).set(p[0], 0, p[1]);
    }
    if (at === "cart") return this.controller.cart.cargo.position;
    return this.sites[at].position;
  }
  updateTarget() {
    const step = this.step;
    if (!step) return;
    let at = this.location(step.at),
      site = this.sites[step.at] || null;
    // Route selection changes actual stations, not just receipt text.
    if (
      this.id === "dry-mail" &&
      this.state.choice === "shared-relief" &&
      step.id === "parcel-02-receipt"
    )
      at = (site = this.sites.nw).position;
    if (
      this.id === "long-night" &&
      this.state.choice === "east-ridge" &&
      step.at === "se"
    )
      at = (site = this.sites.sw).position;
    if (this.id === "last-signal" && this.state.choice === "exposed") {
      if (step.at === "se") at = (site = this.sites.ne).position;
      else if (step.at === "ne") at = (site = this.sites.se).position;
    }
    this.currentSite = site;
    this.targetVector.copy(at);
    this.inspectionAnchor.position.set(at.x, 0.9, at.z);
    this.task.anchor = this.marker;
    this.marker.position.set(at.x, 0.025, at.z);
    this.marker.visible = this.ready && !this.complete;
  }
  near() {
    return gap(this.field.playerPosition, this.targetVector) <= 2.5;
  }
  membersAt(target, r = this.flow.party === "worker" ? 1.5 : 2.5) {
    if (this.step?.at === "arrival") r = Math.min(r, this.flow.arrivalRadius);
    for (const m of this.members) if (gap(m.position, target) > r) return false;
    return this.members.length === (this.flow.party === "family" ? 3 : 1);
  }
  memberProof() {
    return this.members.map((m, i) => ({
      id: this.memberIds[i],
      position: point(m.position),
    }));
  }
  stockProof() {
    const stock = this.controller.props.readCartSnapshot().stock;
    return {
      initial: 24,
      issued: stock.issued,
      cart: stock.available,
      sealed: stock.cover,
    };
  }
  render(message = "") {
    this.updateTarget();
    const s = this.step;
    const controls = this.flow.choices
      .map(
        (c) =>
          `<button data-action="field-onward-choice" data-choice="${c.id}" aria-pressed="${this.state.choice === c.id}" ${this.state.choice ? "disabled" : ""}>${this.state.choice === c.id ? "✓ 本次方案 · " : ""}${esc(c.title)}</button>`,
      )
      .join("");
    const progress = `${this.state.events.length}/${this.flow.steps.length}`;
    const operations = !s
      ? ""
      : s.kind === "set"
        ? s.values
            .map(
              (v, i) =>
                `<button data-action="field-onward-act" data-value="${i}">${esc(v)}</button>`,
            )
            .join("")
        : `<button data-action="field-onward-act">${s.kind === "escort" ? (this.following ? "逐人點名，確認抵達" : "同一隊跟隨／續走") : s.kind === "take" ? "拿起同一實物" : s.kind === "give" ? "放下同一實物，取得具名回條" : s.kind === "hold" ? "在此停等，保留原身分" : "轉近檢視並讀取原始刻記"}</button>`;
    const read =
      s?.kind === "read"
        ? `${this.id === "last-signal" && this.currentSite?.userData.relayTag ? `<p class="meta">眼前為實體中繼 ${esc(this.currentSite.userData.relayTag)}；依本方案的行走順序核對針腳。</p>` : ""}<blockquote>${esc(onwardFact(this.id, this.state, s))}</blockquote>`
        : "";
    this.field.callbacks.panel(
      `<div class="field-work"><p class="eyebrow">ONWARD · 必要續程 ${progress}</p><h2>${esc(this.flow.title)}</h2><div class="field-toolbar"><button data-action="field-view" data-delta="-1">視角 ↶</button><button data-action="field-view" data-delta="1">視角 ↷</button></div><p>第一階段已完成。下列工作仍是本次委託的一部分；雙手搬運時無法射擊。金色光圈標示下一個實際接收點。</p>${message ? `<p class="field-message" role="status">${esc(message)}</p>` : ""}<div class="field-options">${controls}</div><h3>${esc(s?.title || "所有續程已完成")}</h3>${read}<p>${this.near() ? "已在實體目標旁" : "返回現場，沿光圈走到目標旁才能操作。"}${this.following ? " 保持全員六公尺內；E 開啟點名或停等。" : ""}</p><div class="actions">${this.state.choice ? operations : ""}${this.following ? '<button data-action="field-onward-wait">全員在掩體停等</button>' : ""}<button data-action="field-close">返回現場</button></div><details><summary>已取得的現場紀錄</summary>${this.state.events.map((e) => `<p>✓ ${esc(this.flow.steps[e.sequence].title)}${e.returnedChecksum ? " · 實體回傳 " + esc(e.returnedChecksum) : ""}${e.kind === "give" ? " · " + esc(e.cargo) + " 具名回條" : ""}</p>`).join("")}</details>${this.id === "last-signal" && this.state.choice ? '<button data-action="field-onward-reset">改動接線／電源：作廢全部下游回覆，重新校驗</button>' : ""}</div>`,
    );
    if (this.near()) {
      if (this.task.onwardViewStep !== s?.id) {
        this.task.onwardViewStep = s?.id;
        this.task.viewAngle = 0;
        const aim = this.inspectionAnchor.position;
        for (const angle of [0, Math.PI / 4, -Math.PI / 4]) {
          const origin = new THREE.Vector3(
            aim.x + Math.sin(angle) * 3.8,
            aim.y + 1.55,
            aim.z + Math.cos(angle) * 3.8,
          );
          const hit = this.world.trace(origin, aim);
          if (!hit || hit.distance >= origin.distanceTo(aim) - 0.05) {
            this.task.viewAngle = angle;
            break;
          }
        }
      }
      this.field.focus(
        this.task,
        this.inspectionAnchor,
        this.task.viewAngle || 0,
      );
    }
  }
  handle(action, data) {
    if (!action.startsWith("field-onward-")) return false;
    this.field.callbacks.feedback?.(true);
    try {
      if (!this.ready) throw Error("先完成第一階段三項實體工作。");
      if (action === "field-onward-wait") {
        this.following = false;
        this.render("同一隊留在原位，請回到全員身旁再續行。");
        return true;
      }
      if (action === "field-onward-choice") {
        if (this.state.choice) return true;
        if (!this.flow.choices.some((c) => c.id === data.choice))
          throw Error("未知方案");
        this.state.choice = data.choice;
        if (this.id === "last-signal" && data.choice === "exposed") {
          this.cargos["SIG-17"].position.copy(this.sites.se.position);
          this.cargos["SIG-17"].position.y = 0.75;
        }
        this.revision++;
        this.updateTarget();
        this.render("方案已選定；依實際路線和配額交付。");
        return true;
      }
      if (action === "field-onward-reset") {
        if (!this.near()) throw Error("需回到目前的實體接點旁改線。");
        if (this.id === "last-signal")
          for (const id of ["se", "sw", "ne"]) {
            const site = this.sites[id];
            site.userData.needle.rotation.z = 0;
            site.userData.gauge.material.emissive.set(0);
            site.userData.gauge.material.emissiveIntensity = 0;
          }
        this.state.events.length = 0;
        this.field.state.progress[this.task.id] = [];
        this.task.carrying = false;
        this.task.cargo = null;
        const cargo = this.cargos["SIG-17"];
        cargo.position.copy(
          this.state.choice === "exposed"
            ? this.sites.se.position
            : this.sites.ne.position,
        );
        cargo.position.y = 0.75;
        this.revision++;
        this.render(
          "電源／接線已改動，全部下游校驗與簽章失效，需從原電文重新核對。",
        );
        return true;
      }
      if (action !== "field-onward-act") return true;
      const step = this.step;
      if (!step) return true;
      if (step.kind === "escort" && !this.membersAt(this.targetVector)) {
        for (const m of this.members)
          if (gap(m.position, this.field.playerPosition) > 6)
            throw Error("有人停等在六公尺外；先回去接同一人。");
        if (
          this.flow.party === "worker" &&
          this.controller.status.workerStatus !== "safe"
        ) {
          this.controller.commandWorker("follow");
          if (this.controller.status.workerStatus !== "following")
            throw Error("請走到原搬運工兩公尺內，當面下跟隨命令。");
        }
        this.following = true;
        this.field.close();
        return true;
      }
      if (!this.near())
        throw Error("需返回現場，親自走到光圈旁（2.5 公尺內）。");
      if (!this.state.choice) throw Error("先選定本次路線。");
      if (this.sites[step.at]) {
        this.world.syncCollisionMatrices?.();
        const origin = new THREE.Vector3(
          this.field.playerPosition.x,
          1.5,
          this.field.playerPosition.z,
        );
        const target = new THREE.Vector3(
          this.targetVector.x,
          0.95,
          this.targetVector.z,
        );
        const hit = this.world.trace(origin, target);
        if (hit && hit.distance < origin.distanceTo(target) - 0.05)
          throw Error("實體障礙遮住作業面；請返回現場，走到同側再操作。");
      }
      const event = {
        id: step.id,
        kind: step.kind,
        sequence: this.state.events.length,
        player: point(this.field.playerPosition),
        target: point(this.targetVector),
        siteId: step.at,
      };
      if (step.kind === "read") {
        const node = this.sites[step.at] || this.marker;
        node.updateWorldMatrix(true, false);
        const view = this.world.camera.position.z - this.targetVector.z;
        if (view <= 0.18) throw Error("刻記背向鏡頭，先轉到正面。");
        event.fact = onwardFact(this.id, this.state, step);
        event.visible = true;
        if (step.id === "depot-a-seal" || step.id === "depot-b-seal")
          event.sealId = this.sites[step.at].userData.sealId;
        if (step.id === "alternate-load-test") {
          event.bridgeAngle =
            this.sites[
              this.state.choice === "east-ridge" ? "sw" : "se"
            ].userData.crossing.rotation.x;
          event.members = this.memberProof();
        }
        event.normalDot =
          view /
          Math.hypot(
            view,
            this.world.camera.position.x - this.targetVector.x,
            this.world.camera.position.y,
          );
      }
      if (step.kind === "set") {
        const value = Number(data.value),
          site = this.currentSite;
        if (
          !Number.isInteger(value) ||
          value < 0 ||
          value >= step.values.length ||
          !site
        )
          throw Error("未知實體檔位。");
        if (this.id === "broken-water" && step.id.endsWith("-isolate")) {
          site.userData.valve.rotation.z =
            value === 0 ? 1.05 : value === 1 ? 0.5 : 0;
          event.value =
            Math.abs(site.userData.valve.rotation.z - 1.05) < 0.01
              ? 0
              : Math.abs(site.userData.valve.rotation.z - 0.5) < 0.01
                ? 1
                : 2;
        } else if (this.id === "broken-water" && step.id.endsWith("-test")) {
          site.userData.demandSelector.rotation.z = value * 0.65;
          event.value = Math.round(
            site.userData.demandSelector.rotation.z / 0.65,
          );
          event.valveClosed =
            Math.abs(site.userData.valve.rotation.z - 1.05) < 0.01;
          event.pressure = Math.round(-site.userData.needle.rotation.z / 0.3);
        } else {
          site.userData.needle.rotation.z = value * 0.7;
          event.value = Math.round(site.userData.needle.rotation.z / 0.7);
        }
        event.physical = true;
        if (this.id === "last-signal")
          event.returnedChecksum = `17-${site.userData.relayTag}${event.value + 1}`;
        if (step.id === "alternate-repair") {
          site.userData.crossing.rotation.x =
            value === onwardAnswer(this.id, this.state, step) ? 0 : Math.PI / 2;
          event.bridgeAngle = site.userData.crossing.rotation.x;
        }
      }
      if (step.kind === "take") {
        const cargo = this.cargos[step.cargo];
        if (gap(cargo.position, this.field.playerPosition) > 2.5)
          throw Error("原物件仍在遠處，不能從面板遠端拿取。");
        if (this.task.carrying) throw Error("雙手已持物。");
        event.cargo = step.cargo;
        event.entity = cargo.userData.onwardEntity;
      }
      if (step.kind === "give") {
        const cargo = this.task.cargo;
        if (!this.task.carrying || !cargo) throw Error("沒有攜帶這份原物件。");
        event.cargo = step.cargo;
        event.entity = cargo.userData.onwardEntity;
        event.cargoPosition = point(cargo.position);
        if (this.id === "dry-mail") {
          event.quantity = 1;
          event.recipientId =
            step.cargo === "R-01"
              ? "clinic-front-desk"
              : this.state.choice === "shared-relief"
                ? "household-relief-house"
                : "clinic-field-post";
        }
        if (this.id === "broken-water")
          event.quantity = this.flow.choices.find(
            (c) => c.id === this.state.choice,
          ).quantities[Number(step.id.match(/sample-(\d)/)[1]) - 1];
      }
      if (
        step.kind === "escort" ||
        step.kind === "hold" ||
        step.id === "party-recall"
      )
        event.members = this.memberProof();
      if (
        step.id.startsWith("depot-") &&
        (step.kind === "give" || step.id === "depot-reconciliation")
      ) {
        event.stock = this.stockProof();
        const priority = this.flow.choices.find(
          (c) => c.id === this.state.choice,
        ).reserve;
        const main = Math.ceil((event.stock.cart * 2) / 3),
          other = event.stock.cart - main;
        event.reserve =
          priority === "clinic"
            ? { clinic: main, road: other }
            : { clinic: other, road: main };
      }
      const next = recordOnward(this.id, this.state, event); // validate before changing a real object
      if (step.kind === "take") {
        this.task.cargo = this.cargos[step.cargo];
        this.task.carrying = true;
        this.task.cargo.position.y = 0.65;
      }
      if (step.kind === "give") {
        this.task.carrying = false;
        this.task.cargo.position.y = 0.75;
        this.task.cargo = null;
      }
      if (step.kind === "hold" || step.kind === "escort") {
        this.following = false;
        if (
          this.flow.party === "worker" &&
          this.controller.status.workerStatus !== "safe"
        ) {
          if (step.id === "porter-stop-two")
            this.controller.dispatch("worker-safe", {
              workerId: this.controller.flow.worker.id,
              playerPosition: point(this.field.playerPosition),
              workerPosition: point(this.members[0].position),
            });
          else this.controller.commandWorker("wait");
        }
      }
      if (this.id === "broken-water" && step.id.endsWith("-commission"))
        this.sites[step.at].userData.valve.rotation.z = 0;
      if (this.id === "last-signal" && step.kind === "set") {
        this.currentSite.userData.gauge.material.emissive.set(0x397d7a);
        this.currentSite.userData.gauge.material.emissiveIntensity = 0.6;
      }
      this.field.state.onward = next;
      this.field.record(this.task, this.task.physicalSteps[event.sequence]);
      this.revision++;
      if (next.events.length === this.flow.steps.length) {
        canonicalOnward(this.id, next);
        const result = this.field.applyOnwardChoice(this.task, next.choice);
        this.marker.visible = false;
        this.field.notify(result.message);
        this.field.close();
        this.field.callbacks.onwardComplete?.();
        return true;
      }
      this.updateTarget();
      this.field.notify(
        `${step.title} · ${event.returnedChecksum ? "實體回傳 " + event.returnedChecksum : "已記錄"}`,
      );
      this.field.close();
    } catch (e) {
      this.field.callbacks.feedback?.(false);
      this.field.notify(e.message);
      this.render(e.message);
    }
    return true;
  }
  interact() {
    if (!this.ready || this.complete) return false;
    if (this.task.carrying || this.following) {
      this.field.active = this.task;
      this.render();
      return true;
    }
    return false;
  }
  update(dt) {
    this.updateTarget();
    if (!this.following) return;
    const player = this.field.playerPosition;
    for (let i = 0; i < this.members.length; i++) {
      const member = this.members[i];
      if (gap(member.position, player) > 6) {
        this.world.animate(member, "idle");
        continue;
      }
      const goal = this.targetVector;
      const target = this.scratch;
      if (gap(player, goal) < 2.5) {
        target.x = goal.x + (i - 1) * 0.38;
        target.z = goal.z + Math.abs(i - 1) * 0.25;
      } else {
        target.x = player.x + (i - 1) * 0.38;
        target.z = player.z + 0.35;
      }
      const next = this.field.escortTarget(
          member,
          target,
          this.world.colliders,
        ),
        dx = next.x - member.position.x,
        dz = next.z - member.position.z,
        len = Math.hypot(dx, dz);
      if (len > 0.08) {
        const amount = Math.min(len, dt * 2.4);
        this.field.moveSafe(
          member.object,
          (dx / len) * amount,
          (dz / len) * amount,
          this.world.colliders,
          0.27,
        );
        member.object.rotation.y = Math.atan2(dx, dz);
        this.world.animate(member, "walk");
      } else this.world.animate(member, "idle");
    }
  }
  objective() {
    if (
      this.objectiveIndex !== this.state.events.length ||
      this.objectiveFollowing !== this.following
    ) {
      this.objectiveIndex = this.state.events.length;
      this.objectiveFollowing = this.following;
      this.objectiveText = `${this.flow.title} ${this.state.events.length}/${this.flow.steps.length} · ${this.step?.title || "回條齊備"}${this.following ? " · 保持全員六公尺內" : ""}`;
    }
    return this.objectiveText;
  }
  diagnostics() {
    return {
      version: this.state.version,
      ready: this.ready,
      complete: this.complete,
      choice: this.state.choice,
      index: this.state.events.length,
      step: this.step,
      following: this.following,
      target: point(this.targetVector),
      members: this.memberProof(),
      events: structuredClone(this.state.events),
      pathRecalculations: this.field.escortRouting.recalculations,
    };
  }
}
