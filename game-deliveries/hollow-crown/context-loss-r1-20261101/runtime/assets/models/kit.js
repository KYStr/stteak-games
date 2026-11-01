/** Hollow Crown original parametric asset kit. Metres; +Y up, +Z forward; origin at feet.
 * Rigid meshes are bound to THREE.Bone joints. Optional local procedural PBR stone textures.
 * Source of runtime assets/models/kit.js and reusable glTF files; run recipes/export-assets.mjs.
 */
export const KIT_VERSION = '1.0.0';
export const PALETTE = { ivory: 0xddd5bd, steel: 0x58656a, soot: 0x354348, charcoal: 0x152026, ember: 0xea6b3c, gold: 0xb8995f, cloth: 0x582e2a, stone: 0x454c4c };
export const ACTOR_IDS = ['guardian','infantry','lancer','arbalest','cinderbug','shieldguard','crown','bellwarden'];
const RADII={guardian:.43,infantry:.48,lancer:.48,arbalest:.42,cinderbug:.4,shieldguard:.6,crown:.9,bellwarden:.86};
export const COLLIDERS = Object.fromEntries(ACTOR_IDS.map(id => [id, { shape: 'vertical-capsule', radius: RADII[id], height: id === 'crown' ? 2.65 : id === 'bellwarden' ? 2.5 : id === 'cinderbug' ? .8 : 1.75, center: [0, id === 'cinderbug' ? .4 : id === 'crown' ? 1.325 : id === 'bellwarden' ? 1.25 : .875, 0] }]));

export function createKit(T, options={}) {
  const shared = { materials: new Map(), geometries: new Map(), textures:[] };
  const mat = (name, color, metalness = .2, roughness = .7, extra = {}) => {
    if (!shared.materials.has(name)) { const m = new T.MeshStandardMaterial({ color, metalness, roughness, ...extra }); m.name = name; shared.materials.set(name, m); }
    return shared.materials.get(name);
  };
  const materials = {
    ivory: mat('ivory-enamel', PALETTE.ivory, .38, .43), steel: mat('blue-tempered-steel', PALETTE.steel, .7, .4),
    soot: mat('charcoal-steel', PALETTE.soot, .55, .53), black: mat('joint-leather', 0x141b1d, .05, .92),
    gold: mat('old-brass', PALETTE.gold, .7, .38), cloth: mat('oxblood-cloth', PALETTE.cloth, .02, .95),
    ember: mat('living-ember', PALETTE.ember, .25, .45, {emissive: 0xf24920, emissiveIntensity: .8}),
    stone: mat('basalt-stone', PALETTE.stone, .06, .95), ash: mat('ash-stone', 0x777669, .08, .88),
    wax: mat('candle-wax', 0xd8c69c, .01, .89), flame: mat('candle-flame', 0xffca83, .01, .5, {emissive:0xff7733,emissiveIntensity:2.2}),
    clothIvory: mat('ivory-cloth', 0xb2a88a, .02, .98), crystal: mat('ember-glass', 0xe97a47,.3,.24,{emissive:0xab3519,emissiveIntensity:.5}),
  };
  if(options.textureBaseUrl){
    const loader=new T.TextureLoader(),stoneMaterials=[materials.stone,materials.ash];let failed=false;
    for(const m of stoneMaterials)m.userData.stoneFallbackRoughness=m.roughness;
    const failure=file=>{
      if(shared.disposed)return;failed=true;
      for(const m of stoneMaterials){m.map=null;m.normalMap=null;m.roughnessMap=null;m.roughness=m.userData.stoneFallbackRoughness;m.needsUpdate=true;}
      options.onTextureError?.(file);
    };
    const load=(file,srgb=false)=>{const t=loader.load(new URL(file,options.textureBaseUrl).href,undefined,undefined,()=>failure(file));t.wrapS=t.wrapT=T.RepeatWrapping;t.colorSpace=srgb?T.SRGBColorSpace:T.NoColorSpace;t.anisotropy=4;shared.textures.push(t);return t;};
    const base=load('ruin-stone-basecolor.png',true),normal=load('ruin-stone-normal.png'),rough=load('ruin-stone-roughness.png');
    if(!failed)for(const m of stoneMaterials){m.map=base;m.normalMap=normal;m.normalScale.set(.75,.75);m.roughnessMap=rough;m.roughness=1;}
  }
  const geo = (key, make) => { if (!shared.geometries.has(key)) shared.geometries.set(key,make()); return shared.geometries.get(key); };
  const box = () => geo('box',()=>new T.BoxGeometry(1,1,1));
  const stoneBlock = () => geo('bevelled-stone',()=>{const s=new T.Shape();s.moveTo(-.42,-.42);s.lineTo(.42,-.42);s.lineTo(.42,.42);s.lineTo(-.42,.42);s.closePath();const g=new T.ExtrudeGeometry(s,{depth:.84,bevelEnabled:true,bevelSegments:1,steps:1,bevelSize:.08,bevelThickness:.08,curveSegments:1});g.translate(0,0,-.42);return g;});
  const cyl = (n=8) => geo('cylinder'+n,()=>new T.CylinderGeometry(1,1,1,n));
  const cone = (n=6) => geo('cone'+n,()=>new T.ConeGeometry(1,1,n));
  const sphere = () => geo('sphere',()=>new T.SphereGeometry(1,10,6));
  function mesh(parent,name,geometry,material,pos=[0,0,0],scale=[1,1,1],rot=[0,0,0]) {
    if(geometry===box()&&(material===materials.stone||material===materials.ash))geometry=stoneBlock();
    const m = new T.Mesh(geometry,material); m.name=name; m.position.set(...pos); m.scale.set(...scale);m.rotation.set(...rot);m.castShadow=true;m.receiveShadow=true;parent.add(m);return m;
  }
  function bone(parent,name,pos) { const b=new T.Bone();b.name=name;b.position.set(...pos);parent.add(b);return b; }
  function spear(parent,name='weapon-spear',long=1) {
    const g=new T.Group();g.name=name;parent.add(g);
    mesh(g,'ashwood-shaft',cyl(8),materials.soot,[0,0,1.15*long],[.035,.035,2.85*long],[Math.PI/2,0,0]);
    // Cylinder has a Y axis; scale along its original Y before rotation.
    const shaft=g.children[0];shaft.scale.set(.035,2.85*long,.035);
    mesh(g,'ivory-grip',cyl(8),materials.ivory,[0,0,.05],[.047,.5,.047],[Math.PI/2,0,0]);
    mesh(g,'spearhead',cone(4),materials.ivory,[0,0,2.72*long],[.14,.66,.07],[Math.PI/2,0,0]);
    mesh(g,'spear-collar',cyl(8),materials.gold,[0,0,2.42*long],[.07,.12,.07],[Math.PI/2,0,0]);
    return g;
  }
  function shield(parent,large=false) {
    const g=new T.Group();g.name='shield';parent.add(g);g.rotation.y=-.35;
    mesh(g,'shield-face',box(),materials.soot,[0,0,.1],[large?.82:.49,large?1.16:.66,.11]);
    mesh(g,'shield-edge-top',box(),materials.gold,[0,large?.56:.31,.16],[large?.88:.54,.07,.09]);
    mesh(g,'shield-edge-bottom',box(),materials.gold,[0,large?-.56:-.31,.16],[large?.88:.54,.07,.09]);
    mesh(g,'shield-spine',box(),materials.ivory,[0,0,.19],[.09,large?1.16:.67,.05]);
    mesh(g,'shield-boss',sphere(),materials.gold,[0,0,.21],[.12,.12,.07]);
    return g;
  }
  function makeActor(id='guardian',options={}) {
    if(!ACTOR_IDS.includes(id))id='infantry';
    const actor=new T.Group();actor.name='hollow-crown-'+id;actor.userData={assetId:'hollow-crown.character.'+id,kitVersion:KIT_VERSION,collider:COLLIDERS[id],rigType:'rigid-bone',rootMotion:false};
    const root=bone(actor,'root',[0,0,0]);const hips=bone(root,'hips',[0,.82,0]);
    const spine=bone(hips,'spine',[0,.23,0]);const head=bone(spine,'head',[0,.48,0]);
    const armL=bone(spine,'arm-l',[-.35,.29,0]),armR=bone(spine,'arm-r',[.35,.29,0]);
    const foreL=bone(armL,'forearm-l',[0,-.29,0]),foreR=bone(armR,'forearm-r',[0,-.29,0]);
    const handL=bone(foreL,'hand-l',[0,-.24,.05]),handR=bone(foreR,'hand-r',[0,-.24,.05]);
    const mount=bone(handR,'weapon-mount',[0,0,0]);
    const legL=bone(hips,'leg-l',[-.17,-.05,0]),legR=bone(hips,'leg-r',[.17,-.05,0]);
    const shinL=bone(legL,'shin-l',[0,-.34,0]),shinR=bone(legR,'shin-r',[0,-.34,0]);
    const cape=bone(spine,'cape',[0,.34,-.17]);
    const hero=id==='guardian',boss=id==='crown'||id==='bellwarden';
    const armor=hero?(['ash','ember','cinder'].includes(options.skin)?materials.soot:materials.ivory):id==='crown'?materials.gold:id==='bellwarden'?materials.ivory:id==='shieldguard'?materials.steel:materials.soot;
    if(id==='cinderbug') {
      actor.scale.setScalar(.9);hips.position.y=.38;
      mesh(spine,'ember-abdomen',sphere(),materials.ember,[0,-.12,-.14],[.44,.32,.58]);
      mesh(spine,'carapace',sphere(),materials.soot,[0,.02,-.15],[.48,.16,.5]);
      mesh(head,'mandible-head',cone(5),materials.gold,[0,-.45,.15],[.24,.38,.23],[Math.PI/2,0,0]);
      for(let i=0;i<3;i++)for(const s of [-1,1]) {const a=bone(spine,`bug-leg-${i}-${s}`,[s*.3,-.13,(i-1)*.33]);mesh(a,'bug-leg-upper',cyl(5),materials.soot,[s*.19,-.02,0],[.045,.4,.045],[0,0,s*1.4]);mesh(a,'bug-leg-tip',cone(5),materials.gold,[s*.38,-.12,0],[.04,.31,.04],[0,0,s*.35]);}
      for(const x of [-.09,.09])mesh(head,'ember-eye',sphere(),materials.flame,[x,-.37,.35],[.035,.035,.035]);
    } else {
      mesh(hips,'waist',cyl(8),materials.black,[0,.06,0],[.24,.32,.18]);
      mesh(spine,'cuirass',cyl(6),armor,[0,.18,0],[.34,.48,.23]);
      mesh(spine,'breast-inlay',box(),materials.gold,[0,.21,.23],[.065,.35,.035]);
      for(const s of [-1,1]) {mesh(spine,'rib-plate',box(),materials.steel,[s*.16,.08,.2],[.18,.06,.07],[0,0,s*.12]);mesh(hips,'fauld',box(),armor,[s*.21,-.05,.08],[.22,.27,.26],[0,0,s*.13]);}
      mesh(head,'helmet',cyl(6),armor,[0,.05,0],[.2,.35,.2]);
      mesh(head,'visor',box(),materials.black,[0,.07,.18],[.32,.062,.06]);
      mesh(head,'visor-light',box(),hero?materials.gold:materials.ember,[0,.07,.216],[.23,.018,.02]);
      mesh(head,'nose-ridge',box(),armor,[0,-.01,.23],[.045,.17,.06]);
      mesh(head,'neck-guard',cyl(8),materials.steel,[0,-.16,0],[.23,.12,.22]);
      for(const [a,f,h,l,s,side] of [[armL,foreL,handL,legL,shinL,-1],[armR,foreR,handR,legR,shinR,1]]) {
        mesh(a,'pauldron',sphere(),armor,[side*.02,-.03,0],[.22,.16,.24]);
        mesh(a,'upper-arm',cyl(6),materials.black,[0,-.16,0],[.09,.27,.09]);
        mesh(f,'vambrace',cyl(6),armor,[0,-.11,0],[.11,.22,.11]);
        mesh(h,'gauntlet',box(),materials.steel,[0,0,0],[.13,.14,.14]);
        mesh(l,'thigh',cyl(7),materials.black,[0,-.16,0],[.13,.34,.12]);
        mesh(s,'greave',cyl(6),armor,[0,-.16,0],[.12,.31,.13]);
        mesh(s,'boot',box(),materials.soot,[0,-.33,.07],[.21,.12,.34]);
      }
      for(let i=0;i<3;i++)mesh(cape,'cape-panel',box(),hero?materials.cloth:materials.clothIvory,[(i-1)*.17,-.43,-.12],[.18,.83,.045],[.16,0,(i-1)*-.11]);
      if(hero||id==='lancer'||id==='crown')spear(mount,'weapon-spear',id==='crown'?1.15:1);
      else if(id==='arbalest') {
        const w=new T.Group();w.name='weapon-arbalest';mount.add(w);
        mesh(w,'crossbow-stock',box(),materials.soot,[0,0,.35],[.1,.12,.75]);
        mesh(w,'crossbow-bow',box(),materials.gold,[0,0,.57],[.67,.06,.07]);
        mesh(w,'crossbow-string',cyl(5),materials.clothIvory,[0,0,.42],[.012,.65,.012],[0,0,Math.PI/2]);
        mesh(w,'bolt',cone(4),materials.ivory,[0,.08,.69],[.06,.32,.04],[Math.PI/2,0,0]);
      } else if(id==='bellwarden') {
        mesh(mount,'censer-staff',cyl(8),materials.gold,[0,.5,.1],[.06,2.3,.06]);
        mesh(mount,'censer-shell',sphere(),materials.gold,[0,1.65,.1],[.35,.39,.35]);
        for(let i=0;i<6;i++)mesh(mount,'censer-window',box(),materials.ember,[Math.sin(i*Math.PI/3)*.31,1.65,.1+Math.cos(i*Math.PI/3)*.31],[.08,.24,.08]);
      } else {
        mesh(mount,'sword-grip',cyl(6),materials.gold,[0,0,.1],[.045,.3,.045],[Math.PI/2,0,0]);
        mesh(mount,'sword-blade',box(),materials.steel,[0,0,.62],[.13,.045,.86]);
        mesh(mount,'sword-tip',cone(4),materials.ivory,[0,0,1.14],[.09,.22,.035],[Math.PI/2,0,0]);
      }
      if(hero||id==='shieldguard')shield(handL,id==='shieldguard');
      if(id==='lancer')mesh(head,'lancer-plume',box(),materials.cloth,[0,.31,-.03],[.07,.23,.28]);
      if(boss) {
        actor.scale.setScalar(id==='crown'?1.62:1.48);
        for(let i=0;i<7;i++){const a=i/7*Math.PI*2;mesh(head,'crown-spike',cone(4),materials.gold,[Math.sin(a)*.21,.36,Math.cos(a)*.21],[.045,.36,.045],[Math.sin(a)*.18,0,-Math.cos(a)*.18]);}
        mesh(spine,'royal-gorget',cyl(8),materials.gold,[0,.4,0],[.4,.12,.3]);
      }
    }
    const bones={root,hips,spine,head,armL,armR,foreL,foreR,handL,handR,mount,legL,legR,shinL,shinR,cape};
    actor.animations=makeClips(id,bones);
    actor.userData.animationEvents={light:[{time:.16,event:'impact'}],charge:[{time:.36,event:'charge-ready'}],attack:[{time:.18,event:'impact'}],dodge:[{time:0,event:'invulnerable-start'},{time:.24,event:'invulnerable-end'}]};
    return {group:actor,bones,clips:actor.animations,collider:COLLIDERS[id]};
  }
  function makeClips(id,bones) {
    const q=(x=0,y=0,z=0)=>new T.Quaternion().setFromEuler(new T.Euler(x,y,z)).toArray();
    const rotation=(name,times,values)=>new T.QuaternionKeyframeTrack(name+'.quaternion',times,values.flatMap(v=>q(...v)));
    const clip=(name,duration,tracks)=>new T.AnimationClip(name,duration,tracks);
    const idle=clip('idle',2.4,[rotation('spine',[0,1.2,2.4],[[.015,0,0],[-.025,0,0],[.015,0,0]]),rotation('cape',[0,1.2,2.4],[[.08,0,0],[.16,0,.03],[.08,0,0]])]);
    const run=clip('run',.64,[rotation('leg-l',[0,.16,.32,.48,.64],[[.55,0,0],[0,0,0],[-.55,0,0],[0,0,0],[.55,0,0]]),rotation('leg-r',[0,.16,.32,.48,.64],[[-.55,0,0],[0,0,0],[.55,0,0],[0,0,0],[-.55,0,0]]),rotation('shin-l',[0,.16,.32,.48,.64],[[.1,0,0],[.75,0,0],[.1,0,0],[.05,0,0],[.1,0,0]]),rotation('shin-r',[0,.16,.32,.48,.64],[[.1,0,0],[.05,0,0],[.1,0,0],[.75,0,0],[.1,0,0]]),rotation('spine',[0,.32,.64],[[.12,.05,0],[.12,-.05,0],[.12,.05,0]]),rotation('cape',[0,.32,.64],[[.4,0,.04],[.25,0,-.04],[.4,0,.04]])]);
    const light=clip('light',.42,[rotation('arm-r',[0,.1,.17,.42],[[0,0,0],[.55,0,-.15],[-1.05,0,-.1],[0,0,0]]),rotation('weapon-mount',[0,.1,.17,.42],[[0,0,0],[-.55,0,0],[.85,0,0],[0,0,0]]),rotation('spine',[0,.12,.17,.42],[[0,0,0],[0,-.26,0],[.2,.17,0],[0,0,0]]),new T.VectorKeyframeTrack('weapon-mount.position',[0,.1,.17,.42],[0,0,0,0,0,-.32,0,0,.55,0,0,0])]);
    const charge=clip('charge',.8,[rotation('spine',[0,.35,.8],[[0,0,0],[.15,-.25,0],[.15,-.25,0]]),rotation('arm-r',[0,.35,.8],[[0,0,0],[.65,0,-.15],[.65,0,-.15]]),rotation('leg-l',[0,.35,.8],[[0,0,0],[.25,0,0],[.25,0,0]]),rotation('leg-r',[0,.35,.8],[[0,0,0],[-.2,0,0],[-.2,0,0]])]);
    const block=clip('block',.5,[rotation('arm-l',[0,.1,.5],[[0,0,0],[-1.1,0,-.2],[-1.1,0,-.2]]),rotation('forearm-l',[0,.1,.5],[[0,0,0],[-.6,0,-.35],[-.6,0,-.35]]),rotation('spine',[0,.1,.5],[[0,0,0],[.12,.13,0],[.12,.13,0]])]);
    const dodge=clip('dodge',.36,[rotation('root',[0,.12,.24,.36],[[0,0,0],[.65,0,0],[.65,0,0],[0,0,0]]),rotation('leg-l',[0,.16,.36],[[0,0,0],[.8,0,0],[0,0,0]]),rotation('leg-r',[0,.16,.36],[[0,0,0],[-.6,0,0],[0,0,0]]),rotation('cape',[0,.16,.36],[[0,0,0],[.7,0,0],[0,0,0]])]);
    const hurt=clip('hurt',.3,[rotation('spine',[0,.08,.3],[[0,0,0],[-.35,0,.13],[0,0,0]]),rotation('head',[0,.08,.3],[[0,0,0],[-.16,0,0],[0,0,0]])]);
    const death=clip('death',.7,[rotation('root',[0,.2,.7],[[0,0,0],[-.4,0,.14],[-Math.PI/2,0,.14]]),new T.VectorKeyframeTrack('root.position',[0,.7],[0,0,0,0,.16,0])]);
    const telegraph=clip('telegraph',.7,[rotation('arm-r',[0,.4,.7],[[0,0,0],[.85,0,-.3],[.95,0,-.3]]),rotation('spine',[0,.4,.7],[[0,0,0],[-.07,-.3,0],[-.07,-.3,0]]),rotation('head',[0,.7],[[0,0,0],[-.06,.13,0]])]);
    charge.tracks.push(rotation('weapon-mount',[0,.35,.8],[[0,0,0],[-.8,0,0],[-.8,0,0]]));
    telegraph.tracks.push(rotation('weapon-mount',[0,.4,.7],[[0,0,0],[-.78,0,0],[-.88,0,0]]));
    const attack=light.clone();attack.name='attack';
    const recover=clip('recover',.55,[rotation('spine',[0,.55],[[.23,.15,0],[0,0,0]]),rotation('arm-r',[0,.55],[[-.85,0,-.15],[0,0,0]])]);
    if(id==='cinderbug')for(const c of [run,telegraph,attack,recover])for(let i=0;i<3;i++)for(const s of [-1,1])c.tracks.push(rotation(`bug-leg-${i}-${s}`,[0,c.duration/2,c.duration],[[0,s*.22,0],[0,-s*.22,0],[0,s*.22,0]]));
    return [idle,run,light,charge,block,dodge,hurt,death,telegraph,attack,recover];
  }
  function makeProp(id='pillar',low=false) {
    const g=new T.Group();g.name='hollow-crown-prop-'+id;g.userData={assetId:'hollow-crown.environment.'+id,kitVersion:KIT_VERSION,collider:null};
    if(id==='pillar') {
      mesh(g,'pillar-plinth',box(),materials.stone,[0,.16,0],[1.15,.32,1.15]);
      mesh(g,'pillar-shaft',cyl(low?6:8),materials.stone,[0,1.45,0],[.39,2.4,.39]);
      mesh(g,'pillar-capital',box(),materials.ash,[0,2.72,0],[1,.2,1]);
      mesh(g,'pillar-crown',box(),materials.stone,[0,2.92,0],[1.15,.2,1.15]);
      if(!low){for(let i=0;i<4;i++){const a=i*Math.PI/2;mesh(g,'pillar-flute',box(),materials.ash,[Math.sin(a)*.36,1.45,Math.cos(a)*.36],[.06,2,.06]);}for(let i=0;i<3;i++)mesh(g,'shaft-course',cyl(8),materials.ash,[0,.65+i*.73,0],[.405,.045,.405]);mesh(g,'broken-capital-chip',stoneBlock(),materials.ash,[.48,2.79,.35],[.17,.2,.23],[0,.35,.1]);}
      g.userData.collider={shape:'box',size:[1.15,3.02,1.15],center:[0,1.51,0]};
    } else if(id==='altar') {
      mesh(g,'altar-base',box(),materials.stone,[0,.16,0],[2.6,.32,1.65]);
      mesh(g,'altar-body',box(),materials.stone,[0,.65,0],[2.2,.7,1.25]);
      mesh(g,'altar-top',box(),materials.ivory,[0,1.04,0],[2.55,.12,1.55]);
      for(const s of [-1,1])mesh(g,'altar-gold-inlay',box(),materials.gold,[s*.8,.65,.637],[.055,.6,.025]);
      mesh(g,'altar-ember',cone(5),materials.crystal,[0,1.4,0],[.18,.6,.18]);
      g.userData.collider={shape:'box',size:[2.6,1.1,1.65],center:[0,.55,0]};
    } else if(id==='candelabrum') {
      mesh(g,'candlestick-foot',cyl(8),materials.gold,[0,.05,0],[.2,.1,.2]);
      mesh(g,'candlestick-stem',cyl(6),materials.gold,[0,.58,0],[.045,1.1,.045]);
      mesh(g,'candlestick-crossbar',box(),materials.gold,[0,1.05,0],[.7,.06,.06]);
      for(const x of [-.3,0,.3]){mesh(g,'wax-candle',cyl(6),materials.wax,[x,1.23,0],[.047,.3,.047]);mesh(g,'candle-flame',cone(5),materials.flame,[x,1.46,0],[.042,.14,.042]);}
    } else if(id==='wall') {
      for(let course=0;course<3;course++)for(let block=0;block<2;block++)mesh(g,'wall-masonry',box(),materials.stone,[(block-.5)*.99,.17+course*.3,0],[.96,.28,.5],[0,0,((block+course)%2-.5)*.012]);
      mesh(g,'wall-coping',box(),materials.ash,[0,1.05,0],[2.1,.15,.6]);
      g.userData.collider={shape:'box',size:[2,1.1,.5],center:[0,.55,0]};
    } else if(id==='banner') {
      mesh(g,'banner-pole',cyl(6),materials.gold,[0,1.5,0],[.035,3,.035]);
      mesh(g,'banner-crossbar',cyl(6),materials.gold,[0,2.75,0],[.025,1.1,.025],[0,0,Math.PI/2]);
      for(let i=0;i<4;i++)mesh(g,'torn-banner-panel',box(),materials.cloth,[(i-1.5)*.24,2.05+Math.sin(i)*.08,.03],[.25,1.4-Math.abs(i-1.5)*.18,.035],[0,Math.sin(i)*.12,0]);
      mesh(g,'banner-ivory-mark',box(),materials.ivory,[0,2.18,.066],[.06,.5,.025]);
    } else if(id==='floor-tile') {
      mesh(g,'tile',box(),materials.stone,[0,-.11,0],[1.94,.2,1.94]);
    } else if(id==='rubble') {
      for(let i=0;i<5;i++){const a=i*2.4;mesh(g,'stone-fragment',stoneBlock(),i%2?materials.ash:materials.stone,[Math.sin(a)*.3,.09+Math.abs(Math.cos(a))*.04,Math.cos(a)*.3],[.16+(i%3)*.09,.13+(i%2)*.08,.18+(i%2)*.14],[i*.15,a,i*.12]);}
    } else if(id==='brazier') {
      mesh(g,'brazier-foot',cyl(8),materials.soot,[0,.12,0],[.45,.24,.45]);mesh(g,'brazier-stem',cyl(6),materials.gold,[0,.5,0],[.1,.7,.1]);mesh(g,'brazier-bowl',cyl(8),materials.soot,[0,.9,0],[.42,.3,.42]);for(let i=0;i<5;i++){const a=i*2.4;mesh(g,'ember-coal',sphere(),materials.ember,[Math.sin(a)*.25,1.05,Math.cos(a)*.25],[.13,.1,.13]);mesh(g,'brazier-flame',cone(5),materials.flame,[Math.sin(a)*.18,1.27+(i%2)*.1,Math.cos(a)*.18],[.08,.42,.08]);}
    }
    return g;
  }
  function dispose(){shared.disposed=true;for(const g of shared.geometries.values())g.dispose();for(const m of shared.materials.values())m.dispose();for(const t of shared.textures)t.dispose();}
  return {materials,makeActor,makeProp,dispose,shared};
}
