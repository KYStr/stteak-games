// Test-only instrumentation: observes real RAF registration and the actual audio
// master output. It never changes a game timestamp or adds an audible connection.
export function instrumentBrowser() {
  window.testTextureBytes = 0;
  window.testDrawPeak={calls:0,triangles:0,instances:0};
  window.testDraw={calls:0,triangles:0,instances:0,frame:0,rendered:false};
  for(const Constructor of [window.WebGLRenderingContext,window.WebGL2RenderingContext]) {
    if(!Constructor)continue;
    for(const name of ['drawArrays','drawElements','drawArraysInstanced','drawElementsInstanced']) {
      const original=Constructor.prototype[name];if(!original)continue;
      Constructor.prototype[name]=function(...args){
        const mode=args[0],count=args[name.startsWith('drawArrays')?2:1];
        const instances=name.endsWith('Instanced')?args[name==='drawArraysInstanced'?3:4]:1;
        testDraw.calls++;testDraw.instances+=instances;
        testDraw.triangles+=(mode===4?count/3:mode===5||mode===6?Math.max(0,count-2):0)*instances;
        testDraw.rendered=true;
        return original.apply(this,args);
      };
    }
  }
  for (const Constructor of [window.WebGLRenderingContext,window.WebGL2RenderingContext]) {
    if (!Constructor) continue;
    for (const name of ['texImage2D','texStorage2D']) {
      const original = Constructor.prototype[name]; if (!original) continue;
      Constructor.prototype[name] = function(...args) {
        let width = 0, height = 0;
        if (name === 'texStorage2D') { width=args[3]; height=args[4]; }
        else if (args.length >= 9) { width=args[3]; height=args[4]; }
        else { const source=args[5]; width=source?.width || 0; height=source?.height || 0; }
        // Conservative 16 bytes per texel, including shadow and render targets.
        if (Number.isFinite(width) && Number.isFinite(height)) testTextureBytes += width*height*16;
        return original.apply(this,args);
      };
    }
  }
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
      // Reset only around an actual rendering callback. Other RAF consumers
      // (test pilots or waits) preserve the most recent completed game frame.
      const previousDraw=testDraw;
      const nextDraw={calls:0,triangles:0,instances:0,frame:previousDraw.frame+1,rendered:false};
      window.testDraw=nextDraw;
      callback(t);
      if(!nextDraw.rendered)window.testDraw=previousDraw;
      else {testDrawPeak.calls=Math.max(testDrawPeak.calls,nextDraw.calls);testDrawPeak.triangles=Math.max(testDrawPeak.triangles,nextDraw.triangles);testDrawPeak.instances=Math.max(testDrawPeak.instances,nextDraw.instances);}
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

// Profile collected allocations as well as survivors. Do not call snapshot() or
// metrics() in this interval: instrumentation must not dominate application data.
export async function sampleAllocations(cdp, page, durationMs = 15000) {
  const counts=()=>page.evaluate(()=>({frames:__aetherwake.metrics().frames,steps:__aetherwake.metrics().simulationSteps,time:performance.now(),feedbackEvents:__aetherwake.metrics().feedback.eventCount}));
  const before=await counts();
  await cdp.send('HeapProfiler.startSampling',{samplingInterval:16384,includeObjectsCollectedByMajorGC:true,includeObjectsCollectedByMinorGC:true});
  await new Promise(resolve=>setTimeout(resolve,durationMs));
  const {profile}=await cdp.send('HeapProfiler.stopSampling');
  const after=await counts();
  return {profile,before,after,frames:after.frames-before.frames,steps:after.steps-before.steps,durationMs:after.time-before.time};
}
