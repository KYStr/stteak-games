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

import {allocationGate} from './allocation-profile.mjs';
import {aggregateTimeline} from './allocation-types.mjs';
function gate(file,name,bytes){return allocationGate([{label:'steady',frames:600,wallMs:20000,allocations:aggregateAllocations({profile:{head:node(name,file,bytes)}})}])}
test('strict rubric gate includes core step, app frame and view renderScene',()=>{
 for(const [file,name]of [['core.js','step'],['app.js','frame'],['view.js','renderScene']])assert.equal(gate(file,name,12).rubricAllocationPass,false);
});
test('recurring scalar-only input read allocations fail the strict rubric gate',()=>{
 const timeline={frames:600,durationMs:10000,rows:[{file:'input.js',function:'read',line:23,column:2,category:'steady/application',count:600,bytes:7200,scalarSized:true,retained:{}}]};
 const result=allocationGate([],timeline);assert.equal(result.rubricAllocationPass,false);assert.equal(result.residual[0].count,600);
});
test('same-named functions in unrelated application files do not receive diagnostic exemptions',()=>{
 for(const name of ['diagnostics','summary','sample','effect'])assert.equal(gate('core.js',name,100).rubricAllocationPass,false);
 assert.equal(gate('app.js','diagnostics',100).rubricAllocationPass,true);
});
test('zero-allocation steady samples pass the strict gate',()=>{
 assert.deepEqual(allocationGate([{label:'steady',allocations:[]}],{rows:[]}),{rubricAllocationPass:true,residual:[],warmupAllocations:[]});
});
test('exact timeline combines count, bytes and retained types from all stacks at a source location',()=>{
 const data={snapshot:{meta:{trace_function_info_fields:['function_id','name','script_name','script_id','line','column'],node_fields:['type','name','id','self_size','edge_count','trace_node_id'],node_types:[['number','object']]}},strings:['read','http://localhost/games/signal-zero/input.js'],trace_function_infos:[0,0,1,1,23,2],trace_tree:[1,0,20,240,[],2,0,30,360,[]],nodes:[0,0,0,12,0,1,1,0,0,24,0,2]};
 const rows=aggregateTimeline(data);assert.equal(rows.length,1);assert.equal(rows[0].count,50);assert.equal(rows[0].bytes,600);assert.equal(rows[0].stacks,2);assert.deepEqual(rows[0].retained,{number:12,object:24});assert.equal(rows[0].scalarSized,true);
 assert.equal(allocationGate([],{rows}).rubricAllocationPass,false);
});

test('matched warmup evidence cannot excuse any allocation in the final confirmation window',()=>{
 const row={file:'core.js',function:'step',line:23,column:2,category:'steady/application',bytes:12};
 const initial={label:'initial',group:'stationary',allocations:[row]},confirmation={label:'confirm',group:'stationary',confirmation:true,allocations:[]};
 assert.equal(allocationGate([initial,confirmation]).rubricAllocationPass,true);
 assert.equal(allocationGate([initial,{...confirmation,allocations:[row]}]).rubricAllocationPass,false);
 assert.equal(allocationGate([initial]).rubricAllocationPass,false);
});
