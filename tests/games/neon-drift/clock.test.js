import test from 'node:test';
import assert from 'node:assert/strict';
import {readClock,clockReadCount} from '../../../games/neon-drift/src/clock.js';
test('native clock reads store the exact double at the requested slot and retain their invocation count',()=>{
  const descriptor=Object.getOwnPropertyDescriptor(globalThis,'performance'),buffer=new Float64Array(3),before=clockReadCount();
  try{Object.defineProperty(globalThis,'performance',{configurable:true,value:{now:()=>123.4567890123456}});readClock(buffer,2);assert.equal(buffer[2],123.4567890123456);assert.equal(buffer[0],0);assert.equal(clockReadCount(),before+1);}finally{Object.defineProperty(globalThis,'performance',descriptor);}
});
