import RAPIER from './vendor/rapier.mjs';
export {RAPIER};
export async function initializePhysics(){await RAPIER.init()}
// Typed stores keep recurring numeric writes unboxed. Object views are read by
// HUD/render/save callers and retain the public x/y/z snapshot contract.
function vectorStore(){const values=new Float64Array(3),view={};for(const [i,key] of ['x','y','z'].entries())Object.defineProperty(view,key,{enumerable:true,get(){return values[i]}});return {values,view}}
function readVector(body,velocity,out){
 const method=velocity?body.rawSet.rbLinvelInto:body.rawSet.rbTranslationInto;
 if(method){method.call(body.rawSet,body.handle,out);return}
 const value=velocity?body.linvel():body.translation();out[0]=value.x;out[1]=value.y;out[2]=value.z;
}
function ownVelocity(body){return RAPIER.VectorOps.intoRaw({x:0,y:0,z:0})}
function setVelocity(body,raw,values){raw.x=values[0];raw.y=values[1];raw.z=values[2];body.rawSet.rbSetLinvel(body.handle,raw,true)}
export class PhysicsRoom {
  constructor(puzzle,snapshot,room={}){
    this.world=new RAPIER.World({x:0,y:0,z:0});this.rawGravity=RAPIER.VectorOps.intoRaw(this.world.gravity);this.world.timestep=1/60;this.world.integrationParameters.numSolverIterations=8;this.world.integrationParameters.maxCcdSubsteps=4;
    const wall=(x,y,z,hx,hy,hz)=>this.world.createCollider(RAPIER.ColliderDesc.cuboid(hx,hy,hz).setTranslation(x,y,z).setFriction(.35).setRestitution(.05));
    wall(0,-.3,0,9,.3,8);wall(0,8.3,0,9,.3,8);wall(-9.3,4,0,.3,4,8);wall(9.3,4,0,.3,4,8);wall(0,4,-8.3,9,4,.3);wall(0,4,8.3,9,4,.3);
    this.player=this.world.createRigidBody(RAPIER.RigidBodyDesc.dynamic().setTranslation(0,1.8,5).lockRotations().setLinearDamping(.17).setCcdEnabled(true));
    this.world.createCollider(RAPIER.ColliderDesc.capsule(.38,.36).setMass(1).setFriction(.2).setContactSkin(.06).setCollisionGroups(0x0001ffff),this.player);
    if(snapshot?.player)this.player.setTranslation({x:snapshot.player[0],y:snapshot.player[1],z:snapshot.player[2]},true);
    this.crate=null;this.crateCollider=null;this.collisionTethered=false;this.persistedObjects=snapshot?.objects||[];this.objects=[];this.tethered=false;this.anchored=false;this.target=puzzle?.target;this.steps=0;this.next={x:0,y:0,z:0};this.cargoNext={x:0,y:0,z:0};this.railGoal=null;this.puzzle=puzzle;
    // Visual mesh origins are independent from these simplified static volumes.
    const fixture=(x,y,z,hx,hy,hz)=>wall(x,y,z,hx,hy,hz);
    if(room.type==='safe'){fixture(-5,1.3,-3,1,1.3,.7);fixture(3,1.05,-2,.78,1.05,.55)}
    if(room.signalId)fixture(-5,1.05,3,.78,1.05,.55);
    if(room.endingTerminal)fixture(3,1.3,-3,1,1.3,.8);
    if(puzzle?.type==='reflection')for(const [x,y,z]of puzzle.mirrorPositions){fixture(x,y/2,z,.16,y/2,.16);fixture(x,y,z,.72,.75,.16)}
    if(puzzle?.requiresIsolation)fixture(0,1,4,.78,1.05,.55);
    if(puzzle?.type==='airlock')for(const [x,y,z]of puzzle.valvePositions)fixture(x,y-.5,z,.78,1.05,.55);
    if(puzzle?.type==='momentum'){
      const objects=puzzle.objects||[{id:'crate-battery',start:puzzle.crateStart}];
      for(const object of objects){
        const pos=snapshot?.objects?.find(x=>x.id===object.id)?.position||object.start;
        const body=this.world.createRigidBody(RAPIER.RigidBodyDesc.dynamic().setTranslation(...pos).setLinearDamping(.26).setAngularDamping(2).lockRotations().setCcdEnabled(true));
        const collider=this.world.createCollider(RAPIER.ColliderDesc.cuboid(.55,.55,.55).setMass(puzzle.stage?.cargoMass||1.6).setFriction(.2).setRestitution(.05).setContactSkin(.04).setCollisionGroups(0x0002ffff),body);
        this.objects.push({id:object.id,body,positionStore:vectorStore(),velocityStore:vectorStore(),rawVelocity:ownVelocity(body)});if(object.id===(puzzle.activeObjectId||'crate-battery')){this.crate=body;this.activeObject=this.objects.at(-1);this.crateCollider=collider;}
      }
    }
    this.positionStore=vectorStore();this.velocityStore=vectorStore();this.playerPosition=this.positionStore.view;this.playerVelocity=this.velocityStore.view;this.rawVelocity=ownVelocity(this.player);this.next=new Float64Array(3);this.cargoNext=new Float64Array(3);for(const o of this.objects){o.position=o.positionStore.view;o.velocity=o.velocityStore.view}this.cratePosition=null;this.crateVelocity=null;
    this.refreshSnapshots(true);
  }

  // Optional guarded adapter copies native components into owned typed stores.
  refreshSnapshots(force=false){
    readVector(this.player,false,this.positionStore.values);readVector(this.player,true,this.velocityStore.values);
    for(let i=0;i<this.objects.length;i++){const o=this.objects[i],active=o.body===this.crate;if(force||!o.body.isSleeping()){readVector(o.body,false,o.positionStore.values);if(active)readVector(o.body,true,o.velocityStore.values)}if(active){this.cratePosition=o.position;this.crateVelocity=o.velocity}}
  }

  // The tow spring can cross the suit when a crate starts behind it. Ignoring
  // only this contact avoids a self-propelling pair while holding brake. Walls
  // and every other cargo retain their normal collision filters.
  syncTetherCollision(){if(!this.crateCollider||this.collisionTethered===this.tethered)return;this.crateCollider.setCollisionGroups(this.tethered?0x0002fffe:0x0002ffff);this.collisionTethered=this.tethered;}

  step(input,{assist=true,hazard=null,time=0}={}){
    const p=this.positionStore.values,v=this.velocityStore.values;
    const wallNear=p[1]<1.6||p[1]>6.5||Math.abs(p[0])>7.2||Math.abs(p[2])>6.2;
    if(this.anchored&&!wallNear&&!this.railGoal)this.anchored=false;
    const dt=1/60, a=7.5;
    const next=this.next;next[0]=v[0]+input.x*a*dt;next[1]=v[1]+input.y*a*dt;next[2]=v[2]+input.z*a*dt;
    if(assist&&!input.y)next[1]*=.965;
    if(input.brake||this.anchored){const f=this.anchored?0.25:0.88;next[0]*=f;next[1]*=f;next[2]*=f}
    if(this.anchored){next[0]=next[1]=next[2]=0;
      if(this.railGoal){next[0]=(this.railGoal[0]-p[0])*2;next[1]=(this.railGoal[1]-p[1])*2;next[2]=(this.railGoal[2]-p[2])*2;const rs=Math.hypot(next[0],next[1],next[2]);if(rs>2){next[0]*=2/rs;next[1]*=2/rs;next[2]*=2/rs}}
    }
    if(hazard==='leak'&&p[0]>4&&p[2]<1){next[0]+=.75*dt;next[2]-=.35*dt}
    const speed=Math.hypot(next[0],next[1],next[2]),max=4.2;if(speed>max){next[0]*=max/speed;next[1]*=max/speed;next[2]*=max/speed}
    setVelocity(this.player,this.rawVelocity,next);
    if(this.tethered&&this.crate){
      const active=this.activeObject,c=active.positionStore.values,cv=active.velocityStore.values;const dx=p[0]-c[0],dy=p[1]-c[1],dz=p[2]-c[2];const dist=Math.hypot(dx,dy,dz);
      if(dist>5.5)this.tethered=false;
      else {
        // Critically damped velocity spring, bounded to prevent high-energy impulses.
        const dock=this.target&&Math.hypot(c[0]-this.target[0],c[1]-this.target[1],c[2]-this.target[2])<1.9&&(input.brake||this.anchored);
        const gx=dock?this.target[0]:p[0],gy=dock?this.target[1]:p[1],gz=dock?this.target[2]:p[2]-1.3;
        const nv=this.cargoNext;nv[0]=cv[0]+((gx-c[0])*7-cv[0]*4)*dt;nv[1]=cv[1]+((gy-c[1])*7-cv[1]*4)*dt;nv[2]=cv[2]+((gz-c[2])*7-cv[2]*4)*dt;
        const cs=Math.hypot(nv[0],nv[1],nv[2]);if(cs>4.6){nv[0]*=4.6/cs;nv[1]*=4.6/cs;nv[2]*=4.6/cs}
        setVelocity(this.crate,this.activeObject.rawVelocity,nv);
      }
    }
    this.syncTetherCollision();const w=this.world;w.physicsPipeline.raw.step(this.rawGravity,w.integrationParameters.raw,w.islands.raw,w.broadPhase.raw,w.narrowPhase.raw,w.bodies.raw,w.colliders.raw,w.impulseJoints.raw,w.multibodyJoints.raw,w.ccdSolver.raw);this.steps++;this.refreshSnapshots();
  }
  magnet(){const p=this.player.translation();if(this.anchored){this.anchored=false;this.railGoal=null;return true}if(p.y<1.4||p.y>6.7||Math.abs(p.x)>7.4||Math.abs(p.z)>6.4){this.anchored=true;return true}return false}
  tether(){if(!this.crate)return 'missing';if(this.tethered){this.tethered=false;return 'released'}const a=this.player.translation(),b=this.crate.translation();if(Math.hypot(a.x-b.x,a.y-b.y,a.z-b.z)>4.2)return 'far';this.tethered=true;return 'attached'}
  reset(puzzle){if(this.crate){this.crate.setTranslation({x:puzzle.crateStart[0],y:puzzle.crateStart[1],z:puzzle.crateStart[2]},true);this.crate.setLinvel({x:0,y:0,z:0},true)}this.tethered=false;this.refreshSnapshots(true)}
  rail(index){if(!this.puzzle?.railPoints||!this.crate)return false;this.anchored=true;this.railGoal=this.puzzle.railPoints[index];this.tethered=true;return true}
  snapshot(){const a=this.player.translation();return {player:[a.x,a.y,a.z],objects:this.objects.length?this.objects.map(o=>{const p=o.body.translation();return {id:o.id,position:[p.x,p.y,p.z],rotation:[0,0,0,1]}}):this.persistedObjects}}

  dispose(){this.rawGravity.free();this.rawVelocity.free();for(const o of this.objects)o.rawVelocity.free();this.world.free()}
}
