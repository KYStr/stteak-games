import { rooms, roomById, puzzles, signals, endings, decks, challenges, ROOM_BOUNDS } from './content.js';

export const SAVE_SCHEMA = 2;
export const FIXED_STEP = 1 / 60;
export const OXYGEN_RATES = Object.freeze({ story: 0.055, standard: 0.16, thrust: 0.04 });
const fail = reason => ({ ok: false, reason });
const active = run => run.status === 'running' && !run.paused;
const unique = array => [...new Set(array)];

export function createRun(mode = 'story') {
  return { schema: SAVE_SCHEMA, mode: mode === 'standard' ? 'standard' : 'story', status: 'running', roomId: 'room-d1-safe', safeRoomId: 'room-d1-safe', oxygen: 100, maxOxygen: 100, health: 100, solvedPuzzles: [], signals: [], endings: [], tools: ['thruster'], unlockedDecks: [1], shortcuts: [], elapsed: 0, paused: false, accumulator: 0, snapshots: {}, challengeId: null, challengeTime: null, challengeRecords: {}, lastFailure: null, stats: { deaths: 0, thrustSeconds: 0, oxygenUsed: 0, resets: 0, puzzlesSolved: 0 }, tutorial: [] };
}

export function getProgress(run) {
  const repairedDecks = decks.filter(deck => deck.puzzleIds.every(id => run.solvedPuzzles.includes(id))).map(deck => deck.id);
  return { repairedDecks, repairedCount: repairedDecks.length, solvedCount: run.solvedPuzzles.length, signalCount: run.signals.length, canFinish: repairedDecks.length === 3, challengeUnlocked: run.endings.length > 0 };
}

export function refreshUnlocks(run) {
  const repaired = getProgress(run).repairedDecks;
  run.unlockedDecks = [1];
  if (repaired.includes(1)) run.unlockedDecks.push(2);
  if (repaired.includes(1) && repaired.includes(2)) run.unlockedDecks.push(3);
  if (run.challengeId) run.unlockedDecks = unique([...run.unlockedDecks, challenges.find(item => item.id === run.challengeId)?.deck].filter(Boolean));
  return run.unlockedDecks;
}

export function enterRoom(run, id) {
  if (!active(run)) return fail('not-running');
  const room = roomById[id];
  if (!room) return fail('unknown-room');
  if (!run.unlockedDecks.includes(room.deck)) return fail('deck-locked');
  if (run.challengeId && room.deck !== challenges.find(item => item.id === run.challengeId)?.deck) return fail('challenge-boundary');
  run.roomId = id;
  if (room.type === 'safe') {
    run.safeRoomId = id;
    run.oxygen = run.maxOxygen;
    run.health = 100;
  }
  return { ok: true, safe: room.type === 'safe', save: room.type === 'safe', room };
}

export function grantTool(run, id) {
  if (!active(run)) return fail('not-running');
  if (!['thruster', 'boots', 'tether'].includes(id)) return fail('unknown-tool');
  const room = roomById[run.roomId];
  if (id !== 'thruster' && !room?.grants?.includes(id)) return fail('tool-not-here');
  const added = !run.tools.includes(id);
  run.tools = unique([...run.tools, id]);
  return { ok: true, added };
}

export function solvePuzzle(run, id) {
  if (!active(run)) return fail('not-running');
  const puzzle = puzzles[id];
  if (!puzzle) return fail('unknown-puzzle');
  if (run.roomId !== puzzle.roomId) return fail('wrong-room');
  if (!run.unlockedDecks.includes(puzzle.deck)) return fail('deck-locked');
  if (puzzle.requiredTool && !run.tools.includes(puzzle.requiredTool)) return fail('tool-required');
  if (run.solvedPuzzles.includes(id)) return { ok: true, alreadySolved: true, save: false };
  run.solvedPuzzles.push(id);
  run.shortcuts = unique([...run.shortcuts, puzzle.roomId]);
  run.stats.puzzlesSolved += 1;
  refreshUnlocks(run);
  const challenge = challenges.find(item => item.id === run.challengeId);
  if (challenge && challenge.puzzleIds.every(puzzleId => run.solvedPuzzles.includes(puzzleId))) {
    run.status = 'completed';
    run.result = { type: 'challenge', id: challenge.id, elapsed: run.elapsed, oxygenUsed: run.stats.oxygenUsed, thrustSeconds: run.stats.thrustSeconds, deaths: run.stats.deaths };
  }
  return { ok: true, save: true, repairedDecks: getProgress(run).repairedDecks, challengeComplete: run.status === 'completed' };
}

export function collectSignal(run, id) {
  if (!active(run)) return fail('not-running');
  if (!signals[id]) return fail('unknown-signal');
  if (signals[id].roomId !== run.roomId) return fail('wrong-room');
  const added = !run.signals.includes(id);
  run.signals = unique([...run.signals, id]);
  return { ok: true, added, signal: signals[id], save: true };
}

export function finishEnding(run, id) {
  if (!active(run)) return fail('not-running');
  if (!endings[id]) return fail('unknown-ending');
  if (run.challengeId) return fail('challenge-run');
  if (!getProgress(run).canFinish) return fail('repairs-incomplete');
  if (run.roomId !== 'room-d3-signal') return fail('wrong-room');
  run.endings = unique([...run.endings, id]);
  run.status = 'completed';
  run.result = { type: 'ending', id, elapsed: run.elapsed, oxygenUsed: run.stats.oxygenUsed, thrustSeconds: run.stats.thrustSeconds, deaths: run.stats.deaths, signals: run.signals.length };
  return { ok: true, ending: endings[id], save: true };
}

// Continue the repaired station to see the other ending without erasing progress.
export function continueRun(run) {
  if (run.challengeId) return fail('challenge-run');
  run.status = 'running';
  run.paused = false;
  run.accumulator = 0;
  delete run.result;
  return { ok: true };
}

export function setPaused(run, paused) {
  run.paused = Boolean(paused);
  run.accumulator = 0;
  return { ok: true, paused: run.paused };
}

export function tick(run, seconds, { thrusting = false, paused = false } = {}) {
  if (!active(run) || paused || !Number.isFinite(seconds) || seconds <= 0) return { ok: true, steps: 0, events: [] };
  // Arithmetic fixed steps avoid frame-rate-dependent consumption and a loop on long input.
  run.accumulator += seconds;
  const steps = Math.floor((run.accumulator + 1e-9) / FIXED_STEP);
  const dt = steps * FIXED_STEP;
  run.accumulator = Math.max(0, run.accumulator - dt);
  run.elapsed += dt;
  if (thrusting) run.stats.thrustSeconds += dt;
  const before = run.oxygen;
  const safe = roomById[run.roomId]?.type === 'safe';
  const used = safe ? 0 : Math.min(run.oxygen, dt * (OXYGEN_RATES[run.mode] + (thrusting ? OXYGEN_RATES.thrust : 0)));
  run.oxygen = Math.max(0, run.oxygen - used);
  run.stats.oxygenUsed += used;
  const events = [];
  for (const level of [25, 10]) if (before > level && run.oxygen <= level) events.push({ type: 'low-oxygen', level });
  if (run.challengeId && Number.isFinite(run.challengeTime)) {
    run.challengeTime = Math.max(0, run.challengeTime - dt);
    if (run.challengeTime === 0) { run.status = 'failed'; run.lastFailure = 'challenge-time'; events.push({ type: 'failure', reason: 'challenge-time' }); }
  }
  if (run.oxygen === 0 && run.status === 'running') { run.status = 'failed'; run.lastFailure = 'oxygen'; events.push({ type: 'failure', reason: 'oxygen' }); }
  return { ok: true, steps, events, failed: run.status === 'failed', reason: run.lastFailure };
}

export function damage(run, amount, reason = 'collision') {
  if (!active(run) || roomById[run.roomId]?.type === 'safe') return { ok: true, ignored: true };
  if (!Number.isFinite(amount) || amount <= 0) return fail('invalid-damage');
  run.health = Math.max(0, run.health - amount);
  if (run.health === 0) { run.status = 'failed'; run.lastFailure = reason; }
  return { ok: true, failed: run.status === 'failed', reason };
}

export function resetPuzzle(run, id = roomById[run.roomId]?.puzzleId) {
  const puzzle = puzzles[id];
  if (!puzzle || puzzle.roomId !== run.roomId) return fail('wrong-room');
  delete run.snapshots[puzzle.roomId];
  run.stats.resets += 1;
  return { ok: true, puzzle, preserveSolved: run.solvedPuzzles.includes(id) };
}

export function respawn(run, reason = run.lastFailure || 'recovery') {
  if (run.challengeId && reason === 'challenge-time') return { ok: false, reason: 'restart-challenge-required' };
  const failedRoom = run.roomId;
  if (roomById[failedRoom]?.puzzleId) delete run.snapshots[failedRoom];
  run.roomId = roomById[run.safeRoomId]?.type === 'safe' ? run.safeRoomId : 'room-d1-safe';
  run.safeRoomId = run.roomId;
  run.oxygen = run.maxOxygen;
  run.health = 100;
  run.status = 'running';
  run.paused = false;
  run.accumulator = 0;
  run.lastFailure = reason;
  run.stats.deaths += 1;
  return { ok: true, reason, roomId: run.roomId, save: true };
}

export function startChallenge(id, storyRun) {
  const challenge = challenges.find(item => item.id === id);
  if (!challenge) return fail('unknown-challenge');
  if (!storyRun?.endings?.length) return fail('challenge-locked');
  const run = createRun('standard');
  run.challengeId = id;
  run.challengeTime = challenge.timeLimit;
  run.roomId = challenge.roomId;
  run.safeRoomId = `room-d${challenge.deck}-safe`;
  run.unlockedDecks = [challenge.deck];
  run.tools = ['thruster', 'boots', 'tether'];
  return { ok: true, run, challenge };
}

export function recordChallenge(storyRun, challengeRun) {
  if (challengeRun.status !== 'completed' || challengeRun.result?.type !== 'challenge') return fail('challenge-incomplete');
  const id = challengeRun.challengeId;
  const prior = storyRun.challengeRecords[id];
  const next = { elapsed: challengeRun.elapsed, oxygenUsed: challengeRun.stats.oxygenUsed, thrustSeconds: challengeRun.stats.thrustSeconds, deaths: challengeRun.stats.deaths };
  storyRun.challengeRecords[id] = prior ? { elapsed: Math.min(prior.elapsed, next.elapsed), oxygenUsed: Math.min(prior.oxygenUsed, next.oxygenUsed), thrustSeconds: Math.min(prior.thrustSeconds, next.thrustSeconds), deaths: Math.min(prior.deaths, next.deaths) } : next;
  return { ok: true, record: storyRun.challengeRecords[id], save: true };
}

export function legalizeSnapshot(snapshot, bounds = ROOM_BOUNDS) {
  if (!snapshot || typeof snapshot !== 'object') return { objects: [] };
  const objects = Array.isArray(snapshot.objects) ? snapshot.objects : [];
  const ids = new Set();
  return { objects: objects.slice(0, 32).flatMap(object => {
    if (!object || typeof object.id !== 'string' || !/^(device|crate|mirror|valve)-[a-z0-9-]+$/.test(object.id) || ids.has(object.id)) return [];
    ids.add(object.id);
    const position = [0, 1, 2].map(axis => Math.max(bounds.min[axis], Math.min(bounds.max[axis], Number.isFinite(object.position?.[axis]) ? object.position[axis] : axis === 1 ? 1 : 0)));
    const rotation = [0, 1, 2, 3].map(axis => Number.isFinite(object.rotation?.[axis]) ? object.rotation[axis] : axis === 3 ? 1 : 0);
    const length = Math.hypot(...rotation);
    return [{ id: object.id, position, rotation: length > 0.0001 ? rotation.map(value => value / length) : [0, 0, 0, 1], velocity: [0, 0, 0] }];
  }) };
}

export function storeSnapshot(run, roomId, snapshot) {
  if (!roomById[roomId]) return fail('unknown-room');
  run.snapshots[roomId] = legalizeSnapshot(snapshot);
  return { ok: true };
}
