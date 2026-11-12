import {restoreTour} from './tour.js';
import {createRace,validGhost} from './physics.js';
import {TRACKS,CARS,PHYSICS_VERSION,TRACK_VERSION,resolveTourTrack,TOUR_STAGES} from './content.js';
export const SESSION_KEY='stteak:neon-drift:race';
const finite=n=>typeof n==='number'&&Number.isFinite(n);
const tuple=(rows,length,max)=>Array.isArray(rows)&&rows.length<=max&&rows.every(row=>Array.isArray(row)&&row.length===length&&row.every(finite));
function storageOr(storage){try{return storage||globalThis.localStorage;}catch{return null;}}
export function clearSession(storage){try{storageOr(storage)?.removeItem(SESSION_KEY);}catch{/* Record storage remains independent. */}}
/** A separate resumable snapshot never counts as a finish or overwrites a personal best. */
export function saveSession(race,storage,tour=null){
  if(!tour&&(!race||race.finished||race.elapsed<=0))return false;
  if(tour&&tour.status!=='running'){try{storageOr(storage).setItem(SESSION_KEY,JSON.stringify({version:2,physics:PHYSICS_VERSION,course:TRACK_VERSION,savedAt:Date.now(),tour,state:null}));return true;}catch{return false;}}
  try{const {track,car,ghost,preview,...state}=race;storageOr(storage).setItem(SESSION_KEY,JSON.stringify({version:2,tour,physics:PHYSICS_VERSION,course:TRACK_VERSION,savedAt:Date.now(),state}));return true;}catch{return false;}
}
export function loadSession(storage){
  try{
    const text=storageOr(storage)?.getItem(SESSION_KEY);if(!text||text.length>2000000)return null;
    const data=JSON.parse(text),r=data.state;
    const tour=data.tour?restoreTour(data.tour):null;if(data.tour&&!tour)return null;
    if(![1,2].includes(data.version)||data.physics!==PHYSICS_VERSION||data.course!==TRACK_VERSION||!finite(data.savedAt))return null;
    if(tour&&tour.status!=='running')return {race:null,tour,savedAt:data.savedAt};
    if(!r)return null;
    if(!['time','drift','tutorial'].includes(r.mode)||!CARS.some(c=>c.id===r.carId)||!(TRACKS.some(t=>t.id===r.trackId)||(r.mode==='tutorial'&&r.trackId==='practice')))return null;
    const track=tour?resolveTourTrack(r.trackId,tour.seed):null;
    if(tour&&(r.layoutId!==track.layoutId||r.seed!==tour.seed||r.trackId!==TOUR_STAGES[tour.stageIndex].trackId||r.mode!==TOUR_STAGES[tour.stageIndex].mode))return null;
    const state=createRace({trackId:r.trackId,carId:r.carId,mode:r.mode,sensitivity:r.sensitivity,seed:r.seed,track});
    if(r.finished!==false||r.result!==null||!finite(r.elapsed)||r.elapsed<0||(!tour&&r.elapsed===0)||r.elapsed>300||(!tour&&r.countdown!==0)||!finite(r.countdown)||r.countdown<0||r.countdown>3||!Number.isInteger(r.checkpointCount)||r.checkpointCount<0||r.checkpointCount>500||!Number.isInteger(r.nextCheckpoint)||r.nextCheckpoint<0||r.nextCheckpoint>7||!Number.isInteger(r.lap)||r.lap<1||r.lap>60)return null;
    for(const [key,value] of Object.entries(state)){
      if(['track','car','ghost','bestLap'].includes(key))continue;
      if(key==='seed'){if(!Number.isInteger(r.seed)||r.seed<0||r.seed>4294967295)return null;continue;}
      if(typeof value==='number'&&(!finite(r[key])||Math.abs(r[key])>1e8))return null;
      if(typeof value==='boolean'&&typeof r[key]!=='boolean')return null;
      if(key==='layoutId'&&data.version===1){r[key]=state.layoutId;continue;}
      if(typeof value==='string'&&typeof r[key]!=='string')return null;
    }
    if(!(r.bestLap===null||finite(r.bestLap)))return null;
    if(!tuple(r.ghostSamples,5,7000)||!tuple(r.ghostInputs,5,40000)||!tuple(r.checkpointTimes,2,8))return null;
    for(const key of ['lapTimes','lapSectors'])if(!Array.isArray(r[key])||r[key].length>100||!r[key].every(finite))return null;
    if(!Array.isArray(r.sectors)||r.sectors.length>500||!r.sectors.every(s=>s&&[s.lap,s.sector,s.time].every(finite)))return null;
    if(!r.tutorial||!Object.keys(state.tutorial).every(k=>typeof r.tutorial[k]==='boolean'))return null;
    if(r.completedGhost&&!validGhost(r.completedGhost,r.trackId,state.layoutId))return null;
    if(r.lastEvent&&(!Number.isInteger(r.lastEvent.id)||typeof r.lastEvent.type!=='string'||typeof r.lastEvent.text!=='string'||!finite(r.lastEvent.time)))return null;
    // Copy only fields owned by the physics state; never accept content, prototypes or executable input.
    for(const key of Object.keys(state))if(!['track','car','ghost'].includes(key))state[key]=r[key];
    state.bestLap=r.bestLap??Infinity;state.paused=false;
    return {race:state,tour,savedAt:data.savedAt};
  }catch{return null;}
}
