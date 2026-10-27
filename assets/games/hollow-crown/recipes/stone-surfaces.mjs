/** Deterministic seamless PBR stone maps; original pixel recipe, no source photographs. */
import { deflateSync } from 'node:zlib';
import { mkdir, writeFile } from 'node:fs/promises';
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
function crc32(buffer){let crc=0xffffffff;for(const value of buffer){crc^=value;for(let n=0;n<8;n++)crc=(crc>>>1)^(0xedb88320&-(crc&1));}return(crc^0xffffffff)>>>0;}
function chunk(type,data){const tag=Buffer.from(type),n=Buffer.alloc(4),crc=Buffer.alloc(4);n.writeUInt32BE(data.length);crc.writeUInt32BE(crc32(Buffer.concat([tag,data])));return Buffer.concat([n,tag,data,crc]);}
function png(width,height,pixels){const head=Buffer.alloc(13);head.writeUInt32BE(width,0);head.writeUInt32BE(height,4);head[8]=8;head[9]=6;const raw=Buffer.alloc(height*(width*4+1));for(let y=0;y<height;y++)pixels.copy(raw,y*(width*4+1)+1,y*width*4,(y+1)*width*4);return Buffer.concat([Buffer.from([137,80,78,71,13,10,26,10]),chunk('IHDR',head),chunk('IDAT',deflateSync(raw,{level:9})),chunk('IEND',Buffer.alloc(0))]);}
function hash(x,y,s=0){let n=Math.imul(x+37,374761393)^Math.imul(y+53,668265263)^Math.imul(s+17,1274126177);n=Math.imul(n^(n>>>13),1274126177);return((n^(n>>>16))>>>0)/4294967295;}
function noise(u,v,n,seed){const x=u*n,y=v*n,ix=Math.floor(x),iy=Math.floor(y),fx=x-ix,fy=y-iy,sx=fx*fx*(3-2*fx),sy=fy*fy*(3-2*fy);const a=hash(ix%n,iy%n,seed),b=hash((ix+1)%n,iy%n,seed),c=hash(ix%n,(iy+1)%n,seed),d=hash((ix+1)%n,(iy+1)%n,seed);return(a+(b-a)*sx)*(1-sy)+(c+(d-c)*sx)*sy;}
export async function generateStoneSurfaces(directory){
  await mkdir(directory,{recursive:true});const size=256,height=new Float32Array(size*size),color=Buffer.alloc(size*size*4),normal=Buffer.alloc(size*size*4),rough=Buffer.alloc(size*size*4);
  for(let y=0;y<size;y++)for(let x=0;x<size;x++){const u=x/size,v=y/size,n1=noise(u,v,4,9),n2=noise(u,v,16,12),n3=noise(u,v,64,19),grain=hash(x,y,41);const vein=Math.abs(Math.sin(u*Math.PI*8+Math.sin(v*Math.PI*4)*.7+noise(u,v,8,4)*2));const crack=vein<.035?1:0;const h=n1*.38+n2*.3+n3*.22+grain*.1-crack*.09;height[y*size+x]=h;const base=clamp(164+n1*35+n2*18+(grain-.5)*15-crack*22,0,255);const i=(y*size+x)*4;color[i]=Math.round(base*.98);color[i+1]=Math.round(base);color[i+2]=Math.round(base*.99);color[i+3]=255;const r=clamp(208+n2*26+grain*13,0,255);rough[i]=rough[i+1]=rough[i+2]=r;rough[i+3]=255;}
  for(let y=0;y<size;y++)for(let x=0;x<size;x++){const dx=(height[y*size+(x+1)%size]-height[y*size+(x+size-1)%size])*2,dy=(height[((y+1)%size)*size+x]-height[((y+size-1)%size)*size+x])*2;const l=Math.hypot(dx,dy,1),i=(y*size+x)*4;normal[i]=Math.round(128-dx/l*127);normal[i+1]=Math.round(128+dy/l*127);normal[i+2]=Math.round(128+127/l);normal[i+3]=255;}
  const maps={'ruin-stone-basecolor.png':png(size,size,color),'ruin-stone-normal.png':png(size,size,normal),'ruin-stone-roughness.png':png(size,size,rough)};for(const[name,data]of Object.entries(maps))await writeFile(directory+'/'+name,data);return maps;
}
