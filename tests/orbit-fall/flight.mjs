import assert from 'node:assert/strict';
export const snapshot=page=>page.evaluate(()=>window.__orbitDiagnostics.snapshot());
export async function press(page,key){if((await snapshot(page)).modal==='interruption'){await page.evaluate(()=>{(window.testHostInterruptions ||= []).push(__orbitDiagnostics.snapshot())});await page.evaluate(()=>document.getElementById('resume').click())}await page.keyboard.press(key);await page.waitForTimeout(120)}
export async function fly(page,goal,{radius=.65,timeout=120000}={}){
  const wallStart=Date.now(),started=performance.now(),initial=await snapshot(page);let last=null,held=new Set();
  try {
    while(performance.now()-started<timeout){
      const s=await snapshot(page);if(s.modal==='interruption'){await page.evaluate(s=>{(window.testHostInterruptions ||= []).push(s)},s);for(const k of held)await page.keyboard.up(k);held.clear();await page.evaluate(()=>document.getElementById('resume').click());continue;}assert.equal(s.modal,null,`Flight interrupted: ${JSON.stringify({modal:s.modal,hidden:s.hidden,longGaps:s.longGaps,elapsed:s.elapsed,simulationSteps:s.simulationSteps})}`);
      const p=s.position,v=s.velocity,d=goal.map((n,i)=>n-p[['x','y','z'][i]]),distance=Math.hypot(...d),speed=Math.hypot(v.x,v.y,v.z);
      if(distance<radius&&speed<.4)return s;
      const wants=new Set();
      if(distance<radius)wants.add('Space');
      else {
        const f=s.forward,fl=Math.hypot(f.x,f.z),fx=f.x/fl,fz=f.z/fl;
        const ax=d[0]*1.5-v.x*1.65,az=d[2]*1.5-v.z*1.65,ay=d[1]*2-v.y*1.8;
        const horizontal=ax*(-fz)+az*fx,forward=ax*fx+az*fz;
        if(Math.abs(horizontal)>.14)wants.add(horizontal>0?'d':'a');
        if(Math.abs(forward)>.14)wants.add(forward>0?'w':'s');
        if(Math.abs(ay)>.14)wants.add(ay>0?'q':'e');
        if(Math.hypot(ax,az)<.2&&Math.abs(ay)<.2)wants.add('Space');
      }
      for(const k of held)if(!wants.has(k))await page.keyboard.up(k);
      for(const k of wants)if(!held.has(k))await page.keyboard.down(k);
      held=wants;last=s;await page.waitForTimeout(100);
    }
    throw Error(`Flight timed out: ${JSON.stringify({goal,wallMs:Date.now()-wallStart,controllerMonotonicMs:performance.now()-started,clockSkewMs:Date.now()-wallStart-(performance.now()-started),simulationSeconds:last?.elapsed-initial.elapsed,frames:last?.renderer.renderCount-initial.renderer.renderCount,lastProgress:last,hostInterrupted:!!last?.longGaps.length})}`);
  } finally {for(const k of held)await page.keyboard.up(k);const clock={wallMs:Date.now()-wallStart,monotonicMs:performance.now()-started};if(Math.abs(clock.wallMs-clock.monotonicMs)>1000)await page.evaluate(clock=>{(window.testClockAdjustments ||= []).push(clock)},clock)}
}
export async function travel(page,id){
  let s=await snapshot(page);if(!s.roomId.endsWith('safe'))await fly(page,[0,1.8,5],{radius:.6});
  await press(page,'m');await page.click(`[data-room="${id}"]`);await page.waitForTimeout(200);assert.equal((await snapshot(page)).roomId,id);
}
export async function device(page,id){
  const s=await snapshot(page),d=s.devices.find(d=>d.id===id);assert.ok(d,`Missing ${id}`);
  const [x,y,z]=d.position;await fly(page,[x,Math.max(1.3,y),z+1.8],{radius:.55});
  await press(page,'f');
}

export async function dock(page,puzzleId,{pointer=false}={}){
 const start=performance.now(),button=page.locator('[data-action=brake]');
 const down=async()=>{if(pointer){const b=await button.boundingBox();await page.mouse.move(b.x+b.width/2,b.y+b.height/2);await page.mouse.down()}else await page.keyboard.down('Space')};
 await down();try{while(performance.now()-start<12000){const s=await snapshot(page);if(s.solvedPuzzles.includes(puzzleId)||s.status==='completed')return;if(s.modal==='interruption'){await page.evaluate(s=>{(window.testHostInterruptions ||= []).push(s)},s);await page.mouse.up();await page.keyboard.up('Space');await page.evaluate(()=>document.getElementById('resume').click());await down()}else assert.equal(s.modal,null);await page.waitForTimeout(100)}throw Error('Docking did not complete: '+JSON.stringify(await snapshot(page)))}finally{await page.mouse.up();await page.keyboard.up('Space')}
}
