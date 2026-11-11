// Numeric history only; object serialization is reserved for explicit diagnostics.
export class Samples {
 constructor(keys,capacity=3600){this.keys=keys;this.capacity=capacity;this.count=0;this.data=new Float64Array(capacity*keys.length);}
 add(a,b,c,d,e,f,g){const i=this.count++%this.capacity*this.keys.length;this.data[i]=a;this.data[i+1]=b;this.data[i+2]=c;this.data[i+3]=d;this.data[i+4]=e;this.data[i+5]=f;this.data[i+6]=g;}
 export(){const n=Math.min(this.count,this.capacity),out=[];for(let j=0;j<n;j++){const index=this.count-n+j,record={index};for(let k=0;k<this.keys.length;k++)record[this.keys[k]]=this.data[index%this.capacity*this.keys.length+k];out.push(record);}return out;}
 summary(){const records=this.export(),result={};for(const key of this.keys){const values=records.map(p=>p[key]).filter(Number.isFinite).sort((a,b)=>a-b);result[key]={mean:values.reduce((a,b)=>a+b,0)/values.length||0,p95:values[Math.floor(values.length*.95)]||0};}return result;}
}
