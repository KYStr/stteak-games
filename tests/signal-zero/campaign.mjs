import assert from 'node:assert/strict';
import {writeFile} from 'node:fs/promises';
import {harness} from './browser-harness.mjs';
import {navigateAndReady,actionTimeout} from './evidence.mjs';
import {runBrowserChapter} from './campaign-driver.mjs';
const seeds=(process.env.SIGNAL_ZERO_SEEDS||'1009').split(',').map(Number);assert.ok(seeds.every(s=>Number.isInteger(s)&&s>=0&&s<=0xffffffff));
const h=await harness('campaign'),report={campaigns:[],chapters:[],errors:h.errors,failedRequests:h.failedRequests,navigations:[],requiredFailures:[]};
const state=()=>h.page.evaluate(()=>signalZeroControlState);
async function deploy(seed){await h.page.fill('#seed-code',String(seed));await h.page.click('#deploy',{force:true});}
async function restart(){const s=await state();if(s.screen==='caught'){await h.page.click('#restart',{force:true});return;}if(s.screen==='playing')await h.page.keyboard.press('Escape');await h.page.click('#restart',{force:true});await h.page.click('#confirm',{force:true});}
try{
 console.log('Opening '+h.base);await navigateAndReady(h.page,opts=>h.page.goto(h.base,opts),'home',actionTimeout,{report,errors:h.errors,failedRequests:h.failedRequests,url:h.base});await h.page.click('#settings',{force:true});await h.page.selectOption('#quality','low');await h.page.click('#back',{force:true});await h.page.click('#begin',{force:true});await deploy(seeds[0]);await h.page.clock.install();
 // Real entrance, no progress fixtures. Clock changes RAF timestamps only.
 for(let tick=0;tick<6000;tick++){await h.page.clock.fastForward(100);if(tick%100===0){const s=await state();if(s.phase==='caught'){report.idle={time:s.time,phase:s.phase,trace:s.traceRemaining};break;}if(tick%1000===0)console.log('IDLE',tick,s.time);}}
 assert.equal(report.idle?.phase,'caught');assert.ok(report.idle.time<600);await h.page.click('#retry',{force:true});
 report.random=[];
 for(const seed of [12345,67890]){
  if(report.random.length)await restart();
  let rng=seed,furthest=0,sample,at25=null;const keys=new Set(),keyUse={};
  const random=()=>{rng=(Math.imul(rng,1664525)+1013904223)>>>0;return rng/4294967296};
  try{
   for(let second=0;second<600;second++){
    sample=await state();furthest=Math.max(furthest,sample.player.x);if(sample.phase!=='playing')break;
    const axis=random(),desired=new Set(axis<.65?['KeyD']:axis<.8?['KeyA']:[]);
    for(const [key,probability]of [['Space',.45],['KeyW',.55],['KeyS',.12],['KeyQ',.20],['KeyE',.25]])if(random()<probability)desired.add(key);
    for(const key of keys)if(!desired.has(key)){await h.page.keyboard.up(key);keys.delete(key)}
    for(const key of desired)if(!keys.has(key)){keyUse[key]=(keyUse[key]||0)+1;await h.page.keyboard.down(key);keys.add(key)}
    for(let tick=0;tick<10;tick++){await h.page.clock.fastForward(100);sample=await state();furthest=Math.max(furthest,sample.player.x);if(!at25&&sample.time>=25)at25={time:sample.time,objectives:sample.objectives.length,furthest,alerts:sample.alerts};if(sample.phase!=='playing')break}
   }
  }finally{for(const key of keys)await h.page.keyboard.up(key)}
  report.random.push({seed,frequency:sample.seed,time:sample.time,phase:sample.phase,furthest,objectives:sample.objectives.length,alerts:sample.alerts,keyUse,at25});
  assert.equal(sample.seed,seeds[0]);assert.notEqual(sample.phase,'playing','random trial must reach a real outcome');
  for(const key of ['KeyW','KeyQ','KeyE'])assert.ok(keyUse[key]>0,'random controller exercised '+key);
  console.log('RANDOM '+JSON.stringify(report.random.at(-1)));

 }
 await restart();
 for(const [iteration,seed]of seeds.entries()){
  if(iteration){await h.page.keyboard.press('Escape');await h.page.click('#missions',{force:true});await h.page.click('[data-level="0"]',{force:true});await deploy(seed);}
  const campaign={seed,chapters:[]};report.campaigns.push(campaign);
  for(let chapter=0;chapter<6;chapter++){
   const result=await runBrowserChapter(h.page,chapter,{artifacts:h.artifacts,clock:true,seedLabel:String(seed)});assert.equal(result.seed,seed);report.chapters.push(result);campaign.chapters.push(result);console.log('CHAPTER '+JSON.stringify(result));await writeFile(h.artifacts+'/campaign.json',JSON.stringify(report,null,2));
   if(chapter<5){await h.page.click('#next',{force:true});await deploy(seed);}
  }
  for(const random of report.random){assert.ok(campaign.chapters[0].objectives>random.objectives,'competent completion exceeds random progress');random.competentComparison={completedObjectives:campaign.chapters[0].objectives,randomObjectives:random.objectives,earlyObjectiveDelta:random.at25?campaign.chapters[0].competent25.objectives-random.at25.objectives:null};}assert.ok(campaign.chapters.reduce((s,r)=>s+r.time,0)>=600);
  let elapsed=0,previous=0;const introductions=[];for(const chapter of campaign.chapters){for(const item of chapter.introductions){const at=elapsed+item.time;introductions.push({...item,campaignTime:at,gap:at-previous});previous=at;}elapsed+=chapter.time;}campaign.introductions=introductions;
  assert.equal(new Set(introductions.map(i=>i.id)).size,12);assert.ok(introductions.slice(1).every(i=>i.gap<180));
  await h.page.click('#next',{force:true});await h.page.click('#ending-0',{force:true});await navigateAndReady(h.page,opts=>h.page.reload(opts),'home',actionTimeout,{report,errors:h.errors,failedRequests:h.failedRequests});await h.page.waitForSelector('#missions');
  const saved=await h.page.evaluate(()=>JSON.parse(localStorage.getItem('stteak.signal-zero.save.v1')));assert.ok(saved.variantBests['antenna:standard:'+seed]);assert.ok(saved.endings.includes('voices'));campaign.persisted=true;
  await h.page.click('#missions',{force:true});await h.page.click('[data-level="0"]',{force:true});await deploy(seed);assert.equal((await state()).objectives.length,0);campaign.endingReloadReplay=true;
 }
 assert.deepEqual(h.errors,[]);assert.deepEqual(h.failedRequests,[]);report.passed=true;await writeFile(h.artifacts+'/campaign.json',JSON.stringify(report,null,2));console.log('PASS all six input-only rendered chapters -> ending -> reload -> replay; '+seeds.length+' seed(s)');
}catch(error){report.error=error.message;report.state=await state().catch(()=>null);await writeFile(h.artifacts+'/campaign-failure.json',JSON.stringify(report,null,2));await h.page.screenshot({path:h.artifacts+'/campaign-failure.png'}).catch(()=>{});throw error;}finally{await h.close();}
