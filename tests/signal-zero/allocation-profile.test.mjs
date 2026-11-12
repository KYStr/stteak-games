import {test} from 'node:test';
import assert from 'node:assert/strict';
import {aggregateAllocations} from './allocation-profile.mjs';
const node=(functionName,file,bytes,children=[],query='')=>({callFrame:{functionName,url:'http://localhost/games/signal-zero/'+file+query,lineNumber:12,columnNumber:0},selfSize:bytes,children});
test('allocation gate combines the same source across all stacks and URL queries, including HUD',()=>{
 const head=node('','',0,[node('frame','app.js',0,[node('renderHud','app.js',600000)]),node('anotherParent','app.js',0,[node('renderHud','app.js',600000,[],'?revision=4')])]);
 const rows=aggregateAllocations({profile:{head}});assert.equal(rows.length,1);assert.equal(rows[0].bytes,1200000);assert.equal(rows[0].stacks,2);assert.equal(rows[0].category,'steady/application');
});
test('allocation evidence keeps engine, diagnostic, display and event costs separate from steady logic',()=>{
 const head=node('','',0,[node('render','vendor/three.module.js',10),node('diagnostics','app.js',20),node('tone','audio.js',30),node('positionText','hud-text.js',40),node('read','input.js',50),node('bindingText','app.js',60)]);
 const rows=aggregateAllocations({profile:{head}});assert.deepEqual(Object.fromEntries(rows.map(r=>[r.function,r.category])),{bindingText:'changed-display',read:'steady/application',positionText:'changed-display',tone:'event/audio',diagnostics:'telemetry',render:'engine'});
});
