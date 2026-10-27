import { SceneView } from './scene.js';
import { WarningCueUI } from './warning-cue-ui.js'; // 一般玩家的公開提示文字與形狀。
import { createRun, step, chooseReward, enterRoom, checkpoint, restoreRun, startTutorial, chooseStory } from './rules.js';
import { ROOMS, ROUTES, TALENTS, STARTING_TALENTS, CHALLENGES, STORIES, DIFFICULTIES, ENEMIES } from './content.js';
import { SaveStore, settleRun } from './storage.js';
import { Controls } from './input.js';
import { Soundscape } from './audio.js';
import { getGameBridge } from './bridge.js';

const BUILD='hollow-crown-render-sizing-20261027-04', VERSION='1.0.0-rc.10-render.4'; // 只消除品質與尺寸重複提交的新候選，不回填run75原因。
const $=id=>document.getElementById(id), esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
let store;try{store=new SaveStore();}catch{store=new SaveStore({getItem(){throw Error('blocked');},setItem(){throw Error('blocked');}});}
const profile=store.load();
if(matchMedia('(prefers-reduced-motion: reduce)').matches)profile.settings.reducedMotion=true;
let run=null, runId=null, credited={rooms:0,parries:0,flawless:0}, paused=false, overlay='camp', returnTo='camp', replaceReward=null, toastUntil=0, lastPhase='', lastRoom='', disposed=false;
let touchActive=matchMedia('(pointer: coarse)').matches;
let assetNotice='';
let config={seed:Math.floor(Date.now()%2147483647),route:'ash',startTalent:'fleet-ash',challenge:'normal',difficulty:'pilgrim'};
const camp={phase:'camp',room:ROOMS[0],player:{x:0,z:1,angle:Math.PI*.15,hp:100,maxHp:100,action:'idle',skin:profile.selectedSkin},enemies:[],effects:[],projectiles:[],time:0,settings:profile.settings};
const timing={frames:[],started:performance.now(),loaded:null};
const sound=new Soundscape(profile.settings,toast);
let view,controls; // 原遊戲控制保持不變。
const warningCueUI=new WarningCueUI(document,window); // 僅一般可見DOM，沒有新window診斷接口。
function clearWarningCue(){warningCueUI.clear();view?.warningCue.invalidate();} // 同步清舊語義及receipt，恢復等下一幀。
const bridge=getGameBridge(command=>{
  if(command==='host:start'){if(!run){if(profile.checkpoint)resumeSave();else begin(!profile.tutorialDone);}else if(paused)resume();}
  if(command==='host:pause')pause();
  if(command==='host:resume')resume();
  if(command==='host:restart')begin(false);
});

function toast(message){clearWarningCue();$('toast').textContent=message;$('toast').hidden=false;toastUntil=performance.now()+3300;} // 僅新增公開提示的清除、版位或單教學呈現接線；原玩法流程不變。
function persist(){store.save(profile);notice();}
function notice(){clearWarningCue();const text=[store.notice,assetNotice].filter(Boolean).join(' ');$('save-notice').textContent=text;$('save-notice').hidden=!text;} // 僅新增公開提示的清除、版位或單教學呈現接線；原玩法流程不變。
function safeCheckpoint(){
  if(!run||run.tutorial||run.phase==='result')return;
  try{profile.checkpoint={run:checkpoint(run),runId,config:{...config},credited:{...credited}};persist();}catch{toast('這一刻無法建立存檔。房間入口存檔仍保留。');}
}
function unlockProgress(){
  if(!run||run.tutorial)return;
  const s=run.stats||{},rooms=Number(s.roomsCleared??s.rooms??run.roomIndex??0),parries=Number(s.parries??0),flawless=Number(s.flawlessRooms??s.flawless??0);
  profile.totalRooms+=Math.max(0,rooms-credited.rooms); profile.totalParries+=Math.max(0,parries-credited.parries);profile.flawlessRooms+=Math.max(0,flawless-credited.flawless);
  credited={rooms:Math.max(rooms,credited.rooms),parries:Math.max(parries,credited.parries),flawless:Math.max(flawless,credited.flawless)};
  const conditions={room:profile.totalRooms>0,parry:profile.totalParries>=3,flawless:profile.flawlessRooms>0,win:profile.wins>0,default:true};
  for(const t of STARTING_TALENTS)if(conditions[t.requirement]&&!profile.unlocked.includes(t.id)){profile.unlocked.push(t.id);toast(`起始天賦已解鎖：${t.name}`);}
}
function panelHeader(kicker,title,close='camp'){return `<div class="panel-header"><div><span class="eyebrow">${kicker}</span><h2>${title}</h2></div><button data-action="${close}" class="quiet compact">返回</button></div>`;}
function option(items,value){return items.map(t=>`<option value="${esc(t.id)}" ${t.id===value?'selected':''}>${esc(t.name)}</option>`).join('');}
function setOverlay(name,{focus=true}={}){clearWarningCue(); // overlay改動之前先清舊警示。
  overlay=name;flushInput();$('overlay').className=name==='camp'?'camp':'';
  $('overlay').innerHTML=renderPanel(name);
  if(name&&focus)requestAnimationFrame(()=>{const el=$('overlay').querySelector('[autofocus],button.primary,button,input,select');el?.focus({preventScroll:true});});
  updateVisibility();updateConfigNote();updateHud();
}
function renderPanel(name){
  if(!name)return '';
  if(name==='camp')return `<section class="panel camp-panel"><div class="brand-mark" aria-hidden="true"><span>♜</span></div><span class="eyebrow">STTEAK ORIGINAL · HOLLOW CROWN</span><h1>餘燼之冠</h1><p class="intro">王座早已空了，誓言仍未熄滅。<br>握緊長槍。<em>讀招、讓位，讓最後一刺回答。</em></p><div class="config"><label>王座路線<select data-config="route">${option(ROUTES,config.route)}</select></label><label>戰鬥難度<select data-config="difficulty">${option(DIFFICULTIES,config.difficulty)}</select></label><label>起始餘燼<select data-config="startTalent">${option(STARTING_TALENTS.filter(t=>profile.unlocked.includes(t.id)),config.startTalent)}</select></label><label>誓約挑戰<select data-config="challenge">${option(CHALLENGES,config.challenge)}</select></label></div><p class="subnote" id="config-note"></p><div class="menu-main">${profile.checkpoint?'<button class="primary" data-action="continue">繼續遠征</button><button data-action="new-confirm">新一輪</button>':`<button class="primary" data-action="${profile.tutorialDone?'begin':'tutorial'}">${profile.tutorialDone?'踏入灰燼':'開始 · 學習守誓'}</button>${!profile.tutorialDone?'<button data-action="begin">直接遠征</button>':''}`}</div><div class="menu-links"><button data-action="tutorial">教學練習</button><button data-action="help">操作手冊</button><button data-action="settings">設定</button><button data-action="progress">守誓紀錄</button></div><div class="camp-stat"><div><strong>${profile.wins}</strong><small>歸還王冠</small></div><div><strong>${STARTING_TALENTS.filter(t=>profile.unlocked.includes(t.id)).length} / 6</strong><small>起始餘燼</small></div><div><strong>4 + 1</strong><small>戰鬥房／王座</small></div></div><p class="subnote">本機保存。未完房重載回到同一房間入口。<br>手機可用自動瞄準搭配移動、刺擊與防禦。${profile.tutorialDone?'':'教學可反覆練習，失誤不會扣除進度。'}</p></section>`;
  if(name==='pause')return `<section class="panel" style="max-width:550px">${panelHeader('A MOMENT OF SILENCE','火尚未熄','resume')}<p class="lead">戰鬥、預備動作與音訊均已暫停。<br>離開後可從這間房的入口重新開始。</p><div class="panel-actions"><button class="primary" data-action="resume">繼續守誓</button><button data-action="help">操作手冊</button><button data-action="settings">設定</button></div><div class="panel-actions"><button data-action="restart-confirm">重開本輪</button><button data-action="leave-confirm">回到營地</button></div></section>`;
  if(name==='settings')return `<section class="panel">${panelHeader('OPTIONS','調整旅途',returnTo)}<div class="settings-grid"><div class="setting"><label>音樂 <span>${Math.round(profile.settings.music*100)}%</span><input aria-label="音樂音量" type="range" data-setting="music" min="0" max="1" step=".05" value="${profile.settings.music}"></label></div><div class="setting"><label>音效 <span>${Math.round(profile.settings.effects*100)}%</span><input aria-label="音效音量" type="range" data-setting="effects" min="0" max="1" step=".05" value="${profile.settings.effects}"></label></div><div class="setting"><label>畫面品質<select data-setting="quality"><option value="high" ${profile.settings.quality==='high'?'selected':''}>高 · 陰影與完整幾何</option><option value="low" ${profile.settings.quality==='low'?'selected':''}>低 · 降低像素密度與陰影</option></select></label></div><div class="setting"><label>教學精準格擋窗口<select data-setting="practiceWindow"><option value="0.18" ${profile.settings.practiceWindow===.18?'selected':''}>精準 · 180ms</option><option value="0.32" ${profile.settings.practiceWindow===.32?'selected':''}>寬容 · 320ms</option><option value="0.5" ${profile.settings.practiceWindow===.5?'selected':''}>練習 · 500ms</option></select></label></div>${[['autoAim','自動鎖定近敵（鍵盤／觸控推薦）'],['reducedMotion','減少動態'],['flash','命中閃光'],['shake','鏡頭微震']].map(([key,label])=>`<div class="setting toggle"><label>${label}<input type="checkbox" data-setting="${key}" ${profile.settings[key]?'checked':''}></label></div>`).join('')}</div><p class="subnote">偏好立即保存。危險同時使用形狀、動作與文字預警。減少動態會關閉微震與環境漂浮動畫。</p><div class="panel-actions"><button data-action="mute">全部靜音</button><button data-action="export-save">匯出存檔</button><button data-action="reload">重新載入頁面</button></div></section>`;
  if(name==='help')return `<section class="panel">${panelHeader('FIELD NOTES','守誓者手冊',returnTo)}<div class="help-grid"><section><h3>四個房間，一座王座</h3><p>清除每房敵人，選擇一份餘燼或恢復生命，再選下一房的風險。完成四房後迎戰路線 Boss。生命歸零結算，可保留側向解鎖後再試。</p></section><section><h3>長槍的距離</h3><p><span class="key">WASD</span> 或方向鍵移動。滑鼠指向地面瞄準；關閉自動鎖定可完全手動。<span class="key">J</span>／左鍵短按輕刺，長按後放開蓄力刺。普通輕刺不消耗精力。</p></section><section><h3>讓出位置，再還擊</h3><p><span class="key">Space</span>／<span class="key">L</span> 閃避；<span class="key">K</span>／右鍵格擋。敵人落招前才按格擋可精準反擊。持續格擋仍會承受少量傷害。先看地面預警，再用距離躲開。</p></section><section><h3>觸控與可讀性</h3><p>左搖桿移動，右搖桿手動瞄準；預設自動鎖定可省去瞄準手指。右側有刺擊、格擋、閃避。短按刺擊、長按蓄力。放開或取消觸控會立即解除輸入。</p></section><section><h3>盾與外環</h3><p>盾衛正面防住普通刺擊。繞到側背或蓄力破盾。圓形預警離開圓心，環形預警靠近安全內圈，直線預警橫向移開。火圈的空心部分是安全區。</p></section><section><h3>存檔與重玩</h3><p><span class="key">Esc</span> 暫停。切到背景自動暫停，回來後需按繼續。營地與房間入口保存；未完房重載會回到相同入口。十二天賦最多裝備四個。換路線、流派或同種子挑戰，沒有永久血量堆疊。</p></section></div><div class="panel-actions"><button class="primary" data-action="${returnTo}">明白了</button></div></section>`;
  if(name==='progress')return `<section class="panel">${panelHeader('OATHS REMEMBERED','守誓紀錄')}<div class="results"><div><strong>${profile.runs}</strong><small>結算遠征</small></div><div><strong>${profile.wins}</strong><small>成功通關</small></div><div><strong>${profile.totalParries}</strong><small>精準反擊</small></div><div><strong>${profile.flawlessRooms}</strong><small>無傷房間</small></div></div><div class="unlock-list">${STARTING_TALENTS.map(t=>`<div class="unlock-item ${profile.unlocked.includes(t.id)?'':'locked'}"><span class="eyebrow">${profile.unlocked.includes(t.id)?'已解鎖':esc(t.unlock)}</span><h3>${esc(t.name)}</h3><p>${esc(t.description)}</p></div>`).join('')}</div><hr class="hairline"><label>盔甲外觀<select data-setting="skin"><option value="ivory">象牙守衛</option>${profile.skins.includes('cinder')?`<option value="cinder" ${profile.selectedSkin==='cinder'?'selected':''}>燼紅守衛</option>`:''}</select></label><p class="subnote">燼紅外觀：完成任一路線。外觀不改變能力。</p><label class="subnote">自訂重玩種子<input type="number" data-config="seed" min="1" max="2147483647" value="${config.seed}"></label><p class="subnote">同種子保留房間與獎勵規則。變更風險或裝備仍會改變策略。</p></section>`;
  if(name==='reward'){
    const choices=run?.rewardChoices||[],pending=choices.find(c=>c.id===replaceReward);
    if(replaceReward)return `<section class="panel">${panelHeader('FOUR EMBERS','選擇要替換的餘燼','cancel-replace')}<p class="lead">最多攜帶四個天賦。替換後立即生效。${pending?.healAmount?`確認替換後恢復 ${pending.healAmount} 生命。`:''}</p><div class="choice-grid">${(run.talents||run.player.talents||[]).map(id=>{const t=TALENTS.find(t=>t.id===id);return `<button class="choice" data-action="replace" data-id="${esc(id)}"><strong>${esc(t?.name||id)}</strong><p>${esc(t?.description)}</p></button>`;}).join('')}</div></section>`;
    return `<section class="panel">${panelHeader('A ROOM FALLS SILENT','將餘火帶走','pause')}<p class="lead">選擇一份餘燼，或休憩恢復更多生命。每房只能選一次，所有選擇都補滿能量。</p><div class="choice-grid">${choices.map(c=>`<button class="choice" data-action="reward" data-id="${esc(c.id)}"><span class="tag">${c.kind==='heal'?'休憩':schoolName(TALENTS.find(t=>t.id===c.id)?.school)}</span><strong>${esc(c.name)}</strong><p>${esc(c.description)}</p>${c.healAmount?`<p>附帶恢復 ${c.healAmount} 生命</p>`:''}</button>`).join('')}</div><p class="subnote">目前生命 ${Math.ceil(run.player.hp)} / ${run.player.maxHp}。選擇後保存；相同存檔重載不會重抽獎勵。</p></section>`;
  }
  if(name==='route'){
    const story=run.story;
    const recorded=run.stories||run.storyChoices||[];
    const selected=Array.isArray(recorded)?recorded.some(x=>x.storyId===story?.id||x.id===story?.id||x.story===story?.id):recorded[story?.id];
    return `<section class="panel">${panelHeader('THE ROAD TO THE THRONE',run.roomIndex>=3?'王座已近':'選擇下一道誓言','pause')}<p class="lead">險路第二波多 1 名敵人，敵人生命 +15%；天賦附帶回復由 12 提升至 18，休憩回復由 32 提升至 45。</p><div class="choice-grid two">${(run.routeChoices||[]).map(c=>`<button class="choice" data-action="room" data-id="${esc(c.roomId)}" data-risk="${esc(c.risk)}"><span class="tag">${c.risk==='perilous'?'險路 · 更多敵人':'安穩 · 標準戰鬥'}</span><strong>${esc(c.name)}</strong><p>${esc(c.description)}</p></button>`).join('')}</div>${story&&!selected?`<section class="story"><span class="eyebrow">途中拾得 · ${esc(story.title)}</span><p>${esc(story.text)}</p>${story.choices.map(c=>`<button data-action="story" data-id="${esc(c.id)}">${esc(c.name)}</button>`).join('')}</section>`:''}<p class="subnote">選路後建立房間入口存檔。當前路線：${ROUTES.find(r=>r.id===run.route)?.name||ROUTES.find(r=>r.id===config.route)?.name}。</p></section>`;
  }
  if(name==='result'){
    const r=run?.result||{},tutorial=!!run?.tutorial;
    const won=tutorial?run.tutorial.done:r.won;
    const talents=r.talents||run?.talents||[];
    return `<section class="panel">${panelHeader(tutorial?'THE FIRST OATH':won?'THE CROWN RETURNS':'AN OATH, UNFINISHED',tutorial?'你已學會守誓':won?'王冠歸於餘燼':'火熄了，誓言還在','camp')}<p class="lead">${esc(tutorial?'你已完成移動、輕刺、閃避與精準格擋。正式遠征有四個房間與一位王座守衛。':r.ending||(won?'你拾起長槍走入晨光，將名字與故事帶回營地。':'下一輪試著保持長槍距離，在預警落下前側移。'))}</p>${!won?`<p class="result-reason">最後受擊：${esc(sourceName(r.reason)||'生命耗盡')}</p>`:''}<div class="results"><div><strong>${(Array.isArray(r.rooms)?r.rooms.filter(x=>x.id!=='crown-arena').length:r.rooms)??run?.stats?.rooms??0} / 4</strong><small>普通房完成</small></div><div><strong>${r.parries??run?.stats?.parries??0}</strong><small>成功反擊</small></div><div><strong>${r.hits??run?.stats?.hits??0}</strong><small>受擊次數</small></div><div><strong>${formatTime(r.time??run?.time??0)}</strong><small>本輪時間</small></div></div><div class="result-loadout">${talents.map(id=>`<span class="chip">${esc(TALENTS.find(t=>t.id===id)?.name||id)}</span>`).join('')}</div><p class="subnote">${tutorial?'練習不結算長期獎勵。':`種子 ${esc(r.seed??config.seed)} · ${esc(ROUTES.find(x=>x.id===(r.route||config.route))?.name)} · ${esc(CHALLENGES.find(x=>x.id===config.challenge)?.name)}`}<br>${!tutorial?`傷害來源：${Object.entries(r.damageSources||run.stats?.damageSources||{}).map(([id,n])=>esc((sourceName(id))+' '+Math.round(n))).join(' · ')||'本輪無受傷'}。`:'可在營地反覆練習，或調整練習窗口。'}</p><div class="panel-actions"><button class="primary" data-action="${tutorial?'begin':'replay'}">${tutorial?'開始正式遠征':'相同種子再試'}</button><button data-action="new">${tutorial?'換條路線':'換一輪新旅途'}</button></div></section>`;
  }
  if(name==='confirm')return `<section class="panel" style="max-width:500px">${panelHeader('A NEW OATH','離開目前旅途？','cancel-confirm')}<p class="lead">${confirmAction==='camp'?'目前房間的入口存檔會保留，下次可以繼續。':'目前這輪進度將被新遠征取代；已解鎖內容與設定保留。'}</p><div class="panel-actions"><button data-action="cancel-confirm">留下</button><button class="primary" data-action="confirm">${confirmAction==='camp'?'回到營地':'開始新旅途'}</button></div></section>`;
  return '';
}
function schoolName(s){return {mobility:'機動',counter:'反擊',burn:'燃燒'}[s]||'回復／餘燼';}
function sourceName(id){return ENEMIES[id]?.name||Object.values(ENEMIES).flatMap(x=>x.moves||[]).find(m=>m.id===id)?.name||id||'敵人';}
function updateConfigNote(){const el=document.getElementById('config-note');if(el)el.textContent=[STARTING_TALENTS.find(t=>t.id===config.startTalent)?.description,DIFFICULTIES.find(t=>t.id===config.difficulty)?.description,CHALLENGES.find(t=>t.id===config.challenge)?.description].join(' ');}
function formatTime(time){return `${Math.floor(time/60)}:${String(Math.floor(time%60)).padStart(2,'0')}`;}
let confirmAction='begin',confirmReturn='camp';
function flushInput(){controls?.clear();if(run){run.pendingInput=null;run.player.heldTime=0;run.player.charge=0;run.player.wasBlocking=false;run.player.blockAge=0;if(run.player.action==='block'||(run.player.action==='charge'&&!run.player.attack))run.player.action='idle';}}
function showConfirm(action){confirmAction=action;confirmReturn=overlay||'pause';pause(false);setOverlay('confirm');}
function begin(tutorial=false){
  controls?.clear();run=tutorial?startTutorial({practiceWindow:profile.settings.practiceWindow}):createRun({...config});runId=crypto.randomUUID();credited={rooms:0,parries:0,flawless:0};
  run.settings=profile.settings;run.player.skin=profile.selectedSkin;paused=false;lastPhase='';lastRoom='';replaceReward=null;
  if(!tutorial)safeCheckpoint();setOverlay('');sound.unlock();sound.setTheme('combat');bridge.state('running');$('world').focus();syncPhase();
}
function resumeSave(){
  try{ // 當局資料與已計入計數須一起驗證，避免壞metadata洗掉原有累積進度。
    const cp=profile.checkpoint;if(!cp?.run)throw Error();run=restoreRun(cp.run);if(!run?.player)throw Error(); // 先沿用正式run schema損壞降級。
    const savedCredit=cp.credited===undefined?{}:cp.credited, creditCaps={rooms:run.stats.rooms,parries:run.stats.parries,flawless:run.stats.flawlessRooms}; // 歷史未提供欄位仍用零預設，計數上限來自合法當局。
    if(!savedCredit||typeof savedCredit!=='object'||Array.isArray(savedCredit)||Object.keys(creditCaps).some(key=>savedCredit[key]!==undefined&&(!Number.isSafeInteger(savedCredit[key])||savedCredit[key]<0||savedCredit[key]>creditCaps[key])))throw Error(); // 錯型、負數、非整數或超出當局的credited都不可進入算術。
    runId=cp.runId;config={seed:run.seed,route:run.route,startTalent:run.startTalent,challenge:run.challenge,difficulty:run.difficulty};credited={rooms:savedCredit.rooms??0,parries:savedCredit.parries??0,flawless:savedCredit.flawless??0}; // 再玩配置只由已驗證當局還原；wrapper的null種子或錯路線不可偷偷改變相同種子再試，credited仍只取已驗證三欄。
    run.settings=profile.settings;run.player.skin=profile.selectedSkin;lastPhase='';lastRoom='';paused=false;setOverlay('');sound.unlock();bridge.state('running');syncPhase();toast('已恢復同一房間入口。'); // 通過完整驗證後才更新進度與UI。
  } // 壞wrapper與壞run同走下方既有保留解鎖及設定的安全恢復。
  catch{profile.checkpoint=null;persist();run=null;setOverlay('camp');toast('房間存檔版本不相容或損壞；解鎖與設定已保留，請開始新旅途。');}
}
function pause(show=true){clearWarningCue(); // 僅新增公開提示的清除、版位或單教學呈現接線；原玩法流程不變。
  if(!run||run.phase==='result')return;paused=true;flushInput();sound.pause();bridge.state('paused');if(show)setOverlay('pause');
}
function resume(){
  if(!run)return;paused=false;controls?.clear();sound.resume();bridge.state('running');lastPhase='';setOverlay('');syncPhase();$('world').focus();
}
function goCamp(){if(run&&run.phase!=='result'&&!run.tutorial)safeCheckpoint();run=null;paused=false;setOverlay('camp');sound.setTheme('camp');sound.resume();bridge.state('ready');}
function syncPhase(){
  if(!run)return;
  const phase=run.phase;if(phase===lastPhase)return;lastPhase=phase;
  if(phase==='reward'){unlockProgress();safeCheckpoint();setOverlay('reward');sound.setTheme('camp');}
  if(phase==='route'){safeCheckpoint();setOverlay('route');sound.setTheme('camp');}
  if(phase==='combat'||phase==='tutorial'){setOverlay('');sound.setTheme(run.roomIndex>=4?'boss':'combat');}
  if(phase==='result'){
    controls.clear();if(run.tutorial){if(run.tutorial.done)profile.tutorialDone=true;}
    else{unlockProgress();settleRun(profile,runId,{...run.result,time:run.time});unlockProgress();}
    persist();setOverlay('result');sound.setTheme('camp');bridge.state('paused');
  }
}
function updateVisibility(){clearWarningCue();const playing=!!run&&run.phase!=='result';$('hud').hidden=!playing;$('loadout').hidden=!playing;$('combat-tip').hidden=!playing||!!overlay;$('touch-controls').hidden=!playing||!!overlay||!touchActive;$('tutorial').hidden=!run?.tutorial||!!overlay||run.phase==='result';if(overlay)$('boss-hud').hidden=true;} // 僅新增公開提示的清除、版位或單教學呈現接線；原玩法流程不變。
function updateHud(){if(!run)return;const p=run.player;$('hp-text').textContent=`${Math.ceil(p.hp)} / ${p.maxHp}`;$('hp-fill').style.width=`${100*Math.max(0,p.hp)/p.maxHp}%`;$('energy-fill').style.width=`${100*p.energy/p.maxEnergy}%`;$('energy-text').textContent=Math.floor(p.energy);$('room-name').textContent=run.room.name;$('chapter').textContent=run.tutorial?'守誓者的試煉':run.roomIndex>=4?'最後一道誓言':`第 ${Number(run.roomIndex)+1} 房 / 4`;
  const alive=run.enemies.filter(e=>e.hp>0);$('room-status').textContent=run.tutorial?'跟隨下方引導，失誤可繼續練習':`${alive.length} 位敵人 · ${formatTime(run.time)} · ${profile.settings.autoAim?'自動鎖定':'手動瞄準'}`;
  const list=(run.talents||p.talents||[]).join(',');if($('loadout').dataset.ids!==list){$('loadout').dataset.ids=list;$('loadout').innerHTML=list.split(',').filter(Boolean).map(id=>`<span class="chip">${esc(TALENTS.find(t=>t.id===id)?.name||id)}</span>`).join('');}
  if(run.tutorial){$('tutorial-copy').innerHTML=`<strong>試煉 ${Number(run.tutorial.step)+1} / 5</strong>　${esc(run.tutorial.text)}<small>J／左鍵刺擊 · K／右鍵格擋 · Space 閃避 · Esc 設定練習窗口</small>`;} // 僅新增公開提示的清除、版位或單教學呈現接線；原玩法流程不變。
  const boss=alive.find(e=>ENEMIES[e.type]?.boss);$('boss-hud').hidden=!boss||!!overlay;if(boss){$('boss-name').textContent=`${ENEMIES[boss.type]?.name} · 第 ${boss.phase||1} 階段`;$('boss-fill').style.width=`${boss.hp/boss.maxHp*100}%`;$('boss-move').textContent=boss.state==='telegraph'?`⚠ ${boss.attack?.name||'即將出招'} — 讓出危險區`:boss.state==='recover'?'破綻 · 現在刺擊':'讀取他的動作';}
}

$('overlay').addEventListener('click',e=>{
  const button=e.target.closest('[data-action]');if(!button)return;const action=button.dataset.action;if(!paused||['resume','begin','tutorial','replay','confirm','continue'].includes(action))sound.unlock();sound.cue('ui');
  if(action==='begin')begin(false);else if(action==='tutorial'){if(run&&run.phase!=='result'){showConfirm('tutorial');}else begin(true);}
  else if(action==='continue')resumeSave();else if(action==='resume')resume();else if(action==='pause')pause();else if(action==='camp')goCamp();
  else if(action==='new-confirm')showConfirm('begin');else if(action==='restart-confirm')showConfirm('begin');else if(action==='leave-confirm')showConfirm('camp');
  else if(action==='confirm'){if(confirmAction==='camp')goCamp();else begin(confirmAction==='tutorial');}
  else if(action==='cancel-confirm'){setOverlay(confirmReturn);}
  else if(['help','settings','progress'].includes(action)){returnTo=run?'pause':'camp';if(run)pause(false);setOverlay(action);}
  else if(action==='replay')begin(false);else if(action==='new'){config.seed=Math.floor(Math.random()*2147483646)+1;goCamp();}
  else if(action==='reward'){
    const id=button.dataset.id,slots=run.talents||run.player.talents||[];if(TALENTS.some(t=>t.id===id)&&slots.length>=4){replaceReward=id;setOverlay('reward');}
    else{chooseReward(run,id);safeCheckpoint();lastPhase='';syncPhase();}
  }else if(action==='replace'){chooseReward(run,replaceReward,button.dataset.id);replaceReward=null;safeCheckpoint();lastPhase='';syncPhase();}
  else if(action==='cancel-replace'){replaceReward=null;setOverlay('reward');}
  else if(action==='room'){enterRoom(run,button.dataset.id,button.dataset.risk);run.settings=profile.settings;run.player.skin=profile.selectedSkin;safeCheckpoint();lastPhase='';syncPhase();$('world').focus();}
  else if(action==='story'){chooseStory(run,button.dataset.id);safeCheckpoint();setOverlay('route');toast('你的選擇已留下。');}
  else if(action==='mute'){profile.settings.music=0;profile.settings.effects=0;sound.update(profile.settings);persist();setOverlay('settings');}
  else if(action==='export-save'){const blob=new Blob([JSON.stringify(profile,null,2)],{type:'application/json'}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download='hollow-crown-save.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);toast('存檔已匯出至本機，尚未上傳。');}
  else if(action==='reload'){location.reload();}
});
$('overlay').addEventListener('change',e=>{
  const el=e.target,key=el.dataset.setting,c=el.dataset.config;
  if(c){config[c]=c==='seed'?Math.max(1,Math.min(2147483647,Number(el.value)||1)):el.value;updateConfigNote();return;}
  if(!key)return;if(key==='skin'){profile.selectedSkin=el.value;camp.player.skin=el.value;if(run)run.player.skin=el.value;}
  else profile.settings[key]=el.type==='checkbox'?el.checked:['music','effects','practiceWindow'].includes(key)?Number(el.value):el.value;
  sound.update(profile.settings);if(key==='quality')view.setQuality(profile.settings.quality);persist(); // 非品質設定不重套同值；原音訊與保存順序不變。
});
$('overlay').addEventListener('input',e=>{const key=e.target.dataset.setting;if(!['music','effects'].includes(key))return;profile.settings[key]=Number(e.target.value);sound.update(profile.settings);e.target.parentElement.querySelector('span').textContent=`${Math.round(profile.settings[key]*100)}%`;});
$('pause-button').onclick=()=>pause();
document.addEventListener('visibilitychange',()=>{clearWarningCue();if(document.hidden){if(run&&run.phase!=='result')pause();else sound.pause();}}); // 僅新增公開提示的清除、版位或單教學呈現接線；原玩法流程不變。
window.addEventListener('blur',()=>{clearWarningCue();if(run&&run.phase!=='result'&&!paused)pause();}); // 僅新增公開提示的清除、版位或單教學呈現接線；原玩法流程不變。
window.addEventListener('keydown',e=>{if(e.key!=='Tab'||!overlay)return;const focusables=[...$('overlay').querySelectorAll('button:not(:disabled),input,select')];if(!focusables.length)return;const first=focusables[0],last=focusables.at(-1);if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus();}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus();}});
window.addEventListener('resize',()=>{view?.resize();updateVisibility();});
window.addEventListener('pointerdown',e=>{if(e.pointerType==='touch'&&!touchActive){touchActive=true;updateVisibility();}});
window.addEventListener('pagehide',()=>{clearWarningCue();warningCueUI.dispose();if(disposed)return;disposed=true;controls?.dispose();sound.dispose();view?.dispose();bridge.dispose();}); // 僅新增公開提示的清除、版位或單教學呈現接線；原玩法流程不變。
window.addEventListener('pageshow',e=>{if(e.persisted)location.reload();});
$('world').addEventListener('webglcontextlost',e=>{e.preventDefault();pause();toast('圖形裝置暫時中斷。請重新載入頁面，將恢復房間入口。');});
let frame=0,last=performance.now(),hudTime=0;
function tick(now){if(disposed)return;frame=requestAnimationFrame(tick);const raw=(now-last)/1000;last=now;const dt=Math.min(.05,raw);if(!document.hidden){timing.frames.push(raw*1000);if(timing.frames.length>7200)timing.frames.shift();}
  if(run&&!paused&&!overlay&&(run.phase==='combat'||run.phase==='tutorial')){
    step(run,controls.read(run.player,profile.settings.autoAim),dt);
    for(const event of run.events?.splice(0)||[]){sound.cue(event.type,event.material==='armor'||event.material==='shield'?'metal':event.material);if(event.type==='parry')toast('精準反擊');if(event.type==='hurt')toast(`受到 ${sourceName(event.source)} 的攻擊`);if(event.type==='ui'&&event.text&&!event.source&&event.cue!=='tutorial')toast(event.text);}
    syncPhase();
  }
  camp.time+=dt;if(now-hudTime>90){updateHud();hudTime=now;}if(now>toastUntil)$('toast').hidden=true; // 先完成原HUD與toast，再量本幀遮罩；simulation時序不變。
  const cueEnabled=!!run?.tutorial&&!paused&&!overlay&&!document.hidden&&!disposed;const cue=view.render(run||camp,paused?0:dt,cueEnabled);warningCueUI.present(cue,cueEnabled); // 同幀main render後公布，沒有額外輸入或延時計時。
}
try{
  view=new SceneView($('world'),{quality:profile.settings.quality,onCueClear:()=>warningCueUI.clear(),onAssetError:()=>{assetNotice='石材貼圖載入失敗，已使用基礎材質繼續。可於設定重新載入頁面，存檔保留。';notice();}}); // SceneView自身完成一次初始品質套用，不再立即重複。
  controls=new Controls($('world'),view,{pause:()=>paused?resume():pause(),gesture:()=>sound.unlock(),enabled:()=>!!run&&!paused&&!overlay&&['combat','tutorial'].includes(run.phase)});
  setOverlay('camp');notice();$('build-label').textContent=`${VERSION} · ${BUILD} · 本機存檔`;
  timing.loaded=performance.now()-timing.started;bridge.loaded();frame=requestAnimationFrame(tick);
}catch(error){$('overlay').innerHTML=`<section class="panel"><h2>無法點亮場地</h2><p class="lead">請使用支援 WebGL 2 的瀏覽器，並確認硬體加速已開啟。存檔仍保留。</p><p>${esc(error.message)}</p><button onclick="location.reload()">重新載入</button></section>`;bridge.error('三維場景無法初始化：'+error.message);console.error(error);}

// Read-only telemetry for reproducible performance and lifecycle review. Returned values are copies.
Object.defineProperty(window,'hollowCrownDiagnostics',{value:Object.freeze({
  snapshot:()=>structuredClone({buildId:BUILD,version:VERSION,run,paused,overlay,runId,profile:{...profile,checkpoint:profile.checkpoint?{present:true}:null}}),
  metrics:()=>{const sorted=[...timing.frames].sort((a,b)=>a-b);return{buildId:BUILD,readyMs:timing.loaded,samples:sorted.length,p95FrameMs:sorted[Math.floor(sorted.length*.95)]??null,render:view?.metrics(),audio:sound.metrics(),canvas:{width:$('world').width,height:$('world').height},storageAvailable:store.available};}
}),writable:false});
