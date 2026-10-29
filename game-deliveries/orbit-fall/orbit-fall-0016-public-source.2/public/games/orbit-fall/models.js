// Orbit / Fall original procedural model source. Units: meters, +Y up, +Z front.
// Rebuilt by ../recipes/build-assets.mjs. No external visual assets.
import * as THREE from './vendor/three.module.js';
import { GLTFLoader } from './assets/runtime/gltf-loader.js';
import { clone as cloneRig } from './assets/runtime/skeleton-utils.js';

const palette = {
  hull: [0x9aabb8, .64, .68], porcelain: [0xd6e4e7, .32, .48], dark: [0x101d2e, .74, .6],
  joint: [0x253847, .52, .82], trim: [0x526b7d, .8, .4], amber: [0xffb347, .45, .25],
  glass: [0x111e30, .75, .16], cyan: [0x6cdde7, .42, .22], red: [0xfb625b, .3, .5],
  gold: [0x8c7051, .83, .24], green: [0x86e7b7, .35, .3],
};
const materials = {};
for (const [name,[color,metalness,roughness]] of Object.entries(palette)) {
  const emissive = ['amber','cyan','red','green'].includes(name) ? color : 0;
  materials[name] = new THREE.MeshStandardMaterial({name, color, metalness, roughness, emissive, emissiveIntensity: emissive ? .7 : 0});
}
const templates = new Map();
const box = (x,y,z) => new THREE.BoxGeometry(x,y,z);
const cylinder = (r,h,s=12) => new THREE.CylinderGeometry(r,r,h,s);
function mesh(group,name,geometry,material,position=[0,0,0],rotation=[0,0,0]) {
  const m=new THREE.Mesh(geometry,materials[material]);m.name=name;m.position.set(...position);m.rotation.set(...rotation);m.castShadow=true;m.receiveShadow=true;group.add(m);return m;
}
function panel(group,name,size,pos,mat='hull',rot=[0,0,0]) { return mesh(group,name,box(...size),mat,pos,rot); }
function pipe(group,name,radius,length,pos,mat='trim',rot=[0,0,0]) {return mesh(group,name,cylinder(radius,length),mat,pos,rot);}
function ring(group,name,radius,tube,pos,mat='trim',rot=[0,0,0],arc=Math.PI*2) {return mesh(group,name,new THREE.TorusGeometry(radius,tube,6,24,arc),mat,pos,rot);}
function instanceBoxes(group,name,size,positions,mat='hull') {
  const m=new THREE.InstancedMesh(box(...size),materials[mat],positions.length), transform=new THREE.Object3D();m.name=name;
  positions.forEach((p,i)=>{transform.position.set(...p);transform.updateMatrix();m.setMatrixAt(i,transform.matrix);});
  m.castShadow=true;m.receiveShadow=true;group.add(m);return m;
}
function fork(name,builder) { const template=templates.get(name); if (!template) {const out=builder();out.userData.proceduralFallback=true;return out;}const out=cloneRig(template);out.animations=template.animations;out.userData.proceduralFallback=false;out.traverse(o=>{if(o.isMesh)delete o.userData.uniqueStateMaterial;});return out; }

/** Loads all local GLB assets. Call once before creating a scene. Rendering remains
 * available from identical retained procedural recipes when an asset cannot load. */
export async function loadAssetLibrary() {
  const names=['astronaut','room-airlock','room-maintenance','room-habitat','room-core',...DEVICE_KINDS.map(k=>`device-${k}`)];
  const loader=new GLTFLoader();const failures=[];
  await Promise.all(names.map(async name=>{try {const gltf=await loader.loadAsync(new URL(`./assets/models/${name}.glb`,import.meta.url).href);const scene=gltf.scene.children.length===1?gltf.scene.children[0]:gltf.scene;scene.animations=gltf.animations;scene.userData.assetId=`orbit-fall.${name}`;scene.traverse(o=>{if(o.isMesh){o.castShadow=true;o.receiveShadow=true;}});templates.set(name,scene);} catch(error){failures.push({name,message:error.message});}}));
  return {loaded:templates.size,failed:failures};
}
export function createRoomKit(theme='maintenance') { return fork(`room-${theme}`,()=>buildRoom(theme)); }
function buildRoom(theme) {
  const g=new THREE.Group();g.name=`room-${theme}`;g.userData={assetId:`orbit-fall.room-${theme}`,dimensions:[18,8,16],pivot:'floor-center',sockets:{west:[-9,2.2,0],east:[9,2.2,0],north:[0,2.2,-8],south:[0,2.2,8]},theme};
  const floor=[];for(let x=-7.5;x<=7.5;x+=3)for(let z=-6.5;z<8;z+=3)floor.push([x,-.18,z]);
  instanceBoxes(g,'floor-panels',[2.92,.32,2.92],floor,'dark');
  const seams=[];for(let z=-7.9;z<=8;z+=3)seams.push([0,.005,z]);instanceBoxes(g,'floor-seams',[17.7,.04,.055],seams,'trim');
  const deck=[];for(let x=-7.5;x<=7.5;x+=3)for(let z=-6.5;z<8;z+=3)deck.push([x,.004,z]);
  instanceBoxes(g,'deck-inserts',[2.64,.035,2.64],deck,'joint');
  const stripes=[];for(let z=-7;z<8;z+=2)for(const x of [-6.85,6.85])stripes.push([x,.04,z]);instanceBoxes(g,'walkway-markings',[.11,.04,.78],stripes,'amber');
  const back=[];for(let x=-7.5;x<=7.5;x+=3) if(Math.abs(x)>2) back.push([x,2.7,-8.05]);
  instanceBoxes(g,'rear-hull-panels',[2.88,5.4,.28],back,'hull');
  instanceBoxes(g,'rear-recesses',[2.54,2.25,.12],back.map(p=>[p[0],2.25,-7.87]),'dark');
  const sides=[];for(const x of [-9.06,9.06])for(const z of [-6.5,-3.5,3.5,6.5])sides.push([x,1.15,z]);
  instanceBoxes(g,'cutaway-side-panels',[.28,2.3,2.88],sides,'hull');
  instanceBoxes(g,'side-insets',[.1,1.46,2.45],sides.map(p=>[p[0]*.983,1.15,p[2]]),'dark');
  for(const x of [-8.9,8.9]) {
    pipe(g,`low-pipe-${x}`,.09,15.6,[x,.45,0],'trim',[Math.PI/2,0,0]);
    for(const z of [-7.5,-2.4,2.4,7.5])panel(g,'structural-post',[.32,4.8,.3],[x,2.4,z],'joint');
  }
  for(const x of [-6,-3,3,6]) {panel(g,'rear-rib',[.16,6,.48],[x,3,-7.9],'trim');panel(g,'rib-light',[.065,3,.055],[x,3.5,-7.62],theme==='core'?'amber':'cyan');}
  panel(g,'rear-overhead-beam',[18,.44,.7],[0,6.25,-7.8],'dark');
  panel(g,'rear-service-stripe',[17,.11,.055],[0,5.68,-7.64],theme==='airlock'?'green':'amber');
  for(const x of [-1,1])panel(g,'rear-door-jamb',[.4,4.2,.7],[x*2,2.1,-7.9],'trim');
  panel(g,'rear-door-lintel',[4.35,.36,.7],[0,4.15,-7.9],'trim');
  panel(g,'rear-door-depth',[3.5,3.8,.25],[0,1.9,-8.45],'dark');
  panel(g,'rear-door-split',[.055,3.6,.05],[0,1.85,-8.28],'cyan');
  const vents=[];for(let x=-8.1;x<-3.8;x+=.36)vents.push([x,4.65,-7.83]);instanceBoxes(g,'vent-fins',[.12,.48,.2],vents,'joint');
  for(const z of [-5.9,5.9]) {panel(g,'floor-grate',[3,.1,1.1],[0,.06,z],'dark');const slots=[];for(let x=-1.3;x<1.5;x+=.25)slots.push([x,.13,z]);instanceBoxes(g,'grate-crossbars',[.08,.04,1],slots,'trim');}
  for(const x of [-1,1]) {pipe(g,'ceiling-cutaway-tube',.16,17,[0,6.7,-6.7+x*.45],'trim',[0,0,Math.PI/2]);for(const k of [-6,0,6])ring(g,'tube-collar',.21,.065,[k,6.7,-6.7+x*.45],'dark',[0,Math.PI/2,0]);}
  if(theme==='airlock') {ring(g,'airlock-pressure-ring',2.05,.17,[0,2.35,-7.55],'porcelain');ring(g,'airlock-status-ring',1.86,.045,[0,2.35,-7.38],'green');}
  if(theme==='habitat') {for(const x of [-6.9,6.9]){panel(g,'bunk-shell',[2.4,1.4,2.2],[x,.8,-5.8],'porcelain');panel(g,'bunk-inset',[2.1,.21,1.95],[x,1.52,-5.8],'dark');panel(g,'pillow',[.7,.13,1.2],[x,1.7,-5.8],'hull');}for(const x of [-5.5,5.5]){pipe(g,'hydroponic-pot',.5,.65,[x,.35,5.8],'porcelain');for(let n=0;n<5;n++)mesh(g,'hydroponic-leaf',new THREE.ConeGeometry(.17,.8,5),'green',[x+Math.sin(n)*.25,1.05,5.8+Math.cos(n)*.2],[0,n,.2]);}}
  if(theme==='core') {for(const x of [-6.8,6.8]){panel(g,'server-tower',[1.5,4,1.7],[x,2,-5.4],'dark');const lights=[];for(let y=.5;y<4;y+=.45)lights.push([x,y,-4.5]);instanceBoxes(g,'server-blades',[1.15,.08,.08],lights,'amber');}ring(g,'core-halo',2.55,.055,[0,3.25,-6.7],'amber');}
  if(theme==='maintenance')for(const x of [-6.8,6.8]){panel(g,'tool-cabinet',[1.6,2.5,.9],[x,1.25,-6.7],'joint');for(let y=.4;y<2.5;y+=.55){panel(g,'cabinet-drawer',[1.4,.44,.1],[x,y,-6.19],'hull');panel(g,'drawer-pull',[.55,.07,.12],[x,y,-6.09],'dark');}}
  return g;
}

export const DEVICE_KINDS=['crate','receiver','mirror','gate','oxygen','console','leak','arc','debris','magnetic','tether','beacon','memory'];
export function createDevice(kind='console',state='offline') {const g=fork(`device-${kind}`,()=>buildDevice(kind));setDeviceState(g,state);return g;}
function buildDevice(kind) {
  const g=new THREE.Group();g.name=`device-${kind}`;g.userData={assetId:`orbit-fall.device-${kind}`,kind,pivot:'base-center',state:'offline',connectors:[]};
  if(kind==='crate') {panel(g,'cargo-shell',[1.35,1.25,1.35],[0,.675,0],'hull');panel(g,'cargo-top',[1.1,.1,1.1],[0,1.34,0],'dark');for(const x of [-.63,.63])for(const z of [-.63,.63])panel(g,'cargo-reinforcement',[.15,1.4,.15],[x,.7,z],'trim');for(const z of [-.69,.69]){panel(g,'cargo-band',[1.3,.24,.04],[0,.71,z],'amber');panel(g,'cargo-handle',[.48,.12,.12],[0,1.08,z],'dark');}ring(g,'state-light',.21,.035,[0,.73,.721],'cyan');g.userData.connectors=[[0,.72,.76]];}
  else if(kind==='mirror') {pipe(g,'mirror-foot',.43,.18,[0,.09,0],'dark');pipe(g,'mirror-stalk',.11,1.6,[0,.9,0],'trim');const pivot=new THREE.Group();pivot.name='mirror-pivot';pivot.position.y=1.65;g.add(pivot);panel(pivot,'mirror-frame',[1.45,1.55,.18],[0,0,0],'gold');panel(pivot,'mirror-surface',[1.24,1.33,.045],[0,0,.12],'glass');for(const x of [-.65,.65])panel(pivot,'state-light',[.035,1.4,.05],[x,0,.15],'cyan');pipe(g,'rotation-knob',.16,.23,[.83,1.65,0],'amber',[0,0,Math.PI/2]);g.userData.connectors=[[0,1.65,.18]];}
  else if(kind==='receiver') {panel(g,'receiver-plinth',[2,.2,2],[0,.1,0],'dark');for(const x of [-.85,.85])for(const z of [-.85,.85])panel(g,'receiver-clamp',[.2,.36,.2],[x,.28,z],'amber');ring(g,'state-light',.73,.05,[0,.24,0],'cyan',[-Math.PI/2,0,0]);panel(g,'receiver-terminal',[.42,1.25,.45],[1.2,.63,0],'trim');panel(g,'terminal-face',[.3,.38,.05],[1.2,1.02,.25],'cyan');g.userData.connectors=[[0,.3,0]];}
  else if(kind==='gate') {for(const x of [-1.9,1.9]){panel(g,'gate-jamb',[.42,4.2,.72],[x,2.1,0],'trim');panel(g,'state-light',[.06,3.3,.08],[x,2.2,.4],'amber');}panel(g,'gate-lintel',[4.2,.45,.72],[0,4.25,0],'hull');for(const s of [-1,1]){const leaf=new THREE.Group();leaf.name=`gate-leaf-${s}`;g.add(leaf);panel(leaf,'door-panel',[1.7,3.8,.24],[s*.89,1.95,0],'joint');panel(leaf,'door-brace',[1.55,.23,.07],[s*.89,1.2,.18],'hull',[0,0,s*.3]);panel(leaf,'door-window',[.82,.65,.08],[s*.89,2.8,.17],'glass');}panel(g,'gate-status',[1.3,.14,.07],[0,4.24,.41],'amber');}
  else if(kind==='oxygen') {panel(g,'oxygen-base',[1.65,.2,1.2],[0,.1,0],'dark');for(const x of [-.45,.45]) {pipe(g,'oxygen-bottle',.3,1.85,[x,1.17,0],'porcelain');mesh(g,'tank-dome',new THREE.SphereGeometry(.3,12,8),'porcelain',[x,2.1,0]);pipe(g,'valve',.08,.26,[x,2.4,0],'trim');ring(g,'tank-band',.31,.045,[x,.7,0],'trim',[Math.PI/2,0,0]);ring(g,'tank-band',.31,.045,[x,1.6,0],'trim',[Math.PI/2,0,0]);}panel(g,'oxygen-console',[.68,.7,.25],[0,1.35,.42],'dark');panel(g,'state-light',[.47,.2,.05],[0,1.51,.58],'green');ring(g,'pressure-gauge',.15,.035,[0,1.15,.59],'hull');pipe(g,'supply-line',.07,1.8,[.8,.9,.38],'amber',[0,0,0]);}
  else if(kind==='console'||kind==='memory') {panel(g,'console-foot',[1.35,.17,1.15],[0,.08,0],'dark');panel(g,'console-pedestal',[.8,1.2,.7],[0,.7,0],'trim');panel(g,'console-head',[1.55,.9,.3],[0,1.6,.1],'hull',[-.25,0,0]);panel(g,'screen',[1.29,.6,.035],[0,1.63,.29],'glass',[-.25,0,0]);for(let i=0;i<4;i++)panel(g,'state-light',[.65-i*.09,.03,.025],[-.2,1.8-i*.12,.34],'cyan');for(let i=0;i<3;i++)panel(g,'console-key',[.15,.07,.15],[-.3+i*.3,1.12,.48],'amber');if(kind==='memory'){ring(g,'memory-orbit',.52,.045,[0,2.75,0],'cyan');mesh(g,'memory-crystal',new THREE.OctahedronGeometry(.28),'amber',[0,2.75,0]);}}
  else if(kind==='leak') {panel(g,'breach-surround',[2.1,2,.3],[0,1.1,0],'dark');ring(g,'breach-rim',.63,.12,[0,1.1,.2],'trim');for(let i=0;i<7;i++) {const a=i/7*Math.PI*2;panel(g,'torn-metal',[.24,.61,.12],[Math.sin(a)*.63,1.1+Math.cos(a)*.63,.35],'hull',[.3,a,a]);}for(let i=0;i<5;i++)mesh(g,'airflow-stream',new THREE.ConeGeometry(.04,.7,5),'cyan',[(i-2)*.18,1.1+Math.sin(i)*.23,.8+i*.16],[-Math.PI/2,0,0]);}
  else if(kind==='arc') {for(const x of [-.9,.9]) {panel(g,'capacitor-base',[.55,.18,.65],[x,.09,0],'dark');pipe(g,'capacitor',.22,1.3,[x,.8,0],'trim');for(let y=.35;y<1.3;y+=.23)ring(g,'insulator-fin',.3,.045,[x,y,0],'porcelain',[Math.PI/2,0,0]);mesh(g,'electrode',new THREE.SphereGeometry(.2,10,8),'amber',[x,1.57,0]);}for(let i=0;i<8;i++){const x=-.8+i*.23;panel(g,'arc-segment',[.29,.045,.055],[x,1.6+Math.sin(i*2)*.16,0],'cyan',[0,0,Math.sin(i)*.85]);}}
  else if(kind==='debris') {mesh(g,'debris-core',new THREE.DodecahedronGeometry(.53,0),'trim',[0,.55,0],[.1,.3,.6]);panel(g,'broken-panel',[1.6,.12,.75],[.1,.73,0],'hull',[.3,.4,.5]);panel(g,'broken-rib',[.18,1.1,.16],[-.3,.6,.3],'dark',[.2,0,.8]);panel(g,'hazard-mark',[.6,.13,.045],[.1,.84,.3],'amber',[0,0,.5]);}
  else if(kind==='magnetic') {panel(g,'magnet-platform',[2.5,.16,2.1],[0,.08,0],'dark');for(const x of [-.82,.82]) {panel(g,'magnet-pole',[.3,.18,1.55],[x,.24,0],'trim');panel(g,'state-light',[.07,.05,1.35],[x,.36,0],'cyan');}for(const z of [-.78,.78])panel(g,'magnet-coil',[1.7,.1,.16],[0,.21,z],'amber');}
  else if(kind==='tether') {pipe(g,'tether-grip',.12,.55,[0,.3,0],'dark');pipe(g,'tether-barrel',.21,.65,[0,.63,.22],'hull',[Math.PI/2,0,0]);ring(g,'state-light',.17,.04,[0,.63,.59],'cyan');panel(g,'tether-cell',[.28,.32,.25],[0,.45,-.19],'amber');}
  else if(kind==='beacon') {pipe(g,'beacon-base',.55,.22,[0,.11,0],'dark');pipe(g,'beacon-mast',.12,2.4,[0,1.4,0],'trim');mesh(g,'beacon-dish',new THREE.ConeGeometry(.9,.3,24,1,true),'hull',[0,2.62,0],[.5,0,Math.PI]);ring(g,'state-light',.65,.04,[0,2.7,.1],'amber',[Math.PI/2+.5,0,0]);pipe(g,'beacon-emitter',.06,.6,[0,2.9,0],'cyan');}
  return g;
}
export function setDeviceState(g,state='offline') {
  g.userData.state=state;const color={offline:0x6a8397,ready:0x6cdde7,active:0xffb347,powered:0x86e7b7,complete:0x86e7b7,danger:0xfb625b}[state]||0x6cdde7;
  g.traverse(o=>{if(o.isMesh&&(o.name.startsWith('state-light')||o.name.startsWith('gate-status')||o.name.startsWith('terminal-face'))){if(!o.userData.uniqueStateMaterial){o.material=o.material.clone();o.userData.uniqueStateMaterial=true;}o.material.color.setHex(color);o.material.emissive.setHex(color);o.material.emissiveIntensity=state==='offline'?.2:1;}});
}
export function animateDevice(g,time) {g.traverse(o=>{if(o.name==='memory-orbit')o.rotation.y=time*.35;if(o.name==='memory-crystal')o.rotation.y=time*.6;if(o.name.startsWith('arc-segment'))o.visible=['active','danger'].includes(g.userData.state);if(o.name.startsWith('airflow-stream')){o.scale.y=.75+Math.sin(time*4+o.position.x)*.25;}if(o.name.startsWith('gate-leaf')){const s=o.name==='gate-leaf--1'?-1:1;o.position.x=(g.userData.state==='powered'||g.userData.state==='complete')?s*1.55:0;}});}

export function createAstronaut(){return fork('astronaut',buildAstronaut);}
function buildAstronaut() {
  const g=new THREE.Group();g.name='astronaut';g.userData={assetId:'orbit-fall.astronaut',pivot:'hip-center',dimensions:[1.1,1.92,.85],skeleton:'orbit-suit-v1',clips:['idle','thrust','brake','anchored','damaged']};
  const hips=new THREE.Bone();hips.name='Hips';g.add(hips);
  const bones=[hips];const bone=(name,parent,pos)=>{const b=new THREE.Bone();b.name=name;b.position.set(...pos);parent.add(b);bones.push(b);return b;};
  const chest=bone('Chest',hips,[0,.3,0]),head=bone('Head',chest,[0,.38,0]);
  const la=bone('UpperArm_L',chest,[-.36,.14,0]),ra=bone('UpperArm_R',chest,[.36,.14,0]);
  const le=bone('Forearm_L',la,[-.06,-.36,0]),re=bone('Forearm_R',ra,[.06,-.36,0]);
  const ll=bone('Thigh_L',hips,[-.18,-.08,0]),rl=bone('Thigh_R',hips,[.18,-.08,0]);
  const lk=bone('Shin_L',ll,[0,-.4,0]),rk=bone('Shin_R',rl,[0,-.4,0]);
  // A real skin carries the pressure garment; rigid suit shells follow the same bones.
  const garment=box(.56,.65,.35);const count=garment.attributes.position.count;const indices=new Uint16Array(count*4),weights=new Float32Array(count*4);for(let i=0;i<count;i++)weights[i*4]=1;
  garment.setAttribute('skinIndex',new THREE.Uint16BufferAttribute(indices,4));garment.setAttribute('skinWeight',new THREE.Float32BufferAttribute(weights,4));
  const body=new THREE.SkinnedMesh(garment,materials.dark);body.name='pressure-garment';g.add(body);g.updateMatrixWorld(true);body.bind(new THREE.Skeleton(bones));body.castShadow=true;
  panel(chest,'chest-shell',[.62,.49,.41],[0,-.06,.015],'porcelain');panel(chest,'chest-console',[.31,.21,.08],[0,-.05,.27],'dark');panel(chest,'life-status',[.17,.045,.02],[0,0,.32],'cyan');
  panel(chest,'chest-stripe',[.59,.065,.045],[0,-.2,.24],'amber');panel(hips,'hip-belt',[.62,.14,.44],[0,-.08,0],'trim');
  mesh(head,'helmet-shell',new THREE.SphereGeometry(.32,18,12),'porcelain',[0,.08,0]);mesh(head,'visor',new THREE.SphereGeometry(.282,18,10,0,Math.PI*2,0,Math.PI*.53),'glass',[0,.08,.08],[Math.PI/2,0,0]);
  ring(head,'visor-rim',.267,.027,[0,.07,.255],'gold');panel(head,'helmet-lamp',[.16,.075,.1],[.22,.29,.13],'cyan');pipe(head,'antenna',.018,.26,[-.29,.36,-.08],'trim',[0,0,-.2]);
  panel(chest,'life-support-pack',[.57,.61,.28],[0,-.03,-.36],'dark');for(const x of [-.21,.21]){pipe(chest,'thruster-tank',.1,.47,[x,-.02,-.49],'hull');mesh(chest,'thruster-nozzle',new THREE.ConeGeometry(.1,.15,10,1,true),'trim',[x,-.33,-.48],[Math.PI,0,0]);mesh(chest,'thruster-plume',new THREE.ConeGeometry(.075,.44,8),'cyan',[x,-.62,-.48],[Math.PI,0,0]);}
  for(const [upper,lower,side] of [[la,le,-1],[ra,re,1]]){mesh(upper,'shoulder',new THREE.SphereGeometry(.16,10,8),'trim');pipe(upper,'arm-shell',.12,.29,[side*.03,-.18,0],'porcelain');mesh(lower,'elbow-joint',new THREE.SphereGeometry(.11,10,8),'dark');pipe(lower,'forearm-shell',.115,.25,[side*.025,-.15,0],'hull');mesh(lower,'glove',new THREE.SphereGeometry(.12,10,8),'dark',[side*.03,-.31,.01]);panel(lower,'wrist-band',[.24,.07,.2],[side*.025,-.13,.02],'amber');}
  for(const [upper,lower] of [[ll,lk],[rl,rk]]){pipe(upper,'thigh-shell',.145,.32,[0,-.2,0],'porcelain');mesh(lower,'knee-joint',new THREE.SphereGeometry(.13,10,8),'dark');pipe(lower,'shin-shell',.13,.29,[0,-.18,0],'hull');panel(lower,'knee-guard',[.2,.18,.1],[0,-.02,.12],'porcelain');panel(lower,'magnetic-boot',[.26,.19,.4],[0,-.36,.07],'dark');panel(lower,'boot-sole',[.28,.05,.42],[0,-.47,.07],'amber');}
  const track=(name,times,angles)=>new THREE.QuaternionKeyframeTrack(`${name}.quaternion`,times,angles.flatMap(a=>new THREE.Quaternion().setFromEuler(new THREE.Euler(...a)).toArray()));
  g.animations=[new THREE.AnimationClip('idle',4,[track('UpperArm_L',[0,2,4],[[0,0,-.12],[.1,0,-.2],[0,0,-.12]]),track('UpperArm_R',[0,2,4],[[0,0,.12],[-.1,0,.2],[0,0,.12]])]),new THREE.AnimationClip('thrust',1,[track('Thigh_L',[0,.5,1],[[.23,0,-.08],[.32,0,-.08],[.23,0,-.08]]),track('UpperArm_R',[0,.5,1],[[-.2,0,.35],[-.3,0,.4],[-.2,0,.35]])]),new THREE.AnimationClip('brake',.6,[track('UpperArm_L',[0,.3,.6],[[0,0,-.2],[-.4,0,-.7],[0,0,-.2]]),track('UpperArm_R',[0,.3,.6],[[0,0,.2],[-.4,0,.7],[0,0,.2]])]),new THREE.AnimationClip('anchored',1,[track('Thigh_L',[0,1],[[0,0,-.12],[0,0,-.12]]),track('Thigh_R',[0,1],[[0,0,.12],[0,0,.12]])]),new THREE.AnimationClip('damaged',.5,[track('Chest',[0,.15,.35,.5],[[0,0,0],[.3,0,.2],[-.1,0,-.1],[0,0,0]])])];
  return g;
}
export function animateAstronaut(g,state='idle',time=0,dt=1/60) {
  if(!g.userData.mixer){const mixer=new THREE.AnimationMixer(g);g.userData.mixer=mixer;g.userData.actions={};for(const clip of g.animations||[]){const action=mixer.clipAction(clip);if(['brake','damaged'].includes(clip.name)){action.setLoop(THREE.LoopOnce,1);action.clampWhenFinished=true;}g.userData.actions[clip.name]=action;}}
  if(g.userData.animationState!==state){const old=g.userData.actions[g.userData.animationState],next=g.userData.actions[state]||g.userData.actions.idle;old?.fadeOut(.18);next?.reset().fadeIn(.18).play();g.userData.animationState=state;}
  g.userData.mixer.update(Math.max(0,Math.min(dt,.05)));g.traverse(o=>{if(o.name.startsWith('thruster-plume')){o.visible=state==='thrust';o.scale.y=.85+Math.sin(time*45)*.15;}});
}
/** Clears per-instance animation state. Shared library geometry/materials are retained
 * until the runtime is disposed; call disposeAssetLibrary when leaving the game. */
export function disposeObject(g){g.userData.mixer?.stopAllAction();g.userData.mixer?.uncacheRoot(g);g.traverse(o=>{if(o.userData.uniqueStateMaterial)o.material?.dispose();if(g.userData.proceduralFallback)o.geometry?.dispose();});g.removeFromParent();}
export function disposeAssetLibrary(){const geometries=new Set(),mats=new Set();for(const g of templates.values())g.traverse(o=>{if(o.geometry)geometries.add(o.geometry);if(o.material)mats.add(o.material);});for(const x of geometries)x.dispose();for(const x of mats)x.dispose();templates.clear();for(const x of Object.values(materials))x.dispose();}
