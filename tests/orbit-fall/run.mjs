import assert from 'node:assert/strict';
import {isAbsolute} from 'node:path';
import {spawn,spawnSync} from 'node:child_process';
import {mkdir,writeFile,readdir} from 'node:fs/promises';
import {fileURLToPath,pathToFileURL} from 'node:url';
import {chromium} from '/workspace/stteak8/tools/node_modules/playwright-core/index.mjs';
import {campaignAcceptance,routeAndSeedBots} from './campaign-bots.mjs';
import {regressions} from './regressions.mjs';
import {reproduceBuild} from './build-repro.mjs';
import {round5Regressions} from './round5-regressions.mjs';
import {round4Regressions} from './round4-regressions.mjs';
import {legacyLifecycle} from './legacy.mjs';
import {costAcceptance} from './cost-acceptance.mjs';
const root=fileURLToPath(new URL('../../',import.meta.url)),evidence=process.env.ORBIT_TEST_EVIDENCE?pathToFileURL(process.env.ORBIT_TEST_EVIDENCE.replace(/\/$/,'')+'/'):new URL(`./evidence/${new Date().toISOString().replace(/[:.]/g,'-')}/`,import.meta.url);
if(process.env.ORBIT_TEST_EVIDENCE)assert.ok(isAbsolute(process.env.ORBIT_TEST_EVIDENCE),'ORBIT_TEST_EVIDENCE must be absolute');
await mkdir(evidence,{recursive:true});
for(const args of (process.env.ORBIT_TEST_SKIP_BUILD==='1'?[]:[['--prefix','games/orbit-fall','run','build']])){const r=spawnSync('npm',args,{cwd:root,stdio:'inherit'});assert.equal(r.status,0)}
const oldTests=(await readdir(new URL('../games/orbit-fall/',import.meta.url))).filter(n=>n.endsWith('.test.js')).map(n=>`tests/games/orbit-fall/${n}`);
const unit=spawnSync('node',['--test',...oldTests,'tests/orbit-fall/lifecycle.test.mjs','tests/orbit-fall/audio.test.mjs','tests/orbit-fall/variants.test.mjs','tests/orbit-fall/controller.test.mjs'],{cwd:root,encoding:'utf8'});await writeFile(new URL('unit.log',evidence),unit.stdout+unit.stderr);console.log(`Unit tests: ${unit.stdout.match(/# pass (\d+)/)?.[1]} passed${unit.status===0?'':'; failures retained'}; evidence ${fileURLToPath(evidence)}`);
const url=process.env.ORBIT_TEST_URL||'http://127.0.0.1:8106/games/orbit-fall/';
const reproduction=await reproduceBuild(evidence);
let server,browser;const results={failures:unit.status===0?[]:[{category:'unit',exception:unit.stdout+unit.stderr}],groups:{unit:{passed:unit.status===0,log:'unit.log'},build:reproduction}};
for(const [signal,code]of [['SIGTERM',143],['SIGINT',130]])process.once(signal,async()=>{results.interrupted=signal;await writeFile(new URL('acceptance.json',evidence),JSON.stringify(results,null,2));await browser?.close().catch(()=>{});server?.kill();process.exit(code)});
try{
 if(!process.env.ORBIT_TEST_URL){server=spawn('python3',['-m','http.server','8106','--bind','127.0.0.1','--directory',`${root}public`],{stdio:'ignore'});await new Promise(r=>setTimeout(r,500));assert.equal(server.exitCode,null,'Port 8106 must be free')}
 browser=await chromium.launch({executablePath:'/usr/bin/google-chrome',args:['--use-angle=swiftshader','--enable-unsafe-swiftshader','--renderer-process-limit=1','--num-raster-threads=1','--disable-dev-shm-usage','--autoplay-policy=no-user-gesture-required']});
 const groups={campaign:campaignAcceptance,round5:round5Regressions,round4:round4Regressions,regressions,legacy:legacyLifecycle,performance:costAcceptance,bots:routeAndSeedBots};
 const selected=process.env.ORBIT_TEST_GROUPS?.split(',')||Object.keys(groups);results.developmentSubset=selected.length!==Object.keys(groups).length;
 for(const name of selected){
  const started=performance.now();try{assert.ok(groups[name],`Unknown group ${name}`);results.groups[name]={passed:true,result:await groups[name](browser,url,evidence),wallSeconds:(performance.now()-started)/1000};console.log(`${name}: PASS`)}
  catch(error){results.groups[name]={passed:false,failure:error.stack,wallSeconds:(performance.now()-started)/1000};results.failures.push({category:name,exception:error.stack});console.error(`${name}: FAIL retained; continuing independent groups`,error.message)}
  await writeFile(new URL('acceptance.json',evidence),JSON.stringify(results,null,2));
 }
 results.passed=results.failures.length===0;results.fullAcceptance=results.passed&&!results.developmentSubset&&!results.groups.performance?.result?.soak?.developmentShortRun;process.exitCode=results.passed?0:1;
} catch(error){results.failure=error.stack;process.exitCode=1}
finally{await browser?.close();if(server){server.kill();await new Promise(resolve=>server.exitCode!==null?resolve():server.once('exit',resolve))}await writeFile(new URL('acceptance.json',evidence),JSON.stringify(results,null,2))}
