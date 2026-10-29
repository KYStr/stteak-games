import * as THREE from './vendor/three.module.js';
import { SIGNAL_FLOW, createSignalProgress, recordSignalEvent, canonicalSignalProgress } from './signal-flow.js';
import { createSignalProps } from './signal-props.js';
import { moveCircle } from './physics.js';
import { tetherPosition } from './cargo-tether.js';
import { planTacticalPath, certifyTacticalPath, tacticalSegmentClear, tacticalGeometryKey } from './enemy-tactics.js';

const point = p => [p.x, p.z];
const vector = p => new THREE.Vector3(p[0], 0, p[1]);
const gap = (a, b) => Math.hypot(a.x - b.x, a.z - b.z);
const same = (a, b) => JSON.stringify(a) === JSON.stringify(b);
const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' })[c]);
const button = (action, text, data = '', disabled = false) => `<button data-action="signal-${action}" ${data} ${disabled ? 'disabled' : ''}>${esc(text)}</button>`;

export const SIGNAL_EFFECT_TYPES = Object.freeze(['showSignalEvidence', 'invalidateSignalProof', 'showSignalContacts', 'confirmSignalPower', 'verifyCompleteRoster', 'selectSignalChannel', 'setTraceBranchState', 'setSignalEndpoint', 'sendSignalMessage', 'confirmSignalReply', 'setActorOrder', 'setResponseState', 'announceSignalResponse', 'setSignalPouchCarrier', 'transferSignalPouch', 'issueSignalReceipt', 'recoverableMistake']);
export function signalPlacementPoints(id) {
  const f = SIGNAL_FLOW[id];
  return f ? [f.earth.position, f.patch.position, f.receiver.position, ...Object.values(f.endpoints).map(e => e.position), ...Object.values(f.actors).map(a => a.standdownPosition).filter(Boolean)] : [];
}

/** CPU-testable scene adapter. Fresh construction intentionally starts a new local flow.
 * The host brackets field.handle with before/afterFieldAction, calls update only while
 * playing, and includes handsOccupied/constrainMove in its ordinary player controls.
 */
export class SignalSystem {
  constructor(world, id, field, player, enemies, callbacks = {}) {
    this.world = world; this.id = id; this.flow = SIGNAL_FLOW[id];
    if (!this.flow) throw Error(`No signal flow for ${id}`);
    this.field = field; this.player = player; this.enemies = enemies; this.callbacks = callbacks;
    this.earth = field.tasks.find(t => t.id === 'signal-earth');
    this.patch = field.tasks.find(t => t.id === 'signal-patch');
    this.relay = field.tasks.find(t => t.id === 'signal-relay');
    if (!this.earth || !this.patch?.choices.some(c => c.id === 'verify-complete-roster') || !this.relay?.choices.some(c => c.id === 'ceasefire-dispatch')) throw Error('Signal controller requires the signal-v1 expansion patch');
    this.progress = createSignalProgress(id); this.status = canonicalSignalProgress(id, this.progress, { requireComplete: false });
    this.serial = 0; this.messageSerial = 0; this.disposed = false; this.pendingFieldTask = null; this.appliedEffects = new Set();
    this.orders = new Map(Object.entries(this.flow.actors).map(([actorId, actor]) => [actorId, { order: actor.initialOrder, targetId: null }]));
    this.originalChoices = new Map([this.patch, this.relay].map(t => [t, t.choices]));
    this.originalText = new Map([this.patch, this.relay].map(t => [t, { title:t.title, description:t.description, hints:t.hints, selectedChoice:t.selectedChoice }]));
    this.originalParts = new Map();
    this.props = createSignalProps(THREE, world, this.flow);
    this.props.bindField({ earth: this.earth, patch: this.patch, relay: this.relay });
    for (const [key, node] of [['roster-sheet', this.props.parts['roster-sheet']], ['receiver-code-plate', this.props.parts['receiver-code-plate']]]) this.bindPart(this.patch, key, node);
    this.bindPart(this.relay, 'dispatch-key', this.props.keys.get(null));
    // Build the original relay nodes before filtering choices; no duplicate relay is created.
    this.patch.choices = this.patch.choices.filter(c => c.id === 'verify-complete-roster');
    this.patch.selectedChoice = 'verify-complete-roster';
    this.relay.choices = this.relay.choices.filter(c => ['public-west-relay', 'public-south-relay', 'ceasefire-dispatch'].includes(c.id));
    this.patch.title='核對這只信袋的完整名單';
    this.patch.description='查看信袋內四張紙頁與旁邊收件牌，核對值班表和替換碼；四人不能漏掉。完成後返回現場，再選通訊線。';
    this.patch.hints=[this.flow.evidence['signal-roster'].text,this.flow.evidence['signal-code'].text];
    this.relay.title='完成本次真實發送';
    this.relay.description='公開驛線只選西側或南側一個既有中繼，親手合閘再發四人名單；停火線在原接線台發第17號調令。兩法都到南側讀本次回覆並簽收。';
    this.relay.hints=[this.flow.channels['public-dispatch'].message,this.flow.channels['ceasefire-line'].message];
  }
  bindPart(task, key, node) { this.originalParts.set(`${task.id}:${key}`, { task, key, node: task.parts[key] }); task.parts[key] = node; }
  get complete() { return this.status.complete; }
  get handsOccupied() { return this.status.pouch.carrier === 'player'; }
  get carrying() { return this.handsOccupied; }
  toast(message) { this.callbacks.toast?.(message); }
  near(position, radius = 2.3) { return gap(this.player.position, vector(position)) <= radius + 1e-8; }
  requireNear(position, radius = 2.3) { if (!position || !this.near(position, radius)) throw Error('請親自走到所選實體操作點旁。'); }
  visible(node, allowed = []) {
    // The code plate is rendered in the static batch; its co-located query mesh
    // intentionally stays invisible to avoid a second draw. Other hidden targets fail.
    const codeQuery = node && node === this.props.parts['receiver-code-plate'];
    if (!node || (node.visible === false && !codeQuery) || this.props.group.visible === false) return false;
    node.updateWorldMatrix(true, true);
    const bounds = new THREE.Box3().setFromObject(node);
    const target = bounds.isEmpty() ? node.getWorldPosition(new THREE.Vector3()) : bounds.getCenter(new THREE.Vector3()), origin = this.player.position.clone(); origin.y = 1.55;
    const boxes = new Set(allowed);
    node.traverse(n => { const b = this.world.solidBoxes.get(n); if (b) boxes.add(b); });
    const hit = this.world.trace(origin, target);
    return !hit || boxes.has(hit.box) || hit.distance >= origin.distanceTo(target) - .06;
  }
  requireVisible(node, allowed = []) { if (!this.visible(node, allowed)) throw Error('實體被遮住，請走到可直接操作的一側。'); }
  dispatch(type, payload = {}) {
    const result = recordSignalEvent(this.id, this.progress, { id: `signal-event-${++this.serial}`, type, ...payload });
    for (const e of result.effects) if (!SIGNAL_EFFECT_TYPES.includes(e.type)) throw Error(`Unhandled signal effect: ${e.type}`);
    this.progress = result.state; this.status = result.status;
    for (const effect of result.effects) if (!this.appliedEffects.has(effect.effectId)) { this.apply(effect); this.appliedEffects.add(effect.effectId); }
    return result;
  }
  apply(effect) {
    switch (effect.type) {
      case 'showSignalEvidence': case 'showSignalContacts': case 'confirmSignalPower': case 'verifyCompleteRoster':
      case 'selectSignalChannel': case 'setTraceBranchState': case 'setSignalEndpoint': case 'confirmSignalReply': case 'setSignalPouchCarrier': break;
      case 'invalidateSignalProof': this.props.clearReply(); break;
      case 'sendSignalMessage': {
        const { messageId, revision, rosterId, contentIds, receiverId } = effect;
        this.props.requestReply({ messageId, revision, rosterId, contentIds, receiverId }); break;
      }
      case 'setActorOrder':
        for (const id of effect.actorIds) {
          const enemy = this.enemies.find(e => e.id === id);
          if (!enemy || enemy.hp <= 0) continue;
          this.orders.set(id, { order: effect.order, targetId: effect.targetId });
          if (effect.resetEngagement) { enemy.engaged = false; enemy.alert = 0; enemy.windup = 0; }
          delete enemy.signalPath; delete enemy.signalInvestigation;
        } break;
      case 'announceSignalResponse': this.warning = effect.text; break;
      case 'setResponseState': break; // status is authoritative; no spawning or ammo refill.
      case 'transferSignalPouch': this.props.receivePouch(); break;
      case 'issueSignalReceipt': this.toast('奧林已簽收本次完整名單；由南側帶回條撤離。'); break;
      case 'recoverableMistake': this.callbacks.effect?.({ alertDelta: effect.alertDelta, exposureSeconds: effect.exposureSeconds, permanentDamage: 0, blocksInput: false, message: effect.message }, { taskId: 'signal-flow', position: point(this.player.position) }); this.toast(effect.message); break;
      default: throw Error(`Unhandled signal effect: ${effect.type}`);
    }
  }
  observeClue(id) {
    const source = this.flow.evidence[id]; if (!source) return '';
    this.dispatch('evidence-observed', { sourceId: id, recordId: source.recordId, playerPosition: point(this.player.position) }); return source.text;
  }
  snapshot() { return { contactSnapshot: this.props.readContacts(), endpointSnapshot: this.props.readEndpoint() }; }
  syncContacts() {
    const contactSnapshot = this.props.readContacts();
    if (!same(contactSnapshot, this.status.contactSnapshot)) this.dispatch('contacts-observed', { contactSnapshot, playerPosition: point(this.player.position) });
  }
  recordStep(task, step) {
    if (task === this.patch && task.inspections.has(step.id) && this.field.recorded(task, step)) {
      this.requireNear(task.position); this.requireVisible(task.parts[step.target], step.target==='roster-sheet' ? [this.props.pouchCollider] : []);
      if (step.id === 'inspect-full-roster') { const r = this.props.readRoster(); return `信袋內 ${r.batch}：${r.memberIds.join('、')}。請與值班表逐項核對。`; }
      if (step.id === 'inspect-receiver-code') { const r = this.props.readReceiverCode(); return `收件牌：${r.batch}，南側奧林（${r.receiverId}）。`; }
    }
    if (task === this.relay && ['relay-west', 'relay-south'].includes(step.id)) {
      const target = this.flow.endpoints[step.id]; this.requireNear(target.position, target.radius);
      const actual = this.props.readEndpoint(step.id);
      if (!actual.connected) throw Error('中繼刀閘尚未真正接合。');
      // Original FieldSystem has just moved this exact borrowed knife.
      this.props.connectEndpoint(step.id, true);
      this.dispatch('endpoint-connected', { ...this.props.readEndpoint(), playerPosition: point(this.player.position) });
      return '已接入這個實體中繼；可按本地發送鍵，南側查看本次回覆。';
    }
    return '';
  }
  available(task) { return task !== this.relay || Boolean(this.status.localChoices.channel); }
  interactionRadius(task, fallback = 2.3) { return [this.earth,this.patch,this.relay].includes(task) ? Math.min(fallback,2.3) : fallback; }
  beforeCargo() { return !this.handsOccupied; }
  route(task, step, route) { return route; }
  beforeChoice(task, choice) {
    try {
      if (this.complete) throw Error('已簽收，現場接線封存。');
      if (!choice.success) return true;
      if (task === this.earth) {
        this.requireNear(this.flow.earth.position); this.syncContacts();
        if (!this.status.powerVerified) throw Error('先讀取真接地與電源，確認先接地再送電。');
      } else if (task === this.patch) {
        this.requireNear(task.position);
        if (choice.id !== 'verify-complete-roster') throw Error('本次需核對完整四人名單。');
        if (!['inspect-full-roster', 'inspect-receiver-code'].every(id => this.field.recorded(task, id) && task.inspections.has(id))) throw Error('先實際查看信袋紙頁與收件牌。');
        // Each inspection already required a true view; compare current contents
        // here without requiring two differently facing documents in one ray.
        const code = this.props.readReceiverCode(), roster = this.props.readRoster();
        if (code.receiverId !== this.flow.receiver.id || code.batch !== roster.batch) throw Error('收件牌與名單批次不符。');
        this.dispatch('roster-verified', { ...roster, playerPosition: point(this.player.position) });
        if (!this.status.rosterVerified) return false;
      } else if (task === this.relay) {
        const expected = this.status.fieldChoices['signal-relay'];
        if (choice.id !== expected || !this.status.transmission) throw Error('先在所選實體接點發送本次訊息，再確認此方案。');
        this.requireNear(this.sourcePosition());
        const live = this.snapshot();
        if (!same(live.contactSnapshot, this.status.contactSnapshot) || !same(live.endpointSnapshot, this.status.endpointSnapshot)) throw Error('接點已改變，請修復並重送。');
      }
      return true;
    } catch (error) { this.toast(error.message); return false; }
  }
  beforeFieldAction(action, dataset = {}) {
    this.pendingFieldTask = this.field.active || this.field.traversal?.task;
    const task = this.pendingFieldTask;
    if (!task || action === 'field-close') return true;
    try {
      if (this.complete && !['field-view', 'field-focus'].includes(action)) throw Error('回條已簽收，接線封存。');
      const step = this.field.step(task, dataset.step);
      if (['field-adjust', 'field-seat', 'field-inspect', 'field-step'].includes(action)) {
        this.requireNear(step?.position || task.position, step?.radius || 2.3);
        // The inspection callback runs after Field.record, so use the same LOS
        // predicate here before that mutation; don't permit the table as an occluder.
        const allowed = task===this.patch ? (step?.target==='roster-sheet' ? [this.props.pouchCollider] : []) : [task.collider];
        if (step?.target && task.parts[step.target]) this.requireVisible(task.parts[step.target], allowed);
      }
      if (task===this.relay && step && ['relay-west','relay-south'].includes(step.id) && action==='field-step') {
        if(this.status.localChoices.channel!=='public-dispatch' || (this.status.localChoices.endpoint && this.status.localChoices.endpoint!==step.id)) throw Error('只能操作本次選定的公開中繼。');
        this.requireNear(this.flow.endpoints[step.id].position,this.flow.endpoints[step.id].radius);
      }
      if (step?.id === 'dispatch-order-sent') throw Error('請使用接線台上本次調令的發送鍵。');
      if (task === this.earth && ['field-adjust', 'field-seat'].includes(action)) this.syncContacts();
      return true;
    } catch (error) { this.toast(error.message); return false; }
  }
  afterFieldAction(action) {
    const task = this.pendingFieldTask; this.pendingFieldTask = null;
    if (task === this.earth && ['field-adjust', 'field-seat'].includes(action)) this.syncContacts();
  }
  sourcePosition() { return this.status.localChoices.channel === 'public-dispatch' ? this.flow.endpoints[this.status.localChoices.endpoint]?.position : this.flow.patch.position; }
  sourceKey() { return this.status.localChoices.channel === 'public-dispatch' ? this.status.localChoices.endpoint : null; }
  controls(task) {
    const notice = this.interactionNotice ? `<p class="banner" role="status">${esc(this.interactionNotice)}</p>` : '';
    if (task === this.earth) return `${notice}<p>拔地線或關電會使本次回覆失效；需重新送電與重送。</p>${button('power', '讀取接地與電源')}${this.field.done(task) ? this.earthRepairControls() : ''}`;
    if (task === this.patch) return notice + this.patchControls();
    if (task === this.relay) return `${notice}<p>使用選定中繼的真發送鍵。完成後到南側奧林處讀取本次回覆。</p>${this.sendControls()}`;
    return '';
  }
  earthRepairControls() {
    const ground = this.field.allSteps(this.earth).find(s => s.kind === 'socket-match'), power = this.field.allSteps(this.earth).find(s => s.kind === 'ordered-lever');
    return `${button('earth-adjust', '插頭向左', `data-step="${ground.id}" data-delta="-1"`)}${button('earth-adjust', '插頭向右', `data-step="${ground.id}" data-delta="1"`)}${button('earth-seat', '推入插頭', `data-step="${ground.id}"`)}${button('earth-adjust', '電源退下', `data-step="${power.id}" data-delta="-1"`)}${button('earth-adjust', '電源送上', `data-step="${power.id}" data-delta="1"`)}`;
  }
  patchControls() {
    const selected = this.status.localChoices.channel;
    return `<p>選線與支路開關位於接線台正面；若被台身遮住，返回現場移到南側操作。公開驛線傳出四人名單；停火線傳送調令，完整信袋親送南側。</p>${Object.entries(this.flow.channels).map(([id, c]) => button('channel', c.title, `data-choice="${id}"`, Boolean(selected && selected !== id))).join('')}${button('branch', this.status.traceConnected ? '切開追線支路（主線保留）' : '重新接合追線支路', `data-connected="${!this.status.traceConnected}"`)}${selected === 'ceasefire-line' ? this.sendControls() + button('submit-relay','確認本次調令方案') + button('pickup', '拿起完整名單信袋', '', this.handsOccupied || this.complete) : ''}`;
  }
  sendControls() { return `${button('send', '按鍵傳送四人名單', 'data-content="full-roster"')}${button('send', '按鍵傳送第17號調令', 'data-content="standdown-order"')}`; }
  nearest() {
    const candidates = [], add = (kind, position, radius, title, extra = {}) => { if (this.near(position, radius)) candidates.push({ type: 'mission', kind, position, radius, title, distance: gap(this.player.position, vector(position)), ...extra }); };
    if (this.field.done(this.earth)) add('earth', this.flow.earth.position, 2.3, '接地與電源／修復');
    if (this.field.done(this.patch)) add('patch', this.flow.patch.position, 2.3, '接線台／信袋');
    if (this.status.localChoices.channel === 'public-dispatch') for (const [id, endpoint] of Object.entries(this.flow.endpoints)) {
      if (!this.status.localChoices.endpoint || this.status.localChoices.endpoint === id) add('endpoint', endpoint.position, endpoint.radius, endpoint.title, { endpointId: id });
    }
    if (this.status.localChoices.channel === 'ceasefire-line' && !this.handsOccupied && !this.complete) add('pouch', point(this.props.pouch.position), this.flow.pouch.radius, '同一只完整名單信袋');
    if (this.handsOccupied) add('carrying', point(this.player.position), 1, '放下信袋／繼續搬運');
    add('receiver', point(this.props.receiver.position), this.flow.receiver.radius, this.complete ? '奧林的回條／確認撤離' : '奧林的南側收件台');
    // Delivery takes precedence over the carried object's interaction at distance zero.
    return candidates.sort((a,b) => (a.kind === 'receiver' ? -1 : b.kind === 'receiver' ? 1 : a.distance - b.distance))[0] || null;
  }
  interact(nearby) {
    if (!nearby || nearby.type !== 'mission' || !this.near(nearby.position, nearby.radius)) return false;
    this.activeInteraction = nearby;
    if (nearby.kind === 'earth' || nearby.kind === 'patch') {
      const task = this[nearby.kind]; this.field.active = task; this.field.focus(task); this.field.renderPanel(); return true;
    }
    let controls = '';
    if (nearby.kind === 'endpoint') {
      const id = nearby.endpointId;
      controls = button('connect', '親手接通此中繼刀閘', `data-endpoint="${id}" data-connected="true"`) + button('connect', '斷開此刀閘', `data-endpoint="${id}" data-connected="false"`) + this.sendControls() + button('submit-relay', '確認此中繼發送方案');
    } else if (nearby.kind === 'receiver') controls = button('reply', '讀取桌上本次回覆紙與燈') + button('confirm', '交完整名單／確認通行');
    else if (nearby.kind === 'pouch') controls = button('pickup', '拿起這只信袋');
    else if (nearby.kind === 'carrying') controls = button('drop', '把同一信袋放在腳邊');
    this.callbacks.panel?.(`<p class="eyebrow">SIGNAL FIELD</p><h2>${esc(nearby.title)}</h2><p>${esc(this.objective())}</p>${nearby.kind === 'receiver' ? '<p>回覆紙與燈面朝收件台南側；請從桌前讀取，再向奧林確認。</p>' : ''}${this.interactionNotice ? `<p class="banner" role="status">${esc(this.interactionNotice)}</p>` : ''}<div class="actions">${controls}${button('close', '返回現場')}</div>`);
    return true;
  }
  handle(action, dataset = {}) {
    if (!String(action).startsWith('signal-') || this.disposed) return false;
    this.interactionNotice = null;
    try {
      if (action === 'signal-close') { this.activeInteraction = null; this.field.close(); return true; }
      if (this.complete && !['signal-confirm', 'signal-reply'].includes(action)) throw Error('已簽收的名單與接線封存。');
      if (action === 'signal-power') {
        this.requireNear(this.flow.earth.position); this.requireVisible(this.earth.parts['earth-plug'], [this.earth.collider]); this.syncContacts();
        this.dispatch('power-verified', { contactSnapshot: this.props.readContacts(), playerPosition: point(this.player.position) });
      } else if (['signal-earth-adjust', 'signal-earth-seat'].includes(action)) this.repairEarth(action, dataset);
      else if (action === 'signal-channel') {
        this.requireNear(this.flow.patch.position); this.requireVisible(this.props.parts[this.flow.patch.selectorId]);
        if (!this.field.done(this.patch) || this.field.pendingEffects.length || !this.status.powerVerified) throw Error('先完成接地與名單工作，返回現場結清，再選線。');
        if (this.status.localChoices.channel && this.status.localChoices.channel !== dataset.choice) throw Error('本次線路已選定。');
        if (!Object.hasOwn(this.flow.channels, dataset.choice)) throw Error('未知線路。');
        this.props.setChannel(dataset.choice);
        this.dispatch('channel-selected', { choiceId: dataset.choice, selectorAngle: this.props.readChannelAngle(), playerPosition: point(this.player.position) });
        this.relay.choices = this.originalChoices.get(this.relay).filter(c => dataset.choice === 'ceasefire-line' ? c.id === 'ceasefire-dispatch' : ['public-west-relay','public-south-relay'].includes(c.id));
      } else if (action === 'signal-branch') {
        this.requireNear(this.flow.traceBranch.position); this.requireVisible(this.props.parts[this.flow.traceBranch.id]);
        if (!['true','false'].includes(dataset.connected)) throw Error('未知支路操作。');
        this.props.setTraceBranch(dataset.connected === 'true');
        this.dispatch('trace-branch-operated', { angle: this.props.readTraceBranchAngle(), playerPosition: point(this.player.position) });
      } else if (action === 'signal-connect') this.connect(dataset);
      else if (action === 'signal-send') this.send(dataset.content);
      else if (action === 'signal-submit-relay') this.submitRelay();
      else if (action === 'signal-reply') this.observeReply();
      else if (action === 'signal-pickup') this.pickup();
      else if (action === 'signal-drop') this.drop();
      else if (action === 'signal-confirm') this.confirmHandoff();
      else return false;
      if (this.field.active) this.field.renderPanel();
    } catch (error) {
      this.interactionNotice = error.message;
      this.toast(error.message);
      // A modal blurs the scene/HUD toast. Keep recovery instructions inside
      // the active panel while preserving the real reach and occlusion checks.
      if (this.field.active) this.field.renderPanel();
      else if (this.activeInteraction && !this.complete) this.interact(this.activeInteraction);
    }
    return true;
  }
  repairEarth(action, dataset) {
    this.requireNear(this.flow.earth.position);
    const step = this.field.step(this.earth, dataset.step);
    if (!step || !['socket-match','ordered-lever'].includes(step.kind) || ![-1,1].includes(Number(dataset.delta || 1))) throw Error('未知接地操作。');
    this.requireVisible(this.earth.parts[step.target], [this.earth.collider]); this.syncContacts();
    // Field history describes the earlier completed repair. Preserve it while moving
    // the same physical parts; the live signal revision independently invalidates proof.
    const saved = structuredClone(this.field.state);
    try { if (action === 'signal-earth-seat') this.field.seat(this.earth, step); else this.field.adjust(this.earth, step, Number(dataset.delta)); }
    finally { if (saved.completed.includes(this.earth.id)) this.field.state = saved; }
    this.syncContacts();
  }
  connect(dataset) {
    const target = this.flow.endpoints[dataset.endpoint];
    if (!target || !['true','false'].includes(dataset.connected) || this.status.localChoices.channel !== 'public-dispatch') throw Error('先選公開驛線與一個實體中繼。');
    this.requireNear(target.position, target.radius);
    if (this.status.localChoices.endpoint && this.status.localChoices.endpoint !== dataset.endpoint) throw Error('本次只接所選中繼；可在同一處修復。');
    if (!this.status.localChoices.endpoint && dataset.connected === 'false') throw Error('尚未選定接點。');
    this.requireVisible(this.props.parts[`${dataset.endpoint}-knife`], [this.world.solidBoxes.get(this.relay.parts[dataset.endpoint])]);
    this.props.connectEndpoint(dataset.endpoint, dataset.connected === 'true');
    this.dispatch('endpoint-connected', { ...this.props.readEndpoint(), playerPosition: point(this.player.position) });
    if (this.props.readEndpoint().connected && !this.field.recorded(this.relay, dataset.endpoint)) this.field.record(this.relay, this.field.step(this.relay, dataset.endpoint));
  }
  send(content) {
    const source = this.sourcePosition(), key = this.sourceKey();
    if (!source) throw Error('先接通所選中繼。'); this.requireNear(source); this.requireVisible(this.props.keys.get(key));
    if (!['full-roster','standdown-order'].includes(content)) throw Error('請選要傳送的內容。');
    const roster = this.props.readRoster();
    this.props.pressKey(key, true);
    try {
      const result = this.dispatch('message-sent', { messageId: `signal-message-${++this.messageSerial}`, rosterId: roster.rosterId, contentIds: content === 'full-roster' ? roster.memberIds : ['standdown-order-17'], keyAngle: this.props.readKeyAngle(key), ...this.snapshot(), playerPosition: point(this.player.position) });
      if (result.effects.some(e => e.type === 'sendSignalMessage') && this.status.localChoices.channel === 'ceasefire-line') {
        const step = this.field.step(this.relay, 'dispatch-order-sent');
        if (!this.field.recorded(this.relay, step)) this.field.record(this.relay, step);
      }
    } finally { this.props.pressKey(key, false); }
  }
  submitRelay() {
    this.requireNear(this.sourcePosition()); const choice = this.status.fieldChoices['signal-relay'];
    if (!choice) throw Error('本次尚未選定發送接點。');
    this.field.active = this.relay; this.field.choose(this.relay, choice);
  }
  observeReply() {
    this.requireNear(point(this.props.receiver.position), this.flow.receiver.radius);
    this.requireVisible(this.props.parts['reply-paper']); this.requireVisible(this.props.parts['reply-lamp']);
    const reply = this.props.readReply(); if (!reply) throw Error('尚未出現本次回覆；返回現場，等實體紙燈呈現後再讀。');
    this.dispatch('reply-observed', { reply, ...this.snapshot(), playerPosition: point(this.player.position) });
  }
  pickup() {
    const p = this.props.readPouch(); this.requireNear([p.position[0],p.position[2]], Math.min(this.flow.pouch.radius, this.flow.pouch.tether)); this.requireVisible(this.props.pouch);
    if (this.handsOccupied) return;
    this.dispatch('pouch-picked-up', { entityId: p.entityId, pouchPosition: [p.position[0],p.position[2]], playerPosition: point(this.player.position) });
    this.props.setPouchPose(p.position, { grounded: false });
  }
  drop() {
    const p = this.props.readPouch();
    this.dispatch('pouch-dropped', { entityId: p.entityId, pouchPosition: [p.position[0],p.position[2]], playerPosition: point(this.player.position) });
    this.props.setPouchPose([p.position[0], .025, p.position[2]], { grounded: true });
  }
  constrainMove(previous, proposed) { return this.handsOccupied ? tetherPosition(previous, proposed, this.props.pouch.position, this.flow.pouch.tether) : proposed; }
  movePouch(dt) {
    if (!this.handsOccupied || !Number.isFinite(dt) || dt <= 0) return;
    const from = this.props.pouch.position, target = this.player.position, length = gap(from, target), amount = Math.min(Math.max(0,length - .65), dt * 4.6);
    if (amount <= 0) return;
    const colliders = this.world.colliders.filter(b => b !== this.props.pouchCollider), steps = Math.max(1, Math.ceil(amount/.08));
    for (let i=0;i<steps;i++) {
      const dx = target.x-from.x, dz=target.z-from.z, d=Math.hypot(dx,dz); if (d<=.65) break;
      const moved = moveCircle(from, dx/d*amount/steps, dz/d*amount/steps, colliders, .3, 23);
      this.props.setPouchPose([moved.x, Math.max(.55, from.y - dt*2/steps), moved.z], { grounded:false });
    }
  }
  confirmHandoff() {
    this.requireNear(point(this.props.receiver.position), this.flow.receiver.radius); this.requireVisible(this.props.receiver.object);
    if (!this.field.complete || this.field.pendingEffects.length) throw Error('先完成三項工作並返回現場，結清原工作效果。');
    const kills = this.callbacks.kills?.() ?? this.status.defeatedActors.length;
    if (kills !== this.status.defeatedActors.length || kills !== this.enemies.filter(e=>e.hp<=0).length) throw Error('守軍傷亡與現場紀錄不同。');
    if (kills && this.enemies.some(e=>e.hp>0)) throw Error('仍有守軍在場；清場後回收件台確認。');
    if (!kills && Object.keys(this.flow.evidence).some(id=>!this.status.evidence[id])) throw Error('非致命通行需三份真實線索。');
    const p = this.props.readPouch(), roster = this.props.readRoster();
    if (this.handsOccupied) { this.requireVisible(this.props.pouch); this.props.preparePouchTransfer(); }
    this.dispatch('roster-received', { receiverId:this.flow.receiver.id, receiverPosition:point(this.props.receiver.position), playerPosition:point(this.player.position), rosterId:roster.rosterId, memberIds:roster.memberIds, replyTo:this.status.reply?.messageId || 'unobserved', pouchPosition:this.status.localChoices.channel==='ceasefire-line' ? [p.position[0],p.position[2]] : null, ...this.snapshot() });
    if (!this.callbacks.secured?.()) this.callbacks.secure?.(kills ? 'combat' : 'nonlethal');
  }
  defeated(id) { const e=this.enemies.find(e=>e.id===id); if (!e || e.hp>0) throw Error('Only an actually defeated existing signal guard can be recorded'); this.dispatch('actor-defeated',{actorId:id}); }
  controlEnemy(enemy,dt) {
    const order=this.orders.get(enemy.id);
    if (!order || order.order==='guard' || enemy.hp<=0 || this.callbacks.secured?.() || enemy.engaged || enemy.suppressed>0) return false;
    const authored=this.flow.actors[enemy.id], endpoint=this.flow.endpoints[order.targetId];
    const target=order.order==='investigate' && endpoint ? this.investigationTarget(enemy,order.targetId) : vector(order.order==='standdown' ? authored.standdownPosition || authored.position : authored.position);
    if (order.order==='investigate' && gap(enemy.actor.position,this.player.position)<10) { enemy.alert=5; return false; }
    enemy.state=order.order==='investigate' ? 'inspect-signal' : order.order==='standdown' ? 'standdown' : 'standby';
    if(target) this.moveOrderedEnemy(enemy,target,1.6,dt); else this.world.animate(enemy.actor,'idle'); enemy.windup=0; return true;
  }
  investigationTarget(enemy,id) {
    const geometry=tacticalGeometryKey(this.world.colliders,.38,23),cached=enemy.signalInvestigation;
    if(cached?.geometry===geometry && cached.id===id) return cached.target;
    // The relay's centre is solid machinery. Select a reachable adjacent station,
    // never push an actor into it or alter the actual device/player/NPC position.
    const p=this.flow.endpoints[id].position;
    const candidates=[[0,1.7],[1.7,0],[0,-1.7],[-1.7,0]].map(([x,z])=>vector([p[0]+x,p[1]+z])).sort((a,b)=>gap(enemy.actor.position,a)-gap(enemy.actor.position,b));
    const target=candidates.find(to=>planTacticalPath({from:enemy.actor.position,to,colliders:this.world.colliders,radius:.38,bounds:23,maxDistance:64})) || null;
    enemy.signalInvestigation={geometry,id,target};return target;
  }
  moveOrderedEnemy(enemy,target,speed,dt) {
    if (enemy.hp<=0 || !Number.isFinite(dt) || dt<=0) return;
    const from=enemy.actor.position, colliders=this.world.colliders, geometry=tacticalGeometryKey(colliders,.38,23); let cache=enemy.signalPath;
    if (!cache || cache.geometry!==geometry || gap(cache.goal,target)>.1) {
      const options={from,to:target,colliders,radius:.38,bounds:23,maxDistance:64}; const proof=certifyTacticalPath(planTacticalPath(options),options,moveCircle);
      cache=enemy.signalPath={geometry,goal:{x:target.x,z:target.z},path:proof.ok?proof.path.slice(1):[]};
    }
    while(cache.path.length && gap(from,cache.path[0])<=.025) cache.path.shift(); const waypoint=cache.path[0];
    if (!waypoint || !tacticalSegmentClear({from,to:waypoint,colliders,radius:.38,bounds:23})) { if(waypoint) delete enemy.signalPath; this.world.animate(enemy.actor,'idle'); return; }
    const dx=waypoint.x-from.x,dz=waypoint.z-from.z,length=Math.hypot(dx,dz),amount=Math.min(length,speed*dt),steps=Math.max(1,Math.ceil(amount/.1));
    for(let i=0;i<steps;i++) { const next=moveCircle(from,dx/length*amount/steps,dz/length*amount/steps,colliders,.38,23); from.x=next.x;from.z=next.z; }
    enemy.actor.object.rotation.y=Math.atan2(dx,dz);this.world.animate(enemy.actor,'walk');
  }
  update(dt) {
    if(this.disposed || !Number.isFinite(dt) || dt<=0) return;
    this.props.update(dt); this.movePouch(dt);
    if(this.status.response.status==='warned') {
      if(!this.status.response.presented) { this.toast(this.warning);this.dispatch('response-warning-presented',{responseId:this.flow.response.id}); }
      else this.dispatch('response-activated',{responseId:this.flow.response.id});
    }
  }
  objective() {
    if(!this.status.powerVerified) return '核對電線，先接地再送電，讀取真接點。';
    if(!this.status.rosterVerified) return '找齊三份線索，核對同一信袋四張名單與南側收件牌。';
    if(!this.status.localChoices.channel) return '在接線台選公開驛線或停火線；兩線都須完整收件。';
    if(!this.status.transmission) return '公開線選一個既有中繼；停火線在接線台，按真發送鍵。';
    if(!this.status.reply) return '到南側奧林收件台，親自讀取本次回覆紙與燈。';
    if(!this.complete) return this.status.localChoices.channel==='ceasefire-line' ? '把同一只完整名單信袋搬至奧林身旁，確認簽收。' : '在奧林身旁簽收完整公開名單的本次回條。';
    return '帶奧林簽署的本次完整名單回條，從南側撤離。';
  }
  labels() {
    const entries=[{position:{x:this.props.receiver.position.x,y:1.9,z:this.props.receiver.position.z},text:'◇ 奧林／本次回覆與收件'}];
    if(this.status.localChoices.channel==='public-dispatch') for(const[id,e]of Object.entries(this.flow.endpoints)) if(!this.status.localChoices.endpoint || this.status.localChoices.endpoint===id) entries.push({position:{x:e.position[0],y:1.6,z:e.position[1]},text:`◇ ${e.title}`});
    if(this.status.localChoices.channel==='ceasefire-line' && !this.complete) entries.push({position:{x:this.props.pouch.position.x,y:1.9,z:this.props.pouch.position.z},text:this.handsOccupied?'同一信袋／雙手占用':'◇ 完整名單信袋'});
    return entries;
  }
  diagnostics() { return { kind:'signal',version:1,missionId:this.id,contacts:this.props.readContacts(),endpoint:this.props.readEndpoint(),channelAngle:this.props.readChannelAngle(),traceBranchAngle:this.props.readTraceBranchAngle(),reply:this.props.readReply(),roster:this.props.readRoster(),pouch:this.props.readPouch(),receiver:{id:this.flow.receiver.id,position:point(this.props.receiver.position)},handsOccupied:this.handsOccupied,orders:Object.fromEntries([...this.orders].map(([id,o])=>[id,{...o}])),pendingFieldEffects:this.field.pendingEffects.length }; }
  dispose() {
    if(this.disposed) return; this.disposed=true; this.props.dispose();
    for(const[task,choices]of this.originalChoices) task.choices=choices;
    for(const[task,text]of this.originalText) Object.assign(task,text);
    for(const{task,key,node}of this.originalParts.values()) { if(node===undefined) delete task.parts[key]; else task.parts[key]=node; }
    for(const e of this.enemies) { delete e.signalPath;delete e.signalInvestigation; }
    this.orders.clear();this.appliedEffects.clear();this.originalParts.clear();this.originalChoices.clear();this.originalText.clear();
  }
}
