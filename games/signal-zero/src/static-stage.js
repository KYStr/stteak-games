import * as T from 'three';

// These roots contain only authored scenery. Their scene/stage parents remain
// identity transforms; moving actors, terminals, particles and effects stay out.
class StaticChunk extends T.Group {
 constructor(){super();this.frozen=false;this.worldBounds=new T.Box3();this.worldSphere=new T.Sphere();}
 updateMatrixWorld(force){if(!this.frozen)super.updateMatrixWorld(force);}
 freeze(){super.updateMatrixWorld(true);this.worldBounds.getBoundingSphere(this.worldSphere);this.frozen=true;}
}

// AnimationMixer still advances every guard on every frame. Only world-matrix
// propagation is deferred until the renderer has updated the camera and light.
// A hidden guard's last world matrices are never used for its visibility test.
class GuardBranch extends T.Group {
 constructor(guard){
  super();this.name='guard-visibility';this.matrixAutoUpdate=false;this.guard=guard;
  this.localSphere=guard.getObjectByName('runner-skinned-armor').boundingSphere.clone();
  this.worldSphere=new T.Sphere();this.add(guard);
 }
 updateMatrixWorld(){}
 updateVisibility(cameraFrustum,shadowFrustum){
  if(this.guard.matrixAutoUpdate)this.guard.updateMatrix();
  // This wrapper is identity. The stage has already received its current
  // world transform from Three; the guard's own matrix includes facing/position.
  this.worldSphere.copy(this.localSphere).applyMatrix4(this.guard.matrix).applyMatrix4(this.parent.matrixWorld);
  this.visible=cameraFrustum.intersectsSphere(this.worldSphere)||!!shadowFrustum?.intersectsSphere(this.worldSphere);
  if(this.visible)super.updateMatrixWorld(true);
 }
}

export class StaticStage {
 constructor(stage,dynamicRoots,guardRoots=[]){
  this.chunks=[];this.matrix=new T.Matrix4();this.cameraFrustum=new T.Frustum();
  const buckets=new Map(),center=new T.Vector3();let wide=0,roots=0,nodes=0;
  for(const object of [...stage.children]){
   if(dynamicRoots.has(object)||guardRoots.includes(object))continue;
   const bounds=new T.Box3().setFromObject(object);if(bounds.isEmpty())continue;
   bounds.getCenter(center);
   // A very wide object (the skyline instances, for example) keeps its own
   // bucket so its conservative bound does not keep a distant street alive.
   const key=bounds.max.x-bounds.min.x>96?`wide-${wide++}`:Math.floor(center.x/48);
   let chunk=buckets.get(key);
   if(!chunk){chunk=new StaticChunk();chunk.name=`static-chunk-${key}`;buckets.set(key,chunk);stage.add(chunk);this.chunks.push(chunk);}
   chunk.worldBounds.union(bounds);chunk.add(object);roots++;
   object.traverse(()=>nodes++);
  }
  for(const chunk of this.chunks)chunk.freeze();
  // Guard roots were excluded above before adding the identity wrappers.
  this.guards=guardRoots.map(guard=>{const branch=new GuardBranch(guard);stage.add(branch);return branch});
  this.stats={total:this.chunks.length,visible:this.chunks.length,staticRoots:roots,staticNodes:nodes,guards:this.guards.length,visibleGuards:this.guards.length};
 }
 updateVisibility(camera,sun,shadows){
  // Called from scene.onBeforeRender after Three has updated camera/lights.
  this.matrix.multiplyMatrices(camera.projectionMatrix,camera.matrixWorldInverse);
  this.cameraFrustum.setFromProjectionMatrix(this.matrix);
  if(shadows)sun.shadow.updateMatrices(sun);
  const shadowFrustum=shadows?sun.shadow.getFrustum():null;let visible=0;
  for(const chunk of this.chunks){
   // A caster outside the main camera must remain if the light can see it.
   chunk.visible=this.cameraFrustum.intersectsSphere(chunk.worldSphere)||!!shadowFrustum?.intersectsSphere(chunk.worldSphere);
   if(chunk.visible)visible++;
  }
  this.stats.visible=visible;
  let visibleGuards=0;
  for(const guard of this.guards){guard.updateVisibility(this.cameraFrustum,shadowFrustum);if(guard.visible)visibleGuards++;}
  this.stats.visibleGuards=visibleGuards;
 }
}
