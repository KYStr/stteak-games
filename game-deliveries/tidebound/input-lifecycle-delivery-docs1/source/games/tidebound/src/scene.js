import * as THREE from 'three';
import { tideAt, currentAt, activeNavigation } from './rules.js';
import { PALETTE, material, mesh, createBoat, createIsland, createPalm, createHarbor, createPier, createLighthouse, createReef, createDiscovery, createVoyager, createCurrentArrow, createWhirlpool, createSurveyBuoy } from './models.js';

const TAU=Math.PI*2;
const oceanVertex=`
uniform float uTime;uniform float uTide;uniform float uMotion;
varying vec3 vWorld;varying vec3 vNormal;varying float vWave;
void main(){vec3 p=position;float a=p.x*.075+uTime*.9;float b=-p.y*.11-uTime*.65;float c=(p.x-p.y)*.041+uTime*.55;
float h=(sin(a)*.34+sin(b)*.22+sin(c)*.18)*uMotion;p.z+=h+uTide;
vec4 world=modelMatrix*vec4(p,1.);vWorld=world.xyz;vWave=h;vNormal=normalize(vec3(-cos(a)*.0255*uMotion-cos(c)*.00738*uMotion,1.,-cos(b)*.0242*uMotion-cos(c)*.00738*uMotion));
gl_Position=projectionMatrix*viewMatrix*world;}`;
const oceanFragment=`
uniform float uTime;uniform vec3 uCamera;uniform float uDive;
varying vec3 vWorld;varying vec3 vNormal;varying float vWave;
void main(){vec3 deep=vec3(.055,.34,.40),shallow=vec3(.10,.53,.55);float l=.52+vWave*.55;vec3 col=mix(deep,shallow,l);
vec3 light=normalize(vec3(-.5,1.,-.35));vec3 viewDir=normalize(uCamera-vWorld);float spec=pow(max(dot(reflect(-light,vNormal),viewDir),0.),180.);
float ripple=sin(vWorld.x*.22+sin(vWorld.z*.13)*1.3+uTime*.4)*sin(vWorld.z*.27+sin(vWorld.x*.14));float glint=smoothstep(.94,.999,ripple)*.085;
col+=vec3(.82,.88,.70)*spec*.45+glint;float fog=smoothstep(240.,650.,distance(uCamera,vWorld));col=mix(col,vec3(.69,.82,.79),fog);
gl_FragColor=vec4(col,1.-uDive*.43);}`;

const point=(v,y=0)=>new THREE.Vector3(v?.x||0,y,v?.z||0);
function ids(collection){return new Set(Array.isArray(collection)?collection.map(x=>typeof x==='string'?x:x.id):Object.keys(collection||{}));}
function markerRing(radius,color){const m=mesh(new THREE.TorusGeometry(radius,.15,5,40),material('navigation-ring',color,.6,{emissive:color,emissiveIntensity:.12}));m.rotation.x=-Math.PI/2;m.castShadow=false;return m;}
function instanceTrees(scene,placements,mangrove=false){if(!placements.length)return [];const prototype=createPalm(1,mangrove);prototype.updateMatrixWorld(true);const objects=[];prototype.traverse(part=>{if(!part.isMesh)return;const inst=new THREE.InstancedMesh(part.geometry,part.material,placements.length);inst.name=mangrove?'instanced-mangroves':'instanced-palms';inst.castShadow=true;inst.receiveShadow=true;const mat=new THREE.Matrix4(),q=new THREE.Quaternion(),s=new THREE.Vector3();placements.forEach((v,i)=>{q.setFromAxisAngle(new THREE.Vector3(0,1,0),v.a);s.setScalar(v.scale);mat.compose(new THREE.Vector3(v.x,v.y,v.z),q,s).multiply(part.matrixWorld);inst.setMatrixAt(i,mat);});inst.computeBoundingSphere();scene.add(inst);objects.push(inst);});return objects;}

export function createScene(canvas, worldData) {
  const {ISLANDS=[],DISCOVERIES=[],REEFS=[],CURRENTS=[],WHIRLS=[],DIVE_SITES=[],OBSERVATIONS=[]}=worldData;
  const renderer=new THREE.WebGLRenderer({canvas,antialias:true,alpha:false,powerPreference:'high-performance'});renderer.setClearColor(0xb1d2ca);renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.22;renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFSoftShadowMap;
  const scene=new THREE.Scene();scene.background=new THREE.Color(0xb1d2ca);scene.fog=new THREE.Fog(0xb1d2ca,230,620);
  const camera=new THREE.PerspectiveCamera(43,1,.35,1000);camera.position.set(0,73,229);
  const hemi=new THREE.HemisphereLight(0xe8f6e3,0x397876,2.3);scene.add(hemi);const sun=new THREE.DirectionalLight(0xffecd1,3.0);sun.position.set(-130,220,-100);sun.castShadow=true;sun.shadow.mapSize.set(1536,1536);sun.shadow.camera.left=-95;sun.shadow.camera.right=95;sun.shadow.camera.top=95;sun.shadow.camera.bottom=-95;sun.shadow.camera.near=5;sun.shadow.camera.far=480;sun.shadow.bias=-.0005;sun.shadow.normalBias=.18;scene.add(sun);scene.add(sun.target);
  const oceanMaterial=new THREE.ShaderMaterial({uniforms:{uTime:{value:0},uTide:{value:0},uMotion:{value:1},uCamera:{value:camera.position},uDive:{value:0}},vertexShader:oceanVertex,fragmentShader:oceanFragment,side:THREE.DoubleSide,transparent:true,depthWrite:true});
  let waterDetail=112;const water=new THREE.Mesh(new THREE.PlaneGeometry(1500,1500,waterDetail,waterDetail),oceanMaterial);water.rotation.x=-Math.PI/2;water.name='displaced-ocean-surface';water.frustumCulled=false;water.renderOrder=0;scene.add(water);
  const islandRecords=[],discoveries=[],landVoyagers=[],diveRecords=[],palmPlaces=[],mangrovePlaces=[];
  let lighthouse,beaconLight,beaconBeam;
  for(const data of ISLANDS){
    const land=createIsland(data);land.position.set(data.x,0,data.z);scene.add(land);const detail=new THREE.Group();detail.name=`island-detail-${data.id}`;detail.position.set(data.x,0,data.z);scene.add(detail);const ground=land.userData.groundHeight;
    if(data.id==='harbor')detail.add(createHarbor());
    if(data.id==='lighthouse'){
      lighthouse=createLighthouse(false);lighthouse.position.y=ground;detail.add(lighthouse);const lens=lighthouse.getObjectByName('keeper-lens');lens.material=lens.material.clone();lens.material.name='keeper-lens-active';beaconLight=new THREE.PointLight(0xffdc8a,0,80,2);beaconLight.position.set(data.x,ground+25,data.z);scene.add(beaconLight);
      beaconBeam=mesh(new THREE.ConeGeometry(17,110,24,1,true),material('restored-beacon-ray',0xffe5a0,.6,{transparent:true,opacity:.075,depthWrite:false,side:THREE.DoubleSide,emissive:0xffe2a2,emissiveIntensity:.8}),0,0,0,'restored-lighthouse-beam');beaconBeam.geometry.translate(0,-55,0);beaconBeam.rotation.z=Math.PI/2;const rotor=new THREE.Group();rotor.name='beacon-rotation';rotor.position.set(data.x,ground+25,data.z);rotor.add(beaconBeam);scene.add(rotor);beaconBeam.userData.rotor=rotor;rotor.visible=false;
    }
    const toward=new THREE.Vector3(data.x-data.dock.x,0,data.z-data.dock.z);const length=Math.max(8,toward.length()-data.radius*.63);const pier=createPier(length);pier.rotation.y=Math.atan2(toward.x,toward.z);pier.position.set(data.dock.x+Math.cos(pier.rotation.y)*7,0,data.dock.z-Math.sin(pier.rotation.y)*7);scene.add(pier);
    const harborRing=markerRing(5.9,0xffd88d);harborRing.position.set(data.dock.x,.85,data.dock.z);scene.add(harborRing);
    const bollard=mesh(new THREE.CylinderGeometry(.7,.9,4.5,8),material('dock-marker',PALETTE.coral),data.dock.x+Math.cos(pier.rotation.y)*4,2.8,data.dock.z-Math.sin(pier.rotation.y)*4,'safe-mooring-marker');scene.add(bollard);
    const portLight=mesh(new THREE.IcosahedronGeometry(.9,0),material('port-lantern',PALETTE.cream,.4,{emissive:0xffd986,emissiveIntensity:.5}),0,2.9,0,'dock-lantern');bollard.add(portLight);
    if(data.id!=='reef'&&data.id!=='ruin'&&data.id!=='lighthouse')for(let i=0;i<(data.id==='mangrove'?7:4);i++){const a=i*2.399+data.x*.01,r=data.radius*(.3+.1*(i%3));(data.id==='mangrove'?mangrovePlaces:palmPlaces).push({x:data.x+Math.cos(a)*r,y:ground,z:data.z+Math.sin(a)*r,a,scale:.75+(i%3)*.14});}
    if(data.id==='harbor'||data.id==='gull'){const person=createVoyager();person.scale.setScalar(1.3);person.position.set(-3,ground, -data.radius*.55);detail.add(person);const mixer=new THREE.AnimationMixer(person);mixer.clipAction(person.animations[data.id==='harbor'?2:0]).play();landVoyagers.push({mixer,person,islandId:data.id});}
    for(const [i,d] of DISCOVERIES.filter(d=>d.islandId===data.id&&!d.diveSiteId).entries()){const model=createDiscovery(d.id);const a=-Math.PI*.7+i*1.3;model.position.set(Math.sin(a)*data.radius*.37,ground+.3,Math.cos(a)*data.radius*.37);if(d.id==='tern')model.position.y+=4.5;detail.add(model);const ring=markerRing(3,PALETTE.brass);ring.position.copy(model.position);ring.position.y=ground+.15;detail.add(ring);discoveries.push({id:d.id,model,ring,baseY:model.position.y,animal:d.kind==='animal'});}
    islandRecords.push({land,detail,ring:harborRing,data});
  }
  const vegetation=[...instanceTrees(scene,palmPlaces),...instanceTrees(scene,mangrovePlaces,true)];
  const buoyPrototype=createSurveyBuoy();
  const surveyRecords=OBSERVATIONS.map(data=>{
    const model=buoyPrototype.clone(true);model.name=`survey-${data.id}`;scene.add(model);
    const ring=markerRing(3.6,PALETTE.brass);scene.add(ring);
    return{data,model,ring};
  });
  const navigationRing=markerRing(4,0x548feb);scene.add(navigationRing);
  const navigationPin=mesh(new THREE.ConeGeometry(.7,2.2,6),material('navigation-guide',0x548feb,.5,{emissive:0x295cba,emissiveIntensity:.25}),0,0,0,'selected-route-waypoint');scene.add(navigationPin);
  const reefRecords=REEFS.map(data=>{const model=createReef(data.radius);model.scale.y=.42;const bounds=new THREE.Box3().setFromObject(model);model.position.set(data.x,data.safeHeight*1.7-bounds.max.y,data.z);scene.add(model);const ring=markerRing(data.radius+.5,0xed9b73);ring.position.set(data.x,0,data.z);scene.add(ring);return{data,model,ring};});
  const currentRecords=CURRENTS.map((data,index)=>{const arrows=[];for(let i=0;i<7;i++){const a=createCurrentArrow();a.position.set(data.x+(index?8:-8)*Math.sin(i),.3,data.z+(i-3)*15);scene.add(a);arrows.push(a);}return{data,arrows};});
  const whirlRecords=WHIRLS.map(data=>{const model=createWhirlpool(data.radius);model.position.set(data.x,0,data.z);scene.add(model);const rim=markerRing(data.radius,PALETTE.coral);rim.position.copy(model.position);scene.add(rim);return{data,model,rim};});
  // Three shallow sites are distinct real underwater gardens in world coordinates.
  for(const site of DIVE_SITES){const group=new THREE.Group();group.name=`underwater-${site.id}`;const floor=mesh(new THREE.CylinderGeometry(site.radius,site.radius*1.1,2,16),material('underwater-sand',0xa4c6ad),site.entry.x,-9.5,site.entry.z,'shallow-seabed');group.add(floor);
    const objects=[];for(let i=0;i<14;i++){const a=i*2.4,r=8+(i%4)*4;const d=createDiscovery(site.id==='ruin-dive'?(i%3?'glass-coral':'star-tablet'):i%2?'fan-coral':'seagrass');d.scale.setScalar(.45+(i%3)*.2);d.position.set(site.entry.x+Math.sin(a)*r,-8.6,site.entry.z+Math.cos(a)*r);group.add(d);objects.push(d);}
    const treasure=createDiscovery(site.discoveryId);treasure.position.set(site.target.x,-6.8,site.target.z);treasure.scale.setScalar(1.35);group.add(treasure);discoveries.push({id:site.discoveryId,model:treasure,ring:null,baseY:-6.8,animal:site.discoveryId!=='tide-clock',underwater:true});
    const part=mesh(new THREE.OctahedronGeometry(1.2),material(`lighthouse-part-${site.partId}`,PALETTE.brass,.28,{metalness:.45,emissive:0xffcc67,emissiveIntensity:.3}),site.target.x+2,-6.1,site.target.z,'recoverable-lighthouse-part');group.add(part);
    const partRing=markerRing(4,PALETTE.brass);partRing.position.set(site.target.x,-8.4,site.target.z);group.add(partRing);
    const bubbles=[];for(const b of site.bubbles){const source=mesh(new THREE.IcosahedronGeometry(.9,0),material('oxygen-spring',0xb9fbf0,.2,{emissive:0x72dcc5,emissiveIntensity:.6}),b.x,-8.1,b.z,'oxygen-spring');group.add(source);for(let i=0;i<8;i++){const bubble=mesh(new THREE.IcosahedronGeometry(.16+(i%3)*.07,1),material('oxygen-bubble',0xd8fff2,.2,{transparent:true,opacity:.6}),b.x,-7+i*.8,b.z);bubble.castShadow=false;group.add(bubble);bubbles.push({mesh:bubble,x:b.x,z:b.z,phase:i*.8});}}
    const returnRing=markerRing(4,0x88eed9);returnRing.position.set(site.entry.x,-8.1,site.entry.z);group.add(returnRing);const line=mesh(new THREE.CylinderGeometry(.045,.045,8,5),material('dive-return-rope',PALETTE.cream),site.entry.x,-3.3,site.entry.z,'return-to-vessel-rope');group.add(line);scene.add(group);diveRecords.push({site,group,part,partRing,bubbles,objects,treasure});
  }
  const boatRoot=new THREE.Group();boatRoot.name='player-buoyant-vessel';scene.add(boatRoot);const boats=['steady','swift','cargo'].map(id=>{const model=createBoat(id);model.visible=id==='steady';boatRoot.add(model);return model;});
  const skipper=createVoyager();skipper.scale.setScalar(.83);skipper.position.set(-.9,1.1,3.5);boatRoot.add(skipper);const skipperMixer=new THREE.AnimationMixer(skipper);skipperMixer.clipAction(skipper.animations[0]).play();
  const diver=createVoyager();diver.scale.setScalar(1.2);scene.add(diver);const diverMixer=new THREE.AnimationMixer(diver);diverMixer.clipAction(diver.animations[1]).play();diver.visible=false;
  const wakes=[];for(let i=0;i<10;i++){const w=markerRing(1.6+i*.18,0xc2ead7);w.material.transparent=true;w.material.opacity=.3;scene.add(w);wakes.push(w);}
  const birds=[];for(let i=0;i<4;i++){const b=createDiscovery('tern');b.scale.setScalar(.6);scene.add(b);birds.push(b);}
  // Persistent harbour dressing plus one bounded return-home celebration.
  // These reuse the mesh/material primitives; no image or external asset is used.
  const celebration=new THREE.Group();celebration.name='harbor-story-celebration';
  const home=ISLANDS.find(i=>i.id==='harbor');celebration.position.set(home?.x||0,0,home?.z||190);celebration.visible=false;scene.add(celebration);
  const celebrationMaterials=[material('festival-coral',PALETTE.coral),material('festival-linen',PALETTE.cream),material('festival-brass',PALETTE.brass)];
  const festivalLamps=[];
  for(const side of [-1,1]){const x=side*12;celebration.add(mesh(new THREE.CylinderGeometry(.16,.21,10,6),material('festival-timber',PALETTE.wood),x,10.5,-14,'festival-mast'));const lamp=mesh(new THREE.IcosahedronGeometry(.65,1),material('warm-welcome-lantern',0xffdf94,.3,{emissive:0xffc95e,emissiveIntensity:1.2}),x,16.2,-14,'welcome-lantern');celebration.add(lamp);festivalLamps.push(lamp);}
  const flagGeometry=new THREE.ConeGeometry(.8,1.65,3);flagGeometry.scale(1,1,.22);const ribbonPoints=[];
  for(let i=0;i<13;i++){const x=-12+i*2,y=14.4+Math.pow(x/12,2)*1.1;ribbonPoints.push(new THREE.Vector3(x,y,-14));if(i>0&&i<12){const flag=mesh(flagGeometry,celebrationMaterials[i%3],x,y-.7,-14,'welcome-pennant');flag.rotation.z=Math.PI;celebration.add(flag);}}
  const ribbon=mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(ribbonPoints),24,.045,4,false),material('festival-cord',PALETTE.cream),0,0,0,'festival-bunting-cord');celebration.add(ribbon);
  const confetti=new THREE.Group();confetti.name='one-shot-return-confetti';celebration.add(confetti);const paperGeometry=new THREE.BoxGeometry(.24,.06,.42);const papers=[];
  for(let i=0;i<30;i++){const paper=mesh(paperGeometry,celebrationMaterials[i%3],0,0,0,'volumetric-confetti');paper.castShadow=false;confetti.add(paper);papers.push({mesh:paper,phase:i/30*TAU,x:(i%10-4.5)*1.6,z:-18-Math.floor(i/10)*2,delay:(i%5)*.14});}
  let celebrationShown=false,celebrationClock=0;
  let cameraMode='follow',orbitOffset=0,quality='high',disposed=false,elapsed=0,frameCount=0,lastState=null,restored=false,lastDive=false;
  const target=new THREE.Vector3(),desiredCamera=new THREE.Vector3(),look=new THREE.Vector3(0,0,157),direction=new THREE.Vector3();
  function resize(){if(disposed)return;const rect=canvas.getBoundingClientRect();const width=Math.max(1,rect.width||canvas.clientWidth||1280),height=Math.max(1,rect.height||canvas.clientHeight||720);renderer.setSize(width,height,false);renderer.setPixelRatio(Math.min(globalThis.devicePixelRatio||1,quality==='low'?1.2:1.65));camera.aspect=width/height;camera.updateProjectionMatrix();}
  function setQuality(next){if(quality===next)return;quality=next;renderer.shadowMap.enabled=quality==='high';waterDetail=quality==='high'?112:56;water.geometry.dispose();water.geometry=new THREE.PlaneGeometry(1500,1500,waterDetail,waterDetail);vegetation.forEach(m=>m.castShadow=quality==='high');resize();}
  function update(state,dt=0,options={}) {
    if(disposed)return;lastState=state;const frozen=!!options.paused;const step=frozen?0:Math.min(dt,.1);elapsed+=step;frameCount++;
    setQuality(options.quality||'high');const t=Number(state.time)||0;const tidal=tideAt(t);const waterY=tidal.height*1.7;const motion=options.reducedMotion?.18:1;const diving=state.mode==='diving';
    oceanMaterial.uniforms.uTime.value=t;oceanMaterial.uniforms.uTide.value=waterY;oceanMaterial.uniforms.uMotion.value=motion;oceanMaterial.uniforms.uDive.value=diving?1:0;
    const b=state.boat||{x:0,z:157,heading:0,speed:0,sail:0};const wave=(x,z)=>Math.sin(x*.075+t*.9)*.34+Math.sin(z*.11-t*.65)*.22+Math.sin((x+z)*.041+t*.55)*.18;
    boatRoot.position.set(b.x,waterY+.14+wave(b.x,b.z)*motion,b.z);boatRoot.rotation.set((wave(b.x,b.z-3)-wave(b.x,b.z+3))*.075*motion,-(b.heading||0),(wave(b.x-2,b.z)-wave(b.x+2,b.z))*.11*motion,'YXZ');
    const rig=state.rigId||b.rig||'steady';boats.forEach(o=>{o.visible=o.userData.rig===rig;const sail=o.getObjectByName('sail-rig');const deployment=typeof b.sail==='number'?b.sail:1;sail.scale.y=.15+Math.max(0,Math.min(1,deployment))*.85;sail.rotation.y=Math.sin(t*.6)*.025*motion;});
    skipperMixer.update(step);landVoyagers.forEach(p=>{if(!(options.reducedMotion&&p.islandId==='harbor'))p.mixer.update(step);});diverMixer.update(step);
    const homecoming=!!state.storyComplete&&state.currentIsland==='harbor';celebration.visible=!!state.storyComplete&&!diving;
    if(!state.storyComplete){celebrationShown=false;celebrationClock=0;}
    else if(homecoming&&!celebrationShown){celebrationShown=true;celebrationClock=0;}
    if(celebrationShown)celebrationClock=Math.min(6,celebrationClock+step);
    confetti.visible=homecoming&&celebrationShown&&celebrationClock<5&&!options.reducedMotion;
    for(const p of papers){const age=Math.max(0,celebrationClock-p.delay);p.mesh.visible=age>0&&age<4.3;p.mesh.position.set(p.x+Math.sin(age*1.6+p.phase)*1.5,8+age*5-age*age*1.4,p.z+age*.6);p.mesh.rotation.set(age*2+p.phase,age*1.4,age*2.6);}
    festivalLamps.forEach((lamp,i)=>{lamp.material.emissiveIntensity=options.reducedMotion?1.2:1.2+Math.sin(elapsed*1.2+i)*.12;});
    const navigation=activeNavigation(state);navigationRing.visible=navigationPin.visible=!!navigation&&!diving&&state.mode==='sailing';
    if(navigation){navigationRing.position.set(navigation.target.x,waterY+.18,navigation.target.z);navigationPin.position.set(navigation.target.x,waterY+2.2,navigation.target.z);navigationPin.rotation.z=Math.PI;}
    for(const r of surveyRecords){
      const distance=Math.hypot(b.x-r.data.x,b.z-r.data.z),collected=state.voyage?.harvested?.includes(`observation:${r.data.id}`);
      r.model.position.set(r.data.x,waterY+wave(r.data.x,r.data.z)*motion,r.data.z);
      r.model.rotation.z=Math.sin(t*.9+r.data.x)*.045*motion;r.model.visible=!diving&&distance<180;
      r.ring.position.set(r.data.x,waterY+.12,r.data.z);r.ring.visible=!diving&&!collected&&distance<55;
    }
    const known=ids(state.discoveries);for(const d of discoveries){if(d.ring){d.ring.material.color.setHex(known.has(d.id)?0x84c9a3:PALETTE.brass);d.ring.visible=true;}if(d.animal){d.model.position.y=d.baseY+Math.sin(t*1.7+d.baseY)*.25*motion;d.model.rotation.y=Math.sin(t*.3)*.25;}}
    for(const r of reefRecords){const unsafe=tidal.height<=r.data.safeHeight;r.ring.position.y=waterY+.15;r.ring.visible=unsafe;r.model.visible=true;}
    for(const c of currentRecords){const flow=currentAt(c.data.x,c.data.z,t,state.seed||1);const heading=Math.atan2(-flow.x,-flow.z);c.arrows.forEach((a,i)=>{a.position.y=waterY+.18+Math.sin(t+i)*.025;a.rotation.y=Number.isFinite(heading)?heading:0;});}
    for(const w of whirlRecords){const active=Math.sin(t/240*TAU+w.data.phase)>.25;w.model.position.y=waterY+.19;w.model.rotation.y=options.reducedMotion?0:t*(active?.55:.12);w.model.scale.setScalar(active?1:.75);w.rim.position.y=waterY+.13;w.rim.material.color.setHex(active?PALETTE.coral:PALETTE.brass);w.model.visible=true;}
    const parts=ids(state.parts);for(const d of diveRecords){d.group.visible=diving&&state.activeDive===d.site.id;d.objects.forEach((o,i)=>o.visible=quality!=='low'||i%3===0);d.part.visible=!parts.has(d.site.partId);d.part.position.y=-6.1+Math.sin(t*1.3)*.18*motion;d.part.rotation.y=t*.6;d.bubbles.forEach((b,i)=>{b.mesh.position.set(b.x+Math.sin(t+i)*.3,-8+((t*.8+b.phase)%8),b.z+Math.cos(t+i)*.3);});}
    diver.visible=diving;if(diving){const d=state.diver||b;diver.position.set(d.x,-5.9+Math.sin(t*2)*.12*motion,d.z);diver.rotation.set(-Math.PI*.34,-(d.heading||0),0,'YXZ');}
    if(lighthouse&&!!state.lighthouseFixed!==restored){restored=!!state.lighthouseFixed;const lens=lighthouse.getObjectByName('keeper-lens');lens.material.color.setHex(restored?0xffdfa0:0x85ded1);lens.material.emissive.setHex(restored?0xffc85b:0x000000);lens.material.emissiveIntensity=restored?2:0;beaconLight.intensity=restored?50:0;beaconBeam.userData.rotor.visible=restored;}
    if(beaconBeam)beaconBeam.userData.rotor.rotation.y=options.reducedMotion?0:t*.16;
    const speed=Math.abs(b.speed||0);wakes.forEach((w,i)=>{w.visible=!diving&&speed>1;const distance=6+i*1.25+((t*3)%1.25);w.position.set(b.x-Math.sin(b.heading||0)*distance,waterY+.12,b.z+Math.cos(b.heading||0)*distance);w.scale.set(1+i*.12,.6+i*.08,1);w.material.opacity=(1-i/10)*.25*Math.min(speed/6,1);});
    birds.forEach((bird,i)=>{const a=t*.04+i*TAU/4;bird.position.set(119+Math.sin(a)*40,24+i*3,57+Math.cos(a)*30);bird.rotation.y=-a;bird.rotation.z=Math.sin(t*2+i)*.06*motion;bird.visible=!diving&&quality==='high';});
    target.set(diving?(state.diver?.x??b.x):b.x,diving?-5.4:waterY+1,diving?(state.diver?.z??b.z):b.z);
    let heading=-(b.heading||0)+orbitOffset,nearTower=false;
    if(diving){desiredCamera.set(target.x+18,Math.min(waterY-.65,target.y+8),target.z+23);camera.fov=46;scene.fog.color.setHex(0x397f8a);scene.fog.near=15;scene.fog.far=90;scene.background.setHex(0x397f8a);water.visible=false;}
    else {water.visible=true;camera.fov=43;scene.fog.color.setHex(0xb1d2ca);scene.fog.near=230;scene.fog.far=620;scene.background.setHex(0xb1d2ca);const overview=cameraMode==='overhead';const towerIsland=ISLANDS.find(i=>i.id==='lighthouse');nearTower=!!towerIsland&&Math.hypot(b.x-towerIsland.x,b.z-towerIsland.z)<78;const steep=overview||nearTower;const dist=steep?42:66,height=steep?108:61;desiredCamera.set(target.x+Math.sin(heading)*dist,target.y+height,target.z+Math.cos(heading)*dist);}
    // Near the tall beacon both modes keep a steep, boat-centred sightline.
    // Camera/orbit interpolation between those positions stays above the crown.
    if(lastDive!==diving||(nearTower&&frameCount===1)){camera.position.copy(desiredCamera);look.copy(target);lastDive=diving;}
    // Raise the view over nearby cliffs; transparent scenery is not needed at this
    // constrained camera altitude, and the player never enters solid terrain.
    if(!diving)for(const island of ISLANDS){const d=Math.hypot(desiredCamera.x-island.x,desiredCamera.z-island.z);if(d<island.radius+8)desiredCamera.y=Math.max(desiredCamera.y,island.id==='lighthouse'?80:60);}
    const blend=options.reducedMotion?1:1-Math.exp(-Math.max(step,.016)*4.2);camera.position.lerp(desiredCamera,blend);look.lerp(target,blend);camera.lookAt(look);camera.updateProjectionMatrix();
    sun.position.copy(target).add(new THREE.Vector3(-100,180,-80));sun.target.position.copy(target);sun.target.updateMatrixWorld();
    islandRecords.forEach(r=>{r.detail.visible=!diving&&Math.hypot(target.x-r.data.x,target.z-r.data.z)<(quality==='low'?230:420);r.land.visible=!diving;r.ring.position.y=waterY+.14;r.ring.visible=!diving;});vegetation.forEach(v=>v.visible=!diving);boatRoot.visible=!diving;
    if(diving){hemi.intensity=2.8;sun.intensity=1.8;}else{hemi.intensity=2.3;sun.intensity=3;}
    renderer.render(scene,camera);
  }
  function setCamera(mode){cameraMode=mode==='overhead'||mode==='overview'?'overhead':'follow';orbitOffset=0;return cameraMode;}
  function orbit(delta){orbitOffset=THREE.MathUtils.clamp(orbitOffset+(Number(delta)||0),-Math.PI*.8,Math.PI*.8);}
  function stats(){return{renderer:'Three.js WebGLRenderer',revision:THREE.REVISION,camera:cameraMode,drawCalls:renderer.info.render.calls,triangles:renderer.info.render.triangles,geometries:renderer.info.memory.geometries,textures:renderer.info.memory.textures,frames:frameCount,quality,waterVertices:water.geometry.attributes.position.count,rig: lastState?.rigId||'steady',sceneMeshes:scene.children.length,actualSkeletons:landVoyagers.length+2,transparentEffects:wakes.length+1,shadowMaps:renderer.shadowMap.enabled?1:0,celebration:{visible:celebration.visible,confetti:confetti.visible,elapsed:celebrationClock}};}
  function dispose(){if(disposed)return;disposed=true;skipperMixer.stopAllAction();diverMixer.stopAllAction();landVoyagers.forEach(p=>p.mixer.stopAllAction());const geometries=new Set(),materials=new Set();scene.traverse(o=>{if(o.geometry)geometries.add(o.geometry);if(o.material)(Array.isArray(o.material)?o.material:[o.material]).forEach(m=>materials.add(m));});geometries.forEach(g=>g.dispose());materials.forEach(m=>m.dispose());renderer.dispose();renderer.forceContextLoss();}
  resize();return{update,resize,dispose,setCamera,orbit,stats};
}
