// Fixed windows and hysteresis: room/phase transitions never reset resolution.
export class RenderBudget {
  constructor(software=false){this.software=software;this.scale=1;this.samples=[];this.frames=0;this.underWindows=0;}
  record(ms){
    if(!Number.isFinite(ms)||ms<=0||ms>1000)return false;
    this.frames++;this.samples.push(ms);if(this.samples.length<120)return false;
    const ordered=[...this.samples].sort((a,b)=>a-b),steady=ordered.slice(0,108),mean=steady.reduce((a,b)=>a+b,0)/steady.length;this.samples.length=0;
    let next=this.scale;const floor=this.software?.8:.65;
    if(mean>39){this.underWindows=0;next=Math.max(floor,this.scale-.1);}
    else if(mean<23){if(++this.underWindows>=2){next=Math.min(1,this.scale+.05);this.underWindows=0;}}
    else this.underWindows=0;
    if(Math.abs(next-this.scale)<.001)return false;this.scale=Number(next.toFixed(2));return true;
  }
  reset(){this.samples.length=0;this.frames=0;this.underWindows=0;}
}
