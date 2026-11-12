// Routed diagnostic module only. No gameplay result from this control is valid.
import * as THREE from './vendor/three.module.js';
export function createWorld(canvas,callbacks) {
 const renderer=new THREE.WebGLRenderer({canvas,antialias:false,alpha:false,powerPreference:'high-performance'});
 renderer.setPixelRatio(Math.min(devicePixelRatio,1.25)*.75);renderer.setSize(canvas.clientWidth,canvas.clientHeight,false);
 const scene=new THREE.Scene(),camera=new THREE.OrthographicCamera(-12,12,9,-9,.1,100);
 camera.position.set(12,15,12);camera.lookAt(0,0,0);scene.background=new THREE.Color('#203f3c');
 const geometry=new THREE.BoxGeometry(1,1,1),material=new THREE.MeshBasicMaterial({color:'#86b0a1'});
 scene.add(new THREE.Mesh(geometry,material));
 const frames=new Float64Array(2048),updates=new Float64Array(2048),submissions=new Float64Array(2048),completions=new Float64Array(2048);
 let frameCount=0,renderCount=0,lastCompletion=0,updateMs=0,submissionMs=0,totalUpdateMs=0,totalSubmissionMs=0;
 let running=true,enabled=false,invalidated=true,celebrating=0,last=performance.now(),renderedFrames=0,frameRequest=0,cameraTurn=0,state=null;
 const keys=new Set();
 function down(e){if(enabled)keys.add(e.key);}function up(e){keys.delete(e.key);}
 addEventListener('keydown',down);addEventListener('keyup',up);
 function frame(now) {
  if(!running)return;
  frameRequest=requestAnimationFrame(frame);
  const updateStart=performance.now();callbacks.tick?.(Math.max(0,now-last));
  const lastFrameTime=last,dt=Math.min((now-last)/1000,.1);last=now;
  // Same timing buffers, accumulators and RAF arrangement as the game.
  updateMs=performance.now()-updateStart;
  if(enabled||celebrating>0||invalidated) {
   const renderStart=performance.now();
   renderer.render(scene,camera);
   const complete=performance.now();submissionMs=complete-renderStart;
   if(enabled){const i=renderCount++%updates.length;frames[i]=now-lastFrameTime;frameCount++;updates[i]=updateMs;submissions[i]=submissionMs;completions[i]=lastCompletion?complete-lastCompletion:0;totalUpdateMs+=updateMs;totalSubmissionMs+=submissionMs;}
   lastCompletion=complete;renderedFrames++;invalidated=false;
   if(enabled){const tail=performance.now()-complete;updates[(renderCount-1)%updates.length]+=tail;totalUpdateMs+=tail;}
  }
 }
 frameRequest=requestAnimationFrame(frame);
 const noop=()=>{};
 return {sync(next){state=next;},setEnabled(value){enabled=value;if(!value)keys.clear();},position(){return {x:0,z:5};},
  rotate(n){cameraTurn=(cameraTurn+n+4)%4;},zoom:noop,animate:noop,celebrate:noop,endCelebration:noop,preview:noop,clearPreview:noop,select:noop,canPlace(){return true;},interact:noop,walkToTask:noop,campaignFeedback:noop,
  metrics(){return {activeRenderedFrames:renderCount,renderedFrames,frames:frameCount,staticStageRebuilds:0,geometries:renderer.info.memory.geometries,textures:renderer.info.memory.textures,drawCalls:renderer.info.render.calls,triangles:renderer.info.render.triangles,textureBytesBound:16777216,dpr:renderer.getPixelRatio(),cameraTurn,quality:state?.settings?.quality,renderScale:.75,framebuffer:{width:canvas.width,height:canvas.height},sceneRegion:'minimal-three-control',enabled,heldKeyCount:keys.size,position:[0,0,5],three:THREE.REVISION,totalUpdateMs,totalSubmissionMs};},
  dispose(){running=false;cancelAnimationFrame(frameRequest);removeEventListener('keydown',down);removeEventListener('keyup',up);geometry.dispose();material.dispose();renderer.dispose();}
 };
}
