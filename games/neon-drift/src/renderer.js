import {createAutoQuality} from './quality.js';
import {resolveTrackTheme,DISTRICT_LOD} from './presentation.js'; // 資料主題與資產配方共用契約，原場景佈局不變。
import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import { EDGE_SHADER as FXAAShader } from './edge-shader.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { TRACKS, COLORS, sampleTrack,sampleTrackInto } from './content.js';
import { makeVehicle, VEHICLE_SPECS } from '../../../assets/games/neon-drift/sources/models.js';

const PALETTE={mint:0x21e6ce,cyan:0x26dff4,coral:0xff5677,red:0xff5677,violet:0xa283ff,purple:0xa283ff,gold:0xffc45b,yellow:0xffc45b,white:0xe5edf5,blue:0x409dff,orange:0xff8e4b};
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const temp=new THREE.Object3D();

// With +Y up / +Z forward, chase-view screen-right is the road's negative
// lateral axis. The chevron tip is placed toward the actual heading change;
// the camera projection then agrees with the approaching driver's view.
export function roadChevronDirection(curvature){const turn=Math.sign(curvature)||1;return {outside:-turn,upperRotation:turn*.65,lowerRotation:-turn*.65};}
export function ghostVehicleId(pose){return pose&&Object.hasOwn(VEHICLE_SPECS,pose.carId)?pose.carId:null;}

export function createRenderer(canvas,initialOptions={}){
  const autoQuality=createAutoQuality();
  let options={quality:'auto',speedFov:true,reducedMotion:false,...initialOptions};
  const renderer=new THREE.WebGLRenderer({canvas,antialias:false,alpha:false,powerPreference:'high-performance'});
  renderer.info.autoReset=false;
  const edgeTarget=new THREE.WebGLRenderTarget(1,1,{depthBuffer:true});edgeTarget.texture.colorSpace=THREE.SRGBColorSpace;
  const edgeMaterial=new THREE.ShaderMaterial({uniforms:THREE.UniformsUtils.clone(FXAAShader.uniforms),vertexShader:FXAAShader.vertexShader,fragmentShader:FXAAShader.fragmentShader,depthTest:false,depthWrite:false});
  edgeMaterial.uniforms.tDiffuse.value=edgeTarget.texture;
  const edgeScene=new THREE.Scene(),edgeCamera=new THREE.OrthographicCamera(-1,1,1,-1,0,1);
  const edgeQuad=new THREE.Mesh(new THREE.PlaneGeometry(2,2),edgeMaterial);edgeScene.add(edgeQuad);
  const gl=renderer.getContext();
  const adapterInfo=gl.getExtension('WEBGL_debug_renderer_info');const adapter=adapterInfo?gl.getParameter(adapterInfo.UNMASKED_RENDERER_WEBGL):null;
  const software=/swiftshader|llvmpipe|software/i.test(adapter||'');
  const profilingEnabled=initialOptions.profilingEnabled===true;
  const gpuTimer=profilingEnabled?gl.getExtension('EXT_disjoint_timer_query_webgl2'):null;
  const gpuMsSamples=[],gpuSamples=[],gpuQueries=[],gpuSampleLimit=5000;
  let renderedFrames=0,renderSubmitMs=null,renderSubmitMaxMs=null,gpuSampleTotal=0,gpuPollCount=0,gpuDisjointCount=0;
  const cpuSampleLimit=profilingEnabled?6000:0,cpuSamples=Array.from({length:cpuSampleLimit},()=>({}));
  const cpuSegments=['renderer','gpuPoll','sceneUpdate','submit'],cpuFields={renderer:'rendererMs',gpuPoll:'gpuPollMs',sceneUpdate:'sceneUpdateMs',submit:'submitMs'},timingPhases=['menu','running','paused','result','unknown'];
  const makeCpuTotals=()=>Object.fromEntries(cpuSegments.map(key=>[key,{count:0,totalMs:0,maxMs:null,lastMs:null}]));
  const addCpuMetric=(metric,ms)=>{metric.count++;metric.totalMs+=ms;metric.maxMs=Math.max(metric.maxMs??0,ms);metric.lastMs=ms;};
  let cpuTotals=makeCpuTotals(),cpuByPhase={},cpuSampleCount=0,cpuSampleCursor=0,timingEpoch=0,timingResetReason='created',timingPhase='unknown',epochQuality=quality(),discardedEpochCount=0;
  let timingFrozenAt=null,capturePhase='unknown',captureThroughRenderSeq=0,ignoredRenderCount=0;
  const captureDetails=()=>({captureFrozen:timingFrozenAt!==null,freezeReason:timingFrozenAt?.reason??null,freezeRenderSeq:timingFrozenAt?.renderSeq??null,freezeHostFrameSeq:timingFrozenAt?.hostFrameSeq??null,freezeElapsed:timingFrozenAt?.raceElapsed??null,freezeCountdown:timingFrozenAt?.countdown??null,capturePhase,captureThroughRenderSeq,ignoredRenderCount});
  function resetGpuTiming(){for(const entry of gpuQueries)gl.deleteQuery(entry.query);gpuQueries.length=0;gpuMsSamples.length=0;gpuSamples.length=0;gpuSampleTotal=0;gpuPollCount=0;gpuDisjointCount=0;}
  function resetRenderTiming(reason){
    if(reason==='setRace')discardedEpochCount=0;else if(reason==='quality-change')discardedEpochCount++;
    resetGpuTiming();renderedFrames=0;renderSubmitMs=null;renderSubmitMaxMs=null;
    timingEpoch++;timingResetReason=reason;timingPhase='unknown';epochQuality=quality();cpuSampleCount=0;cpuSampleCursor=0;cpuTotals=makeCpuTotals();cpuByPhase={};
    timingFrozenAt=null;capturePhase='unknown';captureThroughRenderSeq=0;ignoredRenderCount=0;
  }
  function recordCpuTiming(renderSeq,hostFrameSeq,phase,raceElapsed,countdown,start,sceneUpdateMs,gpuPollMs,submitMs){
    // Fixed slots are reused: no shift(), array copy or diagnostic snapshot in the frame path.
    const sample=cpuSamples[cpuSampleCursor];
    sample.renderSeq=renderSeq;sample.hostFrameSeq=hostFrameSeq;sample.phase=phase;sample.raceElapsed=raceElapsed;sample.countdown=countdown;
    sample.sceneUpdateMs=sceneUpdateMs;sample.gpuPollMs=gpuPollMs;sample.submitMs=submitMs;
    capturePhase=phase;captureThroughRenderSeq=renderSeq;
    cpuSampleCursor=(cpuSampleCursor+1)%cpuSampleLimit;cpuSampleCount=Math.min(cpuSampleCount+1,cpuSampleLimit);
    const phaseTotals=cpuByPhase[phase]??(cpuByPhase[phase]=makeCpuTotals());
    sample.rendererMs=performance.now()-start;
    for(const key of cpuSegments){const ms=sample[cpuFields[key]];addCpuMetric(cpuTotals[key],ms);addCpuMetric(phaseTotals[key],ms);}
  }
  const omittedSamples=retainedCount=>({omitted:true,retainedCount,note:'完整資料保留於診斷匯出檔'});
  function cpuTimingSnapshot(includeSamples=true){
    if(!profilingEnabled)return {profilingEnabled:false,omitted:true,note:'Detailed CPU samples disabled; enable ?profile=1.'};
    const copyTotals=totals=>Object.fromEntries(cpuSegments.map(key=>[key,{...totals[key]}]));
    return {epoch:timingEpoch,resetReason:timingResetReason,epochQuality,discardedEpochCount,...captureDetails(),capturePartial:discardedEpochCount>0||cpuTotals.renderer.count>cpuSampleCount,phase:timingPhase,renderCount:renderedFrames,recordedCount:cpuTotals.renderer.count,sampleLimit:cpuSampleLimit,retainedCount:cpuSampleCount,overwrittenCount:Math.max(0,cpuTotals.renderer.count-cpuSampleCount),
      sampling:'Every render before the first result-phase render; latest 6000 samples in chronological order. Counts/totals/max cover that capture, including paused/menu renders. Result and later renders are ignored until timing reset; filter samples or byPhase for gameplay.',
      scope:'Synchronous CPU wall ms, not GPU time. renderer includes scene update, GPU query lifecycle and submit; excludes final metric aggregation, stats snapshots, async GLTF callbacks and setRace/buildWorld.',
      resetPolicy:'setRace clears discardedEpochCount; each quality-change reset increments it. Both unfreeze capture. Only the current epoch is retained; overwritten samples remain partial after freezing. First result phase freezes without copying samples. renderCount/phase stay live; captureThroughRenderSeq/capturePhase mark the evidence boundary. renderSeq is epoch-local; hostFrameSeq comes from the caller.',
      totals:copyTotals(cpuTotals),byPhase:Object.fromEntries(Object.entries(cpuByPhase).map(([phase,totals])=>[phase,copyTotals(totals)])),
      samples:includeSamples?Array.from({length:cpuSampleCount},(_,i)=>({...cpuSamples[(cpuSampleCursor-cpuSampleCount+i+cpuSampleLimit)%cpuSampleLimit]})):omittedSamples(cpuSampleCount)};
  }
  function pollGpuTiming(renderSeq){
    // Only one timer is issued every 60 renders. An empty queue needs no WebGL
    // state read; getParameter/getQueryParameter may cross the driver boundary.
    if(!gpuTimer||gpuQueries.length===0)return;
    gpuPollCount++;if(gl.isContextLost())return;
    const disjoint=gl.getParameter(gpuTimer.GPU_DISJOINT_EXT);
    for(let i=gpuQueries.length-1;i>=0;i--){const entry=gpuQueries[i],q=entry.query;if(!disjoint&&!gl.getQueryParameter(q,gl.QUERY_RESULT_AVAILABLE))continue;
      if(!disjoint){const nanoseconds=gl.getQueryParameter(q,gl.QUERY_RESULT);const milliseconds=nanoseconds/1e6;if(Number.isFinite(milliseconds)&&milliseconds>=0){gpuMsSamples.push(milliseconds);gpuSamples.push({renderSeq:entry.renderSeq,hostFrameSeq:entry.hostFrameSeq,phase:entry.phase,raceElapsed:entry.raceElapsed,countdown:entry.countdown,gpuMs:milliseconds,polledAtRenderSeq:renderSeq});gpuSampleTotal++;if(gpuMsSamples.length>gpuSampleLimit){gpuMsSamples.shift();gpuSamples.shift();}}}
      gl.deleteQuery(q);gpuQueries.splice(i,1);
    }
    // Clock disjoint makes all timings from this interval unreliable; discard them.
    if(disjoint){gpuMsSamples.length=0;gpuSamples.length=0;gpuSampleTotal=0;gpuDisjointCount++;}
  }
  renderer.outputColorSpace=THREE.SRGBColorSpace;
  renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.35;
  const scene=new THREE.Scene();scene.background=new THREE.Color(0x070d20);scene.fog=new THREE.FogExp2(0x101a31,.0058);
  const camera=new THREE.PerspectiveCamera(61,1,.15,650);
  scene.add(new THREE.HemisphereLight(0x91cfff,0x293444,2.5));
  const moon=new THREE.DirectionalLight(0x9fcfff,2.6);moon.position.set(-90,150,70);scene.add(moon);
  const warm=new THREE.DirectionalLight(0xff7396,1.1);warm.position.set(80,45,-40);scene.add(warm);
  const world=new THREE.Group();world.name='race-environment';scene.add(world);
  const carAnchor=new THREE.Group();scene.add(carAnchor);
  const ghostAnchor=new THREE.Group();scene.add(ghostAnchor);ghostAnchor.visible=false;
  const headlight=new THREE.SpotLight(0xa4e4ff,55,48,Math.PI*.19,.6,1.2);headlight.position.set(0,1.3,1.7);headlight.target.position.set(0,.1,20);carAnchor.add(headlight,headlight.target);
  const carLight=new THREE.PointLight(0x14ddd1,4,7,2);carLight.position.set(0,.55,0);carAnchor.add(carLight);
  if(software){headlight.visible=false;carLight.visible=false;}
  const contactShadow=new THREE.Group();contactShadow.name='soft-vehicle-contact-shadow';carAnchor.add(contactShadow);
  for(let i=0;i<3;i++){const shade=new THREE.Mesh(new THREE.CircleGeometry(1,32),new THREE.MeshBasicMaterial({color:0x01050b,transparent:true,opacity:[.08,.12,.23][i],depthWrite:false}));shade.rotation.x=-Math.PI/2;shade.scale.set(1.35-i*.12,2.5-i*.16,1);shade.position.y=.025+i*.003;contactShadow.add(shade);}
  let carModel=null,ghostModel=null,track=null,lastRace=0,cameraReady=false,wheelAngle=0,ghostWheelAngle=0,currentColor=0x21e6ce,currentDecal='stripes';
  let ghostGeneration=0,ghostCarId=null,ghostCarAsset=null;
  const costs=new Float64Array(120);let costIndex=0,costCalls=0,costTriangles=0,lastSceneUpdateMs=0;
  const desired=new THREE.Vector3(),desiredTarget=new THREE.Vector3(),right=new THREE.Vector3(),forwardVector=new THREE.Vector3(),cameraRight=new THREE.Vector3(),cameraTarget=new THREE.Vector3();
  const aheadSample={},behindSample={},centerSample={},previewSample={},previewState={};
  let particles=Array.from({length:240},()=>({x:0,y:0,z:0,life:0})),particleCursor=0,elapsed=0,lastLodUpdate=-1,lastPreview=false;
  const smokeGeometry=new THREE.BufferGeometry();const smokePosition=new Float32Array(240*3);smokePosition.fill(0);smokeGeometry.setAttribute('position',new THREE.BufferAttribute(smokePosition,3));
  const smoke=new THREE.Points(smokeGeometry,new THREE.PointsMaterial({color:0xa7c5d4,size:.47,transparent:true,opacity:.2,depthWrite:false,sizeAttenuation:true}));smoke.frustumCulled=false;scene.add(smoke);
  let worldGeneration=0,landmarkInstances=0;let loadedCarAsset=null;const materialCache=new Map();
  const mat=(key,color,roughness=.6,metalness=.1,emissive=0,intensity=0)=>{
    if(!materialCache.has(key)){
      const neon=intensity>0;
      const m=software||neon?new THREE.MeshBasicMaterial({name:key,color,vertexColors:true,toneMapped:!neon}):new THREE.MeshPhongMaterial({name:key,color,shininess:Math.max(4,(1-roughness)*70),specular:0x334455});
      m.userData.baked=software||neon;m.userData.unlit=neon;materialCache.set(key,m);
    }return materialCache.get(key);
  };
  // Bake a directional light once. The GPU only multiplies vertex/instance color.
  const lightDirection=new THREE.Vector3(-.5,1,.3).normalize();
  function bake(geometry,material){
    if(!material.userData.baked)return geometry;
    const normal=geometry.attributes.normal,colors=new Float32Array(normal.count*3);
    for(let i=0;i<normal.count;i++){
      const shade=material.userData.unlit?1:.55+.45*Math.max(0,normal.getX(i)*lightDirection.x+normal.getY(i)*lightDirection.y+normal.getZ(i)*lightDirection.z);
      colors[i*3]=colors[i*3+1]=colors[i*3+2]=shade;
    }
    geometry.setAttribute('color',new THREE.BufferAttribute(colors,3));return geometry;
  }
  let invalidated=true,settleUntil=0,lastPhase='';
  function invalidate(){invalidated=true;settleUntil=performance.now()+450;}

  function quality(){return options.quality==='auto'?(autoQuality.tier>=2||canvas.clientWidth<700?'low':'medium'):options.quality;}
  let resizeWidth=0,resizeHeight=0,resizePixelRatio=0,resizeCount=0;
  const drawingBufferSize=new THREE.Vector2();
  function resize(){
    const width=Math.max(1,canvas.clientWidth||window.innerWidth||1),height=Math.max(1,canvas.clientHeight||window.innerHeight||1);
    const cap=quality()==='low'?.7:quality()==='high'?1.25:1;
    const softwareWidth=quality()==='high'?1080:quality()==='low'?540:960;
    const pixelRatio=software?Math.min(cap,softwareWidth/width,softwareWidth*.5625/height):Math.min(window.devicePixelRatio||1,quality()==='low'?1:quality()==='high'?2:1.5);
    if(width===resizeWidth&&height===resizeHeight&&pixelRatio===resizePixelRatio)return;
    // Three.js 0.170.0 setPixelRatio() calls setSize() internally. The combined
    // API sets CSS-independent dimensions, DPR and viewport in one buffer pass.
    renderer.setDrawingBufferSize(width,height,pixelRatio);
    const bufferWidth=Math.floor(width*pixelRatio),bufferHeight=Math.floor(height*pixelRatio);edgeTarget.setSize(bufferWidth,bufferHeight);edgeMaterial.uniforms.resolution.value.set(1/bufferWidth,1/bufferHeight);
    resizeWidth=width;resizeHeight=height;resizePixelRatio=pixelRatio;resizeCount++;invalidate();
    const aspect=width/height;if(camera.aspect!==aspect){camera.aspect=aspect;camera.updateProjectionMatrix();}
  }
  function disposeObjects(roots,materials=false){
    const geometry=new Set(),ownedMaterials=new Set(),textures=new Set();
    for(const root of roots.filter(Boolean)){root.traverse(o=>{if(o.isInstancedMesh)o.dispose();if(o.geometry)geometry.add(o.geometry);if(materials&&o.material)for(const m of Array.isArray(o.material)?o.material:[o.material]){ownedMaterials.add(m);for(const value of Object.values(m))if(value?.isTexture)textures.add(value);}});root.clear();}
    for(const item of geometry)item.dispose();for(const item of ownedMaterials)item.dispose();for(const item of textures)item.dispose();
  }
  function disposeTree(root,materials=false){disposeObjects([root],materials);}
  const lodMeshes=[];
  function instance(name,geometry,material,items){if(!items.length){geometry.dispose();return;}const mesh=new THREE.InstancedMesh(bake(geometry,material),material,items.length);mesh.name=name;items.forEach((p,i)=>{temp.position.set(p.x,p.y,p.z);temp.rotation.set(p.rx||0,p.heading||0,p.rz||0);temp.scale.set(p.w??1,p.h??1,p.d??1);temp.updateMatrix();mesh.setMatrixAt(i,temp.matrix);if(p.color!==undefined){p.cachedColor??=new THREE.Color(p.color);mesh.setColorAt(i,p.cachedColor);}});mesh.instanceMatrix.needsUpdate=true;mesh.receiveShadow=true;mesh.frustumCulled=false;mesh.userData.lod={items,distance:185};world.add(mesh);return mesh;}
  function ribbon(points,width,key,material,yOffset=0){const vertices=[],uvs=[],indices=[];for(let i=0;i<points.length;i++){const p=points[i],w=typeof width==='function'?width(p,i):width;const nx=Math.cos(p.heading),nz=-Math.sin(p.heading);vertices.push(p.x-nx*w/2,p.y+yOffset,p.z-nz*w/2,p.x+nx*w/2,p.y+yOffset,p.z+nz*w/2);uvs.push(0,i*.3,1,i*.3);if(i<points.length-1){const a=i*2;indices.push(a,a+2,a+1,a+1,a+2,a+3);}}const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(vertices,3));g.setAttribute('uv',new THREE.Float32BufferAttribute(uvs,2));g.setIndex(indices);g.computeVertexNormals();const mesh=new THREE.Mesh(bake(g,material),material);mesh.name=key;mesh.receiveShadow=true;world.add(mesh);return mesh;}
  function offset(p,d){return {...p,x:p.x+Math.cos(p.heading)*d,z:p.z-Math.sin(p.heading)*d};}
  function resolveTrack(t){return typeof t==='string'?(Array.isArray(TRACKS)?TRACKS.find(v=>v.id===t):TRACKS[t]):t;}
  function buildWorld(){
    const generation=++worldGeneration;lodMeshes.length=0;disposeTree(world);for(const p of particles)p.life=0;smokePosition.fill(0);smokeGeometry.attributes.position.needsUpdate=true;
    const points=[],stride=3,n=Math.ceil(track.length/stride);for(let i=0;i<=n;i++)points.push(sampleTrack(track,i/n*track.length));
    const xs=points.map(p=>p.x),zs=points.map(p=>p.z);const cx=(Math.max(...xs)+Math.min(...xs))/2,cz=(Math.max(...zs)+Math.min(...zs))/2;
    const asphalt=mat('wet-asphalt',0x334058,.31,.25);const shoulder=mat('concrete-shoulder',0x465166,.7,.05);const teal=mat('cyan-neon',0x3cf4e4,.25,.3,0x15cabf,1.7);const pink=mat('magenta-neon',0xff3f80,.3,.3,0xee1965,1.3);
    ribbon(points,p=>(p.width||track.width)+2.4,'road-foundation',shoulder,-.13);
    ribbon(points,p=>p.width||track.width,'wet-road',asphalt,.005);
    const lane=[],kerbs=[],barriers=[],poles=[],lamps=[],posts=[],signPanels=[],signArrows=[],puddles=[],pillars=[],drains=[],drainBars=[];
    for(let i=0;i<points.length-1;i++){
      const p=points[i],width=p.width||track.width,edge=width/2;
      if(i%4===0)lane.push({...p,y:p.y+.018,w:.15,h:.018,d:2.8});
      if(i%2===0)for(const side of [-1,1]){const p2=offset(p,side*(edge+.5));kerbs.push({...p2,y:p.y+.13,w:.38,h:.25,d:5.7,color:i%4===0?0xa2d0da:0x29344e});}
      if(i%3===0)for(const side of [-1,1]){if(track.shortcut&&side===track.shortcut.side&&p.s>=track.shortcut.start&&p.s<=track.shortcut.end)continue;const p2=offset(p,side*(edge+1.1));barriers.push({...p2,y:p.y+.72,w:.22,h:.16,d:8.5,color:side===1?0xff396f:0x36d5de});posts.push({...p2,y:p.y+.36,w:.13,h:.72,d:.13});}
      if(i%13===0)for(const side of [-1,1]){const p2=offset(p,side*(edge+2.9));poles.push({...p2,y:p.y+3.1,w:.13,h:6.2,d:.13});lamps.push({...p2,y:p.y+6.2,w:2.0,h:.12,d:.6});}
      if(i%17===0&&Math.abs(p.curvature||0)>.006){const direction=roadChevronDirection(p.curvature);const p2=offset(p,direction.outside*(edge+1.8));signPanels.push({...p2,y:p.y+1.9,w:2.5,h:1.15,d:.12});for(let q=0;q<2;q++){const sign=offset(p2,(q-.5)*.82);signArrows.push({...sign,y:p.y+1.95,w:.13,h:.63,d:.13,rz:direction.upperRotation});signArrows.push({...sign,y:p.y+1.55,w:.13,h:.63,d:.13,rz:direction.lowerRotation});}}
      if(i%23===0){const p2=offset(p,Math.sin(i)*edge*.65);puddles.push({...p2,y:p.y+.019,w:1.6,h:.008,d:5.6});}
      if(i%15===0){const p2=offset(p,edge-.95);drains.push({...p2,y:p.y+.035,w:.68,h:.035,d:1.4});for(let j=0;j<5;j++){const f=(j-2)*.24;drainBars.push({...p2,x:p2.x+Math.sin(p.heading)*f,z:p2.z+Math.cos(p.heading)*f,y:p.y+.06,w:.61,h:.025,d:.055});}}
      if(p.y>2&&i%10===0)pillars.push({...p,y:(p.y-1)/2,w:2.2,h:Math.max(1,p.y+1),d:2.2});
    }
    instance('lane-dashes',new THREE.BoxGeometry(1,1,1),mat('lane-paint',0x9eaec4,.6),lane);
    instance('alternating-kerbs',new THREE.BoxGeometry(1,1,1),mat('kerb',0xffffff),kerbs);
    instance('neon-armco',new THREE.BoxGeometry(1,1,1),mat('barrier',0xffffff,.35,.5,0xffffff,.15),barriers);
    instance('road-metalwork',new THREE.BoxGeometry(1,1,1),mat('posts',0x334256),posts.concat(poles));
    instance('lamp-heads',new THREE.BoxGeometry(1,1,1),mat('lamp-head',0xcefaff,.3,.2,0x77bbdd,2.0),lamps);
    instance('curve-warning-boards',new THREE.BoxGeometry(1,1,1),mat('sign-board',0x101723),signPanels);
    instance('curve-chevrons',new THREE.BoxGeometry(1,1,1),mat('chevron',0xffd878,.5,.1,0xf7a51b,.6),signArrows);
    instance('rain-puddles',new THREE.BoxGeometry(1,1,1),mat('puddle',0x51758d,.06,.8),puddles);
    instance('drain-recesses',new THREE.BoxGeometry(1,1,1),mat('drain-recess',0x090f1b,.8),drains);
    instance('drain-grates',new THREE.BoxGeometry(1,1,1),mat('drain-steel',0x6a7a8a,.5,.45),drainBars);
    instance('flyover-supports',new THREE.BoxGeometry(1,1,1),mat('pillar',0x3a4558,.8),pillars);
    // A narrower, offset corridor is an optional route through the same ordered checkpoint interval.
    if(track.shortcut){const s=track.shortcut,pts=[];const count=Math.max(12,Math.ceil((s.end-s.start)/3));for(let i=0;i<=count;i++){const u=i/count,p=sampleTrack(track,s.start+(s.end-s.start)*u);pts.push(offset(p,s.side*s.offset*Math.sin(Math.PI*u)));}ribbon(pts,s.width+1,'shortcut-foundation',mat('shortcut-base',0x4c3c37),-.035);ribbon(pts,s.width,'risk-shortcut',mat('shortcut-road',0x41352f,.33,.4),.025);const dots=pts.filter((_,i)=>i%3===0).map(p=>({...p,y:p.y+.04,w:.16,h:.02,d:1.5}));instance('shortcut-amber-guide',new THREE.BoxGeometry(1,1,1),mat('amber-guide',0xffbf57,.3,.4,0xff8714,.6),dots);}
    const ground=new THREE.Mesh(new THREE.PlaneGeometry(1500,1500),mat('ground',0x111c2d,.45,.45));bake(ground.geometry,ground.material);ground.rotation.x=-Math.PI/2;ground.position.set(cx,-1.3,cz);ground.name='city-ground';world.add(ground);
    // The waterfront is physical horizontal geometry; buildings, gantries and containers remain 3D.
    const theme=resolveTrackTheme(track); // 明示theme優先，讓新ID也能沿用既有環境資產。
    if(theme==='harbor'&&track.waterfront!==false) // 練習場的資料明示無水面，保持0011原佈局。
     {const water=new THREE.Mesh(new THREE.PlaneGeometry(850,850),mat('harbor-water',0x12354c,.13,.8));bake(water.geometry,water.material);water.rotation.x=-Math.PI/2;water.position.set(cx,-1.16,cz);world.add(water);}
    const building=[],cornices=[],windows=[],containers=[],gantry=[],distant=[];
    const urban=theme==='oldtown',high=theme==='skyway'; // 原三道與練習場的環境分支保持相同。
    let seed=(track?.seed??731);const random=()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296;};
    const routeProbe=points.filter((_,i)=>i%3===0);
    if(track.shortcut){const s=track.shortcut;for(let i=0;i<=24;i++){const u=i/24,p=sampleTrack(track,s.start+(s.end-s.start)*u);routeProbe.push({...offset(p,s.side*s.offset*Math.sin(Math.PI*u)),width:s.width});}}
    const clear=(x,z,padding)=>routeProbe.every(p=>(p.x-x)**2+(p.z-z)**2>((p.width||track.width)/2+padding)**2);
    // Reserve foreground space so the district silhouettes are visible rather
    // than buried inside procedural building blocks, including the garage view.
    const landmarkAnchors=[];
    for(const checkpoint of [46,...track.checkpoints]){
      const approach=sampleTrack(track,checkpoint-30);
      for(const side of [-1,1]){const b=offset(approach,side*((approach.width||track.width)/2+26));if(clear(b.x,b.z,22))landmarkAnchors.push(b);}
    }
    for(let i=0;i<points.length-1;i+=7){const p=points[i];for(const side of [-1,1]){const distance=(p.width||track.width)/2+19+random()*17;const b=offset(p,side*distance);const w=urban?8+random()*7:high?12+random()*9:13+random()*15,d=9+random()*9,h=urban?7+random()*14:high?20+random()*65:7+random()*14;if(!clear(b.x,b.z,Math.max(w,d)*.75+7)||landmarkAnchors.some(a=>(a.x-b.x)**2+(a.z-b.z)**2<(Math.max(w,d)*.75+15)**2))continue;building.push({...b,y:h/2-1,w,h,d,color:[0x243650,0x172942,0x384459,0x273248][i%4]});cornices.push({...b,y:h-.8,w:w+.25,h:.17,d:d+.25,color:side>0?0x16a3b2:0xa63477});for(let floor=4;floor<h-1;floor+=4)for(const edge of [-1,1]){const q=offset(b,edge*w*.503);windows.push({...q,y:floor,w:.035,h:.65,d:d*.76,color:random()>.5?0x478ba7:0xbe955e});}if(!urban&&!high&&random()>.4)for(let j=0;j<3;j++){const q=offset(b,(j-1)*3.2);containers.push({...q,z:q.z+d*.8,y:.5,w:2.7,h:2.6,d:6.4,color:j%2?0x7c3b58:0x296b7b});}}}
    // Distant skyline density is reduced by quality; near route modules are retained for readability.
    for(let i=0;i<(quality()==='low'?34:65);i++){const a=i*.618*Math.PI*2,r=190+random()*140,x=cx+Math.sin(a)*r,z=cz+Math.cos(a)*r;if(!clear(x,z,22))continue;const h=25+random()*90;distant.push({x,z,y:h/2-1,w:14+random()*20,h,d:15+random()*15,color:0x16243a});}
    const distantMesh=instance('far-skyline-lod',new THREE.BoxGeometry(1,1,1),mat('skyline',0xffffff,.8),distant);if(distantMesh)distantMesh.userData.lod={distance:400,policy:'frustum-and-distance-fog'};
    instance('district-buildings',new THREE.BoxGeometry(1,1,1),mat('building',0xffffff,.5,.35),building);
    instance('neon-rooflines',new THREE.BoxGeometry(1,1,1),mat('roofline',0xffffff,.35,.4,0xffffff,.27),cornices);
    // Exported district meshes are the production source for the instanced modules.
    // The initial unit boxes keep first-frame feedback immediate during local IO.
    const district=urban?'oldtown-shop':high?'highway-tower':'dock-warehouse';
    new GLTFLoader().load(`./assets/models/${district}.gltf`,gltf=>{
      if(generation!==worldGeneration){disposeTree(gltf.scene,true);return;}
      const dimensions=urban?[9,9,9]:high?[13,38,13]:[21,9,13];
      for(const [sourceName,targetName,size] of [['structure','district-buildings',dimensions],['neon-cornice','neon-rooflines',[dimensions[0]+.35,.22,dimensions[2]+.35]]]){
        const source=gltf.scene.getObjectByName(sourceName),target=world.getObjectByName(targetName);
        if(source&&target){const geometry=source.geometry.clone();geometry.scale(1/size[0],1/size[1],1/size[2]);target.geometry.dispose();target.geometry=bake(geometry,target.material);invalidate();}
      }
      disposeTree(gltf.scene,true);
    },undefined,()=>{});
    instance('window-bands',new THREE.BoxGeometry(1,1,1),mat('windows',0xffffff,.3,.3,0xffffff,.27),windows);
    instance('shipping-containers',new THREE.BoxGeometry(1,1,1),mat('container',0xffffff,.5,.35),containers);
    for(const [name,items,distance] of [['far-skyline-lod',distant,quality()==='low'?DISTRICT_LOD.skylineLow:DISTRICT_LOD.skylineDefault],['neon-rooflines',cornices,DISTRICT_LOD.rooflines],['window-bands',windows,DISTRICT_LOD.windowBands]]){ // 與產生器共用原170/220公尺距離，不改實際配置。
      const mesh=world.getObjectByName(name);if(mesh)mesh.userData.lod={items,distance,policy:'compact-visible-instances'};
    }
    const landmarkFrames=[],landmarkDetails=[];
    for(const b of landmarkAnchors){
        const add=(target,dx,y,w,h,d,color,rz=0)=>{const q=offset(b,dx);target.push({...q,y:b.y+y,w,h,d,color,rz});};
        if(theme==='harbor'){
          // A cantilever dock crane and hanging cable; all parts stay offshore.
          add(landmarkFrames,-5,11,.8,24,.8,0x6c8192);add(landmarkFrames,1,22,15,.7,.8,0x6c8192);
          add(landmarkDetails,6,16,.14,12,.14,0xffc45b);add(landmarkDetails,6,9,2,.45,1,0xffc45b);
          for(let rib=-4;rib<=4;rib+=2)add(landmarkFrames,rib,1,.14,3,5,0x527c86);
        }else if(theme==='skyway'){
          for(const dx of [-6,6])add(landmarkFrames,dx,13,.65,28,.9,0x34495c);
          add(landmarkFrames,0,27,13,.7,.9,0x34495c);
          for(const y of [19,23,27])add(landmarkDetails,0,y,12,.22,.35,0x26dff4);
        }else{
          add(landmarkFrames,0,4,12,8,7,0x4d3848);add(landmarkFrames,0,7,14,.4,9,0x4d3848);
          add(landmarkDetails,0,4.5,12,.3,3.2,0xff8e4b,.12);
          add(landmarkDetails,5,9,1.2,6,.3,0xff5677);
          for(const y of [7,9,11])add(landmarkFrames,5,y,.7,.13,.36,0x172333);
        }
    }
    landmarkInstances=landmarkFrames.length+landmarkDetails.length;
    instance('district-landmark-frames',new THREE.BoxGeometry(1,1,1),mat('landmark-frame',0xffffff),landmarkFrames);
    instance('district-landmark-neon',new THREE.BoxGeometry(1,1,1),mat('landmark-neon',0xffffff,.5,.1,0xffffff,1),landmarkDetails);
    const start=sampleTrack(track,0);const sw=(start.width||track.width)+2.1;
    for(const side of [-1,1]){const p=offset(start,side*sw/2);gantry.push({...p,y:p.y+3.4,w:.55,h:6.8,d:.55});}gantry.push({...start,y:start.y+6.6,w:sw+.7,h:.65,d:.55});instance('start-finish-gantry',new THREE.BoxGeometry(1,1,1),teal,gantry);
    const checkers=[];for(let i=0;i<14;i++)for(let j=0;j<2;j++){const p=offset(start,(i-6.5)*sw/14);p.x+=Math.sin(start.heading)*(j-.5)*.7;p.z+=Math.cos(start.heading)*(j-.5)*.7;checkers.push({...p,y:start.y+.03,w:sw/14,h:.025,d:.7,color:(i+j)%2===0?0xdfedf4:0x0a1425});}instance('finish-checkers',new THREE.BoxGeometry(1,1,1),mat('checker',0xffffff),checkers);
    // Moon is a lit sphere: no sky image is required by the renderer.
    const moonOrb=new THREE.Mesh(new THREE.SphereGeometry(8,16,12),mat('moon-orb',0xb3c9da,.6,.1,0x8196b3,.5));bake(moonOrb.geometry,moonOrb.material);moonOrb.position.set(cx-120,155,cz-240);world.add(moonOrb);
    world.traverse(mesh=>{
      const lod=mesh.userData.lod;if(!mesh.isInstancedMesh||!lod?.items)return;
      const positions=new Float32Array(lod.items.length*3);
      for(let i=0;i<lod.items.length;i++){const p=lod.items[i];positions[i*3]=p.x;positions[i*3+1]=p.y;positions[i*3+2]=p.z;}
      lodMeshes.push({mesh,distance:lod.distance,positions,matrices:new Float32Array(mesh.instanceMatrix.array),colors:mesh.instanceColor?new Float32Array(mesh.instanceColor.array):null});
    });
  }
  function recolor(model,ghost=false){const clones=new Map();model.traverse(o=>{if(!o.isMesh)return;const original=o.material;const materials=Array.isArray(original)?original:[original];o.material=materials.map(m=>{if(clones.has(m))return clones.get(m);const c=software?new THREE.MeshPhongMaterial({name:m.name,color:m.color,emissive:m.emissive,emissiveIntensity:m.emissiveIntensity,shininess:m.name==='glass'?75:25,specular:0x223344}):m.clone();if(ghost){c.transparent=true;c.opacity=.28;c.depthWrite=false;c.color.setHex(0x89edff);c.emissive?.setHex(0x278caf);c.emissiveIntensity=.7;}else if(c.name==='paint')c.color.setHex(currentColor);clones.set(m,c);return c;});if(!Array.isArray(original))o.material=o.material[0];});model.traverse(o=>{if(o.name.startsWith('decal-'))o.visible=o.name===`decal-${currentDecal}`;});}
  function batchVehicle(model){
    model.updateMatrixWorld(true);const groups=new Map(),remove=[];
    const inverse=model.matrixWorld.clone().invert();
    model.traverse(mesh=>{if(!mesh.isMesh||Array.isArray(mesh.material))return;
      let parent=mesh,visible=true,animated=false;while(parent&&parent!==model){if(!parent.visible)visible=false;if(parent.name.startsWith('wheel-'))animated=true;parent=parent.parent;}
      if(animated)return;
      remove.push(mesh);if(!visible)return;
      const geometry=mesh.geometry.clone();geometry.applyMatrix4(inverse.clone().multiply(mesh.matrixWorld));
      if(!groups.has(mesh.material))groups.set(mesh.material,[]);groups.get(mesh.material).push(geometry);
    });
    for(const [material,parts] of groups){const geometry=mergeGeometries(parts,false);for(const part of parts)part.dispose();if(geometry){const mesh=new THREE.Mesh(geometry,material);mesh.name='batched-'+material.name;model.add(mesh);}}
    model.traverse(pivot=>{
      if(!pivot.name.startsWith('wheel-'))return;
      const parts=new Map();pivot.updateMatrixWorld(true);const inv=pivot.matrixWorld.clone().invert();const children=[];
      pivot.traverse(m=>{if(!m.isMesh||Array.isArray(m.material))return;const g=m.geometry.clone().applyMatrix4(inv.clone().multiply(m.matrixWorld));if(!parts.has(m.material))parts.set(m.material,[]);parts.get(m.material).push(g);children.push(m);});
      for(const m of children)m.removeFromParent();
      for(const [material,geometries] of parts){const geometry=mergeGeometries(geometries,false);for(const g of geometries)g.dispose();if(geometry)pivot.add(new THREE.Mesh(geometry,material));}
      for(const m of children)m.geometry.dispose();
    });
    const oldGeometry=new Set();for(const mesh of remove){mesh.removeFromParent();oldGeometry.add(mesh.geometry);}for(const geometry of oldGeometry)geometry.dispose();
  }
  function prepareVehicleMaterial(model,ghost=false){
    const sourceMaterials=new Set();model.traverse(o=>{if(o.material)for(const m of Array.isArray(o.material)?o.material:[o.material])sourceMaterials.add(m);});
    recolor(model,ghost);for(const m of sourceMaterials)m.dispose();batchVehicle(model);
  }
  function installPlayerModel(model){
    if(carModel)carAnchor.remove(carModel);disposeObjects([carModel],true);
    carModel=model;prepareVehicleMaterial(carModel);carModel.userData.wheels=[];carModel.traverse(o=>{if(o.name.startsWith('wheel-'))carModel.userData.wheels.push(o);});carAnchor.add(carModel);
  }
  function installGhostModel(model){
    if(ghostModel)ghostAnchor.remove(ghostModel);disposeObjects([ghostModel],true);
    ghostModel=model;prepareVehicleMaterial(ghostModel,true);ghostModel.userData.wheels=[];ghostModel.traverse(o=>{if(o.name.startsWith('wheel-'))ghostModel.userData.wheels.push(o);});ghostAnchor.add(ghostModel);
  }
  function clearGhostModel(){
    ghostGeneration++;if(ghostModel)ghostAnchor.remove(ghostModel);disposeObjects([ghostModel],true);
    ghostModel=null;ghostCarId=null;ghostCarAsset=null;ghostWheelAngle=0;ghostAnchor.visible=false;
  }
  function ensureGhostModel(pose){
    const id=ghostVehicleId(pose);if(!id)return false;
    if(id===ghostCarId)return true;
    const generation=++ghostGeneration,race=lastRace;ghostCarId=id;ghostCarAsset=null;ghostWheelAngle=0;
    // Recorded vehicle identity owns a separate model and geometry lifetime.
    // No collider or physics object is created for this visual-only replay.
    installGhostModel(makeVehicle(THREE,id));
    new GLTFLoader().load(`./assets/models/${id}.gltf`,gltf=>{
      if(race===lastRace&&generation===ghostGeneration&&id===ghostCarId){installGhostModel(gltf.scene);ghostCarAsset=id;invalidate();}
      else disposeTree(gltf.scene,true);
    },undefined,()=>{});
    return true;
  }
  function setRace(nextTrack,car='comet',color='mint',decal='stripes'){
    invalidate();for(const p of particles)p.life=0;particleCursor=0;smokePosition.fill(0);smokeGeometry.attributes.position.needsUpdate=true;
    resetRenderTiming('setRace');
    const previousTrack=track;track=resolveTrack(nextTrack);if(!track)throw new Error('Unknown Neon Drift track');
    const race=++lastRace;clearGhostModel();lastLodUpdate=-1;
    const carId=typeof car==='string'?car:car.id;const rawColor=typeof color==='object'?(color.hex??color.color??color.value):color;
    currentColor=typeof rawColor==='number'?rawColor:PALETTE[rawColor]??(COLORS.find(c=>c.id===rawColor)?new THREE.Color(COLORS.find(c=>c.id===rawColor).hex).getHex():undefined)??(typeof rawColor==='string'&&rawColor.startsWith('#')?new THREE.Color(rawColor).getHex():0x21e6ce);
    currentDecal=typeof decal==='object'?decal.id:decal;currentDecal=({dual:'stripes',stripe:'stripes',pulse:'circuit',slash:'slash',none:'none'}[currentDecal]||currentDecal);
    loadedCarAsset=null;if(previousTrack!==track)buildWorld();installPlayerModel(makeVehicle(THREE,carId));cameraReady=false;wheelAngle=0;
    new GLTFLoader().load(`./assets/models/${carId}.gltf`,gltf=>{if(race===lastRace){installPlayerModel(gltf.scene);loadedCarAsset=carId;invalidate();}else disposeTree(gltf.scene,true);},undefined,()=>{});
    resize();
  }
  function poseModel(anchor,model,pose,dt,isGhost=false){if(!pose||!model)return;anchor.position.set(pose.x||0,(pose.y||0)+.025,pose.z||0);anchor.rotation.y=pose.heading||0;model.rotation.x=-(pose.pitch||0);model.rotation.z=isGhost?0:clamp((pose.steer||0)*Math.abs(pose.speed||0)*-.0018,-.075,.075);for(const o of model.userData.wheels){o.rotation.x=isGhost?ghostWheelAngle:wheelAngle;if(o.name.includes('front'))o.rotation.y=-clamp(pose.steer||0,-1,1)*.38;}}
  function updateLod(){
    const multiplier=autoQuality.tier?.75:1;
    for(let b=0;b<lodMeshes.length;b++){
      const batch=lodMeshes[b],mesh=batch.mesh,positions=batch.positions,matrices=batch.matrices,colors=batch.colors;
      const target=mesh.instanceMatrix.array,tints=mesh.instanceColor?.array,distance=batch.distance*multiplier,limit=distance*distance;
      let active=0;
      for(let i=0;i<positions.length/3;i++){
        const dx=positions[i*3]-camera.position.x,dz=positions[i*3+2]-camera.position.z;if(dx*dx+dz*dz>limit)continue;
        for(let j=0;j<16;j++)target[active*16+j]=matrices[i*16+j];
        if(colors)for(let j=0;j<3;j++)tints[active*3+j]=colors[i*3+j];
        active++;
      }
      mesh.count=active;mesh.instanceMatrix.needsUpdate=true;if(tints)mesh.instanceColor.needsUpdate=true;
    }
  }
  function render(state,ghostPose,dt=1/60,context=null){if(!track||!state)return;
    const nextPhase=context?.phase||'unknown';if(nextPhase!==lastPhase){invalidate();lastPhase=nextPhase;}
    if(nextPhase!=='running'&&!invalidated&&performance.now()>settleUntil)return;
    invalidated=false;
    const renderStart=performance.now(),renderSeq=++renderedFrames;
    const phase=timingPhases.includes(context?.phase)?context.phase:state.preview?'menu':'unknown';timingPhase=phase;
    const hostFrameSeq=Number.isFinite(context?.frameSeq)?context.frameSeq:null,raceElapsed=Number.isFinite(context?.elapsed)?context.elapsed:Number.isFinite(state.elapsed)?state.elapsed:null,countdown=Number.isFinite(context?.countdown)?context.countdown:Number.isFinite(state.countdown)?state.countdown:null;
    // The host marks the finishing callback as result before this call. Freeze
    // in place: result-page drawing must not evict gameplay from the bounded ring.
    // Already-issued GPU queries still resolve below with their original phase.
    if(phase==='result'&&!timingFrozenAt)timingFrozenAt={reason:'phase-result',renderSeq,hostFrameSeq,raceElapsed,countdown};
    const recordTiming=timingFrozenAt===null;if(!recordTiming)ignoredRenderCount++;
    dt=clamp(dt,0,.1);elapsed+=dt;
    const preview=!!state.preview;if(preview!==lastPreview){cameraReady=false;lastPreview=preview;}
    if(preview){const p=sampleTrackInto(track,36,previewSample);Object.assign(previewState,state,p);state=previewState;state.s=36;state.heading=p.heading;state.pitch=Math.atan(p.slope);state.speed=state.steer=state.yaw=state.velocityYaw=0;state.drifting=false;ghostPose=null;}
    wheelAngle-=(state.speed||0)*dt/.35;contactShadow.rotation.x=-(state.pitch||0);
    poseModel(carAnchor,carModel,state,dt);ghostAnchor.visible=!!ghostPose&&options.ghost!==false&&ensureGhostModel(ghostPose);
    if(ghostAnchor.visible){ghostWheelAngle-=(ghostPose.speed||0)*dt/.35;poseModel(ghostAnchor,ghostModel,ghostPose,dt,true);}
    const speed=Math.abs(state.speed||0),pAhead=sampleTrackInto(track,(state.s||0)+15+speed*.17,aheadSample),pBehind=sampleTrackInto(track,(state.s||0)-12,behindSample);
    const travelHeading=sampleTrackInto(track,state.s||0,centerSample).heading+(state.velocityYaw??state.yaw??0),heading=state.heading??0;
    // Route-height clamping and generous scenery exclusion keep the chase camera above ramps and clear of buildings.
    const baseHeading=options.reducedMotion?sampleTrackInto(track,state.s||0,centerSample).heading:travelHeading;
    desired.set(state.x-Math.sin(baseHeading)*10.8,Math.max((state.y||0)+5.7,pBehind.y+4.4),state.z-Math.cos(baseHeading)*10.8);
    desiredTarget.set(state.x*.42+pAhead.x*.58,Math.max(state.y||0,pAhead.y)+1.25,state.z*.42+pAhead.z*.58);
    if(preview){right.set(Math.cos(heading),0,-Math.sin(heading));forwardVector.set(Math.sin(heading),0,Math.cos(heading));desired.set(state.x,state.y+5.1,state.z).addScaledVector(right,8).addScaledVector(forwardVector,9);cameraRight.copy(right).multiplyScalar(9).addScaledVector(forwardVector,-8).normalize();desiredTarget.set(state.x,state.y+.65,state.z).addScaledVector(cameraRight,camera.aspect>1.2?-3.5:0);}
    if(!cameraReady){camera.position.copy(desired);camera.userData.target=cameraTarget.copy(desiredTarget);cameraReady=true;}else{camera.position.lerp(desired,1-Math.exp(-dt*(options.reducedMotion?9:5.5)));camera.userData.target.lerp(desiredTarget,1-Math.exp(-dt*7));}
    camera.position.y=Math.max(camera.position.y,(state.y||0)+3.7,pBehind.y+3.7);camera.lookAt(camera.userData.target);
    if(elapsed-lastLodUpdate>.4){lastLodUpdate=elapsed;updateLod();}
    const fov=preview?43:61+(options.speedFov!==false&&!options.reducedMotion?clamp(speed/55,0,1)*7:0);if(Math.abs(camera.fov-fov)>.06){camera.fov=fov;camera.updateProjectionMatrix();}
    carLight.color.setHex(currentColor);headlight.intensity=quality()==='low'?20:55;
    if(state.drifting&&speed>7)for(let side=-1;side<=1;side+=2){const p=particles[particleCursor++%240];p.x=state.x-Math.sin(heading)*1.3+Math.cos(heading)*side*.85;p.y=(state.y||0)+.25;p.z=state.z-Math.cos(heading)*1.3-Math.sin(heading)*side*.85;p.life=1;}
    for(let i=0;i<240;i++){const p=particles[i];if(p&&p.life>0){p.life-=dt*.65;p.y+=dt*.5;smokePosition[i*3]=p.x;smokePosition[i*3+1]=p.y;smokePosition[i*3+2]=p.z;}else{smokePosition[i*3]=0;smokePosition[i*3+1]=-100;smokePosition[i*3+2]=0;}}
    smoke.visible=quality()!=='low';smokeGeometry.attributes.position.needsUpdate=true;
    const sceneUpdateEnd=performance.now();lastSceneUpdateMs=sceneUpdateEnd-renderStart;
    pollGpuTiming(renderSeq);
    const gpuPollEnd=performance.now();
    let query=null;
    if(recordTiming&&gpuTimer&&(renderSeq-1)%60===0&&gpuQueries.length<4&&!gl.isContextLost()&&!gl.getQuery(gpuTimer.TIME_ELAPSED_EXT,gl.CURRENT_QUERY)){
      query=gl.createQuery();if(query)gl.beginQuery(gpuTimer.TIME_ELAPSED_EXT,query);
    }
    // Synchronous CPU wall time for command submission; this is not GPU time.
    const submitStart=performance.now();
    try{renderer.info.reset();renderer.setRenderTarget(edgeTarget);renderer.render(scene,camera);renderer.setRenderTarget(null);renderer.render(edgeScene,edgeCamera);}finally{
      renderSubmitMs=performance.now()-submitStart;renderSubmitMaxMs=Math.max(renderSubmitMaxMs??0,renderSubmitMs);
      if(query){gl.endQuery(gpuTimer.TIME_ELAPSED_EXT);gpuQueries.push({query,renderSeq,hostFrameSeq,phase,raceElapsed,countdown});}
      if(profilingEnabled&&recordTiming)recordCpuTiming(renderSeq,hostFrameSeq,phase,raceElapsed,countdown,renderStart,sceneUpdateEnd-renderStart,gpuPollEnd-sceneUpdateEnd,renderSubmitMs);
    }
  }
  function setOptions(next){invalidate();const old=quality();if(next.quality&&next.quality!==options.quality){autoQuality.reset();costIndex=0;}options={...options,...next};if(old!==quality()&&track){resetRenderTiming('quality-change');buildWorld();}resize();}
  function dispose(){lastRace++;worldGeneration++;clearGhostModel();resetGpuTiming();disposeTree(world);disposeObjects([carAnchor,ghostAnchor],true);smoke.geometry.dispose();smoke.material.dispose();for(const material of materialCache.values())material.dispose();edgeTarget.dispose();edgeMaterial.dispose();edgeQuad.geometry.dispose();renderer.dispose();}
  resize();
  function readStats(includeSamples=true){return {autoTier:autoQuality.tier,lastSceneUpdateMs,cameraFov:camera.fov,reducedMotion:!!options.reducedMotion,profilingEnabled,renderedFrames,landmarkInstances,antialias:'FXAA / compact seven-tap tangent filter',staticShading:software?'baked directional vertex colors':'Phong',calls:renderer.info.render.calls,triangles:renderer.info.render.triangles,geometries:renderer.info.memory.geometries,textures:renderer.info.memory.textures,quality:quality(),software,loadedCarAsset,ghostCarId,ghostCarAsset,pixelRatio:renderer.getPixelRatio(),drawingBufferSize:renderer.getDrawingBufferSize(drawingBufferSize).toArray(),resizeCount,renderSubmitMs,renderSubmitMaxMs,renderSubmitTiming:'Live last/max CPU wall time of synchronous renderer.render since timing reset; continues after cpuTiming capture freezes; not GPU duration.',cpuTiming:cpuTimingSnapshot(includeSamples),camera:[camera.position.x,camera.position.y,camera.position.z],lightCount:software?3:5,shadowMaps:0,textureBytes:edgeTarget.width*edgeTarget.height*8,gpuMsSamples:gpuTimer?(includeSamples?[...gpuMsSamples]:omittedSamples(gpuMsSamples.length)):null,gpuSamples:gpuTimer?(includeSamples?gpuSamples.map(sample=>({...sample})):omittedSamples(gpuSamples.length)):null,gpuTimingDetails:gpuTimer?{epoch:timingEpoch,resetReason:timingResetReason,epochQuality,discardedEpochCount,...captureDetails(),capturePartial:discardedEpochCount>0||gpuSampleTotal>gpuSamples.length||gpuDisjointCount>0||(timingFrozenAt!==null&&gpuQueries.length>0),sampleLimit:gpuSampleLimit,sampleTotal:gpuSampleTotal,retainedCount:gpuSamples.length,overwrittenCount:Math.max(0,gpuSampleTotal-gpuSamples.length),pendingQueries:gpuQueries.length,unresolvedQueries:gpuQueries.length,pollCount:gpuPollCount,disjointCount:gpuDisjointCount,sampling:'Sparse submit-only GPU timer every 60 renders before capture freezes; not full-frame timing. Pending queries continue resolving after result with their issuing phase. Latest 5000 valid samples. capturePartial flags discarded quality epochs, overwritten samples, disjoint, or frozen capture with unresolved queries; unresolved alone clears when results arrive. discardedEpochCount counts quality resets since setRace.'}:null,gpuTimer:gpuTimer?'EXT_disjoint_timer_query_webgl2 / render GPU elapsed ms / every 60 frames before result':null,adapter,renderer:'Three.js 0.170.0 / WebGL2'};}
  function recordUpdateCost(ms){if(options.quality!=='auto')return;costs[costIndex++]=ms;costCalls=Math.max(costCalls,renderer.info.render.calls);costTriangles=Math.max(costTriangles,renderer.info.render.triangles);if(costIndex===120){costs.sort();const previous=autoQuality.tier;autoQuality.window(costs[113],costCalls,costTriangles);costIndex=costCalls=costTriangles=0;if(previous!==autoQuality.tier){lastLodUpdate=-1;resize();}}}
  return {resetAutoQuality(){autoQuality.reset();costIndex=costCalls=costTriangles=0;resize();},recordUpdateCost,get sceneUpdateMs(){return lastSceneUpdateMs;},setRace,render,resize,setOptions,dispose,get stats(){return readStats();},get summary(){return readStats(false);}};
}
