export const SETTINGS_KEY = 'stteak:orbit-fall:settings';

const defaults = reducedMotion => ({ music: 0.28, sfx: 0.55, quality: 'high', reducedMotion: reducedMotion === true, assist: true });
const owns = (object, key) => Object.prototype.hasOwnProperty.call(object, key);
const supportedSchema = raw => ['schema', 'schemaVersion'].every(key => !owns(raw, key) || raw[key] === 1);

export function sanitizeSettings(raw, prefersReducedMotion = false) {
  const settings = defaults(prefersReducedMotion);
  if (!raw || typeof raw !== 'object' || Array.isArray(raw) || !supportedSchema(raw)) return settings;
  // Only explicitly supported own fields can reach rendering, audio or controls.
  // Do not merge persisted data: unknown keys and __proto__ stay outside settings.
  for (const key of ['music', 'sfx']) if (owns(raw, key) && Number.isFinite(raw[key])) settings[key] = Math.max(0, Math.min(1, raw[key]));
  if (owns(raw, 'quality') && ['low', 'high'].includes(raw.quality)) settings.quality = raw.quality;
  for (const key of ['reducedMotion', 'assist']) if (owns(raw, key) && typeof raw[key] === 'boolean') settings[key] = raw[key];
  return settings;
}

function unavailableStorage() {
  const fail = () => { throw new Error('storage unavailable'); };
  return { getItem: fail, setItem: fail, removeItem: fail };
}

/** A broken preferences value must never disable or overwrite healthy story storage. */
export function initializeSettings(getStorage, prefersReducedMotion = false) {
  let storage;
  try {
    storage = getStorage();
    if (!storage || typeof storage.getItem !== 'function' || typeof storage.setItem !== 'function') throw new Error('storage unavailable');
  } catch {
    return { storage: unavailableStorage(), settings: defaults(prefersReducedMotion), status: 'unavailable' };
  }
  let text;
  try { text = storage.getItem(SETTINGS_KEY); }
  catch {
    // Keep the real Storage object: reading this key does not establish that the
    // independent story slot is unusable. loadRun/saveRun report their own errors.
    return { storage, settings: defaults(prefersReducedMotion), status: 'unavailable' };
  }
  if (text === null || text === undefined) return { storage, settings: defaults(prefersReducedMotion), status: 'default' };
  let raw;
  try { raw = JSON.parse(text); }
  catch { return { storage, settings: defaults(prefersReducedMotion), status: 'invalid' }; }
  const valid = raw !== null && typeof raw === 'object' && !Array.isArray(raw);
  const status = !valid ? 'invalid' : supportedSchema(raw) ? 'loaded' : 'unsupported-schema';
  return { storage, settings: sanitizeSettings(raw, prefersReducedMotion), status };
}
