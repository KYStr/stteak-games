const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

// Only the movable battery and its docking receiver share this layout. Their
// projected anchors remain unchanged; leaders identify displaced labels.
export function layoutDockingMarkers(target, crate, viewportWidth, previousOrder = 0, obstacles = [], previousCenter = null) {
  const unchanged = { target, crate, order: 0, center: null };
  if (!target || !crate || target.hidden || crate.hidden) return unchanged;
  const gap = 8;
  // Retain the same left/right order until the original labels have clearly
  // separated, so small camera or battery motion cannot swap their identities.
  const clearance = previousOrder ? 24 : gap;
  const overlapX = Math.abs(target.x - crate.x) < (target.width + crate.width) / 2 + clearance;
  const overlapY = target.y > crate.y - crate.height - clearance && crate.y > target.y - target.height - clearance;
  if (!overlapX || !overlapY) return unchanged;

  const order = previousOrder || (crate.x >= target.x ? 1 : -1);
  const pairWidth = target.width + crate.width + gap;
  const halfWidth = pairWidth / 2;
  const baseCenter = clamp((target.x + crate.x) / 2, halfWidth + gap, viewportWidth - halfWidth - gap);
  const top = Math.min(target.y - target.height, crate.y - crate.height);
  const bottom = Math.max(target.y, crate.y);
  // Reserve the whole pair's horizontal footprint only for visible labels in
  // its height band. A leader is not a label and is not supplied as an obstacle.
  const blocked = obstacles
    .filter(obstacle => !obstacle.hidden && obstacle.y > top - gap && obstacle.y - obstacle.height < bottom + gap)
    .map(obstacle => [Math.max(gap, obstacle.x - obstacle.width / 2 - gap), Math.min(viewportWidth - gap, obstacle.x + obstacle.width / 2 + gap)])
    .filter(([left, right]) => right > left)
    .sort((a, b) => a[0] - b[0]);
  const intervals = [];
  let edge = gap;
  for (const [left, right] of blocked) {
    if (left - edge >= pairWidth) intervals.push([edge + halfWidth, left - halfWidth]);
    edge = Math.max(edge, right);
  }
  if (viewportWidth - gap - edge >= pairWidth) intervals.push([edge + halfWidth, viewportWidth - gap - halfWidth]);
  // Returning to the projected center has a separate exit band. Keep the
  // feasible intervals at 8px: a 24px return margin must not discard a real gap.
  // previousCenter stores a real third-label avoidance displacement, not the
  // prior projected center: ordinary camera motion must not activate retention.
  const retainDisplacement = Number.isFinite(previousCenter) && obstacles.some(obstacle => !obstacle.hidden &&
    obstacle.y > top - 24 && obstacle.y - obstacle.height < bottom + 24 &&
    obstacle.x + obstacle.width / 2 > baseCenter - halfWidth - 24 &&
    obstacle.x - obstacle.width / 2 < baseCenter + halfWidth + 24);
  let center = baseCenter;
  if (intervals.length && (retainDisplacement || !intervals.some(([left, right]) => baseCenter >= left && baseCenter <= right))) {
    const preferred = Number.isFinite(previousCenter) ? previousCenter : baseCenter;
    let distance = Infinity;
    for (const [left, right] of intervals) {
      const candidate = clamp(preferred, left, right), nextDistance = Math.abs(candidate - preferred);
      if (nextDistance < distance) { center = candidate; distance = nextDistance; }
    }
  }
  return {
    target: { ...target, x: center - order * (crate.width + gap) / 2 },
    crate: { ...crate, x: center + order * (target.width + gap) / 2 },
    order,
    // Null clears avoidance memory when the pair is at its projected base.
    // Label coordinates still use center above, including the base fallback.
    center: Math.abs(center - baseCenter) > 1e-7 ? center : null,
    crowded: intervals.length === 0,
  };
}

export function layoutClampedDockingMarkers(target, crate, viewportWidth, obstacles = [], previousCenters = {}) { // 分離的停靠標籤貼邊時，僅補上既有近pair演算法未涵蓋的水平避讓。
  const gap = 8, centers = { target: null, crate: null }, placed = { target, crate }; // 沿用既有8px字框間距並分別保留兩個裝置身份。
  let crowded = false; // 無可容納空間時明確回報，不能隱藏文字假裝解決。
  for (const id of ['target', 'crate']) { // 使用固定順序，不讓裝置列舉順序改變結果。
    const point = placed[id], previous = previousCenters?.[id]; // 每個標籤只使用自己的前次位移記憶。
    if (!point || point.hidden || (!point.edgeClamped && !Number.isFinite(previous))) continue; // 未貼邊且未曾避讓的正常投影完全不變。
    const minX = Math.max(55, point.width / 2 + gap), maxX = Math.min(viewportWidth - 55, viewportWidth - point.width / 2 - gap); // 保留原55px投影邊界，並以實際寬度防止字框超出畫面。
    if (!Number.isFinite(minX + maxX) || minX > maxX) { crowded = true; continue; } // 過小畫面或無效尺寸不能產生NaN位移或假通過。
    const other = placed[id === 'target' ? 'crate' : 'target']; // 分離的另一個停靠標籤同樣不可被新位移覆蓋。
    const blockers = [...obstacles, other].filter(item => item && !item.hidden && Number.isFinite(item.x + item.y + item.width + item.height)); // 隱藏物與缺少尺寸的項目不佔用字框空間。
    const inBand = (item, margin) => item.y > point.y - point.height - margin && item.y - item.height < point.y + margin; // 只阻擋同高度帶的真實文字矩形。
    const blocked = blockers.filter(item => inBand(item, gap)).map(item => [item.x - (item.width + point.width) / 2 - gap, item.x + (item.width + point.width) / 2 + gap]).filter(([left, right]) => right > minX && left < maxX).sort((a, b) => a[0] - b[0] || a[1] - b[1]); // 轉成此標籤中心不可進入的水平區間。
    const intervals = []; // 收集仍可完整放入標籤的所有中心區間。
    let edge = minX; // 從左側安全中心開始合併阻擋區間。
    for (const [left, right] of blocked) { // 重疊的障礙只佔同一段空間，不重複壓縮可用區域。
      if (left >= edge) intervals.push([edge, Math.min(left, maxX)]); // 邊界等號代表恰有8px間距，仍是合法位置。
      edge = Math.max(edge, right); // 合併目前及前面的障礙右界。
      if (edge > maxX) break; // 右側已無安全中心時停止掃描。
    } // 結束阻擋區間合併。
    if (edge <= maxX) intervals.push([edge, maxX]); // 保留最右側或恰好可容納的一個位置。
    if (!intervals.length) { crowded = true; continue; } // 無解時保留原標籤並揭示擁擠，不刪除文字或裝置。
    const retain = Number.isFinite(previous) && blockers.some(item => inBand(item, 24) && Math.abs(item.x - point.x) < (item.width + point.width) / 2 + 24); // 沿用24px退出帶，避免障礙在8px邊界微動時來回跳字。
    const base = clamp(point.x, minX, maxX), preferred = retain ? previous : base; // 只有真實避讓記憶才可保留位移，正常相機移動不被鎖住。
    let center = base, distance = Infinity; // 以最接近投影或既有避讓位置的合法區間決定結果。
    for (const [left, right] of intervals) { // 對所有可行空隙選擇，不依賴第一個障礙的排序巧合。
      const candidate = clamp(preferred, left, right), nextDistance = Math.abs(candidate - preferred); // 將偏好中心投到當前合法區間。
      if (nextDistance < distance) { center = candidate; distance = nextDistance; } // 距離相同時穩定保留較左候選，避免不確定抖動。
    } // 結束合法中心選擇。
    if (Math.abs(center - point.x) > 1e-7) { placed[id] = { ...point, x: center, displaced: true }; centers[id] = center; } // 位移標記讓原有leader仍連回自己的三維裝置。
  } // 結束兩個分離停靠標籤的個別避讓。
  return { ...placed, centers, crowded }; // 不改呼叫者、Y高度、文字、hidden或近pair的左右身份。
} // 結束貼邊停靠標籤補充布局。
