// RAF intervals guide quality; shared-CPU frame pacing is diagnostic only.
export class RenderBudget {
 constructor(software=false){this.software=software;this.samples=new Float64Array(120);this.sorted=new Float64Array(120);this.summary={mean:0,p95:0};this.reset();}
 reset(){this.scale=this.software?.75:1;this.summary.mean=0;this.summary.p95=0;this.resume();}
 resume(){this.count=0;this.cursor=0;this.warmup=120;this.elapsed=0;this.bad=0;this.fastSeconds=0;}
 sample(ms){
  if(!Number.isFinite(ms)||ms<=0)return false;if(this.warmup>0){this.warmup--;return false;}
  this.samples[this.cursor++%120]=ms;this.count=Math.min(120,this.count+1);this.elapsed+=ms;
  if(this.elapsed<1000||this.count<30)return false;
  const elapsed=this.elapsed;this.elapsed=0;let sum=0;for(let i=0;i<120;i++){const value=i<this.count?this.samples[i]:Infinity;this.sorted[i]=value;if(i<this.count)sum+=value;}this.sorted.sort();
  const mean=sum/this.count,p95=this.sorted[Math.floor(this.count*.95)];this.summary.mean=mean;this.summary.p95=p95;
  this.bad=mean>33.4||p95>50.1?this.bad+1:0;this.fastSeconds=mean<20&&p95<25?this.fastSeconds+elapsed/1000:0;
  const previous=this.scale;if(this.bad>=2){this.scale=Math.max(.75,this.scale-.05);this.bad=0;this.fastSeconds=0;}if(this.fastSeconds>=5){this.scale=Math.min(1,this.scale+.025);this.fastSeconds=0;}this.scale=Math.round(this.scale*1000)/1000;return this.scale!==previous;
 }
}
