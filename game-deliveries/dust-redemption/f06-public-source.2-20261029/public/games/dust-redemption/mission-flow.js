/** Current mission flow v2. Deterministic events; no timer, DOM or game writes. */
import {
  MISSION_FLOW as V1_FLOW,
  canonicalMissionProgress as canonicalV1,
  validMissionFlowRecord as validV1Record,
} from './mission-flow-v1.js';

const clone = value => JSON.parse(JSON.stringify(value));
const freeze = value => { if (value && typeof value === 'object') { Object.values(value).forEach(freeze); Object.freeze(value); } return value; };
const plain = value => Boolean(value && typeof value === 'object' && !Array.isArray(value) && [Object.prototype, null].includes(Object.getPrototypeOf(value)));
const stable = value => JSON.stringify(Array.isArray(value) ? value.map(v => JSON.parse(stable(v))) : plain(value) ? Object.fromEntries(Object.keys(value).sort().map(key => [key, JSON.parse(stable(value[key]))])) : value);
const same = (a, b) => stable(a) === stable(b);
const fail = message => { throw new Error(`Mission flow v2: ${message}`); };
const need = (condition, message) => { if (!condition) fail(message); };
const exact = (value, keys, label) => need(plain(value) && Object.keys(value).length === keys.length && keys.every(key => Object.hasOwn(value, key)), `${label} has missing/unknown fields`);
const point = value => Array.isArray(value) && value.length === 2 && value.every(n => typeof n === 'number' && Number.isFinite(n) && Math.abs(n) <= 23);
const distance = (a, b) => Math.hypot(a[0] - b[0], a[1] - b[1]);
const near = (a, b, radius, message) => need(distance(a, b) <= radius, message);
const authored = clone(V1_FLOW);
const mail = authored['dry-mail'];
mail.version = 2;
mail.title = '沒有寄出的信：現場協商與藥箱交接';
mail.negotiation = { actorId: 'mail-1', interactionRadius: 2.8, holdTargetId: 'mail-inspector-post', relayActorIds: ['mail-2', 'mail-3', 'mail-4'], relayTargetId: 'mail-aid-hold' };
mail.communication.connectedAngle = -0.55;
mail.communication.disconnectedAngle = 0.9;
mail.communication.angleTolerance = 0.04;
mail.communication.label = '哨兵通訊接點：斷開、復接或傳達互助承諾';
mail.communication.message = '通訊已斷，待命哨兵停止查驗。復接後會接續原來的查驗；共同醫護承諾也須接通才能傳達。';
mail.response.warning = '北側哨位傳來一次查驗呼叫。可斷開同一通訊接點，或在保線狀態傳達已接受的共同醫護安排。';
mail.decision.choices['clinic-direct'].message = '診所保留兩份藥。查驗者接受資料後不再阻攔，其餘守軍部署與一次查驗仍保留。';
mail.decision.choices['mutual-aid'].message = '診所與守軍醫護各一份；到同一通訊接點保線傳達後，其餘守軍才停止干預。';
export const MISSION_FLOW = freeze(authored);
const definition = id => { need(Object.hasOwn(MISSION_FLOW, id), 'unknown mission'); return MISSION_FLOW[id]; };
const eventKeys = {
  'evidence-observed': ['sourceId', 'recordId'],
  'seal-verification-attempted': ['reasonId'],
  'allocation-proposed': ['decisionId', 'choiceId'],
  'handoff-accepted': ['snapshot'],
  'handoff-reclaimed': ['entityId', 'playerPosition', 'cargoPosition'],
  'communication-disconnected': ['playerPosition', 'communicationSnapshot'],
  'communication-restored': ['playerPosition', 'communicationSnapshot'],
  'promise-relayed': ['playerPosition', 'communicationSnapshot'],
  'actor-defeated': ['actorId'],
  'cargo-picked-up': ['entityId', 'playerPosition', 'cargoPosition'],
  'cargo-dropped': ['entityId', 'playerPosition', 'cargoPosition'],
  'cargo-delivered': ['entityId', 'recipientId', 'playerPosition', 'cargoPosition'],
  'response-activated': ['responseId'],
  'worker-commanded': ['workerId', 'command', 'playerPosition', 'workerPosition'],
  'worker-safe': ['workerId', 'playerPosition', 'workerPosition'],
};
function validateEvent(event) {
  need(plain(event) && Object.hasOwn(eventKeys, event.type), 'unknown event type');
  exact(event, ['id', 'type', ...eventKeys[event.type]], 'event');
  need(typeof event.id === 'string' && /^[A-Za-z0-9][A-Za-z0-9:._-]{0,95}$/.test(event.id), 'invalid event ID');
  for (const key of eventKeys[event.type]) {
    if (key === 'snapshot') {
      const s = event.snapshot;
      exact(s, ['actorId', 'actorPosition', 'playerPosition', 'visible', 'alive', 'recordIds'], 'inspector snapshot');
      need(typeof s.actorId === 'string' && point(s.actorPosition) && point(s.playerPosition), 'invalid inspector position');
      need(typeof s.visible === 'boolean' && typeof s.alive === 'boolean', 'invalid inspector visibility/alive');
      need(Array.isArray(s.recordIds) && s.recordIds.length === 3 && s.recordIds.every(id => typeof id === 'string' && id.length > 0 && id.length <= 96), 'invalid presented records');
    } else if (key === 'communicationSnapshot') {
      const s = event.communicationSnapshot;
      exact(s, ['sourceId', 'leverAngle', 'connected', 'cableConnected'], 'communication snapshot');
      need(typeof s.sourceId === 'string' && Number.isFinite(s.leverAngle) && typeof s.connected === 'boolean' && typeof s.cableConnected === 'boolean', 'invalid communication snapshot');
    } else need(key.endsWith('Position') ? point(event[key]) : typeof event[key] === 'string' && event[key].length > 0 && event[key].length <= 96, `invalid ${key}`);
  }
}
function initial(flow) {
  return {
    evidence: {}, verified: false, rejectedReasons: [], proposedHandoff: null, handoffChoice: null, handoffMethod: null,
    communicationConnected: true, promiseRelayed: false,
    actors: Object.fromEntries(Object.entries(flow.actors).map(([id, actor]) => [id, { defeated: false, order: actor.initialOrder }])),
    response: { status: 'waiting', reason: null, warned: false, activated: false, pickupSeen: false },
    cargo: { holder: flow.objective.initialHolder, position: [...flow.objective.position], units: flow.objective.units },
    allocation: { clinic: 0, guard: 0 },
    worker: { command: 'wait', status: 'waiting', position: [...flow.worker.position] }, receipt: null,
  };
}
function verificationMatches(flow) {
  const manifest = flow.evidence['mail-manifest'].facts, board = flow.evidence['clinic-receiving-board'].facts, back = flow.evidence['consignment-backplate'].facts;
  return manifest.batch === back.batch && board.authorizedBatches.includes(manifest.batch) && manifest.units === back.units && back.units === flow.objective.units && manifest.recipientMark === board.recipientMark && back.recipientMark === board.recipientMark && board.validFrom <= manifest.shipmentDate && manifest.shipmentDate <= board.validUntil && back.sealStatus === 'original-intact';
}
function apply(flow, current, event) {
  const v = clone(current), effects = [], add = (type, data) => effects.push({ type, ...clone(data) });
  const duplicate = () => ({ view: current, effects: [], changed: false });
  const living = ids => ids.filter(id => !v.actors[id].defeated);
  const order = (ids, name, targetId) => {
    const changed = living(ids).filter(id => v.actors[id].order !== name);
    for (const id of changed) v.actors[id].order = name;
    if (changed.length) add('setActorOrder', { actorIds: changed, order: name, targetId });
  };
  const responseState = (status, reason) => {
    if (v.response.status === status && v.response.reason === reason) return;
    v.response.status = status; v.response.reason = reason;
    add('setResponseState', { responseId: flow.response.id, status, reason });
  };
  const warning = () => {
    if (!v.response.pickupSeen || v.response.warned || v.response.activated || v.promiseRelayed || !v.communicationConnected || !living(flow.response.actorIds).length) return;
    v.response.warned = true; v.response.status = 'warned'; v.response.reason = null;
    order(flow.response.actorIds, 'hold', 'mail-standby-posts');
    add('announceResponse', { responseId: flow.response.id, sourceId: flow.response.warningSourceId, actorIds: living(flow.response.actorIds), text: flow.response.warning, minimumAttackTelegraphMs: flow.response.minimumAttackTelegraphMs, spawn: false });
  };
  const checkCargo = () => need(event.entityId === flow.objective.id, 'unknown objective entity');
  const checkWire = connected => {
    const s = event.communicationSnapshot, c = flow.communication;
    need(s.sourceId === c.id && s.connected === connected && s.cableConnected === connected, 'wire identity/state mismatch');
    need(Math.abs(s.leverAngle - (connected ? c.connectedAngle : c.disconnectedAngle)) <= c.angleTolerance, 'lever does not match the real wire state');
    near(event.playerPosition, c.position, c.interactionRadius, 'communication action is outside real switch reach');
  };
  const accept = method => {
    need(v.verified && v.proposedHandoff && !v.receipt, 'verify and propose a handoff first');
    const selected = flow.decision.choices[v.proposedHandoff];
    v.handoffChoice = v.proposedHandoff; v.handoffMethod = method;
    for (const id of ['clinic-delivery', 'aid-delivery']) add('setRouteState', { routeId: id, open: id === selected.routeId });
    add('setAllocationPreview', { entityId: flow.objective.id, recipientId: selected.recipientId, allocation: selected.allocation, message: selected.message });
  };
  if (event.type === 'evidence-observed') {
    const source = flow.evidence[event.sourceId];
    need(source && source.recordId === event.recordId, 'unknown or mismatched evidence record');
    if (v.evidence[event.sourceId]) return duplicate();
    v.evidence[event.sourceId] = event.recordId;
    add('showEvidenceRecord', { sourceId: event.sourceId, recordId: event.recordId, title: source.title, facts: source.facts, text: source.text });
  } else if (event.type === 'seal-verification-attempted') {
    need(Object.hasOwn(flow.verification.reasons, event.reasonId), 'unknown verification reason');
    need(flow.verification.requiredSources.every(id => v.evidence[id] === flow.evidence[id].recordId), 'observe all three evidence sources before verification');
    if (v.verified || v.rejectedReasons.includes(event.reasonId)) return duplicate();
    const reason = flow.verification.reasons[event.reasonId];
    if (!reason.success) { v.rejectedReasons.push(event.reasonId); add('recoverableMistake', { ...flow.verification.mistake, message: reason.message }); }
    else { need(verificationMatches(flow), 'authored evidence does not support verification'); v.verified = true; add('setSealVerification', { entityId: flow.objective.id, verified: true, message: reason.message }); }
  } else if (event.type === 'allocation-proposed') {
    need(event.decisionId === flow.decision.id && Object.hasOwn(flow.decision.choices, event.choiceId), 'unknown local proposal');
    need(v.verified, 'verify the consignment before proposing allocation');
    if (v.proposedHandoff === event.choiceId) return duplicate();
    need(!v.handoffChoice && !v.receipt, 'accepted allocation is committed');
    v.proposedHandoff = event.choiceId;
    const selected = flow.decision.choices[event.choiceId];
    add('setAllocationProposal', { entityId: flow.objective.id, recipientId: selected.recipientId, allocation: selected.allocation, message: selected.message });
  } else if (event.type === 'handoff-accepted') {
    const s = event.snapshot;
    need(s.actorId === flow.negotiation.actorId && s.alive && !v.actors[s.actorId].defeated && s.visible, 'a living, visible inspector must accept in person');
    near(s.playerPosition, s.actorPosition, flow.negotiation.interactionRadius, 'inspector is outside speaking reach');
    need(same(s.recordIds, flow.verification.requiredSources.map(id => flow.evidence[id].recordId)) && flow.verification.requiredSources.every(id => v.evidence[id] === flow.evidence[id].recordId), 'present the three actually verified records');
    if (v.handoffChoice) { need(v.handoffMethod === 'negotiated', 'reclaimed handoff cannot become a negotiation'); return duplicate(); }
    accept('negotiated');
    order([flow.negotiation.actorId], 'hold', flow.negotiation.holdTargetId);
  } else if (event.type === 'handoff-reclaimed') {
    checkCargo();
    need(Object.values(v.actors).every(actor => actor.defeated), 'reclaim requires all four original guards defeated');
    near(event.cargoPosition, v.cargo.position, 0.08, 'reclaim must use the same stationary crate');
    near(event.playerPosition, event.cargoPosition, flow.objective.pickupRadius, 'reclaim must occur beside the real crate');
    if (v.handoffChoice) return duplicate();
    need(v.cargo.holder === flow.objective.initialHolder, 'reclaim must precede pickup');
    accept('reclaimed');
  } else if (event.type === 'communication-disconnected') {
    checkWire(false);
    if (!v.communicationConnected) return duplicate();
    v.communicationConnected = false;
    add('setCommunicationState', { sourceId: flow.communication.id, connected: false, message: v.promiseRelayed ? '通訊已斷。各哨已收到共同醫護承諾，繼續讓行；仍可復接這處接點。' : flow.communication.message });
    if (!v.promiseRelayed && living(flow.response.actorIds).length) {
      order(flow.response.actorIds, 'standby', 'mail-standby-posts');
      responseState('suppressed', 'communication-cut');
    }
  } else if (event.type === 'communication-restored') {
    checkWire(true);
    if (v.communicationConnected) return duplicate();
    v.communicationConnected = true;
    add('setCommunicationState', { sourceId: flow.communication.id, connected: true, message: v.promiseRelayed ? '通訊已復接。各哨已收到共同醫護承諾，繼續讓行。' : '通訊已復接，哨兵接續先前查驗；現在也可傳達已接受的共同醫護承諾。' });
    if (!v.promiseRelayed && living(flow.response.actorIds).length) {
      if (v.response.activated) {
        order(flow.response.actorIds, 'investigate', flow.objective.id);
        responseState('active', 'communication-restored');
      } else if (v.response.warned) {
        order(flow.response.actorIds, 'hold', 'mail-standby-posts');
        responseState('warned', 'communication-restored');
      } else { responseState('waiting', null); warning(); }
    }
  } else if (event.type === 'promise-relayed') {
    checkWire(true);
    need(v.communicationConnected, 'restore the same disconnected wire before relaying');
    need(v.handoffChoice === 'mutual-aid', 'relay requires an accepted mutual-aid allocation');
    if (v.promiseRelayed) return duplicate();
    v.promiseRelayed = true;
    order(flow.negotiation.relayActorIds, 'hold', flow.negotiation.relayTargetId);
    if (living(flow.response.actorIds).length) responseState(v.response.warned ? 'cancelled' : 'prevented', 'mutual-aid-relayed');
  } else if (event.type === 'actor-defeated') {
    need(Object.hasOwn(v.actors, event.actorId), 'unknown actor');
    if (v.actors[event.actorId].defeated) return duplicate();
    v.actors[event.actorId] = { defeated: true, order: 'defeated' };
    if (!living(flow.response.actorIds).length) responseState('neutralized', 'standby-actors-defeated');
  } else if (event.type === 'cargo-picked-up') {
    checkCargo(); need(v.verified && v.handoffChoice && !v.receipt, 'only an accepted, undelivered consignment can be picked up');
    if (v.cargo.holder === 'player') return duplicate();
    need([flow.objective.initialHolder, 'ground'].includes(v.cargo.holder), 'consignment is held by someone else');
    near(event.cargoPosition, v.cargo.position, 0.08, 'pickup cargo differs from its last grounded position');
    near(event.playerPosition, event.cargoPosition, flow.objective.pickupRadius, 'player is outside pickup reach');
    v.cargo.holder = 'player'; v.response.pickupSeen = true;
    add('setObjectiveCarrier', { entityId: flow.objective.id, holderId: 'player' }); warning();
  } else if (event.type === 'cargo-dropped') {
    checkCargo(); need(!v.receipt, 'delivered cargo cannot be dropped again');
    if (v.cargo.holder === 'ground' && same(v.cargo.position, event.cargoPosition)) return duplicate();
    need(v.cargo.holder === 'player', 'only the carrier can put cargo down');
    near(event.playerPosition, event.cargoPosition, flow.objective.pickupRadius, 'dropped cargo is outside carrier reach');
    v.cargo.holder = 'ground'; v.cargo.position = [...event.cargoPosition];
    add('setObjectiveCarrier', { entityId: flow.objective.id, holderId: 'ground', position: event.cargoPosition });
  } else if (event.type === 'response-activated') {
    need(event.responseId === flow.response.id, 'unknown response');
    if (v.response.activated) return duplicate();
    need(v.response.status === 'warned' && v.response.warned && v.communicationConnected && !v.promiseRelayed, 'response needs its original visible warning and a connected, unsuppressed line');
    v.response.activated = true;
    order(flow.response.actorIds, 'investigate', flow.objective.id);
    responseState('active', 'consignment-check');
  } else if (event.type === 'cargo-delivered') {
    checkCargo(); need(v.verified && v.handoffChoice, 'verify and obtain acceptance before delivery');
    const selected = flow.decision.choices[v.handoffChoice], recipient = flow.recipients[selected.recipientId];
    need(event.recipientId === selected.recipientId, 'wrong recipient for the accepted allocation');
    if (v.receipt) return duplicate();
    need(v.cargo.holder === 'player' && v.cargo.units === flow.objective.units, 'delivery requires the same complete carried consignment');
    near(event.playerPosition, recipient.position, recipient.radius, 'player has not reached receiving zone');
    near(event.cargoPosition, recipient.position, recipient.radius, 'cargo has not reached receiving zone');
    v.cargo = { holder: selected.recipientId, position: [...recipient.position], units: 0 };
    v.allocation = clone(selected.allocation);
    v.receipt = { id: `${flow.missionId}:v2:${v.handoffChoice}:receipt`, title: flow.receipt.title, objectiveEntityId: flow.objective.id, recipientId: selected.recipientId, allocation: clone(selected.allocation), grants: flow.receipt.grants };
    add('setObjectiveCarrier', { entityId: flow.objective.id, holderId: selected.recipientId, position: recipient.position });
    add('transferMedicine', { entityId: flow.objective.id, fromId: 'medicine-consignment', allocation: selected.allocation, units: 2 });
    add('issueReceipt', { receipt: v.receipt });
  } else if (event.type === 'worker-commanded') {
    need(event.workerId === flow.worker.id && ['follow', 'wait'].includes(event.command), 'unknown worker or command');
    need(v.worker.status !== 'safe', 'a safe worker stays at safety');
    near(event.playerPosition, event.workerPosition, flow.worker.interactionRadius, 'worker cannot hear a remote command');
    if (v.worker.command === event.command) return duplicate();
    if (v.worker.command === 'wait') near(event.workerPosition, v.worker.position, 0.08, 'waiting worker cannot move without a follow command');
    v.worker = { command: event.command, status: event.command === 'follow' ? 'following' : 'waiting', position: [...event.workerPosition] };
    add('setWorkerCommand', { actorId: flow.worker.id, command: event.command, position: event.workerPosition, safePosition: flow.worker.safePosition });
  } else if (event.type === 'worker-safe') {
    need(event.workerId === flow.worker.id, 'unknown worker');
    if (v.worker.status === 'safe') return duplicate();
    need(v.worker.command === 'follow', 'worker must be following before safe arrival');
    near(event.playerPosition, flow.worker.safePosition, flow.worker.safeRadius, 'player has not reached worker safety');
    near(event.workerPosition, flow.worker.safePosition, flow.worker.safeRadius, 'worker has not reached safety');
    v.worker = { command: 'wait', status: 'safe', position: [...event.workerPosition] };
    add('setActorOrder', { actorIds: [flow.worker.id], order: 'hold', targetId: 'porter-safe-point' });
    add('setRouteState', { routeId: flow.worker.benefitRouteId, open: true, message: flow.worker.benefit });
  }
  need(v.cargo.units + v.allocation.clinic + v.allocation.guard === flow.objective.units, 'medicine conservation violated');
  return { view: v, effects, changed: true };
}
function replay(id, state) {
  const flow = definition(id); exact(state, ['version', 'missionId', 'events'], 'state');
  need(state.version === 2 && state.missionId === id, 'state version/mission mismatch');
  need(Array.isArray(state.events) && state.events.length <= 256, 'event log must contain at most 256 entries');
  const ids = new Set(); let view = initial(flow);
  for (const event of state.events) {
    validateEvent(event); need(!ids.has(event.id), 'duplicate event ID in canonical log'); ids.add(event.id);
    const result = apply(flow, view, event); need(result.changed, 'redundant event in canonical log'); view = result.view;
  }
  return { flow, view };
}
function summary(flow, v) {
  return {
    version: 2, missionId: flow.missionId, objectiveEntityId: flow.objective.id, complete: Boolean(v.receipt), verified: v.verified,
    evidence: clone(v.evidence), missingEvidence: flow.verification.requiredSources.filter(id => !v.evidence[id]), verificationMistakes: v.rejectedReasons.length,
    proposedHandoff: v.proposedHandoff, handoffAccepted: Boolean(v.handoffChoice), handoffMethod: v.handoffMethod, promiseRelayed: v.promiseRelayed,
    localChoices: v.handoffChoice ? { handoff: v.handoffChoice } : {}, routeId: v.handoffChoice ? flow.decision.choices[v.handoffChoice].routeId : null,
    cargo: clone(v.cargo), allocation: clone(v.allocation), receipt: clone(v.receipt), response: clone(v.response),
    actors: clone(v.actors), defeatedActors: Object.keys(v.actors).filter(id => v.actors[id].defeated), communicationConnected: v.communicationConnected,
    workerSafe: v.worker.status === 'safe', workerStatus: v.worker.status, workerCommand: v.worker.command, workerPosition: [...v.worker.position],
    openedOptionalRoutes: v.worker.status === 'safe' ? [flow.worker.benefitRouteId] : [], rewardDelta: 0,
  };
}
export function createMissionProgress(id) { return { version: definition(id).version, missionId: id, events: [] }; }
export function recordMissionEvent(id, state, event) {
  const { flow, view } = replay(id, state); validateEvent(event);
  const existing = state.events.find(row => row.id === event.id);
  if (existing) { need(same(existing, event), 'event ID reused with different payload'); return { state: clone(state), accepted: false, duplicate: true, effects: [], status: summary(flow, view) }; }
  const result = apply(flow, view, event);
  if (!result.changed) return { state: clone(state), accepted: false, duplicate: true, effects: [], status: summary(flow, view) };
  need(state.events.length < 256, 'event log limit reached');
  return { state: { ...clone(state), events: [...clone(state.events), clone(event)] }, accepted: true, duplicate: false, effects: result.effects.map((effect, i) => ({ effectId: `${id}:v2:${event.id}:${i}`, ...effect })), status: summary(flow, result.view) };
}
export function canonicalMissionProgress(id, state, { requireComplete = true } = {}) {
  need(typeof requireComplete === 'boolean', 'requireComplete must be boolean');
  if (plain(state) && state.version === 1) return canonicalV1(id, state, { requireComplete });
  const { flow, view } = replay(id, state);
  if (requireComplete) need(view.receipt && view.verified && view.handoffChoice && view.cargo.units === 0, 'physical handoff is not complete');
  return summary(flow, view);
}
export function missionFlowRecord(id, state) {
  need(plain(state) && state.version === 2, 'new completion requires version 2; restart legacy active runs at the safe entry');
  return { progress: clone(state), result: canonicalMissionProgress(id, state) };
}
export function validMissionFlowRecord(row) {
  try {
    if (!plain(row)) return false;
    if (!Object.hasOwn(row, 'missionFlow')) return true;
    exact(row.missionFlow, ['progress', 'result'], 'history flow');
    if (row.missionFlow.progress?.version === 1) return validV1Record(row);
    return same(row.missionFlow.result, canonicalMissionProgress(row.missionId, row.missionFlow.progress));
  } catch { return false; }
}
export function validMissionFlowRequirement(run) {
  return plain(run) && (!Object.hasOwn(run, 'missionFlowVersion') || Boolean(Object.hasOwn(MISSION_FLOW, run.missionId) && [1, 2].includes(run.missionFlowVersion)));
}
export function entryMissionProgress(run) {
  need(validMissionFlowRequirement(run), 'unsupported active-run flow requirement');
  const progress = createMissionProgress(run.missionId);
  return { missionFlowVersion: 2, missionProgress: progress, notice: '已回安全入口，依第二版交接流程重新核證、現場協商與搬運；舊現場進度未保留，永久選擇與補給不變。' };
}
