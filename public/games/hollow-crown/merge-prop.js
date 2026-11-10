// Bake a rigid prop's local pieces into one geometry per material. Animated actors
// keep their separate bone transforms; collision geometry remains in rules.js.
export function mergePropGeometry(THREE, parts) {
  const arrays={position:[],normal:[],uv:[]};
  for(const part of parts){
    const clone=part.geometry.clone().applyMatrix4(part.matrix);
    const flat=clone.index?clone.toNonIndexed():clone;
    for(const key of Object.keys(arrays))arrays[key].push(flat.getAttribute(key)?.array);
    if(flat!==clone)flat.dispose();clone.dispose();
  }
  const result=new THREE.BufferGeometry();
  for(const [key,list] of Object.entries(arrays)){
    if(list.some(value=>!value))continue;
    const data=new Float32Array(list.reduce((size,value)=>size+value.length,0));let offset=0;
    for(const values of list){data.set(values,offset);offset+=values.length;}
    result.setAttribute(key,new THREE.BufferAttribute(data,key==='uv'?2:3));
  }
  result.computeBoundingSphere();return result;
}
