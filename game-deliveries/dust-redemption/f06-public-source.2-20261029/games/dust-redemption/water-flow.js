// Authoring source only. Original deterministic rules; no clock, DOM or dependencies.
// Events must originate from actual field interactions. Coordinates are metres [x,z].
const clone = (value) => JSON.parse(JSON.stringify(value));
const freeze = (value) => { if (value && typeof value === 'object') { Object.values(value).forEach(freeze); Object.freeze(value); } return value; };
const plain = (value) => Boolean(value && typeof value === 'object' && !Array.isArray(value) && [Object.prototype, null].includes(Object.getPrototypeOf(value)));
const stable = (value) => JSON.stringify(Array.isArray(value) ? value.map(v => JSON.parse(stable(v))) : plain(value) ? Object.fromEntries(Object.keys(value).sort().map(k => [k, JSON.parse(stable(value[k]))])) : value);
const same = (a, b) => stable(a) === stable(b);
const requireValue = (value, message) => { if (!value) throw new Error(`Water flow: ${message}`); };
const exact = (value, keys, name) => requireValue(plain(value) && Object.keys(value).length === keys.length && keys.every(k => Object.hasOwn(value, k)), `${name} has missing/unknown fields`);
const point = (value) => Array.isArray(value) && value.length === 2 && value.every(n => Number.isFinite(n) && Math.abs(n) <= 23);
const distance = (a, b) => Math.hypot(a[0] - b[0], a[1] - b[1]);
const SUPPLY_VALVES = ['bypass-wheel', 'clinic', 'homes', 'mine', 'maintenance-diverter'];
const ALLOCATION_KEYS = ['clinic', 'settlement', 'mine', 'bypass'];
const idleWater = () => ({ clinic: 0, settlement: 0, mine: 0, bypass: 0, inlet: 5 });

export const WATER_FLOW = freeze({
  'broken-water': {
    version: 1, missionId: 'broken-water', title: '水往哪裡流：五格水與具名供水回條',
    supply: { entityId: 'canyon-five-unit-supply', units: 5, minimum: { clinic: 1, settlement: 1, mine: 1 }, heldOnInvalidConfiguration: 'inlet', message: '未通過驗流時，五格主供水留在入口安全槽；可立即重調，不會永久耗水。' },
    legacyFieldChoices: { 'water-bypass': 'bypass-downstream', 'water-allocation': 'two-two-one', 'water-reserve': ['keep-first-aid', 'donate-reserve'] },
    evidence: {
      'water-pipe': { recordId: 'upstream-split-v1', title: '破裂的輸水管', position: [-15, -8], radius: 2.8, hook: { kind: 'clue-read', id: 'water-pipe' }, facts: { damagedSegment: 'straight-pipe', intactBranch: 'downstream-bypass', safeDetent: 1 }, text: '上游直管有裂口；完整旁通管的箭頭朝下游，安全檔是單道三角刻記。' },
      'water-meter': { recordId: 'inlet-five-v1', title: '乾轉水錶與入口刻度', position: [-16, 8], radius: 2.8, hook: { kind: 'clue-read', id: 'water-meter' }, facts: { chargedFlowBeforeRepair: 0, inletUnitsAfterRepair: 5 }, text: '舊錶在斷流時仍計費。修復旁通後，入口標定只有五格，不能把六格配額當成六格水。' },
      'water-contract': { recordId: 'shared-water-minimum-v1', title: '共同水契與今日供水附件', position: [16, 4], radius: 2.8, hook: { kind: 'clue-read', id: 'water-contract' }, facts: { operator: 'residents-in-turn', contractor: 'maintenance-only', minimum: { clinic: 1, settlement: 1, mine: 1 }, reserveIsSeparate: true }, text: '永久水權仍待撤離時公開決定。今日先保證診所、住區、礦場各至少一格；維修備水另有一桶，不在五格主供水內。' },
    },
    tasks: {
      'water-bypass': { position: [-13, 5], radius: 2.3, inspect: { partId: 'split-joint', stepId: 'trace-pipe' }, pressureTestHook: { stepId: 'turn-bypass', partId: 'pressure-needle', kind: 'read-live-pressure' } },
      'water-allocation': { position: [5, 13], radius: 2.4, calibrationHook: { kind: 'field-choice-accepted', choiceId: 'two-two-one', requiresSteps: ['set-clinic', 'set-homes', 'set-mine'] }, measurementHook: { kind: 'read-live-meters', partIds: ['clinic', 'homes', 'mine', 'maintenance-diverter'] } },
      'water-reserve': { radius: 2.3, inspect: { partId: 'reserve-level', stepId: 'inspect-reserve' }, operationHook: { partId: 'reserve-spout', stepId: 'turn-spout' }, legacyEffectOwner: 'fieldwork' },
    },
    valves: {
      'bypass-wheel': { taskId: 'water-bypass', partId: 'bypass-wheel', stepId: 'turn-bypass', min: 0, max: 2, correctValue: 1 },
      clinic: { taskId: 'water-allocation', partId: 'clinic', stepId: 'set-clinic', min: 0, max: 3, calibrationValue: 2 },
      homes: { taskId: 'water-allocation', partId: 'homes', stepId: 'set-homes', min: 0, max: 3, calibrationValue: 2 },
      mine: { taskId: 'water-allocation', partId: 'mine', stepId: 'set-mine', min: 0, max: 3, calibrationValue: 1 },
      'maintenance-diverter': { taskId: 'water-allocation', partId: 'maintenance-diverter', min: 0, max: 1, meaning: '0=住區全收；1=將住區的一格改導維修旁通，不增減入口總量', hook: { kind: 'operate-real-diverter' } },
      'reserve-spout': { taskId: 'water-reserve', partId: 'reserve-spout', stepId: 'turn-spout', min: 0, max: 1, separateFromMainSupply: true },
    },
    decision: { id: 'water-routing', choices: {
      'civilian-boost': { title: '當日民用加量', allocation: { clinic: 2, settlement: 2, mine: 1, bypass: 0 }, diverter: 0, routeId: 'east-bridge', recipientId: 'east-water-witness', reserveStationId: 'east-maintenance-trough', fordOpen: false, message: '住區取得兩格；主河道水位較高，西淺灘關閉，走東橋交接。' },
      'retain-bypass': { title: '保留維修旁通', allocation: { clinic: 2, settlement: 1, mine: 1, bypass: 1 }, diverter: 1, routeId: 'west-ford', recipientId: 'west-water-witness', reserveStationId: 'west-maintenance-trough', fordOpen: true, message: '住區取得最低一格，另一格導入維修旁通；西淺灘水位降低，可由西岸交接。' },
    } },
    routes: {
      'east-bridge': { title: '東側既有橋道', alwaysOpen: true, path: [[12, 5], [12, 1], [12, -3], [12, -7]], recipientId: 'east-water-witness' },
      'west-ford': { title: '西側淺灘', gateId: 'west-ford-water-barrier', gatePosition: [-13, 0], gateSize: [3.8, 1.5, 1.6], openOnlyWhen: 'validated-retain-bypass', path: [[-13, 5], [-13, 1], [-13, -3], [-13, -7]], recipientId: 'west-water-witness', closedWaterLevel: 1.2, openWaterLevel: 0.25 },
    },
    recipients: {
      'east-water-witness': { title: '伊妮絲的東橋供水簽收台', position: [12, -7], radius: 1.8, witness: 'inez' },
      'west-water-witness': { title: '伊妮絲的西淺灘供水簽收台', position: [-13, -7], radius: 1.8, witness: 'inez' },
    },
    reserve: { entityId: 'separate-clean-water-bucket', units: 1, independentOfSupply: true, stations: {
      'east-maintenance-trough': { position: [12, 5], title: '東橋南岸維修槽' },
      'west-maintenance-trough': { position: [-10, 5], title: '西淺灘南岸維修槽' },
    }, choices: {
      'keep-first-aid': { spout: 0, fieldHealCharges: 1, fieldHealAmount: 20, extractionRewardDelta: 0 },
      'donate-reserve': { spout: 1, fieldHealCharges: 0, fieldHealAmount: 0, extractionRewardDelta: 15 },
    }, effectOwner: 'existing-fieldwork-only' },
    guarantee: { id: 'public-minimum-supply', position: [5, 13], radius: 2.4, hook: { kind: 'publish-at-distribution-board' }, text: '公開保證三處至少各一格；所選配水仍須現場驗流才可簽收。這項當日承諾不決定永久水權。' },
    actors: {
      'water-1': { initialOrder: 'guard', position: [-7, 0] },
      'water-2': { initialOrder: 'guard', position: [7, -3] },
      'water-3': { initialOrder: 'standby', position: [-5, -10] },
      'water-4': { initialOrder: 'guard', position: [9, -12] },
    },
    response: { id: 'bridge-supply-inspection', actorIds: ['water-1', 'water-3'], trigger: 'first-valid-flow-measurement', sourceId: 'bridge-watch-bell', sourcePosition: [-7, 0], warning: '橋頭守軍已看見水流改道，將沿既有通路前往選定簽收台查驗。可在配水牌公開最低供水保證，取消這次查驗。', minimumAttackTelegraphMs: 800, spawn: false },
    mistake: { alertDelta: 1, exposureSeconds: 1.5, permanentResourceCost: 0, blocksInput: false },
    receipt: { id: 'canyon-supply-receipt', title: '伊妮絲見證的五格供水回條', grants: 'extraction-clearance', replaces: 'broken-water-cargo', exit: [-12, 18], rewardDelta: 0, permanentDecisionDeferred: 'water' },
  },
});

const definition = id => { requireValue(Object.hasOwn(WATER_FLOW, id), 'unknown mission'); return WATER_FLOW[id]; };
const eventKeys = {
  'evidence-observed': ['sourceId', 'recordId', 'playerPosition'],
  'part-inspected': ['taskId', 'partId', 'playerPosition'],
  'valve-operated': ['valveId', 'value', 'playerPosition'],
  'pressure-tested': ['playerPosition'], 'distribution-calibrated': ['playerPosition'],
  'local-choice-committed': ['decisionId', 'choiceId'],
  'flow-measured': ['playerPosition', 'valveValues', 'meterValues'],
  'minimum-guarantee-published': ['guaranteeId', 'playerPosition'],
  'response-warning-presented': ['responseId'], 'response-activated': ['responseId'],
  'actor-defeated': ['actorId'],
  'reserve-committed': ['choiceId', 'playerPosition'],
  'supply-received': ['recipientId', 'playerPosition', 'recipientPosition', 'valveValues', 'meterValues'],
};
function validateEvent(event) {
  requireValue(plain(event) && Object.hasOwn(eventKeys, event.type), 'unknown event type');
  exact(event, ['id', 'type', ...eventKeys[event.type]], 'event');
  requireValue(typeof event.id === 'string' && /^[A-Za-z0-9][A-Za-z0-9:._-]{0,95}$/.test(event.id), 'invalid event ID');
  for (const key of eventKeys[event.type]) {
    if (key.endsWith('Position')) requireValue(point(event[key]), `invalid ${key}`);
    else if (key === 'value') requireValue(Number.isInteger(event.value), 'invalid valve value');
    else if (key === 'valveValues') {
      exact(event[key], SUPPLY_VALVES, key);
      requireValue(Object.values(event[key]).every(Number.isInteger), 'invalid physical valve snapshot');
    } else if (key === 'meterValues') {
      exact(event[key], ALLOCATION_KEYS, key);
      requireValue(Object.values(event[key]).every(n => Number.isInteger(n) && n >= 0 && n <= 5), 'invalid physical meter snapshot');
    } else requireValue(typeof event[key] === 'string' && event[key].length > 0 && event[key].length <= 96, `invalid ${key}`);
  }
}
function initial(flow) {
  return { evidence: {}, inspected: {}, operated: {}, valves: Object.fromEntries(Object.keys(flow.valves).map(id => [id, 0])), revision: 0, pressureVerified: false, calibrated: false, choiceId: null, measuredRevision: null, water: idleWater(), guarantee: false, reserveChoice: null, receipt: null,
    actors: Object.fromEntries(Object.entries(flow.actors).map(([id, actor]) => [id, { defeated: false, order: actor.initialOrder }])),
    response: { status: 'waiting', reason: null, warned: false, presented: false, activated: false } };
}
const supplySnapshot = view => Object.fromEntries(SUPPLY_VALVES.map(id => [id, view.valves[id]]));
function taskPosition(flow, view, taskId) {
  const task = flow.tasks[taskId]; requireValue(task, 'unknown field task');
  if (taskId !== 'water-reserve') return task.position;
  requireValue(view.choiceId, 'choose a route before using its reserve station');
  return flow.reserve.stations[flow.decision.choices[view.choiceId].reserveStationId].position;
}
function configurationMatches(flow, view) {
  if (!view.choiceId || !view.pressureVerified || !view.calibrated) return false;
  return view.valves['bypass-wheel'] === 1 && view.valves.clinic === 2 && view.valves.homes === 2 && view.valves.mine === 1 &&
    view.valves['maintenance-diverter'] === flow.decision.choices[view.choiceId].diverter;
}
const liveFlow = (flow, view) => configurationMatches(flow, view) && view.measuredRevision === view.revision;
function apply(flow, current, event) {
  const view = clone(current), effects = [], add = (type, data) => effects.push({ type, ...clone(data) });
  const duplicate = () => ({ view: current, effects: [], changed: false });
  const near = (actual, expected, radius, label) => requireValue(distance(actual, expected) <= radius + 1e-8, `${label} requires actual nearby position`);
  const livingResponse = () => flow.response.actorIds.filter(id => !view.actors[id].defeated);
  const order = (ids, name, targetId) => {
    const living = ids.filter(id => !view.actors[id].defeated);
    if (living.length) { for (const id of living) view.actors[id].order = name; add('setActorOrder', { actorIds: living, order: name, targetId, resetEngagement: name === 'standby' || name === 'hold' }); }
  };
  const mistake = message => add('recoverableMistake', { ...flow.mistake, message });
  const invalidate = () => {
    if (view.measuredRevision === null) return;
    view.measuredRevision = null; view.water = idleWater();
    add('setWaterDistribution', { entityId: flow.supply.entityId, water: view.water, validated: false, message: flow.supply.message });
    add('setWaterRouteState', { routeId: 'west-ford', open: false, waterLevel: flow.routes['west-ford'].closedWaterLevel, safeClosure: 'retain-occupants-egress' });
  };
  const cancel = () => {
    if (['prevented', 'cancelled', 'neutralized'].includes(view.response.status)) return;
    view.response.status = view.response.warned ? 'cancelled' : 'prevented'; view.response.reason = 'public-minimum-guarantee';
    order(flow.response.actorIds, 'standby', 'original-water-posts');
    add('setResponseState', { responseId: flow.response.id, ...view.response });
  };
  const compareLiveSnapshot = () => {
    requireValue(same(event.valveValues, supplySnapshot(view)), 'physical valve snapshot differs from recorded operations');
    return view.choiceId && same(event.meterValues, flow.decision.choices[view.choiceId].allocation);
  };
  if (event.type === 'evidence-observed') {
    const evidence = flow.evidence[event.sourceId];
    requireValue(evidence && event.recordId === evidence.recordId, 'unknown evidence record');
    near(event.playerPosition, evidence.position, evidence.radius, 'evidence observation');
    if (view.evidence[event.sourceId]) return duplicate();
    view.evidence[event.sourceId] = event.recordId;
    add('showWaterEvidence', { sourceId: event.sourceId, ...evidence });
  } else if (event.type === 'part-inspected') {
    const task = flow.tasks[event.taskId];
    requireValue(task?.inspect?.partId === event.partId, 'unknown inspectable part');
    near(event.playerPosition, taskPosition(flow, view, event.taskId), task.radius, 'part inspection');
    if (view.inspected[event.partId]) return duplicate();
    view.inspected[event.partId] = true;
    add('recordWaterInspection', { taskId: event.taskId, partId: event.partId });
  } else if (event.type === 'valve-operated') {
    requireValue(!view.receipt, 'received supply is sealed; controls must remain locked');
    const valve = flow.valves[event.valveId]; requireValue(valve, 'unknown valve');
    requireValue(event.value >= valve.min && event.value <= valve.max, 'valve value outside physical detents');
    near(event.playerPosition, taskPosition(flow, view, valve.taskId), flow.tasks[valve.taskId].radius, 'valve operation');
    if (view.valves[event.valveId] === event.value && view.operated[event.valveId]) return duplicate();
    view.operated[event.valveId] = true;
    if (event.valveId === 'reserve-spout') requireValue(!view.reserveChoice, 'reserve choice is already committed');
    else { view.revision++; invalidate(); }
    if (event.valveId === 'bypass-wheel') view.pressureVerified = false;
    view.valves[event.valveId] = event.value;
    add('setWaterValveState', { valveId: event.valveId, value: event.value });
  } else if (event.type === 'pressure-tested') {
    near(event.playerPosition, flow.tasks['water-bypass'].position, flow.tasks['water-bypass'].radius, 'pressure test');
    requireValue(view.evidence['water-pipe'] && view.inspected['split-joint'], 'inspect the actual split and pipe clue first');
    if (view.pressureVerified) return duplicate();
    if (view.valves['bypass-wheel'] !== 1 || !view.operated['bypass-wheel']) mistake('裂管仍承壓；沿完整旁通的下游箭頭調回單道三角刻記，可立即再測。');
    else { view.pressureVerified = true; add('setWaterPressure', { safe: true, legacyChoiceId: 'bypass-downstream' }); }
  } else if (event.type === 'distribution-calibrated') {
    near(event.playerPosition, flow.tasks['water-allocation'].position, flow.tasks['water-allocation'].radius, 'distribution calibration');
    requireValue(view.pressureVerified && Object.keys(flow.evidence).every(id => view.evidence[id]), 'repair and read all three clues first');
    if (view.calibrated) return duplicate();
    if (view.valves.clinic !== 2 || view.valves.homes !== 2 || view.valves.mine !== 1 || view.valves['maintenance-diverter'] !== 0 || !['clinic', 'homes', 'mine'].every(id => view.operated[id])) mistake('三輪校正需先真實到二、二、一；旁通分流另由下一個導流柄決定，不可超領五格。');
    else { view.calibrated = true; add('confirmWaterCalibration', { taskId: 'water-allocation', legacyChoiceId: 'two-two-one', baseWheelValues: { clinic: 2, homes: 2, mine: 1 } }); }
  } else if (event.type === 'local-choice-committed') {
    requireValue(event.decisionId === flow.decision.id && Object.hasOwn(flow.decision.choices, event.choiceId), 'unknown local water choice');
    requireValue(view.calibrated && view.pressureVerified, 'calibrate the existing three wheels first');
    if (view.choiceId === event.choiceId) return duplicate();
    requireValue(!view.choiceId, 'local water routes are mutually exclusive and commit once');
    view.choiceId = event.choiceId;
    const selected = flow.decision.choices[event.choiceId];
    add('showWaterAllocationTarget', { choiceId: event.choiceId, ...selected });
    add('bindWaterReserveStation', { taskId: 'water-reserve', entityId: flow.reserve.entityId, stationId: selected.reserveStationId, position: flow.reserve.stations[selected.reserveStationId].position, effectOwner: 'existing-fieldwork-only' });
  } else if (event.type === 'flow-measured') {
    near(event.playerPosition, flow.tasks['water-allocation'].position, flow.tasks['water-allocation'].radius, 'live flow measurement');
    requireValue(view.choiceId && view.calibrated && view.pressureVerified, 'a repaired and selected distribution is required');
    const readingsMatch = compareLiveSnapshot();
    if (view.receipt) {
      requireValue(readingsMatch && liveFlow(flow, view), 'received supply cannot be invalidated by a later meter reading');
      return duplicate();
    }
    if (!configurationMatches(flow, view) || !readingsMatch || !view.operated['maintenance-diverter']) { invalidate(); mistake('實體閥位與選定配水不符；五格水保留在入口。調回刻度並讀取四處流量柱即可修正。'); }
    else {
      if (liveFlow(flow, view)) return duplicate();
      const selected = flow.decision.choices[view.choiceId];
      view.measuredRevision = view.revision; view.water = { ...clone(selected.allocation), inlet: 0 };
      add('setWaterDistribution', { entityId: flow.supply.entityId, water: view.water, validated: true });
      add('setWaterRouteState', { routeId: 'west-ford', open: selected.fordOpen, waterLevel: selected.fordOpen ? flow.routes['west-ford'].openWaterLevel : flow.routes['west-ford'].closedWaterLevel, safeClosure: 'retain-occupants-egress' });
      if (view.response.status === 'waiting') {
        if (!livingResponse().length) { view.response.status = 'neutralized'; view.response.reason = 'bridge-actors-defeated'; }
        else {
          view.response.status = 'warned'; view.response.warned = true;
          order(flow.response.actorIds, 'hold', 'original-water-posts');
          add('announceWaterResponse', { responseId: flow.response.id, sourceId: flow.response.sourceId, sourcePosition: flow.response.sourcePosition, actorIds: livingResponse(), targetId: selected.recipientId, text: flow.response.warning, minimumAttackTelegraphMs: 800, spawn: false });
        }
        add('setResponseState', { responseId: flow.response.id, ...view.response });
      }
    }
  } else if (event.type === 'minimum-guarantee-published') {
    requireValue(event.guaranteeId === flow.guarantee.id, 'unknown guarantee');
    near(event.playerPosition, flow.guarantee.position, flow.guarantee.radius, 'public guarantee');
    requireValue(view.choiceId && view.evidence['water-contract'] && view.calibrated, 'choose a calibrated allocation and read the contract first');
    if (view.guarantee) return duplicate();
    const allocation = flow.decision.choices[view.choiceId].allocation;
    requireValue(Object.entries(flow.supply.minimum).every(([key, min]) => allocation[key] >= min) && Object.values(allocation).reduce((a, b) => a + b, 0) === 5, 'guarantee requires a conserved minimum allocation');
    view.guarantee = true; cancel(); add('publishWaterGuarantee', { guaranteeId: flow.guarantee.id, allocation, text: flow.guarantee.text });
  } else if (event.type === 'response-warning-presented') {
    requireValue(event.responseId === flow.response.id, 'unknown response');
    if (view.response.presented || ['prevented', 'cancelled', 'neutralized'].includes(view.response.status)) return duplicate();
    requireValue(view.response.status === 'warned', 'a response must be announced before presentation');
    view.response.presented = true;
  } else if (event.type === 'response-activated') {
    requireValue(event.responseId === flow.response.id, 'unknown response');
    if (view.response.activated || ['prevented', 'cancelled', 'neutralized'].includes(view.response.status)) return duplicate();
    requireValue(view.response.status === 'warned' && view.response.presented, 'show the response warning before activating existing guards');
    view.response.activated = true; view.response.status = 'active';
    order(flow.response.actorIds, 'investigate', flow.decision.choices[view.choiceId].recipientId);
    add('setResponseState', { responseId: flow.response.id, ...view.response });
  } else if (event.type === 'actor-defeated') {
    requireValue(Object.hasOwn(view.actors, event.actorId), 'unknown existing guard');
    if (view.actors[event.actorId].defeated) return duplicate();
    view.actors[event.actorId] = { defeated: true, order: 'defeated' };
    if (!livingResponse().length && ['waiting', 'warned', 'active'].includes(view.response.status)) { view.response.status = 'neutralized'; view.response.reason = 'bridge-actors-defeated'; add('setResponseState', { responseId: flow.response.id, ...view.response }); }
  } else if (event.type === 'reserve-committed') {
    requireValue(Object.hasOwn(flow.reserve.choices, event.choiceId), 'unknown reserve choice');
    near(event.playerPosition, taskPosition(flow, view, 'water-reserve'), flow.tasks['water-reserve'].radius, 'reserve commitment');
    if (view.reserveChoice === event.choiceId) return duplicate();
    requireValue(!view.reserveChoice && view.inspected['reserve-level'] && view.operated['reserve-spout'], 'inspect and physically direct the separate reserve bucket first');
    requireValue(view.valves['reserve-spout'] === flow.reserve.choices[event.choiceId].spout, 'reserve spout does not face the selected destination');
    view.reserveChoice = event.choiceId;
    add('confirmLegacyWaterReserve', { taskId: 'water-reserve', choiceId: event.choiceId, effectOwner: 'existing-fieldwork-only', addsRewards: false });
  } else if (event.type === 'supply-received') {
    requireValue(view.choiceId, 'choose the supply recipient first');
    const selected = flow.decision.choices[view.choiceId], recipient = flow.recipients[selected.recipientId];
    requireValue(event.recipientId === selected.recipientId, 'wrong receiving point');
    near(event.recipientPosition, recipient.position, .08, 'receiving witness');
    near(event.playerPosition, event.recipientPosition, recipient.radius, 'supply handoff');
    requireValue(compareLiveSnapshot() && liveFlow(flow, view), 'current valves and measured flow no longer prove the supply');
    requireValue(view.reserveChoice, 'settle the separate reserve choice before crossing to the witness');
    if (view.receipt) return duplicate();
    view.receipt = { id: flow.receipt.id, recipientId: selected.recipientId, witness: recipient.witness, allocation: clone(selected.allocation), units: 5, routeId: selected.routeId, grants: flow.receipt.grants };
    add('issueWaterReceipt', { receipt: view.receipt, replaces: flow.receipt.replaces, exit: flow.receipt.exit, rewardDelta: 0, lockSupplyControls: true });
  }
  requireValue(Object.values(view.water).reduce((a, b) => a + b, 0) === flow.supply.units, 'five-unit conservation failed');
  return { view, effects, changed: true };
}
function replay(missionId, state) {
  const flow = definition(missionId);
  exact(state, ['version', 'missionId', 'events'], 'water progress');
  requireValue(state.version === flow.version && state.missionId === missionId && Array.isArray(state.events) && state.events.length <= 512, 'invalid water progress header');
  let view = initial(flow); const ids = new Set();
  for (const event of state.events) {
    validateEvent(event); requireValue(!ids.has(event.id), 'duplicate saved event ID'); ids.add(event.id);
    const result = apply(flow, view, event); requireValue(result.changed, 'saved semantic duplicate'); view = result.view;
  }
  return { flow, view };
}
function summary(flow, view) {
  const selected = view.choiceId ? flow.decision.choices[view.choiceId] : null;
  return { version: flow.version, missionId: flow.missionId, complete: Boolean(view.receipt), evidence: clone(view.evidence), pressureVerified: view.pressureVerified, calibrated: view.calibrated, valveValues: clone(view.valves), revision: view.revision, measuredRevision: view.measuredRevision, flowValid: liveFlow(flow, view), localChoices: view.choiceId ? { routing: view.choiceId } : {}, water: clone(view.water), allocation: selected ? clone(selected.allocation) : null, routeId: selected?.routeId ?? null, recipientId: selected?.recipientId ?? null, fordOpen: Boolean(selected?.fordOpen && liveFlow(flow, view)), guaranteePublished: view.guarantee, response: clone(view.response), actors: clone(view.actors), defeatedActors: Object.keys(view.actors).filter(id => view.actors[id].defeated), reserve: view.reserveChoice ? { entityId: flow.reserve.entityId, units: 1, choiceId: view.reserveChoice, stationId: selected.reserveStationId, expectedLegacyEffect: clone(flow.reserve.choices[view.reserveChoice]), effectOwner: 'existing-fieldwork-only' } : null, receipt: clone(view.receipt), rewardDelta: 0, permanentDecisionDeferred: 'water' };
}
export function createWaterProgress(missionId) { const flow = definition(missionId); return { version: flow.version, missionId, events: [] }; }
export function recordWaterEvent(missionId, state, event) {
  const { flow, view } = replay(missionId, state); validateEvent(event);
  const existing = state.events.find(row => row.id === event.id);
  if (existing) { requireValue(same(existing, event), 'event ID reused with a different payload'); return { state: clone(state), accepted: false, duplicate: true, effects: [], status: summary(flow, view) }; }
  const result = apply(flow, view, event);
  if (!result.changed) return { state: clone(state), accepted: false, duplicate: true, effects: [], status: summary(flow, view) };
  requireValue(state.events.length < 512, 'event log limit reached');
  return { state: { ...clone(state), events: [...clone(state.events), clone(event)] }, accepted: true, duplicate: false, effects: result.effects.map((effect, index) => ({ effectId: `${missionId}:water-v${flow.version}:${event.id}:${index}`, ...effect })), status: summary(flow, result.view) };
}
export function canonicalWaterProgress(missionId, state, { requireComplete = true } = {}) {
  requireValue(typeof requireComplete === 'boolean', 'requireComplete must be boolean');
  const { flow, view } = replay(missionId, state);
  if (requireComplete) requireValue(view.receipt && view.reserveChoice && liveFlow(flow, view), 'actual supply handoff is incomplete');
  return summary(flow, view);
}
export function waterFlowRecord(missionId, state) { return { progress: clone(state), result: canonicalWaterProgress(missionId, state) }; }
export function validWaterFlowRecord(row) {
  try { if (!plain(row)) return false; if (!Object.hasOwn(row, 'waterFlow')) return true; exact(row.waterFlow, ['progress', 'result'], 'water history'); return same(row.waterFlow.result, canonicalWaterProgress(row.missionId, row.waterFlow.progress)); } catch { return false; }
}
export function validWaterFlowRequirement(run) { return plain(run) && (!Object.hasOwn(run, 'waterFlowVersion') || Boolean(Object.hasOwn(WATER_FLOW, run.missionId) && run.waterFlowVersion === WATER_FLOW[run.missionId].version)); }
export function entryWaterProgress(run) { requireValue(validWaterFlowRequirement(run), 'unsupported water-flow version'); const progress = createWaterProgress(run.missionId); return { waterFlowVersion: progress.version, waterProgress: progress, notice: '已回委託安全入口；本次重新核驗閥位與供水，先前現場水路進度未保留。' }; }
