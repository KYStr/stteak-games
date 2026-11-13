// Isolate the browser timing binding from application arithmetic. Some V8 tiers
// materialize the native double return as a HeapNumber even when its destination
// is typed storage. Allocation reports identify these reads separately; callers
// never receive a boxed timing argument or round the browser clock.
const reads=new Uint32Array(1);
export function readClock(buffer,index){try{buffer[index]=performance.now();}finally{reads[0]++;}}
export function clockReadCount(){return reads[0];}
