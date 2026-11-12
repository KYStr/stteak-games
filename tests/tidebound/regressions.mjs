import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {createState,depart,dock,interact,startDive,serialize} from '../../games/tidebound/src/rules.js';
import {ISLANDS,DIVE_SITES,OBSERVATIONS,STORY_STAGES,diveTarget,voyageVariant} from '../../games/tidebound/src/world.js';
export async function runRegressions({page,base,output:out,report,check}){
 const snap=()=>page.evaluate(()=>tidebound.snapshot()),metrics=()=>page.evaluate(()=>tidebound.metrics());
 const fixture=async state=>{await page.evaluate(raw=>sessionStorage.setItem('tidebound.test.fixture',raw),typeof state==='string'?state:serialize(state));await page.reload({waitUntil:'domcontentloaded'});await page.waitForFunction(()=>window.tidebound)};
 const test=async(name,fn)=>{const data=await fn();(report.regressions??=[]).push({name,data});check(name)};
 await page.evaluate(()=>localStorage.setItem('stteak.tidebound.preferences.v1',JSON.stringify({music:.35,sfx:.65,reducedMotion:false,quality:'auto',camera:'overhead'})));
 const initial=createState();depart(initial);await fixture(initial);await page.click('#continue-voyage');
 await test('held Escape and M stay open and freeze simulation, audio and position',async()=>{
 for(const key of ['Escape','m']){await page.keyboard.down(key);const before=await snap();await page.keyboard.down(key);await page.keyboard.down(key);await page.waitForTimeout(500);await page.keyboard.up(key);const after=await snap(),m=await metrics();assert.equal(m.overlay,key==='m'?'map':'pause');assert.equal(after.time,before.time);assert.deepEqual(after.boat,before.boat);assert.equal(m.audio.loops,0);await page.keyboard.press(key);}return {heldRepeats:2};
 });
 await test('warm sail, lower, brake and steering cues occur within 100ms at keydown',async()=>{
 await page.waitForFunction(()=>tidebound.metrics().audio.loaded===9);const observations=[];
 for(const key of ['w','s','Space','a']){await page.evaluate(()=>{window.__cueCount=__qa.sources.length;window.__cueStart=performance.now();});await page.keyboard.down(key);const result=await page.evaluate(()=>({delay:__qa.sources.slice(__cueCount).find(s=>!s.loop)?.time-__qa.lastInputAt,visual:Math.max(...[...document.querySelectorAll('[data-cue-at]')].map(e=>Number(e.dataset.cueAt)))-__qa.lastInputAt}));await page.keyboard.up(key);assert.ok(result.delay>=0&&result.delay<=100,JSON.stringify({key,...result}));assert.ok(result.visual>=0&&result.visual<=100);observations.push({key,...result});await page.waitForTimeout(180);}return observations;
 });
 await test('keyboard and mouse sail SFX share bounded feedback under normal autoplay',async()=>{
  await page.waitForFunction(()=>tidebound.metrics().audio.loaded===9);const count=()=>page.evaluate(()=>__qa.sources.filter(s=>!s.loop).length),before=await count();
  await page.keyboard.down('w');await page.waitForTimeout(1100);await page.keyboard.up('w');const afterKey=await count();assert.ok(afterKey>before);assert.ok(afterKey-before<=3,'held keyboard sail must not flood voices');
  await page.keyboard.down('Space');await page.waitForTimeout(1200);await page.keyboard.up('Space');const afterFurl=await count();assert.ok(afterFurl>afterKey);assert.ok(afterFurl-afterKey<=3);
  await page.click('[data-sail="1"]');await page.waitForTimeout(600);await page.click('[data-sail="0"]');assert.ok(await count()>afterFurl);assert.ok((await metrics()).audio.voices<=8);return{before,afterKey,afterFurl,afterMouse:await count()};
 });
 await test('mouse preset and discovery cues meet 100ms; oxygen spring has paired immediate sound and highlight',async()=>{
 const results=[];for(const sail of ['0.5','1','0']){const count=await page.evaluate(()=>__qa.sources.length);await page.click(`[data-sail="${sail}"]`);const delay=await page.evaluate(n=>__qa.sources.slice(n).find(s=>s.sound==='sail')?.time-__qa.lastInputAt,count);assert.ok(delay>=0&&delay<=100,`mouse sail ${sail}: ${delay}`);results.push({sail,delay});}
 const s=createState();depart(s);const site=DIVE_SITES[0];Object.assign(s.boat,ISLANDS.find(i=>i.id==='coral').dock);dock(s);startDive(s,site.id);s.diveTasks[site.id]={completedStationIds:STORY_STAGES[0].offsets.map((_,i)=>site.id+'-'+i),opened:true};s.diver={...site.target};await fixture(s);await page.click('#continue-voyage');await page.waitForFunction(()=>tidebound.metrics().audio.loaded===9);const count=await page.evaluate(()=>__qa.sources.length);await page.keyboard.press('e');const discoverDelay=await page.evaluate(n=>__qa.sources.slice(n).find(s=>s.sound==='discovery')?.time-__qa.lastInputAt,count);assert.ok(discoverDelay>=0&&discoverDelay<=100);assert.ok((await snap()).parts.includes(site.partId));
 s.oxygen=20;s.diver={x:site.bubbles[0].x-4,z:site.bubbles[0].z};await fixture(s);await page.click('#continue-voyage');await page.waitForFunction(()=>tidebound.metrics().audio.loaded===9);await page.keyboard.down('d');await page.waitForFunction(()=>__qa.sources.some(s=>s.sound==='bubble'));await page.keyboard.up('d');const bubble=await page.evaluate(()=>({sound:__qa.sources.find(s=>s.sound==='bubble').time,visual:Number(document.querySelector('#oxygen-row').dataset.cueAt)}));assert.ok(Math.abs(bubble.sound-bubble.visual)<=100);await fixture(initial);await page.click('#continue-voyage');return {mouse:results,discoverDelay,bubble};
 });
 await test('orbit pointer capture released on blur',async()=>{
  await page.mouse.move(640,370);await page.mouse.down({button:'right'});const before=await page.evaluate(()=>document.querySelector('#sea').hasPointerCapture(__qa.pointer));
  await page.evaluate(()=>window.dispatchEvent(new Event('blur')));const after=await page.evaluate(()=>document.querySelector('#sea').hasPointerCapture(__qa.pointer));await page.mouse.up({button:'right'});await page.keyboard.press('Escape');
  report.orbitCapture={before,after};assert.equal(before,true);assert.equal(after,false,'canvas still owns pointer capture after blur');const orbit=(await metrics()).renderer.orbitOffset;await page.mouse.move(740,390);assert.equal((await metrics()).renderer.orbitOffset,orbit);
 });
 await test('active route guidance survives save and reload',async()=>{
  const s=createState();depart(s);Object.assign(s.boat,{x:-53,z:24,heading:Math.PI});s.voyage.harvested=OBSERVATIONS.map(o=>'observation:'+o.id);await fixture(s);await page.click('#continue-voyage');await page.locator('#route-options button').first().click();
  await page.keyboard.press('Escape');const before=await snap();assert.ok(before.voyage.navigation);await page.click('#save-voyage');await page.reload({waitUntil:'domcontentloaded'});await page.waitForFunction(()=>window.tidebound);const after=await snap();report.routeRestore={before:before.voyage.navigation,after:after.voyage.navigation,choices:after.voyage.routeChoices};assert.deepEqual(after.voyage.navigation,before.voyage.navigation);await page.click('#continue-voyage');await page.waitForTimeout(300);assert.match(await page.locator('#objective').innerText(),new RegExp(before.voyage.navigation.label));assert.ok((await metrics()).renderer.drawCalls>0);
  let held=new Set();const until=Date.now()+180000;while(true){const s=await snap();if(!s.voyage.navigation)break;assert.ok(Date.now()<until,'restored guidance must be completable');const p=s.voyage.navigation.waypoints[s.voyage.navigation.index],angle=Math.atan2(p.x-s.boat.x,-(p.z-s.boat.z)),e=Math.atan2(Math.sin(angle-s.boat.heading),Math.cos(angle-s.boat.heading)),next=new Set([...(Math.abs(e)>.08?[e>0?'d':'a']:[]),Math.abs(e)>.8?'Space':'w']);for(const k of held)if(!next.has(k))await page.keyboard.up(k);for(const k of next)if(!held.has(k))await page.keyboard.down(k);held=next;await page.waitForTimeout(180);}for(const k of held)await page.keyboard.up(k);await page.keyboard.down('Space');await page.waitForTimeout(800);await page.keyboard.up('Space');assert.equal((await snap()).voyage.navigation,null);
 });
 await test('old save and invalid live position recover visibly',async()=>{
  await fixture('{"schemaVersion":0,"time":50,"seed":1}');assert.equal((await snap()).mode,'harbor');assert.match(await page.locator('#panel').innerText(),/版本不相容/);
  const s=createState();depart(s);s.parts=['prism'];s.boat.x=999;await fixture(s);assert.equal((await snap()).mode,'harbor');assert.deepEqual((await snap()).parts,['prism']);return {oldVersion:true,invalidPosition:true};
 });
 await test('oxygen loss rescue preserves parts and can restart',async()=>{
  const s=createState();depart(s);Object.assign(s.boat,ISLANDS.find(i=>i.id==='coral').dock);dock(s);interact(s);startDive(s,'coral-dive');s.oxygen=.4;s.parts=['gear'];s.cargo=['tern','turtle','fan-coral','mangrove-root'];await fixture(s);await page.click('#continue-voyage');await page.waitForFunction(()=>tidebound.snapshot().mode==='island');const rescued=await snap();assert.equal(rescued.records.rescues,1);assert.equal(rescued.cargo.length,2);assert.deepEqual(rescued.parts,['gear']);await page.screenshot({path:out+'/oxygen-rescue.png'});await page.click('#dive');assert.equal((await snap()).mode,'diving');return {rescued,canRetry:true};
 });
 await test('hull loss rescue and restart',async()=>{
  const s=createState();depart(s);Object.assign(s.boat,{x:-12,z:141.8,heading:Math.PI,hull:1,speed:2,sail:1});await fixture(s);await page.click('#continue-voyage');await page.waitForFunction(()=>tidebound.snapshot().records.rescues===1);assert.equal((await snap()).boat.hull,100);await page.click('#depart');assert.equal((await snap()).mode,'sailing');return {rescues:(await snap()).records.rescues};
 });
 await test('visibility pause audio recovery and no retained key',async()=>{
  await page.keyboard.down('d');await page.waitForTimeout(400);await page.evaluate(()=>{Object.defineProperty(document,'hidden',{configurable:true,value:true});document.dispatchEvent(new Event('visibilitychange'))});const frozen=await snap();await page.waitForTimeout(600);assert.equal((await snap()).time,frozen.time);assert.equal((await metrics()).audio.loops,0);await page.keyboard.up('d');await page.evaluate(()=>{delete document.hidden;document.dispatchEvent(new Event('visibilitychange'))});await page.keyboard.press('Escape');await page.waitForTimeout(700);assert.equal((await snap()).boat.heading,frozen.boat.heading);assert.equal((await metrics()).audio.loops,2);return {method:'synthetic hidden event',frozenTime:frozen.time};
 });
 await test('modal keyboard trap and repeated lifecycle RAF bound',async()=>{
  for(let i=0;i<12;i++){await page.keyboard.press('m');await page.keyboard.press('Shift+Tab');assert.ok(await page.evaluate(()=>document.activeElement.closest('#modal-content')));await page.keyboard.press('Escape');}
  await page.keyboard.press('Escape');await page.locator('#music').fill('0');await page.locator('#sfx').fill('0');await page.check('#reduced');await page.keyboard.press('Escape');await page.waitForTimeout(400);assert.equal(await page.evaluate(()=>__qa.raf.size),1);
  await page.keyboard.press('Escape');await page.click('#save-voyage');await page.reload({waitUntil:'domcontentloaded'});await page.waitForFunction(()=>window.tidebound);await page.click('#continue-voyage');await page.keyboard.press('Escape');assert.equal(await page.locator('#music').inputValue(),'0');assert.equal(await page.locator('#reduced').isChecked(),true);assert.equal((await metrics()).renderer.motionScale,.18);return {pendingRAF:await page.evaluate(()=>__qa.raf.size),preferencesPersist:true};
 });
 await test('back navigation restores safely',async()=>{
  await page.keyboard.press('Escape');await page.keyboard.down('w');await page.waitForTimeout(500);await page.keyboard.up('w');const before=await snap();await page.route(base+'qa-back.html',r=>r.fulfill({status:200,contentType:'text/html',body:'<!doctype html><link rel="icon" href="data:,"><title>Back-navigation fixture</title><p>Return to the voyage.</p>'}));await page.goto(base+'qa-back.html',{waitUntil:'domcontentloaded'});await page.goBack({waitUntil:'domcontentloaded'});await page.waitForFunction(()=>window.tidebound);const after=await snap();assert.ok(Math.abs(after.boat.x-before.boat.x)<2);assert.notEqual((await metrics()).phase,'running');return {pageshow:await page.evaluate(()=>__qa.pageShows),phase:(await metrics()).phase,position:after.boat};
 });
 await test('target viewports and map screenshots',async()=>{
  await fixture(createState());for(const [w,h]of [[1280,720],[1920,1080]]){await page.setViewportSize({width:w,height:h});await page.waitForTimeout(600);await page.screenshot({path:out+`/harbor-${w}.png`});await page.click('#map-button');await page.screenshot({path:out+`/map-${w}.png`});await page.keyboard.press('Escape');assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false)}await page.setViewportSize({width:1280,height:720});return {viewports:['1280x720','1920x1080']};
 });
 await test('all dive entries, targets and boundaries are framed at both resolutions',async()=>{
  const results=[];
  for(const [w,h] of [[1280,720],[1920,1080]]){await page.setViewportSize({width:w,height:h});
   for(const site of DIVE_SITES)for(const pose of ['entry','target','boundary']){
    const s=createState();depart(s);Object.assign(s.boat,ISLANDS.find(i=>i.id===site.islandId).dock);dock(s);s.parts=STORY_STAGES.slice(0,STORY_STAGES.findIndex(stage=>stage.siteId===site.id)).map(stage=>stage.partId);startDive(s,site.id);
    if(pose==='target')s.diver={...site.target};if(pose==='boundary')s.diver={x:site.entry.x-site.radius*.98,z:site.entry.z};
    await fixture(s);await page.click('#continue-voyage');await page.waitForTimeout(500);
    assert.match(await page.locator('#keyboard-hint').innerText(),/游動/);assert.doesNotMatch(await page.locator('#keyboard-hint').innerText(),/帆力|轉舵/);
    const m=await metrics();assert.ok(m.renderer.drawCalls<=250,'dive draw calls exceed 250');
    const p=m.renderer.projections.target;const targetInView=p.z<1&&p.x>=340&&p.x<=w-90&&p.y>=130&&p.y<=h-230;
    assert.ok(targetInView||await page.locator('#dive-direction').isVisible(),'objective needs projection or visible direction indicator');
    await page.screenshot({path:out+`/${site.id}-${pose}-${w}.png`});results.push({site:site.id,pose,w,renderer:m.renderer});
    await page.click('#surface-button');assert.equal((await snap()).mode,'island');
   }
  }await page.setViewportSize({width:1280,height:720});return results;
 });
 await test('ashore Whitewing and lighthouse frame the island beside the investigation panel',async()=>{
  for(const [w,h]of [[1280,720],[1920,1080]]){await page.setViewportSize({width:w,height:h});for(const id of ['gull','lighthouse']){const s=createState();depart(s);Object.assign(s.boat,ISLANDS.find(i=>i.id===id).dock,{sail:0,speed:0});dock(s);await fixture(s);await page.click('#investigate');await page.waitForTimeout(700);assert.equal(await page.locator('#investigate').isVisible(),true);await page.screenshot({path:out+`/shore-${id}-${w}.png`});const m=(await metrics()).renderer;const island=ISLANDS.find(i=>i.id===id);assert.ok(Math.hypot(m.cameraTarget[0]-island.x,m.cameraTarget[2]-island.z)<island.radius,'ashore camera must face the island');}}await page.setViewportSize({width:1280,height:720});
 });
 await test('route and sample cards leave chart visible, clickable and clear of all HUD cards',async()=>{
  const layouts=[];
  async function layout(label,w){await page.waitForTimeout(300);const boxes=await page.evaluate(()=>{
   const chart=document.querySelector('#mini-chart'),r=chart.getBoundingClientRect(),hit=document.elementFromPoint(r.x+r.width/2,r.y+r.height/2);
   return{chart:{x:r.x,y:r.y,width:r.width,height:r.height},hit:hit===chart||chart.contains(hit),hitElement:hit?.outerHTML?.slice(0,300),inert:chart.inert,bodyClass:document.body.className,viewport:{width:innerWidth,height:innerHeight},overlaps:['#route-choice-card','#survey-choice','#tide-hud','#voyage-hud'].filter(id=>{const el=document.querySelector(id);if(el.hidden)return false;const b=el.getBoundingClientRect();return Math.min(r.right,b.right)>Math.max(r.left,b.left)&&Math.min(r.bottom,b.bottom)>Math.max(r.top,b.top)}),hudClipped:document.querySelector('#voyage-hud').scrollHeight>document.querySelector('#voyage-hud').clientHeight+1};});
   (report.layoutDiagnostics??=[]).push({label,w,...boxes});assert.deepEqual(boxes.overlaps,[],label);assert.equal(boxes.hit,true);assert.equal(boxes.hudClipped,false);layouts.push({label,w,...boxes});await page.screenshot({path:out+`/chart-${label}-${w}.png`});await page.click('#mini-chart');assert.equal((await metrics()).overlay,'map');await page.keyboard.press('Escape');}
  for(const [w,h]of [[1280,720],[1920,1080]]){await page.setViewportSize({width:w,height:h});
   const s=createState();depart(s);Object.assign(s.boat,{x:-53,z:24,heading:Math.PI});s.voyage.harvested=OBSERVATIONS.map(o=>'observation:'+o.id);await fixture(s);await page.click('#continue-voyage');assert.equal(await page.locator('#route-choice-card').isVisible(),true);await layout('route',w);
   await page.locator('#route-options button').first().click();await layout('guide',w);
   const sample=createState();depart(sample);const o=OBSERVATIONS[0];Object.assign(sample.boat,{x:o.x,z:o.z,speed:0,sail:0});await fixture(sample);await page.click('#continue-voyage');assert.equal(await page.locator('#survey-choice').isVisible(),true);await layout('sample',w);
  }await page.setViewportSize({width:1280,height:720});return layouts;
 });
 await test('fresh browser contexts reproduce the same chart; seed 3 has different visible encounters',async()=>{
 if(!(await metrics()).overlay)await page.keyboard.press('Escape');const signatures=[];
 for(const seed of [1,3,1]){const context=await page.context().browser().newContext({viewport:{width:1280,height:720}});try{const fresh=await context.newPage();fresh.setDefaultTimeout(120000);const errors=[];fresh.on('pageerror',e=>errors.push(e.message));fresh.on('console',m=>{if(m.type()==='error')errors.push(m.text())});await fresh.goto(base,{timeout:120000,waitUntil:'domcontentloaded'});await fresh.waitForFunction(()=>window.tidebound);await fresh.selectOption('#seed',String(seed));await fresh.click('#depart');await fresh.waitForFunction(id=>tidebound.metrics().renderer.encounterSignature.variantId===id,seed);const signature=await fresh.evaluate(()=>tidebound.metrics().renderer.encounterSignature);signatures.push(signature);await fresh.screenshot({path:out+`/seed-${seed}-${signatures.length}.png`});assert.deepEqual(errors,[]);}finally{await context.close();}}
 await page.bringToFront();assert.deepEqual(signatures[0],signatures[2]);assert.ok(signatures[0].observations.filter(p=>!signatures[1].observations.some(q=>q.id===p.id&&q.x===p.x&&q.z===p.z)).length>=5);return signatures;
 });
 await test('failed storage write does not claim save success',async()=>{
  await fixture(createState());await page.click('#depart');await page.keyboard.press('Escape');const inMemory=await snap();
  await page.evaluate(()=>{window.__qaOriginalSet=Storage.prototype.setItem;Storage.prototype.setItem=function(){throw new DOMException('QA simulated quota exhaustion','QuotaExceededError')}});
  await page.click('#save-voyage');const toast=await page.locator('#toast').innerText(),warning=await page.locator('#storage-warning').innerText();report.storageFailure={toast,warning,storageAvailable:(await metrics()).storageAvailable};
  assert.deepEqual(await snap(),inMemory);assert.equal(report.storageFailure.storageAvailable,false);assert.doesNotMatch(toast,/航程已儲存/,'failed manual save falsely claims success');assert.equal(await page.locator('#storage-warning').isVisible(),true);
  await page.keyboard.press('Escape');await page.click('#journal-button');const downloaded=page.waitForEvent('download');await page.click('#export-journal');const download=await downloaded;const exported=JSON.parse(await readFile(await download.path(),'utf8'));assert.equal(exported.savedLocally,false);const live=await snap(),{savedAtSafeIsland,...exportedVoyage}=exported.state;assert.equal(savedAtSafeIsland,live.lastSafeIsland);assert.deepEqual(exportedVoyage,live);
  await page.evaluate(()=>Storage.prototype.setItem=window.__qaOriginalSet);await page.keyboard.press('Escape');await page.keyboard.press('Escape');const before=await snap();await page.click('#save-voyage');assert.equal((await metrics()).storageAvailable,true);assert.equal(await page.locator('#storage-warning').isVisible(),false);assert.deepEqual(await snap(),before);await page.reload({waitUntil:'domcontentloaded'});await page.waitForFunction(()=>window.tidebound);assert.equal((await snap()).time,before.time);
 });
}
