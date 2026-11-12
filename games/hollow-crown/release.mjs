import {spawn} from 'node:child_process';
import {mkdir,writeFile} from 'node:fs/promises';
import {resolve} from 'node:path';
const directory=new URL('.',import.meta.url),folder=resolve(process.env.HOLLOW_ARTIFACT_DIR||new URL('../../tests/hollow-crown/artifacts/',directory).pathname);
const commands=['build','test','test:regressions','test:feedback','test:allocation','test:matrix','test:pacing','test:acceptance','test:polish'];
await mkdir(folder,{recursive:true});const results=[];let child,interrupted=false;
const interrupt=signal=>{interrupted=true;child?.kill(signal);};const sigint=()=>interrupt('SIGINT'),sigterm=()=>interrupt('SIGTERM');process.on('SIGINT',sigint);process.on('SIGTERM',sigterm);
try{
 for(const command of commands){if(interrupted)break;const started=Date.now();const result=await new Promise(resolve=>{child=spawn('npm',['run',command],{cwd:directory,stdio:'inherit'});child.once('error',error=>resolve({command,exitCode:1,error:error.message}));child.once('exit',(code,signal)=>resolve({command,exitCode:code??1,signal}));});results.push({...result,wallMs:Date.now()-started});child=null;await writeFile(folder+'/release-checks.json',JSON.stringify({passed:results.length===commands.length&&results.every(r=>r.exitCode===0),interrupted,results},null,2));}
}finally{process.off('SIGINT',sigint);process.off('SIGTERM',sigterm);}
console.log('RELEASE CHECKS '+JSON.stringify(results.map(r=>({command:r.command,exitCode:r.exitCode}))));process.exitCode=interrupted?130:results.length===commands.length&&results.every(r=>r.exitCode===0)?0:1;
