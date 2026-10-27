import * as THREE from './vendor/three.module.js';

/** Moss & Moon original model kit 1.2.0. Metres; Y up; +Z forward; base-centre pivots.
 * Editable procedural source: every visible part is closed 3D geometry.
 * Shared meshes/materials are owned by this module, not by individual instances.
 */
export const ASSET_VERSION = '1.2.0';
export const PLANT_IDS = ['moss','moonflower','fern','bluebell','pumpkin','starcap','lavender','lotus'];
export const DECORATION_IDS = ['planter','lantern','bench','arch','birdbath','windchime','pond','stones','fence','table','moonstand','garland'];
export const DISCOVERY_IDS = ['dew','snail','seedwing','leafprint','shellspiral','waterbeetle','roundstone','reed','mica','moth','quartz','lichen'];
export const PALETTE = Object.freeze({ moss:0x769959,leaf:0x507a4a,dark:0x355744,cream:0xf2e7c7,moon:0xa6cbd2,blue:0x7a9fbc,wood:0x9e7854,bark:0x665845,soil:0x75604b,stone:0x9daca3,gold:0xe4bf72,pink:0xd7a7b9,purple:0xa4a1c6,water:0x739da6 });
const geometryCache = new Map();
const modelCache = new Map();
const colorCache = new Map();
const solidMaterial = new THREE.MeshStandardMaterial({name:'handmade-matte-pbr',color:0xffffff,vertexColors:true,roughness:.87,metalness:.035,flatShading:true});
const glowMaterial = new THREE.MeshStandardMaterial({name:'warm-lantern-glass',color:0xffe2a0,roughness:.38,metalness:.05,emissive:0xf2bd69,emissiveIntensity:.4});
function color(c){if(!colorCache.has(c))colorCache.set(c,new THREE.Color(c));return colorCache.get(c);}
function closedCap(widthSegments=10,heightSegments=6){const g=new THREE.SphereGeometry(1,widthSegments,heightSegments),p=g.attributes.position;for(let i=0;i<p.count;i++)if(p.getY(i)<0)p.setY(i,p.getY(i)*.08);g.computeVertexNormals();return g;}
// Grid objects can repeat 64 times in both main and shadow passes. Preserve each
// authored component and its extent while lowering only its surface subdivision.
function matchPrimitiveBounds(g,reference){g.computeBoundingBox();reference.computeBoundingBox();const scale=reference.boundingBox.getSize(new THREE.Vector3()).divide(g.boundingBox.getSize(new THREE.Vector3()));g.scale(scale.x,scale.y,scale.z);g.computeBoundingBox();return g;}
function gable(){const s=new THREE.Shape();s.moveTo(-.5,0);s.lineTo(.5,0);s.lineTo(0,1);s.closePath();const g=new THREE.ExtrudeGeometry(s,{depth:1,bevelEnabled:false});g.translate(0,0,-.5);return g;}
function geometry(kind){
  if(!geometryCache.has(kind)){
    const g=kind==='grid-sphere'?matchPrimitiveBounds(new THREE.IcosahedronGeometry(1,0),geometry('sphere')):kind==='grid-leaf'?new THREE.OctahedronGeometry(1,0):kind==='grid-cap'?matchPrimitiveBounds(closedCap(8,4),geometry('hemisphere')):kind==='sphere'?new THREE.IcosahedronGeometry(1,1):kind==='pebble'?new THREE.IcosahedronGeometry(1,0):kind==='box'?new THREE.BoxGeometry(1,1,1):kind==='cylinder'?new THREE.CylinderGeometry(1,1,1,8):kind==='hex-cylinder'?new THREE.CylinderGeometry(1,1,1,6):kind==='cone'?new THREE.ConeGeometry(1,1,8):kind==='hex-cone'?new THREE.ConeGeometry(1,1,6):kind==='torus'?new THREE.TorusGeometry(1,.13,5,16):kind==='hemisphere'?closedCap():kind==='gable'?gable():new THREE.CylinderGeometry(.68,1,1,10);
    geometryCache.set(kind,g);
  }return geometryCache.get(kind);
}
function part(group,kind,c,p=[0,0,0],s=[1,1,1],r=[0,0,0],bone=0){
  if(group.userData.gridPlaceable){if(kind==='sphere')kind='grid-sphere';else if(kind==='hemisphere')kind='grid-cap';}
  const mesh=new THREE.Mesh(geometry(kind));mesh.position.set(...p);mesh.scale.set(...s);mesh.rotation.set(...r);mesh.userData.paint=c;mesh.userData.bone=bone;group.add(mesh);return mesh;
}
function ball(g,c,p,s,r,b){return part(g,'sphere',c,p,s,r,b);}
function box(g,c,p,s,r,b){return part(g,'box',c,p,s,r,b);}
function rod(g,c,a,b,width=.03,bone=0){const dir=new THREE.Vector3().fromArray(b).sub(new THREE.Vector3().fromArray(a));const m=part(g,'cylinder',c,new THREE.Vector3().fromArray(a).add(new THREE.Vector3().fromArray(b)).multiplyScalar(.5).toArray(),[width,dir.length(),width],[0,0,0],bone);m.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),dir.normalize());return m;}
function leaf(g,c,x,y,z,angle=0,size=.19){return part(g,g.userData.gridPlaceable?'grid-leaf':'sphere',c,[x,y,z],[size,.035,size*.45],[.3,angle,.3]);}
function petals(g,c,center,radius=.14,count=5){for(let k=0;k<count;k++){const a=k*Math.PI*2/count;ball(g,c,[center[0]+Math.cos(a)*radius*.65,center[1],center[2]+Math.sin(a)*radius*.65],[radius,.045,radius*.48],[0,-a,0]);}ball(g,PALETTE.gold,[center[0],center[1]+.025,center[2]],[radius*.3,.035,radius*.3]);}
/** Collapse procedural primitives into one vertex-coloured mesh. A single material
 * keeps 64 garden tiles inexpensive while preserving real geometry and normals. */
function mergedGeometry(group,skinned=false){
  group.updateMatrixWorld(true);const pos=[],norm=[],col=[],uv=[],skinIndex=[],skinWeight=[];
  group.traverse(mesh=>{if(!mesh.isMesh)return;let g=mesh.geometry.index?mesh.geometry.toNonIndexed():mesh.geometry.clone();g.applyMatrix4(mesh.matrixWorld);const p=g.attributes.position,n=g.attributes.normal,u=g.attributes.uv,c=color(mesh.userData.paint||PALETTE.cream);for(let i=0;i<p.count;i++){pos.push(p.getX(i),p.getY(i),p.getZ(i));norm.push(n.getX(i),n.getY(i),n.getZ(i));col.push(c.r,c.g,c.b);uv.push(u?u.getX(i):0,u?u.getY(i):0);if(skinned){skinIndex.push(mesh.userData.bone||0,0,0,0);skinWeight.push(1,0,0,0);}}g.dispose();});
  const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(pos,3));g.setAttribute('normal',new THREE.Float32BufferAttribute(norm,3));g.setAttribute('color',new THREE.Float32BufferAttribute(col,3));g.setAttribute('uv',new THREE.Float32BufferAttribute(uv,2));if(skinned){g.setAttribute('skinIndex',new THREE.Uint16BufferAttribute(skinIndex,4));g.setAttribute('skinWeight',new THREE.Float32BufferAttribute(skinWeight,4));}g.computeBoundingBox();g.computeBoundingSphere();return g;
}
function staticModel(id,builder,collider,extra={}){
  if(!modelCache.has(id)){const raw=new THREE.Group();raw.userData.gridPlaceable=id.startsWith('plant-')||id.startsWith('decoration-');builder(raw);modelCache.set(id,mergedGeometry(raw));}
  const group=new THREE.Group();group.name=id;const mesh=new THREE.Mesh(modelCache.get(id),solidMaterial);mesh.name=id+'-visual';mesh.castShadow=true;mesh.receiveShadow=true;group.add(mesh);group.userData={assetId:'moss-and-moon.'+id,version:ASSET_VERSION,collider:structuredClone(collider),...extra};return group;
}
const cylinderCollider=(radius,height)=>({type:'cylinder',radius,height,center:[0,height/2,0]});
const boxCollider=(x,y,z)=>({type:'box',size:[x,y,z],center:[0,y/2,0]});

export function createPlant(id='moss',stage=3){
  if(!PLANT_IDS.includes(id))throw new Error('Unknown plant: '+id);stage=Math.max(0,Math.min(3,Math.floor(stage)));
  const h=[.13,.28,.5,.72][stage];
  return staticModel('plant-'+id+'-'+stage,g=>{
    // Pebbly seed collar is visible in every state, clarifying occupied garden tiles.
    part(g,'cylinder',PALETTE.soil,[0,.025,0],[.16,.05,.16]);
    if(stage===0){
      const seedColour={moss:PALETTE.moss,moonflower:PALETTE.cream,fern:PALETTE.dark,bluebell:PALETTE.blue,pumpkin:PALETTE.gold,starcap:PALETTE.purple,lavender:PALETTE.purple,lotus:PALETTE.pink}[id];
      ball(g,seedColour,[0,.075,0],[id==='pumpkin'?.065:.045,.045,.035]);
      if(id==='moss'){for(let k=0;k<4;k++){const a=k*1.57;ball(g,PALETTE.moss,[Math.cos(a)*.055,.075,Math.sin(a)*.055],[.038,.03,.035]);}}
      else if(id==='starcap'){for(let k=0;k<3;k++){const a=k*2.1;ball(g,PALETTE.cream,[Math.cos(a)*.045,.08,Math.sin(a)*.045],[.018,.04,.018]);}}
      else {const count=id==='fern'||id==='lavender'?3:2;for(let k=0;k<count;k++){const a=k*Math.PI*2/count+.2;const size=id==='lotus'?.09:id==='lavender'?.055:id==='fern'?.065:.075;leaf(g,k%2?PALETTE.leaf:PALETTE.moss,Math.cos(a)*.045,.085+k*.012,Math.sin(a)*.045,a,size);}}
      return;
    }
    const young=stage===1, full=stage===3, scale=young?.58:stage===2?.8:1;
    if(id==='moss'){
      for(let k=0;k<(young?3:full?8:5);k++){const a=k*2.399,r=young?.07:.12+((k%2)*.05);ball(g,k%2?PALETTE.moss:PALETTE.leaf,[Math.cos(a)*r,.075+(k%3)*.025,Math.sin(a)*r],[.12,.09,.1]);}
      if(!young)for(let k=0;k<(full?5:2);k++){const a=k*2.4;rod(g,PALETTE.leaf,[Math.cos(a)*.15,.08,Math.sin(a)*.15],[Math.cos(a)*.17,.3+(k%2)*.09,Math.sin(a)*.17],.009);ball(g,full?PALETTE.gold:PALETTE.moss,[Math.cos(a)*.17,.31+(k%2)*.09,Math.sin(a)*.17],[.025,.04,.025]);}
    }else if(id==='fern'){
      for(let k=0;k<(young?3:full?7:5);k++){const a=k*2.399;const end=[Math.cos(a)*.3*scale,.44*scale,Math.sin(a)*.3*scale];rod(g,PALETTE.dark,[0,.04,0],end,.013);for(let j=1;j<5;j++){const t=j/5;for(const side of [-1,1]){leaf(g,k%2?PALETTE.moss:PALETTE.leaf,end[0]*t+Math.cos(a+1.57)*side*.085*scale,end[1]*t+.025,end[2]*t+Math.sin(a+1.57)*side*.085*scale,a+side*.7,(.13-j*.015)*scale);}}}
    }else if(id==='starcap'){
      for(let k=0;k<(young?1:full?4:2);k++){const a=k*2.399,r=k? .19:0;const x=Math.cos(a)*r,z=Math.sin(a)*r,y=(.25+(k%2)*.12)*scale;rod(g,PALETTE.cream,[x,.04,z],[x,y,z],.035);part(g,'hemisphere',k%2?PALETTE.purple:PALETTE.blue,[x,y,z],[.15*scale,.095*scale,.15*scale]);if(full)for(let j=0;j<4;j++){const t=j*1.57;ball(g,PALETTE.cream,[x+Math.cos(t)*.075,y+.07,z+Math.sin(t)*.075],[.018,.012,.018]);}}
    }else if(id==='pumpkin'){
      for(let k=0;k<(young?3:5);k++){const a=k*1.256;leaf(g,k%2?PALETTE.leaf:PALETTE.moss,Math.cos(a)*.18*scale,.08,Math.sin(a)*.18*scale,a,.17*scale);}
      rod(g,PALETTE.dark,[0,.06,0],[.03,.22*scale,.02],.02);
      if(full){for(let k=0;k<8;k++){const a=k*Math.PI/4;ball(g,k%2?0xd1aa64:0xe3bd77,[Math.cos(a)*.11,.2,Math.sin(a)*.11],[.105,.16,.105]);}rod(g,PALETTE.wood,[0,.31,0],[.025,.4,.01],.03);}else if(!young)petals(g,PALETTE.gold,[0,.23,0],.075);
    }else if(id==='lotus'){
      for(let k=0;k<(young?2:3);k++){const a=k*2.1;ball(g,PALETTE.moss,[Math.cos(a)*.14,.06,Math.sin(a)*.14],[.19*scale,.028,.16*scale],[0,a,0]);}
      rod(g,PALETTE.leaf,[0,.05,0],[0,.42*scale,0],.018);
      if(full){for(let tier=0;tier<2;tier++)for(let k=0;k<7;k++){const a=k*Math.PI*2/7+tier*.4;ball(g,tier?PALETTE.cream:PALETTE.pink,[Math.cos(a)*(.10-tier*.03),.42+tier*.025,Math.sin(a)*(.10-tier*.03)],[.085,.11,.035],[.4,-a,Math.cos(a)*.45]);}ball(g,PALETTE.gold,[0,.45,0],[.04,.025,.04]);}else ball(g,PALETTE.pink,[0,.42*scale,0],[.045,.075,.045]);
    }else{
      const count=id==='lavender'?(young?2:full?6:4):id==='bluebell'?(young?1:full?4:2):young?1:full?3:2;
      for(let k=0;k<count;k++){const a=k*2.399,r=k?.11:0;const x=Math.cos(a)*r,z=Math.sin(a)*r,y=(id==='lavender'?.55:.48)+(k%2)*.12;rod(g,PALETTE.leaf,[x*.5,.035,z*.5],[x,y*scale,z],.014);for(let t=0;t<2;t++)leaf(g,PALETTE.moss,x+(t?-.075:.075),(.14+t*.13)*scale,z,a+t*1.6,.12*scale);
        if(id==='lavender'){for(let j=0;j<(full?4:young?1:2);j++){const yy=(y-.10+j*.05)*scale;ball(g,j%2?PALETTE.purple:0x8d94b7,[x,yy,z],[.05*scale,.045,.05*scale]);}}
        else if(id==='bluebell'){rod(g,PALETTE.leaf,[x,y*scale,z],[x+.07,(y-.025)*scale,z],.012);part(g,'cone',full?PALETTE.blue:PALETTE.moss,[x+.07,(y-.055)*scale,z],[.07*scale,.12*scale,.07*scale],[0,0,Math.PI]);if(full)ball(g,PALETTE.cream,[x+.07,(y-.10)*scale,z],[.055,.015,.055]);}
        else if(full)petals(g,PALETTE.cream,[x,y,z],.115,6);else ball(g,young?PALETTE.moss:PALETTE.cream,[x,y*scale,z],[.04,.07,.04]);
      }
    }
  },cylinderCollider(.30,h),{plantId:id,stage,lod:'shared closed 3D geometry; 20-triangle rounded parts, 8-triangle leaves, 48-triangle mushroom caps; all authored components retained'});
}

function quat(axis,angle){return new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(...axis),angle).toArray();}
function rotationTrack(name,times,angles,axis=[1,0,0]){return new THREE.QuaternionKeyframeTrack(name+'.quaternion',times,angles.flatMap(a=>quat(axis,a)));}
function makeClips(){
  return [
    new THREE.AnimationClip('idle',3,[rotationTrack('torso',[0,1.5,3],[0,.018,0]),rotationTrack('head',[0,1.5,3],[-.025,.025,-.025],[0,1,0])]),
    new THREE.AnimationClip('walk',.7,[rotationTrack('leg-left',[0,.35,.7],[-.45,.45,-.45]),rotationTrack('leg-right',[0,.35,.7],[.45,-.45,.45]),rotationTrack('arm-left',[0,.35,.7],[.25,-.25,.25]),rotationTrack('arm-right',[0,.35,.7],[-.25,.25,-.25])]),
    new THREE.AnimationClip('plant',1.2,[rotationTrack('torso',[0,.4,.85,1.2],[0,.65,.65,0]),rotationTrack('arm-right',[0,.4,.85,1.2],[0,-.7,-1,0])]),
    new THREE.AnimationClip('water',1.4,[rotationTrack('arm-right',[0,.35,1.05,1.4],[0,-1.1,-1.1,0]),rotationTrack('head',[0,.35,1.05,1.4],[0,.25,.25,0])]),
    new THREE.AnimationClip('harvest',1.3,[rotationTrack('torso',[0,.35,.8,1.3],[0,.5,.15,0]),rotationTrack('arm-left',[0,.35,.8,1.3],[0,-.65,-1.2,0]),rotationTrack('arm-right',[0,.35,.8,1.3],[0,-.65,-1.2,0])]),
    new THREE.AnimationClip('celebrate',1.8,[rotationTrack('arm-left',[0,.4,.9,1.4,1.8],[0,2.4,2.2,2.4,0],[0,0,1]),rotationTrack('arm-right',[0,.4,.9,1.4,1.8],[0,-2.4,-2.2,-2.4,0],[0,0,1]),rotationTrack('head',[0,.4,.9,1.4,1.8],[0,-.15,.15,-.15,0],[0,1,0])]),
    new THREE.AnimationClip('interact',1.4,[rotationTrack('arm-right',[0,.3,.65,1,1.4],[0,-1.7,-1.9,-1.7,0],[0,0,1]),rotationTrack('head',[0,.5,1.4],[0,.12,0])])
  ];
}
export function createCharacter(index=0){
  index=Math.max(0,Math.min(6,Math.floor(index)));const id=index?'resident-'+index:'gardener';
  if(!modelCache.has(id)){
    const g=new THREE.Group(),cloth=[PALETTE.moss,PALETTE.blue,PALETTE.pink,PALETTE.gold,PALETTE.purple,PALETTE.cream,0x9bb6a4][index],skin=[0xe8c69c,0xb78764,0xe2b994,0xcca47d,0xf0ceb0,0x9b7459,0xe5bb94][index],hair=[0x675744,0x514b42,0x806551,0xaaa99a,0x4b5147,0xd0c6aa,0x785648][index];
    // Bone 0 root, 1 hips, 2 torso, 3 head, 4/5 arms, 6/7 legs.
    ball(g,cloth,[0,.68,0],[.205,.285,.14],[0,0,0],2);part(g,'cone',cloth,[0,.52,0],[.23,.28,.17],[0,0,0],1);
    box(g,PALETTE.cream,[0,.66,.13],[.23,.26,.025],[0,0,0],2);box(g,PALETTE.wood,[0,.56,.155],[.11,.08,.025],[0,0,0],2);
    ball(g,skin,[0,1.03,0],[.205,.215,.18],[0,0,0],3);ball(g,hair,[0,1.12,-.035],[.211,.15,.173],[0,0,0],3);
    ball(g,skin,[-.2,1.02,0],[.035,.06,.035],[0,0,0],3);ball(g,skin,[.2,1.02,0],[.035,.06,.035],[0,0,0],3);
    for(const sign of [-1,1]){const bone=sign<0?4:5;ball(g,cloth,[sign*.255,.73,0],[.075,.17,.075],[0,0,sign*.12],bone);ball(g,skin,[sign*.275,.56,.015],[.058,.066,.058],[0,0,0],bone);ball(g,PALETTE.dark,[sign*.09,.29,0],[.075,.18,.08],[0,0,0],sign<0?6:7);ball(g,PALETTE.bark,[sign*.095,.09,.04],[.085,.085,.13],[0,0,0],sign<0?6:7);ball(g,0x35463f,[sign*.069,1.04,.165],[.018,.026,.012],[0,0,0],3);ball(g,0xd7a197,[sign*.12,.995,.153],[.032,.018,.012],[0,0,0],3);}
    ball(g,skin,[0,1,.183],[.025,.025,.035],[0,0,0],3);box(g,0x8c6555,[0,.96,.169],[.045,.012,.009],[0,0,0],3);
    if(index===0||index===3){part(g,'cylinder',PALETTE.cream,[0,1.22,0],[.3,.045,.26],[0,0,0],3);part(g,'cone',PALETTE.cream,[0,1.3,0],[.20,.2,.18],[0,0,0],3);part(g,'cylinder',cloth,[0,1.25,0],[.205,.04,.185],[0,0,0],3);leaf(g,PALETTE.leaf,.18,1.26,.1,.4,.1).userData.bone=3;}
    else if(index===1){part(g,'cone',cloth,[0,1.3,0],[.22,.26,.2],[0,0,.15],3);ball(g,PALETTE.gold,[.03,1.43,0],[.05,.05,.05],[0,0,0],3);}
    else if(index===2){ball(g,hair,[-.2,1.06,-.05],[.09,.18,.09],[0,0,.2],3);ball(g,hair,[.2,1.06,-.05],[.09,.18,.09],[0,0,-.2],3);petals(g,PALETTE.cream,[.15,1.23,.06],.055,5);for(const m of g.children.slice(-6))m.userData.bone=3;}
    else if(index===4){part(g,'torus',PALETTE.gold,[-.075,1.05,.18],[.045,.045,.045],[0,0,0],3);part(g,'torus',PALETTE.gold,[.075,1.05,.18],[.045,.045,.045],[0,0,0],3);box(g,PALETTE.gold,[0,1.05,.18],[.07,.009,.009],[0,0,0],3);}
    else if(index===5){ball(g,hair,[0,.94,.11],[.15,.13,.09],[0,0,0],3);}
    else if(index===6){part(g,'cylinder',PALETTE.moss,[0,1.22,0],[.24,.055,.21],[0,0,0],3);}
    modelCache.set(id,mergedGeometry(g,true));
  }
  const group=new THREE.Group();group.name=id;const bones=Array.from({length:8},()=>new THREE.Bone());
  ['root','hips','torso','head','arm-left','arm-right','leg-left','leg-right'].forEach((n,i)=>bones[i].name=n);
  bones[0].add(bones[1]);bones[1].position.y=.5;bones[1].add(bones[2],bones[6],bones[7]);bones[2].position.y=.15;bones[2].add(bones[3],bones[4],bones[5]);bones[3].position.y=.25;bones[4].position.set(-.23,.14,0);bones[5].position.set(.23,.14,0);bones[6].position.set(-.09,-.03,0);bones[7].position.set(.09,-.03,0);
  const mesh=new THREE.SkinnedMesh(modelCache.get(id),solidMaterial);mesh.name=id+'-skin';mesh.castShadow=true;mesh.receiveShadow=true;mesh.add(bones[0]);mesh.bind(new THREE.Skeleton(bones));group.add(mesh);group.animations=makeClips().filter(clip=>index===0||clip.name==='idle'||clip.name==='interact');
  group.userData={assetId:'moss-and-moon.'+id,version:ASSET_VERSION,characterIndex:index,collider:cylinderCollider(.23,1.45),clipNames:group.animations.map(c=>c.name),skeleton:{bones:bones.map(b=>b.name),rootMotion:false,retarget:'moss-humanoid-v1',bindPose:'standing, arms down, +Z forward'},animationEvents:{plant:[.85,'commit-visual'],water:[.35,'pour-visual'],harvest:[.8,'lift-visual']}};
  Object.defineProperty(group.userData,'clips',{value:group.animations,enumerable:false});Object.defineProperty(group.userData,'bones',{value:bones,enumerable:false});return group;
}

export function createDecoration(id='lantern'){
  if(!DECORATION_IDS.includes(id))throw new Error('Unknown decoration: '+id);
  const size={planter:[.7,.65,.65],lantern:[.32,1.2,.32],bench:[.85,.65,.5],arch:[.88,1.7,.3],birdbath:[.65,.8,.65],windchime:[.65,1.5,.35],pond:[.8,.18,.8],stones:[.7,.12,.7],fence:[.85,.6,.18],table:[.8,.6,.65],moonstand:[.5,1.3,.5],garland:[.88,1.2,.25]}[id];
  const group=staticModel('decoration-'+id,g=>{
    if(id==='planter'){part(g,'pot',0xb58b72,[0,.21,0],[.29,.4,.26]);part(g,'cylinder',PALETTE.cream,[0,.41,0],[.3,.07,.27]);part(g,'cylinder',PALETTE.soil,[0,.44,0],[.26,.02,.23]);for(let k=0;k<4;k++){const a=k*1.57;rod(g,PALETTE.leaf,[Math.cos(a)*.1,.44,Math.sin(a)*.1],[Math.cos(a)*.14,.68,Math.sin(a)*.14],.014);petals(g,k%2?PALETTE.pink:PALETTE.cream,[Math.cos(a)*.14,.68,Math.sin(a)*.14],.065);}}
    if(id==='lantern'){part(g,'cylinder',PALETTE.stone,[0,.06,0],[.2,.12,.2]);rod(g,PALETTE.wood,[0,.12,0],[0,1.05,0],.04);rod(g,PALETTE.wood,[0,1.05,0],[.15,1.05,0],.025);box(g,PALETTE.gold,[.15,.84,0],[.19,.24,.19]);for(const x of [.055,.245])for(const z of [-.095,.095])rod(g,PALETTE.dark,[x,.7,z],[x,.97,z],.012);part(g,'cone',PALETTE.dark,[.15,1,0],[.18,.13,.18]);box(g,PALETTE.dark,[.15,.69,0],[.24,.04,.24]);}
    if(id==='bench'){for(const x of [-.32,.32]){box(g,PALETTE.wood,[x,.22,0],[.065,.44,.35]);box(g,PALETTE.wood,[x,.48,-.16],[.065,.5,.055]);}for(const z of [-.13,0,.13])box(g,PALETTE.cream,[0,.44,z],[.88,.06,.11]);for(const y of [.57,.69])box(g,PALETTE.cream,[0,y,-.19],[.88,.09,.055]);}
    if(id==='arch'){for(const x of [-.37,.37]){box(g,PALETTE.cream,[x,.72,0],[.075,1.44,.15]);box(g,PALETTE.stone,[x,.08,0],[.16,.16,.25]);}const curve=[];for(let i=0;i<9;i++)curve.push([Math.cos(Math.PI-i*Math.PI/8)*.37,1.37+Math.sin(Math.PI-i*Math.PI/8)*.28,0]);for(let i=1;i<curve.length;i++)rod(g,PALETTE.cream,curve[i-1],curve[i],.05);for(let k=0;k<7;k++){const a=k*.5;leaf(g,PALETTE.moss,Math.cos(a)*.37,1.4+Math.sin(a)*.25,.04,a,.13);if(k%2===0)petals(g,PALETTE.pink,[Math.cos(a)*.37,1.4+Math.sin(a)*.25,.07],.055);}}
    if(id==='birdbath'){part(g,'pot',PALETTE.stone,[0,.12,0],[.23,.24,.23]);part(g,'cylinder',PALETTE.cream,[0,.42,0],[.085,.6,.085]);part(g,'pot',PALETTE.stone,[0,.7,0],[.32,.14,.32]);part(g,'cylinder',PALETTE.water,[0,.78,0],[.27,.015,.27]);ball(g,PALETTE.blue,[.24,.84,0],[.075,.06,.055]);part(g,'cone',PALETTE.gold,[.31,.85,0],[.02,.06,.02],[0,0,-Math.PI/2]);}
    if(id==='windchime'){part(g,'cylinder',PALETTE.stone,[0,.045,0],[.17,.09,.17]);rod(g,PALETTE.wood,[0,.09,0],[0,1.4,0],.035);rod(g,PALETTE.wood,[0,1.4,0],[.28,1.4,0],.025);for(let k=0;k<3;k++){const x=.13+k*.07;rod(g,PALETTE.cream,[x,1.4,0],[x,1.19-k*.05,0],.008);part(g,'cylinder',k%2?PALETTE.gold:PALETTE.moon,[x,1.06-k*.05,0],[.022,.25,.022]);}}
    if(id==='pond'){for(let k=0;k<11;k++){const a=k*Math.PI*2/11;ball(g,k%2?PALETTE.stone:PALETTE.dark,[Math.cos(a)*.31,.09,Math.sin(a)*.3],[.12,.09,.1]);}part(g,'cylinder',PALETTE.water,[0,.07,0],[.31,.07,.29]);ball(g,PALETTE.moss,[.1,.115,.08],[.12,.018,.09]);petals(g,PALETTE.cream,[.1,.14,.08],.045);}
    if(id==='stones'){for(let k=0;k<5;k++){const a=k*2.4;ball(g,k%2?PALETTE.stone:PALETTE.cream,[Math.cos(a)*.19,.04,Math.sin(a)*.19],[.15,.065,.12],[0,a,0]);}}
    if(id==='fence'){for(const x of [-.35,0,.35]){box(g,PALETTE.cream,[x,.3,0],[.075,.6,.075]);part(g,'cone',PALETTE.moss,[x,.63,0],[.07,.08,.07],[0,Math.PI/4,0]);}for(const y of [.2,.45])box(g,PALETTE.wood,[0,y,0],[.85,.065,.055]);}
    if(id==='table'){for(const x of [-.29,.29])for(const z of [-.22,.22])box(g,PALETTE.wood,[x,.27,z],[.06,.54,.06]);box(g,PALETTE.cream,[0,.56,0],[.8,.07,.65]);box(g,PALETTE.blue,[0,.605,0],[.22,.018,.66]);for(const x of [-.23,.23]){part(g,'cylinder',PALETTE.cream,[x,.62,0],[.09,.025,.09]);ball(g,PALETTE.gold,[x,.66,0],[.065,.035,.065]);}part(g,'pot',PALETTE.pink,[0,.67,0],[.05,.1,.05]);}
    if(id==='moonstand'){part(g,'cylinder',PALETTE.stone,[0,.07,0],[.24,.14,.24]);part(g,'cylinder',PALETTE.cream,[0,.47,0],[.1,.8,.1]);part(g,'cylinder',PALETTE.gold,[0,.91,0],[.2,.08,.2]);for(let k=0;k<9;k++){const a=-Math.PI*.65+k*Math.PI*1.3/8;ball(g,PALETTE.moon,[Math.cos(a)*.16,1.15+Math.sin(a)*.16,0],[.055,.055,.055]);}ball(g,PALETTE.gold,[.06,1.17,.01],[.045,.045,.045]);}
    if(id==='garland'){for(const x of [-.38,.38]){part(g,'cylinder',PALETTE.stone,[x,.05,0],[.11,.1,.11]);rod(g,PALETTE.wood,[x,.06,0],[x,1.15,0],.025);ball(g,PALETTE.gold,[x,1.16,0],[.045,.045,.045]);}for(let k=0;k<6;k++){const x=-.38+k*.152,y=1.1-Math.sin(k*Math.PI/5)*.12;if(k)rod(g,PALETTE.cream,[x-.152,1.1-Math.sin((k-1)*Math.PI/5)*.12,0],[x,y,0],.009);part(g,'cone',k%2?PALETTE.blue:PALETTE.pink,[x,y-.09,0],[.065,.14,.025],[0,0,Math.PI]);}}
  },boxCollider(...size),{decorationId:id,lod:'shared closed 3D geometry; 20-triangle rounded parts and 8-triangle leaves; all authored components retained'});
  if(id==='lantern'){const glow=new THREE.Mesh(geometry('sphere'),glowMaterial);glow.name='lantern-glow';glow.position.set(.15,.84,0);glow.scale.set(.055,.085,.055);group.add(glow);}
  return group;
}

export function createHouse(){return staticModel('moon-cottage',g=>{
  box(g,PALETTE.stone,[0,.12,0],[2.7,.24,2.35]);box(g,PALETTE.cream,[0,.95,0],[2.35,1.7,1.9]);
  part(g,'gable',PALETTE.cream,[0,1.65,0],[2.35,.67,1.9]);
  // Gable built as closed triangular prism, with a visible ridge and roof tiles.
  for(const sign of [-1,1]){box(g,PALETTE.dark,[sign*.67,1.98,0],[1.65,.13,2.35],[0,0,-sign*.47]);for(let j=0;j<5;j++)box(g,j%2?PALETTE.moss:PALETTE.leaf,[sign*.67,2.01,-1+j*.5],[1.68,.06,.38],[0,0,-sign*.47]);}
  part(g,'cylinder',PALETTE.wood,[0,2.37,0],[.085,2.45,.085],[Math.PI/2,0,0]);box(g,PALETTE.bark,[0,.58,1.005],[.59,1.05,.1]);box(g,PALETTE.wood,[0,.58,1.065],[.47,.94,.03]);ball(g,PALETTE.gold,[.16,.56,1.1],[.035,.035,.025]);
  for(const x of [-.77,.77]){box(g,PALETTE.wood,[x,1.02,1.015],[.57,.59,.08]);box(g,PALETTE.moon,[x,1.02,1.065],[.43,.45,.025]);box(g,PALETTE.cream,[x,1.02,1.09],[.04,.49,.025]);box(g,PALETTE.cream,[x,1.02,1.09],[.47,.04,.025]);box(g,PALETTE.wood,[x,.73,1.1],[.62,.065,.22]);}
  box(g,PALETTE.wood,[1.18,1.03,0],[.08,.6,.6]);box(g,PALETTE.moon,[1.225,1.03,0],[.02,.45,.45]);box(g,PALETTE.wood,[-1.18,1.03,0],[.08,.6,.6]);box(g,PALETTE.moon,[-1.225,1.03,0],[.02,.45,.45]);box(g,PALETTE.stone,[0,.13,1.35],[.85,.16,.6]);box(g,PALETTE.stone,[.7,2.14,-.5],[.3,.75,.35]);box(g,PALETTE.cream,[.7,2.53,-.5],[.4,.12,.45]);
},boxCollider(2.7,2.6,2.4),{entrance:[0,0,1.7],gridSnap:.5,lod:'1 merged mesh; 1 draw call'});}

export function createTree(kind='oak'){
  kind=['oak','willow','pine','birch'].includes(kind)?kind:'oak';return staticModel('tree-'+kind,g=>{
    part(g,'cone',kind==='birch'?PALETTE.cream:PALETTE.bark,[0,.8,0],[.16,1.6,.15]);
    if(kind==='pine'){for(let k=0;k<3;k++)part(g,'cone',k%2?PALETTE.moss:PALETTE.leaf,[0,1.1+k*.5,0],[.75-k*.13,1.15,.75-k*.13]);}
    else {for(let k=0;k<5;k++){const a=k*2.399,x=Math.cos(a)*.45,z=Math.sin(a)*.45;rod(g,PALETTE.bark,[0,.85,0],[x,1.5,z],.055);ball(g,k%2?PALETTE.moss:PALETTE.leaf,[x,1.7+(k%2)*.2,z],[.58,.57,.55]);if(kind==='willow')for(let j=0;j<3;j++)ball(g,j%2?PALETTE.leaf:PALETTE.moss,[x+Math.cos(j*2.1)*.28,1.25,z+Math.sin(j*2.1)*.28],[.13,.65,.13]);}ball(g,PALETTE.moss,[0,2.15,0],[.6,.5,.55]);}
    for(let k=0;k<5;k++){const a=k*1.256;rod(g,PALETTE.bark,[0,.18,0],[Math.cos(a)*.3,.035,Math.sin(a)*.3],.045);}
  },cylinderCollider(.22,2.7),{treeKind:kind,lod:'shared geometry; renderer may distance-cull canopy shadows'});
}
export function createRock(){return staticModel('moss-rock',g=>{ball(g,PALETTE.stone,[0,.22,0],[.43,.3,.34],[.12,.4,.1]);ball(g,PALETTE.moss,[-.08,.43,.03],[.25,.06,.23]);for(let k=0;k<3;k++)ball(g,PALETTE.leaf,[-.22+k*.1,.4,.12],[.09,.055,.07]);},cylinderCollider(.4,.5));}

export function createTool(kind='watering-can'){
  const aliases={water:'watering-can',watering:'watering-can',plant:'trowel',harvest:'basket',hoe:'hoe'};kind=aliases[kind]||kind;
  if(!['watering-can','trowel','basket','hoe','seed-pouch'].includes(kind))kind='trowel';
  return staticModel('tool-'+kind,g=>{
    if(kind==='watering-can'){part(g,'cylinder',PALETTE.blue,[0,.16,0],[.16,.28,.13]);part(g,'cylinder',PALETTE.cream,[0,.31,0],[.13,.025,.11]);rod(g,PALETTE.blue,[.1,.15,0],[.35,.28,0],.035);part(g,'cylinder',PALETTE.cream,[.36,.3,0],[.065,.04,.065],[0,0,-.9]);part(g,'torus',PALETTE.wood,[-.16,.2,0],[.11,.11,.11],[0,0,0]);}
    if(kind==='trowel'){rod(g,PALETTE.wood,[0,.14,0],[0,.4,0],.035);ball(g,PALETTE.stone,[0,.1,0],[.065,.12,.025]);}
    if(kind==='hoe'){rod(g,PALETTE.wood,[0,.06,0],[0,.7,0],.022);box(g,PALETTE.stone,[.08,.07,0],[.22,.04,.15]);}
    if(kind==='basket'){part(g,'pot',PALETTE.wood,[0,.12,0],[.2,.24,.16]);part(g,'torus',PALETTE.cream,[0,.27,0],[.19,.19,.16],[0,0,0]);for(let j=0;j<3;j++)part(g,'cylinder',PALETTE.gold,[0,.05+j*.07,0],[.205-j*.015,.018,.165-j*.012]);}
    if(kind==='seed-pouch'){ball(g,PALETTE.cream,[0,.12,0],[.12,.14,.085]);part(g,'cylinder',PALETTE.wood,[0,.23,0],[.06,.035,.04]);ball(g,PALETTE.moss,[0,.13,.08],[.045,.05,.012]);}
  },boxCollider(.4,.7,.3),{toolKind:kind,attachment:'arm-right',attachmentLocal:[0,-.18,.06]});
}

export function createTerrain(kind='forest'){
  kind=['forest','brook','hill'].includes(kind)?kind:'forest';return staticModel('terrain-'+kind,g=>{
    box(g,kind==='brook'?0x91a69a:PALETTE.moss,[0,-.11,0],[2,.22,2]);box(g,PALETTE.soil,[0,-.25,0],[1.98,.18,1.98]);
    if(kind==='forest'){for(let k=0;k<7;k++){const a=k*2.399;ball(g,k%2?PALETTE.leaf:PALETTE.moss,[Math.cos(a)*.7,.04,Math.sin(a)*.7],[.22,.08,.2]);}for(let k=0;k<3;k++)box(g,PALETTE.wood,[-.65+k*.65,.04,-.45+k*.4],[.17,.04,.06],[0,k,0]);}
    if(kind==='brook'){box(g,PALETTE.water,[0,.018,0],[.64,.035,2]);for(let k=0;k<6;k++){const side=k%2?1:-1;ball(g,PALETTE.stone,[side*.48,.06,-.8+k*.31],[.18,.09,.15]);}box(g,PALETTE.wood,[0,.12,0],[.95,.1,.65]);for(let j=0;j<4;j++)box(g,PALETTE.cream,[-.36+j*.24,.18,0],[.2,.04,.63]);}
    if(kind==='hill'){ball(g,PALETTE.leaf,[0,-.03,0],[.86,.31,.84]);for(let k=0;k<5;k++){const a=k*1.26;part(g,'pebble',PALETTE.stone,[Math.cos(a)*.65,.11,Math.sin(a)*.65],[.17,.14,.16],[0,a,0]);}for(let k=0;k<4;k++){const a=k*1.57;rod(g,PALETTE.leaf,[Math.cos(a)*.3,.16,Math.sin(a)*.3],[Math.cos(a)*.32,.4,Math.sin(a)*.32],.01);petals(g,PALETTE.cream,[Math.cos(a)*.32,.42,Math.sin(a)*.32],.045);}}
  },{type:'terrain',size:[2,.5,2],walkable:true,gridSnap:2},{terrainKind:kind,connectors:[[1,0,0],[-1,0,0],[0,0,1],[0,0,-1]],lod:'2m tile; shared merged geometry'});
}

/** Twelve specific nature discoveries. These are tangible little specimens,
 * including full bodies, undersides, raised veins and shell/wing markings.
 * Waterbeetle is the stable content ID for a water strider (not a beetle).
 */
export function createDiscovery(id='dew'){
  if(!DISCOVERY_IDS.includes(id))throw new Error('Unknown discovery: '+id);
  const heights={dew:.38,snail:.7,seedwing:.4,leafprint:.38,shellspiral:.55,waterbeetle:.43,roundstone:.44,reed:.95,mica:.48,moth:.48,quartz:.88,lichen:.38};
  return staticModel('discovery-'+id,g=>{
    if(id==='dew'){
      ball(g,PALETTE.soil,[0,.075,0],[.4,.085,.32]);
      for(let k=0;k<8;k++){const a=k*2.399,r=k?.14+.06*(k%2):0,x=Math.cos(a)*r,z=Math.sin(a)*r,y=.14+(k%3)*.026;ball(g,k%2?PALETTE.moss:PALETTE.leaf,[x,y,z],[.16,.11,.13]);ball(g,PALETTE.moon,[x-.018,y+.105,z],[.034,.052,.034]);ball(g,PALETTE.cream,[x-.025,y+.13,z+.018],[.011,.014,.011]);}
    }
    if(id==='snail'){
      ball(g,0xb2b786,[0,.10,.025],[.19,.09,.39]);ball(g,0xc5c89b,[0,.19,.26],[.115,.14,.115]);ball(g,PALETTE.wood,[0,.36,-.1],[.27,.28,.25]);
      // A raised logarithmic spiral on both shell faces remains readable on rotation.
      const onShell=(angle,radius,side)=>{const y=Math.cos(angle)*radius,z=Math.sin(angle)*radius,x=side*(.27*Math.sqrt(Math.max(.02,1-(y/.28)**2-(z/.25)**2))+.009);return[x,.36+y,-.1+z];};
      for(const side of [-1,1])for(let k=1;k<31;k++){const t0=(k-1)/30,t1=k/30,a0=t0*Math.PI*4.4,a1=t1*Math.PI*4.4,r0=.225*(1-t0)+.015,r1=.225*(1-t1)+.015;rod(g,k%5<2?PALETTE.cream:PALETTE.gold,onShell(a0,r0,side),onShell(a1,r1,side),.017);}
      for(const side of [-1,1]){rod(g,0xb2b786,[side*.06,.27,.29],[side*.105,.44,.36],.013);ball(g,PALETTE.dark,[side*.105,.445,.36],[.023,.025,.023]);rod(g,0xb2b786,[side*.065,.18,.34],[side*.105,.20,.41],.009);}
      ball(g,PALETTE.cream,[0,.13,.375],[.027,.008,.013]);
    }
    if(id==='seedwing'){
      ball(g,PALETTE.moss,[0,.045,0],[.30,.045,.22]);
      for(const side of [-1,1]){ball(g,PALETTE.gold,[side*.055,.145,.055],[.07,.09,.055],[0,0,side*.2]);ball(g,side<0?PALETTE.cream:0xd1bc84,[side*.22,.245,-.04],[.27,.027,.105],[0,-side*.55,side*.28]);rod(g,PALETTE.wood,[side*.04,.18,.03],[side*.40,.29,-.14],.009);for(let j=1;j<4;j++){const t=j/4;rod(g,0xbba26f,[side*(.05+t*.33),.19+t*.10,.03-t*.16],[side*(.07+t*.32),.19+t*.10,.09-t*.10],.004);}}
      rod(g,PALETTE.wood,[0,.12,.04],[0,.31,.01],.012);
    }
    if(id==='leafprint'){
      ball(g,PALETTE.stone,[0,.17,0],[.42,.17,.33],[0,.25,0]);
      rod(g,0x687d67,[0,.345,-.22],[0,.345,.22],.013);
      for(let j=0;j<6;j++){const z=-.18+j*.065,length=.16-Math.abs(j-2.5)*.028;for(const side of [-1,1]){rod(g,0x687d67,[0,.346,z],[side*length,.328,z+.045],.012);for(let k=1;k<3;k++)rod(g,0x82917b,[side*length*k/3,.337,z+.045*k/3],[side*(length*k/3+.02),.333,z+.045*k/3-.025],.006);}}
    }
    if(id==='shellspiral'){
      ball(g,PALETTE.stone,[0,.055,0],[.32,.055,.27]);ball(g,PALETTE.cream,[0,.26,-.015],[.235,.225,.205]);
      for(let k=1;k<35;k++){const t0=(k-1)/34,t1=k/34,a0=t0*Math.PI*4.5,a1=t1*Math.PI*4.5,r0=.21*(1-t0)+.012,r1=.21*(1-t1)+.012;rod(g,k%5<2?PALETTE.gold:0xd7bea0,[Math.cos(a0)*r0,.26+Math.sin(a0)*r0,.18],[Math.cos(a1)*r1,.26+Math.sin(a1)*r1,.18],.019);}
      ball(g,PALETTE.cream,[.13,.13,.17],[.12,.11,.13],[.2,0,-.3]);ball(g,PALETTE.bark,[.15,.13,.278],[.068,.065,.017]);part(g,'torus',PALETTE.cream,[.15,.13,.28],[.078,.078,.055],[0,0,-.25]);
    }
    if(id==='waterbeetle'){
      part(g,'cylinder',PALETTE.water,[0,.025,0],[.46,.05,.42]);ball(g,PALETTE.dark,[0,.29,-.025],[.065,.065,.22]);ball(g,PALETTE.cream,[0,.346,-.04],[.015,.008,.16]);ball(g,PALETTE.dark,[0,.31,.205],[.055,.055,.055]);
      for(const side of [-1,1]){for(let j=0;j<3;j++){const z=.14-j*.14,tipZ=[.31,-.015,-.31][j];rod(g,PALETTE.moon,[side*.045,.29,z],[side*.23,.23,tipZ*.65],.009);rod(g,PALETTE.cream,[side*.23,.23,tipZ*.65],[side*.40,.065,tipZ],.008);ball(g,PALETTE.moon,[side*.40,.058,tipZ],[.034,.009,.025]);}rod(g,PALETTE.dark,[side*.025,.33,.24],[side*.075,.37,.34],.007);ball(g,PALETTE.gold,[side*.034,.34,.227],[.012,.012,.012]);}
      for(const side of [-1,1])part(g,'torus',PALETTE.moon,[side*.37,.055,-.015],[.075,.075,.075],[Math.PI/2,0,0]);
    }
    if(id==='roundstone'){
      ball(g,0xa6b7af,[0,.205,0],[.42,.20,.34],[.08,.12,.03]);
      const line=[[-.27,.33,-.13],[-.16,.388,-.07],[-.02,.408,0],[.12,.392,.07],[.25,.34,.13]];for(let k=1;k<line.length;k++)rod(g,PALETTE.cream,line[k-1],line[k],.009);
      ball(g,PALETTE.stone,[-.25,.045,.18],[.07,.04,.06]);
    }
    if(id==='reed'){
      ball(g,PALETTE.soil,[0,.045,0],[.30,.045,.24]);
      for(let k=0;k<3;k++){const x=(k-1)*.16,z=(k%2)*.09-.045,tip=.70+(k%2)*.14;rod(g,0x88975d,[x*.45,.045,z],[x,tip,z],.012);ball(g,PALETTE.cream,[x,tip+.035,z],[.055,.09,.05],[0,0,(k-1)*.13]);for(let j=0;j<4;j++){const y=.15+j*.105,side=j%2?-1:1;ball(g,j%2?PALETTE.moss:PALETTE.leaf,[x+side*.10,y,z],[.15,.012,.026],[0,j*.7,side*.55]);}}
    }
    if(id==='mica'){
      ball(g,PALETTE.stone,[0,.06,0],[.37,.06,.28]);
      for(let k=0;k<6;k++){const x=(k%3-1)*.055,z=(k%2-.5)*.065,y=.10+k*.052;part(g,'hex-cylinder',k%3===0?PALETTE.moon:k%3===1?PALETTE.cream:PALETTE.purple,[x,y,z],[.28,.035,.22],[.08*k,k*.15,.05*k]);}
      for(let j=0;j<3;j++)rod(g,0xe5e4dc,[-.19+j*.08,.421,-.11],[.08+j*.08,.421,.11],.006);
    }
    if(id==='moth'){
      ball(g,PALETTE.stone,[0,.055,0],[.28,.055,.23]);rod(g,PALETTE.wood,[-.24,.07,-.18],[.24,.14,.18],.022);
      for(const side of [-1,1]){
        ball(g,PALETTE.cream,[side*.245,.245,.06],[.245,.04,.19],[0,side*.3,side*.24]);ball(g,PALETTE.moon,[side*.17,.22,-.19],[.185,.035,.15],[0,-side*.25,side*.17]);
        for(let k=0;k<8;k++){const a=-Math.PI*.63+k*Math.PI*1.26/7;ball(g,PALETTE.purple,[side*.26+Math.cos(a)*.065*side,.31+Math.cos(a)*.016,.055+Math.sin(a)*.065],[.018,.009,.018]);}
        rod(g,PALETTE.dark,[side*.023,.29,.23],[side*.09,.37,.32],.008);for(let j=0;j<3;j++)rod(g,PALETTE.dark,[side*.025,.22,.10-j*.09],[side*.11,.12,.14-j*.11],.006);
      }
      ball(g,0xd2ccaa,[0,.25,-.015],[.047,.067,.24]);ball(g,PALETTE.cream,[0,.28,.22],[.06,.055,.06]);for(const side of [-1,1])ball(g,PALETTE.dark,[side*.036,.30,.257],[.014,.015,.012]);
    }
    if(id==='quartz'){
      ball(g,PALETTE.stone,[0,.055,0],[.34,.055,.28]);
      for(let k=0;k<5;k++){const a=k*2.399,r=k?.19:0,x=Math.cos(a)*r,z=Math.sin(a)*r,height=k?.33+(k%2)*.10:.57;const tint=k%2?PALETTE.moon:PALETTE.cream;part(g,'hex-cylinder',tint,[x,.07+height*.5,z],[.085,height,.085],[0,a,0]);part(g,'hex-cone',k%2?0xc6dde1:0xf2f0dd,[x,.07+height+.10,z],[.085,.20,.085],[0,a,0]);rod(g,0xffffff,[x-.04,.10,z+.065],[x-.04,.07+height,z+.065],.005);}
    }
    if(id==='lichen'){
      ball(g,PALETTE.dark,[0,.14,0],[.41,.14,.32],[.08,.2,.04]);
      for(let k=0;k<10;k++){const a=k*2.399,r=k?.07+(k%4)*.052:0,x=Math.cos(a)*r,z=Math.sin(a)*r,y=.26-Math.pow(r,2)*.35;ball(g,PALETTE.gold,[x,y,z],[.105,.025,.085],[0,a,.05]);ball(g,k%2?0xb6b279:PALETTE.moss,[x,y+.021,z],[.075,.018,.057],[0,a,.05]);}
      for(let k=0;k<4;k++){const a=k*1.57;rod(g,PALETTE.gold,[Math.cos(a)*.13,.28,Math.sin(a)*.13],[Math.cos(a)*.14,.34,Math.sin(a)*.14],.008);ball(g,PALETTE.gold,[Math.cos(a)*.14,.35,Math.sin(a)*.14],[.022,.012,.022]);}
    }
  },cylinderCollider(id==='waterbeetle'||id==='moth'?.49:.43,heights[id]),{discoveryId:id,interaction:'observe-only; independent collider; no creature capture',lod:'one shared merged mesh; one opaque PBR draw call',sourceBrief:'content.js DISCOVERIES descriptions'});
}

/** Optional batching for distant/repeated static objects. All transforms are world
 * matrices. Each batch shares one geometry/material and costs one draw call. */
export function createPlantInstances(id,stage,transforms){const sample=createPlant(id,stage),base=sample.children[0],mesh=new THREE.InstancedMesh(base.geometry,base.material,transforms.length);transforms.forEach((matrix,i)=>mesh.setMatrixAt(i,matrix));mesh.instanceMatrix.needsUpdate=true;mesh.castShadow=true;mesh.receiveShadow=true;mesh.userData={assetId:sample.userData.assetId,instanceCount:transforms.length};mesh.computeBoundingSphere();return mesh;}
export function getModelStats(object){let triangles=0,meshes=0,skinnedMeshes=0;const materials=new Set();object.traverse(n=>{if(n.isMesh){meshes++;triangles+=(n.geometry.index?n.geometry.index.count:n.geometry.attributes.position.count)/3;if(n.isSkinnedMesh)skinnedMeshes++;for(const m of Array.isArray(n.material)?n.material:[n.material])materials.add(m.name);}});object.updateMatrixWorld(true);const bounds=new THREE.Box3().setFromObject(object);return {triangles,meshes,skinnedMeshes,dimensions:bounds.getSize(new THREE.Vector3()).toArray().map(v=>+v.toFixed(4)),materialSlots:[...materials],animations:object.animations.map(c=>({name:c.name,duration:c.duration,loop:['idle','walk'].includes(c.name),tracks:c.tracks.length}))};}
export function disposeModelCache(){for(const g of geometryCache.values())g.dispose();for(const g of modelCache.values())g.dispose();solidMaterial.dispose();glowMaterial.dispose();geometryCache.clear();modelCache.clear();}
