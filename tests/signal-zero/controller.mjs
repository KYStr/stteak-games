import {createRun,step,PHYSICS,canSee,toolTarget} from '../../games/signal-zero/src/core.js';
import {LEVELS} from '../../games/signal-zero/src/levels.js';
const advance=(r,s,i,f)=>{for(let n=0;n<s*f;n++)step(r,i,1/f)};
export function traverseMission(index, route = 'ground', startWait = 0, ghost = false, fps = 60, seed) {
  const run = createRun(index,null,seed); if (!ghost) run.tools = [0, 0, 0];
  const level = LEVELS[index];
  const actions = level.terminals.map(t => ({ kind: 'hack', x: t.x, y: t.y, id: t.id }));
  if (route === 'upper') {
    const skipIntro = [-1, 2, 1, 1, 2, 2][index];
    for (const [n, entry] of level.upperEntries.entries()) if (!ghost || n !== skipIntro) actions.push({ kind: 'ladder', x: entry.x, y: entry.y1 });
  }
  actions.push({ kind: 'exit', x: level.exit.x, y: 0 });
  actions.sort((a, b) => a.x - b.x);
  const trace = [];
  const alarms = [];
  const toolUses = [];
  let observationSeconds = 0;
  let elevatedDistance = 0;
  let jumpUntil = 0;
  advance(run, startWait, {}, fps);
  for (const action of actions) {
    let frames = 0;
    while (run.phase === 'playing' && frames++ < fps * 180) {
      const p = run.player;
      const delta = action.x - p.x;
      const near = Math.abs(delta) < .25;
      const coverAhead = level.covers.some(c => Math.abs(c.x - p.x) < 2.3 && (c.x - p.x) * Math.sign(delta) > 0 && p.y < c.y + c.h / 2 - .05 && c.y - c.h / 2 < p.y + PHYSICS.height);
      const guardAhead = run.devices.some(d => d.type === 'guard' && Math.abs(d.x - p.x) < 2.6 && (d.x - p.x) * Math.sign(delta) > 0 && Math.abs(d.y - p.y) < 1.2);
      const support = level.platforms.find(platform => Math.abs(platform.y + platform.h / 2 - p.y) < .06 && p.x >= platform.x - platform.w / 2 - .1 && p.x <= platform.x + platform.w / 2 + .1);
      const edge = support ? support.x + support.w / 2 : Infinity;
      const landing = support && level.platforms.some(platform => platform !== support && platform.x - platform.w / 2 > edge + .05 && platform.x - platform.w / 2 < edge + 3.2 && platform.y + platform.h / 2 >= p.y - 1.5 && platform.y + platform.h / 2 <= p.y + 1.3);
      const gapAhead = p.grounded && landing && edge - p.x < .5 && edge - p.x > -.15;
      if (gapAhead) jumpUntil = run.time + .7;
      const input = { axis: near ? 0 : Math.sign(delta), jumpHeld: run.time < jumpUntil || route === 'upper' || p.y < .9, jumpPressed: p.grounded && !near && (coverAhead || guardAhead || gapAhead), up: near && action.kind !== 'exit' };
      if (ghost) {
        const beam = run.devices.find(device => device.type === 'laser' && !device.rewired && device.disabledUntil <= run.time && device.x - p.x > .8 && device.x - p.x < 2.1 && p.y < device.y + device.range);
        if (beam && (beam.active || beam.cycleRemaining < .75)) { input.axis = 0; input.jumpPressed = false; observationSeconds += 1 / fps; }
        const threat = run.devices.find(device => device.type !== 'laser' && device.disabledUntil <= run.time && !device.rewired && !(device.decoyUntil > run.time) && canSee(run, device));
        if (threat) {
          let selected = threat.type === 'drone' ? 0 : threat.type === 'guard' ? 1 : 2;
          if (threat.type === 'camera' && threat.suspicion > .65 && !toolTarget(run, 2) && run.tools[0] > 0) selected = 0;
          const target = toolTarget(run, selected);
          if (target?.id === threat.id && run.tools[selected] > 0) {
            if (run.selectedTool !== selected) input.cyclePressed = true;
            else input.toolPressed = true;
          }
        }
      }
      const previousX = p.x;
      const events = step(run, input, 1 / fps);
      if (p.y > 3) elevatedDistance += Math.abs(p.x - previousX);
      for (const event of events) {
        if (event.type === 'alarm') alarms.push({ id: event.deviceId, x: +p.x.toFixed(2), time: +run.time.toFixed(2) });
        if (event.type === 'tool') toolUses.push({ tool: event.tool, target: event.target, x: +p.x.toFixed(2), time: +run.time.toFixed(2) });
      }
      if (action.kind === 'hack' && run.objectives.includes(action.id)) break;
      if (action.kind === 'ladder' && Math.abs(p.x - action.x) < 2.5 && p.y >= action.y - .02) break;
      if (run.phase === 'complete') break;
    }
    trace.push({ action: action.kind, x: action.x, actualX: +run.player.x.toFixed(2), y: +run.player.y.toFixed(2), time: +run.time.toFixed(2), alerts: run.alerts, phase: run.phase });
    if (frames >= fps * 180 || run.phase !== 'playing') break;
  }
  return { run, trace, alarms, toolUses, observationSeconds, elevatedDistance };
}
