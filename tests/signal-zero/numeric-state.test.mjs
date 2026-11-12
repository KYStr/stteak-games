import {test} from 'node:test';
import assert from 'node:assert/strict';
import {createRun,step,checkpointSnapshot,restoreRun} from '../../games/signal-zero/src/core.js';
import {LEVELS} from '../../games/signal-zero/src/levels.js';
import {RUN,PLAYER,DEVICE} from '../../games/signal-zero/src/numeric.js';
test('typed state adapters retain named player/device JSON and do not serialize buffers',()=>{
 const run=createRun(0);run.numeric[RUN.time]=12.345;run.player.numeric[PLAYER.x]=5.125;run.devices[0].numeric[DEVICE.phase]=2.25;
 assert.equal(run.time,12.345);assert.equal(run.player.x,5.125);assert.equal(run.devices[0].phase,2.25);
 run.player.vy=-2.1;assert.equal(run.player.numeric[PLAYER.vy],-2.1);assert.equal(run.devices[0].tripAt,null);
 const player=JSON.parse(JSON.stringify(run.player));assert.equal(player.x,5.125);assert.equal(player.vy,-2.1);assert.ok(!('numeric'in player));
});
test('every serialized checkpoint field round-trips through schema-1 restore',()=>{
 for(let chapter=0;chapter<6;chapter++){
  const run=createRun(chapter,null,9999),level=LEVELS[chapter];run.time=12.125;run.tracePenalty=8;run.traceRemaining=level.traceDeadline-20.125;run.alerts=2;run.alertTime=3.25;
  run.objectives=[level.terminals[0].id];run.tools[0]--;run.selectedTool=2;run.packet=true;run.player.x=level.checkpoints[0].x;run.player.y=level.checkpoints[0].y;
  step(run,{},1/120);const before=checkpointSnapshot(run);assert.ok(before);
  // Safe-checkpoint restore intentionally clears transient suspicion/search.
  for(const device of before.devices){device.state='normal';device.suspicion=0;device.searchRemaining=0;device.lastSeen=null;device.tripAt=null;device.tripLatched=false;}
  const after=checkpointSnapshot(restoreRun(JSON.parse(JSON.stringify(before))));
  assert.deepEqual(after,before,'all named fields, inventory, deadlines and patrol phases chapter '+chapter);
  assert.equal(before.schema,1);assert.ok(!JSON.stringify(before).includes('numeric'));
 }
});
