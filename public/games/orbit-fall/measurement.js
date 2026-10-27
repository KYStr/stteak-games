// Local diagnostics only. This module neither changes the run nor sends telemetry.
export function createMeasurementPanel(parent, context) {
  const MAX_FRAMES = 240000, MAX_SNAPSHOTS = 1800;
  let recording = false, frames = [], snapshots = [], startedAt = null, startedClock = 0, lastSnapshot = 0;
  let fpsLimit = null, nextRender = null, lastGateTime = null, throttleChanges = [];
  let downloadUrl = null;
  const panel = document.createElement('aside');
  panel.id = 'measurement-panel';
  const start = document.createElement('button'), report = document.createElement('button'), output = document.createElement('pre');
  const download = document.createElement('button'), downloadLink = document.createElement('a');
  const throttleLabel = document.createElement('label'), throttleSelect = document.createElement('select');
  throttleLabel.textContent = '畫面率限制：'; throttleLabel.htmlFor = 'measurement-fps-limit';
  throttleSelect.id = 'measurement-fps-limit';
  for (const [value, text] of [['unlimited', '不限'], ['30', '30'], ['15', '15']]) {
    const option = document.createElement('option'); option.value = value; option.textContent = text; throttleSelect.append(option);
  }
  throttleSelect.value = 'unlimited';
  const diagnostics = () => ({fpsLimit, source:'visible-diagnostics-select'});
  throttleSelect.onchange = () => {
    fpsLimit = ['30', '15'].includes(throttleSelect.value) ? Number(throttleSelect.value) : null;
    nextRender = null; lastGateTime = null;
    if (recording) throttleChanges.push({seconds:(performance.now()-startedClock)/1000,...diagnostics()});
  };
  start.textContent = '開始量測'; report.textContent = '顯示量測報告';
  download.textContent = '下載完整量測 JSON';
  downloadLink.textContent = '儲存完整量測 JSON'; downloadLink.hidden = true;
  output.id = 'measurement-report'; output.hidden = true;
  output.setAttribute('aria-label', '量測摘要');
  panel.append(start, report, download, downloadLink, throttleLabel, throttleSelect, output); parent.append(panel);
  const summary = () => {
    const sorted = [...frames].sort((a,b) => a-b);
    return {samples:frames.length, activeSeconds:frames.reduce((a,b)=>a+b,0)/1000,
      p50:sorted[Math.floor(sorted.length*.5)]??null, p95:sorted[Math.floor(sorted.length*.95)]??null,
      max:sorted.at(-1)??null};
  };
  const reportSummary = () => ({startedAt, capturedAt:new Date().toISOString(),
    wallSeconds: startedAt ? (performance.now()-startedClock)/1000 : 0,
    note:'Observed intervals between rendered gameplay-active frames; optional visible rAF gate; no GPU timer or synthetic frame samples. Local diagnostics overlay adds work.',
    capped:frames.length===MAX_FRAMES, ...context(), ...summary(), throttle:diagnostics(),
    snapshotCount:snapshots.length, throttleChangeCount:throttleChanges.length});
  const clearDownload = () => {
    if (downloadUrl !== null) URL.revokeObjectURL(downloadUrl);
    downloadUrl = null; downloadLink.hidden = true;
    downloadLink.removeAttribute('href'); downloadLink.removeAttribute('download');
  };
  addEventListener('pagehide', clearDownload);
  start.onclick = () => {
    clearDownload();
    recording = true; frames = []; snapshots = []; startedAt = new Date().toISOString();
    startedClock = performance.now(); lastSnapshot = 0; output.hidden = true; output.textContent = '';
    throttleChanges = [{seconds:0,...diagnostics()}];
    start.textContent = '重新開始量測';
  };
  report.onclick = () => {
    output.hidden = !output.hidden;
    // Keep large raw arrays out of the DOM and accessibility tree.
    if (!output.hidden) output.textContent = JSON.stringify(reportSummary(),null,2);
  };
  download.onclick = () => {
    const data = {...reportSummary(), throttleChanges, snapshots, frameMs:frames};
    const blob = new Blob([JSON.stringify(data)], {type:'application/json'});
    clearDownload();
    downloadUrl = URL.createObjectURL(blob);
    downloadLink.href = downloadUrl;
    downloadLink.download = `orbit-fall-measurement-${(startedAt??new Date().toISOString()).replace(/[:.]/g,'-')}.json`;
    downloadLink.hidden = false;
    downloadLink.click();
  };
  return {
    diagnostics,
    shouldRender(now) {
      // Retain a phase-based deadline: 165Hz input must alternate intervals to
      // achieve 30fps, rather than round every interval up and fall to 27.5fps.
      if (!fpsLimit || !Number.isFinite(now)) { nextRender = null; lastGateTime = null; return true; }
      const interval = 1000 / fpsLimit;
      if (nextRender === null || now < lastGateTime) { nextRender = now + interval; lastGateTime = now; return true; }
      lastGateTime = now;
      if (now + 1e-7 < nextRender) return false;
      // After a suspended tab, skip expired deadlines; never replay a backlog.
      nextRender += (Math.floor((now - nextRender + 1e-7) / interval) + 1) * interval;
      return true;
    },
    frame(ms) {if(recording && frames.length<MAX_FRAMES) frames.push(ms)},
    observe() {
      if(!recording || performance.now()-lastSnapshot<1000 || snapshots.length>=MAX_SNAPSHOTS)return;
      lastSnapshot=performance.now(); snapshots.push({seconds:(lastSnapshot-startedClock)/1000,...context()});
    }
  };
}
