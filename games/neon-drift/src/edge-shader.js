import {Vector2} from 'three';
// Original bounded fast approximate antialias pass. Detect local luminance
// contrast, then filter along the edge tangent. Seven taps maximum, no search
// loops; flat pixels retain their original color and small details stay sharp.
export const EDGE_SHADER={
  uniforms:{tDiffuse:{value:null},resolution:{value:new Vector2(1,1)}},
  vertexShader:`varying vec2 vUv;
    void main(){vUv=uv;gl_Position=vec4(position.xy,0.,1.);}`,
  fragmentShader:`
    uniform sampler2D tDiffuse;
    uniform vec2 resolution;
    varying vec2 vUv;
    float luma(vec3 c){return dot(c,vec3(.299,.587,.114));}
    void main(){
      vec3 center=texture2D(tDiffuse,vUv).rgb;
      float m=luma(center);
      float n=luma(texture2D(tDiffuse,vUv+vec2(0.,resolution.y)).rgb);
      float s=luma(texture2D(tDiffuse,vUv-vec2(0.,resolution.y)).rgb);
      float e=luma(texture2D(tDiffuse,vUv+vec2(resolution.x,0.)).rgb);
      float w=luma(texture2D(tDiffuse,vUv-vec2(resolution.x,0.)).rgb);
      float high=max(m,max(max(n,s),max(e,w)));
      float low=min(m,min(min(n,s),min(e,w)));
      float contrast=high-low;
      vec3 color=center;
      if(contrast>max(.015,high*.12)){
        vec2 tangent=vec2(s-n,e-w);
        tangent/=max(max(abs(tangent.x),abs(tangent.y)),.0001);
        vec2 delta=tangent*resolution*.65;
        vec3 filtered=(texture2D(tDiffuse,vUv+delta).rgb+texture2D(tDiffuse,vUv-delta).rgb)*.5;
        float deviation=abs((n+s+e+w)*.25-m)/max(contrast,.0001);
        color=mix(center,filtered,clamp(deviation,.15,.65));
      }
      gl_FragColor=vec4(color,1.);
      #include <colorspace_fragment>
    }`
};
