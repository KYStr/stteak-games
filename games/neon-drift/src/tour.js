import {TOUR_STAGES,CARS,resolveTourTrack} from './content.js';
export function createTour(seed,carId='comet'){
  if(!Number.isInteger(seed)||seed<0||seed>4294967295||!CARS.some(c=>c.id===carId))throw Error('種子必須是 0–4294967295 的整數');
  return {version:1,seed,carId,stageIndex:0,status:'intro',results:[],activeSeconds:0};
}
export function recordStageResult(tour,result){
  if(tour.status!=='running'||tour.results.length!==tour.stageIndex)return false;
  if(!result.success){tour.status='failed';return true;}
  tour.results.push({...result});tour.activeSeconds+=result.activeSeconds??result.time-result.penalty;
  tour.status=tour.stageIndex===5?'complete':'between';return true;
}
export function retryStage(tour){if(!['failed','running'].includes(tour.status))return false;tour.status='intro';return true;}
export function advanceStage(tour){if(tour.status!=='between')return false;tour.stageIndex++;tour.status='intro';return true;}
export function abandonTour(tour){tour.status='abandoned';}
export function restoreTour(raw){
  if(!raw||raw.version!==1)return null;
  try{const t=createTour(raw.seed,raw.carId);if(!Number.isInteger(raw.stageIndex)||raw.stageIndex<0||raw.stageIndex>5||!['intro','running','failed','between','complete'].includes(raw.status)||!Array.isArray(raw.results))return null;
    if((raw.status==='complete'&&raw.stageIndex!==5)||(raw.status==='between'&&raw.stageIndex===5))return null;
    const expected=raw.stageIndex+(['between','complete'].includes(raw.status)?1:0);
    if(raw.results.length!==expected||raw.results.some((r,i)=>!r?.success||!['gold','silver','bronze','none'].includes(r.medal)||r.trackId!==TOUR_STAGES[i].trackId||r.mode!==TOUR_STAGES[i].mode||r.layoutId!==resolveTourTrack(r.trackId,raw.seed).layoutId||!Number.isFinite(r.activeSeconds)||r.activeSeconds<0||!Number.isFinite(r.score)||r.score<0||!Number.isFinite(r.collisions)||r.collisions<0))return null;
    return {...t,stageIndex:raw.stageIndex,status:raw.status,results:raw.results,activeSeconds:raw.results.reduce((n,r)=>n+r.activeSeconds,0)};
  }catch{return null;}
}
export function tourSummary(t){return {seed:t.seed,activeSeconds:t.activeSeconds,score:t.results.reduce((n,r)=>n+r.score,0),collisions:t.results.reduce((n,r)=>n+r.collisions,0),medals:t.results.map(r=>r.medal),signature:['harbor','skyway','oldtown'].map(id=>resolveTourTrack(id,t.seed).layoutId).join('|')};}
