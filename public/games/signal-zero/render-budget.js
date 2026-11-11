// RAF measures the complete frame budget, including driver/compositor work.
// GPU timer queries are deliberately diagnostic only.
export class RenderBudget {
 constructor(software=false){this.software=software;this.reset();}
 reset(){this.scale=this.software?.75:1;this.samples=[];this.warmup=120;this.elapsed=0;this.bad=0;this.fastSeconds=0;this.summary={mean:0,p95:0};}
 resume(){this.samples=[];this.warmup=120;this.elapsed=0;this.bad=0;this.fastSeconds=0;}
 sample(ms){
  if(!Number.isFinite(ms)||ms<=0)return false;
  if(this.warmup>0){this.warmup--;return false;}
  this.samples.push(ms);if(this.samples.length>120)this.samples.shift();this.elapsed+=ms;
  if(this.elapsed<1000||this.samples.length<30)return false;
  const elapsed=this.elapsed;this.elapsed=0;
  const values=[...this.samples].sort((a,b)=>a-b);
  const mean=values.reduce((a,b)=>a+b,0)/values.length,p95=values[Math.floor(values.length*.95)];this.summary={mean,p95};
  const slow=mean>33.4||p95>50.1;this.bad=slow?this.bad+1:0;
  this.fastSeconds=mean<20&&p95<25?this.fastSeconds+elapsed/1000:0;
  const previous=this.scale;
  if(this.bad>=2){this.scale=Math.max(.75,this.scale-.05);this.bad=0;this.fastSeconds=0;}
  if(this.fastSeconds>=5){this.scale=Math.min(1,this.scale+.025);this.fastSeconds=0;}
  this.scale=Math.round(this.scale*1000)/1000;
  return this.scale!==previous;
 }
}
