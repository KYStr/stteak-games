import {spawnSync} from 'node:child_process';
import {readdirSync} from 'node:fs';
const root=new URL('../../',import.meta.url);
const units=readdirSync(new URL('../games/moss-and-moon/',import.meta.url)).filter(f=>f.endsWith('.test.js')).map(f=>new URL('../games/moss-and-moon/'+f,import.meta.url).pathname);
const cases=[['unit/server',['--test',...units,new URL('./server.test.mjs',import.meta.url).pathname]],
 ...['acceptance','regressions','campaign-bots'].map(name=>[name,[new URL('./'+name+'.mjs',import.meta.url).pathname]])];
const results=[];
// Every independent case runs serially, preserving each failure and its artifacts.
for(const [name,args] of cases) {
 const child=spawnSync(process.execPath,args,{cwd:root,stdio:'inherit'});
 const status=child.status??1;results.push({name,status,signal:child.signal,error:child.error?.message});
 console.log(`${status===0?'PASS':'FAIL'} suite case ${name} (exit ${status})`);
}
console.log('Moss & Moon suite results:',JSON.stringify(results));
process.exitCode=results.some(r=>r.status!==0)?1:0;
