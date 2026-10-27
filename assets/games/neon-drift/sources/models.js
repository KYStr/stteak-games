// Original Neon Drift modular vehicle kit. Metres; +Y up; +Z forward.
// Authoring source is shared by GLTF export and the runtime reconstruction fallback.
export const VEHICLE_SPECS = {
  comet: {name:'COMET / 彗星', length:4.25, width:1.88, roof:1.32, axle:2.62, style:'coupe'},
  stinger: {name:'STINGER / 蜂刺', length:3.72, width:1.79, roof:1.51, axle:2.32, style:'hatch'},
  phantom: {name:'PHANTOM / 幻影', length:4.68, width:1.98, roof:1.23, axle:2.90, style:'longtail'},
};

export function makeVehicle(THREE, id='comet') {
  const spec=VEHICLE_SPECS[id]||VEHICLE_SPECS.comet;
  const root=new THREE.Group(); root.name=`neon-drift-${id}`;
  root.userData={assetId:`neon-drift.vehicle.${id}`,unit:'meter',up:'+Y',forward:'+Z',pivot:'road-center',rig:'vehicle-rigid-v1',collision:`assets/colliders/${id}.json`};
  const paint=new THREE.MeshStandardMaterial({name:'paint',color:0x21e6ce,metalness:.68,roughness:.24});
  const glass=new THREE.MeshStandardMaterial({name:'glass',color:0x0b213b,metalness:.6,roughness:.17});
  const trim=new THREE.MeshStandardMaterial({name:'trim',color:0x101521,metalness:.6,roughness:.38});
  const tire=new THREE.MeshStandardMaterial({name:'rubber',color:0x080a11,roughness:.92});
  const rim=new THREE.MeshStandardMaterial({name:'rim',color:0xc7daec,metalness:.85,roughness:.22});
  const light=new THREE.MeshStandardMaterial({name:'headlight',color:0xdafaff,emissive:0x8adfff,emissiveIntensity:3});
  const brake=new THREE.MeshStandardMaterial({name:'brake',color:0xff305e,emissive:0xff0738,emissiveIntensity:2});
  const decal=new THREE.MeshStandardMaterial({name:'decal',color:0xf3f7fd,metalness:.2,roughness:.38});
  function box(name,w,h,d,x,y,z,mat=paint){const m=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),mat);m.name=name;m.position.set(x,y,z);m.castShadow=true;m.receiveShadow=true;root.add(m);return m;}
  function profile(name, sections, mat){
    const v=[],uv=[],ix=[];
    // Each section is z, half width, lower y, upper y. Four corners form a closed ring.
    sections.forEach(([z,w,b,t],k)=>{v.push(-w,b,z,w,b,z,w,t,z,-w,t,z);uv.push(0,k/(sections.length-1),1,k/(sections.length-1),1,k/(sections.length-1),0,k/(sections.length-1));});
    for(let k=0;k<sections.length-1;k++)for(let j=0;j<4;j++){const a=k*4+j,b=k*4+(j+1)%4,c=(k+1)*4+(j+1)%4,d=(k+1)*4+j;ix.push(a,b,c,a,c,d);}
    ix.push(0,2,1,0,3,2);const e=(sections.length-1)*4;ix.push(e,e+1,e+2,e,e+2,e+3);
    const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(v,3));g.setAttribute('uv',new THREE.Float32BufferAttribute(uv,2));g.setIndex(ix);g.computeVertexNormals();
    const m=new THREE.Mesh(g,mat);m.name=name;m.castShadow=true;m.receiveShadow=true;root.add(m);return m;
  }
  const l=spec.length,w=spec.width;
  box('chassis',w*.9,.22,l*.94,0,.36,0,trim);
  profile('body-shell',[[-l*.5,w*.43,.38,.70],[-l*.33,w*.5,.38,.86],[l*.25,w*.49,.37,.75],[l*.5,w*.41,.38,.56]],paint);
  if(id==='stinger')profile('cabin',[[-1.43,.68,.78,1.39],[-.97,.72,.79,1.51],[.44,.69,.78,1.49],[1.01,.67,.73,.81]],glass);
  else profile('cabin',[[-l*.26,.65,.82,.89],[-l*.12,.69,.79,spec.roof],[l*.12,.64,.75,spec.roof-.04],[l*.27,.61,.72,.79]],glass);
  box('roof-panel',w*.64,.065,id==='stinger'?1.37:1.01,0,spec.roof+.01,id==='stinger'?-.25:-.02);
  for(const side of [-1,1]){
    box(`side-skirt-${side}`, .1,.11,l*.67,side*w*.49,.33,-.03,trim);
    box(`mirror-${side}`,.23,.13,.31,side*w*.55,1.01,.54,trim);
    box(`door-sill-${side}`,.045,.18,1.32,side*w*.49,.70,-.01,paint);
    box(`headlight-${side}`,w*.25,.105,.038,side*w*.285,.61,l*.487,light);
    box(`rear-light-${side}`,w*.28,.09,.045,side*w*.28,.68,-l*.495,brake);
    box(`exhaust-${side}`,.17,.12,.23,side*w*.3,.32,-l*.51,rim);
    const sill=box(`accent-${side}`,.025,.028,l*.58,side*w*.505,.49,-.03,decal);sill.userData.decal=true;
    for(const front of [-1,1]){
      const mount=new THREE.Group();mount.name=`wheel-${front===1?'front':'rear'}-${side===1?'right':'left'}`;mount.position.set(side*w*.49,.35,front*spec.axle*.5);root.add(mount);
      const wheel=new THREE.Mesh(new THREE.CylinderGeometry(.35,.35,.235,16),tire);wheel.rotation.z=Math.PI/2;wheel.name='tire';wheel.castShadow=true;mount.add(wheel);
      const hub=new THREE.Mesh(new THREE.CylinderGeometry(.21,.21,.248,10),rim);hub.rotation.z=Math.PI/2;hub.name='rim';mount.add(hub);
      const inner=new THREE.Mesh(new THREE.CylinderGeometry(.115,.115,.257,6),trim);inner.rotation.z=Math.PI/2;inner.name='hub';mount.add(inner);
      mount.userData={animation:'wheel-spin',steering:front===1,axis:'local-X'};
    }
  }
  box('front-splitter',w*.91,.065,.29,0,.31,l*.47,trim);
  box('rear-diffuser',w*.78,.11,.31,0,.31,-l*.47,trim);
  const wingWidth=id==='phantom'?w*1.04:w*.87;
  for(const side of [-1,1])box(`wing-bracket-${side}`,.07,id==='stinger'?.16:.27,.12,side*w*.29,id==='stinger'?1.39:.98,-l*.40,trim);
  box('rear-wing',wingWidth,.065,.36,0,id==='stinger'?1.49:1.13,-l*.40,paint);
  const stripeGroup=new THREE.Group();stripeGroup.name='decal-stripes';stripeGroup.userData.decal='stripes';root.add(stripeGroup);
  for(const side of [-1,1]){const m=new THREE.Mesh(new THREE.BoxGeometry(.09,.012,l*.19),decal);m.position.set(side*.20,.765,l*.34);m.rotation.x=.16;stripeGroup.add(m);}
  const slashGroup=new THREE.Group();slashGroup.name='decal-slash';slashGroup.userData.decal='slash';root.add(slashGroup);
  for(const side of [-1,1])for(let i=0;i<3;i++){const m=new THREE.Mesh(new THREE.BoxGeometry(.018,.17,.09),decal);m.position.set(side*w*.498,.70,-.25+i*.19);m.rotation.x=-.50;slashGroup.add(m);}
  const circuitGroup=new THREE.Group();circuitGroup.name='decal-circuit';circuitGroup.userData.decal='circuit';root.add(circuitGroup);
  for(const side of [-1,1]){const m=new THREE.Mesh(new THREE.BoxGeometry(.014,.035,1.15),decal);m.position.set(side*w*.501,.80,-.07);circuitGroup.add(m);const n=new THREE.Mesh(new THREE.BoxGeometry(.02,.13,.14),decal);n.position.set(side*w*.505,.74,.43);circuitGroup.add(n);}
  const spinTimes=[0,.25,.5,.75,1],spinValues=spinTimes.flatMap(t=>[Math.sin(-Math.PI*t),0,0,Math.cos(-Math.PI*t)]);
  root.animations=[new THREE.AnimationClip('wheel-spin',1,root.children.filter(n=>n.name.startsWith('wheel-')).map(n=>new THREE.QuaternionKeyframeTrack(`${n.name}.quaternion`,spinTimes,spinValues))),new THREE.AnimationClip('steer-left',.25,root.children.filter(n=>n.name.startsWith('wheel-front')).map(n=>new THREE.QuaternionKeyframeTrack(`${n.name}.quaternion`,[0,.25],[0,0,0,1,0,Math.sin(.225),0,Math.cos(.225)])))];
  return root;
}

export function makeEnvironmentModule(THREE,kind='dock-warehouse'){
  const root=new THREE.Group();root.name=kind;
  const stone=new THREE.MeshStandardMaterial({name:'structure',color:0x27334c,roughness:.71,metalness:.1});
  const neon=new THREE.MeshStandardMaterial({name:'neon',color:0x4cdded,emissive:0x17a8c5,emissiveIntensity:1.7});
  const size=kind==='oldtown-shop'?[9,9,9]:kind==='highway-tower'?[13,38,13]:[21,9,13];
  const block=new THREE.Mesh(new THREE.BoxGeometry(...size),stone);block.position.y=size[1]/2;block.name='structure';root.add(block);
  const crown=new THREE.Mesh(new THREE.BoxGeometry(size[0]+.35,.22,size[2]+.35),neon);crown.position.y=size[1]+.11;crown.name='neon-cornice';root.add(crown);
  root.userData={unit:'meter',up:'+Y',forward:'+Z',pivot:'base-center',dimensions:size,grid:1};return root;
}
