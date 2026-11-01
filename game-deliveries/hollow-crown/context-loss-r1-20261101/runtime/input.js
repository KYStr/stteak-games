export class Controls {
  constructor(canvas, view, {pause, gesture, enabled}) {
    this.canvas=canvas; this.view=view; this.enabled=enabled; this.keys=new Set(); this.pressed=false; this.released=false; this.held=false; this.dodge=false; this.block=false; this.aim={x:0,z:-5}; this.touchMove={x:0,z:0}; this.touchAim=null; this.abort=new AbortController();this.pointerResets=[];
    this.attackSources=new Set();this.blockSources=new Set();this.dodgeSources=new Set(); // 各實體來源分開持有，不能由另一來源的放開事件覆寫。
    const on=(el,event,fn,options={})=>el.addEventListener(event,fn,{...options,signal:this.abort.signal});
    on(window,'keydown',e=>{
      if(e.code==='Escape'){e.preventDefault();if(!e.repeat)pause();return;}
      if (['INPUT','SELECT','TEXTAREA','BUTTON'].includes(e.target.tagName)) return;
      if(!this.enabled())return;
      if(['Space','ArrowUp','ArrowDown','ArrowLeft','ArrowRight','KeyJ','KeyK','KeyL'].includes(e.code))e.preventDefault();
      if(!e.repeat){if(e.code==='Space'||e.code==='KeyL')this.setDodgeSource(`keyboard:${e.code}`,true);if(e.code==='KeyJ')this.setAttackSource('keyboard',true);gesture();}
      this.keys.add(e.code);
    });
    on(window,'keyup',e=>{this.keys.delete(e.code);if(e.code==='KeyJ')this.setAttackSource('keyboard',false);});
    const canvasOwners=new Map(); // 只有在 canvas 開始的指標序列可更新此滑鼠／筆的按鈕。
    const releaseCapture=(el,pid)=>{if(el.hasPointerCapture?.(pid))el.releasePointerCapture(pid);};
    const hasButtons=e=>Number.isInteger(e.buttons)&&e.buttons>=0;
    const setCanvasButton=(pid,buttons,button,down,release=true)=>{
      if(buttons.has(button)===down)return false;
      if(down)buttons.add(button);else buttons.delete(button);
      const source=`canvas:${pid}:${button}`;
      if(button===0)this.setAttackSource(source,down,release);else this.setBlockSource(source,down);
      return down;
    };
    const syncCanvasButtons=(e,buttons,allowAdd=true)=>{ // Pointer Events 的中途按放由 buttons bitmask 表達，不一定有 down/up。
      let added=false;
      for(const [button,mask] of [[0,1],[2,2]]){
        const down=!!(e.buttons&mask);
        if(!down||allowAdd&&this.enabled())added=setCanvasButton(e.pointerId,buttons,button,down)||added;
      }
      if(added)gesture();
    };
    const forgetCanvas=e=>{canvasOwners.delete(e.pointerId);releaseCapture(canvas,e.pointerId);}; // 先忘記 owner，避免同步 lostcapture 取消已完成的 release。
    this.pointerResets.push(()=>{const ids=[...canvasOwners.keys()];canvasOwners.clear();for(const pid of ids)releaseCapture(canvas,pid);});
    on(canvas,'pointermove',e=>{
      if(e.pointerType==='touch')return;
      this.aim=view.screenToGround(e.clientX,e.clientY)||this.aim;
      const buttons=canvasOwners.get(e.pointerId);
      if(!buttons||!hasButtons(e))return; // 沒有 canvas down 的移入／舊事件不能認領任何來源。
      syncCanvasButtons(e,buttons);
      if(e.buttons===0)forgetCanvas(e);
    });
    on(canvas,'pointerdown',e=>{
      if(!this.enabled()||e.pointerType==='touch'||!Number.isInteger(e.button)||e.button<0||e.button>5)return;
      if(hasButtons(e)?e.buttons===0:![0,2].includes(e.button))return;
      let buttons=canvasOwners.get(e.pointerId);
      if(!buttons){buttons=new Set();canvasOwners.set(e.pointerId,buttons);canvas.setPointerCapture(e.pointerId);}
      this.aim=view.screenToGround(e.clientX,e.clientY)||this.aim;
      if(hasButtons(e))syncCanvasButtons(e,buttons);
      else if(setCanvasButton(e.pointerId,buttons,e.button,true))gesture(); // 保留既有無 buttons 的合成 fixture 介面。
    });
    const endCanvas=(e,cancel=false)=>{
      const buttons=canvasOwners.get(e.pointerId);if(!buttons)return;
      if(cancel){canvasOwners.delete(e.pointerId);for(const button of [...buttons])setCanvasButton(e.pointerId,buttons,button,false,false);releaseCapture(canvas,e.pointerId);return;}
      if(hasButtons(e))syncCanvasButtons(e,buttons,false);
      else if([0,2].includes(e.button))setCanvasButton(e.pointerId,buttons,e.button,false);
      if(hasButtons(e)?e.buttons===0:!buttons.size)forgetCanvas(e);
    };
    on(window,'pointerup',e=>endCanvas(e));
    on(window,'pointercancel',e=>endCanvas(e,true));on(canvas,'lostpointercapture',e=>endCanvas(e,true)); // 取消只清相符 owner，不當成放開出招。
    on(canvas,'contextmenu',e=>e.preventDefault());
    on(window,'blur',()=>this.clear());
    for(const [id,kind] of [['attack','attack'],['guard','block'],['evade','dodge']]){
      const el=document.getElementById(id),source=`button:${id}`;let pid=null,dodgeSource=null;
      this.pointerResets.push(()=>{const old=pid;pid=null;dodgeSource=null;if(old!==null)releaseCapture(el,old);el.classList.remove('held');});
      on(el,'pointerdown',e=>{if(!this.enabled()||pid!==null)return;e.preventDefault();gesture();pid=e.pointerId;el.setPointerCapture(pid);el.classList.add('held');if(kind==='attack')this.setAttackSource(source,true);if(kind==='block')this.setBlockSource(source,true);if(kind==='dodge'){dodgeSource={};this.setDodgeSource(dodgeSource,true);}}); // first-owner：第二指標不搶佔、不捕獲、不新增 edge。
      const end=(e,cancel=false)=>{if(e.pointerId!==pid)return;const old=pid,pendingDodge=dodgeSource;pid=null;dodgeSource=null;el.classList.remove('held');if(kind==='attack')this.setAttackSource(source,false,!cancel);if(kind==='block')this.setBlockSource(source,false);if(kind==='dodge'&&cancel)this.setDodgeSource(pendingDodge,false);releaseCapture(el,old);}; // 取消只撤回這次 evade 的未讀取動作，不抹掉鍵盤或先前正常放開的閃避。
      on(el,'pointerup',e=>end(e));on(el,'pointercancel',e=>end(e,true));on(el,'lostpointercapture',e=>end(e,true));
    }
    for(const [id,kind] of [['move-stick','move'],['aim-stick','aim']]){
      const el=document.getElementById(id),nub=el.querySelector('i');let pid=null;
      this.pointerResets.push(()=>{const old=pid;pid=null;if(old!==null)releaseCapture(el,old);nub.style.transform='';});
      const move=e=>{if(e.pointerId!==pid)return;const r=el.getBoundingClientRect();let x=(e.clientX-r.left-r.width/2)/(r.width*.36),z=(e.clientY-r.top-r.height/2)/(r.height*.36);const n=Math.hypot(x,z);if(n>1){x/=n;z/=n;}nub.style.transform=`translate(${x*27}px,${z*27}px)`;if(kind==='move')this.touchMove={x,z};else this.touchAim=n>.15?{x,z}:null;};
      on(el,'pointerdown',e=>{if(!this.enabled()||pid!==null)return;e.preventDefault();gesture();pid=e.pointerId;el.setPointerCapture(pid);move(e);});on(el,'pointermove',move); // 搖桿同樣採 first-owner，其他指標不能改方向。
      const end=e=>{if(e.pointerId!==pid)return;const old=pid;pid=null;nub.style.transform='';if(kind==='move')this.touchMove={x:0,z:0};else this.touchAim=null;releaseCapture(el,old);};on(el,'pointerup',end);on(el,'pointercancel',end);on(el,'lostpointercapture',end);
    }
  }
  setAttackSource(source,down,release=true){ // 只有合併狀態由零變一／由一變零才產生按下／放開 edge。
    const wasHeld=this.attackSources.size>0;if(down)this.attackSources.add(source);else this.attackSources.delete(source);
    this.held=this.attackSources.size>0;if(!wasHeld&&this.held)this.pressed=true;
    if(wasHeld&&!this.held){if(release)this.released=true;else{this.pressed=false;this.released=false;}} // 最後 owner 被取消時不留下待處理出招。
  }
  setDodgeSource(source,down){if(down)this.dodgeSources.add(source);else this.dodgeSources.delete(source);this.dodge=this.dodgeSources.size>0;} // 每次 evade 按下使用獨立 token；read 消費後取消不會復活。
  setBlockSource(source,down){if(down)this.blockSources.add(source);else this.blockSources.delete(source);this.block=this.blockSources.size>0;} // 鍵盤 KeyK 仍由 read 與所有指標來源取聯集。
  read(player,autoAim){
    const k=this.keys;let x=(k.has('KeyD')||k.has('ArrowRight')?1:0)-(k.has('KeyA')||k.has('ArrowLeft')?1:0)+this.touchMove.x,z=(k.has('KeyS')||k.has('ArrowDown')?1:0)-(k.has('KeyW')||k.has('ArrowUp')?1:0)+this.touchMove.z;const n=Math.hypot(x,z);if(n>1){x/=n;z/=n;}
    const aim=this.touchAim?{x:player.x+this.touchAim.x*10,z:player.z+this.touchAim.z*10}:this.aim;
    const assisted=autoAim&&!this.touchAim;
    const r={moveX:x,moveZ:z,aimX:assisted?undefined:aim.x,aimZ:assisted?undefined:aim.z,attackPressed:this.pressed,attackHeld:this.held,attackReleased:this.released,block:this.block||k.has('KeyK'),dodge:this.dodge,autoAim:assisted};this.pressed=false;this.released=false;this.dodge=false;this.dodgeSources.clear();return r;
  }
  clear(){this.attackSources.clear();this.blockSources.clear();this.dodgeSources.clear();for(const reset of this.pointerResets)reset();this.keys.clear();this.held=false;this.pressed=false;this.released=false;this.dodge=false;this.block=false;this.touchMove={x:0,z:0};this.touchAim=null;document.querySelectorAll('.held').forEach(x=>x.classList.remove('held'));document.querySelectorAll('.stick i').forEach(x=>x.style.transform='');}
  dispose(){this.clear();this.abort.abort();}
}
