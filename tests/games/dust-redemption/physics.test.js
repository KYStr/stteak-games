import test from 'node:test';
import assert from 'node:assert/strict';
import { rayBox, firstHit, moveCircle, coverDistance, makeBox } from '../../../public/games/dust-redemption/physics.js';

const epsilon=1e-8;
const approximately=(actual,expected,message)=>assert.ok(Math.abs(actual-expected)<epsilon,`${message}: got ${actual}, expected ${expected}`);
const segment=(a,b)=>{
  const delta={x:b.x-a.x,y:b.y-a.y,z:b.z-a.z},length=Math.hypot(delta.x,delta.y,delta.z);
  return {direction:{x:delta.x/length,y:delta.y/length,z:delta.z/length},length};
};
const overlaps=(position,box,radius=.34)=>position.x+radius>box.min.x&&position.x-radius<box.max.x&&position.z+radius>box.min.z&&position.z-radius<box.max.z;
const coverTypes=[['crate-low',1.05],['crate-high',1.8],['rock-low',1.05],['rock-high',1.8]];
const faces={front:{axis:'z',sign:1},back:{axis:'z',sign:-1},left:{axis:'x',sign:-1},right:{axis:'x',sign:1}};

test('a newly dropped cargo collider permits continuous outward steps from an existing overlap',()=>{
  const crate=makeBox('dropped-cargo',-13.0945,-3.677,1.2,1.5,1.2);
  let p={x:-12.3319,z:-3.9303};assert.ok(overlaps(p,crate));
  const initial={...p};
  for(let i=0;i<8;i++) { const next=moveCircle(p,.04,0,[crate]);assert.ok(next.x>p.x,'outward input must not remain trapped');assert.ok(next.x-p.x<=.040001,'no positional teleport');p=next; }
  assert.equal(overlaps(p,crate),false);assert.ok(p.x-initial.x<.33);
});
test('overlap recovery cannot deepen penetration or enter another solid',()=>{
  const crate=makeBox('cargo',0,0,1.2,1.5,1.2),p={x:.8,z:0};
  assert.deepEqual(moveCircle(p,-.04,0,[crate]),p,'walking further into a dropped box remains blocked');
  const wall=makeBox('other',1.65,0,1,2,4);
  assert.deepEqual(moveCircle(p,.04,0,[crate,wall]),p,'escaping cargo does not authorize entering a different wall');
});

// These are collider-level tests, not rendered geometry, browser gameplay or independent acceptance evidence.
for(const [kind,height] of coverTypes){
  for(const [face,{axis,sign}] of Object.entries(faces)){
    test(`${kind}: 20 ${face} rays stop at the visible-volume proxy surface`,()=>{
      const box=makeBox('tested-cover',0,0,3,height,1.4,kind),other=axis==='x'?'z':'x';
      const halfWidth=axis==='x'?1.5:.7,faceHalf=other==='x'?1.5:.7;
      for(let i=0;i<20;i++){
        const y=.1+(height-.2)*(i/19),across=faceHalf*(-.8+1.6*(i/19));
        const origin={x:0,y,z:0},target={x:0,y,z:0};
        origin[axis]=sign*6;target[axis]=-sign*6;origin[other]=target[other]=across;
        const {direction,length}=segment(origin,target),distance=rayBox(origin,direction,box,length);
        assert.notEqual(distance,null,`${face} sample ${i} must block`);
        approximately(distance,6-halfWidth,`${face} sample ${i} contact distance`);
        const hit=firstHit(origin,target,[box]);
        assert.equal(hit?.box.id,box.id);approximately(hit.distance,distance,'segment/ray agreement');
      }
    });
  }
  test(`${kind}: 20 above-top and 20 outside-side rays remain unblocked`,()=>{
    const box=makeBox(kind,0,0,3,height,1.4,kind);
    for(let i=0;i<20;i++){
      const offset=.01+i*.04;
      assert.equal(firstHit({x:0,y:height+offset,z:6},{x:0,y:height+offset,z:-6},[box]),null);
      assert.equal(firstHit({x:box.max.x+offset,y:.55,z:6},{x:box.max.x+offset,y:.55,z:-6},[box]),null);
    }
  });
}

test('20 crouched, low-peek and high-cover shots distinguish physical cover height',()=>{
  const low=makeBox('low',0,0,3,1.05,1.4),high=makeBox('high',0,0,3,1.8,1.4,'crate-high');
  for(let i=0;i<20;i++){
    const x=-1.2+i*2.4/19;
    assert.equal(firstHit({x,y:.55,z:2},{x,y:.55,z:-8},[low])?.box.id,'low','crouched protected behind low cover');
    assert.equal(firstHit({x,y:1.65,z:2},{x,y:1.05,z:-8},[low]),null,'low cover allows a real ray above its top');
    assert.equal(firstHit({x,y:1.35,z:2},{x,y:1.05,z:-8},[high])?.box.id,'high','standing ray cannot pass through high cover');
    const side=high.max.x+.43;
    assert.equal(firstHit({x:side,y:1.35,z:2},{x:side+.5,y:1.05,z:-8},[high]),null,'high-cover lateral peek passes beside its side');
  }
});

test('20 obstruction orders always resolve the nearest solid before a protected target',()=>{
  for(let i=0;i<20;i++){
    const x=i*.01,wall=makeBox('wall',x,2,3,1.8,1),target=makeBox('target',x,-3,.85,1.85,.85);
    const from={x,y:1.35,z:6},to={x,y:1.05,z:-6};
    const a=firstHit(from,to,[wall,target]),b=firstHit(from,to,[target,wall]);
    assert.equal(a.box.id,'wall');assert.equal(b.box.id,'wall');approximately(a.distance,b.distance,'stable closest hit');
    assert.equal(firstHit(from,to,[target])?.box.id,'target');
  }
});

test('ray slabs handle reverse, parallel, tangent, inside and finite-segment cases',()=>{
  const box=makeBox('box',0,0,2,2,2);
  assert.equal(rayBox({x:0,y:1,z:5},{x:0,y:0,z:-1},box),4);
  assert.equal(rayBox({x:0,y:1,z:-5},{x:0,y:0,z:1},box),4);
  assert.equal(rayBox({x:2,y:1,z:5},{x:0,y:0,z:-1},box),null);
  assert.equal(rayBox({x:1,y:1,z:5},{x:0,y:0,z:-1},box),4,'exact tangent is conservative solid contact');
  assert.equal(rayBox({x:0,y:1,z:0},{x:0,y:0,z:1},box),0,'inside origin never shoots out through a solid');
  assert.equal(rayBox({x:0,y:1,z:5},{x:0,y:0,z:-1},box,3.99),null);
  assert.equal(rayBox({x:0,y:1,z:5},{x:0,y:0,z:-1},box,4),4);
  assert.equal(firstHit({x:0,y:1,z:5},{x:0,y:1,z:2},[box]),null,'boxes behind endpoint are irrelevant');
  assert.equal(firstHit({x:0,y:1,z:5},{x:0,y:1,z:5},[box]),null);
  assert.equal(firstHit({x:0,y:5,z:0},{x:0,y:-1,z:0},[box]).distance,3,'full three-dimensional vertical ray');
});

for(const [kind,height] of coverTypes)for(const [face,{axis,sign}] of Object.entries(faces)){
  test(`${kind}: movement proxy stops 20 approaches on ${face} without entering solid`,()=>{
    const box=makeBox('movement-cover',0,0,3,height,1.4,kind),other=axis==='x'?'z':'x';
    for(let sample=0;sample<20;sample++){
      let p={x:0,z:0};p[axis]=sign*5;p[other]=-.3+sample*.6/19;
      for(let frame=0;frame<40;frame++){
        const dx=axis==='x'?-sign*.25:0,dz=axis==='z'?-sign*.25:0;
        const next=moveCircle(p,dx,dz,[box]);
        assert.equal(overlaps(next,box),false,`${face} sample ${sample}, frame ${frame}`);p=next;
      }
      assert.ok(sign*p[axis]>(axis==='x'?1.5:.7)+.33,'proxy maintains player clearance');
      assert.ok(sign*p[axis]<(axis==='x'?1.5:.7)+.6,'player approaches rather than remaining far away');
    }
  });
}

test('20 oblique contacts slide along an unblocked wall axis',()=>{
  const box=makeBox('wall',0,0,3,1.8,8);
  for(let sample=0;sample<20;sample++){
    const p={x:-1.85,z:-2+sample*.2},moved=moveCircle(p,.25,.2,[box]);
    assert.equal(moved.x,p.x,'blocked normal component is rejected');
    approximately(moved.z,p.z+.2,'unblocked tangential component survives');assert.equal(overlaps(moved,box),false);
    const other={x:1.85,z:p.z},reverse=moveCircle(other,-.25,-.2,[box]);
    assert.equal(reverse.x,other.x);approximately(reverse.z,other.z-.2,'reverse tangential component survives');
  }
});

test('proxy cannot cut an inside corner and can round the outside of cover',()=>{
  const north=makeBox('north',0,0,8,1.8,1),east=makeBox('east',2,2,1,1.8,3);
  let p={x:1.1,z:1};
  for(let i=0;i<20;i++){p=moveCircle(p,.25,-.25,[north,east]);assert.equal(overlaps(p,north),false);assert.equal(overlaps(p,east),false);}
  assert.ok(p.x<=1.16);assert.ok(p.z>=.84);
  const single=makeBox('single',0,0,2,1.05,2);p={x:-1.5,z:0};
  for(let i=0;i<20;i++){p=moveCircle(p,.2,.2,[single]);assert.equal(overlaps(p,single),false);}
  assert.ok(p.x>single.max.x&&p.z>single.max.z,'diagonal movement goes around the exposed edge');
});

test('movement is bounded and cover distances match stable box geometry',()=>{
  assert.deepEqual(moveCircle({x:22.9,z:-22.9},.25,-.25,[]),{x:23,z:-23});
  assert.deepEqual(moveCircle({x:4.9,z:-4.9},.25,-.25,[],.34,5),{x:5,z:-5});
  const low=makeBox('low',4,6,2,1.05,4),high=makeBox('high',4,6,2,1.8,4,'crate-high');
  assert.deepEqual(low.min,{x:3,y:0,z:4});assert.deepEqual(low.max,{x:5,y:1.05,z:8});
  assert.equal(low.vaultable,true);assert.equal(high.vaultable,false);
  assert.equal(coverDistance({x:4,z:6},low),0);assert.equal(coverDistance({x:6,z:6},low),1);
  assert.equal(coverDistance({x:8,z:12},low),5);
});
