// Orbit / Fall original generative audio score; deterministic PCM at 24 kHz mono.
// No sampled recordings, sample packs, copyrighted compositions, or speech models.
export const SAMPLE_RATE=24000;
export const SOUND_SPECS={
  'ambient-loop':{duration:24,loop:true,use:'Quiet four-chord station ambience, 24-second seamless loop',peakTarget:.42},
  'thruster-loop':{duration:2,loop:true,use:'Low-pass pneumatic thrust loop',peakTarget:.48},
  brake:{duration:.42,use:'Descending pneumatic braking impulse'},
  magnet:{duration:.3,use:'Magnetic boot lock, paired low clicks'},
  tether:{duration:.48,use:'Traction beam startup, soft upward overtone'},
  interact:{duration:.16,use:'Nearby panel accepted'},
  power:{duration:1.15,use:'Power path restored, ascending three-note confirmation'},
  signal:{duration:.75,use:'Optional signal found, radio onset and two notes'},
  'low-oxygen':{duration:.8,use:'Low register two-beat oxygen notification, runtime limited to once per 8 seconds'},
  damage:{duration:.45,use:'Muted suit impact and falling pressure'},
  fail:{duration:1.3,use:'Loss cue, low descending interval'},
  success:{duration:1.7,use:'Deck repair complete, resolving original chord'},
  ending:{duration:3.4,use:'Journey completion, calm layered arpeggio'},
  door:{duration:.75,use:'Pressure seal and sliding motor'},
  click:{duration:.08,use:'Interface confirmation'},
};
const tau=Math.PI*2;
const smooth=(t,start,duration)=>{const p=(t-start)/duration;return p<=0||p>=1?0:Math.sin(Math.PI*p)**2;};
const tone=(t,f)=>Math.sin(tau*f*t)+.16*Math.sin(tau*f*2*t);
function rng(seed){return()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296*2-1;};}
export function synthesize(name){const spec=SOUND_SPECS[name],n=Math.ceil(spec.duration*SAMPLE_RATE),out=new Float32Array(n),random=rng(80743+name.length*71);let noise=0;
  for(let i=0;i<n;i++){const t=i/SAMPLE_RATE,p=t/spec.duration;noise=noise*.88+random()*.12;let v=0;
    if(name==='ambient-loop'){
      const chords=[[65.4167,98.125,155.5833],[58.25,87.2917,130.7917],[51.9167,77.7917,116.5],[58.25,98.125,146.8333]];
      for(let chord=0;chord<4;chord++)for(let wrap=-1;wrap<=1;wrap++){const local=t-chord*6+wrap*24,env=smooth(local,-1.1,8.2);if(env)chords[chord].forEach((freq,k)=>{const f=Math.round(freq*24)/24;v+=Math.sin(tau*f*t+Math.sin(tau*t/24)*.15)*env*(k===0?.22:.085);});}
      v+=Math.sin(tau*32.708333333*t)*.025*(.6+.4*Math.cos(tau*t/24));
    }else if(name==='thruster-loop'){v=(noise*.8+Math.sin(tau*63*t)*.11+Math.sin(tau*91*t)*.04)*(.9+.1*Math.cos(tau*t/2));}
    else if(name==='brake')v=(noise*.7+Math.sin(tau*(100*t-45*t*t))*.25)*smooth(t,0,.42);
    else if(name==='magnet')v=(noise*.3+tone(t,120)*.5)*(smooth(t,0,.09)+smooth(t,.15,.12));
    else if(name==='tether')v=(Math.sin(tau*(180*t+270*t*t))*.4+tone(t,90)*.15)*smooth(t,0,.48);
    else if(name==='interact')v=tone(t,392)*smooth(t,0,.16)*.4;
    else if(name==='power')v=[196,261.63,392].reduce((sum,f,k)=>sum+tone(t,f)*smooth(t,k*.15,.7)*.18,0);
    else if(name==='signal')v=noise*smooth(t,0,.12)*.3+tone(t,440)*smooth(t,.12,.18)*.3+tone(t,329.63)*smooth(t,.38,.28)*.3;
    else if(name==='low-oxygen')v=tone(t,220)*(smooth(t,.02,.22)+smooth(t,.43,.22))*.35;
    else if(name==='damage')v=(noise*.55+Math.sin(tau*(130*t-100*t*t))*.6)*smooth(t,0,.45);
    else if(name==='fail')v=tone(t,146.83)*smooth(t,0,.65)*.3+tone(t,98)*smooth(t,.35,.9)*.4;
    else if(name==='success')v=[196,246.94,293.66,392].reduce((sum,f,k)=>sum+tone(t,f)*smooth(t,k*.15,1.2)*.13,0);
    else if(name==='ending')v=[130.81,196,261.63,329.63,392,523.25].reduce((sum,f,k)=>sum+tone(t,f)*smooth(t,k*.25,1.9)*.13,0);
    else if(name==='door')v=(noise*.5+Math.sin(tau*(75*t+20*t*t))*.17)*smooth(t,0,.75);
    else if(name==='click')v=Math.sin(tau*480*t)*smooth(t,0,.08)*.35;
    if(!spec.loop)v*=Math.min(1,p*80,(1-p)*80);out[i]=v;
  }
  if(spec.loop&&name!=='ambient-loop'){// cyclic crossfade maintains the period without an audible edge.
    const fade=480;for(let i=0;i<fade;i++){const q=i/fade,a=out[i],b=out[n-fade+i],v=a*q+b*(1-q);out[i]=v;out[n-fade+i]=v;}
  }
  // Exact sample-continuity guard; short terminal interpolation is below the audio floor.
  if(spec.loop){const delta=out[n-1]-out[0];for(let i=n-32;i<n;i++)out[i]-=delta*(i-(n-32))/31;}
  let peak=0;for(const v of out)peak=Math.max(peak,Math.abs(v));const scale=(spec.peakTarget||.62)/Math.max(peak,1e-9);for(let i=0;i<n;i++)out[i]*=scale;
  return out;
}
export function pcmWav(samples){const bytes=new Uint8Array(44+samples.length*2),view=new DataView(bytes.buffer),text=(at,s)=>[...s].forEach((c,i)=>view.setUint8(at+i,c.charCodeAt(0)));
  text(0,'RIFF');view.setUint32(4,bytes.length-8,true);text(8,'WAVE');text(12,'fmt ');view.setUint32(16,16,true);view.setUint16(20,1,true);view.setUint16(22,1,true);view.setUint32(24,SAMPLE_RATE,true);view.setUint32(28,SAMPLE_RATE*2,true);view.setUint16(32,2,true);view.setUint16(34,16,true);text(36,'data');view.setUint32(40,samples.length*2,true);samples.forEach((v,i)=>view.setInt16(44+i*2,Math.round(Math.max(-1,Math.min(1,v))*32767),true));return bytes;
}
