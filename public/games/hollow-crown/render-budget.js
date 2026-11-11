// Fixed windows and hysteresis: room/phase transitions never reset resolution.
export class RenderBudget {
  constructor(software=false){this.software=software;this.scale=1;this.samples=new Float64Array(120);this.sampleCount=0;this.ordered=new Float64Array(120);this.frames=0;this.underWindows=0;}
  record(ms){
    if(!Number.isFinite(ms)||ms<=0||ms>1000)return false;
    this.frames++;this.samples[this.sampleCount++]=ms;if(this.sampleCount<120)return false;
    const ordered=this.ordered;for(let i=0;i<120;i++)ordered[i]=this.samples[i];ordered.sort();let sum=0;for(let i=0;i<108;i++)sum+=ordered[i];const mean=sum/108;this.sampleCount=0;
    let next=this.scale;const floor=this.software?.8:.65;
    if(mean>39){this.underWindows=0;next=Math.max(floor,this.scale-.1);}
    else if(mean<23){if(++this.underWindows>=2){next=Math.min(1,this.scale+.05);this.underWindows=0;}}
    else this.underWindows=0;
    if(Math.abs(next-this.scale)<.001)return false;this.scale=Number(next.toFixed(2));return true;
  }
  reset(){this.sampleCount=0;this.frames=0;this.underWindows=0;}
}
