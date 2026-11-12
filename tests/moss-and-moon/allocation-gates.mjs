// Collection is separate from validation so every independent budget is reported.
export function gate(name,pass,details={}) {return {name,pass:!!pass,...details};}
export function allocationComparison(a,b) {
 // CDP samples have variable weights (not always 512 B). Use their observed
 // squared weights, not a fixed-size Poisson approximation. Keep the original
 // comparison alongside this calculation in diagnostic evidence.
 const samplingMargin=3*Math.hypot(a.directStandardError,b.directStandardError);
 return {beforeBytesPerFrame:a.frameBytesPerFrame,afterBytesPerFrame:b.frameBytesPerFrame,
  deltaBytesPerFrame:b.frameBytesPerFrame-a.frameBytesPerFrame,samplingMargin,
  pass:b.frameBytesPerFrame<=a.frameBytesPerFrame+samplingMargin,
  beforeFrames:a.frames,afterFrames:b.frames,beforeElapsedMs:a.elapsedMs,afterElapsedMs:b.elapsedMs};
}
export function intervalGates(r) {
 return [gate(`interval-${r.interval}-frames`,r.frames>30,{frames:r.frames}),
  gate(`interval-${r.interval}-static-residency`,r.before.staticStageRebuilds===r.after.staticStageRebuilds),
  gate(`interval-${r.interval}-geometry-residency`,r.before.geometries===r.after.geometries),
  gate(`interval-${r.interval}-texture-residency`,r.before.textures===r.after.textures),
  gate(`interval-${r.interval}-retained-heap`,(r.retained.usedSize-r.heapBefore.usedSize)/r.heapBefore.usedSize<.10)];
}
export function resourceGates(world,prefix) {
 return [gate(prefix+'-draws',world.drawCalls<=250,{actual:world.drawCalls,limit:250}),
  gate(prefix+'-triangles',world.triangles<=1500000,{actual:world.triangles,limit:1500000}),
  gate(prefix+'-dpr',world.dpr<=2,{actual:world.dpr,limit:2}),
  gate(prefix+'-textures',world.textureBytesBound<=256*1024*1024,{actual:world.textureBytesBound,limit:256*1024*1024})];
}
// The unchanged full numeric path is measured before and after subsystem
// removal. Its two-interval means reproduce while individual intervals vary
// with V8 execution tiers. Predict from ALL four control intervals, retaining
// between-interval variability and actual compound-sample error, with the same
// three-sigma multiplier. No fixed extra byte allowance is fitted to a failure.
export function referenceAllocationGate(actual,reference) {
 const values=reference.records.map(r=>r.frameBytesPerFrame),count=values.length;
 const mean=values.reduce((n,x)=>n+x,0)/count;
 const betweenVariance=values.reduce((n,x)=>n+(x-mean)**2,0)/(count-1);
 const uncertainty=3*Math.sqrt(betweenVariance*(1+1/count)+actual.directStandardError**2);
 return gate(`interval-${actual.interval}-direct-frame-reference`,actual.frameBytesPerFrame<=mean+uncertainty,
  {actualBytesPerFrame:actual.frameBytesPerFrame,controlMean:mean,controlIntervals:count,betweenVariance,
   measurementStandardError:actual.directStandardError,uncertainty,upperBound:mean+uncertainty});
}
