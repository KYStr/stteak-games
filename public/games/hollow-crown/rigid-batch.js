const ATTRIBUTES=Object.freeze(['position','color']);
export function uploadRange(attribute,count){const r=attribute.hollowRange||(attribute.hollowRange={start:0,count:0});r.count=count;attribute.updateRanges.length=1;attribute.updateRanges[0]=r;attribute.needsUpdate=true;}
// One populated-prefix stream for rigid, bone-animated software actors. Geometry
// templates are owned by SceneView, the stream owns only its own buffers/material.
export class RigidBatch {
 constructor(T,capacity=180000){this.T=T;this.capacity=capacity;this.geometry=new T.BufferGeometry();for(const key of ATTRIBUTES){const a=new T.BufferAttribute(new Float32Array(capacity*3),3);a.setUsage(T.DynamicDrawUsage);this.geometry.setAttribute(key,a);}this.material=new T.MeshBasicMaterial({vertexColors:true});this.mesh=new T.Mesh(this.geometry,this.material);this.mesh.name='rigid-bone-color-stream';this.mesh.frustumCulled=false;this.count=0;this.disposed=false;}
 update(actors){
  const positions=this.geometry.attributes.position.array,colors=this.geometry.attributes.color.array;let count=0;
  for(const actor of actors){if(!actor.group.visible)continue;actor.group.updateMatrixWorld(true);
   for(const part of actor.bakedParts){const src=part.geometry.attributes.position.array,tint=part.geometry.attributes.color.array,m=part.bone.matrixWorld.elements;if(count+src.length/3>this.capacity)throw Error('Rigid stream capacity exceeded');
    for(let i=0;i<src.length;i+=3){const x=src[i],y=src[i+1],z=src[i+2],offset=count*3+i;positions[offset]=m[0]*x+m[4]*y+m[8]*z+m[12];positions[offset+1]=m[1]*x+m[5]*y+m[9]*z+m[13];positions[offset+2]=m[2]*x+m[6]*y+m[10]*z+m[14];}
    colors.set(tint,count*3);count+=src.length/3;
   }
  }
  this.count=count;this.geometry.setDrawRange(0,count);this.mesh.visible=count>0;
  for(const key of ATTRIBUTES){const a=this.geometry.attributes[key];if(count)uploadRange(a,count*3);}
 }
 dispose(){if(this.disposed)return;this.disposed=true;this.geometry.dispose();this.material.dispose();}
}
