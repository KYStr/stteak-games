import test from 'node:test';
import assert from 'node:assert/strict';
import {lineClear,blocked,createRun,step} from '../../../public/games/hollow-crown/rules.js';
test('segment collision covers pillars, open lanes and strict tangent clearance',()=>{
 const room={obstacles:[{x:0,z:0,r:1}]};
 assert.equal(lineClear(room,-3,0,3,0,.5),false);
 assert.equal(lineClear(room,-3,2,3,2,.5),true);
 assert.equal(lineClear(room,-3,1.5,3,1.5,.5),true);
 assert.equal(lineClear(room,-3,1.499,3,1.499,.5),false);
});
test('zero-length LOS matches point collision, including minimum radius',()=>{
 for(const obstacle of [{x:0,z:0,r:1},{x:0,z:0,w:2,d:2}])for(const radius of [0,.001,.5])for(const [x,z] of [[0,0],[1.5,0],[1.499,0],[1.3,1.4],[2,2]]){
 const room={obstacles:[obstacle]};assert.equal(lineClear(room,x,z,x,z,radius),!blocked(room,x,z,radius));
 }
});
test('rectangles use rounded corners, detect thin crossings and preserve tangent lanes',()=>{
 const room={obstacles:[{x:0,z:0,w:2,d:2}]};
 assert.equal(lineClear(room,1.4,1.4,2,2,.5),true); // Inside expanded AABB, outside rounded corner.
 assert.equal(lineClear(room,1.3,1.3,2,2,.5),false);
 assert.equal(lineClear(room,-3,1.5,3,1.5,.5),true);
 assert.equal(lineClear(room,-3,1.499,3,1.499,.5),false);
 assert.equal(lineClear({obstacles:[{x:0,z:0,w:.001,d:2}]},-3,0,3,0),false);
});
test('removing a seal collider opens LOS immediately with identical endpoints',()=>{
 const room={revision:0,obstacles:[{x:0,z:0,w:1.3,d:1.3,sealId:'seal'}]};
 assert.equal(lineClear(room,-3,0,3,0),false);room.obstacles.length=0;room.revision++;
 assert.equal(lineClear(room,-3,0,3,0),true);
});

test('rule-owned LOS cache responds to both endpoints, radius and obstacle revisions',()=>{
 const s=createRun({seed:72}),room=s.room;room.obstacles=[{x:0,z:0,r:1}];room.revision++;
 for(let i=0;i<20;i++)assert.equal(lineClear(room,-3,1.3,3,1.3,.2),true);
 assert.equal(lineClear(room,-3,1.3,3,1.3,.4),false);
 assert.equal(lineClear(room,-3,0,3,0,.2),false);
 assert.equal(lineClear(room,-3,0,-2,0,.2),true);
 room.obstacles[0].r=2;room.revision++;assert.equal(lineClear(room,-3,1.3,3,1.3,.2),false);
 room.obstacles=[{x:0,z:0,w:1.3,d:1.3,sealId:'seal'}];room.revision++;assert.equal(lineClear(room,-3,0,3,0),false);
 room.obstacles.splice(0,1);room.revision++;assert.equal(lineClear(room,-3,0,3,0),true);
});
test('zero movement still resolves penetrations and arena boundaries',()=>{
 const s=createRun({seed:72}),o=s.room.obstacles[0];s.player.x=o.x;s.player.z=o.z;step(s,{},.02);assert.equal(blocked(s.room,s.player.x,s.player.z,s.player.radius),false);
 s.player.x=10;s.player.z=10;step(s,{},.02);assert.ok(s.player.x<10&&s.player.z<10);assert.equal(blocked(s.room,s.player.x,s.player.z,s.player.radius),false);
});
