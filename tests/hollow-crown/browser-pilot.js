// Acceptance controller: reads copied diagnostics and sends ordinary keyboard/menu input.
// Exact threat geometry is used here; this is automation evidence, not a human playtest.
export async function installPilot(page) {
  await page.evaluate(async () => {
    const {findPath, lineClear, shapeHits}=await import('./rules.js');
    const held=new Set();let stopped=false,lastTime=0,path=[],pathAge=0,lastRoom='',lastStep=-1;
    const key=(code,down)=>{if(held.has(code)===down)return;if(down)held.add(code);else held.delete(code);window.dispatchEvent(new KeyboardEvent(down?'keydown':'keyup',{code,key:code==='Space'?' ':code.replace('Key','').toLowerCase(),bubbles:true}));};
    const release=()=>{for(const code of [...held])key(code,false);};
    window.acceptancePilot={stop(){stopped=true;release();},completed:[],failures:[],rooms:[],ticks:0};
    function tick(){
      if(stopped)return;requestAnimationFrame(tick);
      const snap=hollowCrownDiagnostics.snapshot(),s=snap.run, pilot=window.acceptancePilot;pilot.ticks++;
      if(!s||snap.paused){release();return;}
      if(s.phase==='result'){release();if(!pilot.completed.some(r=>r.runId===snap.runId))pilot.completed.push({runId:snap.runId,won:s.result?.won,tutorial:!!s.tutorial,rooms:s.roomHistory.length,hits:s.stats.hits,time:s.time});return;}
      if(snap.overlay){release();
        if(s.phase==='reward'){document.querySelector('[data-action="reward"][data-id="restore"]')?.click();}
        if(s.phase==='route'){
          const story=document.querySelector('[data-action="story"]');if(story){story.click();return;}
          document.querySelector('[data-action="room"]')?.click();
        }return;
      }
      if(lastRoom!==s.room.id+':'+s.roomIndex){lastRoom=s.room.id+':'+s.roomIndex;pilot.rooms.push({id:s.room.id,index:s.roomIndex});path=[];pathAge=0;release();}
      const dt=Math.max(0,Math.min(.15,s.time-lastTime));lastTime=s.time;pathAge-=dt;
      const p=s.player,enemies=s.enemies.filter(e=>e.hp>0).sort((a,b)=>Math.hypot(a.x-p.x,a.z-p.z)-Math.hypot(b.x-p.x,b.z-p.z)),target=enemies[0]||s.objective?.targets?.filter(t=>!t.done).map(t=>({...t,type:s.objective.kind==='seals'?'seal':'beacon',radius:.65,id:t.id})).sort((a,b)=>Math.hypot(a.x-p.x,a.z-p.z)-Math.hypot(b.x-p.x,b.z-p.z))[0];
      if(!target){release();return;}
      const dx=target.x-p.x,dz=target.z-p.z,d=Math.hypot(dx,dz)||1;
      let mx=dx/d,mz=dz/d,attack=false,block=false,dodge=false,charge=false;
      const desired=target.type==='beacon'?0:target.type==='seal'?2.4:s.tutorial?.step===3?1.35:target.type==='shield'?3.3:['regent','arbiter'].includes(target.type)?3.5:target.type==='spear'?2.8:2.65;
      if(d<desired-.2){mx=-mx;mz=-mz;}else if(d<desired+.18){mx=0;mz=0;}
      const goal=target.type==='seal'?{x:target.x-dx/d*2.4,z:target.z-dz/d*2.4}:target;if(!lineClear(s.room,p.x,p.z,goal.x,goal.z,p.radius+.05)){
        if(pathAge<=0||!path.length){path=findPath(s.room,p,goal,p.radius);pathAge=.4;}
        while(path.length>1&&Math.hypot(path[0].x-p.x,path[0].z-p.z)<.4)path.shift();
        if(path[0]){const n=Math.hypot(path[0].x-p.x,path[0].z-p.z)||1;mx=(path[0].x-p.x)/n;mz=(path[0].z-p.z)/n;}
      }
      const visibleWarnings=enemies.slice();if(s.objective?.attack&&['telegraph','attack'].includes(s.objective.phase))visibleWarnings.push({id:'hazard',type:'hazard',x:s.objective.attack.x,z:s.objective.attack.z,attack:s.objective.attack,state:s.objective.phase,timer:s.objective.timer});
      const threats=visibleWarnings.filter(e=>e.attack&&['telegraph','attack'].includes(e.state)&&e.timer<.48&&shapeHits(e.attack,p,p.radius+.25));
      if(threats.length){const threat=threats[0],blockable=['soldier','spear','shield','royal-sweep','sentence'].includes(threat.attack.source);
        if(blockable&&threat.timer<.24&&threats.length===1&&p.actionTime<.05){block=true;mx=0;mz=0;}
        else if(p.energy>=s.modifiers.dodgeCost&&p.action!=='dodge'&&threat.timer<.24){
          let best=null;for(let i=0;i<16;i++){const a=i*Math.PI/8,x=p.x+Math.sin(a)*3.1,z=p.z+Math.cos(a)*3.1;if(Math.abs(x)>8.9||Math.abs(z)>8.9||!lineClear(s.room,p.x,p.z,x,z,p.radius))continue;
            const score=threats.filter(e=>shapeHits(e.attack,{x,z,radius:p.radius})).length*100+Math.abs(Math.hypot(x-target.x,z-target.z)-desired);
            if(!best||score<best.score)best={score,x:Math.sin(a),z:Math.cos(a)};
          }if(best){mx=best.x;mz=best.z;dodge=true;}
        }
      }
      if(!dodge&&!block&&!threats.length&&target.type!=='beacon'){
        if(target.type==='shield'&&target.shieldBroken<=0){charge=d<4.5&&(held.has('KeyJ')||p.cooldown<=0);if(p.heldTime>=.82)charge=false;}
        else if(d<3.3+target.radius&&p.cooldown<=0)attack=true;
      }
      if(s.tutorial){
        if(s.tutorial.step===0){mx=0;mz=-1;}
        if(s.tutorial.step===2){dodge=true;mx=1;mz=0;}
        if(s.tutorial.step===3){attack=false;charge=false;}
        if(lastStep!==s.tutorial.step){lastStep=s.tutorial.step;release();}
      }
      key('KeyD',mx>.3);key('KeyA',mx<-.3);key('KeyS',mz>.3);key('KeyW',mz<-.3);
      key('KeyK',block);key('Space',dodge);
      if(charge)key('KeyJ',true);else{key('KeyJ',false);if(attack){key('KeyJ',true);}}
    }
    requestAnimationFrame(tick);
  });
}
