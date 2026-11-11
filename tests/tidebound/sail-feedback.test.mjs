import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';
test('production sail cues are user-caused, bounded to 500ms, and include completed furl',()=>{
 const source=readFileSync(new URL('../../games/tidebound/src/main.js',import.meta.url),'utf8'),a=source.indexOf('function sailFeedback('),b=source.indexOf('\nconst cpu=',a),c={lastSailCueAt:-Infinity,lastCuedSail:0,audio:{play(){c.cues++}},cues:0};vm.createContext(c);vm.runInContext(source.slice(a,b)+';globalThis.feedback=sailFeedback',c);
 c.feedback(0,.15,false,0);assert.equal(c.cues,0);c.feedback(0,.15,true,0);assert.equal(c.cues,1);c.feedback(.15,.3,true,100);assert.equal(c.cues,1);c.feedback(.3,.5,true,500);assert.equal(c.cues,2);c.feedback(.1,0,true,1000);assert.equal(c.cues,3);c.feedback(0,0,true,2000);assert.equal(c.cues,3);
});
