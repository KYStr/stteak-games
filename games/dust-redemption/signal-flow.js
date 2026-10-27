// Source-only immutable event rules. No DOM, clock, storage, actor creation or rewards.
const clone = (v) => JSON.parse(JSON.stringify(v));
const freeze = (v) => { if (v && typeof v === 'object') { Object.values(v).forEach(freeze); Object.freeze(v); } return v; };
const plain = (v) => Boolean(v && typeof v === 'object' && !Array.isArray(v) && [Object.prototype, null].includes(Object.getPrototypeOf(v)));
const stable = (v) => JSON.stringify(Array.isArray(v) ? v.map(x => JSON.parse(stable(x))) : plain(v) ? Object.fromEntries(Object.keys(v).sort().map(k => [k, JSON.parse(stable(v[k]))])) : v);
const same = (a, b) => stable(a) === stable(b);
const check = (v, message) => { if (!v) throw new Error(`Signal flow: ${message}`); };
const exact = (v, keys, label) => check(plain(v) && Object.keys(v).length === keys.length && keys.every(k => Object.hasOwn(v, k)), `${label} has missing/unknown fields`);
const point = (v) => Array.isArray(v) && v.length === 2 && v.every(n => Number.isFinite(n) && Math.abs(n) <= 23);
const dist = (a, b) => Math.hypot(a[0] - b[0], a[1] - b[1]);
const angle = (value, target) => Number.isFinite(value) && Math.abs(value - target) < .01;
const grounded = (c) => c.earthSocketId === 'earth-socket' && c.earthDistance <= .015;
const powered = (c) => angle(c.powerAngle, 1.05);
const members = ['worker-014', 'worker-027', 'worker-031', 'worker-046'];

export const SIGNAL_FLOW = freeze({ 'last-signal': {
  version: 1, missionId: 'last-signal', title: '最後一班電報：本次名單與真實收件',
  evidence: {
    'signal-wire': { recordId: 'manual-disconnection-17', title: '完好的電線', position: [-16, 8], radius: 2.8, facts: { lineIntact: true, cause: 'manual-disconnection', earthBeforePower: true }, text: '不是線路斷裂；先把三橫線接地，再送電。拔地線會讓本次發送與回覆證明失效，重接即可重送。' },
    'signal-roster': { recordId: 'missing-shift-roster-17', title: '消失的值班表', position: [16, 4], radius: 2.8, facts: { rosterId: 'mine-missing-shift-17', batch: 'M17', memberIds: members }, text: 'M17 班完整名單：014 艾達、027 巴斯、031 柯爾、046 黛拉；四人的工號均被刪去，其中 027 的親屬在守軍當值。' },
    'signal-code': { recordId: 'public-and-standdown-code-17', title: '替換密碼紙', position: [-15, -8], radius: 2.8, facts: { batch: 'M17', publicCode: 'POST-17', standdownOrder: 'standdown-order-17', southReceiver: 'signal-south-receiver' }, text: 'POST-17 驛線可傳四人完整名單並取得本次回覆；停火線傳第17號調令，再把同一份完整名單隨袋交奧林。兩法都要收件簽名，不能把公司舊封鎖回覆當成今日回條。' },
  },
  roster: { id: 'mine-missing-shift-17', batch: 'M17', memberIds: members, names: ['艾達', '巴斯', '柯爾', '黛拉'], position: [11, 5], radius: 2.3, sourcePart: 'roster-sheet', fieldChoiceId: 'verify-complete-roster' },
  earth: { taskId: 'signal-earth', position: [-13, 12], radius: 2.3, legacyChoiceId: 'earth-then-power', earthPart: 'earth-plug', powerPart: 'power-lever', maximumSeatedDistance: .015 },
  patch: { taskId: 'signal-patch', position: [11, 5], radius: 2.3, selectorId: 'line-selector', sendKeyId: 'dispatch-key' },
  channels: {
    'public-dispatch': { title: '公開驛線', selectorAngle: -.65, content: 'complete-roster', receiveMode: 'public-reply', messageCode: 'POST-17', traceResponse: true, message: '在西側或南側既有中繼擇一真接入，公開完整名單與家屬副本；追線支路可預先切斷。' },
    'ceasefire-line': { title: '守軍停火線', selectorAngle: .65, content: 'standdown-order', receiveMode: 'physical-pouch', messageCode: 'standdown-order-17', traceResponse: false, fieldChoiceId: 'ceasefire-dispatch', message: '送出第17號調令，現有查線守軍退往指定掩體。完整名單仍在同一信袋，必須親手送到南側。' },
  },
  endpoints: {
    'relay-west': { title: '西側掩體中繼', position: [-12, -11], radius: 1.8, fieldChoiceId: 'public-west-relay', fieldStepId: 'relay-west', cover: { id: 'signal-relay-west-cover', position: [-10.3, -11], size: [1, 1.8, 2.8], tradeoff: '東側木箱遮線，南北仍有側翼開口' } },
    'relay-south': { title: '南側開闊中繼', position: [-12, -4], radius: 1.8, fieldChoiceId: 'public-south-relay', fieldStepId: 'relay-south', cover: null, tradeoff: '視野開放，可預先觀察追線守軍；沒有新增高掩體' },
  },
  traceBranch: { id: 'trace-branch-switch', position: [11, 5], radius: 2.3, closedAngle: 0, cutAngle: 1.05, text: '這條帶守軍印記的追線支路不承載主訊息；切開它不會截斷公共驛線。' },
  pouch: { id: 'complete-roster-pouch', position: [11, 5], shelfY: 1.72, radius: 2.3, tether: 1.8, unique: true, contains: members },
  receiver: { id: 'signal-south-receiver', title: '奧林的南側收件台', characterId: 'orin', position: [-10, 14], radius: 1.8, poseTolerance: .08 },
  actors: {
    'signal-1': { initialOrder: 'guard', position: [-7, 0], standdownPosition: [-11, 3] },
    'signal-2': { initialOrder: 'guard', position: [7, -3] },
    'signal-3': { initialOrder: 'guard', position: [-5, -10] },
    'signal-4': { initialOrder: 'guard', position: [9, -12] },
    'signal-5': { initialOrder: 'standby', position: [1, -5], standdownPosition: [4, -9] },
  },
  response: { id: 'trace-public-cable-17', actorIds: ['signal-1', 'signal-5'], sourcePosition: [1, -5], warning: '守軍看見公共訊號，將沿可見電纜前往選定中繼查線。切斷接線台上的追線支路可取消本次查驗；主驛線仍能傳訊。', minimumAttackTelegraphMs: 800, spawn: false },
  mistake: { alertDelta: 1, exposureSeconds: 1.5, permanentResourceCost: 0, blocksInput: false },
  receipt: { id: 'complete-roster-receipt-17', title: '奧林簽收的完整名單回條', replaces: 'last-signal-cargo', exit: [-12, 18], rewardDelta: 0 },
} });

const definitions = id => { check(Object.hasOwn(SIGNAL_FLOW, id), 'unknown mission'); return SIGNAL_FLOW[id]; };
const eventKeys = {
  'evidence-observed': ['sourceId', 'recordId', 'playerPosition'],
  'contacts-observed': ['contactSnapshot', 'playerPosition'],
  'power-verified': ['contactSnapshot', 'playerPosition'],
  'roster-verified': ['rosterId', 'batch', 'memberIds', 'playerPosition'],
  'channel-selected': ['choiceId', 'selectorAngle', 'playerPosition'],
  'trace-branch-operated': ['angle', 'playerPosition'],
  'endpoint-connected': ['endpointId', 'connected', 'playerPosition'],
  'message-sent': ['messageId', 'rosterId', 'contentIds', 'keyAngle', 'contactSnapshot', 'endpointSnapshot', 'playerPosition'],
  'reply-observed': ['reply', 'contactSnapshot', 'endpointSnapshot', 'playerPosition'],
  'response-warning-presented': ['responseId'], 'response-activated': ['responseId'], 'actor-defeated': ['actorId'],
  'pouch-picked-up': ['entityId', 'pouchPosition', 'playerPosition'],
  'pouch-dropped': ['entityId', 'pouchPosition', 'playerPosition'],
  'roster-received': ['receiverId', 'receiverPosition', 'playerPosition', 'rosterId', 'memberIds', 'replyTo', 'pouchPosition', 'contactSnapshot', 'endpointSnapshot'],
};
function contacts(c) {
  exact(c, ['earthSocketId', 'earthDistance', 'powerAngle'], 'contact snapshot');
  check(['battery-socket', 'earth-socket', 'service-socket', 'open'].includes(c.earthSocketId) && Number.isFinite(c.earthDistance) && c.earthDistance >= 0 && c.earthDistance <= 5 && Number.isFinite(c.powerAngle) && Math.abs(c.powerAngle) <= Math.PI * 2, 'invalid physical contacts');
}
function endpoint(c) { exact(c, ['endpointId', 'connected'], 'endpoint snapshot'); check((c.endpointId === null || ['relay-west', 'relay-south'].includes(c.endpointId)) && typeof c.connected === 'boolean' && (c.endpointId !== null || c.connected === false), 'invalid endpoint snapshot'); }
const strings = (v) => Array.isArray(v) && v.length <= 8 && v.every(s => typeof s === 'string' && s.length > 0 && s.length <= 96) && new Set(v).size === v.length;
function validateEvent(e) {
  check(plain(e) && Object.hasOwn(eventKeys, e.type), 'unknown event type');
  exact(e, ['id', 'type', ...eventKeys[e.type]], 'event');
  check(typeof e.id === 'string' && /^[A-Za-z0-9][A-Za-z0-9:._-]{0,95}$/.test(e.id), 'invalid event ID');
  for (const key of eventKeys[e.type]) {
    const v = e[key];
    if (key.endsWith('Position')) check((key === 'pouchPosition' && e.type === 'roster-received' && v === null) || point(v), `invalid ${key}`);
    else if (key === 'contactSnapshot') contacts(v);
    else if (key === 'endpointSnapshot') endpoint(v);
    else if (key === 'memberIds' || key === 'contentIds') check(strings(v), `invalid ${key}`);
    else if (key === 'connected') check(typeof v === 'boolean', 'invalid connection');
    else if (['selectorAngle', 'keyAngle', 'angle'].includes(key)) check(Number.isFinite(v), 'invalid control angle');
    else if (key === 'reply') { exact(v, ['messageId', 'revision', 'rosterId', 'contentIds', 'receiverId', 'lampAngle'], 'reply'); check(Number.isInteger(v.revision) && v.revision >= 0 && strings(v.contentIds) && Number.isFinite(v.lampAngle) && ['messageId', 'rosterId', 'receiverId'].every(k => typeof v[k] === 'string' && v[k].length > 0 && v[k].length <= 96), 'invalid actual reply'); }
    else check(typeof v === 'string' && v.length > 0 && v.length <= 96, `invalid ${key}`);
  }
}
function initial(flow) {
  return { evidence: {}, contacts: null, groundBeforePower: false, powerRevision: null, revision: 0, rosterVerified: false, channel: null, endpoint: { endpointId: null, connected: false }, traceConnected: true,
    transmission: null, reply: null, sentIds: [], standdownIssued: false, pouch: { carrier: null, position: [...flow.pouch.position], delivered: false }, receipt: null,
    actors: Object.fromEntries(Object.entries(flow.actors).map(([id, actor]) => [id, { defeated: false, order: actor.initialOrder }])),
    response: { status: 'waiting', warned: false, presented: false, activated: false, reason: null } };
}
function apply(flow, current, e) {
  const v = clone(current), effects = [], add = (type, data) => effects.push({ type, ...clone(data) });
  const duplicate = () => ({ view: current, effects: [], changed: false });
  const near = (actual, expected, radius, label) => check(dist(actual, expected) <= radius + 1e-8, `${label} requires actual nearby position`);
  const mistake = message => add('recoverableMistake', { ...flow.mistake, message });
  const invalidate = reason => { v.transmission = null; v.reply = null; add('invalidateSignalProof', { revision: v.revision, reason, retainedRoster: flow.roster.id }); };
  const livePower = () => v.contacts && grounded(v.contacts) && powered(v.contacts) && v.groundBeforePower && v.powerRevision === v.revision;
  const compare = () => { check(same(e.contactSnapshot, v.contacts) && same(e.endpointSnapshot, v.endpoint), 'physical snapshot differs from recorded contacts or endpoint'); check(livePower(), 'current grounded power proof is invalid'); };
  const living = () => flow.response.actorIds.filter(id => !v.actors[id].defeated);
  const order = (ids, name, targetId) => { const live = ids.filter(id => !v.actors[id].defeated); if (live.length) { for (const id of live) v.actors[id].order = name; add('setActorOrder', { actorIds: live, order: name, targetId, resetEngagement: ['standby', 'hold', 'standdown'].includes(name) }); } };
  const stopResponse = reason => { if (['prevented', 'cancelled', 'neutralized'].includes(v.response.status)) return; v.response.status = v.response.warned ? 'cancelled' : 'prevented'; v.response.reason = reason; order(flow.response.actorIds, 'standby', 'original-signal-posts'); add('setResponseState', { responseId: flow.response.id, ...v.response }); };
  const sourcePosition = () => v.channel === 'public-dispatch' ? flow.endpoints[v.endpoint.endpointId]?.position : flow.patch.position;
  const contentIds = () => v.channel === 'public-dispatch' ? flow.roster.memberIds : ['standdown-order-17'];
  if (['contacts-observed', 'endpoint-connected', 'channel-selected', 'message-sent', 'trace-branch-operated'].includes(e.type)) check(!v.receipt, 'received roster is sealed; controls are locked');
  if (e.type === 'evidence-observed') {
    const source = flow.evidence[e.sourceId]; check(source && source.recordId === e.recordId, 'unknown evidence'); near(e.playerPosition, source.position, source.radius, 'evidence');
    if (v.evidence[e.sourceId]) return duplicate(); v.evidence[e.sourceId] = e.recordId; add('showSignalEvidence', { sourceId: e.sourceId, ...source });
  } else if (e.type === 'contacts-observed') {
    near(e.playerPosition, flow.earth.position, flow.earth.radius, 'power operation');
    if (same(v.contacts, e.contactSnapshot)) return duplicate();
    const old = v.contacts, fresh = e.contactSnapshot;
    const risingPower = powered(fresh) && (!old || !powered(old));
    if (!grounded(fresh) || !powered(fresh)) v.groundBeforePower = false;
    else if (risingPower) v.groundBeforePower = Boolean(old && grounded(old));
    v.contacts = clone(fresh); v.revision++; v.powerRevision = null; invalidate('physical-power-contact-changed');
    add('showSignalContacts', { contactSnapshot: fresh, revision: v.revision });
    if (powered(fresh) && !v.groundBeforePower) mistake('先在三橫線座確實接地，再把電源桿退下重送；本次發送與回覆已失效，名單不會消失。');
  } else if (e.type === 'power-verified') {
    near(e.playerPosition, flow.earth.position, flow.earth.radius, 'power verification');
    check(v.evidence['signal-wire'] && same(v.contacts, e.contactSnapshot), 'read the wire evidence and actual contacts first');
    if (!grounded(v.contacts) || !powered(v.contacts) || !v.groundBeforePower) mistake('實際接地與先後順序未成立；立即重接並重新送電即可。');
    else if (v.powerRevision === v.revision) return duplicate();
    else { v.powerRevision = v.revision; add('confirmSignalPower', { revision: v.revision, fieldChoiceId: flow.earth.legacyChoiceId }); }
  } else if (e.type === 'roster-verified') {
    near(e.playerPosition, flow.roster.position, flow.roster.radius, 'roster verification');
    check(Object.keys(flow.evidence).every(id => v.evidence[id]), 'read all three actual evidence sources');
    if (e.rosterId !== flow.roster.id || e.batch !== flow.roster.batch || !same(e.memberIds, flow.roster.memberIds)) mistake('批號與四個工號必須全部對得上；家屬副本不能少人。請回看原值班表與替換碼，立即修正。');
    else if (v.rosterVerified) return duplicate();
    else { v.rosterVerified = true; add('verifyCompleteRoster', { rosterId: flow.roster.id, batch: flow.roster.batch, memberIds: flow.roster.memberIds, fieldChoiceId: flow.roster.fieldChoiceId }); }
  } else if (e.type === 'channel-selected') {
    near(e.playerPosition, flow.patch.position, flow.patch.radius, 'line selector');
    const channel = flow.channels[e.choiceId]; check(channel && angle(e.selectorAngle, channel.selectorAngle), 'selected channel differs from actual selector'); check(v.rosterVerified && livePower(), 'verify full roster and grounded power first');
    if (v.channel === e.choiceId) return duplicate(); check(!v.channel, 'local communication choices are mutually exclusive');
    v.channel = e.choiceId; add('selectSignalChannel', { channelId: e.choiceId, ...channel });
  } else if (e.type === 'trace-branch-operated') {
    near(e.playerPosition, flow.traceBranch.position, flow.traceBranch.radius, 'trace branch');
    check(angle(e.angle, 0) || angle(e.angle, 1.05), 'trace branch is between physical stops');
    const connected = angle(e.angle, 0); if (connected === v.traceConnected) return duplicate();
    v.traceConnected = connected; add('setTraceBranchState', { connected, affectsMainSignal: false });
    if (!connected) stopResponse('trace-branch-cut');
  } else if (e.type === 'endpoint-connected') {
    const target = flow.endpoints[e.endpointId]; check(target && v.channel === 'public-dispatch', 'public channel and known relay required'); near(e.playerPosition, target.position, target.radius, 'relay connection');
    check(!v.endpoint.endpointId || v.endpoint.endpointId === e.endpointId, 'only the selected physical endpoint may be repaired');
    if (same(v.endpoint, { endpointId: e.endpointId, connected: e.connected })) return duplicate();
    check(e.connected || v.endpoint.endpointId, 'cannot disconnect an unselected endpoint');
    v.endpoint = { endpointId: e.endpointId, connected: e.connected }; v.revision++; v.powerRevision = v.contacts && grounded(v.contacts) && powered(v.contacts) && v.groundBeforePower ? v.revision : null;
    invalidate('physical-relay-changed'); add('setSignalEndpoint', { ...v.endpoint, position: target.position, fieldChoiceId: target.fieldChoiceId });
  } else if (e.type === 'message-sent') {
    check(v.channel && v.rosterVerified && e.rosterId === flow.roster.id, 'verify the current roster and select a channel'); compare();
    check(v.channel !== 'public-dispatch' || v.endpoint.connected, 'connect the selected public relay'); near(e.playerPosition, sourcePosition(), 2.3, 'actual transmit key');
    check(angle(e.keyAngle, 1.05), 'press the actual transmit key');
    if (!same(e.contentIds, contentIds())) mistake('所送內容與本次路線不符：公開線要四人完整名單；停火線送第17號調令，完整名單另隨同一信袋交付。');
    else {
      if (v.transmission?.messageId === e.messageId) return duplicate();
      check(!v.sentIds.includes(e.messageId), 'message ID from an invalidated or different transmission cannot be reused');
      v.sentIds.push(e.messageId); v.transmission = { messageId: e.messageId, revision: v.revision, rosterId: flow.roster.id, contentIds: contentIds(), receiverId: flow.receiver.id }; v.reply = null;
      add('sendSignalMessage', { ...v.transmission, channelId: v.channel, endpointId: v.endpoint.endpointId, requestReplyAfterPresentation: true });
      if (v.channel === 'ceasefire-line') {
        if (!v.standdownIssued) {
          v.standdownIssued = true;
          if (v.response.status === 'waiting') { v.response.status = 'prevented'; v.response.reason = 'standdown-order'; }
          order(flow.response.actorIds, 'standdown', 'signal-standdown-cover'); add('setResponseState', { responseId: flow.response.id, ...v.response });
        }
      } else if (v.response.status === 'waiting') {
        if (!living().length) { v.response.status = 'neutralized'; v.response.reason = 'existing-responders-defeated'; }
        else if (!v.traceConnected) stopResponse('trace-branch-cut');
        else { v.response.status = 'warned'; v.response.warned = true; order(flow.response.actorIds, 'hold', 'original-signal-posts'); add('announceSignalResponse', { responseId: flow.response.id, text: flow.response.warning, actorIds: living(), targetId: v.endpoint.endpointId, minimumAttackTelegraphMs: 800, spawn: false }); }
        add('setResponseState', { responseId: flow.response.id, ...v.response });
      }
    }
  } else if (e.type === 'reply-observed') {
    compare(); check(v.transmission, 'send a current message before observing a reply'); near(e.playerPosition, flow.receiver.position, 2.3, 'actual south receiving reply indicator');
    const expected = { ...v.transmission, lampAngle: e.reply.lampAngle };
    check(same(e.reply, expected) && angle(e.reply.lampAngle, 1.05), 'reply must be the lit acknowledgement for this exact message, revision and content');
    if (v.reply) return duplicate(); v.reply = clone(e.reply); add('confirmSignalReply', { ...v.reply, channelId: v.channel });
  } else if (e.type === 'response-warning-presented') {
    check(e.responseId === flow.response.id, 'unknown response'); if (v.response.presented || ['prevented', 'cancelled', 'neutralized'].includes(v.response.status)) return duplicate();
    check(v.response.status === 'warned', 'warn before presenting response'); v.response.presented = true;
  } else if (e.type === 'response-activated') {
    check(e.responseId === flow.response.id, 'unknown response'); if (v.response.activated || ['prevented', 'cancelled', 'neutralized'].includes(v.response.status)) return duplicate();
    check(v.response.status === 'warned' && v.response.presented, 'actually present the warning before guard movement');
    v.response.activated = true; v.response.status = 'active'; order(flow.response.actorIds, 'investigate', v.endpoint.endpointId); add('setResponseState', { responseId: flow.response.id, ...v.response });
  } else if (e.type === 'actor-defeated') {
    check(Object.hasOwn(v.actors, e.actorId), 'unknown existing signal guard'); if (v.actors[e.actorId].defeated) return duplicate();
    v.actors[e.actorId] = { defeated: true, order: 'defeated' };
    if (!living().length && ['waiting', 'warned', 'active'].includes(v.response.status)) { v.response.status = 'neutralized'; v.response.reason = 'existing-responders-defeated'; add('setResponseState', { responseId: flow.response.id, ...v.response }); }
  } else if (e.type === 'pouch-picked-up') {
    check(v.channel === 'ceasefire-line' && v.rosterVerified && e.entityId === flow.pouch.id && !v.pouch.delivered, 'only the complete verified roster pouch may be carried');
    near(e.pouchPosition, v.pouch.position, .08, 'same physical pouch'); near(e.playerPosition, e.pouchPosition, flow.pouch.radius, 'pouch pickup');
    if (v.pouch.carrier === 'player') return duplicate(); v.pouch.carrier = 'player'; add('setSignalPouchCarrier', { entityId: flow.pouch.id, carrier: 'player', memberIds: flow.roster.memberIds });
  } else if (e.type === 'pouch-dropped') {
    check(e.entityId === flow.pouch.id && v.pouch.carrier === 'player' && !v.pouch.delivered, 'hold the same pouch before dropping'); near(e.playerPosition, e.pouchPosition, flow.pouch.tether, 'physical carried pouch');
    v.pouch.position = clone(e.pouchPosition); v.pouch.carrier = null; add('setSignalPouchCarrier', { entityId: flow.pouch.id, carrier: null, position: e.pouchPosition });
  } else if (e.type === 'roster-received') {
    check(e.receiverId === flow.receiver.id && e.rosterId === flow.roster.id && same(e.memberIds, flow.roster.memberIds), 'receiver signs the complete current roster, never a partial or substitute list');
    near(e.receiverPosition, flow.receiver.position, flow.receiver.poseTolerance, 'south receiver'); near(e.playerPosition, e.receiverPosition, flow.receiver.radius, 'roster arrival'); compare();
    check(v.transmission && v.reply && v.reply.revision === v.revision && e.replyTo === v.reply.messageId, 'observe the matching current reply before receipt');
    if (v.receipt) return duplicate();
    if (v.channel === 'ceasefire-line') { check(v.pouch.carrier === 'player' && point(e.pouchPosition), 'carry the same complete roster pouch to the south receiver'); near(e.playerPosition, e.pouchPosition, flow.pouch.tether, 'pouch arrival'); near(e.pouchPosition, e.receiverPosition, flow.receiver.radius, 'pouch handoff'); v.pouch.carrier = null; v.pouch.delivered = true; v.pouch.position = clone(e.pouchPosition); add('transferSignalPouch', { entityId: flow.pouch.id, receiverId: flow.receiver.id, memberIds: flow.roster.memberIds }); }
    else check(e.pouchPosition === null, 'public receipt must not invent a second carried roster pouch');
    v.receipt = { id: flow.receipt.id, receiverId: flow.receiver.id, rosterId: flow.roster.id, memberIds: [...flow.roster.memberIds], messageId: v.reply.messageId, revision: v.revision, receiveMode: flow.channels[v.channel].receiveMode };
    add('issueSignalReceipt', { receipt: v.receipt, replaces: flow.receipt.replaces, exit: flow.receipt.exit, lockControls: true, rewardDelta: 0 });
  }
  return { view: v, effects, changed: true };
}
function replay(id, state) {
  const flow = definitions(id); exact(state, ['version', 'missionId', 'events'], 'signal progress');
  check(state.version === 1 && state.missionId === id && Array.isArray(state.events) && state.events.length <= 512, 'invalid signal header');
  let view = initial(flow); const ids = new Set();
  for (const e of state.events) { validateEvent(e); check(!ids.has(e.id), 'duplicate event ID'); ids.add(e.id); const result = apply(flow, view, e); check(result.changed, 'saved semantic duplicate'); view = result.view; }
  return { flow, view };
}
function summary(flow, v) {
  const publicEndpoint = v.endpoint.endpointId && flow.endpoints[v.endpoint.endpointId];
  return { version: 1, missionId: flow.missionId, complete: Boolean(v.receipt), evidence: clone(v.evidence), revision: v.revision, contactSnapshot: clone(v.contacts), powerVerified: v.powerRevision === v.revision && v.groundBeforePower, rosterVerified: v.rosterVerified,
    localChoices: v.channel ? { channel: v.channel, ...(v.endpoint.endpointId ? { endpoint: v.endpoint.endpointId } : {}) } : {}, endpointSnapshot: clone(v.endpoint), traceConnected: v.traceConnected, transmission: clone(v.transmission), reply: clone(v.reply), pouch: clone(v.pouch), receipt: clone(v.receipt), response: clone(v.response), actors: clone(v.actors), defeatedActors: Object.keys(v.actors).filter(id => v.actors[id].defeated),
    fieldChoices: v.channel ? { 'signal-earth': 'earth-then-power', 'signal-patch': 'verify-complete-roster', 'signal-relay': v.channel === 'ceasefire-line' ? 'ceasefire-dispatch' : publicEndpoint?.fieldChoiceId ?? null } : {}, rewardDelta: 0 };
}
export function createSignalProgress(id) { definitions(id); return { version: 1, missionId: id, events: [] }; }
export function recordSignalEvent(id, state, event) {
  const { flow, view } = replay(id, state); validateEvent(event);
  const existing = state.events.find(row => row.id === event.id);
  if (existing) { check(same(existing, event), 'event ID reused with different payload'); return { state: clone(state), accepted: false, duplicate: true, effects: [], status: summary(flow, view) }; }
  const result = apply(flow, view, event); if (!result.changed) return { state: clone(state), accepted: false, duplicate: true, effects: [], status: summary(flow, view) };
  check(state.events.length < 512, 'event log limit reached');
  return { state: { ...clone(state), events: [...clone(state.events), clone(event)] }, accepted: true, duplicate: false, effects: result.effects.map((effect, i) => ({ effectId: `${id}:signal-v1:${event.id}:${i}`, ...effect })), status: summary(flow, result.view) };
}
export function canonicalSignalProgress(id, state, { requireComplete = true } = {}) { check(typeof requireComplete === 'boolean', 'invalid completion option'); const { flow, view } = replay(id, state); if (requireComplete) check(view.receipt && view.reply && view.transmission && view.reply.revision === view.revision, 'actual complete-roster receipt is incomplete'); return summary(flow, view); }
export function signalFlowRecord(id, state) { return { progress: clone(state), result: canonicalSignalProgress(id, state) }; }
export function validSignalFlowRecord(row) { try { if (!plain(row)) return false; if (!Object.hasOwn(row, 'signalFlow')) return true; exact(row.signalFlow, ['progress', 'result'], 'signal history'); return same(row.signalFlow.result, canonicalSignalProgress(row.missionId, row.signalFlow.progress)); } catch { return false; } }
export function validSignalFlowRequirement(run) { return plain(run) && (!Object.hasOwn(run, 'signalFlowVersion') || (run.missionId === 'last-signal' && run.signalFlowVersion === 1)); }
export function entrySignalProgress(run) { check(validSignalFlowRequirement(run), 'unsupported signal version'); return { signalFlowVersion: 1, signalProgress: createSignalProgress(run.missionId), notice: '已回委託安全入口；重新核對接地、名單與本次回覆，先前現場接線進度未保留。' }; }
