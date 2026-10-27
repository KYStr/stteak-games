export const DISTRICT_LOD=Object.freeze({rooflines:220,windowBands:170,skylineLow:280,skylineDefault:440}); // 公尺距離的唯一來源；配方與渲染共用，不代表GPU效能通過。
export function trackMenuLabel(track,index){ // 讓資料重排與插入不再錯配難度文字。
  const difficulty=track.difficulty||track.subtitle?.split(' / ').slice(1).join(' / ')||'自由挑戰'; // 未指定的新內容仍有可讀標籤，不輸出undefined。
  return `${String(index+1).padStart(2,'0')} / ${difficulty}`; // 保留原三條賽道01至03的HTML文字完全相同。
} // 結束純呈現文字函式，沒有遊戲狀態或主循環。
export function resolveTrackTheme(track){ // 主題取決於明示資料，穩定ID不必綁死美術。
  if(['harbor','skyway','oldtown'].includes(track.theme))return track.theme; // 已知theme優先，即使ID包含其他主題關鍵字。
  const id=typeof track.id==='string'?track.id:''; // 缺少或非字串ID不造成渲染崩潰。
  if(id.includes('old')||id.includes('city'))return 'oldtown'; // 保留舊版城區ID相容fallback。
  if(id.includes('high')||id.includes('sky'))return 'skyway'; // 保留舊版高架ID相容fallback。
  return 'harbor'; // 未知或缺少主題採預設港灣，不猜測新資產路徑。
} // 結束純主題解析，renderer仍負責實際幾何與載入。
