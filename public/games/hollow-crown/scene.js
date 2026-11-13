import {clamp} from './numeric.js';
import { NumericRing } from './ring-buffer.js';
import { ROOMS, BOSS_ROOM } from './content.js';
import * as THREE from './vendor/three.module.js';
import { RigidBatch, uploadRange } from './rigid-batch.js';
import { mergePropGeometry, bakeColorGeometry, collectMeshParts } from './merge-prop.js';
import { RenderBudget } from './render-budget.js';
import { WarningCueView } from './warning-cue-view.js'; // 公開扇形的只讀呈現守門，不接simulation。
import { createKit, KIT_VERSION } from './assets/models/kit.js';
const ONE_SHOT_ACTIONS=Object.freeze(['light','attack','hurt','dodge','death','recover']);
const EMPTY_SETTINGS=Object.freeze({});
const EMPTY_ARRAY=Object.freeze([]);
const ACTIVE_PHASES=Object.freeze(['combat','tutorial']);


const ALIASES = { soldier:'infantry', grunt:'infantry', footman:'infantry', guard:'lancer', spear:'lancer', spearman:'lancer', crossbow:'arbalest', archer:'arbalest', bug:'cinderbug', beetle:'cinderbug', bomber:'cinderbug', shield:'shieldguard', bastion:'shieldguard', regent:'crown', arbiter:'bellwarden', warden:'crown', king:'crown', ash:'crown', ashKing:'crown', 'ash-king':'crown', bell:'bellwarden', ivory:'bellwarden', 'bell-keeper':'bellwarden', 'bell-warden':'bellwarden', bellkeeper:'bellwarden' };
const THEME = {
  ash:{floor:0x505c5c,light:0xe6b08b,fog:0x10191f,mark:0xbd6946,fill:0x9eb4c3},
  ivory:{floor:0x60605a,light:0xffdfac,fog:0x111b20,mark:0xbba77d,fill:0xb6d3e4},
  tutorial:{floor:0x59656a,light:0xf3c48a,fog:0x152129,mark:0xb4a16e,fill:0xc4dfe9},
  ember:{floor:0x665044,light:0xffaa72,fog:0x211818,mark:0xe78c52,fill:0x9aaab4},
  blue:{floor:0x465c66,light:0xbdd9e9,fog:0x10212b,mark:0x80a9b1,fill:0x99c4e0},
  crown:{floor:0x595352,light:0xf9cf8b,fog:0x19151e,mark:0xccb178,fill:0xb0a5c5},
};
const finite=(v,f=0)=>Number.isFinite(v)?v:f;
const actionAliases={idle:'idle',moving:'run',move:'run',approach:'run',chase:'run',light:'light',attack:'attack',thrust:'light',charged:'light',heavy:'light',counter:'light',charge:'charge',charging:'charge',block:'block',blocking:'block',parry:'block',dodge:'dodge',dodging:'dodge',hurt:'hurt',stagger:'hurt',stunned:'hurt',dead:'death',death:'death',telegraph:'telegraph',recover:'recover'};

/** Read-only view: simulation owns every collision, damage and state transition. */
export class SceneView {
  constructor(canvas,options={}) {
    this.canvas=canvas;this.options=options;this.preferredQuality=options.quality||'auto';this.quality='high';this.disposed=false;
    this.renderer=new THREE.WebGLRenderer({canvas,alpha:false,antialias:options.antialias??false,powerPreference:'high-performance'});
    const gl=this.renderer.getContext(),debug=gl.getExtension('WEBGL_debug_renderer_info');
    this.softwareRenderer=/swiftshader|llvmpipe|software/i.test(debug?gl.getParameter(debug.UNMASKED_RENDERER_WEBGL):'');
    this.budget=new RenderBudget(this.softwareRenderer);this.quality=this.preferredQuality==='low'||this.preferredQuality==='auto'&&this.softwareRenderer?'low':'high';
    this.renderer.outputColorSpace=THREE.SRGBColorSpace;this.renderer.toneMapping=THREE.ACESFilmicToneMapping;this.renderer.toneMappingExposure=1.22;
    this.renderer.shadowMap.enabled=this.quality!=='low';this.renderer.shadowMap.type=THREE.PCFSoftShadowMap;
    this.scene=new THREE.Scene();this.scene.background=new THREE.Color(0x111a20);this.scene.fog=new THREE.FogExp2(0x111a20,.014);
    this.camera=new THREE.OrthographicCamera(-15,15,10,-10,.1,100);this.camera.position.set(0,23,22);
    this.focus=new THREE.Vector3();this.camera.lookAt(0,0,0);this.raycaster=new THREE.Raycaster();this.ground=new THREE.Plane(new THREE.Vector3(0,1,0),0);
    this.warningCue=new WarningCueView(this.renderer,this.scene,this.camera); // 同一主renderer的私有提交receipt，不增加畫面或pass。
    this.cameraShake={age:.18,duration:.18,strength:0,offset:new THREE.Vector3()};
    this.assetErrors=new Set();this.kit=createKit(THREE,{simpleLighting:this.softwareRenderer,simpleGeometry:this.softwareRenderer,textureBaseUrl:new URL('./assets/textures/',import.meta.url),onTextureError:file=>this.handleTextureError(file)});this.actors=new Map();this.actorList=[];this.actorBatches=new Map();this.batchList=[];this.warningGroups=new Map();this.warningGeometryCache=new Map();this.projectileGroups=new Map();this.effectGroups=new Map();this.extraGeometries=[];this.extraMaterials=[];
    this.actorGeometryCache=new Map();this.propGeometryCache=new Map();this.roomRoot=new THREE.Group();this.roomRoot.name='room-visuals';this.scene.add(this.roomRoot);this.decorationRoot=new THREE.Group();this.decorationRoot.name='room-theme-decoration';this.scene.add(this.decorationRoot);this.obstacles=[];this.roomSignature='';this.frames=new NumericRing(720);this.renderTimes=new NumericRing(720);this.projectPoint=new THREE.Vector3();this.playerPoint=new THREE.Vector3();this.healthBacks=[];this.actorPool=new Map();this.motionClock=new Float64Array(1);this.frameCount=0;this.lastPlayerPosition=new THREE.Vector2();
    this.ambient=new THREE.HemisphereLight(0xb6d3e4,0x24222a,2.5);this.scene.add(this.ambient);
    this.sun=new THREE.DirectionalLight(0xffd4a1,3.1);this.sun.position.set(-7,16,-6);this.sun.castShadow=true;
    Object.assign(this.sun.shadow.camera,{left:-15,right:15,top:15,bottom:-15,near:.5,far:45});this.sun.shadow.bias=-.0004;this.sun.shadow.normalBias=.035;this.sun.shadow.mapSize.set(1024,1024);this.scene.add(this.sun);
    const rim=new THREE.DirectionalLight(0x7ca3b6,1.6);rim.position.set(5,7,9);this.scene.add(rim);
    this.lanternLight=new THREE.PointLight(0xff8038,4,12,2);this.lanternLight.position.set(0,3,-7);this.scene.add(this.lanternLight);
    this.staticRoot=new THREE.Group();this.scene.add(this.staticRoot);this.buildEnvironment();
    if(this.softwareRenderer){this.bakeStatic(this.staticRoot);this.rigidStream=new RigidBatch(THREE);this.scene.add(this.rigidStream.mesh);}
    this.playerMarker=this.makeRing(.68,.77,0xd7c28d,.85);this.playerMarker.rotation.x=-Math.PI/2;this.playerMarker.position.y=.035;this.scene.add(this.playerMarker);
    this.facingMarker=new THREE.Mesh(this.ownGeometry(new THREE.ConeGeometry(.12,.35,3)),this.ownMaterial(new THREE.MeshBasicMaterial({color:0xf2d5a4,depthTest:false})));this.facingMarker.rotation.x=Math.PI/2;this.facingMarker.renderOrder=21;this.scene.add(this.facingMarker);
    // 圖形context切換只清呈現receipt，恢復後必等下一個主render。
    this.onContextLost=e=>{e.preventDefault();this.contextLost=true;this.warningCue.invalidate();options.onCueClear?.();options.onContextLost?.();};this.onContextRestored=()=>{this.contextLost=false;this.warningCue.invalidate();options.onCueClear?.();options.onContextRestored?.();}; // 僅新增公開提示的清除、版位或單教學呈現接線；原玩法流程不變。
    canvas.addEventListener('webglcontextlost',this.onContextLost);canvas.addEventListener('webglcontextrestored',this.onContextRestored);
    this.objectiveMarkers=[];this.hazardActor={id:'objective-hazard',state:'idle',attack:null};
    for(let i=0;i<2;i++){const group=new THREE.Group(),ring=this.makeRing(1.38,1.6,0x94d9d3,.8),core=new THREE.Mesh(this.ownGeometry(new THREE.OctahedronGeometry(.5)),this.ownMaterial(new THREE.MeshBasicMaterial({color:0xffd39b,wireframe:true})));ring.rotation.x=-Math.PI/2;core.position.y=.8;group.add(ring,core);this.scene.add(group);this.objectiveMarkers.push({group,ring,core});}
    // Initialize each finite model and its declared animation bindings once before play.
    // Every warmed rig is the same bounded pool later borrowed by real encounters.
    if(this.rigidStream)this.rigidStream.mesh.visible=false;
    for(const room of [...ROOMS,BOSS_ROOM]){this.buildRoom(room);this.renderer.render(this.scene,this.camera);}
    for(const type of ['infantry','lancer','arbalest','cinderbug','shieldguard','crown','bellwarden']){const count=type==='crown'||type==='bellwarden'?1:4;for(let i=0;i<count;i++){const actor=this.createActor('warm-'+i,type);for(const action of Object.values(actor.actions)){action.reset().play();actor.mixer.update(1/60);actor.mixer.stopAllAction();}}if(!this.softwareRenderer)this.updateActorBatches();for(let i=0;i<count;i++)this.removeActor('warm-'+i);}
    this.buildRoom(ROOMS[0]);
    if(this.rigidStream)this.rigidStream.mesh.visible=false;
    // These shared shapes are otherwise first uploaded by a real bolt and enemy damage.
    // Warm only the two combat-owned shapes, then detach without disposing them.
    const warmBolt=new THREE.Mesh(this.boltGeometry,this.boltMaterial),warmHealth=new THREE.Mesh(this.healthGeometry,this.healthBackMaterial);
    warmBolt.frustumCulled=false;warmHealth.frustumCulled=false;this.scene.add(warmBolt,warmHealth);
    this.renderer.render(this.scene,this.camera);this.scene.remove(warmBolt,warmHealth);
    this.resizeObserver=typeof ResizeObserver!=='undefined'?new ResizeObserver(()=>this.resize()):null;this.resizeObserver?.observe(canvas);this.setQuality(this.preferredQuality); // 初次由品質套用帶一次resize，原觀察器仍保留。
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
    const cacheKey=id+':'+low;let batches=this.propGeometryCache.get(cacheKey);
    if(!batches){
      const template=this.kit.makeProp(id,low);template.updateMatrixWorld(true);const materials=new Map();
      template.traverse(node=>{if(!node.isMesh)return;const key=node.material.uuid;if(!materials.has(key))materials.set(key,{material:node.material,parts:[]});materials.get(key).parts.push({geometry:node.geometry,matrix:node.matrixWorld.clone()});});
      batches=[...materials.values()].map(batch=>({material:batch.material,geometry:this.ownGeometry(mergePropGeometry(THREE,batch.parts))}));this.propGeometryCache.set(cacheKey,batches);
    }
    const group=new THREE.Group();group.name='instanced-'+id+(low?'-low':'');const placement=new THREE.Matrix4();
    for(const batch of batches){const mesh=new THREE.InstancedMesh(batch.geometry,batch.material,positions.length);let i=0;for(const p of positions){placement.makeRotationY(p[3]||0);placement.setPosition(p[0],p[1],p[2]);mesh.setMatrixAt(i++,placement);}mesh.castShadow=true;mesh.receiveShadow=true;group.add(mesh);}return group;
  }
  simpleMaterial(options){
    if(!this.softwareRenderer)return new THREE.MeshStandardMaterial(options);
    const {metalness,roughness,...simple}=options;return new THREE.MeshLambertMaterial(simple);
  }
  bakeStatic(root){
    // Water and other translucent layers retain blending and their own material.
    const translucent=[];root.traverse(n=>{if(n.isMesh&&n.material.transparent)translucent.push(n);});
    for(const mesh of translucent){root.attach(mesh);root.remove(mesh);}
    const parts=collectMeshParts(THREE,root);if(!parts.length){if(translucent.length)root.add(...translucent);return;}
    const geometry=bakeColorGeometry(THREE,parts),material=this.staticColorMaterial||(this.staticColorMaterial=this.ownMaterial(new THREE.MeshBasicMaterial({vertexColors:true})));
    root.traverse(n=>{if(n.isInstancedMesh)n.dispose();});root.clear();const mesh=new THREE.Mesh(geometry,material);root.add(mesh,...translucent);root.userData.bakedGeometry=geometry;
  }
  makeRing(inner,outer,color,opacity=1){const m=new THREE.Mesh(this.ownGeometry(new THREE.RingGeometry(inner,outer,64)),this.ownMaterial(new THREE.MeshBasicMaterial({color,transparent:opacity<1,opacity,side:THREE.DoubleSide,forceSinglePass:true,depthWrite:false})));m.renderOrder=2;return m;}
  buildEnvironment() {
    const floorGeo=this.kit.makeProp('floor-tile').children[0].geometry;
    const floorMat=this.ownMaterial(this.softwareRenderer?new THREE.MeshBasicMaterial({map:this.kit.materials.stone.map,color:0x606766}):this.kit.materials.stone.clone());floorMat.color.set(0x606766);
    this.floor=new THREE.InstancedMesh(floorGeo,floorMat,121);this.floor.name='instanced-basalt-floor';this.floor.receiveShadow=true;
    const dummy=new THREE.Object3D(),color=new THREE.Color();let n=0;
    for(let x=-5;x<=5;x++)for(let z=-5;z<=5;z++){dummy.position.set(x*2,-.14+Math.sin(x*7+z*11)*.012,z*2);dummy.rotation.y=((x+z)%2)*Math.PI/2;dummy.scale.set(1.96,.18,1.96);dummy.updateMatrix();this.floor.setMatrixAt(n,dummy.matrix);const shade=.82+((x*13+z*7+101)%11)*.028;color.setRGB(shade,shade,shade);this.floor.setColorAt(n++,color);}
    this.scene.add(this.floor);
    const base=new THREE.Mesh(this.ownGeometry(new THREE.BoxGeometry(23.2,.9,23.2)),this.ownMaterial(this.simpleMaterial({color:0x202c31,roughness:.91})));base.position.y=-.65;base.receiveShadow=true;this.staticRoot.add(base);
    for(const radius of [6.2,6.32,9.6]){const ring=this.makeRing(radius,radius+.035,0xa59870,.3);ring.rotation.x=-Math.PI/2;ring.position.y=-.035;this.scene.add(ring);}
    const compassMaterial=this.ownMaterial(this.simpleMaterial({color:0xa49166,metalness:.6,roughness:.72}));
    for(let i=0;i<8;i++){const a=i*Math.PI/4;const bar=new THREE.Mesh(this.ownGeometry(new THREE.BoxGeometry(.045,.012,i%2?1:1.65)),compassMaterial);bar.position.set(Math.sin(a)*7.65,-.035,Math.cos(a)*7.65);bar.rotation.y=a;this.staticRoot.add(bar);}
    const wallPositions=[];for(let i=-5;i<=5;i++)for(const z of [-11,11]){if(z===11&&Math.abs(i)<1)continue;wallPositions.push([i*2,-.15,z,0]);}for(let i=-5;i<=5;i++)for(const x of [-11,11])wallPositions.push([x,-.15,i*2,Math.PI/2]);this.staticRoot.add(this.instanceProp('wall',wallPositions));
    // The distant colonnade has a real low-poly LOD, never a billboard replacement.
    const pillarPositions=[-10.5,-7,-3.5,3.5,7,10.5].map(x=>[x,0,-10.5]);const columnLOD=new THREE.LOD();columnLOD.name='colonnade-lod';columnLOD.addLevel(this.instanceProp('pillar',pillarPositions),0);columnLOD.addLevel(this.instanceProp('pillar',pillarPositions,true),42);this.staticRoot.add(columnLOD);this.colonnades=[columnLOD];
    const candlePositions=[];for(const x of [-8,8])for(const z of [-8,0,8])candlePositions.push([x,0,z]);this.candleProps=this.instanceProp('candelabrum',candlePositions);this.staticRoot.add(this.candleProps);
    for(const x of [-8.5,8.5]){const b=this.instanceProp('banner',[[0,0,0]]);b.position.set(x,0,-9.3);this.staticRoot.add(b);}
    this.altar=this.instanceProp('altar',[[0,0,0]]);this.altar.position.set(0,0,-9.15);this.staticRoot.add(this.altar);
    const dustGeo=this.ownGeometry(new THREE.OctahedronGeometry(.035,0));const dustMat=this.ownMaterial(new THREE.MeshBasicMaterial({color:0xc99563,transparent:true,opacity:.42}));this.dust=new THREE.InstancedMesh(dustGeo,dustMat,38);this.dust.name='instanced-floating-embers';this.dust.frustumCulled=false;this.scene.add(this.dust);this.dustDummy=new THREE.Object3D();
    this.sparkDummy=new THREE.Object3D();
    this.effectGeometry=this.ownGeometry(new THREE.OctahedronGeometry(.11,0));this.effectMaterial=this.ownMaterial(new THREE.MeshBasicMaterial({color:0xffbd75,transparent:true,opacity:.85}));
    this.sparkBatch=new THREE.InstancedMesh(this.effectGeometry,this.effectMaterial,196);this.sparkBatch.frustumCulled=false;this.scene.add(this.sparkBatch);
    this.boltGeometry=this.ownGeometry(new THREE.ConeGeometry(.065,.7,4));this.boltGeometry.name='shared-crossbow-bolt';this.boltMaterial=this.ownMaterial(this.simpleMaterial({color:0xffc28d,emissive:0xb54724,emissiveIntensity:.8,metalness:.5,roughness:.4}));
    this.contactGeometry=this.ownGeometry(new THREE.CircleGeometry(.6,20));this.contactMaterial=this.ownMaterial(new THREE.MeshBasicMaterial({color:0x040c10,transparent:true,opacity:.27,depthWrite:false}));
    this.healthGeometry=this.ownGeometry(new THREE.PlaneGeometry(1,1));this.healthGeometry.name='shared-actor-health-plane';this.healthBackMaterial=this.ownMaterial(new THREE.MeshBasicMaterial({color:0x071218,transparent:true,opacity:.8,depthTest:false,depthWrite:false}));this.healthFrontMaterial=this.ownMaterial(new THREE.MeshBasicMaterial({color:0xee9869,depthTest:false,depthWrite:false}));
    this.puddleGeometry=this.ownGeometry(new THREE.CylinderGeometry(1,1,.014,24));this.puddleMaterial=this.ownMaterial(this.simpleMaterial({color:0x578797,metalness:.45,roughness:.22,transparent:true,opacity:.24,depthWrite:false}));
    this.emberVeinGeometry=this.ownGeometry(new THREE.BoxGeometry(.035,.012,1));this.emberVeinMaterial=this.ownMaterial(this.simpleMaterial({color:0xa85b34,emissive:0xc64d1f,emissiveIntensity:.7,roughness:.8}));
    this.rubblePositions=[[-9.8,0,-7],[9.8,0,-5],[-9.7,0,5],[9.8,0,7],[-7,0,-10],[6,0,-10],[-6,0,10],[7,0,10]];
    this.staticRoot.add(this.instanceProp('rubble',this.rubblePositions));
  }
  buildRoom(room={},phase='combat') {
    if(this.lastRoomObject===room&&this.lastRoomRevision===(room.revision||0)&&this.lastRoomQuality===this.quality)return;this.lastRoomObject=room;this.lastRoomRevision=room.revision||0;this.lastRoomQuality=this.quality;this.roomSignature=room.id;
    for(const o of this.obstacles)for(const m of o.materials)m.dispose();this.obstacles=[];this.roomRoot.traverse(n=>{if(n.isInstancedMesh)n.dispose();});this.roomRoot.clear();this.decorationRoot.traverse(n=>{if(n.isInstancedMesh)n.dispose();});this.decorationRoot.clear();this.decorationRoot.userData.bakedGeometry?.dispose();this.decorationRoot.userData.bakedGeometry=null;
    const themeId=THEME[room.theme]?room.theme:phase==='tutorial'?'tutorial':'ash';const theme=THEME[themeId];this.floor.material.color.set(theme.floor);this.sun.color.set(theme.light);this.ambient.color.set(theme.fill);this.scene.background.set(theme.fog);this.scene.fog.color.set(theme.fog);this.lanternLight.color.set(themeId==='blue'?0x93d8ee:0xff8038);
    const obstacles=room.obstacles||[];
    for(let index=0;index<obstacles.length;index++){
      const o=obstacles[index];const group=new THREE.Group();group.name='obstacle-'+index;group.position.set(finite(o.x),0,finite(o.z));const materials=[];
      const radius=finite(o.r,.7),w=finite(o.w,radius*2),d=finite(o.d,radius*2),height=finite(o.h,o.r?1.7:.9);
      const template=this.instanceProp(o.r?'pillar':'wall',[[0,0,0]],this.quality==='low');template.scale.set(w/(o.r?1.15:2),height/(o.r?3.02:1.1),d/(o.r?1.15:.5));
      template.traverse(node=>{if(node.isMesh){node.material=node.material.clone();node.material.transparent=true;materials.push(node.material);}});group.add(template);group.userData.collisionSource=o;this.roomRoot.add(group);this.obstacles.push({group,materials,w,d,height});
    }
    this.altar.visible=true;
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
    // Perimeter silhouettes stay beyond all authoritative collision bounds.
    const id=room.id||'';
    if(/archive|reliquary/.test(id)){
      for(const x of [-10.1,10.1]){const shelves=this.instanceProp('wall',[[x,.3,-5,Math.PI/2],[x,1.35,-5,Math.PI/2],[x,.3,4,Math.PI/2],[x,1.35,4,Math.PI/2]],true);this.decorationRoot.add(shelves);}
    }else if(/forge|furnace/.test(id)){
      const forge=this.instanceProp('altar',[[0,0,-10.3]]);forge.scale.y=1.8;this.decorationRoot.add(forge);
      this.decorationRoot.add(this.instanceProp('pillar',[[-2.6,0,-10.4],[2.6,0,-10.4]],true));
    }else if(/garden/.test(id)){
      this.decorationRoot.add(this.instanceProp('altar',[[-10.3,0,-4],[10.3,0,4],[-10.3,0,4],[10.3,0,-4]]));
    }else if(/cistern|vault/.test(id)){
      this.decorationRoot.add(this.instanceProp('wall',[[-10.4,-.2,-4,Math.PI/2],[10.4,-.2,4,Math.PI/2],[-10.4,-.2,4,Math.PI/2],[10.4,-.2,-4,Math.PI/2]],true));
    }else if(/cloister|crossing/.test(id)){
      const pillars=[];for(const x of [-10.3,10.3])for(const z of [-6,-3,0,3,6])pillars.push([x,0,z]);this.decorationRoot.add(this.instanceProp('pillar',pillars,true));
      for(const x of [-10.3,10.3]){const lintels=this.instanceProp('wall',[[x,2.1,-4.5,Math.PI/2],[x,2.1,1.5,Math.PI/2]],true);this.decorationRoot.add(lintels);}
    }else if(/names|watch/.test(id))this.decorationRoot.add(this.instanceProp('banner',[[-10.1,0,-6],[10.1,0,-6],[-10.1,0,6],[10.1,0,6]]));
    if(this.softwareRenderer)this.bakeStatic(this.decorationRoot);
  }
  createActor(id,type,skin) {
    const resolved=ALIASES[type]||type||'infantry';const key=resolved+':'+skin,pool=this.actorPool.get(key);if(pool?.length){const a=pool.pop();a.id=id;a.first=true;a.current=null;a.lastAttack=null;this.actors.set(id,a);this.actorList.push(a);this.scene.add(a.health,a.contact);return a;}const model=this.kit.makeActor(resolved,{skin});model.group.position.y=.015;
    // Logical rigs feed the world-space instance matrices below. Keep them detached
    // so the renderer does not traverse and recompute their invisible meshes again.
    const mixer=new THREE.AnimationMixer(model.group),actions={};for(const clip of model.clips)actions[clip.name]=mixer.clipAction(clip);
    const health=new THREE.Group();health.name='health-meter';const back=new THREE.Mesh(this.healthGeometry,this.healthBackMaterial);back.scale.set(.75,.075,1);const front=new THREE.Mesh(this.healthGeometry,this.healthFrontMaterial);front.scale.set(.71,.037,1);front.position.z=.003;back.renderOrder=30;front.renderOrder=31;health.add(back,front);this.scene.add(health);
    const meshes=[];model.group.traverse(node=>{if(node.isMesh){meshes.push(node);node.userData.batchKey=node.geometry.uuid+node.material.uuid;node.visible=false;}});
    const contact=new THREE.Mesh(this.contactGeometry,this.contactMaterial);contact.rotation.x=-Math.PI/2;contact.position.y=.01;this.scene.add(contact);
    let bakedParts=[];
    if(this.softwareRenderer){
      const cacheKey=resolved+':'+skin;let templates=this.actorGeometryCache.get(cacheKey);
      model.group.updateMatrixWorld(true);
      if(!templates){
        const bones=new Map();
        for(const mesh of meshes){let bone=mesh.parent;while(bone&&!bone.isBone)bone=bone.parent;if(!bone)bone=model.group;
          if(!bones.has(bone))bones.set(bone,[]);bones.get(bone).push({geometry:mesh.geometry,material:mesh.material,matrix:bone.matrixWorld.clone().invert().multiply(mesh.matrixWorld)});
        }
        templates=[...bones].map(([bone,parts])=>({boneName:bone.name,geometry:bakeColorGeometry(THREE,parts)}));this.actorGeometryCache.set(cacheKey,templates);
      }
      bakedParts=templates.map(t=>({...t,bone:model.group.getObjectByName(t.boneName)}));
    }
    let boneCount=0;model.group.traverse(node=>{if(node.isBone)boneCount++;});const a={...model,bakedParts,contact,boneCount,id,type:resolved,skin,mixer,actions,current:null,health,healthFront:front,meshes,positionHistory:new Float64Array(2),first:true,lastAttack:null,healthHp:NaN,healthMax:NaN,facingAngle:NaN};this.actors.set(id,a);this.actorList.push(a);return a;
  }
  setActorAction(a,data,action,isPlayer){
    const prev=a.actions[a.current],next=a.actions[action]||a.actions.idle;next.reset();next.enabled=true;next.setEffectiveWeight(1);const speed=isPlayer&&action==='light'?.17/Math.max(.05,finite(data.attack?.activeStart,.095)):!isPlayer&&action==='attack'?1.8:1;next.setEffectiveTimeScale(speed);const oneShot=ONE_SHOT_ACTIONS.includes(action);next.setLoop(oneShot?THREE.LoopOnce:THREE.LoopRepeat,oneShot?1:Infinity);next.clampWhenFinished=oneShot;if(!isPlayer&&action==='attack')next.time=.17;next.play();if(prev&&prev!==next)prev.crossFadeTo(next,action==='attack'?.025:.07,false);a.current=action;
  }
  animateActor(a,data,dt,isPlayer=false){
    const x=finite(data.x),z=finite(data.z),angle=finite(data.angle),oldX=a.positionHistory[0],oldZ=a.positionHistory[1],first=a.first,translated=first||x!==oldX||z!==oldZ;
    const raw=isPlayer?data.action:data.state;let action=actionAliases[raw]||'idle';if(isPlayer&&raw==='charge'&&data.attack)action='light';if((!raw||raw==='idle')&&!first&&((x-oldX)**2+(z-oldZ)**2)>.000001)action='run';if(data.hp<=0)action='death';
    a.positionHistory[0]=x;a.positionHistory[1]=z;a.first=false;
    if(a.group.position.x!==x||a.group.position.y!==.015||a.group.position.z!==z)a.group.position.set(x,.015,z);
    // Camp presentation may override this rotation; compare the actual pose.
    if(a.group.rotation.y!==angle)a.group.rotation.y=angle;
    if(action!==a.current||isPlayer&&data.attack&&data.attack!==a.lastAttack)this.setActorAction(a,data,action,isPlayer);
    a.lastAttack=data.attack;a.mixer.update(dt);
    const contactWasVisible=a.contact.visible;a.contact.visible=this.quality==='low'&&data.hp>0;
    if(a.contact.visible&&(translated||!contactWasVisible)){a.contact.position.set(x,.01,z);a.contact.scale.setScalar(a.type==='crown'||a.type==='bellwarden'?1.6:1);}
    const dead=data.hp<=0;a.group.visible=!dead||a.actions.death.time<.8;
    const healthWasVisible=a.health.visible;
    if(isPlayer||dead)a.health.visible=false;
    else{
      const hp=finite(data.hp,1),maxHp=Math.max(1,finite(data.maxHp,1));a.health.visible=hp<maxHp;
      if(a.health.visible){
        if(translated||!healthWasVisible)a.health.position.set(x,a.type==='crown'?3.2:a.type==='bellwarden'?3:a.type==='cinderbug'?1.1:2,z);
        if(!a.health.quaternion.equals(this.camera.quaternion))a.health.quaternion.copy(this.camera.quaternion);
        if(a.healthHp!==hp||a.healthMax!==maxHp){const ratio=clamp(hp/maxHp,0,1);a.healthHp=hp;a.healthMax=maxHp;a.healthFront.scale.x=.71*ratio;a.healthFront.position.x=-.355*(1-ratio);}
      }
    }
    if(isPlayer){if(translated)this.playerMarker.position.set(x,.035,z);if(translated||a.facingAngle!==angle){a.facingAngle=angle;this.facingMarker.position.set(x+Math.sin(angle)*.93,.07,z+Math.cos(angle)*.93);this.facingMarker.rotation.z=-angle;}this.playerMarker.material.opacity=data.invuln>0?.45:.85;}
  }
  recycleActors(enemies){
    for(let i=this.actorList.length-1;i>=0;i--){const actor=this.actorList[i];if(actor.id==='player')continue;let present=false;for(let j=0;j<enemies.length;j++)if(String(enemies[j].id)===actor.id){present=true;break;}if(!present)this.removeActor(actor.id);}
  }
  removeActor(id){const a=this.actors.get(id);if(!a)return;a.mixer.stopAllAction();a.lastAttack=null;this.scene.remove(a.group,a.health,a.contact);this.actors.delete(id);const index=this.actorList.indexOf(a);if(index>=0)this.actorList.splice(index,1);const key=a.type+':'+a.skin;let pool=this.actorPool.get(key);if(!pool){pool=[];this.actorPool.set(key,pool);}if(pool.length<8)pool.push(a);else a.mixer.uncacheRoot(a.group);}
  updateActorBatches(){
    if(this.rigidStream){this.rigidStream.update(this.actorList);return;}
    for(const batch of this.batchList)batch.count=0;
    for(const actor of this.actorList){
      if(!actor.group.visible)continue;actor.group.updateMatrixWorld(true);
      for(const part of actor.meshes){
        const key=part.userData.batchKey;let batch=this.actorBatches.get(key);
        if(!batch){const mesh=new THREE.InstancedMesh(part.geometry,part.material,512);mesh.name='animated-rigid-bone-batch';mesh.castShadow=true;mesh.receiveShadow=true;mesh.frustumCulled=false;mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);this.scene.add(mesh);batch={mesh,count:0};this.actorBatches.set(key,batch);this.batchList.push(batch);}
        if(batch.count<512)batch.mesh.setMatrixAt(batch.count++,part.matrixWorld);
      }
    }
    for(const batch of this.batchList){
      batch.mesh.count=batch.count;batch.mesh.visible=batch.count>0;
      // Only the populated prefix is drawn; keep unused capacity off the upload path.

      if(batch.count>0){uploadRange(batch.mesh.instanceMatrix,batch.count*16);}
    }
  }
  pruneWarning(w,id){if(id!=='objective-hazard'&&!this.actors.has(id)){this.scene.remove(w.group);this.releaseWarning(w);this.warningGroups.delete(id);}}
  pruneProjectile(obj,id){if(obj.userData.stamp!==this.liveStamp){this.scene.remove(obj);this.projectileGroups.delete(id);}}
  pruneEffect(record,id){if(record.stamp!==this.liveStamp)this.effectGroups.delete(id);}
  releaseWarning(w){
    if(w.disposed)return;w.group.visible=false;w.attackRef=null;w.cueKind='none';const entry=this.warningGeometryCache?.get(w.signature);
    if(w.sharedGeometries&&entry?.geometries===w.geometries&&entry.pool.length<4)entry.pool.push(w);else this.disposeWarning(w);
  }
  clearWarningGeometryCache(){
    if(!this.warningGeometryCache?.size||this.warningGroups.size)return;
    for(const entry of this.warningGeometryCache.values()){for(const record of entry.pool)this.disposeWarning(record);entry.pool.length=0;for(const geometry of entry.geometries)geometry.dispose();}this.warningGeometryCache.clear();
  }
  disposeWarning(w){if(w.disposed)return;w.disposed=true;w.group.traverse(n=>{if(n.isInstancedMesh)n.dispose();});if(!w.sharedGeometries)w.geometries.forEach(g=>g.dispose());w.material.dispose();w.tickMaterial?.dispose();w.outlineMaterial.dispose();w.attackRef=null;}
  getWarningGeometry(shape,range,width,radius,angle,inner,signature){
    const cache=this.warningGeometryCache||(this.warningGeometryCache=new Map());let entry=cache.get(signature);if(entry)return entry;
    // Templates are created only for actual attacks, bounded, and released at camp.
    if(cache.size>=64)for(const [key,value]of cache){let used=false;for(const warning of this.warningGroups.values())if(warning.signature===key){used=true;break;}if(!used){for(const record of value.pool)this.disposeWarning(record);value.pool.length=0;for(const g of value.geometries)g.dispose();cache.delete(key);break;}}
    let geometry;
    if(shape==='line'){geometry=new THREE.PlaneGeometry(width,range);geometry.rotateX(-Math.PI/2);geometry.translate(0,0,range*.5);}
    else if(shape==='cone'){const outline=new THREE.Shape();outline.moveTo(0,0);for(let i=0;i<=32;i++){const a=-angle/2+i/32*angle;outline.lineTo(Math.sin(a)*range,-Math.cos(a)*range);}outline.closePath();geometry=new THREE.ShapeGeometry(outline);geometry.rotateX(-Math.PI/2);}
    else{geometry=new THREE.RingGeometry(shape==='ring'?Math.max(0,inner):.02,radius,64);geometry.rotateX(-Math.PI/2);}
    entry={geometries:[geometry,new THREE.EdgesGeometry(geometry,45),new THREE.BoxGeometry(.08,.015,.22)],shared:cache.size<64,pool:[]};if(entry.shared)cache.set(signature,entry);return entry;
  }
  createWarningRecord(id,shape,range,width,radius,angle,inner,signature,cueEligible){
    const template=this.getWarningGeometry(shape,range,width,radius,angle,inner,signature);if(template.pool.length){const record=template.pool.pop();record.group.name='attack-warning-'+id;record.group.visible=true;this.scene.add(record.group);this.warningGroups.set(id,record);if(cueEligible&&record.cue===undefined)this.warningCue.attach(record,...record.group.children);return record;}const [geometry,outlineGeometry,tickGeometry]=template.geometries,group=new THREE.Group();group.name='attack-warning-'+id;
    const material=new THREE.MeshBasicMaterial({color:0xec8858,transparent:true,opacity:.27,depthWrite:false,depthTest:false,side:THREE.DoubleSide,forceSinglePass:true}),fill=new THREE.Mesh(geometry,material);fill.renderOrder=10;group.add(fill);
    const outline=new THREE.LineSegments(outlineGeometry,new THREE.LineBasicMaterial({color:0xffc99c,transparent:true,opacity:.75,depthTest:false,depthWrite:false}));outline.renderOrder=11;group.add(outline);
    const tickMaterial=material.clone(),tick=new THREE.InstancedMesh(tickGeometry,tickMaterial,shape==='line'?6:16),dummy=new THREE.Object3D();
    for(let i=0;i<tick.count;i++){if(shape==='line'){dummy.position.set((i%2?1:-1)*width*.44,.02,range*(.2+Math.floor(i/2)*.27));dummy.rotation.y=0;}else{const a=shape==='cone'?(-angle/2+i/15*angle):i/16*Math.PI*2;dummy.position.set(Math.sin(a)*(shape==='cone'?range:radius)*.92,.02,Math.cos(a)*(shape==='cone'?range:radius)*.92);dummy.rotation.y=a;}dummy.updateMatrix();tick.setMatrixAt(i,dummy.matrix);}tick.renderOrder=12;group.add(tick);this.scene.add(group);
    const record={group,geometries:template.geometries,sharedGeometries:template.shared,material,tickMaterial,outlineMaterial:outline.material,signature,shape,attackRef:null,cueKind:'none',cue:undefined,disposed:false};this.warningGroups.set(id,record);if(cueEligible)this.warningCue.attach(record,fill,outline,tick);return record;
  }
  warning(enemy,cueEligible=false){
    const attack=enemy.attack,visible=enemy.state==='telegraph'||enemy.state==='attack',id=String(enemy.id);let record=this.warningGroups.get(id);
    if(!attack||!visible){if(record){record.group.visible=false;record.cueKind='none';record.attackRef=null;}return;}
    if(!record||record.attackRef!==attack){
      const shape=attack.shape||'circle',range=finite(attack.range,finite(attack.radius,3)),width=finite(attack.width,1),radius=finite(attack.radius,range),angle=finite(attack.angle,Math.PI/3),inner=finite(attack.innerRadius,radius*.6),signature=shape+':'+range+':'+width+':'+radius+':'+angle+':'+inner;
      if(!record||record.signature!==signature){if(record){this.scene.remove(record.group);this.releaseWarning(record);}record=this.createWarningRecord(id,shape,range,width,radius,angle,inner,signature,cueEligible);}
    }
    if(cueEligible&&record.cue===undefined)this.warningCue.attach(record,...record.group.children);
    record.attackRef=attack;record.cueKind=enemy.state==='attack'?'strike':'windup';record.group.visible=true;record.group.position.set(finite(attack.x,finite(enemy.x)),.045,finite(attack.z,finite(enemy.z)));record.group.rotation.y=finite(attack.heading,finite(enemy.angle));record.material.opacity=enemy.state==='attack'?.46:.22+.08*Math.sin((this.motionClock?.[0]??this.elapsed)*12);record.material.color.set(enemy.state==='attack'?0xffb377:0xe77c50);record.tickMaterial.opacity=record.material.opacity;record.tickMaterial.color.copy(record.material.color);
  }
  createEffectRecord(effect,shakeEnabled){if(shakeEnabled)this.queueCameraShake(effect.type);const record={start:Math.max(.05,finite(effect.life,.4)),stamp:0};this.effectGroups.set(effect.id,record);return record;}
  updatePresentation(state,stamp,shakeEnabled){
    const settings=state.settings||EMPTY_SETTINGS;
    const objective=state.objective;
    for(let i=0;i<2;i++){const m=this.objectiveMarkers[i],t=objective?.targets[i];m.group.visible=!!t&&state.phase==='combat';if(t){m.group.position.set(t.x,.06,t.z);m.core.rotation.y=objective.kind==='seals'?Math.PI/4:0;m.core.scale.setScalar(t.done?.35:1);m.core.position.y=t.done?.2:.8;m.ring.material.color.set(t.done?0x94d9d3:0xffd39b);m.ring.scale.setScalar(objective.kind==='beacons'?.4+.6*t.progress/objective.chargeRequired:.75);}}
    this.hazardActor.state=state.phase==='combat'?(objective?.phase||'idle'):'idle';this.hazardActor.attack=objective?.attack;if(this.hazardActor.attack)this.warning(this.hazardActor);else {const w=this.warningGroups.get('objective-hazard');if(w){this.scene.remove(w.group);this.releaseWarning(w);this.warningGroups.delete('objective-hazard');}}
    this.warningGroups.forEach(this.pruneWarning,this);if(state.phase==='camp')this.clearWarningGeometryCache();
    for(let bi=0;bi<(state.projectiles?.length||0);bi++){const b=state.projectiles[bi];const id=b.id;let obj=this.projectileGroups.get(id);if(!obj){obj=new THREE.Mesh(this.boltGeometry,this.boltMaterial);obj.name='physical-crossbow-bolt';this.scene.add(obj);this.projectileGroups.set(id,obj);}obj.userData.stamp=stamp;obj.position.set(finite(b.x),.68,finite(b.z));obj.rotation.set(Math.PI/2,0,-finite(b.angle));}
    this.projectileGroups.forEach(this.pruneProjectile,this);
    let sparkCount=0;const effects=state.effects;
    for(let ei=Math.max(0,(effects?.length||0)-28);ei<(effects?.length||0);ei++){const e=effects[ei];const id=e.id;let record=this.effectGroups.get(id);if(!record)record=this.createEffectRecord(e,shakeEnabled);record.stamp=stamp;const t=clamp(1-finite(e.life,0)/record.start,0,1);
      if(settings.flash!==false)for(let i=0;i<7;i++){const a=i/7*Math.PI*2,d=this.sparkDummy;d.position.set(finite(e.x)+Math.sin(a)*t*.8,.38+t*.7,finite(e.z)+Math.cos(a)*t*.8);d.scale.setScalar((1-t)*.85);d.rotation.set(i+t*3,t*2,i);d.updateMatrix();this.sparkBatch.setMatrixAt(sparkCount++,d.matrix);}
    }
    this.effectGroups.forEach(this.pruneEffect,this);
    this.sparkBatch.count=sparkCount;this.sparkBatch.visible=sparkCount>0;if(sparkCount){uploadRange(this.sparkBatch.instanceMatrix,sparkCount*16);}
  }
  updateSceneMotion(state,p,settings,dt,shakeEnabled){
    const camp=state.phase==='camp',tracking=this.aspect<1?.35:.12,targetX=camp&&this.aspect>=1?finite(p.x)-3.9:clamp(finite(p.x)*tracking,-3.4,3.4),targetZ=camp&&this.aspect>=1?finite(p.z)-.6:clamp(finite(p.z)*tracking,-3.2,3.2);const smooth=settings.reducedMotion?1:1-Math.exp(-dt*5);this.focus.x+=(targetX-this.focus.x)*smooth;this.focus.z+=(targetZ-this.focus.z)*smooth;const zoom=camp&&this.aspect>=1?2.7:this.aspect>=1?1.18:1;this.camera.zoom+=(zoom-this.camera.zoom)*smooth;this.camera.updateProjectionMatrix();
    this.updateCameraShake(dt,shakeEnabled);const shake=this.cameraShake.offset;
    const cameraY=this.camera.position.y+((camp&&this.aspect>=1?14:23)-this.camera.position.y)*smooth;this.camera.position.set(this.focus.x+shake.x,cameraY,this.focus.z+22+shake.z);this.camera.lookAt(this.focus.x+shake.x,0,this.focus.z+shake.z);this.camera.updateMatrixWorld();
    const playerPoint=this.playerPoint.set(finite(p.x),.9,finite(p.z)).project(this.camera);
    for(let oi=0;oi<this.obstacles.length;oi++){const o=this.obstacles[oi];const point=this.projectPoint.copy(o.group.position);point.y=o.height*.55;point.project(this.camera);const occluded=o.group.position.z>finite(p.z)-.3&&Math.abs(point.x-playerPoint.x)<.07+o.w/28&&Math.abs(point.y-playerPoint.y)<.09+o.height/20;const alpha=occluded?.24:1;for(let mi=0;mi<o.materials.length;mi++){const m=o.materials[mi];m.opacity+=(alpha-m.opacity)*Math.min(1,dt*12);m.depthWrite=m.opacity>.97;}}
    const dustCount=this.quality==='low'?10:38;this.dust.count=dustCount;for(let i=0;i<dustCount;i++){const t=settings.reducedMotion?0:this.motionClock[0];this.dustDummy.position.set(Math.sin(i*5.31)*10+Math.sin(t*.25+i)*.3,((t*.18+i*.39)%4)+.3,Math.cos(i*8.77)*10);this.dustDummy.rotation.set(i+t*.2,i,i);this.dustDummy.scale.setScalar(.5+(i%4)*.3);this.dustDummy.updateMatrix();this.dust.setMatrixAt(i,this.dustDummy.matrix);}this.dust.instanceMatrix.needsUpdate=true;
  }
  render(state={},dt=1/60,cueEnabled=false) { // 第三參數只控制普通提示，不改step或輸入。
    this.warningCue.invalidate(); // 每幀立即丟棄前次receipt，不能跨幀追認。
    if(this.disposed||this.contextLost)return null;const start=performance.now();const rawDt=finite(dt,1/60);dt=clamp(rawDt,0,.1);this.motionClock[0]+=dt;const settings=state.settings||{};const shakeEnabled=settings.shake===true&&!settings.reducedMotion&&!state.paused&&rawDt>0&&ACTIVE_PHASES.includes(state.phase);if(settings.quality&&settings.quality!==this.preferredQuality)this.setQuality(settings.quality); // 僅新增公開提示的清除、版位或單教學呈現接線；原玩法流程不變。
    this.buildRoom(state.room,state.phase);
    const p=state.player||{x:0,z:3,angle:Math.PI,hp:100,maxHp:100};let player=this.actors.get('player');if(player&&player.skin!==p.skin){this.removeActor('player');player=null;}if(!player)player=this.createActor('player','guardian',p.skin);this.animateActor(player,p,dt,true);if(state.phase==='camp')player.group.rotation.y=-.42;
    // Return the outgoing wave before borrowing its replacements. Dead authoritative
    // actors stay until the rules remove them, preserving their death animation.
    const enemies=state.enemies||EMPTY_ARRAY;
    this.recycleActors(enemies);this.warningGroups.forEach(this.pruneWarning,this);
    const stamp=++this.liveStamp|| (this.liveStamp=1);player.stamp=stamp;for(let enemyIndex=0;enemyIndex<enemies.length;enemyIndex++){const e=enemies[enemyIndex];const id=String(e.id);let a=this.actors.get(id);const type=ALIASES[e.type]||e.type||'infantry';if(a&&a.type!==type){this.removeActor(id);a=null;}if(!a)a=this.createActor(id,type);a.stamp=stamp;this.animateActor(a,e,dt);this.warning(e,state.phase==='tutorial'&&state.enemies.length===1);} // 僅新增公開提示的清除、版位或單教學呈現接線；原玩法流程不變。
    this.updatePresentation(state,stamp,shakeEnabled);
    this.updateSceneMotion(state,p,settings,dt,shakeEnabled);
    this.updateActorBatches();const cueRecord=state.phase==='tutorial'&&state.enemies?.length===1?this.warningGroups.get(String(state.enemies[0].id)):null; // 僅單教學警示，ID不離開view。
    const cueToken=this.warningCue.begin(cueRecord,cueEnabled);let cue=null; // token只涵蓋下一個主render呼叫。
    try{this.renderer.render(this.scene,this.camera);if(cueToken){for(let i=0;i<this.actorList.length;i++)this.healthBacks[i]=this.actorList[i].health.children[0];this.healthBacks.length=this.actorList.length;cue=this.warningCue.finish(cueToken,this.healthBacks);}}finally{this.warningCue.invalidate();} // renderer錯誤照原路拋出，只有helper計算降級。
    const renderMs=performance.now()-start;this.frames.push(rawDt*1000);this.renderTimes.push(renderMs);this.frameCount++;return cue; // 返回只讀呈現候選，非GPU像素證明。
  }
  recordFrame(ms){if(this.budget.record(ms))this.resize();}
  resize(){ // 只去除重複畫布尺寸提交，不改原清cue或投影。
    this.warningCue?.invalidate();this.options.onCueClear?.();if(this.disposed)return; // 原失效與生命週期順序保持。
    const bounds=this.canvas.getBoundingClientRect();const w=Math.max(1,Math.floor(bounds.width||this.canvas.clientWidth||640)),h=Math.max(1,Math.floor(bounds.height||this.canvas.clientHeight||360));this.aspect=w/h; // 保留原CSS測量、fallback與整數化。
    const ceiling=this.quality==='low'?960:1600;
    const ratio=Math.min(globalThis.devicePixelRatio||1,this.quality==='low'?1:1.5,ceiling/w)*this.budget.scale,prior=this.appliedViewport; // 與原品質像素上限完全相同。
    const changed=!prior||prior.w!==w||prior.h!==h||prior.ratio!==ratio||this.canvas.width!==Math.floor(w*ratio)||this.canvas.height!==Math.floor(h*ratio); // 不只信快取，外部尺寸改動仍需修復。
    if(changed)this.renderer.setDrawingBufferSize(w,h,ratio); // 固定Three一次更新logicalsize、ratio、canvas與viewport，原兩路亦皆不寫CSSstyle。
    const half=this.aspect<1?8.7/this.aspect:12;this.camera.left=-half*this.aspect;this.camera.right=half*this.aspect;this.camera.top=half;this.camera.bottom=-half;this.camera.updateProjectionMatrix(); // 即使不提交尺寸也保留原投影更新。
    if(changed)this.appliedViewport={w,h,ratio}; // 包含投影在內全部成功才記；錯誤照拋，無假成功。
  } // 下一次合法resize可再嘗試，不保證瀏覽器或GPU已完成繪圖。
  screenToGround(clientX,clientY){const b=this.canvas.getBoundingClientRect();const mouse=new THREE.Vector2((clientX-b.left)/Math.max(1,b.width)*2-1,-(clientY-b.top)/Math.max(1,b.height)*2+1);this.raycaster.setFromCamera(mouse,this.camera);const hit=new THREE.Vector3();if(this.raycaster.ray.intersectPlane(this.ground,hit))return{x:hit.x,z:hit.z};return{x:0,z:0};}
  setQuality(quality){ // 首次與真正品質改變才套既有陰影與LOD。
    if(this.disposed)return;this.preferredQuality=quality;const next=quality==='low'||quality==='auto'&&this.softwareRenderer?'low':'high';if(this.appliedQuality===next)return; // 初次sentinel未設，不會漏套constructor已有的quality。
    this.appliedQuality=undefined;this.quality=next;this.renderer.shadowMap.enabled=this.quality==='high';this.sun.castShadow=this.quality==='high';this.sun.shadow.mapSize.set(this.quality==='high'?1024:512,this.quality==='high'?1024:512); // 開始轉換先失效舊成功marker，避免半途throw後請求舊品質被誤略；陰影值不變。
    for(const lod of this.colonnades||[]){lod.autoUpdate=this.quality!=='low';lod.levels.forEach((l,i)=>l.object.visible=this.quality==='low'?i===1:i===0);} // 保原兩級遠景可見性。
    this.resize();this.appliedQuality=next; // resize與投影全成功才記；throw後只允下次合法setQuality重試，不聲稱render會自動重入。
  } // 不重建房間、不改畫面動畫或simulation。
  metrics(){
    const frameStats=this.frames.summary(),submitStats=this.renderTimes.summary();let instances=0,activeBones=0;this.scene.traverse(node=>{if(node.isInstancedMesh&&node.visible)instances++;});for(let i=0;i<this.actorList.length;i++)activeBones+=this.actorList[i].boneCount;
    const textureBytes=this.kit.shared.textures.reduce((n,t)=>n+(t.image?.width||0)*(t.image?.height||0)*4*(t.generateMipmaps?4/3:1),0),shadow=this.sun.shadow.map;
    return{engine:'three@0.180.0',kitVersion:KIT_VERSION,quality:this.quality,frameSamples:this.frames.length,frameP95Ms:frameStats.p95===null?null:Number(frameStats.p95.toFixed(2)),frameAvgMs:frameStats.length?Number(frameStats.mean.toFixed(2)):null,renderScale:this.budget.scale,softwareRenderer:this.softwareRenderer,renderSubmitP95Ms:submitStats.p95===null?null:Number(submitStats.p95.toFixed(2)),drawCalls:this.renderer.info.render.calls,triangles:this.renderer.info.render.triangles,geometries:this.renderer.info.memory.geometries,textures:this.renderer.info.memory.textures,textureMemoryBytes:Math.round(textureBytes),renderTargetColorMemoryBytes:shadow?shadow.width*shadow.height*4:0,memoryIsEstimate:true,activeRigs:this.actors.size,activeBones,pointLights:1,directionalLights:2,shadowMaps:this.quality==='high'?1:0,shadowResolution:this.quality==='high'?1024:0,transparentEffects:this.effectGroups.size,warningTemplates:this.warningGeometryCache.size,pooledWarnings:[...this.warningGeometryCache.values()].reduce((n,e)=>n+e.pool.length,0),instancedMeshes:instances,contextLost:!!this.contextLost,drawingBuffer:[this.canvas.width,this.canvas.height],rendererInfo:this.renderer.getContext().getParameter(this.renderer.getContext().RENDERER)};
  }
  dispose(){this.warningCue.invalidate();this.options.onCueClear?.();if(this.disposed)return;this.disposed=true;this.resizeObserver?.disconnect();this.canvas.removeEventListener('webglcontextlost',this.onContextLost);this.canvas.removeEventListener('webglcontextrestored',this.onContextRestored);for(const id of [...this.actors.keys()])this.removeActor(id);for(const w of this.warningGroups.values())this.disposeWarning(w);this.warningGroups.clear();this.clearWarningGeometryCache();for(const o of this.obstacles)for(const m of o.materials)m.dispose();this.scene.traverse(n=>{if(n.isInstancedMesh)n.dispose();});this.extraGeometries.forEach(g=>g.dispose());this.extraMaterials.forEach(m=>m.dispose());this.staticRoot.userData.bakedGeometry?.dispose();this.decorationRoot.userData.bakedGeometry?.dispose();for(const parts of this.actorGeometryCache.values())parts.forEach(p=>p.geometry.dispose());this.rigidStream?.dispose();this.kit.dispose();this.scene.clear();this.renderer.dispose();this.actorPool.clear();this.healthBacks.length=0;} // 僅新增公開提示的清除、版位或單教學呈現接線；原玩法流程不變。
}
