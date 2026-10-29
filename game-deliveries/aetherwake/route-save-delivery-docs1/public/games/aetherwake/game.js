var Hf=(i,e,t)=>({x:i,y:e,z:t}),Ii=(i,e)=>i.find(t=>t.id===`island-${e}`),ar=(i,e=26)=>Hf(i.x,i.y+e,i.z),ds=(i,e)=>{let t=Math.hypot(e.x-i.x,e.z-i.z)||1;return{x:(e.x-i.x)/t,z:(e.z-i.z)/t}},Wl=i=>Math.round(i.slice(1).reduce((e,t,n)=>e+Math.hypot(t.x-i[n].x,t.y-i[n].y,t.z-i[n].z),0)),Vf=[{mission:1,from:"camp",to:"reed",type:"survey",title:"\u6821\u6E96\u8606\u5149\u98A8\u6A19",roles:["\u8D77\u98A8\u57FA\u6E96","\u4E0A\u5347\u5256\u9762","\u9AD8\u5C64\u98A8\u901F","\u71B1\u6D41\u51FA\u6D41","\u5074\u98A8\u88DC\u511F","\u4F4E\u5C64\u56DE\u6D41","\u5B9A\u5411\u5FA9\u6838","\u6821\u6E96\u4EA4\u4ED8"],safe:[[-60,32,-150],[-280,55,-300],[-520,82,-360],[-690,72,-510],[-680,44,-700],[-530,40,-875],[-350,38,-885],[-308,34,-712]],shortcut:[[60,30,-125],[20,60,-260],[-70,86,-375],[-150,58,-490],[-265,42,-580],[-390,52,-650],[-410,34,-760],[-308,34,-712]],decisions:["\u5728\u4F4E\u5C64\u5148\u5C0D\u9F4A\u98A8\u5411\u518D\u8D77\u901F","\u85C9\u71B1\u6D41\u53D6\u5F97\u9AD8\u8655\u6A23\u672C\u800C\u975E\u76F4\u63A5\u8D8A\u5CF6","\u7A7F\u904E\u5074\u98A8\u5F8C\u4FEE\u6B63\u822A\u5411\u518D\u904E\u9580","\u964D\u56DE\u4EA4\u4ED8\u9AD8\u5EA6\uFF0C\u4FDD\u7559\u843D\u5730\u80FD\u91CF"],descriptions:{safe:"\u6CBF\u5916\u5074\u5BEC\u98A8\u5ECA\u53D6\u5F97\u516B\u4EFD\u98A8\u5C64\u6A23\u672C\uFF1B\u88DC\u80FD\u71B1\u6D41\u591A\u3001\u6025\u964D\u5C11\uFF0C\u8DEF\u7A0B\u8F03\u9577\u3002",shortcut:"\u6CBF\u4E2D\u592E\u7A84\u98A8\u5ECA\u53D6\u5F97\u76F8\u540C\u516B\u4EFD\u6A23\u672C\uFF1B\u8F03\u77ED\u4F46\u9AD8\u4F4E\u8F49\u63DB\u3001\u822A\u5411\u53CA\u80FD\u91CF\u8981\u6C42\u8F03\u9AD8\u3002"}},{mission:2,from:"reed",to:"storm",type:"carry",title:"\u904B\u9001\u5B9A\u5411\u661F\u5100",roles:["\u661F\u5100\u63A5\u8F09","\u7B2C\u4E00\u6BB5\u5B9A\u5411","\u65B7\u6A4B\u8F49\u904B","\u9AD8\u5C64\u907F\u96F7","\u5E73\u7A69\u51FA\u6D41","\u7B2C\u4E8C\u6BB5\u5B9A\u5411","\u964D\u843D\u524D\u5FA9\u6838","\u661F\u5100\u4EA4\u4ED8"],safe:[[-170,40,-870],[70,50,-1080],[300,58,-1260],[510,72,-1410],[755,64,-1290],[1e3,58,-1100],[1120,48,-930],[1008,54,-792]],shortcut:[[-155,42,-700],[10,70,-660],[190,90,-660],[390,94,-610],[580,72,-680],[775,62,-730],[935,54,-875],[1008,54,-792]],decisions:["\u8D77\u822A\u5F8C\u5148\u7A69\u4F4F\u9AD8\u5EA6\u518D\u904B\u9001","\u9078\u65B7\u6A4B\u5916\u7DE3\u6216\u96F7\u5FC3\u4E0A\u5C64","\u9810\u7559\u8F49\u5F4E\u8DDD\u96E2\uFF0C\u907F\u514D\u6025\u964D\u5F8C\u624D\u627E\u4EA4\u4ED8\u9580","\u5E36\u8457\u9918\u80FD\u8207\u6B63\u78BA\u822A\u5411\u62B5\u9054\u5929\u6587\u53F0"],descriptions:{safe:"\u7E5E\u65B7\u6A4B\u5916\u7DE3\u904B\u9001\u516B\u6BB5\u5B9A\u5411\u7D00\u9304\uFF1B\u8F49\u5F4E\u8F03\u5BEC\u3001\u7A69\u5B9A\u5EA6\u9580\u6ABB\u8F03\u5BEC\u9B06\u3002",shortcut:"\u5F9E\u96F7\u810A\u9AD8\u5C64\u904B\u9001\u540C\u4E00\u661F\u5100\uFF1B\u8DEF\u77ED\uFF0C\u4F46\u5FC5\u9808\u63D0\u65E9\u722C\u5347\u4E26\u5E73\u7A69\u7A7F\u904E\u7A84\u98A8\u9580\u3002"}},{mission:3,from:"storm",to:"dawn",type:"observe",title:"\u91CD\u5EFA\u6B78\u661F\u65B9\u4F4D",roles:["\u5317\u65B9\u57FA\u7DDA","\u7B2C\u4E00\u689D\u8996\u7DDA","\u9727\u908A\u8FA8\u5411","\u66F8\u5EAB\u65B9\u4F4D","\u7B2C\u4E8C\u689D\u8996\u7DDA","\u4EA4\u6703\u9EDE\u9A57\u8B49","\u6B78\u661F\u822A\u5411","\u661F\u5716\u4EA4\u4ED8"],safe:[[1130,60,-600],[1220,72,-350],[1080,52,-90],[930,44,90],[850,58,260],[690,46,470],[440,36,650],[272,30,728]],shortcut:[[860,60,-650],[720,82,-440],[660,66,-210],[560,50,25],[455,68,220],[325,48,425],[180,34,600],[272,30,728]],decisions:["\u5F9E\u5169\u500B\u4E0D\u540C\u65B9\u4F4D\u8FA8\u8A8D\u540C\u4E00\u7247\u822A\u57DF","\u5728\u4F4E\u5C64\u7BC0\u80FD\u8207\u9AD8\u5C64\u8996\u91CE\u9593\u53D6\u6368","\u5148\u5C0D\u9F4A\u53EF\u898B\u7684\u5BE6\u9AD4\u822A\u6A19\uFF0C\u518D\u9032\u5165\u9727\u5E36","\u4F9D\u4EA4\u6703\u65B9\u4F4D\u5B8C\u6210\u5357\u5411\u8FD4\u7A0B"],descriptions:{safe:"\u6CBF\u66F8\u5EAB\u5916\u7DE3\u53D6\u5F97\u516B\u500B\u65B9\u4F4D\u7BC0\u9EDE\uFF1B\u822A\u6A19\u6E05\u695A\u3001\u88DC\u80FD\u8F03\u5145\u8DB3\uFF0C\u4F46\u8DDD\u96E2\u8F03\u9577\u3002",shortcut:"\u5F9E\u4E2D\u592E\u9727\u5ECA\u53D6\u5F97\u540C\u7FA9\u65B9\u4F4D\u7BC0\u9EDE\uFF1B\u8F03\u77ED\u4F46\u5FC5\u9808\u66F4\u6E96\u78BA\u5C0D\u9F4A\u822A\u5411\u4E26\u63A7\u5236\u9AD8\u5EA6\u3002"}}];function Gf(i,e,t){let n=t==="safe";return i===1?{...[0,2,4].includes(e)?{minSpeed:n?10:13}:{},...[2,5].includes(e)?{minEnergy:n?30:45}:{},...e===6?{maxVerticalSpeed:n?4:3}:{}}:i===2?{maxVerticalSpeed:n?3.5:2.7,...[3,6,7].includes(e)?{minEnergy:n?25:40}:{}}:{...[1,3,5,6].includes(e)?{maxVerticalSpeed:n?3.5:2.8}:{},...e===4?{minEnergy:n?25:40}:{}}}function Oh(i){return[i.minSpeed?`\u901F\u5EA6\u81F3\u5C11 ${i.minSpeed} m/s`:"",i.minEnergy?`\u5E06\u80FD\u91CF\u81F3\u5C11 ${i.minEnergy}%`:"",i.maxVerticalSpeed?`\u5782\u76F4\u901F\u5EA6\u4E0D\u8D85\u904E ${i.maxVerticalSpeed} m/s`:"",i.heading?"\u6CBF\u98A8\u5ECA\u65B9\u5411\u5C0D\u9F4A\u5165\u9580":"\u7A7F\u904E\u7ACB\u9AD4\u6A19\u8A18"].filter(Boolean).join("\uFF1B")}function Bh(i){let e=[];for(let s of Vf)for(let r of["safe","shortcut"]){let a=Ii(i,s.from),o=Ii(i,s.to),l=ar(a),c=[];s[r].forEach(([h,f,d],m)=>{let _={id:`sample-main-${s.mission}-${m+1}`,name:s.roles[m],type:s.type,x:h,y:f,z:d,radius:15,...Gf(s.mission,m,r)};(s.mission===1&&[4,6].includes(m)||s.mission===2&&[1,3,5,6].includes(m)||s.mission===3&&m!==0&&m!==7)&&(_.heading={...ds(c[m-1]||l,_),minDot:r==="safe"?.65:.82}),_.instruction=`${_.name}\uFF1A${Oh(_)}\u3002${m===7?"\u53D6\u5F97\u5F8C\u5728\u5CF6\u4E2D\u592E\u843D\u5730\u6309 E \u4EA4\u4ED8\u3002":"\u53D6\u6A23\u4E0D\u9700\u7B49\u5F85\uFF0C\u5B8C\u6210\u5F8C\u7ACB\u5373\u98DB\u5F80\u4E0B\u4E00\u7BC0\u9EDE\u3002"}`,c.push(_)});let u=[l,...c,ar(o)];e.push({id:`route-${s.mission}-${r}`,mission:s.mission,style:r,from:a.id,to:o.id,name:`\u7B2C ${s.mission} \u822A\u7DDA \xB7 ${r==="safe"?"\u5B89\u5168\u98A8\u9053":"\u7A7F\u96F2\u6377\u5F91"}`,title:s.title,theme:s.type,description:s.descriptions[r],samples:c,waypoints:u,distanceMeters:Wl(u),decisions:s.decisions,designBudgetMinutes:[2.3,3.5]})}let t=Ii(i,"dawn"),n=Ii(i,"camp");for(let s of["safe","shortcut"]){let r=[ar(t),ar(n)];e.push({id:`route-4-${s}`,mission:4,style:s,from:t.id,to:n.id,name:`\u8FD4\u822A \xB7 ${s==="safe"?"\u5B89\u5168\u98A8\u9053":"\u7A7F\u96F2\u6377\u5F91"}`,title:"\u5E36\u661F\u5716\u56DE\u5BB6",theme:"return",samples:[],waypoints:r,description:s==="safe"?"\u6CBF\u5BEC\u5EE3\u3001\u88DC\u80FD\u5145\u8DB3\u7684\u6B78\u822A\u98A8\u5ECA\uFF0C\u8FD4\u56DE\u71DF\u5730\u4E2D\u592E\u843D\u5730\u6309 E \u7D50\u7B97\u3002":"\u6CBF\u8F03\u5FEB\u7684\u7A84\u98A8\u5ECA\u8FD4\u822A\uFF1B\u9810\u7559\u964D\u843D\u80FD\u91CF\uFF0C\u56DE\u71DF\u5730\u4E2D\u592E\u6309 E \u7D50\u7B97\u3002",distanceMeters:Wl(r),decisions:["\u9078\u5BEC\u98A8\u5ECA\u7A69\u5B9A\u8FD4\u822A\uFF0C\u6216\u7A84\u98A8\u5ECA\u5FEB\u901F\u8FD4\u822A","\u63D0\u65E9\u4E0B\u964D\uFF0C\u907F\u514D\u8D8A\u904E\u71DF\u5730\u5F8C\u56DE\u982D"],designBudgetMinutes:[.8,1.3]})}return e}function zh(i,e,t,n={}){let s=Math.min(e.y,t.y)-26;return{id:i,type:"tailwind",name:n.name||"\u5206\u5C64\u822A\u9053",start:{...e},end:{...t},x:(e.x+t.x)/2,y:s,z:(e.z+t.z)/2,radius:26,height:Math.abs(t.y-e.y)+58,ceiling:t.y+1,strength:2.4,charge:4.8,liftCap:6,direction:{...ds(e,t),y:0},...n}}function kh(i,e,t={}){return{id:i,type:"thermal",name:"\u822A\u6BB5\u88DC\u7D66\u71B1\u6D41",x:e.x,y:e.y-35,z:e.z,radius:24,height:70,ceiling:e.y+2,strength:7.5,charge:8,direction:{x:0,y:1,z:0},...t}}function Hh(i,e,t,n={}){let s=ds(e,t);return{id:i,type:"crosswind",name:"\u53EF\u8B80\u7684\u8108\u52D5\u5074\u6D41",x:(e.x+t.x)/2,y:Math.min(e.y,t.y)-24,z:(e.z+t.z)/2,radius:64,height:Math.abs(t.y-e.y)+64,strength:4.5,period:8,direction:{x:-s.z,y:0,z:s.x},...n}}function Vh(i){let e=[];for(let t of i)for(let n=1;n<t.waypoints.length;n++){let s=t.waypoints[n-1],r=t.waypoints[n];if(Math.hypot(r.x-s.x,r.z-s.z)<.1)continue;let a=t.style==="safe",o={routeId:t.id,mission:t.mission,sample:n-1,style:t.style};e.push(zh(`wind-${t.id}-${n}`,s,r,{...o,radius:a?26:17,strength:a?2.8:4,charge:a?5.2:3.9,liftCap:a?6:7})),(r.y-s.y>=10||a&&n%3===1)&&e.push(kh(`wind-${t.id}-thermal-${n}`,r,{...o,radius:a?26:21,charge:a?8:6.5})),(t.mission===1&&n===5||t.mission===2&&[4,7].includes(n))&&e.push(Hh(`wind-${t.id}-side-${n}`,s,r,{...o,strength:a?3.3:5.2,radius:a?50:60}))}return e}var Wf={lee:[0,.32,.74,1,.95,.62,.28,.08,0],rim:[0,-.36,-.78,-1,-.82,-.5,-.18,-.06,0],shear:[0,.58,.95,.48,-.32,-.82,-.6,-.2,0],ridge:[0,.5,.95,.9,.5,0,-.32,-.18,0],descent:[0,-.3,-.72,-.9,-.55,0,.24,.1,0]},Xl=[.06,.16,.29,.43,.57,.71,.84,.94,1],Xf={sweep:[28,36,42,46,43,36,30,26,24],high:[32,50,72,85,76,60,42,30,24],rising:[25,43,68,86,90,76,54,34,24],shelves:[29,47,48,73,74,51,50,32,24],descending:[38,65,82,72,55,39,30,25,24],low:[25,29,32,34,31,28,27,25,24]},$f=[[["camp","bridge","\u5C55\u5E06\u52A0\u901F","\u8B80\u53D6\u9806\u98A8\u9032\u5165\u9EDE\uFF0C\u5148\u5C0D\u6E96\u518D\u52A0\u901F\uFF1B\u5728\u65B7\u6A4B\u4EA4\u4ED8\u8D77\u901F\u7D00\u9304\u3002","lee","sweep",.3,"accelerate"],["bridge","dawn","\u9577\u5F4E\u4FDD\u901F","\u6CBF\u5916\u5F4E\u6301\u7E8C\u4FEE\u6B63\u822A\u5411\uFF1B\u6BD4\u8F03\u5207\u5167\u7DDA\u8207\u4FDD\u7559\u98A8\u5E36\u901F\u5EA6\u3002","shear","low",.25,"corner"],["dawn","storm","\u9AD8\u5C64\u885D\u7DDA","\u5148\u722C\u5347\u518D\u63A5\u9AD8\u901F\u98A8\u5C64\uFF0C\u52FF\u70BA\u6436\u901F\u5EA6\u932F\u904E\u71B1\u6D41\u51FA\u53E3\u3002","ridge","high",.28,"climb-fast"],["storm","camp","\u5E36\u901F\u8FD4\u822A","\u5728\u9577\u4E0B\u964D\u6BB5\u4FDD\u901F\uFF0C\u672B\u9580\u524D\u63D0\u65E9\u6E1B\u901F\uFF0C\u56DE\u71DF\u5730\u4EA4\u4ED8\u3002","descent","descending",.25,"finish"]],[["reed","archive","\u8B80\u53D6\u84C4\u98A8\u9EDE","\u4EA4\u66FF\u7D93\u904E\u88DC\u80FD\u6BB5\u8207\u4F4E\u4F9B\u80FD\u6BB5\uFF1B\u5230\u66F8\u5EAB\u6642\u4FDD\u6709\u5145\u8DB3\u9918\u80FD\u3002","lee","shelves",.4,"harvest"],["archive","bridge","\u6709\u9650\u80FD\u91CF\u8D8A\u810A","\u7528\u524D\u534A\u6BB5\u84C4\u80FD\u7A7F\u904E\u9AD8\u5C64\u5F31\u98A8\uFF0C\u907F\u514D\u6025\u8F49\u9020\u6210\u984D\u5916\u6D88\u8017\u3002","shear","high",.4,"budget"],["bridge","reed","\u9918\u80FD\u56DE\u6536","\u5E36\u8457\u5269\u9918\u80FD\u91CF\u6CBF\u80CC\u98A8\u5074\u964D\u8FD4\u8606\u5149\u5EAD\uFF1B\u4E0D\u4EE5\u5931\u901F\u88DC\u6EFF\u80FD\u91CF\u3002","rim","descending",.42,"reserve"]],[["bridge","camp","\u8FA8\u8A8D\u968E\u68AF\u71B1\u6D41","\u5148\u4F4E\u5F8C\u9AD8\u5730\u63A5\u4E0A\u4E09\u500B\u71B1\u6D41\u5C64\uFF0C\u8B80\u61C2\u4E0B\u4E00\u500B\u4E0A\u5347\u51FA\u53E3\u3002","ridge","rising",.3,"rise"],["camp","storm","\u932F\u5C64\u63DB\u6D41","\u5728\u4E2D\u9AD8\u5C64\u98A8\u5ECA\u4E4B\u9593\u63DB\u6D41\uFF0C\u907F\u514D\u76F4\u63A5\u62C9\u76F4\u822A\u7DDA\u3002","shear","shelves",.32,"transfer"],["storm","archive","\u63D0\u524D\u6536\u5E06","\u5F9E\u9AD8\u8655\u4E0B\u964D\u81F3\u66F8\u5EAB\uFF1B\u63D0\u65E9\u6E1B\u901F\uFF0C\u672B\u9580\u524D\u6062\u5FA9\u5E73\u7A69\u5782\u76F4\u901F\u5EA6\u3002","descent","descending",.35,"descend"],["archive","bridge","\u8D8A\u810A\u6B78\u6A4B","\u5C07\u722C\u5347\u3001\u63DB\u6D41\u8207\u4E0B\u964D\u63A5\u6210\u4E00\u6B21\u5B8C\u6574\u8D8A\u810A\uFF0C\u518D\u56DE\u65B7\u6A4B\u4EA4\u4ED8\u3002","lee","high",.3,"combine"]],[["storm","reed","\u5074\u6D41\u5B9A\u5411","\u5148\u5C0D\u9F4A\u98A8\u9580\uFF0C\u518D\u88DC\u511F\u4F86\u81EA\u5DE6\u5074\u7684\u8108\u52D5\uFF0C\u4E0D\u7B49\u5F85\u98A8\u505C\u3002","lee","sweep",.3,"left-shear"],["reed","dawn","\u53CD\u5411\u98A8\u5207","\u5F8C\u534A\u6BB5\u5074\u98A8\u65B9\u5411\u53CD\u8F49\uFF1B\u89C0\u5BDF\u7BAD\u982D\u800C\u975E\u6CBF\u7528\u4E0A\u4E00\u6BB5\u4FEE\u6B63\u91CF\u3002","shear","shelves",.28,"reverse-shear"],["dawn","bridge","\u8F09\u5100\u904E\u98A8\u810A","\u4FDD\u6301\u5B9A\u5411\u548C\u9AD8\u5EA6\u901A\u904E\u8F03\u5F37\u5074\u6D41\uFF0C\u6CBF\u65B7\u6A4B\u5916\u5074\u9032\u5834\u3002","rim","high",.26,"loaded-shear"],["bridge","storm","\u80CC\u98A8\u8FD4\u53F0","\u5148\u5229\u7528\u80CC\u98A8\u5340\u84C4\u80FD\uFF0C\u518D\u7A69\u5B9A\u6A6B\u8D8A\u6700\u5F8C\u5074\u6D41\u4EA4\u4ED8\u3002","ridge","descending",.32,"lee-return"]],[["archive","reed","\u5C0B\u627E\u7B2C\u4E00\u689D\u8996\u7DDA","\u7528\u5BE6\u9AD4\u822A\u6A19\u9010\u6B21\u78BA\u8A8D\u897F\u5317\u65B9\u4F4D\uFF0C\u4E0D\u628A\u672A\u77E5\u9727\u5340\u7576\u4F5C\u76F4\u7DDA\u6377\u5F91\u3002","lee","sweep",.36,"sightline"],["reed","storm","\u9AD8\u4F4E\u5C64\u4EA4\u53C9\u5B9A\u4F4D","\u5F9E\u5169\u500B\u4E0D\u540C\u9AD8\u5EA6\u91CD\u8B80\u822A\u5411\uFF0C\u5EFA\u7ACB\u53EF\u898B\u98A8\u5ECA\u7684\u4EA4\u6703\u9EDE\u3002","ridge","shelves",.34,"triangulate"],["storm","camp","\u5931\u53BB\u8FD1\u666F\u4E4B\u5F8C","\u8F49\u5165\u4F4E\u5C64\u8584\u9727\uFF0C\u4F9D\u4E0B\u4E00\u500B\u822A\u6A19\u53CA\u98A8\u5E36\u65B9\u5411\u63A5\u56DE\u71DF\u5730\u3002","shear","low",.35,"fog-channel"],["camp","archive","\u5E36\u56DE\u5B8C\u6574\u98A8\u5716","\u5F9E\u76F8\u53CD\u65B9\u5411\u8FA8\u8A8D\u5148\u524D\u5730\u6A19\uFF0C\u4FEE\u6B63\u65B9\u4F4D\u5F8C\u8FD4\u56DE\u66F8\u5EAB\u4EA4\u4ED8\u3002","rim","high",.38,"chart-return"]],[["dawn","bridge","\u7A7A\u8F09\u5B9A\u7DDA","\u5148\u7528\u5BEC\u98A8\u5ECA\u5EFA\u7ACB\u7A69\u5B9A\u8DEF\u7DDA\uFF0C\u89C0\u5BDF\u4E0B\u964D\u524D\u9700\u8981\u7684\u6E96\u5099\u8DDD\u96E2\u3002","lee","low",.28,"empty-run"],["bridge","camp","\u6EFF\u8F09\u7A7F\u96F2","\u651C\u5E36\u661F\u5100\u7A7F\u904E\u932F\u5C64\u96F2\u5ECA\uFF0C\u907F\u514D\u6025\u5347\u6025\u964D\u5F8C\u624D\u6821\u6B63\u3002","ridge","shelves",.3,"loaded-run"],["camp","archive","\u4EA4\u4ED8\u524D\u5E73\u822A","\u5728\u9577\u8F49\u5F4E\u5F8C\u6062\u5FA9\u5E73\u822A\uFF0C\u5E36\u8DB3\u9918\u80FD\u62B5\u9054\u66F8\u5EAB\u4EA4\u4ED8\u9EDE\u3002","shear","sweep",.35,"handover"],["archive","dawn","\u5B9A\u5411\u8FD4\u5BB6","\u6CBF\u4E0B\u6C89\u98A8\u5C64\u63D0\u65E9\u6536\u5E06\uFF0C\u5728\u6B78\u661F\u81FA\u4E0A\u65B9\u91CD\u65B0\u7A69\u5B9A\u5F8C\u843D\u5730\u3002","descent","descending",.35,"precision-return"]]],qf=["speed","energy","thermal","crosswind","fog","stability"],Yf=["\u521D\u5E06\u7AF6\u901F","\u8606\u5149\u84C4\u98A8","\u65B7\u6A4B\u5347\u964D","\u96F7\u810A\u5B9A\u5411","\u66F8\u5EAB\u63A2\u9727","\u6B78\u661F\u5E73\u822A"],Zf=["camp","reed","bridge","storm","archive","dawn"];function Jf(i,e,t){let n=t===Xl.length-1;return i==="speed"?n?{maxVerticalSpeed:3.5}:{minSpeed:t===0?12:e==="corner"?15:16}:i==="energy"?{minEnergy:n?e==="budget"?35:48:[2,5].includes(t)?e==="budget"?42:55:25}:i==="thermal"?[3,6,8].includes(t)?{maxVerticalSpeed:e==="descend"?3:4}:{}:i==="crosswind"?{...[2,4,6,8].includes(t)?{maxVerticalSpeed:e==="loaded-shear"?2.8:3.5}:{},...n?{minEnergy:25}:{}}:i==="fog"?[2,5,8].includes(t)?{maxVerticalSpeed:3.2}:{}:{maxVerticalSpeed:e==="empty-run"?3.5:2.8,...n?{minEnergy:30}:{}}}function Kf(i,e,t,n){let s=[];for(let r=0;r<e.gates.length;r++){let a=r?e.gates[r-1]:e.launch,o=e.gates[r],l={challengeId:i,stageId:e.id,gate:r,style:"challenge"},c=t==="energy"&&[0,1,4,7].includes(r),u=t==="energy"?c?7:2.6:t==="stability"?5.2:4.8;if(s.push(zh(`wind-${e.id}-leg-${r+1}`,a,o,{...l,name:c?"\u84C4\u98A8\u88DC\u7D66\u6BB5":t==="energy"?"\u6709\u9650\u4F9B\u80FD\u6BB5":`${e.name}\u98A8\u5ECA`,radius:t==="energy"?17:20,strength:t==="speed"?3.4:1.8,charge:u,liftCap:t==="thermal"?8:6})),(o.y-a.y>12||t==="thermal"&&r%3===1||c)&&s.push(kh(`wind-${e.id}-rise-${r+1}`,o,{...l,radius:t==="thermal"?26:22,charge:c?9:7})),t==="crosswind"&&r>0&&r<8){let h=ds(a,o),f=n==="reverse-shear"&&r>=4?-1:1;s.push(Hh(`wind-${e.id}-cross-${r+1}`,a,o,{...l,radius:74,strength:n==="loaded-shear"?5.6:4.6,period:r%2?7:9,direction:{x:-h.z*f,y:0,z:h.x*f}}))}}return s}function Gh(i){return $f.map((e,t)=>{let n=`challenge-${t+1}`,s=qf[t],r=Ii(i,Zf[t]),a=e.map(([o,l,c,u,h,f,d,m],_)=>{let g=Ii(i,o),p=Ii(i,l),E=ds(g,p),v={x:-E.z,z:E.x},y=Math.hypot(p.x-g.x,p.z-g.z),A=Math.min(620,Math.max(260,y*d)),T={id:`${n}-stage-${_+1}`,name:c,description:u,fromIslandId:g.id,toIslandId:p.id,focus:m,landing:!0,launch:ar(g),gates:[],winds:[],decisions:[u,"\u6700\u5F8C\u4E00\u9580\u4F4D\u65BC\u843D\u9EDE\u4E0A\u65B9\uFF1B\u901A\u904E\u5F8C\u4ECD\u9700\u5728\u5CF6\u4E2D\u592E\u843D\u5730\u6309 E \u4EA4\u4ED8\u3002"]};for(let R=0;R<Xl.length;R++){let I=Xl[R],S=Wf[h][R]*A,M={id:`${T.id}-gate-${R+1}`,name:R===8?`${p.name}\u9032\u5834\u78BA\u8A8D`:`${c} \xB7 ${R+1}`,type:s==="stability"||m==="loaded-shear"?"carry":s==="fog"?"observe":"survey",x:g.x+(p.x-g.x)*I+v.x*S,y:g.y+(p.y-g.y)*I+Xf[f][R],z:g.z+(p.z-g.z)*I+v.z*S,radius:15,...Jf(s,m,R)};(s==="crosswind"&&[1,3,5,7].includes(R)||s==="fog"&&R!==0&&R!==8||s==="stability"&&[2,5,7].includes(R))&&(M.heading={...ds(T.gates[R-1]||T.launch,M),minDot:s==="fog"?.78:.7}),M.instruction=`${M.name}\uFF1A${Oh(M)}\u3002${R===8?"\u964D\u843D\u5CF6\u4E2D\u592E\u5F8C\u6309 E\uFF0C\u624D\u6703\u4FDD\u5B58\u672C\u968E\u6BB5\u3002":u}`,T.gates.push(M)}return T.winds=Kf(n,T,s,m),T.distanceMeters=Wl([T.launch,...T.gates]),T.designBudgetMinutes=[1.3,2.2],T});return{id:n,islandId:r.id,kind:s,name:Yf[t],courseRevision:2,description:`${a.length} \u6BB5\u8DE8\u5CF6\u822A\u7A0B\uFF1A${a.map(o=>o.name).join(" \u2192 ")}\u3002\u6BCF\u6BB5\u5B8C\u6210\u5F8C\u5728\u76EE\u7684\u5CF6\u4E2D\u592E\u843D\u5730\u6309 E\uFF1B\u5931\u901F\u6216\u91CD\u8F09\u53EA\u91CD\u8A66\u7576\u524D\u6BB5\u3002`,x:r.x+(t%2?-18:18),y:r.y+22,z:r.z-18,radius:10,minEnergy:0,minSpeed:0,stages:a,distanceMeters:a.reduce((o,l)=>o+l.distanceMeters,0),designBudgetMinutes:[6,8],timingStatus:"design-budget-not-measured"}})}var $l=4,Mn=Object.freeze([{id:"turn",name:"\u71D5\u7FFC\u8235",description:"\u9748\u6D3B\u8F49\u5411\u3001\u7CBE\u6E96\u843D\u5CF6\uFF1B\u5DE1\u822A\u8F03\u6162\u3002",speed:.92,turn:1.6,energy:1},{id:"reserve",name:"\u84C4\u98A8\u56CA",description:"\u96E2\u958B\u98A8\u5E36\u66F4\u8010\u98DB\uFF1B\u8F49\u5411\u8207\u9806\u98A8\u52A0\u901F\u8F03\u5F31\u3002",speed:.97,turn:.86,energy:.7},{id:"tailwind",name:"\u9010\u98A8\u9C2D",description:"\u9806\u98A8\u52A0\u901F\u6700\u5F37\uFF1B\u504F\u96E2\u98A8\u5E36\u6642\u66F4\u8017\u80FD\u3002",speed:1.08,turn:1,energy:1.18}]),ui=[{id:"island-camp",name:"\u6668\u98A8\u71DF\u5730",region:"\u8D77\u98A8",x:0,y:0,z:0,radius:38,color:"#9aab74",station:!1},{id:"island-reed",name:"\u8606\u5149\u5EAD",region:"\u8D77\u98A8",x:-80,y:8,z:-180,radius:34,color:"#88ad82",station:!0},{id:"island-bridge",name:"\u65B7\u6A4B\u4E4B\u74B0",region:"\u65B7\u6A4B",x:90,y:18,z:-335,radius:34,color:"#baa17a",station:!1},{id:"island-storm",name:"\u96F7\u96F2\u5929\u6587\u53F0",region:"\u96F7\u96F2",x:255,y:28,z:-195,radius:41,color:"#8b9d9a",station:!0},{id:"island-archive",name:"\u6D6E\u5149\u66F8\u5EAB",region:"\u65B7\u6A4B",x:220,y:18,z:25,radius:34,color:"#9da984",station:!1},{id:"island-dawn",name:"\u6B78\u661F\u81FA",region:"\u96F7\u96F2",x:65,y:4,z:185,radius:38,color:"#b4ab80",station:!0}].map(i=>({...i,x:i.x*$l,z:i.z*$l})),xa=(i,e,t)=>({x:i,y:e,z:t}),Xh=Bh(ui),va=[];for(let i of ui)va.push({id:`wind-lift-${i.id}`,type:"thermal",name:"\u8D77\u822A\u71B1\u6D41",x:i.x,y:i.y-14,z:i.z,radius:i.radius+11,height:86,ceiling:i.y+33,strength:7,direction:xa(0,1,0)});va.push(...Vh(Xh));va.push({id:"wind-cross-reed",type:"crosswind",name:"\u8108\u52D5\u5074\u98A8",x:-168,y:-25,z:-384,radius:74,height:100,strength:4.5,period:8,direction:xa(1,0,.2)},{id:"wind-cross-storm",type:"crosswind",name:"\u96F7\u810A\u5074\u98A8",x:376,y:-20,z:-752,radius:92,height:120,strength:6,period:10,direction:xa(.2,0,1)},{id:"wind-cross-dawn",type:"crosswind",name:"\u6B78\u661F\u5074\u98A8",x:640,y:-20,z:-16,radius:88,height:120,strength:5,period:9,direction:xa(-1,0,.1)});var Wh=[["\u7B2C\u4E00\u5C01\u822A\u4FE1","\u6211\u5011\u628A\u5BB6\u7BC9\u5728\u98A8\u4E0A\uFF0C\u4ECD\u9858\u6BCF\u500B\u51FA\u767C\u7684\u4EBA\u90FD\u6709\u4E00\u689D\u56DE\u5BB6\u7684\u8DEF\u3002"],["\u5E06\u5320\u7684\u523B\u5EA6","\u4E0D\u662F\u628A\u5E06\u62C9\u5F97\u6700\u7DCA\uFF0C\u800C\u662F\u77E5\u9053\u4F55\u6642\u8B93\u98A8\u7A7F\u904E\u3002"],["\u8606\u8466\u7684\u8A18\u61B6","\u98A8\u7D93\u904E\u8606\u8466\uFF0C\u7559\u4E0B\u4E86\u7B2C\u4E00\u9996\u80FD\u88AB\u770B\u898B\u7684\u6B4C\u3002"],["\u5F15\u98A8\u8005\u7684\u7B46\u8A18","\u91D1\u8272\u4E0A\u5347\u74B0\u662F\u71B1\u6D41\uFF0C\u5F4E\u66F2\u9577\u5E36\u662F\u9806\u98A8\u3002\u4E0D\u8981\u53EA\u9760\u984F\u8272\u8FA8\u8A8D\u3002"],["\u6A4B\u4E0A\u7684\u7D04\u5B9A","\u6A4B\u66FE\u9023\u63A5\u5169\u5EA7\u5CF6\u3002\u6A4B\u65B7\u5F8C\uFF0C\u4FE1\u4EF6\u4ECD\u7136\u62B5\u9054\u3002"],["\u820A\u65E5\u6E2C\u98A8\u5C3A","\u5F9E\u7B49\u5F85\u98A8\u5230\u8B80\u61C2\u98A8\uFF0C\u6587\u660E\u8D70\u904E\u7684\u8DDD\u96E2\u6BD4\u5CF6\u8207\u5CF6\u66F4\u9060\u3002"],["\u5929\u6587\u53F0\u661F\u5716","\u661F\u5716\u4E0D\u662F\u70BA\u4E86\u77E5\u9053\u6211\u5011\u5728\u54EA\uFF0C\u800C\u662F\u63D0\u9192\u6211\u5011\u8981\u53BB\u4F55\u65B9\u3002"],["\u96F7\u5B63\u89C0\u6E2C\u8A8C","\u96F7\u5FC3\u4EAE\u8D77\u6642\uFF0C\u7E5E\u884C\u5916\u7DE3\uFF1B\u98A8\u5F9E\u4E0D\u8981\u6C42\u83BD\u649E\u7684\u52C7\u6562\u3002"],["\u6D6E\u5149\u66F8\u9801","\u6BCF\u4E00\u672C\u66F8\u90FD\u66FE\u662F\u4E00\u500B\u4EBA\u7559\u4E0B\u7684\u5CB8\u3002"],["\u7121\u540D\u8FD4\u822A\u8005","\u4ED6\u5E36\u56DE\u7684\u4E0D\u662F\u5BF6\u7269\uFF0C\u800C\u662F\u6240\u6709\u4EBA\u90FD\u80FD\u8D70\u7684\u822A\u7DDA\u3002"],["\u6B78\u661F\u5EA7\u6A19","\u7B2C\u4E09\u675F\u5149\u9EDE\u4EAE\u6642\uFF0C\u9060\u65B9\u7D42\u65BC\u6210\u70BA\u53EF\u4EE5\u56DE\u53BB\u7684\u5730\u65B9\u3002"],["\u7D66\u4E0B\u4E00\u4F4D\u65C5\u4EBA","\u4F60\u7684\u822A\u8DE1\u4E5F\u6703\u6210\u70BA\u5225\u4EBA\u7684\u5730\u5716\u3002\u73FE\u5728\uFF0C\u56DE\u5BB6\u5427\u3002"]],jf=[[[-.76,-.2,1.4,"\u71DF\u5730\u897F\u5317\u5074\u8349\u5730\uFF0C\u6CBF\u5CF6\u9762\u8D70\u5230\u5916\u7DE3\u5167\u5074\u3002"],[.45,.45,20,"\u71DF\u5730\u6771\u5357\u5074\u4E0A\u7A7A 20 \u516C\u5C3A\uFF0C\u501F\u4E2D\u592E\u71B1\u6D41\u5347\u8D77\u5F8C\u8F49\u5411\u3002"]],[[-.55,.58,1.4,"\u8606\u5149\u5EAD\u897F\u5357\u5074\u8349\u5730\uFF0C\u7559\u5728\u5CF6\u7DE3\u77F3\u677F\u5167\u5074\u3002"],[.65,-.35,24,"\u8606\u5149\u5EAD\u6771\u5317\u5074\u4E0A\u7A7A 24 \u516C\u5C3A\uFF0C\u5F9E\u71B1\u6D41\u51FA\u53E3\u5411\u6771\u504F\u8F49\u3002"]],[[.72,.1,1.4,"\u65B7\u6A4B\u6771\u5074\u5CF6\u9762\uFF0C\u65B7\u6A4B\u907A\u8DE1\u5167\u5074\u7684\u53EF\u7AD9\u7ACB\u77F3\u677F\u3002"],[-.5,-.55,26,"\u65B7\u6A4B\u897F\u5317\u5074\u4E0A\u7A7A 26 \u516C\u5C3A\uFF0C\u5148\u5347\u81F3\u6A4B\u9802\u822A\u6A19\u9644\u8FD1\u3002"]],[[-.72,.18,1.4,"\u5929\u6587\u53F0\u897F\u5074\u8349\u5730\uFF0C\u4E2D\u592E\u74B0\u5EA7\u5916\u5074\u4F46\u4ECD\u5728\u5CF6\u9762\u4E0A\u3002"],[.5,-.5,25,"\u5929\u6587\u53F0\u6771\u5317\u5074\u4E0A\u7A7A 25 \u516C\u5C3A\uFF0C\u96E2\u958B\u71B1\u6D41\u6642\u6CBF\u5317\u5074\u7E5E\u904E\u67F1\u51A0\u3002"]],[[-.2,.78,1.4,"\u66F8\u5EAB\u5357\u5074\u5CF6\u9762\uFF0C\u74B0\u5F62\u66F8\u67B6\u5916\u7684\u8349\u5730\u3002"],[.58,-.48,23,"\u66F8\u5EAB\u6771\u5317\u5074\u4E0A\u7A7A 23 \u516C\u5C3A\uFF0C\u501F\u4E2D\u592E\u71B1\u6D41\u8D8A\u904E\u74B0\u5F62\u67F1\u9802\u3002"]],[[.72,.15,1.4,"\u6B78\u661F\u81FA\u6771\u5074\u8349\u5730\uFF0C\u671D\u6668\u5149\u8DEF\u6A19\u8D70\u5230\u5CF6\u7DE3\u5167\u5074\u3002"],[-.58,-.45,22,"\u6B78\u661F\u81FA\u897F\u5317\u5074\u4E0A\u7A7A 22 \u516C\u5C3A\uFF0C\u56DE\u5230\u71B1\u6D41\u5F8C\u5411\u5317\u96E2\u6D41\u3002"]]],Qf=ui.flatMap((i,e)=>jf[e].map(([t,n,s,r],a)=>({id:`relic-${String(e*2+a+1).padStart(2,"0")}`,islandId:i.id,name:Wh[e*2+a][0],text:Wh[e*2+a][1],hint:r,x:i.x+t*i.radius,y:i.y+s,z:i.z+n*i.radius,radius:3.6}))),ep=Gh(ui),xe=Object.freeze({mapScale:$l,boundsRadius:2600,islands:ui,winds:va,routes:Xh,relics:Qf,challenges:ep,hazards:[{id:"hazard-thunder",type:"thunder",name:"\u96F7\u96F2\u6838\u5FC3",x:360,y:10,z:-680,radius:80,height:100,period:10,description:"\u96F7\u5FC3\u6BCF 10 \u79D2\u8108\u52D5\uFF1B\u6CBF\u4E0A\u5C64\u98A8\u5ECA\u7E5E\u958B\u96F7\u5FC3\uFF0C\u9583\u5149\u671F\u9593\u9760\u8FD1\u6703\u52A0\u5FEB\u8017\u80FD\u3002"},{id:"hazard-fog",type:"fog",name:"\u6D6E\u5149\u9727\u6D77",x:868,y:-8,z:-12,radius:175,height:100,description:"\u6CBF\u66F8\u5EAB\u65B9\u4F4D\u8207\u4E0B\u4E00\u500B\u5BE6\u9AD4\u822A\u6A19\u8FA8\u5411\uFF1B\u9727\u53EA\u906E\u64CB\u8996\u91CE\uFF0C\u4E0D\u76F4\u63A5\u6263\u80FD\u91CF\u3002"},{id:"hazard-fog-central",type:"fog",name:"\u4E2D\u592E\u9727\u5ECA",x:560,y:-8,z:35,radius:185,height:100,description:"\u9032\u9727\u524D\u8B80\u53D6\u98A8\u5ECA\u65B9\u5411\uFF1B\u4F4E\u5C64\u7BC0\u80FD\uFF0C\u9AD8\u5C64\u8996\u91CE\u8F03\u6E05\u695A\u3002"},{id:"hazard-fog-west",type:"fog",name:"\u897F\u810A\u96F2\u5E55",x:250,y:-8,z:-490,radius:215,height:90,description:"\u897F\u5411\u822A\u6BB5\u7684\u96F2\u5E55\u906E\u4F4F\u8FD1\u666F\uFF0C\u6CBF\u6709\u65B9\u5411\u7684\u89C0\u6E2C\u9580\u9010\u6BB5\u5B9A\u4F4D\u3002"},{id:"hazard-fog-north",type:"fog",name:"\u5317\u810A\u8584\u9727",x:680,y:-8,z:-610,radius:170,height:100,description:"\u96E2\u958B\u66F8\u5EAB\u5F8C\u7684\u7B2C\u4E00\u6BB5\u9727\u5E36\uFF1B\u5148\u78BA\u8A8D\u4E0B\u4E00\u9580\u65B9\u5411\u518D\u9032\u5165\u96F2\u5E55\u3002"}],dialogues:[{id:"dialogue-1",station:"island-reed",title:"\u7B2C\u4E00\u675F\u5149",text:"\u516B\u4EFD\u98A8\u5C64\u6A23\u672C\u6821\u6E96\u4E86\u8606\u5149\u98A8\u6A19\u3002\u73FE\u5728\u7A69\u5B9A\u904B\u9001\u5B9A\u5411\u661F\u5100\uFF1A\u53EF\u7E5E\u65B7\u6A4B\u5916\u7DE3\uFF0C\u4E5F\u53EF\u63A5\u4E0A\u96F7\u810A\u9AD8\u5C64\u7A84\u98A8\u5ECA\u3002"},{id:"dialogue-2",station:"island-storm",title:"\u88AB\u8A18\u4F4F\u7684\u822A\u7DDA",text:"\u5B9A\u5411\u661F\u5100\u5B89\u5168\u62B5\u9054\uFF0C\u516B\u6BB5\u7D00\u9304\u8B93\u9060\u661F\u91CD\u65B0\u6E05\u6670\u3002\u63A5\u8457\u5F9E\u4E0D\u540C\u9AD8\u5EA6\u548C\u65B9\u4F4D\u89C0\u6E2C\u9727\u6D77\uFF0C\u91CD\u5EFA\u5357\u65B9\u6B78\u661F\u81FA\u7684\u5EA7\u6A19\u3002"},{id:"dialogue-3",station:"island-dawn",title:"\u5BB6\u7684\u5EA7\u6A19",text:"\u516B\u500B\u65B9\u4F4D\u7BC0\u9EDE\u5DF2\u4EA4\u6703\u6210\u661F\u5716\u3002\u73FE\u5728\u6CBF\u6B78\u822A\u98A8\u5E36\u8FD4\u56DE\u6668\u98A8\u71DF\u5730\uFF0C\u8B93\u6240\u6709\u65C5\u4EBA\u90FD\u80FD\u627E\u5230\u56DE\u5BB6\u7684\u65B9\u5411\u3002"}],ending:{title:"\u98A8\u8A18\u5F97\u4F60\u7684\u6B78\u9014",text:"\u5929\u6587\u53F0\u91CD\u65B0\u4EAE\u8D77\u3002\u516D\u5EA7\u5CF6\u4E0D\u518D\u662F\u6563\u843D\u7684\u5CB8\uFF0C\u800C\u662F\u4E00\u5F35\u53EF\u4EE5\u91CD\u8D70\u3001\u53EF\u4EE5\u5206\u4EAB\u7684\u822A\u5716\u3002\u4E0B\u4E00\u8D9F\uFF0C\u8A66\u8457\u66F4\u5E73\u7A69\u3001\u66F4\u8FC5\u901F\uFF0C\u6216\u8B80\u5B8C\u98A8\u7559\u4E0B\u7684\u5341\u4E8C\u5C01\u4FE1\u3002"}}),Pi=ui.filter(i=>i.station).map(i=>i.id),Ot=i=>ui.find(e=>e.id===i)||ui[0],Ma=(i,e)=>!i.routeId||!e.activeChallenge&&i.style===(e.trackedHint?"safe":e.routeStyle);function $h(i,e){if(e.y<i.y||e.y>i.y+i.height)return 0;let t;if(i.start&&i.end){let n=i.end.x-i.start.x,s=i.end.z-i.start.z,r=Math.max(0,Math.min(1,((e.x-i.start.x)*n+(e.z-i.start.z)*s)/(n*n+s*s)));t=Math.hypot(e.x-i.start.x-r*n,e.z-i.start.z-r*s)}else t=Math.hypot(e.x-i.x,e.z-i.z);return Math.max(0,1-Math.max(0,t-i.radius*.65)/(i.radius*.35))}var Di=3,tp="aetherwake-save",Li=i=>JSON.parse(JSON.stringify(i)),sn=(i,e=0,t=1e9)=>Number.isFinite(i)&&i>=0?Math.min(t,i):e,Sa=(i,e)=>Array.isArray(i)?[...new Set(i.filter(t=>e.includes(t)))]:[],or=i=>i!==null&&typeof i=="object"&&!Array.isArray(i),qh=(i,e)=>Math.trunc(sn(i,0,e)),ql=i=>Array.isArray(i.stages)?i.stages.length:0,np=i=>Math.max(0,...xe.routes.filter(e=>e.mission===i).map(e=>Array.isArray(e.samples)?e.samples.length:0)),ba=i=>Array.isArray(i)?[...new Set(i.filter(e=>typeof e=="string"&&e.length>0))]:[];function di(i,e,t=!1){return or(i)?Object.fromEntries(Object.entries(i).flatMap(([n,s])=>{if(e&&!e.includes(n)||!or(s)||!Number.isFinite(s.time)||s.time<0)return[];let r=t?{time:sn(s.time),assisted:s.assisted===!0,module:Mn.some(a=>a.id===s.module)?s.module:"turn",seed:Math.trunc(sn(s.seed,1,4294967295))>>>0}:{time:sn(s.time),score:sn(s.score),stalls:Math.trunc(sn(s.stalls)),assisted:s.assisted===!0};return[[n,r]]})):{}}function fs(){return{schemaVersion:Di,seed:1,module:"turn",checkpoint:"island-camp",unlocked:["island-camp"],activated:[],relics:[],mainSamples:[0,0,0],courseStages:Object.fromEntries(xe.challenges.map(i=>[i.id,0])),challenges:[],completedChallenges:[],cargoStability:100,cargoDamage:0,elapsed:0,segmentStart:0,stalls:0,assist:!1,usedAssist:!1,routeStyle:"safe",completed:!1,records:{},routeRecords:{},legacyRecords:{},legacyRouteRecords:{},legacyChallenges:[],settings:{music:.35,sfx:.7,reducedMotion:!1,camera:"follow",quality:"auto"}}}function lr(i){if(!i||typeof i!="object"||Array.isArray(i)||i.schemaVersion!==Di||!xe.islands.some(n=>n.id===i.checkpoint)||!Array.isArray(i.relics)||!Array.isArray(i.activated))return null;let e=fs();e.seed=Math.trunc(sn(i.seed,1,4294967295))>>>0,e.module=Mn.some(n=>n.id===i.module)?i.module:"turn",e.checkpoint=i.checkpoint,e.unlocked=Sa(i.unlocked,xe.islands.map(n=>n.id)),e.unlocked=[...new Set(["island-camp",...e.unlocked,i.checkpoint])],e.relics=Sa(i.relics,xe.relics.map(n=>n.id)),e.mainSamples=e.mainSamples.map((n,s)=>qh(Array.isArray(i.mainSamples)?i.mainSamples[s]:0,np(s+1)));for(let n of xe.challenges)e.courseStages[n.id]=qh(or(i.courseStages)?i.courseStages[n.id]:0,ql(n));let t=xe.challenges.filter(n=>ql(n)>0&&e.courseStages[n.id]===ql(n)).map(n=>n.id);e.challenges=Sa(i.challenges,t),e.completedChallenges=[...new Set([...Sa(i.completedChallenges,xe.challenges.map(n=>n.id)),...t])];for(let n of Pi)if(i.activated.includes(n))e.activated.push(n);else break;if(e.elapsed=sn(i.elapsed),e.stalls=Math.trunc(sn(i.stalls)),e.segmentStart=Number.isFinite(i.elapsed)&&i.elapsed>=0&&i.elapsed<=1e9&&Number.isFinite(i.segmentStart)&&i.segmentStart>=0&&i.segmentStart<=e.elapsed?i.segmentStart:null,e.cargoStability=sn(i.cargoStability,100,100),e.cargoDamage=sn(i.cargoDamage),e.assist=i.assist===!0,e.routeStyle=i.routeStyle==="shortcut"?"shortcut":"safe",e.usedAssist=i.usedAssist===!0||e.assist,e.completed=i.completed===!0&&e.activated.length===Pi.length&&i.checkpoint==="island-camp",or(i.settings)){let n=i.settings;e.settings.music=sn(n.music,.35,1),e.settings.sfx=sn(n.sfx,.7,1),e.settings.reducedMotion=n.reducedMotion===!0,e.settings.camera=n.camera==="overhead"?"overhead":"follow",e.settings.quality=["auto","low","high"].includes(n.quality)?n.quality:"auto"}return e.records=di(i.records,Mn.map(n=>n.id)),e.routeRecords=di(i.routeRecords,xe.routes.map(n=>n.id),!0),e.legacyRecords=di(i.legacyRecords),e.legacyRouteRecords=di(i.legacyRouteRecords,null,!0),e.legacyChallenges=ba(i.legacyChallenges),e}function ip(i){if(i?.schemaVersion===Di)return{save:lr(i),migrated:!1};let e=i?.schemaVersion===1||i?.schemaVersion===void 0&&i?.version===1;if(or(i)&&(e||i.schemaVersion===2)){let t=fs(),n=e?{...t,...i,checkpoint:i.checkpoint??i.island??t.checkpoint,relics:i.relics??i.fragments??[],activated:i.activated??[]}:i,s=lr({...n,schemaVersion:Di,segmentStart:null,mainSamples:t.mainSamples,courseStages:t.courseStages,cargoStability:100,cargoDamage:0,challenges:[],completedChallenges:[],records:{},routeRecords:{},legacyRecords:{...di(i.legacyRecords),...di(i.records)},legacyRouteRecords:{...di(i.legacyRouteRecords,null,!0),...di(i.routeRecords,null,!0)},legacyChallenges:[...ba(i.legacyChallenges),...ba(i.completedChallenges),...ba(i.challenges)]});return{save:s,migrated:s!==null}}return{save:null,migrated:!1}}var Ea=class{constructor(e,t=tp){if(this.key=t,this.memory=fs(),this.storage=e,this.pendingWriteWarning=null,e===void 0)try{this.storage=globalThis.localStorage}catch{this.storage=null}}load(){if(this.pendingWriteWarning)return{save:Li(this.memory),warning:this.pendingWriteWarning,migrated:!1};if(!this.storage)return{save:Li(this.memory),warning:"\u700F\u89BD\u5668\u5132\u5B58\u4E0D\u53EF\u7528\uFF1B\u672C\u6B21\u9032\u5EA6\u50C5\u4FDD\u7559\u5728\u8A18\u61B6\u9AD4\u3002",migrated:!1};try{let e=this.storage.getItem(this.key);if(!e)return{save:Li(this.memory),warning:null,migrated:!1};let t;try{t=JSON.parse(e)}catch{t=null}let n=ip(t);return n.save?(this.memory=n.save,{save:Li(this.memory),warning:n.migrated?"\u820A\u7248\u5B58\u6A94\u5DF2\u5B89\u5168\u5347\u7D1A\uFF1B\u4E0B\u4E00\u500B\u5B89\u5168\u4FDD\u5B58\u9EDE\u6703\u5BEB\u5165\u65B0\u683C\u5F0F\u3002":null,migrated:n.migrated}):{save:Li(this.memory),warning:"\u5B58\u6A94\u5DF2\u640D\u58DE\u6216\u7248\u672C\u4E0D\u652F\u63F4\uFF1B\u539F\u59CB\u5B58\u6A94\u4ECD\u4FDD\u7559\uFF0C\u73FE\u5728\u4F7F\u7528\u5B89\u5168\u7684\u65B0\u9032\u5EA6\u3002",migrated:!1}}catch{return{save:Li(this.memory),warning:"\u7121\u6CD5\u8B80\u53D6\u700F\u89BD\u5668\u5132\u5B58\uFF1B\u672C\u6B21\u9032\u5EA6\u50C5\u4FDD\u7559\u5728\u8A18\u61B6\u9AD4\u3002",migrated:!1}}}save(e){let t=lr({...this.memory,...e,schemaVersion:Di,settings:{...this.memory.settings,...e?.settings}});if(!t)return{ok:!1,warning:"\u5B58\u6A94\u8CC7\u6599\u4E0D\u5B8C\u6574\uFF0C\u5DF2\u4FDD\u7559\u4E0A\u4E00\u500B\u5B89\u5168\u5B58\u6A94\u3002"};if(this.memory=t,!this.storage)return this.pendingWriteWarning="\u700F\u89BD\u5668\u5132\u5B58\u4E0D\u53EF\u7528\uFF1B\u672C\u6B21\u9032\u5EA6\u50C5\u4FDD\u7559\u5728\u8A18\u61B6\u9AD4\u3002",{ok:!1,warning:this.pendingWriteWarning};try{return this.storage.setItem(this.key,JSON.stringify(t)),this.pendingWriteWarning=null,{ok:!0,warning:null}}catch{return this.pendingWriteWarning="\u5132\u5B58\u7A7A\u9593\u4E0D\u8DB3\u6216\u88AB\u5C01\u9396\uFF1B\u76EE\u524D\u9032\u5EA6\u4ECD\u5728\u8A18\u61B6\u9AD4\uFF0C\u96E2\u958B\u524D\u8ACB\u4FDD\u7559\u6B64\u9801\u3002",{ok:!1,warning:this.pendingWriteWarning}}}clearProgress(){let e=Li(this.memory.settings);return this.save({...fs(),settings:e})}};var Yh=({x:i,y:e,z:t})=>`${i},${e},${t}`,sp=({x:i,y:e,z:t})=>({x:i,y:e,z:t}),rp=({x:i,y:e,z:t})=>({x:i,y:e+26,z:t}),Yl=(i,e)=>Math.hypot(i.x-e.x,i.y-e.y,i.z-e.z);function ap(){let i=new Map,e=new Map,t=r=>{let a=Yh(r);return i.has(a)||i.set(a,{position:sp(r),edges:new Map}),a},n=(r,a)=>{if(r===a)return;let o=Yl(i.get(r).position,i.get(a).position);i.get(r).edges.set(a,o),i.get(a).edges.set(r,o)};for(let r of xe.routes.filter(a=>a.style==="safe")){let a;for(let o of r.waypoints){let l=t(o);a!==void 0&&n(a,l),a=l}}let s=[...i.keys()];for(let r of xe.islands){let a=rp(r),o=Yh(a);if(e.set(r.id,o),i.has(o))continue;let l=s.reduce((c,u)=>c===void 0||Yl(a,i.get(u).position)<Yl(a,i.get(c).position)?u:c,void 0);if(l===void 0)throw new Error("The safe transit network has no route waypoints.");t(a),n(o,l)}return{nodes:i,terminals:e}}var cr=ap();function Zh(i,e){let t=cr.terminals.get(i),n=cr.terminals.get(e);if(t===void 0||n===void 0)throw new RangeError("Safe transit requires two known island IDs.");if(t===n)return[];let s=new Map([[t,0]]),r=new Map,a=new Set(cr.nodes.keys());for(;a.size;){let o,l=1/0;for(let c of a){let u=s.get(c)??1/0;u<l&&(o=c,l=u)}if(o===void 0)break;if(o===n){let c=[];for(let u=n;u!==t;u=r.get(u))c.push(cr.nodes.get(u).position);return c.reverse().map(u=>({...u,radius:24,name:"\u5B89\u5168\u63A5\u99C1\u98A8\u6A19",instruction:"\u6CBF\u5BEC\u98A8\u5ECA\u98DB\u5411\u63A5\u99C1\u6A19\uFF1B\u62B5\u5CF6\u5F8C\u518D\u524D\u5F80\u9060\u5F81\u5165\u53E3\u3002"}))}a.delete(o);for(let[c,u]of cr.nodes.get(o).edges){if(!a.has(c))continue;let h=l+u;h<(s.get(c)??1/0)&&(s.set(c,h),r.set(c,o))}}throw new Error(`No safe transit route connects ${i} to ${e}.`)}var Ui=(i,e,t)=>Math.max(e,Math.min(t,i)),Jh=i=>JSON.parse(JSON.stringify(i)),Ni=(i,e)=>Math.hypot(i.x-e.x,i.z-e.z),op=i=>{if(Number.isFinite(Number(i)))return Math.trunc(Number(i))>>>0;let e=2166136261;for(let t of String(i))e=Math.imul(e^t.charCodeAt(0),16777619);return e>>>0},ps=class{constructor({seed:e=1,module:t="turn",save:n}={}){this.events=[],this.persisted=lr(n)||fs(),this._setup({seed:n?this.persisted.seed:e,module:n?this.persisted.module:t,resume:!!n})}_setup({seed:e,module:t,resume:n=!1}){let s=this.persisted,r=n?s.checkpoint:"island-camp",a=Ot(r);this.state={seed:op(e),module:Mn.some(o=>o.id===t)?t:"turn",player:{x:a.x,y:a.y,z:a.z,vx:0,vy:0,vz:0,heading:0,grounded:!0,gliding:!1,energy:100,braking:!1},elapsed:n?s.elapsed:0,checkpoint:r,activated:n?[...s.activated]:[],relics:[...s.relics],challenges:n?[...s.challenges]:[],completedChallenges:[...s.completedChallenges],unlocked:[...s.unlocked],stalls:n?s.stalls:0,status:n&&s.completed?"complete":"ready",assist:s.assist,usedAssist:n?s.usedAssist:s.assist,routeStyle:s.routeStyle,segmentFailures:0,distance:0,wind:[],hazard:null,lowEnergy:!1,lastLanding:{islandId:a.id,precise:!0},score:0,rating:null,nearby:null,objective:null,routeTimes:[],segmentStart:n?s.segmentStart:0,airTime:0,challengeProgress:{},activeChallenge:null,challengeHint:null,mainSamples:n?[...s.mainSamples||[0,0,0]]:[0,0,0],surveyHint:null,trackedHint:null,transitWaypoints:[],transitIndex:0,courseStages:{...s.courseStages||{}},cargoStability:n?s.cargoStability??100:100,cargoDamage:n&&s.cargoDamage||0,navigationMessage:null},this.events=[],this.suppressedChallengeEntries=new Set,this._nearby(),this._objective(),this.state.status==="complete"&&this._rating()}get player(){return this.state.player}get elapsed(){return this.state.elapsed}get checkpoint(){return this.state.checkpoint}get activated(){return this.state.activated}get relics(){return this.state.relics}get challenges(){return this.state.challenges}get stalls(){return this.state.stalls}get status(){return this.state.status}set status(e){["ready","running","paused","complete"].includes(e)&&(this.state.status=e)}get assist(){return this.state.assist}set assist(e){this.setAssist(e)}get routeStyle(){return this.state.routeStyle}set routeStyle(e){this.setRouteStyle(e)}emit(e,t={}){this.events.push({type:e,...t})}launch(){return this.state.status==="ready"||this.state.status==="paused"?(this.state.status="running",this.emit("start"),!0):!1}setPaused(e){e&&this.state.status==="running"?(this.state.status="paused",this.emit("pause")):!e&&this.state.status==="paused"&&(this.state.status="running",this.emit("resume"))}setAssist(e){this.state.assist=!!e,this.state.usedAssist||=!!e,this.emit("assist",{enabled:!!e})}setRouteStyle(e){this.state.routeStyle=e==="shortcut"?"shortcut":"safe",this._objective()}reset({seed:e=this.state.seed,module:t=this.state.module}={}){this.persisted=this.saveData(),this._setup({seed:e,module:t}),this.emit("reset")}snapshot(){return Jh(this.state)}drainEvents(){let e=this.events;return this.events=[],e}courseStage(e){if(!e?.stages?.length)return null;let t=this.state.courseStages[e.id]||0;return e.stages[t>=e.stages.length?0:t]}courseEntry(e){let t=this.courseStage(e);if(!t)return e;let n=Ot(t.fromIslandId);return{id:e.id,name:e.name,radius:e.radius,minSpeed:e.minSpeed||0,minEnergy:e.minEnergy||0,x:n.x+18,y:n.y+22,z:n.z-18}}trackChallenge(e){let t=xe.challenges.find(s=>s.id===e);if(!t||this.state.challenges.includes(e)||!this.player.grounded)return!1;this.state.activeChallenge&&this.cancelChallenge();let n=this.courseStage(t);return this.state.transitWaypoints=Zh(this.state.checkpoint,n?.fromIslandId||t.islandId),this.state.transitIndex=0,this._trackedTarget(t),!0}_trackedTarget(e){let t=this.state,n=this.courseStage(e),s=t.transitWaypoints[t.transitIndex];t.trackedHint={id:e.id,name:e.name,...s||this.courseEntry(e),stageName:n?.name,stage:(t.courseStages[e.id]||0)%(e.stages?.length||1)+1,stageTotal:e.stages?.length||1,entry:!s,transit:!!s,transitStep:t.transitIndex+1,transitTotal:t.transitWaypoints.length,step:0,total:(n?.gates?.length||8)+1,instruction:s?`\u6CBF\u5B89\u5168\u63A5\u99C1\u98A8\u6A19\u524D\u5F80${Ot(n?.fromIslandId||e.islandId).name}\u3002\u4E0D\u9700\u505C\u7559\u7B49\u5F85\u3002`:`\u5230${Ot(n?.fromIslandId||e.islandId).name}\u7684\u91D1\u74B0\u958B\u59CB\u672C\u968E\u6BB5\u3002\u5DF2\u4EA4\u4ED8\u968E\u6BB5\u4E0D\u7528\u91CD\u8DD1\u3002`},t.trackedHint.id=e.id}_returnToCheckpoint(){let e=this.state,t=Ot(e.checkpoint);Object.assign(e.player,{x:t.x,y:t.y,z:t.z,vx:0,vy:0,vz:0,heading:0,grounded:!0,gliding:!1,braking:!1,energy:100}),e.wind=[],e.hazard=null,e.lowEnergy=!1}cancelChallenge(){let e=this.state,t=e.activeChallenge||e.trackedHint?.id;return t?(this.suppressedChallengeEntries.add(t),e.cargoDamage+=100-e.cargoStability,e.cargoStability=100,delete e.challengeProgress[t],e.activeChallenge=null,e.challengeHint=null,e.trackedHint=null,e.transitWaypoints=[],e.transitIndex=0,this._returnToCheckpoint(),this._objective(),this._nearby(),this.emit("challenge-reset",{id:t,reason:"cancel",message:"\u5DF2\u9000\u51FA\u4E26\u8FD4\u56DE\u6700\u5F8C\u5B89\u5168\u5CF6\uFF1B\u4E3B\u7DDA\u6A23\u672C\u8207\u5DF2\u4EA4\u4ED8\u968E\u6BB5\u4FDD\u7559\uFF0C\u4E0D\u52A0\u5931\u901F\u61F2\u7F70\u3002"}),this.emit("save"),!0):!1}saveData(){let e=this.state,t={...this.persisted,schemaVersion:Di,seed:e.seed,module:e.module,checkpoint:e.checkpoint,unlocked:[...e.unlocked],activated:[...e.activated],relics:[...e.relics],challenges:[...e.challenges],completedChallenges:[...e.completedChallenges],mainSamples:[...e.mainSamples],courseStages:{...e.courseStages},cargoStability:e.cargoStability,cargoDamage:e.cargoDamage,elapsed:e.elapsed,segmentStart:e.segmentStart,stalls:e.stalls,assist:e.assist,usedAssist:e.usedAssist,routeStyle:e.routeStyle,completed:e.status==="complete"},n=Pi.every((s,r)=>e.mainSamples[r]>=(xe.routes.find(a=>a.mission===r+1)?.samples?.length||1/0));if(e.status==="complete"&&n){let s=t.records[e.module];(!s||s.assisted&&!e.usedAssist||s.assisted===e.usedAssist&&e.elapsed<s.time)&&(t.records={...t.records,[e.module]:{time:e.elapsed,score:e.score,stalls:e.stalls,assisted:e.usedAssist}})}t.routeRecords={...t.routeRecords};for(let s of e.routeTimes){let r=`route-${s.mission}-${s.style}`,a=t.routeRecords[r];(!a||a.assisted&&!e.usedAssist||a.assisted===e.usedAssist&&s.seconds<a.time)&&(t.routeRecords[r]={time:s.seconds,assisted:e.usedAssist,module:e.module,seed:e.seed})}return this.persisted=Jh(t),t}_objective(){let e=this.state,t=Ot(Pi[e.activated.length]||"island-camp");e.objective={islandId:t.id,name:t.name,step:e.activated.length+1,total:4,x:t.x,y:t.y,z:t.z,routeId:`route-${e.activated.length+1}-${e.routeStyle}`,text:e.activated.length<3?`\u62B5\u9054${t.name}\uFF0C\u5728\u89C0\u6E2C\u53F0\u65C1\u6309 E \u555F\u52D5`:"\u8FD4\u56DE\u6668\u98A8\u71DF\u5730\uFF0C\u5728\u71DF\u706B\u65C1\u6309 E \u5B8C\u6210\u9060\u5F81"};let n=xe.routes.find(a=>a.id===e.objective.routeId),s=e.mainSamples[e.activated.length]||0,r=n?.samples?.[s];e.surveyHint=r?{...r,step:s+1,total:n.samples.length,mission:e.activated.length+1}:null,e.surveyHint&&(e.objective.text=`${e.surveyHint.name} ${s+1}/${n.samples.length} \xB7 ${r.instruction}`)}_nearby(){let e=this.state,t=e.player,n=xe.islands.find(o=>Ni(o,t)<o.radius-1&&Math.abs(t.y-o.y)<2.5),s=xe.challenges.find(o=>o.id===e.activeChallenge),r=this.courseStage(s),a=r&&(e.challengeProgress[s.id]||0)>=r.gates.length;e.nearby=n&&t.grounded&&Ni(n,t)<13?{islandId:n.id,station:n.station,name:n.name,canInteract:e.activeChallenge?!!a&&n.id===r?.toIslandId:n.id===e.objective?.islandId&&!e.surveyHint&&!e.trackedHint,message:e.activeChallenge?"E \xB7 \u4EA4\u4ED8\u6E2C\u98A8\u8CC7\u6599":n.id==="island-camp"?"E \xB7 \u8FD4\u56DE\u71DF\u5730":n.station?"E \xB7 \u555F\u52D5\u89C0\u6E2C\u53F0":"\u5B89\u5168\u88DC\u7D66\u5CF6"}:null}interact(){let e=this.state;if(e.status!=="running")return!1;if(this._nearby(),!e.nearby)return this.emit("hint",{message:"\u5148\u5B89\u5168\u843D\u5730\uFF0C\u518D\u9760\u8FD1\u5CF6\u4E2D\u592E\u7684\u89C0\u6E2C\u53F0\u3002"}),!1;if(e.activeChallenge){let n=xe.challenges.find(r=>r.id===e.activeChallenge),s=this.courseStage(n);return!s||!e.nearby.canInteract?(this.emit("hint",{message:"\u5148\u4F9D\u5E8F\u5B8C\u6210\u672C\u6BB5\u89C0\u6E2C\uFF0C\u518D\u843D\u5230\u4EA4\u4ED8\u5CF6\u4E2D\u592E\u3002"}),!1):(e.courseStages[n.id]=(e.courseStages[n.id]||0)+1,delete e.challengeProgress[n.id],e.activeChallenge=null,e.challengeHint=null,e.courseStages[n.id]>=n.stages.length?(e.challenges.includes(n.id)||e.challenges.push(n.id),e.completedChallenges.includes(n.id)||e.completedChallenges.push(n.id),this.emit("challenge",{id:n.id,name:n.name})):(this.trackChallenge(n.id),this.emit("challenge-stage",{id:n.id,name:n.name,step:e.courseStages[n.id],total:n.stages.length,message:`${s.name}\u5DF2\u4EA4\u4ED8\u4E26\u4FDD\u5B58\u3002\u5F9E\u672C\u5CF6\u7684\u91D1\u74B0\u63A5\u7E8C\u4E0B\u4E00\u6BB5\uFF0C\u6216\u5148\u56DE\u4E3B\u7DDA\u3002`})),e.cargoDamage+=100-e.cargoStability,e.cargoStability=100,this._objective(),this._nearby(),this._score(),this.emit("save"),!0)}if(e.trackedHint)return this.emit("hint",{message:"\u76EE\u524D\u6B63\u524D\u5F80\u6E2C\u98A8\u9060\u5F81\u3002\u5148\u5B8C\u6210\u9060\u5F81\uFF0C\u6216\u9000\u51FA\u4E26\u8FD4\u56DE\u5B89\u5168\u5CF6\u5F8C\u4EA4\u4ED8\u4E3B\u7DDA\u3002"}),!1;let t=Pi[e.activated.length];return e.nearby.islandId===t?e.surveyHint?(this.emit("hint",{message:`\u5C1A\u7F3A\u89C0\u6E2C ${e.surveyHint.step}/${e.surveyHint.total}\uFF1A${e.surveyHint.name}\u3002\u6CBF\u91D1\u8272\u822A\u6A19\u5B8C\u6210\u5F8C\u518D\u4EA4\u4ED8\u3002`}),!1):(e.activated.length===1&&(e.cargoDamage+=100-e.cargoStability),e.cargoStability=100,e.activated.push(t),e.segmentFailures=0,Number.isFinite(e.segmentStart)&&e.routeTimes.push({mission:e.activated.length,style:e.routeStyle,seconds:e.elapsed-e.segmentStart}),e.segmentStart=e.elapsed,this.emit("station",{islandId:t,index:e.activated.length,dialogue:xe.dialogues[e.activated.length-1]}),this._objective(),this._nearby(),this._score(),this.emit("save"),!0):e.nearby.islandId==="island-camp"&&e.activated.length===3?(Number.isFinite(e.segmentStart)&&e.routeTimes.push({mission:4,style:e.routeStyle,seconds:e.elapsed-e.segmentStart}),e.status="complete",this._rating(),this.emit("complete",{rating:e.rating,score:e.score,ending:xe.ending}),this.emit("save"),!0):(this.emit("hint",{message:`\u4E0B\u4E00\u500B\u76EE\u6A19\uFF1A${e.objective.name}\u3002\u5DF2\u9EDE\u4EAE\u7684\u89C0\u6E2C\u53F0\u4E0D\u9700\u518D\u6B21\u555F\u52D5\u3002`}),!1)}_score(){let e=this.state;e.score=Math.max(0,Math.round(e.activated.length*300+e.relics.length*100+e.challenges.length*250+(e.status==="complete"?1500:0)-e.stalls*75-e.elapsed*.7))}_rating(){let e=this.state;this._score();let t=xe.relics.length,n=xe.challenges.length,r=e.relics.length>=t&&e.challenges.length>=n?"S":e.relics.length*3>=t*2?"A":e.relics.length*3>=t?"B":"C",a=e.relics.length<t?`\u518D\u627E\u51FA ${t-e.relics.length} \u4EFD\u6587\u660E\u788E\u7247`:e.challenges.length<n?`\u518D\u5B8C\u6210 ${n-e.challenges.length} \u500B\u6E2C\u98A8\u6311\u6230`:e.stalls?"\u6311\u6230\u96F6\u5931\u901F\u8FD4\u822A":"\u63DB\u4E0A\u53E6\u4E00\u500B\u6A21\u7D44\uFF0C\u6539\u5584\u822A\u7A0B\u6642\u9593";e.rating={speed:e.elapsed<480?"S":e.elapsed<720?"A":e.elapsed<1080?"B":"C",stability:e.stalls===0&&e.cargoDamage<20?"S":e.stalls<=2&&e.cargoDamage<65?"A":e.stalls<=5?"B":"C",exploration:r,assisted:e.usedAssist,next:a}}_recover(e){let t=this.state,n=Ot(t.checkpoint),s=t.activeChallenge||t.trackedHint?.id;if(t.cargoDamage+=100-t.cargoStability,t.cargoStability=100,t.activeChallenge){let r=t.activeChallenge;delete t.challengeProgress[r],t.activeChallenge=null,t.challengeHint=null,this.emit("challenge-reset",{id:r,reason:"stall",message:"\u672C\u6BB5\u6E2C\u98A8\u4E2D\u65B7\uFF1B\u5DF2\u4EA4\u4ED8\u968E\u6BB5\u4FDD\u7559\uFF0C\u56DE\u91D1\u74B0\u91CD\u8A66\u76EE\u524D\u968E\u6BB5\u3002"})}this._returnToCheckpoint(),s&&this.trackChallenge(s),t.stalls++,t.segmentFailures++,t.elapsed+=8,t.wind=[],t.hazard=null,t.lowEnergy=!1,this.emit("stall",{reason:e,islandId:n.id,penalty:8,message:`${e}\uFF0C\u5DF2\u56DE\u5230${n.name}\uFF1B\u672C\u6BB5\u52A0\u8A08 8 \u79D2\uFF0C\u788E\u7247\u4FDD\u7559\u3002`}),t.segmentFailures===3&&!t.assist&&this.emit("assist-offer",{message:"\u9019\u4E00\u6BB5\u5DF2\u5931\u901F\u4E09\u6B21\uFF0C\u53EF\u5728\u8A2D\u5B9A\u958B\u555F\u98A8\u7DDA\u8F14\u52A9\u3002"}),this._nearby(),this._score(),this.emit("save")}_collect(){let e=this.state,t=e.player;for(let c of xe.relics)!e.relics.includes(c.id)&&Ni(t,c)<c.radius&&Math.abs(t.y-c.y)<4&&(e.relics.push(c.id),this.emit("relic",{id:c.id,name:c.name,text:c.text}),this.emit("save"));if(!t.gliding)return;let n=c=>this._sampleSatisfied(c);if(!e.activeChallenge){if(e.trackedHint?.transit&&n(e.trackedHint)){let h=xe.challenges.find(f=>f.id===e.trackedHint.id);e.transitIndex++,this._trackedTarget(h)}if(!e.trackedHint&&e.surveyHint&&n(e.surveyHint)){let h=e.surveyHint;e.mainSamples[e.activated.length]++,this.emit("survey",{id:h.id,name:h.name,step:h.step,total:h.total,message:`${h.name}\u5DF2\u8A18\u9304 \xB7 ${h.step}/${h.total}`}),this._objective(),this.emit("save")}for(let h of this.suppressedChallengeEntries){let f=xe.challenges.find(m=>m.id===h),d=this.courseEntry(f);Math.hypot(t.x-d.x,t.y-d.y,t.z-d.z)>d.radius+4&&this.suppressedChallengeEntries.delete(h)}let c=xe.challenges.find(h=>e.trackedHint?.entry&&h.id===e.trackedHint.id&&!e.challenges.includes(h.id)&&!this.suppressedChallengeEntries.has(h.id)&&n(this.courseEntry(h)));if(!c)return;(e.courseStages[c.id]||0)>=(c.stages?.length||1/0)&&(e.courseStages[c.id]=0),e.activeChallenge=c.id,e.challengeProgress[c.id]=0,e.trackedHint=null,e.transitWaypoints=[],e.transitIndex=0,e.cargoDamage+=100-e.cargoStability,e.cargoStability=100,this._challengeHint(c);let u=this.courseStage(c);this.emit("challenge-start",{id:c.id,name:c.name,step:0,total:(u?.gates||c.gates).length+1,message:u?`${u.name}\uFF1A${u.description}`:c.description});return}let s=xe.challenges.find(c=>c.id===e.activeChallenge),r=this.courseStage(s),a=r?.gates||s.gates,o=e.challengeProgress[s.id],l=a[o]||(r?null:s);l&&n(l)&&(o<a.length?(e.challengeProgress[s.id]++,this.emit("challenge-gate",{id:s.id,name:s.name,step:o+1,total:a.length+1}),this._challengeHint(s)):(e.challengeProgress[s.id]=a.length+1,e.challenges.push(s.id),e.completedChallenges.includes(s.id)||e.completedChallenges.push(s.id),t.energy=Math.min(100,t.energy+15),e.activeChallenge=null,e.challengeHint=null,this.emit("challenge",{id:s.id,name:s.name}),this.emit("save")))}_sampleSatisfied(e){if(!e)return!1;let t=this.player,n=Math.hypot(t.vx,t.vz);if(Math.hypot(t.x-e.x,t.y-e.y,t.z-e.z)>=e.radius||n<(e.minSpeed||0)||n>(e.maxSpeed??1/0)||t.energy<(e.minEnergy||0)||Number.isFinite(e.maxVerticalSpeed)&&Math.abs(t.vy)>e.maxVerticalSpeed)return!1;if(e.heading){let s=Math.hypot(e.heading.x,e.heading.z);if(n<1||(t.vx*e.heading.x+t.vz*e.heading.z)/(n*s)<(e.heading.minDot??.5))return!1}return!0}_challengeHint(e){let t=this.state,n=this.courseStage(e),s=n?.gates||e.gates,r=t.challengeProgress[e.id],a=n&&r>=s.length,o=s[r]||(a?{...Ot(n.toIslandId),radius:12,instruction:"\u5B89\u5168\u843D\u5730\uFF0C\u8D70\u5230\u5CF6\u4E2D\u592E\u6309 E \u4EA4\u4ED8\u3002"}:e);t.challengeHint={...o,id:e.id,name:e.name,stageName:n?.name,stage:(t.courseStages[e.id]||0)+1,stageTotal:e.stages?.length||1,step:r+1,total:s.length+1,returning:r===s.length,landing:!!a}}step(e={},t=1/60){let n=this.state,s=n.player;if(n.status!=="running"||!Number.isFinite(t)||t<=0)return;t=Math.min(t,.1),n.elapsed+=t;let r=Mn.find(g=>g.id===n.module),a=Ui(Number(e.x)||0,-1,1),o=Ui(Number(e.z)||0,-1,1),l=Math.hypot(a,o);l>1&&(a/=l,o/=l,l=1),e.glide&&(s.grounded?(s.grounded=!1,s.gliding=!0,s.vy=15,s.y+=.15,this.emit("glide",{open:!0})):(s.gliding=!s.gliding,this.emit("glide",{open:s.gliding})));let c=s.x,u=s.z,h=s.y,f=s.vx,d=s.vz,m=Math.hypot(s.vx,s.vz),_=n.stalls;if(s.braking=!!e.brake,s.grounded)s.vx=a*10,s.vz=o*10,s.vy=0,s.energy=Math.min(100,s.energy+t*28),s.x+=s.vx*t,s.z+=s.vz*t,xe.islands.find(p=>Ni(p,s)<=p.radius-1.5&&Math.abs(s.y-p.y)<2)||(s.grounded=!1,s.gliding=!1,s.vy=0,this.emit("edge",{message:"\u5DF2\u96E2\u958B\u5CF6\u7DE3\uFF0C\u6309\u5C55\u5E06\u63A5\u4F4F\u98A8\uFF01"})),n.wind=[],n.hazard=null;else{n.airTime+=t;let g=xe.challenges.find(N=>N.id===n.activeChallenge),p=this.courseStage(g),E=(p?.winds||g?.winds||[]).filter(N=>N.gate===n.challengeProgress[g.id]),v=[...xe.winds.filter(N=>Ma(N,n)),...E].map(N=>({wind:N,weight:$h(N,s)})).filter(({weight:N})=>N>0),y=n.wind[0];n.wind=[...new Set(v.map(({wind:N})=>N.type))],n.wind[0]&&n.wind[0]!==y&&this.emit("wind",{wind:n.wind[0]});let A=0,T=0,R=0,I=0,S=0,M=l>.06?a/l:Math.sin(s.heading),P=l>.06?o/l:-Math.cos(s.heading);for(let{wind:N,weight:k}of v)if(N.type==="thermal")A=Math.max(A,Ui((N.ceiling-s.y)*.38+1.7,-1.2,N.strength)*k),T=Math.max(T,(N.charge??9)*k);else if(N.type==="tailwind"){let Q=Math.max(0,M*N.direction.x+P*N.direction.z);S=Math.max(S,N.strength*Q*k*(r.id==="tailwind"?1.75:1)),A=Math.max(A,Ui((N.ceiling-s.y)*.18+1.7,-1.2,N.liftCap??4.4)*k),T=Math.max(T,(N.charge??(N.style==="safe"?4.5:2.1))*k)}else{let Q=n.seed%1009/1009*Math.PI*2,le=Math.max(0,Math.sin(n.elapsed/N.period*Math.PI*2+Q));R+=N.direction.x*N.strength*le*k,I+=N.direction.z*N.strength*le*k}n.hazard=null;let O=0;for(let N of[...xe.hazards,...p?.hazard?[p.hazard]:g?.hazard?[g.hazard]:[]])Ni(N,s)<N.radius&&s.y>=N.y&&s.y<=N.y+N.height&&(n.hazard=N.type,N.type==="thunder"&&Math.sin(n.elapsed/N.period*Math.PI*2+n.seed%19)>.15&&(O=9));let V=s.braking?5.2:s.gliding?16.2*r.speed+S:10,$=1-Math.exp(-t*(s.braking?7:2.8*r.turn));if(s.vx+=(M*V+(s.braking?0:R)-s.vx)*$,s.vz+=(P*V+(s.braking?0:I)-s.vz)*$,s.gliding){let N=s.braking?-7:-1.75+A+(n.assist&&s.y<n.objective.y+8?3:0);s.vy+=(N-s.vy)*(1-Math.exp(-t*2));let k=l>.06&&m>5?Math.abs(s.vx/Math.max(1,m)-M)*1.5:0,Q=(3.2*r.energy+k+O)*(n.assist?.6:1);s.energy=Ui(s.energy+((s.braking?0:T)-Q)*t,0,100);let le=s.energy<=Math.max(6.4,(Q-T)*2);le&&!n.lowEnergy&&this.emit("low-energy",{message:"\u5E06\u80FD\u91CF\u4E0D\u8DB3\uFF1A\u7ACB\u5373\u9032\u5165\u71B1\u6D41\uFF0C\u6216\u6E1B\u901F\u843D\u5CF6\u3002"}),n.lowEnergy=le}else s.vy-=16*t,s.vy=Math.max(-25,s.vy);s.x+=s.vx*t,s.z+=s.vz*t,s.y+=s.vy*t;let L=xe.islands.find(N=>Ni(N,s)<=N.radius-1.5&&h>=N.y-.4&&s.y<=N.y+.1&&s.vy<=0);if(L){let N=Math.hypot(s.vx,s.vz)<8.5;Object.assign(s,{y:L.y,vy:0,grounded:!0,gliding:!1,energy:Math.min(100,s.energy+(N?20:7))}),n.checkpoint=L.id,n.lastLanding={islandId:L.id,precise:N},n.unlocked.includes(L.id)||n.unlocked.push(L.id),this.emit("land",{islandId:L.id,name:L.name,precise:N}),this.emit("save")}else for(let N of xe.islands){let k=N.y-s.y;if(k<=.1||k>=38)continue;let Q=N.radius*Math.max(.15,1-Math.max(0,k-2)/43)+.75,le=Ni(s,N);if(le>=Q)continue;let ge=le>.001?(s.x-N.x)/le:1,Ne=le>.001?(s.z-N.z)/le:0;s.x=N.x+ge*Q,s.z=N.z+Ne*Q;let We=s.vx*ge+s.vz*Ne;We<0&&(s.vx-=We*ge,s.vz-=We*Ne)}if((g?["crosswind","stability"].includes(g.kind):n.activated.length===1)&&s.gliding&&m>5){let N=Math.hypot(s.vx,s.vz),k=Math.acos(Ui((f*s.vx+d*s.vz)/Math.max(.01,m*N),-1,1))/t,Q=Math.max(0,k-.85)*4+Math.max(0,-s.vy-5)*.5;n.cargoStability=Ui(n.cargoStability-Q*t,0,100)}!s.grounded&&(s.y<-55||s.energy<=0||Math.hypot(s.x,s.z)>(xe.boundsRadius||1e3))&&this._recover(s.energy<=0?"\u5E06\u80FD\u91CF\u8017\u76E1":"\u96E2\u958B\u5B89\u5168\u822A\u57DF")}Math.hypot(s.vx,s.vz)>.5&&(s.heading=Math.atan2(s.vx,-s.vz)),n.stalls===_&&(n.distance+=Math.hypot(s.x-c,s.z-u)),this._collect(),this._nearby(),this._score()}};var Ou=0,Uc=1,Bu=2;var Nc=1,Ro=2,kn=3,Jn=0,Bt=1,yn=2,ii=0,Wi=1,Fc=2,Oc=3,Bc=4,zu=5,Mi=100,ku=101,Hu=102,Vu=103,Gu=104,Wu=200,Xu=201,$u=202,qu=203,eo=204,to=205,Yu=206,Zu=207,Ju=208,Ku=209,ju=210,Qu=211,ed=212,td=213,nd=214,Co=0,Io=1,Po=2,Xi=3,Lo=4,Do=5,Uo=6,No=7,zc=0,id=1,sd=2,si=0,rd=1,ad=2,od=3,Fo=4,ld=5,cd=6,hd=7,bc="attached",ud="detached",kc=300,es=301,ts=302,Oo=303,Bo=304,la=306,no=1e3,vi=1001,io=1002,Jt=1003,dd=1004;var ca=1005;var Tn=1006,zo=1007;var Ei=1008;var Ln=1009,Hc=1010,Vc=1011,Ws=1012,ko=1013,wi=1014,xn=1015,Xs=1016,Ho=1017,Vo=1018,$s=1020,Gc=35902,Wc=35899,Xc=1021,$c=1022,dn=1023,Is=1026,qs=1027,Go=1028,Wo=1029,qc=1030,Xo=1031;var $o=1033,ha=33776,ua=33777,da=33778,fa=33779,qo=35840,Yo=35841,Zo=35842,Jo=35843,Ko=36196,jo=37492,Qo=37496,el=37808,tl=37809,nl=37810,il=37811,sl=37812,rl=37813,al=37814,ol=37815,ll=37816,cl=37817,hl=37818,ul=37819,dl=37820,fl=37821,pl=36492,ml=36494,gl=36495,_l=36283,yl=36284,xl=36285,vl=36286,Ml=2200,fd=2201,pd=2202,Sr=2300,so=2301,Qa=2302,Hi=2400,Vi=2401,br=2402,Sl=2500,md=2501;var gd=3200,_d=3201;var Yc=0,yd=1,ri="",$t="srgb",$i="srgb-linear",Er="linear",at="srgb";var ki=7680;var Ec=519,xd=512,vd=513,Md=514,Zc=515,Sd=516,bd=517,Ed=518,wd=519,wc=35044;var Jc="300 es",wn=2e3,wr=2001;var Fn=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){let n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){let n=this._listeners;if(n===void 0)return;let s=n[e];if(s!==void 0){let r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let n=t[e.type];if(n!==void 0){e.target=this;let s=n.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,e);e.target=null}}},kt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Kh=1234567,yr=Math.PI/180,Ps=180/Math.PI;function ai(){let i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(kt[i&255]+kt[i>>8&255]+kt[i>>16&255]+kt[i>>24&255]+"-"+kt[e&255]+kt[e>>8&255]+"-"+kt[e>>16&15|64]+kt[e>>24&255]+"-"+kt[t&63|128]+kt[t>>8&255]+"-"+kt[t>>16&255]+kt[t>>24&255]+kt[n&255]+kt[n>>8&255]+kt[n>>16&255]+kt[n>>24&255]).toLowerCase()}function Je(i,e,t){return Math.max(e,Math.min(t,i))}function Kc(i,e){return(i%e+e)%e}function lp(i,e,t,n,s){return n+(i-e)*(s-n)/(t-e)}function cp(i,e,t){return i!==e?(t-i)/(e-i):0}function xr(i,e,t){return(1-t)*i+t*e}function hp(i,e,t,n){return xr(i,e,1-Math.exp(-t*n))}function up(i,e=1){return e-Math.abs(Kc(i,e*2)-e)}function dp(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*(3-2*i))}function fp(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*i*(i*(i*6-15)+10))}function pp(i,e){return i+Math.floor(Math.random()*(e-i+1))}function mp(i,e){return i+Math.random()*(e-i)}function gp(i){return i*(.5-Math.random())}function _p(i){i!==void 0&&(Kh=i);let e=Kh+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function yp(i){return i*yr}function xp(i){return i*Ps}function vp(i){return(i&i-1)===0&&i!==0}function Mp(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function Sp(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function bp(i,e,t,n,s){let r=Math.cos,a=Math.sin,o=r(t/2),l=a(t/2),c=r((e+n)/2),u=a((e+n)/2),h=r((e-n)/2),f=a((e-n)/2),d=r((n-e)/2),m=a((n-e)/2);switch(s){case"XYX":i.set(o*u,l*h,l*f,o*c);break;case"YZY":i.set(l*f,o*u,l*h,o*c);break;case"ZXZ":i.set(l*h,l*f,o*u,o*c);break;case"XZX":i.set(o*u,l*m,l*d,o*c);break;case"YXY":i.set(l*d,o*u,l*m,o*c);break;case"ZYZ":i.set(l*m,l*d,o*u,o*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function Rs(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function Xt(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}var Ys={DEG2RAD:yr,RAD2DEG:Ps,generateUUID:ai,clamp:Je,euclideanModulo:Kc,mapLinear:lp,inverseLerp:cp,lerp:xr,damp:hp,pingpong:up,smoothstep:dp,smootherstep:fp,randInt:pp,randFloat:mp,randFloatSpread:gp,seededRandom:_p,degToRad:yp,radToDeg:xp,isPowerOfTwo:vp,ceilPowerOfTwo:Mp,floorPowerOfTwo:Sp,setQuaternionFromProperEuler:bp,normalize:Xt,denormalize:Rs},fe=class i{constructor(e=0,t=0){i.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6],this.y=s[1]*t+s[4]*n+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Je(this.x,e.x,t.x),this.y=Je(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=Je(this.x,e,t),this.y=Je(this.y,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Je(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(Je(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),s=Math.sin(t),r=this.x-e.x,a=this.y-e.y;return this.x=r*n-a*s+e.x,this.y=r*s+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},qt=class{constructor(e=0,t=0,n=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=s}static slerpFlat(e,t,n,s,r,a,o){let l=n[s+0],c=n[s+1],u=n[s+2],h=n[s+3],f=r[a+0],d=r[a+1],m=r[a+2],_=r[a+3];if(o===0){e[t+0]=l,e[t+1]=c,e[t+2]=u,e[t+3]=h;return}if(o===1){e[t+0]=f,e[t+1]=d,e[t+2]=m,e[t+3]=_;return}if(h!==_||l!==f||c!==d||u!==m){let g=1-o,p=l*f+c*d+u*m+h*_,E=p>=0?1:-1,v=1-p*p;if(v>Number.EPSILON){let A=Math.sqrt(v),T=Math.atan2(A,p*E);g=Math.sin(g*T)/A,o=Math.sin(o*T)/A}let y=o*E;if(l=l*g+f*y,c=c*g+d*y,u=u*g+m*y,h=h*g+_*y,g===1-o){let A=1/Math.sqrt(l*l+c*c+u*u+h*h);l*=A,c*=A,u*=A,h*=A}}e[t]=l,e[t+1]=c,e[t+2]=u,e[t+3]=h}static multiplyQuaternionsFlat(e,t,n,s,r,a){let o=n[s],l=n[s+1],c=n[s+2],u=n[s+3],h=r[a],f=r[a+1],d=r[a+2],m=r[a+3];return e[t]=o*m+u*h+l*d-c*f,e[t+1]=l*m+u*f+c*h-o*d,e[t+2]=c*m+u*d+o*f-l*h,e[t+3]=u*m-o*h-l*f-c*d,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,s){return this._x=e,this._y=t,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,s=e._y,r=e._z,a=e._order,o=Math.cos,l=Math.sin,c=o(n/2),u=o(s/2),h=o(r/2),f=l(n/2),d=l(s/2),m=l(r/2);switch(a){case"XYZ":this._x=f*u*h+c*d*m,this._y=c*d*h-f*u*m,this._z=c*u*m+f*d*h,this._w=c*u*h-f*d*m;break;case"YXZ":this._x=f*u*h+c*d*m,this._y=c*d*h-f*u*m,this._z=c*u*m-f*d*h,this._w=c*u*h+f*d*m;break;case"ZXY":this._x=f*u*h-c*d*m,this._y=c*d*h+f*u*m,this._z=c*u*m+f*d*h,this._w=c*u*h-f*d*m;break;case"ZYX":this._x=f*u*h-c*d*m,this._y=c*d*h+f*u*m,this._z=c*u*m-f*d*h,this._w=c*u*h+f*d*m;break;case"YZX":this._x=f*u*h+c*d*m,this._y=c*d*h+f*u*m,this._z=c*u*m-f*d*h,this._w=c*u*h-f*d*m;break;case"XZY":this._x=f*u*h-c*d*m,this._y=c*d*h-f*u*m,this._z=c*u*m+f*d*h,this._w=c*u*h+f*d*m;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,s=Math.sin(n);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],s=t[4],r=t[8],a=t[1],o=t[5],l=t[9],c=t[2],u=t[6],h=t[10],f=n+o+h;if(f>0){let d=.5/Math.sqrt(f+1);this._w=.25/d,this._x=(u-l)*d,this._y=(r-c)*d,this._z=(a-s)*d}else if(n>o&&n>h){let d=2*Math.sqrt(1+n-o-h);this._w=(u-l)/d,this._x=.25*d,this._y=(s+a)/d,this._z=(r+c)/d}else if(o>h){let d=2*Math.sqrt(1+o-n-h);this._w=(r-c)/d,this._x=(s+a)/d,this._y=.25*d,this._z=(l+u)/d}else{let d=2*Math.sqrt(1+h-n-o);this._w=(a-s)/d,this._x=(r+c)/d,this._y=(l+u)/d,this._z=.25*d}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Je(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let s=Math.min(1,t/n);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,s=e._y,r=e._z,a=e._w,o=t._x,l=t._y,c=t._z,u=t._w;return this._x=n*u+a*o+s*c-r*l,this._y=s*u+a*l+r*o-n*c,this._z=r*u+a*c+n*l-s*o,this._w=a*u-n*o-s*l-r*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);let n=this._x,s=this._y,r=this._z,a=this._w,o=a*e._w+n*e._x+s*e._y+r*e._z;if(o<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,o=-o):this.copy(e),o>=1)return this._w=a,this._x=n,this._y=s,this._z=r,this;let l=1-o*o;if(l<=Number.EPSILON){let d=1-t;return this._w=d*a+t*this._w,this._x=d*n+t*this._x,this._y=d*s+t*this._y,this._z=d*r+t*this._z,this.normalize(),this}let c=Math.sqrt(l),u=Math.atan2(c,o),h=Math.sin((1-t)*u)/c,f=Math.sin(t*u)/c;return this._w=a*h+this._w*f,this._x=n*h+this._x*f,this._y=s*h+this._y*f,this._z=r*h+this._z*f,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(e),s*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},D=class i{constructor(e=0,t=0,n=0){i.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(jh.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(jh.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*s,this.y=r[1]*t+r[4]*n+r[7]*s,this.z=r[2]*t+r[5]*n+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,s=this.z,r=e.elements,a=1/(r[3]*t+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*s+r[12])*a,this.y=(r[1]*t+r[5]*n+r[9]*s+r[13])*a,this.z=(r[2]*t+r[6]*n+r[10]*s+r[14])*a,this}applyQuaternion(e){let t=this.x,n=this.y,s=this.z,r=e.x,a=e.y,o=e.z,l=e.w,c=2*(a*s-o*n),u=2*(o*t-r*s),h=2*(r*n-a*t);return this.x=t+l*c+a*h-o*u,this.y=n+l*u+o*c-r*h,this.z=s+l*h+r*u-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*s,this.y=r[1]*t+r[5]*n+r[9]*s,this.z=r[2]*t+r[6]*n+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Je(this.x,e.x,t.x),this.y=Je(this.y,e.y,t.y),this.z=Je(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=Je(this.x,e,t),this.y=Je(this.y,e,t),this.z=Je(this.z,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Je(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,s=e.y,r=e.z,a=t.x,o=t.y,l=t.z;return this.x=s*l-r*o,this.y=r*a-n*l,this.z=n*o-s*a,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return Zl.copy(this).projectOnVector(e),this.sub(Zl)}reflect(e){return this.sub(Zl.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(Je(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,s=this.z-e.z;return t*t+n*n+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let s=Math.sin(t)*e;return this.x=s*Math.sin(n),this.y=Math.cos(t)*e,this.z=s*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},Zl=new D,jh=new qt,Ge=class i{constructor(e,t,n,s,r,a,o,l,c){i.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,a,o,l,c)}set(e,t,n,s,r,a,o,l,c){let u=this.elements;return u[0]=e,u[1]=s,u[2]=o,u[3]=t,u[4]=r,u[5]=l,u[6]=n,u[7]=a,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,s=t.elements,r=this.elements,a=n[0],o=n[3],l=n[6],c=n[1],u=n[4],h=n[7],f=n[2],d=n[5],m=n[8],_=s[0],g=s[3],p=s[6],E=s[1],v=s[4],y=s[7],A=s[2],T=s[5],R=s[8];return r[0]=a*_+o*E+l*A,r[3]=a*g+o*v+l*T,r[6]=a*p+o*y+l*R,r[1]=c*_+u*E+h*A,r[4]=c*g+u*v+h*T,r[7]=c*p+u*y+h*R,r[2]=f*_+d*E+m*A,r[5]=f*g+d*v+m*T,r[8]=f*p+d*y+m*R,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8];return t*a*u-t*o*c-n*r*u+n*o*l+s*r*c-s*a*l}invert(){let e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8],h=u*a-o*c,f=o*l-u*r,d=c*r-a*l,m=t*h+n*f+s*d;if(m===0)return this.set(0,0,0,0,0,0,0,0,0);let _=1/m;return e[0]=h*_,e[1]=(s*c-u*n)*_,e[2]=(o*n-s*a)*_,e[3]=f*_,e[4]=(u*t-s*l)*_,e[5]=(s*r-o*t)*_,e[6]=d*_,e[7]=(n*l-c*t)*_,e[8]=(a*t-n*r)*_,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,s,r,a,o){let l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*a+c*o)+a+e,-s*c,s*l,-s*(-c*a+l*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(Jl.makeScale(e,t)),this}rotate(e){return this.premultiply(Jl.makeRotation(-e)),this}translate(e,t){return this.premultiply(Jl.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let s=0;s<9;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}},Jl=new Ge;function jc(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function Tr(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function Td(){let i=Tr("canvas");return i.style.display="block",i}var Qh={};function Ls(i){i in Qh||(Qh[i]=!0,console.warn(i))}function Ad(i,e,t){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:n()}}setTimeout(r,t)})}var eu=new Ge().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),tu=new Ge().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Ep(){let i={enabled:!0,workingColorSpace:$i,spaces:{},convert:function(s,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===at&&(s.r=Zn(s.r),s.g=Zn(s.g),s.b=Zn(s.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===at&&(s.r=Cs(s.r),s.g=Cs(s.g),s.b=Cs(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===ri?Er:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,a){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return Ls("THREE.ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return Ls("THREE.ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(s,r)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[$i]:{primaries:e,whitePoint:n,transfer:Er,toXYZ:eu,fromXYZ:tu,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:$t},outputColorSpaceConfig:{drawingBufferColorSpace:$t}},[$t]:{primaries:e,whitePoint:n,transfer:at,toXYZ:eu,fromXYZ:tu,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:$t}}}),i}var it=Ep();function Zn(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function Cs(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}var ms,ro=class{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{ms===void 0&&(ms=Tr("canvas")),ms.width=e.width,ms.height=e.height;let s=ms.getContext("2d");e instanceof ImageData?s.putImageData(e,0,0):s.drawImage(e,0,0,e.width,e.height),n=ms}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){let t=Tr("canvas");t.width=e.width,t.height=e.height;let n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);let s=n.getImageData(0,0,e.width,e.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=Zn(r[a]/255)*255;return n.putImageData(s,0,0),t}else if(e.data){let t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(Zn(t[n]/255)*255):t[n]=Zn(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}},wp=0,Ds=class{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:wp++}),this.uuid=ai(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):t instanceof VideoFrame?e.set(t.displayHeight,t.displayWidth,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(Kl(s[a].image)):r.push(Kl(s[a]))}else r=Kl(s);n.url=r}return t||(e.images[this.uuid]=n),n}};function Kl(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?ro.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}var Tp=0,jl=new D,Kt=class i extends Fn{constructor(e=i.DEFAULT_IMAGE,t=i.DEFAULT_MAPPING,n=vi,s=vi,r=Tn,a=Ei,o=dn,l=Ln,c=i.DEFAULT_ANISOTROPY,u=ri){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Tp++}),this.uuid=ai(),this.name="",this.source=new Ds(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new fe(0,0),this.repeat=new fe(1,1),this.center=new fe(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ge,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(jl).x}get height(){return this.source.getSize(jl).y}get depth(){return this.source.getSize(jl).z}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(let t in e){let n=e[t];if(n===void 0){console.warn(`THREE.Texture.setValues(): parameter '${t}' has value of undefined.`);continue}let s=this[t];if(s===void 0){console.warn(`THREE.Texture.setValues(): property '${t}' does not exist.`);continue}s&&n&&s.isVector2&&n.isVector2||s&&n&&s.isVector3&&n.isVector3||s&&n&&s.isMatrix3&&n.isMatrix3?s.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==kc)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case no:e.x=e.x-Math.floor(e.x);break;case vi:e.x=e.x<0?0:1;break;case io:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case no:e.y=e.y-Math.floor(e.y);break;case vi:e.y=e.y<0?0:1;break;case io:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};Kt.DEFAULT_IMAGE=null;Kt.DEFAULT_MAPPING=kc;Kt.DEFAULT_ANISOTROPY=1;var ft=class i{constructor(e=0,t=0,n=0,s=1){i.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,s){return this.x=e,this.y=t,this.z=n,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,s=this.z,r=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*s+a[12]*r,this.y=a[1]*t+a[5]*n+a[9]*s+a[13]*r,this.z=a[2]*t+a[6]*n+a[10]*s+a[14]*r,this.w=a[3]*t+a[7]*n+a[11]*s+a[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,s,r,l=e.elements,c=l[0],u=l[4],h=l[8],f=l[1],d=l[5],m=l[9],_=l[2],g=l[6],p=l[10];if(Math.abs(u-f)<.01&&Math.abs(h-_)<.01&&Math.abs(m-g)<.01){if(Math.abs(u+f)<.1&&Math.abs(h+_)<.1&&Math.abs(m+g)<.1&&Math.abs(c+d+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;let v=(c+1)/2,y=(d+1)/2,A=(p+1)/2,T=(u+f)/4,R=(h+_)/4,I=(m+g)/4;return v>y&&v>A?v<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(v),s=T/n,r=R/n):y>A?y<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(y),n=T/s,r=I/s):A<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(A),n=R/r,s=I/r),this.set(n,s,r,t),this}let E=Math.sqrt((g-m)*(g-m)+(h-_)*(h-_)+(f-u)*(f-u));return Math.abs(E)<.001&&(E=1),this.x=(g-m)/E,this.y=(h-_)/E,this.z=(f-u)/E,this.w=Math.acos((c+d+p-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Je(this.x,e.x,t.x),this.y=Je(this.y,e.y,t.y),this.z=Je(this.z,e.z,t.z),this.w=Je(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=Je(this.x,e,t),this.y=Je(this.y,e,t),this.z=Je(this.z,e,t),this.w=Je(this.w,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Je(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},ao=class extends Fn{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Tn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new ft(0,0,e,t),this.scissorTest=!1,this.viewport=new ft(0,0,e,t);let s={width:e,height:t,depth:n.depth},r=new Kt(s);this.textures=[];let a=n.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview}_setTextureOptions(e={}){let t={minFilter:Tn,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=n,this.textures[s].isArrayTexture=this.textures[s].image.depth>1;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let s=Object.assign({},e.textures[t].image);this.textures[t].source=new Ds(s)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}},On=class extends ao{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}},Ar=class extends Kt{constructor(e=null,t=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=Jt,this.minFilter=Jt,this.wrapR=vi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}};var oo=class extends Kt{constructor(e=null,t=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=Jt,this.minFilter=Jt,this.wrapR=vi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var An=class{constructor(e=new D(1/0,1/0,1/0),t=new D(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(Sn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(Sn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=Sn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,Sn):Sn.fromBufferAttribute(r,a),Sn.applyMatrix4(e.matrixWorld),this.expandByPoint(Sn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),wa.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),wa.copy(n.boundingBox)),wa.applyMatrix4(e.matrixWorld),this.union(wa)}let s=e.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Sn),Sn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(hr),Ta.subVectors(this.max,hr),gs.subVectors(e.a,hr),_s.subVectors(e.b,hr),ys.subVectors(e.c,hr),fi.subVectors(_s,gs),pi.subVectors(ys,_s),Fi.subVectors(gs,ys);let t=[0,-fi.z,fi.y,0,-pi.z,pi.y,0,-Fi.z,Fi.y,fi.z,0,-fi.x,pi.z,0,-pi.x,Fi.z,0,-Fi.x,-fi.y,fi.x,0,-pi.y,pi.x,0,-Fi.y,Fi.x,0];return!Ql(t,gs,_s,ys,Ta)||(t=[1,0,0,0,1,0,0,0,1],!Ql(t,gs,_s,ys,Ta))?!1:(Aa.crossVectors(fi,pi),t=[Aa.x,Aa.y,Aa.z],Ql(t,gs,_s,ys,Ta))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Sn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Sn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Wn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Wn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Wn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Wn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Wn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Wn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Wn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Wn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Wn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},Wn=[new D,new D,new D,new D,new D,new D,new D,new D],Sn=new D,wa=new An,gs=new D,_s=new D,ys=new D,fi=new D,pi=new D,Fi=new D,hr=new D,Ta=new D,Aa=new D,Oi=new D;function Ql(i,e,t,n,s){for(let r=0,a=i.length-3;r<=a;r+=3){Oi.fromArray(i,r);let o=s.x*Math.abs(Oi.x)+s.y*Math.abs(Oi.y)+s.z*Math.abs(Oi.z),l=e.dot(Oi),c=t.dot(Oi),u=n.dot(Oi);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>o)return!1}return!0}var Ap=new An,ur=new D,ec=new D,_n=class{constructor(e=new D,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t!==void 0?n.copy(t):Ap.setFromPoints(e).getCenter(n);let s=0;for(let r=0,a=e.length;r<a;r++)s=Math.max(s,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;ur.subVectors(e,this.center);let t=ur.lengthSq();if(t>this.radius*this.radius){let n=Math.sqrt(t),s=(n-this.radius)*.5;this.center.addScaledVector(ur,s/n),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(ec.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(ur.copy(e.center).add(ec)),this.expandByPoint(ur.copy(e.center).sub(ec))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},Xn=new D,tc=new D,Ra=new D,mi=new D,nc=new D,Ca=new D,ic=new D,Si=class{constructor(e=new D,t=new D(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Xn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=Xn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Xn.copy(this.origin).addScaledVector(this.direction,t),Xn.distanceToSquared(e))}distanceSqToSegment(e,t,n,s){tc.copy(e).add(t).multiplyScalar(.5),Ra.copy(t).sub(e).normalize(),mi.copy(this.origin).sub(tc);let r=e.distanceTo(t)*.5,a=-this.direction.dot(Ra),o=mi.dot(this.direction),l=-mi.dot(Ra),c=mi.lengthSq(),u=Math.abs(1-a*a),h,f,d,m;if(u>0)if(h=a*l-o,f=a*o-l,m=r*u,h>=0)if(f>=-m)if(f<=m){let _=1/u;h*=_,f*=_,d=h*(h+a*f+2*o)+f*(a*h+f+2*l)+c}else f=r,h=Math.max(0,-(a*f+o)),d=-h*h+f*(f+2*l)+c;else f=-r,h=Math.max(0,-(a*f+o)),d=-h*h+f*(f+2*l)+c;else f<=-m?(h=Math.max(0,-(-a*r+o)),f=h>0?-r:Math.min(Math.max(-r,-l),r),d=-h*h+f*(f+2*l)+c):f<=m?(h=0,f=Math.min(Math.max(-r,-l),r),d=f*(f+2*l)+c):(h=Math.max(0,-(a*r+o)),f=h>0?r:Math.min(Math.max(-r,-l),r),d=-h*h+f*(f+2*l)+c);else f=a>0?-r:r,h=Math.max(0,-(a*f+o)),d=-h*h+f*(f+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,h),s&&s.copy(tc).addScaledVector(Ra,f),d}intersectSphere(e,t){Xn.subVectors(e.center,this.origin);let n=Xn.dot(this.direction),s=Xn.dot(Xn)-n*n,r=e.radius*e.radius;if(s>r)return null;let a=Math.sqrt(r-s),o=n-a,l=n+a;return l<0?null:o<0?this.at(l,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,s,r,a,o,l,c=1/this.direction.x,u=1/this.direction.y,h=1/this.direction.z,f=this.origin;return c>=0?(n=(e.min.x-f.x)*c,s=(e.max.x-f.x)*c):(n=(e.max.x-f.x)*c,s=(e.min.x-f.x)*c),u>=0?(r=(e.min.y-f.y)*u,a=(e.max.y-f.y)*u):(r=(e.max.y-f.y)*u,a=(e.min.y-f.y)*u),n>a||r>s||((r>n||isNaN(n))&&(n=r),(a<s||isNaN(s))&&(s=a),h>=0?(o=(e.min.z-f.z)*h,l=(e.max.z-f.z)*h):(o=(e.max.z-f.z)*h,l=(e.min.z-f.z)*h),n>l||o>s)||((o>n||n!==n)&&(n=o),(l<s||s!==s)&&(s=l),s<0)?null:this.at(n>=0?n:s,t)}intersectsBox(e){return this.intersectBox(e,Xn)!==null}intersectTriangle(e,t,n,s,r){nc.subVectors(t,e),Ca.subVectors(n,e),ic.crossVectors(nc,Ca);let a=this.direction.dot(ic),o;if(a>0){if(s)return null;o=1}else if(a<0)o=-1,a=-a;else return null;mi.subVectors(this.origin,e);let l=o*this.direction.dot(Ca.crossVectors(mi,Ca));if(l<0)return null;let c=o*this.direction.dot(nc.cross(mi));if(c<0||l+c>a)return null;let u=-o*mi.dot(ic);return u<0?null:this.at(u/a,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},Ye=class i{constructor(e,t,n,s,r,a,o,l,c,u,h,f,d,m,_,g){i.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,a,o,l,c,u,h,f,d,m,_,g)}set(e,t,n,s,r,a,o,l,c,u,h,f,d,m,_,g){let p=this.elements;return p[0]=e,p[4]=t,p[8]=n,p[12]=s,p[1]=r,p[5]=a,p[9]=o,p[13]=l,p[2]=c,p[6]=u,p[10]=h,p[14]=f,p[3]=d,p[7]=m,p[11]=_,p[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new i().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){let t=this.elements,n=e.elements,s=1/xs.setFromMatrixColumn(e,0).length(),r=1/xs.setFromMatrixColumn(e,1).length(),a=1/xs.setFromMatrixColumn(e,2).length();return t[0]=n[0]*s,t[1]=n[1]*s,t[2]=n[2]*s,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,s=e.y,r=e.z,a=Math.cos(n),o=Math.sin(n),l=Math.cos(s),c=Math.sin(s),u=Math.cos(r),h=Math.sin(r);if(e.order==="XYZ"){let f=a*u,d=a*h,m=o*u,_=o*h;t[0]=l*u,t[4]=-l*h,t[8]=c,t[1]=d+m*c,t[5]=f-_*c,t[9]=-o*l,t[2]=_-f*c,t[6]=m+d*c,t[10]=a*l}else if(e.order==="YXZ"){let f=l*u,d=l*h,m=c*u,_=c*h;t[0]=f+_*o,t[4]=m*o-d,t[8]=a*c,t[1]=a*h,t[5]=a*u,t[9]=-o,t[2]=d*o-m,t[6]=_+f*o,t[10]=a*l}else if(e.order==="ZXY"){let f=l*u,d=l*h,m=c*u,_=c*h;t[0]=f-_*o,t[4]=-a*h,t[8]=m+d*o,t[1]=d+m*o,t[5]=a*u,t[9]=_-f*o,t[2]=-a*c,t[6]=o,t[10]=a*l}else if(e.order==="ZYX"){let f=a*u,d=a*h,m=o*u,_=o*h;t[0]=l*u,t[4]=m*c-d,t[8]=f*c+_,t[1]=l*h,t[5]=_*c+f,t[9]=d*c-m,t[2]=-c,t[6]=o*l,t[10]=a*l}else if(e.order==="YZX"){let f=a*l,d=a*c,m=o*l,_=o*c;t[0]=l*u,t[4]=_-f*h,t[8]=m*h+d,t[1]=h,t[5]=a*u,t[9]=-o*u,t[2]=-c*u,t[6]=d*h+m,t[10]=f-_*h}else if(e.order==="XZY"){let f=a*l,d=a*c,m=o*l,_=o*c;t[0]=l*u,t[4]=-h,t[8]=c*u,t[1]=f*h+_,t[5]=a*u,t[9]=d*h-m,t[2]=m*h-d,t[6]=o*u,t[10]=_*h+f}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Rp,e,Cp)}lookAt(e,t,n){let s=this.elements;return rn.subVectors(e,t),rn.lengthSq()===0&&(rn.z=1),rn.normalize(),gi.crossVectors(n,rn),gi.lengthSq()===0&&(Math.abs(n.z)===1?rn.x+=1e-4:rn.z+=1e-4,rn.normalize(),gi.crossVectors(n,rn)),gi.normalize(),Ia.crossVectors(rn,gi),s[0]=gi.x,s[4]=Ia.x,s[8]=rn.x,s[1]=gi.y,s[5]=Ia.y,s[9]=rn.y,s[2]=gi.z,s[6]=Ia.z,s[10]=rn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,s=t.elements,r=this.elements,a=n[0],o=n[4],l=n[8],c=n[12],u=n[1],h=n[5],f=n[9],d=n[13],m=n[2],_=n[6],g=n[10],p=n[14],E=n[3],v=n[7],y=n[11],A=n[15],T=s[0],R=s[4],I=s[8],S=s[12],M=s[1],P=s[5],O=s[9],V=s[13],$=s[2],L=s[6],H=s[10],N=s[14],k=s[3],Q=s[7],le=s[11],ge=s[15];return r[0]=a*T+o*M+l*$+c*k,r[4]=a*R+o*P+l*L+c*Q,r[8]=a*I+o*O+l*H+c*le,r[12]=a*S+o*V+l*N+c*ge,r[1]=u*T+h*M+f*$+d*k,r[5]=u*R+h*P+f*L+d*Q,r[9]=u*I+h*O+f*H+d*le,r[13]=u*S+h*V+f*N+d*ge,r[2]=m*T+_*M+g*$+p*k,r[6]=m*R+_*P+g*L+p*Q,r[10]=m*I+_*O+g*H+p*le,r[14]=m*S+_*V+g*N+p*ge,r[3]=E*T+v*M+y*$+A*k,r[7]=E*R+v*P+y*L+A*Q,r[11]=E*I+v*O+y*H+A*le,r[15]=E*S+v*V+y*N+A*ge,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],s=e[8],r=e[12],a=e[1],o=e[5],l=e[9],c=e[13],u=e[2],h=e[6],f=e[10],d=e[14],m=e[3],_=e[7],g=e[11],p=e[15];return m*(+r*l*h-s*c*h-r*o*f+n*c*f+s*o*d-n*l*d)+_*(+t*l*d-t*c*f+r*a*f-s*a*d+s*c*u-r*l*u)+g*(+t*c*h-t*o*d-r*a*h+n*a*d+r*o*u-n*c*u)+p*(-s*o*u-t*l*h+t*o*f+s*a*h-n*a*f+n*l*u)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8],h=e[9],f=e[10],d=e[11],m=e[12],_=e[13],g=e[14],p=e[15],E=h*g*c-_*f*c+_*l*d-o*g*d-h*l*p+o*f*p,v=m*f*c-u*g*c-m*l*d+a*g*d+u*l*p-a*f*p,y=u*_*c-m*h*c+m*o*d-a*_*d-u*o*p+a*h*p,A=m*h*l-u*_*l-m*o*f+a*_*f+u*o*g-a*h*g,T=t*E+n*v+s*y+r*A;if(T===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let R=1/T;return e[0]=E*R,e[1]=(_*f*r-h*g*r-_*s*d+n*g*d+h*s*p-n*f*p)*R,e[2]=(o*g*r-_*l*r+_*s*c-n*g*c-o*s*p+n*l*p)*R,e[3]=(h*l*r-o*f*r-h*s*c+n*f*c+o*s*d-n*l*d)*R,e[4]=v*R,e[5]=(u*g*r-m*f*r+m*s*d-t*g*d-u*s*p+t*f*p)*R,e[6]=(m*l*r-a*g*r-m*s*c+t*g*c+a*s*p-t*l*p)*R,e[7]=(a*f*r-u*l*r+u*s*c-t*f*c-a*s*d+t*l*d)*R,e[8]=y*R,e[9]=(m*h*r-u*_*r-m*n*d+t*_*d+u*n*p-t*h*p)*R,e[10]=(a*_*r-m*o*r+m*n*c-t*_*c-a*n*p+t*o*p)*R,e[11]=(u*o*r-a*h*r-u*n*c+t*h*c+a*n*d-t*o*d)*R,e[12]=A*R,e[13]=(u*_*s-m*h*s+m*n*f-t*_*f-u*n*g+t*h*g)*R,e[14]=(m*o*s-a*_*s-m*n*l+t*_*l+a*n*g-t*o*g)*R,e[15]=(a*h*s-u*o*s+u*n*l-t*h*l-a*n*f+t*o*f)*R,this}scale(e){let t=this.elements,n=e.x,s=e.y,r=e.z;return t[0]*=n,t[4]*=s,t[8]*=r,t[1]*=n,t[5]*=s,t[9]*=r,t[2]*=n,t[6]*=s,t[10]*=r,t[3]*=n,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,s))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),s=Math.sin(t),r=1-n,a=e.x,o=e.y,l=e.z,c=r*a,u=r*o;return this.set(c*a+n,c*o-s*l,c*l+s*o,0,c*o+s*l,u*o+n,u*l-s*a,0,c*l-s*o,u*l+s*a,r*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,s,r,a){return this.set(1,n,r,0,e,1,a,0,t,s,1,0,0,0,0,1),this}compose(e,t,n){let s=this.elements,r=t._x,a=t._y,o=t._z,l=t._w,c=r+r,u=a+a,h=o+o,f=r*c,d=r*u,m=r*h,_=a*u,g=a*h,p=o*h,E=l*c,v=l*u,y=l*h,A=n.x,T=n.y,R=n.z;return s[0]=(1-(_+p))*A,s[1]=(d+y)*A,s[2]=(m-v)*A,s[3]=0,s[4]=(d-y)*T,s[5]=(1-(f+p))*T,s[6]=(g+E)*T,s[7]=0,s[8]=(m+v)*R,s[9]=(g-E)*R,s[10]=(1-(f+_))*R,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,n){let s=this.elements,r=xs.set(s[0],s[1],s[2]).length(),a=xs.set(s[4],s[5],s[6]).length(),o=xs.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),e.x=s[12],e.y=s[13],e.z=s[14],bn.copy(this);let c=1/r,u=1/a,h=1/o;return bn.elements[0]*=c,bn.elements[1]*=c,bn.elements[2]*=c,bn.elements[4]*=u,bn.elements[5]*=u,bn.elements[6]*=u,bn.elements[8]*=h,bn.elements[9]*=h,bn.elements[10]*=h,t.setFromRotationMatrix(bn),n.x=r,n.y=a,n.z=o,this}makePerspective(e,t,n,s,r,a,o=wn,l=!1){let c=this.elements,u=2*r/(t-e),h=2*r/(n-s),f=(t+e)/(t-e),d=(n+s)/(n-s),m,_;if(l)m=r/(a-r),_=a*r/(a-r);else if(o===wn)m=-(a+r)/(a-r),_=-2*a*r/(a-r);else if(o===wr)m=-a/(a-r),_=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=u,c[4]=0,c[8]=f,c[12]=0,c[1]=0,c[5]=h,c[9]=d,c[13]=0,c[2]=0,c[6]=0,c[10]=m,c[14]=_,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,s,r,a,o=wn,l=!1){let c=this.elements,u=2/(t-e),h=2/(n-s),f=-(t+e)/(t-e),d=-(n+s)/(n-s),m,_;if(l)m=1/(a-r),_=a/(a-r);else if(o===wn)m=-2/(a-r),_=-(a+r)/(a-r);else if(o===wr)m=-1/(a-r),_=-r/(a-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=u,c[4]=0,c[8]=0,c[12]=f,c[1]=0,c[5]=h,c[9]=0,c[13]=d,c[2]=0,c[6]=0,c[10]=m,c[14]=_,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let s=0;s<16;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}},xs=new D,bn=new Ye,Rp=new D(0,0,0),Cp=new D(1,1,1),gi=new D,Ia=new D,rn=new D,nu=new Ye,iu=new qt,on=class i{constructor(e=0,t=0,n=0,s=i.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,s=this._order){return this._x=e,this._y=t,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let s=e.elements,r=s[0],a=s[4],o=s[8],l=s[1],c=s[5],u=s[9],h=s[2],f=s[6],d=s[10];switch(t){case"XYZ":this._y=Math.asin(Je(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-u,d),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(f,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Je(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(o,d),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-h,r),this._z=0);break;case"ZXY":this._x=Math.asin(Je(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-h,d),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-Je(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(f,d),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(Je(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-h,r)):(this._x=0,this._y=Math.atan2(o,d));break;case"XZY":this._z=Math.asin(-Je(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(f,c),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-u,d),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return nu.makeRotationFromQuaternion(e),this.setFromRotationMatrix(nu,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return iu.setFromEuler(this),this.setFromQuaternion(iu,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};on.DEFAULT_ORDER="XYZ";var Us=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}},Ip=0,su=new D,vs=new qt,$n=new Ye,Pa=new D,dr=new D,Pp=new D,Lp=new qt,ru=new D(1,0,0),au=new D(0,1,0),ou=new D(0,0,1),lu={type:"added"},Dp={type:"removed"},Ms={type:"childadded",child:null},sc={type:"childremoved",child:null},pt=class i extends Fn{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Ip++}),this.uuid=ai(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=i.DEFAULT_UP.clone();let e=new D,t=new on,n=new qt,s=new D(1,1,1);function r(){n.setFromEuler(t,!1)}function a(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new Ye},normalMatrix:{value:new Ge}}),this.matrix=new Ye,this.matrixWorld=new Ye,this.matrixAutoUpdate=i.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=i.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Us,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return vs.setFromAxisAngle(e,t),this.quaternion.multiply(vs),this}rotateOnWorldAxis(e,t){return vs.setFromAxisAngle(e,t),this.quaternion.premultiply(vs),this}rotateX(e){return this.rotateOnAxis(ru,e)}rotateY(e){return this.rotateOnAxis(au,e)}rotateZ(e){return this.rotateOnAxis(ou,e)}translateOnAxis(e,t){return su.copy(e).applyQuaternion(this.quaternion),this.position.add(su.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(ru,e)}translateY(e){return this.translateOnAxis(au,e)}translateZ(e){return this.translateOnAxis(ou,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4($n.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?Pa.copy(e):Pa.set(e,t,n);let s=this.parent;this.updateWorldMatrix(!0,!1),dr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?$n.lookAt(dr,Pa,this.up):$n.lookAt(Pa,dr,this.up),this.quaternion.setFromRotationMatrix($n),s&&($n.extractRotation(s.matrixWorld),vs.setFromRotationMatrix($n),this.quaternion.premultiply(vs.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(lu),Ms.child=e,this.dispatchEvent(Ms),Ms.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Dp),sc.child=e,this.dispatchEvent(sc),sc.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),$n.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),$n.multiply(e.parent.matrixWorld)),e.applyMatrix4($n),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(lu),Ms.child=e,this.dispatchEvent(Ms),Ms.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,s=this.children.length;n<s;n++){let a=this.children[n].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(dr,e,Pp),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(dr,Lp,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);let t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){let n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){let s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(e){let t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(o=>({...o})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(e),s.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);let o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){let l=o.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){let h=l[c];r(e.shapes,h)}else r(e.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(r(e.materials,this.material[l]));s.material=o}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){let l=this.animations[o];s.animations.push(r(e.animations,l))}}if(t){let o=a(e.geometries),l=a(e.materials),c=a(e.textures),u=a(e.images),h=a(e.shapes),f=a(e.skeletons),d=a(e.animations),m=a(e.nodes);o.length>0&&(n.geometries=o),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),u.length>0&&(n.images=u),h.length>0&&(n.shapes=h),f.length>0&&(n.skeletons=f),d.length>0&&(n.animations=d),m.length>0&&(n.nodes=m)}return n.object=s,n;function a(o){let l=[];for(let c in o){let u=o[c];delete u.metadata,l.push(u)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){let s=e.children[n];this.add(s.clone())}return this}};pt.DEFAULT_UP=new D(0,1,0);pt.DEFAULT_MATRIX_AUTO_UPDATE=!0;pt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var En=new D,qn=new D,rc=new D,Yn=new D,Ss=new D,bs=new D,cu=new D,ac=new D,oc=new D,lc=new D,cc=new ft,hc=new ft,uc=new ft,xi=class i{constructor(e=new D,t=new D,n=new D){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,s){s.subVectors(n,t),En.subVectors(e,t),s.cross(En);let r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,n,s,r){En.subVectors(s,t),qn.subVectors(n,t),rc.subVectors(e,t);let a=En.dot(En),o=En.dot(qn),l=En.dot(rc),c=qn.dot(qn),u=qn.dot(rc),h=a*c-o*o;if(h===0)return r.set(0,0,0),null;let f=1/h,d=(c*l-o*u)*f,m=(a*u-o*l)*f;return r.set(1-d-m,m,d)}static containsPoint(e,t,n,s){return this.getBarycoord(e,t,n,s,Yn)===null?!1:Yn.x>=0&&Yn.y>=0&&Yn.x+Yn.y<=1}static getInterpolation(e,t,n,s,r,a,o,l){return this.getBarycoord(e,t,n,s,Yn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,Yn.x),l.addScaledVector(a,Yn.y),l.addScaledVector(o,Yn.z),l)}static getInterpolatedAttribute(e,t,n,s,r,a){return cc.setScalar(0),hc.setScalar(0),uc.setScalar(0),cc.fromBufferAttribute(e,t),hc.fromBufferAttribute(e,n),uc.fromBufferAttribute(e,s),a.setScalar(0),a.addScaledVector(cc,r.x),a.addScaledVector(hc,r.y),a.addScaledVector(uc,r.z),a}static isFrontFacing(e,t,n,s){return En.subVectors(n,t),qn.subVectors(e,t),En.cross(qn).dot(s)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,s){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,n,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return En.subVectors(this.c,this.b),qn.subVectors(this.a,this.b),En.cross(qn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return i.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return i.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,s,r){return i.getInterpolation(e,this.a,this.b,this.c,t,n,s,r)}containsPoint(e){return i.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return i.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,s=this.b,r=this.c,a,o;Ss.subVectors(s,n),bs.subVectors(r,n),ac.subVectors(e,n);let l=Ss.dot(ac),c=bs.dot(ac);if(l<=0&&c<=0)return t.copy(n);oc.subVectors(e,s);let u=Ss.dot(oc),h=bs.dot(oc);if(u>=0&&h<=u)return t.copy(s);let f=l*h-u*c;if(f<=0&&l>=0&&u<=0)return a=l/(l-u),t.copy(n).addScaledVector(Ss,a);lc.subVectors(e,r);let d=Ss.dot(lc),m=bs.dot(lc);if(m>=0&&d<=m)return t.copy(r);let _=d*c-l*m;if(_<=0&&c>=0&&m<=0)return o=c/(c-m),t.copy(n).addScaledVector(bs,o);let g=u*m-d*h;if(g<=0&&h-u>=0&&d-m>=0)return cu.subVectors(r,s),o=(h-u)/(h-u+(d-m)),t.copy(s).addScaledVector(cu,o);let p=1/(g+_+f);return a=_*p,o=f*p,t.copy(n).addScaledVector(Ss,a).addScaledVector(bs,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},Rd={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},_i={h:0,s:0,l:0},La={h:0,s:0,l:0};function dc(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}var ke=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=$t){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,it.colorSpaceToWorking(this,t),this}setRGB(e,t,n,s=it.workingColorSpace){return this.r=e,this.g=t,this.b=n,it.colorSpaceToWorking(this,s),this}setHSL(e,t,n,s=it.workingColorSpace){if(e=Kc(e,1),t=Je(t,0,1),n=Je(n,0,1),t===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+t):n+t-n*t,a=2*n-r;this.r=dc(a,r,e+1/3),this.g=dc(a,r,e),this.b=dc(a,r,e-1/3)}return it.colorSpaceToWorking(this,s),this}setStyle(e,t=$t){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r,a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){let r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(r,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=$t){let n=Rd[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Zn(e.r),this.g=Zn(e.g),this.b=Zn(e.b),this}copyLinearToSRGB(e){return this.r=Cs(e.r),this.g=Cs(e.g),this.b=Cs(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=$t){return it.workingToColorSpace(Ht.copy(this),e),Math.round(Je(Ht.r*255,0,255))*65536+Math.round(Je(Ht.g*255,0,255))*256+Math.round(Je(Ht.b*255,0,255))}getHexString(e=$t){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=it.workingColorSpace){it.workingToColorSpace(Ht.copy(this),t);let n=Ht.r,s=Ht.g,r=Ht.b,a=Math.max(n,s,r),o=Math.min(n,s,r),l,c,u=(o+a)/2;if(o===a)l=0,c=0;else{let h=a-o;switch(c=u<=.5?h/(a+o):h/(2-a-o),a){case n:l=(s-r)/h+(s<r?6:0);break;case s:l=(r-n)/h+2;break;case r:l=(n-s)/h+4;break}l/=6}return e.h=l,e.s=c,e.l=u,e}getRGB(e,t=it.workingColorSpace){return it.workingToColorSpace(Ht.copy(this),t),e.r=Ht.r,e.g=Ht.g,e.b=Ht.b,e}getStyle(e=$t){it.workingToColorSpace(Ht.copy(this),e);let t=Ht.r,n=Ht.g,s=Ht.b;return e!==$t?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(e,t,n){return this.getHSL(_i),this.setHSL(_i.h+e,_i.s+t,_i.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(_i),e.getHSL(La);let n=xr(_i.h,La.h,t),s=xr(_i.s,La.s,t),r=xr(_i.l,La.l,t);return this.setHSL(n,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*s,this.g=r[1]*t+r[4]*n+r[7]*s,this.b=r[2]*t+r[5]*n+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},Ht=new ke;ke.NAMES=Rd;var Up=0,Bn=class extends Fn{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Up++}),this.uuid=ai(),this.name="",this.type="Material",this.blending=Wi,this.side=Jn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=eo,this.blendDst=to,this.blendEquation=Mi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new ke(0,0,0),this.blendAlpha=0,this.depthFunc=Xi,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Ec,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=ki,this.stencilZFail=ki,this.stencilZPass=ki,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}let s=this[t];if(s===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});let n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Wi&&(n.blending=this.blending),this.side!==Jn&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==eo&&(n.blendSrc=this.blendSrc),this.blendDst!==to&&(n.blendDst=this.blendDst),this.blendEquation!==Mi&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Xi&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Ec&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==ki&&(n.stencilFail=this.stencilFail),this.stencilZFail!==ki&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==ki&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){let a=[];for(let o in r){let l=r[o];delete l.metadata,a.push(l)}return a}if(t){let r=s(e.textures),a=s(e.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let s=t.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}},ln=class extends Bn{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new ke(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new on,this.combine=zc,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}};var At=new D,Da=new fe,Np=0,wt=class{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Np++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=wc,this.updateRanges=[],this.gpuType=xn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[n+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)Da.fromBufferAttribute(this,t),Da.applyMatrix3(e),this.setXY(t,Da.x,Da.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)At.fromBufferAttribute(this,t),At.applyMatrix3(e),this.setXYZ(t,At.x,At.y,At.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)At.fromBufferAttribute(this,t),At.applyMatrix4(e),this.setXYZ(t,At.x,At.y,At.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)At.fromBufferAttribute(this,t),At.applyNormalMatrix(e),this.setXYZ(t,At.x,At.y,At.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)At.fromBufferAttribute(this,t),At.transformDirection(e),this.setXYZ(t,At.x,At.y,At.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=Rs(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Xt(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Rs(t,this.array)),t}setX(e,t){return this.normalized&&(t=Xt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Rs(t,this.array)),t}setY(e,t){return this.normalized&&(t=Xt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Rs(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Xt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Rs(t,this.array)),t}setW(e,t){return this.normalized&&(t=Xt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=Xt(t,this.array),n=Xt(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,s){return e*=this.itemSize,this.normalized&&(t=Xt(t,this.array),n=Xt(n,this.array),s=Xt(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e*=this.itemSize,this.normalized&&(t=Xt(t,this.array),n=Xt(n,this.array),s=Xt(s,this.array),r=Xt(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==wc&&(e.usage=this.usage),e}};var Rr=class extends wt{constructor(e,t,n){super(new Uint16Array(e),t,n)}};var Cr=class extends wt{constructor(e,t,n){super(new Uint32Array(e),t,n)}};var tt=class extends wt{constructor(e,t,n){super(new Float32Array(e),t,n)}},Fp=0,gn=new Ye,fc=new pt,Es=new D,an=new An,fr=new An,Ut=new D,gt=class i extends Fn{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Fp++}),this.uuid=ai(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(jc(e)?Cr:Rr)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let r=new Ge().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}let s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return gn.makeRotationFromQuaternion(e),this.applyMatrix4(gn),this}rotateX(e){return gn.makeRotationX(e),this.applyMatrix4(gn),this}rotateY(e){return gn.makeRotationY(e),this.applyMatrix4(gn),this}rotateZ(e){return gn.makeRotationZ(e),this.applyMatrix4(gn),this}translate(e,t,n){return gn.makeTranslation(e,t,n),this.applyMatrix4(gn),this}scale(e,t,n){return gn.makeScale(e,t,n),this.applyMatrix4(gn),this}lookAt(e){return fc.lookAt(e),fc.updateMatrix(),this.applyMatrix4(fc.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Es).negate(),this.translate(Es.x,Es.y,Es.z),this}setFromPoints(e){let t=this.getAttribute("position");if(t===void 0){let n=[];for(let s=0,r=e.length;s<r;s++){let a=e[s];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new tt(n,3))}else{let n=Math.min(e.length,t.count);for(let s=0;s<n;s++){let r=e[s];t.setXYZ(s,r.x,r.y,r.z||0)}e.length>t.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new An);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new D(-1/0,-1/0,-1/0),new D(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,s=t.length;n<s;n++){let r=t[n];an.setFromBufferAttribute(r),this.morphTargetsRelative?(Ut.addVectors(this.boundingBox.min,an.min),this.boundingBox.expandByPoint(Ut),Ut.addVectors(this.boundingBox.max,an.max),this.boundingBox.expandByPoint(Ut)):(this.boundingBox.expandByPoint(an.min),this.boundingBox.expandByPoint(an.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new _n);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new D,1/0);return}if(e){let n=this.boundingSphere.center;if(an.setFromBufferAttribute(e),t)for(let r=0,a=t.length;r<a;r++){let o=t[r];fr.setFromBufferAttribute(o),this.morphTargetsRelative?(Ut.addVectors(an.min,fr.min),an.expandByPoint(Ut),Ut.addVectors(an.max,fr.max),an.expandByPoint(Ut)):(an.expandByPoint(fr.min),an.expandByPoint(fr.max))}an.getCenter(n);let s=0;for(let r=0,a=e.count;r<a;r++)Ut.fromBufferAttribute(e,r),s=Math.max(s,n.distanceToSquared(Ut));if(t)for(let r=0,a=t.length;r<a;r++){let o=t[r],l=this.morphTargetsRelative;for(let c=0,u=o.count;c<u;c++)Ut.fromBufferAttribute(o,c),l&&(Es.fromBufferAttribute(e,c),Ut.add(Es)),s=Math.max(s,n.distanceToSquared(Ut))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=t.position,s=t.normal,r=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new wt(new Float32Array(4*n.count),4));let a=this.getAttribute("tangent"),o=[],l=[];for(let I=0;I<n.count;I++)o[I]=new D,l[I]=new D;let c=new D,u=new D,h=new D,f=new fe,d=new fe,m=new fe,_=new D,g=new D;function p(I,S,M){c.fromBufferAttribute(n,I),u.fromBufferAttribute(n,S),h.fromBufferAttribute(n,M),f.fromBufferAttribute(r,I),d.fromBufferAttribute(r,S),m.fromBufferAttribute(r,M),u.sub(c),h.sub(c),d.sub(f),m.sub(f);let P=1/(d.x*m.y-m.x*d.y);isFinite(P)&&(_.copy(u).multiplyScalar(m.y).addScaledVector(h,-d.y).multiplyScalar(P),g.copy(h).multiplyScalar(d.x).addScaledVector(u,-m.x).multiplyScalar(P),o[I].add(_),o[S].add(_),o[M].add(_),l[I].add(g),l[S].add(g),l[M].add(g))}let E=this.groups;E.length===0&&(E=[{start:0,count:e.count}]);for(let I=0,S=E.length;I<S;++I){let M=E[I],P=M.start,O=M.count;for(let V=P,$=P+O;V<$;V+=3)p(e.getX(V+0),e.getX(V+1),e.getX(V+2))}let v=new D,y=new D,A=new D,T=new D;function R(I){A.fromBufferAttribute(s,I),T.copy(A);let S=o[I];v.copy(S),v.sub(A.multiplyScalar(A.dot(S))).normalize(),y.crossVectors(T,S);let P=y.dot(l[I])<0?-1:1;a.setXYZW(I,v.x,v.y,v.z,P)}for(let I=0,S=E.length;I<S;++I){let M=E[I],P=M.start,O=M.count;for(let V=P,$=P+O;V<$;V+=3)R(e.getX(V+0)),R(e.getX(V+1)),R(e.getX(V+2))}}computeVertexNormals(){let e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new wt(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let f=0,d=n.count;f<d;f++)n.setXYZ(f,0,0,0);let s=new D,r=new D,a=new D,o=new D,l=new D,c=new D,u=new D,h=new D;if(e)for(let f=0,d=e.count;f<d;f+=3){let m=e.getX(f+0),_=e.getX(f+1),g=e.getX(f+2);s.fromBufferAttribute(t,m),r.fromBufferAttribute(t,_),a.fromBufferAttribute(t,g),u.subVectors(a,r),h.subVectors(s,r),u.cross(h),o.fromBufferAttribute(n,m),l.fromBufferAttribute(n,_),c.fromBufferAttribute(n,g),o.add(u),l.add(u),c.add(u),n.setXYZ(m,o.x,o.y,o.z),n.setXYZ(_,l.x,l.y,l.z),n.setXYZ(g,c.x,c.y,c.z)}else for(let f=0,d=t.count;f<d;f+=3)s.fromBufferAttribute(t,f+0),r.fromBufferAttribute(t,f+1),a.fromBufferAttribute(t,f+2),u.subVectors(a,r),h.subVectors(s,r),u.cross(h),n.setXYZ(f+0,u.x,u.y,u.z),n.setXYZ(f+1,u.x,u.y,u.z),n.setXYZ(f+2,u.x,u.y,u.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Ut.fromBufferAttribute(e,t),Ut.normalize(),e.setXYZ(t,Ut.x,Ut.y,Ut.z)}toNonIndexed(){function e(o,l){let c=o.array,u=o.itemSize,h=o.normalized,f=new c.constructor(l.length*u),d=0,m=0;for(let _=0,g=l.length;_<g;_++){o.isInterleavedBufferAttribute?d=l[_]*o.data.stride+o.offset:d=l[_]*u;for(let p=0;p<u;p++)f[m++]=c[d++]}return new wt(f,u,h)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let t=new i,n=this.index.array,s=this.attributes;for(let o in s){let l=s[o],c=e(l,n);t.setAttribute(o,c)}let r=this.morphAttributes;for(let o in r){let l=[],c=r[o];for(let u=0,h=c.length;u<h;u++){let f=c[u],d=e(f,n);l.push(d)}t.morphAttributes[o]=l}t.morphTargetsRelative=this.morphTargetsRelative;let a=this.groups;for(let o=0,l=a.length;o<l;o++){let c=a[o];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){let e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){let l=this.parameters;for(let c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let l in n){let c=n[l];e.data.attributes[l]=c.toJSON(e.data)}let s={},r=!1;for(let l in this.morphAttributes){let c=this.morphAttributes[l],u=[];for(let h=0,f=c.length;h<f;h++){let d=c[h];u.push(d.toJSON(e.data))}u.length>0&&(s[l]=u,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone());let s=e.attributes;for(let c in s){let u=s[c];this.setAttribute(c,u.clone(t))}let r=e.morphAttributes;for(let c in r){let u=[],h=r[c];for(let f=0,d=h.length;f<d;f++)u.push(h[f].clone(t));this.morphAttributes[c]=u}this.morphTargetsRelative=e.morphTargetsRelative;let a=e.groups;for(let c=0,u=a.length;c<u;c++){let h=a[c];this.addGroup(h.start,h.count,h.materialIndex)}let o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());let l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}},hu=new Ye,Bi=new Si,Ua=new _n,uu=new D,Na=new D,Fa=new D,Oa=new D,pc=new D,Ba=new D,du=new D,za=new D,ct=class extends pt{constructor(e=new gt,t=new ln){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){let o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(e,t){let n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(s,e);let o=this.morphTargetInfluences;if(r&&o){Ba.set(0,0,0);for(let l=0,c=r.length;l<c;l++){let u=o[l],h=r[l];u!==0&&(pc.fromBufferAttribute(h,e),a?Ba.addScaledVector(pc,u):Ba.addScaledVector(pc.sub(t),u))}t.add(Ba)}return t}raycast(e,t){let n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Ua.copy(n.boundingSphere),Ua.applyMatrix4(r),Bi.copy(e.ray).recast(e.near),!(Ua.containsPoint(Bi.origin)===!1&&(Bi.intersectSphere(Ua,uu)===null||Bi.origin.distanceToSquared(uu)>(e.far-e.near)**2))&&(hu.copy(r).invert(),Bi.copy(e.ray).applyMatrix4(hu),!(n.boundingBox!==null&&Bi.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,Bi)))}_computeIntersections(e,t,n){let s,r=this.geometry,a=this.material,o=r.index,l=r.attributes.position,c=r.attributes.uv,u=r.attributes.uv1,h=r.attributes.normal,f=r.groups,d=r.drawRange;if(o!==null)if(Array.isArray(a))for(let m=0,_=f.length;m<_;m++){let g=f[m],p=a[g.materialIndex],E=Math.max(g.start,d.start),v=Math.min(o.count,Math.min(g.start+g.count,d.start+d.count));for(let y=E,A=v;y<A;y+=3){let T=o.getX(y),R=o.getX(y+1),I=o.getX(y+2);s=ka(this,p,e,n,c,u,h,T,R,I),s&&(s.faceIndex=Math.floor(y/3),s.face.materialIndex=g.materialIndex,t.push(s))}}else{let m=Math.max(0,d.start),_=Math.min(o.count,d.start+d.count);for(let g=m,p=_;g<p;g+=3){let E=o.getX(g),v=o.getX(g+1),y=o.getX(g+2);s=ka(this,a,e,n,c,u,h,E,v,y),s&&(s.faceIndex=Math.floor(g/3),t.push(s))}}else if(l!==void 0)if(Array.isArray(a))for(let m=0,_=f.length;m<_;m++){let g=f[m],p=a[g.materialIndex],E=Math.max(g.start,d.start),v=Math.min(l.count,Math.min(g.start+g.count,d.start+d.count));for(let y=E,A=v;y<A;y+=3){let T=y,R=y+1,I=y+2;s=ka(this,p,e,n,c,u,h,T,R,I),s&&(s.faceIndex=Math.floor(y/3),s.face.materialIndex=g.materialIndex,t.push(s))}}else{let m=Math.max(0,d.start),_=Math.min(l.count,d.start+d.count);for(let g=m,p=_;g<p;g+=3){let E=g,v=g+1,y=g+2;s=ka(this,a,e,n,c,u,h,E,v,y),s&&(s.faceIndex=Math.floor(g/3),t.push(s))}}}};function Op(i,e,t,n,s,r,a,o){let l;if(e.side===Bt?l=n.intersectTriangle(a,r,s,!0,o):l=n.intersectTriangle(s,r,a,e.side===Jn,o),l===null)return null;za.copy(o),za.applyMatrix4(i.matrixWorld);let c=t.ray.origin.distanceTo(za);return c<t.near||c>t.far?null:{distance:c,point:za.clone(),object:i}}function ka(i,e,t,n,s,r,a,o,l,c){i.getVertexPosition(o,Na),i.getVertexPosition(l,Fa),i.getVertexPosition(c,Oa);let u=Op(i,e,t,n,Na,Fa,Oa,du);if(u){let h=new D;xi.getBarycoord(du,Na,Fa,Oa,h),s&&(u.uv=xi.getInterpolatedAttribute(s,o,l,c,h,new fe)),r&&(u.uv1=xi.getInterpolatedAttribute(r,o,l,c,h,new fe)),a&&(u.normal=xi.getInterpolatedAttribute(a,o,l,c,h,new D),u.normal.dot(n.direction)>0&&u.normal.multiplyScalar(-1));let f={a:o,b:l,c,normal:new D,materialIndex:0};xi.getNormal(Na,Fa,Oa,f.normal),u.face=f,u.barycoord=h}return u}var It=class i extends gt{constructor(e=1,t=1,n=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:s,heightSegments:r,depthSegments:a};let o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);let l=[],c=[],u=[],h=[],f=0,d=0;m("z","y","x",-1,-1,n,t,e,a,r,0),m("z","y","x",1,-1,n,t,-e,a,r,1),m("x","z","y",1,1,e,n,t,s,a,2),m("x","z","y",1,-1,e,n,-t,s,a,3),m("x","y","z",1,-1,e,t,n,s,r,4),m("x","y","z",-1,-1,e,t,-n,s,r,5),this.setIndex(l),this.setAttribute("position",new tt(c,3)),this.setAttribute("normal",new tt(u,3)),this.setAttribute("uv",new tt(h,2));function m(_,g,p,E,v,y,A,T,R,I,S){let M=y/R,P=A/I,O=y/2,V=A/2,$=T/2,L=R+1,H=I+1,N=0,k=0,Q=new D;for(let le=0;le<H;le++){let ge=le*P-V;for(let Ne=0;Ne<L;Ne++){let We=Ne*M-O;Q[_]=We*E,Q[g]=ge*v,Q[p]=$,c.push(Q.x,Q.y,Q.z),Q[_]=0,Q[g]=0,Q[p]=T>0?1:-1,u.push(Q.x,Q.y,Q.z),h.push(Ne/R),h.push(1-le/I),N+=1}}for(let le=0;le<I;le++)for(let ge=0;ge<R;ge++){let Ne=f+ge+L*le,We=f+ge+L*(le+1),et=f+(ge+1)+L*(le+1),Ke=f+(ge+1)+L*le;l.push(Ne,We,Ke),l.push(We,et,Ke),k+=6}o.addGroup(d,k,S),d+=k,f+=N}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}};function ns(i){let e={};for(let t in i){e[t]={};for(let n in i[t]){let s=i[t][n];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=s.clone():Array.isArray(s)?e[t][n]=s.slice():e[t][n]=s}}return e}function Gt(i){let e={};for(let t=0;t<i.length;t++){let n=ns(i[t]);for(let s in n)e[s]=n[s]}return e}function Bp(i){let e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function Qc(i){let e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:it.workingColorSpace}var Cd={clone:ns,merge:Gt},zp=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,kp=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,cn=class extends Bn{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=zp,this.fragmentShader=kp,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=ns(e.uniforms),this.uniformsGroups=Bp(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let s in this.uniforms){let a=this.uniforms[s].value;a&&a.isTexture?t.uniforms[s]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[s]={type:"m4",value:a.toArray()}:t.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let n={};for(let s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}},Ir=class extends pt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Ye,this.projectionMatrix=new Ye,this.projectionMatrixInverse=new Ye,this.coordinateSystem=wn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}},yi=new D,fu=new fe,pu=new fe,Vt=class extends Ir{constructor(e=50,t=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=Ps*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(yr*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Ps*2*Math.atan(Math.tan(yr*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){yi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(yi.x,yi.y).multiplyScalar(-e/yi.z),yi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(yi.x,yi.y).multiplyScalar(-e/yi.z)}getViewSize(e,t){return this.getViewBounds(e,fu,pu),t.subVectors(pu,fu)}setViewOffset(e,t,n,s,r,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(yr*.5*this.fov)/this.zoom,n=2*t,s=this.aspect*n,r=-.5*s,a=this.view;if(this.view!==null&&this.view.enabled){let l=a.fullWidth,c=a.fullHeight;r+=a.offsetX*s/l,t-=a.offsetY*n/c,s*=a.width/l,n*=a.height/c}let o=this.filmOffset;o!==0&&(r+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}},ws=-90,Ts=1,lo=class extends pt{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let s=new Vt(ws,Ts,e,t);s.layers=this.layers,this.add(s);let r=new Vt(ws,Ts,e,t);r.layers=this.layers,this.add(r);let a=new Vt(ws,Ts,e,t);a.layers=this.layers,this.add(a);let o=new Vt(ws,Ts,e,t);o.layers=this.layers,this.add(o);let l=new Vt(ws,Ts,e,t);l.layers=this.layers,this.add(l);let c=new Vt(ws,Ts,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[n,s,r,a,o,l]=t;for(let c of t)this.remove(c);if(e===wn)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===wr)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(let c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[r,a,o,l,c,u]=this.children,h=e.getRenderTarget(),f=e.getActiveCubeFace(),d=e.getActiveMipmapLevel(),m=e.xr.enabled;e.xr.enabled=!1;let _=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,s),e.render(t,r),e.setRenderTarget(n,1,s),e.render(t,a),e.setRenderTarget(n,2,s),e.render(t,o),e.setRenderTarget(n,3,s),e.render(t,l),e.setRenderTarget(n,4,s),e.render(t,c),n.texture.generateMipmaps=_,e.setRenderTarget(n,5,s),e.render(t,u),e.setRenderTarget(h,f,d),e.xr.enabled=m,n.texture.needsPMREMUpdate=!0}},Pr=class extends Kt{constructor(e=[],t=es,n,s,r,a,o,l,c,u){super(e,t,n,s,r,a,o,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},co=class extends On{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},s=[n,n,n,n,n,n];this.texture=new Pr(s),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new It(5,5,5),r=new cn({name:"CubemapFromEquirect",uniforms:ns(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Bt,blending:ii});r.uniforms.tEquirect.value=t;let a=new ct(s,r),o=t.minFilter;return t.minFilter===Ei&&(t.minFilter=Tn),new lo(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,s=!0){let r=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,s);e.setRenderTarget(r)}},bt=class extends pt{constructor(){super(),this.isGroup=!0,this.type="Group"}},Hp={type:"move"},Ns=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new bt,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new bt,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new D,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new D),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new bt,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new D,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new D),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let s=null,r=null,a=null,o=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){a=!0;for(let _ of e.hand.values()){let g=t.getJointPose(_,n),p=this._getHandJoint(c,_);g!==null&&(p.matrix.fromArray(g.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=g.radius),p.visible=g!==null}let u=c.joints["index-finger-tip"],h=c.joints["thumb-tip"],f=u.position.distanceTo(h.position),d=.02,m=.005;c.inputState.pinching&&f>d+m?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&f<=d-m&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));o!==null&&(s=t.getPose(e.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Hp)))}return o!==null&&(o.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let n=new bt;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}},Lr=class i{constructor(e,t=25e-5){this.isFogExp2=!0,this.name="",this.color=new ke(e),this.density=t}clone(){return new i(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}};var Dr=class extends pt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new on,this.environmentIntensity=1,this.environmentRotation=new on,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}};var Ha=new D,mu=new D,Ur=class extends pt{constructor(){super(),this.isLOD=!0,this._currentLevel=0,this.type="LOD",Object.defineProperties(this,{levels:{enumerable:!0,value:[]}}),this.autoUpdate=!0}copy(e){super.copy(e,!1);let t=e.levels;for(let n=0,s=t.length;n<s;n++){let r=t[n];this.addLevel(r.object.clone(),r.distance,r.hysteresis)}return this.autoUpdate=e.autoUpdate,this}addLevel(e,t=0,n=0){t=Math.abs(t);let s=this.levels,r;for(r=0;r<s.length&&!(t<s[r].distance);r++);return s.splice(r,0,{distance:t,hysteresis:n,object:e}),this.add(e),this}removeLevel(e){let t=this.levels;for(let n=0;n<t.length;n++)if(t[n].distance===e){let s=t.splice(n,1);return this.remove(s[0].object),!0}return!1}getCurrentLevel(){return this._currentLevel}getObjectForDistance(e){let t=this.levels;if(t.length>0){let n,s;for(n=1,s=t.length;n<s;n++){let r=t[n].distance;if(t[n].object.visible&&(r-=r*t[n].hysteresis),e<r)break}return t[n-1].object}return null}raycast(e,t){if(this.levels.length>0){Ha.setFromMatrixPosition(this.matrixWorld);let s=e.ray.origin.distanceTo(Ha);this.getObjectForDistance(s).raycast(e,t)}}update(e){let t=this.levels;if(t.length>1){Ha.setFromMatrixPosition(e.matrixWorld),mu.setFromMatrixPosition(this.matrixWorld);let n=Ha.distanceTo(mu)/e.zoom;t[0].object.visible=!0;let s,r;for(s=1,r=t.length;s<r;s++){let a=t[s].distance;if(t[s].object.visible&&(a-=a*t[s].hysteresis),n>=a)t[s-1].object.visible=!1,t[s].object.visible=!0;else break}for(this._currentLevel=s-1;s<r;s++)t[s].object.visible=!1}}toJSON(e){let t=super.toJSON(e);this.autoUpdate===!1&&(t.object.autoUpdate=!1),t.object.levels=[];let n=this.levels;for(let s=0,r=n.length;s<r;s++){let a=n[s];t.object.levels.push({object:a.object.uuid,distance:a.distance,hysteresis:a.hysteresis})}return t}},gu=new D,_u=new ft,yu=new ft,Vp=new D,xu=new Ye,Va=new D,mc=new _n,vu=new Ye,gc=new Si,Nr=class extends ct{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=bc,this.bindMatrix=new Ye,this.bindMatrixInverse=new Ye,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){let e=this.geometry;this.boundingBox===null&&(this.boundingBox=new An),this.boundingBox.makeEmpty();let t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,Va),this.boundingBox.expandByPoint(Va)}computeBoundingSphere(){let e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new _n),this.boundingSphere.makeEmpty();let t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,Va),this.boundingSphere.expandByPoint(Va)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,t){let n=this.material,s=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),mc.copy(this.boundingSphere),mc.applyMatrix4(s),e.ray.intersectsSphere(mc)!==!1&&(vu.copy(s).invert(),gc.copy(e.ray).applyMatrix4(vu),!(this.boundingBox!==null&&gc.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(e,t,gc)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){let e=new ft,t=this.geometry.attributes.skinWeight;for(let n=0,s=t.count;n<s;n++){e.fromBufferAttribute(t,n);let r=1/e.manhattanLength();r!==1/0?e.multiplyScalar(r):e.set(1,0,0,0),t.setXYZW(n,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===bc?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===ud?this.bindMatrixInverse.copy(this.bindMatrix).invert():console.warn("THREE.SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){let n=this.skeleton,s=this.geometry;_u.fromBufferAttribute(s.attributes.skinIndex,e),yu.fromBufferAttribute(s.attributes.skinWeight,e),gu.copy(t).applyMatrix4(this.bindMatrix),t.set(0,0,0);for(let r=0;r<4;r++){let a=yu.getComponent(r);if(a!==0){let o=_u.getComponent(r);xu.multiplyMatrices(n.bones[o].matrixWorld,n.boneInverses[o]),t.addScaledVector(Vp.copy(gu).applyMatrix4(xu),a)}}return t.applyMatrix4(this.bindMatrixInverse)}},hn=class extends pt{constructor(){super(),this.isBone=!0,this.type="Bone"}},Fr=class extends Kt{constructor(e=null,t=1,n=1,s,r,a,o,l,c=Jt,u=Jt,h,f){super(null,a,o,l,c,u,s,r,h,f),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},Mu=new Ye,Gp=new Ye,Or=class i{constructor(e=[],t=[]){this.uuid=ai(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){let e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){console.warn("THREE.Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,s=this.bones.length;n<s;n++)this.boneInverses.push(new Ye)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){let n=new Ye;this.bones[e]&&n.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){let n=this.bones[e];n&&n.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){let n=this.bones[e];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){let e=this.bones,t=this.boneInverses,n=this.boneMatrices,s=this.boneTexture;for(let r=0,a=e.length;r<a;r++){let o=e[r]?e[r].matrixWorld:Gp;Mu.multiplyMatrices(o,t[r]),Mu.toArray(n,r*16)}s!==null&&(s.needsUpdate=!0)}clone(){return new i(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);let t=new Float32Array(e*e*4);t.set(this.boneMatrices);let n=new Fr(t,e,e,dn,xn);return n.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=n,this}getBoneByName(e){for(let t=0,n=this.bones.length;t<n;t++){let s=this.bones[t];if(s.name===e)return s}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let n=0,s=e.bones.length;n<s;n++){let r=e.bones[n],a=t[r];a===void 0&&(console.warn("THREE.Skeleton: No bone found with UUID:",r),a=new hn),this.bones.push(a),this.boneInverses.push(new Ye().fromArray(e.boneInverses[n]))}return this.init(),this}toJSON(){let e={metadata:{version:4.7,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;let t=this.bones,n=this.boneInverses;for(let s=0,r=t.length;s<r;s++){let a=t[s];e.bones.push(a.uuid);let o=n[s];e.boneInverses.push(o.toArray())}return e}},Br=class extends wt{constructor(e,t,n,s=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){let e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}},As=new Ye,Su=new Ye,Ga=[],bu=new An,Wp=new Ye,pr=new ct,mr=new _n,zn=class extends ct{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new Br(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<n;s++)this.setMatrixAt(s,Wp)}computeBoundingBox(){let e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new An),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,As),bu.copy(e.boundingBox).applyMatrix4(As),this.boundingBox.union(bu)}computeBoundingSphere(){let e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new _n),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,As),mr.copy(e.boundingSphere).applyMatrix4(As),this.boundingSphere.union(mr)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){let n=t.morphTargetInfluences,s=this.morphTexture.source.data.data,r=n.length+1,a=e*r+1;for(let o=0;o<n.length;o++)n[o]=s[a+o]}raycast(e,t){let n=this.matrixWorld,s=this.count;if(pr.geometry=this.geometry,pr.material=this.material,pr.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),mr.copy(this.boundingSphere),mr.applyMatrix4(n),e.ray.intersectsSphere(mr)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,As),Su.multiplyMatrices(n,As),pr.matrixWorld=Su,pr.raycast(e,Ga);for(let a=0,o=Ga.length;a<o;a++){let l=Ga[a];l.instanceId=r,l.object=this,t.push(l)}Ga.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new Br(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}setMorphAt(e,t){let n=t.morphTargetInfluences,s=n.length+1;this.morphTexture===null&&(this.morphTexture=new Fr(new Float32Array(s*this.count),s,this.count,Go,xn));let r=this.morphTexture.source.data.data,a=0;for(let c=0;c<n.length;c++)a+=n[c];let o=this.geometry.morphTargetsRelative?1:1-a,l=s*e;r[l]=o,r.set(n,l+1)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}},_c=new D,Xp=new D,$p=new Ge,Nn=class{constructor(e=new D(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,s){return this.normal.set(e,t,n),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let s=_c.subVectors(n,t).cross(Xp.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){let n=e.delta(_c),s=this.normal.dot(n);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let r=-(e.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:t.copy(e.start).addScaledVector(n,r)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||$p.getNormalMatrix(e),s=this.coplanarPoint(_c).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}},zi=new _n,qp=new fe(.5,.5),Wa=new D,Fs=class{constructor(e=new Nn,t=new Nn,n=new Nn,s=new Nn,r=new Nn,a=new Nn){this.planes=[e,t,n,s,r,a]}set(e,t,n,s,r,a){let o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=wn,n=!1){let s=this.planes,r=e.elements,a=r[0],o=r[1],l=r[2],c=r[3],u=r[4],h=r[5],f=r[6],d=r[7],m=r[8],_=r[9],g=r[10],p=r[11],E=r[12],v=r[13],y=r[14],A=r[15];if(s[0].setComponents(c-a,d-u,p-m,A-E).normalize(),s[1].setComponents(c+a,d+u,p+m,A+E).normalize(),s[2].setComponents(c+o,d+h,p+_,A+v).normalize(),s[3].setComponents(c-o,d-h,p-_,A-v).normalize(),n)s[4].setComponents(l,f,g,y).normalize(),s[5].setComponents(c-l,d-f,p-g,A-y).normalize();else if(s[4].setComponents(c-l,d-f,p-g,A-y).normalize(),t===wn)s[5].setComponents(c+l,d+f,p+g,A+y).normalize();else if(t===wr)s[5].setComponents(l,f,g,y).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),zi.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),zi.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(zi)}intersectsSprite(e){zi.center.set(0,0,0);let t=qp.distanceTo(e.center);return zi.radius=.7071067811865476+t,zi.applyMatrix4(e.matrixWorld),this.intersectsSphere(zi)}intersectsSphere(e){let t=this.planes,n=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let s=t[n];if(Wa.x=s.normal.x>0?e.max.x:e.min.x,Wa.y=s.normal.y>0?e.max.y:e.min.y,Wa.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(Wa)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};var zr=class extends Bn{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new ke(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}},ho=new D,uo=new D,Eu=new Ye,gr=new Si,Xa=new _n,yc=new D,wu=new D,Os=class extends pt{constructor(e=new gt,t=new zr){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[0];for(let s=1,r=t.count;s<r;s++)ho.fromBufferAttribute(t,s-1),uo.fromBufferAttribute(t,s),n[s]=n[s-1],n[s]+=ho.distanceTo(uo);e.setAttribute("lineDistance",new tt(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){let n=this.geometry,s=this.matrixWorld,r=e.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Xa.copy(n.boundingSphere),Xa.applyMatrix4(s),Xa.radius+=r,e.ray.intersectsSphere(Xa)===!1)return;Eu.copy(s).invert(),gr.copy(e.ray).applyMatrix4(Eu);let o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=this.isLineSegments?2:1,u=n.index,f=n.attributes.position;if(u!==null){let d=Math.max(0,a.start),m=Math.min(u.count,a.start+a.count);for(let _=d,g=m-1;_<g;_+=c){let p=u.getX(_),E=u.getX(_+1),v=$a(this,e,gr,l,p,E,_);v&&t.push(v)}if(this.isLineLoop){let _=u.getX(m-1),g=u.getX(d),p=$a(this,e,gr,l,_,g,m-1);p&&t.push(p)}}else{let d=Math.max(0,a.start),m=Math.min(f.count,a.start+a.count);for(let _=d,g=m-1;_<g;_+=c){let p=$a(this,e,gr,l,_,_+1,_);p&&t.push(p)}if(this.isLineLoop){let _=$a(this,e,gr,l,m-1,d,m-1);_&&t.push(_)}}}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){let o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}};function $a(i,e,t,n,s,r,a){let o=i.geometry.attributes.position;if(ho.fromBufferAttribute(o,s),uo.fromBufferAttribute(o,r),t.distanceSqToSegment(ho,uo,yc,wu)>n)return;yc.applyMatrix4(i.matrixWorld);let c=e.ray.origin.distanceTo(yc);if(!(c<e.near||c>e.far))return{distance:c,point:wu.clone().applyMatrix4(i.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:i}}var Bs=class extends Bn{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new ke(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},Tu=new Ye,Tc=new Si,qa=new _n,Ya=new D,kr=class extends pt{constructor(e=new gt,t=new Bs){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){let n=this.geometry,s=this.matrixWorld,r=e.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),qa.copy(n.boundingSphere),qa.applyMatrix4(s),qa.radius+=r,e.ray.intersectsSphere(qa)===!1)return;Tu.copy(s).invert(),Tc.copy(e.ray).applyMatrix4(Tu);let o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=n.index,h=n.attributes.position;if(c!==null){let f=Math.max(0,a.start),d=Math.min(c.count,a.start+a.count);for(let m=f,_=d;m<_;m++){let g=c.getX(m);Ya.fromBufferAttribute(h,g),Au(Ya,g,l,s,e,t,this)}}else{let f=Math.max(0,a.start),d=Math.min(h.count,a.start+a.count);for(let m=f,_=d;m<_;m++)Ya.fromBufferAttribute(h,m),Au(Ya,m,l,s,e,t,this)}}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){let o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}};function Au(i,e,t,n,s,r,a){let o=Tc.distanceSqToPoint(i);if(o<t){let l=new D;Tc.closestPointToPoint(i,l),l.applyMatrix4(n);let c=s.ray.origin.distanceTo(l);if(c<s.near||c>s.far)return;r.push({distance:c,distanceToRay:Math.sqrt(o),point:l,index:e,face:null,faceIndex:null,barycoord:null,object:a})}}var Hr=class extends Kt{constructor(e,t,n=wi,s,r,a,o=Jt,l=Jt,c,u=Is,h=1){if(u!==Is&&u!==qs)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let f={width:e,height:t,depth:h};super(f,s,r,a,o,l,u,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Ds(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}},Vr=class extends Kt{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}};var Gr=class i extends gt{constructor(e=1,t=32,n=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:s},t=Math.max(3,t);let r=[],a=[],o=[],l=[],c=new D,u=new fe;a.push(0,0,0),o.push(0,0,1),l.push(.5,.5);for(let h=0,f=3;h<=t;h++,f+=3){let d=n+h/t*s;c.x=e*Math.cos(d),c.y=e*Math.sin(d),a.push(c.x,c.y,c.z),o.push(0,0,1),u.x=(a[f]/e+1)/2,u.y=(a[f+1]/e+1)/2,l.push(u.x,u.y)}for(let h=1;h<=t;h++)r.push(h,h+1,0);this.setIndex(r),this.setAttribute("position",new tt(a,3)),this.setAttribute("normal",new tt(o,3)),this.setAttribute("uv",new tt(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radius,e.segments,e.thetaStart,e.thetaLength)}},Kn=class i extends gt{constructor(e=1,t=1,n=1,s=32,r=1,a=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:s,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:l};let c=this;s=Math.floor(s),r=Math.floor(r);let u=[],h=[],f=[],d=[],m=0,_=[],g=n/2,p=0;E(),a===!1&&(e>0&&v(!0),t>0&&v(!1)),this.setIndex(u),this.setAttribute("position",new tt(h,3)),this.setAttribute("normal",new tt(f,3)),this.setAttribute("uv",new tt(d,2));function E(){let y=new D,A=new D,T=0,R=(t-e)/n;for(let I=0;I<=r;I++){let S=[],M=I/r,P=M*(t-e)+e;for(let O=0;O<=s;O++){let V=O/s,$=V*l+o,L=Math.sin($),H=Math.cos($);A.x=P*L,A.y=-M*n+g,A.z=P*H,h.push(A.x,A.y,A.z),y.set(L,R,H).normalize(),f.push(y.x,y.y,y.z),d.push(V,1-M),S.push(m++)}_.push(S)}for(let I=0;I<s;I++)for(let S=0;S<r;S++){let M=_[S][I],P=_[S+1][I],O=_[S+1][I+1],V=_[S][I+1];(e>0||S!==0)&&(u.push(M,P,V),T+=3),(t>0||S!==r-1)&&(u.push(P,O,V),T+=3)}c.addGroup(p,T,0),p+=T}function v(y){let A=m,T=new fe,R=new D,I=0,S=y===!0?e:t,M=y===!0?1:-1;for(let O=1;O<=s;O++)h.push(0,g*M,0),f.push(0,M,0),d.push(.5,.5),m++;let P=m;for(let O=0;O<=s;O++){let $=O/s*l+o,L=Math.cos($),H=Math.sin($);R.x=S*H,R.y=g*M,R.z=S*L,h.push(R.x,R.y,R.z),f.push(0,M,0),T.x=L*.5+.5,T.y=H*.5*M+.5,d.push(T.x,T.y),m++}for(let O=0;O<s;O++){let V=A+O,$=P+O;y===!0?u.push($,$+1,V):u.push($+1,$,V),I+=3}c.addGroup(p,I,y===!0?1:2),p+=I}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}},Rn=class i extends Kn{constructor(e=1,t=1,n=32,s=1,r=!1,a=0,o=Math.PI*2){super(0,e,t,n,s,r,a,o),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:n,heightSegments:s,openEnded:r,thetaStart:a,thetaLength:o}}static fromJSON(e){return new i(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}},zs=class i extends gt{constructor(e=[],t=[],n=1,s=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:n,detail:s};let r=[],a=[];o(s),c(n),u(),this.setAttribute("position",new tt(r,3)),this.setAttribute("normal",new tt(r.slice(),3)),this.setAttribute("uv",new tt(a,2)),s===0?this.computeVertexNormals():this.normalizeNormals();function o(E){let v=new D,y=new D,A=new D;for(let T=0;T<t.length;T+=3)d(t[T+0],v),d(t[T+1],y),d(t[T+2],A),l(v,y,A,E)}function l(E,v,y,A){let T=A+1,R=[];for(let I=0;I<=T;I++){R[I]=[];let S=E.clone().lerp(y,I/T),M=v.clone().lerp(y,I/T),P=T-I;for(let O=0;O<=P;O++)O===0&&I===T?R[I][O]=S:R[I][O]=S.clone().lerp(M,O/P)}for(let I=0;I<T;I++)for(let S=0;S<2*(T-I)-1;S++){let M=Math.floor(S/2);S%2===0?(f(R[I][M+1]),f(R[I+1][M]),f(R[I][M])):(f(R[I][M+1]),f(R[I+1][M+1]),f(R[I+1][M]))}}function c(E){let v=new D;for(let y=0;y<r.length;y+=3)v.x=r[y+0],v.y=r[y+1],v.z=r[y+2],v.normalize().multiplyScalar(E),r[y+0]=v.x,r[y+1]=v.y,r[y+2]=v.z}function u(){let E=new D;for(let v=0;v<r.length;v+=3){E.x=r[v+0],E.y=r[v+1],E.z=r[v+2];let y=g(E)/2/Math.PI+.5,A=p(E)/Math.PI+.5;a.push(y,1-A)}m(),h()}function h(){for(let E=0;E<a.length;E+=6){let v=a[E+0],y=a[E+2],A=a[E+4],T=Math.max(v,y,A),R=Math.min(v,y,A);T>.9&&R<.1&&(v<.2&&(a[E+0]+=1),y<.2&&(a[E+2]+=1),A<.2&&(a[E+4]+=1))}}function f(E){r.push(E.x,E.y,E.z)}function d(E,v){let y=E*3;v.x=e[y+0],v.y=e[y+1],v.z=e[y+2]}function m(){let E=new D,v=new D,y=new D,A=new D,T=new fe,R=new fe,I=new fe;for(let S=0,M=0;S<r.length;S+=9,M+=6){E.set(r[S+0],r[S+1],r[S+2]),v.set(r[S+3],r[S+4],r[S+5]),y.set(r[S+6],r[S+7],r[S+8]),T.set(a[M+0],a[M+1]),R.set(a[M+2],a[M+3]),I.set(a[M+4],a[M+5]),A.copy(E).add(v).add(y).divideScalar(3);let P=g(A);_(T,M+0,E,P),_(R,M+2,v,P),_(I,M+4,y,P)}}function _(E,v,y,A){A<0&&E.x===1&&(a[v]=E.x-1),y.x===0&&y.z===0&&(a[v]=A/2/Math.PI+.5)}function g(E){return Math.atan2(E.z,-E.x)}function p(E){return Math.atan2(-E.y,Math.sqrt(E.x*E.x+E.z*E.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.vertices,e.indices,e.radius,e.details)}},qi=class i extends zs{constructor(e=1,t=0){let n=(1+Math.sqrt(5))/2,s=1/n,r=[-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-s,-n,0,-s,n,0,s,-n,0,s,n,-s,-n,0,-s,n,0,s,-n,0,s,n,0,-n,0,-s,n,0,-s,-n,0,s,n,0,s],a=[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9];super(r,a,e,t),this.type="DodecahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new i(e.radius,e.detail)}};var un=class{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){console.warn("THREE.Curve: .getPoint() not implemented.")}getPointAt(e,t){let n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){let e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let t=[],n,s=this.getPoint(0),r=0;t.push(0);for(let a=1;a<=e;a++)n=this.getPoint(a/e),r+=n.distanceTo(s),t.push(r),s=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){let n=this.getLengths(),s=0,r=n.length,a;t?a=t:a=e*n[r-1];let o=0,l=r-1,c;for(;o<=l;)if(s=Math.floor(o+(l-o)/2),c=n[s]-a,c<0)o=s+1;else if(c>0)l=s-1;else{l=s;break}if(s=l,n[s]===a)return s/(r-1);let u=n[s],f=n[s+1]-u,d=(a-u)/f;return(s+d)/(r-1)}getTangent(e,t){let s=e-1e-4,r=e+1e-4;s<0&&(s=0),r>1&&(r=1);let a=this.getPoint(s),o=this.getPoint(r),l=t||(a.isVector2?new fe:new D);return l.copy(o).sub(a).normalize(),l}getTangentAt(e,t){let n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t=!1){let n=new D,s=[],r=[],a=[],o=new D,l=new Ye;for(let d=0;d<=e;d++){let m=d/e;s[d]=this.getTangentAt(m,new D)}r[0]=new D,a[0]=new D;let c=Number.MAX_VALUE,u=Math.abs(s[0].x),h=Math.abs(s[0].y),f=Math.abs(s[0].z);u<=c&&(c=u,n.set(1,0,0)),h<=c&&(c=h,n.set(0,1,0)),f<=c&&n.set(0,0,1),o.crossVectors(s[0],n).normalize(),r[0].crossVectors(s[0],o),a[0].crossVectors(s[0],r[0]);for(let d=1;d<=e;d++){if(r[d]=r[d-1].clone(),a[d]=a[d-1].clone(),o.crossVectors(s[d-1],s[d]),o.length()>Number.EPSILON){o.normalize();let m=Math.acos(Je(s[d-1].dot(s[d]),-1,1));r[d].applyMatrix4(l.makeRotationAxis(o,m))}a[d].crossVectors(s[d],r[d])}if(t===!0){let d=Math.acos(Je(r[0].dot(r[e]),-1,1));d/=e,s[0].dot(o.crossVectors(r[0],r[e]))>0&&(d=-d);for(let m=1;m<=e;m++)r[m].applyMatrix4(l.makeRotationAxis(s[m],d*m)),a[m].crossVectors(s[m],r[m])}return{tangents:s,normals:r,binormals:a}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){let e={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}},ks=class extends un{constructor(e=0,t=0,n=1,s=1,r=0,a=Math.PI*2,o=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=a,this.aClockwise=o,this.aRotation=l}getPoint(e,t=new fe){let n=t,s=Math.PI*2,r=this.aEndAngle-this.aStartAngle,a=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(a?r=0:r=s),this.aClockwise===!0&&!a&&(r===s?r=-s:r=r-s);let o=this.aStartAngle+e*r,l=this.aX+this.xRadius*Math.cos(o),c=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){let u=Math.cos(this.aRotation),h=Math.sin(this.aRotation),f=l-this.aX,d=c-this.aY;l=f*u-d*h+this.aX,c=f*h+d*u+this.aY}return n.set(l,c)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){let e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}},fo=class extends ks{constructor(e,t,n,s,r,a){super(e,t,n,n,s,r,a),this.isArcCurve=!0,this.type="ArcCurve"}};function eh(){let i=0,e=0,t=0,n=0;function s(r,a,o,l){i=r,e=o,t=-3*r+3*a-2*o-l,n=2*r-2*a+o+l}return{initCatmullRom:function(r,a,o,l,c){s(a,o,c*(o-r),c*(l-a))},initNonuniformCatmullRom:function(r,a,o,l,c,u,h){let f=(a-r)/c-(o-r)/(c+u)+(o-a)/u,d=(o-a)/u-(l-a)/(u+h)+(l-o)/h;f*=u,d*=u,s(a,o,f,d)},calc:function(r){let a=r*r,o=a*r;return i+e*r+t*a+n*o}}}var Za=new D,xc=new eh,vc=new eh,Mc=new eh,bi=class extends un{constructor(e=[],t=!1,n="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=n,this.tension=s}getPoint(e,t=new D){let n=t,s=this.points,r=s.length,a=(r-(this.closed?0:1))*e,o=Math.floor(a),l=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/r)+1)*r:l===0&&o===r-1&&(o=r-2,l=1);let c,u;this.closed||o>0?c=s[(o-1)%r]:(Za.subVectors(s[0],s[1]).add(s[0]),c=Za);let h=s[o%r],f=s[(o+1)%r];if(this.closed||o+2<r?u=s[(o+2)%r]:(Za.subVectors(s[r-1],s[r-2]).add(s[r-1]),u=Za),this.curveType==="centripetal"||this.curveType==="chordal"){let d=this.curveType==="chordal"?.5:.25,m=Math.pow(c.distanceToSquared(h),d),_=Math.pow(h.distanceToSquared(f),d),g=Math.pow(f.distanceToSquared(u),d);_<1e-4&&(_=1),m<1e-4&&(m=_),g<1e-4&&(g=_),xc.initNonuniformCatmullRom(c.x,h.x,f.x,u.x,m,_,g),vc.initNonuniformCatmullRom(c.y,h.y,f.y,u.y,m,_,g),Mc.initNonuniformCatmullRom(c.z,h.z,f.z,u.z,m,_,g)}else this.curveType==="catmullrom"&&(xc.initCatmullRom(c.x,h.x,f.x,u.x,this.tension),vc.initCatmullRom(c.y,h.y,f.y,u.y,this.tension),Mc.initCatmullRom(c.z,h.z,f.z,u.z,this.tension));return n.set(xc.calc(l),vc.calc(l),Mc.calc(l)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let s=e.points[t];this.points.push(s.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let s=this.points[t];e.points.push(s.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let s=e.points[t];this.points.push(new D().fromArray(s))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}};function Ru(i,e,t,n,s){let r=(n-e)*.5,a=(s-t)*.5,o=i*i,l=i*o;return(2*t-2*n+r+a)*l+(-3*t+3*n-2*r-a)*o+r*i+t}function Yp(i,e){let t=1-i;return t*t*e}function Zp(i,e){return 2*(1-i)*i*e}function Jp(i,e){return i*i*e}function vr(i,e,t,n){return Yp(i,e)+Zp(i,t)+Jp(i,n)}function Kp(i,e){let t=1-i;return t*t*t*e}function jp(i,e){let t=1-i;return 3*t*t*i*e}function Qp(i,e){return 3*(1-i)*i*i*e}function em(i,e){return i*i*i*e}function Mr(i,e,t,n,s){return Kp(i,e)+jp(i,t)+Qp(i,n)+em(i,s)}var Wr=class extends un{constructor(e=new fe,t=new fe,n=new fe,s=new fe){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=n,this.v3=s}getPoint(e,t=new fe){let n=t,s=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(Mr(e,s.x,r.x,a.x,o.x),Mr(e,s.y,r.y,a.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},po=class extends un{constructor(e=new D,t=new D,n=new D,s=new D){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=n,this.v3=s}getPoint(e,t=new D){let n=t,s=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(Mr(e,s.x,r.x,a.x,o.x),Mr(e,s.y,r.y,a.y,o.y),Mr(e,s.z,r.z,a.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},Xr=class extends un{constructor(e=new fe,t=new fe){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new fe){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new fe){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},mo=class extends un{constructor(e=new D,t=new D){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new D){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new D){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},$r=class extends un{constructor(e=new fe,t=new fe,n=new fe){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new fe){let n=t,s=this.v0,r=this.v1,a=this.v2;return n.set(vr(e,s.x,r.x,a.x),vr(e,s.y,r.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},qr=class extends un{constructor(e=new D,t=new D,n=new D){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new D){let n=t,s=this.v0,r=this.v1,a=this.v2;return n.set(vr(e,s.x,r.x,a.x),vr(e,s.y,r.y,a.y),vr(e,s.z,r.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Yr=class extends un{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new fe){let n=t,s=this.points,r=(s.length-1)*e,a=Math.floor(r),o=r-a,l=s[a===0?a:a-1],c=s[a],u=s[a>s.length-2?s.length-1:a+1],h=s[a>s.length-3?s.length-1:a+2];return n.set(Ru(o,l.x,c.x,u.x,h.x),Ru(o,l.y,c.y,u.y,h.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let s=e.points[t];this.points.push(s.clone())}return this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let s=this.points[t];e.points.push(s.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let s=e.points[t];this.points.push(new fe().fromArray(s))}return this}},go=Object.freeze({__proto__:null,ArcCurve:fo,CatmullRomCurve3:bi,CubicBezierCurve:Wr,CubicBezierCurve3:po,EllipseCurve:ks,LineCurve:Xr,LineCurve3:mo,QuadraticBezierCurve:$r,QuadraticBezierCurve3:qr,SplineCurve:Yr}),_o=class extends un{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){let e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){let n=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new go[n](t,e))}return this}getPoint(e,t){let n=e*this.getLength(),s=this.getCurveLengths(),r=0;for(;r<s.length;){if(s[r]>=n){let a=s[r]-n,o=this.curves[r],l=o.getLength(),c=l===0?0:1-a/l;return o.getPointAt(c,t)}r++}return null}getLength(){let e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let e=[],t=0;for(let n=0,s=this.curves.length;n<s;n++)t+=this.curves[n].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){let t=[],n;for(let s=0,r=this.curves;s<r.length;s++){let a=r[s],o=a.isEllipseCurve?e*2:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?e*a.points.length:e,l=a.getPoints(o);for(let c=0;c<l.length;c++){let u=l[c];n&&n.equals(u)||(t.push(u),n=u)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let s=e.curves[t];this.curves.push(s.clone())}return this.autoClose=e.autoClose,this}toJSON(){let e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,n=this.curves.length;t<n;t++){let s=this.curves[t];e.curves.push(s.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let s=e.curves[t];this.curves.push(new go[s.type]().fromJSON(s))}return this}},Zr=class extends _o{constructor(e){super(),this.type="Path",this.currentPoint=new fe,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,n=e.length;t<n;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){let n=new Xr(this.currentPoint.clone(),new fe(e,t));return this.curves.push(n),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,n,s){let r=new $r(this.currentPoint.clone(),new fe(e,t),new fe(n,s));return this.curves.push(r),this.currentPoint.set(n,s),this}bezierCurveTo(e,t,n,s,r,a){let o=new Wr(this.currentPoint.clone(),new fe(e,t),new fe(n,s),new fe(r,a));return this.curves.push(o),this.currentPoint.set(r,a),this}splineThru(e){let t=[this.currentPoint.clone()].concat(e),n=new Yr(t);return this.curves.push(n),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,n,s,r,a){let o=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(e+o,t+l,n,s,r,a),this}absarc(e,t,n,s,r,a){return this.absellipse(e,t,n,n,s,r,a),this}ellipse(e,t,n,s,r,a,o,l){let c=this.currentPoint.x,u=this.currentPoint.y;return this.absellipse(e+c,t+u,n,s,r,a,o,l),this}absellipse(e,t,n,s,r,a,o,l){let c=new ks(e,t,n,s,r,a,o,l);if(this.curves.length>0){let h=c.getPoint(0);h.equals(this.currentPoint)||this.lineTo(h.x,h.y)}this.curves.push(c);let u=c.getPoint(1);return this.currentPoint.copy(u),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){let e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}},Hs=class extends Zr{constructor(e){super(e),this.uuid=ai(),this.type="Shape",this.holes=[]}getPointsHoles(e){let t=[];for(let n=0,s=this.holes.length;n<s;n++)t[n]=this.holes[n].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){let s=e.holes[t];this.holes.push(s.clone())}return this}toJSON(){let e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,n=this.holes.length;t<n;t++){let s=this.holes[t];e.holes.push(s.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){let s=e.holes[t];this.holes.push(new Zr().fromJSON(s))}return this}};function tm(i,e,t=2){let n=e&&e.length,s=n?e[0]*t:i.length,r=Id(i,0,s,t,!0),a=[];if(!r||r.next===r.prev)return a;let o,l,c;if(n&&(r=am(i,e,r,t)),i.length>80*t){o=1/0,l=1/0;let u=-1/0,h=-1/0;for(let f=t;f<s;f+=t){let d=i[f],m=i[f+1];d<o&&(o=d),m<l&&(l=m),d>u&&(u=d),m>h&&(h=m)}c=Math.max(u-o,h-l),c=c!==0?32767/c:0}return Jr(r,a,t,o,l,c,0),a}function Id(i,e,t,n,s){let r;if(s===_m(i,e,t,n)>0)for(let a=e;a<t;a+=n)r=Cu(a/n|0,i[a],i[a+1],r);else for(let a=t-n;a>=e;a-=n)r=Cu(a/n|0,i[a],i[a+1],r);return r&&Vs(r,r.next)&&(jr(r),r=r.next),r}function Yi(i,e){if(!i)return i;e||(e=i);let t=i,n;do if(n=!1,!t.steiner&&(Vs(t,t.next)||Mt(t.prev,t,t.next)===0)){if(jr(t),t=e=t.prev,t===t.next)break;n=!0}else t=t.next;while(n||t!==e);return e}function Jr(i,e,t,n,s,r,a){if(!i)return;!a&&r&&um(i,n,s,r);let o=i;for(;i.prev!==i.next;){let l=i.prev,c=i.next;if(r?im(i,n,s,r):nm(i)){e.push(l.i,i.i,c.i),jr(i),i=c.next,o=c.next;continue}if(i=c,i===o){a?a===1?(i=sm(Yi(i),e),Jr(i,e,t,n,s,r,2)):a===2&&rm(i,e,t,n,s,r):Jr(Yi(i),e,t,n,s,r,1);break}}}function nm(i){let e=i.prev,t=i,n=i.next;if(Mt(e,t,n)>=0)return!1;let s=e.x,r=t.x,a=n.x,o=e.y,l=t.y,c=n.y,u=Math.min(s,r,a),h=Math.min(o,l,c),f=Math.max(s,r,a),d=Math.max(o,l,c),m=n.next;for(;m!==e;){if(m.x>=u&&m.x<=f&&m.y>=h&&m.y<=d&&_r(s,o,r,l,a,c,m.x,m.y)&&Mt(m.prev,m,m.next)>=0)return!1;m=m.next}return!0}function im(i,e,t,n){let s=i.prev,r=i,a=i.next;if(Mt(s,r,a)>=0)return!1;let o=s.x,l=r.x,c=a.x,u=s.y,h=r.y,f=a.y,d=Math.min(o,l,c),m=Math.min(u,h,f),_=Math.max(o,l,c),g=Math.max(u,h,f),p=Ac(d,m,e,t,n),E=Ac(_,g,e,t,n),v=i.prevZ,y=i.nextZ;for(;v&&v.z>=p&&y&&y.z<=E;){if(v.x>=d&&v.x<=_&&v.y>=m&&v.y<=g&&v!==s&&v!==a&&_r(o,u,l,h,c,f,v.x,v.y)&&Mt(v.prev,v,v.next)>=0||(v=v.prevZ,y.x>=d&&y.x<=_&&y.y>=m&&y.y<=g&&y!==s&&y!==a&&_r(o,u,l,h,c,f,y.x,y.y)&&Mt(y.prev,y,y.next)>=0))return!1;y=y.nextZ}for(;v&&v.z>=p;){if(v.x>=d&&v.x<=_&&v.y>=m&&v.y<=g&&v!==s&&v!==a&&_r(o,u,l,h,c,f,v.x,v.y)&&Mt(v.prev,v,v.next)>=0)return!1;v=v.prevZ}for(;y&&y.z<=E;){if(y.x>=d&&y.x<=_&&y.y>=m&&y.y<=g&&y!==s&&y!==a&&_r(o,u,l,h,c,f,y.x,y.y)&&Mt(y.prev,y,y.next)>=0)return!1;y=y.nextZ}return!0}function sm(i,e){let t=i;do{let n=t.prev,s=t.next.next;!Vs(n,s)&&Ld(n,t,t.next,s)&&Kr(n,s)&&Kr(s,n)&&(e.push(n.i,t.i,s.i),jr(t),jr(t.next),t=i=s),t=t.next}while(t!==i);return Yi(t)}function rm(i,e,t,n,s,r){let a=i;do{let o=a.next.next;for(;o!==a.prev;){if(a.i!==o.i&&pm(a,o)){let l=Dd(a,o);a=Yi(a,a.next),l=Yi(l,l.next),Jr(a,e,t,n,s,r,0),Jr(l,e,t,n,s,r,0);return}o=o.next}a=a.next}while(a!==i)}function am(i,e,t,n){let s=[];for(let r=0,a=e.length;r<a;r++){let o=e[r]*n,l=r<a-1?e[r+1]*n:i.length,c=Id(i,o,l,n,!1);c===c.next&&(c.steiner=!0),s.push(fm(c))}s.sort(om);for(let r=0;r<s.length;r++)t=lm(s[r],t);return t}function om(i,e){let t=i.x-e.x;if(t===0&&(t=i.y-e.y,t===0)){let n=(i.next.y-i.y)/(i.next.x-i.x),s=(e.next.y-e.y)/(e.next.x-e.x);t=n-s}return t}function lm(i,e){let t=cm(i,e);if(!t)return e;let n=Dd(t,i);return Yi(n,n.next),Yi(t,t.next)}function cm(i,e){let t=e,n=i.x,s=i.y,r=-1/0,a;if(Vs(i,t))return t;do{if(Vs(i,t.next))return t.next;if(s<=t.y&&s>=t.next.y&&t.next.y!==t.y){let h=t.x+(s-t.y)*(t.next.x-t.x)/(t.next.y-t.y);if(h<=n&&h>r&&(r=h,a=t.x<t.next.x?t:t.next,h===n))return a}t=t.next}while(t!==e);if(!a)return null;let o=a,l=a.x,c=a.y,u=1/0;t=a;do{if(n>=t.x&&t.x>=l&&n!==t.x&&Pd(s<c?n:r,s,l,c,s<c?r:n,s,t.x,t.y)){let h=Math.abs(s-t.y)/(n-t.x);Kr(t,i)&&(h<u||h===u&&(t.x>a.x||t.x===a.x&&hm(a,t)))&&(a=t,u=h)}t=t.next}while(t!==o);return a}function hm(i,e){return Mt(i.prev,i,e.prev)<0&&Mt(e.next,i,i.next)<0}function um(i,e,t,n){let s=i;do s.z===0&&(s.z=Ac(s.x,s.y,e,t,n)),s.prevZ=s.prev,s.nextZ=s.next,s=s.next;while(s!==i);s.prevZ.nextZ=null,s.prevZ=null,dm(s)}function dm(i){let e,t=1;do{let n=i,s;i=null;let r=null;for(e=0;n;){e++;let a=n,o=0;for(let c=0;c<t&&(o++,a=a.nextZ,!!a);c++);let l=t;for(;o>0||l>0&&a;)o!==0&&(l===0||!a||n.z<=a.z)?(s=n,n=n.nextZ,o--):(s=a,a=a.nextZ,l--),r?r.nextZ=s:i=s,s.prevZ=r,r=s;n=a}r.nextZ=null,t*=2}while(e>1);return i}function Ac(i,e,t,n,s){return i=(i-t)*s|0,e=(e-n)*s|0,i=(i|i<<8)&16711935,i=(i|i<<4)&252645135,i=(i|i<<2)&858993459,i=(i|i<<1)&1431655765,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,i|e<<1}function fm(i){let e=i,t=i;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==i);return t}function Pd(i,e,t,n,s,r,a,o){return(s-a)*(e-o)>=(i-a)*(r-o)&&(i-a)*(n-o)>=(t-a)*(e-o)&&(t-a)*(r-o)>=(s-a)*(n-o)}function _r(i,e,t,n,s,r,a,o){return!(i===a&&e===o)&&Pd(i,e,t,n,s,r,a,o)}function pm(i,e){return i.next.i!==e.i&&i.prev.i!==e.i&&!mm(i,e)&&(Kr(i,e)&&Kr(e,i)&&gm(i,e)&&(Mt(i.prev,i,e.prev)||Mt(i,e.prev,e))||Vs(i,e)&&Mt(i.prev,i,i.next)>0&&Mt(e.prev,e,e.next)>0)}function Mt(i,e,t){return(e.y-i.y)*(t.x-e.x)-(e.x-i.x)*(t.y-e.y)}function Vs(i,e){return i.x===e.x&&i.y===e.y}function Ld(i,e,t,n){let s=Ka(Mt(i,e,t)),r=Ka(Mt(i,e,n)),a=Ka(Mt(t,n,i)),o=Ka(Mt(t,n,e));return!!(s!==r&&a!==o||s===0&&Ja(i,t,e)||r===0&&Ja(i,n,e)||a===0&&Ja(t,i,n)||o===0&&Ja(t,e,n))}function Ja(i,e,t){return e.x<=Math.max(i.x,t.x)&&e.x>=Math.min(i.x,t.x)&&e.y<=Math.max(i.y,t.y)&&e.y>=Math.min(i.y,t.y)}function Ka(i){return i>0?1:i<0?-1:0}function mm(i,e){let t=i;do{if(t.i!==i.i&&t.next.i!==i.i&&t.i!==e.i&&t.next.i!==e.i&&Ld(t,t.next,i,e))return!0;t=t.next}while(t!==i);return!1}function Kr(i,e){return Mt(i.prev,i,i.next)<0?Mt(i,e,i.next)>=0&&Mt(i,i.prev,e)>=0:Mt(i,e,i.prev)<0||Mt(i,i.next,e)<0}function gm(i,e){let t=i,n=!1,s=(i.x+e.x)/2,r=(i.y+e.y)/2;do t.y>r!=t.next.y>r&&t.next.y!==t.y&&s<(t.next.x-t.x)*(r-t.y)/(t.next.y-t.y)+t.x&&(n=!n),t=t.next;while(t!==i);return n}function Dd(i,e){let t=Rc(i.i,i.x,i.y),n=Rc(e.i,e.x,e.y),s=i.next,r=e.prev;return i.next=e,e.prev=i,t.next=s,s.prev=t,n.next=t,t.prev=n,r.next=n,n.prev=r,n}function Cu(i,e,t,n){let s=Rc(i,e,t);return n?(s.next=n.next,s.prev=n,n.next.prev=s,n.next=s):(s.prev=s,s.next=s),s}function jr(i){i.next.prev=i.prev,i.prev.next=i.next,i.prevZ&&(i.prevZ.nextZ=i.nextZ),i.nextZ&&(i.nextZ.prevZ=i.prevZ)}function Rc(i,e,t){return{i,x:e,y:t,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function _m(i,e,t,n){let s=0;for(let r=e,a=t-n;r<t;r+=n)s+=(i[a]-i[r])*(i[r+1]+i[a+1]),a=r;return s}var Cc=class{static triangulate(e,t,n=2){return tm(e,t,n)}},Gi=class i{static area(e){let t=e.length,n=0;for(let s=t-1,r=0;r<t;s=r++)n+=e[s].x*e[r].y-e[r].x*e[s].y;return n*.5}static isClockWise(e){return i.area(e)<0}static triangulateShape(e,t){let n=[],s=[],r=[];Iu(e),Pu(n,e);let a=e.length;t.forEach(Iu);for(let l=0;l<t.length;l++)s.push(a),a+=t[l].length,Pu(n,t[l]);let o=Cc.triangulate(n,s);for(let l=0;l<o.length;l+=3)r.push(o.slice(l,l+3));return r}};function Iu(i){let e=i.length;e>2&&i[e-1].equals(i[0])&&i.pop()}function Pu(i,e){for(let t=0;t<e.length;t++)i.push(e[t].x),i.push(e[t].y)}var Qr=class i extends gt{constructor(e=new Hs([new fe(.5,.5),new fe(-.5,.5),new fe(-.5,-.5),new fe(.5,-.5)]),t={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:e,options:t},e=Array.isArray(e)?e:[e];let n=this,s=[],r=[];for(let o=0,l=e.length;o<l;o++){let c=e[o];a(c)}this.setAttribute("position",new tt(s,3)),this.setAttribute("uv",new tt(r,2)),this.computeVertexNormals();function a(o){let l=[],c=t.curveSegments!==void 0?t.curveSegments:12,u=t.steps!==void 0?t.steps:1,h=t.depth!==void 0?t.depth:1,f=t.bevelEnabled!==void 0?t.bevelEnabled:!0,d=t.bevelThickness!==void 0?t.bevelThickness:.2,m=t.bevelSize!==void 0?t.bevelSize:d-.1,_=t.bevelOffset!==void 0?t.bevelOffset:0,g=t.bevelSegments!==void 0?t.bevelSegments:3,p=t.extrudePath,E=t.UVGenerator!==void 0?t.UVGenerator:ym,v,y=!1,A,T,R,I;p&&(v=p.getSpacedPoints(u),y=!0,f=!1,A=p.computeFrenetFrames(u,!1),T=new D,R=new D,I=new D),f||(g=0,d=0,m=0,_=0);let S=o.extractPoints(c),M=S.shape,P=S.holes;if(!Gi.isClockWise(M)){M=M.reverse();for(let te=0,K=P.length;te<K;te++){let J=P[te];Gi.isClockWise(J)&&(P[te]=J.reverse())}}function V(te){let J=10000000000000001e-36,Z=te[0];for(let he=1;he<=te.length;he++){let ie=he%te.length,ue=te[ie],He=ue.x-Z.x,ze=ue.y-Z.y,w=He*He+ze*ze,x=Math.max(Math.abs(ue.x),Math.abs(ue.y),Math.abs(Z.x),Math.abs(Z.y)),z=J*x*x;if(w<=z){te.splice(ie,1),he--;continue}Z=ue}}V(M),P.forEach(V);let $=P.length,L=M;for(let te=0;te<$;te++){let K=P[te];M=M.concat(K)}function H(te,K,J){return K||console.error("THREE.ExtrudeGeometry: vec does not exist"),te.clone().addScaledVector(K,J)}let N=M.length;function k(te,K,J){let Z,he,ie,ue=te.x-K.x,He=te.y-K.y,ze=J.x-te.x,w=J.y-te.y,x=ue*ue+He*He,z=ue*w-He*ze;if(Math.abs(z)>Number.EPSILON){let X=Math.sqrt(x),ee=Math.sqrt(ze*ze+w*w),q=K.x-He/X,Ce=K.y+ue/X,ce=J.x-w/ee,Te=J.y+ze/ee,Ae=((ce-q)*w-(Te-Ce)*ze)/(ue*w-He*ze);Z=q+ue*Ae-te.x,he=Ce+He*Ae-te.y;let se=Z*Z+he*he;if(se<=2)return new fe(Z,he);ie=Math.sqrt(se/2)}else{let X=!1;ue>Number.EPSILON?ze>Number.EPSILON&&(X=!0):ue<-Number.EPSILON?ze<-Number.EPSILON&&(X=!0):Math.sign(He)===Math.sign(w)&&(X=!0),X?(Z=-He,he=ue,ie=Math.sqrt(x)):(Z=ue,he=He,ie=Math.sqrt(x/2))}return new fe(Z/ie,he/ie)}let Q=[];for(let te=0,K=L.length,J=K-1,Z=te+1;te<K;te++,J++,Z++)J===K&&(J=0),Z===K&&(Z=0),Q[te]=k(L[te],L[J],L[Z]);let le=[],ge,Ne=Q.concat();for(let te=0,K=$;te<K;te++){let J=P[te];ge=[];for(let Z=0,he=J.length,ie=he-1,ue=Z+1;Z<he;Z++,ie++,ue++)ie===he&&(ie=0),ue===he&&(ue=0),ge[Z]=k(J[Z],J[ie],J[ue]);le.push(ge),Ne=Ne.concat(ge)}let We;if(g===0)We=Gi.triangulateShape(L,P);else{let te=[],K=[];for(let J=0;J<g;J++){let Z=J/g,he=d*Math.cos(Z*Math.PI/2),ie=m*Math.sin(Z*Math.PI/2)+_;for(let ue=0,He=L.length;ue<He;ue++){let ze=H(L[ue],Q[ue],ie);Le(ze.x,ze.y,-he),Z===0&&te.push(ze)}for(let ue=0,He=$;ue<He;ue++){let ze=P[ue];ge=le[ue];let w=[];for(let x=0,z=ze.length;x<z;x++){let X=H(ze[x],ge[x],ie);Le(X.x,X.y,-he),Z===0&&w.push(X)}Z===0&&K.push(w)}}We=Gi.triangulateShape(te,K)}let et=We.length,Ke=m+_;for(let te=0;te<N;te++){let K=f?H(M[te],Ne[te],Ke):M[te];y?(R.copy(A.normals[0]).multiplyScalar(K.x),T.copy(A.binormals[0]).multiplyScalar(K.y),I.copy(v[0]).add(R).add(T),Le(I.x,I.y,I.z)):Le(K.x,K.y,0)}for(let te=1;te<=u;te++)for(let K=0;K<N;K++){let J=f?H(M[K],Ne[K],Ke):M[K];y?(R.copy(A.normals[te]).multiplyScalar(J.x),T.copy(A.binormals[te]).multiplyScalar(J.y),I.copy(v[te]).add(R).add(T),Le(I.x,I.y,I.z)):Le(J.x,J.y,h/u*te)}for(let te=g-1;te>=0;te--){let K=te/g,J=d*Math.cos(K*Math.PI/2),Z=m*Math.sin(K*Math.PI/2)+_;for(let he=0,ie=L.length;he<ie;he++){let ue=H(L[he],Q[he],Z);Le(ue.x,ue.y,h+J)}for(let he=0,ie=P.length;he<ie;he++){let ue=P[he];ge=le[he];for(let He=0,ze=ue.length;He<ze;He++){let w=H(ue[He],ge[He],Z);y?Le(w.x,w.y+v[u-1].y,v[u-1].x+J):Le(w.x,w.y,h+J)}}}Y(),ne();function Y(){let te=s.length/3;if(f){let K=0,J=N*K;for(let Z=0;Z<et;Z++){let he=We[Z];we(he[2]+J,he[1]+J,he[0]+J)}K=u+g*2,J=N*K;for(let Z=0;Z<et;Z++){let he=We[Z];we(he[0]+J,he[1]+J,he[2]+J)}}else{for(let K=0;K<et;K++){let J=We[K];we(J[2],J[1],J[0])}for(let K=0;K<et;K++){let J=We[K];we(J[0]+N*u,J[1]+N*u,J[2]+N*u)}}n.addGroup(te,s.length/3-te,0)}function ne(){let te=s.length/3,K=0;Se(L,K),K+=L.length;for(let J=0,Z=P.length;J<Z;J++){let he=P[J];Se(he,K),K+=he.length}n.addGroup(te,s.length/3-te,1)}function Se(te,K){let J=te.length;for(;--J>=0;){let Z=J,he=J-1;he<0&&(he=te.length-1);for(let ie=0,ue=u+g*2;ie<ue;ie++){let He=N*ie,ze=N*(ie+1),w=K+Z+He,x=K+he+He,z=K+he+ze,X=K+Z+ze;je(w,x,z,X)}}}function Le(te,K,J){l.push(te),l.push(K),l.push(J)}function we(te,K,J){ht(te),ht(K),ht(J);let Z=s.length/3,he=E.generateTopUV(n,s,Z-3,Z-2,Z-1);C(he[0]),C(he[1]),C(he[2])}function je(te,K,J,Z){ht(te),ht(K),ht(Z),ht(K),ht(J),ht(Z);let he=s.length/3,ie=E.generateSideWallUV(n,s,he-6,he-3,he-2,he-1);C(ie[0]),C(ie[1]),C(ie[3]),C(ie[1]),C(ie[2]),C(ie[3])}function ht(te){s.push(l[te*3+0]),s.push(l[te*3+1]),s.push(l[te*3+2])}function C(te){r.push(te.x),r.push(te.y)}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON(),t=this.parameters.shapes,n=this.parameters.options;return xm(t,n,e)}static fromJSON(e,t){let n=[];for(let r=0,a=e.shapes.length;r<a;r++){let o=t[e.shapes[r]];n.push(o)}let s=e.options.extrudePath;return s!==void 0&&(e.options.extrudePath=new go[s.type]().fromJSON(s)),new i(n,e.options)}},ym={generateTopUV:function(i,e,t,n,s){let r=e[t*3],a=e[t*3+1],o=e[n*3],l=e[n*3+1],c=e[s*3],u=e[s*3+1];return[new fe(r,a),new fe(o,l),new fe(c,u)]},generateSideWallUV:function(i,e,t,n,s,r){let a=e[t*3],o=e[t*3+1],l=e[t*3+2],c=e[n*3],u=e[n*3+1],h=e[n*3+2],f=e[s*3],d=e[s*3+1],m=e[s*3+2],_=e[r*3],g=e[r*3+1],p=e[r*3+2];return Math.abs(o-u)<Math.abs(a-c)?[new fe(a,1-l),new fe(c,1-h),new fe(f,1-m),new fe(_,1-p)]:[new fe(o,1-l),new fe(u,1-h),new fe(d,1-m),new fe(g,1-p)]}};function xm(i,e,t){if(t.shapes=[],Array.isArray(i))for(let n=0,s=i.length;n<s;n++){let r=i[n];t.shapes.push(r.uuid)}else t.shapes.push(i.uuid);return t.options=Object.assign({},e),e.extrudePath!==void 0&&(t.options.extrudePath=e.extrudePath.toJSON()),t}var jn=class i extends zs{constructor(e=1,t=0){let n=(1+Math.sqrt(5))/2,s=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],r=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(s,r,e,t),this.type="IcosahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new i(e.radius,e.detail)}};var Cn=class i extends zs{constructor(e=1,t=0){let n=[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],s=[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2];super(n,s,e,t),this.type="OctahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new i(e.radius,e.detail)}},ea=class i extends gt{constructor(e=1,t=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:s};let r=e/2,a=t/2,o=Math.floor(n),l=Math.floor(s),c=o+1,u=l+1,h=e/o,f=t/l,d=[],m=[],_=[],g=[];for(let p=0;p<u;p++){let E=p*f-a;for(let v=0;v<c;v++){let y=v*h-r;m.push(y,-E,0),_.push(0,0,1),g.push(v/o),g.push(1-p/l)}}for(let p=0;p<l;p++)for(let E=0;E<o;E++){let v=E+c*p,y=E+c*(p+1),A=E+1+c*(p+1),T=E+1+c*p;d.push(v,y,T),d.push(y,A,T)}this.setIndex(d),this.setAttribute("position",new tt(m,3)),this.setAttribute("normal",new tt(_,3)),this.setAttribute("uv",new tt(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.width,e.height,e.widthSegments,e.heightSegments)}};var Qn=class i extends gt{constructor(e=1,t=32,n=16,s=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:s,phiLength:r,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));let l=Math.min(a+o,Math.PI),c=0,u=[],h=new D,f=new D,d=[],m=[],_=[],g=[];for(let p=0;p<=n;p++){let E=[],v=p/n,y=0;p===0&&a===0?y=.5/t:p===n&&l===Math.PI&&(y=-.5/t);for(let A=0;A<=t;A++){let T=A/t;h.x=-e*Math.cos(s+T*r)*Math.sin(a+v*o),h.y=e*Math.cos(a+v*o),h.z=e*Math.sin(s+T*r)*Math.sin(a+v*o),m.push(h.x,h.y,h.z),f.copy(h).normalize(),_.push(f.x,f.y,f.z),g.push(T+y,1-v),E.push(c++)}u.push(E)}for(let p=0;p<n;p++)for(let E=0;E<t;E++){let v=u[p][E+1],y=u[p][E],A=u[p+1][E],T=u[p+1][E+1];(p!==0||a>0)&&d.push(v,y,T),(p!==n-1||l<Math.PI)&&d.push(y,A,T)}this.setIndex(d),this.setAttribute("position",new tt(m,3)),this.setAttribute("normal",new tt(_,3)),this.setAttribute("uv",new tt(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}};var In=class i extends gt{constructor(e=1,t=.4,n=12,s=48,r=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:s,arc:r},n=Math.floor(n),s=Math.floor(s);let a=[],o=[],l=[],c=[],u=new D,h=new D,f=new D;for(let d=0;d<=n;d++)for(let m=0;m<=s;m++){let _=m/s*r,g=d/n*Math.PI*2;h.x=(e+t*Math.cos(g))*Math.cos(_),h.y=(e+t*Math.cos(g))*Math.sin(_),h.z=t*Math.sin(g),o.push(h.x,h.y,h.z),u.x=e*Math.cos(_),u.y=e*Math.sin(_),f.subVectors(h,u).normalize(),l.push(f.x,f.y,f.z),c.push(m/s),c.push(d/n)}for(let d=1;d<=n;d++)for(let m=1;m<=s;m++){let _=(s+1)*d+m-1,g=(s+1)*(d-1)+m-1,p=(s+1)*(d-1)+m,E=(s+1)*d+m;a.push(_,g,E),a.push(g,p,E)}this.setIndex(a),this.setAttribute("position",new tt(o,3)),this.setAttribute("normal",new tt(l,3)),this.setAttribute("uv",new tt(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}};var Zi=class i extends gt{constructor(e=new qr(new D(-1,-1,0),new D(-1,1,0),new D(1,1,0)),t=64,n=1,s=8,r=!1){super(),this.type="TubeGeometry",this.parameters={path:e,tubularSegments:t,radius:n,radialSegments:s,closed:r};let a=e.computeFrenetFrames(t,r);this.tangents=a.tangents,this.normals=a.normals,this.binormals=a.binormals;let o=new D,l=new D,c=new fe,u=new D,h=[],f=[],d=[],m=[];_(),this.setIndex(m),this.setAttribute("position",new tt(h,3)),this.setAttribute("normal",new tt(f,3)),this.setAttribute("uv",new tt(d,2));function _(){for(let v=0;v<t;v++)g(v);g(r===!1?t:0),E(),p()}function g(v){u=e.getPointAt(v/t,u);let y=a.normals[v],A=a.binormals[v];for(let T=0;T<=s;T++){let R=T/s*Math.PI*2,I=Math.sin(R),S=-Math.cos(R);l.x=S*y.x+I*A.x,l.y=S*y.y+I*A.y,l.z=S*y.z+I*A.z,l.normalize(),f.push(l.x,l.y,l.z),o.x=u.x+n*l.x,o.y=u.y+n*l.y,o.z=u.z+n*l.z,h.push(o.x,o.y,o.z)}}function p(){for(let v=1;v<=t;v++)for(let y=1;y<=s;y++){let A=(s+1)*(v-1)+(y-1),T=(s+1)*v+(y-1),R=(s+1)*v+y,I=(s+1)*(v-1)+y;m.push(A,T,I),m.push(T,R,I)}}function E(){for(let v=0;v<=t;v++)for(let y=0;y<=s;y++)c.x=v/t,c.y=y/s,d.push(c.x,c.y)}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON();return e.path=this.parameters.path.toJSON(),e}static fromJSON(e){return new i(new go[e.path.type]().fromJSON(e.path),e.tubularSegments,e.radius,e.radialSegments,e.closed)}};var Tt=class extends Bn{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new ke(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new ke(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Yc,this.normalScale=new fe(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new on,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}};var yo=class extends Bn{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=gd,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},xo=class extends Bn{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}};var Gs=class extends zr{constructor(e){super(),this.isLineDashedMaterial=!0,this.type="LineDashedMaterial",this.scale=1,this.dashSize=3,this.gapSize=1,this.setValues(e)}copy(e){return super.copy(e),this.scale=e.scale,this.dashSize=e.dashSize,this.gapSize=e.gapSize,this}};function ja(i,e){return!i||i.constructor===e?i:typeof e.BYTES_PER_ELEMENT=="number"?new e(i):Array.prototype.slice.call(i)}function vm(i){return ArrayBuffer.isView(i)&&!(i instanceof DataView)}function Mm(i){function e(s,r){return i[s]-i[r]}let t=i.length,n=new Array(t);for(let s=0;s!==t;++s)n[s]=s;return n.sort(e),n}function Lu(i,e,t){let n=i.length,s=new i.constructor(n);for(let r=0,a=0;a!==n;++r){let o=t[r]*e;for(let l=0;l!==e;++l)s[a++]=i[o+l]}return s}function Ud(i,e,t,n){let s=1,r=i[0];for(;r!==void 0&&r[n]===void 0;)r=i[s++];if(r===void 0)return;let a=r[n];if(a!==void 0)if(Array.isArray(a))do a=r[n],a!==void 0&&(e.push(r.time),t.push(...a)),r=i[s++];while(r!==void 0);else if(a.toArray!==void 0)do a=r[n],a!==void 0&&(e.push(r.time),a.toArray(t,t.length)),r=i[s++];while(r!==void 0);else do a=r[n],a!==void 0&&(e.push(r.time),t.push(a)),r=i[s++];while(r!==void 0)}var Ji=class{constructor(e,t,n,s){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,s=t[n],r=t[n-1];e:{t:{let a;n:{i:if(!(e<s)){for(let o=n+2;;){if(s===void 0){if(e<r)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===o)break;if(r=s,s=t[++n],e<s)break t}a=t.length;break n}if(!(e>=r)){let o=t[1];e<o&&(n=2,r=o);for(let l=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===l)break;if(s=r,r=t[--n-1],e>=r)break t}a=n,n=0;break n}break e}for(;n<a;){let o=n+a>>>1;e<t[o]?a=o:n=o+1}if(s=t[n],r=t[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,s)}return this.interpolate_(n,r,e,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=e*s;for(let a=0;a!==s;++a)t[a]=n[r+a];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}},vo=class extends Ji{constructor(e,t,n,s){super(e,t,n,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Hi,endingEnd:Hi}}intervalChanged_(e,t,n){let s=this.parameterPositions,r=e-2,a=e+1,o=s[r],l=s[a];if(o===void 0)switch(this.getSettings_().endingStart){case Vi:r=e,o=2*t-n;break;case br:r=s.length-2,o=t+s[r]-s[r+1];break;default:r=e,o=n}if(l===void 0)switch(this.getSettings_().endingEnd){case Vi:a=e,l=2*n-t;break;case br:a=1,l=n+s[1]-s[0];break;default:a=e-1,l=t}let c=(n-t)*.5,u=this.valueSize;this._weightPrev=c/(t-o),this._weightNext=c/(l-n),this._offsetPrev=r*u,this._offsetNext=a*u}interpolate_(e,t,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,u=this._offsetPrev,h=this._offsetNext,f=this._weightPrev,d=this._weightNext,m=(n-t)/(s-t),_=m*m,g=_*m,p=-f*g+2*f*_-f*m,E=(1+f)*g+(-1.5-2*f)*_+(-.5+f)*m+1,v=(-1-d)*g+(1.5+d)*_+.5*m,y=d*g-d*_;for(let A=0;A!==o;++A)r[A]=p*a[u+A]+E*a[c+A]+v*a[l+A]+y*a[h+A];return r}},ta=class extends Ji{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e,t,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,u=(n-t)/(s-t),h=1-u;for(let f=0;f!==o;++f)r[f]=a[c+f]*h+a[l+f]*u;return r}},Mo=class extends Ji{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e){return this.copySampleValue_(e-1)}},jt=class{constructor(e,t,n,s){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=ja(t,this.TimeBufferType),this.values=ja(n,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:ja(e.times,Array),values:ja(e.values,Array)};let s=e.getInterpolation();s!==e.DefaultInterpolation&&(n.interpolation=s)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new Mo(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new ta(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new vo(this.times,this.values,this.getValueSize(),e)}setInterpolation(e){let t;switch(e){case Sr:t=this.InterpolantFactoryMethodDiscrete;break;case so:t=this.InterpolantFactoryMethodLinear;break;case Qa:t=this.InterpolantFactoryMethodSmooth;break}if(t===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Sr;case this.InterpolantFactoryMethodLinear:return so;case this.InterpolantFactoryMethodSmooth:return Qa}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,s=t.length;n!==s;++n)t[n]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,s=t.length;n!==s;++n)t[n]*=e}return this}trim(e,t){let n=this.times,s=n.length,r=0,a=s-1;for(;r!==s&&n[r]<e;)++r;for(;a!==-1&&n[a]>t;)--a;if(++a,r!==0||a!==s){r>=a&&(a=Math.max(a,1),r=a-1);let o=this.getValueSize();this.times=n.slice(r,a),this.values=this.values.slice(r*o,a*o)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),e=!1);let n=this.times,s=this.values,r=n.length;r===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),e=!1);let a=null;for(let o=0;o!==r;o++){let l=n[o];if(typeof l=="number"&&isNaN(l)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,o,l),e=!1;break}if(a!==null&&a>l){console.error("THREE.KeyframeTrack: Out of order keys.",this,o,l,a),e=!1;break}a=l}if(s!==void 0&&vm(s))for(let o=0,l=s.length;o!==l;++o){let c=s[o];if(isNaN(c)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,o,c),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),s=this.getInterpolation()===Qa,r=e.length-1,a=1;for(let o=1;o<r;++o){let l=!1,c=e[o],u=e[o+1];if(c!==u&&(o!==1||c!==e[0]))if(s)l=!0;else{let h=o*n,f=h-n,d=h+n;for(let m=0;m!==n;++m){let _=t[h+m];if(_!==t[f+m]||_!==t[d+m]){l=!0;break}}}if(l){if(o!==a){e[a]=e[o];let h=o*n,f=a*n;for(let d=0;d!==n;++d)t[f+d]=t[h+d]}++a}}if(r>0){e[a]=e[r];for(let o=r*n,l=a*n,c=0;c!==n;++c)t[l+c]=t[o+c];++a}return a!==e.length?(this.times=e.slice(0,a),this.values=t.slice(0,a*n)):(this.times=e,this.values=t),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=this.constructor,s=new n(this.name,e,t);return s.createInterpolant=this.createInterpolant,s}};jt.prototype.ValueTypeName="";jt.prototype.TimeBufferType=Float32Array;jt.prototype.ValueBufferType=Float32Array;jt.prototype.DefaultInterpolation=so;var ei=class extends jt{constructor(e,t,n){super(e,t,n)}};ei.prototype.ValueTypeName="bool";ei.prototype.ValueBufferType=Array;ei.prototype.DefaultInterpolation=Sr;ei.prototype.InterpolantFactoryMethodLinear=void 0;ei.prototype.InterpolantFactoryMethodSmooth=void 0;var na=class extends jt{constructor(e,t,n,s){super(e,t,n,s)}};na.prototype.ValueTypeName="color";var Ki=class extends jt{constructor(e,t,n,s){super(e,t,n,s)}};Ki.prototype.ValueTypeName="number";var So=class extends Ji{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e,t,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=(n-t)/(s-t),c=e*o;for(let u=c+o;c!==u;c+=4)qt.slerpFlat(r,0,a,c-o,a,c,l);return r}},ti=class extends jt{constructor(e,t,n,s){super(e,t,n,s)}InterpolantFactoryMethodLinear(e){return new So(this.times,this.values,this.getValueSize(),e)}};ti.prototype.ValueTypeName="quaternion";ti.prototype.InterpolantFactoryMethodSmooth=void 0;var ni=class extends jt{constructor(e,t,n){super(e,t,n)}};ni.prototype.ValueTypeName="string";ni.prototype.ValueBufferType=Array;ni.prototype.DefaultInterpolation=Sr;ni.prototype.InterpolantFactoryMethodLinear=void 0;ni.prototype.InterpolantFactoryMethodSmooth=void 0;var ji=class extends jt{constructor(e,t,n,s){super(e,t,n,s)}};ji.prototype.ValueTypeName="vector";var Pn=class{constructor(e="",t=-1,n=[],s=Sl){this.name=e,this.tracks=n,this.duration=t,this.blendMode=s,this.uuid=ai(),this.userData={},this.duration<0&&this.resetDuration()}static parse(e){let t=[],n=e.tracks,s=1/(e.fps||1);for(let a=0,o=n.length;a!==o;++a)t.push(bm(n[a]).scale(s));let r=new this(e.name,e.duration,t,e.blendMode);return r.uuid=e.uuid,r.userData=JSON.parse(e.userData||"{}"),r}static toJSON(e){let t=[],n=e.tracks,s={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode,userData:JSON.stringify(e.userData)};for(let r=0,a=n.length;r!==a;++r)t.push(jt.toJSON(n[r]));return s}static CreateFromMorphTargetSequence(e,t,n,s){let r=t.length,a=[];for(let o=0;o<r;o++){let l=[],c=[];l.push((o+r-1)%r,o,(o+1)%r),c.push(0,1,0);let u=Mm(l);l=Lu(l,1,u),c=Lu(c,1,u),!s&&l[0]===0&&(l.push(r),c.push(c[0])),a.push(new Ki(".morphTargetInfluences["+t[o].name+"]",l,c).scale(1/n))}return new this(e,-1,a)}static findByName(e,t){let n=e;if(!Array.isArray(e)){let s=e;n=s.geometry&&s.geometry.animations||s.animations}for(let s=0;s<n.length;s++)if(n[s].name===t)return n[s];return null}static CreateClipsFromMorphTargetSequences(e,t,n){let s={},r=/^([\w-]*?)([\d]+)$/;for(let o=0,l=e.length;o<l;o++){let c=e[o],u=c.name.match(r);if(u&&u.length>1){let h=u[1],f=s[h];f||(s[h]=f=[]),f.push(c)}}let a=[];for(let o in s)a.push(this.CreateFromMorphTargetSequence(o,s[o],t,n));return a}static parseAnimation(e,t){if(console.warn("THREE.AnimationClip: parseAnimation() is deprecated and will be removed with r185"),!e)return console.error("THREE.AnimationClip: No animation in JSONLoader data."),null;let n=function(h,f,d,m,_){if(d.length!==0){let g=[],p=[];Ud(d,g,p,m),g.length!==0&&_.push(new h(f,g,p))}},s=[],r=e.name||"default",a=e.fps||30,o=e.blendMode,l=e.length||-1,c=e.hierarchy||[];for(let h=0;h<c.length;h++){let f=c[h].keys;if(!(!f||f.length===0))if(f[0].morphTargets){let d={},m;for(m=0;m<f.length;m++)if(f[m].morphTargets)for(let _=0;_<f[m].morphTargets.length;_++)d[f[m].morphTargets[_]]=-1;for(let _ in d){let g=[],p=[];for(let E=0;E!==f[m].morphTargets.length;++E){let v=f[m];g.push(v.time),p.push(v.morphTarget===_?1:0)}s.push(new Ki(".morphTargetInfluence["+_+"]",g,p))}l=d.length*a}else{let d=".bones["+t[h].name+"]";n(ji,d+".position",f,"pos",s),n(ti,d+".quaternion",f,"rot",s),n(ji,d+".scale",f,"scl",s)}}return s.length===0?null:new this(r,l,s,o)}resetDuration(){let e=this.tracks,t=0;for(let n=0,s=e.length;n!==s;++n){let r=this.tracks[n];t=Math.max(t,r.times[r.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){let e=[];for(let n=0;n<this.tracks.length;n++)e.push(this.tracks[n].clone());let t=new this.constructor(this.name,this.duration,e,this.blendMode);return t.userData=JSON.parse(JSON.stringify(this.userData)),t}toJSON(){return this.constructor.toJSON(this)}};function Sm(i){switch(i.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return Ki;case"vector":case"vector2":case"vector3":case"vector4":return ji;case"color":return na;case"quaternion":return ti;case"bool":case"boolean":return ei;case"string":return ni}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+i)}function bm(i){if(i.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");let e=Sm(i.type);if(i.times===void 0){let t=[],n=[];Ud(i.keys,t,n,"value"),i.times=t,i.values=n}return e.parse!==void 0?e.parse(i):new e(i.name,i.times,i.values,i.interpolation)}var bo=class{constructor(e,t,n){let s=this,r=!1,a=0,o=0,l,c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this.abortController=new AbortController,this.itemStart=function(u){o++,r===!1&&s.onStart!==void 0&&s.onStart(u,a,o),r=!0},this.itemEnd=function(u){a++,s.onProgress!==void 0&&s.onProgress(u,a,o),a===o&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(u){s.onError!==void 0&&s.onError(u)},this.resolveURL=function(u){return l?l(u):u},this.setURLModifier=function(u){return l=u,this},this.addHandler=function(u,h){return c.push(u,h),this},this.removeHandler=function(u){let h=c.indexOf(u);return h!==-1&&c.splice(h,2),this},this.getHandler=function(u){for(let h=0,f=c.length;h<f;h+=2){let d=c[h],m=c[h+1];if(d.global&&(d.lastIndex=0),d.test(u))return m}return null},this.abort=function(){return this.abortController.abort(),this.abortController=new AbortController,this}}},Nd=new bo,Eo=class{constructor(e){this.manager=e!==void 0?e:Nd,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){let n=this;return new Promise(function(s,r){n.load(e,s,t,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}};Eo.DEFAULT_MATERIAL_NAME="__DEFAULT";var ia=class extends pt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new ke(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}},sa=class extends ia{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(pt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new ke(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}},Sc=new Ye,Du=new D,Uu=new D,Ic=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new fe(512,512),this.mapType=Ln,this.map=null,this.mapPass=null,this.matrix=new Ye,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Fs,this._frameExtents=new fe(1,1),this._viewportCount=1,this._viewports=[new ft(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera,n=this.matrix;Du.setFromMatrixPosition(e.matrixWorld),t.position.copy(Du),Uu.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Uu),t.updateMatrixWorld(),Sc.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Sc,t.coordinateSystem,t.reversedDepth),t.reversedDepth?n.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Sc)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}};var ra=class extends Ir{constructor(e=-1,t=1,n=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2,r=n-e,a=n+e,o=s+t,l=s-t;if(this.view!==null&&this.view.enabled){let c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,a=r+c*this.view.width,o-=u*this.view.offsetY,l=o-u*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},Pc=class extends Ic{constructor(){super(new ra(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},aa=class extends ia{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(pt.DEFAULT_UP),this.updateMatrix(),this.target=new pt,this.shadow=new Pc}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}};var wo=class extends Vt{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}};var To=class{constructor(e,t,n){this.binding=e,this.valueSize=n;let s,r,a;switch(t){case"quaternion":s=this._slerp,r=this._slerpAdditive,a=this._setAdditiveIdentityQuaternion,this.buffer=new Float64Array(n*6),this._workIndex=5;break;case"string":case"bool":s=this._select,r=this._select,a=this._setAdditiveIdentityOther,this.buffer=new Array(n*5);break;default:s=this._lerp,r=this._lerpAdditive,a=this._setAdditiveIdentityNumeric,this.buffer=new Float64Array(n*5)}this._mixBufferRegion=s,this._mixBufferRegionAdditive=r,this._setIdentity=a,this._origIndex=3,this._addIndex=4,this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,this.useCount=0,this.referenceCount=0}accumulate(e,t){let n=this.buffer,s=this.valueSize,r=e*s+s,a=this.cumulativeWeight;if(a===0){for(let o=0;o!==s;++o)n[r+o]=n[o];a=t}else{a+=t;let o=t/a;this._mixBufferRegion(n,r,0,o,s)}this.cumulativeWeight=a}accumulateAdditive(e){let t=this.buffer,n=this.valueSize,s=n*this._addIndex;this.cumulativeWeightAdditive===0&&this._setIdentity(),this._mixBufferRegionAdditive(t,s,0,e,n),this.cumulativeWeightAdditive+=e}apply(e){let t=this.valueSize,n=this.buffer,s=e*t+t,r=this.cumulativeWeight,a=this.cumulativeWeightAdditive,o=this.binding;if(this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,r<1){let l=t*this._origIndex;this._mixBufferRegion(n,s,l,1-r,t)}a>0&&this._mixBufferRegionAdditive(n,s,this._addIndex*t,1,t);for(let l=t,c=t+t;l!==c;++l)if(n[l]!==n[l+t]){o.setValue(n,s);break}}saveOriginalState(){let e=this.binding,t=this.buffer,n=this.valueSize,s=n*this._origIndex;e.getValue(t,s);for(let r=n,a=s;r!==a;++r)t[r]=t[s+r%n];this._setIdentity(),this.cumulativeWeight=0,this.cumulativeWeightAdditive=0}restoreOriginalState(){let e=this.valueSize*3;this.binding.setValue(this.buffer,e)}_setAdditiveIdentityNumeric(){let e=this._addIndex*this.valueSize,t=e+this.valueSize;for(let n=e;n<t;n++)this.buffer[n]=0}_setAdditiveIdentityQuaternion(){this._setAdditiveIdentityNumeric(),this.buffer[this._addIndex*this.valueSize+3]=1}_setAdditiveIdentityOther(){let e=this._origIndex*this.valueSize,t=this._addIndex*this.valueSize;for(let n=0;n<this.valueSize;n++)this.buffer[t+n]=this.buffer[e+n]}_select(e,t,n,s,r){if(s>=.5)for(let a=0;a!==r;++a)e[t+a]=e[n+a]}_slerp(e,t,n,s){qt.slerpFlat(e,t,e,t,e,n,s)}_slerpAdditive(e,t,n,s,r){let a=this._workIndex*r;qt.multiplyQuaternionsFlat(e,a,e,t,e,n),qt.slerpFlat(e,t,e,t,e,a,s)}_lerp(e,t,n,s,r){let a=1-s;for(let o=0;o!==r;++o){let l=t+o;e[l]=e[l]*a+e[n+o]*s}}_lerpAdditive(e,t,n,s,r){for(let a=0;a!==r;++a){let o=t+a;e[o]=e[o]+e[n+a]*s}}},th="\\[\\]\\.:\\/",Em=new RegExp("["+th+"]","g"),nh="[^"+th+"]",wm="[^"+th.replace("\\.","")+"]",Tm=/((?:WC+[\/:])*)/.source.replace("WC",nh),Am=/(WCOD+)?/.source.replace("WCOD",wm),Rm=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",nh),Cm=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",nh),Im=new RegExp("^"+Tm+Am+Rm+Cm+"$"),Pm=["material","materials","bones","map"],Lc=class{constructor(e,t,n){let s=n||dt.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,s)}getValue(e,t){this.bind();let n=this._targetGroup.nCachedObjects_,s=this._bindings[n];s!==void 0&&s.getValue(e,t)}setValue(e,t){let n=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=n.length;s!==r;++s)n[s].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}},dt=class i{constructor(e,t,n){this.path=t,this.parsedPath=n||i.parseTrackName(t),this.node=i.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new i.Composite(e,t,n):new i(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(Em,"")}static parseTrackName(e){let t=Im.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},s=n.nodeName&&n.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){let r=n.nodeName.substring(s+1);Pm.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,s),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(r){for(let a=0;a<r.length;a++){let o=r[a];if(o.name===t||o.uuid===t)return o;let l=n(o.children);if(l)return l}return null},s=n(e.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)e[t++]=n[s]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node,t=this.parsedPath,n=t.objectName,s=t.propertyName,r=t.propertyIndex;if(e||(e=i.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let c=t.objectIndex;switch(n){case"materials":if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let u=0;u<e.length;u++)if(e[u].name===c){c=u;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(c!==void 0){if(e[c]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[c]}}let a=e[s];if(a===void 0){let c=t.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+c+"."+s+" but it wasn't found.",e);return}let o=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?o=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!e.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[r]!==void 0&&(r=e.morphTargetDictionary[r])}l=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=r}else a.fromArray!==void 0&&a.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(l=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=s;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};dt.Composite=Lc;dt.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};dt.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};dt.prototype.GetterByBindingType=[dt.prototype._getValue_direct,dt.prototype._getValue_array,dt.prototype._getValue_arrayElement,dt.prototype._getValue_toArray];dt.prototype.SetterByBindingTypeAndVersioning=[[dt.prototype._setValue_direct,dt.prototype._setValue_direct_setNeedsUpdate,dt.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[dt.prototype._setValue_array,dt.prototype._setValue_array_setNeedsUpdate,dt.prototype._setValue_array_setMatrixWorldNeedsUpdate],[dt.prototype._setValue_arrayElement,dt.prototype._setValue_arrayElement_setNeedsUpdate,dt.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[dt.prototype._setValue_fromArray,dt.prototype._setValue_fromArray_setNeedsUpdate,dt.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var Ao=class{constructor(e,t,n=null,s=t.blendMode){this._mixer=e,this._clip=t,this._localRoot=n,this.blendMode=s;let r=t.tracks,a=r.length,o=new Array(a),l={endingStart:Hi,endingEnd:Hi};for(let c=0;c!==a;++c){let u=r[c].createInterpolant(null);o[c]=u,u.settings=l}this._interpolantSettings=l,this._interpolants=o,this._propertyBindings=new Array(a),this._cacheIndex=null,this._byClipCacheIndex=null,this._timeScaleInterpolant=null,this._weightInterpolant=null,this.loop=fd,this._loopCount=-1,this._startTime=null,this.time=0,this.timeScale=1,this._effectiveTimeScale=1,this.weight=1,this._effectiveWeight=1,this.repetitions=1/0,this.paused=!1,this.enabled=!0,this.clampWhenFinished=!1,this.zeroSlopeAtStart=!0,this.zeroSlopeAtEnd=!0}play(){return this._mixer._activateAction(this),this}stop(){return this._mixer._deactivateAction(this),this.reset()}reset(){return this.paused=!1,this.enabled=!0,this.time=0,this._loopCount=-1,this._startTime=null,this.stopFading().stopWarping()}isRunning(){return this.enabled&&!this.paused&&this.timeScale!==0&&this._startTime===null&&this._mixer._isActiveAction(this)}isScheduled(){return this._mixer._isActiveAction(this)}startAt(e){return this._startTime=e,this}setLoop(e,t){return this.loop=e,this.repetitions=t,this}setEffectiveWeight(e){return this.weight=e,this._effectiveWeight=this.enabled?e:0,this.stopFading()}getEffectiveWeight(){return this._effectiveWeight}fadeIn(e){return this._scheduleFading(e,0,1)}fadeOut(e){return this._scheduleFading(e,1,0)}crossFadeFrom(e,t,n=!1){if(e.fadeOut(t),this.fadeIn(t),n===!0){let s=this._clip.duration,r=e._clip.duration,a=r/s,o=s/r;e.warp(1,a,t),this.warp(o,1,t)}return this}crossFadeTo(e,t,n=!1){return e.crossFadeFrom(this,t,n)}stopFading(){let e=this._weightInterpolant;return e!==null&&(this._weightInterpolant=null,this._mixer._takeBackControlInterpolant(e)),this}setEffectiveTimeScale(e){return this.timeScale=e,this._effectiveTimeScale=this.paused?0:e,this.stopWarping()}getEffectiveTimeScale(){return this._effectiveTimeScale}setDuration(e){return this.timeScale=this._clip.duration/e,this.stopWarping()}syncWith(e){return this.time=e.time,this.timeScale=e.timeScale,this.stopWarping()}halt(e){return this.warp(this._effectiveTimeScale,0,e)}warp(e,t,n){let s=this._mixer,r=s.time,a=this.timeScale,o=this._timeScaleInterpolant;o===null&&(o=s._lendControlInterpolant(),this._timeScaleInterpolant=o);let l=o.parameterPositions,c=o.sampleValues;return l[0]=r,l[1]=r+n,c[0]=e/a,c[1]=t/a,this}stopWarping(){let e=this._timeScaleInterpolant;return e!==null&&(this._timeScaleInterpolant=null,this._mixer._takeBackControlInterpolant(e)),this}getMixer(){return this._mixer}getClip(){return this._clip}getRoot(){return this._localRoot||this._mixer._root}_update(e,t,n,s){if(!this.enabled){this._updateWeight(e);return}let r=this._startTime;if(r!==null){let l=(e-r)*n;l<0||n===0?t=0:(this._startTime=null,t=n*l)}t*=this._updateTimeScale(e);let a=this._updateTime(t),o=this._updateWeight(e);if(o>0){let l=this._interpolants,c=this._propertyBindings;switch(this.blendMode){case md:for(let u=0,h=l.length;u!==h;++u)l[u].evaluate(a),c[u].accumulateAdditive(o);break;case Sl:default:for(let u=0,h=l.length;u!==h;++u)l[u].evaluate(a),c[u].accumulate(s,o)}}}_updateWeight(e){let t=0;if(this.enabled){t=this.weight;let n=this._weightInterpolant;if(n!==null){let s=n.evaluate(e)[0];t*=s,e>n.parameterPositions[1]&&(this.stopFading(),s===0&&(this.enabled=!1))}}return this._effectiveWeight=t,t}_updateTimeScale(e){let t=0;if(!this.paused){t=this.timeScale;let n=this._timeScaleInterpolant;if(n!==null){let s=n.evaluate(e)[0];t*=s,e>n.parameterPositions[1]&&(this.stopWarping(),t===0?this.paused=!0:this.timeScale=t)}}return this._effectiveTimeScale=t,t}_updateTime(e){let t=this._clip.duration,n=this.loop,s=this.time+e,r=this._loopCount,a=n===pd;if(e===0)return r===-1?s:a&&(r&1)===1?t-s:s;if(n===Ml){r===-1&&(this._loopCount=0,this._setEndings(!0,!0,!1));e:{if(s>=t)s=t;else if(s<0)s=0;else{this.time=s;break e}this.clampWhenFinished?this.paused=!0:this.enabled=!1,this.time=s,this._mixer.dispatchEvent({type:"finished",action:this,direction:e<0?-1:1})}}else{if(r===-1&&(e>=0?(r=0,this._setEndings(!0,this.repetitions===0,a)):this._setEndings(this.repetitions===0,!0,a)),s>=t||s<0){let o=Math.floor(s/t);s-=t*o,r+=Math.abs(o);let l=this.repetitions-r;if(l<=0)this.clampWhenFinished?this.paused=!0:this.enabled=!1,s=e>0?t:0,this.time=s,this._mixer.dispatchEvent({type:"finished",action:this,direction:e>0?1:-1});else{if(l===1){let c=e<0;this._setEndings(c,!c,a)}else this._setEndings(!1,!1,a);this._loopCount=r,this.time=s,this._mixer.dispatchEvent({type:"loop",action:this,loopDelta:o})}}else this.time=s;if(a&&(r&1)===1)return t-s}return s}_setEndings(e,t,n){let s=this._interpolantSettings;n?(s.endingStart=Vi,s.endingEnd=Vi):(e?s.endingStart=this.zeroSlopeAtStart?Vi:Hi:s.endingStart=br,t?s.endingEnd=this.zeroSlopeAtEnd?Vi:Hi:s.endingEnd=br)}_scheduleFading(e,t,n){let s=this._mixer,r=s.time,a=this._weightInterpolant;a===null&&(a=s._lendControlInterpolant(),this._weightInterpolant=a);let o=a.parameterPositions,l=a.sampleValues;return o[0]=r,l[0]=t,o[1]=r+e,l[1]=n,this}},Lm=new Float32Array(1),oa=class extends Fn{constructor(e){super(),this._root=e,this._initMemoryManager(),this._accuIndex=0,this.time=0,this.timeScale=1}_bindAction(e,t){let n=e._localRoot||this._root,s=e._clip.tracks,r=s.length,a=e._propertyBindings,o=e._interpolants,l=n.uuid,c=this._bindingsByRootAndName,u=c[l];u===void 0&&(u={},c[l]=u);for(let h=0;h!==r;++h){let f=s[h],d=f.name,m=u[d];if(m!==void 0)++m.referenceCount,a[h]=m;else{if(m=a[h],m!==void 0){m._cacheIndex===null&&(++m.referenceCount,this._addInactiveBinding(m,l,d));continue}let _=t&&t._propertyBindings[h].binding.parsedPath;m=new To(dt.create(n,d,_),f.ValueTypeName,f.getValueSize()),++m.referenceCount,this._addInactiveBinding(m,l,d),a[h]=m}o[h].resultBuffer=m.buffer}}_activateAction(e){if(!this._isActiveAction(e)){if(e._cacheIndex===null){let n=(e._localRoot||this._root).uuid,s=e._clip.uuid,r=this._actionsByClip[s];this._bindAction(e,r&&r.knownActions[0]),this._addInactiveAction(e,s,n)}let t=e._propertyBindings;for(let n=0,s=t.length;n!==s;++n){let r=t[n];r.useCount++===0&&(this._lendBinding(r),r.saveOriginalState())}this._lendAction(e)}}_deactivateAction(e){if(this._isActiveAction(e)){let t=e._propertyBindings;for(let n=0,s=t.length;n!==s;++n){let r=t[n];--r.useCount===0&&(r.restoreOriginalState(),this._takeBackBinding(r))}this._takeBackAction(e)}}_initMemoryManager(){this._actions=[],this._nActiveActions=0,this._actionsByClip={},this._bindings=[],this._nActiveBindings=0,this._bindingsByRootAndName={},this._controlInterpolants=[],this._nActiveControlInterpolants=0;let e=this;this.stats={actions:{get total(){return e._actions.length},get inUse(){return e._nActiveActions}},bindings:{get total(){return e._bindings.length},get inUse(){return e._nActiveBindings}},controlInterpolants:{get total(){return e._controlInterpolants.length},get inUse(){return e._nActiveControlInterpolants}}}}_isActiveAction(e){let t=e._cacheIndex;return t!==null&&t<this._nActiveActions}_addInactiveAction(e,t,n){let s=this._actions,r=this._actionsByClip,a=r[t];if(a===void 0)a={knownActions:[e],actionByRoot:{}},e._byClipCacheIndex=0,r[t]=a;else{let o=a.knownActions;e._byClipCacheIndex=o.length,o.push(e)}e._cacheIndex=s.length,s.push(e),a.actionByRoot[n]=e}_removeInactiveAction(e){let t=this._actions,n=t[t.length-1],s=e._cacheIndex;n._cacheIndex=s,t[s]=n,t.pop(),e._cacheIndex=null;let r=e._clip.uuid,a=this._actionsByClip,o=a[r],l=o.knownActions,c=l[l.length-1],u=e._byClipCacheIndex;c._byClipCacheIndex=u,l[u]=c,l.pop(),e._byClipCacheIndex=null;let h=o.actionByRoot,f=(e._localRoot||this._root).uuid;delete h[f],l.length===0&&delete a[r],this._removeInactiveBindingsForAction(e)}_removeInactiveBindingsForAction(e){let t=e._propertyBindings;for(let n=0,s=t.length;n!==s;++n){let r=t[n];--r.referenceCount===0&&this._removeInactiveBinding(r)}}_lendAction(e){let t=this._actions,n=e._cacheIndex,s=this._nActiveActions++,r=t[s];e._cacheIndex=s,t[s]=e,r._cacheIndex=n,t[n]=r}_takeBackAction(e){let t=this._actions,n=e._cacheIndex,s=--this._nActiveActions,r=t[s];e._cacheIndex=s,t[s]=e,r._cacheIndex=n,t[n]=r}_addInactiveBinding(e,t,n){let s=this._bindingsByRootAndName,r=this._bindings,a=s[t];a===void 0&&(a={},s[t]=a),a[n]=e,e._cacheIndex=r.length,r.push(e)}_removeInactiveBinding(e){let t=this._bindings,n=e.binding,s=n.rootNode.uuid,r=n.path,a=this._bindingsByRootAndName,o=a[s],l=t[t.length-1],c=e._cacheIndex;l._cacheIndex=c,t[c]=l,t.pop(),delete o[r],Object.keys(o).length===0&&delete a[s]}_lendBinding(e){let t=this._bindings,n=e._cacheIndex,s=this._nActiveBindings++,r=t[s];e._cacheIndex=s,t[s]=e,r._cacheIndex=n,t[n]=r}_takeBackBinding(e){let t=this._bindings,n=e._cacheIndex,s=--this._nActiveBindings,r=t[s];e._cacheIndex=s,t[s]=e,r._cacheIndex=n,t[n]=r}_lendControlInterpolant(){let e=this._controlInterpolants,t=this._nActiveControlInterpolants++,n=e[t];return n===void 0&&(n=new ta(new Float32Array(2),new Float32Array(2),1,Lm),n.__cacheIndex=t,e[t]=n),n}_takeBackControlInterpolant(e){let t=this._controlInterpolants,n=e.__cacheIndex,s=--this._nActiveControlInterpolants,r=t[s];e.__cacheIndex=s,t[s]=e,r.__cacheIndex=n,t[n]=r}clipAction(e,t,n){let s=t||this._root,r=s.uuid,a=typeof e=="string"?Pn.findByName(s,e):e,o=a!==null?a.uuid:e,l=this._actionsByClip[o],c=null;if(n===void 0&&(a!==null?n=a.blendMode:n=Sl),l!==void 0){let h=l.actionByRoot[r];if(h!==void 0&&h.blendMode===n)return h;c=l.knownActions[0],a===null&&(a=c._clip)}if(a===null)return null;let u=new Ao(this,a,t,n);return this._bindAction(u,c),this._addInactiveAction(u,o,r),u}existingAction(e,t){let n=t||this._root,s=n.uuid,r=typeof e=="string"?Pn.findByName(n,e):e,a=r?r.uuid:e,o=this._actionsByClip[a];return o!==void 0&&o.actionByRoot[s]||null}stopAllAction(){let e=this._actions,t=this._nActiveActions;for(let n=t-1;n>=0;--n)e[n].stop();return this}update(e){e*=this.timeScale;let t=this._actions,n=this._nActiveActions,s=this.time+=e,r=Math.sign(e),a=this._accuIndex^=1;for(let c=0;c!==n;++c)t[c]._update(s,e,r,a);let o=this._bindings,l=this._nActiveBindings;for(let c=0;c!==l;++c)o[c].apply(a);return this}setTime(e){this.time=0;for(let t=0;t<this._actions.length;t++)this._actions[t].time=0;return this.update(e)}getRoot(){return this._root}uncacheClip(e){let t=this._actions,n=e.uuid,s=this._actionsByClip,r=s[n];if(r!==void 0){let a=r.knownActions;for(let o=0,l=a.length;o!==l;++o){let c=a[o];this._deactivateAction(c);let u=c._cacheIndex,h=t[t.length-1];c._cacheIndex=null,c._byClipCacheIndex=null,h._cacheIndex=u,t[u]=h,t.pop(),this._removeInactiveBindingsForAction(c)}delete s[n]}}uncacheRoot(e){let t=e.uuid,n=this._actionsByClip;for(let a in n){let o=n[a].actionByRoot,l=o[t];l!==void 0&&(this._deactivateAction(l),this._removeInactiveAction(l))}let s=this._bindingsByRootAndName,r=s[t];if(r!==void 0)for(let a in r){let o=r[a];o.restoreOriginalState(),this._removeInactiveBinding(o)}}uncacheAction(e,t){let n=this.existingAction(e,t);n!==null&&(this._deactivateAction(n),this._removeInactiveAction(n))}};var Nu=new Ye,Qi=class{constructor(e,t,n=0,s=1/0){this.ray=new Si(e,t),this.near=n,this.far=s,this.camera=null,this.layers=new Us,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):console.error("THREE.Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return Nu.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Nu),this}intersectObject(e,t=!0,n=[]){return Dc(e,this,n,t),n.sort(Fu),n}intersectObjects(e,t=!0,n=[]){for(let s=0,r=e.length;s<r;s++)Dc(e[s],this,n,t);return n.sort(Fu),n}};function Fu(i,e){return i.distance-e.distance}function Dc(i,e,t,n){let s=!0;if(i.layers.test(e.layers)&&i.raycast(e,t)===!1&&(s=!1),s===!0&&n===!0){let r=i.children;for(let a=0,o=r.length;a<o;a++)Dc(r[a],e,t,!0)}}function ih(i,e,t,n){let s=Dm(n);switch(t){case Xc:return i*e;case Go:return i*e/s.components*s.byteLength;case Wo:return i*e/s.components*s.byteLength;case qc:return i*e*2/s.components*s.byteLength;case Xo:return i*e*2/s.components*s.byteLength;case $c:return i*e*3/s.components*s.byteLength;case dn:return i*e*4/s.components*s.byteLength;case $o:return i*e*4/s.components*s.byteLength;case ha:case ua:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case da:case fa:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Yo:case Jo:return Math.max(i,16)*Math.max(e,8)/4;case qo:case Zo:return Math.max(i,8)*Math.max(e,8)/2;case Ko:case jo:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case Qo:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case el:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case tl:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case nl:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case il:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case sl:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case rl:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case al:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case ol:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case ll:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case cl:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case hl:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case ul:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case dl:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case fl:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case pl:case ml:case gl:return Math.ceil(i/4)*Math.ceil(e/4)*16;case _l:case yl:return Math.ceil(i/4)*Math.ceil(e/4)*8;case xl:case vl:return Math.ceil(i/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function Dm(i){switch(i){case Ln:case Hc:return{byteLength:1,components:1};case Ws:case Vc:case Xs:return{byteLength:2,components:1};case Ho:case Vo:return{byteLength:2,components:4};case wi:case ko:case xn:return{byteLength:4,components:1};case Gc:case Wc:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"180"}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="180");function af(){let i=null,e=!1,t=null,n=null;function s(r,a){t(r,a),n=i.requestAnimationFrame(s)}return{start:function(){e!==!0&&t!==null&&(n=i.requestAnimationFrame(s),e=!0)},stop:function(){i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){i=r}}}function Nm(i){let e=new WeakMap;function t(o,l){let c=o.array,u=o.usage,h=c.byteLength,f=i.createBuffer();i.bindBuffer(l,f),i.bufferData(l,c,u),o.onUploadCallback();let d;if(c instanceof Float32Array)d=i.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)d=i.HALF_FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?d=i.HALF_FLOAT:d=i.UNSIGNED_SHORT;else if(c instanceof Int16Array)d=i.SHORT;else if(c instanceof Uint32Array)d=i.UNSIGNED_INT;else if(c instanceof Int32Array)d=i.INT;else if(c instanceof Int8Array)d=i.BYTE;else if(c instanceof Uint8Array)d=i.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)d=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:f,type:d,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:h}}function n(o,l,c){let u=l.array,h=l.updateRanges;if(i.bindBuffer(c,o),h.length===0)i.bufferSubData(c,0,u);else{h.sort((d,m)=>d.start-m.start);let f=0;for(let d=1;d<h.length;d++){let m=h[f],_=h[d];_.start<=m.start+m.count+1?m.count=Math.max(m.count,_.start+_.count-m.start):(++f,h[f]=_)}h.length=f+1;for(let d=0,m=h.length;d<m;d++){let _=h[d];i.bufferSubData(c,_.start*u.BYTES_PER_ELEMENT,u,_.start,_.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);let l=e.get(o);l&&(i.deleteBuffer(l.buffer),e.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){let u=e.get(o);(!u||u.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}let c=e.get(o);if(c===void 0)e.set(o,t(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,o,l),c.version=o.version}}return{get:s,remove:r,update:a}}var Fm=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Om=`#ifdef USE_ALPHAHASH
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
#endif`,Bm=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,zm=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,km=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Hm=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Vm=`#ifdef USE_AOMAP
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
#endif`,Gm=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Wm=`#ifdef USE_BATCHING
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
#endif`,Xm=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,$m=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,qm=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Ym=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Zm=`#ifdef USE_IRIDESCENCE
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
#endif`,Jm=`#ifdef USE_BUMPMAP
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
#endif`,Km=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,jm=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Qm=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,eg=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,tg=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,ng=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,ig=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,sg=`#if defined( USE_COLOR_ALPHA )
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
#endif`,rg=`#define PI 3.141592653589793
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
} // validated`,ag=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,og=`vec3 transformedNormal = objectNormal;
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
#endif`,lg=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,cg=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,hg=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,ug=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,dg="gl_FragColor = linearToOutputTexel( gl_FragColor );",fg=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,pg=`#ifdef USE_ENVMAP
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
#endif`,mg=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,gg=`#ifdef USE_ENVMAP
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
#endif`,_g=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,yg=`#ifdef USE_ENVMAP
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
#endif`,xg=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,vg=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Mg=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Sg=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,bg=`#ifdef USE_GRADIENTMAP
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
}`,Eg=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,wg=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Tg=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Ag=`uniform bool receiveShadow;
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
#endif`,Rg=`#ifdef USE_ENVMAP
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
#endif`,Cg=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Ig=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Pg=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Lg=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Dg=`PhysicalMaterial material;
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
#endif`,Ug=`struct PhysicalMaterial {
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
}`,Ng=`
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
#endif`,Fg=`#if defined( RE_IndirectDiffuse )
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
#endif`,Og=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Bg=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,zg=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,kg=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Hg=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Vg=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Gg=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Wg=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Xg=`#if defined( USE_POINTS_UV )
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
#endif`,$g=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,qg=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Yg=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Zg=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Jg=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Kg=`#ifdef USE_MORPHTARGETS
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
#endif`,jg=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Qg=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,e0=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,t0=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,n0=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,i0=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,s0=`#ifdef USE_NORMALMAP
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
#endif`,r0=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,a0=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,o0=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,l0=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,c0=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,h0=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,u0=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,d0=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,f0=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,p0=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,m0=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,g0=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,_0=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,y0=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,x0=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,v0=`float getShadowMask() {
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
}`,M0=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,S0=`#ifdef USE_SKINNING
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
#endif`,b0=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,E0=`#ifdef USE_SKINNING
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
#endif`,w0=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,T0=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,A0=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,R0=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,C0=`#ifdef USE_TRANSMISSION
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
#endif`,I0=`#ifdef USE_TRANSMISSION
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
#endif`,P0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,L0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,D0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,U0=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,N0=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,F0=`uniform sampler2D t2D;
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
}`,O0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,B0=`#ifdef ENVMAP_TYPE_CUBE
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
}`,z0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,k0=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,H0=`#include <common>
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
}`,V0=`#if DEPTH_PACKING == 3200
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
}`,G0=`#define DISTANCE
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
}`,W0=`#define DISTANCE
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
}`,X0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,$0=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,q0=`uniform float scale;
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
}`,Y0=`uniform vec3 diffuse;
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
}`,Z0=`#include <common>
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
}`,J0=`uniform vec3 diffuse;
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
}`,K0=`#define LAMBERT
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
}`,j0=`#define LAMBERT
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
}`,Q0=`#define MATCAP
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
}`,e_=`#define MATCAP
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
}`,t_=`#define NORMAL
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
}`,n_=`#define NORMAL
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
}`,i_=`#define PHONG
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
}`,s_=`#define PHONG
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
}`,r_=`#define STANDARD
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
}`,a_=`#define STANDARD
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
}`,o_=`#define TOON
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
}`,l_=`#define TOON
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
}`,c_=`uniform float size;
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
}`,h_=`uniform vec3 diffuse;
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
}`,u_=`#include <common>
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
}`,d_=`uniform vec3 color;
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
}`,f_=`uniform float rotation;
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
}`,p_=`uniform vec3 diffuse;
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
}`,$e={alphahash_fragment:Fm,alphahash_pars_fragment:Om,alphamap_fragment:Bm,alphamap_pars_fragment:zm,alphatest_fragment:km,alphatest_pars_fragment:Hm,aomap_fragment:Vm,aomap_pars_fragment:Gm,batching_pars_vertex:Wm,batching_vertex:Xm,begin_vertex:$m,beginnormal_vertex:qm,bsdfs:Ym,iridescence_fragment:Zm,bumpmap_pars_fragment:Jm,clipping_planes_fragment:Km,clipping_planes_pars_fragment:jm,clipping_planes_pars_vertex:Qm,clipping_planes_vertex:eg,color_fragment:tg,color_pars_fragment:ng,color_pars_vertex:ig,color_vertex:sg,common:rg,cube_uv_reflection_fragment:ag,defaultnormal_vertex:og,displacementmap_pars_vertex:lg,displacementmap_vertex:cg,emissivemap_fragment:hg,emissivemap_pars_fragment:ug,colorspace_fragment:dg,colorspace_pars_fragment:fg,envmap_fragment:pg,envmap_common_pars_fragment:mg,envmap_pars_fragment:gg,envmap_pars_vertex:_g,envmap_physical_pars_fragment:Rg,envmap_vertex:yg,fog_vertex:xg,fog_pars_vertex:vg,fog_fragment:Mg,fog_pars_fragment:Sg,gradientmap_pars_fragment:bg,lightmap_pars_fragment:Eg,lights_lambert_fragment:wg,lights_lambert_pars_fragment:Tg,lights_pars_begin:Ag,lights_toon_fragment:Cg,lights_toon_pars_fragment:Ig,lights_phong_fragment:Pg,lights_phong_pars_fragment:Lg,lights_physical_fragment:Dg,lights_physical_pars_fragment:Ug,lights_fragment_begin:Ng,lights_fragment_maps:Fg,lights_fragment_end:Og,logdepthbuf_fragment:Bg,logdepthbuf_pars_fragment:zg,logdepthbuf_pars_vertex:kg,logdepthbuf_vertex:Hg,map_fragment:Vg,map_pars_fragment:Gg,map_particle_fragment:Wg,map_particle_pars_fragment:Xg,metalnessmap_fragment:$g,metalnessmap_pars_fragment:qg,morphinstance_vertex:Yg,morphcolor_vertex:Zg,morphnormal_vertex:Jg,morphtarget_pars_vertex:Kg,morphtarget_vertex:jg,normal_fragment_begin:Qg,normal_fragment_maps:e0,normal_pars_fragment:t0,normal_pars_vertex:n0,normal_vertex:i0,normalmap_pars_fragment:s0,clearcoat_normal_fragment_begin:r0,clearcoat_normal_fragment_maps:a0,clearcoat_pars_fragment:o0,iridescence_pars_fragment:l0,opaque_fragment:c0,packing:h0,premultiplied_alpha_fragment:u0,project_vertex:d0,dithering_fragment:f0,dithering_pars_fragment:p0,roughnessmap_fragment:m0,roughnessmap_pars_fragment:g0,shadowmap_pars_fragment:_0,shadowmap_pars_vertex:y0,shadowmap_vertex:x0,shadowmask_pars_fragment:v0,skinbase_vertex:M0,skinning_pars_vertex:S0,skinning_vertex:b0,skinnormal_vertex:E0,specularmap_fragment:w0,specularmap_pars_fragment:T0,tonemapping_fragment:A0,tonemapping_pars_fragment:R0,transmission_fragment:C0,transmission_pars_fragment:I0,uv_pars_fragment:P0,uv_pars_vertex:L0,uv_vertex:D0,worldpos_vertex:U0,background_vert:N0,background_frag:F0,backgroundCube_vert:O0,backgroundCube_frag:B0,cube_vert:z0,cube_frag:k0,depth_vert:H0,depth_frag:V0,distanceRGBA_vert:G0,distanceRGBA_frag:W0,equirect_vert:X0,equirect_frag:$0,linedashed_vert:q0,linedashed_frag:Y0,meshbasic_vert:Z0,meshbasic_frag:J0,meshlambert_vert:K0,meshlambert_frag:j0,meshmatcap_vert:Q0,meshmatcap_frag:e_,meshnormal_vert:t_,meshnormal_frag:n_,meshphong_vert:i_,meshphong_frag:s_,meshphysical_vert:r_,meshphysical_frag:a_,meshtoon_vert:o_,meshtoon_frag:l_,points_vert:c_,points_frag:h_,shadow_vert:u_,shadow_frag:d_,sprite_vert:f_,sprite_frag:p_},pe={common:{diffuse:{value:new ke(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ge},alphaMap:{value:null},alphaMapTransform:{value:new Ge},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ge}},envmap:{envMap:{value:null},envMapRotation:{value:new Ge},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ge}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ge}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ge},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ge},normalScale:{value:new fe(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ge},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ge}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ge}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ge}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new ke(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new ke(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ge},alphaTest:{value:0},uvTransform:{value:new Ge}},sprite:{diffuse:{value:new ke(16777215)},opacity:{value:1},center:{value:new fe(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ge},alphaMap:{value:null},alphaMapTransform:{value:new Ge},alphaTest:{value:0}}},Hn={basic:{uniforms:Gt([pe.common,pe.specularmap,pe.envmap,pe.aomap,pe.lightmap,pe.fog]),vertexShader:$e.meshbasic_vert,fragmentShader:$e.meshbasic_frag},lambert:{uniforms:Gt([pe.common,pe.specularmap,pe.envmap,pe.aomap,pe.lightmap,pe.emissivemap,pe.bumpmap,pe.normalmap,pe.displacementmap,pe.fog,pe.lights,{emissive:{value:new ke(0)}}]),vertexShader:$e.meshlambert_vert,fragmentShader:$e.meshlambert_frag},phong:{uniforms:Gt([pe.common,pe.specularmap,pe.envmap,pe.aomap,pe.lightmap,pe.emissivemap,pe.bumpmap,pe.normalmap,pe.displacementmap,pe.fog,pe.lights,{emissive:{value:new ke(0)},specular:{value:new ke(1118481)},shininess:{value:30}}]),vertexShader:$e.meshphong_vert,fragmentShader:$e.meshphong_frag},standard:{uniforms:Gt([pe.common,pe.envmap,pe.aomap,pe.lightmap,pe.emissivemap,pe.bumpmap,pe.normalmap,pe.displacementmap,pe.roughnessmap,pe.metalnessmap,pe.fog,pe.lights,{emissive:{value:new ke(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:$e.meshphysical_vert,fragmentShader:$e.meshphysical_frag},toon:{uniforms:Gt([pe.common,pe.aomap,pe.lightmap,pe.emissivemap,pe.bumpmap,pe.normalmap,pe.displacementmap,pe.gradientmap,pe.fog,pe.lights,{emissive:{value:new ke(0)}}]),vertexShader:$e.meshtoon_vert,fragmentShader:$e.meshtoon_frag},matcap:{uniforms:Gt([pe.common,pe.bumpmap,pe.normalmap,pe.displacementmap,pe.fog,{matcap:{value:null}}]),vertexShader:$e.meshmatcap_vert,fragmentShader:$e.meshmatcap_frag},points:{uniforms:Gt([pe.points,pe.fog]),vertexShader:$e.points_vert,fragmentShader:$e.points_frag},dashed:{uniforms:Gt([pe.common,pe.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:$e.linedashed_vert,fragmentShader:$e.linedashed_frag},depth:{uniforms:Gt([pe.common,pe.displacementmap]),vertexShader:$e.depth_vert,fragmentShader:$e.depth_frag},normal:{uniforms:Gt([pe.common,pe.bumpmap,pe.normalmap,pe.displacementmap,{opacity:{value:1}}]),vertexShader:$e.meshnormal_vert,fragmentShader:$e.meshnormal_frag},sprite:{uniforms:Gt([pe.sprite,pe.fog]),vertexShader:$e.sprite_vert,fragmentShader:$e.sprite_frag},background:{uniforms:{uvTransform:{value:new Ge},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:$e.background_vert,fragmentShader:$e.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ge}},vertexShader:$e.backgroundCube_vert,fragmentShader:$e.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:$e.cube_vert,fragmentShader:$e.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:$e.equirect_vert,fragmentShader:$e.equirect_frag},distanceRGBA:{uniforms:Gt([pe.common,pe.displacementmap,{referencePosition:{value:new D},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:$e.distanceRGBA_vert,fragmentShader:$e.distanceRGBA_frag},shadow:{uniforms:Gt([pe.lights,pe.fog,{color:{value:new ke(0)},opacity:{value:1}}]),vertexShader:$e.shadow_vert,fragmentShader:$e.shadow_frag}};Hn.physical={uniforms:Gt([Hn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ge},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ge},clearcoatNormalScale:{value:new fe(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ge},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ge},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ge},sheen:{value:0},sheenColor:{value:new ke(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ge},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ge},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ge},transmissionSamplerSize:{value:new fe},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ge},attenuationDistance:{value:0},attenuationColor:{value:new ke(0)},specularColor:{value:new ke(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ge},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ge},anisotropyVector:{value:new fe},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ge}}]),vertexShader:$e.meshphysical_vert,fragmentShader:$e.meshphysical_frag};var bl={r:0,b:0,g:0},is=new on,m_=new Ye;function g_(i,e,t,n,s,r,a){let o=new ke(0),l=r===!0?0:1,c,u,h=null,f=0,d=null;function m(v){let y=v.isScene===!0?v.background:null;return y&&y.isTexture&&(y=(v.backgroundBlurriness>0?t:e).get(y)),y}function _(v){let y=!1,A=m(v);A===null?p(o,l):A&&A.isColor&&(p(A,1),y=!0);let T=i.xr.getEnvironmentBlendMode();T==="additive"?n.buffers.color.setClear(0,0,0,1,a):T==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,a),(i.autoClear||y)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function g(v,y){let A=m(y);A&&(A.isCubeTexture||A.mapping===la)?(u===void 0&&(u=new ct(new It(1,1,1),new cn({name:"BackgroundCubeMaterial",uniforms:ns(Hn.backgroundCube.uniforms),vertexShader:Hn.backgroundCube.vertexShader,fragmentShader:Hn.backgroundCube.fragmentShader,side:Bt,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(T,R,I){this.matrixWorld.copyPosition(I.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(u)),is.copy(y.backgroundRotation),is.x*=-1,is.y*=-1,is.z*=-1,A.isCubeTexture&&A.isRenderTargetTexture===!1&&(is.y*=-1,is.z*=-1),u.material.uniforms.envMap.value=A,u.material.uniforms.flipEnvMap.value=A.isCubeTexture&&A.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=y.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,u.material.uniforms.backgroundRotation.value.setFromMatrix4(m_.makeRotationFromEuler(is)),u.material.toneMapped=it.getTransfer(A.colorSpace)!==at,(h!==A||f!==A.version||d!==i.toneMapping)&&(u.material.needsUpdate=!0,h=A,f=A.version,d=i.toneMapping),u.layers.enableAll(),v.unshift(u,u.geometry,u.material,0,0,null)):A&&A.isTexture&&(c===void 0&&(c=new ct(new ea(2,2),new cn({name:"BackgroundMaterial",uniforms:ns(Hn.background.uniforms),vertexShader:Hn.background.vertexShader,fragmentShader:Hn.background.fragmentShader,side:Jn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(c)),c.material.uniforms.t2D.value=A,c.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,c.material.toneMapped=it.getTransfer(A.colorSpace)!==at,A.matrixAutoUpdate===!0&&A.updateMatrix(),c.material.uniforms.uvTransform.value.copy(A.matrix),(h!==A||f!==A.version||d!==i.toneMapping)&&(c.material.needsUpdate=!0,h=A,f=A.version,d=i.toneMapping),c.layers.enableAll(),v.unshift(c,c.geometry,c.material,0,0,null))}function p(v,y){v.getRGB(bl,Qc(i)),n.buffers.color.setClear(bl.r,bl.g,bl.b,y,a)}function E(){u!==void 0&&(u.geometry.dispose(),u.material.dispose(),u=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return o},setClearColor:function(v,y=1){o.set(v),l=y,p(o,l)},getClearAlpha:function(){return l},setClearAlpha:function(v){l=v,p(o,l)},render:_,addToRenderList:g,dispose:E}}function __(i,e){let t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=f(null),r=s,a=!1;function o(M,P,O,V,$){let L=!1,H=h(V,O,P);r!==H&&(r=H,c(r.object)),L=d(M,V,O,$),L&&m(M,V,O,$),$!==null&&e.update($,i.ELEMENT_ARRAY_BUFFER),(L||a)&&(a=!1,y(M,P,O,V),$!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get($).buffer))}function l(){return i.createVertexArray()}function c(M){return i.bindVertexArray(M)}function u(M){return i.deleteVertexArray(M)}function h(M,P,O){let V=O.wireframe===!0,$=n[M.id];$===void 0&&($={},n[M.id]=$);let L=$[P.id];L===void 0&&(L={},$[P.id]=L);let H=L[V];return H===void 0&&(H=f(l()),L[V]=H),H}function f(M){let P=[],O=[],V=[];for(let $=0;$<t;$++)P[$]=0,O[$]=0,V[$]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:P,enabledAttributes:O,attributeDivisors:V,object:M,attributes:{},index:null}}function d(M,P,O,V){let $=r.attributes,L=P.attributes,H=0,N=O.getAttributes();for(let k in N)if(N[k].location>=0){let le=$[k],ge=L[k];if(ge===void 0&&(k==="instanceMatrix"&&M.instanceMatrix&&(ge=M.instanceMatrix),k==="instanceColor"&&M.instanceColor&&(ge=M.instanceColor)),le===void 0||le.attribute!==ge||ge&&le.data!==ge.data)return!0;H++}return r.attributesNum!==H||r.index!==V}function m(M,P,O,V){let $={},L=P.attributes,H=0,N=O.getAttributes();for(let k in N)if(N[k].location>=0){let le=L[k];le===void 0&&(k==="instanceMatrix"&&M.instanceMatrix&&(le=M.instanceMatrix),k==="instanceColor"&&M.instanceColor&&(le=M.instanceColor));let ge={};ge.attribute=le,le&&le.data&&(ge.data=le.data),$[k]=ge,H++}r.attributes=$,r.attributesNum=H,r.index=V}function _(){let M=r.newAttributes;for(let P=0,O=M.length;P<O;P++)M[P]=0}function g(M){p(M,0)}function p(M,P){let O=r.newAttributes,V=r.enabledAttributes,$=r.attributeDivisors;O[M]=1,V[M]===0&&(i.enableVertexAttribArray(M),V[M]=1),$[M]!==P&&(i.vertexAttribDivisor(M,P),$[M]=P)}function E(){let M=r.newAttributes,P=r.enabledAttributes;for(let O=0,V=P.length;O<V;O++)P[O]!==M[O]&&(i.disableVertexAttribArray(O),P[O]=0)}function v(M,P,O,V,$,L,H){H===!0?i.vertexAttribIPointer(M,P,O,$,L):i.vertexAttribPointer(M,P,O,V,$,L)}function y(M,P,O,V){_();let $=V.attributes,L=O.getAttributes(),H=P.defaultAttributeValues;for(let N in L){let k=L[N];if(k.location>=0){let Q=$[N];if(Q===void 0&&(N==="instanceMatrix"&&M.instanceMatrix&&(Q=M.instanceMatrix),N==="instanceColor"&&M.instanceColor&&(Q=M.instanceColor)),Q!==void 0){let le=Q.normalized,ge=Q.itemSize,Ne=e.get(Q);if(Ne===void 0)continue;let We=Ne.buffer,et=Ne.type,Ke=Ne.bytesPerElement,Y=et===i.INT||et===i.UNSIGNED_INT||Q.gpuType===ko;if(Q.isInterleavedBufferAttribute){let ne=Q.data,Se=ne.stride,Le=Q.offset;if(ne.isInstancedInterleavedBuffer){for(let we=0;we<k.locationSize;we++)p(k.location+we,ne.meshPerAttribute);M.isInstancedMesh!==!0&&V._maxInstanceCount===void 0&&(V._maxInstanceCount=ne.meshPerAttribute*ne.count)}else for(let we=0;we<k.locationSize;we++)g(k.location+we);i.bindBuffer(i.ARRAY_BUFFER,We);for(let we=0;we<k.locationSize;we++)v(k.location+we,ge/k.locationSize,et,le,Se*Ke,(Le+ge/k.locationSize*we)*Ke,Y)}else{if(Q.isInstancedBufferAttribute){for(let ne=0;ne<k.locationSize;ne++)p(k.location+ne,Q.meshPerAttribute);M.isInstancedMesh!==!0&&V._maxInstanceCount===void 0&&(V._maxInstanceCount=Q.meshPerAttribute*Q.count)}else for(let ne=0;ne<k.locationSize;ne++)g(k.location+ne);i.bindBuffer(i.ARRAY_BUFFER,We);for(let ne=0;ne<k.locationSize;ne++)v(k.location+ne,ge/k.locationSize,et,le,ge*Ke,ge/k.locationSize*ne*Ke,Y)}}else if(H!==void 0){let le=H[N];if(le!==void 0)switch(le.length){case 2:i.vertexAttrib2fv(k.location,le);break;case 3:i.vertexAttrib3fv(k.location,le);break;case 4:i.vertexAttrib4fv(k.location,le);break;default:i.vertexAttrib1fv(k.location,le)}}}}E()}function A(){I();for(let M in n){let P=n[M];for(let O in P){let V=P[O];for(let $ in V)u(V[$].object),delete V[$];delete P[O]}delete n[M]}}function T(M){if(n[M.id]===void 0)return;let P=n[M.id];for(let O in P){let V=P[O];for(let $ in V)u(V[$].object),delete V[$];delete P[O]}delete n[M.id]}function R(M){for(let P in n){let O=n[P];if(O[M.id]===void 0)continue;let V=O[M.id];for(let $ in V)u(V[$].object),delete V[$];delete O[M.id]}}function I(){S(),a=!0,r!==s&&(r=s,c(r.object))}function S(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:I,resetDefaultState:S,dispose:A,releaseStatesOfGeometry:T,releaseStatesOfProgram:R,initAttributes:_,enableAttribute:g,disableUnusedAttributes:E}}function y_(i,e,t){let n;function s(c){n=c}function r(c,u){i.drawArrays(n,c,u),t.update(u,n,1)}function a(c,u,h){h!==0&&(i.drawArraysInstanced(n,c,u,h),t.update(u,n,h))}function o(c,u,h){if(h===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,u,0,h);let d=0;for(let m=0;m<h;m++)d+=u[m];t.update(d,n,1)}function l(c,u,h,f){if(h===0)return;let d=e.get("WEBGL_multi_draw");if(d===null)for(let m=0;m<c.length;m++)a(c[m],u[m],f[m]);else{d.multiDrawArraysInstancedWEBGL(n,c,0,u,0,f,0,h);let m=0;for(let _=0;_<h;_++)m+=u[_]*f[_];t.update(m,n,1)}}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=o,this.renderMultiDrawInstances=l}function x_(i,e,t,n){let s;function r(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){let R=e.get("EXT_texture_filter_anisotropic");s=i.getParameter(R.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(R){return!(R!==dn&&n.convert(R)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(R){let I=R===Xs&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(R!==Ln&&n.convert(R)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&R!==xn&&!I)}function l(R){if(R==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";R="mediump"}return R==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp",u=l(c);u!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",u,"instead."),c=u);let h=t.logarithmicDepthBuffer===!0,f=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control"),d=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),m=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=i.getParameter(i.MAX_TEXTURE_SIZE),g=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),p=i.getParameter(i.MAX_VERTEX_ATTRIBS),E=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),v=i.getParameter(i.MAX_VARYING_VECTORS),y=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),A=m>0,T=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:h,reversedDepthBuffer:f,maxTextures:d,maxVertexTextures:m,maxTextureSize:_,maxCubemapSize:g,maxAttributes:p,maxVertexUniforms:E,maxVaryings:v,maxFragmentUniforms:y,vertexTextures:A,maxSamples:T}}function v_(i){let e=this,t=null,n=0,s=!1,r=!1,a=new Nn,o=new Ge,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(h,f){let d=h.length!==0||f||n!==0||s;return s=f,n=h.length,d},this.beginShadows=function(){r=!0,u(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(h,f){t=u(h,f,0)},this.setState=function(h,f,d){let m=h.clippingPlanes,_=h.clipIntersection,g=h.clipShadows,p=i.get(h);if(!s||m===null||m.length===0||r&&!g)r?u(null):c();else{let E=r?0:n,v=E*4,y=p.clippingState||null;l.value=y,y=u(m,f,v,d);for(let A=0;A!==v;++A)y[A]=t[A];p.clippingState=y,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=E}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function u(h,f,d,m){let _=h!==null?h.length:0,g=null;if(_!==0){if(g=l.value,m!==!0||g===null){let p=d+_*4,E=f.matrixWorldInverse;o.getNormalMatrix(E),(g===null||g.length<p)&&(g=new Float32Array(p));for(let v=0,y=d;v!==_;++v,y+=4)a.copy(h[v]).applyMatrix4(E,o),a.normal.toArray(g,y),g[y+3]=a.constant}l.value=g,l.needsUpdate=!0}return e.numPlanes=_,e.numIntersection=0,g}}function M_(i){let e=new WeakMap;function t(a,o){return o===Oo?a.mapping=es:o===Bo&&(a.mapping=ts),a}function n(a){if(a&&a.isTexture){let o=a.mapping;if(o===Oo||o===Bo)if(e.has(a)){let l=e.get(a).texture;return t(l,a.mapping)}else{let l=a.image;if(l&&l.height>0){let c=new co(l.height);return c.fromEquirectangularTexture(i,a),e.set(a,c),a.addEventListener("dispose",s),t(c.texture,a.mapping)}else return null}}return a}function s(a){let o=a.target;o.removeEventListener("dispose",s);let l=e.get(o);l!==void 0&&(e.delete(o),l.dispose())}function r(){e=new WeakMap}return{get:n,dispose:r}}var Js=4,Fd=[.125,.215,.35,.446,.526,.582],as=20,sh=new ra,Od=new ke,rh=null,ah=0,oh=0,lh=!1,rs=(1+Math.sqrt(5))/2,Zs=1/rs,Bd=[new D(-rs,Zs,0),new D(rs,Zs,0),new D(-Zs,0,rs),new D(Zs,0,rs),new D(0,rs,-Zs),new D(0,rs,Zs),new D(-1,1,-1),new D(1,1,-1),new D(-1,1,1),new D(1,1,1)],S_=new D,Tl=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,s=100,r={}){let{size:a=256,position:o=S_}=r;rh=this._renderer.getRenderTarget(),ah=this._renderer.getActiveCubeFace(),oh=this._renderer.getActiveMipmapLevel(),lh=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);let l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,n,s,l,o),t>0&&this._blur(l,0,0,t),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Hd(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=kd(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(rh,ah,oh),this._renderer.xr.enabled=lh,e.scissorTest=!1,El(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===es||e.mapping===ts?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),rh=this._renderer.getRenderTarget(),ah=this._renderer.getActiveCubeFace(),oh=this._renderer.getActiveMipmapLevel(),lh=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:Tn,minFilter:Tn,generateMipmaps:!1,type:Xs,format:dn,colorSpace:$i,depthBuffer:!1},s=zd(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=zd(e,t,n);let{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=b_(r)),this._blurMaterial=E_(r,e,t)}return s}_compileMaterial(e){let t=new ct(this._lodPlanes[0],e);this._renderer.compile(t,sh)}_sceneToCubeUV(e,t,n,s,r){let l=new Vt(90,1,t,n),c=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],h=this._renderer,f=h.autoClear,d=h.toneMapping;h.getClearColor(Od),h.toneMapping=si,h.autoClear=!1,h.state.buffers.depth.getReversed()&&(h.setRenderTarget(s),h.clearDepth(),h.setRenderTarget(null));let _=new ln({name:"PMREM.Background",side:Bt,depthWrite:!1,depthTest:!1}),g=new ct(new It,_),p=!1,E=e.background;E?E.isColor&&(_.color.copy(E),e.background=null,p=!0):(_.color.copy(Od),p=!0);for(let v=0;v<6;v++){let y=v%3;y===0?(l.up.set(0,c[v],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x+u[v],r.y,r.z)):y===1?(l.up.set(0,0,c[v]),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y+u[v],r.z)):(l.up.set(0,c[v],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y,r.z+u[v]));let A=this._cubeSize;El(s,y*A,v>2?A:0,A,A),h.setRenderTarget(s),p&&h.render(g,l),h.render(e,l)}g.geometry.dispose(),g.material.dispose(),h.toneMapping=d,h.autoClear=f,e.background=E}_textureToCubeUV(e,t){let n=this._renderer,s=e.mapping===es||e.mapping===ts;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Hd()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=kd());let r=s?this._cubemapMaterial:this._equirectMaterial,a=new ct(this._lodPlanes[0],r),o=r.uniforms;o.envMap.value=e;let l=this._cubeSize;El(t,0,0,3*l,2*l),n.setRenderTarget(t),n.render(a,sh)}_applyPMREM(e){let t=this._renderer,n=t.autoClear;t.autoClear=!1;let s=this._lodPlanes.length;for(let r=1;r<s;r++){let a=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),o=Bd[(s-r-1)%Bd.length];this._blur(e,r-1,r,a,o)}t.autoClear=n}_blur(e,t,n,s,r){let a=this._pingPongRenderTarget;this._halfBlur(e,a,t,n,s,"latitudinal",r),this._halfBlur(a,e,n,n,s,"longitudinal",r)}_halfBlur(e,t,n,s,r,a,o){let l=this._renderer,c=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");let u=3,h=new ct(this._lodPlanes[s],c),f=c.uniforms,d=this._sizeLods[n]-1,m=isFinite(r)?Math.PI/(2*d):2*Math.PI/(2*as-1),_=r/m,g=isFinite(r)?1+Math.floor(u*_):as;g>as&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${g} samples when the maximum is set to ${as}`);let p=[],E=0;for(let R=0;R<as;++R){let I=R/_,S=Math.exp(-I*I/2);p.push(S),R===0?E+=S:R<g&&(E+=2*S)}for(let R=0;R<p.length;R++)p[R]=p[R]/E;f.envMap.value=e.texture,f.samples.value=g,f.weights.value=p,f.latitudinal.value=a==="latitudinal",o&&(f.poleAxis.value=o);let{_lodMax:v}=this;f.dTheta.value=m,f.mipInt.value=v-n;let y=this._sizeLods[s],A=3*y*(s>v-Js?s-v+Js:0),T=4*(this._cubeSize-y);El(t,A,T,3*y,2*y),l.setRenderTarget(t),l.render(h,sh)}};function b_(i){let e=[],t=[],n=[],s=i,r=i-Js+1+Fd.length;for(let a=0;a<r;a++){let o=Math.pow(2,s);t.push(o);let l=1/o;a>i-Js?l=Fd[a-i+Js-1]:a===0&&(l=0),n.push(l);let c=1/(o-2),u=-c,h=1+c,f=[u,u,h,u,h,h,u,u,h,h,u,h],d=6,m=6,_=3,g=2,p=1,E=new Float32Array(_*m*d),v=new Float32Array(g*m*d),y=new Float32Array(p*m*d);for(let T=0;T<d;T++){let R=T%3*2/3-1,I=T>2?0:-1,S=[R,I,0,R+2/3,I,0,R+2/3,I+1,0,R,I,0,R+2/3,I+1,0,R,I+1,0];E.set(S,_*m*T),v.set(f,g*m*T);let M=[T,T,T,T,T,T];y.set(M,p*m*T)}let A=new gt;A.setAttribute("position",new wt(E,_)),A.setAttribute("uv",new wt(v,g)),A.setAttribute("faceIndex",new wt(y,p)),e.push(A),s>Js&&s--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function zd(i,e,t){let n=new On(i,e,t);return n.texture.mapping=la,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function El(i,e,t,n,s){i.viewport.set(e,t,n,s),i.scissor.set(e,t,n,s)}function E_(i,e,t){let n=new Float32Array(as),s=new D(0,1,0);return new cn({name:"SphericalGaussianBlur",defines:{n:as,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:yh(),fragmentShader:`

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
		`,blending:ii,depthTest:!1,depthWrite:!1})}function kd(){return new cn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:yh(),fragmentShader:`

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
		`,blending:ii,depthTest:!1,depthWrite:!1})}function Hd(){return new cn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:yh(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:ii,depthTest:!1,depthWrite:!1})}function yh(){return`

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
	`}function w_(i){let e=new WeakMap,t=null;function n(o){if(o&&o.isTexture){let l=o.mapping,c=l===Oo||l===Bo,u=l===es||l===ts;if(c||u){let h=e.get(o),f=h!==void 0?h.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==f)return t===null&&(t=new Tl(i)),h=c?t.fromEquirectangular(o,h):t.fromCubemap(o,h),h.texture.pmremVersion=o.pmremVersion,e.set(o,h),h.texture;if(h!==void 0)return h.texture;{let d=o.image;return c&&d&&d.height>0||u&&d&&s(d)?(t===null&&(t=new Tl(i)),h=c?t.fromEquirectangular(o):t.fromCubemap(o),h.texture.pmremVersion=o.pmremVersion,e.set(o,h),o.addEventListener("dispose",r),h.texture):null}}}return o}function s(o){let l=0,c=6;for(let u=0;u<c;u++)o[u]!==void 0&&l++;return l===c}function r(o){let l=o.target;l.removeEventListener("dispose",r);let c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function a(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:a}}function T_(i){let e={};function t(n){if(e[n]!==void 0)return e[n];let s;switch(n){case"WEBGL_depth_texture":s=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=i.getExtension(n)}return e[n]=s,s}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){let s=t(n);return s===null&&Ls("THREE.WebGLRenderer: "+n+" extension not supported."),s}}}function A_(i,e,t,n){let s={},r=new WeakMap;function a(h){let f=h.target;f.index!==null&&e.remove(f.index);for(let m in f.attributes)e.remove(f.attributes[m]);f.removeEventListener("dispose",a),delete s[f.id];let d=r.get(f);d&&(e.remove(d),r.delete(f)),n.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,t.memory.geometries--}function o(h,f){return s[f.id]===!0||(f.addEventListener("dispose",a),s[f.id]=!0,t.memory.geometries++),f}function l(h){let f=h.attributes;for(let d in f)e.update(f[d],i.ARRAY_BUFFER)}function c(h){let f=[],d=h.index,m=h.attributes.position,_=0;if(d!==null){let E=d.array;_=d.version;for(let v=0,y=E.length;v<y;v+=3){let A=E[v+0],T=E[v+1],R=E[v+2];f.push(A,T,T,R,R,A)}}else if(m!==void 0){let E=m.array;_=m.version;for(let v=0,y=E.length/3-1;v<y;v+=3){let A=v+0,T=v+1,R=v+2;f.push(A,T,T,R,R,A)}}else return;let g=new(jc(f)?Cr:Rr)(f,1);g.version=_;let p=r.get(h);p&&e.remove(p),r.set(h,g)}function u(h){let f=r.get(h);if(f){let d=h.index;d!==null&&f.version<d.version&&c(h)}else c(h);return r.get(h)}return{get:o,update:l,getWireframeAttribute:u}}function R_(i,e,t){let n;function s(f){n=f}let r,a;function o(f){r=f.type,a=f.bytesPerElement}function l(f,d){i.drawElements(n,d,r,f*a),t.update(d,n,1)}function c(f,d,m){m!==0&&(i.drawElementsInstanced(n,d,r,f*a,m),t.update(d,n,m))}function u(f,d,m){if(m===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,d,0,r,f,0,m);let g=0;for(let p=0;p<m;p++)g+=d[p];t.update(g,n,1)}function h(f,d,m,_){if(m===0)return;let g=e.get("WEBGL_multi_draw");if(g===null)for(let p=0;p<f.length;p++)c(f[p]/a,d[p],_[p]);else{g.multiDrawElementsInstancedWEBGL(n,d,0,r,f,0,_,0,m);let p=0;for(let E=0;E<m;E++)p+=d[E]*_[E];t.update(p,n,1)}}this.setMode=s,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=u,this.renderMultiDrawInstances=h}function C_(i){let e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(t.calls++,a){case i.TRIANGLES:t.triangles+=o*(r/3);break;case i.LINES:t.lines+=o*(r/2);break;case i.LINE_STRIP:t.lines+=o*(r-1);break;case i.LINE_LOOP:t.lines+=o*r;break;case i.POINTS:t.points+=o*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:n}}function I_(i,e,t){let n=new WeakMap,s=new ft;function r(a,o,l){let c=a.morphTargetInfluences,u=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,h=u!==void 0?u.length:0,f=n.get(o);if(f===void 0||f.count!==h){let S=function(){R.dispose(),n.delete(o),o.removeEventListener("dispose",S)};f!==void 0&&f.texture.dispose();let d=o.morphAttributes.position!==void 0,m=o.morphAttributes.normal!==void 0,_=o.morphAttributes.color!==void 0,g=o.morphAttributes.position||[],p=o.morphAttributes.normal||[],E=o.morphAttributes.color||[],v=0;d===!0&&(v=1),m===!0&&(v=2),_===!0&&(v=3);let y=o.attributes.position.count*v,A=1;y>e.maxTextureSize&&(A=Math.ceil(y/e.maxTextureSize),y=e.maxTextureSize);let T=new Float32Array(y*A*4*h),R=new Ar(T,y,A,h);R.type=xn,R.needsUpdate=!0;let I=v*4;for(let M=0;M<h;M++){let P=g[M],O=p[M],V=E[M],$=y*A*4*M;for(let L=0;L<P.count;L++){let H=L*I;d===!0&&(s.fromBufferAttribute(P,L),T[$+H+0]=s.x,T[$+H+1]=s.y,T[$+H+2]=s.z,T[$+H+3]=0),m===!0&&(s.fromBufferAttribute(O,L),T[$+H+4]=s.x,T[$+H+5]=s.y,T[$+H+6]=s.z,T[$+H+7]=0),_===!0&&(s.fromBufferAttribute(V,L),T[$+H+8]=s.x,T[$+H+9]=s.y,T[$+H+10]=s.z,T[$+H+11]=V.itemSize===4?s.w:1)}}f={count:h,texture:R,size:new fe(y,A)},n.set(o,f),o.addEventListener("dispose",S)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(i,"morphTexture",a.morphTexture,t);else{let d=0;for(let _=0;_<c.length;_++)d+=c[_];let m=o.morphTargetsRelative?1:1-d;l.getUniforms().setValue(i,"morphTargetBaseInfluence",m),l.getUniforms().setValue(i,"morphTargetInfluences",c)}l.getUniforms().setValue(i,"morphTargetsTexture",f.texture,t),l.getUniforms().setValue(i,"morphTargetsTextureSize",f.size)}return{update:r}}function P_(i,e,t,n){let s=new WeakMap;function r(l){let c=n.render.frame,u=l.geometry,h=e.get(l,u);if(s.get(h)!==c&&(e.update(h),s.set(h,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",o)===!1&&l.addEventListener("dispose",o),s.get(l)!==c&&(t.update(l.instanceMatrix,i.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,i.ARRAY_BUFFER),s.set(l,c))),l.isSkinnedMesh){let f=l.skeleton;s.get(f)!==c&&(f.update(),s.set(f,c))}return h}function a(){s=new WeakMap}function o(l){let c=l.target;c.removeEventListener("dispose",o),t.remove(c.instanceMatrix),c.instanceColor!==null&&t.remove(c.instanceColor)}return{update:r,dispose:a}}var of=new Kt,Vd=new Hr(1,1),lf=new Ar,cf=new oo,hf=new Pr,Gd=[],Wd=[],Xd=new Float32Array(16),$d=new Float32Array(9),qd=new Float32Array(4);function js(i,e,t){let n=i[0];if(n<=0||n>0)return i;let s=e*t,r=Gd[s];if(r===void 0&&(r=new Float32Array(s),Gd[s]=r),e!==0){n.toArray(r,0);for(let a=1,o=0;a!==e;++a)o+=t,i[a].toArray(r,o)}return r}function Pt(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function Lt(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function Rl(i,e){let t=Wd[e];t===void 0&&(t=new Int32Array(e),Wd[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function L_(i,e){let t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function D_(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Pt(t,e))return;i.uniform2fv(this.addr,e),Lt(t,e)}}function U_(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Pt(t,e))return;i.uniform3fv(this.addr,e),Lt(t,e)}}function N_(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Pt(t,e))return;i.uniform4fv(this.addr,e),Lt(t,e)}}function F_(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(Pt(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),Lt(t,e)}else{if(Pt(t,n))return;qd.set(n),i.uniformMatrix2fv(this.addr,!1,qd),Lt(t,n)}}function O_(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(Pt(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),Lt(t,e)}else{if(Pt(t,n))return;$d.set(n),i.uniformMatrix3fv(this.addr,!1,$d),Lt(t,n)}}function B_(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(Pt(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),Lt(t,e)}else{if(Pt(t,n))return;Xd.set(n),i.uniformMatrix4fv(this.addr,!1,Xd),Lt(t,n)}}function z_(i,e){let t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function k_(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Pt(t,e))return;i.uniform2iv(this.addr,e),Lt(t,e)}}function H_(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Pt(t,e))return;i.uniform3iv(this.addr,e),Lt(t,e)}}function V_(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Pt(t,e))return;i.uniform4iv(this.addr,e),Lt(t,e)}}function G_(i,e){let t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function W_(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Pt(t,e))return;i.uniform2uiv(this.addr,e),Lt(t,e)}}function X_(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Pt(t,e))return;i.uniform3uiv(this.addr,e),Lt(t,e)}}function $_(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Pt(t,e))return;i.uniform4uiv(this.addr,e),Lt(t,e)}}function q_(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(Vd.compareFunction=Zc,r=Vd):r=of,t.setTexture2D(e||r,s)}function Y_(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture3D(e||cf,s)}function Z_(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTextureCube(e||hf,s)}function J_(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture2DArray(e||lf,s)}function K_(i){switch(i){case 5126:return L_;case 35664:return D_;case 35665:return U_;case 35666:return N_;case 35674:return F_;case 35675:return O_;case 35676:return B_;case 5124:case 35670:return z_;case 35667:case 35671:return k_;case 35668:case 35672:return H_;case 35669:case 35673:return V_;case 5125:return G_;case 36294:return W_;case 36295:return X_;case 36296:return $_;case 35678:case 36198:case 36298:case 36306:case 35682:return q_;case 35679:case 36299:case 36307:return Y_;case 35680:case 36300:case 36308:case 36293:return Z_;case 36289:case 36303:case 36311:case 36292:return J_}}function j_(i,e){i.uniform1fv(this.addr,e)}function Q_(i,e){let t=js(e,this.size,2);i.uniform2fv(this.addr,t)}function ey(i,e){let t=js(e,this.size,3);i.uniform3fv(this.addr,t)}function ty(i,e){let t=js(e,this.size,4);i.uniform4fv(this.addr,t)}function ny(i,e){let t=js(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function iy(i,e){let t=js(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function sy(i,e){let t=js(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function ry(i,e){i.uniform1iv(this.addr,e)}function ay(i,e){i.uniform2iv(this.addr,e)}function oy(i,e){i.uniform3iv(this.addr,e)}function ly(i,e){i.uniform4iv(this.addr,e)}function cy(i,e){i.uniform1uiv(this.addr,e)}function hy(i,e){i.uniform2uiv(this.addr,e)}function uy(i,e){i.uniform3uiv(this.addr,e)}function dy(i,e){i.uniform4uiv(this.addr,e)}function fy(i,e,t){let n=this.cache,s=e.length,r=Rl(t,s);Pt(n,r)||(i.uniform1iv(this.addr,r),Lt(n,r));for(let a=0;a!==s;++a)t.setTexture2D(e[a]||of,r[a])}function py(i,e,t){let n=this.cache,s=e.length,r=Rl(t,s);Pt(n,r)||(i.uniform1iv(this.addr,r),Lt(n,r));for(let a=0;a!==s;++a)t.setTexture3D(e[a]||cf,r[a])}function my(i,e,t){let n=this.cache,s=e.length,r=Rl(t,s);Pt(n,r)||(i.uniform1iv(this.addr,r),Lt(n,r));for(let a=0;a!==s;++a)t.setTextureCube(e[a]||hf,r[a])}function gy(i,e,t){let n=this.cache,s=e.length,r=Rl(t,s);Pt(n,r)||(i.uniform1iv(this.addr,r),Lt(n,r));for(let a=0;a!==s;++a)t.setTexture2DArray(e[a]||lf,r[a])}function _y(i){switch(i){case 5126:return j_;case 35664:return Q_;case 35665:return ey;case 35666:return ty;case 35674:return ny;case 35675:return iy;case 35676:return sy;case 5124:case 35670:return ry;case 35667:case 35671:return ay;case 35668:case 35672:return oy;case 35669:case 35673:return ly;case 5125:return cy;case 36294:return hy;case 36295:return uy;case 36296:return dy;case 35678:case 36198:case 36298:case 36306:case 35682:return fy;case 35679:case 36299:case 36307:return py;case 35680:case 36300:case 36308:case 36293:return my;case 36289:case 36303:case 36311:case 36292:return gy}}var hh=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=K_(t.type)}},uh=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=_y(t.type)}},dh=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let s=this.seq;for(let r=0,a=s.length;r!==a;++r){let o=s[r];o.setValue(e,t[o.id],n)}}},ch=/(\w+)(\])?(\[|\.)?/g;function Yd(i,e){i.seq.push(e),i.map[e.id]=e}function yy(i,e,t){let n=i.name,s=n.length;for(ch.lastIndex=0;;){let r=ch.exec(n),a=ch.lastIndex,o=r[1],l=r[2]==="]",c=r[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===s){Yd(t,c===void 0?new hh(o,i,e):new uh(o,i,e));break}else{let h=t.map[o];h===void 0&&(h=new dh(o),Yd(t,h)),t=h}}}var Ks=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let s=0;s<n;++s){let r=e.getActiveUniform(t,s),a=e.getUniformLocation(t,r.name);yy(r,a,this)}}setValue(e,t,n,s){let r=this.map[t];r!==void 0&&r.setValue(e,n,s)}setOptional(e,t,n){let s=t[n];s!==void 0&&this.setValue(e,n,s)}static upload(e,t,n,s){for(let r=0,a=t.length;r!==a;++r){let o=t[r],l=n[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,s)}}static seqWithValue(e,t){let n=[];for(let s=0,r=e.length;s!==r;++s){let a=e[s];a.id in t&&n.push(a)}return n}};function Zd(i,e,t){let n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}var xy=37297,vy=0;function My(i,e){let t=i.split(`
`),n=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let a=s;a<r;a++){let o=a+1;n.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return n.join(`
`)}var Jd=new Ge;function Sy(i){it._getMatrix(Jd,it.workingColorSpace,i);let e=`mat3( ${Jd.elements.map(t=>t.toFixed(4))} )`;switch(it.getTransfer(i)){case Er:return[e,"LinearTransferOETF"];case at:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",i),[e,"LinearTransferOETF"]}}function Kd(i,e,t){let n=i.getShaderParameter(e,i.COMPILE_STATUS),r=(i.getShaderInfoLog(e)||"").trim();if(n&&r==="")return"";let a=/ERROR: 0:(\d+)/.exec(r);if(a){let o=parseInt(a[1]);return t.toUpperCase()+`

`+r+`

`+My(i.getShaderSource(e),o)}else return r}function by(i,e){let t=Sy(e);return[`vec4 ${i}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function Ey(i,e){let t;switch(e){case rd:t="Linear";break;case ad:t="Reinhard";break;case od:t="Cineon";break;case Fo:t="ACESFilmic";break;case cd:t="AgX";break;case hd:t="Neutral";break;case ld:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}var wl=new D;function wy(){it.getLuminanceCoefficients(wl);let i=wl.x.toFixed(4),e=wl.y.toFixed(4),t=wl.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Ty(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(pa).join(`
`)}function Ay(i){let e=[];for(let t in i){let n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function Ry(i,e){let t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){let r=i.getActiveAttrib(e,s),a=r.name,o=1;r.type===i.FLOAT_MAT2&&(o=2),r.type===i.FLOAT_MAT3&&(o=3),r.type===i.FLOAT_MAT4&&(o=4),t[a]={type:r.type,location:i.getAttribLocation(e,a),locationSize:o}}return t}function pa(i){return i!==""}function jd(i,e){let t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Qd(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}var Cy=/^[ \t]*#include +<([\w\d./]+)>/gm;function fh(i){return i.replace(Cy,Py)}var Iy=new Map;function Py(i,e){let t=$e[e];if(t===void 0){let n=Iy.get(e);if(n!==void 0)t=$e[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return fh(t)}var Ly=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function ef(i){return i.replace(Ly,Dy)}function Dy(i,e,t,n){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function tf(i){let e=`precision ${i.precision} float;
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
#define LOW_PRECISION`),e}function Uy(i){let e="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===Nc?e="SHADOWMAP_TYPE_PCF":i.shadowMapType===Ro?e="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===kn&&(e="SHADOWMAP_TYPE_VSM"),e}function Ny(i){let e="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case es:case ts:e="ENVMAP_TYPE_CUBE";break;case la:e="ENVMAP_TYPE_CUBE_UV";break}return e}function Fy(i){let e="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case ts:e="ENVMAP_MODE_REFRACTION";break}return e}function Oy(i){let e="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case zc:e="ENVMAP_BLENDING_MULTIPLY";break;case id:e="ENVMAP_BLENDING_MIX";break;case sd:e="ENVMAP_BLENDING_ADD";break}return e}function By(i){let e=i.envMapCubeUVHeight;if(e===null)return null;let t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:n,maxMip:t}}function zy(i,e,t,n){let s=i.getContext(),r=t.defines,a=t.vertexShader,o=t.fragmentShader,l=Uy(t),c=Ny(t),u=Fy(t),h=Oy(t),f=By(t),d=Ty(t),m=Ay(r),_=s.createProgram(),g,p,E=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(g=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m].filter(pa).join(`
`),g.length>0&&(g+=`
`),p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m].filter(pa).join(`
`),p.length>0&&(p+=`
`)):(g=[tf(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(pa).join(`
`),p=[tf(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+u:"",t.envMap?"#define "+h:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==si?"#define TONE_MAPPING":"",t.toneMapping!==si?$e.tonemapping_pars_fragment:"",t.toneMapping!==si?Ey("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",$e.colorspace_pars_fragment,by("linearToOutputTexel",t.outputColorSpace),wy(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(pa).join(`
`)),a=fh(a),a=jd(a,t),a=Qd(a,t),o=fh(o),o=jd(o,t),o=Qd(o,t),a=ef(a),o=ef(o),t.isRawShaderMaterial!==!0&&(E=`#version 300 es
`,g=[d,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,p=["#define varying in",t.glslVersion===Jc?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Jc?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);let v=E+g+a,y=E+p+o,A=Zd(s,s.VERTEX_SHADER,v),T=Zd(s,s.FRAGMENT_SHADER,y);s.attachShader(_,A),s.attachShader(_,T),t.index0AttributeName!==void 0?s.bindAttribLocation(_,0,t.index0AttributeName):t.morphTargets===!0&&s.bindAttribLocation(_,0,"position"),s.linkProgram(_);function R(P){if(i.debug.checkShaderErrors){let O=s.getProgramInfoLog(_)||"",V=s.getShaderInfoLog(A)||"",$=s.getShaderInfoLog(T)||"",L=O.trim(),H=V.trim(),N=$.trim(),k=!0,Q=!0;if(s.getProgramParameter(_,s.LINK_STATUS)===!1)if(k=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,_,A,T);else{let le=Kd(s,A,"vertex"),ge=Kd(s,T,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(_,s.VALIDATE_STATUS)+`

Material Name: `+P.name+`
Material Type: `+P.type+`

Program Info Log: `+L+`
`+le+`
`+ge)}else L!==""?console.warn("THREE.WebGLProgram: Program Info Log:",L):(H===""||N==="")&&(Q=!1);Q&&(P.diagnostics={runnable:k,programLog:L,vertexShader:{log:H,prefix:g},fragmentShader:{log:N,prefix:p}})}s.deleteShader(A),s.deleteShader(T),I=new Ks(s,_),S=Ry(s,_)}let I;this.getUniforms=function(){return I===void 0&&R(this),I};let S;this.getAttributes=function(){return S===void 0&&R(this),S};let M=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return M===!1&&(M=s.getProgramParameter(_,xy)),M},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(_),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=vy++,this.cacheKey=e,this.usedTimes=1,this.program=_,this.vertexShader=A,this.fragmentShader=T,this}var ky=0,ph=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){let t=e.vertexShader,n=e.fragmentShader,s=this._getShaderStage(t),r=this._getShaderStage(n),a=this._getShaderCacheForMaterial(e);return a.has(s)===!1&&(a.add(s),s.usedTimes++),a.has(r)===!1&&(a.add(r),r.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new mh(e),t.set(e,n)),n}},mh=class{constructor(e){this.id=ky++,this.code=e,this.usedTimes=0}};function Hy(i,e,t,n,s,r,a){let o=new Us,l=new ph,c=new Set,u=[],h=s.logarithmicDepthBuffer,f=s.vertexTextures,d=s.precision,m={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(S){return c.add(S),S===0?"uv":`uv${S}`}function g(S,M,P,O,V){let $=O.fog,L=V.geometry,H=S.isMeshStandardMaterial?O.environment:null,N=(S.isMeshStandardMaterial?t:e).get(S.envMap||H),k=N&&N.mapping===la?N.image.height:null,Q=m[S.type];S.precision!==null&&(d=s.getMaxPrecision(S.precision),d!==S.precision&&console.warn("THREE.WebGLProgram.getParameters:",S.precision,"not supported, using",d,"instead."));let le=L.morphAttributes.position||L.morphAttributes.normal||L.morphAttributes.color,ge=le!==void 0?le.length:0,Ne=0;L.morphAttributes.position!==void 0&&(Ne=1),L.morphAttributes.normal!==void 0&&(Ne=2),L.morphAttributes.color!==void 0&&(Ne=3);let We,et,Ke,Y;if(Q){let rt=Hn[Q];We=rt.vertexShader,et=rt.fragmentShader}else We=S.vertexShader,et=S.fragmentShader,l.update(S),Ke=l.getVertexShaderID(S),Y=l.getFragmentShaderID(S);let ne=i.getRenderTarget(),Se=i.state.buffers.depth.getReversed(),Le=V.isInstancedMesh===!0,we=V.isBatchedMesh===!0,je=!!S.map,ht=!!S.matcap,C=!!N,te=!!S.aoMap,K=!!S.lightMap,J=!!S.bumpMap,Z=!!S.normalMap,he=!!S.displacementMap,ie=!!S.emissiveMap,ue=!!S.metalnessMap,He=!!S.roughnessMap,ze=S.anisotropy>0,w=S.clearcoat>0,x=S.dispersion>0,z=S.iridescence>0,X=S.sheen>0,ee=S.transmission>0,q=ze&&!!S.anisotropyMap,Ce=w&&!!S.clearcoatMap,ce=w&&!!S.clearcoatNormalMap,Te=w&&!!S.clearcoatRoughnessMap,Ae=z&&!!S.iridescenceMap,se=z&&!!S.iridescenceThicknessMap,ye=X&&!!S.sheenColorMap,Oe=X&&!!S.sheenRoughnessMap,Ie=!!S.specularMap,me=!!S.specularColorMap,Xe=!!S.specularIntensityMap,U=ee&&!!S.transmissionMap,oe=ee&&!!S.thicknessMap,de=!!S.gradientMap,be=!!S.alphaMap,re=S.alphaTest>0,j=!!S.alphaHash,Re=!!S.extensions,Ve=si;S.toneMapped&&(ne===null||ne.isXRRenderTarget===!0)&&(Ve=i.toneMapping);let ut={shaderID:Q,shaderType:S.type,shaderName:S.name,vertexShader:We,fragmentShader:et,defines:S.defines,customVertexShaderID:Ke,customFragmentShaderID:Y,isRawShaderMaterial:S.isRawShaderMaterial===!0,glslVersion:S.glslVersion,precision:d,batching:we,batchingColor:we&&V._colorsTexture!==null,instancing:Le,instancingColor:Le&&V.instanceColor!==null,instancingMorph:Le&&V.morphTexture!==null,supportsVertexTextures:f,outputColorSpace:ne===null?i.outputColorSpace:ne.isXRRenderTarget===!0?ne.texture.colorSpace:$i,alphaToCoverage:!!S.alphaToCoverage,map:je,matcap:ht,envMap:C,envMapMode:C&&N.mapping,envMapCubeUVHeight:k,aoMap:te,lightMap:K,bumpMap:J,normalMap:Z,displacementMap:f&&he,emissiveMap:ie,normalMapObjectSpace:Z&&S.normalMapType===yd,normalMapTangentSpace:Z&&S.normalMapType===Yc,metalnessMap:ue,roughnessMap:He,anisotropy:ze,anisotropyMap:q,clearcoat:w,clearcoatMap:Ce,clearcoatNormalMap:ce,clearcoatRoughnessMap:Te,dispersion:x,iridescence:z,iridescenceMap:Ae,iridescenceThicknessMap:se,sheen:X,sheenColorMap:ye,sheenRoughnessMap:Oe,specularMap:Ie,specularColorMap:me,specularIntensityMap:Xe,transmission:ee,transmissionMap:U,thicknessMap:oe,gradientMap:de,opaque:S.transparent===!1&&S.blending===Wi&&S.alphaToCoverage===!1,alphaMap:be,alphaTest:re,alphaHash:j,combine:S.combine,mapUv:je&&_(S.map.channel),aoMapUv:te&&_(S.aoMap.channel),lightMapUv:K&&_(S.lightMap.channel),bumpMapUv:J&&_(S.bumpMap.channel),normalMapUv:Z&&_(S.normalMap.channel),displacementMapUv:he&&_(S.displacementMap.channel),emissiveMapUv:ie&&_(S.emissiveMap.channel),metalnessMapUv:ue&&_(S.metalnessMap.channel),roughnessMapUv:He&&_(S.roughnessMap.channel),anisotropyMapUv:q&&_(S.anisotropyMap.channel),clearcoatMapUv:Ce&&_(S.clearcoatMap.channel),clearcoatNormalMapUv:ce&&_(S.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Te&&_(S.clearcoatRoughnessMap.channel),iridescenceMapUv:Ae&&_(S.iridescenceMap.channel),iridescenceThicknessMapUv:se&&_(S.iridescenceThicknessMap.channel),sheenColorMapUv:ye&&_(S.sheenColorMap.channel),sheenRoughnessMapUv:Oe&&_(S.sheenRoughnessMap.channel),specularMapUv:Ie&&_(S.specularMap.channel),specularColorMapUv:me&&_(S.specularColorMap.channel),specularIntensityMapUv:Xe&&_(S.specularIntensityMap.channel),transmissionMapUv:U&&_(S.transmissionMap.channel),thicknessMapUv:oe&&_(S.thicknessMap.channel),alphaMapUv:be&&_(S.alphaMap.channel),vertexTangents:!!L.attributes.tangent&&(Z||ze),vertexColors:S.vertexColors,vertexAlphas:S.vertexColors===!0&&!!L.attributes.color&&L.attributes.color.itemSize===4,pointsUvs:V.isPoints===!0&&!!L.attributes.uv&&(je||be),fog:!!$,useFog:S.fog===!0,fogExp2:!!$&&$.isFogExp2,flatShading:S.flatShading===!0&&S.wireframe===!1,sizeAttenuation:S.sizeAttenuation===!0,logarithmicDepthBuffer:h,reversedDepthBuffer:Se,skinning:V.isSkinnedMesh===!0,morphTargets:L.morphAttributes.position!==void 0,morphNormals:L.morphAttributes.normal!==void 0,morphColors:L.morphAttributes.color!==void 0,morphTargetsCount:ge,morphTextureStride:Ne,numDirLights:M.directional.length,numPointLights:M.point.length,numSpotLights:M.spot.length,numSpotLightMaps:M.spotLightMap.length,numRectAreaLights:M.rectArea.length,numHemiLights:M.hemi.length,numDirLightShadows:M.directionalShadowMap.length,numPointLightShadows:M.pointShadowMap.length,numSpotLightShadows:M.spotShadowMap.length,numSpotLightShadowsWithMaps:M.numSpotLightShadowsWithMaps,numLightProbes:M.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:S.dithering,shadowMapEnabled:i.shadowMap.enabled&&P.length>0,shadowMapType:i.shadowMap.type,toneMapping:Ve,decodeVideoTexture:je&&S.map.isVideoTexture===!0&&it.getTransfer(S.map.colorSpace)===at,decodeVideoTextureEmissive:ie&&S.emissiveMap.isVideoTexture===!0&&it.getTransfer(S.emissiveMap.colorSpace)===at,premultipliedAlpha:S.premultipliedAlpha,doubleSided:S.side===yn,flipSided:S.side===Bt,useDepthPacking:S.depthPacking>=0,depthPacking:S.depthPacking||0,index0AttributeName:S.index0AttributeName,extensionClipCullDistance:Re&&S.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Re&&S.extensions.multiDraw===!0||we)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:S.customProgramCacheKey()};return ut.vertexUv1s=c.has(1),ut.vertexUv2s=c.has(2),ut.vertexUv3s=c.has(3),c.clear(),ut}function p(S){let M=[];if(S.shaderID?M.push(S.shaderID):(M.push(S.customVertexShaderID),M.push(S.customFragmentShaderID)),S.defines!==void 0)for(let P in S.defines)M.push(P),M.push(S.defines[P]);return S.isRawShaderMaterial===!1&&(E(M,S),v(M,S),M.push(i.outputColorSpace)),M.push(S.customProgramCacheKey),M.join()}function E(S,M){S.push(M.precision),S.push(M.outputColorSpace),S.push(M.envMapMode),S.push(M.envMapCubeUVHeight),S.push(M.mapUv),S.push(M.alphaMapUv),S.push(M.lightMapUv),S.push(M.aoMapUv),S.push(M.bumpMapUv),S.push(M.normalMapUv),S.push(M.displacementMapUv),S.push(M.emissiveMapUv),S.push(M.metalnessMapUv),S.push(M.roughnessMapUv),S.push(M.anisotropyMapUv),S.push(M.clearcoatMapUv),S.push(M.clearcoatNormalMapUv),S.push(M.clearcoatRoughnessMapUv),S.push(M.iridescenceMapUv),S.push(M.iridescenceThicknessMapUv),S.push(M.sheenColorMapUv),S.push(M.sheenRoughnessMapUv),S.push(M.specularMapUv),S.push(M.specularColorMapUv),S.push(M.specularIntensityMapUv),S.push(M.transmissionMapUv),S.push(M.thicknessMapUv),S.push(M.combine),S.push(M.fogExp2),S.push(M.sizeAttenuation),S.push(M.morphTargetsCount),S.push(M.morphAttributeCount),S.push(M.numDirLights),S.push(M.numPointLights),S.push(M.numSpotLights),S.push(M.numSpotLightMaps),S.push(M.numHemiLights),S.push(M.numRectAreaLights),S.push(M.numDirLightShadows),S.push(M.numPointLightShadows),S.push(M.numSpotLightShadows),S.push(M.numSpotLightShadowsWithMaps),S.push(M.numLightProbes),S.push(M.shadowMapType),S.push(M.toneMapping),S.push(M.numClippingPlanes),S.push(M.numClipIntersection),S.push(M.depthPacking)}function v(S,M){o.disableAll(),M.supportsVertexTextures&&o.enable(0),M.instancing&&o.enable(1),M.instancingColor&&o.enable(2),M.instancingMorph&&o.enable(3),M.matcap&&o.enable(4),M.envMap&&o.enable(5),M.normalMapObjectSpace&&o.enable(6),M.normalMapTangentSpace&&o.enable(7),M.clearcoat&&o.enable(8),M.iridescence&&o.enable(9),M.alphaTest&&o.enable(10),M.vertexColors&&o.enable(11),M.vertexAlphas&&o.enable(12),M.vertexUv1s&&o.enable(13),M.vertexUv2s&&o.enable(14),M.vertexUv3s&&o.enable(15),M.vertexTangents&&o.enable(16),M.anisotropy&&o.enable(17),M.alphaHash&&o.enable(18),M.batching&&o.enable(19),M.dispersion&&o.enable(20),M.batchingColor&&o.enable(21),M.gradientMap&&o.enable(22),S.push(o.mask),o.disableAll(),M.fog&&o.enable(0),M.useFog&&o.enable(1),M.flatShading&&o.enable(2),M.logarithmicDepthBuffer&&o.enable(3),M.reversedDepthBuffer&&o.enable(4),M.skinning&&o.enable(5),M.morphTargets&&o.enable(6),M.morphNormals&&o.enable(7),M.morphColors&&o.enable(8),M.premultipliedAlpha&&o.enable(9),M.shadowMapEnabled&&o.enable(10),M.doubleSided&&o.enable(11),M.flipSided&&o.enable(12),M.useDepthPacking&&o.enable(13),M.dithering&&o.enable(14),M.transmission&&o.enable(15),M.sheen&&o.enable(16),M.opaque&&o.enable(17),M.pointsUvs&&o.enable(18),M.decodeVideoTexture&&o.enable(19),M.decodeVideoTextureEmissive&&o.enable(20),M.alphaToCoverage&&o.enable(21),S.push(o.mask)}function y(S){let M=m[S.type],P;if(M){let O=Hn[M];P=Cd.clone(O.uniforms)}else P=S.uniforms;return P}function A(S,M){let P;for(let O=0,V=u.length;O<V;O++){let $=u[O];if($.cacheKey===M){P=$,++P.usedTimes;break}}return P===void 0&&(P=new zy(i,M,S,r),u.push(P)),P}function T(S){if(--S.usedTimes===0){let M=u.indexOf(S);u[M]=u[u.length-1],u.pop(),S.destroy()}}function R(S){l.remove(S)}function I(){l.dispose()}return{getParameters:g,getProgramCacheKey:p,getUniforms:y,acquireProgram:A,releaseProgram:T,releaseShaderCache:R,programs:u,dispose:I}}function Vy(){let i=new WeakMap;function e(a){return i.has(a)}function t(a){let o=i.get(a);return o===void 0&&(o={},i.set(a,o)),o}function n(a){i.delete(a)}function s(a,o,l){i.get(a)[o]=l}function r(){i=new WeakMap}return{has:e,get:t,remove:n,update:s,dispose:r}}function Gy(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.z!==e.z?i.z-e.z:i.id-e.id}function nf(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function sf(){let i=[],e=0,t=[],n=[],s=[];function r(){e=0,t.length=0,n.length=0,s.length=0}function a(h,f,d,m,_,g){let p=i[e];return p===void 0?(p={id:h.id,object:h,geometry:f,material:d,groupOrder:m,renderOrder:h.renderOrder,z:_,group:g},i[e]=p):(p.id=h.id,p.object=h,p.geometry=f,p.material=d,p.groupOrder=m,p.renderOrder=h.renderOrder,p.z=_,p.group=g),e++,p}function o(h,f,d,m,_,g){let p=a(h,f,d,m,_,g);d.transmission>0?n.push(p):d.transparent===!0?s.push(p):t.push(p)}function l(h,f,d,m,_,g){let p=a(h,f,d,m,_,g);d.transmission>0?n.unshift(p):d.transparent===!0?s.unshift(p):t.unshift(p)}function c(h,f){t.length>1&&t.sort(h||Gy),n.length>1&&n.sort(f||nf),s.length>1&&s.sort(f||nf)}function u(){for(let h=e,f=i.length;h<f;h++){let d=i[h];if(d.id===null)break;d.id=null,d.object=null,d.geometry=null,d.material=null,d.group=null}}return{opaque:t,transmissive:n,transparent:s,init:r,push:o,unshift:l,finish:u,sort:c}}function Wy(){let i=new WeakMap;function e(n,s){let r=i.get(n),a;return r===void 0?(a=new sf,i.set(n,[a])):s>=r.length?(a=new sf,r.push(a)):a=r[s],a}function t(){i=new WeakMap}return{get:e,dispose:t}}function Xy(){let i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new D,color:new ke};break;case"SpotLight":t={position:new D,direction:new D,color:new ke,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new D,color:new ke,distance:0,decay:0};break;case"HemisphereLight":t={direction:new D,skyColor:new ke,groundColor:new ke};break;case"RectAreaLight":t={color:new ke,position:new D,halfWidth:new D,halfHeight:new D};break}return i[e.id]=t,t}}}function $y(){let i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new fe};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new fe};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new fe,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}var qy=0;function Yy(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function Zy(i){let e=new Xy,t=$y(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new D);let s=new D,r=new Ye,a=new Ye;function o(c){let u=0,h=0,f=0;for(let S=0;S<9;S++)n.probe[S].set(0,0,0);let d=0,m=0,_=0,g=0,p=0,E=0,v=0,y=0,A=0,T=0,R=0;c.sort(Yy);for(let S=0,M=c.length;S<M;S++){let P=c[S],O=P.color,V=P.intensity,$=P.distance,L=P.shadow&&P.shadow.map?P.shadow.map.texture:null;if(P.isAmbientLight)u+=O.r*V,h+=O.g*V,f+=O.b*V;else if(P.isLightProbe){for(let H=0;H<9;H++)n.probe[H].addScaledVector(P.sh.coefficients[H],V);R++}else if(P.isDirectionalLight){let H=e.get(P);if(H.color.copy(P.color).multiplyScalar(P.intensity),P.castShadow){let N=P.shadow,k=t.get(P);k.shadowIntensity=N.intensity,k.shadowBias=N.bias,k.shadowNormalBias=N.normalBias,k.shadowRadius=N.radius,k.shadowMapSize=N.mapSize,n.directionalShadow[d]=k,n.directionalShadowMap[d]=L,n.directionalShadowMatrix[d]=P.shadow.matrix,E++}n.directional[d]=H,d++}else if(P.isSpotLight){let H=e.get(P);H.position.setFromMatrixPosition(P.matrixWorld),H.color.copy(O).multiplyScalar(V),H.distance=$,H.coneCos=Math.cos(P.angle),H.penumbraCos=Math.cos(P.angle*(1-P.penumbra)),H.decay=P.decay,n.spot[_]=H;let N=P.shadow;if(P.map&&(n.spotLightMap[A]=P.map,A++,N.updateMatrices(P),P.castShadow&&T++),n.spotLightMatrix[_]=N.matrix,P.castShadow){let k=t.get(P);k.shadowIntensity=N.intensity,k.shadowBias=N.bias,k.shadowNormalBias=N.normalBias,k.shadowRadius=N.radius,k.shadowMapSize=N.mapSize,n.spotShadow[_]=k,n.spotShadowMap[_]=L,y++}_++}else if(P.isRectAreaLight){let H=e.get(P);H.color.copy(O).multiplyScalar(V),H.halfWidth.set(P.width*.5,0,0),H.halfHeight.set(0,P.height*.5,0),n.rectArea[g]=H,g++}else if(P.isPointLight){let H=e.get(P);if(H.color.copy(P.color).multiplyScalar(P.intensity),H.distance=P.distance,H.decay=P.decay,P.castShadow){let N=P.shadow,k=t.get(P);k.shadowIntensity=N.intensity,k.shadowBias=N.bias,k.shadowNormalBias=N.normalBias,k.shadowRadius=N.radius,k.shadowMapSize=N.mapSize,k.shadowCameraNear=N.camera.near,k.shadowCameraFar=N.camera.far,n.pointShadow[m]=k,n.pointShadowMap[m]=L,n.pointShadowMatrix[m]=P.shadow.matrix,v++}n.point[m]=H,m++}else if(P.isHemisphereLight){let H=e.get(P);H.skyColor.copy(P.color).multiplyScalar(V),H.groundColor.copy(P.groundColor).multiplyScalar(V),n.hemi[p]=H,p++}}g>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=pe.LTC_FLOAT_1,n.rectAreaLTC2=pe.LTC_FLOAT_2):(n.rectAreaLTC1=pe.LTC_HALF_1,n.rectAreaLTC2=pe.LTC_HALF_2)),n.ambient[0]=u,n.ambient[1]=h,n.ambient[2]=f;let I=n.hash;(I.directionalLength!==d||I.pointLength!==m||I.spotLength!==_||I.rectAreaLength!==g||I.hemiLength!==p||I.numDirectionalShadows!==E||I.numPointShadows!==v||I.numSpotShadows!==y||I.numSpotMaps!==A||I.numLightProbes!==R)&&(n.directional.length=d,n.spot.length=_,n.rectArea.length=g,n.point.length=m,n.hemi.length=p,n.directionalShadow.length=E,n.directionalShadowMap.length=E,n.pointShadow.length=v,n.pointShadowMap.length=v,n.spotShadow.length=y,n.spotShadowMap.length=y,n.directionalShadowMatrix.length=E,n.pointShadowMatrix.length=v,n.spotLightMatrix.length=y+A-T,n.spotLightMap.length=A,n.numSpotLightShadowsWithMaps=T,n.numLightProbes=R,I.directionalLength=d,I.pointLength=m,I.spotLength=_,I.rectAreaLength=g,I.hemiLength=p,I.numDirectionalShadows=E,I.numPointShadows=v,I.numSpotShadows=y,I.numSpotMaps=A,I.numLightProbes=R,n.version=qy++)}function l(c,u){let h=0,f=0,d=0,m=0,_=0,g=u.matrixWorldInverse;for(let p=0,E=c.length;p<E;p++){let v=c[p];if(v.isDirectionalLight){let y=n.directional[h];y.direction.setFromMatrixPosition(v.matrixWorld),s.setFromMatrixPosition(v.target.matrixWorld),y.direction.sub(s),y.direction.transformDirection(g),h++}else if(v.isSpotLight){let y=n.spot[d];y.position.setFromMatrixPosition(v.matrixWorld),y.position.applyMatrix4(g),y.direction.setFromMatrixPosition(v.matrixWorld),s.setFromMatrixPosition(v.target.matrixWorld),y.direction.sub(s),y.direction.transformDirection(g),d++}else if(v.isRectAreaLight){let y=n.rectArea[m];y.position.setFromMatrixPosition(v.matrixWorld),y.position.applyMatrix4(g),a.identity(),r.copy(v.matrixWorld),r.premultiply(g),a.extractRotation(r),y.halfWidth.set(v.width*.5,0,0),y.halfHeight.set(0,v.height*.5,0),y.halfWidth.applyMatrix4(a),y.halfHeight.applyMatrix4(a),m++}else if(v.isPointLight){let y=n.point[f];y.position.setFromMatrixPosition(v.matrixWorld),y.position.applyMatrix4(g),f++}else if(v.isHemisphereLight){let y=n.hemi[_];y.direction.setFromMatrixPosition(v.matrixWorld),y.direction.transformDirection(g),_++}}}return{setup:o,setupView:l,state:n}}function rf(i){let e=new Zy(i),t=[],n=[];function s(u){c.camera=u,t.length=0,n.length=0}function r(u){t.push(u)}function a(u){n.push(u)}function o(){e.setup(t)}function l(u){e.setupView(t,u)}let c={lightsArray:t,shadowsArray:n,camera:null,lights:e,transmissionRenderTarget:{}};return{init:s,state:c,setupLights:o,setupLightsView:l,pushLight:r,pushShadow:a}}function Jy(i){let e=new WeakMap;function t(s,r=0){let a=e.get(s),o;return a===void 0?(o=new rf(i),e.set(s,[o])):r>=a.length?(o=new rf(i),a.push(o)):o=a[r],o}function n(){e=new WeakMap}return{get:t,dispose:n}}var Ky=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,jy=`uniform sampler2D shadow_pass;
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
}`;function Qy(i,e,t){let n=new Fs,s=new fe,r=new fe,a=new ft,o=new yo({depthPacking:_d}),l=new xo,c={},u=t.maxTextureSize,h={[Jn]:Bt,[Bt]:Jn,[yn]:yn},f=new cn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new fe},radius:{value:4}},vertexShader:Ky,fragmentShader:jy}),d=f.clone();d.defines.HORIZONTAL_PASS=1;let m=new gt;m.setAttribute("position",new wt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let _=new ct(m,f),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Nc;let p=this.type;this.render=function(T,R,I){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||T.length===0)return;let S=i.getRenderTarget(),M=i.getActiveCubeFace(),P=i.getActiveMipmapLevel(),O=i.state;O.setBlending(ii),O.buffers.depth.getReversed()===!0?O.buffers.color.setClear(0,0,0,0):O.buffers.color.setClear(1,1,1,1),O.buffers.depth.setTest(!0),O.setScissorTest(!1);let V=p!==kn&&this.type===kn,$=p===kn&&this.type!==kn;for(let L=0,H=T.length;L<H;L++){let N=T[L],k=N.shadow;if(k===void 0){console.warn("THREE.WebGLShadowMap:",N,"has no shadow.");continue}if(k.autoUpdate===!1&&k.needsUpdate===!1)continue;s.copy(k.mapSize);let Q=k.getFrameExtents();if(s.multiply(Q),r.copy(k.mapSize),(s.x>u||s.y>u)&&(s.x>u&&(r.x=Math.floor(u/Q.x),s.x=r.x*Q.x,k.mapSize.x=r.x),s.y>u&&(r.y=Math.floor(u/Q.y),s.y=r.y*Q.y,k.mapSize.y=r.y)),k.map===null||V===!0||$===!0){let ge=this.type!==kn?{minFilter:Jt,magFilter:Jt}:{};k.map!==null&&k.map.dispose(),k.map=new On(s.x,s.y,ge),k.map.texture.name=N.name+".shadowMap",k.camera.updateProjectionMatrix()}i.setRenderTarget(k.map),i.clear();let le=k.getViewportCount();for(let ge=0;ge<le;ge++){let Ne=k.getViewport(ge);a.set(r.x*Ne.x,r.y*Ne.y,r.x*Ne.z,r.y*Ne.w),O.viewport(a),k.updateMatrices(N,ge),n=k.getFrustum(),y(R,I,k.camera,N,this.type)}k.isPointLightShadow!==!0&&this.type===kn&&E(k,I),k.needsUpdate=!1}p=this.type,g.needsUpdate=!1,i.setRenderTarget(S,M,P)};function E(T,R){let I=e.update(_);f.defines.VSM_SAMPLES!==T.blurSamples&&(f.defines.VSM_SAMPLES=T.blurSamples,d.defines.VSM_SAMPLES=T.blurSamples,f.needsUpdate=!0,d.needsUpdate=!0),T.mapPass===null&&(T.mapPass=new On(s.x,s.y)),f.uniforms.shadow_pass.value=T.map.texture,f.uniforms.resolution.value=T.mapSize,f.uniforms.radius.value=T.radius,i.setRenderTarget(T.mapPass),i.clear(),i.renderBufferDirect(R,null,I,f,_,null),d.uniforms.shadow_pass.value=T.mapPass.texture,d.uniforms.resolution.value=T.mapSize,d.uniforms.radius.value=T.radius,i.setRenderTarget(T.map),i.clear(),i.renderBufferDirect(R,null,I,d,_,null)}function v(T,R,I,S){let M=null,P=I.isPointLight===!0?T.customDistanceMaterial:T.customDepthMaterial;if(P!==void 0)M=P;else if(M=I.isPointLight===!0?l:o,i.localClippingEnabled&&R.clipShadows===!0&&Array.isArray(R.clippingPlanes)&&R.clippingPlanes.length!==0||R.displacementMap&&R.displacementScale!==0||R.alphaMap&&R.alphaTest>0||R.map&&R.alphaTest>0||R.alphaToCoverage===!0){let O=M.uuid,V=R.uuid,$=c[O];$===void 0&&($={},c[O]=$);let L=$[V];L===void 0&&(L=M.clone(),$[V]=L,R.addEventListener("dispose",A)),M=L}if(M.visible=R.visible,M.wireframe=R.wireframe,S===kn?M.side=R.shadowSide!==null?R.shadowSide:R.side:M.side=R.shadowSide!==null?R.shadowSide:h[R.side],M.alphaMap=R.alphaMap,M.alphaTest=R.alphaToCoverage===!0?.5:R.alphaTest,M.map=R.map,M.clipShadows=R.clipShadows,M.clippingPlanes=R.clippingPlanes,M.clipIntersection=R.clipIntersection,M.displacementMap=R.displacementMap,M.displacementScale=R.displacementScale,M.displacementBias=R.displacementBias,M.wireframeLinewidth=R.wireframeLinewidth,M.linewidth=R.linewidth,I.isPointLight===!0&&M.isMeshDistanceMaterial===!0){let O=i.properties.get(M);O.light=I}return M}function y(T,R,I,S,M){if(T.visible===!1)return;if(T.layers.test(R.layers)&&(T.isMesh||T.isLine||T.isPoints)&&(T.castShadow||T.receiveShadow&&M===kn)&&(!T.frustumCulled||n.intersectsObject(T))){T.modelViewMatrix.multiplyMatrices(I.matrixWorldInverse,T.matrixWorld);let V=e.update(T),$=T.material;if(Array.isArray($)){let L=V.groups;for(let H=0,N=L.length;H<N;H++){let k=L[H],Q=$[k.materialIndex];if(Q&&Q.visible){let le=v(T,Q,S,M);T.onBeforeShadow(i,T,R,I,V,le,k),i.renderBufferDirect(I,null,V,le,T,k),T.onAfterShadow(i,T,R,I,V,le,k)}}}else if($.visible){let L=v(T,$,S,M);T.onBeforeShadow(i,T,R,I,V,L,null),i.renderBufferDirect(I,null,V,L,T,null),T.onAfterShadow(i,T,R,I,V,L,null)}}let O=T.children;for(let V=0,$=O.length;V<$;V++)y(O[V],R,I,S,M)}function A(T){T.target.removeEventListener("dispose",A);for(let I in c){let S=c[I],M=T.target.uuid;M in S&&(S[M].dispose(),delete S[M])}}}var ex={[Co]:Io,[Po]:Uo,[Lo]:No,[Xi]:Do,[Io]:Co,[Uo]:Po,[No]:Lo,[Do]:Xi};function tx(i,e){function t(){let U=!1,oe=new ft,de=null,be=new ft(0,0,0,0);return{setMask:function(re){de!==re&&!U&&(i.colorMask(re,re,re,re),de=re)},setLocked:function(re){U=re},setClear:function(re,j,Re,Ve,ut){ut===!0&&(re*=Ve,j*=Ve,Re*=Ve),oe.set(re,j,Re,Ve),be.equals(oe)===!1&&(i.clearColor(re,j,Re,Ve),be.copy(oe))},reset:function(){U=!1,de=null,be.set(-1,0,0,0)}}}function n(){let U=!1,oe=!1,de=null,be=null,re=null;return{setReversed:function(j){if(oe!==j){let Re=e.get("EXT_clip_control");j?Re.clipControlEXT(Re.LOWER_LEFT_EXT,Re.ZERO_TO_ONE_EXT):Re.clipControlEXT(Re.LOWER_LEFT_EXT,Re.NEGATIVE_ONE_TO_ONE_EXT),oe=j;let Ve=re;re=null,this.setClear(Ve)}},getReversed:function(){return oe},setTest:function(j){j?ne(i.DEPTH_TEST):Se(i.DEPTH_TEST)},setMask:function(j){de!==j&&!U&&(i.depthMask(j),de=j)},setFunc:function(j){if(oe&&(j=ex[j]),be!==j){switch(j){case Co:i.depthFunc(i.NEVER);break;case Io:i.depthFunc(i.ALWAYS);break;case Po:i.depthFunc(i.LESS);break;case Xi:i.depthFunc(i.LEQUAL);break;case Lo:i.depthFunc(i.EQUAL);break;case Do:i.depthFunc(i.GEQUAL);break;case Uo:i.depthFunc(i.GREATER);break;case No:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}be=j}},setLocked:function(j){U=j},setClear:function(j){re!==j&&(oe&&(j=1-j),i.clearDepth(j),re=j)},reset:function(){U=!1,de=null,be=null,re=null,oe=!1}}}function s(){let U=!1,oe=null,de=null,be=null,re=null,j=null,Re=null,Ve=null,ut=null;return{setTest:function(rt){U||(rt?ne(i.STENCIL_TEST):Se(i.STENCIL_TEST))},setMask:function(rt){oe!==rt&&!U&&(i.stencilMask(rt),oe=rt)},setFunc:function(rt,Gn,Un){(de!==rt||be!==Gn||re!==Un)&&(i.stencilFunc(rt,Gn,Un),de=rt,be=Gn,re=Un)},setOp:function(rt,Gn,Un){(j!==rt||Re!==Gn||Ve!==Un)&&(i.stencilOp(rt,Gn,Un),j=rt,Re=Gn,Ve=Un)},setLocked:function(rt){U=rt},setClear:function(rt){ut!==rt&&(i.clearStencil(rt),ut=rt)},reset:function(){U=!1,oe=null,de=null,be=null,re=null,j=null,Re=null,Ve=null,ut=null}}}let r=new t,a=new n,o=new s,l=new WeakMap,c=new WeakMap,u={},h={},f=new WeakMap,d=[],m=null,_=!1,g=null,p=null,E=null,v=null,y=null,A=null,T=null,R=new ke(0,0,0),I=0,S=!1,M=null,P=null,O=null,V=null,$=null,L=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS),H=!1,N=0,k=i.getParameter(i.VERSION);k.indexOf("WebGL")!==-1?(N=parseFloat(/^WebGL (\d)/.exec(k)[1]),H=N>=1):k.indexOf("OpenGL ES")!==-1&&(N=parseFloat(/^OpenGL ES (\d)/.exec(k)[1]),H=N>=2);let Q=null,le={},ge=i.getParameter(i.SCISSOR_BOX),Ne=i.getParameter(i.VIEWPORT),We=new ft().fromArray(ge),et=new ft().fromArray(Ne);function Ke(U,oe,de,be){let re=new Uint8Array(4),j=i.createTexture();i.bindTexture(U,j),i.texParameteri(U,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(U,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Re=0;Re<de;Re++)U===i.TEXTURE_3D||U===i.TEXTURE_2D_ARRAY?i.texImage3D(oe,0,i.RGBA,1,1,be,0,i.RGBA,i.UNSIGNED_BYTE,re):i.texImage2D(oe+Re,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,re);return j}let Y={};Y[i.TEXTURE_2D]=Ke(i.TEXTURE_2D,i.TEXTURE_2D,1),Y[i.TEXTURE_CUBE_MAP]=Ke(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),Y[i.TEXTURE_2D_ARRAY]=Ke(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),Y[i.TEXTURE_3D]=Ke(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),ne(i.DEPTH_TEST),a.setFunc(Xi),J(!1),Z(Uc),ne(i.CULL_FACE),te(ii);function ne(U){u[U]!==!0&&(i.enable(U),u[U]=!0)}function Se(U){u[U]!==!1&&(i.disable(U),u[U]=!1)}function Le(U,oe){return h[U]!==oe?(i.bindFramebuffer(U,oe),h[U]=oe,U===i.DRAW_FRAMEBUFFER&&(h[i.FRAMEBUFFER]=oe),U===i.FRAMEBUFFER&&(h[i.DRAW_FRAMEBUFFER]=oe),!0):!1}function we(U,oe){let de=d,be=!1;if(U){de=f.get(oe),de===void 0&&(de=[],f.set(oe,de));let re=U.textures;if(de.length!==re.length||de[0]!==i.COLOR_ATTACHMENT0){for(let j=0,Re=re.length;j<Re;j++)de[j]=i.COLOR_ATTACHMENT0+j;de.length=re.length,be=!0}}else de[0]!==i.BACK&&(de[0]=i.BACK,be=!0);be&&i.drawBuffers(de)}function je(U){return m!==U?(i.useProgram(U),m=U,!0):!1}let ht={[Mi]:i.FUNC_ADD,[ku]:i.FUNC_SUBTRACT,[Hu]:i.FUNC_REVERSE_SUBTRACT};ht[Vu]=i.MIN,ht[Gu]=i.MAX;let C={[Wu]:i.ZERO,[Xu]:i.ONE,[$u]:i.SRC_COLOR,[eo]:i.SRC_ALPHA,[ju]:i.SRC_ALPHA_SATURATE,[Ju]:i.DST_COLOR,[Yu]:i.DST_ALPHA,[qu]:i.ONE_MINUS_SRC_COLOR,[to]:i.ONE_MINUS_SRC_ALPHA,[Ku]:i.ONE_MINUS_DST_COLOR,[Zu]:i.ONE_MINUS_DST_ALPHA,[Qu]:i.CONSTANT_COLOR,[ed]:i.ONE_MINUS_CONSTANT_COLOR,[td]:i.CONSTANT_ALPHA,[nd]:i.ONE_MINUS_CONSTANT_ALPHA};function te(U,oe,de,be,re,j,Re,Ve,ut,rt){if(U===ii){_===!0&&(Se(i.BLEND),_=!1);return}if(_===!1&&(ne(i.BLEND),_=!0),U!==zu){if(U!==g||rt!==S){if((p!==Mi||y!==Mi)&&(i.blendEquation(i.FUNC_ADD),p=Mi,y=Mi),rt)switch(U){case Wi:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Fc:i.blendFunc(i.ONE,i.ONE);break;case Oc:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Bc:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:console.error("THREE.WebGLState: Invalid blending: ",U);break}else switch(U){case Wi:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Fc:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case Oc:console.error("THREE.WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Bc:console.error("THREE.WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:console.error("THREE.WebGLState: Invalid blending: ",U);break}E=null,v=null,A=null,T=null,R.set(0,0,0),I=0,g=U,S=rt}return}re=re||oe,j=j||de,Re=Re||be,(oe!==p||re!==y)&&(i.blendEquationSeparate(ht[oe],ht[re]),p=oe,y=re),(de!==E||be!==v||j!==A||Re!==T)&&(i.blendFuncSeparate(C[de],C[be],C[j],C[Re]),E=de,v=be,A=j,T=Re),(Ve.equals(R)===!1||ut!==I)&&(i.blendColor(Ve.r,Ve.g,Ve.b,ut),R.copy(Ve),I=ut),g=U,S=!1}function K(U,oe){U.side===yn?Se(i.CULL_FACE):ne(i.CULL_FACE);let de=U.side===Bt;oe&&(de=!de),J(de),U.blending===Wi&&U.transparent===!1?te(ii):te(U.blending,U.blendEquation,U.blendSrc,U.blendDst,U.blendEquationAlpha,U.blendSrcAlpha,U.blendDstAlpha,U.blendColor,U.blendAlpha,U.premultipliedAlpha),a.setFunc(U.depthFunc),a.setTest(U.depthTest),a.setMask(U.depthWrite),r.setMask(U.colorWrite);let be=U.stencilWrite;o.setTest(be),be&&(o.setMask(U.stencilWriteMask),o.setFunc(U.stencilFunc,U.stencilRef,U.stencilFuncMask),o.setOp(U.stencilFail,U.stencilZFail,U.stencilZPass)),ie(U.polygonOffset,U.polygonOffsetFactor,U.polygonOffsetUnits),U.alphaToCoverage===!0?ne(i.SAMPLE_ALPHA_TO_COVERAGE):Se(i.SAMPLE_ALPHA_TO_COVERAGE)}function J(U){M!==U&&(U?i.frontFace(i.CW):i.frontFace(i.CCW),M=U)}function Z(U){U!==Ou?(ne(i.CULL_FACE),U!==P&&(U===Uc?i.cullFace(i.BACK):U===Bu?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):Se(i.CULL_FACE),P=U}function he(U){U!==O&&(H&&i.lineWidth(U),O=U)}function ie(U,oe,de){U?(ne(i.POLYGON_OFFSET_FILL),(V!==oe||$!==de)&&(i.polygonOffset(oe,de),V=oe,$=de)):Se(i.POLYGON_OFFSET_FILL)}function ue(U){U?ne(i.SCISSOR_TEST):Se(i.SCISSOR_TEST)}function He(U){U===void 0&&(U=i.TEXTURE0+L-1),Q!==U&&(i.activeTexture(U),Q=U)}function ze(U,oe,de){de===void 0&&(Q===null?de=i.TEXTURE0+L-1:de=Q);let be=le[de];be===void 0&&(be={type:void 0,texture:void 0},le[de]=be),(be.type!==U||be.texture!==oe)&&(Q!==de&&(i.activeTexture(de),Q=de),i.bindTexture(U,oe||Y[U]),be.type=U,be.texture=oe)}function w(){let U=le[Q];U!==void 0&&U.type!==void 0&&(i.bindTexture(U.type,null),U.type=void 0,U.texture=void 0)}function x(){try{i.compressedTexImage2D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function z(){try{i.compressedTexImage3D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function X(){try{i.texSubImage2D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function ee(){try{i.texSubImage3D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function q(){try{i.compressedTexSubImage2D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Ce(){try{i.compressedTexSubImage3D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function ce(){try{i.texStorage2D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Te(){try{i.texStorage3D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Ae(){try{i.texImage2D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function se(){try{i.texImage3D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function ye(U){We.equals(U)===!1&&(i.scissor(U.x,U.y,U.z,U.w),We.copy(U))}function Oe(U){et.equals(U)===!1&&(i.viewport(U.x,U.y,U.z,U.w),et.copy(U))}function Ie(U,oe){let de=c.get(oe);de===void 0&&(de=new WeakMap,c.set(oe,de));let be=de.get(U);be===void 0&&(be=i.getUniformBlockIndex(oe,U.name),de.set(U,be))}function me(U,oe){let be=c.get(oe).get(U);l.get(oe)!==be&&(i.uniformBlockBinding(oe,be,U.__bindingPointIndex),l.set(oe,be))}function Xe(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),a.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),u={},Q=null,le={},h={},f=new WeakMap,d=[],m=null,_=!1,g=null,p=null,E=null,v=null,y=null,A=null,T=null,R=new ke(0,0,0),I=0,S=!1,M=null,P=null,O=null,V=null,$=null,We.set(0,0,i.canvas.width,i.canvas.height),et.set(0,0,i.canvas.width,i.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:ne,disable:Se,bindFramebuffer:Le,drawBuffers:we,useProgram:je,setBlending:te,setMaterial:K,setFlipSided:J,setCullFace:Z,setLineWidth:he,setPolygonOffset:ie,setScissorTest:ue,activeTexture:He,bindTexture:ze,unbindTexture:w,compressedTexImage2D:x,compressedTexImage3D:z,texImage2D:Ae,texImage3D:se,updateUBOMapping:Ie,uniformBlockBinding:me,texStorage2D:ce,texStorage3D:Te,texSubImage2D:X,texSubImage3D:ee,compressedTexSubImage2D:q,compressedTexSubImage3D:Ce,scissor:ye,viewport:Oe,reset:Xe}}function nx(i,e,t,n,s,r,a){let o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new fe,u=new WeakMap,h,f=new WeakMap,d=!1;try{d=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function m(w,x){return d?new OffscreenCanvas(w,x):Tr("canvas")}function _(w,x,z){let X=1,ee=ze(w);if((ee.width>z||ee.height>z)&&(X=z/Math.max(ee.width,ee.height)),X<1)if(typeof HTMLImageElement<"u"&&w instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&w instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&w instanceof ImageBitmap||typeof VideoFrame<"u"&&w instanceof VideoFrame){let q=Math.floor(X*ee.width),Ce=Math.floor(X*ee.height);h===void 0&&(h=m(q,Ce));let ce=x?m(q,Ce):h;return ce.width=q,ce.height=Ce,ce.getContext("2d").drawImage(w,0,0,q,Ce),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+ee.width+"x"+ee.height+") to ("+q+"x"+Ce+")."),ce}else return"data"in w&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+ee.width+"x"+ee.height+")."),w;return w}function g(w){return w.generateMipmaps}function p(w){i.generateMipmap(w)}function E(w){return w.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:w.isWebGL3DRenderTarget?i.TEXTURE_3D:w.isWebGLArrayRenderTarget||w.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function v(w,x,z,X,ee=!1){if(w!==null){if(i[w]!==void 0)return i[w];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+w+"'")}let q=x;if(x===i.RED&&(z===i.FLOAT&&(q=i.R32F),z===i.HALF_FLOAT&&(q=i.R16F),z===i.UNSIGNED_BYTE&&(q=i.R8)),x===i.RED_INTEGER&&(z===i.UNSIGNED_BYTE&&(q=i.R8UI),z===i.UNSIGNED_SHORT&&(q=i.R16UI),z===i.UNSIGNED_INT&&(q=i.R32UI),z===i.BYTE&&(q=i.R8I),z===i.SHORT&&(q=i.R16I),z===i.INT&&(q=i.R32I)),x===i.RG&&(z===i.FLOAT&&(q=i.RG32F),z===i.HALF_FLOAT&&(q=i.RG16F),z===i.UNSIGNED_BYTE&&(q=i.RG8)),x===i.RG_INTEGER&&(z===i.UNSIGNED_BYTE&&(q=i.RG8UI),z===i.UNSIGNED_SHORT&&(q=i.RG16UI),z===i.UNSIGNED_INT&&(q=i.RG32UI),z===i.BYTE&&(q=i.RG8I),z===i.SHORT&&(q=i.RG16I),z===i.INT&&(q=i.RG32I)),x===i.RGB_INTEGER&&(z===i.UNSIGNED_BYTE&&(q=i.RGB8UI),z===i.UNSIGNED_SHORT&&(q=i.RGB16UI),z===i.UNSIGNED_INT&&(q=i.RGB32UI),z===i.BYTE&&(q=i.RGB8I),z===i.SHORT&&(q=i.RGB16I),z===i.INT&&(q=i.RGB32I)),x===i.RGBA_INTEGER&&(z===i.UNSIGNED_BYTE&&(q=i.RGBA8UI),z===i.UNSIGNED_SHORT&&(q=i.RGBA16UI),z===i.UNSIGNED_INT&&(q=i.RGBA32UI),z===i.BYTE&&(q=i.RGBA8I),z===i.SHORT&&(q=i.RGBA16I),z===i.INT&&(q=i.RGBA32I)),x===i.RGB&&(z===i.UNSIGNED_INT_5_9_9_9_REV&&(q=i.RGB9_E5),z===i.UNSIGNED_INT_10F_11F_11F_REV&&(q=i.R11F_G11F_B10F)),x===i.RGBA){let Ce=ee?Er:it.getTransfer(X);z===i.FLOAT&&(q=i.RGBA32F),z===i.HALF_FLOAT&&(q=i.RGBA16F),z===i.UNSIGNED_BYTE&&(q=Ce===at?i.SRGB8_ALPHA8:i.RGBA8),z===i.UNSIGNED_SHORT_4_4_4_4&&(q=i.RGBA4),z===i.UNSIGNED_SHORT_5_5_5_1&&(q=i.RGB5_A1)}return(q===i.R16F||q===i.R32F||q===i.RG16F||q===i.RG32F||q===i.RGBA16F||q===i.RGBA32F)&&e.get("EXT_color_buffer_float"),q}function y(w,x){let z;return w?x===null||x===wi||x===$s?z=i.DEPTH24_STENCIL8:x===xn?z=i.DEPTH32F_STENCIL8:x===Ws&&(z=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):x===null||x===wi||x===$s?z=i.DEPTH_COMPONENT24:x===xn?z=i.DEPTH_COMPONENT32F:x===Ws&&(z=i.DEPTH_COMPONENT16),z}function A(w,x){return g(w)===!0||w.isFramebufferTexture&&w.minFilter!==Jt&&w.minFilter!==Tn?Math.log2(Math.max(x.width,x.height))+1:w.mipmaps!==void 0&&w.mipmaps.length>0?w.mipmaps.length:w.isCompressedTexture&&Array.isArray(w.image)?x.mipmaps.length:1}function T(w){let x=w.target;x.removeEventListener("dispose",T),I(x),x.isVideoTexture&&u.delete(x)}function R(w){let x=w.target;x.removeEventListener("dispose",R),M(x)}function I(w){let x=n.get(w);if(x.__webglInit===void 0)return;let z=w.source,X=f.get(z);if(X){let ee=X[x.__cacheKey];ee.usedTimes--,ee.usedTimes===0&&S(w),Object.keys(X).length===0&&f.delete(z)}n.remove(w)}function S(w){let x=n.get(w);i.deleteTexture(x.__webglTexture);let z=w.source,X=f.get(z);delete X[x.__cacheKey],a.memory.textures--}function M(w){let x=n.get(w);if(w.depthTexture&&(w.depthTexture.dispose(),n.remove(w.depthTexture)),w.isWebGLCubeRenderTarget)for(let X=0;X<6;X++){if(Array.isArray(x.__webglFramebuffer[X]))for(let ee=0;ee<x.__webglFramebuffer[X].length;ee++)i.deleteFramebuffer(x.__webglFramebuffer[X][ee]);else i.deleteFramebuffer(x.__webglFramebuffer[X]);x.__webglDepthbuffer&&i.deleteRenderbuffer(x.__webglDepthbuffer[X])}else{if(Array.isArray(x.__webglFramebuffer))for(let X=0;X<x.__webglFramebuffer.length;X++)i.deleteFramebuffer(x.__webglFramebuffer[X]);else i.deleteFramebuffer(x.__webglFramebuffer);if(x.__webglDepthbuffer&&i.deleteRenderbuffer(x.__webglDepthbuffer),x.__webglMultisampledFramebuffer&&i.deleteFramebuffer(x.__webglMultisampledFramebuffer),x.__webglColorRenderbuffer)for(let X=0;X<x.__webglColorRenderbuffer.length;X++)x.__webglColorRenderbuffer[X]&&i.deleteRenderbuffer(x.__webglColorRenderbuffer[X]);x.__webglDepthRenderbuffer&&i.deleteRenderbuffer(x.__webglDepthRenderbuffer)}let z=w.textures;for(let X=0,ee=z.length;X<ee;X++){let q=n.get(z[X]);q.__webglTexture&&(i.deleteTexture(q.__webglTexture),a.memory.textures--),n.remove(z[X])}n.remove(w)}let P=0;function O(){P=0}function V(){let w=P;return w>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+w+" texture units while this GPU supports only "+s.maxTextures),P+=1,w}function $(w){let x=[];return x.push(w.wrapS),x.push(w.wrapT),x.push(w.wrapR||0),x.push(w.magFilter),x.push(w.minFilter),x.push(w.anisotropy),x.push(w.internalFormat),x.push(w.format),x.push(w.type),x.push(w.generateMipmaps),x.push(w.premultiplyAlpha),x.push(w.flipY),x.push(w.unpackAlignment),x.push(w.colorSpace),x.join()}function L(w,x){let z=n.get(w);if(w.isVideoTexture&&ue(w),w.isRenderTargetTexture===!1&&w.isExternalTexture!==!0&&w.version>0&&z.__version!==w.version){let X=w.image;if(X===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(X.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{Y(z,w,x);return}}else w.isExternalTexture&&(z.__webglTexture=w.sourceTexture?w.sourceTexture:null);t.bindTexture(i.TEXTURE_2D,z.__webglTexture,i.TEXTURE0+x)}function H(w,x){let z=n.get(w);if(w.isRenderTargetTexture===!1&&w.version>0&&z.__version!==w.version){Y(z,w,x);return}t.bindTexture(i.TEXTURE_2D_ARRAY,z.__webglTexture,i.TEXTURE0+x)}function N(w,x){let z=n.get(w);if(w.isRenderTargetTexture===!1&&w.version>0&&z.__version!==w.version){Y(z,w,x);return}t.bindTexture(i.TEXTURE_3D,z.__webglTexture,i.TEXTURE0+x)}function k(w,x){let z=n.get(w);if(w.version>0&&z.__version!==w.version){ne(z,w,x);return}t.bindTexture(i.TEXTURE_CUBE_MAP,z.__webglTexture,i.TEXTURE0+x)}let Q={[no]:i.REPEAT,[vi]:i.CLAMP_TO_EDGE,[io]:i.MIRRORED_REPEAT},le={[Jt]:i.NEAREST,[dd]:i.NEAREST_MIPMAP_NEAREST,[ca]:i.NEAREST_MIPMAP_LINEAR,[Tn]:i.LINEAR,[zo]:i.LINEAR_MIPMAP_NEAREST,[Ei]:i.LINEAR_MIPMAP_LINEAR},ge={[xd]:i.NEVER,[wd]:i.ALWAYS,[vd]:i.LESS,[Zc]:i.LEQUAL,[Md]:i.EQUAL,[Ed]:i.GEQUAL,[Sd]:i.GREATER,[bd]:i.NOTEQUAL};function Ne(w,x){if(x.type===xn&&e.has("OES_texture_float_linear")===!1&&(x.magFilter===Tn||x.magFilter===zo||x.magFilter===ca||x.magFilter===Ei||x.minFilter===Tn||x.minFilter===zo||x.minFilter===ca||x.minFilter===Ei)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(w,i.TEXTURE_WRAP_S,Q[x.wrapS]),i.texParameteri(w,i.TEXTURE_WRAP_T,Q[x.wrapT]),(w===i.TEXTURE_3D||w===i.TEXTURE_2D_ARRAY)&&i.texParameteri(w,i.TEXTURE_WRAP_R,Q[x.wrapR]),i.texParameteri(w,i.TEXTURE_MAG_FILTER,le[x.magFilter]),i.texParameteri(w,i.TEXTURE_MIN_FILTER,le[x.minFilter]),x.compareFunction&&(i.texParameteri(w,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(w,i.TEXTURE_COMPARE_FUNC,ge[x.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(x.magFilter===Jt||x.minFilter!==ca&&x.minFilter!==Ei||x.type===xn&&e.has("OES_texture_float_linear")===!1)return;if(x.anisotropy>1||n.get(x).__currentAnisotropy){let z=e.get("EXT_texture_filter_anisotropic");i.texParameterf(w,z.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(x.anisotropy,s.getMaxAnisotropy())),n.get(x).__currentAnisotropy=x.anisotropy}}}function We(w,x){let z=!1;w.__webglInit===void 0&&(w.__webglInit=!0,x.addEventListener("dispose",T));let X=x.source,ee=f.get(X);ee===void 0&&(ee={},f.set(X,ee));let q=$(x);if(q!==w.__cacheKey){ee[q]===void 0&&(ee[q]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,z=!0),ee[q].usedTimes++;let Ce=ee[w.__cacheKey];Ce!==void 0&&(ee[w.__cacheKey].usedTimes--,Ce.usedTimes===0&&S(x)),w.__cacheKey=q,w.__webglTexture=ee[q].texture}return z}function et(w,x,z){return Math.floor(Math.floor(w/z)/x)}function Ke(w,x,z,X){let q=w.updateRanges;if(q.length===0)t.texSubImage2D(i.TEXTURE_2D,0,0,0,x.width,x.height,z,X,x.data);else{q.sort((se,ye)=>se.start-ye.start);let Ce=0;for(let se=1;se<q.length;se++){let ye=q[Ce],Oe=q[se],Ie=ye.start+ye.count,me=et(Oe.start,x.width,4),Xe=et(ye.start,x.width,4);Oe.start<=Ie+1&&me===Xe&&et(Oe.start+Oe.count-1,x.width,4)===me?ye.count=Math.max(ye.count,Oe.start+Oe.count-ye.start):(++Ce,q[Ce]=Oe)}q.length=Ce+1;let ce=i.getParameter(i.UNPACK_ROW_LENGTH),Te=i.getParameter(i.UNPACK_SKIP_PIXELS),Ae=i.getParameter(i.UNPACK_SKIP_ROWS);i.pixelStorei(i.UNPACK_ROW_LENGTH,x.width);for(let se=0,ye=q.length;se<ye;se++){let Oe=q[se],Ie=Math.floor(Oe.start/4),me=Math.ceil(Oe.count/4),Xe=Ie%x.width,U=Math.floor(Ie/x.width),oe=me,de=1;i.pixelStorei(i.UNPACK_SKIP_PIXELS,Xe),i.pixelStorei(i.UNPACK_SKIP_ROWS,U),t.texSubImage2D(i.TEXTURE_2D,0,Xe,U,oe,de,z,X,x.data)}w.clearUpdateRanges(),i.pixelStorei(i.UNPACK_ROW_LENGTH,ce),i.pixelStorei(i.UNPACK_SKIP_PIXELS,Te),i.pixelStorei(i.UNPACK_SKIP_ROWS,Ae)}}function Y(w,x,z){let X=i.TEXTURE_2D;(x.isDataArrayTexture||x.isCompressedArrayTexture)&&(X=i.TEXTURE_2D_ARRAY),x.isData3DTexture&&(X=i.TEXTURE_3D);let ee=We(w,x),q=x.source;t.bindTexture(X,w.__webglTexture,i.TEXTURE0+z);let Ce=n.get(q);if(q.version!==Ce.__version||ee===!0){t.activeTexture(i.TEXTURE0+z);let ce=it.getPrimaries(it.workingColorSpace),Te=x.colorSpace===ri?null:it.getPrimaries(x.colorSpace),Ae=x.colorSpace===ri||ce===Te?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,x.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,x.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ae);let se=_(x.image,!1,s.maxTextureSize);se=He(x,se);let ye=r.convert(x.format,x.colorSpace),Oe=r.convert(x.type),Ie=v(x.internalFormat,ye,Oe,x.colorSpace,x.isVideoTexture);Ne(X,x);let me,Xe=x.mipmaps,U=x.isVideoTexture!==!0,oe=Ce.__version===void 0||ee===!0,de=q.dataReady,be=A(x,se);if(x.isDepthTexture)Ie=y(x.format===qs,x.type),oe&&(U?t.texStorage2D(i.TEXTURE_2D,1,Ie,se.width,se.height):t.texImage2D(i.TEXTURE_2D,0,Ie,se.width,se.height,0,ye,Oe,null));else if(x.isDataTexture)if(Xe.length>0){U&&oe&&t.texStorage2D(i.TEXTURE_2D,be,Ie,Xe[0].width,Xe[0].height);for(let re=0,j=Xe.length;re<j;re++)me=Xe[re],U?de&&t.texSubImage2D(i.TEXTURE_2D,re,0,0,me.width,me.height,ye,Oe,me.data):t.texImage2D(i.TEXTURE_2D,re,Ie,me.width,me.height,0,ye,Oe,me.data);x.generateMipmaps=!1}else U?(oe&&t.texStorage2D(i.TEXTURE_2D,be,Ie,se.width,se.height),de&&Ke(x,se,ye,Oe)):t.texImage2D(i.TEXTURE_2D,0,Ie,se.width,se.height,0,ye,Oe,se.data);else if(x.isCompressedTexture)if(x.isCompressedArrayTexture){U&&oe&&t.texStorage3D(i.TEXTURE_2D_ARRAY,be,Ie,Xe[0].width,Xe[0].height,se.depth);for(let re=0,j=Xe.length;re<j;re++)if(me=Xe[re],x.format!==dn)if(ye!==null)if(U){if(de)if(x.layerUpdates.size>0){let Re=ih(me.width,me.height,x.format,x.type);for(let Ve of x.layerUpdates){let ut=me.data.subarray(Ve*Re/me.data.BYTES_PER_ELEMENT,(Ve+1)*Re/me.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,re,0,0,Ve,me.width,me.height,1,ye,ut)}x.clearLayerUpdates()}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,re,0,0,0,me.width,me.height,se.depth,ye,me.data)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,re,Ie,me.width,me.height,se.depth,0,me.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else U?de&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,re,0,0,0,me.width,me.height,se.depth,ye,Oe,me.data):t.texImage3D(i.TEXTURE_2D_ARRAY,re,Ie,me.width,me.height,se.depth,0,ye,Oe,me.data)}else{U&&oe&&t.texStorage2D(i.TEXTURE_2D,be,Ie,Xe[0].width,Xe[0].height);for(let re=0,j=Xe.length;re<j;re++)me=Xe[re],x.format!==dn?ye!==null?U?de&&t.compressedTexSubImage2D(i.TEXTURE_2D,re,0,0,me.width,me.height,ye,me.data):t.compressedTexImage2D(i.TEXTURE_2D,re,Ie,me.width,me.height,0,me.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):U?de&&t.texSubImage2D(i.TEXTURE_2D,re,0,0,me.width,me.height,ye,Oe,me.data):t.texImage2D(i.TEXTURE_2D,re,Ie,me.width,me.height,0,ye,Oe,me.data)}else if(x.isDataArrayTexture)if(U){if(oe&&t.texStorage3D(i.TEXTURE_2D_ARRAY,be,Ie,se.width,se.height,se.depth),de)if(x.layerUpdates.size>0){let re=ih(se.width,se.height,x.format,x.type);for(let j of x.layerUpdates){let Re=se.data.subarray(j*re/se.data.BYTES_PER_ELEMENT,(j+1)*re/se.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,j,se.width,se.height,1,ye,Oe,Re)}x.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,se.width,se.height,se.depth,ye,Oe,se.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,Ie,se.width,se.height,se.depth,0,ye,Oe,se.data);else if(x.isData3DTexture)U?(oe&&t.texStorage3D(i.TEXTURE_3D,be,Ie,se.width,se.height,se.depth),de&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,se.width,se.height,se.depth,ye,Oe,se.data)):t.texImage3D(i.TEXTURE_3D,0,Ie,se.width,se.height,se.depth,0,ye,Oe,se.data);else if(x.isFramebufferTexture){if(oe)if(U)t.texStorage2D(i.TEXTURE_2D,be,Ie,se.width,se.height);else{let re=se.width,j=se.height;for(let Re=0;Re<be;Re++)t.texImage2D(i.TEXTURE_2D,Re,Ie,re,j,0,ye,Oe,null),re>>=1,j>>=1}}else if(Xe.length>0){if(U&&oe){let re=ze(Xe[0]);t.texStorage2D(i.TEXTURE_2D,be,Ie,re.width,re.height)}for(let re=0,j=Xe.length;re<j;re++)me=Xe[re],U?de&&t.texSubImage2D(i.TEXTURE_2D,re,0,0,ye,Oe,me):t.texImage2D(i.TEXTURE_2D,re,Ie,ye,Oe,me);x.generateMipmaps=!1}else if(U){if(oe){let re=ze(se);t.texStorage2D(i.TEXTURE_2D,be,Ie,re.width,re.height)}de&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,ye,Oe,se)}else t.texImage2D(i.TEXTURE_2D,0,Ie,ye,Oe,se);g(x)&&p(X),Ce.__version=q.version,x.onUpdate&&x.onUpdate(x)}w.__version=x.version}function ne(w,x,z){if(x.image.length!==6)return;let X=We(w,x),ee=x.source;t.bindTexture(i.TEXTURE_CUBE_MAP,w.__webglTexture,i.TEXTURE0+z);let q=n.get(ee);if(ee.version!==q.__version||X===!0){t.activeTexture(i.TEXTURE0+z);let Ce=it.getPrimaries(it.workingColorSpace),ce=x.colorSpace===ri?null:it.getPrimaries(x.colorSpace),Te=x.colorSpace===ri||Ce===ce?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,x.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,x.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Te);let Ae=x.isCompressedTexture||x.image[0].isCompressedTexture,se=x.image[0]&&x.image[0].isDataTexture,ye=[];for(let j=0;j<6;j++)!Ae&&!se?ye[j]=_(x.image[j],!0,s.maxCubemapSize):ye[j]=se?x.image[j].image:x.image[j],ye[j]=He(x,ye[j]);let Oe=ye[0],Ie=r.convert(x.format,x.colorSpace),me=r.convert(x.type),Xe=v(x.internalFormat,Ie,me,x.colorSpace),U=x.isVideoTexture!==!0,oe=q.__version===void 0||X===!0,de=ee.dataReady,be=A(x,Oe);Ne(i.TEXTURE_CUBE_MAP,x);let re;if(Ae){U&&oe&&t.texStorage2D(i.TEXTURE_CUBE_MAP,be,Xe,Oe.width,Oe.height);for(let j=0;j<6;j++){re=ye[j].mipmaps;for(let Re=0;Re<re.length;Re++){let Ve=re[Re];x.format!==dn?Ie!==null?U?de&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,Re,0,0,Ve.width,Ve.height,Ie,Ve.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,Re,Xe,Ve.width,Ve.height,0,Ve.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):U?de&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,Re,0,0,Ve.width,Ve.height,Ie,me,Ve.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,Re,Xe,Ve.width,Ve.height,0,Ie,me,Ve.data)}}}else{if(re=x.mipmaps,U&&oe){re.length>0&&be++;let j=ze(ye[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,be,Xe,j.width,j.height)}for(let j=0;j<6;j++)if(se){U?de&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,0,0,ye[j].width,ye[j].height,Ie,me,ye[j].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,Xe,ye[j].width,ye[j].height,0,Ie,me,ye[j].data);for(let Re=0;Re<re.length;Re++){let ut=re[Re].image[j].image;U?de&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,Re+1,0,0,ut.width,ut.height,Ie,me,ut.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,Re+1,Xe,ut.width,ut.height,0,Ie,me,ut.data)}}else{U?de&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,0,0,Ie,me,ye[j]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,Xe,Ie,me,ye[j]);for(let Re=0;Re<re.length;Re++){let Ve=re[Re];U?de&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,Re+1,0,0,Ie,me,Ve.image[j]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,Re+1,Xe,Ie,me,Ve.image[j])}}}g(x)&&p(i.TEXTURE_CUBE_MAP),q.__version=ee.version,x.onUpdate&&x.onUpdate(x)}w.__version=x.version}function Se(w,x,z,X,ee,q){let Ce=r.convert(z.format,z.colorSpace),ce=r.convert(z.type),Te=v(z.internalFormat,Ce,ce,z.colorSpace),Ae=n.get(x),se=n.get(z);if(se.__renderTarget=x,!Ae.__hasExternalTextures){let ye=Math.max(1,x.width>>q),Oe=Math.max(1,x.height>>q);ee===i.TEXTURE_3D||ee===i.TEXTURE_2D_ARRAY?t.texImage3D(ee,q,Te,ye,Oe,x.depth,0,Ce,ce,null):t.texImage2D(ee,q,Te,ye,Oe,0,Ce,ce,null)}t.bindFramebuffer(i.FRAMEBUFFER,w),ie(x)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,X,ee,se.__webglTexture,0,he(x)):(ee===i.TEXTURE_2D||ee>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&ee<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,X,ee,se.__webglTexture,q),t.bindFramebuffer(i.FRAMEBUFFER,null)}function Le(w,x,z){if(i.bindRenderbuffer(i.RENDERBUFFER,w),x.depthBuffer){let X=x.depthTexture,ee=X&&X.isDepthTexture?X.type:null,q=y(x.stencilBuffer,ee),Ce=x.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ce=he(x);ie(x)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,ce,q,x.width,x.height):z?i.renderbufferStorageMultisample(i.RENDERBUFFER,ce,q,x.width,x.height):i.renderbufferStorage(i.RENDERBUFFER,q,x.width,x.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,Ce,i.RENDERBUFFER,w)}else{let X=x.textures;for(let ee=0;ee<X.length;ee++){let q=X[ee],Ce=r.convert(q.format,q.colorSpace),ce=r.convert(q.type),Te=v(q.internalFormat,Ce,ce,q.colorSpace),Ae=he(x);z&&ie(x)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,Ae,Te,x.width,x.height):ie(x)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Ae,Te,x.width,x.height):i.renderbufferStorage(i.RENDERBUFFER,Te,x.width,x.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function we(w,x){if(x&&x.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(i.FRAMEBUFFER,w),!(x.depthTexture&&x.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");let X=n.get(x.depthTexture);X.__renderTarget=x,(!X.__webglTexture||x.depthTexture.image.width!==x.width||x.depthTexture.image.height!==x.height)&&(x.depthTexture.image.width=x.width,x.depthTexture.image.height=x.height,x.depthTexture.needsUpdate=!0),L(x.depthTexture,0);let ee=X.__webglTexture,q=he(x);if(x.depthTexture.format===Is)ie(x)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,ee,0,q):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,ee,0);else if(x.depthTexture.format===qs)ie(x)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,ee,0,q):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,ee,0);else throw new Error("Unknown depthTexture format")}function je(w){let x=n.get(w),z=w.isWebGLCubeRenderTarget===!0;if(x.__boundDepthTexture!==w.depthTexture){let X=w.depthTexture;if(x.__depthDisposeCallback&&x.__depthDisposeCallback(),X){let ee=()=>{delete x.__boundDepthTexture,delete x.__depthDisposeCallback,X.removeEventListener("dispose",ee)};X.addEventListener("dispose",ee),x.__depthDisposeCallback=ee}x.__boundDepthTexture=X}if(w.depthTexture&&!x.__autoAllocateDepthBuffer){if(z)throw new Error("target.depthTexture not supported in Cube render targets");let X=w.texture.mipmaps;X&&X.length>0?we(x.__webglFramebuffer[0],w):we(x.__webglFramebuffer,w)}else if(z){x.__webglDepthbuffer=[];for(let X=0;X<6;X++)if(t.bindFramebuffer(i.FRAMEBUFFER,x.__webglFramebuffer[X]),x.__webglDepthbuffer[X]===void 0)x.__webglDepthbuffer[X]=i.createRenderbuffer(),Le(x.__webglDepthbuffer[X],w,!1);else{let ee=w.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,q=x.__webglDepthbuffer[X];i.bindRenderbuffer(i.RENDERBUFFER,q),i.framebufferRenderbuffer(i.FRAMEBUFFER,ee,i.RENDERBUFFER,q)}}else{let X=w.texture.mipmaps;if(X&&X.length>0?t.bindFramebuffer(i.FRAMEBUFFER,x.__webglFramebuffer[0]):t.bindFramebuffer(i.FRAMEBUFFER,x.__webglFramebuffer),x.__webglDepthbuffer===void 0)x.__webglDepthbuffer=i.createRenderbuffer(),Le(x.__webglDepthbuffer,w,!1);else{let ee=w.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,q=x.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,q),i.framebufferRenderbuffer(i.FRAMEBUFFER,ee,i.RENDERBUFFER,q)}}t.bindFramebuffer(i.FRAMEBUFFER,null)}function ht(w,x,z){let X=n.get(w);x!==void 0&&Se(X.__webglFramebuffer,w,w.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),z!==void 0&&je(w)}function C(w){let x=w.texture,z=n.get(w),X=n.get(x);w.addEventListener("dispose",R);let ee=w.textures,q=w.isWebGLCubeRenderTarget===!0,Ce=ee.length>1;if(Ce||(X.__webglTexture===void 0&&(X.__webglTexture=i.createTexture()),X.__version=x.version,a.memory.textures++),q){z.__webglFramebuffer=[];for(let ce=0;ce<6;ce++)if(x.mipmaps&&x.mipmaps.length>0){z.__webglFramebuffer[ce]=[];for(let Te=0;Te<x.mipmaps.length;Te++)z.__webglFramebuffer[ce][Te]=i.createFramebuffer()}else z.__webglFramebuffer[ce]=i.createFramebuffer()}else{if(x.mipmaps&&x.mipmaps.length>0){z.__webglFramebuffer=[];for(let ce=0;ce<x.mipmaps.length;ce++)z.__webglFramebuffer[ce]=i.createFramebuffer()}else z.__webglFramebuffer=i.createFramebuffer();if(Ce)for(let ce=0,Te=ee.length;ce<Te;ce++){let Ae=n.get(ee[ce]);Ae.__webglTexture===void 0&&(Ae.__webglTexture=i.createTexture(),a.memory.textures++)}if(w.samples>0&&ie(w)===!1){z.__webglMultisampledFramebuffer=i.createFramebuffer(),z.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,z.__webglMultisampledFramebuffer);for(let ce=0;ce<ee.length;ce++){let Te=ee[ce];z.__webglColorRenderbuffer[ce]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,z.__webglColorRenderbuffer[ce]);let Ae=r.convert(Te.format,Te.colorSpace),se=r.convert(Te.type),ye=v(Te.internalFormat,Ae,se,Te.colorSpace,w.isXRRenderTarget===!0),Oe=he(w);i.renderbufferStorageMultisample(i.RENDERBUFFER,Oe,ye,w.width,w.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ce,i.RENDERBUFFER,z.__webglColorRenderbuffer[ce])}i.bindRenderbuffer(i.RENDERBUFFER,null),w.depthBuffer&&(z.__webglDepthRenderbuffer=i.createRenderbuffer(),Le(z.__webglDepthRenderbuffer,w,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(q){t.bindTexture(i.TEXTURE_CUBE_MAP,X.__webglTexture),Ne(i.TEXTURE_CUBE_MAP,x);for(let ce=0;ce<6;ce++)if(x.mipmaps&&x.mipmaps.length>0)for(let Te=0;Te<x.mipmaps.length;Te++)Se(z.__webglFramebuffer[ce][Te],w,x,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+ce,Te);else Se(z.__webglFramebuffer[ce],w,x,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+ce,0);g(x)&&p(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(Ce){for(let ce=0,Te=ee.length;ce<Te;ce++){let Ae=ee[ce],se=n.get(Ae),ye=i.TEXTURE_2D;(w.isWebGL3DRenderTarget||w.isWebGLArrayRenderTarget)&&(ye=w.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(ye,se.__webglTexture),Ne(ye,Ae),Se(z.__webglFramebuffer,w,Ae,i.COLOR_ATTACHMENT0+ce,ye,0),g(Ae)&&p(ye)}t.unbindTexture()}else{let ce=i.TEXTURE_2D;if((w.isWebGL3DRenderTarget||w.isWebGLArrayRenderTarget)&&(ce=w.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(ce,X.__webglTexture),Ne(ce,x),x.mipmaps&&x.mipmaps.length>0)for(let Te=0;Te<x.mipmaps.length;Te++)Se(z.__webglFramebuffer[Te],w,x,i.COLOR_ATTACHMENT0,ce,Te);else Se(z.__webglFramebuffer,w,x,i.COLOR_ATTACHMENT0,ce,0);g(x)&&p(ce),t.unbindTexture()}w.depthBuffer&&je(w)}function te(w){let x=w.textures;for(let z=0,X=x.length;z<X;z++){let ee=x[z];if(g(ee)){let q=E(w),Ce=n.get(ee).__webglTexture;t.bindTexture(q,Ce),p(q),t.unbindTexture()}}}let K=[],J=[];function Z(w){if(w.samples>0){if(ie(w)===!1){let x=w.textures,z=w.width,X=w.height,ee=i.COLOR_BUFFER_BIT,q=w.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Ce=n.get(w),ce=x.length>1;if(ce)for(let Ae=0;Ae<x.length;Ae++)t.bindFramebuffer(i.FRAMEBUFFER,Ce.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Ae,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,Ce.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Ae,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,Ce.__webglMultisampledFramebuffer);let Te=w.texture.mipmaps;Te&&Te.length>0?t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Ce.__webglFramebuffer[0]):t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Ce.__webglFramebuffer);for(let Ae=0;Ae<x.length;Ae++){if(w.resolveDepthBuffer&&(w.depthBuffer&&(ee|=i.DEPTH_BUFFER_BIT),w.stencilBuffer&&w.resolveStencilBuffer&&(ee|=i.STENCIL_BUFFER_BIT)),ce){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,Ce.__webglColorRenderbuffer[Ae]);let se=n.get(x[Ae]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,se,0)}i.blitFramebuffer(0,0,z,X,0,0,z,X,ee,i.NEAREST),l===!0&&(K.length=0,J.length=0,K.push(i.COLOR_ATTACHMENT0+Ae),w.depthBuffer&&w.resolveDepthBuffer===!1&&(K.push(q),J.push(q),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,J)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,K))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),ce)for(let Ae=0;Ae<x.length;Ae++){t.bindFramebuffer(i.FRAMEBUFFER,Ce.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Ae,i.RENDERBUFFER,Ce.__webglColorRenderbuffer[Ae]);let se=n.get(x[Ae]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,Ce.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Ae,i.TEXTURE_2D,se,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Ce.__webglMultisampledFramebuffer)}else if(w.depthBuffer&&w.resolveDepthBuffer===!1&&l){let x=w.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[x])}}}function he(w){return Math.min(s.maxSamples,w.samples)}function ie(w){let x=n.get(w);return w.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&x.__useRenderToTexture!==!1}function ue(w){let x=a.render.frame;u.get(w)!==x&&(u.set(w,x),w.update())}function He(w,x){let z=w.colorSpace,X=w.format,ee=w.type;return w.isCompressedTexture===!0||w.isVideoTexture===!0||z!==$i&&z!==ri&&(it.getTransfer(z)===at?(X!==dn||ee!==Ln)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",z)),x}function ze(w){return typeof HTMLImageElement<"u"&&w instanceof HTMLImageElement?(c.width=w.naturalWidth||w.width,c.height=w.naturalHeight||w.height):typeof VideoFrame<"u"&&w instanceof VideoFrame?(c.width=w.displayWidth,c.height=w.displayHeight):(c.width=w.width,c.height=w.height),c}this.allocateTextureUnit=V,this.resetTextureUnits=O,this.setTexture2D=L,this.setTexture2DArray=H,this.setTexture3D=N,this.setTextureCube=k,this.rebindTextures=ht,this.setupRenderTarget=C,this.updateRenderTargetMipmap=te,this.updateMultisampleRenderTarget=Z,this.setupDepthRenderbuffer=je,this.setupFrameBufferTexture=Se,this.useMultisampledRTT=ie}function ix(i,e){function t(n,s=ri){let r,a=it.getTransfer(s);if(n===Ln)return i.UNSIGNED_BYTE;if(n===Ho)return i.UNSIGNED_SHORT_4_4_4_4;if(n===Vo)return i.UNSIGNED_SHORT_5_5_5_1;if(n===Gc)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===Wc)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===Hc)return i.BYTE;if(n===Vc)return i.SHORT;if(n===Ws)return i.UNSIGNED_SHORT;if(n===ko)return i.INT;if(n===wi)return i.UNSIGNED_INT;if(n===xn)return i.FLOAT;if(n===Xs)return i.HALF_FLOAT;if(n===Xc)return i.ALPHA;if(n===$c)return i.RGB;if(n===dn)return i.RGBA;if(n===Is)return i.DEPTH_COMPONENT;if(n===qs)return i.DEPTH_STENCIL;if(n===Go)return i.RED;if(n===Wo)return i.RED_INTEGER;if(n===qc)return i.RG;if(n===Xo)return i.RG_INTEGER;if(n===$o)return i.RGBA_INTEGER;if(n===ha||n===ua||n===da||n===fa)if(a===at)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===ha)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===ua)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===da)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===fa)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===ha)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===ua)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===da)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===fa)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===qo||n===Yo||n===Zo||n===Jo)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===qo)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Yo)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Zo)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Jo)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Ko||n===jo||n===Qo)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(n===Ko||n===jo)return a===at?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===Qo)return a===at?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===el||n===tl||n===nl||n===il||n===sl||n===rl||n===al||n===ol||n===ll||n===cl||n===hl||n===ul||n===dl||n===fl)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(n===el)return a===at?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===tl)return a===at?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===nl)return a===at?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===il)return a===at?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===sl)return a===at?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===rl)return a===at?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===al)return a===at?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===ol)return a===at?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===ll)return a===at?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===cl)return a===at?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===hl)return a===at?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===ul)return a===at?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===dl)return a===at?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===fl)return a===at?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===pl||n===ml||n===gl)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(n===pl)return a===at?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===ml)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===gl)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===_l||n===yl||n===xl||n===vl)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(n===_l)return r.COMPRESSED_RED_RGTC1_EXT;if(n===yl)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===xl)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===vl)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===$s?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:t}}var sx=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,rx=`
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

}`,gh=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let n=new Vr(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,n=new cn({vertexShader:sx,fragmentShader:rx,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new ct(new ea(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},_h=class extends Fn{constructor(e,t){super();let n=this,s=null,r=1,a=null,o="local-floor",l=1,c=null,u=null,h=null,f=null,d=null,m=null,_=typeof XRWebGLBinding<"u",g=new gh,p={},E=t.getContextAttributes(),v=null,y=null,A=[],T=[],R=new fe,I=null,S=new Vt;S.viewport=new ft;let M=new Vt;M.viewport=new ft;let P=[S,M],O=new wo,V=null,$=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Y){let ne=A[Y];return ne===void 0&&(ne=new Ns,A[Y]=ne),ne.getTargetRaySpace()},this.getControllerGrip=function(Y){let ne=A[Y];return ne===void 0&&(ne=new Ns,A[Y]=ne),ne.getGripSpace()},this.getHand=function(Y){let ne=A[Y];return ne===void 0&&(ne=new Ns,A[Y]=ne),ne.getHandSpace()};function L(Y){let ne=T.indexOf(Y.inputSource);if(ne===-1)return;let Se=A[ne];Se!==void 0&&(Se.update(Y.inputSource,Y.frame,c||a),Se.dispatchEvent({type:Y.type,data:Y.inputSource}))}function H(){s.removeEventListener("select",L),s.removeEventListener("selectstart",L),s.removeEventListener("selectend",L),s.removeEventListener("squeeze",L),s.removeEventListener("squeezestart",L),s.removeEventListener("squeezeend",L),s.removeEventListener("end",H),s.removeEventListener("inputsourceschange",N);for(let Y=0;Y<A.length;Y++){let ne=T[Y];ne!==null&&(T[Y]=null,A[Y].disconnect(ne))}V=null,$=null,g.reset();for(let Y in p)delete p[Y];e.setRenderTarget(v),d=null,f=null,h=null,s=null,y=null,Ke.stop(),n.isPresenting=!1,e.setPixelRatio(I),e.setSize(R.width,R.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Y){r=Y,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Y){o=Y,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(Y){c=Y},this.getBaseLayer=function(){return f!==null?f:d},this.getBinding=function(){return h===null&&_&&(h=new XRWebGLBinding(s,t)),h},this.getFrame=function(){return m},this.getSession=function(){return s},this.setSession=async function(Y){if(s=Y,s!==null){if(v=e.getRenderTarget(),s.addEventListener("select",L),s.addEventListener("selectstart",L),s.addEventListener("selectend",L),s.addEventListener("squeeze",L),s.addEventListener("squeezestart",L),s.addEventListener("squeezeend",L),s.addEventListener("end",H),s.addEventListener("inputsourceschange",N),E.xrCompatible!==!0&&await t.makeXRCompatible(),I=e.getPixelRatio(),e.getSize(R),_&&"createProjectionLayer"in XRWebGLBinding.prototype){let Se=null,Le=null,we=null;E.depth&&(we=E.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,Se=E.stencil?qs:Is,Le=E.stencil?$s:wi);let je={colorFormat:t.RGBA8,depthFormat:we,scaleFactor:r};h=this.getBinding(),f=h.createProjectionLayer(je),s.updateRenderState({layers:[f]}),e.setPixelRatio(1),e.setSize(f.textureWidth,f.textureHeight,!1),y=new On(f.textureWidth,f.textureHeight,{format:dn,type:Ln,depthTexture:new Hr(f.textureWidth,f.textureHeight,Le,void 0,void 0,void 0,void 0,void 0,void 0,Se),stencilBuffer:E.stencil,colorSpace:e.outputColorSpace,samples:E.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}else{let Se={antialias:E.antialias,alpha:!0,depth:E.depth,stencil:E.stencil,framebufferScaleFactor:r};d=new XRWebGLLayer(s,t,Se),s.updateRenderState({baseLayer:d}),e.setPixelRatio(1),e.setSize(d.framebufferWidth,d.framebufferHeight,!1),y=new On(d.framebufferWidth,d.framebufferHeight,{format:dn,type:Ln,colorSpace:e.outputColorSpace,stencilBuffer:E.stencil,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1})}y.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await s.requestReferenceSpace(o),Ke.setContext(s),Ke.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return g.getDepthTexture()};function N(Y){for(let ne=0;ne<Y.removed.length;ne++){let Se=Y.removed[ne],Le=T.indexOf(Se);Le>=0&&(T[Le]=null,A[Le].disconnect(Se))}for(let ne=0;ne<Y.added.length;ne++){let Se=Y.added[ne],Le=T.indexOf(Se);if(Le===-1){for(let je=0;je<A.length;je++)if(je>=T.length){T.push(Se),Le=je;break}else if(T[je]===null){T[je]=Se,Le=je;break}if(Le===-1)break}let we=A[Le];we&&we.connect(Se)}}let k=new D,Q=new D;function le(Y,ne,Se){k.setFromMatrixPosition(ne.matrixWorld),Q.setFromMatrixPosition(Se.matrixWorld);let Le=k.distanceTo(Q),we=ne.projectionMatrix.elements,je=Se.projectionMatrix.elements,ht=we[14]/(we[10]-1),C=we[14]/(we[10]+1),te=(we[9]+1)/we[5],K=(we[9]-1)/we[5],J=(we[8]-1)/we[0],Z=(je[8]+1)/je[0],he=ht*J,ie=ht*Z,ue=Le/(-J+Z),He=ue*-J;if(ne.matrixWorld.decompose(Y.position,Y.quaternion,Y.scale),Y.translateX(He),Y.translateZ(ue),Y.matrixWorld.compose(Y.position,Y.quaternion,Y.scale),Y.matrixWorldInverse.copy(Y.matrixWorld).invert(),we[10]===-1)Y.projectionMatrix.copy(ne.projectionMatrix),Y.projectionMatrixInverse.copy(ne.projectionMatrixInverse);else{let ze=ht+ue,w=C+ue,x=he-He,z=ie+(Le-He),X=te*C/w*ze,ee=K*C/w*ze;Y.projectionMatrix.makePerspective(x,z,X,ee,ze,w),Y.projectionMatrixInverse.copy(Y.projectionMatrix).invert()}}function ge(Y,ne){ne===null?Y.matrixWorld.copy(Y.matrix):Y.matrixWorld.multiplyMatrices(ne.matrixWorld,Y.matrix),Y.matrixWorldInverse.copy(Y.matrixWorld).invert()}this.updateCamera=function(Y){if(s===null)return;let ne=Y.near,Se=Y.far;g.texture!==null&&(g.depthNear>0&&(ne=g.depthNear),g.depthFar>0&&(Se=g.depthFar)),O.near=M.near=S.near=ne,O.far=M.far=S.far=Se,(V!==O.near||$!==O.far)&&(s.updateRenderState({depthNear:O.near,depthFar:O.far}),V=O.near,$=O.far),O.layers.mask=Y.layers.mask|6,S.layers.mask=O.layers.mask&3,M.layers.mask=O.layers.mask&5;let Le=Y.parent,we=O.cameras;ge(O,Le);for(let je=0;je<we.length;je++)ge(we[je],Le);we.length===2?le(O,S,M):O.projectionMatrix.copy(S.projectionMatrix),Ne(Y,O,Le)};function Ne(Y,ne,Se){Se===null?Y.matrix.copy(ne.matrixWorld):(Y.matrix.copy(Se.matrixWorld),Y.matrix.invert(),Y.matrix.multiply(ne.matrixWorld)),Y.matrix.decompose(Y.position,Y.quaternion,Y.scale),Y.updateMatrixWorld(!0),Y.projectionMatrix.copy(ne.projectionMatrix),Y.projectionMatrixInverse.copy(ne.projectionMatrixInverse),Y.isPerspectiveCamera&&(Y.fov=Ps*2*Math.atan(1/Y.projectionMatrix.elements[5]),Y.zoom=1)}this.getCamera=function(){return O},this.getFoveation=function(){if(!(f===null&&d===null))return l},this.setFoveation=function(Y){l=Y,f!==null&&(f.fixedFoveation=Y),d!==null&&d.fixedFoveation!==void 0&&(d.fixedFoveation=Y)},this.hasDepthSensing=function(){return g.texture!==null},this.getDepthSensingMesh=function(){return g.getMesh(O)},this.getCameraTexture=function(Y){return p[Y]};let We=null;function et(Y,ne){if(u=ne.getViewerPose(c||a),m=ne,u!==null){let Se=u.views;d!==null&&(e.setRenderTargetFramebuffer(y,d.framebuffer),e.setRenderTarget(y));let Le=!1;Se.length!==O.cameras.length&&(O.cameras.length=0,Le=!0);for(let C=0;C<Se.length;C++){let te=Se[C],K=null;if(d!==null)K=d.getViewport(te);else{let Z=h.getViewSubImage(f,te);K=Z.viewport,C===0&&(e.setRenderTargetTextures(y,Z.colorTexture,Z.depthStencilTexture),e.setRenderTarget(y))}let J=P[C];J===void 0&&(J=new Vt,J.layers.enable(C),J.viewport=new ft,P[C]=J),J.matrix.fromArray(te.transform.matrix),J.matrix.decompose(J.position,J.quaternion,J.scale),J.projectionMatrix.fromArray(te.projectionMatrix),J.projectionMatrixInverse.copy(J.projectionMatrix).invert(),J.viewport.set(K.x,K.y,K.width,K.height),C===0&&(O.matrix.copy(J.matrix),O.matrix.decompose(O.position,O.quaternion,O.scale)),Le===!0&&O.cameras.push(J)}let we=s.enabledFeatures;if(we&&we.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&_){h=n.getBinding();let C=h.getDepthInformation(Se[0]);C&&C.isValid&&C.texture&&g.init(C,s.renderState)}if(we&&we.includes("camera-access")&&_){e.state.unbindTexture(),h=n.getBinding();for(let C=0;C<Se.length;C++){let te=Se[C].camera;if(te){let K=p[te];K||(K=new Vr,p[te]=K);let J=h.getCameraImage(te);K.sourceTexture=J}}}}for(let Se=0;Se<A.length;Se++){let Le=T[Se],we=A[Se];Le!==null&&we!==void 0&&we.update(Le,ne,c||a)}We&&We(Y,ne),ne.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:ne}),m=null}let Ke=new af;Ke.setAnimationLoop(et),this.setAnimationLoop=function(Y){We=Y},this.dispose=function(){}}},ss=new on,ax=new Ye;function ox(i,e){function t(g,p){g.matrixAutoUpdate===!0&&g.updateMatrix(),p.value.copy(g.matrix)}function n(g,p){p.color.getRGB(g.fogColor.value,Qc(i)),p.isFog?(g.fogNear.value=p.near,g.fogFar.value=p.far):p.isFogExp2&&(g.fogDensity.value=p.density)}function s(g,p,E,v,y){p.isMeshBasicMaterial||p.isMeshLambertMaterial?r(g,p):p.isMeshToonMaterial?(r(g,p),h(g,p)):p.isMeshPhongMaterial?(r(g,p),u(g,p)):p.isMeshStandardMaterial?(r(g,p),f(g,p),p.isMeshPhysicalMaterial&&d(g,p,y)):p.isMeshMatcapMaterial?(r(g,p),m(g,p)):p.isMeshDepthMaterial?r(g,p):p.isMeshDistanceMaterial?(r(g,p),_(g,p)):p.isMeshNormalMaterial?r(g,p):p.isLineBasicMaterial?(a(g,p),p.isLineDashedMaterial&&o(g,p)):p.isPointsMaterial?l(g,p,E,v):p.isSpriteMaterial?c(g,p):p.isShadowMaterial?(g.color.value.copy(p.color),g.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(g,p){g.opacity.value=p.opacity,p.color&&g.diffuse.value.copy(p.color),p.emissive&&g.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(g.map.value=p.map,t(p.map,g.mapTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,t(p.alphaMap,g.alphaMapTransform)),p.bumpMap&&(g.bumpMap.value=p.bumpMap,t(p.bumpMap,g.bumpMapTransform),g.bumpScale.value=p.bumpScale,p.side===Bt&&(g.bumpScale.value*=-1)),p.normalMap&&(g.normalMap.value=p.normalMap,t(p.normalMap,g.normalMapTransform),g.normalScale.value.copy(p.normalScale),p.side===Bt&&g.normalScale.value.negate()),p.displacementMap&&(g.displacementMap.value=p.displacementMap,t(p.displacementMap,g.displacementMapTransform),g.displacementScale.value=p.displacementScale,g.displacementBias.value=p.displacementBias),p.emissiveMap&&(g.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,g.emissiveMapTransform)),p.specularMap&&(g.specularMap.value=p.specularMap,t(p.specularMap,g.specularMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest);let E=e.get(p),v=E.envMap,y=E.envMapRotation;v&&(g.envMap.value=v,ss.copy(y),ss.x*=-1,ss.y*=-1,ss.z*=-1,v.isCubeTexture&&v.isRenderTargetTexture===!1&&(ss.y*=-1,ss.z*=-1),g.envMapRotation.value.setFromMatrix4(ax.makeRotationFromEuler(ss)),g.flipEnvMap.value=v.isCubeTexture&&v.isRenderTargetTexture===!1?-1:1,g.reflectivity.value=p.reflectivity,g.ior.value=p.ior,g.refractionRatio.value=p.refractionRatio),p.lightMap&&(g.lightMap.value=p.lightMap,g.lightMapIntensity.value=p.lightMapIntensity,t(p.lightMap,g.lightMapTransform)),p.aoMap&&(g.aoMap.value=p.aoMap,g.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,g.aoMapTransform))}function a(g,p){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,p.map&&(g.map.value=p.map,t(p.map,g.mapTransform))}function o(g,p){g.dashSize.value=p.dashSize,g.totalSize.value=p.dashSize+p.gapSize,g.scale.value=p.scale}function l(g,p,E,v){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,g.size.value=p.size*E,g.scale.value=v*.5,p.map&&(g.map.value=p.map,t(p.map,g.uvTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,t(p.alphaMap,g.alphaMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest)}function c(g,p){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,g.rotation.value=p.rotation,p.map&&(g.map.value=p.map,t(p.map,g.mapTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,t(p.alphaMap,g.alphaMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest)}function u(g,p){g.specular.value.copy(p.specular),g.shininess.value=Math.max(p.shininess,1e-4)}function h(g,p){p.gradientMap&&(g.gradientMap.value=p.gradientMap)}function f(g,p){g.metalness.value=p.metalness,p.metalnessMap&&(g.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,g.metalnessMapTransform)),g.roughness.value=p.roughness,p.roughnessMap&&(g.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,g.roughnessMapTransform)),p.envMap&&(g.envMapIntensity.value=p.envMapIntensity)}function d(g,p,E){g.ior.value=p.ior,p.sheen>0&&(g.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),g.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(g.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,g.sheenColorMapTransform)),p.sheenRoughnessMap&&(g.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,g.sheenRoughnessMapTransform))),p.clearcoat>0&&(g.clearcoat.value=p.clearcoat,g.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(g.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,g.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(g.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===Bt&&g.clearcoatNormalScale.value.negate())),p.dispersion>0&&(g.dispersion.value=p.dispersion),p.iridescence>0&&(g.iridescence.value=p.iridescence,g.iridescenceIOR.value=p.iridescenceIOR,g.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(g.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,g.iridescenceMapTransform)),p.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),p.transmission>0&&(g.transmission.value=p.transmission,g.transmissionSamplerMap.value=E.texture,g.transmissionSamplerSize.value.set(E.width,E.height),p.transmissionMap&&(g.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,g.transmissionMapTransform)),g.thickness.value=p.thickness,p.thicknessMap&&(g.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=p.attenuationDistance,g.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(g.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(g.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=p.specularIntensity,g.specularColor.value.copy(p.specularColor),p.specularColorMap&&(g.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,g.specularColorMapTransform)),p.specularIntensityMap&&(g.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,g.specularIntensityMapTransform))}function m(g,p){p.matcap&&(g.matcap.value=p.matcap)}function _(g,p){let E=e.get(p).light;g.referencePosition.value.setFromMatrixPosition(E.matrixWorld),g.nearDistance.value=E.shadow.camera.near,g.farDistance.value=E.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function lx(i,e,t,n){let s={},r={},a=[],o=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function l(E,v){let y=v.program;n.uniformBlockBinding(E,y)}function c(E,v){let y=s[E.id];y===void 0&&(m(E),y=u(E),s[E.id]=y,E.addEventListener("dispose",g));let A=v.program;n.updateUBOMapping(E,A);let T=e.render.frame;r[E.id]!==T&&(f(E),r[E.id]=T)}function u(E){let v=h();E.__bindingPointIndex=v;let y=i.createBuffer(),A=E.__size,T=E.usage;return i.bindBuffer(i.UNIFORM_BUFFER,y),i.bufferData(i.UNIFORM_BUFFER,A,T),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,v,y),y}function h(){for(let E=0;E<o;E++)if(a.indexOf(E)===-1)return a.push(E),E;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(E){let v=s[E.id],y=E.uniforms,A=E.__cache;i.bindBuffer(i.UNIFORM_BUFFER,v);for(let T=0,R=y.length;T<R;T++){let I=Array.isArray(y[T])?y[T]:[y[T]];for(let S=0,M=I.length;S<M;S++){let P=I[S];if(d(P,T,S,A)===!0){let O=P.__offset,V=Array.isArray(P.value)?P.value:[P.value],$=0;for(let L=0;L<V.length;L++){let H=V[L],N=_(H);typeof H=="number"||typeof H=="boolean"?(P.__data[0]=H,i.bufferSubData(i.UNIFORM_BUFFER,O+$,P.__data)):H.isMatrix3?(P.__data[0]=H.elements[0],P.__data[1]=H.elements[1],P.__data[2]=H.elements[2],P.__data[3]=0,P.__data[4]=H.elements[3],P.__data[5]=H.elements[4],P.__data[6]=H.elements[5],P.__data[7]=0,P.__data[8]=H.elements[6],P.__data[9]=H.elements[7],P.__data[10]=H.elements[8],P.__data[11]=0):(H.toArray(P.__data,$),$+=N.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,O,P.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function d(E,v,y,A){let T=E.value,R=v+"_"+y;if(A[R]===void 0)return typeof T=="number"||typeof T=="boolean"?A[R]=T:A[R]=T.clone(),!0;{let I=A[R];if(typeof T=="number"||typeof T=="boolean"){if(I!==T)return A[R]=T,!0}else if(I.equals(T)===!1)return I.copy(T),!0}return!1}function m(E){let v=E.uniforms,y=0,A=16;for(let R=0,I=v.length;R<I;R++){let S=Array.isArray(v[R])?v[R]:[v[R]];for(let M=0,P=S.length;M<P;M++){let O=S[M],V=Array.isArray(O.value)?O.value:[O.value];for(let $=0,L=V.length;$<L;$++){let H=V[$],N=_(H),k=y%A,Q=k%N.boundary,le=k+Q;y+=Q,le!==0&&A-le<N.storage&&(y+=A-le),O.__data=new Float32Array(N.storage/Float32Array.BYTES_PER_ELEMENT),O.__offset=y,y+=N.storage}}}let T=y%A;return T>0&&(y+=A-T),E.__size=y,E.__cache={},this}function _(E){let v={boundary:0,storage:0};return typeof E=="number"||typeof E=="boolean"?(v.boundary=4,v.storage=4):E.isVector2?(v.boundary=8,v.storage=8):E.isVector3||E.isColor?(v.boundary=16,v.storage=12):E.isVector4?(v.boundary=16,v.storage=16):E.isMatrix3?(v.boundary=48,v.storage=48):E.isMatrix4?(v.boundary=64,v.storage=64):E.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",E),v}function g(E){let v=E.target;v.removeEventListener("dispose",g);let y=a.indexOf(v.__bindingPointIndex);a.splice(y,1),i.deleteBuffer(s[v.id]),delete s[v.id],delete r[v.id]}function p(){for(let E in s)i.deleteBuffer(s[E]);a=[],s={},r={}}return{bind:l,update:c,dispose:p}}var Al=class{constructor(e={}){let{canvas:t=Td(),context:n=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:h=!1,reversedDepthBuffer:f=!1}=e;this.isWebGLRenderer=!0;let d;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");d=n.getContextAttributes().alpha}else d=a;let m=new Uint32Array(4),_=new Int32Array(4),g=null,p=null,E=[],v=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=si,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let y=this,A=!1;this._outputColorSpace=$t;let T=0,R=0,I=null,S=-1,M=null,P=new ft,O=new ft,V=null,$=new ke(0),L=0,H=t.width,N=t.height,k=1,Q=null,le=null,ge=new ft(0,0,H,N),Ne=new ft(0,0,H,N),We=!1,et=new Fs,Ke=!1,Y=!1,ne=new Ye,Se=new D,Le=new ft,we={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},je=!1;function ht(){return I===null?k:1}let C=n;function te(b,F){return t.getContext(b,F)}try{let b={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:h};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${"180"}`),t.addEventListener("webglcontextlost",de,!1),t.addEventListener("webglcontextrestored",be,!1),t.addEventListener("webglcontextcreationerror",re,!1),C===null){let F="webgl2";if(C=te(F,b),C===null)throw te(F)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(b){throw console.error("THREE.WebGLRenderer: "+b.message),b}let K,J,Z,he,ie,ue,He,ze,w,x,z,X,ee,q,Ce,ce,Te,Ae,se,ye,Oe,Ie,me,Xe;function U(){K=new T_(C),K.init(),Ie=new ix(C,K),J=new x_(C,K,e,Ie),Z=new tx(C,K),J.reversedDepthBuffer&&f&&Z.buffers.depth.setReversed(!0),he=new C_(C),ie=new Vy,ue=new nx(C,K,Z,ie,J,Ie,he),He=new M_(y),ze=new w_(y),w=new Nm(C),me=new __(C,w),x=new A_(C,w,he,me),z=new P_(C,x,w,he),se=new I_(C,J,ue),ce=new v_(ie),X=new Hy(y,He,ze,K,J,me,ce),ee=new ox(y,ie),q=new Wy,Ce=new Jy(K),Ae=new g_(y,He,ze,Z,z,d,l),Te=new Qy(y,z,J),Xe=new lx(C,he,J,Z),ye=new y_(C,K,he),Oe=new R_(C,K,he),he.programs=X.programs,y.capabilities=J,y.extensions=K,y.properties=ie,y.renderLists=q,y.shadowMap=Te,y.state=Z,y.info=he}U();let oe=new _h(y,C);this.xr=oe,this.getContext=function(){return C},this.getContextAttributes=function(){return C.getContextAttributes()},this.forceContextLoss=function(){let b=K.get("WEBGL_lose_context");b&&b.loseContext()},this.forceContextRestore=function(){let b=K.get("WEBGL_lose_context");b&&b.restoreContext()},this.getPixelRatio=function(){return k},this.setPixelRatio=function(b){b!==void 0&&(k=b,this.setSize(H,N,!1))},this.getSize=function(b){return b.set(H,N)},this.setSize=function(b,F,G=!0){if(oe.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}H=b,N=F,t.width=Math.floor(b*k),t.height=Math.floor(F*k),G===!0&&(t.style.width=b+"px",t.style.height=F+"px"),this.setViewport(0,0,b,F)},this.getDrawingBufferSize=function(b){return b.set(H*k,N*k).floor()},this.setDrawingBufferSize=function(b,F,G){H=b,N=F,k=G,t.width=Math.floor(b*G),t.height=Math.floor(F*G),this.setViewport(0,0,b,F)},this.getCurrentViewport=function(b){return b.copy(P)},this.getViewport=function(b){return b.copy(ge)},this.setViewport=function(b,F,G,W){b.isVector4?ge.set(b.x,b.y,b.z,b.w):ge.set(b,F,G,W),Z.viewport(P.copy(ge).multiplyScalar(k).round())},this.getScissor=function(b){return b.copy(Ne)},this.setScissor=function(b,F,G,W){b.isVector4?Ne.set(b.x,b.y,b.z,b.w):Ne.set(b,F,G,W),Z.scissor(O.copy(Ne).multiplyScalar(k).round())},this.getScissorTest=function(){return We},this.setScissorTest=function(b){Z.setScissorTest(We=b)},this.setOpaqueSort=function(b){Q=b},this.setTransparentSort=function(b){le=b},this.getClearColor=function(b){return b.copy(Ae.getClearColor())},this.setClearColor=function(){Ae.setClearColor(...arguments)},this.getClearAlpha=function(){return Ae.getClearAlpha()},this.setClearAlpha=function(){Ae.setClearAlpha(...arguments)},this.clear=function(b=!0,F=!0,G=!0){let W=0;if(b){let B=!1;if(I!==null){let ae=I.texture.format;B=ae===$o||ae===Xo||ae===Wo}if(B){let ae=I.texture.type,_e=ae===Ln||ae===wi||ae===Ws||ae===$s||ae===Ho||ae===Vo,Ee=Ae.getClearColor(),Me=Ae.getClearAlpha(),Fe=Ee.r,Be=Ee.g,De=Ee.b;_e?(m[0]=Fe,m[1]=Be,m[2]=De,m[3]=Me,C.clearBufferuiv(C.COLOR,0,m)):(_[0]=Fe,_[1]=Be,_[2]=De,_[3]=Me,C.clearBufferiv(C.COLOR,0,_))}else W|=C.COLOR_BUFFER_BIT}F&&(W|=C.DEPTH_BUFFER_BIT),G&&(W|=C.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),C.clear(W)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",de,!1),t.removeEventListener("webglcontextrestored",be,!1),t.removeEventListener("webglcontextcreationerror",re,!1),Ae.dispose(),q.dispose(),Ce.dispose(),ie.dispose(),He.dispose(),ze.dispose(),z.dispose(),me.dispose(),Xe.dispose(),X.dispose(),oe.dispose(),oe.removeEventListener("sessionstart",Un),oe.removeEventListener("sessionend",Ph),Ri.stop()};function de(b){b.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),A=!0}function be(){console.log("THREE.WebGLRenderer: Context Restored."),A=!1;let b=he.autoReset,F=Te.enabled,G=Te.autoUpdate,W=Te.needsUpdate,B=Te.type;U(),he.autoReset=b,Te.enabled=F,Te.autoUpdate=G,Te.needsUpdate=W,Te.type=B}function re(b){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",b.statusMessage)}function j(b){let F=b.target;F.removeEventListener("dispose",j),Re(F)}function Re(b){Ve(b),ie.remove(b)}function Ve(b){let F=ie.get(b).programs;F!==void 0&&(F.forEach(function(G){X.releaseProgram(G)}),b.isShaderMaterial&&X.releaseShaderCache(b))}this.renderBufferDirect=function(b,F,G,W,B,ae){F===null&&(F=we);let _e=B.isMesh&&B.matrixWorld.determinant()<0,Ee=Nf(b,F,G,W,B);Z.setMaterial(W,_e);let Me=G.index,Fe=1;if(W.wireframe===!0){if(Me=x.getWireframeAttribute(G),Me===void 0)return;Fe=2}let Be=G.drawRange,De=G.attributes.position,Qe=Be.start*Fe,ot=(Be.start+Be.count)*Fe;ae!==null&&(Qe=Math.max(Qe,ae.start*Fe),ot=Math.min(ot,(ae.start+ae.count)*Fe)),Me!==null?(Qe=Math.max(Qe,0),ot=Math.min(ot,Me.count)):De!=null&&(Qe=Math.max(Qe,0),ot=Math.min(ot,De.count));let St=ot-Qe;if(St<0||St===1/0)return;me.setup(B,W,Ee,G,Me);let mt,lt=ye;if(Me!==null&&(mt=w.get(Me),lt=Oe,lt.setIndex(mt)),B.isMesh)W.wireframe===!0?(Z.setLineWidth(W.wireframeLinewidth*ht()),lt.setMode(C.LINES)):lt.setMode(C.TRIANGLES);else if(B.isLine){let Ue=W.linewidth;Ue===void 0&&(Ue=1),Z.setLineWidth(Ue*ht()),B.isLineSegments?lt.setMode(C.LINES):B.isLineLoop?lt.setMode(C.LINE_LOOP):lt.setMode(C.LINE_STRIP)}else B.isPoints?lt.setMode(C.POINTS):B.isSprite&&lt.setMode(C.TRIANGLES);if(B.isBatchedMesh)if(B._multiDrawInstances!==null)Ls("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),lt.renderMultiDrawInstances(B._multiDrawStarts,B._multiDrawCounts,B._multiDrawCount,B._multiDrawInstances);else if(K.get("WEBGL_multi_draw"))lt.renderMultiDraw(B._multiDrawStarts,B._multiDrawCounts,B._multiDrawCount);else{let Ue=B._multiDrawStarts,xt=B._multiDrawCounts,st=B._multiDrawCount,tn=Me?w.get(Me).bytesPerElement:1,us=ie.get(W).currentProgram.getUniforms();for(let nn=0;nn<st;nn++)us.setValue(C,"_gl_DrawID",nn),lt.render(Ue[nn]/tn,xt[nn])}else if(B.isInstancedMesh)lt.renderInstances(Qe,St,B.count);else if(G.isInstancedBufferGeometry){let Ue=G._maxInstanceCount!==void 0?G._maxInstanceCount:1/0,xt=Math.min(G.instanceCount,Ue);lt.renderInstances(Qe,St,xt)}else lt.render(Qe,St)};function ut(b,F,G){b.transparent===!0&&b.side===yn&&b.forceSinglePass===!1?(b.side=Bt,b.needsUpdate=!0,ya(b,F,G),b.side=Jn,b.needsUpdate=!0,ya(b,F,G),b.side=yn):ya(b,F,G)}this.compile=function(b,F,G=null){G===null&&(G=b),p=Ce.get(G),p.init(F),v.push(p),G.traverseVisible(function(B){B.isLight&&B.layers.test(F.layers)&&(p.pushLight(B),B.castShadow&&p.pushShadow(B))}),b!==G&&b.traverseVisible(function(B){B.isLight&&B.layers.test(F.layers)&&(p.pushLight(B),B.castShadow&&p.pushShadow(B))}),p.setupLights();let W=new Set;return b.traverse(function(B){if(!(B.isMesh||B.isPoints||B.isLine||B.isSprite))return;let ae=B.material;if(ae)if(Array.isArray(ae))for(let _e=0;_e<ae.length;_e++){let Ee=ae[_e];ut(Ee,G,B),W.add(Ee)}else ut(ae,G,B),W.add(ae)}),p=v.pop(),W},this.compileAsync=function(b,F,G=null){let W=this.compile(b,F,G);return new Promise(B=>{function ae(){if(W.forEach(function(_e){ie.get(_e).currentProgram.isReady()&&W.delete(_e)}),W.size===0){B(b);return}setTimeout(ae,10)}K.get("KHR_parallel_shader_compile")!==null?ae():setTimeout(ae,10)})};let rt=null;function Gn(b){rt&&rt(b)}function Un(){Ri.stop()}function Ph(){Ri.start()}let Ri=new af;Ri.setAnimationLoop(Gn),typeof self<"u"&&Ri.setContext(self),this.setAnimationLoop=function(b){rt=b,oe.setAnimationLoop(b),b===null?Ri.stop():Ri.start()},oe.addEventListener("sessionstart",Un),oe.addEventListener("sessionend",Ph),this.render=function(b,F){if(F!==void 0&&F.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(A===!0)return;if(b.matrixWorldAutoUpdate===!0&&b.updateMatrixWorld(),F.parent===null&&F.matrixWorldAutoUpdate===!0&&F.updateMatrixWorld(),oe.enabled===!0&&oe.isPresenting===!0&&(oe.cameraAutoUpdate===!0&&oe.updateCamera(F),F=oe.getCamera()),b.isScene===!0&&b.onBeforeRender(y,b,F,I),p=Ce.get(b,v.length),p.init(F),v.push(p),ne.multiplyMatrices(F.projectionMatrix,F.matrixWorldInverse),et.setFromProjectionMatrix(ne,wn,F.reversedDepth),Y=this.localClippingEnabled,Ke=ce.init(this.clippingPlanes,Y),g=q.get(b,E.length),g.init(),E.push(g),oe.enabled===!0&&oe.isPresenting===!0){let ae=y.xr.getDepthSensingMesh();ae!==null&&Vl(ae,F,-1/0,y.sortObjects)}Vl(b,F,0,y.sortObjects),g.finish(),y.sortObjects===!0&&g.sort(Q,le),je=oe.enabled===!1||oe.isPresenting===!1||oe.hasDepthSensing()===!1,je&&Ae.addToRenderList(g,b),this.info.render.frame++,Ke===!0&&ce.beginShadows();let G=p.state.shadowsArray;Te.render(G,b,F),Ke===!0&&ce.endShadows(),this.info.autoReset===!0&&this.info.reset();let W=g.opaque,B=g.transmissive;if(p.setupLights(),F.isArrayCamera){let ae=F.cameras;if(B.length>0)for(let _e=0,Ee=ae.length;_e<Ee;_e++){let Me=ae[_e];Dh(W,B,b,Me)}je&&Ae.render(b);for(let _e=0,Ee=ae.length;_e<Ee;_e++){let Me=ae[_e];Lh(g,b,Me,Me.viewport)}}else B.length>0&&Dh(W,B,b,F),je&&Ae.render(b),Lh(g,b,F);I!==null&&R===0&&(ue.updateMultisampleRenderTarget(I),ue.updateRenderTargetMipmap(I)),b.isScene===!0&&b.onAfterRender(y,b,F),me.resetDefaultState(),S=-1,M=null,v.pop(),v.length>0?(p=v[v.length-1],Ke===!0&&ce.setGlobalState(y.clippingPlanes,p.state.camera)):p=null,E.pop(),E.length>0?g=E[E.length-1]:g=null};function Vl(b,F,G,W){if(b.visible===!1)return;if(b.layers.test(F.layers)){if(b.isGroup)G=b.renderOrder;else if(b.isLOD)b.autoUpdate===!0&&b.update(F);else if(b.isLight)p.pushLight(b),b.castShadow&&p.pushShadow(b);else if(b.isSprite){if(!b.frustumCulled||et.intersectsSprite(b)){W&&Le.setFromMatrixPosition(b.matrixWorld).applyMatrix4(ne);let _e=z.update(b),Ee=b.material;Ee.visible&&g.push(b,_e,Ee,G,Le.z,null)}}else if((b.isMesh||b.isLine||b.isPoints)&&(!b.frustumCulled||et.intersectsObject(b))){let _e=z.update(b),Ee=b.material;if(W&&(b.boundingSphere!==void 0?(b.boundingSphere===null&&b.computeBoundingSphere(),Le.copy(b.boundingSphere.center)):(_e.boundingSphere===null&&_e.computeBoundingSphere(),Le.copy(_e.boundingSphere.center)),Le.applyMatrix4(b.matrixWorld).applyMatrix4(ne)),Array.isArray(Ee)){let Me=_e.groups;for(let Fe=0,Be=Me.length;Fe<Be;Fe++){let De=Me[Fe],Qe=Ee[De.materialIndex];Qe&&Qe.visible&&g.push(b,_e,Qe,G,Le.z,De)}}else Ee.visible&&g.push(b,_e,Ee,G,Le.z,null)}}let ae=b.children;for(let _e=0,Ee=ae.length;_e<Ee;_e++)Vl(ae[_e],F,G,W)}function Lh(b,F,G,W){let B=b.opaque,ae=b.transmissive,_e=b.transparent;p.setupLightsView(G),Ke===!0&&ce.setGlobalState(y.clippingPlanes,G),W&&Z.viewport(P.copy(W)),B.length>0&&_a(B,F,G),ae.length>0&&_a(ae,F,G),_e.length>0&&_a(_e,F,G),Z.buffers.depth.setTest(!0),Z.buffers.depth.setMask(!0),Z.buffers.color.setMask(!0),Z.setPolygonOffset(!1)}function Dh(b,F,G,W){if((G.isScene===!0?G.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[W.id]===void 0&&(p.state.transmissionRenderTarget[W.id]=new On(1,1,{generateMipmaps:!0,type:K.has("EXT_color_buffer_half_float")||K.has("EXT_color_buffer_float")?Xs:Ln,minFilter:Ei,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:it.workingColorSpace}));let ae=p.state.transmissionRenderTarget[W.id],_e=W.viewport||P;ae.setSize(_e.z*y.transmissionResolutionScale,_e.w*y.transmissionResolutionScale);let Ee=y.getRenderTarget(),Me=y.getActiveCubeFace(),Fe=y.getActiveMipmapLevel();y.setRenderTarget(ae),y.getClearColor($),L=y.getClearAlpha(),L<1&&y.setClearColor(16777215,.5),y.clear(),je&&Ae.render(G);let Be=y.toneMapping;y.toneMapping=si;let De=W.viewport;if(W.viewport!==void 0&&(W.viewport=void 0),p.setupLightsView(W),Ke===!0&&ce.setGlobalState(y.clippingPlanes,W),_a(b,G,W),ue.updateMultisampleRenderTarget(ae),ue.updateRenderTargetMipmap(ae),K.has("WEBGL_multisampled_render_to_texture")===!1){let Qe=!1;for(let ot=0,St=F.length;ot<St;ot++){let mt=F[ot],lt=mt.object,Ue=mt.geometry,xt=mt.material,st=mt.group;if(xt.side===yn&&lt.layers.test(W.layers)){let tn=xt.side;xt.side=Bt,xt.needsUpdate=!0,Uh(lt,G,W,Ue,xt,st),xt.side=tn,xt.needsUpdate=!0,Qe=!0}}Qe===!0&&(ue.updateMultisampleRenderTarget(ae),ue.updateRenderTargetMipmap(ae))}y.setRenderTarget(Ee,Me,Fe),y.setClearColor($,L),De!==void 0&&(W.viewport=De),y.toneMapping=Be}function _a(b,F,G){let W=F.isScene===!0?F.overrideMaterial:null;for(let B=0,ae=b.length;B<ae;B++){let _e=b[B],Ee=_e.object,Me=_e.geometry,Fe=_e.group,Be=_e.material;Be.allowOverride===!0&&W!==null&&(Be=W),Ee.layers.test(G.layers)&&Uh(Ee,F,G,Me,Be,Fe)}}function Uh(b,F,G,W,B,ae){b.onBeforeRender(y,F,G,W,B,ae),b.modelViewMatrix.multiplyMatrices(G.matrixWorldInverse,b.matrixWorld),b.normalMatrix.getNormalMatrix(b.modelViewMatrix),B.onBeforeRender(y,F,G,W,b,ae),B.transparent===!0&&B.side===yn&&B.forceSinglePass===!1?(B.side=Bt,B.needsUpdate=!0,y.renderBufferDirect(G,F,W,B,b,ae),B.side=Jn,B.needsUpdate=!0,y.renderBufferDirect(G,F,W,B,b,ae),B.side=yn):y.renderBufferDirect(G,F,W,B,b,ae),b.onAfterRender(y,F,G,W,B,ae)}function ya(b,F,G){F.isScene!==!0&&(F=we);let W=ie.get(b),B=p.state.lights,ae=p.state.shadowsArray,_e=B.state.version,Ee=X.getParameters(b,B.state,ae,F,G),Me=X.getProgramCacheKey(Ee),Fe=W.programs;W.environment=b.isMeshStandardMaterial?F.environment:null,W.fog=F.fog,W.envMap=(b.isMeshStandardMaterial?ze:He).get(b.envMap||W.environment),W.envMapRotation=W.environment!==null&&b.envMap===null?F.environmentRotation:b.envMapRotation,Fe===void 0&&(b.addEventListener("dispose",j),Fe=new Map,W.programs=Fe);let Be=Fe.get(Me);if(Be!==void 0){if(W.currentProgram===Be&&W.lightsStateVersion===_e)return Fh(b,Ee),Be}else Ee.uniforms=X.getUniforms(b),b.onBeforeCompile(Ee,y),Be=X.acquireProgram(Ee,Me),Fe.set(Me,Be),W.uniforms=Ee.uniforms;let De=W.uniforms;return(!b.isShaderMaterial&&!b.isRawShaderMaterial||b.clipping===!0)&&(De.clippingPlanes=ce.uniform),Fh(b,Ee),W.needsLights=Of(b),W.lightsStateVersion=_e,W.needsLights&&(De.ambientLightColor.value=B.state.ambient,De.lightProbe.value=B.state.probe,De.directionalLights.value=B.state.directional,De.directionalLightShadows.value=B.state.directionalShadow,De.spotLights.value=B.state.spot,De.spotLightShadows.value=B.state.spotShadow,De.rectAreaLights.value=B.state.rectArea,De.ltc_1.value=B.state.rectAreaLTC1,De.ltc_2.value=B.state.rectAreaLTC2,De.pointLights.value=B.state.point,De.pointLightShadows.value=B.state.pointShadow,De.hemisphereLights.value=B.state.hemi,De.directionalShadowMap.value=B.state.directionalShadowMap,De.directionalShadowMatrix.value=B.state.directionalShadowMatrix,De.spotShadowMap.value=B.state.spotShadowMap,De.spotLightMatrix.value=B.state.spotLightMatrix,De.spotLightMap.value=B.state.spotLightMap,De.pointShadowMap.value=B.state.pointShadowMap,De.pointShadowMatrix.value=B.state.pointShadowMatrix),W.currentProgram=Be,W.uniformsList=null,Be}function Nh(b){if(b.uniformsList===null){let F=b.currentProgram.getUniforms();b.uniformsList=Ks.seqWithValue(F.seq,b.uniforms)}return b.uniformsList}function Fh(b,F){let G=ie.get(b);G.outputColorSpace=F.outputColorSpace,G.batching=F.batching,G.batchingColor=F.batchingColor,G.instancing=F.instancing,G.instancingColor=F.instancingColor,G.instancingMorph=F.instancingMorph,G.skinning=F.skinning,G.morphTargets=F.morphTargets,G.morphNormals=F.morphNormals,G.morphColors=F.morphColors,G.morphTargetsCount=F.morphTargetsCount,G.numClippingPlanes=F.numClippingPlanes,G.numIntersection=F.numClipIntersection,G.vertexAlphas=F.vertexAlphas,G.vertexTangents=F.vertexTangents,G.toneMapping=F.toneMapping}function Nf(b,F,G,W,B){F.isScene!==!0&&(F=we),ue.resetTextureUnits();let ae=F.fog,_e=W.isMeshStandardMaterial?F.environment:null,Ee=I===null?y.outputColorSpace:I.isXRRenderTarget===!0?I.texture.colorSpace:$i,Me=(W.isMeshStandardMaterial?ze:He).get(W.envMap||_e),Fe=W.vertexColors===!0&&!!G.attributes.color&&G.attributes.color.itemSize===4,Be=!!G.attributes.tangent&&(!!W.normalMap||W.anisotropy>0),De=!!G.morphAttributes.position,Qe=!!G.morphAttributes.normal,ot=!!G.morphAttributes.color,St=si;W.toneMapped&&(I===null||I.isXRRenderTarget===!0)&&(St=y.toneMapping);let mt=G.morphAttributes.position||G.morphAttributes.normal||G.morphAttributes.color,lt=mt!==void 0?mt.length:0,Ue=ie.get(W),xt=p.state.lights;if(Ke===!0&&(Y===!0||b!==M)){let Wt=b===M&&W.id===S;ce.setState(W,b,Wt)}let st=!1;W.version===Ue.__version?(Ue.needsLights&&Ue.lightsStateVersion!==xt.state.version||Ue.outputColorSpace!==Ee||B.isBatchedMesh&&Ue.batching===!1||!B.isBatchedMesh&&Ue.batching===!0||B.isBatchedMesh&&Ue.batchingColor===!0&&B.colorTexture===null||B.isBatchedMesh&&Ue.batchingColor===!1&&B.colorTexture!==null||B.isInstancedMesh&&Ue.instancing===!1||!B.isInstancedMesh&&Ue.instancing===!0||B.isSkinnedMesh&&Ue.skinning===!1||!B.isSkinnedMesh&&Ue.skinning===!0||B.isInstancedMesh&&Ue.instancingColor===!0&&B.instanceColor===null||B.isInstancedMesh&&Ue.instancingColor===!1&&B.instanceColor!==null||B.isInstancedMesh&&Ue.instancingMorph===!0&&B.morphTexture===null||B.isInstancedMesh&&Ue.instancingMorph===!1&&B.morphTexture!==null||Ue.envMap!==Me||W.fog===!0&&Ue.fog!==ae||Ue.numClippingPlanes!==void 0&&(Ue.numClippingPlanes!==ce.numPlanes||Ue.numIntersection!==ce.numIntersection)||Ue.vertexAlphas!==Fe||Ue.vertexTangents!==Be||Ue.morphTargets!==De||Ue.morphNormals!==Qe||Ue.morphColors!==ot||Ue.toneMapping!==St||Ue.morphTargetsCount!==lt)&&(st=!0):(st=!0,Ue.__version=W.version);let tn=Ue.currentProgram;st===!0&&(tn=ya(W,F,B));let us=!1,nn=!1,rr=!1,vt=tn.getUniforms(),pn=Ue.uniforms;if(Z.useProgram(tn.program)&&(us=!0,nn=!0,rr=!0),W.id!==S&&(S=W.id,nn=!0),us||M!==b){Z.buffers.depth.getReversed()&&b.reversedDepth!==!0&&(b._reversedDepth=!0,b.updateProjectionMatrix()),vt.setValue(C,"projectionMatrix",b.projectionMatrix),vt.setValue(C,"viewMatrix",b.matrixWorldInverse);let Zt=vt.map.cameraPosition;Zt!==void 0&&Zt.setValue(C,Se.setFromMatrixPosition(b.matrixWorld)),J.logarithmicDepthBuffer&&vt.setValue(C,"logDepthBufFC",2/(Math.log(b.far+1)/Math.LN2)),(W.isMeshPhongMaterial||W.isMeshToonMaterial||W.isMeshLambertMaterial||W.isMeshBasicMaterial||W.isMeshStandardMaterial||W.isShaderMaterial)&&vt.setValue(C,"isOrthographic",b.isOrthographicCamera===!0),M!==b&&(M=b,nn=!0,rr=!0)}if(B.isSkinnedMesh){vt.setOptional(C,B,"bindMatrix"),vt.setOptional(C,B,"bindMatrixInverse");let Wt=B.skeleton;Wt&&(Wt.boneTexture===null&&Wt.computeBoneTexture(),vt.setValue(C,"boneTexture",Wt.boneTexture,ue))}B.isBatchedMesh&&(vt.setOptional(C,B,"batchingTexture"),vt.setValue(C,"batchingTexture",B._matricesTexture,ue),vt.setOptional(C,B,"batchingIdTexture"),vt.setValue(C,"batchingIdTexture",B._indirectTexture,ue),vt.setOptional(C,B,"batchingColorTexture"),B._colorsTexture!==null&&vt.setValue(C,"batchingColorTexture",B._colorsTexture,ue));let mn=G.morphAttributes;if((mn.position!==void 0||mn.normal!==void 0||mn.color!==void 0)&&se.update(B,G,tn),(nn||Ue.receiveShadow!==B.receiveShadow)&&(Ue.receiveShadow=B.receiveShadow,vt.setValue(C,"receiveShadow",B.receiveShadow)),W.isMeshGouraudMaterial&&W.envMap!==null&&(pn.envMap.value=Me,pn.flipEnvMap.value=Me.isCubeTexture&&Me.isRenderTargetTexture===!1?-1:1),W.isMeshStandardMaterial&&W.envMap===null&&F.environment!==null&&(pn.envMapIntensity.value=F.environmentIntensity),nn&&(vt.setValue(C,"toneMappingExposure",y.toneMappingExposure),Ue.needsLights&&Ff(pn,rr),ae&&W.fog===!0&&ee.refreshFogUniforms(pn,ae),ee.refreshMaterialUniforms(pn,W,k,N,p.state.transmissionRenderTarget[b.id]),Ks.upload(C,Nh(Ue),pn,ue)),W.isShaderMaterial&&W.uniformsNeedUpdate===!0&&(Ks.upload(C,Nh(Ue),pn,ue),W.uniformsNeedUpdate=!1),W.isSpriteMaterial&&vt.setValue(C,"center",B.center),vt.setValue(C,"modelViewMatrix",B.modelViewMatrix),vt.setValue(C,"normalMatrix",B.normalMatrix),vt.setValue(C,"modelMatrix",B.matrixWorld),W.isShaderMaterial||W.isRawShaderMaterial){let Wt=W.uniformsGroups;for(let Zt=0,Gl=Wt.length;Zt<Gl;Zt++){let Ci=Wt[Zt];Xe.update(Ci,tn),Xe.bind(Ci,tn)}}return tn}function Ff(b,F){b.ambientLightColor.needsUpdate=F,b.lightProbe.needsUpdate=F,b.directionalLights.needsUpdate=F,b.directionalLightShadows.needsUpdate=F,b.pointLights.needsUpdate=F,b.pointLightShadows.needsUpdate=F,b.spotLights.needsUpdate=F,b.spotLightShadows.needsUpdate=F,b.rectAreaLights.needsUpdate=F,b.hemisphereLights.needsUpdate=F}function Of(b){return b.isMeshLambertMaterial||b.isMeshToonMaterial||b.isMeshPhongMaterial||b.isMeshStandardMaterial||b.isShadowMaterial||b.isShaderMaterial&&b.lights===!0}this.getActiveCubeFace=function(){return T},this.getActiveMipmapLevel=function(){return R},this.getRenderTarget=function(){return I},this.setRenderTargetTextures=function(b,F,G){let W=ie.get(b);W.__autoAllocateDepthBuffer=b.resolveDepthBuffer===!1,W.__autoAllocateDepthBuffer===!1&&(W.__useRenderToTexture=!1),ie.get(b.texture).__webglTexture=F,ie.get(b.depthTexture).__webglTexture=W.__autoAllocateDepthBuffer?void 0:G,W.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(b,F){let G=ie.get(b);G.__webglFramebuffer=F,G.__useDefaultFramebuffer=F===void 0};let Bf=C.createFramebuffer();this.setRenderTarget=function(b,F=0,G=0){I=b,T=F,R=G;let W=!0,B=null,ae=!1,_e=!1;if(b){let Me=ie.get(b);if(Me.__useDefaultFramebuffer!==void 0)Z.bindFramebuffer(C.FRAMEBUFFER,null),W=!1;else if(Me.__webglFramebuffer===void 0)ue.setupRenderTarget(b);else if(Me.__hasExternalTextures)ue.rebindTextures(b,ie.get(b.texture).__webglTexture,ie.get(b.depthTexture).__webglTexture);else if(b.depthBuffer){let De=b.depthTexture;if(Me.__boundDepthTexture!==De){if(De!==null&&ie.has(De)&&(b.width!==De.image.width||b.height!==De.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");ue.setupDepthRenderbuffer(b)}}let Fe=b.texture;(Fe.isData3DTexture||Fe.isDataArrayTexture||Fe.isCompressedArrayTexture)&&(_e=!0);let Be=ie.get(b).__webglFramebuffer;b.isWebGLCubeRenderTarget?(Array.isArray(Be[F])?B=Be[F][G]:B=Be[F],ae=!0):b.samples>0&&ue.useMultisampledRTT(b)===!1?B=ie.get(b).__webglMultisampledFramebuffer:Array.isArray(Be)?B=Be[G]:B=Be,P.copy(b.viewport),O.copy(b.scissor),V=b.scissorTest}else P.copy(ge).multiplyScalar(k).floor(),O.copy(Ne).multiplyScalar(k).floor(),V=We;if(G!==0&&(B=Bf),Z.bindFramebuffer(C.FRAMEBUFFER,B)&&W&&Z.drawBuffers(b,B),Z.viewport(P),Z.scissor(O),Z.setScissorTest(V),ae){let Me=ie.get(b.texture);C.framebufferTexture2D(C.FRAMEBUFFER,C.COLOR_ATTACHMENT0,C.TEXTURE_CUBE_MAP_POSITIVE_X+F,Me.__webglTexture,G)}else if(_e){let Me=F;for(let Fe=0;Fe<b.textures.length;Fe++){let Be=ie.get(b.textures[Fe]);C.framebufferTextureLayer(C.FRAMEBUFFER,C.COLOR_ATTACHMENT0+Fe,Be.__webglTexture,G,Me)}}else if(b!==null&&G!==0){let Me=ie.get(b.texture);C.framebufferTexture2D(C.FRAMEBUFFER,C.COLOR_ATTACHMENT0,C.TEXTURE_2D,Me.__webglTexture,G)}S=-1},this.readRenderTargetPixels=function(b,F,G,W,B,ae,_e,Ee=0){if(!(b&&b.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Me=ie.get(b).__webglFramebuffer;if(b.isWebGLCubeRenderTarget&&_e!==void 0&&(Me=Me[_e]),Me){Z.bindFramebuffer(C.FRAMEBUFFER,Me);try{let Fe=b.textures[Ee],Be=Fe.format,De=Fe.type;if(!J.textureFormatReadable(Be)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!J.textureTypeReadable(De)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}F>=0&&F<=b.width-W&&G>=0&&G<=b.height-B&&(b.textures.length>1&&C.readBuffer(C.COLOR_ATTACHMENT0+Ee),C.readPixels(F,G,W,B,Ie.convert(Be),Ie.convert(De),ae))}finally{let Fe=I!==null?ie.get(I).__webglFramebuffer:null;Z.bindFramebuffer(C.FRAMEBUFFER,Fe)}}},this.readRenderTargetPixelsAsync=async function(b,F,G,W,B,ae,_e,Ee=0){if(!(b&&b.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Me=ie.get(b).__webglFramebuffer;if(b.isWebGLCubeRenderTarget&&_e!==void 0&&(Me=Me[_e]),Me)if(F>=0&&F<=b.width-W&&G>=0&&G<=b.height-B){Z.bindFramebuffer(C.FRAMEBUFFER,Me);let Fe=b.textures[Ee],Be=Fe.format,De=Fe.type;if(!J.textureFormatReadable(Be))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!J.textureTypeReadable(De))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let Qe=C.createBuffer();C.bindBuffer(C.PIXEL_PACK_BUFFER,Qe),C.bufferData(C.PIXEL_PACK_BUFFER,ae.byteLength,C.STREAM_READ),b.textures.length>1&&C.readBuffer(C.COLOR_ATTACHMENT0+Ee),C.readPixels(F,G,W,B,Ie.convert(Be),Ie.convert(De),0);let ot=I!==null?ie.get(I).__webglFramebuffer:null;Z.bindFramebuffer(C.FRAMEBUFFER,ot);let St=C.fenceSync(C.SYNC_GPU_COMMANDS_COMPLETE,0);return C.flush(),await Ad(C,St,4),C.bindBuffer(C.PIXEL_PACK_BUFFER,Qe),C.getBufferSubData(C.PIXEL_PACK_BUFFER,0,ae),C.deleteBuffer(Qe),C.deleteSync(St),ae}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(b,F=null,G=0){let W=Math.pow(2,-G),B=Math.floor(b.image.width*W),ae=Math.floor(b.image.height*W),_e=F!==null?F.x:0,Ee=F!==null?F.y:0;ue.setTexture2D(b,0),C.copyTexSubImage2D(C.TEXTURE_2D,G,0,0,_e,Ee,B,ae),Z.unbindTexture()};let zf=C.createFramebuffer(),kf=C.createFramebuffer();this.copyTextureToTexture=function(b,F,G=null,W=null,B=0,ae=null){ae===null&&(B!==0?(Ls("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),ae=B,B=0):ae=0);let _e,Ee,Me,Fe,Be,De,Qe,ot,St,mt=b.isCompressedTexture?b.mipmaps[ae]:b.image;if(G!==null)_e=G.max.x-G.min.x,Ee=G.max.y-G.min.y,Me=G.isBox3?G.max.z-G.min.z:1,Fe=G.min.x,Be=G.min.y,De=G.isBox3?G.min.z:0;else{let mn=Math.pow(2,-B);_e=Math.floor(mt.width*mn),Ee=Math.floor(mt.height*mn),b.isDataArrayTexture?Me=mt.depth:b.isData3DTexture?Me=Math.floor(mt.depth*mn):Me=1,Fe=0,Be=0,De=0}W!==null?(Qe=W.x,ot=W.y,St=W.z):(Qe=0,ot=0,St=0);let lt=Ie.convert(F.format),Ue=Ie.convert(F.type),xt;F.isData3DTexture?(ue.setTexture3D(F,0),xt=C.TEXTURE_3D):F.isDataArrayTexture||F.isCompressedArrayTexture?(ue.setTexture2DArray(F,0),xt=C.TEXTURE_2D_ARRAY):(ue.setTexture2D(F,0),xt=C.TEXTURE_2D),C.pixelStorei(C.UNPACK_FLIP_Y_WEBGL,F.flipY),C.pixelStorei(C.UNPACK_PREMULTIPLY_ALPHA_WEBGL,F.premultiplyAlpha),C.pixelStorei(C.UNPACK_ALIGNMENT,F.unpackAlignment);let st=C.getParameter(C.UNPACK_ROW_LENGTH),tn=C.getParameter(C.UNPACK_IMAGE_HEIGHT),us=C.getParameter(C.UNPACK_SKIP_PIXELS),nn=C.getParameter(C.UNPACK_SKIP_ROWS),rr=C.getParameter(C.UNPACK_SKIP_IMAGES);C.pixelStorei(C.UNPACK_ROW_LENGTH,mt.width),C.pixelStorei(C.UNPACK_IMAGE_HEIGHT,mt.height),C.pixelStorei(C.UNPACK_SKIP_PIXELS,Fe),C.pixelStorei(C.UNPACK_SKIP_ROWS,Be),C.pixelStorei(C.UNPACK_SKIP_IMAGES,De);let vt=b.isDataArrayTexture||b.isData3DTexture,pn=F.isDataArrayTexture||F.isData3DTexture;if(b.isDepthTexture){let mn=ie.get(b),Wt=ie.get(F),Zt=ie.get(mn.__renderTarget),Gl=ie.get(Wt.__renderTarget);Z.bindFramebuffer(C.READ_FRAMEBUFFER,Zt.__webglFramebuffer),Z.bindFramebuffer(C.DRAW_FRAMEBUFFER,Gl.__webglFramebuffer);for(let Ci=0;Ci<Me;Ci++)vt&&(C.framebufferTextureLayer(C.READ_FRAMEBUFFER,C.COLOR_ATTACHMENT0,ie.get(b).__webglTexture,B,De+Ci),C.framebufferTextureLayer(C.DRAW_FRAMEBUFFER,C.COLOR_ATTACHMENT0,ie.get(F).__webglTexture,ae,St+Ci)),C.blitFramebuffer(Fe,Be,_e,Ee,Qe,ot,_e,Ee,C.DEPTH_BUFFER_BIT,C.NEAREST);Z.bindFramebuffer(C.READ_FRAMEBUFFER,null),Z.bindFramebuffer(C.DRAW_FRAMEBUFFER,null)}else if(B!==0||b.isRenderTargetTexture||ie.has(b)){let mn=ie.get(b),Wt=ie.get(F);Z.bindFramebuffer(C.READ_FRAMEBUFFER,zf),Z.bindFramebuffer(C.DRAW_FRAMEBUFFER,kf);for(let Zt=0;Zt<Me;Zt++)vt?C.framebufferTextureLayer(C.READ_FRAMEBUFFER,C.COLOR_ATTACHMENT0,mn.__webglTexture,B,De+Zt):C.framebufferTexture2D(C.READ_FRAMEBUFFER,C.COLOR_ATTACHMENT0,C.TEXTURE_2D,mn.__webglTexture,B),pn?C.framebufferTextureLayer(C.DRAW_FRAMEBUFFER,C.COLOR_ATTACHMENT0,Wt.__webglTexture,ae,St+Zt):C.framebufferTexture2D(C.DRAW_FRAMEBUFFER,C.COLOR_ATTACHMENT0,C.TEXTURE_2D,Wt.__webglTexture,ae),B!==0?C.blitFramebuffer(Fe,Be,_e,Ee,Qe,ot,_e,Ee,C.COLOR_BUFFER_BIT,C.NEAREST):pn?C.copyTexSubImage3D(xt,ae,Qe,ot,St+Zt,Fe,Be,_e,Ee):C.copyTexSubImage2D(xt,ae,Qe,ot,Fe,Be,_e,Ee);Z.bindFramebuffer(C.READ_FRAMEBUFFER,null),Z.bindFramebuffer(C.DRAW_FRAMEBUFFER,null)}else pn?b.isDataTexture||b.isData3DTexture?C.texSubImage3D(xt,ae,Qe,ot,St,_e,Ee,Me,lt,Ue,mt.data):F.isCompressedArrayTexture?C.compressedTexSubImage3D(xt,ae,Qe,ot,St,_e,Ee,Me,lt,mt.data):C.texSubImage3D(xt,ae,Qe,ot,St,_e,Ee,Me,lt,Ue,mt):b.isDataTexture?C.texSubImage2D(C.TEXTURE_2D,ae,Qe,ot,_e,Ee,lt,Ue,mt.data):b.isCompressedTexture?C.compressedTexSubImage2D(C.TEXTURE_2D,ae,Qe,ot,mt.width,mt.height,lt,mt.data):C.texSubImage2D(C.TEXTURE_2D,ae,Qe,ot,_e,Ee,lt,Ue,mt);C.pixelStorei(C.UNPACK_ROW_LENGTH,st),C.pixelStorei(C.UNPACK_IMAGE_HEIGHT,tn),C.pixelStorei(C.UNPACK_SKIP_PIXELS,us),C.pixelStorei(C.UNPACK_SKIP_ROWS,nn),C.pixelStorei(C.UNPACK_SKIP_IMAGES,rr),ae===0&&F.generateMipmaps&&C.generateMipmap(xt),Z.unbindTexture()},this.initRenderTarget=function(b){ie.get(b).__webglFramebuffer===void 0&&ue.setupRenderTarget(b)},this.initTexture=function(b){b.isCubeTexture?ue.setTextureCube(b,0):b.isData3DTexture?ue.setTexture3D(b,0):b.isDataArrayTexture||b.isCompressedArrayTexture?ue.setTexture2DArray(b,0):ue.setTexture2D(b,0),Z.unbindTexture()},this.resetState=function(){T=0,R=0,I=null,Z.reset(),me.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return wn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=it._getDrawingBufferColorSpace(e),t.unpackColorSpace=it._getUnpackColorSpace()}};var Yt=Object.freeze({chalk:16117464,teal:2645088,deep:1588301,moss:5081976,gold:14460501,copper:10707265,ink:2308168}),Cl={chalk:new Tt({name:"chalk-sail",color:Yt.chalk,roughness:.82,side:yn}),stone:new Tt({name:"teal-basalt",color:Yt.teal,roughness:.94,flatShading:!0}),dark:new Tt({name:"deep-basalt",color:Yt.deep,roughness:.92,flatShading:!0}),moss:new Tt({name:"moss",color:Yt.moss,roughness:.98}),gold:new Tt({name:"aged-brass",color:Yt.gold,roughness:.42,metalness:.58}),copper:new Tt({name:"ochre-ceramic",color:Yt.copper,roughness:.85}),ink:new Tt({name:"navy-cloth",color:Yt.ink,roughness:.9}),glow:new Tt({name:"aether-glass",color:10941148,emissive:5287070,emissiveIntensity:.8,roughness:.28,metalness:.15}),skin:new Tt({name:"pilot-skin",color:13212542,roughness:.9}),turf:new Tt({name:"weathered-turf",color:6720632,roughness:1,flatShading:!0}),sand:new Tt({name:"mineral-sand",color:10070668,roughness:1,flatShading:!0})},cx=i=>Cl[i]||Cl.stone,ff=i=>{let e=i+1>>>0;return()=>(e=Math.imul(1664525,e)+1013904223>>>0,e/4294967296)},qe=(i,e,t,n)=>{let s=new ct(i,typeof e=="string"?cx(e):e);return t&&s.position.set(...t),n&&s.scale.set(...n),s.castShadow=!0,s.receiveShadow=!0,s},zt=(i,e,t,n=10)=>new Kn(i,e,t,n);function Nt(i,e,t,n="gold",s=6){let r=new D(...i),a=new D(...e),o=a.clone().sub(r),l=qe(zt(t,t,o.length(),s),n);return l.position.copy(r).add(a).multiplyScalar(.5),l.quaternion.setFromUnitVectors(new D(0,1,0),o.normalize()),l}function Dn(i,e,t="gold",n=32){return qe(new In(i,e,5,n),t)}function pf(i){let e=Object.keys(i[0].attributes),t=new gt;for(let n of e){let s=i.map(l=>l.attributes[n]),r=s[0].array.constructor,a=new r(s.reduce((l,c)=>l+c.array.length,0)),o=0;for(let l of s)a.set(l.array,o),o+=l.array.length;t.setAttribute(n,new wt(a,s[0].itemSize,s[0].normalized))}return t.computeBoundingSphere(),t}function Il(i){i.updateMatrixWorld(!0);let e=new Map,t=[];i.traverse(n=>{if(n.isMesh&&!n.isInstancedMesh&&!n.isSkinnedMesh&&!Array.isArray(n.material)){let s=(n.geometry.index?n.geometry.toNonIndexed():n.geometry.clone()).applyMatrix4(n.matrixWorld),r=n.material.uuid;e.has(r)||e.set(r,{material:n.material,geometries:[]}),e.get(r).geometries.push(s),t.push(n)}});for(let n of t)n.removeFromParent();for(let{material:n,geometries:s}of e.values()){let r=qe(pf(s),n);r.name=n.name+"-merged",i.add(r);for(let a of s)a.dispose()}return i}function hx(i,e,t){let n=new bt;n.name=`landmark-${e}`;let s=[],r=i*1.04+6,a=[2.45,-.65,1.1,2.8,-1.8,.3][e%6],o=Math.sin(a)*r,l=Math.cos(a)*r,c=qe(zt(5.7,2.2,5.5,t?9:5),"stone",[o,-3.2,l]);n.add(c);let u=Nt([Math.sin(a)*i*.8,-3.5,Math.cos(a)*i*.8],[o,-3.5,l],3.1,"dark",6);n.add(u);let h=(d,m,_,g=.35,p="chalk")=>{n.add(qe(zt(g,g*1.2,_,t?8:5),p,[d,_/2,m])),s.push({shape:"cylinder",x:d,z:m,y:0,radius:g*1.2,height:_})},f=(d,m)=>[o+d,l+m];if(e===0){for(let _ of[-3.6,3.6])for(let g of[-2.8,2.8])h(...f(_,g),4.6,.15,"gold");let d=new Hs;d.moveTo(-4.2,0),d.lineTo(0,2.1),d.lineTo(4.2,0),d.lineTo(4.2,-.065),d.lineTo(0,2.035),d.lineTo(-4.2,-.065),d.closePath();let m=qe(new Qr(d,{depth:6.4,bevelEnabled:!1}),"chalk",[o,4.5,l-3.2]);n.add(m),n.add(Nt([o-4.2,4.5,l-3.2],[o,6.6,l-3.2],.055),Nt([o,6.6,l-3.2],[o+4.2,4.5,l-3.2],.055),Nt([o,6.6,l-3.2],[o,6.6,l+3.2],.055));for(let _=0;_<5;_++){let g=qe(new Rn(.23,.75,3),"copper",[o-2+_,4.3,l-3.25]);g.rotation.z=Math.PI,n.add(g)}}else if(e===1){for(let _ of[-3.3,3.3])h(...f(_,0),5.7,.4);let d=qe(new In(3.3,.32,5,t?24:12,Math.PI),"chalk",[o,5.7,l]);n.add(d);let m=Dn(1.25,.095);m.position.set(o,5.9,l),n.add(m),n.add(Nt([o,5.7,l],[o,9.6,l],.075));for(let _ of[-1,1]){let g=qe(new It(1.6,.35,.1),"gold",[o+_*.8,9.2,l]);g.rotation.z=_*.12,n.add(g)}}else if(e===2){for(let m of[-3,3]){for(let _ of[-3,3])h(...f(_,m),m<0?5.8:4.6,.55);n.add(qe(new It(7,.65,1.3),"chalk",[o,m<0?5.7:4.5,l+m]))}for(let m=0;m<5;m++){let _=qe(new It(6.4,.16,1),"sand",[o,.035,l-2.4+m*1.2]);n.add(_)}let d=qe(new qi(1.15,0),"dark",[o+4.5,.5,l+3.3],[1,.5,1]);n.add(d),s.push({shape:"cylinder",x:o+4.5,z:l+3.3,y:0,radius:1.2,height:1.1})}else if(e===3){for(let d of[-3.6,3.6])h(...f(d,0),7.8,.4,"dark");n.add(Nt([o-3.6,7.8,l],[o,10,l],.16),Nt([o,10,l],[o+3.6,7.8,l],.16)),n.add(qe(new Cn(1.1,0),"glow",[o,9.1,l],[.6,1.7,.6]));for(let d=0;d<3;d++){let m=Dn(1.35+d*.35,.055);m.position.set(o,7.1+d*.75,l),m.rotation.x=Math.PI/2,n.add(m)}n.add(Nt([o,10,l],[o,13,l],.055))}else if(e===4){for(let m=0;m<7;m++){let _=m/6*Math.PI*1.45-.7,g=o+Math.sin(_)*4.2,p=l+Math.cos(_)*4.2;if(h(g,p,5.5+m%2*.6,.42),n.add(qe(zt(.65,.65,.22,6),"gold",[g,5.6+m%2*.6,p])),m<6){let E=(m+1)/6*Math.PI*1.45-.7;n.add(Nt([g,5.45,p],[o+Math.sin(E)*4.2,5.45,l+Math.cos(E)*4.2],.22,"chalk"))}}let d=Dn(2.4,.08);d.position.set(o,.11,l),d.rotation.x=Math.PI/2,n.add(d)}else{for(let _ of[-3.5,3.5])h(...f(_,0),5.3,.45);let d=qe(new In(3.5,.12,5,t?28:14,Math.PI),"gold",[o,5.3,l]);n.add(d);for(let _=1;_<4;_++){let g=d.clone();g.rotation.y=_*Math.PI/4,n.add(g)}let m=Dn(3.5,.12);m.rotation.x=Math.PI/2,m.position.set(o,5.3,l),n.add(m),n.add(qe(new Cn(.75,0),"glow",[o,6.5,l]))}return n.userData.obstacles=s,n}function df(i,e,t,n){let s=new bt;s.name=`island-${e}-lod-${n}`;let r=ff(e*37+11),a=n?40:18,o=new Tt({name:`island-${e}-terrace`,color:[7904390,6590082,6323326][t%3],roughness:1,flatShading:!0});s.add(qe(zt(i,i*.98,.64,a),o,[0,-.32,0])),s.add(qe(zt(i*.98,i*.78,i*.25,a),"stone",[0,-i*.125-.58,0])),s.add(qe(zt(i*.79,i*.46,i*.31,a),"dark",[0,-i*.405-.5,0]));let l=qe(new Rn(i*.48,i*.55,a),"stone",[0,-i*.83-.42,0]);l.rotation.z=Math.PI,s.add(l);for(let u=0;u<(n?22:9);u++){let h=u*Math.PI*2/(n?22:9)+r()*.1,f=i*(.88+r()*.07),d=i*(.12+r()*.2),m=qe(zt(i*.1,i*.07,d,5),"stone",[Math.sin(h)*f,-d*.45-.25,Math.cos(h)*f]);m.rotation.y=h,m.rotation.z=(r()-.5)*.24,s.add(m)}if(n){for(let h=0;h<Math.max(9,Math.round(i*.6));h++){let f=r()*Math.PI*2,d=i*(.23+r()*.62),m=qe(zt(1,1,.05,9),h%3?"turf":"sand",[Math.sin(f)*d,-.016,Math.cos(f)*d],[1.5+r()*i*.12,1,1.2+r()*i*.1]);m.rotation.y=r()*6,m.castShadow=!1,s.add(m)}let u=Dn(i*.72,.055,"copper",48);u.rotation.x=-Math.PI/2,u.position.y=.025,s.add(u);for(let h=0;h<10;h++){let f=qe(new It(.32,.05,.9),"gold",[0,.025,i*(.17+h*.063)]);f.rotation.y=(e%3-1)*.1,s.add(f)}for(let h=0;h<8;h++){let f=h*Math.PI/4+.2,d=i*.84,m=qe(new qi(i*.045,0),"chalk",[Math.sin(f)*d,.08,Math.cos(f)*d],[1,.45,1]);m.rotation.set(.2,f,.2),s.add(m)}for(let h=0;h<12;h++){let f=h*Math.PI/6,d=i*.84,m=qe(new It(1.5,.13,2.1),"sand",[Math.sin(f)*d,.025,Math.cos(f)*d]);m.rotation.y=f,s.add(m)}}let c=hx(i,e,n);if(s.userData.obstacles=c.userData.obstacles,s.add(c),Il(s),n){let u=ux({radius:i,count:Math.round(i*2.2)+e*3,seed:e});s.add(u)}return s}function mf({radius:i=12,region:e=0,index:t=0}={}){let n=new bt;n.name=`island-${t}`;let s=typeof e=="number"?e:{\u8D77\u98A8:0,\u65B7\u6A4B:1,\u96F7\u96F2:2,breeze:0,bridge:1,storm:2}[e]||0,r=new Ur;return r.addLevel(df(i,t,s,!0),0),r.addLevel(df(i,t,s,!1),145),n.add(r),n.userData={radius:i,region:s,index:t,collider:{shape:"cylinder",radius:i,height:.6,top:0},obstacles:r.levels[0].object.userData.obstacles,assetId:`aetherwake.island.${t+1}`,lodDistances:[0,145]},n}function ux({radius:i=12,count:e=24,seed:t=0}={}){let n=new bt;n.name="windgrass-cluster";let s=ff(t*41+9),r=new pt,a=new zn(new Rn(.24,.9,3),Cl.moss,e*3),o=new zn(new jn(.09,0),Cl.gold,e);a.receiveShadow=!0;for(let l=0;l<e;l++){let c=s()*Math.PI*2,u=i*(.58+s()*.31),h=Math.sin(c)*u,f=Math.cos(c)*u;for(let d=0;d<3;d++)r.position.set(h+d*.23,.75,f+d*.18),r.rotation.set(.18,s()*6,.2+s()*.25),r.scale.set(1.7+s(),1.7+s()*1.8,2.2),r.updateMatrix(),a.setMatrixAt(l*3+d,r.matrix);r.position.set(h,1.7,f),r.rotation.set(0,0,0),r.scale.setScalar(1.8),r.updateMatrix(),o.setMatrixAt(l,r.matrix)}return a.name="instanced-grass",o.name="instanced-amber-seeds",n.add(a,o),n}function xh(i=0){let e=typeof i=="number"?i%3:{wind:0,solar:1,astral:2}[i]??0,t=new bt;t.name=["wind-observatory","solar-observatory","astral-observatory"][e],t.add(qe(zt(2.05,2.3,.3,12),"chalk",[0,.15,0])),t.add(qe(zt(1.6,1.9,.18,12),"copper",[0,.39,0]));let n=Dn(1.45,.07);n.rotation.x=Math.PI/2,n.position.y=.51,t.add(n);for(let r=0;r<8;r++){let a=r*Math.PI/4;t.add(Nt([Math.sin(a)*1.1,.53,Math.cos(a)*1.1],[Math.sin(a)*1.38,.53,Math.cos(a)*1.38],.03))}for(let r of[-1,1])t.add(qe(zt(.19,.3,2.4,8),"chalk",[r*1,1.65,0])),t.add(qe(zt(.3,.3,.13,8),"gold",[r*1,2.8,0]));t.add(Nt([-1,2.8,0],[1,2.8,0],.13));let s=qe(new Cn(.47,0),"glow",[0,2.15,0],[.8,1.4,.8]);if(t.add(s),e===0){let r=Dn(1.1,.085);r.position.y=2.15,r.rotation.y=.45,t.add(r),t.add(Nt([0,.5,0],[0,3.7,0],.08));for(let a=0;a<4;a++){let o=a*Math.PI/2,l=qe(new It(.65,.18,.08),"gold",[Math.cos(o)*.5,3.5+Math.sin(o)*.5,0]);l.rotation.z=o+.35,t.add(l)}}if(e===1){for(let r=0;r<3;r++){let a=Dn(.78+r*.18,.055);a.position.y=2.15,a.rotation.set(r*.8,.4+r*.65,.6),t.add(a)}for(let r=0;r<8;r++){let a=r*Math.PI/4;t.add(Nt([Math.cos(a)*1.05,2.15+Math.sin(a)*1.05,0],[Math.cos(a)*1.35,2.15+Math.sin(a)*1.35,0],.065))}}if(e===2){for(let r=0;r<3;r++){let a=Dn(1.12,.065);a.position.y=2.2,a.rotation.set(r*Math.PI/3,.3+r,.5),t.add(a)}t.add(qe(new Rn(.6,1,8),"gold",[0,3.65,0]));for(let r=0;r<4;r++){let a=r*Math.PI/2;t.add(qe(new Cn(.16,0),"glow",[Math.sin(a)*1.48,2.6,Math.cos(a)*1.48]))}}return Il(t),t.userData={assetId:`aetherwake.station.${e+1}`,collider:{shape:"cylinder",radius:1.45,height:4.2},type:e},t}function gf(i=0){let e=(i%12+12)%12,t=new bt;t.name=`relic-${String(e+1).padStart(2,"0")}`;let n=[new Cn(.42,0),new jn(.42,0),new qi(.4,0)],s=qe(n[e%3],"glow",[0,.7,0],[.8+e%4*.1,1.15+e%3*.15,.65]);s.rotation.set(e*.15,e*.38,0),t.add(s);for(let o=0;o<3;o++)o!==e%3&&n[o].dispose();let r=Dn(.65,.045);r.position.y=.7,r.rotation.set(e%2?Math.PI/2:0,e*.28,e%3*.3),t.add(r);let a=3+e%4;for(let o=0;o<a;o++){let l=o*Math.PI*2/a+e*.31,c=qe(new It(.11,.23,.12),"gold",[Math.cos(l)*.62,.7+Math.sin(l)*.62,0]);c.rotation.z=l,t.add(c)}if(e>=6){let o=Dn(.34,.025,"chalk",16);o.position.y=.7,o.rotation.y=Math.PI/2,t.add(o)}return t.add(qe(zt(.32,.43,.12,6),"dark",[0,.06,0])),Il(t),t.userData={assetId:`aetherwake.relic.${String(e+1).padStart(2,"0")}`,variant:e,collider:{shape:"sphere",radius:1.15,center:[0,.7,0]}},t}function vh(i="tailwind",{radius:e=3,height:t=9,length:n=14}={}){let s={steady:"tailwind",thermal:"updraft",side:"crosswind",tail:"tailwind",up:"updraft",cross:"crosswind"}[i]||i,r=new bt;r.name=`wind-${s}`;let a=new ln({name:`wind-${s}-light`,color:s==="updraft"?16766873:s==="crosswind"?12498677:12381918,transparent:!0,opacity:.48,depthWrite:!1}),o=s==="updraft"?24:28,l=new zn(new Rn(.18,.85,4),a,o),c=new pt;l.name="wind-direction-volume",r.add(l);let u=0,h=[];if(s==="updraft")for(let d=0;d<3;d++){let m=qe(new In(e*.78,.055,4,40,Math.PI*1.65),a);m.rotation.x=-Math.PI/2,m.position.y=d*t/3,m.castShadow=!1,h.push(m),r.add(m)}else for(let d of[-1,1]){let m=new bi(Array.from({length:9},(g,p)=>new D(d*e*.55+Math.sin(p*.8)*e*.08,.6+Math.sin(p*.6)*.25,-n/2+p*n/8))),_=qe(new Zi(m,20,.045,4,!1),a);_.castShadow=!1,r.add(_)}let f=(d=0)=>{u+=d;for(let m=0;m<o;m++){let _=(u*.13+m/o)%1,g=m*2.399+u*.25;s==="updraft"?(c.position.set(Math.cos(g)*e*.78,_*t,Math.sin(g)*e*.78),c.rotation.set(0,0,0)):(c.position.set(Math.sin(m*4.3)*e*.7,1.6+Math.sin(m*3.1)*1.7,(_-.5)*n),c.rotation.set(Math.PI/2,0,s==="crosswind"?Math.sin(u+m)*.3:0)),c.scale.setScalar(.7+Math.sin(_*Math.PI)*.5),c.updateMatrix(),l.setMatrixAt(m,c.matrix)}l.instanceMatrix.needsUpdate=!0;for(let m=0;m<h.length;m++)h[m].position.y=(u*1.4+m*t/3)%t,h[m].rotation.z=u*.25+m*2};return f(),r.userData={type:s,update:f,assetId:`aetherwake.wind.${s}`,distribution:{radius:e,height:t,length:n},fixedParticleSize:!0},r}function Rt(i,e,t){let n=[];for(let s of t){let r=new qt().setFromEuler(new on(...s));n.push(r.x,r.y,r.z,r.w)}return new ti(`${i}.quaternion`,e,n)}function _f(){let i=new bt;i.name="aether-pilot";let e=new hn;e.name="root";let t=new hn;t.name="hips",t.position.y=.82,e.add(t);let n=new hn;n.name="torso",n.position.y=.22,t.add(n);let s=new hn;s.name="head",s.position.y=.55,n.add(s);let r=new hn;r.name="leftArm",r.position.set(-.32,.32,0),n.add(r);let a=new hn;a.name="rightArm",a.position.set(.32,.32,0),n.add(a);let o=new hn;o.name="leftLeg",o.position.set(-.15,-.05,0),t.add(o);let l=new hn;l.name="rightLeg",l.position.set(.15,-.05,0),t.add(l);let c=[e,t,n,s,r,a,o,l];e.updateMatrixWorld(!0);let u=[],h=(L,H,N,k,Q)=>{L.index&&(L=L.toNonIndexed());let le=new Ye().compose(new D(...N),new qt,new D(...k));L.applyMatrix4(le).applyMatrix4(H.matrixWorld);let ge=L.attributes.position.count,Ne=new Uint16Array(ge*4),We=new Float32Array(ge*4),et=new Float32Array(ge*3),Ke=new ke(Q);for(let Y=0;Y<ge;Y++)Ne[Y*4]=c.indexOf(H),We[Y*4]=1,et[Y*3]=Ke.r,et[Y*3+1]=Ke.g,et[Y*3+2]=Ke.b;L.setAttribute("skinIndex",new wt(Ne,4)),L.setAttribute("skinWeight",new wt(We,4)),L.setAttribute("color",new wt(et,3)),u.push(L)};h(zt(.29,.24,.6,8),n,[0,.22,0],[1,1,1],Yt.chalk),h(new It(.42,.16,.33),t,[0,.04,0],[1,1,1],Yt.copper),h(new Qn(.235,10,7),s,[0,.08,.035],[1,1.05,1],13212542),h(new Qn(.25,10,6,0,Math.PI*2,0,Math.PI*.57),s,[0,.11,.02],[1,1,1],Yt.ink),h(new It(.4,.11,.12),s,[0,.12,.23],[1,1,1],Yt.gold),h(new It(.42,.5,.23),n,[0,.25,-.24],[1,1,1],Yt.copper);for(let L of[r,a])h(zt(.105,.08,.55,7),L,[0,-.2,0],[1,1,1],Yt.chalk),h(new Qn(.09,8,5),L,[0,-.48,0],[1,1,1],13212542);for(let L of[o,l])h(zt(.105,.08,.59,7),L,[0,-.3,0],[1,1,1],Yt.ink),h(new It(.19,.16,.33),L,[0,-.64,.065],[1,1,1],Yt.copper);let f=pf(u),d=new Tt({name:"pilot-vertex-palette",vertexColors:!0,roughness:.8}),m=new Nr(f,d);m.name="pilot-rigged-body",m.add(e),m.bind(new Or(c)),m.castShadow=!0,i.add(m);for(let L of u)L.dispose();let _=new bt;_.name="ivory-glider";let g=7,p=17,E=[],v=[],y=[];for(let L=0;L<g;L++)for(let H=0;H<p;H++){let N=H/(p-1),k=L/(g-1),Q=(N-.5)*4.6,le=(k-.5)*1.65-.12;E.push(Q,2.13+.4*Math.sin(N*Math.PI)+.16*Math.sin(k*Math.PI),le),v.push(N,k)}for(let L=0;L<g-1;L++)for(let H=0;H<p-1;H++){let N=L*p+H;y.push(N,N+1,N+p,N+1,N+p+1,N+p)}let A=g*p,T=[...y];for(let L=0;L<A;L++)E.push(E[L*3],E[L*3+1]-.026,E[L*3+2]),v.push(v[L*2],v[L*2+1]);for(let L=0;L<T.length;L+=3)y.push(T[L]+A,T[L+2]+A,T[L+1]+A);let R=[];for(let L=0;L<p;L++)R.push(L);for(let L=1;L<g;L++)R.push(L*p+p-1);for(let L=p-2;L>=0;L--)R.push((g-1)*p+L);for(let L=g-2;L>0;L--)R.push(L*p);for(let L=0;L<R.length;L++){let H=R[L],N=R[(L+1)%R.length];y.push(H,N,H+A,N,N+A,H+A)}let I=new gt;I.setAttribute("position",new tt(E,3)),I.setAttribute("uv",new tt(v,2)),I.setIndex(y),I.computeVertexNormals(),_.add(qe(I,"chalk"));for(let L of[-1,-.5,0,.5,1]){let H=L*2.3,N=2.13+.4*Math.sin((L+1)*Math.PI/2);_.add(Nt([H,N,-.94],[H,N,.7],.023,"gold"))}_.add(Nt([-2.3,2.13,-.94],[0,2.53,-.94],.035,"gold"),Nt([0,2.53,-.94],[2.3,2.13,-.94],.035,"gold"));for(let L of[-1,1])_.add(Nt([L*1.65,2.35,-.45],[L*.38,1.2,0],.016,"ink"),Nt([L*1.65,2.35,.45],[L*.38,1.2,0],.016,"ink"));let S=qe(new It(.35,.025,1.58),"copper",[0,2.55,-.12]);_.add(S),Il(_),_.visible=!1,i.add(_);let M=[new Pn("idle",2.4,[Rt("torso",[0,1.2,2.4],[[.025,0,0],[-.025,0,0],[.025,0,0]]),Rt("leftArm",[0,1.2,2.4],[[0,0,-.09],[.04,0,-.06],[0,0,-.09]]),Rt("rightArm",[0,1.2,2.4],[[0,0,.09],[-.04,0,.06],[0,0,.09]])]),new Pn("run",.7,[Rt("leftLeg",[0,.175,.35,.525,.7],[[.6,0,0],[0,0,0],[-.6,0,0],[0,0,0],[.6,0,0]]),Rt("rightLeg",[0,.175,.35,.525,.7],[[-.6,0,0],[0,0,0],[.6,0,0],[0,0,0],[-.6,0,0]]),Rt("leftArm",[0,.35,.7],[[-.5,0,-.08],[.5,0,-.08],[-.5,0,-.08]]),Rt("rightArm",[0,.35,.7],[[.5,0,.08],[-.5,0,.08],[.5,0,.08]])]),new Pn("jump",.45,[Rt("torso",[0,.2,.45],[[.12,0,0],[-.12,0,0],[-.05,0,0]]),Rt("leftLeg",[0,.2,.45],[[0,0,0],[-.5,0,0],[.15,0,0]]),Rt("rightLeg",[0,.2,.45],[[0,0,0],[-.45,0,0],[.1,0,0]]),Rt("leftArm",[0,.3,.45],[[0,0,0],[0,0,-1.4],[0,0,-1.2]]),Rt("rightArm",[0,.3,.45],[[0,0,0],[0,0,1.4],[0,0,1.2]])]),new Pn("glide",2,[Rt("torso",[0,1,2],[[.15,0,0],[.2,0,0],[.15,0,0]]),Rt("leftArm",[0,1,2],[[0,0,-1.7],[.06,0,-1.65],[0,0,-1.7]]),Rt("rightArm",[0,1,2],[[0,0,1.7],[-.06,0,1.65],[0,0,1.7]]),Rt("leftLeg",[0,1,2],[[.25,0,-.08],[.32,0,-.06],[.25,0,-.08]]),Rt("rightLeg",[0,1,2],[[.32,0,.08],[.25,0,.06],[.32,0,.08]])]),new Pn("land",.4,[Rt("torso",[0,.14,.4],[[.15,0,0],[.35,0,0],[0,0,0]]),Rt("leftLeg",[0,.14,.4],[[.2,0,0],[-.3,0,0],[0,0,0]]),Rt("rightLeg",[0,.14,.4],[[.2,0,0],[-.3,0,0],[0,0,0]])])],P=new oa(i),O=Object.fromEntries(M.map(L=>[L.name,P.clipAction(L)]));for(let L of["jump","land"])O[L].setLoop(Ml,1),O[L].clampWhenFinished=!0;let V="idle";O.idle.play();let $=(L,H={})=>{let N=typeof H=="string"?{mode:H}:H,k=N.mode||N.state||(N.gliding?"glide":N.grounded===!1?"jump":N.speed>.5?"run":"idle"),Q=O[k]?k:"idle";Q!==V&&(O[Q].reset().play(),O[V].crossFadeTo(O[Q],.16,!1),V=Q),_.visible=Q==="glide",Q==="run"&&(O.run.timeScale=Math.max(.7,Math.min(1.7,(N.speed||5)/5))),P.update(Math.min(L,.1))};return i.userData={assetId:"aetherwake.pilot",skeleton:c.map(L=>L.name),clips:M.map(L=>L.name),collider:{shape:"capsule",radius:.3,height:1.85},rootMotion:!1},{group:i,mixer:P,clips:M,update:$,sail:_}}var Dt=D;function yf(i,e,t=xe){if(!i)return null;let n=e.courseStages?.[i.id]||0,s=i.stages||[],r=n>=s.length?0:n,a=s[r],o=t.islands.find(f=>f.id===a?.fromIslandId),l=t.islands.find(f=>f.id===a?.toIslandId),c=o?{...i,x:o.x+18,y:o.y+22,z:o.z-18}:i,u=a?.gates||i.gates||[],h=e.challengeProgress?.[i.id]||0;return{entry:c,stage:a,stageIndex:r,completed:e.challenges?.includes(i.id)||!1,key:`${i.id}:${r}`,points:[c,...u,l||c],winds:(a?.winds||i.winds||[]).filter(f=>f.gate===h),progress:h}}function dx(i){let e=i.challengeHint||i.trackedHint||i.surveyHint,t=i.challengeHint?i.challengeHint.landing?`\u7B2C ${i.challengeHint.stage}/${i.challengeHint.stageTotal} \u6BB5 \xB7 \u843D\u5CF6\u4EA4\u4ED8`:`\u7B2C ${i.challengeHint.stage}/${i.challengeHint.stageTotal} \u6BB5 \xB7 \u6E2C\u98A8\u9580 ${i.challengeHint.step}/${i.challengeHint.total-1}`:i.trackedHint?i.trackedHint.transit?`\u5B89\u5168\u63A5\u99C1 ${i.trackedHint.transitStep}/${i.trackedHint.transitTotal}`:`${i.trackedHint.stageName||i.trackedHint.name}\u5165\u53E3`:i.surveyHint?`${i.surveyHint.name} ${i.surveyHint.step}/${i.surveyHint.total}`:null;return{target:e,label:t,surveyTarget:i.activeChallenge?null:i.trackedHint?i.trackedHint.transit?i.trackedHint:null:i.surveyHint,mainRouteVisible:!i.activeChallenge&&!i.trackedHint}}function fx(i,e){return!!(i&&e&&e.width>0&&e.height>0&&i.left<e.right+4&&i.right>e.left-4&&i.top<e.bottom+4&&i.bottom>e.top-4)}var Mh=class{constructor(e,t,n=globalThis.ResizeObserver){this.label=e,this.card=t,this.anchor=null,this.size=null,this.origin={x:0,y:0},this.cardRect=null,this.observer=new n(()=>this.refresh()),this.observer.observe(e),this.observer.observe(t)}refresh(){this.cardRect=this.card.getBoundingClientRect();let e=this.label.getBoundingClientRect();e.width>0&&e.height>0&&(this.size={width:e.width,height:e.height},this.anchor&&(this.origin.x=e.left+e.width/2-this.anchor.x,this.origin.y=e.top+e.height/2-this.anchor.y)),this.apply()}place(e,t){this.anchor={x:e,y:t},this.apply()}apply(){let e=this.anchor&&this.size?{left:this.anchor.x+this.origin.x-this.size.width/2,right:this.anchor.x+this.origin.x+this.size.width/2,top:this.anchor.y+this.origin.y-this.size.height/2,bottom:this.anchor.y+this.origin.y+this.size.height/2}:null;this.label.style.visibility=fx(e,this.cardRect)?"hidden":""}dispose(){this.observer.disconnect()}};function px(i){let e=i.type==="updraft"||i.type==="thermal",t=i.start?Math.hypot(i.end.x-i.start.x,i.end.z-i.start.z):30,n=vh(i.type,{radius:e?i.radius*.65:5,height:e?32:9,length:t});if(n.position.set(i.x,e?i.ceiling-29:i.start?(i.start.y+i.end.y)/2:20,i.z),!e&&i.direction&&(n.rotation.y=Math.atan2(i.direction.x,i.direction.z)),i.start&&i.end){let s=n.worldToLocal(new Dt(i.start.x,i.start.y??i.y,i.start.z)),r=n.worldToLocal(new Dt(i.end.x,i.end.y??i.y,i.end.z)),a=new bi([s,new Dt().lerpVectors(s,r,.5).add(new Dt(0,1,0)),r]),o=new ct(new Zi(a,24,.6,5,!1),new ln({color:i.type==="crosswind"?"#e6bc73":"#b6f1da",transparent:!0,opacity:.15,depthWrite:!1}));o.name="wind-corridor-path",n.add(o)}return n}function Sh(i){let e=new Set,t=new Set;i.traverse(n=>{n.geometry&&e.add(n.geometry);for(let s of Array.isArray(n.material)?n.material:n.material?[n.material]:[])t.add(s)});for(let n of e)n.dispose();for(let n of t)n.dispose()}var Pl=class{constructor(e="#ffe1a2"){this.group=new bt,this.group.name="flight-target";let t=new ln({color:e,depthWrite:!1});this.ring=new ct(new In(1,.018,8,48),t),this.group.add(this.ring),this.arrow=new bt,this.shaft=new ct(new Kn(.1,.1,1,6),t),this.tip=new ct(new Rn(.75,1.8,7),t),this.shaft.rotation.x=this.tip.rotation.x=Math.PI/2,this.arrow.add(this.shaft,this.tip),this.group.add(this.arrow),this.group.visible=!1}update(e,t){if(this.group.visible=!!e,!e)return;let n=e.radius||10,s=e.heading,r=s&&Math.hypot(s.x,s.z)>0;this.group.position.set(e.x,e.y+(e.landing?.25:0),e.z),this.ring.scale.setScalar(n),this.group.rotation.set(e.landing?-Math.PI/2:0,e.landing?0:r?Math.atan2(s.x,s.z):Math.atan2(t.x-e.x,t.z-e.z),0),this.arrow.visible=!!r&&!e.landing;let a=Math.min(12,Math.max(6,n));this.arrow.position.set(0,n+1.5,0),this.shaft.scale.y=a-1.8,this.shaft.position.z=-.9,this.tip.position.z=a/2-.9}dispose(){Sh(this.group)}};function wh(i){for(let e=i;e;e=e.parent)if(!e.visible)return!1;return!0}function bh(i,e,t,n=new Qi){let s=t.filter(wh),r=new Map;for(let[a,o]of[["head",1.65],["torso",1.05],["hips",.55]]){let c=new Dt(e.x,e.y+o,e.z).sub(i.position),u=c.length();if(!(u<=i.near+.1)){n.set(i.position,c.normalize()),n.near=i.near,n.far=u-.1;for(let h of n.intersectObjects(s,!1)){let f=r.get(h.object);(!f||h.distance<f.distance)&&r.set(h.object,{...h,sample:a})}}}return[...r.values()].sort((a,o)=>a.distance-o.distance)}var Eh=class{constructor(){this.meshes=[],this.owners=new Map,this.materials=new Map,this.targets=new Set,this.ray=new Qi,this.sinceSample=1/0,this.maxFadedMeshes=8}register(e,t={}){e.updateWorldMatrix(!0,!0),e.traverse(n=>{!n.isMesh||n.isInstancedMesh||n.isSkinnedMesh||this.owners.has(n)||!(Array.isArray(n.material)?n.material:[n.material]).some(r=>r.visible&&(!r.transparent||r.opacity>=.85))||(this.meshes.push(n),this.owners.set(n,t))})}update(e,t,n,s=!0){let r=Math.max(0,Math.min(n,.1));this.sinceSample+=r,s?this.sinceSample>=.075&&(this.targets=new Set(bh(e,t,this.meshes,this.ray).slice(0,this.maxFadedMeshes).map(o=>o.object)),this.sinceSample=0):(this.targets.clear(),this.sinceSample=1/0);let a=Math.max(0,this.maxFadedMeshes-this.targets.size);for(let[o,l]of this.materials)l.factor<1&&!this.targets.has(o)&&a--<=0&&(l.factor=1,o.material=l.original);for(let o of this.targets){if(this.materials.has(o))continue;let l=o.material,c=Array.isArray(l)?l:[l],u=c.map(h=>{let f=h.clone();return f.transparent=!0,f.depthWrite=!1,f});this.materials.set(o,{original:l,sources:c,copies:u,factor:1,faded:Array.isArray(l)?u:u[0]})}for(let[o,l]of this.materials){let c=s&&this.targets.has(o)&&wh(o);if(l.factor=c?Math.max(.16,l.factor-r*8):Math.min(1,l.factor+r*6),l.factor>=1)o.material=l.original;else{for(let u=0;u<l.copies.length;u++)l.copies[u].opacity=l.sources[u].opacity*l.factor;o.material=l.faded}}}inspect(e,t){let n=bh(e,t,this.meshes),s=r=>{let a=this.materials.get(r);return{object:r.name||r.type,...this.owners.get(r),opacityFactor:a&&r.material===a.faded?a.factor:1}};return{hits:n,treatment:{method:"bounded-foreground-fade",applied:n.some(r=>s(r.object).opacityFactor<1),maximumMeshes:this.maxFadedMeshes,targetOpacityFactor:.16,sampleIntervalSeconds:.075,rawBlockers:n.map(r=>({...s(r.object),sample:r.sample})),fadingMeshes:[...this.materials].filter(([r,a])=>r.material===a.faded).map(([r])=>s(r)),retainedMaterialClones:[...this.materials.values()].reduce((r,a)=>r+a.copies.length,0)}}}dispose(){for(let[e,t]of this.materials){e.material=t.original;for(let n of t.copies)n.dispose()}this.materials.clear(),this.targets.clear(),this.meshes.length=0,this.owners.clear()}},Ll=class{constructor(e){this.canvas=e,this.mapScale=xe.mapScale||1,this.scene=new Dr,this.scene.background=new ke("#8fc8c8"),this.scene.fog=new Lr("#a4d2ce",.0012/this.mapScale),this.renderer=new Al({canvas:e,antialias:!0,alpha:!1,powerPreference:"high-performance"}),this.renderer.setPixelRatio(Math.min(devicePixelRatio,1.5)),this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=Ro,this.renderer.outputColorSpace=$t,this.renderer.toneMapping=Fo,this.renderer.toneMappingExposure=1.2,this.camera=new Vt(56,1,.3,1800*this.mapScale),this.camera.position.set(100,88,145),this.scene.add(new sa("#e9f3d4","#277d81",2.7)),this.sun=new aa("#fff1c5",3),this.sun.position.set(-80,130,40),this.sun.castShadow=!0,this.sun.shadow.mapSize.set(1024,1024),Object.assign(this.sun.shadow.camera,{left:-45,right:45,top:45,bottom:-45,near:1,far:240}),this.sun.shadow.bias=-.001,this.sun.shadow.normalBias=.2,this.scene.add(this.sun,this.sun.target);let t=new ct(new Qn(1300*this.mapScale,32,16),new cn({side:Bt,depthWrite:!1,uniforms:{top:{value:new ke("#438c9e")},bottom:{value:new ke("#b4d8d2")}},vertexShader:"varying vec3 p;void main(){p=position;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}",fragmentShader:"varying vec3 p;uniform vec3 top;uniform vec3 bottom;void main(){float h=clamp(normalize(p).y*.85+.18,0.,1.);vec3 c=mix(bottom,top,pow(h,.65));float sun=pow(max(0.,dot(normalize(p),normalize(vec3(-.5,.35,-.6)))),80.);gl_FragColor=vec4(c+vec3(.35,.24,.1)*sun,1.);}"}));t.material.fog=!1,this.scene.add(t),this.islands=[],this.stations=[],this.relics=[],this.winds=[],this.collidables=[],this.foreground=new Eh,this.labels=[],xe.islands.forEach((h,f)=>{let d=mf({radius:h.radius,region:h.region,index:f});if(d.position.set(h.x,h.y,h.z),this.scene.add(d),this.islands.push(d),this.foreground.register(d,{kind:"island",id:h.id}),d.traverse(_=>{_.isMesh&&!_.isInstancedMesh&&this.collidables.push(_)}),h.station){let _=xh([0,2,1][this.stations.length%3]);_.position.set(h.x,h.y+.1,h.z),_.scale.setScalar(1.8),this.scene.add(_),this.foreground.register(_,{kind:"station",id:h.id}),this.stations.push({data:h,group:_})}else if(f===0){let _=xh("astral");_.position.set(h.x+7,h.y,h.z+5),_.scale.setScalar(1.4),this.scene.add(_),this.foreground.register(_,{kind:"camp-decoration",id:h.id})}let m=document.createElement("div");m.className="island-label",m.innerHTML=`<span>${String(f+1).padStart(2,"0")} / ${h.region}</span>${h.name}<b>${h.station?"\u25C7":"\xB7"}</b>`,document.querySelector("#world-labels").append(m),this.labels.push({label:m,data:h})}),xe.relics.forEach((h,f)=>{let d=gf(f);d.position.set(h.x,h.y+1.2,h.z),this.scene.add(d),this.relics.push({data:h,group:d})}),xe.winds.forEach(h=>{let f=px(h);this.scene.add(f),this.winds.push({data:h,group:f})}),this.hazards=xe.hazards.map(h=>{let f=new bt,d=new Tt({color:h.type==="thunder"?"#34485d":"#cbdfd4",transparent:!0,opacity:h.type==="thunder"?.57:.19,roughness:1,depthWrite:!1}),m=new zn(new jn(1,1),d,12),_=new pt;for(let g=0;g<12;g++){let p=g*2.399;_.position.set(Math.cos(p)*h.radius*.6,g%4*10+18,Math.sin(p)*h.radius*.6),_.scale.set(h.radius*.42,8,h.radius*.32),_.updateMatrix(),m.setMatrixAt(g,_.matrix)}if(f.add(m),h.type==="thunder"){let g=new ct(new Cn(4,0),new Tt({color:"#d6a9f4",emissive:"#ad77cf",emissiveIntensity:1}));g.position.y=33,f.add(g),f.userData.core=g}return f.position.set(h.x,h.y,h.z),this.scene.add(f),{group:f,data:h}}),this.challenges=xe.challenges.map(h=>{let f=new Pl("#f7d38e");return this.scene.add(f.group),{data:h,group:f.group,marker:f}}),this.surveyMarker=new Pl,this.surveyMarker.group.name="main-survey-target",this.scene.add(this.surveyMarker.group),this.pilot=_f(),this.wasGrounded=!0,this.landingTime=0,this.scene.add(this.pilot.group);let n=new ln({color:"#082d39",transparent:!0,opacity:.24,depthWrite:!1});this.contactShadow=new ct(new Gr(1.5,24),n),this.contactShadow.rotation.x=-Math.PI/2,this.scene.add(this.contactShadow),this.marker=new bt;let s=new ct(new In(4.6,.12,6,56),new ln({color:"#ffe1a2",transparent:!0,opacity:.8}));s.rotation.x=-Math.PI/2,this.marker.add(s);let r=new ct(new Kn(.15,.15,38,6),new ln({color:"#ffe5ae",transparent:!0,opacity:.25,depthWrite:!1}));r.position.y=19,this.marker.add(r),this.scene.add(this.marker);let a=new jn(1,1),o=new Tt({color:"#d1e2ce",roughness:1,flatShading:!0,transparent:!0,opacity:.52,depthWrite:!1});this.clouds=new zn(a,o,100);let l=new pt;for(let h=0;h<100;h++){let f=h*2.39996,d=(90+Math.sqrt(h)*62)*this.mapScale;l.position.set(Math.cos(f)*d+70*this.mapScale,-55-h%5*8,Math.sin(f)*d-80*this.mapScale),l.scale.set((22+h%5*7)*Math.sqrt(this.mapScale),10+h%3*5,(15+h%7*4)*Math.sqrt(this.mapScale)),l.rotation.y=f,l.updateMatrix(),this.clouds.setMatrixAt(h,l.matrix)}this.scene.add(this.clouds);let c=new gt,u=new Float32Array(540);for(let h=0;h<180;h++)u[h*3]=((Math.sin(h*237.33)*.5+.5)*700-250)*this.mapScale,u[h*3+1]=h%47*2,u[h*3+2]=(Math.cos(h*131.13)*350-50)*this.mapScale;c.setAttribute("position",new wt(u,3)),this.dust=new kr(c,new Bs({size:.5,color:"#eff5c9",transparent:!0,opacity:.55,sizeAttenuation:!0})),this.scene.add(this.dust),this.routeLine=null,this.courseLine=null,this.courseId=null,this.courseWindKey="",this.courseWinds=[],this.yaw=0,this.manualYaw=0,this.cameraSnapPending=!1,this.pitch=.63,this.distance=26,this.overhead=!1,this.reduced=!1,this.menu=!0,this.target=new Dt,this.ray=new Qi,this.frames=[],this.metrics={frames:0,drawCalls:0,triangles:0,geometries:0,textures:0},this.navTarget=document.querySelector("#nav-target"),this.navText=this.navTarget.querySelector("span"),this.navOcclusion=new Mh(this.navTarget,document.querySelector("#course")),this.resize=()=>{let h=e.clientWidth,f=e.clientHeight;this.renderer.setSize(h,f,!1),this.camera.aspect=h/f,this.camera.updateProjectionMatrix(),this.navOcclusion.refresh()},window.addEventListener("resize",this.resize),this.resize()}setQuality(e){this.renderer.setPixelRatio(e==="low"?1:Math.min(devicePixelRatio,1.5)),this.renderer.shadowMap.enabled=e!=="low",this.clouds.visible=e!=="low",this.resize()}setRoute(e){if(this.routeLine&&(this.scene.remove(this.routeLine),this.routeLine.geometry.dispose(),this.routeLine.material.dispose(),this.routeLine=null),!e?.waypoints?.length)return;let t=e.waypoints.map(n=>new Dt(n.x,n.y+2,n.z));this.routeLine=new Os(new gt().setFromPoints(t),new Gs({color:e.style==="shortcut"?"#f2bf7a":"#c7f4df",dashSize:3,gapSize:4,transparent:!0,opacity:.55})),this.routeLine.computeLineDistances(),this.scene.add(this.routeLine)}updateCourse(e,t=xe){let n=t.challenges.find(o=>o.id===e.activeChallenge),s=yf(n,e,t),r=s?.key||null;if(this.courseId!==r&&(this.courseLine&&(this.scene.remove(this.courseLine),Sh(this.courseLine),this.courseLine=null),this.courseId=r,s)){let o=s.points.map(l=>new Dt(l.x,l.y,l.z));this.courseLine=new Os(new gt().setFromPoints(o),new Gs({color:"#f7d38e",dashSize:2,gapSize:4,transparent:!0,opacity:.6})),this.courseLine.computeLineDistances(),this.scene.add(this.courseLine)}let a=s?`${s.key}:${s.progress}`:"";if(this.courseWindKey!==a){for(let{group:o}of this.courseWinds)this.scene.remove(o),Sh(o);this.courseWinds=[],this.courseWindKey=a;for(let o of s?.winds||[]){let l=o.type==="thermal"||o.type==="updraft",c=o.start?Math.hypot(o.end.x-o.start.x,o.end.z-o.start.z):30,u=vh(o.type,{radius:l?o.radius*.6:4,height:25,length:c});u.position.set(o.x,l?o.ceiling-22:o.start?(o.start.y+o.end.y)/2:o.y+o.height/2,o.z),!l&&o.direction&&(u.rotation.y=Math.atan2(o.direction.x,o.direction.z)),this.scene.add(u),this.courseWinds.push({data:o,group:u})}}}updateWorldWinds(e,t){for(let{data:n,group:s}of this.winds){let r=Ma(n,e);s.visible=r&&(n.type!=="crosswind"||Math.sin(e.elapsed/n.period*Math.PI*2+e.seed%1009/1009*Math.PI*2)>0),r&&s.userData.update?.(this.reduced?0:t)}}rotate(e,t){this.manualYaw-=e,this.pitch=Ys.clamp(this.pitch+t,.23,1.15)}zoom(e){this.distance=Ys.clamp(this.distance+e,16,52)}recenter({immediate:e=!1}={}){this.manualYaw=0,this.pitch=.63,this.distance=26,e&&(this.yaw=0,this.cameraSnapPending=!0)}inspectCamera(e){let t=new Dt(e.x,e.y+2,e.z),n=t.clone().project(this.camera),s=this.camera.position.distanceTo(t),r=this.foreground?.inspect(this.camera,e),a=r?.hits||bh(this.camera,e,this.collidables),o=a[0],l=xe.islands.find(u=>Math.hypot(this.camera.position.x-u.x,this.camera.position.z-u.z)<u.radius),c=u=>({x:u.x,y:u.y,z:u.z});return{position:c(this.camera.position),target:c(this.target),near:this.camera.near,far:this.camera.far,fov:this.camera.fov,mode:this.menu?"menu":this.overhead?"overhead":"follow",manualYaw:this.manualYaw,yaw:this.yaw,pitch:this.pitch,distance:s,canvas:{width:this.canvas.width,height:this.canvas.height,cssWidth:this.canvas.clientWidth,cssHeight:this.canvas.clientHeight,pixelRatio:this.renderer.getPixelRatio()},playerNDC:c(n),playerInFrustum:Math.abs(n.x)<=1&&Math.abs(n.y)<=1&&Math.abs(n.z)<=1,platformUnderCamera:l?{id:l.id,surfaceY:l.y,clearance:this.camera.position.y-l.y}:null,occlusion:{blocked:!!o,rawBlocked:!!o,distance:o?.distance??null,point:o?c(o.point):null,object:o?o.object.name||o.object.type:null,sample:o?.sample??null,rawBlockerCount:a.length,treatment:r?.treatment??{method:"none",applied:!1},method:"Camera-to-player head, torso and hips rays against visible island and independent station/camp meshes. Raw geometry hits remain blocked even while locally faded. Excludes hidden LOD ancestry, instanced vegetation and translucent wind/cloud effects."}}}update(e,t,n,s){let r=e.player,a=dx(e),o=Math.hypot(r.vx||0,r.vz||0);this.pilot.group.position.set(r.x,r.y,r.z),this.pilot.group.rotation.y=Math.PI-(r.heading||0),r.grounded&&!this.wasGrounded&&(this.landingTime=.42),this.landingTime=Math.max(0,this.landingTime-t),this.wasGrounded=r.grounded,this.pilot.update(t,{grounded:r.grounded,gliding:r.gliding,speed:o,mode:this.landingTime>0?"land":r.gliding?"glide":r.grounded?o>.4?"run":"idle":"jump"});for(let{data:_,group:g}of this.relics)g.visible=!e.relics.includes(_.id),this.reduced||(g.rotation.y=n*.7),g.position.y=_.y+1.2+(this.reduced?0:Math.sin(n*1.5+_.x)*.25);this.updateWorldWinds(e,t);for(let{data:_,marker:g}of this.challenges){let p=yf(_,e);g.update(p.completed?null:e.activeChallenge===_.id&&e.challengeHint?e.challengeHint:p.entry,r)}this.surveyMarker.update(a.surveyTarget,r),this.updateCourse(e),this.routeLine&&(this.routeLine.visible=a.mainRouteVisible);for(let{data:_,group:g}of this.courseWinds)g.userData.update?.(this.reduced?0:t),_.type==="crosswind"&&(g.visible=Math.sin(e.elapsed/_.period*Math.PI*2+e.seed%1009/1009*Math.PI*2)>0);for(let{data:_,group:g}of this.hazards)if(g.userData.core){let p=Math.sin(e.elapsed/_.period*Math.PI*2+e.seed%19)>.15;g.userData.core.material.emissiveIntensity=p?2:.25,g.userData.core.rotation.y=n*.3}this.scene.fog.density=e.hazard==="fog"?.006:.0012/this.mapScale;let l=xe.islands.find(_=>Math.hypot(r.x-_.x,r.z-_.z)<_.radius);this.contactShadow.visible=!!l,l&&(this.contactShadow.position.set(r.x,l.y+.09,r.z),this.contactShadow.scale.setScalar(Math.max(.5,1-(r.y-l.y)*.01))),this.marker.visible=!!s&&a.mainRouteVisible&&!e.surveyHint,this.marker.visible&&(this.marker.position.set(s.x,s.y+.2,s.z),this.marker.rotation.y=n*.2);let c=new Dt(r.x,r.y+2,r.z);this.camera.updateMatrixWorld();for(let _ of this.islands)for(let g of _.children)g.isLOD&&g.update(this.camera);let u;if(this.menu)u=new Dt(82+Math.sin(n*.03)*10,74,112),this.target.set(-20,7,-62),this.camera.position.lerp(u,1-Math.exp(-t*2));else{this.yaw=this.manualYaw;let _=this.overhead?1.22:this.pitch,g=this.overhead?65:this.distance*(this.camera.aspect<.8?1.3:1);u=new Dt(Math.sin(this.yaw)*Math.cos(_)*g,Math.sin(_)*g,Math.cos(this.yaw)*Math.cos(_)*g).add(c);let p=new Dt(r.x+(r.vx||0)*.25,r.y+2,r.z+(r.vz||0)*.25),E=this.reduced||this.cameraSnapPending;this.target.lerp(p,E?1:1-Math.exp(-t*10));for(let y of xe.islands)Math.hypot(u.x-y.x,u.z-y.z)<y.radius+3&&(u.y=Math.max(u.y,y.y+8));this.ray.set(c,new Dt().subVectors(u,c).normalize()),this.ray.far=c.distanceTo(u);let v=this.ray.intersectObjects(this.collidables.filter(wh),!1).find(y=>y.distance>4);v&&u.lerp(c,Math.min(.7,1-(v.distance-2)/this.ray.far)),this.camera.position.lerp(u,E?1:1-Math.exp(-t*9)),this.cameraSnapPending=!1}this.camera.lookAt(this.target),this.camera.updateMatrixWorld();for(let _ of this.islands)for(let g of _.children)g.isLOD&&g.update(this.camera);this.foreground.update(this.camera,r,t,!this.menu);let h=xe.routes.find(_=>_.id===e.objective?.routeId),f=a.target;if(!f&&h){let _=0,g=1/0;h.waypoints.forEach((p,E)=>{let v=Math.hypot(p.x-r.x,p.z-r.z);v<g&&(g=v,_=E)}),f={...h.waypoints[Math.min(_+1,h.waypoints.length-1)],label:_+1>=h.waypoints.length-1?"\u76EE\u6A19\u5CF6":"\u98A8\u9053\u7BC0\u9EDE"}}let d=this.navTarget;if(d.style.display=f?"":"none",f){let _=new Dt(f.x,f.y,f.z),g=_.clone().project(this.camera),p=this.canvas.clientWidth,E=this.canvas.clientHeight,v=(g.x*.5+.5)*p,y=(-g.y*.5+.5)*E;g.z>1&&(v=p/2,y=E-170);let A=Math.min(260,p-24),T=Ys.clamp(v,A/2+8,p-A/2-8),R=Ys.clamp(y,100,E-180);d.style.width=`${A}px`,d.style.left=`${T}px`,d.style.top=`${R}px`;let I=a.label||f.label,S=this.navText;S.style.display="inline-block",S.style.maxWidth="100%",S.style.whiteSpace="normal";let M=`${I} \xB7 ${Math.round(_.distanceTo(new Dt(r.x,r.y,r.z)))}m${f.heading?" \xB7 \u9806\u7BAD\u982D\u5165\u74B0":""}`;S.textContent!==M&&(S.textContent=M),this.navOcclusion.place(T,R)}this.sun.position.copy(c).add(new Dt(-70,110,45)),this.sun.target.position.copy(c),this.sun.target.updateMatrixWorld();for(let{label:_,data:g}of this.labels){let p=new Dt(g.x,g.y+14,g.z).project(this.camera),E=this.camera.position.distanceTo(new Dt(g.x,g.y,g.z));_.style.display=p.z<1&&p.z>-1&&Math.abs(p.x)<1.1&&Math.abs(p.y)<1.1&&E>35?"block":"none",_.style.left=`${(p.x*.5+.5)*this.canvas.clientWidth}px`,_.style.top=`${(-p.y*.5+.5)*this.canvas.clientHeight}px`,_.style.opacity=Math.max(.35,1-E/(750*this.mapScale))}this.renderer.render(this.scene,this.camera);let m=this.renderer.info;this.metrics={frames:this.metrics.frames+1,drawCalls:m.render.calls,triangles:m.render.triangles,geometries:m.memory.geometries,textures:m.memory.textures}}dispose(){window.removeEventListener("resize",this.resize),this.navOcclusion.dispose(),this.foreground.dispose(),this.scene.traverse(e=>{e.geometry?.dispose(),e.material&&(Array.isArray(e.material)?e.material:[e.material]).forEach(n=>n.dispose())}),this.renderer.dispose()}};var Dl=class{constructor(e,t){this.keys=new Set,this.axes={x:0,z:0},this.glide=!1,this.touchBrake=!1,this.brakePointer=null,this.enabled=!1,this.actions=t,this.listeners=[],this.disposed=!1,this.pointerCaptures=new Map,this.cameraPointer=null,this.cameraMousePointer=null,this.joyPointer=null;let n=(d,m,_,g)=>{d.addEventListener(m,_,g),this.listeners.push(()=>d.removeEventListener(m,_,g))};n(window,"keydown",d=>{if(!d.defaultPrevented){if(d.code==="Escape"){d.preventDefault(),d.repeat||t.pause();return}if(!/INPUT|SELECT|TEXTAREA/.test(d.target.tagName)&&["Space","ArrowUp","ArrowDown","ArrowLeft","ArrowRight","KeyW","KeyA","KeyS","KeyD","ShiftLeft","ShiftRight","KeyE","KeyC","KeyV","KeyH"].includes(d.code)){if(d.code==="Space"&&d.target.tagName==="BUTTON")return;d.preventDefault(),d.repeat||(d.code==="KeyH"&&t.help(),d.code==="KeyV"&&t.view(),d.code==="KeyC"&&t.recenter(),d.code==="KeyE"&&this.enabled&&t.interact(),d.code==="Space"&&this.enabled&&(this.glide=!0)),this.enabled&&this.keys.add(d.code)}}}),n(window,"keyup",d=>this.keys.delete(d.code)),n(window,"blur",()=>{this.clear(),t.blur()}),n(document,"visibilitychange",()=>{document.hidden&&(this.clear(),t.blur())}),n(e,"contextmenu",d=>d.preventDefault());let s=d=>Number.isInteger(d.buttons)&&d.buttons>=0,r=d=>{this.cameraMousePointer!==d.pointerId&&this.cameraPointer?.id!==d.pointerId||(this.cameraPointer=null,this.cameraMousePointer=null,this.releasePointer(e,d.pointerId))};n(e,"pointerdown",d=>{if(!(this.cameraPointer!==null||this.cameraMousePointer!==null)){if(d.pointerType==="mouse"&&s(d)){if(!d.buttons||!this.capturePointer(e,d.pointerId))return;this.cameraMousePointer=d.pointerId,d.buttons&2&&(this.cameraPointer={id:d.pointerId,x:d.clientX,y:d.clientY});return}if(d.button===2||d.pointerType==="touch"){if(!this.capturePointer(e,d.pointerId))return;this.cameraPointer={id:d.pointerId,x:d.clientX,y:d.clientY}}}}),n(e,"pointermove",d=>{if(this.cameraMousePointer===d.pointerId){if(!s(d)||d.pointerType==="touch")return;if(!d.buttons)return r(d);if(!(d.buttons&2)){this.cameraPointer=null;return}if(!this.cameraPointer){this.cameraPointer={id:d.pointerId,x:d.clientX,y:d.clientY};return}}let m=this.cameraPointer;!m||m.id!==d.pointerId||(t.rotate((d.clientX-m.x)*.005,(d.clientY-m.y)*.004),m.x=d.clientX,m.y=d.clientY)}),n(e,"pointerup",r),n(e,"pointercancel",r),n(e,"lostpointercapture",r),n(e,"wheel",d=>{d.preventDefault(),t.zoom(d.deltaY*.02)},{passive:!1});let a=document.querySelector("#joystick"),o=document.querySelector("#stick"),l=d=>{if(this.joyPointer!==d.pointerId||!this.enabled)return;let m=a.getBoundingClientRect(),_=d.clientX-m.left-m.width/2,g=d.clientY-m.top-m.height/2,p=Math.hypot(_,g),E=Math.min(p,m.width*.32),v=p?_/p*E:0,y=p?g/p*E:0;this.axes={x:v/(m.width*.32),z:y/(m.height*.32)},o.style.transform=`translate(${v}px,${y}px)`};n(a,"pointerdown",d=>{d.preventDefault(),this.joyPointer===null&&this.capturePointer(a,d.pointerId)&&(this.joyPointer=d.pointerId,l(d))}),n(a,"pointermove",l);let c=d=>{this.joyPointer===d.pointerId&&(this.joyPointer=null,this.axes={x:0,z:0},o.style.transform="",this.releasePointer(a,d.pointerId))};n(a,"pointerup",c),n(a,"pointercancel",c),n(a,"lostpointercapture",c);let u=document.querySelector("#touch-glide");n(u,"pointerdown",d=>{d.preventDefault(),this.enabled&&(this.glide=!0)});let h=document.querySelector("#touch-brake");n(h,"pointerdown",d=>{if(d.preventDefault(),this.enabled&&this.brakePointer===null){if(!this.capturePointer(h,d.pointerId))return;this.brakePointer=d.pointerId,this.touchBrake=!0}});let f=d=>{this.brakePointer===d.pointerId&&(this.brakePointer=null,this.touchBrake=!1,this.releasePointer(h,d.pointerId))};for(let d of["pointerup","pointercancel","lostpointercapture"])n(h,d,f);n(document.querySelector("#touch-reset"),"click",t.recenter)}capturePointer(e,t){try{return e.setPointerCapture(t),this.pointerCaptures.set(e,t),!0}catch{return!1}}releasePointer(e,t){this.pointerCaptures.get(e)===t&&this.pointerCaptures.delete(e);try{e.hasPointerCapture(t)&&e.releasePointerCapture(t)}catch{}}read(e=0){if(!this.enabled)return{x:0,z:0,brake:!1,glide:!1};let t=(this.keys.has("KeyD")||this.keys.has("ArrowRight")?1:0)-(this.keys.has("KeyA")||this.keys.has("ArrowLeft")?1:0)+this.axes.x,n=(this.keys.has("KeyS")||this.keys.has("ArrowDown")?1:0)-(this.keys.has("KeyW")||this.keys.has("ArrowUp")?1:0)+this.axes.z,s=Math.max(1,Math.hypot(t,n)),r={x:(t*Math.cos(e)+n*Math.sin(e))/s,z:(n*Math.cos(e)-t*Math.sin(e))/s,brake:this.touchBrake||this.keys.has("ShiftLeft")||this.keys.has("ShiftRight"),glide:this.glide};return this.glide=!1,r}clear(){let e=[...this.pointerCaptures];this.pointerCaptures.clear(),this.keys.clear(),this.glide=!1,this.axes={x:0,z:0},this.touchBrake=!1,this.brakePointer=null,this.joyPointer=null,this.cameraPointer=null,this.cameraMousePointer=null,document.querySelector("#stick").style.transform="";for(let[t,n]of e)this.releasePointer(t,n)}setEnabled(e){this.enabled=e,e||this.clear()}dispose(){this.disposed||(this.disposed=!0,this.listeners.forEach(e=>e()),this.listeners.length=0,this.clear())}};var mx=Object.freeze({glide:{notes:[392,587.33,783.99],duration:.3,type:"triangle",gain:.18},tailwind:{notes:[293.66,440,587.33],duration:.45,type:"sine",gain:.13},energy:{notes:[220,196],duration:.16,type:"triangle",gain:.13},land:{notes:[98,146.83,196],duration:.22,type:"sine",gain:.22},stall:{notes:[293.66,220,146.83],duration:.2,type:"triangle",gain:.15},unlock:{notes:[293.66,369.99,440,587.33,739.99],duration:.19,type:"sine",gain:.2},ui:{notes:[587.33],duration:.07,type:"sine",gain:.09},relic:{notes:[440,587.33,880],duration:.15,type:"sine",gain:.17},finish:{notes:[293.66,369.99,440,587.33,739.99,880],duration:.25,type:"sine",gain:.2}}),gx={deploy:"glide",sail:"glide",open:"glide",wind:"tailwind",low:"energy",lowEnergy:"energy",exhausted:"energy",landing:"land",fail:"stall",respawn:"stall",station:"unlock",interact:"ui",collect:"relic",complete:"finish"},os=(i,e,t)=>Math.min(t,Math.max(e,Number.isFinite(i)?i:e)),Ul=class{constructor(){this.context=null,this.musicVolume=.55,this.sfxVolume=.7,this.paused=!1,this.active=new Set,this.lastEvent=new Map,this.musicTime=0,this.nextNote=0,this.noteIndex=0,this.windFilter=null,this.windGain=null,this.disposed=!1,this.sampleBuffers=new Map,this.sampleFailed=!1,this.stats={peakVoices:0,events:0,maxVoices:20}}async unlock(){if(this.disposed)return!1;let e=globalThis.AudioContext||globalThis.webkitAudioContext;if(!e)return!1;if(!this.context){this.context=new e;let t=this.context;this.master=t.createGain(),this.master.gain.value=.6,this.master.connect(t.destination),this.musicBus=t.createGain(),this.sfxBus=t.createGain(),this.musicBus.gain.value=this.musicVolume,this.sfxBus.gain.value=this.sfxVolume,this.musicBus.connect(this.master),this.sfxBus.connect(this.master);let n=t.sampleRate*4,s=t.createBuffer(1,n,t.sampleRate),r=s.getChannelData(0),a=72429,o=0;for(let l=0;l<n;l++){a=Math.imul(a,1664525)+1013904223>>>0;let c=a/4294967296*2-1;o=.985*o+.015*c,r[l]=o*4*Math.min(1,l/512,(n-1-l)/512)}this.air=t.createBufferSource(),this.air.buffer=s,this.air.loop=!0,this.windFilter=t.createBiquadFilter(),this.windFilter.type="lowpass",this.windFilter.frequency.value=450,this.windGain=t.createGain(),this.windGain.gain.value=.12,this.air.connect(this.windFilter),this.windFilter.connect(this.windGain),this.windGain.connect(this.musicBus),this.air.start(),this.loadSamples()}return!this.paused&&this.context.state==="suspended"&&await this.context.resume(),this.context.state==="running"}async loadSamples(){try{await Promise.all(["glide","land","stall","unlock","ui","relic"].map(async e=>{let t=await fetch(new URL(`./assets/audio/${e}.wav`,document.baseURI));if(!t.ok)throw new Error(`audio ${e}: ${t.status}`);let n=await this.context.decodeAudioData(await t.arrayBuffer());this.disposed||this.sampleBuffers.set(e,n)}))}catch{this.sampleFailed=!0}}setVolumes({music:e=this.musicVolume,sfx:t=this.sfxVolume}={}){if(this.musicVolume=os(Number(e),0,1),this.sfxVolume=os(Number(t),0,1),this.context){let n=this.context.currentTime;this.musicBus.gain.setTargetAtTime(this.musicVolume,n,.035),this.sfxBus.gain.setTargetAtTime(this.sfxVolume,n,.035)}}setPaused(e){this.paused=!!e,!(!this.context||this.disposed)&&(this.paused?this.context.suspend().catch(()=>{}):this.context.state==="suspended"&&(this.nextNote=this.context.currentTime+.1,this.context.resume().catch(()=>{})))}register(e){if(this.active.size>=this.stats.maxVoices){let t=this.active.values().next().value;try{t.stop()}catch{}this.active.delete(t)}this.active.add(e),this.stats.peakVoices=Math.max(this.stats.peakVoices,this.active.size),e.onended=()=>{this.active.delete(e);try{e.disconnect()}catch{}}}tone(e,t,n,s,r,a){let o=this.context,l=o.createOscillator(),c=o.createGain();l.type=s,l.frequency.setValueAtTime(e,t),c.gain.setValueAtTime(1e-4,t),c.gain.exponentialRampToValueAtTime(Math.max(1e-4,r),t+.015),c.gain.exponentialRampToValueAtTime(1e-4,t+n),l.connect(c),c.connect(a),this.register(l);let u=l.onended;l.onended=()=>{u(),c.disconnect()},l.start(t),l.stop(t+n+.02)}play(e){if(!this.context||this.context.state!=="running"||this.paused||this.disposed)return;let t=gx[e]||e,n=mx[t];if(!n)return;let s=this.context.currentTime,r=this.lastEvent.get(t)??-1/0,a=t==="energy"?1.6:t==="tailwind"?1:.08;if(s-r<a)return;this.lastEvent.set(t,s),this.stats.events++;let o=this.sampleBuffers.get(t);if(o){let l=this.context.createBufferSource(),c=this.context.createGain();l.buffer=o,c.gain.value=.6,l.connect(c),c.connect(this.sfxBus),this.register(l);let u=l.onended;l.onended=()=>{u(),c.disconnect()},l.start();return}n.notes.forEach((l,c)=>this.tone(l,s+c*n.duration*.58,n.duration,n.type,n.gain,this.sfxBus))}update({speed:e=0,energy:t=100,wind:n=0,dt:s=1/60}={}){if(!this.context||this.context.state!=="running"||this.paused||this.disposed)return;let r=this.context,a=r.currentTime,o=typeof n=="number"?n:n?1:0;this.windFilter.frequency.setTargetAtTime(360+os(e,0,30)*28+os(o,0,2)*190,a,.2),this.windGain.gain.setTargetAtTime(.07+os(e,0,30)*.007+os(o,0,2)*.07,a,.2),t<18&&t>0&&this.play("energy");let l=[293.66,0,440,369.99,587.33,0,440,0,329.63,0,493.88,440,369.99,0,293.66,0];if(this.nextNote<a-.5&&(this.nextNote=a+.06),this.nextNote<=a+.13){let c=this.noteIndex%l.length,u=l[c];u&&this.tone(u,this.nextNote,1.75,"sine",.065,this.musicBus),c%4===0&&this.tone(c<8?146.83:164.81,this.nextNote,3.3,"triangle",.028,this.musicBus),this.nextNote+=.8,this.noteIndex++}this.musicTime+=os(s,0,.1)}async dispose(){if(!this.disposed){this.disposed=!0;for(let e of this.active)try{e.stop(),e.disconnect()}catch{}if(this.active.clear(),this.air)try{this.air.stop(),this.air.disconnect()}catch{}this.sampleBuffers.clear(),this.context&&this.context.state!=="closed"&&await this.context.close(),this.context=null}}};var xf=i=>{if(i===null||typeof i!="object")return!1;let e=Object.getPrototypeOf(i);return e===Object.prototype||e===null},Nl=class{constructor(e){this.handlers=e,this.ready=!1,this.currentState="ready",this.session=new URLSearchParams(location.search).get("session"),this.embedded=window.parent!==window&&!!this.session,this.listener=t=>this.receive(t),window.addEventListener("message",this.listener)}send(e,t={}){this.embedded&&window.parent.postMessage({protocol:"stteak-game",version:1,sessionId:this.session,type:e,payload:t},location.origin)}setReady(){this.ready=!0,this.send("game:ready",{capabilities:["pause","resume","restart","keyboard","touch","local-save"]}),this.state(this.currentState)}state(e){this.currentState=e,this.send("game:state",{state:e})}receive(e){let t=e.data;if(!(!this.embedded||e.source!==window.parent||e.origin!==location.origin||!xf(t)||t.protocol!=="stteak-game"||t.version!==1||t.sessionId!==this.session||!xf(t.payload))){if(t.type==="host:init"){t.payload.gameId==="aetherwake"&&typeof t.payload.title=="string"&&this.ready&&this.setReady();return}!["host:start","host:pause","host:resume","host:restart"].includes(t.type)||Object.keys(t.payload).length||this.ready&&this.handlers[t.type]?.()}}dispose(){window.removeEventListener("message",this.listener)}};var Fl={id:"aetherwake-route-save-20261028-01",version:"1.0.0-rc.7-input.2-continuity.2-route.1",stage:"candidate",date:"2026-10-28"};var Pe=i=>document.querySelector(i),Ft=(i,e=!0)=>Pe(i).classList.toggle("hidden",!e),nt=(i,e)=>{Pe(i).textContent!==String(e)&&(Pe(i).textContent=e)},zl=i=>`${String(Math.floor(i/60)).padStart(2,"0")}:${String(Math.floor(i%60)).padStart(2,"0")}`;function vf(i){let e=[];return i.minSpeed&&e.push(`\u901F\u5EA6 \u2265${i.minSpeed}m/s`),i.maxSpeed&&e.push(`\u901F\u5EA6 \u2264${i.maxSpeed}m/s`),i.minEnergy&&e.push(`\u80FD\u91CF \u2265${i.minEnergy}%`),i.maxVerticalSpeed&&e.push(`\u5347\u964D \u2264${i.maxVerticalSpeed}m/s`),i.heading&&e.push("\u9806\u74B0\u4E0A\u7BAD\u982D\u901A\u904E"),e.join(" \xB7 ")}var en=i=>String(i).replace(/[&<>"']/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[e]),Et,Vn,ve,Ze,oi,Ct,_t,wf=null,ir="turn",yt=!1,fn="",Qs=null,Mf=0,ls=0,Sf="",sr=!1,Ah,tr=0,kl=performance.now(),Th=0,ma=new Ea,Ol=[],Tf=0,Af=0,Rf=0;function Qt(i){nt("#toast",i),Pe("#toast").classList.add("visible"),clearTimeout(Mf),Mf=setTimeout(()=>Pe("#toast").classList.remove("visible"),4200)}function Cf(){return wf?"\u9060\u5F81\u5B8C\u6210 / \u672C\u6B21\u4FDD\u5B58\u672A\u5B8C\u6210":"\u9060\u5F81\u5B8C\u6210 / \u500B\u4EBA\u6210\u7E3E\u5DF2\u4FDD\u5B58"}function Rh(i){wf=i||null,Ft("#storage-warning",!!i),i&&nt("#storage-warning",i),fn==="result"&&nt("#modal-kicker",Cf())}function vn(){let i=ma.save({...ve.saveData(),settings:Ct});return Rh(i.warning),_t=ma.load().save,i}function er(){Et.setQuality(Ct.quality),Et.reduced=Ct.reducedMotion,Et.overhead=Ct.camera==="overhead",Ze.setVolumes({music:Ct.music,sfx:Ct.sfx}),nt("#camera",Et.overhead?"\u8FFD\u96A8 V":"\u4FEF\u77B0 V")}function _x(){for(let i of document.querySelectorAll(".module"))i.setAttribute("aria-pressed",String(i.dataset.module===ir))}function yx(i){ir=i,_x(),Ze?.play("ui")}function Ti(i=!1){if(clearTimeout(ls),hs(!1),Ze.unlock(),i?(ve=new ps({save:_t}),ir=_t.module):(ve.persisted=_t,ve.reset({seed:Number(Pe("#seed").value)||2718,module:ir})),ve.status==="complete"){yt=!0,Et.menu=!1,Et.recenter({immediate:!0}),Vn.setEnabled(!1),Ft("#landing",!1),Ft("#flight-hud"),Ai(),nr();return}ve.launch(),yt=!0,Et.menu=!1,Et.recenter({immediate:!0}),tr=0,kl=performance.now(),Vn.setEnabled(!0),Ft("#landing",!1),Ft("#flight-hud"),Ze.setPaused(!1),oi.state("running"),Ft("#guide",!sr),Pe("#world").focus(),vn(),Ai(),Qt(i?"\u5DF2\u56DE\u5230\u4E0A\u6B21\u7684\u5B89\u5168\u843D\u9EDE\u3002":matchMedia("(pointer: coarse)").matches?"\u5148\u9EDE\u5C55\u5E06\u8D77\u8DF3\uFF0C\u518D\u7528\u5DE6\u6416\u687F\u6CBF\u5730\u5716\u98A8\u7DDA\u524D\u9032\u3002":"\u5148\u6309 Space \u8D77\u8DF3\uFF0C\u518D\u6CBF\u5730\u5716\u4E0A\u7684\u98A8\u7DDA\u524D\u9032\u3002")}function cs(i="pause"){clearTimeout(ls),!(!yt||ve.status==="complete")&&(ve.setPaused(!0),Vn.setEnabled(!1),i==="dialogue"?ls=setTimeout(()=>Ze.setPaused(!0),1200):Ze.setPaused(!0),tr=0,oi.state("paused"),(i==="pause"||i==="blur")&&ga(i==="blur"?"\u822A\u7A0B\u5DF2\u5B89\u5168\u66AB\u505C":"\u5728\u98A8\u505C\u4E0B\u4F86\u7684\u5730\u65B9"))}function ci(){clearTimeout(ls),!(!yt||ve.status==="complete")&&(hs(!1),ve.setPaused(!1),Vn.setEnabled(!0),Ze.unlock(),Ze.setPaused(!1),kl=performance.now(),tr=0,oi.state("running"),Pe("#world").focus())}function bf(){if(fn)return If();if(!yt)return li();ve.status==="paused"?ci():cs()}function If(){if(fn){if(fn==="erase")return Ih();if(fn==="settings")return li();if(fn==="courses"||fn==="journal")return yt&&ve.status==="complete"?nr():li();if(fn==="restart")return ga();if(fn==="result"){Hl(),Pe("#start").focus();return}if(fn==="help")return yt?ve.status==="complete"?nr():ga():hs();if(yt&&ve.status!=="complete")return ci();hs()}}function hi(i,e,t,n=[],s="AETHERWAKE / \u822A\u884C\u8A8C"){fn||(Qs=document.activeElement),fn=i,nt("#modal-kicker",s),nt("#modal-title",e),Pe("#modal").append(Pe("#storage-warning")),Pe("#modal-body").innerHTML=t,Pe("#modal-actions").replaceChildren();for(let r of n){let a=document.createElement("button");a.textContent=r.label,a.disabled=!!r.disabled,r.primary&&(a.className="primary"),a.onclick=()=>{Ze.play("ui"),r.action()},Pe("#modal-actions").append(a)}Ft("#modal"),requestAnimationFrame(()=>{(i==="courses"?Pe("#close-modal"):Pe("#modal-actions button")||Pe("#close-modal")).focus(),i==="courses"&&(Pe(".modal-panel").scrollTop=0)})}function hs(i=!0){Ft("#modal",!1),Pe("#toast").after(Pe("#storage-warning")),fn="",i&&(Qs?.isConnected&&Qs!==document.body&&!Qs.closest(".hidden")?Qs:Pe(yt?"#world":"#start")).focus(),Qs=null}function Pf(){return`<div class="settings-grid"><label>\u74B0\u5883\u8207\u97F3\u6A02 <input id="music-volume" type="range" min="0" max="1" step="0.05" value="${Ct.music}"></label><label>\u52D5\u4F5C\u97F3\u6548 <input id="sfx-volume" type="range" min="0" max="1" step="0.05" value="${Ct.sfx}"></label><label>\u756B\u8CEA <select id="quality"><option value="auto">\u6A19\u6E96 \xB7 1.5\xD7 DPR</option><option value="low">\u7BC0\u80FD \xB7 \u95DC\u9589\u5373\u6642\u9670\u5F71</option><option value="high">\u7CBE\u7DFB \xB7 \u5373\u6642\u9670\u5F71</option></select></label><label>\u93E1\u982D <select id="camera-setting"><option value="follow">\u53D7\u63A7\u8FFD\u96A8</option><option value="overhead">\u4FEF\u77B0\u822A\u7DDA</option></select></label><label class="check"><input id="reduced-motion" type="checkbox" ${Ct.reducedMotion?"checked":""}>\u6E1B\u5C11\u52D5\u614B\uFF0F\u8996\u5DEE</label><label class="check"><input id="assist" type="checkbox" ${ve.assist?"checked":""}>\u98A8\u7DDA\u8F14\u52A9\uFF08\u7368\u7ACB\u6A19\u8A18\u6210\u7E3E\uFF09</label></div>`}function Lf(){Pe("#quality").value=Ct.quality,Pe("#camera-setting").value=Ct.camera;for(let[i,e]of[["music-volume","music"],["sfx-volume","sfx"]])Pe("#"+i).oninput=t=>{Ct[e]=Number(t.target.value),Ze.unlock(),er(),vn()};Pe("#quality").onchange=i=>{Ct.quality=i.target.value,er(),vn()},Pe("#camera-setting").onchange=i=>{Ct.camera=i.target.value,er(),vn()},Pe("#reduced-motion").onchange=i=>{Ct.reducedMotion=i.target.checked,er(),vn()},Pe("#assist").onchange=i=>{ve.setAssist(i.target.checked),vn()}}function ga(i="\u5728\u98A8\u505C\u4E0B\u4F86\u7684\u5730\u65B9"){hi("pause",i,`<p>\u98DB\u884C\u3001\u5E06\u80FD\u91CF\u8207\u8A08\u6642\u5DF2\u51CD\u7D50\u3002\u5B89\u5168\u843D\u5CF6\u8207\u53D6\u5F97\u788E\u7247\u6642\u6703\u81EA\u52D5\u5132\u5B58\uFF1B\u91CD\u65B0\u8F09\u5165\u6703\u56DE\u5230\u6700\u5F8C\u7684\u5B89\u5168\u5CF6\u3002</p>${Pf()}`,[{label:"\u7E7C\u7E8C\u822A\u7A0B",primary:!0,action:ci},{label:"\u64CD\u4F5C\u8207\u822A\u884C\u8A8C",action:li},{label:"\u9078\u64C7\u6E2C\u98A8\u9060\u5F81",action:Ch},{label:"\u91CD\u65B0\u9060\u5F81",action:xx},{label:"\u8FD4\u56DE\u6E96\u5099\u756B\u9762",action:Hl}],"\u2161 / \u822A\u7A0B\u66AB\u505C"),Lf()}function xx(){hi("restart","\u91CD\u65B0\u8FCE\u63A5\u9019\u9663\u98A8\uFF1F","<p>\u672C\u8D9F\u89C0\u6E2C\u53F0\u3001\u4E3B\u7DDA\u89C0\u6E2C\u8207\u6642\u9593\u6703\u91CD\u65B0\u8A08\u7B97\u3002\u6587\u660E\u788E\u7247\u3001\u5DF2\u4EA4\u4ED8\u7684\u6E2C\u98A8\u968E\u6BB5\u3001\u5DF2\u767C\u73FE\u5CF6\u5DBC\u8207\u500B\u4EBA\u6210\u7E3E\u4FDD\u7559\u3002\u82E5\u8981\u63DB\u6A21\u7D44\u6216\u7A2E\u5B50\uFF0C\u8ACB\u8FD4\u56DE\u6E96\u5099\u756B\u9762\u3002</p>",[{label:"\u91CD\u65B0\u9060\u5F81",primary:!0,action:()=>Ti(!1)},{label:"\u4FDD\u7559\u822A\u7A0B",action:()=>ga()}])}function Hl(){clearTimeout(ls),yt&&ve.status!=="complete"&&(cs("silent"),vn()),yt=!1,Vn.setEnabled(!1),Ze.setPaused(!0),Et.menu=!0,hs(),Ft("#flight-hud",!1),Ft("#landing"),Ft("#continue",_t.elapsed>0),nt("#continue",_t.completed?"\u67E5\u770B\u7D50\u7B97\uFF0F\u7E7C\u7E8C\u63A2\u7D22":"\u7E7C\u7E8C\u4E0A\u6B21\u822A\u7A0B"),oi.state("ready"),nt("#objective","\u8B93\u6C89\u7761\u7684\u661F\u5716\u518D\u6B21\u767C\u5149"),nt("#objective-sub","\u4F9D\u5E8F\u4FEE\u5FA9\u4E09\u5EA7\u89C0\u6E2C\u53F0\uFF0C\u8FD4\u56DE\u71DF\u5730\u3002")}function li(){yt&&ve.status==="running"&&cs("silent"),hi("help","\u8B80\u61C2\u98A8\uFF0C\u627E\u5230\u56DE\u5BB6\u7684\u8DEF",'<p class="modal-note">\u4E09\u6BB5\u4E3B\u7DDA\u5206\u5225\u662F\u6E2C\u98A8\u6821\u6E96\u3001\u7A69\u5B9A\u8CA8\u904B\u3001\u9727\u4E2D\u5B9A\u4F4D\u3002\u4F9D\u5E8F\u901A\u904E\u5E36\u689D\u4EF6\u7684\u89C0\u6E2C\u74B0\uFF0C\u518D\u843D\u5230\u8606\u5149\u5EAD \u2192 \u96F7\u96F2\u5929\u6587\u53F0 \u2192 \u6B78\u661F\u81FA\u6309 E \u4EA4\u4ED8\uFF0C\u6700\u5F8C\u8FD4\u56DE\u6668\u98A8\u71DF\u5730\u7D50\u7B97\u3002\u74B0\u4E0A\u7BAD\u982D\u8868\u793A\u9032\u5165\u65B9\u5411\uFF0C\u76F4\u67F1\u8868\u793A\u4EA4\u4ED8\u9EDE\u3002</p><div class="control-table"><b>WASD / \u65B9\u5411\u9375</b><span>\u4F9D\u756B\u9762\u65B9\u5411\u79FB\u52D5\u3002\u7A7A\u4E2D\u653E\u958B\u6703\u4FDD\u6301\u6ED1\u7FD4\u3002</span><b>Space / \u5C55\u5E06</b><span>\u5730\u9762\u8D77\u8DF3\uFF0C\u7A7A\u4E2D\u5207\u63DB\u5C55\u5E06\u3002\u4E0D\u5FC5\u4E00\u76F4\u6309\u4F4F\u3002</span><b>Shift / \u6E1B\u901F</b><span>\u6309\u4F4F\u6536\u5E06\u4E0B\u964D\u3002\u62B5\u5CF6\u4E0A\u7A7A\u6642\u6E1B\u901F\uFF0C\u843D\u5730\u5F8C\u653E\u958B\u3002</span><b>E / \u4E92\u52D5\u9375</b><span>\u4EA4\u4ED8\u89C0\u6E2C\u8CC7\u6599\uFF0F\u6E2C\u98A8\u968E\u6BB5\uFF0C\u6216\u56DE\u71DF\u5730\u7D50\u7B97\u3002</span><b>\u53F3\u9375\u62D6\u66F3 / \u6EFE\u8F2A</b><span>\u8ABF\u6574\u93E1\u982D\uFF1BC \u56DE\u6B63\uFF0CV \u5207\u63DB\u4FEF\u77B0\u3002</span><b>\u624B\u6A5F</b><span>\u5DE6\u5074\u6416\u687F\uFF0B\u53F3\u5074\u5C55\u5E06\uFF0F\u6E1B\u901F\u53EF\u540C\u6642\u64CD\u4F5C\uFF1B\u7A7A\u767D\u5834\u666F\u62D6\u52D5\u93E1\u982D\u3002</span></div><h3>\u8B80\u98A8\u8207\u9078\u8DEF</h3><ul><li>\u9577\u5E36\uFF0B\u7BAD\u982D\uFF1D\u9806\u98A8\uFF0C\u6301\u7E8C\u88DC\u80FD\u4E26\u52A0\u901F\uFF1B\u87BA\u65CB\u74B0\uFF1D\u71B1\u6D41\uFF0C\u62AC\u5347\u9AD8\u5EA6\u3002</li><li>\u6A6B\u5411\u64FA\u52D5\u6A19\u8A18\uFF1D\u9593\u6B47\u5074\u98A8\uFF1B\u96F7\u5FC3\u8108\u52D5\u6642\u7E5E\u884C\u5916\u7DE3\uFF0C\u9727\u4E2D\u53C3\u8003\u5CF6\u540D\u548C\u5730\u5716\u3002</li><li>\u5B89\u5168\u98A8\u9053\u8F03\u5BEC\uFF0C\u9014\u7D93\u88DC\u7D66\u5CF6\uFF1B\u7A7F\u96F2\u6377\u5F91\u8DEF\u77ED\uFF0C\u9700\u8981\u66F4\u7CBE\u6E96\u7684\u65B9\u5411\u4FEE\u6B63\u3002</li><li>\u6C92\u6709\u80FD\u91CF\u6216\u6389\u843D\u6642\u56DE\u6700\u5F8C\u5B89\u5168\u5CF6\uFF0C\u52A0\u8A08 8 \u79D2\uFF0C\u788E\u7247\u4FDD\u7559\u3002\u9023\u7E8C\u4E09\u6B21\u5931\u901F\u6703\u63D0\u793A\u53EF\u958B\u555F\u8F14\u52A9\u3002</li><li>\u788E\u7247\u9760\u8FD1\u81EA\u52D5\u62FE\u53D6\uFF0C\u822A\u884C\u8A8C\u63D0\u4F9B\u5730\u6A19\u7DDA\u7D22\u3002\u5148\u5728\u5B89\u5168\u5730\u9762\u5F9E\u300C\u516D\u8D9F\u6E2C\u98A8\u9060\u5F81\u300D\u9078\u8AB2\uFF0C\u6CBF\u5B89\u5168\u63A5\u99C1\u98A8\u6A19\u5230\u91D1\u74B0\u958B\u59CB\u3002\u5B8C\u6210\u672C\u6BB5\u822A\u9580\u5F8C\u5230\u6307\u5B9A\u5CF6\u4E2D\u592E\u6309 E \u4EA4\u4ED8\uFF1B\u5DF2\u4EA4\u4ED8\u968E\u6BB5\u6C38\u4E45\u4FDD\u5B58\u3002\u9000\u51FA\u6703\u8FD4\u56DE\u6700\u5F8C\u5B89\u5168\u5CF6\uFF0C\u4E0D\u8A08\u5931\u901F\uFF0C\u53EA\u653E\u68C4\u672A\u4EA4\u4ED8\u6BB5\u3002</li></ul><h3>\u672C\u6A5F\u9032\u5EA6\u8207\u500B\u4EBA\u6210\u7E3E</h3><p>\u53EA\u6709\u9019\u500B\u700F\u89BD\u5668\u4FDD\u5B58\u9032\u5EA6\uFF0C\u6C92\u6709\u96F2\u7AEF\u540C\u6B65\u6216\u5168\u7403\u6392\u884C\u699C\u3002\u7A2E\u5B50\u53EF\u91CD\u73FE\u76F8\u540C\u98A8\u6CC1\uFF1B\u4ECA\u65E5\u98A8\u6CC1\u4EE5\u53F0\u5317\u65E5\u671F\u8A08\u7B97\u3002\u7D50\u7B97\u5206\u5225\u986F\u793A\u901F\u5EA6\u3001\u5E73\u7A69\u8207\u63A2\u7D22\u8A55\u7D1A\u3002</p>',[{label:yt?"\u56DE\u5230\u822A\u7A0B":"\u56DE\u5230\u6E96\u5099",primary:!0,action:()=>yt?ve.status==="complete"?nr():ci():hs()},{label:"\u6587\u660E\u788E\u7247",action:Df},{label:"\u516D\u8D9F\u6E2C\u98A8\u9060\u5F81",action:Ch},{label:"\u8A2D\u5B9A\u8207\u5B58\u6A94",action:Ih}])}function Ch(){yt&&ve.status==="running"&&cs("silent");let i=!yt||ve.player.grounded;hi("courses","\u5E36\u56DE\u4E0B\u4E00\u4EFD\u98A8\u7684\u7B54\u6848",`<p class="modal-note">${i?"\u5728\u5B89\u5168\u5730\u9762\u9078\u64C7\u4E00\u8D9F\u9060\u5F81\uFF0C\u518D\u6CBF\u5B89\u5168\u63A5\u99C1\u98A8\u6A19\u5230\u6307\u5B9A\u5CF6\u91D1\u74B0\u958B\u59CB\u3002":"\u8ACB\u5148\u5B89\u5168\u843D\u5CF6\uFF0C\u518D\u9078\u64C7\u9060\u5F81\uFF1B\u7A7A\u4E2D\u53EF\u5148\u95B1\u8B80\u5404\u8AB2\u7A0B\u3002"}\u5B8C\u6210\u4E00\u6BB5\u5F8C\u843D\u5CF6\u6309 E \u4EA4\u4ED8\uFF1B\u5DF2\u4EA4\u4ED8\u968E\u6BB5\u4FDD\u5B58\u3002\u9000\u51FA\u6703\u8FD4\u56DE\u6700\u5F8C\u5B89\u5168\u5CF6\uFF0C\u53EA\u653E\u68C4\u672A\u4EA4\u4ED8\u6BB5\u3002</p><div class="journal-list">${xe.challenges.map(e=>`<div><b>${en(e.name)} \xB7 ${ve.state.courseStages[e.id]||0}/${e.stages?.length||1} \u6BB5</b><p>${en(e.description)}<br>\u4E0B\u4E00\u51FA\u767C\u9EDE\uFF1A${en(Ot(ve.courseStage(e)?.fromIslandId||e.islandId).name)}${ve.state.completedChallenges.includes(e.id)?" \xB7 \u5DF2\u53D6\u5F97\u5B8C\u6210\u5FBD\u8A18":""}</p></div>`).join("")}</div>`,[{label:"\u81EA\u7531\u63A2\u7D22\uFF08\u4FDD\u7559\u9032\u5EA6\uFF09",primary:!0,action:()=>{yt||Ti(_t.elapsed>0),ve.status==="complete"&&(ve.status="paused",sr=!0),ci(),Ai()}},...xe.challenges.filter(e=>!ve.challenges.includes(e.id)).map(e=>({label:`\u6A19\u8A18 ${e.name}`,disabled:!i,action:()=>{yt||Ti(_t.elapsed>0),ve.trackChallenge(e.id)&&(ve.status==="complete"&&(ve.status="paused",sr=!0),ci(),Ai())}})),{label:"\u8FD4\u56DE\u822A\u884C\u8A8C",action:li}],"\u6E2C\u98A8\u9060\u5F81 / \u968E\u6BB5\u6C38\u4E45\u4FDD\u5B58")}function Ih(){hi("settings","\u8ABF\u6574\u4F60\u7684\u822A\u7A0B",`${Pf()}<h3>\u5B89\u5168\u4FDD\u5B58</h3><p>\u5B58\u6A94\u683C\u5F0F v3\uFF1B\u843D\u5CF6\u3001\u89C0\u6E2C\u6A23\u672C\u3001\u788E\u7247\u3001\u968E\u6BB5\u4EA4\u4ED8\u3001\u7D50\u7B97\u53CA\u8A2D\u5B9A\u8B8A\u66F4\u6642\u4FDD\u5B58\u3002\u820A\u7248\u77ED\u7A0B\u6210\u7E3E\u8207\u5FBD\u8A18\u4FDD\u7559\u5728\u6B77\u53F2\u7D00\u9304\uFF0C\u65B0\u822A\u7A0B\u7368\u7ACB\u8A08\u5206\u3002\u640D\u58DE\u5B58\u6A94\u4E0D\u6703\u8B93\u904A\u6232\u5361\u4F4F\uFF0C\u5132\u5B58\u5931\u6557\u6703\u660E\u78BA\u63D0\u793A\u3002</p>${vx()}`,[{label:"\u5B8C\u6210",primary:!0,action:()=>yt?ga():hs()},{label:"\u91CD\u8A2D\u5168\u90E8\u9032\u5EA6",action:()=>hi("erase","\u78BA\u5B9A\u6E05\u9664\u5168\u90E8\u672C\u6A5F\u9032\u5EA6\uFF1F","<p>\u9019\u6703\u6E05\u9664\u6587\u660E\u788E\u7247\u3001\u5CF6\u5DBC\u3001\u89C0\u6E2C\u53F0\u3001\u500B\u4EBA\u6210\u7E3E\u8207\u672C\u5C40 checkpoint\uFF0C\u7121\u6CD5\u5FA9\u539F\u3002\u97F3\u91CF\u8207\u756B\u9762\u504F\u597D\u4FDD\u7559\u3002</p>",[{label:"\u53D6\u6D88",primary:!0,action:Ih},{label:"\u6E05\u9664\u5168\u90E8\u9032\u5EA6",action:()=>{let i=ma.clearProgress();Rh(i.warning),_t=ma.load().save,ve=new ps({save:_t}),Hl(),Qt("\u672C\u6A5F\u9032\u5EA6\u5DF2\u91CD\u8A2D\u3002")}}])}]),Lf()}function vx(){let i=ve.persisted,e=Object.entries(i.legacyRecords||{}).map(([s,r])=>`${en(Mn.find(a=>a.id===s)?.name||s)} \xB7 ${zl(r.time)}${r.assisted?" \xB7 \u5DF2\u4F7F\u7528\u8F14\u52A9":""}`),t=Object.entries(i.legacyRouteRecords||{}).map(([s,r])=>`${en(xe.routes.find(a=>a.id===s)?.name||s)} \xB7 ${zl(r.time)}`),n=(i.legacyChallenges||[]).map(s=>en(xe.challenges.find(r=>r.id===s)?.name||s));return!e.length&&!t.length&&!n.length?"":`<h3>\u820A\u7248\u77ED\u7A0B\u7D00\u9304</h3><p>\u4EE5\u4E0B\u6210\u7E3E\u5C6C\u65BC\u6539\u7248\u524D\u822A\u7A0B\uFF0C\u7368\u7ACB\u4FDD\u7559\u3002</p>${e.length?`<p>${e.join("<br>")}</p>`:""}${t.length?`<p>${t.join("<br>")}</p>`:""}${n.length?`<p>\u820A\u5FBD\u8A18\uFF1A${n.join("\u3001")}</p>`:""}`}function Df(){let i=ve.relics;hi("journal","\u98A8\u7559\u4E0B\u7684\u822A\u4FE1",`<p>\u5DF2\u767C\u73FE ${i.length} / ${xe.relics.length}\u3002\u9760\u8FD1\u5404\u6D6E\u5CF6\u4E0A\u7684\u91D1\u8272\u7ACB\u9AD4\u788E\u7247\u5373\u53EF\u62FE\u53D6\u3002</p><div class="journal-list">${xe.relics.map((e,t)=>`<div><b><img src="${en(e.icon||`./assets/icons/${e.id}.svg`)}" width="24" height="24" alt=""> ${String(t+1).padStart(2,"0")} \xB7 ${i.includes(e.id)?en(e.name):"\u5C1A\u672A\u767C\u73FE"}</b><p>${i.includes(e.id)?en(e.text):en(Ot(e.islandId).name)+" \xB7 "+en(e.hint||"\u641C\u5C0B\u5CF6\u9762\u7684\u91D1\u8272\u5149\u8292\u3002")}</p></div>`).join("")}</div>`,[{label:"\u8FD4\u56DE\u822A\u884C\u8A8C",primary:!0,action:li}])}function Mx(i){cs("dialogue"),hi("dialogue",i.title,`<p class="modal-note">${en(i.text)}</p><p>\u9019\u6BB5\u6545\u4E8B\u53EF\u8DF3\u904E\uFF1B\u4E0B\u4E00\u500B\u822A\u6A19\u5DF2\u5728\u5730\u5716\u4E0A\u4EAE\u8D77\u3002</p>`,[{label:"\u7E7C\u7E8C\u822A\u7A0B / \u8DF3\u904E",primary:!0,action:ci}],"\u2727 / \u89C0\u6E2C\u53F0\u8A18\u9304")}function nr(i=!1){let e=ve.state,t=e.rating;Vn.setEnabled(!1),i||Ze.setPaused(!0),i&&(Ze.setPaused(!1),Ze.play("finish"),ls=setTimeout(()=>Ze.setPaused(!0),1800)),oi.state("paused"),hi("result",xe.ending.title,`<p>${en(xe.ending.text)}</p><div class="stats-grid"><div><strong>${t.speed}</strong><small>\u901F\u5EA6 \xB7 ${zl(e.elapsed)}</small></div><div><strong>${t.stability}</strong><small>\u5E73\u7A69 \xB7 ${e.stalls} \u6B21\u5931\u901F</small></div><div><strong>${t.exploration}</strong><small>\u63A2\u7D22 \xB7 ${e.relics.length}/${xe.relics.length}</small></div></div><p>\u6E2C\u98A8\u6311\u6230 ${e.challenges.length}/${xe.challenges.length} \xB7 \u672C\u5C40\u822A\u8DE1 ${Math.round(e.distance)}m \xB7 \u7A2E\u5B50 ${e.seed}<br>\u6A21\u7D44\uFF1A${Mn.find(n=>n.id===e.module).name} \xB7 ${t.assisted?"\u98A8\u7DDA\u8F14\u52A9\u5DF2\u4F7F\u7528\uFF0C\u6210\u7E3E\u7368\u7ACB\u6A19\u793A":"\u672A\u4F7F\u7528\u98A8\u7DDA\u8F14\u52A9"}</p><p class="modal-note">\u4E0B\u4E00\u8D9F\u76EE\u6A19\uFF1A${en(t.next)}</p>`,[{label:"\u518D\u98DB\u4E00\u8D9F",primary:!0,action:()=>Ti(!1)},{label:"\u7E7C\u7E8C\u63A2\u7D22",action:Ch},{label:"\u63DB\u6A21\u7D44\u8207\u98A8\u6CC1",action:Hl},{label:"\u8B80\u6587\u660E\u788E\u7247",action:Df}],Cf())}function Ef(){Ct.camera=Ct.camera==="overhead"?"follow":"overhead",er(),vn(),ve.status==="running"&&Pe("#world").focus(),Qt(Ct.camera==="overhead"?"\u4FEF\u77B0\u6A21\u5F0F \xB7 V \u8FD4\u56DE\u8FFD\u96A8":"\u8FFD\u96A8\u6A21\u5F0F \xB7 C \u56DE\u6B63\u93E1\u982D")}function Sx(){ve.state.trackedHint||ve.state.activeChallenge||(ve.setRouteStyle(ve.routeStyle==="safe"?"shortcut":"safe"),vn(),Ai(),ve.status==="running"&&Pe("#world").focus(),Qt(xe.routes.find(i=>i.id===ve.state.objective.routeId)?.description||"\u822A\u7DDA\u5DF2\u5207\u63DB"))}function Ai(){let i=ve.state,e=i.player,t=i.objective,n=xe.routes.find(h=>h.id===t.routeId),s=i.challengeHint||i.trackedHint||i.surveyHint,r=s||t,a=Math.round(Math.hypot(e.x-r.x,e.z-r.z)),o=matchMedia("(pointer: coarse)").matches,l=o?"\u5C55\u5E06\u9375":"Space",c=o?"\u6E1B\u901F\u9375":"Shift",u=o?"\u4E92\u52D5\u9375":"E";if(yt&&(nt("#objective",`${i.challengeHint||i.trackedHint?`\u6E2C\u98A8 ${s.stage}/${s.stageTotal} \xB7 `:i.activated.length<3?`${i.activated.length+1}/3 \xB7 `:"\u8FD4\u822A \xB7 "}${s?.stageName||s?.name||t.name}  ${a}m`),nt("#objective-sub",i.nearby?.canInteract?`\u5B89\u5168\u843D\u5730 \xB7 \u6309 ${u} ${i.activeChallenge?"\u4EA4\u4ED8\u672C\u968E\u6BB5":"\u555F\u52D5\u822A\u6A19"}`:e.grounded?`${l} \u8D77\u822A \xB7 ${i.surveyHint?"\u4F9D\u5E8F\u5B8C\u6210\u89C0\u6E2C\u74B0":"\u5730\u5716\u53EF\u5207\u63DB\u822A\u7DDA"}`:s?.landing?`\u62B5\u5CF6\u4E0A\u7A7A\u6309\u4F4F ${c} \u4E0B\u964D`:s?vf(s)||"\u7A7F\u904E\u524D\u65B9\u89C0\u6E2C\u74B0\uFF0C\u8A18\u9304\u98A8\u6CC1":`\u62B5\u5CF6\u4E0A\u7A7A\u6309\u4F4F ${c} \u4E0B\u964D`)),nt("#region",Ot(i.checkpoint).region+" / "+Ot(i.checkpoint).name),nt("#flight-mode",e.grounded?"\u5B89\u5168\u5730\u9762":e.braking?"\u6536\u5E06\u4E0B\u964D":e.gliding?"\u4E58\u98A8\u6ED1\u7FD4":`\u81EA\u7531\u843D\u9AD4 \xB7 ${l} \u5C55\u5E06`),nt("#altitude",`${Math.round(e.y)} m \u9AD8\u5EA6`),nt("#speed",`${Math.round(Math.hypot(e.vx,e.vz))} m/s`),nt("#clock",zl(i.elapsed)),nt("#flight-tip",o?"\u5DE6\u6416\u687F\u79FB\u52D5 \xB7 \u5C55\u5E06\u5207\u63DB \xB7 \u6309\u4F4F\u6E1B\u901F\u4E0B\u964D":"Space \u8D77\u8DF3\uFF0F\u5C55\u5E06\u3000\xB7\u3000Shift \u6536\u5E06\u6E1B\u901F\u3000\xB7\u3000E \u4E92\u52D5"),nt("#energy-value",`${Math.round(e.energy)}%`),Pe("#energy-bar").style.width=`${e.energy}%`,Pe(".energy-panel").classList.toggle("low",e.energy<22),nt("#wind-label",i.hazard==="thunder"?"\u26A1 \u96F7\u96F2 \xB7 \u5411\u5916\u7E5E\u884C":i.hazard==="fog"?"\u224B \u96F2\u9727 \xB7 \u770B\u822A\u6A19":i.wind.includes("thermal")?"\u2191 \u71B1\u6D41\u62AC\u5347":i.wind.includes("tailwind")?"\u2197 \u9806\u98A8\u88DC\u80FD":i.wind.includes("crosswind")?"\u2194 \u5074\u98A8\u4FEE\u6B63":"\u98A8\u5E36\u5916 \xB7 \u6301\u7E8C\u8017\u80FD"),nt("#station-count",`\u89C0\u6E2C\u53F0 ${i.activated.length} / 3`),nt("#relic-count",`\u788E\u7247 ${i.relics.length} / ${xe.relics.length}`),nt("#challenge-count",`\u6E2C\u98A8 ${i.challenges.length} / ${xe.challenges.length}`),nt("#route-label",i.activeChallenge?"\u6E2C\u98A8\u9060\u5F81\u822A\u9053":i.trackedHint?"\u5B89\u5168\u63A5\u99C1\u98A8\u9053":i.routeStyle==="safe"?"\u5B89\u5168\u98A8\u9053":"\u7A7F\u96F2\u6377\u5F91"),Pe("#route-toggle").disabled=!!i.trackedHint||!!i.activeChallenge,nt("#route-toggle",i.activeChallenge?"\u8DDF\u96A8\u672C\u6BB5\u822A\u9580":i.trackedHint?"\u63A5\u99C1\u4F7F\u7528\u5B89\u5168\u98A8\u9053":i.routeStyle==="safe"?"\u5207\u63DB\uFF1A\u6280\u5DE7\u6377\u5F91":"\u5207\u63DB\uFF1A\u5B89\u5168\u98A8\u9053"),Ft("#interact",!!i.nearby?.canInteract&&i.status==="running"),nt("#interact",i.activeChallenge?`${o?"":"E \xB7 "}\u4EA4\u4ED8\u672C\u968E\u6BB5`:i.activated.length===3?`${o?"":"E \xB7 "}\u8FD4\u56DE\u71DF\u5730\u7D50\u7B97`:`${o?"":"E \xB7 "}\u555F\u52D5\u89C0\u6E2C\u53F0`),Sf!==t.routeId&&(Et.setRoute(n),Sf=t.routeId),Ft("#course",!!s),Ft("#leave-course",!!i.activeChallenge||!!i.trackedHint),Ft("#guide",!sr&&!s),s){let h=s,f=i.activeChallenge?["crosswind","stability"].includes(xe.challenges.find(d=>d.id===i.activeChallenge)?.kind):i.activated.length===1;nt("#course-kicker",i.activeChallenge||i.trackedHint?"\u9078\u64C7\u6027\u6E2C\u98A8\u9060\u5F81":"\u4E3B\u7DDA\u89C0\u6E2C \xB7 \u4E0D\u9700\u505C\u7559\u7B49\u5F85"),nt("#course-title",h.transit?`\u5B89\u5168\u63A5\u99C1 ${h.transitStep}/${h.transitTotal}`:`${i.challengeHint||i.trackedHint?`${h.stageName} \xB7 `:"\u822A\u7DDA\u89C0\u6E2C \xB7 "}${h.entry?"\u524D\u5F80\u5165\u53E3":`${h.step}/${h.total}`}`),nt("#course-detail",`${e.grounded&&!h.landing?`${l} \u5C55\u5E06\u8D77\u822A\u3002`:""}${h.transit?`\u6CBF\u98A8\u6A19\u524D\u9032\uFF0C\u76EE\u6A19\u9AD8\u5EA6 ${Math.round(h.y)}m\u3002\u62B5\u5CF6\u5F8C\u9032\u91D1\u74B0\u3002`:h.entry?h.instruction:h.landing?`\u843D\u5230\u5CF6\u4E2D\u592E\uFF0C\u6309 ${u} \u4EA4\u4ED8\uFF1B\u5DF2\u5B8C\u6210\u968E\u6BB5\u4FDD\u7559\u3002`:`\u76EE\u6A19\u9AD8\u5EA6 ${Math.round(h.y)}m\uFF1B\u5782\u76F4\u901F\u5EA6 ${e.vy.toFixed(1)}m/s\u3002${vf(h)||"\u7A7F\u904E\u74B0\u4E2D\u592E"}\u3002`}${f&&!h.entry&&!h.transit?` \u5100\u5668\u7A69\u5B9A ${Math.round(i.cargoStability)}%\u3002`:""}`)}if(!sr){let h,f,d,m=Ot(t.islandId);e.grounded&&i.checkpoint===t.islandId?(h="03 \xB7 \u555F\u52D5\u822A\u6A19",f=i.activated.length===3?`\u56DE\u71DF\u5730\u4E2D\u592E\u6309 ${u}`:`\u9760\u8FD1\u89C0\u6E2C\u53F0\u6309 ${u}`,d="\u5B89\u5168\u843D\u5730\u5DF2\u4FDD\u5B58\u3002\u8D70\u5411\u5CF6\u4E2D\u592E\u7684\u91D1\u8272\u822A\u6A19\u5B8C\u6210\u9019\u6BB5\u822A\u7A0B\u3002"):!e.grounded&&!e.gliding?(h="\u98DB\u884C\u63D0\u793A \xB7 \u6536\u5E06\u4E2D",f=`\u6309 ${l} \u91CD\u65B0\u5C55\u5E06`,d=`\u76EE\u524D\u5728\u81EA\u7531\u843D\u9AD4\u3002${l} \u662F\u5207\u63DB\uFF0C\u4E0D\u9700\u8981\u4E00\u76F4\u6309\u4F4F\uFF1B\u5C55\u5E06\u5F8C\u98A8\u5E36\u624D\u6703\u62AC\u5347\u4F60\u3002`):!e.grounded&&a<75&&e.y<m.y+3?(h="\u98DB\u884C\u63D0\u793A \xB7 \u9AD8\u5EA6\u4E0D\u8DB3",f="\u5148\u62AC\u5347\uFF0C\u518D\u964D\u843D",d=`\u4FDD\u6301\u5C55\u5E06\uFF0C\u6CBF\u5CF6\u908A\u87BA\u65CB\u71B1\u6D41\u4E0A\u5347\u3002\u5148\u653E\u958B ${c}\uFF1B\u9AD8\u904E\u5CF6\u9762\u5F8C\u518D\u79FB\u5411\u4E2D\u592E\u3002`):!e.grounded&&a<m.radius-4&&e.y>=m.y+3?(h="02 \xB7 \u5B89\u5168\u843D\u5CF6",f=`\u73FE\u5728\u6309\u4F4F ${c} \u4E0B\u964D`,d=`\u4F60\u5DF2\u5728\u5CF6\u9762\u4E0A\u65B9\u3002\u6301\u7E8C\u4FEE\u6B63\u65B9\u5411\uFF0C\u843D\u5730\u5F8C\u653E\u958B ${c}\uFF0C\u8D70\u5230\u89C0\u6E2C\u53F0\u6309 ${u}\u3002`):i.activated.length?(h="03 \xB7 \u63A5\u7E8C\u822A\u7A0B",f=t.name,d=n.description):e.grounded&&i.checkpoint==="island-camp"?(h="01 \xB7 \u8B93\u98A8\u63A5\u4F4F\u4F60",f=`\u6309 ${l} \u8D77\u8DF3\u5C55\u5E06`,d=`${o?"\u5DE6\u6416\u687F":"WASD"} \u671D\u524D\u65B9\u91D1\u8272\u822A\u6A19\u79FB\u52D5\uFF0C\u6CBF\u822A\u7DDA\u5716\u7684\u5B89\u5168\u98A8\u9053\u524D\u9032\u3002`):a<75?(h="02 \xB7 \u5C0D\u6E96\u5CF6\u9762",f="\u98DB\u5230\u5CF6\u9762\u4E0A\u65B9\u518D\u6E1B\u901F",d="\u4FDD\u6301\u5C55\u5E06\uFF0C\u671D\u91D1\u8272\u76F4\u67F1\u4FEE\u6B63\u65B9\u5411\u3002\u5230\u9054\u5CF6\u9762\u4E0A\u65B9\u5F8C\uFF0C\u63D0\u793A\u6703\u544A\u8A34\u4F60\u4F55\u6642\u964D\u843D\u3002"):(h="02 \xB7 \u6CBF\u98A8\u5E36\u524D\u9032",f="\u9806\u98A8\u88DC\u80FD\uFF0C\u71B1\u6D41\u62AC\u5347",d=`\u6CBF\u5730\u5716\u865B\u7DDA\u5230\u9054\u8606\u5149\u5EAD\u3002\u7A7A\u4E2D\u4E0D\u7528\u6301\u7E8C\u6309 ${l}\uFF1B\u653E\u958B\u65B9\u5411\u4ECD\u6703\u6ED1\u7FD4\u3002`),nt("#guide-step",h),nt("#guide-text",f),nt("#guide-detail",d)}bx()}function bx(){let i=Pe("#map"),e=i.getContext("2d"),t=ve.state,n=.48/(xe.mapScale||1),s=f=>i.width*.3+f*n,r=f=>i.height*.6+f*n;e.clearRect(0,0,i.width,i.height),e.strokeStyle="#bfd3bd14",e.lineWidth=1;for(let f=20;f<i.width;f+=40)e.beginPath(),e.moveTo(f,0),e.lineTo(f,i.height),e.stroke();for(let f=0;f<i.height;f+=40)e.beginPath(),e.moveTo(0,f),e.lineTo(i.width,f),e.stroke();let a=xe.challenges.find(f=>f.id===t.activeChallenge),o=ve.courseStage(a),l=xe.challenges.find(f=>f.id===t.trackedHint?.id),c=o?{waypoints:[Ot(o.fromIslandId),...o.gates,Ot(o.toIslandId)]}:l?{waypoints:[t.player,...t.transitWaypoints.slice(t.transitIndex),ve.courseEntry(l)]}:xe.routes.find(f=>f.id===t.objective.routeId);c&&(e.strokeStyle=l||t.routeStyle==="safe"?"#bcdfd0":"#e6c17e",e.lineWidth=2,e.setLineDash([5,5]),e.beginPath(),c.waypoints.forEach((f,d)=>d?e.lineTo(s(f.x),r(f.z)):e.moveTo(s(f.x),r(f.z))),e.stroke(),e.setLineDash([])),xe.islands.forEach((f,d)=>{e.beginPath(),e.arc(s(f.x),r(f.z),Math.max(5,f.radius*n*.7),0,Math.PI*2),e.fillStyle=t.activated.includes(f.id)?"#cdb97855":"#6e97836b",e.fill(),e.strokeStyle=f.id===t.objective.islandId?"#ffdc8e":"#b3cdb061",e.lineWidth=f.id===t.objective.islandId?2:1,e.stroke(),e.fillStyle="#f0e5ba",e.font="17px Segoe UI",e.textAlign="center",e.fillText(d+1,s(f.x),r(f.z)+6)}),xe.relics.forEach(f=>{t.relics.includes(f.id)||(e.fillStyle="#eac277",e.fillRect(s(f.x)-2,r(f.z)-2,4,4))});let u=t.challengeHint||t.trackedHint||t.surveyHint;u&&(e.beginPath(),e.arc(s(u.x),r(u.z),6,0,Math.PI*2),e.strokeStyle="#ffe6a7",e.lineWidth=2,e.stroke());let h=t.player;e.save(),e.translate(s(h.x),r(h.z)),e.rotate(h.heading),e.beginPath(),e.moveTo(0,-9),e.lineTo(6,7),e.lineTo(0,3),e.lineTo(-6,7),e.closePath(),e.fillStyle="#fff9dc",e.strokeStyle="#24565a",e.lineWidth=2,e.fill(),e.stroke(),e.restore(),e.fillStyle="#adccbf",e.font="14px Segoe UI",e.fillText("N \u2191",i.width-24,22)}function Bl(){for(let i of ve.drainEvents())i.type==="save"&&vn(),i.type==="glide"&&Ze.play("glide"),i.type==="wind"&&Ze.play("tailwind"),i.type==="land"&&(Ze.play("land"),Qt(`${i.precise?"\u7CBE\u6E96\u843D\u5730":"\u5DF2\u5B89\u5168\u843D\u5CF6"} \xB7 ${i.name} \xB7 checkpoint \u5DF2\u4FDD\u5B58`)),i.type==="stall"&&(Ze.play("stall"),Qt(i.message)),["hint","edge","assist-offer","low-energy"].includes(i.type)&&(Qt(i.message),i.type==="low-energy"&&Ze.play("energy")),i.type==="relic"&&(Ze.play("unlock"),Qt(`\u6587\u660E\u788E\u7247 \xB7 ${i.name}\uFF5C${i.text}`)),i.type==="challenge"&&(Ze.play("unlock"),Qt(`\u6E2C\u98A8\u6311\u6230\u5B8C\u6210 \xB7 ${i.name} \xB7 \u5168\u90E8\u968E\u6BB5\u5DF2\u4FDD\u5B58`)),i.type==="challenge-start"&&(Ze.play("ui"),Qt(i.message)),i.type==="challenge-gate"&&Ze.play("relic"),i.type==="survey"&&(Ze.play("relic"),Qt(i.message)),i.type==="challenge-stage"&&(Ze.play("unlock"),Qt(i.message)),i.type==="challenge-reset"&&i.reason==="cancel"&&Qt(i.message),i.type==="station"&&(Ze.play("unlock"),Mx(i.dialogue)),i.type==="complete"&&(vn(),nr(!0))}function Uf(i){let e=Math.min((i-kl)/1e3,.15);if(kl=i,ve.status==="running"){tr+=e;let t=0;for(;tr>=1/60&&t++<9;)ve.step(Vn.read(Et.yaw),1/60),tr-=1/60;Bl()}Et.update(ve.state,Math.min(e,.05),i/1e3,ve.state.objective),Ze.update({speed:Math.hypot(ve.player.vx,ve.player.vz),energy:ve.player.energy,wind:ve.state.wind.length>0}),Th+=e,Th>.1&&(Ai(),Th=0),yt&&ve.status==="running"&&(Tf++,Af+=e,Ol.push(e*1e3),Ol.length>9e3&&Ol.shift(),e>.0333&&Rf++),Ah=requestAnimationFrame(Uf)}async function Ex(){_t=ma.load(),Rh(_t.warning),_t=_t.save,Ct={..._t.settings},!_t.elapsed&&matchMedia("(prefers-reduced-motion: reduce)").matches&&(Ct.reducedMotion=!0),ir=_t.module,ve=new ps({save:_t}),Et=new Ll(Pe("#world")),Ze=new Ul,er(),Vn=new Dl(Pe("#world"),{pause:bf,help:li,view:Ef,recenter:()=>Et.recenter(),interact:()=>{ve.interact(),Bl()},blur:()=>{clearTimeout(ls),Ze.setPaused(!0),ve.status==="running"&&cs("blur")},rotate:(i,e)=>Et.rotate(i,e),zoom:i=>Et.zoom(i)}),oi=new Nl({"host:start":()=>{yt?ve.status==="paused"&&ci():Ti(_t.elapsed>0||_t.completed)},"host:pause":()=>cs(),"host:resume":ci,"host:restart":()=>Ti(!1)}),Pe("#modules").innerHTML=Mn.map((i,e)=>`<button class="module" data-module="${i.id}" aria-pressed="${i.id===ir}"><span class="symbol">${["\u2301","\u25C8","\u2197"][e]}</span><strong>${i.name}</strong><small>${["\u8F49\u5411\u9748\u6D3B \xB7 \u5DE1\u822A\u8F03\u6162","\u6301\u4E45\u84C4\u80FD \xB7 \u8F49\u5411\u8F03\u7DE9","\u9806\u98A8\u52A0\u901F \xB7 \u96E2\u98A8\u8017\u80FD"][e]}</small></button>`).join(""),document.querySelectorAll(".module").forEach(i=>i.onclick=()=>yx(i.dataset.module)),Pe("#seed").value=_t.elapsed?_t.seed:2718,Pe("#start").onclick=()=>Ti(!1),Pe("#continue").onclick=()=>Ti(!0),Ft("#continue",_t.elapsed>0),nt("#continue",_t.completed?"\u67E5\u770B\u7D50\u7B97\uFF0F\u7E7C\u7E8C\u63A2\u7D22":"\u7E7C\u7E8C\u4E0A\u6B21\u822A\u7A0B"),Pe("#daily-seed").onclick=()=>{Pe("#seed").value=Number(new Intl.DateTimeFormat("en-CA",{timeZone:"Asia/Taipei",year:"numeric",month:"2-digit",day:"2-digit"}).format(new Date).replace(/-/g,""))%999999,Qt("\u4ECA\u65E5\u98A8\u6CC1\u50C5\u4F9B\u672C\u6A5F\u91CD\u73FE\uFF0C\u6C92\u6709\u5168\u7403\u6392\u540D\u3002")},Pe("#new-seed").onclick=()=>{Pe("#seed").value=crypto.getRandomValues(new Uint32Array(1))[0]%999999+1},Pe("#pause").onclick=bf,Pe("#help").onclick=li,Pe("#camera").onclick=Ef,Pe("#route-toggle").onclick=Sx,Pe("#leave-course").onclick=()=>{ve.cancelChallenge(),Bl(),Ai(),ve.status==="running"&&Pe("#world").focus()},Pe("#interact").onclick=()=>{ve.interact(),Bl()},Pe("#hide-guide").onclick=()=>{sr=!0,Ft("#guide",!1),ve.status==="running"&&Pe("#world").focus()},Pe("#close-modal").onclick=If,nt("#build-label",`${Fl.version} \xB7 ${Fl.id} \xB7 \u5F85\u7368\u7ACB\u9A57\u6536`),Pe("#modal").addEventListener("keydown",i=>{if(i.key==="Tab"){let e=[...Pe("#modal").querySelectorAll("button,input,select")].filter(s=>!s.disabled),t=e[0],n=e.at(-1);i.shiftKey&&document.activeElement===t?(i.preventDefault(),n.focus()):!i.shiftKey&&document.activeElement===n&&(i.preventDefault(),t.focus())}}),Object.defineProperty(window,"__aetherwake",{value:Object.freeze({build:Object.freeze({...Fl}),snapshot:()=>ve.snapshot(),metrics:()=>{let i=[...Ol].sort((n,s)=>n-s),e=Et.renderer.getContext(),t=e.getExtension("WEBGL_debug_renderer_info");return{...Et.metrics,camera:Et.inspectCamera(ve.player),frameCount:Tf,elapsedSample:Af,p50:i[Math.floor(i.length*.5)]||null,p95:i[Math.floor(i.length*.95)]||null,longFrames:Rf,renderer:Et.renderer.getContext().getParameter(Et.renderer.getContext().RENDERER),unmaskedRenderer:t?e.getParameter(t.UNMASKED_RENDERER_WEBGL):null,audio:{contextState:Ze.context?.state||"uninitialized",activeVoices:Ze.active.size,peakVoices:Ze.stats.peakVoices,musicVolume:Ze.musicVolume,sfxVolume:Ze.sfxVolume,loadedSamples:Ze.sampleBuffers.size,sampleFailed:Ze.sampleFailed}}}})}),window.addEventListener("pagehide",()=>{yt&&vn(),Vn.clear(),Ze.setPaused(!0)}),window.addEventListener("beforeunload",()=>{cancelAnimationFrame(Ah),Vn.dispose(),Ze.dispose(),Et.dispose(),oi.dispose()}),Ai(),oi.setReady(),Ah=requestAnimationFrame(Uf)}Ex().catch(i=>{console.error(i),Ft("#fatal"),nt("#fatal-message",`\u7121\u6CD5\u5EFA\u7ACB 3D \u5834\u666F\u3002\u8ACB\u78BA\u8A8D\u700F\u89BD\u5668\u5DF2\u555F\u7528 WebGL\uFF0C\u4E26\u91CD\u65B0\u8F09\u5165\u3002${i.message}`),oi?.send("game:error",{message:String(i.message).slice(0,300)})});
/*! Bundled license information:

three/build/three.core.js:
three/build/three.module.js:
  (**
   * @license
   * Copyright 2010-2025 Three.js Authors
   * SPDX-License-Identifier: MIT
   *)
*/
