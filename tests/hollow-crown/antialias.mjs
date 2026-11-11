import {writeFile} from 'node:fs/promises';
import {origin,artifact,harness} from './test-config.mjs';
const runner=await harness(),report=[];
try {
 for(const antialias of [true,false]) {
  const page=await runner.browser.newPage({viewport:{width:1280,height:720}});await page.goto(origin);
  await page.evaluate(async antialias=>{const {SceneView}=await import('/games/hollow-crown/scene.js'),{startTutorial}=await import('/games/hollow-crown/rules.js');document.body.style.margin='0';const canvas=document.createElement('canvas');canvas.style.cssText='width:1280px;height:720px';document.body.replaceChildren(canvas);window.probeView=new SceneView(canvas,{antialias});const s=startTutorial();let last=performance.now();window.aaRaw=[];window.aaStop=false;function tick(t){if(aaStop)return;requestAnimationFrame(tick);const dt=t-last;last=t;aaRaw.push(dt);probeView.recordFrame(dt);probeView.render(s,dt/1000);}requestAnimationFrame(tick);},antialias);
  await page.waitForTimeout(5000);await page.evaluate(()=>aaRaw.length=0);await page.waitForTimeout(30000);
  const result=await page.evaluate(()=>{aaStop=true;const sorted=[...aaRaw].sort((a,b)=>a-b);return{raw:aaRaw,avg:aaRaw.reduce((a,b)=>a+b,0)/aaRaw.length,p95:sorted[Math.floor(sorted.length*.95)],render:probeView.metrics()};});report.push({antialias,...result});await page.screenshot({path:artifact('antialias-'+antialias+'.png')});console.log(JSON.stringify({antialias,avg:result.avg,p95:result.p95,draws:result.render.drawCalls}));await page.evaluate(()=>probeView.dispose());await page.close();
 }
}finally{await writeFile(artifact('antialias.json'),JSON.stringify(report,null,2));await runner.cleanup();}
