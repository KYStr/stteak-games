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

export function positionTextFromCoordinates(player,length){return positionText(Math.min(100,player[0]/length*100));}

function writeText(node,text){node.textContent=text}
export class TextSlot{
 constructor(node){this.args=[node,''];this.formatArgs=[null,null,null,null]}
 format(formatter,a,b,c,d){const args=this.formatArgs;args[0]=a;args[1]=b;args[2]=c;args[3]=d;this.set(Reflect.apply(formatter,null,args))}
 set(text){this.args[1]=text;Reflect.apply(writeText,null,this.args)}
}

export function setRoutePosition(player,length,pin,fill){const left=positionTextFromCoordinates(player,length);pin.style.left=left;fill.style.width=left}

function writeMeter(node,buffer,index){node.value=buffer[index]}
export class MeterSlot{
 constructor(node){this.args=[node,null,0]}
 setFrom(buffer,index){this.args[1]=buffer;this.args[2]=index;Reflect.apply(writeMeter,null,this.args)}
}
