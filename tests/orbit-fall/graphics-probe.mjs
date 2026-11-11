// Independent WebGL allocation accounting. Installed before the document loads;
// tracks uploaded storage, not a game-supplied estimate or driver memory claim.
export function graphicsProbe(){
 const native=HTMLCanvasElement.prototype.getContext;
 HTMLCanvasElement.prototype.getContext=function(kind,attributes){const gl=native.call(this,kind,attributes);if(!gl||!String(kind).includes('webgl')||gl.__orbitTracked)return gl;gl.__orbitTracked=true;
 const textures=new Map(),bound=new Map(),sizes=new Map(),probe=window.testTextureBudget={bytes:0,peakBytes:0,uploads:0};
 const bind=gl.bindTexture.bind(gl),remove=gl.deleteTexture.bind(gl),image=gl.texImage2D.bind(gl),storage=gl.texStorage2D?.bind(gl);
 const account=(target,level,width,height,format,type)=>{const binding=target>=34069&&target<=34074?34067:target,t=bound.get(binding);if(!t||level>0||!Number.isFinite(width*height))return;let channels=format===gl.RGB?3:format===gl.RED||format===gl.RED_INTEGER?1:format===gl.RG||format===gl.RG_INTEGER?2:4,bytes=type===gl.FLOAT||type===gl.UNSIGNED_INT||type===gl.INT?4:type===gl.HALF_FLOAT||type===gl.SHORT||type===gl.UNSIGNED_SHORT?2:1;const key=String(target)+':'+level;let entries=textures.get(t);if(!entries){entries=new Map();textures.set(t,entries)}const next=width*height*channels*bytes,prior=entries.get(key)||0;entries.set(key,next);probe.bytes+=next-prior;probe.peakBytes=Math.max(probe.peakBytes,probe.bytes);probe.uploads++};
 gl.bindTexture=function(target,texture){bound.set(target,texture);return bind(target,texture)};
 gl.deleteTexture=function(texture){const entries=textures.get(texture);if(entries){for(const bytes of entries.values())probe.bytes-=bytes;textures.delete(texture)}return remove(texture)};
 gl.texImage2D=function(target,level,internal,width,height,border,format,type,pixels){if(arguments.length>=9)account(target,level,width,height,format,type);else{const source=border;account(target,level,source?.width||source?.videoWidth||0,source?.height||source?.videoHeight||0,width,height)}return image(...arguments)};
 if(storage)gl.texStorage2D=function(target,levels,internal,width,height){const type=internal===gl.RGBA32F?gl.FLOAT:internal===gl.RGBA16F?gl.HALF_FLOAT:gl.UNSIGNED_BYTE;account(target,0,width,height,gl.RGBA,type);return storage(target,levels,internal,width,height)};
 return gl;
 };
}
