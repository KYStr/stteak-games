import * as T from './vendor/three.module.js';
import {FullScreenQuad} from './vendor/Pass.js';
import {FXAAShader} from './vendor/FXAAShader.js';

// One byte-color target and one full-screen triangle. Scene shaders keep the
// native exposure and sRGB output before FXAA; no half-float filtering is needed.
// This also preserves toneMapped=false on the runner silhouette.
export class EdgePass {
 constructor(software){
  this.target=new T.WebGLRenderTarget(1,1,{depthBuffer:true,stencilBuffer:true});this.prepared=new WeakSet();this.background=new T.Color();
  let fragmentShader=FXAAShader.fragmentShader;
  this.uniforms=T.UniformsUtils.clone(FXAAShader.uniforms);this.uniforms.tDiffuse.value=this.target.texture;
  this.material=new T.ShaderMaterial({name:'signal-zero-edge-output',uniforms:this.uniforms,vertexShader:FXAAShader.vertexShader,fragmentShader,depthWrite:false,depthTest:false,toneMapped:false});
  this.quad=new FullScreenQuad(this.material);
 }
 prepare(scene){
  scene.traverse(object=>{if(!object.material)return;for(const material of Array.isArray(object.material)?object.material:[object.material]){
   if(this.prepared.has(material))continue;this.prepared.add(material);
   const previous=material.onBeforeCompile,cacheKey=material.customProgramCacheKey();
   material.onBeforeCompile=(shader,renderer)=>{
    previous.call(material,shader,renderer);
    if(material.toneMapped){
     shader.fragmentShader='#ifndef TONE_MAPPING\n#include <tonemapping_pars_fragment>\n#endif\n'+shader.fragmentShader;
     shader.fragmentShader=shader.fragmentShader.replace('#include <tonemapping_fragment>','#include <tonemapping_fragment>\n#ifndef TONE_MAPPING\ngl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );\n#endif');
    }
    shader.fragmentShader=shader.fragmentShader.replace('#include <colorspace_fragment>','gl_FragColor = sRGBTransferOETF( gl_FragColor );');
   };
   const unmappedKey=cacheKey+'-sz-display-color-0',mappedKey=cacheKey+'-sz-display-color-1';
   material.customProgramCacheKey=()=>material.toneMapped?mappedKey:unmappedKey;material.needsUpdate=true;
  }});
 }
 resize(width,height){this.target.setSize(width,height);this.uniforms.resolution.value.set(1/width,1/height);}
 render(renderer,scene,camera){const background=scene.background;if(background?.isColor)scene.background=this.background.copy(background).convertLinearToSRGB();renderer.setRenderTarget(this.target);renderer.render(scene,camera);scene.background=background;renderer.setRenderTarget(null);this.quad.render(renderer);}
 dispose(){this.target.dispose();this.material.dispose();this.quad.dispose();}
}
