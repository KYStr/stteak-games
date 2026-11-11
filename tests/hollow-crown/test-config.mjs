import {resolve,join} from 'node:path';
import {fileURLToPath} from 'node:url';
import {mkdir} from 'node:fs/promises';
import {spawn} from 'node:child_process';
import net from 'node:net';
export const root=fileURLToPath(new URL('../../',import.meta.url));
export const port=Number(process.env.HOLLOW_TEST_PORT||8103);
if(!Number.isInteger(port)||port<1024||port>65535)throw Error('HOLLOW_TEST_PORT must be an integer TCP port');
export const origin=`http://127.0.0.1:${port}`,url=origin+'/games/hollow-crown/';
export const artifactDir=resolve(process.env.HOLLOW_ARTIFACT_DIR||fileURLToPath(new URL('./artifacts/',import.meta.url)));
export const artifact=name=>join(artifactDir,name);
export async function harness(){
  await mkdir(artifactDir,{recursive:true});
  // A TCP check detects non-HTTP occupants too; never take over another process.
  await new Promise((resolve,reject)=>{const probe=net.createServer();probe.once('error',()=>reject(Error(`Port ${port} is in use.`)));probe.listen(port,'127.0.0.1',()=>probe.close(resolve));});
  const server=spawn('python3',['-m','http.server',String(port),'--bind','127.0.0.1','--directory',root+'public'],{stdio:'ignore'});
  let browser,cleanupPromise;
  const cleanup=()=>cleanupPromise||= (async()=>{try{await browser?.close();}finally{if(server.exitCode===null){server.kill('SIGTERM');await new Promise(r=>server.once('exit',r));}process.off('SIGINT',interrupt);process.off('SIGTERM',interrupt);}})();
  const interrupt=()=>{cleanup().finally(()=>process.exit(130));};process.on('SIGINT',interrupt);process.on('SIGTERM',interrupt);
  try {
    let ready=false;for(let i=0;i<50;i++){if(server.exitCode!==null)throw Error(`Server failed on port ${port}`);try{if((await fetch(url)).ok){ready=true;break;}}catch{}await new Promise(r=>setTimeout(r,100));}
    if(!ready)throw Error('Server did not start');
    const {chromium}=await import(process.env.PLAYWRIGHT_PATH||'/workspace/stteak8/tools/node_modules/playwright-core/index.mjs');
    browser=await chromium.launch({executablePath:'/usr/bin/google-chrome',args:['--no-sandbox','--use-angle=swiftshader','--enable-unsafe-swiftshader']});
    return {browser,cleanup};
  }catch(e){await cleanup();throw e;}
}
