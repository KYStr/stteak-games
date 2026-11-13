import assert from 'node:assert/strict';
// Keep the phase check and existing UI handlers in one browser task: an
// asynchronous blur/frame-gap pause cannot turn a navigation toggle into Resume.
export async function returnToGarage(page){
  await page.evaluate(()=>{
    const phase=()=>window.neonDrift.snapshot({renderer:false}).phase;
    if(phase()==='running')document.querySelector('#pause-button').click();
    if(phase()!=='menu'){
      const button=document.querySelector('#modal[open] [data-action="garage"]');
      if(!button)throw new Error('Expected an open Garage action');
      button.click();
    }
  });
  assert.equal(await page.evaluate(()=>neonDrift.snapshot({renderer:false}).phase),'menu');
}
