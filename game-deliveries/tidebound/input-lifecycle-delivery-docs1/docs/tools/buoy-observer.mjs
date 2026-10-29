// 純觀察器：由保護入口傳入它剛建立的副本；本模組不寫檔、不接受命令列工作路徑。
import assert from 'node:assert/strict'; // 使用 Node 內建斷言。
import path from 'node:path'; // 只組合副本內路徑。
import { pathToFileURL } from 'node:url'; // 以可攜 URL 匯入副本模組。

export async function observe(root, phase = 'extended') { // 本輪只跑新增後一次路線。
  assert.equal(phase, 'extended'); // 防止入口意外重跑原三階段完整路線。
  const worldPath = path.join(root, 'games/tidebound/src/world.js'); // 相對副本，不綁機器。
  const id = 'docs-demo-buoy'; // 保留既有教學身份，不寫入正式產品。
  const rules = await import(pathToFileURL(path.join(root, 'games/tidebound/src/rules.js')).href); // 載入副本的正式規則，不用替身。
  const world = await import(pathToFileURL(worldPath).href); // 載入同一副本的世界資料。
  assert.equal(new Set(world.OBSERVATIONS.map(p => p.id)).size, world.OBSERVATIONS.length, 'Duplicate observation id'); // 檢查浮標ID不重複。
  assert(world.OBSERVATIONS.every(p => /^[a-z0-9-]+$/.test(p.id) && Number.isFinite(p.x) && Number.isFinite(p.z) && Math.abs(p.x) <= world.WORLD_BOUND && Math.abs(p.z) <= world.WORLD_BOUND)); // 檢查slug、有限座標與世界邊界。
  const extended = phase === 'extended'; // 保留原有phase運算以便等價核對。
  assert.equal(world.OBSERVATIONS.length, extended ? 17 : 16); // 新增後必須恰為17筆。
  assert.equal(world.OBSERVATIONS.some(p => p.id === id), extended); // 範例ID必須存在。
  const state = rules.createState(1); // 以固定seed建立真正初始狀態。
  const departure = rules.depart(state); // 呼叫正常離港，未注入進度。
  // 保留原指南相同的 W／放開／空白鍵語意值，不注入座標、貨物或任務。
  for (let frame = 0; frame < 1800; frame++) rules.step(state, 1 / 60, frame < 120 ? { sailDelta: 1 } : frame < 600 ? {} : { brake: true }); // 逐幀送一般輸入，共30秒。
  assert.equal(state.mode, 'sailing'); // 必須仍在正常航行模式。
  assert(Math.abs(state.boat.x + 12) < 0.01 && Math.abs(state.boat.z - 108.21853716536259) < 0.01); // 核對固定路線終點與容差。
  assert(state.boat.speed <= 1.4 && Math.hypot(state.boat.x + 12, state.boat.z - 108) < 9); // 必須符合取樣低速及距離條件。
  const before = { x: state.boat.x, z: state.boat.z, speed: state.boat.speed, cargo: [...state.cargo] }; // 保存互動前的讀取觀察。
  const events = rules.interact(state); // 使用一般 E 互動，不直接指定浮標採集。
  const cargoId = `observation:${id}`; // 使用規則的正式貨物ID。
  assert.equal(events.some(e => e.type === 'observation' && e.observationId === id), extended); // 必須有對應觀測事件。
  assert.equal(state.cargo.includes(cargoId), extended); // 必須真取得範例貨物。
  const count = state.cargo.length; // 記住第一次互動後貨物數。
  const repeatEvents = rules.interact(state); // 重複一般互動檢查不重取。
  assert.equal(state.cargo.length, count, 'Repeated ordinary interaction duplicated cargo'); // 同航次不能增加第二份。
  const save = rules.serialize(state); // 使用正式序列化，不另造存檔格式。
  const sameTableRestore = rules.restore(save); // 使用正式同表恢復規則。
  // 航行存檔回安全港時扣除 ceil(cargo/2)；單件普通樣本會損失。
  // 同航次 harvested 身份仍須保留；不為自查改動遊戲規則。
  assert.equal(sameTableRestore.state.voyage.harvested.includes(cargoId), extended, 'Same-table restore lost harvested identity'); // 中斷後仍須記住本趟已採過。
  assert.deepEqual(sameTableRestore.state.cargo, [], 'Interrupted one-item voyage should lose that ordinary cargo'); // 單件普通貨物按既存中斷扣除。
  assert.equal(sameTableRestore.state.voyage.rescued, true); // 中斷返港須明示救援狀態。
  return { phase, observations: world.OBSERVATIONS.length, id, before, events, repeatEvents, cargo: state.cargo, // 回傳本次事件與貨物觀察。
    savedCargo: sameTableRestore.state.cargo, harvestedRetained: sameTableRestore.state.voyage.harvested.includes(cargoId), // 區分中斷貨物代價與已取樣身份。
    save, stateInjected: false, gui: 'NOT_RUN' }; // 回傳證據，由入口寫入自己的新證據目錄。
} // 保留原規則核心，不增加公開可任意寫入的子命令。
