import * as THREE from 'three';

// Aetherwake asset kit 1.0 — metres, +Y up, +Z forward, ground pivots.
// All core silhouettes are volumetric geometry. No image planes or external assets.
export const PALETTE = Object.freeze({ chalk: 0xf5eed8, teal: 0x285c60, deep: 0x183c4d, moss: 0x4d8b78, gold: 0xdca655, copper: 0xa36141, ink: 0x233848 });
const M = {
  chalk: new THREE.MeshStandardMaterial({ name: 'chalk-sail', color: PALETTE.chalk, roughness: 0.82, side: THREE.DoubleSide }),
  stone: new THREE.MeshStandardMaterial({ name: 'teal-basalt', color: PALETTE.teal, roughness: 0.94, flatShading: true }),
  dark: new THREE.MeshStandardMaterial({ name: 'deep-basalt', color: PALETTE.deep, roughness: 0.92, flatShading: true }),
  moss: new THREE.MeshStandardMaterial({ name: 'moss', color: PALETTE.moss, roughness: 0.98 }),
  gold: new THREE.MeshStandardMaterial({ name: 'aged-brass', color: PALETTE.gold, roughness: 0.42, metalness: 0.58 }),
  copper: new THREE.MeshStandardMaterial({ name: 'ochre-ceramic', color: PALETTE.copper, roughness: 0.85 }),
  ink: new THREE.MeshStandardMaterial({ name: 'navy-cloth', color: PALETTE.ink, roughness: 0.9 }),
  glow: new THREE.MeshStandardMaterial({ name: 'aether-glass', color: 0xa6f2dc, emissive: 0x50ac9e, emissiveIntensity: 0.8, roughness: 0.28, metalness: 0.15 }),
  skin: new THREE.MeshStandardMaterial({ name: 'pilot-skin', color: 0xc99b7e, roughness: 0.9 }),
  turf: new THREE.MeshStandardMaterial({ name: 'weathered-turf', color: 0x668c78, roughness: 1, flatShading: true }),
  sand: new THREE.MeshStandardMaterial({ name: 'mineral-sand', color: 0x99aa8c, roughness: 1, flatShading: true }),
};
const mat = key => M[key] || M.stone;
const seeded = seed => { let x = (seed + 1) >>> 0; return () => { x = Math.imul(1664525, x) + 1013904223 >>> 0; return x / 4294967296; }; };
const mesh = (geo, material, position, scale) => { const o = new THREE.Mesh(geo, typeof material === 'string' ? mat(material) : material); if (position) o.position.set(...position); if (scale) o.scale.set(...scale); o.castShadow = true; o.receiveShadow = true; return o; };
const cylinder = (r1, r2, h, n=10) => new THREE.CylinderGeometry(r1,r2,h,n);
function rod(a,b,r,material='gold',n=6) { const av=new THREE.Vector3(...a), bv=new THREE.Vector3(...b), d=bv.clone().sub(av); const o=mesh(cylinder(r,r,d.length(),n), material); o.position.copy(av).add(bv).multiplyScalar(.5); o.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),d.normalize()); return o; }
function ring(radius, tube, material='gold', segments=32) { return mesh(new THREE.TorusGeometry(radius,tube,5,segments),material); }

// Merge static components by material, preserving UVs and normals. Repeated plants
// remain InstancedMesh; their draw count does not scale with plant count.
function mergeGeometries(geometries) {
  const keys=Object.keys(geometries[0].attributes); const output=new THREE.BufferGeometry();
  for(const key of keys) { const arrays=geometries.map(g=>g.attributes[key]); const C=arrays[0].array.constructor; const a=new C(arrays.reduce((n,v)=>n+v.array.length,0)); let offset=0; for(const v of arrays){a.set(v.array,offset);offset+=v.array.length;} output.setAttribute(key,new THREE.BufferAttribute(a,arrays[0].itemSize,arrays[0].normalized)); }
  output.computeBoundingSphere(); return output;
}
function batchStatic(group) {
  group.updateMatrixWorld(true); const batches=new Map(), remove=[];
  group.traverse(o=>{if(o.isMesh&&!o.isInstancedMesh&&!o.isSkinnedMesh&& !Array.isArray(o.material)){const g=(o.geometry.index?o.geometry.toNonIndexed():o.geometry.clone()).applyMatrix4(o.matrixWorld); const key=o.material.uuid; if(!batches.has(key)) batches.set(key,{material:o.material,geometries:[]}); batches.get(key).geometries.push(g); remove.push(o);}});
  for(const o of remove) o.removeFromParent();
  for(const {material,geometries} of batches.values()){const o=mesh(mergeGeometries(geometries),material);o.name=material.name+'-merged'; group.add(o);for(const g of geometries) g.dispose();}
  return group;
}

function landmark(radius,index,detail) {
  const g=new THREE.Group();g.name=`landmark-${index}`;const obstacles=[],r=radius*1.04+6,angle=[2.45,-.65,1.1,2.8,-1.8,.3][index%6],cx=Math.sin(angle)*r,cz=Math.cos(angle)*r;
  // Landmark footing is an outlying basalt buttress below the playable rim.
  // Every solid upright stays outside r*1.04; the landing disk stays unobstructed.
  const footing=mesh(cylinder(5.7,2.2,5.5,detail?9:5),'stone',[cx,-3.2,cz]);g.add(footing);
  const neck=rod([Math.sin(angle)*radius*.8,-3.5,Math.cos(angle)*radius*.8],[cx,-3.5,cz],3.1,'dark',6);g.add(neck);
  const post=(x,z,height,rad=.35,material='chalk')=>{g.add(mesh(cylinder(rad,rad*1.2,height,detail?8:5),material,[x,height/2,z]));obstacles.push({shape:'cylinder',x,z,y:0,radius:rad*1.2,height});};
  const at=(x,z)=>[cx+x,cz+z];
  if(index===0){
    // A real ridged sail shelter: open sides and slender, collidable stanchions.
    for(const x of [-3.6,3.6])for(const z of [-2.8,2.8])post(...at(x,z),4.6,.15,'gold');
    const s=new THREE.Shape();s.moveTo(-4.2,0);s.lineTo(0,2.1);s.lineTo(4.2,0);s.lineTo(4.2,-.065);s.lineTo(0,2.035);s.lineTo(-4.2,-.065);s.closePath();const roof=mesh(new THREE.ExtrudeGeometry(s,{depth:6.4,bevelEnabled:false}),'chalk',[cx,4.5,cz-3.2]);g.add(roof);
    g.add(rod([cx-4.2,4.5,cz-3.2],[cx,6.6,cz-3.2],.055),rod([cx,6.6,cz-3.2],[cx+4.2,4.5,cz-3.2],.055),rod([cx,6.6,cz-3.2],[cx,6.6,cz+3.2],.055));
    for(let n=0;n<5;n++){const pennant=mesh(new THREE.ConeGeometry(.23,.75,3),'copper',[cx-2+n,4.3,cz-3.25]);pennant.rotation.z=Math.PI;g.add(pennant);}
  }else if(index===1){
    for(const x of [-3.3,3.3])post(...at(x,0),5.7,.4);const arch=mesh(new THREE.TorusGeometry(3.3,.32,5,detail?24:12,Math.PI),'chalk',[cx,5.7,cz]);g.add(arch);
    const medallion=ring(1.25,.095);medallion.position.set(cx,5.9,cz);g.add(medallion);g.add(rod([cx,5.7,cz],[cx,9.6,cz],.075));for(const s of [-1,1]){const vane=mesh(new THREE.BoxGeometry(1.6,.35,.1),'gold',[cx+s*.8,9.2,cz]);vane.rotation.z=s*.12;g.add(vane);}
  }else if(index===2){
    // Two offset ruined bridge portals frame empty air between the broken spans.
    for(const z of [-3,3]){for(const x of [-3,3])post(...at(x,z),z<0?5.8:4.6,.55);g.add(mesh(new THREE.BoxGeometry(7,.65,1.3),'chalk',[cx,z<0?5.7:4.5,cz+z]));}
    for(let n=0;n<5;n++){const slab=mesh(new THREE.BoxGeometry(6.4,.16,1),'sand',[cx,.035,cz-2.4+n*1.2]);g.add(slab);}const broken=mesh(new THREE.DodecahedronGeometry(1.15,0),'dark',[cx+4.5,.5,cz+3.3],[1,.5,1]);g.add(broken);obstacles.push({shape:'cylinder',x:cx+4.5,z:cz+3.3,y:0,radius:1.2,height:1.1});
  }else if(index===3){
    for(const x of [-3.6,3.6])post(...at(x,0),7.8,.4,'dark');g.add(rod([cx-3.6,7.8,cz],[cx,10,cz],.16),rod([cx,10,cz],[cx+3.6,7.8,cz],.16));g.add(mesh(new THREE.OctahedronGeometry(1.1,0),'glow',[cx,9.1,cz],[.6,1.7,.6]));
    for(let n=0;n<3;n++){const halo=ring(1.35+n*.35,.055);halo.position.set(cx,7.1+n*.75,cz);halo.rotation.x=Math.PI/2;g.add(halo);}
    g.add(rod([cx,10,cz],[cx,13,cz],.055));
  }else if(index===4){
    for(let n=0;n<7;n++){const a=(n/6)*Math.PI*1.45-.7,x=cx+Math.sin(a)*4.2,z=cz+Math.cos(a)*4.2;post(x,z,5.5+(n%2)*.6,.42);g.add(mesh(cylinder(.65,.65,.22,6),'gold',[x,5.6+(n%2)*.6,z]));if(n<6){const b=((n+1)/6)*Math.PI*1.45-.7;g.add(rod([x,5.45,z],[cx+Math.sin(b)*4.2,5.45,cz+Math.cos(b)*4.2],.22,'chalk'));}}
    const seal=ring(2.4,.08);seal.position.set(cx,.11,cz);seal.rotation.x=Math.PI/2;g.add(seal);
  }else{
    for(const x of [-3.5,3.5])post(...at(x,0),5.3,.45);const dome=mesh(new THREE.TorusGeometry(3.5,.12,5,detail?28:14,Math.PI),'gold',[cx,5.3,cz]);g.add(dome);for(let n=1;n<4;n++){const rib=dome.clone();rib.rotation.y=n*Math.PI/4;g.add(rib);}const equator=ring(3.5,.12);equator.rotation.x=Math.PI/2;equator.position.set(cx,5.3,cz);g.add(equator);g.add(mesh(new THREE.OctahedronGeometry(.75,0),'glow',[cx,6.5,cz]));
  }
  g.userData.obstacles=obstacles;return g;
}

function islandTier(radius,index,region,detail) {
  const g=new THREE.Group();g.name=`island-${index}-lod-${detail}`; const random=seeded(index*37+11), n=detail?40:18;
  const topMaterial=new THREE.MeshStandardMaterial({name:`island-${index}-terrace`,color:[0x789c86,0x648e82,0x607c7e][region%3],roughness:1,flatShading:true});
  g.add(mesh(cylinder(radius,radius*.98,.64,n),topMaterial,[0,-.32,0]));
  g.add(mesh(cylinder(radius*.98,radius*.78,radius*.25,n), 'stone',[0,-radius*.125-.58,0]));
  g.add(mesh(cylinder(radius*.79,radius*.46,radius*.31,n),'dark',[0,-radius*.405-.5,0]));
  const belly=mesh(new THREE.ConeGeometry(radius*.48,radius*.55,n), 'stone',[0,-radius*.83-.42,0]); belly.rotation.z=Math.PI; g.add(belly);
  // Six compatible cliff/terrace variants share a circular ground contract.
  for(let i=0;i<(detail?22:9);i++) {const a=i*Math.PI*2/(detail?22:9)+random()*.1, rr=radius*(.88+random()*.07), h=radius*(.12+random()*.2); const o=mesh(cylinder(radius*.1,radius*.07,h,5),'stone',[Math.sin(a)*rr,-h*.45-.25,Math.cos(a)*rr]);o.rotation.y=a;o.rotation.z=(random()-.5)*.24;g.add(o);}
  if(detail){
    for(let i=0;i<Math.max(9,Math.round(radius*.6));i++){const a=random()*Math.PI*2,rr=radius*(.23+random()*.62),patch=mesh(cylinder(1,1,.05,9),i%3?'turf':'sand',[Math.sin(a)*rr,-.016,Math.cos(a)*rr],[1.5+random()*radius*.12,1,1.2+random()*radius*.1]);patch.rotation.y=random()*6;patch.castShadow=false;g.add(patch);}
    const loop=ring(radius*.72,.055,'copper',48);loop.rotation.x=-Math.PI/2;loop.position.y=.025;g.add(loop);
    // Inlaid brass stepping markers point towards the rim without obstructing play.
    for(let i=0;i<10;i++){const marker=mesh(new THREE.BoxGeometry(.32,.05,.9),'gold',[0,.025,radius*(.17+i*.063)]);marker.rotation.y=(index%3-1)*.1;g.add(marker);}
    for(let i=0;i<8;i++){const a=i*Math.PI/4+.2, rr=radius*.84;const stone=mesh(new THREE.DodecahedronGeometry(radius*.045,0),'chalk',[Math.sin(a)*rr,.08,Math.cos(a)*rr],[1,.45,1]);stone.rotation.set(.2,a,.2);g.add(stone);}
    for(let n=0;n<12;n++){const a=n*Math.PI/6,rr=radius*.84,stone=mesh(new THREE.BoxGeometry(1.5,.13,2.1),'sand',[Math.sin(a)*rr,.025,Math.cos(a)*rr]);stone.rotation.y=a;g.add(stone);}
  }
  const architecture=landmark(radius,index,detail);g.userData.obstacles=architecture.userData.obstacles;g.add(architecture);
  batchStatic(g); if(detail) { const plants=createVegetation({radius,count:Math.round(radius*2.2)+index*3,seed:index});g.add(plants); }
  return g;
}
export function createIsland({radius=12,region=0,index=0}={}) {
  const g=new THREE.Group();g.name=`island-${index}`;const regionIndex=typeof region==='number'?region:({'起風':0,'斷橋':1,'雷雲':2,breeze:0,bridge:1,storm:2}[region]||0);
  const lod=new THREE.LOD();lod.addLevel(islandTier(radius,index,regionIndex,true),0);lod.addLevel(islandTier(radius,index,regionIndex,false),145);g.add(lod);g.userData={radius,region:regionIndex,index,collider:{shape:'cylinder',radius,height:.6,top:0},obstacles:lod.levels[0].object.userData.obstacles,assetId:`aetherwake.island.${index+1}`,lodDistances:[0,145]};return g;
}

export function createVegetation({radius=12,count=24,seed=0}={}) {
  const g=new THREE.Group();g.name='windgrass-cluster';const random=seeded(seed*41+9),dummy=new THREE.Object3D();
  const leaves=new THREE.InstancedMesh(new THREE.ConeGeometry(.24,.9,3),M.moss,count*3); const flowers=new THREE.InstancedMesh(new THREE.IcosahedronGeometry(.09,0),M.gold,count); leaves.receiveShadow=true;
  for(let i=0;i<count;i++){const a=random()*Math.PI*2,rr=radius*(.58+random()*.31),x=Math.sin(a)*rr,z=Math.cos(a)*rr;for(let j=0;j<3;j++){dummy.position.set(x+j*.23,.75,z+j*.18);dummy.rotation.set(.18,random()*6,.2+random()*.25);dummy.scale.set(1.7+random(),1.7+random()*1.8,2.2);dummy.updateMatrix();leaves.setMatrixAt(i*3+j,dummy.matrix);}dummy.position.set(x,1.7,z);dummy.rotation.set(0,0,0);dummy.scale.setScalar(1.8);dummy.updateMatrix();flowers.setMatrixAt(i,dummy.matrix);}
  leaves.name='instanced-grass';flowers.name='instanced-amber-seeds';g.add(leaves,flowers);return g;
}

export function createStation(type=0) {
  const kind=typeof type==='number'?type%3:({wind:0,solar:1,astral:2}[type]??0);const g=new THREE.Group();g.name=['wind-observatory','solar-observatory','astral-observatory'][kind];
  g.add(mesh(cylinder(2.05,2.3,.3,12),'chalk',[0,.15,0]));g.add(mesh(cylinder(1.6,1.9,.18,12),'copper',[0,.39,0]));
  const base=ring(1.45,.07);base.rotation.x=Math.PI/2;base.position.y=.51;g.add(base);
  for(let i=0;i<8;i++){const a=i*Math.PI/4;g.add(rod([Math.sin(a)*1.1,.53,Math.cos(a)*1.1],[Math.sin(a)*1.38,.53,Math.cos(a)*1.38],.03));}
  for(const s of [-1,1]){g.add(mesh(cylinder(.19,.3,2.4,8),'chalk',[s*1.0,1.65,0]));g.add(mesh(cylinder(.3,.3,.13,8),'gold',[s*1.,2.8,0]));}
  g.add(rod([-1,2.8,0],[1,2.8,0],.13));
  const core=mesh(new THREE.OctahedronGeometry(.47,0),'glow',[0,2.15,0],[.8,1.4,.8]);g.add(core);
  if(kind===0){const hoop=ring(1.1,.085);hoop.position.y=2.15;hoop.rotation.y=.45;g.add(hoop);g.add(rod([0,.5,0],[0,3.7,0],.08));for(let i=0;i<4;i++){const a=i*Math.PI/2,blade=mesh(new THREE.BoxGeometry(.65,.18,.08),'gold',[Math.cos(a)*.5,3.5+Math.sin(a)*.5,0]);blade.rotation.z=a+.35;g.add(blade);}}
  if(kind===1){for(let i=0;i<3;i++){const hoop=ring(.78+i*.18,.055);hoop.position.y=2.15;hoop.rotation.set(i*.8,.4+i*.65,.6);g.add(hoop);}for(let i=0;i<8;i++){const a=i*Math.PI/4;g.add(rod([Math.cos(a)*1.05,2.15+Math.sin(a)*1.05,0],[Math.cos(a)*1.35,2.15+Math.sin(a)*1.35,0],.065));}}
  if(kind===2){for(let i=0;i<3;i++){const hoop=ring(1.12,.065);hoop.position.y=2.2;hoop.rotation.set(i*Math.PI/3,.3+i,.5);g.add(hoop);}g.add(mesh(new THREE.ConeGeometry(.6,1.0,8),'gold',[0,3.65,0]));for(let i=0;i<4;i++){const a=i*Math.PI/2;g.add(mesh(new THREE.OctahedronGeometry(.16,0),'glow',[Math.sin(a)*1.48,2.6,Math.cos(a)*1.48]));}}
  batchStatic(g);g.userData={assetId:`aetherwake.station.${kind+1}`,collider:{shape:'cylinder',radius:1.45,height:4.2},type:kind};return g;
}

export function createRelic(index=0) {
  const i=((index%12)+12)%12,g=new THREE.Group();g.name=`relic-${String(i+1).padStart(2,'0')}`;
  const faceted=[new THREE.OctahedronGeometry(.42,0),new THREE.IcosahedronGeometry(.42,0),new THREE.DodecahedronGeometry(.4,0)];const body=mesh(faceted[i%3],'glow',[0,.7,0],[.8+(i%4)*.1,1.15+(i%3)*.15,.65]);body.rotation.set(i*.15,i*.38,0);g.add(body);for(let n=0;n<3;n++)if(n!==i%3)faceted[n].dispose();
  const hoop=ring(.65,.045);hoop.position.y=.7;hoop.rotation.set(i%2?Math.PI/2:0,i*.28,(i%3)*.3);g.add(hoop);
  const count=3+(i%4);for(let n=0;n<count;n++){const a=n*Math.PI*2/count+i*.31;const p=mesh(new THREE.BoxGeometry(.11,.23,.12),'gold',[Math.cos(a)*.62,.7+Math.sin(a)*.62,0]);p.rotation.z=a;g.add(p);}
  if(i>=6){const inner=ring(.34,.025,'chalk',16);inner.position.y=.7;inner.rotation.y=Math.PI/2;g.add(inner);}
  g.add(mesh(cylinder(.32,.43,.12,6),'dark',[0,.06,0]));batchStatic(g);g.userData={assetId:`aetherwake.relic.${String(i+1).padStart(2,'0')}`,variant:i,collider:{shape:'sphere',radius:1.15,center:[0,.7,0]}};return g;
}

export function createWind(type='tailwind',{radius=3,height=9,length=14}={}) {
  const kind=({steady:'tailwind',thermal:'updraft',side:'crosswind',tail:'tailwind',up:'updraft',cross:'crosswind'})[type]||type;const g=new THREE.Group();g.name=`wind-${kind}`;
  const material=new THREE.MeshBasicMaterial({name:`wind-${kind}-light`,color:kind==='updraft'?0xffd799:kind==='crosswind'?0xbeb6f5:0xbceede,transparent:true,opacity:.48,depthWrite:false});
  const n=kind==='updraft'?24:28, particles=new THREE.InstancedMesh(new THREE.ConeGeometry(.18,.85,4),material,n),dummy=new THREE.Object3D();particles.name='wind-direction-volume';g.add(particles);let time=0;
  const paths=[];
  if(kind==='updraft'){for(let i=0;i<3;i++){const arc=mesh(new THREE.TorusGeometry(radius*.78,.055,4,40,Math.PI*1.65),material);arc.rotation.x=-Math.PI/2;arc.position.y=i*height/3;arc.castShadow=false;paths.push(arc);g.add(arc);}}
  else{for(const side of [-1,1]){const curve=new THREE.CatmullRomCurve3(Array.from({length:9},(_,i)=>new THREE.Vector3(side*radius*.55+Math.sin(i*.8)*radius*.08,.6+Math.sin(i*.6)*.25,-length/2+i*length/8)));const stream=mesh(new THREE.TubeGeometry(curve,20,.045,4,false),material);stream.castShadow=false;g.add(stream);}}
  const update=(dt=0)=>{time+=dt;for(let i=0;i<n;i++){const p=((time*.13+i/n)%1),angle=i*2.399+time*.25;if(kind==='updraft'){dummy.position.set(Math.cos(angle)*radius*.78,p*height,Math.sin(angle)*radius*.78);dummy.rotation.set(0,0,0);}else{dummy.position.set(Math.sin(i*4.3)*radius*.7,1.6+Math.sin(i*3.1)*1.7,(p-.5)*length);dummy.rotation.set(Math.PI/2,0,kind==='crosswind'?Math.sin(time+i)*.3:0);}dummy.scale.setScalar(.7+Math.sin(p*Math.PI)*.5);dummy.updateMatrix();particles.setMatrixAt(i,dummy.matrix);}particles.instanceMatrix.needsUpdate=true;for(let i=0;i<paths.length;i++){paths[i].position.y=((time*1.4+i*height/3)%height);paths[i].rotation.z=time*.25+i*2;}};update();g.userData={type:kind,update,assetId:`aetherwake.wind.${kind}`,distribution:{radius,height,length},fixedParticleSize:true};return g;
}

function qTrack(bone,times,rotations) {const values=[];for(const v of rotations){const q=new THREE.Quaternion().setFromEuler(new THREE.Euler(...v));values.push(q.x,q.y,q.z,q.w);}return new THREE.QuaternionKeyframeTrack(`${bone}.quaternion`,times,values);}
export function createPilot() {
  const group=new THREE.Group();group.name='aether-pilot';
  const root=new THREE.Bone();root.name='root';const hips=new THREE.Bone();hips.name='hips';hips.position.y=.82;root.add(hips);
  const torso=new THREE.Bone();torso.name='torso';torso.position.y=.22;hips.add(torso);
  const head=new THREE.Bone();head.name='head';head.position.y=.55;torso.add(head);
  const leftArm=new THREE.Bone();leftArm.name='leftArm';leftArm.position.set(-.32,.32,0);torso.add(leftArm);
  const rightArm=new THREE.Bone();rightArm.name='rightArm';rightArm.position.set(.32,.32,0);torso.add(rightArm);
  const leftLeg=new THREE.Bone();leftLeg.name='leftLeg';leftLeg.position.set(-.15,-.05,0);hips.add(leftLeg);
  const rightLeg=new THREE.Bone();rightLeg.name='rightLeg';rightLeg.position.set(.15,-.05,0);hips.add(rightLeg);
  const bones=[root,hips,torso,head,leftArm,rightArm,leftLeg,rightLeg];root.updateMatrixWorld(true);const parts=[];
  const addPart=(geometry,bone,position,scale,color)=>{if(geometry.index)geometry=geometry.toNonIndexed();const transform=new THREE.Matrix4().compose(new THREE.Vector3(...position),new THREE.Quaternion(),new THREE.Vector3(...scale));geometry.applyMatrix4(transform).applyMatrix4(bone.matrixWorld);const count=geometry.attributes.position.count,skinI=new Uint16Array(count*4),skinW=new Float32Array(count*4),colors=new Float32Array(count*3),c=new THREE.Color(color);for(let i=0;i<count;i++){skinI[i*4]=bones.indexOf(bone);skinW[i*4]=1;colors[i*3]=c.r;colors[i*3+1]=c.g;colors[i*3+2]=c.b;}geometry.setAttribute('skinIndex',new THREE.BufferAttribute(skinI,4));geometry.setAttribute('skinWeight',new THREE.BufferAttribute(skinW,4));geometry.setAttribute('color',new THREE.BufferAttribute(colors,3));parts.push(geometry);};
  addPart(cylinder(.29,.24,.6,8),torso,[0,.22,0],[1,1,1],PALETTE.chalk);
  addPart(new THREE.BoxGeometry(.42,.16,.33),hips,[0,.04,0],[1,1,1],PALETTE.copper);
  addPart(new THREE.SphereGeometry(.235,10,7),head,[0,.08,.035],[1,1.05,1],0xc99b7e);
  addPart(new THREE.SphereGeometry(.25,10,6,0,Math.PI*2,0,Math.PI*.57),head,[0,.11,.02],[1,1,1],PALETTE.ink);
  addPart(new THREE.BoxGeometry(.4,.11,.12),head,[0,.12,.23],[1,1,1],PALETTE.gold);
  addPart(new THREE.BoxGeometry(.42,.5,.23),torso,[0,.25,-.24],[1,1,1],PALETTE.copper);
  for(const arm of [leftArm,rightArm]){addPart(cylinder(.105,.08,.55,7),arm,[0,-.2,0],[1,1,1],PALETTE.chalk);addPart(new THREE.SphereGeometry(.09,8,5),arm,[0,-.48,0],[1,1,1],0xc99b7e);}
  for(const leg of [leftLeg,rightLeg]){addPart(cylinder(.105,.08,.59,7),leg,[0,-.3,0],[1,1,1],PALETTE.ink);addPart(new THREE.BoxGeometry(.19,.16,.33),leg,[0,-.64,.065],[1,1,1],PALETTE.copper);}
  const geometry=mergeGeometries(parts);const skinMaterial=new THREE.MeshStandardMaterial({name:'pilot-vertex-palette',vertexColors:true,roughness:.8});const skin=new THREE.SkinnedMesh(geometry,skinMaterial);skin.name='pilot-rigged-body';skin.add(root);skin.bind(new THREE.Skeleton(bones));skin.castShadow=true;group.add(skin);for(const p of parts)p.dispose();
  // An actual curved airfoil with thickness, seam ribs, spars and suspension lines.
  const sail=new THREE.Group();sail.name='ivory-glider';const rows=7,cols=17,pos=[],uv=[],indices=[];
  for(let j=0;j<rows;j++)for(let i=0;i<cols;i++){const u=i/(cols-1),v=j/(rows-1),x=(u-.5)*4.6,z=(v-.5)*1.65-.12;pos.push(x,2.13+.4*Math.sin(u*Math.PI)+.16*Math.sin(v*Math.PI),z);uv.push(u,v);}
  for(let j=0;j<rows-1;j++)for(let i=0;i<cols-1;i++){const a=j*cols+i;indices.push(a,a+1,a+cols,a+1,a+cols+1,a+cols);}
  const layer=rows*cols,topIndices=[...indices];for(let i=0;i<layer;i++){pos.push(pos[i*3],pos[i*3+1]-.026,pos[i*3+2]);uv.push(uv[i*2],uv[i*2+1]);}
  for(let i=0;i<topIndices.length;i+=3)indices.push(topIndices[i]+layer,topIndices[i+2]+layer,topIndices[i+1]+layer);
  const rim=[];for(let i=0;i<cols;i++)rim.push(i);for(let j=1;j<rows;j++)rim.push(j*cols+cols-1);for(let i=cols-2;i>=0;i--)rim.push((rows-1)*cols+i);for(let j=rows-2;j>0;j--)rim.push(j*cols);
  for(let i=0;i<rim.length;i++){const a=rim[i],b=rim[(i+1)%rim.length];indices.push(a,b,a+layer,b,b+layer,a+layer);}
  const sg=new THREE.BufferGeometry();sg.setAttribute('position',new THREE.Float32BufferAttribute(pos,3));sg.setAttribute('uv',new THREE.Float32BufferAttribute(uv,2));sg.setIndex(indices);sg.computeVertexNormals();sail.add(mesh(sg,'chalk'));
  for(const k of [-1,-.5,0,.5,1]){const x=k*2.3,y=2.13+.4*Math.sin((k+1)*Math.PI/2);sail.add(rod([x,y,-.94],[x,y,.7],.023,'gold'));}
  sail.add(rod([-2.3,2.13,-.94],[0,2.53,-.94],.035,'gold'),rod([0,2.53,-.94],[2.3,2.13,-.94],.035,'gold'));
  for(const s of [-1,1])sail.add(rod([s*1.65,2.35,-.45],[s*.38,1.2,0],.016,'ink'),rod([s*1.65,2.35,.45],[s*.38,1.2,0],.016,'ink'));
  const stripe=mesh(new THREE.BoxGeometry(.35,.025,1.58),'copper',[0,2.55,-.12]);sail.add(stripe);batchStatic(sail);sail.visible=false;group.add(sail);
  const clips=[
    new THREE.AnimationClip('idle',2.4,[qTrack('torso',[0,1.2,2.4],[[.025,0,0],[-.025,0,0],[.025,0,0]]),qTrack('leftArm',[0,1.2,2.4],[[0,0,-.09],[.04,0,-.06],[0,0,-.09]]),qTrack('rightArm',[0,1.2,2.4],[[0,0,.09],[-.04,0,.06],[0,0,.09]])]),
    new THREE.AnimationClip('run',.7,[qTrack('leftLeg',[0,.175,.35,.525,.7],[[.6,0,0],[0,0,0],[-.6,0,0],[0,0,0],[.6,0,0]]),qTrack('rightLeg',[0,.175,.35,.525,.7],[[-.6,0,0],[0,0,0],[.6,0,0],[0,0,0],[-.6,0,0]]),qTrack('leftArm',[0,.35,.7],[[-.5,0,-.08],[.5,0,-.08],[-.5,0,-.08]]),qTrack('rightArm',[0,.35,.7],[[.5,0,.08],[-.5,0,.08],[.5,0,.08]])]),
    new THREE.AnimationClip('jump',.45,[qTrack('torso',[0,.2,.45],[[.12,0,0],[-.12,0,0],[-.05,0,0]]),qTrack('leftLeg',[0,.2,.45],[[0,0,0],[-.5,0,0],[.15,0,0]]),qTrack('rightLeg',[0,.2,.45],[[0,0,0],[-.45,0,0],[.1,0,0]]),qTrack('leftArm',[0,.3,.45],[[0,0,0],[0,0,-1.4],[0,0,-1.2]]),qTrack('rightArm',[0,.3,.45],[[0,0,0],[0,0,1.4],[0,0,1.2]])]),
    new THREE.AnimationClip('glide',2,[qTrack('torso',[0,1,2],[[.15,0,0],[.2,0,0],[.15,0,0]]),qTrack('leftArm',[0,1,2],[[0,0,-1.7],[.06,0,-1.65],[0,0,-1.7]]),qTrack('rightArm',[0,1,2],[[0,0,1.7],[-.06,0,1.65],[0,0,1.7]]),qTrack('leftLeg',[0,1,2],[[.25,0,-.08],[.32,0,-.06],[.25,0,-.08]]),qTrack('rightLeg',[0,1,2],[[.32,0,.08],[.25,0,.06],[.32,0,.08]])]),
    new THREE.AnimationClip('land',.4,[qTrack('torso',[0,.14,.4],[[.15,0,0],[.35,0,0],[0,0,0]]),qTrack('leftLeg',[0,.14,.4],[[.2,0,0],[-.3,0,0],[0,0,0]]),qTrack('rightLeg',[0,.14,.4],[[.2,0,0],[-.3,0,0],[0,0,0]])]),
  ];
  const mixer=new THREE.AnimationMixer(group),actions=Object.fromEntries(clips.map(c=>[c.name,mixer.clipAction(c)]));for(const key of ['jump','land']){actions[key].setLoop(THREE.LoopOnce,1);actions[key].clampWhenFinished=true;}let current='idle';actions.idle.play();
  const update=(dt,state={})=>{const s=typeof state==='string'?{mode:state}:state;const next=s.mode||s.state||(s.gliding?'glide':s.grounded===false?'jump':s.speed>0.5?'run':'idle');const action=actions[next]?next:'idle';if(action!==current){actions[action].reset().play();actions[current].crossFadeTo(actions[action],.16,false);current=action;}sail.visible=action==='glide';if(action==='run')actions.run.timeScale=Math.max(.7,Math.min(1.7,(s.speed||5)/5));mixer.update(Math.min(dt,.1));};
  group.userData={assetId:'aetherwake.pilot',skeleton:bones.map(b=>b.name),clips:clips.map(c=>c.name),collider:{shape:'capsule',radius:.3,height:1.85},rootMotion:false};return {group,mixer,clips,update,sail};
}

export function disposeModel(group) {const geometries=new Set(),materials=new Set();group.traverse(o=>{if(o.geometry)geometries.add(o.geometry);if(o.material){for(const m of Array.isArray(o.material)?o.material:[o.material]) materials.add(m);}});for(const g of geometries)g.dispose();for(const m of materials)if(!Object.values(M).includes(m))m.dispose();}
