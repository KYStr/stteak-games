const MASK_IDS = ['hud', 'boss-hud', 'tutorial', 'loadout', 'combat-tip', 'touch-controls', 'toast', 'save-notice', 'build-label']; // 固定九個正常玩家介面遮罩。
const ROOT_IDS = ['world', 'vignette', ...MASK_IDS, 'overlay']; // 僅此原頁面固定根，不掃未知大DOM樹。
const WORDS = Object.freeze({ none: '觀察場上動作', windup: '扇形提示：蓄勢', strike: '扇形提示：出招' }); // 三態全是玩家可見文字，不洩露倒數或最佳按鍵。
const plain = style => style && style.opacity === '1' && style.filter === 'none' && (!style.backdropFilter || style.backdropFilter === 'none') && style.mixBlendMode === 'normal' && style.transform === 'none' && style.clipPath === 'none'; // 未知全頁效果不能推定可見。
const effectsOkay = style => style && style.filter === 'none' && (!style.backdropFilter || style.backdropFilter === 'none') && style.clipPath === 'none' && style.mixBlendMode === 'normal' && style.boxShadow === 'none' && style.textShadow === 'none' && style.outlineStyle === 'none' && (!style.perspective || style.perspective === 'none'); // 未知外伸filter/陰影/outline不得只看layout框。
const expectedClass = role => role === 'tutorial' ? 'tutorial' : role === 'aim-stick' ? 'stick aim-stick' : role === 'room-label' ? 'room-label' : ''; // 只沿固定來源的正常根與外伸類名。
const noInline = element => !(element.getAttribute('style') || '').trim(); // 正常遮罩根沒有inline樣式，不接受未知覆蓋變體。
function maskStyleOkay(element, style, box, role=element.id) { // 有限CSSOM平移白名單，不自動接受scale/rotate或任意filter。
  if (!effectsOkay(style) || !noInline(element) || element.className !== expectedClass(role)) return false; // 不明類名及外伸效果一律抑制。
  const horizontal = ['tutorial', 'boss-hud', 'toast', 'save-notice'].includes(role) || role === 'room-label', vertical = role === 'toast'; // 原source只有這幾個置中平移。
  if (!horizontal) return style.transform === 'none'; // 其他根沒有transform。
  const match = /^matrix\(([^)]+)\)$/.exec(style.transform || ''), values = match?.[1].split(',').map(Number); // 只六項2D矩陣，無matrix3d fallback。
  return values?.length === 6 && values.every(Number.isFinite) && values.slice(0, 4).every((v, i) => v === [1, 0, 0, 1][i]) && Math.abs(values[4] + box.width / 2) < .01 && Math.abs(values[5] + (vertical ? box.height / 2 : 0)) < .01; // 只同尺寸負半平移，bounding rect已含其位置。
} // 結束固定樣式守門。
const shown = style => style && style.display !== 'none' && style.visibility === 'visible' && Number(style.opacity) > 0; // pointer-events完全不參與可見性判斷。
const validRect = rect => !!rect && ['left', 'right', 'top', 'bottom', 'width', 'height'].every(key => Number.isFinite(rect[key])) && rect.width > 0 && rect.height > 0; // 空框及非有限框不放行。
const overlap = (a, b) => a.left <= b.right && a.right >= b.left && a.top <= b.bottom && a.bottom >= b.top; // 相觸亦保守抑制。
const unite = (a, b) => ({ left: Math.min(a.left, b.left), right: Math.max(a.right, b.right), top: Math.min(a.top, b.top), bottom: Math.max(a.bottom, b.bottom) }); // 合併已知外伸子框，不漏手機絕對定位。
export const CUE_UI_LIMITS = Object.freeze({ rectangles: 12, rootElements: 16, auxiliaryRoots: 4, auxiliaryComputed: 12, auxiliaryGeometry: 8, auxiliaryAnimations: 4 }); // 原遮罩12rect不變；另列附屬根固定成本，總body仍16。
function auxiliaryKind(element, document, window) { // 只判本次body直接附屬根是否為兩種窄非繪製形狀，不修改它。
  if (!element || element.parentElement !== document.body || element.ownerDocument !== document || element.namespaceURI !== 'http://www.w3.org/1999/xhtml' || !['SCRIPT', 'IFRAME'].includes(element.tagName) || element.id || element.className || element.hidden || element.childElementCount !== 0 || element.shadowRoot) return null; // 不是任意hidden根或來源白名單，未知子樹也拒。
  const empty = name => element.getAttribute(name) === null || element.getAttribute(name) === ''; // 觀測absent包含缺失或空字串，不猜它從未載入。
  if (!empty('src') || element.hasAttribute('srcdoc') || element.tagName === 'SCRIPT' && !empty('type') || typeof element.getAnimations !== 'function') return null; // 不取script文字、frame文件或動畫時間。
  const animations = element.getAnimations({ subtree: true }); if (!Array.isArray(animations) || animations.length !== 0) return null; // 包含pseudo的當前動畫必為零；不遍歷任何動畫物件，也不停止它。
  const style = window.getComputedStyle(element), script = element.tagName === 'SCRIPT', visibility = script ? 'visible' : 'hidden'; // 一次本體CSSOM，另兩次pseudo，沒有全頁動畫掃描。
  if (!plain(style) || !effectsOkay(style) || style.contentVisibility !== 'visible' || style.display !== (script ? 'none' : 'block') || style.visibility !== visibility || style.position !== (script ? 'static' : 'absolute') || style.backgroundImage !== 'none' || !/^rgba\(\s*0,\s*0,\s*0,\s*0\s*\)$|^transparent$/.test(style.backgroundColor) || !['Top','Right','Bottom','Left'].every(side => style['border' + side + 'Width'] === '0px') || style.animationName !== 'none' || typeof style.transitionDuration !== 'string' || style.transitionDuration.length > 128 || !style.transitionDuration.split(',').every(value => value.trim() === '0s')) return null; // 非原形狀或外伸樣式立即拒，不用透明/位置小當藉口。
  for (const pseudo of ['::before', '::after']) { const value = window.getComputedStyle(element, pseudo); if (!['none','normal'].includes(value.content) || value.display !== 'inline' || value.visibility !== visibility || value.backgroundImage !== 'none' || value.boxShadow !== 'none') return null; } // 只判不生成pseudo內容，不讀其文字或圖網址。
  const rects = element.getClientRects(), box = element.getBoundingClientRect(); if (rects.length !== (script ? 0 : 1) || !box || !['left','top','right','bottom','width','height'].every(key => Number.isFinite(box[key]))) return null; // 每根只兩次幾何API，非finite一律拒。
  return script ? ['left','top','right','bottom','width','height'].every(key => box[key] === 0) ? 'script-nonpaint' : null : box.left === 0 && box.top === 0 && box.right === 1 && box.bottom === 1 && box.width === 1 && box.height === 1 ? 'iframe-hidden-1px' : null; // 嚴格原角落1px及hidden，移動或放大不容差救援。
} // 不讀frame內部、不移除停用附屬節點、不攔截任何網路。
export class WarningCueUI { // 正常教學可見文字與形狀，不提供QA專用方法或window接口。
  constructor(document, window) { // DOM依賴可用純mock測，正式由main傳真頁面。
    this.document = document; this.window = window; this.disposed = false; this.dirty = true; this.headChanged = false; this.rootsOkay = false; this.lastKind = null; this.structureUncertain = false; // 不保存遊戲資料或上一招倒數。
    this.canvas = document.getElementById('world'); this.element = document.getElementById('warning-cue'); this.text = document.getElementById('warning-cue-text'); this.shape = document.getElementById('warning-cue-shape'); // 全為一般玩家看得到的節點。
    this.overlay = document.getElementById('overlay'); this.vignette = document.getElementById('vignette'); this.masks = MASK_IDS.map(id => document.getElementById(id)); // 固定引用避免每幀query整棵樹。
    this.extensions = [document.querySelector('.room-label'), document.getElementById('aim-stick')]; // 只有source已證兩個外伸子框。
    this.allowedMutations = new Set(['hp-text', 'energy-text', 'room-name', 'chapter', 'room-status', 'boss-name', 'boss-move', 'tutorial-copy', 'loadout', 'toast', 'save-notice', 'build-label', 'warning-cue-text'].map(id => document.getElementById(id))); // 僅原正常文字更新不視為新遮罩。
    this.rootById = new Map(ROOT_IDS.map(id => [id, document.getElementById(id)])); // 同ID替換也不是原已核根，不可借舊引用漏遮罩。
    this.rootNodes = new Set([document.body, document.documentElement, ...ROOT_IDS.map(id => document.getElementById(id)), ...this.extensions]); // 固定可重驗樣式集合，不掃全DOM。
    this.nubs = new Set(['move-stick', 'aim-stick'].map(id => document.getElementById(id)?.querySelector?.('i')).filter(Boolean)); // 原搖桿只容許正常27px位移，不增加rect讀取。
    const Observer = window.MutationObserver; this.observer = Observer ? new Observer(records => this.consume(records)) : null; // 事件回調立即清未知舊提示。
    const attributes = { attributes: true, attributeFilter: ['style', 'class', 'hidden', 'id'] }; // 只關注可能改可見性的四種屬性。
    this.observer?.observe(document.body, { childList: true, subtree: true, ...attributes }); this.observer?.observe(document.head, { childList: true }); this.observer?.observe(document.documentElement, attributes); this.clear(); // body子樹有限records，非全DOM layout引擎。
  } // 結束有限DOM初始化。
  attributeSafe(record) { // 只豁免正常程式自己會寫的固定可見屬性。
    const element = record.target, name = record.attributeName, inline = (element.getAttribute('style') || '').trim(); // 僅固定字串，不讀遊戲狀態。
    if (element === this.element) return name === 'style' && /^visibility:\s*(?:visible|hidden);?$/.test(inline) && !element.hidden; // 本元件只改visibility，其他屬性不豁免。
    if (element === this.shape) return name === 'class' && element.className === `warning-cue-shape cue-${this.lastKind}` && noInline(element) && !element.hidden; // 只有與當前公開文字同義的形狀class。
    if (['hp-fill', 'energy-fill', 'boss-fill'].includes(element.id) && name === 'style') { const value = /^width:\s*([\d.]+)%;?$/.exec(inline); return !!value && Number.isFinite(Number(value[1])) && Number(value[1]) >= 0 && Number(value[1]) <= 100; } // 原進度條width不會跨其overflow:hidden容器。
    if (['attack', 'guard', 'evade'].includes(element.id)) return name === 'class' && ['', 'held'].includes(element.className) && noInline(element); // 原觸控held只改背景，不能自改transform。
    if (this.nubs.has(element) && name === 'style') { if (!inline) return true; const value = /^transform:\s*translate\(([-\d.e+]+)px,\s*([-\d.e+]+)px\);?$/.exec(inline); return !!value && value.slice(1).map(Number).every(Number.isFinite) && Math.hypot(Number(value[1]), Number(value[2])) <= 27.000001; } // source正規化後半徑27px，超界不放行。
    return false; // 所有其他內層style/class/hidden都未知抑制。
  } // 結束固定屬性白名單。
  consume(records, validating=false, snapshot=null) { // callback與present共用一次當前有限快照，最多32筆，不借延時追認。
    let changed = records.length > 32; if (changed) this.structureUncertain = true; const current = snapshot || this.inspectRoots(); // 超量仍永久拒；每批最多一次body快照，不按record倍增。
    for (const record of records.slice(0, 32)) { // 固定資料工作上限。
      if (record.target === this.document.head) { this.headChanged = true; changed = true; continue; } // head政策原文保留，連非繪製script也無例外。
      if (current.valid && current.auxiliaries.has(record.target) && ['attributes', 'childList'].includes(record.type)) continue; // 只當次驗得的直接body同根例外；未知後代或element子樹不會進集合。
      if (record.type === 'attributes') { if (this.rootNodes.has(record.target)) changed = true; else if (!this.attributeSafe(record) && !this.overlay.contains(record.target)) { this.structureUncertain = true; changed = true; } continue; } // 根樣式下次重驗，未知內層保守鎖住。
      if (record.target === this.document.body) changed = true; else if (!this.allowedMutations.has(record.target) && !this.overlay.contains(record.target)) { this.structureUncertain = true; changed = true; } // 正常文字不造成自清循環。
    } // 結束有界mutation分類。
    if (changed) { this.dirty = true; if(!validating)this.clear(); } // callback在呈現後遇新遮罩會立即移除動態語義。
  } // 結束mutation處理。
  setKind(kind) { // 只在語義改變時寫同一可見文字。
    if (!Object.hasOwn(WORDS, kind)) kind = 'none'; if (kind === this.lastKind) return; // 未知語義只能中性。
    this.lastKind = kind; if (this.text) this.text.textContent = WORDS[kind]; if (this.shape) this.shape.className = `warning-cue-shape cue-${kind}`; // class只控制公開形狀，無額外隱藏資料。
  } // 結束三態UI更新。
  clear() { this.setKind('none'); if (this.element && this.element.style.visibility !== 'hidden') this.element.style.visibility = 'hidden'; } // 清舊語義且保留固定行高，避免反覆顯示改變遮罩尺寸。
  dispose() { this.disposed = true; this.observer?.disconnect(); this.clear(); } // pagehide後永不恢復。
  inspectRoots() { // 每次present或observer批次重新核原根與最多四附屬根，不跨幀用cache。
    const rejected = () => ({ valid: false, auxiliaries: new Set() }); // 無可用快照不能把部分合格根當白名單。
    try { // 新可見性讀取例外只抑制提示，不移除或修未知節點。
      const roots = this.document.body.children, count = roots.length; if (this.headChanged || this.structureUncertain || !Number.isInteger(count) || count > CUE_UI_LIMITS.rootElements) return rejected(); // 先長度gate再有限迭代，不展開未知大樹。
      const expected = new Set(ROOT_IDS), auxiliaries = new Set(); let scripts = 0; // 原12同identity及唯一boot完全保留。
      for (let i = 0; i < count; i++) { const element = roots[i]; if (!element) return rejected(); if (element.tagName === 'SCRIPT' && element.getAttribute('type') === 'module' && element.getAttribute('src') === './boot.js') { scripts++; continue; } if (expected.has(element.id)) { if (this.rootById.get(element.id) !== element) return rejected(); expected.delete(element.id); continue; } if (auxiliaries.size >= CUE_UI_LIMITS.auxiliaryRoots || !auxiliaryKind(element, this.document, this.window)) return rejected(); auxiliaries.add(element); } // 只有同次兩形狀可附加，不接受重複ID或未知root。
      return { valid: expected.size === 0 && scripts === 1 && this.masks.every(Boolean) && this.extensions.every(Boolean) && !!this.element && !!this.text && !!this.shape, auxiliaries }; // body16仍限制原13之外最多三根，不為四根放大總額。
    } catch { return rejected(); } // API缺失或未知CSS/動畫/幾何計算失敗皆failclosed。
  } // 當前快照只在同步呼叫內傳遞，不保存來源信任或歷史動畫狀態。
  rootsValid(snapshot) { this.dirty = false; this.rootsOkay = !this.headChanged && !this.structureUncertain && snapshot?.valid === true; return this.rootsOkay; } // 不再有跨present的dirty早退；既有永久旗標絕不清空。
  present(candidate, enabled) { // 在本幀HUD與main render之後同步完成，不排延時工作。
    let result = 'none', visible = false; // 統一在finally一次寫語義，避免同幀none再windup造成ARIA重播。
    try { // 提示計算錯誤可降級，不吞renderer錯誤。
      const snapshot = this.inspectRoots(); if (this.observer) this.consume(this.observer.takeRecords(), true, snapshot); // 同步吸收本幀HUD並只共用本次快照；下一present必重新核CSS/幾何/動畫。
      if (this.disposed || !enabled || this.document.hidden || !this.rootsValid(snapshot) || !this.observer || this.overlay.children.length || this.overlay.textContent.trim()) { this.clear(); return; } // overlay/hidden/未知根不播動態字。
      const style = element => this.window.getComputedStyle(element); // 固定次數樣式讀取，非全DOM搜尋。
      if (style(this.overlay).display !== 'none') { this.clear(); return; } // 空文字overlay也可能有背景，必須真正display:none才放行。
      if ([this.document.documentElement, this.document.body, this.canvas].some(element => !shown(style(element)) || !plain(style(element)) || !effectsOkay(style(element)) || !noInline(element) || element.className)) { this.clear(); return; } // 全頁裁剪、透明、filter未知拒絕。
      const vignette = style(this.vignette), gradient = vignette.backgroundImage?.replace(/\s+/g, ''); // 僅允許原exact裝飾，不能把任意覆蓋層列白名單。
      if (!shown(vignette) || !plain(vignette) || !effectsOkay(vignette) || !noInline(this.vignette) || this.vignette.className || !/^radial-gradient\((?:ellipse)?at55%40%,(?:rgba\(0,0,0,0\)|transparent)35%,(?:rgba\(7,16,11,0\.6\)|#07100b99)100%\)$/.test(gradient)) { this.clear(); return; } // 原最大alpha.6只保不完全遮去，不宣稱對比達標。
      if (this.element.style.visibility !== 'visible') this.element.style.visibility = 'visible'; visible = true; // 中性列占相同行高；本幀不合格也不保留上一招。
      if (!candidate || !['windup', 'strike'].includes(candidate.kind)) return; // 無當幀main receipt只有中性提示。
      const canvas = this.canvas.getBoundingClientRect(), width = this.window.innerWidth, height = this.window.innerHeight; // 第一次有限rect讀。
      if (!validRect(canvas) || !Number.isFinite(width) || !Number.isFinite(height) || canvas.left !== 0 || canvas.top !== 0 || Math.abs(canvas.right - width) > .5 || Math.abs(canvas.bottom - height) > .5 || this.window.scrollX || this.window.scrollY) return; // 未知canvas裁剪或捲動不猜測。
      const r = candidate.rect; if (!r || ![r.left, r.right, r.top, r.bottom].every(Number.isFinite)) return; // 只消費有限呈現矩形。
      const target = { left: canvas.left + (r.left + 1) * canvas.width / 2, right: canvas.left + (r.right + 1) * canvas.width / 2, top: canvas.top + (r.top + 1) * canvas.height / 2, bottom: canvas.top + (r.bottom + 1) * canvas.height / 2 }; // 正交NDC轉CSS像素。
      if (target.left < 2 || target.top < 2 || target.right > width - 2 || target.bottom > height - 2 || target.right - target.left < 24 || target.bottom - target.top < 12) return; // 全入viewport加最小可辨投影門檻。
      for (let i = 0; i < this.masks.length; i++) { // 最多九根及兩已知外伸框。
        const mask = this.masks[i], maskStyle = style(mask); if (mask.hidden || !shown(maskStyle)) continue; // hidden不畫，pointer-events:none仍照常檢查。
        let box = mask.getBoundingClientRect(); if (!validRect(box) || !maskStyleOkay(mask, maskStyle, box)) return; // 不把未知遮罩當空。
        if (mask.id === 'hud' || mask.id === 'touch-controls') { const extension = this.extensions[mask.id === 'hud' ? 0 : 1]; const extensionStyle=style(extension); if (!extension.hidden && shown(extensionStyle)) { const child = extension.getBoundingClientRect(); if (!validRect(child) || !maskStyleOkay(extension, extensionStyle, child, mask.id === 'hud' ? 'room-label' : 'aim-stick')) return; box = unite(box, child); } } // 手機外伸room-label及aim-stick不能漏掉。
        else if (mask.scrollWidth > mask.clientWidth + 1 || mask.scrollHeight > mask.clientHeight + 1) return; // 其他未知overflow先拒，絕不擴DOM掃描。
        if (mask.id === 'touch-controls') box = { left: box.left - 49, right: box.right + 49, top: box.top - 49, bottom: box.bottom + 49 }; // 原nub半徑22加位移27，保守擴49px而不讀更多DOM。
        if (overlap(target, box)) return; // DOM遮罩包含新提示所在tutorial卡，重疊則中性。
      } // 結束最多十二rect的有限觀察。
      result = candidate.kind; // 所有可見充分條件過後才顯示同義文字。
    } catch { visible = false; this.clear(); } finally { if (visible) this.setKind(result); } // 無論哪個守門早停都清舊語義，仍只寫一次。
  } // 結束本幀UI呈現。
} // 結束一般玩家提示元件。
