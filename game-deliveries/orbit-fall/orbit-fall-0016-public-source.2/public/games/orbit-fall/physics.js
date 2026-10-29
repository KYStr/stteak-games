import RAPIER from './vendor/rapier.mjs';
export {RAPIER};
export async function initializePhysics(){await RAPIER.init()}
export class PhysicsRoom {
  constructor(puzzle,snapshot,room={}){
    this.world=new RAPIER.World({x:0,y:0,z:0});this.world.timestep=1/60;this.world.integrationParameters.numSolverIterations=8;this.world.integrationParameters.maxCcdSubsteps=4;
    const wall=(x,y,z,hx,hy,hz)=>this.world.createCollider(RAPIER.ColliderDesc.cuboid(hx,hy,hz).setTranslation(x,y,z).setFriction(.35).setRestitution(.05));
    wall(0,-.3,0,9,.3,8);wall(0,8.3,0,9,.3,8);wall(-9.3,4,0,.3,4,8);wall(9.3,4,0,.3,4,8);wall(0,4,-8.3,9,4,.3);wall(0,4,8.3,9,4,.3);
    this.player=this.world.createRigidBody(RAPIER.RigidBodyDesc.dynamic().setTranslation(0,1.8,5).lockRotations().setLinearDamping(.17).setCcdEnabled(true));
    this.world.createCollider(RAPIER.ColliderDesc.capsule(.38,.36).setMass(1).setFriction(.2).setContactSkin(.06),this.player);
    this.crate=null;this.tethered=false;this.anchored=false;this.target=puzzle?.target;this.steps=0;
    // Visual mesh origins are independent from these simplified static volumes.
    const fixture=(x,y,z,hx,hy,hz)=>wall(x,y,z,hx,hy,hz);
    if(room.type==='safe'){fixture(-5,1.3,-3,1,1.3,.7);fixture(3,1.05,-2,.78,1.05,.55)}
    if(room.signalId)fixture(-5,1.05,3,.78,1.05,.55);
    if(room.endingTerminal)fixture(3,1.3,-3,1,1.3,.8);
    if(puzzle?.type==='reflection')for(const [x,y,z]of puzzle.mirrorPositions){fixture(x,y/2,z,.16,y/2,.16);fixture(x,y,z,.72,.75,.16)}
    if(puzzle?.type==='airlock')for(const [x,y,z]of puzzle.valvePositions)fixture(x,y-.5,z,.78,1.05,.55);
    if(puzzle?.type==='momentum'){
      const pos=snapshot?.objects?.find(x=>x.id==='crate-battery')?.position||puzzle.crateStart;
      this.crate=this.world.createRigidBody(RAPIER.RigidBodyDesc.dynamic().setTranslation(...pos).setLinearDamping(.26).setAngularDamping(2).lockRotations().setCcdEnabled(true));
      this.world.createCollider(RAPIER.ColliderDesc.cuboid(.55,.55,.55).setMass(1.6).setFriction(.2).setRestitution(.05).setContactSkin(.04),this.crate);
    }
  }
  step(input,{assist=true,hazard=null,time=0}={}){
    const p=this.player.translation();let v=this.player.linvel();
    const wallNear=p.y<1.6||p.y>6.5||Math.abs(p.x)>7.2||Math.abs(p.z)>6.2;
    if(this.anchored&&!wallNear)this.anchored=false;
    const dt=1/60, a=7.5;
    let next={x:v.x+input.x*a*dt,y:v.y+input.y*a*dt,z:v.z+input.z*a*dt};
    if(assist&&!input.y)next.y*=.965;
    if(input.brake||this.anchored){const f=this.anchored?0.25:0.88;next={x:next.x*f,y:next.y*f,z:next.z*f}}
    if(this.anchored)next={x:0,y:0,z:0};
    if(hazard==='leak'&&p.x>4&&p.z<1){next.x+=.75*dt;next.z-=.35*dt}
    const speed=Math.hypot(next.x,next.y,next.z),max=4.2;if(speed>max)for(const k of ['x','y','z'])next[k]*=max/speed;
    this.player.setLinvel(next,true);
    if(this.tethered&&this.crate){
      const c=this.crate.translation(),cv=this.crate.linvel();const dx=p.x-c.x,dy=p.y-c.y,dz=p.z-c.z;const dist=Math.hypot(dx,dy,dz);
      if(dist>5.5)this.tethered=false;
      else {
        // Critically damped velocity spring, bounded to prevent high-energy impulses.
        const goal=this.target&&Math.hypot(c.x-this.target[0],c.y-this.target[1],c.z-this.target[2])<1.9&&input.brake?{x:this.target[0],y:this.target[1],z:this.target[2]}:{x:p.x,y:p.y,z:p.z-1.3};
        let nv={x:cv.x+((goal.x-c.x)*7-cv.x*4)*dt,y:cv.y+((goal.y-c.y)*7-cv.y*4)*dt,z:cv.z+((goal.z-c.z)*7-cv.z*4)*dt};
        const cs=Math.hypot(nv.x,nv.y,nv.z);if(cs>4.6)for(const k of ['x','y','z'])nv[k]*=4.6/cs;
        this.crate.setLinvel(nv,true);
      }
    }
    this.world.step();this.steps++;return {wallNear,speed:Math.hypot(...Object.values(this.player.linvel()))};
  }
  magnet(){const p=this.player.translation();if(this.anchored){this.anchored=false;return true}if(p.y<1.4||p.y>6.7||Math.abs(p.x)>7.4||Math.abs(p.z)>6.4){this.anchored=true;return true}return false}
  tether(){if(!this.crate)return 'missing';if(this.tethered){this.tethered=false;return 'released'}const a=this.player.translation(),b=this.crate.translation();if(Math.hypot(a.x-b.x,a.y-b.y,a.z-b.z)>4.2)return 'far';this.tethered=true;return 'attached'}
  reset(puzzle){if(this.crate){this.crate.setTranslation({x:puzzle.crateStart[0],y:puzzle.crateStart[1],z:puzzle.crateStart[2]},true);this.crate.setLinvel({x:0,y:0,z:0},true)}this.tethered=false}
  snapshot(){if(!this.crate)return {objects:[]};const p=this.crate.translation();return {objects:[{id:'crate-battery',position:[p.x,p.y,p.z],rotation:[0,0,0,1]}]}}
  dispose(){this.world.free()}
}
