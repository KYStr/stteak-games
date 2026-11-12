// A coalesced microtask handles the first response before Chrome can defer its
// task queue. One persistent MessageChannel supplies a positive-dt fallback.
// Both paths use the same monotonic physics admission and lifecycle generation.
export function createPhysicsScheduler({advance,eligible,now=()=>performance.now(),channel=new MessageChannel(),enqueue=queueMicrotask}){
 let generation=0,pending=false,microPending=false,disposed=false,microRetries=0;
 function respond(){
  microPending=false;if(disposed||!pending)return;
  if(!eligible()){pending=false;return;}
  // The browser clock is quantized to 0.1ms. If this wake lands in the
  // event's same clock tick, cross one *real* tick before retrying admission.
  // The bounded scalar poll costs at most one tick in normal use; no dt is
  // synthesized and a non-advancing clock falls back to the channel/RAF.
  const tick=now();let consumed=advance(tick)!==false;
  if(!consumed){let observed=tick;for(let i=0;i<2048&&observed===tick;i++)observed=now();if(observed>tick)consumed=advance(observed)!==false;}
  if(consumed)pending=false;
  else if(microRetries++<2&&!microPending){microPending=true;enqueue(respond);}

 }
 channel.port1.onmessage=function response(event){if(disposed||event.data!==generation||!pending)return;respond();};
 return {
  schedule(){if(disposed||pending)return;pending=true;microRetries=0;channel.port2.postMessage(generation);if(!microPending){microPending=true;enqueue(respond);}},
  invalidate(){generation++;pending=false;},
  dispose(){disposed=true;generation++;pending=false;channel.port1.onmessage=null;channel.port1.close();channel.port2.close();}
 };
}
