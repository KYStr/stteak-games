import { length2 } from './math.js';
const STRIDE = 23;
// Pack once on world/stage construction; no polymorphic weather-object reads in
// the 60 Hz force scan. Ordering remains world winds followed by current gates.
export function packWinds(winds) {
  const values = new Float64Array(winds.length * STRIDE);
  for (let i = 0; i < winds.length; i++) {
    const w = winds[i], n = i * STRIDE, type = w.type === 'thermal' ? 0 : w.type === 'tailwind' ? 1 : 2;
    values[n] = type; values[n+1]=w.x; values[n+2]=w.y; values[n+3]=w.z;
    values[n+4]=w.radius; values[n+5]=w.height; values[n+6]=w.ceiling || 0; values[n+7]=w.strength;
    values[n+8]=w.charge ?? (type === 0 ? 9 : w.style === 'safe' ? 4.5 : 2.1);
    values[n+9]=w.liftCap ?? 4.4; values[n+10]=w.direction.x; values[n+11]=w.direction.z; values[n+12]=w.period || 1;
    values[n+13]=w.gate ?? -1; values[n+14]=w.start ? 1 : 0;
    if(w.start) {values[n+15]=w.start.x;values[n+16]=w.start.z;values[n+17]=w.end.x-w.start.x;values[n+18]=w.end.z-w.start.z;values[n+19]=values[n+17]**2+values[n+18]**2;}
  }
  return values;
}
export const LIFT=0, CHARGE=1, WIND_X=2, WIND_Z=3, BOOST=4, COUNT=5, DIRECTION_X=6, DIRECTION_Z=7, TIME=8, PHASE=9;
const TYPES = ['thermal','tailwind','crosswind'];
export function accumulateWinds(values, p, gate, tailwindModule, out, types) {
  const dx=out[DIRECTION_X],dz=out[DIRECTION_Z],elapsed=out[TIME],phase=out[PHASE];
  for (let n=0;n<values.length;n+=STRIDE) {
    if(gate>=0&&values[n+13]!==gate)continue;
    const y=values[n+2];if(p.y<y||p.y>y+values[n+5])continue;
    let distance;
    if(values[n+14]) {
      const sx=values[n+15],sz=values[n+16],vx=values[n+17],vz=values[n+18];
      const raw=((p.x-sx)*vx+(p.z-sz)*vz)/values[n+19],t=raw<0?0:raw>1?1:raw;
      distance=length2(p.x-sx-t*vx,p.z-sz-t*vz);
    } else distance=length2(p.x-values[n+1],p.z-values[n+3]);
    const radius=values[n+4];
    const weight=Math.max(0,1-Math.max(0,distance-radius*.65)/(radius*.35));
    if(weight<=0)continue;
    const type=values[n],name=TYPES[type];let seen=false;
    for(let i=0;i<out[COUNT];i++)if(types[i]===name){seen=true;break;}
    if(!seen)types[out[COUNT]++]=name;
    if(type===0){
      const rise=(values[n+6]-p.y)*.38+1.7,cap=values[n+7];
      out[LIFT]=Math.max(out[LIFT],(rise < -1.2 ? -1.2 : rise>cap ? cap : rise)*weight);
      out[CHARGE]=Math.max(out[CHARGE],values[n+8]*weight);
    }else if(type===1){
      const dot=dx*values[n+10]+dz*values[n+11],alignment=dot>0?dot:0;
      out[BOOST]=Math.max(out[BOOST],values[n+7]*alignment*weight*(tailwindModule?1.75:1));
      const rise=(values[n+6]-p.y)*.18+1.7,cap=values[n+9];
      out[LIFT]=Math.max(out[LIFT],(rise < -1.2 ? -1.2 : rise>cap ? cap : rise)*weight);
      out[CHARGE]=Math.max(out[CHARGE],values[n+8]*weight);
    }else{
      const wave=Math.sin(elapsed/values[n+12]*Math.PI*2+phase),pulse=wave>0?wave:0;
      out[WIND_X]+=values[n+10]*values[n+7]*pulse*weight;out[WIND_Z]+=values[n+11]*values[n+7]*pulse*weight;
    }
  }
}
