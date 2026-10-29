/** Original hand-authored courses. Units: metres, seconds, radians; +Y up, +Z forward.
 * Positive lateral points toward +X / the driver's left. D is positive input and negative world yaw. */
export const PHYSICS_VERSION = 'neon-tire-1.0.1';
export const TRACK_VERSION = 'neon-courses-1.0.1';
export const FIXED_DT = 1 / 120;
export const COLORS = [
  { id: 'cyan', name: '電流青', hex: '#3df7ff', unlock: 0 },
  { id: 'rose', name: '午夜桃', hex: '#ff508f', unlock: 0 },
  { id: 'amber', name: '港灣金', hex: '#ffba4b', unlock: 1 },
  { id: 'violet', name: '電離紫', hex: '#ae7cff', unlock: 2 },
  { id: 'lime', name: '酸性綠', hex: '#b8fa63', unlock: 3 },
  { id: 'pearl', name: '月光白', hex: '#dceaff', unlock: 4 },
];
export const DECALS = [
  { id: 'none', name: '素色', unlock: 0 },
  { id: 'stripe', name: '雙競速線', unlock: 1 },
  { id: 'slash', name: '斜切編號', unlock: 2 },
  { id: 'pulse', name: '脈衝側紋', unlock: 3 },
];
export const CARS = [
  { id: 'comet', name: 'COMET 彗星', role: '穩定', description: '抓地回復快，入門容易；急彎需要提早煞車。',
    acceleration: 11.5, topSpeed: 48, brake: 21, steerRate: 1.56, grip: 8.7, cornerGrip:10.8, driftGrip: 2.5, drag: 0.0055, dimensions: [1.86, 1.2, 4.25], color: '#3df7ff' },
  { id: 'stinger', name: 'STINGER 刺蜂', role: '靈活', description: '低速轉向俐落、出彎加速快；高速較敏感。',
    acceleration: 15.5, topSpeed: 43, brake: 23, steerRate: 1.95, grip: 7.7, cornerGrip:9.5, driftGrip: 2.2, drag: 0.0059, dimensions: [1.78, 1.3, 3.8], color: '#ffba4b' },
  { id: 'phantom', name: 'PHANTOM 幻影', role: '長漂', description: '高速與長漂有利；回正較慢、出彎要提早反打。',
    acceleration: 12.5, topSpeed: 52, brake: 19, steerRate: 1.6, grip: 6.1, cornerGrip:8.5, driftGrip: 1.6, drag: 0.003, dimensions: [1.96, 1.16, 4.65], color: '#ae7cff' },
];

const rawTracks = [
  { id: 'harbor', name: '碼頭髮夾彎', subtitle: 'DOCKSIDE / 技術入門', theme: 'harbor', difficulty: '技術入門', width: 19, // 難度屬於賽道資料，不再與選單索引綁定。
    description: '長直線後提早煞車，內側貨櫃通道更短也更窄。',
    nodes: [[0,0,0],[0,0,115],[55,0,170],[112,0,123],[88,0,40],[160,1,-6],[225,3,55],[235,3,160],[302,2,180],[332,0,75],[277,0,-98],[123,0,-130],[-20,0,-75]],
    shortcutRange: [0.145,0.27], shortcutOffset: 20,
    medals: { time: [112,140,185], drift: [5500,2200,600] } },
  { id: 'skyway', name: '高架高速彎', subtitle: 'SKYWAY / 高速節奏', theme: 'skyway', difficulty: '高速節奏', width: 20, // 插入或重排時仍保留本賽道的標籤。
    description: '坡頂前穩住方向；斜坡內線是高風險高速捷徑。',
    nodes: [[0,3,0],[-20,5,145],[75,16,255],[235,20,270],[335,16,180],[360,9,20],[295,3,-135],[120,3,-195],[-35,3,-110]],
    shortcutRange: [0.2,0.37], shortcutOffset: 26,
    medals: { time: [95,120,160], drift: [1000,450,120] } },
  { id: 'oldtown', name: '舊城連續彎', subtitle: 'OLD TOWN / 連段考驗', theme: 'oldtown', difficulty: '連段考驗', width: 17, // 原三賽道的幾何與物理數值均不修改。
    description: '兩組反向彎提早換重心；巷道切線需要精準控制。',
    nodes: [[0,1,0],[-15,2,90],[40,5,145],[130,6,120],[165,4,200],[250,3,205],[285,2,135],[235,0,55],[290,0,-25],[230,1,-100],[120,3,-65],[55,2,-125],[-30,1,-100]],
    shortcutRange: [0.47,0.58], shortcutOffset: 19,
    medals: { time: [115,145,190], drift: [6000,2400,650] } },
];

const modulo = (n, m) => ((n % m) + m) % m;
const angleDelta = (a, b) => Math.atan2(Math.sin(a-b), Math.cos(a-b));
function catmull(p0,p1,p2,p3,t) {
  const t2=t*t,t3=t2*t;
  return p1.map((v,i)=>0.5*((2*v)+(-p0[i]+p2[i])*t+(2*p0[i]-5*v+4*p2[i]-p3[i])*t2+(-p0[i]+3*v-3*p2[i]+p3[i])*t3));
}
export function buildTrack(raw) { // 讓新增資料使用唯一的正式賽道編譯器，不複製規則。
  const points=[]; let length=0;
  for(let segment=0;segment<raw.nodes.length;segment++) {
    const p=raw.nodes; const n=p.length;
    for(let j=0;j<80;j++) {
      const [x,y,z]=catmull(p[modulo(segment-1,n)],p[segment],p[(segment+1)%n],p[(segment+2)%n],j/80);
      const last=points.at(-1);
      if(last) length+=Math.hypot(x-last.x,z-last.z);
      points.push({x,y,z,s:length});
    }
  }
  const last=points.at(-1),first=points[0];
  length+=Math.hypot(first.x-last.x,first.z-last.z);
  points.push({...first,s:length});
  for(let i=0;i<points.length-1;i++) {
    const before=points[modulo(i-1,points.length-1)],after=points[(i+1)%(points.length-1)];
    points[i].heading=Math.atan2(after.x-before.x,after.z-before.z);
  }
  points.at(-1).heading=points[0].heading;
  const track={...raw,length,points,version:TRACK_VERSION,checkpoints:[0,.125,.25,.375,.5,.625,.75,.875].map(f=>f*length)};
  track.shortcut=null;
  if(raw.shortcutRange){
    const start=raw.shortcutRange[0]*length,end=raw.shortcutRange[1]*length;
    const middle=sampleTrack(track,(start+end)/2);
    track.shortcut={start,end,side:Math.sign(middle.curvature)||1,offset:raw.shortcutOffset,width:9,name:raw.theme==='harbor'?'貨櫃內線':raw.theme==='skyway'?'高架切線':'夜市巷道'};
  }
  return track;
}

/** s is arc distance, wrapping around a closed course. Never a normalized percentage. */
export function sampleTrack(trackOrId,s) {
  const track=typeof trackOrId==='string'?TRACKS.find(t=>t.id===trackOrId):trackOrId;
  if(!track) throw new Error('Unknown track');
  const distance=modulo(Number.isFinite(s)?s:0,track.length),p=track.points;
  let lo=0,hi=p.length-1;
  while(lo+1<hi) { const mid=(lo+hi)>>1;if(p[mid].s<=distance)lo=mid;else hi=mid; }
  const a=p[lo],b=p[hi],span=b.s-a.s||1,t=(distance-a.s)/span;
  const heading=a.heading+angleDelta(b.heading,a.heading)*t;
  return {x:a.x+(b.x-a.x)*t,y:a.y+(b.y-a.y)*t,z:a.z+(b.z-a.z)*t,heading,
    width:track.width,curvature:angleDelta(b.heading,a.heading)/span,slope:(b.y-a.y)/span,s:distance};
}
export const TRACKS=rawTracks.map(buildTrack);
/** A separate, broad and speed-limited driving school; never a seventh challenge card. */
export const PRACTICE_TRACK=buildTrack({id:'practice',name:'港灣駕駛練習場',subtitle:'DRIFT SCHOOL / 90 秒',theme:'harbor',waterfront:false,width:32, // 練習場沿用港灣資產但原佈局沒有水面，明示保留此差異。
  description:'封閉寬道、緩彎與 79 km/h 限速。沿五項提示練習入彎、維持側滑、出彎與回正。',
  nodes:[[0,0,0],[0,0,80],[11.7,.5,108.3],[40,1,120],[68.3,.5,108.3],[80,0,80],[80,0,0],[68.3,0,-28.3],[40,0,-40],[11.7,0,-28.3]],
  medals:{time:[80,100,130],drift:[500,250,80]}});
export function createChallenges(tracks=TRACKS){return tracks.flatMap(track=>[ // 新增賽道以同一份資料派生兩種挑戰，不複製主循環。
  {id:`${track.id}-time`,trackId:track.id,mode:'time',name:`${track.name} · 雙圈計時`,description:'按順序過點，完成兩圈。越快越好。',medals:track.medals.time},
  {id:`${track.id}-drift`,trackId:track.id,mode:'drift',name:`${track.name} · 120 秒漂移`,description:'超過 40 km/h，按住手煞車入彎，再放開並反打。',medals:track.medals.drift},
]);} // 結束資料派生，既有六張挑戰保持相同。
export const CHALLENGES=createChallenges(); // 正式版本仍只有原本三條賽道。
export function shortcutOffset(track,s) {
  const q=track.shortcut,d=modulo(s,track.length);
  if(!q)return null;
  if(d<q.start||d>q.end)return null;
  return q.side*q.offset*Math.sin(Math.PI*(d-q.start)/(q.end-q.start));
}
export function roadStatus(track,s,lateral) {
  const offset=shortcutOffset(track,s);
  const main=Math.abs(lateral)<=track.width/2-0.9;
  const shortcut=offset!==null&&Math.abs(lateral-offset)<=track.shortcut.width/2-0.9;
  return {legal:main||shortcut,main,shortcut:shortcut&&!main,offset};
}
