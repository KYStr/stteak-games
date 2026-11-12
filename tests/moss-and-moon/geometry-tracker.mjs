// Test-only bootstrap: intercept exactly Three r180's residency registration, without
// adding listeners or changing the runtime/vendor modules on disk.
export async function installGeometryTracker(page) {
  await page.route('**/__geometry-bootstrap.mjs', route => route.fulfill({contentType:'text/javascript',body:`
import {BufferGeometry} from './vendor/three.core.js';
const add=BufferGeometry.prototype.addEventListener, dispose=BufferGeometry.prototype.dispose;
const registered=new Map();
BufferGeometry.prototype.addEventListener=function(type,fn){
 if(type==='dispose'&&fn.name==='onGeometryDispose'&&!registered.has(this.id))
  registered.set(this.id,{id:this.id,uuid:this.uuid,type:this.type,name:this.name,
   vertices:this.attributes.position?.count??0,indices:this.index?.count??0,
   firstSeen:performance.now(),registrationStack:new Error().stack});
 return add.apply(this,arguments);
};
BufferGeometry.prototype.dispose=function(){registered.delete(this.id);return dispose.apply(this,arguments);};
window.__geometryTracker={snapshot:()=>Array.from(registered.values()),restore(){
 BufferGeometry.prototype.addEventListener=add;BufferGeometry.prototype.dispose=dispose;
}};
await import('./main.js');` }));
  await page.route('**/games/moss-and-moon/', async route => {
    const response=await route.fetch();
    await route.fulfill({response,body:(await response.text()).replace('src="./main.js"','src="./__geometry-bootstrap.mjs"')});
  });
}
export function residencyDelta(before,after) {
  const a=new Set(before.map(g=>g.id)),b=new Set(after.map(g=>g.id));
  const added=after.filter(g=>!a.has(g.id)),removed=before.filter(g=>!b.has(g.id));
  return {addedIds:added.map(g=>g.id),removedIds:removed.map(g=>g.id),added,removed};
}
