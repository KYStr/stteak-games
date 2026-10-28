import {trackMenuLabel} from './presentation.js'; // 純資料標籤保持插入與重排後的選單正確。
import { TRACKS,CARS,COLORS,DECALS,sampleTrack,PHYSICS_VERSION } from './content.js';
import { createRace,stepRace,resetCar,getGhostPose } from './physics.js';
import { loadSave,saveRace,saveSettings,SAVE_KEY,BACKUP_KEY } from './storage.js';
import { createRenderer } from './renderer.js';
import { createInput } from './input.js';
import { createBridge } from './bridge.js';
import { DriveAudio } from './audio.js';
import { createFrameProfiler,FRAME_PHASE } from './profiler.js';
import { createFrameHistory } from './frame-history.js';
import { createNotifications } from './notifications.js';

const BUILD='neon-drift-tutorial-progress-0015',VERSION='1.0.13'; // 教學進度提示使用獨立候選身分，不沿用0014的驗收證據或分數。
const $=s=>document.querySelector(s);
const fmt=t=>`${String(Math.floor(Math.max(0,t)/60)).padStart(2,'0')}:${(Math.max(0,t)%60).toFixed(2).padStart(5,'0')}`;
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const audio=new DriveAudio();
let save=loadSave(),settings={...save.settings};
let trackId=settings.trackId||'harbor',carId=settings.carId||'comet',mode=settings.mode==='drift'?'drift':'time';
let phase='menu',race=null,renderer=null,lastTime=0,lastHud=0,resultSaved=false,modalKind='',previousFocus=null;
const notifications=createNotifications({dialog:$('#modal'),modalNotice:$('#modal-notice'),toast:$('#toast')});
const frameSamples=createFrameHistory(),frameGaps=[],events=[];let runFrames=0;
const profiler=createFrameProfiler(180000),profileRow=new Float64Array(13),renderContext={phase:'menu',frameSeq:0,elapsed:0,countdown:0};
let frameSeq=0,previousCallbackEnd=null,profileActive=false,profileCompleted=false,profileStartedAt=0,profileEndedAt=0,completedFrameProfile=null,lastCompletedRun=null;
const browserTimingTypes=[],observedRuns=[];
const newBrowserTiming=()=>({supported:browserTimingTypes,longTasks:[],longAnimationFrames:[],totalCounts:{longtask:0,'long-animation-frame':0},retention:'Latest 1200 entries per type; totalCounts includes overwritten entries. Late deliveries are routed by entry startTime to the current or immediately previous run; older runs are not retained. Run interval includes pauses, so these entries alone are not gameplay-only measurements.'});
let browserTiming=newBrowserTiming(),observedRun=null;
// Browser work outside our callback is recorded separately; none of these
// counters alone identifies GPU cost or the reason for scheduler delays.
if(typeof PerformanceObserver!=='undefined')for(const type of ['longtask','long-animation-frame']){
  if(!PerformanceObserver.supportedEntryTypes?.includes(type))continue;
  try{const observer=new PerformanceObserver(list=>{
    for(const entry of list.getEntries()){
      const run=observedRuns.findLast(item=>entry.startTime>=item.start&&entry.startTime<=item.end);if(!run)continue;
      const target=type==='longtask'?run.timing.longTasks:run.timing.longAnimationFrames;
      const item={startTime:entry.startTime,duration:entry.duration,deliveryPhase:phase};
      if(type==='long-animation-frame')Object.assign(item,{blockingDuration:entry.blockingDuration,renderStart:entry.renderStart,styleAndLayoutStart:entry.styleAndLayoutStart});
      run.timing.totalCounts[type]++;target.push(item);if(target.length>1200)target.shift();
    }
  });observer.observe({type,buffered:false});browserTimingTypes.push(type);}catch{/* Unsupported observers do not prevent play. */}
}
function preserveCompletedRun(){if(!profileCompleted)return;completedFrameProfile??=profiler.snapshot();if(lastCompletedRun?.startedAt===completedFrameProfile.metadata.startedAt)return;lastCompletedRun={startedAt:completedFrameProfile.metadata.startedAt,buildId:BUILD,result:race?.result,frameProfile:completedFrameProfile,browserTiming,renderer:renderer?.stats,capturedPhase:phase};}
function recordEvent(type,details={}){events.push({type,...details,at:Date.now()});if(events.length>400)events.shift();}
function diagnostics(){return {gameId:'neon-drift',buildId:BUILD,version:VERSION,userAgent:navigator.userAgent,viewport:[innerWidth,innerHeight],dpr:devicePixelRatio,phase,frameMs:frameSamples.snapshot(),frameGaps,frameSampling:'Running frames after countdown, 0 < delta <= 1000 ms; gaps over 1000 ms pause before physics and are recorded separately, not counted as playable frames.',events,renderer:renderer?.stats,frameProfile:completedFrameProfile||profiler.snapshot(),browserTiming,lastCompletedRun};}
function diagnosticsSummary(){
  // This UI path reads only bounded summaries and lengths of existing arrays.
  // Full profiler/renderer snapshots are reserved for diagnostics file export.
  return diagnosticsPreview({gameId:'neon-drift',buildId:BUILD,version:VERSION,userAgent:navigator.userAgent,viewport:[innerWidth,innerHeight],dpr:devicePixelRatio,phase,frameMs:frameSamples.summary(),frameGaps,frameSampling:'Running frames after countdown, 0 < delta <= 1000 ms; gaps over 1000 ms pause before physics and are recorded separately, not counted as playable frames.',events,renderer:renderer?.summary,frameProfile:completedFrameProfile||profiler.summary(),browserTiming,lastCompletedRun});
}
function diagnosticsPreview(data){
  // Whitelist bounded metadata; raw captures remain untouched for file export.
  const scalar=value=>typeof value==='string'?(value.length>320?value.slice(0,320)+'…（摘要截短；完整值見匯出）':value):typeof value==='boolean'||Number.isFinite(value)?value:null;
  const pick=(value,keys)=>Object.fromEntries(keys.map(key=>[key,scalar(value?.[key])]));
  const omitted=value=>({omitted:true,retainedCount:Array.isArray(value)?value.length:value?.omitted===true&&Number.isSafeInteger(value.retainedCount)&&value.retainedCount>=0?value.retainedCount:null,note:'完整資料保留於診斷匯出檔'});
  const size=value=>({width:scalar(value?.[0]),height:scalar(value?.[1])});
  const totals=value=>Object.fromEntries(['renderer','gpuPoll','sceneUpdate','submit'].map(key=>[key,pick(value?.[key],['count','totalMs','maxMs','lastMs'])]));
  const capture=value=>pick(value,['captureFrozen','freezeReason','freezeRenderSeq','freezeHostFrameSeq','freezeElapsed','freezeCountdown','capturePhase','captureThroughRenderSeq','ignoredRenderCount']);
  const profile=value=>{if(!value)return null;const rows=omitted(value.rows);return {...pick(value,['schemaVersion','capacity','totalCount','overwritten']),retainedCount:rows.retainedCount,capturePartial:value.capturePartial??(Number.isFinite(value.overwritten)?value.overwritten>0:null),metadata:{...pick(value.metadata,['buildId','startedAt','performanceTimeOrigin','mode','trackId','carId','dpr','notes']),viewport:size(value.metadata?.viewport)},rows};};
  const browser=value=>value?{totalCounts:pick(value.totalCounts,['longtask','long-animation-frame']),longTasks:omitted(value.longTasks),longAnimationFrames:omitted(value.longAnimationFrames),retention:scalar(value.retention)}:null;
  const render=value=>value?{...pick(value,['quality','adapter','calls','triangles','geometries','textures','pixelRatio','resizeCount','renderSubmitMs','renderSubmitMaxMs','renderSubmitTiming','gpuTimer']),drawingBufferSize:size(value.drawingBufferSize),
    cpuTiming:value.cpuTiming?{...pick(value.cpuTiming,['epoch','resetReason','epochQuality','phase','capturePartial','discardedEpochCount','renderCount','recordedCount','sampleLimit','retainedCount','overwrittenCount','sampling','scope','resetPolicy']),...capture(value.cpuTiming),totals:totals(value.cpuTiming.totals),byPhase:Object.fromEntries(['boot','menu','running','paused','result','unknown'].filter(phase=>Object.hasOwn(value.cpuTiming.byPhase||{},phase)).map(phase=>[phase,totals(value.cpuTiming.byPhase[phase])])),samples:omitted(value.cpuTiming.samples)}:null,
    gpuTimingDetails:value.gpuTimingDetails?{...pick(value.gpuTimingDetails,['epoch','resetReason','epochQuality','capturePartial','discardedEpochCount','sampleLimit','sampleTotal','retainedCount','overwrittenCount','pendingQueries','unresolvedQueries','pollCount','disjointCount','sampling']),...capture(value.gpuTimingDetails)}:null,gpuMsSamples:value.gpuMsSamples===null?null:omitted(value.gpuMsSamples),gpuSamples:value.gpuSamples===null?null:omitted(value.gpuSamples)}:null;
  return {notice:'這是診斷摘要；逐幀樣本與事件未放入畫面。完整且未降精度的資料請用「匯出此版本的效能紀錄」。',
    ...pick(data,['gameId','buildId','version','userAgent','phase','dpr','frameSampling']),viewport:size(data.viewport),frameMs:omitted(data.frameMs),frameGaps:omitted(data.frameGaps),events:omitted(data.events),frameProfile:profile(data.frameProfile),renderer:render(data.renderer),browserTiming:browser(data.browserTiming),
    lastCompletedRun:data.lastCompletedRun?{...pick(data.lastCompletedRun,['startedAt','buildId','capturedPhase']),result:pick(data.lastCompletedRun.result,['mode','trackId','carId','time','score','medal','success','collisions','resets']),frameProfile:profile(data.lastCompletedRun.frameProfile),renderer:render(data.lastCompletedRun.renderer),browserTiming:browser(data.lastCompletedRun.browserTiming)}:null};
}
const track=()=>TRACKS.find(t=>t.id===trackId)||TRACKS[0],car=()=>CARS.find(c=>c.id===carId)||CARS[0];
const record=()=>save.records?.[`${trackId}:${mode}`];
const bridge=createBridge({start:()=>startRace(),pause:()=>pauseRace(true,'host'),resume:()=>resumeRace(),restart:()=>startRace(race?.mode||mode)});
const input=createInput({onPause:()=>phase==='running'?pauseRace():phase==='paused'?resumeRace():null,onReset:()=>recover(),onGesture:()=>audio.unlock()});
function toast(message){notifications.show(message);}
function commitSettings(patch){const result=saveSettings(save,patch);save=result.save;settings={...save.settings};if(!result.ok)toast(result.notice||'瀏覽器無法保存設定，本次仍可遊玩。');else notifications.clearModal();applySettings();}
function applySettings(){input.setOptions({autoThrottle:settings.autoThrottle!==false,touch:settings.touchControls===true||matchMedia('(pointer:coarse)').matches});audio.setOptions({sfx:settings.volume??.65,music:settings.musicVolume??.3});renderer?.setOptions({quality:settings.quality||'auto',ghost:settings.ghost!==false,reducedMotion:settings.reducedMotion||matchMedia('(prefers-reduced-motion:reduce)').matches,speedFov:settings.speedFov!==false});$('#touch-controls').hidden=!(input.touch&&phase==='running');}
function trackPath(t){const pts=Array.from({length:100},(_,i)=>sampleTrack(t,i/99*t.length));const xs=pts.map(p=>p.x),zs=pts.map(p=>p.z),minX=Math.min(...xs),minZ=Math.min(...zs),scale=25/Math.max(Math.max(...xs)-minX,Math.max(...zs)-minZ);return pts.map((p,i)=>`${i?'L':'M'}${(p.x-minX)*scale+4},${(p.z-minZ)*scale+2}`).join(' ');}
function refreshMenu(){
  $('#track-options').innerHTML=TRACKS.map((t,i)=>`<button data-track="${t.id}" class="${t.id===trackId?'selected':''}" aria-pressed="${t.id===trackId}"><span class="track-number">${trackMenuLabel(t,i)}</span><svg viewBox="0 0 40 30" aria-hidden="true"><path d="${trackPath(t)}" fill="none" stroke="${t.id===trackId?'#b5ffd9':'#738b9d'}" stroke-width="1.1"/></svg>${t.name}</button>`).join(''); // 原HTML結構不變，僅難度與編號改由資料函式提供。
  $('#car-options').innerHTML=CARS.map(c=>`<button data-car="${c.id}" class="${c.id===carId?'selected':''}" aria-pressed="${c.id===carId}">${c.name.split(' ')[0]}<small>${c.name.split(' ').slice(1).join(' ')} / ${c.role}</small></button>`).join('');
  document.querySelectorAll('[data-mode]').forEach(b=>{b.classList.toggle('selected',b.dataset.mode===mode);b.setAttribute('aria-pressed',b.dataset.mode===mode);});
  $('#car-description').textContent=car().description;
  const r=record();$('#record-label').textContent=r?(mode==='time'?`個人最佳 ${fmt(r.bestTime||0)}`:`個人最佳 ${(r.bestScore||0).toLocaleString()} 分`):'尚無本機紀錄';
  $('#targets').textContent=`金 / 銀 / 銅 ${track().medals[mode].map(v=>mode==='time'?fmt(v):v.toLocaleString()+' 分').join(' · ')}`;
  $('#scene-track').textContent=track().subtitle.split(' / ')[0];
  const tutorialProgress=save.tutorialComplete===true?'教學進度：已完成（目前進度）':'教學進度：尚未完成'; // 只讀既有正規存檔狀態；目前進度不代表本機寫入一定成功。
  const progressNode=$('#tutorial-progress');if(progressNode.textContent!==tutorialProgress)progressNode.textContent=tutorialProgress; // 只在狀態文字改變時更新，避免切換車款或賽道重複播報。
}
function showPreview(){race=createRace({trackId,carId,mode});renderer.setRace(track(),car(),COLORS.find(c=>c.id===settings.colorId)||COLORS[0],settings.decalId||'none');}
function menu(){preserveCompletedRun();if(profileActive){profileEndedAt=performance.now();observedRun.end=profileEndedAt;}profileActive=false;phase='menu';input.setEnabled(false);audio.pause();closeModal();$('#garage').hidden=false;$('#scene-label').hidden=false;$('#hud').hidden=true;$('#touch-controls').hidden=true;$('#pause-button').hidden=true;bridge.state('ready');refreshMenu();showPreview();}
function selectedGhost(){return settings.ghost===false?null:save.records?.[`${trackId}:time`]?.ghost||null;}
function startRace(selectedMode=mode){
  preserveCompletedRun();if(profileActive)observedRun.end=performance.now();completedFrameProfile=null;profileCompleted=false;profileStartedAt=performance.now();profileEndedAt=Infinity;profileActive=true;browserTiming=newBrowserTiming();observedRun={start:profileStartedAt,end:profileEndedAt,timing:browserTiming};observedRuns.push(observedRun);if(observedRuns.length>2)observedRuns.shift();
  profiler.reset({buildId:BUILD,startedAt:Date.now(),performanceTimeOrigin:performance.timeOrigin,mode:selectedMode,trackId,carId,viewport:[innerWidth,innerHeight],dpr:devicePixelRatio,notes:'Every callback entered while running, including countdown rows (elapsed=0). totalCpuMs excludes the final profiler record and export. outsideCallbackMs includes browser rendering, scheduling, other tasks and idle time, not a measured GPU or scheduler duration. Long-gap rows are retained even when physics pauses.'});
  closeModal();phase='running';resultSaved=false;input.clear();input.setEnabled(true);
  race=createRace({trackId,carId,mode:selectedMode,sensitivity:settings.sensitivityByCar?.[carId]??settings.sensitivity??1,ghost:selectedGhost()});
  renderer.setRace(race.track,car(),COLORS.find(c=>c.id===settings.colorId)||COLORS[0],settings.decalId||'none');
  $('#garage').hidden=true;$('#scene-label').hidden=true;$('#hud').hidden=false;$('#pause-button').hidden=false;$('#tutorial-hint').hidden=selectedMode!=='tutorial';
  $('#hud-title').textContent=selectedMode==='tutorial'?'駕駛學堂 · 90 秒練習':track().name;
  $('#timer-label').textContent=selectedMode==='time'?'總用時 / 2 圈':'剩餘時間';
  applySettings();audio.unlock();audio.click();bridge.state('running');lastTime=performance.now();
  recordEvent('start',{mode:selectedMode,trackId,carId,raceTrackId:race.track.id});
}
function recover(){if(phase==='running'&&resetCar(race)){toast('已回正到合法檢查點 · +2.00 秒，連段清除');audio.tone(220,.18,.14);}}
function openModal(title,content,kind){previousFocus=document.activeElement;notifications.open(kind);$('#modal-title').textContent=title;$('#modal-content').innerHTML=content;modalKind=kind;if(!$('#modal').open)$('#modal').showModal();$('#close-modal').hidden=kind==='result';}
function closeModal(){notifications.close();if($('#modal').open)$('#modal').close();modalKind='';if(previousFocus?.isConnected)previousFocus.focus();}
function pauseRace(show=true,reason='manual',details={}){if(phase!=='running')return;recordEvent('pause',{reason,...details,elapsed:race?.elapsed,visibility:document.visibilityState,hasFocus:document.hasFocus()});phase='paused';input.setEnabled(false);audio.pause();$('#touch-controls').hidden=true;bridge.state('paused');if(show)showPause();}
function showPause(){openModal('讓午夜等一下',`<p>比賽與聲音已暫停。成績只會在合法結算時保存；返回車庫或重新挑戰會放棄這一場。</p><div class="modal-buttons"><button class="primary" data-action="resume">繼續疾行</button><button data-action="retry">重新挑戰</button><button data-action="garage">放棄並回車庫</button></div>`,'pause');}
function resumeRace(){if(phase!=='paused')return;closeModal();phase='running';input.clear();input.setEnabled(true);applySettings();audio.unlock();bridge.state('running');lastTime=performance.now();recordEvent('resume',{elapsed:race?.elapsed,visibility:document.visibilityState,hasFocus:document.hasFocus()});}
function help(){if(phase==='running')pauseRace(false,'help');openModal('讀懂下一個彎',`<p>計時賽按順序通過檢查點、完成兩圈；漂移挑戰在 120 秒內追逐獎牌。黃色支線是更窄、抓地較低的風險捷徑。</p><div class="help-grid"><div><kbd>W / ↑</kbd>油門，加速到 40 km/h 以上</div><div><kbd>S / ↓</kbd>煞車；停止後繼續按會倒車</div><div><kbd>A D / ← →</kbd>轉向；按住越久，車頭轉得越多</div><div><kbd>Space</kbd>配合轉向入彎，穩住側滑後再放開</div><div><kbd>R</kbd>回到最後合法點，+2 秒並清連段</div><div><kbd>Esc</kbd>暫停／繼續，離開分頁自動暫停</div></div><h3>第一個左彎 · COMET／中靈敏度示範</h3><p>從全新教學開始，使用鍵盤與手動油門；以下時間從倒數結束的 GO 算起。</p><ol><li>先按住 W 約 4 秒。</li><li>保持 W，加按 A＋Space 約 0.8 秒。</li><li>放開 A，續按 W＋Space 約 2.5 秒，確認兩秒維持目標完成。</li><li>放開 W／Space，按 S 約 0.8 秒後放開，再按 R 完成回正。</li></ol><p>其他車型、靈敏度與觸控操作要依彎道調整持鍵時間。觀察教學的「當段乾淨漂移」進度，先穩住側滑，再收束出彎。</p><p>一般賽道先煞車準備入彎。漂移需要速度與側滑角，乾淨側滑最高 ×4；撞牆會中斷並折損本段。回頭繞圈、倒車和低速原地轉不能刷分。</p><p>手機預設自動油門，左側左右轉向、右側煞車／手煞車。設定可切手動油門及顯示觸控鍵。直式可玩，橫式視野更寬。</p><div class="modal-buttons"><button class="primary" data-action="close">了解，回到遊戲</button><button data-action="tutorial">開始 90 秒教學</button></div>`,'help');}
function showSettings(){if(phase==='running')pauseRace(false,'settings');const check=(v)=>v?'checked':'';openModal('把手感調成你的',`
  <label class="setting"><span>音效<small>引擎、輪胎與碰撞</small></span><input data-setting="volume" type="range" min="0" max="1" step=".05" value="${settings.volume??.65}" aria-label="音效音量"></label>
  <label class="setting"><span>音樂<small>原創午夜合成器節拍</small></span><input data-setting="musicVolume" type="range" min="0" max="1" step=".05" value="${settings.musicVolume??.3}" aria-label="音樂音量"></label>
  <label class="setting"><span>${esc(car().name)} 轉向靈敏度</span><select data-setting="sensitivity"><option value="0">低 · 穩定</option><option value="1">中 · 標準</option><option value="2">高 · 靈敏</option></select></label>
  <label class="setting"><span>畫質<small>低畫質降低像素密度與遠景</small></span><select data-setting="quality"><option value="auto">自動</option><option value="low">低</option><option value="medium">中</option><option value="high">高</option></select></label>
  <label class="setting"><span>顯示自己的最佳圈幽靈車</span><input data-setting="ghost" type="checkbox" ${check(settings.ghost!==false)}></label>
  <label class="setting"><span>顯示觸控控制</span><input data-setting="touchControls" type="checkbox" ${check(input.touch)}></label>
  <label class="setting"><span>觸控自動油門</span><input data-setting="autoThrottle" type="checkbox" ${check(settings.autoThrottle!==false)}></label>
  <label class="setting"><span>減少動態<small>穩定相機，停用速度視野變化</small></span><input data-setting="reducedMotion" type="checkbox" ${check(settings.reducedMotion)}></label>
  <label class="setting"><span>速度視野變化</span><input data-setting="speedFov" type="checkbox" ${check(settings.speedFov!==false)}></label>
  <p>設定與紀錄只保存在此瀏覽器。每台車的轉向靈敏度各自保存。進行中的比賽不會中途存檔。</p><details><summary>效能與本機診斷</summary><p id="diagnostics"></p><button data-action="export-diagnostics">匯出此版本的效能紀錄</button><button data-action="show-diagnostics">顯示診斷摘要</button><p>摘要省略逐幀樣本與事件；完整資料請使用上方匯出按鈕下載。</p><pre id="diagnostics-json" hidden style="max-height:220px;overflow:auto;font-size:10px;white-space:pre-wrap;word-break:break-all"></pre></details><div class="modal-buttons"><button class="primary" data-action="close">完成</button><button data-action="export">匯出本機紀錄</button><button data-action="confirm-reset">清除紀錄…</button></div>`,'settings');
  $('[data-setting="sensitivity"]').value=settings.sensitivityByCar?.[carId]??settings.sensitivity??1;$('[data-setting="quality"]').value=settings.quality||'auto';
  const renderSummary=renderer?.summary,sorted=frameSamples.snapshot().sort((a,b)=>a-b),p95=sorted.length?sorted[Math.floor((sorted.length-1)*.95)]:null;$('#diagnostics').textContent=`${BUILD} · 已量測 ${sorted.length} 遊玩影格，p95 ${p95?.toFixed(1)??'—'} ms。${renderSummary?.calls??0} draw calls / ${renderSummary?.triangles??0} triangles。樣本 ${sorted.length<120?'不足，不能判定穩定性。':'僅代表目前遊玩片段。'}較高 p95 代表畫面更新較慢；${frameGaps.length} 次超過 1 秒的停頓另列原始診斷，背景時間不計入比賽。`;
}
function medalCount(){return Math.max(save.unlocks?.medals||0,Object.values(save.records||{}).filter(r=>r.medal&&r.medal!=='none').length);}
function customize(){const medals=medalCount();openModal('午夜塗裝工坊',`<p>已獲得 ${medals} 張挑戰卡獎牌。外觀解鎖不影響速度或抓地。</p><h3>車色</h3><div class="swatches">${COLORS.map(c=>`<button data-color="${c.id}" style="background:${c.hex}" class="${c.id===settings.colorId?'selected':''}" title="${c.name}${c.unlock>medals?` · 需要 ${c.unlock} 張獎牌`:''}" aria-label="${c.name}${c.unlock>medals?`，需要 ${c.unlock} 張獎牌`:''}" ${c.unlock>medals?'disabled':''}>${c.name}</button>`).join('')}</div><h3>車身貼花</h3><div class="segmented">${DECALS.map(d=>`<button data-decal="${d.id}" class="${d.id===settings.decalId?'selected':''}" ${d.unlock>medals?'disabled':''}>${d.name}<small>${d.unlock>medals?`需要 ${d.unlock} 張獎牌`:'已解鎖'}</small></button>`).join('')}</div><div class="modal-buttons"><button class="primary" data-action="close">完成塗裝</button></div>`,'customize');}
function finishRace(){
  if(resultSaved)return;resultSaved=true;phase='result';input.setEnabled(false);audio.pause();audio.unlock().then(()=>audio.success());$('#touch-controls').hidden=true;bridge.state('paused');
  const previous=save.records?.[`${trackId}:${race.mode}`];const oldMedals=medalCount();const result=saveRace(save,race);save=result.save;settings={...save.settings};if(!result.ok&&race.result.success)toast(result.notice||'無法保存紀錄，請匯出後重試。');
  const r=race.result,medal={gold:'金牌 / GOLD',silver:'銀牌 / SILVER',bronze:'銅牌 / BRONZE',none:'未達獎牌 · 下一圈再試'}[r.medal];
  const title=race.mode==='tutorial'?(r.success?'你已掌握午夜的節奏':'練習完成，接著磨好下一步'):r.success?'這一圈，屬於你':'未完成 · 重新找回節奏';
  const improvement=race.mode==='time'&&previous?.bestTime?(r.time-previous.bestTime):race.mode==='drift'&&previous?.bestScore?(r.score-previous.bestScore):null;
  const tutorialList=race.mode==='tutorial'?`<p>${Object.entries({accelerate:'40 km/h 加速',entry:'入彎側滑',control:'連續 2 秒乾淨漂移',exit:'收束出彎',recover:'按 R 回正'}).map(([k,v])=>`${r.tutorial[k]?'✓':'○'} ${v}`).join('<br>')}</p>`:'';
  const sectorRows=(r.sectors||[]).slice(-8).map((s,i)=>{const best=previous?.sectors?.find(v=>v.sector===s.sector);return `<div class="result-sector"><span>扇區 ${s.sector||i+1}</span><span>${fmt(s.time)}${best?` / ${s.time-best.time>=0?'+':''}${(s.time-best.time).toFixed(2)}s`:''}</span></div>`;}).join('');
  openModal(title,`<div class="result-medal">${medal}</div><div class="result-value">${race.mode==='time'?fmt(r.time):Math.floor(r.score).toLocaleString()+'<small style="font-size:15px"> 分</small>'}</div><p>${result.newBest?'新本機最佳紀錄。':improvement!==null?`與上一個最佳${race.mode==='time'?`差 ${improvement>=0?'+':''}${improvement.toFixed(2)} 秒`:`差 ${improvement>=0?'+':''}${improvement} 分`}。`:'這次路線已成為下一局的參考。'} ${r.success?'':'結果未達目標，不會覆蓋較佳紀錄。'}</p><div class="result-grid"><div>最快合法圈<strong>${r.bestLap?fmt(r.bestLap):'—'}</strong></div><div>碰撞 / 回正<strong>${r.collisions} / ${r.resets}</strong></div><div>回正罰時<strong>+${r.penalty.toFixed(0)} s</strong></div></div>${tutorialList}${sectorRows?`<details><summary style="margin-top:16px;font-size:12px;cursor:pointer">檢視最後一圈扇區</summary>${sectorRows}</details>`:''}<p>${r.collisions>0?'下次目標：彎前先鬆油煞車，減少護欄碰撞，保住出彎速度。':race.mode==='drift'?'下次目標：延長乾淨側滑至 ×4，試試內側黃色支線。':'下次目標：觀察幽靈車，在慢扇區更早準備出彎。'}</p>${medalCount()>oldMedals?'<p class="unlock">新獎牌已保存 · 到塗裝工坊查看新外觀。</p>':''}<p class="subtle">${esc(result.notice||'結算已保存至此瀏覽器。')}${race.mode==='time'&&r.success?' 最佳合法圈會成為下次的無碰撞幽靈車。':''}</p><div class="modal-buttons"><button class="primary" data-action="retry">同配置再跑一場 ↗</button><button data-action="garage">返回車庫</button></div>`,'result');
  recordEvent('finish',{result:r});
}
function updateHUD(){
  $('#speed').textContent=String(Math.round(Math.abs(race.speed)*3.6)).padStart(3,'0');$('#speed-meter').style.width=`${Math.min(150,Math.abs(race.speed)*3)}px`;
  $('#timer').textContent=fmt(race.mode==='time'?race.elapsed:race.timeRemaining);
  $('#hud-progress').textContent=race.mode==='time'?`第 ${Math.min(2,race.lap)} / 2 圈`:race.mode==='tutorial'?'練習 · 不計最佳紀錄':'漂移挑戰 · 120 秒';
  $('#score').textContent=Math.floor(race.score+race.pendingScore).toLocaleString();$('#combo').textContent=`DRIFT / ×${race.combo.toFixed(1)}${race.pendingScore>0?' · 尚未入袋':''}`;
  $('#reason').textContent=race.reason;$('#sector').textContent=race.nextCheckpoint===0?'下一個：終點線':`下一個檢查點 ${race.nextCheckpoint} / 7`;
  $('#countdown').textContent=race.countdown>0?Math.ceil(race.countdown):race.elapsed<.7?'GO':'';
  if(race.mode==='tutorial'){
    const t=race.tutorial,cometDemo=race.carId==='comet'&&race.sensitivity===1&&!input.touch;
    const hint=!t.accelerate?['01 / 油門',cometDemo?'COMET／中靈敏度：GO 後先按住 W 約 4 秒，準備第一個左彎。':'按住油門加速到 40 km/h 以上。觸控預設自動油門，先看前方彎道。']:
      !t.entry?['02 / 入彎',cometDemo?'GO 約 4 秒時，保持 W，加按 A＋Space 約 0.8 秒。':'維持油門，朝彎內按住方向＋手煞車，讓車尾滑出；依彎度調整持鍵時間。']:
      !t.control?['03 / 維持',cometDemo?'A 合計按約 0.8 秒後放開；續按 W＋Space，等下方進度達 2.0 秒。':'車頭轉入彎後放鬆方向，維持油門與手煞車；看下方進度，側滑不足再補方向。']:
      !t.exit?['04 / 出彎',cometDemo?'維持已達標：放開 W／Space，按 S 約 0.8 秒後放開，讓車身回穩。':'放開手煞車並收油，必要時輕煞或反打；車身回穩後分數入袋。']:
      !t.recover?['05 / 回正','按 R（觸控：回正）回到合法點，會增加 2 秒並清連段。']:
      ['全部步驟已完成','可繼續練習，或停車等倒數結束，再進入雙圈挑戰。'];
    const cleanSeconds=Number.isFinite(race.cleanDriftTime)?Math.max(0,race.cleanDriftTime):0;
    const progress=Math.floor(Math.min(2,cleanSeconds)*10)/10;
    const progressState=t.control?'✓ 兩秒任務已完成':race.drifting?'維持中':cleanSeconds>0?'等待側滑':'從入彎開始';
    const tutorialHTML=`<b>${hint[0]}</b>${hint[1]}<br><span role="progressbar" aria-label="當段乾淨漂移秒數" aria-valuemin="0" aria-valuemax="2" aria-valuenow="${progress}">當段乾淨漂移 ${progress.toFixed(1)} / 2.0 秒</span> · ${progressState}<br><span class="subtle">${Object.values(t).filter(Boolean).length} / 5 完成 · 回正會清除當段進度</span>`;
    const tutorialNode=$('#tutorial-hint');if(tutorialNode.innerHTML!==tutorialHTML)tutorialNode.innerHTML=tutorialHTML;
  }
  drawMap();
}
let minimapCache=null;
function drawMap(){
  const c=minimapCache?.canvas||$('#minimap'),t=race.track,pts=t.points;
  if(!minimapCache){const route=document.createElement('canvas'),legend=document.createElement('canvas');minimapCache={canvas:c,context:c.getContext('2d'),route,routeContext:route.getContext('2d'),legend,legendContext:legend.getContext('2d')};}
  const cache=minimapCache;
  if(cache.track!==t||cache.points!==pts||cache.width!==c.width||cache.height!==c.height){
    cache.track=t;cache.points=pts;cache.width=c.width;cache.height=c.height;
    for(const layer of [cache.route,cache.legend]){if(layer.width!==c.width)layer.width=c.width;if(layer.height!==c.height)layer.height=c.height;layer.getContext('2d').clearRect(0,0,c.width,c.height);}
    const xs=pts.map(p=>p.x),zs=pts.map(p=>p.z);cache.x0=Math.min(...xs);cache.z0=Math.min(...zs);cache.scale=Math.min(145/(Math.max(...xs)-cache.x0),115/(Math.max(...zs)-cache.z0));
    const route=cache.routeContext;route.lineWidth=3;route.strokeStyle='#5d7687';route.beginPath();
    pts.forEach((p,i)=>{if(i%8!==0)return;const x=17+(p.x-cache.x0)*cache.scale,y=17+(p.z-cache.z0)*cache.scale;if(i===0)route.moveTo(x,y);else route.lineTo(x,y);});route.closePath();route.stroke();
    // 圖例改為相鄰DOM文字，避免canvas縮字；透明legend層與其餘地圖繪製契約保留。
  }
  const ctx=cache.context,xy=p=>[17+(p.x-cache.x0)*cache.scale,17+(p.z-cache.z0)*cache.scale];
  ctx.clearRect(0,0,c.width,c.height);ctx.drawImage(cache.route,0,0);
  const cp=sampleTrack(t,t.checkpoints[race.nextCheckpoint]),a=xy(cp);ctx.fillStyle='#ffd77e';ctx.fillRect(a[0]-3,a[1]-3,6,6);
  const b=xy(race);ctx.fillStyle='#b5ffd9';ctx.beginPath();ctx.arc(...b,4,0,Math.PI*2);ctx.fill();
  // Keep the original route -> checkpoint/car -> legend paint order, including off-road markers.
  ctx.drawImage(cache.legend,0,0);
}
function download(data,name){const blob=new Blob([JSON.stringify(data,null,2)],{type:'application/json'}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);}
$('#track-options').addEventListener('click',e=>{const b=e.target.closest('[data-track]');if(!b)return;trackId=b.dataset.track;commitSettings({trackId});refreshMenu();showPreview();audio.click();});
$('#car-options').addEventListener('click',e=>{const b=e.target.closest('[data-car]');if(!b)return;carId=b.dataset.car;commitSettings({carId});refreshMenu();showPreview();audio.click();});
$('#mode-options').addEventListener('click',e=>{const b=e.target.closest('[data-mode]');if(!b)return;mode=b.dataset.mode;commitSettings({mode});refreshMenu();audio.click();});
$('#launch').onclick=()=>startRace();$('#tutorial-button').onclick=()=>startRace('tutorial');$('#customize-button').onclick=customize;
$('#settings-button').onclick=showSettings;$('#help-button').onclick=help;$('#pause-button').onclick=()=>pauseRace();$('#touch-reset').onclick=recover;
$('#close-modal').onclick=()=>{if(phase==='paused')resumeRace();else closeModal();};
$('#modal').addEventListener('cancel',e=>{e.preventDefault();if(phase==='result')return;if(phase==='paused')resumeRace();else closeModal();});
$('#modal-content').addEventListener('input',e=>{const key=e.target.dataset.setting;if(!key)return;const value=e.target.type==='checkbox'?e.target.checked:e.target.tagName==='SELECT'?e.target.value:Number(e.target.value);const patch=key==='sensitivity'?{sensitivity:Number(value),sensitivityByCar:{...settings.sensitivityByCar,[carId]:Number(value)}}:{[key]:value};commitSettings(patch);if(key==='sensitivity'&&race)race.sensitivity=Number(value);});
$('#modal-content').addEventListener('click',e=>{
  const b=e.target.closest('button');if(!b)return;audio.unlock();audio.click();
  if(b.dataset.color){commitSettings({colorId:b.dataset.color});showPreview();customize();return;}if(b.dataset.decal){commitSettings({decalId:b.dataset.decal});showPreview();customize();return;}
  switch(b.dataset.action){case'resume':resumeRace();break;case'close':if(phase==='paused')resumeRace();else closeModal();break;case'retry':startRace(race?.mode||mode);break;case'garage':menu();break;case'tutorial':startRace('tutorial');break;case'export':download({gameId:'neon-drift',buildId:BUILD,physicsVersion:PHYSICS_VERSION,save},'neon-drift-local-save.json');toast('紀錄已匯出；尚未傳送到任何服務。');break;case'show-diagnostics':$('#diagnostics-json').hidden=false;$('#diagnostics-json').textContent=JSON.stringify(diagnosticsSummary(),null,2);break;case'export-diagnostics':download(diagnostics(),'neon-drift-diagnostics.json');break;case'confirm-reset':openModal('確定清除本機紀錄？','<p>這會刪除本機最佳成績、幽靈車與已解鎖外觀。可先返回設定匯出。此操作無法復原。</p><div class="modal-buttons"><button data-action="settings">保留紀錄</button><button data-action="delete-save">清除所有本機紀錄</button></div>','confirm');break;case'settings':showSettings();break;case'delete-save':try{localStorage.removeItem(SAVE_KEY);localStorage.removeItem(BACKUP_KEY);}catch{toast('儲存存取被阻擋，無法清除。');return;}save=loadSave();settings={...save.settings};trackId=settings.trackId||'harbor';carId=settings.carId||'comet';mode='time';menu();toast('本機紀錄已清除。');break;}
});
addEventListener('blur',()=>{input.clear();if(phase==='running')pauseRace(true,'window-blur');else audio.pause();});
document.addEventListener('visibilitychange',()=>{if(document.hidden){input.clear();if(phase==='running')pauseRace(true,'document-hidden');else audio.pause();}});
addEventListener('resize',()=>renderer?.resize());
$('#world').addEventListener('webglcontextlost',e=>{e.preventDefault();pauseRace(false,'webgl-context-lost');openModal('顯示裝置暫時中斷','<p>本局已暫停。請重新載入遊戲；已合法結算的紀錄仍保留。若反覆發生，可在設定降低畫質。</p><div class="modal-buttons"><button onclick="location.reload()">重新載入</button></div>','error');bridge.error('WebGL context lost. Reload to restore rendering.');});
function frame(now){
  const callbackStart=performance.now(),phaseAtStart=phase,rawDt=Math.max(0,(now-lastTime)/1000),dt=Math.min(.1,rawDt);
  const outsideMs=previousCallbackEnd===null?0:Math.max(0,callbackStart-previousCallbackEnd);lastTime=now;frameSeq++;
  let physicsMs=0,renderMs=0,audioMs=0,hudMs=0,finishMs=0;
  if(renderer&&race){
    if(phase==='running'){
      const physicsStart=performance.now();
      if(rawDt>1){const rs=renderer.summary,gap={ms:rawDt*1000,countdown:race.countdown,elapsed:race.elapsed,visibility:document.visibilityState,hasFocus:document.hasFocus(),renderer:{adapter:rs.adapter,quality:rs.quality,drawingBufferSize:rs.drawingBufferSize,resizeCount:rs.resizeCount,renderSubmitMs:rs.renderSubmitMs,renderSubmitMaxMs:rs.renderSubmitMaxMs},at:Date.now()};frameGaps.push(gap);if(frameGaps.length>60)frameGaps.shift();pauseRace(true,'frame-gap',{frameGapMs:gap.ms});toast('畫面停頓超過 1 秒，比賽已自動暫停。可降低畫質後繼續。');}
      else{let remaining=rawDt;const controls=input.sample();while(remaining>1e-9&&!race.finished){const chunk=Math.min(.2,remaining);stepRace(race,controls,chunk);remaining-=chunk;}}
      physicsMs=performance.now()-physicsStart;
      if(phase==='running'&&rawDt>0&&race.countdown<=0){frameSamples.push(rawDt*1000);runFrames++;}
      if(race.finished){const finishStart=performance.now();finishRace();finishMs=performance.now()-finishStart;}
    }
    race.preview=phase==='menu';renderContext.phase=phase;renderContext.frameSeq=frameSeq;renderContext.elapsed=race.elapsed;renderContext.countdown=race.countdown;
    const renderStart=performance.now();renderer.render(race,phase==='menu'?null:getGhostPose(race.ghost,race.ghostTime),dt,renderContext);renderMs=performance.now()-renderStart;
    const audioStart=performance.now();audio.update(race,phase==='running'&&race.countdown===0);audioMs=performance.now()-audioStart;
    if(phase!=='menu'&&now-lastHud>60){const hudStart=performance.now();updateHUD();lastHud=now;hudMs=performance.now()-hudStart;}
  }
  const callbackEnd=performance.now();
  if(profileActive&&phaseAtStart==='running'){
    profileRow[0]=frameSeq;profileRow[1]=now;profileRow[2]=rawDt*1000;profileRow[3]=Math.max(0,callbackStart-now);profileRow[4]=physicsMs;profileRow[5]=renderMs;profileRow[6]=audioMs;profileRow[7]=hudMs;profileRow[8]=finishMs;profileRow[9]=callbackEnd-callbackStart;profileRow[10]=outsideMs;profileRow[11]=race?.elapsed||0;profileRow[12]=FRAME_PHASE[phaseAtStart];profiler.record(profileRow);
    if(race?.finished){profileEndedAt=callbackEnd;observedRun.end=profileEndedAt;profileCompleted=true;profileActive=false;}
  }
  previousCallbackEnd=performance.now();requestAnimationFrame(frame);
}
try{renderer=createRenderer($('#world'),settings);applySettings();refreshMenu();showPreview();$('#boot').hidden=true;$('#garage').hidden=false;$('#build-label').textContent=`${VERSION} / ${BUILD.split('-').at(-1)}`;bridge.ready();if(save.notice)toast(save.notice);lastTime=performance.now();requestAnimationFrame(frame);}
catch(error){$('#boot').innerHTML='<b>無法啟動 3D 街道</b><span>需要支援 WebGL 2 的瀏覽器。請開啟硬體加速或重新載入。</span><button id="retry-load">重新載入</button>';$('#retry-load').onclick=()=>location.reload();bridge.error(error.message);console.error(error);}
// Read-only diagnostics: supports reproducible review without granting game-state mutation.
Object.defineProperty(window,'neonDrift',{value:Object.freeze({snapshot:()=>({buildId:BUILD,version:VERSION,phase,mode:race?.mode,trackId,carId,elapsed:race?.elapsed,s:race?.s,speed:race?.speed,lateral:race?.lateral,lap:race?.lap,checkpoint:race?.nextCheckpoint,score:race?.score,pendingScore:race?.pendingScore,drifting:race?.drifting,result:race?.result,tutorial:race?.tutorial,renderer:renderer?.stats,storageNotice:save.notice}),performance:()=>({buildId:BUILD,frames:frameSamples.snapshot(),count:runFrames,renderer:renderer?.stats}),events:()=>structuredClone(events)})});
