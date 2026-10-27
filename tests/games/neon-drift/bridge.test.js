import test from 'node:test';
import assert from 'node:assert/strict';
import { createBridge } from '../../../games/neon-drift/src/bridge.js';
test('bundled bridge checks source, exact origin, protocol, version, session and payload before commands',()=>{
  const sent=[],calls=[];let handler;
  const window={},parent={postMessage:(data,origin)=>sent.push({data,origin})};
  Object.assign(globalThis,{window,parent,location:{origin:'http://localhost:5183',search:'?session=fixed-session'},addEventListener:(name,fn)=>handler=fn,removeEventListener:()=>{}});
  const bridge=createBridge({start:()=>calls.push('start'),pause:()=>calls.push('pause'),resume:()=>calls.push('resume'),restart:()=>calls.push('restart')});
  const envelope=(type,payload={})=>({source:parent,origin:location.origin,data:{protocol:'stteak-game',version:1,sessionId:'fixed-session',type,payload}});
  handler(envelope('host:start'));assert.equal(calls.length,0);
  const init=envelope('host:init',{gameId:'neon-drift',title:'Neon',image:'http://localhost:5183/test.webp',accent:'#fff'});
  for(const bad of [{...init,source:{}},{...init,origin:'https://evil.test'},{...init,data:{...init.data,sessionId:'old'}},{...init,data:{...init.data,version:2}},{...init,data:{...init.data,payload:[]}}])handler(bad);
  bridge.ready();assert.equal(sent.length,0);handler(init);assert.equal(sent[0].data.type,'game:ready');assert.equal(sent[0].origin,location.origin);
  handler(envelope('host:start'));handler(envelope('host:pause'));handler(envelope('host:resume'));handler(envelope('host:restart'));assert.deepEqual(calls,['start','pause','resume','restart']);
  handler(envelope('host:start',{unexpected:true}));handler({...envelope('host:restart'),data:{...envelope('host:restart').data,protocol:'other'}});assert.equal(calls.length,4);
  bridge.state('paused');assert.equal(sent.at(-1).data.payload.state,'paused');bridge.dispose();
});
