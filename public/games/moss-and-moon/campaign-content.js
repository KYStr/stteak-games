// Original encounter design. Positions are on the unobstructed southern walking lane.
export const STAGE_MS = 160000;
export const STAGES = Object.freeze([
  {name:'新月 · 庭園的守望', region:'garden', tasks:8, interval:12000, cap:4, speed:.35, damage:1.5, mechanic:'走近 ◇ 信標，澆水恢復月光。每 20 秒出現新的照顧任務；絨苔庇護能守住一個信標。'},
  {name:'上弦 · 林間的接力', region:'forest', tasks:10, interval:11000, cap:5, speed:.40, damage:1.6, mechanic:'走近 ♧ 光種拾取點，帶到下一個信標交付。先拾取，再送達；澆水仍能驅散陰影。'},
  {name:'滿月 · 溪畔的光路', region:'brook', tasks:12, interval:10000, cap:6, speed:.45, damage:1.7, mechanic:'將三段藍鈴→蓮花光路轉到標記方向，再澆水接通。○→◔→◑→◕；每轉一次前進一格。'},
  {name:'下弦 · 山脊的約定', region:'ridge', tasks:14, interval:9000, cap:7, speed:.50, damage:1.8, mechanic:'四個信標結合光種接力、光路與澆水。用庇護守住已恢復的月光，完成後回庭園點亮慶典。'},
]);
export const SOCKET_CANDIDATES = Object.freeze([
  [-2.7,4.5],[-.9,4.5],[.9,4.5],[2.7,4.5],
  [-2.7,5.4],[-.9,5.4],[.9,5.4],[2.7,5.4],
  [-2.7,6.75],[-.9,6.75],[.9,6.75],[2.7,6.75],
]);
export const taskLabel = n => n.kind === 'deliver' ? '♧ 拾取光種 → 下一信標交付' : n.kind === 'path' ? `↻ 光路 ${n.rotation}/3 → 目標 ${n.target}/3，對齊後接通` : '◇ 澆水恢復信標';
