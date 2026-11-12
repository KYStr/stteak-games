// Reuse input numbers on the ordinary ordered numeric path. Preserve Math's
// coercion, NaN, inverted-bound and signed-zero behavior on exceptional paths.
export function clamp(value,min,max){
 if(typeof value==='number'&&typeof min==='number'&&typeof max==='number'&&min<=max&&!(min===0&&max===0)){
  if(value<min)return min;if(value>max)return max;
  if(value!==0||min!==0&&max!==0)return value;
 }
 return Math.max(min,Math.min(max,value));
}
export function minimumRadius(radius){return typeof radius==='number'?(radius<.001?.001:radius):Math.max(.001,radius);}
