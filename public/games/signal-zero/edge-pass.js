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
  // Software rasterizers use a bounded seven-sample edge filter. All authored
  // objects still render; only the full-screen edge search is simplified.
  if(software)fragmentShader=`
   uniform sampler2D tDiffuse;
   uniform vec2 resolution;
   varying vec2 vUv;
   void main(){
    vec4 center=texture2D(tDiffuse,vUv);
    float c=luminance(center.rgb);
    float n=luminance(texture2D(tDiffuse,vUv+vec2(0.,resolution.y)).rgb);
    float s=luminance(texture2D(tDiffuse,vUv-vec2(0.,resolution.y)).rgb);
    float e=luminance(texture2D(tDiffuse,vUv+vec2(resolution.x,0.)).rgb);
    float w=luminance(texture2D(tDiffuse,vUv-vec2(resolution.x,0.)).rgb);
    float lo=min(c,min(min(n,s),min(e,w))),hi=max(c,max(max(n,s),max(e,w)));
    if(hi-lo<max(.0312,hi*.063)){gl_FragColor=center;return;}
    vec2 edge=vec2(s-n,e-w);
    edge/=max(abs(edge.x)+abs(edge.y),.0001);
    vec2 offset=edge*resolution*.75;
    vec3 filtered=(texture2D(tDiffuse,vUv+offset).rgb+texture2D(tDiffuse,vUv-offset).rgb)*.5;
    float amount=smoothstep(.03,.2,hi-lo)*.7;
    gl_FragColor=vec4(mix(center.rgb,filtered,amount),center.a);
   }`;
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
   material.customProgramCacheKey=()=>cacheKey+'-sz-display-color-'+Number(material.toneMapped);material.needsUpdate=true;
  }});
 }
 resize(width,height){this.target.setSize(width,height);this.uniforms.resolution.value.set(1/width,1/height);}
 render(renderer,scene,camera){const background=scene.background;if(background?.isColor)scene.background=this.background.copy(background).convertLinearToSRGB();renderer.setRenderTarget(this.target);renderer.render(scene,camera);scene.background=background;renderer.setRenderTarget(null);this.quad.render(renderer);}
 dispose(){this.target.dispose();this.material.dispose();this.quad.dispose();}
}
