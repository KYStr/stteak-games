import {TRACKS} from '../../games/neon-drift/src/content.js';
import {createRace,stepRace} from '../../games/neon-drift/src/physics.js';
import {loadSave,saveRace} from '../../games/neon-drift/src/storage.js';
import {driveInput,driftInput} from '../games/neon-drift/driver.js';
/** Bounded retained-record fixture, produced only by legal source input simulations. */
export function legalRecordFixture(){
 const values=new Map(),storage={getItem:k=>values.get(k)||null,setItem:(k,v)=>values.set(k,v),removeItem:k=>values.delete(k)};let save=loadSave(storage);
 for(const track of TRACKS)for(const mode of ['time','drift']){const r=createRace({trackId:track.id,mode});for(let i=0;i<305*30&&!r.finished;i++)stepRace(r,mode==='time'?driveInput(r,23):driftInput(r,28),1/30);if(!r.result?.success)throw Error(`Fixture must finish legally: ${track.id} ${mode}`);save=saveRace(save,r,storage).save;}
 return save;
}
