import { packWinds, accumulateWinds, LIFT, CHARGE, WIND_X, WIND_Z, BOOST, COUNT, DIRECTION_X, DIRECTION_Z, TIME, PHASE } from './wind-physics.js';
import { length2 } from './math.js';
import { WORLD, MODULES, STATIONS, islandById, EXPEDITION_LIMIT_SECONDS } from './world.js';
import { defaultSave, validateSave, SAVE_VERSION } from './storage.js';
import { planSafeTransit } from './transit.js';

const clamp = (n, low, high) => Math.max(low, Math.min(high, n));
const copy = (value) => JSON.parse(JSON.stringify(value));
const horizontalSquared = (a, b) => { const dx=a.x-b.x,dz=a.z-b.z; return dx*dx+dz*dz; };
const normalizeSeed = (seed) => {
  if (Number.isFinite(Number(seed))) return Math.trunc(Number(seed)) >>> 0;
  let hash = 2166136261;
  for (const char of String(seed)) hash = Math.imul(hash ^ char.charCodeAt(0), 16777619);
  return hash >>> 0;
};

/** Pure deterministic simulation. Call step at a fixed 1/60 second cadence. */
export class FlightSimulation {
  constructor({ seed = 1, module = 'turn', save } = {}) {
    this.events = [];
    this.persisted = validateSave(save) || defaultSave();
    this._setup({ seed: save ? this.persisted.seed : seed, module: save ? this.persisted.module : module, resume: !!save });
  }
  _setup({ seed, module, resume = false }) {
    const saved = this.persisted, checkpoint = resume ? saved.activeCampaignCircuit != null ? WORLD.campaignCircuits[saved.activeCampaignCircuit].stages[saved.campaignCircuitStages[saved.activeCampaignCircuit]].fromIslandId : saved.checkpoint : 'island-camp', island = islandById(checkpoint);
    this.state = {
      seed: normalizeSeed(seed), module: MODULES.some((m) => m.id === module) ? module : 'turn',
      player: { x: island.x, y: island.y, z: island.z, vx: 0, vy: 0, vz: 0, heading: 0, grounded: true, gliding: false, energy: 100, braking: false },
      elapsed: resume ? saved.elapsed : 0, checkpoint, activated: resume ? [...saved.activated] : [],
      relics: [...saved.relics], challenges: resume ? [...saved.challenges] : [], completedChallenges: [...saved.completedChallenges],
      unlocked: [...saved.unlocked], stalls: resume ? saved.stalls : 0,
      status: resume && saved.failed ? 'failed' : resume && saved.completed ? 'complete' : 'ready', assist: saved.assist, usedAssist: resume ? saved.usedAssist : saved.assist,
      routeStyle: saved.routeStyle, segmentFailures: 0, distance: 0, wind: [], hazard: null, lowEnergy: false,
      lastLanding: { islandId: island.id, precise: true }, score: 0, rating: null, nearby: null,
      objective: null, routeTimes: [], segmentStart: resume ? saved.segmentStart : 0, airTime: 0,
      challengeProgress: {}, activeChallenge: null, challengeHint: null,
      mainSamples: resume ? [...(saved.mainSamples || [0, 0, 0])] : [0, 0, 0],
      returnSamples: resume ? saved.returnSamples : 0,
      campaignCircuitStages: resume ? [...saved.campaignCircuitStages] : [0,0,0],
      activeCampaignCircuit: resume ? saved.activeCampaignCircuit : null, campaignGate: 0,
      mode: saved.mode, activeSeconds: resume ? saved.activeSeconds : 0, failureReason: resume ? saved.failureReason : null,
      surveyHint: null, trackedHint: null, transitWaypoints: [], transitIndex: 0, courseStages: { ...(saved.courseStages || {}) },
      cargoStability: resume ? saved.cargoStability ?? 100 : 100, cargoDamage: resume ? saved.cargoDamage || 0 : 0, navigationMessage: null,
    };
    this.events.length = 0;
    this.eventSpare ||= [];
    this.eventSpare.length = 0;
    this.routePhysics = ['safe','shortcut',null].map(style => packWinds(WORLD.winds.filter(w => !w.routeId || w.style === style)));
    this.stagePhysics = new Map();
    for (const course of [...WORLD.challenges,...WORLD.campaignCircuits]) for (const stage of course.stages) this.stagePhysics.set(stage.id,packWinds(stage.winds));
    this.windForces = new Float64Array(10);
    this.module = MODULES.find(m => m.id === this.state.module);
    this.nearbyRecord = { islandId: '', station: false, name: '', canInteract: false, message: '' };
    this.courseEntries = new Map();
    for (const course of WORLD.challenges) for (const stage of course.stages) {
      const home = islandById(stage.fromIslandId);
      this.courseEntries.set(stage.id, { id: course.id, name: course.name, radius: course.radius, minSpeed: course.minSpeed || 0, minEnergy: course.minEnergy || 0, x: home.x + 18, y: home.y + 22, z: home.z - 18 });
    }
    this.state.mainTransit = []; this.state.mainTransitIndex = 0; this.state.rejoinIndex = null;
    if (resume) this._planMainRejoin();
    this.suppressedChallengeEntries = new Set();
    this._nearby(); this._objective();
    if (this.state.status === 'complete') this._rating();
  }
  get player() { return this.state.player; }
  get elapsed() { return this.state.elapsed; }
  get checkpoint() { return this.state.checkpoint; }
  get activated() { return this.state.activated; }
  get relics() { return this.state.relics; }
  get challenges() { return this.state.challenges; }
  get stalls() { return this.state.stalls; }
  get status() { return this.state.status; }
  set status(value) { if (['ready', 'running', 'paused', 'complete', 'failed'].includes(value)) this.state.status = value; }
  get assist() { return this.state.assist; }
  set assist(value) { this.setAssist(value); }
  get routeStyle() { return this.state.routeStyle; }
  set routeStyle(value) { this.setRouteStyle(value); }
  emit(type, data = {}) { this.events.push({ type, emittedAt: performance.now(), ...data }); }
  launch() {
    if (this.state.status === 'ready' || this.state.status === 'paused') {
      this.state.status = 'running'; this.emit('start'); return true;
    }
    return false;
  }
  setPaused(paused) {
    if (paused && this.state.status === 'running') { this.state.status = 'paused'; this.emit('pause'); }
    else if (!paused && this.state.status === 'paused') { this.state.status = 'running'; this.emit('resume'); }
  }
  setAssist(enabled) { this.state.assist = !!enabled; this.state.usedAssist ||= !!enabled; this.emit('assist', { enabled: !!enabled }); }
  setRouteStyle(style) { this.state.routeStyle = style === 'shortcut' ? 'shortcut' : 'safe'; this._objective(); }
  reset({ seed = this.state.seed, module = this.state.module } = {}) {
    this.persisted = this.saveData();
    this._setup({ seed, module }); this.emit('reset');
  }
  snapshot() { return copy(this.state); }
  drainEvents() { const events = this.events; this.events = this.eventSpare; this.eventSpare = events; this.events.length = 0; return events; }
  campaignStage() { const s = this.state; return s.activeCampaignCircuit == null ? null : WORLD.campaignCircuits[s.activeCampaignCircuit].stages[s.campaignCircuitStages[s.activeCampaignCircuit]]; }
  campaignComplete() { const s = this.state; return s.activated.length === 3 && s.mainSamples.every(n => n === 8) && s.campaignCircuitStages.every(n => n === 3) && s.returnSamples === 6 && !s.surveyHint; }
  setExploration() { this.state.mode = 'exploration'; if (this.status === 'failed') { this.state.status = 'paused'; this.state.failureReason = null; } this.emit('save'); }
  _fail(reason) { const s = this.state; if (s.status !== 'running') return; s.status = 'failed'; s.failureReason = reason; this.emit('failed', { reason }); this.emit('save'); }
  courseStage(challenge) {
    if (!challenge?.stages?.length) return null;
    const saved = this.state.courseStages[challenge.id] || 0;
    return challenge.stages[saved >= challenge.stages.length ? 0 : saved];
  }
  courseEntry(challenge) {
    const stage = this.courseStage(challenge);
    if (!stage) return challenge;
    return this.courseEntries.get(stage.id);
  }
  trackChallenge(id) {
    const challenge = WORLD.challenges.find(c => c.id === id);
    if (this.state.activeCampaignCircuit != null || !challenge || this.state.challenges.includes(id) || !this.player.grounded) return false;
    if (this.state.activeChallenge) this.cancelChallenge();
    const stage = this.courseStage(challenge);
    this.state.transitWaypoints = planSafeTransit(this.state.checkpoint, stage?.fromIslandId || challenge.islandId);
    this.state.transitIndex = 0;
    this._trackedTarget(challenge);
    return true;
  }
  _trackedTarget(challenge) {
    const s = this.state, stage = this.courseStage(challenge), transit = s.transitWaypoints[s.transitIndex];
    s.trackedHint = { id: challenge.id, name: challenge.name, ...(transit || this.courseEntry(challenge)), stageName: stage?.name, stage: (s.courseStages[challenge.id] || 0) % (challenge.stages?.length || 1) + 1, stageTotal: challenge.stages?.length || 1, entry: !transit, transit: !!transit, transitStep: s.transitIndex + 1, transitTotal: s.transitWaypoints.length, step: 0, total: (stage?.gates?.length || 8) + 1, instruction: transit ? `沿安全接駁風標前往${islandById(stage?.fromIslandId || challenge.islandId).name}。不需停留等待。` : `到${islandById(stage?.fromIslandId || challenge.islandId).name}的金環開始本階段。已交付階段不用重跑。` };
    // The course ID owns tracking even when an individual transit point has an ID.
    s.trackedHint.id = challenge.id;
  }
  _returnToCheckpoint() {
    const s = this.state, island = islandById(s.checkpoint);
    Object.assign(s.player, { x: island.x, y: island.y, z: island.z, vx: 0, vy: 0, vz: 0, heading: 0, grounded: true, gliding: false, braking: false, energy: 100 });
    s.wind.length = 0; s.hazard = null; s.lowEnergy = false;
  }
  cancelChallenge() {
    const s = this.state;
    const id = s.activeChallenge || s.trackedHint?.id;
    if (!id) return false;
    this.suppressedChallengeEntries.add(id);
    s.cargoDamage += 100 - s.cargoStability; s.cargoStability = 100;
    delete s.challengeProgress[id]; s.activeChallenge = null; s.challengeHint = null; s.trackedHint = null; s.transitWaypoints = []; s.transitIndex = 0;
    this._returnToCheckpoint(); this._planMainRejoin(); this._objective(); this._nearby();
    this.emit('challenge-reset', { id, reason: 'cancel', message: '已退出並返回最後安全島；主線樣本與已交付階段保留，不加失速懲罰。' }); this.emit('save'); return true;
  }
  saveData() {
    const s = this.state;
    const data = { ...this.persisted, schemaVersion: SAVE_VERSION, seed: s.seed, module: s.module, checkpoint: s.checkpoint, unlocked: [...s.unlocked], activated: [...s.activated], relics: [...s.relics], challenges: [...s.challenges], completedChallenges: [...s.completedChallenges], mainSamples: [...s.mainSamples], returnSamples: s.returnSamples, campaignCircuitStages: [...s.campaignCircuitStages], activeCampaignCircuit: s.activeCampaignCircuit, mode: s.mode, activeSeconds: s.activeSeconds, failed: s.status === 'failed', failureReason: s.failureReason, courseStages: { ...s.courseStages }, cargoStability: s.cargoStability, cargoDamage: s.cargoDamage, elapsed: s.elapsed, segmentStart: s.segmentStart, stalls: s.stalls, assist: s.assist, usedAssist: s.usedAssist, routeStyle: s.routeStyle, completed: s.status === 'complete' };
    if (s.status === 'complete' && this.campaignComplete() && s.mode === 'expedition') {
      const previous = data.records[s.module];
      if (!previous || (previous.assisted && !s.usedAssist) || (previous.assisted === s.usedAssist && s.elapsed < previous.time)) data.records = { ...data.records, [s.module]: { time: s.elapsed, score: s.score, stalls: s.stalls, assisted: s.usedAssist } };
    }
    data.routeRecords = { ...data.routeRecords };
    for (const result of s.mode === 'expedition' ? s.routeTimes : []) {
      const key = `route-${result.mission}-${result.style}`, previous = data.routeRecords[key];
      if (!previous || (previous.assisted && !s.usedAssist) || (previous.assisted === s.usedAssist && result.seconds < previous.time)) data.routeRecords[key] = { time: result.seconds, assisted: s.usedAssist, module: s.module, seed: s.seed };
    }
    this.persisted = copy(data); return data;
  }
  _planMainRejoin() {
    const s = this.state;
    if (s.activeCampaignCircuit != null || s.status === 'complete' || s.status === 'failed') return;
    const route = WORLD.routes.find(r => r.id === `route-${s.activated.length+1}-${s.routeStyle}`);
    const index = s.activated.length === 3 ? s.returnSamples : s.mainSamples[s.activated.length];
    if (index >= route.samples.length) {
      s.mainTransit = s.checkpoint === route.to ? [] : planSafeTransit(s.checkpoint,route.to);
      s.mainTransitIndex = 0; s.rejoinIndex = null; return;
    }
    s.mainTransit = s.checkpoint === route.from ? [] : planSafeTransit(s.checkpoint,route.from);
    s.mainTransitIndex = 0; s.rejoinIndex = index > 0 ? 0 : null;
  }
  _objective() {
    const s = this.state, destination = islandById(STATIONS[s.activated.length] || 'island-camp');
    s.objective = { islandId: destination.id, name: destination.name, step: s.activated.length + 1, total: 4, x: destination.x, y: destination.y, z: destination.z, routeId: `route-${s.activated.length + 1}-${s.routeStyle}`, text: s.activated.length < 3 ? `抵達${destination.name}，在觀測台旁按 E 啟動` : '返回晨風營地，在營火旁按 E 完成遠征' };
    const transit = s.mainTransit[s.mainTransitIndex];
    if (transit && s.activeCampaignCircuit == null) {
      s.surveyHint = { ...transit, mainTransit: true, name: '主線安全接駁', step: s.mainTransitIndex + 1, total: s.mainTransit.length,
        instruction: '沿安全風標回到營地出發空域，再開始新版觀測。' };
      return;
    }
    const circuitStage = this.campaignStage();
    if (circuitStage) {
      const circuit = WORLD.campaignCircuits[s.activeCampaignCircuit], index = s.campaignGate, landing = index >= circuitStage.gates.length;
      const gate = landing ? islandById(circuitStage.toIslandId) : circuitStage.gates[index];
      Object.assign(s.objective, { islandId: circuitStage.toIslandId, name: islandById(circuitStage.toIslandId).name,
        text: `第 ${s.activeCampaignCircuit + 1} 航區 / 測風 ${s.campaignCircuitStages[s.activeCampaignCircuit] + 1}/3 / ${landing ? '落島交付' : `航門 ${index + 1}/9`}` });
      s.surveyHint = { ...gate, radius: landing ? 12 : gate.radius, campaign: true, landing, stageName: circuitStage.name,
        stage: s.campaignCircuitStages[s.activeCampaignCircuit] + 1, stageTotal: 3, step: index + 1, total: 10,
        instruction: landing ? '落到島中央按 E 交付本段。' : gate.instruction };
      return;
    }
    const route = WORLD.routes.find(r => r.id === s.objective.routeId);
    const index = s.activated.length === 3 ? s.returnSamples : s.mainSamples[s.activated.length] || 0;
    const rejoin = s.rejoinIndex != null && s.rejoinIndex < index;
    const sample = route?.samples?.[rejoin ? s.rejoinIndex : index];
    s.surveyHint = sample ? { ...sample, step: index + 1, total: route.samples.length, mission: s.activated.length + 1 } : null;
    if (s.surveyHint && rejoin) Object.assign(s.surveyHint, { rejoin: true, step: s.rejoinIndex + 1, name: `風廊接回 ${s.rejoinIndex + 1}/${index}`, minSpeed: 0, minEnergy: 0, maxVerticalSpeed: undefined, heading: null, instruction: '沿已完成的中心線航標接回風廊；既有觀測保留，不需重做條件。' });
    if (s.surveyHint) s.objective.text = `${s.surveyHint.name} ${index + 1}/${route.samples.length} · ${sample.instruction}`;
  }
  _nearby() {
    const s = this.state, p = s.player;
    if(!p.grounded){s.nearby=null;return;}
    let island = null;
    for(let i=0;i<WORLD.islands.length;i++){const item=WORLD.islands[i];if(horizontalSquared(item,p)<(item.radius-1)**2&&Math.abs(p.y-item.y)<2.5){island=item;break;}}
    let course = null;
    for(let i=0;i<WORLD.challenges.length;i++){const c=WORLD.challenges[i];if(c.id===s.activeChallenge){course=c;break;}}
    const stage = this.campaignStage() || this.courseStage(course);
    const deliveryReady = stage && (s.activeCampaignCircuit != null ? s.campaignGate : s.challengeProgress[course.id] || 0) >= stage.gates.length;
    if (island && p.grounded && horizontalSquared(island,p) < 13*13) {
      const n = this.nearbyRecord;
      n.islandId = island.id; n.station = island.station; n.name = island.name;
      n.canInteract = stage ? !!deliveryReady && island.id === stage.toIslandId : island.id === s.objective?.islandId && !s.surveyHint && !s.trackedHint;
      n.message = stage ? 'E · 交付測風資料' : island.id === 'island-camp' ? 'E · 返回營地' : island.station ? 'E · 啟動觀測台' : '安全補給島';
      s.nearby = n;
    } else s.nearby = null;
  }

  interact() {
    const s = this.state;
    if (s.status !== 'running') return false;
    this._nearby();
    if (!s.nearby) { this.emit('hint', { message: '先安全落地，再靠近島中央的觀測台。' }); return false; }
    if (s.activeCampaignCircuit != null) {
      if (!s.nearby.canInteract) { this.emit('hint', { message: '先完成九座巡測航門，再在指定島中央落地按 E。' }); return false; }
      const index = s.activeCampaignCircuit, stage = this.campaignStage();
      s.campaignCircuitStages[index]++; s.campaignGate = 0;
      s.cargoDamage += 100 - s.cargoStability; s.cargoStability = 100;
      if (s.campaignCircuitStages[index] === 3) { s.activeCampaignCircuit = null; s.segmentStart = s.elapsed; }
      this._objective(); this._nearby(); this._score();
      this.emit('campaign-stage', { message: `${stage.name}已交付。${this.campaignStage()?.description || '巡測完成，接續主線金色航標。'}` }); this.emit('save'); return true;
    }
    if (s.activeChallenge) {
      const challenge = WORLD.challenges.find(c => c.id === s.activeChallenge), stage = this.courseStage(challenge);
      if (!stage || !s.nearby.canInteract) { this.emit('hint', { message: '先依序完成本段觀測，再落到交付島中央。' }); return false; }
      s.courseStages[challenge.id] = (s.courseStages[challenge.id] || 0) + 1;
      delete s.challengeProgress[challenge.id]; s.activeChallenge = null; s.challengeHint = null;
      if (s.courseStages[challenge.id] >= challenge.stages.length) {
        if (!s.challenges.includes(challenge.id)) s.challenges.push(challenge.id);
        if (!s.completedChallenges.includes(challenge.id)) s.completedChallenges.push(challenge.id);
        this.emit('challenge', { id: challenge.id, name: challenge.name });
        this._planMainRejoin();
      } else {
        this.trackChallenge(challenge.id);
        this.emit('challenge-stage', { id: challenge.id, name: challenge.name, step: s.courseStages[challenge.id], total: challenge.stages.length, message: `${stage.name}已交付並保存。從本島的金環接續下一段，或先回主線。` });
      }
      s.cargoDamage += 100 - s.cargoStability; s.cargoStability = 100;
      this._objective(); this._nearby(); this._score(); this.emit('save'); return true;
    }
    if (s.trackedHint) { this.emit('hint', { message: '目前正前往測風遠征。先完成遠征，或退出並返回安全島後交付主線。' }); return false; }
    const target = STATIONS[s.activated.length];
    if (s.nearby.islandId === target) {
      if (s.surveyHint) { this.emit('hint', { message: `尚缺觀測 ${s.surveyHint.step}/${s.surveyHint.total}：${s.surveyHint.name}。沿金色航標完成後再交付。` }); return false; }
      if (s.activated.length === 1) s.cargoDamage += 100 - s.cargoStability;
      s.cargoStability = 100;
      s.activated.push(target); s.segmentFailures = 0;
      // A legacy unknown segment cannot replace a legitimate best. This actual
      // station delivery starts a known clock for the next route.
      if (Number.isFinite(s.segmentStart)) s.routeTimes.push({ mission: s.activated.length, style: s.routeStyle, seconds: s.elapsed - s.segmentStart });
      s.segmentStart = s.elapsed;
      s.activeCampaignCircuit = s.activated.length - 1; s.campaignGate = 0;
      this.emit('station', { islandId: target, index: s.activated.length, dialogue: WORLD.dialogues[s.activated.length - 1] });
      this._objective(); this._nearby(); this._score(); this.emit('save'); return true;
    }
    if (s.nearby.islandId === 'island-camp' && this.campaignComplete()) {
      if (Number.isFinite(s.segmentStart)) s.routeTimes.push({ mission: 4, style: s.routeStyle, seconds: s.elapsed - s.segmentStart });
      s.status = 'complete'; this._rating(); this.emit('complete', { rating: s.rating, score: s.score, ending: WORLD.ending }); this.emit('save'); return true;
    }
    this.emit('hint', { message: `下一個目標：${s.objective.name}。已點亮的觀測台不需再次啟動。` }); return false;
  }
  _score() { const s = this.state; s.score = Math.max(0, Math.round(s.activated.length * 300 + s.relics.length * 100 + s.challenges.length * 250 + (s.status === 'complete' ? 1500 : 0) - s.stalls * 75 - s.elapsed * 0.7)); }
  _rating() {
    const s = this.state; this._score();
    const relicTotal = WORLD.relics.length, challengeTotal = WORLD.challenges.length;
    const allExplored = s.relics.length >= relicTotal && s.challenges.length >= challengeTotal;
    const exploration = allExplored ? 'S' : s.relics.length * 3 >= relicTotal * 2 ? 'A' : s.relics.length * 3 >= relicTotal ? 'B' : 'C';
    const next = s.relics.length < relicTotal ? `再找出 ${relicTotal - s.relics.length} 份文明碎片` : s.challenges.length < challengeTotal ? `再完成 ${challengeTotal - s.challenges.length} 個測風挑戰` : s.stalls ? '挑戰零失速返航' : '換上另一個模組，改善航程時間';
    s.rating = { speed: s.elapsed < 1400 ? 'S' : s.elapsed < 1700 ? 'A' : s.elapsed < 2100 ? 'B' : 'C', stability: s.stalls === 0 && s.cargoDamage < 20 ? 'S' : s.stalls <= 2 && s.cargoDamage < 65 ? 'A' : s.stalls <= 5 ? 'B' : 'C', exploration, assisted: s.usedAssist, next };
  }
  _recover(reason) {
    const s = this.state;
    if (s.activeCampaignCircuit != null) s.checkpoint = this.campaignStage().fromIslandId;
    const island = islandById(s.checkpoint);
    const retryCourse = s.activeChallenge || s.trackedHint?.id;
    s.cargoDamage += 100 - s.cargoStability; s.cargoStability = 100;
    if (s.activeChallenge) {
      const id = s.activeChallenge;
      delete s.challengeProgress[id]; s.activeChallenge = null; s.challengeHint = null;
      this.emit('challenge-reset', { id, reason: 'stall', message: '本段測風中斷；已交付階段保留，回金環重試目前階段。' });
    }
    if (s.activeCampaignCircuit != null) { s.checkpoint = this.campaignStage().fromIslandId; s.campaignGate = 0; this._objective(); }
    this._returnToCheckpoint();
    if (retryCourse) this.trackChallenge(retryCourse);
    else if (s.activeCampaignCircuit == null) { this._planMainRejoin(); this._objective(); }
    s.stalls++; s.segmentFailures++; s.elapsed += 8; s.wind.length = 0; s.hazard = null; s.lowEnergy = false;
    this.emit('stall', { reason, islandId: island.id, penalty: 8, message: `${reason}，已回到${island.name}；本段加計 8 秒，碎片保留。` });
    if (s.segmentFailures === 3 && !s.assist) { this.emit('assist-offer', { message: '這一段已失速三次，可在設定開啟風線輔助。' }); }
    this._nearby(); this._score(); this.emit('save');
  }
  _collect() {
    const s = this.state, p = s.player;
    for (let relicIndex = 0; relicIndex < WORLD.relics.length; relicIndex++) { const relic = WORLD.relics[relicIndex]; if (!s.relics.includes(relic.id) && horizontalSquared(p, relic) < relic.radius*relic.radius && Math.abs(p.y - relic.y) < 4) { s.relics.push(relic.id); this.emit('relic', { id: relic.id, name: relic.name, text: relic.text }); this.emit('save'); } }
    if (!p.gliding) return;
    if (s.activeCampaignCircuit != null) {
      const stage = this.campaignStage();
      if (s.campaignGate < stage.gates.length && this._sampleSatisfied(stage.gates[s.campaignGate])) {
        s.campaignGate++; this.emit('challenge-gate', { id: stage.id, step: s.campaignGate, total: 9, message: [1,4,7].includes(s.campaignGate) ? `${stage.name} ${s.campaignGate}/9 · ${stage.description}` : null }); this._objective();
      }
      return;
    }
    if (!s.activeChallenge) {
      if (s.trackedHint?.transit && this._sampleSatisfied(s.trackedHint)) {
        const challenge = WORLD.challenges.find(c => c.id === s.trackedHint.id);
        s.transitIndex++; this._trackedTarget(challenge);
      }
      if (!s.trackedHint && s.surveyHint && this._sampleSatisfied(s.surveyHint)) {
        const sample = s.surveyHint;
        if (sample.mainTransit) s.mainTransitIndex++; else if (sample.rejoin) { s.rejoinIndex++; } else if (s.activated.length === 3) s.returnSamples++; else s.mainSamples[s.activated.length]++;
        this.emit('survey', { id: sample.id, name: sample.name, step: sample.step, total: sample.total, message: `${sample.name}已記錄 · ${sample.step}/${sample.total}` });
        this._objective(); this.emit('save');
      }
      if (this.suppressedChallengeEntries.size) for (const id of this.suppressedChallengeEntries) {
        const challenge = WORLD.challenges.find((item) => item.id === id);
        const entry = this.courseEntry(challenge);
        if ((p.x-entry.x)**2+(p.y-entry.y)**2+(p.z-entry.z)**2 > (entry.radius+4)**2) this.suppressedChallengeEntries.delete(id);
      }
      let challenge = null;
      if (s.trackedHint?.entry) for (const item of WORLD.challenges) if (item.id === s.trackedHint.id && !s.challenges.includes(item.id) && !this.suppressedChallengeEntries.has(item.id) && this._sampleSatisfied(this.courseEntry(item))) { challenge = item; break; }
      if (!challenge) return;
      if ((s.courseStages[challenge.id] || 0) >= (challenge.stages?.length || Infinity)) s.courseStages[challenge.id] = 0;
      s.activeChallenge = challenge.id; s.challengeProgress[challenge.id] = 0; s.trackedHint = null;
      s.transitWaypoints = []; s.transitIndex = 0;
      s.cargoDamage += 100 - s.cargoStability;
      s.cargoStability = 100;
      this._challengeHint(challenge);
      const stage = this.courseStage(challenge);
      this.emit('challenge-start', { id: challenge.id, name: challenge.name, step: 0, total: (stage?.gates || challenge.gates).length + 1, message: stage ? `${stage.name}：${stage.description}` : challenge.description });
      return;
    }
    let challenge = null;
    for (const item of WORLD.challenges) if (item.id === s.activeChallenge) { challenge = item; break; }
    const stage = this.courseStage(challenge), gates = stage?.gates || challenge.gates;
    const index = s.challengeProgress[challenge.id], target = gates[index] || (stage ? null : challenge);
    if (!target) return;
    if (!this._sampleSatisfied(target)) return;
    if (index < gates.length) {
      s.challengeProgress[challenge.id]++;
      this.emit('challenge-gate', { id: challenge.id, name: challenge.name, step: index + 1, total: gates.length + 1 });
      this._challengeHint(challenge);
    } else {
      s.challengeProgress[challenge.id] = gates.length + 1;
      s.challenges.push(challenge.id); if (!s.completedChallenges.includes(challenge.id)) s.completedChallenges.push(challenge.id);
      p.energy = Math.min(100, p.energy + 15); s.activeChallenge = null; s.challengeHint = null;
      this.emit('challenge', { id: challenge.id, name: challenge.name }); this.emit('save');
    }
  }
  _sampleSatisfied(target) {
    if (!target) return false;
    const p = this.player;
    const tx=p.x-target.x,ty=p.y-target.y,tz=p.z-target.z;
    if (tx*tx+ty*ty+tz*tz >= target.radius*target.radius) return false;
    const speed=length2(p.vx,p.vz);
    if (speed < (target.minSpeed || 0) || speed > (target.maxSpeed ?? Infinity) || p.energy < (target.minEnergy || 0)) return false;
    if (Number.isFinite(target.maxVerticalSpeed) && Math.abs(p.vy) > target.maxVerticalSpeed) return false;
    if (target.heading) {
      const length = length2(target.heading.x, target.heading.z);
      if (speed < 1 || (p.vx * target.heading.x + p.vz * target.heading.z) / (speed * length) < (target.heading.minDot ?? 0.5)) return false;
    }
    return true;
  }
  _challengeHint(challenge) {
    const s = this.state, stage = this.courseStage(challenge), gates = stage?.gates || challenge.gates;
    const index = s.challengeProgress[challenge.id], landing = stage && index >= gates.length;
    const gate = gates[index] || (landing ? { ...islandById(stage.toIslandId), radius: 12, instruction: '安全落地，走到島中央按 E 交付。' } : challenge);
    s.challengeHint = { ...gate, id: challenge.id, name: challenge.name, stageName: stage?.name, stage: (s.courseStages[challenge.id] || 0) + 1, stageTotal: challenge.stages?.length || 1, step: index + 1, total: gates.length + 1, returning: index === gates.length, landing: !!landing };
  }
  step(input = {}, dt = 1 / 60) {
    const s = this.state, p = s.player;
    if (s.status !== 'running' || !Number.isFinite(dt) || dt <= 0) return;
    dt = Math.min(dt, 0.1); s.activeSeconds += dt; s.elapsed += dt;
    if (s.mode === 'expedition' && s.activeSeconds + 1e-8 >= EXPEDITION_LIMIT_SECONDS) { s.activeSeconds = EXPEDITION_LIMIT_SECONDS; this._fail('weather-window'); return; }
    const module = this.module;
    let ix = clamp(Number(input.x) || 0, -1, 1), iz = clamp(Number(input.z) || 0, -1, 1), inputMagnitude = length2(ix, iz);
    if (inputMagnitude > 1) { ix /= inputMagnitude; iz /= inputMagnitude; inputMagnitude = 1; }
    if (input.glide) {
      if (p.grounded) { p.grounded = false; p.gliding = true; p.vy = 15; p.y += 0.15; this.emit('glide', { open: true, requestId: input.requestId || 0 }); }
      else { p.gliding = !p.gliding; this.emit('glide', { open: p.gliding, requestId: input.requestId || 0 }); }
    }
    const oldX = p.x, oldZ = p.z, oldY = p.y, oldVx = p.vx, oldVz = p.vz, oldSpeed = length2(p.vx, p.vz), oldStalls = s.stalls;
    p.braking = !!input.brake;
    if (p.grounded) {
      p.vx = ix * 10; p.vz = iz * 10; p.vy = 0; p.energy = Math.min(100, p.energy + dt * 28);
      p.x += p.vx * dt; p.z += p.vz * dt;
      let ground = null;
      for (let i=0;i<WORLD.islands.length;i++) {const island=WORLD.islands[i];if (horizontalSquared(island,p) <= (island.radius - 1.5)**2 && Math.abs(p.y-island.y) < 2) { ground = island; break; }}
      if (!ground) { p.grounded = false; p.gliding = false; p.vy = 0; this.emit('edge', { message: '已離開島緣，按展帆接住風！' }); }
      s.wind.length = 0; s.hazard = null;
    } else {
      s.airTime += dt;
      let activeChallenge = null;
      if (s.activeCampaignCircuit != null) activeChallenge = WORLD.campaignCircuits[s.activeCampaignCircuit];
      else for (let i=0;i<WORLD.challenges.length;i++) if (WORLD.challenges[i].id === s.activeChallenge) { activeChallenge = WORLD.challenges[i]; break; }
      const activeStage = this.campaignStage() || this.courseStage(activeChallenge);
      const gateIndex = s.activeCampaignCircuit != null ? s.campaignGate : activeChallenge ? s.challengeProgress[activeChallenge.id] : -1;
      const previousWind = s.wind[0], forces = this.windForces;
      forces[LIFT]=forces[CHARGE]=forces[WIND_X]=forces[WIND_Z]=forces[BOOST]=forces[COUNT]=0;
      const dx = inputMagnitude > 0.06 ? ix / inputMagnitude : Math.sin(p.heading), dz = inputMagnitude > 0.06 ? iz / inputMagnitude : -Math.cos(p.heading);
      const base = activeChallenge ? 2 : s.trackedHint || s.mainTransit[s.mainTransitIndex] || s.routeStyle === 'safe' ? 0 : 1;
      const phase = (s.seed % 1009) / 1009 * Math.PI * 2;
      forces[DIRECTION_X]=dx;forces[DIRECTION_Z]=dz;forces[TIME]=s.elapsed;forces[PHASE]=phase;
      accumulateWinds(this.routePhysics[base],p,-1,module.id==='tailwind',forces,s.wind);
      if (activeStage) accumulateWinds(this.stagePhysics.get(activeStage.id),p,gateIndex,module.id==='tailwind',forces,s.wind);
      s.wind.length=forces[COUNT];
      const lift=forces[LIFT],charge=forces[CHARGE],wx=forces[WIND_X],wz=forces[WIND_Z],tailBoost=forces[BOOST];
      if (s.wind[0] && s.wind[0] !== previousWind) this.emit('wind', { wind: s.wind[0] });
      s.hazard = null; let hazardDrain = 0;
      const extraHazard = activeStage?.hazard || activeChallenge?.hazard;
      for (let index = 0; index < WORLD.hazards.length + (extraHazard ? 1 : 0); index++) {
        const hazard = index < WORLD.hazards.length ? WORLD.hazards[index] : extraHazard;
        if (!(horizontalSquared(hazard, p) < hazard.radius*hazard.radius && p.y >= hazard.y && p.y <= hazard.y + hazard.height)) continue;
        s.hazard = hazard.type;
        if (hazard.type === 'thunder' && Math.sin(s.elapsed / hazard.period * Math.PI * 2 + (s.seed % 19)) > 0.15) hazardDrain = 9;
      }
      const speed = p.braking ? 5.2 : (p.gliding ? 16.2 * module.speed + tailBoost : 10);
      const response = 1 - Math.exp(-dt * (p.braking ? 7 : 2.8 * module.turn));
      p.vx += (dx * speed + (p.braking ? 0 : wx) - p.vx) * response;
      p.vz += (dz * speed + (p.braking ? 0 : wz) - p.vz) * response;
      if (p.gliding) {
        const sink = p.braking ? -7 : -1.75 + lift + (s.assist && p.y < s.objective.y + 8 ? 3 : 0);
        p.vy += (sink - p.vy) * (1 - Math.exp(-dt * 2));
        const turnCost = inputMagnitude > 0.06 && oldSpeed > 5 ? Math.abs(p.vx / Math.max(1, oldSpeed) - dx) * 1.5 : 0;
        const drain = (3.2 * module.energy + turnCost + hazardDrain) * (s.assist ? 0.6 : 1);
        p.energy = clamp(p.energy + ((p.braking ? 0 : charge) - drain) * dt, 0, 100);
        const low = p.energy <= Math.max(6.4, (drain - charge) * 2);
        if (low && !s.lowEnergy) this.emit('low-energy', { message: '帆能量不足：立即進入熱流，或減速落島。' });
        s.lowEnergy = low;
      } else { p.vy -= 16 * dt; p.vy = Math.max(-25, p.vy); }
      p.x += p.vx * dt; p.z += p.vz * dt; p.y += p.vy * dt;
      let land = null;
      for (let i=0;i<WORLD.islands.length;i++) {const island=WORLD.islands[i];if (horizontalSquared(island,p) <= (island.radius-1.5)**2 && oldY >= island.y-.4 && p.y <= island.y+.1 && p.vy <= 0) { land = island; break; }}
      if (land) {
        const precise = length2(p.vx, p.vz) < 8.5;
        Object.assign(p, { y: land.y, vy: 0, grounded: true, gliding: false, energy: Math.min(100, p.energy + (precise ? 20 : 7)) });
        s.checkpoint = land.id; s.lastLanding = { islandId: land.id, precise }; if (!s.unlocked.includes(land.id)) s.unlocked.push(land.id);
        this.emit('land', { islandId: land.id, name: land.name, precise }); this.emit('save');
      } else {
        // A tapered solid cliff collider prevents flying through island sides.
        // The flat walkable disc and tapered body are independent of rendering.
        for (let i=0;i<WORLD.islands.length;i++) {
          const island=WORLD.islands[i];
          const depth = island.y - p.y;
          if (depth <= 0.1 || depth >= 38) continue;
          const bodyRadius = island.radius * Math.max(0.15, 1 - Math.max(0, depth - 2) / 43) + 0.75;
          const radiusSquared = horizontalSquared(p, island);
          if (radiusSquared >= bodyRadius*bodyRadius) continue;
          const radius = Math.sqrt(radiusSquared);
          const nx = radius > 0.001 ? (p.x - island.x) / radius : 1, nz = radius > 0.001 ? (p.z - island.z) / radius : 0;
          p.x = island.x + nx * bodyRadius; p.z = island.z + nz * bodyRadius;
          const inwardSpeed = p.vx * nx + p.vz * nz;
          if (inwardSpeed < 0) { p.vx -= inwardSpeed * nx; p.vz -= inwardSpeed * nz; }
        }
      }
      const carrying = activeChallenge ? (activeChallenge.kind === 'crosswind' || activeChallenge.kind === 'stability') : s.activated.length === 1;
      if (carrying && p.gliding && oldSpeed > 5) {
        const speed = length2(p.vx, p.vz);
        const turnRate = Math.acos(clamp((oldVx * p.vx + oldVz * p.vz) / Math.max(0.01, oldSpeed * speed), -1, 1)) / dt;
        const stress = Math.max(0, turnRate - 0.85) * 4 + Math.max(0, -p.vy - 5) * 0.5;
        s.cargoStability = clamp(s.cargoStability - stress * dt, 0, 100);
      }
      if (!p.grounded && (p.y < -55 || p.energy <= 0 || p.x*p.x+p.z*p.z > (WORLD.boundsRadius || 1000)**2)) this._recover(p.energy <= 0 ? '帆能量耗盡' : '離開安全航域');
    }
    if (p.vx*p.vx+p.vz*p.vz > 0.25) p.heading = Math.atan2(p.vx, -p.vz);
    if (s.stalls === oldStalls) s.distance += length2(p.x - oldX, p.z - oldZ);
    this._collect(); this._nearby(); this._score();
  }
}
