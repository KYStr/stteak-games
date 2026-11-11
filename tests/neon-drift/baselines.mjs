import {readFile,writeFile} from 'node:fs/promises';
import {TOUR_STAGES,resolveTourTrack} from '../../games/neon-drift/src/content.js';
import {createRace,stepRace} from '../../games/neon-drift/src/physics.js';
const rows=[];
for(const seed of [0,7])for(const bot of ['idle','random'])for(let stage=0;stage<6;stage++){
 const data=TOUR_STAGES[stage],r=createRace({...data,seed,track:resolveTourTrack(data.trackId,seed)});let rng=12345,controls={throttle:0,brake:0,steer:0,handbrake:false};const random=()=>((rng=(Math.imul(rng,1664525)+1013904223)>>>0)/4294967296);
 for(let i=0;i<305*30&&!r.finished;i++){if(bot==='random'&&i%15===0)controls={throttle:random(),brake:random()*.5,steer:random()*2-1,handbrake:random()>.5};stepRace(r,controls,1/30);}
 rows.push({seed,bot,stage:stage+1,car:'comet',...r.result});
}
const path=process.env.NEON_CALIBRATION_OUT||'/tmp/neon-calibration.json',report=JSON.parse(await readFile(path,'utf8'));report.baselines=rows;await writeFile(path,JSON.stringify(report,null,2));console.log(JSON.stringify(rows.map(r=>({stage:r.stage,seed:r.seed,bot:r.bot,score:r.score,time:r.time,success:r.success,collisions:r.collisions})),null,2));
