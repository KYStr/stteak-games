var Xf=(i,e,t)=>({x:i,y:e,z:t}),Ui=(i,e)=>i.find(t=>t.id===`island-${e}`),hr=(i,e=26)=>Xf(i.x,i.y+e,i.z),_s=(i,e)=>{let t=Math.hypot(e.x-i.x,e.z-i.z)||1;return{x:(e.x-i.x)/t,z:(e.z-i.z)/t}},ql=i=>Math.round(i.slice(1).reduce((e,t,n)=>e+Math.hypot(t.x-i[n].x,t.y-i[n].y,t.z-i[n].z),0)),$f=[{mission:1,from:"camp",to:"reed",type:"survey",title:"\u6821\u6E96\u8606\u5149\u98A8\u6A19",roles:["\u8D77\u98A8\u57FA\u6E96","\u4E0A\u5347\u5256\u9762","\u9AD8\u5C64\u98A8\u901F","\u71B1\u6D41\u51FA\u6D41","\u5074\u98A8\u88DC\u511F","\u4F4E\u5C64\u56DE\u6D41","\u5B9A\u5411\u5FA9\u6838","\u6821\u6E96\u4EA4\u4ED8"],safe:[[-60,32,-150],[-280,55,-300],[-520,82,-360],[-690,72,-510],[-680,44,-700],[-530,40,-875],[-350,38,-885],[-308,34,-712]],shortcut:[[60,30,-125],[20,60,-260],[-70,86,-375],[-150,58,-490],[-265,42,-580],[-390,52,-650],[-410,34,-760],[-308,34,-712]],decisions:["\u5728\u4F4E\u5C64\u5148\u5C0D\u9F4A\u98A8\u5411\u518D\u8D77\u901F","\u85C9\u71B1\u6D41\u53D6\u5F97\u9AD8\u8655\u6A23\u672C\u800C\u975E\u76F4\u63A5\u8D8A\u5CF6","\u7A7F\u904E\u5074\u98A8\u5F8C\u4FEE\u6B63\u822A\u5411\u518D\u904E\u9580","\u964D\u56DE\u4EA4\u4ED8\u9AD8\u5EA6\uFF0C\u4FDD\u7559\u843D\u5730\u80FD\u91CF"],descriptions:{safe:"\u6CBF\u5916\u5074\u5BEC\u98A8\u5ECA\u53D6\u5F97\u516B\u4EFD\u98A8\u5C64\u6A23\u672C\uFF1B\u88DC\u80FD\u71B1\u6D41\u591A\u3001\u6025\u964D\u5C11\uFF0C\u8DEF\u7A0B\u8F03\u9577\u3002",shortcut:"\u6CBF\u4E2D\u592E\u7A84\u98A8\u5ECA\u53D6\u5F97\u76F8\u540C\u516B\u4EFD\u6A23\u672C\uFF1B\u8F03\u77ED\u4F46\u9AD8\u4F4E\u8F49\u63DB\u3001\u822A\u5411\u53CA\u80FD\u91CF\u8981\u6C42\u8F03\u9AD8\u3002"}},{mission:2,from:"reed",to:"storm",type:"carry",title:"\u904B\u9001\u5B9A\u5411\u661F\u5100",roles:["\u661F\u5100\u63A5\u8F09","\u7B2C\u4E00\u6BB5\u5B9A\u5411","\u65B7\u6A4B\u8F49\u904B","\u9AD8\u5C64\u907F\u96F7","\u5E73\u7A69\u51FA\u6D41","\u7B2C\u4E8C\u6BB5\u5B9A\u5411","\u964D\u843D\u524D\u5FA9\u6838","\u661F\u5100\u4EA4\u4ED8"],safe:[[-170,40,-870],[70,50,-1080],[300,58,-1260],[510,72,-1410],[755,64,-1290],[1e3,58,-1100],[1120,48,-930],[1008,54,-792]],shortcut:[[-155,42,-700],[10,70,-660],[190,90,-660],[390,94,-610],[580,72,-680],[775,62,-730],[935,54,-875],[1008,54,-792]],decisions:["\u8D77\u822A\u5F8C\u5148\u7A69\u4F4F\u9AD8\u5EA6\u518D\u904B\u9001","\u9078\u65B7\u6A4B\u5916\u7DE3\u6216\u96F7\u5FC3\u4E0A\u5C64","\u9810\u7559\u8F49\u5F4E\u8DDD\u96E2\uFF0C\u907F\u514D\u6025\u964D\u5F8C\u624D\u627E\u4EA4\u4ED8\u9580","\u5E36\u8457\u9918\u80FD\u8207\u6B63\u78BA\u822A\u5411\u62B5\u9054\u5929\u6587\u53F0"],descriptions:{safe:"\u7E5E\u65B7\u6A4B\u5916\u7DE3\u904B\u9001\u516B\u6BB5\u5B9A\u5411\u7D00\u9304\uFF1B\u8F49\u5F4E\u8F03\u5BEC\u3001\u7A69\u5B9A\u5EA6\u9580\u6ABB\u8F03\u5BEC\u9B06\u3002",shortcut:"\u5F9E\u96F7\u810A\u9AD8\u5C64\u904B\u9001\u540C\u4E00\u661F\u5100\uFF1B\u8DEF\u77ED\uFF0C\u4F46\u5FC5\u9808\u63D0\u65E9\u722C\u5347\u4E26\u5E73\u7A69\u7A7F\u904E\u7A84\u98A8\u9580\u3002"}},{mission:3,from:"storm",to:"dawn",type:"observe",title:"\u91CD\u5EFA\u6B78\u661F\u65B9\u4F4D",roles:["\u5317\u65B9\u57FA\u7DDA","\u7B2C\u4E00\u689D\u8996\u7DDA","\u9727\u908A\u8FA8\u5411","\u66F8\u5EAB\u65B9\u4F4D","\u7B2C\u4E8C\u689D\u8996\u7DDA","\u4EA4\u6703\u9EDE\u9A57\u8B49","\u6B78\u661F\u822A\u5411","\u661F\u5716\u4EA4\u4ED8"],safe:[[1130,60,-600],[1220,72,-350],[1080,52,-90],[930,44,90],[850,58,260],[690,46,470],[440,36,650],[272,30,728]],shortcut:[[860,60,-650],[720,82,-440],[660,66,-210],[560,50,25],[455,68,220],[325,48,425],[180,34,600],[272,30,728]],decisions:["\u5F9E\u5169\u500B\u4E0D\u540C\u65B9\u4F4D\u8FA8\u8A8D\u540C\u4E00\u7247\u822A\u57DF","\u5728\u4F4E\u5C64\u7BC0\u80FD\u8207\u9AD8\u5C64\u8996\u91CE\u9593\u53D6\u6368","\u5148\u5C0D\u9F4A\u53EF\u898B\u7684\u5BE6\u9AD4\u822A\u6A19\uFF0C\u518D\u9032\u5165\u9727\u5E36","\u4F9D\u4EA4\u6703\u65B9\u4F4D\u5B8C\u6210\u5357\u5411\u8FD4\u7A0B"],descriptions:{safe:"\u6CBF\u66F8\u5EAB\u5916\u7DE3\u53D6\u5F97\u516B\u500B\u65B9\u4F4D\u7BC0\u9EDE\uFF1B\u822A\u6A19\u6E05\u695A\u3001\u88DC\u80FD\u8F03\u5145\u8DB3\uFF0C\u4F46\u8DDD\u96E2\u8F03\u9577\u3002",shortcut:"\u5F9E\u4E2D\u592E\u9727\u5ECA\u53D6\u5F97\u540C\u7FA9\u65B9\u4F4D\u7BC0\u9EDE\uFF1B\u8F03\u77ED\u4F46\u5FC5\u9808\u66F4\u6E96\u78BA\u5C0D\u9F4A\u822A\u5411\u4E26\u63A7\u5236\u9AD8\u5EA6\u3002"}}];function qf(i,e,t){let n=t==="safe";return i===1?{...[0,2,4].includes(e)?{minSpeed:n?10:13}:{},...[2,5].includes(e)?{minEnergy:n?30:45}:{},...e===6?{maxVerticalSpeed:n?4:3}:{}}:i===2?{maxVerticalSpeed:n?3.5:2.7,...[3,6,7].includes(e)?{minEnergy:n?25:40}:{}}:{...[1,3,5,6].includes(e)?{maxVerticalSpeed:n?3.5:2.8}:{},...e===4?{minEnergy:n?25:40}:{}}}function Vh(i){return[i.minSpeed?`\u901F\u5EA6\u81F3\u5C11 ${i.minSpeed} m/s`:"",i.minEnergy?`\u5E06\u80FD\u91CF\u81F3\u5C11 ${i.minEnergy}%`:"",i.maxVerticalSpeed?`\u5782\u76F4\u901F\u5EA6\u4E0D\u8D85\u904E ${i.maxVerticalSpeed} m/s`:"",i.heading?"\u6CBF\u98A8\u5ECA\u65B9\u5411\u5C0D\u9F4A\u5165\u9580":"\u7A7F\u904E\u7ACB\u9AD4\u6A19\u8A18"].filter(Boolean).join("\uFF1B")}function Gh(i){let e=[];for(let s of $f)for(let r of["safe","shortcut"]){let a=Ui(i,s.from),o=Ui(i,s.to),l=hr(a),c=[];s[r].forEach(([h,f,d],p)=>{let y={id:`sample-main-${s.mission}-${p+1}`,name:s.roles[p],type:s.type,x:h,y:f,z:d,radius:15,...qf(s.mission,p,r)};(s.mission===1&&[4,6].includes(p)||s.mission===2&&[1,3,5,6].includes(p)||s.mission===3&&p!==0&&p!==7)&&(y.heading={..._s(c[p-1]||l,y),minDot:r==="safe"?.65:.82}),y.instruction=`${y.name}\uFF1A${Vh(y)}\u3002${p===7?"\u53D6\u5F97\u5F8C\u5728\u5CF6\u4E2D\u592E\u843D\u5730\u6309 E \u4EA4\u4ED8\u3002":"\u53D6\u6A23\u4E0D\u9700\u7B49\u5F85\uFF0C\u5B8C\u6210\u5F8C\u7ACB\u5373\u98DB\u5F80\u4E0B\u4E00\u7BC0\u9EDE\u3002"}`,c.push(y)});let u=[l,...c,hr(o)];e.push({id:`route-${s.mission}-${r}`,mission:s.mission,style:r,from:a.id,to:o.id,name:`\u7B2C ${s.mission} \u822A\u7DDA \xB7 ${r==="safe"?"\u5B89\u5168\u98A8\u9053":"\u7A7F\u96F2\u6377\u5F91"}`,title:s.title,theme:s.type,description:s.descriptions[r],samples:c,waypoints:u,distanceMeters:ql(u),decisions:s.decisions,designBudgetMinutes:[2.3,3.5]})}let t=Ui(i,"dawn"),n=Ui(i,"camp");for(let s of["safe","shortcut"]){let r=[hr(t),hr(n)];e.push({id:`route-4-${s}`,mission:4,style:s,from:t.id,to:n.id,name:`\u8FD4\u822A \xB7 ${s==="safe"?"\u5B89\u5168\u98A8\u9053":"\u7A7F\u96F2\u6377\u5F91"}`,title:"\u5E36\u661F\u5716\u56DE\u5BB6",theme:"return",samples:[],waypoints:r,description:s==="safe"?"\u6CBF\u5BEC\u5EE3\u3001\u88DC\u80FD\u5145\u8DB3\u7684\u6B78\u822A\u98A8\u5ECA\uFF0C\u8FD4\u56DE\u71DF\u5730\u4E2D\u592E\u843D\u5730\u6309 E \u7D50\u7B97\u3002":"\u6CBF\u8F03\u5FEB\u7684\u7A84\u98A8\u5ECA\u8FD4\u822A\uFF1B\u9810\u7559\u964D\u843D\u80FD\u91CF\uFF0C\u56DE\u71DF\u5730\u4E2D\u592E\u6309 E \u7D50\u7B97\u3002",distanceMeters:ql(r),decisions:["\u9078\u5BEC\u98A8\u5ECA\u7A69\u5B9A\u8FD4\u822A\uFF0C\u6216\u7A84\u98A8\u5ECA\u5FEB\u901F\u8FD4\u822A","\u63D0\u65E9\u4E0B\u964D\uFF0C\u907F\u514D\u8D8A\u904E\u71DF\u5730\u5F8C\u56DE\u982D"],designBudgetMinutes:[.8,1.3]})}return e}function Wh(i,e,t,n={}){let s=Math.min(e.y,t.y)-26;return{id:i,type:"tailwind",name:n.name||"\u5206\u5C64\u822A\u9053",start:{...e},end:{...t},x:(e.x+t.x)/2,y:s,z:(e.z+t.z)/2,radius:26,height:Math.abs(t.y-e.y)+58,ceiling:t.y+1,strength:2.4,charge:4.8,liftCap:6,direction:{..._s(e,t),y:0},...n}}function Xh(i,e,t={}){return{id:i,type:"thermal",name:"\u822A\u6BB5\u88DC\u7D66\u71B1\u6D41",x:e.x,y:e.y-35,z:e.z,radius:24,height:70,ceiling:e.y+2,strength:7.5,charge:8,direction:{x:0,y:1,z:0},...t}}function $h(i,e,t,n={}){let s=_s(e,t);return{id:i,type:"crosswind",name:"\u53EF\u8B80\u7684\u8108\u52D5\u5074\u6D41",x:(e.x+t.x)/2,y:Math.min(e.y,t.y)-24,z:(e.z+t.z)/2,radius:64,height:Math.abs(t.y-e.y)+64,strength:4.5,period:8,direction:{x:-s.z,y:0,z:s.x},...n}}function qh(i){let e=[];for(let t of i)for(let n=1;n<t.waypoints.length;n++){let s=t.waypoints[n-1],r=t.waypoints[n];if(Math.hypot(r.x-s.x,r.z-s.z)<.1)continue;let a=t.style==="safe",o={routeId:t.id,mission:t.mission,sample:n-1,style:t.style};e.push(Wh(`wind-${t.id}-${n}`,s,r,{...o,radius:a?26:17,strength:a?2.8:4,charge:a?5.2:3.9,liftCap:a?6:7})),(r.y-s.y>=10||a&&n%3===1)&&e.push(Xh(`wind-${t.id}-thermal-${n}`,r,{...o,radius:a?26:21,charge:a?8:6.5})),(t.mission===1&&n===5||t.mission===2&&[4,7].includes(n))&&e.push($h(`wind-${t.id}-side-${n}`,s,r,{...o,strength:a?3.3:5.2,radius:a?50:60}))}return e}var Yf={lee:[0,.32,.74,1,.95,.62,.28,.08,0],rim:[0,-.36,-.78,-1,-.82,-.5,-.18,-.06,0],shear:[0,.58,.95,.48,-.32,-.82,-.6,-.2,0],ridge:[0,.5,.95,.9,.5,0,-.32,-.18,0],descent:[0,-.3,-.72,-.9,-.55,0,.24,.1,0]},Yl=[.06,.16,.29,.43,.57,.71,.84,.94,1],Zf={sweep:[28,36,42,46,43,36,30,26,24],high:[32,50,72,85,76,60,42,30,24],rising:[25,43,68,86,90,76,54,34,24],shelves:[29,47,48,73,74,51,50,32,24],descending:[38,65,82,72,55,39,30,25,24],low:[25,29,32,34,31,28,27,25,24]},Jf=[[["camp","bridge","\u5C55\u5E06\u52A0\u901F","\u8B80\u53D6\u9806\u98A8\u9032\u5165\u9EDE\uFF0C\u5148\u5C0D\u6E96\u518D\u52A0\u901F\uFF1B\u5728\u65B7\u6A4B\u4EA4\u4ED8\u8D77\u901F\u7D00\u9304\u3002","lee","sweep",.3,"accelerate"],["bridge","dawn","\u9577\u5F4E\u4FDD\u901F","\u6CBF\u5916\u5F4E\u6301\u7E8C\u4FEE\u6B63\u822A\u5411\uFF1B\u6BD4\u8F03\u5207\u5167\u7DDA\u8207\u4FDD\u7559\u98A8\u5E36\u901F\u5EA6\u3002","shear","low",.25,"corner"],["dawn","storm","\u9AD8\u5C64\u885D\u7DDA","\u5148\u722C\u5347\u518D\u63A5\u9AD8\u901F\u98A8\u5C64\uFF0C\u52FF\u70BA\u6436\u901F\u5EA6\u932F\u904E\u71B1\u6D41\u51FA\u53E3\u3002","ridge","high",.28,"climb-fast"],["storm","camp","\u5E36\u901F\u8FD4\u822A","\u5728\u9577\u4E0B\u964D\u6BB5\u4FDD\u901F\uFF0C\u672B\u9580\u524D\u63D0\u65E9\u6E1B\u901F\uFF0C\u56DE\u71DF\u5730\u4EA4\u4ED8\u3002","descent","descending",.25,"finish"]],[["reed","archive","\u8B80\u53D6\u84C4\u98A8\u9EDE","\u4EA4\u66FF\u7D93\u904E\u88DC\u80FD\u6BB5\u8207\u4F4E\u4F9B\u80FD\u6BB5\uFF1B\u5230\u66F8\u5EAB\u6642\u4FDD\u6709\u5145\u8DB3\u9918\u80FD\u3002","lee","shelves",.4,"harvest"],["archive","bridge","\u6709\u9650\u80FD\u91CF\u8D8A\u810A","\u7528\u524D\u534A\u6BB5\u84C4\u80FD\u7A7F\u904E\u9AD8\u5C64\u5F31\u98A8\uFF0C\u907F\u514D\u6025\u8F49\u9020\u6210\u984D\u5916\u6D88\u8017\u3002","shear","high",.4,"budget"],["bridge","reed","\u9918\u80FD\u56DE\u6536","\u5E36\u8457\u5269\u9918\u80FD\u91CF\u6CBF\u80CC\u98A8\u5074\u964D\u8FD4\u8606\u5149\u5EAD\uFF1B\u4E0D\u4EE5\u5931\u901F\u88DC\u6EFF\u80FD\u91CF\u3002","rim","descending",.42,"reserve"]],[["bridge","camp","\u8FA8\u8A8D\u968E\u68AF\u71B1\u6D41","\u5148\u4F4E\u5F8C\u9AD8\u5730\u63A5\u4E0A\u4E09\u500B\u71B1\u6D41\u5C64\uFF0C\u8B80\u61C2\u4E0B\u4E00\u500B\u4E0A\u5347\u51FA\u53E3\u3002","ridge","rising",.3,"rise"],["camp","storm","\u932F\u5C64\u63DB\u6D41","\u5728\u4E2D\u9AD8\u5C64\u98A8\u5ECA\u4E4B\u9593\u63DB\u6D41\uFF0C\u907F\u514D\u76F4\u63A5\u62C9\u76F4\u822A\u7DDA\u3002","shear","shelves",.32,"transfer"],["storm","archive","\u63D0\u524D\u6536\u5E06","\u5F9E\u9AD8\u8655\u4E0B\u964D\u81F3\u66F8\u5EAB\uFF1B\u63D0\u65E9\u6E1B\u901F\uFF0C\u672B\u9580\u524D\u6062\u5FA9\u5E73\u7A69\u5782\u76F4\u901F\u5EA6\u3002","descent","descending",.35,"descend"],["archive","bridge","\u8D8A\u810A\u6B78\u6A4B","\u5C07\u722C\u5347\u3001\u63DB\u6D41\u8207\u4E0B\u964D\u63A5\u6210\u4E00\u6B21\u5B8C\u6574\u8D8A\u810A\uFF0C\u518D\u56DE\u65B7\u6A4B\u4EA4\u4ED8\u3002","lee","high",.3,"combine"]],[["storm","reed","\u5074\u6D41\u5B9A\u5411","\u5148\u5C0D\u9F4A\u98A8\u9580\uFF0C\u518D\u88DC\u511F\u4F86\u81EA\u5DE6\u5074\u7684\u8108\u52D5\uFF0C\u4E0D\u7B49\u5F85\u98A8\u505C\u3002","lee","sweep",.3,"left-shear"],["reed","dawn","\u53CD\u5411\u98A8\u5207","\u5F8C\u534A\u6BB5\u5074\u98A8\u65B9\u5411\u53CD\u8F49\uFF1B\u89C0\u5BDF\u7BAD\u982D\u800C\u975E\u6CBF\u7528\u4E0A\u4E00\u6BB5\u4FEE\u6B63\u91CF\u3002","shear","shelves",.28,"reverse-shear"],["dawn","bridge","\u8F09\u5100\u904E\u98A8\u810A","\u4FDD\u6301\u5B9A\u5411\u548C\u9AD8\u5EA6\u901A\u904E\u8F03\u5F37\u5074\u6D41\uFF0C\u6CBF\u65B7\u6A4B\u5916\u5074\u9032\u5834\u3002","rim","high",.26,"loaded-shear"],["bridge","storm","\u80CC\u98A8\u8FD4\u53F0","\u5148\u5229\u7528\u80CC\u98A8\u5340\u84C4\u80FD\uFF0C\u518D\u7A69\u5B9A\u6A6B\u8D8A\u6700\u5F8C\u5074\u6D41\u4EA4\u4ED8\u3002","ridge","descending",.32,"lee-return"]],[["archive","reed","\u5C0B\u627E\u7B2C\u4E00\u689D\u8996\u7DDA","\u7528\u5BE6\u9AD4\u822A\u6A19\u9010\u6B21\u78BA\u8A8D\u897F\u5317\u65B9\u4F4D\uFF0C\u4E0D\u628A\u672A\u77E5\u9727\u5340\u7576\u4F5C\u76F4\u7DDA\u6377\u5F91\u3002","lee","sweep",.36,"sightline"],["reed","storm","\u9AD8\u4F4E\u5C64\u4EA4\u53C9\u5B9A\u4F4D","\u5F9E\u5169\u500B\u4E0D\u540C\u9AD8\u5EA6\u91CD\u8B80\u822A\u5411\uFF0C\u5EFA\u7ACB\u53EF\u898B\u98A8\u5ECA\u7684\u4EA4\u6703\u9EDE\u3002","ridge","shelves",.34,"triangulate"],["storm","camp","\u5931\u53BB\u8FD1\u666F\u4E4B\u5F8C","\u8F49\u5165\u4F4E\u5C64\u8584\u9727\uFF0C\u4F9D\u4E0B\u4E00\u500B\u822A\u6A19\u53CA\u98A8\u5E36\u65B9\u5411\u63A5\u56DE\u71DF\u5730\u3002","shear","low",.35,"fog-channel"],["camp","archive","\u5E36\u56DE\u5B8C\u6574\u98A8\u5716","\u5F9E\u76F8\u53CD\u65B9\u5411\u8FA8\u8A8D\u5148\u524D\u5730\u6A19\uFF0C\u4FEE\u6B63\u65B9\u4F4D\u5F8C\u8FD4\u56DE\u66F8\u5EAB\u4EA4\u4ED8\u3002","rim","high",.38,"chart-return"]],[["dawn","bridge","\u7A7A\u8F09\u5B9A\u7DDA","\u5148\u7528\u5BEC\u98A8\u5ECA\u5EFA\u7ACB\u7A69\u5B9A\u8DEF\u7DDA\uFF0C\u89C0\u5BDF\u4E0B\u964D\u524D\u9700\u8981\u7684\u6E96\u5099\u8DDD\u96E2\u3002","lee","low",.28,"empty-run"],["bridge","camp","\u6EFF\u8F09\u7A7F\u96F2","\u651C\u5E36\u661F\u5100\u7A7F\u904E\u932F\u5C64\u96F2\u5ECA\uFF0C\u907F\u514D\u6025\u5347\u6025\u964D\u5F8C\u624D\u6821\u6B63\u3002","ridge","shelves",.3,"loaded-run"],["camp","archive","\u4EA4\u4ED8\u524D\u5E73\u822A","\u5728\u9577\u8F49\u5F4E\u5F8C\u6062\u5FA9\u5E73\u822A\uFF0C\u5E36\u8DB3\u9918\u80FD\u62B5\u9054\u66F8\u5EAB\u4EA4\u4ED8\u9EDE\u3002","shear","sweep",.35,"handover"],["archive","dawn","\u5B9A\u5411\u8FD4\u5BB6","\u6CBF\u4E0B\u6C89\u98A8\u5C64\u63D0\u65E9\u6536\u5E06\uFF0C\u5728\u6B78\u661F\u81FA\u4E0A\u65B9\u91CD\u65B0\u7A69\u5B9A\u5F8C\u843D\u5730\u3002","descent","descending",.35,"precision-return"]]],Kf=["speed","energy","thermal","crosswind","fog","stability"],jf=["\u521D\u5E06\u7AF6\u901F","\u8606\u5149\u84C4\u98A8","\u65B7\u6A4B\u5347\u964D","\u96F7\u810A\u5B9A\u5411","\u66F8\u5EAB\u63A2\u9727","\u6B78\u661F\u5E73\u822A"],Qf=["camp","reed","bridge","storm","archive","dawn"];function ep(i,e,t){let n=t===Yl.length-1;return i==="speed"?n?{maxVerticalSpeed:3.5}:{minSpeed:t===0?12:e==="corner"?15:16}:i==="energy"?{minEnergy:n?e==="budget"?35:48:[2,5].includes(t)?e==="budget"?42:55:25}:i==="thermal"?[3,6,8].includes(t)?{maxVerticalSpeed:e==="descend"?3:4}:{}:i==="crosswind"?{...[2,4,6,8].includes(t)?{maxVerticalSpeed:e==="loaded-shear"?2.8:3.5}:{},...n?{minEnergy:25}:{}}:i==="fog"?[2,5,8].includes(t)?{maxVerticalSpeed:3.2}:{}:{maxVerticalSpeed:e==="empty-run"?3.5:2.8,...n?{minEnergy:30}:{}}}function tp(i,e,t,n){let s=[];for(let r=0;r<e.gates.length;r++){let a=r?e.gates[r-1]:e.launch,o=e.gates[r],l={challengeId:i,stageId:e.id,gate:r,style:"challenge"},c=t==="energy"&&[0,1,4,7].includes(r),u=t==="energy"?c?7:2.6:t==="stability"?5.2:4.8;if(s.push(Wh(`wind-${e.id}-leg-${r+1}`,a,o,{...l,name:c?"\u84C4\u98A8\u88DC\u7D66\u6BB5":t==="energy"?"\u6709\u9650\u4F9B\u80FD\u6BB5":`${e.name}\u98A8\u5ECA`,radius:t==="energy"?17:20,strength:t==="speed"?3.4:1.8,charge:u,liftCap:t==="thermal"?8:6})),(o.y-a.y>12||t==="thermal"&&r%3===1||c)&&s.push(Xh(`wind-${e.id}-rise-${r+1}`,o,{...l,radius:t==="thermal"?26:22,charge:c?9:7})),t==="crosswind"&&r>0&&r<8){let h=_s(a,o),f=n==="reverse-shear"&&r>=4?-1:1;s.push($h(`wind-${e.id}-cross-${r+1}`,a,o,{...l,radius:74,strength:n==="loaded-shear"?5.6:4.6,period:r%2?7:9,direction:{x:-h.z*f,y:0,z:h.x*f}}))}}return s}function Yh(i){return Jf.map((e,t)=>{let n=`challenge-${t+1}`,s=Kf[t],r=Ui(i,Qf[t]),a=e.map(([o,l,c,u,h,f,d,p],y)=>{let g=Ui(i,o),m=Ui(i,l),E=_s(g,m),v={x:-E.z,z:E.x},_=Math.hypot(m.x-g.x,m.z-g.z),T=Math.min(620,Math.max(260,_*d)),w={id:`${n}-stage-${y+1}`,name:c,description:u,fromIslandId:g.id,toIslandId:m.id,focus:p,landing:!0,launch:hr(g),gates:[],winds:[],decisions:[u,"\u6700\u5F8C\u4E00\u9580\u4F4D\u65BC\u843D\u9EDE\u4E0A\u65B9\uFF1B\u901A\u904E\u5F8C\u4ECD\u9700\u5728\u5CF6\u4E2D\u592E\u843D\u5730\u6309 E \u4EA4\u4ED8\u3002"]};for(let R=0;R<Yl.length;R++){let I=Yl[R],S=Yf[h][R]*T,M={id:`${w.id}-gate-${R+1}`,name:R===8?`${m.name}\u9032\u5834\u78BA\u8A8D`:`${c} \xB7 ${R+1}`,type:s==="stability"||p==="loaded-shear"?"carry":s==="fog"?"observe":"survey",x:g.x+(m.x-g.x)*I+v.x*S,y:g.y+(m.y-g.y)*I+Zf[f][R],z:g.z+(m.z-g.z)*I+v.z*S,radius:15,...ep(s,p,R)};(s==="crosswind"&&[1,3,5,7].includes(R)||s==="fog"&&R!==0&&R!==8||s==="stability"&&[2,5,7].includes(R))&&(M.heading={..._s(w.gates[R-1]||w.launch,M),minDot:s==="fog"?.78:.7}),M.instruction=`${M.name}\uFF1A${Vh(M)}\u3002${R===8?"\u964D\u843D\u5CF6\u4E2D\u592E\u5F8C\u6309 E\uFF0C\u624D\u6703\u4FDD\u5B58\u672C\u968E\u6BB5\u3002":u}`,w.gates.push(M)}return w.winds=tp(n,w,s,p),w.distanceMeters=ql([w.launch,...w.gates]),w.designBudgetMinutes=[1.3,2.2],w});return{id:n,islandId:r.id,kind:s,name:jf[t],courseRevision:2,description:`${a.length} \u6BB5\u8DE8\u5CF6\u822A\u7A0B\uFF1A${a.map(o=>o.name).join(" \u2192 ")}\u3002\u6BCF\u6BB5\u5B8C\u6210\u5F8C\u5728\u76EE\u7684\u5CF6\u4E2D\u592E\u843D\u5730\u6309 E\uFF1B\u5931\u901F\u6216\u91CD\u8F09\u53EA\u91CD\u8A66\u7576\u524D\u6BB5\u3002`,x:r.x+(t%2?-18:18),y:r.y+22,z:r.z-18,radius:10,minEnergy:0,minSpeed:0,stages:a,distanceMeters:a.reduce((o,l)=>o+l.distanceMeters,0),designBudgetMinutes:[6,8],timingStatus:"design-budget-not-measured"}})}var Zl=4,Sn=Object.freeze([{id:"turn",name:"\u71D5\u7FFC\u8235",description:"\u9748\u6D3B\u8F49\u5411\u3001\u7CBE\u6E96\u843D\u5CF6\uFF1B\u5DE1\u822A\u8F03\u6162\u3002",speed:.92,turn:1.6,energy:1},{id:"reserve",name:"\u84C4\u98A8\u56CA",description:"\u96E2\u958B\u98A8\u5E36\u66F4\u8010\u98DB\uFF1B\u8F49\u5411\u8207\u9806\u98A8\u52A0\u901F\u8F03\u5F31\u3002",speed:.97,turn:.86,energy:.7},{id:"tailwind",name:"\u9010\u98A8\u9C2D",description:"\u9806\u98A8\u52A0\u901F\u6700\u5F37\uFF1B\u504F\u96E2\u98A8\u5E36\u6642\u66F4\u8017\u80FD\u3002",speed:1.08,turn:1,energy:1.18}]),di=[{id:"island-camp",name:"\u6668\u98A8\u71DF\u5730",region:"\u8D77\u98A8",x:0,y:0,z:0,radius:38,color:"#9aab74",station:!1},{id:"island-reed",name:"\u8606\u5149\u5EAD",region:"\u8D77\u98A8",x:-80,y:8,z:-180,radius:34,color:"#88ad82",station:!0},{id:"island-bridge",name:"\u65B7\u6A4B\u4E4B\u74B0",region:"\u65B7\u6A4B",x:90,y:18,z:-335,radius:34,color:"#baa17a",station:!1},{id:"island-storm",name:"\u96F7\u96F2\u5929\u6587\u53F0",region:"\u96F7\u96F2",x:255,y:28,z:-195,radius:41,color:"#8b9d9a",station:!0},{id:"island-archive",name:"\u6D6E\u5149\u66F8\u5EAB",region:"\u65B7\u6A4B",x:220,y:18,z:25,radius:34,color:"#9da984",station:!1},{id:"island-dawn",name:"\u6B78\u661F\u81FA",region:"\u96F7\u96F2",x:65,y:4,z:185,radius:38,color:"#b4ab80",station:!0}].map(i=>({...i,x:i.x*Zl,z:i.z*Zl})),wa=(i,e,t)=>({x:i,y:e,z:t}),Jh=Gh(di),Ta=[];for(let i of di)Ta.push({id:`wind-lift-${i.id}`,type:"thermal",name:"\u8D77\u822A\u71B1\u6D41",x:i.x,y:i.y-14,z:i.z,radius:i.radius+11,height:86,ceiling:i.y+33,strength:7,direction:wa(0,1,0)});Ta.push(...qh(Jh));Ta.push({id:"wind-cross-reed",type:"crosswind",name:"\u8108\u52D5\u5074\u98A8",x:-168,y:-25,z:-384,radius:74,height:100,strength:4.5,period:8,direction:wa(1,0,.2)},{id:"wind-cross-storm",type:"crosswind",name:"\u96F7\u810A\u5074\u98A8",x:376,y:-20,z:-752,radius:92,height:120,strength:6,period:10,direction:wa(.2,0,1)},{id:"wind-cross-dawn",type:"crosswind",name:"\u6B78\u661F\u5074\u98A8",x:640,y:-20,z:-16,radius:88,height:120,strength:5,period:9,direction:wa(-1,0,.1)});var Zh=[["\u7B2C\u4E00\u5C01\u822A\u4FE1","\u6211\u5011\u628A\u5BB6\u7BC9\u5728\u98A8\u4E0A\uFF0C\u4ECD\u9858\u6BCF\u500B\u51FA\u767C\u7684\u4EBA\u90FD\u6709\u4E00\u689D\u56DE\u5BB6\u7684\u8DEF\u3002"],["\u5E06\u5320\u7684\u523B\u5EA6","\u4E0D\u662F\u628A\u5E06\u62C9\u5F97\u6700\u7DCA\uFF0C\u800C\u662F\u77E5\u9053\u4F55\u6642\u8B93\u98A8\u7A7F\u904E\u3002"],["\u8606\u8466\u7684\u8A18\u61B6","\u98A8\u7D93\u904E\u8606\u8466\uFF0C\u7559\u4E0B\u4E86\u7B2C\u4E00\u9996\u80FD\u88AB\u770B\u898B\u7684\u6B4C\u3002"],["\u5F15\u98A8\u8005\u7684\u7B46\u8A18","\u91D1\u8272\u4E0A\u5347\u74B0\u662F\u71B1\u6D41\uFF0C\u5F4E\u66F2\u9577\u5E36\u662F\u9806\u98A8\u3002\u4E0D\u8981\u53EA\u9760\u984F\u8272\u8FA8\u8A8D\u3002"],["\u6A4B\u4E0A\u7684\u7D04\u5B9A","\u6A4B\u66FE\u9023\u63A5\u5169\u5EA7\u5CF6\u3002\u6A4B\u65B7\u5F8C\uFF0C\u4FE1\u4EF6\u4ECD\u7136\u62B5\u9054\u3002"],["\u820A\u65E5\u6E2C\u98A8\u5C3A","\u5F9E\u7B49\u5F85\u98A8\u5230\u8B80\u61C2\u98A8\uFF0C\u6587\u660E\u8D70\u904E\u7684\u8DDD\u96E2\u6BD4\u5CF6\u8207\u5CF6\u66F4\u9060\u3002"],["\u5929\u6587\u53F0\u661F\u5716","\u661F\u5716\u4E0D\u662F\u70BA\u4E86\u77E5\u9053\u6211\u5011\u5728\u54EA\uFF0C\u800C\u662F\u63D0\u9192\u6211\u5011\u8981\u53BB\u4F55\u65B9\u3002"],["\u96F7\u5B63\u89C0\u6E2C\u8A8C","\u96F7\u5FC3\u4EAE\u8D77\u6642\uFF0C\u7E5E\u884C\u5916\u7DE3\uFF1B\u98A8\u5F9E\u4E0D\u8981\u6C42\u83BD\u649E\u7684\u52C7\u6562\u3002"],["\u6D6E\u5149\u66F8\u9801","\u6BCF\u4E00\u672C\u66F8\u90FD\u66FE\u662F\u4E00\u500B\u4EBA\u7559\u4E0B\u7684\u5CB8\u3002"],["\u7121\u540D\u8FD4\u822A\u8005","\u4ED6\u5E36\u56DE\u7684\u4E0D\u662F\u5BF6\u7269\uFF0C\u800C\u662F\u6240\u6709\u4EBA\u90FD\u80FD\u8D70\u7684\u822A\u7DDA\u3002"],["\u6B78\u661F\u5EA7\u6A19","\u7B2C\u4E09\u675F\u5149\u9EDE\u4EAE\u6642\uFF0C\u9060\u65B9\u7D42\u65BC\u6210\u70BA\u53EF\u4EE5\u56DE\u53BB\u7684\u5730\u65B9\u3002"],["\u7D66\u4E0B\u4E00\u4F4D\u65C5\u4EBA","\u4F60\u7684\u822A\u8DE1\u4E5F\u6703\u6210\u70BA\u5225\u4EBA\u7684\u5730\u5716\u3002\u73FE\u5728\uFF0C\u56DE\u5BB6\u5427\u3002"]],np=[[[-.76,-.2,1.4,"\u71DF\u5730\u897F\u5317\u5074\u8349\u5730\uFF0C\u6CBF\u5CF6\u9762\u8D70\u5230\u5916\u7DE3\u5167\u5074\u3002"],[.45,.45,20,"\u71DF\u5730\u6771\u5357\u5074\u4E0A\u7A7A 20 \u516C\u5C3A\uFF0C\u501F\u4E2D\u592E\u71B1\u6D41\u5347\u8D77\u5F8C\u8F49\u5411\u3002"]],[[-.55,.58,1.4,"\u8606\u5149\u5EAD\u897F\u5357\u5074\u8349\u5730\uFF0C\u7559\u5728\u5CF6\u7DE3\u77F3\u677F\u5167\u5074\u3002"],[.65,-.35,24,"\u8606\u5149\u5EAD\u6771\u5317\u5074\u4E0A\u7A7A 24 \u516C\u5C3A\uFF0C\u5F9E\u71B1\u6D41\u51FA\u53E3\u5411\u6771\u504F\u8F49\u3002"]],[[.72,.1,1.4,"\u65B7\u6A4B\u6771\u5074\u5CF6\u9762\uFF0C\u65B7\u6A4B\u907A\u8DE1\u5167\u5074\u7684\u53EF\u7AD9\u7ACB\u77F3\u677F\u3002"],[-.5,-.55,26,"\u65B7\u6A4B\u897F\u5317\u5074\u4E0A\u7A7A 26 \u516C\u5C3A\uFF0C\u5148\u5347\u81F3\u6A4B\u9802\u822A\u6A19\u9644\u8FD1\u3002"]],[[-.72,.18,1.4,"\u5929\u6587\u53F0\u897F\u5074\u8349\u5730\uFF0C\u4E2D\u592E\u74B0\u5EA7\u5916\u5074\u4F46\u4ECD\u5728\u5CF6\u9762\u4E0A\u3002"],[.5,-.5,25,"\u5929\u6587\u53F0\u6771\u5317\u5074\u4E0A\u7A7A 25 \u516C\u5C3A\uFF0C\u96E2\u958B\u71B1\u6D41\u6642\u6CBF\u5317\u5074\u7E5E\u904E\u67F1\u51A0\u3002"]],[[-.2,.78,1.4,"\u66F8\u5EAB\u5357\u5074\u5CF6\u9762\uFF0C\u74B0\u5F62\u66F8\u67B6\u5916\u7684\u8349\u5730\u3002"],[.58,-.48,23,"\u66F8\u5EAB\u6771\u5317\u5074\u4E0A\u7A7A 23 \u516C\u5C3A\uFF0C\u501F\u4E2D\u592E\u71B1\u6D41\u8D8A\u904E\u74B0\u5F62\u67F1\u9802\u3002"]],[[.72,.15,1.4,"\u6B78\u661F\u81FA\u6771\u5074\u8349\u5730\uFF0C\u671D\u6668\u5149\u8DEF\u6A19\u8D70\u5230\u5CF6\u7DE3\u5167\u5074\u3002"],[-.58,-.45,22,"\u6B78\u661F\u81FA\u897F\u5317\u5074\u4E0A\u7A7A 22 \u516C\u5C3A\uFF0C\u56DE\u5230\u71B1\u6D41\u5F8C\u5411\u5317\u96E2\u6D41\u3002"]]],ip=di.flatMap((i,e)=>np[e].map(([t,n,s,r],a)=>({id:`relic-${String(e*2+a+1).padStart(2,"0")}`,islandId:i.id,name:Zh[e*2+a][0],text:Zh[e*2+a][1],hint:r,x:i.x+t*i.radius,y:i.y+s,z:i.z+n*i.radius,radius:3.6}))),sp=Yh(di),ve=Object.freeze({mapScale:Zl,boundsRadius:2600,islands:di,winds:Ta,routes:Jh,relics:ip,challenges:sp,hazards:[{id:"hazard-thunder",type:"thunder",name:"\u96F7\u96F2\u6838\u5FC3",x:360,y:10,z:-680,radius:80,height:100,period:10,description:"\u96F7\u5FC3\u6BCF 10 \u79D2\u8108\u52D5\uFF1B\u6CBF\u4E0A\u5C64\u98A8\u5ECA\u7E5E\u958B\u96F7\u5FC3\uFF0C\u9583\u5149\u671F\u9593\u9760\u8FD1\u6703\u52A0\u5FEB\u8017\u80FD\u3002"},{id:"hazard-fog",type:"fog",name:"\u6D6E\u5149\u9727\u6D77",x:868,y:-8,z:-12,radius:175,height:100,description:"\u6CBF\u66F8\u5EAB\u65B9\u4F4D\u8207\u4E0B\u4E00\u500B\u5BE6\u9AD4\u822A\u6A19\u8FA8\u5411\uFF1B\u9727\u53EA\u906E\u64CB\u8996\u91CE\uFF0C\u4E0D\u76F4\u63A5\u6263\u80FD\u91CF\u3002"},{id:"hazard-fog-central",type:"fog",name:"\u4E2D\u592E\u9727\u5ECA",x:560,y:-8,z:35,radius:185,height:100,description:"\u9032\u9727\u524D\u8B80\u53D6\u98A8\u5ECA\u65B9\u5411\uFF1B\u4F4E\u5C64\u7BC0\u80FD\uFF0C\u9AD8\u5C64\u8996\u91CE\u8F03\u6E05\u695A\u3002"},{id:"hazard-fog-west",type:"fog",name:"\u897F\u810A\u96F2\u5E55",x:250,y:-8,z:-490,radius:215,height:90,description:"\u897F\u5411\u822A\u6BB5\u7684\u96F2\u5E55\u906E\u4F4F\u8FD1\u666F\uFF0C\u6CBF\u6709\u65B9\u5411\u7684\u89C0\u6E2C\u9580\u9010\u6BB5\u5B9A\u4F4D\u3002"},{id:"hazard-fog-north",type:"fog",name:"\u5317\u810A\u8584\u9727",x:680,y:-8,z:-610,radius:170,height:100,description:"\u96E2\u958B\u66F8\u5EAB\u5F8C\u7684\u7B2C\u4E00\u6BB5\u9727\u5E36\uFF1B\u5148\u78BA\u8A8D\u4E0B\u4E00\u9580\u65B9\u5411\u518D\u9032\u5165\u96F2\u5E55\u3002"}],dialogues:[{id:"dialogue-1",station:"island-reed",title:"\u7B2C\u4E00\u675F\u5149",text:"\u516B\u4EFD\u98A8\u5C64\u6A23\u672C\u6821\u6E96\u4E86\u8606\u5149\u98A8\u6A19\u3002\u73FE\u5728\u7A69\u5B9A\u904B\u9001\u5B9A\u5411\u661F\u5100\uFF1A\u53EF\u7E5E\u65B7\u6A4B\u5916\u7DE3\uFF0C\u4E5F\u53EF\u63A5\u4E0A\u96F7\u810A\u9AD8\u5C64\u7A84\u98A8\u5ECA\u3002"},{id:"dialogue-2",station:"island-storm",title:"\u88AB\u8A18\u4F4F\u7684\u822A\u7DDA",text:"\u5B9A\u5411\u661F\u5100\u5B89\u5168\u62B5\u9054\uFF0C\u516B\u6BB5\u7D00\u9304\u8B93\u9060\u661F\u91CD\u65B0\u6E05\u6670\u3002\u63A5\u8457\u5F9E\u4E0D\u540C\u9AD8\u5EA6\u548C\u65B9\u4F4D\u89C0\u6E2C\u9727\u6D77\uFF0C\u91CD\u5EFA\u5357\u65B9\u6B78\u661F\u81FA\u7684\u5EA7\u6A19\u3002"},{id:"dialogue-3",station:"island-dawn",title:"\u5BB6\u7684\u5EA7\u6A19",text:"\u516B\u500B\u65B9\u4F4D\u7BC0\u9EDE\u5DF2\u4EA4\u6703\u6210\u661F\u5716\u3002\u73FE\u5728\u6CBF\u6B78\u822A\u98A8\u5E36\u8FD4\u56DE\u6668\u98A8\u71DF\u5730\uFF0C\u8B93\u6240\u6709\u65C5\u4EBA\u90FD\u80FD\u627E\u5230\u56DE\u5BB6\u7684\u65B9\u5411\u3002"}],ending:{title:"\u98A8\u8A18\u5F97\u4F60\u7684\u6B78\u9014",text:"\u5929\u6587\u53F0\u91CD\u65B0\u4EAE\u8D77\u3002\u516D\u5EA7\u5CF6\u4E0D\u518D\u662F\u6563\u843D\u7684\u5CB8\uFF0C\u800C\u662F\u4E00\u5F35\u53EF\u4EE5\u91CD\u8D70\u3001\u53EF\u4EE5\u5206\u4EAB\u7684\u822A\u5716\u3002\u4E0B\u4E00\u8D9F\uFF0C\u8A66\u8457\u66F4\u5E73\u7A69\u3001\u66F4\u8FC5\u901F\uFF0C\u6216\u8B80\u5B8C\u98A8\u7559\u4E0B\u7684\u5341\u4E8C\u5C01\u4FE1\u3002"}}),Ni=di.filter(i=>i.station).map(i=>i.id),Bt=i=>di.find(e=>e.id===i)||di[0],ur=(i,e)=>!i.routeId||!e.activeChallenge&&i.style===(e.trackedHint?"safe":e.routeStyle);function Kh(i,e){if(e.y<i.y||e.y>i.y+i.height)return 0;let t;if(i.start&&i.end){let n=i.end.x-i.start.x,s=i.end.z-i.start.z,r=Math.max(0,Math.min(1,((e.x-i.start.x)*n+(e.z-i.start.z)*s)/(n*n+s*s)));t=Math.hypot(e.x-i.start.x-r*n,e.z-i.start.z-r*s)}else t=Math.hypot(e.x-i.x,e.z-i.z);return Math.max(0,1-Math.max(0,t-i.radius*.65)/(i.radius*.35))}var Oi=3,rp="aetherwake-save",Fi=i=>JSON.parse(JSON.stringify(i)),on=(i,e=0,t=1e9)=>Number.isFinite(i)&&i>=0?Math.min(t,i):e,Aa=(i,e)=>Array.isArray(i)?[...new Set(i.filter(t=>e.includes(t)))]:[],dr=i=>i!==null&&typeof i=="object"&&!Array.isArray(i),jh=(i,e)=>Math.trunc(on(i,0,e)),Jl=i=>Array.isArray(i.stages)?i.stages.length:0,ap=i=>Math.max(0,...ve.routes.filter(e=>e.mission===i).map(e=>Array.isArray(e.samples)?e.samples.length:0)),Ra=i=>Array.isArray(i)?[...new Set(i.filter(e=>typeof e=="string"&&e.length>0))]:[];function fi(i,e,t=!1){return dr(i)?Object.fromEntries(Object.entries(i).flatMap(([n,s])=>{if(e&&!e.includes(n)||!dr(s)||!Number.isFinite(s.time)||s.time<0)return[];let r=t?{time:on(s.time),assisted:s.assisted===!0,module:Sn.some(a=>a.id===s.module)?s.module:"turn",seed:Math.trunc(on(s.seed,1,4294967295))>>>0}:{time:on(s.time),score:on(s.score),stalls:Math.trunc(on(s.stalls)),assisted:s.assisted===!0};return[[n,r]]})):{}}function xs(){return{schemaVersion:Oi,seed:1,module:"turn",checkpoint:"island-camp",unlocked:["island-camp"],activated:[],relics:[],mainSamples:[0,0,0],courseStages:Object.fromEntries(ve.challenges.map(i=>[i.id,0])),challenges:[],completedChallenges:[],cargoStability:100,cargoDamage:0,elapsed:0,segmentStart:0,stalls:0,assist:!1,usedAssist:!1,routeStyle:"safe",completed:!1,records:{},routeRecords:{},legacyRecords:{},legacyRouteRecords:{},legacyChallenges:[],settings:{music:.35,sfx:.7,reducedMotion:!1,camera:"follow",quality:"auto"}}}function fr(i){if(!i||typeof i!="object"||Array.isArray(i)||i.schemaVersion!==Oi||!ve.islands.some(n=>n.id===i.checkpoint)||!Array.isArray(i.relics)||!Array.isArray(i.activated))return null;let e=xs();e.seed=Math.trunc(on(i.seed,1,4294967295))>>>0,e.module=Sn.some(n=>n.id===i.module)?i.module:"turn",e.checkpoint=i.checkpoint,e.unlocked=Aa(i.unlocked,ve.islands.map(n=>n.id)),e.unlocked=[...new Set(["island-camp",...e.unlocked,i.checkpoint])],e.relics=Aa(i.relics,ve.relics.map(n=>n.id)),e.mainSamples=e.mainSamples.map((n,s)=>jh(Array.isArray(i.mainSamples)?i.mainSamples[s]:0,ap(s+1)));for(let n of ve.challenges)e.courseStages[n.id]=jh(dr(i.courseStages)?i.courseStages[n.id]:0,Jl(n));let t=ve.challenges.filter(n=>Jl(n)>0&&e.courseStages[n.id]===Jl(n)).map(n=>n.id);e.challenges=Aa(i.challenges,t),e.completedChallenges=[...new Set([...Aa(i.completedChallenges,ve.challenges.map(n=>n.id)),...t])];for(let n of Ni)if(i.activated.includes(n))e.activated.push(n);else break;if(e.elapsed=on(i.elapsed),e.stalls=Math.trunc(on(i.stalls)),e.segmentStart=Number.isFinite(i.elapsed)&&i.elapsed>=0&&i.elapsed<=1e9&&Number.isFinite(i.segmentStart)&&i.segmentStart>=0&&i.segmentStart<=e.elapsed?i.segmentStart:null,e.cargoStability=on(i.cargoStability,100,100),e.cargoDamage=on(i.cargoDamage),e.assist=i.assist===!0,e.routeStyle=i.routeStyle==="shortcut"?"shortcut":"safe",e.usedAssist=i.usedAssist===!0||e.assist,e.completed=i.completed===!0&&e.activated.length===Ni.length&&i.checkpoint==="island-camp",dr(i.settings)){let n=i.settings;e.settings.music=on(n.music,.35,1),e.settings.sfx=on(n.sfx,.7,1),e.settings.reducedMotion=n.reducedMotion===!0,e.settings.camera=n.camera==="overhead"?"overhead":"follow",e.settings.quality=["auto","low","high"].includes(n.quality)?n.quality:"auto"}return e.records=fi(i.records,Sn.map(n=>n.id)),e.routeRecords=fi(i.routeRecords,ve.routes.map(n=>n.id),!0),e.legacyRecords=fi(i.legacyRecords),e.legacyRouteRecords=fi(i.legacyRouteRecords,null,!0),e.legacyChallenges=Ra(i.legacyChallenges),e}function op(i){if(i?.schemaVersion===Oi)return{save:fr(i),migrated:!1};let e=i?.schemaVersion===1||i?.schemaVersion===void 0&&i?.version===1;if(dr(i)&&(e||i.schemaVersion===2)){let t=xs(),n=e?{...t,...i,checkpoint:i.checkpoint??i.island??t.checkpoint,relics:i.relics??i.fragments??[],activated:i.activated??[]}:i,s=fr({...n,schemaVersion:Oi,segmentStart:null,mainSamples:t.mainSamples,courseStages:t.courseStages,cargoStability:100,cargoDamage:0,challenges:[],completedChallenges:[],records:{},routeRecords:{},legacyRecords:{...fi(i.legacyRecords),...fi(i.records)},legacyRouteRecords:{...fi(i.legacyRouteRecords,null,!0),...fi(i.routeRecords,null,!0)},legacyChallenges:[...Ra(i.legacyChallenges),...Ra(i.completedChallenges),...Ra(i.challenges)]});return{save:s,migrated:s!==null}}return{save:null,migrated:!1}}var Ca=class{constructor(e,t=rp){if(this.key=t,this.memory=xs(),this.storage=e,this.pendingWriteWarning=null,e===void 0)try{this.storage=globalThis.localStorage}catch{this.storage=null}}load(){if(this.pendingWriteWarning)return{save:Fi(this.memory),warning:this.pendingWriteWarning,migrated:!1};if(!this.storage)return{save:Fi(this.memory),warning:"\u700F\u89BD\u5668\u5132\u5B58\u4E0D\u53EF\u7528\uFF1B\u672C\u6B21\u9032\u5EA6\u50C5\u4FDD\u7559\u5728\u8A18\u61B6\u9AD4\u3002",migrated:!1};try{let e=this.storage.getItem(this.key);if(!e)return{save:Fi(this.memory),warning:null,migrated:!1};let t;try{t=JSON.parse(e)}catch{t=null}let n=op(t);return n.save?(this.memory=n.save,{save:Fi(this.memory),warning:n.migrated?"\u820A\u7248\u5B58\u6A94\u5DF2\u5B89\u5168\u5347\u7D1A\uFF1B\u4E0B\u4E00\u500B\u5B89\u5168\u4FDD\u5B58\u9EDE\u6703\u5BEB\u5165\u65B0\u683C\u5F0F\u3002":null,migrated:n.migrated}):{save:Fi(this.memory),warning:"\u5B58\u6A94\u5DF2\u640D\u58DE\u6216\u7248\u672C\u4E0D\u652F\u63F4\uFF1B\u539F\u59CB\u5B58\u6A94\u4ECD\u4FDD\u7559\uFF0C\u73FE\u5728\u4F7F\u7528\u5B89\u5168\u7684\u65B0\u9032\u5EA6\u3002",migrated:!1}}catch{return{save:Fi(this.memory),warning:"\u7121\u6CD5\u8B80\u53D6\u700F\u89BD\u5668\u5132\u5B58\uFF1B\u672C\u6B21\u9032\u5EA6\u50C5\u4FDD\u7559\u5728\u8A18\u61B6\u9AD4\u3002",migrated:!1}}}save(e){let t=fr({...this.memory,...e,schemaVersion:Oi,settings:{...this.memory.settings,...e?.settings}});if(!t)return{ok:!1,warning:"\u5B58\u6A94\u8CC7\u6599\u4E0D\u5B8C\u6574\uFF0C\u5DF2\u4FDD\u7559\u4E0A\u4E00\u500B\u5B89\u5168\u5B58\u6A94\u3002"};if(this.memory=t,!this.storage)return this.pendingWriteWarning="\u700F\u89BD\u5668\u5132\u5B58\u4E0D\u53EF\u7528\uFF1B\u672C\u6B21\u9032\u5EA6\u50C5\u4FDD\u7559\u5728\u8A18\u61B6\u9AD4\u3002",{ok:!1,warning:this.pendingWriteWarning};try{return this.storage.setItem(this.key,JSON.stringify(t)),this.pendingWriteWarning=null,{ok:!0,warning:null}}catch{return this.pendingWriteWarning="\u5132\u5B58\u7A7A\u9593\u4E0D\u8DB3\u6216\u88AB\u5C01\u9396\uFF1B\u76EE\u524D\u9032\u5EA6\u4ECD\u5728\u8A18\u61B6\u9AD4\uFF0C\u96E2\u958B\u524D\u8ACB\u4FDD\u7559\u6B64\u9801\u3002",{ok:!1,warning:this.pendingWriteWarning}}}clearProgress(){let e=Fi(this.memory.settings);return this.save({...xs(),settings:e})}};var Qh=({x:i,y:e,z:t})=>`${i},${e},${t}`,lp=({x:i,y:e,z:t})=>({x:i,y:e,z:t}),cp=({x:i,y:e,z:t})=>({x:i,y:e+26,z:t}),Kl=(i,e)=>Math.hypot(i.x-e.x,i.y-e.y,i.z-e.z);function hp(){let i=new Map,e=new Map,t=r=>{let a=Qh(r);return i.has(a)||i.set(a,{position:lp(r),edges:new Map}),a},n=(r,a)=>{if(r===a)return;let o=Kl(i.get(r).position,i.get(a).position);i.get(r).edges.set(a,o),i.get(a).edges.set(r,o)};for(let r of ve.routes.filter(a=>a.style==="safe")){let a;for(let o of r.waypoints){let l=t(o);a!==void 0&&n(a,l),a=l}}let s=[...i.keys()];for(let r of ve.islands){let a=cp(r),o=Qh(a);if(e.set(r.id,o),i.has(o))continue;let l=s.reduce((c,u)=>c===void 0||Kl(a,i.get(u).position)<Kl(a,i.get(c).position)?u:c,void 0);if(l===void 0)throw new Error("The safe transit network has no route waypoints.");t(a),n(o,l)}return{nodes:i,terminals:e}}var pr=hp();function eu(i,e){let t=pr.terminals.get(i),n=pr.terminals.get(e);if(t===void 0||n===void 0)throw new RangeError("Safe transit requires two known island IDs.");if(t===n)return[];let s=new Map([[t,0]]),r=new Map,a=new Set(pr.nodes.keys());for(;a.size;){let o,l=1/0;for(let c of a){let u=s.get(c)??1/0;u<l&&(o=c,l=u)}if(o===void 0)break;if(o===n){let c=[];for(let u=n;u!==t;u=r.get(u))c.push(pr.nodes.get(u).position);return c.reverse().map(u=>({...u,radius:24,name:"\u5B89\u5168\u63A5\u99C1\u98A8\u6A19",instruction:"\u6CBF\u5BEC\u98A8\u5ECA\u98DB\u5411\u63A5\u99C1\u6A19\uFF1B\u62B5\u5CF6\u5F8C\u518D\u524D\u5F80\u9060\u5F81\u5165\u53E3\u3002"}))}a.delete(o);for(let[c,u]of pr.nodes.get(o).edges){if(!a.has(c))continue;let h=l+u;h<(s.get(c)??1/0)&&(s.set(c,h),r.set(c,o))}}throw new Error(`No safe transit route connects ${i} to ${e}.`)}var Bi=(i,e,t)=>Math.max(e,Math.min(t,i)),tu=i=>JSON.parse(JSON.stringify(i)),zi=(i,e)=>Math.hypot(i.x-e.x,i.z-e.z),up=i=>{if(Number.isFinite(Number(i)))return Math.trunc(Number(i))>>>0;let e=2166136261;for(let t of String(i))e=Math.imul(e^t.charCodeAt(0),16777619);return e>>>0},vs=class{constructor({seed:e=1,module:t="turn",save:n}={}){this.events=[],this.persisted=fr(n)||xs(),this._setup({seed:n?this.persisted.seed:e,module:n?this.persisted.module:t,resume:!!n})}_setup({seed:e,module:t,resume:n=!1}){let s=this.persisted,r=n?s.checkpoint:"island-camp",a=Bt(r);this.state={seed:up(e),module:Sn.some(o=>o.id===t)?t:"turn",player:{x:a.x,y:a.y,z:a.z,vx:0,vy:0,vz:0,heading:0,grounded:!0,gliding:!1,energy:100,braking:!1},elapsed:n?s.elapsed:0,checkpoint:r,activated:n?[...s.activated]:[],relics:[...s.relics],challenges:n?[...s.challenges]:[],completedChallenges:[...s.completedChallenges],unlocked:[...s.unlocked],stalls:n?s.stalls:0,status:n&&s.completed?"complete":"ready",assist:s.assist,usedAssist:n?s.usedAssist:s.assist,routeStyle:s.routeStyle,segmentFailures:0,distance:0,wind:[],hazard:null,lowEnergy:!1,lastLanding:{islandId:a.id,precise:!0},score:0,rating:null,nearby:null,objective:null,routeTimes:[],segmentStart:n?s.segmentStart:0,airTime:0,challengeProgress:{},activeChallenge:null,challengeHint:null,mainSamples:n?[...s.mainSamples||[0,0,0]]:[0,0,0],surveyHint:null,trackedHint:null,transitWaypoints:[],transitIndex:0,courseStages:{...s.courseStages||{}},cargoStability:n?s.cargoStability??100:100,cargoDamage:n&&s.cargoDamage||0,navigationMessage:null},this.events=[],this.suppressedChallengeEntries=new Set,this._nearby(),this._objective(),this.state.status==="complete"&&this._rating()}get player(){return this.state.player}get elapsed(){return this.state.elapsed}get checkpoint(){return this.state.checkpoint}get activated(){return this.state.activated}get relics(){return this.state.relics}get challenges(){return this.state.challenges}get stalls(){return this.state.stalls}get status(){return this.state.status}set status(e){["ready","running","paused","complete"].includes(e)&&(this.state.status=e)}get assist(){return this.state.assist}set assist(e){this.setAssist(e)}get routeStyle(){return this.state.routeStyle}set routeStyle(e){this.setRouteStyle(e)}emit(e,t={}){this.events.push({type:e,...t})}launch(){return this.state.status==="ready"||this.state.status==="paused"?(this.state.status="running",this.emit("start"),!0):!1}setPaused(e){e&&this.state.status==="running"?(this.state.status="paused",this.emit("pause")):!e&&this.state.status==="paused"&&(this.state.status="running",this.emit("resume"))}setAssist(e){this.state.assist=!!e,this.state.usedAssist||=!!e,this.emit("assist",{enabled:!!e})}setRouteStyle(e){this.state.routeStyle=e==="shortcut"?"shortcut":"safe",this._objective()}reset({seed:e=this.state.seed,module:t=this.state.module}={}){this.persisted=this.saveData(),this._setup({seed:e,module:t}),this.emit("reset")}snapshot(){return tu(this.state)}drainEvents(){let e=this.events;return this.events=[],e}courseStage(e){if(!e?.stages?.length)return null;let t=this.state.courseStages[e.id]||0;return e.stages[t>=e.stages.length?0:t]}courseEntry(e){let t=this.courseStage(e);if(!t)return e;let n=Bt(t.fromIslandId);return{id:e.id,name:e.name,radius:e.radius,minSpeed:e.minSpeed||0,minEnergy:e.minEnergy||0,x:n.x+18,y:n.y+22,z:n.z-18}}trackChallenge(e){let t=ve.challenges.find(s=>s.id===e);if(!t||this.state.challenges.includes(e)||!this.player.grounded)return!1;this.state.activeChallenge&&this.cancelChallenge();let n=this.courseStage(t);return this.state.transitWaypoints=eu(this.state.checkpoint,n?.fromIslandId||t.islandId),this.state.transitIndex=0,this._trackedTarget(t),!0}_trackedTarget(e){let t=this.state,n=this.courseStage(e),s=t.transitWaypoints[t.transitIndex];t.trackedHint={id:e.id,name:e.name,...s||this.courseEntry(e),stageName:n?.name,stage:(t.courseStages[e.id]||0)%(e.stages?.length||1)+1,stageTotal:e.stages?.length||1,entry:!s,transit:!!s,transitStep:t.transitIndex+1,transitTotal:t.transitWaypoints.length,step:0,total:(n?.gates?.length||8)+1,instruction:s?`\u6CBF\u5B89\u5168\u63A5\u99C1\u98A8\u6A19\u524D\u5F80${Bt(n?.fromIslandId||e.islandId).name}\u3002\u4E0D\u9700\u505C\u7559\u7B49\u5F85\u3002`:`\u5230${Bt(n?.fromIslandId||e.islandId).name}\u7684\u91D1\u74B0\u958B\u59CB\u672C\u968E\u6BB5\u3002\u5DF2\u4EA4\u4ED8\u968E\u6BB5\u4E0D\u7528\u91CD\u8DD1\u3002`},t.trackedHint.id=e.id}_returnToCheckpoint(){let e=this.state,t=Bt(e.checkpoint);Object.assign(e.player,{x:t.x,y:t.y,z:t.z,vx:0,vy:0,vz:0,heading:0,grounded:!0,gliding:!1,braking:!1,energy:100}),e.wind=[],e.hazard=null,e.lowEnergy=!1}cancelChallenge(){let e=this.state,t=e.activeChallenge||e.trackedHint?.id;return t?(this.suppressedChallengeEntries.add(t),e.cargoDamage+=100-e.cargoStability,e.cargoStability=100,delete e.challengeProgress[t],e.activeChallenge=null,e.challengeHint=null,e.trackedHint=null,e.transitWaypoints=[],e.transitIndex=0,this._returnToCheckpoint(),this._objective(),this._nearby(),this.emit("challenge-reset",{id:t,reason:"cancel",message:"\u5DF2\u9000\u51FA\u4E26\u8FD4\u56DE\u6700\u5F8C\u5B89\u5168\u5CF6\uFF1B\u4E3B\u7DDA\u6A23\u672C\u8207\u5DF2\u4EA4\u4ED8\u968E\u6BB5\u4FDD\u7559\uFF0C\u4E0D\u52A0\u5931\u901F\u61F2\u7F70\u3002"}),this.emit("save"),!0):!1}saveData(){let e=this.state,t={...this.persisted,schemaVersion:Oi,seed:e.seed,module:e.module,checkpoint:e.checkpoint,unlocked:[...e.unlocked],activated:[...e.activated],relics:[...e.relics],challenges:[...e.challenges],completedChallenges:[...e.completedChallenges],mainSamples:[...e.mainSamples],courseStages:{...e.courseStages},cargoStability:e.cargoStability,cargoDamage:e.cargoDamage,elapsed:e.elapsed,segmentStart:e.segmentStart,stalls:e.stalls,assist:e.assist,usedAssist:e.usedAssist,routeStyle:e.routeStyle,completed:e.status==="complete"},n=Ni.every((s,r)=>e.mainSamples[r]>=(ve.routes.find(a=>a.mission===r+1)?.samples?.length||1/0));if(e.status==="complete"&&n){let s=t.records[e.module];(!s||s.assisted&&!e.usedAssist||s.assisted===e.usedAssist&&e.elapsed<s.time)&&(t.records={...t.records,[e.module]:{time:e.elapsed,score:e.score,stalls:e.stalls,assisted:e.usedAssist}})}t.routeRecords={...t.routeRecords};for(let s of e.routeTimes){let r=`route-${s.mission}-${s.style}`,a=t.routeRecords[r];(!a||a.assisted&&!e.usedAssist||a.assisted===e.usedAssist&&s.seconds<a.time)&&(t.routeRecords[r]={time:s.seconds,assisted:e.usedAssist,module:e.module,seed:e.seed})}return this.persisted=tu(t),t}_objective(){let e=this.state,t=Bt(Ni[e.activated.length]||"island-camp");e.objective={islandId:t.id,name:t.name,step:e.activated.length+1,total:4,x:t.x,y:t.y,z:t.z,routeId:`route-${e.activated.length+1}-${e.routeStyle}`,text:e.activated.length<3?`\u62B5\u9054${t.name}\uFF0C\u5728\u89C0\u6E2C\u53F0\u65C1\u6309 E \u555F\u52D5`:"\u8FD4\u56DE\u6668\u98A8\u71DF\u5730\uFF0C\u5728\u71DF\u706B\u65C1\u6309 E \u5B8C\u6210\u9060\u5F81"};let n=ve.routes.find(a=>a.id===e.objective.routeId),s=e.mainSamples[e.activated.length]||0,r=n?.samples?.[s];e.surveyHint=r?{...r,step:s+1,total:n.samples.length,mission:e.activated.length+1}:null,e.surveyHint&&(e.objective.text=`${e.surveyHint.name} ${s+1}/${n.samples.length} \xB7 ${r.instruction}`)}_nearby(){let e=this.state,t=e.player,n=ve.islands.find(o=>zi(o,t)<o.radius-1&&Math.abs(t.y-o.y)<2.5),s=ve.challenges.find(o=>o.id===e.activeChallenge),r=this.courseStage(s),a=r&&(e.challengeProgress[s.id]||0)>=r.gates.length;e.nearby=n&&t.grounded&&zi(n,t)<13?{islandId:n.id,station:n.station,name:n.name,canInteract:e.activeChallenge?!!a&&n.id===r?.toIslandId:n.id===e.objective?.islandId&&!e.surveyHint&&!e.trackedHint,message:e.activeChallenge?"E \xB7 \u4EA4\u4ED8\u6E2C\u98A8\u8CC7\u6599":n.id==="island-camp"?"E \xB7 \u8FD4\u56DE\u71DF\u5730":n.station?"E \xB7 \u555F\u52D5\u89C0\u6E2C\u53F0":"\u5B89\u5168\u88DC\u7D66\u5CF6"}:null}interact(){let e=this.state;if(e.status!=="running")return!1;if(this._nearby(),!e.nearby)return this.emit("hint",{message:"\u5148\u5B89\u5168\u843D\u5730\uFF0C\u518D\u9760\u8FD1\u5CF6\u4E2D\u592E\u7684\u89C0\u6E2C\u53F0\u3002"}),!1;if(e.activeChallenge){let n=ve.challenges.find(r=>r.id===e.activeChallenge),s=this.courseStage(n);return!s||!e.nearby.canInteract?(this.emit("hint",{message:"\u5148\u4F9D\u5E8F\u5B8C\u6210\u672C\u6BB5\u89C0\u6E2C\uFF0C\u518D\u843D\u5230\u4EA4\u4ED8\u5CF6\u4E2D\u592E\u3002"}),!1):(e.courseStages[n.id]=(e.courseStages[n.id]||0)+1,delete e.challengeProgress[n.id],e.activeChallenge=null,e.challengeHint=null,e.courseStages[n.id]>=n.stages.length?(e.challenges.includes(n.id)||e.challenges.push(n.id),e.completedChallenges.includes(n.id)||e.completedChallenges.push(n.id),this.emit("challenge",{id:n.id,name:n.name})):(this.trackChallenge(n.id),this.emit("challenge-stage",{id:n.id,name:n.name,step:e.courseStages[n.id],total:n.stages.length,message:`${s.name}\u5DF2\u4EA4\u4ED8\u4E26\u4FDD\u5B58\u3002\u5F9E\u672C\u5CF6\u7684\u91D1\u74B0\u63A5\u7E8C\u4E0B\u4E00\u6BB5\uFF0C\u6216\u5148\u56DE\u4E3B\u7DDA\u3002`})),e.cargoDamage+=100-e.cargoStability,e.cargoStability=100,this._objective(),this._nearby(),this._score(),this.emit("save"),!0)}if(e.trackedHint)return this.emit("hint",{message:"\u76EE\u524D\u6B63\u524D\u5F80\u6E2C\u98A8\u9060\u5F81\u3002\u5148\u5B8C\u6210\u9060\u5F81\uFF0C\u6216\u9000\u51FA\u4E26\u8FD4\u56DE\u5B89\u5168\u5CF6\u5F8C\u4EA4\u4ED8\u4E3B\u7DDA\u3002"}),!1;let t=Ni[e.activated.length];return e.nearby.islandId===t?e.surveyHint?(this.emit("hint",{message:`\u5C1A\u7F3A\u89C0\u6E2C ${e.surveyHint.step}/${e.surveyHint.total}\uFF1A${e.surveyHint.name}\u3002\u6CBF\u91D1\u8272\u822A\u6A19\u5B8C\u6210\u5F8C\u518D\u4EA4\u4ED8\u3002`}),!1):(e.activated.length===1&&(e.cargoDamage+=100-e.cargoStability),e.cargoStability=100,e.activated.push(t),e.segmentFailures=0,Number.isFinite(e.segmentStart)&&e.routeTimes.push({mission:e.activated.length,style:e.routeStyle,seconds:e.elapsed-e.segmentStart}),e.segmentStart=e.elapsed,this.emit("station",{islandId:t,index:e.activated.length,dialogue:ve.dialogues[e.activated.length-1]}),this._objective(),this._nearby(),this._score(),this.emit("save"),!0):e.nearby.islandId==="island-camp"&&e.activated.length===3?(Number.isFinite(e.segmentStart)&&e.routeTimes.push({mission:4,style:e.routeStyle,seconds:e.elapsed-e.segmentStart}),e.status="complete",this._rating(),this.emit("complete",{rating:e.rating,score:e.score,ending:ve.ending}),this.emit("save"),!0):(this.emit("hint",{message:`\u4E0B\u4E00\u500B\u76EE\u6A19\uFF1A${e.objective.name}\u3002\u5DF2\u9EDE\u4EAE\u7684\u89C0\u6E2C\u53F0\u4E0D\u9700\u518D\u6B21\u555F\u52D5\u3002`}),!1)}_score(){let e=this.state;e.score=Math.max(0,Math.round(e.activated.length*300+e.relics.length*100+e.challenges.length*250+(e.status==="complete"?1500:0)-e.stalls*75-e.elapsed*.7))}_rating(){let e=this.state;this._score();let t=ve.relics.length,n=ve.challenges.length,r=e.relics.length>=t&&e.challenges.length>=n?"S":e.relics.length*3>=t*2?"A":e.relics.length*3>=t?"B":"C",a=e.relics.length<t?`\u518D\u627E\u51FA ${t-e.relics.length} \u4EFD\u6587\u660E\u788E\u7247`:e.challenges.length<n?`\u518D\u5B8C\u6210 ${n-e.challenges.length} \u500B\u6E2C\u98A8\u6311\u6230`:e.stalls?"\u6311\u6230\u96F6\u5931\u901F\u8FD4\u822A":"\u63DB\u4E0A\u53E6\u4E00\u500B\u6A21\u7D44\uFF0C\u6539\u5584\u822A\u7A0B\u6642\u9593";e.rating={speed:e.elapsed<480?"S":e.elapsed<720?"A":e.elapsed<1080?"B":"C",stability:e.stalls===0&&e.cargoDamage<20?"S":e.stalls<=2&&e.cargoDamage<65?"A":e.stalls<=5?"B":"C",exploration:r,assisted:e.usedAssist,next:a}}_recover(e){let t=this.state,n=Bt(t.checkpoint),s=t.activeChallenge||t.trackedHint?.id;if(t.cargoDamage+=100-t.cargoStability,t.cargoStability=100,t.activeChallenge){let r=t.activeChallenge;delete t.challengeProgress[r],t.activeChallenge=null,t.challengeHint=null,this.emit("challenge-reset",{id:r,reason:"stall",message:"\u672C\u6BB5\u6E2C\u98A8\u4E2D\u65B7\uFF1B\u5DF2\u4EA4\u4ED8\u968E\u6BB5\u4FDD\u7559\uFF0C\u56DE\u91D1\u74B0\u91CD\u8A66\u76EE\u524D\u968E\u6BB5\u3002"})}this._returnToCheckpoint(),s&&this.trackChallenge(s),t.stalls++,t.segmentFailures++,t.elapsed+=8,t.wind=[],t.hazard=null,t.lowEnergy=!1,this.emit("stall",{reason:e,islandId:n.id,penalty:8,message:`${e}\uFF0C\u5DF2\u56DE\u5230${n.name}\uFF1B\u672C\u6BB5\u52A0\u8A08 8 \u79D2\uFF0C\u788E\u7247\u4FDD\u7559\u3002`}),t.segmentFailures===3&&!t.assist&&this.emit("assist-offer",{message:"\u9019\u4E00\u6BB5\u5DF2\u5931\u901F\u4E09\u6B21\uFF0C\u53EF\u5728\u8A2D\u5B9A\u958B\u555F\u98A8\u7DDA\u8F14\u52A9\u3002"}),this._nearby(),this._score(),this.emit("save")}_collect(){let e=this.state,t=e.player;for(let c of ve.relics)!e.relics.includes(c.id)&&zi(t,c)<c.radius&&Math.abs(t.y-c.y)<4&&(e.relics.push(c.id),this.emit("relic",{id:c.id,name:c.name,text:c.text}),this.emit("save"));if(!t.gliding)return;let n=c=>this._sampleSatisfied(c);if(!e.activeChallenge){if(e.trackedHint?.transit&&n(e.trackedHint)){let h=ve.challenges.find(f=>f.id===e.trackedHint.id);e.transitIndex++,this._trackedTarget(h)}if(!e.trackedHint&&e.surveyHint&&n(e.surveyHint)){let h=e.surveyHint;e.mainSamples[e.activated.length]++,this.emit("survey",{id:h.id,name:h.name,step:h.step,total:h.total,message:`${h.name}\u5DF2\u8A18\u9304 \xB7 ${h.step}/${h.total}`}),this._objective(),this.emit("save")}for(let h of this.suppressedChallengeEntries){let f=ve.challenges.find(p=>p.id===h),d=this.courseEntry(f);Math.hypot(t.x-d.x,t.y-d.y,t.z-d.z)>d.radius+4&&this.suppressedChallengeEntries.delete(h)}let c=ve.challenges.find(h=>e.trackedHint?.entry&&h.id===e.trackedHint.id&&!e.challenges.includes(h.id)&&!this.suppressedChallengeEntries.has(h.id)&&n(this.courseEntry(h)));if(!c)return;(e.courseStages[c.id]||0)>=(c.stages?.length||1/0)&&(e.courseStages[c.id]=0),e.activeChallenge=c.id,e.challengeProgress[c.id]=0,e.trackedHint=null,e.transitWaypoints=[],e.transitIndex=0,e.cargoDamage+=100-e.cargoStability,e.cargoStability=100,this._challengeHint(c);let u=this.courseStage(c);this.emit("challenge-start",{id:c.id,name:c.name,step:0,total:(u?.gates||c.gates).length+1,message:u?`${u.name}\uFF1A${u.description}`:c.description});return}let s=ve.challenges.find(c=>c.id===e.activeChallenge),r=this.courseStage(s),a=r?.gates||s.gates,o=e.challengeProgress[s.id],l=a[o]||(r?null:s);l&&n(l)&&(o<a.length?(e.challengeProgress[s.id]++,this.emit("challenge-gate",{id:s.id,name:s.name,step:o+1,total:a.length+1}),this._challengeHint(s)):(e.challengeProgress[s.id]=a.length+1,e.challenges.push(s.id),e.completedChallenges.includes(s.id)||e.completedChallenges.push(s.id),t.energy=Math.min(100,t.energy+15),e.activeChallenge=null,e.challengeHint=null,this.emit("challenge",{id:s.id,name:s.name}),this.emit("save")))}_sampleSatisfied(e){if(!e)return!1;let t=this.player,n=Math.hypot(t.vx,t.vz);if(Math.hypot(t.x-e.x,t.y-e.y,t.z-e.z)>=e.radius||n<(e.minSpeed||0)||n>(e.maxSpeed??1/0)||t.energy<(e.minEnergy||0)||Number.isFinite(e.maxVerticalSpeed)&&Math.abs(t.vy)>e.maxVerticalSpeed)return!1;if(e.heading){let s=Math.hypot(e.heading.x,e.heading.z);if(n<1||(t.vx*e.heading.x+t.vz*e.heading.z)/(n*s)<(e.heading.minDot??.5))return!1}return!0}_challengeHint(e){let t=this.state,n=this.courseStage(e),s=n?.gates||e.gates,r=t.challengeProgress[e.id],a=n&&r>=s.length,o=s[r]||(a?{...Bt(n.toIslandId),radius:12,instruction:"\u5B89\u5168\u843D\u5730\uFF0C\u8D70\u5230\u5CF6\u4E2D\u592E\u6309 E \u4EA4\u4ED8\u3002"}:e);t.challengeHint={...o,id:e.id,name:e.name,stageName:n?.name,stage:(t.courseStages[e.id]||0)+1,stageTotal:e.stages?.length||1,step:r+1,total:s.length+1,returning:r===s.length,landing:!!a}}step(e={},t=1/60){let n=this.state,s=n.player;if(n.status!=="running"||!Number.isFinite(t)||t<=0)return;t=Math.min(t,.1),n.elapsed+=t;let r=Sn.find(g=>g.id===n.module),a=Bi(Number(e.x)||0,-1,1),o=Bi(Number(e.z)||0,-1,1),l=Math.hypot(a,o);l>1&&(a/=l,o/=l,l=1),e.glide&&(s.grounded?(s.grounded=!1,s.gliding=!0,s.vy=15,s.y+=.15,this.emit("glide",{open:!0})):(s.gliding=!s.gliding,this.emit("glide",{open:s.gliding})));let c=s.x,u=s.z,h=s.y,f=s.vx,d=s.vz,p=Math.hypot(s.vx,s.vz),y=n.stalls;if(s.braking=!!e.brake,s.grounded)s.vx=a*10,s.vz=o*10,s.vy=0,s.energy=Math.min(100,s.energy+t*28),s.x+=s.vx*t,s.z+=s.vz*t,ve.islands.find(m=>zi(m,s)<=m.radius-1.5&&Math.abs(s.y-m.y)<2)||(s.grounded=!1,s.gliding=!1,s.vy=0,this.emit("edge",{message:"\u5DF2\u96E2\u958B\u5CF6\u7DE3\uFF0C\u6309\u5C55\u5E06\u63A5\u4F4F\u98A8\uFF01"})),n.wind=[],n.hazard=null;else{n.airTime+=t;let g=ve.challenges.find(N=>N.id===n.activeChallenge),m=this.courseStage(g),E=(m?.winds||g?.winds||[]).filter(N=>N.gate===n.challengeProgress[g.id]),v=[...ve.winds.filter(N=>ur(N,n)),...E].map(N=>({wind:N,weight:Kh(N,s)})).filter(({weight:N})=>N>0),_=n.wind[0];n.wind=[...new Set(v.map(({wind:N})=>N.type))],n.wind[0]&&n.wind[0]!==_&&this.emit("wind",{wind:n.wind[0]});let T=0,w=0,R=0,I=0,S=0,M=l>.06?a/l:Math.sin(s.heading),P=l>.06?o/l:-Math.cos(s.heading);for(let{wind:N,weight:k}of v)if(N.type==="thermal")T=Math.max(T,Bi((N.ceiling-s.y)*.38+1.7,-1.2,N.strength)*k),w=Math.max(w,(N.charge??9)*k);else if(N.type==="tailwind"){let Q=Math.max(0,M*N.direction.x+P*N.direction.z);S=Math.max(S,N.strength*Q*k*(r.id==="tailwind"?1.75:1)),T=Math.max(T,Bi((N.ceiling-s.y)*.18+1.7,-1.2,N.liftCap??4.4)*k),w=Math.max(w,(N.charge??(N.style==="safe"?4.5:2.1))*k)}else{let Q=n.seed%1009/1009*Math.PI*2,le=Math.max(0,Math.sin(n.elapsed/N.period*Math.PI*2+Q));R+=N.direction.x*N.strength*le*k,I+=N.direction.z*N.strength*le*k}n.hazard=null;let F=0;for(let N of[...ve.hazards,...m?.hazard?[m.hazard]:g?.hazard?[g.hazard]:[]])zi(N,s)<N.radius&&s.y>=N.y&&s.y<=N.y+N.height&&(n.hazard=N.type,N.type==="thunder"&&Math.sin(n.elapsed/N.period*Math.PI*2+n.seed%19)>.15&&(F=9));let V=s.braking?5.2:s.gliding?16.2*r.speed+S:10,$=1-Math.exp(-t*(s.braking?7:2.8*r.turn));if(s.vx+=(M*V+(s.braking?0:R)-s.vx)*$,s.vz+=(P*V+(s.braking?0:I)-s.vz)*$,s.gliding){let N=s.braking?-7:-1.75+T+(n.assist&&s.y<n.objective.y+8?3:0);s.vy+=(N-s.vy)*(1-Math.exp(-t*2));let k=l>.06&&p>5?Math.abs(s.vx/Math.max(1,p)-M)*1.5:0,Q=(3.2*r.energy+k+F)*(n.assist?.6:1);s.energy=Bi(s.energy+((s.braking?0:w)-Q)*t,0,100);let le=s.energy<=Math.max(6.4,(Q-w)*2);le&&!n.lowEnergy&&this.emit("low-energy",{message:"\u5E06\u80FD\u91CF\u4E0D\u8DB3\uFF1A\u7ACB\u5373\u9032\u5165\u71B1\u6D41\uFF0C\u6216\u6E1B\u901F\u843D\u5CF6\u3002"}),n.lowEnergy=le}else s.vy-=16*t,s.vy=Math.max(-25,s.vy);s.x+=s.vx*t,s.z+=s.vz*t,s.y+=s.vy*t;let L=ve.islands.find(N=>zi(N,s)<=N.radius-1.5&&h>=N.y-.4&&s.y<=N.y+.1&&s.vy<=0);if(L){let N=Math.hypot(s.vx,s.vz)<8.5;Object.assign(s,{y:L.y,vy:0,grounded:!0,gliding:!1,energy:Math.min(100,s.energy+(N?20:7))}),n.checkpoint=L.id,n.lastLanding={islandId:L.id,precise:N},n.unlocked.includes(L.id)||n.unlocked.push(L.id),this.emit("land",{islandId:L.id,name:L.name,precise:N}),this.emit("save")}else for(let N of ve.islands){let k=N.y-s.y;if(k<=.1||k>=38)continue;let Q=N.radius*Math.max(.15,1-Math.max(0,k-2)/43)+.75,le=zi(s,N);if(le>=Q)continue;let ye=le>.001?(s.x-N.x)/le:1,Ne=le>.001?(s.z-N.z)/le:0;s.x=N.x+ye*Q,s.z=N.z+Ne*Q;let Xe=s.vx*ye+s.vz*Ne;Xe<0&&(s.vx-=Xe*ye,s.vz-=Xe*Ne)}if((g?["crosswind","stability"].includes(g.kind):n.activated.length===1)&&s.gliding&&p>5){let N=Math.hypot(s.vx,s.vz),k=Math.acos(Bi((f*s.vx+d*s.vz)/Math.max(.01,p*N),-1,1))/t,Q=Math.max(0,k-.85)*4+Math.max(0,-s.vy-5)*.5;n.cargoStability=Bi(n.cargoStability-Q*t,0,100)}!s.grounded&&(s.y<-55||s.energy<=0||Math.hypot(s.x,s.z)>(ve.boundsRadius||1e3))&&this._recover(s.energy<=0?"\u5E06\u80FD\u91CF\u8017\u76E1":"\u96E2\u958B\u5B89\u5168\u822A\u57DF")}Math.hypot(s.vx,s.vz)>.5&&(s.heading=Math.atan2(s.vx,-s.vz)),n.stalls===y&&(n.distance+=Math.hypot(s.x-c,s.z-u)),this._collect(),this._nearby(),this._score()}};var Vu=0,Oc=1,Gu=2;var Bc=1,Do=2,Hn=3,jn=0,zt=1,xn=2,ri=0,Yi=1,zc=2,kc=3,Hc=4,Wu=5,Si=100,Xu=101,$u=102,qu=103,Yu=104,Zu=200,Ju=201,Ku=202,ju=203,ro=204,ao=205,Qu=206,ed=207,td=208,nd=209,id=210,sd=211,rd=212,ad=213,od=214,Uo=0,No=1,Fo=2,Zi=3,Oo=4,Bo=5,zo=6,ko=7,Vc=0,ld=1,cd=2,ai=0,hd=1,ud=2,dd=3,Ho=4,fd=5,pd=6,md=7,Tc="attached",gd="detached",Gc=300,ss=301,rs=302,Vo=303,Go=304,fa=306,oo=1e3,Mi=1001,lo=1002,jt=1003,yd=1004;var pa=1005;var An=1006,Wo=1007;var Ti=1008;var Dn=1009,Wc=1010,Xc=1011,Zs=1012,Xo=1013,Ai=1014,vn=1015,Js=1016,$o=1017,qo=1018,Ks=1020,$c=35902,qc=35899,Yc=1021,Zc=1022,mn=1023,Fs=1026,js=1027,Yo=1028,Zo=1029,Jc=1030,Jo=1031;var Ko=1033,ma=33776,ga=33777,ya=33778,_a=33779,jo=35840,Qo=35841,el=35842,tl=35843,nl=36196,il=37492,sl=37496,rl=37808,al=37809,ol=37810,ll=37811,cl=37812,hl=37813,ul=37814,dl=37815,fl=37816,pl=37817,ml=37818,gl=37819,yl=37820,_l=37821,xl=36492,vl=36494,Ml=36495,Sl=36283,bl=36284,El=36285,wl=36286,Tl=2200,_d=2201,xd=2202,Ar=2300,co=2301,so=2302,Xi=2400,$i=2401,Rr=2402,Al=2500,vd=2501;var Md=3200,Sd=3201;var Kc=0,bd=1,oi="",qt="srgb",Ji="srgb-linear",Cr="linear",at="srgb";var Wi=7680;var Ac=519,Ed=512,wd=513,Td=514,jc=515,Ad=516,Rd=517,Cd=518,Id=519,Rc=35044;var Qc="300 es",Tn=2e3,Ir=2001;var On=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){let n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){let n=this._listeners;if(n===void 0)return;let s=n[e];if(s!==void 0){let r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let n=t[e.type];if(n!==void 0){e.target=this;let s=n.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,e);e.target=null}}},Ht=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],nu=1234567,br=Math.PI/180,Os=180/Math.PI;function li(){let i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Ht[i&255]+Ht[i>>8&255]+Ht[i>>16&255]+Ht[i>>24&255]+"-"+Ht[e&255]+Ht[e>>8&255]+"-"+Ht[e>>16&15|64]+Ht[e>>24&255]+"-"+Ht[t&63|128]+Ht[t>>8&255]+"-"+Ht[t>>16&255]+Ht[t>>24&255]+Ht[n&255]+Ht[n>>8&255]+Ht[n>>16&255]+Ht[n>>24&255]).toLowerCase()}function Je(i,e,t){return Math.max(e,Math.min(t,i))}function eh(i,e){return(i%e+e)%e}function dp(i,e,t,n,s){return n+(i-e)*(s-n)/(t-e)}function fp(i,e,t){return i!==e?(t-i)/(e-i):0}function Er(i,e,t){return(1-t)*i+t*e}function pp(i,e,t,n){return Er(i,e,1-Math.exp(-t*n))}function mp(i,e=1){return e-Math.abs(eh(i,e*2)-e)}function gp(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*(3-2*i))}function yp(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*i*(i*(i*6-15)+10))}function _p(i,e){return i+Math.floor(Math.random()*(e-i+1))}function xp(i,e){return i+Math.random()*(e-i)}function vp(i){return i*(.5-Math.random())}function Mp(i){i!==void 0&&(nu=i);let e=nu+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function Sp(i){return i*br}function bp(i){return i*Os}function Ep(i){return(i&i-1)===0&&i!==0}function wp(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function Tp(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function Ap(i,e,t,n,s){let r=Math.cos,a=Math.sin,o=r(t/2),l=a(t/2),c=r((e+n)/2),u=a((e+n)/2),h=r((e-n)/2),f=a((e-n)/2),d=r((n-e)/2),p=a((n-e)/2);switch(s){case"XYX":i.set(o*u,l*h,l*f,o*c);break;case"YZY":i.set(l*f,o*u,l*h,o*c);break;case"ZXZ":i.set(l*h,l*f,o*u,o*c);break;case"XZX":i.set(o*u,l*p,l*d,o*c);break;case"YXY":i.set(l*d,o*u,l*p,o*c);break;case"ZYZ":i.set(l*p,l*d,o*u,o*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function Us(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function $t(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}var as={DEG2RAD:br,RAD2DEG:Os,generateUUID:li,clamp:Je,euclideanModulo:eh,mapLinear:dp,inverseLerp:fp,lerp:Er,damp:pp,pingpong:mp,smoothstep:gp,smootherstep:yp,randInt:_p,randFloat:xp,randFloatSpread:vp,seededRandom:Mp,degToRad:Sp,radToDeg:bp,isPowerOfTwo:Ep,ceilPowerOfTwo:wp,floorPowerOfTwo:Tp,setQuaternionFromProperEuler:Ap,normalize:$t,denormalize:Us},fe=class i{constructor(e=0,t=0){i.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6],this.y=s[1]*t+s[4]*n+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Je(this.x,e.x,t.x),this.y=Je(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=Je(this.x,e,t),this.y=Je(this.y,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Je(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(Je(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),s=Math.sin(t),r=this.x-e.x,a=this.y-e.y;return this.x=r*n-a*s+e.x,this.y=r*s+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},Yt=class{constructor(e=0,t=0,n=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=s}static slerpFlat(e,t,n,s,r,a,o){let l=n[s+0],c=n[s+1],u=n[s+2],h=n[s+3],f=r[a+0],d=r[a+1],p=r[a+2],y=r[a+3];if(o===0){e[t+0]=l,e[t+1]=c,e[t+2]=u,e[t+3]=h;return}if(o===1){e[t+0]=f,e[t+1]=d,e[t+2]=p,e[t+3]=y;return}if(h!==y||l!==f||c!==d||u!==p){let g=1-o,m=l*f+c*d+u*p+h*y,E=m>=0?1:-1,v=1-m*m;if(v>Number.EPSILON){let T=Math.sqrt(v),w=Math.atan2(T,m*E);g=Math.sin(g*w)/T,o=Math.sin(o*w)/T}let _=o*E;if(l=l*g+f*_,c=c*g+d*_,u=u*g+p*_,h=h*g+y*_,g===1-o){let T=1/Math.sqrt(l*l+c*c+u*u+h*h);l*=T,c*=T,u*=T,h*=T}}e[t]=l,e[t+1]=c,e[t+2]=u,e[t+3]=h}static multiplyQuaternionsFlat(e,t,n,s,r,a){let o=n[s],l=n[s+1],c=n[s+2],u=n[s+3],h=r[a],f=r[a+1],d=r[a+2],p=r[a+3];return e[t]=o*p+u*h+l*d-c*f,e[t+1]=l*p+u*f+c*h-o*d,e[t+2]=c*p+u*d+o*f-l*h,e[t+3]=u*p-o*h-l*f-c*d,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,s){return this._x=e,this._y=t,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,s=e._y,r=e._z,a=e._order,o=Math.cos,l=Math.sin,c=o(n/2),u=o(s/2),h=o(r/2),f=l(n/2),d=l(s/2),p=l(r/2);switch(a){case"XYZ":this._x=f*u*h+c*d*p,this._y=c*d*h-f*u*p,this._z=c*u*p+f*d*h,this._w=c*u*h-f*d*p;break;case"YXZ":this._x=f*u*h+c*d*p,this._y=c*d*h-f*u*p,this._z=c*u*p-f*d*h,this._w=c*u*h+f*d*p;break;case"ZXY":this._x=f*u*h-c*d*p,this._y=c*d*h+f*u*p,this._z=c*u*p+f*d*h,this._w=c*u*h-f*d*p;break;case"ZYX":this._x=f*u*h-c*d*p,this._y=c*d*h+f*u*p,this._z=c*u*p-f*d*h,this._w=c*u*h+f*d*p;break;case"YZX":this._x=f*u*h+c*d*p,this._y=c*d*h+f*u*p,this._z=c*u*p-f*d*h,this._w=c*u*h-f*d*p;break;case"XZY":this._x=f*u*h-c*d*p,this._y=c*d*h-f*u*p,this._z=c*u*p+f*d*h,this._w=c*u*h+f*d*p;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,s=Math.sin(n);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],s=t[4],r=t[8],a=t[1],o=t[5],l=t[9],c=t[2],u=t[6],h=t[10],f=n+o+h;if(f>0){let d=.5/Math.sqrt(f+1);this._w=.25/d,this._x=(u-l)*d,this._y=(r-c)*d,this._z=(a-s)*d}else if(n>o&&n>h){let d=2*Math.sqrt(1+n-o-h);this._w=(u-l)/d,this._x=.25*d,this._y=(s+a)/d,this._z=(r+c)/d}else if(o>h){let d=2*Math.sqrt(1+o-n-h);this._w=(r-c)/d,this._x=(s+a)/d,this._y=.25*d,this._z=(l+u)/d}else{let d=2*Math.sqrt(1+h-n-o);this._w=(a-s)/d,this._x=(r+c)/d,this._y=(l+u)/d,this._z=.25*d}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Je(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let s=Math.min(1,t/n);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,s=e._y,r=e._z,a=e._w,o=t._x,l=t._y,c=t._z,u=t._w;return this._x=n*u+a*o+s*c-r*l,this._y=s*u+a*l+r*o-n*c,this._z=r*u+a*c+n*l-s*o,this._w=a*u-n*o-s*l-r*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);let n=this._x,s=this._y,r=this._z,a=this._w,o=a*e._w+n*e._x+s*e._y+r*e._z;if(o<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,o=-o):this.copy(e),o>=1)return this._w=a,this._x=n,this._y=s,this._z=r,this;let l=1-o*o;if(l<=Number.EPSILON){let d=1-t;return this._w=d*a+t*this._w,this._x=d*n+t*this._x,this._y=d*s+t*this._y,this._z=d*r+t*this._z,this.normalize(),this}let c=Math.sqrt(l),u=Math.atan2(c,o),h=Math.sin((1-t)*u)/c,f=Math.sin(t*u)/c;return this._w=a*h+this._w*f,this._x=n*h+this._x*f,this._y=s*h+this._y*f,this._z=r*h+this._z*f,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(e),s*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},D=class i{constructor(e=0,t=0,n=0){i.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(iu.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(iu.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*s,this.y=r[1]*t+r[4]*n+r[7]*s,this.z=r[2]*t+r[5]*n+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,s=this.z,r=e.elements,a=1/(r[3]*t+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*s+r[12])*a,this.y=(r[1]*t+r[5]*n+r[9]*s+r[13])*a,this.z=(r[2]*t+r[6]*n+r[10]*s+r[14])*a,this}applyQuaternion(e){let t=this.x,n=this.y,s=this.z,r=e.x,a=e.y,o=e.z,l=e.w,c=2*(a*s-o*n),u=2*(o*t-r*s),h=2*(r*n-a*t);return this.x=t+l*c+a*h-o*u,this.y=n+l*u+o*c-r*h,this.z=s+l*h+r*u-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*s,this.y=r[1]*t+r[5]*n+r[9]*s,this.z=r[2]*t+r[6]*n+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Je(this.x,e.x,t.x),this.y=Je(this.y,e.y,t.y),this.z=Je(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=Je(this.x,e,t),this.y=Je(this.y,e,t),this.z=Je(this.z,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Je(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,s=e.y,r=e.z,a=t.x,o=t.y,l=t.z;return this.x=s*l-r*o,this.y=r*a-n*l,this.z=n*o-s*a,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return jl.copy(this).projectOnVector(e),this.sub(jl)}reflect(e){return this.sub(jl.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(Je(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,s=this.z-e.z;return t*t+n*n+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let s=Math.sin(t)*e;return this.x=s*Math.sin(n),this.y=Math.cos(t)*e,this.z=s*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},jl=new D,iu=new Yt,Ge=class i{constructor(e,t,n,s,r,a,o,l,c){i.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,a,o,l,c)}set(e,t,n,s,r,a,o,l,c){let u=this.elements;return u[0]=e,u[1]=s,u[2]=o,u[3]=t,u[4]=r,u[5]=l,u[6]=n,u[7]=a,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,s=t.elements,r=this.elements,a=n[0],o=n[3],l=n[6],c=n[1],u=n[4],h=n[7],f=n[2],d=n[5],p=n[8],y=s[0],g=s[3],m=s[6],E=s[1],v=s[4],_=s[7],T=s[2],w=s[5],R=s[8];return r[0]=a*y+o*E+l*T,r[3]=a*g+o*v+l*w,r[6]=a*m+o*_+l*R,r[1]=c*y+u*E+h*T,r[4]=c*g+u*v+h*w,r[7]=c*m+u*_+h*R,r[2]=f*y+d*E+p*T,r[5]=f*g+d*v+p*w,r[8]=f*m+d*_+p*R,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8];return t*a*u-t*o*c-n*r*u+n*o*l+s*r*c-s*a*l}invert(){let e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8],h=u*a-o*c,f=o*l-u*r,d=c*r-a*l,p=t*h+n*f+s*d;if(p===0)return this.set(0,0,0,0,0,0,0,0,0);let y=1/p;return e[0]=h*y,e[1]=(s*c-u*n)*y,e[2]=(o*n-s*a)*y,e[3]=f*y,e[4]=(u*t-s*l)*y,e[5]=(s*r-o*t)*y,e[6]=d*y,e[7]=(n*l-c*t)*y,e[8]=(a*t-n*r)*y,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,s,r,a,o){let l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*a+c*o)+a+e,-s*c,s*l,-s*(-c*a+l*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(Ql.makeScale(e,t)),this}rotate(e){return this.premultiply(Ql.makeRotation(-e)),this}translate(e,t){return this.premultiply(Ql.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let s=0;s<9;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}},Ql=new Ge;function th(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function Pr(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function Pd(){let i=Pr("canvas");return i.style.display="block",i}var su={};function Bs(i){i in su||(su[i]=!0,console.warn(i))}function Ld(i,e,t){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:n()}}setTimeout(r,t)})}var ru=new Ge().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),au=new Ge().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Rp(){let i={enabled:!0,workingColorSpace:Ji,spaces:{},convert:function(s,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===at&&(s.r=Kn(s.r),s.g=Kn(s.g),s.b=Kn(s.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===at&&(s.r=Ns(s.r),s.g=Ns(s.g),s.b=Ns(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===oi?Cr:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,a){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return Bs("THREE.ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return Bs("THREE.ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(s,r)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[Ji]:{primaries:e,whitePoint:n,transfer:Cr,toXYZ:ru,fromXYZ:au,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:qt},outputColorSpaceConfig:{drawingBufferColorSpace:qt}},[qt]:{primaries:e,whitePoint:n,transfer:at,toXYZ:ru,fromXYZ:au,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:qt}}}),i}var it=Rp();function Kn(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function Ns(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}var Ms,ho=class{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{Ms===void 0&&(Ms=Pr("canvas")),Ms.width=e.width,Ms.height=e.height;let s=Ms.getContext("2d");e instanceof ImageData?s.putImageData(e,0,0):s.drawImage(e,0,0,e.width,e.height),n=Ms}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){let t=Pr("canvas");t.width=e.width,t.height=e.height;let n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);let s=n.getImageData(0,0,e.width,e.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=Kn(r[a]/255)*255;return n.putImageData(s,0,0),t}else if(e.data){let t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(Kn(t[n]/255)*255):t[n]=Kn(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}},Cp=0,zs=class{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Cp++}),this.uuid=li(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):t instanceof VideoFrame?e.set(t.displayHeight,t.displayWidth,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(ec(s[a].image)):r.push(ec(s[a]))}else r=ec(s);n.url=r}return t||(e.images[this.uuid]=n),n}};function ec(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?ho.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}var Ip=0,tc=new D,Qt=class i extends On{constructor(e=i.DEFAULT_IMAGE,t=i.DEFAULT_MAPPING,n=Mi,s=Mi,r=An,a=Ti,o=mn,l=Dn,c=i.DEFAULT_ANISOTROPY,u=oi){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Ip++}),this.uuid=li(),this.name="",this.source=new zs(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new fe(0,0),this.repeat=new fe(1,1),this.center=new fe(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ge,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(tc).x}get height(){return this.source.getSize(tc).y}get depth(){return this.source.getSize(tc).z}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(let t in e){let n=e[t];if(n===void 0){console.warn(`THREE.Texture.setValues(): parameter '${t}' has value of undefined.`);continue}let s=this[t];if(s===void 0){console.warn(`THREE.Texture.setValues(): property '${t}' does not exist.`);continue}s&&n&&s.isVector2&&n.isVector2||s&&n&&s.isVector3&&n.isVector3||s&&n&&s.isMatrix3&&n.isMatrix3?s.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Gc)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case oo:e.x=e.x-Math.floor(e.x);break;case Mi:e.x=e.x<0?0:1;break;case lo:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case oo:e.y=e.y-Math.floor(e.y);break;case Mi:e.y=e.y<0?0:1;break;case lo:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};Qt.DEFAULT_IMAGE=null;Qt.DEFAULT_MAPPING=Gc;Qt.DEFAULT_ANISOTROPY=1;var mt=class i{constructor(e=0,t=0,n=0,s=1){i.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,s){return this.x=e,this.y=t,this.z=n,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,s=this.z,r=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*s+a[12]*r,this.y=a[1]*t+a[5]*n+a[9]*s+a[13]*r,this.z=a[2]*t+a[6]*n+a[10]*s+a[14]*r,this.w=a[3]*t+a[7]*n+a[11]*s+a[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,s,r,l=e.elements,c=l[0],u=l[4],h=l[8],f=l[1],d=l[5],p=l[9],y=l[2],g=l[6],m=l[10];if(Math.abs(u-f)<.01&&Math.abs(h-y)<.01&&Math.abs(p-g)<.01){if(Math.abs(u+f)<.1&&Math.abs(h+y)<.1&&Math.abs(p+g)<.1&&Math.abs(c+d+m-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;let v=(c+1)/2,_=(d+1)/2,T=(m+1)/2,w=(u+f)/4,R=(h+y)/4,I=(p+g)/4;return v>_&&v>T?v<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(v),s=w/n,r=R/n):_>T?_<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(_),n=w/s,r=I/s):T<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(T),n=R/r,s=I/r),this.set(n,s,r,t),this}let E=Math.sqrt((g-p)*(g-p)+(h-y)*(h-y)+(f-u)*(f-u));return Math.abs(E)<.001&&(E=1),this.x=(g-p)/E,this.y=(h-y)/E,this.z=(f-u)/E,this.w=Math.acos((c+d+m-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Je(this.x,e.x,t.x),this.y=Je(this.y,e.y,t.y),this.z=Je(this.z,e.z,t.z),this.w=Je(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=Je(this.x,e,t),this.y=Je(this.y,e,t),this.z=Je(this.z,e,t),this.w=Je(this.w,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Je(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},uo=class extends On{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:An,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new mt(0,0,e,t),this.scissorTest=!1,this.viewport=new mt(0,0,e,t);let s={width:e,height:t,depth:n.depth},r=new Qt(s);this.textures=[];let a=n.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview}_setTextureOptions(e={}){let t={minFilter:An,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=n,this.textures[s].isArrayTexture=this.textures[s].image.depth>1;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let s=Object.assign({},e.textures[t].image);this.textures[t].source=new zs(s)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}},Bn=class extends uo{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}},Lr=class extends Qt{constructor(e=null,t=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=jt,this.minFilter=jt,this.wrapR=Mi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}};var fo=class extends Qt{constructor(e=null,t=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=jt,this.minFilter=jt,this.wrapR=Mi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var Rn=class{constructor(e=new D(1/0,1/0,1/0),t=new D(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(bn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(bn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=bn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,bn):bn.fromBufferAttribute(r,a),bn.applyMatrix4(e.matrixWorld),this.expandByPoint(bn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Ia.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Ia.copy(n.boundingBox)),Ia.applyMatrix4(e.matrixWorld),this.union(Ia)}let s=e.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,bn),bn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(mr),Pa.subVectors(this.max,mr),Ss.subVectors(e.a,mr),bs.subVectors(e.b,mr),Es.subVectors(e.c,mr),pi.subVectors(bs,Ss),mi.subVectors(Es,bs),ki.subVectors(Ss,Es);let t=[0,-pi.z,pi.y,0,-mi.z,mi.y,0,-ki.z,ki.y,pi.z,0,-pi.x,mi.z,0,-mi.x,ki.z,0,-ki.x,-pi.y,pi.x,0,-mi.y,mi.x,0,-ki.y,ki.x,0];return!nc(t,Ss,bs,Es,Pa)||(t=[1,0,0,0,1,0,0,0,1],!nc(t,Ss,bs,Es,Pa))?!1:(La.crossVectors(pi,mi),t=[La.x,La.y,La.z],nc(t,Ss,bs,Es,Pa))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,bn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(bn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:($n[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),$n[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),$n[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),$n[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),$n[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),$n[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),$n[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),$n[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints($n),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},$n=[new D,new D,new D,new D,new D,new D,new D,new D],bn=new D,Ia=new Rn,Ss=new D,bs=new D,Es=new D,pi=new D,mi=new D,ki=new D,mr=new D,Pa=new D,La=new D,Hi=new D;function nc(i,e,t,n,s){for(let r=0,a=i.length-3;r<=a;r+=3){Hi.fromArray(i,r);let o=s.x*Math.abs(Hi.x)+s.y*Math.abs(Hi.y)+s.z*Math.abs(Hi.z),l=e.dot(Hi),c=t.dot(Hi),u=n.dot(Hi);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>o)return!1}return!0}var Pp=new Rn,gr=new D,ic=new D,en=class{constructor(e=new D,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t!==void 0?n.copy(t):Pp.setFromPoints(e).getCenter(n);let s=0;for(let r=0,a=e.length;r<a;r++)s=Math.max(s,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;gr.subVectors(e,this.center);let t=gr.lengthSq();if(t>this.radius*this.radius){let n=Math.sqrt(t),s=(n-this.radius)*.5;this.center.addScaledVector(gr,s/n),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(ic.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(gr.copy(e.center).add(ic)),this.expandByPoint(gr.copy(e.center).sub(ic))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},qn=new D,sc=new D,Da=new D,gi=new D,rc=new D,Ua=new D,ac=new D,bi=class{constructor(e=new D,t=new D(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,qn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=qn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(qn.copy(this.origin).addScaledVector(this.direction,t),qn.distanceToSquared(e))}distanceSqToSegment(e,t,n,s){sc.copy(e).add(t).multiplyScalar(.5),Da.copy(t).sub(e).normalize(),gi.copy(this.origin).sub(sc);let r=e.distanceTo(t)*.5,a=-this.direction.dot(Da),o=gi.dot(this.direction),l=-gi.dot(Da),c=gi.lengthSq(),u=Math.abs(1-a*a),h,f,d,p;if(u>0)if(h=a*l-o,f=a*o-l,p=r*u,h>=0)if(f>=-p)if(f<=p){let y=1/u;h*=y,f*=y,d=h*(h+a*f+2*o)+f*(a*h+f+2*l)+c}else f=r,h=Math.max(0,-(a*f+o)),d=-h*h+f*(f+2*l)+c;else f=-r,h=Math.max(0,-(a*f+o)),d=-h*h+f*(f+2*l)+c;else f<=-p?(h=Math.max(0,-(-a*r+o)),f=h>0?-r:Math.min(Math.max(-r,-l),r),d=-h*h+f*(f+2*l)+c):f<=p?(h=0,f=Math.min(Math.max(-r,-l),r),d=f*(f+2*l)+c):(h=Math.max(0,-(a*r+o)),f=h>0?r:Math.min(Math.max(-r,-l),r),d=-h*h+f*(f+2*l)+c);else f=a>0?-r:r,h=Math.max(0,-(a*f+o)),d=-h*h+f*(f+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,h),s&&s.copy(sc).addScaledVector(Da,f),d}intersectSphere(e,t){qn.subVectors(e.center,this.origin);let n=qn.dot(this.direction),s=qn.dot(qn)-n*n,r=e.radius*e.radius;if(s>r)return null;let a=Math.sqrt(r-s),o=n-a,l=n+a;return l<0?null:o<0?this.at(l,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,s,r,a,o,l,c=1/this.direction.x,u=1/this.direction.y,h=1/this.direction.z,f=this.origin;return c>=0?(n=(e.min.x-f.x)*c,s=(e.max.x-f.x)*c):(n=(e.max.x-f.x)*c,s=(e.min.x-f.x)*c),u>=0?(r=(e.min.y-f.y)*u,a=(e.max.y-f.y)*u):(r=(e.max.y-f.y)*u,a=(e.min.y-f.y)*u),n>a||r>s||((r>n||isNaN(n))&&(n=r),(a<s||isNaN(s))&&(s=a),h>=0?(o=(e.min.z-f.z)*h,l=(e.max.z-f.z)*h):(o=(e.max.z-f.z)*h,l=(e.min.z-f.z)*h),n>l||o>s)||((o>n||n!==n)&&(n=o),(l<s||s!==s)&&(s=l),s<0)?null:this.at(n>=0?n:s,t)}intersectsBox(e){return this.intersectBox(e,qn)!==null}intersectTriangle(e,t,n,s,r){rc.subVectors(t,e),Ua.subVectors(n,e),ac.crossVectors(rc,Ua);let a=this.direction.dot(ac),o;if(a>0){if(s)return null;o=1}else if(a<0)o=-1,a=-a;else return null;gi.subVectors(this.origin,e);let l=o*this.direction.dot(Ua.crossVectors(gi,Ua));if(l<0)return null;let c=o*this.direction.dot(rc.cross(gi));if(c<0||l+c>a)return null;let u=-o*gi.dot(ac);return u<0?null:this.at(u/a,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},qe=class i{constructor(e,t,n,s,r,a,o,l,c,u,h,f,d,p,y,g){i.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,a,o,l,c,u,h,f,d,p,y,g)}set(e,t,n,s,r,a,o,l,c,u,h,f,d,p,y,g){let m=this.elements;return m[0]=e,m[4]=t,m[8]=n,m[12]=s,m[1]=r,m[5]=a,m[9]=o,m[13]=l,m[2]=c,m[6]=u,m[10]=h,m[14]=f,m[3]=d,m[7]=p,m[11]=y,m[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new i().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){let t=this.elements,n=e.elements,s=1/ws.setFromMatrixColumn(e,0).length(),r=1/ws.setFromMatrixColumn(e,1).length(),a=1/ws.setFromMatrixColumn(e,2).length();return t[0]=n[0]*s,t[1]=n[1]*s,t[2]=n[2]*s,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,s=e.y,r=e.z,a=Math.cos(n),o=Math.sin(n),l=Math.cos(s),c=Math.sin(s),u=Math.cos(r),h=Math.sin(r);if(e.order==="XYZ"){let f=a*u,d=a*h,p=o*u,y=o*h;t[0]=l*u,t[4]=-l*h,t[8]=c,t[1]=d+p*c,t[5]=f-y*c,t[9]=-o*l,t[2]=y-f*c,t[6]=p+d*c,t[10]=a*l}else if(e.order==="YXZ"){let f=l*u,d=l*h,p=c*u,y=c*h;t[0]=f+y*o,t[4]=p*o-d,t[8]=a*c,t[1]=a*h,t[5]=a*u,t[9]=-o,t[2]=d*o-p,t[6]=y+f*o,t[10]=a*l}else if(e.order==="ZXY"){let f=l*u,d=l*h,p=c*u,y=c*h;t[0]=f-y*o,t[4]=-a*h,t[8]=p+d*o,t[1]=d+p*o,t[5]=a*u,t[9]=y-f*o,t[2]=-a*c,t[6]=o,t[10]=a*l}else if(e.order==="ZYX"){let f=a*u,d=a*h,p=o*u,y=o*h;t[0]=l*u,t[4]=p*c-d,t[8]=f*c+y,t[1]=l*h,t[5]=y*c+f,t[9]=d*c-p,t[2]=-c,t[6]=o*l,t[10]=a*l}else if(e.order==="YZX"){let f=a*l,d=a*c,p=o*l,y=o*c;t[0]=l*u,t[4]=y-f*h,t[8]=p*h+d,t[1]=h,t[5]=a*u,t[9]=-o*u,t[2]=-c*u,t[6]=d*h+p,t[10]=f-y*h}else if(e.order==="XZY"){let f=a*l,d=a*c,p=o*l,y=o*c;t[0]=l*u,t[4]=-h,t[8]=c*u,t[1]=f*h+y,t[5]=a*u,t[9]=d*h-p,t[2]=p*h-d,t[6]=o*u,t[10]=y*h+f}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Lp,e,Dp)}lookAt(e,t,n){let s=this.elements;return ln.subVectors(e,t),ln.lengthSq()===0&&(ln.z=1),ln.normalize(),yi.crossVectors(n,ln),yi.lengthSq()===0&&(Math.abs(n.z)===1?ln.x+=1e-4:ln.z+=1e-4,ln.normalize(),yi.crossVectors(n,ln)),yi.normalize(),Na.crossVectors(ln,yi),s[0]=yi.x,s[4]=Na.x,s[8]=ln.x,s[1]=yi.y,s[5]=Na.y,s[9]=ln.y,s[2]=yi.z,s[6]=Na.z,s[10]=ln.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,s=t.elements,r=this.elements,a=n[0],o=n[4],l=n[8],c=n[12],u=n[1],h=n[5],f=n[9],d=n[13],p=n[2],y=n[6],g=n[10],m=n[14],E=n[3],v=n[7],_=n[11],T=n[15],w=s[0],R=s[4],I=s[8],S=s[12],M=s[1],P=s[5],F=s[9],V=s[13],$=s[2],L=s[6],H=s[10],N=s[14],k=s[3],Q=s[7],le=s[11],ye=s[15];return r[0]=a*w+o*M+l*$+c*k,r[4]=a*R+o*P+l*L+c*Q,r[8]=a*I+o*F+l*H+c*le,r[12]=a*S+o*V+l*N+c*ye,r[1]=u*w+h*M+f*$+d*k,r[5]=u*R+h*P+f*L+d*Q,r[9]=u*I+h*F+f*H+d*le,r[13]=u*S+h*V+f*N+d*ye,r[2]=p*w+y*M+g*$+m*k,r[6]=p*R+y*P+g*L+m*Q,r[10]=p*I+y*F+g*H+m*le,r[14]=p*S+y*V+g*N+m*ye,r[3]=E*w+v*M+_*$+T*k,r[7]=E*R+v*P+_*L+T*Q,r[11]=E*I+v*F+_*H+T*le,r[15]=E*S+v*V+_*N+T*ye,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],s=e[8],r=e[12],a=e[1],o=e[5],l=e[9],c=e[13],u=e[2],h=e[6],f=e[10],d=e[14],p=e[3],y=e[7],g=e[11],m=e[15];return p*(+r*l*h-s*c*h-r*o*f+n*c*f+s*o*d-n*l*d)+y*(+t*l*d-t*c*f+r*a*f-s*a*d+s*c*u-r*l*u)+g*(+t*c*h-t*o*d-r*a*h+n*a*d+r*o*u-n*c*u)+m*(-s*o*u-t*l*h+t*o*f+s*a*h-n*a*f+n*l*u)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8],h=e[9],f=e[10],d=e[11],p=e[12],y=e[13],g=e[14],m=e[15],E=h*g*c-y*f*c+y*l*d-o*g*d-h*l*m+o*f*m,v=p*f*c-u*g*c-p*l*d+a*g*d+u*l*m-a*f*m,_=u*y*c-p*h*c+p*o*d-a*y*d-u*o*m+a*h*m,T=p*h*l-u*y*l-p*o*f+a*y*f+u*o*g-a*h*g,w=t*E+n*v+s*_+r*T;if(w===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let R=1/w;return e[0]=E*R,e[1]=(y*f*r-h*g*r-y*s*d+n*g*d+h*s*m-n*f*m)*R,e[2]=(o*g*r-y*l*r+y*s*c-n*g*c-o*s*m+n*l*m)*R,e[3]=(h*l*r-o*f*r-h*s*c+n*f*c+o*s*d-n*l*d)*R,e[4]=v*R,e[5]=(u*g*r-p*f*r+p*s*d-t*g*d-u*s*m+t*f*m)*R,e[6]=(p*l*r-a*g*r-p*s*c+t*g*c+a*s*m-t*l*m)*R,e[7]=(a*f*r-u*l*r+u*s*c-t*f*c-a*s*d+t*l*d)*R,e[8]=_*R,e[9]=(p*h*r-u*y*r-p*n*d+t*y*d+u*n*m-t*h*m)*R,e[10]=(a*y*r-p*o*r+p*n*c-t*y*c-a*n*m+t*o*m)*R,e[11]=(u*o*r-a*h*r-u*n*c+t*h*c+a*n*d-t*o*d)*R,e[12]=T*R,e[13]=(u*y*s-p*h*s+p*n*f-t*y*f-u*n*g+t*h*g)*R,e[14]=(p*o*s-a*y*s-p*n*l+t*y*l+a*n*g-t*o*g)*R,e[15]=(a*h*s-u*o*s+u*n*l-t*h*l-a*n*f+t*o*f)*R,this}scale(e){let t=this.elements,n=e.x,s=e.y,r=e.z;return t[0]*=n,t[4]*=s,t[8]*=r,t[1]*=n,t[5]*=s,t[9]*=r,t[2]*=n,t[6]*=s,t[10]*=r,t[3]*=n,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,s))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),s=Math.sin(t),r=1-n,a=e.x,o=e.y,l=e.z,c=r*a,u=r*o;return this.set(c*a+n,c*o-s*l,c*l+s*o,0,c*o+s*l,u*o+n,u*l-s*a,0,c*l-s*o,u*l+s*a,r*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,s,r,a){return this.set(1,n,r,0,e,1,a,0,t,s,1,0,0,0,0,1),this}compose(e,t,n){let s=this.elements,r=t._x,a=t._y,o=t._z,l=t._w,c=r+r,u=a+a,h=o+o,f=r*c,d=r*u,p=r*h,y=a*u,g=a*h,m=o*h,E=l*c,v=l*u,_=l*h,T=n.x,w=n.y,R=n.z;return s[0]=(1-(y+m))*T,s[1]=(d+_)*T,s[2]=(p-v)*T,s[3]=0,s[4]=(d-_)*w,s[5]=(1-(f+m))*w,s[6]=(g+E)*w,s[7]=0,s[8]=(p+v)*R,s[9]=(g-E)*R,s[10]=(1-(f+y))*R,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,n){let s=this.elements,r=ws.set(s[0],s[1],s[2]).length(),a=ws.set(s[4],s[5],s[6]).length(),o=ws.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),e.x=s[12],e.y=s[13],e.z=s[14],En.copy(this);let c=1/r,u=1/a,h=1/o;return En.elements[0]*=c,En.elements[1]*=c,En.elements[2]*=c,En.elements[4]*=u,En.elements[5]*=u,En.elements[6]*=u,En.elements[8]*=h,En.elements[9]*=h,En.elements[10]*=h,t.setFromRotationMatrix(En),n.x=r,n.y=a,n.z=o,this}makePerspective(e,t,n,s,r,a,o=Tn,l=!1){let c=this.elements,u=2*r/(t-e),h=2*r/(n-s),f=(t+e)/(t-e),d=(n+s)/(n-s),p,y;if(l)p=r/(a-r),y=a*r/(a-r);else if(o===Tn)p=-(a+r)/(a-r),y=-2*a*r/(a-r);else if(o===Ir)p=-a/(a-r),y=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=u,c[4]=0,c[8]=f,c[12]=0,c[1]=0,c[5]=h,c[9]=d,c[13]=0,c[2]=0,c[6]=0,c[10]=p,c[14]=y,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,s,r,a,o=Tn,l=!1){let c=this.elements,u=2/(t-e),h=2/(n-s),f=-(t+e)/(t-e),d=-(n+s)/(n-s),p,y;if(l)p=1/(a-r),y=a/(a-r);else if(o===Tn)p=-2/(a-r),y=-(a+r)/(a-r);else if(o===Ir)p=-1/(a-r),y=-r/(a-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=u,c[4]=0,c[8]=0,c[12]=f,c[1]=0,c[5]=h,c[9]=0,c[13]=d,c[2]=0,c[6]=0,c[10]=p,c[14]=y,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let s=0;s<16;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}},ws=new D,En=new qe,Lp=new D(0,0,0),Dp=new D(1,1,1),yi=new D,Na=new D,ln=new D,ou=new qe,lu=new Yt,hn=class i{constructor(e=0,t=0,n=0,s=i.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,s=this._order){return this._x=e,this._y=t,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let s=e.elements,r=s[0],a=s[4],o=s[8],l=s[1],c=s[5],u=s[9],h=s[2],f=s[6],d=s[10];switch(t){case"XYZ":this._y=Math.asin(Je(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-u,d),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(f,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Je(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(o,d),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-h,r),this._z=0);break;case"ZXY":this._x=Math.asin(Je(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-h,d),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-Je(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(f,d),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(Je(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-h,r)):(this._x=0,this._y=Math.atan2(o,d));break;case"XZY":this._z=Math.asin(-Je(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(f,c),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-u,d),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return ou.makeRotationFromQuaternion(e),this.setFromRotationMatrix(ou,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return lu.setFromEuler(this),this.setFromQuaternion(lu,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};hn.DEFAULT_ORDER="XYZ";var ks=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}},Up=0,cu=new D,Ts=new Yt,Yn=new qe,Fa=new D,yr=new D,Np=new D,Fp=new Yt,hu=new D(1,0,0),uu=new D(0,1,0),du=new D(0,0,1),fu={type:"added"},Op={type:"removed"},As={type:"childadded",child:null},oc={type:"childremoved",child:null},gt=class i extends On{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Up++}),this.uuid=li(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=i.DEFAULT_UP.clone();let e=new D,t=new hn,n=new Yt,s=new D(1,1,1);function r(){n.setFromEuler(t,!1)}function a(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new qe},normalMatrix:{value:new Ge}}),this.matrix=new qe,this.matrixWorld=new qe,this.matrixAutoUpdate=i.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=i.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new ks,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Ts.setFromAxisAngle(e,t),this.quaternion.multiply(Ts),this}rotateOnWorldAxis(e,t){return Ts.setFromAxisAngle(e,t),this.quaternion.premultiply(Ts),this}rotateX(e){return this.rotateOnAxis(hu,e)}rotateY(e){return this.rotateOnAxis(uu,e)}rotateZ(e){return this.rotateOnAxis(du,e)}translateOnAxis(e,t){return cu.copy(e).applyQuaternion(this.quaternion),this.position.add(cu.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(hu,e)}translateY(e){return this.translateOnAxis(uu,e)}translateZ(e){return this.translateOnAxis(du,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Yn.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?Fa.copy(e):Fa.set(e,t,n);let s=this.parent;this.updateWorldMatrix(!0,!1),yr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Yn.lookAt(yr,Fa,this.up):Yn.lookAt(Fa,yr,this.up),this.quaternion.setFromRotationMatrix(Yn),s&&(Yn.extractRotation(s.matrixWorld),Ts.setFromRotationMatrix(Yn),this.quaternion.premultiply(Ts.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(fu),As.child=e,this.dispatchEvent(As),As.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Op),oc.child=e,this.dispatchEvent(oc),oc.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Yn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Yn.multiply(e.parent.matrixWorld)),e.applyMatrix4(Yn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(fu),As.child=e,this.dispatchEvent(As),As.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,s=this.children.length;n<s;n++){let a=this.children[n].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(yr,e,Np),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(yr,Fp,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);let t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){let n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){let s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(e){let t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(o=>({...o})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(e),s.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);let o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){let l=o.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){let h=l[c];r(e.shapes,h)}else r(e.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(r(e.materials,this.material[l]));s.material=o}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){let l=this.animations[o];s.animations.push(r(e.animations,l))}}if(t){let o=a(e.geometries),l=a(e.materials),c=a(e.textures),u=a(e.images),h=a(e.shapes),f=a(e.skeletons),d=a(e.animations),p=a(e.nodes);o.length>0&&(n.geometries=o),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),u.length>0&&(n.images=u),h.length>0&&(n.shapes=h),f.length>0&&(n.skeletons=f),d.length>0&&(n.animations=d),p.length>0&&(n.nodes=p)}return n.object=s,n;function a(o){let l=[];for(let c in o){let u=o[c];delete u.metadata,l.push(u)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){let s=e.children[n];this.add(s.clone())}return this}};gt.DEFAULT_UP=new D(0,1,0);gt.DEFAULT_MATRIX_AUTO_UPDATE=!0;gt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var wn=new D,Zn=new D,lc=new D,Jn=new D,Rs=new D,Cs=new D,pu=new D,cc=new D,hc=new D,uc=new D,dc=new mt,fc=new mt,pc=new mt,vi=class i{constructor(e=new D,t=new D,n=new D){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,s){s.subVectors(n,t),wn.subVectors(e,t),s.cross(wn);let r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,n,s,r){wn.subVectors(s,t),Zn.subVectors(n,t),lc.subVectors(e,t);let a=wn.dot(wn),o=wn.dot(Zn),l=wn.dot(lc),c=Zn.dot(Zn),u=Zn.dot(lc),h=a*c-o*o;if(h===0)return r.set(0,0,0),null;let f=1/h,d=(c*l-o*u)*f,p=(a*u-o*l)*f;return r.set(1-d-p,p,d)}static containsPoint(e,t,n,s){return this.getBarycoord(e,t,n,s,Jn)===null?!1:Jn.x>=0&&Jn.y>=0&&Jn.x+Jn.y<=1}static getInterpolation(e,t,n,s,r,a,o,l){return this.getBarycoord(e,t,n,s,Jn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,Jn.x),l.addScaledVector(a,Jn.y),l.addScaledVector(o,Jn.z),l)}static getInterpolatedAttribute(e,t,n,s,r,a){return dc.setScalar(0),fc.setScalar(0),pc.setScalar(0),dc.fromBufferAttribute(e,t),fc.fromBufferAttribute(e,n),pc.fromBufferAttribute(e,s),a.setScalar(0),a.addScaledVector(dc,r.x),a.addScaledVector(fc,r.y),a.addScaledVector(pc,r.z),a}static isFrontFacing(e,t,n,s){return wn.subVectors(n,t),Zn.subVectors(e,t),wn.cross(Zn).dot(s)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,s){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,n,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return wn.subVectors(this.c,this.b),Zn.subVectors(this.a,this.b),wn.cross(Zn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return i.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return i.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,s,r){return i.getInterpolation(e,this.a,this.b,this.c,t,n,s,r)}containsPoint(e){return i.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return i.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,s=this.b,r=this.c,a,o;Rs.subVectors(s,n),Cs.subVectors(r,n),cc.subVectors(e,n);let l=Rs.dot(cc),c=Cs.dot(cc);if(l<=0&&c<=0)return t.copy(n);hc.subVectors(e,s);let u=Rs.dot(hc),h=Cs.dot(hc);if(u>=0&&h<=u)return t.copy(s);let f=l*h-u*c;if(f<=0&&l>=0&&u<=0)return a=l/(l-u),t.copy(n).addScaledVector(Rs,a);uc.subVectors(e,r);let d=Rs.dot(uc),p=Cs.dot(uc);if(p>=0&&d<=p)return t.copy(r);let y=d*c-l*p;if(y<=0&&c>=0&&p<=0)return o=c/(c-p),t.copy(n).addScaledVector(Cs,o);let g=u*p-d*h;if(g<=0&&h-u>=0&&d-p>=0)return pu.subVectors(r,s),o=(h-u)/(h-u+(d-p)),t.copy(s).addScaledVector(pu,o);let m=1/(g+y+f);return a=y*m,o=f*m,t.copy(n).addScaledVector(Rs,a).addScaledVector(Cs,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},Dd={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},_i={h:0,s:0,l:0},Oa={h:0,s:0,l:0};function mc(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}var ke=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=qt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,it.colorSpaceToWorking(this,t),this}setRGB(e,t,n,s=it.workingColorSpace){return this.r=e,this.g=t,this.b=n,it.colorSpaceToWorking(this,s),this}setHSL(e,t,n,s=it.workingColorSpace){if(e=eh(e,1),t=Je(t,0,1),n=Je(n,0,1),t===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+t):n+t-n*t,a=2*n-r;this.r=mc(a,r,e+1/3),this.g=mc(a,r,e),this.b=mc(a,r,e-1/3)}return it.colorSpaceToWorking(this,s),this}setStyle(e,t=qt){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r,a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){let r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(r,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=qt){let n=Dd[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Kn(e.r),this.g=Kn(e.g),this.b=Kn(e.b),this}copyLinearToSRGB(e){return this.r=Ns(e.r),this.g=Ns(e.g),this.b=Ns(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=qt){return it.workingToColorSpace(Vt.copy(this),e),Math.round(Je(Vt.r*255,0,255))*65536+Math.round(Je(Vt.g*255,0,255))*256+Math.round(Je(Vt.b*255,0,255))}getHexString(e=qt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=it.workingColorSpace){it.workingToColorSpace(Vt.copy(this),t);let n=Vt.r,s=Vt.g,r=Vt.b,a=Math.max(n,s,r),o=Math.min(n,s,r),l,c,u=(o+a)/2;if(o===a)l=0,c=0;else{let h=a-o;switch(c=u<=.5?h/(a+o):h/(2-a-o),a){case n:l=(s-r)/h+(s<r?6:0);break;case s:l=(r-n)/h+2;break;case r:l=(n-s)/h+4;break}l/=6}return e.h=l,e.s=c,e.l=u,e}getRGB(e,t=it.workingColorSpace){return it.workingToColorSpace(Vt.copy(this),t),e.r=Vt.r,e.g=Vt.g,e.b=Vt.b,e}getStyle(e=qt){it.workingToColorSpace(Vt.copy(this),e);let t=Vt.r,n=Vt.g,s=Vt.b;return e!==qt?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(e,t,n){return this.getHSL(_i),this.setHSL(_i.h+e,_i.s+t,_i.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(_i),e.getHSL(Oa);let n=Er(_i.h,Oa.h,t),s=Er(_i.s,Oa.s,t),r=Er(_i.l,Oa.l,t);return this.setHSL(n,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*s,this.g=r[1]*t+r[4]*n+r[7]*s,this.b=r[2]*t+r[5]*n+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},Vt=new ke;ke.NAMES=Dd;var Bp=0,zn=class extends On{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Bp++}),this.uuid=li(),this.name="",this.type="Material",this.blending=Yi,this.side=jn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=ro,this.blendDst=ao,this.blendEquation=Si,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new ke(0,0,0),this.blendAlpha=0,this.depthFunc=Zi,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Ac,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Wi,this.stencilZFail=Wi,this.stencilZPass=Wi,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}let s=this[t];if(s===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});let n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Yi&&(n.blending=this.blending),this.side!==jn&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==ro&&(n.blendSrc=this.blendSrc),this.blendDst!==ao&&(n.blendDst=this.blendDst),this.blendEquation!==Si&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Zi&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Ac&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Wi&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Wi&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Wi&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){let a=[];for(let o in r){let l=r[o];delete l.metadata,a.push(l)}return a}if(t){let r=s(e.textures),a=s(e.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let s=t.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}},un=class extends zn{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new ke(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new hn,this.combine=Vc,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}};var At=new D,Ba=new fe,zp=0,wt=class{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:zp++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=Rc,this.updateRanges=[],this.gpuType=vn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[n+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)Ba.fromBufferAttribute(this,t),Ba.applyMatrix3(e),this.setXY(t,Ba.x,Ba.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)At.fromBufferAttribute(this,t),At.applyMatrix3(e),this.setXYZ(t,At.x,At.y,At.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)At.fromBufferAttribute(this,t),At.applyMatrix4(e),this.setXYZ(t,At.x,At.y,At.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)At.fromBufferAttribute(this,t),At.applyNormalMatrix(e),this.setXYZ(t,At.x,At.y,At.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)At.fromBufferAttribute(this,t),At.transformDirection(e),this.setXYZ(t,At.x,At.y,At.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=Us(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=$t(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Us(t,this.array)),t}setX(e,t){return this.normalized&&(t=$t(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Us(t,this.array)),t}setY(e,t){return this.normalized&&(t=$t(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Us(t,this.array)),t}setZ(e,t){return this.normalized&&(t=$t(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Us(t,this.array)),t}setW(e,t){return this.normalized&&(t=$t(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=$t(t,this.array),n=$t(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,s){return e*=this.itemSize,this.normalized&&(t=$t(t,this.array),n=$t(n,this.array),s=$t(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e*=this.itemSize,this.normalized&&(t=$t(t,this.array),n=$t(n,this.array),s=$t(s,this.array),r=$t(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Rc&&(e.usage=this.usage),e}};var Dr=class extends wt{constructor(e,t,n){super(new Uint16Array(e),t,n)}};var Ur=class extends wt{constructor(e,t,n){super(new Uint32Array(e),t,n)}};var tt=class extends wt{constructor(e,t,n){super(new Float32Array(e),t,n)}},kp=0,_n=new qe,gc=new gt,Is=new D,cn=new Rn,_r=new Rn,Dt=new D,_t=class i extends On{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:kp++}),this.uuid=li(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(th(e)?Ur:Dr)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let r=new Ge().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}let s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return _n.makeRotationFromQuaternion(e),this.applyMatrix4(_n),this}rotateX(e){return _n.makeRotationX(e),this.applyMatrix4(_n),this}rotateY(e){return _n.makeRotationY(e),this.applyMatrix4(_n),this}rotateZ(e){return _n.makeRotationZ(e),this.applyMatrix4(_n),this}translate(e,t,n){return _n.makeTranslation(e,t,n),this.applyMatrix4(_n),this}scale(e,t,n){return _n.makeScale(e,t,n),this.applyMatrix4(_n),this}lookAt(e){return gc.lookAt(e),gc.updateMatrix(),this.applyMatrix4(gc.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Is).negate(),this.translate(Is.x,Is.y,Is.z),this}setFromPoints(e){let t=this.getAttribute("position");if(t===void 0){let n=[];for(let s=0,r=e.length;s<r;s++){let a=e[s];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new tt(n,3))}else{let n=Math.min(e.length,t.count);for(let s=0;s<n;s++){let r=e[s];t.setXYZ(s,r.x,r.y,r.z||0)}e.length>t.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Rn);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new D(-1/0,-1/0,-1/0),new D(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,s=t.length;n<s;n++){let r=t[n];cn.setFromBufferAttribute(r),this.morphTargetsRelative?(Dt.addVectors(this.boundingBox.min,cn.min),this.boundingBox.expandByPoint(Dt),Dt.addVectors(this.boundingBox.max,cn.max),this.boundingBox.expandByPoint(Dt)):(this.boundingBox.expandByPoint(cn.min),this.boundingBox.expandByPoint(cn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new en);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new D,1/0);return}if(e){let n=this.boundingSphere.center;if(cn.setFromBufferAttribute(e),t)for(let r=0,a=t.length;r<a;r++){let o=t[r];_r.setFromBufferAttribute(o),this.morphTargetsRelative?(Dt.addVectors(cn.min,_r.min),cn.expandByPoint(Dt),Dt.addVectors(cn.max,_r.max),cn.expandByPoint(Dt)):(cn.expandByPoint(_r.min),cn.expandByPoint(_r.max))}cn.getCenter(n);let s=0;for(let r=0,a=e.count;r<a;r++)Dt.fromBufferAttribute(e,r),s=Math.max(s,n.distanceToSquared(Dt));if(t)for(let r=0,a=t.length;r<a;r++){let o=t[r],l=this.morphTargetsRelative;for(let c=0,u=o.count;c<u;c++)Dt.fromBufferAttribute(o,c),l&&(Is.fromBufferAttribute(e,c),Dt.add(Is)),s=Math.max(s,n.distanceToSquared(Dt))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=t.position,s=t.normal,r=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new wt(new Float32Array(4*n.count),4));let a=this.getAttribute("tangent"),o=[],l=[];for(let I=0;I<n.count;I++)o[I]=new D,l[I]=new D;let c=new D,u=new D,h=new D,f=new fe,d=new fe,p=new fe,y=new D,g=new D;function m(I,S,M){c.fromBufferAttribute(n,I),u.fromBufferAttribute(n,S),h.fromBufferAttribute(n,M),f.fromBufferAttribute(r,I),d.fromBufferAttribute(r,S),p.fromBufferAttribute(r,M),u.sub(c),h.sub(c),d.sub(f),p.sub(f);let P=1/(d.x*p.y-p.x*d.y);isFinite(P)&&(y.copy(u).multiplyScalar(p.y).addScaledVector(h,-d.y).multiplyScalar(P),g.copy(h).multiplyScalar(d.x).addScaledVector(u,-p.x).multiplyScalar(P),o[I].add(y),o[S].add(y),o[M].add(y),l[I].add(g),l[S].add(g),l[M].add(g))}let E=this.groups;E.length===0&&(E=[{start:0,count:e.count}]);for(let I=0,S=E.length;I<S;++I){let M=E[I],P=M.start,F=M.count;for(let V=P,$=P+F;V<$;V+=3)m(e.getX(V+0),e.getX(V+1),e.getX(V+2))}let v=new D,_=new D,T=new D,w=new D;function R(I){T.fromBufferAttribute(s,I),w.copy(T);let S=o[I];v.copy(S),v.sub(T.multiplyScalar(T.dot(S))).normalize(),_.crossVectors(w,S);let P=_.dot(l[I])<0?-1:1;a.setXYZW(I,v.x,v.y,v.z,P)}for(let I=0,S=E.length;I<S;++I){let M=E[I],P=M.start,F=M.count;for(let V=P,$=P+F;V<$;V+=3)R(e.getX(V+0)),R(e.getX(V+1)),R(e.getX(V+2))}}computeVertexNormals(){let e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new wt(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let f=0,d=n.count;f<d;f++)n.setXYZ(f,0,0,0);let s=new D,r=new D,a=new D,o=new D,l=new D,c=new D,u=new D,h=new D;if(e)for(let f=0,d=e.count;f<d;f+=3){let p=e.getX(f+0),y=e.getX(f+1),g=e.getX(f+2);s.fromBufferAttribute(t,p),r.fromBufferAttribute(t,y),a.fromBufferAttribute(t,g),u.subVectors(a,r),h.subVectors(s,r),u.cross(h),o.fromBufferAttribute(n,p),l.fromBufferAttribute(n,y),c.fromBufferAttribute(n,g),o.add(u),l.add(u),c.add(u),n.setXYZ(p,o.x,o.y,o.z),n.setXYZ(y,l.x,l.y,l.z),n.setXYZ(g,c.x,c.y,c.z)}else for(let f=0,d=t.count;f<d;f+=3)s.fromBufferAttribute(t,f+0),r.fromBufferAttribute(t,f+1),a.fromBufferAttribute(t,f+2),u.subVectors(a,r),h.subVectors(s,r),u.cross(h),n.setXYZ(f+0,u.x,u.y,u.z),n.setXYZ(f+1,u.x,u.y,u.z),n.setXYZ(f+2,u.x,u.y,u.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Dt.fromBufferAttribute(e,t),Dt.normalize(),e.setXYZ(t,Dt.x,Dt.y,Dt.z)}toNonIndexed(){function e(o,l){let c=o.array,u=o.itemSize,h=o.normalized,f=new c.constructor(l.length*u),d=0,p=0;for(let y=0,g=l.length;y<g;y++){o.isInterleavedBufferAttribute?d=l[y]*o.data.stride+o.offset:d=l[y]*u;for(let m=0;m<u;m++)f[p++]=c[d++]}return new wt(f,u,h)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let t=new i,n=this.index.array,s=this.attributes;for(let o in s){let l=s[o],c=e(l,n);t.setAttribute(o,c)}let r=this.morphAttributes;for(let o in r){let l=[],c=r[o];for(let u=0,h=c.length;u<h;u++){let f=c[u],d=e(f,n);l.push(d)}t.morphAttributes[o]=l}t.morphTargetsRelative=this.morphTargetsRelative;let a=this.groups;for(let o=0,l=a.length;o<l;o++){let c=a[o];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){let e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){let l=this.parameters;for(let c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let l in n){let c=n[l];e.data.attributes[l]=c.toJSON(e.data)}let s={},r=!1;for(let l in this.morphAttributes){let c=this.morphAttributes[l],u=[];for(let h=0,f=c.length;h<f;h++){let d=c[h];u.push(d.toJSON(e.data))}u.length>0&&(s[l]=u,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone());let s=e.attributes;for(let c in s){let u=s[c];this.setAttribute(c,u.clone(t))}let r=e.morphAttributes;for(let c in r){let u=[],h=r[c];for(let f=0,d=h.length;f<d;f++)u.push(h[f].clone(t));this.morphAttributes[c]=u}this.morphTargetsRelative=e.morphTargetsRelative;let a=e.groups;for(let c=0,u=a.length;c<u;c++){let h=a[c];this.addGroup(h.start,h.count,h.materialIndex)}let o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());let l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}},mu=new qe,Vi=new bi,za=new en,gu=new D,ka=new D,Ha=new D,Va=new D,yc=new D,Ga=new D,yu=new D,Wa=new D,ht=class extends gt{constructor(e=new _t,t=new un){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){let o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(e,t){let n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(s,e);let o=this.morphTargetInfluences;if(r&&o){Ga.set(0,0,0);for(let l=0,c=r.length;l<c;l++){let u=o[l],h=r[l];u!==0&&(yc.fromBufferAttribute(h,e),a?Ga.addScaledVector(yc,u):Ga.addScaledVector(yc.sub(t),u))}t.add(Ga)}return t}raycast(e,t){let n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),za.copy(n.boundingSphere),za.applyMatrix4(r),Vi.copy(e.ray).recast(e.near),!(za.containsPoint(Vi.origin)===!1&&(Vi.intersectSphere(za,gu)===null||Vi.origin.distanceToSquared(gu)>(e.far-e.near)**2))&&(mu.copy(r).invert(),Vi.copy(e.ray).applyMatrix4(mu),!(n.boundingBox!==null&&Vi.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,Vi)))}_computeIntersections(e,t,n){let s,r=this.geometry,a=this.material,o=r.index,l=r.attributes.position,c=r.attributes.uv,u=r.attributes.uv1,h=r.attributes.normal,f=r.groups,d=r.drawRange;if(o!==null)if(Array.isArray(a))for(let p=0,y=f.length;p<y;p++){let g=f[p],m=a[g.materialIndex],E=Math.max(g.start,d.start),v=Math.min(o.count,Math.min(g.start+g.count,d.start+d.count));for(let _=E,T=v;_<T;_+=3){let w=o.getX(_),R=o.getX(_+1),I=o.getX(_+2);s=Xa(this,m,e,n,c,u,h,w,R,I),s&&(s.faceIndex=Math.floor(_/3),s.face.materialIndex=g.materialIndex,t.push(s))}}else{let p=Math.max(0,d.start),y=Math.min(o.count,d.start+d.count);for(let g=p,m=y;g<m;g+=3){let E=o.getX(g),v=o.getX(g+1),_=o.getX(g+2);s=Xa(this,a,e,n,c,u,h,E,v,_),s&&(s.faceIndex=Math.floor(g/3),t.push(s))}}else if(l!==void 0)if(Array.isArray(a))for(let p=0,y=f.length;p<y;p++){let g=f[p],m=a[g.materialIndex],E=Math.max(g.start,d.start),v=Math.min(l.count,Math.min(g.start+g.count,d.start+d.count));for(let _=E,T=v;_<T;_+=3){let w=_,R=_+1,I=_+2;s=Xa(this,m,e,n,c,u,h,w,R,I),s&&(s.faceIndex=Math.floor(_/3),s.face.materialIndex=g.materialIndex,t.push(s))}}else{let p=Math.max(0,d.start),y=Math.min(l.count,d.start+d.count);for(let g=p,m=y;g<m;g+=3){let E=g,v=g+1,_=g+2;s=Xa(this,a,e,n,c,u,h,E,v,_),s&&(s.faceIndex=Math.floor(g/3),t.push(s))}}}};function Hp(i,e,t,n,s,r,a,o){let l;if(e.side===zt?l=n.intersectTriangle(a,r,s,!0,o):l=n.intersectTriangle(s,r,a,e.side===jn,o),l===null)return null;Wa.copy(o),Wa.applyMatrix4(i.matrixWorld);let c=t.ray.origin.distanceTo(Wa);return c<t.near||c>t.far?null:{distance:c,point:Wa.clone(),object:i}}function Xa(i,e,t,n,s,r,a,o,l,c){i.getVertexPosition(o,ka),i.getVertexPosition(l,Ha),i.getVertexPosition(c,Va);let u=Hp(i,e,t,n,ka,Ha,Va,yu);if(u){let h=new D;vi.getBarycoord(yu,ka,Ha,Va,h),s&&(u.uv=vi.getInterpolatedAttribute(s,o,l,c,h,new fe)),r&&(u.uv1=vi.getInterpolatedAttribute(r,o,l,c,h,new fe)),a&&(u.normal=vi.getInterpolatedAttribute(a,o,l,c,h,new D),u.normal.dot(n.direction)>0&&u.normal.multiplyScalar(-1));let f={a:o,b:l,c,normal:new D,materialIndex:0};vi.getNormal(ka,Ha,Va,f.normal),u.face=f,u.barycoord=h}return u}var It=class i extends _t{constructor(e=1,t=1,n=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:s,heightSegments:r,depthSegments:a};let o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);let l=[],c=[],u=[],h=[],f=0,d=0;p("z","y","x",-1,-1,n,t,e,a,r,0),p("z","y","x",1,-1,n,t,-e,a,r,1),p("x","z","y",1,1,e,n,t,s,a,2),p("x","z","y",1,-1,e,n,-t,s,a,3),p("x","y","z",1,-1,e,t,n,s,r,4),p("x","y","z",-1,-1,e,t,-n,s,r,5),this.setIndex(l),this.setAttribute("position",new tt(c,3)),this.setAttribute("normal",new tt(u,3)),this.setAttribute("uv",new tt(h,2));function p(y,g,m,E,v,_,T,w,R,I,S){let M=_/R,P=T/I,F=_/2,V=T/2,$=w/2,L=R+1,H=I+1,N=0,k=0,Q=new D;for(let le=0;le<H;le++){let ye=le*P-V;for(let Ne=0;Ne<L;Ne++){let Xe=Ne*M-F;Q[y]=Xe*E,Q[g]=ye*v,Q[m]=$,c.push(Q.x,Q.y,Q.z),Q[y]=0,Q[g]=0,Q[m]=w>0?1:-1,u.push(Q.x,Q.y,Q.z),h.push(Ne/R),h.push(1-le/I),N+=1}}for(let le=0;le<I;le++)for(let ye=0;ye<R;ye++){let Ne=f+ye+L*le,Xe=f+ye+L*(le+1),et=f+(ye+1)+L*(le+1),Ke=f+(ye+1)+L*le;l.push(Ne,Xe,Ke),l.push(Xe,et,Ke),k+=6}o.addGroup(d,k,S),d+=k,f+=N}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}};function os(i){let e={};for(let t in i){e[t]={};for(let n in i[t]){let s=i[t][n];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=s.clone():Array.isArray(s)?e[t][n]=s.slice():e[t][n]=s}}return e}function Wt(i){let e={};for(let t=0;t<i.length;t++){let n=os(i[t]);for(let s in n)e[s]=n[s]}return e}function Vp(i){let e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function nh(i){let e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:it.workingColorSpace}var Ud={clone:os,merge:Wt},Gp=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Wp=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,dn=class extends zn{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Gp,this.fragmentShader=Wp,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=os(e.uniforms),this.uniformsGroups=Vp(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let s in this.uniforms){let a=this.uniforms[s].value;a&&a.isTexture?t.uniforms[s]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[s]={type:"m4",value:a.toArray()}:t.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let n={};for(let s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}},Nr=class extends gt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new qe,this.projectionMatrix=new qe,this.projectionMatrixInverse=new qe,this.coordinateSystem=Tn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}},xi=new D,_u=new fe,xu=new fe,Gt=class extends Nr{constructor(e=50,t=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=Os*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(br*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Os*2*Math.atan(Math.tan(br*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){xi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(xi.x,xi.y).multiplyScalar(-e/xi.z),xi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(xi.x,xi.y).multiplyScalar(-e/xi.z)}getViewSize(e,t){return this.getViewBounds(e,_u,xu),t.subVectors(xu,_u)}setViewOffset(e,t,n,s,r,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(br*.5*this.fov)/this.zoom,n=2*t,s=this.aspect*n,r=-.5*s,a=this.view;if(this.view!==null&&this.view.enabled){let l=a.fullWidth,c=a.fullHeight;r+=a.offsetX*s/l,t-=a.offsetY*n/c,s*=a.width/l,n*=a.height/c}let o=this.filmOffset;o!==0&&(r+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}},Ps=-90,Ls=1,po=class extends gt{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let s=new Gt(Ps,Ls,e,t);s.layers=this.layers,this.add(s);let r=new Gt(Ps,Ls,e,t);r.layers=this.layers,this.add(r);let a=new Gt(Ps,Ls,e,t);a.layers=this.layers,this.add(a);let o=new Gt(Ps,Ls,e,t);o.layers=this.layers,this.add(o);let l=new Gt(Ps,Ls,e,t);l.layers=this.layers,this.add(l);let c=new Gt(Ps,Ls,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[n,s,r,a,o,l]=t;for(let c of t)this.remove(c);if(e===Tn)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===Ir)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(let c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[r,a,o,l,c,u]=this.children,h=e.getRenderTarget(),f=e.getActiveCubeFace(),d=e.getActiveMipmapLevel(),p=e.xr.enabled;e.xr.enabled=!1;let y=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,s),e.render(t,r),e.setRenderTarget(n,1,s),e.render(t,a),e.setRenderTarget(n,2,s),e.render(t,o),e.setRenderTarget(n,3,s),e.render(t,l),e.setRenderTarget(n,4,s),e.render(t,c),n.texture.generateMipmaps=y,e.setRenderTarget(n,5,s),e.render(t,u),e.setRenderTarget(h,f,d),e.xr.enabled=p,n.texture.needsPMREMUpdate=!0}},Fr=class extends Qt{constructor(e=[],t=ss,n,s,r,a,o,l,c,u){super(e,t,n,s,r,a,o,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},mo=class extends Bn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},s=[n,n,n,n,n,n];this.texture=new Fr(s),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new It(5,5,5),r=new dn({name:"CubemapFromEquirect",uniforms:os(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:zt,blending:ri});r.uniforms.tEquirect.value=t;let a=new ht(s,r),o=t.minFilter;return t.minFilter===Ti&&(t.minFilter=An),new po(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,s=!0){let r=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,s);e.setRenderTarget(r)}},Et=class extends gt{constructor(){super(),this.isGroup=!0,this.type="Group"}},Xp={type:"move"},Hs=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Et,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Et,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new D,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new D),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Et,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new D,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new D),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let s=null,r=null,a=null,o=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){a=!0;for(let y of e.hand.values()){let g=t.getJointPose(y,n),m=this._getHandJoint(c,y);g!==null&&(m.matrix.fromArray(g.transform.matrix),m.matrix.decompose(m.position,m.rotation,m.scale),m.matrixWorldNeedsUpdate=!0,m.jointRadius=g.radius),m.visible=g!==null}let u=c.joints["index-finger-tip"],h=c.joints["thumb-tip"],f=u.position.distanceTo(h.position),d=.02,p=.005;c.inputState.pinching&&f>d+p?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&f<=d-p&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));o!==null&&(s=t.getPose(e.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Xp)))}return o!==null&&(o.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let n=new Et;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}},Or=class i{constructor(e,t=25e-5){this.isFogExp2=!0,this.name="",this.color=new ke(e),this.density=t}clone(){return new i(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}};var Br=class extends gt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new hn,this.environmentIntensity=1,this.environmentRotation=new hn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}};var $a=new D,vu=new D,zr=class extends gt{constructor(){super(),this.isLOD=!0,this._currentLevel=0,this.type="LOD",Object.defineProperties(this,{levels:{enumerable:!0,value:[]}}),this.autoUpdate=!0}copy(e){super.copy(e,!1);let t=e.levels;for(let n=0,s=t.length;n<s;n++){let r=t[n];this.addLevel(r.object.clone(),r.distance,r.hysteresis)}return this.autoUpdate=e.autoUpdate,this}addLevel(e,t=0,n=0){t=Math.abs(t);let s=this.levels,r;for(r=0;r<s.length&&!(t<s[r].distance);r++);return s.splice(r,0,{distance:t,hysteresis:n,object:e}),this.add(e),this}removeLevel(e){let t=this.levels;for(let n=0;n<t.length;n++)if(t[n].distance===e){let s=t.splice(n,1);return this.remove(s[0].object),!0}return!1}getCurrentLevel(){return this._currentLevel}getObjectForDistance(e){let t=this.levels;if(t.length>0){let n,s;for(n=1,s=t.length;n<s;n++){let r=t[n].distance;if(t[n].object.visible&&(r-=r*t[n].hysteresis),e<r)break}return t[n-1].object}return null}raycast(e,t){if(this.levels.length>0){$a.setFromMatrixPosition(this.matrixWorld);let s=e.ray.origin.distanceTo($a);this.getObjectForDistance(s).raycast(e,t)}}update(e){let t=this.levels;if(t.length>1){$a.setFromMatrixPosition(e.matrixWorld),vu.setFromMatrixPosition(this.matrixWorld);let n=$a.distanceTo(vu)/e.zoom;t[0].object.visible=!0;let s,r;for(s=1,r=t.length;s<r;s++){let a=t[s].distance;if(t[s].object.visible&&(a-=a*t[s].hysteresis),n>=a)t[s-1].object.visible=!1,t[s].object.visible=!0;else break}for(this._currentLevel=s-1;s<r;s++)t[s].object.visible=!1}}toJSON(e){let t=super.toJSON(e);this.autoUpdate===!1&&(t.object.autoUpdate=!1),t.object.levels=[];let n=this.levels;for(let s=0,r=n.length;s<r;s++){let a=n[s];t.object.levels.push({object:a.object.uuid,distance:a.distance,hysteresis:a.hysteresis})}return t}},Mu=new D,Su=new mt,bu=new mt,$p=new D,Eu=new qe,qa=new D,_c=new en,wu=new qe,xc=new bi,kr=class extends ht{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=Tc,this.bindMatrix=new qe,this.bindMatrixInverse=new qe,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){let e=this.geometry;this.boundingBox===null&&(this.boundingBox=new Rn),this.boundingBox.makeEmpty();let t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,qa),this.boundingBox.expandByPoint(qa)}computeBoundingSphere(){let e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new en),this.boundingSphere.makeEmpty();let t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,qa),this.boundingSphere.expandByPoint(qa)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,t){let n=this.material,s=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),_c.copy(this.boundingSphere),_c.applyMatrix4(s),e.ray.intersectsSphere(_c)!==!1&&(wu.copy(s).invert(),xc.copy(e.ray).applyMatrix4(wu),!(this.boundingBox!==null&&xc.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(e,t,xc)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){let e=new mt,t=this.geometry.attributes.skinWeight;for(let n=0,s=t.count;n<s;n++){e.fromBufferAttribute(t,n);let r=1/e.manhattanLength();r!==1/0?e.multiplyScalar(r):e.set(1,0,0,0),t.setXYZW(n,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===Tc?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===gd?this.bindMatrixInverse.copy(this.bindMatrix).invert():console.warn("THREE.SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){let n=this.skeleton,s=this.geometry;Su.fromBufferAttribute(s.attributes.skinIndex,e),bu.fromBufferAttribute(s.attributes.skinWeight,e),Mu.copy(t).applyMatrix4(this.bindMatrix),t.set(0,0,0);for(let r=0;r<4;r++){let a=bu.getComponent(r);if(a!==0){let o=Su.getComponent(r);Eu.multiplyMatrices(n.bones[o].matrixWorld,n.boneInverses[o]),t.addScaledVector($p.copy(Mu).applyMatrix4(Eu),a)}}return t.applyMatrix4(this.bindMatrixInverse)}},fn=class extends gt{constructor(){super(),this.isBone=!0,this.type="Bone"}},Hr=class extends Qt{constructor(e=null,t=1,n=1,s,r,a,o,l,c=jt,u=jt,h,f){super(null,a,o,l,c,u,s,r,h,f),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},Tu=new qe,qp=new qe,Vr=class i{constructor(e=[],t=[]){this.uuid=li(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){let e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){console.warn("THREE.Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,s=this.bones.length;n<s;n++)this.boneInverses.push(new qe)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){let n=new qe;this.bones[e]&&n.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){let n=this.bones[e];n&&n.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){let n=this.bones[e];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){let e=this.bones,t=this.boneInverses,n=this.boneMatrices,s=this.boneTexture;for(let r=0,a=e.length;r<a;r++){let o=e[r]?e[r].matrixWorld:qp;Tu.multiplyMatrices(o,t[r]),Tu.toArray(n,r*16)}s!==null&&(s.needsUpdate=!0)}clone(){return new i(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);let t=new Float32Array(e*e*4);t.set(this.boneMatrices);let n=new Hr(t,e,e,mn,vn);return n.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=n,this}getBoneByName(e){for(let t=0,n=this.bones.length;t<n;t++){let s=this.bones[t];if(s.name===e)return s}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let n=0,s=e.bones.length;n<s;n++){let r=e.bones[n],a=t[r];a===void 0&&(console.warn("THREE.Skeleton: No bone found with UUID:",r),a=new fn),this.bones.push(a),this.boneInverses.push(new qe().fromArray(e.boneInverses[n]))}return this.init(),this}toJSON(){let e={metadata:{version:4.7,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;let t=this.bones,n=this.boneInverses;for(let s=0,r=t.length;s<r;s++){let a=t[s];e.bones.push(a.uuid);let o=n[s];e.boneInverses.push(o.toArray())}return e}},Gr=class extends wt{constructor(e,t,n,s=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){let e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}},Ds=new qe,Au=new qe,Ya=[],Ru=new Rn,Yp=new qe,xr=new ht,vr=new en,kn=class extends ht{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new Gr(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<n;s++)this.setMatrixAt(s,Yp)}computeBoundingBox(){let e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new Rn),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Ds),Ru.copy(e.boundingBox).applyMatrix4(Ds),this.boundingBox.union(Ru)}computeBoundingSphere(){let e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new en),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Ds),vr.copy(e.boundingSphere).applyMatrix4(Ds),this.boundingSphere.union(vr)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){let n=t.morphTargetInfluences,s=this.morphTexture.source.data.data,r=n.length+1,a=e*r+1;for(let o=0;o<n.length;o++)n[o]=s[a+o]}raycast(e,t){let n=this.matrixWorld,s=this.count;if(xr.geometry=this.geometry,xr.material=this.material,xr.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),vr.copy(this.boundingSphere),vr.applyMatrix4(n),e.ray.intersectsSphere(vr)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,Ds),Au.multiplyMatrices(n,Ds),xr.matrixWorld=Au,xr.raycast(e,Ya);for(let a=0,o=Ya.length;a<o;a++){let l=Ya[a];l.instanceId=r,l.object=this,t.push(l)}Ya.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new Gr(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}setMorphAt(e,t){let n=t.morphTargetInfluences,s=n.length+1;this.morphTexture===null&&(this.morphTexture=new Hr(new Float32Array(s*this.count),s,this.count,Yo,vn));let r=this.morphTexture.source.data.data,a=0;for(let c=0;c<n.length;c++)a+=n[c];let o=this.geometry.morphTargetsRelative?1:1-a,l=s*e;r[l]=o,r.set(n,l+1)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}},vc=new D,Zp=new D,Jp=new Ge,Fn=class{constructor(e=new D(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,s){return this.normal.set(e,t,n),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let s=vc.subVectors(n,t).cross(Zp.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){let n=e.delta(vc),s=this.normal.dot(n);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let r=-(e.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:t.copy(e.start).addScaledVector(n,r)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||Jp.getNormalMatrix(e),s=this.coplanarPoint(vc).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}},Gi=new en,Kp=new fe(.5,.5),Za=new D,Ei=class{constructor(e=new Fn,t=new Fn,n=new Fn,s=new Fn,r=new Fn,a=new Fn){this.planes=[e,t,n,s,r,a]}set(e,t,n,s,r,a){let o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=Tn,n=!1){let s=this.planes,r=e.elements,a=r[0],o=r[1],l=r[2],c=r[3],u=r[4],h=r[5],f=r[6],d=r[7],p=r[8],y=r[9],g=r[10],m=r[11],E=r[12],v=r[13],_=r[14],T=r[15];if(s[0].setComponents(c-a,d-u,m-p,T-E).normalize(),s[1].setComponents(c+a,d+u,m+p,T+E).normalize(),s[2].setComponents(c+o,d+h,m+y,T+v).normalize(),s[3].setComponents(c-o,d-h,m-y,T-v).normalize(),n)s[4].setComponents(l,f,g,_).normalize(),s[5].setComponents(c-l,d-f,m-g,T-_).normalize();else if(s[4].setComponents(c-l,d-f,m-g,T-_).normalize(),t===Tn)s[5].setComponents(c+l,d+f,m+g,T+_).normalize();else if(t===Ir)s[5].setComponents(l,f,g,_).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Gi.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Gi.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Gi)}intersectsSprite(e){Gi.center.set(0,0,0);let t=Kp.distanceTo(e.center);return Gi.radius=.7071067811865476+t,Gi.applyMatrix4(e.matrixWorld),this.intersectsSphere(Gi)}intersectsSphere(e){let t=this.planes,n=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let s=t[n];if(Za.x=s.normal.x>0?e.max.x:e.min.x,Za.y=s.normal.y>0?e.max.y:e.min.y,Za.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(Za)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};var Wr=class extends zn{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new ke(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}},go=new D,yo=new D,Cu=new qe,Mr=new bi,Ja=new en,Mc=new D,Iu=new D,Vs=class extends gt{constructor(e=new _t,t=new Wr){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[0];for(let s=1,r=t.count;s<r;s++)go.fromBufferAttribute(t,s-1),yo.fromBufferAttribute(t,s),n[s]=n[s-1],n[s]+=go.distanceTo(yo);e.setAttribute("lineDistance",new tt(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){let n=this.geometry,s=this.matrixWorld,r=e.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Ja.copy(n.boundingSphere),Ja.applyMatrix4(s),Ja.radius+=r,e.ray.intersectsSphere(Ja)===!1)return;Cu.copy(s).invert(),Mr.copy(e.ray).applyMatrix4(Cu);let o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=this.isLineSegments?2:1,u=n.index,f=n.attributes.position;if(u!==null){let d=Math.max(0,a.start),p=Math.min(u.count,a.start+a.count);for(let y=d,g=p-1;y<g;y+=c){let m=u.getX(y),E=u.getX(y+1),v=Ka(this,e,Mr,l,m,E,y);v&&t.push(v)}if(this.isLineLoop){let y=u.getX(p-1),g=u.getX(d),m=Ka(this,e,Mr,l,y,g,p-1);m&&t.push(m)}}else{let d=Math.max(0,a.start),p=Math.min(f.count,a.start+a.count);for(let y=d,g=p-1;y<g;y+=c){let m=Ka(this,e,Mr,l,y,y+1,y);m&&t.push(m)}if(this.isLineLoop){let y=Ka(this,e,Mr,l,p-1,d,p-1);y&&t.push(y)}}}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){let o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}};function Ka(i,e,t,n,s,r,a){let o=i.geometry.attributes.position;if(go.fromBufferAttribute(o,s),yo.fromBufferAttribute(o,r),t.distanceSqToSegment(go,yo,Mc,Iu)>n)return;Mc.applyMatrix4(i.matrixWorld);let c=e.ray.origin.distanceTo(Mc);if(!(c<e.near||c>e.far))return{distance:c,point:Iu.clone().applyMatrix4(i.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:i}}var Gs=class extends zn{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new ke(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},Pu=new qe,Cc=new bi,ja=new en,Qa=new D,Xr=class extends gt{constructor(e=new _t,t=new Gs){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){let n=this.geometry,s=this.matrixWorld,r=e.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),ja.copy(n.boundingSphere),ja.applyMatrix4(s),ja.radius+=r,e.ray.intersectsSphere(ja)===!1)return;Pu.copy(s).invert(),Cc.copy(e.ray).applyMatrix4(Pu);let o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=n.index,h=n.attributes.position;if(c!==null){let f=Math.max(0,a.start),d=Math.min(c.count,a.start+a.count);for(let p=f,y=d;p<y;p++){let g=c.getX(p);Qa.fromBufferAttribute(h,g),Lu(Qa,g,l,s,e,t,this)}}else{let f=Math.max(0,a.start),d=Math.min(h.count,a.start+a.count);for(let p=f,y=d;p<y;p++)Qa.fromBufferAttribute(h,p),Lu(Qa,p,l,s,e,t,this)}}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){let o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}};function Lu(i,e,t,n,s,r,a){let o=Cc.distanceSqToPoint(i);if(o<t){let l=new D;Cc.closestPointToPoint(i,l),l.applyMatrix4(n);let c=s.ray.origin.distanceTo(l);if(c<s.near||c>s.far)return;r.push({distance:c,distanceToRay:Math.sqrt(o),point:l,index:e,face:null,faceIndex:null,barycoord:null,object:a})}}var $r=class extends Qt{constructor(e,t,n=Ai,s,r,a,o=jt,l=jt,c,u=Fs,h=1){if(u!==Fs&&u!==js)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let f={width:e,height:t,depth:h};super(f,s,r,a,o,l,u,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new zs(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}},qr=class extends Qt{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}};var Yr=class i extends _t{constructor(e=1,t=32,n=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:s},t=Math.max(3,t);let r=[],a=[],o=[],l=[],c=new D,u=new fe;a.push(0,0,0),o.push(0,0,1),l.push(.5,.5);for(let h=0,f=3;h<=t;h++,f+=3){let d=n+h/t*s;c.x=e*Math.cos(d),c.y=e*Math.sin(d),a.push(c.x,c.y,c.z),o.push(0,0,1),u.x=(a[f]/e+1)/2,u.y=(a[f+1]/e+1)/2,l.push(u.x,u.y)}for(let h=1;h<=t;h++)r.push(h,h+1,0);this.setIndex(r),this.setAttribute("position",new tt(a,3)),this.setAttribute("normal",new tt(o,3)),this.setAttribute("uv",new tt(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radius,e.segments,e.thetaStart,e.thetaLength)}},Qn=class i extends _t{constructor(e=1,t=1,n=1,s=32,r=1,a=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:s,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:l};let c=this;s=Math.floor(s),r=Math.floor(r);let u=[],h=[],f=[],d=[],p=0,y=[],g=n/2,m=0;E(),a===!1&&(e>0&&v(!0),t>0&&v(!1)),this.setIndex(u),this.setAttribute("position",new tt(h,3)),this.setAttribute("normal",new tt(f,3)),this.setAttribute("uv",new tt(d,2));function E(){let _=new D,T=new D,w=0,R=(t-e)/n;for(let I=0;I<=r;I++){let S=[],M=I/r,P=M*(t-e)+e;for(let F=0;F<=s;F++){let V=F/s,$=V*l+o,L=Math.sin($),H=Math.cos($);T.x=P*L,T.y=-M*n+g,T.z=P*H,h.push(T.x,T.y,T.z),_.set(L,R,H).normalize(),f.push(_.x,_.y,_.z),d.push(V,1-M),S.push(p++)}y.push(S)}for(let I=0;I<s;I++)for(let S=0;S<r;S++){let M=y[S][I],P=y[S+1][I],F=y[S+1][I+1],V=y[S][I+1];(e>0||S!==0)&&(u.push(M,P,V),w+=3),(t>0||S!==r-1)&&(u.push(P,F,V),w+=3)}c.addGroup(m,w,0),m+=w}function v(_){let T=p,w=new fe,R=new D,I=0,S=_===!0?e:t,M=_===!0?1:-1;for(let F=1;F<=s;F++)h.push(0,g*M,0),f.push(0,M,0),d.push(.5,.5),p++;let P=p;for(let F=0;F<=s;F++){let $=F/s*l+o,L=Math.cos($),H=Math.sin($);R.x=S*H,R.y=g*M,R.z=S*L,h.push(R.x,R.y,R.z),f.push(0,M,0),w.x=L*.5+.5,w.y=H*.5*M+.5,d.push(w.x,w.y),p++}for(let F=0;F<s;F++){let V=T+F,$=P+F;_===!0?u.push($,$+1,V):u.push($+1,$,V),I+=3}c.addGroup(m,I,_===!0?1:2),m+=I}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}},Cn=class i extends Qn{constructor(e=1,t=1,n=32,s=1,r=!1,a=0,o=Math.PI*2){super(0,e,t,n,s,r,a,o),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:n,heightSegments:s,openEnded:r,thetaStart:a,thetaLength:o}}static fromJSON(e){return new i(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}},Ws=class i extends _t{constructor(e=[],t=[],n=1,s=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:n,detail:s};let r=[],a=[];o(s),c(n),u(),this.setAttribute("position",new tt(r,3)),this.setAttribute("normal",new tt(r.slice(),3)),this.setAttribute("uv",new tt(a,2)),s===0?this.computeVertexNormals():this.normalizeNormals();function o(E){let v=new D,_=new D,T=new D;for(let w=0;w<t.length;w+=3)d(t[w+0],v),d(t[w+1],_),d(t[w+2],T),l(v,_,T,E)}function l(E,v,_,T){let w=T+1,R=[];for(let I=0;I<=w;I++){R[I]=[];let S=E.clone().lerp(_,I/w),M=v.clone().lerp(_,I/w),P=w-I;for(let F=0;F<=P;F++)F===0&&I===w?R[I][F]=S:R[I][F]=S.clone().lerp(M,F/P)}for(let I=0;I<w;I++)for(let S=0;S<2*(w-I)-1;S++){let M=Math.floor(S/2);S%2===0?(f(R[I][M+1]),f(R[I+1][M]),f(R[I][M])):(f(R[I][M+1]),f(R[I+1][M+1]),f(R[I+1][M]))}}function c(E){let v=new D;for(let _=0;_<r.length;_+=3)v.x=r[_+0],v.y=r[_+1],v.z=r[_+2],v.normalize().multiplyScalar(E),r[_+0]=v.x,r[_+1]=v.y,r[_+2]=v.z}function u(){let E=new D;for(let v=0;v<r.length;v+=3){E.x=r[v+0],E.y=r[v+1],E.z=r[v+2];let _=g(E)/2/Math.PI+.5,T=m(E)/Math.PI+.5;a.push(_,1-T)}p(),h()}function h(){for(let E=0;E<a.length;E+=6){let v=a[E+0],_=a[E+2],T=a[E+4],w=Math.max(v,_,T),R=Math.min(v,_,T);w>.9&&R<.1&&(v<.2&&(a[E+0]+=1),_<.2&&(a[E+2]+=1),T<.2&&(a[E+4]+=1))}}function f(E){r.push(E.x,E.y,E.z)}function d(E,v){let _=E*3;v.x=e[_+0],v.y=e[_+1],v.z=e[_+2]}function p(){let E=new D,v=new D,_=new D,T=new D,w=new fe,R=new fe,I=new fe;for(let S=0,M=0;S<r.length;S+=9,M+=6){E.set(r[S+0],r[S+1],r[S+2]),v.set(r[S+3],r[S+4],r[S+5]),_.set(r[S+6],r[S+7],r[S+8]),w.set(a[M+0],a[M+1]),R.set(a[M+2],a[M+3]),I.set(a[M+4],a[M+5]),T.copy(E).add(v).add(_).divideScalar(3);let P=g(T);y(w,M+0,E,P),y(R,M+2,v,P),y(I,M+4,_,P)}}function y(E,v,_,T){T<0&&E.x===1&&(a[v]=E.x-1),_.x===0&&_.z===0&&(a[v]=T/2/Math.PI+.5)}function g(E){return Math.atan2(E.z,-E.x)}function m(E){return Math.atan2(-E.y,Math.sqrt(E.x*E.x+E.z*E.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.vertices,e.indices,e.radius,e.details)}},Ki=class i extends Ws{constructor(e=1,t=0){let n=(1+Math.sqrt(5))/2,s=1/n,r=[-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-s,-n,0,-s,n,0,s,-n,0,s,n,-s,-n,0,-s,n,0,s,-n,0,s,n,0,-n,0,-s,n,0,-s,-n,0,s,n,0,s],a=[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9];super(r,a,e,t),this.type="DodecahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new i(e.radius,e.detail)}};var pn=class{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){console.warn("THREE.Curve: .getPoint() not implemented.")}getPointAt(e,t){let n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){let e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let t=[],n,s=this.getPoint(0),r=0;t.push(0);for(let a=1;a<=e;a++)n=this.getPoint(a/e),r+=n.distanceTo(s),t.push(r),s=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){let n=this.getLengths(),s=0,r=n.length,a;t?a=t:a=e*n[r-1];let o=0,l=r-1,c;for(;o<=l;)if(s=Math.floor(o+(l-o)/2),c=n[s]-a,c<0)o=s+1;else if(c>0)l=s-1;else{l=s;break}if(s=l,n[s]===a)return s/(r-1);let u=n[s],f=n[s+1]-u,d=(a-u)/f;return(s+d)/(r-1)}getTangent(e,t){let s=e-1e-4,r=e+1e-4;s<0&&(s=0),r>1&&(r=1);let a=this.getPoint(s),o=this.getPoint(r),l=t||(a.isVector2?new fe:new D);return l.copy(o).sub(a).normalize(),l}getTangentAt(e,t){let n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t=!1){let n=new D,s=[],r=[],a=[],o=new D,l=new qe;for(let d=0;d<=e;d++){let p=d/e;s[d]=this.getTangentAt(p,new D)}r[0]=new D,a[0]=new D;let c=Number.MAX_VALUE,u=Math.abs(s[0].x),h=Math.abs(s[0].y),f=Math.abs(s[0].z);u<=c&&(c=u,n.set(1,0,0)),h<=c&&(c=h,n.set(0,1,0)),f<=c&&n.set(0,0,1),o.crossVectors(s[0],n).normalize(),r[0].crossVectors(s[0],o),a[0].crossVectors(s[0],r[0]);for(let d=1;d<=e;d++){if(r[d]=r[d-1].clone(),a[d]=a[d-1].clone(),o.crossVectors(s[d-1],s[d]),o.length()>Number.EPSILON){o.normalize();let p=Math.acos(Je(s[d-1].dot(s[d]),-1,1));r[d].applyMatrix4(l.makeRotationAxis(o,p))}a[d].crossVectors(s[d],r[d])}if(t===!0){let d=Math.acos(Je(r[0].dot(r[e]),-1,1));d/=e,s[0].dot(o.crossVectors(r[0],r[e]))>0&&(d=-d);for(let p=1;p<=e;p++)r[p].applyMatrix4(l.makeRotationAxis(s[p],d*p)),a[p].crossVectors(s[p],r[p])}return{tangents:s,normals:r,binormals:a}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){let e={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}},Xs=class extends pn{constructor(e=0,t=0,n=1,s=1,r=0,a=Math.PI*2,o=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=a,this.aClockwise=o,this.aRotation=l}getPoint(e,t=new fe){let n=t,s=Math.PI*2,r=this.aEndAngle-this.aStartAngle,a=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(a?r=0:r=s),this.aClockwise===!0&&!a&&(r===s?r=-s:r=r-s);let o=this.aStartAngle+e*r,l=this.aX+this.xRadius*Math.cos(o),c=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){let u=Math.cos(this.aRotation),h=Math.sin(this.aRotation),f=l-this.aX,d=c-this.aY;l=f*u-d*h+this.aX,c=f*h+d*u+this.aY}return n.set(l,c)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){let e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}},_o=class extends Xs{constructor(e,t,n,s,r,a){super(e,t,n,n,s,r,a),this.isArcCurve=!0,this.type="ArcCurve"}};function ih(){let i=0,e=0,t=0,n=0;function s(r,a,o,l){i=r,e=o,t=-3*r+3*a-2*o-l,n=2*r-2*a+o+l}return{initCatmullRom:function(r,a,o,l,c){s(a,o,c*(o-r),c*(l-a))},initNonuniformCatmullRom:function(r,a,o,l,c,u,h){let f=(a-r)/c-(o-r)/(c+u)+(o-a)/u,d=(o-a)/u-(l-a)/(u+h)+(l-o)/h;f*=u,d*=u,s(a,o,f,d)},calc:function(r){let a=r*r,o=a*r;return i+e*r+t*a+n*o}}}var eo=new D,Sc=new ih,bc=new ih,Ec=new ih,wi=class extends pn{constructor(e=[],t=!1,n="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=n,this.tension=s}getPoint(e,t=new D){let n=t,s=this.points,r=s.length,a=(r-(this.closed?0:1))*e,o=Math.floor(a),l=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/r)+1)*r:l===0&&o===r-1&&(o=r-2,l=1);let c,u;this.closed||o>0?c=s[(o-1)%r]:(eo.subVectors(s[0],s[1]).add(s[0]),c=eo);let h=s[o%r],f=s[(o+1)%r];if(this.closed||o+2<r?u=s[(o+2)%r]:(eo.subVectors(s[r-1],s[r-2]).add(s[r-1]),u=eo),this.curveType==="centripetal"||this.curveType==="chordal"){let d=this.curveType==="chordal"?.5:.25,p=Math.pow(c.distanceToSquared(h),d),y=Math.pow(h.distanceToSquared(f),d),g=Math.pow(f.distanceToSquared(u),d);y<1e-4&&(y=1),p<1e-4&&(p=y),g<1e-4&&(g=y),Sc.initNonuniformCatmullRom(c.x,h.x,f.x,u.x,p,y,g),bc.initNonuniformCatmullRom(c.y,h.y,f.y,u.y,p,y,g),Ec.initNonuniformCatmullRom(c.z,h.z,f.z,u.z,p,y,g)}else this.curveType==="catmullrom"&&(Sc.initCatmullRom(c.x,h.x,f.x,u.x,this.tension),bc.initCatmullRom(c.y,h.y,f.y,u.y,this.tension),Ec.initCatmullRom(c.z,h.z,f.z,u.z,this.tension));return n.set(Sc.calc(l),bc.calc(l),Ec.calc(l)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let s=e.points[t];this.points.push(s.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let s=this.points[t];e.points.push(s.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let s=e.points[t];this.points.push(new D().fromArray(s))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}};function Du(i,e,t,n,s){let r=(n-e)*.5,a=(s-t)*.5,o=i*i,l=i*o;return(2*t-2*n+r+a)*l+(-3*t+3*n-2*r-a)*o+r*i+t}function jp(i,e){let t=1-i;return t*t*e}function Qp(i,e){return 2*(1-i)*i*e}function em(i,e){return i*i*e}function wr(i,e,t,n){return jp(i,e)+Qp(i,t)+em(i,n)}function tm(i,e){let t=1-i;return t*t*t*e}function nm(i,e){let t=1-i;return 3*t*t*i*e}function im(i,e){return 3*(1-i)*i*i*e}function sm(i,e){return i*i*i*e}function Tr(i,e,t,n,s){return tm(i,e)+nm(i,t)+im(i,n)+sm(i,s)}var Zr=class extends pn{constructor(e=new fe,t=new fe,n=new fe,s=new fe){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=n,this.v3=s}getPoint(e,t=new fe){let n=t,s=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(Tr(e,s.x,r.x,a.x,o.x),Tr(e,s.y,r.y,a.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},xo=class extends pn{constructor(e=new D,t=new D,n=new D,s=new D){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=n,this.v3=s}getPoint(e,t=new D){let n=t,s=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(Tr(e,s.x,r.x,a.x,o.x),Tr(e,s.y,r.y,a.y,o.y),Tr(e,s.z,r.z,a.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},Jr=class extends pn{constructor(e=new fe,t=new fe){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new fe){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new fe){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},vo=class extends pn{constructor(e=new D,t=new D){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new D){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new D){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Kr=class extends pn{constructor(e=new fe,t=new fe,n=new fe){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new fe){let n=t,s=this.v0,r=this.v1,a=this.v2;return n.set(wr(e,s.x,r.x,a.x),wr(e,s.y,r.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},jr=class extends pn{constructor(e=new D,t=new D,n=new D){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new D){let n=t,s=this.v0,r=this.v1,a=this.v2;return n.set(wr(e,s.x,r.x,a.x),wr(e,s.y,r.y,a.y),wr(e,s.z,r.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Qr=class extends pn{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new fe){let n=t,s=this.points,r=(s.length-1)*e,a=Math.floor(r),o=r-a,l=s[a===0?a:a-1],c=s[a],u=s[a>s.length-2?s.length-1:a+1],h=s[a>s.length-3?s.length-1:a+2];return n.set(Du(o,l.x,c.x,u.x,h.x),Du(o,l.y,c.y,u.y,h.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let s=e.points[t];this.points.push(s.clone())}return this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let s=this.points[t];e.points.push(s.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let s=e.points[t];this.points.push(new fe().fromArray(s))}return this}},Mo=Object.freeze({__proto__:null,ArcCurve:_o,CatmullRomCurve3:wi,CubicBezierCurve:Zr,CubicBezierCurve3:xo,EllipseCurve:Xs,LineCurve:Jr,LineCurve3:vo,QuadraticBezierCurve:Kr,QuadraticBezierCurve3:jr,SplineCurve:Qr}),So=class extends pn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){let e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){let n=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new Mo[n](t,e))}return this}getPoint(e,t){let n=e*this.getLength(),s=this.getCurveLengths(),r=0;for(;r<s.length;){if(s[r]>=n){let a=s[r]-n,o=this.curves[r],l=o.getLength(),c=l===0?0:1-a/l;return o.getPointAt(c,t)}r++}return null}getLength(){let e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let e=[],t=0;for(let n=0,s=this.curves.length;n<s;n++)t+=this.curves[n].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){let t=[],n;for(let s=0,r=this.curves;s<r.length;s++){let a=r[s],o=a.isEllipseCurve?e*2:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?e*a.points.length:e,l=a.getPoints(o);for(let c=0;c<l.length;c++){let u=l[c];n&&n.equals(u)||(t.push(u),n=u)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let s=e.curves[t];this.curves.push(s.clone())}return this.autoClose=e.autoClose,this}toJSON(){let e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,n=this.curves.length;t<n;t++){let s=this.curves[t];e.curves.push(s.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let s=e.curves[t];this.curves.push(new Mo[s.type]().fromJSON(s))}return this}},ea=class extends So{constructor(e){super(),this.type="Path",this.currentPoint=new fe,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,n=e.length;t<n;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){let n=new Jr(this.currentPoint.clone(),new fe(e,t));return this.curves.push(n),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,n,s){let r=new Kr(this.currentPoint.clone(),new fe(e,t),new fe(n,s));return this.curves.push(r),this.currentPoint.set(n,s),this}bezierCurveTo(e,t,n,s,r,a){let o=new Zr(this.currentPoint.clone(),new fe(e,t),new fe(n,s),new fe(r,a));return this.curves.push(o),this.currentPoint.set(r,a),this}splineThru(e){let t=[this.currentPoint.clone()].concat(e),n=new Qr(t);return this.curves.push(n),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,n,s,r,a){let o=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(e+o,t+l,n,s,r,a),this}absarc(e,t,n,s,r,a){return this.absellipse(e,t,n,n,s,r,a),this}ellipse(e,t,n,s,r,a,o,l){let c=this.currentPoint.x,u=this.currentPoint.y;return this.absellipse(e+c,t+u,n,s,r,a,o,l),this}absellipse(e,t,n,s,r,a,o,l){let c=new Xs(e,t,n,s,r,a,o,l);if(this.curves.length>0){let h=c.getPoint(0);h.equals(this.currentPoint)||this.lineTo(h.x,h.y)}this.curves.push(c);let u=c.getPoint(1);return this.currentPoint.copy(u),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){let e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}},$s=class extends ea{constructor(e){super(e),this.uuid=li(),this.type="Shape",this.holes=[]}getPointsHoles(e){let t=[];for(let n=0,s=this.holes.length;n<s;n++)t[n]=this.holes[n].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){let s=e.holes[t];this.holes.push(s.clone())}return this}toJSON(){let e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,n=this.holes.length;t<n;t++){let s=this.holes[t];e.holes.push(s.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){let s=e.holes[t];this.holes.push(new ea().fromJSON(s))}return this}};function rm(i,e,t=2){let n=e&&e.length,s=n?e[0]*t:i.length,r=Nd(i,0,s,t,!0),a=[];if(!r||r.next===r.prev)return a;let o,l,c;if(n&&(r=hm(i,e,r,t)),i.length>80*t){o=1/0,l=1/0;let u=-1/0,h=-1/0;for(let f=t;f<s;f+=t){let d=i[f],p=i[f+1];d<o&&(o=d),p<l&&(l=p),d>u&&(u=d),p>h&&(h=p)}c=Math.max(u-o,h-l),c=c!==0?32767/c:0}return ta(r,a,t,o,l,c,0),a}function Nd(i,e,t,n,s){let r;if(s===Mm(i,e,t,n)>0)for(let a=e;a<t;a+=n)r=Uu(a/n|0,i[a],i[a+1],r);else for(let a=t-n;a>=e;a-=n)r=Uu(a/n|0,i[a],i[a+1],r);return r&&qs(r,r.next)&&(ia(r),r=r.next),r}function ji(i,e){if(!i)return i;e||(e=i);let t=i,n;do if(n=!1,!t.steiner&&(qs(t,t.next)||St(t.prev,t,t.next)===0)){if(ia(t),t=e=t.prev,t===t.next)break;n=!0}else t=t.next;while(n||t!==e);return e}function ta(i,e,t,n,s,r,a){if(!i)return;!a&&r&&mm(i,n,s,r);let o=i;for(;i.prev!==i.next;){let l=i.prev,c=i.next;if(r?om(i,n,s,r):am(i)){e.push(l.i,i.i,c.i),ia(i),i=c.next,o=c.next;continue}if(i=c,i===o){a?a===1?(i=lm(ji(i),e),ta(i,e,t,n,s,r,2)):a===2&&cm(i,e,t,n,s,r):ta(ji(i),e,t,n,s,r,1);break}}}function am(i){let e=i.prev,t=i,n=i.next;if(St(e,t,n)>=0)return!1;let s=e.x,r=t.x,a=n.x,o=e.y,l=t.y,c=n.y,u=Math.min(s,r,a),h=Math.min(o,l,c),f=Math.max(s,r,a),d=Math.max(o,l,c),p=n.next;for(;p!==e;){if(p.x>=u&&p.x<=f&&p.y>=h&&p.y<=d&&Sr(s,o,r,l,a,c,p.x,p.y)&&St(p.prev,p,p.next)>=0)return!1;p=p.next}return!0}function om(i,e,t,n){let s=i.prev,r=i,a=i.next;if(St(s,r,a)>=0)return!1;let o=s.x,l=r.x,c=a.x,u=s.y,h=r.y,f=a.y,d=Math.min(o,l,c),p=Math.min(u,h,f),y=Math.max(o,l,c),g=Math.max(u,h,f),m=Ic(d,p,e,t,n),E=Ic(y,g,e,t,n),v=i.prevZ,_=i.nextZ;for(;v&&v.z>=m&&_&&_.z<=E;){if(v.x>=d&&v.x<=y&&v.y>=p&&v.y<=g&&v!==s&&v!==a&&Sr(o,u,l,h,c,f,v.x,v.y)&&St(v.prev,v,v.next)>=0||(v=v.prevZ,_.x>=d&&_.x<=y&&_.y>=p&&_.y<=g&&_!==s&&_!==a&&Sr(o,u,l,h,c,f,_.x,_.y)&&St(_.prev,_,_.next)>=0))return!1;_=_.nextZ}for(;v&&v.z>=m;){if(v.x>=d&&v.x<=y&&v.y>=p&&v.y<=g&&v!==s&&v!==a&&Sr(o,u,l,h,c,f,v.x,v.y)&&St(v.prev,v,v.next)>=0)return!1;v=v.prevZ}for(;_&&_.z<=E;){if(_.x>=d&&_.x<=y&&_.y>=p&&_.y<=g&&_!==s&&_!==a&&Sr(o,u,l,h,c,f,_.x,_.y)&&St(_.prev,_,_.next)>=0)return!1;_=_.nextZ}return!0}function lm(i,e){let t=i;do{let n=t.prev,s=t.next.next;!qs(n,s)&&Od(n,t,t.next,s)&&na(n,s)&&na(s,n)&&(e.push(n.i,t.i,s.i),ia(t),ia(t.next),t=i=s),t=t.next}while(t!==i);return ji(t)}function cm(i,e,t,n,s,r){let a=i;do{let o=a.next.next;for(;o!==a.prev;){if(a.i!==o.i&&_m(a,o)){let l=Bd(a,o);a=ji(a,a.next),l=ji(l,l.next),ta(a,e,t,n,s,r,0),ta(l,e,t,n,s,r,0);return}o=o.next}a=a.next}while(a!==i)}function hm(i,e,t,n){let s=[];for(let r=0,a=e.length;r<a;r++){let o=e[r]*n,l=r<a-1?e[r+1]*n:i.length,c=Nd(i,o,l,n,!1);c===c.next&&(c.steiner=!0),s.push(ym(c))}s.sort(um);for(let r=0;r<s.length;r++)t=dm(s[r],t);return t}function um(i,e){let t=i.x-e.x;if(t===0&&(t=i.y-e.y,t===0)){let n=(i.next.y-i.y)/(i.next.x-i.x),s=(e.next.y-e.y)/(e.next.x-e.x);t=n-s}return t}function dm(i,e){let t=fm(i,e);if(!t)return e;let n=Bd(t,i);return ji(n,n.next),ji(t,t.next)}function fm(i,e){let t=e,n=i.x,s=i.y,r=-1/0,a;if(qs(i,t))return t;do{if(qs(i,t.next))return t.next;if(s<=t.y&&s>=t.next.y&&t.next.y!==t.y){let h=t.x+(s-t.y)*(t.next.x-t.x)/(t.next.y-t.y);if(h<=n&&h>r&&(r=h,a=t.x<t.next.x?t:t.next,h===n))return a}t=t.next}while(t!==e);if(!a)return null;let o=a,l=a.x,c=a.y,u=1/0;t=a;do{if(n>=t.x&&t.x>=l&&n!==t.x&&Fd(s<c?n:r,s,l,c,s<c?r:n,s,t.x,t.y)){let h=Math.abs(s-t.y)/(n-t.x);na(t,i)&&(h<u||h===u&&(t.x>a.x||t.x===a.x&&pm(a,t)))&&(a=t,u=h)}t=t.next}while(t!==o);return a}function pm(i,e){return St(i.prev,i,e.prev)<0&&St(e.next,i,i.next)<0}function mm(i,e,t,n){let s=i;do s.z===0&&(s.z=Ic(s.x,s.y,e,t,n)),s.prevZ=s.prev,s.nextZ=s.next,s=s.next;while(s!==i);s.prevZ.nextZ=null,s.prevZ=null,gm(s)}function gm(i){let e,t=1;do{let n=i,s;i=null;let r=null;for(e=0;n;){e++;let a=n,o=0;for(let c=0;c<t&&(o++,a=a.nextZ,!!a);c++);let l=t;for(;o>0||l>0&&a;)o!==0&&(l===0||!a||n.z<=a.z)?(s=n,n=n.nextZ,o--):(s=a,a=a.nextZ,l--),r?r.nextZ=s:i=s,s.prevZ=r,r=s;n=a}r.nextZ=null,t*=2}while(e>1);return i}function Ic(i,e,t,n,s){return i=(i-t)*s|0,e=(e-n)*s|0,i=(i|i<<8)&16711935,i=(i|i<<4)&252645135,i=(i|i<<2)&858993459,i=(i|i<<1)&1431655765,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,i|e<<1}function ym(i){let e=i,t=i;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==i);return t}function Fd(i,e,t,n,s,r,a,o){return(s-a)*(e-o)>=(i-a)*(r-o)&&(i-a)*(n-o)>=(t-a)*(e-o)&&(t-a)*(r-o)>=(s-a)*(n-o)}function Sr(i,e,t,n,s,r,a,o){return!(i===a&&e===o)&&Fd(i,e,t,n,s,r,a,o)}function _m(i,e){return i.next.i!==e.i&&i.prev.i!==e.i&&!xm(i,e)&&(na(i,e)&&na(e,i)&&vm(i,e)&&(St(i.prev,i,e.prev)||St(i,e.prev,e))||qs(i,e)&&St(i.prev,i,i.next)>0&&St(e.prev,e,e.next)>0)}function St(i,e,t){return(e.y-i.y)*(t.x-e.x)-(e.x-i.x)*(t.y-e.y)}function qs(i,e){return i.x===e.x&&i.y===e.y}function Od(i,e,t,n){let s=no(St(i,e,t)),r=no(St(i,e,n)),a=no(St(t,n,i)),o=no(St(t,n,e));return!!(s!==r&&a!==o||s===0&&to(i,t,e)||r===0&&to(i,n,e)||a===0&&to(t,i,n)||o===0&&to(t,e,n))}function to(i,e,t){return e.x<=Math.max(i.x,t.x)&&e.x>=Math.min(i.x,t.x)&&e.y<=Math.max(i.y,t.y)&&e.y>=Math.min(i.y,t.y)}function no(i){return i>0?1:i<0?-1:0}function xm(i,e){let t=i;do{if(t.i!==i.i&&t.next.i!==i.i&&t.i!==e.i&&t.next.i!==e.i&&Od(t,t.next,i,e))return!0;t=t.next}while(t!==i);return!1}function na(i,e){return St(i.prev,i,i.next)<0?St(i,e,i.next)>=0&&St(i,i.prev,e)>=0:St(i,e,i.prev)<0||St(i,i.next,e)<0}function vm(i,e){let t=i,n=!1,s=(i.x+e.x)/2,r=(i.y+e.y)/2;do t.y>r!=t.next.y>r&&t.next.y!==t.y&&s<(t.next.x-t.x)*(r-t.y)/(t.next.y-t.y)+t.x&&(n=!n),t=t.next;while(t!==i);return n}function Bd(i,e){let t=Pc(i.i,i.x,i.y),n=Pc(e.i,e.x,e.y),s=i.next,r=e.prev;return i.next=e,e.prev=i,t.next=s,s.prev=t,n.next=t,t.prev=n,r.next=n,n.prev=r,n}function Uu(i,e,t,n){let s=Pc(i,e,t);return n?(s.next=n.next,s.prev=n,n.next.prev=s,n.next=s):(s.prev=s,s.next=s),s}function ia(i){i.next.prev=i.prev,i.prev.next=i.next,i.prevZ&&(i.prevZ.nextZ=i.nextZ),i.nextZ&&(i.nextZ.prevZ=i.prevZ)}function Pc(i,e,t){return{i,x:e,y:t,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function Mm(i,e,t,n){let s=0;for(let r=e,a=t-n;r<t;r+=n)s+=(i[a]-i[r])*(i[r+1]+i[a+1]),a=r;return s}var Lc=class{static triangulate(e,t,n=2){return rm(e,t,n)}},qi=class i{static area(e){let t=e.length,n=0;for(let s=t-1,r=0;r<t;s=r++)n+=e[s].x*e[r].y-e[r].x*e[s].y;return n*.5}static isClockWise(e){return i.area(e)<0}static triangulateShape(e,t){let n=[],s=[],r=[];Nu(e),Fu(n,e);let a=e.length;t.forEach(Nu);for(let l=0;l<t.length;l++)s.push(a),a+=t[l].length,Fu(n,t[l]);let o=Lc.triangulate(n,s);for(let l=0;l<o.length;l+=3)r.push(o.slice(l,l+3));return r}};function Nu(i){let e=i.length;e>2&&i[e-1].equals(i[0])&&i.pop()}function Fu(i,e){for(let t=0;t<e.length;t++)i.push(e[t].x),i.push(e[t].y)}var sa=class i extends _t{constructor(e=new $s([new fe(.5,.5),new fe(-.5,.5),new fe(-.5,-.5),new fe(.5,-.5)]),t={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:e,options:t},e=Array.isArray(e)?e:[e];let n=this,s=[],r=[];for(let o=0,l=e.length;o<l;o++){let c=e[o];a(c)}this.setAttribute("position",new tt(s,3)),this.setAttribute("uv",new tt(r,2)),this.computeVertexNormals();function a(o){let l=[],c=t.curveSegments!==void 0?t.curveSegments:12,u=t.steps!==void 0?t.steps:1,h=t.depth!==void 0?t.depth:1,f=t.bevelEnabled!==void 0?t.bevelEnabled:!0,d=t.bevelThickness!==void 0?t.bevelThickness:.2,p=t.bevelSize!==void 0?t.bevelSize:d-.1,y=t.bevelOffset!==void 0?t.bevelOffset:0,g=t.bevelSegments!==void 0?t.bevelSegments:3,m=t.extrudePath,E=t.UVGenerator!==void 0?t.UVGenerator:Sm,v,_=!1,T,w,R,I;m&&(v=m.getSpacedPoints(u),_=!0,f=!1,T=m.computeFrenetFrames(u,!1),w=new D,R=new D,I=new D),f||(g=0,d=0,p=0,y=0);let S=o.extractPoints(c),M=S.shape,P=S.holes;if(!qi.isClockWise(M)){M=M.reverse();for(let te=0,K=P.length;te<K;te++){let J=P[te];qi.isClockWise(J)&&(P[te]=J.reverse())}}function V(te){let J=10000000000000001e-36,Z=te[0];for(let he=1;he<=te.length;he++){let ie=he%te.length,ue=te[ie],He=ue.x-Z.x,ze=ue.y-Z.y,A=He*He+ze*ze,x=Math.max(Math.abs(ue.x),Math.abs(ue.y),Math.abs(Z.x),Math.abs(Z.y)),z=J*x*x;if(A<=z){te.splice(ie,1),he--;continue}Z=ue}}V(M),P.forEach(V);let $=P.length,L=M;for(let te=0;te<$;te++){let K=P[te];M=M.concat(K)}function H(te,K,J){return K||console.error("THREE.ExtrudeGeometry: vec does not exist"),te.clone().addScaledVector(K,J)}let N=M.length;function k(te,K,J){let Z,he,ie,ue=te.x-K.x,He=te.y-K.y,ze=J.x-te.x,A=J.y-te.y,x=ue*ue+He*He,z=ue*A-He*ze;if(Math.abs(z)>Number.EPSILON){let X=Math.sqrt(x),ee=Math.sqrt(ze*ze+A*A),q=K.x-He/X,Ie=K.y+ue/X,ce=J.x-A/ee,Ae=J.y+ze/ee,Re=((ce-q)*A-(Ae-Ie)*ze)/(ue*A-He*ze);Z=q+ue*Re-te.x,he=Ie+He*Re-te.y;let se=Z*Z+he*he;if(se<=2)return new fe(Z,he);ie=Math.sqrt(se/2)}else{let X=!1;ue>Number.EPSILON?ze>Number.EPSILON&&(X=!0):ue<-Number.EPSILON?ze<-Number.EPSILON&&(X=!0):Math.sign(He)===Math.sign(A)&&(X=!0),X?(Z=-He,he=ue,ie=Math.sqrt(x)):(Z=ue,he=He,ie=Math.sqrt(x/2))}return new fe(Z/ie,he/ie)}let Q=[];for(let te=0,K=L.length,J=K-1,Z=te+1;te<K;te++,J++,Z++)J===K&&(J=0),Z===K&&(Z=0),Q[te]=k(L[te],L[J],L[Z]);let le=[],ye,Ne=Q.concat();for(let te=0,K=$;te<K;te++){let J=P[te];ye=[];for(let Z=0,he=J.length,ie=he-1,ue=Z+1;Z<he;Z++,ie++,ue++)ie===he&&(ie=0),ue===he&&(ue=0),ye[Z]=k(J[Z],J[ie],J[ue]);le.push(ye),Ne=Ne.concat(ye)}let Xe;if(g===0)Xe=qi.triangulateShape(L,P);else{let te=[],K=[];for(let J=0;J<g;J++){let Z=J/g,he=d*Math.cos(Z*Math.PI/2),ie=p*Math.sin(Z*Math.PI/2)+y;for(let ue=0,He=L.length;ue<He;ue++){let ze=H(L[ue],Q[ue],ie);Le(ze.x,ze.y,-he),Z===0&&te.push(ze)}for(let ue=0,He=$;ue<He;ue++){let ze=P[ue];ye=le[ue];let A=[];for(let x=0,z=ze.length;x<z;x++){let X=H(ze[x],ye[x],ie);Le(X.x,X.y,-he),Z===0&&A.push(X)}Z===0&&K.push(A)}}Xe=qi.triangulateShape(te,K)}let et=Xe.length,Ke=p+y;for(let te=0;te<N;te++){let K=f?H(M[te],Ne[te],Ke):M[te];_?(R.copy(T.normals[0]).multiplyScalar(K.x),w.copy(T.binormals[0]).multiplyScalar(K.y),I.copy(v[0]).add(R).add(w),Le(I.x,I.y,I.z)):Le(K.x,K.y,0)}for(let te=1;te<=u;te++)for(let K=0;K<N;K++){let J=f?H(M[K],Ne[K],Ke):M[K];_?(R.copy(T.normals[te]).multiplyScalar(J.x),w.copy(T.binormals[te]).multiplyScalar(J.y),I.copy(v[te]).add(R).add(w),Le(I.x,I.y,I.z)):Le(J.x,J.y,h/u*te)}for(let te=g-1;te>=0;te--){let K=te/g,J=d*Math.cos(K*Math.PI/2),Z=p*Math.sin(K*Math.PI/2)+y;for(let he=0,ie=L.length;he<ie;he++){let ue=H(L[he],Q[he],Z);Le(ue.x,ue.y,h+J)}for(let he=0,ie=P.length;he<ie;he++){let ue=P[he];ye=le[he];for(let He=0,ze=ue.length;He<ze;He++){let A=H(ue[He],ye[He],Z);_?Le(A.x,A.y+v[u-1].y,v[u-1].x+J):Le(A.x,A.y,h+J)}}}Y(),ne();function Y(){let te=s.length/3;if(f){let K=0,J=N*K;for(let Z=0;Z<et;Z++){let he=Xe[Z];Te(he[2]+J,he[1]+J,he[0]+J)}K=u+g*2,J=N*K;for(let Z=0;Z<et;Z++){let he=Xe[Z];Te(he[0]+J,he[1]+J,he[2]+J)}}else{for(let K=0;K<et;K++){let J=Xe[K];Te(J[2],J[1],J[0])}for(let K=0;K<et;K++){let J=Xe[K];Te(J[0]+N*u,J[1]+N*u,J[2]+N*u)}}n.addGroup(te,s.length/3-te,0)}function ne(){let te=s.length/3,K=0;Se(L,K),K+=L.length;for(let J=0,Z=P.length;J<Z;J++){let he=P[J];Se(he,K),K+=he.length}n.addGroup(te,s.length/3-te,1)}function Se(te,K){let J=te.length;for(;--J>=0;){let Z=J,he=J-1;he<0&&(he=te.length-1);for(let ie=0,ue=u+g*2;ie<ue;ie++){let He=N*ie,ze=N*(ie+1),A=K+Z+He,x=K+he+He,z=K+he+ze,X=K+Z+ze;je(A,x,z,X)}}}function Le(te,K,J){l.push(te),l.push(K),l.push(J)}function Te(te,K,J){dt(te),dt(K),dt(J);let Z=s.length/3,he=E.generateTopUV(n,s,Z-3,Z-2,Z-1);C(he[0]),C(he[1]),C(he[2])}function je(te,K,J,Z){dt(te),dt(K),dt(Z),dt(K),dt(J),dt(Z);let he=s.length/3,ie=E.generateSideWallUV(n,s,he-6,he-3,he-2,he-1);C(ie[0]),C(ie[1]),C(ie[3]),C(ie[1]),C(ie[2]),C(ie[3])}function dt(te){s.push(l[te*3+0]),s.push(l[te*3+1]),s.push(l[te*3+2])}function C(te){r.push(te.x),r.push(te.y)}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON(),t=this.parameters.shapes,n=this.parameters.options;return bm(t,n,e)}static fromJSON(e,t){let n=[];for(let r=0,a=e.shapes.length;r<a;r++){let o=t[e.shapes[r]];n.push(o)}let s=e.options.extrudePath;return s!==void 0&&(e.options.extrudePath=new Mo[s.type]().fromJSON(s)),new i(n,e.options)}},Sm={generateTopUV:function(i,e,t,n,s){let r=e[t*3],a=e[t*3+1],o=e[n*3],l=e[n*3+1],c=e[s*3],u=e[s*3+1];return[new fe(r,a),new fe(o,l),new fe(c,u)]},generateSideWallUV:function(i,e,t,n,s,r){let a=e[t*3],o=e[t*3+1],l=e[t*3+2],c=e[n*3],u=e[n*3+1],h=e[n*3+2],f=e[s*3],d=e[s*3+1],p=e[s*3+2],y=e[r*3],g=e[r*3+1],m=e[r*3+2];return Math.abs(o-u)<Math.abs(a-c)?[new fe(a,1-l),new fe(c,1-h),new fe(f,1-p),new fe(y,1-m)]:[new fe(o,1-l),new fe(u,1-h),new fe(d,1-p),new fe(g,1-m)]}};function bm(i,e,t){if(t.shapes=[],Array.isArray(i))for(let n=0,s=i.length;n<s;n++){let r=i[n];t.shapes.push(r.uuid)}else t.shapes.push(i.uuid);return t.options=Object.assign({},e),e.extrudePath!==void 0&&(t.options.extrudePath=e.extrudePath.toJSON()),t}var ei=class i extends Ws{constructor(e=1,t=0){let n=(1+Math.sqrt(5))/2,s=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],r=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(s,r,e,t),this.type="IcosahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new i(e.radius,e.detail)}};var In=class i extends Ws{constructor(e=1,t=0){let n=[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],s=[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2];super(n,s,e,t),this.type="OctahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new i(e.radius,e.detail)}},ra=class i extends _t{constructor(e=1,t=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:s};let r=e/2,a=t/2,o=Math.floor(n),l=Math.floor(s),c=o+1,u=l+1,h=e/o,f=t/l,d=[],p=[],y=[],g=[];for(let m=0;m<u;m++){let E=m*f-a;for(let v=0;v<c;v++){let _=v*h-r;p.push(_,-E,0),y.push(0,0,1),g.push(v/o),g.push(1-m/l)}}for(let m=0;m<l;m++)for(let E=0;E<o;E++){let v=E+c*m,_=E+c*(m+1),T=E+1+c*(m+1),w=E+1+c*m;d.push(v,_,w),d.push(_,T,w)}this.setIndex(d),this.setAttribute("position",new tt(p,3)),this.setAttribute("normal",new tt(y,3)),this.setAttribute("uv",new tt(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.width,e.height,e.widthSegments,e.heightSegments)}};var ti=class i extends _t{constructor(e=1,t=32,n=16,s=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:s,phiLength:r,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));let l=Math.min(a+o,Math.PI),c=0,u=[],h=new D,f=new D,d=[],p=[],y=[],g=[];for(let m=0;m<=n;m++){let E=[],v=m/n,_=0;m===0&&a===0?_=.5/t:m===n&&l===Math.PI&&(_=-.5/t);for(let T=0;T<=t;T++){let w=T/t;h.x=-e*Math.cos(s+w*r)*Math.sin(a+v*o),h.y=e*Math.cos(a+v*o),h.z=e*Math.sin(s+w*r)*Math.sin(a+v*o),p.push(h.x,h.y,h.z),f.copy(h).normalize(),y.push(f.x,f.y,f.z),g.push(w+_,1-v),E.push(c++)}u.push(E)}for(let m=0;m<n;m++)for(let E=0;E<t;E++){let v=u[m][E+1],_=u[m][E],T=u[m+1][E],w=u[m+1][E+1];(m!==0||a>0)&&d.push(v,_,w),(m!==n-1||l<Math.PI)&&d.push(_,T,w)}this.setIndex(d),this.setAttribute("position",new tt(p,3)),this.setAttribute("normal",new tt(y,3)),this.setAttribute("uv",new tt(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}};var Pn=class i extends _t{constructor(e=1,t=.4,n=12,s=48,r=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:s,arc:r},n=Math.floor(n),s=Math.floor(s);let a=[],o=[],l=[],c=[],u=new D,h=new D,f=new D;for(let d=0;d<=n;d++)for(let p=0;p<=s;p++){let y=p/s*r,g=d/n*Math.PI*2;h.x=(e+t*Math.cos(g))*Math.cos(y),h.y=(e+t*Math.cos(g))*Math.sin(y),h.z=t*Math.sin(g),o.push(h.x,h.y,h.z),u.x=e*Math.cos(y),u.y=e*Math.sin(y),f.subVectors(h,u).normalize(),l.push(f.x,f.y,f.z),c.push(p/s),c.push(d/n)}for(let d=1;d<=n;d++)for(let p=1;p<=s;p++){let y=(s+1)*d+p-1,g=(s+1)*(d-1)+p-1,m=(s+1)*(d-1)+p,E=(s+1)*d+p;a.push(y,g,E),a.push(g,m,E)}this.setIndex(a),this.setAttribute("position",new tt(o,3)),this.setAttribute("normal",new tt(l,3)),this.setAttribute("uv",new tt(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}};var Qi=class i extends _t{constructor(e=new jr(new D(-1,-1,0),new D(-1,1,0),new D(1,1,0)),t=64,n=1,s=8,r=!1){super(),this.type="TubeGeometry",this.parameters={path:e,tubularSegments:t,radius:n,radialSegments:s,closed:r};let a=e.computeFrenetFrames(t,r);this.tangents=a.tangents,this.normals=a.normals,this.binormals=a.binormals;let o=new D,l=new D,c=new fe,u=new D,h=[],f=[],d=[],p=[];y(),this.setIndex(p),this.setAttribute("position",new tt(h,3)),this.setAttribute("normal",new tt(f,3)),this.setAttribute("uv",new tt(d,2));function y(){for(let v=0;v<t;v++)g(v);g(r===!1?t:0),E(),m()}function g(v){u=e.getPointAt(v/t,u);let _=a.normals[v],T=a.binormals[v];for(let w=0;w<=s;w++){let R=w/s*Math.PI*2,I=Math.sin(R),S=-Math.cos(R);l.x=S*_.x+I*T.x,l.y=S*_.y+I*T.y,l.z=S*_.z+I*T.z,l.normalize(),f.push(l.x,l.y,l.z),o.x=u.x+n*l.x,o.y=u.y+n*l.y,o.z=u.z+n*l.z,h.push(o.x,o.y,o.z)}}function m(){for(let v=1;v<=t;v++)for(let _=1;_<=s;_++){let T=(s+1)*(v-1)+(_-1),w=(s+1)*v+(_-1),R=(s+1)*v+_,I=(s+1)*(v-1)+_;p.push(T,w,I),p.push(w,R,I)}}function E(){for(let v=0;v<=t;v++)for(let _=0;_<=s;_++)c.x=v/t,c.y=_/s,d.push(c.x,c.y)}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON();return e.path=this.parameters.path.toJSON(),e}static fromJSON(e){return new i(new Mo[e.path.type]().fromJSON(e.path),e.tubularSegments,e.radius,e.radialSegments,e.closed)}};var Tt=class extends zn{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new ke(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new ke(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Kc,this.normalScale=new fe(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new hn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}};var bo=class extends zn{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Md,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},Eo=class extends zn{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}};var Ys=class extends Wr{constructor(e){super(),this.isLineDashedMaterial=!0,this.type="LineDashedMaterial",this.scale=1,this.dashSize=3,this.gapSize=1,this.setValues(e)}copy(e){return super.copy(e),this.scale=e.scale,this.dashSize=e.dashSize,this.gapSize=e.gapSize,this}};function io(i,e){return!i||i.constructor===e?i:typeof e.BYTES_PER_ELEMENT=="number"?new e(i):Array.prototype.slice.call(i)}function Em(i){return ArrayBuffer.isView(i)&&!(i instanceof DataView)}function wm(i){function e(s,r){return i[s]-i[r]}let t=i.length,n=new Array(t);for(let s=0;s!==t;++s)n[s]=s;return n.sort(e),n}function Ou(i,e,t){let n=i.length,s=new i.constructor(n);for(let r=0,a=0;a!==n;++r){let o=t[r]*e;for(let l=0;l!==e;++l)s[a++]=i[o+l]}return s}function zd(i,e,t,n){let s=1,r=i[0];for(;r!==void 0&&r[n]===void 0;)r=i[s++];if(r===void 0)return;let a=r[n];if(a!==void 0)if(Array.isArray(a))do a=r[n],a!==void 0&&(e.push(r.time),t.push(...a)),r=i[s++];while(r!==void 0);else if(a.toArray!==void 0)do a=r[n],a!==void 0&&(e.push(r.time),a.toArray(t,t.length)),r=i[s++];while(r!==void 0);else do a=r[n],a!==void 0&&(e.push(r.time),t.push(a)),r=i[s++];while(r!==void 0)}var es=class{constructor(e,t,n,s){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,s=t[n],r=t[n-1];e:{t:{let a;n:{i:if(!(e<s)){for(let o=n+2;;){if(s===void 0){if(e<r)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===o)break;if(r=s,s=t[++n],e<s)break t}a=t.length;break n}if(!(e>=r)){let o=t[1];e<o&&(n=2,r=o);for(let l=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===l)break;if(s=r,r=t[--n-1],e>=r)break t}a=n,n=0;break n}break e}for(;n<a;){let o=n+a>>>1;e<t[o]?a=o:n=o+1}if(s=t[n],r=t[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,s)}return this.interpolate_(n,r,e,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=e*s;for(let a=0;a!==s;++a)t[a]=n[r+a];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}},wo=class extends es{constructor(e,t,n,s){super(e,t,n,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Xi,endingEnd:Xi}}intervalChanged_(e,t,n){let s=this.parameterPositions,r=e-2,a=e+1,o=s[r],l=s[a];if(o===void 0)switch(this.getSettings_().endingStart){case $i:r=e,o=2*t-n;break;case Rr:r=s.length-2,o=t+s[r]-s[r+1];break;default:r=e,o=n}if(l===void 0)switch(this.getSettings_().endingEnd){case $i:a=e,l=2*n-t;break;case Rr:a=1,l=n+s[1]-s[0];break;default:a=e-1,l=t}let c=(n-t)*.5,u=this.valueSize;this._weightPrev=c/(t-o),this._weightNext=c/(l-n),this._offsetPrev=r*u,this._offsetNext=a*u}interpolate_(e,t,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,u=this._offsetPrev,h=this._offsetNext,f=this._weightPrev,d=this._weightNext,p=(n-t)/(s-t),y=p*p,g=y*p,m=-f*g+2*f*y-f*p,E=(1+f)*g+(-1.5-2*f)*y+(-.5+f)*p+1,v=(-1-d)*g+(1.5+d)*y+.5*p,_=d*g-d*y;for(let T=0;T!==o;++T)r[T]=m*a[u+T]+E*a[c+T]+v*a[l+T]+_*a[h+T];return r}},aa=class extends es{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e,t,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,u=(n-t)/(s-t),h=1-u;for(let f=0;f!==o;++f)r[f]=a[c+f]*h+a[l+f]*u;return r}},To=class extends es{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e){return this.copySampleValue_(e-1)}},tn=class{constructor(e,t,n,s){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=io(t,this.TimeBufferType),this.values=io(n,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:io(e.times,Array),values:io(e.values,Array)};let s=e.getInterpolation();s!==e.DefaultInterpolation&&(n.interpolation=s)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new To(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new aa(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new wo(this.times,this.values,this.getValueSize(),e)}setInterpolation(e){let t;switch(e){case Ar:t=this.InterpolantFactoryMethodDiscrete;break;case co:t=this.InterpolantFactoryMethodLinear;break;case so:t=this.InterpolantFactoryMethodSmooth;break}if(t===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Ar;case this.InterpolantFactoryMethodLinear:return co;case this.InterpolantFactoryMethodSmooth:return so}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,s=t.length;n!==s;++n)t[n]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,s=t.length;n!==s;++n)t[n]*=e}return this}trim(e,t){let n=this.times,s=n.length,r=0,a=s-1;for(;r!==s&&n[r]<e;)++r;for(;a!==-1&&n[a]>t;)--a;if(++a,r!==0||a!==s){r>=a&&(a=Math.max(a,1),r=a-1);let o=this.getValueSize();this.times=n.slice(r,a),this.values=this.values.slice(r*o,a*o)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),e=!1);let n=this.times,s=this.values,r=n.length;r===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),e=!1);let a=null;for(let o=0;o!==r;o++){let l=n[o];if(typeof l=="number"&&isNaN(l)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,o,l),e=!1;break}if(a!==null&&a>l){console.error("THREE.KeyframeTrack: Out of order keys.",this,o,l,a),e=!1;break}a=l}if(s!==void 0&&Em(s))for(let o=0,l=s.length;o!==l;++o){let c=s[o];if(isNaN(c)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,o,c),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),s=this.getInterpolation()===so,r=e.length-1,a=1;for(let o=1;o<r;++o){let l=!1,c=e[o],u=e[o+1];if(c!==u&&(o!==1||c!==e[0]))if(s)l=!0;else{let h=o*n,f=h-n,d=h+n;for(let p=0;p!==n;++p){let y=t[h+p];if(y!==t[f+p]||y!==t[d+p]){l=!0;break}}}if(l){if(o!==a){e[a]=e[o];let h=o*n,f=a*n;for(let d=0;d!==n;++d)t[f+d]=t[h+d]}++a}}if(r>0){e[a]=e[r];for(let o=r*n,l=a*n,c=0;c!==n;++c)t[l+c]=t[o+c];++a}return a!==e.length?(this.times=e.slice(0,a),this.values=t.slice(0,a*n)):(this.times=e,this.values=t),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=this.constructor,s=new n(this.name,e,t);return s.createInterpolant=this.createInterpolant,s}};tn.prototype.ValueTypeName="";tn.prototype.TimeBufferType=Float32Array;tn.prototype.ValueBufferType=Float32Array;tn.prototype.DefaultInterpolation=co;var ni=class extends tn{constructor(e,t,n){super(e,t,n)}};ni.prototype.ValueTypeName="bool";ni.prototype.ValueBufferType=Array;ni.prototype.DefaultInterpolation=Ar;ni.prototype.InterpolantFactoryMethodLinear=void 0;ni.prototype.InterpolantFactoryMethodSmooth=void 0;var oa=class extends tn{constructor(e,t,n,s){super(e,t,n,s)}};oa.prototype.ValueTypeName="color";var ts=class extends tn{constructor(e,t,n,s){super(e,t,n,s)}};ts.prototype.ValueTypeName="number";var Ao=class extends es{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e,t,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=(n-t)/(s-t),c=e*o;for(let u=c+o;c!==u;c+=4)Yt.slerpFlat(r,0,a,c-o,a,c,l);return r}},ii=class extends tn{constructor(e,t,n,s){super(e,t,n,s)}InterpolantFactoryMethodLinear(e){return new Ao(this.times,this.values,this.getValueSize(),e)}};ii.prototype.ValueTypeName="quaternion";ii.prototype.InterpolantFactoryMethodSmooth=void 0;var si=class extends tn{constructor(e,t,n){super(e,t,n)}};si.prototype.ValueTypeName="string";si.prototype.ValueBufferType=Array;si.prototype.DefaultInterpolation=Ar;si.prototype.InterpolantFactoryMethodLinear=void 0;si.prototype.InterpolantFactoryMethodSmooth=void 0;var ns=class extends tn{constructor(e,t,n,s){super(e,t,n,s)}};ns.prototype.ValueTypeName="vector";var Ln=class{constructor(e="",t=-1,n=[],s=Al){this.name=e,this.tracks=n,this.duration=t,this.blendMode=s,this.uuid=li(),this.userData={},this.duration<0&&this.resetDuration()}static parse(e){let t=[],n=e.tracks,s=1/(e.fps||1);for(let a=0,o=n.length;a!==o;++a)t.push(Am(n[a]).scale(s));let r=new this(e.name,e.duration,t,e.blendMode);return r.uuid=e.uuid,r.userData=JSON.parse(e.userData||"{}"),r}static toJSON(e){let t=[],n=e.tracks,s={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode,userData:JSON.stringify(e.userData)};for(let r=0,a=n.length;r!==a;++r)t.push(tn.toJSON(n[r]));return s}static CreateFromMorphTargetSequence(e,t,n,s){let r=t.length,a=[];for(let o=0;o<r;o++){let l=[],c=[];l.push((o+r-1)%r,o,(o+1)%r),c.push(0,1,0);let u=wm(l);l=Ou(l,1,u),c=Ou(c,1,u),!s&&l[0]===0&&(l.push(r),c.push(c[0])),a.push(new ts(".morphTargetInfluences["+t[o].name+"]",l,c).scale(1/n))}return new this(e,-1,a)}static findByName(e,t){let n=e;if(!Array.isArray(e)){let s=e;n=s.geometry&&s.geometry.animations||s.animations}for(let s=0;s<n.length;s++)if(n[s].name===t)return n[s];return null}static CreateClipsFromMorphTargetSequences(e,t,n){let s={},r=/^([\w-]*?)([\d]+)$/;for(let o=0,l=e.length;o<l;o++){let c=e[o],u=c.name.match(r);if(u&&u.length>1){let h=u[1],f=s[h];f||(s[h]=f=[]),f.push(c)}}let a=[];for(let o in s)a.push(this.CreateFromMorphTargetSequence(o,s[o],t,n));return a}static parseAnimation(e,t){if(console.warn("THREE.AnimationClip: parseAnimation() is deprecated and will be removed with r185"),!e)return console.error("THREE.AnimationClip: No animation in JSONLoader data."),null;let n=function(h,f,d,p,y){if(d.length!==0){let g=[],m=[];zd(d,g,m,p),g.length!==0&&y.push(new h(f,g,m))}},s=[],r=e.name||"default",a=e.fps||30,o=e.blendMode,l=e.length||-1,c=e.hierarchy||[];for(let h=0;h<c.length;h++){let f=c[h].keys;if(!(!f||f.length===0))if(f[0].morphTargets){let d={},p;for(p=0;p<f.length;p++)if(f[p].morphTargets)for(let y=0;y<f[p].morphTargets.length;y++)d[f[p].morphTargets[y]]=-1;for(let y in d){let g=[],m=[];for(let E=0;E!==f[p].morphTargets.length;++E){let v=f[p];g.push(v.time),m.push(v.morphTarget===y?1:0)}s.push(new ts(".morphTargetInfluence["+y+"]",g,m))}l=d.length*a}else{let d=".bones["+t[h].name+"]";n(ns,d+".position",f,"pos",s),n(ii,d+".quaternion",f,"rot",s),n(ns,d+".scale",f,"scl",s)}}return s.length===0?null:new this(r,l,s,o)}resetDuration(){let e=this.tracks,t=0;for(let n=0,s=e.length;n!==s;++n){let r=this.tracks[n];t=Math.max(t,r.times[r.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){let e=[];for(let n=0;n<this.tracks.length;n++)e.push(this.tracks[n].clone());let t=new this.constructor(this.name,this.duration,e,this.blendMode);return t.userData=JSON.parse(JSON.stringify(this.userData)),t}toJSON(){return this.constructor.toJSON(this)}};function Tm(i){switch(i.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return ts;case"vector":case"vector2":case"vector3":case"vector4":return ns;case"color":return oa;case"quaternion":return ii;case"bool":case"boolean":return ni;case"string":return si}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+i)}function Am(i){if(i.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");let e=Tm(i.type);if(i.times===void 0){let t=[],n=[];zd(i.keys,t,n,"value"),i.times=t,i.values=n}return e.parse!==void 0?e.parse(i):new e(i.name,i.times,i.values,i.interpolation)}var Ro=class{constructor(e,t,n){let s=this,r=!1,a=0,o=0,l,c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this.abortController=new AbortController,this.itemStart=function(u){o++,r===!1&&s.onStart!==void 0&&s.onStart(u,a,o),r=!0},this.itemEnd=function(u){a++,s.onProgress!==void 0&&s.onProgress(u,a,o),a===o&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(u){s.onError!==void 0&&s.onError(u)},this.resolveURL=function(u){return l?l(u):u},this.setURLModifier=function(u){return l=u,this},this.addHandler=function(u,h){return c.push(u,h),this},this.removeHandler=function(u){let h=c.indexOf(u);return h!==-1&&c.splice(h,2),this},this.getHandler=function(u){for(let h=0,f=c.length;h<f;h+=2){let d=c[h],p=c[h+1];if(d.global&&(d.lastIndex=0),d.test(u))return p}return null},this.abort=function(){return this.abortController.abort(),this.abortController=new AbortController,this}}},kd=new Ro,Co=class{constructor(e){this.manager=e!==void 0?e:kd,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){let n=this;return new Promise(function(s,r){n.load(e,s,t,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}};Co.DEFAULT_MATERIAL_NAME="__DEFAULT";var la=class extends gt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new ke(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}},ca=class extends la{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(gt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new ke(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}},wc=new qe,Bu=new D,zu=new D,Dc=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new fe(512,512),this.mapType=Dn,this.map=null,this.mapPass=null,this.matrix=new qe,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Ei,this._frameExtents=new fe(1,1),this._viewportCount=1,this._viewports=[new mt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera,n=this.matrix;Bu.setFromMatrixPosition(e.matrixWorld),t.position.copy(Bu),zu.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(zu),t.updateMatrixWorld(),wc.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(wc,t.coordinateSystem,t.reversedDepth),t.reversedDepth?n.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(wc)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}};var ha=class extends Nr{constructor(e=-1,t=1,n=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2,r=n-e,a=n+e,o=s+t,l=s-t;if(this.view!==null&&this.view.enabled){let c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,a=r+c*this.view.width,o-=u*this.view.offsetY,l=o-u*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},Uc=class extends Dc{constructor(){super(new ha(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},ua=class extends la{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(gt.DEFAULT_UP),this.updateMatrix(),this.target=new gt,this.shadow=new Uc}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}};var Io=class extends Gt{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}};var Po=class{constructor(e,t,n){this.binding=e,this.valueSize=n;let s,r,a;switch(t){case"quaternion":s=this._slerp,r=this._slerpAdditive,a=this._setAdditiveIdentityQuaternion,this.buffer=new Float64Array(n*6),this._workIndex=5;break;case"string":case"bool":s=this._select,r=this._select,a=this._setAdditiveIdentityOther,this.buffer=new Array(n*5);break;default:s=this._lerp,r=this._lerpAdditive,a=this._setAdditiveIdentityNumeric,this.buffer=new Float64Array(n*5)}this._mixBufferRegion=s,this._mixBufferRegionAdditive=r,this._setIdentity=a,this._origIndex=3,this._addIndex=4,this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,this.useCount=0,this.referenceCount=0}accumulate(e,t){let n=this.buffer,s=this.valueSize,r=e*s+s,a=this.cumulativeWeight;if(a===0){for(let o=0;o!==s;++o)n[r+o]=n[o];a=t}else{a+=t;let o=t/a;this._mixBufferRegion(n,r,0,o,s)}this.cumulativeWeight=a}accumulateAdditive(e){let t=this.buffer,n=this.valueSize,s=n*this._addIndex;this.cumulativeWeightAdditive===0&&this._setIdentity(),this._mixBufferRegionAdditive(t,s,0,e,n),this.cumulativeWeightAdditive+=e}apply(e){let t=this.valueSize,n=this.buffer,s=e*t+t,r=this.cumulativeWeight,a=this.cumulativeWeightAdditive,o=this.binding;if(this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,r<1){let l=t*this._origIndex;this._mixBufferRegion(n,s,l,1-r,t)}a>0&&this._mixBufferRegionAdditive(n,s,this._addIndex*t,1,t);for(let l=t,c=t+t;l!==c;++l)if(n[l]!==n[l+t]){o.setValue(n,s);break}}saveOriginalState(){let e=this.binding,t=this.buffer,n=this.valueSize,s=n*this._origIndex;e.getValue(t,s);for(let r=n,a=s;r!==a;++r)t[r]=t[s+r%n];this._setIdentity(),this.cumulativeWeight=0,this.cumulativeWeightAdditive=0}restoreOriginalState(){let e=this.valueSize*3;this.binding.setValue(this.buffer,e)}_setAdditiveIdentityNumeric(){let e=this._addIndex*this.valueSize,t=e+this.valueSize;for(let n=e;n<t;n++)this.buffer[n]=0}_setAdditiveIdentityQuaternion(){this._setAdditiveIdentityNumeric(),this.buffer[this._addIndex*this.valueSize+3]=1}_setAdditiveIdentityOther(){let e=this._origIndex*this.valueSize,t=this._addIndex*this.valueSize;for(let n=0;n<this.valueSize;n++)this.buffer[t+n]=this.buffer[e+n]}_select(e,t,n,s,r){if(s>=.5)for(let a=0;a!==r;++a)e[t+a]=e[n+a]}_slerp(e,t,n,s){Yt.slerpFlat(e,t,e,t,e,n,s)}_slerpAdditive(e,t,n,s,r){let a=this._workIndex*r;Yt.multiplyQuaternionsFlat(e,a,e,t,e,n),Yt.slerpFlat(e,t,e,t,e,a,s)}_lerp(e,t,n,s,r){let a=1-s;for(let o=0;o!==r;++o){let l=t+o;e[l]=e[l]*a+e[n+o]*s}}_lerpAdditive(e,t,n,s,r){for(let a=0;a!==r;++a){let o=t+a;e[o]=e[o]+e[n+a]*s}}},sh="\\[\\]\\.:\\/",Rm=new RegExp("["+sh+"]","g"),rh="[^"+sh+"]",Cm="[^"+sh.replace("\\.","")+"]",Im=/((?:WC+[\/:])*)/.source.replace("WC",rh),Pm=/(WCOD+)?/.source.replace("WCOD",Cm),Lm=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",rh),Dm=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",rh),Um=new RegExp("^"+Im+Pm+Lm+Dm+"$"),Nm=["material","materials","bones","map"],Nc=class{constructor(e,t,n){let s=n||pt.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,s)}getValue(e,t){this.bind();let n=this._targetGroup.nCachedObjects_,s=this._bindings[n];s!==void 0&&s.getValue(e,t)}setValue(e,t){let n=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=n.length;s!==r;++s)n[s].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}},pt=class i{constructor(e,t,n){this.path=t,this.parsedPath=n||i.parseTrackName(t),this.node=i.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new i.Composite(e,t,n):new i(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(Rm,"")}static parseTrackName(e){let t=Um.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},s=n.nodeName&&n.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){let r=n.nodeName.substring(s+1);Nm.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,s),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(r){for(let a=0;a<r.length;a++){let o=r[a];if(o.name===t||o.uuid===t)return o;let l=n(o.children);if(l)return l}return null},s=n(e.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)e[t++]=n[s]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node,t=this.parsedPath,n=t.objectName,s=t.propertyName,r=t.propertyIndex;if(e||(e=i.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let c=t.objectIndex;switch(n){case"materials":if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let u=0;u<e.length;u++)if(e[u].name===c){c=u;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(c!==void 0){if(e[c]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[c]}}let a=e[s];if(a===void 0){let c=t.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+c+"."+s+" but it wasn't found.",e);return}let o=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?o=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!e.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[r]!==void 0&&(r=e.morphTargetDictionary[r])}l=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=r}else a.fromArray!==void 0&&a.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(l=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=s;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};pt.Composite=Nc;pt.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};pt.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};pt.prototype.GetterByBindingType=[pt.prototype._getValue_direct,pt.prototype._getValue_array,pt.prototype._getValue_arrayElement,pt.prototype._getValue_toArray];pt.prototype.SetterByBindingTypeAndVersioning=[[pt.prototype._setValue_direct,pt.prototype._setValue_direct_setNeedsUpdate,pt.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[pt.prototype._setValue_array,pt.prototype._setValue_array_setNeedsUpdate,pt.prototype._setValue_array_setMatrixWorldNeedsUpdate],[pt.prototype._setValue_arrayElement,pt.prototype._setValue_arrayElement_setNeedsUpdate,pt.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[pt.prototype._setValue_fromArray,pt.prototype._setValue_fromArray_setNeedsUpdate,pt.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var Lo=class{constructor(e,t,n=null,s=t.blendMode){this._mixer=e,this._clip=t,this._localRoot=n,this.blendMode=s;let r=t.tracks,a=r.length,o=new Array(a),l={endingStart:Xi,endingEnd:Xi};for(let c=0;c!==a;++c){let u=r[c].createInterpolant(null);o[c]=u,u.settings=l}this._interpolantSettings=l,this._interpolants=o,this._propertyBindings=new Array(a),this._cacheIndex=null,this._byClipCacheIndex=null,this._timeScaleInterpolant=null,this._weightInterpolant=null,this.loop=_d,this._loopCount=-1,this._startTime=null,this.time=0,this.timeScale=1,this._effectiveTimeScale=1,this.weight=1,this._effectiveWeight=1,this.repetitions=1/0,this.paused=!1,this.enabled=!0,this.clampWhenFinished=!1,this.zeroSlopeAtStart=!0,this.zeroSlopeAtEnd=!0}play(){return this._mixer._activateAction(this),this}stop(){return this._mixer._deactivateAction(this),this.reset()}reset(){return this.paused=!1,this.enabled=!0,this.time=0,this._loopCount=-1,this._startTime=null,this.stopFading().stopWarping()}isRunning(){return this.enabled&&!this.paused&&this.timeScale!==0&&this._startTime===null&&this._mixer._isActiveAction(this)}isScheduled(){return this._mixer._isActiveAction(this)}startAt(e){return this._startTime=e,this}setLoop(e,t){return this.loop=e,this.repetitions=t,this}setEffectiveWeight(e){return this.weight=e,this._effectiveWeight=this.enabled?e:0,this.stopFading()}getEffectiveWeight(){return this._effectiveWeight}fadeIn(e){return this._scheduleFading(e,0,1)}fadeOut(e){return this._scheduleFading(e,1,0)}crossFadeFrom(e,t,n=!1){if(e.fadeOut(t),this.fadeIn(t),n===!0){let s=this._clip.duration,r=e._clip.duration,a=r/s,o=s/r;e.warp(1,a,t),this.warp(o,1,t)}return this}crossFadeTo(e,t,n=!1){return e.crossFadeFrom(this,t,n)}stopFading(){let e=this._weightInterpolant;return e!==null&&(this._weightInterpolant=null,this._mixer._takeBackControlInterpolant(e)),this}setEffectiveTimeScale(e){return this.timeScale=e,this._effectiveTimeScale=this.paused?0:e,this.stopWarping()}getEffectiveTimeScale(){return this._effectiveTimeScale}setDuration(e){return this.timeScale=this._clip.duration/e,this.stopWarping()}syncWith(e){return this.time=e.time,this.timeScale=e.timeScale,this.stopWarping()}halt(e){return this.warp(this._effectiveTimeScale,0,e)}warp(e,t,n){let s=this._mixer,r=s.time,a=this.timeScale,o=this._timeScaleInterpolant;o===null&&(o=s._lendControlInterpolant(),this._timeScaleInterpolant=o);let l=o.parameterPositions,c=o.sampleValues;return l[0]=r,l[1]=r+n,c[0]=e/a,c[1]=t/a,this}stopWarping(){let e=this._timeScaleInterpolant;return e!==null&&(this._timeScaleInterpolant=null,this._mixer._takeBackControlInterpolant(e)),this}getMixer(){return this._mixer}getClip(){return this._clip}getRoot(){return this._localRoot||this._mixer._root}_update(e,t,n,s){if(!this.enabled){this._updateWeight(e);return}let r=this._startTime;if(r!==null){let l=(e-r)*n;l<0||n===0?t=0:(this._startTime=null,t=n*l)}t*=this._updateTimeScale(e);let a=this._updateTime(t),o=this._updateWeight(e);if(o>0){let l=this._interpolants,c=this._propertyBindings;switch(this.blendMode){case vd:for(let u=0,h=l.length;u!==h;++u)l[u].evaluate(a),c[u].accumulateAdditive(o);break;case Al:default:for(let u=0,h=l.length;u!==h;++u)l[u].evaluate(a),c[u].accumulate(s,o)}}}_updateWeight(e){let t=0;if(this.enabled){t=this.weight;let n=this._weightInterpolant;if(n!==null){let s=n.evaluate(e)[0];t*=s,e>n.parameterPositions[1]&&(this.stopFading(),s===0&&(this.enabled=!1))}}return this._effectiveWeight=t,t}_updateTimeScale(e){let t=0;if(!this.paused){t=this.timeScale;let n=this._timeScaleInterpolant;if(n!==null){let s=n.evaluate(e)[0];t*=s,e>n.parameterPositions[1]&&(this.stopWarping(),t===0?this.paused=!0:this.timeScale=t)}}return this._effectiveTimeScale=t,t}_updateTime(e){let t=this._clip.duration,n=this.loop,s=this.time+e,r=this._loopCount,a=n===xd;if(e===0)return r===-1?s:a&&(r&1)===1?t-s:s;if(n===Tl){r===-1&&(this._loopCount=0,this._setEndings(!0,!0,!1));e:{if(s>=t)s=t;else if(s<0)s=0;else{this.time=s;break e}this.clampWhenFinished?this.paused=!0:this.enabled=!1,this.time=s,this._mixer.dispatchEvent({type:"finished",action:this,direction:e<0?-1:1})}}else{if(r===-1&&(e>=0?(r=0,this._setEndings(!0,this.repetitions===0,a)):this._setEndings(this.repetitions===0,!0,a)),s>=t||s<0){let o=Math.floor(s/t);s-=t*o,r+=Math.abs(o);let l=this.repetitions-r;if(l<=0)this.clampWhenFinished?this.paused=!0:this.enabled=!1,s=e>0?t:0,this.time=s,this._mixer.dispatchEvent({type:"finished",action:this,direction:e>0?1:-1});else{if(l===1){let c=e<0;this._setEndings(c,!c,a)}else this._setEndings(!1,!1,a);this._loopCount=r,this.time=s,this._mixer.dispatchEvent({type:"loop",action:this,loopDelta:o})}}else this.time=s;if(a&&(r&1)===1)return t-s}return s}_setEndings(e,t,n){let s=this._interpolantSettings;n?(s.endingStart=$i,s.endingEnd=$i):(e?s.endingStart=this.zeroSlopeAtStart?$i:Xi:s.endingStart=Rr,t?s.endingEnd=this.zeroSlopeAtEnd?$i:Xi:s.endingEnd=Rr)}_scheduleFading(e,t,n){let s=this._mixer,r=s.time,a=this._weightInterpolant;a===null&&(a=s._lendControlInterpolant(),this._weightInterpolant=a);let o=a.parameterPositions,l=a.sampleValues;return o[0]=r,l[0]=t,o[1]=r+e,l[1]=n,this}},Fm=new Float32Array(1),da=class extends On{constructor(e){super(),this._root=e,this._initMemoryManager(),this._accuIndex=0,this.time=0,this.timeScale=1}_bindAction(e,t){let n=e._localRoot||this._root,s=e._clip.tracks,r=s.length,a=e._propertyBindings,o=e._interpolants,l=n.uuid,c=this._bindingsByRootAndName,u=c[l];u===void 0&&(u={},c[l]=u);for(let h=0;h!==r;++h){let f=s[h],d=f.name,p=u[d];if(p!==void 0)++p.referenceCount,a[h]=p;else{if(p=a[h],p!==void 0){p._cacheIndex===null&&(++p.referenceCount,this._addInactiveBinding(p,l,d));continue}let y=t&&t._propertyBindings[h].binding.parsedPath;p=new Po(pt.create(n,d,y),f.ValueTypeName,f.getValueSize()),++p.referenceCount,this._addInactiveBinding(p,l,d),a[h]=p}o[h].resultBuffer=p.buffer}}_activateAction(e){if(!this._isActiveAction(e)){if(e._cacheIndex===null){let n=(e._localRoot||this._root).uuid,s=e._clip.uuid,r=this._actionsByClip[s];this._bindAction(e,r&&r.knownActions[0]),this._addInactiveAction(e,s,n)}let t=e._propertyBindings;for(let n=0,s=t.length;n!==s;++n){let r=t[n];r.useCount++===0&&(this._lendBinding(r),r.saveOriginalState())}this._lendAction(e)}}_deactivateAction(e){if(this._isActiveAction(e)){let t=e._propertyBindings;for(let n=0,s=t.length;n!==s;++n){let r=t[n];--r.useCount===0&&(r.restoreOriginalState(),this._takeBackBinding(r))}this._takeBackAction(e)}}_initMemoryManager(){this._actions=[],this._nActiveActions=0,this._actionsByClip={},this._bindings=[],this._nActiveBindings=0,this._bindingsByRootAndName={},this._controlInterpolants=[],this._nActiveControlInterpolants=0;let e=this;this.stats={actions:{get total(){return e._actions.length},get inUse(){return e._nActiveActions}},bindings:{get total(){return e._bindings.length},get inUse(){return e._nActiveBindings}},controlInterpolants:{get total(){return e._controlInterpolants.length},get inUse(){return e._nActiveControlInterpolants}}}}_isActiveAction(e){let t=e._cacheIndex;return t!==null&&t<this._nActiveActions}_addInactiveAction(e,t,n){let s=this._actions,r=this._actionsByClip,a=r[t];if(a===void 0)a={knownActions:[e],actionByRoot:{}},e._byClipCacheIndex=0,r[t]=a;else{let o=a.knownActions;e._byClipCacheIndex=o.length,o.push(e)}e._cacheIndex=s.length,s.push(e),a.actionByRoot[n]=e}_removeInactiveAction(e){let t=this._actions,n=t[t.length-1],s=e._cacheIndex;n._cacheIndex=s,t[s]=n,t.pop(),e._cacheIndex=null;let r=e._clip.uuid,a=this._actionsByClip,o=a[r],l=o.knownActions,c=l[l.length-1],u=e._byClipCacheIndex;c._byClipCacheIndex=u,l[u]=c,l.pop(),e._byClipCacheIndex=null;let h=o.actionByRoot,f=(e._localRoot||this._root).uuid;delete h[f],l.length===0&&delete a[r],this._removeInactiveBindingsForAction(e)}_removeInactiveBindingsForAction(e){let t=e._propertyBindings;for(let n=0,s=t.length;n!==s;++n){let r=t[n];--r.referenceCount===0&&this._removeInactiveBinding(r)}}_lendAction(e){let t=this._actions,n=e._cacheIndex,s=this._nActiveActions++,r=t[s];e._cacheIndex=s,t[s]=e,r._cacheIndex=n,t[n]=r}_takeBackAction(e){let t=this._actions,n=e._cacheIndex,s=--this._nActiveActions,r=t[s];e._cacheIndex=s,t[s]=e,r._cacheIndex=n,t[n]=r}_addInactiveBinding(e,t,n){let s=this._bindingsByRootAndName,r=this._bindings,a=s[t];a===void 0&&(a={},s[t]=a),a[n]=e,e._cacheIndex=r.length,r.push(e)}_removeInactiveBinding(e){let t=this._bindings,n=e.binding,s=n.rootNode.uuid,r=n.path,a=this._bindingsByRootAndName,o=a[s],l=t[t.length-1],c=e._cacheIndex;l._cacheIndex=c,t[c]=l,t.pop(),delete o[r],Object.keys(o).length===0&&delete a[s]}_lendBinding(e){let t=this._bindings,n=e._cacheIndex,s=this._nActiveBindings++,r=t[s];e._cacheIndex=s,t[s]=e,r._cacheIndex=n,t[n]=r}_takeBackBinding(e){let t=this._bindings,n=e._cacheIndex,s=--this._nActiveBindings,r=t[s];e._cacheIndex=s,t[s]=e,r._cacheIndex=n,t[n]=r}_lendControlInterpolant(){let e=this._controlInterpolants,t=this._nActiveControlInterpolants++,n=e[t];return n===void 0&&(n=new aa(new Float32Array(2),new Float32Array(2),1,Fm),n.__cacheIndex=t,e[t]=n),n}_takeBackControlInterpolant(e){let t=this._controlInterpolants,n=e.__cacheIndex,s=--this._nActiveControlInterpolants,r=t[s];e.__cacheIndex=s,t[s]=e,r.__cacheIndex=n,t[n]=r}clipAction(e,t,n){let s=t||this._root,r=s.uuid,a=typeof e=="string"?Ln.findByName(s,e):e,o=a!==null?a.uuid:e,l=this._actionsByClip[o],c=null;if(n===void 0&&(a!==null?n=a.blendMode:n=Al),l!==void 0){let h=l.actionByRoot[r];if(h!==void 0&&h.blendMode===n)return h;c=l.knownActions[0],a===null&&(a=c._clip)}if(a===null)return null;let u=new Lo(this,a,t,n);return this._bindAction(u,c),this._addInactiveAction(u,o,r),u}existingAction(e,t){let n=t||this._root,s=n.uuid,r=typeof e=="string"?Ln.findByName(n,e):e,a=r?r.uuid:e,o=this._actionsByClip[a];return o!==void 0&&o.actionByRoot[s]||null}stopAllAction(){let e=this._actions,t=this._nActiveActions;for(let n=t-1;n>=0;--n)e[n].stop();return this}update(e){e*=this.timeScale;let t=this._actions,n=this._nActiveActions,s=this.time+=e,r=Math.sign(e),a=this._accuIndex^=1;for(let c=0;c!==n;++c)t[c]._update(s,e,r,a);let o=this._bindings,l=this._nActiveBindings;for(let c=0;c!==l;++c)o[c].apply(a);return this}setTime(e){this.time=0;for(let t=0;t<this._actions.length;t++)this._actions[t].time=0;return this.update(e)}getRoot(){return this._root}uncacheClip(e){let t=this._actions,n=e.uuid,s=this._actionsByClip,r=s[n];if(r!==void 0){let a=r.knownActions;for(let o=0,l=a.length;o!==l;++o){let c=a[o];this._deactivateAction(c);let u=c._cacheIndex,h=t[t.length-1];c._cacheIndex=null,c._byClipCacheIndex=null,h._cacheIndex=u,t[u]=h,t.pop(),this._removeInactiveBindingsForAction(c)}delete s[n]}}uncacheRoot(e){let t=e.uuid,n=this._actionsByClip;for(let a in n){let o=n[a].actionByRoot,l=o[t];l!==void 0&&(this._deactivateAction(l),this._removeInactiveAction(l))}let s=this._bindingsByRootAndName,r=s[t];if(r!==void 0)for(let a in r){let o=r[a];o.restoreOriginalState(),this._removeInactiveBinding(o)}}uncacheAction(e,t){let n=this.existingAction(e,t);n!==null&&(this._deactivateAction(n),this._removeInactiveAction(n))}};var ku=new qe,is=class{constructor(e,t,n=0,s=1/0){this.ray=new bi(e,t),this.near=n,this.far=s,this.camera=null,this.layers=new ks,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):console.error("THREE.Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return ku.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(ku),this}intersectObject(e,t=!0,n=[]){return Fc(e,this,n,t),n.sort(Hu),n}intersectObjects(e,t=!0,n=[]){for(let s=0,r=e.length;s<r;s++)Fc(e[s],this,n,t);return n.sort(Hu),n}};function Hu(i,e){return i.distance-e.distance}function Fc(i,e,t,n){let s=!0;if(i.layers.test(e.layers)&&i.raycast(e,t)===!1&&(s=!1),s===!0&&n===!0){let r=i.children;for(let a=0,o=r.length;a<o;a++)Fc(r[a],e,t,!0)}}function ah(i,e,t,n){let s=Om(n);switch(t){case Yc:return i*e;case Yo:return i*e/s.components*s.byteLength;case Zo:return i*e/s.components*s.byteLength;case Jc:return i*e*2/s.components*s.byteLength;case Jo:return i*e*2/s.components*s.byteLength;case Zc:return i*e*3/s.components*s.byteLength;case mn:return i*e*4/s.components*s.byteLength;case Ko:return i*e*4/s.components*s.byteLength;case ma:case ga:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case ya:case _a:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Qo:case tl:return Math.max(i,16)*Math.max(e,8)/4;case jo:case el:return Math.max(i,8)*Math.max(e,8)/2;case nl:case il:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case sl:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case rl:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case al:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case ol:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case ll:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case cl:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case hl:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case ul:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case dl:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case fl:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case pl:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case ml:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case gl:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case yl:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case _l:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case xl:case vl:case Ml:return Math.ceil(i/4)*Math.ceil(e/4)*16;case Sl:case bl:return Math.ceil(i/4)*Math.ceil(e/4)*8;case El:case wl:return Math.ceil(i/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function Om(i){switch(i){case Dn:case Wc:return{byteLength:1,components:1};case Zs:case Xc:case Js:return{byteLength:2,components:1};case $o:case qo:return{byteLength:2,components:4};case Ai:case Xo:case vn:return{byteLength:4,components:1};case $c:case qc:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"180"}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="180");function uf(){let i=null,e=!1,t=null,n=null;function s(r,a){t(r,a),n=i.requestAnimationFrame(s)}return{start:function(){e!==!0&&t!==null&&(n=i.requestAnimationFrame(s),e=!0)},stop:function(){i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){i=r}}}function zm(i){let e=new WeakMap;function t(o,l){let c=o.array,u=o.usage,h=c.byteLength,f=i.createBuffer();i.bindBuffer(l,f),i.bufferData(l,c,u),o.onUploadCallback();let d;if(c instanceof Float32Array)d=i.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)d=i.HALF_FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?d=i.HALF_FLOAT:d=i.UNSIGNED_SHORT;else if(c instanceof Int16Array)d=i.SHORT;else if(c instanceof Uint32Array)d=i.UNSIGNED_INT;else if(c instanceof Int32Array)d=i.INT;else if(c instanceof Int8Array)d=i.BYTE;else if(c instanceof Uint8Array)d=i.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)d=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:f,type:d,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:h}}function n(o,l,c){let u=l.array,h=l.updateRanges;if(i.bindBuffer(c,o),h.length===0)i.bufferSubData(c,0,u);else{h.sort((d,p)=>d.start-p.start);let f=0;for(let d=1;d<h.length;d++){let p=h[f],y=h[d];y.start<=p.start+p.count+1?p.count=Math.max(p.count,y.start+y.count-p.start):(++f,h[f]=y)}h.length=f+1;for(let d=0,p=h.length;d<p;d++){let y=h[d];i.bufferSubData(c,y.start*u.BYTES_PER_ELEMENT,u,y.start,y.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);let l=e.get(o);l&&(i.deleteBuffer(l.buffer),e.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){let u=e.get(o);(!u||u.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}let c=e.get(o);if(c===void 0)e.set(o,t(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,o,l),c.version=o.version}}return{get:s,remove:r,update:a}}var km=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Hm=`#ifdef USE_ALPHAHASH
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
#endif`,Vm=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Gm=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Wm=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Xm=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,$m=`#ifdef USE_AOMAP
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
#endif`,qm=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Ym=`#ifdef USE_BATCHING
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
#endif`,Zm=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Jm=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Km=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,jm=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Qm=`#ifdef USE_IRIDESCENCE
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
#endif`,eg=`#ifdef USE_BUMPMAP
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
#endif`,tg=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,ng=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,ig=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,sg=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,rg=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,ag=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,og=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,lg=`#if defined( USE_COLOR_ALPHA )
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
#endif`,cg=`#define PI 3.141592653589793
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
} // validated`,hg=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,ug=`vec3 transformedNormal = objectNormal;
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
#endif`,dg=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,fg=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,pg=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,mg=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,gg="gl_FragColor = linearToOutputTexel( gl_FragColor );",yg=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,_g=`#ifdef USE_ENVMAP
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
#endif`,xg=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,vg=`#ifdef USE_ENVMAP
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
#endif`,Mg=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Sg=`#ifdef USE_ENVMAP
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
#endif`,bg=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Eg=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,wg=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Tg=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Ag=`#ifdef USE_GRADIENTMAP
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
}`,Rg=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Cg=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Ig=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Pg=`uniform bool receiveShadow;
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
#endif`,Lg=`#ifdef USE_ENVMAP
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
#endif`,Dg=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Ug=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Ng=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Fg=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Og=`PhysicalMaterial material;
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
#endif`,Bg=`struct PhysicalMaterial {
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
}`,zg=`
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
#endif`,kg=`#if defined( RE_IndirectDiffuse )
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
#endif`,Hg=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Vg=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Gg=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Wg=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Xg=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,$g=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,qg=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Yg=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Zg=`#if defined( USE_POINTS_UV )
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
#endif`,Jg=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Kg=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,jg=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Qg=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,e0=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,t0=`#ifdef USE_MORPHTARGETS
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
#endif`,n0=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,i0=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,s0=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,r0=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,a0=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,o0=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,l0=`#ifdef USE_NORMALMAP
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
#endif`,c0=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,h0=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,u0=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,d0=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,f0=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,p0=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,m0=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,g0=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,y0=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,_0=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,x0=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,v0=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,M0=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,S0=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,b0=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,E0=`float getShadowMask() {
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
}`,w0=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,T0=`#ifdef USE_SKINNING
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
#endif`,A0=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,R0=`#ifdef USE_SKINNING
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
#endif`,C0=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,I0=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,P0=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,L0=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,D0=`#ifdef USE_TRANSMISSION
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
#endif`,U0=`#ifdef USE_TRANSMISSION
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
#endif`,N0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,F0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,O0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,B0=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,z0=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,k0=`uniform sampler2D t2D;
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
}`,H0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,V0=`#ifdef ENVMAP_TYPE_CUBE
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
}`,G0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,W0=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,X0=`#include <common>
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
}`,$0=`#if DEPTH_PACKING == 3200
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
}`,q0=`#define DISTANCE
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
}`,Y0=`#define DISTANCE
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
}`,Z0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,J0=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,K0=`uniform float scale;
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
}`,j0=`uniform vec3 diffuse;
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
}`,Q0=`#include <common>
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
}`,ey=`uniform vec3 diffuse;
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
}`,ty=`#define LAMBERT
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
}`,ny=`#define LAMBERT
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
}`,iy=`#define MATCAP
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
}`,sy=`#define MATCAP
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
}`,ry=`#define NORMAL
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
}`,ay=`#define NORMAL
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
}`,oy=`#define PHONG
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
}`,ly=`#define PHONG
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
}`,cy=`#define STANDARD
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
}`,hy=`#define STANDARD
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
}`,uy=`#define TOON
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
}`,dy=`#define TOON
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
}`,fy=`uniform float size;
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
}`,py=`uniform vec3 diffuse;
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
}`,my=`#include <common>
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
}`,gy=`uniform vec3 color;
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
}`,yy=`uniform float rotation;
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
}`,_y=`uniform vec3 diffuse;
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
}`,Ye={alphahash_fragment:km,alphahash_pars_fragment:Hm,alphamap_fragment:Vm,alphamap_pars_fragment:Gm,alphatest_fragment:Wm,alphatest_pars_fragment:Xm,aomap_fragment:$m,aomap_pars_fragment:qm,batching_pars_vertex:Ym,batching_vertex:Zm,begin_vertex:Jm,beginnormal_vertex:Km,bsdfs:jm,iridescence_fragment:Qm,bumpmap_pars_fragment:eg,clipping_planes_fragment:tg,clipping_planes_pars_fragment:ng,clipping_planes_pars_vertex:ig,clipping_planes_vertex:sg,color_fragment:rg,color_pars_fragment:ag,color_pars_vertex:og,color_vertex:lg,common:cg,cube_uv_reflection_fragment:hg,defaultnormal_vertex:ug,displacementmap_pars_vertex:dg,displacementmap_vertex:fg,emissivemap_fragment:pg,emissivemap_pars_fragment:mg,colorspace_fragment:gg,colorspace_pars_fragment:yg,envmap_fragment:_g,envmap_common_pars_fragment:xg,envmap_pars_fragment:vg,envmap_pars_vertex:Mg,envmap_physical_pars_fragment:Lg,envmap_vertex:Sg,fog_vertex:bg,fog_pars_vertex:Eg,fog_fragment:wg,fog_pars_fragment:Tg,gradientmap_pars_fragment:Ag,lightmap_pars_fragment:Rg,lights_lambert_fragment:Cg,lights_lambert_pars_fragment:Ig,lights_pars_begin:Pg,lights_toon_fragment:Dg,lights_toon_pars_fragment:Ug,lights_phong_fragment:Ng,lights_phong_pars_fragment:Fg,lights_physical_fragment:Og,lights_physical_pars_fragment:Bg,lights_fragment_begin:zg,lights_fragment_maps:kg,lights_fragment_end:Hg,logdepthbuf_fragment:Vg,logdepthbuf_pars_fragment:Gg,logdepthbuf_pars_vertex:Wg,logdepthbuf_vertex:Xg,map_fragment:$g,map_pars_fragment:qg,map_particle_fragment:Yg,map_particle_pars_fragment:Zg,metalnessmap_fragment:Jg,metalnessmap_pars_fragment:Kg,morphinstance_vertex:jg,morphcolor_vertex:Qg,morphnormal_vertex:e0,morphtarget_pars_vertex:t0,morphtarget_vertex:n0,normal_fragment_begin:i0,normal_fragment_maps:s0,normal_pars_fragment:r0,normal_pars_vertex:a0,normal_vertex:o0,normalmap_pars_fragment:l0,clearcoat_normal_fragment_begin:c0,clearcoat_normal_fragment_maps:h0,clearcoat_pars_fragment:u0,iridescence_pars_fragment:d0,opaque_fragment:f0,packing:p0,premultiplied_alpha_fragment:m0,project_vertex:g0,dithering_fragment:y0,dithering_pars_fragment:_0,roughnessmap_fragment:x0,roughnessmap_pars_fragment:v0,shadowmap_pars_fragment:M0,shadowmap_pars_vertex:S0,shadowmap_vertex:b0,shadowmask_pars_fragment:E0,skinbase_vertex:w0,skinning_pars_vertex:T0,skinning_vertex:A0,skinnormal_vertex:R0,specularmap_fragment:C0,specularmap_pars_fragment:I0,tonemapping_fragment:P0,tonemapping_pars_fragment:L0,transmission_fragment:D0,transmission_pars_fragment:U0,uv_pars_fragment:N0,uv_pars_vertex:F0,uv_vertex:O0,worldpos_vertex:B0,background_vert:z0,background_frag:k0,backgroundCube_vert:H0,backgroundCube_frag:V0,cube_vert:G0,cube_frag:W0,depth_vert:X0,depth_frag:$0,distanceRGBA_vert:q0,distanceRGBA_frag:Y0,equirect_vert:Z0,equirect_frag:J0,linedashed_vert:K0,linedashed_frag:j0,meshbasic_vert:Q0,meshbasic_frag:ey,meshlambert_vert:ty,meshlambert_frag:ny,meshmatcap_vert:iy,meshmatcap_frag:sy,meshnormal_vert:ry,meshnormal_frag:ay,meshphong_vert:oy,meshphong_frag:ly,meshphysical_vert:cy,meshphysical_frag:hy,meshtoon_vert:uy,meshtoon_frag:dy,points_vert:fy,points_frag:py,shadow_vert:my,shadow_frag:gy,sprite_vert:yy,sprite_frag:_y},pe={common:{diffuse:{value:new ke(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ge},alphaMap:{value:null},alphaMapTransform:{value:new Ge},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ge}},envmap:{envMap:{value:null},envMapRotation:{value:new Ge},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ge}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ge}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ge},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ge},normalScale:{value:new fe(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ge},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ge}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ge}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ge}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new ke(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new ke(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ge},alphaTest:{value:0},uvTransform:{value:new Ge}},sprite:{diffuse:{value:new ke(16777215)},opacity:{value:1},center:{value:new fe(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ge},alphaMap:{value:null},alphaMapTransform:{value:new Ge},alphaTest:{value:0}}},Vn={basic:{uniforms:Wt([pe.common,pe.specularmap,pe.envmap,pe.aomap,pe.lightmap,pe.fog]),vertexShader:Ye.meshbasic_vert,fragmentShader:Ye.meshbasic_frag},lambert:{uniforms:Wt([pe.common,pe.specularmap,pe.envmap,pe.aomap,pe.lightmap,pe.emissivemap,pe.bumpmap,pe.normalmap,pe.displacementmap,pe.fog,pe.lights,{emissive:{value:new ke(0)}}]),vertexShader:Ye.meshlambert_vert,fragmentShader:Ye.meshlambert_frag},phong:{uniforms:Wt([pe.common,pe.specularmap,pe.envmap,pe.aomap,pe.lightmap,pe.emissivemap,pe.bumpmap,pe.normalmap,pe.displacementmap,pe.fog,pe.lights,{emissive:{value:new ke(0)},specular:{value:new ke(1118481)},shininess:{value:30}}]),vertexShader:Ye.meshphong_vert,fragmentShader:Ye.meshphong_frag},standard:{uniforms:Wt([pe.common,pe.envmap,pe.aomap,pe.lightmap,pe.emissivemap,pe.bumpmap,pe.normalmap,pe.displacementmap,pe.roughnessmap,pe.metalnessmap,pe.fog,pe.lights,{emissive:{value:new ke(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ye.meshphysical_vert,fragmentShader:Ye.meshphysical_frag},toon:{uniforms:Wt([pe.common,pe.aomap,pe.lightmap,pe.emissivemap,pe.bumpmap,pe.normalmap,pe.displacementmap,pe.gradientmap,pe.fog,pe.lights,{emissive:{value:new ke(0)}}]),vertexShader:Ye.meshtoon_vert,fragmentShader:Ye.meshtoon_frag},matcap:{uniforms:Wt([pe.common,pe.bumpmap,pe.normalmap,pe.displacementmap,pe.fog,{matcap:{value:null}}]),vertexShader:Ye.meshmatcap_vert,fragmentShader:Ye.meshmatcap_frag},points:{uniforms:Wt([pe.points,pe.fog]),vertexShader:Ye.points_vert,fragmentShader:Ye.points_frag},dashed:{uniforms:Wt([pe.common,pe.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ye.linedashed_vert,fragmentShader:Ye.linedashed_frag},depth:{uniforms:Wt([pe.common,pe.displacementmap]),vertexShader:Ye.depth_vert,fragmentShader:Ye.depth_frag},normal:{uniforms:Wt([pe.common,pe.bumpmap,pe.normalmap,pe.displacementmap,{opacity:{value:1}}]),vertexShader:Ye.meshnormal_vert,fragmentShader:Ye.meshnormal_frag},sprite:{uniforms:Wt([pe.sprite,pe.fog]),vertexShader:Ye.sprite_vert,fragmentShader:Ye.sprite_frag},background:{uniforms:{uvTransform:{value:new Ge},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ye.background_vert,fragmentShader:Ye.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ge}},vertexShader:Ye.backgroundCube_vert,fragmentShader:Ye.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ye.cube_vert,fragmentShader:Ye.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ye.equirect_vert,fragmentShader:Ye.equirect_frag},distanceRGBA:{uniforms:Wt([pe.common,pe.displacementmap,{referencePosition:{value:new D},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ye.distanceRGBA_vert,fragmentShader:Ye.distanceRGBA_frag},shadow:{uniforms:Wt([pe.lights,pe.fog,{color:{value:new ke(0)},opacity:{value:1}}]),vertexShader:Ye.shadow_vert,fragmentShader:Ye.shadow_frag}};Vn.physical={uniforms:Wt([Vn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ge},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ge},clearcoatNormalScale:{value:new fe(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ge},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ge},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ge},sheen:{value:0},sheenColor:{value:new ke(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ge},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ge},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ge},transmissionSamplerSize:{value:new fe},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ge},attenuationDistance:{value:0},attenuationColor:{value:new ke(0)},specularColor:{value:new ke(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ge},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ge},anisotropyVector:{value:new fe},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ge}}]),vertexShader:Ye.meshphysical_vert,fragmentShader:Ye.meshphysical_frag};var Rl={r:0,b:0,g:0},ls=new hn,xy=new qe;function vy(i,e,t,n,s,r,a){let o=new ke(0),l=r===!0?0:1,c,u,h=null,f=0,d=null;function p(v){let _=v.isScene===!0?v.background:null;return _&&_.isTexture&&(_=(v.backgroundBlurriness>0?t:e).get(_)),_}function y(v){let _=!1,T=p(v);T===null?m(o,l):T&&T.isColor&&(m(T,1),_=!0);let w=i.xr.getEnvironmentBlendMode();w==="additive"?n.buffers.color.setClear(0,0,0,1,a):w==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,a),(i.autoClear||_)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function g(v,_){let T=p(_);T&&(T.isCubeTexture||T.mapping===fa)?(u===void 0&&(u=new ht(new It(1,1,1),new dn({name:"BackgroundCubeMaterial",uniforms:os(Vn.backgroundCube.uniforms),vertexShader:Vn.backgroundCube.vertexShader,fragmentShader:Vn.backgroundCube.fragmentShader,side:zt,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(w,R,I){this.matrixWorld.copyPosition(I.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(u)),ls.copy(_.backgroundRotation),ls.x*=-1,ls.y*=-1,ls.z*=-1,T.isCubeTexture&&T.isRenderTargetTexture===!1&&(ls.y*=-1,ls.z*=-1),u.material.uniforms.envMap.value=T,u.material.uniforms.flipEnvMap.value=T.isCubeTexture&&T.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=_.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=_.backgroundIntensity,u.material.uniforms.backgroundRotation.value.setFromMatrix4(xy.makeRotationFromEuler(ls)),u.material.toneMapped=it.getTransfer(T.colorSpace)!==at,(h!==T||f!==T.version||d!==i.toneMapping)&&(u.material.needsUpdate=!0,h=T,f=T.version,d=i.toneMapping),u.layers.enableAll(),v.unshift(u,u.geometry,u.material,0,0,null)):T&&T.isTexture&&(c===void 0&&(c=new ht(new ra(2,2),new dn({name:"BackgroundMaterial",uniforms:os(Vn.background.uniforms),vertexShader:Vn.background.vertexShader,fragmentShader:Vn.background.fragmentShader,side:jn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(c)),c.material.uniforms.t2D.value=T,c.material.uniforms.backgroundIntensity.value=_.backgroundIntensity,c.material.toneMapped=it.getTransfer(T.colorSpace)!==at,T.matrixAutoUpdate===!0&&T.updateMatrix(),c.material.uniforms.uvTransform.value.copy(T.matrix),(h!==T||f!==T.version||d!==i.toneMapping)&&(c.material.needsUpdate=!0,h=T,f=T.version,d=i.toneMapping),c.layers.enableAll(),v.unshift(c,c.geometry,c.material,0,0,null))}function m(v,_){v.getRGB(Rl,nh(i)),n.buffers.color.setClear(Rl.r,Rl.g,Rl.b,_,a)}function E(){u!==void 0&&(u.geometry.dispose(),u.material.dispose(),u=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return o},setClearColor:function(v,_=1){o.set(v),l=_,m(o,l)},getClearAlpha:function(){return l},setClearAlpha:function(v){l=v,m(o,l)},render:y,addToRenderList:g,dispose:E}}function My(i,e){let t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=f(null),r=s,a=!1;function o(M,P,F,V,$){let L=!1,H=h(V,F,P);r!==H&&(r=H,c(r.object)),L=d(M,V,F,$),L&&p(M,V,F,$),$!==null&&e.update($,i.ELEMENT_ARRAY_BUFFER),(L||a)&&(a=!1,_(M,P,F,V),$!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get($).buffer))}function l(){return i.createVertexArray()}function c(M){return i.bindVertexArray(M)}function u(M){return i.deleteVertexArray(M)}function h(M,P,F){let V=F.wireframe===!0,$=n[M.id];$===void 0&&($={},n[M.id]=$);let L=$[P.id];L===void 0&&(L={},$[P.id]=L);let H=L[V];return H===void 0&&(H=f(l()),L[V]=H),H}function f(M){let P=[],F=[],V=[];for(let $=0;$<t;$++)P[$]=0,F[$]=0,V[$]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:P,enabledAttributes:F,attributeDivisors:V,object:M,attributes:{},index:null}}function d(M,P,F,V){let $=r.attributes,L=P.attributes,H=0,N=F.getAttributes();for(let k in N)if(N[k].location>=0){let le=$[k],ye=L[k];if(ye===void 0&&(k==="instanceMatrix"&&M.instanceMatrix&&(ye=M.instanceMatrix),k==="instanceColor"&&M.instanceColor&&(ye=M.instanceColor)),le===void 0||le.attribute!==ye||ye&&le.data!==ye.data)return!0;H++}return r.attributesNum!==H||r.index!==V}function p(M,P,F,V){let $={},L=P.attributes,H=0,N=F.getAttributes();for(let k in N)if(N[k].location>=0){let le=L[k];le===void 0&&(k==="instanceMatrix"&&M.instanceMatrix&&(le=M.instanceMatrix),k==="instanceColor"&&M.instanceColor&&(le=M.instanceColor));let ye={};ye.attribute=le,le&&le.data&&(ye.data=le.data),$[k]=ye,H++}r.attributes=$,r.attributesNum=H,r.index=V}function y(){let M=r.newAttributes;for(let P=0,F=M.length;P<F;P++)M[P]=0}function g(M){m(M,0)}function m(M,P){let F=r.newAttributes,V=r.enabledAttributes,$=r.attributeDivisors;F[M]=1,V[M]===0&&(i.enableVertexAttribArray(M),V[M]=1),$[M]!==P&&(i.vertexAttribDivisor(M,P),$[M]=P)}function E(){let M=r.newAttributes,P=r.enabledAttributes;for(let F=0,V=P.length;F<V;F++)P[F]!==M[F]&&(i.disableVertexAttribArray(F),P[F]=0)}function v(M,P,F,V,$,L,H){H===!0?i.vertexAttribIPointer(M,P,F,$,L):i.vertexAttribPointer(M,P,F,V,$,L)}function _(M,P,F,V){y();let $=V.attributes,L=F.getAttributes(),H=P.defaultAttributeValues;for(let N in L){let k=L[N];if(k.location>=0){let Q=$[N];if(Q===void 0&&(N==="instanceMatrix"&&M.instanceMatrix&&(Q=M.instanceMatrix),N==="instanceColor"&&M.instanceColor&&(Q=M.instanceColor)),Q!==void 0){let le=Q.normalized,ye=Q.itemSize,Ne=e.get(Q);if(Ne===void 0)continue;let Xe=Ne.buffer,et=Ne.type,Ke=Ne.bytesPerElement,Y=et===i.INT||et===i.UNSIGNED_INT||Q.gpuType===Xo;if(Q.isInterleavedBufferAttribute){let ne=Q.data,Se=ne.stride,Le=Q.offset;if(ne.isInstancedInterleavedBuffer){for(let Te=0;Te<k.locationSize;Te++)m(k.location+Te,ne.meshPerAttribute);M.isInstancedMesh!==!0&&V._maxInstanceCount===void 0&&(V._maxInstanceCount=ne.meshPerAttribute*ne.count)}else for(let Te=0;Te<k.locationSize;Te++)g(k.location+Te);i.bindBuffer(i.ARRAY_BUFFER,Xe);for(let Te=0;Te<k.locationSize;Te++)v(k.location+Te,ye/k.locationSize,et,le,Se*Ke,(Le+ye/k.locationSize*Te)*Ke,Y)}else{if(Q.isInstancedBufferAttribute){for(let ne=0;ne<k.locationSize;ne++)m(k.location+ne,Q.meshPerAttribute);M.isInstancedMesh!==!0&&V._maxInstanceCount===void 0&&(V._maxInstanceCount=Q.meshPerAttribute*Q.count)}else for(let ne=0;ne<k.locationSize;ne++)g(k.location+ne);i.bindBuffer(i.ARRAY_BUFFER,Xe);for(let ne=0;ne<k.locationSize;ne++)v(k.location+ne,ye/k.locationSize,et,le,ye*Ke,ye/k.locationSize*ne*Ke,Y)}}else if(H!==void 0){let le=H[N];if(le!==void 0)switch(le.length){case 2:i.vertexAttrib2fv(k.location,le);break;case 3:i.vertexAttrib3fv(k.location,le);break;case 4:i.vertexAttrib4fv(k.location,le);break;default:i.vertexAttrib1fv(k.location,le)}}}}E()}function T(){I();for(let M in n){let P=n[M];for(let F in P){let V=P[F];for(let $ in V)u(V[$].object),delete V[$];delete P[F]}delete n[M]}}function w(M){if(n[M.id]===void 0)return;let P=n[M.id];for(let F in P){let V=P[F];for(let $ in V)u(V[$].object),delete V[$];delete P[F]}delete n[M.id]}function R(M){for(let P in n){let F=n[P];if(F[M.id]===void 0)continue;let V=F[M.id];for(let $ in V)u(V[$].object),delete V[$];delete F[M.id]}}function I(){S(),a=!0,r!==s&&(r=s,c(r.object))}function S(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:I,resetDefaultState:S,dispose:T,releaseStatesOfGeometry:w,releaseStatesOfProgram:R,initAttributes:y,enableAttribute:g,disableUnusedAttributes:E}}function Sy(i,e,t){let n;function s(c){n=c}function r(c,u){i.drawArrays(n,c,u),t.update(u,n,1)}function a(c,u,h){h!==0&&(i.drawArraysInstanced(n,c,u,h),t.update(u,n,h))}function o(c,u,h){if(h===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,u,0,h);let d=0;for(let p=0;p<h;p++)d+=u[p];t.update(d,n,1)}function l(c,u,h,f){if(h===0)return;let d=e.get("WEBGL_multi_draw");if(d===null)for(let p=0;p<c.length;p++)a(c[p],u[p],f[p]);else{d.multiDrawArraysInstancedWEBGL(n,c,0,u,0,f,0,h);let p=0;for(let y=0;y<h;y++)p+=u[y]*f[y];t.update(p,n,1)}}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=o,this.renderMultiDrawInstances=l}function by(i,e,t,n){let s;function r(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){let R=e.get("EXT_texture_filter_anisotropic");s=i.getParameter(R.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(R){return!(R!==mn&&n.convert(R)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(R){let I=R===Js&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(R!==Dn&&n.convert(R)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&R!==vn&&!I)}function l(R){if(R==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";R="mediump"}return R==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp",u=l(c);u!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",u,"instead."),c=u);let h=t.logarithmicDepthBuffer===!0,f=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control"),d=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),p=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),y=i.getParameter(i.MAX_TEXTURE_SIZE),g=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),m=i.getParameter(i.MAX_VERTEX_ATTRIBS),E=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),v=i.getParameter(i.MAX_VARYING_VECTORS),_=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),T=p>0,w=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:h,reversedDepthBuffer:f,maxTextures:d,maxVertexTextures:p,maxTextureSize:y,maxCubemapSize:g,maxAttributes:m,maxVertexUniforms:E,maxVaryings:v,maxFragmentUniforms:_,vertexTextures:T,maxSamples:w}}function Ey(i){let e=this,t=null,n=0,s=!1,r=!1,a=new Fn,o=new Ge,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(h,f){let d=h.length!==0||f||n!==0||s;return s=f,n=h.length,d},this.beginShadows=function(){r=!0,u(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(h,f){t=u(h,f,0)},this.setState=function(h,f,d){let p=h.clippingPlanes,y=h.clipIntersection,g=h.clipShadows,m=i.get(h);if(!s||p===null||p.length===0||r&&!g)r?u(null):c();else{let E=r?0:n,v=E*4,_=m.clippingState||null;l.value=_,_=u(p,f,v,d);for(let T=0;T!==v;++T)_[T]=t[T];m.clippingState=_,this.numIntersection=y?this.numPlanes:0,this.numPlanes+=E}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function u(h,f,d,p){let y=h!==null?h.length:0,g=null;if(y!==0){if(g=l.value,p!==!0||g===null){let m=d+y*4,E=f.matrixWorldInverse;o.getNormalMatrix(E),(g===null||g.length<m)&&(g=new Float32Array(m));for(let v=0,_=d;v!==y;++v,_+=4)a.copy(h[v]).applyMatrix4(E,o),a.normal.toArray(g,_),g[_+3]=a.constant}l.value=g,l.needsUpdate=!0}return e.numPlanes=y,e.numIntersection=0,g}}function wy(i){let e=new WeakMap;function t(a,o){return o===Vo?a.mapping=ss:o===Go&&(a.mapping=rs),a}function n(a){if(a&&a.isTexture){let o=a.mapping;if(o===Vo||o===Go)if(e.has(a)){let l=e.get(a).texture;return t(l,a.mapping)}else{let l=a.image;if(l&&l.height>0){let c=new mo(l.height);return c.fromEquirectangularTexture(i,a),e.set(a,c),a.addEventListener("dispose",s),t(c.texture,a.mapping)}else return null}}return a}function s(a){let o=a.target;o.removeEventListener("dispose",s);let l=e.get(o);l!==void 0&&(e.delete(o),l.dispose())}function r(){e=new WeakMap}return{get:n,dispose:r}}var er=4,Hd=[.125,.215,.35,.446,.526,.582],us=20,oh=new ha,Vd=new ke,lh=null,ch=0,hh=0,uh=!1,hs=(1+Math.sqrt(5))/2,Qs=1/hs,Gd=[new D(-hs,Qs,0),new D(hs,Qs,0),new D(-Qs,0,hs),new D(Qs,0,hs),new D(0,hs,-Qs),new D(0,hs,Qs),new D(-1,1,-1),new D(1,1,-1),new D(-1,1,1),new D(1,1,1)],Ty=new D,Pl=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,s=100,r={}){let{size:a=256,position:o=Ty}=r;lh=this._renderer.getRenderTarget(),ch=this._renderer.getActiveCubeFace(),hh=this._renderer.getActiveMipmapLevel(),uh=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);let l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,n,s,l,o),t>0&&this._blur(l,0,0,t),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=$d(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Xd(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(lh,ch,hh),this._renderer.xr.enabled=uh,e.scissorTest=!1,Cl(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===ss||e.mapping===rs?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),lh=this._renderer.getRenderTarget(),ch=this._renderer.getActiveCubeFace(),hh=this._renderer.getActiveMipmapLevel(),uh=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:An,minFilter:An,generateMipmaps:!1,type:Js,format:mn,colorSpace:Ji,depthBuffer:!1},s=Wd(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Wd(e,t,n);let{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Ay(r)),this._blurMaterial=Ry(r,e,t)}return s}_compileMaterial(e){let t=new ht(this._lodPlanes[0],e);this._renderer.compile(t,oh)}_sceneToCubeUV(e,t,n,s,r){let l=new Gt(90,1,t,n),c=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],h=this._renderer,f=h.autoClear,d=h.toneMapping;h.getClearColor(Vd),h.toneMapping=ai,h.autoClear=!1,h.state.buffers.depth.getReversed()&&(h.setRenderTarget(s),h.clearDepth(),h.setRenderTarget(null));let y=new un({name:"PMREM.Background",side:zt,depthWrite:!1,depthTest:!1}),g=new ht(new It,y),m=!1,E=e.background;E?E.isColor&&(y.color.copy(E),e.background=null,m=!0):(y.color.copy(Vd),m=!0);for(let v=0;v<6;v++){let _=v%3;_===0?(l.up.set(0,c[v],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x+u[v],r.y,r.z)):_===1?(l.up.set(0,0,c[v]),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y+u[v],r.z)):(l.up.set(0,c[v],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y,r.z+u[v]));let T=this._cubeSize;Cl(s,_*T,v>2?T:0,T,T),h.setRenderTarget(s),m&&h.render(g,l),h.render(e,l)}g.geometry.dispose(),g.material.dispose(),h.toneMapping=d,h.autoClear=f,e.background=E}_textureToCubeUV(e,t){let n=this._renderer,s=e.mapping===ss||e.mapping===rs;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=$d()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Xd());let r=s?this._cubemapMaterial:this._equirectMaterial,a=new ht(this._lodPlanes[0],r),o=r.uniforms;o.envMap.value=e;let l=this._cubeSize;Cl(t,0,0,3*l,2*l),n.setRenderTarget(t),n.render(a,oh)}_applyPMREM(e){let t=this._renderer,n=t.autoClear;t.autoClear=!1;let s=this._lodPlanes.length;for(let r=1;r<s;r++){let a=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),o=Gd[(s-r-1)%Gd.length];this._blur(e,r-1,r,a,o)}t.autoClear=n}_blur(e,t,n,s,r){let a=this._pingPongRenderTarget;this._halfBlur(e,a,t,n,s,"latitudinal",r),this._halfBlur(a,e,n,n,s,"longitudinal",r)}_halfBlur(e,t,n,s,r,a,o){let l=this._renderer,c=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");let u=3,h=new ht(this._lodPlanes[s],c),f=c.uniforms,d=this._sizeLods[n]-1,p=isFinite(r)?Math.PI/(2*d):2*Math.PI/(2*us-1),y=r/p,g=isFinite(r)?1+Math.floor(u*y):us;g>us&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${g} samples when the maximum is set to ${us}`);let m=[],E=0;for(let R=0;R<us;++R){let I=R/y,S=Math.exp(-I*I/2);m.push(S),R===0?E+=S:R<g&&(E+=2*S)}for(let R=0;R<m.length;R++)m[R]=m[R]/E;f.envMap.value=e.texture,f.samples.value=g,f.weights.value=m,f.latitudinal.value=a==="latitudinal",o&&(f.poleAxis.value=o);let{_lodMax:v}=this;f.dTheta.value=p,f.mipInt.value=v-n;let _=this._sizeLods[s],T=3*_*(s>v-er?s-v+er:0),w=4*(this._cubeSize-_);Cl(t,T,w,3*_,2*_),l.setRenderTarget(t),l.render(h,oh)}};function Ay(i){let e=[],t=[],n=[],s=i,r=i-er+1+Hd.length;for(let a=0;a<r;a++){let o=Math.pow(2,s);t.push(o);let l=1/o;a>i-er?l=Hd[a-i+er-1]:a===0&&(l=0),n.push(l);let c=1/(o-2),u=-c,h=1+c,f=[u,u,h,u,h,h,u,u,h,h,u,h],d=6,p=6,y=3,g=2,m=1,E=new Float32Array(y*p*d),v=new Float32Array(g*p*d),_=new Float32Array(m*p*d);for(let w=0;w<d;w++){let R=w%3*2/3-1,I=w>2?0:-1,S=[R,I,0,R+2/3,I,0,R+2/3,I+1,0,R,I,0,R+2/3,I+1,0,R,I+1,0];E.set(S,y*p*w),v.set(f,g*p*w);let M=[w,w,w,w,w,w];_.set(M,m*p*w)}let T=new _t;T.setAttribute("position",new wt(E,y)),T.setAttribute("uv",new wt(v,g)),T.setAttribute("faceIndex",new wt(_,m)),e.push(T),s>er&&s--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function Wd(i,e,t){let n=new Bn(i,e,t);return n.texture.mapping=fa,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Cl(i,e,t,n,s){i.viewport.set(e,t,n,s),i.scissor.set(e,t,n,s)}function Ry(i,e,t){let n=new Float32Array(us),s=new D(0,1,0);return new dn({name:"SphericalGaussianBlur",defines:{n:us,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:Mh(),fragmentShader:`

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
		`,blending:ri,depthTest:!1,depthWrite:!1})}function Xd(){return new dn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Mh(),fragmentShader:`

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
		`,blending:ri,depthTest:!1,depthWrite:!1})}function $d(){return new dn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Mh(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:ri,depthTest:!1,depthWrite:!1})}function Mh(){return`

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
	`}function Cy(i){let e=new WeakMap,t=null;function n(o){if(o&&o.isTexture){let l=o.mapping,c=l===Vo||l===Go,u=l===ss||l===rs;if(c||u){let h=e.get(o),f=h!==void 0?h.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==f)return t===null&&(t=new Pl(i)),h=c?t.fromEquirectangular(o,h):t.fromCubemap(o,h),h.texture.pmremVersion=o.pmremVersion,e.set(o,h),h.texture;if(h!==void 0)return h.texture;{let d=o.image;return c&&d&&d.height>0||u&&d&&s(d)?(t===null&&(t=new Pl(i)),h=c?t.fromEquirectangular(o):t.fromCubemap(o),h.texture.pmremVersion=o.pmremVersion,e.set(o,h),o.addEventListener("dispose",r),h.texture):null}}}return o}function s(o){let l=0,c=6;for(let u=0;u<c;u++)o[u]!==void 0&&l++;return l===c}function r(o){let l=o.target;l.removeEventListener("dispose",r);let c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function a(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:a}}function Iy(i){let e={};function t(n){if(e[n]!==void 0)return e[n];let s;switch(n){case"WEBGL_depth_texture":s=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=i.getExtension(n)}return e[n]=s,s}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){let s=t(n);return s===null&&Bs("THREE.WebGLRenderer: "+n+" extension not supported."),s}}}function Py(i,e,t,n){let s={},r=new WeakMap;function a(h){let f=h.target;f.index!==null&&e.remove(f.index);for(let p in f.attributes)e.remove(f.attributes[p]);f.removeEventListener("dispose",a),delete s[f.id];let d=r.get(f);d&&(e.remove(d),r.delete(f)),n.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,t.memory.geometries--}function o(h,f){return s[f.id]===!0||(f.addEventListener("dispose",a),s[f.id]=!0,t.memory.geometries++),f}function l(h){let f=h.attributes;for(let d in f)e.update(f[d],i.ARRAY_BUFFER)}function c(h){let f=[],d=h.index,p=h.attributes.position,y=0;if(d!==null){let E=d.array;y=d.version;for(let v=0,_=E.length;v<_;v+=3){let T=E[v+0],w=E[v+1],R=E[v+2];f.push(T,w,w,R,R,T)}}else if(p!==void 0){let E=p.array;y=p.version;for(let v=0,_=E.length/3-1;v<_;v+=3){let T=v+0,w=v+1,R=v+2;f.push(T,w,w,R,R,T)}}else return;let g=new(th(f)?Ur:Dr)(f,1);g.version=y;let m=r.get(h);m&&e.remove(m),r.set(h,g)}function u(h){let f=r.get(h);if(f){let d=h.index;d!==null&&f.version<d.version&&c(h)}else c(h);return r.get(h)}return{get:o,update:l,getWireframeAttribute:u}}function Ly(i,e,t){let n;function s(f){n=f}let r,a;function o(f){r=f.type,a=f.bytesPerElement}function l(f,d){i.drawElements(n,d,r,f*a),t.update(d,n,1)}function c(f,d,p){p!==0&&(i.drawElementsInstanced(n,d,r,f*a,p),t.update(d,n,p))}function u(f,d,p){if(p===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,d,0,r,f,0,p);let g=0;for(let m=0;m<p;m++)g+=d[m];t.update(g,n,1)}function h(f,d,p,y){if(p===0)return;let g=e.get("WEBGL_multi_draw");if(g===null)for(let m=0;m<f.length;m++)c(f[m]/a,d[m],y[m]);else{g.multiDrawElementsInstancedWEBGL(n,d,0,r,f,0,y,0,p);let m=0;for(let E=0;E<p;E++)m+=d[E]*y[E];t.update(m,n,1)}}this.setMode=s,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=u,this.renderMultiDrawInstances=h}function Dy(i){let e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(t.calls++,a){case i.TRIANGLES:t.triangles+=o*(r/3);break;case i.LINES:t.lines+=o*(r/2);break;case i.LINE_STRIP:t.lines+=o*(r-1);break;case i.LINE_LOOP:t.lines+=o*r;break;case i.POINTS:t.points+=o*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:n}}function Uy(i,e,t){let n=new WeakMap,s=new mt;function r(a,o,l){let c=a.morphTargetInfluences,u=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,h=u!==void 0?u.length:0,f=n.get(o);if(f===void 0||f.count!==h){let S=function(){R.dispose(),n.delete(o),o.removeEventListener("dispose",S)};f!==void 0&&f.texture.dispose();let d=o.morphAttributes.position!==void 0,p=o.morphAttributes.normal!==void 0,y=o.morphAttributes.color!==void 0,g=o.morphAttributes.position||[],m=o.morphAttributes.normal||[],E=o.morphAttributes.color||[],v=0;d===!0&&(v=1),p===!0&&(v=2),y===!0&&(v=3);let _=o.attributes.position.count*v,T=1;_>e.maxTextureSize&&(T=Math.ceil(_/e.maxTextureSize),_=e.maxTextureSize);let w=new Float32Array(_*T*4*h),R=new Lr(w,_,T,h);R.type=vn,R.needsUpdate=!0;let I=v*4;for(let M=0;M<h;M++){let P=g[M],F=m[M],V=E[M],$=_*T*4*M;for(let L=0;L<P.count;L++){let H=L*I;d===!0&&(s.fromBufferAttribute(P,L),w[$+H+0]=s.x,w[$+H+1]=s.y,w[$+H+2]=s.z,w[$+H+3]=0),p===!0&&(s.fromBufferAttribute(F,L),w[$+H+4]=s.x,w[$+H+5]=s.y,w[$+H+6]=s.z,w[$+H+7]=0),y===!0&&(s.fromBufferAttribute(V,L),w[$+H+8]=s.x,w[$+H+9]=s.y,w[$+H+10]=s.z,w[$+H+11]=V.itemSize===4?s.w:1)}}f={count:h,texture:R,size:new fe(_,T)},n.set(o,f),o.addEventListener("dispose",S)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(i,"morphTexture",a.morphTexture,t);else{let d=0;for(let y=0;y<c.length;y++)d+=c[y];let p=o.morphTargetsRelative?1:1-d;l.getUniforms().setValue(i,"morphTargetBaseInfluence",p),l.getUniforms().setValue(i,"morphTargetInfluences",c)}l.getUniforms().setValue(i,"morphTargetsTexture",f.texture,t),l.getUniforms().setValue(i,"morphTargetsTextureSize",f.size)}return{update:r}}function Ny(i,e,t,n){let s=new WeakMap;function r(l){let c=n.render.frame,u=l.geometry,h=e.get(l,u);if(s.get(h)!==c&&(e.update(h),s.set(h,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",o)===!1&&l.addEventListener("dispose",o),s.get(l)!==c&&(t.update(l.instanceMatrix,i.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,i.ARRAY_BUFFER),s.set(l,c))),l.isSkinnedMesh){let f=l.skeleton;s.get(f)!==c&&(f.update(),s.set(f,c))}return h}function a(){s=new WeakMap}function o(l){let c=l.target;c.removeEventListener("dispose",o),t.remove(c.instanceMatrix),c.instanceColor!==null&&t.remove(c.instanceColor)}return{update:r,dispose:a}}var df=new Qt,qd=new $r(1,1),ff=new Lr,pf=new fo,mf=new Fr,Yd=[],Zd=[],Jd=new Float32Array(16),Kd=new Float32Array(9),jd=new Float32Array(4);function nr(i,e,t){let n=i[0];if(n<=0||n>0)return i;let s=e*t,r=Yd[s];if(r===void 0&&(r=new Float32Array(s),Yd[s]=r),e!==0){n.toArray(r,0);for(let a=1,o=0;a!==e;++a)o+=t,i[a].toArray(r,o)}return r}function Pt(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function Lt(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function Dl(i,e){let t=Zd[e];t===void 0&&(t=new Int32Array(e),Zd[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function Fy(i,e){let t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function Oy(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Pt(t,e))return;i.uniform2fv(this.addr,e),Lt(t,e)}}function By(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Pt(t,e))return;i.uniform3fv(this.addr,e),Lt(t,e)}}function zy(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Pt(t,e))return;i.uniform4fv(this.addr,e),Lt(t,e)}}function ky(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(Pt(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),Lt(t,e)}else{if(Pt(t,n))return;jd.set(n),i.uniformMatrix2fv(this.addr,!1,jd),Lt(t,n)}}function Hy(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(Pt(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),Lt(t,e)}else{if(Pt(t,n))return;Kd.set(n),i.uniformMatrix3fv(this.addr,!1,Kd),Lt(t,n)}}function Vy(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(Pt(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),Lt(t,e)}else{if(Pt(t,n))return;Jd.set(n),i.uniformMatrix4fv(this.addr,!1,Jd),Lt(t,n)}}function Gy(i,e){let t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function Wy(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Pt(t,e))return;i.uniform2iv(this.addr,e),Lt(t,e)}}function Xy(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Pt(t,e))return;i.uniform3iv(this.addr,e),Lt(t,e)}}function $y(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Pt(t,e))return;i.uniform4iv(this.addr,e),Lt(t,e)}}function qy(i,e){let t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function Yy(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Pt(t,e))return;i.uniform2uiv(this.addr,e),Lt(t,e)}}function Zy(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Pt(t,e))return;i.uniform3uiv(this.addr,e),Lt(t,e)}}function Jy(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Pt(t,e))return;i.uniform4uiv(this.addr,e),Lt(t,e)}}function Ky(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(qd.compareFunction=jc,r=qd):r=df,t.setTexture2D(e||r,s)}function jy(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture3D(e||pf,s)}function Qy(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTextureCube(e||mf,s)}function e_(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture2DArray(e||ff,s)}function t_(i){switch(i){case 5126:return Fy;case 35664:return Oy;case 35665:return By;case 35666:return zy;case 35674:return ky;case 35675:return Hy;case 35676:return Vy;case 5124:case 35670:return Gy;case 35667:case 35671:return Wy;case 35668:case 35672:return Xy;case 35669:case 35673:return $y;case 5125:return qy;case 36294:return Yy;case 36295:return Zy;case 36296:return Jy;case 35678:case 36198:case 36298:case 36306:case 35682:return Ky;case 35679:case 36299:case 36307:return jy;case 35680:case 36300:case 36308:case 36293:return Qy;case 36289:case 36303:case 36311:case 36292:return e_}}function n_(i,e){i.uniform1fv(this.addr,e)}function i_(i,e){let t=nr(e,this.size,2);i.uniform2fv(this.addr,t)}function s_(i,e){let t=nr(e,this.size,3);i.uniform3fv(this.addr,t)}function r_(i,e){let t=nr(e,this.size,4);i.uniform4fv(this.addr,t)}function a_(i,e){let t=nr(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function o_(i,e){let t=nr(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function l_(i,e){let t=nr(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function c_(i,e){i.uniform1iv(this.addr,e)}function h_(i,e){i.uniform2iv(this.addr,e)}function u_(i,e){i.uniform3iv(this.addr,e)}function d_(i,e){i.uniform4iv(this.addr,e)}function f_(i,e){i.uniform1uiv(this.addr,e)}function p_(i,e){i.uniform2uiv(this.addr,e)}function m_(i,e){i.uniform3uiv(this.addr,e)}function g_(i,e){i.uniform4uiv(this.addr,e)}function y_(i,e,t){let n=this.cache,s=e.length,r=Dl(t,s);Pt(n,r)||(i.uniform1iv(this.addr,r),Lt(n,r));for(let a=0;a!==s;++a)t.setTexture2D(e[a]||df,r[a])}function __(i,e,t){let n=this.cache,s=e.length,r=Dl(t,s);Pt(n,r)||(i.uniform1iv(this.addr,r),Lt(n,r));for(let a=0;a!==s;++a)t.setTexture3D(e[a]||pf,r[a])}function x_(i,e,t){let n=this.cache,s=e.length,r=Dl(t,s);Pt(n,r)||(i.uniform1iv(this.addr,r),Lt(n,r));for(let a=0;a!==s;++a)t.setTextureCube(e[a]||mf,r[a])}function v_(i,e,t){let n=this.cache,s=e.length,r=Dl(t,s);Pt(n,r)||(i.uniform1iv(this.addr,r),Lt(n,r));for(let a=0;a!==s;++a)t.setTexture2DArray(e[a]||ff,r[a])}function M_(i){switch(i){case 5126:return n_;case 35664:return i_;case 35665:return s_;case 35666:return r_;case 35674:return a_;case 35675:return o_;case 35676:return l_;case 5124:case 35670:return c_;case 35667:case 35671:return h_;case 35668:case 35672:return u_;case 35669:case 35673:return d_;case 5125:return f_;case 36294:return p_;case 36295:return m_;case 36296:return g_;case 35678:case 36198:case 36298:case 36306:case 35682:return y_;case 35679:case 36299:case 36307:return __;case 35680:case 36300:case 36308:case 36293:return x_;case 36289:case 36303:case 36311:case 36292:return v_}}var fh=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=t_(t.type)}},ph=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=M_(t.type)}},mh=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let s=this.seq;for(let r=0,a=s.length;r!==a;++r){let o=s[r];o.setValue(e,t[o.id],n)}}},dh=/(\w+)(\])?(\[|\.)?/g;function Qd(i,e){i.seq.push(e),i.map[e.id]=e}function S_(i,e,t){let n=i.name,s=n.length;for(dh.lastIndex=0;;){let r=dh.exec(n),a=dh.lastIndex,o=r[1],l=r[2]==="]",c=r[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===s){Qd(t,c===void 0?new fh(o,i,e):new ph(o,i,e));break}else{let h=t.map[o];h===void 0&&(h=new mh(o),Qd(t,h)),t=h}}}var tr=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let s=0;s<n;++s){let r=e.getActiveUniform(t,s),a=e.getUniformLocation(t,r.name);S_(r,a,this)}}setValue(e,t,n,s){let r=this.map[t];r!==void 0&&r.setValue(e,n,s)}setOptional(e,t,n){let s=t[n];s!==void 0&&this.setValue(e,n,s)}static upload(e,t,n,s){for(let r=0,a=t.length;r!==a;++r){let o=t[r],l=n[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,s)}}static seqWithValue(e,t){let n=[];for(let s=0,r=e.length;s!==r;++s){let a=e[s];a.id in t&&n.push(a)}return n}};function ef(i,e,t){let n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}var b_=37297,E_=0;function w_(i,e){let t=i.split(`
`),n=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let a=s;a<r;a++){let o=a+1;n.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return n.join(`
`)}var tf=new Ge;function T_(i){it._getMatrix(tf,it.workingColorSpace,i);let e=`mat3( ${tf.elements.map(t=>t.toFixed(4))} )`;switch(it.getTransfer(i)){case Cr:return[e,"LinearTransferOETF"];case at:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",i),[e,"LinearTransferOETF"]}}function nf(i,e,t){let n=i.getShaderParameter(e,i.COMPILE_STATUS),r=(i.getShaderInfoLog(e)||"").trim();if(n&&r==="")return"";let a=/ERROR: 0:(\d+)/.exec(r);if(a){let o=parseInt(a[1]);return t.toUpperCase()+`

`+r+`

`+w_(i.getShaderSource(e),o)}else return r}function A_(i,e){let t=T_(e);return[`vec4 ${i}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function R_(i,e){let t;switch(e){case hd:t="Linear";break;case ud:t="Reinhard";break;case dd:t="Cineon";break;case Ho:t="ACESFilmic";break;case pd:t="AgX";break;case md:t="Neutral";break;case fd:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}var Il=new D;function C_(){it.getLuminanceCoefficients(Il);let i=Il.x.toFixed(4),e=Il.y.toFixed(4),t=Il.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function I_(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(xa).join(`
`)}function P_(i){let e=[];for(let t in i){let n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function L_(i,e){let t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){let r=i.getActiveAttrib(e,s),a=r.name,o=1;r.type===i.FLOAT_MAT2&&(o=2),r.type===i.FLOAT_MAT3&&(o=3),r.type===i.FLOAT_MAT4&&(o=4),t[a]={type:r.type,location:i.getAttribLocation(e,a),locationSize:o}}return t}function xa(i){return i!==""}function sf(i,e){let t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function rf(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}var D_=/^[ \t]*#include +<([\w\d./]+)>/gm;function gh(i){return i.replace(D_,N_)}var U_=new Map;function N_(i,e){let t=Ye[e];if(t===void 0){let n=U_.get(e);if(n!==void 0)t=Ye[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return gh(t)}var F_=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function af(i){return i.replace(F_,O_)}function O_(i,e,t,n){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function of(i){let e=`precision ${i.precision} float;
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
#define LOW_PRECISION`),e}function B_(i){let e="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===Bc?e="SHADOWMAP_TYPE_PCF":i.shadowMapType===Do?e="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===Hn&&(e="SHADOWMAP_TYPE_VSM"),e}function z_(i){let e="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case ss:case rs:e="ENVMAP_TYPE_CUBE";break;case fa:e="ENVMAP_TYPE_CUBE_UV";break}return e}function k_(i){let e="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case rs:e="ENVMAP_MODE_REFRACTION";break}return e}function H_(i){let e="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case Vc:e="ENVMAP_BLENDING_MULTIPLY";break;case ld:e="ENVMAP_BLENDING_MIX";break;case cd:e="ENVMAP_BLENDING_ADD";break}return e}function V_(i){let e=i.envMapCubeUVHeight;if(e===null)return null;let t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:n,maxMip:t}}function G_(i,e,t,n){let s=i.getContext(),r=t.defines,a=t.vertexShader,o=t.fragmentShader,l=B_(t),c=z_(t),u=k_(t),h=H_(t),f=V_(t),d=I_(t),p=P_(r),y=s.createProgram(),g,m,E=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(g=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p].filter(xa).join(`
`),g.length>0&&(g+=`
`),m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p].filter(xa).join(`
`),m.length>0&&(m+=`
`)):(g=[of(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(xa).join(`
`),m=[of(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+u:"",t.envMap?"#define "+h:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==ai?"#define TONE_MAPPING":"",t.toneMapping!==ai?Ye.tonemapping_pars_fragment:"",t.toneMapping!==ai?R_("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Ye.colorspace_pars_fragment,A_("linearToOutputTexel",t.outputColorSpace),C_(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(xa).join(`
`)),a=gh(a),a=sf(a,t),a=rf(a,t),o=gh(o),o=sf(o,t),o=rf(o,t),a=af(a),o=af(o),t.isRawShaderMaterial!==!0&&(E=`#version 300 es
`,g=[d,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,m=["#define varying in",t.glslVersion===Qc?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Qc?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+m);let v=E+g+a,_=E+m+o,T=ef(s,s.VERTEX_SHADER,v),w=ef(s,s.FRAGMENT_SHADER,_);s.attachShader(y,T),s.attachShader(y,w),t.index0AttributeName!==void 0?s.bindAttribLocation(y,0,t.index0AttributeName):t.morphTargets===!0&&s.bindAttribLocation(y,0,"position"),s.linkProgram(y);function R(P){if(i.debug.checkShaderErrors){let F=s.getProgramInfoLog(y)||"",V=s.getShaderInfoLog(T)||"",$=s.getShaderInfoLog(w)||"",L=F.trim(),H=V.trim(),N=$.trim(),k=!0,Q=!0;if(s.getProgramParameter(y,s.LINK_STATUS)===!1)if(k=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,y,T,w);else{let le=nf(s,T,"vertex"),ye=nf(s,w,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(y,s.VALIDATE_STATUS)+`

Material Name: `+P.name+`
Material Type: `+P.type+`

Program Info Log: `+L+`
`+le+`
`+ye)}else L!==""?console.warn("THREE.WebGLProgram: Program Info Log:",L):(H===""||N==="")&&(Q=!1);Q&&(P.diagnostics={runnable:k,programLog:L,vertexShader:{log:H,prefix:g},fragmentShader:{log:N,prefix:m}})}s.deleteShader(T),s.deleteShader(w),I=new tr(s,y),S=L_(s,y)}let I;this.getUniforms=function(){return I===void 0&&R(this),I};let S;this.getAttributes=function(){return S===void 0&&R(this),S};let M=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return M===!1&&(M=s.getProgramParameter(y,b_)),M},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(y),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=E_++,this.cacheKey=e,this.usedTimes=1,this.program=y,this.vertexShader=T,this.fragmentShader=w,this}var W_=0,yh=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){let t=e.vertexShader,n=e.fragmentShader,s=this._getShaderStage(t),r=this._getShaderStage(n),a=this._getShaderCacheForMaterial(e);return a.has(s)===!1&&(a.add(s),s.usedTimes++),a.has(r)===!1&&(a.add(r),r.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new _h(e),t.set(e,n)),n}},_h=class{constructor(e){this.id=W_++,this.code=e,this.usedTimes=0}};function X_(i,e,t,n,s,r,a){let o=new ks,l=new yh,c=new Set,u=[],h=s.logarithmicDepthBuffer,f=s.vertexTextures,d=s.precision,p={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function y(S){return c.add(S),S===0?"uv":`uv${S}`}function g(S,M,P,F,V){let $=F.fog,L=V.geometry,H=S.isMeshStandardMaterial?F.environment:null,N=(S.isMeshStandardMaterial?t:e).get(S.envMap||H),k=N&&N.mapping===fa?N.image.height:null,Q=p[S.type];S.precision!==null&&(d=s.getMaxPrecision(S.precision),d!==S.precision&&console.warn("THREE.WebGLProgram.getParameters:",S.precision,"not supported, using",d,"instead."));let le=L.morphAttributes.position||L.morphAttributes.normal||L.morphAttributes.color,ye=le!==void 0?le.length:0,Ne=0;L.morphAttributes.position!==void 0&&(Ne=1),L.morphAttributes.normal!==void 0&&(Ne=2),L.morphAttributes.color!==void 0&&(Ne=3);let Xe,et,Ke,Y;if(Q){let rt=Vn[Q];Xe=rt.vertexShader,et=rt.fragmentShader}else Xe=S.vertexShader,et=S.fragmentShader,l.update(S),Ke=l.getVertexShaderID(S),Y=l.getFragmentShaderID(S);let ne=i.getRenderTarget(),Se=i.state.buffers.depth.getReversed(),Le=V.isInstancedMesh===!0,Te=V.isBatchedMesh===!0,je=!!S.map,dt=!!S.matcap,C=!!N,te=!!S.aoMap,K=!!S.lightMap,J=!!S.bumpMap,Z=!!S.normalMap,he=!!S.displacementMap,ie=!!S.emissiveMap,ue=!!S.metalnessMap,He=!!S.roughnessMap,ze=S.anisotropy>0,A=S.clearcoat>0,x=S.dispersion>0,z=S.iridescence>0,X=S.sheen>0,ee=S.transmission>0,q=ze&&!!S.anisotropyMap,Ie=A&&!!S.clearcoatMap,ce=A&&!!S.clearcoatNormalMap,Ae=A&&!!S.clearcoatRoughnessMap,Re=z&&!!S.iridescenceMap,se=z&&!!S.iridescenceThicknessMap,xe=X&&!!S.sheenColorMap,Oe=X&&!!S.sheenRoughnessMap,Pe=!!S.specularMap,ge=!!S.specularColorMap,$e=!!S.specularIntensityMap,U=ee&&!!S.transmissionMap,oe=ee&&!!S.thicknessMap,de=!!S.gradientMap,be=!!S.alphaMap,re=S.alphaTest>0,j=!!S.alphaHash,Ce=!!S.extensions,Ve=ai;S.toneMapped&&(ne===null||ne.isXRRenderTarget===!0)&&(Ve=i.toneMapping);let ft={shaderID:Q,shaderType:S.type,shaderName:S.name,vertexShader:Xe,fragmentShader:et,defines:S.defines,customVertexShaderID:Ke,customFragmentShaderID:Y,isRawShaderMaterial:S.isRawShaderMaterial===!0,glslVersion:S.glslVersion,precision:d,batching:Te,batchingColor:Te&&V._colorsTexture!==null,instancing:Le,instancingColor:Le&&V.instanceColor!==null,instancingMorph:Le&&V.morphTexture!==null,supportsVertexTextures:f,outputColorSpace:ne===null?i.outputColorSpace:ne.isXRRenderTarget===!0?ne.texture.colorSpace:Ji,alphaToCoverage:!!S.alphaToCoverage,map:je,matcap:dt,envMap:C,envMapMode:C&&N.mapping,envMapCubeUVHeight:k,aoMap:te,lightMap:K,bumpMap:J,normalMap:Z,displacementMap:f&&he,emissiveMap:ie,normalMapObjectSpace:Z&&S.normalMapType===bd,normalMapTangentSpace:Z&&S.normalMapType===Kc,metalnessMap:ue,roughnessMap:He,anisotropy:ze,anisotropyMap:q,clearcoat:A,clearcoatMap:Ie,clearcoatNormalMap:ce,clearcoatRoughnessMap:Ae,dispersion:x,iridescence:z,iridescenceMap:Re,iridescenceThicknessMap:se,sheen:X,sheenColorMap:xe,sheenRoughnessMap:Oe,specularMap:Pe,specularColorMap:ge,specularIntensityMap:$e,transmission:ee,transmissionMap:U,thicknessMap:oe,gradientMap:de,opaque:S.transparent===!1&&S.blending===Yi&&S.alphaToCoverage===!1,alphaMap:be,alphaTest:re,alphaHash:j,combine:S.combine,mapUv:je&&y(S.map.channel),aoMapUv:te&&y(S.aoMap.channel),lightMapUv:K&&y(S.lightMap.channel),bumpMapUv:J&&y(S.bumpMap.channel),normalMapUv:Z&&y(S.normalMap.channel),displacementMapUv:he&&y(S.displacementMap.channel),emissiveMapUv:ie&&y(S.emissiveMap.channel),metalnessMapUv:ue&&y(S.metalnessMap.channel),roughnessMapUv:He&&y(S.roughnessMap.channel),anisotropyMapUv:q&&y(S.anisotropyMap.channel),clearcoatMapUv:Ie&&y(S.clearcoatMap.channel),clearcoatNormalMapUv:ce&&y(S.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Ae&&y(S.clearcoatRoughnessMap.channel),iridescenceMapUv:Re&&y(S.iridescenceMap.channel),iridescenceThicknessMapUv:se&&y(S.iridescenceThicknessMap.channel),sheenColorMapUv:xe&&y(S.sheenColorMap.channel),sheenRoughnessMapUv:Oe&&y(S.sheenRoughnessMap.channel),specularMapUv:Pe&&y(S.specularMap.channel),specularColorMapUv:ge&&y(S.specularColorMap.channel),specularIntensityMapUv:$e&&y(S.specularIntensityMap.channel),transmissionMapUv:U&&y(S.transmissionMap.channel),thicknessMapUv:oe&&y(S.thicknessMap.channel),alphaMapUv:be&&y(S.alphaMap.channel),vertexTangents:!!L.attributes.tangent&&(Z||ze),vertexColors:S.vertexColors,vertexAlphas:S.vertexColors===!0&&!!L.attributes.color&&L.attributes.color.itemSize===4,pointsUvs:V.isPoints===!0&&!!L.attributes.uv&&(je||be),fog:!!$,useFog:S.fog===!0,fogExp2:!!$&&$.isFogExp2,flatShading:S.flatShading===!0&&S.wireframe===!1,sizeAttenuation:S.sizeAttenuation===!0,logarithmicDepthBuffer:h,reversedDepthBuffer:Se,skinning:V.isSkinnedMesh===!0,morphTargets:L.morphAttributes.position!==void 0,morphNormals:L.morphAttributes.normal!==void 0,morphColors:L.morphAttributes.color!==void 0,morphTargetsCount:ye,morphTextureStride:Ne,numDirLights:M.directional.length,numPointLights:M.point.length,numSpotLights:M.spot.length,numSpotLightMaps:M.spotLightMap.length,numRectAreaLights:M.rectArea.length,numHemiLights:M.hemi.length,numDirLightShadows:M.directionalShadowMap.length,numPointLightShadows:M.pointShadowMap.length,numSpotLightShadows:M.spotShadowMap.length,numSpotLightShadowsWithMaps:M.numSpotLightShadowsWithMaps,numLightProbes:M.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:S.dithering,shadowMapEnabled:i.shadowMap.enabled&&P.length>0,shadowMapType:i.shadowMap.type,toneMapping:Ve,decodeVideoTexture:je&&S.map.isVideoTexture===!0&&it.getTransfer(S.map.colorSpace)===at,decodeVideoTextureEmissive:ie&&S.emissiveMap.isVideoTexture===!0&&it.getTransfer(S.emissiveMap.colorSpace)===at,premultipliedAlpha:S.premultipliedAlpha,doubleSided:S.side===xn,flipSided:S.side===zt,useDepthPacking:S.depthPacking>=0,depthPacking:S.depthPacking||0,index0AttributeName:S.index0AttributeName,extensionClipCullDistance:Ce&&S.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Ce&&S.extensions.multiDraw===!0||Te)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:S.customProgramCacheKey()};return ft.vertexUv1s=c.has(1),ft.vertexUv2s=c.has(2),ft.vertexUv3s=c.has(3),c.clear(),ft}function m(S){let M=[];if(S.shaderID?M.push(S.shaderID):(M.push(S.customVertexShaderID),M.push(S.customFragmentShaderID)),S.defines!==void 0)for(let P in S.defines)M.push(P),M.push(S.defines[P]);return S.isRawShaderMaterial===!1&&(E(M,S),v(M,S),M.push(i.outputColorSpace)),M.push(S.customProgramCacheKey),M.join()}function E(S,M){S.push(M.precision),S.push(M.outputColorSpace),S.push(M.envMapMode),S.push(M.envMapCubeUVHeight),S.push(M.mapUv),S.push(M.alphaMapUv),S.push(M.lightMapUv),S.push(M.aoMapUv),S.push(M.bumpMapUv),S.push(M.normalMapUv),S.push(M.displacementMapUv),S.push(M.emissiveMapUv),S.push(M.metalnessMapUv),S.push(M.roughnessMapUv),S.push(M.anisotropyMapUv),S.push(M.clearcoatMapUv),S.push(M.clearcoatNormalMapUv),S.push(M.clearcoatRoughnessMapUv),S.push(M.iridescenceMapUv),S.push(M.iridescenceThicknessMapUv),S.push(M.sheenColorMapUv),S.push(M.sheenRoughnessMapUv),S.push(M.specularMapUv),S.push(M.specularColorMapUv),S.push(M.specularIntensityMapUv),S.push(M.transmissionMapUv),S.push(M.thicknessMapUv),S.push(M.combine),S.push(M.fogExp2),S.push(M.sizeAttenuation),S.push(M.morphTargetsCount),S.push(M.morphAttributeCount),S.push(M.numDirLights),S.push(M.numPointLights),S.push(M.numSpotLights),S.push(M.numSpotLightMaps),S.push(M.numHemiLights),S.push(M.numRectAreaLights),S.push(M.numDirLightShadows),S.push(M.numPointLightShadows),S.push(M.numSpotLightShadows),S.push(M.numSpotLightShadowsWithMaps),S.push(M.numLightProbes),S.push(M.shadowMapType),S.push(M.toneMapping),S.push(M.numClippingPlanes),S.push(M.numClipIntersection),S.push(M.depthPacking)}function v(S,M){o.disableAll(),M.supportsVertexTextures&&o.enable(0),M.instancing&&o.enable(1),M.instancingColor&&o.enable(2),M.instancingMorph&&o.enable(3),M.matcap&&o.enable(4),M.envMap&&o.enable(5),M.normalMapObjectSpace&&o.enable(6),M.normalMapTangentSpace&&o.enable(7),M.clearcoat&&o.enable(8),M.iridescence&&o.enable(9),M.alphaTest&&o.enable(10),M.vertexColors&&o.enable(11),M.vertexAlphas&&o.enable(12),M.vertexUv1s&&o.enable(13),M.vertexUv2s&&o.enable(14),M.vertexUv3s&&o.enable(15),M.vertexTangents&&o.enable(16),M.anisotropy&&o.enable(17),M.alphaHash&&o.enable(18),M.batching&&o.enable(19),M.dispersion&&o.enable(20),M.batchingColor&&o.enable(21),M.gradientMap&&o.enable(22),S.push(o.mask),o.disableAll(),M.fog&&o.enable(0),M.useFog&&o.enable(1),M.flatShading&&o.enable(2),M.logarithmicDepthBuffer&&o.enable(3),M.reversedDepthBuffer&&o.enable(4),M.skinning&&o.enable(5),M.morphTargets&&o.enable(6),M.morphNormals&&o.enable(7),M.morphColors&&o.enable(8),M.premultipliedAlpha&&o.enable(9),M.shadowMapEnabled&&o.enable(10),M.doubleSided&&o.enable(11),M.flipSided&&o.enable(12),M.useDepthPacking&&o.enable(13),M.dithering&&o.enable(14),M.transmission&&o.enable(15),M.sheen&&o.enable(16),M.opaque&&o.enable(17),M.pointsUvs&&o.enable(18),M.decodeVideoTexture&&o.enable(19),M.decodeVideoTextureEmissive&&o.enable(20),M.alphaToCoverage&&o.enable(21),S.push(o.mask)}function _(S){let M=p[S.type],P;if(M){let F=Vn[M];P=Ud.clone(F.uniforms)}else P=S.uniforms;return P}function T(S,M){let P;for(let F=0,V=u.length;F<V;F++){let $=u[F];if($.cacheKey===M){P=$,++P.usedTimes;break}}return P===void 0&&(P=new G_(i,M,S,r),u.push(P)),P}function w(S){if(--S.usedTimes===0){let M=u.indexOf(S);u[M]=u[u.length-1],u.pop(),S.destroy()}}function R(S){l.remove(S)}function I(){l.dispose()}return{getParameters:g,getProgramCacheKey:m,getUniforms:_,acquireProgram:T,releaseProgram:w,releaseShaderCache:R,programs:u,dispose:I}}function $_(){let i=new WeakMap;function e(a){return i.has(a)}function t(a){let o=i.get(a);return o===void 0&&(o={},i.set(a,o)),o}function n(a){i.delete(a)}function s(a,o,l){i.get(a)[o]=l}function r(){i=new WeakMap}return{has:e,get:t,remove:n,update:s,dispose:r}}function q_(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.z!==e.z?i.z-e.z:i.id-e.id}function lf(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function cf(){let i=[],e=0,t=[],n=[],s=[];function r(){e=0,t.length=0,n.length=0,s.length=0}function a(h,f,d,p,y,g){let m=i[e];return m===void 0?(m={id:h.id,object:h,geometry:f,material:d,groupOrder:p,renderOrder:h.renderOrder,z:y,group:g},i[e]=m):(m.id=h.id,m.object=h,m.geometry=f,m.material=d,m.groupOrder=p,m.renderOrder=h.renderOrder,m.z=y,m.group=g),e++,m}function o(h,f,d,p,y,g){let m=a(h,f,d,p,y,g);d.transmission>0?n.push(m):d.transparent===!0?s.push(m):t.push(m)}function l(h,f,d,p,y,g){let m=a(h,f,d,p,y,g);d.transmission>0?n.unshift(m):d.transparent===!0?s.unshift(m):t.unshift(m)}function c(h,f){t.length>1&&t.sort(h||q_),n.length>1&&n.sort(f||lf),s.length>1&&s.sort(f||lf)}function u(){for(let h=e,f=i.length;h<f;h++){let d=i[h];if(d.id===null)break;d.id=null,d.object=null,d.geometry=null,d.material=null,d.group=null}}return{opaque:t,transmissive:n,transparent:s,init:r,push:o,unshift:l,finish:u,sort:c}}function Y_(){let i=new WeakMap;function e(n,s){let r=i.get(n),a;return r===void 0?(a=new cf,i.set(n,[a])):s>=r.length?(a=new cf,r.push(a)):a=r[s],a}function t(){i=new WeakMap}return{get:e,dispose:t}}function Z_(){let i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new D,color:new ke};break;case"SpotLight":t={position:new D,direction:new D,color:new ke,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new D,color:new ke,distance:0,decay:0};break;case"HemisphereLight":t={direction:new D,skyColor:new ke,groundColor:new ke};break;case"RectAreaLight":t={color:new ke,position:new D,halfWidth:new D,halfHeight:new D};break}return i[e.id]=t,t}}}function J_(){let i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new fe};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new fe};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new fe,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}var K_=0;function j_(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function Q_(i){let e=new Z_,t=J_(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new D);let s=new D,r=new qe,a=new qe;function o(c){let u=0,h=0,f=0;for(let S=0;S<9;S++)n.probe[S].set(0,0,0);let d=0,p=0,y=0,g=0,m=0,E=0,v=0,_=0,T=0,w=0,R=0;c.sort(j_);for(let S=0,M=c.length;S<M;S++){let P=c[S],F=P.color,V=P.intensity,$=P.distance,L=P.shadow&&P.shadow.map?P.shadow.map.texture:null;if(P.isAmbientLight)u+=F.r*V,h+=F.g*V,f+=F.b*V;else if(P.isLightProbe){for(let H=0;H<9;H++)n.probe[H].addScaledVector(P.sh.coefficients[H],V);R++}else if(P.isDirectionalLight){let H=e.get(P);if(H.color.copy(P.color).multiplyScalar(P.intensity),P.castShadow){let N=P.shadow,k=t.get(P);k.shadowIntensity=N.intensity,k.shadowBias=N.bias,k.shadowNormalBias=N.normalBias,k.shadowRadius=N.radius,k.shadowMapSize=N.mapSize,n.directionalShadow[d]=k,n.directionalShadowMap[d]=L,n.directionalShadowMatrix[d]=P.shadow.matrix,E++}n.directional[d]=H,d++}else if(P.isSpotLight){let H=e.get(P);H.position.setFromMatrixPosition(P.matrixWorld),H.color.copy(F).multiplyScalar(V),H.distance=$,H.coneCos=Math.cos(P.angle),H.penumbraCos=Math.cos(P.angle*(1-P.penumbra)),H.decay=P.decay,n.spot[y]=H;let N=P.shadow;if(P.map&&(n.spotLightMap[T]=P.map,T++,N.updateMatrices(P),P.castShadow&&w++),n.spotLightMatrix[y]=N.matrix,P.castShadow){let k=t.get(P);k.shadowIntensity=N.intensity,k.shadowBias=N.bias,k.shadowNormalBias=N.normalBias,k.shadowRadius=N.radius,k.shadowMapSize=N.mapSize,n.spotShadow[y]=k,n.spotShadowMap[y]=L,_++}y++}else if(P.isRectAreaLight){let H=e.get(P);H.color.copy(F).multiplyScalar(V),H.halfWidth.set(P.width*.5,0,0),H.halfHeight.set(0,P.height*.5,0),n.rectArea[g]=H,g++}else if(P.isPointLight){let H=e.get(P);if(H.color.copy(P.color).multiplyScalar(P.intensity),H.distance=P.distance,H.decay=P.decay,P.castShadow){let N=P.shadow,k=t.get(P);k.shadowIntensity=N.intensity,k.shadowBias=N.bias,k.shadowNormalBias=N.normalBias,k.shadowRadius=N.radius,k.shadowMapSize=N.mapSize,k.shadowCameraNear=N.camera.near,k.shadowCameraFar=N.camera.far,n.pointShadow[p]=k,n.pointShadowMap[p]=L,n.pointShadowMatrix[p]=P.shadow.matrix,v++}n.point[p]=H,p++}else if(P.isHemisphereLight){let H=e.get(P);H.skyColor.copy(P.color).multiplyScalar(V),H.groundColor.copy(P.groundColor).multiplyScalar(V),n.hemi[m]=H,m++}}g>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=pe.LTC_FLOAT_1,n.rectAreaLTC2=pe.LTC_FLOAT_2):(n.rectAreaLTC1=pe.LTC_HALF_1,n.rectAreaLTC2=pe.LTC_HALF_2)),n.ambient[0]=u,n.ambient[1]=h,n.ambient[2]=f;let I=n.hash;(I.directionalLength!==d||I.pointLength!==p||I.spotLength!==y||I.rectAreaLength!==g||I.hemiLength!==m||I.numDirectionalShadows!==E||I.numPointShadows!==v||I.numSpotShadows!==_||I.numSpotMaps!==T||I.numLightProbes!==R)&&(n.directional.length=d,n.spot.length=y,n.rectArea.length=g,n.point.length=p,n.hemi.length=m,n.directionalShadow.length=E,n.directionalShadowMap.length=E,n.pointShadow.length=v,n.pointShadowMap.length=v,n.spotShadow.length=_,n.spotShadowMap.length=_,n.directionalShadowMatrix.length=E,n.pointShadowMatrix.length=v,n.spotLightMatrix.length=_+T-w,n.spotLightMap.length=T,n.numSpotLightShadowsWithMaps=w,n.numLightProbes=R,I.directionalLength=d,I.pointLength=p,I.spotLength=y,I.rectAreaLength=g,I.hemiLength=m,I.numDirectionalShadows=E,I.numPointShadows=v,I.numSpotShadows=_,I.numSpotMaps=T,I.numLightProbes=R,n.version=K_++)}function l(c,u){let h=0,f=0,d=0,p=0,y=0,g=u.matrixWorldInverse;for(let m=0,E=c.length;m<E;m++){let v=c[m];if(v.isDirectionalLight){let _=n.directional[h];_.direction.setFromMatrixPosition(v.matrixWorld),s.setFromMatrixPosition(v.target.matrixWorld),_.direction.sub(s),_.direction.transformDirection(g),h++}else if(v.isSpotLight){let _=n.spot[d];_.position.setFromMatrixPosition(v.matrixWorld),_.position.applyMatrix4(g),_.direction.setFromMatrixPosition(v.matrixWorld),s.setFromMatrixPosition(v.target.matrixWorld),_.direction.sub(s),_.direction.transformDirection(g),d++}else if(v.isRectAreaLight){let _=n.rectArea[p];_.position.setFromMatrixPosition(v.matrixWorld),_.position.applyMatrix4(g),a.identity(),r.copy(v.matrixWorld),r.premultiply(g),a.extractRotation(r),_.halfWidth.set(v.width*.5,0,0),_.halfHeight.set(0,v.height*.5,0),_.halfWidth.applyMatrix4(a),_.halfHeight.applyMatrix4(a),p++}else if(v.isPointLight){let _=n.point[f];_.position.setFromMatrixPosition(v.matrixWorld),_.position.applyMatrix4(g),f++}else if(v.isHemisphereLight){let _=n.hemi[y];_.direction.setFromMatrixPosition(v.matrixWorld),_.direction.transformDirection(g),y++}}}return{setup:o,setupView:l,state:n}}function hf(i){let e=new Q_(i),t=[],n=[];function s(u){c.camera=u,t.length=0,n.length=0}function r(u){t.push(u)}function a(u){n.push(u)}function o(){e.setup(t)}function l(u){e.setupView(t,u)}let c={lightsArray:t,shadowsArray:n,camera:null,lights:e,transmissionRenderTarget:{}};return{init:s,state:c,setupLights:o,setupLightsView:l,pushLight:r,pushShadow:a}}function ex(i){let e=new WeakMap;function t(s,r=0){let a=e.get(s),o;return a===void 0?(o=new hf(i),e.set(s,[o])):r>=a.length?(o=new hf(i),a.push(o)):o=a[r],o}function n(){e=new WeakMap}return{get:t,dispose:n}}var tx=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,nx=`uniform sampler2D shadow_pass;
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
}`;function ix(i,e,t){let n=new Ei,s=new fe,r=new fe,a=new mt,o=new bo({depthPacking:Sd}),l=new Eo,c={},u=t.maxTextureSize,h={[jn]:zt,[zt]:jn,[xn]:xn},f=new dn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new fe},radius:{value:4}},vertexShader:tx,fragmentShader:nx}),d=f.clone();d.defines.HORIZONTAL_PASS=1;let p=new _t;p.setAttribute("position",new wt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let y=new ht(p,f),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Bc;let m=this.type;this.render=function(w,R,I){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||w.length===0)return;let S=i.getRenderTarget(),M=i.getActiveCubeFace(),P=i.getActiveMipmapLevel(),F=i.state;F.setBlending(ri),F.buffers.depth.getReversed()===!0?F.buffers.color.setClear(0,0,0,0):F.buffers.color.setClear(1,1,1,1),F.buffers.depth.setTest(!0),F.setScissorTest(!1);let V=m!==Hn&&this.type===Hn,$=m===Hn&&this.type!==Hn;for(let L=0,H=w.length;L<H;L++){let N=w[L],k=N.shadow;if(k===void 0){console.warn("THREE.WebGLShadowMap:",N,"has no shadow.");continue}if(k.autoUpdate===!1&&k.needsUpdate===!1)continue;s.copy(k.mapSize);let Q=k.getFrameExtents();if(s.multiply(Q),r.copy(k.mapSize),(s.x>u||s.y>u)&&(s.x>u&&(r.x=Math.floor(u/Q.x),s.x=r.x*Q.x,k.mapSize.x=r.x),s.y>u&&(r.y=Math.floor(u/Q.y),s.y=r.y*Q.y,k.mapSize.y=r.y)),k.map===null||V===!0||$===!0){let ye=this.type!==Hn?{minFilter:jt,magFilter:jt}:{};k.map!==null&&k.map.dispose(),k.map=new Bn(s.x,s.y,ye),k.map.texture.name=N.name+".shadowMap",k.camera.updateProjectionMatrix()}i.setRenderTarget(k.map),i.clear();let le=k.getViewportCount();for(let ye=0;ye<le;ye++){let Ne=k.getViewport(ye);a.set(r.x*Ne.x,r.y*Ne.y,r.x*Ne.z,r.y*Ne.w),F.viewport(a),k.updateMatrices(N,ye),n=k.getFrustum(),_(R,I,k.camera,N,this.type)}k.isPointLightShadow!==!0&&this.type===Hn&&E(k,I),k.needsUpdate=!1}m=this.type,g.needsUpdate=!1,i.setRenderTarget(S,M,P)};function E(w,R){let I=e.update(y);f.defines.VSM_SAMPLES!==w.blurSamples&&(f.defines.VSM_SAMPLES=w.blurSamples,d.defines.VSM_SAMPLES=w.blurSamples,f.needsUpdate=!0,d.needsUpdate=!0),w.mapPass===null&&(w.mapPass=new Bn(s.x,s.y)),f.uniforms.shadow_pass.value=w.map.texture,f.uniforms.resolution.value=w.mapSize,f.uniforms.radius.value=w.radius,i.setRenderTarget(w.mapPass),i.clear(),i.renderBufferDirect(R,null,I,f,y,null),d.uniforms.shadow_pass.value=w.mapPass.texture,d.uniforms.resolution.value=w.mapSize,d.uniforms.radius.value=w.radius,i.setRenderTarget(w.map),i.clear(),i.renderBufferDirect(R,null,I,d,y,null)}function v(w,R,I,S){let M=null,P=I.isPointLight===!0?w.customDistanceMaterial:w.customDepthMaterial;if(P!==void 0)M=P;else if(M=I.isPointLight===!0?l:o,i.localClippingEnabled&&R.clipShadows===!0&&Array.isArray(R.clippingPlanes)&&R.clippingPlanes.length!==0||R.displacementMap&&R.displacementScale!==0||R.alphaMap&&R.alphaTest>0||R.map&&R.alphaTest>0||R.alphaToCoverage===!0){let F=M.uuid,V=R.uuid,$=c[F];$===void 0&&($={},c[F]=$);let L=$[V];L===void 0&&(L=M.clone(),$[V]=L,R.addEventListener("dispose",T)),M=L}if(M.visible=R.visible,M.wireframe=R.wireframe,S===Hn?M.side=R.shadowSide!==null?R.shadowSide:R.side:M.side=R.shadowSide!==null?R.shadowSide:h[R.side],M.alphaMap=R.alphaMap,M.alphaTest=R.alphaToCoverage===!0?.5:R.alphaTest,M.map=R.map,M.clipShadows=R.clipShadows,M.clippingPlanes=R.clippingPlanes,M.clipIntersection=R.clipIntersection,M.displacementMap=R.displacementMap,M.displacementScale=R.displacementScale,M.displacementBias=R.displacementBias,M.wireframeLinewidth=R.wireframeLinewidth,M.linewidth=R.linewidth,I.isPointLight===!0&&M.isMeshDistanceMaterial===!0){let F=i.properties.get(M);F.light=I}return M}function _(w,R,I,S,M){if(w.visible===!1)return;if(w.layers.test(R.layers)&&(w.isMesh||w.isLine||w.isPoints)&&(w.castShadow||w.receiveShadow&&M===Hn)&&(!w.frustumCulled||n.intersectsObject(w))){w.modelViewMatrix.multiplyMatrices(I.matrixWorldInverse,w.matrixWorld);let V=e.update(w),$=w.material;if(Array.isArray($)){let L=V.groups;for(let H=0,N=L.length;H<N;H++){let k=L[H],Q=$[k.materialIndex];if(Q&&Q.visible){let le=v(w,Q,S,M);w.onBeforeShadow(i,w,R,I,V,le,k),i.renderBufferDirect(I,null,V,le,w,k),w.onAfterShadow(i,w,R,I,V,le,k)}}}else if($.visible){let L=v(w,$,S,M);w.onBeforeShadow(i,w,R,I,V,L,null),i.renderBufferDirect(I,null,V,L,w,null),w.onAfterShadow(i,w,R,I,V,L,null)}}let F=w.children;for(let V=0,$=F.length;V<$;V++)_(F[V],R,I,S,M)}function T(w){w.target.removeEventListener("dispose",T);for(let I in c){let S=c[I],M=w.target.uuid;M in S&&(S[M].dispose(),delete S[M])}}}var sx={[Uo]:No,[Fo]:zo,[Oo]:ko,[Zi]:Bo,[No]:Uo,[zo]:Fo,[ko]:Oo,[Bo]:Zi};function rx(i,e){function t(){let U=!1,oe=new mt,de=null,be=new mt(0,0,0,0);return{setMask:function(re){de!==re&&!U&&(i.colorMask(re,re,re,re),de=re)},setLocked:function(re){U=re},setClear:function(re,j,Ce,Ve,ft){ft===!0&&(re*=Ve,j*=Ve,Ce*=Ve),oe.set(re,j,Ce,Ve),be.equals(oe)===!1&&(i.clearColor(re,j,Ce,Ve),be.copy(oe))},reset:function(){U=!1,de=null,be.set(-1,0,0,0)}}}function n(){let U=!1,oe=!1,de=null,be=null,re=null;return{setReversed:function(j){if(oe!==j){let Ce=e.get("EXT_clip_control");j?Ce.clipControlEXT(Ce.LOWER_LEFT_EXT,Ce.ZERO_TO_ONE_EXT):Ce.clipControlEXT(Ce.LOWER_LEFT_EXT,Ce.NEGATIVE_ONE_TO_ONE_EXT),oe=j;let Ve=re;re=null,this.setClear(Ve)}},getReversed:function(){return oe},setTest:function(j){j?ne(i.DEPTH_TEST):Se(i.DEPTH_TEST)},setMask:function(j){de!==j&&!U&&(i.depthMask(j),de=j)},setFunc:function(j){if(oe&&(j=sx[j]),be!==j){switch(j){case Uo:i.depthFunc(i.NEVER);break;case No:i.depthFunc(i.ALWAYS);break;case Fo:i.depthFunc(i.LESS);break;case Zi:i.depthFunc(i.LEQUAL);break;case Oo:i.depthFunc(i.EQUAL);break;case Bo:i.depthFunc(i.GEQUAL);break;case zo:i.depthFunc(i.GREATER);break;case ko:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}be=j}},setLocked:function(j){U=j},setClear:function(j){re!==j&&(oe&&(j=1-j),i.clearDepth(j),re=j)},reset:function(){U=!1,de=null,be=null,re=null,oe=!1}}}function s(){let U=!1,oe=null,de=null,be=null,re=null,j=null,Ce=null,Ve=null,ft=null;return{setTest:function(rt){U||(rt?ne(i.STENCIL_TEST):Se(i.STENCIL_TEST))},setMask:function(rt){oe!==rt&&!U&&(i.stencilMask(rt),oe=rt)},setFunc:function(rt,Xn,Nn){(de!==rt||be!==Xn||re!==Nn)&&(i.stencilFunc(rt,Xn,Nn),de=rt,be=Xn,re=Nn)},setOp:function(rt,Xn,Nn){(j!==rt||Ce!==Xn||Ve!==Nn)&&(i.stencilOp(rt,Xn,Nn),j=rt,Ce=Xn,Ve=Nn)},setLocked:function(rt){U=rt},setClear:function(rt){ft!==rt&&(i.clearStencil(rt),ft=rt)},reset:function(){U=!1,oe=null,de=null,be=null,re=null,j=null,Ce=null,Ve=null,ft=null}}}let r=new t,a=new n,o=new s,l=new WeakMap,c=new WeakMap,u={},h={},f=new WeakMap,d=[],p=null,y=!1,g=null,m=null,E=null,v=null,_=null,T=null,w=null,R=new ke(0,0,0),I=0,S=!1,M=null,P=null,F=null,V=null,$=null,L=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS),H=!1,N=0,k=i.getParameter(i.VERSION);k.indexOf("WebGL")!==-1?(N=parseFloat(/^WebGL (\d)/.exec(k)[1]),H=N>=1):k.indexOf("OpenGL ES")!==-1&&(N=parseFloat(/^OpenGL ES (\d)/.exec(k)[1]),H=N>=2);let Q=null,le={},ye=i.getParameter(i.SCISSOR_BOX),Ne=i.getParameter(i.VIEWPORT),Xe=new mt().fromArray(ye),et=new mt().fromArray(Ne);function Ke(U,oe,de,be){let re=new Uint8Array(4),j=i.createTexture();i.bindTexture(U,j),i.texParameteri(U,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(U,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Ce=0;Ce<de;Ce++)U===i.TEXTURE_3D||U===i.TEXTURE_2D_ARRAY?i.texImage3D(oe,0,i.RGBA,1,1,be,0,i.RGBA,i.UNSIGNED_BYTE,re):i.texImage2D(oe+Ce,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,re);return j}let Y={};Y[i.TEXTURE_2D]=Ke(i.TEXTURE_2D,i.TEXTURE_2D,1),Y[i.TEXTURE_CUBE_MAP]=Ke(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),Y[i.TEXTURE_2D_ARRAY]=Ke(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),Y[i.TEXTURE_3D]=Ke(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),ne(i.DEPTH_TEST),a.setFunc(Zi),J(!1),Z(Oc),ne(i.CULL_FACE),te(ri);function ne(U){u[U]!==!0&&(i.enable(U),u[U]=!0)}function Se(U){u[U]!==!1&&(i.disable(U),u[U]=!1)}function Le(U,oe){return h[U]!==oe?(i.bindFramebuffer(U,oe),h[U]=oe,U===i.DRAW_FRAMEBUFFER&&(h[i.FRAMEBUFFER]=oe),U===i.FRAMEBUFFER&&(h[i.DRAW_FRAMEBUFFER]=oe),!0):!1}function Te(U,oe){let de=d,be=!1;if(U){de=f.get(oe),de===void 0&&(de=[],f.set(oe,de));let re=U.textures;if(de.length!==re.length||de[0]!==i.COLOR_ATTACHMENT0){for(let j=0,Ce=re.length;j<Ce;j++)de[j]=i.COLOR_ATTACHMENT0+j;de.length=re.length,be=!0}}else de[0]!==i.BACK&&(de[0]=i.BACK,be=!0);be&&i.drawBuffers(de)}function je(U){return p!==U?(i.useProgram(U),p=U,!0):!1}let dt={[Si]:i.FUNC_ADD,[Xu]:i.FUNC_SUBTRACT,[$u]:i.FUNC_REVERSE_SUBTRACT};dt[qu]=i.MIN,dt[Yu]=i.MAX;let C={[Zu]:i.ZERO,[Ju]:i.ONE,[Ku]:i.SRC_COLOR,[ro]:i.SRC_ALPHA,[id]:i.SRC_ALPHA_SATURATE,[td]:i.DST_COLOR,[Qu]:i.DST_ALPHA,[ju]:i.ONE_MINUS_SRC_COLOR,[ao]:i.ONE_MINUS_SRC_ALPHA,[nd]:i.ONE_MINUS_DST_COLOR,[ed]:i.ONE_MINUS_DST_ALPHA,[sd]:i.CONSTANT_COLOR,[rd]:i.ONE_MINUS_CONSTANT_COLOR,[ad]:i.CONSTANT_ALPHA,[od]:i.ONE_MINUS_CONSTANT_ALPHA};function te(U,oe,de,be,re,j,Ce,Ve,ft,rt){if(U===ri){y===!0&&(Se(i.BLEND),y=!1);return}if(y===!1&&(ne(i.BLEND),y=!0),U!==Wu){if(U!==g||rt!==S){if((m!==Si||_!==Si)&&(i.blendEquation(i.FUNC_ADD),m=Si,_=Si),rt)switch(U){case Yi:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case zc:i.blendFunc(i.ONE,i.ONE);break;case kc:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Hc:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:console.error("THREE.WebGLState: Invalid blending: ",U);break}else switch(U){case Yi:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case zc:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case kc:console.error("THREE.WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Hc:console.error("THREE.WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:console.error("THREE.WebGLState: Invalid blending: ",U);break}E=null,v=null,T=null,w=null,R.set(0,0,0),I=0,g=U,S=rt}return}re=re||oe,j=j||de,Ce=Ce||be,(oe!==m||re!==_)&&(i.blendEquationSeparate(dt[oe],dt[re]),m=oe,_=re),(de!==E||be!==v||j!==T||Ce!==w)&&(i.blendFuncSeparate(C[de],C[be],C[j],C[Ce]),E=de,v=be,T=j,w=Ce),(Ve.equals(R)===!1||ft!==I)&&(i.blendColor(Ve.r,Ve.g,Ve.b,ft),R.copy(Ve),I=ft),g=U,S=!1}function K(U,oe){U.side===xn?Se(i.CULL_FACE):ne(i.CULL_FACE);let de=U.side===zt;oe&&(de=!de),J(de),U.blending===Yi&&U.transparent===!1?te(ri):te(U.blending,U.blendEquation,U.blendSrc,U.blendDst,U.blendEquationAlpha,U.blendSrcAlpha,U.blendDstAlpha,U.blendColor,U.blendAlpha,U.premultipliedAlpha),a.setFunc(U.depthFunc),a.setTest(U.depthTest),a.setMask(U.depthWrite),r.setMask(U.colorWrite);let be=U.stencilWrite;o.setTest(be),be&&(o.setMask(U.stencilWriteMask),o.setFunc(U.stencilFunc,U.stencilRef,U.stencilFuncMask),o.setOp(U.stencilFail,U.stencilZFail,U.stencilZPass)),ie(U.polygonOffset,U.polygonOffsetFactor,U.polygonOffsetUnits),U.alphaToCoverage===!0?ne(i.SAMPLE_ALPHA_TO_COVERAGE):Se(i.SAMPLE_ALPHA_TO_COVERAGE)}function J(U){M!==U&&(U?i.frontFace(i.CW):i.frontFace(i.CCW),M=U)}function Z(U){U!==Vu?(ne(i.CULL_FACE),U!==P&&(U===Oc?i.cullFace(i.BACK):U===Gu?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):Se(i.CULL_FACE),P=U}function he(U){U!==F&&(H&&i.lineWidth(U),F=U)}function ie(U,oe,de){U?(ne(i.POLYGON_OFFSET_FILL),(V!==oe||$!==de)&&(i.polygonOffset(oe,de),V=oe,$=de)):Se(i.POLYGON_OFFSET_FILL)}function ue(U){U?ne(i.SCISSOR_TEST):Se(i.SCISSOR_TEST)}function He(U){U===void 0&&(U=i.TEXTURE0+L-1),Q!==U&&(i.activeTexture(U),Q=U)}function ze(U,oe,de){de===void 0&&(Q===null?de=i.TEXTURE0+L-1:de=Q);let be=le[de];be===void 0&&(be={type:void 0,texture:void 0},le[de]=be),(be.type!==U||be.texture!==oe)&&(Q!==de&&(i.activeTexture(de),Q=de),i.bindTexture(U,oe||Y[U]),be.type=U,be.texture=oe)}function A(){let U=le[Q];U!==void 0&&U.type!==void 0&&(i.bindTexture(U.type,null),U.type=void 0,U.texture=void 0)}function x(){try{i.compressedTexImage2D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function z(){try{i.compressedTexImage3D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function X(){try{i.texSubImage2D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function ee(){try{i.texSubImage3D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function q(){try{i.compressedTexSubImage2D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Ie(){try{i.compressedTexSubImage3D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function ce(){try{i.texStorage2D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Ae(){try{i.texStorage3D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Re(){try{i.texImage2D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function se(){try{i.texImage3D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function xe(U){Xe.equals(U)===!1&&(i.scissor(U.x,U.y,U.z,U.w),Xe.copy(U))}function Oe(U){et.equals(U)===!1&&(i.viewport(U.x,U.y,U.z,U.w),et.copy(U))}function Pe(U,oe){let de=c.get(oe);de===void 0&&(de=new WeakMap,c.set(oe,de));let be=de.get(U);be===void 0&&(be=i.getUniformBlockIndex(oe,U.name),de.set(U,be))}function ge(U,oe){let be=c.get(oe).get(U);l.get(oe)!==be&&(i.uniformBlockBinding(oe,be,U.__bindingPointIndex),l.set(oe,be))}function $e(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),a.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),u={},Q=null,le={},h={},f=new WeakMap,d=[],p=null,y=!1,g=null,m=null,E=null,v=null,_=null,T=null,w=null,R=new ke(0,0,0),I=0,S=!1,M=null,P=null,F=null,V=null,$=null,Xe.set(0,0,i.canvas.width,i.canvas.height),et.set(0,0,i.canvas.width,i.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:ne,disable:Se,bindFramebuffer:Le,drawBuffers:Te,useProgram:je,setBlending:te,setMaterial:K,setFlipSided:J,setCullFace:Z,setLineWidth:he,setPolygonOffset:ie,setScissorTest:ue,activeTexture:He,bindTexture:ze,unbindTexture:A,compressedTexImage2D:x,compressedTexImage3D:z,texImage2D:Re,texImage3D:se,updateUBOMapping:Pe,uniformBlockBinding:ge,texStorage2D:ce,texStorage3D:Ae,texSubImage2D:X,texSubImage3D:ee,compressedTexSubImage2D:q,compressedTexSubImage3D:Ie,scissor:xe,viewport:Oe,reset:$e}}function ax(i,e,t,n,s,r,a){let o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new fe,u=new WeakMap,h,f=new WeakMap,d=!1;try{d=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function p(A,x){return d?new OffscreenCanvas(A,x):Pr("canvas")}function y(A,x,z){let X=1,ee=ze(A);if((ee.width>z||ee.height>z)&&(X=z/Math.max(ee.width,ee.height)),X<1)if(typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&A instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&A instanceof ImageBitmap||typeof VideoFrame<"u"&&A instanceof VideoFrame){let q=Math.floor(X*ee.width),Ie=Math.floor(X*ee.height);h===void 0&&(h=p(q,Ie));let ce=x?p(q,Ie):h;return ce.width=q,ce.height=Ie,ce.getContext("2d").drawImage(A,0,0,q,Ie),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+ee.width+"x"+ee.height+") to ("+q+"x"+Ie+")."),ce}else return"data"in A&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+ee.width+"x"+ee.height+")."),A;return A}function g(A){return A.generateMipmaps}function m(A){i.generateMipmap(A)}function E(A){return A.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:A.isWebGL3DRenderTarget?i.TEXTURE_3D:A.isWebGLArrayRenderTarget||A.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function v(A,x,z,X,ee=!1){if(A!==null){if(i[A]!==void 0)return i[A];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+A+"'")}let q=x;if(x===i.RED&&(z===i.FLOAT&&(q=i.R32F),z===i.HALF_FLOAT&&(q=i.R16F),z===i.UNSIGNED_BYTE&&(q=i.R8)),x===i.RED_INTEGER&&(z===i.UNSIGNED_BYTE&&(q=i.R8UI),z===i.UNSIGNED_SHORT&&(q=i.R16UI),z===i.UNSIGNED_INT&&(q=i.R32UI),z===i.BYTE&&(q=i.R8I),z===i.SHORT&&(q=i.R16I),z===i.INT&&(q=i.R32I)),x===i.RG&&(z===i.FLOAT&&(q=i.RG32F),z===i.HALF_FLOAT&&(q=i.RG16F),z===i.UNSIGNED_BYTE&&(q=i.RG8)),x===i.RG_INTEGER&&(z===i.UNSIGNED_BYTE&&(q=i.RG8UI),z===i.UNSIGNED_SHORT&&(q=i.RG16UI),z===i.UNSIGNED_INT&&(q=i.RG32UI),z===i.BYTE&&(q=i.RG8I),z===i.SHORT&&(q=i.RG16I),z===i.INT&&(q=i.RG32I)),x===i.RGB_INTEGER&&(z===i.UNSIGNED_BYTE&&(q=i.RGB8UI),z===i.UNSIGNED_SHORT&&(q=i.RGB16UI),z===i.UNSIGNED_INT&&(q=i.RGB32UI),z===i.BYTE&&(q=i.RGB8I),z===i.SHORT&&(q=i.RGB16I),z===i.INT&&(q=i.RGB32I)),x===i.RGBA_INTEGER&&(z===i.UNSIGNED_BYTE&&(q=i.RGBA8UI),z===i.UNSIGNED_SHORT&&(q=i.RGBA16UI),z===i.UNSIGNED_INT&&(q=i.RGBA32UI),z===i.BYTE&&(q=i.RGBA8I),z===i.SHORT&&(q=i.RGBA16I),z===i.INT&&(q=i.RGBA32I)),x===i.RGB&&(z===i.UNSIGNED_INT_5_9_9_9_REV&&(q=i.RGB9_E5),z===i.UNSIGNED_INT_10F_11F_11F_REV&&(q=i.R11F_G11F_B10F)),x===i.RGBA){let Ie=ee?Cr:it.getTransfer(X);z===i.FLOAT&&(q=i.RGBA32F),z===i.HALF_FLOAT&&(q=i.RGBA16F),z===i.UNSIGNED_BYTE&&(q=Ie===at?i.SRGB8_ALPHA8:i.RGBA8),z===i.UNSIGNED_SHORT_4_4_4_4&&(q=i.RGBA4),z===i.UNSIGNED_SHORT_5_5_5_1&&(q=i.RGB5_A1)}return(q===i.R16F||q===i.R32F||q===i.RG16F||q===i.RG32F||q===i.RGBA16F||q===i.RGBA32F)&&e.get("EXT_color_buffer_float"),q}function _(A,x){let z;return A?x===null||x===Ai||x===Ks?z=i.DEPTH24_STENCIL8:x===vn?z=i.DEPTH32F_STENCIL8:x===Zs&&(z=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):x===null||x===Ai||x===Ks?z=i.DEPTH_COMPONENT24:x===vn?z=i.DEPTH_COMPONENT32F:x===Zs&&(z=i.DEPTH_COMPONENT16),z}function T(A,x){return g(A)===!0||A.isFramebufferTexture&&A.minFilter!==jt&&A.minFilter!==An?Math.log2(Math.max(x.width,x.height))+1:A.mipmaps!==void 0&&A.mipmaps.length>0?A.mipmaps.length:A.isCompressedTexture&&Array.isArray(A.image)?x.mipmaps.length:1}function w(A){let x=A.target;x.removeEventListener("dispose",w),I(x),x.isVideoTexture&&u.delete(x)}function R(A){let x=A.target;x.removeEventListener("dispose",R),M(x)}function I(A){let x=n.get(A);if(x.__webglInit===void 0)return;let z=A.source,X=f.get(z);if(X){let ee=X[x.__cacheKey];ee.usedTimes--,ee.usedTimes===0&&S(A),Object.keys(X).length===0&&f.delete(z)}n.remove(A)}function S(A){let x=n.get(A);i.deleteTexture(x.__webglTexture);let z=A.source,X=f.get(z);delete X[x.__cacheKey],a.memory.textures--}function M(A){let x=n.get(A);if(A.depthTexture&&(A.depthTexture.dispose(),n.remove(A.depthTexture)),A.isWebGLCubeRenderTarget)for(let X=0;X<6;X++){if(Array.isArray(x.__webglFramebuffer[X]))for(let ee=0;ee<x.__webglFramebuffer[X].length;ee++)i.deleteFramebuffer(x.__webglFramebuffer[X][ee]);else i.deleteFramebuffer(x.__webglFramebuffer[X]);x.__webglDepthbuffer&&i.deleteRenderbuffer(x.__webglDepthbuffer[X])}else{if(Array.isArray(x.__webglFramebuffer))for(let X=0;X<x.__webglFramebuffer.length;X++)i.deleteFramebuffer(x.__webglFramebuffer[X]);else i.deleteFramebuffer(x.__webglFramebuffer);if(x.__webglDepthbuffer&&i.deleteRenderbuffer(x.__webglDepthbuffer),x.__webglMultisampledFramebuffer&&i.deleteFramebuffer(x.__webglMultisampledFramebuffer),x.__webglColorRenderbuffer)for(let X=0;X<x.__webglColorRenderbuffer.length;X++)x.__webglColorRenderbuffer[X]&&i.deleteRenderbuffer(x.__webglColorRenderbuffer[X]);x.__webglDepthRenderbuffer&&i.deleteRenderbuffer(x.__webglDepthRenderbuffer)}let z=A.textures;for(let X=0,ee=z.length;X<ee;X++){let q=n.get(z[X]);q.__webglTexture&&(i.deleteTexture(q.__webglTexture),a.memory.textures--),n.remove(z[X])}n.remove(A)}let P=0;function F(){P=0}function V(){let A=P;return A>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+A+" texture units while this GPU supports only "+s.maxTextures),P+=1,A}function $(A){let x=[];return x.push(A.wrapS),x.push(A.wrapT),x.push(A.wrapR||0),x.push(A.magFilter),x.push(A.minFilter),x.push(A.anisotropy),x.push(A.internalFormat),x.push(A.format),x.push(A.type),x.push(A.generateMipmaps),x.push(A.premultiplyAlpha),x.push(A.flipY),x.push(A.unpackAlignment),x.push(A.colorSpace),x.join()}function L(A,x){let z=n.get(A);if(A.isVideoTexture&&ue(A),A.isRenderTargetTexture===!1&&A.isExternalTexture!==!0&&A.version>0&&z.__version!==A.version){let X=A.image;if(X===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(X.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{Y(z,A,x);return}}else A.isExternalTexture&&(z.__webglTexture=A.sourceTexture?A.sourceTexture:null);t.bindTexture(i.TEXTURE_2D,z.__webglTexture,i.TEXTURE0+x)}function H(A,x){let z=n.get(A);if(A.isRenderTargetTexture===!1&&A.version>0&&z.__version!==A.version){Y(z,A,x);return}t.bindTexture(i.TEXTURE_2D_ARRAY,z.__webglTexture,i.TEXTURE0+x)}function N(A,x){let z=n.get(A);if(A.isRenderTargetTexture===!1&&A.version>0&&z.__version!==A.version){Y(z,A,x);return}t.bindTexture(i.TEXTURE_3D,z.__webglTexture,i.TEXTURE0+x)}function k(A,x){let z=n.get(A);if(A.version>0&&z.__version!==A.version){ne(z,A,x);return}t.bindTexture(i.TEXTURE_CUBE_MAP,z.__webglTexture,i.TEXTURE0+x)}let Q={[oo]:i.REPEAT,[Mi]:i.CLAMP_TO_EDGE,[lo]:i.MIRRORED_REPEAT},le={[jt]:i.NEAREST,[yd]:i.NEAREST_MIPMAP_NEAREST,[pa]:i.NEAREST_MIPMAP_LINEAR,[An]:i.LINEAR,[Wo]:i.LINEAR_MIPMAP_NEAREST,[Ti]:i.LINEAR_MIPMAP_LINEAR},ye={[Ed]:i.NEVER,[Id]:i.ALWAYS,[wd]:i.LESS,[jc]:i.LEQUAL,[Td]:i.EQUAL,[Cd]:i.GEQUAL,[Ad]:i.GREATER,[Rd]:i.NOTEQUAL};function Ne(A,x){if(x.type===vn&&e.has("OES_texture_float_linear")===!1&&(x.magFilter===An||x.magFilter===Wo||x.magFilter===pa||x.magFilter===Ti||x.minFilter===An||x.minFilter===Wo||x.minFilter===pa||x.minFilter===Ti)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(A,i.TEXTURE_WRAP_S,Q[x.wrapS]),i.texParameteri(A,i.TEXTURE_WRAP_T,Q[x.wrapT]),(A===i.TEXTURE_3D||A===i.TEXTURE_2D_ARRAY)&&i.texParameteri(A,i.TEXTURE_WRAP_R,Q[x.wrapR]),i.texParameteri(A,i.TEXTURE_MAG_FILTER,le[x.magFilter]),i.texParameteri(A,i.TEXTURE_MIN_FILTER,le[x.minFilter]),x.compareFunction&&(i.texParameteri(A,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(A,i.TEXTURE_COMPARE_FUNC,ye[x.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(x.magFilter===jt||x.minFilter!==pa&&x.minFilter!==Ti||x.type===vn&&e.has("OES_texture_float_linear")===!1)return;if(x.anisotropy>1||n.get(x).__currentAnisotropy){let z=e.get("EXT_texture_filter_anisotropic");i.texParameterf(A,z.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(x.anisotropy,s.getMaxAnisotropy())),n.get(x).__currentAnisotropy=x.anisotropy}}}function Xe(A,x){let z=!1;A.__webglInit===void 0&&(A.__webglInit=!0,x.addEventListener("dispose",w));let X=x.source,ee=f.get(X);ee===void 0&&(ee={},f.set(X,ee));let q=$(x);if(q!==A.__cacheKey){ee[q]===void 0&&(ee[q]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,z=!0),ee[q].usedTimes++;let Ie=ee[A.__cacheKey];Ie!==void 0&&(ee[A.__cacheKey].usedTimes--,Ie.usedTimes===0&&S(x)),A.__cacheKey=q,A.__webglTexture=ee[q].texture}return z}function et(A,x,z){return Math.floor(Math.floor(A/z)/x)}function Ke(A,x,z,X){let q=A.updateRanges;if(q.length===0)t.texSubImage2D(i.TEXTURE_2D,0,0,0,x.width,x.height,z,X,x.data);else{q.sort((se,xe)=>se.start-xe.start);let Ie=0;for(let se=1;se<q.length;se++){let xe=q[Ie],Oe=q[se],Pe=xe.start+xe.count,ge=et(Oe.start,x.width,4),$e=et(xe.start,x.width,4);Oe.start<=Pe+1&&ge===$e&&et(Oe.start+Oe.count-1,x.width,4)===ge?xe.count=Math.max(xe.count,Oe.start+Oe.count-xe.start):(++Ie,q[Ie]=Oe)}q.length=Ie+1;let ce=i.getParameter(i.UNPACK_ROW_LENGTH),Ae=i.getParameter(i.UNPACK_SKIP_PIXELS),Re=i.getParameter(i.UNPACK_SKIP_ROWS);i.pixelStorei(i.UNPACK_ROW_LENGTH,x.width);for(let se=0,xe=q.length;se<xe;se++){let Oe=q[se],Pe=Math.floor(Oe.start/4),ge=Math.ceil(Oe.count/4),$e=Pe%x.width,U=Math.floor(Pe/x.width),oe=ge,de=1;i.pixelStorei(i.UNPACK_SKIP_PIXELS,$e),i.pixelStorei(i.UNPACK_SKIP_ROWS,U),t.texSubImage2D(i.TEXTURE_2D,0,$e,U,oe,de,z,X,x.data)}A.clearUpdateRanges(),i.pixelStorei(i.UNPACK_ROW_LENGTH,ce),i.pixelStorei(i.UNPACK_SKIP_PIXELS,Ae),i.pixelStorei(i.UNPACK_SKIP_ROWS,Re)}}function Y(A,x,z){let X=i.TEXTURE_2D;(x.isDataArrayTexture||x.isCompressedArrayTexture)&&(X=i.TEXTURE_2D_ARRAY),x.isData3DTexture&&(X=i.TEXTURE_3D);let ee=Xe(A,x),q=x.source;t.bindTexture(X,A.__webglTexture,i.TEXTURE0+z);let Ie=n.get(q);if(q.version!==Ie.__version||ee===!0){t.activeTexture(i.TEXTURE0+z);let ce=it.getPrimaries(it.workingColorSpace),Ae=x.colorSpace===oi?null:it.getPrimaries(x.colorSpace),Re=x.colorSpace===oi||ce===Ae?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,x.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,x.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Re);let se=y(x.image,!1,s.maxTextureSize);se=He(x,se);let xe=r.convert(x.format,x.colorSpace),Oe=r.convert(x.type),Pe=v(x.internalFormat,xe,Oe,x.colorSpace,x.isVideoTexture);Ne(X,x);let ge,$e=x.mipmaps,U=x.isVideoTexture!==!0,oe=Ie.__version===void 0||ee===!0,de=q.dataReady,be=T(x,se);if(x.isDepthTexture)Pe=_(x.format===js,x.type),oe&&(U?t.texStorage2D(i.TEXTURE_2D,1,Pe,se.width,se.height):t.texImage2D(i.TEXTURE_2D,0,Pe,se.width,se.height,0,xe,Oe,null));else if(x.isDataTexture)if($e.length>0){U&&oe&&t.texStorage2D(i.TEXTURE_2D,be,Pe,$e[0].width,$e[0].height);for(let re=0,j=$e.length;re<j;re++)ge=$e[re],U?de&&t.texSubImage2D(i.TEXTURE_2D,re,0,0,ge.width,ge.height,xe,Oe,ge.data):t.texImage2D(i.TEXTURE_2D,re,Pe,ge.width,ge.height,0,xe,Oe,ge.data);x.generateMipmaps=!1}else U?(oe&&t.texStorage2D(i.TEXTURE_2D,be,Pe,se.width,se.height),de&&Ke(x,se,xe,Oe)):t.texImage2D(i.TEXTURE_2D,0,Pe,se.width,se.height,0,xe,Oe,se.data);else if(x.isCompressedTexture)if(x.isCompressedArrayTexture){U&&oe&&t.texStorage3D(i.TEXTURE_2D_ARRAY,be,Pe,$e[0].width,$e[0].height,se.depth);for(let re=0,j=$e.length;re<j;re++)if(ge=$e[re],x.format!==mn)if(xe!==null)if(U){if(de)if(x.layerUpdates.size>0){let Ce=ah(ge.width,ge.height,x.format,x.type);for(let Ve of x.layerUpdates){let ft=ge.data.subarray(Ve*Ce/ge.data.BYTES_PER_ELEMENT,(Ve+1)*Ce/ge.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,re,0,0,Ve,ge.width,ge.height,1,xe,ft)}x.clearLayerUpdates()}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,re,0,0,0,ge.width,ge.height,se.depth,xe,ge.data)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,re,Pe,ge.width,ge.height,se.depth,0,ge.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else U?de&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,re,0,0,0,ge.width,ge.height,se.depth,xe,Oe,ge.data):t.texImage3D(i.TEXTURE_2D_ARRAY,re,Pe,ge.width,ge.height,se.depth,0,xe,Oe,ge.data)}else{U&&oe&&t.texStorage2D(i.TEXTURE_2D,be,Pe,$e[0].width,$e[0].height);for(let re=0,j=$e.length;re<j;re++)ge=$e[re],x.format!==mn?xe!==null?U?de&&t.compressedTexSubImage2D(i.TEXTURE_2D,re,0,0,ge.width,ge.height,xe,ge.data):t.compressedTexImage2D(i.TEXTURE_2D,re,Pe,ge.width,ge.height,0,ge.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):U?de&&t.texSubImage2D(i.TEXTURE_2D,re,0,0,ge.width,ge.height,xe,Oe,ge.data):t.texImage2D(i.TEXTURE_2D,re,Pe,ge.width,ge.height,0,xe,Oe,ge.data)}else if(x.isDataArrayTexture)if(U){if(oe&&t.texStorage3D(i.TEXTURE_2D_ARRAY,be,Pe,se.width,se.height,se.depth),de)if(x.layerUpdates.size>0){let re=ah(se.width,se.height,x.format,x.type);for(let j of x.layerUpdates){let Ce=se.data.subarray(j*re/se.data.BYTES_PER_ELEMENT,(j+1)*re/se.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,j,se.width,se.height,1,xe,Oe,Ce)}x.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,se.width,se.height,se.depth,xe,Oe,se.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,Pe,se.width,se.height,se.depth,0,xe,Oe,se.data);else if(x.isData3DTexture)U?(oe&&t.texStorage3D(i.TEXTURE_3D,be,Pe,se.width,se.height,se.depth),de&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,se.width,se.height,se.depth,xe,Oe,se.data)):t.texImage3D(i.TEXTURE_3D,0,Pe,se.width,se.height,se.depth,0,xe,Oe,se.data);else if(x.isFramebufferTexture){if(oe)if(U)t.texStorage2D(i.TEXTURE_2D,be,Pe,se.width,se.height);else{let re=se.width,j=se.height;for(let Ce=0;Ce<be;Ce++)t.texImage2D(i.TEXTURE_2D,Ce,Pe,re,j,0,xe,Oe,null),re>>=1,j>>=1}}else if($e.length>0){if(U&&oe){let re=ze($e[0]);t.texStorage2D(i.TEXTURE_2D,be,Pe,re.width,re.height)}for(let re=0,j=$e.length;re<j;re++)ge=$e[re],U?de&&t.texSubImage2D(i.TEXTURE_2D,re,0,0,xe,Oe,ge):t.texImage2D(i.TEXTURE_2D,re,Pe,xe,Oe,ge);x.generateMipmaps=!1}else if(U){if(oe){let re=ze(se);t.texStorage2D(i.TEXTURE_2D,be,Pe,re.width,re.height)}de&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,xe,Oe,se)}else t.texImage2D(i.TEXTURE_2D,0,Pe,xe,Oe,se);g(x)&&m(X),Ie.__version=q.version,x.onUpdate&&x.onUpdate(x)}A.__version=x.version}function ne(A,x,z){if(x.image.length!==6)return;let X=Xe(A,x),ee=x.source;t.bindTexture(i.TEXTURE_CUBE_MAP,A.__webglTexture,i.TEXTURE0+z);let q=n.get(ee);if(ee.version!==q.__version||X===!0){t.activeTexture(i.TEXTURE0+z);let Ie=it.getPrimaries(it.workingColorSpace),ce=x.colorSpace===oi?null:it.getPrimaries(x.colorSpace),Ae=x.colorSpace===oi||Ie===ce?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,x.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,x.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ae);let Re=x.isCompressedTexture||x.image[0].isCompressedTexture,se=x.image[0]&&x.image[0].isDataTexture,xe=[];for(let j=0;j<6;j++)!Re&&!se?xe[j]=y(x.image[j],!0,s.maxCubemapSize):xe[j]=se?x.image[j].image:x.image[j],xe[j]=He(x,xe[j]);let Oe=xe[0],Pe=r.convert(x.format,x.colorSpace),ge=r.convert(x.type),$e=v(x.internalFormat,Pe,ge,x.colorSpace),U=x.isVideoTexture!==!0,oe=q.__version===void 0||X===!0,de=ee.dataReady,be=T(x,Oe);Ne(i.TEXTURE_CUBE_MAP,x);let re;if(Re){U&&oe&&t.texStorage2D(i.TEXTURE_CUBE_MAP,be,$e,Oe.width,Oe.height);for(let j=0;j<6;j++){re=xe[j].mipmaps;for(let Ce=0;Ce<re.length;Ce++){let Ve=re[Ce];x.format!==mn?Pe!==null?U?de&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,Ce,0,0,Ve.width,Ve.height,Pe,Ve.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,Ce,$e,Ve.width,Ve.height,0,Ve.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):U?de&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,Ce,0,0,Ve.width,Ve.height,Pe,ge,Ve.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,Ce,$e,Ve.width,Ve.height,0,Pe,ge,Ve.data)}}}else{if(re=x.mipmaps,U&&oe){re.length>0&&be++;let j=ze(xe[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,be,$e,j.width,j.height)}for(let j=0;j<6;j++)if(se){U?de&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,0,0,xe[j].width,xe[j].height,Pe,ge,xe[j].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,$e,xe[j].width,xe[j].height,0,Pe,ge,xe[j].data);for(let Ce=0;Ce<re.length;Ce++){let ft=re[Ce].image[j].image;U?de&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,Ce+1,0,0,ft.width,ft.height,Pe,ge,ft.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,Ce+1,$e,ft.width,ft.height,0,Pe,ge,ft.data)}}else{U?de&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,0,0,Pe,ge,xe[j]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,$e,Pe,ge,xe[j]);for(let Ce=0;Ce<re.length;Ce++){let Ve=re[Ce];U?de&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,Ce+1,0,0,Pe,ge,Ve.image[j]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,Ce+1,$e,Pe,ge,Ve.image[j])}}}g(x)&&m(i.TEXTURE_CUBE_MAP),q.__version=ee.version,x.onUpdate&&x.onUpdate(x)}A.__version=x.version}function Se(A,x,z,X,ee,q){let Ie=r.convert(z.format,z.colorSpace),ce=r.convert(z.type),Ae=v(z.internalFormat,Ie,ce,z.colorSpace),Re=n.get(x),se=n.get(z);if(se.__renderTarget=x,!Re.__hasExternalTextures){let xe=Math.max(1,x.width>>q),Oe=Math.max(1,x.height>>q);ee===i.TEXTURE_3D||ee===i.TEXTURE_2D_ARRAY?t.texImage3D(ee,q,Ae,xe,Oe,x.depth,0,Ie,ce,null):t.texImage2D(ee,q,Ae,xe,Oe,0,Ie,ce,null)}t.bindFramebuffer(i.FRAMEBUFFER,A),ie(x)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,X,ee,se.__webglTexture,0,he(x)):(ee===i.TEXTURE_2D||ee>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&ee<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,X,ee,se.__webglTexture,q),t.bindFramebuffer(i.FRAMEBUFFER,null)}function Le(A,x,z){if(i.bindRenderbuffer(i.RENDERBUFFER,A),x.depthBuffer){let X=x.depthTexture,ee=X&&X.isDepthTexture?X.type:null,q=_(x.stencilBuffer,ee),Ie=x.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ce=he(x);ie(x)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,ce,q,x.width,x.height):z?i.renderbufferStorageMultisample(i.RENDERBUFFER,ce,q,x.width,x.height):i.renderbufferStorage(i.RENDERBUFFER,q,x.width,x.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,Ie,i.RENDERBUFFER,A)}else{let X=x.textures;for(let ee=0;ee<X.length;ee++){let q=X[ee],Ie=r.convert(q.format,q.colorSpace),ce=r.convert(q.type),Ae=v(q.internalFormat,Ie,ce,q.colorSpace),Re=he(x);z&&ie(x)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,Re,Ae,x.width,x.height):ie(x)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Re,Ae,x.width,x.height):i.renderbufferStorage(i.RENDERBUFFER,Ae,x.width,x.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function Te(A,x){if(x&&x.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(i.FRAMEBUFFER,A),!(x.depthTexture&&x.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");let X=n.get(x.depthTexture);X.__renderTarget=x,(!X.__webglTexture||x.depthTexture.image.width!==x.width||x.depthTexture.image.height!==x.height)&&(x.depthTexture.image.width=x.width,x.depthTexture.image.height=x.height,x.depthTexture.needsUpdate=!0),L(x.depthTexture,0);let ee=X.__webglTexture,q=he(x);if(x.depthTexture.format===Fs)ie(x)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,ee,0,q):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,ee,0);else if(x.depthTexture.format===js)ie(x)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,ee,0,q):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,ee,0);else throw new Error("Unknown depthTexture format")}function je(A){let x=n.get(A),z=A.isWebGLCubeRenderTarget===!0;if(x.__boundDepthTexture!==A.depthTexture){let X=A.depthTexture;if(x.__depthDisposeCallback&&x.__depthDisposeCallback(),X){let ee=()=>{delete x.__boundDepthTexture,delete x.__depthDisposeCallback,X.removeEventListener("dispose",ee)};X.addEventListener("dispose",ee),x.__depthDisposeCallback=ee}x.__boundDepthTexture=X}if(A.depthTexture&&!x.__autoAllocateDepthBuffer){if(z)throw new Error("target.depthTexture not supported in Cube render targets");let X=A.texture.mipmaps;X&&X.length>0?Te(x.__webglFramebuffer[0],A):Te(x.__webglFramebuffer,A)}else if(z){x.__webglDepthbuffer=[];for(let X=0;X<6;X++)if(t.bindFramebuffer(i.FRAMEBUFFER,x.__webglFramebuffer[X]),x.__webglDepthbuffer[X]===void 0)x.__webglDepthbuffer[X]=i.createRenderbuffer(),Le(x.__webglDepthbuffer[X],A,!1);else{let ee=A.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,q=x.__webglDepthbuffer[X];i.bindRenderbuffer(i.RENDERBUFFER,q),i.framebufferRenderbuffer(i.FRAMEBUFFER,ee,i.RENDERBUFFER,q)}}else{let X=A.texture.mipmaps;if(X&&X.length>0?t.bindFramebuffer(i.FRAMEBUFFER,x.__webglFramebuffer[0]):t.bindFramebuffer(i.FRAMEBUFFER,x.__webglFramebuffer),x.__webglDepthbuffer===void 0)x.__webglDepthbuffer=i.createRenderbuffer(),Le(x.__webglDepthbuffer,A,!1);else{let ee=A.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,q=x.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,q),i.framebufferRenderbuffer(i.FRAMEBUFFER,ee,i.RENDERBUFFER,q)}}t.bindFramebuffer(i.FRAMEBUFFER,null)}function dt(A,x,z){let X=n.get(A);x!==void 0&&Se(X.__webglFramebuffer,A,A.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),z!==void 0&&je(A)}function C(A){let x=A.texture,z=n.get(A),X=n.get(x);A.addEventListener("dispose",R);let ee=A.textures,q=A.isWebGLCubeRenderTarget===!0,Ie=ee.length>1;if(Ie||(X.__webglTexture===void 0&&(X.__webglTexture=i.createTexture()),X.__version=x.version,a.memory.textures++),q){z.__webglFramebuffer=[];for(let ce=0;ce<6;ce++)if(x.mipmaps&&x.mipmaps.length>0){z.__webglFramebuffer[ce]=[];for(let Ae=0;Ae<x.mipmaps.length;Ae++)z.__webglFramebuffer[ce][Ae]=i.createFramebuffer()}else z.__webglFramebuffer[ce]=i.createFramebuffer()}else{if(x.mipmaps&&x.mipmaps.length>0){z.__webglFramebuffer=[];for(let ce=0;ce<x.mipmaps.length;ce++)z.__webglFramebuffer[ce]=i.createFramebuffer()}else z.__webglFramebuffer=i.createFramebuffer();if(Ie)for(let ce=0,Ae=ee.length;ce<Ae;ce++){let Re=n.get(ee[ce]);Re.__webglTexture===void 0&&(Re.__webglTexture=i.createTexture(),a.memory.textures++)}if(A.samples>0&&ie(A)===!1){z.__webglMultisampledFramebuffer=i.createFramebuffer(),z.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,z.__webglMultisampledFramebuffer);for(let ce=0;ce<ee.length;ce++){let Ae=ee[ce];z.__webglColorRenderbuffer[ce]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,z.__webglColorRenderbuffer[ce]);let Re=r.convert(Ae.format,Ae.colorSpace),se=r.convert(Ae.type),xe=v(Ae.internalFormat,Re,se,Ae.colorSpace,A.isXRRenderTarget===!0),Oe=he(A);i.renderbufferStorageMultisample(i.RENDERBUFFER,Oe,xe,A.width,A.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ce,i.RENDERBUFFER,z.__webglColorRenderbuffer[ce])}i.bindRenderbuffer(i.RENDERBUFFER,null),A.depthBuffer&&(z.__webglDepthRenderbuffer=i.createRenderbuffer(),Le(z.__webglDepthRenderbuffer,A,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(q){t.bindTexture(i.TEXTURE_CUBE_MAP,X.__webglTexture),Ne(i.TEXTURE_CUBE_MAP,x);for(let ce=0;ce<6;ce++)if(x.mipmaps&&x.mipmaps.length>0)for(let Ae=0;Ae<x.mipmaps.length;Ae++)Se(z.__webglFramebuffer[ce][Ae],A,x,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+ce,Ae);else Se(z.__webglFramebuffer[ce],A,x,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+ce,0);g(x)&&m(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(Ie){for(let ce=0,Ae=ee.length;ce<Ae;ce++){let Re=ee[ce],se=n.get(Re),xe=i.TEXTURE_2D;(A.isWebGL3DRenderTarget||A.isWebGLArrayRenderTarget)&&(xe=A.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(xe,se.__webglTexture),Ne(xe,Re),Se(z.__webglFramebuffer,A,Re,i.COLOR_ATTACHMENT0+ce,xe,0),g(Re)&&m(xe)}t.unbindTexture()}else{let ce=i.TEXTURE_2D;if((A.isWebGL3DRenderTarget||A.isWebGLArrayRenderTarget)&&(ce=A.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(ce,X.__webglTexture),Ne(ce,x),x.mipmaps&&x.mipmaps.length>0)for(let Ae=0;Ae<x.mipmaps.length;Ae++)Se(z.__webglFramebuffer[Ae],A,x,i.COLOR_ATTACHMENT0,ce,Ae);else Se(z.__webglFramebuffer,A,x,i.COLOR_ATTACHMENT0,ce,0);g(x)&&m(ce),t.unbindTexture()}A.depthBuffer&&je(A)}function te(A){let x=A.textures;for(let z=0,X=x.length;z<X;z++){let ee=x[z];if(g(ee)){let q=E(A),Ie=n.get(ee).__webglTexture;t.bindTexture(q,Ie),m(q),t.unbindTexture()}}}let K=[],J=[];function Z(A){if(A.samples>0){if(ie(A)===!1){let x=A.textures,z=A.width,X=A.height,ee=i.COLOR_BUFFER_BIT,q=A.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Ie=n.get(A),ce=x.length>1;if(ce)for(let Re=0;Re<x.length;Re++)t.bindFramebuffer(i.FRAMEBUFFER,Ie.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Re,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,Ie.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Re,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,Ie.__webglMultisampledFramebuffer);let Ae=A.texture.mipmaps;Ae&&Ae.length>0?t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Ie.__webglFramebuffer[0]):t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Ie.__webglFramebuffer);for(let Re=0;Re<x.length;Re++){if(A.resolveDepthBuffer&&(A.depthBuffer&&(ee|=i.DEPTH_BUFFER_BIT),A.stencilBuffer&&A.resolveStencilBuffer&&(ee|=i.STENCIL_BUFFER_BIT)),ce){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,Ie.__webglColorRenderbuffer[Re]);let se=n.get(x[Re]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,se,0)}i.blitFramebuffer(0,0,z,X,0,0,z,X,ee,i.NEAREST),l===!0&&(K.length=0,J.length=0,K.push(i.COLOR_ATTACHMENT0+Re),A.depthBuffer&&A.resolveDepthBuffer===!1&&(K.push(q),J.push(q),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,J)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,K))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),ce)for(let Re=0;Re<x.length;Re++){t.bindFramebuffer(i.FRAMEBUFFER,Ie.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Re,i.RENDERBUFFER,Ie.__webglColorRenderbuffer[Re]);let se=n.get(x[Re]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,Ie.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Re,i.TEXTURE_2D,se,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Ie.__webglMultisampledFramebuffer)}else if(A.depthBuffer&&A.resolveDepthBuffer===!1&&l){let x=A.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[x])}}}function he(A){return Math.min(s.maxSamples,A.samples)}function ie(A){let x=n.get(A);return A.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&x.__useRenderToTexture!==!1}function ue(A){let x=a.render.frame;u.get(A)!==x&&(u.set(A,x),A.update())}function He(A,x){let z=A.colorSpace,X=A.format,ee=A.type;return A.isCompressedTexture===!0||A.isVideoTexture===!0||z!==Ji&&z!==oi&&(it.getTransfer(z)===at?(X!==mn||ee!==Dn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",z)),x}function ze(A){return typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement?(c.width=A.naturalWidth||A.width,c.height=A.naturalHeight||A.height):typeof VideoFrame<"u"&&A instanceof VideoFrame?(c.width=A.displayWidth,c.height=A.displayHeight):(c.width=A.width,c.height=A.height),c}this.allocateTextureUnit=V,this.resetTextureUnits=F,this.setTexture2D=L,this.setTexture2DArray=H,this.setTexture3D=N,this.setTextureCube=k,this.rebindTextures=dt,this.setupRenderTarget=C,this.updateRenderTargetMipmap=te,this.updateMultisampleRenderTarget=Z,this.setupDepthRenderbuffer=je,this.setupFrameBufferTexture=Se,this.useMultisampledRTT=ie}function ox(i,e){function t(n,s=oi){let r,a=it.getTransfer(s);if(n===Dn)return i.UNSIGNED_BYTE;if(n===$o)return i.UNSIGNED_SHORT_4_4_4_4;if(n===qo)return i.UNSIGNED_SHORT_5_5_5_1;if(n===$c)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===qc)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===Wc)return i.BYTE;if(n===Xc)return i.SHORT;if(n===Zs)return i.UNSIGNED_SHORT;if(n===Xo)return i.INT;if(n===Ai)return i.UNSIGNED_INT;if(n===vn)return i.FLOAT;if(n===Js)return i.HALF_FLOAT;if(n===Yc)return i.ALPHA;if(n===Zc)return i.RGB;if(n===mn)return i.RGBA;if(n===Fs)return i.DEPTH_COMPONENT;if(n===js)return i.DEPTH_STENCIL;if(n===Yo)return i.RED;if(n===Zo)return i.RED_INTEGER;if(n===Jc)return i.RG;if(n===Jo)return i.RG_INTEGER;if(n===Ko)return i.RGBA_INTEGER;if(n===ma||n===ga||n===ya||n===_a)if(a===at)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===ma)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===ga)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===ya)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===_a)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===ma)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===ga)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===ya)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===_a)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===jo||n===Qo||n===el||n===tl)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===jo)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Qo)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===el)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===tl)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===nl||n===il||n===sl)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(n===nl||n===il)return a===at?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===sl)return a===at?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===rl||n===al||n===ol||n===ll||n===cl||n===hl||n===ul||n===dl||n===fl||n===pl||n===ml||n===gl||n===yl||n===_l)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(n===rl)return a===at?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===al)return a===at?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===ol)return a===at?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===ll)return a===at?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===cl)return a===at?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===hl)return a===at?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===ul)return a===at?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===dl)return a===at?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===fl)return a===at?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===pl)return a===at?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===ml)return a===at?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===gl)return a===at?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===yl)return a===at?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===_l)return a===at?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===xl||n===vl||n===Ml)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(n===xl)return a===at?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===vl)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Ml)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Sl||n===bl||n===El||n===wl)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(n===Sl)return r.COMPRESSED_RED_RGTC1_EXT;if(n===bl)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===El)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===wl)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Ks?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:t}}var lx=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,cx=`
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

}`,xh=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let n=new qr(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,n=new dn({vertexShader:lx,fragmentShader:cx,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new ht(new ra(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},vh=class extends On{constructor(e,t){super();let n=this,s=null,r=1,a=null,o="local-floor",l=1,c=null,u=null,h=null,f=null,d=null,p=null,y=typeof XRWebGLBinding<"u",g=new xh,m={},E=t.getContextAttributes(),v=null,_=null,T=[],w=[],R=new fe,I=null,S=new Gt;S.viewport=new mt;let M=new Gt;M.viewport=new mt;let P=[S,M],F=new Io,V=null,$=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Y){let ne=T[Y];return ne===void 0&&(ne=new Hs,T[Y]=ne),ne.getTargetRaySpace()},this.getControllerGrip=function(Y){let ne=T[Y];return ne===void 0&&(ne=new Hs,T[Y]=ne),ne.getGripSpace()},this.getHand=function(Y){let ne=T[Y];return ne===void 0&&(ne=new Hs,T[Y]=ne),ne.getHandSpace()};function L(Y){let ne=w.indexOf(Y.inputSource);if(ne===-1)return;let Se=T[ne];Se!==void 0&&(Se.update(Y.inputSource,Y.frame,c||a),Se.dispatchEvent({type:Y.type,data:Y.inputSource}))}function H(){s.removeEventListener("select",L),s.removeEventListener("selectstart",L),s.removeEventListener("selectend",L),s.removeEventListener("squeeze",L),s.removeEventListener("squeezestart",L),s.removeEventListener("squeezeend",L),s.removeEventListener("end",H),s.removeEventListener("inputsourceschange",N);for(let Y=0;Y<T.length;Y++){let ne=w[Y];ne!==null&&(w[Y]=null,T[Y].disconnect(ne))}V=null,$=null,g.reset();for(let Y in m)delete m[Y];e.setRenderTarget(v),d=null,f=null,h=null,s=null,_=null,Ke.stop(),n.isPresenting=!1,e.setPixelRatio(I),e.setSize(R.width,R.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Y){r=Y,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Y){o=Y,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(Y){c=Y},this.getBaseLayer=function(){return f!==null?f:d},this.getBinding=function(){return h===null&&y&&(h=new XRWebGLBinding(s,t)),h},this.getFrame=function(){return p},this.getSession=function(){return s},this.setSession=async function(Y){if(s=Y,s!==null){if(v=e.getRenderTarget(),s.addEventListener("select",L),s.addEventListener("selectstart",L),s.addEventListener("selectend",L),s.addEventListener("squeeze",L),s.addEventListener("squeezestart",L),s.addEventListener("squeezeend",L),s.addEventListener("end",H),s.addEventListener("inputsourceschange",N),E.xrCompatible!==!0&&await t.makeXRCompatible(),I=e.getPixelRatio(),e.getSize(R),y&&"createProjectionLayer"in XRWebGLBinding.prototype){let Se=null,Le=null,Te=null;E.depth&&(Te=E.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,Se=E.stencil?js:Fs,Le=E.stencil?Ks:Ai);let je={colorFormat:t.RGBA8,depthFormat:Te,scaleFactor:r};h=this.getBinding(),f=h.createProjectionLayer(je),s.updateRenderState({layers:[f]}),e.setPixelRatio(1),e.setSize(f.textureWidth,f.textureHeight,!1),_=new Bn(f.textureWidth,f.textureHeight,{format:mn,type:Dn,depthTexture:new $r(f.textureWidth,f.textureHeight,Le,void 0,void 0,void 0,void 0,void 0,void 0,Se),stencilBuffer:E.stencil,colorSpace:e.outputColorSpace,samples:E.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}else{let Se={antialias:E.antialias,alpha:!0,depth:E.depth,stencil:E.stencil,framebufferScaleFactor:r};d=new XRWebGLLayer(s,t,Se),s.updateRenderState({baseLayer:d}),e.setPixelRatio(1),e.setSize(d.framebufferWidth,d.framebufferHeight,!1),_=new Bn(d.framebufferWidth,d.framebufferHeight,{format:mn,type:Dn,colorSpace:e.outputColorSpace,stencilBuffer:E.stencil,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1})}_.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await s.requestReferenceSpace(o),Ke.setContext(s),Ke.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return g.getDepthTexture()};function N(Y){for(let ne=0;ne<Y.removed.length;ne++){let Se=Y.removed[ne],Le=w.indexOf(Se);Le>=0&&(w[Le]=null,T[Le].disconnect(Se))}for(let ne=0;ne<Y.added.length;ne++){let Se=Y.added[ne],Le=w.indexOf(Se);if(Le===-1){for(let je=0;je<T.length;je++)if(je>=w.length){w.push(Se),Le=je;break}else if(w[je]===null){w[je]=Se,Le=je;break}if(Le===-1)break}let Te=T[Le];Te&&Te.connect(Se)}}let k=new D,Q=new D;function le(Y,ne,Se){k.setFromMatrixPosition(ne.matrixWorld),Q.setFromMatrixPosition(Se.matrixWorld);let Le=k.distanceTo(Q),Te=ne.projectionMatrix.elements,je=Se.projectionMatrix.elements,dt=Te[14]/(Te[10]-1),C=Te[14]/(Te[10]+1),te=(Te[9]+1)/Te[5],K=(Te[9]-1)/Te[5],J=(Te[8]-1)/Te[0],Z=(je[8]+1)/je[0],he=dt*J,ie=dt*Z,ue=Le/(-J+Z),He=ue*-J;if(ne.matrixWorld.decompose(Y.position,Y.quaternion,Y.scale),Y.translateX(He),Y.translateZ(ue),Y.matrixWorld.compose(Y.position,Y.quaternion,Y.scale),Y.matrixWorldInverse.copy(Y.matrixWorld).invert(),Te[10]===-1)Y.projectionMatrix.copy(ne.projectionMatrix),Y.projectionMatrixInverse.copy(ne.projectionMatrixInverse);else{let ze=dt+ue,A=C+ue,x=he-He,z=ie+(Le-He),X=te*C/A*ze,ee=K*C/A*ze;Y.projectionMatrix.makePerspective(x,z,X,ee,ze,A),Y.projectionMatrixInverse.copy(Y.projectionMatrix).invert()}}function ye(Y,ne){ne===null?Y.matrixWorld.copy(Y.matrix):Y.matrixWorld.multiplyMatrices(ne.matrixWorld,Y.matrix),Y.matrixWorldInverse.copy(Y.matrixWorld).invert()}this.updateCamera=function(Y){if(s===null)return;let ne=Y.near,Se=Y.far;g.texture!==null&&(g.depthNear>0&&(ne=g.depthNear),g.depthFar>0&&(Se=g.depthFar)),F.near=M.near=S.near=ne,F.far=M.far=S.far=Se,(V!==F.near||$!==F.far)&&(s.updateRenderState({depthNear:F.near,depthFar:F.far}),V=F.near,$=F.far),F.layers.mask=Y.layers.mask|6,S.layers.mask=F.layers.mask&3,M.layers.mask=F.layers.mask&5;let Le=Y.parent,Te=F.cameras;ye(F,Le);for(let je=0;je<Te.length;je++)ye(Te[je],Le);Te.length===2?le(F,S,M):F.projectionMatrix.copy(S.projectionMatrix),Ne(Y,F,Le)};function Ne(Y,ne,Se){Se===null?Y.matrix.copy(ne.matrixWorld):(Y.matrix.copy(Se.matrixWorld),Y.matrix.invert(),Y.matrix.multiply(ne.matrixWorld)),Y.matrix.decompose(Y.position,Y.quaternion,Y.scale),Y.updateMatrixWorld(!0),Y.projectionMatrix.copy(ne.projectionMatrix),Y.projectionMatrixInverse.copy(ne.projectionMatrixInverse),Y.isPerspectiveCamera&&(Y.fov=Os*2*Math.atan(1/Y.projectionMatrix.elements[5]),Y.zoom=1)}this.getCamera=function(){return F},this.getFoveation=function(){if(!(f===null&&d===null))return l},this.setFoveation=function(Y){l=Y,f!==null&&(f.fixedFoveation=Y),d!==null&&d.fixedFoveation!==void 0&&(d.fixedFoveation=Y)},this.hasDepthSensing=function(){return g.texture!==null},this.getDepthSensingMesh=function(){return g.getMesh(F)},this.getCameraTexture=function(Y){return m[Y]};let Xe=null;function et(Y,ne){if(u=ne.getViewerPose(c||a),p=ne,u!==null){let Se=u.views;d!==null&&(e.setRenderTargetFramebuffer(_,d.framebuffer),e.setRenderTarget(_));let Le=!1;Se.length!==F.cameras.length&&(F.cameras.length=0,Le=!0);for(let C=0;C<Se.length;C++){let te=Se[C],K=null;if(d!==null)K=d.getViewport(te);else{let Z=h.getViewSubImage(f,te);K=Z.viewport,C===0&&(e.setRenderTargetTextures(_,Z.colorTexture,Z.depthStencilTexture),e.setRenderTarget(_))}let J=P[C];J===void 0&&(J=new Gt,J.layers.enable(C),J.viewport=new mt,P[C]=J),J.matrix.fromArray(te.transform.matrix),J.matrix.decompose(J.position,J.quaternion,J.scale),J.projectionMatrix.fromArray(te.projectionMatrix),J.projectionMatrixInverse.copy(J.projectionMatrix).invert(),J.viewport.set(K.x,K.y,K.width,K.height),C===0&&(F.matrix.copy(J.matrix),F.matrix.decompose(F.position,F.quaternion,F.scale)),Le===!0&&F.cameras.push(J)}let Te=s.enabledFeatures;if(Te&&Te.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&y){h=n.getBinding();let C=h.getDepthInformation(Se[0]);C&&C.isValid&&C.texture&&g.init(C,s.renderState)}if(Te&&Te.includes("camera-access")&&y){e.state.unbindTexture(),h=n.getBinding();for(let C=0;C<Se.length;C++){let te=Se[C].camera;if(te){let K=m[te];K||(K=new qr,m[te]=K);let J=h.getCameraImage(te);K.sourceTexture=J}}}}for(let Se=0;Se<T.length;Se++){let Le=w[Se],Te=T[Se];Le!==null&&Te!==void 0&&Te.update(Le,ne,c||a)}Xe&&Xe(Y,ne),ne.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:ne}),p=null}let Ke=new uf;Ke.setAnimationLoop(et),this.setAnimationLoop=function(Y){Xe=Y},this.dispose=function(){}}},cs=new hn,hx=new qe;function ux(i,e){function t(g,m){g.matrixAutoUpdate===!0&&g.updateMatrix(),m.value.copy(g.matrix)}function n(g,m){m.color.getRGB(g.fogColor.value,nh(i)),m.isFog?(g.fogNear.value=m.near,g.fogFar.value=m.far):m.isFogExp2&&(g.fogDensity.value=m.density)}function s(g,m,E,v,_){m.isMeshBasicMaterial||m.isMeshLambertMaterial?r(g,m):m.isMeshToonMaterial?(r(g,m),h(g,m)):m.isMeshPhongMaterial?(r(g,m),u(g,m)):m.isMeshStandardMaterial?(r(g,m),f(g,m),m.isMeshPhysicalMaterial&&d(g,m,_)):m.isMeshMatcapMaterial?(r(g,m),p(g,m)):m.isMeshDepthMaterial?r(g,m):m.isMeshDistanceMaterial?(r(g,m),y(g,m)):m.isMeshNormalMaterial?r(g,m):m.isLineBasicMaterial?(a(g,m),m.isLineDashedMaterial&&o(g,m)):m.isPointsMaterial?l(g,m,E,v):m.isSpriteMaterial?c(g,m):m.isShadowMaterial?(g.color.value.copy(m.color),g.opacity.value=m.opacity):m.isShaderMaterial&&(m.uniformsNeedUpdate=!1)}function r(g,m){g.opacity.value=m.opacity,m.color&&g.diffuse.value.copy(m.color),m.emissive&&g.emissive.value.copy(m.emissive).multiplyScalar(m.emissiveIntensity),m.map&&(g.map.value=m.map,t(m.map,g.mapTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,t(m.alphaMap,g.alphaMapTransform)),m.bumpMap&&(g.bumpMap.value=m.bumpMap,t(m.bumpMap,g.bumpMapTransform),g.bumpScale.value=m.bumpScale,m.side===zt&&(g.bumpScale.value*=-1)),m.normalMap&&(g.normalMap.value=m.normalMap,t(m.normalMap,g.normalMapTransform),g.normalScale.value.copy(m.normalScale),m.side===zt&&g.normalScale.value.negate()),m.displacementMap&&(g.displacementMap.value=m.displacementMap,t(m.displacementMap,g.displacementMapTransform),g.displacementScale.value=m.displacementScale,g.displacementBias.value=m.displacementBias),m.emissiveMap&&(g.emissiveMap.value=m.emissiveMap,t(m.emissiveMap,g.emissiveMapTransform)),m.specularMap&&(g.specularMap.value=m.specularMap,t(m.specularMap,g.specularMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest);let E=e.get(m),v=E.envMap,_=E.envMapRotation;v&&(g.envMap.value=v,cs.copy(_),cs.x*=-1,cs.y*=-1,cs.z*=-1,v.isCubeTexture&&v.isRenderTargetTexture===!1&&(cs.y*=-1,cs.z*=-1),g.envMapRotation.value.setFromMatrix4(hx.makeRotationFromEuler(cs)),g.flipEnvMap.value=v.isCubeTexture&&v.isRenderTargetTexture===!1?-1:1,g.reflectivity.value=m.reflectivity,g.ior.value=m.ior,g.refractionRatio.value=m.refractionRatio),m.lightMap&&(g.lightMap.value=m.lightMap,g.lightMapIntensity.value=m.lightMapIntensity,t(m.lightMap,g.lightMapTransform)),m.aoMap&&(g.aoMap.value=m.aoMap,g.aoMapIntensity.value=m.aoMapIntensity,t(m.aoMap,g.aoMapTransform))}function a(g,m){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,m.map&&(g.map.value=m.map,t(m.map,g.mapTransform))}function o(g,m){g.dashSize.value=m.dashSize,g.totalSize.value=m.dashSize+m.gapSize,g.scale.value=m.scale}function l(g,m,E,v){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,g.size.value=m.size*E,g.scale.value=v*.5,m.map&&(g.map.value=m.map,t(m.map,g.uvTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,t(m.alphaMap,g.alphaMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest)}function c(g,m){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,g.rotation.value=m.rotation,m.map&&(g.map.value=m.map,t(m.map,g.mapTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,t(m.alphaMap,g.alphaMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest)}function u(g,m){g.specular.value.copy(m.specular),g.shininess.value=Math.max(m.shininess,1e-4)}function h(g,m){m.gradientMap&&(g.gradientMap.value=m.gradientMap)}function f(g,m){g.metalness.value=m.metalness,m.metalnessMap&&(g.metalnessMap.value=m.metalnessMap,t(m.metalnessMap,g.metalnessMapTransform)),g.roughness.value=m.roughness,m.roughnessMap&&(g.roughnessMap.value=m.roughnessMap,t(m.roughnessMap,g.roughnessMapTransform)),m.envMap&&(g.envMapIntensity.value=m.envMapIntensity)}function d(g,m,E){g.ior.value=m.ior,m.sheen>0&&(g.sheenColor.value.copy(m.sheenColor).multiplyScalar(m.sheen),g.sheenRoughness.value=m.sheenRoughness,m.sheenColorMap&&(g.sheenColorMap.value=m.sheenColorMap,t(m.sheenColorMap,g.sheenColorMapTransform)),m.sheenRoughnessMap&&(g.sheenRoughnessMap.value=m.sheenRoughnessMap,t(m.sheenRoughnessMap,g.sheenRoughnessMapTransform))),m.clearcoat>0&&(g.clearcoat.value=m.clearcoat,g.clearcoatRoughness.value=m.clearcoatRoughness,m.clearcoatMap&&(g.clearcoatMap.value=m.clearcoatMap,t(m.clearcoatMap,g.clearcoatMapTransform)),m.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=m.clearcoatRoughnessMap,t(m.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),m.clearcoatNormalMap&&(g.clearcoatNormalMap.value=m.clearcoatNormalMap,t(m.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(m.clearcoatNormalScale),m.side===zt&&g.clearcoatNormalScale.value.negate())),m.dispersion>0&&(g.dispersion.value=m.dispersion),m.iridescence>0&&(g.iridescence.value=m.iridescence,g.iridescenceIOR.value=m.iridescenceIOR,g.iridescenceThicknessMinimum.value=m.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=m.iridescenceThicknessRange[1],m.iridescenceMap&&(g.iridescenceMap.value=m.iridescenceMap,t(m.iridescenceMap,g.iridescenceMapTransform)),m.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=m.iridescenceThicknessMap,t(m.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),m.transmission>0&&(g.transmission.value=m.transmission,g.transmissionSamplerMap.value=E.texture,g.transmissionSamplerSize.value.set(E.width,E.height),m.transmissionMap&&(g.transmissionMap.value=m.transmissionMap,t(m.transmissionMap,g.transmissionMapTransform)),g.thickness.value=m.thickness,m.thicknessMap&&(g.thicknessMap.value=m.thicknessMap,t(m.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=m.attenuationDistance,g.attenuationColor.value.copy(m.attenuationColor)),m.anisotropy>0&&(g.anisotropyVector.value.set(m.anisotropy*Math.cos(m.anisotropyRotation),m.anisotropy*Math.sin(m.anisotropyRotation)),m.anisotropyMap&&(g.anisotropyMap.value=m.anisotropyMap,t(m.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=m.specularIntensity,g.specularColor.value.copy(m.specularColor),m.specularColorMap&&(g.specularColorMap.value=m.specularColorMap,t(m.specularColorMap,g.specularColorMapTransform)),m.specularIntensityMap&&(g.specularIntensityMap.value=m.specularIntensityMap,t(m.specularIntensityMap,g.specularIntensityMapTransform))}function p(g,m){m.matcap&&(g.matcap.value=m.matcap)}function y(g,m){let E=e.get(m).light;g.referencePosition.value.setFromMatrixPosition(E.matrixWorld),g.nearDistance.value=E.shadow.camera.near,g.farDistance.value=E.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function dx(i,e,t,n){let s={},r={},a=[],o=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function l(E,v){let _=v.program;n.uniformBlockBinding(E,_)}function c(E,v){let _=s[E.id];_===void 0&&(p(E),_=u(E),s[E.id]=_,E.addEventListener("dispose",g));let T=v.program;n.updateUBOMapping(E,T);let w=e.render.frame;r[E.id]!==w&&(f(E),r[E.id]=w)}function u(E){let v=h();E.__bindingPointIndex=v;let _=i.createBuffer(),T=E.__size,w=E.usage;return i.bindBuffer(i.UNIFORM_BUFFER,_),i.bufferData(i.UNIFORM_BUFFER,T,w),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,v,_),_}function h(){for(let E=0;E<o;E++)if(a.indexOf(E)===-1)return a.push(E),E;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(E){let v=s[E.id],_=E.uniforms,T=E.__cache;i.bindBuffer(i.UNIFORM_BUFFER,v);for(let w=0,R=_.length;w<R;w++){let I=Array.isArray(_[w])?_[w]:[_[w]];for(let S=0,M=I.length;S<M;S++){let P=I[S];if(d(P,w,S,T)===!0){let F=P.__offset,V=Array.isArray(P.value)?P.value:[P.value],$=0;for(let L=0;L<V.length;L++){let H=V[L],N=y(H);typeof H=="number"||typeof H=="boolean"?(P.__data[0]=H,i.bufferSubData(i.UNIFORM_BUFFER,F+$,P.__data)):H.isMatrix3?(P.__data[0]=H.elements[0],P.__data[1]=H.elements[1],P.__data[2]=H.elements[2],P.__data[3]=0,P.__data[4]=H.elements[3],P.__data[5]=H.elements[4],P.__data[6]=H.elements[5],P.__data[7]=0,P.__data[8]=H.elements[6],P.__data[9]=H.elements[7],P.__data[10]=H.elements[8],P.__data[11]=0):(H.toArray(P.__data,$),$+=N.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,F,P.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function d(E,v,_,T){let w=E.value,R=v+"_"+_;if(T[R]===void 0)return typeof w=="number"||typeof w=="boolean"?T[R]=w:T[R]=w.clone(),!0;{let I=T[R];if(typeof w=="number"||typeof w=="boolean"){if(I!==w)return T[R]=w,!0}else if(I.equals(w)===!1)return I.copy(w),!0}return!1}function p(E){let v=E.uniforms,_=0,T=16;for(let R=0,I=v.length;R<I;R++){let S=Array.isArray(v[R])?v[R]:[v[R]];for(let M=0,P=S.length;M<P;M++){let F=S[M],V=Array.isArray(F.value)?F.value:[F.value];for(let $=0,L=V.length;$<L;$++){let H=V[$],N=y(H),k=_%T,Q=k%N.boundary,le=k+Q;_+=Q,le!==0&&T-le<N.storage&&(_+=T-le),F.__data=new Float32Array(N.storage/Float32Array.BYTES_PER_ELEMENT),F.__offset=_,_+=N.storage}}}let w=_%T;return w>0&&(_+=T-w),E.__size=_,E.__cache={},this}function y(E){let v={boundary:0,storage:0};return typeof E=="number"||typeof E=="boolean"?(v.boundary=4,v.storage=4):E.isVector2?(v.boundary=8,v.storage=8):E.isVector3||E.isColor?(v.boundary=16,v.storage=12):E.isVector4?(v.boundary=16,v.storage=16):E.isMatrix3?(v.boundary=48,v.storage=48):E.isMatrix4?(v.boundary=64,v.storage=64):E.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",E),v}function g(E){let v=E.target;v.removeEventListener("dispose",g);let _=a.indexOf(v.__bindingPointIndex);a.splice(_,1),i.deleteBuffer(s[v.id]),delete s[v.id],delete r[v.id]}function m(){for(let E in s)i.deleteBuffer(s[E]);a=[],s={},r={}}return{bind:l,update:c,dispose:m}}var Ll=class{constructor(e={}){let{canvas:t=Pd(),context:n=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:h=!1,reversedDepthBuffer:f=!1}=e;this.isWebGLRenderer=!0;let d;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");d=n.getContextAttributes().alpha}else d=a;let p=new Uint32Array(4),y=new Int32Array(4),g=null,m=null,E=[],v=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=ai,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let _=this,T=!1;this._outputColorSpace=qt;let w=0,R=0,I=null,S=-1,M=null,P=new mt,F=new mt,V=null,$=new ke(0),L=0,H=t.width,N=t.height,k=1,Q=null,le=null,ye=new mt(0,0,H,N),Ne=new mt(0,0,H,N),Xe=!1,et=new Ei,Ke=!1,Y=!1,ne=new qe,Se=new D,Le=new mt,Te={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},je=!1;function dt(){return I===null?k:1}let C=n;function te(b,O){return t.getContext(b,O)}try{let b={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:h};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${"180"}`),t.addEventListener("webglcontextlost",de,!1),t.addEventListener("webglcontextrestored",be,!1),t.addEventListener("webglcontextcreationerror",re,!1),C===null){let O="webgl2";if(C=te(O,b),C===null)throw te(O)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(b){throw console.error("THREE.WebGLRenderer: "+b.message),b}let K,J,Z,he,ie,ue,He,ze,A,x,z,X,ee,q,Ie,ce,Ae,Re,se,xe,Oe,Pe,ge,$e;function U(){K=new Iy(C),K.init(),Pe=new ox(C,K),J=new by(C,K,e,Pe),Z=new rx(C,K),J.reversedDepthBuffer&&f&&Z.buffers.depth.setReversed(!0),he=new Dy(C),ie=new $_,ue=new ax(C,K,Z,ie,J,Pe,he),He=new wy(_),ze=new Cy(_),A=new zm(C),ge=new My(C,A),x=new Py(C,A,he,ge),z=new Ny(C,x,A,he),se=new Uy(C,J,ue),ce=new Ey(ie),X=new X_(_,He,ze,K,J,ge,ce),ee=new ux(_,ie),q=new Y_,Ie=new ex(K),Re=new vy(_,He,ze,Z,z,d,l),Ae=new ix(_,z,J),$e=new dx(C,he,J,Z),xe=new Sy(C,K,he),Oe=new Ly(C,K,he),he.programs=X.programs,_.capabilities=J,_.extensions=K,_.properties=ie,_.renderLists=q,_.shadowMap=Ae,_.state=Z,_.info=he}U();let oe=new vh(_,C);this.xr=oe,this.getContext=function(){return C},this.getContextAttributes=function(){return C.getContextAttributes()},this.forceContextLoss=function(){let b=K.get("WEBGL_lose_context");b&&b.loseContext()},this.forceContextRestore=function(){let b=K.get("WEBGL_lose_context");b&&b.restoreContext()},this.getPixelRatio=function(){return k},this.setPixelRatio=function(b){b!==void 0&&(k=b,this.setSize(H,N,!1))},this.getSize=function(b){return b.set(H,N)},this.setSize=function(b,O,G=!0){if(oe.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}H=b,N=O,t.width=Math.floor(b*k),t.height=Math.floor(O*k),G===!0&&(t.style.width=b+"px",t.style.height=O+"px"),this.setViewport(0,0,b,O)},this.getDrawingBufferSize=function(b){return b.set(H*k,N*k).floor()},this.setDrawingBufferSize=function(b,O,G){H=b,N=O,k=G,t.width=Math.floor(b*G),t.height=Math.floor(O*G),this.setViewport(0,0,b,O)},this.getCurrentViewport=function(b){return b.copy(P)},this.getViewport=function(b){return b.copy(ye)},this.setViewport=function(b,O,G,W){b.isVector4?ye.set(b.x,b.y,b.z,b.w):ye.set(b,O,G,W),Z.viewport(P.copy(ye).multiplyScalar(k).round())},this.getScissor=function(b){return b.copy(Ne)},this.setScissor=function(b,O,G,W){b.isVector4?Ne.set(b.x,b.y,b.z,b.w):Ne.set(b,O,G,W),Z.scissor(F.copy(Ne).multiplyScalar(k).round())},this.getScissorTest=function(){return Xe},this.setScissorTest=function(b){Z.setScissorTest(Xe=b)},this.setOpaqueSort=function(b){Q=b},this.setTransparentSort=function(b){le=b},this.getClearColor=function(b){return b.copy(Re.getClearColor())},this.setClearColor=function(){Re.setClearColor(...arguments)},this.getClearAlpha=function(){return Re.getClearAlpha()},this.setClearAlpha=function(){Re.setClearAlpha(...arguments)},this.clear=function(b=!0,O=!0,G=!0){let W=0;if(b){let B=!1;if(I!==null){let ae=I.texture.format;B=ae===Ko||ae===Jo||ae===Zo}if(B){let ae=I.texture.type,_e=ae===Dn||ae===Ai||ae===Zs||ae===Ks||ae===$o||ae===qo,Ee=Re.getClearColor(),Me=Re.getClearAlpha(),Fe=Ee.r,Be=Ee.g,De=Ee.b;_e?(p[0]=Fe,p[1]=Be,p[2]=De,p[3]=Me,C.clearBufferuiv(C.COLOR,0,p)):(y[0]=Fe,y[1]=Be,y[2]=De,y[3]=Me,C.clearBufferiv(C.COLOR,0,y))}else W|=C.COLOR_BUFFER_BIT}O&&(W|=C.DEPTH_BUFFER_BIT),G&&(W|=C.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),C.clear(W)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",de,!1),t.removeEventListener("webglcontextrestored",be,!1),t.removeEventListener("webglcontextcreationerror",re,!1),Re.dispose(),q.dispose(),Ie.dispose(),ie.dispose(),He.dispose(),ze.dispose(),z.dispose(),ge.dispose(),$e.dispose(),X.dispose(),oe.dispose(),oe.removeEventListener("sessionstart",Nn),oe.removeEventListener("sessionend",Fh),Li.stop()};function de(b){b.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),T=!0}function be(){console.log("THREE.WebGLRenderer: Context Restored."),T=!1;let b=he.autoReset,O=Ae.enabled,G=Ae.autoUpdate,W=Ae.needsUpdate,B=Ae.type;U(),he.autoReset=b,Ae.enabled=O,Ae.autoUpdate=G,Ae.needsUpdate=W,Ae.type=B}function re(b){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",b.statusMessage)}function j(b){let O=b.target;O.removeEventListener("dispose",j),Ce(O)}function Ce(b){Ve(b),ie.remove(b)}function Ve(b){let O=ie.get(b).programs;O!==void 0&&(O.forEach(function(G){X.releaseProgram(G)}),b.isShaderMaterial&&X.releaseShaderCache(b))}this.renderBufferDirect=function(b,O,G,W,B,ae){O===null&&(O=Te);let _e=B.isMesh&&B.matrixWorld.determinant()<0,Ee=zf(b,O,G,W,B);Z.setMaterial(W,_e);let Me=G.index,Fe=1;if(W.wireframe===!0){if(Me=x.getWireframeAttribute(G),Me===void 0)return;Fe=2}let Be=G.drawRange,De=G.attributes.position,Qe=Be.start*Fe,ot=(Be.start+Be.count)*Fe;ae!==null&&(Qe=Math.max(Qe,ae.start*Fe),ot=Math.min(ot,(ae.start+ae.count)*Fe)),Me!==null?(Qe=Math.max(Qe,0),ot=Math.min(ot,Me.count)):De!=null&&(Qe=Math.max(Qe,0),ot=Math.min(ot,De.count));let bt=ot-Qe;if(bt<0||bt===1/0)return;ge.setup(B,W,Ee,G,Me);let yt,ct=xe;if(Me!==null&&(yt=A.get(Me),ct=Oe,ct.setIndex(yt)),B.isMesh)W.wireframe===!0?(Z.setLineWidth(W.wireframeLinewidth*dt()),ct.setMode(C.LINES)):ct.setMode(C.TRIANGLES);else if(B.isLine){let Ue=W.linewidth;Ue===void 0&&(Ue=1),Z.setLineWidth(Ue*dt()),B.isLineSegments?ct.setMode(C.LINES):B.isLineLoop?ct.setMode(C.LINE_LOOP):ct.setMode(C.LINE_STRIP)}else B.isPoints?ct.setMode(C.POINTS):B.isSprite&&ct.setMode(C.TRIANGLES);if(B.isBatchedMesh)if(B._multiDrawInstances!==null)Bs("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),ct.renderMultiDrawInstances(B._multiDrawStarts,B._multiDrawCounts,B._multiDrawCount,B._multiDrawInstances);else if(K.get("WEBGL_multi_draw"))ct.renderMultiDraw(B._multiDrawStarts,B._multiDrawCounts,B._multiDrawCount);else{let Ue=B._multiDrawStarts,vt=B._multiDrawCounts,st=B._multiDrawCount,rn=Me?A.get(Me).bytesPerElement:1,ys=ie.get(W).currentProgram.getUniforms();for(let an=0;an<st;an++)ys.setValue(C,"_gl_DrawID",an),ct.render(Ue[an]/rn,vt[an])}else if(B.isInstancedMesh)ct.renderInstances(Qe,bt,B.count);else if(G.isInstancedBufferGeometry){let Ue=G._maxInstanceCount!==void 0?G._maxInstanceCount:1/0,vt=Math.min(G.instanceCount,Ue);ct.renderInstances(Qe,bt,vt)}else ct.render(Qe,bt)};function ft(b,O,G){b.transparent===!0&&b.side===xn&&b.forceSinglePass===!1?(b.side=zt,b.needsUpdate=!0,Ea(b,O,G),b.side=jn,b.needsUpdate=!0,Ea(b,O,G),b.side=xn):Ea(b,O,G)}this.compile=function(b,O,G=null){G===null&&(G=b),m=Ie.get(G),m.init(O),v.push(m),G.traverseVisible(function(B){B.isLight&&B.layers.test(O.layers)&&(m.pushLight(B),B.castShadow&&m.pushShadow(B))}),b!==G&&b.traverseVisible(function(B){B.isLight&&B.layers.test(O.layers)&&(m.pushLight(B),B.castShadow&&m.pushShadow(B))}),m.setupLights();let W=new Set;return b.traverse(function(B){if(!(B.isMesh||B.isPoints||B.isLine||B.isSprite))return;let ae=B.material;if(ae)if(Array.isArray(ae))for(let _e=0;_e<ae.length;_e++){let Ee=ae[_e];ft(Ee,G,B),W.add(Ee)}else ft(ae,G,B),W.add(ae)}),m=v.pop(),W},this.compileAsync=function(b,O,G=null){let W=this.compile(b,O,G);return new Promise(B=>{function ae(){if(W.forEach(function(_e){ie.get(_e).currentProgram.isReady()&&W.delete(_e)}),W.size===0){B(b);return}setTimeout(ae,10)}K.get("KHR_parallel_shader_compile")!==null?ae():setTimeout(ae,10)})};let rt=null;function Xn(b){rt&&rt(b)}function Nn(){Li.stop()}function Fh(){Li.start()}let Li=new uf;Li.setAnimationLoop(Xn),typeof self<"u"&&Li.setContext(self),this.setAnimationLoop=function(b){rt=b,oe.setAnimationLoop(b),b===null?Li.stop():Li.start()},oe.addEventListener("sessionstart",Nn),oe.addEventListener("sessionend",Fh),this.render=function(b,O){if(O!==void 0&&O.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(T===!0)return;if(b.matrixWorldAutoUpdate===!0&&b.updateMatrixWorld(),O.parent===null&&O.matrixWorldAutoUpdate===!0&&O.updateMatrixWorld(),oe.enabled===!0&&oe.isPresenting===!0&&(oe.cameraAutoUpdate===!0&&oe.updateCamera(O),O=oe.getCamera()),b.isScene===!0&&b.onBeforeRender(_,b,O,I),m=Ie.get(b,v.length),m.init(O),v.push(m),ne.multiplyMatrices(O.projectionMatrix,O.matrixWorldInverse),et.setFromProjectionMatrix(ne,Tn,O.reversedDepth),Y=this.localClippingEnabled,Ke=ce.init(this.clippingPlanes,Y),g=q.get(b,E.length),g.init(),E.push(g),oe.enabled===!0&&oe.isPresenting===!0){let ae=_.xr.getDepthSensingMesh();ae!==null&&Xl(ae,O,-1/0,_.sortObjects)}Xl(b,O,0,_.sortObjects),g.finish(),_.sortObjects===!0&&g.sort(Q,le),je=oe.enabled===!1||oe.isPresenting===!1||oe.hasDepthSensing()===!1,je&&Re.addToRenderList(g,b),this.info.render.frame++,Ke===!0&&ce.beginShadows();let G=m.state.shadowsArray;Ae.render(G,b,O),Ke===!0&&ce.endShadows(),this.info.autoReset===!0&&this.info.reset();let W=g.opaque,B=g.transmissive;if(m.setupLights(),O.isArrayCamera){let ae=O.cameras;if(B.length>0)for(let _e=0,Ee=ae.length;_e<Ee;_e++){let Me=ae[_e];Bh(W,B,b,Me)}je&&Re.render(b);for(let _e=0,Ee=ae.length;_e<Ee;_e++){let Me=ae[_e];Oh(g,b,Me,Me.viewport)}}else B.length>0&&Bh(W,B,b,O),je&&Re.render(b),Oh(g,b,O);I!==null&&R===0&&(ue.updateMultisampleRenderTarget(I),ue.updateRenderTargetMipmap(I)),b.isScene===!0&&b.onAfterRender(_,b,O),ge.resetDefaultState(),S=-1,M=null,v.pop(),v.length>0?(m=v[v.length-1],Ke===!0&&ce.setGlobalState(_.clippingPlanes,m.state.camera)):m=null,E.pop(),E.length>0?g=E[E.length-1]:g=null};function Xl(b,O,G,W){if(b.visible===!1)return;if(b.layers.test(O.layers)){if(b.isGroup)G=b.renderOrder;else if(b.isLOD)b.autoUpdate===!0&&b.update(O);else if(b.isLight)m.pushLight(b),b.castShadow&&m.pushShadow(b);else if(b.isSprite){if(!b.frustumCulled||et.intersectsSprite(b)){W&&Le.setFromMatrixPosition(b.matrixWorld).applyMatrix4(ne);let _e=z.update(b),Ee=b.material;Ee.visible&&g.push(b,_e,Ee,G,Le.z,null)}}else if((b.isMesh||b.isLine||b.isPoints)&&(!b.frustumCulled||et.intersectsObject(b))){let _e=z.update(b),Ee=b.material;if(W&&(b.boundingSphere!==void 0?(b.boundingSphere===null&&b.computeBoundingSphere(),Le.copy(b.boundingSphere.center)):(_e.boundingSphere===null&&_e.computeBoundingSphere(),Le.copy(_e.boundingSphere.center)),Le.applyMatrix4(b.matrixWorld).applyMatrix4(ne)),Array.isArray(Ee)){let Me=_e.groups;for(let Fe=0,Be=Me.length;Fe<Be;Fe++){let De=Me[Fe],Qe=Ee[De.materialIndex];Qe&&Qe.visible&&g.push(b,_e,Qe,G,Le.z,De)}}else Ee.visible&&g.push(b,_e,Ee,G,Le.z,null)}}let ae=b.children;for(let _e=0,Ee=ae.length;_e<Ee;_e++)Xl(ae[_e],O,G,W)}function Oh(b,O,G,W){let B=b.opaque,ae=b.transmissive,_e=b.transparent;m.setupLightsView(G),Ke===!0&&ce.setGlobalState(_.clippingPlanes,G),W&&Z.viewport(P.copy(W)),B.length>0&&ba(B,O,G),ae.length>0&&ba(ae,O,G),_e.length>0&&ba(_e,O,G),Z.buffers.depth.setTest(!0),Z.buffers.depth.setMask(!0),Z.buffers.color.setMask(!0),Z.setPolygonOffset(!1)}function Bh(b,O,G,W){if((G.isScene===!0?G.overrideMaterial:null)!==null)return;m.state.transmissionRenderTarget[W.id]===void 0&&(m.state.transmissionRenderTarget[W.id]=new Bn(1,1,{generateMipmaps:!0,type:K.has("EXT_color_buffer_half_float")||K.has("EXT_color_buffer_float")?Js:Dn,minFilter:Ti,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:it.workingColorSpace}));let ae=m.state.transmissionRenderTarget[W.id],_e=W.viewport||P;ae.setSize(_e.z*_.transmissionResolutionScale,_e.w*_.transmissionResolutionScale);let Ee=_.getRenderTarget(),Me=_.getActiveCubeFace(),Fe=_.getActiveMipmapLevel();_.setRenderTarget(ae),_.getClearColor($),L=_.getClearAlpha(),L<1&&_.setClearColor(16777215,.5),_.clear(),je&&Re.render(G);let Be=_.toneMapping;_.toneMapping=ai;let De=W.viewport;if(W.viewport!==void 0&&(W.viewport=void 0),m.setupLightsView(W),Ke===!0&&ce.setGlobalState(_.clippingPlanes,W),ba(b,G,W),ue.updateMultisampleRenderTarget(ae),ue.updateRenderTargetMipmap(ae),K.has("WEBGL_multisampled_render_to_texture")===!1){let Qe=!1;for(let ot=0,bt=O.length;ot<bt;ot++){let yt=O[ot],ct=yt.object,Ue=yt.geometry,vt=yt.material,st=yt.group;if(vt.side===xn&&ct.layers.test(W.layers)){let rn=vt.side;vt.side=zt,vt.needsUpdate=!0,zh(ct,G,W,Ue,vt,st),vt.side=rn,vt.needsUpdate=!0,Qe=!0}}Qe===!0&&(ue.updateMultisampleRenderTarget(ae),ue.updateRenderTargetMipmap(ae))}_.setRenderTarget(Ee,Me,Fe),_.setClearColor($,L),De!==void 0&&(W.viewport=De),_.toneMapping=Be}function ba(b,O,G){let W=O.isScene===!0?O.overrideMaterial:null;for(let B=0,ae=b.length;B<ae;B++){let _e=b[B],Ee=_e.object,Me=_e.geometry,Fe=_e.group,Be=_e.material;Be.allowOverride===!0&&W!==null&&(Be=W),Ee.layers.test(G.layers)&&zh(Ee,O,G,Me,Be,Fe)}}function zh(b,O,G,W,B,ae){b.onBeforeRender(_,O,G,W,B,ae),b.modelViewMatrix.multiplyMatrices(G.matrixWorldInverse,b.matrixWorld),b.normalMatrix.getNormalMatrix(b.modelViewMatrix),B.onBeforeRender(_,O,G,W,b,ae),B.transparent===!0&&B.side===xn&&B.forceSinglePass===!1?(B.side=zt,B.needsUpdate=!0,_.renderBufferDirect(G,O,W,B,b,ae),B.side=jn,B.needsUpdate=!0,_.renderBufferDirect(G,O,W,B,b,ae),B.side=xn):_.renderBufferDirect(G,O,W,B,b,ae),b.onAfterRender(_,O,G,W,B,ae)}function Ea(b,O,G){O.isScene!==!0&&(O=Te);let W=ie.get(b),B=m.state.lights,ae=m.state.shadowsArray,_e=B.state.version,Ee=X.getParameters(b,B.state,ae,O,G),Me=X.getProgramCacheKey(Ee),Fe=W.programs;W.environment=b.isMeshStandardMaterial?O.environment:null,W.fog=O.fog,W.envMap=(b.isMeshStandardMaterial?ze:He).get(b.envMap||W.environment),W.envMapRotation=W.environment!==null&&b.envMap===null?O.environmentRotation:b.envMapRotation,Fe===void 0&&(b.addEventListener("dispose",j),Fe=new Map,W.programs=Fe);let Be=Fe.get(Me);if(Be!==void 0){if(W.currentProgram===Be&&W.lightsStateVersion===_e)return Hh(b,Ee),Be}else Ee.uniforms=X.getUniforms(b),b.onBeforeCompile(Ee,_),Be=X.acquireProgram(Ee,Me),Fe.set(Me,Be),W.uniforms=Ee.uniforms;let De=W.uniforms;return(!b.isShaderMaterial&&!b.isRawShaderMaterial||b.clipping===!0)&&(De.clippingPlanes=ce.uniform),Hh(b,Ee),W.needsLights=Hf(b),W.lightsStateVersion=_e,W.needsLights&&(De.ambientLightColor.value=B.state.ambient,De.lightProbe.value=B.state.probe,De.directionalLights.value=B.state.directional,De.directionalLightShadows.value=B.state.directionalShadow,De.spotLights.value=B.state.spot,De.spotLightShadows.value=B.state.spotShadow,De.rectAreaLights.value=B.state.rectArea,De.ltc_1.value=B.state.rectAreaLTC1,De.ltc_2.value=B.state.rectAreaLTC2,De.pointLights.value=B.state.point,De.pointLightShadows.value=B.state.pointShadow,De.hemisphereLights.value=B.state.hemi,De.directionalShadowMap.value=B.state.directionalShadowMap,De.directionalShadowMatrix.value=B.state.directionalShadowMatrix,De.spotShadowMap.value=B.state.spotShadowMap,De.spotLightMatrix.value=B.state.spotLightMatrix,De.spotLightMap.value=B.state.spotLightMap,De.pointShadowMap.value=B.state.pointShadowMap,De.pointShadowMatrix.value=B.state.pointShadowMatrix),W.currentProgram=Be,W.uniformsList=null,Be}function kh(b){if(b.uniformsList===null){let O=b.currentProgram.getUniforms();b.uniformsList=tr.seqWithValue(O.seq,b.uniforms)}return b.uniformsList}function Hh(b,O){let G=ie.get(b);G.outputColorSpace=O.outputColorSpace,G.batching=O.batching,G.batchingColor=O.batchingColor,G.instancing=O.instancing,G.instancingColor=O.instancingColor,G.instancingMorph=O.instancingMorph,G.skinning=O.skinning,G.morphTargets=O.morphTargets,G.morphNormals=O.morphNormals,G.morphColors=O.morphColors,G.morphTargetsCount=O.morphTargetsCount,G.numClippingPlanes=O.numClippingPlanes,G.numIntersection=O.numClipIntersection,G.vertexAlphas=O.vertexAlphas,G.vertexTangents=O.vertexTangents,G.toneMapping=O.toneMapping}function zf(b,O,G,W,B){O.isScene!==!0&&(O=Te),ue.resetTextureUnits();let ae=O.fog,_e=W.isMeshStandardMaterial?O.environment:null,Ee=I===null?_.outputColorSpace:I.isXRRenderTarget===!0?I.texture.colorSpace:Ji,Me=(W.isMeshStandardMaterial?ze:He).get(W.envMap||_e),Fe=W.vertexColors===!0&&!!G.attributes.color&&G.attributes.color.itemSize===4,Be=!!G.attributes.tangent&&(!!W.normalMap||W.anisotropy>0),De=!!G.morphAttributes.position,Qe=!!G.morphAttributes.normal,ot=!!G.morphAttributes.color,bt=ai;W.toneMapped&&(I===null||I.isXRRenderTarget===!0)&&(bt=_.toneMapping);let yt=G.morphAttributes.position||G.morphAttributes.normal||G.morphAttributes.color,ct=yt!==void 0?yt.length:0,Ue=ie.get(W),vt=m.state.lights;if(Ke===!0&&(Y===!0||b!==M)){let Xt=b===M&&W.id===S;ce.setState(W,b,Xt)}let st=!1;W.version===Ue.__version?(Ue.needsLights&&Ue.lightsStateVersion!==vt.state.version||Ue.outputColorSpace!==Ee||B.isBatchedMesh&&Ue.batching===!1||!B.isBatchedMesh&&Ue.batching===!0||B.isBatchedMesh&&Ue.batchingColor===!0&&B.colorTexture===null||B.isBatchedMesh&&Ue.batchingColor===!1&&B.colorTexture!==null||B.isInstancedMesh&&Ue.instancing===!1||!B.isInstancedMesh&&Ue.instancing===!0||B.isSkinnedMesh&&Ue.skinning===!1||!B.isSkinnedMesh&&Ue.skinning===!0||B.isInstancedMesh&&Ue.instancingColor===!0&&B.instanceColor===null||B.isInstancedMesh&&Ue.instancingColor===!1&&B.instanceColor!==null||B.isInstancedMesh&&Ue.instancingMorph===!0&&B.morphTexture===null||B.isInstancedMesh&&Ue.instancingMorph===!1&&B.morphTexture!==null||Ue.envMap!==Me||W.fog===!0&&Ue.fog!==ae||Ue.numClippingPlanes!==void 0&&(Ue.numClippingPlanes!==ce.numPlanes||Ue.numIntersection!==ce.numIntersection)||Ue.vertexAlphas!==Fe||Ue.vertexTangents!==Be||Ue.morphTargets!==De||Ue.morphNormals!==Qe||Ue.morphColors!==ot||Ue.toneMapping!==bt||Ue.morphTargetsCount!==ct)&&(st=!0):(st=!0,Ue.__version=W.version);let rn=Ue.currentProgram;st===!0&&(rn=Ea(W,O,B));let ys=!1,an=!1,cr=!1,Mt=rn.getUniforms(),gn=Ue.uniforms;if(Z.useProgram(rn.program)&&(ys=!0,an=!0,cr=!0),W.id!==S&&(S=W.id,an=!0),ys||M!==b){Z.buffers.depth.getReversed()&&b.reversedDepth!==!0&&(b._reversedDepth=!0,b.updateProjectionMatrix()),Mt.setValue(C,"projectionMatrix",b.projectionMatrix),Mt.setValue(C,"viewMatrix",b.matrixWorldInverse);let Kt=Mt.map.cameraPosition;Kt!==void 0&&Kt.setValue(C,Se.setFromMatrixPosition(b.matrixWorld)),J.logarithmicDepthBuffer&&Mt.setValue(C,"logDepthBufFC",2/(Math.log(b.far+1)/Math.LN2)),(W.isMeshPhongMaterial||W.isMeshToonMaterial||W.isMeshLambertMaterial||W.isMeshBasicMaterial||W.isMeshStandardMaterial||W.isShaderMaterial)&&Mt.setValue(C,"isOrthographic",b.isOrthographicCamera===!0),M!==b&&(M=b,an=!0,cr=!0)}if(B.isSkinnedMesh){Mt.setOptional(C,B,"bindMatrix"),Mt.setOptional(C,B,"bindMatrixInverse");let Xt=B.skeleton;Xt&&(Xt.boneTexture===null&&Xt.computeBoneTexture(),Mt.setValue(C,"boneTexture",Xt.boneTexture,ue))}B.isBatchedMesh&&(Mt.setOptional(C,B,"batchingTexture"),Mt.setValue(C,"batchingTexture",B._matricesTexture,ue),Mt.setOptional(C,B,"batchingIdTexture"),Mt.setValue(C,"batchingIdTexture",B._indirectTexture,ue),Mt.setOptional(C,B,"batchingColorTexture"),B._colorsTexture!==null&&Mt.setValue(C,"batchingColorTexture",B._colorsTexture,ue));let yn=G.morphAttributes;if((yn.position!==void 0||yn.normal!==void 0||yn.color!==void 0)&&se.update(B,G,rn),(an||Ue.receiveShadow!==B.receiveShadow)&&(Ue.receiveShadow=B.receiveShadow,Mt.setValue(C,"receiveShadow",B.receiveShadow)),W.isMeshGouraudMaterial&&W.envMap!==null&&(gn.envMap.value=Me,gn.flipEnvMap.value=Me.isCubeTexture&&Me.isRenderTargetTexture===!1?-1:1),W.isMeshStandardMaterial&&W.envMap===null&&O.environment!==null&&(gn.envMapIntensity.value=O.environmentIntensity),an&&(Mt.setValue(C,"toneMappingExposure",_.toneMappingExposure),Ue.needsLights&&kf(gn,cr),ae&&W.fog===!0&&ee.refreshFogUniforms(gn,ae),ee.refreshMaterialUniforms(gn,W,k,N,m.state.transmissionRenderTarget[b.id]),tr.upload(C,kh(Ue),gn,ue)),W.isShaderMaterial&&W.uniformsNeedUpdate===!0&&(tr.upload(C,kh(Ue),gn,ue),W.uniformsNeedUpdate=!1),W.isSpriteMaterial&&Mt.setValue(C,"center",B.center),Mt.setValue(C,"modelViewMatrix",B.modelViewMatrix),Mt.setValue(C,"normalMatrix",B.normalMatrix),Mt.setValue(C,"modelMatrix",B.matrixWorld),W.isShaderMaterial||W.isRawShaderMaterial){let Xt=W.uniformsGroups;for(let Kt=0,$l=Xt.length;Kt<$l;Kt++){let Di=Xt[Kt];$e.update(Di,rn),$e.bind(Di,rn)}}return rn}function kf(b,O){b.ambientLightColor.needsUpdate=O,b.lightProbe.needsUpdate=O,b.directionalLights.needsUpdate=O,b.directionalLightShadows.needsUpdate=O,b.pointLights.needsUpdate=O,b.pointLightShadows.needsUpdate=O,b.spotLights.needsUpdate=O,b.spotLightShadows.needsUpdate=O,b.rectAreaLights.needsUpdate=O,b.hemisphereLights.needsUpdate=O}function Hf(b){return b.isMeshLambertMaterial||b.isMeshToonMaterial||b.isMeshPhongMaterial||b.isMeshStandardMaterial||b.isShadowMaterial||b.isShaderMaterial&&b.lights===!0}this.getActiveCubeFace=function(){return w},this.getActiveMipmapLevel=function(){return R},this.getRenderTarget=function(){return I},this.setRenderTargetTextures=function(b,O,G){let W=ie.get(b);W.__autoAllocateDepthBuffer=b.resolveDepthBuffer===!1,W.__autoAllocateDepthBuffer===!1&&(W.__useRenderToTexture=!1),ie.get(b.texture).__webglTexture=O,ie.get(b.depthTexture).__webglTexture=W.__autoAllocateDepthBuffer?void 0:G,W.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(b,O){let G=ie.get(b);G.__webglFramebuffer=O,G.__useDefaultFramebuffer=O===void 0};let Vf=C.createFramebuffer();this.setRenderTarget=function(b,O=0,G=0){I=b,w=O,R=G;let W=!0,B=null,ae=!1,_e=!1;if(b){let Me=ie.get(b);if(Me.__useDefaultFramebuffer!==void 0)Z.bindFramebuffer(C.FRAMEBUFFER,null),W=!1;else if(Me.__webglFramebuffer===void 0)ue.setupRenderTarget(b);else if(Me.__hasExternalTextures)ue.rebindTextures(b,ie.get(b.texture).__webglTexture,ie.get(b.depthTexture).__webglTexture);else if(b.depthBuffer){let De=b.depthTexture;if(Me.__boundDepthTexture!==De){if(De!==null&&ie.has(De)&&(b.width!==De.image.width||b.height!==De.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");ue.setupDepthRenderbuffer(b)}}let Fe=b.texture;(Fe.isData3DTexture||Fe.isDataArrayTexture||Fe.isCompressedArrayTexture)&&(_e=!0);let Be=ie.get(b).__webglFramebuffer;b.isWebGLCubeRenderTarget?(Array.isArray(Be[O])?B=Be[O][G]:B=Be[O],ae=!0):b.samples>0&&ue.useMultisampledRTT(b)===!1?B=ie.get(b).__webglMultisampledFramebuffer:Array.isArray(Be)?B=Be[G]:B=Be,P.copy(b.viewport),F.copy(b.scissor),V=b.scissorTest}else P.copy(ye).multiplyScalar(k).floor(),F.copy(Ne).multiplyScalar(k).floor(),V=Xe;if(G!==0&&(B=Vf),Z.bindFramebuffer(C.FRAMEBUFFER,B)&&W&&Z.drawBuffers(b,B),Z.viewport(P),Z.scissor(F),Z.setScissorTest(V),ae){let Me=ie.get(b.texture);C.framebufferTexture2D(C.FRAMEBUFFER,C.COLOR_ATTACHMENT0,C.TEXTURE_CUBE_MAP_POSITIVE_X+O,Me.__webglTexture,G)}else if(_e){let Me=O;for(let Fe=0;Fe<b.textures.length;Fe++){let Be=ie.get(b.textures[Fe]);C.framebufferTextureLayer(C.FRAMEBUFFER,C.COLOR_ATTACHMENT0+Fe,Be.__webglTexture,G,Me)}}else if(b!==null&&G!==0){let Me=ie.get(b.texture);C.framebufferTexture2D(C.FRAMEBUFFER,C.COLOR_ATTACHMENT0,C.TEXTURE_2D,Me.__webglTexture,G)}S=-1},this.readRenderTargetPixels=function(b,O,G,W,B,ae,_e,Ee=0){if(!(b&&b.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Me=ie.get(b).__webglFramebuffer;if(b.isWebGLCubeRenderTarget&&_e!==void 0&&(Me=Me[_e]),Me){Z.bindFramebuffer(C.FRAMEBUFFER,Me);try{let Fe=b.textures[Ee],Be=Fe.format,De=Fe.type;if(!J.textureFormatReadable(Be)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!J.textureTypeReadable(De)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}O>=0&&O<=b.width-W&&G>=0&&G<=b.height-B&&(b.textures.length>1&&C.readBuffer(C.COLOR_ATTACHMENT0+Ee),C.readPixels(O,G,W,B,Pe.convert(Be),Pe.convert(De),ae))}finally{let Fe=I!==null?ie.get(I).__webglFramebuffer:null;Z.bindFramebuffer(C.FRAMEBUFFER,Fe)}}},this.readRenderTargetPixelsAsync=async function(b,O,G,W,B,ae,_e,Ee=0){if(!(b&&b.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Me=ie.get(b).__webglFramebuffer;if(b.isWebGLCubeRenderTarget&&_e!==void 0&&(Me=Me[_e]),Me)if(O>=0&&O<=b.width-W&&G>=0&&G<=b.height-B){Z.bindFramebuffer(C.FRAMEBUFFER,Me);let Fe=b.textures[Ee],Be=Fe.format,De=Fe.type;if(!J.textureFormatReadable(Be))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!J.textureTypeReadable(De))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let Qe=C.createBuffer();C.bindBuffer(C.PIXEL_PACK_BUFFER,Qe),C.bufferData(C.PIXEL_PACK_BUFFER,ae.byteLength,C.STREAM_READ),b.textures.length>1&&C.readBuffer(C.COLOR_ATTACHMENT0+Ee),C.readPixels(O,G,W,B,Pe.convert(Be),Pe.convert(De),0);let ot=I!==null?ie.get(I).__webglFramebuffer:null;Z.bindFramebuffer(C.FRAMEBUFFER,ot);let bt=C.fenceSync(C.SYNC_GPU_COMMANDS_COMPLETE,0);return C.flush(),await Ld(C,bt,4),C.bindBuffer(C.PIXEL_PACK_BUFFER,Qe),C.getBufferSubData(C.PIXEL_PACK_BUFFER,0,ae),C.deleteBuffer(Qe),C.deleteSync(bt),ae}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(b,O=null,G=0){let W=Math.pow(2,-G),B=Math.floor(b.image.width*W),ae=Math.floor(b.image.height*W),_e=O!==null?O.x:0,Ee=O!==null?O.y:0;ue.setTexture2D(b,0),C.copyTexSubImage2D(C.TEXTURE_2D,G,0,0,_e,Ee,B,ae),Z.unbindTexture()};let Gf=C.createFramebuffer(),Wf=C.createFramebuffer();this.copyTextureToTexture=function(b,O,G=null,W=null,B=0,ae=null){ae===null&&(B!==0?(Bs("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),ae=B,B=0):ae=0);let _e,Ee,Me,Fe,Be,De,Qe,ot,bt,yt=b.isCompressedTexture?b.mipmaps[ae]:b.image;if(G!==null)_e=G.max.x-G.min.x,Ee=G.max.y-G.min.y,Me=G.isBox3?G.max.z-G.min.z:1,Fe=G.min.x,Be=G.min.y,De=G.isBox3?G.min.z:0;else{let yn=Math.pow(2,-B);_e=Math.floor(yt.width*yn),Ee=Math.floor(yt.height*yn),b.isDataArrayTexture?Me=yt.depth:b.isData3DTexture?Me=Math.floor(yt.depth*yn):Me=1,Fe=0,Be=0,De=0}W!==null?(Qe=W.x,ot=W.y,bt=W.z):(Qe=0,ot=0,bt=0);let ct=Pe.convert(O.format),Ue=Pe.convert(O.type),vt;O.isData3DTexture?(ue.setTexture3D(O,0),vt=C.TEXTURE_3D):O.isDataArrayTexture||O.isCompressedArrayTexture?(ue.setTexture2DArray(O,0),vt=C.TEXTURE_2D_ARRAY):(ue.setTexture2D(O,0),vt=C.TEXTURE_2D),C.pixelStorei(C.UNPACK_FLIP_Y_WEBGL,O.flipY),C.pixelStorei(C.UNPACK_PREMULTIPLY_ALPHA_WEBGL,O.premultiplyAlpha),C.pixelStorei(C.UNPACK_ALIGNMENT,O.unpackAlignment);let st=C.getParameter(C.UNPACK_ROW_LENGTH),rn=C.getParameter(C.UNPACK_IMAGE_HEIGHT),ys=C.getParameter(C.UNPACK_SKIP_PIXELS),an=C.getParameter(C.UNPACK_SKIP_ROWS),cr=C.getParameter(C.UNPACK_SKIP_IMAGES);C.pixelStorei(C.UNPACK_ROW_LENGTH,yt.width),C.pixelStorei(C.UNPACK_IMAGE_HEIGHT,yt.height),C.pixelStorei(C.UNPACK_SKIP_PIXELS,Fe),C.pixelStorei(C.UNPACK_SKIP_ROWS,Be),C.pixelStorei(C.UNPACK_SKIP_IMAGES,De);let Mt=b.isDataArrayTexture||b.isData3DTexture,gn=O.isDataArrayTexture||O.isData3DTexture;if(b.isDepthTexture){let yn=ie.get(b),Xt=ie.get(O),Kt=ie.get(yn.__renderTarget),$l=ie.get(Xt.__renderTarget);Z.bindFramebuffer(C.READ_FRAMEBUFFER,Kt.__webglFramebuffer),Z.bindFramebuffer(C.DRAW_FRAMEBUFFER,$l.__webglFramebuffer);for(let Di=0;Di<Me;Di++)Mt&&(C.framebufferTextureLayer(C.READ_FRAMEBUFFER,C.COLOR_ATTACHMENT0,ie.get(b).__webglTexture,B,De+Di),C.framebufferTextureLayer(C.DRAW_FRAMEBUFFER,C.COLOR_ATTACHMENT0,ie.get(O).__webglTexture,ae,bt+Di)),C.blitFramebuffer(Fe,Be,_e,Ee,Qe,ot,_e,Ee,C.DEPTH_BUFFER_BIT,C.NEAREST);Z.bindFramebuffer(C.READ_FRAMEBUFFER,null),Z.bindFramebuffer(C.DRAW_FRAMEBUFFER,null)}else if(B!==0||b.isRenderTargetTexture||ie.has(b)){let yn=ie.get(b),Xt=ie.get(O);Z.bindFramebuffer(C.READ_FRAMEBUFFER,Gf),Z.bindFramebuffer(C.DRAW_FRAMEBUFFER,Wf);for(let Kt=0;Kt<Me;Kt++)Mt?C.framebufferTextureLayer(C.READ_FRAMEBUFFER,C.COLOR_ATTACHMENT0,yn.__webglTexture,B,De+Kt):C.framebufferTexture2D(C.READ_FRAMEBUFFER,C.COLOR_ATTACHMENT0,C.TEXTURE_2D,yn.__webglTexture,B),gn?C.framebufferTextureLayer(C.DRAW_FRAMEBUFFER,C.COLOR_ATTACHMENT0,Xt.__webglTexture,ae,bt+Kt):C.framebufferTexture2D(C.DRAW_FRAMEBUFFER,C.COLOR_ATTACHMENT0,C.TEXTURE_2D,Xt.__webglTexture,ae),B!==0?C.blitFramebuffer(Fe,Be,_e,Ee,Qe,ot,_e,Ee,C.COLOR_BUFFER_BIT,C.NEAREST):gn?C.copyTexSubImage3D(vt,ae,Qe,ot,bt+Kt,Fe,Be,_e,Ee):C.copyTexSubImage2D(vt,ae,Qe,ot,Fe,Be,_e,Ee);Z.bindFramebuffer(C.READ_FRAMEBUFFER,null),Z.bindFramebuffer(C.DRAW_FRAMEBUFFER,null)}else gn?b.isDataTexture||b.isData3DTexture?C.texSubImage3D(vt,ae,Qe,ot,bt,_e,Ee,Me,ct,Ue,yt.data):O.isCompressedArrayTexture?C.compressedTexSubImage3D(vt,ae,Qe,ot,bt,_e,Ee,Me,ct,yt.data):C.texSubImage3D(vt,ae,Qe,ot,bt,_e,Ee,Me,ct,Ue,yt):b.isDataTexture?C.texSubImage2D(C.TEXTURE_2D,ae,Qe,ot,_e,Ee,ct,Ue,yt.data):b.isCompressedTexture?C.compressedTexSubImage2D(C.TEXTURE_2D,ae,Qe,ot,yt.width,yt.height,ct,yt.data):C.texSubImage2D(C.TEXTURE_2D,ae,Qe,ot,_e,Ee,ct,Ue,yt);C.pixelStorei(C.UNPACK_ROW_LENGTH,st),C.pixelStorei(C.UNPACK_IMAGE_HEIGHT,rn),C.pixelStorei(C.UNPACK_SKIP_PIXELS,ys),C.pixelStorei(C.UNPACK_SKIP_ROWS,an),C.pixelStorei(C.UNPACK_SKIP_IMAGES,cr),ae===0&&O.generateMipmaps&&C.generateMipmap(vt),Z.unbindTexture()},this.initRenderTarget=function(b){ie.get(b).__webglFramebuffer===void 0&&ue.setupRenderTarget(b)},this.initTexture=function(b){b.isCubeTexture?ue.setTextureCube(b,0):b.isData3DTexture?ue.setTexture3D(b,0):b.isDataArrayTexture||b.isCompressedArrayTexture?ue.setTexture2DArray(b,0):ue.setTexture2D(b,0),Z.unbindTexture()},this.resetState=function(){w=0,R=0,I=null,Z.reset(),ge.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Tn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=it._getDrawingBufferColorSpace(e),t.unpackColorSpace=it._getUnpackColorSpace()}};var Zt=Object.freeze({chalk:16117464,teal:2645088,deep:1588301,moss:5081976,gold:14460501,copper:10707265,ink:2308168}),ir={chalk:new Tt({name:"chalk-sail",color:Zt.chalk,roughness:.82,side:xn}),stone:new Tt({name:"teal-basalt",color:Zt.teal,roughness:.94,flatShading:!0}),dark:new Tt({name:"deep-basalt",color:Zt.deep,roughness:.92,flatShading:!0}),moss:new Tt({name:"moss",color:Zt.moss,roughness:.98}),gold:new Tt({name:"aged-brass",color:Zt.gold,roughness:.42,metalness:.58}),copper:new Tt({name:"ochre-ceramic",color:Zt.copper,roughness:.85}),ink:new Tt({name:"navy-cloth",color:Zt.ink,roughness:.9}),glow:new Tt({name:"aether-glass",color:10941148,emissive:5287070,emissiveIntensity:.8,roughness:.28,metalness:.15}),skin:new Tt({name:"pilot-skin",color:13212542,roughness:.9}),turf:new Tt({name:"weathered-turf",color:6720632,roughness:1,flatShading:!0}),sand:new Tt({name:"mineral-sand",color:10070668,roughness:1,flatShading:!0})},Ul={turf:ir.turf.clone(),sand:ir.sand.clone()};Object.assign(Ul.turf,{name:"terrain-patch-turf",polygonOffset:!0,polygonOffsetFactor:-1,polygonOffsetUnits:-1});Object.assign(Ul.sand,{name:"terrain-patch-sand",polygonOffset:!0,polygonOffsetFactor:-2,polygonOffsetUnits:-2});var fx=i=>ir[i]||ir.stone,_f=i=>{let e=i+1>>>0;return()=>(e=Math.imul(1664525,e)+1013904223>>>0,e/4294967296)},Ze=(i,e,t,n)=>{let s=new ht(i,typeof e=="string"?fx(e):e);return t&&s.position.set(...t),n&&s.scale.set(...n),s.castShadow=!0,s.receiveShadow=!0,s},kt=(i,e,t,n=10)=>new Qn(i,e,t,n);function Ut(i,e,t,n="gold",s=6){let r=new D(...i),a=new D(...e),o=a.clone().sub(r),l=Ze(kt(t,t,o.length(),s),n);return l.position.copy(r).add(a).multiplyScalar(.5),l.quaternion.setFromUnitVectors(new D(0,1,0),o.normalize()),l}function Un(i,e,t="gold",n=32){return Ze(new Pn(i,e,5,n),t)}function xf(i){let e=Object.keys(i[0].attributes),t=new _t;for(let n of e){let s=i.map(l=>l.attributes[n]),r=s[0].array.constructor,a=new r(s.reduce((l,c)=>l+c.array.length,0)),o=0;for(let l of s)a.set(l.array,o),o+=l.array.length;t.setAttribute(n,new wt(a,s[0].itemSize,s[0].normalized))}return t.computeBoundingSphere(),t}function Nl(i){i.updateMatrixWorld(!0);let e=new Map,t=[];i.traverse(n=>{if(n.isMesh&&!n.isInstancedMesh&&!n.isSkinnedMesh&&!Array.isArray(n.material)){let s=(n.geometry.index?n.geometry.toNonIndexed():n.geometry.clone()).applyMatrix4(n.matrixWorld),r=n.material.uuid;e.has(r)||e.set(r,{material:n.material,geometries:[]}),e.get(r).geometries.push(s),t.push(n)}});for(let n of t)n.removeFromParent();for(let{material:n,geometries:s}of e.values()){let r=Ze(xf(s),n);r.name=n.name+"-merged",i.add(r);for(let a of s)a.dispose()}return i}function px(i,e,t){let n=new Et;n.name=`landmark-${e}`;let s=[],r=i*1.04+6,a=[2.45,-.65,1.1,2.8,-1.8,.3][e%6],o=Math.sin(a)*r,l=Math.cos(a)*r,c=Ze(kt(5.7,2.2,5.5,t?9:5),"stone",[o,-3.2,l]);n.add(c);let u=Ut([Math.sin(a)*i*.8,-3.5,Math.cos(a)*i*.8],[o,-3.5,l],3.1,"dark",6);n.add(u);let h=(d,p,y,g=.35,m="chalk")=>{n.add(Ze(kt(g,g*1.2,y,t?8:5),m,[d,y/2,p])),s.push({shape:"cylinder",x:d,z:p,y:0,radius:g*1.2,height:y})},f=(d,p)=>[o+d,l+p];if(e===0){for(let y of[-3.6,3.6])for(let g of[-2.8,2.8])h(...f(y,g),4.6,.15,"gold");let d=new $s;d.moveTo(-4.2,0),d.lineTo(0,2.1),d.lineTo(4.2,0),d.lineTo(4.2,-.065),d.lineTo(0,2.035),d.lineTo(-4.2,-.065),d.closePath();let p=Ze(new sa(d,{depth:6.4,bevelEnabled:!1}),"chalk",[o,4.5,l-3.2]);n.add(p),n.add(Ut([o-4.2,4.5,l-3.2],[o,6.6,l-3.2],.055),Ut([o,6.6,l-3.2],[o+4.2,4.5,l-3.2],.055),Ut([o,6.6,l-3.2],[o,6.6,l+3.2],.055));for(let y=0;y<5;y++){let g=Ze(new Cn(.23,.75,3),"copper",[o-2+y,4.3,l-3.25]);g.rotation.z=Math.PI,n.add(g)}}else if(e===1){for(let y of[-3.3,3.3])h(...f(y,0),5.7,.4);let d=Ze(new Pn(3.3,.32,5,t?24:12,Math.PI),"chalk",[o,5.7,l]);n.add(d);let p=Un(1.25,.095);p.position.set(o,5.9,l),n.add(p),n.add(Ut([o,5.7,l],[o,9.6,l],.075));for(let y of[-1,1]){let g=Ze(new It(1.6,.35,.1),"gold",[o+y*.8,9.2,l]);g.rotation.z=y*.12,n.add(g)}}else if(e===2){for(let p of[-3,3]){for(let y of[-3,3])h(...f(y,p),p<0?5.8:4.6,.55);n.add(Ze(new It(7,.65,1.3),"chalk",[o,p<0?5.7:4.5,l+p]))}for(let p=0;p<5;p++){let y=Ze(new It(6.4,.16,1),"sand",[o,.035,l-2.4+p*1.2]);n.add(y)}let d=Ze(new Ki(1.15,0),"dark",[o+4.5,.5,l+3.3],[1,.5,1]);n.add(d),s.push({shape:"cylinder",x:o+4.5,z:l+3.3,y:0,radius:1.2,height:1.1})}else if(e===3){for(let d of[-3.6,3.6])h(...f(d,0),7.8,.4,"dark");n.add(Ut([o-3.6,7.8,l],[o,10,l],.16),Ut([o,10,l],[o+3.6,7.8,l],.16)),n.add(Ze(new In(1.1,0),"glow",[o,9.1,l],[.6,1.7,.6]));for(let d=0;d<3;d++){let p=Un(1.35+d*.35,.055);p.position.set(o,7.1+d*.75,l),p.rotation.x=Math.PI/2,n.add(p)}n.add(Ut([o,10,l],[o,13,l],.055))}else if(e===4){for(let p=0;p<7;p++){let y=p/6*Math.PI*1.45-.7,g=o+Math.sin(y)*4.2,m=l+Math.cos(y)*4.2;if(h(g,m,5.5+p%2*.6,.42),n.add(Ze(kt(.65,.65,.22,6),"gold",[g,5.6+p%2*.6,m])),p<6){let E=(p+1)/6*Math.PI*1.45-.7;n.add(Ut([g,5.45,m],[o+Math.sin(E)*4.2,5.45,l+Math.cos(E)*4.2],.22,"chalk"))}}let d=Un(2.4,.08);d.position.set(o,.11,l),d.rotation.x=Math.PI/2,n.add(d)}else{for(let y of[-3.5,3.5])h(...f(y,0),5.3,.45);let d=Ze(new Pn(3.5,.12,5,t?28:14,Math.PI),"gold",[o,5.3,l]);n.add(d);for(let y=1;y<4;y++){let g=d.clone();g.rotation.y=y*Math.PI/4,n.add(g)}let p=Un(3.5,.12);p.rotation.x=Math.PI/2,p.position.set(o,5.3,l),n.add(p),n.add(Ze(new In(.75,0),"glow",[o,6.5,l]))}return n.userData.obstacles=s,n}function yf(i,e,t,n){let s=new Et;s.name=`island-${e}-lod-${n}`;let r=_f(e*37+11),a=n?40:18,o=new Tt({name:`island-${e}-terrace`,color:[7904390,6590082,6323326][t%3],roughness:1,flatShading:!0});s.add(Ze(kt(i,i*.98,.64,a),o,[0,-.32,0])),s.add(Ze(kt(i*.98,i*.78,i*.25,a),"stone",[0,-i*.125-.58,0])),s.add(Ze(kt(i*.79,i*.46,i*.31,a),"dark",[0,-i*.405-.5,0]));let l=Ze(new Cn(i*.48,i*.55,a),"stone",[0,-i*.83-.42,0]);l.rotation.z=Math.PI,s.add(l);for(let u=0;u<(n?22:9);u++){let h=u*Math.PI*2/(n?22:9)+r()*.1,f=i*(.88+r()*.07),d=i*(.12+r()*.2),p=Ze(kt(i*.1,i*.07,d,5),"stone",[Math.sin(h)*f,-d*.45-.25,Math.cos(h)*f]);p.rotation.y=h,p.rotation.z=(r()-.5)*.24,s.add(p)}if(n){for(let h=0;h<Math.max(9,Math.round(i*.6));h++){let f=r()*Math.PI*2,d=i*(.23+r()*.62),p=Ze(kt(1,1,.05,9),h%3?Ul.turf:Ul.sand,[Math.sin(f)*d,-.005,Math.cos(f)*d],[1.5+r()*i*.12,1,1.2+r()*i*.1]);p.rotation.y=r()*6,p.castShadow=!1,s.add(p)}let u=Un(i*.72,.055,"copper",48);u.rotation.x=-Math.PI/2,u.position.y=.025,s.add(u);for(let h=0;h<10;h++){let f=Ze(new It(.32,.05,.9),"gold",[0,.025,i*(.17+h*.063)]);f.rotation.y=(e%3-1)*.1,s.add(f)}for(let h=0;h<8;h++){let f=h*Math.PI/4+.2,d=i*.84,p=Ze(new Ki(i*.045,0),"chalk",[Math.sin(f)*d,.08,Math.cos(f)*d],[1,.45,1]);p.rotation.set(.2,f,.2),s.add(p)}for(let h=0;h<12;h++){let f=h*Math.PI/6,d=i*.84,p=Ze(new It(1.5,.13,2.1),"sand",[Math.sin(f)*d,.025,Math.cos(f)*d]);p.rotation.y=f,s.add(p)}}let c=px(i,e,n);if(s.userData.obstacles=c.userData.obstacles,s.add(c),Nl(s),n){let u=mx({radius:i,count:Math.round(i*2.2)+e*3,seed:e});s.add(u)}return s}function vf({radius:i=12,region:e=0,index:t=0}={}){let n=new Et;n.name=`island-${t}`;let s=typeof e=="number"?e:{\u8D77\u98A8:0,\u65B7\u6A4B:1,\u96F7\u96F2:2,breeze:0,bridge:1,storm:2}[e]||0,r=new zr;return r.addLevel(yf(i,t,s,!0),0),r.addLevel(yf(i,t,s,!1),145),n.add(r),n.userData={radius:i,region:s,index:t,collider:{shape:"cylinder",radius:i,height:.6,top:0},obstacles:r.levels[0].object.userData.obstacles,assetId:`aetherwake.island.${t+1}`,lodDistances:[0,145]},n}function mx({radius:i=12,count:e=24,seed:t=0}={}){let n=new Et;n.name="windgrass-cluster";let s=_f(t*41+9),r=new gt,a=new kn(new Cn(.24,.9,3),ir.moss,e*3),o=new kn(new ei(.09,0),ir.gold,e);a.receiveShadow=!0;for(let l=0;l<e;l++){let c=s()*Math.PI*2,u=i*(.58+s()*.31),h=Math.sin(c)*u,f=Math.cos(c)*u;for(let d=0;d<3;d++)r.position.set(h+d*.23,.75,f+d*.18),r.rotation.set(.18,s()*6,.2+s()*.25),r.scale.set(1.7+s(),1.7+s()*1.8,2.2),r.updateMatrix(),a.setMatrixAt(l*3+d,r.matrix);r.position.set(h,1.7,f),r.rotation.set(0,0,0),r.scale.setScalar(1.8),r.updateMatrix(),o.setMatrixAt(l,r.matrix)}return a.name="instanced-grass",o.name="instanced-amber-seeds",n.add(a,o),n}function Sh(i=0){let e=typeof i=="number"?i%3:{wind:0,solar:1,astral:2}[i]??0,t=new Et;t.name=["wind-observatory","solar-observatory","astral-observatory"][e],t.add(Ze(kt(2.05,2.3,.3,12),"chalk",[0,.15,0])),t.add(Ze(kt(1.6,1.9,.18,12),"copper",[0,.39,0]));let n=Un(1.45,.07);n.rotation.x=Math.PI/2,n.position.y=.51,t.add(n);for(let r=0;r<8;r++){let a=r*Math.PI/4;t.add(Ut([Math.sin(a)*1.1,.53,Math.cos(a)*1.1],[Math.sin(a)*1.38,.53,Math.cos(a)*1.38],.03))}for(let r of[-1,1])t.add(Ze(kt(.19,.3,2.4,8),"chalk",[r*1,1.65,0])),t.add(Ze(kt(.3,.3,.13,8),"gold",[r*1,2.8,0]));t.add(Ut([-1,2.8,0],[1,2.8,0],.13));let s=Ze(new In(.47,0),"glow",[0,2.15,0],[.8,1.4,.8]);if(t.add(s),e===0){let r=Un(1.1,.085);r.position.y=2.15,r.rotation.y=.45,t.add(r),t.add(Ut([0,.5,0],[0,3.7,0],.08));for(let a=0;a<4;a++){let o=a*Math.PI/2,l=Ze(new It(.65,.18,.08),"gold",[Math.cos(o)*.5,3.5+Math.sin(o)*.5,0]);l.rotation.z=o+.35,t.add(l)}}if(e===1){for(let r=0;r<3;r++){let a=Un(.78+r*.18,.055);a.position.y=2.15,a.rotation.set(r*.8,.4+r*.65,.6),t.add(a)}for(let r=0;r<8;r++){let a=r*Math.PI/4;t.add(Ut([Math.cos(a)*1.05,2.15+Math.sin(a)*1.05,0],[Math.cos(a)*1.35,2.15+Math.sin(a)*1.35,0],.065))}}if(e===2){for(let r=0;r<3;r++){let a=Un(1.12,.065);a.position.y=2.2,a.rotation.set(r*Math.PI/3,.3+r,.5),t.add(a)}t.add(Ze(new Cn(.6,1,8),"gold",[0,3.65,0]));for(let r=0;r<4;r++){let a=r*Math.PI/2;t.add(Ze(new In(.16,0),"glow",[Math.sin(a)*1.48,2.6,Math.cos(a)*1.48]))}}return Nl(t),t.userData={assetId:`aetherwake.station.${e+1}`,collider:{shape:"cylinder",radius:1.45,height:4.2},type:e},t}function Mf(i=0){let e=(i%12+12)%12,t=new Et;t.name=`relic-${String(e+1).padStart(2,"0")}`;let n=[new In(.42,0),new ei(.42,0),new Ki(.4,0)],s=Ze(n[e%3],"glow",[0,.7,0],[.8+e%4*.1,1.15+e%3*.15,.65]);s.rotation.set(e*.15,e*.38,0),t.add(s);for(let o=0;o<3;o++)o!==e%3&&n[o].dispose();let r=Un(.65,.045);r.position.y=.7,r.rotation.set(e%2?Math.PI/2:0,e*.28,e%3*.3),t.add(r);let a=3+e%4;for(let o=0;o<a;o++){let l=o*Math.PI*2/a+e*.31,c=Ze(new It(.11,.23,.12),"gold",[Math.cos(l)*.62,.7+Math.sin(l)*.62,0]);c.rotation.z=l,t.add(c)}if(e>=6){let o=Un(.34,.025,"chalk",16);o.position.y=.7,o.rotation.y=Math.PI/2,t.add(o)}return t.add(Ze(kt(.32,.43,.12,6),"dark",[0,.06,0])),Nl(t),t.userData={assetId:`aetherwake.relic.${String(e+1).padStart(2,"0")}`,variant:e,collider:{shape:"sphere",radius:1.15,center:[0,.7,0]}},t}function bh(i="tailwind",{radius:e=3,height:t=9,length:n=14}={}){let s={steady:"tailwind",thermal:"updraft",side:"crosswind",tail:"tailwind",up:"updraft",cross:"crosswind"}[i]||i,r=new Et;r.name=`wind-${s}`;let a=new un({name:`wind-${s}-light`,color:s==="updraft"?16766873:s==="crosswind"?12498677:12381918,transparent:!0,opacity:.48,depthWrite:!1}),o=s==="updraft"?24:28,l=new kn(new Cn(.18,.85,4),a,o),c=new gt;l.name="wind-direction-volume",r.add(l);let u=0,h=[];if(s==="updraft")for(let d=0;d<3;d++){let p=Ze(new Pn(e*.78,.055,4,40,Math.PI*1.65),a);p.rotation.x=-Math.PI/2,p.position.y=d*t/3,p.castShadow=!1,h.push(p),r.add(p)}else for(let d of[-1,1]){let p=new wi(Array.from({length:9},(g,m)=>new D(d*e*.55+Math.sin(m*.8)*e*.08,.6+Math.sin(m*.6)*.25,-n/2+m*n/8))),y=Ze(new Qi(p,20,.045,4,!1),a);y.castShadow=!1,r.add(y)}let f=(d=0)=>{u+=d;for(let p=0;p<o;p++){let y=(u*.13+p/o)%1,g=p*2.399+u*.25;s==="updraft"?(c.position.set(Math.cos(g)*e*.78,y*t,Math.sin(g)*e*.78),c.rotation.set(0,0,0)):(c.position.set(Math.sin(p*4.3)*e*.7,1.6+Math.sin(p*3.1)*1.7,(y-.5)*n),c.rotation.set(Math.PI/2,0,s==="crosswind"?Math.sin(u+p)*.3:0)),c.scale.setScalar(.7+Math.sin(y*Math.PI)*.5),c.updateMatrix(),l.setMatrixAt(p,c.matrix)}l.instanceMatrix.needsUpdate=!0;for(let p=0;p<h.length;p++)h[p].position.y=(u*1.4+p*t/3)%t,h[p].rotation.z=u*.25+p*2};return f(),r.userData={type:s,update:f,assetId:`aetherwake.wind.${s}`,distribution:{radius:e,height:t,length:n},fixedParticleSize:!0},r}function Rt(i,e,t){let n=[];for(let s of t){let r=new Yt().setFromEuler(new hn(...s));n.push(r.x,r.y,r.z,r.w)}return new ii(`${i}.quaternion`,e,n)}function Sf(){let i=new Et;i.name="aether-pilot";let e=new fn;e.name="root";let t=new fn;t.name="hips",t.position.y=.82,e.add(t);let n=new fn;n.name="torso",n.position.y=.22,t.add(n);let s=new fn;s.name="head",s.position.y=.55,n.add(s);let r=new fn;r.name="leftArm",r.position.set(-.32,.32,0),n.add(r);let a=new fn;a.name="rightArm",a.position.set(.32,.32,0),n.add(a);let o=new fn;o.name="leftLeg",o.position.set(-.15,-.05,0),t.add(o);let l=new fn;l.name="rightLeg",l.position.set(.15,-.05,0),t.add(l);let c=[e,t,n,s,r,a,o,l];e.updateMatrixWorld(!0);let u=[],h=(L,H,N,k,Q)=>{L.index&&(L=L.toNonIndexed());let le=new qe().compose(new D(...N),new Yt,new D(...k));L.applyMatrix4(le).applyMatrix4(H.matrixWorld);let ye=L.attributes.position.count,Ne=new Uint16Array(ye*4),Xe=new Float32Array(ye*4),et=new Float32Array(ye*3),Ke=new ke(Q);for(let Y=0;Y<ye;Y++)Ne[Y*4]=c.indexOf(H),Xe[Y*4]=1,et[Y*3]=Ke.r,et[Y*3+1]=Ke.g,et[Y*3+2]=Ke.b;L.setAttribute("skinIndex",new wt(Ne,4)),L.setAttribute("skinWeight",new wt(Xe,4)),L.setAttribute("color",new wt(et,3)),u.push(L)};h(kt(.29,.24,.6,8),n,[0,.22,0],[1,1,1],Zt.chalk),h(new It(.42,.16,.33),t,[0,.04,0],[1,1,1],Zt.copper),h(new ti(.235,10,7),s,[0,.08,.035],[1,1.05,1],13212542),h(new ti(.25,10,6,0,Math.PI*2,0,Math.PI*.57),s,[0,.11,.02],[1,1,1],Zt.ink),h(new It(.4,.11,.12),s,[0,.12,.23],[1,1,1],Zt.gold),h(new It(.42,.5,.23),n,[0,.25,-.24],[1,1,1],Zt.copper);for(let L of[r,a])h(kt(.105,.08,.55,7),L,[0,-.2,0],[1,1,1],Zt.chalk),h(new ti(.09,8,5),L,[0,-.48,0],[1,1,1],13212542);for(let L of[o,l])h(kt(.105,.08,.59,7),L,[0,-.3,0],[1,1,1],Zt.ink),h(new It(.19,.16,.33),L,[0,-.64,.065],[1,1,1],Zt.copper);let f=xf(u),d=new Tt({name:"pilot-vertex-palette",vertexColors:!0,roughness:.8}),p=new kr(f,d);p.name="pilot-rigged-body",p.add(e),p.bind(new Vr(c)),p.castShadow=!0,i.add(p);for(let L of u)L.dispose();let y=new Et;y.name="ivory-glider";let g=7,m=17,E=[],v=[],_=[];for(let L=0;L<g;L++)for(let H=0;H<m;H++){let N=H/(m-1),k=L/(g-1),Q=(N-.5)*4.6,le=(k-.5)*1.65-.12;E.push(Q,2.13+.4*Math.sin(N*Math.PI)+.16*Math.sin(k*Math.PI),le),v.push(N,k)}for(let L=0;L<g-1;L++)for(let H=0;H<m-1;H++){let N=L*m+H;_.push(N,N+1,N+m,N+1,N+m+1,N+m)}let T=g*m,w=[..._];for(let L=0;L<T;L++)E.push(E[L*3],E[L*3+1]-.026,E[L*3+2]),v.push(v[L*2],v[L*2+1]);for(let L=0;L<w.length;L+=3)_.push(w[L]+T,w[L+2]+T,w[L+1]+T);let R=[];for(let L=0;L<m;L++)R.push(L);for(let L=1;L<g;L++)R.push(L*m+m-1);for(let L=m-2;L>=0;L--)R.push((g-1)*m+L);for(let L=g-2;L>0;L--)R.push(L*m);for(let L=0;L<R.length;L++){let H=R[L],N=R[(L+1)%R.length];_.push(H,N,H+T,N,N+T,H+T)}let I=new _t;I.setAttribute("position",new tt(E,3)),I.setAttribute("uv",new tt(v,2)),I.setIndex(_),I.computeVertexNormals(),y.add(Ze(I,"chalk"));for(let L of[-1,-.5,0,.5,1]){let H=L*2.3,N=2.13+.4*Math.sin((L+1)*Math.PI/2);y.add(Ut([H,N,-.94],[H,N,.7],.023,"gold"))}y.add(Ut([-2.3,2.13,-.94],[0,2.53,-.94],.035,"gold"),Ut([0,2.53,-.94],[2.3,2.13,-.94],.035,"gold"));for(let L of[-1,1])y.add(Ut([L*1.65,2.35,-.45],[L*.38,1.2,0],.016,"ink"),Ut([L*1.65,2.35,.45],[L*.38,1.2,0],.016,"ink"));let S=Ze(new It(.35,.025,1.58),"copper",[0,2.55,-.12]);y.add(S),Nl(y),y.visible=!1,i.add(y);let M=[new Ln("idle",2.4,[Rt("torso",[0,1.2,2.4],[[.025,0,0],[-.025,0,0],[.025,0,0]]),Rt("leftArm",[0,1.2,2.4],[[0,0,-.09],[.04,0,-.06],[0,0,-.09]]),Rt("rightArm",[0,1.2,2.4],[[0,0,.09],[-.04,0,.06],[0,0,.09]])]),new Ln("run",.7,[Rt("leftLeg",[0,.175,.35,.525,.7],[[.6,0,0],[0,0,0],[-.6,0,0],[0,0,0],[.6,0,0]]),Rt("rightLeg",[0,.175,.35,.525,.7],[[-.6,0,0],[0,0,0],[.6,0,0],[0,0,0],[-.6,0,0]]),Rt("leftArm",[0,.35,.7],[[-.5,0,-.08],[.5,0,-.08],[-.5,0,-.08]]),Rt("rightArm",[0,.35,.7],[[.5,0,.08],[-.5,0,.08],[.5,0,.08]])]),new Ln("jump",.45,[Rt("torso",[0,.2,.45],[[.12,0,0],[-.12,0,0],[-.05,0,0]]),Rt("leftLeg",[0,.2,.45],[[0,0,0],[-.5,0,0],[.15,0,0]]),Rt("rightLeg",[0,.2,.45],[[0,0,0],[-.45,0,0],[.1,0,0]]),Rt("leftArm",[0,.3,.45],[[0,0,0],[0,0,-1.4],[0,0,-1.2]]),Rt("rightArm",[0,.3,.45],[[0,0,0],[0,0,1.4],[0,0,1.2]])]),new Ln("glide",2,[Rt("torso",[0,1,2],[[.15,0,0],[.2,0,0],[.15,0,0]]),Rt("leftArm",[0,1,2],[[0,0,-1.7],[.06,0,-1.65],[0,0,-1.7]]),Rt("rightArm",[0,1,2],[[0,0,1.7],[-.06,0,1.65],[0,0,1.7]]),Rt("leftLeg",[0,1,2],[[.25,0,-.08],[.32,0,-.06],[.25,0,-.08]]),Rt("rightLeg",[0,1,2],[[.32,0,.08],[.25,0,.06],[.32,0,.08]])]),new Ln("land",.4,[Rt("torso",[0,.14,.4],[[.15,0,0],[.35,0,0],[0,0,0]]),Rt("leftLeg",[0,.14,.4],[[.2,0,0],[-.3,0,0],[0,0,0]]),Rt("rightLeg",[0,.14,.4],[[.2,0,0],[-.3,0,0],[0,0,0]])])],P=new da(i),F=Object.fromEntries(M.map(L=>[L.name,P.clipAction(L)]));for(let L of["jump","land"])F[L].setLoop(Tl,1),F[L].clampWhenFinished=!0;let V="idle";F.idle.play();let $=(L,H={})=>{let N=typeof H=="string"?{mode:H}:H,k=N.mode||N.state||(N.gliding?"glide":N.grounded===!1?"jump":N.speed>.5?"run":"idle"),Q=F[k]?k:"idle";Q!==V&&(F[Q].reset().play(),F[V].crossFadeTo(F[Q],.16,!1),V=Q),y.visible=Q==="glide",Q==="run"&&(F.run.timeScale=Math.max(.7,Math.min(1.7,(N.speed||5)/5))),P.update(Math.min(L,.1))};return i.userData={assetId:"aetherwake.pilot",skeleton:c.map(L=>L.name),clips:M.map(L=>L.name),collider:{shape:"capsule",radius:.3,height:1.85},rootMotion:!1},{group:i,mixer:P,clips:M,update:$,sail:y}}var Nt=D;function bf(i,e,t=ve){if(!i)return null;let n=e.courseStages?.[i.id]||0,s=i.stages||[],r=n>=s.length?0:n,a=s[r],o=t.islands.find(f=>f.id===a?.fromIslandId),l=t.islands.find(f=>f.id===a?.toIslandId),c=o?{...i,x:o.x+18,y:o.y+22,z:o.z-18}:i,u=a?.gates||i.gates||[],h=e.challengeProgress?.[i.id]||0;return{entry:c,stage:a,stageIndex:r,completed:e.challenges?.includes(i.id)||!1,key:`${i.id}:${r}`,points:[c,...u,l||c],winds:(a?.winds||i.winds||[]).filter(f=>f.gate===h),progress:h}}function gx(i){let e=i.challengeHint||i.trackedHint||i.surveyHint,t=i.challengeHint?i.challengeHint.landing?`\u7B2C ${i.challengeHint.stage}/${i.challengeHint.stageTotal} \u6BB5 \xB7 \u843D\u5CF6\u4EA4\u4ED8`:`\u7B2C ${i.challengeHint.stage}/${i.challengeHint.stageTotal} \u6BB5 \xB7 \u6E2C\u98A8\u9580 ${i.challengeHint.step}/${i.challengeHint.total-1}`:i.trackedHint?i.trackedHint.transit?`\u5B89\u5168\u63A5\u99C1 ${i.trackedHint.transitStep}/${i.trackedHint.transitTotal}`:`${i.trackedHint.stageName||i.trackedHint.name}\u5165\u53E3`:i.surveyHint?`${i.surveyHint.name} ${i.surveyHint.step}/${i.surveyHint.total}`:null;return{target:e,label:t,surveyTarget:i.activeChallenge?null:i.trackedHint?i.trackedHint.transit?i.trackedHint:null:i.surveyHint,mainRouteVisible:!i.activeChallenge&&!i.trackedHint}}function yx(i,e){return!!(i&&e&&e.width>0&&e.height>0&&i.left<e.right+4&&i.right>e.left-4&&i.top<e.bottom+4&&i.bottom>e.top-4)}var Eh=class{constructor(e,t,n=globalThis.ResizeObserver,s=[]){this.label=e,this.card=t,this.cards=[t,...s].filter(Boolean),this.anchor=null,this.size=null,this.origin={x:0,y:0},this.cardRect=null,this.cardRects=[],this.observer=new n(()=>this.refresh()),this.observer.observe(e);for(let r of this.cards)this.observer.observe(r)}refresh(){this.cardRects=this.cards.map(t=>t.getBoundingClientRect()),this.cardRect=this.cardRects[0]||null;let e=this.label.getBoundingClientRect();e.width>0&&e.height>0&&(this.size={width:e.width,height:e.height},this.anchor&&(this.origin.x=e.left+e.width/2-this.anchor.x,this.origin.y=e.top+e.height/2-this.anchor.y)),this.apply()}place(e,t){this.anchor={x:e,y:t},this.apply()}apply(){let e=this.anchor&&this.size?{left:this.anchor.x+this.origin.x-this.size.width/2,right:this.anchor.x+this.origin.x+this.size.width/2,top:this.anchor.y+this.origin.y-this.size.height/2,bottom:this.anchor.y+this.origin.y+this.size.height/2}:null;this.label.style.visibility=this.cardRects.some(t=>yx(e,t))?"hidden":""}dispose(){this.observer.disconnect()}};function _x(i){let e=i.type==="updraft"||i.type==="thermal",t=i.start?Math.hypot(i.end.x-i.start.x,i.end.z-i.start.z):30,n=bh(i.type,{radius:e?i.radius*.65:5,height:e?32:9,length:t});if(n.position.set(i.x,e?i.ceiling-29:i.start?(i.start.y+i.end.y)/2:20,i.z),!e&&i.direction&&(n.rotation.y=Math.atan2(i.direction.x,i.direction.z)),i.start&&i.end){let s=n.worldToLocal(new Nt(i.start.x,i.start.y??i.y,i.start.z)),r=n.worldToLocal(new Nt(i.end.x,i.end.y??i.y,i.end.z)),a=new wi([s,new Nt().lerpVectors(s,r,.5).add(new Nt(0,1,0)),r]),o=new ht(new Qi(a,24,.6,5,!1),new un({color:i.type==="crosswind"?"#e6bc73":"#b6f1da",transparent:!0,opacity:.15,depthWrite:!1}));o.name="wind-corridor-path",n.add(o)}return n}function wh(i){let e=new Set,t=new Set;i.traverse(n=>{n.geometry&&e.add(n.geometry);for(let s of Array.isArray(n.material)?n.material:n.material?[n.material]:[])t.add(s)});for(let n of e)n.dispose();for(let n of t)n.dispose()}var Fl=class{constructor(e="#ffe1a2"){this.group=new Et,this.group.name="flight-target";let t=new un({color:e,depthWrite:!1});this.ring=new ht(new Pn(1,.018,8,48),t),this.group.add(this.ring),this.arrow=new Et,this.shaft=new ht(new Qn(.1,.1,1,6),t),this.tip=new ht(new Cn(.75,1.8,7),t),this.shaft.rotation.x=this.tip.rotation.x=Math.PI/2,this.arrow.add(this.shaft,this.tip),this.group.add(this.arrow),this.group.visible=!1}update(e,t){if(this.group.visible=!!e,!e)return;let n=e.radius||10,s=e.heading,r=s&&Math.hypot(s.x,s.z)>0;this.group.position.set(e.x,e.y+(e.landing?.25:0),e.z),this.ring.scale.setScalar(n),this.group.rotation.set(e.landing?-Math.PI/2:0,e.landing?0:r?Math.atan2(s.x,s.z):Math.atan2(t.x-e.x,t.z-e.z),0),this.arrow.visible=!!r&&!e.landing;let a=Math.min(12,Math.max(6,n));this.arrow.position.set(0,n+1.5,0),this.shaft.scale.y=a-1.8,this.shaft.position.z=-.9,this.tip.position.z=a/2-.9}dispose(){wh(this.group)}};function Rh(i){for(let e=i;e;e=e.parent)if(!e.visible)return!1;return!0}function Th(i,e,t,n=new is){let s=t.filter(Rh),r=new Map;for(let[a,o]of[["head",1.65],["torso",1.05],["hips",.55]]){let c=new Nt(e.x,e.y+o,e.z).sub(i.position),u=c.length();if(!(u<=i.near+.1)){n.set(i.position,c.normalize()),n.near=i.near,n.far=u-.1;for(let h of n.intersectObjects(s,!1)){let f=r.get(h.object);(!f||h.distance<f.distance)&&r.set(h.object,{...h,sample:a})}}}return[...r.values()].sort((a,o)=>a.distance-o.distance)}var Ah=class{constructor(){this.meshes=[],this.owners=new Map,this.materials=new Map,this.targets=new Set,this.ray=new is,this.sinceSample=1/0,this.maxFadedMeshes=8}register(e,t={}){e.updateWorldMatrix(!0,!0),e.traverse(n=>{!n.isMesh||n.isInstancedMesh||n.isSkinnedMesh||this.owners.has(n)||!(Array.isArray(n.material)?n.material:[n.material]).some(r=>r.visible&&(!r.transparent||r.opacity>=.85))||(this.meshes.push(n),this.owners.set(n,t))})}update(e,t,n,s=!0){let r=Math.max(0,Math.min(n,.1));this.sinceSample+=r,s?this.sinceSample>=.075&&(this.targets=new Set(Th(e,t,this.meshes,this.ray).slice(0,this.maxFadedMeshes).map(o=>o.object)),this.sinceSample=0):(this.targets.clear(),this.sinceSample=1/0);let a=Math.max(0,this.maxFadedMeshes-this.targets.size);for(let[o,l]of this.materials)l.factor<1&&!this.targets.has(o)&&a--<=0&&(l.factor=1,o.material=l.original);for(let o of this.targets){if(this.materials.has(o))continue;let l=o.material,c=Array.isArray(l)?l:[l],u=c.map(h=>{let f=h.clone();return f.transparent=!0,f.depthWrite=!1,f});this.materials.set(o,{original:l,sources:c,copies:u,factor:1,faded:Array.isArray(l)?u:u[0]})}for(let[o,l]of this.materials){let c=s&&this.targets.has(o)&&Rh(o);if(l.factor=c?Math.max(.16,l.factor-r*8):Math.min(1,l.factor+r*6),l.factor>=1)o.material=l.original;else{for(let u=0;u<l.copies.length;u++)l.copies[u].opacity=l.sources[u].opacity*l.factor;o.material=l.faded}}}inspect(e,t){let n=Th(e,t,this.meshes),s=r=>{let a=this.materials.get(r);return{object:r.name||r.type,...this.owners.get(r),opacityFactor:a&&r.material===a.faded?a.factor:1}};return{hits:n,treatment:{method:"bounded-foreground-fade",applied:n.some(r=>s(r.object).opacityFactor<1),maximumMeshes:this.maxFadedMeshes,targetOpacityFactor:.16,sampleIntervalSeconds:.075,rawBlockers:n.map(r=>({...s(r.object),sample:r.sample})),fadingMeshes:[...this.materials].filter(([r,a])=>r.material===a.faded).map(([r])=>s(r)),retainedMaterialClones:[...this.materials.values()].reduce((r,a)=>r+a.copies.length,0)}}}dispose(){for(let[e,t]of this.materials){e.material=t.original;for(let n of t.copies)n.dispose()}this.materials.clear(),this.targets.clear(),this.meshes.length=0,this.owners.clear()}},Ol=class{constructor(e){this.canvas=e,this.mapScale=ve.mapScale||1,this.scene=new Br,this.scene.background=new ke("#8fc8c8"),this.scene.fog=new Or("#a4d2ce",.0012/this.mapScale),this.renderer=new Ll({canvas:e,antialias:!1,alpha:!1,powerPreference:"high-performance"}),this.renderer.setPixelRatio(Math.min(devicePixelRatio,1.5)),this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=Do,this.renderer.outputColorSpace=qt,this.renderer.toneMapping=Ho,this.renderer.toneMappingExposure=1.2;let t=this.renderer.getContext(),n=t.getExtension("WEBGL_debug_renderer_info"),s=n?t.getParameter(n.UNMASKED_RENDERER_WEBGL):"";this.softwareRenderer=/swiftshader|llvmpipe|software/i.test(s),this.quality="auto",this.autoScale=this.softwareRenderer?.65:1,this.slowSamples=[],this.camera=new Gt(56,1,.3,1800*this.mapScale),this.camera.position.set(100,88,145),this.scene.add(new ca("#e9f3d4","#277d81",2.7)),this.sun=new ua("#fff1c5",3),this.sun.position.set(-80,130,40),this.sun.castShadow=!0,this.sun.shadow.mapSize.set(1024,1024),Object.assign(this.sun.shadow.camera,{left:-45,right:45,top:45,bottom:-45,near:1,far:240}),this.sun.shadow.bias=-.001,this.sun.shadow.normalBias=.2,this.scene.add(this.sun,this.sun.target);let r=new ht(new ti(1300*this.mapScale,32,16),new dn({side:zt,depthWrite:!1,uniforms:{top:{value:new ke("#438c9e")},bottom:{value:new ke("#b4d8d2")}},vertexShader:"varying vec3 p;void main(){p=position;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}",fragmentShader:"varying vec3 p;uniform vec3 top;uniform vec3 bottom;void main(){float h=clamp(normalize(p).y*.85+.18,0.,1.);vec3 c=mix(bottom,top,pow(h,.65));float sun=pow(max(0.,dot(normalize(p),normalize(vec3(-.5,.35,-.6)))),80.);gl_FragColor=vec4(c+vec3(.35,.24,.1)*sun,1.);}"}));r.material.fog=!1,this.scene.add(r),this.islands=[],this.stations=[],this.relics=[],this.winds=[],this.collidables=[],this.foreground=new Ah,this.labels=[],ve.islands.forEach((p,y)=>{let g=vf({radius:p.radius,region:p.region,index:y});if(g.position.set(p.x,p.y,p.z),this.scene.add(g),this.islands.push(g),this.foreground.register(g,{kind:"island",id:p.id}),g.traverse(E=>{E.isMesh&&!E.isInstancedMesh&&this.collidables.push(E)}),p.station){let E=Sh([0,2,1][this.stations.length%3]);E.position.set(p.x,p.y+.1,p.z),E.scale.setScalar(1.8),this.scene.add(E),this.foreground.register(E,{kind:"station",id:p.id}),this.stations.push({data:p,group:E})}else if(y===0){let E=Sh("astral");E.position.set(p.x+7,p.y,p.z+5),E.scale.setScalar(1.4),this.scene.add(E),this.foreground.register(E,{kind:"camp-decoration",id:p.id})}let m=document.createElement("div");m.className="island-label",m.innerHTML=`<span>${String(y+1).padStart(2,"0")} / ${p.region}</span>${p.name}<b>${p.station?"\u25C7":"\xB7"}</b>`,document.querySelector("#world-labels").append(m),this.labels.push({label:m,data:p})}),ve.relics.forEach((p,y)=>{let g=Mf(y);g.position.set(p.x,p.y+1.2,p.z),this.scene.add(g),this.relics.push({data:p,group:g})}),ve.winds.forEach(p=>{let y=_x(p);this.scene.add(y);let g=p.start?Math.hypot(p.end.x-p.start.x,p.end.z-p.start.z)/2:0,m=Math.hypot(g,p.radius||10,40),E=new en(y.position.clone(),m);this.winds.push({data:p,group:y,halfLength:g,bounds:E,animationDt:0})}),this.hazards=ve.hazards.map(p=>{let y=new Et,g=new Tt({color:p.type==="thunder"?"#34485d":"#cbdfd4",transparent:!0,opacity:p.type==="thunder"?.57:.19,roughness:1,depthWrite:!1}),m=new kn(new ei(1,1),g,12),E=new gt;for(let v=0;v<12;v++){let _=v*2.399;E.position.set(Math.cos(_)*p.radius*.6,v%4*10+18,Math.sin(_)*p.radius*.6),E.scale.set(p.radius*.42,8,p.radius*.32),E.updateMatrix(),m.setMatrixAt(v,E.matrix)}if(y.add(m),p.type==="thunder"){let v=new ht(new In(4,0),new Tt({color:"#d6a9f4",emissive:"#ad77cf",emissiveIntensity:1}));v.position.y=33,y.add(v),y.userData.core=v}return y.position.set(p.x,p.y,p.z),this.scene.add(y),{group:y,data:p}}),this.challenges=ve.challenges.map(p=>{let y=new Fl("#f7d38e");return this.scene.add(y.group),{data:p,group:y.group,marker:y}}),this.surveyMarker=new Fl,this.surveyMarker.group.name="main-survey-target",this.scene.add(this.surveyMarker.group),this.pilot=Sf(),this.wasGrounded=!0,this.landingTime=0,this.scene.add(this.pilot.group);let a=new un({color:"#082d39",transparent:!0,opacity:.24,depthWrite:!1});this.contactShadow=new ht(new Yr(1.5,24),a),this.contactShadow.rotation.x=-Math.PI/2,this.scene.add(this.contactShadow),this.marker=new Et;let o=new ht(new Pn(4.6,.12,6,56),new un({color:"#ffe1a2",transparent:!0,opacity:.8}));o.rotation.x=-Math.PI/2,this.marker.add(o);let l=new ht(new Qn(.15,.15,38,6),new un({color:"#ffe5ae",transparent:!0,opacity:.25,depthWrite:!1}));l.position.y=19,this.marker.add(l),this.scene.add(this.marker);let c=new ei(1,1),u=new Tt({color:"#d1e2ce",roughness:1,flatShading:!0,transparent:!0,opacity:.52,depthWrite:!1});this.clouds=new kn(c,u,100);let h=new gt;for(let p=0;p<100;p++){let y=p*2.39996,g=(90+Math.sqrt(p)*62)*this.mapScale;h.position.set(Math.cos(y)*g+70*this.mapScale,-55-p%5*8,Math.sin(y)*g-80*this.mapScale),h.scale.set((22+p%5*7)*Math.sqrt(this.mapScale),10+p%3*5,(15+p%7*4)*Math.sqrt(this.mapScale)),h.rotation.y=y,h.updateMatrix(),this.clouds.setMatrixAt(p,h.matrix)}this.scene.add(this.clouds);let f=new _t,d=new Float32Array(540);for(let p=0;p<180;p++)d[p*3]=((Math.sin(p*237.33)*.5+.5)*700-250)*this.mapScale,d[p*3+1]=p%47*2,d[p*3+2]=(Math.cos(p*131.13)*350-50)*this.mapScale;f.setAttribute("position",new wt(d,3)),this.dust=new Xr(f,new Gs({size:.5,color:"#eff5c9",transparent:!0,opacity:.55,sizeAttenuation:!0})),this.scene.add(this.dust),this.routeLine=null,this.courseLine=null,this.courseId=null,this.courseWindKey="",this.courseWinds=[],this.yaw=0,this.manualYaw=0,this.cameraSnapPending=!1,this.pitch=.63,this.distance=26,this.overhead=!1,this.reduced=!1,this.menu=!0,this.target=new Nt,this.projection=new Nt,this.worldPoint=new Nt,this.playerPoint=new Nt,this.windFrustum=new Ei,this.viewProjection=new qe,this.phase={sceneUpdateMs:0,renderCpuMs:0},this.ray=new is,this.frames=[],this.metrics={frames:0,drawCalls:0,triangles:0,geometries:0,textures:0},this.navTarget=document.querySelector("#nav-target"),this.navText=this.navTarget.querySelector("span"),this.navOcclusion=new Eh(this.navTarget,document.querySelector("#course"),globalThis.ResizeObserver,[document.querySelector(".telemetry")]),this.resize=()=>{let p=e.clientWidth,y=e.clientHeight;this.viewportWidth=p,this.viewportHeight=y,this.navTarget.style.width=`${Math.min(260,p-24)}px`,this.renderer.setSize(p,y,!1),this.camera.aspect=p/y,this.camera.updateProjectionMatrix(),this.navOcclusion.refresh()},window.addEventListener("resize",this.resize),this.resize()}setQuality(e){this.quality=e,this.renderer.setPixelRatio(e==="low"?.7:e==="auto"?Math.min(devicePixelRatio,1.5)*this.autoScale:Math.min(devicePixelRatio,1.5)),this.renderer.shadowMap.enabled=e==="high"||e==="auto"&&!this.softwareRenderer&&this.autoScale>=.9,this.clouds.visible=e!=="low",this.clouds.count=e==="auto"&&this.autoScale<.9?40:100,this.resize()}sampleFrame(e){if(this.quality!=="auto"||this.autoScale<=.5||(this.slowSamples.push(e),this.slowSamples.length<90))return;let t=this.slowSamples.reduce((n,s)=>n+s,0)/this.slowSamples.length;this.slowSamples.length=0,t>29&&(this.autoScale=Math.max(.5,this.autoScale-.15),this.setQuality("auto"))}setRoute(e){if(this.routeLine&&(this.scene.remove(this.routeLine),this.routeLine.geometry.dispose(),this.routeLine.material.dispose(),this.routeLine=null),!e?.waypoints?.length)return;let t=e.waypoints.map(n=>new Nt(n.x,n.y+2,n.z));this.routeLine=new Vs(new _t().setFromPoints(t),new Ys({color:e.style==="shortcut"?"#f2bf7a":"#c7f4df",dashSize:3,gapSize:4,transparent:!0,opacity:.55})),this.routeLine.computeLineDistances(),this.scene.add(this.routeLine)}updateCourse(e,t=ve){let n=t.challenges.find(o=>o.id===e.activeChallenge),s=bf(n,e,t),r=s?.key||null;if(this.courseId!==r&&(this.courseLine&&(this.scene.remove(this.courseLine),wh(this.courseLine),this.courseLine=null),this.courseId=r,s)){let o=s.points.map(l=>new Nt(l.x,l.y,l.z));this.courseLine=new Vs(new _t().setFromPoints(o),new Ys({color:"#f7d38e",dashSize:2,gapSize:4,transparent:!0,opacity:.6})),this.courseLine.computeLineDistances(),this.scene.add(this.courseLine)}let a=s?`${s.key}:${s.progress}`:"";if(this.courseWindKey!==a){for(let{group:o}of this.courseWinds)this.scene.remove(o),wh(o);this.courseWinds=[],this.courseWindKey=a;for(let o of s?.winds||[]){let l=o.type==="thermal"||o.type==="updraft",c=o.start?Math.hypot(o.end.x-o.start.x,o.end.z-o.start.z):30,u=bh(o.type,{radius:l?o.radius*.6:4,height:25,length:c});u.position.set(o.x,l?o.ceiling-22:o.start?(o.start.y+o.end.y)/2:o.y+o.height/2,o.z),!l&&o.direction&&(u.rotation.y=Math.atan2(o.direction.x,o.direction.z)),this.scene.add(u),this.courseWinds.push({data:o,group:u})}}}updateWorldWinds(e,t){let n=this.quality==="low"||this.quality==="auto"&&this.autoScale<.9;this.viewProjection.multiplyMatrices(this.camera.projectionMatrix,this.camera.matrixWorldInverse),this.windFrustum.setFromProjectionMatrix(this.viewProjection);let s=null,r=1/0;for(let a of this.winds){if(!a.data.start||!ur(a.data,e))continue;let{start:o,end:l}=a.data,c=l.x-o.x,u=l.z-o.z,h=as.clamp(((e.player.x-o.x)*c+(e.player.z-o.z)*u)/(c*c+u*u||1),0,1),f=Math.hypot(e.player.x-o.x-h*c,e.player.z-o.z-h*u);f<r&&(s=a,r=f)}for(let a of this.winds){let{data:o,group:l,halfLength:c,bounds:u}=a,h=Math.hypot(o.x-e.player.x,o.z-e.player.z),f=(this.menu?850:420)+(c||o.radius),d=!o.start&&h<(o.radius||0)+30,p=!n||a===s||d||this.windFrustum.intersectsSphere(u);l.visible=ur(o,e)&&h<f&&p&&(o.type!=="crosswind"||Math.sin(e.elapsed/o.period*Math.PI*2+e.seed%1009/1009*Math.PI*2)>0),!(!l.visible||this.reduced)&&(a.animationDt+=t,(!n||a.animationDt>=.05)&&(l.userData.update?.(a.animationDt),a.animationDt=0))}}rotate(e,t){this.manualYaw-=e,this.pitch=as.clamp(this.pitch+t,.23,1.15)}zoom(e){this.distance=as.clamp(this.distance+e,16,52)}recenter({immediate:e=!1}={}){this.manualYaw=0,this.pitch=.63,this.distance=26,e&&(this.yaw=0,this.cameraSnapPending=!0)}inspectCamera(e){let t=new Nt(e.x,e.y+2,e.z),n=t.clone().project(this.camera),s=this.camera.position.distanceTo(t),r=this.foreground?.inspect(this.camera,e),a=r?.hits||Th(this.camera,e,this.collidables),o=a[0],l=ve.islands.find(u=>Math.hypot(this.camera.position.x-u.x,this.camera.position.z-u.z)<u.radius),c=u=>({x:u.x,y:u.y,z:u.z});return{position:c(this.camera.position),target:c(this.target),near:this.camera.near,far:this.camera.far,fov:this.camera.fov,mode:this.menu?"menu":this.overhead?"overhead":"follow",manualYaw:this.manualYaw,yaw:this.yaw,pitch:this.pitch,distance:s,canvas:{width:this.canvas.width,height:this.canvas.height,cssWidth:this.canvas.clientWidth,cssHeight:this.canvas.clientHeight,pixelRatio:this.renderer.getPixelRatio()},playerNDC:c(n),playerInFrustum:Math.abs(n.x)<=1&&Math.abs(n.y)<=1&&Math.abs(n.z)<=1,platformUnderCamera:l?{id:l.id,surfaceY:l.y,clearance:this.camera.position.y-l.y}:null,occlusion:{blocked:!!o,rawBlocked:!!o,distance:o?.distance??null,point:o?c(o.point):null,object:o?o.object.name||o.object.type:null,sample:o?.sample??null,rawBlockerCount:a.length,treatment:r?.treatment??{method:"none",applied:!1},method:"Camera-to-player head, torso and hips rays against visible island and independent station/camp meshes. Raw geometry hits remain blocked even while locally faded. Excludes hidden LOD ancestry, instanced vegetation and translucent wind/cloud effects."}}}update(e,t,n,s){let r=performance.now(),a=this.viewportWidth,o=this.viewportHeight;this.reduced&&(n=0);let l=e.player,c=gx(e),u=Math.hypot(l.vx||0,l.vz||0);this.pilot.group.position.set(l.x,l.y,l.z),this.pilot.group.rotation.y=Math.PI-(l.heading||0),l.grounded&&!this.wasGrounded&&(this.landingTime=.42),this.landingTime=Math.max(0,this.landingTime-t),this.wasGrounded=l.grounded,this.pilot.update(t,{grounded:l.grounded,gliding:l.gliding,speed:u,mode:this.landingTime>0?"land":l.gliding?"glide":l.grounded?u>.4?"run":"idle":"jump"});for(let{data:_,group:T}of this.relics)T.visible=!e.relics.includes(_.id),this.reduced||(T.rotation.y=n*.7),T.position.y=_.y+1.2+(this.reduced?0:Math.sin(n*1.5+_.x)*.25);for(let{data:_,marker:T}of this.challenges){let w=bf(_,e);T.update(w.completed?null:e.activeChallenge===_.id&&e.challengeHint?e.challengeHint:w.entry,l)}this.surveyMarker.update(c.surveyTarget,l),this.updateCourse(e),this.routeLine&&(this.routeLine.visible=c.mainRouteVisible);for(let{data:_,group:T}of this.courseWinds)T.userData.update?.(this.reduced?0:t),_.type==="crosswind"&&(T.visible=Math.sin(e.elapsed/_.period*Math.PI*2+e.seed%1009/1009*Math.PI*2)>0);for(let{data:_,group:T}of this.hazards)if(T.userData.core){let w=Math.sin(e.elapsed/_.period*Math.PI*2+e.seed%19)>.15;T.userData.core.material.emissiveIntensity=w?2:.25,T.userData.core.rotation.y=n*.3}this.scene.fog.density=e.hazard==="fog"?.006:.0012/this.mapScale;let h=ve.islands.find(_=>Math.hypot(l.x-_.x,l.z-_.z)<_.radius);this.contactShadow.visible=!!h,h&&(this.contactShadow.position.set(l.x,h.y+.09,l.z),this.contactShadow.scale.setScalar(Math.max(.5,1-(l.y-h.y)*.01))),this.marker.visible=!!s&&c.mainRouteVisible&&!e.surveyHint,this.marker.visible&&(this.marker.position.set(s.x,s.y+.2,s.z),this.marker.rotation.y=n*.2);let f=new Nt(l.x,l.y+2,l.z);this.camera.updateMatrixWorld();for(let _ of this.islands)for(let T of _.children)T.isLOD&&T.update(this.camera);let d;if(this.menu)d=new Nt(82+Math.sin(n*.03)*10,74,112),this.target.set(-20,7,-62),this.camera.position.lerp(d,1-Math.exp(-t*2));else{this.yaw=this.manualYaw;let _=this.overhead?1.22:this.pitch,T=this.overhead?65:this.distance*(this.camera.aspect<.8?1.3:1);d=new Nt(Math.sin(this.yaw)*Math.cos(_)*T,Math.sin(_)*T,Math.cos(this.yaw)*Math.cos(_)*T).add(f);let w=new Nt(l.x+(l.vx||0)*.25,l.y+2,l.z+(l.vz||0)*.25),R=this.reduced||this.cameraSnapPending;this.target.lerp(w,R?1:1-Math.exp(-t*10));for(let S of ve.islands)Math.hypot(d.x-S.x,d.z-S.z)<S.radius+3&&(d.y=Math.max(d.y,S.y+8));this.ray.set(f,new Nt().subVectors(d,f).normalize()),this.ray.far=f.distanceTo(d);let I=this.ray.intersectObjects(this.collidables.filter(Rh),!1).find(S=>S.distance>4);I&&d.lerp(f,Math.min(.7,1-(I.distance-2)/this.ray.far)),this.camera.position.lerp(d,R?1:1-Math.exp(-t*9)),this.cameraSnapPending=!1}this.camera.lookAt(this.target),this.camera.updateMatrixWorld();for(let _ of this.islands)for(let T of _.children)T.isLOD&&T.update(this.camera);this.updateWorldWinds(e,t),this.foreground.update(this.camera,l,t,!this.menu);let p=ve.routes.find(_=>_.id===e.objective?.routeId),y=c.target;if(!y&&p){let _=0,T=1/0;p.waypoints.forEach((w,R)=>{let I=Math.hypot(w.x-l.x,w.z-l.z);I<T&&(T=I,_=R)}),y={...p.waypoints[Math.min(_+1,p.waypoints.length-1)],label:_+1>=p.waypoints.length-1?"\u76EE\u6A19\u5CF6":"\u98A8\u9053\u7BC0\u9EDE"}}let g=this.navTarget,m=y?"":"none";if(g.style.display!==m&&(g.style.display=m),y){let _=this.worldPoint.set(y.x,y.y,y.z),T=this.projection.copy(_).project(this.camera),w=(T.x*.5+.5)*a,R=(-T.y*.5+.5)*o;T.z>1&&(w=a/2,R=o-170);let I=Math.min(260,a-24),S=as.clamp(w,I/2+8,a-I/2-8),M=as.clamp(R,100,o-180);g.style.transform=`translate3d(${S}px, ${M}px, 0) translate(-50%, -50%)`;let P=c.label||y.label,F=this.navText,V=`${P} \xB7 ${Math.round(_.distanceTo(this.playerPoint.set(l.x,l.y,l.z)))}m${y.heading?" \xB7 \u9806\u7BAD\u982D\u5165\u74B0":""}`;F.textContent!==V&&(F.textContent=V),this.navOcclusion.place(S,M)}this.sun.position.copy(f).add(new Nt(-70,110,45)),this.sun.target.position.copy(f),this.sun.target.updateMatrixWorld();for(let{label:_,data:T}of this.labels){let w=this.projection.set(T.x,T.y+14,T.z).project(this.camera),R=this.camera.position.distanceTo(this.worldPoint.set(T.x,T.y,T.z)),I=w.z<1&&w.z>-1&&Math.abs(w.x)<1.1&&Math.abs(w.y)<1.1&&R>35?"block":"none";if(_.style.display!==I&&(_.style.display=I),I==="none")continue;_.style.transform=`translate3d(${(w.x*.5+.5)*a}px, ${(-w.y*.5+.5)*o}px, 0) translate(-50%, -100%)`;let S=String(Math.max(.35,1-R/(750*this.mapScale)));_.style.opacity!==S&&(_.style.opacity=S)}let E=performance.now();this.phase.sceneUpdateMs=E-r,this.renderer.render(this.scene,this.camera),this.phase.renderCpuMs=performance.now()-E;let v=this.renderer.info;this.metrics={frames:this.metrics.frames+1,drawCalls:v.render.calls,triangles:v.render.triangles,geometries:v.memory.geometries,textures:v.memory.textures}}dispose(){window.removeEventListener("resize",this.resize),this.navOcclusion.dispose(),this.foreground.dispose(),this.scene.traverse(e=>{e.geometry?.dispose(),e.material&&(Array.isArray(e.material)?e.material:[e.material]).forEach(n=>n.dispose())}),this.renderer.dispose()}};var Bl=class{constructor(e,t){this.keys=new Set,this.axes={x:0,z:0},this.glide=!1,this.touchBrake=!1,this.brakePointer=null,this.enabled=!1,this.actions=t,this.listeners=[],this.disposed=!1,this.pointerCaptures=new Map,this.cameraPointer=null,this.cameraMousePointer=null,this.joyPointer=null;let n=(d,p,y,g)=>{d.addEventListener(p,y,g),this.listeners.push(()=>d.removeEventListener(p,y,g))};n(window,"keydown",d=>{if(!d.defaultPrevented){if(d.code==="Escape"){d.preventDefault(),d.repeat||t.pause();return}if(!/INPUT|SELECT|TEXTAREA/.test(d.target.tagName)&&["Space","ArrowUp","ArrowDown","ArrowLeft","ArrowRight","KeyW","KeyA","KeyS","KeyD","ShiftLeft","ShiftRight","KeyE","KeyC","KeyV","KeyH"].includes(d.code)){if(d.code==="Space"&&d.target.tagName==="BUTTON")return;d.preventDefault(),d.repeat||(d.code==="KeyH"&&t.help(),d.code==="KeyV"&&t.view(),d.code==="KeyC"&&t.recenter(),d.code==="KeyE"&&this.enabled&&t.interact(),d.code==="Space"&&this.enabled&&(this.glide=!0)),this.enabled&&this.keys.add(d.code)}}}),n(window,"keyup",d=>this.keys.delete(d.code)),n(window,"blur",()=>{this.clear(),t.blur()}),n(document,"visibilitychange",()=>{document.hidden&&(this.clear(),t.blur())}),n(e,"contextmenu",d=>d.preventDefault());let s=d=>Number.isInteger(d.buttons)&&d.buttons>=0,r=d=>{this.cameraMousePointer!==d.pointerId&&this.cameraPointer?.id!==d.pointerId||(this.cameraPointer=null,this.cameraMousePointer=null,this.releasePointer(e,d.pointerId))};n(e,"pointerdown",d=>{if(!(this.cameraPointer!==null||this.cameraMousePointer!==null)){if(d.pointerType==="mouse"&&s(d)){if(!d.buttons||!this.capturePointer(e,d.pointerId))return;this.cameraMousePointer=d.pointerId,d.buttons&2&&(this.cameraPointer={id:d.pointerId,x:d.clientX,y:d.clientY});return}if(d.button===2||d.pointerType==="touch"){if(!this.capturePointer(e,d.pointerId))return;this.cameraPointer={id:d.pointerId,x:d.clientX,y:d.clientY}}}}),n(e,"pointermove",d=>{if(this.cameraMousePointer===d.pointerId){if(!s(d)||d.pointerType==="touch")return;if(!d.buttons)return r(d);if(!(d.buttons&2)){this.cameraPointer=null;return}if(!this.cameraPointer){this.cameraPointer={id:d.pointerId,x:d.clientX,y:d.clientY};return}}let p=this.cameraPointer;!p||p.id!==d.pointerId||(t.rotate((d.clientX-p.x)*.005,(d.clientY-p.y)*.004),p.x=d.clientX,p.y=d.clientY)}),n(e,"pointerup",r),n(e,"pointercancel",r),n(e,"lostpointercapture",r),n(e,"wheel",d=>{d.preventDefault(),t.zoom(d.deltaY*.02)},{passive:!1});let a=document.querySelector("#joystick"),o=document.querySelector("#stick"),l=d=>{if(this.joyPointer!==d.pointerId||!this.enabled)return;let p=a.getBoundingClientRect(),y=d.clientX-p.left-p.width/2,g=d.clientY-p.top-p.height/2,m=Math.hypot(y,g),E=Math.min(m,p.width*.32),v=m?y/m*E:0,_=m?g/m*E:0;this.axes={x:v/(p.width*.32),z:_/(p.height*.32)},o.style.transform=`translate(${v}px,${_}px)`};n(a,"pointerdown",d=>{d.preventDefault(),this.joyPointer===null&&this.capturePointer(a,d.pointerId)&&(this.joyPointer=d.pointerId,l(d))}),n(a,"pointermove",l);let c=d=>{this.joyPointer===d.pointerId&&(this.joyPointer=null,this.axes={x:0,z:0},o.style.transform="",this.releasePointer(a,d.pointerId))};n(a,"pointerup",c),n(a,"pointercancel",c),n(a,"lostpointercapture",c);let u=document.querySelector("#touch-glide");n(u,"pointerdown",d=>{d.preventDefault(),this.enabled&&(this.glide=!0)});let h=document.querySelector("#touch-brake");n(h,"pointerdown",d=>{if(d.preventDefault(),this.enabled&&this.brakePointer===null){if(!this.capturePointer(h,d.pointerId))return;this.brakePointer=d.pointerId,this.touchBrake=!0}});let f=d=>{this.brakePointer===d.pointerId&&(this.brakePointer=null,this.touchBrake=!1,this.releasePointer(h,d.pointerId))};for(let d of["pointerup","pointercancel","lostpointercapture"])n(h,d,f);n(document.querySelector("#touch-reset"),"click",t.recenter)}capturePointer(e,t){try{return e.setPointerCapture(t),this.pointerCaptures.set(e,t),!0}catch{return!1}}releasePointer(e,t){this.pointerCaptures.get(e)===t&&this.pointerCaptures.delete(e);try{e.hasPointerCapture(t)&&e.releasePointerCapture(t)}catch{}}read(e=0){if(!this.enabled)return{x:0,z:0,brake:!1,glide:!1};let t=(this.keys.has("KeyD")||this.keys.has("ArrowRight")?1:0)-(this.keys.has("KeyA")||this.keys.has("ArrowLeft")?1:0)+this.axes.x,n=(this.keys.has("KeyS")||this.keys.has("ArrowDown")?1:0)-(this.keys.has("KeyW")||this.keys.has("ArrowUp")?1:0)+this.axes.z,s=Math.max(1,Math.hypot(t,n)),r={x:(t*Math.cos(e)+n*Math.sin(e))/s,z:(n*Math.cos(e)-t*Math.sin(e))/s,brake:this.touchBrake||this.keys.has("ShiftLeft")||this.keys.has("ShiftRight"),glide:this.glide};return this.glide=!1,r}clear(){let e=[...this.pointerCaptures];this.pointerCaptures.clear(),this.keys.clear(),this.glide=!1,this.axes={x:0,z:0},this.touchBrake=!1,this.brakePointer=null,this.joyPointer=null,this.cameraPointer=null,this.cameraMousePointer=null,document.querySelector("#stick").style.transform="";for(let[t,n]of e)this.releasePointer(t,n)}setEnabled(e){this.enabled=e,e||this.clear()}dispose(){this.disposed||(this.disposed=!0,this.listeners.forEach(e=>e()),this.listeners.length=0,this.clear())}};var xx=Object.freeze({glide:{notes:[392,587.33,783.99],duration:.3,type:"triangle",gain:.18},tailwind:{notes:[293.66,440,587.33],duration:.45,type:"sine",gain:.13},energy:{notes:[220,196],duration:.16,type:"triangle",gain:.13},land:{notes:[98,146.83,196],duration:.22,type:"sine",gain:.22},stall:{notes:[293.66,220,146.83],duration:.2,type:"triangle",gain:.15},unlock:{notes:[293.66,369.99,440,587.33,739.99],duration:.19,type:"sine",gain:.2},ui:{notes:[587.33],duration:.07,type:"sine",gain:.09},relic:{notes:[440,587.33,880],duration:.15,type:"sine",gain:.17},finish:{notes:[293.66,369.99,440,587.33,739.99,880],duration:.25,type:"sine",gain:.2}}),vx={deploy:"glide",sail:"glide",open:"glide",wind:"tailwind",low:"energy",lowEnergy:"energy",exhausted:"energy",landing:"land",fail:"stall",respawn:"stall",station:"unlock",interact:"ui",collect:"relic",complete:"finish"},ds=(i,e,t)=>Math.min(t,Math.max(e,Number.isFinite(i)?i:e)),zl=class{constructor(){this.context=null,this.musicVolume=.55,this.sfxVolume=.7,this.paused=!1,this.active=new Set,this.lastEvent=new Map,this.musicTime=0,this.nextNote=0,this.noteIndex=0,this.windFilter=null,this.windGain=null,this.disposed=!1,this.sampleBuffers=new Map,this.sampleFailed=!1,this.stats={peakVoices:0,events:0,maxVoices:20}}async unlock(){try{return await this.openContext()}catch{return!1}}async openContext(){if(this.disposed)return!1;let e=globalThis.AudioContext||globalThis.webkitAudioContext;if(!e)return!1;if(!this.context){this.context=new e;let t=this.context;this.master=t.createGain(),this.master.gain.value=.6,this.master.connect(t.destination),this.musicBus=t.createGain(),this.sfxBus=t.createGain(),this.musicBus.gain.value=this.musicVolume,this.sfxBus.gain.value=this.sfxVolume,this.musicBus.connect(this.master),this.sfxBus.connect(this.master);let n=t.sampleRate*4,s=t.createBuffer(1,n,t.sampleRate),r=s.getChannelData(0),a=72429,o=0;for(let l=0;l<n;l++){a=Math.imul(a,1664525)+1013904223>>>0;let c=a/4294967296*2-1;o=.985*o+.015*c,r[l]=o*4*Math.min(1,l/512,(n-1-l)/512)}this.air=t.createBufferSource(),this.air.buffer=s,this.air.loop=!0,this.windFilter=t.createBiquadFilter(),this.windFilter.type="lowpass",this.windFilter.frequency.value=450,this.windGain=t.createGain(),this.windGain.gain.value=.12,this.air.connect(this.windFilter),this.windFilter.connect(this.windGain),this.windGain.connect(this.musicBus),this.air.start(),this.loadSamples()}return await this.syncContext(),this.context?.state==="running"}async loadSamples(){try{await Promise.all(["glide","land","stall","unlock","ui","relic"].map(async e=>{let t=await fetch(new URL(`./assets/audio/${e}.wav`,document.baseURI));if(!t.ok)throw new Error(`audio ${e}: ${t.status}`);let n=await this.context.decodeAudioData(await t.arrayBuffer());this.disposed||this.sampleBuffers.set(e,n)}))}catch{this.sampleFailed=!0}}setVolumes({music:e=this.musicVolume,sfx:t=this.sfxVolume}={}){if(this.musicVolume=ds(Number(e),0,1),this.sfxVolume=ds(Number(t),0,1),this.context){let n=this.context.currentTime;this.musicBus.gain.setTargetAtTime(this.musicVolume,n,.035),this.sfxBus.gain.setTargetAtTime(this.sfxVolume,n,.035)}}syncContext(){return this.transition=(this.transition||Promise.resolve()).catch(()=>{}).then(async()=>{let e=this.context;!e||this.disposed||e.state==="closed"||(this.paused&&e.state==="running"?await e.suspend():!this.paused&&e.state!=="running"&&(this.nextNote=e.currentTime+.1,await e.resume()))}).catch(()=>{}),this.transition}setPaused(e){this.paused=!!e,this.syncContext()}register(e){if(this.active.size>=this.stats.maxVoices){let t=this.active.values().next().value;try{t.stop()}catch{}this.active.delete(t)}this.active.add(e),this.stats.peakVoices=Math.max(this.stats.peakVoices,this.active.size),e.onended=()=>{e.onended=null,this.active.delete(e);try{e.disconnect()}catch{}}}tone(e,t,n,s,r,a){let o=this.context,l=o.createOscillator(),c=o.createGain();l.type=s,l.frequency.setValueAtTime(e,t),c.gain.setValueAtTime(1e-4,t),c.gain.exponentialRampToValueAtTime(Math.max(1e-4,r),t+.015),c.gain.exponentialRampToValueAtTime(1e-4,t+n),l.connect(c),c.connect(a),this.register(l);let u=l.onended;l.onended=()=>{u(),c.disconnect()},l.start(t),l.stop(t+n+.02)}play(e){if(!this.context||this.context.state!=="running"||this.paused||this.disposed)return;let t=vx[e]||e,n=xx[t];if(!n)return;let s=this.context.currentTime,r=this.lastEvent.get(t)??-1/0,a=t==="energy"?1.6:t==="tailwind"?1:.08;if(s-r<a)return;this.lastEvent.set(t,s),this.stats.events++;let o=this.sampleBuffers.get(t);if(o){let l=this.context.createBufferSource(),c=this.context.createGain();l.buffer=o,c.gain.value=.6,l.connect(c),c.connect(this.sfxBus),this.register(l);let u=l.onended;l.onended=()=>{u(),c.disconnect()},l.start();return}n.notes.forEach((l,c)=>this.tone(l,s+c*n.duration*.58,n.duration,n.type,n.gain,this.sfxBus))}update({speed:e=0,energy:t=100,wind:n=0,dt:s=1/60}={}){if(!this.context||this.context.state!=="running"||this.paused||this.disposed)return;let r=this.context,a=r.currentTime,o=typeof n=="number"?n:n?1:0;this.windFilter.frequency.setTargetAtTime(360+ds(e,0,30)*28+ds(o,0,2)*190,a,.2),this.windGain.gain.setTargetAtTime(.07+ds(e,0,30)*.007+ds(o,0,2)*.07,a,.2),t<18&&t>0&&this.play("energy");let l=[293.66,0,440,369.99,587.33,0,440,0,329.63,0,493.88,440,369.99,0,293.66,0];if(this.nextNote<a-.5&&(this.nextNote=a+.06),this.nextNote<=a+.13){let c=this.noteIndex%l.length,u=l[c];u&&this.tone(u,this.nextNote,1.75,"sine",.065,this.musicBus),c%4===0&&this.tone(c<8?146.83:164.81,this.nextNote,3.3,"triangle",.028,this.musicBus),this.nextNote+=.8,this.noteIndex++}this.musicTime+=ds(s,0,.1)}async dispose(){if(!this.disposed){this.disposed=!0;for(let e of this.active)try{e.stop(),e.disconnect()}catch{}if(this.active.clear(),this.air)try{this.air.stop(),this.air.disconnect()}catch{}this.sampleBuffers.clear(),this.context&&this.context.state!=="closed"&&await this.context.close(),this.context=null}}};var Ef=i=>{if(i===null||typeof i!="object")return!1;let e=Object.getPrototypeOf(i);return e===Object.prototype||e===null},kl=class{constructor(e){this.handlers=e,this.ready=!1,this.currentState="ready",this.session=new URLSearchParams(location.search).get("session"),this.embedded=window.parent!==window&&!!this.session,this.listener=t=>this.receive(t),window.addEventListener("message",this.listener)}send(e,t={}){this.embedded&&window.parent.postMessage({protocol:"stteak-game",version:1,sessionId:this.session,type:e,payload:t},location.origin)}setReady(){this.ready=!0,this.send("game:ready",{capabilities:["pause","resume","restart","keyboard","touch","local-save"]}),this.state(this.currentState)}state(e){this.currentState=e,this.send("game:state",{state:e})}receive(e){let t=e.data;if(!(!this.embedded||e.source!==window.parent||e.origin!==location.origin||!Ef(t)||t.protocol!=="stteak-game"||t.version!==1||t.sessionId!==this.session||!Ef(t.payload))){if(t.type==="host:init"){t.payload.gameId==="aetherwake"&&typeof t.payload.title=="string"&&this.ready&&this.setReady();return}!["host:start","host:pause","host:resume","host:restart"].includes(t.type)||Object.keys(t.payload).length||this.ready&&this.handlers[t.type]?.()}}dispose(){window.removeEventListener("message",this.listener)}};var Hl=class{constructor(e,t=2048){this.names=e,this.capacity=t,this.samples=Object.fromEntries(e.map(n=>[n,new Float64Array(t)])),this.count=0,this.index=0}push(e){for(let t of this.names)this.samples[t][this.index]=e[t];this.index=(this.index+1)%this.capacity,this.count=Math.min(this.count+1,this.capacity)}summary(){return Object.fromEntries(this.names.map(e=>{let t=Array.from(this.samples[e].subarray(0,this.count)).sort((n,s)=>n-s);return[e,{count:this.count,mean:this.count?t.reduce((n,s)=>n+s,0)/this.count:null,p95:this.count?t[Math.min(this.count-1,Math.floor(this.count*.95))]:null}]}))}};var Ch={id:"aetherwake-r1-20261110",version:"1.0.0",stage:"candidate",date:"2026-11-10"};var we=i=>document.querySelector(i),Ot=(i,e=!0)=>we(i).classList.toggle("hidden",!e),nt=(i,e)=>{we(i).textContent!==String(e)&&(we(i).textContent=e)},Vl=i=>`${String(Math.floor(i/60)).padStart(2,"0")}:${String(Math.floor(i%60)).padStart(2,"0")}`;function Mx(i){let e=[];return i.minSpeed&&e.push(`\u901F\u5EA6 \u2265${i.minSpeed}m/s`),i.maxSpeed&&e.push(`\u901F\u5EA6 \u2264${i.maxSpeed}m/s`),i.minEnergy&&e.push(`\u80FD\u91CF \u2265${i.minEnergy}%`),i.maxVerticalSpeed&&e.push(`\u5347\u964D \u2264${i.maxVerticalSpeed}m/s`),i.heading&&e.push("\u9806\u74B0\u4E0A\u7BAD\u982D\u901A\u904E"),e.join(" \xB7 ")}var nn=i=>String(i).replace(/[&<>"']/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[e]),ut,Mn,me,We,ci,Ct,xt,Cf=null,ar="turn",lt=!1,Ft="",sr=null,wf=0,gs=0,Tf="",or=!1,rr=!1,Gl,ms=0,Ma=performance.now(),Ih=0,Sa=new Ca,If=new Hl(["simulationMs","sceneUpdateMs","renderCpuMs","hudMapMs","rafIntervalMs"]),fs=[],Pf=0,Lf=0,Df=0;function Jt(i){nt("#toast",i),we("#toast").classList.add("visible"),clearTimeout(wf),wf=setTimeout(()=>we("#toast").classList.remove("visible"),4200)}function Uf(){return Cf?"\u9060\u5F81\u5B8C\u6210 / \u672C\u6B21\u4FDD\u5B58\u672A\u5B8C\u6210":"\u9060\u5F81\u5B8C\u6210 / \u500B\u4EBA\u6210\u7E3E\u5DF2\u4FDD\u5B58"}function Dh(i){Cf=i||null,Ot("#storage-warning",!!i),i&&nt("#storage-warning",i),Ft==="result"&&nt("#modal-kicker",Uf())}function sn(){let i=Sa.save({...me.saveData(),settings:Ct});return Dh(i.warning),xt=Sa.load().save,i}function ps(){ut.setQuality(Ct.quality),ut.reduced=Ct.reducedMotion,ut.overhead=Ct.camera==="overhead",We.setVolumes({music:Ct.music,sfx:Ct.sfx}),nt("#camera",ut.overhead?"\u8FFD\u96A8 V":"\u4FEF\u77B0 V")}function Sx(){for(let i of document.querySelectorAll(".module"))i.setAttribute("aria-pressed",String(i.dataset.module===ar))}function bx(i){ar=i,Sx(),We?.play("ui")}function Ri(i=!1){if(!rr){if(clearTimeout(gs),Ii(!1),We.unlock(),i?(me=new vs({save:xt}),ar=xt.module):(me.persisted=xt,me.reset({seed:Number(we("#seed").value)||2718,module:ar})),me.status==="complete"){lt=!0,ut.menu=!1,ut.recenter({immediate:!0}),Mn.setEnabled(!1),Ot("#landing",!1),Ot("#flight-hud"),Pi(),Gn();return}me.launch(),lt=!0,ut.menu=!1,ut.recenter({immediate:!0}),ms=0,Ma=performance.now(),Mn.setEnabled(!0),Ot("#landing",!1),Ot("#flight-hud"),We.setPaused(!1),ci.state("running"),Ot("#guide",!or),we("#world").focus(),sn(),Pi(),Jt(i?"\u5DF2\u56DE\u5230\u4E0A\u6B21\u7684\u5B89\u5168\u843D\u9EDE\u3002":matchMedia("(pointer: coarse)").matches?"\u5148\u9EDE\u5C55\u5E06\u8D77\u8DF3\uFF0C\u518D\u7528\u5DE6\u6416\u687F\u6CBF\u5730\u5716\u98A8\u7DDA\u524D\u9032\u3002":"\u5148\u6309 Space \u8D77\u8DF3\uFF0C\u518D\u6CBF\u5730\u5716\u4E0A\u7684\u98A8\u7DDA\u524D\u9032\u3002")}}function Ci(i="pause"){clearTimeout(gs),!(!lt||me.status==="complete")&&(me.setPaused(!0),Mn.setEnabled(!1),i==="dialogue"?gs=setTimeout(()=>We.setPaused(!0),1200):We.setPaused(!0),ms=0,ci.state("paused"),sn(),(i==="pause"||i==="blur")&&lr(i==="blur"?"\u822A\u7A0B\u5DF2\u5B89\u5168\u66AB\u505C":"\u5728\u98A8\u505C\u4E0B\u4F86\u7684\u5730\u65B9"))}function ui(){rr||(clearTimeout(gs),!(!lt||me.status==="complete")&&(Ii(!1),me.setPaused(!1),Mn.setEnabled(!0),We.unlock(),We.setPaused(!1),Ma=performance.now(),ms=0,ci.state("running"),we("#world").focus()))}function Af(){if(Ft)return Nf();if(!lt)return hi();me.status==="paused"?ui():Ci()}function Nf(){if(Ft&&Ft!=="context"){if(Ft==="erase")return Nh();if(Ft==="settings")return hi();if(Ft==="courses"||Ft==="journal")return lt&&me.status==="complete"?Gn():hi();if(Ft==="restart")return lr();if(Ft==="result"){Wl(),we("#start").focus();return}if(Ft==="help")return lt?me.status==="complete"?Gn():lr():Ii();if(lt)return me.status==="complete"?Gn():ui();Ii()}}var Ph=0;function Wn(i,e,t,n=[],s="AETHERWAKE / \u822A\u884C\u8A8C"){let r=++Ph;Ft||(sr=document.activeElement),Ft=i,nt("#modal-kicker",s),nt("#modal-title",e),we("#modal").append(we("#storage-warning")),we("#modal-body").innerHTML=t,we("#modal-actions").replaceChildren();for(let a of n){let o=document.createElement("button");o.textContent=a.label,o.disabled=!!a.disabled,a.primary&&(o.className="primary"),o.onclick=()=>{We.play("ui"),a.action()},we("#modal-actions").append(o)}Ot("#modal");for(let a of we("#game").children)["modal","toast","storage-warning","fatal"].includes(a.id)||(a.inert=!0);requestAnimationFrame(()=>{if(r!==Ph||!Ft)return;let a=we("#modal .modal-panel"),o=we("#modal-actions button"),l=we("#close-modal"),c=a.scrollHeight>a.clientHeight,u=["help","journal","courses"].includes(i);a.scrollTop=0,(u||c?l:o||l).focus({preventScroll:!0})})}function Ii(i=!0){++Ph,Ot("#modal",!1),we("#toast").after(we("#storage-warning")),Ft="";for(let e of we("#game").children)e.inert=!1;i&&(sr?.isConnected&&sr!==document.body&&!sr.closest(".hidden")?sr:we(lt?"#world":"#start")).focus(),sr=null}function Ff(){return`<div class="settings-grid"><label>\u74B0\u5883\u8207\u97F3\u6A02 <input id="music-volume" type="range" min="0" max="1" step="0.05" value="${Ct.music}"></label><label>\u52D5\u4F5C\u97F3\u6548 <input id="sfx-volume" type="range" min="0" max="1" step="0.05" value="${Ct.sfx}"></label><label>\u756B\u8CEA <select id="quality"><option value="auto">\u81EA\u52D5 \xB7 \u4F9D\u6548\u80FD\u8ABF\u6574\u89E3\u6790\u5EA6</option><option value="low">\u7BC0\u80FD \xB7 \u95DC\u9589\u5373\u6642\u9670\u5F71</option><option value="high">\u7CBE\u7DFB \xB7 \u5373\u6642\u9670\u5F71</option></select></label><label>\u93E1\u982D <select id="camera-setting"><option value="follow">\u53D7\u63A7\u8FFD\u96A8</option><option value="overhead">\u4FEF\u77B0\u822A\u7DDA</option></select></label><label class="check"><input id="reduced-motion" type="checkbox" ${Ct.reducedMotion?"checked":""}>\u6E1B\u5C11\u52D5\u614B\uFF0F\u8996\u5DEE</label><label class="check"><input id="assist" type="checkbox" ${me.assist?"checked":""}>\u98A8\u7DDA\u8F14\u52A9\uFF08\u7368\u7ACB\u6A19\u8A18\u6210\u7E3E\uFF09</label></div><p class="modal-note">\u5C07\u5169\u500B\u97F3\u91CF\u6ED1\u687F\u8ABF\u81F3 0 \u53EF\u5B8C\u5168\u975C\u97F3\u3002\u8A2D\u5B9A\u6703\u81EA\u52D5\u4FDD\u5B58\u3002</p>`}function Of(){we("#quality").value=Ct.quality,we("#camera-setting").value=Ct.camera;for(let[i,e]of[["music-volume","music"],["sfx-volume","sfx"]])we("#"+i).oninput=t=>{Ct[e]=Number(t.target.value),We.unlock(),ps(),sn()};we("#quality").onchange=i=>{Ct.quality=i.target.value,ps(),sn()},we("#camera-setting").onchange=i=>{Ct.camera=i.target.value,ps(),sn()},we("#reduced-motion").onchange=i=>{Ct.reducedMotion=i.target.checked,ps(),sn()},we("#assist").onchange=i=>{me.setAssist(i.target.checked),sn()}}function Ex(){return lt?me.status==="complete"?Gn():lr():Ii()}function lr(i="\u5728\u98A8\u505C\u4E0B\u4F86\u7684\u5730\u65B9"){if(lt&&me.status==="complete")return Gn();Wn("pause",i,`<p>\u98DB\u884C\u3001\u5E06\u80FD\u91CF\u8207\u8A08\u6642\u5DF2\u51CD\u7D50\u3002\u5B89\u5168\u843D\u5CF6\u8207\u53D6\u5F97\u788E\u7247\u6642\u6703\u81EA\u52D5\u5132\u5B58\uFF1B\u91CD\u65B0\u8F09\u5165\u6703\u56DE\u5230\u6700\u5F8C\u7684\u5B89\u5168\u5CF6\u3002</p>${Ff()}`,[{label:"\u7E7C\u7E8C\u822A\u7A0B",primary:!0,action:ui},{label:"\u64CD\u4F5C\u8207\u822A\u884C\u8A8C",action:hi},{label:"\u9078\u64C7\u6E2C\u98A8\u9060\u5F81",action:Uh},{label:"\u91CD\u65B0\u9060\u5F81",action:wx},{label:"\u8FD4\u56DE\u6E96\u5099\u756B\u9762",action:Wl}],"\u2161 / \u822A\u7A0B\u66AB\u505C"),Of()}function wx(){Wn("restart","\u91CD\u65B0\u8FCE\u63A5\u9019\u9663\u98A8\uFF1F","<p>\u672C\u8D9F\u89C0\u6E2C\u53F0\u3001\u4E3B\u7DDA\u89C0\u6E2C\u8207\u6642\u9593\u6703\u91CD\u65B0\u8A08\u7B97\u3002\u6587\u660E\u788E\u7247\u3001\u5DF2\u4EA4\u4ED8\u7684\u6E2C\u98A8\u968E\u6BB5\u3001\u5DF2\u767C\u73FE\u5CF6\u5DBC\u8207\u500B\u4EBA\u6210\u7E3E\u4FDD\u7559\u3002\u82E5\u8981\u63DB\u6A21\u7D44\u6216\u7A2E\u5B50\uFF0C\u8ACB\u8FD4\u56DE\u6E96\u5099\u756B\u9762\u3002</p>",[{label:"\u91CD\u65B0\u9060\u5F81",primary:!0,action:()=>Ri(!1)},{label:"\u4FDD\u7559\u822A\u7A0B",action:()=>lr()}])}function Wl(){clearTimeout(gs),lt&&me.status!=="complete"&&(Ci("silent"),sn()),lt=!1,Mn.setEnabled(!1),We.setPaused(!0),ut.menu=!0,Ii(),Ot("#flight-hud",!1),Ot("#landing"),Ot("#continue",xt.elapsed>0),nt("#continue",xt.completed?"\u67E5\u770B\u7D50\u7B97\uFF0F\u7E7C\u7E8C\u63A2\u7D22":"\u7E7C\u7E8C\u4E0A\u6B21\u822A\u7A0B"),ci.state("ready"),nt("#objective","\u8B93\u6C89\u7761\u7684\u661F\u5716\u518D\u6B21\u767C\u5149"),nt("#objective-sub","\u4F9D\u5E8F\u4FEE\u5FA9\u4E09\u5EA7\u89C0\u6E2C\u53F0\uFF0C\u8FD4\u56DE\u71DF\u5730\u3002")}function hi(){lt&&me.status==="running"&&Ci("silent"),Wn("help","\u8B80\u61C2\u98A8\uFF0C\u627E\u5230\u56DE\u5BB6\u7684\u8DEF",'<p class="modal-note">\u4E09\u6BB5\u4E3B\u7DDA\u5206\u5225\u662F\u6E2C\u98A8\u6821\u6E96\u3001\u7A69\u5B9A\u8CA8\u904B\u3001\u9727\u4E2D\u5B9A\u4F4D\u3002\u4F9D\u5E8F\u901A\u904E\u5E36\u689D\u4EF6\u7684\u89C0\u6E2C\u74B0\uFF0C\u518D\u843D\u5230\u8606\u5149\u5EAD \u2192 \u96F7\u96F2\u5929\u6587\u53F0 \u2192 \u6B78\u661F\u81FA\u6309 E \u4EA4\u4ED8\uFF0C\u6700\u5F8C\u8FD4\u56DE\u6668\u98A8\u71DF\u5730\u7D50\u7B97\u3002\u74B0\u4E0A\u7BAD\u982D\u8868\u793A\u9032\u5165\u65B9\u5411\uFF0C\u76F4\u67F1\u8868\u793A\u4EA4\u4ED8\u9EDE\u3002</p><div class="control-table"><b>WASD / \u65B9\u5411\u9375</b><span>\u4F9D\u756B\u9762\u65B9\u5411\u79FB\u52D5\u3002\u7A7A\u4E2D\u653E\u958B\u6703\u4FDD\u6301\u6ED1\u7FD4\u3002</span><b>Space / \u5C55\u5E06</b><span>\u5730\u9762\u8D77\u8DF3\uFF0C\u7A7A\u4E2D\u5207\u63DB\u5C55\u5E06\u3002\u4E0D\u5FC5\u4E00\u76F4\u6309\u4F4F\u3002</span><b>Shift / \u6E1B\u901F</b><span>\u6309\u4F4F\u6536\u5E06\u4E0B\u964D\u3002\u62B5\u5CF6\u4E0A\u7A7A\u6642\u6E1B\u901F\uFF0C\u843D\u5730\u5F8C\u653E\u958B\u3002</span><b>E / \u4E92\u52D5\u9375</b><span>\u4EA4\u4ED8\u89C0\u6E2C\u8CC7\u6599\uFF0F\u6E2C\u98A8\u968E\u6BB5\uFF0C\u6216\u56DE\u71DF\u5730\u7D50\u7B97\u3002</span><b>\u53F3\u9375\u62D6\u66F3 / \u6EFE\u8F2A</b><span>\u8ABF\u6574\u93E1\u982D\uFF1BC \u56DE\u6B63\uFF0CV \u5207\u63DB\u4FEF\u77B0\u3002</span><b>\u624B\u6A5F</b><span>\u5DE6\u5074\u6416\u687F\uFF0B\u53F3\u5074\u5C55\u5E06\uFF0F\u6E1B\u901F\u53EF\u540C\u6642\u64CD\u4F5C\uFF1B\u7A7A\u767D\u5834\u666F\u62D6\u52D5\u93E1\u982D\u3002</span></div><h3>\u8B80\u98A8\u8207\u9078\u8DEF</h3><ul><li>\u9577\u5E36\uFF0B\u7BAD\u982D\uFF1D\u9806\u98A8\uFF0C\u6301\u7E8C\u88DC\u80FD\u4E26\u52A0\u901F\uFF1B\u87BA\u65CB\u74B0\uFF1D\u71B1\u6D41\uFF0C\u62AC\u5347\u9AD8\u5EA6\u3002</li><li>\u6A6B\u5411\u64FA\u52D5\u6A19\u8A18\uFF1D\u9593\u6B47\u5074\u98A8\uFF1B\u96F7\u5FC3\u8108\u52D5\u6642\u7E5E\u884C\u5916\u7DE3\uFF0C\u9727\u4E2D\u53C3\u8003\u5CF6\u540D\u548C\u5730\u5716\u3002</li><li>\u5B89\u5168\u98A8\u9053\u8F03\u5BEC\uFF0C\u9014\u7D93\u88DC\u7D66\u5CF6\uFF1B\u7A7F\u96F2\u6377\u5F91\u8DEF\u77ED\uFF0C\u9700\u8981\u66F4\u7CBE\u6E96\u7684\u65B9\u5411\u4FEE\u6B63\u3002</li><li>\u6C92\u6709\u80FD\u91CF\u6216\u6389\u843D\u6642\u56DE\u6700\u5F8C\u5B89\u5168\u5CF6\uFF0C\u52A0\u8A08 8 \u79D2\uFF0C\u788E\u7247\u4FDD\u7559\u3002\u9023\u7E8C\u4E09\u6B21\u5931\u901F\u6703\u63D0\u793A\u53EF\u958B\u555F\u8F14\u52A9\u3002</li><li>\u788E\u7247\u9760\u8FD1\u81EA\u52D5\u62FE\u53D6\uFF0C\u822A\u884C\u8A8C\u63D0\u4F9B\u5730\u6A19\u7DDA\u7D22\u3002\u5148\u5728\u5B89\u5168\u5730\u9762\u5F9E\u300C\u516D\u8D9F\u6E2C\u98A8\u9060\u5F81\u300D\u9078\u8AB2\uFF0C\u6CBF\u5B89\u5168\u63A5\u99C1\u98A8\u6A19\u5230\u91D1\u74B0\u958B\u59CB\u3002\u5B8C\u6210\u672C\u6BB5\u822A\u9580\u5F8C\u5230\u6307\u5B9A\u5CF6\u4E2D\u592E\u6309 E \u4EA4\u4ED8\uFF1B\u5DF2\u4EA4\u4ED8\u968E\u6BB5\u6C38\u4E45\u4FDD\u5B58\u3002\u9000\u51FA\u6703\u8FD4\u56DE\u6700\u5F8C\u5B89\u5168\u5CF6\uFF0C\u4E0D\u8A08\u5931\u901F\uFF0C\u53EA\u653E\u68C4\u672A\u4EA4\u4ED8\u6BB5\u3002</li></ul><h3>\u672C\u6A5F\u9032\u5EA6\u8207\u500B\u4EBA\u6210\u7E3E</h3><p>\u53EA\u6709\u9019\u500B\u700F\u89BD\u5668\u4FDD\u5B58\u9032\u5EA6\uFF0C\u6C92\u6709\u96F2\u7AEF\u540C\u6B65\u6216\u5168\u7403\u6392\u884C\u699C\u3002\u7A2E\u5B50\u53EF\u91CD\u73FE\u76F8\u540C\u98A8\u6CC1\uFF1B\u4ECA\u65E5\u98A8\u6CC1\u4EE5\u53F0\u5317\u65E5\u671F\u8A08\u7B97\u3002\u7D50\u7B97\u5206\u5225\u986F\u793A\u901F\u5EA6\u3001\u5E73\u7A69\u8207\u63A2\u7D22\u8A55\u7D1A\u3002</p>',[{label:lt?"\u56DE\u5230\u822A\u7A0B":"\u56DE\u5230\u6E96\u5099",primary:!0,action:()=>lt?me.status==="complete"?Gn():ui():Ii()},{label:"\u6587\u660E\u788E\u7247",action:Bf},{label:"\u516D\u8D9F\u6E2C\u98A8\u9060\u5F81",action:Uh},{label:"\u8A2D\u5B9A\u8207\u5B58\u6A94",action:Nh}])}function Uh(){lt&&me.status==="running"&&Ci("silent");let i=!lt||me.player.grounded;Wn("courses","\u5E36\u56DE\u4E0B\u4E00\u4EFD\u98A8\u7684\u7B54\u6848",`<p class="modal-note">${i?"\u5728\u5B89\u5168\u5730\u9762\u9078\u64C7\u4E00\u8D9F\u9060\u5F81\uFF0C\u518D\u6CBF\u5B89\u5168\u63A5\u99C1\u98A8\u6A19\u5230\u6307\u5B9A\u5CF6\u91D1\u74B0\u958B\u59CB\u3002":"\u8ACB\u5148\u5B89\u5168\u843D\u5CF6\uFF0C\u518D\u9078\u64C7\u9060\u5F81\uFF1B\u7A7A\u4E2D\u53EF\u5148\u95B1\u8B80\u5404\u8AB2\u7A0B\u3002"}\u5B8C\u6210\u4E00\u6BB5\u5F8C\u843D\u5CF6\u6309 E \u4EA4\u4ED8\uFF1B\u5DF2\u4EA4\u4ED8\u968E\u6BB5\u4FDD\u5B58\u3002\u9000\u51FA\u6703\u8FD4\u56DE\u6700\u5F8C\u5B89\u5168\u5CF6\uFF0C\u53EA\u653E\u68C4\u672A\u4EA4\u4ED8\u6BB5\u3002</p><div class="journal-list">${ve.challenges.map(e=>`<div><b>${nn(e.name)} \xB7 ${me.state.courseStages[e.id]||0}/${e.stages?.length||1} \u6BB5</b><p>${nn(e.description)}<br>\u4E0B\u4E00\u51FA\u767C\u9EDE\uFF1A${nn(Bt(me.courseStage(e)?.fromIslandId||e.islandId).name)}${me.state.completedChallenges.includes(e.id)?" \xB7 \u5DF2\u53D6\u5F97\u5B8C\u6210\u5FBD\u8A18":""}</p></div>`).join("")}</div>`,[{label:me.state.activeChallenge||me.state.trackedHint?"\u9000\u51FA\u9060\u5F81\u4E26\u81EA\u7531\u63A2\u7D22\uFF08\u4FDD\u7559\u9032\u5EA6\uFF09":"\u81EA\u7531\u63A2\u7D22\uFF08\u4FDD\u7559\u9032\u5EA6\uFF09",primary:!0,action:()=>{lt||Ri(xt.elapsed>0),(me.state.activeChallenge||me.state.trackedHint)&&(me.cancelChallenge(),va()),me.status==="complete"&&(me.status="paused",or=!0),ui(),sn(),Pi()}},...ve.challenges.filter(e=>!me.challenges.includes(e.id)).map(e=>({label:`\u6A19\u8A18 ${e.name}`,disabled:!i,action:()=>{lt||Ri(xt.elapsed>0),me.trackChallenge(e.id)&&(me.status==="complete"&&(me.status="paused",or=!0),ui(),Pi())}})),{label:"\u8FD4\u56DE\u822A\u884C\u8A8C",action:hi}],"\u6E2C\u98A8\u9060\u5F81 / \u968E\u6BB5\u6C38\u4E45\u4FDD\u5B58")}function Nh(){Wn("settings","\u8ABF\u6574\u4F60\u7684\u822A\u7A0B",`${Ff()}<h3>\u5B89\u5168\u4FDD\u5B58</h3><p>\u5B58\u6A94\u683C\u5F0F v3\uFF1B\u843D\u5CF6\u3001\u89C0\u6E2C\u6A23\u672C\u3001\u788E\u7247\u3001\u968E\u6BB5\u4EA4\u4ED8\u3001\u7D50\u7B97\u53CA\u8A2D\u5B9A\u8B8A\u66F4\u6642\u4FDD\u5B58\u3002\u820A\u7248\u77ED\u7A0B\u6210\u7E3E\u8207\u5FBD\u8A18\u4FDD\u7559\u5728\u6B77\u53F2\u7D00\u9304\uFF0C\u65B0\u822A\u7A0B\u7368\u7ACB\u8A08\u5206\u3002\u640D\u58DE\u5B58\u6A94\u4E0D\u6703\u8B93\u904A\u6232\u5361\u4F4F\uFF0C\u5132\u5B58\u5931\u6557\u6703\u660E\u78BA\u63D0\u793A\u3002</p>${Tx()}`,[{label:"\u5B8C\u6210",primary:!0,action:Ex},{label:"\u91CD\u8A2D\u5168\u90E8\u9032\u5EA6",action:()=>Wn("erase","\u78BA\u5B9A\u6E05\u9664\u5168\u90E8\u672C\u6A5F\u9032\u5EA6\uFF1F","<p>\u9019\u6703\u6E05\u9664\u6587\u660E\u788E\u7247\u3001\u5CF6\u5DBC\u3001\u89C0\u6E2C\u53F0\u3001\u500B\u4EBA\u6210\u7E3E\u8207\u672C\u5C40 checkpoint\uFF0C\u7121\u6CD5\u5FA9\u539F\u3002\u97F3\u91CF\u8207\u756B\u9762\u504F\u597D\u4FDD\u7559\u3002</p>",[{label:"\u53D6\u6D88",primary:!0,action:Nh},{label:"\u6E05\u9664\u5168\u90E8\u9032\u5EA6",action:()=>{let i=Sa.clearProgress();Dh(i.warning),xt=Sa.load().save,me=new vs({save:xt}),Wl(),Jt("\u672C\u6A5F\u9032\u5EA6\u5DF2\u91CD\u8A2D\u3002")}}])}]),Of()}function Tx(){let i=me.persisted,e=Object.entries(i.legacyRecords||{}).map(([s,r])=>`${nn(Sn.find(a=>a.id===s)?.name||s)} \xB7 ${Vl(r.time)}${r.assisted?" \xB7 \u5DF2\u4F7F\u7528\u8F14\u52A9":""}`),t=Object.entries(i.legacyRouteRecords||{}).map(([s,r])=>`${nn(ve.routes.find(a=>a.id===s)?.name||s)} \xB7 ${Vl(r.time)}`),n=(i.legacyChallenges||[]).map(s=>nn(ve.challenges.find(r=>r.id===s)?.name||s));return!e.length&&!t.length&&!n.length?"":`<h3>\u820A\u7248\u77ED\u7A0B\u7D00\u9304</h3><p>\u4EE5\u4E0B\u6210\u7E3E\u5C6C\u65BC\u6539\u7248\u524D\u822A\u7A0B\uFF0C\u7368\u7ACB\u4FDD\u7559\u3002</p>${e.length?`<p>${e.join("<br>")}</p>`:""}${t.length?`<p>${t.join("<br>")}</p>`:""}${n.length?`<p>\u820A\u5FBD\u8A18\uFF1A${n.join("\u3001")}</p>`:""}`}function Bf(){let i=me.relics;Wn("journal","\u98A8\u7559\u4E0B\u7684\u822A\u4FE1",`<p>\u5DF2\u767C\u73FE ${i.length} / ${ve.relics.length}\u3002\u9760\u8FD1\u5404\u6D6E\u5CF6\u4E0A\u7684\u91D1\u8272\u7ACB\u9AD4\u788E\u7247\u5373\u53EF\u62FE\u53D6\u3002</p><div class="journal-list">${ve.relics.map((e,t)=>`<div><b><img src="${nn(e.icon||`./assets/icons/${e.id}.svg`)}" width="24" height="24" alt=""> ${String(t+1).padStart(2,"0")} \xB7 ${i.includes(e.id)?nn(e.name):"\u5C1A\u672A\u767C\u73FE"}</b><p>${i.includes(e.id)?nn(e.text):nn(Bt(e.islandId).name)+" \xB7 "+nn(e.hint||"\u641C\u5C0B\u5CF6\u9762\u7684\u91D1\u8272\u5149\u8292\u3002")}</p></div>`).join("")}</div>`,[{label:"\u8FD4\u56DE\u822A\u884C\u8A8C",primary:!0,action:hi}])}function Ax(i){Ci("dialogue"),Wn("dialogue",i.title,`<p class="modal-note">${nn(i.text)}</p><p>\u9019\u6BB5\u6545\u4E8B\u53EF\u8DF3\u904E\uFF1B\u4E0B\u4E00\u500B\u822A\u6A19\u5DF2\u5728\u5730\u5716\u4E0A\u4EAE\u8D77\u3002</p>`,[{label:"\u7E7C\u7E8C\u822A\u7A0B / \u8DF3\u904E",primary:!0,action:ui}],"\u2727 / \u89C0\u6E2C\u53F0\u8A18\u9304")}function Gn(i=!1){let e=me.state,t=e.rating;Mn.setEnabled(!1),i||We.setPaused(!0),i&&(We.setPaused(!1),We.play("finish"),gs=setTimeout(()=>We.setPaused(!0),1800)),ci.state("paused"),Wn("result",ve.ending.title,`<p>${nn(ve.ending.text)}</p><div class="stats-grid"><div><strong>${t.speed}</strong><small>\u901F\u5EA6 \xB7 ${Vl(e.elapsed)}</small></div><div><strong>${t.stability}</strong><small>\u5E73\u7A69 \xB7 ${e.stalls} \u6B21\u5931\u901F</small></div><div><strong>${t.exploration}</strong><small>\u63A2\u7D22 \xB7 ${e.relics.length}/${ve.relics.length}</small></div></div><p>\u6E2C\u98A8\u6311\u6230 ${e.challenges.length}/${ve.challenges.length} \xB7 \u672C\u5C40\u822A\u8DE1 ${Math.round(e.distance)}m \xB7 \u7A2E\u5B50 ${e.seed}<br>\u6A21\u7D44\uFF1A${Sn.find(n=>n.id===e.module).name} \xB7 ${t.assisted?"\u98A8\u7DDA\u8F14\u52A9\u5DF2\u4F7F\u7528\uFF0C\u6210\u7E3E\u7368\u7ACB\u6A19\u793A":"\u672A\u4F7F\u7528\u98A8\u7DDA\u8F14\u52A9"}</p><p class="modal-note">\u4E0B\u4E00\u8D9F\u76EE\u6A19\uFF1A${nn(t.next)}</p>`,[{label:"\u518D\u98DB\u4E00\u8D9F",primary:!0,action:()=>Ri(!1)},{label:"\u7E7C\u7E8C\u63A2\u7D22",action:Uh},{label:"\u63DB\u6A21\u7D44\u8207\u98A8\u6CC1",action:Wl},{label:"\u8B80\u6587\u660E\u788E\u7247",action:Bf}],Uf())}function Rf(){Ct.camera=Ct.camera==="overhead"?"follow":"overhead",ps(),sn(),me.status==="running"&&we("#world").focus(),Jt(Ct.camera==="overhead"?"\u4FEF\u77B0\u6A21\u5F0F \xB7 V \u8FD4\u56DE\u8FFD\u96A8":"\u8FFD\u96A8\u6A21\u5F0F \xB7 C \u56DE\u6B63\u93E1\u982D")}function Rx(){me.state.trackedHint||me.state.activeChallenge||(me.setRouteStyle(me.routeStyle==="safe"?"shortcut":"safe"),sn(),Pi(),me.status==="running"&&we("#world").focus(),Jt(ve.routes.find(i=>i.id===me.state.objective.routeId)?.description||"\u822A\u7DDA\u5DF2\u5207\u63DB"))}function Pi(){let i=me.state,e=i.player,t=i.objective,n=ve.routes.find(h=>h.id===t.routeId),s=i.challengeHint||i.trackedHint||i.surveyHint,r=s||t,a=Math.round(Math.hypot(e.x-r.x,e.z-r.z)),o=matchMedia("(pointer: coarse)").matches,l=o?"\u5C55\u5E06\u9375":"Space",c=o?"\u6E1B\u901F\u9375":"Shift",u=o?"\u4E92\u52D5\u9375":"E";if(lt&&(nt("#objective",`${i.challengeHint||i.trackedHint?`\u6E2C\u98A8 ${s.stage}/${s.stageTotal} \xB7 `:i.activated.length<3?`${i.activated.length+1}/3 \xB7 `:"\u8FD4\u822A \xB7 "}${s?.stageName||s?.name||t.name}  ${a}m`),nt("#objective-sub",i.nearby?.canInteract?`\u5B89\u5168\u843D\u5730 \xB7 \u6309 ${u} ${i.activeChallenge?"\u4EA4\u4ED8\u672C\u968E\u6BB5":"\u555F\u52D5\u822A\u6A19"}`:e.grounded?`${l} \u8D77\u822A \xB7 ${i.surveyHint?"\u4F9D\u5E8F\u5B8C\u6210\u89C0\u6E2C\u74B0":"\u5730\u5716\u53EF\u5207\u63DB\u822A\u7DDA"}`:s?.landing?`\u62B5\u5CF6\u4E0A\u7A7A\u6309\u4F4F ${c} \u4E0B\u964D`:s?Mx(s)||"\u7A7F\u904E\u524D\u65B9\u89C0\u6E2C\u74B0\uFF0C\u8A18\u9304\u98A8\u6CC1":`\u62B5\u5CF6\u4E0A\u7A7A\u6309\u4F4F ${c} \u4E0B\u964D`)),nt("#region",Bt(i.checkpoint).region+" / "+Bt(i.checkpoint).name),nt("#flight-mode",e.grounded?"\u5B89\u5168\u5730\u9762":e.braking?"\u6536\u5E06\u4E0B\u964D":e.gliding?"\u4E58\u98A8\u6ED1\u7FD4":`\u81EA\u7531\u843D\u9AD4 \xB7 ${l} \u5C55\u5E06`),nt("#altitude",`${Math.round(e.y)} m \u9AD8\u5EA6`),nt("#speed",`${Math.round(Math.hypot(e.vx,e.vz))} m/s`),nt("#clock",Vl(i.elapsed)),nt("#flight-tip",o?"\u5DE6\u6416\u687F\u79FB\u52D5 \xB7 \u5C55\u5E06\u5207\u63DB \xB7 \u6309\u4F4F\u6E1B\u901F\u4E0B\u964D":"Space \u8D77\u8DF3\uFF0F\u5C55\u5E06\u3000\xB7\u3000Shift \u6536\u5E06\u6E1B\u901F\u3000\xB7\u3000E \u4E92\u52D5"),nt("#energy-value",`${Math.round(e.energy)}%`),we("#energy-bar").style.width=`${e.energy}%`,we(".energy-panel").classList.toggle("low",e.energy<22),nt("#wind-label",i.hazard==="thunder"?"\u26A1 \u96F7\u96F2 \xB7 \u5411\u5916\u7E5E\u884C":i.hazard==="fog"?"\u224B \u96F2\u9727 \xB7 \u770B\u822A\u6A19":i.wind.includes("thermal")?"\u2191 \u71B1\u6D41\u62AC\u5347":i.wind.includes("tailwind")?"\u2197 \u9806\u98A8\u88DC\u80FD":i.wind.includes("crosswind")?"\u2194 \u5074\u98A8\u4FEE\u6B63":"\u98A8\u5E36\u5916 \xB7 \u6301\u7E8C\u8017\u80FD"),nt("#station-count",`\u89C0\u6E2C\u53F0 ${i.activated.length} / 3`),nt("#relic-count",`\u788E\u7247 ${i.relics.length} / ${ve.relics.length}`),nt("#challenge-count",`\u6E2C\u98A8 ${i.challenges.length} / ${ve.challenges.length}`),nt("#route-label",i.activeChallenge?"\u6E2C\u98A8\u9060\u5F81\u822A\u9053":i.trackedHint?"\u5B89\u5168\u63A5\u99C1\u98A8\u9053":i.routeStyle==="safe"?"\u5B89\u5168\u98A8\u9053":"\u7A7F\u96F2\u6377\u5F91"),we("#route-toggle").disabled=!!i.trackedHint||!!i.activeChallenge,nt("#route-toggle",i.activeChallenge?"\u8DDF\u96A8\u672C\u6BB5\u822A\u9580":i.trackedHint?"\u63A5\u99C1\u4F7F\u7528\u5B89\u5168\u98A8\u9053":i.routeStyle==="safe"?"\u5207\u63DB\uFF1A\u6280\u5DE7\u6377\u5F91":"\u5207\u63DB\uFF1A\u5B89\u5168\u98A8\u9053"),Ot("#interact",!!i.nearby?.canInteract&&i.status==="running"),nt("#interact",i.activeChallenge?`${o?"":"E \xB7 "}\u4EA4\u4ED8\u672C\u968E\u6BB5`:i.activated.length===3?`${o?"":"E \xB7 "}\u8FD4\u56DE\u71DF\u5730\u7D50\u7B97`:`${o?"":"E \xB7 "}\u555F\u52D5\u89C0\u6E2C\u53F0`),Tf!==t.routeId&&(ut.setRoute(n),Tf=t.routeId),Ot("#course",!!s),Ot("#leave-course",!!i.activeChallenge||!!i.trackedHint),Ot("#guide",!or&&!s),s){let h=s,f=i.activeChallenge?["crosswind","stability"].includes(ve.challenges.find(g=>g.id===i.activeChallenge)?.kind):i.activated.length===1;nt("#course-kicker",i.activeChallenge||i.trackedHint?"\u9078\u64C7\u6027\u6E2C\u98A8\u9060\u5F81":"\u4E3B\u7DDA\u89C0\u6E2C \xB7 \u4E0D\u9700\u505C\u7559\u7B49\u5F85"),nt("#course-title",h.transit?`\u5B89\u5168\u63A5\u99C1 ${h.transitStep}/${h.transitTotal}`:`${i.challengeHint||i.trackedHint?`${h.stageName} \xB7 `:"\u822A\u7DDA\u89C0\u6E2C \xB7 "}${h.entry?"\u524D\u5F80\u5165\u53E3":`${h.step}/${h.total}`}`),nt("#course-detail",`${e.grounded&&!h.landing?`${l} \u5C55\u5E06\u8D77\u822A\uFF0C${o?"\u5DE6\u6416\u687F":"WASD"} \u5C0D\u6E96\u91D1\u74B0\u3002`:""}${h.transit?`\u6CBF\u98A8\u6A19\u524D\u9032\uFF0C\u76EE\u6A19\u9AD8\u5EA6 ${Math.round(h.y)}m\u3002\u62B5\u5CF6\u5F8C\u9032\u91D1\u74B0\u3002`:h.entry?h.instruction:h.landing?`\u843D\u5230\u5CF6\u4E2D\u592E\uFF0C\u6309 ${u} \u4EA4\u4ED8\uFF1B\u5DF2\u5B8C\u6210\u968E\u6BB5\u4FDD\u7559\u3002`:`\u76EE\u6A19\u9AD8\u5EA6 ${Math.round(h.y)}m\uFF1B${e.y<h.y-h.radius?"\u4FDD\u6301\u5C55\u5E06\uFF0C\u6CBF\u9752\u8272\u98A8\u5E36\u62AC\u5347\u3002":e.y>h.y+h.radius?`\u6309\u4F4F ${c} \u964D\u4F4E\u9AD8\u5EA6\u3002`:"\u9AD8\u5EA6\u5DF2\u5C0D\u6E96\uFF0C\u7A7F\u904E\u91D1\u74B0\u4E2D\u592E\u3002"}`}${f&&!h.entry&&!h.transit?` \u5100\u5668\u7A69\u5B9A ${Math.round(i.cargoStability)}%\u3002`:""}`);let d=Math.hypot(e.vx,e.vz),p=[];if(h.landing||p.push([Math.abs(e.y-h.y)<(h.radius||15),`\u9AD8\u5EA6 ${Math.round(e.y)} / ${Math.round(h.y)}m`]),h.minSpeed&&p.push([d>=h.minSpeed,`\u901F\u5EA6 \u2265${h.minSpeed}m/s`]),h.maxSpeed&&p.push([d<=h.maxSpeed,`\u901F\u5EA6 \u2264${h.maxSpeed}m/s`]),h.minEnergy&&p.push([e.energy>=h.minEnergy,`\u80FD\u91CF \u2265${h.minEnergy}%`]),h.maxVerticalSpeed&&p.push([Math.abs(e.vy)<=h.maxVerticalSpeed,`\u5347\u964D \u2264${h.maxVerticalSpeed}m/s`]),h.heading){let g=(e.vx*h.heading.x+e.vz*h.heading.z)/Math.max(.001,d*Math.hypot(h.heading.x,h.heading.z));p.push([g>=(h.heading.minDot??.5),"\u9806\u7BAD\u982D\u5165\u74B0"])}let y=p.map(([g,m])=>`<span class="${g?"met":"unmet"}">${g?"\u2713":"\u25CB"} ${m}</span>`).join("");we("#gate-conditions").innerHTML!==y&&(we("#gate-conditions").innerHTML=y)}if(!or){let h,f,d,p=Bt(t.islandId);e.grounded&&i.checkpoint===t.islandId?(h="03 \xB7 \u555F\u52D5\u822A\u6A19",f=i.activated.length===3?`\u56DE\u71DF\u5730\u4E2D\u592E\u6309 ${u}`:`\u9760\u8FD1\u89C0\u6E2C\u53F0\u6309 ${u}`,d="\u5B89\u5168\u843D\u5730\u5DF2\u4FDD\u5B58\u3002\u8D70\u5411\u5CF6\u4E2D\u592E\u7684\u91D1\u8272\u822A\u6A19\u5B8C\u6210\u9019\u6BB5\u822A\u7A0B\u3002"):!e.grounded&&!e.gliding?(h="\u98DB\u884C\u63D0\u793A \xB7 \u6536\u5E06\u4E2D",f=`\u6309 ${l} \u91CD\u65B0\u5C55\u5E06`,d=`\u76EE\u524D\u5728\u81EA\u7531\u843D\u9AD4\u3002${l} \u662F\u5207\u63DB\uFF0C\u4E0D\u9700\u8981\u4E00\u76F4\u6309\u4F4F\uFF1B\u5C55\u5E06\u5F8C\u98A8\u5E36\u624D\u6703\u62AC\u5347\u4F60\u3002`):!e.grounded&&a<75&&e.y<p.y+3?(h="\u98DB\u884C\u63D0\u793A \xB7 \u9AD8\u5EA6\u4E0D\u8DB3",f="\u5148\u62AC\u5347\uFF0C\u518D\u964D\u843D",d=`\u4FDD\u6301\u5C55\u5E06\uFF0C\u6CBF\u5CF6\u908A\u87BA\u65CB\u71B1\u6D41\u4E0A\u5347\u3002\u5148\u653E\u958B ${c}\uFF1B\u9AD8\u904E\u5CF6\u9762\u5F8C\u518D\u79FB\u5411\u4E2D\u592E\u3002`):!e.grounded&&a<p.radius-4&&e.y>=p.y+3?(h="02 \xB7 \u5B89\u5168\u843D\u5CF6",f=`\u73FE\u5728\u6309\u4F4F ${c} \u4E0B\u964D`,d=`\u4F60\u5DF2\u5728\u5CF6\u9762\u4E0A\u65B9\u3002\u6301\u7E8C\u4FEE\u6B63\u65B9\u5411\uFF0C\u843D\u5730\u5F8C\u653E\u958B ${c}\uFF0C\u8D70\u5230\u89C0\u6E2C\u53F0\u6309 ${u}\u3002`):i.activated.length?(h="03 \xB7 \u63A5\u7E8C\u822A\u7A0B",f=t.name,d=n.description):e.grounded&&i.checkpoint==="island-camp"?(h="01 \xB7 \u8B93\u98A8\u63A5\u4F4F\u4F60",f=`\u6309 ${l} \u8D77\u8DF3\u5C55\u5E06`,d=`${o?"\u5DE6\u6416\u687F":"WASD"} \u671D\u524D\u65B9\u91D1\u8272\u822A\u6A19\u79FB\u52D5\uFF0C\u6CBF\u822A\u7DDA\u5716\u7684\u5B89\u5168\u98A8\u9053\u524D\u9032\u3002`):a<75?(h="02 \xB7 \u5C0D\u6E96\u5CF6\u9762",f="\u98DB\u5230\u5CF6\u9762\u4E0A\u65B9\u518D\u6E1B\u901F",d="\u4FDD\u6301\u5C55\u5E06\uFF0C\u671D\u91D1\u8272\u76F4\u67F1\u4FEE\u6B63\u65B9\u5411\u3002\u5230\u9054\u5CF6\u9762\u4E0A\u65B9\u5F8C\uFF0C\u63D0\u793A\u6703\u544A\u8A34\u4F60\u4F55\u6642\u964D\u843D\u3002"):(h="02 \xB7 \u6CBF\u98A8\u5E36\u524D\u9032",f="\u9806\u98A8\u88DC\u80FD\uFF0C\u71B1\u6D41\u62AC\u5347",d=`\u6CBF\u5730\u5716\u865B\u7DDA\u5230\u9054\u8606\u5149\u5EAD\u3002\u7A7A\u4E2D\u4E0D\u7528\u6301\u7E8C\u6309 ${l}\uFF1B\u653E\u958B\u65B9\u5411\u4ECD\u6703\u6ED1\u7FD4\u3002`),nt("#guide-step",h),nt("#guide-text",f),nt("#guide-detail",d)}Cx()}function Cx(){let i=we("#map"),e=i.getContext("2d"),t=me.state,n=.48/(ve.mapScale||1),s=f=>i.width*.3+f*n,r=f=>i.height*.6+f*n;e.clearRect(0,0,i.width,i.height),e.strokeStyle="#bfd3bd14",e.lineWidth=1;for(let f=20;f<i.width;f+=40)e.beginPath(),e.moveTo(f,0),e.lineTo(f,i.height),e.stroke();for(let f=0;f<i.height;f+=40)e.beginPath(),e.moveTo(0,f),e.lineTo(i.width,f),e.stroke();let a=ve.challenges.find(f=>f.id===t.activeChallenge),o=me.courseStage(a),l=ve.challenges.find(f=>f.id===t.trackedHint?.id),c=o?{waypoints:[Bt(o.fromIslandId),...o.gates,Bt(o.toIslandId)]}:l?{waypoints:[t.player,...t.transitWaypoints.slice(t.transitIndex),me.courseEntry(l)]}:ve.routes.find(f=>f.id===t.objective.routeId);c&&(e.strokeStyle=l||t.routeStyle==="safe"?"#bcdfd0":"#e6c17e",e.lineWidth=2,e.setLineDash([5,5]),e.beginPath(),c.waypoints.forEach((f,d)=>d?e.lineTo(s(f.x),r(f.z)):e.moveTo(s(f.x),r(f.z))),e.stroke(),e.setLineDash([])),ve.islands.forEach((f,d)=>{e.beginPath(),e.arc(s(f.x),r(f.z),Math.max(5,f.radius*n*.7),0,Math.PI*2),e.fillStyle=t.activated.includes(f.id)?"#cdb97855":"#6e97836b",e.fill(),e.strokeStyle=f.id===t.objective.islandId?"#ffdc8e":"#b3cdb061",e.lineWidth=f.id===t.objective.islandId?2:1,e.stroke(),e.fillStyle="#f0e5ba",e.font="17px Segoe UI",e.textAlign="center",e.fillText(d+1,s(f.x),r(f.z)+6)}),ve.relics.forEach(f=>{t.relics.includes(f.id)||(e.fillStyle="#eac277",e.fillRect(s(f.x)-2,r(f.z)-2,4,4))});let u=t.challengeHint||t.trackedHint||t.surveyHint;u&&(e.beginPath(),e.arc(s(u.x),r(u.z),6,0,Math.PI*2),e.strokeStyle="#ffe6a7",e.lineWidth=2,e.stroke());let h=t.player;e.save(),e.translate(s(h.x),r(h.z)),e.rotate(h.heading),e.beginPath(),e.moveTo(0,-9),e.lineTo(6,7),e.lineTo(0,3),e.lineTo(-6,7),e.closePath(),e.fillStyle="#fff9dc",e.strokeStyle="#24565a",e.lineWidth=2,e.fill(),e.stroke(),e.restore(),e.fillStyle="#adccbf",e.font="14px Segoe UI",e.fillText("N \u2191",i.width-24,22)}function va(){for(let i of me.drainEvents())i.type==="save"&&sn(),i.type==="glide"&&We.play("glide"),i.type==="wind"&&We.play("tailwind"),i.type==="land"&&(We.play("land"),Jt(`${i.precise?"\u7CBE\u6E96\u843D\u5730":"\u5DF2\u5B89\u5168\u843D\u5CF6"} \xB7 ${i.name} \xB7 checkpoint \u5DF2\u4FDD\u5B58`)),i.type==="stall"&&(We.play("stall"),Jt(i.message)),["hint","edge","assist-offer","low-energy"].includes(i.type)&&(Jt(i.message),i.type==="low-energy"&&We.play("energy")),i.type==="relic"&&(We.play("unlock"),Jt(`\u6587\u660E\u788E\u7247 \xB7 ${i.name}\uFF5C${i.text}`)),i.type==="challenge"&&(We.play("unlock"),Jt(`\u6E2C\u98A8\u6311\u6230\u5B8C\u6210 \xB7 ${i.name} \xB7 \u5168\u90E8\u968E\u6BB5\u5DF2\u4FDD\u5B58`)),i.type==="challenge-start"&&(We.play("ui"),Jt(i.message)),i.type==="challenge-gate"&&We.play("relic"),i.type==="survey"&&(We.play("relic"),Jt(i.message)),i.type==="challenge-stage"&&(We.play("unlock"),Jt(i.message)),i.type==="challenge-reset"&&i.reason==="cancel"&&Jt(i.message),i.type==="station"&&(We.play("unlock"),Ax(i.dialogue)),i.type==="complete"&&(sn(),Gn(!0))}function Lh(i){let e=i-Ma,t=Math.min(e/1e3,.15);if(Ma=i,rr){Gl=requestAnimationFrame(Lh);return}document.hidden||ut.sampleFrame(e);let n=performance.now();if(me.status==="running"){ms+=t;let a=0;for(;ms>=1/60&&a++<9;)me.step(Mn.read(ut.yaw),1/60),ms-=1/60;va()}let s=performance.now()-n;ut.update(me.state,Math.min(t,.05),i/1e3,me.state.objective),We.update({speed:Math.hypot(me.player.vx,me.player.vz),energy:me.player.energy,wind:me.state.wind.length>0});let r=performance.now();Ih+=t,Ih>.1&&(Pi(),Ih=0),lt&&me.status==="running"&&(If.push({simulationMs:s,sceneUpdateMs:ut.phase.sceneUpdateMs,renderCpuMs:ut.phase.renderCpuMs,hudMapMs:performance.now()-r,rafIntervalMs:e}),Pf++,Lf+=t,fs.push(e),fs.length>9e3&&fs.shift(),t>.0333&&Df++),Gl=requestAnimationFrame(Lh)}async function Ix(){xt=Sa.load(),Dh(xt.warning),xt=xt.save,Ct={...xt.settings},!xt.elapsed&&matchMedia("(prefers-reduced-motion: reduce)").matches&&(Ct.reducedMotion=!0),ar=xt.module,me=new vs({save:xt}),ut=new Ol(we("#world")),We=new zl,ps(),Mn=new Bl(we("#world"),{pause:Af,help:()=>{Ft||hi()},view:()=>{Ft||Rf()},recenter:()=>{Ft||ut.recenter()},interact:()=>{me.interact(),va()},blur:()=>{clearTimeout(gs),We.setPaused(!0),me.status==="running"&&Ci("blur")},rotate:(i,e)=>ut.rotate(i,e),zoom:i=>ut.zoom(i)}),ci=new kl({"host:start":()=>{lt?me.status==="paused"&&ui():Ri(xt.elapsed>0||xt.completed)},"host:pause":()=>Ci(),"host:resume":ui,"host:restart":()=>Ri(!1)}),we("#modules").innerHTML=Sn.map((i,e)=>`<button class="module" data-module="${i.id}" aria-pressed="${i.id===ar}"><span class="symbol">${["\u2301","\u25C8","\u2197"][e]}</span><strong>${i.name}</strong><small>${["\u8F49\u5411\u9748\u6D3B \xB7 \u5DE1\u822A\u8F03\u6162","\u6301\u4E45\u84C4\u80FD \xB7 \u8F49\u5411\u8F03\u7DE9","\u9806\u98A8\u52A0\u901F \xB7 \u96E2\u98A8\u8017\u80FD"][e]}</small></button>`).join(""),document.querySelectorAll(".module").forEach(i=>i.onclick=()=>bx(i.dataset.module)),we("#seed").value=xt.elapsed?xt.seed:2718,we("#start").onclick=()=>Ri(!1),we("#continue").onclick=()=>Ri(!0),Ot("#continue",xt.elapsed>0),nt("#continue",xt.completed?"\u67E5\u770B\u7D50\u7B97\uFF0F\u7E7C\u7E8C\u63A2\u7D22":"\u7E7C\u7E8C\u4E0A\u6B21\u822A\u7A0B"),we("#daily-seed").onclick=()=>{we("#seed").value=Number(new Intl.DateTimeFormat("en-CA",{timeZone:"Asia/Taipei",year:"numeric",month:"2-digit",day:"2-digit"}).format(new Date).replace(/-/g,""))%999999,Jt("\u4ECA\u65E5\u98A8\u6CC1\u50C5\u4F9B\u672C\u6A5F\u91CD\u73FE\uFF0C\u6C92\u6709\u5168\u7403\u6392\u540D\u3002")},we("#new-seed").onclick=()=>{we("#seed").value=crypto.getRandomValues(new Uint32Array(1))[0]%999999+1},we("#pause").onclick=Af,we("#help").onclick=hi,we("#camera").onclick=Rf,we("#route-toggle").onclick=Rx,we("#leave-course").onclick=()=>{me.cancelChallenge(),va(),Pi(),me.status==="running"&&we("#world").focus()},we("#interact").onclick=()=>{me.interact(),va()},we("#hide-guide").onclick=()=>{or=!0,Ot("#guide",!1),me.status==="running"&&we("#world").focus()},we("#close-modal").onclick=Nf,nt("#build-label",`Aetherwake ${Ch.version} \xB7 \u539F\u5275\u98A8\u5883\u63A2\u7D22`),we("#world").addEventListener("webglcontextlost",i=>{i.preventDefault(),rr=!0,lt&&me.status!=="complete"&&Ci("silent"),Mn.setEnabled(!1),We.setPaused(!0),Wn("context","\u6B63\u5728\u91CD\u65B0\u63A5\u4F4F\u9019\u9663\u98A8","<p>\u7E6A\u5716\u88DD\u7F6E\u66AB\u6642\u4E2D\u65B7\uFF0C\u822A\u7A0B\u5DF2\u51CD\u7D50\u3002\u6062\u5FA9\u5F8C\u53EF\u5F9E\u76EE\u524D\u4F4D\u7F6E\u7E7C\u7E8C\uFF1B\u82E5\u9700\u91CD\u65B0\u8F09\u5165\uFF0C\u6703\u8FD4\u56DE\u6700\u5F8C\u5B89\u5168\u5CF6\uFF0C\u4FDD\u7559\u5DF2\u53D6\u5F97\u7684\u89C0\u6E2C\u8207\u788E\u7247\u3002</p>",[{label:"\u5F9E\u5B89\u5168\u5CF6\u91CD\u65B0\u8F09\u5165",primary:!0,action:()=>location.reload()}],"\u7E6A\u5716\u88DD\u7F6E\u6062\u5FA9\u4E2D")}),we("#world").addEventListener("webglcontextrestored",()=>{rr=!1,Ma=performance.now(),ms=0,ps(),lt&&me.status!=="complete"?lr("\u98A8\u5DF2\u56DE\u4F86\uFF0C\u6E96\u5099\u7E7C\u7E8C\u822A\u7A0B"):lt?Gn():(Ii(),Jt("\u7E6A\u5716\u88DD\u7F6E\u5DF2\u6062\u5FA9\uFF0C\u53EF\u6E96\u5099\u555F\u7A0B\u3002"))}),we("#modal").addEventListener("keydown",i=>{if(i.key==="Tab"){let e=[...we("#modal").querySelectorAll("button,input,select")].filter(s=>!s.disabled),t=e[0],n=e.at(-1);i.shiftKey&&document.activeElement===t?(i.preventDefault(),n.focus()):!i.shiftKey&&document.activeElement===n&&(i.preventDefault(),t.focus())}}),Object.defineProperty(window,"__aetherwake",{value:Object.freeze({build:Object.freeze({...Ch}),snapshot:()=>me.snapshot(),metrics:()=>{let i=[...fs].sort((n,s)=>n-s),e=ut.renderer.getContext(),t=e.getExtension("WEBGL_debug_renderer_info");return{...ut.metrics,phases:If.summary(),camera:ut.inspectCamera(me.player),frameCount:Pf,averageMs:fs.length?fs.reduce((n,s)=>n+s,0)/fs.length:null,contextLost:rr,quality:ut.quality,inputListeners:Mn.listeners.length,resolutionScale:ut.renderer.getPixelRatio(),elapsedSample:Lf,p50:i[Math.floor(i.length*.5)]||null,p95:i[Math.floor(i.length*.95)]||null,longFrames:Df,renderer:ut.renderer.getContext().getParameter(ut.renderer.getContext().RENDERER),unmaskedRenderer:t?e.getParameter(t.UNMASKED_RENDERER_WEBGL):null,audio:{contextState:We.context?.state||"uninitialized",activeVoices:We.active.size,events:We.stats.events,musicBeats:We.noteIndex,peakVoices:We.stats.peakVoices,musicVolume:We.musicVolume,sfxVolume:We.sfxVolume,loadedSamples:We.sampleBuffers.size,sampleFailed:We.sampleFailed}}}})}),window.addEventListener("pagehide",()=>{lt&&sn(),Mn.clear(),We.setPaused(!0)}),window.addEventListener("beforeunload",()=>{cancelAnimationFrame(Gl),Mn.dispose(),We.dispose(),ut.dispose(),ci.dispose()}),Pi(),ci.setReady(),Gl=requestAnimationFrame(Lh)}Ix().catch(i=>{console.error(i),Ot("#fatal"),nt("#fatal-message",`\u7121\u6CD5\u5EFA\u7ACB 3D \u5834\u666F\u3002\u8ACB\u78BA\u8A8D\u700F\u89BD\u5668\u5DF2\u555F\u7528 WebGL\uFF0C\u4E26\u91CD\u65B0\u8F09\u5165\u3002${i.message}`),ci?.send("game:error",{message:String(i.message).slice(0,300)})});
/*! Bundled license information:

three/build/three.core.js:
three/build/three.module.js:
  (**
   * @license
   * Copyright 2010-2025 Three.js Authors
   * SPDX-License-Identifier: MIT
   *)
*/
