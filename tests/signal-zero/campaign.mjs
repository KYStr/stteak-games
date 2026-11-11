import assert from 'node:assert/strict';
import {writeFile} from 'node:fs/promises';
import {harness} from './browser-harness.mjs';
import {runBrowserChapter} from './campaign-driver.mjs';
const seeds=(process.env.SIGNAL_ZERO_SEEDS||'1009').split(',').map(Number);assert.ok(seeds.every(s=>Number.isInteger(s)&&s>=0&&s<=0xffffffff));
const h=await harness('campaign'),report={campaigns:[],chapters:[],errors:h.errors};
const state=()=>h.page.evaluate(()=>signalZeroControlState);
async function deploy(seed){await h.page.fill('#seed-code',String(seed));await h.page.click('#deploy',{force:true});}
async function restart(){const s=await state();if(s.screen==='caught'){await h.page.click('#restart',{force:true});return;}if(s.screen==='playing')await h.page.keyboard.press('Escape');await h.page.click('#restart',{force:true});await h.page.click('#confirm',{force:true});}
try{
 console.log('Opening '+h.base);await h.page.goto(h.base);await h.page.click('#settings',{force:true});await h.page.selectOption('#quality','low');await h.page.click('#back',{force:true});await h.page.click('#begin',{force:true});await deploy(seeds[0]);await h.page.clock.install();
 // Real entrance, no progress fixtures. Clock changes RAF timestamps only.
 for(let tick=0;tick<6000;tick++){await h.page.clock.fastForward(100);if(tick%100===0){const s=await state();if(s.phase==='caught'){report.idle={time:s.time,phase:s.phase,trace:s.traceRemaining};break;}if(tick%1000===0)console.log('IDLE',tick,s.time);}}
 assert.equal(report.idle?.phase,'caught');assert.ok(report.idle.time<600);await h.page.click('#retry',{force:true});
 report.random=[];
 for(const seed of [12345,67890]){
  if(report.random.length)await restart();
  let rng=seed,furthest=0,sample;const keys=new Set();
  for(let tick=0;tick<400;tick++){
   sample=await state();furthest=Math.max(furthest,sample.player.x);if(sample.time>=25||sample.phase!=='playing')break;
   if(tick%4===0){rng=(Math.imul(rng,1664525)+1013904223)>>>0;const desired=rng%5===0?['KeyA']:rng%3===0?['KeyD','Space']:['KeyD'];for(const k of keys)if(!desired.includes(k)){await h.page.keyboard.up(k);keys.delete(k);}for(const k of desired)if(!keys.has(k)){await h.page.keyboard.down(k);keys.add(k);}}
   await h.page.clock.fastForward(100);
  }
  for(const k of keys)await h.page.keyboard.up(k);report.random.push({seed,time:sample.time,phase:sample.phase,furthest,objectives:sample.objectives.length,alerts:sample.alerts});assert.equal(sample.objectives.length,0);
 }
 await restart();
 for(const [iteration,seed]of seeds.entries()){
  if(iteration){await h.page.keyboard.press('Escape');await h.page.click('#missions',{force:true});await h.page.click('[data-level="0"]',{force:true});await deploy(seed);}
  const campaign={seed,chapters:[]};report.campaigns.push(campaign);
  for(let chapter=0;chapter<6;chapter++){
   const result=await runBrowserChapter(h.page,chapter,{artifacts:h.artifacts,clock:true,seedLabel:String(seed)});assert.equal(result.seed,seed);report.chapters.push(result);campaign.chapters.push(result);console.log('CHAPTER '+JSON.stringify(result));await writeFile(h.artifacts+'/campaign.json',JSON.stringify(report,null,2));
   if(chapter<5){await h.page.click('#next',{force:true});await deploy(seed);}
  }
  assert.ok(campaign.chapters[0].competent25.objectives>report.random[0].objectives);assert.ok(campaign.chapters.reduce((s,r)=>s+r.time,0)>=600);
  let elapsed=0,previous=0;const introductions=[];for(const chapter of campaign.chapters){for(const item of chapter.introductions){const at=elapsed+item.time;introductions.push({...item,campaignTime:at,gap:at-previous});previous=at;}elapsed+=chapter.time;}campaign.introductions=introductions;
  assert.equal(new Set(introductions.map(i=>i.id)).size,12);assert.ok(introductions.slice(1).every(i=>i.gap<180));
  await h.page.click('#next',{force:true});await h.page.click('#ending-0',{force:true});await h.page.reload();await h.page.waitForSelector('#missions');
  const saved=await h.page.evaluate(()=>JSON.parse(localStorage.getItem('stteak.signal-zero.save.v1')));assert.ok(saved.variantBests['antenna:standard:'+seed]);assert.ok(saved.endings.includes('voices'));campaign.persisted=true;
  await h.page.click('#missions',{force:true});await h.page.click('[data-level="0"]',{force:true});await deploy(seed);assert.equal((await state()).objectives.length,0);campaign.endingReloadReplay=true;
 }
 assert.deepEqual(h.errors,[]);report.passed=true;await writeFile(h.artifacts+'/campaign.json',JSON.stringify(report,null,2));console.log('PASS all six input-only rendered chapters -> ending -> reload -> replay; '+seeds.length+' seed(s)');
}catch(error){report.error=error.message;report.state=await state().catch(()=>null);await writeFile(h.artifacts+'/campaign-failure.json',JSON.stringify(report,null,2));await h.page.screenshot({path:h.artifacts+'/campaign-failure.png'}).catch(()=>{});throw error;}finally{await h.close();}
