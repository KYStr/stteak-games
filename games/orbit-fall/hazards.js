// A shared simulation clock drives both the visible warning and contact volume.
export function arcPhase(time,stage){const period=stage?.hazardPeriod||6,warning=stage?.warningSeconds||.8,t=((time%period)+period)%period,safe=period*.4666667;return t<safe?'safe':t<safe+warning?'warning':'active'}
export function debrisPosition(time,out=[0,0,0],stage){const speed=stage?6/stage.hazardPeriod:1;out[0]=Math.sin(time*.65*speed)*5;out[1]=3.5+Math.sin(time*.4*speed)*1.5;out[2]=-1;return out}
const debrisScratch=[0,0,0];
export function hazardContact(kind,position,time,stage){if(kind==='arc')return arcPhase(time,stage)==='active'&&Math.hypot(position.x,position.z+4)<2.2&&position.y<4;if(kind==='debris'){const p=debrisPosition(time,debrisScratch,stage);return Math.hypot(position.x-p[0],position.y-p[1],position.z-p[2])<1.2}return false}
