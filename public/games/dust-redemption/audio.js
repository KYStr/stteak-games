// Original CC0 WAV effects and procedural score. Every runtime dependency is in this game directory.
const EFFECTS = [
  "revolver",
  "rifle",
  "enemy",
  "stone",
  "hit",
  "hurt",
  "reload",
  "step",
  "warning",
  "success",
  "ui",
];
const LEVELS = {
  revolver: 0.64,
  rifle: 0.59,
  enemy: 0.27,
  stone: 0.3,
  hit: 0.35,
  hurt: 0.35,
  reload: 0.24,
  step: 0.12,
  warning: 0.3,
  success: 0.27,
  ui: 0.17,
};
const NOTES = [110, 0, 164.81, 0, 146.83, 0, 123.47, 82.41];
const clamp = (value) =>
  Math.max(0, Math.min(1, Number.isFinite(value) ? value : 0));
export class FrontierAudio {
  constructor() {
    this.context = null;
    this.voices = new Set();
    this.settings = { music: 0.3, sfx: 0.65 };
    this.nextBeat = 0;
    this.beat = 0;
    this.active = false;
    this.buffers = new Map();
    this.loadErrors = [];
    this.loadPromise = null;
    this.disposed = false;
    this.buses = null;
  }
  unlock() {
    if (this.disposed) return;
    if (!this.context) {
      const AudioContextClass =
        globalThis.AudioContext || globalThis.webkitAudioContext;
      if (!AudioContextClass) return;
      try {
        this.context = new AudioContextClass();
        const c = this.context;
        this.master = c.createGain();
        this.buses = { music: c.createGain(), sfx: c.createGain() };
        this.buses.music.connect(this.master);
        this.buses.sfx.connect(this.master);
        const compressor = c.createDynamicsCompressor();
        compressor.threshold.value = -18;
        compressor.knee.value = 8;
        compressor.ratio.value = 12;
        compressor.attack.value = 0.003;
        compressor.release.value = 0.15;
        this.master.connect(compressor);
        compressor.connect(c.destination);
        this.master.gain.value = 0.52;
        this.configure(this.settings);
      } catch (error) {
        this.loadErrors.push(`context: ${error?.message || "unavailable"}`);
        this.context = null;
        return;
      }
    }
    if (this.context.state === "suspended")
      this.context.resume().catch(() => {});
    if (!this.loadPromise)
      this.loadPromise = this.loadEffects().catch((error) => {
        this.loadErrors.push(`load: ${error?.message || "failed"}`);
      });
  }
  async loadEffects() {
    const context = this.context;
    if (!context) return;
    await Promise.all(
      EFFECTS.map(async (name) => {
        try {
          const response = await fetch(
            new URL(`./assets/audio/${name}.wav`, import.meta.url),
          );
          if (!response.ok) throw new Error(`HTTP ${response.status}`);
          const bytes = await response.arrayBuffer();
          if (this.disposed || context.state === "closed") return;
          const buffer = await context.decodeAudioData(bytes);
          if (!this.disposed) this.buffers.set(name, buffer);
        } catch (error) {
          this.loadErrors.push(`${name}: ${error?.message || "decode failed"}`);
        }
      }),
    );
  }
  configure(s) {
    this.settings = {
      ...this.settings,
      ...s,
      music: clamp(s?.music ?? this.settings.music),
      sfx: clamp(s?.sfx ?? this.settings.sfx),
    };
    if (this.buses && this.context)
      for (const group of ["music", "sfx"]) {
        const gain = this.buses[group].gain,
          t = this.context.currentTime;
        gain.cancelScheduledValues(t);
        gain.setValueAtTime(this.settings[group], t);
      }
  }
  canPlay(group = "sfx") {
    return (
      this.context?.state === "running" &&
      this.active &&
      !this.disposed &&
      this.voices.size < 20 &&
      this.settings[group] > 0
    );
  }
  track(source, gain) {
    this.voices.add(source);
    source.onended = () => {
      try {
        source.disconnect();
        gain.disconnect();
      } catch {}
      this.voices.delete(source);
    };
  }
  tone(
    frequency,
    duration,
    volume,
    type = "triangle",
    slide = 1,
    group = "sfx",
  ) {
    const c = this.context;
    if (!this.canPlay(group)) return;
    const oscillator = c.createOscillator(),
      gain = c.createGain(),
      t = c.currentTime;
    oscillator.type = type;
    oscillator.frequency.setValueAtTime(frequency, t);
    oscillator.frequency.exponentialRampToValueAtTime(
      Math.max(20, frequency * slide),
      t + duration,
    );
    gain.gain.setValueAtTime(0, t);
    gain.gain.linearRampToValueAtTime(volume, t + 0.006);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + duration);
    oscillator.connect(gain);
    gain.connect(this.buses[group]);
    this.track(oscillator, gain);
    oscillator.start(t);
    oscillator.stop(t + duration + 0.01);
  }
  play(name, options = {}) {
    if (!this.canPlay()) return;
    const buffer = this.buffers.get(name);
    if (buffer) {
      const c = this.context,
        source = c.createBufferSource(),
        gain = c.createGain();
      source.buffer = buffer;
      // Optional distance/occlusion scaling is available without changing existing one-argument callers.
      const distance = Number.isFinite(options.distance)
        ? Math.max(0, options.distance)
        : 0;
      gain.gain.value =
        ((LEVELS[name] ?? 0.2) / (1 + distance * 0.07)) *
        (options.occluded ? 0.45 : 1);
      source.connect(gain);
      gain.connect(this.buses.sfx);
      this.track(source, gain);
      source.start();
      return;
    }
    // Gesture-time fallback remains local while the original WAV files are decoded.
    if (name === "revolver") {
      this.tone(130, 0.16, 0.5, "sawtooth", 0.17);
      this.tone(1900, 0.035, 0.15, "square", 0.3);
    } else if (name === "rifle") {
      this.tone(95, 0.21, 0.5, "sawtooth", 0.22);
      this.tone(2600, 0.025, 0.18, "square", 0.2);
    } else if (name === "enemy") {
      this.tone(110, 0.12, 0.18, "sawtooth", 0.3);
    } else if (name === "stone") {
      this.tone(1800, 0.06, 0.17, "triangle", 0.3);
    } else if (name === "hit") {
      this.tone(240, 0.09, 0.25, "triangle", 0.3);
    } else if (name === "hurt") {
      this.tone(76, 0.23, 0.3, "sawtooth", 0.5);
    } else if (name === "reload") {
      this.tone(950, 0.07, 0.16, "square", 0.6);
      this.tone(480, 0.15, 0.1, "triangle", 0.8);
    } else if (name === "step") {
      this.tone(55, 0.05, 0.055, "triangle", 0.5);
    } else if (name === "warning") {
      this.tone(680, 0.18, 0.17, "sine", 1.3);
    } else if (name === "success") {
      [220, 277.18, 329.63].forEach((f) =>
        this.tone(f, 0.65, 0.13, "triangle", 1),
      );
    } else this.tone(440, 0.08, 0.09, "sine", 1.5);
  }
  tick(time) {
    if (time < this.nextBeat || !this.active) return;
    this.nextBeat = time + 1.15;
    const f = NOTES[this.beat++ % NOTES.length];
    if (f) this.tone(f, 1, 0.08, "triangle", 1, "music");
    if (this.beat % 2) this.tone(47, 0.1, 0.07, "sine", 0.7, "music");
  }
  resume() {
    if (this.disposed) return;
    this.active = true;
    this.nextBeat = 0;
    if (this.context?.state === "suspended")
      this.context.resume().catch(() => {});
  }
  pause() {
    this.active = false;
    for (const voice of this.voices)
      try {
        voice.stop();
      } catch {}
    this.voices.clear();
    if (this.context?.state !== "closed")
      this.context?.suspend().catch(() => {});
  }
  dispose() {
    this.pause();
    this.disposed = true;
    if (this.context?.state !== "closed") this.context?.close().catch(() => {});
    this.buffers.clear();
  }
}
