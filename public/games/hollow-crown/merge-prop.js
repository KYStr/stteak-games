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

// Baked vertex tint for the software path. Input matrices include instance and
// parent transforms; applyMatrix4 supplies the inverse-transpose normal matrix.
export function bakeColorGeometry(THREE,parts) {
  const transformed=[];
  const light=new THREE.Vector3(-.4,.85,.3).normalize();
  for(const part of parts){
    const g=part.geometry.clone().applyMatrix4(part.matrix),flat=g.index?g.toNonIndexed():g;
    const n=flat.getAttribute('normal'),colors=new Float32Array(flat.getAttribute('position').count*3);
    const tint=part.material.color,emissive=part.material.emissive;
    for(let i=0;i<colors.length/3;i++){
      const shade=n?.array ? .72+.28*Math.max(0,n.getX(i)*light.x+n.getY(i)*light.y+n.getZ(i)*light.z):1;
      for(let c=0;c<3;c++)colors[i*3+c]=Math.min(1,tint[['r','g','b'][c]]*shade+(emissive?.[['r','g','b'][c]]||0)*.3);
    }
    flat.setAttribute('color',new THREE.BufferAttribute(colors,3));transformed.push(flat);if(flat!==g)g.dispose();
  }
  const result=new THREE.BufferGeometry();
  for(const key of ['position','color']){const list=transformed.map(g=>g.getAttribute(key).array),data=new Float32Array(list.reduce((n,a)=>n+a.length,0));let offset=0;for(const a of list){data.set(a,offset);offset+=a.length;}result.setAttribute(key,new THREE.BufferAttribute(data,3));}
  transformed.forEach(g=>g.dispose());result.computeBoundingSphere();return result;
}

export function collectMeshParts(THREE,root) {
  root.updateMatrixWorld(true);const parts=[];
  const visit=node=>{
    if(!node.visible)return;
    if(node.isMesh){if(node.isInstancedMesh){for(let i=0;i<node.count;i++){const matrix=new THREE.Matrix4();node.getMatrixAt(i,matrix);parts.push({geometry:node.geometry,material:node.material,matrix:node.matrixWorld.clone().multiply(matrix)});}}else parts.push({geometry:node.geometry,material:node.material,matrix:node.matrixWorld.clone()});}
    else if(node.isLOD){if(node.levels[1])visit(node.levels[1].object);else visit(node.children[0]);return;}
    for(const child of node.children)visit(child);
  };visit(root);return parts;
}
