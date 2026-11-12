import * as T from 'three';
import {mergeGeometries} from 'three/addons/utils/BufferGeometryUtils.js';

// Only explicitly static branches enter here. A cell's merged bounds never
// exceed 32 metres; oversized authored meshes retain their individual bounds.
export class StaticBatch {
 constructor(stage,dynamicRoots){
  this.geometries=new Set();this.variants=new Map();this.meshes=[];this.ownedMaterials=new Set();
  const inverse=stage.matrixWorld.clone().invert(),matrix=new T.Matrix4(),bounds=new T.Box3(),center=new T.Vector3(),buckets=new Map(),replaced=[];
  const owned=new Set(),materialKeys=new Map();let input=0;
  for(const root of [...stage.children]){
   if(dynamicRoots.has(root))continue;
   root.traverse(object=>{
    const m=object.material;
    if(!object.isMesh||object.isSkinnedMesh||object.isInstancedMesh||Array.isArray(m)||m.transparent||!object.visible)return;
    input++;
    matrix.multiplyMatrices(inverse,object.matrixWorld);
    object.geometry.computeBoundingBox();bounds.copy(object.geometry.boundingBox).applyMatrix4(matrix);bounds.getCenter(center);
    if(bounds.max.x-bounds.min.x>32){this.meshes.push({mesh:object,material:m});return;}
    let materialKey=materialKeys.get(m);if(!materialKey){const data=m.toJSON();for(const key of ['uuid','metadata','name','userData'])delete data[key];materialKey=JSON.stringify(data);materialKeys.set(m,materialKey)}
    const key=[Math.floor(center.x/32),materialKey,object.castShadow,object.receiveShadow,object.renderOrder,object.layers.mask,object.frustumCulled].join(':');
    const cells=buckets.get(key)||[];if(!buckets.has(key))buckets.set(key,cells);
    let cell=cells.find(c=>Math.max(c.max,bounds.max.x)-Math.min(c.min,bounds.min.x)<=32);
    if(!cell){cell={min:bounds.min.x,max:bounds.max.x,objects:[],geometries:[]};cells.push(cell)}
    cell.min=Math.min(cell.min,bounds.min.x);cell.max=Math.max(cell.max,bounds.max.x);
    let geometry=object.geometry.clone();if(geometry.index){const expanded=geometry.toNonIndexed();geometry.dispose();geometry=expanded;}
    geometry.applyMatrix4(matrix);
    // Required shader inputs are normalized; optional source-kit attributes
    // cannot prevent otherwise compatible material submissions from merging.
    for(const name of Object.keys(geometry.attributes))if(!['position','normal','uv',...(m.vertexColors?['color']:[])].includes(name))geometry.deleteAttribute(name);
    if(!geometry.attributes.normal)geometry.computeVertexNormals();
    if(!geometry.attributes.uv)geometry.setAttribute('uv',new T.Float32BufferAttribute(new Float32Array(geometry.attributes.position.count*2),2));
    if(m.vertexColors&&!geometry.attributes.color)geometry.setAttribute('color',new T.Float32BufferAttribute(new Float32Array(geometry.attributes.position.count*3).fill(1),3));
    cell.geometries.push(geometry);cell.objects.push(object);
   });
  }
  for(const cells of buckets.values())for(const cell of cells){
   const first=cell.objects[0],geometry=mergeGeometries(cell.geometries,false);cell.geometries.forEach(g=>g.dispose());
   geometry.userData.levelOwned=true;geometry.computeBoundingBox();geometry.computeBoundingSphere();this.geometries.add(geometry);
   const mesh=new T.Mesh(geometry,first.material);mesh.name='static-batch';mesh.castShadow=first.castShadow;mesh.receiveShadow=first.receiveShadow;mesh.renderOrder=first.renderOrder;mesh.frustumCulled=first.frustumCulled;mesh.layers.mask=first.layers.mask;stage.add(mesh);this.meshes.push({mesh,material:first.material});
   for(const object of cell.objects){if(object.userData.owned||object.material.userData.assetInstanceOwned)this.ownedMaterials.add(object.material);if(object.userData.owned||object.geometry.userData.assetInstanceOwned)owned.add(object.geometry);replaced.push(object);object.removeFromParent();}
  }
  // A geometry may also belong to a retained instance. Never release that kit
  // resource while it is still in use (windows, transparent glass, etc.).
  const retained=new Set();stage.traverse(o=>{if(o.geometry)retained.add(o.geometry)});
  for(const g of owned)if(!retained.has(g))g.dispose();
  for(const root of [...stage.children])if(!dynamicRoots.has(root)&&root.isGroup&&root.children.length===0)stage.remove(root);
  this.stats={inputMeshes:input,batches:this.meshes.length,replaced:replaced.length};
 }
 setSimplified(enabled){
  for(const {mesh,material:source} of this.meshes){
   if(!enabled||!source.isMeshStandardMaterial||source.transparent){mesh.material=source;continue;}
   let variant=this.variants.get(source);
   if(!variant){
    variant=new T.MeshLambertMaterial();
    for(const key of ['color','emissive'])variant[key].copy(source[key]);
    for(const key of ['emissiveIntensity','side','vertexColors','fog','transparent','opacity','alphaTest','depthTest','depthWrite','colorWrite','toneMapped','flatShading','map','alphaMap','emissiveMap'])variant[key]=source[key];
    variant.name=source.name+'-lambert';this.variants.set(source,variant);
   }
   mesh.material=variant;
  }
 }
 dispose(){this.geometries.forEach(g=>g.dispose());this.variants.forEach(m=>m.dispose());this.ownedMaterials.forEach(m=>m.dispose());this.geometries.clear();this.variants.clear();this.ownedMaterials.clear();}
}
