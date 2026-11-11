// Numeric storage is allocated once; copies/sorts are diagnostic-only.
export class NumericRing {
 constructor(capacity=3600){this.values=new Float64Array(capacity);this.length=0;this.cursor=0;}
 push(value){this.values[this.cursor]=value;this.cursor=(this.cursor+1)%this.values.length;this.length=Math.min(this.length+1,this.values.length);}
 toArray(){const a=[];for(let i=0;i<this.length;i++)a.push(this.values[(this.cursor-this.length+i+this.values.length)%this.values.length]);return a;}
}
