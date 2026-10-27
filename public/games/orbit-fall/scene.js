import * as THREE from './vendor/three.module.js';
import {createAstronaut,animateAstronaut,createRoomKit,createDevice,setDeviceState,animateDevice} from './models.js';
import {traceOptics} from './optics.js';
import {arcPhase,debrisPosition} from './hazards.js';
import {layoutDockingMarkers,layoutClampedDockingMarkers} from './marker-layout.js'; // 近停靠pair與分離貼邊避讓分開處理，保留既有契約。
export class StationView {
  constructor(canvas,settings){
    this.canvas=canvas;this.settings=settings;this.scene=new THREE.Scene();this.scene.background=new THREE.Color('#06131f');this.scene.fog=new THREE.FogExp2('#071421',.014);
    this.renderer=new THREE.WebGLRenderer({canvas,antialias:true,powerPreference:'high-performance'});this.renderer.outputColorSpace=THREE.SRGBColorSpace;this.renderer.toneMapping=THREE.ACESFilmicToneMapping;this.renderer.toneMappingExposure=1.15;
    this.renderer.shadowMap.enabled=settings.quality!=='low';this.renderer.shadowMap.type=THREE.PCFSoftShadowMap;
    this.camera=new THREE.PerspectiveCamera(44,1,.1,300);this.camera.position.set(15,17,22);this.target=new THREE.Vector3(0,2,0);this.mode='fixed';this.yaw=0;
    this.scene.add(new THREE.HemisphereLight('#c6e9ee','#18304a',2));
    this.key=new THREE.DirectionalLight('#d1ebff',3.1);this.key.position.set(3,15,8);this.key.castShadow=true;this.key.shadow.mapSize.set(1024,1024);Object.assign(this.key.shadow.camera,{left:-12,right:12,top:12,bottom:-12,near:1,far:45});this.key.shadow.bias=-.001;this.scene.add(this.key);
    const amber=new THREE.PointLight('#ffb86d',35,30,2);amber.position.set(-6,7,-5);this.scene.add(amber);const cyan=new THREE.PointLight('#71c4d8',32,28,2);cyan.position.set(7,4,4);this.scene.add(cyan);
    const stars=new Float32Array(900);for(let i=0;i<300;i++){const a=i*2.39996,r=65+(i%17);stars[i*3]=Math.cos(a)*r;stars[i*3+1]=10+(i%31)*2;stars[i*3+2]=Math.sin(a)*r}
    const sg=new THREE.BufferGeometry();sg.setAttribute('position',new THREE.BufferAttribute(stars,3));this.scene.add(new THREE.Points(sg,new THREE.PointsMaterial({color:'#bfd3e7',size:.14,sizeAttenuation:true})));
    const planet=new THREE.Mesh(new THREE.SphereGeometry(24,40,24),new THREE.MeshStandardMaterial({color:'#253f56',roughness:.95,metalness:.1}));planet.position.set(-45,-11,-70);this.scene.add(planet);
    const ring=new THREE.Mesh(new THREE.TorusGeometry(32,.2,8,120),new THREE.MeshBasicMaterial({color:'#7a9bab'}));ring.rotation.x=1.2;ring.position.copy(planet.position);this.scene.add(ring);
    this.astronaut=createAstronaut();this.astronaut.scale.setScalar(.75);this.scene.add(this.astronaut);this.raycaster=new THREE.Raycaster();this.pointer=new THREE.Vector2();this.devices=[];this.frames=[];this.cache=new Map();this.roomGroup=null;this.beam=null;this.lastFrame=performance.now();this.resize();
    this.resizeObserver=new ResizeObserver(()=>this.resize());this.resizeObserver.observe(canvas);
    this.markerLayer=document.createElement('div');this.markerLayer.id='world-markers';canvas.parentElement.append(this.markerLayer);
    this.playerMarker=document.createElement('span');this.playerMarker.className='player-marker';this.playerMarker.textContent='▽ 你';this.markerLayer.append(this.playerMarker);
    this.altitudeLine=new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(),new THREE.Vector3()]),new THREE.LineBasicMaterial({color:'#8dc5d0',transparent:true,opacity:.5,depthTest:false}));this.scene.add(this.altitudeLine);this.labels=[];
  }
  resize(){const w=this.canvas.clientWidth,h=this.canvas.clientHeight;this.viewport={width:w,height:h};this.markerSizesDirty=true;this.renderer.setPixelRatio(Math.min(devicePixelRatio||1,this.settings.quality==='low'?1:1.6));this.renderer.setSize(w,h,false);this.camera.aspect=w/h;this.camera.updateProjectionMatrix();this.renderer.shadowMap.enabled=this.settings.quality!=='low'}
  addDevice(kind,pos,data={},state='offline'){const mesh=createDevice(kind,state);mesh.position.fromArray(pos);this.roomGroup.add(mesh);const d={kind,mesh,pos:new THREE.Vector3(...pos),...data};mesh.userData.interaction=d;this.devices.push(d);return d}
  createMarkers(){for(const l of this.labels)l.remove();this.labels=[];this.dockingMarkerOrder=0;this.dockingMarkerCenter=null;this.clampedMarkerCenters={target:null,crate:null};this.markerSizesDirty=true;for(const d of this.devices){if(d.id==='oxygen'||d.id==='light-target')continue;const el=document.createElement('span');el.className='world-marker';el.textContent=d.id==='tools'?'◆ 裝備架 · F':d.id==='exit'?'↗ 艙門':d.id==='signal'?'≋ 訊號':d.id==='crate'?'▣ 電池':d.id==='target'?'▧ 停靠接點':d.id==='ending'?'◆ 能源終端':d.id==='hazard'?(this.room.hazard==='arc'?'⚡ 電弧':this.room.hazard==='debris'?'◇ 碎片':'≋ 洩漏'):d.id.startsWith('mirror')?`鏡 ${d.index+1}`:d.id.startsWith('valve')?`閥 ${d.index+1}`:d.label;if(d.id==='crate'||d.id==='target'){const line=document.createElement('span');line.className='marker-leader';line.dataset.marker=d.id;line.hidden=true;line.setAttribute('aria-hidden','true');this.markerLayer.append(line);this.labels.push(line);d.markerLeader=line}this.markerLayer.append(el);this.labels.push(el);d.marker=el}} // 換房時同時清除貼邊避讓記憶，其他文字及leader建立方式不變。
  updateMarkers(player,puzzleState){
    const {width,height}=this.viewport;
    const hasPair=this.devices.some(d=>d.id==='target'&&d.markerLeader)&&this.devices.some(d=>d.id==='crate'&&d.markerLeader);
    // Update dynamic text before measuring. Only docking rooms need dimensions;
    // stable frames and rooms without a pair perform no layout reads.
    for(const d of this.devices)if(d.marker&&d.id.startsWith('mirror')){const text=`鏡 ${d.index+1} · ${puzzleState.angles[d.index]} / ${this.puzzle.targetAngles[d.index]}`;if(d.marker.textContent!==text){d.marker.textContent=text;this.markerSizesDirty=true}}
    if(hasPair&&this.markerSizesDirty){
      const markers=this.devices.filter(d=>d.marker),elements=[...markers.map(d=>d.marker),this.playerMarker],hidden=elements.map(el=>el.hidden);
      for(const el of elements)el.hidden=false;
      const sizes=elements.map(el=>({width:el.offsetWidth,height:el.offsetHeight}));
      markers.forEach((d,i)=>{d.markerSize=sizes[i]});this.playerMarkerSize=sizes.at(-1);
      elements.forEach((el,i)=>{el.hidden=hidden[i]});this.markerSizesDirty=false;
    }
    const project=(position,lift=0,clamped=true)=>{const screen=position.clone();screen.y+=lift;screen.project(this.camera);const x=(screen.x*.5+.5)*width,y=(-screen.y*.5+.5)*height;return {x:clamped?THREE.MathUtils.clamp(x,55,width-55):x,y:clamped?THREE.MathUtils.clamp(y,110,height-100):y,hidden:screen.z>1,edgeClamped:clamped&&(x<55||x>width-55||y<110||y>height-100)}}; // 保留原投影與hidden判定，另記錄是否真的被邊界夾住。
    const place=(element,point)=>{element.hidden=point.hidden;element.style.transform=`translate3d(${point.x}px,${point.y}px,0) translate(-50%,-100%)`};
    const playerAnchor=project(new THREE.Vector3(player.x,player.y,player.z),1.4);place(this.playerMarker,playerAnchor);
    const obstacles=hasPair?[{...playerAnchor,...this.playerMarkerSize}]:[];
    let target,crate;
    for(const d of this.devices){
      if(!d.marker)continue;
      const anchor=project(d.pos,d.id.startsWith('mirror')||d.id.startsWith('valve')?1.2:2.8);
      if(d.markerLeader){const item={device:d,...anchor,...d.markerSize};if(d.id==='target')target=item;else crate=item}else{place(d.marker,anchor);if(hasPair)obstacles.push({...anchor,...d.markerSize})}
    }
    const layout=layoutDockingMarkers(target,crate,width,this.dockingMarkerOrder,obstacles,this.dockingMarkerCenter);this.dockingMarkerOrder=layout.order;this.dockingMarkerCenter=layout.center;
    const edgeLayout=layout.order?null:layoutClampedDockingMarkers(layout.target,layout.crate,width,obstacles,this.clampedMarkerCenters); // 只有近pair已分離時才處理原P3反例，不改近pair演算法。
    this.clampedMarkerCenters=edgeLayout?.centers||{target:null,crate:null}; // 清楚分開兩種避讓記憶，近pair重新接近時不沿用舊貼邊位置。
    for(const point of [edgeLayout?.target||layout.target,edgeLayout?.crate||layout.crate])if(point){ // 使用避讓後字框，未改動的標籤仍沿用原投影。
      const d=point.device;place(d.marker,point);const endpoint=project(d.pos,0,false);d.markerLeader.hidden=!(layout.order||point.displaced)||point.hidden||endpoint.hidden; // 個別貼邊位移也必須保留指向原裝置的leader。
      if(!d.markerLeader.hidden){const dx=endpoint.x-point.x,dy=endpoint.y-point.y;d.markerLeader.style.transform=`translate3d(${point.x}px,${point.y}px,0) rotate(${Math.atan2(dy,dx)}rad) scaleX(${Math.hypot(dx,dy)})`}
    }
  }
  load(room,puzzle,run){
    if(this.beam){this.beam.parent?.remove(this.beam);this.beam.geometry.dispose();this.beam.material.dispose();this.beam=null}
    if(this.roomGroup)this.scene.remove(this.roomGroup);
    // Only one room is rendered. Cached rooms bound allocation to the authored 12-room station.
    if(this.cache.has(room.id)){const cached=this.cache.get(room.id);this.roomGroup=cached.group;this.devices=cached.devices;this.scene.add(this.roomGroup);this.room=room;this.puzzle=puzzle;this.refresh(run);this.createMarkers();return}
    this.room=room;this.puzzle=puzzle;this.roomGroup=new THREE.Group();this.devices=[];this.scene.add(this.roomGroup);
    const theme=room.type==='safe'?'airlock':room.type==='signal'?'habitat':room.deck===3?'core':'maintenance';this.roomGroup.add(createRoomKit(theme));
    const exit=this.addDevice('gate',[0,0,6.7],{id:'exit',label:'艙門 · 開啟航行圖',range:3.3},'powered');exit.mesh.traverse(o=>{if(o.isMesh){o.material=o.material.clone();o.material.transparent=true;o.material.opacity=.28;o.material.depthWrite=false}});
    if(room.type==='safe'){
      this.addDevice('oxygen',[-5,0,-3],{id:'oxygen',label:'安全補給 · 氧氣與艙服已回復',range:3},'powered');
      this.addDevice('console',[3,0,-2],{id:'tools',label:'裝備架 · 取得磁靴與牽引束',range:3},'powered');
    }
    if(room.signalId)this.addDevice('console',[-5,0,3],{id:'signal',label:'文字訊號 · F 讀取',range:3},'powered');
    if(room.endingTerminal)this.addDevice('beacon',[3,0,-3],{id:'ending',label:'能源終端 · 選擇訊號的去向',range:3.5},'powered');
    if(puzzle?.type==='momentum'){
      this.addDevice('crate',puzzle.crateStart,{id:'crate',label:'電池 · 滑鼠或牽引鍵連接',range:4.2}).mesh.scale.setScalar(.7333);
      const receiver=this.addDevice('receiver',[puzzle.target[0],puzzle.target[1]-.72,puzzle.target[2]],{id:'target',label:'低速停靠接點 · 煞車保持 1.5 秒',range:3});receiver.pos.fromArray(puzzle.target);
      const ring=new THREE.Mesh(new THREE.BoxGeometry(2.1,2.1,2.1),new THREE.MeshBasicMaterial({color:'#e8bc78',wireframe:true}));receiver.mesh.add(ring);ring.position.y=.72;
      
    }
    if(puzzle?.type==='reflection'){
      puzzle.mirrorPositions.forEach((pos,i)=>{const d=this.addDevice('mirror',[pos[0],0,pos[2]],{id:`mirror-${i}`,index:i,label:`鏡面 ${i+1} · F 旋轉刻度`,range:2.6});d.pos.fromArray(pos);const pivot=d.mesh.getObjectByName('mirror-pivot');if(pivot)pivot.position.y=pos[1];const stalk=d.mesh.getObjectByName('mirror-stalk');if(stalk){stalk.scale.y=pos[1]/1.65;stalk.position.y=pos[1]/2}const knob=d.mesh.getObjectByName('rotation-knob');if(knob)knob.position.y=pos[1];});
      const endpoint=[6,puzzle.mirrorPositions.at(-1)[1],-6];this.addDevice('receiver',[endpoint[0],endpoint[1]-.72,endpoint[2]],{id:'light-target',label:'光路接收器',range:0});
      const emitter=new THREE.Mesh(new THREE.CylinderGeometry(.25,.25,.7,12),new THREE.MeshStandardMaterial({color:'#e4b978',emissive:'#ad682a',emissiveIntensity:1}));emitter.position.set(-7,puzzle.mirrorPositions[0][1],-5);emitter.rotation.z=Math.PI/2;this.roomGroup.add(emitter);
    }
    if(puzzle?.type==='airlock')puzzle.valvePositions.forEach((pos,i)=>{const d=this.addDevice('console',[pos[0],pos[1]-1.6,pos[2]],{id:`valve-${i}`,index:i,label:`閥 ${i+1} · ${puzzle.valveLabels[i]}`,range:2.5});d.pos.fromArray(pos)});
    if(room.hazard)this.addDevice(room.hazard,room.hazard==='leak'?[7,2,-5]:room.hazard==='arc'?[0,1,-4]:[0,4,0],{id:'hazard',label:room.hazard==='arc'?'電弧 · 等待脈衝空檔':room.hazard==='debris'?'碎片 · 避開移動軌跡':'洩漏 · 遠離吸流區',range:2});
    this.cache.set(room.id,{group:this.roomGroup,devices:this.devices});this.refresh(run);this.createMarkers();
  }
  refresh(run){for(const d of this.devices)if(['target','ending','light-target'].includes(d.id)||d.id.startsWith('mirror')||d.id.startsWith('valve'))setDeviceState(d.mesh,run.solvedPuzzles.includes(this.puzzle?.id)?'powered':'offline')}
  nearest(pos){return this.devices.filter(d=>!['hazard','target','light-target'].includes(d.id)&&d.pos.distanceTo(pos)<(d.range||3)).sort((a,b)=>a.pos.distanceToSquared(pos)-b.pos.distanceToSquared(pos))[0]}
  pick(x,y){const rect=this.canvas.getBoundingClientRect();this.pointer.set((x-rect.left)/rect.width*2-1,-(y-rect.top)/rect.height*2+1);this.raycaster.setFromCamera(this.pointer,this.camera);const hits=this.raycaster.intersectObjects(this.devices.map(d=>d.mesh),true);for(const hit of hits){let p=hit.object;while(p){if(p.userData.interaction)return p.userData.interaction;p=p.parent}}return null}
  update(physics,run,puzzleState,time,dt,input){
    const p=physics.player.translation(),v=physics.player.linvel();this.astronaut.position.set(p.x,p.y,p.z);const moving=Math.hypot(v.x,v.z)>.15;if(moving)this.astronaut.rotation.y=Math.atan2(v.x,v.z);
    animateAstronaut(this.astronaut,run.status==='failed'?'damaged':physics.anchored?'anchored':input.brake?'brake':input.thrusting?'thrust':'idle',time,run.paused?0:dt);
    const crate=this.devices.find(d=>d.id==='crate');if(crate&&physics.crate){const c=physics.crate.translation();crate.mesh.position.set(c.x,c.y-.5133,c.z);crate.pos.set(c.x,c.y,c.z)}
    const optics=this.puzzle?.type==='reflection'?traceOptics(this.puzzle,puzzleState.angles):null;
    for(const d of this.devices){if(d.id==='hazard'&&this.room.hazard==='arc')setDeviceState(d.mesh,arcPhase(time)==='active'?'danger':arcPhase(time)==='warning'?'ready':'offline');animateDevice(d.mesh,this.settings.reducedMotion?0:time);if(d.id.startsWith('mirror')){const pivot=d.mesh.getObjectByName('mirror-pivot');if(pivot&&optics?.normals[d.index]){const n=new THREE.Vector3(...optics.normals[d.index]);pivot.quaternion.setFromUnitVectors(new THREE.Vector3(0,0,1),n);pivot.position.set(-n.x*.12,this.puzzle.mirrorPositions[d.index][1]-n.y*.12,-n.z*.12);}}if(d.id==='hazard'&&this.room.hazard==='debris')d.mesh.position.fromArray(debrisPosition(time))}
    const points=[];
    if(physics.tethered&&physics.crate){const c=physics.crate.translation();points.push(new THREE.Vector3(p.x,p.y,p.z),new THREE.Vector3(c.x,c.y,c.z))}
    else if(this.puzzle?.type==='reflection'){
      points.push(...optics.path.map(p=>new THREE.Vector3(...p)));
    }
    if(!this.beam){const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.BufferAttribute(new Float32Array(18),3));this.beam=new THREE.Line(g,new THREE.LineBasicMaterial({color:'#ffc078',transparent:true,opacity:.95}));this.beam.frustumCulled=false;this.roomGroup.add(this.beam)}this.beam.visible=points.length>0;if(points.length){const a=this.beam.geometry.attributes.position;points.forEach((p,i)=>a.setXYZ(i,p.x,p.y,p.z));a.needsUpdate=true;this.beam.geometry.setDrawRange(0,points.length);this.beam.material.color.set(physics.tethered?'#83d4e4':'#ffc078')}
    let goal,look;
    if(this.mode==='fixed'){const narrow=this.camera.aspect<.85;goal=new THREE.Vector3(narrow?22:15,narrow?25:17,narrow?32:22);look=new THREE.Vector3(0,2.5,0)}
    else {goal=new THREE.Vector3(p.x+Math.sin(this.yaw)*7,p.y+4,p.z+Math.cos(this.yaw)*7);goal.x=THREE.MathUtils.clamp(goal.x,-8,8);goal.y=Math.min(goal.y,7.7);goal.z=THREE.MathUtils.clamp(goal.z,-7.7,12);look=new THREE.Vector3(p.x,p.y,p.z)}
    const blend=this.settings.reducedMotion?1:1-Math.exp(-dt*6);this.camera.position.lerp(goal,blend);this.target.lerp(look,blend);this.camera.lookAt(this.target);
    this.camera.updateMatrixWorld();this.updateMarkers(p,puzzleState);
    const altitude=this.altitudeLine.geometry.attributes.position;altitude.setXYZ(0,p.x,.05,p.z);altitude.setXYZ(1,p.x,p.y,p.z);altitude.needsUpdate=true;this.altitudeLine.frustumCulled=false;
    this.renderer.render(this.scene,this.camera);
  }
  dispose(){this.resizeObserver.disconnect();this.markerLayer.remove();const gs=new Set(),ms=new Set(),ts=new Set();const collect=g=>g.traverse(o=>{if(o.geometry)gs.add(o.geometry);for(const m of Array.isArray(o.material)?o.material:o.material?[o.material]:[]){ms.add(m);for(const v of Object.values(m))if(v?.isTexture)ts.add(v)}});collect(this.scene);for(const c of this.cache.values())collect(c.group);for(const t of ts)t.dispose();for(const m of ms)m.dispose();for(const g of gs)g.dispose();this.cache.clear();this.renderer.dispose()}
  telemetry(){if(!this.gpu){const gl=this.renderer.getContext(),ext=gl.getExtension('WEBGL_debug_renderer_info');this.gpu={vendor:ext?gl.getParameter(ext.UNMASKED_VENDOR_WEBGL):gl.getParameter(gl.VENDOR),renderer:ext?gl.getParameter(ext.UNMASKED_RENDERER_WEBGL):gl.getParameter(gl.RENDERER)}}return {gpu:this.gpu,drawCalls:this.renderer.info.render.calls,triangles:this.renderer.info.render.triangles,geometries:this.renderer.info.memory.geometries,textures:this.renderer.info.memory.textures,quality:this.settings.quality,dpr:this.renderer.getPixelRatio(),camera:this.mode}}
}
