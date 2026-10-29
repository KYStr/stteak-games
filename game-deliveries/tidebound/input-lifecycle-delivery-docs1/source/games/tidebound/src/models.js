import * as THREE from 'three';

/** Tidebound's authored mesh library. Metres, Y up, vessel/character forward -Z.
 * All core objects are volumetric geometry. This is also the editable source used
 * by export-assets.mjs; no raster impostors or external asset requests are used. */
export const PALETTE = { water: 0x187f8d, deep: 0x145b70, foam: 0xc9f2df, cream: 0xfff0ce, sand: 0xe6c998, coral: 0xef806d, dark: 0x254f59, wood: 0x986c4e, leaf: 0x3e8c77, leafLight: 0x77b991, brass: 0xe6b95d, stone: 0xa7b8ae };
export function material(name, color, roughness = .78, extra = {}) { const m = new THREE.MeshStandardMaterial({ color, roughness, metalness: 0, ...extra }); m.name = name; return m; }
const M = {
  cream: material('warm-linen', PALETTE.cream), sand: material('warm-sand', PALETTE.sand), coral: material('coral-enamel', PALETTE.coral),
  dark: material('deep-teal-enamel', PALETTE.dark), wood: material('oiled-timber', PALETTE.wood), leaf: material('mangrove-leaf', PALETTE.leaf),
  leafLight: material('palm-leaf-tip', PALETTE.leafLight), brass: material('aged-brass', PALETTE.brass, .4, {metalness:.45}),
  stone: material('chalk-stone', PALETTE.stone), rock: material('submerged-basalt', 0x658586), glass: material('sea-glass', 0x85ded1, .25, { metalness: .1 }),
};
export function mesh(geometry, mat, x=0,y=0,z=0, name='mesh') { const o = new THREE.Mesh(geometry, mat); o.position.set(x,y,z); o.name=name; o.castShadow=true; o.receiveShadow=true; return o; }
const box = (x,y,z,mat,px=0,py=0,pz=0,name='timber') => mesh(new THREE.BoxGeometry(x,y,z),mat,px,py,pz,name);
const cyl = (r1,r2,h,mat,x=0,y=0,z=0,n=8,name='column') => mesh(new THREE.CylinderGeometry(r1,r2,h,n),mat,x,y,z,name);
const ico = (r,mat,x=0,y=0,z=0,detail=0,name='stone') => mesh(new THREE.IcosahedronGeometry(r,detail),mat,x,y,z,name);
const group = name => { const o = new THREE.Group(); o.name=name; return o; };
export function beamBetween(a,b,r,mat=M.wood,name='branch') {const d=new THREE.Vector3().subVectors(b,a);const o=cyl(r*.8,r,d.length(),mat,0,0,0,6,name);o.position.copy(a).add(b).multiplyScalar(.5);o.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),d.normalize());return o;}
function planHull() {
  const outline = [[0,-6.8],[1.9,-4.3],[2.65,-1],[2.5,3.6],[1.85,5.1],[-1.85,5.1],[-2.5,3.6],[-2.65,-1],[-1.9,-4.3]];
  const p=[],ind=[],uv=[]; const rings=[{scale:.55,y:-1.45},{scale:.92,y:-.25},{scale:1,y:.85}];
  rings.forEach(r=>outline.forEach(([x,z],i)=>{p.push(x*r.scale,r.y,z*r.scale);uv.push(i/(outline.length-1),(r.y+1.45)/2.3);}));
  for(let j=0;j<2;j++)for(let i=0;i<outline.length;i++){const a=j*outline.length+i,b=j*outline.length+(i+1)%outline.length,c=a+outline.length,d=b+outline.length;ind.push(a,c,b,b,c,d);}
  const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(p,3));g.setAttribute('uv',new THREE.Float32BufferAttribute(uv,2));g.setIndex(ind);g.computeVertexNormals();return g;
}
function sailPanel(width,height,color,name) {
  const shape=new THREE.Shape();shape.moveTo(0,0);shape.lineTo(width,1);shape.quadraticCurveTo(width*.48,height*.48,0,height);shape.closePath();
  const sail=mesh(new THREE.ExtrudeGeometry(shape,{depth:.095,bevelEnabled:true,bevelSegments:1,steps:1,bevelSize:.04,bevelThickness:.025,curveSegments:5}),color,0,0,0,name);
  return sail;
}
export function createBoat(rig='steady') {
  const o=group(`tidebound-vessel-${rig}`);o.add(mesh(planHull(),M.dark,0,0,0,'lapstrake-hull'));
  const deckShape=new THREE.Shape();deckShape.moveTo(0,6.5);deckShape.lineTo(1.8,4.2);deckShape.lineTo(2.45,1);deckShape.lineTo(2.3,-3.5);deckShape.lineTo(1.7,-4.9);deckShape.lineTo(-1.7,-4.9);deckShape.lineTo(-2.3,-3.5);deckShape.lineTo(-2.45,1);deckShape.lineTo(-1.8,4.2);deckShape.closePath();
  const deck=mesh(new THREE.ExtrudeGeometry(deckShape,{depth:.22,bevelEnabled:false}),M.cream,0,.72,0,'laid-deck');deck.rotation.x=-Math.PI/2;o.add(deck);
  for(let s of [-1,1]) {const stripe=box(.14,.35,7.4,M.coral,s*2.45,.51,.1,'painted-waterline');stripe.rotation.y=s*.04;o.add(stripe);o.add(box(.12,.15,7.4,M.wood,s*2.39,1.35,.2,'gunwale'));for(let z=-2.8;z<4;z+=2.1)o.add(cyl(.07,.07,.7,M.wood,s*2.38,1.05,z,5,'railing-post'));}
  o.add(box(2.4,.9,2.4,M.wood,0,1.25,2.3,'cabin'));o.add(box(2.6,.18,2.6,M.cream,0,1.8,2.3,'cabin-roof'));o.add(box(1.1,.65,.06,M.dark,0,1.35,1.07,'cabin-window'));
  o.add(cyl(.14,.21,11.6,M.wood,0,6.1,-.55,8,'main-mast'));o.add(box(.22,.3,2,M.wood,0,1.2,4.5,'rudder-tiller'));
  const sails=group('sail-rig');sails.position.set(0,2.1,-.55);
  if(rig==='cargo') {const p=box(7.4,6.4,.1,M.cream,0,4.5,0,'cargo-square-sail');sails.add(p);sails.add(box(7.6,.15,.17,M.wood,0,7.75,0,'cargo-yard'));sails.add(box(7.4,.65,.16,M.coral,0,1.8,-.05,'sail-reef-band'));for(let x of [-2.4,0,2.4])sails.add(box(.05,6.2,.12,M.sand,x,4.5,-.08,'cloth-seam'));}
  else {sails.add(sailPanel(rig==='swift'?6:4.9,9,M.cream,'mainsail'));const left=sailPanel(rig==='swift'?-4.4:-2.7,rig==='swift'?7.7:6.5,rig==='swift'?M.coral:M.sand,'jib');left.position.z=-.12;sails.add(left);sails.add(beamBetween(new THREE.Vector3(0,.15,.1),new THREE.Vector3(rig==='swift'?6:4.9,1,.1),.09,M.wood,'sail-boom'));const emblem=ico(.64,M.coral,1.1,4.5,-.14,0,'sail-star');emblem.scale.set(1,1,.15);sails.add(emblem);}
  o.add(sails);o.add(beamBetween(new THREE.Vector3(0,11.8,-.55),new THREE.Vector3(0,1,-6.1),.025,M.cream,'forestay'));o.add(beamBetween(new THREE.Vector3(0,11.8,-.55),new THREE.Vector3(0,1,4.9),.025,M.cream,'backstay'));
  const pennant=sailPanel(1.8,.85,M.coral,'mast-pennant');pennant.position.set(0,11.3,-.55);o.add(pennant);
  const ring=mesh(new THREE.TorusGeometry(.6,.15,6,12),M.coral,-2.5,.85,2.4,'life-ring');ring.rotation.y=Math.PI/2;o.add(ring);
  for(let i=0;i<(rig==='cargo'?3:1);i++)o.add(box(.9,.8,.9,M.sand,(i-1)*1.1,1.2,-3.5,'supply-crate'));
  o.userData={assetId:`tidebound.vessel.${rig}`,forward:'-Z',rig,colliders:[{type:'capsule',radius:2.5,length:8,axis:'z',center:[0,0,-.7]}]};return o;
}

export function createPalm(seed=0, mangrove=false) {
  const o=group(mangrove?'mangrove-tree':'coastal-palm');const h=7+(seed%3),bend=(seed%2?1:-1)*1.1;
  o.add(beamBetween(new THREE.Vector3(0,0,0),new THREE.Vector3(bend,h,0),mangrove?.55:.32,M.wood,'trunk'));
  if(mangrove){for(let i=0;i<5;i++){const a=i*Math.PI*2/5;o.add(beamBetween(new THREE.Vector3(bend*.2,2.4,0),new THREE.Vector3(Math.cos(a)*2.2,-.3,Math.sin(a)*2.2),.18,M.wood,'exposed-root'));}const leaf=ico(3.5,M.leaf,bend,h,0,1,'mangrove-crown');leaf.scale.y=.65;o.add(leaf);}
  else {for(let i=0;i<7;i++){const a=i*Math.PI*2/7;const shape=new THREE.Shape();shape.moveTo(0,0);shape.quadraticCurveTo(.7,1.3,0,4.7);shape.quadraticCurveTo(-.7,1.3,0,0);const leaf=mesh(new THREE.ExtrudeGeometry(shape,{depth:.13,bevelEnabled:false,curveSegments:4}),i%2?M.leaf:M.leafLight,bend,h,0,`palm-frond-${i}`);leaf.rotation.set(-.95,a,0,'YXZ');o.add(leaf);}for(let i=0;i<3;i++)o.add(ico(.36,M.wood,bend+Math.sin(i*2)*.4,h-.4,Math.cos(i*2)*.4,0,'coconut'));}
  o.userData={assetId:`tidebound.flora.${mangrove?'mangrove':'palm'}`,colliders:[{type:'cylinder',radius:.6,height:h,center:[bend*.5,h*.5,0]}]};return o;
}
function terrainRing(radius,height,seed,mat,y=0){const g=new THREE.CylinderGeometry(radius*.9,radius,height,12,1,false);const p=g.attributes.position;for(let i=0;i<p.count;i++){const x=p.getX(i),z=p.getZ(i);const a=Math.atan2(z,x);const f=(1+.09*Math.sin(a*3+seed)+.04*Math.cos(a*5+seed))/1.13;p.setXYZ(i,x*f,p.getY(i),z*f);}g.computeVertexNormals();const o=mesh(g,mat,0,y,0,'terraced-shore');return o;}
export function createIsland(data={id:'island',radius:24,color:'#ead9ad',type:'explore'}) {
  const o=group(`island-${data.id}`),r=data.radius||24;const seed=String(data.id).split('').reduce((a,b)=>a+b.charCodeAt(0),0);
  o.add(terrainRing(r,4,seed,M.sand,-1.9));o.add(terrainRing(r*.99,3.6,seed,M.sand,1));
  const topMat=material(`${data.id}-earth`,data.type==='reef'?0x679e94:0x7fa98a);
  o.add(terrainRing(r*.79,5.1,seed,M.rock,3));o.add(terrainRing(r*.80,.8,seed,topMat,5.5));
  if(data.id==='gull'||data.id==='lighthouse'){const upperRadius=data.id==='gull'?.74:.53;o.add(terrainRing(r*upperRadius,5,seed+4,M.stone,7.5));o.add(terrainRing(r*(upperRadius+.01),.7,seed+4,topMat,10));}
  if(data.id==='ruin'){for(let i=0;i<5;i++){const a=i*1.25;o.add(cyl(1.1,1.3,7.3,M.cream,Math.sin(a)*10,9.4,Math.cos(a)*9,6,'ruin-colonnade'));o.add(box(3,.6,2.5,M.stone,Math.sin(a)*10,13.1,Math.cos(a)*9,'ruin-capital'));}o.add(cyl(7,7,1,M.stone,0,6.2,0,12,'star-court'));}
  if(data.id==='reef'){for(let i=0;i<9;i++){const crystal=ico(3.1,i%2?M.glass:M.coral,Math.cos(i*2.4)*8,5.4,Math.sin(i*2.4)*8,0,'glassy-reef-spire');crystal.scale.set(.65,1.7,.65);o.add(crystal);}o.add(box(5.2,2.2,3,M.sand,-7,1.1,10.2,'reef-jetty-landing'));}
  o.userData={assetId:`tidebound.island.${data.id}`,groundHeight:data.id==='gull'||data.id==='lighthouse'?10.4:5.9,colliders:[{type:'cylinder',radius:r,height:10,center:[0,2.5,0]}]};return o;
}

export function createHarbor() {const o=group('harbor-kit');for(let i=0;i<3;i++){const x=(i-1)*8,z=i%2?2:-2;o.add(box(6.4,5.2,6.4,M.cream,x,8.6,z,'port-house'));const roof=cyl(0,5.3,2.9,i===1?M.dark:M.coral,x,12.4,z,4,'hipped-tile-roof');roof.rotation.y=Math.PI/4;o.add(roof);for(let s of [-1,1])o.add(box(1.1,1.7,.13,M.dark,x+s*1.6,8.8,z-3.24,'shutter-window'));o.add(box(1.4,2.6,.13,M.wood,x,7.4,z-3.24,'port-door'));}o.add(cyl(.2,.25,11,M.wood,10,10,-9,8,'harbor-flagpole'));const f=sailPanel(4,2,M.coral,'harbor-pennant');f.position.set(10,13,-9);o.add(f);for(let i=0;i<5;i++)o.add(box(1.8,1.8,1.8,i%2?M.sand:M.wood,-11.7+i*2.1,6.8,-9,'cargo-stack'));o.userData.colliders=[{type:'box',size:[25,9,15],center:[0,9,0]}];return o;}
export function createPier(length=13) {const o=group('timber-jetty');for(let z=0;z<length;z+=1.3)o.add(box(5,.28,1.12,M.wood,0,2.15,z,'jetty-plank'));for(let z=1;z<length;z+=4)for(let x of [-2.2,2.2])o.add(cyl(.18,.23,5.8,M.wood,x,.8,z,6,'jetty-pile'));for(let x of [-2.3,2.3]){o.add(cyl(.35,.35,1.1,M.dark,x,2.9,.5,8,'mooring-bollard'));const rope=mesh(new THREE.TorusGeometry(.5,.11,5,12),M.sand,x,2.8,.5,'mooring-rope');rope.rotation.x=Math.PI/2;o.add(rope);}return o;}
export function createLighthouse(repaired=false){const o=group('far-tide-lighthouse');o.add(cyl(4.8,6,1.7,M.stone,0,.85,0,12,'tower-foundation'));o.add(cyl(2.8,4.3,22,M.cream,0,12,0,12,'lighthouse-tower'));for(let y of [5.5,12,18])o.add(cyl(y>15?3:3.8,y>15?3.2:4,1.8,M.coral,0,y,0,12,'tower-band'));o.add(cyl(4.1,4.1,.8,M.dark,0,23,0,12,'lantern-balcony'));for(let i=0;i<8;i++){const a=i*Math.PI/4;o.add(cyl(.09,.09,3.8,M.dark,Math.sin(a)*2.7,25,Math.cos(a)*2.7,5,'lantern-frame'));}o.add(cyl(0,4.1,3.2,M.dark,0,28,0,12,'lantern-roof'));const lens=ico(1.7,repaired?material('beacon-light',0xffe8a6,.25,{emissive:0xffce69,emissiveIntensity:2}):M.glass,0,25,0,1,'keeper-lens');o.add(lens);o.add(box(1.6,3,.2,M.dark,0,2,-4.25,'lighthouse-door'));o.userData={assetId:'tidebound.structure.lighthouse',colliders:[{type:'cylinder',radius:5,height:30,center:[0,15,0]}]};return o;}
export function createReef(radius=6) {const o=group('tidal-rock-cluster');for(let i=0;i<7;i++){const a=i*2.4;const r=radius*(.24+.1*(i%4));const v=ico(radius*(.25+.06*(i%3)),i%3?M.rock:M.sand,Math.cos(a)*r,-.8+Math.sin(i)*.3,Math.sin(a)*r,0,'tidal-reef');v.scale.y=.75;o.add(v);}return o;}

export function createDiscovery(id) {
  const o=group(`discovery-${id}`);
  if(id==='foxfish'){const body=ico(1.15,M.coral,0,0,0,1,'fox-fish-body');body.scale.set(.45,.8,1.7);o.add(body);const tail=cyl(0,.9,1.6,M.brass,0,0,2,3,'fish-tail');tail.rotation.x=Math.PI/2;o.add(tail);for(let s of [-1,1])o.add(ico(.18,M.dark,s*.42,.25,-1,1,'fish-eye'));for(let z of [-.3,.4])o.add(box(.95,1.35,.13,M.cream,0,0,z,'fish-stripe'));}
  else if(id==='tern'){const body=ico(1,M.cream,0,0,0,1,'tern-body');body.scale.set(.6,.6,1.3);o.add(body);for(let s of [-1,1]){const w=ico(1,M.cream,s*1.4,.2,.15,0,'tern-wing');w.scale.set(2,.15,.7);w.rotation.z=s*.2;o.add(w);}const beak=cyl(0,.25,1,M.coral,0,.15,-1.25,5,'tern-beak');beak.rotation.x=-Math.PI/2;o.add(beak);}
  else if(id==='turtle'){const shell=ico(1.8,M.leaf,0,.3,0,1,'turtle-shell');shell.scale.set(1,.5,1.15);o.add(shell);o.add(ico(.65,M.leafLight,0,.15,-2,1,'turtle-head'));for(let s of [-1,1])for(let z of [-1,1]){const fin=ico(.9,M.leafLight,s*1.5,0,z,0,'turtle-flipper');fin.scale.set(1.1,.2,.5);fin.rotation.y=s*z*.45;o.add(fin);}}
  else if(id==='nautilus'){for(let i=0;i<10;i++){const a=i*.65,r=.15+i*.15;o.add(ico(.25+i*.075,i%2?M.sand:M.cream,Math.cos(a)*r,Math.sin(a)*r,0,0,'nautilus-shell-ridge'));}for(let i=0;i<5;i++)o.add(beamBetween(new THREE.Vector3(-1,-.5,0),new THREE.Vector3(-2.1,-1+i*.3,(i-2)*.18),.07,M.coral,'nautilus-tentacle'));}
  else if(id==='fan-coral'){for(let i=0;i<8;i++){const a=(i/7-.5)*2.4,end=new THREE.Vector3(Math.sin(a)*3.5,Math.cos(a)*3.5+.6,Math.sin(i)*.25);o.add(beamBetween(new THREE.Vector3(0,0,0),end,.15,M.coral,'coral-fan-branch'));for(let k=1;k<4;k++){const p=end.clone().multiplyScalar(k/4);o.add(beamBetween(p,p.clone().add(new THREE.Vector3(.55,1,.18)),.09,M.coral,'coral-fan-filament'));}}}
  else if(id==='mangrove-root')o.add(createPalm(1,true));
  else if(id==='seagrass'){for(let i=0;i<12;i++){const grass=cyl(.02,.14,2.5+i%3,M.leafLight,Math.sin(i*2.4)*1.4,1.4,Math.cos(i*2.4)*1.4,3,'ribbon-seagrass');grass.rotation.z=Math.sin(i)*.3;o.add(grass);}}
  else if(id==='glass-coral'){for(let i=0;i<7;i++){const p=ico(1.1,M.glass,Math.sin(i*2.4)*1.8,1+i%3*.45,Math.cos(i*2.4)*1.8,0,'glass-branch');p.scale.set(.45,2.4,.55);o.add(p);}}
  else if(id==='star-tablet'){o.add(box(3.2,4.5,.75,M.stone,0,2.2,0,'star-tablet'));for(let i=0;i<7;i++){const a=i*Math.PI*2/7;o.add(ico(.17,M.brass,Math.sin(a)*1.05,2.4+Math.cos(a)*1.25,-.45,0,'seven-star-inlay'));}o.add(box(3.6,.5,1.4,M.cream,0,.25,0,'tablet-plinth'));}
  else if(id==='tide-clock'){const rim=mesh(new THREE.TorusGeometry(2,.35,6,16),M.brass,0,2,0,'tide-clock-rim');o.add(rim);o.add(cyl(1.9,1.9,.4,M.dark,0,2,0,12,'clock-face'));o.children[1].rotation.x=Math.PI/2;o.add(box(.15,1.6,.2,M.cream,.15,2.5,-.4,'clock-hand'));for(let i=0;i<8;i++){const a=i*Math.PI/4;o.add(box(.35,.35,.6,M.brass,Math.sin(a)*2.1,2+Math.cos(a)*2.1,0,'clock-gear'));}}
  else if(id==='beacon-lens'){o.add(cyl(1.5,1.9,.7,M.stone,0,.35,0,8,'lens-plinth'));const lens=ico(2,M.glass,0,2.5,0,1,'refractor-lens');lens.scale.set(1,1,.4);o.add(lens);const rim=mesh(new THREE.TorusGeometry(2.1,.18,6,16),M.brass,0,2.5,0,'lens-frame');o.add(rim);}
  else {o.add(box(3.8,1.5,2.4,M.wood,0,.75,0,'keepers-archive'));o.add(box(4,.3,2.5,M.coral,0,1.6,0,'archive-lid'));o.add(box(.5,.7,.15,M.brass,0,1,-1.25,'archive-lock'));const book=box(1.3,.3,1.7,M.cream,.4,1.95,0,'keepers-journal');book.rotation.y=-.2;o.add(book);}
  o.userData={assetId:`tidebound.discovery.${id}`,colliders:[{type:'sphere',radius:2.5,center:[0,1,0]}]};return o;
}

/** Rigid weighted low-poly rig: each vertex belongs to one bone. Animated clips
 * are exported with the exact mesh/skeleton used for dock and underwater play. */
export function createVoyager() {
  const root=group('tide-voyager'),bones=[];
  const bone=(name,parent,x,y,z)=>{const b=new THREE.Bone();b.name=name;b.position.set(x,y,z);parent?.add(b);bones.push(b);return b;};
  const hips=bone('Hips',null,0,1.1,0),spine=bone('Spine',hips,0,.5,0),head=bone('Head',spine,0,.62,0);
  bone('LeftArm',spine,-.52,.22,0);bone('RightArm',spine,.52,.22,0);bone('LeftLeg',hips,-.24,-.2,0);bone('RightLeg',hips,.24,-.2,0);
  root.add(hips);root.updateMatrixWorld(true);
  const p=[],n=[],uv=[],skin=[],weights=[],color=[],index=[];
  const body=(bi,size,offset,col)=>{const g=new THREE.BoxGeometry(...size);const q=new THREE.Vector3();const c=new THREE.Color(col);const base=p.length/3;for(let i=0;i<g.attributes.position.count;i++){q.fromBufferAttribute(g.attributes.position,i).add(new THREE.Vector3(...offset));bones[bi].localToWorld(q);p.push(q.x,q.y,q.z);n.push(g.attributes.normal.getX(i),g.attributes.normal.getY(i),g.attributes.normal.getZ(i));uv.push(g.attributes.uv.getX(i),g.attributes.uv.getY(i));skin.push(bi,0,0,0);weights.push(1,0,0,0);color.push(c.r,c.g,c.b);}for(let i=0;i<g.index.count;i++)index.push(base+g.index.getX(i));g.dispose();};
  body(0,[.7,.4,.48],[0,0,0],PALETTE.dark);body(1,[.86,.78,.5],[0,0,0],PALETTE.coral);body(2,[.61,.6,.58],[0,.04,0],0xe9bc91);body(2,[.8,.13,.78],[0,.4,0],PALETTE.cream);body(2,[.58,.28,.56],[0,.52,0],PALETTE.cream);body(2,[.46,.16,.1],[0,.12,-.32],PALETTE.dark);
  for(let i of [3,4]){body(i,[.24,.72,.28],[0,-.3,0],PALETTE.coral);body(i,[.23,.24,.25],[0,-.75,0],0xe9bc91);}for(let i of [5,6]){body(i,[.3,.8,.34],[0,-.35,0],PALETTE.dark);body(i,[.35,.22,.58],[0,-.82,-.12],PALETTE.cream);}
  const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(p,3));g.setAttribute('normal',new THREE.Float32BufferAttribute(n,3));g.setAttribute('uv',new THREE.Float32BufferAttribute(uv,2));g.setAttribute('color',new THREE.Float32BufferAttribute(color,3));g.setAttribute('skinIndex',new THREE.Uint16BufferAttribute(skin,4));g.setAttribute('skinWeight',new THREE.Float32BufferAttribute(weights,4));g.setIndex(index);const sm=new THREE.SkinnedMesh(g,material('voyager-woven-uniform',0xffffff,.85,{vertexColors:true}));sm.name='VoyagerSkin';sm.castShadow=true;root.add(sm);sm.bind(new THREE.Skeleton(bones));
  const qt=(name,axis,angles,times)=>{const values=angles.flatMap(a=>new THREE.Quaternion().setFromAxisAngle(axis,a).toArray());return new THREE.QuaternionKeyframeTrack(`${name}.quaternion`,times,values);};
  const axis=new THREE.Vector3(1,0,0),zaxis=new THREE.Vector3(0,0,1);
  root.animations=[new THREE.AnimationClip('DockIdle',3,[qt('LeftArm',zaxis,[.08,.14,.08],[0,1.5,3]),qt('RightArm',zaxis,[-.08,-.14,-.08],[0,1.5,3]),qt('Head',axis,[0,.07,0],[0,1.5,3])]),new THREE.AnimationClip('Swim',1.6,[qt('LeftArm',axis,[-1.8,.6,-1.8],[0,.8,1.6]),qt('RightArm',axis,[.6,-1.8,.6],[0,.8,1.6]),qt('LeftLeg',axis,[-.4,.4,-.4],[0,.8,1.6]),qt('RightLeg',axis,[.4,-.4,.4],[0,.8,1.6])]),new THREE.AnimationClip('DockWave',1.8,[qt('RightArm',zaxis,[-2.5,-2.1,-2.5,-2.1,-2.5],[0,.45,.9,1.35,1.8])])];
  root.userData={assetId:'tidebound.character.voyager',rootMotion:false,colliders:[{type:'capsule',radius:.48,height:2.7,center:[0,1.35,0]}]};return root;
}

export function createCurrentArrow(){const o=group('three-dimensional-current-marker');const arrow=box(.45,.15,3.7,M.glass,0,0,.3,'current-shaft');o.add(arrow);for(let s of [-1,1]){const p=box(.45,.16,1.9,M.glass,s*.62,0,-1.1,'current-chevron');p.rotation.y=-s*.75;o.add(p);}return o;}
/** Research buoys are passable: the trigger offers a voluntary stop. */
export function createSurveyBuoy(){
  const o=group('sea-survey-buoy');
  o.add(cyl(1.6,1.3,.7,M.coral,0,.25,0,12,'buoy-float'));
  o.add(cyl(.13,.19,3.5,M.dark,0,2,0,6,'buoy-mast'));
  o.add(ico(.85,M.brass,0,4,0,0,'survey-signal'));
  o.add(box(1.6,.65,.2,M.cream,0,2.6,0,'research-plate'));
  o.add(box(.7,.42,.8,M.glass,.8,.9,0,'sample-container'));
  o.userData={assetId:'tidebound.navigation.survey-buoy',colliders:[{type:'sphere',radius:9,center:[0,0,0],trigger:true,purpose:'optional low-speed observation; no rigid collision'}]};
  return o;
}
export function createWhirlpool(radius=15){const o=group('tidal-whirlpool');for(let i=0;i<4;i++){const ring=mesh(new THREE.TorusGeometry(radius*(.3+i*.2),.14+i*.04,5,36,Math.PI*1.6),i%2?M.glass:M.cream,0,-i*.045,0,'spiral-current');ring.rotation.x=-Math.PI/2;ring.rotation.z=i*.8;o.add(ring);}return o;}
