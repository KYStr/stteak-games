import assert from 'node:assert/strict';
// Keyboard activation is unaffected by moving labels/toasts; still uses trusted input
// and explicitly enforces the destination's enabled state.
export async function activate(page,selector) {
 const button=page.locator(selector).first();
 await button.waitFor({state:'visible'});
 await page.waitForFunction(selector=>!document.querySelector(selector)?.disabled,selector);
 await button.focus();await page.keyboard.press('Enter');
}
export async function settledTravel(page,region) {
 await page.waitForFunction(region=>{const d=window.mossDiagnostics({summary:true});
  return !d.transitioning&&d.region===region&&d.world.sceneRegion===region&&!document.querySelector('#panel').open;
 },region,{timeout:90000});
}
export async function movementProbe(page) {
 const read=()=>page.evaluate(()=>window.mossDiagnostics({summary:true}));
 await page.locator('#world').focus();
 await page.waitForFunction(()=>{const d=window.mossDiagnostics({summary:true});return !d.paused&&!d.transitioning&&d.world.enabled&&!document.querySelector('#panel').open&&document.activeElement.id==='world';});
 let d=await read();
 await page.waitForFunction(frame=>window.mossDiagnostics({summary:true}).world.activeRenderedFrames>frame,d.world.activeRenderedFrames);
 const probes=[];let moved=false;
 for(const key of ['d','a','w','s']) {
  const before=await read();
  try {
   await page.keyboard.down(key);
   await page.waitForFunction(({position,frame})=>{const w=window.mossDiagnostics({summary:true}).world;return w.position.some((v,i)=>v!==position[i])||w.activeRenderedFrames>=frame+8;},{position:before.world.position,frame:before.world.activeRenderedFrames},{timeout:60000});
   d=await read();probes.push({key,before:before.world,after:d.world});
   moved=d.world.position.some((v,i)=>v!==before.world.position[i]);
  } finally {await page.keyboard.up(key);}
  if(moved)break;
 }
 assert.ok(moved,'at least one traversable input direction: '+JSON.stringify(probes));
 const stopped=await read();
 await page.waitForFunction(frame=>window.mossDiagnostics({summary:true}).world.activeRenderedFrames>=frame+3,stopped.world.activeRenderedFrames,{timeout:60000});
 const after=await read();assert.deepEqual(after.world.position,stopped.world.position,'keyup stops movement');assert.equal(after.world.heldKeyCount,0);
 return probes;
}
export async function actionabilityState(page) {
 return page.evaluate(()=>({diagnostics:window.mossDiagnostics?.(),active:document.activeElement?.outerHTML,panel:document.querySelector('#panel')?.outerHTML,canvasInert:document.querySelector('#world')?.inert,keys:window.__inputLog}));
}
