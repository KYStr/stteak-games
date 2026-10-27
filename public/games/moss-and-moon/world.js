import * as THREE from './vendor/three.module.js';
import { createPlant, createCharacter, createDecoration, createHouse, createTree, createRock, createTool, createTerrain, createDiscovery } from './models.js';
import { PLANTS, RESIDENTS, DISCOVERIES, REGIONS, PUZZLES } from './content.js'; // 場景入口依真內容存在性判斷，不以所有非garden區都可採集／解謎。
import { growthPreview } from './rules.js';

const TILE=1.08;
export const tilePosition=i=>new THREE.Vector3((i%8-3.5)*TILE,0,(Math.floor(i/8)-3.5)*TILE);
const mat=(color,roughness=.9)=>new THREE.MeshStandardMaterial({color,roughness,flatShading:true});
export function createWorld(canvas, callbacks){
 const renderer=new THREE.WebGLRenderer({canvas,antialias:true,alpha:false,powerPreference:'high-performance'});
 renderer.setPixelRatio(Math.min(devicePixelRatio,1.5)); renderer.shadowMap.enabled=true; renderer.shadowMap.type=THREE.PCFSoftShadowMap;
 renderer.outputColorSpace=THREE.SRGBColorSpace; renderer.toneMapping=THREE.ACESFilmicToneMapping; renderer.toneMappingExposure=1.3;
 const scene=new THREE.Scene();scene.background=new THREE.Color('#203f3c');scene.fog=new THREE.Fog('#203f3c',30,65);
 const camera=new THREE.OrthographicCamera(-12,12,9,-9,.1,100);let cameraTurn=0,zoom=1,view='garden',state=null,enabled=false,reduced=false;
 const ambient=new THREE.HemisphereLight('#d7eaf2','#4f6444',2.4);scene.add(ambient);
 const sun=new THREE.DirectionalLight('#fff1ca',3);sun.position.set(-9,15,8);sun.castShadow=true;sun.shadow.mapSize.set(1024,1024);sun.shadow.camera.left=-14;sun.shadow.camera.right=14;sun.shadow.camera.top=14;sun.shadow.camera.bottom=-14;sun.shadow.bias=-.0005;sun.shadow.normalBias=.035;scene.add(sun);
 const moon=new THREE.DirectionalLight('#89b5dd',1.5);moon.position.set(8,10,-10);scene.add(moon);
 const environment=new THREE.Group(),objects=new THREE.Group(),flora=new THREE.Group(),people=new THREE.Group();scene.add(environment,objects,flora,people);
 const interactables=[],labels=[],obstacles=[],mixers=[],regionOwned=[],foliage=[],cutaways=[],cutawayMaterials=[];let plantBatches=[],selection=-1,actionTime=0,actionName='idle',preview=null;
 const soilMat=mat('#796d4c'),wetMat=mat('#435a4b'),rimMat=mat('#83936a');
 const baseGeo=new THREE.BoxGeometry(TILE-.08,.13,TILE-.08),tileInstances=new THREE.InstancedMesh(baseGeo,soilMat,64);tileInstances.receiveShadow=true;tileInstances.userData.kind='tile';
 const wetInstances=new THREE.InstancedMesh(new THREE.CircleGeometry(.12,12),mat('#80bbbd'),64);wetInstances.count=0;
 const selectionMesh=new THREE.Mesh(new THREE.BoxGeometry(TILE,.035,TILE),new THREE.MeshBasicMaterial({color:'#eff4bb',transparent:true,opacity:.55,depthWrite:false}));selectionMesh.position.y=.09;selectionMesh.visible=false;scene.add(selectionMesh);
 const player=createCharacter(0);player.position.set(0,0,5);scene.add(player);let playerMixer=new THREE.AnimationMixer(player);let playerActions={};for(const clip of player.animations||[])playerActions[clip.name]=playerMixer.clipAction(clip);playerActions.idle?.play();
 const tool=createTool('watering-can');tool.visible=false;player.add(tool);tool.position.set(.5,.55,.2);tool.scale.setScalar(.55);
 let target=null,arrival=null,path=[],celebrating=0,celebrationPositions=[];const keys=new Set();const frames=[];let frameCount=0,last=performance.now(),running=true,frameRequest=0; // 保存排程識別碼，讓銷毀能立即取消尚未執行的畫面。
 const starsGeo=new THREE.BufferGeometry(),points=[];for(let i=0;i<80;i++){const a=i*2.399;points.push(Math.cos(a)*(4+i%11),1+(i%7)*.48,Math.sin(a)*(4+i%11));}starsGeo.setAttribute('position',new THREE.Float32BufferAttribute(points,3));
 const fireflies=new THREE.Points(starsGeo,new THREE.PointsMaterial({size:.045,color:'#e9e7aa',transparent:true,opacity:.65,depthWrite:false}));scene.add(fireflies);
 const moonDisc=new THREE.Mesh(new THREE.SphereGeometry(1.2,24,16),new THREE.MeshBasicMaterial({color:'#dbe4c2'}));moonDisc.position.set(-11,12,-14);scene.add(moonDisc);
 const floorGeo=new THREE.CylinderGeometry(10.4,9.6,.7,64),floorMat=mat('#70856a');const island=new THREE.Mesh(floorGeo,floorMat);island.position.y=-.49;island.receiveShadow=true;environment.add(island);
 const underside=new THREE.Mesh(new THREE.CylinderGeometry(9.7,7.5,2,24),mat('#334e47'));underside.position.y=-1.7;environment.add(underside);
 function addMesh(geometry,material,x,y,z,parent=environment){const m=new THREE.Mesh(geometry,material);m.position.set(x,y,z);m.castShadow=true;m.receiveShadow=true;parent.add(m);return m;}
 const pathMat=mat('#b6b396');for(let i=0;i<12;i++){addMesh(new THREE.CylinderGeometry(.42,.46,.05,7),pathMat,Math.sin(i*.7)*.18,-.07,4.75+i*.38);}
 for(let i=0;i<28;i++){const a=i/28*Math.PI*2,r=9.25+(i%3)*.15;const tree=createTree(['oak','pine','birch'][i%3]);tree.position.set(Math.cos(a)*r,-.1,Math.sin(a)*r);tree.scale.setScalar(.8+(i%4)*.16);tree.traverse(c=>{if(c.isMesh)c.material=c.material.clone();});environment.add(tree);foliage.push(tree);}
 for(let i=0;i<18;i++){const a=i*2.4;const r=8.5+(i%3)*.3,rock=createRock();rock.position.set(Math.cos(a)*r,-.1,Math.sin(a)*r);rock.scale.setScalar(.35+(i%3)*.12);rock.rotation.y=a;environment.add(rock);}
 const smallGrass=new THREE.InstancedMesh(new THREE.ConeGeometry(.07,.3,4),mat('#93ac71'),180),dummy=new THREE.Object3D();for(let i=0;i<180;i++){const a=i*2.399,r=5.7+(i%17)*.19;dummy.position.set(Math.cos(a)*r,.02,Math.sin(a)*r);dummy.rotation.z=Math.sin(i)*.3;dummy.updateMatrix();smallGrass.setMatrixAt(i,dummy.matrix);}environment.add(smallGrass);
 function label(text,obj,height=1.8){const el=document.createElement('span');el.className='world-label';el.textContent=text;document.querySelector('#labels').append(el);labels.push({obj,el,height});}
 function clickable(obj,data){obj.userData.interaction=data;obj.traverse(c=>{if(c.isMesh)c.userData.root=obj;});interactables.push(obj);objects.add(obj);return obj;}
 function clearBatches(){for(const mesh of plantBatches)mesh.dispose();plantBatches=[];flora.clear();}
 function clearPreview(){if(!preview)return;preview.traverse(c=>{if(c.isMesh)c.material.dispose();});scene.remove(preview);preview=null;}
 function clearRegion(){clearPreview();for(const l of labels)l.el.remove();labels.length=0;interactables.length=0;obstacles.length=0;for(const m of mixers){m.stopAllAction();m.uncacheRoot(m.getRoot());}mixers.length=0;objects.traverse(c=>{if(c.isSkinnedMesh)c.skeleton.dispose();});for(const obj of regionOwned){obj.geometry.dispose();obj.material.dispose();}for(const material of cutawayMaterials)material.dispose();cutawayMaterials.length=0;cutaways.length=0;regionOwned.length=0;objects.clear();people.clear();clearBatches();tileInstances.removeFromParent();wetInstances.removeFromParent();target=null;arrival=null;path=[];selection=-1;selectionMesh.visible=false;}
 function makeRegion(region){clearRegion();view=region;player.position.set(0,0,5);floorMat.color.set(region==='garden'?'#70856a':region==='brook'?'#6b9290':region==='ridge'?'#6f7a8c':'#647d58');
  if(region==='garden'){
   objects.add(tileInstances,wetInstances);for(let i=0;i<64;i++){dummy.position.copy(tilePosition(i));dummy.position.y=-.05;dummy.rotation.set(0,0,0);dummy.scale.set(1,1,1);dummy.updateMatrix();tileInstances.setMatrixAt(i,dummy.matrix);}tileInstances.instanceMatrix.needsUpdate=true;interactables.push(tileInstances);
   const border=new THREE.Mesh(new THREE.BoxGeometry(9,.13,9),rimMat.clone());border.position.y=-.17;objects.add(border);regionOwned.push(border);
   const house=createHouse();house.position.set(-6,-.1,-4.9);house.rotation.y=.28;house.traverse(c=>{if(c.isMesh){c.material=c.material.clone();cutawayMaterials.push(c.material);}});cutaways.push(house);clickable(house,{kind:'house'});obstacles.push({x:-6,z:-4.9,r:1.6});label('⌂ 小屋 · 睡個好覺',house,2.8);
   const table=createDecoration('table');table.position.set(6,0,-4.8);clickable(table,{kind:'shop'});label('◈ 森林小舖',table,1.8);
   const positions=[[-5.8,-1.3],[5.9,-1.3],[-5.8,2.2],[5.9,2.2],[-3.3,6.1],[3.3,6.1]];
   RESIDENTS.forEach((r,i)=>{const person=createCharacter(i+1);person.position.set(positions[i][0],0,positions[i][1]);person.rotation.y=Math.atan2(-positions[i][0],-positions[i][1]);clickable(person,{kind:'resident',id:r.id});const m=new THREE.AnimationMixer(person);m.clipAction(person.animations?.find(c=>c.name==='idle')||new THREE.AnimationClip('idle',1,[])).play();mixers.push(m);label(r.name,person,1.7);obstacles.push({x:positions[i][0],z:positions[i][1],r:.35});});
   const water=addMesh(new THREE.CylinderGeometry(1.1,1.05,.08,32),new THREE.MeshStandardMaterial({color:'#78b5bd',roughness:.25,metalness:.1}),6.8,-.03,5,objects);label('露水小池',water,.4);regionOwned.push(water);
  }else{
   const terrain=createTerrain(region==='ridge'?'hill':region);terrain.position.set(0,-.08,0);objects.add(terrain);
   const discoveries=DISCOVERIES.filter(d=>d.region===region||d.regionId===region);
   discoveries.forEach((d,i)=>{const obj=createDiscovery(d.id),x=[-3.7,2.9,-2.5,3.9][i%4],z=[-2.8,-2.5,2.2,2.6][i%4];obj.position.set(x,0,z);obj.scale.setScalar(1.5);clickable(obj,{kind:'discovery',id:d.id});label(d.name,obj,1.5);});
   if(REGIONS.some(r=>r.id===region)){const basket=createDecoration('planter');basket.position.set(0,0,-3.5);clickable(basket,{kind:'gather',region});label('♧ 採集今日贈禮',basket,1.2);} // cottage沒有今日贈禮，三個合法採集區仍保留真籃子入口。
   if(PUZZLES.some(p=>p.region===region)){const puzzle=createDecoration('moonstand');puzzle.position.set(0,0,1);clickable(puzzle,{kind:'puzzle',region});label('✧ 森林的小謎題',puzzle,1.5);} // 只呈現資料表有定義的三個謎題物件，consumer另有缺項fallback。
   const gate=createDecoration('arch');gate.position.set(0,0,6.3);clickable(gate,{kind:'return'});label('回到庭園',gate,2);
  }updateCamera();
 }
 function sync(next){state=next;const region=next.region||'garden';if(view!==region||objects.children.length===0)makeRegion(region);reduced=!!next.settings?.reducedMotion;fireflies.visible=!reduced;const low=next.settings?.quality==='low';renderer.setPixelRatio(low?1:Math.min(devicePixelRatio,1.5));renderer.shadowMap.enabled=!low;sun.castShadow=!low; // Update light-state shader variants as well as shadow submissions.
  if(view==='garden'){
   clearBatches();const groups=new Map();let wet=0;
   state.grid.forEach((cell,i)=>{if(!cell)return;const p=tilePosition(i);let obj=cell.type==='plant'?createPlant(cell.id,growthPreview(state,i).stage):createDecoration(cell.id);obj.position.copy(p);obj.rotation.y=(cell.rotation||0)*Math.PI/2;obj.updateMatrixWorld(true);
    obj.traverse(mesh=>{if(!mesh.isMesh)return;const key=mesh.geometry.uuid+':'+mesh.material.uuid;let group=groups.get(key);if(!group){group={geometry:mesh.geometry,material:mesh.material,matrices:[]};groups.set(key,group);}group.matrices.push(mesh.matrixWorld.clone());});
    if(cell.type==='plant'&&cell.watered){dummy.position.copy(p);dummy.position.x+=.34;dummy.position.z+=.34;dummy.position.y=.04;dummy.rotation.set(-Math.PI/2,0,0);dummy.updateMatrix();wetInstances.setMatrixAt(wet++,dummy.matrix);}
   });
   for(const g of groups.values()){const batch=new THREE.InstancedMesh(g.geometry,g.material,g.matrices.length);g.matrices.forEach((m,i)=>batch.setMatrixAt(i,m));batch.castShadow=true;batch.receiveShadow=true;flora.add(batch);plantBatches.push(batch);}wetInstances.count=wet;wetInstances.instanceMatrix.needsUpdate=true;
  }
 }
 function select(i){selection=i;selectionMesh.visible=view==='garden'&&i>=0;if(i>=0){selectionMesh.position.copy(tilePosition(i));selectionMesh.position.y=.075;}callbacks.select?.(i);}
 function canPlace(index){if(index<0||index>=64)return false;const p=tilePosition(index);return Math.abs(player.position.x-p.x)>.68||Math.abs(player.position.z-p.z)>.68;}
 function blocked(x,z){if(Math.hypot(x,z)>8.7)return true;for(const o of obstacles)if(Math.hypot(x-o.x,z-o.z)<o.r+.18)return true;if(view==='garden'&&state)for(let i=0;i<64;i++){if(state.grid[i]?.type!=='decor')continue;const p=tilePosition(i);if(Math.abs(x-p.x)<.58&&Math.abs(z-p.z)<.58)return true;}return false;}
 function animate(name,duration=.7){actionName=name;actionTime=duration;for(const [n,a] of Object.entries(playerActions))if(n!==name)a.stop();(playerActions[name]||playerActions.idle)?.reset().play();tool.visible=name==='water';}
 function activate(i){select(i);animate(callbacks.tool?.()||'plant');callbacks.tile?.(i);}
 function moveTo(x,z,done){
  // A bounded A* grid routes around furniture; movement never depends on teleporting through it.
  const spacing=.45,min=-8.1,size=37,toNode=v=>Math.max(0,Math.min(size-1,Math.round((v-min)/spacing))),toWorld=n=>min+n*spacing;
  const start=[toNode(player.position.x),toNode(player.position.z)],end=[toNode(x),toNode(z)],key=(a,b)=>a+','+b;
  const open=[{x:start[0],z:start[1],g:0,f:0}],cost=new Map([[key(...start),0]]),parents=new Map();let found=null,nodes=0;
  while(open.length&&nodes++<1500){open.sort((a,b)=>a.f-b.f);const n=open.shift();if(Math.hypot(n.x-end[0],n.z-end[1])<=1){found=n;break;}for(const [dx,dz] of [[1,0],[-1,0],[0,1],[0,-1]]){let nx=n.x+dx,nz=n.z+dz;if(nx<0||nz<0||nx>=size||nz>=size||blocked(toWorld(nx),toWorld(nz)))continue;const k=key(nx,nz),g=n.g+1;if(g>=(cost.get(k)??Infinity))continue;cost.set(k,g);parents.set(k,n);open.push({x:nx,z:nz,g,f:g+Math.hypot(nx-end[0],nz-end[1])});}}
  if(!found){callbacks.notice?.('這條路暫時過不去。可以從外圍走道繞行。');return;}
  const route=[];let n=found;while(n&&!(n.x===start[0]&&n.z===start[1])){route.unshift(new THREE.Vector3(toWorld(n.x),0,toWorld(n.z)));n=parents.get(key(n.x,n.z));}path=route;arrival=done;target=path.shift()||null;if(!target){arrival?.();arrival=null;}
 }
 const raycaster=new THREE.Raycaster(),pointer=new THREE.Vector2();let pointerDown=null;
 const labelPoint=new THREE.Vector3();let labelCameraRevision=0,labelWidth=0,labelHeight=0;
 function updateLabels(){
  if(labelWidth<=0||labelHeight<=0)return;
  for(const label of labels){
   const {obj,el,height}=label,p=obj.position,previous=label.projection;
   if(previous&&previous.revision===labelCameraRevision&&previous.x===p.x&&previous.y===p.y&&previous.z===p.z&&previous.height===height)continue;
   labelPoint.copy(p);labelPoint.y+=height;labelPoint.project(camera);
   const left=(labelPoint.x*.5+.5)*labelWidth+'px',top=(-labelPoint.y*.5+.5)*labelHeight+'px',display=labelPoint.z<1?'':'none';
   if(!previous||previous.left!==left)el.style.left=left;
   if(!previous||previous.top!==top)el.style.top=top;
   if(!previous||previous.display!==display)el.style.display=display;
   label.projection={revision:labelCameraRevision,x:p.x,y:p.y,z:p.z,height,left,top,display};
  }
 }
 function pointerdown(e){pointerDown={x:e.clientX,y:e.clientY,time:performance.now()};canvas.focus({preventScroll:true});} // 保留函式身分，銷毀時能解除畫布事件。
 function pointerup(e){if(!enabled||!pointerDown||Math.hypot(e.clientX-pointerDown.x,e.clientY-pointerDown.y)>12)return;const rect=canvas.getBoundingClientRect();pointer.set((e.clientX-rect.left)/rect.width*2-1,-(e.clientY-rect.top)/rect.height*2+1);raycaster.setFromCamera(pointer,camera);const hits=raycaster.intersectObjects(interactables,true); // 具名處理函式保持原本命中判定。
  if(hits.length){const tileHit=hits.find(h=>h.object===tileInstances),hit=hits[0].object.userData.root?.userData.cutaway&&tileHit?tileHit:hits[0];if(hit.object===tileInstances){select(hit.instanceId);activate(hit.instanceId);return;}const root=hit.object.userData.root;const interaction=root?.userData.interaction||hit.object.userData.interaction;if(interaction){animate('harvest');callbacks.interact?.(interaction);return;}}
  const p=new THREE.Vector3();if(raycaster.ray.intersectPlane(new THREE.Plane(new THREE.Vector3(0,1,0),0),p))moveTo(p.x,p.z);
 } // 結束具名放開處理，保留既有點選與尋路行為。
 canvas.addEventListener('pointerdown',pointerdown);canvas.addEventListener('pointerup',pointerup); // 以可解除的具名處理函式註冊畫布輸入。
 function interact(){if(!enabled)return;if(view==='garden'){let nearest=-1,distance=Infinity;for(let i=0;i<64;i++){let d=player.position.distanceTo(tilePosition(i));if(d<distance){nearest=i;distance=d;}}if(distance<1.7){activate(nearest);return;}}let near=null,dist=Infinity;for(const obj of interactables){if(!obj.userData.interaction)continue;const d=player.position.distanceTo(obj.position);if(d<dist){near=obj;dist=d;}}if(near&&dist<2.5){animate('harvest');callbacks.interact?.(near.userData.interaction);}else callbacks.notice?.('走近田地或居民後按 E；也可直接點選物件。');}
 function keydown(e){if(!enabled||e.target.closest('dialog,input,select,textarea'))return;const k=e.key.toLowerCase();if(['w','a','s','d','arrowup','arrowleft','arrowdown','arrowright','e','q','r','1','2','3','4'].includes(k)){e.preventDefault();if(k==='e'&&!e.repeat)interact();else if(k==='q'&&!e.repeat)rotate(-1);else if(k==='r'&&!e.repeat)rotate(1);else if('1234'.includes(k))callbacks.chooseTool?.(['plant','water','harvest','decorate'][+k-1]);else keys.add(k);}}
 function keyup(e){keys.delete(e.key.toLowerCase());} // 以同一函式身分解除按鍵放開事件。
 function blur(){keys.clear();} // 保留失焦清除按鍵的既有行為。
 addEventListener('keydown',keydown);addEventListener('keyup',keyup);addEventListener('blur',blur); // 所有全域輸入皆能在銷毀時成對解除。
 function updateCamera(){const width=canvas.clientWidth,height=canvas.clientHeight,aspect=width/height,span=(height<450?15:aspect<.8?9.2:12.8)*zoom,halfHeight=span/aspect,topReserve=height<450?50:width<600?190:80,bottomReserve=height<450?145:width<600?250:205,offset=(topReserve-bottomReserve)/height*halfHeight;camera.left=-span;camera.right=span;camera.top=halfHeight+offset;camera.bottom=-halfHeight+offset;const angle=Math.PI/4+cameraTurn*Math.PI/2;camera.position.set(Math.sin(angle)*20,22,Math.cos(angle)*20);camera.lookAt(0,0,0);camera.updateProjectionMatrix();camera.updateMatrixWorld(true);labelWidth=width;labelHeight=height;labelCameraRevision++;for(const tree of foliage){const foreground=tree.position.x*Math.sin(angle)+tree.position.z*Math.cos(angle)>4;tree.traverse(c=>{if(c.isMesh){c.material.opacity=foreground?.22:1;c.material.transparent=foreground;c.material.depthWrite=!foreground;}});}for(const obj of cutaways){const foreground=obj.position.x*Math.sin(angle)+obj.position.z*Math.cos(angle)>1.5;obj.userData.cutaway=foreground;obj.traverse(c=>{if(c.isMesh){c.material.opacity=foreground?.16:1;c.material.transparent=foreground;c.material.depthWrite=!foreground;}});}}
 function rotate(direction){cameraTurn=(cameraTurn+direction+4)%4;updateCamera();callbacks.camera?.(cameraTurn);}
 function endCelebration(){celebrating=0;for(const {obj,position,rotation} of celebrationPositions){obj.position.copy(position);obj.rotation.copy(rotation);}celebrationPositions=[];for(const m of mixers){m.stopAllAction();const clip=m.getRoot().animations?.find(c=>c.name==='idle');if(clip)m.clipAction(clip).play();}sun.intensity=3;moon.intensity=1.5;fireflies.material.size=.045;}
 function celebrate(){endCelebration();celebrating=16;animate('celebrate',16);const crowd=[player,...mixers.map(m=>m.getRoot())];crowd.forEach((obj,i)=>{celebrationPositions.push({obj,position:obj.position.clone(),rotation:obj.rotation.clone()});obj.position.set((i-3)*.85,0,5.3+Math.sin(i*.5)*.55);obj.rotation.y=.6;});for(const m of mixers){m.stopAllAction();const clip=m.getRoot().animations?.find(c=>c.name==='interact');if(clip)m.clipAction(clip).reset().play();}sun.intensity=1.5;moon.intensity=3;fireflies.material.size=.09;}
 function resize(){renderer.setSize(canvas.clientWidth,canvas.clientHeight,false);updateCamera();}const ro=new ResizeObserver(resize);ro.observe(canvas);resize();
 function frame(now){if(!running)return;frameRequest=requestAnimationFrame(frame);const dt=Math.min((now-last)/1000,.05);if(enabled&&now-last<1000){frames.push(now-last);if(frames.length>7200)frames.shift();}last=now; // 保存下一畫面排程，其餘動畫更新規則不變。
  if(enabled||celebrating>0){if(celebrating>0){celebrating-=dt;if(celebrating<=0)endCelebration();}let dx=0,dz=0;if(keys.has('w')||keys.has('arrowup'))dz--;if(keys.has('s')||keys.has('arrowdown'))dz++;if(keys.has('a')||keys.has('arrowleft'))dx--;if(keys.has('d')||keys.has('arrowright'))dx++;let moving=false;
   if(dx||dz){target=null;path=[];arrival=null;const angle=Math.PI/4+cameraTurn*Math.PI/2,v=new THREE.Vector3(dx,0,dz).normalize();v.applyAxisAngle(new THREE.Vector3(0,1,0),angle);const nx=player.position.x+v.x*dt*3,nz=player.position.z+v.z*dt*3;if(!blocked(nx,player.position.z))player.position.x=nx;if(!blocked(player.position.x,nz))player.position.z=nz;player.rotation.y=Math.atan2(v.x,v.z);moving=true;}
   else if(target){const v=target.clone().sub(player.position);if(v.length()<.12){target=path.shift()||null;if(!target){arrival?.();arrival=null;}}else{v.normalize();const nx=player.position.x+v.x*dt*3,nz=player.position.z+v.z*dt*3;if(!blocked(nx,nz)){player.position.set(nx,0,nz);player.rotation.y=Math.atan2(v.x,v.z);moving=true;}else{target=null;path=[];arrival=null;}}}
   if(actionTime>0)actionTime-=dt;else{tool.visible=false;const name=moving?'walk':'idle';if(actionName!==name){for(const a of Object.values(playerActions))a.stop();playerActions[name]?.reset().play();actionName=name;}}
   playerMixer.update(dt);for(const m of mixers)m.update(dt);if(!reduced){fireflies.rotation.y+=dt*.025;fireflies.material.opacity=.5+Math.sin(now*.0007)*.15;}
  }
  updateLabels();
  renderer.render(scene,camera);frameCount++;
 }
 frameRequest=requestAnimationFrame(frame); // 保存第一個排程，避免尚未繪製就銷毀時保留閉包。
 return {sync,select,canPlace,interact,rotate,celebrate,endCelebration,clearPreview,preview(id,index,rotation){clearPreview();if(index<0||state.grid[index]||!canPlace(index))return;preview=createDecoration(id);preview.position.copy(tilePosition(index));preview.rotation.y=rotation*Math.PI/2;preview.traverse(c=>{if(c.isMesh){c.material=c.material.clone();c.material.transparent=true;c.material.opacity=.65;c.material.depthWrite=false;}});scene.add(preview);},zoom(delta){zoom=THREE.MathUtils.clamp(zoom+delta*.12,.45,1.5);updateCamera();},setEnabled(value){enabled=value;keys.clear();if(!value){target=null;path=[];arrival=null;}},move(direction,down){const key={up:'w',down:'s',left:'a',right:'d'}[direction];down?keys.add(key):keys.delete(key);},animate,metrics(){const sorted=[...frames].sort((a,b)=>a-b);return {frames:frames.length,p50:sorted[Math.floor(sorted.length*.5)]||0,p95:sorted[Math.floor(sorted.length*.95)]||0,drawCalls:renderer.info.render.calls,triangles:renderer.info.render.triangles,geometries:renderer.info.memory.geometries,textures:renderer.info.memory.textures,cameraTurn,position:player.position.toArray(),dpr:renderer.getPixelRatio(),renderer:renderer.getContext().getParameter(renderer.getContext().RENDERER),three:THREE.REVISION};},dispose(){if(!running)return;running=false;enabled=false;cancelAnimationFrame(frameRequest);keys.clear();pointerDown=null;endCelebration();ro.disconnect();clearRegion();player.traverse(c=>{if(c.isSkinnedMesh)c.skeleton.dispose();});removeEventListener('keydown',keydown);removeEventListener('keyup',keyup);removeEventListener('blur',blur);canvas.removeEventListener('pointerdown',pointerdown);canvas.removeEventListener('pointerup',pointerup);renderer.dispose();},get region(){return view;}}; // 銷毀具冪等性，會清慶典錨點、輸入及排程；共用模型快取仍由模型模組擁有。
}
