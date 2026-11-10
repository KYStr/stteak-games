// Test-only instrumentation: observes real RAF registration and the actual audio
// master output. It never changes a game timestamp or adds an audible connection.
export function instrumentBrowser() {
  const request = window.requestAnimationFrame.bind(window);
  const cancel = window.cancelAnimationFrame.bind(window);
  const pending = new Set();
  window.testRAF = { pending: 0, frames: [], collecting: false, previous: null };
  window.requestAnimationFrame = callback => {
    const id = request(t => {
      pending.delete(id); testRAF.pending = pending.size;
      if (testRAF.collecting && t !== testRAF.previous) {
        if (testRAF.previous !== null) testRAF.frames.push(t - testRAF.previous);
        testRAF.previous = t;
      }
      callback(t);
    });
    pending.add(id); testRAF.pending = pending.size;
    return id;
  };
  window.cancelAnimationFrame = id => { pending.delete(id); testRAF.pending = pending.size; cancel(id); };
  const Constructor = window.AudioContext;
  if (Constructor) window.AudioContext = new Proxy(Constructor, {
    construct(Target, args) {
      const instance = new Target(...args); window.testAudio = instance;
      return instance;
    },
  });
  const connect = AudioNode.prototype.connect;
  AudioNode.prototype.connect = function(destination, ...args) {
    const result = connect.call(this, destination, ...args);
    if (destination === this.context.destination) {
      const analyser = this.context.createAnalyser();
      analyser.fftSize = 2048;
      connect.call(this, analyser);
      window.testAnalyser = analyser;
    }
    return result;
  };
  window.testRMS = () => {
    const data = new Float32Array(testAnalyser.fftSize);
    testAnalyser.getFloatTimeDomainData(data);
    return Math.sqrt(data.reduce((sum, value) => sum + value * value, 0) / data.length);
  };
}

export function summarize(frames) {
  const sorted = [...frames].sort((a, b) => a - b);
  return { frames: frames.length, averageMs: frames.reduce((a, b) => a + b, 0) / frames.length,
    p95Ms: sorted[Math.floor(sorted.length * .95)] };
}
