import {readFile,writeFile,mkdtemp,rm} from 'node:fs/promises'; // 只建立自己可辨識的暫存物理入口，不改候選檔案。
import {tmpdir} from 'node:os'; // 使用程序暫存區，不改任何持久環境設定。
import {join,resolve} from 'node:path'; // 以受控路徑建立及清除本測試副本。
import {pathToFileURL} from 'node:url'; // 以真正ESM載入衍生的依賴路徑。
import {createHash} from 'node:crypto'; // 每120步核對Rapier二進位snapshot。
import {rooms,puzzles} from '../../../public/games/orbit-fall/content.js'; // 重用正式十二房及六謎題資料。
const variant=process.argv[2];if(!['upstream','candidate'].includes(variant))throw Error('Expected upstream or candidate'); // 只允許兩個固定被比較來源。
const engine=new URL(variant==='upstream'?'../../../assets/games/orbit-fall/vendor-sources/rapier-0.19.0.mjs':'../../../public/games/orbit-fall/vendor/rapier.mjs',import.meta.url); // 原件與候選各在fresh程序載入。
const physics=await readFile(new URL('../../../public/games/orbit-fall/physics.js',import.meta.url),'utf8'),first="import RAPIER from './vendor/rapier.mjs';"; // 使用真正PhysicsRoom實作而非仿寫物理規則。
if(!physics.startsWith(first)||physics.indexOf(first,first.length)!==-1)throw Error('Probe requires one exact physics vendor import'); // 入口結構不符就停止，不能廣泛移除imports。
const directory=await mkdtemp(join(tmpdir(),'orbit-rapier-equivalence-')),file=join(directory,'physics.mjs'); // 每個程序取得自己的獨立暫存檔。
const warnings=[],nativeWarn=console.warn;console.warn=(...args)=>{warnings.push(args.map(String).join(' '));nativeWarn(...args);}; // 擷取同時照常轉送原warning，不抑制。
try { // 確保成功或失敗都只清理自己建立的副本。
  await writeFile(file,`import RAPIER from ${JSON.stringify(engine.href)};\n`+physics.slice(first.length)); // 只改測試副本第一個import URL，餘下實作逐byte重用。
  const {initializePhysics,PhysicsRoom}=await import(pathToFileURL(file));await initializePhysics();await initializePhysics(); // 保持兩次公開零參數初始化。
  const trace=[]; // 留下逐房／逐120步狀態，不讓中途reset掩蓋差異。
  for(const room of rooms){ // 遍歷真實十二房collider及hazard。
    const puzzle=puzzles[room.puzzleId],value=new PhysicsRoom(puzzle,undefined,room),actions=[],samples=[]; // 不建DOM或WebGL。
    for(let step=0;step<360;step++){ // 每房360步固定60Hz，總4320步。
      const phase=Math.floor(step/60),input={x:phase===0?1:phase===1?-1:0,y:phase===2?.5:phase===3?-.5:0,z:phase===4?-.8:0,brake:phase===5,thrusting:phase!==5}; // 重播相同水平／垂直／煞車輸入。
      if(step===90)actions.push({step,tether:value.tether()});if(step===150)actions.push({step,magnet:value.magnet()});if(step===240)value.reset(puzzle); // 涵蓋真正牽引／磁靴／重設判定。
      value.step(input,{assist:phase%2===0,hazard:room.hazard,time:step/60}); // 使用正式assist與危險邏輯。
      if((step+1)%120===0){const bytes=value.world.takeSnapshot();samples.push({step:step+1,player:{position:{...value.player.translation()},velocity:{...value.player.linvel()}},crate:value.crate?{position:{...value.crate.translation()},velocity:{...value.crate.linvel()}}:null,anchored:value.anchored,tethered:value.tethered,snapshotSha256:createHash('sha256').update(bytes).digest('hex'),snapshotBytes:bytes.length});} // 比較完整二進位狀態，不只幾何接近。
    } // 結束本房重播。
    trace.push({room:room.id,actions,samples,physicsSteps:value.steps});value.dispose(); // 只釋放自己的World。
  } // 結束十二房比對。
  console.log(JSON.stringify({variant,warnings,rooms:trace.length,fixedSteps:trace.length*360,trace,scope:'Node/WASM equivalence only; no browser/GPU/device/audio acceptance'})); // 供上層程序直接比對，完整警告仍在stderr。
} finally { // 清除範圍不得擴及其他暫存資料。
  if(resolve(directory).startsWith(resolve(tmpdir())+'/orbit-rapier-equivalence-'))await rm(directory,{recursive:true,force:true}); // 只刪除本次已知prefix路徑。
} // 結束可重現副本程序。
