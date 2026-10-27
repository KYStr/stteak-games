import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import zlib from 'node:zlib';
import { fileURLToPath } from 'node:url';
import * as THREE from '../../../../games/dust-redemption/node_modules/three/build/three.module.js';
import { GLTFExporter } from '../../../../games/dust-redemption/node_modules/three/examples/jsm/exporters/GLTFExporter.js';
import { mergeGeometries } from '../../../../games/dust-redemption/node_modules/three/examples/jsm/utils/BufferGeometryUtils.js';

const sourceRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const projectRoot = path.resolve(sourceRoot, '../../..');
const runtimeRoot = path.join(projectRoot, 'public/games/dust-redemption/assets');
const palette = JSON.parse(await fs.readFile(path.join(sourceRoot, 'sources/palette.json')));
const P = palette.palette;
const scene = new THREE.Scene(); scene.name = 'dust-redemption-frontier-kit';
const animations = [], registry = [], colliders = {};
// GLTFExporter only needs this browser API for Blob -> arrayBuffer conversion.
globalThis.FileReader = class {
  readAsArrayBuffer(blob) { blob.arrayBuffer().then(buffer => { this.result = buffer; this.onloadend?.(); }); }
  readAsDataURL(blob) { blob.arrayBuffer().then(buffer => { this.result = `data:${blob.type};base64,${Buffer.from(buffer).toString('base64')}`; this.onloadend?.(); }); }
};
const materials = {
  cloth: new THREE.MeshStandardMaterial({name:'woven-cloth', vertexColors:true, roughness:.92}),
  skin: new THREE.MeshStandardMaterial({name:'skin-leather', vertexColors:true, roughness:.87}),
  metal: new THREE.MeshStandardMaterial({name:'forged-metal', vertexColors:true, metalness:.65, roughness:.55}),
  wood: new THREE.MeshStandardMaterial({name:'weathered-wood', vertexColors:true, roughness:.93}),
  stone: new THREE.MeshStandardMaterial({name:'sandstone', vertexColors:true, roughness:1})
};
function box(x,y,z){return new THREE.BoxGeometry(x,y,z);}
function cylinder(r1,r2,h,s=8){return new THREE.CylinderGeometry(r1,r2,h,s,1,false);}
function ellipsoid(x,y,z,detail=1){const g=new THREE.IcosahedronGeometry(1,detail);g.scale(x,y,z);return g;}
function piece(g, xyz, color, bone = null, rot = [0,0,0]) {
  if(g.index)g=g.toNonIndexed();
  if(!g.getAttribute('uv')) { const p=g.getAttribute('position');const uv=[];for(let i=0;i<p.count;i++)uv.push(p.getX(i),p.getZ(i));g.setAttribute('uv',new THREE.Float32BufferAttribute(uv,2)); }
  g.applyMatrix4(new THREE.Matrix4().compose(new THREE.Vector3(...xyz),new THREE.Quaternion().setFromEuler(new THREE.Euler(...rot)),new THREE.Vector3(1,1,1)));
  const c=new THREE.Color(color), n=g.getAttribute('position').count, colors=[], indices=[], weights=[];
  for(let i=0;i<n;i++){colors.push(c.r,c.g,c.b);if(bone!==null){indices.push(bone,0,0,0);weights.push(1,0,0,0);}}
  g.setAttribute('color',new THREE.Float32BufferAttribute(colors,3));
  if(bone!==null){g.setAttribute('skinIndex',new THREE.Uint16BufferAttribute(indices,4));g.setAttribute('skinWeight',new THREE.Float32BufferAttribute(weights,4));}
  return g;
}
function record(group, collider, tags, geometryCount) {
  group.userData={assetId:`dust-redemption.${group.name}`,units:'meter',up:'+Y',forward:'+Z',pivot:'base-center',...group.userData};
  scene.add(group);group.updateMatrixWorld(true);
  const b=new THREE.Box3().setFromObject(group), size=new THREE.Vector3();b.getSize(size);
  let triangles=0;group.traverse(o=>{if(o.isMesh)triangles+=(o.geometry.index?.count??o.geometry.getAttribute('position').count)/3;});
  registry.push({id:group.name,dimensions:size.toArray().map(v=>+v.toFixed(4)),triangles,tags,geometryCount});
  colliders[group.name]={assetId:`dust-redemption.${group.name}`,...collider};
  return group;
}
function makeStatic(name, parts, collider, tags) {
  const group=new THREE.Group();group.name=name;
  const byMaterial={};for(const [kind,g] of parts)(byMaterial[kind]??=[]).push(g);
  for(const [kind,geos] of Object.entries(byMaterial)){const mesh=new THREE.Mesh(mergeGeometries(geos),materials[kind]);mesh.name=`${name}__${kind}`;mesh.castShadow=true;mesh.receiveShadow=true;group.add(mesh);}
  const bounds=new THREE.Box3().setFromObject(group),center=new THREE.Vector3();bounds.getCenter(center);
  const shift=new THREE.Vector3(-center.x,-bounds.min.y,-center.z);
  for(const mesh of group.children)mesh.geometry.translate(shift.x,shift.y,shift.z);
  if(name.startsWith('weapon-')) {
    // Keep the asset pivot at its base center. Attachment offsets, not a mesh
    // translation, align the two grips with the common humanoid weapon socket.
    const muzzle = new THREE.Object3D();muzzle.name=`${name}__muzzle`;
    muzzle.position.copy(new THREE.Vector3(0,name==='weapon-rifle'?.14:.17,name==='weapon-rifle'?.66:.31).add(shift));
    group.add(muzzle);
    const revolver=scene.getObjectByName('weapon-revolver');
    const gripZ=name==='weapon-rifle'?-.065+revolver.userData.muzzlePosition[1]-muzzle.position.y:-.065;
    group.userData={muzzle:muzzle.name,muzzlePosition:muzzle.position.toArray(),attachment:{schemaVersion:1,socketSemantic:'weaponSocket',position:[0,name==='weapon-rifle'?-.16:-.17,gripZ],rotation:[Math.PI/2,0,0]},forward:'+Z'};
  }
  const shiftCollider=c=>{if(c.center)c.center=c.center.map((v,i)=>+(v+shift.getComponent(i)).toFixed(5));for(const child of c.children??[])shiftCollider(child);};shiftCollider(collider);
  return record(group,collider,tags,parts.length);
}
function makeCharacter(config) {
  const id=config.id, group=new THREE.Group();group.name=id;
  const bones=[], boneMap={};
  function bone(name,parent,pos){const b=new THREE.Bone();b.name=`${id}__${name}`;b.position.set(...pos);(parent?boneMap[parent]:group).add(b);boneMap[name]=b;bones.push(b);return bones.length-1;}
  const ix={};
  ix.root=bone('root',null,[0,0,0]);ix.hips=bone('hips','root',[0,.91,0]);ix.spine=bone('spine','hips',[0,.29,0]);ix.head=bone('head','spine',[0,.39,0]);
  for(const side of ['left','right']){const sign=side==='left'?-1:1;ix[side+'Arm']=bone(side+'Arm','spine',[sign*.285,.23,0]);ix[side+'Forearm']=bone(side+'Forearm',side+'Arm',[0,-.27,0]);ix[side+'Hand']=bone(side+'Hand',side+'Forearm',[0,-.24,0]);ix[side+'Thigh']=bone(side+'Thigh','hips',[sign*.13,-.02,0]);ix[side+'Shin']=bone(side+'Shin',side+'Thigh',[0,-.39,0]);ix[side+'Foot']=bone(side+'Foot',side+'Shin',[0,-.39,0]);}
  const socket=new THREE.Object3D();socket.name=`${id}__weaponSocket`;socket.position.set(0,-.055,.035);boneMap.rightHand.add(socket);
  const parts={cloth:[],skin:[],metal:[]};
  const add=(kind,g,pos,color,joint,rot)=>parts[kind].push(piece(g,pos,color,ix[joint],rot));
  add('cloth',box(.48,.46,.27),[0,1.27,0],config.coat,'spine');
  add('cloth',box(.22,.39,.025),[0,1.3,.151],config.shirt,'spine');
  add('cloth',box(.5,.22,.28),[0,.98,0],config.coat,'hips');
  add('skin',box(.48,.055,.3),[0,1.04,0],P.woodDark,'hips');
  add('metal',box(.072,.055,.026),[0,1.04,.166],P.cream,'hips');
  add('skin',cylinder(.09,.11,.12),[0,1.55,0],config.skin,'head');
  add('skin',ellipsoid(.15,.19,.135),[0,1.7,0],config.skin,'head');
  add('skin',box(.07,.07,.06),[0,1.69,.13],config.skin,'head');
  add('skin',box(.24,.065,.05),[0,1.77,.091],P.woodDark,'head');
  for(const s of [-1,1])add('skin',box(.026,.022,.012),[s*.068,1.715,.129],P.coal,'head');
  add('cloth',cylinder(.28,.28,.033,10),[0,1.84,0],config.hat,'head');
  add('cloth',cylinder(.15,.18,.14,8),[0,1.91,0],config.hat,'head');
  add('skin',cylinder(.181,.183,.032,8),[0,1.866,0],P.woodDark,'head');
  for(const side of ['left','right']){const sign=side==='left'?-1:1;
    add('cloth',cylinder(.09,.085,.27),[sign*.285,1.295,0],config.coat,side+'Arm');
    add('cloth',cylinder(.078,.068,.235),[sign*.285,1.04,0],config.coat,side+'Forearm');
    add('skin',box(.11,.15,.105),[sign*.285,.89,.008],config.skin,side+'Hand');
    add('cloth',cylinder(.112,.095,.38),[sign*.13,.7,0],config.trousers,side+'Thigh');
    add('cloth',cylinder(.093,.074,.35),[sign*.13,.325,0],config.trousers,side+'Shin');
    add('skin',box(.175,.16,.29),[sign*.13,.085,.055],P.woodDark,side+'Foot');
  }
  if(config.accessory==='poncho')add('cloth',box(.68,.23,.38),[0,1.42,.015],config.coat,'spine',[0,0,-.07]);
  if(config.accessory==='badge')add('metal',cylinder(.038,.038,.012,5),[-.15,1.39,.153],P.cream,'spine',[Math.PI/2,0,0]);
  if(config.accessory==='scarf'){add('cloth',box(.28,.12,.33),[0,1.5,0],P.rust,'spine');add('cloth',box(.1,.25,.025),[-.1,1.34,.175],P.rust,'spine',[0,0,-.25]);}
  if(config.accessory==='bandolier'){add('skin',box(.065,.58,.035),[0,1.28,.164],P.woodDark,'spine',[0,0,-.6]);for(let i=0;i<5;i++)add('metal',box(.03,.075,.04),[-.12+i*.052,1.46-i*.076,.188],P.cream,'spine');}
  if(config.accessory==='hood')add('cloth',ellipsoid(.18,.2,.16),[0,1.71,-.055],config.coat,'head');
  if(config.accessory==='apron')add('cloth',box(.38,.6,.035),[0,1.08,.16],P.woodLight,'spine');
  group.updateMatrixWorld(true);const skeleton=new THREE.Skeleton(bones);
  for(const [kind,geos]of Object.entries(parts)){const mesh=new THREE.SkinnedMesh(mergeGeometries(geos),materials[kind]);mesh.name=`${id}__${kind}`;mesh.add(new THREE.Object3D());mesh.bind(skeleton);mesh.castShadow=true;mesh.receiveShadow=true;mesh.frustumCulled=false;group.add(mesh);}
  group.userData={rig:'frontier-humanoid-v1',weaponSocket:socket.name,animationPrefix:`${id}:`,rootMotion:false};
  const quat=(x=0,y=0,z=0)=>new THREE.Quaternion().setFromEuler(new THREE.Euler(x,y,z)).toArray();
  const standingHip=.775, standingKnee=Math.acos((standingHip-.02-.11)/.78);
  const held=(duration,x=0,y=0,z=0)=>[[0,x,y,z],[duration,x,y,z]];
  function clip(name,duration,poses,loop,hipPosition=[0,standingHip,0]){
    // Every state drives the complete rig, so a crossfade cannot leave a hidden
    // cover pelvis/leg rotation behind. Bone lengths and all scales stay intact.
    const baseline=Object.fromEntries(Object.keys(boneMap).map(joint=>[joint,held(duration)]));
    for(const side of ['left','right']){baseline[side+'Thigh']=held(duration,-standingKnee);baseline[side+'Shin']=held(duration,standingKnee*2);baseline[side+'Foot']=held(duration,-standingKnee);}
    const tracks=[];for(const [joint,frames] of Object.entries({...baseline,...poses})){const times=frames.map(f=>f[0]);const values=frames.flatMap(f=>quat(...f.slice(1)));tracks.push(new THREE.QuaternionKeyframeTrack(`${boneMap[joint].name}.quaternion`,times,values));}
    tracks.push(new THREE.VectorKeyframeTrack(`${boneMap.hips.name}.position`,[0,duration],[...hipPosition,...hipPosition]));
    const c=new THREE.AnimationClip(`${id}:${name}`,duration,tracks);c.userData={loop,rootMotion:false};animations.push(c);
  }
  clip('idle',2.4,{spine:[[0,0,0,-.012],[1.2,.016,0,.012],[2.4,0,0,-.012]],head:[[0,0,-.08,0],[1.2,0,.08,0],[2.4,0,-.08,0]]},true);
  const walkPose={};
  for(const [side,phaseOffset] of [['left',0],['right',Math.PI]]){
    const thigh=[],shin=[],foot=[],arm=[];
    for(let i=0;i<=16;i++){
      const time=.68*i/16,phase=i/16*Math.PI*2+phaseOffset,z=.26*Math.cos(phase),ankleY=.11+.07*Math.max(0,-Math.sin(phase));
      const dy=standingHip-.02-ankleY,d=Math.hypot(dy,z),bend=Math.acos(d/.78),axis=Math.atan2(-z,dy);
      thigh.push([time,axis-bend,0,0]);shin.push([time,bend*2,0,0]);foot.push([time,-axis-bend,0,0]);arm.push([time,.29*Math.cos(phase),0,0]);
    }
    walkPose[side+'Thigh']=thigh;walkPose[side+'Shin']=shin;walkPose[side+'Foot']=foot;walkPose[side+'Arm']=arm;
  }
  clip('walk',.68,walkPose,true);
  clip('aim-revolver',.3,{rightArm:held(.3,-1.14),rightForearm:held(.3,-Math.PI/2+1.14),leftArm:held(.3,-.3,0,.12)},true);
  clip('aim-rifle',.3,{rightArm:held(.3,-1.14),rightForearm:held(.3,-Math.PI/2+1.14),leftArm:held(.3,-1.35,0,.5),leftForearm:held(.3,-.22,0,.2)},true);
  clip('cover',.4,{hips:held(.4,.2),spine:held(.4,1.35),head:held(.4,-.5),leftThigh:held(.4,-1.6),rightThigh:held(.4,-1.6),leftShin:held(.4,2.8),rightShin:held(.4,2.8),leftFoot:held(.4,-1.4),rightFoot:held(.4,-1.4),rightArm:held(.4,-2.442),rightForearm:held(.4,-Math.PI/2-1.55+2.442),leftArm:held(.4,-2.4,0,.25),leftForearm:held(.4,-.72)},true,[0,.263,0]);
  clip('peek',.35,{rightArm:held(.35,-2.337),rightForearm:held(.35,-Math.PI/2+2.337),leftArm:held(.35,-2.1,0,.45),leftForearm:held(.35,.5292)},true);
  clip('reload',1.8,{rightArm:[[0,-1.2,0,-.1],[.5,-.7,0,-.3],[1.3,-.7,0,-.3],[1.8,-1.2,0,-.1]],leftArm:[[0,-.2,0,.1],[.5,-1.05,0,.5],[1.3,-1.05,0,.5],[1.8,-.2,0,.1]],leftForearm:[[0,0,0,0],[.5,-1.1,0,-.3],[1.3,-.8,0,-.3],[1.8,0,0,0]]},false);
  clip('hurt',.4,{spine:[[0,0,0,0],[.12,-.22,0,-.12],[.4,0,0,0]],head:[[0,0,0,0],[.12,-.15,0,0],[.4,0,0,0]]},false);
  clip('down',.75,{root:[[0,0,0,0],[.5,1.3,0,.1],[.75,1.57,0,.1]],leftArm:[[0,0,0,0],[.75,0,0,.8]],rightArm:[[0,0,0,0],[.75,0,0,-.8]]},false);
  return record(group,{shape:'capsule',radius:.28,height:1.85,center:[0,.925,0],combatHeight:1.35,coverHeight:.95,coverMuzzleHeight:.55,peekMuzzleHeight:1.65},['character',config.accessory,'humanoid'],Object.values(parts).flat().length);
}
for(const c of palette.characters)makeCharacter(c);
function part(kind,g,pos,color,rot){return [kind,piece(g,pos,color,null,rot)];}
const collisionBox=(size,extras={})=>({shape:'box',size,center:[0,size[1]/2,0],...extras});
for(const high of [false,true]){
  const h=high?1.65:.9,w=high?1.25:1.55,d=1.05,parts=[];
  parts.push(part('wood',box(w,h,d),[0,h/2,0],P.wood));
  for(const side of [-1,1]){for(let i=0;i<4;i++)parts.push(part('wood',box(w*.94,h/4-.025,.035),[0,(i+.5)*h/4,side*(d/2+.018)],i%2?P.woodLight:P.wood));for(const x of [-1,1])parts.push(part('wood',box(.09,h+.035,.075),[x*w*.4,h/2,side*(d/2+.04)],P.woodDark));}
  parts.push(part('metal',box(w+.035,.07,d+.035),[0,h*.2,0],P.iron));parts.push(part('metal',box(w+.035,.07,d+.035),[0,h*.8,0],P.iron));
  makeStatic(high?'crate-high':'crate-low',parts,collisionBox([w,h,d],{cover:high?'high':'low',vaultable:!high}),['cover','crate','wood']);
}
makeStatic('barrel',[part('wood',cylinder(.36,.34,.92,12),[0,.46,0],P.woodLight),... [.12,.46,.8].map(y=>part('metal',cylinder(.365,.365,.055,12),[0,y,0],P.iron)),part('wood',cylinder(.33,.33,.025,12),[0,.935,0],P.wood)],{shape:'cylinder',radius:.37,height:.95,center:[0,.475,0],cover:'low',vaultable:true},['cover','barrel']);
for(const high of [false,true]){const h=high?2.25:.85,sz=high?1.6:1.3;const g=ellipsoid(sz,h/2,sz*.7,1);const p=g.getAttribute('position');for(let i=0;i<p.count;i++){const noise=1+.065*Math.sin(p.getX(i)*11.7+p.getY(i)*7.1+p.getZ(i)*13.3);p.setXYZ(i,p.getX(i)*noise,Math.max(-h/2,p.getY(i)),p.getZ(i)*noise);}g.computeVertexNormals();makeStatic(high?'rock-high':'rock-low',[part('stone',g,[0,h/2,0],high?P.stone:P.sand)],{shape:'box',size:[sz*1.65,h,sz*1.15],center:[0,h/2,0],cover:high?'high':'low',vaultable:!high},['cover','rock','canyon']);}
makeStatic('wall-wood',Array.from({length:8},(_,i)=>part('wood',box(.235,1.85,.15),[-.875+i*.25,.925,0],i%2?P.woodLight:P.wood)).concat([.35,1.45].map(y=>part('wood',box(2.1,.13,.16),[0,y,-.14],P.woodDark))),collisionBox([2,1.85,.3],{cover:'high',vaultable:false}),['wall','station','mine']);
makeStatic('rail-segment',[...[-.72,.72].map(x=>part('metal',box(.08,.12,4),[x,.18,0],P.iron)),...Array.from({length:6},(_,i)=>part('wood',box(1.9,.12,.2),[0,.06,-1.7+i*.68],P.woodDark))],{shape:'box',size:[1.9,.24,4],center:[0,.12,0],cover:'none',vaultable:true},['station','rail','modular-4m']);
makeStatic('station-canopy',[...[-2,2].flatMap(x=>[-1,1].map(z=>part('wood',box(.18,2.8,.18),[x,1.4,z],P.woodDark))),part('wood',box(4.4,.18,2.7),[0,2.8,0],P.woodLight),part('metal',box(4.6,.08,1.5),[0,2.99,-.66],P.teal,[-.2,0,0]),part('metal',box(4.6,.08,1.5),[0,2.99,.66],P.teal,[.2,0,0]),part('wood',box(4.2,.35,.12),[0,2.55,1.18],P.cream)],{shape:'compound',children:[...[-2,2].flatMap(x=>[-1,1].map(z=>({shape:'box',size:[.2,2.8,.2],center:[x,1.4,z]}))),{shape:'box',size:[4.6,.5,3],center:[0,2.95,0]}],cover:'high',vaultable:false},['station','shelter','modular']);
makeStatic('mine-arch',[...[-1.25,1.25].map(x=>part('wood',box(.32,2.8,.4),[x,1.4,0],P.woodDark)),part('wood',box(2.85,.35,.5),[0,2.8,0],P.woodLight),...[-1,1].map(s=>part('wood',box(.17,1,.2),[s*.95,2.35,.01],P.wood,[0,0,s*.65])),part('metal',box(.5,.25,.07),[0,2.85,.3],P.iron)],{shape:'compound',children:[...[-1.25,1.25].map(x=>({shape:'box',size:[.32,2.8,.4],center:[x,1.4,0]})),{shape:'box',size:[2.85,.35,.5],center:[0,2.8,0]}],cover:'high',vaultable:false},['mine','entrance','modular']);
makeStatic('water-tower',[...[-.8,.8].flatMap(x=>[-.8,.8].map(z=>part('wood',box(.18,3,.18),[x,1.5,z],P.woodDark))),part('wood',cylinder(1.15,1.15,1.7,12),[0,3.8,0],P.woodLight),... [3.1,3.8,4.5].map(y=>part('metal',cylinder(1.17,1.17,.09,12),[0,y,0],P.iron)),part('metal',cylinder(0,1.25,.65,12),[0,4.98,0],P.teal)],{shape:'compound',children:[...[-.8,.8].flatMap(x=>[-.8,.8].map(z=>({shape:'box',size:[.2,3,.2],center:[x,1.5,z]}))),{shape:'cylinder',radius:1.17,height:1.8,center:[0,3.8,0]}],cover:'high',vaultable:false},['town','station','landmark']);
makeStatic('weapon-revolver',[part('metal',box(.07,.09,.34),[0,.17,.14],P.iron),part('metal',cylinder(.07,.07,.12,8),[0,.15,-.045],P.steel,[Math.PI/2,0,0]),part('skin',box(.065,.17,.085),[0,.065,-.08],P.woodDark,[.25,0,0]),part('metal',box(.012,.03,.02),[0,.23,.27],P.iron)],{shape:'box',size:[.14,.25,.45],center:[0,.125,.06],combat:false},['weapon','revolver']);
makeStatic('weapon-rifle',[part('metal',cylinder(.025,.025,.62,8),[0,.14,.35],P.iron,[Math.PI/2,0,0]),part('wood',box(.07,.1,.48),[0,.12,.02],P.wood),part('wood',box(.07,.17,.25),[0,.095,-.31],P.woodDark,[.12,0,0]),part('metal',box(.06,.07,.18),[0,.18,-.06],P.steel),part('metal',box(.012,.035,.025),[0,.185,.62],P.iron)],{shape:'box',size:[.08,.23,1.12],center:[0,.115,.12],combat:false},['weapon','rifle']);
makeStatic('horse',[part('skin',ellipsoid(.36,.42,.82),[0,1.17,0],P.wood),part('skin',ellipsoid(.24,.5,.27),[0,1.55,.61],P.wood,[-.45,0,0]),part('skin',ellipsoid(.2,.21,.38),[0,1.9,.79],P.wood),part('skin',box(.15,.16,.25),[0,1.79,1.05],P.woodDark),...[-.1,.1].map(x=>part('skin',cylinder(.015,.06,.22,4),[x,2.15,.69],P.woodDark)),...[-.23,.23].flatMap(x=>[-.53,.53].flatMap(z=>[part('skin',cylinder(.07,.055,.85,6),[x,.6,z],P.wood),part('skin',box(.14,.16,.2),[x,.08,z+.025],P.coal)])),part('skin',cylinder(.06,.025,.6,5),[0,1.03,-.87],P.coal,[.35,0,0]),part('skin',box(.62,.12,.53),[0,1.6,-.08],P.woodDark),part('cloth',box(.66,.08,.62),[0,1.52,-.08],P.teal)],{shape:'capsule',radius:.42,height:2.25,center:[0,1.125,0],combat:false},['horse','travel']);
makeStatic('saloon-front',[part('wood',box(4,3.3,.26),[0,1.65,0],P.woodLight),part('wood',box(4.4,.7,.3),[0,3.55,0],P.wood),...[-1.25,1.25].map(x=>part('wood',box(.8,1,.08),[x,1.9,.19],P.teal)),part('wood',box(.9,1.85,.1),[0,.925,.21],P.woodDark),part('wood',box(4.25,.2,1),[0,.1,.5],P.woodDark),part('wood',box(3.2,.48,.12),[0,3.52,.23],P.cream)],collisionBox([4.4,3.9,.35],{cover:'high',vaultable:false}),['town','saloon','facade-with-volume']);

// Original tileable grayscale PBR base-color modulation. UVs are on every mesh.
function crc32(buf){let c=0xffffffff;for(const b of buf){c^=b;for(let k=0;k<8;k++)c=(c>>>1)^((c&1)?0xedb88320:0);}return(c^0xffffffff)>>>0;}
function pngChunk(type,data){const t=Buffer.from(type),len=Buffer.alloc(4),crc=Buffer.alloc(4);len.writeUInt32BE(data.length);crc.writeUInt32BE(crc32(Buffer.concat([t,data])));return Buffer.concat([len,t,data,crc]);}
function texture(kind){const n=128,raw=Buffer.alloc(n*(n*4+1));for(let y=0;y<n;y++){raw[y*(n*4+1)]=0;for(let x=0;x<n;x++){const noise=Math.sin(x*12.9898+y*78.233)*43758.5453%1;let value=kind==='wood'?222+12*Math.sin(x*Math.PI/8+Math.sin(y*Math.PI/64))+noise*5:kind==='cloth'?235+((x+y)%2)*9:235+noise*14;const i=y*(n*4+1)+1+x*4;raw[i]=raw[i+1]=raw[i+2]=Math.round(value);raw[i+3]=255;}}const ihdr=Buffer.alloc(13);ihdr.writeUInt32BE(n,0);ihdr.writeUInt32BE(n,4);ihdr[8]=8;ihdr[9]=6;return Buffer.concat([Buffer.from([137,80,78,71,13,10,26,10]),pngChunk('IHDR',ihdr),pngChunk('IDAT',zlib.deflateSync(raw,{level:9})),pngChunk('IEND',Buffer.alloc(0))]);}
const textures={wood:texture('wood'),cloth:texture('cloth'),stone:texture('stone')};
const initial = Buffer.from(await new GLTFExporter().parseAsync(scene,{binary:true,animations,onlyVisible:false,trs:true}));
const jsonLength=initial.readUInt32LE(12), json=JSON.parse(initial.subarray(20,20+jsonLength).toString('utf8'));
const binStart=20+jsonLength+8, oldBin=initial.subarray(binStart), bins=[oldBin];let offset=oldBin.length;
json.images=[];json.textures=[];json.samplers=[{magFilter:9729,minFilter:9987,wrapS:10497,wrapT:10497}];
for(const [kind,png]of Object.entries(textures)){const pad=(4-offset%4)%4;if(pad){bins.push(Buffer.alloc(pad));offset+=pad;}const view=json.bufferViews.length;json.bufferViews.push({buffer:0,byteOffset:offset,byteLength:png.length});bins.push(png);offset+=png.length;const texId=json.images.length;json.images.push({name:`${kind}-grain`,bufferView:view,mimeType:'image/png'});json.textures.push({sampler:0,source:texId});for(const mat of json.materials){if(mat.name===({wood:'weathered-wood',cloth:'woven-cloth',stone:'sandstone'}[kind]))mat.pbrMetallicRoughness.baseColorTexture={index:texId,texCoord:0};}}
json.buffers[0].byteLength=offset;const binPadding=(4-offset%4)%4;if(binPadding)bins.push(Buffer.alloc(binPadding));
const jsonText=Buffer.from(JSON.stringify(json)),jpad=(4-jsonText.length%4)%4,jbuffer=Buffer.concat([jsonText,Buffer.alloc(jpad,32)]),bbuffer=Buffer.concat(bins),header=Buffer.alloc(12),jh=Buffer.alloc(8),bh=Buffer.alloc(8);
header.writeUInt32LE(0x46546c67);header.writeUInt32LE(2,4);header.writeUInt32LE(12+8+jbuffer.length+8+bbuffer.length,8);jh.writeUInt32LE(jbuffer.length);jh.writeUInt32LE(0x4e4f534a,4);bh.writeUInt32LE(bbuffer.length);bh.writeUInt32LE(0x004e4942,4);
const glb=Buffer.concat([header,jh,jbuffer,bh,bbuffer]);
await fs.mkdir(path.join(runtimeRoot,'models'),{recursive:true});await fs.mkdir(path.join(runtimeRoot,'data'),{recursive:true});await fs.mkdir(path.join(runtimeRoot,'textures'),{recursive:true});
await fs.writeFile(path.join(runtimeRoot,'models/frontier-kit.glb'),glb);
await fs.writeFile(path.join(runtimeRoot,'data/colliders.json'),JSON.stringify({schemaVersion:1,unit:'meter',up:'+Y',forward:'+Z',assets:colliders},null,2)+'\n');
for(const [kind,png]of Object.entries(textures))await fs.writeFile(path.join(runtimeRoot,`textures/${kind}-grain.png`),png);
const rig={schemaVersion:1,id:'frontier-humanoid-v1',unit:'meter',up:'+Y',forward:'+Z',pivot:'base-center',rootMotion:false,clone:'SkeletonUtils.clone(template)',bindPose:'Standing, arms down, facing +Z; root at ground center.',hierarchy:{root:['hips'],hips:['spine','leftThigh','rightThigh'],spine:['head','leftArm','rightArm'],leftArm:['leftForearm'],leftForearm:['leftHand'],rightArm:['rightForearm'],rightForearm:['rightHand'],rightHand:['weaponSocket'],leftThigh:['leftShin'],leftShin:['leftFoot'],rightThigh:['rightShin'],rightShin:['rightFoot']},states:[['idle',2.4,true],['walk',.68,true],['aim-revolver',.3,true],['aim-rifle',.3,true],['cover',.4,true],['peek',.35,true],['reload',1.8,false],['hurt',.4,false],['down',.75,false]].map(([name,duration,loop])=>({name,duration,loop,events:name==='reload'?[{time:1.3,event:'reload-visual'}]:[],gameplay:'Game rules own hit, ammo and damage timing.'})),crossfadeSeconds:.12,retarget:'Match semantic bone suffix after __; named clips are per template. No skeleton scale retargeting.',templates:palette.characters.map(c=>({name:c.id,clipPrefix:c.id+':',socket:c.id+'__weaponSocket'}))};
rig.poseTargets={standingBodyMax:1.85,standingMuzzle:1.35,coverBodyMax:.95,coverMuzzle:.55,peekMuzzle:1.65,feetGroundTolerance:.015,boneScale:[1,1,1],standingStance:'slightly bent knees; fixed bone lengths',coverStance:'deep squat with forward spine and tucked head; flat planted feet',peekStance:'standing with raised aiming arms'};
rig.weaponAttachments=Object.fromEntries(['revolver','rifle'].map(kind=>{const model=scene.getObjectByName(`weapon-${kind}`);return[kind,{node:model.name,...model.userData.attachment,muzzle:model.userData.muzzle,muzzlePosition:model.userData.muzzlePosition}];}));
rig.poseVerification='assets/games/dust-redemption/generation/pose-verification.json';
await fs.writeFile(path.join(runtimeRoot,'data/rig.json'),JSON.stringify(rig,null,2)+'\n');
const runtime=['models/frontier-kit.glb','data/colliders.json','data/rig.json',...Object.keys(textures).map(k=>`textures/${k}-grain.png`)];const sha256={},bytes={};for(const p of runtime){const b=await fs.readFile(path.join(runtimeRoot,p));sha256[p]=crypto.createHash('sha256').update(b).digest('hex');bytes[p]=b.length;}
const provenance={method:'original-procedural',creator:'Dust & Redemption asset maker',createdAt:'2026-10-25',tool:'Node.js + Three.js 0.180.0 GLTFExporter; original geometry / PNG recipe',promptRecord:'generation/production-record.md',referenceSources:[],rights:'Original project assets; source and generated assets may be reused and modified with this project. Three.js engine MIT license is tracked in the game dependency lockfile.'};
const manifest={schemaVersion:1,id:'dust-redemption.frontier-kit',version:'1.0.0',source:'recipes/build-frontier-kit.mjs',sourceDependencies:['sources/palette.json'],runtime,sha256,bytes,provenance,spec:{unit:'meter',up:'+Y',forward:'+Z',pivot:'base-center',rig:'frontier-humanoid-v1',collision:'data/colliders.json (separate simplified colliders)',materialSlots:Object.values(materials).map(m=>m.name),textureColorSpace:{baseColor:'sRGB'},textures:{width:128,height:128,channels:'RGBA8',repeat:true,purpose:'Original neutral base-color modulation; hue is vertex color; no baked shadows or text.'},lod:[{level:0,policy:'Low-poly runtime assets. Repeated environment templates can be instanced. Far distant scenery may be omitted; no billboard substitutions.'}]},budget:{runtimeBytes:Object.values(bytes).reduce((a,b)=>a+b,0),decodedTextureBytes:128*128*4*3,maxSimultaneousCharacters:10,skinnedDrawCallsPerCharacter:3,assetTriangles:registry.reduce((a,b)=>a+b.triangles,0)},assets:registry.map(a=>({id:`dust-redemption.${a.id}`,version:'1.0.0',kind:a.tags.includes('character')?'skinned-model':'model',source:'recipes/build-frontier-kit.mjs',runtime:['models/frontier-kit.glb'],node:a.id,sha256:{'models/frontier-kit.glb':sha256['models/frontier-kit.glb']},provenance,spec:{unit:'meter',up:'+Y',forward:'+Z',pivot:'base-center',dimensions:a.dimensions,triangles:a.triangles,collision:`data/colliders.json#assets/${a.id}`,materialSlots:Object.values(materials).map(m=>m.name),lod:[]},budget:{runtimeBytes:bytes['models/frontier-kit.glb'],sharedContainer:true,maxSimultaneousInstances:a.tags.includes('character')?10:24},reuse:{tags:a.tags,compatibleWith:['frontier-kit-v1']},dependencies:['dust-redemption.frontier-kit'],derivatives:[]}))};
manifest.version='1.0.1';for(const asset of manifest.assets)asset.version='1.0.1';
manifest.spec.poseTargets=rig.poseTargets;manifest.spec.weaponAttachments=rig.weaponAttachments;
manifest.validation={recipe:'recipes/verify-frontier-poses.mjs',evidence:'generation/pose-verification.json',contract:'Real GLTFLoader + CPU skinning of every vertex; named weapon muzzle nodes; no character scaling.'};
await fs.writeFile(path.join(sourceRoot,'manifest.json'),JSON.stringify(manifest,null,2)+'\n');
console.log(JSON.stringify({models:registry.length,animations:animations.length,bytes:bytes['models/frontier-kit.glb'],triangles:manifest.budget.assetTriangles,sha256:sha256['models/frontier-kit.glb']},null,2));
