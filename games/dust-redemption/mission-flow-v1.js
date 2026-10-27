/** Authoring source only: deterministic mission rules, no clock, DOM or dependencies.
 * Runtime must obtain geometry/evidence events from actual interaction, not UI answers alone.
 * Copyright/asset design: original CC0-1.0. Coordinates are metres [x,z]. */
const clone = value => JSON.parse(JSON.stringify(value));
const freeze = value => { if (value && typeof value === 'object') { Object.values(value).forEach(freeze); Object.freeze(value); } return value; };
const plain = value => Boolean(value && typeof value === 'object' && !Array.isArray(value) && [Object.prototype, null].includes(Object.getPrototypeOf(value)));
const stable = value => JSON.stringify(Array.isArray(value) ? value.map(v => JSON.parse(stable(v))) : plain(value) ? Object.fromEntries(Object.keys(value).sort().map(key => [key, JSON.parse(stable(value[key]))])) : value);
const same = (a, b) => stable(a) === stable(b);
const fail = message => { throw new Error(`Mission flow: ${message}`); };
const requireValue = (value, message) => { if (!value) fail(message); };
const exact = (value, keys, label) => requireValue(plain(value) && Object.keys(value).length === keys.length && keys.every(key => Object.hasOwn(value, key)), `${label} has missing/unknown fields`);
const point = value => Array.isArray(value) && value.length === 2 && value.every(n => typeof n === 'number' && Number.isFinite(n) && Math.abs(n) <= 23);
const distance = (a, b) => Math.hypot(a[0] - b[0], a[1] - b[1]);

export const MISSION_FLOW = freeze({
  'dry-mail': {
    version: 1, missionId: 'dry-mail', title: '沒有寄出的信：藥箱交接',
    objective: { id: 'medicine-consignment', title: '同一箱診療藥品', units: 2, initialHolder: 'mail-depot', position: [-13, 11], pickupRadius: 2.2 },
    legacyFieldChoices: {
      'mail-seal': { 'three-notches': '原有三缺口鉛封檢查；不代表新的交付授權已完成' },
      'mail-switch': { siding: '原有西側貨棚運輸線', direct: '原有東側直線運輸線' },
      'mail-unload': { 'secure-pallet': '完整藥箱已放到指定卸貨區；不代替 flow 的收據' },
    },
    evidence: {
      'mail-manifest': { title: '藥品運單', hook: { kind: 'clue-read', id: 'mail-manifest' }, recordId: 'manifest-md417', facts: { shipmentDate: '1887-07-14', batch: 'MD-417', units: 2, recipientMark: 'double-blue-cross' }, text: '7月14日運單：MD-417 批，共兩份。送往掛有雙道青十字的診所收貨處。' },
      'clinic-receiving-board': { title: '診所收貨牌', hook: { kind: 'inspect-part', taskId: 'mail-seal', partId: 'clinic-receiving-board', anchor: [-14.5, 11] }, recordId: 'clinic-authority-july', facts: { authorizedBatches: ['MD-417', 'MD-419'], recipientMark: 'double-blue-cross', validFrom: '1887-07-01', validUntil: '1887-07-31' }, text: '本月核准接收 MD-417、MD-419。收貨標記為雙道青十字；只收內封完整的藥品。' },
      'consignment-backplate': { title: '藥箱背牌與內封', hook: { kind: 'inspect-part', taskId: 'mail-seal', partId: 'consignment-backplate', objectiveEntityId: 'medicine-consignment' }, recordId: 'crate-md417-original', facts: { batch: 'MD-417', units: 2, recipientMark: 'double-blue-cross', sealShape: 'three-notches', sealStatus: 'original-intact' }, text: '箱背烙印 MD-417／雙道青十字。三缺口鉛封的連接線仍完整，內封未拆。' },
      'expired-tax-stamp': { title: '箱角的舊稅印', hook: { kind: 'inspect-part', taskId: 'mail-seal', partId: 'expired-tax-stamp', objectiveEntityId: 'medicine-consignment' }, recordId: 'tax-june-md312', facts: { batch: 'MD-312', validUntil: '1887-06-30', authority: 'freight-tax-only' }, text: '舊稅印：MD-312，六月底有效。只證明運輸稅已繳，不授權診所收貨。' },
    },
    verification: {
      requiredSources: ['mail-manifest', 'clinic-receiving-board', 'consignment-backplate'],
      reasons: {
        'cross-source-match': { label: '准收 MD-417：7月授權有效，內封未拆', success: true, message: '7月14日仍在授權期內；MD-417與雙道青十字相符，三缺口封線完整，可以交付。' },
        'tax-stamp-authority': { label: '准收 MD-312：沿用6月已繳稅的批號', success: false, message: '箱背和本次運單是MD-417。六月稅印屬舊批次，只證明運輸稅，不是本次收貨授權。' },
        'batch-only': { label: '准收 MD-419：以收貨牌的另一批為準', success: false, message: 'MD-419也在收貨牌上，但不是這箱；本次運單與箱背同為MD-417，不能替換批號。' },
        'seal-only': { label: '暫緩 MD-417：三缺口代表內封已被拆', success: false, message: '三缺口是鉛封外形，連接線仍完整。箱背記錄明示內封未拆，不必因此拒收。' },
      },
      mistake: { alertDelta: 1, exposureSeconds: 1.5, permanentResourceCost: 0, blocksInput: false },
    },
    routes: {
      'clinic-delivery': { gateId: 'clinic-handoff-gate', gatePosition: [-13, -1], gateSize: [2.2, 1.5, 0.35], path: [[-13, 5], [-13, 0], [-12, -4]], recipientId: 'clinic-receiver' },
      'aid-delivery': { gateId: 'aid-handoff-gate', gatePosition: [-9, -1], gateSize: [2.2, 1.5, 0.35], path: [[6, 5], [6, -4], [-9, -4]], recipientId: 'joint-aid-receiver' },
      'porter-egress': { gateId: 'porter-egress-gate', gatePosition: [-10, 12], gateSize: [3.2, 1.5, 0.35], path: [[-12, -4], [-13, 5], [-10, 12], [-12, 17]], optional: true },
    },
    recipients: {
      'clinic-receiver': { title: '診所接收棧台', position: [-12, -4], radius: 1.6, display: '診所接收兩份，守軍零份。' },
      'joint-aid-receiver': { title: '共同醫護接收棧台', position: [-9, -4], radius: 1.6, display: '同一箱在此分配：診所一份、守軍醫護一份。' },
    },
    decision: { id: 'handoff', choices: {
      'clinic-direct': { label: '整箱交診所', routeId: 'clinic-delivery', recipientId: 'clinic-receiver', allocation: { clinic: 2, guard: 0 }, message: '診所保留兩份藥；月台查驗仍需處理。' },
      'mutual-aid': { label: '診所與守軍醫護各一份', routeId: 'aid-delivery', recipientId: 'joint-aid-receiver', allocation: { clinic: 1, guard: 1 }, message: '兩份藥在共同接收點分配；待命守軍承諾不干預交接。' },
    } },
    actors: {
      'mail-1': { initialOrder: 'guard', position: [-7, 0] },
      'mail-2': { initialOrder: 'guard', position: [7, -3] },
      'mail-3': { initialOrder: 'standby', position: [-5, -10], responsePath: [[-5, -10], [-5, -6], [-3, -2]] },
      'mail-4': { initialOrder: 'standby', position: [9, -12], responsePath: [[9, -12], [9, -8], [8, -3]] },
    },
    communication: { id: 'mail-dispatch-line', position: [6, 5], interactionRadius: 2, label: '斷開貨棚哨兵通訊線', message: '北側待命組失去查驗指令，回到待命位置；沒有生成或復活守軍。' },
    response: { id: 'mail-inspection', actorIds: ['mail-3', 'mail-4'], trigger: 'first-consignment-pickup', warningSourceId: 'mail-dispatch-line', warning: '北側哨位傳來查驗呼叫，守軍會沿月台接近藥箱。可斷開通訊或提出共同醫護承諾。', minimumAttackTelegraphMs: 800, spawn: false },
    worker: { id: 'mail-porter', title: '搬運工', position: [4, 2], interactionRadius: 2.2, safePosition: [-13, 5], safeRadius: 1.6, benefitRouteId: 'porter-egress', benefit: '搬運工安全到達後打開側門；未救助仍可從原出口完成。' },
    receipt: { title: '診療藥品交付回條', grants: 'extraction-clearance', replaces: 'north-generic-cargo', rewardDelta: 0 },
  },
});

const definition = missionId => { requireValue(Object.hasOwn(MISSION_FLOW, missionId), 'unknown mission'); return MISSION_FLOW[missionId]; };
const eventKeys = {
  'evidence-observed': ['sourceId', 'recordId'], 'seal-verification-attempted': ['reasonId'],
  'local-choice-committed': ['decisionId', 'choiceId'], 'communication-disconnected': ['sourceId', 'playerPosition'],
  'actor-defeated': ['actorId'], 'cargo-picked-up': ['entityId', 'playerPosition', 'cargoPosition'],
  'cargo-dropped': ['entityId', 'playerPosition', 'cargoPosition'], 'cargo-delivered': ['entityId', 'recipientId', 'playerPosition', 'cargoPosition'],
  'response-activated': ['responseId'], 'worker-following': ['workerId', 'playerPosition', 'workerPosition'],
  'worker-safe': ['workerId', 'playerPosition', 'workerPosition'],
};
function validateEvent(event) {
  requireValue(plain(event) && Object.hasOwn(eventKeys, event.type), 'unknown event type');
  exact(event, ['id', 'type', ...eventKeys[event.type]], 'event');
  requireValue(typeof event.id === 'string' && /^[A-Za-z0-9][A-Za-z0-9:._-]{0,95}$/.test(event.id), 'invalid event ID');
  for (const key of eventKeys[event.type]) requireValue(key.endsWith('Position') ? point(event[key]) : typeof event[key] === 'string' && event[key].length > 0 && event[key].length <= 96, `invalid ${key}`);
}
function initial(flow) {
  return { evidence: {}, verified: false, rejectedReasons: [], handoffChoice: null, communicationConnected: true, actors: Object.fromEntries(Object.entries(flow.actors).map(([id, actor]) => [id, { defeated: false, order: actor.initialOrder }])), response: { status: 'waiting', reason: null, warned: false, activated: false }, cargo: { holder: flow.objective.initialHolder, position: [...flow.objective.position], units: flow.objective.units }, allocation: { clinic: 0, guard: 0 }, worker: 'waiting', receipt: null };
}
function verificationMatches(flow) {
  const manifest = flow.evidence['mail-manifest'].facts, board = flow.evidence['clinic-receiving-board'].facts, back = flow.evidence['consignment-backplate'].facts;
  return manifest.batch === back.batch && board.authorizedBatches.includes(manifest.batch) && manifest.units === back.units && back.units === flow.objective.units && manifest.recipientMark === board.recipientMark && back.recipientMark === board.recipientMark && board.validFrom <= manifest.shipmentDate && manifest.shipmentDate <= board.validUntil && back.sealStatus === 'original-intact';
}
function apply(flow, current, event) {
  const v = clone(current), effects = [], add = (type, data) => effects.push({ type, ...clone(data) });
  const livingStandby = () => flow.response.actorIds.filter(id => !v.actors[id].defeated);
  const order = (ids, name, targetId) => { const alive = ids.filter(id => !v.actors[id].defeated); if (alive.length) { for (const id of alive) v.actors[id].order = name; add('setActorOrder', { actorIds: alive, order: name, targetId }); } };
  const cancel = reason => {
    if (['neutralized', 'cancelled', 'prevented'].includes(v.response.status)) return;
    v.response.status = v.response.warned ? 'cancelled' : 'prevented'; v.response.reason = reason;
    order(flow.response.actorIds, 'standby', 'mail-standby-posts');
    add('setResponseState', { responseId: flow.response.id, status: v.response.status, reason });
  };
  const duplicate = () => ({ view: current, effects: [], changed: false });
  const checkCargo = () => requireValue(event.entityId === flow.objective.id, 'unknown objective entity');
  const checkNear = (a, b, radius, message) => requireValue(distance(a, b) <= radius, message);
  if (event.type === 'evidence-observed') {
    const source = flow.evidence[event.sourceId]; requireValue(source && source.recordId === event.recordId, 'unknown or mismatched evidence record');
    if (v.evidence[event.sourceId]) return duplicate();
    v.evidence[event.sourceId] = event.recordId;
    add('showEvidenceRecord', { sourceId: event.sourceId, recordId: event.recordId, title: source.title, facts: source.facts, text: source.text });
  } else if (event.type === 'seal-verification-attempted') {
    requireValue(Object.hasOwn(flow.verification.reasons, event.reasonId), 'unknown verification reason'); const reason = flow.verification.reasons[event.reasonId];
    requireValue(flow.verification.requiredSources.every(id => v.evidence[id] === flow.evidence[id].recordId), 'observe the manifest, receiving board and box back first');
    if (v.verified || v.rejectedReasons.includes(event.reasonId)) return duplicate();
    if (!reason.success) { v.rejectedReasons.push(event.reasonId); add('recoverableMistake', { ...flow.verification.mistake, message: reason.message }); }
    else { requireValue(verificationMatches(flow), 'authored evidence does not support verification'); v.verified = true; add('setSealVerification', { entityId: flow.objective.id, verified: true, message: reason.message }); }
  } else if (event.type === 'local-choice-committed') {
    requireValue(event.decisionId === flow.decision.id && Object.hasOwn(flow.decision.choices, event.choiceId), 'unknown local decision');
    requireValue(v.verified, 'verify the consignment before allocating it');
    if (v.handoffChoice === event.choiceId) return duplicate();
    requireValue(v.handoffChoice === null && !v.receipt, 'handoff decisions are mutually exclusive and commit once');
    const selected = flow.decision.choices[event.choiceId]; v.handoffChoice = event.choiceId;
    for (const id of ['clinic-delivery', 'aid-delivery']) add('setRouteState', { routeId: id, open: id === selected.routeId });
    add('setAllocationPreview', { entityId: flow.objective.id, recipientId: selected.recipientId, allocation: selected.allocation, message: selected.message });
    if (event.choiceId === 'mutual-aid') cancel('mutual-aid-promise');
  } else if (event.type === 'communication-disconnected') {
    requireValue(event.sourceId === flow.communication.id, 'unknown communication source');
    checkNear(event.playerPosition, flow.communication.position, flow.communication.interactionRadius, 'communication must be disconnected at its real switch');
    if (!v.communicationConnected) return duplicate();
    v.communicationConnected = false; add('setCommunicationState', { sourceId: event.sourceId, connected: false, message: flow.communication.message }); cancel('communication-cut');
  } else if (event.type === 'actor-defeated') {
    requireValue(Object.hasOwn(v.actors, event.actorId), 'unknown actor');
    if (v.actors[event.actorId].defeated) return duplicate();
    v.actors[event.actorId] = { defeated: true, order: 'defeated' };
    if (!livingStandby().length && ['waiting', 'warned', 'active'].includes(v.response.status)) { v.response.status = 'neutralized'; v.response.reason = 'standby-actors-defeated'; add('setResponseState', { responseId: flow.response.id, status: 'neutralized', reason: v.response.reason }); }
  } else if (event.type === 'cargo-picked-up') {
    checkCargo(); requireValue(v.verified && !v.receipt, 'only a verified, undelivered consignment can be picked up');
    if (v.cargo.holder === 'player') return duplicate();
    requireValue([flow.objective.initialHolder, 'ground'].includes(v.cargo.holder), 'consignment is held by someone else');
    checkNear(event.cargoPosition, v.cargo.position, .08, 'pickup cargo position differs from its last grounded position');
    checkNear(event.playerPosition, event.cargoPosition, flow.objective.pickupRadius, 'player is outside pickup reach');
    v.cargo.holder = 'player'; add('setObjectiveCarrier', { entityId: flow.objective.id, holderId: 'player' });
    if (v.response.status === 'waiting') {
      v.response.status = 'warned'; v.response.warned = true;
      order(livingStandby(), 'hold', 'mail-standby-posts');
      add('announceResponse', { responseId: flow.response.id, sourceId: flow.response.warningSourceId, actorIds: livingStandby(), text: flow.response.warning, minimumAttackTelegraphMs: flow.response.minimumAttackTelegraphMs, spawn: false });
    }
  } else if (event.type === 'cargo-dropped') {
    checkCargo(); requireValue(!v.receipt, 'delivered cargo cannot be dropped again');
    if (v.cargo.holder === 'ground' && same(v.cargo.position, event.cargoPosition)) return duplicate();
    requireValue(v.cargo.holder === 'player', 'only the carrier can put cargo down');
    checkNear(event.playerPosition, event.cargoPosition, flow.objective.pickupRadius, 'dropped cargo is outside carrier reach');
    v.cargo.holder = 'ground'; v.cargo.position = [...event.cargoPosition]; add('setObjectiveCarrier', { entityId: flow.objective.id, holderId: 'ground', position: event.cargoPosition });
  } else if (event.type === 'response-activated') {
    requireValue(event.responseId === flow.response.id, 'unknown response');
    if (v.response.activated || ['prevented', 'cancelled', 'neutralized'].includes(v.response.status)) return duplicate();
    requireValue(v.response.status === 'warned' && v.response.warned, 'response activation requires its visible warning first');
    v.response.status = 'active'; v.response.activated = true;
    order(livingStandby(), 'investigate', flow.objective.id);
    add('setResponseState', { responseId: flow.response.id, status: 'active', reason: 'consignment-check' });
  } else if (event.type === 'cargo-delivered') {
    checkCargo(); requireValue(v.verified && v.handoffChoice, 'verify and choose the receiving arrangement before delivery');
    const selected = flow.decision.choices[v.handoffChoice], recipient = flow.recipients[selected.recipientId];
    requireValue(event.recipientId === selected.recipientId, 'wrong recipient for the committed allocation');
    if (v.receipt) return duplicate();
    requireValue(v.cargo.holder === 'player' && v.cargo.units === flow.objective.units, 'delivery requires the carried, complete consignment');
    checkNear(event.playerPosition, recipient.position, recipient.radius, 'player has not reached the receiving zone');
    checkNear(event.cargoPosition, recipient.position, recipient.radius, 'cargo has not reached the receiving zone');
    v.cargo = { holder: selected.recipientId, position: [...recipient.position], units: 0 }; v.allocation = clone(selected.allocation);
    requireValue(v.allocation.clinic + v.allocation.guard === flow.objective.units, 'medicine must be conserved');
    v.receipt = { id: `dry-mail:v1:${v.handoffChoice}:receipt`, title: flow.receipt.title, objectiveEntityId: flow.objective.id, recipientId: selected.recipientId, allocation: clone(selected.allocation), grants: flow.receipt.grants };
    add('setObjectiveCarrier', { entityId: flow.objective.id, holderId: selected.recipientId, position: recipient.position });
    add('transferMedicine', { entityId: flow.objective.id, fromId: 'medicine-consignment', allocation: selected.allocation, units: 2 });
    add('issueReceipt', { receipt: v.receipt });
  } else if (event.type === 'worker-following') {
    requireValue(event.workerId === flow.worker.id, 'unknown worker');
    if (v.worker !== 'waiting') return duplicate();
    checkNear(event.workerPosition, flow.worker.position, .08, 'worker initial position does not match');
    checkNear(event.playerPosition, event.workerPosition, flow.worker.interactionRadius, 'worker cannot hear a remote escort command');
    v.worker = 'following'; add('beginEscort', { actorId: flow.worker.id, targetId: 'player', safePosition: flow.worker.safePosition });
  } else if (event.type === 'worker-safe') {
    requireValue(event.workerId === flow.worker.id, 'unknown worker');
    if (v.worker === 'safe') return duplicate();
    requireValue(v.worker === 'following', 'worker must join the escort before arrival');
    checkNear(event.playerPosition, flow.worker.safePosition, flow.worker.safeRadius, 'player has not reached worker safety');
    checkNear(event.workerPosition, flow.worker.safePosition, flow.worker.safeRadius, 'worker has not reached safety');
    v.worker = 'safe'; add('setActorOrder', { actorIds: [flow.worker.id], order: 'hold', targetId: 'porter-safe-point' });
    add('setRouteState', { routeId: flow.worker.benefitRouteId, open: true, message: flow.worker.benefit });
  }
  requireValue(v.cargo.units + v.allocation.clinic + v.allocation.guard === flow.objective.units, 'medicine conservation violated');
  return { view: v, effects, changed: true };
}
function replay(missionId, state) {
  const flow = definition(missionId); exact(state, ['version', 'missionId', 'events'], 'state');
  requireValue(state.version === flow.version && state.missionId === missionId, 'state version/mission mismatch');
  requireValue(Array.isArray(state.events) && state.events.length <= 256, 'event log must contain at most 256 entries');
  const ids = new Set(); let view = initial(flow);
  for (const event of state.events) { validateEvent(event); requireValue(!ids.has(event.id), 'duplicate event ID in canonical log'); ids.add(event.id); const result = apply(flow, view, event); requireValue(result.changed, 'redundant event in canonical log'); view = result.view; }
  return { flow, view };
}
function summary(flow, view) {
  return { version: flow.version, missionId: flow.missionId, objectiveEntityId: flow.objective.id, complete: Boolean(view.receipt), verified: view.verified, missingEvidence: flow.verification.requiredSources.filter(id => !view.evidence[id]), evidence: clone(view.evidence), verificationMistakes: view.rejectedReasons.length, localChoices: view.handoffChoice ? { handoff: view.handoffChoice } : {}, routeId: view.handoffChoice ? flow.decision.choices[view.handoffChoice].routeId : null, cargo: clone(view.cargo), allocation: clone(view.allocation), receipt: clone(view.receipt), response: clone(view.response), actors: clone(view.actors), defeatedActors: Object.keys(view.actors).filter(id => view.actors[id].defeated), communicationConnected: view.communicationConnected, workerSafe: view.worker === 'safe', workerStatus: view.worker, openedOptionalRoutes: view.worker === 'safe' ? [flow.worker.benefitRouteId] : [], rewardDelta: 0 };
}
export function createMissionProgress(missionId) { const flow = definition(missionId); return { version: flow.version, missionId, events: [] }; }
export function recordMissionEvent(missionId, state, event) {
  const { flow, view } = replay(missionId, state); validateEvent(event);
  const existing = state.events.find(row => row.id === event.id);
  if (existing) { requireValue(same(existing, event), 'event ID was reused with a different payload'); return { state: clone(state), accepted: false, duplicate: true, effects: [], status: summary(flow, view) }; }
  const result = apply(flow, view, event);
  if (!result.changed) return { state: clone(state), accepted: false, duplicate: true, effects: [], status: summary(flow, view) };
  requireValue(state.events.length < 256, 'event log limit reached');
  const next = { ...clone(state), events: [...clone(state.events), clone(event)] };
  return { state: next, accepted: true, duplicate: false, effects: result.effects.map((effect, index) => ({ effectId: `${missionId}:v${flow.version}:${event.id}:${index}`, ...effect })), status: summary(flow, result.view) };
}
export function canonicalMissionProgress(missionId, state, { requireComplete = true } = {}) {
  requireValue(typeof requireComplete === 'boolean', 'requireComplete must be boolean');
  const { flow, view } = replay(missionId, state);
  if (requireComplete) requireValue(view.receipt && view.verified && view.cargo.units === 0, 'physical handoff is not complete');
  return summary(flow, view);
}
/** Optional additive history field. Absent means old schema-2 evidence, never fabricated flow completion. */
export function missionFlowRecord(missionId, state) { return { progress: clone(state), result: canonicalMissionProgress(missionId, state) }; }
export function validMissionFlowRecord(row) {
  try { if (!plain(row)) return false; if (!Object.hasOwn(row, 'missionFlow')) return true; exact(row.missionFlow, ['progress', 'result'], 'history flow'); return same(row.missionFlow.result, canonicalMissionProgress(row.missionId, row.missionFlow.progress)); } catch { return false; }
}
export function validMissionFlowRequirement(run) {
  return plain(run) && (!Object.hasOwn(run, 'missionFlowVersion') || Boolean(Object.hasOwn(MISSION_FLOW, run.missionId) && run.missionFlowVersion === MISSION_FLOW[run.missionId].version));
}
/** Entry recovery deliberately discards all prior local flow state; caller preserves safeSnapshot. */
export function entryMissionProgress(run) {
  requireValue(validMissionFlowRequirement(run), 'unsupported active-run flow requirement');
  const progress = createMissionProgress(run.missionId);
  return { missionFlowVersion: progress.version, missionProgress: progress, notice: '已回任務安全入口；本次依新版交接流程重新開始，先前現場進度未保留。' };
}
