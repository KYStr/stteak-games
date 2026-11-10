import test from 'node:test';
import assert from 'node:assert/strict';
import { AudioEngine } from '../../games/aetherwake/src/audio.js';

class Parameter { setTargetAtTime() {} setValueAtTime() {} exponentialRampToValueAtTime() {} }
class Node { constructor() { this.gain = new Parameter(); this.frequency = new Parameter(); } connect() {} disconnect() {} start() {} stop() { this.onended?.(); } }
class Context {
  constructor() { this.state = 'suspended'; this.currentTime = 0; this.sampleRate = 100; this.destination = {}; }
  createGain() { return new Node(); }
  createBufferSource() { return new Node(); }
  createBiquadFilter() { return new Node(); }
  createOscillator() { return new Node(); }
  createBuffer(channels, count) { return { getChannelData: () => new Float32Array(count) }; }
  async resume() { await Promise.resolve(); this.state = 'running'; }
  async suspend() { await Promise.resolve(); this.state = 'suspended'; }
  async close() { this.state = 'closed'; }
}
test('audio unlock, rapid lifecycle changes, external suspension, voice budget and disposal', async () => {
  const old = globalThis.AudioContext;
  globalThis.AudioContext = Context;
  const audio = new AudioEngine(); audio.loadSamples = () => {};
  try {
    assert.equal(audio.context, null);
    assert.equal(await audio.unlock(), true);
    audio.setPaused(true); audio.setPaused(false); audio.setPaused(true);
    await audio.transition;
    assert.equal(audio.context.state, 'suspended');
    audio.setPaused(false); await audio.transition;
    assert.equal(audio.context.state, 'running');
    await audio.context.suspend();
    assert.equal(await audio.unlock(), true);
    for (let i = 0; i < 200; i++) audio.tone(440, 0, .2, 'sine', .1, audio.sfxBus);
    assert.ok(audio.active.size <= 20); assert.ok(audio.stats.peakVoices <= 20);
    audio.setVolumes({ music: 0, sfx: 0 });
    assert.equal(audio.musicVolume, 0); assert.equal(audio.sfxVolume, 0);
    await audio.dispose(); assert.equal(audio.active.size, 0);
    assert.equal(await audio.unlock(), false);
  } finally { globalThis.AudioContext = old; }
});
test('rejected audio permission can be retried without an unhandled rejection', async () => {
  const old = globalThis.AudioContext;
  globalThis.AudioContext = class extends Context { async resume() { throw new Error('permission'); } };
  const audio = new AudioEngine(); audio.loadSamples = () => {};
  try {
    assert.equal(await audio.unlock(), false);
    audio.context.resume = Context.prototype.resume;
    assert.equal(await audio.unlock(), true);
  } finally { await audio.dispose(); globalThis.AudioContext = old; }
});
