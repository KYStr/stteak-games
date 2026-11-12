const ascending=(a,b)=>a-b;
// Numeric storage is allocated once; copies/sorts are diagnostic-only.
export class NumericRing {
 constructor(capacity=3600){this.values=new Float64Array(capacity);this.length=0;this.cursor=0;}
 push(value){this.values[this.cursor]=value;this.cursor=(this.cursor+1)%this.values.length;this.length=Math.min(this.length+1,this.values.length);}
 summary(recent=180){
  const length=this.length;if(!length)return{length:0,mean:0,sortedMean:0,recentMean:0,p95:null};
  const tail=Math.max(0,Math.min(length,Math.floor(recent)));let ordered=new Float64Array(length),sum=0,recentSum=0,exceptional=false;
  for(let i=0;i<length;i++){const value=this.values[(this.cursor-length+i+this.values.length)%this.values.length];ordered[i]=value;sum+=value;if(i>=length-tail)recentSum+=value;if(Number.isNaN(value)||Object.is(value,-0))exceptional=true;}
  if(exceptional)ordered=this.toArray().sort(ascending);else ordered.sort();let sortedSum=0;for(let i=0;i<length;i++)sortedSum+=ordered[i];
  return{length,mean:sum/length,sortedMean:sortedSum/length,recentMean:tail?recentSum/tail:0,p95:ordered[Math.floor(length*.95)]};
 }
 toArray(){const a=[];for(let i=0;i<this.length;i++)a.push(this.values[(this.cursor-this.length+i+this.values.length)%this.values.length]);return a;}
}
