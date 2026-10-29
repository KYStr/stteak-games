import { roomById, puzzles, signals, endings, challenges } from './content.js';
import { SAVE_SCHEMA, createRun, refreshUnlocks, legalizeSnapshot } from './rules.js';

export const SAVE_PREFIX = 'stteak:orbit-fall:';
const allowedSlots = new Set(['story', 'challenge']);
const finite = (value, fallback = 0, max = 1e9) => Number.isFinite(value) ? Math.max(0, Math.min(max, value)) : fallback;
const knownIds = (value, allowed) => Array.isArray(value) ? [...new Set(value.filter(id => typeof id === 'string' && allowed.includes(id)))] : [];
const isRecord = value => value !== null && typeof value === 'object' && !Array.isArray(value);

// Integrity check detects torn or corrupted local writes; it is not authentication.
export function checksum(text) {
  let hash = 2166136261;
  for (let i = 0; i < text.length; i += 1) hash = Math.imul(hash ^ text.charCodeAt(i), 16777619);
  return (hash >>> 0).toString(16).padStart(8, '0');
}

export function sanitizeRun(raw) {
  if (!isRecord(raw)) throw new Error('invalid-save');
  const schema = raw.schema ?? raw.schemaVersion ?? 1;
  if (schema > SAVE_SCHEMA) throw new Error('unsupported-schema');
  if (schema !== 1 && schema !== SAVE_SCHEMA) throw new Error('invalid-schema');
  const run = createRun(raw.mode ?? raw.difficulty);
  run.solvedPuzzles = knownIds(raw.solvedPuzzles ?? raw.completedPuzzles, Object.keys(puzzles));
  run.signals = knownIds(raw.signals ?? raw.collectedSignals, Object.keys(signals));
  run.endings = knownIds(raw.endings, Object.keys(endings));
  run.tools = [...new Set(['thruster', ...knownIds(raw.tools, ['thruster', 'boots', 'tether'])])];
  // A migrated save past the first puzzle must retain its tutorial tools.
  if (schema === 1 && run.solvedPuzzles.length) run.tools = ['thruster', 'boots', 'tether'];
  run.shortcuts = knownIds(raw.shortcuts, Object.keys(roomById));
  run.challengeId = challenges.some(item => item.id === raw.challengeId) ? raw.challengeId : null;
  run.challengeTime = run.challengeId ? finite(raw.challengeTime, challenges.find(item => item.id === run.challengeId).timeLimit, 3600) : null;
  refreshUnlocks(run);
  const safeId = raw.safeRoomId ?? raw.checkpoint ?? 'room-d1-safe';
  run.safeRoomId = roomById[safeId]?.type === 'safe' && run.unlockedDecks.includes(roomById[safeId].deck) ? safeId : `room-d${run.unlockedDecks.at(-1)}-safe`;
  run.roomId = roomById[raw.roomId] && run.unlockedDecks.includes(roomById[raw.roomId].deck) ? raw.roomId : run.safeRoomId;
  run.oxygen = finite(raw.oxygen, 100, 100);
  run.health = finite(raw.health, 100, 100);
  run.elapsed = finite(raw.elapsed);
  run.status = ['running', 'failed', 'completed'].includes(raw.status) ? raw.status : 'running';
  run.lastFailure = ['oxygen', 'arc', 'debris', 'collision', 'challenge-time', 'recovery'].includes(raw.lastFailure) ? raw.lastFailure : null;
  run.paused = false;
  run.accumulator = 0;
  run.tutorial = knownIds(raw.tutorial, ['movement', 'brake', 'boots', 'tether', 'oxygen', 'map', 'first-repair']);
  for (const key of Object.keys(run.stats)) run.stats[key] = finite(raw.stats?.[key]);
  if (isRecord(raw.snapshots)) for (const [roomId, snapshot] of Object.entries(raw.snapshots)) if (roomById[roomId]) run.snapshots[roomId] = legalizeSnapshot(snapshot);
  for (const challenge of challenges) {
    const record = raw.challengeRecords?.[challenge.id];
    if (isRecord(record) && Number.isFinite(record.elapsed)) run.challengeRecords[challenge.id] = { elapsed: finite(record.elapsed), oxygenUsed: finite(record.oxygenUsed), thrustSeconds: finite(record.thrustSeconds), deaths: finite(record.deaths) };
  }
  if (run.status === 'completed') {
    const type = run.challengeId ? 'challenge' : 'ending';
    const id = run.challengeId || (endings[raw.result?.id] ? raw.result.id : run.endings.at(-1));
    if (id) run.result = { type, id, elapsed: run.elapsed, oxygenUsed: run.stats.oxygenUsed, thrustSeconds: run.stats.thrustSeconds, deaths: run.stats.deaths, signals: run.signals.length };
    else run.status = 'running';
  }
  // Never reload into a repeat-death loop; permanent repairs and recordings survive.
  if (run.oxygen === 0 || run.health === 0 || run.status === 'failed') {
    run.roomId = run.safeRoomId;
    run.oxygen = 100;
    run.health = 100;
    run.status = run.challengeId && run.challengeTime === 0 ? 'failed' : 'running';
  }
  return run;
}

function keyFor(slot) {
  if (!allowedSlots.has(slot)) throw new Error('invalid-slot');
  return SAVE_PREFIX + slot;
}

function readCandidate(text) {
  if (!text) return null;
  const envelope = JSON.parse(text);
  if (isRecord(envelope) && typeof envelope.payload === 'string') {
    if (envelope.format !== 'orbit-fall-save' || checksum(envelope.payload) !== envelope.checksum) throw new Error('checksum-mismatch');
    const raw = JSON.parse(envelope.payload);
    return { run: sanitizeRun(raw), revision: finite(envelope.revision), migrated: raw.schema !== SAVE_SCHEMA };
  }
  // v1 stored the run directly rather than wrapping it in an integrity envelope.
  return { run: sanitizeRun(envelope), revision: 0, migrated: true };
}

export function loadRun(storage, slot = 'story') {
  let key;
  try { key = keyFor(slot); } catch (error) { return { ok: false, run: null, reason: error.message }; }
  const candidates = [];
  let corrupt = false;
  try {
    for (const suffix of ['', ':pending', ':backup']) {
      const value = storage.getItem(key + suffix);
      if (value === null) continue;
      try {
        const candidate = readCandidate(value);
        if (candidate && Boolean(candidate.run.challengeId) === (slot === 'challenge')) candidates.push({ ...candidate, source: suffix || 'primary' });
        else corrupt = true;
      } catch (error) {
        // Do not replace a newer build's primary save with an older backup.
        if (!suffix && error.message === 'unsupported-schema') return { ok: false, run: null, reason: 'unsupported-schema', message: '這份存檔由較新版本建立；請使用較新版本，原檔已保留。' };
        corrupt = true;
      }
    }
  } catch { return { ok: false, run: null, reason: 'storage-unavailable', message: '瀏覽器無法讀取本機存檔；本次仍可遊玩，但進度不會保存。' }; }
  candidates.sort((a, b) => b.revision - a.revision);
  const selected = candidates[0];
  if (!selected) return { ok: !corrupt, run: null, reason: corrupt ? 'corrupt-save' : 'empty', message: corrupt ? '本機存檔無法讀取，可開始新旅程；損壞資料尚未覆寫。' : null };
  const recovered = selected.source !== 'primary' || corrupt;
  return { ok: true, run: selected.run, revision: selected.revision, source: selected.source, recovered, migrated: selected.migrated, message: recovered ? '已從完整的本機備份恢復進度。' : selected.migrated ? '已將舊版進度安全轉換。' : null };
}

export function saveRun(storage, run, slot = 'story') {
  if (Boolean(run?.challengeId) !== (slot === 'challenge')) return { ok: false, reason: 'slot-mismatch', message: '挑戰與故事分開保存，未覆寫故事進度。' };
  try {
    const key = keyFor(slot);
    const clean = sanitizeRun(run);
    const existing = loadRun(storage, slot);
    if (!existing.ok && existing.reason === 'unsupported-schema') return existing;
    const revision = (existing.revision || 0) + 1;
    const payload = JSON.stringify(clean);
    const envelope = JSON.stringify({ format: 'orbit-fall-save', schema: SAVE_SCHEMA, revision, checksum: checksum(payload), payload });
    // localStorage setItem is atomic per key. A validated staging copy survives
    // interruption before primary promotion; a prior valid primary remains backup.
    storage.setItem(key + ':pending', envelope);
    const staged = readCandidate(storage.getItem(key + ':pending'));
    if (!staged || staged.revision !== revision) throw new Error('write-verification-failed');
    const previous = storage.getItem(key);
    if (previous) {
      let validPrevious = false;
      try { validPrevious = Boolean(readCandidate(previous)); } catch { /* Keep the valid staging copy. */ }
      if (validPrevious) storage.setItem(key + ':backup', previous);
    }
    storage.setItem(key, envelope);
    // A failed cleanup is harmless; equal revision prefers the primary on reload.
    try { storage.removeItem(key + ':pending'); } catch { /* Recoverable duplicate. */ }
    return { ok: true, revision, schema: SAVE_SCHEMA };
  } catch (error) { return { ok: false, reason: error.message === 'invalid-slot' ? 'invalid-slot' : 'storage-unavailable', message: '本機儲存失敗，請保留目前分頁；既有存檔與可用備份會保留。' }; }
}

export function deleteRun(storage, slot = 'story') {
  try { const key = keyFor(slot); for (const suffix of ['', ':pending', ':backup']) storage.removeItem(key + suffix); return { ok: true }; }
  catch { return { ok: false, reason: 'storage-unavailable' }; }
}
