export class Controls {
  constructor(canvas, view, {pause, gesture, enabled}) {
    this.canvas=canvas; this.view=view; this.enabled=enabled; this.keys=new Set(); this.pressed=false; this.released=false; this.held=false; this.dodge=false; this.block=false; this.aim={x:0,z:-5}; this.touchMove={x:0,z:0}; this.touchAim=null; this.abort=new AbortController();this.pointerResets=[];
    const on=(el,event,fn,options={})=>el.addEventListener(event,fn,{...options,signal:this.abort.signal});
    on(window,'keydown',e=>{
      if(e.code==='Escape'){e.preventDefault();pause();return;}
      if (['INPUT','SELECT','TEXTAREA','BUTTON'].includes(e.target.tagName)) return;
      if(!this.enabled())return;
      if(['Space','ArrowUp','ArrowDown','ArrowLeft','ArrowRight','KeyJ','KeyK','KeyL'].includes(e.code))e.preventDefault();
      if(!e.repeat){if(e.code==='Space'||e.code==='KeyL')this.dodge=true;if(e.code==='KeyJ'){this.pressed=true;this.held=true;}gesture();}
      this.keys.add(e.code);
    });
    on(window,'keyup',e=>{this.keys.delete(e.code);if(e.code==='KeyJ'){this.held=false;this.released=true;}});
    on(canvas,'pointermove',e=>{if(e.pointerType!=='touch')this.aim=view.screenToGround(e.clientX,e.clientY)||this.aim;});
    on(canvas,'pointerdown',e=>{if(!this.enabled()||e.pointerType==='touch')return;gesture();canvas.setPointerCapture(e.pointerId);this.aim=view.screenToGround(e.clientX,e.clientY)||this.aim;if(e.button===0){this.pressed=true;this.held=true;}if(e.button===2)this.block=true;});
    on(window,'pointerup',e=>{if(e.pointerType!=='touch'){if(e.button===0&&this.held){this.released=true;this.held=false;}if(e.button===2)this.block=false;}});
    on(canvas,'contextmenu',e=>e.preventDefault());
    on(window,'pointercancel',()=>this.clear()); on(window,'blur',()=>this.clear());
    for(const [id,kind] of [['attack','attack'],['guard','block'],['evade','dodge']]){
      const el=document.getElementById(id);let pid=null;
      this.pointerResets.push(()=>{const old=pid;pid=null;if(old!==null&&el.hasPointerCapture?.(old))el.releasePointerCapture(old);el.classList.remove('held');});
      on(el,'pointerdown',e=>{if(!this.enabled())return;e.preventDefault();gesture();pid=e.pointerId;el.setPointerCapture(pid);el.classList.add('held');if(kind==='attack'){this.held=true;this.pressed=true;}if(kind==='block')this.block=true;if(kind==='dodge')this.dodge=true;});
      const end=e=>{if(e.pointerId!==pid)return;pid=null;el.classList.remove('held');if(kind==='attack'){this.held=false;this.released=true;}if(kind==='block')this.block=false;};
      on(el,'pointerup',end);on(el,'pointercancel',end);on(el,'lostpointercapture',end);
    }
    for(const [id,kind] of [['move-stick','move'],['aim-stick','aim']]){
      const el=document.getElementById(id),nub=el.querySelector('i');let pid=null;
      this.pointerResets.push(()=>{const old=pid;pid=null;if(old!==null&&el.hasPointerCapture?.(old))el.releasePointerCapture(old);nub.style.transform='';});
      const move=e=>{if(e.pointerId!==pid)return;const r=el.getBoundingClientRect();let x=(e.clientX-r.left-r.width/2)/(r.width*.36),z=(e.clientY-r.top-r.height/2)/(r.height*.36);const n=Math.hypot(x,z);if(n>1){x/=n;z/=n;}nub.style.transform=`translate(${x*27}px,${z*27}px)`;if(kind==='move')this.touchMove={x,z};else this.touchAim=n>.15?{x,z}:null;};
      on(el,'pointerdown',e=>{if(!this.enabled())return;e.preventDefault();gesture();pid=e.pointerId;el.setPointerCapture(pid);move(e);});on(el,'pointermove',move);
      const end=e=>{if(e.pointerId!==pid)return;pid=null;nub.style.transform='';if(kind==='move')this.touchMove={x:0,z:0};else this.touchAim=null;};on(el,'pointerup',end);on(el,'pointercancel',end);on(el,'lostpointercapture',end);
    }
  }
  read(player,autoAim){
    const k=this.keys;let x=(k.has('KeyD')||k.has('ArrowRight')?1:0)-(k.has('KeyA')||k.has('ArrowLeft')?1:0)+this.touchMove.x,z=(k.has('KeyS')||k.has('ArrowDown')?1:0)-(k.has('KeyW')||k.has('ArrowUp')?1:0)+this.touchMove.z;const n=Math.hypot(x,z);if(n>1){x/=n;z/=n;}
    const aim=this.touchAim?{x:player.x+this.touchAim.x*10,z:player.z+this.touchAim.z*10}:this.aim;
    const assisted=autoAim&&!this.touchAim;
    const r={moveX:x,moveZ:z,aimX:assisted?undefined:aim.x,aimZ:assisted?undefined:aim.z,attackPressed:this.pressed,attackHeld:this.held,attackReleased:this.released,block:this.block||k.has('KeyK'),dodge:this.dodge,autoAim:assisted};this.pressed=false;this.released=false;this.dodge=false;return r;
  }
  clear(){for(const reset of this.pointerResets)reset();this.keys.clear();this.held=false;this.pressed=false;this.released=false;this.dodge=false;this.block=false;this.touchMove={x:0,z:0};this.touchAim=null;document.querySelectorAll('.held').forEach(x=>x.classList.remove('held'));document.querySelectorAll('.stick i').forEach(x=>x.style.transform='');}
  dispose(){this.clear();this.abort.abort();}
}
