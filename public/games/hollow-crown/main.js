import { NumericRing } from './ring-buffer.js';
import { SceneView } from './scene.js';
import { WarningCueUI } from './warning-cue-ui.js'; // 一般玩家的公開提示文字與形狀。
import { releaseRun, clearInputEdges, combineModifiers, createRun, step, chooseReward, enterRoom, checkpoint, restoreRun, startTutorial, chooseStory } from './rules.js';
import { chapterName, objectiveInstruction, journeyPlan, crownType, ROOMS, ROUTES, TALENTS, STARTING_TALENTS, CHALLENGES, STORIES, DIFFICULTIES, ENEMIES } from './content.js';
import { SaveStore, settleRun } from './storage.js';
import { Controls } from './input.js';
import { Soundscape } from './audio.js';
import { getGameBridge } from './bridge.js';
const GESTURE_ACTIONS=Object.freeze(['resume','begin','tutorial','replay','confirm','continue']);
const SECONDARY_PANELS=Object.freeze(['help','settings','progress']);
const NUMERIC_SETTINGS=Object.freeze(['music','effects','practiceWindow']);
const VOLUME_SETTINGS=Object.freeze(['music','effects']);
const BACK_PANELS=Object.freeze(['settings','help','progress']);
const TEXT_INPUT_TAGS=Object.freeze(['INPUT','SELECT','TEXTAREA']);
const ACTIVE_PHASES=Object.freeze(['combat','tutorial']);


const BUILD='stteak8-hollow-crown-r5', VERSION='1.5.0';
const $=id=>document.getElementById(id), esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
let renderUnavailable=false; // Context loss is reload-only; never resume unverified graphics.
let store;try{store=new SaveStore();}catch{store=new SaveStore({getItem(){throw Error('blocked');},setItem(){throw Error('blocked');}});}
const profile=store.load();
const motionPreference=matchMedia('(prefers-reduced-motion: reduce)');
if(!profile.settings.reducedMotionExplicit)profile.settings.reducedMotion=motionPreference.matches;
const onMotionChange=()=>{if(!profile.settings.reducedMotionExplicit){profile.settings.reducedMotion=motionPreference.matches;const checkbox=document.querySelector('[data-setting="reducedMotion"]');if(checkbox)checkbox.checked=motionPreference.matches;}};
motionPreference.addEventListener('change',onMotionChange);
let run=null, runId=null, credited={rooms:0,parries:0,flawless:0}, paused=false, overlay='camp', returnTo='camp', replaceReward=null, toastUntil=0, lastPhase='', lastRoom='', disposed=false;
let touchActive=matchMedia('(pointer: coarse)').matches;
let assetNotice='';
let config={seed:Math.floor(Date.now()%2147483647),route:'ash',startTalent:'fleet-ash',challenge:'crown-pilgrimage',difficulty:'pilgrim'};
const camp={phase:'camp',room:ROOMS[0],player:{x:0,z:1,angle:Math.PI*.15,hp:100,maxHp:100,action:'idle',skin:profile.selectedSkin},enemies:[],effects:[],projectiles:[],time:0,settings:profile.settings};
const timing={updates:new NumericRing(),frames:new NumericRing(),started:performance.now(),loaded:null};
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
function setOverlay(name,{focus=true}={}){if(renderUnavailable)name='graphics-error';clearWarningCue(); // overlay改動之前先清舊警示。
  frameClock[2]=0;overlay=name;document.body.dataset.menu=String(!!name);flushInput();$('overlay').className=name==='camp'?'camp':'';
  $('overlay').innerHTML=renderPanel(name);
  $('overlay').setAttribute('role',name&&name!=='camp'?'dialog':'main');$('overlay').setAttribute('aria-label',name==='camp'?'餘燼之冠營地':'旅途選單');if(name&&name!=='camp')$('overlay').setAttribute('aria-modal','true');else $('overlay').removeAttribute('aria-modal');$('hud').inert=!!name;$('world').inert=!!name;
  if(name&&focus){const root=$('overlay'),el=(name==='confirm'?root.querySelector('[data-action=cancel-confirm]'):null)||root.querySelector('[autofocus]')||root.querySelector('button.primary')||root.querySelector('button,input,select');el?.focus({preventScroll:true});}
  updateVisibility();updateConfigNote();updateHud();
}
function renderPanel(name){
  if(name==='graphics-error')return '<section class="panel"><h2>圖形裝置暫時中斷</h2><p>遊戲已停止。請重新載入頁面，將恢復已保存的房間入口；本次未保存進度不會續跑。</p><button data-action="reload" class="primary">重新載入頁面</button></section>';
  if(!name)return '';
  if(name==='camp')return `<section class="panel camp-panel"><div class="brand-mark" aria-hidden="true"><span>♜</span></div><span class="eyebrow">STTEAK ORIGINAL · HOLLOW CROWN</span><h1>餘燼之冠</h1><p class="intro">王座早已空了，誓言仍未熄滅。<br>握緊長槍。<em>讀招、讓位，讓最後一刺回答。</em></p><div class="config"><label>王座路線<select data-config="route">${option(ROUTES,config.route)}</select></label><label>戰鬥難度<select data-config="difficulty">${option(DIFFICULTIES,config.difficulty)}</select></label><label>起始餘燼<select data-config="startTalent">${option(STARTING_TALENTS.filter(t=>profile.unlocked.includes(t.id)),config.startTalent)}</select></label><label>誓約挑戰<select data-config="challenge">${option(CHALLENGES,config.challenge)}</select></label></div><p class="subnote" id="config-note"></p><div class="menu-main">${profile.checkpoint?'<button class="primary" data-action="continue">繼續遠征</button><button data-action="new-confirm">新一輪</button>':`<button class="primary" data-action="${profile.tutorialDone?'begin':'tutorial'}">${profile.tutorialDone?'踏入灰燼':'開始 · 學習守誓'}</button>${!profile.tutorialDone?'<button data-action="begin">直接遠征</button>':''}`}</div><div class="menu-links"><button data-action="tutorial">教學練習</button><button data-action="help">操作手冊</button><button data-action="settings">設定</button><button data-action="progress">守誓紀錄</button></div><div class="camp-stat"><div><strong>${profile.wins}</strong><small>歸還王冠</small></div><div><strong>${STARTING_TALENTS.filter(t=>profile.unlocked.includes(t.id)).length} / 6</strong><small>起始餘燼</small></div><div><strong id="journey-count">${journeyPlan(config).rooms} + ${journeyPlan(config).crowns}</strong><small>戰鬥房／王座</small></div></div><p class="subnote">本機保存 · 重載回到這間房的入口。<br>J 刺擊 · K 格擋 · Space 閃避 · Esc 暫停</p></section>`;
  if(name==='pause')return `<section class="panel" style="max-width:550px">${panelHeader('A MOMENT OF SILENCE','火尚未熄','resume')}<p class="lead">戰鬥、預備動作與音訊均已暫停。<br>離開後可從這間房的入口重新開始。</p><div class="panel-actions"><button class="primary" data-action="resume">繼續守誓</button><button data-action="help">操作手冊</button><button data-action="settings">設定</button></div><div class="panel-actions"><button data-action="restart-confirm">重開本輪</button><button data-action="leave-confirm">回到營地</button></div></section>`;
  if(name==='settings')return `<section class="panel">${panelHeader('OPTIONS','調整旅途',returnTo)}<div class="settings-grid"><div class="setting"><label>音樂 <span>${Math.round(profile.settings.music*100)}%</span><input aria-label="音樂音量" type="range" data-setting="music" min="0" max="1" step=".05" value="${profile.settings.music}"></label></div><div class="setting"><label>音效 <span>${Math.round(profile.settings.effects*100)}%</span><input aria-label="音效音量" type="range" data-setting="effects" min="0" max="1" step=".05" value="${profile.settings.effects}"></label></div><div class="setting"><label>畫面品質<select data-setting="quality"><option value="auto" ${profile.settings.quality==='auto'?'selected':''}>自動 · 依裝置調整（推薦）</option><option value="high" ${profile.settings.quality==='high'?'selected':''}>高 · 陰影與完整幾何</option><option value="low" ${profile.settings.quality==='low'?'selected':''}>低 · 降低像素密度與陰影</option></select></label></div><div class="setting"><label>教學精準格擋窗口<select data-setting="practiceWindow"><option value="0.18" ${profile.settings.practiceWindow===.18?'selected':''}>精準 · 180ms</option><option value="0.32" ${profile.settings.practiceWindow===.32?'selected':''}>寬容 · 320ms</option><option value="0.5" ${profile.settings.practiceWindow===.5?'selected':''}>練習 · 500ms</option></select></label></div>${[['autoAim','自動鎖定近敵（鍵盤／觸控推薦）'],['reducedMotion','減少動態'],['flash','命中閃光'],['shake','鏡頭微震']].map(([key,label])=>`<div class="setting toggle"><label>${label}<input type="checkbox" data-setting="${key}" ${profile.settings[key]?'checked':''}></label></div>`).join('')}</div><p class="subnote">偏好立即保存；畫布解析度會依效能自動調節，介面文字維持清晰。危險同時使用形狀、動作與文字預警。減少動態會關閉微震與環境漂浮動畫。</p><div class="panel-actions"><button data-action="mute" aria-pressed="${profile.settings.muted}">${profile.settings.muted?'恢復聲音':'全部靜音'} · M</button><button data-action="export-save">匯出存檔</button><button data-action="reload">重新載入頁面</button></div></section>`;
  if(name==='help')return `<section class="panel">${panelHeader('FIELD NOTES','守誓者手冊',returnTo)}<div class="help-grid"><section><h3>三章巡禮，短旅仍在</h3><p>清除每房敵人，選擇一份餘燼或恢復生命，再選下一房的風險。預設巡禮有三章十二房：守住燈台、穿越交火、刺破封印，再挑戰兩位王座守衛；六房雙冠與四房一冠保留為短程誓約。燈台靠近後自動點燃；方形封印用原本的刺擊破除。交火直線橫移、圓形離開圓心、外環進入空心區。生命歸零結算，可保留側向解鎖後再試。</p></section><section><h3>長槍的距離</h3><p><span class="key">WASD</span> 或方向鍵移動。滑鼠指向地面瞄準；關閉自動鎖定可完全手動。<span class="key">J</span>／左鍵短按輕刺，長按後放開蓄力刺。普通輕刺不消耗精力。</p></section><section><h3>讓出位置，再還擊</h3><p><span class="key">Space</span>／<span class="key">L</span> 閃避；<span class="key">K</span>／右鍵格擋。敵人落招前才按格擋可精準反擊。持續格擋仍會承受少量傷害。先看地面預警，再用距離躲開。</p></section><section><h3>觸控與可讀性</h3><p>左搖桿移動，右搖桿手動瞄準；預設自動鎖定可省去瞄準手指。右側有刺擊、格擋、閃避。短按刺擊、長按蓄力。放開或取消觸控會立即解除輸入。</p></section><section><h3>盾與外環</h3><p>盾衛正面防住普通刺擊。繞到側背或蓄力破盾。圓形預警離開圓心，環形預警靠近安全內圈，直線預警橫向移開。火圈的空心部分是安全區。</p></section><section><h3>存檔與重玩</h3><p><span class="key">Esc</span> 暫停。切到背景自動暫停，回來後需按繼續。營地與房間入口保存；未完房重載會回到相同入口。十二天賦最多裝備四個。換路線、流派或同種子挑戰，沒有永久血量堆疊。</p></section></div><div class="panel-actions"><button class="primary" data-action="${returnTo}">明白了</button></div></section>`;
  if(name==='progress')return `<section class="panel">${panelHeader('OATHS REMEMBERED','守誓紀錄')}<div class="results"><div><strong>${profile.runs}</strong><small>結算遠征</small></div><div><strong>${profile.wins}</strong><small>成功通關</small></div><div><strong>${profile.totalParries}</strong><small>精準反擊</small></div><div><strong>${profile.flawlessRooms}</strong><small>無傷房間</small></div></div><div class="unlock-list">${STARTING_TALENTS.map(t=>`<div class="unlock-item ${profile.unlocked.includes(t.id)?'':'locked'}"><span class="eyebrow">${profile.unlocked.includes(t.id)?'已解鎖':esc(t.unlock)}</span><h3>${esc(t.name)}</h3><p>${esc(t.description)}</p></div>`).join('')}</div><hr class="hairline"><h3>遠征誓約</h3><div class="result-loadout">${CHALLENGES.map(c=>`<span class="chip">${profile.challengeWins.includes(c.id)?'✓':'◇'} ${esc(c.name)}</span>`).join('')}</div><p class="subnote">完成遠征可記錄對應誓約。兩條短程王道與雙冠遠征各有不同節奏。${profile.best?`最佳成功時間 ${formatTime(profile.best.time)} · 種子 ${esc(profile.best.seed)}`:''}</p><hr class="hairline"><label>盔甲外觀<select data-setting="skin"><option value="ivory">象牙守衛</option>${profile.skins.includes('cinder')?`<option value="cinder" ${profile.selectedSkin==='cinder'?'selected':''}>燼紅守衛</option>`:''}</select></label><p class="subnote">燼紅外觀：完成任一路線。外觀不改變能力。</p><label class="subnote">自訂重玩種子<input type="number" data-config="seed" min="1" max="2147483647" value="${config.seed}"></label><p class="subnote">同種子保留房間與獎勵規則。變更風險或裝備仍會改變策略。</p></section>`;
  if(name==='reward'){
    const choices=run?.rewardChoices||[],pending=choices.find(c=>c.id===replaceReward);
    if(replaceReward)return `<section class="panel">${panelHeader('FOUR EMBERS','選擇要替換的餘燼','cancel-replace')}<p class="lead">最多攜帶四個天賦。替換後立即生效。${pending?.healAmount?`確認替換後恢復 ${pending.healAmount} 生命。`:''}</p><div class="choice-grid">${(run.talents||run.player.talents||[]).map(id=>{const t=TALENTS.find(t=>t.id===id);return `<button class="choice" data-action="replace" data-id="${esc(id)}"><strong>${esc(t?.name||id)}</strong><p>${esc(t?.description)}</p><p class="build-comparison">${esc(buildComparison(pending?.id,id))}</p></button>`;}).join('')}</div></section>`;
    return `<section class="panel">${panelHeader('A ROOM FALLS SILENT','將餘火帶走','pause')}<p class="lead">選擇一份餘燼，或休憩恢復更多生命。每房只能選一次，所有選擇都補滿能量。</p><div class="choice-grid rewards">${choices.map(c=>`<button class="choice" data-action="reward" data-id="${esc(c.id)}"><span class="tag">${c.kind==='heal'?'休憩':schoolName(TALENTS.find(t=>t.id===c.id)?.school)}</span><strong>${esc(c.name)}</strong><p>${esc(c.description)}</p>${c.kind==='talent'?`<p class="build-comparison">${esc(buildComparison(c.id))}</p>`:''}${c.healAmount?`<p>附帶恢復 ${c.healAmount} 生命</p>`:''}</button>`).join('')}</div><p class="subnote">目前生命 ${Math.ceil(run.player.hp)} / ${run.player.maxHp}。選擇後保存；相同存檔重載不會重抽獎勵。</p></section>`;
  }
  if(name==='route'){
    const story=run.story;
    const recorded=run.stories||run.storyChoices||[];
    const selected=Array.isArray(recorded)?recorded.some(x=>x.storyId===story?.id||x.id===story?.id||x.story===story?.id):recorded[story?.id];
    return `<section class="panel">${panelHeader('THE ROAD TO THE THRONE',run.roomsCleared>=journeyPlan(run).rooms?'王座已近':'選擇下一道誓言','pause')}<p class="lead">險路第二波多 1 名敵人，敵人生命 +15%；天賦附帶回復由 12 提升至 18，休憩回復由 32 提升至 45。</p><div class="choice-grid two">${(run.routeChoices||[]).map(c=>`<button class="choice" data-action="room" data-id="${esc(c.roomId)}" data-risk="${esc(c.risk)}"><span class="tag">${c.roomId==='crown-arena'?'王座守衛':c.risk==='perilous'?'險路 · 更多敵人':'安穩 · 標準戰鬥'}</span><strong>${esc(c.name)}</strong><p>${c.roomId==='crown-arena'?esc(ENEMIES[crownType(run)].name)+' · ':''}${esc(c.description)}</p></button>`).join('')}</div>${story&&!selected?`<section class="story"><span class="eyebrow">途中拾得 · ${esc(story.title)}</span><p>${esc(story.text)}</p>${story.choices.map(c=>`<button data-action="story" data-id="${esc(c.id)}">${esc(c.name)}</button>`).join('')}</section>`:''}<p class="subnote">選路後建立房間入口存檔。當前路線：${journeyPlan(run).crowns===2?`雙冠遠征 · ${journeyPlan(run).rooms} 房與兩位守衛`:ROUTES.find(r=>r.id===run.route)?.name}。</p></section>`;
  }
  if(name==='result'){
    const r=run?.result||{},tutorial=!!run?.tutorial;
    const won=tutorial?run.tutorial.done:r.won;
    const talents=r.talents||run?.talents||[];
    return `<section class="panel">${panelHeader(tutorial?'THE FIRST OATH':won?'THE CROWN RETURNS':'AN OATH, UNFINISHED',tutorial?'你已學會守誓':won?'王冠歸於餘燼':'火熄了，誓言還在','camp')}<p class="lead">${esc(tutorial?'你已完成移動、輕刺、閃避與精準格擋。預設巡禮有三章十二房：守住燈台、穿越交火、刺破封印，再挑戰兩位王座守衛；營地也能選六房或四房的短程誓約。':r.ending||(won?'你拾起長槍走入晨光，將名字與故事帶回營地。':'下一輪試著保持長槍距離，在預警落下前側移。'))}</p>${!won?`<p class="result-reason">最後受擊：${esc(sourceName(r.reason)||'生命耗盡')}</p>`:''}<div class="results"><div><strong>${tutorial?Math.min(5,run.tutorial.step):(Array.isArray(r.rooms)?r.rooms.filter(x=>x.id!=='crown-arena').length:r.rooms)??run?.stats?.rooms??0} / ${tutorial?5:journeyPlan(run).rooms}</strong><small>${tutorial?'試煉完成':'普通房完成'}</small></div><div><strong>${r.parries??run?.stats?.parries??0}</strong><small>成功反擊</small></div><div><strong>${r.hits??run?.stats?.hits??0}</strong><small>受擊次數</small></div><div><strong>${formatTime(r.time??run?.time??0)}</strong><small>本輪時間</small></div></div><div class="result-loadout">${talents.map(id=>`<span class="chip">${esc(TALENTS.find(t=>t.id===id)?.name||id)}</span>`).join('')}</div><p class="subnote">${tutorial?'練習不結算長期獎勵。':`種子 ${esc(r.seed??config.seed)} · ${journeyPlan(r).crowns===2?'雙冠王道':esc(ROUTES.find(x=>x.id===(r.route||config.route))?.name)} · ${esc(CHALLENGES.find(x=>x.id===config.challenge)?.name)}`}<br>${!tutorial?`傷害來源：${Object.entries(r.damageSources||run.stats?.damageSources||{}).map(([id,n])=>esc((sourceName(id))+' '+Math.round(n))).join(' · ')||'本輪無受傷'}。`:'可在營地反覆練習，或調整練習窗口。'}</p><div class="panel-actions"><button class="primary" data-action="${tutorial?'begin':'replay'}">${tutorial?'開始正式遠征':'相同種子再試'}</button><button data-action="new">${tutorial?'換條路線':'換一輪新旅途'}</button></div></section>`;
  }
  if(name==='confirm')return `<section class="panel" style="max-width:500px">${panelHeader('A NEW OATH','離開目前旅途？','cancel-confirm')}<p class="lead">${confirmAction==='camp'?'目前房間的入口存檔會保留，下次可以繼續。':'目前這輪進度將被新遠征取代；已解鎖內容與設定保留。'}</p><div class="panel-actions"><button data-action="cancel-confirm">留下</button><button class="primary" data-action="confirm">${confirmAction==='camp'?'回到營地':'開始新旅途'}</button></div></section>`;
  return '';
}
function buildComparison(id,replaceId){
  const slots=run?.talents||[];
  if(!id)return '';
  if(slots.length>=4&&!replaceId)return `目前四格：${slots.map(v=>TALENTS.find(t=>t.id===v)?.name).join('、')}。選取後逐格比較替換效果。`;
  const before=combineModifiers(slots),after=combineModifiers([...slots.filter(t=>t!==replaceId),id]);
  const labels={moveMultiplier:'移速',dodgeMultiplier:'閃距',dodgeCost:'閃避消耗',afterDodgeBonus:'閃後增傷',regenMultiplier:'回能',maxEnergy:'能量上限',parryWindow:'額外反擊時窗',counterMultiplier:'反擊傷害',blockMultiplier:'格擋受傷',parryHeal:'反擊回復',burnDamage:'燃燒／秒',chargeMultiplier:'蓄力傷害',chargeCost:'蓄力消耗',burningBonus:'燃燒增傷',lowHpBonus:'低血增傷'};
  const format=(k,v)=>k.endsWith('Multiplier')||k.endsWith('Bonus')?`${Math.round(v*100)}%`:k==='parryWindow'?`${Math.round(v*1000)}ms`:String(v);
  return Object.keys(before).filter(k=>before[k]!==after[k]).map(k=>`${labels[k]} ${format(k,before[k])} → ${format(k,after[k])}`).join(' · ')||'此替換保留相同數值';
}
function schoolName(s){return {mobility:'機動',counter:'反擊',burn:'燃燒'}[s]||'回復／餘燼';}
function sourceName(id){if(id==='training-hazard')return '場地交火';return ENEMIES[id]?.name||Object.values(ENEMIES).flatMap(x=>x.moves||[]).find(m=>m.id===id)?.name||id||'敵人';}
function updateConfigNote(){const route=$('overlay').querySelector('[data-config=route]');if(route)route.disabled=journeyPlan(config).crowns===2;const count=$('journey-count');if(count)count.textContent=`${journeyPlan(config).rooms} + ${journeyPlan(config).crowns}`;const el=document.getElementById('config-note');if(el)el.textContent=[STARTING_TALENTS.find(t=>t.id===config.startTalent)?.description,DIFFICULTIES.find(t=>t.id===config.difficulty)?.description,CHALLENGES.find(t=>t.id===config.challenge)?.description].join(' ');}
function formatTime(time){return `${Math.floor(time/60)}:${String(Math.floor(time%60)).padStart(2,'0')}`;}
let confirmAction='begin',confirmReturn='camp';
function flushInput(){controls?.clear();if(run){clearInputEdges(run);run.player.chargeReady=false;run.player.heldTime=0;run.player.charge=0;run.player.wasBlocking=false;run.player.blockAge=0;if(run.player.action==='block'||(run.player.action==='charge'&&!run.player.attack))run.player.action='idle';}}
function showConfirm(action){confirmAction=action;confirmReturn=overlay||'pause';pause(false);setOverlay('confirm');}
function begin(tutorial=false){
  if(renderUnavailable)return;
  controls?.clear();releaseRun(run);run=tutorial?startTutorial({practiceWindow:profile.settings.practiceWindow}):createRun({...config});runId=crypto.randomUUID();credited={rooms:0,parries:0,flawless:0};
  run.settings=profile.settings;run.player.skin=profile.selectedSkin;paused=false;lastPhase='';lastRoom='';replaceReward=null;
  if(!tutorial)safeCheckpoint();setOverlay('');sound.unlock();sound.setTheme('combat');bridge.state('running');$('world').focus();syncPhase();
}
function resumeSave(){
  if(renderUnavailable)return;
  try{ // 當局資料與已計入計數須一起驗證，避免壞metadata洗掉原有累積進度。
    const cp=profile.checkpoint;if(!cp?.run)throw Error();const restored=restoreRun(cp.run);if(!restored?.player)throw Error(); // 先沿用正式run schema損壞降級。
    const savedCredit=cp.credited===undefined?{}:cp.credited, creditCaps={rooms:restored.stats.rooms,parries:restored.stats.parries,flawless:restored.stats.flawlessRooms}; // 歷史未提供欄位仍用零預設，計數上限來自合法當局。
    if(!savedCredit||typeof savedCredit!=='object'||Array.isArray(savedCredit)||Object.keys(creditCaps).some(key=>savedCredit[key]!==undefined&&(!Number.isSafeInteger(savedCredit[key])||savedCredit[key]<0||savedCredit[key]>creditCaps[key])))throw Error(); // 錯型、負數、非整數或超出當局的credited都不可進入算術。
    if(typeof cp.runId!=='string'||!/^[\w-]{1,100}$/.test(cp.runId))throw Error();
    releaseRun(run);run=restored;runId=cp.runId;config={seed:run.seed,route:run.route,startTalent:run.startTalent,challenge:run.challenge,difficulty:run.difficulty};credited={rooms:savedCredit.rooms??0,parries:savedCredit.parries??0,flawless:savedCredit.flawless??0}; // 再玩配置只由已驗證當局還原；wrapper的null種子或錯路線不可偷偷改變相同種子再試，credited仍只取已驗證三欄。
    run.settings=profile.settings;run.player.skin=profile.selectedSkin;lastPhase='';lastRoom='';paused=false;setOverlay('');sound.unlock();bridge.state('running');syncPhase();$('world').focus();toast('已恢復同一房間入口。'); // 通過完整驗證後才更新進度與UI。
  } // 壞wrapper與壞run同走下方既有保留解鎖及設定的安全恢復。
  catch{profile.checkpoint=null;persist();releaseRun(run);run=null;setOverlay('camp');toast('房間存檔版本不相容或損壞；解鎖與設定已保留，請開始新旅途。');}
}
function pause(show=true){clearWarningCue(); // 僅新增公開提示的清除、版位或單教學呈現接線；原玩法流程不變。
  if(!run||run.phase==='result')return;paused=true;flushInput();sound.pause();bridge.state('paused');if(show)setOverlay('pause');
}
function resume(){
  if(renderUnavailable)return;
  if(!run)return;paused=false;controls?.clear();sound.resume();bridge.state('running');lastPhase='';setOverlay('');syncPhase();$('world').focus();
}
function goCamp(){if(renderUnavailable)return;if(run&&run.phase!=='result'&&!run.tutorial)safeCheckpoint();releaseRun(run);run=null;paused=false;setOverlay('camp');sound.setTheme('camp');sound.resume();bridge.state('ready');}
function syncPhase(){
  if(!run)return;
  const phase=run.phase;if(phase===lastPhase)return;lastPhase=phase;
  if(phase==='reward'){unlockProgress();safeCheckpoint();setOverlay('reward');sound.setTheme('camp');}
  if(phase==='route'){safeCheckpoint();setOverlay('route');sound.setTheme('camp');}
  if(phase==='combat'||phase==='tutorial'){setOverlay('');sound.setTheme(run.roomIndex>=journeyPlan(run).rooms?'boss':'combat');}
  if(phase==='result'){
    controls.clear();if(run.tutorial){if(run.tutorial.done)profile.tutorialDone=true;}
    else{unlockProgress();settleRun(profile,runId,{...run.result,time:run.time});unlockProgress();}
    persist();setOverlay('result');sound.setTheme('camp');bridge.state('paused');
  }
}
function updateVisibility(){document.body.dataset.tutorial=String(Boolean(run?.tutorial&&!overlay&&run.phase!=='result'));clearWarningCue();$('journey').hidden=true;$('action-feedback').hidden=true;const playing=!!run&&run.phase!=='result';$('hud').hidden=!playing;$('loadout').hidden=!playing;$('combat-tip').hidden=!playing||!!overlay;$('touch-controls').hidden=!playing||!!overlay||!touchActive;$('tutorial').hidden=!run?.tutorial||!!overlay||run.phase==='result';if(overlay)$('boss-hud').hidden=true;} // 僅新增公開提示的清除、版位或單教學呈現接線；原玩法流程不變。
// DOM writes and formatting happen only when the displayed value changes. The
// cache contains primitives, never an obsolete run/room/enemy reference.
const hudTalentIds=[];
const hudNodes=Object.create(null),hudValues=Object.create(null),hudStrings=Object.create(null);
function hudNode(id){return hudNodes[id]||(hudNodes[id]=$(id));}
function hudText(id,text){if(hudStrings[id]!==text){hudStrings[id]=text;hudNode(id).textContent=text;}}
function hudHidden(id,hidden){const node=hudNode(id);if(node.hidden!==hidden)node.hidden=hidden;}
const meterWidths=Array.from({length:101},(_,i)=>i+'%');
function hudWidth(id,percent){const value=Math.max(0,Math.min(100,Math.round(percent)));if(hudValues[id]!==value){hudValues[id]=value;hudNode(id).style.width=meterWidths[value];}}
function updateHud(){
  if(!run)return;
  const p=run.player,obj=run.objective,plan=journeyPlan(run);
  if(!hudValues.tipInitialized||hudValues.objectiveKind!==obj?.kind||hudValues.completed!==obj?.completed||hudValues.targetCount!==obj?.targets.length||hudValues.attackName!==obj?.attack?.name||hudValues.mastered!==obj?.mastered){
    hudValues.tipInitialized=true;hudValues.objectiveKind=obj?.kind;hudValues.completed=obj?.completed;hudValues.targetCount=obj?.targets.length;hudValues.attackName=obj?.attack?.name;hudValues.mastered=obj?.mastered;
    hudText('combat-tip',obj?objectiveInstruction(obj)+(obj.targets.length?` · ${obj.completed}/${obj.targets.length}`:'')+(obj.attack&&!obj.mastered?` · ${obj.attack.name}`:''):'清除守衛 → 選擇餘燼 → 前往王座');
  }
  const hp=Math.ceil(p.hp);if(hudValues.hp!==hp||hudValues.maxHp!==p.maxHp){hudValues.hp=hp;hudValues.maxHp=p.maxHp;hudText('hp-text',`${hp} / ${p.maxHp}`);}
  hudWidth('hp-fill',100*Math.max(0,p.hp)/p.maxHp);hudWidth('energy-fill',100*p.energy/p.maxEnergy);
  const energy=Math.floor(p.energy);if(hudValues.energy!==energy){hudValues.energy=energy;hudText('energy-text',String(energy));}
  hudText('room-name',run.room.name);
  if(hudValues.chapterIndex!==run.roomIndex||hudValues.challenge!==run.challenge||hudValues.training!==!!run.tutorial){
    hudValues.chapterIndex=run.roomIndex;hudValues.challenge=run.challenge;hudValues.training=!!run.tutorial;
    hudText('chapter',run.tutorial?'守誓者的試煉':run.roomIndex>=plan.rooms?`第 ${run.roomIndex-plan.rooms+1} 頂王冠 / ${plan.crowns}`:`${plan.acts>1?`${chapterName(run)} · `:''}第 ${Number(run.roomIndex)+1} 房 / ${plan.rooms}`);
  }
  let alive=0,boss=null;for(let i=0;i<run.enemies.length;i++){const e=run.enemies[i];if(e.hp>0){alive++;if(!boss&&ENEMIES[e.type]?.boss)boss=e;}}
  const seconds=Math.floor(run.time),arriving=run.waveArrival!=null;
  if(hudValues.seconds!==seconds||hudValues.alive!==alive||hudValues.wave!==run.wave||hudValues.waves!==run.pendingWaves.length||hudValues.arriving!==arriving||hudValues.autoAim!==profile.settings.autoAim||hudValues.statusRoom!==run.room.id){
    hudValues.seconds=seconds;hudValues.alive=alive;hudValues.wave=run.wave;hudValues.waves=run.pendingWaves.length;hudValues.arriving=arriving;hudValues.autoAim=profile.settings.autoAim;hudValues.statusRoom=run.room.id;
    hudText('room-status',run.tutorial?'跟隨下方引導，失誤可繼續練習':`${run.room.id==='crown-arena'?'王座守衛':`${arriving?'增援抵達前 · ':''}第 ${run.wave} / ${run.wave+run.pendingWaves.length} 波 · ${alive} 位敵人`} · ${formatTime(run.time)} · ${profile.settings.autoAim?'自動鎖定':'手動瞄準'}`);
  }
  hudHidden('journey',!!overlay||!!run.tutorial);if(hudValues.journeyChallenge!==run.challenge||hudValues.journeyIndex!==run.roomIndex||hudValues.journeyRoute!==run.route){hudValues.journeyChallenge=run.challenge;hudValues.journeyIndex=run.roomIndex;hudValues.journeyRoute=run.route;$('journey').innerHTML=`<span class="eyebrow">${journeyPlan(run).acts>1?chapterName(run):journeyPlan(run).crowns===2?'雙冠遠征':esc(ROUTES.find(r=>r.id===run.route)?.name)} · 歸還王冠</span><div class="journey-nodes ${journeyPlan(run).acts>1?'extended':''}">${Array.from({length:journeyPlan(run).rooms+journeyPlan(run).crowns},(_,i)=>i<journeyPlan(run).rooms?String(i+1):'冠').map((name,i)=>`<span class="${run.roomIndex>i?'done':run.roomIndex===i?'current':''}" aria-label="${i>=journeyPlan(run).rooms?'王座':'第 '+(i+1)+' 房'}${run.roomIndex>i?'已完成':run.roomIndex===i?'進行中':''}">${run.roomIndex>i?'✓':name}</span>`).join('')}</div><small>${esc(objectiveInstruction(run.objective))}</small>`;}
  const charging=p.heldTime>.34&&!p.attack,ready=p.heldTime>=.65;
  const actionText=charging?(ready?'蓄力就緒 · 放開刺擊':'蓄力中 · 繼續按住'):p.action==='block'?'格擋中 · 移動減速':p.action==='dodge'?'閃避 · 無敵時間':p.energy<24?'精力不足 · 輕刺不耗能':'';
  hudHidden('action-feedback',!!overlay||!actionText);
  if(hudNode('action-feedback').dataset.ready!==String(ready))hudNode('action-feedback').dataset.ready=String(ready);
  hudText('action-label',actionText);hudWidth('charge-fill',Math.min(100,p.heldTime/.65*100));hudHidden('charge-track',!charging);
  const talents=run.talents||p.talents;let talentChanged=hudTalentIds.length!==talents.length;for(let i=0;i<talents.length;i++)if(hudTalentIds[i]!==talents[i]){hudTalentIds[i]=talents[i];talentChanged=true;}if(talentChanged){hudTalentIds.length=talents.length;const list=talents.join(',');$('loadout').innerHTML=list.split(',').filter(Boolean).map(id=>`<span class="chip">${esc(TALENTS.find(t=>t.id===id)?.name||id)}</span>`).join('');}
  if(run.tutorial&&(hudValues.tutorialStep!==run.tutorial.step||hudValues.tutorialText!==run.tutorial.text)){
    hudValues.tutorialStep=run.tutorial.step;hudValues.tutorialText=run.tutorial.text;
    $('tutorial-copy').innerHTML=`<strong>試煉 ${Number(run.tutorial.step)+1} / 5</strong>　${esc(run.tutorial.text)}<small>J／左鍵刺擊 · K／右鍵格擋 · Space 閃避 · Esc 設定練習窗口</small>`;
  }
  hudHidden('boss-hud',!boss||!!overlay);
  if(boss){if(hudValues.bossType!==boss.type||hudValues.bossPhase!==boss.phase){hudValues.bossType=boss.type;hudValues.bossPhase=boss.phase;hudText('boss-name',`${ENEMIES[boss.type]?.name} · 第 ${boss.phase||1} 階段`);}hudWidth('boss-fill',boss.hp/boss.maxHp*100);
    if(hudValues.bossState!==boss.state||hudValues.bossMove!==boss.attack?.name){hudValues.bossState=boss.state;hudValues.bossMove=boss.attack?.name;hudText('boss-move',boss.state==='telegraph'?`⚠ ${boss.attack?.name||'即將出招'} — 讓出危險區`:boss.state==='recover'?'破綻 · 現在刺擊':'讀取他的動作');}
  }
}

$('overlay').addEventListener('click',e=>{
  const button=e.target.closest('[data-action]');if(!button)return;const action=button.dataset.action;if(renderUnavailable){if(action==='reload')location.reload();return;}if(!paused||GESTURE_ACTIONS.includes(action))sound.unlock();sound.cue('ui');
  if(action==='begin')begin(false);else if(action==='tutorial'){if(run&&run.phase!=='result'){showConfirm('tutorial');}else begin(true);}
  else if(action==='continue')resumeSave();else if(action==='resume')resume();else if(action==='pause')pause();else if(action==='camp')goCamp();
  else if(action==='new-confirm')showConfirm('begin');else if(action==='restart-confirm')showConfirm('begin');else if(action==='leave-confirm')showConfirm('camp');
  else if(action==='confirm'){if(confirmAction==='camp')goCamp();else begin(confirmAction==='tutorial');}
  else if(action==='cancel-confirm'){setOverlay(confirmReturn);}
  else if(SECONDARY_PANELS.includes(action)){returnTo=run?(run.phase==='result'?'result':'pause'):'camp';if(run)pause(false);setOverlay(action);}
  else if(action==='replay')begin(false);else if(action==='new'){config.seed=Math.floor(Math.random()*2147483646)+1;goCamp();}
  else if(action==='reward'){
    const id=button.dataset.id,slots=run.talents||run.player.talents||[];if(TALENTS.some(t=>t.id===id)&&slots.length>=4){replaceReward=id;setOverlay('reward');}
    else{chooseReward(run,id);safeCheckpoint();lastPhase='';syncPhase();}
  }else if(action==='replace'){chooseReward(run,replaceReward,button.dataset.id);replaceReward=null;safeCheckpoint();lastPhase='';syncPhase();}
  else if(action==='cancel-replace'){replaceReward=null;setOverlay('reward');}
  else if(action==='room'){enterRoom(run,button.dataset.id,button.dataset.risk);run.settings=profile.settings;run.player.skin=profile.selectedSkin;safeCheckpoint();lastPhase='';syncPhase();$('world').focus();}
  else if(action==='story'){chooseStory(run,button.dataset.id);safeCheckpoint();setOverlay('route');toast('你的選擇已留下。');}
  else if(action==='mute'){toggleMute();}
  else if(action==='export-save'){const blob=new Blob([JSON.stringify(profile,null,2)],{type:'application/json'}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download='hollow-crown-save.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);toast('存檔已匯出至本機，尚未上傳。');}
  else if(action==='reload'){location.reload();}
});
$('overlay').addEventListener('change',e=>{
  const el=e.target,key=el.dataset.setting,c=el.dataset.config;
  if(c){config[c]=c==='seed'?Math.max(1,Math.min(2147483647,Number(el.value)||1)):el.value;updateConfigNote();return;}
  if(!key)return;if(key==='skin'){profile.selectedSkin=el.value;camp.player.skin=el.value;if(run)run.player.skin=el.value;}
  else profile.settings[key]=el.type==='checkbox'?el.checked:NUMERIC_SETTINGS.includes(key)?Number(el.value):el.value;
  if(key==='reducedMotion')profile.settings.reducedMotionExplicit=true;
  sound.update(profile.settings);if(key==='quality')view.setQuality(profile.settings.quality);persist(); // 非品質設定不重套同值；原音訊與保存順序不變。
});
$('overlay').addEventListener('input',e=>{const key=e.target.dataset.setting;if(!VOLUME_SETTINGS.includes(key))return;profile.settings[key]=Number(e.target.value);sound.update(profile.settings);e.target.parentElement.querySelector('span').textContent=`${Math.round(profile.settings[key]*100)}%`;});
$('pause-button').onclick=()=>pause();
document.addEventListener('visibilitychange',()=>{clearWarningCue();if(document.hidden){if(run&&run.phase!=='result')pause();else sound.pause();}}); // 僅新增公開提示的清除、版位或單教學呈現接線；原玩法流程不變。
window.addEventListener('blur',()=>{clearWarningCue();if(run&&run.phase!=='result'&&!paused)pause();else sound.pause();}); // 僅新增公開提示的清除、版位或單教學呈現接線；原玩法流程不變。
window.addEventListener('keydown',e=>{if(e.key!=='Tab'||!overlay)return;const focusables=Array.from($('overlay').querySelectorAll('button,input,select,textarea,a[href],[tabindex]')).filter(el=>!el.matches(':disabled')&&el.tabIndex>=0&&!el.closest('[hidden],[inert]')&&el.getClientRects().length>0&&getComputedStyle(el).visibility!=='hidden');if(!focusables.length)return;const first=focusables[0],last=focusables.at(-1);if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus();}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus();}});
window.addEventListener('resize',()=>{view?.resize();updateVisibility();});
window.addEventListener('pointerdown',e=>{if(e.pointerType==='touch'&&!touchActive){touchActive=true;updateVisibility();}});
window.addEventListener('pagehide',()=>{motionPreference.removeEventListener('change',onMotionChange);cancelAnimationFrame(frame);clearWarningCue();warningCueUI.dispose();if(disposed)return;disposed=true;controls?.dispose();sound.dispose();view?.dispose();bridge.dispose();}); // 僅新增公開提示的清除、版位或單教學呈現接線；原玩法流程不變。
window.addEventListener('pageshow',e=>{if(e.persisted)location.reload();});
$('world').addEventListener('webglcontextlost',e=>{e.preventDefault();renderUnavailable=true;paused=true;flushInput();sound.pause();bridge.state('paused');setOverlay('graphics-error');});
let frame=0;const frameClock=new Float64Array([performance.now(),0,0,0]); // last tick, HUD, throttle, actual scene submission
function back(){
  if(renderUnavailable)return;
  if(overlay==='confirm'){setOverlay(confirmReturn);return;}
  if(BACK_PANELS.includes(overlay)){setOverlay(returnTo);return;}
  if(overlay==='camp')return;
  if(overlay==='result'){goCamp();return;}
  if(overlay==='pause'){resume();return;}
  if(replaceReward){replaceReward=null;setOverlay('reward');return;}
  pause();
}
function syncMuteControl(){const button=$('overlay').querySelector('[data-action="mute"]');if(button){button.setAttribute('aria-pressed',String(profile.settings.muted));button.textContent=`${profile.settings.muted?'恢復聲音':'全部靜音'} · M`;}}
function toggleMute(){profile.settings.muted=!profile.settings.muted;sound.update(profile.settings);persist();syncMuteControl();toast(profile.settings.muted?'已靜音 · M 恢復聲音':'聲音已恢復');}
window.addEventListener('keydown',e=>{if(e.code==='KeyM'&&!e.repeat&&!TEXT_INPUT_TAGS.includes(e.target.tagName)){e.preventDefault();toggleMute();}});
function tick(now){if(disposed||renderUnavailable)return;frame=requestAnimationFrame(tick);const raw=(now-frameClock[0])/1000;frameClock[0]=now;const dt=Math.min(.15,raw);if(!document.hidden&&!overlay&&!paused){timing.frames.push(raw*1000);view.recordFrame(raw*1000);}
  if(run&&!paused&&!overlay&&(run.phase==='combat'||run.phase==='tutorial')){
    const updateStart=performance.now();step(run,controls.read(run.player,profile.settings.autoAim),dt);timing.updates.push(performance.now()-updateStart);
    for(let eventIndex=0;eventIndex<run.events.length;eventIndex++){const event=run.events[eventIndex];dispatchEventCue(event);}run.events.length=0;
    syncPhase();
  }
  if(now-frameClock[1]>90){updateHud();frameClock[1]=now;}if(now>toastUntil&&!$('toast').hidden)$('toast').hidden=true;
  if(document.hidden||overlay&&now-frameClock[2]<100)return;frameClock[2]=now;
  const cueEnabled=!!run?.tutorial&&!paused&&!overlay&&!document.hidden&&!disposed;const cue=view.render(run||camp,paused?0:Math.min(.15,overlay?(now-(frameClock[3]||now))/1000:dt),cueEnabled);frameClock[3]=now;warningCueUI.present(cue,cueEnabled);
}
function dispatchEventCue(event){sound.cue(event.type,event.cue==='phase'||event.cue==='wave'?event.cue:event.material==='armor'||event.material==='shield'?'metal':event.material);if(event.type==='parry')toast('精準反擊');if(event.type==='hurt')toast(`受到 ${sourceName(event.source)} 的攻擊`);if((event.type==='objective'||event.type==='hazard'||event.type==='ui'&&!event.source&&event.cue!=='tutorial')&&event.text)toast(event.text);}

try{
  view=new SceneView($('world'),{quality:profile.settings.quality,onCueClear:()=>warningCueUI.clear(),onAssetError:()=>{assetNotice='石材貼圖載入失敗，已使用基礎材質繼續。可於設定重新載入頁面，存檔保留。';notice();}}); // SceneView自身完成一次初始品質套用，不再立即重複。
  controls=new Controls($('world'),view,{pause:()=>back(),gesture:()=>sound.unlock(),enabled:()=>!renderUnavailable&&!!run&&!paused&&!overlay&&ACTIVE_PHASES.includes(run.phase)});
  setOverlay('camp');notice();$('build-label').textContent=`HOLLOW CROWN ${VERSION} · 本機存檔`;
  timing.loaded=performance.now()-timing.started;bridge.loaded();frame=requestAnimationFrame(tick);
}catch(error){$('overlay').innerHTML=`<section class="panel"><h2>無法點亮場地</h2><p class="lead">請使用支援 WebGL 2 的瀏覽器，並確認硬體加速已開啟。存檔仍保留。</p><p>${esc(error.message)}</p><button onclick="location.reload()">重新載入</button></section>`;bridge.error('三維場景無法初始化：'+error.message);console.error(error);}

// Read-only telemetry for reproducible performance and lifecycle review. Returned values are copies.
Object.defineProperty(window,'hollowCrownDiagnostics',{value:Object.freeze({
  snapshot:()=>structuredClone({buildId:BUILD,version:VERSION,run,paused,overlay,runId,profile:{...profile,checkpoint:profile.checkpoint?{present:true}:null}}),
  metrics:()=>{const frames=timing.frames.summary(),updates=timing.updates.summary();return{updateAvgMs:updates.sortedMean,updateP95Ms:updates.p95||0,buildId:BUILD,readyMs:timing.loaded,samples:frames.length,avgFrameMs:frames.length?frames.sortedMean:null,recentAvgFrameMs:frames.length?frames.recentMean:null,p95FrameMs:frames.p95,render:view?.metrics(),audio:sound.metrics(),canvas:{width:$('world').width,height:$('world').height},storageAvailable:store.available};}

}),writable:false});
