// Live visible-cue evidence; fixed-seed 18-case rules matrix is run separately by check:release.
import assert from 'node:assert/strict';import {writeFile} from 'node:fs/promises';
import {url,artifact,harness} from './test-config.mjs';import {freshProfile} from '../../public/games/hollow-crown/storage.js';import {installVisiblePilot} from './visible-pilot.mjs';
const runner=await harness(),report={reactionMs:200,humanPlay:false,cases:[],errors:[],controller:'Visible shapes/current positions only; no countdowns, future moves or mutation. Keyboard and DOM menus.'};
const limit=Number(process.env.HOLLOW_PACING_CASE_MS||3600000);
const targeted=process.env.HOLLOW_PACING_SCENARIO==='standard-burn';report.scope=targeted?'targeted standard burn completion':'full release gameplay';
const scenarios=targeted?[{seed:72,difficulty:'standard',strategy:'burn',mode:'competent'}]:process.env.HOLLOW_PACING_QUICK?[{seed:72,difficulty:'pilgrim',strategy:'mobility',mode:'competent'}]:[
 ...['mobility','counter','burn'].map(strategy=>({seed:72,difficulty:'pilgrim',strategy,mode:'competent'})),
 {seed:72,difficulty:'standard',strategy:'burn',mode:'competent'},
 {seed:72,difficulty:'standard',strategy:'mobility',mode:'idle'},
 ...[72,4837].map(seed=>({seed,difficulty:'standard',strategy:'mobility',mode:'random'}))];
try{
 const page=await runner.browser.newPage({viewport:{width:1280,height:720}});page.on('pageerror',e=>report.errors.push(e.message));page.on('console',e=>{if(e.type()==='error')report.errors.push(e.text());});
 for(const scenario of scenarios){
  await page.goto(url);await page.waitForFunction(()=>window.hollowCrownDiagnostics);const p=freshProfile();p.tutorialDone=true;p.unlocked.push('kindling');await page.evaluate(p=>{localStorage.clear();localStorage.setItem('stteak.hollow-crown.v1',JSON.stringify(p));},p);await page.reload();await page.waitForFunction(()=>window.hollowCrownDiagnostics);
  await page.click('[data-action="progress"]');await page.locator('[data-config="seed"]').fill(String(scenario.seed));await page.locator('[data-config="seed"]').dispatchEvent('change');await page.keyboard.press('Escape');await page.locator('[data-config="difficulty"]').selectOption(scenario.difficulty);await page.locator('[data-config="startTalent"]').selectOption({mobility:'fleet-ash',counter:'wide-oath',burn:'kindling'}[scenario.strategy]);await page.click('[data-action="begin"]');await installVisiblePilot(page,scenario.strategy,scenario.mode);
  const started=performance.now();let lastLog=started;const captured=new Set();
  while(performance.now()-started<limit){await page.waitForTimeout(1000);const s=await page.evaluate(()=>hollowCrownDiagnostics.snapshot().run);const mechanic=s.objective?.kind;if(mechanic&&mechanic!=='clear'&&!captured.has(mechanic)){captured.add(mechanic);await page.screenshot({path:artifact(`live-${scenario.strategy}-${mechanic}.png`)});}if(performance.now()-lastLog>30000){console.log(`LIVE ${scenario.strategy}/${scenario.mode} stage=${s.roomIndex+1} active=${s.time.toFixed(1)} hp=${s.player.hp.toFixed(0)}`);lastLog=performance.now();}if(s.phase==='result')break;}
  const result=await page.evaluate(()=>{visiblePilot.stop();const s=hollowCrownDiagnostics.snapshot().run;return{seconds:s.time,rooms:s.roomHistory,stats:s.stats,talents:s.talents,complete:s.phase==='result',outcome:s.result?.won?'win':s.result?'loss':'incomplete',metrics:visiblePilot.metrics};});report.cases.push({...scenario,...result,wallMs:performance.now()-started});await page.screenshot({path:artifact(`live-${scenario.strategy}-${scenario.mode}-${scenario.seed}-result.png`)});await writeFile(artifact('pacing-progress.json'),JSON.stringify(report,null,2));console.log(JSON.stringify({scenario,outcome:result.outcome,seconds:result.seconds,rooms:result.rooms.length}));
 }
 report.complete=report.cases.every(c=>c.complete);const competent=report.cases.filter(c=>c.mode==='competent');report.threeBuildWins=['mobility','counter','burn'].every(s=>competent.some(c=>c.difficulty==='pilgrim'&&c.strategy===s&&c.outcome==='win'));
 const first=competent.find(c=>c.outcome==='win');report.firstSuccessfulSeconds=first?.seconds;report.depth=first?.seconds>=600&&first.metrics.introductions.length>=4&&first.rooms.length===14;
 report.progressing=competent.every(c=>c.metrics.progressSamples.every((s,i,a)=>i<12||s.room!==a[i-12].room||s.kills>a[i-12].kills||s.objective>a[i-12].objective||s.damage>a[i-12].damage));
 report.randomUnderperforms=report.cases.filter(c=>c.mode==='random').every(c=>c.outcome!=='win'&&c.rooms.length<Math.min(...competent.map(c=>c.rooms.length))*.5);report.idleLoses=report.cases.some(c=>c.mode==='idle'&&c.outcome==='loss'&&c.rooms.length===0);
 report.standardWin=competent.some(c=>c.difficulty==='standard'&&c.outcome==='win'&&c.rooms.length===14);const builds=Object.fromEntries(['mobility','counter','burn'].map(s=>[s,competent.find(c=>c.difficulty==='pilgrim'&&c.strategy===s&&c.outcome==='win')]));report.distinctEffects=!!builds.burn&&!!builds.counter&&!!builds.mobility&&(builds.burn.stats.damageByAction.burn||0)>(builds.mobility.stats.damageByAction.burn||0)&&(builds.counter.stats.damageByAction.counter||0)>(builds.mobility.stats.damageByAction.counter||0)&&builds.mobility.stats.dodges>0;
 report.passed=report.complete&&report.standardWin&&report.distinctEffects&&report.threeBuildWins&&report.depth&&report.progressing&&report.randomUnderperforms&&report.idleLoses&&!report.errors.length;
 if(targeted)report.passed=report.complete&&report.standardWin&&!report.errors.length;
 if(process.env.HOLLOW_PACING_QUICK){report.developmentOnly=true;report.passed=false;}
 assert.ok(report.passed,'Release pacing/build/baseline gates failed; all outcomes retained');
}catch(e){report.failure=e.stack;process.exitCode=1;console.error(e);}finally{await writeFile(artifact('pacing.json'),JSON.stringify(report,null,2));await runner.cleanup();}
