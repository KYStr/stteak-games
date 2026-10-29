import test from 'node:test';
import assert from 'node:assert/strict';
import { Soundscape } from '../../../public/games/hollow-crown/audio.js';

const settings = { music: .5, effects: .7 };
const deferred = () => {
  let resolve, reject;
  const promise = new Promise((yes, no) => { resolve = yes; reject = no; });
  return { promise, resolve, reject };
};
const settle = () => new Promise(resolve => setImmediate(resolve));

async function environment(run, delayed = {}) {
  const keys = ['AudioContext', 'webkitAudioContext', 'fetch'];
  const previous = Object.fromEntries(keys.map(key => [key, Object.getOwnPropertyDescriptor(globalThis, key)]));
  const contexts = [], resumes = [], requests = [], bodies = [], decodes = [], sources = [], errors = [];
  class AudioContext {
    constructor() { this.state = 'suspended'; this.currentTime = 0; this.destination = {}; contexts.push(this); }
    createGain() { return { connect() {}, gain: { setTargetAtTime() {} } }; }
    resume() {
      const gate = deferred(); resumes.push(gate);
      if (!delayed.resume) gate.resolve();
      return gate.promise.then(() => { if (this.state !== 'closed') this.state = 'running'; });
    }
    suspend() { if (this.state !== 'closed') this.state = 'suspended'; return Promise.resolve(); }
    close() { this.state = 'closed'; return Promise.resolve(); }
    decodeAudioData(bytes) {
      const gate = deferred(); decodes.push({ gate, bytes });
      if (!delayed.decode) gate.resolve({ name: bytes.name });
      return gate.promise;
    }
    createBufferSource() {
      const source = { started: false, stopped: false, disconnected: false,
        connect() {}, start() { this.started = true; },
        stop() { this.stopped = true; this.onended?.(); },
        disconnect() { this.disconnected = true; } };
      sources.push(source); return source;
    }
  }
  Object.assign(globalThis, { AudioContext, fetch(url) {
    const name = /([^/]+)\.wav$/.exec(String(url))[1], gate = deferred();
    const response = { ok: true, arrayBuffer() {
      const body = deferred(); bodies.push({ name, gate: body });
      if (!delayed.body) body.resolve({ name });
      return body.promise;
    } };
    requests.push({ name, gate, response }); if (!delayed.fetch) gate.resolve(response);
    return gate.promise;
  } });
  const sound = new Soundscape(settings, message => errors.push(message));
  try { await run({ sound, contexts, resumes, requests, bodies, decodes, sources, errors }); }
  finally {
    sound.dispose();
    for (const key of keys) { if (previous[key]) Object.defineProperty(globalThis, key, previous[key]); else delete globalThis[key]; }
  }
}

test('unlock followed synchronously by pause stays silent after delayed context resume', async () => environment(async ({ sound, resumes, sources }) => {
  const unlocking = sound.unlock(); sound.pause(); resumes[0].resolve(); await unlocking;
  assert.equal(sound.active, false);
  assert.equal(sound.metrics().musicTracks, 0);
  assert.equal(sources.filter(source => source.started).length, 0);
}, { resume: true }));

test('unlock cannot reactivate a disposed Soundscape after delayed context resume', async () => environment(async ({ sound, resumes, sources, errors }) => {
  const unlocking = sound.unlock(); sound.dispose(); resumes[0].resolve(); await unlocking;
  assert.equal(sound.active, false);
  assert.equal(sound.metrics().buffers, 0);
  assert.equal(sources.length, 0);
  assert.deepEqual(errors, []);
}, { resume: true }));

for (const stage of ['fetch', 'body', 'decode']) {
  test(`dispose during delayed ${stage} prevents late buffer publication or music`, async () => environment(async ({ sound, requests, bodies, decodes, sources, errors }) => {
    const unlocking = sound.unlock(); await settle();
    const pending = stage === 'fetch' ? requests : stage === 'body' ? bodies : decodes;
    assert.equal(pending.length, 16, 'all audio files reached the controlled delay');
    sound.dispose();
    let lateThemeCalls = 0; sound.playTheme = () => { lateThemeCalls++; };
    for (const item of pending) item.gate.resolve(stage === 'fetch' ? item.response : { name: item.name ?? item.bytes.name });
    await unlocking;
    assert.equal(sound.metrics().buffers, 0);
    assert.equal(sound.metrics().musicTracks, 0);
    assert.equal(sources.length, 0);
    assert.equal(lateThemeCalls, 0);
    if (stage === 'fetch') assert.equal(bodies.length, 0);
    if (stage !== 'decode') assert.equal(decodes.length, 0);
    assert.deepEqual(errors, []);
  }, { [stage]: true }));
}

for (const stage of ['fetch', 'decode']) {
  test(`dispose suppresses a late ${stage} failure notification`, async () => environment(async ({ sound, requests, decodes, errors }) => {
    const unlocking = sound.unlock(); await settle();
    const pending = stage === 'fetch' ? requests : decodes;
    assert.equal(pending.length, 16);
    sound.dispose();
    for (const item of pending) item.gate.reject(new Error(`delayed ${stage} failure`));
    await unlocking;
    assert.deepEqual(errors, []);
    assert.equal(sound.failed, false);
    assert.equal(sound.metrics().buffers, 0);
  }, { [stage]: true }));
}

test('successful concurrent unlocks load once, keep one music track and cap effects at twelve', async () => environment(async ({ sound, requests, sources, errors }) => {
  await Promise.all([sound.unlock(), sound.unlock(), sound.unlock()]);
  assert.equal(requests.length, 16);
  assert.equal(sound.metrics().buffers, 16);
  assert.equal(sound.metrics().musicTracks, 1);
  for (let i = 0; i < 20; i++) sound.cue('light');
  assert.equal(sound.metrics().voices, 12);
  assert.equal(sources.filter(source => source.started && !source.stopped && !source.loop).length, 12);
  sound.cue('hit', 'metal'); assert.equal(sources.at(-1).buffer.name, 'metal');
  sound.cue('hit', 'stone'); assert.equal(sources.at(-1).buffer.name, 'stone');
  sound.cue('room-clear'); assert.equal(sources.at(-1).buffer.name, 'win');
  sound.setTheme('boss');
  assert.equal(sound.track.buffer.name, 'boss');
  assert.equal(sources.filter(source => source.loop && !source.stopped).length, 1);
  sound.pause(); assert.equal(sound.metrics().voices, 0); assert.equal(sound.metrics().musicTracks, 0);
  await sound.resume(); assert.equal(sound.metrics().musicTracks, 1);
  assert.deepEqual(errors, []);
}));

test('pause while decoding permits caching but never starts music until explicit resume', async () => environment(async ({ sound, decodes, sources }) => {
  const unlocking = sound.unlock(); await settle(); sound.pause();
  for (const { gate, bytes } of decodes) gate.resolve({ name: bytes.name });
  await unlocking;
  assert.equal(sound.active, false); assert.equal(sound.metrics().buffers, 16); assert.equal(sources.length, 0);
  await sound.resume(); assert.equal(sound.metrics().musicTracks, 1);
}, { decode: true }));

test('current loading failure still reports the existing recoverable error once', async () => environment(async ({ sound, requests, errors }) => {
  const unlocking = sound.unlock(); await settle();
  for (const item of requests) item.gate.reject(new Error('network failure'));
  await unlocking;
  assert.equal(sound.failed, true); assert.deepEqual(errors, ['部分聲音載入失敗；可在暫停選單重新載入頁面。']);
}, { fetch: true }));

test('a later explicit unlock survives an older cancelled unlock completing out of order', async () => environment(async ({ sound, resumes, requests, sources }) => {
  const older = sound.unlock(); sound.pause();
  const newer = sound.unlock(); resumes[1].resolve(); await newer;
  const track = sound.track;
  assert.equal(sound.active, true); assert.equal(sound.metrics().musicTracks, 1);
  resumes[0].resolve(); await older;
  assert.equal(sound.active, true); assert.equal(sound.track, track);
  assert.equal(requests.length, 16); assert.equal(sources.length, 1);
}, { resume: true }));

test('explicit resume stays inactive when rejected, and a pending resume cannot defeat a later pause', async () => environment(async ({ sound, resumes, sources }) => {
  const unlocking = sound.unlock(); resumes[0].resolve(); await unlocking; sound.pause();
  const rejected = sound.resume(); resumes[1].reject(new Error('resume denied')); await rejected;
  assert.equal(sound.active, false); assert.equal(sound.metrics().musicTracks, 0);
  const cancelled = sound.resume(); sound.pause(); resumes[2].resolve(); await cancelled;
  assert.equal(sound.active, false); assert.equal(sound.metrics().musicTracks, 0);
  assert.equal(sources.filter(source => !source.stopped).length, 0);
  const resumed = sound.resume(); resumes[3].resolve(); await resumed;
  assert.equal(sound.active, true); assert.equal(sound.metrics().musicTracks, 1);
}, { resume: true }));

test('dispose is terminal and idempotent even while explicit resume is pending', async () => environment(async ({ sound, resumes, sources, contexts }) => {
  const unlocking = sound.unlock(); resumes[0].resolve(); await unlocking; sound.pause();
  const resuming = sound.resume(); sound.dispose(); sound.dispose(); resumes[1].resolve(); await resuming;
  const lateUnlock = sound.unlock(), lateResume = sound.resume();
  for (const gate of resumes.slice(2)) gate.resolve();
  await Promise.all([lateUnlock, lateResume]); sound.setTheme('combat'); sound.cue('hit');
  assert.equal(sound.active, false); assert.equal(sound.metrics().buffers, 0);
  assert.equal(sound.metrics().musicTracks, 0); assert.equal(sound.metrics().voices, 0);
  assert.equal(contexts.length, 1); assert.equal(contexts[0].state, 'closed'); assert.equal(resumes.length, 2);
  assert.equal(sources.filter(source => !source.stopped).length, 0);
}, { resume: true }));

test('disposing before a gesture never creates an AudioContext or fetches sounds', async () => environment(async ({ sound, contexts, requests }) => {
  sound.dispose(); await sound.unlock(); await sound.resume();
  assert.equal(contexts.length, 0); assert.equal(requests.length, 0); assert.equal(sound.active, false);
}));
