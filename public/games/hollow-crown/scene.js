import * as THREE from './vendor/three.module.js';
import { createKit, KIT_VERSION } from './assets/models/kit.js';

const ALIASES = { soldier:'infantry', grunt:'infantry', footman:'infantry', guard:'lancer', spear:'lancer', spearman:'lancer', crossbow:'arbalest', archer:'arbalest', bug:'cinderbug', beetle:'cinderbug', bomber:'cinderbug', shield:'shieldguard', bastion:'shieldguard', regent:'crown', arbiter:'bellwarden', warden:'crown', king:'crown', ash:'crown', ashKing:'crown', 'ash-king':'crown', bell:'bellwarden', ivory:'bellwarden', 'bell-keeper':'bellwarden', 'bell-warden':'bellwarden', bellkeeper:'bellwarden' };
const THEME = {
  ash:{floor:0x505c5c,light:0xe6b08b,fog:0x10191f,mark:0xbd6946,fill:0x9eb4c3},
  ivory:{floor:0x60605a,light:0xffdfac,fog:0x111b20,mark:0xbba77d,fill:0xb6d3e4},
  tutorial:{floor:0x59656a,light:0xf3c48a,fog:0x152129,mark:0xb4a16e,fill:0xc4dfe9},
  ember:{floor:0x665044,light:0xffaa72,fog:0x211818,mark:0xe78c52,fill:0x9aaab4},
  blue:{floor:0x465c66,light:0xbdd9e9,fog:0x10212b,mark:0x80a9b1,fill:0x99c4e0},
  crown:{floor:0x595352,light:0xf9cf8b,fog:0x19151e,mark:0xccb178,fill:0xb0a5c5},
};
const clamp=(x,a,b)=>Math.max(a,Math.min(b,x));
const finite=(v,f=0)=>Number.isFinite(v)?v:f;
const actionAliases={idle:'idle',moving:'run',move:'run',approach:'run',chase:'run',light:'light',attack:'attack',thrust:'light',charged:'light',heavy:'light',counter:'light',charge:'charge',charging:'charge',block:'block',blocking:'block',parry:'block',dodge:'dodge',dodging:'dodge',hurt:'hurt',stagger:'hurt',stunned:'hurt',dead:'death',death:'death',telegraph:'telegraph',recover:'recover'};

/** Read-only view: simulation owns every collision, damage and state transition. */
export class SceneView {
  constructor(canvas,options={}) {
    this.canvas=canvas;this.options=options;this.quality=options.quality==='low'?'low':'high';this.disposed=false;
    this.renderer=new THREE.WebGLRenderer({canvas,alpha:false,antialias:true,powerPreference:'high-performance'});
    this.renderer.outputColorSpace=THREE.SRGBColorSpace;this.renderer.toneMapping=THREE.ACESFilmicToneMapping;this.renderer.toneMappingExposure=1.22;
    this.renderer.shadowMap.enabled=this.quality!=='low';this.renderer.shadowMap.type=THREE.PCFSoftShadowMap;
    this.scene=new THREE.Scene();this.scene.background=new THREE.Color(0x111a20);this.scene.fog=new THREE.FogExp2(0x111a20,.014);
    this.camera=new THREE.OrthographicCamera(-15,15,10,-10,.1,100);this.camera.position.set(0,23,22);
    this.focus=new THREE.Vector3();this.camera.lookAt(0,0,0);this.raycaster=new THREE.Raycaster();this.ground=new THREE.Plane(new THREE.Vector3(0,1,0),0);
    this.cameraShake={age:.18,duration:.18,strength:0,offset:new THREE.Vector3()};
    this.assetErrors=new Set();this.kit=createKit(THREE,{textureBaseUrl:new URL('./assets/textures/',import.meta.url),onTextureError:file=>this.handleTextureError(file)});this.actors=new Map();this.actorBatches=new Map();this.warningGroups=new Map();this.projectileGroups=new Map();this.effectGroups=new Map();this.extraGeometries=[];this.extraMaterials=[];
    this.roomRoot=new THREE.Group();this.roomRoot.name='room-visuals';this.scene.add(this.roomRoot);this.decorationRoot=new THREE.Group();this.decorationRoot.name='room-theme-decoration';this.scene.add(this.decorationRoot);this.obstacles=[];this.roomSignature='';this.frames=[];this.elapsed=0;this.frameCount=0;this.lastPlayerPosition=new THREE.Vector2();
    this.ambient=new THREE.HemisphereLight(0xb6d3e4,0x24222a,2.5);this.scene.add(this.ambient);
    this.sun=new THREE.DirectionalLight(0xffd4a1,3.1);this.sun.position.set(-7,16,-6);this.sun.castShadow=true;
    Object.assign(this.sun.shadow.camera,{left:-15,right:15,top:15,bottom:-15,near:.5,far:45});this.sun.shadow.bias=-.0004;this.sun.shadow.normalBias=.035;this.sun.shadow.mapSize.set(1024,1024);this.scene.add(this.sun);
    const rim=new THREE.DirectionalLight(0x7ca3b6,1.6);rim.position.set(5,7,9);this.scene.add(rim);
    this.lanternLight=new THREE.PointLight(0xff8038,4,12,2);this.lanternLight.position.set(0,3,-7);this.scene.add(this.lanternLight);
    this.buildEnvironment();
    this.playerMarker=this.makeRing(.7,.745,0xd7c28d,.85);this.playerMarker.rotation.x=-Math.PI/2;this.playerMarker.position.y=.035;this.scene.add(this.playerMarker);
    this.facingMarker=new THREE.Mesh(this.ownGeometry(new THREE.ConeGeometry(.12,.35,3)),this.ownMaterial(new THREE.MeshBasicMaterial({color:0xf2d5a4,depthTest:false})));this.facingMarker.rotation.x=Math.PI/2;this.facingMarker.renderOrder=21;this.scene.add(this.facingMarker);
    this.onContextLost=e=>{e.preventDefault();this.contextLost=true;options.onContextLost?.();};this.onContextRestored=()=>{this.contextLost=false;options.onContextRestored?.();};
    canvas.addEventListener('webglcontextlost',this.onContextLost);canvas.addEventListener('webglcontextrestored',this.onContextRestored);
    this.resizeObserver=typeof ResizeObserver!=='undefined'?new ResizeObserver(()=>this.resize()):null;this.resizeObserver?.observe(canvas);this.resize();this.setQuality(this.quality);
  }
  ownGeometry(g){this.extraGeometries.push(g);return g;}
  ownMaterial(m){this.extraMaterials.push(m);return m;}
  queueCameraShake(type){
    const strength={hit:.04,parry:.065,hurt:.085}[type];if(!strength)return;
    const shake=this.cameraShake,remaining=Math.max(0,1-shake.age/shake.duration);
    shake.strength=Math.min(.085,Math.max(strength,shake.strength*remaining*remaining));shake.age=0;
  }
  updateCameraShake(dt,enabled){
    const shake=this.cameraShake;shake.offset.set(0,0,0);
    if(!enabled){shake.age=shake.duration;shake.strength=0;return;}
    shake.age=Math.min(shake.duration,shake.age+dt);
    if(shake.age>=shake.duration){shake.strength=0;return;}
    const envelope=(1-shake.age/shake.duration)**2,amplitude=shake.strength*envelope;
    shake.offset.set(Math.sin(shake.age*83+1.1)*amplitude,0,Math.cos(shake.age*71+.4)*amplitude*.6);
    shake.offset.clampLength(0,.09);
  }
  handleTextureError(file){
    if(this.disposed)return;
    this.scene.traverse(node=>{for(const m of Array.isArray(node.material)?node.material:node.material?[node.material]:[]){if(m.userData.stoneFallbackRoughness===undefined)continue;m.map=null;m.normalMap=null;m.roughnessMap=null;m.roughness=m.userData.stoneFallbackRoughness;m.needsUpdate=true;}});
    if(!this.assetErrors.has(file)){this.assetErrors.add(file);this.options.onAssetError?.(file);}
  }
  instanceProp(id,positions,low=false){
    const template=this.kit.makeProp(id,low);template.updateMatrixWorld(true);const batches=new Map();
    template.traverse(node=>{if(!node.isMesh)return;const key=node.geometry.uuid+node.material.uuid;if(!batches.has(key))batches.set(key,{geometry:node.geometry,material:node.material,transforms:[]});batches.get(key).transforms.push(node.matrixWorld.clone());});
    const group=new THREE.Group();group.name='instanced-'+id+(low?'-low':'');const placement=new THREE.Matrix4(),combined=new THREE.Matrix4();
    for(const batch of batches.values()){const instanced=new THREE.InstancedMesh(batch.geometry,batch.material,positions.length*batch.transforms.length);let n=0;for(const p of positions){placement.makeRotationY(p[3]||0);placement.setPosition(p[0],p[1],p[2]);for(const transform of batch.transforms){combined.multiplyMatrices(placement,transform);instanced.setMatrixAt(n++,combined);}}instanced.castShadow=true;instanced.receiveShadow=true;group.add(instanced);}return group;
  }
  makeRing(inner,outer,color,opacity=1){const m=new THREE.Mesh(this.ownGeometry(new THREE.RingGeometry(inner,outer,64)),this.ownMaterial(new THREE.MeshBasicMaterial({color,transparent:opacity<1,opacity,side:THREE.DoubleSide,depthWrite:false})));m.renderOrder=2;return m;}
  buildEnvironment() {
    const floorGeo=this.kit.makeProp('floor-tile').children[0].geometry;
    const floorMat=this.ownMaterial(this.kit.materials.stone.clone());floorMat.color.set(0x606766);
    this.floor=new THREE.InstancedMesh(floorGeo,floorMat,121);this.floor.name='instanced-basalt-floor';this.floor.receiveShadow=true;
    const dummy=new THREE.Object3D(),color=new THREE.Color();let n=0;
    for(let x=-5;x<=5;x++)for(let z=-5;z<=5;z++){dummy.position.set(x*2,-.14+Math.sin(x*7+z*11)*.012,z*2);dummy.rotation.y=((x+z)%2)*Math.PI/2;dummy.scale.set(1.96,.18,1.96);dummy.updateMatrix();this.floor.setMatrixAt(n,dummy.matrix);const shade=.82+((x*13+z*7+101)%11)*.028;color.setRGB(shade,shade,shade);this.floor.setColorAt(n++,color);}
    this.scene.add(this.floor);
    const base=new THREE.Mesh(this.ownGeometry(new THREE.BoxGeometry(23.2,.9,23.2)),this.ownMaterial(new THREE.MeshStandardMaterial({color:0x202c31,roughness:.91})));base.position.y=-.65;base.receiveShadow=true;this.scene.add(base);
    for(const radius of [6.2,6.32,9.6]){const ring=this.makeRing(radius,radius+.035,0xa59870,.3);ring.rotation.x=-Math.PI/2;ring.position.y=-.035;this.scene.add(ring);}
    const compassMaterial=this.ownMaterial(new THREE.MeshStandardMaterial({color:0xa49166,metalness:.6,roughness:.72}));
    for(let i=0;i<8;i++){const a=i*Math.PI/4;const bar=new THREE.Mesh(this.ownGeometry(new THREE.BoxGeometry(.045,.012,i%2?1:1.65)),compassMaterial);bar.position.set(Math.sin(a)*7.65,-.035,Math.cos(a)*7.65);bar.rotation.y=a;this.scene.add(bar);}
    const wallPositions=[];for(let i=-5;i<=5;i++)for(const z of [-11,11]){if(z===11&&Math.abs(i)<1)continue;wallPositions.push([i*2,-.15,z,0]);}for(let i=-5;i<=5;i++)for(const x of [-11,11])wallPositions.push([x,-.15,i*2,Math.PI/2]);this.scene.add(this.instanceProp('wall',wallPositions));
    // The distant colonnade has a real low-poly LOD, never a billboard replacement.
    const pillarPositions=[-10.5,-7,-3.5,3.5,7,10.5].map(x=>[x,0,-10.5]);const columnLOD=new THREE.LOD();columnLOD.name='colonnade-lod';columnLOD.addLevel(this.instanceProp('pillar',pillarPositions),0);columnLOD.addLevel(this.instanceProp('pillar',pillarPositions,true),42);this.scene.add(columnLOD);this.colonnades=[columnLOD];
    const candlePositions=[];for(const x of [-8,8])for(const z of [-8,0,8])candlePositions.push([x,0,z]);this.candleProps=this.instanceProp('candelabrum',candlePositions);this.scene.add(this.candleProps);
    for(const x of [-8.5,8.5]){const b=this.kit.makeProp('banner');b.position.set(x,0,-9.3);this.scene.add(b);}
    this.altar=this.kit.makeProp('altar');this.altar.position.set(0,0,-9.15);this.scene.add(this.altar);
    const dustGeo=this.ownGeometry(new THREE.OctahedronGeometry(.035,0));const dustMat=this.ownMaterial(new THREE.MeshBasicMaterial({color:0xc99563,transparent:true,opacity:.42}));this.dust=new THREE.InstancedMesh(dustGeo,dustMat,38);this.dust.name='instanced-floating-embers';this.dust.frustumCulled=false;this.scene.add(this.dust);this.dustDummy=new THREE.Object3D();
    this.effectGeometry=this.ownGeometry(new THREE.OctahedronGeometry(.11,0));this.effectMaterial=this.ownMaterial(new THREE.MeshBasicMaterial({color:0xffbd75,transparent:true,opacity:.85}));
    this.boltGeometry=this.ownGeometry(new THREE.ConeGeometry(.065,.7,4));this.boltMaterial=this.ownMaterial(new THREE.MeshStandardMaterial({color:0xffc28d,emissive:0xb54724,emissiveIntensity:.8,metalness:.5,roughness:.4}));
    this.healthGeometry=this.ownGeometry(new THREE.PlaneGeometry(1,1));this.healthBackMaterial=this.ownMaterial(new THREE.MeshBasicMaterial({color:0x071218,transparent:true,opacity:.8,depthTest:false,depthWrite:false}));this.healthFrontMaterial=this.ownMaterial(new THREE.MeshBasicMaterial({color:0xee9869,depthTest:false,depthWrite:false}));
    this.puddleGeometry=this.ownGeometry(new THREE.CylinderGeometry(1,1,.014,24));this.puddleMaterial=this.ownMaterial(new THREE.MeshStandardMaterial({color:0x578797,metalness:.45,roughness:.22,transparent:true,opacity:.24,depthWrite:false}));
    this.emberVeinGeometry=this.ownGeometry(new THREE.BoxGeometry(.035,.012,1));this.emberVeinMaterial=this.ownMaterial(new THREE.MeshStandardMaterial({color:0xa85b34,emissive:0xc64d1f,emissiveIntensity:.7,roughness:.8}));
    this.rubblePositions=[[-9.8,0,-7],[9.8,0,-5],[-9.7,0,5],[9.8,0,7],[-7,0,-10],[6,0,-10],[-6,0,10],[7,0,10]];
    this.scene.add(this.instanceProp('rubble',this.rubblePositions));
  }
  buildRoom(room={},phase='combat') {
    const signature=String(room.id||phase)+':'+phase+':'+room.theme+JSON.stringify(room.obstacles||[]);
    if(signature===this.roomSignature)return;this.roomSignature=signature;
    for(const o of this.obstacles)for(const m of o.materials)m.dispose();this.obstacles=[];this.roomRoot.clear();this.decorationRoot.traverse(n=>{if(n.isInstancedMesh)n.dispose();});this.decorationRoot.clear();
    const themeId=THEME[room.theme]?room.theme:phase==='tutorial'?'tutorial':'ash';const theme=THEME[themeId];this.floor.material.color.set(theme.floor);this.sun.color.set(theme.light);this.ambient.color.set(theme.fill);this.scene.background.set(theme.fog);this.scene.fog.color.set(theme.fog);this.lanternLight.color.set(themeId==='blue'?0x93d8ee:0xff8038);
    const obstacles=room.obstacles||[];
    for(let index=0;index<obstacles.length;index++){
      const o=obstacles[index];const group=new THREE.Group();group.name='obstacle-'+index;group.position.set(finite(o.x),0,finite(o.z));const materials=[];
      const radius=finite(o.r,.7),w=finite(o.w,radius*2),d=finite(o.d,radius*2),height=finite(o.h,o.r?1.7:.9);
      const template=this.kit.makeProp(o.r?'pillar':'wall',this.quality==='low');template.scale.set(w/(o.r?1.15:2),height/(o.r?3.02:1.1),d/(o.r?1.15:.5));
      template.traverse(node=>{if(node.isMesh){node.material=node.material.clone();node.material.transparent=true;materials.push(node.material);}});group.add(template);group.userData.collisionSource=o;this.roomRoot.add(group);this.obstacles.push({group,materials,w,d,height});
    }
    this.altar.visible=phase==='camp'||phase==='tutorial'||themeId==='crown';
    if(themeId==='ember'){
      this.decorationRoot.add(this.instanceProp('brazier',[[-9.9,0,-6],[9.9,0,-6],[-9.9,0,6],[9.9,0,6]]));
      const veins=new THREE.InstancedMesh(this.emberVeinGeometry,this.emberVeinMaterial,18),d=new THREE.Object3D();for(let i=0;i<18;i++){const side=i%2?1:-1;d.position.set(side*(7.7+(i%3)*.55),-.027,Math.sin(i*2.3)*8.5);d.rotation.y=i*.78;d.scale.z=.3+(i%4)*.18;d.updateMatrix();veins.setMatrixAt(i,d.matrix);}this.decorationRoot.add(veins);
    }else if(themeId==='blue'){
      const pools=new THREE.InstancedMesh(this.puddleGeometry,this.puddleMaterial,9),d=new THREE.Object3D();for(let i=0;i<9;i++){d.position.set(Math.sin(i*2.7)*8.4,-.026,Math.cos(i*3.2)*8.1);d.scale.set(.55+(i%3)*.35,1,.4+(i%2)*.42);d.rotation.y=i*.7;d.updateMatrix();pools.setMatrixAt(i,d.matrix);}this.decorationRoot.add(pools);
      this.decorationRoot.add(this.instanceProp('pillar',[[-10.3,0,0],[10.3,0,0]],true));
    }else if(themeId==='crown'){
      this.decorationRoot.add(this.instanceProp('banner',[[-6.8,0,-10.3],[-3.3,0,-10.3],[3.3,0,-10.3],[6.8,0,-10.3]]));this.decorationRoot.add(this.instanceProp('brazier',[[-4.5,0,-10.3],[4.5,0,-10.3]]));
    }else if(themeId==='ash'){
      this.decorationRoot.add(this.instanceProp('rubble',[[-8.8,0,-8.6],[8.8,0,8.6],[-8.7,0,7.4],[8.5,0,-7.8]]));
    }
  }
  createActor(id,type,skin) {
    const resolved=ALIASES[type]||type||'infantry';const model=this.kit.makeActor(resolved,{skin});model.group.position.y=.015;
    // Logical rigs feed the world-space instance matrices below. Keep them detached
    // so the renderer does not traverse and recompute their invisible meshes again.
    const mixer=new THREE.AnimationMixer(model.group),actions={};for(const clip of model.clips)actions[clip.name]=mixer.clipAction(clip);
    const health=new THREE.Group();health.name='health-meter';const back=new THREE.Mesh(this.healthGeometry,this.healthBackMaterial);back.scale.set(.75,.075,1);const front=new THREE.Mesh(this.healthGeometry,this.healthFrontMaterial);front.scale.set(.71,.037,1);front.position.z=.003;back.renderOrder=30;front.renderOrder=31;health.add(back,front);this.scene.add(health);
    const meshes=[];model.group.traverse(node=>{if(node.isMesh){meshes.push(node);node.visible=false;}});
    const a={...model,id,type:resolved,skin,mixer,actions,current:null,health,healthFront:front,meshes,previousX:0,previousZ:0,first:true};this.actors.set(id,a);return a;
  }
  animateActor(a,data,dt,isPlayer=false) {
    const moved=!a.first&&Math.hypot(finite(data.x)-a.previousX,finite(data.z)-a.previousZ)>.001;
    a.previousX=finite(data.x);a.previousZ=finite(data.z);a.first=false;
    a.group.position.set(a.previousX,.015,a.previousZ);a.group.rotation.y=finite(data.angle);
    const raw=isPlayer?data.action:data.state;let action=actionAliases[raw]||'idle';if(isPlayer&&raw==='charge'&&data.attack)action='light';if((!raw||raw==='idle')&&moved)action='run';if(data.hp<=0)action='death';
    const freshAttack=isPlayer&&data.attack&&data.attack!==a.lastAttack;
    if(action!==a.current||freshAttack){const prev=a.actions[a.current];const next=a.actions[action]||a.actions.idle;next.reset();next.enabled=true;next.setEffectiveWeight(1);const speed=isPlayer&&action==='light'?.17/Math.max(.05,finite(data.attack?.activeStart,.095)):!isPlayer&&action==='attack'?1.8:1;next.setEffectiveTimeScale(speed);const oneShot=['light','attack','hurt','dodge','death','recover'].includes(action);next.setLoop(oneShot?THREE.LoopOnce:THREE.LoopRepeat,oneShot?1:Infinity);next.clampWhenFinished=oneShot;if(!isPlayer&&action==='attack')next.time=.17;next.play();if(prev&&prev!==next)prev.crossFadeTo(next,action==='attack'?.025:.07,false);a.current=action;}
    a.lastAttack=data.attack;
    a.mixer.update(dt);
    const dead=data.hp<=0;a.group.visible=!dead||a.actions.death.time<.8;
    const hp=clamp(finite(data.hp,1)/Math.max(1,finite(data.maxHp,1)),0,1);a.health.visible=!isPlayer&&!dead&&hp<1;
    a.health.position.set(a.previousX,a.type==='crown'?3.2:a.type==='bellwarden'?3: a.type==='cinderbug'?1.1:2,a.previousZ);a.health.quaternion.copy(this.camera.quaternion);a.healthFront.scale.x=.71*hp;a.healthFront.position.x=-.355*(1-hp);
    if(isPlayer){this.playerMarker.position.set(a.previousX,.035,a.previousZ);this.facingMarker.position.set(a.previousX+Math.sin(finite(data.angle))*.93,.07,a.previousZ+Math.cos(finite(data.angle))*.93);this.facingMarker.rotation.z=-finite(data.angle);this.playerMarker.material.opacity=data.invuln>0?.45:.85;}
  }
  removeActor(id){const a=this.actors.get(id);if(!a)return;a.mixer.stopAllAction();a.mixer.uncacheRoot(a.group);this.scene.remove(a.group,a.health);this.actors.delete(id);}
  updateActorBatches(){
    for(const batch of this.actorBatches.values())batch.count=0;
    for(const actor of this.actors.values()){
      if(!actor.group.visible)continue;actor.group.updateMatrixWorld(true);
      for(const part of actor.meshes){
        const key=part.geometry.uuid+part.material.uuid;let batch=this.actorBatches.get(key);
        if(!batch){const mesh=new THREE.InstancedMesh(part.geometry,part.material,512);mesh.name='animated-rigid-bone-batch';mesh.castShadow=true;mesh.receiveShadow=true;mesh.frustumCulled=false;mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);this.scene.add(mesh);batch={mesh,count:0};this.actorBatches.set(key,batch);}
        if(batch.count<512)batch.mesh.setMatrixAt(batch.count++,part.matrixWorld);
      }
    }
    for(const batch of this.actorBatches.values()){
      batch.mesh.count=batch.count;batch.mesh.visible=batch.count>0;
      // Only the populated prefix is drawn; keep unused capacity off the upload path.
      batch.mesh.instanceMatrix.clearUpdateRanges();
      if(batch.count>0){batch.mesh.instanceMatrix.addUpdateRange(0,batch.count*16);batch.mesh.instanceMatrix.needsUpdate=true;}
    }
  }
  warning(enemy) {
    const attack=enemy.attack;const visible=enemy.state==='telegraph'||enemy.state==='attack';const id=String(enemy.id);let record=this.warningGroups.get(id);
    if(!attack||!visible){if(record)record.group.visible=false;return;}
    const shape=attack.shape||'circle',range=finite(attack.range,finite(attack.radius,3)),width=finite(attack.width,1),radius=finite(attack.radius,range),angle=finite(attack.angle,Math.PI/3),inner=finite(attack.innerRadius,radius*.6);
    const signature=[shape,range,width,radius,angle,inner].join(':');
    if(!record||record.signature!==signature){
      if(record){this.scene.remove(record.group);record.geometries.forEach(g=>g.dispose());record.material.dispose();record.outlineMaterial.dispose();}
      const group=new THREE.Group();group.name='attack-warning-'+id;const geometries=[];let geometry;
      if(shape==='line'){geometry=new THREE.PlaneGeometry(width,range);geometry.rotateX(-Math.PI/2);geometry.translate(0,0,range*.5);}
      else if(shape==='cone'){const s=new THREE.Shape();s.moveTo(0,0);for(let i=0;i<=32;i++){const a=-angle/2+i/32*angle;s.lineTo(Math.sin(a)*range,-Math.cos(a)*range);}s.closePath();geometry=new THREE.ShapeGeometry(s);geometry.rotateX(-Math.PI/2);}
      else{geometry=new THREE.RingGeometry(shape==='ring'?Math.max(0,inner):.02,radius,64);geometry.rotateX(-Math.PI/2);}
      geometries.push(geometry);const material=new THREE.MeshBasicMaterial({color:0xec8858,transparent:true,opacity:.27,depthWrite:false,depthTest:false,side:THREE.DoubleSide});const fill=new THREE.Mesh(geometry,material);fill.renderOrder=10;group.add(fill);
      const outlineGeometry=new THREE.EdgesGeometry(geometry,45);geometries.push(outlineGeometry);const outline=new THREE.LineSegments(outlineGeometry,new THREE.LineBasicMaterial({color:0xffc99c,transparent:true,opacity:.75,depthTest:false,depthWrite:false}));outline.renderOrder=11;group.add(outline);
      // Attack zones have both edges and a repeating warning tick pattern, never color alone.
      const tickGeo=new THREE.BoxGeometry(.08,.015,.22);geometries.push(tickGeo);const tick=new THREE.InstancedMesh(tickGeo,material,shape==='line'?6:16),dummy=new THREE.Object3D();
      for(let i=0;i<tick.count;i++){if(shape==='line'){dummy.position.set((i%2?1:-1)*width*.44,.02,range*(.2+Math.floor(i/2)*.27));dummy.rotation.y=0;}else{const a=shape==='cone'?(-angle/2+i/15*angle):i/16*Math.PI*2;dummy.position.set(Math.sin(a)*(shape==='cone'?range:radius)*.92,.02,Math.cos(a)*(shape==='cone'?range:radius)*.92);dummy.rotation.y=a;}dummy.updateMatrix();tick.setMatrixAt(i,dummy.matrix);}tick.renderOrder=12;group.add(tick);this.scene.add(group);record={group,geometries,material,outlineMaterial:outline.material,signature};this.warningGroups.set(id,record);
    }
    record.group.visible=true;record.group.position.set(finite(attack.x,finite(enemy.x)),.045,finite(attack.z,finite(enemy.z)));record.group.rotation.y=finite(attack.heading,finite(enemy.angle));record.material.opacity=enemy.state==='attack'?.46:.22+.08*Math.sin(this.elapsed*12);record.material.color.set(enemy.state==='attack'?0xffb377:0xe77c50);
  }
  render(state={},dt=1/60) {
    if(this.disposed||this.contextLost)return;const start=performance.now();const rawDt=finite(dt,1/60);dt=clamp(rawDt,0,.1);this.elapsed+=dt;const settings=state.settings||{};const shakeEnabled=settings.shake===true&&!settings.reducedMotion&&!state.paused&&rawDt>0&&['combat','tutorial'].includes(state.phase);if(settings.quality&&settings.quality!==this.quality)this.setQuality(settings.quality);
    this.buildRoom(state.room,state.phase);
    const p=state.player||{x:0,z:3,angle:Math.PI,hp:100,maxHp:100};let player=this.actors.get('player');if(player&&player.skin!==p.skin){this.removeActor('player');player=null;}if(!player)player=this.createActor('player','guardian',p.skin);this.animateActor(player,p,dt,true);if(state.phase==='camp')player.group.rotation.y=-.42;
    const live=new Set(['player']);for(const e of state.enemies||[]){const id=String(e.id);live.add(id);let a=this.actors.get(id);const type=ALIASES[e.type]||e.type||'infantry';if(a&&a.type!==type){this.removeActor(id);a=null;}if(!a)a=this.createActor(id,type);this.animateActor(a,e,dt);this.warning(e);}
    for(const id of this.actors.keys())if(!live.has(id))this.removeActor(id);
    for(const [id,w] of this.warningGroups)if(!live.has(id)){this.scene.remove(w.group);w.geometries.forEach(g=>g.dispose());w.material.dispose();w.outlineMaterial.dispose();this.warningGroups.delete(id);}
    const visibleBolts=new Set();for(const b of state.projectiles||[]){const id=String(b.id);visibleBolts.add(id);let obj=this.projectileGroups.get(id);if(!obj){obj=new THREE.Mesh(this.boltGeometry,this.boltMaterial);obj.name='physical-crossbow-bolt';this.scene.add(obj);this.projectileGroups.set(id,obj);}obj.position.set(finite(b.x),.68,finite(b.z));obj.rotation.set(Math.PI/2,0,-finite(b.angle));}
    for(const [id,obj]of this.projectileGroups)if(!visibleBolts.has(id)){this.scene.remove(obj);this.projectileGroups.delete(id);}
    const liveEffects=new Set();for(const e of (state.effects||[]).slice(-28)){const id=String(e.id);liveEffects.add(id);let record=this.effectGroups.get(id);if(!record){if(shakeEnabled)this.queueCameraShake(e.type);const group=new THREE.Group();for(let i=0;i<7;i++){const mesh=new THREE.Mesh(this.effectGeometry,this.effectMaterial);group.add(mesh);}this.scene.add(group);record={group,start:Math.max(.05,finite(e.life,.4))};this.effectGroups.set(id,record);}record.group.position.set(finite(e.x),.38,finite(e.z));const t=clamp(1-finite(e.life,0)/record.start,0,1);record.group.visible=settings.flash!==false;record.group.children.forEach((m,i)=>{const a=i/7*Math.PI*2;m.position.set(Math.sin(a)*t*.8,t*.7,Math.cos(a)*t*.8);m.scale.setScalar((1-t)*.85);m.rotation.set(i+t*3,t*2,i);});}
    for(const [id,e]of this.effectGroups)if(!liveEffects.has(id)){this.scene.remove(e.group);this.effectGroups.delete(id);}
    const camp=state.phase==='camp',tracking=this.aspect<1?.35:.12,targetX=camp&&this.aspect>=1?finite(p.x)-3.9:clamp(finite(p.x)*tracking,-3.4,3.4),targetZ=camp&&this.aspect>=1?finite(p.z)-.6:clamp(finite(p.z)*tracking,-3.2,3.2);const smooth=settings.reducedMotion?1:1-Math.exp(-dt*5);this.focus.x+=(targetX-this.focus.x)*smooth;this.focus.z+=(targetZ-this.focus.z)*smooth;const zoom=camp&&this.aspect>=1?2.7:1;this.camera.zoom+=(zoom-this.camera.zoom)*smooth;this.camera.updateProjectionMatrix();
    this.updateCameraShake(dt,shakeEnabled);const shake=this.cameraShake.offset;
    const cameraY=this.camera.position.y+((camp&&this.aspect>=1?14:23)-this.camera.position.y)*smooth;this.camera.position.set(this.focus.x+shake.x,cameraY,this.focus.z+22+shake.z);this.camera.lookAt(this.focus.x+shake.x,0,this.focus.z+shake.z);this.camera.updateMatrixWorld();
    const playerPoint=new THREE.Vector3(finite(p.x),.9,finite(p.z)).project(this.camera);
    for(const o of this.obstacles){const point=o.group.position.clone();point.y=o.height*.55;point.project(this.camera);const occluded=o.group.position.z>finite(p.z)-.3&&Math.abs(point.x-playerPoint.x)<.07+o.w/28&&Math.abs(point.y-playerPoint.y)<.09+o.height/20;const alpha=occluded?.24:1;for(const m of o.materials){m.opacity+=(alpha-m.opacity)*Math.min(1,dt*12);m.depthWrite=m.opacity>.97;}}
    const dustCount=this.quality==='low'?10:38;this.dust.count=dustCount;for(let i=0;i<dustCount;i++){const t=settings.reducedMotion?0:this.elapsed;this.dustDummy.position.set(Math.sin(i*5.31)*10+Math.sin(t*.25+i)*.3,((t*.18+i*.39)%4)+.3,Math.cos(i*8.77)*10);this.dustDummy.rotation.set(i+t*.2,i,i);this.dustDummy.scale.setScalar(.5+(i%4)*.3);this.dustDummy.updateMatrix();this.dust.setMatrixAt(i,this.dustDummy.matrix);}this.dust.instanceMatrix.needsUpdate=true;
    this.updateActorBatches();this.renderer.render(this.scene,this.camera);const renderMs=performance.now()-start;this.frames.push({dt:rawDt*1000,renderMs});if(this.frames.length>7200)this.frames.shift();this.frameCount++;
  }
  resize(){if(this.disposed)return;const bounds=this.canvas.getBoundingClientRect();const w=Math.max(1,Math.floor(bounds.width||this.canvas.clientWidth||640)),h=Math.max(1,Math.floor(bounds.height||this.canvas.clientHeight||360));this.aspect=w/h;this.renderer.setSize(w,h,false);this.renderer.setPixelRatio(Math.min(globalThis.devicePixelRatio||1,this.quality==='low'?1:1.6));const half=this.aspect<1?8.7/this.aspect:12;this.camera.left=-half*this.aspect;this.camera.right=half*this.aspect;this.camera.top=half;this.camera.bottom=-half;this.camera.updateProjectionMatrix();}
  screenToGround(clientX,clientY){const b=this.canvas.getBoundingClientRect();const mouse=new THREE.Vector2((clientX-b.left)/Math.max(1,b.width)*2-1,-(clientY-b.top)/Math.max(1,b.height)*2+1);this.raycaster.setFromCamera(mouse,this.camera);const hit=new THREE.Vector3();if(this.raycaster.ray.intersectPlane(this.ground,hit))return{x:hit.x,z:hit.z};return{x:0,z:0};}
  setQuality(quality){this.quality=quality==='low'?'low':'high';this.renderer.shadowMap.enabled=this.quality==='high';this.sun.castShadow=this.quality==='high';this.sun.shadow.mapSize.set(this.quality==='high'?1024:512,this.quality==='high'?1024:512);for(const lod of this.colonnades||[]){lod.autoUpdate=this.quality!=='low';lod.levels.forEach((l,i)=>l.object.visible=this.quality==='low'?i===1:i===0);}this.resize();}
  metrics(){
    const percentile=key=>{const values=this.frames.map(f=>f[key]).sort((a,b)=>a-b);return values.length?Number(values[Math.min(values.length-1,Math.floor(values.length*.95))].toFixed(2)):null;};let instances=0;this.scene.traverse(node=>{if(node.isInstancedMesh&&node.visible)instances++;});
    const textureBytes=this.kit.shared.textures.reduce((n,t)=>n+(t.image?.width||0)*(t.image?.height||0)*4*(t.generateMipmaps?4/3:1),0),shadow=this.sun.shadow.map;
    return{engine:'three@0.180.0',kitVersion:KIT_VERSION,quality:this.quality,frameSamples:this.frames.length,frameP95Ms:percentile('dt'),renderSubmitP95Ms:percentile('renderMs'),drawCalls:this.renderer.info.render.calls,triangles:this.renderer.info.render.triangles,geometries:this.renderer.info.memory.geometries,textures:this.renderer.info.memory.textures,textureMemoryBytes:Math.round(textureBytes),renderTargetColorMemoryBytes:shadow?shadow.width*shadow.height*4:0,memoryIsEstimate:true,activeRigs:this.actors.size,activeBones:[...this.actors.values()].reduce((n,a)=>{a.group.traverse(o=>{if(o.isBone)n++;});return n;},0),pointLights:1,directionalLights:2,shadowMaps:this.quality==='high'?1:0,shadowResolution:this.quality==='high'?1024:0,transparentEffects:this.effectGroups.size,instancedMeshes:instances,contextLost:!!this.contextLost,drawingBuffer:[this.canvas.width,this.canvas.height],rendererInfo:this.renderer.getContext().getParameter(this.renderer.getContext().RENDERER)};
  }
  dispose(){if(this.disposed)return;this.disposed=true;this.resizeObserver?.disconnect();this.canvas.removeEventListener('webglcontextlost',this.onContextLost);this.canvas.removeEventListener('webglcontextrestored',this.onContextRestored);for(const id of [...this.actors.keys()])this.removeActor(id);for(const w of this.warningGroups.values()){w.geometries.forEach(g=>g.dispose());w.material.dispose();w.outlineMaterial.dispose();}for(const o of this.obstacles)for(const m of o.materials)m.dispose();this.scene.traverse(n=>{if(n.isInstancedMesh)n.dispose();});this.extraGeometries.forEach(g=>g.dispose());this.extraMaterials.forEach(m=>m.dispose());this.kit.dispose();this.scene.clear();this.renderer.dispose();this.frames=[];}
}
