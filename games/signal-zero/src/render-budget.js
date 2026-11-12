import {numericRecord} from './numeric.js';
// RAF intervals guide quality; shared-CPU frame pacing is diagnostic only.
export class RenderBudget {
 constructor(software=false){this.software=software;this.samples=new Float64Array(120);this.sorted=new Float64Array(120);this.summary=numericRecord({mean:0,p95:0},{mean:0,p95:1});numericRecord(this,{scale:0,elapsed:1,fastSeconds:2,inputMs:3});this.reset();}
 reset(){this.numeric[0]=this.software?.75:1;this.summary.numeric[0]=0;this.summary.numeric[1]=0;this.resume();}
 resume(){this.count=0;this.cursor=0;this.warmup=120;this.numeric[1]=0;this.bad=0;this.numeric[2]=0;}
 sample(ms){if(typeof ms==='object')this.numeric[3]=ms[1];else this.numeric[3]=ms;return this.sampleFrame()}
 sampleFrame(){
  const ms=this.numeric[3];
  if(!Number.isFinite(ms)||ms<=0)return false;if(this.warmup>0){this.warmup--;return false;}
  this.samples[this.cursor++%120]=ms;this.count=Math.min(120,this.count+1);this.numeric[1]+=ms;
  if(this.numeric[1]<1000||this.count<30)return false;
  const elapsed=this.numeric[1];this.numeric[1]=0;let sum=0;for(let i=0;i<120;i++){const value=i<this.count?this.samples[i]:Infinity;this.sorted[i]=value;if(i<this.count)sum+=value;}for(let i=1;i<this.count;i++){const value=this.sorted[i];let j=i-1;while(j>=0&&this.sorted[j]>value){this.sorted[j+1]=this.sorted[j];j--;}this.sorted[j+1]=value;}
  const mean=sum/this.count,p95=this.sorted[Math.floor(this.count*.95)];this.summary.numeric[0]=mean;this.summary.numeric[1]=p95;
  this.bad=mean>33.4||p95>50.1?this.bad+1:0;this.numeric[2]=mean<20&&p95<25?this.numeric[2]+elapsed/1000:0;
  const previous=this.numeric[0];if(this.bad>=2){this.numeric[0]=Math.max(.75,this.numeric[0]-.05);this.bad=0;this.numeric[2]=0;}if(this.numeric[2]>=5){this.numeric[0]=Math.min(1,this.numeric[0]+.025);this.numeric[2]=0;}this.numeric[0]=Math.round(this.numeric[0]*1000)/1000;return this.numeric[0]!==previous;
 }
}
