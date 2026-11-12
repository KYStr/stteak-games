// Named compatibility properties are installed once, at construction. Simulation
// and rendering use the buffer directly; JSON boundaries retain the schema-1 API.
export function numericRecord(record,fields,nullable=[]){
 const data=new Float64Array(Object.keys(fields).length);
 Object.defineProperty(record,'numeric',{value:data});
 for(const field in fields){const index=fields[field],nil=nullable.includes(field);data[index]=nil&&record[field]==null?NaN:record[field]??0;
  Object.defineProperty(record,field,{enumerable:true,configurable:true,get(){return nil&&Number.isNaN(data[index])?null:data[index]},set(value){data[index]=nil&&value==null?NaN:value}});
 }return record;
}
export const RUN=Object.freeze({time:0,traceRemaining:1,tracePenalty:2,alertTime:3,suspicion:4,hackProgress:5,traveled:6,detectionSeconds:7,patrolMultiplier:8,frameDelta:9,subDelta:10});
export const PLAYER=Object.freeze({x:0,y:1,z:2,vx:3,vy:4,coyote:5,jumpBuffer:6});
export const DEVICE=Object.freeze({x:0,y:1,z:2,min:3,max:4,dir:5,range:6,speed:7,period:8,onTime:9,initialX:10,initialDir:11,phase:12,scanOffset:13,cycleRemaining:14,suspicion:15,disabledUntil:16,searchRemaining:17,decoyUntil:18,tripAt:19});
export const VISION=Object.freeze({halfAngle:0,range:1});
