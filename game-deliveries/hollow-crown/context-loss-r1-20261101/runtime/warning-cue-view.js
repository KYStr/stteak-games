import * as THREE from './vendor/three.module.js'; // 只沿用正式渲染數學，不建立額外renderer或狀態通道。
const finite = value => Number.isFinite(value); // 非有限數值一律不能證明可見。
const matrixOkay = matrix => matrix?.elements?.length === 16 && matrix.elements.every(finite); // 固定十六項矩陣上限。
const sameMatrix = (matrix, values) => matrixOkay(matrix) && matrix.elements.every((value, index) => value === values[index]); // 快取失效不可沿用舊界。
const intersects = (a, b) => a.left <= b.right && a.right >= b.left && a.top <= b.bottom && a.bottom >= b.top; // 邊界接觸亦保守視為可能覆蓋。
export const CUE_VIEW_LIMITS = Object.freeze({ nodes: 512, health: 2, vertices: 2048 }); // 這是有限工作量，不是實測耗時承諾。
function geometryStamp(geometry) { // 只接受普通不可變警示幾何，不接受未知shader變形。
  const position = geometry?.attributes?.position, index = geometry?.index; // 讀取實際將提交的geometry。
  if (!position || !Number.isSafeInteger(position.count) || position.count < 3 || position.count > CUE_VIEW_LIMITS.vertices || position.itemSize !== 3 || position.isInterleavedBufferAttribute) return null; // 拒絕超限或未知格式。
  const start = geometry.drawRange.start, count = geometry.drawRange.count, available = index?.count ?? position.count; // Infinity是Three正式預設drawRange，以下用有限實際數量裁切。
  if (!Number.isSafeInteger(available) || available < 2 || !finite(start) || start < 0 || !Number.isSafeInteger(start) || !(count === Infinity || Number.isSafeInteger(count) && count > 0) || Math.min(count, available - start) < 2) return null; // 空draw不可作提交證據。
  for (let i = 0; i < position.count; i++) if (![position.getX(i), position.getY(i), position.getZ(i)].every(finite)) return null; // 僅建快取時掃有限頂點。
  geometry.computeBoundingBox(); // 只更新幾何呈現快取，不改遊戲資料。
  if (!geometry.boundingBox || geometry.boundingBox.isEmpty() || ![...geometry.boundingBox.min, ...geometry.boundingBox.max].every(finite)) return null; // 無有效界即不播。
  return { geometry, position, index, version: position.version, indexVersion: index?.version, count: position.count, indexCount: index?.count, start, drawCount: count, box: geometry.boundingBox.clone() }; // 私有呈現快取不進DOM。
} // 結束一次性幾何驗證。
function stampCurrent(stamp, object) { // 每幀只核固定欄位，避免重掃頂點。
  const geometry = object?.geometry, position = geometry?.attributes?.position, index = geometry?.index; // 取當前提交引用。
  return !!stamp && geometry === stamp.geometry && position === stamp.position && index === stamp.index && position.version === stamp.version && position.count === stamp.count && index?.version === stamp.indexVersion && index?.count === stamp.indexCount && geometry.drawRange.start === stamp.start && geometry.drawRange.count === stamp.drawCount; // 任一改變都須重新建立。
} // 結束快取有效性。
function warningMaterial(material) { // 與原扇形可見材質的窄契約一致。
  return !!material && !Array.isArray(material) && material.visible && material.transparent && material.depthTest === false && material.colorWrite && material.blending === THREE.NormalBlending && finite(material.opacity) && material.opacity >= .1 && material.opacity <= 1 && !material.map && !material.alphaMap && !material.alphaTest && !material.clippingPlanes?.length && !material.transmission && !material.wireframe; // 不把未知貼圖或裁剪當有可見填色。
} // 結束警示材質守門。
export function projectCueBox(box, matrix, camera) { // 純正交八角投影，可用離線fixture驗證。
  if (!box || box.isEmpty() || !matrixOkay(matrix) || !camera?.isOrthographicCamera || !matrixOkay(camera.matrixWorldInverse) || !matrixOkay(camera.projectionMatrix)) return null; // 未知相機及矩陣拒絕。
  const result = { left: Infinity, right: -Infinity, top: Infinity, bottom: -Infinity }; // y轉為向下，統一矩形比較。
  for (const x of [box.min.x, box.max.x]) for (const y of [box.min.y, box.max.y]) for (const z of [box.min.z, box.max.z]) { // 固定八個角，不讀每幀頂點。
    const point = new THREE.Vector3(x, y, z).applyMatrix4(matrix).project(camera); // 沿該次已更新主相機。
    if (![point.x, point.y, point.z].every(finite) || point.z <= -1 || point.z >= 1) return null; // near/far跨越或相機後方未知一律拒。
    result.left = Math.min(result.left, point.x); result.right = Math.max(result.right, point.x); result.top = Math.min(result.top, -point.y); result.bottom = Math.max(result.bottom, -point.y); // 保存保守投影矩形。
  } // 結束固定角點。
  return result.right > result.left && result.bottom > result.top ? result : null; // 退化投影不能證明扇形。
} // 結束純投影。
export class WarningCueView { // 一般產品呈現helper，不接觸simulation timer或測試接口。
  constructor(renderer, scene, camera) { this.renderer = renderer; this.scene = scene; this.camera = camera; this.token = null; this.healthCache = new WeakMap(); } // 唯一渲染實例的私有receipt。
  invalidate() { if (this.token) this.token.valid = false; this.token = null; } // 生命週期切換立即廢棄舊幀。
  attach(record, fill, outline, tick) { // 只有warning()新建cone的同一批物件可註冊。
    const parts = [fill, outline, tick], box = new THREE.Box3(), stamps = []; // 合併全部三類實際繪製幾何，而不只fill。
    try { // 只有提示計算可降級，renderer本身例外不在此處吞掉。
      if (record.shape !== 'cone' || tick.count !== 16) throw Error('unsupported-warning'); // 第一版只支援既有教學cone。
      for (const part of parts) { // 固定三個物件。
        part.updateMatrix(); const stamp = geometryStamp(part.geometry); if (!stamp || !matrixOkay(part.matrix)) throw Error('invalid-geometry'); // 建立不可變幾何快取。
        stamps.push({ ...stamp, matrix: [...part.matrix.elements], instanceVersion: part.instanceMatrix?.version, instanceArray: part.instanceMatrix?.array }); // 快取版本而不暴露坐標。
        for (let i = 0; i < (part.isInstancedMesh ? part.count : 1); i++) { // 至多1+1+16個有限部件。
          const matrix = part.matrix.clone(); if (part.isInstancedMesh) { const instance = new THREE.Matrix4(); part.getMatrixAt(i, instance); if (!matrixOkay(instance)) throw Error('invalid-instance'); matrix.multiply(instance); } // tick必須包含其真實instance矩陣。
          box.union(stamp.box.clone().applyMatrix4(matrix)); // 合併警示local界，最多144角。
        } // 結束固定部件。
      } // 結束三幾何快取。
      record.cue = { parts, stamps, box }; // 只在正常view物件保存，不寫遊戲state。
      parts.forEach((part, index) => { part.onAfterRender = (renderer, scene, camera, geometry, material) => { const token = this.token; if (token?.valid && token.active && token.record === record && renderer === this.renderer && scene === this.scene && camera === this.camera && geometry === part.geometry && material === part.material) token.seen[index] = true; }; }); // 僅同次主畫面提交可記receipt，不代表GPU讀回。
    } catch { record.cue = null; } // 不支持的提示保持原遊戲渲染，不假造可見性。
  } // 結束警示註冊。
  begin(record, enabled) { // 必須在主renderer呼叫前同步開始。
    const reentered = !!this.token?.active; this.invalidate(); // 事件重入會廢棄外層，不可復用舊receipt。
    if (!enabled || reentered || !record?.cue || !['windup', 'strike'].includes(record.cueKind)) return null; // 無公開對應分支時不產生動態語義。
    const token = { record, valid: true, active: true, seen: [false, false, false] }; this.token = token; return token; // 每次新token，無時間或敵人ID外傳。
  } // 結束本幀receipt建立。
  finish(token, healthBacks = []) { // 只在同一renderer.render正常返回後呼叫。
    if (!token || token !== this.token || !token.valid) { this.invalidate(); return null; } // 舊回調或未建立的幀不得播報。
    token.active = false; this.token = null; // 先封存，後續任何回調不能補成有效。
    try { // 此段只做呈現計算，錯誤failclosed。
      const { record } = token, cue = record.cue; // 同一幀警示引用。
      if (!token.seen.every(Boolean) || !record.group.visible || !cue || this.renderer.sortObjects !== true || this.scene.overrideMaterial !== null || this.renderer.getRenderTarget() !== null || this.renderer.xr?.enabled) return null; // 保留單main pass及標準排序。
      if (healthBacks.length > CUE_VIEW_LIMITS.health || cue.parts.length !== 3 || record.group.children.length !== 3 || !cue.parts.every(part => part.parent === record.group)) return null; // 未知子物件或多教官結構不播。
      for (let i = 0; i < cue.parts.length; i++) { // 固定三項版本及材質檢查。
        const part = cue.parts[i], stamp = cue.stamps[i]; // 取建置時快取。
        if (!part.visible || part.renderOrder !== 10 + i || !warningMaterial(part.material) || !stampCurrent(stamp, part) || !sameMatrix(part.matrix, stamp.matrix) || i === 2 && (part.count !== 16 || part.instanceMatrix.version !== stamp.instanceVersion || part.instanceMatrix.array !== stamp.instanceArray)) return null; // 幾何或排序變化不能偷偷放行。
      } // 結束警示契約。
      const rect = projectCueBox(cue.box, record.group.matrixWorld, this.camera); if (!rect || rect.left <= -1 || rect.right >= 1 || rect.top <= -1 || rect.bottom >= 1) return null; // 必須完整投影入畫面。
      const stack = [this.scene], healthSet = new Set(healthBacks); let visited = 0; // 有限scene契約核對，不做全場遮蔽引擎。
      while (stack.length) { // 最多512個節點。
        const object = stack.pop(); if (++visited > CUE_VIEW_LIMITS.nodes) return null; if (!object.visible) continue; // 隱藏祖先的子樹不提交。
        if (object.isGroup && object.renderOrder !== 0) return null; // groupOrder在renderOrder之前，不能忽略。
        if (object.children.length + stack.length + visited > CUE_VIEW_LIMITS.nodes) return null; stack.push(...object.children); // 入stack前也守固定量上限。
        if (!object.material) continue; const material = object.material; if (Array.isArray(material) || material.transmission > 0) return null; // 未知排序/傳輸變體不推論。
        if (!material.visible || material.opacity === 0 || !material.transparent || object.renderOrder < 10 || cue.parts.includes(object)) continue; // 原opaque及早透明不會蓋過depthTest:false警示。
        if (!healthSet.has(object) || object.renderOrder !== 30 || object.isInstancedMesh || !finite(material.opacity)) return null; // 唯一已核晚透明為healthBack30。
        let stamp = this.healthCache.get(object.geometry); if (!stamp) { stamp = geometryStamp(object.geometry); if (stamp) this.healthCache.set(object.geometry, stamp); } // 平面界只建立一次。
        if (!stampCurrent(stamp, object)) return null; const blocker = projectCueBox(stamp.box, object.matrixWorld, this.camera); // 只比較保守矩形，不推深度或血量。
        if (!blocker || intersects(rect, blocker)) return null; // 遮蔽不確定即抑制，不宣稱身體可見。
      } // 結束有限scene檢查。
      return { kind: record.cueKind, rect }; // 僅私有view→UI傳遞，本版DOM只會收到同義可見文字。
    } catch { return null; } // 提示降級不可影響正常戰鬥。
  } // 結束本幀封存。
} // 結束公開警示呈現helper。
