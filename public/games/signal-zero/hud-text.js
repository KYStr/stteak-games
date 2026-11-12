// Formatting happens only after a displayed scalar changes. These bounded DOM
// updates are separate from the unchanged HUD polling path.
export const clockText=seconds=>`${Math.floor(seconds/60).toString().padStart(2,'0')}:${Math.floor(seconds%60).toString().padStart(2,'0')}`;
export const regionText=(level,sector)=>level.region+(sector?' / '+sector.name:'');
export const countText=(count,total)=>`${count} / ${total} 節點　`;
export const nextText=next=>next?'◇ '+next.label:'✓ 主目標完成';
export const distanceText=distance=>distance<0?'':' · '+distance+' m';
export const packetText=packet=>(packet?'◆':'◇')+' 可選資料包　→ ';
export const exitText=distance=>distance+' m 至出口';
export const timerText=(second,standard)=>standard?'追蹤 '+clockText(second):clockText(second)+' 舒緩';
export const alertText=(state,tenth)=>state==='normal'?'○ 隱匿':state==='suspicious'?'△ 可疑':state==='searching'?'◎ 搜索 '+(tenth/10).toFixed(1)+'s':'！追蹤 / 脫離視線';
export const contextText=(source,progress,tenth,active)=>{let text=source==='laser'?`雷射 ${active?'通電':'關閉'} · ${(tenth/10).toFixed(1)} 秒後${active?'關閉':'通電'}`:source;if(progress>=0)text+='　'+progress+'%';return text};
export const positionText=position=>position+'%';
export const routeText=(next,direction,distance)=>next?`${direction?'→':'←'} ${next.label} · ${distance} m`:'→ 全節點連線 · 前往出口';
export const toolCountText=count=>'×'+count;
