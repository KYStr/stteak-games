import {parse} from '../../games/aetherwake/node_modules/acorn/dist/acorn.mjs';
import {readFile} from 'node:fs/promises';
import assert from 'node:assert/strict';

// Sampling cannot identify object types. Independently reject explicit JS
// containers, closures and string construction in numeric per-frame routines.
// HUD strings have a separate displayed-value/cadence cache; events may allocate.
export function allocationExpressions(node, result=[]) {
  if(!node||typeof node!=='object')return result;
  if(['NewExpression','ArrayExpression','ObjectExpression','TemplateLiteral','ArrowFunctionExpression','FunctionExpression','SpreadElement'].includes(node.type))result.push({type:node.type,line:node.loc?.start.line});
  if(node.type==='BinaryExpression'&&node.operator==='+'&&(typeof node.left.value==='string'||typeof node.right.value==='string'))result.push({type:'string-concatenation',line:node.loc?.start.line});
  if(node.type==='CallExpression'&&node.callee.type==='Identifier'&&node.callee.name==='String')result.push({type:'String',line:node.loc?.start.line});
  if(node.type==='CallExpression'&&node.callee.type==='MemberExpression'&&['map','filter','slice','flatMap','bind','matchMedia'].includes(node.callee.property.name))result.push({type:node.callee.property.name,line:node.loc?.start.line});
  for(const [key,value] of Object.entries(node))if(!['loc','start','end'].includes(key)){
    if(Array.isArray(value))for(const child of value)allocationExpressions(child,result);
    else if(value&&typeof value==='object')allocationExpressions(value,result);
  }
  return result;
}
const contracts={
  'scene.js':['AetherScene.update','AetherScene.updateModels','AetherScene.updateCamera','AetherScene.updateWorldWinds','ForegroundOcclusion.blockers','NavigationLabelOcclusion.apply'],
  'simulation.js':['FlightSimulation._nearby','FlightSimulation._sampleSatisfied','FlightSimulation._score'],
  'wind-physics.js':['accumulateWinds'],
  'main.js':['drawMap'],
  'input.js':['FlightInput.read'],
  'timing.js':['TimingSamples.push'],
  'math.js':['length2','length3'],
};
export async function auditAllocationContract(){
  const report=[];
  for(const [file,names] of Object.entries(contracts)){
    const code=await readFile(new URL(`../../games/aetherwake/src/${file}`,import.meta.url),'utf8');
    const ast=parse(code,{ecmaVersion:'latest',sourceType:'module',locations:true});
    const candidates=[];
    for(const entry of ast.body){const node=entry.declaration||entry;
      if(node.type==='ClassDeclaration')for(const method of node.body.body)candidates.push({name:node.id.name+'.'+method.key.name,node:method.value});
      if(node.type==='FunctionDeclaration')candidates.push({name:node.id.name,node});
    }
    if(file==='scene.js') {
      for(const name of ['AetherScene.updateLabels','positionLabel']) {
        const fn=candidates.find(f=>f.name===name);assert.ok(fn);
        const check=(node,guards=[])=>{
          if(!node||typeof node!=='object')return;
          const next=node.type==='IfStatement'?[...guards,code.slice(node.test.start,node.test.end)]:guards;
          if(node.type==='TemplateLiteral'||node.type==='CallExpression'&&node.callee.name==='String'){
            assert.ok(next.some(test=>/textTick|textDistance|textLabel|textHeading|record.opacity/.test(test)),`${name} strings require cadence/value-change guards`);
          }
          for(const [key,value] of Object.entries(node))if(!['loc','start','end'].includes(key)){
            if(Array.isArray(value))for(const child of value)check(child,next);else if(value&&typeof value==='object')check(value,next);
          }
        };check(fn.node.body);
        report.push({file,name,line:fn.node.loc.start.line,endLine:fn.node.loc.end.line,cachedDisplayStrings:true});
      }
    }
    if(file==='main.js') {
      const fn=candidates.find(f=>f.name==='updateHud');assert.ok(fn);
      const check=(node,guards=[])=>{
        if(!node||typeof node!=='object')return;
        const next=node.type==='IfStatement'?[...guards,code.slice(node.test.start,node.test.end)]:guards;
        if(['NewExpression','ArrayExpression','ObjectExpression','ArrowFunctionExpression'].includes(node.type))assert.ok(next.some(test=>/hudCache.conditionHint|lastRoute/.test(test)),`HUD container at ${node.loc.start.line} must be a hint/route transition`);
        for(const [key,value] of Object.entries(node))if(!['loc','start','end'].includes(key)){
          if(Array.isArray(value))for(const child of value)check(child,next);else if(value&&typeof value==='object')check(value,next);
        }
      };check(fn.node.body);
      report.push({file,name:'updateHud',line:fn.node.loc.start.line,endLine:fn.node.loc.end.line,transitionOnlyContainers:true});
    }
    for(const name of names){const fn=candidates.find(f=>f.name===name);assert.ok(fn,`${file}:${name} exists`);
      const expressions=allocationExpressions(fn.node.body);
      assert.deepEqual(expressions,[],`${file}:${name} contains recurring explicit allocation expressions`);
      report.push({file,name,line:fn.node.loc.start.line,endLine:fn.node.loc.end.line,explicitAllocations:0});
    }
  }
  // A negative control proves the check detects the class of regressions it gates.
  assert.equal(allocationExpressions(parse('function f(){return [new Map(),{},`${1}`];}',{ecmaVersion:'latest',locations:true})).length,4);
  return report;
}
