function it(i,e){i=Math.abs(i),e=Math.abs(e);let t=Math.max(i,e);return t?t===1/0?1/0:(i/=t,e/=t,Math.sqrt(i*i+e*e)*t):0}function vs(i,e,t){i=Math.abs(i),e=Math.abs(e),t=Math.abs(t);let n=Math.max(i,e,t);if(!n)return 0;if(n===1/0)return 1/0;i/=n,e/=n,t/=n;let s=i*i,r=e*e,a=s+r,o=a-s-r;return Math.sqrt(a+(t*t-o))*n}var lp=(i,e,t)=>({x:i,y:e,z:t}),ki=(i,e)=>i.find(t=>t.id===`island-${e}`),gr=(i,e=26)=>lp(i.x,i.y+e,i.z),Ms=(i,e)=>{let t=Math.hypot(e.x-i.x,e.z-i.z)||1;return{x:(e.x-i.x)/t,z:(e.z-i.z)/t}},sc=i=>Math.round(i.slice(1).reduce((e,t,n)=>e+Math.hypot(t.x-i[n].x,t.y-i[n].y,t.z-i[n].z),0)),cp=[{mission:1,from:"camp",to:"reed",type:"survey",title:"\u6821\u6E96\u8606\u5149\u98A8\u6A19",roles:["\u8D77\u98A8\u57FA\u6E96","\u4E0A\u5347\u5256\u9762","\u9AD8\u5C64\u98A8\u901F","\u71B1\u6D41\u51FA\u6D41","\u5074\u98A8\u88DC\u511F","\u4F4E\u5C64\u56DE\u6D41","\u5B9A\u5411\u5FA9\u6838","\u6821\u6E96\u4EA4\u4ED8"],safe:[[-60,32,-150],[-280,55,-300],[-520,82,-360],[-690,72,-510],[-680,44,-700],[-530,40,-875],[-350,38,-885],[-308,34,-712]],shortcut:[[60,30,-125],[20,60,-260],[-70,86,-375],[-150,58,-490],[-265,42,-580],[-390,52,-650],[-410,34,-760],[-308,34,-712]],decisions:["\u5728\u4F4E\u5C64\u5148\u5C0D\u9F4A\u98A8\u5411\u518D\u8D77\u901F","\u85C9\u71B1\u6D41\u53D6\u5F97\u9AD8\u8655\u6A23\u672C\u800C\u975E\u76F4\u63A5\u8D8A\u5CF6","\u7A7F\u904E\u5074\u98A8\u5F8C\u4FEE\u6B63\u822A\u5411\u518D\u904E\u9580","\u964D\u56DE\u4EA4\u4ED8\u9AD8\u5EA6\uFF0C\u4FDD\u7559\u843D\u5730\u80FD\u91CF"],descriptions:{safe:"\u6CBF\u5916\u5074\u5BEC\u98A8\u5ECA\u53D6\u5F97\u516B\u4EFD\u98A8\u5C64\u6A23\u672C\uFF1B\u88DC\u80FD\u71B1\u6D41\u591A\u3001\u6025\u964D\u5C11\uFF0C\u8DEF\u7A0B\u8F03\u9577\u3002",shortcut:"\u6CBF\u4E2D\u592E\u7A84\u98A8\u5ECA\u53D6\u5F97\u76F8\u540C\u516B\u4EFD\u6A23\u672C\uFF1B\u8F03\u77ED\u4F46\u9AD8\u4F4E\u8F49\u63DB\u3001\u822A\u5411\u53CA\u80FD\u91CF\u8981\u6C42\u8F03\u9AD8\u3002"}},{mission:2,from:"reed",to:"storm",type:"carry",title:"\u904B\u9001\u5B9A\u5411\u661F\u5100",roles:["\u661F\u5100\u63A5\u8F09","\u7B2C\u4E00\u6BB5\u5B9A\u5411","\u65B7\u6A4B\u8F49\u904B","\u9AD8\u5C64\u907F\u96F7","\u5E73\u7A69\u51FA\u6D41","\u7B2C\u4E8C\u6BB5\u5B9A\u5411","\u964D\u843D\u524D\u5FA9\u6838","\u661F\u5100\u4EA4\u4ED8"],safe:[[-170,40,-870],[70,50,-1080],[300,58,-1260],[510,72,-1410],[755,64,-1290],[1e3,58,-1100],[1120,48,-930],[1008,54,-792]],shortcut:[[-155,42,-700],[10,70,-660],[190,90,-660],[390,94,-610],[580,72,-680],[775,62,-730],[935,54,-875],[1008,54,-792]],decisions:["\u8D77\u822A\u5F8C\u5148\u7A69\u4F4F\u9AD8\u5EA6\u518D\u904B\u9001","\u9078\u65B7\u6A4B\u5916\u7DE3\u6216\u96F7\u5FC3\u4E0A\u5C64","\u9810\u7559\u8F49\u5F4E\u8DDD\u96E2\uFF0C\u907F\u514D\u6025\u964D\u5F8C\u624D\u627E\u4EA4\u4ED8\u9580","\u5E36\u8457\u9918\u80FD\u8207\u6B63\u78BA\u822A\u5411\u62B5\u9054\u5929\u6587\u53F0"],descriptions:{safe:"\u7E5E\u65B7\u6A4B\u5916\u7DE3\u904B\u9001\u516B\u6BB5\u5B9A\u5411\u7D00\u9304\uFF1B\u8F49\u5F4E\u8F03\u5BEC\u3001\u7A69\u5B9A\u5EA6\u9580\u6ABB\u8F03\u5BEC\u9B06\u3002",shortcut:"\u5F9E\u96F7\u810A\u9AD8\u5C64\u904B\u9001\u540C\u4E00\u661F\u5100\uFF1B\u8DEF\u77ED\uFF0C\u4F46\u5FC5\u9808\u63D0\u65E9\u722C\u5347\u4E26\u5E73\u7A69\u7A7F\u904E\u7A84\u98A8\u9580\u3002"}},{mission:3,from:"storm",to:"dawn",type:"observe",title:"\u91CD\u5EFA\u6B78\u661F\u65B9\u4F4D",roles:["\u5317\u65B9\u57FA\u7DDA","\u7B2C\u4E00\u689D\u8996\u7DDA","\u9727\u908A\u8FA8\u5411","\u66F8\u5EAB\u65B9\u4F4D","\u7B2C\u4E8C\u689D\u8996\u7DDA","\u4EA4\u6703\u9EDE\u9A57\u8B49","\u6B78\u661F\u822A\u5411","\u661F\u5716\u4EA4\u4ED8"],safe:[[1130,60,-600],[1220,72,-350],[1080,52,-90],[930,44,90],[850,58,260],[690,46,470],[440,36,650],[272,30,728]],shortcut:[[860,60,-650],[720,82,-440],[660,66,-210],[560,50,25],[455,68,220],[325,48,425],[180,34,600],[272,30,728]],decisions:["\u5F9E\u5169\u500B\u4E0D\u540C\u65B9\u4F4D\u8FA8\u8A8D\u540C\u4E00\u7247\u822A\u57DF","\u5728\u4F4E\u5C64\u7BC0\u80FD\u8207\u9AD8\u5C64\u8996\u91CE\u9593\u53D6\u6368","\u5148\u5C0D\u9F4A\u53EF\u898B\u7684\u5BE6\u9AD4\u822A\u6A19\uFF0C\u518D\u9032\u5165\u9727\u5E36","\u4F9D\u4EA4\u6703\u65B9\u4F4D\u5B8C\u6210\u5357\u5411\u8FD4\u7A0B"],descriptions:{safe:"\u6CBF\u66F8\u5EAB\u5916\u7DE3\u53D6\u5F97\u516B\u500B\u65B9\u4F4D\u7BC0\u9EDE\uFF1B\u822A\u6A19\u6E05\u695A\u3001\u88DC\u80FD\u8F03\u5145\u8DB3\uFF0C\u4F46\u8DDD\u96E2\u8F03\u9577\u3002",shortcut:"\u5F9E\u4E2D\u592E\u9727\u5ECA\u53D6\u5F97\u540C\u7FA9\u65B9\u4F4D\u7BC0\u9EDE\uFF1B\u8F03\u77ED\u4F46\u5FC5\u9808\u66F4\u6E96\u78BA\u5C0D\u9F4A\u822A\u5411\u4E26\u63A7\u5236\u9AD8\u5EA6\u3002"}}];function hp(i,e,t){let n=t==="safe";return i===1?{...[0,2,4].includes(e)?{minSpeed:n?10:13}:{},...[2,5].includes(e)?{minEnergy:n?30:45}:{},...e===6?{maxVerticalSpeed:n?4:3}:{}}:i===2?{maxVerticalSpeed:n?3.5:2.7,...[3,6,7].includes(e)?{minEnergy:n?25:40}:{}}:{...[1,3,5,6].includes(e)?{maxVerticalSpeed:n?3.5:2.8}:{},...e===4?{minEnergy:n?25:40}:{}}}function nu(i){return[i.minSpeed?`\u901F\u5EA6\u81F3\u5C11 ${i.minSpeed} m/s`:"",i.minEnergy?`\u5E06\u80FD\u91CF\u81F3\u5C11 ${i.minEnergy}%`:"",i.maxVerticalSpeed?`\u5782\u76F4\u901F\u5EA6\u4E0D\u8D85\u904E ${i.maxVerticalSpeed} m/s`:"",i.heading?"\u6CBF\u98A8\u5ECA\u65B9\u5411\u5C0D\u9F4A\u5165\u9580":"\u7A7F\u904E\u7ACB\u9AD4\u6A19\u8A18"].filter(Boolean).join("\uFF1B")}function iu(i){let e=[];for(let s of cp)for(let r of["safe","shortcut"]){let a=ki(i,s.from),o=ki(i,s.to),l=gr(a),c=[];s[r].forEach(([u,p,f],d)=>{let y={id:`sample-main-${s.mission}-${d+1}`,name:s.roles[d],type:s.type,x:u,y:p,z:f,radius:15,...hp(s.mission,d,r)};(s.mission===1&&[4,6].includes(d)||s.mission===2&&[1,3,5,6].includes(d)||s.mission===3&&d!==0&&d!==7)&&(y.heading={...Ms(c[d-1]||l,y),minDot:r==="safe"?.65:.82}),y.instruction=`${y.name}\uFF1A${nu(y)}\u3002${d===7?"\u53D6\u5F97\u5F8C\u5728\u5CF6\u4E2D\u592E\u843D\u5730\u6309 E \u4EA4\u4ED8\u3002":"\u53D6\u6A23\u4E0D\u9700\u7B49\u5F85\uFF0C\u5B8C\u6210\u5F8C\u7ACB\u5373\u98DB\u5F80\u4E0B\u4E00\u7BC0\u9EDE\u3002"}`,c.push(y)});let h=[l,...c,gr(o)];e.push({id:`route-${s.mission}-${r}`,mission:s.mission,style:r,from:a.id,to:o.id,name:`\u7B2C ${s.mission} \u822A\u7DDA \xB7 ${r==="safe"?"\u5B89\u5168\u98A8\u9053":"\u7A7F\u96F2\u6377\u5F91"}`,title:s.title,theme:s.type,description:s.descriptions[r],samples:c,waypoints:h,distanceMeters:sc(h),decisions:s.decisions,designBudgetMinutes:[2.3,3.5]})}let t=ki(i,"dawn"),n=ki(i,"camp");for(let s of["safe","shortcut"]){let r=gr(t),a=gr(n),o=Array.from({length:6},(c,h)=>{let u=(h+1)/7;return{id:`sample-return-${h+1}`,name:`\u8FD4\u822A\u822A\u6A19 ${h+1}/6`,type:"return",x:r.x+(a.x-r.x)*u,y:r.y+(a.y-r.y)*u,z:r.z+(a.z-r.z)*u,radius:15,instruction:`\u8FD4\u822A\u822A\u6A19 ${h+1}/6\uFF1A\u6CBF\u98A8\u5ECA\u4E2D\u5FC3\u901A\u904E\uFF1B\u5B8C\u6210\u5F8C\u5728\u71DF\u5730\u4E2D\u592E\u843D\u5730\u6309 E\u3002`}}),l=[r,...o,a];e.push({id:`route-4-${s}`,mission:4,style:s,from:t.id,to:n.id,name:`\u8FD4\u822A \xB7 ${s==="safe"?"\u5B89\u5168\u98A8\u9053":"\u7A7F\u96F2\u6377\u5F91"}`,title:"\u5E36\u661F\u5716\u56DE\u5BB6",theme:"return",samples:o,waypoints:l,description:s==="safe"?"\u6CBF\u5BEC\u5EE3\u3001\u88DC\u80FD\u5145\u8DB3\u7684\u6B78\u822A\u98A8\u5ECA\uFF0C\u8FD4\u56DE\u71DF\u5730\u4E2D\u592E\u843D\u5730\u6309 E \u7D50\u7B97\u3002":"\u6CBF\u8F03\u5FEB\u7684\u7A84\u98A8\u5ECA\u8FD4\u822A\uFF1B\u9810\u7559\u964D\u843D\u80FD\u91CF\uFF0C\u56DE\u71DF\u5730\u4E2D\u592E\u6309 E \u7D50\u7B97\u3002",distanceMeters:sc(l),decisions:["\u9078\u5BEC\u98A8\u5ECA\u7A69\u5B9A\u8FD4\u822A\uFF0C\u6216\u7A84\u98A8\u5ECA\u5FEB\u901F\u8FD4\u822A","\u63D0\u65E9\u4E0B\u964D\uFF0C\u907F\u514D\u8D8A\u904E\u71DF\u5730\u5F8C\u56DE\u982D"],designBudgetMinutes:[.8,1.3]})}return e}function su(i,e,t,n={}){let s=Math.min(e.y,t.y)-26;return{id:i,type:"tailwind",name:n.name||"\u5206\u5C64\u822A\u9053",start:{...e},end:{...t},x:(e.x+t.x)/2,y:s,z:(e.z+t.z)/2,radius:26,height:Math.abs(t.y-e.y)+58,ceiling:t.y+1,strength:2.4,charge:4.8,liftCap:6,direction:{...Ms(e,t),y:0},...n}}function ru(i,e,t={}){return{id:i,type:"thermal",name:"\u822A\u6BB5\u88DC\u7D66\u71B1\u6D41",x:e.x,y:e.y-35,z:e.z,radius:24,height:70,ceiling:e.y+2,strength:7.5,charge:8,direction:{x:0,y:1,z:0},...t}}function au(i,e,t,n={}){let s=Ms(e,t);return{id:i,type:"crosswind",name:"\u53EF\u8B80\u7684\u8108\u52D5\u5074\u6D41",x:(e.x+t.x)/2,y:Math.min(e.y,t.y)-24,z:(e.z+t.z)/2,radius:64,height:Math.abs(t.y-e.y)+64,strength:4.5,period:8,direction:{x:-s.z,y:0,z:s.x},...n}}function ou(i){let e=[];for(let t of i)for(let n=1;n<t.waypoints.length;n++){let s=t.waypoints[n-1],r=t.waypoints[n];if(Math.hypot(r.x-s.x,r.z-s.z)<.1)continue;let a=t.style==="safe",o={routeId:t.id,mission:t.mission,sample:n-1,style:t.style};e.push(su(`wind-${t.id}-${n}`,s,r,{...o,radius:a?26:17,strength:a?2.8:4,charge:a?5.2:3.9,liftCap:a?6:7})),(r.y-s.y>=10||a&&n%3===1)&&e.push(ru(`wind-${t.id}-thermal-${n}`,r,{...o,radius:a?26:21,charge:a?8:6.5})),(t.mission===1&&n===5||t.mission===2&&[4,7].includes(n))&&e.push(au(`wind-${t.id}-side-${n}`,s,r,{...o,strength:a?3.3:5.2,radius:a?50:60}))}return e}var up={lee:[0,.32,.74,1,.95,.62,.28,.08,0],rim:[0,-.36,-.78,-1,-.82,-.5,-.18,-.06,0],shear:[0,.58,.95,.48,-.32,-.82,-.6,-.2,0],ridge:[0,.5,.95,.9,.5,0,-.32,-.18,0],descent:[0,-.3,-.72,-.9,-.55,0,.24,.1,0]},rc=[.06,.16,.29,.43,.57,.71,.84,.94,1],dp={sweep:[28,36,42,46,43,36,30,26,24],high:[32,50,72,85,76,60,42,30,24],rising:[25,43,68,86,90,76,54,34,24],shelves:[29,47,48,73,74,51,50,32,24],descending:[38,65,82,72,55,39,30,25,24],low:[25,29,32,34,31,28,27,25,24]},fp=[[["camp","bridge","\u5C55\u5E06\u52A0\u901F","\u8B80\u53D6\u9806\u98A8\u9032\u5165\u9EDE\uFF0C\u5148\u5C0D\u6E96\u518D\u52A0\u901F\uFF1B\u5728\u65B7\u6A4B\u4EA4\u4ED8\u8D77\u901F\u7D00\u9304\u3002","lee","sweep",.3,"accelerate"],["bridge","dawn","\u9577\u5F4E\u4FDD\u901F","\u6CBF\u5916\u5F4E\u6301\u7E8C\u4FEE\u6B63\u822A\u5411\uFF1B\u6BD4\u8F03\u5207\u5167\u7DDA\u8207\u4FDD\u7559\u98A8\u5E36\u901F\u5EA6\u3002","shear","low",.25,"corner"],["dawn","storm","\u9AD8\u5C64\u885D\u7DDA","\u5148\u722C\u5347\u518D\u63A5\u9AD8\u901F\u98A8\u5C64\uFF0C\u52FF\u70BA\u6436\u901F\u5EA6\u932F\u904E\u71B1\u6D41\u51FA\u53E3\u3002","ridge","high",.28,"climb-fast"],["storm","camp","\u5E36\u901F\u8FD4\u822A","\u5728\u9577\u4E0B\u964D\u6BB5\u4FDD\u901F\uFF0C\u672B\u9580\u524D\u63D0\u65E9\u6E1B\u901F\uFF0C\u56DE\u71DF\u5730\u4EA4\u4ED8\u3002","descent","descending",.25,"finish"]],[["reed","archive","\u8B80\u53D6\u84C4\u98A8\u9EDE","\u4EA4\u66FF\u7D93\u904E\u88DC\u80FD\u6BB5\u8207\u4F4E\u4F9B\u80FD\u6BB5\uFF1B\u5230\u66F8\u5EAB\u6642\u4FDD\u6709\u5145\u8DB3\u9918\u80FD\u3002","lee","shelves",.4,"harvest"],["archive","bridge","\u6709\u9650\u80FD\u91CF\u8D8A\u810A","\u7528\u524D\u534A\u6BB5\u84C4\u80FD\u7A7F\u904E\u9AD8\u5C64\u5F31\u98A8\uFF0C\u907F\u514D\u6025\u8F49\u9020\u6210\u984D\u5916\u6D88\u8017\u3002","shear","high",.4,"budget"],["bridge","reed","\u9918\u80FD\u56DE\u6536","\u5E36\u8457\u5269\u9918\u80FD\u91CF\u6CBF\u80CC\u98A8\u5074\u964D\u8FD4\u8606\u5149\u5EAD\uFF1B\u4E0D\u4EE5\u5931\u901F\u88DC\u6EFF\u80FD\u91CF\u3002","rim","descending",.42,"reserve"]],[["bridge","camp","\u8FA8\u8A8D\u968E\u68AF\u71B1\u6D41","\u5148\u4F4E\u5F8C\u9AD8\u5730\u63A5\u4E0A\u4E09\u500B\u71B1\u6D41\u5C64\uFF0C\u8B80\u61C2\u4E0B\u4E00\u500B\u4E0A\u5347\u51FA\u53E3\u3002","ridge","rising",.3,"rise"],["camp","storm","\u932F\u5C64\u63DB\u6D41","\u5728\u4E2D\u9AD8\u5C64\u98A8\u5ECA\u4E4B\u9593\u63DB\u6D41\uFF0C\u907F\u514D\u76F4\u63A5\u62C9\u76F4\u822A\u7DDA\u3002","shear","shelves",.32,"transfer"],["storm","archive","\u63D0\u524D\u6536\u5E06","\u5F9E\u9AD8\u8655\u4E0B\u964D\u81F3\u66F8\u5EAB\uFF1B\u63D0\u65E9\u6E1B\u901F\uFF0C\u672B\u9580\u524D\u6062\u5FA9\u5E73\u7A69\u5782\u76F4\u901F\u5EA6\u3002","descent","descending",.35,"descend"],["archive","bridge","\u8D8A\u810A\u6B78\u6A4B","\u5C07\u722C\u5347\u3001\u63DB\u6D41\u8207\u4E0B\u964D\u63A5\u6210\u4E00\u6B21\u5B8C\u6574\u8D8A\u810A\uFF0C\u518D\u56DE\u65B7\u6A4B\u4EA4\u4ED8\u3002","lee","high",.3,"combine"]],[["storm","reed","\u5074\u6D41\u5B9A\u5411","\u5148\u5C0D\u9F4A\u98A8\u9580\uFF0C\u518D\u88DC\u511F\u4F86\u81EA\u5DE6\u5074\u7684\u8108\u52D5\uFF0C\u4E0D\u7B49\u5F85\u98A8\u505C\u3002","lee","sweep",.3,"left-shear"],["reed","dawn","\u53CD\u5411\u98A8\u5207","\u5F8C\u534A\u6BB5\u5074\u98A8\u65B9\u5411\u53CD\u8F49\uFF1B\u89C0\u5BDF\u7BAD\u982D\u800C\u975E\u6CBF\u7528\u4E0A\u4E00\u6BB5\u4FEE\u6B63\u91CF\u3002","shear","shelves",.28,"reverse-shear"],["dawn","bridge","\u8F09\u5100\u904E\u98A8\u810A","\u4FDD\u6301\u5B9A\u5411\u548C\u9AD8\u5EA6\u901A\u904E\u8F03\u5F37\u5074\u6D41\uFF0C\u6CBF\u65B7\u6A4B\u5916\u5074\u9032\u5834\u3002","rim","high",.26,"loaded-shear"],["bridge","storm","\u80CC\u98A8\u8FD4\u53F0","\u5148\u5229\u7528\u80CC\u98A8\u5340\u84C4\u80FD\uFF0C\u518D\u7A69\u5B9A\u6A6B\u8D8A\u6700\u5F8C\u5074\u6D41\u4EA4\u4ED8\u3002","ridge","descending",.32,"lee-return"]],[["archive","reed","\u5C0B\u627E\u7B2C\u4E00\u689D\u8996\u7DDA","\u7528\u5BE6\u9AD4\u822A\u6A19\u9010\u6B21\u78BA\u8A8D\u897F\u5317\u65B9\u4F4D\uFF0C\u4E0D\u628A\u672A\u77E5\u9727\u5340\u7576\u4F5C\u76F4\u7DDA\u6377\u5F91\u3002","lee","sweep",.36,"sightline"],["reed","storm","\u9AD8\u4F4E\u5C64\u4EA4\u53C9\u5B9A\u4F4D","\u5F9E\u5169\u500B\u4E0D\u540C\u9AD8\u5EA6\u91CD\u8B80\u822A\u5411\uFF0C\u5EFA\u7ACB\u53EF\u898B\u98A8\u5ECA\u7684\u4EA4\u6703\u9EDE\u3002","ridge","shelves",.34,"triangulate"],["storm","camp","\u5931\u53BB\u8FD1\u666F\u4E4B\u5F8C","\u8F49\u5165\u4F4E\u5C64\u8584\u9727\uFF0C\u4F9D\u4E0B\u4E00\u500B\u822A\u6A19\u53CA\u98A8\u5E36\u65B9\u5411\u63A5\u56DE\u71DF\u5730\u3002","shear","low",.35,"fog-channel"],["camp","archive","\u5E36\u56DE\u5B8C\u6574\u98A8\u5716","\u5F9E\u76F8\u53CD\u65B9\u5411\u8FA8\u8A8D\u5148\u524D\u5730\u6A19\uFF0C\u4FEE\u6B63\u65B9\u4F4D\u5F8C\u8FD4\u56DE\u66F8\u5EAB\u4EA4\u4ED8\u3002","rim","high",.38,"chart-return"]],[["dawn","bridge","\u7A7A\u8F09\u5B9A\u7DDA","\u5148\u7528\u5BEC\u98A8\u5ECA\u5EFA\u7ACB\u7A69\u5B9A\u8DEF\u7DDA\uFF0C\u89C0\u5BDF\u4E0B\u964D\u524D\u9700\u8981\u7684\u6E96\u5099\u8DDD\u96E2\u3002","lee","low",.28,"empty-run"],["bridge","camp","\u6EFF\u8F09\u7A7F\u96F2","\u651C\u5E36\u661F\u5100\u7A7F\u904E\u932F\u5C64\u96F2\u5ECA\uFF0C\u907F\u514D\u6025\u5347\u6025\u964D\u5F8C\u624D\u6821\u6B63\u3002","ridge","shelves",.3,"loaded-run"],["camp","archive","\u4EA4\u4ED8\u524D\u5E73\u822A","\u5728\u9577\u8F49\u5F4E\u5F8C\u6062\u5FA9\u5E73\u822A\uFF0C\u5E36\u8DB3\u9918\u80FD\u62B5\u9054\u66F8\u5EAB\u4EA4\u4ED8\u9EDE\u3002","shear","sweep",.35,"handover"],["archive","dawn","\u5B9A\u5411\u8FD4\u5BB6","\u6CBF\u4E0B\u6C89\u98A8\u5C64\u63D0\u65E9\u6536\u5E06\uFF0C\u5728\u6B78\u661F\u81FA\u4E0A\u65B9\u91CD\u65B0\u7A69\u5B9A\u5F8C\u843D\u5730\u3002","descent","descending",.35,"precision-return"]]],pp=["speed","energy","thermal","crosswind","fog","stability"],mp=["\u521D\u5E06\u7AF6\u901F","\u8606\u5149\u84C4\u98A8","\u65B7\u6A4B\u5347\u964D","\u96F7\u810A\u5B9A\u5411","\u66F8\u5EAB\u63A2\u9727","\u6B78\u661F\u5E73\u822A"],gp=["camp","reed","bridge","storm","archive","dawn"];function yp(i,e,t){let n=t===rc.length-1;return i==="speed"?n?{maxVerticalSpeed:3.5}:{minSpeed:t===0?12:e==="corner"?15:16}:i==="energy"?{minEnergy:n?e==="budget"?35:48:[2,5].includes(t)?e==="budget"?42:55:25}:i==="thermal"?[3,6,8].includes(t)?{maxVerticalSpeed:e==="descend"?3:4}:{}:i==="crosswind"?{...[2,4,6,8].includes(t)?{maxVerticalSpeed:e==="loaded-shear"?2.8:3.5}:{},...n?{minEnergy:25}:{}}:i==="fog"?[2,5,8].includes(t)?{maxVerticalSpeed:3.2}:{}:{maxVerticalSpeed:e==="empty-run"?3.5:2.8,...n?{minEnergy:30}:{}}}function xp(i,e,t,n){let s=[];for(let r=0;r<e.gates.length;r++){let a=r?e.gates[r-1]:e.launch,o=e.gates[r],l={challengeId:i,stageId:e.id,gate:r,style:"challenge"},c=t==="energy"&&[0,1,4,7].includes(r),h=t==="energy"?c?7:2.6:t==="stability"?5.2:4.8;if(s.push(su(`wind-${e.id}-leg-${r+1}`,a,o,{...l,name:c?"\u84C4\u98A8\u88DC\u7D66\u6BB5":t==="energy"?"\u6709\u9650\u4F9B\u80FD\u6BB5":`${e.name}\u98A8\u5ECA`,radius:t==="energy"?17:20,strength:t==="speed"?3.4:1.8,charge:h,liftCap:t==="thermal"?8:6})),(o.y-a.y>12||t==="thermal"&&r%3===1||c)&&s.push(ru(`wind-${e.id}-rise-${r+1}`,o,{...l,radius:t==="thermal"?26:22,charge:c?9:7})),t==="crosswind"&&r>0&&r<8){let u=Ms(a,o),p=n==="reverse-shear"&&r>=4?-1:1;s.push(au(`wind-${e.id}-cross-${r+1}`,a,o,{...l,radius:74,strength:n==="loaded-shear"?5.6:4.6,period:r%2?7:9,direction:{x:-u.z*p,y:0,z:u.x*p}}))}}return s}function lu({id:i,fromId:e,toId:t,name:n,description:s,profile:r,altitude:a,widthRatio:o,focus:l,kind:c},h){let u=ki(h,e),p=ki(h,t),f=Ms(u,p),d={x:-f.z,z:f.x},y=Math.hypot(p.x-u.x,p.z-u.z),g=Math.min(620,Math.max(260,y*o)),m={id:i,name:n,description:s,fromIslandId:u.id,toIslandId:p.id,focus:l,landing:!0,launch:gr(u),gates:[],winds:[],decisions:[s,"\u6700\u5F8C\u4E00\u9580\u4F4D\u65BC\u843D\u9EDE\u4E0A\u65B9\uFF1B\u901A\u904E\u5F8C\u4ECD\u9700\u5728\u5CF6\u4E2D\u592E\u843D\u5730\u6309 E \u4EA4\u4ED8\u3002"]};for(let S=0;S<rc.length;S++){let _=rc[S],x=up[r][S]*g,C={id:`${m.id}-gate-${S+1}`,name:S===8?`${p.name}\u9032\u5834\u78BA\u8A8D`:`${n} \xB7 ${S+1}`,type:c==="stability"||l==="loaded-shear"?"carry":c==="fog"?"observe":"survey",x:u.x+(p.x-u.x)*_+d.x*x,y:u.y+(p.y-u.y)*_+dp[a][S],z:u.z+(p.z-u.z)*_+d.z*x,radius:15,...yp(c,l,S)};(c==="crosswind"&&[1,3,5,7].includes(S)||c==="fog"&&S!==0&&S!==8||c==="stability"&&[2,5,7].includes(S))&&(C.heading={...Ms(m.gates[S-1]||m.launch,C),minDot:c==="fog"?.78:.7}),C.instruction=`${C.name}\uFF1A${nu(C)}\u3002${S===8?"\u964D\u843D\u5CF6\u4E2D\u592E\u5F8C\u6309 E\uFF0C\u624D\u6703\u4FDD\u5B58\u672C\u968E\u6BB5\u3002":s}`,m.gates.push(C)}return m.winds=xp(i.split("-stage-")[0],m,c,l),m.waypoints=[m.launch,...m.gates,p],m.distanceMeters=sc([m.launch,...m.gates]),m.designBudgetMinutes=[1.3,2.2],m}var _p=[[["reed","bridge","\u84C4\u98A8\u8B80\u5C64","\u6CBF\u88DC\u7D66\u71B1\u6D41\u84C4\u80FD\uFF0C\u5E36\u9918\u80FD\u4EA4\u4ED8\u65B7\u6A4B\u3002","lee","shelves",.4,"harvest"],["bridge","archive","\u8D8A\u810A\u9810\u7B97","\u7528\u524D\u6BB5\u84C4\u80FD\u8D8A\u904E\u9AD8\u5C64\u5F31\u98A8\uFF0C\u4FDD\u7559\u81F3\u5C11 35% \u9918\u80FD\u3002","shear","high",.4,"budget"],["archive","reed","\u9918\u80FD\u6B78\u5EAD","\u6CBF\u80CC\u98A8\u9577\u5F4E\u56DE\u6536\u80FD\u91CF\uFF0C\u8FD4\u56DE\u8606\u5149\u5EAD\u4EA4\u4ED8\u3002","rim","descending",.42,"reserve"]],[["storm","reed","\u5DE6\u5074\u98A8\u5207","\u5C0D\u9F4A\u7BAD\u982D\uFF0C\u88DC\u511F\u5DE6\u5074\u8108\u52D5\uFF0C\u5728\u8606\u5149\u5EAD\u4EA4\u4ED8\u3002","lee","sweep",.3,"left-shear"],["reed","dawn","\u53CD\u5411\u526A\u6D41","\u5F8C\u534A\u6BB5\u5074\u98A8\u53CD\u8F49\uFF0C\u91CD\u65B0\u8B80\u53D6\u7BAD\u982D\u4E26\u63A7\u5236\u5782\u76F4\u901F\u5EA6\u3002","shear","shelves",.28,"reverse-shear"],["dawn","storm","\u80CC\u98A8\u8FD4\u53F0","\u6CBF\u80CC\u98A8\u810A\u7A69\u5B9A\u8F09\u5100\uFF0C\u8FD4\u56DE\u5929\u6587\u53F0\u4EA4\u4ED8\u3002","ridge","descending",.32,"lee-return"]],[["dawn","archive","\u8996\u7DDA\u4EA4\u6703","\u4F9D\u5BE6\u9AD4\u91D1\u74B0\u9010\u6B21\u5B9A\u4F4D\uFF0C\u7A7F\u9727\u524D\u78BA\u8A8D\u65B9\u5411\u3002","lee","sweep",.36,"sightline"],["archive","camp","\u4F4E\u9727\u822A\u9053","\u4F4E\u5C64\u9727\u4E2D\u6CBF\u98A8\u5ECA\u5C0E\u822A\uFF0C\u5E73\u7A69\u901A\u904E\u65B9\u5411\u74B0\u3002","shear","low",.35,"fog-channel"],["camp","dawn","\u98A8\u5716\u5FA9\u6838","\u5F9E\u9AD8\u5C64\u91CD\u8B80\u5730\u6A19\uFF0C\u8FD4\u56DE\u6B78\u661F\u81FA\u4EA4\u4ED8\u5B8C\u6574\u661F\u5716\u3002","rim","high",.38,"chart-return"]]];function cu(i){return _p.map((e,t)=>{let n=`campaign-circuit-${t+1}`,s=["energy","crosswind","fog"][t],r=e.map(([a,o,l,c,h,u,p,f],d)=>lu({id:`${n}-stage-${d+1}`,fromId:a,toId:o,name:l,description:c,profile:h,altitude:u,widthRatio:p,focus:f,kind:s},i));return{id:n,kind:s,campaignIndex:t,name:["\u84C4\u98A8\u5DE1\u6E2C","\u5074\u6D41\u5B9A\u5411","\u9727\u6D77\u5FA9\u6838"][t],stages:r}})}function hu(i){return fp.map((e,t)=>{let n=`challenge-${t+1}`,s=pp[t],r=ki(i,gp[t]),a=e.map(([o,l,c,h,u,p,f,d],y)=>lu({id:`${n}-stage-${y+1}`,fromId:o,toId:l,name:c,description:h,profile:u,altitude:p,widthRatio:f,focus:d,kind:s},i));return{id:n,islandId:r.id,kind:s,name:mp[t],courseRevision:2,description:`${a.length} \u6BB5\u8DE8\u5CF6\u822A\u7A0B\uFF1A${a.map(o=>o.name).join(" \u2192 ")}\u3002\u6BCF\u6BB5\u5B8C\u6210\u5F8C\u5728\u76EE\u7684\u5CF6\u4E2D\u592E\u843D\u5730\u6309 E\uFF1B\u5931\u901F\u6216\u91CD\u8F09\u53EA\u91CD\u8A66\u7576\u524D\u6BB5\u3002`,x:r.x+(t%2?-18:18),y:r.y+22,z:r.z-18,radius:10,minEnergy:0,minSpeed:0,stages:a,distanceMeters:a.reduce((o,l)=>o+l.distanceMeters,0),designBudgetMinutes:[6,8],timingStatus:"design-budget-not-measured"}})}var yr=2700,ac=4,wn=Object.freeze([{id:"turn",name:"\u71D5\u7FFC\u8235",description:"\u9748\u6D3B\u8F49\u5411\u3001\u7CBE\u6E96\u843D\u5CF6\uFF1B\u5DE1\u822A\u8F03\u6162\u3002",speed:.92,turn:1.6,energy:1},{id:"reserve",name:"\u84C4\u98A8\u56CA",description:"\u96E2\u958B\u98A8\u5E36\u66F4\u8010\u98DB\uFF1B\u8F49\u5411\u8207\u9806\u98A8\u52A0\u901F\u8F03\u5F31\u3002",speed:.97,turn:.86,energy:.7},{id:"tailwind",name:"\u9010\u98A8\u9C2D",description:"\u9806\u98A8\u52A0\u901F\u6700\u5F37\uFF1B\u504F\u96E2\u98A8\u5E36\u6642\u66F4\u8017\u80FD\u3002",speed:1.08,turn:1,energy:1.18}]),jn=[{id:"island-camp",name:"\u6668\u98A8\u71DF\u5730",region:"\u8D77\u98A8",x:0,y:0,z:0,radius:38,color:"#9aab74",station:!1},{id:"island-reed",name:"\u8606\u5149\u5EAD",region:"\u8D77\u98A8",x:-80,y:8,z:-180,radius:34,color:"#88ad82",station:!0},{id:"island-bridge",name:"\u65B7\u6A4B\u4E4B\u74B0",region:"\u65B7\u6A4B",x:90,y:18,z:-335,radius:34,color:"#baa17a",station:!1},{id:"island-storm",name:"\u96F7\u96F2\u5929\u6587\u53F0",region:"\u96F7\u96F2",x:255,y:28,z:-195,radius:41,color:"#8b9d9a",station:!0},{id:"island-archive",name:"\u6D6E\u5149\u66F8\u5EAB",region:"\u65B7\u6A4B",x:220,y:18,z:25,radius:34,color:"#9da984",station:!1},{id:"island-dawn",name:"\u6B78\u661F\u81FA",region:"\u96F7\u96F2",x:65,y:4,z:185,radius:38,color:"#b4ab80",station:!0}].map(i=>({...i,x:i.x*ac,z:i.z*ac})),Da=(i,e,t)=>({x:i,y:e,z:t}),du=iu(jn),Ua=[];for(let i of jn)Ua.push({id:`wind-lift-${i.id}`,type:"thermal",name:"\u8D77\u822A\u71B1\u6D41",x:i.x,y:i.y-14,z:i.z,radius:i.radius+11,height:86,ceiling:i.y+33,strength:7,direction:Da(0,1,0)});Ua.push(...ou(du));Ua.push({id:"wind-cross-reed",type:"crosswind",name:"\u8108\u52D5\u5074\u98A8",x:-168,y:-25,z:-384,radius:74,height:100,strength:4.5,period:8,direction:Da(1,0,.2)},{id:"wind-cross-storm",type:"crosswind",name:"\u96F7\u810A\u5074\u98A8",x:376,y:-20,z:-752,radius:92,height:120,strength:6,period:10,direction:Da(.2,0,1)},{id:"wind-cross-dawn",type:"crosswind",name:"\u6B78\u661F\u5074\u98A8",x:640,y:-20,z:-16,radius:88,height:120,strength:5,period:9,direction:Da(-1,0,.1)});var uu=[["\u7B2C\u4E00\u5C01\u822A\u4FE1","\u6211\u5011\u628A\u5BB6\u7BC9\u5728\u98A8\u4E0A\uFF0C\u4ECD\u9858\u6BCF\u500B\u51FA\u767C\u7684\u4EBA\u90FD\u6709\u4E00\u689D\u56DE\u5BB6\u7684\u8DEF\u3002"],["\u5E06\u5320\u7684\u523B\u5EA6","\u4E0D\u662F\u628A\u5E06\u62C9\u5F97\u6700\u7DCA\uFF0C\u800C\u662F\u77E5\u9053\u4F55\u6642\u8B93\u98A8\u7A7F\u904E\u3002"],["\u8606\u8466\u7684\u8A18\u61B6","\u98A8\u7D93\u904E\u8606\u8466\uFF0C\u7559\u4E0B\u4E86\u7B2C\u4E00\u9996\u80FD\u88AB\u770B\u898B\u7684\u6B4C\u3002"],["\u5F15\u98A8\u8005\u7684\u7B46\u8A18","\u91D1\u8272\u4E0A\u5347\u74B0\u662F\u71B1\u6D41\uFF0C\u5F4E\u66F2\u9577\u5E36\u662F\u9806\u98A8\u3002\u4E0D\u8981\u53EA\u9760\u984F\u8272\u8FA8\u8A8D\u3002"],["\u6A4B\u4E0A\u7684\u7D04\u5B9A","\u6A4B\u66FE\u9023\u63A5\u5169\u5EA7\u5CF6\u3002\u6A4B\u65B7\u5F8C\uFF0C\u4FE1\u4EF6\u4ECD\u7136\u62B5\u9054\u3002"],["\u820A\u65E5\u6E2C\u98A8\u5C3A","\u5F9E\u7B49\u5F85\u98A8\u5230\u8B80\u61C2\u98A8\uFF0C\u6587\u660E\u8D70\u904E\u7684\u8DDD\u96E2\u6BD4\u5CF6\u8207\u5CF6\u66F4\u9060\u3002"],["\u5929\u6587\u53F0\u661F\u5716","\u661F\u5716\u4E0D\u662F\u70BA\u4E86\u77E5\u9053\u6211\u5011\u5728\u54EA\uFF0C\u800C\u662F\u63D0\u9192\u6211\u5011\u8981\u53BB\u4F55\u65B9\u3002"],["\u96F7\u5B63\u89C0\u6E2C\u8A8C","\u96F7\u5FC3\u4EAE\u8D77\u6642\uFF0C\u7E5E\u884C\u5916\u7DE3\uFF1B\u98A8\u5F9E\u4E0D\u8981\u6C42\u83BD\u649E\u7684\u52C7\u6562\u3002"],["\u6D6E\u5149\u66F8\u9801","\u6BCF\u4E00\u672C\u66F8\u90FD\u66FE\u662F\u4E00\u500B\u4EBA\u7559\u4E0B\u7684\u5CB8\u3002"],["\u7121\u540D\u8FD4\u822A\u8005","\u4ED6\u5E36\u56DE\u7684\u4E0D\u662F\u5BF6\u7269\uFF0C\u800C\u662F\u6240\u6709\u4EBA\u90FD\u80FD\u8D70\u7684\u822A\u7DDA\u3002"],["\u6B78\u661F\u5EA7\u6A19","\u7B2C\u4E09\u675F\u5149\u9EDE\u4EAE\u6642\uFF0C\u9060\u65B9\u7D42\u65BC\u6210\u70BA\u53EF\u4EE5\u56DE\u53BB\u7684\u5730\u65B9\u3002"],["\u7D66\u4E0B\u4E00\u4F4D\u65C5\u4EBA","\u4F60\u7684\u822A\u8DE1\u4E5F\u6703\u6210\u70BA\u5225\u4EBA\u7684\u5730\u5716\u3002\u73FE\u5728\uFF0C\u56DE\u5BB6\u5427\u3002"]],vp=[[[-.76,-.2,1.4,"\u71DF\u5730\u897F\u5317\u5074\u8349\u5730\uFF0C\u6CBF\u5CF6\u9762\u8D70\u5230\u5916\u7DE3\u5167\u5074\u3002"],[.45,.45,20,"\u71DF\u5730\u6771\u5357\u5074\u4E0A\u7A7A 20 \u516C\u5C3A\uFF0C\u501F\u4E2D\u592E\u71B1\u6D41\u5347\u8D77\u5F8C\u8F49\u5411\u3002"]],[[-.55,.58,1.4,"\u8606\u5149\u5EAD\u897F\u5357\u5074\u8349\u5730\uFF0C\u7559\u5728\u5CF6\u7DE3\u77F3\u677F\u5167\u5074\u3002"],[.65,-.35,24,"\u8606\u5149\u5EAD\u6771\u5317\u5074\u4E0A\u7A7A 24 \u516C\u5C3A\uFF0C\u5F9E\u71B1\u6D41\u51FA\u53E3\u5411\u6771\u504F\u8F49\u3002"]],[[.72,.1,1.4,"\u65B7\u6A4B\u6771\u5074\u5CF6\u9762\uFF0C\u65B7\u6A4B\u907A\u8DE1\u5167\u5074\u7684\u53EF\u7AD9\u7ACB\u77F3\u677F\u3002"],[-.5,-.55,26,"\u65B7\u6A4B\u897F\u5317\u5074\u4E0A\u7A7A 26 \u516C\u5C3A\uFF0C\u5148\u5347\u81F3\u6A4B\u9802\u822A\u6A19\u9644\u8FD1\u3002"]],[[-.72,.18,1.4,"\u5929\u6587\u53F0\u897F\u5074\u8349\u5730\uFF0C\u4E2D\u592E\u74B0\u5EA7\u5916\u5074\u4F46\u4ECD\u5728\u5CF6\u9762\u4E0A\u3002"],[.5,-.5,25,"\u5929\u6587\u53F0\u6771\u5317\u5074\u4E0A\u7A7A 25 \u516C\u5C3A\uFF0C\u96E2\u958B\u71B1\u6D41\u6642\u6CBF\u5317\u5074\u7E5E\u904E\u67F1\u51A0\u3002"]],[[-.2,.78,1.4,"\u66F8\u5EAB\u5357\u5074\u5CF6\u9762\uFF0C\u74B0\u5F62\u66F8\u67B6\u5916\u7684\u8349\u5730\u3002"],[.58,-.48,23,"\u66F8\u5EAB\u6771\u5317\u5074\u4E0A\u7A7A 23 \u516C\u5C3A\uFF0C\u501F\u4E2D\u592E\u71B1\u6D41\u8D8A\u904E\u74B0\u5F62\u67F1\u9802\u3002"]],[[.72,.15,1.4,"\u6B78\u661F\u81FA\u6771\u5074\u8349\u5730\uFF0C\u671D\u6668\u5149\u8DEF\u6A19\u8D70\u5230\u5CF6\u7DE3\u5167\u5074\u3002"],[-.58,-.45,22,"\u6B78\u661F\u81FA\u897F\u5317\u5074\u4E0A\u7A7A 22 \u516C\u5C3A\uFF0C\u56DE\u5230\u71B1\u6D41\u5F8C\u5411\u5317\u96E2\u6D41\u3002"]]],Mp=jn.flatMap((i,e)=>vp[e].map(([t,n,s,r],a)=>({id:`relic-${String(e*2+a+1).padStart(2,"0")}`,islandId:i.id,name:uu[e*2+a][0],text:uu[e*2+a][1],hint:r,x:i.x+t*i.radius,y:i.y+s,z:i.z+n*i.radius,radius:3.6}))),Sp=hu(jn),ue=Object.freeze({mapScale:ac,boundsRadius:2600,islands:jn,winds:Ua,routes:du,relics:Mp,challenges:Sp,campaignCircuits:cu(jn),hazards:[{id:"hazard-thunder",type:"thunder",name:"\u96F7\u96F2\u6838\u5FC3",x:360,y:10,z:-680,radius:80,height:100,period:10,description:"\u96F7\u5FC3\u6BCF 10 \u79D2\u8108\u52D5\uFF1B\u6CBF\u4E0A\u5C64\u98A8\u5ECA\u7E5E\u958B\u96F7\u5FC3\uFF0C\u9583\u5149\u671F\u9593\u9760\u8FD1\u6703\u52A0\u5FEB\u8017\u80FD\u3002"},{id:"hazard-fog",type:"fog",name:"\u6D6E\u5149\u9727\u6D77",x:868,y:-8,z:-12,radius:175,height:100,description:"\u6CBF\u66F8\u5EAB\u65B9\u4F4D\u8207\u4E0B\u4E00\u500B\u5BE6\u9AD4\u822A\u6A19\u8FA8\u5411\uFF1B\u9727\u53EA\u906E\u64CB\u8996\u91CE\uFF0C\u4E0D\u76F4\u63A5\u6263\u80FD\u91CF\u3002"},{id:"hazard-fog-central",type:"fog",name:"\u4E2D\u592E\u9727\u5ECA",x:560,y:-8,z:35,radius:185,height:100,description:"\u9032\u9727\u524D\u8B80\u53D6\u98A8\u5ECA\u65B9\u5411\uFF1B\u4F4E\u5C64\u7BC0\u80FD\uFF0C\u9AD8\u5C64\u8996\u91CE\u8F03\u6E05\u695A\u3002"},{id:"hazard-fog-west",type:"fog",name:"\u897F\u810A\u96F2\u5E55",x:250,y:-8,z:-490,radius:215,height:90,description:"\u897F\u5411\u822A\u6BB5\u7684\u96F2\u5E55\u906E\u4F4F\u8FD1\u666F\uFF0C\u6CBF\u6709\u65B9\u5411\u7684\u89C0\u6E2C\u9580\u9010\u6BB5\u5B9A\u4F4D\u3002"},{id:"hazard-fog-north",type:"fog",name:"\u5317\u810A\u8584\u9727",x:680,y:-8,z:-610,radius:170,height:100,description:"\u96E2\u958B\u66F8\u5EAB\u5F8C\u7684\u7B2C\u4E00\u6BB5\u9727\u5E36\uFF1B\u5148\u78BA\u8A8D\u4E0B\u4E00\u9580\u65B9\u5411\u518D\u9032\u5165\u96F2\u5E55\u3002"}],dialogues:[{id:"dialogue-1",station:"island-reed",title:"\u7B2C\u4E00\u675F\u5149",text:"\u516B\u4EFD\u98A8\u5C64\u6A23\u672C\u6821\u6E96\u4E86\u8606\u5149\u98A8\u6A19\u3002\u73FE\u5728\u7A69\u5B9A\u904B\u9001\u5B9A\u5411\u661F\u5100\uFF1A\u53EF\u7E5E\u65B7\u6A4B\u5916\u7DE3\uFF0C\u4E5F\u53EF\u63A5\u4E0A\u96F7\u810A\u9AD8\u5C64\u7A84\u98A8\u5ECA\u3002"},{id:"dialogue-2",station:"island-storm",title:"\u88AB\u8A18\u4F4F\u7684\u822A\u7DDA",text:"\u5B9A\u5411\u661F\u5100\u5B89\u5168\u62B5\u9054\uFF0C\u516B\u6BB5\u7D00\u9304\u8B93\u9060\u661F\u91CD\u65B0\u6E05\u6670\u3002\u63A5\u8457\u5F9E\u4E0D\u540C\u9AD8\u5EA6\u548C\u65B9\u4F4D\u89C0\u6E2C\u9727\u6D77\uFF0C\u91CD\u5EFA\u5357\u65B9\u6B78\u661F\u81FA\u7684\u5EA7\u6A19\u3002"},{id:"dialogue-3",station:"island-dawn",title:"\u5BB6\u7684\u5EA7\u6A19",text:"\u516B\u500B\u65B9\u4F4D\u7BC0\u9EDE\u5DF2\u4EA4\u6703\u6210\u661F\u5716\u3002\u73FE\u5728\u6CBF\u6B78\u822A\u98A8\u5E36\u8FD4\u56DE\u6668\u98A8\u71DF\u5730\uFF0C\u8B93\u6240\u6709\u65C5\u4EBA\u90FD\u80FD\u627E\u5230\u56DE\u5BB6\u7684\u65B9\u5411\u3002"}],ending:{title:"\u98A8\u8A18\u5F97\u4F60\u7684\u6B78\u9014",text:"\u5929\u6587\u53F0\u91CD\u65B0\u4EAE\u8D77\u3002\u516D\u5EA7\u5CF6\u4E0D\u518D\u662F\u6563\u843D\u7684\u5CB8\uFF0C\u800C\u662F\u4E00\u5F35\u53EF\u4EE5\u91CD\u8D70\u3001\u53EF\u4EE5\u5206\u4EAB\u7684\u822A\u5716\u3002\u4E0B\u4E00\u8D9F\uFF0C\u8A66\u8457\u66F4\u5E73\u7A69\u3001\u66F4\u8FC5\u901F\uFF0C\u6216\u8B80\u5B8C\u98A8\u7559\u4E0B\u7684\u5341\u4E8C\u5C01\u4FE1\u3002"}}),Ss=jn.filter(i=>i.station).map(i=>i.id),Ht=i=>jn.find(e=>e.id===i)||jn[0],oc=(i,e)=>!i.routeId||!e.activeChallenge&&e.activeCampaignCircuit==null&&i.style===(e.trackedHint||e.mainTransit?.[e.mainTransitIndex]?"safe":e.routeStyle);var lc=23;function cc(i){let e=new Float64Array(i.length*lc);for(let t=0;t<i.length;t++){let n=i[t],s=t*lc,r=n.type==="thermal"?0:n.type==="tailwind"?1:2;e[s]=r,e[s+1]=n.x,e[s+2]=n.y,e[s+3]=n.z,e[s+4]=n.radius,e[s+5]=n.height,e[s+6]=n.ceiling||0,e[s+7]=n.strength,e[s+8]=n.charge??(r===0?9:n.style==="safe"?4.5:2.1),e[s+9]=n.liftCap??4.4,e[s+10]=n.direction.x,e[s+11]=n.direction.z,e[s+12]=n.period||1,e[s+13]=n.gate??-1,e[s+14]=n.start?1:0,n.start&&(e[s+15]=n.start.x,e[s+16]=n.start.z,e[s+17]=n.end.x-n.start.x,e[s+18]=n.end.z-n.start.z,e[s+19]=e[s+17]**2+e[s+18]**2)}return e}var bp=["thermal","tailwind","crosswind"];function hc(i,e,t,n,s,r,a,o,l,c){for(let h=0;h<i.length;h+=lc){if(t>=0&&i[h+13]!==t)continue;let u=i[h+2];if(e.y<u||e.y>u+i[h+5])continue;let p;if(i[h+14]){let S=i[h+15],_=i[h+16],x=i[h+17],C=i[h+18],w=((e.x-S)*x+(e.z-_)*C)/i[h+19],A=w<0?0:w>1?1:w;p=it(e.x-S-A*x,e.z-_-A*C)}else p=it(e.x-i[h+1],e.z-i[h+3]);let f=i[h+4],d=Math.max(0,1-Math.max(0,p-f*.65)/(f*.35));if(d<=0)continue;let y=i[h],g=bp[y],m=!1;for(let S=0;S<l.count;S++)if(c[S]===g){m=!0;break}if(m||(c[l.count++]=g),y===0){let S=(i[h+6]-e.y)*.38+1.7,_=i[h+7];l.lift=Math.max(l.lift,(S<-1.2?-1.2:S>_?_:S)*d),l.charge=Math.max(l.charge,i[h+8]*d)}else if(y===1){let S=n*i[h+10]+s*i[h+11],_=S>0?S:0;l.boost=Math.max(l.boost,i[h+7]*_*d*(o?1.75:1));let x=(i[h+6]-e.y)*.18+1.7,C=i[h+9];l.lift=Math.max(l.lift,(x<-1.2?-1.2:x>C?C:x)*d),l.charge=Math.max(l.charge,i[h+8]*d)}else{let S=Math.sin(r/i[h+12]*Math.PI*2+a),_=S>0?S:0;l.wx+=i[h+10]*i[h+7]*_*d,l.wz+=i[h+11]*i[h+7]*_*d}}}var Vi=4,Ep="aetherwake-save",Hi=i=>JSON.parse(JSON.stringify(i)),sn=(i,e=0,t=1e9)=>Number.isFinite(i)&&i>=0?Math.min(t,i):e,Na=(i,e)=>Array.isArray(i)?[...new Set(i.filter(t=>e.includes(t)))]:[],Es=i=>i!==null&&typeof i=="object"&&!Array.isArray(i),Fa=(i,e)=>Math.trunc(sn(i,0,e)),uc=i=>Array.isArray(i.stages)?i.stages.length:0,wp=i=>Math.max(0,...ue.routes.filter(e=>e.mission===i).map(e=>Array.isArray(e.samples)?e.samples.length:0)),Oa=i=>Array.isArray(i)?[...new Set(i.filter(e=>typeof e=="string"&&e.length>0))]:[];function vi(i,e,t=!1){return Es(i)?Object.fromEntries(Object.entries(i).flatMap(([n,s])=>{if(e&&!e.includes(n)||!Es(s)||!Number.isFinite(s.time)||s.time<0)return[];let r=t?{time:sn(s.time),assisted:s.assisted===!0,module:wn.some(a=>a.id===s.module)?s.module:"turn",seed:Math.trunc(sn(s.seed,1,4294967295))>>>0}:{time:sn(s.time),score:sn(s.score),stalls:Math.trunc(sn(s.stalls)),assisted:s.assisted===!0};return[[n,r]]})):{}}function Gi(){return{schemaVersion:Vi,seed:1,module:"turn",checkpoint:"island-camp",unlocked:["island-camp"],activated:[],relics:[],mainSamples:[0,0,0],returnSamples:0,campaignCircuitStages:[0,0,0],activeCampaignCircuit:null,mode:"expedition",activeSeconds:0,failed:!1,failureReason:null,courseStages:Object.fromEntries(ue.challenges.map(i=>[i.id,0])),challenges:[],completedChallenges:[],cargoStability:100,cargoDamage:0,elapsed:0,segmentStart:0,stalls:0,assist:!1,usedAssist:!1,routeStyle:"safe",completed:!1,records:{},routeRecords:{},legacyRecords:{},legacyRouteRecords:{},legacyChallenges:[],settings:{music:.35,sfx:.7,reducedMotion:!1,camera:"follow",quality:"auto"}}}function bs(i){if(!i||typeof i!="object"||Array.isArray(i)||i.schemaVersion!==Vi||!ue.islands.some(n=>n.id===i.checkpoint)||!Array.isArray(i.relics)||!Array.isArray(i.activated))return null;let e=Gi();e.seed=Math.trunc(sn(i.seed,1,4294967295))>>>0,e.module=wn.some(n=>n.id===i.module)?i.module:"turn",e.checkpoint=i.checkpoint,e.unlocked=Na(i.unlocked,ue.islands.map(n=>n.id)),e.unlocked=[...new Set(["island-camp",...e.unlocked,i.checkpoint])],e.relics=Na(i.relics,ue.relics.map(n=>n.id)),e.mainSamples=e.mainSamples.map((n,s)=>Fa(Array.isArray(i.mainSamples)?i.mainSamples[s]:0,wp(s+1))),e.returnSamples=Fa(i.returnSamples,6),e.campaignCircuitStages=[0,1,2].map(n=>Fa(i.campaignCircuitStages?.[n],3)),e.activeCampaignCircuit=[0,1,2].includes(i.activeCampaignCircuit)&&e.campaignCircuitStages[i.activeCampaignCircuit]<3?i.activeCampaignCircuit:null,e.mode=i.mode==="exploration"?"exploration":"expedition",e.activeSeconds=sn(i.activeSeconds,0,1e9),e.failed=e.mode==="expedition"&&(i.failed===!0||e.activeSeconds>=2700),e.failureReason=e.failed?"weather-window":null;for(let n of ue.challenges)e.courseStages[n.id]=Fa(Es(i.courseStages)?i.courseStages[n.id]:0,uc(n));let t=ue.challenges.filter(n=>uc(n)>0&&e.courseStages[n.id]===uc(n)).map(n=>n.id);e.challenges=Na(i.challenges,t),e.completedChallenges=[...new Set([...Na(i.completedChallenges,ue.challenges.map(n=>n.id)),...t])];for(let n of Ss)if(i.activated.includes(n))e.activated.push(n);else break;e.activeCampaignCircuit=null;for(let n=0;n<e.activated.length&&n<3;n++)if(e.campaignCircuitStages[n]<3){e.activeCampaignCircuit=n;break}if(e.elapsed=sn(i.elapsed),e.stalls=Math.trunc(sn(i.stalls)),e.segmentStart=Number.isFinite(i.elapsed)&&i.elapsed>=0&&i.elapsed<=1e9&&Number.isFinite(i.segmentStart)&&i.segmentStart>=0&&i.segmentStart<=e.elapsed?i.segmentStart:null,e.cargoStability=sn(i.cargoStability,100,100),e.cargoDamage=sn(i.cargoDamage),e.assist=i.assist===!0,e.routeStyle=i.routeStyle==="shortcut"?"shortcut":"safe",e.usedAssist=i.usedAssist===!0||e.assist,e.completed=i.completed===!0&&e.activated.length===Ss.length&&i.checkpoint==="island-camp"&&!e.failed&&e.returnSamples===6&&e.mainSamples.every(n=>n===8)&&e.campaignCircuitStages.every(n=>n===3),Es(i.settings)){let n=i.settings;e.settings.music=sn(n.music,.35,1),e.settings.sfx=sn(n.sfx,.7,1),e.settings.reducedMotion=n.reducedMotion===!0,e.settings.camera=n.camera==="overhead"?"overhead":"follow",e.settings.quality=["auto","low","high"].includes(n.quality)?n.quality:"auto"}return e.records=vi(i.records,wn.map(n=>n.id)),e.routeRecords=vi(i.routeRecords,ue.routes.map(n=>n.id),!0),e.legacyRecords=vi(i.legacyRecords),e.legacyRouteRecords=vi(i.legacyRouteRecords,null,!0),e.legacyChallenges=Oa(i.legacyChallenges),e}function Tp(i){if(i?.schemaVersion===Vi)return{save:bs(i),migrated:!1};if(Es(i)&&i.schemaVersion===3){let t=Gi(),n=s=>Object.fromEntries(Object.entries(s||{}).map(([r,a])=>[`v3:${r}`,a]));return{migrated:!0,save:bs({...i,...t,seed:i.seed,module:i.module,settings:i.settings,relics:i.relics,unlocked:i.unlocked,courseStages:i.courseStages,challenges:i.challenges,completedChallenges:i.completedChallenges,legacyRecords:{...i.legacyRecords,...n(i.records)},legacyRouteRecords:{...i.legacyRouteRecords,...n(i.routeRecords)},legacyChallenges:i.legacyChallenges})}}let e=i?.schemaVersion===1||i?.schemaVersion===void 0&&i?.version===1;if(Es(i)&&(e||i.schemaVersion===2)){let t=Gi(),n=e?{...t,...i,checkpoint:i.checkpoint??i.island??t.checkpoint,relics:i.relics??i.fragments??[],activated:i.activated??[]}:i,s=bs({...n,schemaVersion:Vi,activated:[],completed:!1,segmentStart:null,mainSamples:t.mainSamples,courseStages:t.courseStages,cargoStability:100,cargoDamage:0,challenges:[],completedChallenges:[],records:{},routeRecords:{},legacyRecords:{...vi(i.legacyRecords),...vi(i.records)},legacyRouteRecords:{...vi(i.legacyRouteRecords,null,!0),...vi(i.routeRecords,null,!0)},legacyChallenges:[...Oa(i.legacyChallenges),...Oa(i.completedChallenges),...Oa(i.challenges)]});return{save:s,migrated:s!==null}}return{save:null,migrated:!1}}var Ba=class{constructor(e,t=Ep){if(this.key=t,this.memory=Gi(),this.storage=e,this.pendingWriteWarning=null,e===void 0)try{this.storage=globalThis.localStorage}catch{this.storage=null}}load(){if(this.pendingWriteWarning)return{save:Hi(this.memory),warning:this.pendingWriteWarning,migrated:!1};if(!this.storage)return{save:Hi(this.memory),warning:"\u700F\u89BD\u5668\u5132\u5B58\u4E0D\u53EF\u7528\uFF1B\u672C\u6B21\u9032\u5EA6\u50C5\u4FDD\u7559\u5728\u8A18\u61B6\u9AD4\u3002",migrated:!1};try{let e=this.storage.getItem(this.key);if(!e)return{save:Hi(this.memory),warning:null,migrated:!1};let t;try{t=JSON.parse(e)}catch{t=null}let n=Tp(t);return n.save?(this.memory=n.save,{save:Hi(this.memory),warning:n.migrated?"\u820A\u7248\u7D00\u9304\u5DF2\u6B78\u6A94\uFF1B\u65B0\u7248\u52A0\u5165\u4E09\u5340\u5FC5\u4FEE\u5DE1\u6E2C\u8207\u516D\u5EA7\u8FD4\u822A\u822A\u6A19\u3002\u4E3B\u7DDA\u7531\u71DF\u5730\u91CD\u65B0\u958B\u59CB\uFF0C\u788E\u7247\u3001\u8A2D\u5B9A\u8207\u5DF2\u4EA4\u4ED8\u7684\u65B0\u7248\u9078\u4FEE\u968E\u6BB5\u4FDD\u7559\u3002":null,migrated:n.migrated}):{save:Hi(this.memory),warning:"\u5B58\u6A94\u5DF2\u640D\u58DE\u6216\u7248\u672C\u4E0D\u652F\u63F4\uFF1B\u539F\u59CB\u5B58\u6A94\u4ECD\u4FDD\u7559\uFF0C\u73FE\u5728\u4F7F\u7528\u5B89\u5168\u7684\u65B0\u9032\u5EA6\u3002",migrated:!1}}catch{return{save:Hi(this.memory),warning:"\u7121\u6CD5\u8B80\u53D6\u700F\u89BD\u5668\u5132\u5B58\uFF1B\u672C\u6B21\u9032\u5EA6\u50C5\u4FDD\u7559\u5728\u8A18\u61B6\u9AD4\u3002",migrated:!1}}}save(e){let t=bs({...this.memory,...e,schemaVersion:Vi,settings:{...this.memory.settings,...e?.settings}});if(!t)return{ok:!1,warning:"\u5B58\u6A94\u8CC7\u6599\u4E0D\u5B8C\u6574\uFF0C\u5DF2\u4FDD\u7559\u4E0A\u4E00\u500B\u5B89\u5168\u5B58\u6A94\u3002"};if(this.memory=t,!this.storage)return this.pendingWriteWarning="\u700F\u89BD\u5668\u5132\u5B58\u4E0D\u53EF\u7528\uFF1B\u672C\u6B21\u9032\u5EA6\u50C5\u4FDD\u7559\u5728\u8A18\u61B6\u9AD4\u3002",{ok:!1,warning:this.pendingWriteWarning};try{return this.storage.setItem(this.key,JSON.stringify(t)),this.pendingWriteWarning=null,{ok:!0,warning:null}}catch{return this.pendingWriteWarning="\u5132\u5B58\u7A7A\u9593\u4E0D\u8DB3\u6216\u88AB\u5C01\u9396\uFF1B\u76EE\u524D\u9032\u5EA6\u4ECD\u5728\u8A18\u61B6\u9AD4\uFF0C\u96E2\u958B\u524D\u8ACB\u4FDD\u7559\u6B64\u9801\u3002",{ok:!1,warning:this.pendingWriteWarning}}}clearProgress(){let e=Hi(this.memory.settings);return this.save({...Gi(),settings:e})}};var fu=({x:i,y:e,z:t})=>`${i},${e},${t}`,Ap=({x:i,y:e,z:t})=>({x:i,y:e,z:t}),Cp=({x:i,y:e,z:t})=>({x:i,y:e+26,z:t}),dc=(i,e)=>Math.hypot(i.x-e.x,i.y-e.y,i.z-e.z);function Rp(){let i=new Map,e=new Map,t=r=>{let a=fu(r);return i.has(a)||i.set(a,{position:Ap(r),edges:new Map}),a},n=(r,a)=>{if(r===a)return;let o=dc(i.get(r).position,i.get(a).position);i.get(r).edges.set(a,o),i.get(a).edges.set(r,o)};for(let r of ue.routes.filter(a=>a.style==="safe")){let a;for(let o of r.waypoints){let l=t(o);a!==void 0&&n(a,l),a=l}}let s=[...i.keys()];for(let r of ue.islands){let a=Cp(r),o=fu(a);if(e.set(r.id,o),i.has(o))continue;let l=s.reduce((c,h)=>c===void 0||dc(a,i.get(h).position)<dc(a,i.get(c).position)?h:c,void 0);if(l===void 0)throw new Error("The safe transit network has no route waypoints.");t(a),n(o,l)}return{nodes:i,terminals:e}}var xr=Rp();function za(i,e){let t=xr.terminals.get(i),n=xr.terminals.get(e);if(t===void 0||n===void 0)throw new RangeError("Safe transit requires two known island IDs.");if(t===n)return[];let s=new Map([[t,0]]),r=new Map,a=new Set(xr.nodes.keys());for(;a.size;){let o,l=1/0;for(let c of a){let h=s.get(c)??1/0;h<l&&(o=c,l=h)}if(o===void 0)break;if(o===n){let c=[];for(let h=n;h!==t;h=r.get(h))c.push(xr.nodes.get(h).position);return c.reverse().map(h=>({...h,radius:24,name:"\u5B89\u5168\u63A5\u99C1\u98A8\u6A19",instruction:"\u6CBF\u5BEC\u98A8\u5ECA\u98DB\u5411\u63A5\u99C1\u6A19\uFF1B\u62B5\u5CF6\u5F8C\u518D\u524D\u5F80\u9060\u5F81\u5165\u53E3\u3002"}))}a.delete(o);for(let[c,h]of xr.nodes.get(o).edges){if(!a.has(c))continue;let u=l+h;u<(s.get(c)??1/0)&&(s.set(c,u),r.set(c,o))}}throw new Error(`No safe transit route connects ${i} to ${e}.`)}var _r=(i,e,t)=>Math.max(e,Math.min(t,i)),pu=i=>JSON.parse(JSON.stringify(i)),Wi=(i,e)=>it(i.x-e.x,i.z-e.z),Ip=i=>{if(Number.isFinite(Number(i)))return Math.trunc(Number(i))>>>0;let e=2166136261;for(let t of String(i))e=Math.imul(e^t.charCodeAt(0),16777619);return e>>>0},ws=class{constructor({seed:e=1,module:t="turn",save:n}={}){this.events=[],this.persisted=bs(n)||Gi(),this._setup({seed:n?this.persisted.seed:e,module:n?this.persisted.module:t,resume:!!n})}_setup({seed:e,module:t,resume:n=!1}){let s=this.persisted,r=n?s.activeCampaignCircuit!=null?ue.campaignCircuits[s.activeCampaignCircuit].stages[s.campaignCircuitStages[s.activeCampaignCircuit]].fromIslandId:s.checkpoint:"island-camp",a=Ht(r);this.state={seed:Ip(e),module:wn.some(o=>o.id===t)?t:"turn",player:{x:a.x,y:a.y,z:a.z,vx:0,vy:0,vz:0,heading:0,grounded:!0,gliding:!1,energy:100,braking:!1},elapsed:n?s.elapsed:0,checkpoint:r,activated:n?[...s.activated]:[],relics:[...s.relics],challenges:n?[...s.challenges]:[],completedChallenges:[...s.completedChallenges],unlocked:[...s.unlocked],stalls:n?s.stalls:0,status:n&&s.failed?"failed":n&&s.completed?"complete":"ready",assist:s.assist,usedAssist:n?s.usedAssist:s.assist,routeStyle:s.routeStyle,segmentFailures:0,distance:0,wind:[],hazard:null,lowEnergy:!1,lastLanding:{islandId:a.id,precise:!0},score:0,rating:null,nearby:null,objective:null,routeTimes:[],segmentStart:n?s.segmentStart:0,airTime:0,challengeProgress:{},activeChallenge:null,challengeHint:null,mainSamples:n?[...s.mainSamples||[0,0,0]]:[0,0,0],returnSamples:n?s.returnSamples:0,campaignCircuitStages:n?[...s.campaignCircuitStages]:[0,0,0],activeCampaignCircuit:n?s.activeCampaignCircuit:null,campaignGate:0,mode:s.mode,activeSeconds:n?s.activeSeconds:0,failureReason:n?s.failureReason:null,surveyHint:null,trackedHint:null,transitWaypoints:[],transitIndex:0,courseStages:{...s.courseStages||{}},cargoStability:n?s.cargoStability??100:100,cargoDamage:n&&s.cargoDamage||0,navigationMessage:null},this.events.length=0,this.eventSpare||=[],this.eventSpare.length=0,this.routePhysics=["safe","shortcut",null].map(o=>cc(ue.winds.filter(l=>!l.routeId||l.style===o))),this.stagePhysics=new Map;for(let o of[...ue.challenges,...ue.campaignCircuits])for(let l of o.stages)this.stagePhysics.set(l.id,cc(l.winds));this.windForces={lift:0,charge:0,wx:0,wz:0,boost:0,count:0},this.module=wn.find(o=>o.id===this.state.module),this.nearbyRecord={islandId:"",station:!1,name:"",canInteract:!1,message:""},this.courseEntries=new Map;for(let o of ue.challenges)for(let l of o.stages){let c=Ht(l.fromIslandId);this.courseEntries.set(l.id,{id:o.id,name:o.name,radius:o.radius,minSpeed:o.minSpeed||0,minEnergy:o.minEnergy||0,x:c.x+18,y:c.y+22,z:c.z-18})}this.state.mainTransit=[],this.state.mainTransitIndex=0,this.state.rejoinIndex=null,n&&this._planMainRejoin(),this.suppressedChallengeEntries=new Set,this._nearby(),this._objective(),this.state.status==="complete"&&this._rating()}get player(){return this.state.player}get elapsed(){return this.state.elapsed}get checkpoint(){return this.state.checkpoint}get activated(){return this.state.activated}get relics(){return this.state.relics}get challenges(){return this.state.challenges}get stalls(){return this.state.stalls}get status(){return this.state.status}set status(e){["ready","running","paused","complete","failed"].includes(e)&&(this.state.status=e)}get assist(){return this.state.assist}set assist(e){this.setAssist(e)}get routeStyle(){return this.state.routeStyle}set routeStyle(e){this.setRouteStyle(e)}emit(e,t={}){this.events.push({type:e,emittedAt:performance.now(),...t})}launch(){return this.state.status==="ready"||this.state.status==="paused"?(this.state.status="running",this.emit("start"),!0):!1}setPaused(e){e&&this.state.status==="running"?(this.state.status="paused",this.emit("pause")):!e&&this.state.status==="paused"&&(this.state.status="running",this.emit("resume"))}setAssist(e){this.state.assist=!!e,this.state.usedAssist||=!!e,this.emit("assist",{enabled:!!e})}setRouteStyle(e){this.state.routeStyle=e==="shortcut"?"shortcut":"safe",this._objective()}reset({seed:e=this.state.seed,module:t=this.state.module}={}){this.persisted=this.saveData(),this._setup({seed:e,module:t}),this.emit("reset")}snapshot(){return pu(this.state)}drainEvents(){let e=this.events;return this.events=this.eventSpare,this.eventSpare=e,this.events.length=0,e}campaignStage(){let e=this.state;return e.activeCampaignCircuit==null?null:ue.campaignCircuits[e.activeCampaignCircuit].stages[e.campaignCircuitStages[e.activeCampaignCircuit]]}campaignComplete(){let e=this.state;return e.activated.length===3&&e.mainSamples.every(t=>t===8)&&e.campaignCircuitStages.every(t=>t===3)&&e.returnSamples===6&&!e.surveyHint}setExploration(){this.state.mode="exploration",this.status==="failed"&&(this.state.status="paused",this.state.failureReason=null),this.emit("save")}_fail(e){let t=this.state;t.status==="running"&&(t.status="failed",t.failureReason=e,this.emit("failed",{reason:e}),this.emit("save"))}courseStage(e){if(!e?.stages?.length)return null;let t=this.state.courseStages[e.id]||0;return e.stages[t>=e.stages.length?0:t]}courseEntry(e){let t=this.courseStage(e);return t?this.courseEntries.get(t.id):e}trackChallenge(e){let t=ue.challenges.find(s=>s.id===e);if(this.state.activeCampaignCircuit!=null||!t||this.state.challenges.includes(e)||!this.player.grounded)return!1;this.state.activeChallenge&&this.cancelChallenge();let n=this.courseStage(t);return this.state.transitWaypoints=za(this.state.checkpoint,n?.fromIslandId||t.islandId),this.state.transitIndex=0,this._trackedTarget(t),!0}_trackedTarget(e){let t=this.state,n=this.courseStage(e),s=t.transitWaypoints[t.transitIndex];t.trackedHint={id:e.id,name:e.name,...s||this.courseEntry(e),stageName:n?.name,stage:(t.courseStages[e.id]||0)%(e.stages?.length||1)+1,stageTotal:e.stages?.length||1,entry:!s,transit:!!s,transitStep:t.transitIndex+1,transitTotal:t.transitWaypoints.length,step:0,total:(n?.gates?.length||8)+1,instruction:s?`\u6CBF\u5B89\u5168\u63A5\u99C1\u98A8\u6A19\u524D\u5F80${Ht(n?.fromIslandId||e.islandId).name}\u3002\u4E0D\u9700\u505C\u7559\u7B49\u5F85\u3002`:`\u5230${Ht(n?.fromIslandId||e.islandId).name}\u7684\u91D1\u74B0\u958B\u59CB\u672C\u968E\u6BB5\u3002\u5DF2\u4EA4\u4ED8\u968E\u6BB5\u4E0D\u7528\u91CD\u8DD1\u3002`},t.trackedHint.id=e.id}_returnToCheckpoint(){let e=this.state,t=Ht(e.checkpoint);Object.assign(e.player,{x:t.x,y:t.y,z:t.z,vx:0,vy:0,vz:0,heading:0,grounded:!0,gliding:!1,braking:!1,energy:100}),e.wind.length=0,e.hazard=null,e.lowEnergy=!1}cancelChallenge(){let e=this.state,t=e.activeChallenge||e.trackedHint?.id;return t?(this.suppressedChallengeEntries.add(t),e.cargoDamage+=100-e.cargoStability,e.cargoStability=100,delete e.challengeProgress[t],e.activeChallenge=null,e.challengeHint=null,e.trackedHint=null,e.transitWaypoints=[],e.transitIndex=0,this._returnToCheckpoint(),this._planMainRejoin(),this._objective(),this._nearby(),this.emit("challenge-reset",{id:t,reason:"cancel",message:"\u5DF2\u9000\u51FA\u4E26\u8FD4\u56DE\u6700\u5F8C\u5B89\u5168\u5CF6\uFF1B\u4E3B\u7DDA\u6A23\u672C\u8207\u5DF2\u4EA4\u4ED8\u968E\u6BB5\u4FDD\u7559\uFF0C\u4E0D\u52A0\u5931\u901F\u61F2\u7F70\u3002"}),this.emit("save"),!0):!1}saveData(){let e=this.state,t={...this.persisted,schemaVersion:Vi,seed:e.seed,module:e.module,checkpoint:e.checkpoint,unlocked:[...e.unlocked],activated:[...e.activated],relics:[...e.relics],challenges:[...e.challenges],completedChallenges:[...e.completedChallenges],mainSamples:[...e.mainSamples],returnSamples:e.returnSamples,campaignCircuitStages:[...e.campaignCircuitStages],activeCampaignCircuit:e.activeCampaignCircuit,mode:e.mode,activeSeconds:e.activeSeconds,failed:e.status==="failed",failureReason:e.failureReason,courseStages:{...e.courseStages},cargoStability:e.cargoStability,cargoDamage:e.cargoDamage,elapsed:e.elapsed,segmentStart:e.segmentStart,stalls:e.stalls,assist:e.assist,usedAssist:e.usedAssist,routeStyle:e.routeStyle,completed:e.status==="complete"};if(e.status==="complete"&&this.campaignComplete()&&e.mode==="expedition"){let n=t.records[e.module];(!n||n.assisted&&!e.usedAssist||n.assisted===e.usedAssist&&e.elapsed<n.time)&&(t.records={...t.records,[e.module]:{time:e.elapsed,score:e.score,stalls:e.stalls,assisted:e.usedAssist}})}t.routeRecords={...t.routeRecords};for(let n of e.mode==="expedition"?e.routeTimes:[]){let s=`route-${n.mission}-${n.style}`,r=t.routeRecords[s];(!r||r.assisted&&!e.usedAssist||r.assisted===e.usedAssist&&n.seconds<r.time)&&(t.routeRecords[s]={time:n.seconds,assisted:e.usedAssist,module:e.module,seed:e.seed})}return this.persisted=pu(t),t}_planMainRejoin(){let e=this.state;if(e.activeCampaignCircuit!=null||e.status==="complete"||e.status==="failed")return;let t=ue.routes.find(s=>s.id===`route-${e.activated.length+1}-${e.routeStyle}`),n=e.activated.length===3?e.returnSamples:e.mainSamples[e.activated.length];if(n>=t.samples.length){e.mainTransit=e.checkpoint===t.to?[]:za(e.checkpoint,t.to),e.mainTransitIndex=0,e.rejoinIndex=null;return}e.mainTransit=e.checkpoint===t.from?[]:za(e.checkpoint,t.from),e.mainTransitIndex=0,e.rejoinIndex=n>0?0:null}_objective(){let e=this.state,t=Ht(Ss[e.activated.length]||"island-camp");e.objective={islandId:t.id,name:t.name,step:e.activated.length+1,total:4,x:t.x,y:t.y,z:t.z,routeId:`route-${e.activated.length+1}-${e.routeStyle}`,text:e.activated.length<3?`\u62B5\u9054${t.name}\uFF0C\u5728\u89C0\u6E2C\u53F0\u65C1\u6309 E \u555F\u52D5`:"\u8FD4\u56DE\u6668\u98A8\u71DF\u5730\uFF0C\u5728\u71DF\u706B\u65C1\u6309 E \u5B8C\u6210\u9060\u5F81"};let n=e.mainTransit[e.mainTransitIndex];if(n&&e.activeCampaignCircuit==null){e.surveyHint={...n,mainTransit:!0,name:"\u4E3B\u7DDA\u5B89\u5168\u63A5\u99C1",step:e.mainTransitIndex+1,total:e.mainTransit.length,instruction:"\u6CBF\u5B89\u5168\u98A8\u6A19\u56DE\u5230\u71DF\u5730\u51FA\u767C\u7A7A\u57DF\uFF0C\u518D\u958B\u59CB\u65B0\u7248\u89C0\u6E2C\u3002"};return}let s=this.campaignStage();if(s){let c=ue.campaignCircuits[e.activeCampaignCircuit],h=e.campaignGate,u=h>=s.gates.length,p=u?Ht(s.toIslandId):s.gates[h];Object.assign(e.objective,{islandId:s.toIslandId,name:Ht(s.toIslandId).name,text:`\u7B2C ${e.activeCampaignCircuit+1} \u822A\u5340 / \u6E2C\u98A8 ${e.campaignCircuitStages[e.activeCampaignCircuit]+1}/3 / ${u?"\u843D\u5CF6\u4EA4\u4ED8":`\u822A\u9580 ${h+1}/9`}`}),e.surveyHint={...p,radius:u?12:p.radius,campaign:!0,landing:u,stageName:s.name,stage:e.campaignCircuitStages[e.activeCampaignCircuit]+1,stageTotal:3,step:h+1,total:10,instruction:u?"\u843D\u5230\u5CF6\u4E2D\u592E\u6309 E \u4EA4\u4ED8\u672C\u6BB5\u3002":p.instruction};return}let r=ue.routes.find(c=>c.id===e.objective.routeId),a=e.activated.length===3?e.returnSamples:e.mainSamples[e.activated.length]||0,o=e.rejoinIndex!=null&&e.rejoinIndex<a,l=r?.samples?.[o?e.rejoinIndex:a];e.surveyHint=l?{...l,step:a+1,total:r.samples.length,mission:e.activated.length+1}:null,e.surveyHint&&o&&Object.assign(e.surveyHint,{rejoin:!0,step:e.rejoinIndex+1,name:`\u98A8\u5ECA\u63A5\u56DE ${e.rejoinIndex+1}/${a}`,minSpeed:0,minEnergy:0,maxVerticalSpeed:void 0,heading:null,instruction:"\u6CBF\u5DF2\u5B8C\u6210\u7684\u4E2D\u5FC3\u7DDA\u822A\u6A19\u63A5\u56DE\u98A8\u5ECA\uFF1B\u65E2\u6709\u89C0\u6E2C\u4FDD\u7559\uFF0C\u4E0D\u9700\u91CD\u505A\u689D\u4EF6\u3002"}),e.surveyHint&&(e.objective.text=`${e.surveyHint.name} ${a+1}/${r.samples.length} \xB7 ${l.instruction}`)}_nearby(){let e=this.state,t=e.player,n=null;for(let o of ue.islands)if(Wi(o,t)<o.radius-1&&Math.abs(t.y-o.y)<2.5){n=o;break}let s=null;for(let o of ue.challenges)if(o.id===e.activeChallenge){s=o;break}let r=this.campaignStage()||this.courseStage(s),a=r&&(e.activeCampaignCircuit!=null?e.campaignGate:e.challengeProgress[s.id]||0)>=r.gates.length;if(n&&t.grounded&&Wi(n,t)<13){let o=this.nearbyRecord;o.islandId=n.id,o.station=n.station,o.name=n.name,o.canInteract=r?!!a&&n.id===r.toIslandId:n.id===e.objective?.islandId&&!e.surveyHint&&!e.trackedHint,o.message=r?"E \xB7 \u4EA4\u4ED8\u6E2C\u98A8\u8CC7\u6599":n.id==="island-camp"?"E \xB7 \u8FD4\u56DE\u71DF\u5730":n.station?"E \xB7 \u555F\u52D5\u89C0\u6E2C\u53F0":"\u5B89\u5168\u88DC\u7D66\u5CF6",e.nearby=o}else e.nearby=null}interact(){let e=this.state;if(e.status!=="running")return!1;if(this._nearby(),!e.nearby)return this.emit("hint",{message:"\u5148\u5B89\u5168\u843D\u5730\uFF0C\u518D\u9760\u8FD1\u5CF6\u4E2D\u592E\u7684\u89C0\u6E2C\u53F0\u3002"}),!1;if(e.activeCampaignCircuit!=null){if(!e.nearby.canInteract)return this.emit("hint",{message:"\u5148\u5B8C\u6210\u4E5D\u5EA7\u5DE1\u6E2C\u822A\u9580\uFF0C\u518D\u5728\u6307\u5B9A\u5CF6\u4E2D\u592E\u843D\u5730\u6309 E\u3002"}),!1;let n=e.activeCampaignCircuit,s=this.campaignStage();return e.campaignCircuitStages[n]++,e.campaignGate=0,e.cargoDamage+=100-e.cargoStability,e.cargoStability=100,e.campaignCircuitStages[n]===3&&(e.activeCampaignCircuit=null,e.segmentStart=e.elapsed),this._objective(),this._nearby(),this._score(),this.emit("campaign-stage",{message:`${s.name}\u5DF2\u4EA4\u4ED8\u3002${this.campaignStage()?.description||"\u5DE1\u6E2C\u5B8C\u6210\uFF0C\u63A5\u7E8C\u4E3B\u7DDA\u91D1\u8272\u822A\u6A19\u3002"}`}),this.emit("save"),!0}if(e.activeChallenge){let n=ue.challenges.find(r=>r.id===e.activeChallenge),s=this.courseStage(n);return!s||!e.nearby.canInteract?(this.emit("hint",{message:"\u5148\u4F9D\u5E8F\u5B8C\u6210\u672C\u6BB5\u89C0\u6E2C\uFF0C\u518D\u843D\u5230\u4EA4\u4ED8\u5CF6\u4E2D\u592E\u3002"}),!1):(e.courseStages[n.id]=(e.courseStages[n.id]||0)+1,delete e.challengeProgress[n.id],e.activeChallenge=null,e.challengeHint=null,e.courseStages[n.id]>=n.stages.length?(e.challenges.includes(n.id)||e.challenges.push(n.id),e.completedChallenges.includes(n.id)||e.completedChallenges.push(n.id),this.emit("challenge",{id:n.id,name:n.name}),this._planMainRejoin()):(this.trackChallenge(n.id),this.emit("challenge-stage",{id:n.id,name:n.name,step:e.courseStages[n.id],total:n.stages.length,message:`${s.name}\u5DF2\u4EA4\u4ED8\u4E26\u4FDD\u5B58\u3002\u5F9E\u672C\u5CF6\u7684\u91D1\u74B0\u63A5\u7E8C\u4E0B\u4E00\u6BB5\uFF0C\u6216\u5148\u56DE\u4E3B\u7DDA\u3002`})),e.cargoDamage+=100-e.cargoStability,e.cargoStability=100,this._objective(),this._nearby(),this._score(),this.emit("save"),!0)}if(e.trackedHint)return this.emit("hint",{message:"\u76EE\u524D\u6B63\u524D\u5F80\u6E2C\u98A8\u9060\u5F81\u3002\u5148\u5B8C\u6210\u9060\u5F81\uFF0C\u6216\u9000\u51FA\u4E26\u8FD4\u56DE\u5B89\u5168\u5CF6\u5F8C\u4EA4\u4ED8\u4E3B\u7DDA\u3002"}),!1;let t=Ss[e.activated.length];return e.nearby.islandId===t?e.surveyHint?(this.emit("hint",{message:`\u5C1A\u7F3A\u89C0\u6E2C ${e.surveyHint.step}/${e.surveyHint.total}\uFF1A${e.surveyHint.name}\u3002\u6CBF\u91D1\u8272\u822A\u6A19\u5B8C\u6210\u5F8C\u518D\u4EA4\u4ED8\u3002`}),!1):(e.activated.length===1&&(e.cargoDamage+=100-e.cargoStability),e.cargoStability=100,e.activated.push(t),e.segmentFailures=0,Number.isFinite(e.segmentStart)&&e.routeTimes.push({mission:e.activated.length,style:e.routeStyle,seconds:e.elapsed-e.segmentStart}),e.segmentStart=e.elapsed,e.activeCampaignCircuit=e.activated.length-1,e.campaignGate=0,this.emit("station",{islandId:t,index:e.activated.length,dialogue:ue.dialogues[e.activated.length-1]}),this._objective(),this._nearby(),this._score(),this.emit("save"),!0):e.nearby.islandId==="island-camp"&&this.campaignComplete()?(Number.isFinite(e.segmentStart)&&e.routeTimes.push({mission:4,style:e.routeStyle,seconds:e.elapsed-e.segmentStart}),e.status="complete",this._rating(),this.emit("complete",{rating:e.rating,score:e.score,ending:ue.ending}),this.emit("save"),!0):(this.emit("hint",{message:`\u4E0B\u4E00\u500B\u76EE\u6A19\uFF1A${e.objective.name}\u3002\u5DF2\u9EDE\u4EAE\u7684\u89C0\u6E2C\u53F0\u4E0D\u9700\u518D\u6B21\u555F\u52D5\u3002`}),!1)}_score(){let e=this.state;e.score=Math.max(0,Math.round(e.activated.length*300+e.relics.length*100+e.challenges.length*250+(e.status==="complete"?1500:0)-e.stalls*75-e.elapsed*.7))}_rating(){let e=this.state;this._score();let t=ue.relics.length,n=ue.challenges.length,r=e.relics.length>=t&&e.challenges.length>=n?"S":e.relics.length*3>=t*2?"A":e.relics.length*3>=t?"B":"C",a=e.relics.length<t?`\u518D\u627E\u51FA ${t-e.relics.length} \u4EFD\u6587\u660E\u788E\u7247`:e.challenges.length<n?`\u518D\u5B8C\u6210 ${n-e.challenges.length} \u500B\u6E2C\u98A8\u6311\u6230`:e.stalls?"\u6311\u6230\u96F6\u5931\u901F\u8FD4\u822A":"\u63DB\u4E0A\u53E6\u4E00\u500B\u6A21\u7D44\uFF0C\u6539\u5584\u822A\u7A0B\u6642\u9593";e.rating={speed:e.elapsed<1400?"S":e.elapsed<1700?"A":e.elapsed<2100?"B":"C",stability:e.stalls===0&&e.cargoDamage<20?"S":e.stalls<=2&&e.cargoDamage<65?"A":e.stalls<=5?"B":"C",exploration:r,assisted:e.usedAssist,next:a}}_recover(e){let t=this.state;t.activeCampaignCircuit!=null&&(t.checkpoint=this.campaignStage().fromIslandId);let n=Ht(t.checkpoint),s=t.activeChallenge||t.trackedHint?.id;if(t.cargoDamage+=100-t.cargoStability,t.cargoStability=100,t.activeChallenge){let r=t.activeChallenge;delete t.challengeProgress[r],t.activeChallenge=null,t.challengeHint=null,this.emit("challenge-reset",{id:r,reason:"stall",message:"\u672C\u6BB5\u6E2C\u98A8\u4E2D\u65B7\uFF1B\u5DF2\u4EA4\u4ED8\u968E\u6BB5\u4FDD\u7559\uFF0C\u56DE\u91D1\u74B0\u91CD\u8A66\u76EE\u524D\u968E\u6BB5\u3002"})}t.activeCampaignCircuit!=null&&(t.checkpoint=this.campaignStage().fromIslandId,t.campaignGate=0,this._objective()),this._returnToCheckpoint(),s?this.trackChallenge(s):t.activeCampaignCircuit==null&&(this._planMainRejoin(),this._objective()),t.stalls++,t.segmentFailures++,t.elapsed+=8,t.wind.length=0,t.hazard=null,t.lowEnergy=!1,this.emit("stall",{reason:e,islandId:n.id,penalty:8,message:`${e}\uFF0C\u5DF2\u56DE\u5230${n.name}\uFF1B\u672C\u6BB5\u52A0\u8A08 8 \u79D2\uFF0C\u788E\u7247\u4FDD\u7559\u3002`}),t.segmentFailures===3&&!t.assist&&this.emit("assist-offer",{message:"\u9019\u4E00\u6BB5\u5DF2\u5931\u901F\u4E09\u6B21\uFF0C\u53EF\u5728\u8A2D\u5B9A\u958B\u555F\u98A8\u7DDA\u8F14\u52A9\u3002"}),this._nearby(),this._score(),this.emit("save")}_collect(){let e=this.state,t=e.player;for(let l=0;l<ue.relics.length;l++){let c=ue.relics[l];!e.relics.includes(c.id)&&Wi(t,c)<c.radius&&Math.abs(t.y-c.y)<4&&(e.relics.push(c.id),this.emit("relic",{id:c.id,name:c.name,text:c.text}),this.emit("save"))}if(!t.gliding)return;if(e.activeCampaignCircuit!=null){let l=this.campaignStage();e.campaignGate<l.gates.length&&this._sampleSatisfied(l.gates[e.campaignGate])&&(e.campaignGate++,this.emit("challenge-gate",{id:l.id,step:e.campaignGate,total:9,message:[1,4,7].includes(e.campaignGate)?`${l.name} ${e.campaignGate}/9 \xB7 ${l.description}`:null}),this._objective());return}if(!e.activeChallenge){if(e.trackedHint?.transit&&this._sampleSatisfied(e.trackedHint)){let h=ue.challenges.find(u=>u.id===e.trackedHint.id);e.transitIndex++,this._trackedTarget(h)}if(!e.trackedHint&&e.surveyHint&&this._sampleSatisfied(e.surveyHint)){let h=e.surveyHint;h.mainTransit?e.mainTransitIndex++:h.rejoin?e.rejoinIndex++:e.activated.length===3?e.returnSamples++:e.mainSamples[e.activated.length]++,this.emit("survey",{id:h.id,name:h.name,step:h.step,total:h.total,message:`${h.name}\u5DF2\u8A18\u9304 \xB7 ${h.step}/${h.total}`}),this._objective(),this.emit("save")}if(this.suppressedChallengeEntries.size)for(let h of this.suppressedChallengeEntries){let u=ue.challenges.find(f=>f.id===h),p=this.courseEntry(u);vs(t.x-p.x,t.y-p.y,t.z-p.z)>p.radius+4&&this.suppressedChallengeEntries.delete(h)}let l=null;if(e.trackedHint?.entry){for(let h of ue.challenges)if(h.id===e.trackedHint.id&&!e.challenges.includes(h.id)&&!this.suppressedChallengeEntries.has(h.id)&&this._sampleSatisfied(this.courseEntry(h))){l=h;break}}if(!l)return;(e.courseStages[l.id]||0)>=(l.stages?.length||1/0)&&(e.courseStages[l.id]=0),e.activeChallenge=l.id,e.challengeProgress[l.id]=0,e.trackedHint=null,e.transitWaypoints=[],e.transitIndex=0,e.cargoDamage+=100-e.cargoStability,e.cargoStability=100,this._challengeHint(l);let c=this.courseStage(l);this.emit("challenge-start",{id:l.id,name:l.name,step:0,total:(c?.gates||l.gates).length+1,message:c?`${c.name}\uFF1A${c.description}`:l.description});return}let n=null;for(let l of ue.challenges)if(l.id===e.activeChallenge){n=l;break}let s=this.courseStage(n),r=s?.gates||n.gates,a=e.challengeProgress[n.id],o=r[a]||(s?null:n);o&&this._sampleSatisfied(o)&&(a<r.length?(e.challengeProgress[n.id]++,this.emit("challenge-gate",{id:n.id,name:n.name,step:a+1,total:r.length+1}),this._challengeHint(n)):(e.challengeProgress[n.id]=r.length+1,e.challenges.push(n.id),e.completedChallenges.includes(n.id)||e.completedChallenges.push(n.id),t.energy=Math.min(100,t.energy+15),e.activeChallenge=null,e.challengeHint=null,this.emit("challenge",{id:n.id,name:n.name}),this.emit("save")))}_sampleSatisfied(e){if(!e)return!1;let t=this.player,n=it(t.vx,t.vz);if(vs(t.x-e.x,t.y-e.y,t.z-e.z)>=e.radius||n<(e.minSpeed||0)||n>(e.maxSpeed??1/0)||t.energy<(e.minEnergy||0)||Number.isFinite(e.maxVerticalSpeed)&&Math.abs(t.vy)>e.maxVerticalSpeed)return!1;if(e.heading){let s=it(e.heading.x,e.heading.z);if(n<1||(t.vx*e.heading.x+t.vz*e.heading.z)/(n*s)<(e.heading.minDot??.5))return!1}return!0}_challengeHint(e){let t=this.state,n=this.courseStage(e),s=n?.gates||e.gates,r=t.challengeProgress[e.id],a=n&&r>=s.length,o=s[r]||(a?{...Ht(n.toIslandId),radius:12,instruction:"\u5B89\u5168\u843D\u5730\uFF0C\u8D70\u5230\u5CF6\u4E2D\u592E\u6309 E \u4EA4\u4ED8\u3002"}:e);t.challengeHint={...o,id:e.id,name:e.name,stageName:n?.name,stage:(t.courseStages[e.id]||0)+1,stageTotal:e.stages?.length||1,step:r+1,total:s.length+1,returning:r===s.length,landing:!!a}}step(e={},t=1/60){let n=this.state,s=n.player;if(n.status!=="running"||!Number.isFinite(t)||t<=0)return;if(t=Math.min(t,.1),n.activeSeconds+=t,n.elapsed+=t,n.mode==="expedition"&&n.activeSeconds+1e-8>=yr){n.activeSeconds=yr,this._fail("weather-window");return}let r=this.module,a=_r(Number(e.x)||0,-1,1),o=_r(Number(e.z)||0,-1,1),l=it(a,o);l>1&&(a/=l,o/=l,l=1),e.glide&&(s.grounded?(s.grounded=!1,s.gliding=!0,s.vy=15,s.y+=.15,this.emit("glide",{open:!0,requestId:e.requestId||0})):(s.gliding=!s.gliding,this.emit("glide",{open:s.gliding,requestId:e.requestId||0})));let c=s.x,h=s.z,u=s.y,p=s.vx,f=s.vz,d=it(s.vx,s.vz),y=n.stalls;if(s.braking=!!e.brake,s.grounded){s.vx=a*10,s.vz=o*10,s.vy=0,s.energy=Math.min(100,s.energy+t*28),s.x+=s.vx*t,s.z+=s.vz*t;let g=null;for(let m of ue.islands)if(Wi(m,s)<=m.radius-1.5&&Math.abs(s.y-m.y)<2){g=m;break}g||(s.grounded=!1,s.gliding=!1,s.vy=0,this.emit("edge",{message:"\u5DF2\u96E2\u958B\u5CF6\u7DE3\uFF0C\u6309\u5C55\u5E06\u63A5\u4F4F\u98A8\uFF01"})),n.wind.length=0,n.hazard=null}else{n.airTime+=t;let g=null;if(n.activeCampaignCircuit!=null)g=ue.campaignCircuits[n.activeCampaignCircuit];else for(let Q of ue.challenges)if(Q.id===n.activeChallenge){g=Q;break}let m=this.campaignStage()||this.courseStage(g),S=n.activeCampaignCircuit!=null?n.campaignGate:g?n.challengeProgress[g.id]:-1,_=n.wind[0],x=this.windForces;x.lift=x.charge=x.wx=x.wz=x.boost=x.count=0;let C=l>.06?a/l:Math.sin(s.heading),w=l>.06?o/l:-Math.cos(s.heading),A=g?2:n.trackedHint||n.mainTransit[n.mainTransitIndex]||n.routeStyle==="safe"?0:1,R=n.seed%1009/1009*Math.PI*2;hc(this.routePhysics[A],s,-1,C,w,n.elapsed,R,r.id==="tailwind",x,n.wind),m&&hc(this.stagePhysics.get(m.id),s,S,C,w,n.elapsed,R,r.id==="tailwind",x,n.wind),n.wind.length=x.count;let b=x.lift,M=x.charge,I=x.wx,N=x.wz,H=x.boost;n.wind[0]&&n.wind[0]!==_&&this.emit("wind",{wind:n.wind[0]}),n.hazard=null;let W=0,L=m?.hazard||g?.hazard;for(let Q=0;Q<ue.hazards.length+(L?1:0);Q++){let ce=Q<ue.hazards.length?ue.hazards[Q]:L;Wi(ce,s)<ce.radius&&s.y>=ce.y&&s.y<=ce.y+ce.height&&(n.hazard=ce.type,ce.type==="thunder"&&Math.sin(n.elapsed/ce.period*Math.PI*2+n.seed%19)>.15&&(W=9))}let z=s.braking?5.2:s.gliding?16.2*r.speed+H:10,$=1-Math.exp(-t*(s.braking?7:2.8*r.turn));if(s.vx+=(C*z+(s.braking?0:I)-s.vx)*$,s.vz+=(w*z+(s.braking?0:N)-s.vz)*$,s.gliding){let Q=s.braking?-7:-1.75+b+(n.assist&&s.y<n.objective.y+8?3:0);s.vy+=(Q-s.vy)*(1-Math.exp(-t*2));let ce=l>.06&&d>5?Math.abs(s.vx/Math.max(1,d)-C)*1.5:0,De=(3.2*r.energy+ce+W)*(n.assist?.6:1);s.energy=_r(s.energy+((s.braking?0:M)-De)*t,0,100);let ke=s.energy<=Math.max(6.4,(De-M)*2);ke&&!n.lowEnergy&&this.emit("low-energy",{message:"\u5E06\u80FD\u91CF\u4E0D\u8DB3\uFF1A\u7ACB\u5373\u9032\u5165\u71B1\u6D41\uFF0C\u6216\u6E1B\u901F\u843D\u5CF6\u3002"}),n.lowEnergy=ke}else s.vy-=16*t,s.vy=Math.max(-25,s.vy);s.x+=s.vx*t,s.z+=s.vz*t,s.y+=s.vy*t;let k=null;for(let Q of ue.islands)if(Wi(Q,s)<=Q.radius-1.5&&u>=Q.y-.4&&s.y<=Q.y+.1&&s.vy<=0){k=Q;break}if(k){let Q=it(s.vx,s.vz)<8.5;Object.assign(s,{y:k.y,vy:0,grounded:!0,gliding:!1,energy:Math.min(100,s.energy+(Q?20:7))}),n.checkpoint=k.id,n.lastLanding={islandId:k.id,precise:Q},n.unlocked.includes(k.id)||n.unlocked.push(k.id),this.emit("land",{islandId:k.id,name:k.name,precise:Q}),this.emit("save")}else for(let Q of ue.islands){let ce=Q.y-s.y;if(ce<=.1||ce>=38)continue;let De=Q.radius*Math.max(.15,1-Math.max(0,ce-2)/43)+.75,ke=Wi(s,Q);if(ke>=De)continue;let Ke=ke>.001?(s.x-Q.x)/ke:1,$e=ke>.001?(s.z-Q.z)/ke:0;s.x=Q.x+Ke*De,s.z=Q.z+$e*De;let Y=s.vx*Ke+s.vz*$e;Y<0&&(s.vx-=Y*Ke,s.vz-=Y*$e)}if((g?g.kind==="crosswind"||g.kind==="stability":n.activated.length===1)&&s.gliding&&d>5){let Q=it(s.vx,s.vz),ce=Math.acos(_r((p*s.vx+f*s.vz)/Math.max(.01,d*Q),-1,1))/t,De=Math.max(0,ce-.85)*4+Math.max(0,-s.vy-5)*.5;n.cargoStability=_r(n.cargoStability-De*t,0,100)}!s.grounded&&(s.y<-55||s.energy<=0||it(s.x,s.z)>(ue.boundsRadius||1e3))&&this._recover(s.energy<=0?"\u5E06\u80FD\u91CF\u8017\u76E1":"\u96E2\u958B\u5B89\u5168\u822A\u57DF")}it(s.vx,s.vz)>.5&&(s.heading=Math.atan2(s.vx,-s.vz)),n.stalls===y&&(n.distance+=it(s.x-c,s.z-h)),this._collect(),this._nearby(),this._score()}};var td=0,jc=1,nd=2;var Qc=1,Go=2,$n=3,ri=0,Vt=1,bn=2,di=0,Qi=1,eh=2,th=3,nh=4,id=5,Ri=100,sd=101,rd=102,ad=103,od=104,ld=200,cd=201,hd=202,ud=203,go=204,yo=205,dd=206,fd=207,pd=208,md=209,gd=210,yd=211,xd=212,_d=213,vd=214,Wo=0,Xo=1,$o=2,es=3,qo=4,Yo=5,Zo=6,Jo=7,ih=0,Md=1,Sd=2,fi=0,bd=1,Ed=2,wd=3,Ko=4,Td=5,Ad=6,Cd=7,Hc="attached",Rd="detached",sh=300,cs=301,hs=302,jo=303,Qo=304,xa=306,xo=1e3,Ci=1001,_o=1002,rn=1003,Id=1004;var _a=1005;var In=1006,el=1007;var Li=1008;var Fn=1009,rh=1010,ah=1011,er=1012,tl=1013,Di=1014,En=1015,tr=1016,nl=1017,il=1018,nr=1020,oh=35902,lh=35899,ch=1021,hh=1022,xn=1023,Hs=1026,ir=1027,sl=1028,rl=1029,uh=1030,al=1031;var ol=1033,va=33776,Ma=33777,Sa=33778,ba=33779,ll=35840,cl=35841,hl=35842,ul=35843,dl=36196,fl=37492,pl=37496,ml=37808,gl=37809,yl=37810,xl=37811,_l=37812,vl=37813,Ml=37814,Sl=37815,bl=37816,El=37817,wl=37818,Tl=37819,Al=37820,Cl=37821,Rl=36492,Il=36494,Pl=36495,Ll=36283,Dl=36284,Ul=36285,Nl=36286,Fl=2200,Pd=2201,Ld=2202,Lr=2300,vo=2301,mo=2302,Ji=2400,Ki=2401,Dr=2402,Ol=2500,Dd=2501;var Ud=3200,Nd=3201;var dh=0,Fd=1,pi="",jt="srgb",ts="srgb-linear",Ur="linear",ot="srgb";var Zi=7680;var Vc=519,Od=512,Bd=513,zd=514,fh=515,kd=516,Hd=517,Vd=518,Gd=519,Gc=35044;var ph="300 es",Rn=2e3,Nr=2001;var Hn=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){let n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){let n=this._listeners;if(n===void 0)return;let s=n[e];if(s!==void 0){let r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let n=t[e.type];if(n!==void 0){e.target=this;let s=n.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,e);e.target=null}}},Xt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],mu=1234567,Cr=Math.PI/180,Vs=180/Math.PI;function mi(){let i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Xt[i&255]+Xt[i>>8&255]+Xt[i>>16&255]+Xt[i>>24&255]+"-"+Xt[e&255]+Xt[e>>8&255]+"-"+Xt[e>>16&15|64]+Xt[e>>24&255]+"-"+Xt[t&63|128]+Xt[t>>8&255]+"-"+Xt[t>>16&255]+Xt[t>>24&255]+Xt[n&255]+Xt[n>>8&255]+Xt[n>>16&255]+Xt[n>>24&255]).toLowerCase()}function je(i,e,t){return Math.max(e,Math.min(t,i))}function mh(i,e){return(i%e+e)%e}function Pp(i,e,t,n,s){return n+(i-e)*(s-n)/(t-e)}function Lp(i,e,t){return i!==e?(t-i)/(e-i):0}function Rr(i,e,t){return(1-t)*i+t*e}function Dp(i,e,t,n){return Rr(i,e,1-Math.exp(-t*n))}function Up(i,e=1){return e-Math.abs(mh(i,e*2)-e)}function Np(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*(3-2*i))}function Fp(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*i*(i*(i*6-15)+10))}function Op(i,e){return i+Math.floor(Math.random()*(e-i+1))}function Bp(i,e){return i+Math.random()*(e-i)}function zp(i){return i*(.5-Math.random())}function kp(i){i!==void 0&&(mu=i);let e=mu+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function Hp(i){return i*Cr}function Vp(i){return i*Vs}function Gp(i){return(i&i-1)===0&&i!==0}function Wp(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function Xp(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function $p(i,e,t,n,s){let r=Math.cos,a=Math.sin,o=r(t/2),l=a(t/2),c=r((e+n)/2),h=a((e+n)/2),u=r((e-n)/2),p=a((e-n)/2),f=r((n-e)/2),d=a((n-e)/2);switch(s){case"XYX":i.set(o*h,l*u,l*p,o*c);break;case"YZY":i.set(l*p,o*h,l*u,o*c);break;case"ZXZ":i.set(l*u,l*p,o*h,o*c);break;case"XZX":i.set(o*h,l*d,l*f,o*c);break;case"YXY":i.set(l*f,o*h,l*d,o*c);break;case"ZYZ":i.set(l*d,l*f,o*h,o*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function zs(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function Kt(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}var us={DEG2RAD:Cr,RAD2DEG:Vs,generateUUID:mi,clamp:je,euclideanModulo:mh,mapLinear:Pp,inverseLerp:Lp,lerp:Rr,damp:Dp,pingpong:Up,smoothstep:Np,smootherstep:Fp,randInt:Op,randFloat:Bp,randFloatSpread:zp,seededRandom:kp,degToRad:Hp,radToDeg:Vp,isPowerOfTwo:Gp,ceilPowerOfTwo:Wp,floorPowerOfTwo:Xp,setQuaternionFromProperEuler:$p,normalize:Kt,denormalize:zs},ge=class i{constructor(e=0,t=0){i.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6],this.y=s[1]*t+s[4]*n+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=je(this.x,e.x,t.x),this.y=je(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=je(this.x,e,t),this.y=je(this.y,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(je(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(je(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),s=Math.sin(t),r=this.x-e.x,a=this.y-e.y;return this.x=r*n-a*s+e.x,this.y=r*s+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},Qt=class{constructor(e=0,t=0,n=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=s}static slerpFlat(e,t,n,s,r,a,o){let l=n[s+0],c=n[s+1],h=n[s+2],u=n[s+3],p=r[a+0],f=r[a+1],d=r[a+2],y=r[a+3];if(o===0){e[t+0]=l,e[t+1]=c,e[t+2]=h,e[t+3]=u;return}if(o===1){e[t+0]=p,e[t+1]=f,e[t+2]=d,e[t+3]=y;return}if(u!==y||l!==p||c!==f||h!==d){let g=1-o,m=l*p+c*f+h*d+u*y,S=m>=0?1:-1,_=1-m*m;if(_>Number.EPSILON){let C=Math.sqrt(_),w=Math.atan2(C,m*S);g=Math.sin(g*w)/C,o=Math.sin(o*w)/C}let x=o*S;if(l=l*g+p*x,c=c*g+f*x,h=h*g+d*x,u=u*g+y*x,g===1-o){let C=1/Math.sqrt(l*l+c*c+h*h+u*u);l*=C,c*=C,h*=C,u*=C}}e[t]=l,e[t+1]=c,e[t+2]=h,e[t+3]=u}static multiplyQuaternionsFlat(e,t,n,s,r,a){let o=n[s],l=n[s+1],c=n[s+2],h=n[s+3],u=r[a],p=r[a+1],f=r[a+2],d=r[a+3];return e[t]=o*d+h*u+l*f-c*p,e[t+1]=l*d+h*p+c*u-o*f,e[t+2]=c*d+h*f+o*p-l*u,e[t+3]=h*d-o*u-l*p-c*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,s){return this._x=e,this._y=t,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,s=e._y,r=e._z,a=e._order,o=Math.cos,l=Math.sin,c=o(n/2),h=o(s/2),u=o(r/2),p=l(n/2),f=l(s/2),d=l(r/2);switch(a){case"XYZ":this._x=p*h*u+c*f*d,this._y=c*f*u-p*h*d,this._z=c*h*d+p*f*u,this._w=c*h*u-p*f*d;break;case"YXZ":this._x=p*h*u+c*f*d,this._y=c*f*u-p*h*d,this._z=c*h*d-p*f*u,this._w=c*h*u+p*f*d;break;case"ZXY":this._x=p*h*u-c*f*d,this._y=c*f*u+p*h*d,this._z=c*h*d+p*f*u,this._w=c*h*u-p*f*d;break;case"ZYX":this._x=p*h*u-c*f*d,this._y=c*f*u+p*h*d,this._z=c*h*d-p*f*u,this._w=c*h*u+p*f*d;break;case"YZX":this._x=p*h*u+c*f*d,this._y=c*f*u+p*h*d,this._z=c*h*d-p*f*u,this._w=c*h*u-p*f*d;break;case"XZY":this._x=p*h*u-c*f*d,this._y=c*f*u-p*h*d,this._z=c*h*d+p*f*u,this._w=c*h*u+p*f*d;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,s=Math.sin(n);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],s=t[4],r=t[8],a=t[1],o=t[5],l=t[9],c=t[2],h=t[6],u=t[10],p=n+o+u;if(p>0){let f=.5/Math.sqrt(p+1);this._w=.25/f,this._x=(h-l)*f,this._y=(r-c)*f,this._z=(a-s)*f}else if(n>o&&n>u){let f=2*Math.sqrt(1+n-o-u);this._w=(h-l)/f,this._x=.25*f,this._y=(s+a)/f,this._z=(r+c)/f}else if(o>u){let f=2*Math.sqrt(1+o-n-u);this._w=(r-c)/f,this._x=(s+a)/f,this._y=.25*f,this._z=(l+h)/f}else{let f=2*Math.sqrt(1+u-n-o);this._w=(a-s)/f,this._x=(r+c)/f,this._y=(l+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(je(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let s=Math.min(1,t/n);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,s=e._y,r=e._z,a=e._w,o=t._x,l=t._y,c=t._z,h=t._w;return this._x=n*h+a*o+s*c-r*l,this._y=s*h+a*l+r*o-n*c,this._z=r*h+a*c+n*l-s*o,this._w=a*h-n*o-s*l-r*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);let n=this._x,s=this._y,r=this._z,a=this._w,o=a*e._w+n*e._x+s*e._y+r*e._z;if(o<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,o=-o):this.copy(e),o>=1)return this._w=a,this._x=n,this._y=s,this._z=r,this;let l=1-o*o;if(l<=Number.EPSILON){let f=1-t;return this._w=f*a+t*this._w,this._x=f*n+t*this._x,this._y=f*s+t*this._y,this._z=f*r+t*this._z,this.normalize(),this}let c=Math.sqrt(l),h=Math.atan2(c,o),u=Math.sin((1-t)*h)/c,p=Math.sin(t*h)/c;return this._w=a*u+this._w*p,this._x=n*u+this._x*p,this._y=s*u+this._y*p,this._z=r*u+this._z*p,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(e),s*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},D=class i{constructor(e=0,t=0,n=0){i.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(gu.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(gu.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*s,this.y=r[1]*t+r[4]*n+r[7]*s,this.z=r[2]*t+r[5]*n+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,s=this.z,r=e.elements,a=1/(r[3]*t+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*s+r[12])*a,this.y=(r[1]*t+r[5]*n+r[9]*s+r[13])*a,this.z=(r[2]*t+r[6]*n+r[10]*s+r[14])*a,this}applyQuaternion(e){let t=this.x,n=this.y,s=this.z,r=e.x,a=e.y,o=e.z,l=e.w,c=2*(a*s-o*n),h=2*(o*t-r*s),u=2*(r*n-a*t);return this.x=t+l*c+a*u-o*h,this.y=n+l*h+o*c-r*u,this.z=s+l*u+r*h-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*s,this.y=r[1]*t+r[5]*n+r[9]*s,this.z=r[2]*t+r[6]*n+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=je(this.x,e.x,t.x),this.y=je(this.y,e.y,t.y),this.z=je(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=je(this.x,e,t),this.y=je(this.y,e,t),this.z=je(this.z,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(je(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,s=e.y,r=e.z,a=t.x,o=t.y,l=t.z;return this.x=s*l-r*o,this.y=r*a-n*l,this.z=n*o-s*a,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return fc.copy(this).projectOnVector(e),this.sub(fc)}reflect(e){return this.sub(fc.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(je(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,s=this.z-e.z;return t*t+n*n+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let s=Math.sin(t)*e;return this.x=s*Math.sin(n),this.y=Math.cos(t)*e,this.z=s*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},fc=new D,gu=new Qt,Xe=class i{constructor(e,t,n,s,r,a,o,l,c){i.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,a,o,l,c)}set(e,t,n,s,r,a,o,l,c){let h=this.elements;return h[0]=e,h[1]=s,h[2]=o,h[3]=t,h[4]=r,h[5]=l,h[6]=n,h[7]=a,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,s=t.elements,r=this.elements,a=n[0],o=n[3],l=n[6],c=n[1],h=n[4],u=n[7],p=n[2],f=n[5],d=n[8],y=s[0],g=s[3],m=s[6],S=s[1],_=s[4],x=s[7],C=s[2],w=s[5],A=s[8];return r[0]=a*y+o*S+l*C,r[3]=a*g+o*_+l*w,r[6]=a*m+o*x+l*A,r[1]=c*y+h*S+u*C,r[4]=c*g+h*_+u*w,r[7]=c*m+h*x+u*A,r[2]=p*y+f*S+d*C,r[5]=p*g+f*_+d*w,r[8]=p*m+f*x+d*A,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8];return t*a*h-t*o*c-n*r*h+n*o*l+s*r*c-s*a*l}invert(){let e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8],u=h*a-o*c,p=o*l-h*r,f=c*r-a*l,d=t*u+n*p+s*f;if(d===0)return this.set(0,0,0,0,0,0,0,0,0);let y=1/d;return e[0]=u*y,e[1]=(s*c-h*n)*y,e[2]=(o*n-s*a)*y,e[3]=p*y,e[4]=(h*t-s*l)*y,e[5]=(s*r-o*t)*y,e[6]=f*y,e[7]=(n*l-c*t)*y,e[8]=(a*t-n*r)*y,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,s,r,a,o){let l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*a+c*o)+a+e,-s*c,s*l,-s*(-c*a+l*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(pc.makeScale(e,t)),this}rotate(e){return this.premultiply(pc.makeRotation(-e)),this}translate(e,t){return this.premultiply(pc.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let s=0;s<9;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}},pc=new Xe;function gh(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function Fr(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function Wd(){let i=Fr("canvas");return i.style.display="block",i}var yu={};function Gs(i){i in yu||(yu[i]=!0,console.warn(i))}function Xd(i,e,t){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:n()}}setTimeout(r,t)})}var xu=new Xe().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),_u=new Xe().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function qp(){let i={enabled:!0,workingColorSpace:ts,spaces:{},convert:function(s,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===ot&&(s.r=si(s.r),s.g=si(s.g),s.b=si(s.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===ot&&(s.r=ks(s.r),s.g=ks(s.g),s.b=ks(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===pi?Ur:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,a){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return Gs("THREE.ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return Gs("THREE.ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(s,r)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[ts]:{primaries:e,whitePoint:n,transfer:Ur,toXYZ:xu,fromXYZ:_u,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:jt},outputColorSpaceConfig:{drawingBufferColorSpace:jt}},[jt]:{primaries:e,whitePoint:n,transfer:ot,toXYZ:xu,fromXYZ:_u,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:jt}}}),i}var st=qp();function si(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function ks(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}var Ts,Mo=class{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{Ts===void 0&&(Ts=Fr("canvas")),Ts.width=e.width,Ts.height=e.height;let s=Ts.getContext("2d");e instanceof ImageData?s.putImageData(e,0,0):s.drawImage(e,0,0,e.width,e.height),n=Ts}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){let t=Fr("canvas");t.width=e.width,t.height=e.height;let n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);let s=n.getImageData(0,0,e.width,e.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=si(r[a]/255)*255;return n.putImageData(s,0,0),t}else if(e.data){let t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(si(t[n]/255)*255):t[n]=si(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}},Yp=0,Ws=class{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Yp++}),this.uuid=mi(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):t instanceof VideoFrame?e.set(t.displayHeight,t.displayWidth,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(mc(s[a].image)):r.push(mc(s[a]))}else r=mc(s);n.url=r}return t||(e.images[this.uuid]=n),n}};function mc(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?Mo.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}var Zp=0,gc=new D,an=class i extends Hn{constructor(e=i.DEFAULT_IMAGE,t=i.DEFAULT_MAPPING,n=Ci,s=Ci,r=In,a=Li,o=xn,l=Fn,c=i.DEFAULT_ANISOTROPY,h=pi){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Zp++}),this.uuid=mi(),this.name="",this.source=new Ws(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new ge(0,0),this.repeat=new ge(1,1),this.center=new ge(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Xe,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(gc).x}get height(){return this.source.getSize(gc).y}get depth(){return this.source.getSize(gc).z}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(let t in e){let n=e[t];if(n===void 0){console.warn(`THREE.Texture.setValues(): parameter '${t}' has value of undefined.`);continue}let s=this[t];if(s===void 0){console.warn(`THREE.Texture.setValues(): property '${t}' does not exist.`);continue}s&&n&&s.isVector2&&n.isVector2||s&&n&&s.isVector3&&n.isVector3||s&&n&&s.isMatrix3&&n.isMatrix3?s.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==sh)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case xo:e.x=e.x-Math.floor(e.x);break;case Ci:e.x=e.x<0?0:1;break;case _o:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case xo:e.y=e.y-Math.floor(e.y);break;case Ci:e.y=e.y<0?0:1;break;case _o:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};an.DEFAULT_IMAGE=null;an.DEFAULT_MAPPING=sh;an.DEFAULT_ANISOTROPY=1;var yt=class i{constructor(e=0,t=0,n=0,s=1){i.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,s){return this.x=e,this.y=t,this.z=n,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,s=this.z,r=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*s+a[12]*r,this.y=a[1]*t+a[5]*n+a[9]*s+a[13]*r,this.z=a[2]*t+a[6]*n+a[10]*s+a[14]*r,this.w=a[3]*t+a[7]*n+a[11]*s+a[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,s,r,l=e.elements,c=l[0],h=l[4],u=l[8],p=l[1],f=l[5],d=l[9],y=l[2],g=l[6],m=l[10];if(Math.abs(h-p)<.01&&Math.abs(u-y)<.01&&Math.abs(d-g)<.01){if(Math.abs(h+p)<.1&&Math.abs(u+y)<.1&&Math.abs(d+g)<.1&&Math.abs(c+f+m-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;let _=(c+1)/2,x=(f+1)/2,C=(m+1)/2,w=(h+p)/4,A=(u+y)/4,R=(d+g)/4;return _>x&&_>C?_<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(_),s=w/n,r=A/n):x>C?x<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(x),n=w/s,r=R/s):C<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(C),n=A/r,s=R/r),this.set(n,s,r,t),this}let S=Math.sqrt((g-d)*(g-d)+(u-y)*(u-y)+(p-h)*(p-h));return Math.abs(S)<.001&&(S=1),this.x=(g-d)/S,this.y=(u-y)/S,this.z=(p-h)/S,this.w=Math.acos((c+f+m-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=je(this.x,e.x,t.x),this.y=je(this.y,e.y,t.y),this.z=je(this.z,e.z,t.z),this.w=je(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=je(this.x,e,t),this.y=je(this.y,e,t),this.z=je(this.z,e,t),this.w=je(this.w,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(je(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},So=class extends Hn{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:In,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new yt(0,0,e,t),this.scissorTest=!1,this.viewport=new yt(0,0,e,t);let s={width:e,height:t,depth:n.depth},r=new an(s);this.textures=[];let a=n.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview}_setTextureOptions(e={}){let t={minFilter:In,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=n,this.textures[s].isArrayTexture=this.textures[s].image.depth>1;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let s=Object.assign({},e.textures[t].image);this.textures[t].source=new Ws(s)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}},Vn=class extends So{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}},Or=class extends an{constructor(e=null,t=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=rn,this.minFilter=rn,this.wrapR=Ci,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}};var bo=class extends an{constructor(e=null,t=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=rn,this.minFilter=rn,this.wrapR=Ci,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var Pn=class{constructor(e=new D(1/0,1/0,1/0),t=new D(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(Tn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(Tn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=Tn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,Tn):Tn.fromBufferAttribute(r,a),Tn.applyMatrix4(e.matrixWorld),this.expandByPoint(Tn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),ka.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),ka.copy(n.boundingBox)),ka.applyMatrix4(e.matrixWorld),this.union(ka)}let s=e.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Tn),Tn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(vr),Ha.subVectors(this.max,vr),As.subVectors(e.a,vr),Cs.subVectors(e.b,vr),Rs.subVectors(e.c,vr),Mi.subVectors(Cs,As),Si.subVectors(Rs,Cs),Xi.subVectors(As,Rs);let t=[0,-Mi.z,Mi.y,0,-Si.z,Si.y,0,-Xi.z,Xi.y,Mi.z,0,-Mi.x,Si.z,0,-Si.x,Xi.z,0,-Xi.x,-Mi.y,Mi.x,0,-Si.y,Si.x,0,-Xi.y,Xi.x,0];return!yc(t,As,Cs,Rs,Ha)||(t=[1,0,0,0,1,0,0,0,1],!yc(t,As,Cs,Rs,Ha))?!1:(Va.crossVectors(Mi,Si),t=[Va.x,Va.y,Va.z],yc(t,As,Cs,Rs,Ha))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Tn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Tn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Qn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Qn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Qn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Qn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Qn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Qn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Qn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Qn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Qn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},Qn=[new D,new D,new D,new D,new D,new D,new D,new D],Tn=new D,ka=new Pn,As=new D,Cs=new D,Rs=new D,Mi=new D,Si=new D,Xi=new D,vr=new D,Ha=new D,Va=new D,$i=new D;function yc(i,e,t,n,s){for(let r=0,a=i.length-3;r<=a;r+=3){$i.fromArray(i,r);let o=s.x*Math.abs($i.x)+s.y*Math.abs($i.y)+s.z*Math.abs($i.z),l=e.dot($i),c=t.dot($i),h=n.dot($i);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>o)return!1}return!0}var Jp=new Pn,Mr=new D,xc=new D,on=class{constructor(e=new D,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t!==void 0?n.copy(t):Jp.setFromPoints(e).getCenter(n);let s=0;for(let r=0,a=e.length;r<a;r++)s=Math.max(s,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Mr.subVectors(e,this.center);let t=Mr.lengthSq();if(t>this.radius*this.radius){let n=Math.sqrt(t),s=(n-this.radius)*.5;this.center.addScaledVector(Mr,s/n),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(xc.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Mr.copy(e.center).add(xc)),this.expandByPoint(Mr.copy(e.center).sub(xc))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},ei=new D,_c=new D,Ga=new D,bi=new D,vc=new D,Wa=new D,Mc=new D,Gn=class{constructor(e=new D,t=new D(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,ei)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=ei.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(ei.copy(this.origin).addScaledVector(this.direction,t),ei.distanceToSquared(e))}distanceSqToSegment(e,t,n,s){_c.copy(e).add(t).multiplyScalar(.5),Ga.copy(t).sub(e).normalize(),bi.copy(this.origin).sub(_c);let r=e.distanceTo(t)*.5,a=-this.direction.dot(Ga),o=bi.dot(this.direction),l=-bi.dot(Ga),c=bi.lengthSq(),h=Math.abs(1-a*a),u,p,f,d;if(h>0)if(u=a*l-o,p=a*o-l,d=r*h,u>=0)if(p>=-d)if(p<=d){let y=1/h;u*=y,p*=y,f=u*(u+a*p+2*o)+p*(a*u+p+2*l)+c}else p=r,u=Math.max(0,-(a*p+o)),f=-u*u+p*(p+2*l)+c;else p=-r,u=Math.max(0,-(a*p+o)),f=-u*u+p*(p+2*l)+c;else p<=-d?(u=Math.max(0,-(-a*r+o)),p=u>0?-r:Math.min(Math.max(-r,-l),r),f=-u*u+p*(p+2*l)+c):p<=d?(u=0,p=Math.min(Math.max(-r,-l),r),f=p*(p+2*l)+c):(u=Math.max(0,-(a*r+o)),p=u>0?r:Math.min(Math.max(-r,-l),r),f=-u*u+p*(p+2*l)+c);else p=a>0?-r:r,u=Math.max(0,-(a*p+o)),f=-u*u+p*(p+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,u),s&&s.copy(_c).addScaledVector(Ga,p),f}intersectSphere(e,t){ei.subVectors(e.center,this.origin);let n=ei.dot(this.direction),s=ei.dot(ei)-n*n,r=e.radius*e.radius;if(s>r)return null;let a=Math.sqrt(r-s),o=n-a,l=n+a;return l<0?null:o<0?this.at(l,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,s,r,a,o,l,c=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,p=this.origin;return c>=0?(n=(e.min.x-p.x)*c,s=(e.max.x-p.x)*c):(n=(e.max.x-p.x)*c,s=(e.min.x-p.x)*c),h>=0?(r=(e.min.y-p.y)*h,a=(e.max.y-p.y)*h):(r=(e.max.y-p.y)*h,a=(e.min.y-p.y)*h),n>a||r>s||((r>n||isNaN(n))&&(n=r),(a<s||isNaN(s))&&(s=a),u>=0?(o=(e.min.z-p.z)*u,l=(e.max.z-p.z)*u):(o=(e.max.z-p.z)*u,l=(e.min.z-p.z)*u),n>l||o>s)||((o>n||n!==n)&&(n=o),(l<s||s!==s)&&(s=l),s<0)?null:this.at(n>=0?n:s,t)}intersectsBox(e){return this.intersectBox(e,ei)!==null}intersectTriangle(e,t,n,s,r){vc.subVectors(t,e),Wa.subVectors(n,e),Mc.crossVectors(vc,Wa);let a=this.direction.dot(Mc),o;if(a>0){if(s)return null;o=1}else if(a<0)o=-1,a=-a;else return null;bi.subVectors(this.origin,e);let l=o*this.direction.dot(Wa.crossVectors(bi,Wa));if(l<0)return null;let c=o*this.direction.dot(vc.cross(bi));if(c<0||l+c>a)return null;let h=-o*bi.dot(Mc);return h<0?null:this.at(h/a,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},Ye=class i{constructor(e,t,n,s,r,a,o,l,c,h,u,p,f,d,y,g){i.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,a,o,l,c,h,u,p,f,d,y,g)}set(e,t,n,s,r,a,o,l,c,h,u,p,f,d,y,g){let m=this.elements;return m[0]=e,m[4]=t,m[8]=n,m[12]=s,m[1]=r,m[5]=a,m[9]=o,m[13]=l,m[2]=c,m[6]=h,m[10]=u,m[14]=p,m[3]=f,m[7]=d,m[11]=y,m[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new i().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){let t=this.elements,n=e.elements,s=1/Is.setFromMatrixColumn(e,0).length(),r=1/Is.setFromMatrixColumn(e,1).length(),a=1/Is.setFromMatrixColumn(e,2).length();return t[0]=n[0]*s,t[1]=n[1]*s,t[2]=n[2]*s,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,s=e.y,r=e.z,a=Math.cos(n),o=Math.sin(n),l=Math.cos(s),c=Math.sin(s),h=Math.cos(r),u=Math.sin(r);if(e.order==="XYZ"){let p=a*h,f=a*u,d=o*h,y=o*u;t[0]=l*h,t[4]=-l*u,t[8]=c,t[1]=f+d*c,t[5]=p-y*c,t[9]=-o*l,t[2]=y-p*c,t[6]=d+f*c,t[10]=a*l}else if(e.order==="YXZ"){let p=l*h,f=l*u,d=c*h,y=c*u;t[0]=p+y*o,t[4]=d*o-f,t[8]=a*c,t[1]=a*u,t[5]=a*h,t[9]=-o,t[2]=f*o-d,t[6]=y+p*o,t[10]=a*l}else if(e.order==="ZXY"){let p=l*h,f=l*u,d=c*h,y=c*u;t[0]=p-y*o,t[4]=-a*u,t[8]=d+f*o,t[1]=f+d*o,t[5]=a*h,t[9]=y-p*o,t[2]=-a*c,t[6]=o,t[10]=a*l}else if(e.order==="ZYX"){let p=a*h,f=a*u,d=o*h,y=o*u;t[0]=l*h,t[4]=d*c-f,t[8]=p*c+y,t[1]=l*u,t[5]=y*c+p,t[9]=f*c-d,t[2]=-c,t[6]=o*l,t[10]=a*l}else if(e.order==="YZX"){let p=a*l,f=a*c,d=o*l,y=o*c;t[0]=l*h,t[4]=y-p*u,t[8]=d*u+f,t[1]=u,t[5]=a*h,t[9]=-o*h,t[2]=-c*h,t[6]=f*u+d,t[10]=p-y*u}else if(e.order==="XZY"){let p=a*l,f=a*c,d=o*l,y=o*c;t[0]=l*h,t[4]=-u,t[8]=c*h,t[1]=p*u+y,t[5]=a*h,t[9]=f*u-d,t[2]=d*u-f,t[6]=o*h,t[10]=y*u+p}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Kp,e,jp)}lookAt(e,t,n){let s=this.elements;return un.subVectors(e,t),un.lengthSq()===0&&(un.z=1),un.normalize(),Ei.crossVectors(n,un),Ei.lengthSq()===0&&(Math.abs(n.z)===1?un.x+=1e-4:un.z+=1e-4,un.normalize(),Ei.crossVectors(n,un)),Ei.normalize(),Xa.crossVectors(un,Ei),s[0]=Ei.x,s[4]=Xa.x,s[8]=un.x,s[1]=Ei.y,s[5]=Xa.y,s[9]=un.y,s[2]=Ei.z,s[6]=Xa.z,s[10]=un.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,s=t.elements,r=this.elements,a=n[0],o=n[4],l=n[8],c=n[12],h=n[1],u=n[5],p=n[9],f=n[13],d=n[2],y=n[6],g=n[10],m=n[14],S=n[3],_=n[7],x=n[11],C=n[15],w=s[0],A=s[4],R=s[8],b=s[12],M=s[1],I=s[5],N=s[9],H=s[13],W=s[2],L=s[6],z=s[10],$=s[14],k=s[3],ie=s[7],Q=s[11],ce=s[15];return r[0]=a*w+o*M+l*W+c*k,r[4]=a*A+o*I+l*L+c*ie,r[8]=a*R+o*N+l*z+c*Q,r[12]=a*b+o*H+l*$+c*ce,r[1]=h*w+u*M+p*W+f*k,r[5]=h*A+u*I+p*L+f*ie,r[9]=h*R+u*N+p*z+f*Q,r[13]=h*b+u*H+p*$+f*ce,r[2]=d*w+y*M+g*W+m*k,r[6]=d*A+y*I+g*L+m*ie,r[10]=d*R+y*N+g*z+m*Q,r[14]=d*b+y*H+g*$+m*ce,r[3]=S*w+_*M+x*W+C*k,r[7]=S*A+_*I+x*L+C*ie,r[11]=S*R+_*N+x*z+C*Q,r[15]=S*b+_*H+x*$+C*ce,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],s=e[8],r=e[12],a=e[1],o=e[5],l=e[9],c=e[13],h=e[2],u=e[6],p=e[10],f=e[14],d=e[3],y=e[7],g=e[11],m=e[15];return d*(+r*l*u-s*c*u-r*o*p+n*c*p+s*o*f-n*l*f)+y*(+t*l*f-t*c*p+r*a*p-s*a*f+s*c*h-r*l*h)+g*(+t*c*u-t*o*f-r*a*u+n*a*f+r*o*h-n*c*h)+m*(-s*o*h-t*l*u+t*o*p+s*a*u-n*a*p+n*l*h)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8],u=e[9],p=e[10],f=e[11],d=e[12],y=e[13],g=e[14],m=e[15],S=u*g*c-y*p*c+y*l*f-o*g*f-u*l*m+o*p*m,_=d*p*c-h*g*c-d*l*f+a*g*f+h*l*m-a*p*m,x=h*y*c-d*u*c+d*o*f-a*y*f-h*o*m+a*u*m,C=d*u*l-h*y*l-d*o*p+a*y*p+h*o*g-a*u*g,w=t*S+n*_+s*x+r*C;if(w===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let A=1/w;return e[0]=S*A,e[1]=(y*p*r-u*g*r-y*s*f+n*g*f+u*s*m-n*p*m)*A,e[2]=(o*g*r-y*l*r+y*s*c-n*g*c-o*s*m+n*l*m)*A,e[3]=(u*l*r-o*p*r-u*s*c+n*p*c+o*s*f-n*l*f)*A,e[4]=_*A,e[5]=(h*g*r-d*p*r+d*s*f-t*g*f-h*s*m+t*p*m)*A,e[6]=(d*l*r-a*g*r-d*s*c+t*g*c+a*s*m-t*l*m)*A,e[7]=(a*p*r-h*l*r+h*s*c-t*p*c-a*s*f+t*l*f)*A,e[8]=x*A,e[9]=(d*u*r-h*y*r-d*n*f+t*y*f+h*n*m-t*u*m)*A,e[10]=(a*y*r-d*o*r+d*n*c-t*y*c-a*n*m+t*o*m)*A,e[11]=(h*o*r-a*u*r-h*n*c+t*u*c+a*n*f-t*o*f)*A,e[12]=C*A,e[13]=(h*y*s-d*u*s+d*n*p-t*y*p-h*n*g+t*u*g)*A,e[14]=(d*o*s-a*y*s-d*n*l+t*y*l+a*n*g-t*o*g)*A,e[15]=(a*u*s-h*o*s+h*n*l-t*u*l-a*n*p+t*o*p)*A,this}scale(e){let t=this.elements,n=e.x,s=e.y,r=e.z;return t[0]*=n,t[4]*=s,t[8]*=r,t[1]*=n,t[5]*=s,t[9]*=r,t[2]*=n,t[6]*=s,t[10]*=r,t[3]*=n,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,s))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),s=Math.sin(t),r=1-n,a=e.x,o=e.y,l=e.z,c=r*a,h=r*o;return this.set(c*a+n,c*o-s*l,c*l+s*o,0,c*o+s*l,h*o+n,h*l-s*a,0,c*l-s*o,h*l+s*a,r*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,s,r,a){return this.set(1,n,r,0,e,1,a,0,t,s,1,0,0,0,0,1),this}compose(e,t,n){let s=this.elements,r=t._x,a=t._y,o=t._z,l=t._w,c=r+r,h=a+a,u=o+o,p=r*c,f=r*h,d=r*u,y=a*h,g=a*u,m=o*u,S=l*c,_=l*h,x=l*u,C=n.x,w=n.y,A=n.z;return s[0]=(1-(y+m))*C,s[1]=(f+x)*C,s[2]=(d-_)*C,s[3]=0,s[4]=(f-x)*w,s[5]=(1-(p+m))*w,s[6]=(g+S)*w,s[7]=0,s[8]=(d+_)*A,s[9]=(g-S)*A,s[10]=(1-(p+y))*A,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,n){let s=this.elements,r=Is.set(s[0],s[1],s[2]).length(),a=Is.set(s[4],s[5],s[6]).length(),o=Is.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),e.x=s[12],e.y=s[13],e.z=s[14],An.copy(this);let c=1/r,h=1/a,u=1/o;return An.elements[0]*=c,An.elements[1]*=c,An.elements[2]*=c,An.elements[4]*=h,An.elements[5]*=h,An.elements[6]*=h,An.elements[8]*=u,An.elements[9]*=u,An.elements[10]*=u,t.setFromRotationMatrix(An),n.x=r,n.y=a,n.z=o,this}makePerspective(e,t,n,s,r,a,o=Rn,l=!1){let c=this.elements,h=2*r/(t-e),u=2*r/(n-s),p=(t+e)/(t-e),f=(n+s)/(n-s),d,y;if(l)d=r/(a-r),y=a*r/(a-r);else if(o===Rn)d=-(a+r)/(a-r),y=-2*a*r/(a-r);else if(o===Nr)d=-a/(a-r),y=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=h,c[4]=0,c[8]=p,c[12]=0,c[1]=0,c[5]=u,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=d,c[14]=y,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,s,r,a,o=Rn,l=!1){let c=this.elements,h=2/(t-e),u=2/(n-s),p=-(t+e)/(t-e),f=-(n+s)/(n-s),d,y;if(l)d=1/(a-r),y=a/(a-r);else if(o===Rn)d=-2/(a-r),y=-(a+r)/(a-r);else if(o===Nr)d=-1/(a-r),y=-r/(a-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=h,c[4]=0,c[8]=0,c[12]=p,c[1]=0,c[5]=u,c[9]=0,c[13]=f,c[2]=0,c[6]=0,c[10]=d,c[14]=y,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let s=0;s<16;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}},Is=new D,An=new Ye,Kp=new D(0,0,0),jp=new D(1,1,1),Ei=new D,Xa=new D,un=new D,vu=new Ye,Mu=new Qt,fn=class i{constructor(e=0,t=0,n=0,s=i.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,s=this._order){return this._x=e,this._y=t,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let s=e.elements,r=s[0],a=s[4],o=s[8],l=s[1],c=s[5],h=s[9],u=s[2],p=s[6],f=s[10];switch(t){case"XYZ":this._y=Math.asin(je(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(p,c),this._z=0);break;case"YXZ":this._x=Math.asin(-je(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(je(p,-1,1)),Math.abs(p)<.9999999?(this._y=Math.atan2(-u,f),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-je(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(p,f),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(je(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(o,f));break;case"XZY":this._z=Math.asin(-je(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(p,c),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-h,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return vu.makeRotationFromQuaternion(e),this.setFromRotationMatrix(vu,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Mu.setFromEuler(this),this.setFromQuaternion(Mu,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};fn.DEFAULT_ORDER="XYZ";var Xs=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}},Qp=0,Su=new D,Ps=new Qt,ti=new Ye,$a=new D,Sr=new D,em=new D,tm=new Qt,bu=new D(1,0,0),Eu=new D(0,1,0),wu=new D(0,0,1),Tu={type:"added"},nm={type:"removed"},Ls={type:"childadded",child:null},Sc={type:"childremoved",child:null},xt=class i extends Hn{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Qp++}),this.uuid=mi(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=i.DEFAULT_UP.clone();let e=new D,t=new fn,n=new Qt,s=new D(1,1,1);function r(){n.setFromEuler(t,!1)}function a(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new Ye},normalMatrix:{value:new Xe}}),this.matrix=new Ye,this.matrixWorld=new Ye,this.matrixAutoUpdate=i.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=i.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Xs,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Ps.setFromAxisAngle(e,t),this.quaternion.multiply(Ps),this}rotateOnWorldAxis(e,t){return Ps.setFromAxisAngle(e,t),this.quaternion.premultiply(Ps),this}rotateX(e){return this.rotateOnAxis(bu,e)}rotateY(e){return this.rotateOnAxis(Eu,e)}rotateZ(e){return this.rotateOnAxis(wu,e)}translateOnAxis(e,t){return Su.copy(e).applyQuaternion(this.quaternion),this.position.add(Su.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(bu,e)}translateY(e){return this.translateOnAxis(Eu,e)}translateZ(e){return this.translateOnAxis(wu,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(ti.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?$a.copy(e):$a.set(e,t,n);let s=this.parent;this.updateWorldMatrix(!0,!1),Sr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?ti.lookAt(Sr,$a,this.up):ti.lookAt($a,Sr,this.up),this.quaternion.setFromRotationMatrix(ti),s&&(ti.extractRotation(s.matrixWorld),Ps.setFromRotationMatrix(ti),this.quaternion.premultiply(Ps.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Tu),Ls.child=e,this.dispatchEvent(Ls),Ls.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(nm),Sc.child=e,this.dispatchEvent(Sc),Sc.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),ti.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),ti.multiply(e.parent.matrixWorld)),e.applyMatrix4(ti),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Tu),Ls.child=e,this.dispatchEvent(Ls),Ls.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,s=this.children.length;n<s;n++){let a=this.children[n].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Sr,e,em),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Sr,tm,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);let t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){let n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){let s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(e){let t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(o=>({...o})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(e),s.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);let o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){let l=o.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){let u=l[c];r(e.shapes,u)}else r(e.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(r(e.materials,this.material[l]));s.material=o}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){let l=this.animations[o];s.animations.push(r(e.animations,l))}}if(t){let o=a(e.geometries),l=a(e.materials),c=a(e.textures),h=a(e.images),u=a(e.shapes),p=a(e.skeletons),f=a(e.animations),d=a(e.nodes);o.length>0&&(n.geometries=o),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),p.length>0&&(n.skeletons=p),f.length>0&&(n.animations=f),d.length>0&&(n.nodes=d)}return n.object=s,n;function a(o){let l=[];for(let c in o){let h=o[c];delete h.metadata,l.push(h)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){let s=e.children[n];this.add(s.clone())}return this}};xt.DEFAULT_UP=new D(0,1,0);xt.DEFAULT_MATRIX_AUTO_UPDATE=!0;xt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var Cn=new D,ni=new D,bc=new D,ii=new D,Ds=new D,Us=new D,Au=new D,Ec=new D,wc=new D,Tc=new D,Ac=new yt,Cc=new yt,Rc=new yt,Ai=class i{constructor(e=new D,t=new D,n=new D){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,s){s.subVectors(n,t),Cn.subVectors(e,t),s.cross(Cn);let r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,n,s,r){Cn.subVectors(s,t),ni.subVectors(n,t),bc.subVectors(e,t);let a=Cn.dot(Cn),o=Cn.dot(ni),l=Cn.dot(bc),c=ni.dot(ni),h=ni.dot(bc),u=a*c-o*o;if(u===0)return r.set(0,0,0),null;let p=1/u,f=(c*l-o*h)*p,d=(a*h-o*l)*p;return r.set(1-f-d,d,f)}static containsPoint(e,t,n,s){return this.getBarycoord(e,t,n,s,ii)===null?!1:ii.x>=0&&ii.y>=0&&ii.x+ii.y<=1}static getInterpolation(e,t,n,s,r,a,o,l){return this.getBarycoord(e,t,n,s,ii)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,ii.x),l.addScaledVector(a,ii.y),l.addScaledVector(o,ii.z),l)}static getInterpolatedAttribute(e,t,n,s,r,a){return Ac.setScalar(0),Cc.setScalar(0),Rc.setScalar(0),Ac.fromBufferAttribute(e,t),Cc.fromBufferAttribute(e,n),Rc.fromBufferAttribute(e,s),a.setScalar(0),a.addScaledVector(Ac,r.x),a.addScaledVector(Cc,r.y),a.addScaledVector(Rc,r.z),a}static isFrontFacing(e,t,n,s){return Cn.subVectors(n,t),ni.subVectors(e,t),Cn.cross(ni).dot(s)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,s){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,n,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Cn.subVectors(this.c,this.b),ni.subVectors(this.a,this.b),Cn.cross(ni).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return i.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return i.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,s,r){return i.getInterpolation(e,this.a,this.b,this.c,t,n,s,r)}containsPoint(e){return i.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return i.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,s=this.b,r=this.c,a,o;Ds.subVectors(s,n),Us.subVectors(r,n),Ec.subVectors(e,n);let l=Ds.dot(Ec),c=Us.dot(Ec);if(l<=0&&c<=0)return t.copy(n);wc.subVectors(e,s);let h=Ds.dot(wc),u=Us.dot(wc);if(h>=0&&u<=h)return t.copy(s);let p=l*u-h*c;if(p<=0&&l>=0&&h<=0)return a=l/(l-h),t.copy(n).addScaledVector(Ds,a);Tc.subVectors(e,r);let f=Ds.dot(Tc),d=Us.dot(Tc);if(d>=0&&f<=d)return t.copy(r);let y=f*c-l*d;if(y<=0&&c>=0&&d<=0)return o=c/(c-d),t.copy(n).addScaledVector(Us,o);let g=h*d-f*u;if(g<=0&&u-h>=0&&f-d>=0)return Au.subVectors(r,s),o=(u-h)/(u-h+(f-d)),t.copy(s).addScaledVector(Au,o);let m=1/(g+y+p);return a=y*m,o=p*m,t.copy(n).addScaledVector(Ds,a).addScaledVector(Us,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},$d={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},wi={h:0,s:0,l:0},qa={h:0,s:0,l:0};function Ic(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}var Ve=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=jt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,st.colorSpaceToWorking(this,t),this}setRGB(e,t,n,s=st.workingColorSpace){return this.r=e,this.g=t,this.b=n,st.colorSpaceToWorking(this,s),this}setHSL(e,t,n,s=st.workingColorSpace){if(e=mh(e,1),t=je(t,0,1),n=je(n,0,1),t===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+t):n+t-n*t,a=2*n-r;this.r=Ic(a,r,e+1/3),this.g=Ic(a,r,e),this.b=Ic(a,r,e-1/3)}return st.colorSpaceToWorking(this,s),this}setStyle(e,t=jt){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r,a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){let r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(r,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=jt){let n=$d[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=si(e.r),this.g=si(e.g),this.b=si(e.b),this}copyLinearToSRGB(e){return this.r=ks(e.r),this.g=ks(e.g),this.b=ks(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=jt){return st.workingToColorSpace($t.copy(this),e),Math.round(je($t.r*255,0,255))*65536+Math.round(je($t.g*255,0,255))*256+Math.round(je($t.b*255,0,255))}getHexString(e=jt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=st.workingColorSpace){st.workingToColorSpace($t.copy(this),t);let n=$t.r,s=$t.g,r=$t.b,a=Math.max(n,s,r),o=Math.min(n,s,r),l,c,h=(o+a)/2;if(o===a)l=0,c=0;else{let u=a-o;switch(c=h<=.5?u/(a+o):u/(2-a-o),a){case n:l=(s-r)/u+(s<r?6:0);break;case s:l=(r-n)/u+2;break;case r:l=(n-s)/u+4;break}l/=6}return e.h=l,e.s=c,e.l=h,e}getRGB(e,t=st.workingColorSpace){return st.workingToColorSpace($t.copy(this),t),e.r=$t.r,e.g=$t.g,e.b=$t.b,e}getStyle(e=jt){st.workingToColorSpace($t.copy(this),e);let t=$t.r,n=$t.g,s=$t.b;return e!==jt?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(e,t,n){return this.getHSL(wi),this.setHSL(wi.h+e,wi.s+t,wi.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(wi),e.getHSL(qa);let n=Rr(wi.h,qa.h,t),s=Rr(wi.s,qa.s,t),r=Rr(wi.l,qa.l,t);return this.setHSL(n,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*s,this.g=r[1]*t+r[4]*n+r[7]*s,this.b=r[2]*t+r[5]*n+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},$t=new Ve;Ve.NAMES=$d;var im=0,Wn=class extends Hn{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:im++}),this.uuid=mi(),this.name="",this.type="Material",this.blending=Qi,this.side=ri,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=go,this.blendDst=yo,this.blendEquation=Ri,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Ve(0,0,0),this.blendAlpha=0,this.depthFunc=es,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Vc,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Zi,this.stencilZFail=Zi,this.stencilZPass=Zi,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}let s=this[t];if(s===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});let n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Qi&&(n.blending=this.blending),this.side!==ri&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==go&&(n.blendSrc=this.blendSrc),this.blendDst!==yo&&(n.blendDst=this.blendDst),this.blendEquation!==Ri&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==es&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Vc&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Zi&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Zi&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Zi&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){let a=[];for(let o in r){let l=r[o];delete l.metadata,a.push(l)}return a}if(t){let r=s(e.textures),a=s(e.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let s=t.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}},pn=class extends Wn{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Ve(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new fn,this.combine=ih,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}};var Rt=new D,Ya=new ge,sm=0,At=class{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:sm++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=Gc,this.updateRanges=[],this.gpuType=En,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[n+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)Ya.fromBufferAttribute(this,t),Ya.applyMatrix3(e),this.setXY(t,Ya.x,Ya.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)Rt.fromBufferAttribute(this,t),Rt.applyMatrix3(e),this.setXYZ(t,Rt.x,Rt.y,Rt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)Rt.fromBufferAttribute(this,t),Rt.applyMatrix4(e),this.setXYZ(t,Rt.x,Rt.y,Rt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Rt.fromBufferAttribute(this,t),Rt.applyNormalMatrix(e),this.setXYZ(t,Rt.x,Rt.y,Rt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Rt.fromBufferAttribute(this,t),Rt.transformDirection(e),this.setXYZ(t,Rt.x,Rt.y,Rt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=zs(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Kt(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=zs(t,this.array)),t}setX(e,t){return this.normalized&&(t=Kt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=zs(t,this.array)),t}setY(e,t){return this.normalized&&(t=Kt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=zs(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Kt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=zs(t,this.array)),t}setW(e,t){return this.normalized&&(t=Kt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=Kt(t,this.array),n=Kt(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,s){return e*=this.itemSize,this.normalized&&(t=Kt(t,this.array),n=Kt(n,this.array),s=Kt(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e*=this.itemSize,this.normalized&&(t=Kt(t,this.array),n=Kt(n,this.array),s=Kt(s,this.array),r=Kt(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Gc&&(e.usage=this.usage),e}};var Br=class extends At{constructor(e,t,n){super(new Uint16Array(e),t,n)}};var zr=class extends At{constructor(e,t,n){super(new Uint32Array(e),t,n)}};var nt=class extends At{constructor(e,t,n){super(new Float32Array(e),t,n)}},rm=0,Sn=new Ye,Pc=new xt,Ns=new D,dn=new Pn,br=new Pn,Ot=new D,Mt=class i extends Hn{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:rm++}),this.uuid=mi(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(gh(e)?zr:Br)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let r=new Xe().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}let s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Sn.makeRotationFromQuaternion(e),this.applyMatrix4(Sn),this}rotateX(e){return Sn.makeRotationX(e),this.applyMatrix4(Sn),this}rotateY(e){return Sn.makeRotationY(e),this.applyMatrix4(Sn),this}rotateZ(e){return Sn.makeRotationZ(e),this.applyMatrix4(Sn),this}translate(e,t,n){return Sn.makeTranslation(e,t,n),this.applyMatrix4(Sn),this}scale(e,t,n){return Sn.makeScale(e,t,n),this.applyMatrix4(Sn),this}lookAt(e){return Pc.lookAt(e),Pc.updateMatrix(),this.applyMatrix4(Pc.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Ns).negate(),this.translate(Ns.x,Ns.y,Ns.z),this}setFromPoints(e){let t=this.getAttribute("position");if(t===void 0){let n=[];for(let s=0,r=e.length;s<r;s++){let a=e[s];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new nt(n,3))}else{let n=Math.min(e.length,t.count);for(let s=0;s<n;s++){let r=e[s];t.setXYZ(s,r.x,r.y,r.z||0)}e.length>t.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Pn);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new D(-1/0,-1/0,-1/0),new D(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,s=t.length;n<s;n++){let r=t[n];dn.setFromBufferAttribute(r),this.morphTargetsRelative?(Ot.addVectors(this.boundingBox.min,dn.min),this.boundingBox.expandByPoint(Ot),Ot.addVectors(this.boundingBox.max,dn.max),this.boundingBox.expandByPoint(Ot)):(this.boundingBox.expandByPoint(dn.min),this.boundingBox.expandByPoint(dn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new on);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new D,1/0);return}if(e){let n=this.boundingSphere.center;if(dn.setFromBufferAttribute(e),t)for(let r=0,a=t.length;r<a;r++){let o=t[r];br.setFromBufferAttribute(o),this.morphTargetsRelative?(Ot.addVectors(dn.min,br.min),dn.expandByPoint(Ot),Ot.addVectors(dn.max,br.max),dn.expandByPoint(Ot)):(dn.expandByPoint(br.min),dn.expandByPoint(br.max))}dn.getCenter(n);let s=0;for(let r=0,a=e.count;r<a;r++)Ot.fromBufferAttribute(e,r),s=Math.max(s,n.distanceToSquared(Ot));if(t)for(let r=0,a=t.length;r<a;r++){let o=t[r],l=this.morphTargetsRelative;for(let c=0,h=o.count;c<h;c++)Ot.fromBufferAttribute(o,c),l&&(Ns.fromBufferAttribute(e,c),Ot.add(Ns)),s=Math.max(s,n.distanceToSquared(Ot))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=t.position,s=t.normal,r=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new At(new Float32Array(4*n.count),4));let a=this.getAttribute("tangent"),o=[],l=[];for(let R=0;R<n.count;R++)o[R]=new D,l[R]=new D;let c=new D,h=new D,u=new D,p=new ge,f=new ge,d=new ge,y=new D,g=new D;function m(R,b,M){c.fromBufferAttribute(n,R),h.fromBufferAttribute(n,b),u.fromBufferAttribute(n,M),p.fromBufferAttribute(r,R),f.fromBufferAttribute(r,b),d.fromBufferAttribute(r,M),h.sub(c),u.sub(c),f.sub(p),d.sub(p);let I=1/(f.x*d.y-d.x*f.y);isFinite(I)&&(y.copy(h).multiplyScalar(d.y).addScaledVector(u,-f.y).multiplyScalar(I),g.copy(u).multiplyScalar(f.x).addScaledVector(h,-d.x).multiplyScalar(I),o[R].add(y),o[b].add(y),o[M].add(y),l[R].add(g),l[b].add(g),l[M].add(g))}let S=this.groups;S.length===0&&(S=[{start:0,count:e.count}]);for(let R=0,b=S.length;R<b;++R){let M=S[R],I=M.start,N=M.count;for(let H=I,W=I+N;H<W;H+=3)m(e.getX(H+0),e.getX(H+1),e.getX(H+2))}let _=new D,x=new D,C=new D,w=new D;function A(R){C.fromBufferAttribute(s,R),w.copy(C);let b=o[R];_.copy(b),_.sub(C.multiplyScalar(C.dot(b))).normalize(),x.crossVectors(w,b);let I=x.dot(l[R])<0?-1:1;a.setXYZW(R,_.x,_.y,_.z,I)}for(let R=0,b=S.length;R<b;++R){let M=S[R],I=M.start,N=M.count;for(let H=I,W=I+N;H<W;H+=3)A(e.getX(H+0)),A(e.getX(H+1)),A(e.getX(H+2))}}computeVertexNormals(){let e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new At(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let p=0,f=n.count;p<f;p++)n.setXYZ(p,0,0,0);let s=new D,r=new D,a=new D,o=new D,l=new D,c=new D,h=new D,u=new D;if(e)for(let p=0,f=e.count;p<f;p+=3){let d=e.getX(p+0),y=e.getX(p+1),g=e.getX(p+2);s.fromBufferAttribute(t,d),r.fromBufferAttribute(t,y),a.fromBufferAttribute(t,g),h.subVectors(a,r),u.subVectors(s,r),h.cross(u),o.fromBufferAttribute(n,d),l.fromBufferAttribute(n,y),c.fromBufferAttribute(n,g),o.add(h),l.add(h),c.add(h),n.setXYZ(d,o.x,o.y,o.z),n.setXYZ(y,l.x,l.y,l.z),n.setXYZ(g,c.x,c.y,c.z)}else for(let p=0,f=t.count;p<f;p+=3)s.fromBufferAttribute(t,p+0),r.fromBufferAttribute(t,p+1),a.fromBufferAttribute(t,p+2),h.subVectors(a,r),u.subVectors(s,r),h.cross(u),n.setXYZ(p+0,h.x,h.y,h.z),n.setXYZ(p+1,h.x,h.y,h.z),n.setXYZ(p+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Ot.fromBufferAttribute(e,t),Ot.normalize(),e.setXYZ(t,Ot.x,Ot.y,Ot.z)}toNonIndexed(){function e(o,l){let c=o.array,h=o.itemSize,u=o.normalized,p=new c.constructor(l.length*h),f=0,d=0;for(let y=0,g=l.length;y<g;y++){o.isInterleavedBufferAttribute?f=l[y]*o.data.stride+o.offset:f=l[y]*h;for(let m=0;m<h;m++)p[d++]=c[f++]}return new At(p,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let t=new i,n=this.index.array,s=this.attributes;for(let o in s){let l=s[o],c=e(l,n);t.setAttribute(o,c)}let r=this.morphAttributes;for(let o in r){let l=[],c=r[o];for(let h=0,u=c.length;h<u;h++){let p=c[h],f=e(p,n);l.push(f)}t.morphAttributes[o]=l}t.morphTargetsRelative=this.morphTargetsRelative;let a=this.groups;for(let o=0,l=a.length;o<l;o++){let c=a[o];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){let e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){let l=this.parameters;for(let c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let l in n){let c=n[l];e.data.attributes[l]=c.toJSON(e.data)}let s={},r=!1;for(let l in this.morphAttributes){let c=this.morphAttributes[l],h=[];for(let u=0,p=c.length;u<p;u++){let f=c[u];h.push(f.toJSON(e.data))}h.length>0&&(s[l]=h,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone());let s=e.attributes;for(let c in s){let h=s[c];this.setAttribute(c,h.clone(t))}let r=e.morphAttributes;for(let c in r){let h=[],u=r[c];for(let p=0,f=u.length;p<f;p++)h.push(u[p].clone(t));this.morphAttributes[c]=h}this.morphTargetsRelative=e.morphTargetsRelative;let a=e.groups;for(let c=0,h=a.length;c<h;c++){let u=a[c];this.addGroup(u.start,u.count,u.materialIndex)}let o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());let l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}},Cu=new Ye,qi=new Gn,Za=new on,Ru=new D,Ja=new D,Ka=new D,ja=new D,Lc=new D,Qa=new D,Iu=new D,eo=new D,dt=class extends xt{constructor(e=new Mt,t=new pn){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){let o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(e,t){let n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(s,e);let o=this.morphTargetInfluences;if(r&&o){Qa.set(0,0,0);for(let l=0,c=r.length;l<c;l++){let h=o[l],u=r[l];h!==0&&(Lc.fromBufferAttribute(u,e),a?Qa.addScaledVector(Lc,h):Qa.addScaledVector(Lc.sub(t),h))}t.add(Qa)}return t}raycast(e,t){let n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Za.copy(n.boundingSphere),Za.applyMatrix4(r),qi.copy(e.ray).recast(e.near),!(Za.containsPoint(qi.origin)===!1&&(qi.intersectSphere(Za,Ru)===null||qi.origin.distanceToSquared(Ru)>(e.far-e.near)**2))&&(Cu.copy(r).invert(),qi.copy(e.ray).applyMatrix4(Cu),!(n.boundingBox!==null&&qi.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,qi)))}_computeIntersections(e,t,n){let s,r=this.geometry,a=this.material,o=r.index,l=r.attributes.position,c=r.attributes.uv,h=r.attributes.uv1,u=r.attributes.normal,p=r.groups,f=r.drawRange;if(o!==null)if(Array.isArray(a))for(let d=0,y=p.length;d<y;d++){let g=p[d],m=a[g.materialIndex],S=Math.max(g.start,f.start),_=Math.min(o.count,Math.min(g.start+g.count,f.start+f.count));for(let x=S,C=_;x<C;x+=3){let w=o.getX(x),A=o.getX(x+1),R=o.getX(x+2);s=to(this,m,e,n,c,h,u,w,A,R),s&&(s.faceIndex=Math.floor(x/3),s.face.materialIndex=g.materialIndex,t.push(s))}}else{let d=Math.max(0,f.start),y=Math.min(o.count,f.start+f.count);for(let g=d,m=y;g<m;g+=3){let S=o.getX(g),_=o.getX(g+1),x=o.getX(g+2);s=to(this,a,e,n,c,h,u,S,_,x),s&&(s.faceIndex=Math.floor(g/3),t.push(s))}}else if(l!==void 0)if(Array.isArray(a))for(let d=0,y=p.length;d<y;d++){let g=p[d],m=a[g.materialIndex],S=Math.max(g.start,f.start),_=Math.min(l.count,Math.min(g.start+g.count,f.start+f.count));for(let x=S,C=_;x<C;x+=3){let w=x,A=x+1,R=x+2;s=to(this,m,e,n,c,h,u,w,A,R),s&&(s.faceIndex=Math.floor(x/3),s.face.materialIndex=g.materialIndex,t.push(s))}}else{let d=Math.max(0,f.start),y=Math.min(l.count,f.start+f.count);for(let g=d,m=y;g<m;g+=3){let S=g,_=g+1,x=g+2;s=to(this,a,e,n,c,h,u,S,_,x),s&&(s.faceIndex=Math.floor(g/3),t.push(s))}}}};function am(i,e,t,n,s,r,a,o){let l;if(e.side===Vt?l=n.intersectTriangle(a,r,s,!0,o):l=n.intersectTriangle(s,r,a,e.side===ri,o),l===null)return null;eo.copy(o),eo.applyMatrix4(i.matrixWorld);let c=t.ray.origin.distanceTo(eo);return c<t.near||c>t.far?null:{distance:c,point:eo.clone(),object:i}}function to(i,e,t,n,s,r,a,o,l,c){i.getVertexPosition(o,Ja),i.getVertexPosition(l,Ka),i.getVertexPosition(c,ja);let h=am(i,e,t,n,Ja,Ka,ja,Iu);if(h){let u=new D;Ai.getBarycoord(Iu,Ja,Ka,ja,u),s&&(h.uv=Ai.getInterpolatedAttribute(s,o,l,c,u,new ge)),r&&(h.uv1=Ai.getInterpolatedAttribute(r,o,l,c,u,new ge)),a&&(h.normal=Ai.getInterpolatedAttribute(a,o,l,c,u,new D),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));let p={a:o,b:l,c,normal:new D,materialIndex:0};Ai.getNormal(Ja,Ka,ja,p.normal),h.face=p,h.barycoord=u}return h}var Lt=class i extends Mt{constructor(e=1,t=1,n=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:s,heightSegments:r,depthSegments:a};let o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);let l=[],c=[],h=[],u=[],p=0,f=0;d("z","y","x",-1,-1,n,t,e,a,r,0),d("z","y","x",1,-1,n,t,-e,a,r,1),d("x","z","y",1,1,e,n,t,s,a,2),d("x","z","y",1,-1,e,n,-t,s,a,3),d("x","y","z",1,-1,e,t,n,s,r,4),d("x","y","z",-1,-1,e,t,-n,s,r,5),this.setIndex(l),this.setAttribute("position",new nt(c,3)),this.setAttribute("normal",new nt(h,3)),this.setAttribute("uv",new nt(u,2));function d(y,g,m,S,_,x,C,w,A,R,b){let M=x/A,I=C/R,N=x/2,H=C/2,W=w/2,L=A+1,z=R+1,$=0,k=0,ie=new D;for(let Q=0;Q<z;Q++){let ce=Q*I-H;for(let De=0;De<L;De++){let ke=De*M-N;ie[y]=ke*S,ie[g]=ce*_,ie[m]=W,c.push(ie.x,ie.y,ie.z),ie[y]=0,ie[g]=0,ie[m]=w>0?1:-1,h.push(ie.x,ie.y,ie.z),u.push(De/A),u.push(1-Q/R),$+=1}}for(let Q=0;Q<R;Q++)for(let ce=0;ce<A;ce++){let De=p+ce+L*Q,ke=p+ce+L*(Q+1),Ke=p+(ce+1)+L*(Q+1),$e=p+(ce+1)+L*Q;l.push(De,ke,$e),l.push(ke,Ke,$e),k+=6}o.addGroup(f,k,b),f+=k,p+=$}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}};function ds(i){let e={};for(let t in i){e[t]={};for(let n in i[t]){let s=i[t][n];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=s.clone():Array.isArray(s)?e[t][n]=s.slice():e[t][n]=s}}return e}function Yt(i){let e={};for(let t=0;t<i.length;t++){let n=ds(i[t]);for(let s in n)e[s]=n[s]}return e}function om(i){let e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function yh(i){let e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:st.workingColorSpace}var qd={clone:ds,merge:Yt},lm=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,cm=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,mn=class extends Wn{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=lm,this.fragmentShader=cm,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=ds(e.uniforms),this.uniformsGroups=om(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let s in this.uniforms){let a=this.uniforms[s].value;a&&a.isTexture?t.uniforms[s]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[s]={type:"m4",value:a.toArray()}:t.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let n={};for(let s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}},kr=class extends xt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Ye,this.projectionMatrix=new Ye,this.projectionMatrixInverse=new Ye,this.coordinateSystem=Rn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}},Ti=new D,Pu=new ge,Lu=new ge,qt=class extends kr{constructor(e=50,t=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=Vs*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(Cr*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Vs*2*Math.atan(Math.tan(Cr*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){Ti.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Ti.x,Ti.y).multiplyScalar(-e/Ti.z),Ti.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Ti.x,Ti.y).multiplyScalar(-e/Ti.z)}getViewSize(e,t){return this.getViewBounds(e,Pu,Lu),t.subVectors(Lu,Pu)}setViewOffset(e,t,n,s,r,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(Cr*.5*this.fov)/this.zoom,n=2*t,s=this.aspect*n,r=-.5*s,a=this.view;if(this.view!==null&&this.view.enabled){let l=a.fullWidth,c=a.fullHeight;r+=a.offsetX*s/l,t-=a.offsetY*n/c,s*=a.width/l,n*=a.height/c}let o=this.filmOffset;o!==0&&(r+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}},Fs=-90,Os=1,Eo=class extends xt{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let s=new qt(Fs,Os,e,t);s.layers=this.layers,this.add(s);let r=new qt(Fs,Os,e,t);r.layers=this.layers,this.add(r);let a=new qt(Fs,Os,e,t);a.layers=this.layers,this.add(a);let o=new qt(Fs,Os,e,t);o.layers=this.layers,this.add(o);let l=new qt(Fs,Os,e,t);l.layers=this.layers,this.add(l);let c=new qt(Fs,Os,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[n,s,r,a,o,l]=t;for(let c of t)this.remove(c);if(e===Rn)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===Nr)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(let c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[r,a,o,l,c,h]=this.children,u=e.getRenderTarget(),p=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),d=e.xr.enabled;e.xr.enabled=!1;let y=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,s),e.render(t,r),e.setRenderTarget(n,1,s),e.render(t,a),e.setRenderTarget(n,2,s),e.render(t,o),e.setRenderTarget(n,3,s),e.render(t,l),e.setRenderTarget(n,4,s),e.render(t,c),n.texture.generateMipmaps=y,e.setRenderTarget(n,5,s),e.render(t,h),e.setRenderTarget(u,p,f),e.xr.enabled=d,n.texture.needsPMREMUpdate=!0}},Hr=class extends an{constructor(e=[],t=cs,n,s,r,a,o,l,c,h){super(e,t,n,s,r,a,o,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},wo=class extends Vn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},s=[n,n,n,n,n,n];this.texture=new Hr(s),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new Lt(5,5,5),r=new mn({name:"CubemapFromEquirect",uniforms:ds(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Vt,blending:di});r.uniforms.tEquirect.value=t;let a=new dt(s,r),o=t.minFilter;return t.minFilter===Li&&(t.minFilter=In),new Eo(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,s=!0){let r=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,s);e.setRenderTarget(r)}},Tt=class extends xt{constructor(){super(),this.isGroup=!0,this.type="Group"}},hm={type:"move"},$s=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Tt,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Tt,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new D,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new D),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Tt,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new D,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new D),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let s=null,r=null,a=null,o=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){a=!0;for(let y of e.hand.values()){let g=t.getJointPose(y,n),m=this._getHandJoint(c,y);g!==null&&(m.matrix.fromArray(g.transform.matrix),m.matrix.decompose(m.position,m.rotation,m.scale),m.matrixWorldNeedsUpdate=!0,m.jointRadius=g.radius),m.visible=g!==null}let h=c.joints["index-finger-tip"],u=c.joints["thumb-tip"],p=h.position.distanceTo(u.position),f=.02,d=.005;c.inputState.pinching&&p>f+d?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&p<=f-d&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));o!==null&&(s=t.getPose(e.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(hm)))}return o!==null&&(o.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let n=new Tt;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}},Vr=class i{constructor(e,t=25e-5){this.isFogExp2=!0,this.name="",this.color=new Ve(e),this.density=t}clone(){return new i(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}};var Gr=class extends xt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new fn,this.environmentIntensity=1,this.environmentRotation=new fn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}};var no=new D,Du=new D,Wr=class extends xt{constructor(){super(),this.isLOD=!0,this._currentLevel=0,this.type="LOD",Object.defineProperties(this,{levels:{enumerable:!0,value:[]}}),this.autoUpdate=!0}copy(e){super.copy(e,!1);let t=e.levels;for(let n=0,s=t.length;n<s;n++){let r=t[n];this.addLevel(r.object.clone(),r.distance,r.hysteresis)}return this.autoUpdate=e.autoUpdate,this}addLevel(e,t=0,n=0){t=Math.abs(t);let s=this.levels,r;for(r=0;r<s.length&&!(t<s[r].distance);r++);return s.splice(r,0,{distance:t,hysteresis:n,object:e}),this.add(e),this}removeLevel(e){let t=this.levels;for(let n=0;n<t.length;n++)if(t[n].distance===e){let s=t.splice(n,1);return this.remove(s[0].object),!0}return!1}getCurrentLevel(){return this._currentLevel}getObjectForDistance(e){let t=this.levels;if(t.length>0){let n,s;for(n=1,s=t.length;n<s;n++){let r=t[n].distance;if(t[n].object.visible&&(r-=r*t[n].hysteresis),e<r)break}return t[n-1].object}return null}raycast(e,t){if(this.levels.length>0){no.setFromMatrixPosition(this.matrixWorld);let s=e.ray.origin.distanceTo(no);this.getObjectForDistance(s).raycast(e,t)}}update(e){let t=this.levels;if(t.length>1){no.setFromMatrixPosition(e.matrixWorld),Du.setFromMatrixPosition(this.matrixWorld);let n=no.distanceTo(Du)/e.zoom;t[0].object.visible=!0;let s,r;for(s=1,r=t.length;s<r;s++){let a=t[s].distance;if(t[s].object.visible&&(a-=a*t[s].hysteresis),n>=a)t[s-1].object.visible=!1,t[s].object.visible=!0;else break}for(this._currentLevel=s-1;s<r;s++)t[s].object.visible=!1}}toJSON(e){let t=super.toJSON(e);this.autoUpdate===!1&&(t.object.autoUpdate=!1),t.object.levels=[];let n=this.levels;for(let s=0,r=n.length;s<r;s++){let a=n[s];t.object.levels.push({object:a.object.uuid,distance:a.distance,hysteresis:a.hysteresis})}return t}},Uu=new D,Nu=new yt,Fu=new yt,um=new D,Ou=new Ye,io=new D,Dc=new on,Bu=new Ye,Uc=new Gn,Xr=class extends dt{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=Hc,this.bindMatrix=new Ye,this.bindMatrixInverse=new Ye,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){let e=this.geometry;this.boundingBox===null&&(this.boundingBox=new Pn),this.boundingBox.makeEmpty();let t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,io),this.boundingBox.expandByPoint(io)}computeBoundingSphere(){let e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new on),this.boundingSphere.makeEmpty();let t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,io),this.boundingSphere.expandByPoint(io)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,t){let n=this.material,s=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Dc.copy(this.boundingSphere),Dc.applyMatrix4(s),e.ray.intersectsSphere(Dc)!==!1&&(Bu.copy(s).invert(),Uc.copy(e.ray).applyMatrix4(Bu),!(this.boundingBox!==null&&Uc.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(e,t,Uc)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){let e=new yt,t=this.geometry.attributes.skinWeight;for(let n=0,s=t.count;n<s;n++){e.fromBufferAttribute(t,n);let r=1/e.manhattanLength();r!==1/0?e.multiplyScalar(r):e.set(1,0,0,0),t.setXYZW(n,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===Hc?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===Rd?this.bindMatrixInverse.copy(this.bindMatrix).invert():console.warn("THREE.SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){let n=this.skeleton,s=this.geometry;Nu.fromBufferAttribute(s.attributes.skinIndex,e),Fu.fromBufferAttribute(s.attributes.skinWeight,e),Uu.copy(t).applyMatrix4(this.bindMatrix),t.set(0,0,0);for(let r=0;r<4;r++){let a=Fu.getComponent(r);if(a!==0){let o=Nu.getComponent(r);Ou.multiplyMatrices(n.bones[o].matrixWorld,n.boneInverses[o]),t.addScaledVector(um.copy(Uu).applyMatrix4(Ou),a)}}return t.applyMatrix4(this.bindMatrixInverse)}},gn=class extends xt{constructor(){super(),this.isBone=!0,this.type="Bone"}},$r=class extends an{constructor(e=null,t=1,n=1,s,r,a,o,l,c=rn,h=rn,u,p){super(null,a,o,l,c,h,s,r,u,p),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},zu=new Ye,dm=new Ye,qr=class i{constructor(e=[],t=[]){this.uuid=mi(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){let e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){console.warn("THREE.Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,s=this.bones.length;n<s;n++)this.boneInverses.push(new Ye)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){let n=new Ye;this.bones[e]&&n.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){let n=this.bones[e];n&&n.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){let n=this.bones[e];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){let e=this.bones,t=this.boneInverses,n=this.boneMatrices,s=this.boneTexture;for(let r=0,a=e.length;r<a;r++){let o=e[r]?e[r].matrixWorld:dm;zu.multiplyMatrices(o,t[r]),zu.toArray(n,r*16)}s!==null&&(s.needsUpdate=!0)}clone(){return new i(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);let t=new Float32Array(e*e*4);t.set(this.boneMatrices);let n=new $r(t,e,e,xn,En);return n.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=n,this}getBoneByName(e){for(let t=0,n=this.bones.length;t<n;t++){let s=this.bones[t];if(s.name===e)return s}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let n=0,s=e.bones.length;n<s;n++){let r=e.bones[n],a=t[r];a===void 0&&(console.warn("THREE.Skeleton: No bone found with UUID:",r),a=new gn),this.bones.push(a),this.boneInverses.push(new Ye().fromArray(e.boneInverses[n]))}return this.init(),this}toJSON(){let e={metadata:{version:4.7,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;let t=this.bones,n=this.boneInverses;for(let s=0,r=t.length;s<r;s++){let a=t[s];e.bones.push(a.uuid);let o=n[s];e.boneInverses.push(o.toArray())}return e}},Yr=class extends At{constructor(e,t,n,s=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){let e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}},Bs=new Ye,ku=new Ye,so=[],Hu=new Pn,fm=new Ye,Er=new dt,wr=new on,Xn=class extends dt{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new Yr(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<n;s++)this.setMatrixAt(s,fm)}computeBoundingBox(){let e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new Pn),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Bs),Hu.copy(e.boundingBox).applyMatrix4(Bs),this.boundingBox.union(Hu)}computeBoundingSphere(){let e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new on),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Bs),wr.copy(e.boundingSphere).applyMatrix4(Bs),this.boundingSphere.union(wr)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){let n=t.morphTargetInfluences,s=this.morphTexture.source.data.data,r=n.length+1,a=e*r+1;for(let o=0;o<n.length;o++)n[o]=s[a+o]}raycast(e,t){let n=this.matrixWorld,s=this.count;if(Er.geometry=this.geometry,Er.material=this.material,Er.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),wr.copy(this.boundingSphere),wr.applyMatrix4(n),e.ray.intersectsSphere(wr)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,Bs),ku.multiplyMatrices(n,Bs),Er.matrixWorld=ku,Er.raycast(e,so);for(let a=0,o=so.length;a<o;a++){let l=so[a];l.instanceId=r,l.object=this,t.push(l)}so.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new Yr(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}setMorphAt(e,t){let n=t.morphTargetInfluences,s=n.length+1;this.morphTexture===null&&(this.morphTexture=new $r(new Float32Array(s*this.count),s,this.count,sl,En));let r=this.morphTexture.source.data.data,a=0;for(let c=0;c<n.length;c++)a+=n[c];let o=this.geometry.morphTargetsRelative?1:1-a,l=s*e;r[l]=o,r.set(n,l+1)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}},Nc=new D,pm=new D,mm=new Xe,kn=class{constructor(e=new D(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,s){return this.normal.set(e,t,n),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let s=Nc.subVectors(n,t).cross(pm.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){let n=e.delta(Nc),s=this.normal.dot(n);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let r=-(e.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:t.copy(e.start).addScaledVector(n,r)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||mm.getNormalMatrix(e),s=this.coplanarPoint(Nc).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}},Yi=new on,gm=new ge(.5,.5),ro=new D,Ii=class{constructor(e=new kn,t=new kn,n=new kn,s=new kn,r=new kn,a=new kn){this.planes=[e,t,n,s,r,a]}set(e,t,n,s,r,a){let o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=Rn,n=!1){let s=this.planes,r=e.elements,a=r[0],o=r[1],l=r[2],c=r[3],h=r[4],u=r[5],p=r[6],f=r[7],d=r[8],y=r[9],g=r[10],m=r[11],S=r[12],_=r[13],x=r[14],C=r[15];if(s[0].setComponents(c-a,f-h,m-d,C-S).normalize(),s[1].setComponents(c+a,f+h,m+d,C+S).normalize(),s[2].setComponents(c+o,f+u,m+y,C+_).normalize(),s[3].setComponents(c-o,f-u,m-y,C-_).normalize(),n)s[4].setComponents(l,p,g,x).normalize(),s[5].setComponents(c-l,f-p,m-g,C-x).normalize();else if(s[4].setComponents(c-l,f-p,m-g,C-x).normalize(),t===Rn)s[5].setComponents(c+l,f+p,m+g,C+x).normalize();else if(t===Nr)s[5].setComponents(l,p,g,x).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Yi.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Yi.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Yi)}intersectsSprite(e){Yi.center.set(0,0,0);let t=gm.distanceTo(e.center);return Yi.radius=.7071067811865476+t,Yi.applyMatrix4(e.matrixWorld),this.intersectsSphere(Yi)}intersectsSphere(e){let t=this.planes,n=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let s=t[n];if(ro.x=s.normal.x>0?e.max.x:e.min.x,ro.y=s.normal.y>0?e.max.y:e.min.y,ro.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(ro)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};var Zr=class extends Wn{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Ve(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}},To=new D,Ao=new D,Vu=new Ye,Tr=new Gn,ao=new on,Fc=new D,Gu=new D,qs=class extends xt{constructor(e=new Mt,t=new Zr){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[0];for(let s=1,r=t.count;s<r;s++)To.fromBufferAttribute(t,s-1),Ao.fromBufferAttribute(t,s),n[s]=n[s-1],n[s]+=To.distanceTo(Ao);e.setAttribute("lineDistance",new nt(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){let n=this.geometry,s=this.matrixWorld,r=e.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),ao.copy(n.boundingSphere),ao.applyMatrix4(s),ao.radius+=r,e.ray.intersectsSphere(ao)===!1)return;Vu.copy(s).invert(),Tr.copy(e.ray).applyMatrix4(Vu);let o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=this.isLineSegments?2:1,h=n.index,p=n.attributes.position;if(h!==null){let f=Math.max(0,a.start),d=Math.min(h.count,a.start+a.count);for(let y=f,g=d-1;y<g;y+=c){let m=h.getX(y),S=h.getX(y+1),_=oo(this,e,Tr,l,m,S,y);_&&t.push(_)}if(this.isLineLoop){let y=h.getX(d-1),g=h.getX(f),m=oo(this,e,Tr,l,y,g,d-1);m&&t.push(m)}}else{let f=Math.max(0,a.start),d=Math.min(p.count,a.start+a.count);for(let y=f,g=d-1;y<g;y+=c){let m=oo(this,e,Tr,l,y,y+1,y);m&&t.push(m)}if(this.isLineLoop){let y=oo(this,e,Tr,l,d-1,f,d-1);y&&t.push(y)}}}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){let o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}};function oo(i,e,t,n,s,r,a){let o=i.geometry.attributes.position;if(To.fromBufferAttribute(o,s),Ao.fromBufferAttribute(o,r),t.distanceSqToSegment(To,Ao,Fc,Gu)>n)return;Fc.applyMatrix4(i.matrixWorld);let c=e.ray.origin.distanceTo(Fc);if(!(c<e.near||c>e.far))return{distance:c,point:Gu.clone().applyMatrix4(i.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:i}}var Ys=class extends Wn{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Ve(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},Wu=new Ye,Wc=new Gn,lo=new on,co=new D,Jr=class extends xt{constructor(e=new Mt,t=new Ys){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){let n=this.geometry,s=this.matrixWorld,r=e.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),lo.copy(n.boundingSphere),lo.applyMatrix4(s),lo.radius+=r,e.ray.intersectsSphere(lo)===!1)return;Wu.copy(s).invert(),Wc.copy(e.ray).applyMatrix4(Wu);let o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=n.index,u=n.attributes.position;if(c!==null){let p=Math.max(0,a.start),f=Math.min(c.count,a.start+a.count);for(let d=p,y=f;d<y;d++){let g=c.getX(d);co.fromBufferAttribute(u,g),Xu(co,g,l,s,e,t,this)}}else{let p=Math.max(0,a.start),f=Math.min(u.count,a.start+a.count);for(let d=p,y=f;d<y;d++)co.fromBufferAttribute(u,d),Xu(co,d,l,s,e,t,this)}}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){let o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}};function Xu(i,e,t,n,s,r,a){let o=Wc.distanceSqToPoint(i);if(o<t){let l=new D;Wc.closestPointToPoint(i,l),l.applyMatrix4(n);let c=s.ray.origin.distanceTo(l);if(c<s.near||c>s.far)return;r.push({distance:c,distanceToRay:Math.sqrt(o),point:l,index:e,face:null,faceIndex:null,barycoord:null,object:a})}}var Kr=class extends an{constructor(e,t,n=Di,s,r,a,o=rn,l=rn,c,h=Hs,u=1){if(h!==Hs&&h!==ir)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let p={width:e,height:t,depth:u};super(p,s,r,a,o,l,h,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Ws(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}},jr=class extends an{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}};var Qr=class i extends Mt{constructor(e=1,t=32,n=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:s},t=Math.max(3,t);let r=[],a=[],o=[],l=[],c=new D,h=new ge;a.push(0,0,0),o.push(0,0,1),l.push(.5,.5);for(let u=0,p=3;u<=t;u++,p+=3){let f=n+u/t*s;c.x=e*Math.cos(f),c.y=e*Math.sin(f),a.push(c.x,c.y,c.z),o.push(0,0,1),h.x=(a[p]/e+1)/2,h.y=(a[p+1]/e+1)/2,l.push(h.x,h.y)}for(let u=1;u<=t;u++)r.push(u,u+1,0);this.setIndex(r),this.setAttribute("position",new nt(a,3)),this.setAttribute("normal",new nt(o,3)),this.setAttribute("uv",new nt(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radius,e.segments,e.thetaStart,e.thetaLength)}},ai=class i extends Mt{constructor(e=1,t=1,n=1,s=32,r=1,a=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:s,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:l};let c=this;s=Math.floor(s),r=Math.floor(r);let h=[],u=[],p=[],f=[],d=0,y=[],g=n/2,m=0;S(),a===!1&&(e>0&&_(!0),t>0&&_(!1)),this.setIndex(h),this.setAttribute("position",new nt(u,3)),this.setAttribute("normal",new nt(p,3)),this.setAttribute("uv",new nt(f,2));function S(){let x=new D,C=new D,w=0,A=(t-e)/n;for(let R=0;R<=r;R++){let b=[],M=R/r,I=M*(t-e)+e;for(let N=0;N<=s;N++){let H=N/s,W=H*l+o,L=Math.sin(W),z=Math.cos(W);C.x=I*L,C.y=-M*n+g,C.z=I*z,u.push(C.x,C.y,C.z),x.set(L,A,z).normalize(),p.push(x.x,x.y,x.z),f.push(H,1-M),b.push(d++)}y.push(b)}for(let R=0;R<s;R++)for(let b=0;b<r;b++){let M=y[b][R],I=y[b+1][R],N=y[b+1][R+1],H=y[b][R+1];(e>0||b!==0)&&(h.push(M,I,H),w+=3),(t>0||b!==r-1)&&(h.push(I,N,H),w+=3)}c.addGroup(m,w,0),m+=w}function _(x){let C=d,w=new ge,A=new D,R=0,b=x===!0?e:t,M=x===!0?1:-1;for(let N=1;N<=s;N++)u.push(0,g*M,0),p.push(0,M,0),f.push(.5,.5),d++;let I=d;for(let N=0;N<=s;N++){let W=N/s*l+o,L=Math.cos(W),z=Math.sin(W);A.x=b*z,A.y=g*M,A.z=b*L,u.push(A.x,A.y,A.z),p.push(0,M,0),w.x=L*.5+.5,w.y=z*.5*M+.5,f.push(w.x,w.y),d++}for(let N=0;N<s;N++){let H=C+N,W=I+N;x===!0?h.push(W,W+1,H):h.push(W+1,W,H),R+=3}c.addGroup(m,R,x===!0?1:2),m+=R}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}},Ln=class i extends ai{constructor(e=1,t=1,n=32,s=1,r=!1,a=0,o=Math.PI*2){super(0,e,t,n,s,r,a,o),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:n,heightSegments:s,openEnded:r,thetaStart:a,thetaLength:o}}static fromJSON(e){return new i(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}},Zs=class i extends Mt{constructor(e=[],t=[],n=1,s=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:n,detail:s};let r=[],a=[];o(s),c(n),h(),this.setAttribute("position",new nt(r,3)),this.setAttribute("normal",new nt(r.slice(),3)),this.setAttribute("uv",new nt(a,2)),s===0?this.computeVertexNormals():this.normalizeNormals();function o(S){let _=new D,x=new D,C=new D;for(let w=0;w<t.length;w+=3)f(t[w+0],_),f(t[w+1],x),f(t[w+2],C),l(_,x,C,S)}function l(S,_,x,C){let w=C+1,A=[];for(let R=0;R<=w;R++){A[R]=[];let b=S.clone().lerp(x,R/w),M=_.clone().lerp(x,R/w),I=w-R;for(let N=0;N<=I;N++)N===0&&R===w?A[R][N]=b:A[R][N]=b.clone().lerp(M,N/I)}for(let R=0;R<w;R++)for(let b=0;b<2*(w-R)-1;b++){let M=Math.floor(b/2);b%2===0?(p(A[R][M+1]),p(A[R+1][M]),p(A[R][M])):(p(A[R][M+1]),p(A[R+1][M+1]),p(A[R+1][M]))}}function c(S){let _=new D;for(let x=0;x<r.length;x+=3)_.x=r[x+0],_.y=r[x+1],_.z=r[x+2],_.normalize().multiplyScalar(S),r[x+0]=_.x,r[x+1]=_.y,r[x+2]=_.z}function h(){let S=new D;for(let _=0;_<r.length;_+=3){S.x=r[_+0],S.y=r[_+1],S.z=r[_+2];let x=g(S)/2/Math.PI+.5,C=m(S)/Math.PI+.5;a.push(x,1-C)}d(),u()}function u(){for(let S=0;S<a.length;S+=6){let _=a[S+0],x=a[S+2],C=a[S+4],w=Math.max(_,x,C),A=Math.min(_,x,C);w>.9&&A<.1&&(_<.2&&(a[S+0]+=1),x<.2&&(a[S+2]+=1),C<.2&&(a[S+4]+=1))}}function p(S){r.push(S.x,S.y,S.z)}function f(S,_){let x=S*3;_.x=e[x+0],_.y=e[x+1],_.z=e[x+2]}function d(){let S=new D,_=new D,x=new D,C=new D,w=new ge,A=new ge,R=new ge;for(let b=0,M=0;b<r.length;b+=9,M+=6){S.set(r[b+0],r[b+1],r[b+2]),_.set(r[b+3],r[b+4],r[b+5]),x.set(r[b+6],r[b+7],r[b+8]),w.set(a[M+0],a[M+1]),A.set(a[M+2],a[M+3]),R.set(a[M+4],a[M+5]),C.copy(S).add(_).add(x).divideScalar(3);let I=g(C);y(w,M+0,S,I),y(A,M+2,_,I),y(R,M+4,x,I)}}function y(S,_,x,C){C<0&&S.x===1&&(a[_]=S.x-1),x.x===0&&x.z===0&&(a[_]=C/2/Math.PI+.5)}function g(S){return Math.atan2(S.z,-S.x)}function m(S){return Math.atan2(-S.y,Math.sqrt(S.x*S.x+S.z*S.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.vertices,e.indices,e.radius,e.details)}},ns=class i extends Zs{constructor(e=1,t=0){let n=(1+Math.sqrt(5))/2,s=1/n,r=[-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-s,-n,0,-s,n,0,s,-n,0,s,n,-s,-n,0,-s,n,0,s,-n,0,s,n,0,-n,0,-s,n,0,-s,-n,0,s,n,0,s],a=[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9];super(r,a,e,t),this.type="DodecahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new i(e.radius,e.detail)}};var yn=class{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){console.warn("THREE.Curve: .getPoint() not implemented.")}getPointAt(e,t){let n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){let e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let t=[],n,s=this.getPoint(0),r=0;t.push(0);for(let a=1;a<=e;a++)n=this.getPoint(a/e),r+=n.distanceTo(s),t.push(r),s=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){let n=this.getLengths(),s=0,r=n.length,a;t?a=t:a=e*n[r-1];let o=0,l=r-1,c;for(;o<=l;)if(s=Math.floor(o+(l-o)/2),c=n[s]-a,c<0)o=s+1;else if(c>0)l=s-1;else{l=s;break}if(s=l,n[s]===a)return s/(r-1);let h=n[s],p=n[s+1]-h,f=(a-h)/p;return(s+f)/(r-1)}getTangent(e,t){let s=e-1e-4,r=e+1e-4;s<0&&(s=0),r>1&&(r=1);let a=this.getPoint(s),o=this.getPoint(r),l=t||(a.isVector2?new ge:new D);return l.copy(o).sub(a).normalize(),l}getTangentAt(e,t){let n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t=!1){let n=new D,s=[],r=[],a=[],o=new D,l=new Ye;for(let f=0;f<=e;f++){let d=f/e;s[f]=this.getTangentAt(d,new D)}r[0]=new D,a[0]=new D;let c=Number.MAX_VALUE,h=Math.abs(s[0].x),u=Math.abs(s[0].y),p=Math.abs(s[0].z);h<=c&&(c=h,n.set(1,0,0)),u<=c&&(c=u,n.set(0,1,0)),p<=c&&n.set(0,0,1),o.crossVectors(s[0],n).normalize(),r[0].crossVectors(s[0],o),a[0].crossVectors(s[0],r[0]);for(let f=1;f<=e;f++){if(r[f]=r[f-1].clone(),a[f]=a[f-1].clone(),o.crossVectors(s[f-1],s[f]),o.length()>Number.EPSILON){o.normalize();let d=Math.acos(je(s[f-1].dot(s[f]),-1,1));r[f].applyMatrix4(l.makeRotationAxis(o,d))}a[f].crossVectors(s[f],r[f])}if(t===!0){let f=Math.acos(je(r[0].dot(r[e]),-1,1));f/=e,s[0].dot(o.crossVectors(r[0],r[e]))>0&&(f=-f);for(let d=1;d<=e;d++)r[d].applyMatrix4(l.makeRotationAxis(s[d],f*d)),a[d].crossVectors(s[d],r[d])}return{tangents:s,normals:r,binormals:a}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){let e={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}},Js=class extends yn{constructor(e=0,t=0,n=1,s=1,r=0,a=Math.PI*2,o=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=a,this.aClockwise=o,this.aRotation=l}getPoint(e,t=new ge){let n=t,s=Math.PI*2,r=this.aEndAngle-this.aStartAngle,a=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(a?r=0:r=s),this.aClockwise===!0&&!a&&(r===s?r=-s:r=r-s);let o=this.aStartAngle+e*r,l=this.aX+this.xRadius*Math.cos(o),c=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){let h=Math.cos(this.aRotation),u=Math.sin(this.aRotation),p=l-this.aX,f=c-this.aY;l=p*h-f*u+this.aX,c=p*u+f*h+this.aY}return n.set(l,c)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){let e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}},Co=class extends Js{constructor(e,t,n,s,r,a){super(e,t,n,n,s,r,a),this.isArcCurve=!0,this.type="ArcCurve"}};function xh(){let i=0,e=0,t=0,n=0;function s(r,a,o,l){i=r,e=o,t=-3*r+3*a-2*o-l,n=2*r-2*a+o+l}return{initCatmullRom:function(r,a,o,l,c){s(a,o,c*(o-r),c*(l-a))},initNonuniformCatmullRom:function(r,a,o,l,c,h,u){let p=(a-r)/c-(o-r)/(c+h)+(o-a)/h,f=(o-a)/h-(l-a)/(h+u)+(l-o)/u;p*=h,f*=h,s(a,o,p,f)},calc:function(r){let a=r*r,o=a*r;return i+e*r+t*a+n*o}}}var ho=new D,Oc=new xh,Bc=new xh,zc=new xh,Pi=class extends yn{constructor(e=[],t=!1,n="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=n,this.tension=s}getPoint(e,t=new D){let n=t,s=this.points,r=s.length,a=(r-(this.closed?0:1))*e,o=Math.floor(a),l=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/r)+1)*r:l===0&&o===r-1&&(o=r-2,l=1);let c,h;this.closed||o>0?c=s[(o-1)%r]:(ho.subVectors(s[0],s[1]).add(s[0]),c=ho);let u=s[o%r],p=s[(o+1)%r];if(this.closed||o+2<r?h=s[(o+2)%r]:(ho.subVectors(s[r-1],s[r-2]).add(s[r-1]),h=ho),this.curveType==="centripetal"||this.curveType==="chordal"){let f=this.curveType==="chordal"?.5:.25,d=Math.pow(c.distanceToSquared(u),f),y=Math.pow(u.distanceToSquared(p),f),g=Math.pow(p.distanceToSquared(h),f);y<1e-4&&(y=1),d<1e-4&&(d=y),g<1e-4&&(g=y),Oc.initNonuniformCatmullRom(c.x,u.x,p.x,h.x,d,y,g),Bc.initNonuniformCatmullRom(c.y,u.y,p.y,h.y,d,y,g),zc.initNonuniformCatmullRom(c.z,u.z,p.z,h.z,d,y,g)}else this.curveType==="catmullrom"&&(Oc.initCatmullRom(c.x,u.x,p.x,h.x,this.tension),Bc.initCatmullRom(c.y,u.y,p.y,h.y,this.tension),zc.initCatmullRom(c.z,u.z,p.z,h.z,this.tension));return n.set(Oc.calc(l),Bc.calc(l),zc.calc(l)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let s=e.points[t];this.points.push(s.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let s=this.points[t];e.points.push(s.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let s=e.points[t];this.points.push(new D().fromArray(s))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}};function $u(i,e,t,n,s){let r=(n-e)*.5,a=(s-t)*.5,o=i*i,l=i*o;return(2*t-2*n+r+a)*l+(-3*t+3*n-2*r-a)*o+r*i+t}function ym(i,e){let t=1-i;return t*t*e}function xm(i,e){return 2*(1-i)*i*e}function _m(i,e){return i*i*e}function Ir(i,e,t,n){return ym(i,e)+xm(i,t)+_m(i,n)}function vm(i,e){let t=1-i;return t*t*t*e}function Mm(i,e){let t=1-i;return 3*t*t*i*e}function Sm(i,e){return 3*(1-i)*i*i*e}function bm(i,e){return i*i*i*e}function Pr(i,e,t,n,s){return vm(i,e)+Mm(i,t)+Sm(i,n)+bm(i,s)}var ea=class extends yn{constructor(e=new ge,t=new ge,n=new ge,s=new ge){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=n,this.v3=s}getPoint(e,t=new ge){let n=t,s=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(Pr(e,s.x,r.x,a.x,o.x),Pr(e,s.y,r.y,a.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},Ro=class extends yn{constructor(e=new D,t=new D,n=new D,s=new D){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=n,this.v3=s}getPoint(e,t=new D){let n=t,s=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(Pr(e,s.x,r.x,a.x,o.x),Pr(e,s.y,r.y,a.y,o.y),Pr(e,s.z,r.z,a.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},ta=class extends yn{constructor(e=new ge,t=new ge){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new ge){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new ge){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Io=class extends yn{constructor(e=new D,t=new D){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new D){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new D){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},na=class extends yn{constructor(e=new ge,t=new ge,n=new ge){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new ge){let n=t,s=this.v0,r=this.v1,a=this.v2;return n.set(Ir(e,s.x,r.x,a.x),Ir(e,s.y,r.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},ia=class extends yn{constructor(e=new D,t=new D,n=new D){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new D){let n=t,s=this.v0,r=this.v1,a=this.v2;return n.set(Ir(e,s.x,r.x,a.x),Ir(e,s.y,r.y,a.y),Ir(e,s.z,r.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},sa=class extends yn{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new ge){let n=t,s=this.points,r=(s.length-1)*e,a=Math.floor(r),o=r-a,l=s[a===0?a:a-1],c=s[a],h=s[a>s.length-2?s.length-1:a+1],u=s[a>s.length-3?s.length-1:a+2];return n.set($u(o,l.x,c.x,h.x,u.x),$u(o,l.y,c.y,h.y,u.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let s=e.points[t];this.points.push(s.clone())}return this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let s=this.points[t];e.points.push(s.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let s=e.points[t];this.points.push(new ge().fromArray(s))}return this}},Po=Object.freeze({__proto__:null,ArcCurve:Co,CatmullRomCurve3:Pi,CubicBezierCurve:ea,CubicBezierCurve3:Ro,EllipseCurve:Js,LineCurve:ta,LineCurve3:Io,QuadraticBezierCurve:na,QuadraticBezierCurve3:ia,SplineCurve:sa}),Lo=class extends yn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){let e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){let n=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new Po[n](t,e))}return this}getPoint(e,t){let n=e*this.getLength(),s=this.getCurveLengths(),r=0;for(;r<s.length;){if(s[r]>=n){let a=s[r]-n,o=this.curves[r],l=o.getLength(),c=l===0?0:1-a/l;return o.getPointAt(c,t)}r++}return null}getLength(){let e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let e=[],t=0;for(let n=0,s=this.curves.length;n<s;n++)t+=this.curves[n].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){let t=[],n;for(let s=0,r=this.curves;s<r.length;s++){let a=r[s],o=a.isEllipseCurve?e*2:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?e*a.points.length:e,l=a.getPoints(o);for(let c=0;c<l.length;c++){let h=l[c];n&&n.equals(h)||(t.push(h),n=h)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let s=e.curves[t];this.curves.push(s.clone())}return this.autoClose=e.autoClose,this}toJSON(){let e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,n=this.curves.length;t<n;t++){let s=this.curves[t];e.curves.push(s.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let s=e.curves[t];this.curves.push(new Po[s.type]().fromJSON(s))}return this}},ra=class extends Lo{constructor(e){super(),this.type="Path",this.currentPoint=new ge,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,n=e.length;t<n;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){let n=new ta(this.currentPoint.clone(),new ge(e,t));return this.curves.push(n),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,n,s){let r=new na(this.currentPoint.clone(),new ge(e,t),new ge(n,s));return this.curves.push(r),this.currentPoint.set(n,s),this}bezierCurveTo(e,t,n,s,r,a){let o=new ea(this.currentPoint.clone(),new ge(e,t),new ge(n,s),new ge(r,a));return this.curves.push(o),this.currentPoint.set(r,a),this}splineThru(e){let t=[this.currentPoint.clone()].concat(e),n=new sa(t);return this.curves.push(n),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,n,s,r,a){let o=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(e+o,t+l,n,s,r,a),this}absarc(e,t,n,s,r,a){return this.absellipse(e,t,n,n,s,r,a),this}ellipse(e,t,n,s,r,a,o,l){let c=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(e+c,t+h,n,s,r,a,o,l),this}absellipse(e,t,n,s,r,a,o,l){let c=new Js(e,t,n,s,r,a,o,l);if(this.curves.length>0){let u=c.getPoint(0);u.equals(this.currentPoint)||this.lineTo(u.x,u.y)}this.curves.push(c);let h=c.getPoint(1);return this.currentPoint.copy(h),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){let e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}},Ks=class extends ra{constructor(e){super(e),this.uuid=mi(),this.type="Shape",this.holes=[]}getPointsHoles(e){let t=[];for(let n=0,s=this.holes.length;n<s;n++)t[n]=this.holes[n].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){let s=e.holes[t];this.holes.push(s.clone())}return this}toJSON(){let e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,n=this.holes.length;t<n;t++){let s=this.holes[t];e.holes.push(s.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){let s=e.holes[t];this.holes.push(new ra().fromJSON(s))}return this}};function Em(i,e,t=2){let n=e&&e.length,s=n?e[0]*t:i.length,r=Yd(i,0,s,t,!0),a=[];if(!r||r.next===r.prev)return a;let o,l,c;if(n&&(r=Rm(i,e,r,t)),i.length>80*t){o=1/0,l=1/0;let h=-1/0,u=-1/0;for(let p=t;p<s;p+=t){let f=i[p],d=i[p+1];f<o&&(o=f),d<l&&(l=d),f>h&&(h=f),d>u&&(u=d)}c=Math.max(h-o,u-l),c=c!==0?32767/c:0}return aa(r,a,t,o,l,c,0),a}function Yd(i,e,t,n,s){let r;if(s===km(i,e,t,n)>0)for(let a=e;a<t;a+=n)r=qu(a/n|0,i[a],i[a+1],r);else for(let a=t-n;a>=e;a-=n)r=qu(a/n|0,i[a],i[a+1],r);return r&&js(r,r.next)&&(la(r),r=r.next),r}function is(i,e){if(!i)return i;e||(e=i);let t=i,n;do if(n=!1,!t.steiner&&(js(t,t.next)||Et(t.prev,t,t.next)===0)){if(la(t),t=e=t.prev,t===t.next)break;n=!0}else t=t.next;while(n||t!==e);return e}function aa(i,e,t,n,s,r,a){if(!i)return;!a&&r&&Um(i,n,s,r);let o=i;for(;i.prev!==i.next;){let l=i.prev,c=i.next;if(r?Tm(i,n,s,r):wm(i)){e.push(l.i,i.i,c.i),la(i),i=c.next,o=c.next;continue}if(i=c,i===o){a?a===1?(i=Am(is(i),e),aa(i,e,t,n,s,r,2)):a===2&&Cm(i,e,t,n,s,r):aa(is(i),e,t,n,s,r,1);break}}}function wm(i){let e=i.prev,t=i,n=i.next;if(Et(e,t,n)>=0)return!1;let s=e.x,r=t.x,a=n.x,o=e.y,l=t.y,c=n.y,h=Math.min(s,r,a),u=Math.min(o,l,c),p=Math.max(s,r,a),f=Math.max(o,l,c),d=n.next;for(;d!==e;){if(d.x>=h&&d.x<=p&&d.y>=u&&d.y<=f&&Ar(s,o,r,l,a,c,d.x,d.y)&&Et(d.prev,d,d.next)>=0)return!1;d=d.next}return!0}function Tm(i,e,t,n){let s=i.prev,r=i,a=i.next;if(Et(s,r,a)>=0)return!1;let o=s.x,l=r.x,c=a.x,h=s.y,u=r.y,p=a.y,f=Math.min(o,l,c),d=Math.min(h,u,p),y=Math.max(o,l,c),g=Math.max(h,u,p),m=Xc(f,d,e,t,n),S=Xc(y,g,e,t,n),_=i.prevZ,x=i.nextZ;for(;_&&_.z>=m&&x&&x.z<=S;){if(_.x>=f&&_.x<=y&&_.y>=d&&_.y<=g&&_!==s&&_!==a&&Ar(o,h,l,u,c,p,_.x,_.y)&&Et(_.prev,_,_.next)>=0||(_=_.prevZ,x.x>=f&&x.x<=y&&x.y>=d&&x.y<=g&&x!==s&&x!==a&&Ar(o,h,l,u,c,p,x.x,x.y)&&Et(x.prev,x,x.next)>=0))return!1;x=x.nextZ}for(;_&&_.z>=m;){if(_.x>=f&&_.x<=y&&_.y>=d&&_.y<=g&&_!==s&&_!==a&&Ar(o,h,l,u,c,p,_.x,_.y)&&Et(_.prev,_,_.next)>=0)return!1;_=_.prevZ}for(;x&&x.z<=S;){if(x.x>=f&&x.x<=y&&x.y>=d&&x.y<=g&&x!==s&&x!==a&&Ar(o,h,l,u,c,p,x.x,x.y)&&Et(x.prev,x,x.next)>=0)return!1;x=x.nextZ}return!0}function Am(i,e){let t=i;do{let n=t.prev,s=t.next.next;!js(n,s)&&Jd(n,t,t.next,s)&&oa(n,s)&&oa(s,n)&&(e.push(n.i,t.i,s.i),la(t),la(t.next),t=i=s),t=t.next}while(t!==i);return is(t)}function Cm(i,e,t,n,s,r){let a=i;do{let o=a.next.next;for(;o!==a.prev;){if(a.i!==o.i&&Om(a,o)){let l=Kd(a,o);a=is(a,a.next),l=is(l,l.next),aa(a,e,t,n,s,r,0),aa(l,e,t,n,s,r,0);return}o=o.next}a=a.next}while(a!==i)}function Rm(i,e,t,n){let s=[];for(let r=0,a=e.length;r<a;r++){let o=e[r]*n,l=r<a-1?e[r+1]*n:i.length,c=Yd(i,o,l,n,!1);c===c.next&&(c.steiner=!0),s.push(Fm(c))}s.sort(Im);for(let r=0;r<s.length;r++)t=Pm(s[r],t);return t}function Im(i,e){let t=i.x-e.x;if(t===0&&(t=i.y-e.y,t===0)){let n=(i.next.y-i.y)/(i.next.x-i.x),s=(e.next.y-e.y)/(e.next.x-e.x);t=n-s}return t}function Pm(i,e){let t=Lm(i,e);if(!t)return e;let n=Kd(t,i);return is(n,n.next),is(t,t.next)}function Lm(i,e){let t=e,n=i.x,s=i.y,r=-1/0,a;if(js(i,t))return t;do{if(js(i,t.next))return t.next;if(s<=t.y&&s>=t.next.y&&t.next.y!==t.y){let u=t.x+(s-t.y)*(t.next.x-t.x)/(t.next.y-t.y);if(u<=n&&u>r&&(r=u,a=t.x<t.next.x?t:t.next,u===n))return a}t=t.next}while(t!==e);if(!a)return null;let o=a,l=a.x,c=a.y,h=1/0;t=a;do{if(n>=t.x&&t.x>=l&&n!==t.x&&Zd(s<c?n:r,s,l,c,s<c?r:n,s,t.x,t.y)){let u=Math.abs(s-t.y)/(n-t.x);oa(t,i)&&(u<h||u===h&&(t.x>a.x||t.x===a.x&&Dm(a,t)))&&(a=t,h=u)}t=t.next}while(t!==o);return a}function Dm(i,e){return Et(i.prev,i,e.prev)<0&&Et(e.next,i,i.next)<0}function Um(i,e,t,n){let s=i;do s.z===0&&(s.z=Xc(s.x,s.y,e,t,n)),s.prevZ=s.prev,s.nextZ=s.next,s=s.next;while(s!==i);s.prevZ.nextZ=null,s.prevZ=null,Nm(s)}function Nm(i){let e,t=1;do{let n=i,s;i=null;let r=null;for(e=0;n;){e++;let a=n,o=0;for(let c=0;c<t&&(o++,a=a.nextZ,!!a);c++);let l=t;for(;o>0||l>0&&a;)o!==0&&(l===0||!a||n.z<=a.z)?(s=n,n=n.nextZ,o--):(s=a,a=a.nextZ,l--),r?r.nextZ=s:i=s,s.prevZ=r,r=s;n=a}r.nextZ=null,t*=2}while(e>1);return i}function Xc(i,e,t,n,s){return i=(i-t)*s|0,e=(e-n)*s|0,i=(i|i<<8)&16711935,i=(i|i<<4)&252645135,i=(i|i<<2)&858993459,i=(i|i<<1)&1431655765,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,i|e<<1}function Fm(i){let e=i,t=i;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==i);return t}function Zd(i,e,t,n,s,r,a,o){return(s-a)*(e-o)>=(i-a)*(r-o)&&(i-a)*(n-o)>=(t-a)*(e-o)&&(t-a)*(r-o)>=(s-a)*(n-o)}function Ar(i,e,t,n,s,r,a,o){return!(i===a&&e===o)&&Zd(i,e,t,n,s,r,a,o)}function Om(i,e){return i.next.i!==e.i&&i.prev.i!==e.i&&!Bm(i,e)&&(oa(i,e)&&oa(e,i)&&zm(i,e)&&(Et(i.prev,i,e.prev)||Et(i,e.prev,e))||js(i,e)&&Et(i.prev,i,i.next)>0&&Et(e.prev,e,e.next)>0)}function Et(i,e,t){return(e.y-i.y)*(t.x-e.x)-(e.x-i.x)*(t.y-e.y)}function js(i,e){return i.x===e.x&&i.y===e.y}function Jd(i,e,t,n){let s=fo(Et(i,e,t)),r=fo(Et(i,e,n)),a=fo(Et(t,n,i)),o=fo(Et(t,n,e));return!!(s!==r&&a!==o||s===0&&uo(i,t,e)||r===0&&uo(i,n,e)||a===0&&uo(t,i,n)||o===0&&uo(t,e,n))}function uo(i,e,t){return e.x<=Math.max(i.x,t.x)&&e.x>=Math.min(i.x,t.x)&&e.y<=Math.max(i.y,t.y)&&e.y>=Math.min(i.y,t.y)}function fo(i){return i>0?1:i<0?-1:0}function Bm(i,e){let t=i;do{if(t.i!==i.i&&t.next.i!==i.i&&t.i!==e.i&&t.next.i!==e.i&&Jd(t,t.next,i,e))return!0;t=t.next}while(t!==i);return!1}function oa(i,e){return Et(i.prev,i,i.next)<0?Et(i,e,i.next)>=0&&Et(i,i.prev,e)>=0:Et(i,e,i.prev)<0||Et(i,i.next,e)<0}function zm(i,e){let t=i,n=!1,s=(i.x+e.x)/2,r=(i.y+e.y)/2;do t.y>r!=t.next.y>r&&t.next.y!==t.y&&s<(t.next.x-t.x)*(r-t.y)/(t.next.y-t.y)+t.x&&(n=!n),t=t.next;while(t!==i);return n}function Kd(i,e){let t=$c(i.i,i.x,i.y),n=$c(e.i,e.x,e.y),s=i.next,r=e.prev;return i.next=e,e.prev=i,t.next=s,s.prev=t,n.next=t,t.prev=n,r.next=n,n.prev=r,n}function qu(i,e,t,n){let s=$c(i,e,t);return n?(s.next=n.next,s.prev=n,n.next.prev=s,n.next=s):(s.prev=s,s.next=s),s}function la(i){i.next.prev=i.prev,i.prev.next=i.next,i.prevZ&&(i.prevZ.nextZ=i.nextZ),i.nextZ&&(i.nextZ.prevZ=i.prevZ)}function $c(i,e,t){return{i,x:e,y:t,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function km(i,e,t,n){let s=0;for(let r=e,a=t-n;r<t;r+=n)s+=(i[a]-i[r])*(i[r+1]+i[a+1]),a=r;return s}var qc=class{static triangulate(e,t,n=2){return Em(e,t,n)}},ji=class i{static area(e){let t=e.length,n=0;for(let s=t-1,r=0;r<t;s=r++)n+=e[s].x*e[r].y-e[r].x*e[s].y;return n*.5}static isClockWise(e){return i.area(e)<0}static triangulateShape(e,t){let n=[],s=[],r=[];Yu(e),Zu(n,e);let a=e.length;t.forEach(Yu);for(let l=0;l<t.length;l++)s.push(a),a+=t[l].length,Zu(n,t[l]);let o=qc.triangulate(n,s);for(let l=0;l<o.length;l+=3)r.push(o.slice(l,l+3));return r}};function Yu(i){let e=i.length;e>2&&i[e-1].equals(i[0])&&i.pop()}function Zu(i,e){for(let t=0;t<e.length;t++)i.push(e[t].x),i.push(e[t].y)}var ca=class i extends Mt{constructor(e=new Ks([new ge(.5,.5),new ge(-.5,.5),new ge(-.5,-.5),new ge(.5,-.5)]),t={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:e,options:t},e=Array.isArray(e)?e:[e];let n=this,s=[],r=[];for(let o=0,l=e.length;o<l;o++){let c=e[o];a(c)}this.setAttribute("position",new nt(s,3)),this.setAttribute("uv",new nt(r,2)),this.computeVertexNormals();function a(o){let l=[],c=t.curveSegments!==void 0?t.curveSegments:12,h=t.steps!==void 0?t.steps:1,u=t.depth!==void 0?t.depth:1,p=t.bevelEnabled!==void 0?t.bevelEnabled:!0,f=t.bevelThickness!==void 0?t.bevelThickness:.2,d=t.bevelSize!==void 0?t.bevelSize:f-.1,y=t.bevelOffset!==void 0?t.bevelOffset:0,g=t.bevelSegments!==void 0?t.bevelSegments:3,m=t.extrudePath,S=t.UVGenerator!==void 0?t.UVGenerator:Hm,_,x=!1,C,w,A,R;m&&(_=m.getSpacedPoints(h),x=!0,p=!1,C=m.computeFrenetFrames(h,!1),w=new D,A=new D,R=new D),p||(g=0,f=0,d=0,y=0);let b=o.extractPoints(c),M=b.shape,I=b.holes;if(!ji.isClockWise(M)){M=M.reverse();for(let te=0,K=I.length;te<K;te++){let J=I[te];ji.isClockWise(J)&&(I[te]=J.reverse())}}function H(te){let J=10000000000000001e-36,Z=te[0];for(let de=1;de<=te.length;de++){let se=de%te.length,fe=te[se],Ge=fe.x-Z.x,He=fe.y-Z.y,T=Ge*Ge+He*He,v=Math.max(Math.abs(fe.x),Math.abs(fe.y),Math.abs(Z.x),Math.abs(Z.y)),B=J*v*v;if(T<=B){te.splice(se,1),de--;continue}Z=fe}}H(M),I.forEach(H);let W=I.length,L=M;for(let te=0;te<W;te++){let K=I[te];M=M.concat(K)}function z(te,K,J){return K||console.error("THREE.ExtrudeGeometry: vec does not exist"),te.clone().addScaledVector(K,J)}let $=M.length;function k(te,K,J){let Z,de,se,fe=te.x-K.x,Ge=te.y-K.y,He=J.x-te.x,T=J.y-te.y,v=fe*fe+Ge*Ge,B=fe*T-Ge*He;if(Math.abs(B)>Number.EPSILON){let X=Math.sqrt(v),ee=Math.sqrt(He*He+T*T),q=K.x-Ge/X,Ie=K.y+fe/X,he=J.x-T/ee,Ae=J.y+He/ee,Ce=((he-q)*T-(Ae-Ie)*He)/(fe*T-Ge*He);Z=q+fe*Ce-te.x,de=Ie+Ge*Ce-te.y;let re=Z*Z+de*de;if(re<=2)return new ge(Z,de);se=Math.sqrt(re/2)}else{let X=!1;fe>Number.EPSILON?He>Number.EPSILON&&(X=!0):fe<-Number.EPSILON?He<-Number.EPSILON&&(X=!0):Math.sign(Ge)===Math.sign(T)&&(X=!0),X?(Z=-Ge,de=fe,se=Math.sqrt(v)):(Z=fe,de=Ge,se=Math.sqrt(v/2))}return new ge(Z/se,de/se)}let ie=[];for(let te=0,K=L.length,J=K-1,Z=te+1;te<K;te++,J++,Z++)J===K&&(J=0),Z===K&&(Z=0),ie[te]=k(L[te],L[J],L[Z]);let Q=[],ce,De=ie.concat();for(let te=0,K=W;te<K;te++){let J=I[te];ce=[];for(let Z=0,de=J.length,se=de-1,fe=Z+1;Z<de;Z++,se++,fe++)se===de&&(se=0),fe===de&&(fe=0),ce[Z]=k(J[Z],J[se],J[fe]);Q.push(ce),De=De.concat(ce)}let ke;if(g===0)ke=ji.triangulateShape(L,I);else{let te=[],K=[];for(let J=0;J<g;J++){let Z=J/g,de=f*Math.cos(Z*Math.PI/2),se=d*Math.sin(Z*Math.PI/2)+y;for(let fe=0,Ge=L.length;fe<Ge;fe++){let He=z(L[fe],ie[fe],se);Le(He.x,He.y,-de),Z===0&&te.push(He)}for(let fe=0,Ge=W;fe<Ge;fe++){let He=I[fe];ce=Q[fe];let T=[];for(let v=0,B=He.length;v<B;v++){let X=z(He[v],ce[v],se);Le(X.x,X.y,-de),Z===0&&T.push(X)}Z===0&&K.push(T)}}ke=ji.triangulateShape(te,K)}let Ke=ke.length,$e=d+y;for(let te=0;te<$;te++){let K=p?z(M[te],De[te],$e):M[te];x?(A.copy(C.normals[0]).multiplyScalar(K.x),w.copy(C.binormals[0]).multiplyScalar(K.y),R.copy(_[0]).add(A).add(w),Le(R.x,R.y,R.z)):Le(K.x,K.y,0)}for(let te=1;te<=h;te++)for(let K=0;K<$;K++){let J=p?z(M[K],De[K],$e):M[K];x?(A.copy(C.normals[te]).multiplyScalar(J.x),w.copy(C.binormals[te]).multiplyScalar(J.y),R.copy(_[te]).add(A).add(w),Le(R.x,R.y,R.z)):Le(J.x,J.y,u/h*te)}for(let te=g-1;te>=0;te--){let K=te/g,J=f*Math.cos(K*Math.PI/2),Z=d*Math.sin(K*Math.PI/2)+y;for(let de=0,se=L.length;de<se;de++){let fe=z(L[de],ie[de],Z);Le(fe.x,fe.y,u+J)}for(let de=0,se=I.length;de<se;de++){let fe=I[de];ce=Q[de];for(let Ge=0,He=fe.length;Ge<He;Ge++){let T=z(fe[Ge],ce[Ge],Z);x?Le(T.x,T.y+_[h-1].y,_[h-1].x+J):Le(T.x,T.y,u+J)}}}Y(),ne();function Y(){let te=s.length/3;if(p){let K=0,J=$*K;for(let Z=0;Z<Ke;Z++){let de=ke[Z];Te(de[2]+J,de[1]+J,de[0]+J)}K=h+g*2,J=$*K;for(let Z=0;Z<Ke;Z++){let de=ke[Z];Te(de[0]+J,de[1]+J,de[2]+J)}}else{for(let K=0;K<Ke;K++){let J=ke[K];Te(J[2],J[1],J[0])}for(let K=0;K<Ke;K++){let J=ke[K];Te(J[0]+$*h,J[1]+$*h,J[2]+$*h)}}n.addGroup(te,s.length/3-te,0)}function ne(){let te=s.length/3,K=0;be(L,K),K+=L.length;for(let J=0,Z=I.length;J<Z;J++){let de=I[J];be(de,K),K+=de.length}n.addGroup(te,s.length/3-te,1)}function be(te,K){let J=te.length;for(;--J>=0;){let Z=J,de=J-1;de<0&&(de=te.length-1);for(let se=0,fe=h+g*2;se<fe;se++){let Ge=$*se,He=$*(se+1),T=K+Z+Ge,v=K+de+Ge,B=K+de+He,X=K+Z+He;et(T,v,B,X)}}}function Le(te,K,J){l.push(te),l.push(K),l.push(J)}function Te(te,K,J){pt(te),pt(K),pt(J);let Z=s.length/3,de=S.generateTopUV(n,s,Z-3,Z-2,Z-1);P(de[0]),P(de[1]),P(de[2])}function et(te,K,J,Z){pt(te),pt(K),pt(Z),pt(K),pt(J),pt(Z);let de=s.length/3,se=S.generateSideWallUV(n,s,de-6,de-3,de-2,de-1);P(se[0]),P(se[1]),P(se[3]),P(se[1]),P(se[2]),P(se[3])}function pt(te){s.push(l[te*3+0]),s.push(l[te*3+1]),s.push(l[te*3+2])}function P(te){r.push(te.x),r.push(te.y)}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON(),t=this.parameters.shapes,n=this.parameters.options;return Vm(t,n,e)}static fromJSON(e,t){let n=[];for(let r=0,a=e.shapes.length;r<a;r++){let o=t[e.shapes[r]];n.push(o)}let s=e.options.extrudePath;return s!==void 0&&(e.options.extrudePath=new Po[s.type]().fromJSON(s)),new i(n,e.options)}},Hm={generateTopUV:function(i,e,t,n,s){let r=e[t*3],a=e[t*3+1],o=e[n*3],l=e[n*3+1],c=e[s*3],h=e[s*3+1];return[new ge(r,a),new ge(o,l),new ge(c,h)]},generateSideWallUV:function(i,e,t,n,s,r){let a=e[t*3],o=e[t*3+1],l=e[t*3+2],c=e[n*3],h=e[n*3+1],u=e[n*3+2],p=e[s*3],f=e[s*3+1],d=e[s*3+2],y=e[r*3],g=e[r*3+1],m=e[r*3+2];return Math.abs(o-h)<Math.abs(a-c)?[new ge(a,1-l),new ge(c,1-u),new ge(p,1-d),new ge(y,1-m)]:[new ge(o,1-l),new ge(h,1-u),new ge(f,1-d),new ge(g,1-m)]}};function Vm(i,e,t){if(t.shapes=[],Array.isArray(i))for(let n=0,s=i.length;n<s;n++){let r=i[n];t.shapes.push(r.uuid)}else t.shapes.push(i.uuid);return t.options=Object.assign({},e),e.extrudePath!==void 0&&(t.options.extrudePath=e.extrudePath.toJSON()),t}var oi=class i extends Zs{constructor(e=1,t=0){let n=(1+Math.sqrt(5))/2,s=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],r=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(s,r,e,t),this.type="IcosahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new i(e.radius,e.detail)}};var Dn=class i extends Zs{constructor(e=1,t=0){let n=[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],s=[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2];super(n,s,e,t),this.type="OctahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new i(e.radius,e.detail)}},ha=class i extends Mt{constructor(e=1,t=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:s};let r=e/2,a=t/2,o=Math.floor(n),l=Math.floor(s),c=o+1,h=l+1,u=e/o,p=t/l,f=[],d=[],y=[],g=[];for(let m=0;m<h;m++){let S=m*p-a;for(let _=0;_<c;_++){let x=_*u-r;d.push(x,-S,0),y.push(0,0,1),g.push(_/o),g.push(1-m/l)}}for(let m=0;m<l;m++)for(let S=0;S<o;S++){let _=S+c*m,x=S+c*(m+1),C=S+1+c*(m+1),w=S+1+c*m;f.push(_,x,w),f.push(x,C,w)}this.setIndex(f),this.setAttribute("position",new nt(d,3)),this.setAttribute("normal",new nt(y,3)),this.setAttribute("uv",new nt(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.width,e.height,e.widthSegments,e.heightSegments)}};var li=class i extends Mt{constructor(e=1,t=32,n=16,s=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:s,phiLength:r,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));let l=Math.min(a+o,Math.PI),c=0,h=[],u=new D,p=new D,f=[],d=[],y=[],g=[];for(let m=0;m<=n;m++){let S=[],_=m/n,x=0;m===0&&a===0?x=.5/t:m===n&&l===Math.PI&&(x=-.5/t);for(let C=0;C<=t;C++){let w=C/t;u.x=-e*Math.cos(s+w*r)*Math.sin(a+_*o),u.y=e*Math.cos(a+_*o),u.z=e*Math.sin(s+w*r)*Math.sin(a+_*o),d.push(u.x,u.y,u.z),p.copy(u).normalize(),y.push(p.x,p.y,p.z),g.push(w+x,1-_),S.push(c++)}h.push(S)}for(let m=0;m<n;m++)for(let S=0;S<t;S++){let _=h[m][S+1],x=h[m][S],C=h[m+1][S],w=h[m+1][S+1];(m!==0||a>0)&&f.push(_,x,w),(m!==n-1||l<Math.PI)&&f.push(x,C,w)}this.setIndex(f),this.setAttribute("position",new nt(d,3)),this.setAttribute("normal",new nt(y,3)),this.setAttribute("uv",new nt(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}};var Un=class i extends Mt{constructor(e=1,t=.4,n=12,s=48,r=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:s,arc:r},n=Math.floor(n),s=Math.floor(s);let a=[],o=[],l=[],c=[],h=new D,u=new D,p=new D;for(let f=0;f<=n;f++)for(let d=0;d<=s;d++){let y=d/s*r,g=f/n*Math.PI*2;u.x=(e+t*Math.cos(g))*Math.cos(y),u.y=(e+t*Math.cos(g))*Math.sin(y),u.z=t*Math.sin(g),o.push(u.x,u.y,u.z),h.x=e*Math.cos(y),h.y=e*Math.sin(y),p.subVectors(u,h).normalize(),l.push(p.x,p.y,p.z),c.push(d/s),c.push(f/n)}for(let f=1;f<=n;f++)for(let d=1;d<=s;d++){let y=(s+1)*f+d-1,g=(s+1)*(f-1)+d-1,m=(s+1)*(f-1)+d,S=(s+1)*f+d;a.push(y,g,S),a.push(g,m,S)}this.setIndex(a),this.setAttribute("position",new nt(o,3)),this.setAttribute("normal",new nt(l,3)),this.setAttribute("uv",new nt(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}};var ss=class i extends Mt{constructor(e=new ia(new D(-1,-1,0),new D(-1,1,0),new D(1,1,0)),t=64,n=1,s=8,r=!1){super(),this.type="TubeGeometry",this.parameters={path:e,tubularSegments:t,radius:n,radialSegments:s,closed:r};let a=e.computeFrenetFrames(t,r);this.tangents=a.tangents,this.normals=a.normals,this.binormals=a.binormals;let o=new D,l=new D,c=new ge,h=new D,u=[],p=[],f=[],d=[];y(),this.setIndex(d),this.setAttribute("position",new nt(u,3)),this.setAttribute("normal",new nt(p,3)),this.setAttribute("uv",new nt(f,2));function y(){for(let _=0;_<t;_++)g(_);g(r===!1?t:0),S(),m()}function g(_){h=e.getPointAt(_/t,h);let x=a.normals[_],C=a.binormals[_];for(let w=0;w<=s;w++){let A=w/s*Math.PI*2,R=Math.sin(A),b=-Math.cos(A);l.x=b*x.x+R*C.x,l.y=b*x.y+R*C.y,l.z=b*x.z+R*C.z,l.normalize(),p.push(l.x,l.y,l.z),o.x=h.x+n*l.x,o.y=h.y+n*l.y,o.z=h.z+n*l.z,u.push(o.x,o.y,o.z)}}function m(){for(let _=1;_<=t;_++)for(let x=1;x<=s;x++){let C=(s+1)*(_-1)+(x-1),w=(s+1)*_+(x-1),A=(s+1)*_+x,R=(s+1)*(_-1)+x;d.push(C,w,R),d.push(w,A,R)}}function S(){for(let _=0;_<=t;_++)for(let x=0;x<=s;x++)c.x=_/t,c.y=x/s,f.push(c.x,c.y)}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON();return e.path=this.parameters.path.toJSON(),e}static fromJSON(e){return new i(new Po[e.path.type]().fromJSON(e.path),e.tubularSegments,e.radius,e.radialSegments,e.closed)}};var Ct=class extends Wn{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Ve(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ve(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=dh,this.normalScale=new ge(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new fn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}};var Do=class extends Wn{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Ud,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},Uo=class extends Wn{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}};var Qs=class extends Zr{constructor(e){super(),this.isLineDashedMaterial=!0,this.type="LineDashedMaterial",this.scale=1,this.dashSize=3,this.gapSize=1,this.setValues(e)}copy(e){return super.copy(e),this.scale=e.scale,this.dashSize=e.dashSize,this.gapSize=e.gapSize,this}};function po(i,e){return!i||i.constructor===e?i:typeof e.BYTES_PER_ELEMENT=="number"?new e(i):Array.prototype.slice.call(i)}function Gm(i){return ArrayBuffer.isView(i)&&!(i instanceof DataView)}function Wm(i){function e(s,r){return i[s]-i[r]}let t=i.length,n=new Array(t);for(let s=0;s!==t;++s)n[s]=s;return n.sort(e),n}function Ju(i,e,t){let n=i.length,s=new i.constructor(n);for(let r=0,a=0;a!==n;++r){let o=t[r]*e;for(let l=0;l!==e;++l)s[a++]=i[o+l]}return s}function jd(i,e,t,n){let s=1,r=i[0];for(;r!==void 0&&r[n]===void 0;)r=i[s++];if(r===void 0)return;let a=r[n];if(a!==void 0)if(Array.isArray(a))do a=r[n],a!==void 0&&(e.push(r.time),t.push(...a)),r=i[s++];while(r!==void 0);else if(a.toArray!==void 0)do a=r[n],a!==void 0&&(e.push(r.time),a.toArray(t,t.length)),r=i[s++];while(r!==void 0);else do a=r[n],a!==void 0&&(e.push(r.time),t.push(a)),r=i[s++];while(r!==void 0)}var rs=class{constructor(e,t,n,s){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,s=t[n],r=t[n-1];e:{t:{let a;n:{i:if(!(e<s)){for(let o=n+2;;){if(s===void 0){if(e<r)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===o)break;if(r=s,s=t[++n],e<s)break t}a=t.length;break n}if(!(e>=r)){let o=t[1];e<o&&(n=2,r=o);for(let l=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===l)break;if(s=r,r=t[--n-1],e>=r)break t}a=n,n=0;break n}break e}for(;n<a;){let o=n+a>>>1;e<t[o]?a=o:n=o+1}if(s=t[n],r=t[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,s)}return this.interpolate_(n,r,e,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=e*s;for(let a=0;a!==s;++a)t[a]=n[r+a];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}},No=class extends rs{constructor(e,t,n,s){super(e,t,n,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Ji,endingEnd:Ji}}intervalChanged_(e,t,n){let s=this.parameterPositions,r=e-2,a=e+1,o=s[r],l=s[a];if(o===void 0)switch(this.getSettings_().endingStart){case Ki:r=e,o=2*t-n;break;case Dr:r=s.length-2,o=t+s[r]-s[r+1];break;default:r=e,o=n}if(l===void 0)switch(this.getSettings_().endingEnd){case Ki:a=e,l=2*n-t;break;case Dr:a=1,l=n+s[1]-s[0];break;default:a=e-1,l=t}let c=(n-t)*.5,h=this.valueSize;this._weightPrev=c/(t-o),this._weightNext=c/(l-n),this._offsetPrev=r*h,this._offsetNext=a*h}interpolate_(e,t,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,h=this._offsetPrev,u=this._offsetNext,p=this._weightPrev,f=this._weightNext,d=(n-t)/(s-t),y=d*d,g=y*d,m=-p*g+2*p*y-p*d,S=(1+p)*g+(-1.5-2*p)*y+(-.5+p)*d+1,_=(-1-f)*g+(1.5+f)*y+.5*d,x=f*g-f*y;for(let C=0;C!==o;++C)r[C]=m*a[h+C]+S*a[c+C]+_*a[l+C]+x*a[u+C];return r}},ua=class extends rs{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e,t,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,h=(n-t)/(s-t),u=1-h;for(let p=0;p!==o;++p)r[p]=a[c+p]*u+a[l+p]*h;return r}},Fo=class extends rs{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e){return this.copySampleValue_(e-1)}},ln=class{constructor(e,t,n,s){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=po(t,this.TimeBufferType),this.values=po(n,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:po(e.times,Array),values:po(e.values,Array)};let s=e.getInterpolation();s!==e.DefaultInterpolation&&(n.interpolation=s)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new Fo(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new ua(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new No(this.times,this.values,this.getValueSize(),e)}setInterpolation(e){let t;switch(e){case Lr:t=this.InterpolantFactoryMethodDiscrete;break;case vo:t=this.InterpolantFactoryMethodLinear;break;case mo:t=this.InterpolantFactoryMethodSmooth;break}if(t===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Lr;case this.InterpolantFactoryMethodLinear:return vo;case this.InterpolantFactoryMethodSmooth:return mo}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,s=t.length;n!==s;++n)t[n]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,s=t.length;n!==s;++n)t[n]*=e}return this}trim(e,t){let n=this.times,s=n.length,r=0,a=s-1;for(;r!==s&&n[r]<e;)++r;for(;a!==-1&&n[a]>t;)--a;if(++a,r!==0||a!==s){r>=a&&(a=Math.max(a,1),r=a-1);let o=this.getValueSize();this.times=n.slice(r,a),this.values=this.values.slice(r*o,a*o)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),e=!1);let n=this.times,s=this.values,r=n.length;r===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),e=!1);let a=null;for(let o=0;o!==r;o++){let l=n[o];if(typeof l=="number"&&isNaN(l)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,o,l),e=!1;break}if(a!==null&&a>l){console.error("THREE.KeyframeTrack: Out of order keys.",this,o,l,a),e=!1;break}a=l}if(s!==void 0&&Gm(s))for(let o=0,l=s.length;o!==l;++o){let c=s[o];if(isNaN(c)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,o,c),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),s=this.getInterpolation()===mo,r=e.length-1,a=1;for(let o=1;o<r;++o){let l=!1,c=e[o],h=e[o+1];if(c!==h&&(o!==1||c!==e[0]))if(s)l=!0;else{let u=o*n,p=u-n,f=u+n;for(let d=0;d!==n;++d){let y=t[u+d];if(y!==t[p+d]||y!==t[f+d]){l=!0;break}}}if(l){if(o!==a){e[a]=e[o];let u=o*n,p=a*n;for(let f=0;f!==n;++f)t[p+f]=t[u+f]}++a}}if(r>0){e[a]=e[r];for(let o=r*n,l=a*n,c=0;c!==n;++c)t[l+c]=t[o+c];++a}return a!==e.length?(this.times=e.slice(0,a),this.values=t.slice(0,a*n)):(this.times=e,this.values=t),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=this.constructor,s=new n(this.name,e,t);return s.createInterpolant=this.createInterpolant,s}};ln.prototype.ValueTypeName="";ln.prototype.TimeBufferType=Float32Array;ln.prototype.ValueBufferType=Float32Array;ln.prototype.DefaultInterpolation=vo;var ci=class extends ln{constructor(e,t,n){super(e,t,n)}};ci.prototype.ValueTypeName="bool";ci.prototype.ValueBufferType=Array;ci.prototype.DefaultInterpolation=Lr;ci.prototype.InterpolantFactoryMethodLinear=void 0;ci.prototype.InterpolantFactoryMethodSmooth=void 0;var da=class extends ln{constructor(e,t,n,s){super(e,t,n,s)}};da.prototype.ValueTypeName="color";var as=class extends ln{constructor(e,t,n,s){super(e,t,n,s)}};as.prototype.ValueTypeName="number";var Oo=class extends rs{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e,t,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=(n-t)/(s-t),c=e*o;for(let h=c+o;c!==h;c+=4)Qt.slerpFlat(r,0,a,c-o,a,c,l);return r}},hi=class extends ln{constructor(e,t,n,s){super(e,t,n,s)}InterpolantFactoryMethodLinear(e){return new Oo(this.times,this.values,this.getValueSize(),e)}};hi.prototype.ValueTypeName="quaternion";hi.prototype.InterpolantFactoryMethodSmooth=void 0;var ui=class extends ln{constructor(e,t,n){super(e,t,n)}};ui.prototype.ValueTypeName="string";ui.prototype.ValueBufferType=Array;ui.prototype.DefaultInterpolation=Lr;ui.prototype.InterpolantFactoryMethodLinear=void 0;ui.prototype.InterpolantFactoryMethodSmooth=void 0;var os=class extends ln{constructor(e,t,n,s){super(e,t,n,s)}};os.prototype.ValueTypeName="vector";var Nn=class{constructor(e="",t=-1,n=[],s=Ol){this.name=e,this.tracks=n,this.duration=t,this.blendMode=s,this.uuid=mi(),this.userData={},this.duration<0&&this.resetDuration()}static parse(e){let t=[],n=e.tracks,s=1/(e.fps||1);for(let a=0,o=n.length;a!==o;++a)t.push($m(n[a]).scale(s));let r=new this(e.name,e.duration,t,e.blendMode);return r.uuid=e.uuid,r.userData=JSON.parse(e.userData||"{}"),r}static toJSON(e){let t=[],n=e.tracks,s={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode,userData:JSON.stringify(e.userData)};for(let r=0,a=n.length;r!==a;++r)t.push(ln.toJSON(n[r]));return s}static CreateFromMorphTargetSequence(e,t,n,s){let r=t.length,a=[];for(let o=0;o<r;o++){let l=[],c=[];l.push((o+r-1)%r,o,(o+1)%r),c.push(0,1,0);let h=Wm(l);l=Ju(l,1,h),c=Ju(c,1,h),!s&&l[0]===0&&(l.push(r),c.push(c[0])),a.push(new as(".morphTargetInfluences["+t[o].name+"]",l,c).scale(1/n))}return new this(e,-1,a)}static findByName(e,t){let n=e;if(!Array.isArray(e)){let s=e;n=s.geometry&&s.geometry.animations||s.animations}for(let s=0;s<n.length;s++)if(n[s].name===t)return n[s];return null}static CreateClipsFromMorphTargetSequences(e,t,n){let s={},r=/^([\w-]*?)([\d]+)$/;for(let o=0,l=e.length;o<l;o++){let c=e[o],h=c.name.match(r);if(h&&h.length>1){let u=h[1],p=s[u];p||(s[u]=p=[]),p.push(c)}}let a=[];for(let o in s)a.push(this.CreateFromMorphTargetSequence(o,s[o],t,n));return a}static parseAnimation(e,t){if(console.warn("THREE.AnimationClip: parseAnimation() is deprecated and will be removed with r185"),!e)return console.error("THREE.AnimationClip: No animation in JSONLoader data."),null;let n=function(u,p,f,d,y){if(f.length!==0){let g=[],m=[];jd(f,g,m,d),g.length!==0&&y.push(new u(p,g,m))}},s=[],r=e.name||"default",a=e.fps||30,o=e.blendMode,l=e.length||-1,c=e.hierarchy||[];for(let u=0;u<c.length;u++){let p=c[u].keys;if(!(!p||p.length===0))if(p[0].morphTargets){let f={},d;for(d=0;d<p.length;d++)if(p[d].morphTargets)for(let y=0;y<p[d].morphTargets.length;y++)f[p[d].morphTargets[y]]=-1;for(let y in f){let g=[],m=[];for(let S=0;S!==p[d].morphTargets.length;++S){let _=p[d];g.push(_.time),m.push(_.morphTarget===y?1:0)}s.push(new as(".morphTargetInfluence["+y+"]",g,m))}l=f.length*a}else{let f=".bones["+t[u].name+"]";n(os,f+".position",p,"pos",s),n(hi,f+".quaternion",p,"rot",s),n(os,f+".scale",p,"scl",s)}}return s.length===0?null:new this(r,l,s,o)}resetDuration(){let e=this.tracks,t=0;for(let n=0,s=e.length;n!==s;++n){let r=this.tracks[n];t=Math.max(t,r.times[r.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){let e=[];for(let n=0;n<this.tracks.length;n++)e.push(this.tracks[n].clone());let t=new this.constructor(this.name,this.duration,e,this.blendMode);return t.userData=JSON.parse(JSON.stringify(this.userData)),t}toJSON(){return this.constructor.toJSON(this)}};function Xm(i){switch(i.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return as;case"vector":case"vector2":case"vector3":case"vector4":return os;case"color":return da;case"quaternion":return hi;case"bool":case"boolean":return ci;case"string":return ui}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+i)}function $m(i){if(i.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");let e=Xm(i.type);if(i.times===void 0){let t=[],n=[];jd(i.keys,t,n,"value"),i.times=t,i.values=n}return e.parse!==void 0?e.parse(i):new e(i.name,i.times,i.values,i.interpolation)}var Bo=class{constructor(e,t,n){let s=this,r=!1,a=0,o=0,l,c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this.abortController=new AbortController,this.itemStart=function(h){o++,r===!1&&s.onStart!==void 0&&s.onStart(h,a,o),r=!0},this.itemEnd=function(h){a++,s.onProgress!==void 0&&s.onProgress(h,a,o),a===o&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(h){s.onError!==void 0&&s.onError(h)},this.resolveURL=function(h){return l?l(h):h},this.setURLModifier=function(h){return l=h,this},this.addHandler=function(h,u){return c.push(h,u),this},this.removeHandler=function(h){let u=c.indexOf(h);return u!==-1&&c.splice(u,2),this},this.getHandler=function(h){for(let u=0,p=c.length;u<p;u+=2){let f=c[u],d=c[u+1];if(f.global&&(f.lastIndex=0),f.test(h))return d}return null},this.abort=function(){return this.abortController.abort(),this.abortController=new AbortController,this}}},Qd=new Bo,zo=class{constructor(e){this.manager=e!==void 0?e:Qd,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){let n=this;return new Promise(function(s,r){n.load(e,s,t,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}};zo.DEFAULT_MATERIAL_NAME="__DEFAULT";var fa=class extends xt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Ve(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}},pa=class extends fa{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(xt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Ve(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}},kc=new Ye,Ku=new D,ju=new D,Yc=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new ge(512,512),this.mapType=Fn,this.map=null,this.mapPass=null,this.matrix=new Ye,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Ii,this._frameExtents=new ge(1,1),this._viewportCount=1,this._viewports=[new yt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera,n=this.matrix;Ku.setFromMatrixPosition(e.matrixWorld),t.position.copy(Ku),ju.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(ju),t.updateMatrixWorld(),kc.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(kc,t.coordinateSystem,t.reversedDepth),t.reversedDepth?n.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(kc)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}};var ma=class extends kr{constructor(e=-1,t=1,n=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2,r=n-e,a=n+e,o=s+t,l=s-t;if(this.view!==null&&this.view.enabled){let c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,a=r+c*this.view.width,o-=h*this.view.offsetY,l=o-h*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},Zc=class extends Yc{constructor(){super(new ma(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},ga=class extends fa{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(xt.DEFAULT_UP),this.updateMatrix(),this.target=new xt,this.shadow=new Zc}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}};var ko=class extends qt{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}};var Ho=class{constructor(e,t,n){this.binding=e,this.valueSize=n;let s,r,a;switch(t){case"quaternion":s=this._slerp,r=this._slerpAdditive,a=this._setAdditiveIdentityQuaternion,this.buffer=new Float64Array(n*6),this._workIndex=5;break;case"string":case"bool":s=this._select,r=this._select,a=this._setAdditiveIdentityOther,this.buffer=new Array(n*5);break;default:s=this._lerp,r=this._lerpAdditive,a=this._setAdditiveIdentityNumeric,this.buffer=new Float64Array(n*5)}this._mixBufferRegion=s,this._mixBufferRegionAdditive=r,this._setIdentity=a,this._origIndex=3,this._addIndex=4,this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,this.useCount=0,this.referenceCount=0}accumulate(e,t){let n=this.buffer,s=this.valueSize,r=e*s+s,a=this.cumulativeWeight;if(a===0){for(let o=0;o!==s;++o)n[r+o]=n[o];a=t}else{a+=t;let o=t/a;this._mixBufferRegion(n,r,0,o,s)}this.cumulativeWeight=a}accumulateAdditive(e){let t=this.buffer,n=this.valueSize,s=n*this._addIndex;this.cumulativeWeightAdditive===0&&this._setIdentity(),this._mixBufferRegionAdditive(t,s,0,e,n),this.cumulativeWeightAdditive+=e}apply(e){let t=this.valueSize,n=this.buffer,s=e*t+t,r=this.cumulativeWeight,a=this.cumulativeWeightAdditive,o=this.binding;if(this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,r<1){let l=t*this._origIndex;this._mixBufferRegion(n,s,l,1-r,t)}a>0&&this._mixBufferRegionAdditive(n,s,this._addIndex*t,1,t);for(let l=t,c=t+t;l!==c;++l)if(n[l]!==n[l+t]){o.setValue(n,s);break}}saveOriginalState(){let e=this.binding,t=this.buffer,n=this.valueSize,s=n*this._origIndex;e.getValue(t,s);for(let r=n,a=s;r!==a;++r)t[r]=t[s+r%n];this._setIdentity(),this.cumulativeWeight=0,this.cumulativeWeightAdditive=0}restoreOriginalState(){let e=this.valueSize*3;this.binding.setValue(this.buffer,e)}_setAdditiveIdentityNumeric(){let e=this._addIndex*this.valueSize,t=e+this.valueSize;for(let n=e;n<t;n++)this.buffer[n]=0}_setAdditiveIdentityQuaternion(){this._setAdditiveIdentityNumeric(),this.buffer[this._addIndex*this.valueSize+3]=1}_setAdditiveIdentityOther(){let e=this._origIndex*this.valueSize,t=this._addIndex*this.valueSize;for(let n=0;n<this.valueSize;n++)this.buffer[t+n]=this.buffer[e+n]}_select(e,t,n,s,r){if(s>=.5)for(let a=0;a!==r;++a)e[t+a]=e[n+a]}_slerp(e,t,n,s){Qt.slerpFlat(e,t,e,t,e,n,s)}_slerpAdditive(e,t,n,s,r){let a=this._workIndex*r;Qt.multiplyQuaternionsFlat(e,a,e,t,e,n),Qt.slerpFlat(e,t,e,t,e,a,s)}_lerp(e,t,n,s,r){let a=1-s;for(let o=0;o!==r;++o){let l=t+o;e[l]=e[l]*a+e[n+o]*s}}_lerpAdditive(e,t,n,s,r){for(let a=0;a!==r;++a){let o=t+a;e[o]=e[o]+e[n+a]*s}}},_h="\\[\\]\\.:\\/",qm=new RegExp("["+_h+"]","g"),vh="[^"+_h+"]",Ym="[^"+_h.replace("\\.","")+"]",Zm=/((?:WC+[\/:])*)/.source.replace("WC",vh),Jm=/(WCOD+)?/.source.replace("WCOD",Ym),Km=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",vh),jm=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",vh),Qm=new RegExp("^"+Zm+Jm+Km+jm+"$"),eg=["material","materials","bones","map"],Jc=class{constructor(e,t,n){let s=n||gt.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,s)}getValue(e,t){this.bind();let n=this._targetGroup.nCachedObjects_,s=this._bindings[n];s!==void 0&&s.getValue(e,t)}setValue(e,t){let n=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=n.length;s!==r;++s)n[s].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}},gt=class i{constructor(e,t,n){this.path=t,this.parsedPath=n||i.parseTrackName(t),this.node=i.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new i.Composite(e,t,n):new i(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(qm,"")}static parseTrackName(e){let t=Qm.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},s=n.nodeName&&n.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){let r=n.nodeName.substring(s+1);eg.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,s),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(r){for(let a=0;a<r.length;a++){let o=r[a];if(o.name===t||o.uuid===t)return o;let l=n(o.children);if(l)return l}return null},s=n(e.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)e[t++]=n[s]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node,t=this.parsedPath,n=t.objectName,s=t.propertyName,r=t.propertyIndex;if(e||(e=i.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let c=t.objectIndex;switch(n){case"materials":if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let h=0;h<e.length;h++)if(e[h].name===c){c=h;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(c!==void 0){if(e[c]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[c]}}let a=e[s];if(a===void 0){let c=t.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+c+"."+s+" but it wasn't found.",e);return}let o=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?o=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!e.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[r]!==void 0&&(r=e.morphTargetDictionary[r])}l=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=r}else a.fromArray!==void 0&&a.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(l=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=s;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};gt.Composite=Jc;gt.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};gt.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};gt.prototype.GetterByBindingType=[gt.prototype._getValue_direct,gt.prototype._getValue_array,gt.prototype._getValue_arrayElement,gt.prototype._getValue_toArray];gt.prototype.SetterByBindingTypeAndVersioning=[[gt.prototype._setValue_direct,gt.prototype._setValue_direct_setNeedsUpdate,gt.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[gt.prototype._setValue_array,gt.prototype._setValue_array_setNeedsUpdate,gt.prototype._setValue_array_setMatrixWorldNeedsUpdate],[gt.prototype._setValue_arrayElement,gt.prototype._setValue_arrayElement_setNeedsUpdate,gt.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[gt.prototype._setValue_fromArray,gt.prototype._setValue_fromArray_setNeedsUpdate,gt.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var Vo=class{constructor(e,t,n=null,s=t.blendMode){this._mixer=e,this._clip=t,this._localRoot=n,this.blendMode=s;let r=t.tracks,a=r.length,o=new Array(a),l={endingStart:Ji,endingEnd:Ji};for(let c=0;c!==a;++c){let h=r[c].createInterpolant(null);o[c]=h,h.settings=l}this._interpolantSettings=l,this._interpolants=o,this._propertyBindings=new Array(a),this._cacheIndex=null,this._byClipCacheIndex=null,this._timeScaleInterpolant=null,this._weightInterpolant=null,this.loop=Pd,this._loopCount=-1,this._startTime=null,this.time=0,this.timeScale=1,this._effectiveTimeScale=1,this.weight=1,this._effectiveWeight=1,this.repetitions=1/0,this.paused=!1,this.enabled=!0,this.clampWhenFinished=!1,this.zeroSlopeAtStart=!0,this.zeroSlopeAtEnd=!0}play(){return this._mixer._activateAction(this),this}stop(){return this._mixer._deactivateAction(this),this.reset()}reset(){return this.paused=!1,this.enabled=!0,this.time=0,this._loopCount=-1,this._startTime=null,this.stopFading().stopWarping()}isRunning(){return this.enabled&&!this.paused&&this.timeScale!==0&&this._startTime===null&&this._mixer._isActiveAction(this)}isScheduled(){return this._mixer._isActiveAction(this)}startAt(e){return this._startTime=e,this}setLoop(e,t){return this.loop=e,this.repetitions=t,this}setEffectiveWeight(e){return this.weight=e,this._effectiveWeight=this.enabled?e:0,this.stopFading()}getEffectiveWeight(){return this._effectiveWeight}fadeIn(e){return this._scheduleFading(e,0,1)}fadeOut(e){return this._scheduleFading(e,1,0)}crossFadeFrom(e,t,n=!1){if(e.fadeOut(t),this.fadeIn(t),n===!0){let s=this._clip.duration,r=e._clip.duration,a=r/s,o=s/r;e.warp(1,a,t),this.warp(o,1,t)}return this}crossFadeTo(e,t,n=!1){return e.crossFadeFrom(this,t,n)}stopFading(){let e=this._weightInterpolant;return e!==null&&(this._weightInterpolant=null,this._mixer._takeBackControlInterpolant(e)),this}setEffectiveTimeScale(e){return this.timeScale=e,this._effectiveTimeScale=this.paused?0:e,this.stopWarping()}getEffectiveTimeScale(){return this._effectiveTimeScale}setDuration(e){return this.timeScale=this._clip.duration/e,this.stopWarping()}syncWith(e){return this.time=e.time,this.timeScale=e.timeScale,this.stopWarping()}halt(e){return this.warp(this._effectiveTimeScale,0,e)}warp(e,t,n){let s=this._mixer,r=s.time,a=this.timeScale,o=this._timeScaleInterpolant;o===null&&(o=s._lendControlInterpolant(),this._timeScaleInterpolant=o);let l=o.parameterPositions,c=o.sampleValues;return l[0]=r,l[1]=r+n,c[0]=e/a,c[1]=t/a,this}stopWarping(){let e=this._timeScaleInterpolant;return e!==null&&(this._timeScaleInterpolant=null,this._mixer._takeBackControlInterpolant(e)),this}getMixer(){return this._mixer}getClip(){return this._clip}getRoot(){return this._localRoot||this._mixer._root}_update(e,t,n,s){if(!this.enabled){this._updateWeight(e);return}let r=this._startTime;if(r!==null){let l=(e-r)*n;l<0||n===0?t=0:(this._startTime=null,t=n*l)}t*=this._updateTimeScale(e);let a=this._updateTime(t),o=this._updateWeight(e);if(o>0){let l=this._interpolants,c=this._propertyBindings;switch(this.blendMode){case Dd:for(let h=0,u=l.length;h!==u;++h)l[h].evaluate(a),c[h].accumulateAdditive(o);break;case Ol:default:for(let h=0,u=l.length;h!==u;++h)l[h].evaluate(a),c[h].accumulate(s,o)}}}_updateWeight(e){let t=0;if(this.enabled){t=this.weight;let n=this._weightInterpolant;if(n!==null){let s=n.evaluate(e)[0];t*=s,e>n.parameterPositions[1]&&(this.stopFading(),s===0&&(this.enabled=!1))}}return this._effectiveWeight=t,t}_updateTimeScale(e){let t=0;if(!this.paused){t=this.timeScale;let n=this._timeScaleInterpolant;if(n!==null){let s=n.evaluate(e)[0];t*=s,e>n.parameterPositions[1]&&(this.stopWarping(),t===0?this.paused=!0:this.timeScale=t)}}return this._effectiveTimeScale=t,t}_updateTime(e){let t=this._clip.duration,n=this.loop,s=this.time+e,r=this._loopCount,a=n===Ld;if(e===0)return r===-1?s:a&&(r&1)===1?t-s:s;if(n===Fl){r===-1&&(this._loopCount=0,this._setEndings(!0,!0,!1));e:{if(s>=t)s=t;else if(s<0)s=0;else{this.time=s;break e}this.clampWhenFinished?this.paused=!0:this.enabled=!1,this.time=s,this._mixer.dispatchEvent({type:"finished",action:this,direction:e<0?-1:1})}}else{if(r===-1&&(e>=0?(r=0,this._setEndings(!0,this.repetitions===0,a)):this._setEndings(this.repetitions===0,!0,a)),s>=t||s<0){let o=Math.floor(s/t);s-=t*o,r+=Math.abs(o);let l=this.repetitions-r;if(l<=0)this.clampWhenFinished?this.paused=!0:this.enabled=!1,s=e>0?t:0,this.time=s,this._mixer.dispatchEvent({type:"finished",action:this,direction:e>0?1:-1});else{if(l===1){let c=e<0;this._setEndings(c,!c,a)}else this._setEndings(!1,!1,a);this._loopCount=r,this.time=s,this._mixer.dispatchEvent({type:"loop",action:this,loopDelta:o})}}else this.time=s;if(a&&(r&1)===1)return t-s}return s}_setEndings(e,t,n){let s=this._interpolantSettings;n?(s.endingStart=Ki,s.endingEnd=Ki):(e?s.endingStart=this.zeroSlopeAtStart?Ki:Ji:s.endingStart=Dr,t?s.endingEnd=this.zeroSlopeAtEnd?Ki:Ji:s.endingEnd=Dr)}_scheduleFading(e,t,n){let s=this._mixer,r=s.time,a=this._weightInterpolant;a===null&&(a=s._lendControlInterpolant(),this._weightInterpolant=a);let o=a.parameterPositions,l=a.sampleValues;return o[0]=r,l[0]=t,o[1]=r+e,l[1]=n,this}},tg=new Float32Array(1),ya=class extends Hn{constructor(e){super(),this._root=e,this._initMemoryManager(),this._accuIndex=0,this.time=0,this.timeScale=1}_bindAction(e,t){let n=e._localRoot||this._root,s=e._clip.tracks,r=s.length,a=e._propertyBindings,o=e._interpolants,l=n.uuid,c=this._bindingsByRootAndName,h=c[l];h===void 0&&(h={},c[l]=h);for(let u=0;u!==r;++u){let p=s[u],f=p.name,d=h[f];if(d!==void 0)++d.referenceCount,a[u]=d;else{if(d=a[u],d!==void 0){d._cacheIndex===null&&(++d.referenceCount,this._addInactiveBinding(d,l,f));continue}let y=t&&t._propertyBindings[u].binding.parsedPath;d=new Ho(gt.create(n,f,y),p.ValueTypeName,p.getValueSize()),++d.referenceCount,this._addInactiveBinding(d,l,f),a[u]=d}o[u].resultBuffer=d.buffer}}_activateAction(e){if(!this._isActiveAction(e)){if(e._cacheIndex===null){let n=(e._localRoot||this._root).uuid,s=e._clip.uuid,r=this._actionsByClip[s];this._bindAction(e,r&&r.knownActions[0]),this._addInactiveAction(e,s,n)}let t=e._propertyBindings;for(let n=0,s=t.length;n!==s;++n){let r=t[n];r.useCount++===0&&(this._lendBinding(r),r.saveOriginalState())}this._lendAction(e)}}_deactivateAction(e){if(this._isActiveAction(e)){let t=e._propertyBindings;for(let n=0,s=t.length;n!==s;++n){let r=t[n];--r.useCount===0&&(r.restoreOriginalState(),this._takeBackBinding(r))}this._takeBackAction(e)}}_initMemoryManager(){this._actions=[],this._nActiveActions=0,this._actionsByClip={},this._bindings=[],this._nActiveBindings=0,this._bindingsByRootAndName={},this._controlInterpolants=[],this._nActiveControlInterpolants=0;let e=this;this.stats={actions:{get total(){return e._actions.length},get inUse(){return e._nActiveActions}},bindings:{get total(){return e._bindings.length},get inUse(){return e._nActiveBindings}},controlInterpolants:{get total(){return e._controlInterpolants.length},get inUse(){return e._nActiveControlInterpolants}}}}_isActiveAction(e){let t=e._cacheIndex;return t!==null&&t<this._nActiveActions}_addInactiveAction(e,t,n){let s=this._actions,r=this._actionsByClip,a=r[t];if(a===void 0)a={knownActions:[e],actionByRoot:{}},e._byClipCacheIndex=0,r[t]=a;else{let o=a.knownActions;e._byClipCacheIndex=o.length,o.push(e)}e._cacheIndex=s.length,s.push(e),a.actionByRoot[n]=e}_removeInactiveAction(e){let t=this._actions,n=t[t.length-1],s=e._cacheIndex;n._cacheIndex=s,t[s]=n,t.pop(),e._cacheIndex=null;let r=e._clip.uuid,a=this._actionsByClip,o=a[r],l=o.knownActions,c=l[l.length-1],h=e._byClipCacheIndex;c._byClipCacheIndex=h,l[h]=c,l.pop(),e._byClipCacheIndex=null;let u=o.actionByRoot,p=(e._localRoot||this._root).uuid;delete u[p],l.length===0&&delete a[r],this._removeInactiveBindingsForAction(e)}_removeInactiveBindingsForAction(e){let t=e._propertyBindings;for(let n=0,s=t.length;n!==s;++n){let r=t[n];--r.referenceCount===0&&this._removeInactiveBinding(r)}}_lendAction(e){let t=this._actions,n=e._cacheIndex,s=this._nActiveActions++,r=t[s];e._cacheIndex=s,t[s]=e,r._cacheIndex=n,t[n]=r}_takeBackAction(e){let t=this._actions,n=e._cacheIndex,s=--this._nActiveActions,r=t[s];e._cacheIndex=s,t[s]=e,r._cacheIndex=n,t[n]=r}_addInactiveBinding(e,t,n){let s=this._bindingsByRootAndName,r=this._bindings,a=s[t];a===void 0&&(a={},s[t]=a),a[n]=e,e._cacheIndex=r.length,r.push(e)}_removeInactiveBinding(e){let t=this._bindings,n=e.binding,s=n.rootNode.uuid,r=n.path,a=this._bindingsByRootAndName,o=a[s],l=t[t.length-1],c=e._cacheIndex;l._cacheIndex=c,t[c]=l,t.pop(),delete o[r],Object.keys(o).length===0&&delete a[s]}_lendBinding(e){let t=this._bindings,n=e._cacheIndex,s=this._nActiveBindings++,r=t[s];e._cacheIndex=s,t[s]=e,r._cacheIndex=n,t[n]=r}_takeBackBinding(e){let t=this._bindings,n=e._cacheIndex,s=--this._nActiveBindings,r=t[s];e._cacheIndex=s,t[s]=e,r._cacheIndex=n,t[n]=r}_lendControlInterpolant(){let e=this._controlInterpolants,t=this._nActiveControlInterpolants++,n=e[t];return n===void 0&&(n=new ua(new Float32Array(2),new Float32Array(2),1,tg),n.__cacheIndex=t,e[t]=n),n}_takeBackControlInterpolant(e){let t=this._controlInterpolants,n=e.__cacheIndex,s=--this._nActiveControlInterpolants,r=t[s];e.__cacheIndex=s,t[s]=e,r.__cacheIndex=n,t[n]=r}clipAction(e,t,n){let s=t||this._root,r=s.uuid,a=typeof e=="string"?Nn.findByName(s,e):e,o=a!==null?a.uuid:e,l=this._actionsByClip[o],c=null;if(n===void 0&&(a!==null?n=a.blendMode:n=Ol),l!==void 0){let u=l.actionByRoot[r];if(u!==void 0&&u.blendMode===n)return u;c=l.knownActions[0],a===null&&(a=c._clip)}if(a===null)return null;let h=new Vo(this,a,t,n);return this._bindAction(h,c),this._addInactiveAction(h,o,r),h}existingAction(e,t){let n=t||this._root,s=n.uuid,r=typeof e=="string"?Nn.findByName(n,e):e,a=r?r.uuid:e,o=this._actionsByClip[a];return o!==void 0&&o.actionByRoot[s]||null}stopAllAction(){let e=this._actions,t=this._nActiveActions;for(let n=t-1;n>=0;--n)e[n].stop();return this}update(e){e*=this.timeScale;let t=this._actions,n=this._nActiveActions,s=this.time+=e,r=Math.sign(e),a=this._accuIndex^=1;for(let c=0;c!==n;++c)t[c]._update(s,e,r,a);let o=this._bindings,l=this._nActiveBindings;for(let c=0;c!==l;++c)o[c].apply(a);return this}setTime(e){this.time=0;for(let t=0;t<this._actions.length;t++)this._actions[t].time=0;return this.update(e)}getRoot(){return this._root}uncacheClip(e){let t=this._actions,n=e.uuid,s=this._actionsByClip,r=s[n];if(r!==void 0){let a=r.knownActions;for(let o=0,l=a.length;o!==l;++o){let c=a[o];this._deactivateAction(c);let h=c._cacheIndex,u=t[t.length-1];c._cacheIndex=null,c._byClipCacheIndex=null,u._cacheIndex=h,t[h]=u,t.pop(),this._removeInactiveBindingsForAction(c)}delete s[n]}}uncacheRoot(e){let t=e.uuid,n=this._actionsByClip;for(let a in n){let o=n[a].actionByRoot,l=o[t];l!==void 0&&(this._deactivateAction(l),this._removeInactiveAction(l))}let s=this._bindingsByRootAndName,r=s[t];if(r!==void 0)for(let a in r){let o=r[a];o.restoreOriginalState(),this._removeInactiveBinding(o)}}uncacheAction(e,t){let n=this.existingAction(e,t);n!==null&&(this._deactivateAction(n),this._removeInactiveAction(n))}};var Qu=new Ye,ls=class{constructor(e,t,n=0,s=1/0){this.ray=new Gn(e,t),this.near=n,this.far=s,this.camera=null,this.layers=new Xs,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):console.error("THREE.Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return Qu.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Qu),this}intersectObject(e,t=!0,n=[]){return Kc(e,this,n,t),n.sort(ed),n}intersectObjects(e,t=!0,n=[]){for(let s=0,r=e.length;s<r;s++)Kc(e[s],this,n,t);return n.sort(ed),n}};function ed(i,e){return i.distance-e.distance}function Kc(i,e,t,n){let s=!0;if(i.layers.test(e.layers)&&i.raycast(e,t)===!1&&(s=!1),s===!0&&n===!0){let r=i.children;for(let a=0,o=r.length;a<o;a++)Kc(r[a],e,t,!0)}}function Mh(i,e,t,n){let s=ng(n);switch(t){case ch:return i*e;case sl:return i*e/s.components*s.byteLength;case rl:return i*e/s.components*s.byteLength;case uh:return i*e*2/s.components*s.byteLength;case al:return i*e*2/s.components*s.byteLength;case hh:return i*e*3/s.components*s.byteLength;case xn:return i*e*4/s.components*s.byteLength;case ol:return i*e*4/s.components*s.byteLength;case va:case Ma:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case Sa:case ba:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case cl:case ul:return Math.max(i,16)*Math.max(e,8)/4;case ll:case hl:return Math.max(i,8)*Math.max(e,8)/2;case dl:case fl:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case pl:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case ml:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case gl:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case yl:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case xl:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case _l:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case vl:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case Ml:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case Sl:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case bl:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case El:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case wl:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case Tl:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case Al:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case Cl:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case Rl:case Il:case Pl:return Math.ceil(i/4)*Math.ceil(e/4)*16;case Ll:case Dl:return Math.ceil(i/4)*Math.ceil(e/4)*8;case Ul:case Nl:return Math.ceil(i/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function ng(i){switch(i){case Fn:case rh:return{byteLength:1,components:1};case er:case ah:case tr:return{byteLength:2,components:1};case nl:case il:return{byteLength:2,components:4};case Di:case tl:case En:return{byteLength:4,components:1};case oh:case lh:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"180"}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="180");function Ef(){let i=null,e=!1,t=null,n=null;function s(r,a){t(r,a),n=i.requestAnimationFrame(s)}return{start:function(){e!==!0&&t!==null&&(n=i.requestAnimationFrame(s),e=!0)},stop:function(){i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){i=r}}}function sg(i){let e=new WeakMap;function t(o,l){let c=o.array,h=o.usage,u=c.byteLength,p=i.createBuffer();i.bindBuffer(l,p),i.bufferData(l,c,h),o.onUploadCallback();let f;if(c instanceof Float32Array)f=i.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)f=i.HALF_FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?f=i.HALF_FLOAT:f=i.UNSIGNED_SHORT;else if(c instanceof Int16Array)f=i.SHORT;else if(c instanceof Uint32Array)f=i.UNSIGNED_INT;else if(c instanceof Int32Array)f=i.INT;else if(c instanceof Int8Array)f=i.BYTE;else if(c instanceof Uint8Array)f=i.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)f=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:p,type:f,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:u}}function n(o,l,c){let h=l.array,u=l.updateRanges;if(i.bindBuffer(c,o),u.length===0)i.bufferSubData(c,0,h);else{u.sort((f,d)=>f.start-d.start);let p=0;for(let f=1;f<u.length;f++){let d=u[p],y=u[f];y.start<=d.start+d.count+1?d.count=Math.max(d.count,y.start+y.count-d.start):(++p,u[p]=y)}u.length=p+1;for(let f=0,d=u.length;f<d;f++){let y=u[f];i.bufferSubData(c,y.start*h.BYTES_PER_ELEMENT,h,y.start,y.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);let l=e.get(o);l&&(i.deleteBuffer(l.buffer),e.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){let h=e.get(o);(!h||h.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}let c=e.get(o);if(c===void 0)e.set(o,t(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,o,l),c.version=o.version}}return{get:s,remove:r,update:a}}var rg=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,ag=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,og=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,lg=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,cg=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,hg=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,ug=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,dg=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,fg=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,pg=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,mg=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,gg=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,yg=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,xg=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,_g=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,vg=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,Mg=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Sg=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,bg=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Eg=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,wg=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Tg=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,Ag=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,Cg=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,Rg=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,Ig=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,Pg=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Lg=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Dg=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Ug=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Ng="gl_FragColor = linearToOutputTexel( gl_FragColor );",Fg=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Og=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,Bg=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,zg=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,kg=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Hg=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,Vg=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Gg=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Wg=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Xg=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,$g=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,qg=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Yg=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Zg=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Jg=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,Kg=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,jg=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Qg=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,e0=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,t0=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,n0=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,i0=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,s0=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,r0=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,a0=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,o0=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,l0=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,c0=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,h0=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,u0=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,d0=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,f0=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,p0=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,m0=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,g0=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,y0=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,x0=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,_0=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,v0=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,M0=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,S0=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,b0=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,E0=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,w0=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,T0=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,A0=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,C0=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,R0=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,I0=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,P0=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,L0=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,D0=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,U0=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,N0=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,F0=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,O0=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,B0=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,z0=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,k0=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		float depth = unpackRGBAToDepth( texture2D( depths, uv ) );
		#ifdef USE_REVERSED_DEPTH_BUFFER
			return step( depth, compare );
		#else
			return step( compare, depth );
		#endif
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow( sampler2D shadow, vec2 uv, float compare ) {
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		#ifdef USE_REVERSED_DEPTH_BUFFER
			float hard_shadow = step( distribution.x, compare );
		#else
			float hard_shadow = step( compare, distribution.x );
		#endif
		if ( hard_shadow != 1.0 ) {
			float distance = compare - distribution.x;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,H0=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,V0=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,G0=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,W0=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,X0=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,$0=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,q0=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,Y0=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Z0=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,J0=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,K0=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,j0=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,Q0=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,ey=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,ty=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,ny=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,iy=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,sy=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,ry=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,ay=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,oy=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,ly=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,cy=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,hy=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,uy=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,dy=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,fy=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,py=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,my=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,gy=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,yy=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,xy=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,_y=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,vy=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,My=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Sy=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,by=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Ey=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,wy=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,Ty=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Ay=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Cy=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,Ry=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Iy=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Py=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Ly=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,Dy=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Uy=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Ny=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Fy=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Oy=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Ze={alphahash_fragment:rg,alphahash_pars_fragment:ag,alphamap_fragment:og,alphamap_pars_fragment:lg,alphatest_fragment:cg,alphatest_pars_fragment:hg,aomap_fragment:ug,aomap_pars_fragment:dg,batching_pars_vertex:fg,batching_vertex:pg,begin_vertex:mg,beginnormal_vertex:gg,bsdfs:yg,iridescence_fragment:xg,bumpmap_pars_fragment:_g,clipping_planes_fragment:vg,clipping_planes_pars_fragment:Mg,clipping_planes_pars_vertex:Sg,clipping_planes_vertex:bg,color_fragment:Eg,color_pars_fragment:wg,color_pars_vertex:Tg,color_vertex:Ag,common:Cg,cube_uv_reflection_fragment:Rg,defaultnormal_vertex:Ig,displacementmap_pars_vertex:Pg,displacementmap_vertex:Lg,emissivemap_fragment:Dg,emissivemap_pars_fragment:Ug,colorspace_fragment:Ng,colorspace_pars_fragment:Fg,envmap_fragment:Og,envmap_common_pars_fragment:Bg,envmap_pars_fragment:zg,envmap_pars_vertex:kg,envmap_physical_pars_fragment:Kg,envmap_vertex:Hg,fog_vertex:Vg,fog_pars_vertex:Gg,fog_fragment:Wg,fog_pars_fragment:Xg,gradientmap_pars_fragment:$g,lightmap_pars_fragment:qg,lights_lambert_fragment:Yg,lights_lambert_pars_fragment:Zg,lights_pars_begin:Jg,lights_toon_fragment:jg,lights_toon_pars_fragment:Qg,lights_phong_fragment:e0,lights_phong_pars_fragment:t0,lights_physical_fragment:n0,lights_physical_pars_fragment:i0,lights_fragment_begin:s0,lights_fragment_maps:r0,lights_fragment_end:a0,logdepthbuf_fragment:o0,logdepthbuf_pars_fragment:l0,logdepthbuf_pars_vertex:c0,logdepthbuf_vertex:h0,map_fragment:u0,map_pars_fragment:d0,map_particle_fragment:f0,map_particle_pars_fragment:p0,metalnessmap_fragment:m0,metalnessmap_pars_fragment:g0,morphinstance_vertex:y0,morphcolor_vertex:x0,morphnormal_vertex:_0,morphtarget_pars_vertex:v0,morphtarget_vertex:M0,normal_fragment_begin:S0,normal_fragment_maps:b0,normal_pars_fragment:E0,normal_pars_vertex:w0,normal_vertex:T0,normalmap_pars_fragment:A0,clearcoat_normal_fragment_begin:C0,clearcoat_normal_fragment_maps:R0,clearcoat_pars_fragment:I0,iridescence_pars_fragment:P0,opaque_fragment:L0,packing:D0,premultiplied_alpha_fragment:U0,project_vertex:N0,dithering_fragment:F0,dithering_pars_fragment:O0,roughnessmap_fragment:B0,roughnessmap_pars_fragment:z0,shadowmap_pars_fragment:k0,shadowmap_pars_vertex:H0,shadowmap_vertex:V0,shadowmask_pars_fragment:G0,skinbase_vertex:W0,skinning_pars_vertex:X0,skinning_vertex:$0,skinnormal_vertex:q0,specularmap_fragment:Y0,specularmap_pars_fragment:Z0,tonemapping_fragment:J0,tonemapping_pars_fragment:K0,transmission_fragment:j0,transmission_pars_fragment:Q0,uv_pars_fragment:ey,uv_pars_vertex:ty,uv_vertex:ny,worldpos_vertex:iy,background_vert:sy,background_frag:ry,backgroundCube_vert:ay,backgroundCube_frag:oy,cube_vert:ly,cube_frag:cy,depth_vert:hy,depth_frag:uy,distanceRGBA_vert:dy,distanceRGBA_frag:fy,equirect_vert:py,equirect_frag:my,linedashed_vert:gy,linedashed_frag:yy,meshbasic_vert:xy,meshbasic_frag:_y,meshlambert_vert:vy,meshlambert_frag:My,meshmatcap_vert:Sy,meshmatcap_frag:by,meshnormal_vert:Ey,meshnormal_frag:wy,meshphong_vert:Ty,meshphong_frag:Ay,meshphysical_vert:Cy,meshphysical_frag:Ry,meshtoon_vert:Iy,meshtoon_frag:Py,points_vert:Ly,points_frag:Dy,shadow_vert:Uy,shadow_frag:Ny,sprite_vert:Fy,sprite_frag:Oy},ye={common:{diffuse:{value:new Ve(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Xe},alphaMap:{value:null},alphaMapTransform:{value:new Xe},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Xe}},envmap:{envMap:{value:null},envMapRotation:{value:new Xe},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Xe}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Xe}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Xe},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Xe},normalScale:{value:new ge(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Xe},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Xe}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Xe}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Xe}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ve(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Ve(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Xe},alphaTest:{value:0},uvTransform:{value:new Xe}},sprite:{diffuse:{value:new Ve(16777215)},opacity:{value:1},center:{value:new ge(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Xe},alphaMap:{value:null},alphaMapTransform:{value:new Xe},alphaTest:{value:0}}},qn={basic:{uniforms:Yt([ye.common,ye.specularmap,ye.envmap,ye.aomap,ye.lightmap,ye.fog]),vertexShader:Ze.meshbasic_vert,fragmentShader:Ze.meshbasic_frag},lambert:{uniforms:Yt([ye.common,ye.specularmap,ye.envmap,ye.aomap,ye.lightmap,ye.emissivemap,ye.bumpmap,ye.normalmap,ye.displacementmap,ye.fog,ye.lights,{emissive:{value:new Ve(0)}}]),vertexShader:Ze.meshlambert_vert,fragmentShader:Ze.meshlambert_frag},phong:{uniforms:Yt([ye.common,ye.specularmap,ye.envmap,ye.aomap,ye.lightmap,ye.emissivemap,ye.bumpmap,ye.normalmap,ye.displacementmap,ye.fog,ye.lights,{emissive:{value:new Ve(0)},specular:{value:new Ve(1118481)},shininess:{value:30}}]),vertexShader:Ze.meshphong_vert,fragmentShader:Ze.meshphong_frag},standard:{uniforms:Yt([ye.common,ye.envmap,ye.aomap,ye.lightmap,ye.emissivemap,ye.bumpmap,ye.normalmap,ye.displacementmap,ye.roughnessmap,ye.metalnessmap,ye.fog,ye.lights,{emissive:{value:new Ve(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ze.meshphysical_vert,fragmentShader:Ze.meshphysical_frag},toon:{uniforms:Yt([ye.common,ye.aomap,ye.lightmap,ye.emissivemap,ye.bumpmap,ye.normalmap,ye.displacementmap,ye.gradientmap,ye.fog,ye.lights,{emissive:{value:new Ve(0)}}]),vertexShader:Ze.meshtoon_vert,fragmentShader:Ze.meshtoon_frag},matcap:{uniforms:Yt([ye.common,ye.bumpmap,ye.normalmap,ye.displacementmap,ye.fog,{matcap:{value:null}}]),vertexShader:Ze.meshmatcap_vert,fragmentShader:Ze.meshmatcap_frag},points:{uniforms:Yt([ye.points,ye.fog]),vertexShader:Ze.points_vert,fragmentShader:Ze.points_frag},dashed:{uniforms:Yt([ye.common,ye.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ze.linedashed_vert,fragmentShader:Ze.linedashed_frag},depth:{uniforms:Yt([ye.common,ye.displacementmap]),vertexShader:Ze.depth_vert,fragmentShader:Ze.depth_frag},normal:{uniforms:Yt([ye.common,ye.bumpmap,ye.normalmap,ye.displacementmap,{opacity:{value:1}}]),vertexShader:Ze.meshnormal_vert,fragmentShader:Ze.meshnormal_frag},sprite:{uniforms:Yt([ye.sprite,ye.fog]),vertexShader:Ze.sprite_vert,fragmentShader:Ze.sprite_frag},background:{uniforms:{uvTransform:{value:new Xe},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ze.background_vert,fragmentShader:Ze.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Xe}},vertexShader:Ze.backgroundCube_vert,fragmentShader:Ze.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ze.cube_vert,fragmentShader:Ze.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ze.equirect_vert,fragmentShader:Ze.equirect_frag},distanceRGBA:{uniforms:Yt([ye.common,ye.displacementmap,{referencePosition:{value:new D},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ze.distanceRGBA_vert,fragmentShader:Ze.distanceRGBA_frag},shadow:{uniforms:Yt([ye.lights,ye.fog,{color:{value:new Ve(0)},opacity:{value:1}}]),vertexShader:Ze.shadow_vert,fragmentShader:Ze.shadow_frag}};qn.physical={uniforms:Yt([qn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Xe},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Xe},clearcoatNormalScale:{value:new ge(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Xe},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Xe},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Xe},sheen:{value:0},sheenColor:{value:new Ve(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Xe},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Xe},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Xe},transmissionSamplerSize:{value:new ge},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Xe},attenuationDistance:{value:0},attenuationColor:{value:new Ve(0)},specularColor:{value:new Ve(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Xe},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Xe},anisotropyVector:{value:new ge},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Xe}}]),vertexShader:Ze.meshphysical_vert,fragmentShader:Ze.meshphysical_frag};var Bl={r:0,b:0,g:0},fs=new fn,By=new Ye;function zy(i,e,t,n,s,r,a){let o=new Ve(0),l=r===!0?0:1,c,h,u=null,p=0,f=null;function d(_){let x=_.isScene===!0?_.background:null;return x&&x.isTexture&&(x=(_.backgroundBlurriness>0?t:e).get(x)),x}function y(_){let x=!1,C=d(_);C===null?m(o,l):C&&C.isColor&&(m(C,1),x=!0);let w=i.xr.getEnvironmentBlendMode();w==="additive"?n.buffers.color.setClear(0,0,0,1,a):w==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,a),(i.autoClear||x)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function g(_,x){let C=d(x);C&&(C.isCubeTexture||C.mapping===xa)?(h===void 0&&(h=new dt(new Lt(1,1,1),new mn({name:"BackgroundCubeMaterial",uniforms:ds(qn.backgroundCube.uniforms),vertexShader:qn.backgroundCube.vertexShader,fragmentShader:qn.backgroundCube.fragmentShader,side:Vt,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(w,A,R){this.matrixWorld.copyPosition(R.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(h)),fs.copy(x.backgroundRotation),fs.x*=-1,fs.y*=-1,fs.z*=-1,C.isCubeTexture&&C.isRenderTargetTexture===!1&&(fs.y*=-1,fs.z*=-1),h.material.uniforms.envMap.value=C,h.material.uniforms.flipEnvMap.value=C.isCubeTexture&&C.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=x.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=x.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(By.makeRotationFromEuler(fs)),h.material.toneMapped=st.getTransfer(C.colorSpace)!==ot,(u!==C||p!==C.version||f!==i.toneMapping)&&(h.material.needsUpdate=!0,u=C,p=C.version,f=i.toneMapping),h.layers.enableAll(),_.unshift(h,h.geometry,h.material,0,0,null)):C&&C.isTexture&&(c===void 0&&(c=new dt(new ha(2,2),new mn({name:"BackgroundMaterial",uniforms:ds(qn.background.uniforms),vertexShader:qn.background.vertexShader,fragmentShader:qn.background.fragmentShader,side:ri,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(c)),c.material.uniforms.t2D.value=C,c.material.uniforms.backgroundIntensity.value=x.backgroundIntensity,c.material.toneMapped=st.getTransfer(C.colorSpace)!==ot,C.matrixAutoUpdate===!0&&C.updateMatrix(),c.material.uniforms.uvTransform.value.copy(C.matrix),(u!==C||p!==C.version||f!==i.toneMapping)&&(c.material.needsUpdate=!0,u=C,p=C.version,f=i.toneMapping),c.layers.enableAll(),_.unshift(c,c.geometry,c.material,0,0,null))}function m(_,x){_.getRGB(Bl,yh(i)),n.buffers.color.setClear(Bl.r,Bl.g,Bl.b,x,a)}function S(){h!==void 0&&(h.geometry.dispose(),h.material.dispose(),h=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return o},setClearColor:function(_,x=1){o.set(_),l=x,m(o,l)},getClearAlpha:function(){return l},setClearAlpha:function(_){l=_,m(o,l)},render:y,addToRenderList:g,dispose:S}}function ky(i,e){let t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=p(null),r=s,a=!1;function o(M,I,N,H,W){let L=!1,z=u(H,N,I);r!==z&&(r=z,c(r.object)),L=f(M,H,N,W),L&&d(M,H,N,W),W!==null&&e.update(W,i.ELEMENT_ARRAY_BUFFER),(L||a)&&(a=!1,x(M,I,N,H),W!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(W).buffer))}function l(){return i.createVertexArray()}function c(M){return i.bindVertexArray(M)}function h(M){return i.deleteVertexArray(M)}function u(M,I,N){let H=N.wireframe===!0,W=n[M.id];W===void 0&&(W={},n[M.id]=W);let L=W[I.id];L===void 0&&(L={},W[I.id]=L);let z=L[H];return z===void 0&&(z=p(l()),L[H]=z),z}function p(M){let I=[],N=[],H=[];for(let W=0;W<t;W++)I[W]=0,N[W]=0,H[W]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:I,enabledAttributes:N,attributeDivisors:H,object:M,attributes:{},index:null}}function f(M,I,N,H){let W=r.attributes,L=I.attributes,z=0,$=N.getAttributes();for(let k in $)if($[k].location>=0){let Q=W[k],ce=L[k];if(ce===void 0&&(k==="instanceMatrix"&&M.instanceMatrix&&(ce=M.instanceMatrix),k==="instanceColor"&&M.instanceColor&&(ce=M.instanceColor)),Q===void 0||Q.attribute!==ce||ce&&Q.data!==ce.data)return!0;z++}return r.attributesNum!==z||r.index!==H}function d(M,I,N,H){let W={},L=I.attributes,z=0,$=N.getAttributes();for(let k in $)if($[k].location>=0){let Q=L[k];Q===void 0&&(k==="instanceMatrix"&&M.instanceMatrix&&(Q=M.instanceMatrix),k==="instanceColor"&&M.instanceColor&&(Q=M.instanceColor));let ce={};ce.attribute=Q,Q&&Q.data&&(ce.data=Q.data),W[k]=ce,z++}r.attributes=W,r.attributesNum=z,r.index=H}function y(){let M=r.newAttributes;for(let I=0,N=M.length;I<N;I++)M[I]=0}function g(M){m(M,0)}function m(M,I){let N=r.newAttributes,H=r.enabledAttributes,W=r.attributeDivisors;N[M]=1,H[M]===0&&(i.enableVertexAttribArray(M),H[M]=1),W[M]!==I&&(i.vertexAttribDivisor(M,I),W[M]=I)}function S(){let M=r.newAttributes,I=r.enabledAttributes;for(let N=0,H=I.length;N<H;N++)I[N]!==M[N]&&(i.disableVertexAttribArray(N),I[N]=0)}function _(M,I,N,H,W,L,z){z===!0?i.vertexAttribIPointer(M,I,N,W,L):i.vertexAttribPointer(M,I,N,H,W,L)}function x(M,I,N,H){y();let W=H.attributes,L=N.getAttributes(),z=I.defaultAttributeValues;for(let $ in L){let k=L[$];if(k.location>=0){let ie=W[$];if(ie===void 0&&($==="instanceMatrix"&&M.instanceMatrix&&(ie=M.instanceMatrix),$==="instanceColor"&&M.instanceColor&&(ie=M.instanceColor)),ie!==void 0){let Q=ie.normalized,ce=ie.itemSize,De=e.get(ie);if(De===void 0)continue;let ke=De.buffer,Ke=De.type,$e=De.bytesPerElement,Y=Ke===i.INT||Ke===i.UNSIGNED_INT||ie.gpuType===tl;if(ie.isInterleavedBufferAttribute){let ne=ie.data,be=ne.stride,Le=ie.offset;if(ne.isInstancedInterleavedBuffer){for(let Te=0;Te<k.locationSize;Te++)m(k.location+Te,ne.meshPerAttribute);M.isInstancedMesh!==!0&&H._maxInstanceCount===void 0&&(H._maxInstanceCount=ne.meshPerAttribute*ne.count)}else for(let Te=0;Te<k.locationSize;Te++)g(k.location+Te);i.bindBuffer(i.ARRAY_BUFFER,ke);for(let Te=0;Te<k.locationSize;Te++)_(k.location+Te,ce/k.locationSize,Ke,Q,be*$e,(Le+ce/k.locationSize*Te)*$e,Y)}else{if(ie.isInstancedBufferAttribute){for(let ne=0;ne<k.locationSize;ne++)m(k.location+ne,ie.meshPerAttribute);M.isInstancedMesh!==!0&&H._maxInstanceCount===void 0&&(H._maxInstanceCount=ie.meshPerAttribute*ie.count)}else for(let ne=0;ne<k.locationSize;ne++)g(k.location+ne);i.bindBuffer(i.ARRAY_BUFFER,ke);for(let ne=0;ne<k.locationSize;ne++)_(k.location+ne,ce/k.locationSize,Ke,Q,ce*$e,ce/k.locationSize*ne*$e,Y)}}else if(z!==void 0){let Q=z[$];if(Q!==void 0)switch(Q.length){case 2:i.vertexAttrib2fv(k.location,Q);break;case 3:i.vertexAttrib3fv(k.location,Q);break;case 4:i.vertexAttrib4fv(k.location,Q);break;default:i.vertexAttrib1fv(k.location,Q)}}}}S()}function C(){R();for(let M in n){let I=n[M];for(let N in I){let H=I[N];for(let W in H)h(H[W].object),delete H[W];delete I[N]}delete n[M]}}function w(M){if(n[M.id]===void 0)return;let I=n[M.id];for(let N in I){let H=I[N];for(let W in H)h(H[W].object),delete H[W];delete I[N]}delete n[M.id]}function A(M){for(let I in n){let N=n[I];if(N[M.id]===void 0)continue;let H=N[M.id];for(let W in H)h(H[W].object),delete H[W];delete N[M.id]}}function R(){b(),a=!0,r!==s&&(r=s,c(r.object))}function b(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:R,resetDefaultState:b,dispose:C,releaseStatesOfGeometry:w,releaseStatesOfProgram:A,initAttributes:y,enableAttribute:g,disableUnusedAttributes:S}}function Hy(i,e,t){let n;function s(c){n=c}function r(c,h){i.drawArrays(n,c,h),t.update(h,n,1)}function a(c,h,u){u!==0&&(i.drawArraysInstanced(n,c,h,u),t.update(h,n,u))}function o(c,h,u){if(u===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,h,0,u);let f=0;for(let d=0;d<u;d++)f+=h[d];t.update(f,n,1)}function l(c,h,u,p){if(u===0)return;let f=e.get("WEBGL_multi_draw");if(f===null)for(let d=0;d<c.length;d++)a(c[d],h[d],p[d]);else{f.multiDrawArraysInstancedWEBGL(n,c,0,h,0,p,0,u);let d=0;for(let y=0;y<u;y++)d+=h[y]*p[y];t.update(d,n,1)}}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=o,this.renderMultiDrawInstances=l}function Vy(i,e,t,n){let s;function r(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){let A=e.get("EXT_texture_filter_anisotropic");s=i.getParameter(A.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(A){return!(A!==xn&&n.convert(A)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(A){let R=A===tr&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(A!==Fn&&n.convert(A)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&A!==En&&!R)}function l(A){if(A==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";A="mediump"}return A==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp",h=l(c);h!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);let u=t.logarithmicDepthBuffer===!0,p=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control"),f=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),d=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),y=i.getParameter(i.MAX_TEXTURE_SIZE),g=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),m=i.getParameter(i.MAX_VERTEX_ATTRIBS),S=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),_=i.getParameter(i.MAX_VARYING_VECTORS),x=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),C=d>0,w=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:u,reversedDepthBuffer:p,maxTextures:f,maxVertexTextures:d,maxTextureSize:y,maxCubemapSize:g,maxAttributes:m,maxVertexUniforms:S,maxVaryings:_,maxFragmentUniforms:x,vertexTextures:C,maxSamples:w}}function Gy(i){let e=this,t=null,n=0,s=!1,r=!1,a=new kn,o=new Xe,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(u,p){let f=u.length!==0||p||n!==0||s;return s=p,n=u.length,f},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,p){t=h(u,p,0)},this.setState=function(u,p,f){let d=u.clippingPlanes,y=u.clipIntersection,g=u.clipShadows,m=i.get(u);if(!s||d===null||d.length===0||r&&!g)r?h(null):c();else{let S=r?0:n,_=S*4,x=m.clippingState||null;l.value=x,x=h(d,p,_,f);for(let C=0;C!==_;++C)x[C]=t[C];m.clippingState=x,this.numIntersection=y?this.numPlanes:0,this.numPlanes+=S}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function h(u,p,f,d){let y=u!==null?u.length:0,g=null;if(y!==0){if(g=l.value,d!==!0||g===null){let m=f+y*4,S=p.matrixWorldInverse;o.getNormalMatrix(S),(g===null||g.length<m)&&(g=new Float32Array(m));for(let _=0,x=f;_!==y;++_,x+=4)a.copy(u[_]).applyMatrix4(S,o),a.normal.toArray(g,x),g[x+3]=a.constant}l.value=g,l.needsUpdate=!0}return e.numPlanes=y,e.numIntersection=0,g}}function Wy(i){let e=new WeakMap;function t(a,o){return o===jo?a.mapping=cs:o===Qo&&(a.mapping=hs),a}function n(a){if(a&&a.isTexture){let o=a.mapping;if(o===jo||o===Qo)if(e.has(a)){let l=e.get(a).texture;return t(l,a.mapping)}else{let l=a.image;if(l&&l.height>0){let c=new wo(l.height);return c.fromEquirectangularTexture(i,a),e.set(a,c),a.addEventListener("dispose",s),t(c.texture,a.mapping)}else return null}}return a}function s(a){let o=a.target;o.removeEventListener("dispose",s);let l=e.get(o);l!==void 0&&(e.delete(o),l.dispose())}function r(){e=new WeakMap}return{get:n,dispose:r}}var rr=4,ef=[.125,.215,.35,.446,.526,.582],gs=20,Sh=new ma,tf=new Ve,bh=null,Eh=0,wh=0,Th=!1,ms=(1+Math.sqrt(5))/2,sr=1/ms,nf=[new D(-ms,sr,0),new D(ms,sr,0),new D(-sr,0,ms),new D(sr,0,ms),new D(0,ms,-sr),new D(0,ms,sr),new D(-1,1,-1),new D(1,1,-1),new D(-1,1,1),new D(1,1,1)],Xy=new D,Hl=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,s=100,r={}){let{size:a=256,position:o=Xy}=r;bh=this._renderer.getRenderTarget(),Eh=this._renderer.getActiveCubeFace(),wh=this._renderer.getActiveMipmapLevel(),Th=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);let l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,n,s,l,o),t>0&&this._blur(l,0,0,t),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=af(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=rf(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(bh,Eh,wh),this._renderer.xr.enabled=Th,e.scissorTest=!1,zl(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===cs||e.mapping===hs?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),bh=this._renderer.getRenderTarget(),Eh=this._renderer.getActiveCubeFace(),wh=this._renderer.getActiveMipmapLevel(),Th=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:In,minFilter:In,generateMipmaps:!1,type:tr,format:xn,colorSpace:ts,depthBuffer:!1},s=sf(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=sf(e,t,n);let{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=$y(r)),this._blurMaterial=qy(r,e,t)}return s}_compileMaterial(e){let t=new dt(this._lodPlanes[0],e);this._renderer.compile(t,Sh)}_sceneToCubeUV(e,t,n,s,r){let l=new qt(90,1,t,n),c=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],u=this._renderer,p=u.autoClear,f=u.toneMapping;u.getClearColor(tf),u.toneMapping=fi,u.autoClear=!1,u.state.buffers.depth.getReversed()&&(u.setRenderTarget(s),u.clearDepth(),u.setRenderTarget(null));let y=new pn({name:"PMREM.Background",side:Vt,depthWrite:!1,depthTest:!1}),g=new dt(new Lt,y),m=!1,S=e.background;S?S.isColor&&(y.color.copy(S),e.background=null,m=!0):(y.color.copy(tf),m=!0);for(let _=0;_<6;_++){let x=_%3;x===0?(l.up.set(0,c[_],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x+h[_],r.y,r.z)):x===1?(l.up.set(0,0,c[_]),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y+h[_],r.z)):(l.up.set(0,c[_],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y,r.z+h[_]));let C=this._cubeSize;zl(s,x*C,_>2?C:0,C,C),u.setRenderTarget(s),m&&u.render(g,l),u.render(e,l)}g.geometry.dispose(),g.material.dispose(),u.toneMapping=f,u.autoClear=p,e.background=S}_textureToCubeUV(e,t){let n=this._renderer,s=e.mapping===cs||e.mapping===hs;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=af()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=rf());let r=s?this._cubemapMaterial:this._equirectMaterial,a=new dt(this._lodPlanes[0],r),o=r.uniforms;o.envMap.value=e;let l=this._cubeSize;zl(t,0,0,3*l,2*l),n.setRenderTarget(t),n.render(a,Sh)}_applyPMREM(e){let t=this._renderer,n=t.autoClear;t.autoClear=!1;let s=this._lodPlanes.length;for(let r=1;r<s;r++){let a=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),o=nf[(s-r-1)%nf.length];this._blur(e,r-1,r,a,o)}t.autoClear=n}_blur(e,t,n,s,r){let a=this._pingPongRenderTarget;this._halfBlur(e,a,t,n,s,"latitudinal",r),this._halfBlur(a,e,n,n,s,"longitudinal",r)}_halfBlur(e,t,n,s,r,a,o){let l=this._renderer,c=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");let h=3,u=new dt(this._lodPlanes[s],c),p=c.uniforms,f=this._sizeLods[n]-1,d=isFinite(r)?Math.PI/(2*f):2*Math.PI/(2*gs-1),y=r/d,g=isFinite(r)?1+Math.floor(h*y):gs;g>gs&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${g} samples when the maximum is set to ${gs}`);let m=[],S=0;for(let A=0;A<gs;++A){let R=A/y,b=Math.exp(-R*R/2);m.push(b),A===0?S+=b:A<g&&(S+=2*b)}for(let A=0;A<m.length;A++)m[A]=m[A]/S;p.envMap.value=e.texture,p.samples.value=g,p.weights.value=m,p.latitudinal.value=a==="latitudinal",o&&(p.poleAxis.value=o);let{_lodMax:_}=this;p.dTheta.value=d,p.mipInt.value=_-n;let x=this._sizeLods[s],C=3*x*(s>_-rr?s-_+rr:0),w=4*(this._cubeSize-x);zl(t,C,w,3*x,2*x),l.setRenderTarget(t),l.render(u,Sh)}};function $y(i){let e=[],t=[],n=[],s=i,r=i-rr+1+ef.length;for(let a=0;a<r;a++){let o=Math.pow(2,s);t.push(o);let l=1/o;a>i-rr?l=ef[a-i+rr-1]:a===0&&(l=0),n.push(l);let c=1/(o-2),h=-c,u=1+c,p=[h,h,u,h,u,u,h,h,u,u,h,u],f=6,d=6,y=3,g=2,m=1,S=new Float32Array(y*d*f),_=new Float32Array(g*d*f),x=new Float32Array(m*d*f);for(let w=0;w<f;w++){let A=w%3*2/3-1,R=w>2?0:-1,b=[A,R,0,A+2/3,R,0,A+2/3,R+1,0,A,R,0,A+2/3,R+1,0,A,R+1,0];S.set(b,y*d*w),_.set(p,g*d*w);let M=[w,w,w,w,w,w];x.set(M,m*d*w)}let C=new Mt;C.setAttribute("position",new At(S,y)),C.setAttribute("uv",new At(_,g)),C.setAttribute("faceIndex",new At(x,m)),e.push(C),s>rr&&s--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function sf(i,e,t){let n=new Vn(i,e,t);return n.texture.mapping=xa,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function zl(i,e,t,n,s){i.viewport.set(e,t,n,s),i.scissor.set(e,t,n,s)}function qy(i,e,t){let n=new Float32Array(gs),s=new D(0,1,0);return new mn({name:"SphericalGaussianBlur",defines:{n:gs,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:Fh(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:di,depthTest:!1,depthWrite:!1})}function rf(){return new mn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Fh(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:di,depthTest:!1,depthWrite:!1})}function af(){return new mn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Fh(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:di,depthTest:!1,depthWrite:!1})}function Fh(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function Yy(i){let e=new WeakMap,t=null;function n(o){if(o&&o.isTexture){let l=o.mapping,c=l===jo||l===Qo,h=l===cs||l===hs;if(c||h){let u=e.get(o),p=u!==void 0?u.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==p)return t===null&&(t=new Hl(i)),u=c?t.fromEquirectangular(o,u):t.fromCubemap(o,u),u.texture.pmremVersion=o.pmremVersion,e.set(o,u),u.texture;if(u!==void 0)return u.texture;{let f=o.image;return c&&f&&f.height>0||h&&f&&s(f)?(t===null&&(t=new Hl(i)),u=c?t.fromEquirectangular(o):t.fromCubemap(o),u.texture.pmremVersion=o.pmremVersion,e.set(o,u),o.addEventListener("dispose",r),u.texture):null}}}return o}function s(o){let l=0,c=6;for(let h=0;h<c;h++)o[h]!==void 0&&l++;return l===c}function r(o){let l=o.target;l.removeEventListener("dispose",r);let c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function a(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:a}}function Zy(i){let e={};function t(n){if(e[n]!==void 0)return e[n];let s;switch(n){case"WEBGL_depth_texture":s=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=i.getExtension(n)}return e[n]=s,s}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){let s=t(n);return s===null&&Gs("THREE.WebGLRenderer: "+n+" extension not supported."),s}}}function Jy(i,e,t,n){let s={},r=new WeakMap;function a(u){let p=u.target;p.index!==null&&e.remove(p.index);for(let d in p.attributes)e.remove(p.attributes[d]);p.removeEventListener("dispose",a),delete s[p.id];let f=r.get(p);f&&(e.remove(f),r.delete(p)),n.releaseStatesOfGeometry(p),p.isInstancedBufferGeometry===!0&&delete p._maxInstanceCount,t.memory.geometries--}function o(u,p){return s[p.id]===!0||(p.addEventListener("dispose",a),s[p.id]=!0,t.memory.geometries++),p}function l(u){let p=u.attributes;for(let f in p)e.update(p[f],i.ARRAY_BUFFER)}function c(u){let p=[],f=u.index,d=u.attributes.position,y=0;if(f!==null){let S=f.array;y=f.version;for(let _=0,x=S.length;_<x;_+=3){let C=S[_+0],w=S[_+1],A=S[_+2];p.push(C,w,w,A,A,C)}}else if(d!==void 0){let S=d.array;y=d.version;for(let _=0,x=S.length/3-1;_<x;_+=3){let C=_+0,w=_+1,A=_+2;p.push(C,w,w,A,A,C)}}else return;let g=new(gh(p)?zr:Br)(p,1);g.version=y;let m=r.get(u);m&&e.remove(m),r.set(u,g)}function h(u){let p=r.get(u);if(p){let f=u.index;f!==null&&p.version<f.version&&c(u)}else c(u);return r.get(u)}return{get:o,update:l,getWireframeAttribute:h}}function Ky(i,e,t){let n;function s(p){n=p}let r,a;function o(p){r=p.type,a=p.bytesPerElement}function l(p,f){i.drawElements(n,f,r,p*a),t.update(f,n,1)}function c(p,f,d){d!==0&&(i.drawElementsInstanced(n,f,r,p*a,d),t.update(f,n,d))}function h(p,f,d){if(d===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,f,0,r,p,0,d);let g=0;for(let m=0;m<d;m++)g+=f[m];t.update(g,n,1)}function u(p,f,d,y){if(d===0)return;let g=e.get("WEBGL_multi_draw");if(g===null)for(let m=0;m<p.length;m++)c(p[m]/a,f[m],y[m]);else{g.multiDrawElementsInstancedWEBGL(n,f,0,r,p,0,y,0,d);let m=0;for(let S=0;S<d;S++)m+=f[S]*y[S];t.update(m,n,1)}}this.setMode=s,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=h,this.renderMultiDrawInstances=u}function jy(i){let e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(t.calls++,a){case i.TRIANGLES:t.triangles+=o*(r/3);break;case i.LINES:t.lines+=o*(r/2);break;case i.LINE_STRIP:t.lines+=o*(r-1);break;case i.LINE_LOOP:t.lines+=o*r;break;case i.POINTS:t.points+=o*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:n}}function Qy(i,e,t){let n=new WeakMap,s=new yt;function r(a,o,l){let c=a.morphTargetInfluences,h=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,u=h!==void 0?h.length:0,p=n.get(o);if(p===void 0||p.count!==u){let b=function(){A.dispose(),n.delete(o),o.removeEventListener("dispose",b)};p!==void 0&&p.texture.dispose();let f=o.morphAttributes.position!==void 0,d=o.morphAttributes.normal!==void 0,y=o.morphAttributes.color!==void 0,g=o.morphAttributes.position||[],m=o.morphAttributes.normal||[],S=o.morphAttributes.color||[],_=0;f===!0&&(_=1),d===!0&&(_=2),y===!0&&(_=3);let x=o.attributes.position.count*_,C=1;x>e.maxTextureSize&&(C=Math.ceil(x/e.maxTextureSize),x=e.maxTextureSize);let w=new Float32Array(x*C*4*u),A=new Or(w,x,C,u);A.type=En,A.needsUpdate=!0;let R=_*4;for(let M=0;M<u;M++){let I=g[M],N=m[M],H=S[M],W=x*C*4*M;for(let L=0;L<I.count;L++){let z=L*R;f===!0&&(s.fromBufferAttribute(I,L),w[W+z+0]=s.x,w[W+z+1]=s.y,w[W+z+2]=s.z,w[W+z+3]=0),d===!0&&(s.fromBufferAttribute(N,L),w[W+z+4]=s.x,w[W+z+5]=s.y,w[W+z+6]=s.z,w[W+z+7]=0),y===!0&&(s.fromBufferAttribute(H,L),w[W+z+8]=s.x,w[W+z+9]=s.y,w[W+z+10]=s.z,w[W+z+11]=H.itemSize===4?s.w:1)}}p={count:u,texture:A,size:new ge(x,C)},n.set(o,p),o.addEventListener("dispose",b)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(i,"morphTexture",a.morphTexture,t);else{let f=0;for(let y=0;y<c.length;y++)f+=c[y];let d=o.morphTargetsRelative?1:1-f;l.getUniforms().setValue(i,"morphTargetBaseInfluence",d),l.getUniforms().setValue(i,"morphTargetInfluences",c)}l.getUniforms().setValue(i,"morphTargetsTexture",p.texture,t),l.getUniforms().setValue(i,"morphTargetsTextureSize",p.size)}return{update:r}}function ex(i,e,t,n){let s=new WeakMap;function r(l){let c=n.render.frame,h=l.geometry,u=e.get(l,h);if(s.get(u)!==c&&(e.update(u),s.set(u,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",o)===!1&&l.addEventListener("dispose",o),s.get(l)!==c&&(t.update(l.instanceMatrix,i.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,i.ARRAY_BUFFER),s.set(l,c))),l.isSkinnedMesh){let p=l.skeleton;s.get(p)!==c&&(p.update(),s.set(p,c))}return u}function a(){s=new WeakMap}function o(l){let c=l.target;c.removeEventListener("dispose",o),t.remove(c.instanceMatrix),c.instanceColor!==null&&t.remove(c.instanceColor)}return{update:r,dispose:a}}var wf=new an,of=new Kr(1,1),Tf=new Or,Af=new bo,Cf=new Hr,lf=[],cf=[],hf=new Float32Array(16),uf=new Float32Array(9),df=new Float32Array(4);function or(i,e,t){let n=i[0];if(n<=0||n>0)return i;let s=e*t,r=lf[s];if(r===void 0&&(r=new Float32Array(s),lf[s]=r),e!==0){n.toArray(r,0);for(let a=1,o=0;a!==e;++a)o+=t,i[a].toArray(r,o)}return r}function Dt(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function Ut(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function Gl(i,e){let t=cf[e];t===void 0&&(t=new Int32Array(e),cf[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function tx(i,e){let t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function nx(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Dt(t,e))return;i.uniform2fv(this.addr,e),Ut(t,e)}}function ix(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Dt(t,e))return;i.uniform3fv(this.addr,e),Ut(t,e)}}function sx(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Dt(t,e))return;i.uniform4fv(this.addr,e),Ut(t,e)}}function rx(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(Dt(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),Ut(t,e)}else{if(Dt(t,n))return;df.set(n),i.uniformMatrix2fv(this.addr,!1,df),Ut(t,n)}}function ax(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(Dt(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),Ut(t,e)}else{if(Dt(t,n))return;uf.set(n),i.uniformMatrix3fv(this.addr,!1,uf),Ut(t,n)}}function ox(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(Dt(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),Ut(t,e)}else{if(Dt(t,n))return;hf.set(n),i.uniformMatrix4fv(this.addr,!1,hf),Ut(t,n)}}function lx(i,e){let t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function cx(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Dt(t,e))return;i.uniform2iv(this.addr,e),Ut(t,e)}}function hx(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Dt(t,e))return;i.uniform3iv(this.addr,e),Ut(t,e)}}function ux(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Dt(t,e))return;i.uniform4iv(this.addr,e),Ut(t,e)}}function dx(i,e){let t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function fx(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Dt(t,e))return;i.uniform2uiv(this.addr,e),Ut(t,e)}}function px(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Dt(t,e))return;i.uniform3uiv(this.addr,e),Ut(t,e)}}function mx(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Dt(t,e))return;i.uniform4uiv(this.addr,e),Ut(t,e)}}function gx(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(of.compareFunction=fh,r=of):r=wf,t.setTexture2D(e||r,s)}function yx(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture3D(e||Af,s)}function xx(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTextureCube(e||Cf,s)}function _x(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture2DArray(e||Tf,s)}function vx(i){switch(i){case 5126:return tx;case 35664:return nx;case 35665:return ix;case 35666:return sx;case 35674:return rx;case 35675:return ax;case 35676:return ox;case 5124:case 35670:return lx;case 35667:case 35671:return cx;case 35668:case 35672:return hx;case 35669:case 35673:return ux;case 5125:return dx;case 36294:return fx;case 36295:return px;case 36296:return mx;case 35678:case 36198:case 36298:case 36306:case 35682:return gx;case 35679:case 36299:case 36307:return yx;case 35680:case 36300:case 36308:case 36293:return xx;case 36289:case 36303:case 36311:case 36292:return _x}}function Mx(i,e){i.uniform1fv(this.addr,e)}function Sx(i,e){let t=or(e,this.size,2);i.uniform2fv(this.addr,t)}function bx(i,e){let t=or(e,this.size,3);i.uniform3fv(this.addr,t)}function Ex(i,e){let t=or(e,this.size,4);i.uniform4fv(this.addr,t)}function wx(i,e){let t=or(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function Tx(i,e){let t=or(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function Ax(i,e){let t=or(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function Cx(i,e){i.uniform1iv(this.addr,e)}function Rx(i,e){i.uniform2iv(this.addr,e)}function Ix(i,e){i.uniform3iv(this.addr,e)}function Px(i,e){i.uniform4iv(this.addr,e)}function Lx(i,e){i.uniform1uiv(this.addr,e)}function Dx(i,e){i.uniform2uiv(this.addr,e)}function Ux(i,e){i.uniform3uiv(this.addr,e)}function Nx(i,e){i.uniform4uiv(this.addr,e)}function Fx(i,e,t){let n=this.cache,s=e.length,r=Gl(t,s);Dt(n,r)||(i.uniform1iv(this.addr,r),Ut(n,r));for(let a=0;a!==s;++a)t.setTexture2D(e[a]||wf,r[a])}function Ox(i,e,t){let n=this.cache,s=e.length,r=Gl(t,s);Dt(n,r)||(i.uniform1iv(this.addr,r),Ut(n,r));for(let a=0;a!==s;++a)t.setTexture3D(e[a]||Af,r[a])}function Bx(i,e,t){let n=this.cache,s=e.length,r=Gl(t,s);Dt(n,r)||(i.uniform1iv(this.addr,r),Ut(n,r));for(let a=0;a!==s;++a)t.setTextureCube(e[a]||Cf,r[a])}function zx(i,e,t){let n=this.cache,s=e.length,r=Gl(t,s);Dt(n,r)||(i.uniform1iv(this.addr,r),Ut(n,r));for(let a=0;a!==s;++a)t.setTexture2DArray(e[a]||Tf,r[a])}function kx(i){switch(i){case 5126:return Mx;case 35664:return Sx;case 35665:return bx;case 35666:return Ex;case 35674:return wx;case 35675:return Tx;case 35676:return Ax;case 5124:case 35670:return Cx;case 35667:case 35671:return Rx;case 35668:case 35672:return Ix;case 35669:case 35673:return Px;case 5125:return Lx;case 36294:return Dx;case 36295:return Ux;case 36296:return Nx;case 35678:case 36198:case 36298:case 36306:case 35682:return Fx;case 35679:case 36299:case 36307:return Ox;case 35680:case 36300:case 36308:case 36293:return Bx;case 36289:case 36303:case 36311:case 36292:return zx}}var Ch=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=vx(t.type)}},Rh=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=kx(t.type)}},Ih=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let s=this.seq;for(let r=0,a=s.length;r!==a;++r){let o=s[r];o.setValue(e,t[o.id],n)}}},Ah=/(\w+)(\])?(\[|\.)?/g;function ff(i,e){i.seq.push(e),i.map[e.id]=e}function Hx(i,e,t){let n=i.name,s=n.length;for(Ah.lastIndex=0;;){let r=Ah.exec(n),a=Ah.lastIndex,o=r[1],l=r[2]==="]",c=r[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===s){ff(t,c===void 0?new Ch(o,i,e):new Rh(o,i,e));break}else{let u=t.map[o];u===void 0&&(u=new Ih(o),ff(t,u)),t=u}}}var ar=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let s=0;s<n;++s){let r=e.getActiveUniform(t,s),a=e.getUniformLocation(t,r.name);Hx(r,a,this)}}setValue(e,t,n,s){let r=this.map[t];r!==void 0&&r.setValue(e,n,s)}setOptional(e,t,n){let s=t[n];s!==void 0&&this.setValue(e,n,s)}static upload(e,t,n,s){for(let r=0,a=t.length;r!==a;++r){let o=t[r],l=n[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,s)}}static seqWithValue(e,t){let n=[];for(let s=0,r=e.length;s!==r;++s){let a=e[s];a.id in t&&n.push(a)}return n}};function pf(i,e,t){let n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}var Vx=37297,Gx=0;function Wx(i,e){let t=i.split(`
`),n=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let a=s;a<r;a++){let o=a+1;n.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return n.join(`
`)}var mf=new Xe;function Xx(i){st._getMatrix(mf,st.workingColorSpace,i);let e=`mat3( ${mf.elements.map(t=>t.toFixed(4))} )`;switch(st.getTransfer(i)){case Ur:return[e,"LinearTransferOETF"];case ot:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",i),[e,"LinearTransferOETF"]}}function gf(i,e,t){let n=i.getShaderParameter(e,i.COMPILE_STATUS),r=(i.getShaderInfoLog(e)||"").trim();if(n&&r==="")return"";let a=/ERROR: 0:(\d+)/.exec(r);if(a){let o=parseInt(a[1]);return t.toUpperCase()+`

`+r+`

`+Wx(i.getShaderSource(e),o)}else return r}function $x(i,e){let t=Xx(e);return[`vec4 ${i}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function qx(i,e){let t;switch(e){case bd:t="Linear";break;case Ed:t="Reinhard";break;case wd:t="Cineon";break;case Ko:t="ACESFilmic";break;case Ad:t="AgX";break;case Cd:t="Neutral";break;case Td:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}var kl=new D;function Yx(){st.getLuminanceCoefficients(kl);let i=kl.x.toFixed(4),e=kl.y.toFixed(4),t=kl.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Zx(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Ea).join(`
`)}function Jx(i){let e=[];for(let t in i){let n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function Kx(i,e){let t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){let r=i.getActiveAttrib(e,s),a=r.name,o=1;r.type===i.FLOAT_MAT2&&(o=2),r.type===i.FLOAT_MAT3&&(o=3),r.type===i.FLOAT_MAT4&&(o=4),t[a]={type:r.type,location:i.getAttribLocation(e,a),locationSize:o}}return t}function Ea(i){return i!==""}function yf(i,e){let t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function xf(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}var jx=/^[ \t]*#include +<([\w\d./]+)>/gm;function Ph(i){return i.replace(jx,e_)}var Qx=new Map;function e_(i,e){let t=Ze[e];if(t===void 0){let n=Qx.get(e);if(n!==void 0)t=Ze[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return Ph(t)}var t_=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function _f(i){return i.replace(t_,n_)}function n_(i,e,t,n){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function vf(i){let e=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;return i.precision==="highp"?e+=`
#define HIGH_PRECISION`:i.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function i_(i){let e="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===Qc?e="SHADOWMAP_TYPE_PCF":i.shadowMapType===Go?e="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===$n&&(e="SHADOWMAP_TYPE_VSM"),e}function s_(i){let e="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case cs:case hs:e="ENVMAP_TYPE_CUBE";break;case xa:e="ENVMAP_TYPE_CUBE_UV";break}return e}function r_(i){let e="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case hs:e="ENVMAP_MODE_REFRACTION";break}return e}function a_(i){let e="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case ih:e="ENVMAP_BLENDING_MULTIPLY";break;case Md:e="ENVMAP_BLENDING_MIX";break;case Sd:e="ENVMAP_BLENDING_ADD";break}return e}function o_(i){let e=i.envMapCubeUVHeight;if(e===null)return null;let t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:n,maxMip:t}}function l_(i,e,t,n){let s=i.getContext(),r=t.defines,a=t.vertexShader,o=t.fragmentShader,l=i_(t),c=s_(t),h=r_(t),u=a_(t),p=o_(t),f=Zx(t),d=Jx(r),y=s.createProgram(),g,m,S=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(g=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,d].filter(Ea).join(`
`),g.length>0&&(g+=`
`),m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,d].filter(Ea).join(`
`),m.length>0&&(m+=`
`)):(g=[vf(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,d,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Ea).join(`
`),m=[vf(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,d,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+h:"",t.envMap?"#define "+u:"",p?"#define CUBEUV_TEXEL_WIDTH "+p.texelWidth:"",p?"#define CUBEUV_TEXEL_HEIGHT "+p.texelHeight:"",p?"#define CUBEUV_MAX_MIP "+p.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==fi?"#define TONE_MAPPING":"",t.toneMapping!==fi?Ze.tonemapping_pars_fragment:"",t.toneMapping!==fi?qx("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Ze.colorspace_pars_fragment,$x("linearToOutputTexel",t.outputColorSpace),Yx(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Ea).join(`
`)),a=Ph(a),a=yf(a,t),a=xf(a,t),o=Ph(o),o=yf(o,t),o=xf(o,t),a=_f(a),o=_f(o),t.isRawShaderMaterial!==!0&&(S=`#version 300 es
`,g=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,m=["#define varying in",t.glslVersion===ph?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===ph?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+m);let _=S+g+a,x=S+m+o,C=pf(s,s.VERTEX_SHADER,_),w=pf(s,s.FRAGMENT_SHADER,x);s.attachShader(y,C),s.attachShader(y,w),t.index0AttributeName!==void 0?s.bindAttribLocation(y,0,t.index0AttributeName):t.morphTargets===!0&&s.bindAttribLocation(y,0,"position"),s.linkProgram(y);function A(I){if(i.debug.checkShaderErrors){let N=s.getProgramInfoLog(y)||"",H=s.getShaderInfoLog(C)||"",W=s.getShaderInfoLog(w)||"",L=N.trim(),z=H.trim(),$=W.trim(),k=!0,ie=!0;if(s.getProgramParameter(y,s.LINK_STATUS)===!1)if(k=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,y,C,w);else{let Q=gf(s,C,"vertex"),ce=gf(s,w,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(y,s.VALIDATE_STATUS)+`

Material Name: `+I.name+`
Material Type: `+I.type+`

Program Info Log: `+L+`
`+Q+`
`+ce)}else L!==""?console.warn("THREE.WebGLProgram: Program Info Log:",L):(z===""||$==="")&&(ie=!1);ie&&(I.diagnostics={runnable:k,programLog:L,vertexShader:{log:z,prefix:g},fragmentShader:{log:$,prefix:m}})}s.deleteShader(C),s.deleteShader(w),R=new ar(s,y),b=Kx(s,y)}let R;this.getUniforms=function(){return R===void 0&&A(this),R};let b;this.getAttributes=function(){return b===void 0&&A(this),b};let M=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return M===!1&&(M=s.getProgramParameter(y,Vx)),M},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(y),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=Gx++,this.cacheKey=e,this.usedTimes=1,this.program=y,this.vertexShader=C,this.fragmentShader=w,this}var c_=0,Lh=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){let t=e.vertexShader,n=e.fragmentShader,s=this._getShaderStage(t),r=this._getShaderStage(n),a=this._getShaderCacheForMaterial(e);return a.has(s)===!1&&(a.add(s),s.usedTimes++),a.has(r)===!1&&(a.add(r),r.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new Dh(e),t.set(e,n)),n}},Dh=class{constructor(e){this.id=c_++,this.code=e,this.usedTimes=0}};function h_(i,e,t,n,s,r,a){let o=new Xs,l=new Lh,c=new Set,h=[],u=s.logarithmicDepthBuffer,p=s.vertexTextures,f=s.precision,d={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function y(b){return c.add(b),b===0?"uv":`uv${b}`}function g(b,M,I,N,H){let W=N.fog,L=H.geometry,z=b.isMeshStandardMaterial?N.environment:null,$=(b.isMeshStandardMaterial?t:e).get(b.envMap||z),k=$&&$.mapping===xa?$.image.height:null,ie=d[b.type];b.precision!==null&&(f=s.getMaxPrecision(b.precision),f!==b.precision&&console.warn("THREE.WebGLProgram.getParameters:",b.precision,"not supported, using",f,"instead."));let Q=L.morphAttributes.position||L.morphAttributes.normal||L.morphAttributes.color,ce=Q!==void 0?Q.length:0,De=0;L.morphAttributes.position!==void 0&&(De=1),L.morphAttributes.normal!==void 0&&(De=2),L.morphAttributes.color!==void 0&&(De=3);let ke,Ke,$e,Y;if(ie){let at=qn[ie];ke=at.vertexShader,Ke=at.fragmentShader}else ke=b.vertexShader,Ke=b.fragmentShader,l.update(b),$e=l.getVertexShaderID(b),Y=l.getFragmentShaderID(b);let ne=i.getRenderTarget(),be=i.state.buffers.depth.getReversed(),Le=H.isInstancedMesh===!0,Te=H.isBatchedMesh===!0,et=!!b.map,pt=!!b.matcap,P=!!$,te=!!b.aoMap,K=!!b.lightMap,J=!!b.bumpMap,Z=!!b.normalMap,de=!!b.displacementMap,se=!!b.emissiveMap,fe=!!b.metalnessMap,Ge=!!b.roughnessMap,He=b.anisotropy>0,T=b.clearcoat>0,v=b.dispersion>0,B=b.iridescence>0,X=b.sheen>0,ee=b.transmission>0,q=He&&!!b.anisotropyMap,Ie=T&&!!b.clearcoatMap,he=T&&!!b.clearcoatNormalMap,Ae=T&&!!b.clearcoatRoughnessMap,Ce=B&&!!b.iridescenceMap,re=B&&!!b.iridescenceThicknessMap,ve=X&&!!b.sheenColorMap,Be=X&&!!b.sheenRoughnessMap,Pe=!!b.specularMap,xe=!!b.specularColorMap,qe=!!b.specularIntensityMap,U=ee&&!!b.transmissionMap,le=ee&&!!b.thicknessMap,me=!!b.gradientMap,Ee=!!b.alphaMap,ae=b.alphaTest>0,j=!!b.alphaHash,Re=!!b.extensions,We=fi;b.toneMapped&&(ne===null||ne.isXRRenderTarget===!0)&&(We=i.toneMapping);let mt={shaderID:ie,shaderType:b.type,shaderName:b.name,vertexShader:ke,fragmentShader:Ke,defines:b.defines,customVertexShaderID:$e,customFragmentShaderID:Y,isRawShaderMaterial:b.isRawShaderMaterial===!0,glslVersion:b.glslVersion,precision:f,batching:Te,batchingColor:Te&&H._colorsTexture!==null,instancing:Le,instancingColor:Le&&H.instanceColor!==null,instancingMorph:Le&&H.morphTexture!==null,supportsVertexTextures:p,outputColorSpace:ne===null?i.outputColorSpace:ne.isXRRenderTarget===!0?ne.texture.colorSpace:ts,alphaToCoverage:!!b.alphaToCoverage,map:et,matcap:pt,envMap:P,envMapMode:P&&$.mapping,envMapCubeUVHeight:k,aoMap:te,lightMap:K,bumpMap:J,normalMap:Z,displacementMap:p&&de,emissiveMap:se,normalMapObjectSpace:Z&&b.normalMapType===Fd,normalMapTangentSpace:Z&&b.normalMapType===dh,metalnessMap:fe,roughnessMap:Ge,anisotropy:He,anisotropyMap:q,clearcoat:T,clearcoatMap:Ie,clearcoatNormalMap:he,clearcoatRoughnessMap:Ae,dispersion:v,iridescence:B,iridescenceMap:Ce,iridescenceThicknessMap:re,sheen:X,sheenColorMap:ve,sheenRoughnessMap:Be,specularMap:Pe,specularColorMap:xe,specularIntensityMap:qe,transmission:ee,transmissionMap:U,thicknessMap:le,gradientMap:me,opaque:b.transparent===!1&&b.blending===Qi&&b.alphaToCoverage===!1,alphaMap:Ee,alphaTest:ae,alphaHash:j,combine:b.combine,mapUv:et&&y(b.map.channel),aoMapUv:te&&y(b.aoMap.channel),lightMapUv:K&&y(b.lightMap.channel),bumpMapUv:J&&y(b.bumpMap.channel),normalMapUv:Z&&y(b.normalMap.channel),displacementMapUv:de&&y(b.displacementMap.channel),emissiveMapUv:se&&y(b.emissiveMap.channel),metalnessMapUv:fe&&y(b.metalnessMap.channel),roughnessMapUv:Ge&&y(b.roughnessMap.channel),anisotropyMapUv:q&&y(b.anisotropyMap.channel),clearcoatMapUv:Ie&&y(b.clearcoatMap.channel),clearcoatNormalMapUv:he&&y(b.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Ae&&y(b.clearcoatRoughnessMap.channel),iridescenceMapUv:Ce&&y(b.iridescenceMap.channel),iridescenceThicknessMapUv:re&&y(b.iridescenceThicknessMap.channel),sheenColorMapUv:ve&&y(b.sheenColorMap.channel),sheenRoughnessMapUv:Be&&y(b.sheenRoughnessMap.channel),specularMapUv:Pe&&y(b.specularMap.channel),specularColorMapUv:xe&&y(b.specularColorMap.channel),specularIntensityMapUv:qe&&y(b.specularIntensityMap.channel),transmissionMapUv:U&&y(b.transmissionMap.channel),thicknessMapUv:le&&y(b.thicknessMap.channel),alphaMapUv:Ee&&y(b.alphaMap.channel),vertexTangents:!!L.attributes.tangent&&(Z||He),vertexColors:b.vertexColors,vertexAlphas:b.vertexColors===!0&&!!L.attributes.color&&L.attributes.color.itemSize===4,pointsUvs:H.isPoints===!0&&!!L.attributes.uv&&(et||Ee),fog:!!W,useFog:b.fog===!0,fogExp2:!!W&&W.isFogExp2,flatShading:b.flatShading===!0&&b.wireframe===!1,sizeAttenuation:b.sizeAttenuation===!0,logarithmicDepthBuffer:u,reversedDepthBuffer:be,skinning:H.isSkinnedMesh===!0,morphTargets:L.morphAttributes.position!==void 0,morphNormals:L.morphAttributes.normal!==void 0,morphColors:L.morphAttributes.color!==void 0,morphTargetsCount:ce,morphTextureStride:De,numDirLights:M.directional.length,numPointLights:M.point.length,numSpotLights:M.spot.length,numSpotLightMaps:M.spotLightMap.length,numRectAreaLights:M.rectArea.length,numHemiLights:M.hemi.length,numDirLightShadows:M.directionalShadowMap.length,numPointLightShadows:M.pointShadowMap.length,numSpotLightShadows:M.spotShadowMap.length,numSpotLightShadowsWithMaps:M.numSpotLightShadowsWithMaps,numLightProbes:M.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:b.dithering,shadowMapEnabled:i.shadowMap.enabled&&I.length>0,shadowMapType:i.shadowMap.type,toneMapping:We,decodeVideoTexture:et&&b.map.isVideoTexture===!0&&st.getTransfer(b.map.colorSpace)===ot,decodeVideoTextureEmissive:se&&b.emissiveMap.isVideoTexture===!0&&st.getTransfer(b.emissiveMap.colorSpace)===ot,premultipliedAlpha:b.premultipliedAlpha,doubleSided:b.side===bn,flipSided:b.side===Vt,useDepthPacking:b.depthPacking>=0,depthPacking:b.depthPacking||0,index0AttributeName:b.index0AttributeName,extensionClipCullDistance:Re&&b.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Re&&b.extensions.multiDraw===!0||Te)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:b.customProgramCacheKey()};return mt.vertexUv1s=c.has(1),mt.vertexUv2s=c.has(2),mt.vertexUv3s=c.has(3),c.clear(),mt}function m(b){let M=[];if(b.shaderID?M.push(b.shaderID):(M.push(b.customVertexShaderID),M.push(b.customFragmentShaderID)),b.defines!==void 0)for(let I in b.defines)M.push(I),M.push(b.defines[I]);return b.isRawShaderMaterial===!1&&(S(M,b),_(M,b),M.push(i.outputColorSpace)),M.push(b.customProgramCacheKey),M.join()}function S(b,M){b.push(M.precision),b.push(M.outputColorSpace),b.push(M.envMapMode),b.push(M.envMapCubeUVHeight),b.push(M.mapUv),b.push(M.alphaMapUv),b.push(M.lightMapUv),b.push(M.aoMapUv),b.push(M.bumpMapUv),b.push(M.normalMapUv),b.push(M.displacementMapUv),b.push(M.emissiveMapUv),b.push(M.metalnessMapUv),b.push(M.roughnessMapUv),b.push(M.anisotropyMapUv),b.push(M.clearcoatMapUv),b.push(M.clearcoatNormalMapUv),b.push(M.clearcoatRoughnessMapUv),b.push(M.iridescenceMapUv),b.push(M.iridescenceThicknessMapUv),b.push(M.sheenColorMapUv),b.push(M.sheenRoughnessMapUv),b.push(M.specularMapUv),b.push(M.specularColorMapUv),b.push(M.specularIntensityMapUv),b.push(M.transmissionMapUv),b.push(M.thicknessMapUv),b.push(M.combine),b.push(M.fogExp2),b.push(M.sizeAttenuation),b.push(M.morphTargetsCount),b.push(M.morphAttributeCount),b.push(M.numDirLights),b.push(M.numPointLights),b.push(M.numSpotLights),b.push(M.numSpotLightMaps),b.push(M.numHemiLights),b.push(M.numRectAreaLights),b.push(M.numDirLightShadows),b.push(M.numPointLightShadows),b.push(M.numSpotLightShadows),b.push(M.numSpotLightShadowsWithMaps),b.push(M.numLightProbes),b.push(M.shadowMapType),b.push(M.toneMapping),b.push(M.numClippingPlanes),b.push(M.numClipIntersection),b.push(M.depthPacking)}function _(b,M){o.disableAll(),M.supportsVertexTextures&&o.enable(0),M.instancing&&o.enable(1),M.instancingColor&&o.enable(2),M.instancingMorph&&o.enable(3),M.matcap&&o.enable(4),M.envMap&&o.enable(5),M.normalMapObjectSpace&&o.enable(6),M.normalMapTangentSpace&&o.enable(7),M.clearcoat&&o.enable(8),M.iridescence&&o.enable(9),M.alphaTest&&o.enable(10),M.vertexColors&&o.enable(11),M.vertexAlphas&&o.enable(12),M.vertexUv1s&&o.enable(13),M.vertexUv2s&&o.enable(14),M.vertexUv3s&&o.enable(15),M.vertexTangents&&o.enable(16),M.anisotropy&&o.enable(17),M.alphaHash&&o.enable(18),M.batching&&o.enable(19),M.dispersion&&o.enable(20),M.batchingColor&&o.enable(21),M.gradientMap&&o.enable(22),b.push(o.mask),o.disableAll(),M.fog&&o.enable(0),M.useFog&&o.enable(1),M.flatShading&&o.enable(2),M.logarithmicDepthBuffer&&o.enable(3),M.reversedDepthBuffer&&o.enable(4),M.skinning&&o.enable(5),M.morphTargets&&o.enable(6),M.morphNormals&&o.enable(7),M.morphColors&&o.enable(8),M.premultipliedAlpha&&o.enable(9),M.shadowMapEnabled&&o.enable(10),M.doubleSided&&o.enable(11),M.flipSided&&o.enable(12),M.useDepthPacking&&o.enable(13),M.dithering&&o.enable(14),M.transmission&&o.enable(15),M.sheen&&o.enable(16),M.opaque&&o.enable(17),M.pointsUvs&&o.enable(18),M.decodeVideoTexture&&o.enable(19),M.decodeVideoTextureEmissive&&o.enable(20),M.alphaToCoverage&&o.enable(21),b.push(o.mask)}function x(b){let M=d[b.type],I;if(M){let N=qn[M];I=qd.clone(N.uniforms)}else I=b.uniforms;return I}function C(b,M){let I;for(let N=0,H=h.length;N<H;N++){let W=h[N];if(W.cacheKey===M){I=W,++I.usedTimes;break}}return I===void 0&&(I=new l_(i,M,b,r),h.push(I)),I}function w(b){if(--b.usedTimes===0){let M=h.indexOf(b);h[M]=h[h.length-1],h.pop(),b.destroy()}}function A(b){l.remove(b)}function R(){l.dispose()}return{getParameters:g,getProgramCacheKey:m,getUniforms:x,acquireProgram:C,releaseProgram:w,releaseShaderCache:A,programs:h,dispose:R}}function u_(){let i=new WeakMap;function e(a){return i.has(a)}function t(a){let o=i.get(a);return o===void 0&&(o={},i.set(a,o)),o}function n(a){i.delete(a)}function s(a,o,l){i.get(a)[o]=l}function r(){i=new WeakMap}return{has:e,get:t,remove:n,update:s,dispose:r}}function d_(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.z!==e.z?i.z-e.z:i.id-e.id}function Mf(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function Sf(){let i=[],e=0,t=[],n=[],s=[];function r(){e=0,t.length=0,n.length=0,s.length=0}function a(u,p,f,d,y,g){let m=i[e];return m===void 0?(m={id:u.id,object:u,geometry:p,material:f,groupOrder:d,renderOrder:u.renderOrder,z:y,group:g},i[e]=m):(m.id=u.id,m.object=u,m.geometry=p,m.material=f,m.groupOrder=d,m.renderOrder=u.renderOrder,m.z=y,m.group=g),e++,m}function o(u,p,f,d,y,g){let m=a(u,p,f,d,y,g);f.transmission>0?n.push(m):f.transparent===!0?s.push(m):t.push(m)}function l(u,p,f,d,y,g){let m=a(u,p,f,d,y,g);f.transmission>0?n.unshift(m):f.transparent===!0?s.unshift(m):t.unshift(m)}function c(u,p){t.length>1&&t.sort(u||d_),n.length>1&&n.sort(p||Mf),s.length>1&&s.sort(p||Mf)}function h(){for(let u=e,p=i.length;u<p;u++){let f=i[u];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:t,transmissive:n,transparent:s,init:r,push:o,unshift:l,finish:h,sort:c}}function f_(){let i=new WeakMap;function e(n,s){let r=i.get(n),a;return r===void 0?(a=new Sf,i.set(n,[a])):s>=r.length?(a=new Sf,r.push(a)):a=r[s],a}function t(){i=new WeakMap}return{get:e,dispose:t}}function p_(){let i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new D,color:new Ve};break;case"SpotLight":t={position:new D,direction:new D,color:new Ve,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new D,color:new Ve,distance:0,decay:0};break;case"HemisphereLight":t={direction:new D,skyColor:new Ve,groundColor:new Ve};break;case"RectAreaLight":t={color:new Ve,position:new D,halfWidth:new D,halfHeight:new D};break}return i[e.id]=t,t}}}function m_(){let i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ge};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ge};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ge,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}var g_=0;function y_(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function x_(i){let e=new p_,t=m_(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new D);let s=new D,r=new Ye,a=new Ye;function o(c){let h=0,u=0,p=0;for(let b=0;b<9;b++)n.probe[b].set(0,0,0);let f=0,d=0,y=0,g=0,m=0,S=0,_=0,x=0,C=0,w=0,A=0;c.sort(y_);for(let b=0,M=c.length;b<M;b++){let I=c[b],N=I.color,H=I.intensity,W=I.distance,L=I.shadow&&I.shadow.map?I.shadow.map.texture:null;if(I.isAmbientLight)h+=N.r*H,u+=N.g*H,p+=N.b*H;else if(I.isLightProbe){for(let z=0;z<9;z++)n.probe[z].addScaledVector(I.sh.coefficients[z],H);A++}else if(I.isDirectionalLight){let z=e.get(I);if(z.color.copy(I.color).multiplyScalar(I.intensity),I.castShadow){let $=I.shadow,k=t.get(I);k.shadowIntensity=$.intensity,k.shadowBias=$.bias,k.shadowNormalBias=$.normalBias,k.shadowRadius=$.radius,k.shadowMapSize=$.mapSize,n.directionalShadow[f]=k,n.directionalShadowMap[f]=L,n.directionalShadowMatrix[f]=I.shadow.matrix,S++}n.directional[f]=z,f++}else if(I.isSpotLight){let z=e.get(I);z.position.setFromMatrixPosition(I.matrixWorld),z.color.copy(N).multiplyScalar(H),z.distance=W,z.coneCos=Math.cos(I.angle),z.penumbraCos=Math.cos(I.angle*(1-I.penumbra)),z.decay=I.decay,n.spot[y]=z;let $=I.shadow;if(I.map&&(n.spotLightMap[C]=I.map,C++,$.updateMatrices(I),I.castShadow&&w++),n.spotLightMatrix[y]=$.matrix,I.castShadow){let k=t.get(I);k.shadowIntensity=$.intensity,k.shadowBias=$.bias,k.shadowNormalBias=$.normalBias,k.shadowRadius=$.radius,k.shadowMapSize=$.mapSize,n.spotShadow[y]=k,n.spotShadowMap[y]=L,x++}y++}else if(I.isRectAreaLight){let z=e.get(I);z.color.copy(N).multiplyScalar(H),z.halfWidth.set(I.width*.5,0,0),z.halfHeight.set(0,I.height*.5,0),n.rectArea[g]=z,g++}else if(I.isPointLight){let z=e.get(I);if(z.color.copy(I.color).multiplyScalar(I.intensity),z.distance=I.distance,z.decay=I.decay,I.castShadow){let $=I.shadow,k=t.get(I);k.shadowIntensity=$.intensity,k.shadowBias=$.bias,k.shadowNormalBias=$.normalBias,k.shadowRadius=$.radius,k.shadowMapSize=$.mapSize,k.shadowCameraNear=$.camera.near,k.shadowCameraFar=$.camera.far,n.pointShadow[d]=k,n.pointShadowMap[d]=L,n.pointShadowMatrix[d]=I.shadow.matrix,_++}n.point[d]=z,d++}else if(I.isHemisphereLight){let z=e.get(I);z.skyColor.copy(I.color).multiplyScalar(H),z.groundColor.copy(I.groundColor).multiplyScalar(H),n.hemi[m]=z,m++}}g>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=ye.LTC_FLOAT_1,n.rectAreaLTC2=ye.LTC_FLOAT_2):(n.rectAreaLTC1=ye.LTC_HALF_1,n.rectAreaLTC2=ye.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=u,n.ambient[2]=p;let R=n.hash;(R.directionalLength!==f||R.pointLength!==d||R.spotLength!==y||R.rectAreaLength!==g||R.hemiLength!==m||R.numDirectionalShadows!==S||R.numPointShadows!==_||R.numSpotShadows!==x||R.numSpotMaps!==C||R.numLightProbes!==A)&&(n.directional.length=f,n.spot.length=y,n.rectArea.length=g,n.point.length=d,n.hemi.length=m,n.directionalShadow.length=S,n.directionalShadowMap.length=S,n.pointShadow.length=_,n.pointShadowMap.length=_,n.spotShadow.length=x,n.spotShadowMap.length=x,n.directionalShadowMatrix.length=S,n.pointShadowMatrix.length=_,n.spotLightMatrix.length=x+C-w,n.spotLightMap.length=C,n.numSpotLightShadowsWithMaps=w,n.numLightProbes=A,R.directionalLength=f,R.pointLength=d,R.spotLength=y,R.rectAreaLength=g,R.hemiLength=m,R.numDirectionalShadows=S,R.numPointShadows=_,R.numSpotShadows=x,R.numSpotMaps=C,R.numLightProbes=A,n.version=g_++)}function l(c,h){let u=0,p=0,f=0,d=0,y=0,g=h.matrixWorldInverse;for(let m=0,S=c.length;m<S;m++){let _=c[m];if(_.isDirectionalLight){let x=n.directional[u];x.direction.setFromMatrixPosition(_.matrixWorld),s.setFromMatrixPosition(_.target.matrixWorld),x.direction.sub(s),x.direction.transformDirection(g),u++}else if(_.isSpotLight){let x=n.spot[f];x.position.setFromMatrixPosition(_.matrixWorld),x.position.applyMatrix4(g),x.direction.setFromMatrixPosition(_.matrixWorld),s.setFromMatrixPosition(_.target.matrixWorld),x.direction.sub(s),x.direction.transformDirection(g),f++}else if(_.isRectAreaLight){let x=n.rectArea[d];x.position.setFromMatrixPosition(_.matrixWorld),x.position.applyMatrix4(g),a.identity(),r.copy(_.matrixWorld),r.premultiply(g),a.extractRotation(r),x.halfWidth.set(_.width*.5,0,0),x.halfHeight.set(0,_.height*.5,0),x.halfWidth.applyMatrix4(a),x.halfHeight.applyMatrix4(a),d++}else if(_.isPointLight){let x=n.point[p];x.position.setFromMatrixPosition(_.matrixWorld),x.position.applyMatrix4(g),p++}else if(_.isHemisphereLight){let x=n.hemi[y];x.direction.setFromMatrixPosition(_.matrixWorld),x.direction.transformDirection(g),y++}}}return{setup:o,setupView:l,state:n}}function bf(i){let e=new x_(i),t=[],n=[];function s(h){c.camera=h,t.length=0,n.length=0}function r(h){t.push(h)}function a(h){n.push(h)}function o(){e.setup(t)}function l(h){e.setupView(t,h)}let c={lightsArray:t,shadowsArray:n,camera:null,lights:e,transmissionRenderTarget:{}};return{init:s,state:c,setupLights:o,setupLightsView:l,pushLight:r,pushShadow:a}}function __(i){let e=new WeakMap;function t(s,r=0){let a=e.get(s),o;return a===void 0?(o=new bf(i),e.set(s,[o])):r>=a.length?(o=new bf(i),a.push(o)):o=a[r],o}function n(){e=new WeakMap}return{get:t,dispose:n}}var v_=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,M_=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function S_(i,e,t){let n=new Ii,s=new ge,r=new ge,a=new yt,o=new Do({depthPacking:Nd}),l=new Uo,c={},h=t.maxTextureSize,u={[ri]:Vt,[Vt]:ri,[bn]:bn},p=new mn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ge},radius:{value:4}},vertexShader:v_,fragmentShader:M_}),f=p.clone();f.defines.HORIZONTAL_PASS=1;let d=new Mt;d.setAttribute("position",new At(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let y=new dt(d,p),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Qc;let m=this.type;this.render=function(w,A,R){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||w.length===0)return;let b=i.getRenderTarget(),M=i.getActiveCubeFace(),I=i.getActiveMipmapLevel(),N=i.state;N.setBlending(di),N.buffers.depth.getReversed()===!0?N.buffers.color.setClear(0,0,0,0):N.buffers.color.setClear(1,1,1,1),N.buffers.depth.setTest(!0),N.setScissorTest(!1);let H=m!==$n&&this.type===$n,W=m===$n&&this.type!==$n;for(let L=0,z=w.length;L<z;L++){let $=w[L],k=$.shadow;if(k===void 0){console.warn("THREE.WebGLShadowMap:",$,"has no shadow.");continue}if(k.autoUpdate===!1&&k.needsUpdate===!1)continue;s.copy(k.mapSize);let ie=k.getFrameExtents();if(s.multiply(ie),r.copy(k.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/ie.x),s.x=r.x*ie.x,k.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/ie.y),s.y=r.y*ie.y,k.mapSize.y=r.y)),k.map===null||H===!0||W===!0){let ce=this.type!==$n?{minFilter:rn,magFilter:rn}:{};k.map!==null&&k.map.dispose(),k.map=new Vn(s.x,s.y,ce),k.map.texture.name=$.name+".shadowMap",k.camera.updateProjectionMatrix()}i.setRenderTarget(k.map),i.clear();let Q=k.getViewportCount();for(let ce=0;ce<Q;ce++){let De=k.getViewport(ce);a.set(r.x*De.x,r.y*De.y,r.x*De.z,r.y*De.w),N.viewport(a),k.updateMatrices($,ce),n=k.getFrustum(),x(A,R,k.camera,$,this.type)}k.isPointLightShadow!==!0&&this.type===$n&&S(k,R),k.needsUpdate=!1}m=this.type,g.needsUpdate=!1,i.setRenderTarget(b,M,I)};function S(w,A){let R=e.update(y);p.defines.VSM_SAMPLES!==w.blurSamples&&(p.defines.VSM_SAMPLES=w.blurSamples,f.defines.VSM_SAMPLES=w.blurSamples,p.needsUpdate=!0,f.needsUpdate=!0),w.mapPass===null&&(w.mapPass=new Vn(s.x,s.y)),p.uniforms.shadow_pass.value=w.map.texture,p.uniforms.resolution.value=w.mapSize,p.uniforms.radius.value=w.radius,i.setRenderTarget(w.mapPass),i.clear(),i.renderBufferDirect(A,null,R,p,y,null),f.uniforms.shadow_pass.value=w.mapPass.texture,f.uniforms.resolution.value=w.mapSize,f.uniforms.radius.value=w.radius,i.setRenderTarget(w.map),i.clear(),i.renderBufferDirect(A,null,R,f,y,null)}function _(w,A,R,b){let M=null,I=R.isPointLight===!0?w.customDistanceMaterial:w.customDepthMaterial;if(I!==void 0)M=I;else if(M=R.isPointLight===!0?l:o,i.localClippingEnabled&&A.clipShadows===!0&&Array.isArray(A.clippingPlanes)&&A.clippingPlanes.length!==0||A.displacementMap&&A.displacementScale!==0||A.alphaMap&&A.alphaTest>0||A.map&&A.alphaTest>0||A.alphaToCoverage===!0){let N=M.uuid,H=A.uuid,W=c[N];W===void 0&&(W={},c[N]=W);let L=W[H];L===void 0&&(L=M.clone(),W[H]=L,A.addEventListener("dispose",C)),M=L}if(M.visible=A.visible,M.wireframe=A.wireframe,b===$n?M.side=A.shadowSide!==null?A.shadowSide:A.side:M.side=A.shadowSide!==null?A.shadowSide:u[A.side],M.alphaMap=A.alphaMap,M.alphaTest=A.alphaToCoverage===!0?.5:A.alphaTest,M.map=A.map,M.clipShadows=A.clipShadows,M.clippingPlanes=A.clippingPlanes,M.clipIntersection=A.clipIntersection,M.displacementMap=A.displacementMap,M.displacementScale=A.displacementScale,M.displacementBias=A.displacementBias,M.wireframeLinewidth=A.wireframeLinewidth,M.linewidth=A.linewidth,R.isPointLight===!0&&M.isMeshDistanceMaterial===!0){let N=i.properties.get(M);N.light=R}return M}function x(w,A,R,b,M){if(w.visible===!1)return;if(w.layers.test(A.layers)&&(w.isMesh||w.isLine||w.isPoints)&&(w.castShadow||w.receiveShadow&&M===$n)&&(!w.frustumCulled||n.intersectsObject(w))){w.modelViewMatrix.multiplyMatrices(R.matrixWorldInverse,w.matrixWorld);let H=e.update(w),W=w.material;if(Array.isArray(W)){let L=H.groups;for(let z=0,$=L.length;z<$;z++){let k=L[z],ie=W[k.materialIndex];if(ie&&ie.visible){let Q=_(w,ie,b,M);w.onBeforeShadow(i,w,A,R,H,Q,k),i.renderBufferDirect(R,null,H,Q,w,k),w.onAfterShadow(i,w,A,R,H,Q,k)}}}else if(W.visible){let L=_(w,W,b,M);w.onBeforeShadow(i,w,A,R,H,L,null),i.renderBufferDirect(R,null,H,L,w,null),w.onAfterShadow(i,w,A,R,H,L,null)}}let N=w.children;for(let H=0,W=N.length;H<W;H++)x(N[H],A,R,b,M)}function C(w){w.target.removeEventListener("dispose",C);for(let R in c){let b=c[R],M=w.target.uuid;M in b&&(b[M].dispose(),delete b[M])}}}var b_={[Wo]:Xo,[$o]:Zo,[qo]:Jo,[es]:Yo,[Xo]:Wo,[Zo]:$o,[Jo]:qo,[Yo]:es};function E_(i,e){function t(){let U=!1,le=new yt,me=null,Ee=new yt(0,0,0,0);return{setMask:function(ae){me!==ae&&!U&&(i.colorMask(ae,ae,ae,ae),me=ae)},setLocked:function(ae){U=ae},setClear:function(ae,j,Re,We,mt){mt===!0&&(ae*=We,j*=We,Re*=We),le.set(ae,j,Re,We),Ee.equals(le)===!1&&(i.clearColor(ae,j,Re,We),Ee.copy(le))},reset:function(){U=!1,me=null,Ee.set(-1,0,0,0)}}}function n(){let U=!1,le=!1,me=null,Ee=null,ae=null;return{setReversed:function(j){if(le!==j){let Re=e.get("EXT_clip_control");j?Re.clipControlEXT(Re.LOWER_LEFT_EXT,Re.ZERO_TO_ONE_EXT):Re.clipControlEXT(Re.LOWER_LEFT_EXT,Re.NEGATIVE_ONE_TO_ONE_EXT),le=j;let We=ae;ae=null,this.setClear(We)}},getReversed:function(){return le},setTest:function(j){j?ne(i.DEPTH_TEST):be(i.DEPTH_TEST)},setMask:function(j){me!==j&&!U&&(i.depthMask(j),me=j)},setFunc:function(j){if(le&&(j=b_[j]),Ee!==j){switch(j){case Wo:i.depthFunc(i.NEVER);break;case Xo:i.depthFunc(i.ALWAYS);break;case $o:i.depthFunc(i.LESS);break;case es:i.depthFunc(i.LEQUAL);break;case qo:i.depthFunc(i.EQUAL);break;case Yo:i.depthFunc(i.GEQUAL);break;case Zo:i.depthFunc(i.GREATER);break;case Jo:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}Ee=j}},setLocked:function(j){U=j},setClear:function(j){ae!==j&&(le&&(j=1-j),i.clearDepth(j),ae=j)},reset:function(){U=!1,me=null,Ee=null,ae=null,le=!1}}}function s(){let U=!1,le=null,me=null,Ee=null,ae=null,j=null,Re=null,We=null,mt=null;return{setTest:function(at){U||(at?ne(i.STENCIL_TEST):be(i.STENCIL_TEST))},setMask:function(at){le!==at&&!U&&(i.stencilMask(at),le=at)},setFunc:function(at,Kn,zn){(me!==at||Ee!==Kn||ae!==zn)&&(i.stencilFunc(at,Kn,zn),me=at,Ee=Kn,ae=zn)},setOp:function(at,Kn,zn){(j!==at||Re!==Kn||We!==zn)&&(i.stencilOp(at,Kn,zn),j=at,Re=Kn,We=zn)},setLocked:function(at){U=at},setClear:function(at){mt!==at&&(i.clearStencil(at),mt=at)},reset:function(){U=!1,le=null,me=null,Ee=null,ae=null,j=null,Re=null,We=null,mt=null}}}let r=new t,a=new n,o=new s,l=new WeakMap,c=new WeakMap,h={},u={},p=new WeakMap,f=[],d=null,y=!1,g=null,m=null,S=null,_=null,x=null,C=null,w=null,A=new Ve(0,0,0),R=0,b=!1,M=null,I=null,N=null,H=null,W=null,L=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS),z=!1,$=0,k=i.getParameter(i.VERSION);k.indexOf("WebGL")!==-1?($=parseFloat(/^WebGL (\d)/.exec(k)[1]),z=$>=1):k.indexOf("OpenGL ES")!==-1&&($=parseFloat(/^OpenGL ES (\d)/.exec(k)[1]),z=$>=2);let ie=null,Q={},ce=i.getParameter(i.SCISSOR_BOX),De=i.getParameter(i.VIEWPORT),ke=new yt().fromArray(ce),Ke=new yt().fromArray(De);function $e(U,le,me,Ee){let ae=new Uint8Array(4),j=i.createTexture();i.bindTexture(U,j),i.texParameteri(U,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(U,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Re=0;Re<me;Re++)U===i.TEXTURE_3D||U===i.TEXTURE_2D_ARRAY?i.texImage3D(le,0,i.RGBA,1,1,Ee,0,i.RGBA,i.UNSIGNED_BYTE,ae):i.texImage2D(le+Re,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,ae);return j}let Y={};Y[i.TEXTURE_2D]=$e(i.TEXTURE_2D,i.TEXTURE_2D,1),Y[i.TEXTURE_CUBE_MAP]=$e(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),Y[i.TEXTURE_2D_ARRAY]=$e(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),Y[i.TEXTURE_3D]=$e(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),ne(i.DEPTH_TEST),a.setFunc(es),J(!1),Z(jc),ne(i.CULL_FACE),te(di);function ne(U){h[U]!==!0&&(i.enable(U),h[U]=!0)}function be(U){h[U]!==!1&&(i.disable(U),h[U]=!1)}function Le(U,le){return u[U]!==le?(i.bindFramebuffer(U,le),u[U]=le,U===i.DRAW_FRAMEBUFFER&&(u[i.FRAMEBUFFER]=le),U===i.FRAMEBUFFER&&(u[i.DRAW_FRAMEBUFFER]=le),!0):!1}function Te(U,le){let me=f,Ee=!1;if(U){me=p.get(le),me===void 0&&(me=[],p.set(le,me));let ae=U.textures;if(me.length!==ae.length||me[0]!==i.COLOR_ATTACHMENT0){for(let j=0,Re=ae.length;j<Re;j++)me[j]=i.COLOR_ATTACHMENT0+j;me.length=ae.length,Ee=!0}}else me[0]!==i.BACK&&(me[0]=i.BACK,Ee=!0);Ee&&i.drawBuffers(me)}function et(U){return d!==U?(i.useProgram(U),d=U,!0):!1}let pt={[Ri]:i.FUNC_ADD,[sd]:i.FUNC_SUBTRACT,[rd]:i.FUNC_REVERSE_SUBTRACT};pt[ad]=i.MIN,pt[od]=i.MAX;let P={[ld]:i.ZERO,[cd]:i.ONE,[hd]:i.SRC_COLOR,[go]:i.SRC_ALPHA,[gd]:i.SRC_ALPHA_SATURATE,[pd]:i.DST_COLOR,[dd]:i.DST_ALPHA,[ud]:i.ONE_MINUS_SRC_COLOR,[yo]:i.ONE_MINUS_SRC_ALPHA,[md]:i.ONE_MINUS_DST_COLOR,[fd]:i.ONE_MINUS_DST_ALPHA,[yd]:i.CONSTANT_COLOR,[xd]:i.ONE_MINUS_CONSTANT_COLOR,[_d]:i.CONSTANT_ALPHA,[vd]:i.ONE_MINUS_CONSTANT_ALPHA};function te(U,le,me,Ee,ae,j,Re,We,mt,at){if(U===di){y===!0&&(be(i.BLEND),y=!1);return}if(y===!1&&(ne(i.BLEND),y=!0),U!==id){if(U!==g||at!==b){if((m!==Ri||x!==Ri)&&(i.blendEquation(i.FUNC_ADD),m=Ri,x=Ri),at)switch(U){case Qi:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case eh:i.blendFunc(i.ONE,i.ONE);break;case th:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case nh:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:console.error("THREE.WebGLState: Invalid blending: ",U);break}else switch(U){case Qi:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case eh:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case th:console.error("THREE.WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case nh:console.error("THREE.WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:console.error("THREE.WebGLState: Invalid blending: ",U);break}S=null,_=null,C=null,w=null,A.set(0,0,0),R=0,g=U,b=at}return}ae=ae||le,j=j||me,Re=Re||Ee,(le!==m||ae!==x)&&(i.blendEquationSeparate(pt[le],pt[ae]),m=le,x=ae),(me!==S||Ee!==_||j!==C||Re!==w)&&(i.blendFuncSeparate(P[me],P[Ee],P[j],P[Re]),S=me,_=Ee,C=j,w=Re),(We.equals(A)===!1||mt!==R)&&(i.blendColor(We.r,We.g,We.b,mt),A.copy(We),R=mt),g=U,b=!1}function K(U,le){U.side===bn?be(i.CULL_FACE):ne(i.CULL_FACE);let me=U.side===Vt;le&&(me=!me),J(me),U.blending===Qi&&U.transparent===!1?te(di):te(U.blending,U.blendEquation,U.blendSrc,U.blendDst,U.blendEquationAlpha,U.blendSrcAlpha,U.blendDstAlpha,U.blendColor,U.blendAlpha,U.premultipliedAlpha),a.setFunc(U.depthFunc),a.setTest(U.depthTest),a.setMask(U.depthWrite),r.setMask(U.colorWrite);let Ee=U.stencilWrite;o.setTest(Ee),Ee&&(o.setMask(U.stencilWriteMask),o.setFunc(U.stencilFunc,U.stencilRef,U.stencilFuncMask),o.setOp(U.stencilFail,U.stencilZFail,U.stencilZPass)),se(U.polygonOffset,U.polygonOffsetFactor,U.polygonOffsetUnits),U.alphaToCoverage===!0?ne(i.SAMPLE_ALPHA_TO_COVERAGE):be(i.SAMPLE_ALPHA_TO_COVERAGE)}function J(U){M!==U&&(U?i.frontFace(i.CW):i.frontFace(i.CCW),M=U)}function Z(U){U!==td?(ne(i.CULL_FACE),U!==I&&(U===jc?i.cullFace(i.BACK):U===nd?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):be(i.CULL_FACE),I=U}function de(U){U!==N&&(z&&i.lineWidth(U),N=U)}function se(U,le,me){U?(ne(i.POLYGON_OFFSET_FILL),(H!==le||W!==me)&&(i.polygonOffset(le,me),H=le,W=me)):be(i.POLYGON_OFFSET_FILL)}function fe(U){U?ne(i.SCISSOR_TEST):be(i.SCISSOR_TEST)}function Ge(U){U===void 0&&(U=i.TEXTURE0+L-1),ie!==U&&(i.activeTexture(U),ie=U)}function He(U,le,me){me===void 0&&(ie===null?me=i.TEXTURE0+L-1:me=ie);let Ee=Q[me];Ee===void 0&&(Ee={type:void 0,texture:void 0},Q[me]=Ee),(Ee.type!==U||Ee.texture!==le)&&(ie!==me&&(i.activeTexture(me),ie=me),i.bindTexture(U,le||Y[U]),Ee.type=U,Ee.texture=le)}function T(){let U=Q[ie];U!==void 0&&U.type!==void 0&&(i.bindTexture(U.type,null),U.type=void 0,U.texture=void 0)}function v(){try{i.compressedTexImage2D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function B(){try{i.compressedTexImage3D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function X(){try{i.texSubImage2D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function ee(){try{i.texSubImage3D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function q(){try{i.compressedTexSubImage2D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Ie(){try{i.compressedTexSubImage3D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function he(){try{i.texStorage2D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Ae(){try{i.texStorage3D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Ce(){try{i.texImage2D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function re(){try{i.texImage3D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function ve(U){ke.equals(U)===!1&&(i.scissor(U.x,U.y,U.z,U.w),ke.copy(U))}function Be(U){Ke.equals(U)===!1&&(i.viewport(U.x,U.y,U.z,U.w),Ke.copy(U))}function Pe(U,le){let me=c.get(le);me===void 0&&(me=new WeakMap,c.set(le,me));let Ee=me.get(U);Ee===void 0&&(Ee=i.getUniformBlockIndex(le,U.name),me.set(U,Ee))}function xe(U,le){let Ee=c.get(le).get(U);l.get(le)!==Ee&&(i.uniformBlockBinding(le,Ee,U.__bindingPointIndex),l.set(le,Ee))}function qe(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),a.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),h={},ie=null,Q={},u={},p=new WeakMap,f=[],d=null,y=!1,g=null,m=null,S=null,_=null,x=null,C=null,w=null,A=new Ve(0,0,0),R=0,b=!1,M=null,I=null,N=null,H=null,W=null,ke.set(0,0,i.canvas.width,i.canvas.height),Ke.set(0,0,i.canvas.width,i.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:ne,disable:be,bindFramebuffer:Le,drawBuffers:Te,useProgram:et,setBlending:te,setMaterial:K,setFlipSided:J,setCullFace:Z,setLineWidth:de,setPolygonOffset:se,setScissorTest:fe,activeTexture:Ge,bindTexture:He,unbindTexture:T,compressedTexImage2D:v,compressedTexImage3D:B,texImage2D:Ce,texImage3D:re,updateUBOMapping:Pe,uniformBlockBinding:xe,texStorage2D:he,texStorage3D:Ae,texSubImage2D:X,texSubImage3D:ee,compressedTexSubImage2D:q,compressedTexSubImage3D:Ie,scissor:ve,viewport:Be,reset:qe}}function w_(i,e,t,n,s,r,a){let o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new ge,h=new WeakMap,u,p=new WeakMap,f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function d(T,v){return f?new OffscreenCanvas(T,v):Fr("canvas")}function y(T,v,B){let X=1,ee=He(T);if((ee.width>B||ee.height>B)&&(X=B/Math.max(ee.width,ee.height)),X<1)if(typeof HTMLImageElement<"u"&&T instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&T instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&T instanceof ImageBitmap||typeof VideoFrame<"u"&&T instanceof VideoFrame){let q=Math.floor(X*ee.width),Ie=Math.floor(X*ee.height);u===void 0&&(u=d(q,Ie));let he=v?d(q,Ie):u;return he.width=q,he.height=Ie,he.getContext("2d").drawImage(T,0,0,q,Ie),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+ee.width+"x"+ee.height+") to ("+q+"x"+Ie+")."),he}else return"data"in T&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+ee.width+"x"+ee.height+")."),T;return T}function g(T){return T.generateMipmaps}function m(T){i.generateMipmap(T)}function S(T){return T.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:T.isWebGL3DRenderTarget?i.TEXTURE_3D:T.isWebGLArrayRenderTarget||T.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function _(T,v,B,X,ee=!1){if(T!==null){if(i[T]!==void 0)return i[T];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+T+"'")}let q=v;if(v===i.RED&&(B===i.FLOAT&&(q=i.R32F),B===i.HALF_FLOAT&&(q=i.R16F),B===i.UNSIGNED_BYTE&&(q=i.R8)),v===i.RED_INTEGER&&(B===i.UNSIGNED_BYTE&&(q=i.R8UI),B===i.UNSIGNED_SHORT&&(q=i.R16UI),B===i.UNSIGNED_INT&&(q=i.R32UI),B===i.BYTE&&(q=i.R8I),B===i.SHORT&&(q=i.R16I),B===i.INT&&(q=i.R32I)),v===i.RG&&(B===i.FLOAT&&(q=i.RG32F),B===i.HALF_FLOAT&&(q=i.RG16F),B===i.UNSIGNED_BYTE&&(q=i.RG8)),v===i.RG_INTEGER&&(B===i.UNSIGNED_BYTE&&(q=i.RG8UI),B===i.UNSIGNED_SHORT&&(q=i.RG16UI),B===i.UNSIGNED_INT&&(q=i.RG32UI),B===i.BYTE&&(q=i.RG8I),B===i.SHORT&&(q=i.RG16I),B===i.INT&&(q=i.RG32I)),v===i.RGB_INTEGER&&(B===i.UNSIGNED_BYTE&&(q=i.RGB8UI),B===i.UNSIGNED_SHORT&&(q=i.RGB16UI),B===i.UNSIGNED_INT&&(q=i.RGB32UI),B===i.BYTE&&(q=i.RGB8I),B===i.SHORT&&(q=i.RGB16I),B===i.INT&&(q=i.RGB32I)),v===i.RGBA_INTEGER&&(B===i.UNSIGNED_BYTE&&(q=i.RGBA8UI),B===i.UNSIGNED_SHORT&&(q=i.RGBA16UI),B===i.UNSIGNED_INT&&(q=i.RGBA32UI),B===i.BYTE&&(q=i.RGBA8I),B===i.SHORT&&(q=i.RGBA16I),B===i.INT&&(q=i.RGBA32I)),v===i.RGB&&(B===i.UNSIGNED_INT_5_9_9_9_REV&&(q=i.RGB9_E5),B===i.UNSIGNED_INT_10F_11F_11F_REV&&(q=i.R11F_G11F_B10F)),v===i.RGBA){let Ie=ee?Ur:st.getTransfer(X);B===i.FLOAT&&(q=i.RGBA32F),B===i.HALF_FLOAT&&(q=i.RGBA16F),B===i.UNSIGNED_BYTE&&(q=Ie===ot?i.SRGB8_ALPHA8:i.RGBA8),B===i.UNSIGNED_SHORT_4_4_4_4&&(q=i.RGBA4),B===i.UNSIGNED_SHORT_5_5_5_1&&(q=i.RGB5_A1)}return(q===i.R16F||q===i.R32F||q===i.RG16F||q===i.RG32F||q===i.RGBA16F||q===i.RGBA32F)&&e.get("EXT_color_buffer_float"),q}function x(T,v){let B;return T?v===null||v===Di||v===nr?B=i.DEPTH24_STENCIL8:v===En?B=i.DEPTH32F_STENCIL8:v===er&&(B=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):v===null||v===Di||v===nr?B=i.DEPTH_COMPONENT24:v===En?B=i.DEPTH_COMPONENT32F:v===er&&(B=i.DEPTH_COMPONENT16),B}function C(T,v){return g(T)===!0||T.isFramebufferTexture&&T.minFilter!==rn&&T.minFilter!==In?Math.log2(Math.max(v.width,v.height))+1:T.mipmaps!==void 0&&T.mipmaps.length>0?T.mipmaps.length:T.isCompressedTexture&&Array.isArray(T.image)?v.mipmaps.length:1}function w(T){let v=T.target;v.removeEventListener("dispose",w),R(v),v.isVideoTexture&&h.delete(v)}function A(T){let v=T.target;v.removeEventListener("dispose",A),M(v)}function R(T){let v=n.get(T);if(v.__webglInit===void 0)return;let B=T.source,X=p.get(B);if(X){let ee=X[v.__cacheKey];ee.usedTimes--,ee.usedTimes===0&&b(T),Object.keys(X).length===0&&p.delete(B)}n.remove(T)}function b(T){let v=n.get(T);i.deleteTexture(v.__webglTexture);let B=T.source,X=p.get(B);delete X[v.__cacheKey],a.memory.textures--}function M(T){let v=n.get(T);if(T.depthTexture&&(T.depthTexture.dispose(),n.remove(T.depthTexture)),T.isWebGLCubeRenderTarget)for(let X=0;X<6;X++){if(Array.isArray(v.__webglFramebuffer[X]))for(let ee=0;ee<v.__webglFramebuffer[X].length;ee++)i.deleteFramebuffer(v.__webglFramebuffer[X][ee]);else i.deleteFramebuffer(v.__webglFramebuffer[X]);v.__webglDepthbuffer&&i.deleteRenderbuffer(v.__webglDepthbuffer[X])}else{if(Array.isArray(v.__webglFramebuffer))for(let X=0;X<v.__webglFramebuffer.length;X++)i.deleteFramebuffer(v.__webglFramebuffer[X]);else i.deleteFramebuffer(v.__webglFramebuffer);if(v.__webglDepthbuffer&&i.deleteRenderbuffer(v.__webglDepthbuffer),v.__webglMultisampledFramebuffer&&i.deleteFramebuffer(v.__webglMultisampledFramebuffer),v.__webglColorRenderbuffer)for(let X=0;X<v.__webglColorRenderbuffer.length;X++)v.__webglColorRenderbuffer[X]&&i.deleteRenderbuffer(v.__webglColorRenderbuffer[X]);v.__webglDepthRenderbuffer&&i.deleteRenderbuffer(v.__webglDepthRenderbuffer)}let B=T.textures;for(let X=0,ee=B.length;X<ee;X++){let q=n.get(B[X]);q.__webglTexture&&(i.deleteTexture(q.__webglTexture),a.memory.textures--),n.remove(B[X])}n.remove(T)}let I=0;function N(){I=0}function H(){let T=I;return T>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+T+" texture units while this GPU supports only "+s.maxTextures),I+=1,T}function W(T){let v=[];return v.push(T.wrapS),v.push(T.wrapT),v.push(T.wrapR||0),v.push(T.magFilter),v.push(T.minFilter),v.push(T.anisotropy),v.push(T.internalFormat),v.push(T.format),v.push(T.type),v.push(T.generateMipmaps),v.push(T.premultiplyAlpha),v.push(T.flipY),v.push(T.unpackAlignment),v.push(T.colorSpace),v.join()}function L(T,v){let B=n.get(T);if(T.isVideoTexture&&fe(T),T.isRenderTargetTexture===!1&&T.isExternalTexture!==!0&&T.version>0&&B.__version!==T.version){let X=T.image;if(X===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(X.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{Y(B,T,v);return}}else T.isExternalTexture&&(B.__webglTexture=T.sourceTexture?T.sourceTexture:null);t.bindTexture(i.TEXTURE_2D,B.__webglTexture,i.TEXTURE0+v)}function z(T,v){let B=n.get(T);if(T.isRenderTargetTexture===!1&&T.version>0&&B.__version!==T.version){Y(B,T,v);return}t.bindTexture(i.TEXTURE_2D_ARRAY,B.__webglTexture,i.TEXTURE0+v)}function $(T,v){let B=n.get(T);if(T.isRenderTargetTexture===!1&&T.version>0&&B.__version!==T.version){Y(B,T,v);return}t.bindTexture(i.TEXTURE_3D,B.__webglTexture,i.TEXTURE0+v)}function k(T,v){let B=n.get(T);if(T.version>0&&B.__version!==T.version){ne(B,T,v);return}t.bindTexture(i.TEXTURE_CUBE_MAP,B.__webglTexture,i.TEXTURE0+v)}let ie={[xo]:i.REPEAT,[Ci]:i.CLAMP_TO_EDGE,[_o]:i.MIRRORED_REPEAT},Q={[rn]:i.NEAREST,[Id]:i.NEAREST_MIPMAP_NEAREST,[_a]:i.NEAREST_MIPMAP_LINEAR,[In]:i.LINEAR,[el]:i.LINEAR_MIPMAP_NEAREST,[Li]:i.LINEAR_MIPMAP_LINEAR},ce={[Od]:i.NEVER,[Gd]:i.ALWAYS,[Bd]:i.LESS,[fh]:i.LEQUAL,[zd]:i.EQUAL,[Vd]:i.GEQUAL,[kd]:i.GREATER,[Hd]:i.NOTEQUAL};function De(T,v){if(v.type===En&&e.has("OES_texture_float_linear")===!1&&(v.magFilter===In||v.magFilter===el||v.magFilter===_a||v.magFilter===Li||v.minFilter===In||v.minFilter===el||v.minFilter===_a||v.minFilter===Li)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(T,i.TEXTURE_WRAP_S,ie[v.wrapS]),i.texParameteri(T,i.TEXTURE_WRAP_T,ie[v.wrapT]),(T===i.TEXTURE_3D||T===i.TEXTURE_2D_ARRAY)&&i.texParameteri(T,i.TEXTURE_WRAP_R,ie[v.wrapR]),i.texParameteri(T,i.TEXTURE_MAG_FILTER,Q[v.magFilter]),i.texParameteri(T,i.TEXTURE_MIN_FILTER,Q[v.minFilter]),v.compareFunction&&(i.texParameteri(T,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(T,i.TEXTURE_COMPARE_FUNC,ce[v.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(v.magFilter===rn||v.minFilter!==_a&&v.minFilter!==Li||v.type===En&&e.has("OES_texture_float_linear")===!1)return;if(v.anisotropy>1||n.get(v).__currentAnisotropy){let B=e.get("EXT_texture_filter_anisotropic");i.texParameterf(T,B.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(v.anisotropy,s.getMaxAnisotropy())),n.get(v).__currentAnisotropy=v.anisotropy}}}function ke(T,v){let B=!1;T.__webglInit===void 0&&(T.__webglInit=!0,v.addEventListener("dispose",w));let X=v.source,ee=p.get(X);ee===void 0&&(ee={},p.set(X,ee));let q=W(v);if(q!==T.__cacheKey){ee[q]===void 0&&(ee[q]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,B=!0),ee[q].usedTimes++;let Ie=ee[T.__cacheKey];Ie!==void 0&&(ee[T.__cacheKey].usedTimes--,Ie.usedTimes===0&&b(v)),T.__cacheKey=q,T.__webglTexture=ee[q].texture}return B}function Ke(T,v,B){return Math.floor(Math.floor(T/B)/v)}function $e(T,v,B,X){let q=T.updateRanges;if(q.length===0)t.texSubImage2D(i.TEXTURE_2D,0,0,0,v.width,v.height,B,X,v.data);else{q.sort((re,ve)=>re.start-ve.start);let Ie=0;for(let re=1;re<q.length;re++){let ve=q[Ie],Be=q[re],Pe=ve.start+ve.count,xe=Ke(Be.start,v.width,4),qe=Ke(ve.start,v.width,4);Be.start<=Pe+1&&xe===qe&&Ke(Be.start+Be.count-1,v.width,4)===xe?ve.count=Math.max(ve.count,Be.start+Be.count-ve.start):(++Ie,q[Ie]=Be)}q.length=Ie+1;let he=i.getParameter(i.UNPACK_ROW_LENGTH),Ae=i.getParameter(i.UNPACK_SKIP_PIXELS),Ce=i.getParameter(i.UNPACK_SKIP_ROWS);i.pixelStorei(i.UNPACK_ROW_LENGTH,v.width);for(let re=0,ve=q.length;re<ve;re++){let Be=q[re],Pe=Math.floor(Be.start/4),xe=Math.ceil(Be.count/4),qe=Pe%v.width,U=Math.floor(Pe/v.width),le=xe,me=1;i.pixelStorei(i.UNPACK_SKIP_PIXELS,qe),i.pixelStorei(i.UNPACK_SKIP_ROWS,U),t.texSubImage2D(i.TEXTURE_2D,0,qe,U,le,me,B,X,v.data)}T.clearUpdateRanges(),i.pixelStorei(i.UNPACK_ROW_LENGTH,he),i.pixelStorei(i.UNPACK_SKIP_PIXELS,Ae),i.pixelStorei(i.UNPACK_SKIP_ROWS,Ce)}}function Y(T,v,B){let X=i.TEXTURE_2D;(v.isDataArrayTexture||v.isCompressedArrayTexture)&&(X=i.TEXTURE_2D_ARRAY),v.isData3DTexture&&(X=i.TEXTURE_3D);let ee=ke(T,v),q=v.source;t.bindTexture(X,T.__webglTexture,i.TEXTURE0+B);let Ie=n.get(q);if(q.version!==Ie.__version||ee===!0){t.activeTexture(i.TEXTURE0+B);let he=st.getPrimaries(st.workingColorSpace),Ae=v.colorSpace===pi?null:st.getPrimaries(v.colorSpace),Ce=v.colorSpace===pi||he===Ae?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,v.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,v.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ce);let re=y(v.image,!1,s.maxTextureSize);re=Ge(v,re);let ve=r.convert(v.format,v.colorSpace),Be=r.convert(v.type),Pe=_(v.internalFormat,ve,Be,v.colorSpace,v.isVideoTexture);De(X,v);let xe,qe=v.mipmaps,U=v.isVideoTexture!==!0,le=Ie.__version===void 0||ee===!0,me=q.dataReady,Ee=C(v,re);if(v.isDepthTexture)Pe=x(v.format===ir,v.type),le&&(U?t.texStorage2D(i.TEXTURE_2D,1,Pe,re.width,re.height):t.texImage2D(i.TEXTURE_2D,0,Pe,re.width,re.height,0,ve,Be,null));else if(v.isDataTexture)if(qe.length>0){U&&le&&t.texStorage2D(i.TEXTURE_2D,Ee,Pe,qe[0].width,qe[0].height);for(let ae=0,j=qe.length;ae<j;ae++)xe=qe[ae],U?me&&t.texSubImage2D(i.TEXTURE_2D,ae,0,0,xe.width,xe.height,ve,Be,xe.data):t.texImage2D(i.TEXTURE_2D,ae,Pe,xe.width,xe.height,0,ve,Be,xe.data);v.generateMipmaps=!1}else U?(le&&t.texStorage2D(i.TEXTURE_2D,Ee,Pe,re.width,re.height),me&&$e(v,re,ve,Be)):t.texImage2D(i.TEXTURE_2D,0,Pe,re.width,re.height,0,ve,Be,re.data);else if(v.isCompressedTexture)if(v.isCompressedArrayTexture){U&&le&&t.texStorage3D(i.TEXTURE_2D_ARRAY,Ee,Pe,qe[0].width,qe[0].height,re.depth);for(let ae=0,j=qe.length;ae<j;ae++)if(xe=qe[ae],v.format!==xn)if(ve!==null)if(U){if(me)if(v.layerUpdates.size>0){let Re=Mh(xe.width,xe.height,v.format,v.type);for(let We of v.layerUpdates){let mt=xe.data.subarray(We*Re/xe.data.BYTES_PER_ELEMENT,(We+1)*Re/xe.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,ae,0,0,We,xe.width,xe.height,1,ve,mt)}v.clearLayerUpdates()}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,ae,0,0,0,xe.width,xe.height,re.depth,ve,xe.data)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,ae,Pe,xe.width,xe.height,re.depth,0,xe.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else U?me&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,ae,0,0,0,xe.width,xe.height,re.depth,ve,Be,xe.data):t.texImage3D(i.TEXTURE_2D_ARRAY,ae,Pe,xe.width,xe.height,re.depth,0,ve,Be,xe.data)}else{U&&le&&t.texStorage2D(i.TEXTURE_2D,Ee,Pe,qe[0].width,qe[0].height);for(let ae=0,j=qe.length;ae<j;ae++)xe=qe[ae],v.format!==xn?ve!==null?U?me&&t.compressedTexSubImage2D(i.TEXTURE_2D,ae,0,0,xe.width,xe.height,ve,xe.data):t.compressedTexImage2D(i.TEXTURE_2D,ae,Pe,xe.width,xe.height,0,xe.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):U?me&&t.texSubImage2D(i.TEXTURE_2D,ae,0,0,xe.width,xe.height,ve,Be,xe.data):t.texImage2D(i.TEXTURE_2D,ae,Pe,xe.width,xe.height,0,ve,Be,xe.data)}else if(v.isDataArrayTexture)if(U){if(le&&t.texStorage3D(i.TEXTURE_2D_ARRAY,Ee,Pe,re.width,re.height,re.depth),me)if(v.layerUpdates.size>0){let ae=Mh(re.width,re.height,v.format,v.type);for(let j of v.layerUpdates){let Re=re.data.subarray(j*ae/re.data.BYTES_PER_ELEMENT,(j+1)*ae/re.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,j,re.width,re.height,1,ve,Be,Re)}v.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,re.width,re.height,re.depth,ve,Be,re.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,Pe,re.width,re.height,re.depth,0,ve,Be,re.data);else if(v.isData3DTexture)U?(le&&t.texStorage3D(i.TEXTURE_3D,Ee,Pe,re.width,re.height,re.depth),me&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,re.width,re.height,re.depth,ve,Be,re.data)):t.texImage3D(i.TEXTURE_3D,0,Pe,re.width,re.height,re.depth,0,ve,Be,re.data);else if(v.isFramebufferTexture){if(le)if(U)t.texStorage2D(i.TEXTURE_2D,Ee,Pe,re.width,re.height);else{let ae=re.width,j=re.height;for(let Re=0;Re<Ee;Re++)t.texImage2D(i.TEXTURE_2D,Re,Pe,ae,j,0,ve,Be,null),ae>>=1,j>>=1}}else if(qe.length>0){if(U&&le){let ae=He(qe[0]);t.texStorage2D(i.TEXTURE_2D,Ee,Pe,ae.width,ae.height)}for(let ae=0,j=qe.length;ae<j;ae++)xe=qe[ae],U?me&&t.texSubImage2D(i.TEXTURE_2D,ae,0,0,ve,Be,xe):t.texImage2D(i.TEXTURE_2D,ae,Pe,ve,Be,xe);v.generateMipmaps=!1}else if(U){if(le){let ae=He(re);t.texStorage2D(i.TEXTURE_2D,Ee,Pe,ae.width,ae.height)}me&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,ve,Be,re)}else t.texImage2D(i.TEXTURE_2D,0,Pe,ve,Be,re);g(v)&&m(X),Ie.__version=q.version,v.onUpdate&&v.onUpdate(v)}T.__version=v.version}function ne(T,v,B){if(v.image.length!==6)return;let X=ke(T,v),ee=v.source;t.bindTexture(i.TEXTURE_CUBE_MAP,T.__webglTexture,i.TEXTURE0+B);let q=n.get(ee);if(ee.version!==q.__version||X===!0){t.activeTexture(i.TEXTURE0+B);let Ie=st.getPrimaries(st.workingColorSpace),he=v.colorSpace===pi?null:st.getPrimaries(v.colorSpace),Ae=v.colorSpace===pi||Ie===he?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,v.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,v.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ae);let Ce=v.isCompressedTexture||v.image[0].isCompressedTexture,re=v.image[0]&&v.image[0].isDataTexture,ve=[];for(let j=0;j<6;j++)!Ce&&!re?ve[j]=y(v.image[j],!0,s.maxCubemapSize):ve[j]=re?v.image[j].image:v.image[j],ve[j]=Ge(v,ve[j]);let Be=ve[0],Pe=r.convert(v.format,v.colorSpace),xe=r.convert(v.type),qe=_(v.internalFormat,Pe,xe,v.colorSpace),U=v.isVideoTexture!==!0,le=q.__version===void 0||X===!0,me=ee.dataReady,Ee=C(v,Be);De(i.TEXTURE_CUBE_MAP,v);let ae;if(Ce){U&&le&&t.texStorage2D(i.TEXTURE_CUBE_MAP,Ee,qe,Be.width,Be.height);for(let j=0;j<6;j++){ae=ve[j].mipmaps;for(let Re=0;Re<ae.length;Re++){let We=ae[Re];v.format!==xn?Pe!==null?U?me&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,Re,0,0,We.width,We.height,Pe,We.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,Re,qe,We.width,We.height,0,We.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):U?me&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,Re,0,0,We.width,We.height,Pe,xe,We.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,Re,qe,We.width,We.height,0,Pe,xe,We.data)}}}else{if(ae=v.mipmaps,U&&le){ae.length>0&&Ee++;let j=He(ve[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,Ee,qe,j.width,j.height)}for(let j=0;j<6;j++)if(re){U?me&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,0,0,ve[j].width,ve[j].height,Pe,xe,ve[j].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,qe,ve[j].width,ve[j].height,0,Pe,xe,ve[j].data);for(let Re=0;Re<ae.length;Re++){let mt=ae[Re].image[j].image;U?me&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,Re+1,0,0,mt.width,mt.height,Pe,xe,mt.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,Re+1,qe,mt.width,mt.height,0,Pe,xe,mt.data)}}else{U?me&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,0,0,Pe,xe,ve[j]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,qe,Pe,xe,ve[j]);for(let Re=0;Re<ae.length;Re++){let We=ae[Re];U?me&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,Re+1,0,0,Pe,xe,We.image[j]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,Re+1,qe,Pe,xe,We.image[j])}}}g(v)&&m(i.TEXTURE_CUBE_MAP),q.__version=ee.version,v.onUpdate&&v.onUpdate(v)}T.__version=v.version}function be(T,v,B,X,ee,q){let Ie=r.convert(B.format,B.colorSpace),he=r.convert(B.type),Ae=_(B.internalFormat,Ie,he,B.colorSpace),Ce=n.get(v),re=n.get(B);if(re.__renderTarget=v,!Ce.__hasExternalTextures){let ve=Math.max(1,v.width>>q),Be=Math.max(1,v.height>>q);ee===i.TEXTURE_3D||ee===i.TEXTURE_2D_ARRAY?t.texImage3D(ee,q,Ae,ve,Be,v.depth,0,Ie,he,null):t.texImage2D(ee,q,Ae,ve,Be,0,Ie,he,null)}t.bindFramebuffer(i.FRAMEBUFFER,T),se(v)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,X,ee,re.__webglTexture,0,de(v)):(ee===i.TEXTURE_2D||ee>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&ee<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,X,ee,re.__webglTexture,q),t.bindFramebuffer(i.FRAMEBUFFER,null)}function Le(T,v,B){if(i.bindRenderbuffer(i.RENDERBUFFER,T),v.depthBuffer){let X=v.depthTexture,ee=X&&X.isDepthTexture?X.type:null,q=x(v.stencilBuffer,ee),Ie=v.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,he=de(v);se(v)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,he,q,v.width,v.height):B?i.renderbufferStorageMultisample(i.RENDERBUFFER,he,q,v.width,v.height):i.renderbufferStorage(i.RENDERBUFFER,q,v.width,v.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,Ie,i.RENDERBUFFER,T)}else{let X=v.textures;for(let ee=0;ee<X.length;ee++){let q=X[ee],Ie=r.convert(q.format,q.colorSpace),he=r.convert(q.type),Ae=_(q.internalFormat,Ie,he,q.colorSpace),Ce=de(v);B&&se(v)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,Ce,Ae,v.width,v.height):se(v)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Ce,Ae,v.width,v.height):i.renderbufferStorage(i.RENDERBUFFER,Ae,v.width,v.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function Te(T,v){if(v&&v.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(i.FRAMEBUFFER,T),!(v.depthTexture&&v.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");let X=n.get(v.depthTexture);X.__renderTarget=v,(!X.__webglTexture||v.depthTexture.image.width!==v.width||v.depthTexture.image.height!==v.height)&&(v.depthTexture.image.width=v.width,v.depthTexture.image.height=v.height,v.depthTexture.needsUpdate=!0),L(v.depthTexture,0);let ee=X.__webglTexture,q=de(v);if(v.depthTexture.format===Hs)se(v)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,ee,0,q):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,ee,0);else if(v.depthTexture.format===ir)se(v)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,ee,0,q):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,ee,0);else throw new Error("Unknown depthTexture format")}function et(T){let v=n.get(T),B=T.isWebGLCubeRenderTarget===!0;if(v.__boundDepthTexture!==T.depthTexture){let X=T.depthTexture;if(v.__depthDisposeCallback&&v.__depthDisposeCallback(),X){let ee=()=>{delete v.__boundDepthTexture,delete v.__depthDisposeCallback,X.removeEventListener("dispose",ee)};X.addEventListener("dispose",ee),v.__depthDisposeCallback=ee}v.__boundDepthTexture=X}if(T.depthTexture&&!v.__autoAllocateDepthBuffer){if(B)throw new Error("target.depthTexture not supported in Cube render targets");let X=T.texture.mipmaps;X&&X.length>0?Te(v.__webglFramebuffer[0],T):Te(v.__webglFramebuffer,T)}else if(B){v.__webglDepthbuffer=[];for(let X=0;X<6;X++)if(t.bindFramebuffer(i.FRAMEBUFFER,v.__webglFramebuffer[X]),v.__webglDepthbuffer[X]===void 0)v.__webglDepthbuffer[X]=i.createRenderbuffer(),Le(v.__webglDepthbuffer[X],T,!1);else{let ee=T.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,q=v.__webglDepthbuffer[X];i.bindRenderbuffer(i.RENDERBUFFER,q),i.framebufferRenderbuffer(i.FRAMEBUFFER,ee,i.RENDERBUFFER,q)}}else{let X=T.texture.mipmaps;if(X&&X.length>0?t.bindFramebuffer(i.FRAMEBUFFER,v.__webglFramebuffer[0]):t.bindFramebuffer(i.FRAMEBUFFER,v.__webglFramebuffer),v.__webglDepthbuffer===void 0)v.__webglDepthbuffer=i.createRenderbuffer(),Le(v.__webglDepthbuffer,T,!1);else{let ee=T.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,q=v.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,q),i.framebufferRenderbuffer(i.FRAMEBUFFER,ee,i.RENDERBUFFER,q)}}t.bindFramebuffer(i.FRAMEBUFFER,null)}function pt(T,v,B){let X=n.get(T);v!==void 0&&be(X.__webglFramebuffer,T,T.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),B!==void 0&&et(T)}function P(T){let v=T.texture,B=n.get(T),X=n.get(v);T.addEventListener("dispose",A);let ee=T.textures,q=T.isWebGLCubeRenderTarget===!0,Ie=ee.length>1;if(Ie||(X.__webglTexture===void 0&&(X.__webglTexture=i.createTexture()),X.__version=v.version,a.memory.textures++),q){B.__webglFramebuffer=[];for(let he=0;he<6;he++)if(v.mipmaps&&v.mipmaps.length>0){B.__webglFramebuffer[he]=[];for(let Ae=0;Ae<v.mipmaps.length;Ae++)B.__webglFramebuffer[he][Ae]=i.createFramebuffer()}else B.__webglFramebuffer[he]=i.createFramebuffer()}else{if(v.mipmaps&&v.mipmaps.length>0){B.__webglFramebuffer=[];for(let he=0;he<v.mipmaps.length;he++)B.__webglFramebuffer[he]=i.createFramebuffer()}else B.__webglFramebuffer=i.createFramebuffer();if(Ie)for(let he=0,Ae=ee.length;he<Ae;he++){let Ce=n.get(ee[he]);Ce.__webglTexture===void 0&&(Ce.__webglTexture=i.createTexture(),a.memory.textures++)}if(T.samples>0&&se(T)===!1){B.__webglMultisampledFramebuffer=i.createFramebuffer(),B.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,B.__webglMultisampledFramebuffer);for(let he=0;he<ee.length;he++){let Ae=ee[he];B.__webglColorRenderbuffer[he]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,B.__webglColorRenderbuffer[he]);let Ce=r.convert(Ae.format,Ae.colorSpace),re=r.convert(Ae.type),ve=_(Ae.internalFormat,Ce,re,Ae.colorSpace,T.isXRRenderTarget===!0),Be=de(T);i.renderbufferStorageMultisample(i.RENDERBUFFER,Be,ve,T.width,T.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+he,i.RENDERBUFFER,B.__webglColorRenderbuffer[he])}i.bindRenderbuffer(i.RENDERBUFFER,null),T.depthBuffer&&(B.__webglDepthRenderbuffer=i.createRenderbuffer(),Le(B.__webglDepthRenderbuffer,T,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(q){t.bindTexture(i.TEXTURE_CUBE_MAP,X.__webglTexture),De(i.TEXTURE_CUBE_MAP,v);for(let he=0;he<6;he++)if(v.mipmaps&&v.mipmaps.length>0)for(let Ae=0;Ae<v.mipmaps.length;Ae++)be(B.__webglFramebuffer[he][Ae],T,v,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+he,Ae);else be(B.__webglFramebuffer[he],T,v,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+he,0);g(v)&&m(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(Ie){for(let he=0,Ae=ee.length;he<Ae;he++){let Ce=ee[he],re=n.get(Ce),ve=i.TEXTURE_2D;(T.isWebGL3DRenderTarget||T.isWebGLArrayRenderTarget)&&(ve=T.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(ve,re.__webglTexture),De(ve,Ce),be(B.__webglFramebuffer,T,Ce,i.COLOR_ATTACHMENT0+he,ve,0),g(Ce)&&m(ve)}t.unbindTexture()}else{let he=i.TEXTURE_2D;if((T.isWebGL3DRenderTarget||T.isWebGLArrayRenderTarget)&&(he=T.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(he,X.__webglTexture),De(he,v),v.mipmaps&&v.mipmaps.length>0)for(let Ae=0;Ae<v.mipmaps.length;Ae++)be(B.__webglFramebuffer[Ae],T,v,i.COLOR_ATTACHMENT0,he,Ae);else be(B.__webglFramebuffer,T,v,i.COLOR_ATTACHMENT0,he,0);g(v)&&m(he),t.unbindTexture()}T.depthBuffer&&et(T)}function te(T){let v=T.textures;for(let B=0,X=v.length;B<X;B++){let ee=v[B];if(g(ee)){let q=S(T),Ie=n.get(ee).__webglTexture;t.bindTexture(q,Ie),m(q),t.unbindTexture()}}}let K=[],J=[];function Z(T){if(T.samples>0){if(se(T)===!1){let v=T.textures,B=T.width,X=T.height,ee=i.COLOR_BUFFER_BIT,q=T.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Ie=n.get(T),he=v.length>1;if(he)for(let Ce=0;Ce<v.length;Ce++)t.bindFramebuffer(i.FRAMEBUFFER,Ie.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Ce,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,Ie.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Ce,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,Ie.__webglMultisampledFramebuffer);let Ae=T.texture.mipmaps;Ae&&Ae.length>0?t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Ie.__webglFramebuffer[0]):t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Ie.__webglFramebuffer);for(let Ce=0;Ce<v.length;Ce++){if(T.resolveDepthBuffer&&(T.depthBuffer&&(ee|=i.DEPTH_BUFFER_BIT),T.stencilBuffer&&T.resolveStencilBuffer&&(ee|=i.STENCIL_BUFFER_BIT)),he){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,Ie.__webglColorRenderbuffer[Ce]);let re=n.get(v[Ce]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,re,0)}i.blitFramebuffer(0,0,B,X,0,0,B,X,ee,i.NEAREST),l===!0&&(K.length=0,J.length=0,K.push(i.COLOR_ATTACHMENT0+Ce),T.depthBuffer&&T.resolveDepthBuffer===!1&&(K.push(q),J.push(q),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,J)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,K))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),he)for(let Ce=0;Ce<v.length;Ce++){t.bindFramebuffer(i.FRAMEBUFFER,Ie.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Ce,i.RENDERBUFFER,Ie.__webglColorRenderbuffer[Ce]);let re=n.get(v[Ce]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,Ie.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Ce,i.TEXTURE_2D,re,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Ie.__webglMultisampledFramebuffer)}else if(T.depthBuffer&&T.resolveDepthBuffer===!1&&l){let v=T.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[v])}}}function de(T){return Math.min(s.maxSamples,T.samples)}function se(T){let v=n.get(T);return T.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&v.__useRenderToTexture!==!1}function fe(T){let v=a.render.frame;h.get(T)!==v&&(h.set(T,v),T.update())}function Ge(T,v){let B=T.colorSpace,X=T.format,ee=T.type;return T.isCompressedTexture===!0||T.isVideoTexture===!0||B!==ts&&B!==pi&&(st.getTransfer(B)===ot?(X!==xn||ee!==Fn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",B)),v}function He(T){return typeof HTMLImageElement<"u"&&T instanceof HTMLImageElement?(c.width=T.naturalWidth||T.width,c.height=T.naturalHeight||T.height):typeof VideoFrame<"u"&&T instanceof VideoFrame?(c.width=T.displayWidth,c.height=T.displayHeight):(c.width=T.width,c.height=T.height),c}this.allocateTextureUnit=H,this.resetTextureUnits=N,this.setTexture2D=L,this.setTexture2DArray=z,this.setTexture3D=$,this.setTextureCube=k,this.rebindTextures=pt,this.setupRenderTarget=P,this.updateRenderTargetMipmap=te,this.updateMultisampleRenderTarget=Z,this.setupDepthRenderbuffer=et,this.setupFrameBufferTexture=be,this.useMultisampledRTT=se}function T_(i,e){function t(n,s=pi){let r,a=st.getTransfer(s);if(n===Fn)return i.UNSIGNED_BYTE;if(n===nl)return i.UNSIGNED_SHORT_4_4_4_4;if(n===il)return i.UNSIGNED_SHORT_5_5_5_1;if(n===oh)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===lh)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===rh)return i.BYTE;if(n===ah)return i.SHORT;if(n===er)return i.UNSIGNED_SHORT;if(n===tl)return i.INT;if(n===Di)return i.UNSIGNED_INT;if(n===En)return i.FLOAT;if(n===tr)return i.HALF_FLOAT;if(n===ch)return i.ALPHA;if(n===hh)return i.RGB;if(n===xn)return i.RGBA;if(n===Hs)return i.DEPTH_COMPONENT;if(n===ir)return i.DEPTH_STENCIL;if(n===sl)return i.RED;if(n===rl)return i.RED_INTEGER;if(n===uh)return i.RG;if(n===al)return i.RG_INTEGER;if(n===ol)return i.RGBA_INTEGER;if(n===va||n===Ma||n===Sa||n===ba)if(a===ot)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===va)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Ma)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Sa)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===ba)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===va)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Ma)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Sa)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===ba)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===ll||n===cl||n===hl||n===ul)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===ll)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===cl)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===hl)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===ul)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===dl||n===fl||n===pl)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(n===dl||n===fl)return a===ot?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===pl)return a===ot?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===ml||n===gl||n===yl||n===xl||n===_l||n===vl||n===Ml||n===Sl||n===bl||n===El||n===wl||n===Tl||n===Al||n===Cl)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(n===ml)return a===ot?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===gl)return a===ot?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===yl)return a===ot?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===xl)return a===ot?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===_l)return a===ot?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===vl)return a===ot?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Ml)return a===ot?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Sl)return a===ot?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===bl)return a===ot?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===El)return a===ot?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===wl)return a===ot?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Tl)return a===ot?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Al)return a===ot?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Cl)return a===ot?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Rl||n===Il||n===Pl)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(n===Rl)return a===ot?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Il)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Pl)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Ll||n===Dl||n===Ul||n===Nl)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(n===Ll)return r.COMPRESSED_RED_RGTC1_EXT;if(n===Dl)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Ul)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Nl)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===nr?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:t}}var A_=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,C_=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,Uh=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let n=new jr(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,n=new mn({vertexShader:A_,fragmentShader:C_,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new dt(new ha(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},Nh=class extends Hn{constructor(e,t){super();let n=this,s=null,r=1,a=null,o="local-floor",l=1,c=null,h=null,u=null,p=null,f=null,d=null,y=typeof XRWebGLBinding<"u",g=new Uh,m={},S=t.getContextAttributes(),_=null,x=null,C=[],w=[],A=new ge,R=null,b=new qt;b.viewport=new yt;let M=new qt;M.viewport=new yt;let I=[b,M],N=new ko,H=null,W=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Y){let ne=C[Y];return ne===void 0&&(ne=new $s,C[Y]=ne),ne.getTargetRaySpace()},this.getControllerGrip=function(Y){let ne=C[Y];return ne===void 0&&(ne=new $s,C[Y]=ne),ne.getGripSpace()},this.getHand=function(Y){let ne=C[Y];return ne===void 0&&(ne=new $s,C[Y]=ne),ne.getHandSpace()};function L(Y){let ne=w.indexOf(Y.inputSource);if(ne===-1)return;let be=C[ne];be!==void 0&&(be.update(Y.inputSource,Y.frame,c||a),be.dispatchEvent({type:Y.type,data:Y.inputSource}))}function z(){s.removeEventListener("select",L),s.removeEventListener("selectstart",L),s.removeEventListener("selectend",L),s.removeEventListener("squeeze",L),s.removeEventListener("squeezestart",L),s.removeEventListener("squeezeend",L),s.removeEventListener("end",z),s.removeEventListener("inputsourceschange",$);for(let Y=0;Y<C.length;Y++){let ne=w[Y];ne!==null&&(w[Y]=null,C[Y].disconnect(ne))}H=null,W=null,g.reset();for(let Y in m)delete m[Y];e.setRenderTarget(_),f=null,p=null,u=null,s=null,x=null,$e.stop(),n.isPresenting=!1,e.setPixelRatio(R),e.setSize(A.width,A.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Y){r=Y,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Y){o=Y,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(Y){c=Y},this.getBaseLayer=function(){return p!==null?p:f},this.getBinding=function(){return u===null&&y&&(u=new XRWebGLBinding(s,t)),u},this.getFrame=function(){return d},this.getSession=function(){return s},this.setSession=async function(Y){if(s=Y,s!==null){if(_=e.getRenderTarget(),s.addEventListener("select",L),s.addEventListener("selectstart",L),s.addEventListener("selectend",L),s.addEventListener("squeeze",L),s.addEventListener("squeezestart",L),s.addEventListener("squeezeend",L),s.addEventListener("end",z),s.addEventListener("inputsourceschange",$),S.xrCompatible!==!0&&await t.makeXRCompatible(),R=e.getPixelRatio(),e.getSize(A),y&&"createProjectionLayer"in XRWebGLBinding.prototype){let be=null,Le=null,Te=null;S.depth&&(Te=S.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,be=S.stencil?ir:Hs,Le=S.stencil?nr:Di);let et={colorFormat:t.RGBA8,depthFormat:Te,scaleFactor:r};u=this.getBinding(),p=u.createProjectionLayer(et),s.updateRenderState({layers:[p]}),e.setPixelRatio(1),e.setSize(p.textureWidth,p.textureHeight,!1),x=new Vn(p.textureWidth,p.textureHeight,{format:xn,type:Fn,depthTexture:new Kr(p.textureWidth,p.textureHeight,Le,void 0,void 0,void 0,void 0,void 0,void 0,be),stencilBuffer:S.stencil,colorSpace:e.outputColorSpace,samples:S.antialias?4:0,resolveDepthBuffer:p.ignoreDepthValues===!1,resolveStencilBuffer:p.ignoreDepthValues===!1})}else{let be={antialias:S.antialias,alpha:!0,depth:S.depth,stencil:S.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(s,t,be),s.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),x=new Vn(f.framebufferWidth,f.framebufferHeight,{format:xn,type:Fn,colorSpace:e.outputColorSpace,stencilBuffer:S.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}x.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await s.requestReferenceSpace(o),$e.setContext(s),$e.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return g.getDepthTexture()};function $(Y){for(let ne=0;ne<Y.removed.length;ne++){let be=Y.removed[ne],Le=w.indexOf(be);Le>=0&&(w[Le]=null,C[Le].disconnect(be))}for(let ne=0;ne<Y.added.length;ne++){let be=Y.added[ne],Le=w.indexOf(be);if(Le===-1){for(let et=0;et<C.length;et++)if(et>=w.length){w.push(be),Le=et;break}else if(w[et]===null){w[et]=be,Le=et;break}if(Le===-1)break}let Te=C[Le];Te&&Te.connect(be)}}let k=new D,ie=new D;function Q(Y,ne,be){k.setFromMatrixPosition(ne.matrixWorld),ie.setFromMatrixPosition(be.matrixWorld);let Le=k.distanceTo(ie),Te=ne.projectionMatrix.elements,et=be.projectionMatrix.elements,pt=Te[14]/(Te[10]-1),P=Te[14]/(Te[10]+1),te=(Te[9]+1)/Te[5],K=(Te[9]-1)/Te[5],J=(Te[8]-1)/Te[0],Z=(et[8]+1)/et[0],de=pt*J,se=pt*Z,fe=Le/(-J+Z),Ge=fe*-J;if(ne.matrixWorld.decompose(Y.position,Y.quaternion,Y.scale),Y.translateX(Ge),Y.translateZ(fe),Y.matrixWorld.compose(Y.position,Y.quaternion,Y.scale),Y.matrixWorldInverse.copy(Y.matrixWorld).invert(),Te[10]===-1)Y.projectionMatrix.copy(ne.projectionMatrix),Y.projectionMatrixInverse.copy(ne.projectionMatrixInverse);else{let He=pt+fe,T=P+fe,v=de-Ge,B=se+(Le-Ge),X=te*P/T*He,ee=K*P/T*He;Y.projectionMatrix.makePerspective(v,B,X,ee,He,T),Y.projectionMatrixInverse.copy(Y.projectionMatrix).invert()}}function ce(Y,ne){ne===null?Y.matrixWorld.copy(Y.matrix):Y.matrixWorld.multiplyMatrices(ne.matrixWorld,Y.matrix),Y.matrixWorldInverse.copy(Y.matrixWorld).invert()}this.updateCamera=function(Y){if(s===null)return;let ne=Y.near,be=Y.far;g.texture!==null&&(g.depthNear>0&&(ne=g.depthNear),g.depthFar>0&&(be=g.depthFar)),N.near=M.near=b.near=ne,N.far=M.far=b.far=be,(H!==N.near||W!==N.far)&&(s.updateRenderState({depthNear:N.near,depthFar:N.far}),H=N.near,W=N.far),N.layers.mask=Y.layers.mask|6,b.layers.mask=N.layers.mask&3,M.layers.mask=N.layers.mask&5;let Le=Y.parent,Te=N.cameras;ce(N,Le);for(let et=0;et<Te.length;et++)ce(Te[et],Le);Te.length===2?Q(N,b,M):N.projectionMatrix.copy(b.projectionMatrix),De(Y,N,Le)};function De(Y,ne,be){be===null?Y.matrix.copy(ne.matrixWorld):(Y.matrix.copy(be.matrixWorld),Y.matrix.invert(),Y.matrix.multiply(ne.matrixWorld)),Y.matrix.decompose(Y.position,Y.quaternion,Y.scale),Y.updateMatrixWorld(!0),Y.projectionMatrix.copy(ne.projectionMatrix),Y.projectionMatrixInverse.copy(ne.projectionMatrixInverse),Y.isPerspectiveCamera&&(Y.fov=Vs*2*Math.atan(1/Y.projectionMatrix.elements[5]),Y.zoom=1)}this.getCamera=function(){return N},this.getFoveation=function(){if(!(p===null&&f===null))return l},this.setFoveation=function(Y){l=Y,p!==null&&(p.fixedFoveation=Y),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=Y)},this.hasDepthSensing=function(){return g.texture!==null},this.getDepthSensingMesh=function(){return g.getMesh(N)},this.getCameraTexture=function(Y){return m[Y]};let ke=null;function Ke(Y,ne){if(h=ne.getViewerPose(c||a),d=ne,h!==null){let be=h.views;f!==null&&(e.setRenderTargetFramebuffer(x,f.framebuffer),e.setRenderTarget(x));let Le=!1;be.length!==N.cameras.length&&(N.cameras.length=0,Le=!0);for(let P=0;P<be.length;P++){let te=be[P],K=null;if(f!==null)K=f.getViewport(te);else{let Z=u.getViewSubImage(p,te);K=Z.viewport,P===0&&(e.setRenderTargetTextures(x,Z.colorTexture,Z.depthStencilTexture),e.setRenderTarget(x))}let J=I[P];J===void 0&&(J=new qt,J.layers.enable(P),J.viewport=new yt,I[P]=J),J.matrix.fromArray(te.transform.matrix),J.matrix.decompose(J.position,J.quaternion,J.scale),J.projectionMatrix.fromArray(te.projectionMatrix),J.projectionMatrixInverse.copy(J.projectionMatrix).invert(),J.viewport.set(K.x,K.y,K.width,K.height),P===0&&(N.matrix.copy(J.matrix),N.matrix.decompose(N.position,N.quaternion,N.scale)),Le===!0&&N.cameras.push(J)}let Te=s.enabledFeatures;if(Te&&Te.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&y){u=n.getBinding();let P=u.getDepthInformation(be[0]);P&&P.isValid&&P.texture&&g.init(P,s.renderState)}if(Te&&Te.includes("camera-access")&&y){e.state.unbindTexture(),u=n.getBinding();for(let P=0;P<be.length;P++){let te=be[P].camera;if(te){let K=m[te];K||(K=new jr,m[te]=K);let J=u.getCameraImage(te);K.sourceTexture=J}}}}for(let be=0;be<C.length;be++){let Le=w[be],Te=C[be];Le!==null&&Te!==void 0&&Te.update(Le,ne,c||a)}ke&&ke(Y,ne),ne.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:ne}),d=null}let $e=new Ef;$e.setAnimationLoop(Ke),this.setAnimationLoop=function(Y){ke=Y},this.dispose=function(){}}},ps=new fn,R_=new Ye;function I_(i,e){function t(g,m){g.matrixAutoUpdate===!0&&g.updateMatrix(),m.value.copy(g.matrix)}function n(g,m){m.color.getRGB(g.fogColor.value,yh(i)),m.isFog?(g.fogNear.value=m.near,g.fogFar.value=m.far):m.isFogExp2&&(g.fogDensity.value=m.density)}function s(g,m,S,_,x){m.isMeshBasicMaterial||m.isMeshLambertMaterial?r(g,m):m.isMeshToonMaterial?(r(g,m),u(g,m)):m.isMeshPhongMaterial?(r(g,m),h(g,m)):m.isMeshStandardMaterial?(r(g,m),p(g,m),m.isMeshPhysicalMaterial&&f(g,m,x)):m.isMeshMatcapMaterial?(r(g,m),d(g,m)):m.isMeshDepthMaterial?r(g,m):m.isMeshDistanceMaterial?(r(g,m),y(g,m)):m.isMeshNormalMaterial?r(g,m):m.isLineBasicMaterial?(a(g,m),m.isLineDashedMaterial&&o(g,m)):m.isPointsMaterial?l(g,m,S,_):m.isSpriteMaterial?c(g,m):m.isShadowMaterial?(g.color.value.copy(m.color),g.opacity.value=m.opacity):m.isShaderMaterial&&(m.uniformsNeedUpdate=!1)}function r(g,m){g.opacity.value=m.opacity,m.color&&g.diffuse.value.copy(m.color),m.emissive&&g.emissive.value.copy(m.emissive).multiplyScalar(m.emissiveIntensity),m.map&&(g.map.value=m.map,t(m.map,g.mapTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,t(m.alphaMap,g.alphaMapTransform)),m.bumpMap&&(g.bumpMap.value=m.bumpMap,t(m.bumpMap,g.bumpMapTransform),g.bumpScale.value=m.bumpScale,m.side===Vt&&(g.bumpScale.value*=-1)),m.normalMap&&(g.normalMap.value=m.normalMap,t(m.normalMap,g.normalMapTransform),g.normalScale.value.copy(m.normalScale),m.side===Vt&&g.normalScale.value.negate()),m.displacementMap&&(g.displacementMap.value=m.displacementMap,t(m.displacementMap,g.displacementMapTransform),g.displacementScale.value=m.displacementScale,g.displacementBias.value=m.displacementBias),m.emissiveMap&&(g.emissiveMap.value=m.emissiveMap,t(m.emissiveMap,g.emissiveMapTransform)),m.specularMap&&(g.specularMap.value=m.specularMap,t(m.specularMap,g.specularMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest);let S=e.get(m),_=S.envMap,x=S.envMapRotation;_&&(g.envMap.value=_,ps.copy(x),ps.x*=-1,ps.y*=-1,ps.z*=-1,_.isCubeTexture&&_.isRenderTargetTexture===!1&&(ps.y*=-1,ps.z*=-1),g.envMapRotation.value.setFromMatrix4(R_.makeRotationFromEuler(ps)),g.flipEnvMap.value=_.isCubeTexture&&_.isRenderTargetTexture===!1?-1:1,g.reflectivity.value=m.reflectivity,g.ior.value=m.ior,g.refractionRatio.value=m.refractionRatio),m.lightMap&&(g.lightMap.value=m.lightMap,g.lightMapIntensity.value=m.lightMapIntensity,t(m.lightMap,g.lightMapTransform)),m.aoMap&&(g.aoMap.value=m.aoMap,g.aoMapIntensity.value=m.aoMapIntensity,t(m.aoMap,g.aoMapTransform))}function a(g,m){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,m.map&&(g.map.value=m.map,t(m.map,g.mapTransform))}function o(g,m){g.dashSize.value=m.dashSize,g.totalSize.value=m.dashSize+m.gapSize,g.scale.value=m.scale}function l(g,m,S,_){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,g.size.value=m.size*S,g.scale.value=_*.5,m.map&&(g.map.value=m.map,t(m.map,g.uvTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,t(m.alphaMap,g.alphaMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest)}function c(g,m){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,g.rotation.value=m.rotation,m.map&&(g.map.value=m.map,t(m.map,g.mapTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,t(m.alphaMap,g.alphaMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest)}function h(g,m){g.specular.value.copy(m.specular),g.shininess.value=Math.max(m.shininess,1e-4)}function u(g,m){m.gradientMap&&(g.gradientMap.value=m.gradientMap)}function p(g,m){g.metalness.value=m.metalness,m.metalnessMap&&(g.metalnessMap.value=m.metalnessMap,t(m.metalnessMap,g.metalnessMapTransform)),g.roughness.value=m.roughness,m.roughnessMap&&(g.roughnessMap.value=m.roughnessMap,t(m.roughnessMap,g.roughnessMapTransform)),m.envMap&&(g.envMapIntensity.value=m.envMapIntensity)}function f(g,m,S){g.ior.value=m.ior,m.sheen>0&&(g.sheenColor.value.copy(m.sheenColor).multiplyScalar(m.sheen),g.sheenRoughness.value=m.sheenRoughness,m.sheenColorMap&&(g.sheenColorMap.value=m.sheenColorMap,t(m.sheenColorMap,g.sheenColorMapTransform)),m.sheenRoughnessMap&&(g.sheenRoughnessMap.value=m.sheenRoughnessMap,t(m.sheenRoughnessMap,g.sheenRoughnessMapTransform))),m.clearcoat>0&&(g.clearcoat.value=m.clearcoat,g.clearcoatRoughness.value=m.clearcoatRoughness,m.clearcoatMap&&(g.clearcoatMap.value=m.clearcoatMap,t(m.clearcoatMap,g.clearcoatMapTransform)),m.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=m.clearcoatRoughnessMap,t(m.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),m.clearcoatNormalMap&&(g.clearcoatNormalMap.value=m.clearcoatNormalMap,t(m.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(m.clearcoatNormalScale),m.side===Vt&&g.clearcoatNormalScale.value.negate())),m.dispersion>0&&(g.dispersion.value=m.dispersion),m.iridescence>0&&(g.iridescence.value=m.iridescence,g.iridescenceIOR.value=m.iridescenceIOR,g.iridescenceThicknessMinimum.value=m.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=m.iridescenceThicknessRange[1],m.iridescenceMap&&(g.iridescenceMap.value=m.iridescenceMap,t(m.iridescenceMap,g.iridescenceMapTransform)),m.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=m.iridescenceThicknessMap,t(m.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),m.transmission>0&&(g.transmission.value=m.transmission,g.transmissionSamplerMap.value=S.texture,g.transmissionSamplerSize.value.set(S.width,S.height),m.transmissionMap&&(g.transmissionMap.value=m.transmissionMap,t(m.transmissionMap,g.transmissionMapTransform)),g.thickness.value=m.thickness,m.thicknessMap&&(g.thicknessMap.value=m.thicknessMap,t(m.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=m.attenuationDistance,g.attenuationColor.value.copy(m.attenuationColor)),m.anisotropy>0&&(g.anisotropyVector.value.set(m.anisotropy*Math.cos(m.anisotropyRotation),m.anisotropy*Math.sin(m.anisotropyRotation)),m.anisotropyMap&&(g.anisotropyMap.value=m.anisotropyMap,t(m.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=m.specularIntensity,g.specularColor.value.copy(m.specularColor),m.specularColorMap&&(g.specularColorMap.value=m.specularColorMap,t(m.specularColorMap,g.specularColorMapTransform)),m.specularIntensityMap&&(g.specularIntensityMap.value=m.specularIntensityMap,t(m.specularIntensityMap,g.specularIntensityMapTransform))}function d(g,m){m.matcap&&(g.matcap.value=m.matcap)}function y(g,m){let S=e.get(m).light;g.referencePosition.value.setFromMatrixPosition(S.matrixWorld),g.nearDistance.value=S.shadow.camera.near,g.farDistance.value=S.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function P_(i,e,t,n){let s={},r={},a=[],o=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function l(S,_){let x=_.program;n.uniformBlockBinding(S,x)}function c(S,_){let x=s[S.id];x===void 0&&(d(S),x=h(S),s[S.id]=x,S.addEventListener("dispose",g));let C=_.program;n.updateUBOMapping(S,C);let w=e.render.frame;r[S.id]!==w&&(p(S),r[S.id]=w)}function h(S){let _=u();S.__bindingPointIndex=_;let x=i.createBuffer(),C=S.__size,w=S.usage;return i.bindBuffer(i.UNIFORM_BUFFER,x),i.bufferData(i.UNIFORM_BUFFER,C,w),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,_,x),x}function u(){for(let S=0;S<o;S++)if(a.indexOf(S)===-1)return a.push(S),S;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function p(S){let _=s[S.id],x=S.uniforms,C=S.__cache;i.bindBuffer(i.UNIFORM_BUFFER,_);for(let w=0,A=x.length;w<A;w++){let R=Array.isArray(x[w])?x[w]:[x[w]];for(let b=0,M=R.length;b<M;b++){let I=R[b];if(f(I,w,b,C)===!0){let N=I.__offset,H=Array.isArray(I.value)?I.value:[I.value],W=0;for(let L=0;L<H.length;L++){let z=H[L],$=y(z);typeof z=="number"||typeof z=="boolean"?(I.__data[0]=z,i.bufferSubData(i.UNIFORM_BUFFER,N+W,I.__data)):z.isMatrix3?(I.__data[0]=z.elements[0],I.__data[1]=z.elements[1],I.__data[2]=z.elements[2],I.__data[3]=0,I.__data[4]=z.elements[3],I.__data[5]=z.elements[4],I.__data[6]=z.elements[5],I.__data[7]=0,I.__data[8]=z.elements[6],I.__data[9]=z.elements[7],I.__data[10]=z.elements[8],I.__data[11]=0):(z.toArray(I.__data,W),W+=$.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,N,I.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function f(S,_,x,C){let w=S.value,A=_+"_"+x;if(C[A]===void 0)return typeof w=="number"||typeof w=="boolean"?C[A]=w:C[A]=w.clone(),!0;{let R=C[A];if(typeof w=="number"||typeof w=="boolean"){if(R!==w)return C[A]=w,!0}else if(R.equals(w)===!1)return R.copy(w),!0}return!1}function d(S){let _=S.uniforms,x=0,C=16;for(let A=0,R=_.length;A<R;A++){let b=Array.isArray(_[A])?_[A]:[_[A]];for(let M=0,I=b.length;M<I;M++){let N=b[M],H=Array.isArray(N.value)?N.value:[N.value];for(let W=0,L=H.length;W<L;W++){let z=H[W],$=y(z),k=x%C,ie=k%$.boundary,Q=k+ie;x+=ie,Q!==0&&C-Q<$.storage&&(x+=C-Q),N.__data=new Float32Array($.storage/Float32Array.BYTES_PER_ELEMENT),N.__offset=x,x+=$.storage}}}let w=x%C;return w>0&&(x+=C-w),S.__size=x,S.__cache={},this}function y(S){let _={boundary:0,storage:0};return typeof S=="number"||typeof S=="boolean"?(_.boundary=4,_.storage=4):S.isVector2?(_.boundary=8,_.storage=8):S.isVector3||S.isColor?(_.boundary=16,_.storage=12):S.isVector4?(_.boundary=16,_.storage=16):S.isMatrix3?(_.boundary=48,_.storage=48):S.isMatrix4?(_.boundary=64,_.storage=64):S.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",S),_}function g(S){let _=S.target;_.removeEventListener("dispose",g);let x=a.indexOf(_.__bindingPointIndex);a.splice(x,1),i.deleteBuffer(s[_.id]),delete s[_.id],delete r[_.id]}function m(){for(let S in s)i.deleteBuffer(s[S]);a=[],s={},r={}}return{bind:l,update:c,dispose:m}}var Vl=class{constructor(e={}){let{canvas:t=Wd(),context:n=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reversedDepthBuffer:p=!1}=e;this.isWebGLRenderer=!0;let f;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");f=n.getContextAttributes().alpha}else f=a;let d=new Uint32Array(4),y=new Int32Array(4),g=null,m=null,S=[],_=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=fi,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let x=this,C=!1;this._outputColorSpace=jt;let w=0,A=0,R=null,b=-1,M=null,I=new yt,N=new yt,H=null,W=new Ve(0),L=0,z=t.width,$=t.height,k=1,ie=null,Q=null,ce=new yt(0,0,z,$),De=new yt(0,0,z,$),ke=!1,Ke=new Ii,$e=!1,Y=!1,ne=new Ye,be=new D,Le=new yt,Te={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},et=!1;function pt(){return R===null?k:1}let P=n;function te(E,F){return t.getContext(E,F)}try{let E={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${"180"}`),t.addEventListener("webglcontextlost",me,!1),t.addEventListener("webglcontextrestored",Ee,!1),t.addEventListener("webglcontextcreationerror",ae,!1),P===null){let F="webgl2";if(P=te(F,E),P===null)throw te(F)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(E){throw console.error("THREE.WebGLRenderer: "+E.message),E}let K,J,Z,de,se,fe,Ge,He,T,v,B,X,ee,q,Ie,he,Ae,Ce,re,ve,Be,Pe,xe,qe;function U(){K=new Zy(P),K.init(),Pe=new T_(P,K),J=new Vy(P,K,e,Pe),Z=new E_(P,K),J.reversedDepthBuffer&&p&&Z.buffers.depth.setReversed(!0),de=new jy(P),se=new u_,fe=new w_(P,K,Z,se,J,Pe,de),Ge=new Wy(x),He=new Yy(x),T=new sg(P),xe=new ky(P,T),v=new Jy(P,T,de,xe),B=new ex(P,v,T,de),re=new Qy(P,J,fe),he=new Gy(se),X=new h_(x,Ge,He,K,J,xe,he),ee=new I_(x,se),q=new f_,Ie=new __(K),Ce=new zy(x,Ge,He,Z,B,f,l),Ae=new S_(x,B,J),qe=new P_(P,de,J,Z),ve=new Hy(P,K,de),Be=new Ky(P,K,de),de.programs=X.programs,x.capabilities=J,x.extensions=K,x.properties=se,x.renderLists=q,x.shadowMap=Ae,x.state=Z,x.info=de}U();let le=new Nh(x,P);this.xr=le,this.getContext=function(){return P},this.getContextAttributes=function(){return P.getContextAttributes()},this.forceContextLoss=function(){let E=K.get("WEBGL_lose_context");E&&E.loseContext()},this.forceContextRestore=function(){let E=K.get("WEBGL_lose_context");E&&E.restoreContext()},this.getPixelRatio=function(){return k},this.setPixelRatio=function(E){E!==void 0&&(k=E,this.setSize(z,$,!1))},this.getSize=function(E){return E.set(z,$)},this.setSize=function(E,F,V=!0){if(le.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}z=E,$=F,t.width=Math.floor(E*k),t.height=Math.floor(F*k),V===!0&&(t.style.width=E+"px",t.style.height=F+"px"),this.setViewport(0,0,E,F)},this.getDrawingBufferSize=function(E){return E.set(z*k,$*k).floor()},this.setDrawingBufferSize=function(E,F,V){z=E,$=F,k=V,t.width=Math.floor(E*V),t.height=Math.floor(F*V),this.setViewport(0,0,E,F)},this.getCurrentViewport=function(E){return E.copy(I)},this.getViewport=function(E){return E.copy(ce)},this.setViewport=function(E,F,V,G){E.isVector4?ce.set(E.x,E.y,E.z,E.w):ce.set(E,F,V,G),Z.viewport(I.copy(ce).multiplyScalar(k).round())},this.getScissor=function(E){return E.copy(De)},this.setScissor=function(E,F,V,G){E.isVector4?De.set(E.x,E.y,E.z,E.w):De.set(E,F,V,G),Z.scissor(N.copy(De).multiplyScalar(k).round())},this.getScissorTest=function(){return ke},this.setScissorTest=function(E){Z.setScissorTest(ke=E)},this.setOpaqueSort=function(E){ie=E},this.setTransparentSort=function(E){Q=E},this.getClearColor=function(E){return E.copy(Ce.getClearColor())},this.setClearColor=function(){Ce.setClearColor(...arguments)},this.getClearAlpha=function(){return Ce.getClearAlpha()},this.setClearAlpha=function(){Ce.setClearAlpha(...arguments)},this.clear=function(E=!0,F=!0,V=!0){let G=0;if(E){let O=!1;if(R!==null){let oe=R.texture.format;O=oe===ol||oe===al||oe===rl}if(O){let oe=R.texture.type,_e=oe===Fn||oe===Di||oe===er||oe===nr||oe===nl||oe===il,we=Ce.getClearColor(),Se=Ce.getClearAlpha(),Oe=we.r,ze=we.g,Ue=we.b;_e?(d[0]=Oe,d[1]=ze,d[2]=Ue,d[3]=Se,P.clearBufferuiv(P.COLOR,0,d)):(y[0]=Oe,y[1]=ze,y[2]=Ue,y[3]=Se,P.clearBufferiv(P.COLOR,0,y))}else G|=P.COLOR_BUFFER_BIT}F&&(G|=P.DEPTH_BUFFER_BIT),V&&(G|=P.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),P.clear(G)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",me,!1),t.removeEventListener("webglcontextrestored",Ee,!1),t.removeEventListener("webglcontextcreationerror",ae,!1),Ce.dispose(),q.dispose(),Ie.dispose(),se.dispose(),Ge.dispose(),He.dispose(),B.dispose(),xe.dispose(),qe.dispose(),X.dispose(),le.dispose(),le.removeEventListener("sessionstart",zn),le.removeEventListener("sessionend",Jh),Bi.stop()};function me(E){E.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),C=!0}function Ee(){console.log("THREE.WebGLRenderer: Context Restored."),C=!1;let E=de.autoReset,F=Ae.enabled,V=Ae.autoUpdate,G=Ae.needsUpdate,O=Ae.type;U(),de.autoReset=E,Ae.enabled=F,Ae.autoUpdate=V,Ae.needsUpdate=G,Ae.type=O}function ae(E){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",E.statusMessage)}function j(E){let F=E.target;F.removeEventListener("dispose",j),Re(F)}function Re(E){We(E),se.remove(E)}function We(E){let F=se.get(E).programs;F!==void 0&&(F.forEach(function(V){X.releaseProgram(V)}),E.isShaderMaterial&&X.releaseShaderCache(E))}this.renderBufferDirect=function(E,F,V,G,O,oe){F===null&&(F=Te);let _e=O.isMesh&&O.matrixWorld.determinant()<0,we=np(E,F,V,G,O);Z.setMaterial(G,_e);let Se=V.index,Oe=1;if(G.wireframe===!0){if(Se=v.getWireframeAttribute(V),Se===void 0)return;Oe=2}let ze=V.drawRange,Ue=V.attributes.position,tt=ze.start*Oe,lt=(ze.start+ze.count)*Oe;oe!==null&&(tt=Math.max(tt,oe.start*Oe),lt=Math.min(lt,(oe.start+oe.count)*Oe)),Se!==null?(tt=Math.max(tt,0),lt=Math.min(lt,Se.count)):Ue!=null&&(tt=Math.max(tt,0),lt=Math.min(lt,Ue.count));let wt=lt-tt;if(wt<0||wt===1/0)return;xe.setup(O,G,we,V,Se);let _t,ut=ve;if(Se!==null&&(_t=T.get(Se),ut=Be,ut.setIndex(_t)),O.isMesh)G.wireframe===!0?(Z.setLineWidth(G.wireframeLinewidth*pt()),ut.setMode(P.LINES)):ut.setMode(P.TRIANGLES);else if(O.isLine){let Ne=G.linewidth;Ne===void 0&&(Ne=1),Z.setLineWidth(Ne*pt()),O.isLineSegments?ut.setMode(P.LINES):O.isLineLoop?ut.setMode(P.LINE_LOOP):ut.setMode(P.LINE_STRIP)}else O.isPoints?ut.setMode(P.POINTS):O.isSprite&&ut.setMode(P.TRIANGLES);if(O.isBatchedMesh)if(O._multiDrawInstances!==null)Gs("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),ut.renderMultiDrawInstances(O._multiDrawStarts,O._multiDrawCounts,O._multiDrawCount,O._multiDrawInstances);else if(K.get("WEBGL_multi_draw"))ut.renderMultiDraw(O._multiDrawStarts,O._multiDrawCounts,O._multiDrawCount);else{let Ne=O._multiDrawStarts,St=O._multiDrawCounts,rt=O._multiDrawCount,cn=Se?T.get(Se).bytesPerElement:1,_s=se.get(G).currentProgram.getUniforms();for(let hn=0;hn<rt;hn++)_s.setValue(P,"_gl_DrawID",hn),ut.render(Ne[hn]/cn,St[hn])}else if(O.isInstancedMesh)ut.renderInstances(tt,wt,O.count);else if(V.isInstancedBufferGeometry){let Ne=V._maxInstanceCount!==void 0?V._maxInstanceCount:1/0,St=Math.min(V.instanceCount,Ne);ut.renderInstances(tt,wt,St)}else ut.render(tt,wt)};function mt(E,F,V){E.transparent===!0&&E.side===bn&&E.forceSinglePass===!1?(E.side=Vt,E.needsUpdate=!0,La(E,F,V),E.side=ri,E.needsUpdate=!0,La(E,F,V),E.side=bn):La(E,F,V)}this.compile=function(E,F,V=null){V===null&&(V=E),m=Ie.get(V),m.init(F),_.push(m),V.traverseVisible(function(O){O.isLight&&O.layers.test(F.layers)&&(m.pushLight(O),O.castShadow&&m.pushShadow(O))}),E!==V&&E.traverseVisible(function(O){O.isLight&&O.layers.test(F.layers)&&(m.pushLight(O),O.castShadow&&m.pushShadow(O))}),m.setupLights();let G=new Set;return E.traverse(function(O){if(!(O.isMesh||O.isPoints||O.isLine||O.isSprite))return;let oe=O.material;if(oe)if(Array.isArray(oe))for(let _e=0;_e<oe.length;_e++){let we=oe[_e];mt(we,V,O),G.add(we)}else mt(oe,V,O),G.add(oe)}),m=_.pop(),G},this.compileAsync=function(E,F,V=null){let G=this.compile(E,F,V);return new Promise(O=>{function oe(){if(G.forEach(function(_e){se.get(_e).currentProgram.isReady()&&G.delete(_e)}),G.size===0){O(E);return}setTimeout(oe,10)}K.get("KHR_parallel_shader_compile")!==null?oe():setTimeout(oe,10)})};let at=null;function Kn(E){at&&at(E)}function zn(){Bi.stop()}function Jh(){Bi.start()}let Bi=new Ef;Bi.setAnimationLoop(Kn),typeof self<"u"&&Bi.setContext(self),this.setAnimationLoop=function(E){at=E,le.setAnimationLoop(E),E===null?Bi.stop():Bi.start()},le.addEventListener("sessionstart",zn),le.addEventListener("sessionend",Jh),this.render=function(E,F){if(F!==void 0&&F.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(C===!0)return;if(E.matrixWorldAutoUpdate===!0&&E.updateMatrixWorld(),F.parent===null&&F.matrixWorldAutoUpdate===!0&&F.updateMatrixWorld(),le.enabled===!0&&le.isPresenting===!0&&(le.cameraAutoUpdate===!0&&le.updateCamera(F),F=le.getCamera()),E.isScene===!0&&E.onBeforeRender(x,E,F,R),m=Ie.get(E,_.length),m.init(F),_.push(m),ne.multiplyMatrices(F.projectionMatrix,F.matrixWorldInverse),Ke.setFromProjectionMatrix(ne,Rn,F.reversedDepth),Y=this.localClippingEnabled,$e=he.init(this.clippingPlanes,Y),g=q.get(E,S.length),g.init(),S.push(g),le.enabled===!0&&le.isPresenting===!0){let oe=x.xr.getDepthSensingMesh();oe!==null&&nc(oe,F,-1/0,x.sortObjects)}nc(E,F,0,x.sortObjects),g.finish(),x.sortObjects===!0&&g.sort(ie,Q),et=le.enabled===!1||le.isPresenting===!1||le.hasDepthSensing()===!1,et&&Ce.addToRenderList(g,E),this.info.render.frame++,$e===!0&&he.beginShadows();let V=m.state.shadowsArray;Ae.render(V,E,F),$e===!0&&he.endShadows(),this.info.autoReset===!0&&this.info.reset();let G=g.opaque,O=g.transmissive;if(m.setupLights(),F.isArrayCamera){let oe=F.cameras;if(O.length>0)for(let _e=0,we=oe.length;_e<we;_e++){let Se=oe[_e];jh(G,O,E,Se)}et&&Ce.render(E);for(let _e=0,we=oe.length;_e<we;_e++){let Se=oe[_e];Kh(g,E,Se,Se.viewport)}}else O.length>0&&jh(G,O,E,F),et&&Ce.render(E),Kh(g,E,F);R!==null&&A===0&&(fe.updateMultisampleRenderTarget(R),fe.updateRenderTargetMipmap(R)),E.isScene===!0&&E.onAfterRender(x,E,F),xe.resetDefaultState(),b=-1,M=null,_.pop(),_.length>0?(m=_[_.length-1],$e===!0&&he.setGlobalState(x.clippingPlanes,m.state.camera)):m=null,S.pop(),S.length>0?g=S[S.length-1]:g=null};function nc(E,F,V,G){if(E.visible===!1)return;if(E.layers.test(F.layers)){if(E.isGroup)V=E.renderOrder;else if(E.isLOD)E.autoUpdate===!0&&E.update(F);else if(E.isLight)m.pushLight(E),E.castShadow&&m.pushShadow(E);else if(E.isSprite){if(!E.frustumCulled||Ke.intersectsSprite(E)){G&&Le.setFromMatrixPosition(E.matrixWorld).applyMatrix4(ne);let _e=B.update(E),we=E.material;we.visible&&g.push(E,_e,we,V,Le.z,null)}}else if((E.isMesh||E.isLine||E.isPoints)&&(!E.frustumCulled||Ke.intersectsObject(E))){let _e=B.update(E),we=E.material;if(G&&(E.boundingSphere!==void 0?(E.boundingSphere===null&&E.computeBoundingSphere(),Le.copy(E.boundingSphere.center)):(_e.boundingSphere===null&&_e.computeBoundingSphere(),Le.copy(_e.boundingSphere.center)),Le.applyMatrix4(E.matrixWorld).applyMatrix4(ne)),Array.isArray(we)){let Se=_e.groups;for(let Oe=0,ze=Se.length;Oe<ze;Oe++){let Ue=Se[Oe],tt=we[Ue.materialIndex];tt&&tt.visible&&g.push(E,_e,tt,V,Le.z,Ue)}}else we.visible&&g.push(E,_e,we,V,Le.z,null)}}let oe=E.children;for(let _e=0,we=oe.length;_e<we;_e++)nc(oe[_e],F,V,G)}function Kh(E,F,V,G){let O=E.opaque,oe=E.transmissive,_e=E.transparent;m.setupLightsView(V),$e===!0&&he.setGlobalState(x.clippingPlanes,V),G&&Z.viewport(I.copy(G)),O.length>0&&Pa(O,F,V),oe.length>0&&Pa(oe,F,V),_e.length>0&&Pa(_e,F,V),Z.buffers.depth.setTest(!0),Z.buffers.depth.setMask(!0),Z.buffers.color.setMask(!0),Z.setPolygonOffset(!1)}function jh(E,F,V,G){if((V.isScene===!0?V.overrideMaterial:null)!==null)return;m.state.transmissionRenderTarget[G.id]===void 0&&(m.state.transmissionRenderTarget[G.id]=new Vn(1,1,{generateMipmaps:!0,type:K.has("EXT_color_buffer_half_float")||K.has("EXT_color_buffer_float")?tr:Fn,minFilter:Li,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:st.workingColorSpace}));let oe=m.state.transmissionRenderTarget[G.id],_e=G.viewport||I;oe.setSize(_e.z*x.transmissionResolutionScale,_e.w*x.transmissionResolutionScale);let we=x.getRenderTarget(),Se=x.getActiveCubeFace(),Oe=x.getActiveMipmapLevel();x.setRenderTarget(oe),x.getClearColor(W),L=x.getClearAlpha(),L<1&&x.setClearColor(16777215,.5),x.clear(),et&&Ce.render(V);let ze=x.toneMapping;x.toneMapping=fi;let Ue=G.viewport;if(G.viewport!==void 0&&(G.viewport=void 0),m.setupLightsView(G),$e===!0&&he.setGlobalState(x.clippingPlanes,G),Pa(E,V,G),fe.updateMultisampleRenderTarget(oe),fe.updateRenderTargetMipmap(oe),K.has("WEBGL_multisampled_render_to_texture")===!1){let tt=!1;for(let lt=0,wt=F.length;lt<wt;lt++){let _t=F[lt],ut=_t.object,Ne=_t.geometry,St=_t.material,rt=_t.group;if(St.side===bn&&ut.layers.test(G.layers)){let cn=St.side;St.side=Vt,St.needsUpdate=!0,Qh(ut,V,G,Ne,St,rt),St.side=cn,St.needsUpdate=!0,tt=!0}}tt===!0&&(fe.updateMultisampleRenderTarget(oe),fe.updateRenderTargetMipmap(oe))}x.setRenderTarget(we,Se,Oe),x.setClearColor(W,L),Ue!==void 0&&(G.viewport=Ue),x.toneMapping=ze}function Pa(E,F,V){let G=F.isScene===!0?F.overrideMaterial:null;for(let O=0,oe=E.length;O<oe;O++){let _e=E[O],we=_e.object,Se=_e.geometry,Oe=_e.group,ze=_e.material;ze.allowOverride===!0&&G!==null&&(ze=G),we.layers.test(V.layers)&&Qh(we,F,V,Se,ze,Oe)}}function Qh(E,F,V,G,O,oe){E.onBeforeRender(x,F,V,G,O,oe),E.modelViewMatrix.multiplyMatrices(V.matrixWorldInverse,E.matrixWorld),E.normalMatrix.getNormalMatrix(E.modelViewMatrix),O.onBeforeRender(x,F,V,G,E,oe),O.transparent===!0&&O.side===bn&&O.forceSinglePass===!1?(O.side=Vt,O.needsUpdate=!0,x.renderBufferDirect(V,F,G,O,E,oe),O.side=ri,O.needsUpdate=!0,x.renderBufferDirect(V,F,G,O,E,oe),O.side=bn):x.renderBufferDirect(V,F,G,O,E,oe),E.onAfterRender(x,F,V,G,O,oe)}function La(E,F,V){F.isScene!==!0&&(F=Te);let G=se.get(E),O=m.state.lights,oe=m.state.shadowsArray,_e=O.state.version,we=X.getParameters(E,O.state,oe,F,V),Se=X.getProgramCacheKey(we),Oe=G.programs;G.environment=E.isMeshStandardMaterial?F.environment:null,G.fog=F.fog,G.envMap=(E.isMeshStandardMaterial?He:Ge).get(E.envMap||G.environment),G.envMapRotation=G.environment!==null&&E.envMap===null?F.environmentRotation:E.envMapRotation,Oe===void 0&&(E.addEventListener("dispose",j),Oe=new Map,G.programs=Oe);let ze=Oe.get(Se);if(ze!==void 0){if(G.currentProgram===ze&&G.lightsStateVersion===_e)return tu(E,we),ze}else we.uniforms=X.getUniforms(E),E.onBeforeCompile(we,x),ze=X.acquireProgram(we,Se),Oe.set(Se,ze),G.uniforms=we.uniforms;let Ue=G.uniforms;return(!E.isShaderMaterial&&!E.isRawShaderMaterial||E.clipping===!0)&&(Ue.clippingPlanes=he.uniform),tu(E,we),G.needsLights=sp(E),G.lightsStateVersion=_e,G.needsLights&&(Ue.ambientLightColor.value=O.state.ambient,Ue.lightProbe.value=O.state.probe,Ue.directionalLights.value=O.state.directional,Ue.directionalLightShadows.value=O.state.directionalShadow,Ue.spotLights.value=O.state.spot,Ue.spotLightShadows.value=O.state.spotShadow,Ue.rectAreaLights.value=O.state.rectArea,Ue.ltc_1.value=O.state.rectAreaLTC1,Ue.ltc_2.value=O.state.rectAreaLTC2,Ue.pointLights.value=O.state.point,Ue.pointLightShadows.value=O.state.pointShadow,Ue.hemisphereLights.value=O.state.hemi,Ue.directionalShadowMap.value=O.state.directionalShadowMap,Ue.directionalShadowMatrix.value=O.state.directionalShadowMatrix,Ue.spotShadowMap.value=O.state.spotShadowMap,Ue.spotLightMatrix.value=O.state.spotLightMatrix,Ue.spotLightMap.value=O.state.spotLightMap,Ue.pointShadowMap.value=O.state.pointShadowMap,Ue.pointShadowMatrix.value=O.state.pointShadowMatrix),G.currentProgram=ze,G.uniformsList=null,ze}function eu(E){if(E.uniformsList===null){let F=E.currentProgram.getUniforms();E.uniformsList=ar.seqWithValue(F.seq,E.uniforms)}return E.uniformsList}function tu(E,F){let V=se.get(E);V.outputColorSpace=F.outputColorSpace,V.batching=F.batching,V.batchingColor=F.batchingColor,V.instancing=F.instancing,V.instancingColor=F.instancingColor,V.instancingMorph=F.instancingMorph,V.skinning=F.skinning,V.morphTargets=F.morphTargets,V.morphNormals=F.morphNormals,V.morphColors=F.morphColors,V.morphTargetsCount=F.morphTargetsCount,V.numClippingPlanes=F.numClippingPlanes,V.numIntersection=F.numClipIntersection,V.vertexAlphas=F.vertexAlphas,V.vertexTangents=F.vertexTangents,V.toneMapping=F.toneMapping}function np(E,F,V,G,O){F.isScene!==!0&&(F=Te),fe.resetTextureUnits();let oe=F.fog,_e=G.isMeshStandardMaterial?F.environment:null,we=R===null?x.outputColorSpace:R.isXRRenderTarget===!0?R.texture.colorSpace:ts,Se=(G.isMeshStandardMaterial?He:Ge).get(G.envMap||_e),Oe=G.vertexColors===!0&&!!V.attributes.color&&V.attributes.color.itemSize===4,ze=!!V.attributes.tangent&&(!!G.normalMap||G.anisotropy>0),Ue=!!V.morphAttributes.position,tt=!!V.morphAttributes.normal,lt=!!V.morphAttributes.color,wt=fi;G.toneMapped&&(R===null||R.isXRRenderTarget===!0)&&(wt=x.toneMapping);let _t=V.morphAttributes.position||V.morphAttributes.normal||V.morphAttributes.color,ut=_t!==void 0?_t.length:0,Ne=se.get(G),St=m.state.lights;if($e===!0&&(Y===!0||E!==M)){let Jt=E===M&&G.id===b;he.setState(G,E,Jt)}let rt=!1;G.version===Ne.__version?(Ne.needsLights&&Ne.lightsStateVersion!==St.state.version||Ne.outputColorSpace!==we||O.isBatchedMesh&&Ne.batching===!1||!O.isBatchedMesh&&Ne.batching===!0||O.isBatchedMesh&&Ne.batchingColor===!0&&O.colorTexture===null||O.isBatchedMesh&&Ne.batchingColor===!1&&O.colorTexture!==null||O.isInstancedMesh&&Ne.instancing===!1||!O.isInstancedMesh&&Ne.instancing===!0||O.isSkinnedMesh&&Ne.skinning===!1||!O.isSkinnedMesh&&Ne.skinning===!0||O.isInstancedMesh&&Ne.instancingColor===!0&&O.instanceColor===null||O.isInstancedMesh&&Ne.instancingColor===!1&&O.instanceColor!==null||O.isInstancedMesh&&Ne.instancingMorph===!0&&O.morphTexture===null||O.isInstancedMesh&&Ne.instancingMorph===!1&&O.morphTexture!==null||Ne.envMap!==Se||G.fog===!0&&Ne.fog!==oe||Ne.numClippingPlanes!==void 0&&(Ne.numClippingPlanes!==he.numPlanes||Ne.numIntersection!==he.numIntersection)||Ne.vertexAlphas!==Oe||Ne.vertexTangents!==ze||Ne.morphTargets!==Ue||Ne.morphNormals!==tt||Ne.morphColors!==lt||Ne.toneMapping!==wt||Ne.morphTargetsCount!==ut)&&(rt=!0):(rt=!0,Ne.__version=G.version);let cn=Ne.currentProgram;rt===!0&&(cn=La(G,F,O));let _s=!1,hn=!1,mr=!1,bt=cn.getUniforms(),vn=Ne.uniforms;if(Z.useProgram(cn.program)&&(_s=!0,hn=!0,mr=!0),G.id!==b&&(b=G.id,hn=!0),_s||M!==E){Z.buffers.depth.getReversed()&&E.reversedDepth!==!0&&(E._reversedDepth=!0,E.updateProjectionMatrix()),bt.setValue(P,"projectionMatrix",E.projectionMatrix),bt.setValue(P,"viewMatrix",E.matrixWorldInverse);let nn=bt.map.cameraPosition;nn!==void 0&&nn.setValue(P,be.setFromMatrixPosition(E.matrixWorld)),J.logarithmicDepthBuffer&&bt.setValue(P,"logDepthBufFC",2/(Math.log(E.far+1)/Math.LN2)),(G.isMeshPhongMaterial||G.isMeshToonMaterial||G.isMeshLambertMaterial||G.isMeshBasicMaterial||G.isMeshStandardMaterial||G.isShaderMaterial)&&bt.setValue(P,"isOrthographic",E.isOrthographicCamera===!0),M!==E&&(M=E,hn=!0,mr=!0)}if(O.isSkinnedMesh){bt.setOptional(P,O,"bindMatrix"),bt.setOptional(P,O,"bindMatrixInverse");let Jt=O.skeleton;Jt&&(Jt.boneTexture===null&&Jt.computeBoneTexture(),bt.setValue(P,"boneTexture",Jt.boneTexture,fe))}O.isBatchedMesh&&(bt.setOptional(P,O,"batchingTexture"),bt.setValue(P,"batchingTexture",O._matricesTexture,fe),bt.setOptional(P,O,"batchingIdTexture"),bt.setValue(P,"batchingIdTexture",O._indirectTexture,fe),bt.setOptional(P,O,"batchingColorTexture"),O._colorsTexture!==null&&bt.setValue(P,"batchingColorTexture",O._colorsTexture,fe));let Mn=V.morphAttributes;if((Mn.position!==void 0||Mn.normal!==void 0||Mn.color!==void 0)&&re.update(O,V,cn),(hn||Ne.receiveShadow!==O.receiveShadow)&&(Ne.receiveShadow=O.receiveShadow,bt.setValue(P,"receiveShadow",O.receiveShadow)),G.isMeshGouraudMaterial&&G.envMap!==null&&(vn.envMap.value=Se,vn.flipEnvMap.value=Se.isCubeTexture&&Se.isRenderTargetTexture===!1?-1:1),G.isMeshStandardMaterial&&G.envMap===null&&F.environment!==null&&(vn.envMapIntensity.value=F.environmentIntensity),hn&&(bt.setValue(P,"toneMappingExposure",x.toneMappingExposure),Ne.needsLights&&ip(vn,mr),oe&&G.fog===!0&&ee.refreshFogUniforms(vn,oe),ee.refreshMaterialUniforms(vn,G,k,$,m.state.transmissionRenderTarget[E.id]),ar.upload(P,eu(Ne),vn,fe)),G.isShaderMaterial&&G.uniformsNeedUpdate===!0&&(ar.upload(P,eu(Ne),vn,fe),G.uniformsNeedUpdate=!1),G.isSpriteMaterial&&bt.setValue(P,"center",O.center),bt.setValue(P,"modelViewMatrix",O.modelViewMatrix),bt.setValue(P,"normalMatrix",O.normalMatrix),bt.setValue(P,"modelMatrix",O.matrixWorld),G.isShaderMaterial||G.isRawShaderMaterial){let Jt=G.uniformsGroups;for(let nn=0,ic=Jt.length;nn<ic;nn++){let zi=Jt[nn];qe.update(zi,cn),qe.bind(zi,cn)}}return cn}function ip(E,F){E.ambientLightColor.needsUpdate=F,E.lightProbe.needsUpdate=F,E.directionalLights.needsUpdate=F,E.directionalLightShadows.needsUpdate=F,E.pointLights.needsUpdate=F,E.pointLightShadows.needsUpdate=F,E.spotLights.needsUpdate=F,E.spotLightShadows.needsUpdate=F,E.rectAreaLights.needsUpdate=F,E.hemisphereLights.needsUpdate=F}function sp(E){return E.isMeshLambertMaterial||E.isMeshToonMaterial||E.isMeshPhongMaterial||E.isMeshStandardMaterial||E.isShadowMaterial||E.isShaderMaterial&&E.lights===!0}this.getActiveCubeFace=function(){return w},this.getActiveMipmapLevel=function(){return A},this.getRenderTarget=function(){return R},this.setRenderTargetTextures=function(E,F,V){let G=se.get(E);G.__autoAllocateDepthBuffer=E.resolveDepthBuffer===!1,G.__autoAllocateDepthBuffer===!1&&(G.__useRenderToTexture=!1),se.get(E.texture).__webglTexture=F,se.get(E.depthTexture).__webglTexture=G.__autoAllocateDepthBuffer?void 0:V,G.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(E,F){let V=se.get(E);V.__webglFramebuffer=F,V.__useDefaultFramebuffer=F===void 0};let rp=P.createFramebuffer();this.setRenderTarget=function(E,F=0,V=0){R=E,w=F,A=V;let G=!0,O=null,oe=!1,_e=!1;if(E){let Se=se.get(E);if(Se.__useDefaultFramebuffer!==void 0)Z.bindFramebuffer(P.FRAMEBUFFER,null),G=!1;else if(Se.__webglFramebuffer===void 0)fe.setupRenderTarget(E);else if(Se.__hasExternalTextures)fe.rebindTextures(E,se.get(E.texture).__webglTexture,se.get(E.depthTexture).__webglTexture);else if(E.depthBuffer){let Ue=E.depthTexture;if(Se.__boundDepthTexture!==Ue){if(Ue!==null&&se.has(Ue)&&(E.width!==Ue.image.width||E.height!==Ue.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");fe.setupDepthRenderbuffer(E)}}let Oe=E.texture;(Oe.isData3DTexture||Oe.isDataArrayTexture||Oe.isCompressedArrayTexture)&&(_e=!0);let ze=se.get(E).__webglFramebuffer;E.isWebGLCubeRenderTarget?(Array.isArray(ze[F])?O=ze[F][V]:O=ze[F],oe=!0):E.samples>0&&fe.useMultisampledRTT(E)===!1?O=se.get(E).__webglMultisampledFramebuffer:Array.isArray(ze)?O=ze[V]:O=ze,I.copy(E.viewport),N.copy(E.scissor),H=E.scissorTest}else I.copy(ce).multiplyScalar(k).floor(),N.copy(De).multiplyScalar(k).floor(),H=ke;if(V!==0&&(O=rp),Z.bindFramebuffer(P.FRAMEBUFFER,O)&&G&&Z.drawBuffers(E,O),Z.viewport(I),Z.scissor(N),Z.setScissorTest(H),oe){let Se=se.get(E.texture);P.framebufferTexture2D(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_CUBE_MAP_POSITIVE_X+F,Se.__webglTexture,V)}else if(_e){let Se=F;for(let Oe=0;Oe<E.textures.length;Oe++){let ze=se.get(E.textures[Oe]);P.framebufferTextureLayer(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0+Oe,ze.__webglTexture,V,Se)}}else if(E!==null&&V!==0){let Se=se.get(E.texture);P.framebufferTexture2D(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_2D,Se.__webglTexture,V)}b=-1},this.readRenderTargetPixels=function(E,F,V,G,O,oe,_e,we=0){if(!(E&&E.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Se=se.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&_e!==void 0&&(Se=Se[_e]),Se){Z.bindFramebuffer(P.FRAMEBUFFER,Se);try{let Oe=E.textures[we],ze=Oe.format,Ue=Oe.type;if(!J.textureFormatReadable(ze)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!J.textureTypeReadable(Ue)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}F>=0&&F<=E.width-G&&V>=0&&V<=E.height-O&&(E.textures.length>1&&P.readBuffer(P.COLOR_ATTACHMENT0+we),P.readPixels(F,V,G,O,Pe.convert(ze),Pe.convert(Ue),oe))}finally{let Oe=R!==null?se.get(R).__webglFramebuffer:null;Z.bindFramebuffer(P.FRAMEBUFFER,Oe)}}},this.readRenderTargetPixelsAsync=async function(E,F,V,G,O,oe,_e,we=0){if(!(E&&E.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Se=se.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&_e!==void 0&&(Se=Se[_e]),Se)if(F>=0&&F<=E.width-G&&V>=0&&V<=E.height-O){Z.bindFramebuffer(P.FRAMEBUFFER,Se);let Oe=E.textures[we],ze=Oe.format,Ue=Oe.type;if(!J.textureFormatReadable(ze))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!J.textureTypeReadable(Ue))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let tt=P.createBuffer();P.bindBuffer(P.PIXEL_PACK_BUFFER,tt),P.bufferData(P.PIXEL_PACK_BUFFER,oe.byteLength,P.STREAM_READ),E.textures.length>1&&P.readBuffer(P.COLOR_ATTACHMENT0+we),P.readPixels(F,V,G,O,Pe.convert(ze),Pe.convert(Ue),0);let lt=R!==null?se.get(R).__webglFramebuffer:null;Z.bindFramebuffer(P.FRAMEBUFFER,lt);let wt=P.fenceSync(P.SYNC_GPU_COMMANDS_COMPLETE,0);return P.flush(),await Xd(P,wt,4),P.bindBuffer(P.PIXEL_PACK_BUFFER,tt),P.getBufferSubData(P.PIXEL_PACK_BUFFER,0,oe),P.deleteBuffer(tt),P.deleteSync(wt),oe}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(E,F=null,V=0){let G=Math.pow(2,-V),O=Math.floor(E.image.width*G),oe=Math.floor(E.image.height*G),_e=F!==null?F.x:0,we=F!==null?F.y:0;fe.setTexture2D(E,0),P.copyTexSubImage2D(P.TEXTURE_2D,V,0,0,_e,we,O,oe),Z.unbindTexture()};let ap=P.createFramebuffer(),op=P.createFramebuffer();this.copyTextureToTexture=function(E,F,V=null,G=null,O=0,oe=null){oe===null&&(O!==0?(Gs("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),oe=O,O=0):oe=0);let _e,we,Se,Oe,ze,Ue,tt,lt,wt,_t=E.isCompressedTexture?E.mipmaps[oe]:E.image;if(V!==null)_e=V.max.x-V.min.x,we=V.max.y-V.min.y,Se=V.isBox3?V.max.z-V.min.z:1,Oe=V.min.x,ze=V.min.y,Ue=V.isBox3?V.min.z:0;else{let Mn=Math.pow(2,-O);_e=Math.floor(_t.width*Mn),we=Math.floor(_t.height*Mn),E.isDataArrayTexture?Se=_t.depth:E.isData3DTexture?Se=Math.floor(_t.depth*Mn):Se=1,Oe=0,ze=0,Ue=0}G!==null?(tt=G.x,lt=G.y,wt=G.z):(tt=0,lt=0,wt=0);let ut=Pe.convert(F.format),Ne=Pe.convert(F.type),St;F.isData3DTexture?(fe.setTexture3D(F,0),St=P.TEXTURE_3D):F.isDataArrayTexture||F.isCompressedArrayTexture?(fe.setTexture2DArray(F,0),St=P.TEXTURE_2D_ARRAY):(fe.setTexture2D(F,0),St=P.TEXTURE_2D),P.pixelStorei(P.UNPACK_FLIP_Y_WEBGL,F.flipY),P.pixelStorei(P.UNPACK_PREMULTIPLY_ALPHA_WEBGL,F.premultiplyAlpha),P.pixelStorei(P.UNPACK_ALIGNMENT,F.unpackAlignment);let rt=P.getParameter(P.UNPACK_ROW_LENGTH),cn=P.getParameter(P.UNPACK_IMAGE_HEIGHT),_s=P.getParameter(P.UNPACK_SKIP_PIXELS),hn=P.getParameter(P.UNPACK_SKIP_ROWS),mr=P.getParameter(P.UNPACK_SKIP_IMAGES);P.pixelStorei(P.UNPACK_ROW_LENGTH,_t.width),P.pixelStorei(P.UNPACK_IMAGE_HEIGHT,_t.height),P.pixelStorei(P.UNPACK_SKIP_PIXELS,Oe),P.pixelStorei(P.UNPACK_SKIP_ROWS,ze),P.pixelStorei(P.UNPACK_SKIP_IMAGES,Ue);let bt=E.isDataArrayTexture||E.isData3DTexture,vn=F.isDataArrayTexture||F.isData3DTexture;if(E.isDepthTexture){let Mn=se.get(E),Jt=se.get(F),nn=se.get(Mn.__renderTarget),ic=se.get(Jt.__renderTarget);Z.bindFramebuffer(P.READ_FRAMEBUFFER,nn.__webglFramebuffer),Z.bindFramebuffer(P.DRAW_FRAMEBUFFER,ic.__webglFramebuffer);for(let zi=0;zi<Se;zi++)bt&&(P.framebufferTextureLayer(P.READ_FRAMEBUFFER,P.COLOR_ATTACHMENT0,se.get(E).__webglTexture,O,Ue+zi),P.framebufferTextureLayer(P.DRAW_FRAMEBUFFER,P.COLOR_ATTACHMENT0,se.get(F).__webglTexture,oe,wt+zi)),P.blitFramebuffer(Oe,ze,_e,we,tt,lt,_e,we,P.DEPTH_BUFFER_BIT,P.NEAREST);Z.bindFramebuffer(P.READ_FRAMEBUFFER,null),Z.bindFramebuffer(P.DRAW_FRAMEBUFFER,null)}else if(O!==0||E.isRenderTargetTexture||se.has(E)){let Mn=se.get(E),Jt=se.get(F);Z.bindFramebuffer(P.READ_FRAMEBUFFER,ap),Z.bindFramebuffer(P.DRAW_FRAMEBUFFER,op);for(let nn=0;nn<Se;nn++)bt?P.framebufferTextureLayer(P.READ_FRAMEBUFFER,P.COLOR_ATTACHMENT0,Mn.__webglTexture,O,Ue+nn):P.framebufferTexture2D(P.READ_FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_2D,Mn.__webglTexture,O),vn?P.framebufferTextureLayer(P.DRAW_FRAMEBUFFER,P.COLOR_ATTACHMENT0,Jt.__webglTexture,oe,wt+nn):P.framebufferTexture2D(P.DRAW_FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_2D,Jt.__webglTexture,oe),O!==0?P.blitFramebuffer(Oe,ze,_e,we,tt,lt,_e,we,P.COLOR_BUFFER_BIT,P.NEAREST):vn?P.copyTexSubImage3D(St,oe,tt,lt,wt+nn,Oe,ze,_e,we):P.copyTexSubImage2D(St,oe,tt,lt,Oe,ze,_e,we);Z.bindFramebuffer(P.READ_FRAMEBUFFER,null),Z.bindFramebuffer(P.DRAW_FRAMEBUFFER,null)}else vn?E.isDataTexture||E.isData3DTexture?P.texSubImage3D(St,oe,tt,lt,wt,_e,we,Se,ut,Ne,_t.data):F.isCompressedArrayTexture?P.compressedTexSubImage3D(St,oe,tt,lt,wt,_e,we,Se,ut,_t.data):P.texSubImage3D(St,oe,tt,lt,wt,_e,we,Se,ut,Ne,_t):E.isDataTexture?P.texSubImage2D(P.TEXTURE_2D,oe,tt,lt,_e,we,ut,Ne,_t.data):E.isCompressedTexture?P.compressedTexSubImage2D(P.TEXTURE_2D,oe,tt,lt,_t.width,_t.height,ut,_t.data):P.texSubImage2D(P.TEXTURE_2D,oe,tt,lt,_e,we,ut,Ne,_t);P.pixelStorei(P.UNPACK_ROW_LENGTH,rt),P.pixelStorei(P.UNPACK_IMAGE_HEIGHT,cn),P.pixelStorei(P.UNPACK_SKIP_PIXELS,_s),P.pixelStorei(P.UNPACK_SKIP_ROWS,hn),P.pixelStorei(P.UNPACK_SKIP_IMAGES,mr),oe===0&&F.generateMipmaps&&P.generateMipmap(St),Z.unbindTexture()},this.initRenderTarget=function(E){se.get(E).__webglFramebuffer===void 0&&fe.setupRenderTarget(E)},this.initTexture=function(E){E.isCubeTexture?fe.setTextureCube(E,0):E.isData3DTexture?fe.setTexture3D(E,0):E.isDataArrayTexture||E.isCompressedArrayTexture?fe.setTexture2DArray(E,0):fe.setTexture2D(E,0),Z.unbindTexture()},this.resetState=function(){w=0,A=0,R=null,Z.reset(),xe.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Rn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=st._getDrawingBufferColorSpace(e),t.unpackColorSpace=st._getUnpackColorSpace()}};var en=Object.freeze({chalk:16117464,teal:2645088,deep:1588301,moss:5081976,gold:14460501,copper:10707265,ink:2308168}),lr={chalk:new Ct({name:"chalk-sail",color:en.chalk,roughness:.82,side:bn}),stone:new Ct({name:"teal-basalt",color:en.teal,roughness:.94,flatShading:!0}),dark:new Ct({name:"deep-basalt",color:en.deep,roughness:.92,flatShading:!0}),moss:new Ct({name:"moss",color:en.moss,roughness:.98}),gold:new Ct({name:"aged-brass",color:en.gold,roughness:.42,metalness:.58}),copper:new Ct({name:"ochre-ceramic",color:en.copper,roughness:.85}),ink:new Ct({name:"navy-cloth",color:en.ink,roughness:.9}),glow:new Ct({name:"aether-glass",color:10941148,emissive:5287070,emissiveIntensity:.8,roughness:.28,metalness:.15}),skin:new Ct({name:"pilot-skin",color:13212542,roughness:.9}),turf:new Ct({name:"weathered-turf",color:6720632,roughness:1,flatShading:!0}),sand:new Ct({name:"mineral-sand",color:10070668,roughness:1,flatShading:!0})},Wl={turf:lr.turf.clone(),sand:lr.sand.clone()};Object.assign(Wl.turf,{name:"terrain-patch-turf",polygonOffset:!0,polygonOffsetFactor:-1,polygonOffsetUnits:-1});Object.assign(Wl.sand,{name:"terrain-patch-sand",polygonOffset:!0,polygonOffsetFactor:-2,polygonOffsetUnits:-2});var L_=i=>lr[i]||lr.stone,Pf=i=>{let e=i+1>>>0;return()=>(e=Math.imul(1664525,e)+1013904223>>>0,e/4294967296)},Je=(i,e,t,n)=>{let s=new dt(i,typeof e=="string"?L_(e):e);return t&&s.position.set(...t),n&&s.scale.set(...n),s.castShadow=!0,s.receiveShadow=!0,s},Gt=(i,e,t,n=10)=>new ai(i,e,t,n);function Bt(i,e,t,n="gold",s=6){let r=new D(...i),a=new D(...e),o=a.clone().sub(r),l=Je(Gt(t,t,o.length(),s),n);return l.position.copy(r).add(a).multiplyScalar(.5),l.quaternion.setFromUnitVectors(new D(0,1,0),o.normalize()),l}function On(i,e,t="gold",n=32){return Je(new Un(i,e,5,n),t)}function Lf(i){let e=Object.keys(i[0].attributes),t=new Mt;for(let n of e){let s=i.map(l=>l.attributes[n]),r=s[0].array.constructor,a=new r(s.reduce((l,c)=>l+c.array.length,0)),o=0;for(let l of s)a.set(l.array,o),o+=l.array.length;t.setAttribute(n,new At(a,s[0].itemSize,s[0].normalized))}return t.computeBoundingSphere(),t}function Xl(i){i.updateMatrixWorld(!0);let e=new Map,t=[];i.traverse(n=>{if(n.isMesh&&!n.isInstancedMesh&&!n.isSkinnedMesh&&!Array.isArray(n.material)){let s=(n.geometry.index?n.geometry.toNonIndexed():n.geometry.clone()).applyMatrix4(n.matrixWorld),r=n.material.uuid;e.has(r)||e.set(r,{material:n.material,geometries:[]}),e.get(r).geometries.push(s),t.push(n)}});for(let n of t)n.removeFromParent();for(let{material:n,geometries:s}of e.values()){let r=Je(Lf(s),n);r.name=n.name+"-merged",i.add(r);for(let a of s)a.dispose()}return i}function D_(i,e,t){let n=new Tt;n.name=`landmark-${e}`;let s=[],r=i*1.04+6,a=[2.45,-.65,1.1,2.8,-1.8,.3][e%6],o=Math.sin(a)*r,l=Math.cos(a)*r,c=Je(Gt(5.7,2.2,5.5,t?9:5),"stone",[o,-3.2,l]);n.add(c);let h=Bt([Math.sin(a)*i*.8,-3.5,Math.cos(a)*i*.8],[o,-3.5,l],3.1,"dark",6);n.add(h);let u=(f,d,y,g=.35,m="chalk")=>{n.add(Je(Gt(g,g*1.2,y,t?8:5),m,[f,y/2,d])),s.push({shape:"cylinder",x:f,z:d,y:0,radius:g*1.2,height:y})},p=(f,d)=>[o+f,l+d];if(e===0){for(let y of[-3.6,3.6])for(let g of[-2.8,2.8])u(...p(y,g),4.6,.15,"gold");let f=new Ks;f.moveTo(-4.2,0),f.lineTo(0,2.1),f.lineTo(4.2,0),f.lineTo(4.2,-.065),f.lineTo(0,2.035),f.lineTo(-4.2,-.065),f.closePath();let d=Je(new ca(f,{depth:6.4,bevelEnabled:!1}),"chalk",[o,4.5,l-3.2]);n.add(d),n.add(Bt([o-4.2,4.5,l-3.2],[o,6.6,l-3.2],.055),Bt([o,6.6,l-3.2],[o+4.2,4.5,l-3.2],.055),Bt([o,6.6,l-3.2],[o,6.6,l+3.2],.055));for(let y=0;y<5;y++){let g=Je(new Ln(.23,.75,3),"copper",[o-2+y,4.3,l-3.25]);g.rotation.z=Math.PI,n.add(g)}}else if(e===1){for(let y of[-3.3,3.3])u(...p(y,0),5.7,.4);let f=Je(new Un(3.3,.32,5,t?24:12,Math.PI),"chalk",[o,5.7,l]);n.add(f);let d=On(1.25,.095);d.position.set(o,5.9,l),n.add(d),n.add(Bt([o,5.7,l],[o,9.6,l],.075));for(let y of[-1,1]){let g=Je(new Lt(1.6,.35,.1),"gold",[o+y*.8,9.2,l]);g.rotation.z=y*.12,n.add(g)}}else if(e===2){for(let d of[-3,3]){for(let y of[-3,3])u(...p(y,d),d<0?5.8:4.6,.55);n.add(Je(new Lt(7,.65,1.3),"chalk",[o,d<0?5.7:4.5,l+d]))}for(let d=0;d<5;d++){let y=Je(new Lt(6.4,.16,1),"sand",[o,.035,l-2.4+d*1.2]);n.add(y)}let f=Je(new ns(1.15,0),"dark",[o+4.5,.5,l+3.3],[1,.5,1]);n.add(f),s.push({shape:"cylinder",x:o+4.5,z:l+3.3,y:0,radius:1.2,height:1.1})}else if(e===3){for(let f of[-3.6,3.6])u(...p(f,0),7.8,.4,"dark");n.add(Bt([o-3.6,7.8,l],[o,10,l],.16),Bt([o,10,l],[o+3.6,7.8,l],.16)),n.add(Je(new Dn(1.1,0),"glow",[o,9.1,l],[.6,1.7,.6]));for(let f=0;f<3;f++){let d=On(1.35+f*.35,.055);d.position.set(o,7.1+f*.75,l),d.rotation.x=Math.PI/2,n.add(d)}n.add(Bt([o,10,l],[o,13,l],.055))}else if(e===4){for(let d=0;d<7;d++){let y=d/6*Math.PI*1.45-.7,g=o+Math.sin(y)*4.2,m=l+Math.cos(y)*4.2;if(u(g,m,5.5+d%2*.6,.42),n.add(Je(Gt(.65,.65,.22,6),"gold",[g,5.6+d%2*.6,m])),d<6){let S=(d+1)/6*Math.PI*1.45-.7;n.add(Bt([g,5.45,m],[o+Math.sin(S)*4.2,5.45,l+Math.cos(S)*4.2],.22,"chalk"))}}let f=On(2.4,.08);f.position.set(o,.11,l),f.rotation.x=Math.PI/2,n.add(f)}else{for(let y of[-3.5,3.5])u(...p(y,0),5.3,.45);let f=Je(new Un(3.5,.12,5,t?28:14,Math.PI),"gold",[o,5.3,l]);n.add(f);for(let y=1;y<4;y++){let g=f.clone();g.rotation.y=y*Math.PI/4,n.add(g)}let d=On(3.5,.12);d.rotation.x=Math.PI/2,d.position.set(o,5.3,l),n.add(d),n.add(Je(new Dn(.75,0),"glow",[o,6.5,l]))}return n.userData.obstacles=s,n}function If(i,e,t,n){let s=new Tt;s.name=`island-${e}-lod-${n}`;let r=Pf(e*37+11),a=n?40:18,o=new Ct({name:`island-${e}-terrace`,color:[7904390,6590082,6323326][t%3],roughness:1,flatShading:!0});s.add(Je(Gt(i,i*.98,.64,a),o,[0,-.32,0])),s.add(Je(Gt(i*.98,i*.78,i*.25,a),"stone",[0,-i*.125-.58,0])),s.add(Je(Gt(i*.79,i*.46,i*.31,a),"dark",[0,-i*.405-.5,0]));let l=Je(new Ln(i*.48,i*.55,a),"stone",[0,-i*.83-.42,0]);l.rotation.z=Math.PI,s.add(l);for(let h=0;h<(n?22:9);h++){let u=h*Math.PI*2/(n?22:9)+r()*.1,p=i*(.88+r()*.07),f=i*(.12+r()*.2),d=Je(Gt(i*.1,i*.07,f,5),"stone",[Math.sin(u)*p,-f*.45-.25,Math.cos(u)*p]);d.rotation.y=u,d.rotation.z=(r()-.5)*.24,s.add(d)}if(n){for(let u=0;u<Math.max(9,Math.round(i*.6));u++){let p=r()*Math.PI*2,f=i*(.23+r()*.62),d=Je(Gt(1,1,.05,9),u%3?Wl.turf:Wl.sand,[Math.sin(p)*f,-.005,Math.cos(p)*f],[1.5+r()*i*.12,1,1.2+r()*i*.1]);d.rotation.y=r()*6,d.castShadow=!1,s.add(d)}let h=On(i*.72,.055,"copper",48);h.rotation.x=-Math.PI/2,h.position.y=.025,s.add(h);for(let u=0;u<10;u++){let p=Je(new Lt(.32,.05,.9),"gold",[0,.025,i*(.17+u*.063)]);p.rotation.y=(e%3-1)*.1,s.add(p)}for(let u=0;u<8;u++){let p=u*Math.PI/4+.2,f=i*.84,d=Je(new ns(i*.045,0),"chalk",[Math.sin(p)*f,.08,Math.cos(p)*f],[1,.45,1]);d.rotation.set(.2,p,.2),s.add(d)}for(let u=0;u<12;u++){let p=u*Math.PI/6,f=i*.84,d=Je(new Lt(1.5,.13,2.1),"sand",[Math.sin(p)*f,.025,Math.cos(p)*f]);d.rotation.y=p,s.add(d)}}let c=D_(i,e,n);if(s.userData.obstacles=c.userData.obstacles,s.add(c),Xl(s),n){let h=U_({radius:i,count:Math.round(i*2.2)+e*3,seed:e});s.add(h)}return s}function Df({radius:i=12,region:e=0,index:t=0}={}){let n=new Tt;n.name=`island-${t}`;let s=typeof e=="number"?e:{\u8D77\u98A8:0,\u65B7\u6A4B:1,\u96F7\u96F2:2,breeze:0,bridge:1,storm:2}[e]||0,r=new Wr;return r.addLevel(If(i,t,s,!0),0),r.addLevel(If(i,t,s,!1),145),n.add(r),n.userData={radius:i,region:s,index:t,collider:{shape:"cylinder",radius:i,height:.6,top:0},obstacles:r.levels[0].object.userData.obstacles,assetId:`aetherwake.island.${t+1}`,lodDistances:[0,145]},n}function U_({radius:i=12,count:e=24,seed:t=0}={}){let n=new Tt;n.name="windgrass-cluster";let s=Pf(t*41+9),r=new xt,a=new Xn(new Ln(.24,.9,3),lr.moss,e*3),o=new Xn(new oi(.09,0),lr.gold,e);a.receiveShadow=!0;for(let l=0;l<e;l++){let c=s()*Math.PI*2,h=i*(.58+s()*.31),u=Math.sin(c)*h,p=Math.cos(c)*h;for(let f=0;f<3;f++)r.position.set(u+f*.23,.75,p+f*.18),r.rotation.set(.18,s()*6,.2+s()*.25),r.scale.set(1.7+s(),1.7+s()*1.8,2.2),r.updateMatrix(),a.setMatrixAt(l*3+f,r.matrix);r.position.set(u,1.7,p),r.rotation.set(0,0,0),r.scale.setScalar(1.8),r.updateMatrix(),o.setMatrixAt(l,r.matrix)}return a.name="instanced-grass",o.name="instanced-amber-seeds",n.add(a,o),n}function Oh(i=0){let e=typeof i=="number"?i%3:{wind:0,solar:1,astral:2}[i]??0,t=new Tt;t.name=["wind-observatory","solar-observatory","astral-observatory"][e],t.add(Je(Gt(2.05,2.3,.3,12),"chalk",[0,.15,0])),t.add(Je(Gt(1.6,1.9,.18,12),"copper",[0,.39,0]));let n=On(1.45,.07);n.rotation.x=Math.PI/2,n.position.y=.51,t.add(n);for(let r=0;r<8;r++){let a=r*Math.PI/4;t.add(Bt([Math.sin(a)*1.1,.53,Math.cos(a)*1.1],[Math.sin(a)*1.38,.53,Math.cos(a)*1.38],.03))}for(let r of[-1,1])t.add(Je(Gt(.19,.3,2.4,8),"chalk",[r*1,1.65,0])),t.add(Je(Gt(.3,.3,.13,8),"gold",[r*1,2.8,0]));t.add(Bt([-1,2.8,0],[1,2.8,0],.13));let s=Je(new Dn(.47,0),"glow",[0,2.15,0],[.8,1.4,.8]);if(t.add(s),e===0){let r=On(1.1,.085);r.position.y=2.15,r.rotation.y=.45,t.add(r),t.add(Bt([0,.5,0],[0,3.7,0],.08));for(let a=0;a<4;a++){let o=a*Math.PI/2,l=Je(new Lt(.65,.18,.08),"gold",[Math.cos(o)*.5,3.5+Math.sin(o)*.5,0]);l.rotation.z=o+.35,t.add(l)}}if(e===1){for(let r=0;r<3;r++){let a=On(.78+r*.18,.055);a.position.y=2.15,a.rotation.set(r*.8,.4+r*.65,.6),t.add(a)}for(let r=0;r<8;r++){let a=r*Math.PI/4;t.add(Bt([Math.cos(a)*1.05,2.15+Math.sin(a)*1.05,0],[Math.cos(a)*1.35,2.15+Math.sin(a)*1.35,0],.065))}}if(e===2){for(let r=0;r<3;r++){let a=On(1.12,.065);a.position.y=2.2,a.rotation.set(r*Math.PI/3,.3+r,.5),t.add(a)}t.add(Je(new Ln(.6,1,8),"gold",[0,3.65,0]));for(let r=0;r<4;r++){let a=r*Math.PI/2;t.add(Je(new Dn(.16,0),"glow",[Math.sin(a)*1.48,2.6,Math.cos(a)*1.48]))}}return Xl(t),t.userData={assetId:`aetherwake.station.${e+1}`,collider:{shape:"cylinder",radius:1.45,height:4.2},type:e},t}function Uf(i=0){let e=(i%12+12)%12,t=new Tt;t.name=`relic-${String(e+1).padStart(2,"0")}`;let n=[new Dn(.42,0),new oi(.42,0),new ns(.4,0)],s=Je(n[e%3],"glow",[0,.7,0],[.8+e%4*.1,1.15+e%3*.15,.65]);s.rotation.set(e*.15,e*.38,0),t.add(s);for(let o=0;o<3;o++)o!==e%3&&n[o].dispose();let r=On(.65,.045);r.position.y=.7,r.rotation.set(e%2?Math.PI/2:0,e*.28,e%3*.3),t.add(r);let a=3+e%4;for(let o=0;o<a;o++){let l=o*Math.PI*2/a+e*.31,c=Je(new Lt(.11,.23,.12),"gold",[Math.cos(l)*.62,.7+Math.sin(l)*.62,0]);c.rotation.z=l,t.add(c)}if(e>=6){let o=On(.34,.025,"chalk",16);o.position.y=.7,o.rotation.y=Math.PI/2,t.add(o)}return t.add(Je(Gt(.32,.43,.12,6),"dark",[0,.06,0])),Xl(t),t.userData={assetId:`aetherwake.relic.${String(e+1).padStart(2,"0")}`,variant:e,collider:{shape:"sphere",radius:1.15,center:[0,.7,0]}},t}function Bh(i="tailwind",{radius:e=3,height:t=9,length:n=14}={}){let s={steady:"tailwind",thermal:"updraft",side:"crosswind",tail:"tailwind",up:"updraft",cross:"crosswind"}[i]||i,r=new Tt;r.name=`wind-${s}`;let a=new pn({name:`wind-${s}-light`,color:s==="updraft"?16766873:s==="crosswind"?12498677:12381918,transparent:!0,opacity:.48,depthWrite:!1}),o=s==="updraft"?24:28,l=new Xn(new Ln(.18,.85,4),a,o),c=new xt;l.name="wind-direction-volume",r.add(l);let h=0,u=[];if(s==="updraft")for(let f=0;f<3;f++){let d=Je(new Un(e*.78,.055,4,40,Math.PI*1.65),a);d.rotation.x=-Math.PI/2,d.position.y=f*t/3,d.castShadow=!1,u.push(d),r.add(d)}else for(let f of[-1,1]){let d=new Pi(Array.from({length:9},(g,m)=>new D(f*e*.55+Math.sin(m*.8)*e*.08,.6+Math.sin(m*.6)*.25,-n/2+m*n/8))),y=Je(new ss(d,20,.045,4,!1),a);y.castShadow=!1,r.add(y)}let p=(f=0)=>{h+=f;for(let d=0;d<o;d++){let y=(h*.13+d/o)%1,g=d*2.399+h*.25;s==="updraft"?(c.position.set(Math.cos(g)*e*.78,y*t,Math.sin(g)*e*.78),c.rotation.set(0,0,0)):(c.position.set(Math.sin(d*4.3)*e*.7,1.6+Math.sin(d*3.1)*1.7,(y-.5)*n),c.rotation.set(Math.PI/2,0,s==="crosswind"?Math.sin(h+d)*.3:0)),c.scale.setScalar(.7+Math.sin(y*Math.PI)*.5),c.updateMatrix(),l.setMatrixAt(d,c.matrix)}l.instanceMatrix.needsUpdate=!0;for(let d=0;d<u.length;d++)u[d].position.y=(h*1.4+d*t/3)%t,u[d].rotation.z=h*.25+d*2};return p(),r.userData={type:s,update:p,assetId:`aetherwake.wind.${s}`,distribution:{radius:e,height:t,length:n},fixedParticleSize:!0},r}function It(i,e,t){let n=[];for(let s of t){let r=new Qt().setFromEuler(new fn(...s));n.push(r.x,r.y,r.z,r.w)}return new hi(`${i}.quaternion`,e,n)}function Nf(){let i=new Tt;i.name="aether-pilot";let e=new gn;e.name="root";let t=new gn;t.name="hips",t.position.y=.82,e.add(t);let n=new gn;n.name="torso",n.position.y=.22,t.add(n);let s=new gn;s.name="head",s.position.y=.55,n.add(s);let r=new gn;r.name="leftArm",r.position.set(-.32,.32,0),n.add(r);let a=new gn;a.name="rightArm",a.position.set(.32,.32,0),n.add(a);let o=new gn;o.name="leftLeg",o.position.set(-.15,-.05,0),t.add(o);let l=new gn;l.name="rightLeg",l.position.set(.15,-.05,0),t.add(l);let c=[e,t,n,s,r,a,o,l];e.updateMatrixWorld(!0);let h=[],u=(L,z,$,k,ie)=>{L.index&&(L=L.toNonIndexed());let Q=new Ye().compose(new D(...$),new Qt,new D(...k));L.applyMatrix4(Q).applyMatrix4(z.matrixWorld);let ce=L.attributes.position.count,De=new Uint16Array(ce*4),ke=new Float32Array(ce*4),Ke=new Float32Array(ce*3),$e=new Ve(ie);for(let Y=0;Y<ce;Y++)De[Y*4]=c.indexOf(z),ke[Y*4]=1,Ke[Y*3]=$e.r,Ke[Y*3+1]=$e.g,Ke[Y*3+2]=$e.b;L.setAttribute("skinIndex",new At(De,4)),L.setAttribute("skinWeight",new At(ke,4)),L.setAttribute("color",new At(Ke,3)),h.push(L)};u(Gt(.29,.24,.6,8),n,[0,.22,0],[1,1,1],en.chalk),u(new Lt(.42,.16,.33),t,[0,.04,0],[1,1,1],en.copper),u(new li(.235,10,7),s,[0,.08,.035],[1,1.05,1],13212542),u(new li(.25,10,6,0,Math.PI*2,0,Math.PI*.57),s,[0,.11,.02],[1,1,1],en.ink),u(new Lt(.4,.11,.12),s,[0,.12,.23],[1,1,1],en.gold),u(new Lt(.42,.5,.23),n,[0,.25,-.24],[1,1,1],en.copper);for(let L of[r,a])u(Gt(.105,.08,.55,7),L,[0,-.2,0],[1,1,1],en.chalk),u(new li(.09,8,5),L,[0,-.48,0],[1,1,1],13212542);for(let L of[o,l])u(Gt(.105,.08,.59,7),L,[0,-.3,0],[1,1,1],en.ink),u(new Lt(.19,.16,.33),L,[0,-.64,.065],[1,1,1],en.copper);let p=Lf(h),f=new Ct({name:"pilot-vertex-palette",vertexColors:!0,roughness:.8}),d=new Xr(p,f);d.name="pilot-rigged-body",d.add(e),d.bind(new qr(c)),d.castShadow=!0,i.add(d);for(let L of h)L.dispose();let y=new Tt;y.name="ivory-glider";let g=7,m=17,S=[],_=[],x=[];for(let L=0;L<g;L++)for(let z=0;z<m;z++){let $=z/(m-1),k=L/(g-1),ie=($-.5)*4.6,Q=(k-.5)*1.65-.12;S.push(ie,2.13+.4*Math.sin($*Math.PI)+.16*Math.sin(k*Math.PI),Q),_.push($,k)}for(let L=0;L<g-1;L++)for(let z=0;z<m-1;z++){let $=L*m+z;x.push($,$+1,$+m,$+1,$+m+1,$+m)}let C=g*m,w=[...x];for(let L=0;L<C;L++)S.push(S[L*3],S[L*3+1]-.026,S[L*3+2]),_.push(_[L*2],_[L*2+1]);for(let L=0;L<w.length;L+=3)x.push(w[L]+C,w[L+2]+C,w[L+1]+C);let A=[];for(let L=0;L<m;L++)A.push(L);for(let L=1;L<g;L++)A.push(L*m+m-1);for(let L=m-2;L>=0;L--)A.push((g-1)*m+L);for(let L=g-2;L>0;L--)A.push(L*m);for(let L=0;L<A.length;L++){let z=A[L],$=A[(L+1)%A.length];x.push(z,$,z+C,$,$+C,z+C)}let R=new Mt;R.setAttribute("position",new nt(S,3)),R.setAttribute("uv",new nt(_,2)),R.setIndex(x),R.computeVertexNormals(),y.add(Je(R,"chalk"));for(let L of[-1,-.5,0,.5,1]){let z=L*2.3,$=2.13+.4*Math.sin((L+1)*Math.PI/2);y.add(Bt([z,$,-.94],[z,$,.7],.023,"gold"))}y.add(Bt([-2.3,2.13,-.94],[0,2.53,-.94],.035,"gold"),Bt([0,2.53,-.94],[2.3,2.13,-.94],.035,"gold"));for(let L of[-1,1])y.add(Bt([L*1.65,2.35,-.45],[L*.38,1.2,0],.016,"ink"),Bt([L*1.65,2.35,.45],[L*.38,1.2,0],.016,"ink"));let b=Je(new Lt(.35,.025,1.58),"copper",[0,2.55,-.12]);y.add(b),Xl(y),y.visible=!1,i.add(y);let M=[new Nn("idle",2.4,[It("torso",[0,1.2,2.4],[[.025,0,0],[-.025,0,0],[.025,0,0]]),It("leftArm",[0,1.2,2.4],[[0,0,-.09],[.04,0,-.06],[0,0,-.09]]),It("rightArm",[0,1.2,2.4],[[0,0,.09],[-.04,0,.06],[0,0,.09]])]),new Nn("run",.7,[It("leftLeg",[0,.175,.35,.525,.7],[[.6,0,0],[0,0,0],[-.6,0,0],[0,0,0],[.6,0,0]]),It("rightLeg",[0,.175,.35,.525,.7],[[-.6,0,0],[0,0,0],[.6,0,0],[0,0,0],[-.6,0,0]]),It("leftArm",[0,.35,.7],[[-.5,0,-.08],[.5,0,-.08],[-.5,0,-.08]]),It("rightArm",[0,.35,.7],[[.5,0,.08],[-.5,0,.08],[.5,0,.08]])]),new Nn("jump",.45,[It("torso",[0,.2,.45],[[.12,0,0],[-.12,0,0],[-.05,0,0]]),It("leftLeg",[0,.2,.45],[[0,0,0],[-.5,0,0],[.15,0,0]]),It("rightLeg",[0,.2,.45],[[0,0,0],[-.45,0,0],[.1,0,0]]),It("leftArm",[0,.3,.45],[[0,0,0],[0,0,-1.4],[0,0,-1.2]]),It("rightArm",[0,.3,.45],[[0,0,0],[0,0,1.4],[0,0,1.2]])]),new Nn("glide",2,[It("torso",[0,1,2],[[.15,0,0],[.2,0,0],[.15,0,0]]),It("leftArm",[0,1,2],[[0,0,-1.7],[.06,0,-1.65],[0,0,-1.7]]),It("rightArm",[0,1,2],[[0,0,1.7],[-.06,0,1.65],[0,0,1.7]]),It("leftLeg",[0,1,2],[[.25,0,-.08],[.32,0,-.06],[.25,0,-.08]]),It("rightLeg",[0,1,2],[[.32,0,.08],[.25,0,.06],[.32,0,.08]])]),new Nn("land",.4,[It("torso",[0,.14,.4],[[.15,0,0],[.35,0,0],[0,0,0]]),It("leftLeg",[0,.14,.4],[[.2,0,0],[-.3,0,0],[0,0,0]]),It("rightLeg",[0,.14,.4],[[.2,0,0],[-.3,0,0],[0,0,0]])])],I=new ya(i),N=Object.fromEntries(M.map(L=>[L.name,I.clipAction(L)]));for(let L of["jump","land"])N[L].setLoop(Fl,1),N[L].clampWhenFinished=!0;let H="idle";N.idle.play();let W=(L,z={})=>{let $=typeof z=="string"?{mode:z}:z,k=$.mode||$.state||($.gliding?"glide":$.grounded===!1?"jump":$.speed>.5?"run":"idle"),ie=N[k]?k:"idle";ie!==H&&(N[ie].reset().play(),N[H].crossFadeTo(N[ie],.16,!1),H=ie),y.visible=ie==="glide",ie==="run"&&(N.run.timeScale=Math.max(.7,Math.min(1.7,($.speed||5)/5))),I.update(Math.min(L,.1))};return i.userData={assetId:"aetherwake.pilot",skeleton:c.map(L=>L.name),clips:M.map(L=>L.name),collider:{shape:"capsule",radius:.3,height:1.85},rootMotion:!1},{group:i,mixer:I,clips:M,update:W,sail:y}}var Nt=D;function N_(i,e,t=ue){if(!i)return null;let n=i.campaignIndex!=null?e.campaignCircuitStages[i.campaignIndex]:e.courseStages?.[i.id]||0,s=i.stages||[],r=n>=s.length?0:n,a=s[r],o=t.islands.find(p=>p.id===a?.fromIslandId),l=t.islands.find(p=>p.id===a?.toIslandId),c=o?{...i,x:o.x+18,y:o.y+22,z:o.z-18}:i,h=a?.gates||i.gates||[],u=i.campaignIndex!=null?e.campaignGate:e.challengeProgress?.[i.id]||0;return{entry:c,stage:a,stageIndex:r,completed:e.challenges?.includes(i.id)||!1,key:`${i.id}:${r}`,points:[c,...h,l||c],winds:(a?.winds||i.winds||[]).filter(p=>p.gate===u),progress:u}}function F_(i,e={}){let t=i.challengeHint||i.trackedHint||i.surveyHint,n=i.challengeHint?i.challengeHint.landing?`\u7B2C ${i.challengeHint.stage}/${i.challengeHint.stageTotal} \u6BB5 \xB7 \u843D\u5CF6\u4EA4\u4ED8`:`\u7B2C ${i.challengeHint.stage}/${i.challengeHint.stageTotal} \u6BB5 \xB7 \u6E2C\u98A8\u9580 ${i.challengeHint.step}/${i.challengeHint.total-1}`:i.trackedHint?i.trackedHint.transit?`\u5B89\u5168\u63A5\u99C1 ${i.trackedHint.transitStep}/${i.trackedHint.transitTotal}`:`${i.trackedHint.stageName||i.trackedHint.name}\u5165\u53E3`:i.surveyHint?`${i.surveyHint.name} ${i.surveyHint.step}/${i.surveyHint.total}`:null;return e.target=t,e.label=n,e.surveyTarget=i.activeChallenge?null:i.trackedHint?i.trackedHint.transit?i.trackedHint:null:i.surveyHint,e.mainRouteVisible=!i.activeChallenge&&!i.trackedHint&&i.activeCampaignCircuit==null,e}function O_(i,e){return!!(i&&e&&e.width>0&&e.height>0&&i.left<e.right+4&&i.right>e.left-4&&i.top<e.bottom+4&&i.bottom>e.top-4)}var zh=class{constructor(e,t,n=globalThis.ResizeObserver,s=[]){this.label=e,this.card=t,this.cards=[t,...s].filter(Boolean),this.anchor=null,this.placedAnchor={x:0,y:0},this.bounds={left:0,right:0,top:0,bottom:0},this.size=null,this.origin={x:0,y:0},this.cardRect=null,this.cardRects=[],this.observer=new n(()=>this.refresh()),this.observer.observe(e);for(let r of this.cards)this.observer.observe(r)}refresh(){this.cardRects=this.cards.map(t=>t.getBoundingClientRect()),this.cardRect=this.cardRects[0]||null;let e=this.label.getBoundingClientRect();e.width>0&&e.height>0&&(this.size={width:e.width,height:e.height},this.anchor&&(this.origin.x=e.left+e.width/2-this.anchor.x,this.origin.y=e.top+e.height/2-this.anchor.y)),this.apply()}place(e,t){this.anchor=this.placedAnchor,this.anchor.x=e,this.anchor.y=t,this.apply()}apply(){let e=null;this.anchor&&this.size&&(e=this.bounds,e.left=this.anchor.x+this.origin.x-this.size.width/2,e.right=this.anchor.x+this.origin.x+this.size.width/2,e.top=this.anchor.y+this.origin.y-this.size.height/2,e.bottom=this.anchor.y+this.origin.y+this.size.height/2);let t=!1;for(let n of this.cardRects)if(O_(e,n)){t=!0;break}this.label.style.visibility=t?"hidden":""}dispose(){this.observer.disconnect()}};function B_(i){let e=i.type==="updraft"||i.type==="thermal",t=i.start?it(i.end.x-i.start.x,i.end.z-i.start.z):30,n=Bh(i.type,{radius:e?i.radius*.65:5,height:e?32:9,length:t});if(n.position.set(i.x,e?i.ceiling-29:i.start?(i.start.y+i.end.y)/2:20,i.z),!e&&i.direction&&(n.rotation.y=Math.atan2(i.direction.x,i.direction.z)),i.start&&i.end){let s=n.worldToLocal(new Nt(i.start.x,i.start.y??i.y,i.start.z)),r=n.worldToLocal(new Nt(i.end.x,i.end.y??i.y,i.end.z)),a=new Pi([s,new Nt().lerpVectors(s,r,.5).add(new Nt(0,1,0)),r]),o=new dt(new ss(a,24,.6,5,!1),new pn({color:i.type==="crosswind"?"#e6bc73":"#b6f1da",transparent:!0,opacity:.15,depthWrite:!1}));o.name="wind-corridor-path",n.add(o)}return n}function kh(i){let e=new Set,t=new Set;i.traverse(n=>{n.geometry&&e.add(n.geometry);for(let s of Array.isArray(n.material)?n.material:n.material?[n.material]:[])t.add(s)});for(let n of e)n.dispose();for(let n of t)n.dispose()}var $l=class{constructor(e="#ffe1a2"){this.group=new Tt,this.group.name="flight-target";let t=new pn({color:e,depthWrite:!1});this.ring=new dt(new Un(1,.018,8,48),t),this.group.add(this.ring),this.arrow=new Tt,this.shaft=new dt(new ai(.1,.1,1,6),t),this.tip=new dt(new Ln(.75,1.8,7),t),this.shaft.rotation.x=this.tip.rotation.x=Math.PI/2,this.arrow.add(this.shaft,this.tip),this.group.add(this.arrow),this.group.visible=!1}update(e,t){if(this.group.visible=!!e,!e)return;let n=e.radius||10,s=e.heading,r=s&&it(s.x,s.z)>0;this.group.position.set(e.x,e.y+(e.landing?.25:0),e.z),this.ring.scale.setScalar(n),this.group.rotation.set(e.landing?-Math.PI/2:0,e.landing?0:r?Math.atan2(s.x,s.z):Math.atan2(t.x-e.x,t.z-e.z),0),this.arrow.visible=!!r&&!e.landing;let a=Math.min(12,Math.max(6,n));this.arrow.position.set(0,n+1.5,0),this.shaft.scale.y=a-1.8,this.shaft.position.z=-.9,this.tip.position.z=a/2-.9}dispose(){kh(this.group)}};function Hh(i){for(let e=i;e;e=e.parent)if(!e.visible)return!1;return!0}function Ff(i,e,t,n=new ls){let s=t.filter(Hh),r=new Map;for(let[a,o]of[["head",1.65],["torso",1.05],["hips",.55]]){let c=new Nt(e.x,e.y+o,e.z).sub(i.position),h=c.length();if(!(h<=i.near+.1)){n.set(i.position,c.normalize()),n.near=i.near,n.far=h-.1;for(let u of n.intersectObjects(s,!1)){let p=r.get(u.object);(!p||u.distance<p.distance)&&r.set(u.object,{...u,sample:a})}}}return[...r.values()].sort((a,o)=>a.distance-o.distance)}var Vh=class{constructor(){this.meshes=[],this.bounds=[],this.localRay=new Gn,this.direction=new Nt,this.hitPoint=new Nt,this.pose=new Float64Array(6),this.pose.fill(1/0),this.owners=new Map,this.materials=new Map,this.materialEntries=[],this.targets=new Set,this.ray=new ls,this.sinceSample=1/0,this.maxFadedMeshes=8}register(e,t={}){e.updateWorldMatrix(!0,!0),e.traverse(n=>{!n.isMesh||n.isInstancedMesh||n.isSkinnedMesh||this.owners.has(n)||!(Array.isArray(n.material)?n.material:[n.material]).some(r=>r.visible&&(!r.transparent||r.opacity>=.85))||(n.geometry.computeBoundingBox(),this.bounds.push({mesh:n,box:n.geometry.boundingBox,inverse:n.matrixWorld.clone().invert()}),this.meshes.push(n),this.owners.set(n,t))})}blockers(e,t){this.targets.clear();for(let n=0;n<3;n++){this.direction.set(t.x,t.y+(n===0?1.65:n===1?1.05:.55),t.z).sub(e.position);let s=this.direction.length();if(!(s<=e.near+.1)){this.ray.set(e.position,this.direction.normalize());for(let r of this.bounds){if(!Hh(r.mesh)||(this.localRay.copy(this.ray.ray).applyMatrix4(r.inverse),!this.localRay.intersectBox(r.box,this.hitPoint)))continue;this.hitPoint.applyMatrix4(r.mesh.matrixWorld);let a=this.hitPoint.distanceTo(e.position);if(a>e.near&&a<s-.1&&this.targets.add(r.mesh),this.targets.size>=this.maxFadedMeshes)return}}}}update(e,t,n,s=!0){let r=Math.max(0,Math.min(n,.1));if(this.sinceSample+=r,!s)this.targets.clear(),this.sinceSample=1/0;else if(this.sinceSample>=.075){let o=e.position,l=this.pose;(l[0]!==o.x||l[1]!==o.y||l[2]!==o.z||l[3]!==t.x||l[4]!==t.y||l[5]!==t.z)&&(this.blockers(e,t),l[0]=o.x,l[1]=o.y,l[2]=o.z,l[3]=t.x,l[4]=t.y,l[5]=t.z),this.sinceSample=0}let a=Math.max(0,this.maxFadedMeshes-this.targets.size);for(let o of this.materialEntries){let l=o.mesh;o.factor<1&&!this.targets.has(l)&&a--<=0&&(o.factor=1,l.material=o.original)}for(let o of this.targets){if(this.materials.has(o))continue;let l=o.material,c=Array.isArray(l)?l:[l],h=c.map(p=>{let f=p.clone();return f.transparent=!0,f.depthWrite=!1,f}),u={mesh:o,original:l,sources:c,copies:h,factor:1,faded:Array.isArray(l)?h:h[0]};this.materials.set(o,u),this.materialEntries.push(u)}for(let o of this.materialEntries){let l=o.mesh,c=s&&this.targets.has(l)&&Hh(l);if(o.factor=c?Math.max(.16,o.factor-r*8):Math.min(1,o.factor+r*6),o.factor>=1)l.material=o.original;else{for(let h=0;h<o.copies.length;h++)o.copies[h].opacity=o.sources[h].opacity*o.factor;l.material=o.faded}}}inspect(e,t){let n=Ff(e,t,this.meshes),s=r=>{let a=this.materials.get(r);return{object:r.name||r.type,...this.owners.get(r),opacityFactor:a&&r.material===a.faded?a.factor:1}};return{hits:n,treatment:{method:"bounded-foreground-fade",applied:n.some(r=>s(r.object).opacityFactor<1),maximumMeshes:this.maxFadedMeshes,targetOpacityFactor:.16,sampleIntervalSeconds:.075,rawBlockers:n.map(r=>({...s(r.object),sample:r.sample})),fadingMeshes:[...this.materials].filter(([r,a])=>r.material===a.faded).map(([r])=>s(r)),retainedMaterialClones:[...this.materials.values()].reduce((r,a)=>r+a.copies.length,0)}}}dispose(){for(let e of this.materialEntries){let t=e.mesh;t.material=e.original;for(let n of e.copies)n.dispose()}this.materials.clear(),this.materialEntries.length=0,this.targets.clear(),this.meshes.length=0,this.bounds.length=0,this.owners.clear()}},ql=class{constructor(e){this.canvas=e,this.mapScale=ue.mapScale||1,this.scene=new Gr,this.scene.background=new Ve("#8fc8c8"),this.scene.fog=new Vr("#a4d2ce",.0012/this.mapScale),this.renderer=new Vl({canvas:e,antialias:!1,alpha:!1,powerPreference:"high-performance"}),this.renderer.setPixelRatio(Math.min(devicePixelRatio,1.5)),this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=Go,this.renderer.outputColorSpace=jt,this.renderer.toneMapping=Ko,this.renderer.toneMappingExposure=1.2;let t=this.renderer.getContext(),n=t.getExtension("WEBGL_debug_renderer_info"),s=n?t.getParameter(n.UNMASKED_RENDERER_WEBGL):"";this.softwareRenderer=/swiftshader|llvmpipe|software/i.test(s),this.quality="auto",this.autoScale=this.softwareRenderer?.65:1,this.slowSamples=[],this.camera=new qt(56,1,.3,1800*this.mapScale),this.camera.position.set(100,88,145),this.scene.add(new pa("#e9f3d4","#277d81",2.7)),this.sun=new ga("#fff1c5",3),this.sun.position.set(-80,130,40),this.sun.castShadow=!0,this.sun.shadow.mapSize.set(1024,1024),Object.assign(this.sun.shadow.camera,{left:-45,right:45,top:45,bottom:-45,near:1,far:240}),this.sun.shadow.bias=-.001,this.sun.shadow.normalBias=.2,this.scene.add(this.sun,this.sun.target);let r=new dt(new li(1300*this.mapScale,32,16),new mn({side:Vt,depthWrite:!1,uniforms:{top:{value:new Ve("#438c9e")},bottom:{value:new Ve("#b4d8d2")}},vertexShader:"varying vec3 p;void main(){p=position;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}",fragmentShader:"varying vec3 p;uniform vec3 top;uniform vec3 bottom;void main(){float h=clamp(normalize(p).y*.85+.18,0.,1.);vec3 c=mix(bottom,top,pow(h,.65));float sun=pow(max(0.,dot(normalize(p),normalize(vec3(-.5,.35,-.6)))),80.);gl_FragColor=vec4(c+vec3(.35,.24,.1)*sun,1.);}"}));r.material.fog=!1,this.scene.add(r),this.islands=[],this.stations=[],this.relics=[],this.winds=[],this.collidables=[],this.foreground=new Vh,this.labels=[],ue.islands.forEach((d,y)=>{let g=Df({radius:d.radius,region:d.region,index:y});if(g.position.set(d.x,d.y,d.z),this.scene.add(g),this.islands.push(g),this.foreground.register(g,{kind:"island",id:d.id}),g.traverse(S=>{S.isMesh&&!S.isInstancedMesh&&this.collidables.push(S)}),d.station){let S=Oh([0,2,1][this.stations.length%3]);S.position.set(d.x,d.y+.1,d.z),S.scale.setScalar(1.8),this.scene.add(S),this.foreground.register(S,{kind:"station",id:d.id}),this.stations.push({data:d,group:S})}else if(y===0){let S=Oh("astral");S.position.set(d.x+7,d.y,d.z+5),S.scale.setScalar(1.4),this.scene.add(S),this.foreground.register(S,{kind:"camp-decoration",id:d.id})}let m=document.createElement("div");m.className="island-label",m.innerHTML=`<span>${String(y+1).padStart(2,"0")} / ${d.region}</span>${d.name}<b>${d.station?"\u25C7":"\xB7"}</b>`,document.querySelector("#world-labels").append(m),this.labels.push({label:m,data:d})}),ue.relics.forEach((d,y)=>{let g=Uf(y);g.position.set(d.x,d.y+1.2,d.z),this.scene.add(g),this.relics.push({data:d,group:g})}),ue.winds.forEach(d=>{let y=B_(d);this.scene.add(y);let g=d.start?it(d.end.x-d.start.x,d.end.z-d.start.z)/2:0,m=vs(g,d.radius||10,40),S=new on(y.position.clone(),m);this.winds.push({data:d,group:y,halfLength:g,bounds:S,animationDt:0})}),this.hazards=ue.hazards.map(d=>{let y=new Tt,g=new Ct({color:d.type==="thunder"?"#34485d":"#cbdfd4",transparent:!0,opacity:d.type==="thunder"?.57:.19,roughness:1,depthWrite:!1}),m=new Xn(new oi(1,1),g,12),S=new xt;for(let _=0;_<12;_++){let x=_*2.399;S.position.set(Math.cos(x)*d.radius*.6,_%4*10+18,Math.sin(x)*d.radius*.6),S.scale.set(d.radius*.42,8,d.radius*.32),S.updateMatrix(),m.setMatrixAt(_,S.matrix)}if(y.add(m),d.type==="thunder"){let _=new dt(new Dn(4,0),new Ct({color:"#d6a9f4",emissive:"#ad77cf",emissiveIntensity:1}));_.position.y=33,y.add(_),y.userData.core=_}return y.position.set(d.x,d.y,d.z),this.scene.add(y),{group:y,data:d}}),this.challenges=ue.challenges.map(d=>{let y=new $l("#f7d38e");return this.scene.add(y.group),{data:d,group:y.group,marker:y}}),this.surveyMarker=new $l,this.surveyMarker.group.name="main-survey-target",this.scene.add(this.surveyMarker.group),this.pilot=Nf(),this.wasGrounded=!0,this.landingTime=0,this.scene.add(this.pilot.group);let a=new pn({color:"#082d39",transparent:!0,opacity:.24,depthWrite:!1});this.contactShadow=new dt(new Qr(1.5,24),a),this.contactShadow.rotation.x=-Math.PI/2,this.scene.add(this.contactShadow),this.marker=new Tt;let o=new dt(new Un(4.6,.12,6,56),new pn({color:"#ffe1a2",transparent:!0,opacity:.8}));o.rotation.x=-Math.PI/2,this.marker.add(o);let l=new dt(new ai(.15,.15,38,6),new pn({color:"#ffe5ae",transparent:!0,opacity:.25,depthWrite:!1}));l.position.y=19,this.marker.add(l),this.scene.add(this.marker);let c=new oi(1,1),h=new Ct({color:"#d1e2ce",roughness:1,flatShading:!0,transparent:!0,opacity:.52,depthWrite:!1});this.clouds=new Xn(c,h,100);let u=new xt;for(let d=0;d<100;d++){let y=d*2.39996,g=(90+Math.sqrt(d)*62)*this.mapScale;u.position.set(Math.cos(y)*g+70*this.mapScale,-55-d%5*8,Math.sin(y)*g-80*this.mapScale),u.scale.set((22+d%5*7)*Math.sqrt(this.mapScale),10+d%3*5,(15+d%7*4)*Math.sqrt(this.mapScale)),u.rotation.y=y,u.updateMatrix(),this.clouds.setMatrixAt(d,u.matrix)}this.scene.add(this.clouds);let p=new Mt,f=new Float32Array(540);for(let d=0;d<180;d++)f[d*3]=((Math.sin(d*237.33)*.5+.5)*700-250)*this.mapScale,f[d*3+1]=d%47*2,f[d*3+2]=(Math.cos(d*131.13)*350-50)*this.mapScale;p.setAttribute("position",new At(f,3)),this.dust=new Jr(p,new Ys({size:.5,color:"#eff5c9",transparent:!0,opacity:.55,sizeAttenuation:!0})),this.scene.add(this.dust),this.routeLine=null,this.courseLine=null,this.courseId=null,this.courseWindKey="",this.courseWinds=[],this.yaw=0,this.manualYaw=0,this.cameraSnapPending=!1,this.pitch=.63,this.distance=26,this.overhead=!1,this.reduced=!1,this.menu=!0,this.target=new Nt,this.head=new Nt,this.desired=new Nt,this.look=new Nt,this.direction=new Nt,this.sunOffset=new Nt(-70,110,45),this.pilotSample={grounded:!0,gliding:!1,speed:0,mode:"idle"},this.navigationView={},this.navigationHint=void 0,this.navigationPhase="",this.fallbackNavigation={x:0,y:0,z:0,label:""},this.courseViews=new Map,this.projection=new Nt,this.worldPoint=new Nt,this.playerPoint=new Nt,this.windFrustum=new Ii,this.viewProjection=new Ye,this.phase={sceneUpdateMs:0,renderCpuMs:0},this.ray=new ls,this.frames=[],this.metrics={frames:0,drawCalls:0,triangles:0,geometries:0,textures:0},this.navTarget=document.querySelector("#nav-target"),this.navText=this.navTarget.querySelector("span"),this.navOcclusion=new zh(this.navTarget,document.querySelector("#course"),globalThis.ResizeObserver,[document.querySelector(".telemetry")]),this.resize=()=>{let d=e.clientWidth,y=e.clientHeight;this.viewportWidth=d,this.viewportHeight=y,this.navTarget.style.width=`${Math.min(260,d-24)}px`,this.renderer.setSize(d,y,!1),this.camera.aspect=d/y,this.camera.updateProjectionMatrix(),this.navOcclusion.refresh()},window.addEventListener("resize",this.resize),this.resize()}setQuality(e){this.quality=e,this.renderer.setPixelRatio(e==="low"?.7:e==="auto"?Math.min(devicePixelRatio,1.5)*this.autoScale:Math.min(devicePixelRatio,1.5)),this.renderer.shadowMap.enabled=e==="high"||e==="auto"&&!this.softwareRenderer&&this.autoScale>=.9,this.clouds.visible=e!=="low",this.clouds.count=e==="auto"&&this.autoScale<.9?40:100,this.resize()}sampleFrame(e){if(this.quality!=="auto"||this.autoScale<=.5||(this.slowSamples.push(e),this.slowSamples.length<90))return;let t=this.slowSamples.reduce((n,s)=>n+s,0)/this.slowSamples.length;this.slowSamples.length=0,t>29&&(this.autoScale=Math.max(.5,this.autoScale-.15),this.setQuality("auto"))}setRoute(e){if(this.routeLine&&(this.scene.remove(this.routeLine),this.routeLine.geometry.dispose(),this.routeLine.material.dispose(),this.routeLine=null),!e?.waypoints?.length)return;let t=e.waypoints.map(n=>new Nt(n.x,n.y+2,n.z));this.routeLine=new qs(new Mt().setFromPoints(t),new Qs({color:e.style==="shortcut"?"#f2bf7a":"#c7f4df",dashSize:3,gapSize:4,transparent:!0,opacity:.55})),this.routeLine.computeLineDistances(),this.scene.add(this.routeLine)}cachedCourse(e,t,n=ue){if(!e)return null;let s=e.campaignIndex!=null?t.campaignCircuitStages[e.campaignIndex]:t.courseStages[e.id]||0,r=e.campaignIndex!=null?t.campaignGate:t.challengeProgress[e.id]||0,a=t.challenges.includes(e.id),o=this.courseViews.get(e.id);return(!o||o.saved!==s||o.progress!==r||o.complete!==a)&&(o={saved:s,progress:r,complete:a,view:N_(e,t,n)},this.courseViews.set(e.id,o)),o.view}updateCourse(e,t=ue){let n=e.activeCampaignCircuit!=null?t.campaignCircuits[e.activeCampaignCircuit]:null;if(!n){for(let o of t.challenges)if(o.id===e.activeChallenge){n=o;break}}let s=this.cachedCourse(n,e,t);if(this.courseVisual===s)return;this.courseVisual=s;let r=s?.key||null;if(this.courseId!==r&&(this.courseLine&&(this.scene.remove(this.courseLine),kh(this.courseLine),this.courseLine=null),this.courseId=r,s)){let o=s.points.map(l=>new Nt(l.x,l.y,l.z));this.courseLine=new qs(new Mt().setFromPoints(o),new Qs({color:"#f7d38e",dashSize:2,gapSize:4,transparent:!0,opacity:.6})),this.courseLine.computeLineDistances(),this.scene.add(this.courseLine)}let a=s?`${s.key}:${s.progress}`:"";if(this.courseWindKey!==a){for(let{group:o}of this.courseWinds)this.scene.remove(o),kh(o);this.courseWinds=[],this.courseWindKey=a;for(let o of s?.winds||[]){let l=o.type==="thermal"||o.type==="updraft",c=o.start?it(o.end.x-o.start.x,o.end.z-o.start.z):30,h=Bh(o.type,{radius:l?o.radius*.6:4,height:25,length:c});h.position.set(o.x,l?o.ceiling-22:o.start?(o.start.y+o.end.y)/2:o.y+o.height/2,o.z),!l&&o.direction&&(h.rotation.y=Math.atan2(o.direction.x,o.direction.z)),this.scene.add(h),this.courseWinds.push({data:o,group:h})}}}updateWorldWinds(e,t){let n=this.quality==="low"||this.quality==="auto"&&this.autoScale<.9;this.viewProjection.multiplyMatrices(this.camera.projectionMatrix,this.camera.matrixWorldInverse),this.windFrustum.setFromProjectionMatrix(this.viewProjection);let s=null,r=1/0;for(let a of this.winds){if(!a.data.start||!oc(a.data,e))continue;let{start:o,end:l}=a.data,c=l.x-o.x,h=l.z-o.z,u=us.clamp(((e.player.x-o.x)*c+(e.player.z-o.z)*h)/(c*c+h*h||1),0,1),p=it(e.player.x-o.x-u*c,e.player.z-o.z-u*h);p<r&&(s=a,r=p)}for(let a of this.winds){let{data:o,group:l,halfLength:c,bounds:h}=a,u=it(o.x-e.player.x,o.z-e.player.z),p=(this.menu?850:420)+(c||o.radius),f=!o.start&&u<(o.radius||0)+30,d=!n||a===s||f||this.windFrustum.intersectsSphere(h);l.visible=oc(o,e)&&u<p&&d&&(o.type!=="crosswind"||Math.sin(e.elapsed/o.period*Math.PI*2+e.seed%1009/1009*Math.PI*2)>0),!(!l.visible||this.reduced)&&(a.animationDt+=t,(!n||a.animationDt>=.05)&&(l.userData.update?.(a.animationDt),a.animationDt=0))}}rotate(e,t){this.manualYaw-=e,this.pitch=us.clamp(this.pitch+t,.23,1.15)}zoom(e){this.distance=us.clamp(this.distance+e,16,52)}recenter({immediate:e=!1}={}){this.manualYaw=0,this.pitch=.63,this.distance=26,e&&(this.yaw=0,this.cameraSnapPending=!0)}inspectCamera(e){let t=new Nt(e.x,e.y+2,e.z),n=t.clone().project(this.camera),s=this.camera.position.distanceTo(t),r=this.foreground?.inspect(this.camera,e),a=r?.hits||Ff(this.camera,e,this.collidables),o=a[0],l=ue.islands.find(h=>vs(this.camera.position.x-h.x,this.camera.position.z-h.z)<h.radius),c=h=>({x:h.x,y:h.y,z:h.z});return{position:c(this.camera.position),target:c(this.target),near:this.camera.near,far:this.camera.far,fov:this.camera.fov,mode:this.menu?"menu":this.overhead?"overhead":"follow",manualYaw:this.manualYaw,yaw:this.yaw,pitch:this.pitch,distance:s,canvas:{width:this.canvas.width,height:this.canvas.height,cssWidth:this.canvas.clientWidth,cssHeight:this.canvas.clientHeight,pixelRatio:this.renderer.getPixelRatio()},playerNDC:c(n),playerInFrustum:Math.abs(n.x)<=1&&Math.abs(n.y)<=1&&Math.abs(n.z)<=1,platformUnderCamera:l?{id:l.id,surfaceY:l.y,clearance:this.camera.position.y-l.y}:null,occlusion:{blocked:!!o,rawBlocked:!!o,distance:o?.distance??null,point:o?c(o.point):null,object:o?o.object.name||o.object.type:null,sample:o?.sample??null,rawBlockerCount:a.length,treatment:r?.treatment??{method:"none",applied:!1},method:"Camera-to-player head, torso and hips rays against visible island and independent station/camp meshes. Raw geometry hits remain blocked even while locally faded. Excludes hidden LOD ancestry, instanced vegetation and translucent wind/cloud effects."}}}update(e,t,n,s){let r=performance.now(),a=this.viewportWidth,o=this.viewportHeight;this.reduced&&(n=0);let l=e.player,c=e.challengeHint||e.trackedHint||e.surveyHint;(this.navigationHint!==c||this.navigationPhase!==e.activeChallenge)&&(F_(e,this.navigationView),this.navigationHint=c,this.navigationPhase=e.activeChallenge);let h=this.navigationView,u=it(l.vx||0,l.vz||0);this.pilot.group.position.set(l.x,l.y,l.z),this.pilot.group.rotation.y=Math.PI-(l.heading||0),l.grounded&&!this.wasGrounded&&(this.landingTime=.42),this.landingTime=Math.max(0,this.landingTime-t),this.wasGrounded=l.grounded;let p=this.pilotSample;p.grounded=l.grounded,p.gliding=l.gliding,p.speed=u,p.mode=this.landingTime>0?"land":l.gliding?"glide":l.grounded?u>.4?"run":"idle":"jump",this.pilot.update(t,p);for(let{data:w,group:A}of this.relics)A.visible=!e.relics.includes(w.id),this.reduced||(A.rotation.y=n*.7),A.position.y=w.y+1.2+(this.reduced?0:Math.sin(n*1.5+w.x)*.25);for(let{data:w,marker:A}of this.challenges){let R=this.cachedCourse(w,e);A.update(R.completed||e.activeCampaignCircuit!=null?null:e.activeChallenge===w.id&&e.challengeHint?e.challengeHint:R.entry,l)}this.surveyMarker.update(h.surveyTarget,l),this.updateCourse(e),this.routeLine&&(this.routeLine.visible=h.mainRouteVisible);for(let{data:w,group:A}of this.courseWinds)A.userData.update?.(this.reduced?0:t),w.type==="crosswind"&&(A.visible=Math.sin(e.elapsed/w.period*Math.PI*2+e.seed%1009/1009*Math.PI*2)>0);for(let{data:w,group:A}of this.hazards)if(A.userData.core){let R=Math.sin(e.elapsed/w.period*Math.PI*2+e.seed%19)>.15;A.userData.core.material.emissiveIntensity=R?2:.25,A.userData.core.rotation.y=n*.3}this.scene.fog.density=e.hazard==="fog"?.006:.0012/this.mapScale;let f=null;for(let w of ue.islands)if(it(l.x-w.x,l.z-w.z)<w.radius){f=w;break}this.contactShadow.visible=!!f,f&&(this.contactShadow.position.set(l.x,f.y+.09,l.z),this.contactShadow.scale.setScalar(Math.max(.5,1-(l.y-f.y)*.01))),this.marker.visible=!!s&&h.mainRouteVisible&&!e.surveyHint,this.marker.visible&&(this.marker.position.set(s.x,s.y+.2,s.z),this.marker.rotation.y=n*.2);let d=this.head.set(l.x,l.y+2,l.z);this.camera.updateMatrixWorld();for(let w of this.islands)for(let A of w.children)A.isLOD&&A.update(this.camera);let y;if(this.menu)y=this.desired.set(82+Math.sin(n*.03)*10,74,112),this.target.set(-20,7,-62),this.camera.position.lerp(y,1-Math.exp(-t*2));else{this.yaw=this.manualYaw;let w=this.overhead?1.22:this.pitch,A=this.overhead?65:this.distance*(this.camera.aspect<.8?1.3:1);y=this.desired.set(Math.sin(this.yaw)*Math.cos(w)*A,Math.sin(w)*A,Math.cos(this.yaw)*Math.cos(w)*A).add(d);let R=this.look.set(l.x+(l.vx||0)*.25,l.y+2,l.z+(l.vz||0)*.25),b=this.reduced||this.cameraSnapPending;this.target.lerp(R,b?1:1-Math.exp(-t*10));for(let N of ue.islands)it(y.x-N.x,y.z-N.z)<N.radius+3&&(y.y=Math.max(y.y,N.y+8));let M=d.distanceTo(y),I=M;for(let N=1;N<=48;N++){let H=N/48,W=d.x+(y.x-d.x)*H,L=d.y+(y.y-d.y)*H,z=d.z+(y.z-d.z)*H;if(!(H*M<=4)){for(let $ of ue.islands){let k=$.y-L;if(k<=-.2||k>=38)continue;let ie=$.radius*Math.max(.15,1-Math.max(0,k-2)/43)+.75;if(it(W-$.x,z-$.z)<ie){I=H*M;break}}if(I<M)break}}I<M&&y.lerp(d,Math.min(.7,1-(I-2)/M)),this.camera.position.lerp(y,b?1:1-Math.exp(-t*9)),this.cameraSnapPending=!1}this.camera.lookAt(this.target),this.camera.updateMatrixWorld();for(let w of this.islands)for(let A of w.children)A.isLOD&&A.update(this.camera);this.updateWorldWinds(e,t),this.foreground.update(this.camera,l,t,!this.menu);let g=null;for(let w of ue.routes)if(w.id===e.objective?.routeId){g=w;break}let m=h.target;if(!m&&g){let w=0,A=1/0;for(let b=0;b<g.waypoints.length;b++){let M=g.waypoints[b],I=it(M.x-l.x,M.z-l.z);I<A&&(A=I,w=b)}m=this.fallbackNavigation;let R=g.waypoints[Math.min(w+1,g.waypoints.length-1)];m.x=R.x,m.y=R.y,m.z=R.z,m.label=w+1>=g.waypoints.length-1?"\u76EE\u6A19\u5CF6":"\u98A8\u9053\u7BC0\u9EDE"}let S=this.navTarget,_=m?"":"none";if(S.style.display!==_&&(S.style.display=_),m){let w=this.worldPoint.set(m.x,m.y,m.z),A=this.projection.copy(w).project(this.camera),R=(A.x*.5+.5)*a,b=(-A.y*.5+.5)*o;A.z>1&&(R=a/2,b=o-170);let M=Math.min(260,a-24),I=us.clamp(R,M/2+8,a-M/2-8),N=us.clamp(b,100,o-180);S.style.transform=`translate3d(${I}px, ${N}px, 0) translate(-50%, -50%)`;let H=h.label||m.label,W=this.navText,L=`${H} \xB7 ${Math.round(w.distanceTo(this.playerPoint.set(l.x,l.y,l.z)))}m${m.heading?" \xB7 \u9806\u7BAD\u982D\u5165\u74B0":""}`;W.textContent!==L&&(W.textContent=L),this.navOcclusion.place(I,N)}this.sun.position.copy(d).add(this.sunOffset),this.sun.target.position.copy(d),this.sun.target.updateMatrixWorld();for(let{label:w,data:A}of this.labels){let R=this.projection.set(A.x,A.y+14,A.z).project(this.camera),b=this.camera.position.distanceTo(this.worldPoint.set(A.x,A.y,A.z)),M=R.z<1&&R.z>-1&&Math.abs(R.x)<1.1&&Math.abs(R.y)<1.1&&b>35?"block":"none";if(w.style.display!==M&&(w.style.display=M),M==="none")continue;w.style.transform=`translate3d(${(R.x*.5+.5)*a}px, ${(-R.y*.5+.5)*o}px, 0) translate(-50%, -100%)`;let I=String(Math.max(.35,1-b/(750*this.mapScale)));w.style.opacity!==I&&(w.style.opacity=I)}let x=performance.now();this.phase.sceneUpdateMs=x-r,this.renderer.render(this.scene,this.camera),this.phase.renderCpuMs=performance.now()-x;let C=this.renderer.info;this.metrics.frames++,this.metrics.drawCalls=C.render.calls,this.metrics.triangles=C.render.triangles,this.metrics.geometries=C.memory.geometries,this.metrics.textures=C.memory.textures}dispose(){window.removeEventListener("resize",this.resize),this.navOcclusion.dispose(),this.foreground.dispose(),this.scene.traverse(e=>{e.geometry?.dispose(),e.material&&(Array.isArray(e.material)?e.material:[e.material]).forEach(n=>n.dispose())}),this.renderer.dispose()}};var Yl=class{constructor(e,t){this.keys=new Set,this.axes={x:0,z:0},this.glide=!1,this.requestId=0,this.pendingId=0,this.sample={x:0,z:0,brake:!1,glide:!1,requestId:0},this.touchBrake=!1,this.brakePointer=null,this.enabled=!1,this.actions=t,this.listeners=[],this.disposed=!1,this.pointerCaptures=new Map,this.cameraPointer=null,this.cameraMousePointer=null,this.joyPointer=null;let n=(f,d,y,g)=>{f.addEventListener(d,y,g),this.listeners.push(()=>f.removeEventListener(d,y,g))};n(window,"keydown",f=>{if(!f.defaultPrevented){if(f.code==="Escape"){f.preventDefault(),f.repeat||t.pause();return}if(!/INPUT|SELECT|TEXTAREA/.test(f.target.tagName)&&["Space","ArrowUp","ArrowDown","ArrowLeft","ArrowRight","KeyW","KeyA","KeyS","KeyD","ShiftLeft","ShiftRight","KeyE","KeyC","KeyV","KeyH"].includes(f.code)){if(f.code==="Space"&&f.target.tagName==="BUTTON")return;f.preventDefault(),f.repeat||(f.code==="KeyH"&&t.help(),f.code==="KeyV"&&t.view(),f.code==="KeyC"&&t.recenter(),f.code==="KeyE"&&this.enabled&&t.interact(),f.code==="Space"&&this.enabled&&this.queueGlide()),this.enabled&&this.keys.add(f.code)}}}),n(window,"keyup",f=>this.keys.delete(f.code)),n(window,"blur",()=>{this.clear(),t.blur()}),n(document,"visibilitychange",()=>{document.hidden&&(this.clear(),t.blur())}),n(e,"contextmenu",f=>f.preventDefault());let s=f=>Number.isInteger(f.buttons)&&f.buttons>=0,r=f=>{this.cameraMousePointer!==f.pointerId&&this.cameraPointer?.id!==f.pointerId||(this.cameraPointer=null,this.cameraMousePointer=null,this.releasePointer(e,f.pointerId))};n(e,"pointerdown",f=>{if(!(this.cameraPointer!==null||this.cameraMousePointer!==null)){if(f.pointerType==="mouse"&&s(f)){if(!f.buttons||!this.capturePointer(e,f.pointerId))return;this.cameraMousePointer=f.pointerId,f.buttons&2&&(this.cameraPointer={id:f.pointerId,x:f.clientX,y:f.clientY});return}if(f.button===2||f.pointerType==="touch"){if(!this.capturePointer(e,f.pointerId))return;this.cameraPointer={id:f.pointerId,x:f.clientX,y:f.clientY}}}}),n(e,"pointermove",f=>{if(this.cameraMousePointer===f.pointerId){if(!s(f)||f.pointerType==="touch")return;if(!f.buttons)return r(f);if(!(f.buttons&2)){this.cameraPointer=null;return}if(!this.cameraPointer){this.cameraPointer={id:f.pointerId,x:f.clientX,y:f.clientY};return}}let d=this.cameraPointer;!d||d.id!==f.pointerId||(t.rotate((f.clientX-d.x)*.005,(f.clientY-d.y)*.004),d.x=f.clientX,d.y=f.clientY)}),n(e,"pointerup",r),n(e,"pointercancel",r),n(e,"lostpointercapture",r),n(e,"wheel",f=>{f.preventDefault(),t.zoom(f.deltaY*.02)},{passive:!1});let a=document.querySelector("#joystick"),o=document.querySelector("#stick"),l=f=>{if(this.joyPointer!==f.pointerId||!this.enabled)return;let d=a.getBoundingClientRect(),y=f.clientX-d.left-d.width/2,g=f.clientY-d.top-d.height/2,m=Math.hypot(y,g),S=Math.min(m,d.width*.32),_=m?y/m*S:0,x=m?g/m*S:0;this.axes={x:_/(d.width*.32),z:x/(d.height*.32)},o.style.transform=`translate(${_}px,${x}px)`};n(a,"pointerdown",f=>{f.preventDefault(),this.joyPointer===null&&this.capturePointer(a,f.pointerId)&&(this.joyPointer=f.pointerId,l(f))}),n(a,"pointermove",l);let c=f=>{this.joyPointer===f.pointerId&&(this.joyPointer=null,this.axes={x:0,z:0},o.style.transform="",this.releasePointer(a,f.pointerId))};n(a,"pointerup",c),n(a,"pointercancel",c),n(a,"lostpointercapture",c);let h=document.querySelector("#touch-glide");n(h,"pointerdown",f=>{f.preventDefault(),this.enabled&&this.queueGlide()});let u=document.querySelector("#touch-brake");n(u,"pointerdown",f=>{if(f.preventDefault(),this.enabled&&this.brakePointer===null){if(!this.capturePointer(u,f.pointerId))return;this.brakePointer=f.pointerId,this.touchBrake=!0}});let p=f=>{this.brakePointer===f.pointerId&&(this.brakePointer=null,this.touchBrake=!1,this.releasePointer(u,f.pointerId))};for(let f of["pointerup","pointercancel","lostpointercapture"])n(u,f,p);n(document.querySelector("#touch-reset"),"click",t.recenter)}capturePointer(e,t){try{return e.setPointerCapture(t),this.pointerCaptures.set(e,t),!0}catch{return!1}}releasePointer(e,t){this.pointerCaptures.get(e)===t&&this.pointerCaptures.delete(e);try{e.hasPointerCapture(t)&&e.releasePointerCapture(t)}catch{}}queueGlide(){return!this.enabled||this.glide?!1:(this.glide=!0,this.pendingId=++this.requestId,this.actions.glideQueued?.(this.pendingId),!0)}read(e=0){let t=this.sample;if(!this.enabled)return t.x=t.z=t.requestId=0,t.brake=t.glide=!1,t;let n=(this.keys.has("KeyD")||this.keys.has("ArrowRight")?1:0)-(this.keys.has("KeyA")||this.keys.has("ArrowLeft")?1:0)+this.axes.x,s=(this.keys.has("KeyS")||this.keys.has("ArrowDown")?1:0)-(this.keys.has("KeyW")||this.keys.has("ArrowUp")?1:0)+this.axes.z,r=Math.max(1,Math.hypot(n,s));return t.x=(n*Math.cos(e)+s*Math.sin(e))/r,t.z=(s*Math.cos(e)-n*Math.sin(e))/r,t.brake=this.touchBrake||this.keys.has("ShiftLeft")||this.keys.has("ShiftRight"),t.glide=this.glide,t.requestId=this.pendingId,this.pendingId=0,this.glide=!1,t}clear(){let e=[...this.pointerCaptures];this.pointerCaptures.clear(),this.keys.clear(),this.glide=!1,this.pendingId=0,this.actions.glideCleared?.(),this.axes={x:0,z:0},this.touchBrake=!1,this.brakePointer=null,this.joyPointer=null,this.cameraPointer=null,this.cameraMousePointer=null,document.querySelector("#stick").style.transform="";for(let[t,n]of e)this.releasePointer(t,n)}setEnabled(e){this.enabled=e,e||this.clear()}dispose(){this.disposed||(this.disposed=!0,this.listeners.forEach(e=>e()),this.listeners.length=0,this.clear())}};var z_=Object.freeze({glide:{notes:[392,587.33,783.99],duration:.3,type:"triangle",gain:.18},tailwind:{notes:[293.66,440,587.33],duration:.45,type:"sine",gain:.13},energy:{notes:[220,196],duration:.16,type:"triangle",gain:.13},land:{notes:[98,146.83,196],duration:.22,type:"sine",gain:.22},stall:{notes:[293.66,220,146.83],duration:.2,type:"triangle",gain:.15},unlock:{notes:[293.66,369.99,440,587.33,739.99],duration:.19,type:"sine",gain:.2},ui:{notes:[587.33],duration:.07,type:"sine",gain:.09},relic:{notes:[440,587.33,880],duration:.15,type:"sine",gain:.17},finish:{notes:[293.66,369.99,440,587.33,739.99,880],duration:.25,type:"sine",gain:.2}}),k_={deploy:"glide",sail:"glide",open:"glide",wind:"tailwind",low:"energy",lowEnergy:"energy",exhausted:"energy",landing:"land",fail:"stall",respawn:"stall",station:"unlock",interact:"ui",collect:"relic",complete:"finish"},ys=(i,e,t)=>Math.min(t,Math.max(e,Number.isFinite(i)?i:e)),H_=[293.66,0,440,369.99,587.33,0,440,0,329.63,0,493.88,440,369.99,0,293.66,0],Zl=class{constructor(){this.context=null,this.musicVolume=.55,this.sfxVolume=.7,this.paused=!1,this.active=new Set,this.lastEvent=new Map,this.musicTime=0,this.nextNote=0,this.noteIndex=0,this.windFilter=null,this.windGain=null,this.disposed=!1,this.sampleBuffers=new Map,this.sampleFailed=!1,this.stats={peakVoices:0,events:0,maxVoices:20}}async unlock(){try{return await this.openContext()}catch{return!1}}async openContext(){if(this.disposed)return!1;let e=globalThis.AudioContext||globalThis.webkitAudioContext;if(!e)return!1;if(!this.context){this.context=new e;let t=this.context;this.master=t.createGain(),this.master.gain.value=.6,this.master.connect(t.destination),this.musicBus=t.createGain(),this.sfxBus=t.createGain(),this.musicBus.gain.value=this.musicVolume,this.sfxBus.gain.value=this.sfxVolume,this.musicBus.connect(this.master),this.sfxBus.connect(this.master);let n=t.sampleRate*4,s=t.createBuffer(1,n,t.sampleRate),r=s.getChannelData(0),a=72429,o=0;for(let l=0;l<n;l++){a=Math.imul(a,1664525)+1013904223>>>0;let c=a/4294967296*2-1;o=.985*o+.015*c,r[l]=o*4*Math.min(1,l/512,(n-1-l)/512)}this.air=t.createBufferSource(),this.air.buffer=s,this.air.loop=!0,this.windFilter=t.createBiquadFilter(),this.windFilter.type="lowpass",this.windFilter.frequency.value=450,this.windGain=t.createGain(),this.windGain.gain.value=.12,this.air.connect(this.windFilter),this.windFilter.connect(this.windGain),this.windGain.connect(this.musicBus),this.air.start(),this.loadSamples()}return await this.syncContext(),this.context?.state==="running"}async loadSamples(){try{await Promise.all(["glide","land","stall","unlock","ui","relic"].map(async e=>{let t=await fetch(new URL(`./assets/audio/${e}.wav`,document.baseURI));if(!t.ok)throw new Error(`audio ${e}: ${t.status}`);let n=await this.context.decodeAudioData(await t.arrayBuffer());this.disposed||this.sampleBuffers.set(e,n)}))}catch{this.sampleFailed=!0}}setVolumes({music:e=this.musicVolume,sfx:t=this.sfxVolume}={}){if(this.musicVolume=ys(Number(e),0,1),this.sfxVolume=ys(Number(t),0,1),this.context){let n=this.context.currentTime;this.musicBus.gain.setTargetAtTime(this.musicVolume,n,.035),this.sfxBus.gain.setTargetAtTime(this.sfxVolume,n,.035)}}syncContext(){return this.transition=(this.transition||Promise.resolve()).catch(()=>{}).then(async()=>{let e=this.context;!e||this.disposed||e.state==="closed"||(this.paused&&e.state==="running"?await e.suspend():!this.paused&&e.state!=="running"&&(this.nextNote=e.currentTime+.1,await e.resume()))}).catch(()=>{}),this.transition}setPaused(e){this.paused=!!e,this.syncContext()}register(e){if(this.active.size>=this.stats.maxVoices){let t=this.active.values().next().value;try{t.stop()}catch{}this.active.delete(t)}this.active.add(e),this.stats.peakVoices=Math.max(this.stats.peakVoices,this.active.size),e.onended=()=>{e.onended=null,this.active.delete(e);try{e.disconnect()}catch{}}}tone(e,t,n,s,r,a){let o=this.context,l=o.createOscillator(),c=o.createGain();l.type=s,l.frequency.setValueAtTime(e,t),c.gain.setValueAtTime(1e-4,t),c.gain.exponentialRampToValueAtTime(Math.max(1e-4,r),t+.015),c.gain.exponentialRampToValueAtTime(1e-4,t+n),l.connect(c),c.connect(a),this.register(l);let h=l.onended;l.onended=()=>{h(),c.disconnect()},l.start(t),l.stop(t+n+.02)}play(e){if(!this.context||this.context.state!=="running"||this.paused||this.disposed)return;let t=k_[e]||e,n=z_[t];if(!n)return;let s=this.context.currentTime,r=this.lastEvent.get(t)??-1/0,a=t==="glide"?0:t==="energy"?1.6:t==="tailwind"?1:.08;if(s-r<a)return;this.lastEvent.set(t,s),this.stats.events++;let o=this.sampleBuffers.get(t);if(o){let l=this.context.createBufferSource(),c=this.context.createGain();l.buffer=o,c.gain.value=.6,l.connect(c),c.connect(this.sfxBus),this.register(l);let h=l.onended;l.onended=()=>{h(),c.disconnect()},l.start();return}n.notes.forEach((l,c)=>this.tone(l,s+c*n.duration*.58,n.duration,n.type,n.gain,this.sfxBus))}update({speed:e=0,energy:t=100,wind:n=0,dt:s=1/60}={}){if(!this.context||this.context.state!=="running"||this.paused||this.disposed)return;let r=this.context,a=r.currentTime,o=typeof n=="number"?n:n?1:0;this.windFilter.frequency.setTargetAtTime(360+ys(e,0,30)*28+ys(o,0,2)*190,a,.2),this.windGain.gain.setTargetAtTime(.07+ys(e,0,30)*.007+ys(o,0,2)*.07,a,.2),t<18&&t>0&&this.play("energy");let l=H_;if(this.nextNote<a-.5&&(this.nextNote=a+.06),this.nextNote<=a+.13){let c=this.noteIndex%l.length,h=l[c];h&&this.tone(h,this.nextNote,1.75,"sine",.065,this.musicBus),c%4===0&&this.tone(c<8?146.83:164.81,this.nextNote,3.3,"triangle",.028,this.musicBus),this.nextNote+=.8,this.noteIndex++}this.musicTime+=ys(s,0,.1)}async dispose(){if(!this.disposed){this.disposed=!0;for(let e of this.active)try{e.stop(),e.disconnect()}catch{}if(this.active.clear(),this.air)try{this.air.stop(),this.air.disconnect()}catch{}this.sampleBuffers.clear(),this.context&&this.context.state!=="closed"&&await this.context.close(),this.context=null}}};var Of=i=>{if(i===null||typeof i!="object")return!1;let e=Object.getPrototypeOf(i);return e===Object.prototype||e===null},Jl=class{constructor(e){this.handlers=e,this.ready=!1,this.currentState="ready",this.session=new URLSearchParams(location.search).get("session"),this.embedded=window.parent!==window&&!!this.session,this.listener=t=>this.receive(t),window.addEventListener("message",this.listener)}send(e,t={}){this.embedded&&window.parent.postMessage({protocol:"stteak-game",version:1,sessionId:this.session,type:e,payload:t},location.origin)}setReady(){this.ready=!0,this.send("game:ready",{capabilities:["pause","resume","restart","keyboard","touch","local-save"]}),this.state(this.currentState)}state(e){this.currentState=e,this.send("game:state",{state:e})}receive(e){let t=e.data;if(!(!this.embedded||e.source!==window.parent||e.origin!==location.origin||!Of(t)||t.protocol!=="stteak-game"||t.version!==1||t.sessionId!==this.session||!Of(t.payload))){if(t.type==="host:init"){t.payload.gameId==="aetherwake"&&typeof t.payload.title=="string"&&this.ready&&this.setReady();return}!["host:start","host:pause","host:resume","host:restart"].includes(t.type)||Object.keys(t.payload).length||this.ready&&this.handlers[t.type]?.()}}dispose(){window.removeEventListener("message",this.listener)}};var Kl=class{constructor(e,t=2048){this.names=e,this.capacity=t,this.samples=Object.fromEntries(e.map(n=>[n,new Float64Array(t)])),this.count=0,this.index=0}push(e){for(let t of this.names)this.samples[t][this.index]=e[t];this.index=(this.index+1)%this.capacity,this.count=Math.min(this.count+1,this.capacity)}summary(){return Object.fromEntries(this.names.map(e=>{let t=Array.from(this.samples[e].subarray(0,this.count)).sort((n,s)=>n-s);return[e,{count:this.count,mean:this.count?t.reduce((n,s)=>n+s,0)/this.count:null,p95:this.count?t[Math.min(this.count-1,Math.floor(this.count*.95))]:null}]}))}};var Gh={id:"aetherwake-r4-20261112",version:"1.1.0",stage:"candidate",date:"2026-11-12"};var Me=i=>document.querySelector(i),kt=(i,e=!0)=>Me(i).classList.toggle("hidden",!e),Qe=(i,e)=>{Me(i).textContent!==String(e)&&(Me(i).textContent=e)},ur=i=>`${String(Math.floor(i/60)).padStart(2,"0")}:${String(Math.floor(i%60)).padStart(2,"0")}`;function V_(i){let e=[];return i.minSpeed&&e.push(`\u901F\u5EA6 \u2265${i.minSpeed}m/s`),i.maxSpeed&&e.push(`\u901F\u5EA6 \u2264${i.maxSpeed}m/s`),i.minEnergy&&e.push(`\u80FD\u91CF \u2265${i.minEnergy}%`),i.maxVerticalSpeed&&e.push(`\u5347\u964D \u2264${i.maxVerticalSpeed}m/s`),i.heading&&e.push("\u9806\u74B0\u4E0A\u7BAD\u982D\u901A\u904E"),e.join(" \xB7 ")}var Zt=i=>String(i).replace(/[&<>"']/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[e]),ct,_n,pe,Fe,Yn,Pt,ft,Gf=null,dr="turn",ht=!1,Ft="",cr=null,Bf=0,_i=0,zf="",fr=!1,hr=!1,ec,Ni=0,Aa=performance.now(),Wh=0,Ca=new Ba,Wf=new Kl(["simulationMs","sceneUpdateMs","renderCpuMs","hudMapMs","rafIntervalMs","applicationUpdateMs"]),Ql=new Float64Array(9e3),Xh=0,wa=0,Xf=0,tc=0,kf=0,jl={speed:0,energy:100,wind:!1},Ui={simulationMs:0,sceneUpdateMs:0,renderCpuMs:0,hudMapMs:0,rafIntervalMs:0,applicationUpdateMs:0},vt={accepted:0,applied:0,receipt:0,acknowledged:0,processed:0,consumed:0,maxProcessingMs:0,submitted:0,submittedId:0,maxConsumptionProcessingMs:0,maxAcknowledgementMs:0,eventCount:0,maxEventAcknowledgementMs:0},tn=()=>pe.status==="complete"||pe.status==="failed",gi=()=>pe.status==="failed"?ep():tp(),$f=0,qf=0,Yf=0;function zt(i){Qe("#toast",i),Me("#toast").classList.add("visible"),clearTimeout(Bf),Bf=setTimeout(()=>Me("#toast").classList.remove("visible"),4200)}function Zf(){return pe?.state.mode==="exploration"?"\u81EA\u7531\u63A2\u7D22\u5B8C\u6210 / \u4E0D\u8A08\u6392\u540D":Gf?"\u9060\u5F81\u5B8C\u6210 / \u672C\u6B21\u4FDD\u5B58\u672A\u5B8C\u6210":"\u9060\u5F81\u5B8C\u6210 / \u500B\u4EBA\u6210\u7E3E\u5DF2\u4FDD\u5B58"}function Yh(i){Gf=i||null,kt("#storage-warning",!!i),i&&Qe("#storage-warning",i),Ft==="result"&&Qe("#modal-kicker",Zf())}function Wt(){let i=Ca.save({...pe.saveData(),settings:Pt});return Yh(i.warning),ft=Ca.load().save,i}function xs(){ct.setQuality(Pt.quality),ct.reduced=Pt.reducedMotion,ct.overhead=Pt.camera==="overhead",Fe.setVolumes({music:Pt.music,sfx:Pt.sfx}),Qe("#camera",ct.overhead?"\u8FFD\u96A8 V":"\u4FEF\u77B0 V")}function G_(){for(let i of document.querySelectorAll(".module"))i.setAttribute("aria-pressed",String(i.dataset.module===dr))}function W_(i){dr=i,G_(),Fe?.play("ui")}function yi(i=!1){if(!hr){if(clearTimeout(_i),Oi(!1),Fe.unlock(),i?(pe=new ws({save:ft}),dr=ft.module):(pe.persisted=ft,pe.state.mode=Me("#mode").value,pe.reset({seed:Number(Me("#seed").value)||2718,module:dr})),tn()){ht=!0,ct.menu=!1,ct.recenter({immediate:!0}),_n.setEnabled(!1),kt("#landing",!1),kt("#flight-hud"),Jn(),gi();return}pe.launch(),ht=!0,ct.menu=!1,ct.recenter({immediate:!0}),Ni=0,Aa=performance.now(),_n.setEnabled(!0),kt("#landing",!1),kt("#flight-hud"),Fe.setPaused(!1),Yn.state("running"),kt("#guide",!fr),Me("#world").focus(),Wt(),Jn(),zt(i?"\u5DF2\u56DE\u5230\u4E0A\u6B21\u7684\u5B89\u5168\u843D\u9EDE\u3002":matchMedia("(pointer: coarse)").matches?"\u5148\u9EDE\u5C55\u5E06\u8D77\u8DF3\uFF0C\u518D\u7528\u5DE6\u6416\u687F\u6CBF\u5730\u5716\u98A8\u7DDA\u524D\u9032\u3002":"\u5148\u6309 Space \u8D77\u8DF3\uFF0C\u518D\u6CBF\u5730\u5716\u4E0A\u7684\u98A8\u7DDA\u524D\u9032\u3002")}}function Fi(i="pause"){clearTimeout(_i),!(!ht||tn())&&(pe.setPaused(!0),_n.setEnabled(!1),i==="dialogue"?_i=setTimeout(()=>Fe.setPaused(!0),1200):Fe.setPaused(!0),Ni=0,Yn.state("paused"),Wt(),(i==="pause"||i==="blur")&&pr(i==="blur"?"\u822A\u7A0B\u5DF2\u5B89\u5168\u66AB\u505C":"\u5728\u98A8\u505C\u4E0B\u4F86\u7684\u5730\u65B9"))}function Zn(){hr||(clearTimeout(_i),!(!ht||tn())&&(Oi(!1),pe.setPaused(!1),_n.setEnabled(!0),Fe.unlock(),Fe.setPaused(!1),Aa=performance.now(),Ni=0,Yn.state("running"),Me("#world").focus()))}function Hf(){if(Ft)return Jf();if(!ht)return xi();pe.status==="paused"?Zn():Fi()}function Jf(){if(Ft&&Ft!=="context"){if(Ft==="erase")return Ia();if(Ft==="settings")return xi();if(Ft==="courses"||Ft==="journal")return ht&&tn()?gi():xi();if(Ft==="restart")return pr();if(Ft==="result"||Ft==="failure"){Ra(),Me("#start").focus();return}if(Ft==="help")return ht?tn()?gi():pr():Oi();if(ht)return tn()?gi():Zn();Oi()}}var $h=0;function Bn(i,e,t,n=[],s="AETHERWAKE / \u822A\u884C\u8A8C"){let r=++$h;Ft||(cr=document.activeElement),Ft=i,Qe("#modal-kicker",s),Qe("#modal-title",e),Me("#modal").append(Me("#storage-warning")),Me("#modal-body").innerHTML=t,Me("#modal-actions").replaceChildren();for(let a of n){let o=document.createElement("button");o.textContent=a.label,o.disabled=!!a.disabled,a.primary&&(o.className="primary"),o.onclick=()=>{Fe.play("ui"),a.action()},Me("#modal-actions").append(o)}kt("#modal");for(let a of Me("#game").children)["modal","toast","storage-warning","fatal"].includes(a.id)||(a.inert=!0);requestAnimationFrame(()=>{if(r!==$h||!Ft)return;let a=Me("#modal .modal-panel"),o=Me("#modal-actions button"),l=Me("#close-modal"),c=a.scrollHeight>a.clientHeight,h=["help","journal","courses"].includes(i);a.scrollTop=0,(h||c?l:o||l).focus({preventScroll:!0})})}function Oi(i=!0){++$h,kt("#modal",!1),Me("#toast").after(Me("#storage-warning")),Ft="";for(let e of Me("#game").children)e.inert=!1;i&&(cr?.isConnected&&cr!==document.body&&!cr.closest(".hidden")?cr:Me(ht?"#world":"#start")).focus(),cr=null,Me("#modal-body").replaceChildren(),Me("#modal-actions").replaceChildren()}function Kf(){return`<div class="settings-grid"><label>\u74B0\u5883\u8207\u97F3\u6A02 <input id="music-volume" type="range" min="0" max="1" step="0.05" value="${Pt.music}"></label><label>\u52D5\u4F5C\u97F3\u6548 <input id="sfx-volume" type="range" min="0" max="1" step="0.05" value="${Pt.sfx}"></label><label>\u756B\u8CEA <select id="quality"><option value="auto">\u81EA\u52D5 \xB7 \u4F9D\u6548\u80FD\u8ABF\u6574\u89E3\u6790\u5EA6</option><option value="low">\u7BC0\u80FD \xB7 \u95DC\u9589\u5373\u6642\u9670\u5F71</option><option value="high">\u7CBE\u7DFB \xB7 \u5373\u6642\u9670\u5F71</option></select></label><label>\u93E1\u982D <select id="camera-setting"><option value="follow">\u53D7\u63A7\u8FFD\u96A8</option><option value="overhead">\u4FEF\u77B0\u822A\u7DDA</option></select></label><label class="check"><input id="reduced-motion" type="checkbox" ${Pt.reducedMotion?"checked":""}>\u6E1B\u5C11\u52D5\u614B\uFF0F\u8996\u5DEE</label><label class="check"><input id="assist" type="checkbox" ${pe.assist?"checked":""}>\u98A8\u7DDA\u8F14\u52A9\uFF08\u7368\u7ACB\u6A19\u8A18\u6210\u7E3E\uFF09</label></div><p class="modal-note">\u5C07\u5169\u500B\u97F3\u91CF\u6ED1\u687F\u8ABF\u81F3 0 \u53EF\u5B8C\u5168\u975C\u97F3\u3002\u8A2D\u5B9A\u6703\u81EA\u52D5\u4FDD\u5B58\u3002</p>`}function jf(){if(pe.state.mode==="expedition"){let i=document.createElement("button");i.textContent="\u6C38\u4E45\u6539\u70BA\u81EA\u7531\u63A2\u7D22\uFF08\u672C\u6B21\u4E0D\u6392\u540D\uFF09",i.onclick=()=>{pe.setExploration(),Wt(),Ia()},Me("#modal-body").append(i)}Me("#quality").value=Pt.quality,Me("#camera-setting").value=Pt.camera;for(let[i,e]of[["music-volume","music"],["sfx-volume","sfx"]])Me("#"+i).oninput=t=>{Pt[e]=Number(t.target.value),Fe.unlock(),xs(),Wt()};Me("#quality").onchange=i=>{Pt.quality=i.target.value,xs(),Wt()},Me("#camera-setting").onchange=i=>{Pt.camera=i.target.value,xs(),Wt()},Me("#reduced-motion").onchange=i=>{Pt.reducedMotion=i.target.checked,xs(),Wt()},Me("#assist").onchange=i=>{pe.setAssist(i.target.checked),Wt()}}function X_(){return ht?tn()?gi():pr():Oi()}function pr(i="\u5728\u98A8\u505C\u4E0B\u4F86\u7684\u5730\u65B9"){if(ht&&tn())return gi();Bn("pause",i,`<p>\u98DB\u884C\u3001\u5E06\u80FD\u91CF\u8207\u8A08\u6642\u5DF2\u51CD\u7D50\u3002\u5B89\u5168\u843D\u5CF6\u8207\u53D6\u5F97\u788E\u7247\u6642\u6703\u81EA\u52D5\u5132\u5B58\uFF1B\u91CD\u65B0\u8F09\u5165\u6703\u56DE\u5230\u6700\u5F8C\u7684\u5B89\u5168\u5CF6\u3002</p>${Kf()}`,[{label:"\u7E7C\u7E8C\u822A\u7A0B",primary:!0,action:Zn},{label:"\u64CD\u4F5C\u8207\u822A\u884C\u8A8C",action:xi},{label:"\u9078\u64C7\u6E2C\u98A8\u9060\u5F81",action:Zh},{label:"\u91CD\u65B0\u9060\u5F81",action:$_},{label:"\u8FD4\u56DE\u6E96\u5099\u756B\u9762",action:Ra}],"\u2161 / \u822A\u7A0B\u66AB\u505C"),jf()}function $_(){Bn("restart","\u91CD\u65B0\u8FCE\u63A5\u9019\u9663\u98A8\uFF1F","<p>\u672C\u8D9F\u89C0\u6E2C\u53F0\u3001\u4E3B\u7DDA\u89C0\u6E2C\u8207\u6642\u9593\u6703\u91CD\u65B0\u8A08\u7B97\u3002\u6587\u660E\u788E\u7247\u3001\u5DF2\u4EA4\u4ED8\u7684\u6E2C\u98A8\u968E\u6BB5\u3001\u5DF2\u767C\u73FE\u5CF6\u5DBC\u8207\u500B\u4EBA\u6210\u7E3E\u4FDD\u7559\u3002\u82E5\u8981\u63DB\u6A21\u7D44\u6216\u7A2E\u5B50\uFF0C\u8ACB\u8FD4\u56DE\u6E96\u5099\u756B\u9762\u3002</p>",[{label:"\u91CD\u65B0\u9060\u5F81",primary:!0,action:()=>yi(!1)},{label:"\u4FDD\u7559\u822A\u7A0B",action:()=>pr()}])}function Ra(){clearTimeout(_i),ht&&!tn()&&(Fi("silent"),Wt()),ht=!1,_n.setEnabled(!1),Fe.setPaused(!0),ct.menu=!0,Oi(),kt("#flight-hud",!1),kt("#landing"),kt("#continue",ft.elapsed>0),Qe("#continue",ft.failed?"\u67E5\u770B\u64A4\u56DE\u7D00\u9304":ft.completed?"\u67E5\u770B\u7D50\u7B97\uFF0F\u7E7C\u7E8C\u63A2\u7D22":"\u7E7C\u7E8C\u4E0A\u6B21\u822A\u7A0B"),Yn.state("ready"),Qe("#objective","\u8B93\u6C89\u7761\u7684\u661F\u5716\u518D\u6B21\u767C\u5149"),Qe("#objective-sub","\u4F9D\u5E8F\u4FEE\u5FA9\u4E09\u5EA7\u89C0\u6E2C\u53F0\uFF0C\u8FD4\u56DE\u71DF\u5730\u3002")}function xi(){ht&&pe.status==="running"&&Fi("silent"),Bn("help","\u8B80\u61C2\u98A8\uFF0C\u627E\u5230\u56DE\u5BB6\u7684\u8DEF",'<p class="modal-note">\u9060\u5F81\u7684\u5929\u5019\u7A97\u53E3\u70BA 45 \u5206\u9418\uFF08\u50C5\u5BE6\u969B\u822A\u7A0B\u8A08\u6642\uFF0C\u5730\u9762\u4EA6\u8A08\u6642\uFF09\uFF1B\u903E\u6642\u9060\u5F81\u5931\u6557\uFF0C\u53EF\u91CD\u555F\u6216\u6C38\u4E45\u8F49\u70BA\u4E0D\u6392\u540D\u7684\u81EA\u7531\u63A2\u7D22\u3002\u4E09\u6BB5\u4E3B\u7DDA\u5206\u5225\u662F\u6E2C\u98A8\u6821\u6E96\u3001\u7A69\u5B9A\u8CA8\u904B\u3001\u9727\u4E2D\u5B9A\u4F4D\u3002\u6BCF\u5EA7\u89C0\u6E2C\u53F0\u4EA4\u4ED8\u5F8C\uFF0C\u5FC5\u9808\u5B8C\u6210\u4E09\u6BB5\u4E5D\u9580\u5DE1\u6E2C\uFF1A\u84C4\u98A8\u9810\u7B97\u3001\u5074\u6D41\u5B9A\u5411\u3001\u9727\u6D77\u5FA9\u6838\u3002\u6BCF\u6BB5\u843D\u5CF6\u6309 E \u4FDD\u5B58\uFF0C\u4E4B\u5F8C\u624D\u80FD\u63A5\u7E8C\u4E3B\u7DDA\u3002\u6700\u5F8C\u6CBF\u516D\u5EA7\u8FD4\u822A\u822A\u6A19\u56DE\u71DF\u5730\u7D50\u7B97\u3002\u4F9D\u5E8F\u901A\u904E\u5E36\u689D\u4EF6\u7684\u89C0\u6E2C\u74B0\uFF0C\u518D\u843D\u5230\u8606\u5149\u5EAD \u2192 \u96F7\u96F2\u5929\u6587\u53F0 \u2192 \u6B78\u661F\u81FA\u6309 E \u4EA4\u4ED8\uFF0C\u6700\u5F8C\u8FD4\u56DE\u6668\u98A8\u71DF\u5730\u7D50\u7B97\u3002\u74B0\u4E0A\u7BAD\u982D\u8868\u793A\u9032\u5165\u65B9\u5411\uFF0C\u76F4\u67F1\u8868\u793A\u4EA4\u4ED8\u9EDE\u3002</p><div class="control-table"><b>WASD / \u65B9\u5411\u9375</b><span>\u4F9D\u756B\u9762\u65B9\u5411\u79FB\u52D5\u3002\u7A7A\u4E2D\u653E\u958B\u6703\u4FDD\u6301\u6ED1\u7FD4\u3002</span><b>Space / \u5C55\u5E06</b><span>\u5730\u9762\u8D77\u8DF3\uFF0C\u7A7A\u4E2D\u5207\u63DB\u5C55\u5E06\u3002\u4E0D\u5FC5\u4E00\u76F4\u6309\u4F4F\u3002</span><b>Shift / \u6E1B\u901F</b><span>\u6309\u4F4F\u6536\u5E06\u4E0B\u964D\u3002\u62B5\u5CF6\u4E0A\u7A7A\u6642\u6E1B\u901F\uFF0C\u843D\u5730\u5F8C\u653E\u958B\u3002</span><b>E / \u4E92\u52D5\u9375</b><span>\u4EA4\u4ED8\u89C0\u6E2C\u8CC7\u6599\uFF0F\u6E2C\u98A8\u968E\u6BB5\uFF0C\u6216\u56DE\u71DF\u5730\u7D50\u7B97\u3002</span><b>\u53F3\u9375\u62D6\u66F3 / \u6EFE\u8F2A</b><span>\u8ABF\u6574\u93E1\u982D\uFF1BC \u56DE\u6B63\uFF0CV \u5207\u63DB\u4FEF\u77B0\u3002</span><b>\u624B\u6A5F</b><span>\u5DE6\u5074\u6416\u687F\uFF0B\u53F3\u5074\u5C55\u5E06\uFF0F\u6E1B\u901F\u53EF\u540C\u6642\u64CD\u4F5C\uFF1B\u7A7A\u767D\u5834\u666F\u62D6\u52D5\u93E1\u982D\u3002</span></div><h3>\u8B80\u98A8\u8207\u9078\u8DEF</h3><ul><li>\u9577\u5E36\uFF0B\u7BAD\u982D\uFF1D\u9806\u98A8\uFF0C\u6301\u7E8C\u88DC\u80FD\u4E26\u52A0\u901F\uFF1B\u87BA\u65CB\u74B0\uFF1D\u71B1\u6D41\uFF0C\u62AC\u5347\u9AD8\u5EA6\u3002</li><li>\u6A6B\u5411\u64FA\u52D5\u6A19\u8A18\uFF1D\u9593\u6B47\u5074\u98A8\uFF1B\u96F7\u5FC3\u8108\u52D5\u6642\u7E5E\u884C\u5916\u7DE3\uFF0C\u9727\u4E2D\u53C3\u8003\u5CF6\u540D\u548C\u5730\u5716\u3002</li><li>\u5B89\u5168\u98A8\u9053\u8F03\u5BEC\uFF0C\u9014\u7D93\u88DC\u7D66\u5CF6\uFF1B\u7A7F\u96F2\u6377\u5F91\u8DEF\u77ED\uFF0C\u9700\u8981\u66F4\u7CBE\u6E96\u7684\u65B9\u5411\u4FEE\u6B63\u3002</li><li>\u6C92\u6709\u80FD\u91CF\u6216\u6389\u843D\u6642\u56DE\u6700\u5F8C\u5B89\u5168\u5CF6\uFF0C\u52A0\u8A08 8 \u79D2\uFF0C\u788E\u7247\u4FDD\u7559\u3002\u9023\u7E8C\u4E09\u6B21\u5931\u901F\u6703\u63D0\u793A\u53EF\u958B\u555F\u8F14\u52A9\u3002</li><li>\u788E\u7247\u9760\u8FD1\u81EA\u52D5\u62FE\u53D6\uFF0C\u822A\u884C\u8A8C\u63D0\u4F9B\u5730\u6A19\u7DDA\u7D22\u3002\u5148\u5728\u5B89\u5168\u5730\u9762\u5F9E\u300C\u516D\u8D9F\u6E2C\u98A8\u9060\u5F81\u300D\u9078\u8AB2\uFF0C\u6CBF\u5B89\u5168\u63A5\u99C1\u98A8\u6A19\u5230\u91D1\u74B0\u958B\u59CB\u3002\u5B8C\u6210\u672C\u6BB5\u822A\u9580\u5F8C\u5230\u6307\u5B9A\u5CF6\u4E2D\u592E\u6309 E \u4EA4\u4ED8\uFF1B\u5DF2\u4EA4\u4ED8\u968E\u6BB5\u6C38\u4E45\u4FDD\u5B58\u3002\u9000\u51FA\u6703\u8FD4\u56DE\u6700\u5F8C\u5B89\u5168\u5CF6\uFF0C\u4E0D\u8A08\u5931\u901F\uFF0C\u53EA\u653E\u68C4\u672A\u4EA4\u4ED8\u6BB5\u3002</li></ul><h3>\u672C\u6A5F\u9032\u5EA6\u8207\u500B\u4EBA\u6210\u7E3E</h3><p>\u53EA\u6709\u9019\u500B\u700F\u89BD\u5668\u4FDD\u5B58\u9032\u5EA6\uFF0C\u6C92\u6709\u96F2\u7AEF\u540C\u6B65\u6216\u5168\u7403\u6392\u884C\u699C\u3002\u7A2E\u5B50\u53EF\u91CD\u73FE\u76F8\u540C\u98A8\u6CC1\uFF1B\u4ECA\u65E5\u98A8\u6CC1\u4EE5\u53F0\u5317\u65E5\u671F\u8A08\u7B97\u3002\u7D50\u7B97\u5206\u5225\u986F\u793A\u901F\u5EA6\u3001\u5E73\u7A69\u8207\u63A2\u7D22\u8A55\u7D1A\u3002</p>',[{label:ht?"\u56DE\u5230\u822A\u7A0B":"\u56DE\u5230\u6E96\u5099",primary:!0,action:()=>ht?tn()?gi():Zn():Oi()},{label:"\u6587\u660E\u788E\u7247",action:Qf},{label:"\u516D\u8D9F\u6E2C\u98A8\u9060\u5F81",action:Zh},{label:"\u8A2D\u5B9A\u8207\u5B58\u6A94",action:Ia}])}function Zh(){ht&&pe.status==="running"&&Fi("silent");let i=pe.state.activeCampaignCircuit!=null,e=(!ht||pe.player.grounded)&&!i&&pe.status!=="failed";Bn("courses","\u5E36\u56DE\u4E0B\u4E00\u4EFD\u98A8\u7684\u7B54\u6848",`<p class="modal-note">${i?"\u76EE\u524D\u5FC5\u4FEE\u5DE1\u6E2C\u9032\u884C\u4E2D\uFF0C\u8ACB\u5148\u5B8C\u6210\u4E09\u6BB5\u4EA4\u4ED8\uFF0C\u518D\u9078\u64C7\u9078\u4FEE\u9060\u5F81\u3002":e?"\u5728\u5B89\u5168\u5730\u9762\u9078\u64C7\u4E00\u8D9F\u9060\u5F81\uFF0C\u518D\u6CBF\u5B89\u5168\u63A5\u99C1\u98A8\u6A19\u5230\u6307\u5B9A\u5CF6\u91D1\u74B0\u958B\u59CB\u3002":"\u8ACB\u5148\u5B89\u5168\u843D\u5CF6\uFF0C\u518D\u9078\u64C7\u9060\u5F81\uFF1B\u7A7A\u4E2D\u53EF\u5148\u95B1\u8B80\u5404\u8AB2\u7A0B\u3002"}\u5B8C\u6210\u4E00\u6BB5\u5F8C\u843D\u5CF6\u6309 E \u4EA4\u4ED8\uFF1B\u5DF2\u4EA4\u4ED8\u968E\u6BB5\u4FDD\u5B58\u3002\u9000\u51FA\u6703\u8FD4\u56DE\u6700\u5F8C\u5B89\u5168\u5CF6\uFF0C\u53EA\u653E\u68C4\u672A\u4EA4\u4ED8\u6BB5\u3002</p><div class="journal-list">${ue.challenges.map(t=>`<div><b>${Zt(t.name)} \xB7 ${pe.state.courseStages[t.id]||0}/${t.stages?.length||1} \u6BB5</b><p>${Zt(t.description)}<br>\u4E0B\u4E00\u51FA\u767C\u9EDE\uFF1A${Zt(Ht(pe.courseStage(t)?.fromIslandId||t.islandId).name)}${pe.state.completedChallenges.includes(t.id)?" \xB7 \u5DF2\u53D6\u5F97\u5B8C\u6210\u5FBD\u8A18":""}</p></div>`).join("")}</div>`,[{label:pe.state.activeChallenge||pe.state.trackedHint?"\u9000\u51FA\u9060\u5F81\u4E26\u81EA\u7531\u63A2\u7D22\uFF08\u4FDD\u7559\u9032\u5EA6\uFF09":"\u81EA\u7531\u63A2\u7D22\uFF08\u4FDD\u7559\u9032\u5EA6\uFF09",primary:!0,action:()=>{ht||yi(ft.elapsed>0),(pe.state.activeChallenge||pe.state.trackedHint)&&(pe.cancelChallenge(),Ta()),pe.setExploration(),tn()&&(pe.status="paused",fr=!0),Zn(),Wt(),Jn()}},...ue.challenges.filter(t=>!pe.challenges.includes(t.id)).map(t=>({label:`\u6A19\u8A18 ${t.name}`,disabled:!e,action:()=>{ht||yi(ft.elapsed>0),pe.trackChallenge(t.id)&&(tn()&&(pe.setExploration(),pe.status="paused",fr=!0),Zn(),Jn())}})),{label:"\u8FD4\u56DE\u822A\u884C\u8A8C",action:xi}],"\u6E2C\u98A8\u9060\u5F81 / \u968E\u6BB5\u6C38\u4E45\u4FDD\u5B58")}function Ia(){Bn("settings","\u8ABF\u6574\u4F60\u7684\u822A\u7A0B",`${Kf()}<h3>\u5B89\u5168\u4FDD\u5B58</h3><p>\u5B58\u6A94\u683C\u5F0F v4\uFF1B\u843D\u5CF6\u3001\u89C0\u6E2C\u6A23\u672C\u3001\u788E\u7247\u3001\u968E\u6BB5\u4EA4\u4ED8\u3001\u7D50\u7B97\u53CA\u8A2D\u5B9A\u8B8A\u66F4\u6642\u4FDD\u5B58\u3002\u820A\u7248\u77ED\u7A0B\u6210\u7E3E\u8207\u5FBD\u8A18\u4FDD\u7559\u5728\u6B77\u53F2\u7D00\u9304\uFF0C\u65B0\u822A\u7A0B\u7368\u7ACB\u8A08\u5206\u3002\u640D\u58DE\u5B58\u6A94\u4E0D\u6703\u8B93\u904A\u6232\u5361\u4F4F\uFF0C\u5132\u5B58\u5931\u6557\u6703\u660E\u78BA\u63D0\u793A\u3002</p>${q_()}`,[{label:"\u5B8C\u6210",primary:!0,action:X_},{label:"\u91CD\u8A2D\u5168\u90E8\u9032\u5EA6",action:()=>Bn("erase","\u78BA\u5B9A\u6E05\u9664\u5168\u90E8\u672C\u6A5F\u9032\u5EA6\uFF1F","<p>\u9019\u6703\u6E05\u9664\u6587\u660E\u788E\u7247\u3001\u5CF6\u5DBC\u3001\u89C0\u6E2C\u53F0\u3001\u500B\u4EBA\u6210\u7E3E\u8207\u672C\u5C40 checkpoint\uFF0C\u7121\u6CD5\u5FA9\u539F\u3002\u97F3\u91CF\u8207\u756B\u9762\u504F\u597D\u4FDD\u7559\u3002</p>",[{label:"\u53D6\u6D88",primary:!0,action:Ia},{label:"\u6E05\u9664\u5168\u90E8\u9032\u5EA6",action:()=>{let i=Ca.clearProgress();Yh(i.warning),ft=Ca.load().save,pe=new ws({save:ft}),Ra(),zt("\u672C\u6A5F\u9032\u5EA6\u5DF2\u91CD\u8A2D\u3002")}}])}]),jf()}function q_(){let i=pe.persisted,e=Object.entries(i.legacyRecords||{}).map(([s,r])=>`${Zt(wn.find(a=>a.id===s)?.name||s)} \xB7 ${ur(r.time)}${r.assisted?" \xB7 \u5DF2\u4F7F\u7528\u8F14\u52A9":""}`),t=Object.entries(i.legacyRouteRecords||{}).map(([s,r])=>`${Zt(ue.routes.find(a=>a.id===s)?.name||s)} \xB7 ${ur(r.time)}`),n=(i.legacyChallenges||[]).map(s=>Zt(ue.challenges.find(r=>r.id===s)?.name||s));return!e.length&&!t.length&&!n.length?"":`<h3>\u820A\u7248\u77ED\u7A0B\u7D00\u9304</h3><p>\u4EE5\u4E0B\u6210\u7E3E\u5C6C\u65BC\u6539\u7248\u524D\u822A\u7A0B\uFF0C\u7368\u7ACB\u4FDD\u7559\u3002</p>${e.length?`<p>${e.join("<br>")}</p>`:""}${t.length?`<p>${t.join("<br>")}</p>`:""}${n.length?`<p>\u820A\u5FBD\u8A18\uFF1A${n.join("\u3001")}</p>`:""}`}function Qf(){let i=pe.relics;Bn("journal","\u98A8\u7559\u4E0B\u7684\u822A\u4FE1",`<p>\u5DF2\u767C\u73FE ${i.length} / ${ue.relics.length}\u3002\u9760\u8FD1\u5404\u6D6E\u5CF6\u4E0A\u7684\u91D1\u8272\u7ACB\u9AD4\u788E\u7247\u5373\u53EF\u62FE\u53D6\u3002</p><div class="journal-list">${ue.relics.map((e,t)=>`<div><b><img src="${Zt(e.icon||`./assets/icons/${e.id}.svg`)}" width="24" height="24" alt=""> ${String(t+1).padStart(2,"0")} \xB7 ${i.includes(e.id)?Zt(e.name):"\u5C1A\u672A\u767C\u73FE"}</b><p>${i.includes(e.id)?Zt(e.text):Zt(Ht(e.islandId).name)+" \xB7 "+Zt(e.hint||"\u641C\u5C0B\u5CF6\u9762\u7684\u91D1\u8272\u5149\u8292\u3002")}</p></div>`).join("")}</div>`,[{label:"\u8FD4\u56DE\u822A\u884C\u8A8C",primary:!0,action:xi}])}function Y_(i){Fi("dialogue"),Bn("dialogue",i.title,`<p class="modal-note">${Zt(i.text)}</p><p><strong>\u63A5\u7E8C\u5FC5\u4FEE\u5DE1\u6E2C\uFF1A${Zt(pe.campaignStage()?.name||"\u8FD4\u822A")}</strong><br>${Zt(pe.campaignStage()?.description||"\u6CBF\u91D1\u8272\u822A\u6A19\u56DE\u5BB6\u3002")}</p><p>\u9019\u6BB5\u6545\u4E8B\u53EF\u8DF3\u904E\uFF1B\u4E0B\u4E00\u500B\u822A\u6A19\u5DF2\u5728\u5730\u5716\u4E0A\u4EAE\u8D77\u3002</p>`,[{label:"\u7E7C\u7E8C\u822A\u7A0B / \u8DF3\u904E",primary:!0,action:Zn}],"\u2727 / \u89C0\u6E2C\u53F0\u8A18\u9304")}function ep(i=!1){_n.setEnabled(!1),Ni=0,clearTimeout(_i),i?(Fe.setPaused(!1),Fe.play("stall"),_i=setTimeout(()=>Fe.setPaused(!0),1400)):Fe.setPaused(!0),Yn.state("paused"),Bn("failure","\u5929\u5019\u7A97\u53E3\u5DF2\u95DC\u9589",`<p>\u5DF2\u98DB\u884C ${ur(pe.state.activeSeconds)}\u3002\u5F37\u98A8\u5C01\u9589\u4E86\u822A\u57DF\uFF0C\u672C\u6B21\u9060\u5F81\u7D50\u675F\u3002\u5DF2\u4EA4\u4ED8\u8CC7\u6599\u3001\u788E\u7247\u8207\u9078\u4FEE\u5FBD\u8A18\u5DF2\u4FDD\u5B58\uFF1B\u672C\u6B21\u4E0D\u5BEB\u5165\u52DD\u5229\u6210\u7E3E\u3002</p>`,[{label:"\u91CD\u65B0\u9060\u5F81",primary:!0,action:()=>yi(!1)},{label:"\u6539\u70BA\u81EA\u7531\u63A2\u7D22",action:()=>{pe.setExploration(),Wt(),Zn(),Jn()}},{label:"\u8A2D\u5B9A\u8207\u5B58\u6A94",action:Ia},{label:"\u8FD4\u56DE\u6E96\u5099\u756B\u9762",action:Ra}],"\u9060\u5F81\u672A\u5B8C\u6210 / \u5B89\u5168\u64A4\u56DE")}function tp(i=!1){let e=pe.state,t=e.rating;_n.setEnabled(!1),i||Fe.setPaused(!0),i&&(Fe.setPaused(!1),Fe.play("finish"),_i=setTimeout(()=>Fe.setPaused(!0),1800)),Yn.state("paused"),Bn("result",ue.ending.title,`<p>${Zt(ue.ending.text)}</p><div class="stats-grid"><div><strong>${t.speed}</strong><small>\u901F\u5EA6 \xB7 ${ur(e.elapsed)}</small></div><div><strong>${t.stability}</strong><small>\u5E73\u7A69 \xB7 ${e.stalls} \u6B21\u5931\u901F</small></div><div><strong>${t.exploration}</strong><small>\u63A2\u7D22 \xB7 ${e.relics.length}/${ue.relics.length}</small></div></div><p>\u9078\u4FEE\u6E2C\u98A8 ${e.challenges.length}/${ue.challenges.length} \xB7 \u672C\u5C40\u822A\u8DE1 ${Math.round(e.distance)}m \xB7 \u7A2E\u5B50 ${e.seed}<br>\u6A21\u7D44\uFF1A${wn.find(n=>n.id===e.module).name} \xB7 ${t.assisted?"\u98A8\u7DDA\u8F14\u52A9\u5DF2\u4F7F\u7528\uFF0C\u6210\u7E3E\u7368\u7ACB\u6A19\u793A":"\u672A\u4F7F\u7528\u98A8\u7DDA\u8F14\u52A9"}</p><p class="modal-note">\u4E0B\u4E00\u8D9F\u76EE\u6A19\uFF1A${Zt(t.next)}</p>`,[{label:"\u518D\u98DB\u4E00\u8D9F",primary:!0,action:()=>yi(!1)},{label:"\u7E7C\u7E8C\u63A2\u7D22",action:Zh},{label:"\u63DB\u6A21\u7D44\u8207\u98A8\u6CC1",action:Ra},{label:"\u8B80\u6587\u660E\u788E\u7247",action:Qf}],Zf())}function Vf(){Pt.camera=Pt.camera==="overhead"?"follow":"overhead",xs(),Wt(),pe.status==="running"&&Me("#world").focus(),zt(Pt.camera==="overhead"?"\u4FEF\u77B0\u6A21\u5F0F \xB7 V \u8FD4\u56DE\u8FFD\u96A8":"\u8FFD\u96A8\u6A21\u5F0F \xB7 C \u56DE\u6B63\u93E1\u982D")}function Z_(){pe.state.trackedHint||pe.state.surveyHint?.mainTransit||pe.state.activeChallenge||pe.state.activeCampaignCircuit!=null||(pe.setRouteStyle(pe.routeStyle==="safe"?"shortcut":"safe"),Wt(),Jn(),pe.status==="running"&&Me("#world").focus(),zt(ue.routes.find(i=>i.id===pe.state.objective.routeId)?.description||"\u822A\u7DDA\u5DF2\u5207\u63DB"))}function Jn(){let i=pe.state,e=i.player,t=i.objective,n=ue.routes.find(d=>d.id===t.routeId),s=i.challengeHint||i.trackedHint||i.surveyHint,r=s||t,a=Math.round(it(e.x-r.x,e.z-r.z)),o=matchMedia("(pointer: coarse)").matches,l=o?"\u5C55\u5E06\u9375":"Space",c=o?"\u6E1B\u901F\u9375":"Shift",h=o?"\u4E92\u52D5\u9375":"E";ht&&(Qe("#objective",`${s?.campaign?`\u7B2C ${i.activeCampaignCircuit+1} \u822A\u5340 / \u6E2C\u98A8 ${s.stage}/3 \xB7 `:i.challengeHint||i.trackedHint?`\u6E2C\u98A8 ${s.stage}/${s.stageTotal} \xB7 `:i.activated.length<3?`${i.activated.length+1}/3 \xB7 `:"\u8FD4\u822A \xB7 "}${s?.stageName||s?.name||t.name}  ${a}m`),Qe("#objective-sub",i.nearby?.canInteract?`\u5B89\u5168\u843D\u5730 \xB7 \u6309 ${h} ${i.activeChallenge||i.activeCampaignCircuit!=null?"\u4EA4\u4ED8\u672C\u968E\u6BB5":"\u555F\u52D5\u822A\u6A19"}`:e.grounded?`${l} \u8D77\u822A \xB7 ${i.surveyHint?"\u4F9D\u5E8F\u5B8C\u6210\u89C0\u6E2C\u74B0":"\u5730\u5716\u53EF\u5207\u63DB\u822A\u7DDA"}`:s?.landing?`\u62B5\u5CF6\u4E0A\u7A7A\u6309\u4F4F ${c} \u4E0B\u964D`:s?V_(s)||"\u7A7F\u904E\u524D\u65B9\u89C0\u6E2C\u74B0\uFF0C\u8A18\u9304\u98A8\u6CC1":`\u62B5\u5CF6\u4E0A\u7A7A\u6309\u4F4F ${c} \u4E0B\u964D`)),Qe("#region",Ht(i.checkpoint).region+" / "+Ht(i.checkpoint).name),Qe("#flight-mode",e.grounded?"\u5B89\u5168\u5730\u9762":e.braking?"\u6536\u5E06\u4E0B\u964D":e.gliding?"\u4E58\u98A8\u6ED1\u7FD4":`\u81EA\u7531\u843D\u9AD4 \xB7 ${l} \u5C55\u5E06`),Qe("#altitude",`${Math.round(e.y)} m \u9AD8\u5EA6`),Qe("#speed",`${Math.round(it(e.vx,e.vz))} m/s`),Qe("#clock",ur(i.elapsed)),Qe("#flight-tip",o?"\u5DE6\u6416\u687F\u79FB\u52D5 \xB7 \u5C55\u5E06\u5207\u63DB \xB7 \u6309\u4F4F\u6E1B\u901F\u4E0B\u964D":"Space \u8D77\u8DF3\uFF0F\u5C55\u5E06\u3000\xB7\u3000Shift \u6536\u5E06\u6E1B\u901F\u3000\xB7\u3000E \u4E92\u52D5"),Qe("#energy-value",`${Math.round(e.energy)}%`),Me("#energy-bar").style.width=`${e.energy}%`,Me(".energy-panel").classList.toggle("low",e.energy<22),Qe("#wind-label",i.hazard==="thunder"?"\u26A1 \u96F7\u96F2 \xB7 \u5411\u5916\u7E5E\u884C":i.hazard==="fog"?"\u224B \u96F2\u9727 \xB7 \u770B\u822A\u6A19":i.wind.includes("thermal")?"\u2191 \u71B1\u6D41\u62AC\u5347":i.wind.includes("tailwind")?"\u2197 \u9806\u98A8\u88DC\u80FD":i.wind.includes("crosswind")?"\u2194 \u5074\u98A8\u4FEE\u6B63":"\u98A8\u5E36\u5916 \xB7 \u6301\u7E8C\u8017\u80FD");let u=Math.max(0,yr-i.activeSeconds);Qe("#weather-clock",i.mode==="exploration"?"\u81EA\u7531\u63A2\u7D22 \xB7 \u4E0D\u9650\u6642":`\u5929\u5019 ${ur(u)}`),Me("#weather-clock").classList.toggle("weather-warning",i.mode==="expedition"&&u<=300);let p=u<=60?2:u<=300?1:0;i.status==="running"&&i.mode==="expedition"&&p>kf&&zt(p===2?"\u5929\u5019\u7A97\u53E3\u5269 1 \u5206\u9418\uFF1A\u8ACB\u76E1\u5FEB\u8FD4\u822A\u3002":"\u5929\u5019\u7A97\u53E3\u5269 5 \u5206\u9418\uFF1A\u53EF\u5728\u8A2D\u5B9A\u8F49\u70BA\u81EA\u7531\u63A2\u7D22\u3002"),kf=p,Qe("#station-count",`\u89C0\u6E2C\u53F0 ${i.activated.length} / 3`),Qe("#relic-count",`\u788E\u7247 ${i.relics.length} / ${ue.relics.length}`),Qe("#challenge-count",`\u9078\u4FEE ${i.challenges.length} / ${ue.challenges.length}`),Qe("#route-label",i.activeCampaignCircuit!=null?"\u5FC5\u4FEE\u5DE1\u6E2C\u98A8\u5ECA":i.activeChallenge?"\u6E2C\u98A8\u9060\u5F81\u822A\u9053":i.trackedHint||i.surveyHint?.mainTransit?"\u5B89\u5168\u63A5\u99C1\u98A8\u9053":i.routeStyle==="safe"?"\u5B89\u5168\u98A8\u9053":"\u7A7F\u96F2\u6377\u5F91"),Me("#route-toggle").disabled=!!i.trackedHint||!!i.surveyHint?.mainTransit||!!i.activeChallenge||i.activeCampaignCircuit!=null,Qe("#route-toggle",i.activeChallenge?"\u8DDF\u96A8\u672C\u6BB5\u822A\u9580":i.trackedHint||i.surveyHint?.mainTransit?"\u63A5\u99C1\u4F7F\u7528\u5B89\u5168\u98A8\u9053":i.routeStyle==="safe"?"\u5207\u63DB\uFF1A\u6280\u5DE7\u6377\u5F91":"\u5207\u63DB\uFF1A\u5B89\u5168\u98A8\u9053"),kt("#interact",!!i.nearby?.canInteract&&i.status==="running"),Qe("#interact",i.activeChallenge||i.activeCampaignCircuit!=null?`${o?"":"E \xB7 "}\u4EA4\u4ED8\u672C\u968E\u6BB5`:i.activated.length===3?`${o?"":"E \xB7 "}\u8FD4\u56DE\u71DF\u5730\u7D50\u7B97`:`${o?"":"E \xB7 "}\u555F\u52D5\u89C0\u6E2C\u53F0`);let f=t.routeId+(i.surveyHint?.mainTransit?":connection":"");if(zf!==f&&(ct.setRoute(i.surveyHint?.mainTransit?{waypoints:i.mainTransit,style:"safe"}:n),zf=f),kt("#course",!!s),kt("#leave-course",!!i.activeChallenge||!!i.trackedHint),kt("#guide",!fr&&!s),s){let d=s,y=i.activeChallenge?["crosswind","stability"].includes(ue.challenges.find(_=>_.id===i.activeChallenge)?.kind):i.activated.length===1;Qe("#course-kicker",d.mainTransit?"\u4E3B\u7DDA\u5B89\u5168\u63A5\u99C1 \xB7 \u89C0\u6E2C\u9032\u5EA6\u4FDD\u7559":d.campaign?"\u5FC5\u4FEE\u5DE1\u6E2C \xB7 \u6BCF\u6BB5\u843D\u5CF6\u4EA4\u4ED8":i.activeChallenge||i.trackedHint?"\u9078\u64C7\u6027\u6E2C\u98A8\u9060\u5F81":"\u4E3B\u7DDA\u89C0\u6E2C \xB7 \u4E0D\u9700\u505C\u7559\u7B49\u5F85"),Qe("#course-title",d.mainTransit?`\u5B89\u5168\u63A5\u99C1 ${d.step}/${d.total}`:d.transit?`\u5B89\u5168\u63A5\u99C1 ${d.transitStep}/${d.transitTotal}`:`${s?.campaign?`\u7B2C ${i.activeCampaignCircuit+1} \u822A\u5340 / \u6E2C\u98A8 ${s.stage}/3 \xB7 `:d.campaign||i.challengeHint||i.trackedHint?`${d.stageName} \xB7 `:"\u822A\u7DDA\u89C0\u6E2C \xB7 "}${d.entry?"\u524D\u5F80\u5165\u53E3":`${d.step}/${d.total}`}`),Qe("#course-detail",`${e.grounded&&!d.landing?`${l} \u5C55\u5E06\u8D77\u822A\uFF0C${o?"\u5DE6\u6416\u687F":"WASD"} \u5C0D\u6E96\u91D1\u74B0\u3002`:""}${d.transit?`\u6CBF\u98A8\u6A19\u524D\u9032\uFF0C\u76EE\u6A19\u9AD8\u5EA6 ${Math.round(d.y)}m\u3002\u62B5\u5CF6\u5F8C\u9032\u91D1\u74B0\u3002`:d.entry?d.instruction:d.landing?`\u843D\u5230\u5CF6\u4E2D\u592E\uFF0C\u6309 ${h} \u4EA4\u4ED8\uFF1B\u5DF2\u5B8C\u6210\u968E\u6BB5\u4FDD\u7559\u3002`:`\u76EE\u6A19\u9AD8\u5EA6 ${Math.round(d.y)}m\uFF1B${e.y<d.y-d.radius?"\u4FDD\u6301\u5C55\u5E06\uFF0C\u6CBF\u9752\u8272\u98A8\u5E36\u62AC\u5347\u3002":e.y>d.y+d.radius?`\u6309\u4F4F ${c} \u964D\u4F4E\u9AD8\u5EA6\u3002`:"\u9AD8\u5EA6\u5DF2\u5C0D\u6E96\uFF0C\u7A7F\u904E\u91D1\u74B0\u4E2D\u592E\u3002"}`}${y&&!d.entry&&!d.transit?` \u5100\u5668\u7A69\u5B9A ${Math.round(i.cargoStability)}%\u3002`:""}`);let g=it(e.vx,e.vz),m=[];if(d.landing||m.push([Math.abs(e.y-d.y)<(d.radius||15),`\u9AD8\u5EA6 ${Math.round(e.y)} / ${Math.round(d.y)}m`]),d.minSpeed&&m.push([g>=d.minSpeed,`\u901F\u5EA6 \u2265${d.minSpeed}m/s`]),d.maxSpeed&&m.push([g<=d.maxSpeed,`\u901F\u5EA6 \u2264${d.maxSpeed}m/s`]),d.minEnergy&&m.push([e.energy>=d.minEnergy,`\u80FD\u91CF \u2265${d.minEnergy}%`]),d.maxVerticalSpeed&&m.push([Math.abs(e.vy)<=d.maxVerticalSpeed,`\u5347\u964D \u2264${d.maxVerticalSpeed}m/s`]),d.heading){let _=(e.vx*d.heading.x+e.vz*d.heading.z)/Math.max(.001,g*it(d.heading.x,d.heading.z));m.push([_>=(d.heading.minDot??.5),"\u9806\u7BAD\u982D\u5165\u74B0"])}let S=m.map(([_,x])=>`<span class="${_?"met":"unmet"}">${_?"\u2713":"\u25CB"} ${x}</span>`).join("");Me("#gate-conditions").innerHTML!==S&&(Me("#gate-conditions").innerHTML=S)}if(!fr){let d,y,g,m=Ht(t.islandId);e.grounded&&i.checkpoint===t.islandId?(d="03 \xB7 \u555F\u52D5\u822A\u6A19",y=i.activated.length===3?`\u56DE\u71DF\u5730\u4E2D\u592E\u6309 ${h}`:`\u9760\u8FD1\u89C0\u6E2C\u53F0\u6309 ${h}`,g="\u5B89\u5168\u843D\u5730\u5DF2\u4FDD\u5B58\u3002\u8D70\u5411\u5CF6\u4E2D\u592E\u7684\u91D1\u8272\u822A\u6A19\u5B8C\u6210\u9019\u6BB5\u822A\u7A0B\u3002"):!e.grounded&&!e.gliding?(d="\u98DB\u884C\u63D0\u793A \xB7 \u6536\u5E06\u4E2D",y=`\u6309 ${l} \u91CD\u65B0\u5C55\u5E06`,g=`\u76EE\u524D\u5728\u81EA\u7531\u843D\u9AD4\u3002${l} \u662F\u5207\u63DB\uFF0C\u4E0D\u9700\u8981\u4E00\u76F4\u6309\u4F4F\uFF1B\u5C55\u5E06\u5F8C\u98A8\u5E36\u624D\u6703\u62AC\u5347\u4F60\u3002`):!e.grounded&&a<75&&e.y<m.y+3?(d="\u98DB\u884C\u63D0\u793A \xB7 \u9AD8\u5EA6\u4E0D\u8DB3",y="\u5148\u62AC\u5347\uFF0C\u518D\u964D\u843D",g=`\u4FDD\u6301\u5C55\u5E06\uFF0C\u6CBF\u5CF6\u908A\u87BA\u65CB\u71B1\u6D41\u4E0A\u5347\u3002\u5148\u653E\u958B ${c}\uFF1B\u9AD8\u904E\u5CF6\u9762\u5F8C\u518D\u79FB\u5411\u4E2D\u592E\u3002`):!e.grounded&&a<m.radius-4&&e.y>=m.y+3?(d="02 \xB7 \u5B89\u5168\u843D\u5CF6",y=`\u73FE\u5728\u6309\u4F4F ${c} \u4E0B\u964D`,g=`\u4F60\u5DF2\u5728\u5CF6\u9762\u4E0A\u65B9\u3002\u6301\u7E8C\u4FEE\u6B63\u65B9\u5411\uFF0C\u843D\u5730\u5F8C\u653E\u958B ${c}\uFF0C\u8D70\u5230\u89C0\u6E2C\u53F0\u6309 ${h}\u3002`):i.activated.length?(d="03 \xB7 \u63A5\u7E8C\u822A\u7A0B",y=t.name,g=n.description):e.grounded&&i.checkpoint==="island-camp"?(d="01 \xB7 \u8B93\u98A8\u63A5\u4F4F\u4F60",y=`\u6309 ${l} \u8D77\u8DF3\u5C55\u5E06`,g=`${o?"\u5DE6\u6416\u687F":"WASD"} \u671D\u524D\u65B9\u91D1\u8272\u822A\u6A19\u79FB\u52D5\uFF0C\u6CBF\u822A\u7DDA\u5716\u7684\u5B89\u5168\u98A8\u9053\u524D\u9032\u3002`):a<75?(d="02 \xB7 \u5C0D\u6E96\u5CF6\u9762",y="\u98DB\u5230\u5CF6\u9762\u4E0A\u65B9\u518D\u6E1B\u901F",g="\u4FDD\u6301\u5C55\u5E06\uFF0C\u671D\u91D1\u8272\u76F4\u67F1\u4FEE\u6B63\u65B9\u5411\u3002\u5230\u9054\u5CF6\u9762\u4E0A\u65B9\u5F8C\uFF0C\u63D0\u793A\u6703\u544A\u8A34\u4F60\u4F55\u6642\u964D\u843D\u3002"):(d="02 \xB7 \u6CBF\u98A8\u5E36\u524D\u9032",y="\u9806\u98A8\u88DC\u80FD\uFF0C\u71B1\u6D41\u62AC\u5347",g=`\u6CBF\u5730\u5716\u865B\u7DDA\u5230\u9054\u8606\u5149\u5EAD\u3002\u7A7A\u4E2D\u4E0D\u7528\u6301\u7E8C\u6309 ${l}\uFF1B\u653E\u958B\u65B9\u5411\u4ECD\u6703\u6ED1\u7FD4\u3002`),Qe("#guide-step",d),Qe("#guide-text",y),Qe("#guide-detail",g)}J_()}function J_(){let i=Me("#map"),e=i.getContext("2d"),t=pe.state,n=.48/(ue.mapScale||1),s=p=>i.width*.3+p*n,r=p=>i.height*.6+p*n;e.clearRect(0,0,i.width,i.height),e.strokeStyle="#bfd3bd14",e.lineWidth=1;for(let p=20;p<i.width;p+=40)e.beginPath(),e.moveTo(p,0),e.lineTo(p,i.height),e.stroke();for(let p=0;p<i.height;p+=40)e.beginPath(),e.moveTo(0,p),e.lineTo(i.width,p),e.stroke();let a=ue.challenges.find(p=>p.id===t.activeChallenge),o=pe.campaignStage()||pe.courseStage(a),l=ue.challenges.find(p=>p.id===t.trackedHint?.id),c=o||(t.surveyHint?.mainTransit?{waypoints:[t.player,...t.mainTransit.slice(t.mainTransitIndex)]}:l?{waypoints:[t.player,...t.transitWaypoints.slice(t.transitIndex),pe.courseEntry(l)]}:ue.routes.find(p=>p.id===t.objective.routeId));c&&(e.strokeStyle=l||t.routeStyle==="safe"?"#bcdfd0":"#e6c17e",e.lineWidth=2,e.setLineDash([5,5]),e.beginPath(),c.waypoints.forEach((p,f)=>f?e.lineTo(s(p.x),r(p.z)):e.moveTo(s(p.x),r(p.z))),e.stroke(),e.setLineDash([])),ue.islands.forEach((p,f)=>{e.beginPath(),e.arc(s(p.x),r(p.z),Math.max(5,p.radius*n*.7),0,Math.PI*2),e.fillStyle=t.activated.includes(p.id)?"#cdb97855":"#6e97836b",e.fill(),e.strokeStyle=p.id===t.objective.islandId?"#ffdc8e":"#b3cdb061",e.lineWidth=p.id===t.objective.islandId?2:1,e.stroke(),e.fillStyle="#f0e5ba",e.font="17px Segoe UI",e.textAlign="center",e.fillText(f+1,s(p.x),r(p.z)+6)}),ue.relics.forEach(p=>{t.relics.includes(p.id)||(e.fillStyle="#eac277",e.fillRect(s(p.x)-2,r(p.z)-2,4,4))});let h=t.challengeHint||t.trackedHint||t.surveyHint;h&&(e.beginPath(),e.arc(s(h.x),r(h.z),6,0,Math.PI*2),e.strokeStyle="#ffe6a7",e.lineWidth=2,e.stroke());let u=t.player;e.save(),e.translate(s(u.x),r(u.z)),e.rotate(u.heading),e.beginPath(),e.moveTo(0,-9),e.lineTo(6,7),e.lineTo(0,3),e.lineTo(-6,7),e.closePath(),e.fillStyle="#fff9dc",e.strokeStyle="#24565a",e.lineWidth=2,e.fill(),e.stroke(),e.restore(),e.fillStyle="#adccbf",e.font="14px Segoe UI",e.fillText("N \u2191",i.width-24,22)}function Ta(){for(let i of pe.drainEvents()){i.type==="save"&&Wt();let e=i.emittedAt||performance.now();i.type==="glide"&&((!i.requestId||i.requestId!==Xf)&&Fe.play("glide"),vt.applied=i.requestId,vt.consumed=performance.now(),tc===i.requestId&&(tc=0,Qe("#sail-feedback",i.open?"\u5DF2\u5C55\u5E06":"\u5DF2\u6536\u5E06"),Me("#touch-glide").removeAttribute("data-queued"))),i.type==="wind"&&Fe.play("tailwind"),i.type==="land"&&(Fe.play("land"),zt(`${i.precise?"\u7CBE\u6E96\u843D\u5730":"\u5DF2\u5B89\u5168\u843D\u5CF6"} \xB7 ${i.name} \xB7 checkpoint \u5DF2\u4FDD\u5B58`)),i.type==="stall"&&(Fe.play("stall"),zt(i.message)),["hint","edge","assist-offer","low-energy"].includes(i.type)&&(zt(i.message),i.type==="low-energy"&&Fe.play("energy")),i.type==="relic"&&(Fe.play("unlock"),zt(`\u6587\u660E\u788E\u7247 \xB7 ${i.name}\uFF5C${i.text}`)),i.type==="challenge"&&(Fe.play("unlock"),zt(`\u6E2C\u98A8\u6311\u6230\u5B8C\u6210 \xB7 ${i.name} \xB7 \u5168\u90E8\u968E\u6BB5\u5DF2\u4FDD\u5B58`)),i.type==="challenge-start"&&(Fe.play("ui"),zt(i.message)),i.type==="challenge-gate"&&(Fe.play("relic"),i.message&&zt(i.message)),i.type==="survey"&&(Fe.play("relic"),zt(i.message)),i.type==="challenge-stage"&&(Fe.play("unlock"),zt(i.message)),i.type==="challenge-reset"&&i.reason==="cancel"&&zt(i.message),i.type==="station"&&(Fe.play("unlock"),Y_(i.dialogue)),i.type==="campaign-stage"&&(Fe.play("unlock"),zt(i.message)),i.type==="failed"&&(Wt(),Jn(),ep(!0)),i.type==="complete"&&(Wt(),tp(!0)),["glide","survey","land","stall","station","complete","failed"].includes(i.type)&&(vt.eventCount++,vt.maxEventAcknowledgementMs=Math.max(vt.maxEventAcknowledgementMs,performance.now()-e))}}function qh(i){let e=i-Aa,t=Math.min(e/1e3,.15);if(Aa=i,hr){ec=requestAnimationFrame(qh);return}document.hidden||ct.sampleFrame(e);let n=performance.now();if(pe.status==="running"){Ni+=t;let l=0;for(;Ni>=1/60&&l++<9;){let c=_n.read(ct.yaw),h=performance.now();pe.step(c,1/60),c.glide&&(vt.maxConsumptionProcessingMs=Math.max(vt.maxConsumptionProcessingMs,performance.now()-h)),Ni-=1/60}Ta()}let s=performance.now()-n;ct.update(pe.state,Math.min(t,.05),i/1e3,pe.state.objective),vt.applied!==vt.submittedId&&(vt.submittedId=vt.applied,vt.submitted=performance.now());let r=performance.now();jl.speed=it(pe.player.vx,pe.player.vz),jl.energy=pe.player.energy,jl.wind=pe.state.wind.length>0,Fe.update(jl);let a=performance.now()-r,o=performance.now();Wh+=t,Wh>.1&&(Jn(),Wh=0),ht&&pe.status==="running"&&(Ui.simulationMs=s,Ui.sceneUpdateMs=ct.phase.sceneUpdateMs,Ui.renderCpuMs=ct.phase.renderCpuMs,Ui.hudMapMs=performance.now()-o,Ui.rafIntervalMs=e,Ui.applicationUpdateMs=s+ct.phase.sceneUpdateMs+a+Ui.hudMapMs,Wf.push(Ui),$f++,qf+=t,Ql[Xh]=e,Xh=(Xh+1)%Ql.length,wa=Math.min(wa+1,Ql.length),t>.0333&&Yf++),ec=requestAnimationFrame(qh)}async function K_(){ft=Ca.load(),Yh(ft.warning),ft=ft.save,Pt={...ft.settings},!ft.elapsed&&matchMedia("(prefers-reduced-motion: reduce)").matches&&(Pt.reducedMotion=!0),dr=ft.module,pe=new ws({save:ft}),ct=new ql(Me("#world")),Fe=new Zl,xs(),_n=new Yl(Me("#world"),{glideQueued:i=>{if(pe.status!=="running")return;vt.receipt=performance.now(),vt.accepted=i,tc=i;let e=Fe.stats.events;Fe.play("glide"),Fe.stats.events>e&&(Xf=i),Qe("#sail-feedback",pe.player.gliding?"\u6536\u5E06\u6307\u4EE4\u5DF2\u63A5\u6536":"\u5C55\u5E06\u6307\u4EE4\u5DF2\u63A5\u6536"),Me("#touch-glide").setAttribute("data-queued","true"),vt.acknowledged=performance.now(),vt.processed=performance.now(),vt.maxAcknowledgementMs=Math.max(vt.maxAcknowledgementMs,vt.acknowledged-vt.receipt),vt.maxProcessingMs=Math.max(vt.maxProcessingMs,vt.processed-vt.receipt)},glideCleared:()=>{tc=0,Qe("#sail-feedback",""),Me("#touch-glide").removeAttribute("data-queued")},pause:Hf,help:()=>{Ft||xi()},view:()=>{Ft||Vf()},recenter:()=>{Ft||ct.recenter()},interact:()=>{pe.interact(),Ta()},blur:()=>{clearTimeout(_i),Fe.setPaused(!0),pe.status==="running"&&Fi("blur")},rotate:(i,e)=>ct.rotate(i,e),zoom:i=>ct.zoom(i)}),Yn=new Jl({"host:start":()=>{ht?pe.status==="paused"&&Zn():yi(ft.elapsed>0||ft.completed)},"host:pause":()=>Fi(),"host:resume":Zn,"host:restart":()=>yi(!1)}),Me("#modules").innerHTML=wn.map((i,e)=>`<button class="module" data-module="${i.id}" aria-pressed="${i.id===dr}"><span class="symbol">${["\u2301","\u25C8","\u2197"][e]}</span><strong>${i.name}</strong><small>${["\u8F49\u5411\u9748\u6D3B \xB7 \u5DE1\u822A\u8F03\u6162","\u6301\u4E45\u84C4\u80FD \xB7 \u8F49\u5411\u8F03\u7DE9","\u9806\u98A8\u52A0\u901F \xB7 \u96E2\u98A8\u8017\u80FD"][e]}</small></button>`).join(""),document.querySelectorAll(".module").forEach(i=>i.onclick=()=>W_(i.dataset.module)),Me("#mode").value=ft.mode,Me("#seed").value=ft.elapsed?ft.seed:2718,Me("#start").onclick=()=>yi(!1),Me("#continue").onclick=()=>yi(!0),kt("#continue",ft.elapsed>0),Qe("#continue",ft.failed?"\u67E5\u770B\u64A4\u56DE\u7D00\u9304":ft.completed?"\u67E5\u770B\u7D50\u7B97\uFF0F\u7E7C\u7E8C\u63A2\u7D22":"\u7E7C\u7E8C\u4E0A\u6B21\u822A\u7A0B"),Me("#daily-seed").onclick=()=>{Me("#seed").value=Number(new Intl.DateTimeFormat("en-CA",{timeZone:"Asia/Taipei",year:"numeric",month:"2-digit",day:"2-digit"}).format(new Date).replace(/-/g,""))%999999,zt("\u4ECA\u65E5\u98A8\u6CC1\u50C5\u4F9B\u672C\u6A5F\u91CD\u73FE\uFF0C\u6C92\u6709\u5168\u7403\u6392\u540D\u3002")},Me("#new-seed").onclick=()=>{Me("#seed").value=crypto.getRandomValues(new Uint32Array(1))[0]%999999+1},Me("#pause").onclick=Hf,Me("#help").onclick=xi,Me("#camera").onclick=Vf,Me("#route-toggle").onclick=Z_,Me("#leave-course").onclick=()=>{pe.cancelChallenge(),Ta(),Jn(),pe.status==="running"&&Me("#world").focus()},Me("#interact").onclick=()=>{pe.interact(),Ta()},Me("#hide-guide").onclick=()=>{fr=!0,kt("#guide",!1),pe.status==="running"&&Me("#world").focus()},Me("#close-modal").onclick=Jf,Qe("#build-label",`Aetherwake ${Gh.version} \xB7 \u539F\u5275\u98A8\u5883\u63A2\u7D22`),Me("#world").addEventListener("webglcontextlost",i=>{i.preventDefault(),hr=!0,ht&&!tn()&&Fi("silent"),_n.setEnabled(!1),Fe.setPaused(!0),Bn("context","\u6B63\u5728\u91CD\u65B0\u63A5\u4F4F\u9019\u9663\u98A8","<p>\u7E6A\u5716\u88DD\u7F6E\u66AB\u6642\u4E2D\u65B7\uFF0C\u822A\u7A0B\u5DF2\u51CD\u7D50\u3002\u6062\u5FA9\u5F8C\u53EF\u5F9E\u76EE\u524D\u4F4D\u7F6E\u7E7C\u7E8C\uFF1B\u82E5\u9700\u91CD\u65B0\u8F09\u5165\uFF0C\u6703\u8FD4\u56DE\u6700\u5F8C\u5B89\u5168\u5CF6\uFF0C\u4FDD\u7559\u5DF2\u53D6\u5F97\u7684\u89C0\u6E2C\u8207\u788E\u7247\u3002</p>",[{label:"\u5F9E\u5B89\u5168\u5CF6\u91CD\u65B0\u8F09\u5165",primary:!0,action:()=>location.reload()}],"\u7E6A\u5716\u88DD\u7F6E\u6062\u5FA9\u4E2D")}),Me("#world").addEventListener("webglcontextrestored",()=>{hr=!1,Aa=performance.now(),Ni=0,xs(),ht&&!tn()?pr("\u98A8\u5DF2\u56DE\u4F86\uFF0C\u6E96\u5099\u7E7C\u7E8C\u822A\u7A0B"):ht?gi():(Oi(),zt("\u7E6A\u5716\u88DD\u7F6E\u5DF2\u6062\u5FA9\uFF0C\u53EF\u6E96\u5099\u555F\u7A0B\u3002"))}),Me("#modal").addEventListener("keydown",i=>{if(i.key==="Tab"){let e=[...Me("#modal").querySelectorAll("button,input,select")].filter(s=>!s.disabled),t=e[0],n=e.at(-1);i.shiftKey&&document.activeElement===t?(i.preventDefault(),n.focus()):!i.shiftKey&&document.activeElement===n&&(i.preventDefault(),t.focus())}}),Object.defineProperty(window,"__aetherwake",{value:Object.freeze({build:Object.freeze({...Gh}),snapshot:()=>pe.snapshot(),metrics:()=>{let i=Array.from(Ql.subarray(0,wa)).sort((n,s)=>n-s),e=ct.renderer.getContext(),t=e.getExtension("WEBGL_debug_renderer_info");return{...ct.metrics,feedback:{...vt},phases:Wf.summary(),camera:ct.inspectCamera(pe.player),frameCount:$f,averageMs:wa?i.reduce((n,s)=>n+s,0)/wa:null,contextLost:hr,quality:ct.quality,inputListeners:_n.listeners.length,resolutionScale:ct.renderer.getPixelRatio(),elapsedSample:qf,p50:i[Math.floor(i.length*.5)]||null,p95:i[Math.floor(i.length*.95)]||null,longFrames:Yf,renderer:ct.renderer.getContext().getParameter(ct.renderer.getContext().RENDERER),unmaskedRenderer:t?e.getParameter(t.UNMASKED_RENDERER_WEBGL):null,audio:{contextState:Fe.context?.state||"uninitialized",activeVoices:Fe.active.size,events:Fe.stats.events,musicBeats:Fe.noteIndex,peakVoices:Fe.stats.peakVoices,musicVolume:Fe.musicVolume,sfxVolume:Fe.sfxVolume,loadedSamples:Fe.sampleBuffers.size,sampleFailed:Fe.sampleFailed}}}})}),window.addEventListener("pagehide",()=>{ht&&Wt(),_n.clear(),Fe.setPaused(!0)}),window.addEventListener("beforeunload",()=>{cancelAnimationFrame(ec),_n.dispose(),Fe.dispose(),ct.dispose(),Yn.dispose()}),Jn(),Yn.setReady(),ec=requestAnimationFrame(qh)}K_().catch(i=>{console.error(i),kt("#fatal"),Qe("#fatal-message",`\u7121\u6CD5\u5EFA\u7ACB 3D \u5834\u666F\u3002\u8ACB\u78BA\u8A8D\u700F\u89BD\u5668\u5DF2\u555F\u7528 WebGL\uFF0C\u4E26\u91CD\u65B0\u8F09\u5165\u3002${i.message}`),Yn?.send("game:error",{message:String(i.message).slice(0,300)})});
/*! Bundled license information:

three/build/three.core.js:
three/build/three.module.js:
  (**
   * @license
   * Copyright 2010-2025 Three.js Authors
   * SPDX-License-Identifier: MIT
   *)
*/
