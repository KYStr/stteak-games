// Native timestamp number boxing belongs to instrumentation, outside game state.
export const clock=()=>performance.now();
// Write timestamps in place so callers do not need a boxed numeric return.
export function stamp(out,index){out[index]=performance.now()}
// A reusable argument tuple keeps browser timestamp API work in this explicit
// instrumentation boundary even when V8 would inline it into game physics/UI.
export class Timer{
 constructor(out){this.args=[out,0]}
 mark(index){this.args[1]=index;Reflect.apply(stamp,null,this.args)}
}
// Numeric history only; object serialization is reserved for explicit diagnostics.
export class Samples {
 constructor(keys,capacity=3600){this.keys=keys;this.capacity=capacity;this.count=0;this.data=new Float64Array(capacity*keys.length);}
 add(a,b,c,d,e,f,g){const i=this.count++%this.capacity*this.keys.length;this.data[i]=a;this.data[i+1]=b;this.data[i+2]=c;this.data[i+3]=d;this.data[i+4]=e;this.data[i+5]=f;this.data[i+6]=g;}
 append(source,offset=0){const i=this.count++%this.capacity*this.keys.length;for(let k=0;k<this.keys.length;k++)this.data[i+k]=source[offset+k];}
 export(){const n=Math.min(this.count,this.capacity),out=[];for(let j=0;j<n;j++){const index=this.count-n+j,record={index};for(let k=0;k<this.keys.length;k++)record[this.keys[k]]=this.data[index%this.capacity*this.keys.length+k];out.push(record);}return out;}
 summary(){const records=this.export(),result={};for(const key of this.keys){const values=records.map(p=>p[key]).filter(Number.isFinite).sort((a,b)=>a-b);result[key]={mean:values.reduce((a,b)=>a+b,0)/values.length||0,p95:values[Math.floor(values.length*.95)]||0};}return result;}
}

export function gpuResult(gl,query,out,index){out[index]=gl.getQueryParameter(query,gl.QUERY_RESULT)/1e6}
