// One simulation clock drives both the visible warning and the damaging volume.
export function arcPhase(time){const t=((time%6)+6)%6;return t<2.8?'safe':t<3.6?'warning':'active'}
export function debrisPosition(time){return [Math.sin(time*.65)*5,3.5+Math.sin(time*.4)*1.5,-1]}
export function hazardContact(kind,position,time){if(kind==='arc')return arcPhase(time)==='active'&&Math.hypot(position.x,position.z+4)<2.2&&position.y<4;if(kind==='debris'){const p=debrisPosition(time);return Math.hypot(position.x-p[0],position.y-p[1],position.z-p[2])<1.2}return false}
