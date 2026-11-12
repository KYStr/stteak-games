function Mt(i,e){i=Math.abs(i),e=Math.abs(e);let t=Math.max(i,e);return t?t===1/0?1/0:(i/=t,e/=t,Math.sqrt(i*i+e*e)*t):0}function dc(i,e,t){i=Math.abs(i),e=Math.abs(e),t=Math.abs(t);let n=Math.max(i,e,t);if(!n)return 0;if(n===1/0)return 1/0;i/=n,e/=n,t/=n;let s=i*i,r=e*e,a=s+r,o=a-s-r;return Math.sqrt(a+(t*t-o))*n}var Np=(i,e,t)=>({x:i,y:e,z:t}),Hi=(i,e)=>i.find(t=>t.id===`island-${e}`),vr=(i,e=26)=>Np(i.x,i.y+e,i.z),bs=(i,e)=>{let t=Math.hypot(e.x-i.x,e.z-i.z)||1;return{x:(e.x-i.x)/t,z:(e.z-i.z)/t}},fc=i=>Math.round(i.slice(1).reduce((e,t,n)=>e+Math.hypot(t.x-i[n].x,t.y-i[n].y,t.z-i[n].z),0)),Fp=[{mission:1,from:"camp",to:"reed",type:"survey",title:"\u6821\u6E96\u8606\u5149\u98A8\u6A19",roles:["\u8D77\u98A8\u57FA\u6E96","\u4E0A\u5347\u5256\u9762","\u9AD8\u5C64\u98A8\u901F","\u71B1\u6D41\u51FA\u6D41","\u5074\u98A8\u88DC\u511F","\u4F4E\u5C64\u56DE\u6D41","\u5B9A\u5411\u5FA9\u6838","\u6821\u6E96\u4EA4\u4ED8"],safe:[[-60,32,-150],[-280,55,-300],[-520,82,-360],[-690,72,-510],[-680,44,-700],[-530,40,-875],[-350,38,-885],[-308,34,-712]],shortcut:[[60,30,-125],[20,60,-260],[-70,86,-375],[-150,58,-490],[-265,42,-580],[-390,52,-650],[-410,34,-760],[-308,34,-712]],decisions:["\u5728\u4F4E\u5C64\u5148\u5C0D\u9F4A\u98A8\u5411\u518D\u8D77\u901F","\u85C9\u71B1\u6D41\u53D6\u5F97\u9AD8\u8655\u6A23\u672C\u800C\u975E\u76F4\u63A5\u8D8A\u5CF6","\u7A7F\u904E\u5074\u98A8\u5F8C\u4FEE\u6B63\u822A\u5411\u518D\u904E\u9580","\u964D\u56DE\u4EA4\u4ED8\u9AD8\u5EA6\uFF0C\u4FDD\u7559\u843D\u5730\u80FD\u91CF"],descriptions:{safe:"\u6CBF\u5916\u5074\u5BEC\u98A8\u5ECA\u53D6\u5F97\u516B\u4EFD\u98A8\u5C64\u6A23\u672C\uFF1B\u88DC\u80FD\u71B1\u6D41\u591A\u3001\u6025\u964D\u5C11\uFF0C\u8DEF\u7A0B\u8F03\u9577\u3002",shortcut:"\u6CBF\u4E2D\u592E\u7A84\u98A8\u5ECA\u53D6\u5F97\u76F8\u540C\u516B\u4EFD\u6A23\u672C\uFF1B\u8F03\u77ED\u4F46\u9AD8\u4F4E\u8F49\u63DB\u3001\u822A\u5411\u53CA\u80FD\u91CF\u8981\u6C42\u8F03\u9AD8\u3002"}},{mission:2,from:"reed",to:"storm",type:"carry",title:"\u904B\u9001\u5B9A\u5411\u661F\u5100",roles:["\u661F\u5100\u63A5\u8F09","\u7B2C\u4E00\u6BB5\u5B9A\u5411","\u65B7\u6A4B\u8F49\u904B","\u9AD8\u5C64\u907F\u96F7","\u5E73\u7A69\u51FA\u6D41","\u7B2C\u4E8C\u6BB5\u5B9A\u5411","\u964D\u843D\u524D\u5FA9\u6838","\u661F\u5100\u4EA4\u4ED8"],safe:[[-170,40,-870],[70,50,-1080],[300,58,-1260],[510,72,-1410],[755,64,-1290],[1e3,58,-1100],[1120,48,-930],[1008,54,-792]],shortcut:[[-155,42,-700],[10,70,-660],[190,90,-660],[390,94,-610],[580,72,-680],[775,62,-730],[935,54,-875],[1008,54,-792]],decisions:["\u8D77\u822A\u5F8C\u5148\u7A69\u4F4F\u9AD8\u5EA6\u518D\u904B\u9001","\u9078\u65B7\u6A4B\u5916\u7DE3\u6216\u96F7\u5FC3\u4E0A\u5C64","\u9810\u7559\u8F49\u5F4E\u8DDD\u96E2\uFF0C\u907F\u514D\u6025\u964D\u5F8C\u624D\u627E\u4EA4\u4ED8\u9580","\u5E36\u8457\u9918\u80FD\u8207\u6B63\u78BA\u822A\u5411\u62B5\u9054\u5929\u6587\u53F0"],descriptions:{safe:"\u7E5E\u65B7\u6A4B\u5916\u7DE3\u904B\u9001\u516B\u6BB5\u5B9A\u5411\u7D00\u9304\uFF1B\u8F49\u5F4E\u8F03\u5BEC\u3001\u7A69\u5B9A\u5EA6\u9580\u6ABB\u8F03\u5BEC\u9B06\u3002",shortcut:"\u5F9E\u96F7\u810A\u9AD8\u5C64\u904B\u9001\u540C\u4E00\u661F\u5100\uFF1B\u8DEF\u77ED\uFF0C\u4F46\u5FC5\u9808\u63D0\u65E9\u722C\u5347\u4E26\u5E73\u7A69\u7A7F\u904E\u7A84\u98A8\u9580\u3002"}},{mission:3,from:"storm",to:"dawn",type:"observe",title:"\u91CD\u5EFA\u6B78\u661F\u65B9\u4F4D",roles:["\u5317\u65B9\u57FA\u7DDA","\u7B2C\u4E00\u689D\u8996\u7DDA","\u9727\u908A\u8FA8\u5411","\u66F8\u5EAB\u65B9\u4F4D","\u7B2C\u4E8C\u689D\u8996\u7DDA","\u4EA4\u6703\u9EDE\u9A57\u8B49","\u6B78\u661F\u822A\u5411","\u661F\u5716\u4EA4\u4ED8"],safe:[[1130,60,-600],[1220,72,-350],[1080,52,-90],[930,44,90],[850,58,260],[690,46,470],[440,36,650],[272,30,728]],shortcut:[[860,60,-650],[720,82,-440],[660,66,-210],[560,50,25],[455,68,220],[325,48,425],[180,34,600],[272,30,728]],decisions:["\u5F9E\u5169\u500B\u4E0D\u540C\u65B9\u4F4D\u8FA8\u8A8D\u540C\u4E00\u7247\u822A\u57DF","\u5728\u4F4E\u5C64\u7BC0\u80FD\u8207\u9AD8\u5C64\u8996\u91CE\u9593\u53D6\u6368","\u5148\u5C0D\u9F4A\u53EF\u898B\u7684\u5BE6\u9AD4\u822A\u6A19\uFF0C\u518D\u9032\u5165\u9727\u5E36","\u4F9D\u4EA4\u6703\u65B9\u4F4D\u5B8C\u6210\u5357\u5411\u8FD4\u7A0B"],descriptions:{safe:"\u6CBF\u66F8\u5EAB\u5916\u7DE3\u53D6\u5F97\u516B\u500B\u65B9\u4F4D\u7BC0\u9EDE\uFF1B\u822A\u6A19\u6E05\u695A\u3001\u88DC\u80FD\u8F03\u5145\u8DB3\uFF0C\u4F46\u8DDD\u96E2\u8F03\u9577\u3002",shortcut:"\u5F9E\u4E2D\u592E\u9727\u5ECA\u53D6\u5F97\u540C\u7FA9\u65B9\u4F4D\u7BC0\u9EDE\uFF1B\u8F03\u77ED\u4F46\u5FC5\u9808\u66F4\u6E96\u78BA\u5C0D\u9F4A\u822A\u5411\u4E26\u63A7\u5236\u9AD8\u5EA6\u3002"}}];function Op(i,e,t){let n=t==="safe";return i===1?{...[0,2,4].includes(e)?{minSpeed:n?10:13}:{},...[2,5].includes(e)?{minEnergy:n?30:45}:{},...e===6?{maxVerticalSpeed:n?4:3}:{}}:i===2?{maxVerticalSpeed:n?3.5:2.7,...[3,6,7].includes(e)?{minEnergy:n?25:40}:{}}:{...[1,3,5,6].includes(e)?{maxVerticalSpeed:n?3.5:2.8}:{},...e===4?{minEnergy:n?25:40}:{}}}function Mu(i){return[i.minSpeed?`\u901F\u5EA6\u81F3\u5C11 ${i.minSpeed} m/s`:"",i.minEnergy?`\u5E06\u80FD\u91CF\u81F3\u5C11 ${i.minEnergy}%`:"",i.maxVerticalSpeed?`\u5782\u76F4\u901F\u5EA6\u4E0D\u8D85\u904E ${i.maxVerticalSpeed} m/s`:"",i.heading?"\u6CBF\u98A8\u5ECA\u65B9\u5411\u5C0D\u9F4A\u5165\u9580":"\u7A7F\u904E\u7ACB\u9AD4\u6A19\u8A18"].filter(Boolean).join("\uFF1B")}function Su(i){let e=[];for(let s of Fp)for(let r of["safe","shortcut"]){let a=Hi(i,s.from),o=Hi(i,s.to),l=vr(a),c=[];s[r].forEach(([d,m,u],f)=>{let y={id:`sample-main-${s.mission}-${f+1}`,name:s.roles[f],type:s.type,x:d,y:m,z:u,radius:15,...Op(s.mission,f,r)};(s.mission===1&&[4,6].includes(f)||s.mission===2&&[1,3,5,6].includes(f)||s.mission===3&&f!==0&&f!==7)&&(y.heading={...bs(c[f-1]||l,y),minDot:r==="safe"?.65:.82}),y.instruction=`${y.name}\uFF1A${Mu(y)}\u3002${f===7?"\u53D6\u5F97\u5F8C\u5728\u5CF6\u4E2D\u592E\u843D\u5730\u6309 E \u4EA4\u4ED8\u3002":"\u53D6\u6A23\u4E0D\u9700\u7B49\u5F85\uFF0C\u5B8C\u6210\u5F8C\u7ACB\u5373\u98DB\u5F80\u4E0B\u4E00\u7BC0\u9EDE\u3002"}`,c.push(y)});let h=[l,...c,vr(o)];e.push({id:`route-${s.mission}-${r}`,mission:s.mission,style:r,from:a.id,to:o.id,name:`\u7B2C ${s.mission} \u822A\u7DDA \xB7 ${r==="safe"?"\u5B89\u5168\u98A8\u9053":"\u7A7F\u96F2\u6377\u5F91"}`,title:s.title,theme:s.type,description:s.descriptions[r],samples:c,waypoints:h,distanceMeters:fc(h),decisions:s.decisions,designBudgetMinutes:[2.3,3.5]})}let t=Hi(i,"dawn"),n=Hi(i,"camp");for(let s of["safe","shortcut"]){let r=vr(t),a=vr(n),o=Array.from({length:6},(c,h)=>{let d=(h+1)/7;return{id:`sample-return-${h+1}`,name:`\u8FD4\u822A\u822A\u6A19 ${h+1}/6`,type:"return",x:r.x+(a.x-r.x)*d,y:r.y+(a.y-r.y)*d,z:r.z+(a.z-r.z)*d,radius:15,instruction:`\u8FD4\u822A\u822A\u6A19 ${h+1}/6\uFF1A\u6CBF\u98A8\u5ECA\u4E2D\u5FC3\u901A\u904E\uFF1B\u5B8C\u6210\u5F8C\u5728\u71DF\u5730\u4E2D\u592E\u843D\u5730\u6309 E\u3002`}}),l=[r,...o,a];e.push({id:`route-4-${s}`,mission:4,style:s,from:t.id,to:n.id,name:`\u8FD4\u822A \xB7 ${s==="safe"?"\u5B89\u5168\u98A8\u9053":"\u7A7F\u96F2\u6377\u5F91"}`,title:"\u5E36\u661F\u5716\u56DE\u5BB6",theme:"return",samples:o,waypoints:l,description:s==="safe"?"\u6CBF\u5BEC\u5EE3\u3001\u88DC\u80FD\u5145\u8DB3\u7684\u6B78\u822A\u98A8\u5ECA\uFF0C\u8FD4\u56DE\u71DF\u5730\u4E2D\u592E\u843D\u5730\u6309 E \u7D50\u7B97\u3002":"\u6CBF\u8F03\u5FEB\u7684\u7A84\u98A8\u5ECA\u8FD4\u822A\uFF1B\u9810\u7559\u964D\u843D\u80FD\u91CF\uFF0C\u56DE\u71DF\u5730\u4E2D\u592E\u6309 E \u7D50\u7B97\u3002",distanceMeters:fc(l),decisions:["\u9078\u5BEC\u98A8\u5ECA\u7A69\u5B9A\u8FD4\u822A\uFF0C\u6216\u7A84\u98A8\u5ECA\u5FEB\u901F\u8FD4\u822A","\u63D0\u65E9\u4E0B\u964D\uFF0C\u907F\u514D\u8D8A\u904E\u71DF\u5730\u5F8C\u56DE\u982D"],designBudgetMinutes:[.8,1.3]})}return e}function bu(i,e,t,n={}){let s=Math.min(e.y,t.y)-26;return{id:i,type:"tailwind",name:n.name||"\u5206\u5C64\u822A\u9053",start:{...e},end:{...t},x:(e.x+t.x)/2,y:s,z:(e.z+t.z)/2,radius:26,height:Math.abs(t.y-e.y)+58,ceiling:t.y+1,strength:2.4,charge:4.8,liftCap:6,direction:{...bs(e,t),y:0},...n}}function Eu(i,e,t={}){return{id:i,type:"thermal",name:"\u822A\u6BB5\u88DC\u7D66\u71B1\u6D41",x:e.x,y:e.y-35,z:e.z,radius:24,height:70,ceiling:e.y+2,strength:7.5,charge:8,direction:{x:0,y:1,z:0},...t}}function wu(i,e,t,n={}){let s=bs(e,t);return{id:i,type:"crosswind",name:"\u53EF\u8B80\u7684\u8108\u52D5\u5074\u6D41",x:(e.x+t.x)/2,y:Math.min(e.y,t.y)-24,z:(e.z+t.z)/2,radius:64,height:Math.abs(t.y-e.y)+64,strength:4.5,period:8,direction:{x:-s.z,y:0,z:s.x},...n}}function Tu(i){let e=[];for(let t of i)for(let n=1;n<t.waypoints.length;n++){let s=t.waypoints[n-1],r=t.waypoints[n];if(Math.hypot(r.x-s.x,r.z-s.z)<.1)continue;let a=t.style==="safe",o={routeId:t.id,mission:t.mission,sample:n-1,style:t.style};e.push(bu(`wind-${t.id}-${n}`,s,r,{...o,radius:a?26:17,strength:a?2.8:4,charge:a?5.2:3.9,liftCap:a?6:7})),(r.y-s.y>=10||a&&n%3===1)&&e.push(Eu(`wind-${t.id}-thermal-${n}`,r,{...o,radius:a?26:21,charge:a?8:6.5})),(t.mission===1&&n===5||t.mission===2&&[4,7].includes(n))&&e.push(wu(`wind-${t.id}-side-${n}`,s,r,{...o,strength:a?3.3:5.2,radius:a?50:60}))}return e}var Bp={lee:[0,.32,.74,1,.95,.62,.28,.08,0],rim:[0,-.36,-.78,-1,-.82,-.5,-.18,-.06,0],shear:[0,.58,.95,.48,-.32,-.82,-.6,-.2,0],ridge:[0,.5,.95,.9,.5,0,-.32,-.18,0],descent:[0,-.3,-.72,-.9,-.55,0,.24,.1,0]},pc=[.06,.16,.29,.43,.57,.71,.84,.94,1],zp={sweep:[28,36,42,46,43,36,30,26,24],high:[32,50,72,85,76,60,42,30,24],rising:[25,43,68,86,90,76,54,34,24],shelves:[29,47,48,73,74,51,50,32,24],descending:[38,65,82,72,55,39,30,25,24],low:[25,29,32,34,31,28,27,25,24]},kp=[[["camp","bridge","\u5C55\u5E06\u52A0\u901F","\u8B80\u53D6\u9806\u98A8\u9032\u5165\u9EDE\uFF0C\u5148\u5C0D\u6E96\u518D\u52A0\u901F\uFF1B\u5728\u65B7\u6A4B\u4EA4\u4ED8\u8D77\u901F\u7D00\u9304\u3002","lee","sweep",.3,"accelerate"],["bridge","dawn","\u9577\u5F4E\u4FDD\u901F","\u6CBF\u5916\u5F4E\u6301\u7E8C\u4FEE\u6B63\u822A\u5411\uFF1B\u6BD4\u8F03\u5207\u5167\u7DDA\u8207\u4FDD\u7559\u98A8\u5E36\u901F\u5EA6\u3002","shear","low",.25,"corner"],["dawn","storm","\u9AD8\u5C64\u885D\u7DDA","\u5148\u722C\u5347\u518D\u63A5\u9AD8\u901F\u98A8\u5C64\uFF0C\u52FF\u70BA\u6436\u901F\u5EA6\u932F\u904E\u71B1\u6D41\u51FA\u53E3\u3002","ridge","high",.28,"climb-fast"],["storm","camp","\u5E36\u901F\u8FD4\u822A","\u5728\u9577\u4E0B\u964D\u6BB5\u4FDD\u901F\uFF0C\u672B\u9580\u524D\u63D0\u65E9\u6E1B\u901F\uFF0C\u56DE\u71DF\u5730\u4EA4\u4ED8\u3002","descent","descending",.25,"finish"]],[["reed","archive","\u8B80\u53D6\u84C4\u98A8\u9EDE","\u4EA4\u66FF\u7D93\u904E\u88DC\u80FD\u6BB5\u8207\u4F4E\u4F9B\u80FD\u6BB5\uFF1B\u5230\u66F8\u5EAB\u6642\u4FDD\u6709\u5145\u8DB3\u9918\u80FD\u3002","lee","shelves",.4,"harvest"],["archive","bridge","\u6709\u9650\u80FD\u91CF\u8D8A\u810A","\u7528\u524D\u534A\u6BB5\u84C4\u80FD\u7A7F\u904E\u9AD8\u5C64\u5F31\u98A8\uFF0C\u907F\u514D\u6025\u8F49\u9020\u6210\u984D\u5916\u6D88\u8017\u3002","shear","high",.4,"budget"],["bridge","reed","\u9918\u80FD\u56DE\u6536","\u5E36\u8457\u5269\u9918\u80FD\u91CF\u6CBF\u80CC\u98A8\u5074\u964D\u8FD4\u8606\u5149\u5EAD\uFF1B\u4E0D\u4EE5\u5931\u901F\u88DC\u6EFF\u80FD\u91CF\u3002","rim","descending",.42,"reserve"]],[["bridge","camp","\u8FA8\u8A8D\u968E\u68AF\u71B1\u6D41","\u5148\u4F4E\u5F8C\u9AD8\u5730\u63A5\u4E0A\u4E09\u500B\u71B1\u6D41\u5C64\uFF0C\u8B80\u61C2\u4E0B\u4E00\u500B\u4E0A\u5347\u51FA\u53E3\u3002","ridge","rising",.3,"rise"],["camp","storm","\u932F\u5C64\u63DB\u6D41","\u5728\u4E2D\u9AD8\u5C64\u98A8\u5ECA\u4E4B\u9593\u63DB\u6D41\uFF0C\u907F\u514D\u76F4\u63A5\u62C9\u76F4\u822A\u7DDA\u3002","shear","shelves",.32,"transfer"],["storm","archive","\u63D0\u524D\u6536\u5E06","\u5F9E\u9AD8\u8655\u4E0B\u964D\u81F3\u66F8\u5EAB\uFF1B\u63D0\u65E9\u6E1B\u901F\uFF0C\u672B\u9580\u524D\u6062\u5FA9\u5E73\u7A69\u5782\u76F4\u901F\u5EA6\u3002","descent","descending",.35,"descend"],["archive","bridge","\u8D8A\u810A\u6B78\u6A4B","\u5C07\u722C\u5347\u3001\u63DB\u6D41\u8207\u4E0B\u964D\u63A5\u6210\u4E00\u6B21\u5B8C\u6574\u8D8A\u810A\uFF0C\u518D\u56DE\u65B7\u6A4B\u4EA4\u4ED8\u3002","lee","high",.3,"combine"]],[["storm","reed","\u5074\u6D41\u5B9A\u5411","\u5148\u5C0D\u9F4A\u98A8\u9580\uFF0C\u518D\u88DC\u511F\u4F86\u81EA\u5DE6\u5074\u7684\u8108\u52D5\uFF0C\u4E0D\u7B49\u5F85\u98A8\u505C\u3002","lee","sweep",.3,"left-shear"],["reed","dawn","\u53CD\u5411\u98A8\u5207","\u5F8C\u534A\u6BB5\u5074\u98A8\u65B9\u5411\u53CD\u8F49\uFF1B\u89C0\u5BDF\u7BAD\u982D\u800C\u975E\u6CBF\u7528\u4E0A\u4E00\u6BB5\u4FEE\u6B63\u91CF\u3002","shear","shelves",.28,"reverse-shear"],["dawn","bridge","\u8F09\u5100\u904E\u98A8\u810A","\u4FDD\u6301\u5B9A\u5411\u548C\u9AD8\u5EA6\u901A\u904E\u8F03\u5F37\u5074\u6D41\uFF0C\u6CBF\u65B7\u6A4B\u5916\u5074\u9032\u5834\u3002","rim","high",.26,"loaded-shear"],["bridge","storm","\u80CC\u98A8\u8FD4\u53F0","\u5148\u5229\u7528\u80CC\u98A8\u5340\u84C4\u80FD\uFF0C\u518D\u7A69\u5B9A\u6A6B\u8D8A\u6700\u5F8C\u5074\u6D41\u4EA4\u4ED8\u3002","ridge","descending",.32,"lee-return"]],[["archive","reed","\u5C0B\u627E\u7B2C\u4E00\u689D\u8996\u7DDA","\u7528\u5BE6\u9AD4\u822A\u6A19\u9010\u6B21\u78BA\u8A8D\u897F\u5317\u65B9\u4F4D\uFF0C\u4E0D\u628A\u672A\u77E5\u9727\u5340\u7576\u4F5C\u76F4\u7DDA\u6377\u5F91\u3002","lee","sweep",.36,"sightline"],["reed","storm","\u9AD8\u4F4E\u5C64\u4EA4\u53C9\u5B9A\u4F4D","\u5F9E\u5169\u500B\u4E0D\u540C\u9AD8\u5EA6\u91CD\u8B80\u822A\u5411\uFF0C\u5EFA\u7ACB\u53EF\u898B\u98A8\u5ECA\u7684\u4EA4\u6703\u9EDE\u3002","ridge","shelves",.34,"triangulate"],["storm","camp","\u5931\u53BB\u8FD1\u666F\u4E4B\u5F8C","\u8F49\u5165\u4F4E\u5C64\u8584\u9727\uFF0C\u4F9D\u4E0B\u4E00\u500B\u822A\u6A19\u53CA\u98A8\u5E36\u65B9\u5411\u63A5\u56DE\u71DF\u5730\u3002","shear","low",.35,"fog-channel"],["camp","archive","\u5E36\u56DE\u5B8C\u6574\u98A8\u5716","\u5F9E\u76F8\u53CD\u65B9\u5411\u8FA8\u8A8D\u5148\u524D\u5730\u6A19\uFF0C\u4FEE\u6B63\u65B9\u4F4D\u5F8C\u8FD4\u56DE\u66F8\u5EAB\u4EA4\u4ED8\u3002","rim","high",.38,"chart-return"]],[["dawn","bridge","\u7A7A\u8F09\u5B9A\u7DDA","\u5148\u7528\u5BEC\u98A8\u5ECA\u5EFA\u7ACB\u7A69\u5B9A\u8DEF\u7DDA\uFF0C\u89C0\u5BDF\u4E0B\u964D\u524D\u9700\u8981\u7684\u6E96\u5099\u8DDD\u96E2\u3002","lee","low",.28,"empty-run"],["bridge","camp","\u6EFF\u8F09\u7A7F\u96F2","\u651C\u5E36\u661F\u5100\u7A7F\u904E\u932F\u5C64\u96F2\u5ECA\uFF0C\u907F\u514D\u6025\u5347\u6025\u964D\u5F8C\u624D\u6821\u6B63\u3002","ridge","shelves",.3,"loaded-run"],["camp","archive","\u4EA4\u4ED8\u524D\u5E73\u822A","\u5728\u9577\u8F49\u5F4E\u5F8C\u6062\u5FA9\u5E73\u822A\uFF0C\u5E36\u8DB3\u9918\u80FD\u62B5\u9054\u66F8\u5EAB\u4EA4\u4ED8\u9EDE\u3002","shear","sweep",.35,"handover"],["archive","dawn","\u5B9A\u5411\u8FD4\u5BB6","\u6CBF\u4E0B\u6C89\u98A8\u5C64\u63D0\u65E9\u6536\u5E06\uFF0C\u5728\u6B78\u661F\u81FA\u4E0A\u65B9\u91CD\u65B0\u7A69\u5B9A\u5F8C\u843D\u5730\u3002","descent","descending",.35,"precision-return"]]],Hp=["speed","energy","thermal","crosswind","fog","stability"],Vp=["\u521D\u5E06\u7AF6\u901F","\u8606\u5149\u84C4\u98A8","\u65B7\u6A4B\u5347\u964D","\u96F7\u810A\u5B9A\u5411","\u66F8\u5EAB\u63A2\u9727","\u6B78\u661F\u5E73\u822A"],Gp=["camp","reed","bridge","storm","archive","dawn"];function Wp(i,e,t){let n=t===pc.length-1;return i==="speed"?n?{maxVerticalSpeed:3.5}:{minSpeed:t===0?12:e==="corner"?15:16}:i==="energy"?{minEnergy:n?e==="budget"?35:48:[2,5].includes(t)?e==="budget"?42:55:25}:i==="thermal"?[3,6,8].includes(t)?{maxVerticalSpeed:e==="descend"?3:4}:{}:i==="crosswind"?{...[2,4,6,8].includes(t)?{maxVerticalSpeed:e==="loaded-shear"?2.8:3.5}:{},...n?{minEnergy:25}:{}}:i==="fog"?[2,5,8].includes(t)?{maxVerticalSpeed:3.2}:{}:{maxVerticalSpeed:e==="empty-run"?3.5:2.8,...n?{minEnergy:30}:{}}}function Xp(i,e,t,n){let s=[];for(let r=0;r<e.gates.length;r++){let a=r?e.gates[r-1]:e.launch,o=e.gates[r],l={challengeId:i,stageId:e.id,gate:r,style:"challenge"},c=t==="energy"&&[0,1,4,7].includes(r),h=t==="energy"?c?7:2.6:t==="stability"?5.2:4.8;if(s.push(bu(`wind-${e.id}-leg-${r+1}`,a,o,{...l,name:c?"\u84C4\u98A8\u88DC\u7D66\u6BB5":t==="energy"?"\u6709\u9650\u4F9B\u80FD\u6BB5":`${e.name}\u98A8\u5ECA`,radius:t==="energy"?17:20,strength:t==="speed"?3.4:1.8,charge:h,liftCap:t==="thermal"?8:6})),(o.y-a.y>12||t==="thermal"&&r%3===1||c)&&s.push(Eu(`wind-${e.id}-rise-${r+1}`,o,{...l,radius:t==="thermal"?26:22,charge:c?9:7})),t==="crosswind"&&r>0&&r<8){let d=bs(a,o),m=n==="reverse-shear"&&r>=4?-1:1;s.push(wu(`wind-${e.id}-cross-${r+1}`,a,o,{...l,radius:74,strength:n==="loaded-shear"?5.6:4.6,period:r%2?7:9,direction:{x:-d.z*m,y:0,z:d.x*m}}))}}return s}function Au({id:i,fromId:e,toId:t,name:n,description:s,profile:r,altitude:a,widthRatio:o,focus:l,kind:c},h){let d=Hi(h,e),m=Hi(h,t),u=bs(d,m),f={x:-u.z,z:u.x},y=Math.hypot(m.x-d.x,m.z-d.z),g=Math.min(620,Math.max(260,y*o)),p={id:i,name:n,description:s,fromIslandId:d.id,toIslandId:m.id,focus:l,landing:!0,launch:vr(d),gates:[],winds:[],decisions:[s,"\u6700\u5F8C\u4E00\u9580\u4F4D\u65BC\u843D\u9EDE\u4E0A\u65B9\uFF1B\u901A\u904E\u5F8C\u4ECD\u9700\u5728\u5CF6\u4E2D\u592E\u843D\u5730\u6309 E \u4EA4\u4ED8\u3002"]};for(let v=0;v<pc.length;v++){let _=pc[v],x=Bp[r][v]*g,T={id:`${p.id}-gate-${v+1}`,name:v===8?`${m.name}\u9032\u5834\u78BA\u8A8D`:`${n} \xB7 ${v+1}`,type:c==="stability"||l==="loaded-shear"?"carry":c==="fog"?"observe":"survey",x:d.x+(m.x-d.x)*_+f.x*x,y:d.y+(m.y-d.y)*_+zp[a][v],z:d.z+(m.z-d.z)*_+f.z*x,radius:15,...Wp(c,l,v)};(c==="crosswind"&&[1,3,5,7].includes(v)||c==="fog"&&v!==0&&v!==8||c==="stability"&&[2,5,7].includes(v))&&(T.heading={...bs(p.gates[v-1]||p.launch,T),minDot:c==="fog"?.78:.7}),T.instruction=`${T.name}\uFF1A${Mu(T)}\u3002${v===8?"\u964D\u843D\u5CF6\u4E2D\u592E\u5F8C\u6309 E\uFF0C\u624D\u6703\u4FDD\u5B58\u672C\u968E\u6BB5\u3002":s}`,p.gates.push(T)}return p.winds=Xp(i.split("-stage-")[0],p,c,l),p.waypoints=[p.launch,...p.gates,m],p.distanceMeters=fc([p.launch,...p.gates]),p.designBudgetMinutes=[1.3,2.2],p}var qp=[[["reed","bridge","\u84C4\u98A8\u8B80\u5C64","\u6CBF\u88DC\u7D66\u71B1\u6D41\u84C4\u80FD\uFF0C\u5E36\u9918\u80FD\u4EA4\u4ED8\u65B7\u6A4B\u3002","lee","shelves",.4,"harvest"],["bridge","archive","\u8D8A\u810A\u9810\u7B97","\u7528\u524D\u6BB5\u84C4\u80FD\u8D8A\u904E\u9AD8\u5C64\u5F31\u98A8\uFF0C\u4FDD\u7559\u81F3\u5C11 35% \u9918\u80FD\u3002","shear","high",.4,"budget"],["archive","reed","\u9918\u80FD\u6B78\u5EAD","\u6CBF\u80CC\u98A8\u9577\u5F4E\u56DE\u6536\u80FD\u91CF\uFF0C\u8FD4\u56DE\u8606\u5149\u5EAD\u4EA4\u4ED8\u3002","rim","descending",.42,"reserve"]],[["storm","reed","\u5DE6\u5074\u98A8\u5207","\u5C0D\u9F4A\u7BAD\u982D\uFF0C\u88DC\u511F\u5DE6\u5074\u8108\u52D5\uFF0C\u5728\u8606\u5149\u5EAD\u4EA4\u4ED8\u3002","lee","sweep",.3,"left-shear"],["reed","dawn","\u53CD\u5411\u526A\u6D41","\u5F8C\u534A\u6BB5\u5074\u98A8\u53CD\u8F49\uFF0C\u91CD\u65B0\u8B80\u53D6\u7BAD\u982D\u4E26\u63A7\u5236\u5782\u76F4\u901F\u5EA6\u3002","shear","shelves",.28,"reverse-shear"],["dawn","storm","\u80CC\u98A8\u8FD4\u53F0","\u6CBF\u80CC\u98A8\u810A\u7A69\u5B9A\u8F09\u5100\uFF0C\u8FD4\u56DE\u5929\u6587\u53F0\u4EA4\u4ED8\u3002","ridge","descending",.32,"lee-return"]],[["dawn","archive","\u8996\u7DDA\u4EA4\u6703","\u4F9D\u5BE6\u9AD4\u91D1\u74B0\u9010\u6B21\u5B9A\u4F4D\uFF0C\u7A7F\u9727\u524D\u78BA\u8A8D\u65B9\u5411\u3002","lee","sweep",.36,"sightline"],["archive","camp","\u4F4E\u9727\u822A\u9053","\u4F4E\u5C64\u9727\u4E2D\u6CBF\u98A8\u5ECA\u5C0E\u822A\uFF0C\u5E73\u7A69\u901A\u904E\u65B9\u5411\u74B0\u3002","shear","low",.35,"fog-channel"],["camp","dawn","\u98A8\u5716\u5FA9\u6838","\u5F9E\u9AD8\u5C64\u91CD\u8B80\u5730\u6A19\uFF0C\u8FD4\u56DE\u6B78\u661F\u81FA\u4EA4\u4ED8\u5B8C\u6574\u661F\u5716\u3002","rim","high",.38,"chart-return"]]];function Cu(i){return qp.map((e,t)=>{let n=`campaign-circuit-${t+1}`,s=["energy","crosswind","fog"][t],r=e.map(([a,o,l,c,h,d,m,u],f)=>Au({id:`${n}-stage-${f+1}`,fromId:a,toId:o,name:l,description:c,profile:h,altitude:d,widthRatio:m,focus:u,kind:s},i));return{id:n,kind:s,campaignIndex:t,name:["\u84C4\u98A8\u5DE1\u6E2C","\u5074\u6D41\u5B9A\u5411","\u9727\u6D77\u5FA9\u6838"][t],stages:r}})}function Ru(i){return kp.map((e,t)=>{let n=`challenge-${t+1}`,s=Hp[t],r=Hi(i,Gp[t]),a=e.map(([o,l,c,h,d,m,u,f],y)=>Au({id:`${n}-stage-${y+1}`,fromId:o,toId:l,name:c,description:h,profile:d,altitude:m,widthRatio:u,focus:f,kind:s},i));return{id:n,islandId:r.id,kind:s,name:Vp[t],courseRevision:2,description:`${a.length} \u6BB5\u8DE8\u5CF6\u822A\u7A0B\uFF1A${a.map(o=>o.name).join(" \u2192 ")}\u3002\u6BCF\u6BB5\u5B8C\u6210\u5F8C\u5728\u76EE\u7684\u5CF6\u4E2D\u592E\u843D\u5730\u6309 E\uFF1B\u5931\u901F\u6216\u91CD\u8F09\u53EA\u91CD\u8A66\u7576\u524D\u6BB5\u3002`,x:r.x+(t%2?-18:18),y:r.y+22,z:r.z-18,radius:10,minEnergy:0,minSpeed:0,stages:a,distanceMeters:a.reduce((o,l)=>o+l.distanceMeters,0),designBudgetMinutes:[6,8],timingStatus:"design-budget-not-measured"}})}var Mr=2700,mc=4,Tn=Object.freeze([{id:"turn",name:"\u71D5\u7FFC\u8235",description:"\u9748\u6D3B\u8F49\u5411\u3001\u7CBE\u6E96\u843D\u5CF6\uFF1B\u5DE1\u822A\u8F03\u6162\u3002",speed:.92,turn:1.6,energy:1},{id:"reserve",name:"\u84C4\u98A8\u56CA",description:"\u96E2\u958B\u98A8\u5E36\u66F4\u8010\u98DB\uFF1B\u8F49\u5411\u8207\u9806\u98A8\u52A0\u901F\u8F03\u5F31\u3002",speed:.97,turn:.86,energy:.7},{id:"tailwind",name:"\u9010\u98A8\u9C2D",description:"\u9806\u98A8\u52A0\u901F\u6700\u5F37\uFF1B\u504F\u96E2\u98A8\u5E36\u6642\u66F4\u8017\u80FD\u3002",speed:1.08,turn:1,energy:1.18}]),Qn=[{id:"island-camp",name:"\u6668\u98A8\u71DF\u5730",region:"\u8D77\u98A8",x:0,y:0,z:0,radius:38,color:"#9aab74",station:!1},{id:"island-reed",name:"\u8606\u5149\u5EAD",region:"\u8D77\u98A8",x:-80,y:8,z:-180,radius:34,color:"#88ad82",station:!0},{id:"island-bridge",name:"\u65B7\u6A4B\u4E4B\u74B0",region:"\u65B7\u6A4B",x:90,y:18,z:-335,radius:34,color:"#baa17a",station:!1},{id:"island-storm",name:"\u96F7\u96F2\u5929\u6587\u53F0",region:"\u96F7\u96F2",x:255,y:28,z:-195,radius:41,color:"#8b9d9a",station:!0},{id:"island-archive",name:"\u6D6E\u5149\u66F8\u5EAB",region:"\u65B7\u6A4B",x:220,y:18,z:25,radius:34,color:"#9da984",station:!1},{id:"island-dawn",name:"\u6B78\u661F\u81FA",region:"\u96F7\u96F2",x:65,y:4,z:185,radius:38,color:"#b4ab80",station:!0}].map(i=>({...i,x:i.x*mc,z:i.z*mc})),za=(i,e,t)=>({x:i,y:e,z:t}),Pu=Su(Qn),ka=[];for(let i of Qn)ka.push({id:`wind-lift-${i.id}`,type:"thermal",name:"\u8D77\u822A\u71B1\u6D41",x:i.x,y:i.y-14,z:i.z,radius:i.radius+11,height:86,ceiling:i.y+33,strength:7,direction:za(0,1,0)});ka.push(...Tu(Pu));ka.push({id:"wind-cross-reed",type:"crosswind",name:"\u8108\u52D5\u5074\u98A8",x:-168,y:-25,z:-384,radius:74,height:100,strength:4.5,period:8,direction:za(1,0,.2)},{id:"wind-cross-storm",type:"crosswind",name:"\u96F7\u810A\u5074\u98A8",x:376,y:-20,z:-752,radius:92,height:120,strength:6,period:10,direction:za(.2,0,1)},{id:"wind-cross-dawn",type:"crosswind",name:"\u6B78\u661F\u5074\u98A8",x:640,y:-20,z:-16,radius:88,height:120,strength:5,period:9,direction:za(-1,0,.1)});var Iu=[["\u7B2C\u4E00\u5C01\u822A\u4FE1","\u6211\u5011\u628A\u5BB6\u7BC9\u5728\u98A8\u4E0A\uFF0C\u4ECD\u9858\u6BCF\u500B\u51FA\u767C\u7684\u4EBA\u90FD\u6709\u4E00\u689D\u56DE\u5BB6\u7684\u8DEF\u3002"],["\u5E06\u5320\u7684\u523B\u5EA6","\u4E0D\u662F\u628A\u5E06\u62C9\u5F97\u6700\u7DCA\uFF0C\u800C\u662F\u77E5\u9053\u4F55\u6642\u8B93\u98A8\u7A7F\u904E\u3002"],["\u8606\u8466\u7684\u8A18\u61B6","\u98A8\u7D93\u904E\u8606\u8466\uFF0C\u7559\u4E0B\u4E86\u7B2C\u4E00\u9996\u80FD\u88AB\u770B\u898B\u7684\u6B4C\u3002"],["\u5F15\u98A8\u8005\u7684\u7B46\u8A18","\u91D1\u8272\u4E0A\u5347\u74B0\u662F\u71B1\u6D41\uFF0C\u5F4E\u66F2\u9577\u5E36\u662F\u9806\u98A8\u3002\u4E0D\u8981\u53EA\u9760\u984F\u8272\u8FA8\u8A8D\u3002"],["\u6A4B\u4E0A\u7684\u7D04\u5B9A","\u6A4B\u66FE\u9023\u63A5\u5169\u5EA7\u5CF6\u3002\u6A4B\u65B7\u5F8C\uFF0C\u4FE1\u4EF6\u4ECD\u7136\u62B5\u9054\u3002"],["\u820A\u65E5\u6E2C\u98A8\u5C3A","\u5F9E\u7B49\u5F85\u98A8\u5230\u8B80\u61C2\u98A8\uFF0C\u6587\u660E\u8D70\u904E\u7684\u8DDD\u96E2\u6BD4\u5CF6\u8207\u5CF6\u66F4\u9060\u3002"],["\u5929\u6587\u53F0\u661F\u5716","\u661F\u5716\u4E0D\u662F\u70BA\u4E86\u77E5\u9053\u6211\u5011\u5728\u54EA\uFF0C\u800C\u662F\u63D0\u9192\u6211\u5011\u8981\u53BB\u4F55\u65B9\u3002"],["\u96F7\u5B63\u89C0\u6E2C\u8A8C","\u96F7\u5FC3\u4EAE\u8D77\u6642\uFF0C\u7E5E\u884C\u5916\u7DE3\uFF1B\u98A8\u5F9E\u4E0D\u8981\u6C42\u83BD\u649E\u7684\u52C7\u6562\u3002"],["\u6D6E\u5149\u66F8\u9801","\u6BCF\u4E00\u672C\u66F8\u90FD\u66FE\u662F\u4E00\u500B\u4EBA\u7559\u4E0B\u7684\u5CB8\u3002"],["\u7121\u540D\u8FD4\u822A\u8005","\u4ED6\u5E36\u56DE\u7684\u4E0D\u662F\u5BF6\u7269\uFF0C\u800C\u662F\u6240\u6709\u4EBA\u90FD\u80FD\u8D70\u7684\u822A\u7DDA\u3002"],["\u6B78\u661F\u5EA7\u6A19","\u7B2C\u4E09\u675F\u5149\u9EDE\u4EAE\u6642\uFF0C\u9060\u65B9\u7D42\u65BC\u6210\u70BA\u53EF\u4EE5\u56DE\u53BB\u7684\u5730\u65B9\u3002"],["\u7D66\u4E0B\u4E00\u4F4D\u65C5\u4EBA","\u4F60\u7684\u822A\u8DE1\u4E5F\u6703\u6210\u70BA\u5225\u4EBA\u7684\u5730\u5716\u3002\u73FE\u5728\uFF0C\u56DE\u5BB6\u5427\u3002"]],$p=[[[-.76,-.2,1.4,"\u71DF\u5730\u897F\u5317\u5074\u8349\u5730\uFF0C\u6CBF\u5CF6\u9762\u8D70\u5230\u5916\u7DE3\u5167\u5074\u3002"],[.45,.45,20,"\u71DF\u5730\u6771\u5357\u5074\u4E0A\u7A7A 20 \u516C\u5C3A\uFF0C\u501F\u4E2D\u592E\u71B1\u6D41\u5347\u8D77\u5F8C\u8F49\u5411\u3002"]],[[-.55,.58,1.4,"\u8606\u5149\u5EAD\u897F\u5357\u5074\u8349\u5730\uFF0C\u7559\u5728\u5CF6\u7DE3\u77F3\u677F\u5167\u5074\u3002"],[.65,-.35,24,"\u8606\u5149\u5EAD\u6771\u5317\u5074\u4E0A\u7A7A 24 \u516C\u5C3A\uFF0C\u5F9E\u71B1\u6D41\u51FA\u53E3\u5411\u6771\u504F\u8F49\u3002"]],[[.72,.1,1.4,"\u65B7\u6A4B\u6771\u5074\u5CF6\u9762\uFF0C\u65B7\u6A4B\u907A\u8DE1\u5167\u5074\u7684\u53EF\u7AD9\u7ACB\u77F3\u677F\u3002"],[-.5,-.55,26,"\u65B7\u6A4B\u897F\u5317\u5074\u4E0A\u7A7A 26 \u516C\u5C3A\uFF0C\u5148\u5347\u81F3\u6A4B\u9802\u822A\u6A19\u9644\u8FD1\u3002"]],[[-.72,.18,1.4,"\u5929\u6587\u53F0\u897F\u5074\u8349\u5730\uFF0C\u4E2D\u592E\u74B0\u5EA7\u5916\u5074\u4F46\u4ECD\u5728\u5CF6\u9762\u4E0A\u3002"],[.5,-.5,25,"\u5929\u6587\u53F0\u6771\u5317\u5074\u4E0A\u7A7A 25 \u516C\u5C3A\uFF0C\u96E2\u958B\u71B1\u6D41\u6642\u6CBF\u5317\u5074\u7E5E\u904E\u67F1\u51A0\u3002"]],[[-.2,.78,1.4,"\u66F8\u5EAB\u5357\u5074\u5CF6\u9762\uFF0C\u74B0\u5F62\u66F8\u67B6\u5916\u7684\u8349\u5730\u3002"],[.58,-.48,23,"\u66F8\u5EAB\u6771\u5317\u5074\u4E0A\u7A7A 23 \u516C\u5C3A\uFF0C\u501F\u4E2D\u592E\u71B1\u6D41\u8D8A\u904E\u74B0\u5F62\u67F1\u9802\u3002"]],[[.72,.15,1.4,"\u6B78\u661F\u81FA\u6771\u5074\u8349\u5730\uFF0C\u671D\u6668\u5149\u8DEF\u6A19\u8D70\u5230\u5CF6\u7DE3\u5167\u5074\u3002"],[-.58,-.45,22,"\u6B78\u661F\u81FA\u897F\u5317\u5074\u4E0A\u7A7A 22 \u516C\u5C3A\uFF0C\u56DE\u5230\u71B1\u6D41\u5F8C\u5411\u5317\u96E2\u6D41\u3002"]]],Yp=Qn.flatMap((i,e)=>$p[e].map(([t,n,s,r],a)=>({id:`relic-${String(e*2+a+1).padStart(2,"0")}`,islandId:i.id,name:Iu[e*2+a][0],text:Iu[e*2+a][1],hint:r,x:i.x+t*i.radius,y:i.y+s,z:i.z+n*i.radius,radius:3.6}))),Zp=Ru(Qn),le=Object.freeze({mapScale:mc,boundsRadius:2600,islands:Qn,winds:ka,routes:Pu,relics:Yp,challenges:Zp,campaignCircuits:Cu(Qn),hazards:[{id:"hazard-thunder",type:"thunder",name:"\u96F7\u96F2\u6838\u5FC3",x:360,y:10,z:-680,radius:80,height:100,period:10,description:"\u96F7\u5FC3\u6BCF 10 \u79D2\u8108\u52D5\uFF1B\u6CBF\u4E0A\u5C64\u98A8\u5ECA\u7E5E\u958B\u96F7\u5FC3\uFF0C\u9583\u5149\u671F\u9593\u9760\u8FD1\u6703\u52A0\u5FEB\u8017\u80FD\u3002"},{id:"hazard-fog",type:"fog",name:"\u6D6E\u5149\u9727\u6D77",x:868,y:-8,z:-12,radius:175,height:100,description:"\u6CBF\u66F8\u5EAB\u65B9\u4F4D\u8207\u4E0B\u4E00\u500B\u5BE6\u9AD4\u822A\u6A19\u8FA8\u5411\uFF1B\u9727\u53EA\u906E\u64CB\u8996\u91CE\uFF0C\u4E0D\u76F4\u63A5\u6263\u80FD\u91CF\u3002"},{id:"hazard-fog-central",type:"fog",name:"\u4E2D\u592E\u9727\u5ECA",x:560,y:-8,z:35,radius:185,height:100,description:"\u9032\u9727\u524D\u8B80\u53D6\u98A8\u5ECA\u65B9\u5411\uFF1B\u4F4E\u5C64\u7BC0\u80FD\uFF0C\u9AD8\u5C64\u8996\u91CE\u8F03\u6E05\u695A\u3002"},{id:"hazard-fog-west",type:"fog",name:"\u897F\u810A\u96F2\u5E55",x:250,y:-8,z:-490,radius:215,height:90,description:"\u897F\u5411\u822A\u6BB5\u7684\u96F2\u5E55\u906E\u4F4F\u8FD1\u666F\uFF0C\u6CBF\u6709\u65B9\u5411\u7684\u89C0\u6E2C\u9580\u9010\u6BB5\u5B9A\u4F4D\u3002"},{id:"hazard-fog-north",type:"fog",name:"\u5317\u810A\u8584\u9727",x:680,y:-8,z:-610,radius:170,height:100,description:"\u96E2\u958B\u66F8\u5EAB\u5F8C\u7684\u7B2C\u4E00\u6BB5\u9727\u5E36\uFF1B\u5148\u78BA\u8A8D\u4E0B\u4E00\u9580\u65B9\u5411\u518D\u9032\u5165\u96F2\u5E55\u3002"}],dialogues:[{id:"dialogue-1",station:"island-reed",title:"\u7B2C\u4E00\u675F\u5149",text:"\u516B\u4EFD\u98A8\u5C64\u6A23\u672C\u6821\u6E96\u4E86\u8606\u5149\u98A8\u6A19\u3002\u73FE\u5728\u7A69\u5B9A\u904B\u9001\u5B9A\u5411\u661F\u5100\uFF1A\u53EF\u7E5E\u65B7\u6A4B\u5916\u7DE3\uFF0C\u4E5F\u53EF\u63A5\u4E0A\u96F7\u810A\u9AD8\u5C64\u7A84\u98A8\u5ECA\u3002"},{id:"dialogue-2",station:"island-storm",title:"\u88AB\u8A18\u4F4F\u7684\u822A\u7DDA",text:"\u5B9A\u5411\u661F\u5100\u5B89\u5168\u62B5\u9054\uFF0C\u516B\u6BB5\u7D00\u9304\u8B93\u9060\u661F\u91CD\u65B0\u6E05\u6670\u3002\u63A5\u8457\u5F9E\u4E0D\u540C\u9AD8\u5EA6\u548C\u65B9\u4F4D\u89C0\u6E2C\u9727\u6D77\uFF0C\u91CD\u5EFA\u5357\u65B9\u6B78\u661F\u81FA\u7684\u5EA7\u6A19\u3002"},{id:"dialogue-3",station:"island-dawn",title:"\u5BB6\u7684\u5EA7\u6A19",text:"\u516B\u500B\u65B9\u4F4D\u7BC0\u9EDE\u5DF2\u4EA4\u6703\u6210\u661F\u5716\u3002\u73FE\u5728\u6CBF\u6B78\u822A\u98A8\u5E36\u8FD4\u56DE\u6668\u98A8\u71DF\u5730\uFF0C\u8B93\u6240\u6709\u65C5\u4EBA\u90FD\u80FD\u627E\u5230\u56DE\u5BB6\u7684\u65B9\u5411\u3002"}],ending:{title:"\u98A8\u8A18\u5F97\u4F60\u7684\u6B78\u9014",text:"\u5929\u6587\u53F0\u91CD\u65B0\u4EAE\u8D77\u3002\u516D\u5EA7\u5CF6\u4E0D\u518D\u662F\u6563\u843D\u7684\u5CB8\uFF0C\u800C\u662F\u4E00\u5F35\u53EF\u4EE5\u91CD\u8D70\u3001\u53EF\u4EE5\u5206\u4EAB\u7684\u822A\u5716\u3002\u4E0B\u4E00\u8D9F\uFF0C\u8A66\u8457\u66F4\u5E73\u7A69\u3001\u66F4\u8FC5\u901F\uFF0C\u6216\u8B80\u5B8C\u98A8\u7559\u4E0B\u7684\u5341\u4E8C\u5C01\u4FE1\u3002"}}),Es=Qn.filter(i=>i.station).map(i=>i.id),Vt=i=>Qn.find(e=>e.id===i)||Qn[0],Lu=(i,e)=>!i.routeId||!e.activeChallenge&&e.activeCampaignCircuit==null&&i.style===(e.trackedHint||e.mainTransit?.[e.mainTransitIndex]?"safe":e.routeStyle);var gc=23;function yc(i){let e=new Float64Array(i.length*gc);for(let t=0;t<i.length;t++){let n=i[t],s=t*gc,r=n.type==="thermal"?0:n.type==="tailwind"?1:2;e[s]=r,e[s+1]=n.x,e[s+2]=n.y,e[s+3]=n.z,e[s+4]=n.radius,e[s+5]=n.height,e[s+6]=n.ceiling||0,e[s+7]=n.strength,e[s+8]=n.charge??(r===0?9:n.style==="safe"?4.5:2.1),e[s+9]=n.liftCap??4.4,e[s+10]=n.direction.x,e[s+11]=n.direction.z,e[s+12]=n.period||1,e[s+13]=n.gate??-1,e[s+14]=n.start?1:0,n.start&&(e[s+15]=n.start.x,e[s+16]=n.start.z,e[s+17]=n.end.x-n.start.x,e[s+18]=n.end.z-n.start.z,e[s+19]=e[s+17]**2+e[s+18]**2)}return e}var Vi=0,Gi=1,Ha=2,Va=3,Sr=4,br=5,xc=6,_c=7,vc=8,Mc=9,Jp=["thermal","tailwind","crosswind"];function Sc(i,e,t,n,s,r){let a=s[xc],o=s[_c],l=s[vc],c=s[Mc];for(let h=0;h<i.length;h+=gc){if(t>=0&&i[h+13]!==t)continue;let d=i[h+2];if(e.y<d||e.y>d+i[h+5])continue;let m;if(i[h+14]){let v=i[h+15],_=i[h+16],x=i[h+17],T=i[h+18],A=((e.x-v)*x+(e.z-_)*T)/i[h+19],C=A<0?0:A>1?1:A;m=Mt(e.x-v-C*x,e.z-_-C*T)}else m=Mt(e.x-i[h+1],e.z-i[h+3]);let u=i[h+4],f=Math.max(0,1-Math.max(0,m-u*.65)/(u*.35));if(f<=0)continue;let y=i[h],g=Jp[y],p=!1;for(let v=0;v<s[br];v++)if(r[v]===g){p=!0;break}if(p||(r[s[br]++]=g),y===0){let v=(i[h+6]-e.y)*.38+1.7,_=i[h+7];s[Vi]=Math.max(s[Vi],(v<-1.2?-1.2:v>_?_:v)*f),s[Gi]=Math.max(s[Gi],i[h+8]*f)}else if(y===1){let v=a*i[h+10]+o*i[h+11],_=v>0?v:0;s[Sr]=Math.max(s[Sr],i[h+7]*_*f*(n?1.75:1));let x=(i[h+6]-e.y)*.18+1.7,T=i[h+9];s[Vi]=Math.max(s[Vi],(x<-1.2?-1.2:x>T?T:x)*f),s[Gi]=Math.max(s[Gi],i[h+8]*f)}else{let v=Math.sin(l/i[h+12]*Math.PI*2+c),_=v>0?v:0;s[Ha]+=i[h+10]*i[h+7]*_*f,s[Va]+=i[h+11]*i[h+7]*_*f}}}var Xi=4,Kp="aetherwake-save",Wi=i=>JSON.parse(JSON.stringify(i)),rn=(i,e=0,t=1e9)=>Number.isFinite(i)&&i>=0?Math.min(t,i):e,Ga=(i,e)=>Array.isArray(i)?[...new Set(i.filter(t=>e.includes(t)))]:[],Ts=i=>i!==null&&typeof i=="object"&&!Array.isArray(i),Wa=(i,e)=>Math.trunc(rn(i,0,e)),bc=i=>Array.isArray(i.stages)?i.stages.length:0,jp=i=>Math.max(0,...le.routes.filter(e=>e.mission===i).map(e=>Array.isArray(e.samples)?e.samples.length:0)),Xa=i=>Array.isArray(i)?[...new Set(i.filter(e=>typeof e=="string"&&e.length>0))]:[];function Mi(i,e,t=!1){return Ts(i)?Object.fromEntries(Object.entries(i).flatMap(([n,s])=>{if(e&&!e.includes(n)||!Ts(s)||!Number.isFinite(s.time)||s.time<0)return[];let r=t?{time:rn(s.time),assisted:s.assisted===!0,module:Tn.some(a=>a.id===s.module)?s.module:"turn",seed:Math.trunc(rn(s.seed,1,4294967295))>>>0}:{time:rn(s.time),score:rn(s.score),stalls:Math.trunc(rn(s.stalls)),assisted:s.assisted===!0};return[[n,r]]})):{}}function qi(){return{schemaVersion:Xi,seed:1,module:"turn",checkpoint:"island-camp",unlocked:["island-camp"],activated:[],relics:[],mainSamples:[0,0,0],returnSamples:0,campaignCircuitStages:[0,0,0],activeCampaignCircuit:null,mode:"expedition",activeSeconds:0,failed:!1,failureReason:null,courseStages:Object.fromEntries(le.challenges.map(i=>[i.id,0])),challenges:[],completedChallenges:[],cargoStability:100,cargoDamage:0,elapsed:0,segmentStart:0,stalls:0,assist:!1,usedAssist:!1,routeStyle:"safe",completed:!1,records:{},routeRecords:{},legacyRecords:{},legacyRouteRecords:{},legacyChallenges:[],settings:{music:.35,sfx:.7,reducedMotion:!1,camera:"follow",quality:"auto"}}}function ws(i){if(!i||typeof i!="object"||Array.isArray(i)||i.schemaVersion!==Xi||!le.islands.some(n=>n.id===i.checkpoint)||!Array.isArray(i.relics)||!Array.isArray(i.activated))return null;let e=qi();e.seed=Math.trunc(rn(i.seed,1,4294967295))>>>0,e.module=Tn.some(n=>n.id===i.module)?i.module:"turn",e.checkpoint=i.checkpoint,e.unlocked=Ga(i.unlocked,le.islands.map(n=>n.id)),e.unlocked=[...new Set(["island-camp",...e.unlocked,i.checkpoint])],e.relics=Ga(i.relics,le.relics.map(n=>n.id)),e.mainSamples=e.mainSamples.map((n,s)=>Wa(Array.isArray(i.mainSamples)?i.mainSamples[s]:0,jp(s+1))),e.returnSamples=Wa(i.returnSamples,6),e.campaignCircuitStages=[0,1,2].map(n=>Wa(i.campaignCircuitStages?.[n],3)),e.activeCampaignCircuit=[0,1,2].includes(i.activeCampaignCircuit)&&e.campaignCircuitStages[i.activeCampaignCircuit]<3?i.activeCampaignCircuit:null,e.mode=i.mode==="exploration"?"exploration":"expedition",e.activeSeconds=rn(i.activeSeconds,0,1e9),e.failed=e.mode==="expedition"&&(i.failed===!0||e.activeSeconds>=2700),e.failureReason=e.failed?"weather-window":null;for(let n of le.challenges)e.courseStages[n.id]=Wa(Ts(i.courseStages)?i.courseStages[n.id]:0,bc(n));let t=le.challenges.filter(n=>bc(n)>0&&e.courseStages[n.id]===bc(n)).map(n=>n.id);e.challenges=Ga(i.challenges,t),e.completedChallenges=[...new Set([...Ga(i.completedChallenges,le.challenges.map(n=>n.id)),...t])];for(let n of Es)if(i.activated.includes(n))e.activated.push(n);else break;e.activeCampaignCircuit=null;for(let n=0;n<e.activated.length&&n<3;n++)if(e.campaignCircuitStages[n]<3){e.activeCampaignCircuit=n;break}if(e.elapsed=rn(i.elapsed),e.stalls=Math.trunc(rn(i.stalls)),e.segmentStart=Number.isFinite(i.elapsed)&&i.elapsed>=0&&i.elapsed<=1e9&&Number.isFinite(i.segmentStart)&&i.segmentStart>=0&&i.segmentStart<=e.elapsed?i.segmentStart:null,e.cargoStability=rn(i.cargoStability,100,100),e.cargoDamage=rn(i.cargoDamage),e.assist=i.assist===!0,e.routeStyle=i.routeStyle==="shortcut"?"shortcut":"safe",e.usedAssist=i.usedAssist===!0||e.assist,e.completed=i.completed===!0&&e.activated.length===Es.length&&i.checkpoint==="island-camp"&&!e.failed&&e.returnSamples===6&&e.mainSamples.every(n=>n===8)&&e.campaignCircuitStages.every(n=>n===3),Ts(i.settings)){let n=i.settings;e.settings.music=rn(n.music,.35,1),e.settings.sfx=rn(n.sfx,.7,1),e.settings.reducedMotion=n.reducedMotion===!0,e.settings.camera=n.camera==="overhead"?"overhead":"follow",e.settings.quality=["auto","low","high"].includes(n.quality)?n.quality:"auto"}return e.records=Mi(i.records,Tn.map(n=>n.id)),e.routeRecords=Mi(i.routeRecords,le.routes.map(n=>n.id),!0),e.legacyRecords=Mi(i.legacyRecords),e.legacyRouteRecords=Mi(i.legacyRouteRecords,null,!0),e.legacyChallenges=Xa(i.legacyChallenges),e}function Qp(i){if(i?.schemaVersion===Xi)return{save:ws(i),migrated:!1};if(Ts(i)&&i.schemaVersion===3){let t=qi(),n=s=>Object.fromEntries(Object.entries(s||{}).map(([r,a])=>[`v3:${r}`,a]));return{migrated:!0,save:ws({...i,...t,seed:i.seed,module:i.module,settings:i.settings,relics:i.relics,unlocked:i.unlocked,courseStages:i.courseStages,challenges:i.challenges,completedChallenges:i.completedChallenges,legacyRecords:{...i.legacyRecords,...n(i.records)},legacyRouteRecords:{...i.legacyRouteRecords,...n(i.routeRecords)},legacyChallenges:i.legacyChallenges})}}let e=i?.schemaVersion===1||i?.schemaVersion===void 0&&i?.version===1;if(Ts(i)&&(e||i.schemaVersion===2)){let t=qi(),n=e?{...t,...i,checkpoint:i.checkpoint??i.island??t.checkpoint,relics:i.relics??i.fragments??[],activated:i.activated??[]}:i,s=ws({...n,schemaVersion:Xi,activated:[],completed:!1,segmentStart:null,mainSamples:t.mainSamples,courseStages:t.courseStages,cargoStability:100,cargoDamage:0,challenges:[],completedChallenges:[],records:{},routeRecords:{},legacyRecords:{...Mi(i.legacyRecords),...Mi(i.records)},legacyRouteRecords:{...Mi(i.legacyRouteRecords,null,!0),...Mi(i.routeRecords,null,!0)},legacyChallenges:[...Xa(i.legacyChallenges),...Xa(i.completedChallenges),...Xa(i.challenges)]});return{save:s,migrated:s!==null}}return{save:null,migrated:!1}}var qa=class{constructor(e,t=Kp){if(this.key=t,this.memory=qi(),this.storage=e,this.pendingWriteWarning=null,e===void 0)try{this.storage=globalThis.localStorage}catch{this.storage=null}}load(){if(this.pendingWriteWarning)return{save:Wi(this.memory),warning:this.pendingWriteWarning,migrated:!1};if(!this.storage)return{save:Wi(this.memory),warning:"\u700F\u89BD\u5668\u5132\u5B58\u4E0D\u53EF\u7528\uFF1B\u672C\u6B21\u9032\u5EA6\u50C5\u4FDD\u7559\u5728\u8A18\u61B6\u9AD4\u3002",migrated:!1};try{let e=this.storage.getItem(this.key);if(!e)return{save:Wi(this.memory),warning:null,migrated:!1};let t;try{t=JSON.parse(e)}catch{t=null}let n=Qp(t);return n.save?(this.memory=n.save,{save:Wi(this.memory),warning:n.migrated?"\u820A\u7248\u7D00\u9304\u5DF2\u6B78\u6A94\uFF1B\u65B0\u7248\u52A0\u5165\u4E09\u5340\u5FC5\u4FEE\u5DE1\u6E2C\u8207\u516D\u5EA7\u8FD4\u822A\u822A\u6A19\u3002\u4E3B\u7DDA\u7531\u71DF\u5730\u91CD\u65B0\u958B\u59CB\uFF0C\u788E\u7247\u3001\u8A2D\u5B9A\u8207\u5DF2\u4EA4\u4ED8\u7684\u65B0\u7248\u9078\u4FEE\u968E\u6BB5\u4FDD\u7559\u3002":null,migrated:n.migrated}):{save:Wi(this.memory),warning:"\u5B58\u6A94\u5DF2\u640D\u58DE\u6216\u7248\u672C\u4E0D\u652F\u63F4\uFF1B\u539F\u59CB\u5B58\u6A94\u4ECD\u4FDD\u7559\uFF0C\u73FE\u5728\u4F7F\u7528\u5B89\u5168\u7684\u65B0\u9032\u5EA6\u3002",migrated:!1}}catch{return{save:Wi(this.memory),warning:"\u7121\u6CD5\u8B80\u53D6\u700F\u89BD\u5668\u5132\u5B58\uFF1B\u672C\u6B21\u9032\u5EA6\u50C5\u4FDD\u7559\u5728\u8A18\u61B6\u9AD4\u3002",migrated:!1}}}save(e){let t=ws({...this.memory,...e,schemaVersion:Xi,settings:{...this.memory.settings,...e?.settings}});if(!t)return{ok:!1,warning:"\u5B58\u6A94\u8CC7\u6599\u4E0D\u5B8C\u6574\uFF0C\u5DF2\u4FDD\u7559\u4E0A\u4E00\u500B\u5B89\u5168\u5B58\u6A94\u3002"};if(this.memory=t,!this.storage)return this.pendingWriteWarning="\u700F\u89BD\u5668\u5132\u5B58\u4E0D\u53EF\u7528\uFF1B\u672C\u6B21\u9032\u5EA6\u50C5\u4FDD\u7559\u5728\u8A18\u61B6\u9AD4\u3002",{ok:!1,warning:this.pendingWriteWarning};try{return this.storage.setItem(this.key,JSON.stringify(t)),this.pendingWriteWarning=null,{ok:!0,warning:null}}catch{return this.pendingWriteWarning="\u5132\u5B58\u7A7A\u9593\u4E0D\u8DB3\u6216\u88AB\u5C01\u9396\uFF1B\u76EE\u524D\u9032\u5EA6\u4ECD\u5728\u8A18\u61B6\u9AD4\uFF0C\u96E2\u958B\u524D\u8ACB\u4FDD\u7559\u6B64\u9801\u3002",{ok:!1,warning:this.pendingWriteWarning}}}clearProgress(){let e=Wi(this.memory.settings);return this.save({...qi(),settings:e})}};var Du=({x:i,y:e,z:t})=>`${i},${e},${t}`,em=({x:i,y:e,z:t})=>({x:i,y:e,z:t}),tm=({x:i,y:e,z:t})=>({x:i,y:e+26,z:t}),Ec=(i,e)=>Math.hypot(i.x-e.x,i.y-e.y,i.z-e.z);function nm(){let i=new Map,e=new Map,t=r=>{let a=Du(r);return i.has(a)||i.set(a,{position:em(r),edges:new Map}),a},n=(r,a)=>{if(r===a)return;let o=Ec(i.get(r).position,i.get(a).position);i.get(r).edges.set(a,o),i.get(a).edges.set(r,o)};for(let r of le.routes.filter(a=>a.style==="safe")){let a;for(let o of r.waypoints){let l=t(o);a!==void 0&&n(a,l),a=l}}let s=[...i.keys()];for(let r of le.islands){let a=tm(r),o=Du(a);if(e.set(r.id,o),i.has(o))continue;let l=s.reduce((c,h)=>c===void 0||Ec(a,i.get(h).position)<Ec(a,i.get(c).position)?h:c,void 0);if(l===void 0)throw new Error("The safe transit network has no route waypoints.");t(a),n(o,l)}return{nodes:i,terminals:e}}var Er=nm();function $a(i,e){let t=Er.terminals.get(i),n=Er.terminals.get(e);if(t===void 0||n===void 0)throw new RangeError("Safe transit requires two known island IDs.");if(t===n)return[];let s=new Map([[t,0]]),r=new Map,a=new Set(Er.nodes.keys());for(;a.size;){let o,l=1/0;for(let c of a){let h=s.get(c)??1/0;h<l&&(o=c,l=h)}if(o===void 0)break;if(o===n){let c=[];for(let h=n;h!==t;h=r.get(h))c.push(Er.nodes.get(h).position);return c.reverse().map(h=>({...h,radius:24,name:"\u5B89\u5168\u63A5\u99C1\u98A8\u6A19",instruction:"\u6CBF\u5BEC\u98A8\u5ECA\u98DB\u5411\u63A5\u99C1\u6A19\uFF1B\u62B5\u5CF6\u5F8C\u518D\u524D\u5F80\u9060\u5F81\u5165\u53E3\u3002"}))}a.delete(o);for(let[c,h]of Er.nodes.get(o).edges){if(!a.has(c))continue;let d=l+h;d<(s.get(c)??1/0)&&(s.set(c,d),r.set(c,o))}}throw new Error(`No safe transit route connects ${i} to ${e}.`)}var wr=(i,e,t)=>Math.max(e,Math.min(t,i)),Uu=i=>JSON.parse(JSON.stringify(i)),$i=(i,e)=>{let t=i.x-e.x,n=i.z-e.z;return t*t+n*n},im=i=>{if(Number.isFinite(Number(i)))return Math.trunc(Number(i))>>>0;let e=2166136261;for(let t of String(i))e=Math.imul(e^t.charCodeAt(0),16777619);return e>>>0},As=class{constructor({seed:e=1,module:t="turn",save:n}={}){this.events=[],this.persisted=ws(n)||qi(),this._setup({seed:n?this.persisted.seed:e,module:n?this.persisted.module:t,resume:!!n})}_setup({seed:e,module:t,resume:n=!1}){let s=this.persisted,r=n?s.activeCampaignCircuit!=null?le.campaignCircuits[s.activeCampaignCircuit].stages[s.campaignCircuitStages[s.activeCampaignCircuit]].fromIslandId:s.checkpoint:"island-camp",a=Vt(r);this.state={seed:im(e),module:Tn.some(o=>o.id===t)?t:"turn",player:{x:a.x,y:a.y,z:a.z,vx:0,vy:0,vz:0,heading:0,grounded:!0,gliding:!1,energy:100,braking:!1},elapsed:n?s.elapsed:0,checkpoint:r,activated:n?[...s.activated]:[],relics:[...s.relics],challenges:n?[...s.challenges]:[],completedChallenges:[...s.completedChallenges],unlocked:[...s.unlocked],stalls:n?s.stalls:0,status:n&&s.failed?"failed":n&&s.completed?"complete":"ready",assist:s.assist,usedAssist:n?s.usedAssist:s.assist,routeStyle:s.routeStyle,segmentFailures:0,distance:0,wind:[],hazard:null,lowEnergy:!1,lastLanding:{islandId:a.id,precise:!0},score:0,rating:null,nearby:null,objective:null,routeTimes:[],segmentStart:n?s.segmentStart:0,airTime:0,challengeProgress:{},activeChallenge:null,challengeHint:null,mainSamples:n?[...s.mainSamples||[0,0,0]]:[0,0,0],returnSamples:n?s.returnSamples:0,campaignCircuitStages:n?[...s.campaignCircuitStages]:[0,0,0],activeCampaignCircuit:n?s.activeCampaignCircuit:null,campaignGate:0,mode:s.mode,activeSeconds:n?s.activeSeconds:0,failureReason:n?s.failureReason:null,surveyHint:null,trackedHint:null,transitWaypoints:[],transitIndex:0,courseStages:{...s.courseStages||{}},cargoStability:n?s.cargoStability??100:100,cargoDamage:n&&s.cargoDamage||0,navigationMessage:null},this.events.length=0,this.eventSpare||=[],this.eventSpare.length=0,this.routePhysics=["safe","shortcut",null].map(o=>yc(le.winds.filter(l=>!l.routeId||l.style===o))),this.stagePhysics=new Map;for(let o of[...le.challenges,...le.campaignCircuits])for(let l of o.stages)this.stagePhysics.set(l.id,yc(l.winds));this.windForces=new Float64Array(10),this.module=Tn.find(o=>o.id===this.state.module),this.nearbyRecord={islandId:"",station:!1,name:"",canInteract:!1,message:""},this.courseEntries=new Map;for(let o of le.challenges)for(let l of o.stages){let c=Vt(l.fromIslandId);this.courseEntries.set(l.id,{id:o.id,name:o.name,radius:o.radius,minSpeed:o.minSpeed||0,minEnergy:o.minEnergy||0,x:c.x+18,y:c.y+22,z:c.z-18})}this.state.mainTransit=[],this.state.mainTransitIndex=0,this.state.rejoinIndex=null,n&&this._planMainRejoin(),this.suppressedChallengeEntries=new Set,this._nearby(),this._objective(),this.state.status==="complete"&&this._rating()}get player(){return this.state.player}get elapsed(){return this.state.elapsed}get checkpoint(){return this.state.checkpoint}get activated(){return this.state.activated}get relics(){return this.state.relics}get challenges(){return this.state.challenges}get stalls(){return this.state.stalls}get status(){return this.state.status}set status(e){["ready","running","paused","complete","failed"].includes(e)&&(this.state.status=e)}get assist(){return this.state.assist}set assist(e){this.setAssist(e)}get routeStyle(){return this.state.routeStyle}set routeStyle(e){this.setRouteStyle(e)}emit(e,t={}){this.events.push({type:e,emittedAt:performance.now(),...t})}launch(){return this.state.status==="ready"||this.state.status==="paused"?(this.state.status="running",this.emit("start"),!0):!1}setPaused(e){e&&this.state.status==="running"?(this.state.status="paused",this.emit("pause")):!e&&this.state.status==="paused"&&(this.state.status="running",this.emit("resume"))}setAssist(e){this.state.assist=!!e,this.state.usedAssist||=!!e,this.emit("assist",{enabled:!!e})}setRouteStyle(e){this.state.routeStyle=e==="shortcut"?"shortcut":"safe",this._objective()}reset({seed:e=this.state.seed,module:t=this.state.module}={}){this.persisted=this.saveData(),this._setup({seed:e,module:t}),this.emit("reset")}snapshot(){return Uu(this.state)}drainEvents(){let e=this.events;return this.events=this.eventSpare,this.eventSpare=e,this.events.length=0,e}campaignStage(){let e=this.state;return e.activeCampaignCircuit==null?null:le.campaignCircuits[e.activeCampaignCircuit].stages[e.campaignCircuitStages[e.activeCampaignCircuit]]}campaignComplete(){let e=this.state;return e.activated.length===3&&e.mainSamples.every(t=>t===8)&&e.campaignCircuitStages.every(t=>t===3)&&e.returnSamples===6&&!e.surveyHint}setExploration(){this.state.mode="exploration",this.status==="failed"&&(this.state.status="paused",this.state.failureReason=null),this.emit("save")}_fail(e){let t=this.state;t.status==="running"&&(t.status="failed",t.failureReason=e,this.emit("failed",{reason:e}),this.emit("save"))}courseStage(e){if(!e?.stages?.length)return null;let t=this.state.courseStages[e.id]||0;return e.stages[t>=e.stages.length?0:t]}courseEntry(e){let t=this.courseStage(e);return t?this.courseEntries.get(t.id):e}trackChallenge(e){let t=le.challenges.find(s=>s.id===e);if(this.state.activeCampaignCircuit!=null||!t||this.state.challenges.includes(e)||!this.player.grounded)return!1;this.state.activeChallenge&&this.cancelChallenge();let n=this.courseStage(t);return this.state.transitWaypoints=$a(this.state.checkpoint,n?.fromIslandId||t.islandId),this.state.transitIndex=0,this._trackedTarget(t),!0}_trackedTarget(e){let t=this.state,n=this.courseStage(e),s=t.transitWaypoints[t.transitIndex];t.trackedHint={id:e.id,name:e.name,...s||this.courseEntry(e),stageName:n?.name,stage:(t.courseStages[e.id]||0)%(e.stages?.length||1)+1,stageTotal:e.stages?.length||1,entry:!s,transit:!!s,transitStep:t.transitIndex+1,transitTotal:t.transitWaypoints.length,step:0,total:(n?.gates?.length||8)+1,instruction:s?`\u6CBF\u5B89\u5168\u63A5\u99C1\u98A8\u6A19\u524D\u5F80${Vt(n?.fromIslandId||e.islandId).name}\u3002\u4E0D\u9700\u505C\u7559\u7B49\u5F85\u3002`:`\u5230${Vt(n?.fromIslandId||e.islandId).name}\u7684\u91D1\u74B0\u958B\u59CB\u672C\u968E\u6BB5\u3002\u5DF2\u4EA4\u4ED8\u968E\u6BB5\u4E0D\u7528\u91CD\u8DD1\u3002`},t.trackedHint.id=e.id}_returnToCheckpoint(){let e=this.state,t=Vt(e.checkpoint);Object.assign(e.player,{x:t.x,y:t.y,z:t.z,vx:0,vy:0,vz:0,heading:0,grounded:!0,gliding:!1,braking:!1,energy:100}),e.wind.length=0,e.hazard=null,e.lowEnergy=!1}cancelChallenge(){let e=this.state,t=e.activeChallenge||e.trackedHint?.id;return t?(this.suppressedChallengeEntries.add(t),e.cargoDamage+=100-e.cargoStability,e.cargoStability=100,delete e.challengeProgress[t],e.activeChallenge=null,e.challengeHint=null,e.trackedHint=null,e.transitWaypoints=[],e.transitIndex=0,this._returnToCheckpoint(),this._planMainRejoin(),this._objective(),this._nearby(),this.emit("challenge-reset",{id:t,reason:"cancel",message:"\u5DF2\u9000\u51FA\u4E26\u8FD4\u56DE\u6700\u5F8C\u5B89\u5168\u5CF6\uFF1B\u4E3B\u7DDA\u6A23\u672C\u8207\u5DF2\u4EA4\u4ED8\u968E\u6BB5\u4FDD\u7559\uFF0C\u4E0D\u52A0\u5931\u901F\u61F2\u7F70\u3002"}),this.emit("save"),!0):!1}saveData(){let e=this.state,t={...this.persisted,schemaVersion:Xi,seed:e.seed,module:e.module,checkpoint:e.checkpoint,unlocked:[...e.unlocked],activated:[...e.activated],relics:[...e.relics],challenges:[...e.challenges],completedChallenges:[...e.completedChallenges],mainSamples:[...e.mainSamples],returnSamples:e.returnSamples,campaignCircuitStages:[...e.campaignCircuitStages],activeCampaignCircuit:e.activeCampaignCircuit,mode:e.mode,activeSeconds:e.activeSeconds,failed:e.status==="failed",failureReason:e.failureReason,courseStages:{...e.courseStages},cargoStability:e.cargoStability,cargoDamage:e.cargoDamage,elapsed:e.elapsed,segmentStart:e.segmentStart,stalls:e.stalls,assist:e.assist,usedAssist:e.usedAssist,routeStyle:e.routeStyle,completed:e.status==="complete"};if(e.status==="complete"&&this.campaignComplete()&&e.mode==="expedition"){let n=t.records[e.module];(!n||n.assisted&&!e.usedAssist||n.assisted===e.usedAssist&&e.elapsed<n.time)&&(t.records={...t.records,[e.module]:{time:e.elapsed,score:e.score,stalls:e.stalls,assisted:e.usedAssist}})}t.routeRecords={...t.routeRecords};for(let n of e.mode==="expedition"?e.routeTimes:[]){let s=`route-${n.mission}-${n.style}`,r=t.routeRecords[s];(!r||r.assisted&&!e.usedAssist||r.assisted===e.usedAssist&&n.seconds<r.time)&&(t.routeRecords[s]={time:n.seconds,assisted:e.usedAssist,module:e.module,seed:e.seed})}return this.persisted=Uu(t),t}_planMainRejoin(){let e=this.state;if(e.activeCampaignCircuit!=null||e.status==="complete"||e.status==="failed")return;let t=le.routes.find(s=>s.id===`route-${e.activated.length+1}-${e.routeStyle}`),n=e.activated.length===3?e.returnSamples:e.mainSamples[e.activated.length];if(n>=t.samples.length){e.mainTransit=e.checkpoint===t.to?[]:$a(e.checkpoint,t.to),e.mainTransitIndex=0,e.rejoinIndex=null;return}e.mainTransit=e.checkpoint===t.from?[]:$a(e.checkpoint,t.from),e.mainTransitIndex=0,e.rejoinIndex=n>0?0:null}_objective(){let e=this.state,t=Vt(Es[e.activated.length]||"island-camp");e.objective={islandId:t.id,name:t.name,step:e.activated.length+1,total:4,x:t.x,y:t.y,z:t.z,routeId:`route-${e.activated.length+1}-${e.routeStyle}`,text:e.activated.length<3?`\u62B5\u9054${t.name}\uFF0C\u5728\u89C0\u6E2C\u53F0\u65C1\u6309 E \u555F\u52D5`:"\u8FD4\u56DE\u6668\u98A8\u71DF\u5730\uFF0C\u5728\u71DF\u706B\u65C1\u6309 E \u5B8C\u6210\u9060\u5F81"};let n=e.mainTransit[e.mainTransitIndex];if(n&&e.activeCampaignCircuit==null){e.surveyHint={...n,mainTransit:!0,name:"\u4E3B\u7DDA\u5B89\u5168\u63A5\u99C1",step:e.mainTransitIndex+1,total:e.mainTransit.length,instruction:"\u6CBF\u5B89\u5168\u98A8\u6A19\u56DE\u5230\u71DF\u5730\u51FA\u767C\u7A7A\u57DF\uFF0C\u518D\u958B\u59CB\u65B0\u7248\u89C0\u6E2C\u3002"};return}let s=this.campaignStage();if(s){let c=le.campaignCircuits[e.activeCampaignCircuit],h=e.campaignGate,d=h>=s.gates.length,m=d?Vt(s.toIslandId):s.gates[h];Object.assign(e.objective,{islandId:s.toIslandId,name:Vt(s.toIslandId).name,text:`\u7B2C ${e.activeCampaignCircuit+1} \u822A\u5340 / \u6E2C\u98A8 ${e.campaignCircuitStages[e.activeCampaignCircuit]+1}/3 / ${d?"\u843D\u5CF6\u4EA4\u4ED8":`\u822A\u9580 ${h+1}/9`}`}),e.surveyHint={...m,radius:d?12:m.radius,campaign:!0,landing:d,stageName:s.name,stage:e.campaignCircuitStages[e.activeCampaignCircuit]+1,stageTotal:3,step:h+1,total:10,instruction:d?"\u843D\u5230\u5CF6\u4E2D\u592E\u6309 E \u4EA4\u4ED8\u672C\u6BB5\u3002":m.instruction};return}let r=le.routes.find(c=>c.id===e.objective.routeId),a=e.activated.length===3?e.returnSamples:e.mainSamples[e.activated.length]||0,o=e.rejoinIndex!=null&&e.rejoinIndex<a,l=r?.samples?.[o?e.rejoinIndex:a];e.surveyHint=l?{...l,step:a+1,total:r.samples.length,mission:e.activated.length+1}:null,e.surveyHint&&o&&Object.assign(e.surveyHint,{rejoin:!0,step:e.rejoinIndex+1,name:`\u98A8\u5ECA\u63A5\u56DE ${e.rejoinIndex+1}/${a}`,minSpeed:0,minEnergy:0,maxVerticalSpeed:void 0,heading:null,instruction:"\u6CBF\u5DF2\u5B8C\u6210\u7684\u4E2D\u5FC3\u7DDA\u822A\u6A19\u63A5\u56DE\u98A8\u5ECA\uFF1B\u65E2\u6709\u89C0\u6E2C\u4FDD\u7559\uFF0C\u4E0D\u9700\u91CD\u505A\u689D\u4EF6\u3002"}),e.surveyHint&&(e.objective.text=`${e.surveyHint.name} ${a+1}/${r.samples.length} \xB7 ${l.instruction}`)}_nearby(){let e=this.state,t=e.player;if(!t.grounded){e.nearby=null;return}let n=null;for(let o=0;o<le.islands.length;o++){let l=le.islands[o];if($i(l,t)<(l.radius-1)**2&&Math.abs(t.y-l.y)<2.5){n=l;break}}let s=null;for(let o=0;o<le.challenges.length;o++){let l=le.challenges[o];if(l.id===e.activeChallenge){s=l;break}}let r=this.campaignStage()||this.courseStage(s),a=r&&(e.activeCampaignCircuit!=null?e.campaignGate:e.challengeProgress[s.id]||0)>=r.gates.length;if(n&&t.grounded&&$i(n,t)<169){let o=this.nearbyRecord;o.islandId=n.id,o.station=n.station,o.name=n.name,o.canInteract=r?!!a&&n.id===r.toIslandId:n.id===e.objective?.islandId&&!e.surveyHint&&!e.trackedHint,o.message=r?"E \xB7 \u4EA4\u4ED8\u6E2C\u98A8\u8CC7\u6599":n.id==="island-camp"?"E \xB7 \u8FD4\u56DE\u71DF\u5730":n.station?"E \xB7 \u555F\u52D5\u89C0\u6E2C\u53F0":"\u5B89\u5168\u88DC\u7D66\u5CF6",e.nearby=o}else e.nearby=null}interact(){let e=this.state;if(e.status!=="running")return!1;if(this._nearby(),!e.nearby)return this.emit("hint",{message:"\u5148\u5B89\u5168\u843D\u5730\uFF0C\u518D\u9760\u8FD1\u5CF6\u4E2D\u592E\u7684\u89C0\u6E2C\u53F0\u3002"}),!1;if(e.activeCampaignCircuit!=null){if(!e.nearby.canInteract)return this.emit("hint",{message:"\u5148\u5B8C\u6210\u4E5D\u5EA7\u5DE1\u6E2C\u822A\u9580\uFF0C\u518D\u5728\u6307\u5B9A\u5CF6\u4E2D\u592E\u843D\u5730\u6309 E\u3002"}),!1;let n=e.activeCampaignCircuit,s=this.campaignStage();return e.campaignCircuitStages[n]++,e.campaignGate=0,e.cargoDamage+=100-e.cargoStability,e.cargoStability=100,e.campaignCircuitStages[n]===3&&(e.activeCampaignCircuit=null,e.segmentStart=e.elapsed),this._objective(),this._nearby(),this._score(),this.emit("campaign-stage",{message:`${s.name}\u5DF2\u4EA4\u4ED8\u3002${this.campaignStage()?.description||"\u5DE1\u6E2C\u5B8C\u6210\uFF0C\u63A5\u7E8C\u4E3B\u7DDA\u91D1\u8272\u822A\u6A19\u3002"}`}),this.emit("save"),!0}if(e.activeChallenge){let n=le.challenges.find(r=>r.id===e.activeChallenge),s=this.courseStage(n);return!s||!e.nearby.canInteract?(this.emit("hint",{message:"\u5148\u4F9D\u5E8F\u5B8C\u6210\u672C\u6BB5\u89C0\u6E2C\uFF0C\u518D\u843D\u5230\u4EA4\u4ED8\u5CF6\u4E2D\u592E\u3002"}),!1):(e.courseStages[n.id]=(e.courseStages[n.id]||0)+1,delete e.challengeProgress[n.id],e.activeChallenge=null,e.challengeHint=null,e.courseStages[n.id]>=n.stages.length?(e.challenges.includes(n.id)||e.challenges.push(n.id),e.completedChallenges.includes(n.id)||e.completedChallenges.push(n.id),this.emit("challenge",{id:n.id,name:n.name}),this._planMainRejoin()):(this.trackChallenge(n.id),this.emit("challenge-stage",{id:n.id,name:n.name,step:e.courseStages[n.id],total:n.stages.length,message:`${s.name}\u5DF2\u4EA4\u4ED8\u4E26\u4FDD\u5B58\u3002\u5F9E\u672C\u5CF6\u7684\u91D1\u74B0\u63A5\u7E8C\u4E0B\u4E00\u6BB5\uFF0C\u6216\u5148\u56DE\u4E3B\u7DDA\u3002`})),e.cargoDamage+=100-e.cargoStability,e.cargoStability=100,this._objective(),this._nearby(),this._score(),this.emit("save"),!0)}if(e.trackedHint)return this.emit("hint",{message:"\u76EE\u524D\u6B63\u524D\u5F80\u6E2C\u98A8\u9060\u5F81\u3002\u5148\u5B8C\u6210\u9060\u5F81\uFF0C\u6216\u9000\u51FA\u4E26\u8FD4\u56DE\u5B89\u5168\u5CF6\u5F8C\u4EA4\u4ED8\u4E3B\u7DDA\u3002"}),!1;let t=Es[e.activated.length];return e.nearby.islandId===t?e.surveyHint?(this.emit("hint",{message:`\u5C1A\u7F3A\u89C0\u6E2C ${e.surveyHint.step}/${e.surveyHint.total}\uFF1A${e.surveyHint.name}\u3002\u6CBF\u91D1\u8272\u822A\u6A19\u5B8C\u6210\u5F8C\u518D\u4EA4\u4ED8\u3002`}),!1):(e.activated.length===1&&(e.cargoDamage+=100-e.cargoStability),e.cargoStability=100,e.activated.push(t),e.segmentFailures=0,Number.isFinite(e.segmentStart)&&e.routeTimes.push({mission:e.activated.length,style:e.routeStyle,seconds:e.elapsed-e.segmentStart}),e.segmentStart=e.elapsed,e.activeCampaignCircuit=e.activated.length-1,e.campaignGate=0,this.emit("station",{islandId:t,index:e.activated.length,dialogue:le.dialogues[e.activated.length-1]}),this._objective(),this._nearby(),this._score(),this.emit("save"),!0):e.nearby.islandId==="island-camp"&&this.campaignComplete()?(Number.isFinite(e.segmentStart)&&e.routeTimes.push({mission:4,style:e.routeStyle,seconds:e.elapsed-e.segmentStart}),e.status="complete",this._rating(),this.emit("complete",{rating:e.rating,score:e.score,ending:le.ending}),this.emit("save"),!0):(this.emit("hint",{message:`\u4E0B\u4E00\u500B\u76EE\u6A19\uFF1A${e.objective.name}\u3002\u5DF2\u9EDE\u4EAE\u7684\u89C0\u6E2C\u53F0\u4E0D\u9700\u518D\u6B21\u555F\u52D5\u3002`}),!1)}_score(){let e=this.state;e.score=Math.max(0,Math.round(e.activated.length*300+e.relics.length*100+e.challenges.length*250+(e.status==="complete"?1500:0)-e.stalls*75-e.elapsed*.7))}_rating(){let e=this.state;this._score();let t=le.relics.length,n=le.challenges.length,r=e.relics.length>=t&&e.challenges.length>=n?"S":e.relics.length*3>=t*2?"A":e.relics.length*3>=t?"B":"C",a=e.relics.length<t?`\u518D\u627E\u51FA ${t-e.relics.length} \u4EFD\u6587\u660E\u788E\u7247`:e.challenges.length<n?`\u518D\u5B8C\u6210 ${n-e.challenges.length} \u500B\u6E2C\u98A8\u6311\u6230`:e.stalls?"\u6311\u6230\u96F6\u5931\u901F\u8FD4\u822A":"\u63DB\u4E0A\u53E6\u4E00\u500B\u6A21\u7D44\uFF0C\u6539\u5584\u822A\u7A0B\u6642\u9593";e.rating={speed:e.elapsed<1400?"S":e.elapsed<1700?"A":e.elapsed<2100?"B":"C",stability:e.stalls===0&&e.cargoDamage<20?"S":e.stalls<=2&&e.cargoDamage<65?"A":e.stalls<=5?"B":"C",exploration:r,assisted:e.usedAssist,next:a}}_recover(e){let t=this.state;t.activeCampaignCircuit!=null&&(t.checkpoint=this.campaignStage().fromIslandId);let n=Vt(t.checkpoint),s=t.activeChallenge||t.trackedHint?.id;if(t.cargoDamage+=100-t.cargoStability,t.cargoStability=100,t.activeChallenge){let r=t.activeChallenge;delete t.challengeProgress[r],t.activeChallenge=null,t.challengeHint=null,this.emit("challenge-reset",{id:r,reason:"stall",message:"\u672C\u6BB5\u6E2C\u98A8\u4E2D\u65B7\uFF1B\u5DF2\u4EA4\u4ED8\u968E\u6BB5\u4FDD\u7559\uFF0C\u56DE\u91D1\u74B0\u91CD\u8A66\u76EE\u524D\u968E\u6BB5\u3002"})}t.activeCampaignCircuit!=null&&(t.checkpoint=this.campaignStage().fromIslandId,t.campaignGate=0,this._objective()),this._returnToCheckpoint(),s?this.trackChallenge(s):t.activeCampaignCircuit==null&&(this._planMainRejoin(),this._objective()),t.stalls++,t.segmentFailures++,t.elapsed+=8,t.wind.length=0,t.hazard=null,t.lowEnergy=!1,this.emit("stall",{reason:e,islandId:n.id,penalty:8,message:`${e}\uFF0C\u5DF2\u56DE\u5230${n.name}\uFF1B\u672C\u6BB5\u52A0\u8A08 8 \u79D2\uFF0C\u788E\u7247\u4FDD\u7559\u3002`}),t.segmentFailures===3&&!t.assist&&this.emit("assist-offer",{message:"\u9019\u4E00\u6BB5\u5DF2\u5931\u901F\u4E09\u6B21\uFF0C\u53EF\u5728\u8A2D\u5B9A\u958B\u555F\u98A8\u7DDA\u8F14\u52A9\u3002"}),this._nearby(),this._score(),this.emit("save")}_collect(){let e=this.state,t=e.player;for(let l=0;l<le.relics.length;l++){let c=le.relics[l];!e.relics.includes(c.id)&&$i(t,c)<c.radius*c.radius&&Math.abs(t.y-c.y)<4&&(e.relics.push(c.id),this.emit("relic",{id:c.id,name:c.name,text:c.text}),this.emit("save"))}if(!t.gliding)return;if(e.activeCampaignCircuit!=null){let l=this.campaignStage();e.campaignGate<l.gates.length&&this._sampleSatisfied(l.gates[e.campaignGate])&&(e.campaignGate++,this.emit("challenge-gate",{id:l.id,step:e.campaignGate,total:9,message:[1,4,7].includes(e.campaignGate)?`${l.name} ${e.campaignGate}/9 \xB7 ${l.description}`:null}),this._objective());return}if(!e.activeChallenge){if(e.trackedHint?.transit&&this._sampleSatisfied(e.trackedHint)){let h=le.challenges.find(d=>d.id===e.trackedHint.id);e.transitIndex++,this._trackedTarget(h)}if(!e.trackedHint&&e.surveyHint&&this._sampleSatisfied(e.surveyHint)){let h=e.surveyHint;h.mainTransit?e.mainTransitIndex++:h.rejoin?e.rejoinIndex++:e.activated.length===3?e.returnSamples++:e.mainSamples[e.activated.length]++,this.emit("survey",{id:h.id,name:h.name,step:h.step,total:h.total,message:`${h.name}\u5DF2\u8A18\u9304 \xB7 ${h.step}/${h.total}`}),this._objective(),this.emit("save")}if(this.suppressedChallengeEntries.size)for(let h of this.suppressedChallengeEntries){let d=le.challenges.find(u=>u.id===h),m=this.courseEntry(d);(t.x-m.x)**2+(t.y-m.y)**2+(t.z-m.z)**2>(m.radius+4)**2&&this.suppressedChallengeEntries.delete(h)}let l=null;if(e.trackedHint?.entry){for(let h of le.challenges)if(h.id===e.trackedHint.id&&!e.challenges.includes(h.id)&&!this.suppressedChallengeEntries.has(h.id)&&this._sampleSatisfied(this.courseEntry(h))){l=h;break}}if(!l)return;(e.courseStages[l.id]||0)>=(l.stages?.length||1/0)&&(e.courseStages[l.id]=0),e.activeChallenge=l.id,e.challengeProgress[l.id]=0,e.trackedHint=null,e.transitWaypoints=[],e.transitIndex=0,e.cargoDamage+=100-e.cargoStability,e.cargoStability=100,this._challengeHint(l);let c=this.courseStage(l);this.emit("challenge-start",{id:l.id,name:l.name,step:0,total:(c?.gates||l.gates).length+1,message:c?`${c.name}\uFF1A${c.description}`:l.description});return}let n=null;for(let l of le.challenges)if(l.id===e.activeChallenge){n=l;break}let s=this.courseStage(n),r=s?.gates||n.gates,a=e.challengeProgress[n.id],o=r[a]||(s?null:n);o&&this._sampleSatisfied(o)&&(a<r.length?(e.challengeProgress[n.id]++,this.emit("challenge-gate",{id:n.id,name:n.name,step:a+1,total:r.length+1}),this._challengeHint(n)):(e.challengeProgress[n.id]=r.length+1,e.challenges.push(n.id),e.completedChallenges.includes(n.id)||e.completedChallenges.push(n.id),t.energy=Math.min(100,t.energy+15),e.activeChallenge=null,e.challengeHint=null,this.emit("challenge",{id:n.id,name:n.name}),this.emit("save")))}_sampleSatisfied(e){if(!e)return!1;let t=this.player,n=t.x-e.x,s=t.y-e.y,r=t.z-e.z;if(n*n+s*s+r*r>=e.radius*e.radius)return!1;let a=Mt(t.vx,t.vz);if(a<(e.minSpeed||0)||a>(e.maxSpeed??1/0)||t.energy<(e.minEnergy||0)||Number.isFinite(e.maxVerticalSpeed)&&Math.abs(t.vy)>e.maxVerticalSpeed)return!1;if(e.heading){let o=Mt(e.heading.x,e.heading.z);if(a<1||(t.vx*e.heading.x+t.vz*e.heading.z)/(a*o)<(e.heading.minDot??.5))return!1}return!0}_challengeHint(e){let t=this.state,n=this.courseStage(e),s=n?.gates||e.gates,r=t.challengeProgress[e.id],a=n&&r>=s.length,o=s[r]||(a?{...Vt(n.toIslandId),radius:12,instruction:"\u5B89\u5168\u843D\u5730\uFF0C\u8D70\u5230\u5CF6\u4E2D\u592E\u6309 E \u4EA4\u4ED8\u3002"}:e);t.challengeHint={...o,id:e.id,name:e.name,stageName:n?.name,stage:(t.courseStages[e.id]||0)+1,stageTotal:e.stages?.length||1,step:r+1,total:s.length+1,returning:r===s.length,landing:!!a}}step(e={},t=1/60){let n=this.state,s=n.player;if(n.status!=="running"||!Number.isFinite(t)||t<=0)return;if(t=Math.min(t,.1),n.activeSeconds+=t,n.elapsed+=t,n.mode==="expedition"&&n.activeSeconds+1e-8>=Mr){n.activeSeconds=Mr,this._fail("weather-window");return}let r=this.module,a=wr(Number(e.x)||0,-1,1),o=wr(Number(e.z)||0,-1,1),l=Mt(a,o);l>1&&(a/=l,o/=l,l=1),e.glide&&(s.grounded?(s.grounded=!1,s.gliding=!0,s.vy=15,s.y+=.15,this.emit("glide",{open:!0,requestId:e.requestId||0})):(s.gliding=!s.gliding,this.emit("glide",{open:s.gliding,requestId:e.requestId||0})));let c=s.x,h=s.z,d=s.y,m=s.vx,u=s.vz,f=Mt(s.vx,s.vz),y=n.stalls;if(s.braking=!!e.brake,s.grounded){s.vx=a*10,s.vz=o*10,s.vy=0,s.energy=Math.min(100,s.energy+t*28),s.x+=s.vx*t,s.z+=s.vz*t;let g=null;for(let p=0;p<le.islands.length;p++){let v=le.islands[p];if($i(v,s)<=(v.radius-1.5)**2&&Math.abs(s.y-v.y)<2){g=v;break}}g||(s.grounded=!1,s.gliding=!1,s.vy=0,this.emit("edge",{message:"\u5DF2\u96E2\u958B\u5CF6\u7DE3\uFF0C\u6309\u5C55\u5E06\u63A5\u4F4F\u98A8\uFF01"})),n.wind.length=0,n.hazard=null}else{n.airTime+=t;let g=null;if(n.activeCampaignCircuit!=null)g=le.campaignCircuits[n.activeCampaignCircuit];else for(let te=0;te<le.challenges.length;te++)if(le.challenges[te].id===n.activeChallenge){g=le.challenges[te];break}let p=this.campaignStage()||this.courseStage(g),v=n.activeCampaignCircuit!=null?n.campaignGate:g?n.challengeProgress[g.id]:-1,_=n.wind[0],x=this.windForces;x[Vi]=x[Gi]=x[Ha]=x[Va]=x[Sr]=x[br]=0;let T=l>.06?a/l:Math.sin(s.heading),A=l>.06?o/l:-Math.cos(s.heading),C=g?2:n.trackedHint||n.mainTransit[n.mainTransitIndex]||n.routeStyle==="safe"?0:1,P=n.seed%1009/1009*Math.PI*2;x[xc]=T,x[_c]=A,x[vc]=n.elapsed,x[Mc]=P,Sc(this.routePhysics[C],s,-1,r.id==="tailwind",x,n.wind),p&&Sc(this.stagePhysics.get(p.id),s,v,r.id==="tailwind",x,n.wind),n.wind.length=x[br];let b=x[Vi],S=x[Gi],I=x[Ha],F=x[Va],V=x[Sr];n.wind[0]&&n.wind[0]!==_&&this.emit("wind",{wind:n.wind[0]}),n.hazard=null;let X=0,D=p?.hazard||g?.hazard;for(let te=0;te<le.hazards.length+(D?1:0);te++){let ie=te<le.hazards.length?le.hazards[te]:D;$i(ie,s)<ie.radius*ie.radius&&s.y>=ie.y&&s.y<=ie.y+ie.height&&(n.hazard=ie.type,ie.type==="thunder"&&Math.sin(n.elapsed/ie.period*Math.PI*2+n.seed%19)>.15&&(X=9))}let z=s.braking?5.2:s.gliding?16.2*r.speed+V:10,Y=1-Math.exp(-t*(s.braking?7:2.8*r.turn));if(s.vx+=(T*z+(s.braking?0:I)-s.vx)*Y,s.vz+=(A*z+(s.braking?0:F)-s.vz)*Y,s.gliding){let te=s.braking?-7:-1.75+b+(n.assist&&s.y<n.objective.y+8?3:0);s.vy+=(te-s.vy)*(1-Math.exp(-t*2));let ie=l>.06&&f>5?Math.abs(s.vx/Math.max(1,f)-T)*1.5:0,De=(3.2*r.energy+ie+X)*(n.assist?.6:1);s.energy=wr(s.energy+((s.braking?0:S)-De)*t,0,100);let ke=s.energy<=Math.max(6.4,(De-S)*2);ke&&!n.lowEnergy&&this.emit("low-energy",{message:"\u5E06\u80FD\u91CF\u4E0D\u8DB3\uFF1A\u7ACB\u5373\u9032\u5165\u71B1\u6D41\uFF0C\u6216\u6E1B\u901F\u843D\u5CF6\u3002"}),n.lowEnergy=ke}else s.vy-=16*t,s.vy=Math.max(-25,s.vy);s.x+=s.vx*t,s.z+=s.vz*t,s.y+=s.vy*t;let k=null;for(let te=0;te<le.islands.length;te++){let ie=le.islands[te];if($i(ie,s)<=(ie.radius-1.5)**2&&d>=ie.y-.4&&s.y<=ie.y+.1&&s.vy<=0){k=ie;break}}if(k){let te=Mt(s.vx,s.vz)<8.5;Object.assign(s,{y:k.y,vy:0,grounded:!0,gliding:!1,energy:Math.min(100,s.energy+(te?20:7))}),n.checkpoint=k.id,n.lastLanding={islandId:k.id,precise:te},n.unlocked.includes(k.id)||n.unlocked.push(k.id),this.emit("land",{islandId:k.id,name:k.name,precise:te}),this.emit("save")}else for(let te=0;te<le.islands.length;te++){let ie=le.islands[te],De=ie.y-s.y;if(De<=.1||De>=38)continue;let ke=ie.radius*Math.max(.15,1-Math.max(0,De-2)/43)+.75,je=$i(s,ie);if(je>=ke*ke)continue;let Xe=Math.sqrt(je),$=Xe>.001?(s.x-ie.x)/Xe:1,Q=Xe>.001?(s.z-ie.z)/Xe:0;s.x=ie.x+$*ke,s.z=ie.z+Q*ke;let Me=s.vx*$+s.vz*Q;Me<0&&(s.vx-=Me*$,s.vz-=Me*Q)}if((g?g.kind==="crosswind"||g.kind==="stability":n.activated.length===1)&&s.gliding&&f>5){let te=Mt(s.vx,s.vz),ie=Math.acos(wr((m*s.vx+u*s.vz)/Math.max(.01,f*te),-1,1))/t,De=Math.max(0,ie-.85)*4+Math.max(0,-s.vy-5)*.5;n.cargoStability=wr(n.cargoStability-De*t,0,100)}!s.grounded&&(s.y<-55||s.energy<=0||s.x*s.x+s.z*s.z>(le.boundsRadius||1e3)**2)&&this._recover(s.energy<=0?"\u5E06\u80FD\u91CF\u8017\u76E1":"\u96E2\u958B\u5B89\u5168\u822A\u57DF")}s.vx*s.vx+s.vz*s.vz>.25&&(s.heading=Math.atan2(s.vx,-s.vz)),n.stalls===y&&(n.distance+=Mt(s.x-c,s.z-h)),this._collect(),this._nearby(),this._score()}};var Md=0,hh=1,Sd=2;var uh=1,Ko=2,$n=3,ai=0,Gt=1,En=2,fi=0,ns=1,dh=2,fh=3,ph=4,bd=5,Ii=100,Ed=101,wd=102,Td=103,Ad=104,Cd=200,Rd=201,Id=202,Pd=203,Eo=204,wo=205,Ld=206,Dd=207,Ud=208,Nd=209,Fd=210,Od=211,Bd=212,zd=213,kd=214,jo=0,Qo=1,el=2,is=3,tl=4,nl=5,il=6,sl=7,mh=0,Hd=1,Vd=2,pi=0,Gd=1,Wd=2,Xd=3,rl=4,qd=5,$d=6,Yd=7,Qc="attached",Zd="detached",gh=300,fs=301,ps=302,al=303,ol=304,ba=306,To=1e3,Ri=1001,Ao=1002,an=1003,Jd=1004;var Ea=1005;var Pn=1006,ll=1007;var Di=1008;var On=1009,yh=1010,xh=1011,nr=1012,cl=1013,Ui=1014,wn=1015,ir=1016,hl=1017,ul=1018,sr=1020,_h=35902,vh=35899,Mh=1021,Sh=1022,_n=1023,Gs=1026,rr=1027,dl=1028,fl=1029,bh=1030,pl=1031;var ml=1033,wa=33776,Ta=33777,Aa=33778,Ca=33779,gl=35840,yl=35841,xl=35842,_l=35843,vl=36196,Ml=37492,Sl=37496,bl=37808,El=37809,wl=37810,Tl=37811,Al=37812,Cl=37813,Rl=37814,Il=37815,Pl=37816,Ll=37817,Dl=37818,Ul=37819,Nl=37820,Fl=37821,Ol=36492,Bl=36494,zl=36495,kl=36283,Hl=36284,Vl=36285,Gl=36286,Wl=2200,Kd=2201,jd=2202,Br=2300,Co=2301,bo=2302,Qi=2400,es=2401,zr=2402,Xl=2500,Qd=2501;var ef=3200,tf=3201;var Eh=0,nf=1,mi="",Qt="srgb",ss="srgb-linear",kr="linear",ot="srgb";var ji=7680;var eh=519,sf=512,rf=513,af=514,wh=515,of=516,lf=517,cf=518,hf=519,th=35044;var Th="300 es",In=2e3,Hr=2001;var Vn=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){let n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){let n=this._listeners;if(n===void 0)return;let s=n[e];if(s!==void 0){let r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let n=t[e.type];if(n!==void 0){e.target=this;let s=n.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,e);e.target=null}}},Xt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Nu=1234567,Ur=Math.PI/180,Ws=180/Math.PI;function gi(){let i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Xt[i&255]+Xt[i>>8&255]+Xt[i>>16&255]+Xt[i>>24&255]+"-"+Xt[e&255]+Xt[e>>8&255]+"-"+Xt[e>>16&15|64]+Xt[e>>24&255]+"-"+Xt[t&63|128]+Xt[t>>8&255]+"-"+Xt[t>>16&255]+Xt[t>>24&255]+Xt[n&255]+Xt[n>>8&255]+Xt[n>>16&255]+Xt[n>>24&255]).toLowerCase()}function Ke(i,e,t){return Math.max(e,Math.min(t,i))}function Ah(i,e){return(i%e+e)%e}function sm(i,e,t,n,s){return n+(i-e)*(s-n)/(t-e)}function rm(i,e,t){return i!==e?(t-i)/(e-i):0}function Nr(i,e,t){return(1-t)*i+t*e}function am(i,e,t,n){return Nr(i,e,1-Math.exp(-t*n))}function om(i,e=1){return e-Math.abs(Ah(i,e*2)-e)}function lm(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*(3-2*i))}function cm(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*i*(i*(i*6-15)+10))}function hm(i,e){return i+Math.floor(Math.random()*(e-i+1))}function um(i,e){return i+Math.random()*(e-i)}function dm(i){return i*(.5-Math.random())}function fm(i){i!==void 0&&(Nu=i);let e=Nu+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function pm(i){return i*Ur}function mm(i){return i*Ws}function gm(i){return(i&i-1)===0&&i!==0}function ym(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function xm(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function _m(i,e,t,n,s){let r=Math.cos,a=Math.sin,o=r(t/2),l=a(t/2),c=r((e+n)/2),h=a((e+n)/2),d=r((e-n)/2),m=a((e-n)/2),u=r((n-e)/2),f=a((n-e)/2);switch(s){case"XYX":i.set(o*h,l*d,l*m,o*c);break;case"YZY":i.set(l*m,o*h,l*d,o*c);break;case"ZXZ":i.set(l*d,l*m,o*h,o*c);break;case"XZX":i.set(o*h,l*f,l*u,o*c);break;case"YXY":i.set(l*u,o*h,l*f,o*c);break;case"ZYZ":i.set(l*f,l*u,o*h,o*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function Hs(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function jt(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}var ar={DEG2RAD:Ur,RAD2DEG:Ws,generateUUID:gi,clamp:Ke,euclideanModulo:Ah,mapLinear:sm,inverseLerp:rm,lerp:Nr,damp:am,pingpong:om,smoothstep:lm,smootherstep:cm,randInt:hm,randFloat:um,randFloatSpread:dm,seededRandom:fm,degToRad:pm,radToDeg:mm,isPowerOfTwo:gm,ceilPowerOfTwo:ym,floorPowerOfTwo:xm,setQuaternionFromProperEuler:_m,normalize:jt,denormalize:Hs},ge=class i{constructor(e=0,t=0){i.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6],this.y=s[1]*t+s[4]*n+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Ke(this.x,e.x,t.x),this.y=Ke(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=Ke(this.x,e,t),this.y=Ke(this.y,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Ke(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(Ke(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),s=Math.sin(t),r=this.x-e.x,a=this.y-e.y;return this.x=r*n-a*s+e.x,this.y=r*s+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},en=class{constructor(e=0,t=0,n=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=s}static slerpFlat(e,t,n,s,r,a,o){let l=n[s+0],c=n[s+1],h=n[s+2],d=n[s+3],m=r[a+0],u=r[a+1],f=r[a+2],y=r[a+3];if(o===0){e[t+0]=l,e[t+1]=c,e[t+2]=h,e[t+3]=d;return}if(o===1){e[t+0]=m,e[t+1]=u,e[t+2]=f,e[t+3]=y;return}if(d!==y||l!==m||c!==u||h!==f){let g=1-o,p=l*m+c*u+h*f+d*y,v=p>=0?1:-1,_=1-p*p;if(_>Number.EPSILON){let T=Math.sqrt(_),A=Math.atan2(T,p*v);g=Math.sin(g*A)/T,o=Math.sin(o*A)/T}let x=o*v;if(l=l*g+m*x,c=c*g+u*x,h=h*g+f*x,d=d*g+y*x,g===1-o){let T=1/Math.sqrt(l*l+c*c+h*h+d*d);l*=T,c*=T,h*=T,d*=T}}e[t]=l,e[t+1]=c,e[t+2]=h,e[t+3]=d}static multiplyQuaternionsFlat(e,t,n,s,r,a){let o=n[s],l=n[s+1],c=n[s+2],h=n[s+3],d=r[a],m=r[a+1],u=r[a+2],f=r[a+3];return e[t]=o*f+h*d+l*u-c*m,e[t+1]=l*f+h*m+c*d-o*u,e[t+2]=c*f+h*u+o*m-l*d,e[t+3]=h*f-o*d-l*m-c*u,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,s){return this._x=e,this._y=t,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,s=e._y,r=e._z,a=e._order,o=Math.cos,l=Math.sin,c=o(n/2),h=o(s/2),d=o(r/2),m=l(n/2),u=l(s/2),f=l(r/2);switch(a){case"XYZ":this._x=m*h*d+c*u*f,this._y=c*u*d-m*h*f,this._z=c*h*f+m*u*d,this._w=c*h*d-m*u*f;break;case"YXZ":this._x=m*h*d+c*u*f,this._y=c*u*d-m*h*f,this._z=c*h*f-m*u*d,this._w=c*h*d+m*u*f;break;case"ZXY":this._x=m*h*d-c*u*f,this._y=c*u*d+m*h*f,this._z=c*h*f+m*u*d,this._w=c*h*d-m*u*f;break;case"ZYX":this._x=m*h*d-c*u*f,this._y=c*u*d+m*h*f,this._z=c*h*f-m*u*d,this._w=c*h*d+m*u*f;break;case"YZX":this._x=m*h*d+c*u*f,this._y=c*u*d+m*h*f,this._z=c*h*f-m*u*d,this._w=c*h*d-m*u*f;break;case"XZY":this._x=m*h*d-c*u*f,this._y=c*u*d-m*h*f,this._z=c*h*f+m*u*d,this._w=c*h*d+m*u*f;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,s=Math.sin(n);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],s=t[4],r=t[8],a=t[1],o=t[5],l=t[9],c=t[2],h=t[6],d=t[10],m=n+o+d;if(m>0){let u=.5/Math.sqrt(m+1);this._w=.25/u,this._x=(h-l)*u,this._y=(r-c)*u,this._z=(a-s)*u}else if(n>o&&n>d){let u=2*Math.sqrt(1+n-o-d);this._w=(h-l)/u,this._x=.25*u,this._y=(s+a)/u,this._z=(r+c)/u}else if(o>d){let u=2*Math.sqrt(1+o-n-d);this._w=(r-c)/u,this._x=(s+a)/u,this._y=.25*u,this._z=(l+h)/u}else{let u=2*Math.sqrt(1+d-n-o);this._w=(a-s)/u,this._x=(r+c)/u,this._y=(l+h)/u,this._z=.25*u}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Ke(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let s=Math.min(1,t/n);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,s=e._y,r=e._z,a=e._w,o=t._x,l=t._y,c=t._z,h=t._w;return this._x=n*h+a*o+s*c-r*l,this._y=s*h+a*l+r*o-n*c,this._z=r*h+a*c+n*l-s*o,this._w=a*h-n*o-s*l-r*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);let n=this._x,s=this._y,r=this._z,a=this._w,o=a*e._w+n*e._x+s*e._y+r*e._z;if(o<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,o=-o):this.copy(e),o>=1)return this._w=a,this._x=n,this._y=s,this._z=r,this;let l=1-o*o;if(l<=Number.EPSILON){let u=1-t;return this._w=u*a+t*this._w,this._x=u*n+t*this._x,this._y=u*s+t*this._y,this._z=u*r+t*this._z,this.normalize(),this}let c=Math.sqrt(l),h=Math.atan2(c,o),d=Math.sin((1-t)*h)/c,m=Math.sin(t*h)/c;return this._w=a*d+this._w*m,this._x=n*d+this._x*m,this._y=s*d+this._y*m,this._z=r*d+this._z*m,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(e),s*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},L=class i{constructor(e=0,t=0,n=0){i.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Fu.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Fu.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*s,this.y=r[1]*t+r[4]*n+r[7]*s,this.z=r[2]*t+r[5]*n+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,s=this.z,r=e.elements,a=1/(r[3]*t+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*s+r[12])*a,this.y=(r[1]*t+r[5]*n+r[9]*s+r[13])*a,this.z=(r[2]*t+r[6]*n+r[10]*s+r[14])*a,this}applyQuaternion(e){let t=this.x,n=this.y,s=this.z,r=e.x,a=e.y,o=e.z,l=e.w,c=2*(a*s-o*n),h=2*(o*t-r*s),d=2*(r*n-a*t);return this.x=t+l*c+a*d-o*h,this.y=n+l*h+o*c-r*d,this.z=s+l*d+r*h-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*s,this.y=r[1]*t+r[5]*n+r[9]*s,this.z=r[2]*t+r[6]*n+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Ke(this.x,e.x,t.x),this.y=Ke(this.y,e.y,t.y),this.z=Ke(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=Ke(this.x,e,t),this.y=Ke(this.y,e,t),this.z=Ke(this.z,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Ke(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,s=e.y,r=e.z,a=t.x,o=t.y,l=t.z;return this.x=s*l-r*o,this.y=r*a-n*l,this.z=n*o-s*a,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return wc.copy(this).projectOnVector(e),this.sub(wc)}reflect(e){return this.sub(wc.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(Ke(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,s=this.z-e.z;return t*t+n*n+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let s=Math.sin(t)*e;return this.x=s*Math.sin(n),this.y=Math.cos(t)*e,this.z=s*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},wc=new L,Fu=new en,qe=class i{constructor(e,t,n,s,r,a,o,l,c){i.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,a,o,l,c)}set(e,t,n,s,r,a,o,l,c){let h=this.elements;return h[0]=e,h[1]=s,h[2]=o,h[3]=t,h[4]=r,h[5]=l,h[6]=n,h[7]=a,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,s=t.elements,r=this.elements,a=n[0],o=n[3],l=n[6],c=n[1],h=n[4],d=n[7],m=n[2],u=n[5],f=n[8],y=s[0],g=s[3],p=s[6],v=s[1],_=s[4],x=s[7],T=s[2],A=s[5],C=s[8];return r[0]=a*y+o*v+l*T,r[3]=a*g+o*_+l*A,r[6]=a*p+o*x+l*C,r[1]=c*y+h*v+d*T,r[4]=c*g+h*_+d*A,r[7]=c*p+h*x+d*C,r[2]=m*y+u*v+f*T,r[5]=m*g+u*_+f*A,r[8]=m*p+u*x+f*C,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8];return t*a*h-t*o*c-n*r*h+n*o*l+s*r*c-s*a*l}invert(){let e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8],d=h*a-o*c,m=o*l-h*r,u=c*r-a*l,f=t*d+n*m+s*u;if(f===0)return this.set(0,0,0,0,0,0,0,0,0);let y=1/f;return e[0]=d*y,e[1]=(s*c-h*n)*y,e[2]=(o*n-s*a)*y,e[3]=m*y,e[4]=(h*t-s*l)*y,e[5]=(s*r-o*t)*y,e[6]=u*y,e[7]=(n*l-c*t)*y,e[8]=(a*t-n*r)*y,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,s,r,a,o){let l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*a+c*o)+a+e,-s*c,s*l,-s*(-c*a+l*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(Tc.makeScale(e,t)),this}rotate(e){return this.premultiply(Tc.makeRotation(-e)),this}translate(e,t){return this.premultiply(Tc.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let s=0;s<9;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}},Tc=new qe;function Ch(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function Vr(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function uf(){let i=Vr("canvas");return i.style.display="block",i}var Ou={};function Xs(i){i in Ou||(Ou[i]=!0,console.warn(i))}function df(i,e,t){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:n()}}setTimeout(r,t)})}var Bu=new qe().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),zu=new qe().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function vm(){let i={enabled:!0,workingColorSpace:ss,spaces:{},convert:function(s,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===ot&&(s.r=ri(s.r),s.g=ri(s.g),s.b=ri(s.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===ot&&(s.r=Vs(s.r),s.g=Vs(s.g),s.b=Vs(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===mi?kr:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,a){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return Xs("THREE.ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return Xs("THREE.ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(s,r)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[ss]:{primaries:e,whitePoint:n,transfer:kr,toXYZ:Bu,fromXYZ:zu,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:Qt},outputColorSpaceConfig:{drawingBufferColorSpace:Qt}},[Qt]:{primaries:e,whitePoint:n,transfer:ot,toXYZ:Bu,fromXYZ:zu,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:Qt}}}),i}var it=vm();function ri(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function Vs(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}var Cs,Ro=class{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{Cs===void 0&&(Cs=Vr("canvas")),Cs.width=e.width,Cs.height=e.height;let s=Cs.getContext("2d");e instanceof ImageData?s.putImageData(e,0,0):s.drawImage(e,0,0,e.width,e.height),n=Cs}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){let t=Vr("canvas");t.width=e.width,t.height=e.height;let n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);let s=n.getImageData(0,0,e.width,e.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=ri(r[a]/255)*255;return n.putImageData(s,0,0),t}else if(e.data){let t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(ri(t[n]/255)*255):t[n]=ri(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}},Mm=0,qs=class{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Mm++}),this.uuid=gi(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):t instanceof VideoFrame?e.set(t.displayHeight,t.displayWidth,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(Ac(s[a].image)):r.push(Ac(s[a]))}else r=Ac(s);n.url=r}return t||(e.images[this.uuid]=n),n}};function Ac(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?Ro.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}var Sm=0,Cc=new L,on=class i extends Vn{constructor(e=i.DEFAULT_IMAGE,t=i.DEFAULT_MAPPING,n=Ri,s=Ri,r=Pn,a=Di,o=_n,l=On,c=i.DEFAULT_ANISOTROPY,h=mi){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Sm++}),this.uuid=gi(),this.name="",this.source=new qs(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new ge(0,0),this.repeat=new ge(1,1),this.center=new ge(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new qe,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(Cc).x}get height(){return this.source.getSize(Cc).y}get depth(){return this.source.getSize(Cc).z}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(let t in e){let n=e[t];if(n===void 0){console.warn(`THREE.Texture.setValues(): parameter '${t}' has value of undefined.`);continue}let s=this[t];if(s===void 0){console.warn(`THREE.Texture.setValues(): property '${t}' does not exist.`);continue}s&&n&&s.isVector2&&n.isVector2||s&&n&&s.isVector3&&n.isVector3||s&&n&&s.isMatrix3&&n.isMatrix3?s.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==gh)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case To:e.x=e.x-Math.floor(e.x);break;case Ri:e.x=e.x<0?0:1;break;case Ao:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case To:e.y=e.y-Math.floor(e.y);break;case Ri:e.y=e.y<0?0:1;break;case Ao:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};on.DEFAULT_IMAGE=null;on.DEFAULT_MAPPING=gh;on.DEFAULT_ANISOTROPY=1;var yt=class i{constructor(e=0,t=0,n=0,s=1){i.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,s){return this.x=e,this.y=t,this.z=n,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,s=this.z,r=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*s+a[12]*r,this.y=a[1]*t+a[5]*n+a[9]*s+a[13]*r,this.z=a[2]*t+a[6]*n+a[10]*s+a[14]*r,this.w=a[3]*t+a[7]*n+a[11]*s+a[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,s,r,l=e.elements,c=l[0],h=l[4],d=l[8],m=l[1],u=l[5],f=l[9],y=l[2],g=l[6],p=l[10];if(Math.abs(h-m)<.01&&Math.abs(d-y)<.01&&Math.abs(f-g)<.01){if(Math.abs(h+m)<.1&&Math.abs(d+y)<.1&&Math.abs(f+g)<.1&&Math.abs(c+u+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;let _=(c+1)/2,x=(u+1)/2,T=(p+1)/2,A=(h+m)/4,C=(d+y)/4,P=(f+g)/4;return _>x&&_>T?_<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(_),s=A/n,r=C/n):x>T?x<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(x),n=A/s,r=P/s):T<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(T),n=C/r,s=P/r),this.set(n,s,r,t),this}let v=Math.sqrt((g-f)*(g-f)+(d-y)*(d-y)+(m-h)*(m-h));return Math.abs(v)<.001&&(v=1),this.x=(g-f)/v,this.y=(d-y)/v,this.z=(m-h)/v,this.w=Math.acos((c+u+p-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Ke(this.x,e.x,t.x),this.y=Ke(this.y,e.y,t.y),this.z=Ke(this.z,e.z,t.z),this.w=Ke(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=Ke(this.x,e,t),this.y=Ke(this.y,e,t),this.z=Ke(this.z,e,t),this.w=Ke(this.w,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Ke(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},Io=class extends Vn{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Pn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new yt(0,0,e,t),this.scissorTest=!1,this.viewport=new yt(0,0,e,t);let s={width:e,height:t,depth:n.depth},r=new on(s);this.textures=[];let a=n.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview}_setTextureOptions(e={}){let t={minFilter:Pn,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=n,this.textures[s].isArrayTexture=this.textures[s].image.depth>1;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let s=Object.assign({},e.textures[t].image);this.textures[t].source=new qs(s)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}},Gn=class extends Io{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}},Gr=class extends on{constructor(e=null,t=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=an,this.minFilter=an,this.wrapR=Ri,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}};var Po=class extends on{constructor(e=null,t=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=an,this.minFilter=an,this.wrapR=Ri,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var Ln=class{constructor(e=new L(1/0,1/0,1/0),t=new L(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(An.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(An.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=An.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,An):An.fromBufferAttribute(r,a),An.applyMatrix4(e.matrixWorld),this.expandByPoint(An);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Ya.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Ya.copy(n.boundingBox)),Ya.applyMatrix4(e.matrixWorld),this.union(Ya)}let s=e.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,An),An.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Tr),Za.subVectors(this.max,Tr),Rs.subVectors(e.a,Tr),Is.subVectors(e.b,Tr),Ps.subVectors(e.c,Tr),Si.subVectors(Is,Rs),bi.subVectors(Ps,Is),Yi.subVectors(Rs,Ps);let t=[0,-Si.z,Si.y,0,-bi.z,bi.y,0,-Yi.z,Yi.y,Si.z,0,-Si.x,bi.z,0,-bi.x,Yi.z,0,-Yi.x,-Si.y,Si.x,0,-bi.y,bi.x,0,-Yi.y,Yi.x,0];return!Rc(t,Rs,Is,Ps,Za)||(t=[1,0,0,0,1,0,0,0,1],!Rc(t,Rs,Is,Ps,Za))?!1:(Ja.crossVectors(Si,bi),t=[Ja.x,Ja.y,Ja.z],Rc(t,Rs,Is,Ps,Za))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,An).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(An).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(ei[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),ei[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),ei[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),ei[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),ei[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),ei[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),ei[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),ei[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(ei),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},ei=[new L,new L,new L,new L,new L,new L,new L,new L],An=new L,Ya=new Ln,Rs=new L,Is=new L,Ps=new L,Si=new L,bi=new L,Yi=new L,Tr=new L,Za=new L,Ja=new L,Zi=new L;function Rc(i,e,t,n,s){for(let r=0,a=i.length-3;r<=a;r+=3){Zi.fromArray(i,r);let o=s.x*Math.abs(Zi.x)+s.y*Math.abs(Zi.y)+s.z*Math.abs(Zi.z),l=e.dot(Zi),c=t.dot(Zi),h=n.dot(Zi);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>o)return!1}return!0}var bm=new Ln,Ar=new L,Ic=new L,ln=class{constructor(e=new L,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t!==void 0?n.copy(t):bm.setFromPoints(e).getCenter(n);let s=0;for(let r=0,a=e.length;r<a;r++)s=Math.max(s,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Ar.subVectors(e,this.center);let t=Ar.lengthSq();if(t>this.radius*this.radius){let n=Math.sqrt(t),s=(n-this.radius)*.5;this.center.addScaledVector(Ar,s/n),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Ic.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Ar.copy(e.center).add(Ic)),this.expandByPoint(Ar.copy(e.center).sub(Ic))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},ti=new L,Pc=new L,Ka=new L,Ei=new L,Lc=new L,ja=new L,Dc=new L,Wn=class{constructor(e=new L,t=new L(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,ti)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=ti.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(ti.copy(this.origin).addScaledVector(this.direction,t),ti.distanceToSquared(e))}distanceSqToSegment(e,t,n,s){Pc.copy(e).add(t).multiplyScalar(.5),Ka.copy(t).sub(e).normalize(),Ei.copy(this.origin).sub(Pc);let r=e.distanceTo(t)*.5,a=-this.direction.dot(Ka),o=Ei.dot(this.direction),l=-Ei.dot(Ka),c=Ei.lengthSq(),h=Math.abs(1-a*a),d,m,u,f;if(h>0)if(d=a*l-o,m=a*o-l,f=r*h,d>=0)if(m>=-f)if(m<=f){let y=1/h;d*=y,m*=y,u=d*(d+a*m+2*o)+m*(a*d+m+2*l)+c}else m=r,d=Math.max(0,-(a*m+o)),u=-d*d+m*(m+2*l)+c;else m=-r,d=Math.max(0,-(a*m+o)),u=-d*d+m*(m+2*l)+c;else m<=-f?(d=Math.max(0,-(-a*r+o)),m=d>0?-r:Math.min(Math.max(-r,-l),r),u=-d*d+m*(m+2*l)+c):m<=f?(d=0,m=Math.min(Math.max(-r,-l),r),u=m*(m+2*l)+c):(d=Math.max(0,-(a*r+o)),m=d>0?r:Math.min(Math.max(-r,-l),r),u=-d*d+m*(m+2*l)+c);else m=a>0?-r:r,d=Math.max(0,-(a*m+o)),u=-d*d+m*(m+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,d),s&&s.copy(Pc).addScaledVector(Ka,m),u}intersectSphere(e,t){ti.subVectors(e.center,this.origin);let n=ti.dot(this.direction),s=ti.dot(ti)-n*n,r=e.radius*e.radius;if(s>r)return null;let a=Math.sqrt(r-s),o=n-a,l=n+a;return l<0?null:o<0?this.at(l,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,s,r,a,o,l,c=1/this.direction.x,h=1/this.direction.y,d=1/this.direction.z,m=this.origin;return c>=0?(n=(e.min.x-m.x)*c,s=(e.max.x-m.x)*c):(n=(e.max.x-m.x)*c,s=(e.min.x-m.x)*c),h>=0?(r=(e.min.y-m.y)*h,a=(e.max.y-m.y)*h):(r=(e.max.y-m.y)*h,a=(e.min.y-m.y)*h),n>a||r>s||((r>n||isNaN(n))&&(n=r),(a<s||isNaN(s))&&(s=a),d>=0?(o=(e.min.z-m.z)*d,l=(e.max.z-m.z)*d):(o=(e.max.z-m.z)*d,l=(e.min.z-m.z)*d),n>l||o>s)||((o>n||n!==n)&&(n=o),(l<s||s!==s)&&(s=l),s<0)?null:this.at(n>=0?n:s,t)}intersectsBox(e){return this.intersectBox(e,ti)!==null}intersectTriangle(e,t,n,s,r){Lc.subVectors(t,e),ja.subVectors(n,e),Dc.crossVectors(Lc,ja);let a=this.direction.dot(Dc),o;if(a>0){if(s)return null;o=1}else if(a<0)o=-1,a=-a;else return null;Ei.subVectors(this.origin,e);let l=o*this.direction.dot(ja.crossVectors(Ei,ja));if(l<0)return null;let c=o*this.direction.dot(Lc.cross(Ei));if(c<0||l+c>a)return null;let h=-o*Ei.dot(Dc);return h<0?null:this.at(h/a,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},Ye=class i{constructor(e,t,n,s,r,a,o,l,c,h,d,m,u,f,y,g){i.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,a,o,l,c,h,d,m,u,f,y,g)}set(e,t,n,s,r,a,o,l,c,h,d,m,u,f,y,g){let p=this.elements;return p[0]=e,p[4]=t,p[8]=n,p[12]=s,p[1]=r,p[5]=a,p[9]=o,p[13]=l,p[2]=c,p[6]=h,p[10]=d,p[14]=m,p[3]=u,p[7]=f,p[11]=y,p[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new i().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){let t=this.elements,n=e.elements,s=1/Ls.setFromMatrixColumn(e,0).length(),r=1/Ls.setFromMatrixColumn(e,1).length(),a=1/Ls.setFromMatrixColumn(e,2).length();return t[0]=n[0]*s,t[1]=n[1]*s,t[2]=n[2]*s,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,s=e.y,r=e.z,a=Math.cos(n),o=Math.sin(n),l=Math.cos(s),c=Math.sin(s),h=Math.cos(r),d=Math.sin(r);if(e.order==="XYZ"){let m=a*h,u=a*d,f=o*h,y=o*d;t[0]=l*h,t[4]=-l*d,t[8]=c,t[1]=u+f*c,t[5]=m-y*c,t[9]=-o*l,t[2]=y-m*c,t[6]=f+u*c,t[10]=a*l}else if(e.order==="YXZ"){let m=l*h,u=l*d,f=c*h,y=c*d;t[0]=m+y*o,t[4]=f*o-u,t[8]=a*c,t[1]=a*d,t[5]=a*h,t[9]=-o,t[2]=u*o-f,t[6]=y+m*o,t[10]=a*l}else if(e.order==="ZXY"){let m=l*h,u=l*d,f=c*h,y=c*d;t[0]=m-y*o,t[4]=-a*d,t[8]=f+u*o,t[1]=u+f*o,t[5]=a*h,t[9]=y-m*o,t[2]=-a*c,t[6]=o,t[10]=a*l}else if(e.order==="ZYX"){let m=a*h,u=a*d,f=o*h,y=o*d;t[0]=l*h,t[4]=f*c-u,t[8]=m*c+y,t[1]=l*d,t[5]=y*c+m,t[9]=u*c-f,t[2]=-c,t[6]=o*l,t[10]=a*l}else if(e.order==="YZX"){let m=a*l,u=a*c,f=o*l,y=o*c;t[0]=l*h,t[4]=y-m*d,t[8]=f*d+u,t[1]=d,t[5]=a*h,t[9]=-o*h,t[2]=-c*h,t[6]=u*d+f,t[10]=m-y*d}else if(e.order==="XZY"){let m=a*l,u=a*c,f=o*l,y=o*c;t[0]=l*h,t[4]=-d,t[8]=c*h,t[1]=m*d+y,t[5]=a*h,t[9]=u*d-f,t[2]=f*d-u,t[6]=o*h,t[10]=y*d+m}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Em,e,wm)}lookAt(e,t,n){let s=this.elements;return dn.subVectors(e,t),dn.lengthSq()===0&&(dn.z=1),dn.normalize(),wi.crossVectors(n,dn),wi.lengthSq()===0&&(Math.abs(n.z)===1?dn.x+=1e-4:dn.z+=1e-4,dn.normalize(),wi.crossVectors(n,dn)),wi.normalize(),Qa.crossVectors(dn,wi),s[0]=wi.x,s[4]=Qa.x,s[8]=dn.x,s[1]=wi.y,s[5]=Qa.y,s[9]=dn.y,s[2]=wi.z,s[6]=Qa.z,s[10]=dn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,s=t.elements,r=this.elements,a=n[0],o=n[4],l=n[8],c=n[12],h=n[1],d=n[5],m=n[9],u=n[13],f=n[2],y=n[6],g=n[10],p=n[14],v=n[3],_=n[7],x=n[11],T=n[15],A=s[0],C=s[4],P=s[8],b=s[12],S=s[1],I=s[5],F=s[9],V=s[13],X=s[2],D=s[6],z=s[10],Y=s[14],k=s[3],re=s[7],te=s[11],ie=s[15];return r[0]=a*A+o*S+l*X+c*k,r[4]=a*C+o*I+l*D+c*re,r[8]=a*P+o*F+l*z+c*te,r[12]=a*b+o*V+l*Y+c*ie,r[1]=h*A+d*S+m*X+u*k,r[5]=h*C+d*I+m*D+u*re,r[9]=h*P+d*F+m*z+u*te,r[13]=h*b+d*V+m*Y+u*ie,r[2]=f*A+y*S+g*X+p*k,r[6]=f*C+y*I+g*D+p*re,r[10]=f*P+y*F+g*z+p*te,r[14]=f*b+y*V+g*Y+p*ie,r[3]=v*A+_*S+x*X+T*k,r[7]=v*C+_*I+x*D+T*re,r[11]=v*P+_*F+x*z+T*te,r[15]=v*b+_*V+x*Y+T*ie,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],s=e[8],r=e[12],a=e[1],o=e[5],l=e[9],c=e[13],h=e[2],d=e[6],m=e[10],u=e[14],f=e[3],y=e[7],g=e[11],p=e[15];return f*(+r*l*d-s*c*d-r*o*m+n*c*m+s*o*u-n*l*u)+y*(+t*l*u-t*c*m+r*a*m-s*a*u+s*c*h-r*l*h)+g*(+t*c*d-t*o*u-r*a*d+n*a*u+r*o*h-n*c*h)+p*(-s*o*h-t*l*d+t*o*m+s*a*d-n*a*m+n*l*h)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8],d=e[9],m=e[10],u=e[11],f=e[12],y=e[13],g=e[14],p=e[15],v=d*g*c-y*m*c+y*l*u-o*g*u-d*l*p+o*m*p,_=f*m*c-h*g*c-f*l*u+a*g*u+h*l*p-a*m*p,x=h*y*c-f*d*c+f*o*u-a*y*u-h*o*p+a*d*p,T=f*d*l-h*y*l-f*o*m+a*y*m+h*o*g-a*d*g,A=t*v+n*_+s*x+r*T;if(A===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let C=1/A;return e[0]=v*C,e[1]=(y*m*r-d*g*r-y*s*u+n*g*u+d*s*p-n*m*p)*C,e[2]=(o*g*r-y*l*r+y*s*c-n*g*c-o*s*p+n*l*p)*C,e[3]=(d*l*r-o*m*r-d*s*c+n*m*c+o*s*u-n*l*u)*C,e[4]=_*C,e[5]=(h*g*r-f*m*r+f*s*u-t*g*u-h*s*p+t*m*p)*C,e[6]=(f*l*r-a*g*r-f*s*c+t*g*c+a*s*p-t*l*p)*C,e[7]=(a*m*r-h*l*r+h*s*c-t*m*c-a*s*u+t*l*u)*C,e[8]=x*C,e[9]=(f*d*r-h*y*r-f*n*u+t*y*u+h*n*p-t*d*p)*C,e[10]=(a*y*r-f*o*r+f*n*c-t*y*c-a*n*p+t*o*p)*C,e[11]=(h*o*r-a*d*r-h*n*c+t*d*c+a*n*u-t*o*u)*C,e[12]=T*C,e[13]=(h*y*s-f*d*s+f*n*m-t*y*m-h*n*g+t*d*g)*C,e[14]=(f*o*s-a*y*s-f*n*l+t*y*l+a*n*g-t*o*g)*C,e[15]=(a*d*s-h*o*s+h*n*l-t*d*l-a*n*m+t*o*m)*C,this}scale(e){let t=this.elements,n=e.x,s=e.y,r=e.z;return t[0]*=n,t[4]*=s,t[8]*=r,t[1]*=n,t[5]*=s,t[9]*=r,t[2]*=n,t[6]*=s,t[10]*=r,t[3]*=n,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,s))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),s=Math.sin(t),r=1-n,a=e.x,o=e.y,l=e.z,c=r*a,h=r*o;return this.set(c*a+n,c*o-s*l,c*l+s*o,0,c*o+s*l,h*o+n,h*l-s*a,0,c*l-s*o,h*l+s*a,r*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,s,r,a){return this.set(1,n,r,0,e,1,a,0,t,s,1,0,0,0,0,1),this}compose(e,t,n){let s=this.elements,r=t._x,a=t._y,o=t._z,l=t._w,c=r+r,h=a+a,d=o+o,m=r*c,u=r*h,f=r*d,y=a*h,g=a*d,p=o*d,v=l*c,_=l*h,x=l*d,T=n.x,A=n.y,C=n.z;return s[0]=(1-(y+p))*T,s[1]=(u+x)*T,s[2]=(f-_)*T,s[3]=0,s[4]=(u-x)*A,s[5]=(1-(m+p))*A,s[6]=(g+v)*A,s[7]=0,s[8]=(f+_)*C,s[9]=(g-v)*C,s[10]=(1-(m+y))*C,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,n){let s=this.elements,r=Ls.set(s[0],s[1],s[2]).length(),a=Ls.set(s[4],s[5],s[6]).length(),o=Ls.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),e.x=s[12],e.y=s[13],e.z=s[14],Cn.copy(this);let c=1/r,h=1/a,d=1/o;return Cn.elements[0]*=c,Cn.elements[1]*=c,Cn.elements[2]*=c,Cn.elements[4]*=h,Cn.elements[5]*=h,Cn.elements[6]*=h,Cn.elements[8]*=d,Cn.elements[9]*=d,Cn.elements[10]*=d,t.setFromRotationMatrix(Cn),n.x=r,n.y=a,n.z=o,this}makePerspective(e,t,n,s,r,a,o=In,l=!1){let c=this.elements,h=2*r/(t-e),d=2*r/(n-s),m=(t+e)/(t-e),u=(n+s)/(n-s),f,y;if(l)f=r/(a-r),y=a*r/(a-r);else if(o===In)f=-(a+r)/(a-r),y=-2*a*r/(a-r);else if(o===Hr)f=-a/(a-r),y=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=h,c[4]=0,c[8]=m,c[12]=0,c[1]=0,c[5]=d,c[9]=u,c[13]=0,c[2]=0,c[6]=0,c[10]=f,c[14]=y,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,s,r,a,o=In,l=!1){let c=this.elements,h=2/(t-e),d=2/(n-s),m=-(t+e)/(t-e),u=-(n+s)/(n-s),f,y;if(l)f=1/(a-r),y=a/(a-r);else if(o===In)f=-2/(a-r),y=-(a+r)/(a-r);else if(o===Hr)f=-1/(a-r),y=-r/(a-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=h,c[4]=0,c[8]=0,c[12]=m,c[1]=0,c[5]=d,c[9]=0,c[13]=u,c[2]=0,c[6]=0,c[10]=f,c[14]=y,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let s=0;s<16;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}},Ls=new L,Cn=new Ye,Em=new L(0,0,0),wm=new L(1,1,1),wi=new L,Qa=new L,dn=new L,ku=new Ye,Hu=new en,pn=class i{constructor(e=0,t=0,n=0,s=i.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,s=this._order){return this._x=e,this._y=t,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let s=e.elements,r=s[0],a=s[4],o=s[8],l=s[1],c=s[5],h=s[9],d=s[2],m=s[6],u=s[10];switch(t){case"XYZ":this._y=Math.asin(Ke(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,u),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(m,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Ke(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,u),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-d,r),this._z=0);break;case"ZXY":this._x=Math.asin(Ke(m,-1,1)),Math.abs(m)<.9999999?(this._y=Math.atan2(-d,u),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-Ke(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(m,u),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(Ke(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-d,r)):(this._x=0,this._y=Math.atan2(o,u));break;case"XZY":this._z=Math.asin(-Ke(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(m,c),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-h,u),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return ku.makeRotationFromQuaternion(e),this.setFromRotationMatrix(ku,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Hu.setFromEuler(this),this.setFromQuaternion(Hu,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};pn.DEFAULT_ORDER="XYZ";var $s=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}},Tm=0,Vu=new L,Ds=new en,ni=new Ye,eo=new L,Cr=new L,Am=new L,Cm=new en,Gu=new L(1,0,0),Wu=new L(0,1,0),Xu=new L(0,0,1),qu={type:"added"},Rm={type:"removed"},Us={type:"childadded",child:null},Uc={type:"childremoved",child:null},xt=class i extends Vn{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Tm++}),this.uuid=gi(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=i.DEFAULT_UP.clone();let e=new L,t=new pn,n=new en,s=new L(1,1,1);function r(){n.setFromEuler(t,!1)}function a(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new Ye},normalMatrix:{value:new qe}}),this.matrix=new Ye,this.matrixWorld=new Ye,this.matrixAutoUpdate=i.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=i.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new $s,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Ds.setFromAxisAngle(e,t),this.quaternion.multiply(Ds),this}rotateOnWorldAxis(e,t){return Ds.setFromAxisAngle(e,t),this.quaternion.premultiply(Ds),this}rotateX(e){return this.rotateOnAxis(Gu,e)}rotateY(e){return this.rotateOnAxis(Wu,e)}rotateZ(e){return this.rotateOnAxis(Xu,e)}translateOnAxis(e,t){return Vu.copy(e).applyQuaternion(this.quaternion),this.position.add(Vu.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Gu,e)}translateY(e){return this.translateOnAxis(Wu,e)}translateZ(e){return this.translateOnAxis(Xu,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(ni.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?eo.copy(e):eo.set(e,t,n);let s=this.parent;this.updateWorldMatrix(!0,!1),Cr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?ni.lookAt(Cr,eo,this.up):ni.lookAt(eo,Cr,this.up),this.quaternion.setFromRotationMatrix(ni),s&&(ni.extractRotation(s.matrixWorld),Ds.setFromRotationMatrix(ni),this.quaternion.premultiply(Ds.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(qu),Us.child=e,this.dispatchEvent(Us),Us.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Rm),Uc.child=e,this.dispatchEvent(Uc),Uc.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),ni.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),ni.multiply(e.parent.matrixWorld)),e.applyMatrix4(ni),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(qu),Us.child=e,this.dispatchEvent(Us),Us.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,s=this.children.length;n<s;n++){let a=this.children[n].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Cr,e,Am),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Cr,Cm,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);let t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){let n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){let s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(e){let t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(o=>({...o})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(e),s.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);let o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){let l=o.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){let d=l[c];r(e.shapes,d)}else r(e.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(r(e.materials,this.material[l]));s.material=o}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){let l=this.animations[o];s.animations.push(r(e.animations,l))}}if(t){let o=a(e.geometries),l=a(e.materials),c=a(e.textures),h=a(e.images),d=a(e.shapes),m=a(e.skeletons),u=a(e.animations),f=a(e.nodes);o.length>0&&(n.geometries=o),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),d.length>0&&(n.shapes=d),m.length>0&&(n.skeletons=m),u.length>0&&(n.animations=u),f.length>0&&(n.nodes=f)}return n.object=s,n;function a(o){let l=[];for(let c in o){let h=o[c];delete h.metadata,l.push(h)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){let s=e.children[n];this.add(s.clone())}return this}};xt.DEFAULT_UP=new L(0,1,0);xt.DEFAULT_MATRIX_AUTO_UPDATE=!0;xt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var Rn=new L,ii=new L,Nc=new L,si=new L,Ns=new L,Fs=new L,$u=new L,Fc=new L,Oc=new L,Bc=new L,zc=new yt,kc=new yt,Hc=new yt,Ci=class i{constructor(e=new L,t=new L,n=new L){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,s){s.subVectors(n,t),Rn.subVectors(e,t),s.cross(Rn);let r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,n,s,r){Rn.subVectors(s,t),ii.subVectors(n,t),Nc.subVectors(e,t);let a=Rn.dot(Rn),o=Rn.dot(ii),l=Rn.dot(Nc),c=ii.dot(ii),h=ii.dot(Nc),d=a*c-o*o;if(d===0)return r.set(0,0,0),null;let m=1/d,u=(c*l-o*h)*m,f=(a*h-o*l)*m;return r.set(1-u-f,f,u)}static containsPoint(e,t,n,s){return this.getBarycoord(e,t,n,s,si)===null?!1:si.x>=0&&si.y>=0&&si.x+si.y<=1}static getInterpolation(e,t,n,s,r,a,o,l){return this.getBarycoord(e,t,n,s,si)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,si.x),l.addScaledVector(a,si.y),l.addScaledVector(o,si.z),l)}static getInterpolatedAttribute(e,t,n,s,r,a){return zc.setScalar(0),kc.setScalar(0),Hc.setScalar(0),zc.fromBufferAttribute(e,t),kc.fromBufferAttribute(e,n),Hc.fromBufferAttribute(e,s),a.setScalar(0),a.addScaledVector(zc,r.x),a.addScaledVector(kc,r.y),a.addScaledVector(Hc,r.z),a}static isFrontFacing(e,t,n,s){return Rn.subVectors(n,t),ii.subVectors(e,t),Rn.cross(ii).dot(s)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,s){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,n,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Rn.subVectors(this.c,this.b),ii.subVectors(this.a,this.b),Rn.cross(ii).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return i.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return i.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,s,r){return i.getInterpolation(e,this.a,this.b,this.c,t,n,s,r)}containsPoint(e){return i.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return i.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,s=this.b,r=this.c,a,o;Ns.subVectors(s,n),Fs.subVectors(r,n),Fc.subVectors(e,n);let l=Ns.dot(Fc),c=Fs.dot(Fc);if(l<=0&&c<=0)return t.copy(n);Oc.subVectors(e,s);let h=Ns.dot(Oc),d=Fs.dot(Oc);if(h>=0&&d<=h)return t.copy(s);let m=l*d-h*c;if(m<=0&&l>=0&&h<=0)return a=l/(l-h),t.copy(n).addScaledVector(Ns,a);Bc.subVectors(e,r);let u=Ns.dot(Bc),f=Fs.dot(Bc);if(f>=0&&u<=f)return t.copy(r);let y=u*c-l*f;if(y<=0&&c>=0&&f<=0)return o=c/(c-f),t.copy(n).addScaledVector(Fs,o);let g=h*f-u*d;if(g<=0&&d-h>=0&&u-f>=0)return $u.subVectors(r,s),o=(d-h)/(d-h+(u-f)),t.copy(s).addScaledVector($u,o);let p=1/(g+y+m);return a=y*p,o=m*p,t.copy(n).addScaledVector(Ns,a).addScaledVector(Fs,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},ff={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Ti={h:0,s:0,l:0},to={h:0,s:0,l:0};function Vc(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}var Ve=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Qt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,it.colorSpaceToWorking(this,t),this}setRGB(e,t,n,s=it.workingColorSpace){return this.r=e,this.g=t,this.b=n,it.colorSpaceToWorking(this,s),this}setHSL(e,t,n,s=it.workingColorSpace){if(e=Ah(e,1),t=Ke(t,0,1),n=Ke(n,0,1),t===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+t):n+t-n*t,a=2*n-r;this.r=Vc(a,r,e+1/3),this.g=Vc(a,r,e),this.b=Vc(a,r,e-1/3)}return it.colorSpaceToWorking(this,s),this}setStyle(e,t=Qt){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r,a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){let r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(r,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Qt){let n=ff[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=ri(e.r),this.g=ri(e.g),this.b=ri(e.b),this}copyLinearToSRGB(e){return this.r=Vs(e.r),this.g=Vs(e.g),this.b=Vs(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Qt){return it.workingToColorSpace(qt.copy(this),e),Math.round(Ke(qt.r*255,0,255))*65536+Math.round(Ke(qt.g*255,0,255))*256+Math.round(Ke(qt.b*255,0,255))}getHexString(e=Qt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=it.workingColorSpace){it.workingToColorSpace(qt.copy(this),t);let n=qt.r,s=qt.g,r=qt.b,a=Math.max(n,s,r),o=Math.min(n,s,r),l,c,h=(o+a)/2;if(o===a)l=0,c=0;else{let d=a-o;switch(c=h<=.5?d/(a+o):d/(2-a-o),a){case n:l=(s-r)/d+(s<r?6:0);break;case s:l=(r-n)/d+2;break;case r:l=(n-s)/d+4;break}l/=6}return e.h=l,e.s=c,e.l=h,e}getRGB(e,t=it.workingColorSpace){return it.workingToColorSpace(qt.copy(this),t),e.r=qt.r,e.g=qt.g,e.b=qt.b,e}getStyle(e=Qt){it.workingToColorSpace(qt.copy(this),e);let t=qt.r,n=qt.g,s=qt.b;return e!==Qt?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(e,t,n){return this.getHSL(Ti),this.setHSL(Ti.h+e,Ti.s+t,Ti.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Ti),e.getHSL(to);let n=Nr(Ti.h,to.h,t),s=Nr(Ti.s,to.s,t),r=Nr(Ti.l,to.l,t);return this.setHSL(n,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*s,this.g=r[1]*t+r[4]*n+r[7]*s,this.b=r[2]*t+r[5]*n+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},qt=new Ve;Ve.NAMES=ff;var Im=0,Xn=class extends Vn{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Im++}),this.uuid=gi(),this.name="",this.type="Material",this.blending=ns,this.side=ai,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Eo,this.blendDst=wo,this.blendEquation=Ii,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Ve(0,0,0),this.blendAlpha=0,this.depthFunc=is,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=eh,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=ji,this.stencilZFail=ji,this.stencilZPass=ji,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}let s=this[t];if(s===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});let n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==ns&&(n.blending=this.blending),this.side!==ai&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Eo&&(n.blendSrc=this.blendSrc),this.blendDst!==wo&&(n.blendDst=this.blendDst),this.blendEquation!==Ii&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==is&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==eh&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==ji&&(n.stencilFail=this.stencilFail),this.stencilZFail!==ji&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==ji&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){let a=[];for(let o in r){let l=r[o];delete l.metadata,a.push(l)}return a}if(t){let r=s(e.textures),a=s(e.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let s=t.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}},mn=class extends Xn{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Ve(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new pn,this.combine=mh,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}};var It=new L,no=new ge,Pm=0,Ct=class{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Pm++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=th,this.updateRanges=[],this.gpuType=wn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[n+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)no.fromBufferAttribute(this,t),no.applyMatrix3(e),this.setXY(t,no.x,no.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)It.fromBufferAttribute(this,t),It.applyMatrix3(e),this.setXYZ(t,It.x,It.y,It.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)It.fromBufferAttribute(this,t),It.applyMatrix4(e),this.setXYZ(t,It.x,It.y,It.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)It.fromBufferAttribute(this,t),It.applyNormalMatrix(e),this.setXYZ(t,It.x,It.y,It.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)It.fromBufferAttribute(this,t),It.transformDirection(e),this.setXYZ(t,It.x,It.y,It.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=Hs(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=jt(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Hs(t,this.array)),t}setX(e,t){return this.normalized&&(t=jt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Hs(t,this.array)),t}setY(e,t){return this.normalized&&(t=jt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Hs(t,this.array)),t}setZ(e,t){return this.normalized&&(t=jt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Hs(t,this.array)),t}setW(e,t){return this.normalized&&(t=jt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=jt(t,this.array),n=jt(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,s){return e*=this.itemSize,this.normalized&&(t=jt(t,this.array),n=jt(n,this.array),s=jt(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e*=this.itemSize,this.normalized&&(t=jt(t,this.array),n=jt(n,this.array),s=jt(s,this.array),r=jt(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==th&&(e.usage=this.usage),e}};var Wr=class extends Ct{constructor(e,t,n){super(new Uint16Array(e),t,n)}};var Xr=class extends Ct{constructor(e,t,n){super(new Uint32Array(e),t,n)}};var nt=class extends Ct{constructor(e,t,n){super(new Float32Array(e),t,n)}},Lm=0,bn=new Ye,Gc=new xt,Os=new L,fn=new Ln,Rr=new Ln,Bt=new L,St=class i extends Vn{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Lm++}),this.uuid=gi(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Ch(e)?Xr:Wr)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let r=new qe().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}let s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return bn.makeRotationFromQuaternion(e),this.applyMatrix4(bn),this}rotateX(e){return bn.makeRotationX(e),this.applyMatrix4(bn),this}rotateY(e){return bn.makeRotationY(e),this.applyMatrix4(bn),this}rotateZ(e){return bn.makeRotationZ(e),this.applyMatrix4(bn),this}translate(e,t,n){return bn.makeTranslation(e,t,n),this.applyMatrix4(bn),this}scale(e,t,n){return bn.makeScale(e,t,n),this.applyMatrix4(bn),this}lookAt(e){return Gc.lookAt(e),Gc.updateMatrix(),this.applyMatrix4(Gc.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Os).negate(),this.translate(Os.x,Os.y,Os.z),this}setFromPoints(e){let t=this.getAttribute("position");if(t===void 0){let n=[];for(let s=0,r=e.length;s<r;s++){let a=e[s];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new nt(n,3))}else{let n=Math.min(e.length,t.count);for(let s=0;s<n;s++){let r=e[s];t.setXYZ(s,r.x,r.y,r.z||0)}e.length>t.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Ln);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new L(-1/0,-1/0,-1/0),new L(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,s=t.length;n<s;n++){let r=t[n];fn.setFromBufferAttribute(r),this.morphTargetsRelative?(Bt.addVectors(this.boundingBox.min,fn.min),this.boundingBox.expandByPoint(Bt),Bt.addVectors(this.boundingBox.max,fn.max),this.boundingBox.expandByPoint(Bt)):(this.boundingBox.expandByPoint(fn.min),this.boundingBox.expandByPoint(fn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new ln);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new L,1/0);return}if(e){let n=this.boundingSphere.center;if(fn.setFromBufferAttribute(e),t)for(let r=0,a=t.length;r<a;r++){let o=t[r];Rr.setFromBufferAttribute(o),this.morphTargetsRelative?(Bt.addVectors(fn.min,Rr.min),fn.expandByPoint(Bt),Bt.addVectors(fn.max,Rr.max),fn.expandByPoint(Bt)):(fn.expandByPoint(Rr.min),fn.expandByPoint(Rr.max))}fn.getCenter(n);let s=0;for(let r=0,a=e.count;r<a;r++)Bt.fromBufferAttribute(e,r),s=Math.max(s,n.distanceToSquared(Bt));if(t)for(let r=0,a=t.length;r<a;r++){let o=t[r],l=this.morphTargetsRelative;for(let c=0,h=o.count;c<h;c++)Bt.fromBufferAttribute(o,c),l&&(Os.fromBufferAttribute(e,c),Bt.add(Os)),s=Math.max(s,n.distanceToSquared(Bt))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=t.position,s=t.normal,r=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Ct(new Float32Array(4*n.count),4));let a=this.getAttribute("tangent"),o=[],l=[];for(let P=0;P<n.count;P++)o[P]=new L,l[P]=new L;let c=new L,h=new L,d=new L,m=new ge,u=new ge,f=new ge,y=new L,g=new L;function p(P,b,S){c.fromBufferAttribute(n,P),h.fromBufferAttribute(n,b),d.fromBufferAttribute(n,S),m.fromBufferAttribute(r,P),u.fromBufferAttribute(r,b),f.fromBufferAttribute(r,S),h.sub(c),d.sub(c),u.sub(m),f.sub(m);let I=1/(u.x*f.y-f.x*u.y);isFinite(I)&&(y.copy(h).multiplyScalar(f.y).addScaledVector(d,-u.y).multiplyScalar(I),g.copy(d).multiplyScalar(u.x).addScaledVector(h,-f.x).multiplyScalar(I),o[P].add(y),o[b].add(y),o[S].add(y),l[P].add(g),l[b].add(g),l[S].add(g))}let v=this.groups;v.length===0&&(v=[{start:0,count:e.count}]);for(let P=0,b=v.length;P<b;++P){let S=v[P],I=S.start,F=S.count;for(let V=I,X=I+F;V<X;V+=3)p(e.getX(V+0),e.getX(V+1),e.getX(V+2))}let _=new L,x=new L,T=new L,A=new L;function C(P){T.fromBufferAttribute(s,P),A.copy(T);let b=o[P];_.copy(b),_.sub(T.multiplyScalar(T.dot(b))).normalize(),x.crossVectors(A,b);let I=x.dot(l[P])<0?-1:1;a.setXYZW(P,_.x,_.y,_.z,I)}for(let P=0,b=v.length;P<b;++P){let S=v[P],I=S.start,F=S.count;for(let V=I,X=I+F;V<X;V+=3)C(e.getX(V+0)),C(e.getX(V+1)),C(e.getX(V+2))}}computeVertexNormals(){let e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Ct(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let m=0,u=n.count;m<u;m++)n.setXYZ(m,0,0,0);let s=new L,r=new L,a=new L,o=new L,l=new L,c=new L,h=new L,d=new L;if(e)for(let m=0,u=e.count;m<u;m+=3){let f=e.getX(m+0),y=e.getX(m+1),g=e.getX(m+2);s.fromBufferAttribute(t,f),r.fromBufferAttribute(t,y),a.fromBufferAttribute(t,g),h.subVectors(a,r),d.subVectors(s,r),h.cross(d),o.fromBufferAttribute(n,f),l.fromBufferAttribute(n,y),c.fromBufferAttribute(n,g),o.add(h),l.add(h),c.add(h),n.setXYZ(f,o.x,o.y,o.z),n.setXYZ(y,l.x,l.y,l.z),n.setXYZ(g,c.x,c.y,c.z)}else for(let m=0,u=t.count;m<u;m+=3)s.fromBufferAttribute(t,m+0),r.fromBufferAttribute(t,m+1),a.fromBufferAttribute(t,m+2),h.subVectors(a,r),d.subVectors(s,r),h.cross(d),n.setXYZ(m+0,h.x,h.y,h.z),n.setXYZ(m+1,h.x,h.y,h.z),n.setXYZ(m+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Bt.fromBufferAttribute(e,t),Bt.normalize(),e.setXYZ(t,Bt.x,Bt.y,Bt.z)}toNonIndexed(){function e(o,l){let c=o.array,h=o.itemSize,d=o.normalized,m=new c.constructor(l.length*h),u=0,f=0;for(let y=0,g=l.length;y<g;y++){o.isInterleavedBufferAttribute?u=l[y]*o.data.stride+o.offset:u=l[y]*h;for(let p=0;p<h;p++)m[f++]=c[u++]}return new Ct(m,h,d)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let t=new i,n=this.index.array,s=this.attributes;for(let o in s){let l=s[o],c=e(l,n);t.setAttribute(o,c)}let r=this.morphAttributes;for(let o in r){let l=[],c=r[o];for(let h=0,d=c.length;h<d;h++){let m=c[h],u=e(m,n);l.push(u)}t.morphAttributes[o]=l}t.morphTargetsRelative=this.morphTargetsRelative;let a=this.groups;for(let o=0,l=a.length;o<l;o++){let c=a[o];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){let e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){let l=this.parameters;for(let c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let l in n){let c=n[l];e.data.attributes[l]=c.toJSON(e.data)}let s={},r=!1;for(let l in this.morphAttributes){let c=this.morphAttributes[l],h=[];for(let d=0,m=c.length;d<m;d++){let u=c[d];h.push(u.toJSON(e.data))}h.length>0&&(s[l]=h,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone());let s=e.attributes;for(let c in s){let h=s[c];this.setAttribute(c,h.clone(t))}let r=e.morphAttributes;for(let c in r){let h=[],d=r[c];for(let m=0,u=d.length;m<u;m++)h.push(d[m].clone(t));this.morphAttributes[c]=h}this.morphTargetsRelative=e.morphTargetsRelative;let a=e.groups;for(let c=0,h=a.length;c<h;c++){let d=a[c];this.addGroup(d.start,d.count,d.materialIndex)}let o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());let l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}},Yu=new Ye,Ji=new Wn,io=new ln,Zu=new L,so=new L,ro=new L,ao=new L,Wc=new L,oo=new L,Ju=new L,lo=new L,dt=class extends xt{constructor(e=new St,t=new mn){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){let o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(e,t){let n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(s,e);let o=this.morphTargetInfluences;if(r&&o){oo.set(0,0,0);for(let l=0,c=r.length;l<c;l++){let h=o[l],d=r[l];h!==0&&(Wc.fromBufferAttribute(d,e),a?oo.addScaledVector(Wc,h):oo.addScaledVector(Wc.sub(t),h))}t.add(oo)}return t}raycast(e,t){let n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),io.copy(n.boundingSphere),io.applyMatrix4(r),Ji.copy(e.ray).recast(e.near),!(io.containsPoint(Ji.origin)===!1&&(Ji.intersectSphere(io,Zu)===null||Ji.origin.distanceToSquared(Zu)>(e.far-e.near)**2))&&(Yu.copy(r).invert(),Ji.copy(e.ray).applyMatrix4(Yu),!(n.boundingBox!==null&&Ji.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,Ji)))}_computeIntersections(e,t,n){let s,r=this.geometry,a=this.material,o=r.index,l=r.attributes.position,c=r.attributes.uv,h=r.attributes.uv1,d=r.attributes.normal,m=r.groups,u=r.drawRange;if(o!==null)if(Array.isArray(a))for(let f=0,y=m.length;f<y;f++){let g=m[f],p=a[g.materialIndex],v=Math.max(g.start,u.start),_=Math.min(o.count,Math.min(g.start+g.count,u.start+u.count));for(let x=v,T=_;x<T;x+=3){let A=o.getX(x),C=o.getX(x+1),P=o.getX(x+2);s=co(this,p,e,n,c,h,d,A,C,P),s&&(s.faceIndex=Math.floor(x/3),s.face.materialIndex=g.materialIndex,t.push(s))}}else{let f=Math.max(0,u.start),y=Math.min(o.count,u.start+u.count);for(let g=f,p=y;g<p;g+=3){let v=o.getX(g),_=o.getX(g+1),x=o.getX(g+2);s=co(this,a,e,n,c,h,d,v,_,x),s&&(s.faceIndex=Math.floor(g/3),t.push(s))}}else if(l!==void 0)if(Array.isArray(a))for(let f=0,y=m.length;f<y;f++){let g=m[f],p=a[g.materialIndex],v=Math.max(g.start,u.start),_=Math.min(l.count,Math.min(g.start+g.count,u.start+u.count));for(let x=v,T=_;x<T;x+=3){let A=x,C=x+1,P=x+2;s=co(this,p,e,n,c,h,d,A,C,P),s&&(s.faceIndex=Math.floor(x/3),s.face.materialIndex=g.materialIndex,t.push(s))}}else{let f=Math.max(0,u.start),y=Math.min(l.count,u.start+u.count);for(let g=f,p=y;g<p;g+=3){let v=g,_=g+1,x=g+2;s=co(this,a,e,n,c,h,d,v,_,x),s&&(s.faceIndex=Math.floor(g/3),t.push(s))}}}};function Dm(i,e,t,n,s,r,a,o){let l;if(e.side===Gt?l=n.intersectTriangle(a,r,s,!0,o):l=n.intersectTriangle(s,r,a,e.side===ai,o),l===null)return null;lo.copy(o),lo.applyMatrix4(i.matrixWorld);let c=t.ray.origin.distanceTo(lo);return c<t.near||c>t.far?null:{distance:c,point:lo.clone(),object:i}}function co(i,e,t,n,s,r,a,o,l,c){i.getVertexPosition(o,so),i.getVertexPosition(l,ro),i.getVertexPosition(c,ao);let h=Dm(i,e,t,n,so,ro,ao,Ju);if(h){let d=new L;Ci.getBarycoord(Ju,so,ro,ao,d),s&&(h.uv=Ci.getInterpolatedAttribute(s,o,l,c,d,new ge)),r&&(h.uv1=Ci.getInterpolatedAttribute(r,o,l,c,d,new ge)),a&&(h.normal=Ci.getInterpolatedAttribute(a,o,l,c,d,new L),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));let m={a:o,b:l,c,normal:new L,materialIndex:0};Ci.getNormal(so,ro,ao,m.normal),h.face=m,h.barycoord=d}return h}var Dt=class i extends St{constructor(e=1,t=1,n=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:s,heightSegments:r,depthSegments:a};let o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);let l=[],c=[],h=[],d=[],m=0,u=0;f("z","y","x",-1,-1,n,t,e,a,r,0),f("z","y","x",1,-1,n,t,-e,a,r,1),f("x","z","y",1,1,e,n,t,s,a,2),f("x","z","y",1,-1,e,n,-t,s,a,3),f("x","y","z",1,-1,e,t,n,s,r,4),f("x","y","z",-1,-1,e,t,-n,s,r,5),this.setIndex(l),this.setAttribute("position",new nt(c,3)),this.setAttribute("normal",new nt(h,3)),this.setAttribute("uv",new nt(d,2));function f(y,g,p,v,_,x,T,A,C,P,b){let S=x/C,I=T/P,F=x/2,V=T/2,X=A/2,D=C+1,z=P+1,Y=0,k=0,re=new L;for(let te=0;te<z;te++){let ie=te*I-V;for(let De=0;De<D;De++){let ke=De*S-F;re[y]=ke*v,re[g]=ie*_,re[p]=X,c.push(re.x,re.y,re.z),re[y]=0,re[g]=0,re[p]=A>0?1:-1,h.push(re.x,re.y,re.z),d.push(De/C),d.push(1-te/P),Y+=1}}for(let te=0;te<P;te++)for(let ie=0;ie<C;ie++){let De=m+ie+D*te,ke=m+ie+D*(te+1),je=m+(ie+1)+D*(te+1),Xe=m+(ie+1)+D*te;l.push(De,ke,Xe),l.push(ke,je,Xe),k+=6}o.addGroup(u,k,b),u+=k,m+=Y}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}};function ms(i){let e={};for(let t in i){e[t]={};for(let n in i[t]){let s=i[t][n];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=s.clone():Array.isArray(s)?e[t][n]=s.slice():e[t][n]=s}}return e}function Yt(i){let e={};for(let t=0;t<i.length;t++){let n=ms(i[t]);for(let s in n)e[s]=n[s]}return e}function Um(i){let e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function Rh(i){let e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:it.workingColorSpace}var pf={clone:ms,merge:Yt},Nm=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Fm=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,gn=class extends Xn{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Nm,this.fragmentShader=Fm,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=ms(e.uniforms),this.uniformsGroups=Um(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let s in this.uniforms){let a=this.uniforms[s].value;a&&a.isTexture?t.uniforms[s]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[s]={type:"m4",value:a.toArray()}:t.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let n={};for(let s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}},qr=class extends xt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Ye,this.projectionMatrix=new Ye,this.projectionMatrixInverse=new Ye,this.coordinateSystem=In,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}},Ai=new L,Ku=new ge,ju=new ge,$t=class extends qr{constructor(e=50,t=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=Ws*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(Ur*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Ws*2*Math.atan(Math.tan(Ur*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){Ai.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Ai.x,Ai.y).multiplyScalar(-e/Ai.z),Ai.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Ai.x,Ai.y).multiplyScalar(-e/Ai.z)}getViewSize(e,t){return this.getViewBounds(e,Ku,ju),t.subVectors(ju,Ku)}setViewOffset(e,t,n,s,r,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(Ur*.5*this.fov)/this.zoom,n=2*t,s=this.aspect*n,r=-.5*s,a=this.view;if(this.view!==null&&this.view.enabled){let l=a.fullWidth,c=a.fullHeight;r+=a.offsetX*s/l,t-=a.offsetY*n/c,s*=a.width/l,n*=a.height/c}let o=this.filmOffset;o!==0&&(r+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}},Bs=-90,zs=1,Lo=class extends xt{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let s=new $t(Bs,zs,e,t);s.layers=this.layers,this.add(s);let r=new $t(Bs,zs,e,t);r.layers=this.layers,this.add(r);let a=new $t(Bs,zs,e,t);a.layers=this.layers,this.add(a);let o=new $t(Bs,zs,e,t);o.layers=this.layers,this.add(o);let l=new $t(Bs,zs,e,t);l.layers=this.layers,this.add(l);let c=new $t(Bs,zs,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[n,s,r,a,o,l]=t;for(let c of t)this.remove(c);if(e===In)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===Hr)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(let c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[r,a,o,l,c,h]=this.children,d=e.getRenderTarget(),m=e.getActiveCubeFace(),u=e.getActiveMipmapLevel(),f=e.xr.enabled;e.xr.enabled=!1;let y=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,s),e.render(t,r),e.setRenderTarget(n,1,s),e.render(t,a),e.setRenderTarget(n,2,s),e.render(t,o),e.setRenderTarget(n,3,s),e.render(t,l),e.setRenderTarget(n,4,s),e.render(t,c),n.texture.generateMipmaps=y,e.setRenderTarget(n,5,s),e.render(t,h),e.setRenderTarget(d,m,u),e.xr.enabled=f,n.texture.needsPMREMUpdate=!0}},$r=class extends on{constructor(e=[],t=fs,n,s,r,a,o,l,c,h){super(e,t,n,s,r,a,o,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},Do=class extends Gn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},s=[n,n,n,n,n,n];this.texture=new $r(s),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new Dt(5,5,5),r=new gn({name:"CubemapFromEquirect",uniforms:ms(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Gt,blending:fi});r.uniforms.tEquirect.value=t;let a=new dt(s,r),o=t.minFilter;return t.minFilter===Di&&(t.minFilter=Pn),new Lo(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,s=!0){let r=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,s);e.setRenderTarget(r)}},At=class extends xt{constructor(){super(),this.isGroup=!0,this.type="Group"}},Om={type:"move"},Ys=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new At,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new At,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new L,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new L),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new At,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new L,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new L),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let s=null,r=null,a=null,o=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){a=!0;for(let y of e.hand.values()){let g=t.getJointPose(y,n),p=this._getHandJoint(c,y);g!==null&&(p.matrix.fromArray(g.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=g.radius),p.visible=g!==null}let h=c.joints["index-finger-tip"],d=c.joints["thumb-tip"],m=h.position.distanceTo(d.position),u=.02,f=.005;c.inputState.pinching&&m>u+f?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&m<=u-f&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));o!==null&&(s=t.getPose(e.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Om)))}return o!==null&&(o.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let n=new At;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}},Yr=class i{constructor(e,t=25e-5){this.isFogExp2=!0,this.name="",this.color=new Ve(e),this.density=t}clone(){return new i(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}};var Zr=class extends xt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new pn,this.environmentIntensity=1,this.environmentRotation=new pn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}};var ho=new L,Qu=new L,Jr=class extends xt{constructor(){super(),this.isLOD=!0,this._currentLevel=0,this.type="LOD",Object.defineProperties(this,{levels:{enumerable:!0,value:[]}}),this.autoUpdate=!0}copy(e){super.copy(e,!1);let t=e.levels;for(let n=0,s=t.length;n<s;n++){let r=t[n];this.addLevel(r.object.clone(),r.distance,r.hysteresis)}return this.autoUpdate=e.autoUpdate,this}addLevel(e,t=0,n=0){t=Math.abs(t);let s=this.levels,r;for(r=0;r<s.length&&!(t<s[r].distance);r++);return s.splice(r,0,{distance:t,hysteresis:n,object:e}),this.add(e),this}removeLevel(e){let t=this.levels;for(let n=0;n<t.length;n++)if(t[n].distance===e){let s=t.splice(n,1);return this.remove(s[0].object),!0}return!1}getCurrentLevel(){return this._currentLevel}getObjectForDistance(e){let t=this.levels;if(t.length>0){let n,s;for(n=1,s=t.length;n<s;n++){let r=t[n].distance;if(t[n].object.visible&&(r-=r*t[n].hysteresis),e<r)break}return t[n-1].object}return null}raycast(e,t){if(this.levels.length>0){ho.setFromMatrixPosition(this.matrixWorld);let s=e.ray.origin.distanceTo(ho);this.getObjectForDistance(s).raycast(e,t)}}update(e){let t=this.levels;if(t.length>1){ho.setFromMatrixPosition(e.matrixWorld),Qu.setFromMatrixPosition(this.matrixWorld);let n=ho.distanceTo(Qu)/e.zoom;t[0].object.visible=!0;let s,r;for(s=1,r=t.length;s<r;s++){let a=t[s].distance;if(t[s].object.visible&&(a-=a*t[s].hysteresis),n>=a)t[s-1].object.visible=!1,t[s].object.visible=!0;else break}for(this._currentLevel=s-1;s<r;s++)t[s].object.visible=!1}}toJSON(e){let t=super.toJSON(e);this.autoUpdate===!1&&(t.object.autoUpdate=!1),t.object.levels=[];let n=this.levels;for(let s=0,r=n.length;s<r;s++){let a=n[s];t.object.levels.push({object:a.object.uuid,distance:a.distance,hysteresis:a.hysteresis})}return t}},ed=new L,td=new yt,nd=new yt,Bm=new L,id=new Ye,uo=new L,Xc=new ln,sd=new Ye,qc=new Wn,Kr=class extends dt{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=Qc,this.bindMatrix=new Ye,this.bindMatrixInverse=new Ye,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){let e=this.geometry;this.boundingBox===null&&(this.boundingBox=new Ln),this.boundingBox.makeEmpty();let t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,uo),this.boundingBox.expandByPoint(uo)}computeBoundingSphere(){let e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new ln),this.boundingSphere.makeEmpty();let t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,uo),this.boundingSphere.expandByPoint(uo)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,t){let n=this.material,s=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Xc.copy(this.boundingSphere),Xc.applyMatrix4(s),e.ray.intersectsSphere(Xc)!==!1&&(sd.copy(s).invert(),qc.copy(e.ray).applyMatrix4(sd),!(this.boundingBox!==null&&qc.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(e,t,qc)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){let e=new yt,t=this.geometry.attributes.skinWeight;for(let n=0,s=t.count;n<s;n++){e.fromBufferAttribute(t,n);let r=1/e.manhattanLength();r!==1/0?e.multiplyScalar(r):e.set(1,0,0,0),t.setXYZW(n,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===Qc?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===Zd?this.bindMatrixInverse.copy(this.bindMatrix).invert():console.warn("THREE.SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){let n=this.skeleton,s=this.geometry;td.fromBufferAttribute(s.attributes.skinIndex,e),nd.fromBufferAttribute(s.attributes.skinWeight,e),ed.copy(t).applyMatrix4(this.bindMatrix),t.set(0,0,0);for(let r=0;r<4;r++){let a=nd.getComponent(r);if(a!==0){let o=td.getComponent(r);id.multiplyMatrices(n.bones[o].matrixWorld,n.boneInverses[o]),t.addScaledVector(Bm.copy(ed).applyMatrix4(id),a)}}return t.applyMatrix4(this.bindMatrixInverse)}},yn=class extends xt{constructor(){super(),this.isBone=!0,this.type="Bone"}},jr=class extends on{constructor(e=null,t=1,n=1,s,r,a,o,l,c=an,h=an,d,m){super(null,a,o,l,c,h,s,r,d,m),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},rd=new Ye,zm=new Ye,Qr=class i{constructor(e=[],t=[]){this.uuid=gi(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){let e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){console.warn("THREE.Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,s=this.bones.length;n<s;n++)this.boneInverses.push(new Ye)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){let n=new Ye;this.bones[e]&&n.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){let n=this.bones[e];n&&n.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){let n=this.bones[e];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){let e=this.bones,t=this.boneInverses,n=this.boneMatrices,s=this.boneTexture;for(let r=0,a=e.length;r<a;r++){let o=e[r]?e[r].matrixWorld:zm;rd.multiplyMatrices(o,t[r]),rd.toArray(n,r*16)}s!==null&&(s.needsUpdate=!0)}clone(){return new i(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);let t=new Float32Array(e*e*4);t.set(this.boneMatrices);let n=new jr(t,e,e,_n,wn);return n.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=n,this}getBoneByName(e){for(let t=0,n=this.bones.length;t<n;t++){let s=this.bones[t];if(s.name===e)return s}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let n=0,s=e.bones.length;n<s;n++){let r=e.bones[n],a=t[r];a===void 0&&(console.warn("THREE.Skeleton: No bone found with UUID:",r),a=new yn),this.bones.push(a),this.boneInverses.push(new Ye().fromArray(e.boneInverses[n]))}return this.init(),this}toJSON(){let e={metadata:{version:4.7,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;let t=this.bones,n=this.boneInverses;for(let s=0,r=t.length;s<r;s++){let a=t[s];e.bones.push(a.uuid);let o=n[s];e.boneInverses.push(o.toArray())}return e}},ea=class extends Ct{constructor(e,t,n,s=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){let e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}},ks=new Ye,ad=new Ye,fo=[],od=new Ln,km=new Ye,Ir=new dt,Pr=new ln,qn=class extends dt{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new ea(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<n;s++)this.setMatrixAt(s,km)}computeBoundingBox(){let e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new Ln),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,ks),od.copy(e.boundingBox).applyMatrix4(ks),this.boundingBox.union(od)}computeBoundingSphere(){let e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new ln),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,ks),Pr.copy(e.boundingSphere).applyMatrix4(ks),this.boundingSphere.union(Pr)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){let n=t.morphTargetInfluences,s=this.morphTexture.source.data.data,r=n.length+1,a=e*r+1;for(let o=0;o<n.length;o++)n[o]=s[a+o]}raycast(e,t){let n=this.matrixWorld,s=this.count;if(Ir.geometry=this.geometry,Ir.material=this.material,Ir.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Pr.copy(this.boundingSphere),Pr.applyMatrix4(n),e.ray.intersectsSphere(Pr)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,ks),ad.multiplyMatrices(n,ks),Ir.matrixWorld=ad,Ir.raycast(e,fo);for(let a=0,o=fo.length;a<o;a++){let l=fo[a];l.instanceId=r,l.object=this,t.push(l)}fo.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new ea(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}setMorphAt(e,t){let n=t.morphTargetInfluences,s=n.length+1;this.morphTexture===null&&(this.morphTexture=new jr(new Float32Array(s*this.count),s,this.count,dl,wn));let r=this.morphTexture.source.data.data,a=0;for(let c=0;c<n.length;c++)a+=n[c];let o=this.geometry.morphTargetsRelative?1:1-a,l=s*e;r[l]=o,r.set(n,l+1)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}},$c=new L,Hm=new L,Vm=new qe,Hn=class{constructor(e=new L(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,s){return this.normal.set(e,t,n),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let s=$c.subVectors(n,t).cross(Hm.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){let n=e.delta($c),s=this.normal.dot(n);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let r=-(e.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:t.copy(e.start).addScaledVector(n,r)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||Vm.getNormalMatrix(e),s=this.coplanarPoint($c).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}},Ki=new ln,Gm=new ge(.5,.5),po=new L,Pi=class{constructor(e=new Hn,t=new Hn,n=new Hn,s=new Hn,r=new Hn,a=new Hn){this.planes=[e,t,n,s,r,a]}set(e,t,n,s,r,a){let o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=In,n=!1){let s=this.planes,r=e.elements,a=r[0],o=r[1],l=r[2],c=r[3],h=r[4],d=r[5],m=r[6],u=r[7],f=r[8],y=r[9],g=r[10],p=r[11],v=r[12],_=r[13],x=r[14],T=r[15];if(s[0].setComponents(c-a,u-h,p-f,T-v).normalize(),s[1].setComponents(c+a,u+h,p+f,T+v).normalize(),s[2].setComponents(c+o,u+d,p+y,T+_).normalize(),s[3].setComponents(c-o,u-d,p-y,T-_).normalize(),n)s[4].setComponents(l,m,g,x).normalize(),s[5].setComponents(c-l,u-m,p-g,T-x).normalize();else if(s[4].setComponents(c-l,u-m,p-g,T-x).normalize(),t===In)s[5].setComponents(c+l,u+m,p+g,T+x).normalize();else if(t===Hr)s[5].setComponents(l,m,g,x).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Ki.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Ki.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Ki)}intersectsSprite(e){Ki.center.set(0,0,0);let t=Gm.distanceTo(e.center);return Ki.radius=.7071067811865476+t,Ki.applyMatrix4(e.matrixWorld),this.intersectsSphere(Ki)}intersectsSphere(e){let t=this.planes,n=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let s=t[n];if(po.x=s.normal.x>0?e.max.x:e.min.x,po.y=s.normal.y>0?e.max.y:e.min.y,po.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(po)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};var ta=class extends Xn{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Ve(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}},Uo=new L,No=new L,ld=new Ye,Lr=new Wn,mo=new ln,Yc=new L,cd=new L,Zs=class extends xt{constructor(e=new St,t=new ta){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[0];for(let s=1,r=t.count;s<r;s++)Uo.fromBufferAttribute(t,s-1),No.fromBufferAttribute(t,s),n[s]=n[s-1],n[s]+=Uo.distanceTo(No);e.setAttribute("lineDistance",new nt(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){let n=this.geometry,s=this.matrixWorld,r=e.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),mo.copy(n.boundingSphere),mo.applyMatrix4(s),mo.radius+=r,e.ray.intersectsSphere(mo)===!1)return;ld.copy(s).invert(),Lr.copy(e.ray).applyMatrix4(ld);let o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=this.isLineSegments?2:1,h=n.index,m=n.attributes.position;if(h!==null){let u=Math.max(0,a.start),f=Math.min(h.count,a.start+a.count);for(let y=u,g=f-1;y<g;y+=c){let p=h.getX(y),v=h.getX(y+1),_=go(this,e,Lr,l,p,v,y);_&&t.push(_)}if(this.isLineLoop){let y=h.getX(f-1),g=h.getX(u),p=go(this,e,Lr,l,y,g,f-1);p&&t.push(p)}}else{let u=Math.max(0,a.start),f=Math.min(m.count,a.start+a.count);for(let y=u,g=f-1;y<g;y+=c){let p=go(this,e,Lr,l,y,y+1,y);p&&t.push(p)}if(this.isLineLoop){let y=go(this,e,Lr,l,f-1,u,f-1);y&&t.push(y)}}}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){let o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}};function go(i,e,t,n,s,r,a){let o=i.geometry.attributes.position;if(Uo.fromBufferAttribute(o,s),No.fromBufferAttribute(o,r),t.distanceSqToSegment(Uo,No,Yc,cd)>n)return;Yc.applyMatrix4(i.matrixWorld);let c=e.ray.origin.distanceTo(Yc);if(!(c<e.near||c>e.far))return{distance:c,point:cd.clone().applyMatrix4(i.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:i}}var Js=class extends Xn{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Ve(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},hd=new Ye,nh=new Wn,yo=new ln,xo=new L,na=class extends xt{constructor(e=new St,t=new Js){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){let n=this.geometry,s=this.matrixWorld,r=e.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),yo.copy(n.boundingSphere),yo.applyMatrix4(s),yo.radius+=r,e.ray.intersectsSphere(yo)===!1)return;hd.copy(s).invert(),nh.copy(e.ray).applyMatrix4(hd);let o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=n.index,d=n.attributes.position;if(c!==null){let m=Math.max(0,a.start),u=Math.min(c.count,a.start+a.count);for(let f=m,y=u;f<y;f++){let g=c.getX(f);xo.fromBufferAttribute(d,g),ud(xo,g,l,s,e,t,this)}}else{let m=Math.max(0,a.start),u=Math.min(d.count,a.start+a.count);for(let f=m,y=u;f<y;f++)xo.fromBufferAttribute(d,f),ud(xo,f,l,s,e,t,this)}}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){let o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}};function ud(i,e,t,n,s,r,a){let o=nh.distanceSqToPoint(i);if(o<t){let l=new L;nh.closestPointToPoint(i,l),l.applyMatrix4(n);let c=s.ray.origin.distanceTo(l);if(c<s.near||c>s.far)return;r.push({distance:c,distanceToRay:Math.sqrt(o),point:l,index:e,face:null,faceIndex:null,barycoord:null,object:a})}}var ia=class extends on{constructor(e,t,n=Ui,s,r,a,o=an,l=an,c,h=Gs,d=1){if(h!==Gs&&h!==rr)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let m={width:e,height:t,depth:d};super(m,s,r,a,o,l,h,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new qs(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}},sa=class extends on{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}};var rs=class i extends St{constructor(e=1,t=32,n=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:s},t=Math.max(3,t);let r=[],a=[],o=[],l=[],c=new L,h=new ge;a.push(0,0,0),o.push(0,0,1),l.push(.5,.5);for(let d=0,m=3;d<=t;d++,m+=3){let u=n+d/t*s;c.x=e*Math.cos(u),c.y=e*Math.sin(u),a.push(c.x,c.y,c.z),o.push(0,0,1),h.x=(a[m]/e+1)/2,h.y=(a[m+1]/e+1)/2,l.push(h.x,h.y)}for(let d=1;d<=t;d++)r.push(d,d+1,0);this.setIndex(r),this.setAttribute("position",new nt(a,3)),this.setAttribute("normal",new nt(o,3)),this.setAttribute("uv",new nt(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radius,e.segments,e.thetaStart,e.thetaLength)}},oi=class i extends St{constructor(e=1,t=1,n=1,s=32,r=1,a=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:s,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:l};let c=this;s=Math.floor(s),r=Math.floor(r);let h=[],d=[],m=[],u=[],f=0,y=[],g=n/2,p=0;v(),a===!1&&(e>0&&_(!0),t>0&&_(!1)),this.setIndex(h),this.setAttribute("position",new nt(d,3)),this.setAttribute("normal",new nt(m,3)),this.setAttribute("uv",new nt(u,2));function v(){let x=new L,T=new L,A=0,C=(t-e)/n;for(let P=0;P<=r;P++){let b=[],S=P/r,I=S*(t-e)+e;for(let F=0;F<=s;F++){let V=F/s,X=V*l+o,D=Math.sin(X),z=Math.cos(X);T.x=I*D,T.y=-S*n+g,T.z=I*z,d.push(T.x,T.y,T.z),x.set(D,C,z).normalize(),m.push(x.x,x.y,x.z),u.push(V,1-S),b.push(f++)}y.push(b)}for(let P=0;P<s;P++)for(let b=0;b<r;b++){let S=y[b][P],I=y[b+1][P],F=y[b+1][P+1],V=y[b][P+1];(e>0||b!==0)&&(h.push(S,I,V),A+=3),(t>0||b!==r-1)&&(h.push(I,F,V),A+=3)}c.addGroup(p,A,0),p+=A}function _(x){let T=f,A=new ge,C=new L,P=0,b=x===!0?e:t,S=x===!0?1:-1;for(let F=1;F<=s;F++)d.push(0,g*S,0),m.push(0,S,0),u.push(.5,.5),f++;let I=f;for(let F=0;F<=s;F++){let X=F/s*l+o,D=Math.cos(X),z=Math.sin(X);C.x=b*z,C.y=g*S,C.z=b*D,d.push(C.x,C.y,C.z),m.push(0,S,0),A.x=D*.5+.5,A.y=z*.5*S+.5,u.push(A.x,A.y),f++}for(let F=0;F<s;F++){let V=T+F,X=I+F;x===!0?h.push(X,X+1,V):h.push(X+1,X,V),P+=3}c.addGroup(p,P,x===!0?1:2),p+=P}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}},Dn=class i extends oi{constructor(e=1,t=1,n=32,s=1,r=!1,a=0,o=Math.PI*2){super(0,e,t,n,s,r,a,o),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:n,heightSegments:s,openEnded:r,thetaStart:a,thetaLength:o}}static fromJSON(e){return new i(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}},Ks=class i extends St{constructor(e=[],t=[],n=1,s=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:n,detail:s};let r=[],a=[];o(s),c(n),h(),this.setAttribute("position",new nt(r,3)),this.setAttribute("normal",new nt(r.slice(),3)),this.setAttribute("uv",new nt(a,2)),s===0?this.computeVertexNormals():this.normalizeNormals();function o(v){let _=new L,x=new L,T=new L;for(let A=0;A<t.length;A+=3)u(t[A+0],_),u(t[A+1],x),u(t[A+2],T),l(_,x,T,v)}function l(v,_,x,T){let A=T+1,C=[];for(let P=0;P<=A;P++){C[P]=[];let b=v.clone().lerp(x,P/A),S=_.clone().lerp(x,P/A),I=A-P;for(let F=0;F<=I;F++)F===0&&P===A?C[P][F]=b:C[P][F]=b.clone().lerp(S,F/I)}for(let P=0;P<A;P++)for(let b=0;b<2*(A-P)-1;b++){let S=Math.floor(b/2);b%2===0?(m(C[P][S+1]),m(C[P+1][S]),m(C[P][S])):(m(C[P][S+1]),m(C[P+1][S+1]),m(C[P+1][S]))}}function c(v){let _=new L;for(let x=0;x<r.length;x+=3)_.x=r[x+0],_.y=r[x+1],_.z=r[x+2],_.normalize().multiplyScalar(v),r[x+0]=_.x,r[x+1]=_.y,r[x+2]=_.z}function h(){let v=new L;for(let _=0;_<r.length;_+=3){v.x=r[_+0],v.y=r[_+1],v.z=r[_+2];let x=g(v)/2/Math.PI+.5,T=p(v)/Math.PI+.5;a.push(x,1-T)}f(),d()}function d(){for(let v=0;v<a.length;v+=6){let _=a[v+0],x=a[v+2],T=a[v+4],A=Math.max(_,x,T),C=Math.min(_,x,T);A>.9&&C<.1&&(_<.2&&(a[v+0]+=1),x<.2&&(a[v+2]+=1),T<.2&&(a[v+4]+=1))}}function m(v){r.push(v.x,v.y,v.z)}function u(v,_){let x=v*3;_.x=e[x+0],_.y=e[x+1],_.z=e[x+2]}function f(){let v=new L,_=new L,x=new L,T=new L,A=new ge,C=new ge,P=new ge;for(let b=0,S=0;b<r.length;b+=9,S+=6){v.set(r[b+0],r[b+1],r[b+2]),_.set(r[b+3],r[b+4],r[b+5]),x.set(r[b+6],r[b+7],r[b+8]),A.set(a[S+0],a[S+1]),C.set(a[S+2],a[S+3]),P.set(a[S+4],a[S+5]),T.copy(v).add(_).add(x).divideScalar(3);let I=g(T);y(A,S+0,v,I),y(C,S+2,_,I),y(P,S+4,x,I)}}function y(v,_,x,T){T<0&&v.x===1&&(a[_]=v.x-1),x.x===0&&x.z===0&&(a[_]=T/2/Math.PI+.5)}function g(v){return Math.atan2(v.z,-v.x)}function p(v){return Math.atan2(-v.y,Math.sqrt(v.x*v.x+v.z*v.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.vertices,e.indices,e.radius,e.details)}},as=class i extends Ks{constructor(e=1,t=0){let n=(1+Math.sqrt(5))/2,s=1/n,r=[-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-s,-n,0,-s,n,0,s,-n,0,s,n,-s,-n,0,-s,n,0,s,-n,0,s,n,0,-n,0,-s,n,0,-s,-n,0,s,n,0,s],a=[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9];super(r,a,e,t),this.type="DodecahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new i(e.radius,e.detail)}};var xn=class{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){console.warn("THREE.Curve: .getPoint() not implemented.")}getPointAt(e,t){let n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){let e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let t=[],n,s=this.getPoint(0),r=0;t.push(0);for(let a=1;a<=e;a++)n=this.getPoint(a/e),r+=n.distanceTo(s),t.push(r),s=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){let n=this.getLengths(),s=0,r=n.length,a;t?a=t:a=e*n[r-1];let o=0,l=r-1,c;for(;o<=l;)if(s=Math.floor(o+(l-o)/2),c=n[s]-a,c<0)o=s+1;else if(c>0)l=s-1;else{l=s;break}if(s=l,n[s]===a)return s/(r-1);let h=n[s],m=n[s+1]-h,u=(a-h)/m;return(s+u)/(r-1)}getTangent(e,t){let s=e-1e-4,r=e+1e-4;s<0&&(s=0),r>1&&(r=1);let a=this.getPoint(s),o=this.getPoint(r),l=t||(a.isVector2?new ge:new L);return l.copy(o).sub(a).normalize(),l}getTangentAt(e,t){let n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t=!1){let n=new L,s=[],r=[],a=[],o=new L,l=new Ye;for(let u=0;u<=e;u++){let f=u/e;s[u]=this.getTangentAt(f,new L)}r[0]=new L,a[0]=new L;let c=Number.MAX_VALUE,h=Math.abs(s[0].x),d=Math.abs(s[0].y),m=Math.abs(s[0].z);h<=c&&(c=h,n.set(1,0,0)),d<=c&&(c=d,n.set(0,1,0)),m<=c&&n.set(0,0,1),o.crossVectors(s[0],n).normalize(),r[0].crossVectors(s[0],o),a[0].crossVectors(s[0],r[0]);for(let u=1;u<=e;u++){if(r[u]=r[u-1].clone(),a[u]=a[u-1].clone(),o.crossVectors(s[u-1],s[u]),o.length()>Number.EPSILON){o.normalize();let f=Math.acos(Ke(s[u-1].dot(s[u]),-1,1));r[u].applyMatrix4(l.makeRotationAxis(o,f))}a[u].crossVectors(s[u],r[u])}if(t===!0){let u=Math.acos(Ke(r[0].dot(r[e]),-1,1));u/=e,s[0].dot(o.crossVectors(r[0],r[e]))>0&&(u=-u);for(let f=1;f<=e;f++)r[f].applyMatrix4(l.makeRotationAxis(s[f],u*f)),a[f].crossVectors(s[f],r[f])}return{tangents:s,normals:r,binormals:a}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){let e={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}},js=class extends xn{constructor(e=0,t=0,n=1,s=1,r=0,a=Math.PI*2,o=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=a,this.aClockwise=o,this.aRotation=l}getPoint(e,t=new ge){let n=t,s=Math.PI*2,r=this.aEndAngle-this.aStartAngle,a=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(a?r=0:r=s),this.aClockwise===!0&&!a&&(r===s?r=-s:r=r-s);let o=this.aStartAngle+e*r,l=this.aX+this.xRadius*Math.cos(o),c=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){let h=Math.cos(this.aRotation),d=Math.sin(this.aRotation),m=l-this.aX,u=c-this.aY;l=m*h-u*d+this.aX,c=m*d+u*h+this.aY}return n.set(l,c)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){let e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}},Fo=class extends js{constructor(e,t,n,s,r,a){super(e,t,n,n,s,r,a),this.isArcCurve=!0,this.type="ArcCurve"}};function Ih(){let i=0,e=0,t=0,n=0;function s(r,a,o,l){i=r,e=o,t=-3*r+3*a-2*o-l,n=2*r-2*a+o+l}return{initCatmullRom:function(r,a,o,l,c){s(a,o,c*(o-r),c*(l-a))},initNonuniformCatmullRom:function(r,a,o,l,c,h,d){let m=(a-r)/c-(o-r)/(c+h)+(o-a)/h,u=(o-a)/h-(l-a)/(h+d)+(l-o)/d;m*=h,u*=h,s(a,o,m,u)},calc:function(r){let a=r*r,o=a*r;return i+e*r+t*a+n*o}}}var _o=new L,Zc=new Ih,Jc=new Ih,Kc=new Ih,Li=class extends xn{constructor(e=[],t=!1,n="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=n,this.tension=s}getPoint(e,t=new L){let n=t,s=this.points,r=s.length,a=(r-(this.closed?0:1))*e,o=Math.floor(a),l=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/r)+1)*r:l===0&&o===r-1&&(o=r-2,l=1);let c,h;this.closed||o>0?c=s[(o-1)%r]:(_o.subVectors(s[0],s[1]).add(s[0]),c=_o);let d=s[o%r],m=s[(o+1)%r];if(this.closed||o+2<r?h=s[(o+2)%r]:(_o.subVectors(s[r-1],s[r-2]).add(s[r-1]),h=_o),this.curveType==="centripetal"||this.curveType==="chordal"){let u=this.curveType==="chordal"?.5:.25,f=Math.pow(c.distanceToSquared(d),u),y=Math.pow(d.distanceToSquared(m),u),g=Math.pow(m.distanceToSquared(h),u);y<1e-4&&(y=1),f<1e-4&&(f=y),g<1e-4&&(g=y),Zc.initNonuniformCatmullRom(c.x,d.x,m.x,h.x,f,y,g),Jc.initNonuniformCatmullRom(c.y,d.y,m.y,h.y,f,y,g),Kc.initNonuniformCatmullRom(c.z,d.z,m.z,h.z,f,y,g)}else this.curveType==="catmullrom"&&(Zc.initCatmullRom(c.x,d.x,m.x,h.x,this.tension),Jc.initCatmullRom(c.y,d.y,m.y,h.y,this.tension),Kc.initCatmullRom(c.z,d.z,m.z,h.z,this.tension));return n.set(Zc.calc(l),Jc.calc(l),Kc.calc(l)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let s=e.points[t];this.points.push(s.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let s=this.points[t];e.points.push(s.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let s=e.points[t];this.points.push(new L().fromArray(s))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}};function dd(i,e,t,n,s){let r=(n-e)*.5,a=(s-t)*.5,o=i*i,l=i*o;return(2*t-2*n+r+a)*l+(-3*t+3*n-2*r-a)*o+r*i+t}function Wm(i,e){let t=1-i;return t*t*e}function Xm(i,e){return 2*(1-i)*i*e}function qm(i,e){return i*i*e}function Fr(i,e,t,n){return Wm(i,e)+Xm(i,t)+qm(i,n)}function $m(i,e){let t=1-i;return t*t*t*e}function Ym(i,e){let t=1-i;return 3*t*t*i*e}function Zm(i,e){return 3*(1-i)*i*i*e}function Jm(i,e){return i*i*i*e}function Or(i,e,t,n,s){return $m(i,e)+Ym(i,t)+Zm(i,n)+Jm(i,s)}var ra=class extends xn{constructor(e=new ge,t=new ge,n=new ge,s=new ge){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=n,this.v3=s}getPoint(e,t=new ge){let n=t,s=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(Or(e,s.x,r.x,a.x,o.x),Or(e,s.y,r.y,a.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},Oo=class extends xn{constructor(e=new L,t=new L,n=new L,s=new L){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=n,this.v3=s}getPoint(e,t=new L){let n=t,s=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(Or(e,s.x,r.x,a.x,o.x),Or(e,s.y,r.y,a.y,o.y),Or(e,s.z,r.z,a.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},aa=class extends xn{constructor(e=new ge,t=new ge){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new ge){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new ge){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Bo=class extends xn{constructor(e=new L,t=new L){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new L){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new L){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},oa=class extends xn{constructor(e=new ge,t=new ge,n=new ge){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new ge){let n=t,s=this.v0,r=this.v1,a=this.v2;return n.set(Fr(e,s.x,r.x,a.x),Fr(e,s.y,r.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},la=class extends xn{constructor(e=new L,t=new L,n=new L){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new L){let n=t,s=this.v0,r=this.v1,a=this.v2;return n.set(Fr(e,s.x,r.x,a.x),Fr(e,s.y,r.y,a.y),Fr(e,s.z,r.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},ca=class extends xn{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new ge){let n=t,s=this.points,r=(s.length-1)*e,a=Math.floor(r),o=r-a,l=s[a===0?a:a-1],c=s[a],h=s[a>s.length-2?s.length-1:a+1],d=s[a>s.length-3?s.length-1:a+2];return n.set(dd(o,l.x,c.x,h.x,d.x),dd(o,l.y,c.y,h.y,d.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let s=e.points[t];this.points.push(s.clone())}return this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let s=this.points[t];e.points.push(s.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let s=e.points[t];this.points.push(new ge().fromArray(s))}return this}},zo=Object.freeze({__proto__:null,ArcCurve:Fo,CatmullRomCurve3:Li,CubicBezierCurve:ra,CubicBezierCurve3:Oo,EllipseCurve:js,LineCurve:aa,LineCurve3:Bo,QuadraticBezierCurve:oa,QuadraticBezierCurve3:la,SplineCurve:ca}),ko=class extends xn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){let e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){let n=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new zo[n](t,e))}return this}getPoint(e,t){let n=e*this.getLength(),s=this.getCurveLengths(),r=0;for(;r<s.length;){if(s[r]>=n){let a=s[r]-n,o=this.curves[r],l=o.getLength(),c=l===0?0:1-a/l;return o.getPointAt(c,t)}r++}return null}getLength(){let e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let e=[],t=0;for(let n=0,s=this.curves.length;n<s;n++)t+=this.curves[n].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){let t=[],n;for(let s=0,r=this.curves;s<r.length;s++){let a=r[s],o=a.isEllipseCurve?e*2:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?e*a.points.length:e,l=a.getPoints(o);for(let c=0;c<l.length;c++){let h=l[c];n&&n.equals(h)||(t.push(h),n=h)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let s=e.curves[t];this.curves.push(s.clone())}return this.autoClose=e.autoClose,this}toJSON(){let e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,n=this.curves.length;t<n;t++){let s=this.curves[t];e.curves.push(s.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let s=e.curves[t];this.curves.push(new zo[s.type]().fromJSON(s))}return this}},ha=class extends ko{constructor(e){super(),this.type="Path",this.currentPoint=new ge,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,n=e.length;t<n;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){let n=new aa(this.currentPoint.clone(),new ge(e,t));return this.curves.push(n),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,n,s){let r=new oa(this.currentPoint.clone(),new ge(e,t),new ge(n,s));return this.curves.push(r),this.currentPoint.set(n,s),this}bezierCurveTo(e,t,n,s,r,a){let o=new ra(this.currentPoint.clone(),new ge(e,t),new ge(n,s),new ge(r,a));return this.curves.push(o),this.currentPoint.set(r,a),this}splineThru(e){let t=[this.currentPoint.clone()].concat(e),n=new ca(t);return this.curves.push(n),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,n,s,r,a){let o=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(e+o,t+l,n,s,r,a),this}absarc(e,t,n,s,r,a){return this.absellipse(e,t,n,n,s,r,a),this}ellipse(e,t,n,s,r,a,o,l){let c=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(e+c,t+h,n,s,r,a,o,l),this}absellipse(e,t,n,s,r,a,o,l){let c=new js(e,t,n,s,r,a,o,l);if(this.curves.length>0){let d=c.getPoint(0);d.equals(this.currentPoint)||this.lineTo(d.x,d.y)}this.curves.push(c);let h=c.getPoint(1);return this.currentPoint.copy(h),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){let e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}},Qs=class extends ha{constructor(e){super(e),this.uuid=gi(),this.type="Shape",this.holes=[]}getPointsHoles(e){let t=[];for(let n=0,s=this.holes.length;n<s;n++)t[n]=this.holes[n].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){let s=e.holes[t];this.holes.push(s.clone())}return this}toJSON(){let e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,n=this.holes.length;t<n;t++){let s=this.holes[t];e.holes.push(s.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){let s=e.holes[t];this.holes.push(new ha().fromJSON(s))}return this}};function Km(i,e,t=2){let n=e&&e.length,s=n?e[0]*t:i.length,r=mf(i,0,s,t,!0),a=[];if(!r||r.next===r.prev)return a;let o,l,c;if(n&&(r=ng(i,e,r,t)),i.length>80*t){o=1/0,l=1/0;let h=-1/0,d=-1/0;for(let m=t;m<s;m+=t){let u=i[m],f=i[m+1];u<o&&(o=u),f<l&&(l=f),u>h&&(h=u),f>d&&(d=f)}c=Math.max(h-o,d-l),c=c!==0?32767/c:0}return ua(r,a,t,o,l,c,0),a}function mf(i,e,t,n,s){let r;if(s===fg(i,e,t,n)>0)for(let a=e;a<t;a+=n)r=fd(a/n|0,i[a],i[a+1],r);else for(let a=t-n;a>=e;a-=n)r=fd(a/n|0,i[a],i[a+1],r);return r&&er(r,r.next)&&(fa(r),r=r.next),r}function os(i,e){if(!i)return i;e||(e=i);let t=i,n;do if(n=!1,!t.steiner&&(er(t,t.next)||wt(t.prev,t,t.next)===0)){if(fa(t),t=e=t.prev,t===t.next)break;n=!0}else t=t.next;while(n||t!==e);return e}function ua(i,e,t,n,s,r,a){if(!i)return;!a&&r&&og(i,n,s,r);let o=i;for(;i.prev!==i.next;){let l=i.prev,c=i.next;if(r?Qm(i,n,s,r):jm(i)){e.push(l.i,i.i,c.i),fa(i),i=c.next,o=c.next;continue}if(i=c,i===o){a?a===1?(i=eg(os(i),e),ua(i,e,t,n,s,r,2)):a===2&&tg(i,e,t,n,s,r):ua(os(i),e,t,n,s,r,1);break}}}function jm(i){let e=i.prev,t=i,n=i.next;if(wt(e,t,n)>=0)return!1;let s=e.x,r=t.x,a=n.x,o=e.y,l=t.y,c=n.y,h=Math.min(s,r,a),d=Math.min(o,l,c),m=Math.max(s,r,a),u=Math.max(o,l,c),f=n.next;for(;f!==e;){if(f.x>=h&&f.x<=m&&f.y>=d&&f.y<=u&&Dr(s,o,r,l,a,c,f.x,f.y)&&wt(f.prev,f,f.next)>=0)return!1;f=f.next}return!0}function Qm(i,e,t,n){let s=i.prev,r=i,a=i.next;if(wt(s,r,a)>=0)return!1;let o=s.x,l=r.x,c=a.x,h=s.y,d=r.y,m=a.y,u=Math.min(o,l,c),f=Math.min(h,d,m),y=Math.max(o,l,c),g=Math.max(h,d,m),p=ih(u,f,e,t,n),v=ih(y,g,e,t,n),_=i.prevZ,x=i.nextZ;for(;_&&_.z>=p&&x&&x.z<=v;){if(_.x>=u&&_.x<=y&&_.y>=f&&_.y<=g&&_!==s&&_!==a&&Dr(o,h,l,d,c,m,_.x,_.y)&&wt(_.prev,_,_.next)>=0||(_=_.prevZ,x.x>=u&&x.x<=y&&x.y>=f&&x.y<=g&&x!==s&&x!==a&&Dr(o,h,l,d,c,m,x.x,x.y)&&wt(x.prev,x,x.next)>=0))return!1;x=x.nextZ}for(;_&&_.z>=p;){if(_.x>=u&&_.x<=y&&_.y>=f&&_.y<=g&&_!==s&&_!==a&&Dr(o,h,l,d,c,m,_.x,_.y)&&wt(_.prev,_,_.next)>=0)return!1;_=_.prevZ}for(;x&&x.z<=v;){if(x.x>=u&&x.x<=y&&x.y>=f&&x.y<=g&&x!==s&&x!==a&&Dr(o,h,l,d,c,m,x.x,x.y)&&wt(x.prev,x,x.next)>=0)return!1;x=x.nextZ}return!0}function eg(i,e){let t=i;do{let n=t.prev,s=t.next.next;!er(n,s)&&yf(n,t,t.next,s)&&da(n,s)&&da(s,n)&&(e.push(n.i,t.i,s.i),fa(t),fa(t.next),t=i=s),t=t.next}while(t!==i);return os(t)}function tg(i,e,t,n,s,r){let a=i;do{let o=a.next.next;for(;o!==a.prev;){if(a.i!==o.i&&hg(a,o)){let l=xf(a,o);a=os(a,a.next),l=os(l,l.next),ua(a,e,t,n,s,r,0),ua(l,e,t,n,s,r,0);return}o=o.next}a=a.next}while(a!==i)}function ng(i,e,t,n){let s=[];for(let r=0,a=e.length;r<a;r++){let o=e[r]*n,l=r<a-1?e[r+1]*n:i.length,c=mf(i,o,l,n,!1);c===c.next&&(c.steiner=!0),s.push(cg(c))}s.sort(ig);for(let r=0;r<s.length;r++)t=sg(s[r],t);return t}function ig(i,e){let t=i.x-e.x;if(t===0&&(t=i.y-e.y,t===0)){let n=(i.next.y-i.y)/(i.next.x-i.x),s=(e.next.y-e.y)/(e.next.x-e.x);t=n-s}return t}function sg(i,e){let t=rg(i,e);if(!t)return e;let n=xf(t,i);return os(n,n.next),os(t,t.next)}function rg(i,e){let t=e,n=i.x,s=i.y,r=-1/0,a;if(er(i,t))return t;do{if(er(i,t.next))return t.next;if(s<=t.y&&s>=t.next.y&&t.next.y!==t.y){let d=t.x+(s-t.y)*(t.next.x-t.x)/(t.next.y-t.y);if(d<=n&&d>r&&(r=d,a=t.x<t.next.x?t:t.next,d===n))return a}t=t.next}while(t!==e);if(!a)return null;let o=a,l=a.x,c=a.y,h=1/0;t=a;do{if(n>=t.x&&t.x>=l&&n!==t.x&&gf(s<c?n:r,s,l,c,s<c?r:n,s,t.x,t.y)){let d=Math.abs(s-t.y)/(n-t.x);da(t,i)&&(d<h||d===h&&(t.x>a.x||t.x===a.x&&ag(a,t)))&&(a=t,h=d)}t=t.next}while(t!==o);return a}function ag(i,e){return wt(i.prev,i,e.prev)<0&&wt(e.next,i,i.next)<0}function og(i,e,t,n){let s=i;do s.z===0&&(s.z=ih(s.x,s.y,e,t,n)),s.prevZ=s.prev,s.nextZ=s.next,s=s.next;while(s!==i);s.prevZ.nextZ=null,s.prevZ=null,lg(s)}function lg(i){let e,t=1;do{let n=i,s;i=null;let r=null;for(e=0;n;){e++;let a=n,o=0;for(let c=0;c<t&&(o++,a=a.nextZ,!!a);c++);let l=t;for(;o>0||l>0&&a;)o!==0&&(l===0||!a||n.z<=a.z)?(s=n,n=n.nextZ,o--):(s=a,a=a.nextZ,l--),r?r.nextZ=s:i=s,s.prevZ=r,r=s;n=a}r.nextZ=null,t*=2}while(e>1);return i}function ih(i,e,t,n,s){return i=(i-t)*s|0,e=(e-n)*s|0,i=(i|i<<8)&16711935,i=(i|i<<4)&252645135,i=(i|i<<2)&858993459,i=(i|i<<1)&1431655765,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,i|e<<1}function cg(i){let e=i,t=i;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==i);return t}function gf(i,e,t,n,s,r,a,o){return(s-a)*(e-o)>=(i-a)*(r-o)&&(i-a)*(n-o)>=(t-a)*(e-o)&&(t-a)*(r-o)>=(s-a)*(n-o)}function Dr(i,e,t,n,s,r,a,o){return!(i===a&&e===o)&&gf(i,e,t,n,s,r,a,o)}function hg(i,e){return i.next.i!==e.i&&i.prev.i!==e.i&&!ug(i,e)&&(da(i,e)&&da(e,i)&&dg(i,e)&&(wt(i.prev,i,e.prev)||wt(i,e.prev,e))||er(i,e)&&wt(i.prev,i,i.next)>0&&wt(e.prev,e,e.next)>0)}function wt(i,e,t){return(e.y-i.y)*(t.x-e.x)-(e.x-i.x)*(t.y-e.y)}function er(i,e){return i.x===e.x&&i.y===e.y}function yf(i,e,t,n){let s=Mo(wt(i,e,t)),r=Mo(wt(i,e,n)),a=Mo(wt(t,n,i)),o=Mo(wt(t,n,e));return!!(s!==r&&a!==o||s===0&&vo(i,t,e)||r===0&&vo(i,n,e)||a===0&&vo(t,i,n)||o===0&&vo(t,e,n))}function vo(i,e,t){return e.x<=Math.max(i.x,t.x)&&e.x>=Math.min(i.x,t.x)&&e.y<=Math.max(i.y,t.y)&&e.y>=Math.min(i.y,t.y)}function Mo(i){return i>0?1:i<0?-1:0}function ug(i,e){let t=i;do{if(t.i!==i.i&&t.next.i!==i.i&&t.i!==e.i&&t.next.i!==e.i&&yf(t,t.next,i,e))return!0;t=t.next}while(t!==i);return!1}function da(i,e){return wt(i.prev,i,i.next)<0?wt(i,e,i.next)>=0&&wt(i,i.prev,e)>=0:wt(i,e,i.prev)<0||wt(i,i.next,e)<0}function dg(i,e){let t=i,n=!1,s=(i.x+e.x)/2,r=(i.y+e.y)/2;do t.y>r!=t.next.y>r&&t.next.y!==t.y&&s<(t.next.x-t.x)*(r-t.y)/(t.next.y-t.y)+t.x&&(n=!n),t=t.next;while(t!==i);return n}function xf(i,e){let t=sh(i.i,i.x,i.y),n=sh(e.i,e.x,e.y),s=i.next,r=e.prev;return i.next=e,e.prev=i,t.next=s,s.prev=t,n.next=t,t.prev=n,r.next=n,n.prev=r,n}function fd(i,e,t,n){let s=sh(i,e,t);return n?(s.next=n.next,s.prev=n,n.next.prev=s,n.next=s):(s.prev=s,s.next=s),s}function fa(i){i.next.prev=i.prev,i.prev.next=i.next,i.prevZ&&(i.prevZ.nextZ=i.nextZ),i.nextZ&&(i.nextZ.prevZ=i.prevZ)}function sh(i,e,t){return{i,x:e,y:t,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function fg(i,e,t,n){let s=0;for(let r=e,a=t-n;r<t;r+=n)s+=(i[a]-i[r])*(i[r+1]+i[a+1]),a=r;return s}var rh=class{static triangulate(e,t,n=2){return Km(e,t,n)}},ts=class i{static area(e){let t=e.length,n=0;for(let s=t-1,r=0;r<t;s=r++)n+=e[s].x*e[r].y-e[r].x*e[s].y;return n*.5}static isClockWise(e){return i.area(e)<0}static triangulateShape(e,t){let n=[],s=[],r=[];pd(e),md(n,e);let a=e.length;t.forEach(pd);for(let l=0;l<t.length;l++)s.push(a),a+=t[l].length,md(n,t[l]);let o=rh.triangulate(n,s);for(let l=0;l<o.length;l+=3)r.push(o.slice(l,l+3));return r}};function pd(i){let e=i.length;e>2&&i[e-1].equals(i[0])&&i.pop()}function md(i,e){for(let t=0;t<e.length;t++)i.push(e[t].x),i.push(e[t].y)}var pa=class i extends St{constructor(e=new Qs([new ge(.5,.5),new ge(-.5,.5),new ge(-.5,-.5),new ge(.5,-.5)]),t={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:e,options:t},e=Array.isArray(e)?e:[e];let n=this,s=[],r=[];for(let o=0,l=e.length;o<l;o++){let c=e[o];a(c)}this.setAttribute("position",new nt(s,3)),this.setAttribute("uv",new nt(r,2)),this.computeVertexNormals();function a(o){let l=[],c=t.curveSegments!==void 0?t.curveSegments:12,h=t.steps!==void 0?t.steps:1,d=t.depth!==void 0?t.depth:1,m=t.bevelEnabled!==void 0?t.bevelEnabled:!0,u=t.bevelThickness!==void 0?t.bevelThickness:.2,f=t.bevelSize!==void 0?t.bevelSize:u-.1,y=t.bevelOffset!==void 0?t.bevelOffset:0,g=t.bevelSegments!==void 0?t.bevelSegments:3,p=t.extrudePath,v=t.UVGenerator!==void 0?t.UVGenerator:pg,_,x=!1,T,A,C,P;p&&(_=p.getSpacedPoints(h),x=!0,m=!1,T=p.computeFrenetFrames(h,!1),A=new L,C=new L,P=new L),m||(g=0,u=0,f=0,y=0);let b=o.extractPoints(c),S=b.shape,I=b.holes;if(!ts.isClockWise(S)){S=S.reverse();for(let ne=0,K=I.length;ne<K;ne++){let J=I[ne];ts.isClockWise(J)&&(I[ne]=J.reverse())}}function V(ne){let J=10000000000000001e-36,Z=ne[0];for(let de=1;de<=ne.length;de++){let se=de%ne.length,fe=ne[se],Ge=fe.x-Z.x,He=fe.y-Z.y,w=Ge*Ge+He*He,M=Math.max(Math.abs(fe.x),Math.abs(fe.y),Math.abs(Z.x),Math.abs(Z.y)),B=J*M*M;if(w<=B){ne.splice(se,1),de--;continue}Z=fe}}V(S),I.forEach(V);let X=I.length,D=S;for(let ne=0;ne<X;ne++){let K=I[ne];S=S.concat(K)}function z(ne,K,J){return K||console.error("THREE.ExtrudeGeometry: vec does not exist"),ne.clone().addScaledVector(K,J)}let Y=S.length;function k(ne,K,J){let Z,de,se,fe=ne.x-K.x,Ge=ne.y-K.y,He=J.x-ne.x,w=J.y-ne.y,M=fe*fe+Ge*Ge,B=fe*w-Ge*He;if(Math.abs(B)>Number.EPSILON){let W=Math.sqrt(M),ee=Math.sqrt(He*He+w*w),q=K.x-Ge/W,Ie=K.y+fe/W,ue=J.x-w/ee,Ae=J.y+He/ee,Ce=((ue-q)*w-(Ae-Ie)*He)/(fe*w-Ge*He);Z=q+fe*Ce-ne.x,de=Ie+Ge*Ce-ne.y;let ae=Z*Z+de*de;if(ae<=2)return new ge(Z,de);se=Math.sqrt(ae/2)}else{let W=!1;fe>Number.EPSILON?He>Number.EPSILON&&(W=!0):fe<-Number.EPSILON?He<-Number.EPSILON&&(W=!0):Math.sign(Ge)===Math.sign(w)&&(W=!0),W?(Z=-Ge,de=fe,se=Math.sqrt(M)):(Z=fe,de=Ge,se=Math.sqrt(M/2))}return new ge(Z/se,de/se)}let re=[];for(let ne=0,K=D.length,J=K-1,Z=ne+1;ne<K;ne++,J++,Z++)J===K&&(J=0),Z===K&&(Z=0),re[ne]=k(D[ne],D[J],D[Z]);let te=[],ie,De=re.concat();for(let ne=0,K=X;ne<K;ne++){let J=I[ne];ie=[];for(let Z=0,de=J.length,se=de-1,fe=Z+1;Z<de;Z++,se++,fe++)se===de&&(se=0),fe===de&&(fe=0),ie[Z]=k(J[Z],J[se],J[fe]);te.push(ie),De=De.concat(ie)}let ke;if(g===0)ke=ts.triangulateShape(D,I);else{let ne=[],K=[];for(let J=0;J<g;J++){let Z=J/g,de=u*Math.cos(Z*Math.PI/2),se=f*Math.sin(Z*Math.PI/2)+y;for(let fe=0,Ge=D.length;fe<Ge;fe++){let He=z(D[fe],re[fe],se);Le(He.x,He.y,-de),Z===0&&ne.push(He)}for(let fe=0,Ge=X;fe<Ge;fe++){let He=I[fe];ie=te[fe];let w=[];for(let M=0,B=He.length;M<B;M++){let W=z(He[M],ie[M],se);Le(W.x,W.y,-de),Z===0&&w.push(W)}Z===0&&K.push(w)}}ke=ts.triangulateShape(ne,K)}let je=ke.length,Xe=f+y;for(let ne=0;ne<Y;ne++){let K=m?z(S[ne],De[ne],Xe):S[ne];x?(C.copy(T.normals[0]).multiplyScalar(K.x),A.copy(T.binormals[0]).multiplyScalar(K.y),P.copy(_[0]).add(C).add(A),Le(P.x,P.y,P.z)):Le(K.x,K.y,0)}for(let ne=1;ne<=h;ne++)for(let K=0;K<Y;K++){let J=m?z(S[K],De[K],Xe):S[K];x?(C.copy(T.normals[ne]).multiplyScalar(J.x),A.copy(T.binormals[ne]).multiplyScalar(J.y),P.copy(_[ne]).add(C).add(A),Le(P.x,P.y,P.z)):Le(J.x,J.y,d/h*ne)}for(let ne=g-1;ne>=0;ne--){let K=ne/g,J=u*Math.cos(K*Math.PI/2),Z=f*Math.sin(K*Math.PI/2)+y;for(let de=0,se=D.length;de<se;de++){let fe=z(D[de],re[de],Z);Le(fe.x,fe.y,d+J)}for(let de=0,se=I.length;de<se;de++){let fe=I[de];ie=te[de];for(let Ge=0,He=fe.length;Ge<He;Ge++){let w=z(fe[Ge],ie[Ge],Z);x?Le(w.x,w.y+_[h-1].y,_[h-1].x+J):Le(w.x,w.y,d+J)}}}$(),Q();function $(){let ne=s.length/3;if(m){let K=0,J=Y*K;for(let Z=0;Z<je;Z++){let de=ke[Z];Te(de[2]+J,de[1]+J,de[0]+J)}K=h+g*2,J=Y*K;for(let Z=0;Z<je;Z++){let de=ke[Z];Te(de[0]+J,de[1]+J,de[2]+J)}}else{for(let K=0;K<je;K++){let J=ke[K];Te(J[2],J[1],J[0])}for(let K=0;K<je;K++){let J=ke[K];Te(J[0]+Y*h,J[1]+Y*h,J[2]+Y*h)}}n.addGroup(ne,s.length/3-ne,0)}function Q(){let ne=s.length/3,K=0;Me(D,K),K+=D.length;for(let J=0,Z=I.length;J<Z;J++){let de=I[J];Me(de,K),K+=de.length}n.addGroup(ne,s.length/3-ne,1)}function Me(ne,K){let J=ne.length;for(;--J>=0;){let Z=J,de=J-1;de<0&&(de=ne.length-1);for(let se=0,fe=h+g*2;se<fe;se++){let Ge=Y*se,He=Y*(se+1),w=K+Z+Ge,M=K+de+Ge,B=K+de+He,W=K+Z+He;et(w,M,B,W)}}}function Le(ne,K,J){l.push(ne),l.push(K),l.push(J)}function Te(ne,K,J){pt(ne),pt(K),pt(J);let Z=s.length/3,de=v.generateTopUV(n,s,Z-3,Z-2,Z-1);R(de[0]),R(de[1]),R(de[2])}function et(ne,K,J,Z){pt(ne),pt(K),pt(Z),pt(K),pt(J),pt(Z);let de=s.length/3,se=v.generateSideWallUV(n,s,de-6,de-3,de-2,de-1);R(se[0]),R(se[1]),R(se[3]),R(se[1]),R(se[2]),R(se[3])}function pt(ne){s.push(l[ne*3+0]),s.push(l[ne*3+1]),s.push(l[ne*3+2])}function R(ne){r.push(ne.x),r.push(ne.y)}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON(),t=this.parameters.shapes,n=this.parameters.options;return mg(t,n,e)}static fromJSON(e,t){let n=[];for(let r=0,a=e.shapes.length;r<a;r++){let o=t[e.shapes[r]];n.push(o)}let s=e.options.extrudePath;return s!==void 0&&(e.options.extrudePath=new zo[s.type]().fromJSON(s)),new i(n,e.options)}},pg={generateTopUV:function(i,e,t,n,s){let r=e[t*3],a=e[t*3+1],o=e[n*3],l=e[n*3+1],c=e[s*3],h=e[s*3+1];return[new ge(r,a),new ge(o,l),new ge(c,h)]},generateSideWallUV:function(i,e,t,n,s,r){let a=e[t*3],o=e[t*3+1],l=e[t*3+2],c=e[n*3],h=e[n*3+1],d=e[n*3+2],m=e[s*3],u=e[s*3+1],f=e[s*3+2],y=e[r*3],g=e[r*3+1],p=e[r*3+2];return Math.abs(o-h)<Math.abs(a-c)?[new ge(a,1-l),new ge(c,1-d),new ge(m,1-f),new ge(y,1-p)]:[new ge(o,1-l),new ge(h,1-d),new ge(u,1-f),new ge(g,1-p)]}};function mg(i,e,t){if(t.shapes=[],Array.isArray(i))for(let n=0,s=i.length;n<s;n++){let r=i[n];t.shapes.push(r.uuid)}else t.shapes.push(i.uuid);return t.options=Object.assign({},e),e.extrudePath!==void 0&&(t.options.extrudePath=e.extrudePath.toJSON()),t}var li=class i extends Ks{constructor(e=1,t=0){let n=(1+Math.sqrt(5))/2,s=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],r=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(s,r,e,t),this.type="IcosahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new i(e.radius,e.detail)}};var Un=class i extends Ks{constructor(e=1,t=0){let n=[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],s=[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2];super(n,s,e,t),this.type="OctahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new i(e.radius,e.detail)}},ma=class i extends St{constructor(e=1,t=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:s};let r=e/2,a=t/2,o=Math.floor(n),l=Math.floor(s),c=o+1,h=l+1,d=e/o,m=t/l,u=[],f=[],y=[],g=[];for(let p=0;p<h;p++){let v=p*m-a;for(let _=0;_<c;_++){let x=_*d-r;f.push(x,-v,0),y.push(0,0,1),g.push(_/o),g.push(1-p/l)}}for(let p=0;p<l;p++)for(let v=0;v<o;v++){let _=v+c*p,x=v+c*(p+1),T=v+1+c*(p+1),A=v+1+c*p;u.push(_,x,A),u.push(x,T,A)}this.setIndex(u),this.setAttribute("position",new nt(f,3)),this.setAttribute("normal",new nt(y,3)),this.setAttribute("uv",new nt(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.width,e.height,e.widthSegments,e.heightSegments)}};var ci=class i extends St{constructor(e=1,t=32,n=16,s=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:s,phiLength:r,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));let l=Math.min(a+o,Math.PI),c=0,h=[],d=new L,m=new L,u=[],f=[],y=[],g=[];for(let p=0;p<=n;p++){let v=[],_=p/n,x=0;p===0&&a===0?x=.5/t:p===n&&l===Math.PI&&(x=-.5/t);for(let T=0;T<=t;T++){let A=T/t;d.x=-e*Math.cos(s+A*r)*Math.sin(a+_*o),d.y=e*Math.cos(a+_*o),d.z=e*Math.sin(s+A*r)*Math.sin(a+_*o),f.push(d.x,d.y,d.z),m.copy(d).normalize(),y.push(m.x,m.y,m.z),g.push(A+x,1-_),v.push(c++)}h.push(v)}for(let p=0;p<n;p++)for(let v=0;v<t;v++){let _=h[p][v+1],x=h[p][v],T=h[p+1][v],A=h[p+1][v+1];(p!==0||a>0)&&u.push(_,x,A),(p!==n-1||l<Math.PI)&&u.push(x,T,A)}this.setIndex(u),this.setAttribute("position",new nt(f,3)),this.setAttribute("normal",new nt(y,3)),this.setAttribute("uv",new nt(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}};var Nn=class i extends St{constructor(e=1,t=.4,n=12,s=48,r=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:s,arc:r},n=Math.floor(n),s=Math.floor(s);let a=[],o=[],l=[],c=[],h=new L,d=new L,m=new L;for(let u=0;u<=n;u++)for(let f=0;f<=s;f++){let y=f/s*r,g=u/n*Math.PI*2;d.x=(e+t*Math.cos(g))*Math.cos(y),d.y=(e+t*Math.cos(g))*Math.sin(y),d.z=t*Math.sin(g),o.push(d.x,d.y,d.z),h.x=e*Math.cos(y),h.y=e*Math.sin(y),m.subVectors(d,h).normalize(),l.push(m.x,m.y,m.z),c.push(f/s),c.push(u/n)}for(let u=1;u<=n;u++)for(let f=1;f<=s;f++){let y=(s+1)*u+f-1,g=(s+1)*(u-1)+f-1,p=(s+1)*(u-1)+f,v=(s+1)*u+f;a.push(y,g,v),a.push(g,p,v)}this.setIndex(a),this.setAttribute("position",new nt(o,3)),this.setAttribute("normal",new nt(l,3)),this.setAttribute("uv",new nt(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}};var ls=class i extends St{constructor(e=new la(new L(-1,-1,0),new L(-1,1,0),new L(1,1,0)),t=64,n=1,s=8,r=!1){super(),this.type="TubeGeometry",this.parameters={path:e,tubularSegments:t,radius:n,radialSegments:s,closed:r};let a=e.computeFrenetFrames(t,r);this.tangents=a.tangents,this.normals=a.normals,this.binormals=a.binormals;let o=new L,l=new L,c=new ge,h=new L,d=[],m=[],u=[],f=[];y(),this.setIndex(f),this.setAttribute("position",new nt(d,3)),this.setAttribute("normal",new nt(m,3)),this.setAttribute("uv",new nt(u,2));function y(){for(let _=0;_<t;_++)g(_);g(r===!1?t:0),v(),p()}function g(_){h=e.getPointAt(_/t,h);let x=a.normals[_],T=a.binormals[_];for(let A=0;A<=s;A++){let C=A/s*Math.PI*2,P=Math.sin(C),b=-Math.cos(C);l.x=b*x.x+P*T.x,l.y=b*x.y+P*T.y,l.z=b*x.z+P*T.z,l.normalize(),m.push(l.x,l.y,l.z),o.x=h.x+n*l.x,o.y=h.y+n*l.y,o.z=h.z+n*l.z,d.push(o.x,o.y,o.z)}}function p(){for(let _=1;_<=t;_++)for(let x=1;x<=s;x++){let T=(s+1)*(_-1)+(x-1),A=(s+1)*_+(x-1),C=(s+1)*_+x,P=(s+1)*(_-1)+x;f.push(T,A,P),f.push(A,C,P)}}function v(){for(let _=0;_<=t;_++)for(let x=0;x<=s;x++)c.x=_/t,c.y=x/s,u.push(c.x,c.y)}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON();return e.path=this.parameters.path.toJSON(),e}static fromJSON(e){return new i(new zo[e.path.type]().fromJSON(e.path),e.tubularSegments,e.radius,e.radialSegments,e.closed)}};var Rt=class extends Xn{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Ve(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ve(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Eh,this.normalScale=new ge(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new pn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}};var Ho=class extends Xn{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=ef,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},Vo=class extends Xn{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}};var tr=class extends ta{constructor(e){super(),this.isLineDashedMaterial=!0,this.type="LineDashedMaterial",this.scale=1,this.dashSize=3,this.gapSize=1,this.setValues(e)}copy(e){return super.copy(e),this.scale=e.scale,this.dashSize=e.dashSize,this.gapSize=e.gapSize,this}};function So(i,e){return!i||i.constructor===e?i:typeof e.BYTES_PER_ELEMENT=="number"?new e(i):Array.prototype.slice.call(i)}function gg(i){return ArrayBuffer.isView(i)&&!(i instanceof DataView)}function yg(i){function e(s,r){return i[s]-i[r]}let t=i.length,n=new Array(t);for(let s=0;s!==t;++s)n[s]=s;return n.sort(e),n}function gd(i,e,t){let n=i.length,s=new i.constructor(n);for(let r=0,a=0;a!==n;++r){let o=t[r]*e;for(let l=0;l!==e;++l)s[a++]=i[o+l]}return s}function _f(i,e,t,n){let s=1,r=i[0];for(;r!==void 0&&r[n]===void 0;)r=i[s++];if(r===void 0)return;let a=r[n];if(a!==void 0)if(Array.isArray(a))do a=r[n],a!==void 0&&(e.push(r.time),t.push(...a)),r=i[s++];while(r!==void 0);else if(a.toArray!==void 0)do a=r[n],a!==void 0&&(e.push(r.time),a.toArray(t,t.length)),r=i[s++];while(r!==void 0);else do a=r[n],a!==void 0&&(e.push(r.time),t.push(a)),r=i[s++];while(r!==void 0)}var cs=class{constructor(e,t,n,s){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,s=t[n],r=t[n-1];e:{t:{let a;n:{i:if(!(e<s)){for(let o=n+2;;){if(s===void 0){if(e<r)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===o)break;if(r=s,s=t[++n],e<s)break t}a=t.length;break n}if(!(e>=r)){let o=t[1];e<o&&(n=2,r=o);for(let l=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===l)break;if(s=r,r=t[--n-1],e>=r)break t}a=n,n=0;break n}break e}for(;n<a;){let o=n+a>>>1;e<t[o]?a=o:n=o+1}if(s=t[n],r=t[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,s)}return this.interpolate_(n,r,e,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=e*s;for(let a=0;a!==s;++a)t[a]=n[r+a];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}},Go=class extends cs{constructor(e,t,n,s){super(e,t,n,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Qi,endingEnd:Qi}}intervalChanged_(e,t,n){let s=this.parameterPositions,r=e-2,a=e+1,o=s[r],l=s[a];if(o===void 0)switch(this.getSettings_().endingStart){case es:r=e,o=2*t-n;break;case zr:r=s.length-2,o=t+s[r]-s[r+1];break;default:r=e,o=n}if(l===void 0)switch(this.getSettings_().endingEnd){case es:a=e,l=2*n-t;break;case zr:a=1,l=n+s[1]-s[0];break;default:a=e-1,l=t}let c=(n-t)*.5,h=this.valueSize;this._weightPrev=c/(t-o),this._weightNext=c/(l-n),this._offsetPrev=r*h,this._offsetNext=a*h}interpolate_(e,t,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,h=this._offsetPrev,d=this._offsetNext,m=this._weightPrev,u=this._weightNext,f=(n-t)/(s-t),y=f*f,g=y*f,p=-m*g+2*m*y-m*f,v=(1+m)*g+(-1.5-2*m)*y+(-.5+m)*f+1,_=(-1-u)*g+(1.5+u)*y+.5*f,x=u*g-u*y;for(let T=0;T!==o;++T)r[T]=p*a[h+T]+v*a[c+T]+_*a[l+T]+x*a[d+T];return r}},ga=class extends cs{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e,t,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,h=(n-t)/(s-t),d=1-h;for(let m=0;m!==o;++m)r[m]=a[c+m]*d+a[l+m]*h;return r}},Wo=class extends cs{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e){return this.copySampleValue_(e-1)}},cn=class{constructor(e,t,n,s){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=So(t,this.TimeBufferType),this.values=So(n,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:So(e.times,Array),values:So(e.values,Array)};let s=e.getInterpolation();s!==e.DefaultInterpolation&&(n.interpolation=s)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new Wo(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new ga(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new Go(this.times,this.values,this.getValueSize(),e)}setInterpolation(e){let t;switch(e){case Br:t=this.InterpolantFactoryMethodDiscrete;break;case Co:t=this.InterpolantFactoryMethodLinear;break;case bo:t=this.InterpolantFactoryMethodSmooth;break}if(t===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Br;case this.InterpolantFactoryMethodLinear:return Co;case this.InterpolantFactoryMethodSmooth:return bo}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,s=t.length;n!==s;++n)t[n]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,s=t.length;n!==s;++n)t[n]*=e}return this}trim(e,t){let n=this.times,s=n.length,r=0,a=s-1;for(;r!==s&&n[r]<e;)++r;for(;a!==-1&&n[a]>t;)--a;if(++a,r!==0||a!==s){r>=a&&(a=Math.max(a,1),r=a-1);let o=this.getValueSize();this.times=n.slice(r,a),this.values=this.values.slice(r*o,a*o)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),e=!1);let n=this.times,s=this.values,r=n.length;r===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),e=!1);let a=null;for(let o=0;o!==r;o++){let l=n[o];if(typeof l=="number"&&isNaN(l)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,o,l),e=!1;break}if(a!==null&&a>l){console.error("THREE.KeyframeTrack: Out of order keys.",this,o,l,a),e=!1;break}a=l}if(s!==void 0&&gg(s))for(let o=0,l=s.length;o!==l;++o){let c=s[o];if(isNaN(c)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,o,c),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),s=this.getInterpolation()===bo,r=e.length-1,a=1;for(let o=1;o<r;++o){let l=!1,c=e[o],h=e[o+1];if(c!==h&&(o!==1||c!==e[0]))if(s)l=!0;else{let d=o*n,m=d-n,u=d+n;for(let f=0;f!==n;++f){let y=t[d+f];if(y!==t[m+f]||y!==t[u+f]){l=!0;break}}}if(l){if(o!==a){e[a]=e[o];let d=o*n,m=a*n;for(let u=0;u!==n;++u)t[m+u]=t[d+u]}++a}}if(r>0){e[a]=e[r];for(let o=r*n,l=a*n,c=0;c!==n;++c)t[l+c]=t[o+c];++a}return a!==e.length?(this.times=e.slice(0,a),this.values=t.slice(0,a*n)):(this.times=e,this.values=t),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=this.constructor,s=new n(this.name,e,t);return s.createInterpolant=this.createInterpolant,s}};cn.prototype.ValueTypeName="";cn.prototype.TimeBufferType=Float32Array;cn.prototype.ValueBufferType=Float32Array;cn.prototype.DefaultInterpolation=Co;var hi=class extends cn{constructor(e,t,n){super(e,t,n)}};hi.prototype.ValueTypeName="bool";hi.prototype.ValueBufferType=Array;hi.prototype.DefaultInterpolation=Br;hi.prototype.InterpolantFactoryMethodLinear=void 0;hi.prototype.InterpolantFactoryMethodSmooth=void 0;var ya=class extends cn{constructor(e,t,n,s){super(e,t,n,s)}};ya.prototype.ValueTypeName="color";var hs=class extends cn{constructor(e,t,n,s){super(e,t,n,s)}};hs.prototype.ValueTypeName="number";var Xo=class extends cs{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e,t,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=(n-t)/(s-t),c=e*o;for(let h=c+o;c!==h;c+=4)en.slerpFlat(r,0,a,c-o,a,c,l);return r}},ui=class extends cn{constructor(e,t,n,s){super(e,t,n,s)}InterpolantFactoryMethodLinear(e){return new Xo(this.times,this.values,this.getValueSize(),e)}};ui.prototype.ValueTypeName="quaternion";ui.prototype.InterpolantFactoryMethodSmooth=void 0;var di=class extends cn{constructor(e,t,n){super(e,t,n)}};di.prototype.ValueTypeName="string";di.prototype.ValueBufferType=Array;di.prototype.DefaultInterpolation=Br;di.prototype.InterpolantFactoryMethodLinear=void 0;di.prototype.InterpolantFactoryMethodSmooth=void 0;var us=class extends cn{constructor(e,t,n,s){super(e,t,n,s)}};us.prototype.ValueTypeName="vector";var Fn=class{constructor(e="",t=-1,n=[],s=Xl){this.name=e,this.tracks=n,this.duration=t,this.blendMode=s,this.uuid=gi(),this.userData={},this.duration<0&&this.resetDuration()}static parse(e){let t=[],n=e.tracks,s=1/(e.fps||1);for(let a=0,o=n.length;a!==o;++a)t.push(_g(n[a]).scale(s));let r=new this(e.name,e.duration,t,e.blendMode);return r.uuid=e.uuid,r.userData=JSON.parse(e.userData||"{}"),r}static toJSON(e){let t=[],n=e.tracks,s={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode,userData:JSON.stringify(e.userData)};for(let r=0,a=n.length;r!==a;++r)t.push(cn.toJSON(n[r]));return s}static CreateFromMorphTargetSequence(e,t,n,s){let r=t.length,a=[];for(let o=0;o<r;o++){let l=[],c=[];l.push((o+r-1)%r,o,(o+1)%r),c.push(0,1,0);let h=yg(l);l=gd(l,1,h),c=gd(c,1,h),!s&&l[0]===0&&(l.push(r),c.push(c[0])),a.push(new hs(".morphTargetInfluences["+t[o].name+"]",l,c).scale(1/n))}return new this(e,-1,a)}static findByName(e,t){let n=e;if(!Array.isArray(e)){let s=e;n=s.geometry&&s.geometry.animations||s.animations}for(let s=0;s<n.length;s++)if(n[s].name===t)return n[s];return null}static CreateClipsFromMorphTargetSequences(e,t,n){let s={},r=/^([\w-]*?)([\d]+)$/;for(let o=0,l=e.length;o<l;o++){let c=e[o],h=c.name.match(r);if(h&&h.length>1){let d=h[1],m=s[d];m||(s[d]=m=[]),m.push(c)}}let a=[];for(let o in s)a.push(this.CreateFromMorphTargetSequence(o,s[o],t,n));return a}static parseAnimation(e,t){if(console.warn("THREE.AnimationClip: parseAnimation() is deprecated and will be removed with r185"),!e)return console.error("THREE.AnimationClip: No animation in JSONLoader data."),null;let n=function(d,m,u,f,y){if(u.length!==0){let g=[],p=[];_f(u,g,p,f),g.length!==0&&y.push(new d(m,g,p))}},s=[],r=e.name||"default",a=e.fps||30,o=e.blendMode,l=e.length||-1,c=e.hierarchy||[];for(let d=0;d<c.length;d++){let m=c[d].keys;if(!(!m||m.length===0))if(m[0].morphTargets){let u={},f;for(f=0;f<m.length;f++)if(m[f].morphTargets)for(let y=0;y<m[f].morphTargets.length;y++)u[m[f].morphTargets[y]]=-1;for(let y in u){let g=[],p=[];for(let v=0;v!==m[f].morphTargets.length;++v){let _=m[f];g.push(_.time),p.push(_.morphTarget===y?1:0)}s.push(new hs(".morphTargetInfluence["+y+"]",g,p))}l=u.length*a}else{let u=".bones["+t[d].name+"]";n(us,u+".position",m,"pos",s),n(ui,u+".quaternion",m,"rot",s),n(us,u+".scale",m,"scl",s)}}return s.length===0?null:new this(r,l,s,o)}resetDuration(){let e=this.tracks,t=0;for(let n=0,s=e.length;n!==s;++n){let r=this.tracks[n];t=Math.max(t,r.times[r.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){let e=[];for(let n=0;n<this.tracks.length;n++)e.push(this.tracks[n].clone());let t=new this.constructor(this.name,this.duration,e,this.blendMode);return t.userData=JSON.parse(JSON.stringify(this.userData)),t}toJSON(){return this.constructor.toJSON(this)}};function xg(i){switch(i.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return hs;case"vector":case"vector2":case"vector3":case"vector4":return us;case"color":return ya;case"quaternion":return ui;case"bool":case"boolean":return hi;case"string":return di}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+i)}function _g(i){if(i.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");let e=xg(i.type);if(i.times===void 0){let t=[],n=[];_f(i.keys,t,n,"value"),i.times=t,i.values=n}return e.parse!==void 0?e.parse(i):new e(i.name,i.times,i.values,i.interpolation)}var qo=class{constructor(e,t,n){let s=this,r=!1,a=0,o=0,l,c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this.abortController=new AbortController,this.itemStart=function(h){o++,r===!1&&s.onStart!==void 0&&s.onStart(h,a,o),r=!0},this.itemEnd=function(h){a++,s.onProgress!==void 0&&s.onProgress(h,a,o),a===o&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(h){s.onError!==void 0&&s.onError(h)},this.resolveURL=function(h){return l?l(h):h},this.setURLModifier=function(h){return l=h,this},this.addHandler=function(h,d){return c.push(h,d),this},this.removeHandler=function(h){let d=c.indexOf(h);return d!==-1&&c.splice(d,2),this},this.getHandler=function(h){for(let d=0,m=c.length;d<m;d+=2){let u=c[d],f=c[d+1];if(u.global&&(u.lastIndex=0),u.test(h))return f}return null},this.abort=function(){return this.abortController.abort(),this.abortController=new AbortController,this}}},vf=new qo,$o=class{constructor(e){this.manager=e!==void 0?e:vf,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){let n=this;return new Promise(function(s,r){n.load(e,s,t,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}};$o.DEFAULT_MATERIAL_NAME="__DEFAULT";var xa=class extends xt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Ve(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}},_a=class extends xa{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(xt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Ve(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}},jc=new Ye,yd=new L,xd=new L,ah=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new ge(512,512),this.mapType=On,this.map=null,this.mapPass=null,this.matrix=new Ye,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Pi,this._frameExtents=new ge(1,1),this._viewportCount=1,this._viewports=[new yt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera,n=this.matrix;yd.setFromMatrixPosition(e.matrixWorld),t.position.copy(yd),xd.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(xd),t.updateMatrixWorld(),jc.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(jc,t.coordinateSystem,t.reversedDepth),t.reversedDepth?n.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(jc)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}};var va=class extends qr{constructor(e=-1,t=1,n=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2,r=n-e,a=n+e,o=s+t,l=s-t;if(this.view!==null&&this.view.enabled){let c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,a=r+c*this.view.width,o-=h*this.view.offsetY,l=o-h*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},oh=class extends ah{constructor(){super(new va(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},Ma=class extends xa{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(xt.DEFAULT_UP),this.updateMatrix(),this.target=new xt,this.shadow=new oh}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}};var Yo=class extends $t{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}};var Zo=class{constructor(e,t,n){this.binding=e,this.valueSize=n;let s,r,a;switch(t){case"quaternion":s=this._slerp,r=this._slerpAdditive,a=this._setAdditiveIdentityQuaternion,this.buffer=new Float64Array(n*6),this._workIndex=5;break;case"string":case"bool":s=this._select,r=this._select,a=this._setAdditiveIdentityOther,this.buffer=new Array(n*5);break;default:s=this._lerp,r=this._lerpAdditive,a=this._setAdditiveIdentityNumeric,this.buffer=new Float64Array(n*5)}this._mixBufferRegion=s,this._mixBufferRegionAdditive=r,this._setIdentity=a,this._origIndex=3,this._addIndex=4,this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,this.useCount=0,this.referenceCount=0}accumulate(e,t){let n=this.buffer,s=this.valueSize,r=e*s+s,a=this.cumulativeWeight;if(a===0){for(let o=0;o!==s;++o)n[r+o]=n[o];a=t}else{a+=t;let o=t/a;this._mixBufferRegion(n,r,0,o,s)}this.cumulativeWeight=a}accumulateAdditive(e){let t=this.buffer,n=this.valueSize,s=n*this._addIndex;this.cumulativeWeightAdditive===0&&this._setIdentity(),this._mixBufferRegionAdditive(t,s,0,e,n),this.cumulativeWeightAdditive+=e}apply(e){let t=this.valueSize,n=this.buffer,s=e*t+t,r=this.cumulativeWeight,a=this.cumulativeWeightAdditive,o=this.binding;if(this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,r<1){let l=t*this._origIndex;this._mixBufferRegion(n,s,l,1-r,t)}a>0&&this._mixBufferRegionAdditive(n,s,this._addIndex*t,1,t);for(let l=t,c=t+t;l!==c;++l)if(n[l]!==n[l+t]){o.setValue(n,s);break}}saveOriginalState(){let e=this.binding,t=this.buffer,n=this.valueSize,s=n*this._origIndex;e.getValue(t,s);for(let r=n,a=s;r!==a;++r)t[r]=t[s+r%n];this._setIdentity(),this.cumulativeWeight=0,this.cumulativeWeightAdditive=0}restoreOriginalState(){let e=this.valueSize*3;this.binding.setValue(this.buffer,e)}_setAdditiveIdentityNumeric(){let e=this._addIndex*this.valueSize,t=e+this.valueSize;for(let n=e;n<t;n++)this.buffer[n]=0}_setAdditiveIdentityQuaternion(){this._setAdditiveIdentityNumeric(),this.buffer[this._addIndex*this.valueSize+3]=1}_setAdditiveIdentityOther(){let e=this._origIndex*this.valueSize,t=this._addIndex*this.valueSize;for(let n=0;n<this.valueSize;n++)this.buffer[t+n]=this.buffer[e+n]}_select(e,t,n,s,r){if(s>=.5)for(let a=0;a!==r;++a)e[t+a]=e[n+a]}_slerp(e,t,n,s){en.slerpFlat(e,t,e,t,e,n,s)}_slerpAdditive(e,t,n,s,r){let a=this._workIndex*r;en.multiplyQuaternionsFlat(e,a,e,t,e,n),en.slerpFlat(e,t,e,t,e,a,s)}_lerp(e,t,n,s,r){let a=1-s;for(let o=0;o!==r;++o){let l=t+o;e[l]=e[l]*a+e[n+o]*s}}_lerpAdditive(e,t,n,s,r){for(let a=0;a!==r;++a){let o=t+a;e[o]=e[o]+e[n+a]*s}}},Ph="\\[\\]\\.:\\/",vg=new RegExp("["+Ph+"]","g"),Lh="[^"+Ph+"]",Mg="[^"+Ph.replace("\\.","")+"]",Sg=/((?:WC+[\/:])*)/.source.replace("WC",Lh),bg=/(WCOD+)?/.source.replace("WCOD",Mg),Eg=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Lh),wg=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Lh),Tg=new RegExp("^"+Sg+bg+Eg+wg+"$"),Ag=["material","materials","bones","map"],lh=class{constructor(e,t,n){let s=n||gt.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,s)}getValue(e,t){this.bind();let n=this._targetGroup.nCachedObjects_,s=this._bindings[n];s!==void 0&&s.getValue(e,t)}setValue(e,t){let n=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=n.length;s!==r;++s)n[s].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}},gt=class i{constructor(e,t,n){this.path=t,this.parsedPath=n||i.parseTrackName(t),this.node=i.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new i.Composite(e,t,n):new i(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(vg,"")}static parseTrackName(e){let t=Tg.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},s=n.nodeName&&n.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){let r=n.nodeName.substring(s+1);Ag.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,s),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(r){for(let a=0;a<r.length;a++){let o=r[a];if(o.name===t||o.uuid===t)return o;let l=n(o.children);if(l)return l}return null},s=n(e.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)e[t++]=n[s]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node,t=this.parsedPath,n=t.objectName,s=t.propertyName,r=t.propertyIndex;if(e||(e=i.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let c=t.objectIndex;switch(n){case"materials":if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let h=0;h<e.length;h++)if(e[h].name===c){c=h;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(c!==void 0){if(e[c]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[c]}}let a=e[s];if(a===void 0){let c=t.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+c+"."+s+" but it wasn't found.",e);return}let o=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?o=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!e.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[r]!==void 0&&(r=e.morphTargetDictionary[r])}l=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=r}else a.fromArray!==void 0&&a.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(l=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=s;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};gt.Composite=lh;gt.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};gt.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};gt.prototype.GetterByBindingType=[gt.prototype._getValue_direct,gt.prototype._getValue_array,gt.prototype._getValue_arrayElement,gt.prototype._getValue_toArray];gt.prototype.SetterByBindingTypeAndVersioning=[[gt.prototype._setValue_direct,gt.prototype._setValue_direct_setNeedsUpdate,gt.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[gt.prototype._setValue_array,gt.prototype._setValue_array_setNeedsUpdate,gt.prototype._setValue_array_setMatrixWorldNeedsUpdate],[gt.prototype._setValue_arrayElement,gt.prototype._setValue_arrayElement_setNeedsUpdate,gt.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[gt.prototype._setValue_fromArray,gt.prototype._setValue_fromArray_setNeedsUpdate,gt.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var Jo=class{constructor(e,t,n=null,s=t.blendMode){this._mixer=e,this._clip=t,this._localRoot=n,this.blendMode=s;let r=t.tracks,a=r.length,o=new Array(a),l={endingStart:Qi,endingEnd:Qi};for(let c=0;c!==a;++c){let h=r[c].createInterpolant(null);o[c]=h,h.settings=l}this._interpolantSettings=l,this._interpolants=o,this._propertyBindings=new Array(a),this._cacheIndex=null,this._byClipCacheIndex=null,this._timeScaleInterpolant=null,this._weightInterpolant=null,this.loop=Kd,this._loopCount=-1,this._startTime=null,this.time=0,this.timeScale=1,this._effectiveTimeScale=1,this.weight=1,this._effectiveWeight=1,this.repetitions=1/0,this.paused=!1,this.enabled=!0,this.clampWhenFinished=!1,this.zeroSlopeAtStart=!0,this.zeroSlopeAtEnd=!0}play(){return this._mixer._activateAction(this),this}stop(){return this._mixer._deactivateAction(this),this.reset()}reset(){return this.paused=!1,this.enabled=!0,this.time=0,this._loopCount=-1,this._startTime=null,this.stopFading().stopWarping()}isRunning(){return this.enabled&&!this.paused&&this.timeScale!==0&&this._startTime===null&&this._mixer._isActiveAction(this)}isScheduled(){return this._mixer._isActiveAction(this)}startAt(e){return this._startTime=e,this}setLoop(e,t){return this.loop=e,this.repetitions=t,this}setEffectiveWeight(e){return this.weight=e,this._effectiveWeight=this.enabled?e:0,this.stopFading()}getEffectiveWeight(){return this._effectiveWeight}fadeIn(e){return this._scheduleFading(e,0,1)}fadeOut(e){return this._scheduleFading(e,1,0)}crossFadeFrom(e,t,n=!1){if(e.fadeOut(t),this.fadeIn(t),n===!0){let s=this._clip.duration,r=e._clip.duration,a=r/s,o=s/r;e.warp(1,a,t),this.warp(o,1,t)}return this}crossFadeTo(e,t,n=!1){return e.crossFadeFrom(this,t,n)}stopFading(){let e=this._weightInterpolant;return e!==null&&(this._weightInterpolant=null,this._mixer._takeBackControlInterpolant(e)),this}setEffectiveTimeScale(e){return this.timeScale=e,this._effectiveTimeScale=this.paused?0:e,this.stopWarping()}getEffectiveTimeScale(){return this._effectiveTimeScale}setDuration(e){return this.timeScale=this._clip.duration/e,this.stopWarping()}syncWith(e){return this.time=e.time,this.timeScale=e.timeScale,this.stopWarping()}halt(e){return this.warp(this._effectiveTimeScale,0,e)}warp(e,t,n){let s=this._mixer,r=s.time,a=this.timeScale,o=this._timeScaleInterpolant;o===null&&(o=s._lendControlInterpolant(),this._timeScaleInterpolant=o);let l=o.parameterPositions,c=o.sampleValues;return l[0]=r,l[1]=r+n,c[0]=e/a,c[1]=t/a,this}stopWarping(){let e=this._timeScaleInterpolant;return e!==null&&(this._timeScaleInterpolant=null,this._mixer._takeBackControlInterpolant(e)),this}getMixer(){return this._mixer}getClip(){return this._clip}getRoot(){return this._localRoot||this._mixer._root}_update(e,t,n,s){if(!this.enabled){this._updateWeight(e);return}let r=this._startTime;if(r!==null){let l=(e-r)*n;l<0||n===0?t=0:(this._startTime=null,t=n*l)}t*=this._updateTimeScale(e);let a=this._updateTime(t),o=this._updateWeight(e);if(o>0){let l=this._interpolants,c=this._propertyBindings;switch(this.blendMode){case Qd:for(let h=0,d=l.length;h!==d;++h)l[h].evaluate(a),c[h].accumulateAdditive(o);break;case Xl:default:for(let h=0,d=l.length;h!==d;++h)l[h].evaluate(a),c[h].accumulate(s,o)}}}_updateWeight(e){let t=0;if(this.enabled){t=this.weight;let n=this._weightInterpolant;if(n!==null){let s=n.evaluate(e)[0];t*=s,e>n.parameterPositions[1]&&(this.stopFading(),s===0&&(this.enabled=!1))}}return this._effectiveWeight=t,t}_updateTimeScale(e){let t=0;if(!this.paused){t=this.timeScale;let n=this._timeScaleInterpolant;if(n!==null){let s=n.evaluate(e)[0];t*=s,e>n.parameterPositions[1]&&(this.stopWarping(),t===0?this.paused=!0:this.timeScale=t)}}return this._effectiveTimeScale=t,t}_updateTime(e){let t=this._clip.duration,n=this.loop,s=this.time+e,r=this._loopCount,a=n===jd;if(e===0)return r===-1?s:a&&(r&1)===1?t-s:s;if(n===Wl){r===-1&&(this._loopCount=0,this._setEndings(!0,!0,!1));e:{if(s>=t)s=t;else if(s<0)s=0;else{this.time=s;break e}this.clampWhenFinished?this.paused=!0:this.enabled=!1,this.time=s,this._mixer.dispatchEvent({type:"finished",action:this,direction:e<0?-1:1})}}else{if(r===-1&&(e>=0?(r=0,this._setEndings(!0,this.repetitions===0,a)):this._setEndings(this.repetitions===0,!0,a)),s>=t||s<0){let o=Math.floor(s/t);s-=t*o,r+=Math.abs(o);let l=this.repetitions-r;if(l<=0)this.clampWhenFinished?this.paused=!0:this.enabled=!1,s=e>0?t:0,this.time=s,this._mixer.dispatchEvent({type:"finished",action:this,direction:e>0?1:-1});else{if(l===1){let c=e<0;this._setEndings(c,!c,a)}else this._setEndings(!1,!1,a);this._loopCount=r,this.time=s,this._mixer.dispatchEvent({type:"loop",action:this,loopDelta:o})}}else this.time=s;if(a&&(r&1)===1)return t-s}return s}_setEndings(e,t,n){let s=this._interpolantSettings;n?(s.endingStart=es,s.endingEnd=es):(e?s.endingStart=this.zeroSlopeAtStart?es:Qi:s.endingStart=zr,t?s.endingEnd=this.zeroSlopeAtEnd?es:Qi:s.endingEnd=zr)}_scheduleFading(e,t,n){let s=this._mixer,r=s.time,a=this._weightInterpolant;a===null&&(a=s._lendControlInterpolant(),this._weightInterpolant=a);let o=a.parameterPositions,l=a.sampleValues;return o[0]=r,l[0]=t,o[1]=r+e,l[1]=n,this}},Cg=new Float32Array(1),Sa=class extends Vn{constructor(e){super(),this._root=e,this._initMemoryManager(),this._accuIndex=0,this.time=0,this.timeScale=1}_bindAction(e,t){let n=e._localRoot||this._root,s=e._clip.tracks,r=s.length,a=e._propertyBindings,o=e._interpolants,l=n.uuid,c=this._bindingsByRootAndName,h=c[l];h===void 0&&(h={},c[l]=h);for(let d=0;d!==r;++d){let m=s[d],u=m.name,f=h[u];if(f!==void 0)++f.referenceCount,a[d]=f;else{if(f=a[d],f!==void 0){f._cacheIndex===null&&(++f.referenceCount,this._addInactiveBinding(f,l,u));continue}let y=t&&t._propertyBindings[d].binding.parsedPath;f=new Zo(gt.create(n,u,y),m.ValueTypeName,m.getValueSize()),++f.referenceCount,this._addInactiveBinding(f,l,u),a[d]=f}o[d].resultBuffer=f.buffer}}_activateAction(e){if(!this._isActiveAction(e)){if(e._cacheIndex===null){let n=(e._localRoot||this._root).uuid,s=e._clip.uuid,r=this._actionsByClip[s];this._bindAction(e,r&&r.knownActions[0]),this._addInactiveAction(e,s,n)}let t=e._propertyBindings;for(let n=0,s=t.length;n!==s;++n){let r=t[n];r.useCount++===0&&(this._lendBinding(r),r.saveOriginalState())}this._lendAction(e)}}_deactivateAction(e){if(this._isActiveAction(e)){let t=e._propertyBindings;for(let n=0,s=t.length;n!==s;++n){let r=t[n];--r.useCount===0&&(r.restoreOriginalState(),this._takeBackBinding(r))}this._takeBackAction(e)}}_initMemoryManager(){this._actions=[],this._nActiveActions=0,this._actionsByClip={},this._bindings=[],this._nActiveBindings=0,this._bindingsByRootAndName={},this._controlInterpolants=[],this._nActiveControlInterpolants=0;let e=this;this.stats={actions:{get total(){return e._actions.length},get inUse(){return e._nActiveActions}},bindings:{get total(){return e._bindings.length},get inUse(){return e._nActiveBindings}},controlInterpolants:{get total(){return e._controlInterpolants.length},get inUse(){return e._nActiveControlInterpolants}}}}_isActiveAction(e){let t=e._cacheIndex;return t!==null&&t<this._nActiveActions}_addInactiveAction(e,t,n){let s=this._actions,r=this._actionsByClip,a=r[t];if(a===void 0)a={knownActions:[e],actionByRoot:{}},e._byClipCacheIndex=0,r[t]=a;else{let o=a.knownActions;e._byClipCacheIndex=o.length,o.push(e)}e._cacheIndex=s.length,s.push(e),a.actionByRoot[n]=e}_removeInactiveAction(e){let t=this._actions,n=t[t.length-1],s=e._cacheIndex;n._cacheIndex=s,t[s]=n,t.pop(),e._cacheIndex=null;let r=e._clip.uuid,a=this._actionsByClip,o=a[r],l=o.knownActions,c=l[l.length-1],h=e._byClipCacheIndex;c._byClipCacheIndex=h,l[h]=c,l.pop(),e._byClipCacheIndex=null;let d=o.actionByRoot,m=(e._localRoot||this._root).uuid;delete d[m],l.length===0&&delete a[r],this._removeInactiveBindingsForAction(e)}_removeInactiveBindingsForAction(e){let t=e._propertyBindings;for(let n=0,s=t.length;n!==s;++n){let r=t[n];--r.referenceCount===0&&this._removeInactiveBinding(r)}}_lendAction(e){let t=this._actions,n=e._cacheIndex,s=this._nActiveActions++,r=t[s];e._cacheIndex=s,t[s]=e,r._cacheIndex=n,t[n]=r}_takeBackAction(e){let t=this._actions,n=e._cacheIndex,s=--this._nActiveActions,r=t[s];e._cacheIndex=s,t[s]=e,r._cacheIndex=n,t[n]=r}_addInactiveBinding(e,t,n){let s=this._bindingsByRootAndName,r=this._bindings,a=s[t];a===void 0&&(a={},s[t]=a),a[n]=e,e._cacheIndex=r.length,r.push(e)}_removeInactiveBinding(e){let t=this._bindings,n=e.binding,s=n.rootNode.uuid,r=n.path,a=this._bindingsByRootAndName,o=a[s],l=t[t.length-1],c=e._cacheIndex;l._cacheIndex=c,t[c]=l,t.pop(),delete o[r],Object.keys(o).length===0&&delete a[s]}_lendBinding(e){let t=this._bindings,n=e._cacheIndex,s=this._nActiveBindings++,r=t[s];e._cacheIndex=s,t[s]=e,r._cacheIndex=n,t[n]=r}_takeBackBinding(e){let t=this._bindings,n=e._cacheIndex,s=--this._nActiveBindings,r=t[s];e._cacheIndex=s,t[s]=e,r._cacheIndex=n,t[n]=r}_lendControlInterpolant(){let e=this._controlInterpolants,t=this._nActiveControlInterpolants++,n=e[t];return n===void 0&&(n=new ga(new Float32Array(2),new Float32Array(2),1,Cg),n.__cacheIndex=t,e[t]=n),n}_takeBackControlInterpolant(e){let t=this._controlInterpolants,n=e.__cacheIndex,s=--this._nActiveControlInterpolants,r=t[s];e.__cacheIndex=s,t[s]=e,r.__cacheIndex=n,t[n]=r}clipAction(e,t,n){let s=t||this._root,r=s.uuid,a=typeof e=="string"?Fn.findByName(s,e):e,o=a!==null?a.uuid:e,l=this._actionsByClip[o],c=null;if(n===void 0&&(a!==null?n=a.blendMode:n=Xl),l!==void 0){let d=l.actionByRoot[r];if(d!==void 0&&d.blendMode===n)return d;c=l.knownActions[0],a===null&&(a=c._clip)}if(a===null)return null;let h=new Jo(this,a,t,n);return this._bindAction(h,c),this._addInactiveAction(h,o,r),h}existingAction(e,t){let n=t||this._root,s=n.uuid,r=typeof e=="string"?Fn.findByName(n,e):e,a=r?r.uuid:e,o=this._actionsByClip[a];return o!==void 0&&o.actionByRoot[s]||null}stopAllAction(){let e=this._actions,t=this._nActiveActions;for(let n=t-1;n>=0;--n)e[n].stop();return this}update(e){e*=this.timeScale;let t=this._actions,n=this._nActiveActions,s=this.time+=e,r=Math.sign(e),a=this._accuIndex^=1;for(let c=0;c!==n;++c)t[c]._update(s,e,r,a);let o=this._bindings,l=this._nActiveBindings;for(let c=0;c!==l;++c)o[c].apply(a);return this}setTime(e){this.time=0;for(let t=0;t<this._actions.length;t++)this._actions[t].time=0;return this.update(e)}getRoot(){return this._root}uncacheClip(e){let t=this._actions,n=e.uuid,s=this._actionsByClip,r=s[n];if(r!==void 0){let a=r.knownActions;for(let o=0,l=a.length;o!==l;++o){let c=a[o];this._deactivateAction(c);let h=c._cacheIndex,d=t[t.length-1];c._cacheIndex=null,c._byClipCacheIndex=null,d._cacheIndex=h,t[h]=d,t.pop(),this._removeInactiveBindingsForAction(c)}delete s[n]}}uncacheRoot(e){let t=e.uuid,n=this._actionsByClip;for(let a in n){let o=n[a].actionByRoot,l=o[t];l!==void 0&&(this._deactivateAction(l),this._removeInactiveAction(l))}let s=this._bindingsByRootAndName,r=s[t];if(r!==void 0)for(let a in r){let o=r[a];o.restoreOriginalState(),this._removeInactiveBinding(o)}}uncacheAction(e,t){let n=this.existingAction(e,t);n!==null&&(this._deactivateAction(n),this._removeInactiveAction(n))}};var _d=new Ye,ds=class{constructor(e,t,n=0,s=1/0){this.ray=new Wn(e,t),this.near=n,this.far=s,this.camera=null,this.layers=new $s,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):console.error("THREE.Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return _d.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(_d),this}intersectObject(e,t=!0,n=[]){return ch(e,this,n,t),n.sort(vd),n}intersectObjects(e,t=!0,n=[]){for(let s=0,r=e.length;s<r;s++)ch(e[s],this,n,t);return n.sort(vd),n}};function vd(i,e){return i.distance-e.distance}function ch(i,e,t,n){let s=!0;if(i.layers.test(e.layers)&&i.raycast(e,t)===!1&&(s=!1),s===!0&&n===!0){let r=i.children;for(let a=0,o=r.length;a<o;a++)ch(r[a],e,t,!0)}}function Dh(i,e,t,n){let s=Rg(n);switch(t){case Mh:return i*e;case dl:return i*e/s.components*s.byteLength;case fl:return i*e/s.components*s.byteLength;case bh:return i*e*2/s.components*s.byteLength;case pl:return i*e*2/s.components*s.byteLength;case Sh:return i*e*3/s.components*s.byteLength;case _n:return i*e*4/s.components*s.byteLength;case ml:return i*e*4/s.components*s.byteLength;case wa:case Ta:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case Aa:case Ca:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case yl:case _l:return Math.max(i,16)*Math.max(e,8)/4;case gl:case xl:return Math.max(i,8)*Math.max(e,8)/2;case vl:case Ml:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case Sl:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case bl:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case El:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case wl:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case Tl:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case Al:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case Cl:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case Rl:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case Il:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case Pl:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case Ll:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case Dl:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case Ul:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case Nl:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case Fl:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case Ol:case Bl:case zl:return Math.ceil(i/4)*Math.ceil(e/4)*16;case kl:case Hl:return Math.ceil(i/4)*Math.ceil(e/4)*8;case Vl:case Gl:return Math.ceil(i/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function Rg(i){switch(i){case On:case yh:return{byteLength:1,components:1};case nr:case xh:case ir:return{byteLength:2,components:1};case hl:case ul:return{byteLength:2,components:4};case Ui:case cl:case wn:return{byteLength:4,components:1};case _h:case vh:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"180"}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="180");function Wf(){let i=null,e=!1,t=null,n=null;function s(r,a){t(r,a),n=i.requestAnimationFrame(s)}return{start:function(){e!==!0&&t!==null&&(n=i.requestAnimationFrame(s),e=!0)},stop:function(){i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){i=r}}}function Pg(i){let e=new WeakMap;function t(o,l){let c=o.array,h=o.usage,d=c.byteLength,m=i.createBuffer();i.bindBuffer(l,m),i.bufferData(l,c,h),o.onUploadCallback();let u;if(c instanceof Float32Array)u=i.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)u=i.HALF_FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?u=i.HALF_FLOAT:u=i.UNSIGNED_SHORT;else if(c instanceof Int16Array)u=i.SHORT;else if(c instanceof Uint32Array)u=i.UNSIGNED_INT;else if(c instanceof Int32Array)u=i.INT;else if(c instanceof Int8Array)u=i.BYTE;else if(c instanceof Uint8Array)u=i.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)u=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:m,type:u,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:d}}function n(o,l,c){let h=l.array,d=l.updateRanges;if(i.bindBuffer(c,o),d.length===0)i.bufferSubData(c,0,h);else{d.sort((u,f)=>u.start-f.start);let m=0;for(let u=1;u<d.length;u++){let f=d[m],y=d[u];y.start<=f.start+f.count+1?f.count=Math.max(f.count,y.start+y.count-f.start):(++m,d[m]=y)}d.length=m+1;for(let u=0,f=d.length;u<f;u++){let y=d[u];i.bufferSubData(c,y.start*h.BYTES_PER_ELEMENT,h,y.start,y.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);let l=e.get(o);l&&(i.deleteBuffer(l.buffer),e.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){let h=e.get(o);(!h||h.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}let c=e.get(o);if(c===void 0)e.set(o,t(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,o,l),c.version=o.version}}return{get:s,remove:r,update:a}}var Lg=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Dg=`#ifdef USE_ALPHAHASH
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
#endif`,Ug=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Ng=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Fg=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Og=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Bg=`#ifdef USE_AOMAP
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
#endif`,zg=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,kg=`#ifdef USE_BATCHING
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
#endif`,Hg=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Vg=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Gg=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Wg=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Xg=`#ifdef USE_IRIDESCENCE
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
#endif`,qg=`#ifdef USE_BUMPMAP
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
#endif`,$g=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Yg=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Zg=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Jg=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Kg=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,jg=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Qg=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,e0=`#if defined( USE_COLOR_ALPHA )
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
#endif`,t0=`#define PI 3.141592653589793
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
} // validated`,n0=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,i0=`vec3 transformedNormal = objectNormal;
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
#endif`,s0=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,r0=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,a0=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,o0=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,l0="gl_FragColor = linearToOutputTexel( gl_FragColor );",c0=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,h0=`#ifdef USE_ENVMAP
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
#endif`,u0=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,d0=`#ifdef USE_ENVMAP
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
#endif`,f0=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,p0=`#ifdef USE_ENVMAP
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
#endif`,m0=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,g0=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,y0=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,x0=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,_0=`#ifdef USE_GRADIENTMAP
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
}`,v0=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,M0=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,S0=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,b0=`uniform bool receiveShadow;
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
#endif`,E0=`#ifdef USE_ENVMAP
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
#endif`,w0=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,T0=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,A0=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,C0=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,R0=`PhysicalMaterial material;
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
#endif`,I0=`struct PhysicalMaterial {
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
}`,P0=`
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
#endif`,L0=`#if defined( RE_IndirectDiffuse )
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
#endif`,D0=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,U0=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,N0=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,F0=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,O0=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,B0=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,z0=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,k0=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,H0=`#if defined( USE_POINTS_UV )
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
#endif`,V0=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,G0=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,W0=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,X0=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,q0=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,$0=`#ifdef USE_MORPHTARGETS
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
#endif`,Y0=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Z0=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,J0=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,K0=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,j0=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Q0=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,ey=`#ifdef USE_NORMALMAP
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
#endif`,ty=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,ny=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,iy=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,sy=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,ry=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,ay=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,oy=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,ly=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,cy=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,hy=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,uy=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,dy=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,fy=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,py=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,my=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,gy=`float getShadowMask() {
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
}`,yy=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,xy=`#ifdef USE_SKINNING
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
#endif`,_y=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,vy=`#ifdef USE_SKINNING
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
#endif`,My=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Sy=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,by=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Ey=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,wy=`#ifdef USE_TRANSMISSION
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
#endif`,Ty=`#ifdef USE_TRANSMISSION
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
#endif`,Ay=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Cy=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Ry=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Iy=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,Py=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Ly=`uniform sampler2D t2D;
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
}`,Dy=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Uy=`#ifdef ENVMAP_TYPE_CUBE
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
}`,Ny=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Fy=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Oy=`#include <common>
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
}`,By=`#if DEPTH_PACKING == 3200
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
}`,zy=`#define DISTANCE
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
}`,ky=`#define DISTANCE
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
}`,Hy=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Vy=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Gy=`uniform float scale;
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
}`,Wy=`uniform vec3 diffuse;
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
}`,Xy=`#include <common>
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
}`,qy=`uniform vec3 diffuse;
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
}`,$y=`#define LAMBERT
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
}`,Yy=`#define LAMBERT
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
}`,Zy=`#define MATCAP
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
}`,Jy=`#define MATCAP
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
}`,Ky=`#define NORMAL
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
}`,jy=`#define NORMAL
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
}`,Qy=`#define PHONG
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
}`,ex=`#define PHONG
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
}`,tx=`#define STANDARD
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
}`,nx=`#define STANDARD
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
}`,ix=`#define TOON
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
}`,sx=`#define TOON
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
}`,rx=`uniform float size;
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
}`,ax=`uniform vec3 diffuse;
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
}`,ox=`#include <common>
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
}`,lx=`uniform vec3 color;
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
}`,cx=`uniform float rotation;
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
}`,hx=`uniform vec3 diffuse;
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
}`,Ze={alphahash_fragment:Lg,alphahash_pars_fragment:Dg,alphamap_fragment:Ug,alphamap_pars_fragment:Ng,alphatest_fragment:Fg,alphatest_pars_fragment:Og,aomap_fragment:Bg,aomap_pars_fragment:zg,batching_pars_vertex:kg,batching_vertex:Hg,begin_vertex:Vg,beginnormal_vertex:Gg,bsdfs:Wg,iridescence_fragment:Xg,bumpmap_pars_fragment:qg,clipping_planes_fragment:$g,clipping_planes_pars_fragment:Yg,clipping_planes_pars_vertex:Zg,clipping_planes_vertex:Jg,color_fragment:Kg,color_pars_fragment:jg,color_pars_vertex:Qg,color_vertex:e0,common:t0,cube_uv_reflection_fragment:n0,defaultnormal_vertex:i0,displacementmap_pars_vertex:s0,displacementmap_vertex:r0,emissivemap_fragment:a0,emissivemap_pars_fragment:o0,colorspace_fragment:l0,colorspace_pars_fragment:c0,envmap_fragment:h0,envmap_common_pars_fragment:u0,envmap_pars_fragment:d0,envmap_pars_vertex:f0,envmap_physical_pars_fragment:E0,envmap_vertex:p0,fog_vertex:m0,fog_pars_vertex:g0,fog_fragment:y0,fog_pars_fragment:x0,gradientmap_pars_fragment:_0,lightmap_pars_fragment:v0,lights_lambert_fragment:M0,lights_lambert_pars_fragment:S0,lights_pars_begin:b0,lights_toon_fragment:w0,lights_toon_pars_fragment:T0,lights_phong_fragment:A0,lights_phong_pars_fragment:C0,lights_physical_fragment:R0,lights_physical_pars_fragment:I0,lights_fragment_begin:P0,lights_fragment_maps:L0,lights_fragment_end:D0,logdepthbuf_fragment:U0,logdepthbuf_pars_fragment:N0,logdepthbuf_pars_vertex:F0,logdepthbuf_vertex:O0,map_fragment:B0,map_pars_fragment:z0,map_particle_fragment:k0,map_particle_pars_fragment:H0,metalnessmap_fragment:V0,metalnessmap_pars_fragment:G0,morphinstance_vertex:W0,morphcolor_vertex:X0,morphnormal_vertex:q0,morphtarget_pars_vertex:$0,morphtarget_vertex:Y0,normal_fragment_begin:Z0,normal_fragment_maps:J0,normal_pars_fragment:K0,normal_pars_vertex:j0,normal_vertex:Q0,normalmap_pars_fragment:ey,clearcoat_normal_fragment_begin:ty,clearcoat_normal_fragment_maps:ny,clearcoat_pars_fragment:iy,iridescence_pars_fragment:sy,opaque_fragment:ry,packing:ay,premultiplied_alpha_fragment:oy,project_vertex:ly,dithering_fragment:cy,dithering_pars_fragment:hy,roughnessmap_fragment:uy,roughnessmap_pars_fragment:dy,shadowmap_pars_fragment:fy,shadowmap_pars_vertex:py,shadowmap_vertex:my,shadowmask_pars_fragment:gy,skinbase_vertex:yy,skinning_pars_vertex:xy,skinning_vertex:_y,skinnormal_vertex:vy,specularmap_fragment:My,specularmap_pars_fragment:Sy,tonemapping_fragment:by,tonemapping_pars_fragment:Ey,transmission_fragment:wy,transmission_pars_fragment:Ty,uv_pars_fragment:Ay,uv_pars_vertex:Cy,uv_vertex:Ry,worldpos_vertex:Iy,background_vert:Py,background_frag:Ly,backgroundCube_vert:Dy,backgroundCube_frag:Uy,cube_vert:Ny,cube_frag:Fy,depth_vert:Oy,depth_frag:By,distanceRGBA_vert:zy,distanceRGBA_frag:ky,equirect_vert:Hy,equirect_frag:Vy,linedashed_vert:Gy,linedashed_frag:Wy,meshbasic_vert:Xy,meshbasic_frag:qy,meshlambert_vert:$y,meshlambert_frag:Yy,meshmatcap_vert:Zy,meshmatcap_frag:Jy,meshnormal_vert:Ky,meshnormal_frag:jy,meshphong_vert:Qy,meshphong_frag:ex,meshphysical_vert:tx,meshphysical_frag:nx,meshtoon_vert:ix,meshtoon_frag:sx,points_vert:rx,points_frag:ax,shadow_vert:ox,shadow_frag:lx,sprite_vert:cx,sprite_frag:hx},ye={common:{diffuse:{value:new Ve(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new qe},alphaMap:{value:null},alphaMapTransform:{value:new qe},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new qe}},envmap:{envMap:{value:null},envMapRotation:{value:new qe},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new qe}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new qe}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new qe},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new qe},normalScale:{value:new ge(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new qe},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new qe}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new qe}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new qe}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ve(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Ve(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new qe},alphaTest:{value:0},uvTransform:{value:new qe}},sprite:{diffuse:{value:new Ve(16777215)},opacity:{value:1},center:{value:new ge(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new qe},alphaMap:{value:null},alphaMapTransform:{value:new qe},alphaTest:{value:0}}},Yn={basic:{uniforms:Yt([ye.common,ye.specularmap,ye.envmap,ye.aomap,ye.lightmap,ye.fog]),vertexShader:Ze.meshbasic_vert,fragmentShader:Ze.meshbasic_frag},lambert:{uniforms:Yt([ye.common,ye.specularmap,ye.envmap,ye.aomap,ye.lightmap,ye.emissivemap,ye.bumpmap,ye.normalmap,ye.displacementmap,ye.fog,ye.lights,{emissive:{value:new Ve(0)}}]),vertexShader:Ze.meshlambert_vert,fragmentShader:Ze.meshlambert_frag},phong:{uniforms:Yt([ye.common,ye.specularmap,ye.envmap,ye.aomap,ye.lightmap,ye.emissivemap,ye.bumpmap,ye.normalmap,ye.displacementmap,ye.fog,ye.lights,{emissive:{value:new Ve(0)},specular:{value:new Ve(1118481)},shininess:{value:30}}]),vertexShader:Ze.meshphong_vert,fragmentShader:Ze.meshphong_frag},standard:{uniforms:Yt([ye.common,ye.envmap,ye.aomap,ye.lightmap,ye.emissivemap,ye.bumpmap,ye.normalmap,ye.displacementmap,ye.roughnessmap,ye.metalnessmap,ye.fog,ye.lights,{emissive:{value:new Ve(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ze.meshphysical_vert,fragmentShader:Ze.meshphysical_frag},toon:{uniforms:Yt([ye.common,ye.aomap,ye.lightmap,ye.emissivemap,ye.bumpmap,ye.normalmap,ye.displacementmap,ye.gradientmap,ye.fog,ye.lights,{emissive:{value:new Ve(0)}}]),vertexShader:Ze.meshtoon_vert,fragmentShader:Ze.meshtoon_frag},matcap:{uniforms:Yt([ye.common,ye.bumpmap,ye.normalmap,ye.displacementmap,ye.fog,{matcap:{value:null}}]),vertexShader:Ze.meshmatcap_vert,fragmentShader:Ze.meshmatcap_frag},points:{uniforms:Yt([ye.points,ye.fog]),vertexShader:Ze.points_vert,fragmentShader:Ze.points_frag},dashed:{uniforms:Yt([ye.common,ye.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ze.linedashed_vert,fragmentShader:Ze.linedashed_frag},depth:{uniforms:Yt([ye.common,ye.displacementmap]),vertexShader:Ze.depth_vert,fragmentShader:Ze.depth_frag},normal:{uniforms:Yt([ye.common,ye.bumpmap,ye.normalmap,ye.displacementmap,{opacity:{value:1}}]),vertexShader:Ze.meshnormal_vert,fragmentShader:Ze.meshnormal_frag},sprite:{uniforms:Yt([ye.sprite,ye.fog]),vertexShader:Ze.sprite_vert,fragmentShader:Ze.sprite_frag},background:{uniforms:{uvTransform:{value:new qe},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ze.background_vert,fragmentShader:Ze.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new qe}},vertexShader:Ze.backgroundCube_vert,fragmentShader:Ze.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ze.cube_vert,fragmentShader:Ze.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ze.equirect_vert,fragmentShader:Ze.equirect_frag},distanceRGBA:{uniforms:Yt([ye.common,ye.displacementmap,{referencePosition:{value:new L},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ze.distanceRGBA_vert,fragmentShader:Ze.distanceRGBA_frag},shadow:{uniforms:Yt([ye.lights,ye.fog,{color:{value:new Ve(0)},opacity:{value:1}}]),vertexShader:Ze.shadow_vert,fragmentShader:Ze.shadow_frag}};Yn.physical={uniforms:Yt([Yn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new qe},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new qe},clearcoatNormalScale:{value:new ge(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new qe},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new qe},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new qe},sheen:{value:0},sheenColor:{value:new Ve(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new qe},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new qe},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new qe},transmissionSamplerSize:{value:new ge},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new qe},attenuationDistance:{value:0},attenuationColor:{value:new Ve(0)},specularColor:{value:new Ve(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new qe},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new qe},anisotropyVector:{value:new ge},anisotropyMap:{value:null},anisotropyMapTransform:{value:new qe}}]),vertexShader:Ze.meshphysical_vert,fragmentShader:Ze.meshphysical_frag};var ql={r:0,b:0,g:0},gs=new pn,ux=new Ye;function dx(i,e,t,n,s,r,a){let o=new Ve(0),l=r===!0?0:1,c,h,d=null,m=0,u=null;function f(_){let x=_.isScene===!0?_.background:null;return x&&x.isTexture&&(x=(_.backgroundBlurriness>0?t:e).get(x)),x}function y(_){let x=!1,T=f(_);T===null?p(o,l):T&&T.isColor&&(p(T,1),x=!0);let A=i.xr.getEnvironmentBlendMode();A==="additive"?n.buffers.color.setClear(0,0,0,1,a):A==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,a),(i.autoClear||x)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function g(_,x){let T=f(x);T&&(T.isCubeTexture||T.mapping===ba)?(h===void 0&&(h=new dt(new Dt(1,1,1),new gn({name:"BackgroundCubeMaterial",uniforms:ms(Yn.backgroundCube.uniforms),vertexShader:Yn.backgroundCube.vertexShader,fragmentShader:Yn.backgroundCube.fragmentShader,side:Gt,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(A,C,P){this.matrixWorld.copyPosition(P.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(h)),gs.copy(x.backgroundRotation),gs.x*=-1,gs.y*=-1,gs.z*=-1,T.isCubeTexture&&T.isRenderTargetTexture===!1&&(gs.y*=-1,gs.z*=-1),h.material.uniforms.envMap.value=T,h.material.uniforms.flipEnvMap.value=T.isCubeTexture&&T.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=x.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=x.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(ux.makeRotationFromEuler(gs)),h.material.toneMapped=it.getTransfer(T.colorSpace)!==ot,(d!==T||m!==T.version||u!==i.toneMapping)&&(h.material.needsUpdate=!0,d=T,m=T.version,u=i.toneMapping),h.layers.enableAll(),_.unshift(h,h.geometry,h.material,0,0,null)):T&&T.isTexture&&(c===void 0&&(c=new dt(new ma(2,2),new gn({name:"BackgroundMaterial",uniforms:ms(Yn.background.uniforms),vertexShader:Yn.background.vertexShader,fragmentShader:Yn.background.fragmentShader,side:ai,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(c)),c.material.uniforms.t2D.value=T,c.material.uniforms.backgroundIntensity.value=x.backgroundIntensity,c.material.toneMapped=it.getTransfer(T.colorSpace)!==ot,T.matrixAutoUpdate===!0&&T.updateMatrix(),c.material.uniforms.uvTransform.value.copy(T.matrix),(d!==T||m!==T.version||u!==i.toneMapping)&&(c.material.needsUpdate=!0,d=T,m=T.version,u=i.toneMapping),c.layers.enableAll(),_.unshift(c,c.geometry,c.material,0,0,null))}function p(_,x){_.getRGB(ql,Rh(i)),n.buffers.color.setClear(ql.r,ql.g,ql.b,x,a)}function v(){h!==void 0&&(h.geometry.dispose(),h.material.dispose(),h=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return o},setClearColor:function(_,x=1){o.set(_),l=x,p(o,l)},getClearAlpha:function(){return l},setClearAlpha:function(_){l=_,p(o,l)},render:y,addToRenderList:g,dispose:v}}function fx(i,e){let t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=m(null),r=s,a=!1;function o(S,I,F,V,X){let D=!1,z=d(V,F,I);r!==z&&(r=z,c(r.object)),D=u(S,V,F,X),D&&f(S,V,F,X),X!==null&&e.update(X,i.ELEMENT_ARRAY_BUFFER),(D||a)&&(a=!1,x(S,I,F,V),X!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(X).buffer))}function l(){return i.createVertexArray()}function c(S){return i.bindVertexArray(S)}function h(S){return i.deleteVertexArray(S)}function d(S,I,F){let V=F.wireframe===!0,X=n[S.id];X===void 0&&(X={},n[S.id]=X);let D=X[I.id];D===void 0&&(D={},X[I.id]=D);let z=D[V];return z===void 0&&(z=m(l()),D[V]=z),z}function m(S){let I=[],F=[],V=[];for(let X=0;X<t;X++)I[X]=0,F[X]=0,V[X]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:I,enabledAttributes:F,attributeDivisors:V,object:S,attributes:{},index:null}}function u(S,I,F,V){let X=r.attributes,D=I.attributes,z=0,Y=F.getAttributes();for(let k in Y)if(Y[k].location>=0){let te=X[k],ie=D[k];if(ie===void 0&&(k==="instanceMatrix"&&S.instanceMatrix&&(ie=S.instanceMatrix),k==="instanceColor"&&S.instanceColor&&(ie=S.instanceColor)),te===void 0||te.attribute!==ie||ie&&te.data!==ie.data)return!0;z++}return r.attributesNum!==z||r.index!==V}function f(S,I,F,V){let X={},D=I.attributes,z=0,Y=F.getAttributes();for(let k in Y)if(Y[k].location>=0){let te=D[k];te===void 0&&(k==="instanceMatrix"&&S.instanceMatrix&&(te=S.instanceMatrix),k==="instanceColor"&&S.instanceColor&&(te=S.instanceColor));let ie={};ie.attribute=te,te&&te.data&&(ie.data=te.data),X[k]=ie,z++}r.attributes=X,r.attributesNum=z,r.index=V}function y(){let S=r.newAttributes;for(let I=0,F=S.length;I<F;I++)S[I]=0}function g(S){p(S,0)}function p(S,I){let F=r.newAttributes,V=r.enabledAttributes,X=r.attributeDivisors;F[S]=1,V[S]===0&&(i.enableVertexAttribArray(S),V[S]=1),X[S]!==I&&(i.vertexAttribDivisor(S,I),X[S]=I)}function v(){let S=r.newAttributes,I=r.enabledAttributes;for(let F=0,V=I.length;F<V;F++)I[F]!==S[F]&&(i.disableVertexAttribArray(F),I[F]=0)}function _(S,I,F,V,X,D,z){z===!0?i.vertexAttribIPointer(S,I,F,X,D):i.vertexAttribPointer(S,I,F,V,X,D)}function x(S,I,F,V){y();let X=V.attributes,D=F.getAttributes(),z=I.defaultAttributeValues;for(let Y in D){let k=D[Y];if(k.location>=0){let re=X[Y];if(re===void 0&&(Y==="instanceMatrix"&&S.instanceMatrix&&(re=S.instanceMatrix),Y==="instanceColor"&&S.instanceColor&&(re=S.instanceColor)),re!==void 0){let te=re.normalized,ie=re.itemSize,De=e.get(re);if(De===void 0)continue;let ke=De.buffer,je=De.type,Xe=De.bytesPerElement,$=je===i.INT||je===i.UNSIGNED_INT||re.gpuType===cl;if(re.isInterleavedBufferAttribute){let Q=re.data,Me=Q.stride,Le=re.offset;if(Q.isInstancedInterleavedBuffer){for(let Te=0;Te<k.locationSize;Te++)p(k.location+Te,Q.meshPerAttribute);S.isInstancedMesh!==!0&&V._maxInstanceCount===void 0&&(V._maxInstanceCount=Q.meshPerAttribute*Q.count)}else for(let Te=0;Te<k.locationSize;Te++)g(k.location+Te);i.bindBuffer(i.ARRAY_BUFFER,ke);for(let Te=0;Te<k.locationSize;Te++)_(k.location+Te,ie/k.locationSize,je,te,Me*Xe,(Le+ie/k.locationSize*Te)*Xe,$)}else{if(re.isInstancedBufferAttribute){for(let Q=0;Q<k.locationSize;Q++)p(k.location+Q,re.meshPerAttribute);S.isInstancedMesh!==!0&&V._maxInstanceCount===void 0&&(V._maxInstanceCount=re.meshPerAttribute*re.count)}else for(let Q=0;Q<k.locationSize;Q++)g(k.location+Q);i.bindBuffer(i.ARRAY_BUFFER,ke);for(let Q=0;Q<k.locationSize;Q++)_(k.location+Q,ie/k.locationSize,je,te,ie*Xe,ie/k.locationSize*Q*Xe,$)}}else if(z!==void 0){let te=z[Y];if(te!==void 0)switch(te.length){case 2:i.vertexAttrib2fv(k.location,te);break;case 3:i.vertexAttrib3fv(k.location,te);break;case 4:i.vertexAttrib4fv(k.location,te);break;default:i.vertexAttrib1fv(k.location,te)}}}}v()}function T(){P();for(let S in n){let I=n[S];for(let F in I){let V=I[F];for(let X in V)h(V[X].object),delete V[X];delete I[F]}delete n[S]}}function A(S){if(n[S.id]===void 0)return;let I=n[S.id];for(let F in I){let V=I[F];for(let X in V)h(V[X].object),delete V[X];delete I[F]}delete n[S.id]}function C(S){for(let I in n){let F=n[I];if(F[S.id]===void 0)continue;let V=F[S.id];for(let X in V)h(V[X].object),delete V[X];delete F[S.id]}}function P(){b(),a=!0,r!==s&&(r=s,c(r.object))}function b(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:P,resetDefaultState:b,dispose:T,releaseStatesOfGeometry:A,releaseStatesOfProgram:C,initAttributes:y,enableAttribute:g,disableUnusedAttributes:v}}function px(i,e,t){let n;function s(c){n=c}function r(c,h){i.drawArrays(n,c,h),t.update(h,n,1)}function a(c,h,d){d!==0&&(i.drawArraysInstanced(n,c,h,d),t.update(h,n,d))}function o(c,h,d){if(d===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,h,0,d);let u=0;for(let f=0;f<d;f++)u+=h[f];t.update(u,n,1)}function l(c,h,d,m){if(d===0)return;let u=e.get("WEBGL_multi_draw");if(u===null)for(let f=0;f<c.length;f++)a(c[f],h[f],m[f]);else{u.multiDrawArraysInstancedWEBGL(n,c,0,h,0,m,0,d);let f=0;for(let y=0;y<d;y++)f+=h[y]*m[y];t.update(f,n,1)}}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=o,this.renderMultiDrawInstances=l}function mx(i,e,t,n){let s;function r(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){let C=e.get("EXT_texture_filter_anisotropic");s=i.getParameter(C.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(C){return!(C!==_n&&n.convert(C)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(C){let P=C===ir&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(C!==On&&n.convert(C)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&C!==wn&&!P)}function l(C){if(C==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";C="mediump"}return C==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp",h=l(c);h!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);let d=t.logarithmicDepthBuffer===!0,m=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control"),u=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),f=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),y=i.getParameter(i.MAX_TEXTURE_SIZE),g=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),p=i.getParameter(i.MAX_VERTEX_ATTRIBS),v=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),_=i.getParameter(i.MAX_VARYING_VECTORS),x=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),T=f>0,A=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:d,reversedDepthBuffer:m,maxTextures:u,maxVertexTextures:f,maxTextureSize:y,maxCubemapSize:g,maxAttributes:p,maxVertexUniforms:v,maxVaryings:_,maxFragmentUniforms:x,vertexTextures:T,maxSamples:A}}function gx(i){let e=this,t=null,n=0,s=!1,r=!1,a=new Hn,o=new qe,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(d,m){let u=d.length!==0||m||n!==0||s;return s=m,n=d.length,u},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(d,m){t=h(d,m,0)},this.setState=function(d,m,u){let f=d.clippingPlanes,y=d.clipIntersection,g=d.clipShadows,p=i.get(d);if(!s||f===null||f.length===0||r&&!g)r?h(null):c();else{let v=r?0:n,_=v*4,x=p.clippingState||null;l.value=x,x=h(f,m,_,u);for(let T=0;T!==_;++T)x[T]=t[T];p.clippingState=x,this.numIntersection=y?this.numPlanes:0,this.numPlanes+=v}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function h(d,m,u,f){let y=d!==null?d.length:0,g=null;if(y!==0){if(g=l.value,f!==!0||g===null){let p=u+y*4,v=m.matrixWorldInverse;o.getNormalMatrix(v),(g===null||g.length<p)&&(g=new Float32Array(p));for(let _=0,x=u;_!==y;++_,x+=4)a.copy(d[_]).applyMatrix4(v,o),a.normal.toArray(g,x),g[x+3]=a.constant}l.value=g,l.needsUpdate=!0}return e.numPlanes=y,e.numIntersection=0,g}}function yx(i){let e=new WeakMap;function t(a,o){return o===al?a.mapping=fs:o===ol&&(a.mapping=ps),a}function n(a){if(a&&a.isTexture){let o=a.mapping;if(o===al||o===ol)if(e.has(a)){let l=e.get(a).texture;return t(l,a.mapping)}else{let l=a.image;if(l&&l.height>0){let c=new Do(l.height);return c.fromEquirectangularTexture(i,a),e.set(a,c),a.addEventListener("dispose",s),t(c.texture,a.mapping)}else return null}}return a}function s(a){let o=a.target;o.removeEventListener("dispose",s);let l=e.get(o);l!==void 0&&(e.delete(o),l.dispose())}function r(){e=new WeakMap}return{get:n,dispose:r}}var lr=4,Mf=[.125,.215,.35,.446,.526,.582],_s=20,Uh=new va,Sf=new Ve,Nh=null,Fh=0,Oh=0,Bh=!1,xs=(1+Math.sqrt(5))/2,or=1/xs,bf=[new L(-xs,or,0),new L(xs,or,0),new L(-or,0,xs),new L(or,0,xs),new L(0,xs,-or),new L(0,xs,or),new L(-1,1,-1),new L(1,1,-1),new L(-1,1,1),new L(1,1,1)],xx=new L,Zl=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,s=100,r={}){let{size:a=256,position:o=xx}=r;Nh=this._renderer.getRenderTarget(),Fh=this._renderer.getActiveCubeFace(),Oh=this._renderer.getActiveMipmapLevel(),Bh=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);let l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,n,s,l,o),t>0&&this._blur(l,0,0,t),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Tf(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=wf(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(Nh,Fh,Oh),this._renderer.xr.enabled=Bh,e.scissorTest=!1,$l(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===fs||e.mapping===ps?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Nh=this._renderer.getRenderTarget(),Fh=this._renderer.getActiveCubeFace(),Oh=this._renderer.getActiveMipmapLevel(),Bh=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:Pn,minFilter:Pn,generateMipmaps:!1,type:ir,format:_n,colorSpace:ss,depthBuffer:!1},s=Ef(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Ef(e,t,n);let{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=_x(r)),this._blurMaterial=vx(r,e,t)}return s}_compileMaterial(e){let t=new dt(this._lodPlanes[0],e);this._renderer.compile(t,Uh)}_sceneToCubeUV(e,t,n,s,r){let l=new $t(90,1,t,n),c=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],d=this._renderer,m=d.autoClear,u=d.toneMapping;d.getClearColor(Sf),d.toneMapping=pi,d.autoClear=!1,d.state.buffers.depth.getReversed()&&(d.setRenderTarget(s),d.clearDepth(),d.setRenderTarget(null));let y=new mn({name:"PMREM.Background",side:Gt,depthWrite:!1,depthTest:!1}),g=new dt(new Dt,y),p=!1,v=e.background;v?v.isColor&&(y.color.copy(v),e.background=null,p=!0):(y.color.copy(Sf),p=!0);for(let _=0;_<6;_++){let x=_%3;x===0?(l.up.set(0,c[_],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x+h[_],r.y,r.z)):x===1?(l.up.set(0,0,c[_]),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y+h[_],r.z)):(l.up.set(0,c[_],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y,r.z+h[_]));let T=this._cubeSize;$l(s,x*T,_>2?T:0,T,T),d.setRenderTarget(s),p&&d.render(g,l),d.render(e,l)}g.geometry.dispose(),g.material.dispose(),d.toneMapping=u,d.autoClear=m,e.background=v}_textureToCubeUV(e,t){let n=this._renderer,s=e.mapping===fs||e.mapping===ps;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Tf()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=wf());let r=s?this._cubemapMaterial:this._equirectMaterial,a=new dt(this._lodPlanes[0],r),o=r.uniforms;o.envMap.value=e;let l=this._cubeSize;$l(t,0,0,3*l,2*l),n.setRenderTarget(t),n.render(a,Uh)}_applyPMREM(e){let t=this._renderer,n=t.autoClear;t.autoClear=!1;let s=this._lodPlanes.length;for(let r=1;r<s;r++){let a=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),o=bf[(s-r-1)%bf.length];this._blur(e,r-1,r,a,o)}t.autoClear=n}_blur(e,t,n,s,r){let a=this._pingPongRenderTarget;this._halfBlur(e,a,t,n,s,"latitudinal",r),this._halfBlur(a,e,n,n,s,"longitudinal",r)}_halfBlur(e,t,n,s,r,a,o){let l=this._renderer,c=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");let h=3,d=new dt(this._lodPlanes[s],c),m=c.uniforms,u=this._sizeLods[n]-1,f=isFinite(r)?Math.PI/(2*u):2*Math.PI/(2*_s-1),y=r/f,g=isFinite(r)?1+Math.floor(h*y):_s;g>_s&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${g} samples when the maximum is set to ${_s}`);let p=[],v=0;for(let C=0;C<_s;++C){let P=C/y,b=Math.exp(-P*P/2);p.push(b),C===0?v+=b:C<g&&(v+=2*b)}for(let C=0;C<p.length;C++)p[C]=p[C]/v;m.envMap.value=e.texture,m.samples.value=g,m.weights.value=p,m.latitudinal.value=a==="latitudinal",o&&(m.poleAxis.value=o);let{_lodMax:_}=this;m.dTheta.value=f,m.mipInt.value=_-n;let x=this._sizeLods[s],T=3*x*(s>_-lr?s-_+lr:0),A=4*(this._cubeSize-x);$l(t,T,A,3*x,2*x),l.setRenderTarget(t),l.render(d,Uh)}};function _x(i){let e=[],t=[],n=[],s=i,r=i-lr+1+Mf.length;for(let a=0;a<r;a++){let o=Math.pow(2,s);t.push(o);let l=1/o;a>i-lr?l=Mf[a-i+lr-1]:a===0&&(l=0),n.push(l);let c=1/(o-2),h=-c,d=1+c,m=[h,h,d,h,d,d,h,h,d,d,h,d],u=6,f=6,y=3,g=2,p=1,v=new Float32Array(y*f*u),_=new Float32Array(g*f*u),x=new Float32Array(p*f*u);for(let A=0;A<u;A++){let C=A%3*2/3-1,P=A>2?0:-1,b=[C,P,0,C+2/3,P,0,C+2/3,P+1,0,C,P,0,C+2/3,P+1,0,C,P+1,0];v.set(b,y*f*A),_.set(m,g*f*A);let S=[A,A,A,A,A,A];x.set(S,p*f*A)}let T=new St;T.setAttribute("position",new Ct(v,y)),T.setAttribute("uv",new Ct(_,g)),T.setAttribute("faceIndex",new Ct(x,p)),e.push(T),s>lr&&s--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function Ef(i,e,t){let n=new Gn(i,e,t);return n.texture.mapping=ba,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function $l(i,e,t,n,s){i.viewport.set(e,t,n,s),i.scissor.set(e,t,n,s)}function vx(i,e,t){let n=new Float32Array(_s),s=new L(0,1,0);return new gn({name:"SphericalGaussianBlur",defines:{n:_s,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:Yh(),fragmentShader:`

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
		`,blending:fi,depthTest:!1,depthWrite:!1})}function wf(){return new gn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Yh(),fragmentShader:`

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
		`,blending:fi,depthTest:!1,depthWrite:!1})}function Tf(){return new gn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Yh(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:fi,depthTest:!1,depthWrite:!1})}function Yh(){return`

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
	`}function Mx(i){let e=new WeakMap,t=null;function n(o){if(o&&o.isTexture){let l=o.mapping,c=l===al||l===ol,h=l===fs||l===ps;if(c||h){let d=e.get(o),m=d!==void 0?d.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==m)return t===null&&(t=new Zl(i)),d=c?t.fromEquirectangular(o,d):t.fromCubemap(o,d),d.texture.pmremVersion=o.pmremVersion,e.set(o,d),d.texture;if(d!==void 0)return d.texture;{let u=o.image;return c&&u&&u.height>0||h&&u&&s(u)?(t===null&&(t=new Zl(i)),d=c?t.fromEquirectangular(o):t.fromCubemap(o),d.texture.pmremVersion=o.pmremVersion,e.set(o,d),o.addEventListener("dispose",r),d.texture):null}}}return o}function s(o){let l=0,c=6;for(let h=0;h<c;h++)o[h]!==void 0&&l++;return l===c}function r(o){let l=o.target;l.removeEventListener("dispose",r);let c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function a(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:a}}function Sx(i){let e={};function t(n){if(e[n]!==void 0)return e[n];let s;switch(n){case"WEBGL_depth_texture":s=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=i.getExtension(n)}return e[n]=s,s}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){let s=t(n);return s===null&&Xs("THREE.WebGLRenderer: "+n+" extension not supported."),s}}}function bx(i,e,t,n){let s={},r=new WeakMap;function a(d){let m=d.target;m.index!==null&&e.remove(m.index);for(let f in m.attributes)e.remove(m.attributes[f]);m.removeEventListener("dispose",a),delete s[m.id];let u=r.get(m);u&&(e.remove(u),r.delete(m)),n.releaseStatesOfGeometry(m),m.isInstancedBufferGeometry===!0&&delete m._maxInstanceCount,t.memory.geometries--}function o(d,m){return s[m.id]===!0||(m.addEventListener("dispose",a),s[m.id]=!0,t.memory.geometries++),m}function l(d){let m=d.attributes;for(let u in m)e.update(m[u],i.ARRAY_BUFFER)}function c(d){let m=[],u=d.index,f=d.attributes.position,y=0;if(u!==null){let v=u.array;y=u.version;for(let _=0,x=v.length;_<x;_+=3){let T=v[_+0],A=v[_+1],C=v[_+2];m.push(T,A,A,C,C,T)}}else if(f!==void 0){let v=f.array;y=f.version;for(let _=0,x=v.length/3-1;_<x;_+=3){let T=_+0,A=_+1,C=_+2;m.push(T,A,A,C,C,T)}}else return;let g=new(Ch(m)?Xr:Wr)(m,1);g.version=y;let p=r.get(d);p&&e.remove(p),r.set(d,g)}function h(d){let m=r.get(d);if(m){let u=d.index;u!==null&&m.version<u.version&&c(d)}else c(d);return r.get(d)}return{get:o,update:l,getWireframeAttribute:h}}function Ex(i,e,t){let n;function s(m){n=m}let r,a;function o(m){r=m.type,a=m.bytesPerElement}function l(m,u){i.drawElements(n,u,r,m*a),t.update(u,n,1)}function c(m,u,f){f!==0&&(i.drawElementsInstanced(n,u,r,m*a,f),t.update(u,n,f))}function h(m,u,f){if(f===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,u,0,r,m,0,f);let g=0;for(let p=0;p<f;p++)g+=u[p];t.update(g,n,1)}function d(m,u,f,y){if(f===0)return;let g=e.get("WEBGL_multi_draw");if(g===null)for(let p=0;p<m.length;p++)c(m[p]/a,u[p],y[p]);else{g.multiDrawElementsInstancedWEBGL(n,u,0,r,m,0,y,0,f);let p=0;for(let v=0;v<f;v++)p+=u[v]*y[v];t.update(p,n,1)}}this.setMode=s,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=h,this.renderMultiDrawInstances=d}function wx(i){let e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(t.calls++,a){case i.TRIANGLES:t.triangles+=o*(r/3);break;case i.LINES:t.lines+=o*(r/2);break;case i.LINE_STRIP:t.lines+=o*(r-1);break;case i.LINE_LOOP:t.lines+=o*r;break;case i.POINTS:t.points+=o*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:n}}function Tx(i,e,t){let n=new WeakMap,s=new yt;function r(a,o,l){let c=a.morphTargetInfluences,h=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,d=h!==void 0?h.length:0,m=n.get(o);if(m===void 0||m.count!==d){let b=function(){C.dispose(),n.delete(o),o.removeEventListener("dispose",b)};m!==void 0&&m.texture.dispose();let u=o.morphAttributes.position!==void 0,f=o.morphAttributes.normal!==void 0,y=o.morphAttributes.color!==void 0,g=o.morphAttributes.position||[],p=o.morphAttributes.normal||[],v=o.morphAttributes.color||[],_=0;u===!0&&(_=1),f===!0&&(_=2),y===!0&&(_=3);let x=o.attributes.position.count*_,T=1;x>e.maxTextureSize&&(T=Math.ceil(x/e.maxTextureSize),x=e.maxTextureSize);let A=new Float32Array(x*T*4*d),C=new Gr(A,x,T,d);C.type=wn,C.needsUpdate=!0;let P=_*4;for(let S=0;S<d;S++){let I=g[S],F=p[S],V=v[S],X=x*T*4*S;for(let D=0;D<I.count;D++){let z=D*P;u===!0&&(s.fromBufferAttribute(I,D),A[X+z+0]=s.x,A[X+z+1]=s.y,A[X+z+2]=s.z,A[X+z+3]=0),f===!0&&(s.fromBufferAttribute(F,D),A[X+z+4]=s.x,A[X+z+5]=s.y,A[X+z+6]=s.z,A[X+z+7]=0),y===!0&&(s.fromBufferAttribute(V,D),A[X+z+8]=s.x,A[X+z+9]=s.y,A[X+z+10]=s.z,A[X+z+11]=V.itemSize===4?s.w:1)}}m={count:d,texture:C,size:new ge(x,T)},n.set(o,m),o.addEventListener("dispose",b)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(i,"morphTexture",a.morphTexture,t);else{let u=0;for(let y=0;y<c.length;y++)u+=c[y];let f=o.morphTargetsRelative?1:1-u;l.getUniforms().setValue(i,"morphTargetBaseInfluence",f),l.getUniforms().setValue(i,"morphTargetInfluences",c)}l.getUniforms().setValue(i,"morphTargetsTexture",m.texture,t),l.getUniforms().setValue(i,"morphTargetsTextureSize",m.size)}return{update:r}}function Ax(i,e,t,n){let s=new WeakMap;function r(l){let c=n.render.frame,h=l.geometry,d=e.get(l,h);if(s.get(d)!==c&&(e.update(d),s.set(d,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",o)===!1&&l.addEventListener("dispose",o),s.get(l)!==c&&(t.update(l.instanceMatrix,i.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,i.ARRAY_BUFFER),s.set(l,c))),l.isSkinnedMesh){let m=l.skeleton;s.get(m)!==c&&(m.update(),s.set(m,c))}return d}function a(){s=new WeakMap}function o(l){let c=l.target;c.removeEventListener("dispose",o),t.remove(c.instanceMatrix),c.instanceColor!==null&&t.remove(c.instanceColor)}return{update:r,dispose:a}}var Xf=new on,Af=new ia(1,1),qf=new Gr,$f=new Po,Yf=new $r,Cf=[],Rf=[],If=new Float32Array(16),Pf=new Float32Array(9),Lf=new Float32Array(4);function hr(i,e,t){let n=i[0];if(n<=0||n>0)return i;let s=e*t,r=Cf[s];if(r===void 0&&(r=new Float32Array(s),Cf[s]=r),e!==0){n.toArray(r,0);for(let a=1,o=0;a!==e;++a)o+=t,i[a].toArray(r,o)}return r}function Ut(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function Nt(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function Kl(i,e){let t=Rf[e];t===void 0&&(t=new Int32Array(e),Rf[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function Cx(i,e){let t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function Rx(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Ut(t,e))return;i.uniform2fv(this.addr,e),Nt(t,e)}}function Ix(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Ut(t,e))return;i.uniform3fv(this.addr,e),Nt(t,e)}}function Px(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Ut(t,e))return;i.uniform4fv(this.addr,e),Nt(t,e)}}function Lx(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(Ut(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),Nt(t,e)}else{if(Ut(t,n))return;Lf.set(n),i.uniformMatrix2fv(this.addr,!1,Lf),Nt(t,n)}}function Dx(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(Ut(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),Nt(t,e)}else{if(Ut(t,n))return;Pf.set(n),i.uniformMatrix3fv(this.addr,!1,Pf),Nt(t,n)}}function Ux(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(Ut(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),Nt(t,e)}else{if(Ut(t,n))return;If.set(n),i.uniformMatrix4fv(this.addr,!1,If),Nt(t,n)}}function Nx(i,e){let t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function Fx(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Ut(t,e))return;i.uniform2iv(this.addr,e),Nt(t,e)}}function Ox(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Ut(t,e))return;i.uniform3iv(this.addr,e),Nt(t,e)}}function Bx(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Ut(t,e))return;i.uniform4iv(this.addr,e),Nt(t,e)}}function zx(i,e){let t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function kx(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Ut(t,e))return;i.uniform2uiv(this.addr,e),Nt(t,e)}}function Hx(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Ut(t,e))return;i.uniform3uiv(this.addr,e),Nt(t,e)}}function Vx(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Ut(t,e))return;i.uniform4uiv(this.addr,e),Nt(t,e)}}function Gx(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(Af.compareFunction=wh,r=Af):r=Xf,t.setTexture2D(e||r,s)}function Wx(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture3D(e||$f,s)}function Xx(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTextureCube(e||Yf,s)}function qx(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture2DArray(e||qf,s)}function $x(i){switch(i){case 5126:return Cx;case 35664:return Rx;case 35665:return Ix;case 35666:return Px;case 35674:return Lx;case 35675:return Dx;case 35676:return Ux;case 5124:case 35670:return Nx;case 35667:case 35671:return Fx;case 35668:case 35672:return Ox;case 35669:case 35673:return Bx;case 5125:return zx;case 36294:return kx;case 36295:return Hx;case 36296:return Vx;case 35678:case 36198:case 36298:case 36306:case 35682:return Gx;case 35679:case 36299:case 36307:return Wx;case 35680:case 36300:case 36308:case 36293:return Xx;case 36289:case 36303:case 36311:case 36292:return qx}}function Yx(i,e){i.uniform1fv(this.addr,e)}function Zx(i,e){let t=hr(e,this.size,2);i.uniform2fv(this.addr,t)}function Jx(i,e){let t=hr(e,this.size,3);i.uniform3fv(this.addr,t)}function Kx(i,e){let t=hr(e,this.size,4);i.uniform4fv(this.addr,t)}function jx(i,e){let t=hr(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function Qx(i,e){let t=hr(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function e_(i,e){let t=hr(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function t_(i,e){i.uniform1iv(this.addr,e)}function n_(i,e){i.uniform2iv(this.addr,e)}function i_(i,e){i.uniform3iv(this.addr,e)}function s_(i,e){i.uniform4iv(this.addr,e)}function r_(i,e){i.uniform1uiv(this.addr,e)}function a_(i,e){i.uniform2uiv(this.addr,e)}function o_(i,e){i.uniform3uiv(this.addr,e)}function l_(i,e){i.uniform4uiv(this.addr,e)}function c_(i,e,t){let n=this.cache,s=e.length,r=Kl(t,s);Ut(n,r)||(i.uniform1iv(this.addr,r),Nt(n,r));for(let a=0;a!==s;++a)t.setTexture2D(e[a]||Xf,r[a])}function h_(i,e,t){let n=this.cache,s=e.length,r=Kl(t,s);Ut(n,r)||(i.uniform1iv(this.addr,r),Nt(n,r));for(let a=0;a!==s;++a)t.setTexture3D(e[a]||$f,r[a])}function u_(i,e,t){let n=this.cache,s=e.length,r=Kl(t,s);Ut(n,r)||(i.uniform1iv(this.addr,r),Nt(n,r));for(let a=0;a!==s;++a)t.setTextureCube(e[a]||Yf,r[a])}function d_(i,e,t){let n=this.cache,s=e.length,r=Kl(t,s);Ut(n,r)||(i.uniform1iv(this.addr,r),Nt(n,r));for(let a=0;a!==s;++a)t.setTexture2DArray(e[a]||qf,r[a])}function f_(i){switch(i){case 5126:return Yx;case 35664:return Zx;case 35665:return Jx;case 35666:return Kx;case 35674:return jx;case 35675:return Qx;case 35676:return e_;case 5124:case 35670:return t_;case 35667:case 35671:return n_;case 35668:case 35672:return i_;case 35669:case 35673:return s_;case 5125:return r_;case 36294:return a_;case 36295:return o_;case 36296:return l_;case 35678:case 36198:case 36298:case 36306:case 35682:return c_;case 35679:case 36299:case 36307:return h_;case 35680:case 36300:case 36308:case 36293:return u_;case 36289:case 36303:case 36311:case 36292:return d_}}var kh=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=$x(t.type)}},Hh=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=f_(t.type)}},Vh=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let s=this.seq;for(let r=0,a=s.length;r!==a;++r){let o=s[r];o.setValue(e,t[o.id],n)}}},zh=/(\w+)(\])?(\[|\.)?/g;function Df(i,e){i.seq.push(e),i.map[e.id]=e}function p_(i,e,t){let n=i.name,s=n.length;for(zh.lastIndex=0;;){let r=zh.exec(n),a=zh.lastIndex,o=r[1],l=r[2]==="]",c=r[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===s){Df(t,c===void 0?new kh(o,i,e):new Hh(o,i,e));break}else{let d=t.map[o];d===void 0&&(d=new Vh(o),Df(t,d)),t=d}}}var cr=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let s=0;s<n;++s){let r=e.getActiveUniform(t,s),a=e.getUniformLocation(t,r.name);p_(r,a,this)}}setValue(e,t,n,s){let r=this.map[t];r!==void 0&&r.setValue(e,n,s)}setOptional(e,t,n){let s=t[n];s!==void 0&&this.setValue(e,n,s)}static upload(e,t,n,s){for(let r=0,a=t.length;r!==a;++r){let o=t[r],l=n[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,s)}}static seqWithValue(e,t){let n=[];for(let s=0,r=e.length;s!==r;++s){let a=e[s];a.id in t&&n.push(a)}return n}};function Uf(i,e,t){let n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}var m_=37297,g_=0;function y_(i,e){let t=i.split(`
`),n=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let a=s;a<r;a++){let o=a+1;n.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return n.join(`
`)}var Nf=new qe;function x_(i){it._getMatrix(Nf,it.workingColorSpace,i);let e=`mat3( ${Nf.elements.map(t=>t.toFixed(4))} )`;switch(it.getTransfer(i)){case kr:return[e,"LinearTransferOETF"];case ot:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",i),[e,"LinearTransferOETF"]}}function Ff(i,e,t){let n=i.getShaderParameter(e,i.COMPILE_STATUS),r=(i.getShaderInfoLog(e)||"").trim();if(n&&r==="")return"";let a=/ERROR: 0:(\d+)/.exec(r);if(a){let o=parseInt(a[1]);return t.toUpperCase()+`

`+r+`

`+y_(i.getShaderSource(e),o)}else return r}function __(i,e){let t=x_(e);return[`vec4 ${i}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function v_(i,e){let t;switch(e){case Gd:t="Linear";break;case Wd:t="Reinhard";break;case Xd:t="Cineon";break;case rl:t="ACESFilmic";break;case $d:t="AgX";break;case Yd:t="Neutral";break;case qd:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}var Yl=new L;function M_(){it.getLuminanceCoefficients(Yl);let i=Yl.x.toFixed(4),e=Yl.y.toFixed(4),t=Yl.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function S_(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Ra).join(`
`)}function b_(i){let e=[];for(let t in i){let n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function E_(i,e){let t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){let r=i.getActiveAttrib(e,s),a=r.name,o=1;r.type===i.FLOAT_MAT2&&(o=2),r.type===i.FLOAT_MAT3&&(o=3),r.type===i.FLOAT_MAT4&&(o=4),t[a]={type:r.type,location:i.getAttribLocation(e,a),locationSize:o}}return t}function Ra(i){return i!==""}function Of(i,e){let t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Bf(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}var w_=/^[ \t]*#include +<([\w\d./]+)>/gm;function Gh(i){return i.replace(w_,A_)}var T_=new Map;function A_(i,e){let t=Ze[e];if(t===void 0){let n=T_.get(e);if(n!==void 0)t=Ze[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return Gh(t)}var C_=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function zf(i){return i.replace(C_,R_)}function R_(i,e,t,n){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function kf(i){let e=`precision ${i.precision} float;
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
#define LOW_PRECISION`),e}function I_(i){let e="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===uh?e="SHADOWMAP_TYPE_PCF":i.shadowMapType===Ko?e="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===$n&&(e="SHADOWMAP_TYPE_VSM"),e}function P_(i){let e="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case fs:case ps:e="ENVMAP_TYPE_CUBE";break;case ba:e="ENVMAP_TYPE_CUBE_UV";break}return e}function L_(i){let e="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case ps:e="ENVMAP_MODE_REFRACTION";break}return e}function D_(i){let e="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case mh:e="ENVMAP_BLENDING_MULTIPLY";break;case Hd:e="ENVMAP_BLENDING_MIX";break;case Vd:e="ENVMAP_BLENDING_ADD";break}return e}function U_(i){let e=i.envMapCubeUVHeight;if(e===null)return null;let t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:n,maxMip:t}}function N_(i,e,t,n){let s=i.getContext(),r=t.defines,a=t.vertexShader,o=t.fragmentShader,l=I_(t),c=P_(t),h=L_(t),d=D_(t),m=U_(t),u=S_(t),f=b_(r),y=s.createProgram(),g,p,v=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(g=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,f].filter(Ra).join(`
`),g.length>0&&(g+=`
`),p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,f].filter(Ra).join(`
`),p.length>0&&(p+=`
`)):(g=[kf(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,f,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Ra).join(`
`),p=[kf(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,f,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+h:"",t.envMap?"#define "+d:"",m?"#define CUBEUV_TEXEL_WIDTH "+m.texelWidth:"",m?"#define CUBEUV_TEXEL_HEIGHT "+m.texelHeight:"",m?"#define CUBEUV_MAX_MIP "+m.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==pi?"#define TONE_MAPPING":"",t.toneMapping!==pi?Ze.tonemapping_pars_fragment:"",t.toneMapping!==pi?v_("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Ze.colorspace_pars_fragment,__("linearToOutputTexel",t.outputColorSpace),M_(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Ra).join(`
`)),a=Gh(a),a=Of(a,t),a=Bf(a,t),o=Gh(o),o=Of(o,t),o=Bf(o,t),a=zf(a),o=zf(o),t.isRawShaderMaterial!==!0&&(v=`#version 300 es
`,g=[u,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,p=["#define varying in",t.glslVersion===Th?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Th?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);let _=v+g+a,x=v+p+o,T=Uf(s,s.VERTEX_SHADER,_),A=Uf(s,s.FRAGMENT_SHADER,x);s.attachShader(y,T),s.attachShader(y,A),t.index0AttributeName!==void 0?s.bindAttribLocation(y,0,t.index0AttributeName):t.morphTargets===!0&&s.bindAttribLocation(y,0,"position"),s.linkProgram(y);function C(I){if(i.debug.checkShaderErrors){let F=s.getProgramInfoLog(y)||"",V=s.getShaderInfoLog(T)||"",X=s.getShaderInfoLog(A)||"",D=F.trim(),z=V.trim(),Y=X.trim(),k=!0,re=!0;if(s.getProgramParameter(y,s.LINK_STATUS)===!1)if(k=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,y,T,A);else{let te=Ff(s,T,"vertex"),ie=Ff(s,A,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(y,s.VALIDATE_STATUS)+`

Material Name: `+I.name+`
Material Type: `+I.type+`

Program Info Log: `+D+`
`+te+`
`+ie)}else D!==""?console.warn("THREE.WebGLProgram: Program Info Log:",D):(z===""||Y==="")&&(re=!1);re&&(I.diagnostics={runnable:k,programLog:D,vertexShader:{log:z,prefix:g},fragmentShader:{log:Y,prefix:p}})}s.deleteShader(T),s.deleteShader(A),P=new cr(s,y),b=E_(s,y)}let P;this.getUniforms=function(){return P===void 0&&C(this),P};let b;this.getAttributes=function(){return b===void 0&&C(this),b};let S=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return S===!1&&(S=s.getProgramParameter(y,m_)),S},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(y),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=g_++,this.cacheKey=e,this.usedTimes=1,this.program=y,this.vertexShader=T,this.fragmentShader=A,this}var F_=0,Wh=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){let t=e.vertexShader,n=e.fragmentShader,s=this._getShaderStage(t),r=this._getShaderStage(n),a=this._getShaderCacheForMaterial(e);return a.has(s)===!1&&(a.add(s),s.usedTimes++),a.has(r)===!1&&(a.add(r),r.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new Xh(e),t.set(e,n)),n}},Xh=class{constructor(e){this.id=F_++,this.code=e,this.usedTimes=0}};function O_(i,e,t,n,s,r,a){let o=new $s,l=new Wh,c=new Set,h=[],d=s.logarithmicDepthBuffer,m=s.vertexTextures,u=s.precision,f={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function y(b){return c.add(b),b===0?"uv":`uv${b}`}function g(b,S,I,F,V){let X=F.fog,D=V.geometry,z=b.isMeshStandardMaterial?F.environment:null,Y=(b.isMeshStandardMaterial?t:e).get(b.envMap||z),k=Y&&Y.mapping===ba?Y.image.height:null,re=f[b.type];b.precision!==null&&(u=s.getMaxPrecision(b.precision),u!==b.precision&&console.warn("THREE.WebGLProgram.getParameters:",b.precision,"not supported, using",u,"instead."));let te=D.morphAttributes.position||D.morphAttributes.normal||D.morphAttributes.color,ie=te!==void 0?te.length:0,De=0;D.morphAttributes.position!==void 0&&(De=1),D.morphAttributes.normal!==void 0&&(De=2),D.morphAttributes.color!==void 0&&(De=3);let ke,je,Xe,$;if(re){let at=Yn[re];ke=at.vertexShader,je=at.fragmentShader}else ke=b.vertexShader,je=b.fragmentShader,l.update(b),Xe=l.getVertexShaderID(b),$=l.getFragmentShaderID(b);let Q=i.getRenderTarget(),Me=i.state.buffers.depth.getReversed(),Le=V.isInstancedMesh===!0,Te=V.isBatchedMesh===!0,et=!!b.map,pt=!!b.matcap,R=!!Y,ne=!!b.aoMap,K=!!b.lightMap,J=!!b.bumpMap,Z=!!b.normalMap,de=!!b.displacementMap,se=!!b.emissiveMap,fe=!!b.metalnessMap,Ge=!!b.roughnessMap,He=b.anisotropy>0,w=b.clearcoat>0,M=b.dispersion>0,B=b.iridescence>0,W=b.sheen>0,ee=b.transmission>0,q=He&&!!b.anisotropyMap,Ie=w&&!!b.clearcoatMap,ue=w&&!!b.clearcoatNormalMap,Ae=w&&!!b.clearcoatRoughnessMap,Ce=B&&!!b.iridescenceMap,ae=B&&!!b.iridescenceThicknessMap,ve=W&&!!b.sheenColorMap,Be=W&&!!b.sheenRoughnessMap,Pe=!!b.specularMap,xe=!!b.specularColorMap,$e=!!b.specularIntensityMap,U=ee&&!!b.transmissionMap,he=ee&&!!b.thicknessMap,me=!!b.gradientMap,Ee=!!b.alphaMap,oe=b.alphaTest>0,j=!!b.alphaHash,Re=!!b.extensions,We=pi;b.toneMapped&&(Q===null||Q.isXRRenderTarget===!0)&&(We=i.toneMapping);let mt={shaderID:re,shaderType:b.type,shaderName:b.name,vertexShader:ke,fragmentShader:je,defines:b.defines,customVertexShaderID:Xe,customFragmentShaderID:$,isRawShaderMaterial:b.isRawShaderMaterial===!0,glslVersion:b.glslVersion,precision:u,batching:Te,batchingColor:Te&&V._colorsTexture!==null,instancing:Le,instancingColor:Le&&V.instanceColor!==null,instancingMorph:Le&&V.morphTexture!==null,supportsVertexTextures:m,outputColorSpace:Q===null?i.outputColorSpace:Q.isXRRenderTarget===!0?Q.texture.colorSpace:ss,alphaToCoverage:!!b.alphaToCoverage,map:et,matcap:pt,envMap:R,envMapMode:R&&Y.mapping,envMapCubeUVHeight:k,aoMap:ne,lightMap:K,bumpMap:J,normalMap:Z,displacementMap:m&&de,emissiveMap:se,normalMapObjectSpace:Z&&b.normalMapType===nf,normalMapTangentSpace:Z&&b.normalMapType===Eh,metalnessMap:fe,roughnessMap:Ge,anisotropy:He,anisotropyMap:q,clearcoat:w,clearcoatMap:Ie,clearcoatNormalMap:ue,clearcoatRoughnessMap:Ae,dispersion:M,iridescence:B,iridescenceMap:Ce,iridescenceThicknessMap:ae,sheen:W,sheenColorMap:ve,sheenRoughnessMap:Be,specularMap:Pe,specularColorMap:xe,specularIntensityMap:$e,transmission:ee,transmissionMap:U,thicknessMap:he,gradientMap:me,opaque:b.transparent===!1&&b.blending===ns&&b.alphaToCoverage===!1,alphaMap:Ee,alphaTest:oe,alphaHash:j,combine:b.combine,mapUv:et&&y(b.map.channel),aoMapUv:ne&&y(b.aoMap.channel),lightMapUv:K&&y(b.lightMap.channel),bumpMapUv:J&&y(b.bumpMap.channel),normalMapUv:Z&&y(b.normalMap.channel),displacementMapUv:de&&y(b.displacementMap.channel),emissiveMapUv:se&&y(b.emissiveMap.channel),metalnessMapUv:fe&&y(b.metalnessMap.channel),roughnessMapUv:Ge&&y(b.roughnessMap.channel),anisotropyMapUv:q&&y(b.anisotropyMap.channel),clearcoatMapUv:Ie&&y(b.clearcoatMap.channel),clearcoatNormalMapUv:ue&&y(b.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Ae&&y(b.clearcoatRoughnessMap.channel),iridescenceMapUv:Ce&&y(b.iridescenceMap.channel),iridescenceThicknessMapUv:ae&&y(b.iridescenceThicknessMap.channel),sheenColorMapUv:ve&&y(b.sheenColorMap.channel),sheenRoughnessMapUv:Be&&y(b.sheenRoughnessMap.channel),specularMapUv:Pe&&y(b.specularMap.channel),specularColorMapUv:xe&&y(b.specularColorMap.channel),specularIntensityMapUv:$e&&y(b.specularIntensityMap.channel),transmissionMapUv:U&&y(b.transmissionMap.channel),thicknessMapUv:he&&y(b.thicknessMap.channel),alphaMapUv:Ee&&y(b.alphaMap.channel),vertexTangents:!!D.attributes.tangent&&(Z||He),vertexColors:b.vertexColors,vertexAlphas:b.vertexColors===!0&&!!D.attributes.color&&D.attributes.color.itemSize===4,pointsUvs:V.isPoints===!0&&!!D.attributes.uv&&(et||Ee),fog:!!X,useFog:b.fog===!0,fogExp2:!!X&&X.isFogExp2,flatShading:b.flatShading===!0&&b.wireframe===!1,sizeAttenuation:b.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:Me,skinning:V.isSkinnedMesh===!0,morphTargets:D.morphAttributes.position!==void 0,morphNormals:D.morphAttributes.normal!==void 0,morphColors:D.morphAttributes.color!==void 0,morphTargetsCount:ie,morphTextureStride:De,numDirLights:S.directional.length,numPointLights:S.point.length,numSpotLights:S.spot.length,numSpotLightMaps:S.spotLightMap.length,numRectAreaLights:S.rectArea.length,numHemiLights:S.hemi.length,numDirLightShadows:S.directionalShadowMap.length,numPointLightShadows:S.pointShadowMap.length,numSpotLightShadows:S.spotShadowMap.length,numSpotLightShadowsWithMaps:S.numSpotLightShadowsWithMaps,numLightProbes:S.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:b.dithering,shadowMapEnabled:i.shadowMap.enabled&&I.length>0,shadowMapType:i.shadowMap.type,toneMapping:We,decodeVideoTexture:et&&b.map.isVideoTexture===!0&&it.getTransfer(b.map.colorSpace)===ot,decodeVideoTextureEmissive:se&&b.emissiveMap.isVideoTexture===!0&&it.getTransfer(b.emissiveMap.colorSpace)===ot,premultipliedAlpha:b.premultipliedAlpha,doubleSided:b.side===En,flipSided:b.side===Gt,useDepthPacking:b.depthPacking>=0,depthPacking:b.depthPacking||0,index0AttributeName:b.index0AttributeName,extensionClipCullDistance:Re&&b.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Re&&b.extensions.multiDraw===!0||Te)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:b.customProgramCacheKey()};return mt.vertexUv1s=c.has(1),mt.vertexUv2s=c.has(2),mt.vertexUv3s=c.has(3),c.clear(),mt}function p(b){let S=[];if(b.shaderID?S.push(b.shaderID):(S.push(b.customVertexShaderID),S.push(b.customFragmentShaderID)),b.defines!==void 0)for(let I in b.defines)S.push(I),S.push(b.defines[I]);return b.isRawShaderMaterial===!1&&(v(S,b),_(S,b),S.push(i.outputColorSpace)),S.push(b.customProgramCacheKey),S.join()}function v(b,S){b.push(S.precision),b.push(S.outputColorSpace),b.push(S.envMapMode),b.push(S.envMapCubeUVHeight),b.push(S.mapUv),b.push(S.alphaMapUv),b.push(S.lightMapUv),b.push(S.aoMapUv),b.push(S.bumpMapUv),b.push(S.normalMapUv),b.push(S.displacementMapUv),b.push(S.emissiveMapUv),b.push(S.metalnessMapUv),b.push(S.roughnessMapUv),b.push(S.anisotropyMapUv),b.push(S.clearcoatMapUv),b.push(S.clearcoatNormalMapUv),b.push(S.clearcoatRoughnessMapUv),b.push(S.iridescenceMapUv),b.push(S.iridescenceThicknessMapUv),b.push(S.sheenColorMapUv),b.push(S.sheenRoughnessMapUv),b.push(S.specularMapUv),b.push(S.specularColorMapUv),b.push(S.specularIntensityMapUv),b.push(S.transmissionMapUv),b.push(S.thicknessMapUv),b.push(S.combine),b.push(S.fogExp2),b.push(S.sizeAttenuation),b.push(S.morphTargetsCount),b.push(S.morphAttributeCount),b.push(S.numDirLights),b.push(S.numPointLights),b.push(S.numSpotLights),b.push(S.numSpotLightMaps),b.push(S.numHemiLights),b.push(S.numRectAreaLights),b.push(S.numDirLightShadows),b.push(S.numPointLightShadows),b.push(S.numSpotLightShadows),b.push(S.numSpotLightShadowsWithMaps),b.push(S.numLightProbes),b.push(S.shadowMapType),b.push(S.toneMapping),b.push(S.numClippingPlanes),b.push(S.numClipIntersection),b.push(S.depthPacking)}function _(b,S){o.disableAll(),S.supportsVertexTextures&&o.enable(0),S.instancing&&o.enable(1),S.instancingColor&&o.enable(2),S.instancingMorph&&o.enable(3),S.matcap&&o.enable(4),S.envMap&&o.enable(5),S.normalMapObjectSpace&&o.enable(6),S.normalMapTangentSpace&&o.enable(7),S.clearcoat&&o.enable(8),S.iridescence&&o.enable(9),S.alphaTest&&o.enable(10),S.vertexColors&&o.enable(11),S.vertexAlphas&&o.enable(12),S.vertexUv1s&&o.enable(13),S.vertexUv2s&&o.enable(14),S.vertexUv3s&&o.enable(15),S.vertexTangents&&o.enable(16),S.anisotropy&&o.enable(17),S.alphaHash&&o.enable(18),S.batching&&o.enable(19),S.dispersion&&o.enable(20),S.batchingColor&&o.enable(21),S.gradientMap&&o.enable(22),b.push(o.mask),o.disableAll(),S.fog&&o.enable(0),S.useFog&&o.enable(1),S.flatShading&&o.enable(2),S.logarithmicDepthBuffer&&o.enable(3),S.reversedDepthBuffer&&o.enable(4),S.skinning&&o.enable(5),S.morphTargets&&o.enable(6),S.morphNormals&&o.enable(7),S.morphColors&&o.enable(8),S.premultipliedAlpha&&o.enable(9),S.shadowMapEnabled&&o.enable(10),S.doubleSided&&o.enable(11),S.flipSided&&o.enable(12),S.useDepthPacking&&o.enable(13),S.dithering&&o.enable(14),S.transmission&&o.enable(15),S.sheen&&o.enable(16),S.opaque&&o.enable(17),S.pointsUvs&&o.enable(18),S.decodeVideoTexture&&o.enable(19),S.decodeVideoTextureEmissive&&o.enable(20),S.alphaToCoverage&&o.enable(21),b.push(o.mask)}function x(b){let S=f[b.type],I;if(S){let F=Yn[S];I=pf.clone(F.uniforms)}else I=b.uniforms;return I}function T(b,S){let I;for(let F=0,V=h.length;F<V;F++){let X=h[F];if(X.cacheKey===S){I=X,++I.usedTimes;break}}return I===void 0&&(I=new N_(i,S,b,r),h.push(I)),I}function A(b){if(--b.usedTimes===0){let S=h.indexOf(b);h[S]=h[h.length-1],h.pop(),b.destroy()}}function C(b){l.remove(b)}function P(){l.dispose()}return{getParameters:g,getProgramCacheKey:p,getUniforms:x,acquireProgram:T,releaseProgram:A,releaseShaderCache:C,programs:h,dispose:P}}function B_(){let i=new WeakMap;function e(a){return i.has(a)}function t(a){let o=i.get(a);return o===void 0&&(o={},i.set(a,o)),o}function n(a){i.delete(a)}function s(a,o,l){i.get(a)[o]=l}function r(){i=new WeakMap}return{has:e,get:t,remove:n,update:s,dispose:r}}function z_(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.z!==e.z?i.z-e.z:i.id-e.id}function Hf(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function Vf(){let i=[],e=0,t=[],n=[],s=[];function r(){e=0,t.length=0,n.length=0,s.length=0}function a(d,m,u,f,y,g){let p=i[e];return p===void 0?(p={id:d.id,object:d,geometry:m,material:u,groupOrder:f,renderOrder:d.renderOrder,z:y,group:g},i[e]=p):(p.id=d.id,p.object=d,p.geometry=m,p.material=u,p.groupOrder=f,p.renderOrder=d.renderOrder,p.z=y,p.group=g),e++,p}function o(d,m,u,f,y,g){let p=a(d,m,u,f,y,g);u.transmission>0?n.push(p):u.transparent===!0?s.push(p):t.push(p)}function l(d,m,u,f,y,g){let p=a(d,m,u,f,y,g);u.transmission>0?n.unshift(p):u.transparent===!0?s.unshift(p):t.unshift(p)}function c(d,m){t.length>1&&t.sort(d||z_),n.length>1&&n.sort(m||Hf),s.length>1&&s.sort(m||Hf)}function h(){for(let d=e,m=i.length;d<m;d++){let u=i[d];if(u.id===null)break;u.id=null,u.object=null,u.geometry=null,u.material=null,u.group=null}}return{opaque:t,transmissive:n,transparent:s,init:r,push:o,unshift:l,finish:h,sort:c}}function k_(){let i=new WeakMap;function e(n,s){let r=i.get(n),a;return r===void 0?(a=new Vf,i.set(n,[a])):s>=r.length?(a=new Vf,r.push(a)):a=r[s],a}function t(){i=new WeakMap}return{get:e,dispose:t}}function H_(){let i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new L,color:new Ve};break;case"SpotLight":t={position:new L,direction:new L,color:new Ve,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new L,color:new Ve,distance:0,decay:0};break;case"HemisphereLight":t={direction:new L,skyColor:new Ve,groundColor:new Ve};break;case"RectAreaLight":t={color:new Ve,position:new L,halfWidth:new L,halfHeight:new L};break}return i[e.id]=t,t}}}function V_(){let i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ge};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ge};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ge,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}var G_=0;function W_(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function X_(i){let e=new H_,t=V_(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new L);let s=new L,r=new Ye,a=new Ye;function o(c){let h=0,d=0,m=0;for(let b=0;b<9;b++)n.probe[b].set(0,0,0);let u=0,f=0,y=0,g=0,p=0,v=0,_=0,x=0,T=0,A=0,C=0;c.sort(W_);for(let b=0,S=c.length;b<S;b++){let I=c[b],F=I.color,V=I.intensity,X=I.distance,D=I.shadow&&I.shadow.map?I.shadow.map.texture:null;if(I.isAmbientLight)h+=F.r*V,d+=F.g*V,m+=F.b*V;else if(I.isLightProbe){for(let z=0;z<9;z++)n.probe[z].addScaledVector(I.sh.coefficients[z],V);C++}else if(I.isDirectionalLight){let z=e.get(I);if(z.color.copy(I.color).multiplyScalar(I.intensity),I.castShadow){let Y=I.shadow,k=t.get(I);k.shadowIntensity=Y.intensity,k.shadowBias=Y.bias,k.shadowNormalBias=Y.normalBias,k.shadowRadius=Y.radius,k.shadowMapSize=Y.mapSize,n.directionalShadow[u]=k,n.directionalShadowMap[u]=D,n.directionalShadowMatrix[u]=I.shadow.matrix,v++}n.directional[u]=z,u++}else if(I.isSpotLight){let z=e.get(I);z.position.setFromMatrixPosition(I.matrixWorld),z.color.copy(F).multiplyScalar(V),z.distance=X,z.coneCos=Math.cos(I.angle),z.penumbraCos=Math.cos(I.angle*(1-I.penumbra)),z.decay=I.decay,n.spot[y]=z;let Y=I.shadow;if(I.map&&(n.spotLightMap[T]=I.map,T++,Y.updateMatrices(I),I.castShadow&&A++),n.spotLightMatrix[y]=Y.matrix,I.castShadow){let k=t.get(I);k.shadowIntensity=Y.intensity,k.shadowBias=Y.bias,k.shadowNormalBias=Y.normalBias,k.shadowRadius=Y.radius,k.shadowMapSize=Y.mapSize,n.spotShadow[y]=k,n.spotShadowMap[y]=D,x++}y++}else if(I.isRectAreaLight){let z=e.get(I);z.color.copy(F).multiplyScalar(V),z.halfWidth.set(I.width*.5,0,0),z.halfHeight.set(0,I.height*.5,0),n.rectArea[g]=z,g++}else if(I.isPointLight){let z=e.get(I);if(z.color.copy(I.color).multiplyScalar(I.intensity),z.distance=I.distance,z.decay=I.decay,I.castShadow){let Y=I.shadow,k=t.get(I);k.shadowIntensity=Y.intensity,k.shadowBias=Y.bias,k.shadowNormalBias=Y.normalBias,k.shadowRadius=Y.radius,k.shadowMapSize=Y.mapSize,k.shadowCameraNear=Y.camera.near,k.shadowCameraFar=Y.camera.far,n.pointShadow[f]=k,n.pointShadowMap[f]=D,n.pointShadowMatrix[f]=I.shadow.matrix,_++}n.point[f]=z,f++}else if(I.isHemisphereLight){let z=e.get(I);z.skyColor.copy(I.color).multiplyScalar(V),z.groundColor.copy(I.groundColor).multiplyScalar(V),n.hemi[p]=z,p++}}g>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=ye.LTC_FLOAT_1,n.rectAreaLTC2=ye.LTC_FLOAT_2):(n.rectAreaLTC1=ye.LTC_HALF_1,n.rectAreaLTC2=ye.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=d,n.ambient[2]=m;let P=n.hash;(P.directionalLength!==u||P.pointLength!==f||P.spotLength!==y||P.rectAreaLength!==g||P.hemiLength!==p||P.numDirectionalShadows!==v||P.numPointShadows!==_||P.numSpotShadows!==x||P.numSpotMaps!==T||P.numLightProbes!==C)&&(n.directional.length=u,n.spot.length=y,n.rectArea.length=g,n.point.length=f,n.hemi.length=p,n.directionalShadow.length=v,n.directionalShadowMap.length=v,n.pointShadow.length=_,n.pointShadowMap.length=_,n.spotShadow.length=x,n.spotShadowMap.length=x,n.directionalShadowMatrix.length=v,n.pointShadowMatrix.length=_,n.spotLightMatrix.length=x+T-A,n.spotLightMap.length=T,n.numSpotLightShadowsWithMaps=A,n.numLightProbes=C,P.directionalLength=u,P.pointLength=f,P.spotLength=y,P.rectAreaLength=g,P.hemiLength=p,P.numDirectionalShadows=v,P.numPointShadows=_,P.numSpotShadows=x,P.numSpotMaps=T,P.numLightProbes=C,n.version=G_++)}function l(c,h){let d=0,m=0,u=0,f=0,y=0,g=h.matrixWorldInverse;for(let p=0,v=c.length;p<v;p++){let _=c[p];if(_.isDirectionalLight){let x=n.directional[d];x.direction.setFromMatrixPosition(_.matrixWorld),s.setFromMatrixPosition(_.target.matrixWorld),x.direction.sub(s),x.direction.transformDirection(g),d++}else if(_.isSpotLight){let x=n.spot[u];x.position.setFromMatrixPosition(_.matrixWorld),x.position.applyMatrix4(g),x.direction.setFromMatrixPosition(_.matrixWorld),s.setFromMatrixPosition(_.target.matrixWorld),x.direction.sub(s),x.direction.transformDirection(g),u++}else if(_.isRectAreaLight){let x=n.rectArea[f];x.position.setFromMatrixPosition(_.matrixWorld),x.position.applyMatrix4(g),a.identity(),r.copy(_.matrixWorld),r.premultiply(g),a.extractRotation(r),x.halfWidth.set(_.width*.5,0,0),x.halfHeight.set(0,_.height*.5,0),x.halfWidth.applyMatrix4(a),x.halfHeight.applyMatrix4(a),f++}else if(_.isPointLight){let x=n.point[m];x.position.setFromMatrixPosition(_.matrixWorld),x.position.applyMatrix4(g),m++}else if(_.isHemisphereLight){let x=n.hemi[y];x.direction.setFromMatrixPosition(_.matrixWorld),x.direction.transformDirection(g),y++}}}return{setup:o,setupView:l,state:n}}function Gf(i){let e=new X_(i),t=[],n=[];function s(h){c.camera=h,t.length=0,n.length=0}function r(h){t.push(h)}function a(h){n.push(h)}function o(){e.setup(t)}function l(h){e.setupView(t,h)}let c={lightsArray:t,shadowsArray:n,camera:null,lights:e,transmissionRenderTarget:{}};return{init:s,state:c,setupLights:o,setupLightsView:l,pushLight:r,pushShadow:a}}function q_(i){let e=new WeakMap;function t(s,r=0){let a=e.get(s),o;return a===void 0?(o=new Gf(i),e.set(s,[o])):r>=a.length?(o=new Gf(i),a.push(o)):o=a[r],o}function n(){e=new WeakMap}return{get:t,dispose:n}}var $_=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Y_=`uniform sampler2D shadow_pass;
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
}`;function Z_(i,e,t){let n=new Pi,s=new ge,r=new ge,a=new yt,o=new Ho({depthPacking:tf}),l=new Vo,c={},h=t.maxTextureSize,d={[ai]:Gt,[Gt]:ai,[En]:En},m=new gn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ge},radius:{value:4}},vertexShader:$_,fragmentShader:Y_}),u=m.clone();u.defines.HORIZONTAL_PASS=1;let f=new St;f.setAttribute("position",new Ct(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let y=new dt(f,m),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=uh;let p=this.type;this.render=function(A,C,P){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||A.length===0)return;let b=i.getRenderTarget(),S=i.getActiveCubeFace(),I=i.getActiveMipmapLevel(),F=i.state;F.setBlending(fi),F.buffers.depth.getReversed()===!0?F.buffers.color.setClear(0,0,0,0):F.buffers.color.setClear(1,1,1,1),F.buffers.depth.setTest(!0),F.setScissorTest(!1);let V=p!==$n&&this.type===$n,X=p===$n&&this.type!==$n;for(let D=0,z=A.length;D<z;D++){let Y=A[D],k=Y.shadow;if(k===void 0){console.warn("THREE.WebGLShadowMap:",Y,"has no shadow.");continue}if(k.autoUpdate===!1&&k.needsUpdate===!1)continue;s.copy(k.mapSize);let re=k.getFrameExtents();if(s.multiply(re),r.copy(k.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/re.x),s.x=r.x*re.x,k.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/re.y),s.y=r.y*re.y,k.mapSize.y=r.y)),k.map===null||V===!0||X===!0){let ie=this.type!==$n?{minFilter:an,magFilter:an}:{};k.map!==null&&k.map.dispose(),k.map=new Gn(s.x,s.y,ie),k.map.texture.name=Y.name+".shadowMap",k.camera.updateProjectionMatrix()}i.setRenderTarget(k.map),i.clear();let te=k.getViewportCount();for(let ie=0;ie<te;ie++){let De=k.getViewport(ie);a.set(r.x*De.x,r.y*De.y,r.x*De.z,r.y*De.w),F.viewport(a),k.updateMatrices(Y,ie),n=k.getFrustum(),x(C,P,k.camera,Y,this.type)}k.isPointLightShadow!==!0&&this.type===$n&&v(k,P),k.needsUpdate=!1}p=this.type,g.needsUpdate=!1,i.setRenderTarget(b,S,I)};function v(A,C){let P=e.update(y);m.defines.VSM_SAMPLES!==A.blurSamples&&(m.defines.VSM_SAMPLES=A.blurSamples,u.defines.VSM_SAMPLES=A.blurSamples,m.needsUpdate=!0,u.needsUpdate=!0),A.mapPass===null&&(A.mapPass=new Gn(s.x,s.y)),m.uniforms.shadow_pass.value=A.map.texture,m.uniforms.resolution.value=A.mapSize,m.uniforms.radius.value=A.radius,i.setRenderTarget(A.mapPass),i.clear(),i.renderBufferDirect(C,null,P,m,y,null),u.uniforms.shadow_pass.value=A.mapPass.texture,u.uniforms.resolution.value=A.mapSize,u.uniforms.radius.value=A.radius,i.setRenderTarget(A.map),i.clear(),i.renderBufferDirect(C,null,P,u,y,null)}function _(A,C,P,b){let S=null,I=P.isPointLight===!0?A.customDistanceMaterial:A.customDepthMaterial;if(I!==void 0)S=I;else if(S=P.isPointLight===!0?l:o,i.localClippingEnabled&&C.clipShadows===!0&&Array.isArray(C.clippingPlanes)&&C.clippingPlanes.length!==0||C.displacementMap&&C.displacementScale!==0||C.alphaMap&&C.alphaTest>0||C.map&&C.alphaTest>0||C.alphaToCoverage===!0){let F=S.uuid,V=C.uuid,X=c[F];X===void 0&&(X={},c[F]=X);let D=X[V];D===void 0&&(D=S.clone(),X[V]=D,C.addEventListener("dispose",T)),S=D}if(S.visible=C.visible,S.wireframe=C.wireframe,b===$n?S.side=C.shadowSide!==null?C.shadowSide:C.side:S.side=C.shadowSide!==null?C.shadowSide:d[C.side],S.alphaMap=C.alphaMap,S.alphaTest=C.alphaToCoverage===!0?.5:C.alphaTest,S.map=C.map,S.clipShadows=C.clipShadows,S.clippingPlanes=C.clippingPlanes,S.clipIntersection=C.clipIntersection,S.displacementMap=C.displacementMap,S.displacementScale=C.displacementScale,S.displacementBias=C.displacementBias,S.wireframeLinewidth=C.wireframeLinewidth,S.linewidth=C.linewidth,P.isPointLight===!0&&S.isMeshDistanceMaterial===!0){let F=i.properties.get(S);F.light=P}return S}function x(A,C,P,b,S){if(A.visible===!1)return;if(A.layers.test(C.layers)&&(A.isMesh||A.isLine||A.isPoints)&&(A.castShadow||A.receiveShadow&&S===$n)&&(!A.frustumCulled||n.intersectsObject(A))){A.modelViewMatrix.multiplyMatrices(P.matrixWorldInverse,A.matrixWorld);let V=e.update(A),X=A.material;if(Array.isArray(X)){let D=V.groups;for(let z=0,Y=D.length;z<Y;z++){let k=D[z],re=X[k.materialIndex];if(re&&re.visible){let te=_(A,re,b,S);A.onBeforeShadow(i,A,C,P,V,te,k),i.renderBufferDirect(P,null,V,te,A,k),A.onAfterShadow(i,A,C,P,V,te,k)}}}else if(X.visible){let D=_(A,X,b,S);A.onBeforeShadow(i,A,C,P,V,D,null),i.renderBufferDirect(P,null,V,D,A,null),A.onAfterShadow(i,A,C,P,V,D,null)}}let F=A.children;for(let V=0,X=F.length;V<X;V++)x(F[V],C,P,b,S)}function T(A){A.target.removeEventListener("dispose",T);for(let P in c){let b=c[P],S=A.target.uuid;S in b&&(b[S].dispose(),delete b[S])}}}var J_={[jo]:Qo,[el]:il,[tl]:sl,[is]:nl,[Qo]:jo,[il]:el,[sl]:tl,[nl]:is};function K_(i,e){function t(){let U=!1,he=new yt,me=null,Ee=new yt(0,0,0,0);return{setMask:function(oe){me!==oe&&!U&&(i.colorMask(oe,oe,oe,oe),me=oe)},setLocked:function(oe){U=oe},setClear:function(oe,j,Re,We,mt){mt===!0&&(oe*=We,j*=We,Re*=We),he.set(oe,j,Re,We),Ee.equals(he)===!1&&(i.clearColor(oe,j,Re,We),Ee.copy(he))},reset:function(){U=!1,me=null,Ee.set(-1,0,0,0)}}}function n(){let U=!1,he=!1,me=null,Ee=null,oe=null;return{setReversed:function(j){if(he!==j){let Re=e.get("EXT_clip_control");j?Re.clipControlEXT(Re.LOWER_LEFT_EXT,Re.ZERO_TO_ONE_EXT):Re.clipControlEXT(Re.LOWER_LEFT_EXT,Re.NEGATIVE_ONE_TO_ONE_EXT),he=j;let We=oe;oe=null,this.setClear(We)}},getReversed:function(){return he},setTest:function(j){j?Q(i.DEPTH_TEST):Me(i.DEPTH_TEST)},setMask:function(j){me!==j&&!U&&(i.depthMask(j),me=j)},setFunc:function(j){if(he&&(j=J_[j]),Ee!==j){switch(j){case jo:i.depthFunc(i.NEVER);break;case Qo:i.depthFunc(i.ALWAYS);break;case el:i.depthFunc(i.LESS);break;case is:i.depthFunc(i.LEQUAL);break;case tl:i.depthFunc(i.EQUAL);break;case nl:i.depthFunc(i.GEQUAL);break;case il:i.depthFunc(i.GREATER);break;case sl:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}Ee=j}},setLocked:function(j){U=j},setClear:function(j){oe!==j&&(he&&(j=1-j),i.clearDepth(j),oe=j)},reset:function(){U=!1,me=null,Ee=null,oe=null,he=!1}}}function s(){let U=!1,he=null,me=null,Ee=null,oe=null,j=null,Re=null,We=null,mt=null;return{setTest:function(at){U||(at?Q(i.STENCIL_TEST):Me(i.STENCIL_TEST))},setMask:function(at){he!==at&&!U&&(i.stencilMask(at),he=at)},setFunc:function(at,jn,kn){(me!==at||Ee!==jn||oe!==kn)&&(i.stencilFunc(at,jn,kn),me=at,Ee=jn,oe=kn)},setOp:function(at,jn,kn){(j!==at||Re!==jn||We!==kn)&&(i.stencilOp(at,jn,kn),j=at,Re=jn,We=kn)},setLocked:function(at){U=at},setClear:function(at){mt!==at&&(i.clearStencil(at),mt=at)},reset:function(){U=!1,he=null,me=null,Ee=null,oe=null,j=null,Re=null,We=null,mt=null}}}let r=new t,a=new n,o=new s,l=new WeakMap,c=new WeakMap,h={},d={},m=new WeakMap,u=[],f=null,y=!1,g=null,p=null,v=null,_=null,x=null,T=null,A=null,C=new Ve(0,0,0),P=0,b=!1,S=null,I=null,F=null,V=null,X=null,D=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS),z=!1,Y=0,k=i.getParameter(i.VERSION);k.indexOf("WebGL")!==-1?(Y=parseFloat(/^WebGL (\d)/.exec(k)[1]),z=Y>=1):k.indexOf("OpenGL ES")!==-1&&(Y=parseFloat(/^OpenGL ES (\d)/.exec(k)[1]),z=Y>=2);let re=null,te={},ie=i.getParameter(i.SCISSOR_BOX),De=i.getParameter(i.VIEWPORT),ke=new yt().fromArray(ie),je=new yt().fromArray(De);function Xe(U,he,me,Ee){let oe=new Uint8Array(4),j=i.createTexture();i.bindTexture(U,j),i.texParameteri(U,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(U,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Re=0;Re<me;Re++)U===i.TEXTURE_3D||U===i.TEXTURE_2D_ARRAY?i.texImage3D(he,0,i.RGBA,1,1,Ee,0,i.RGBA,i.UNSIGNED_BYTE,oe):i.texImage2D(he+Re,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,oe);return j}let $={};$[i.TEXTURE_2D]=Xe(i.TEXTURE_2D,i.TEXTURE_2D,1),$[i.TEXTURE_CUBE_MAP]=Xe(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),$[i.TEXTURE_2D_ARRAY]=Xe(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),$[i.TEXTURE_3D]=Xe(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),Q(i.DEPTH_TEST),a.setFunc(is),J(!1),Z(hh),Q(i.CULL_FACE),ne(fi);function Q(U){h[U]!==!0&&(i.enable(U),h[U]=!0)}function Me(U){h[U]!==!1&&(i.disable(U),h[U]=!1)}function Le(U,he){return d[U]!==he?(i.bindFramebuffer(U,he),d[U]=he,U===i.DRAW_FRAMEBUFFER&&(d[i.FRAMEBUFFER]=he),U===i.FRAMEBUFFER&&(d[i.DRAW_FRAMEBUFFER]=he),!0):!1}function Te(U,he){let me=u,Ee=!1;if(U){me=m.get(he),me===void 0&&(me=[],m.set(he,me));let oe=U.textures;if(me.length!==oe.length||me[0]!==i.COLOR_ATTACHMENT0){for(let j=0,Re=oe.length;j<Re;j++)me[j]=i.COLOR_ATTACHMENT0+j;me.length=oe.length,Ee=!0}}else me[0]!==i.BACK&&(me[0]=i.BACK,Ee=!0);Ee&&i.drawBuffers(me)}function et(U){return f!==U?(i.useProgram(U),f=U,!0):!1}let pt={[Ii]:i.FUNC_ADD,[Ed]:i.FUNC_SUBTRACT,[wd]:i.FUNC_REVERSE_SUBTRACT};pt[Td]=i.MIN,pt[Ad]=i.MAX;let R={[Cd]:i.ZERO,[Rd]:i.ONE,[Id]:i.SRC_COLOR,[Eo]:i.SRC_ALPHA,[Fd]:i.SRC_ALPHA_SATURATE,[Ud]:i.DST_COLOR,[Ld]:i.DST_ALPHA,[Pd]:i.ONE_MINUS_SRC_COLOR,[wo]:i.ONE_MINUS_SRC_ALPHA,[Nd]:i.ONE_MINUS_DST_COLOR,[Dd]:i.ONE_MINUS_DST_ALPHA,[Od]:i.CONSTANT_COLOR,[Bd]:i.ONE_MINUS_CONSTANT_COLOR,[zd]:i.CONSTANT_ALPHA,[kd]:i.ONE_MINUS_CONSTANT_ALPHA};function ne(U,he,me,Ee,oe,j,Re,We,mt,at){if(U===fi){y===!0&&(Me(i.BLEND),y=!1);return}if(y===!1&&(Q(i.BLEND),y=!0),U!==bd){if(U!==g||at!==b){if((p!==Ii||x!==Ii)&&(i.blendEquation(i.FUNC_ADD),p=Ii,x=Ii),at)switch(U){case ns:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case dh:i.blendFunc(i.ONE,i.ONE);break;case fh:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case ph:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:console.error("THREE.WebGLState: Invalid blending: ",U);break}else switch(U){case ns:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case dh:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case fh:console.error("THREE.WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case ph:console.error("THREE.WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:console.error("THREE.WebGLState: Invalid blending: ",U);break}v=null,_=null,T=null,A=null,C.set(0,0,0),P=0,g=U,b=at}return}oe=oe||he,j=j||me,Re=Re||Ee,(he!==p||oe!==x)&&(i.blendEquationSeparate(pt[he],pt[oe]),p=he,x=oe),(me!==v||Ee!==_||j!==T||Re!==A)&&(i.blendFuncSeparate(R[me],R[Ee],R[j],R[Re]),v=me,_=Ee,T=j,A=Re),(We.equals(C)===!1||mt!==P)&&(i.blendColor(We.r,We.g,We.b,mt),C.copy(We),P=mt),g=U,b=!1}function K(U,he){U.side===En?Me(i.CULL_FACE):Q(i.CULL_FACE);let me=U.side===Gt;he&&(me=!me),J(me),U.blending===ns&&U.transparent===!1?ne(fi):ne(U.blending,U.blendEquation,U.blendSrc,U.blendDst,U.blendEquationAlpha,U.blendSrcAlpha,U.blendDstAlpha,U.blendColor,U.blendAlpha,U.premultipliedAlpha),a.setFunc(U.depthFunc),a.setTest(U.depthTest),a.setMask(U.depthWrite),r.setMask(U.colorWrite);let Ee=U.stencilWrite;o.setTest(Ee),Ee&&(o.setMask(U.stencilWriteMask),o.setFunc(U.stencilFunc,U.stencilRef,U.stencilFuncMask),o.setOp(U.stencilFail,U.stencilZFail,U.stencilZPass)),se(U.polygonOffset,U.polygonOffsetFactor,U.polygonOffsetUnits),U.alphaToCoverage===!0?Q(i.SAMPLE_ALPHA_TO_COVERAGE):Me(i.SAMPLE_ALPHA_TO_COVERAGE)}function J(U){S!==U&&(U?i.frontFace(i.CW):i.frontFace(i.CCW),S=U)}function Z(U){U!==Md?(Q(i.CULL_FACE),U!==I&&(U===hh?i.cullFace(i.BACK):U===Sd?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):Me(i.CULL_FACE),I=U}function de(U){U!==F&&(z&&i.lineWidth(U),F=U)}function se(U,he,me){U?(Q(i.POLYGON_OFFSET_FILL),(V!==he||X!==me)&&(i.polygonOffset(he,me),V=he,X=me)):Me(i.POLYGON_OFFSET_FILL)}function fe(U){U?Q(i.SCISSOR_TEST):Me(i.SCISSOR_TEST)}function Ge(U){U===void 0&&(U=i.TEXTURE0+D-1),re!==U&&(i.activeTexture(U),re=U)}function He(U,he,me){me===void 0&&(re===null?me=i.TEXTURE0+D-1:me=re);let Ee=te[me];Ee===void 0&&(Ee={type:void 0,texture:void 0},te[me]=Ee),(Ee.type!==U||Ee.texture!==he)&&(re!==me&&(i.activeTexture(me),re=me),i.bindTexture(U,he||$[U]),Ee.type=U,Ee.texture=he)}function w(){let U=te[re];U!==void 0&&U.type!==void 0&&(i.bindTexture(U.type,null),U.type=void 0,U.texture=void 0)}function M(){try{i.compressedTexImage2D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function B(){try{i.compressedTexImage3D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function W(){try{i.texSubImage2D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function ee(){try{i.texSubImage3D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function q(){try{i.compressedTexSubImage2D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Ie(){try{i.compressedTexSubImage3D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function ue(){try{i.texStorage2D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Ae(){try{i.texStorage3D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Ce(){try{i.texImage2D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function ae(){try{i.texImage3D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function ve(U){ke.equals(U)===!1&&(i.scissor(U.x,U.y,U.z,U.w),ke.copy(U))}function Be(U){je.equals(U)===!1&&(i.viewport(U.x,U.y,U.z,U.w),je.copy(U))}function Pe(U,he){let me=c.get(he);me===void 0&&(me=new WeakMap,c.set(he,me));let Ee=me.get(U);Ee===void 0&&(Ee=i.getUniformBlockIndex(he,U.name),me.set(U,Ee))}function xe(U,he){let Ee=c.get(he).get(U);l.get(he)!==Ee&&(i.uniformBlockBinding(he,Ee,U.__bindingPointIndex),l.set(he,Ee))}function $e(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),a.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),h={},re=null,te={},d={},m=new WeakMap,u=[],f=null,y=!1,g=null,p=null,v=null,_=null,x=null,T=null,A=null,C=new Ve(0,0,0),P=0,b=!1,S=null,I=null,F=null,V=null,X=null,ke.set(0,0,i.canvas.width,i.canvas.height),je.set(0,0,i.canvas.width,i.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:Q,disable:Me,bindFramebuffer:Le,drawBuffers:Te,useProgram:et,setBlending:ne,setMaterial:K,setFlipSided:J,setCullFace:Z,setLineWidth:de,setPolygonOffset:se,setScissorTest:fe,activeTexture:Ge,bindTexture:He,unbindTexture:w,compressedTexImage2D:M,compressedTexImage3D:B,texImage2D:Ce,texImage3D:ae,updateUBOMapping:Pe,uniformBlockBinding:xe,texStorage2D:ue,texStorage3D:Ae,texSubImage2D:W,texSubImage3D:ee,compressedTexSubImage2D:q,compressedTexSubImage3D:Ie,scissor:ve,viewport:Be,reset:$e}}function j_(i,e,t,n,s,r,a){let o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new ge,h=new WeakMap,d,m=new WeakMap,u=!1;try{u=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function f(w,M){return u?new OffscreenCanvas(w,M):Vr("canvas")}function y(w,M,B){let W=1,ee=He(w);if((ee.width>B||ee.height>B)&&(W=B/Math.max(ee.width,ee.height)),W<1)if(typeof HTMLImageElement<"u"&&w instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&w instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&w instanceof ImageBitmap||typeof VideoFrame<"u"&&w instanceof VideoFrame){let q=Math.floor(W*ee.width),Ie=Math.floor(W*ee.height);d===void 0&&(d=f(q,Ie));let ue=M?f(q,Ie):d;return ue.width=q,ue.height=Ie,ue.getContext("2d").drawImage(w,0,0,q,Ie),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+ee.width+"x"+ee.height+") to ("+q+"x"+Ie+")."),ue}else return"data"in w&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+ee.width+"x"+ee.height+")."),w;return w}function g(w){return w.generateMipmaps}function p(w){i.generateMipmap(w)}function v(w){return w.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:w.isWebGL3DRenderTarget?i.TEXTURE_3D:w.isWebGLArrayRenderTarget||w.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function _(w,M,B,W,ee=!1){if(w!==null){if(i[w]!==void 0)return i[w];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+w+"'")}let q=M;if(M===i.RED&&(B===i.FLOAT&&(q=i.R32F),B===i.HALF_FLOAT&&(q=i.R16F),B===i.UNSIGNED_BYTE&&(q=i.R8)),M===i.RED_INTEGER&&(B===i.UNSIGNED_BYTE&&(q=i.R8UI),B===i.UNSIGNED_SHORT&&(q=i.R16UI),B===i.UNSIGNED_INT&&(q=i.R32UI),B===i.BYTE&&(q=i.R8I),B===i.SHORT&&(q=i.R16I),B===i.INT&&(q=i.R32I)),M===i.RG&&(B===i.FLOAT&&(q=i.RG32F),B===i.HALF_FLOAT&&(q=i.RG16F),B===i.UNSIGNED_BYTE&&(q=i.RG8)),M===i.RG_INTEGER&&(B===i.UNSIGNED_BYTE&&(q=i.RG8UI),B===i.UNSIGNED_SHORT&&(q=i.RG16UI),B===i.UNSIGNED_INT&&(q=i.RG32UI),B===i.BYTE&&(q=i.RG8I),B===i.SHORT&&(q=i.RG16I),B===i.INT&&(q=i.RG32I)),M===i.RGB_INTEGER&&(B===i.UNSIGNED_BYTE&&(q=i.RGB8UI),B===i.UNSIGNED_SHORT&&(q=i.RGB16UI),B===i.UNSIGNED_INT&&(q=i.RGB32UI),B===i.BYTE&&(q=i.RGB8I),B===i.SHORT&&(q=i.RGB16I),B===i.INT&&(q=i.RGB32I)),M===i.RGBA_INTEGER&&(B===i.UNSIGNED_BYTE&&(q=i.RGBA8UI),B===i.UNSIGNED_SHORT&&(q=i.RGBA16UI),B===i.UNSIGNED_INT&&(q=i.RGBA32UI),B===i.BYTE&&(q=i.RGBA8I),B===i.SHORT&&(q=i.RGBA16I),B===i.INT&&(q=i.RGBA32I)),M===i.RGB&&(B===i.UNSIGNED_INT_5_9_9_9_REV&&(q=i.RGB9_E5),B===i.UNSIGNED_INT_10F_11F_11F_REV&&(q=i.R11F_G11F_B10F)),M===i.RGBA){let Ie=ee?kr:it.getTransfer(W);B===i.FLOAT&&(q=i.RGBA32F),B===i.HALF_FLOAT&&(q=i.RGBA16F),B===i.UNSIGNED_BYTE&&(q=Ie===ot?i.SRGB8_ALPHA8:i.RGBA8),B===i.UNSIGNED_SHORT_4_4_4_4&&(q=i.RGBA4),B===i.UNSIGNED_SHORT_5_5_5_1&&(q=i.RGB5_A1)}return(q===i.R16F||q===i.R32F||q===i.RG16F||q===i.RG32F||q===i.RGBA16F||q===i.RGBA32F)&&e.get("EXT_color_buffer_float"),q}function x(w,M){let B;return w?M===null||M===Ui||M===sr?B=i.DEPTH24_STENCIL8:M===wn?B=i.DEPTH32F_STENCIL8:M===nr&&(B=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):M===null||M===Ui||M===sr?B=i.DEPTH_COMPONENT24:M===wn?B=i.DEPTH_COMPONENT32F:M===nr&&(B=i.DEPTH_COMPONENT16),B}function T(w,M){return g(w)===!0||w.isFramebufferTexture&&w.minFilter!==an&&w.minFilter!==Pn?Math.log2(Math.max(M.width,M.height))+1:w.mipmaps!==void 0&&w.mipmaps.length>0?w.mipmaps.length:w.isCompressedTexture&&Array.isArray(w.image)?M.mipmaps.length:1}function A(w){let M=w.target;M.removeEventListener("dispose",A),P(M),M.isVideoTexture&&h.delete(M)}function C(w){let M=w.target;M.removeEventListener("dispose",C),S(M)}function P(w){let M=n.get(w);if(M.__webglInit===void 0)return;let B=w.source,W=m.get(B);if(W){let ee=W[M.__cacheKey];ee.usedTimes--,ee.usedTimes===0&&b(w),Object.keys(W).length===0&&m.delete(B)}n.remove(w)}function b(w){let M=n.get(w);i.deleteTexture(M.__webglTexture);let B=w.source,W=m.get(B);delete W[M.__cacheKey],a.memory.textures--}function S(w){let M=n.get(w);if(w.depthTexture&&(w.depthTexture.dispose(),n.remove(w.depthTexture)),w.isWebGLCubeRenderTarget)for(let W=0;W<6;W++){if(Array.isArray(M.__webglFramebuffer[W]))for(let ee=0;ee<M.__webglFramebuffer[W].length;ee++)i.deleteFramebuffer(M.__webglFramebuffer[W][ee]);else i.deleteFramebuffer(M.__webglFramebuffer[W]);M.__webglDepthbuffer&&i.deleteRenderbuffer(M.__webglDepthbuffer[W])}else{if(Array.isArray(M.__webglFramebuffer))for(let W=0;W<M.__webglFramebuffer.length;W++)i.deleteFramebuffer(M.__webglFramebuffer[W]);else i.deleteFramebuffer(M.__webglFramebuffer);if(M.__webglDepthbuffer&&i.deleteRenderbuffer(M.__webglDepthbuffer),M.__webglMultisampledFramebuffer&&i.deleteFramebuffer(M.__webglMultisampledFramebuffer),M.__webglColorRenderbuffer)for(let W=0;W<M.__webglColorRenderbuffer.length;W++)M.__webglColorRenderbuffer[W]&&i.deleteRenderbuffer(M.__webglColorRenderbuffer[W]);M.__webglDepthRenderbuffer&&i.deleteRenderbuffer(M.__webglDepthRenderbuffer)}let B=w.textures;for(let W=0,ee=B.length;W<ee;W++){let q=n.get(B[W]);q.__webglTexture&&(i.deleteTexture(q.__webglTexture),a.memory.textures--),n.remove(B[W])}n.remove(w)}let I=0;function F(){I=0}function V(){let w=I;return w>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+w+" texture units while this GPU supports only "+s.maxTextures),I+=1,w}function X(w){let M=[];return M.push(w.wrapS),M.push(w.wrapT),M.push(w.wrapR||0),M.push(w.magFilter),M.push(w.minFilter),M.push(w.anisotropy),M.push(w.internalFormat),M.push(w.format),M.push(w.type),M.push(w.generateMipmaps),M.push(w.premultiplyAlpha),M.push(w.flipY),M.push(w.unpackAlignment),M.push(w.colorSpace),M.join()}function D(w,M){let B=n.get(w);if(w.isVideoTexture&&fe(w),w.isRenderTargetTexture===!1&&w.isExternalTexture!==!0&&w.version>0&&B.__version!==w.version){let W=w.image;if(W===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(W.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{$(B,w,M);return}}else w.isExternalTexture&&(B.__webglTexture=w.sourceTexture?w.sourceTexture:null);t.bindTexture(i.TEXTURE_2D,B.__webglTexture,i.TEXTURE0+M)}function z(w,M){let B=n.get(w);if(w.isRenderTargetTexture===!1&&w.version>0&&B.__version!==w.version){$(B,w,M);return}t.bindTexture(i.TEXTURE_2D_ARRAY,B.__webglTexture,i.TEXTURE0+M)}function Y(w,M){let B=n.get(w);if(w.isRenderTargetTexture===!1&&w.version>0&&B.__version!==w.version){$(B,w,M);return}t.bindTexture(i.TEXTURE_3D,B.__webglTexture,i.TEXTURE0+M)}function k(w,M){let B=n.get(w);if(w.version>0&&B.__version!==w.version){Q(B,w,M);return}t.bindTexture(i.TEXTURE_CUBE_MAP,B.__webglTexture,i.TEXTURE0+M)}let re={[To]:i.REPEAT,[Ri]:i.CLAMP_TO_EDGE,[Ao]:i.MIRRORED_REPEAT},te={[an]:i.NEAREST,[Jd]:i.NEAREST_MIPMAP_NEAREST,[Ea]:i.NEAREST_MIPMAP_LINEAR,[Pn]:i.LINEAR,[ll]:i.LINEAR_MIPMAP_NEAREST,[Di]:i.LINEAR_MIPMAP_LINEAR},ie={[sf]:i.NEVER,[hf]:i.ALWAYS,[rf]:i.LESS,[wh]:i.LEQUAL,[af]:i.EQUAL,[cf]:i.GEQUAL,[of]:i.GREATER,[lf]:i.NOTEQUAL};function De(w,M){if(M.type===wn&&e.has("OES_texture_float_linear")===!1&&(M.magFilter===Pn||M.magFilter===ll||M.magFilter===Ea||M.magFilter===Di||M.minFilter===Pn||M.minFilter===ll||M.minFilter===Ea||M.minFilter===Di)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(w,i.TEXTURE_WRAP_S,re[M.wrapS]),i.texParameteri(w,i.TEXTURE_WRAP_T,re[M.wrapT]),(w===i.TEXTURE_3D||w===i.TEXTURE_2D_ARRAY)&&i.texParameteri(w,i.TEXTURE_WRAP_R,re[M.wrapR]),i.texParameteri(w,i.TEXTURE_MAG_FILTER,te[M.magFilter]),i.texParameteri(w,i.TEXTURE_MIN_FILTER,te[M.minFilter]),M.compareFunction&&(i.texParameteri(w,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(w,i.TEXTURE_COMPARE_FUNC,ie[M.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(M.magFilter===an||M.minFilter!==Ea&&M.minFilter!==Di||M.type===wn&&e.has("OES_texture_float_linear")===!1)return;if(M.anisotropy>1||n.get(M).__currentAnisotropy){let B=e.get("EXT_texture_filter_anisotropic");i.texParameterf(w,B.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(M.anisotropy,s.getMaxAnisotropy())),n.get(M).__currentAnisotropy=M.anisotropy}}}function ke(w,M){let B=!1;w.__webglInit===void 0&&(w.__webglInit=!0,M.addEventListener("dispose",A));let W=M.source,ee=m.get(W);ee===void 0&&(ee={},m.set(W,ee));let q=X(M);if(q!==w.__cacheKey){ee[q]===void 0&&(ee[q]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,B=!0),ee[q].usedTimes++;let Ie=ee[w.__cacheKey];Ie!==void 0&&(ee[w.__cacheKey].usedTimes--,Ie.usedTimes===0&&b(M)),w.__cacheKey=q,w.__webglTexture=ee[q].texture}return B}function je(w,M,B){return Math.floor(Math.floor(w/B)/M)}function Xe(w,M,B,W){let q=w.updateRanges;if(q.length===0)t.texSubImage2D(i.TEXTURE_2D,0,0,0,M.width,M.height,B,W,M.data);else{q.sort((ae,ve)=>ae.start-ve.start);let Ie=0;for(let ae=1;ae<q.length;ae++){let ve=q[Ie],Be=q[ae],Pe=ve.start+ve.count,xe=je(Be.start,M.width,4),$e=je(ve.start,M.width,4);Be.start<=Pe+1&&xe===$e&&je(Be.start+Be.count-1,M.width,4)===xe?ve.count=Math.max(ve.count,Be.start+Be.count-ve.start):(++Ie,q[Ie]=Be)}q.length=Ie+1;let ue=i.getParameter(i.UNPACK_ROW_LENGTH),Ae=i.getParameter(i.UNPACK_SKIP_PIXELS),Ce=i.getParameter(i.UNPACK_SKIP_ROWS);i.pixelStorei(i.UNPACK_ROW_LENGTH,M.width);for(let ae=0,ve=q.length;ae<ve;ae++){let Be=q[ae],Pe=Math.floor(Be.start/4),xe=Math.ceil(Be.count/4),$e=Pe%M.width,U=Math.floor(Pe/M.width),he=xe,me=1;i.pixelStorei(i.UNPACK_SKIP_PIXELS,$e),i.pixelStorei(i.UNPACK_SKIP_ROWS,U),t.texSubImage2D(i.TEXTURE_2D,0,$e,U,he,me,B,W,M.data)}w.clearUpdateRanges(),i.pixelStorei(i.UNPACK_ROW_LENGTH,ue),i.pixelStorei(i.UNPACK_SKIP_PIXELS,Ae),i.pixelStorei(i.UNPACK_SKIP_ROWS,Ce)}}function $(w,M,B){let W=i.TEXTURE_2D;(M.isDataArrayTexture||M.isCompressedArrayTexture)&&(W=i.TEXTURE_2D_ARRAY),M.isData3DTexture&&(W=i.TEXTURE_3D);let ee=ke(w,M),q=M.source;t.bindTexture(W,w.__webglTexture,i.TEXTURE0+B);let Ie=n.get(q);if(q.version!==Ie.__version||ee===!0){t.activeTexture(i.TEXTURE0+B);let ue=it.getPrimaries(it.workingColorSpace),Ae=M.colorSpace===mi?null:it.getPrimaries(M.colorSpace),Ce=M.colorSpace===mi||ue===Ae?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,M.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,M.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ce);let ae=y(M.image,!1,s.maxTextureSize);ae=Ge(M,ae);let ve=r.convert(M.format,M.colorSpace),Be=r.convert(M.type),Pe=_(M.internalFormat,ve,Be,M.colorSpace,M.isVideoTexture);De(W,M);let xe,$e=M.mipmaps,U=M.isVideoTexture!==!0,he=Ie.__version===void 0||ee===!0,me=q.dataReady,Ee=T(M,ae);if(M.isDepthTexture)Pe=x(M.format===rr,M.type),he&&(U?t.texStorage2D(i.TEXTURE_2D,1,Pe,ae.width,ae.height):t.texImage2D(i.TEXTURE_2D,0,Pe,ae.width,ae.height,0,ve,Be,null));else if(M.isDataTexture)if($e.length>0){U&&he&&t.texStorage2D(i.TEXTURE_2D,Ee,Pe,$e[0].width,$e[0].height);for(let oe=0,j=$e.length;oe<j;oe++)xe=$e[oe],U?me&&t.texSubImage2D(i.TEXTURE_2D,oe,0,0,xe.width,xe.height,ve,Be,xe.data):t.texImage2D(i.TEXTURE_2D,oe,Pe,xe.width,xe.height,0,ve,Be,xe.data);M.generateMipmaps=!1}else U?(he&&t.texStorage2D(i.TEXTURE_2D,Ee,Pe,ae.width,ae.height),me&&Xe(M,ae,ve,Be)):t.texImage2D(i.TEXTURE_2D,0,Pe,ae.width,ae.height,0,ve,Be,ae.data);else if(M.isCompressedTexture)if(M.isCompressedArrayTexture){U&&he&&t.texStorage3D(i.TEXTURE_2D_ARRAY,Ee,Pe,$e[0].width,$e[0].height,ae.depth);for(let oe=0,j=$e.length;oe<j;oe++)if(xe=$e[oe],M.format!==_n)if(ve!==null)if(U){if(me)if(M.layerUpdates.size>0){let Re=Dh(xe.width,xe.height,M.format,M.type);for(let We of M.layerUpdates){let mt=xe.data.subarray(We*Re/xe.data.BYTES_PER_ELEMENT,(We+1)*Re/xe.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,oe,0,0,We,xe.width,xe.height,1,ve,mt)}M.clearLayerUpdates()}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,oe,0,0,0,xe.width,xe.height,ae.depth,ve,xe.data)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,oe,Pe,xe.width,xe.height,ae.depth,0,xe.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else U?me&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,oe,0,0,0,xe.width,xe.height,ae.depth,ve,Be,xe.data):t.texImage3D(i.TEXTURE_2D_ARRAY,oe,Pe,xe.width,xe.height,ae.depth,0,ve,Be,xe.data)}else{U&&he&&t.texStorage2D(i.TEXTURE_2D,Ee,Pe,$e[0].width,$e[0].height);for(let oe=0,j=$e.length;oe<j;oe++)xe=$e[oe],M.format!==_n?ve!==null?U?me&&t.compressedTexSubImage2D(i.TEXTURE_2D,oe,0,0,xe.width,xe.height,ve,xe.data):t.compressedTexImage2D(i.TEXTURE_2D,oe,Pe,xe.width,xe.height,0,xe.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):U?me&&t.texSubImage2D(i.TEXTURE_2D,oe,0,0,xe.width,xe.height,ve,Be,xe.data):t.texImage2D(i.TEXTURE_2D,oe,Pe,xe.width,xe.height,0,ve,Be,xe.data)}else if(M.isDataArrayTexture)if(U){if(he&&t.texStorage3D(i.TEXTURE_2D_ARRAY,Ee,Pe,ae.width,ae.height,ae.depth),me)if(M.layerUpdates.size>0){let oe=Dh(ae.width,ae.height,M.format,M.type);for(let j of M.layerUpdates){let Re=ae.data.subarray(j*oe/ae.data.BYTES_PER_ELEMENT,(j+1)*oe/ae.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,j,ae.width,ae.height,1,ve,Be,Re)}M.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,ae.width,ae.height,ae.depth,ve,Be,ae.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,Pe,ae.width,ae.height,ae.depth,0,ve,Be,ae.data);else if(M.isData3DTexture)U?(he&&t.texStorage3D(i.TEXTURE_3D,Ee,Pe,ae.width,ae.height,ae.depth),me&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,ae.width,ae.height,ae.depth,ve,Be,ae.data)):t.texImage3D(i.TEXTURE_3D,0,Pe,ae.width,ae.height,ae.depth,0,ve,Be,ae.data);else if(M.isFramebufferTexture){if(he)if(U)t.texStorage2D(i.TEXTURE_2D,Ee,Pe,ae.width,ae.height);else{let oe=ae.width,j=ae.height;for(let Re=0;Re<Ee;Re++)t.texImage2D(i.TEXTURE_2D,Re,Pe,oe,j,0,ve,Be,null),oe>>=1,j>>=1}}else if($e.length>0){if(U&&he){let oe=He($e[0]);t.texStorage2D(i.TEXTURE_2D,Ee,Pe,oe.width,oe.height)}for(let oe=0,j=$e.length;oe<j;oe++)xe=$e[oe],U?me&&t.texSubImage2D(i.TEXTURE_2D,oe,0,0,ve,Be,xe):t.texImage2D(i.TEXTURE_2D,oe,Pe,ve,Be,xe);M.generateMipmaps=!1}else if(U){if(he){let oe=He(ae);t.texStorage2D(i.TEXTURE_2D,Ee,Pe,oe.width,oe.height)}me&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,ve,Be,ae)}else t.texImage2D(i.TEXTURE_2D,0,Pe,ve,Be,ae);g(M)&&p(W),Ie.__version=q.version,M.onUpdate&&M.onUpdate(M)}w.__version=M.version}function Q(w,M,B){if(M.image.length!==6)return;let W=ke(w,M),ee=M.source;t.bindTexture(i.TEXTURE_CUBE_MAP,w.__webglTexture,i.TEXTURE0+B);let q=n.get(ee);if(ee.version!==q.__version||W===!0){t.activeTexture(i.TEXTURE0+B);let Ie=it.getPrimaries(it.workingColorSpace),ue=M.colorSpace===mi?null:it.getPrimaries(M.colorSpace),Ae=M.colorSpace===mi||Ie===ue?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,M.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,M.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ae);let Ce=M.isCompressedTexture||M.image[0].isCompressedTexture,ae=M.image[0]&&M.image[0].isDataTexture,ve=[];for(let j=0;j<6;j++)!Ce&&!ae?ve[j]=y(M.image[j],!0,s.maxCubemapSize):ve[j]=ae?M.image[j].image:M.image[j],ve[j]=Ge(M,ve[j]);let Be=ve[0],Pe=r.convert(M.format,M.colorSpace),xe=r.convert(M.type),$e=_(M.internalFormat,Pe,xe,M.colorSpace),U=M.isVideoTexture!==!0,he=q.__version===void 0||W===!0,me=ee.dataReady,Ee=T(M,Be);De(i.TEXTURE_CUBE_MAP,M);let oe;if(Ce){U&&he&&t.texStorage2D(i.TEXTURE_CUBE_MAP,Ee,$e,Be.width,Be.height);for(let j=0;j<6;j++){oe=ve[j].mipmaps;for(let Re=0;Re<oe.length;Re++){let We=oe[Re];M.format!==_n?Pe!==null?U?me&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,Re,0,0,We.width,We.height,Pe,We.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,Re,$e,We.width,We.height,0,We.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):U?me&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,Re,0,0,We.width,We.height,Pe,xe,We.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,Re,$e,We.width,We.height,0,Pe,xe,We.data)}}}else{if(oe=M.mipmaps,U&&he){oe.length>0&&Ee++;let j=He(ve[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,Ee,$e,j.width,j.height)}for(let j=0;j<6;j++)if(ae){U?me&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,0,0,ve[j].width,ve[j].height,Pe,xe,ve[j].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,$e,ve[j].width,ve[j].height,0,Pe,xe,ve[j].data);for(let Re=0;Re<oe.length;Re++){let mt=oe[Re].image[j].image;U?me&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,Re+1,0,0,mt.width,mt.height,Pe,xe,mt.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,Re+1,$e,mt.width,mt.height,0,Pe,xe,mt.data)}}else{U?me&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,0,0,Pe,xe,ve[j]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,$e,Pe,xe,ve[j]);for(let Re=0;Re<oe.length;Re++){let We=oe[Re];U?me&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,Re+1,0,0,Pe,xe,We.image[j]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,Re+1,$e,Pe,xe,We.image[j])}}}g(M)&&p(i.TEXTURE_CUBE_MAP),q.__version=ee.version,M.onUpdate&&M.onUpdate(M)}w.__version=M.version}function Me(w,M,B,W,ee,q){let Ie=r.convert(B.format,B.colorSpace),ue=r.convert(B.type),Ae=_(B.internalFormat,Ie,ue,B.colorSpace),Ce=n.get(M),ae=n.get(B);if(ae.__renderTarget=M,!Ce.__hasExternalTextures){let ve=Math.max(1,M.width>>q),Be=Math.max(1,M.height>>q);ee===i.TEXTURE_3D||ee===i.TEXTURE_2D_ARRAY?t.texImage3D(ee,q,Ae,ve,Be,M.depth,0,Ie,ue,null):t.texImage2D(ee,q,Ae,ve,Be,0,Ie,ue,null)}t.bindFramebuffer(i.FRAMEBUFFER,w),se(M)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,W,ee,ae.__webglTexture,0,de(M)):(ee===i.TEXTURE_2D||ee>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&ee<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,W,ee,ae.__webglTexture,q),t.bindFramebuffer(i.FRAMEBUFFER,null)}function Le(w,M,B){if(i.bindRenderbuffer(i.RENDERBUFFER,w),M.depthBuffer){let W=M.depthTexture,ee=W&&W.isDepthTexture?W.type:null,q=x(M.stencilBuffer,ee),Ie=M.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ue=de(M);se(M)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,ue,q,M.width,M.height):B?i.renderbufferStorageMultisample(i.RENDERBUFFER,ue,q,M.width,M.height):i.renderbufferStorage(i.RENDERBUFFER,q,M.width,M.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,Ie,i.RENDERBUFFER,w)}else{let W=M.textures;for(let ee=0;ee<W.length;ee++){let q=W[ee],Ie=r.convert(q.format,q.colorSpace),ue=r.convert(q.type),Ae=_(q.internalFormat,Ie,ue,q.colorSpace),Ce=de(M);B&&se(M)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,Ce,Ae,M.width,M.height):se(M)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Ce,Ae,M.width,M.height):i.renderbufferStorage(i.RENDERBUFFER,Ae,M.width,M.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function Te(w,M){if(M&&M.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(i.FRAMEBUFFER,w),!(M.depthTexture&&M.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");let W=n.get(M.depthTexture);W.__renderTarget=M,(!W.__webglTexture||M.depthTexture.image.width!==M.width||M.depthTexture.image.height!==M.height)&&(M.depthTexture.image.width=M.width,M.depthTexture.image.height=M.height,M.depthTexture.needsUpdate=!0),D(M.depthTexture,0);let ee=W.__webglTexture,q=de(M);if(M.depthTexture.format===Gs)se(M)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,ee,0,q):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,ee,0);else if(M.depthTexture.format===rr)se(M)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,ee,0,q):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,ee,0);else throw new Error("Unknown depthTexture format")}function et(w){let M=n.get(w),B=w.isWebGLCubeRenderTarget===!0;if(M.__boundDepthTexture!==w.depthTexture){let W=w.depthTexture;if(M.__depthDisposeCallback&&M.__depthDisposeCallback(),W){let ee=()=>{delete M.__boundDepthTexture,delete M.__depthDisposeCallback,W.removeEventListener("dispose",ee)};W.addEventListener("dispose",ee),M.__depthDisposeCallback=ee}M.__boundDepthTexture=W}if(w.depthTexture&&!M.__autoAllocateDepthBuffer){if(B)throw new Error("target.depthTexture not supported in Cube render targets");let W=w.texture.mipmaps;W&&W.length>0?Te(M.__webglFramebuffer[0],w):Te(M.__webglFramebuffer,w)}else if(B){M.__webglDepthbuffer=[];for(let W=0;W<6;W++)if(t.bindFramebuffer(i.FRAMEBUFFER,M.__webglFramebuffer[W]),M.__webglDepthbuffer[W]===void 0)M.__webglDepthbuffer[W]=i.createRenderbuffer(),Le(M.__webglDepthbuffer[W],w,!1);else{let ee=w.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,q=M.__webglDepthbuffer[W];i.bindRenderbuffer(i.RENDERBUFFER,q),i.framebufferRenderbuffer(i.FRAMEBUFFER,ee,i.RENDERBUFFER,q)}}else{let W=w.texture.mipmaps;if(W&&W.length>0?t.bindFramebuffer(i.FRAMEBUFFER,M.__webglFramebuffer[0]):t.bindFramebuffer(i.FRAMEBUFFER,M.__webglFramebuffer),M.__webglDepthbuffer===void 0)M.__webglDepthbuffer=i.createRenderbuffer(),Le(M.__webglDepthbuffer,w,!1);else{let ee=w.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,q=M.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,q),i.framebufferRenderbuffer(i.FRAMEBUFFER,ee,i.RENDERBUFFER,q)}}t.bindFramebuffer(i.FRAMEBUFFER,null)}function pt(w,M,B){let W=n.get(w);M!==void 0&&Me(W.__webglFramebuffer,w,w.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),B!==void 0&&et(w)}function R(w){let M=w.texture,B=n.get(w),W=n.get(M);w.addEventListener("dispose",C);let ee=w.textures,q=w.isWebGLCubeRenderTarget===!0,Ie=ee.length>1;if(Ie||(W.__webglTexture===void 0&&(W.__webglTexture=i.createTexture()),W.__version=M.version,a.memory.textures++),q){B.__webglFramebuffer=[];for(let ue=0;ue<6;ue++)if(M.mipmaps&&M.mipmaps.length>0){B.__webglFramebuffer[ue]=[];for(let Ae=0;Ae<M.mipmaps.length;Ae++)B.__webglFramebuffer[ue][Ae]=i.createFramebuffer()}else B.__webglFramebuffer[ue]=i.createFramebuffer()}else{if(M.mipmaps&&M.mipmaps.length>0){B.__webglFramebuffer=[];for(let ue=0;ue<M.mipmaps.length;ue++)B.__webglFramebuffer[ue]=i.createFramebuffer()}else B.__webglFramebuffer=i.createFramebuffer();if(Ie)for(let ue=0,Ae=ee.length;ue<Ae;ue++){let Ce=n.get(ee[ue]);Ce.__webglTexture===void 0&&(Ce.__webglTexture=i.createTexture(),a.memory.textures++)}if(w.samples>0&&se(w)===!1){B.__webglMultisampledFramebuffer=i.createFramebuffer(),B.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,B.__webglMultisampledFramebuffer);for(let ue=0;ue<ee.length;ue++){let Ae=ee[ue];B.__webglColorRenderbuffer[ue]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,B.__webglColorRenderbuffer[ue]);let Ce=r.convert(Ae.format,Ae.colorSpace),ae=r.convert(Ae.type),ve=_(Ae.internalFormat,Ce,ae,Ae.colorSpace,w.isXRRenderTarget===!0),Be=de(w);i.renderbufferStorageMultisample(i.RENDERBUFFER,Be,ve,w.width,w.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ue,i.RENDERBUFFER,B.__webglColorRenderbuffer[ue])}i.bindRenderbuffer(i.RENDERBUFFER,null),w.depthBuffer&&(B.__webglDepthRenderbuffer=i.createRenderbuffer(),Le(B.__webglDepthRenderbuffer,w,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(q){t.bindTexture(i.TEXTURE_CUBE_MAP,W.__webglTexture),De(i.TEXTURE_CUBE_MAP,M);for(let ue=0;ue<6;ue++)if(M.mipmaps&&M.mipmaps.length>0)for(let Ae=0;Ae<M.mipmaps.length;Ae++)Me(B.__webglFramebuffer[ue][Ae],w,M,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+ue,Ae);else Me(B.__webglFramebuffer[ue],w,M,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+ue,0);g(M)&&p(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(Ie){for(let ue=0,Ae=ee.length;ue<Ae;ue++){let Ce=ee[ue],ae=n.get(Ce),ve=i.TEXTURE_2D;(w.isWebGL3DRenderTarget||w.isWebGLArrayRenderTarget)&&(ve=w.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(ve,ae.__webglTexture),De(ve,Ce),Me(B.__webglFramebuffer,w,Ce,i.COLOR_ATTACHMENT0+ue,ve,0),g(Ce)&&p(ve)}t.unbindTexture()}else{let ue=i.TEXTURE_2D;if((w.isWebGL3DRenderTarget||w.isWebGLArrayRenderTarget)&&(ue=w.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(ue,W.__webglTexture),De(ue,M),M.mipmaps&&M.mipmaps.length>0)for(let Ae=0;Ae<M.mipmaps.length;Ae++)Me(B.__webglFramebuffer[Ae],w,M,i.COLOR_ATTACHMENT0,ue,Ae);else Me(B.__webglFramebuffer,w,M,i.COLOR_ATTACHMENT0,ue,0);g(M)&&p(ue),t.unbindTexture()}w.depthBuffer&&et(w)}function ne(w){let M=w.textures;for(let B=0,W=M.length;B<W;B++){let ee=M[B];if(g(ee)){let q=v(w),Ie=n.get(ee).__webglTexture;t.bindTexture(q,Ie),p(q),t.unbindTexture()}}}let K=[],J=[];function Z(w){if(w.samples>0){if(se(w)===!1){let M=w.textures,B=w.width,W=w.height,ee=i.COLOR_BUFFER_BIT,q=w.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Ie=n.get(w),ue=M.length>1;if(ue)for(let Ce=0;Ce<M.length;Ce++)t.bindFramebuffer(i.FRAMEBUFFER,Ie.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Ce,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,Ie.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Ce,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,Ie.__webglMultisampledFramebuffer);let Ae=w.texture.mipmaps;Ae&&Ae.length>0?t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Ie.__webglFramebuffer[0]):t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Ie.__webglFramebuffer);for(let Ce=0;Ce<M.length;Ce++){if(w.resolveDepthBuffer&&(w.depthBuffer&&(ee|=i.DEPTH_BUFFER_BIT),w.stencilBuffer&&w.resolveStencilBuffer&&(ee|=i.STENCIL_BUFFER_BIT)),ue){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,Ie.__webglColorRenderbuffer[Ce]);let ae=n.get(M[Ce]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,ae,0)}i.blitFramebuffer(0,0,B,W,0,0,B,W,ee,i.NEAREST),l===!0&&(K.length=0,J.length=0,K.push(i.COLOR_ATTACHMENT0+Ce),w.depthBuffer&&w.resolveDepthBuffer===!1&&(K.push(q),J.push(q),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,J)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,K))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),ue)for(let Ce=0;Ce<M.length;Ce++){t.bindFramebuffer(i.FRAMEBUFFER,Ie.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Ce,i.RENDERBUFFER,Ie.__webglColorRenderbuffer[Ce]);let ae=n.get(M[Ce]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,Ie.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Ce,i.TEXTURE_2D,ae,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Ie.__webglMultisampledFramebuffer)}else if(w.depthBuffer&&w.resolveDepthBuffer===!1&&l){let M=w.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[M])}}}function de(w){return Math.min(s.maxSamples,w.samples)}function se(w){let M=n.get(w);return w.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&M.__useRenderToTexture!==!1}function fe(w){let M=a.render.frame;h.get(w)!==M&&(h.set(w,M),w.update())}function Ge(w,M){let B=w.colorSpace,W=w.format,ee=w.type;return w.isCompressedTexture===!0||w.isVideoTexture===!0||B!==ss&&B!==mi&&(it.getTransfer(B)===ot?(W!==_n||ee!==On)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",B)),M}function He(w){return typeof HTMLImageElement<"u"&&w instanceof HTMLImageElement?(c.width=w.naturalWidth||w.width,c.height=w.naturalHeight||w.height):typeof VideoFrame<"u"&&w instanceof VideoFrame?(c.width=w.displayWidth,c.height=w.displayHeight):(c.width=w.width,c.height=w.height),c}this.allocateTextureUnit=V,this.resetTextureUnits=F,this.setTexture2D=D,this.setTexture2DArray=z,this.setTexture3D=Y,this.setTextureCube=k,this.rebindTextures=pt,this.setupRenderTarget=R,this.updateRenderTargetMipmap=ne,this.updateMultisampleRenderTarget=Z,this.setupDepthRenderbuffer=et,this.setupFrameBufferTexture=Me,this.useMultisampledRTT=se}function Q_(i,e){function t(n,s=mi){let r,a=it.getTransfer(s);if(n===On)return i.UNSIGNED_BYTE;if(n===hl)return i.UNSIGNED_SHORT_4_4_4_4;if(n===ul)return i.UNSIGNED_SHORT_5_5_5_1;if(n===_h)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===vh)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===yh)return i.BYTE;if(n===xh)return i.SHORT;if(n===nr)return i.UNSIGNED_SHORT;if(n===cl)return i.INT;if(n===Ui)return i.UNSIGNED_INT;if(n===wn)return i.FLOAT;if(n===ir)return i.HALF_FLOAT;if(n===Mh)return i.ALPHA;if(n===Sh)return i.RGB;if(n===_n)return i.RGBA;if(n===Gs)return i.DEPTH_COMPONENT;if(n===rr)return i.DEPTH_STENCIL;if(n===dl)return i.RED;if(n===fl)return i.RED_INTEGER;if(n===bh)return i.RG;if(n===pl)return i.RG_INTEGER;if(n===ml)return i.RGBA_INTEGER;if(n===wa||n===Ta||n===Aa||n===Ca)if(a===ot)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===wa)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Ta)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Aa)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Ca)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===wa)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Ta)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Aa)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Ca)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===gl||n===yl||n===xl||n===_l)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===gl)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===yl)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===xl)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===_l)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===vl||n===Ml||n===Sl)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(n===vl||n===Ml)return a===ot?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===Sl)return a===ot?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===bl||n===El||n===wl||n===Tl||n===Al||n===Cl||n===Rl||n===Il||n===Pl||n===Ll||n===Dl||n===Ul||n===Nl||n===Fl)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(n===bl)return a===ot?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===El)return a===ot?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===wl)return a===ot?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Tl)return a===ot?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Al)return a===ot?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Cl)return a===ot?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Rl)return a===ot?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Il)return a===ot?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Pl)return a===ot?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Ll)return a===ot?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Dl)return a===ot?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Ul)return a===ot?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Nl)return a===ot?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Fl)return a===ot?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Ol||n===Bl||n===zl)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(n===Ol)return a===ot?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Bl)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===zl)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===kl||n===Hl||n===Vl||n===Gl)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(n===kl)return r.COMPRESSED_RED_RGTC1_EXT;if(n===Hl)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Vl)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Gl)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===sr?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:t}}var ev=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,tv=`
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

}`,qh=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let n=new sa(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,n=new gn({vertexShader:ev,fragmentShader:tv,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new dt(new ma(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},$h=class extends Vn{constructor(e,t){super();let n=this,s=null,r=1,a=null,o="local-floor",l=1,c=null,h=null,d=null,m=null,u=null,f=null,y=typeof XRWebGLBinding<"u",g=new qh,p={},v=t.getContextAttributes(),_=null,x=null,T=[],A=[],C=new ge,P=null,b=new $t;b.viewport=new yt;let S=new $t;S.viewport=new yt;let I=[b,S],F=new Yo,V=null,X=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function($){let Q=T[$];return Q===void 0&&(Q=new Ys,T[$]=Q),Q.getTargetRaySpace()},this.getControllerGrip=function($){let Q=T[$];return Q===void 0&&(Q=new Ys,T[$]=Q),Q.getGripSpace()},this.getHand=function($){let Q=T[$];return Q===void 0&&(Q=new Ys,T[$]=Q),Q.getHandSpace()};function D($){let Q=A.indexOf($.inputSource);if(Q===-1)return;let Me=T[Q];Me!==void 0&&(Me.update($.inputSource,$.frame,c||a),Me.dispatchEvent({type:$.type,data:$.inputSource}))}function z(){s.removeEventListener("select",D),s.removeEventListener("selectstart",D),s.removeEventListener("selectend",D),s.removeEventListener("squeeze",D),s.removeEventListener("squeezestart",D),s.removeEventListener("squeezeend",D),s.removeEventListener("end",z),s.removeEventListener("inputsourceschange",Y);for(let $=0;$<T.length;$++){let Q=A[$];Q!==null&&(A[$]=null,T[$].disconnect(Q))}V=null,X=null,g.reset();for(let $ in p)delete p[$];e.setRenderTarget(_),u=null,m=null,d=null,s=null,x=null,Xe.stop(),n.isPresenting=!1,e.setPixelRatio(P),e.setSize(C.width,C.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function($){r=$,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function($){o=$,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function($){c=$},this.getBaseLayer=function(){return m!==null?m:u},this.getBinding=function(){return d===null&&y&&(d=new XRWebGLBinding(s,t)),d},this.getFrame=function(){return f},this.getSession=function(){return s},this.setSession=async function($){if(s=$,s!==null){if(_=e.getRenderTarget(),s.addEventListener("select",D),s.addEventListener("selectstart",D),s.addEventListener("selectend",D),s.addEventListener("squeeze",D),s.addEventListener("squeezestart",D),s.addEventListener("squeezeend",D),s.addEventListener("end",z),s.addEventListener("inputsourceschange",Y),v.xrCompatible!==!0&&await t.makeXRCompatible(),P=e.getPixelRatio(),e.getSize(C),y&&"createProjectionLayer"in XRWebGLBinding.prototype){let Me=null,Le=null,Te=null;v.depth&&(Te=v.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,Me=v.stencil?rr:Gs,Le=v.stencil?sr:Ui);let et={colorFormat:t.RGBA8,depthFormat:Te,scaleFactor:r};d=this.getBinding(),m=d.createProjectionLayer(et),s.updateRenderState({layers:[m]}),e.setPixelRatio(1),e.setSize(m.textureWidth,m.textureHeight,!1),x=new Gn(m.textureWidth,m.textureHeight,{format:_n,type:On,depthTexture:new ia(m.textureWidth,m.textureHeight,Le,void 0,void 0,void 0,void 0,void 0,void 0,Me),stencilBuffer:v.stencil,colorSpace:e.outputColorSpace,samples:v.antialias?4:0,resolveDepthBuffer:m.ignoreDepthValues===!1,resolveStencilBuffer:m.ignoreDepthValues===!1})}else{let Me={antialias:v.antialias,alpha:!0,depth:v.depth,stencil:v.stencil,framebufferScaleFactor:r};u=new XRWebGLLayer(s,t,Me),s.updateRenderState({baseLayer:u}),e.setPixelRatio(1),e.setSize(u.framebufferWidth,u.framebufferHeight,!1),x=new Gn(u.framebufferWidth,u.framebufferHeight,{format:_n,type:On,colorSpace:e.outputColorSpace,stencilBuffer:v.stencil,resolveDepthBuffer:u.ignoreDepthValues===!1,resolveStencilBuffer:u.ignoreDepthValues===!1})}x.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await s.requestReferenceSpace(o),Xe.setContext(s),Xe.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return g.getDepthTexture()};function Y($){for(let Q=0;Q<$.removed.length;Q++){let Me=$.removed[Q],Le=A.indexOf(Me);Le>=0&&(A[Le]=null,T[Le].disconnect(Me))}for(let Q=0;Q<$.added.length;Q++){let Me=$.added[Q],Le=A.indexOf(Me);if(Le===-1){for(let et=0;et<T.length;et++)if(et>=A.length){A.push(Me),Le=et;break}else if(A[et]===null){A[et]=Me,Le=et;break}if(Le===-1)break}let Te=T[Le];Te&&Te.connect(Me)}}let k=new L,re=new L;function te($,Q,Me){k.setFromMatrixPosition(Q.matrixWorld),re.setFromMatrixPosition(Me.matrixWorld);let Le=k.distanceTo(re),Te=Q.projectionMatrix.elements,et=Me.projectionMatrix.elements,pt=Te[14]/(Te[10]-1),R=Te[14]/(Te[10]+1),ne=(Te[9]+1)/Te[5],K=(Te[9]-1)/Te[5],J=(Te[8]-1)/Te[0],Z=(et[8]+1)/et[0],de=pt*J,se=pt*Z,fe=Le/(-J+Z),Ge=fe*-J;if(Q.matrixWorld.decompose($.position,$.quaternion,$.scale),$.translateX(Ge),$.translateZ(fe),$.matrixWorld.compose($.position,$.quaternion,$.scale),$.matrixWorldInverse.copy($.matrixWorld).invert(),Te[10]===-1)$.projectionMatrix.copy(Q.projectionMatrix),$.projectionMatrixInverse.copy(Q.projectionMatrixInverse);else{let He=pt+fe,w=R+fe,M=de-Ge,B=se+(Le-Ge),W=ne*R/w*He,ee=K*R/w*He;$.projectionMatrix.makePerspective(M,B,W,ee,He,w),$.projectionMatrixInverse.copy($.projectionMatrix).invert()}}function ie($,Q){Q===null?$.matrixWorld.copy($.matrix):$.matrixWorld.multiplyMatrices(Q.matrixWorld,$.matrix),$.matrixWorldInverse.copy($.matrixWorld).invert()}this.updateCamera=function($){if(s===null)return;let Q=$.near,Me=$.far;g.texture!==null&&(g.depthNear>0&&(Q=g.depthNear),g.depthFar>0&&(Me=g.depthFar)),F.near=S.near=b.near=Q,F.far=S.far=b.far=Me,(V!==F.near||X!==F.far)&&(s.updateRenderState({depthNear:F.near,depthFar:F.far}),V=F.near,X=F.far),F.layers.mask=$.layers.mask|6,b.layers.mask=F.layers.mask&3,S.layers.mask=F.layers.mask&5;let Le=$.parent,Te=F.cameras;ie(F,Le);for(let et=0;et<Te.length;et++)ie(Te[et],Le);Te.length===2?te(F,b,S):F.projectionMatrix.copy(b.projectionMatrix),De($,F,Le)};function De($,Q,Me){Me===null?$.matrix.copy(Q.matrixWorld):($.matrix.copy(Me.matrixWorld),$.matrix.invert(),$.matrix.multiply(Q.matrixWorld)),$.matrix.decompose($.position,$.quaternion,$.scale),$.updateMatrixWorld(!0),$.projectionMatrix.copy(Q.projectionMatrix),$.projectionMatrixInverse.copy(Q.projectionMatrixInverse),$.isPerspectiveCamera&&($.fov=Ws*2*Math.atan(1/$.projectionMatrix.elements[5]),$.zoom=1)}this.getCamera=function(){return F},this.getFoveation=function(){if(!(m===null&&u===null))return l},this.setFoveation=function($){l=$,m!==null&&(m.fixedFoveation=$),u!==null&&u.fixedFoveation!==void 0&&(u.fixedFoveation=$)},this.hasDepthSensing=function(){return g.texture!==null},this.getDepthSensingMesh=function(){return g.getMesh(F)},this.getCameraTexture=function($){return p[$]};let ke=null;function je($,Q){if(h=Q.getViewerPose(c||a),f=Q,h!==null){let Me=h.views;u!==null&&(e.setRenderTargetFramebuffer(x,u.framebuffer),e.setRenderTarget(x));let Le=!1;Me.length!==F.cameras.length&&(F.cameras.length=0,Le=!0);for(let R=0;R<Me.length;R++){let ne=Me[R],K=null;if(u!==null)K=u.getViewport(ne);else{let Z=d.getViewSubImage(m,ne);K=Z.viewport,R===0&&(e.setRenderTargetTextures(x,Z.colorTexture,Z.depthStencilTexture),e.setRenderTarget(x))}let J=I[R];J===void 0&&(J=new $t,J.layers.enable(R),J.viewport=new yt,I[R]=J),J.matrix.fromArray(ne.transform.matrix),J.matrix.decompose(J.position,J.quaternion,J.scale),J.projectionMatrix.fromArray(ne.projectionMatrix),J.projectionMatrixInverse.copy(J.projectionMatrix).invert(),J.viewport.set(K.x,K.y,K.width,K.height),R===0&&(F.matrix.copy(J.matrix),F.matrix.decompose(F.position,F.quaternion,F.scale)),Le===!0&&F.cameras.push(J)}let Te=s.enabledFeatures;if(Te&&Te.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&y){d=n.getBinding();let R=d.getDepthInformation(Me[0]);R&&R.isValid&&R.texture&&g.init(R,s.renderState)}if(Te&&Te.includes("camera-access")&&y){e.state.unbindTexture(),d=n.getBinding();for(let R=0;R<Me.length;R++){let ne=Me[R].camera;if(ne){let K=p[ne];K||(K=new sa,p[ne]=K);let J=d.getCameraImage(ne);K.sourceTexture=J}}}}for(let Me=0;Me<T.length;Me++){let Le=A[Me],Te=T[Me];Le!==null&&Te!==void 0&&Te.update(Le,Q,c||a)}ke&&ke($,Q),Q.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:Q}),f=null}let Xe=new Wf;Xe.setAnimationLoop(je),this.setAnimationLoop=function($){ke=$},this.dispose=function(){}}},ys=new pn,nv=new Ye;function iv(i,e){function t(g,p){g.matrixAutoUpdate===!0&&g.updateMatrix(),p.value.copy(g.matrix)}function n(g,p){p.color.getRGB(g.fogColor.value,Rh(i)),p.isFog?(g.fogNear.value=p.near,g.fogFar.value=p.far):p.isFogExp2&&(g.fogDensity.value=p.density)}function s(g,p,v,_,x){p.isMeshBasicMaterial||p.isMeshLambertMaterial?r(g,p):p.isMeshToonMaterial?(r(g,p),d(g,p)):p.isMeshPhongMaterial?(r(g,p),h(g,p)):p.isMeshStandardMaterial?(r(g,p),m(g,p),p.isMeshPhysicalMaterial&&u(g,p,x)):p.isMeshMatcapMaterial?(r(g,p),f(g,p)):p.isMeshDepthMaterial?r(g,p):p.isMeshDistanceMaterial?(r(g,p),y(g,p)):p.isMeshNormalMaterial?r(g,p):p.isLineBasicMaterial?(a(g,p),p.isLineDashedMaterial&&o(g,p)):p.isPointsMaterial?l(g,p,v,_):p.isSpriteMaterial?c(g,p):p.isShadowMaterial?(g.color.value.copy(p.color),g.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(g,p){g.opacity.value=p.opacity,p.color&&g.diffuse.value.copy(p.color),p.emissive&&g.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(g.map.value=p.map,t(p.map,g.mapTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,t(p.alphaMap,g.alphaMapTransform)),p.bumpMap&&(g.bumpMap.value=p.bumpMap,t(p.bumpMap,g.bumpMapTransform),g.bumpScale.value=p.bumpScale,p.side===Gt&&(g.bumpScale.value*=-1)),p.normalMap&&(g.normalMap.value=p.normalMap,t(p.normalMap,g.normalMapTransform),g.normalScale.value.copy(p.normalScale),p.side===Gt&&g.normalScale.value.negate()),p.displacementMap&&(g.displacementMap.value=p.displacementMap,t(p.displacementMap,g.displacementMapTransform),g.displacementScale.value=p.displacementScale,g.displacementBias.value=p.displacementBias),p.emissiveMap&&(g.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,g.emissiveMapTransform)),p.specularMap&&(g.specularMap.value=p.specularMap,t(p.specularMap,g.specularMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest);let v=e.get(p),_=v.envMap,x=v.envMapRotation;_&&(g.envMap.value=_,ys.copy(x),ys.x*=-1,ys.y*=-1,ys.z*=-1,_.isCubeTexture&&_.isRenderTargetTexture===!1&&(ys.y*=-1,ys.z*=-1),g.envMapRotation.value.setFromMatrix4(nv.makeRotationFromEuler(ys)),g.flipEnvMap.value=_.isCubeTexture&&_.isRenderTargetTexture===!1?-1:1,g.reflectivity.value=p.reflectivity,g.ior.value=p.ior,g.refractionRatio.value=p.refractionRatio),p.lightMap&&(g.lightMap.value=p.lightMap,g.lightMapIntensity.value=p.lightMapIntensity,t(p.lightMap,g.lightMapTransform)),p.aoMap&&(g.aoMap.value=p.aoMap,g.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,g.aoMapTransform))}function a(g,p){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,p.map&&(g.map.value=p.map,t(p.map,g.mapTransform))}function o(g,p){g.dashSize.value=p.dashSize,g.totalSize.value=p.dashSize+p.gapSize,g.scale.value=p.scale}function l(g,p,v,_){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,g.size.value=p.size*v,g.scale.value=_*.5,p.map&&(g.map.value=p.map,t(p.map,g.uvTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,t(p.alphaMap,g.alphaMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest)}function c(g,p){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,g.rotation.value=p.rotation,p.map&&(g.map.value=p.map,t(p.map,g.mapTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,t(p.alphaMap,g.alphaMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest)}function h(g,p){g.specular.value.copy(p.specular),g.shininess.value=Math.max(p.shininess,1e-4)}function d(g,p){p.gradientMap&&(g.gradientMap.value=p.gradientMap)}function m(g,p){g.metalness.value=p.metalness,p.metalnessMap&&(g.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,g.metalnessMapTransform)),g.roughness.value=p.roughness,p.roughnessMap&&(g.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,g.roughnessMapTransform)),p.envMap&&(g.envMapIntensity.value=p.envMapIntensity)}function u(g,p,v){g.ior.value=p.ior,p.sheen>0&&(g.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),g.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(g.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,g.sheenColorMapTransform)),p.sheenRoughnessMap&&(g.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,g.sheenRoughnessMapTransform))),p.clearcoat>0&&(g.clearcoat.value=p.clearcoat,g.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(g.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,g.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(g.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===Gt&&g.clearcoatNormalScale.value.negate())),p.dispersion>0&&(g.dispersion.value=p.dispersion),p.iridescence>0&&(g.iridescence.value=p.iridescence,g.iridescenceIOR.value=p.iridescenceIOR,g.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(g.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,g.iridescenceMapTransform)),p.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),p.transmission>0&&(g.transmission.value=p.transmission,g.transmissionSamplerMap.value=v.texture,g.transmissionSamplerSize.value.set(v.width,v.height),p.transmissionMap&&(g.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,g.transmissionMapTransform)),g.thickness.value=p.thickness,p.thicknessMap&&(g.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=p.attenuationDistance,g.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(g.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(g.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=p.specularIntensity,g.specularColor.value.copy(p.specularColor),p.specularColorMap&&(g.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,g.specularColorMapTransform)),p.specularIntensityMap&&(g.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,g.specularIntensityMapTransform))}function f(g,p){p.matcap&&(g.matcap.value=p.matcap)}function y(g,p){let v=e.get(p).light;g.referencePosition.value.setFromMatrixPosition(v.matrixWorld),g.nearDistance.value=v.shadow.camera.near,g.farDistance.value=v.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function sv(i,e,t,n){let s={},r={},a=[],o=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function l(v,_){let x=_.program;n.uniformBlockBinding(v,x)}function c(v,_){let x=s[v.id];x===void 0&&(f(v),x=h(v),s[v.id]=x,v.addEventListener("dispose",g));let T=_.program;n.updateUBOMapping(v,T);let A=e.render.frame;r[v.id]!==A&&(m(v),r[v.id]=A)}function h(v){let _=d();v.__bindingPointIndex=_;let x=i.createBuffer(),T=v.__size,A=v.usage;return i.bindBuffer(i.UNIFORM_BUFFER,x),i.bufferData(i.UNIFORM_BUFFER,T,A),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,_,x),x}function d(){for(let v=0;v<o;v++)if(a.indexOf(v)===-1)return a.push(v),v;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function m(v){let _=s[v.id],x=v.uniforms,T=v.__cache;i.bindBuffer(i.UNIFORM_BUFFER,_);for(let A=0,C=x.length;A<C;A++){let P=Array.isArray(x[A])?x[A]:[x[A]];for(let b=0,S=P.length;b<S;b++){let I=P[b];if(u(I,A,b,T)===!0){let F=I.__offset,V=Array.isArray(I.value)?I.value:[I.value],X=0;for(let D=0;D<V.length;D++){let z=V[D],Y=y(z);typeof z=="number"||typeof z=="boolean"?(I.__data[0]=z,i.bufferSubData(i.UNIFORM_BUFFER,F+X,I.__data)):z.isMatrix3?(I.__data[0]=z.elements[0],I.__data[1]=z.elements[1],I.__data[2]=z.elements[2],I.__data[3]=0,I.__data[4]=z.elements[3],I.__data[5]=z.elements[4],I.__data[6]=z.elements[5],I.__data[7]=0,I.__data[8]=z.elements[6],I.__data[9]=z.elements[7],I.__data[10]=z.elements[8],I.__data[11]=0):(z.toArray(I.__data,X),X+=Y.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,F,I.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function u(v,_,x,T){let A=v.value,C=_+"_"+x;if(T[C]===void 0)return typeof A=="number"||typeof A=="boolean"?T[C]=A:T[C]=A.clone(),!0;{let P=T[C];if(typeof A=="number"||typeof A=="boolean"){if(P!==A)return T[C]=A,!0}else if(P.equals(A)===!1)return P.copy(A),!0}return!1}function f(v){let _=v.uniforms,x=0,T=16;for(let C=0,P=_.length;C<P;C++){let b=Array.isArray(_[C])?_[C]:[_[C]];for(let S=0,I=b.length;S<I;S++){let F=b[S],V=Array.isArray(F.value)?F.value:[F.value];for(let X=0,D=V.length;X<D;X++){let z=V[X],Y=y(z),k=x%T,re=k%Y.boundary,te=k+re;x+=re,te!==0&&T-te<Y.storage&&(x+=T-te),F.__data=new Float32Array(Y.storage/Float32Array.BYTES_PER_ELEMENT),F.__offset=x,x+=Y.storage}}}let A=x%T;return A>0&&(x+=T-A),v.__size=x,v.__cache={},this}function y(v){let _={boundary:0,storage:0};return typeof v=="number"||typeof v=="boolean"?(_.boundary=4,_.storage=4):v.isVector2?(_.boundary=8,_.storage=8):v.isVector3||v.isColor?(_.boundary=16,_.storage=12):v.isVector4?(_.boundary=16,_.storage=16):v.isMatrix3?(_.boundary=48,_.storage=48):v.isMatrix4?(_.boundary=64,_.storage=64):v.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",v),_}function g(v){let _=v.target;_.removeEventListener("dispose",g);let x=a.indexOf(_.__bindingPointIndex);a.splice(x,1),i.deleteBuffer(s[_.id]),delete s[_.id],delete r[_.id]}function p(){for(let v in s)i.deleteBuffer(s[v]);a=[],s={},r={}}return{bind:l,update:c,dispose:p}}var Jl=class{constructor(e={}){let{canvas:t=uf(),context:n=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:d=!1,reversedDepthBuffer:m=!1}=e;this.isWebGLRenderer=!0;let u;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");u=n.getContextAttributes().alpha}else u=a;let f=new Uint32Array(4),y=new Int32Array(4),g=null,p=null,v=[],_=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=pi,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let x=this,T=!1;this._outputColorSpace=Qt;let A=0,C=0,P=null,b=-1,S=null,I=new yt,F=new yt,V=null,X=new Ve(0),D=0,z=t.width,Y=t.height,k=1,re=null,te=null,ie=new yt(0,0,z,Y),De=new yt(0,0,z,Y),ke=!1,je=new Pi,Xe=!1,$=!1,Q=new Ye,Me=new L,Le=new yt,Te={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},et=!1;function pt(){return P===null?k:1}let R=n;function ne(E,N){return t.getContext(E,N)}try{let E={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:d};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${"180"}`),t.addEventListener("webglcontextlost",me,!1),t.addEventListener("webglcontextrestored",Ee,!1),t.addEventListener("webglcontextcreationerror",oe,!1),R===null){let N="webgl2";if(R=ne(N,E),R===null)throw ne(N)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(E){throw console.error("THREE.WebGLRenderer: "+E.message),E}let K,J,Z,de,se,fe,Ge,He,w,M,B,W,ee,q,Ie,ue,Ae,Ce,ae,ve,Be,Pe,xe,$e;function U(){K=new Sx(R),K.init(),Pe=new Q_(R,K),J=new mx(R,K,e,Pe),Z=new K_(R,K),J.reversedDepthBuffer&&m&&Z.buffers.depth.setReversed(!0),de=new wx(R),se=new B_,fe=new j_(R,K,Z,se,J,Pe,de),Ge=new yx(x),He=new Mx(x),w=new Pg(R),xe=new fx(R,w),M=new bx(R,w,de,xe),B=new Ax(R,M,w,de),ae=new Tx(R,J,fe),ue=new gx(se),W=new O_(x,Ge,He,K,J,xe,ue),ee=new iv(x,se),q=new k_,Ie=new q_(K),Ce=new dx(x,Ge,He,Z,B,u,l),Ae=new Z_(x,B,J),$e=new sv(R,de,J,Z),ve=new px(R,K,de),Be=new Ex(R,K,de),de.programs=W.programs,x.capabilities=J,x.extensions=K,x.properties=se,x.renderLists=q,x.shadowMap=Ae,x.state=Z,x.info=de}U();let he=new $h(x,R);this.xr=he,this.getContext=function(){return R},this.getContextAttributes=function(){return R.getContextAttributes()},this.forceContextLoss=function(){let E=K.get("WEBGL_lose_context");E&&E.loseContext()},this.forceContextRestore=function(){let E=K.get("WEBGL_lose_context");E&&E.restoreContext()},this.getPixelRatio=function(){return k},this.setPixelRatio=function(E){E!==void 0&&(k=E,this.setSize(z,Y,!1))},this.getSize=function(E){return E.set(z,Y)},this.setSize=function(E,N,H=!0){if(he.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}z=E,Y=N,t.width=Math.floor(E*k),t.height=Math.floor(N*k),H===!0&&(t.style.width=E+"px",t.style.height=N+"px"),this.setViewport(0,0,E,N)},this.getDrawingBufferSize=function(E){return E.set(z*k,Y*k).floor()},this.setDrawingBufferSize=function(E,N,H){z=E,Y=N,k=H,t.width=Math.floor(E*H),t.height=Math.floor(N*H),this.setViewport(0,0,E,N)},this.getCurrentViewport=function(E){return E.copy(I)},this.getViewport=function(E){return E.copy(ie)},this.setViewport=function(E,N,H,G){E.isVector4?ie.set(E.x,E.y,E.z,E.w):ie.set(E,N,H,G),Z.viewport(I.copy(ie).multiplyScalar(k).round())},this.getScissor=function(E){return E.copy(De)},this.setScissor=function(E,N,H,G){E.isVector4?De.set(E.x,E.y,E.z,E.w):De.set(E,N,H,G),Z.scissor(F.copy(De).multiplyScalar(k).round())},this.getScissorTest=function(){return ke},this.setScissorTest=function(E){Z.setScissorTest(ke=E)},this.setOpaqueSort=function(E){re=E},this.setTransparentSort=function(E){te=E},this.getClearColor=function(E){return E.copy(Ce.getClearColor())},this.setClearColor=function(){Ce.setClearColor(...arguments)},this.getClearAlpha=function(){return Ce.getClearAlpha()},this.setClearAlpha=function(){Ce.setClearAlpha(...arguments)},this.clear=function(E=!0,N=!0,H=!0){let G=0;if(E){let O=!1;if(P!==null){let ce=P.texture.format;O=ce===ml||ce===pl||ce===fl}if(O){let ce=P.texture.type,_e=ce===On||ce===Ui||ce===nr||ce===sr||ce===hl||ce===ul,we=Ce.getClearColor(),be=Ce.getClearAlpha(),Oe=we.r,ze=we.g,Ue=we.b;_e?(f[0]=Oe,f[1]=ze,f[2]=Ue,f[3]=be,R.clearBufferuiv(R.COLOR,0,f)):(y[0]=Oe,y[1]=ze,y[2]=Ue,y[3]=be,R.clearBufferiv(R.COLOR,0,y))}else G|=R.COLOR_BUFFER_BIT}N&&(G|=R.DEPTH_BUFFER_BIT),H&&(G|=R.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),R.clear(G)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",me,!1),t.removeEventListener("webglcontextrestored",Ee,!1),t.removeEventListener("webglcontextcreationerror",oe,!1),Ce.dispose(),q.dispose(),Ie.dispose(),se.dispose(),Ge.dispose(),He.dispose(),B.dispose(),xe.dispose(),$e.dispose(),W.dispose(),he.dispose(),he.removeEventListener("sessionstart",kn),he.removeEventListener("sessionend",mu),zi.stop()};function me(E){E.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),T=!0}function Ee(){console.log("THREE.WebGLRenderer: Context Restored."),T=!1;let E=de.autoReset,N=Ae.enabled,H=Ae.autoUpdate,G=Ae.needsUpdate,O=Ae.type;U(),de.autoReset=E,Ae.enabled=N,Ae.autoUpdate=H,Ae.needsUpdate=G,Ae.type=O}function oe(E){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",E.statusMessage)}function j(E){let N=E.target;N.removeEventListener("dispose",j),Re(N)}function Re(E){We(E),se.remove(E)}function We(E){let N=se.get(E).programs;N!==void 0&&(N.forEach(function(H){W.releaseProgram(H)}),E.isShaderMaterial&&W.releaseShaderCache(E))}this.renderBufferDirect=function(E,N,H,G,O,ce){N===null&&(N=Te);let _e=O.isMesh&&O.matrixWorld.determinant()<0,we=Rp(E,N,H,G,O);Z.setMaterial(G,_e);let be=H.index,Oe=1;if(G.wireframe===!0){if(be=M.getWireframeAttribute(H),be===void 0)return;Oe=2}let ze=H.drawRange,Ue=H.attributes.position,tt=ze.start*Oe,lt=(ze.start+ze.count)*Oe;ce!==null&&(tt=Math.max(tt,ce.start*Oe),lt=Math.min(lt,(ce.start+ce.count)*Oe)),be!==null?(tt=Math.max(tt,0),lt=Math.min(lt,be.count)):Ue!=null&&(tt=Math.max(tt,0),lt=Math.min(lt,Ue.count));let Tt=lt-tt;if(Tt<0||Tt===1/0)return;xe.setup(O,G,we,H,be);let _t,ut=ve;if(be!==null&&(_t=w.get(be),ut=Be,ut.setIndex(_t)),O.isMesh)G.wireframe===!0?(Z.setLineWidth(G.wireframeLinewidth*pt()),ut.setMode(R.LINES)):ut.setMode(R.TRIANGLES);else if(O.isLine){let Ne=G.linewidth;Ne===void 0&&(Ne=1),Z.setLineWidth(Ne*pt()),O.isLineSegments?ut.setMode(R.LINES):O.isLineLoop?ut.setMode(R.LINE_LOOP):ut.setMode(R.LINE_STRIP)}else O.isPoints?ut.setMode(R.POINTS):O.isSprite&&ut.setMode(R.TRIANGLES);if(O.isBatchedMesh)if(O._multiDrawInstances!==null)Xs("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),ut.renderMultiDrawInstances(O._multiDrawStarts,O._multiDrawCounts,O._multiDrawCount,O._multiDrawInstances);else if(K.get("WEBGL_multi_draw"))ut.renderMultiDraw(O._multiDrawStarts,O._multiDrawCounts,O._multiDrawCount);else{let Ne=O._multiDrawStarts,bt=O._multiDrawCounts,rt=O._multiDrawCount,hn=be?w.get(be).bytesPerElement:1,Ss=se.get(G).currentProgram.getUniforms();for(let un=0;un<rt;un++)Ss.setValue(R,"_gl_DrawID",un),ut.render(Ne[un]/hn,bt[un])}else if(O.isInstancedMesh)ut.renderInstances(tt,Tt,O.count);else if(H.isInstancedBufferGeometry){let Ne=H._maxInstanceCount!==void 0?H._maxInstanceCount:1/0,bt=Math.min(H.instanceCount,Ne);ut.renderInstances(tt,Tt,bt)}else ut.render(tt,Tt)};function mt(E,N,H){E.transparent===!0&&E.side===En&&E.forceSinglePass===!1?(E.side=Gt,E.needsUpdate=!0,Ba(E,N,H),E.side=ai,E.needsUpdate=!0,Ba(E,N,H),E.side=En):Ba(E,N,H)}this.compile=function(E,N,H=null){H===null&&(H=E),p=Ie.get(H),p.init(N),_.push(p),H.traverseVisible(function(O){O.isLight&&O.layers.test(N.layers)&&(p.pushLight(O),O.castShadow&&p.pushShadow(O))}),E!==H&&E.traverseVisible(function(O){O.isLight&&O.layers.test(N.layers)&&(p.pushLight(O),O.castShadow&&p.pushShadow(O))}),p.setupLights();let G=new Set;return E.traverse(function(O){if(!(O.isMesh||O.isPoints||O.isLine||O.isSprite))return;let ce=O.material;if(ce)if(Array.isArray(ce))for(let _e=0;_e<ce.length;_e++){let we=ce[_e];mt(we,H,O),G.add(we)}else mt(ce,H,O),G.add(ce)}),p=_.pop(),G},this.compileAsync=function(E,N,H=null){let G=this.compile(E,N,H);return new Promise(O=>{function ce(){if(G.forEach(function(_e){se.get(_e).currentProgram.isReady()&&G.delete(_e)}),G.size===0){O(E);return}setTimeout(ce,10)}K.get("KHR_parallel_shader_compile")!==null?ce():setTimeout(ce,10)})};let at=null;function jn(E){at&&at(E)}function kn(){zi.stop()}function mu(){zi.start()}let zi=new Wf;zi.setAnimationLoop(jn),typeof self<"u"&&zi.setContext(self),this.setAnimationLoop=function(E){at=E,he.setAnimationLoop(E),E===null?zi.stop():zi.start()},he.addEventListener("sessionstart",kn),he.addEventListener("sessionend",mu),this.render=function(E,N){if(N!==void 0&&N.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(T===!0)return;if(E.matrixWorldAutoUpdate===!0&&E.updateMatrixWorld(),N.parent===null&&N.matrixWorldAutoUpdate===!0&&N.updateMatrixWorld(),he.enabled===!0&&he.isPresenting===!0&&(he.cameraAutoUpdate===!0&&he.updateCamera(N),N=he.getCamera()),E.isScene===!0&&E.onBeforeRender(x,E,N,P),p=Ie.get(E,_.length),p.init(N),_.push(p),Q.multiplyMatrices(N.projectionMatrix,N.matrixWorldInverse),je.setFromProjectionMatrix(Q,In,N.reversedDepth),$=this.localClippingEnabled,Xe=ue.init(this.clippingPlanes,$),g=q.get(E,v.length),g.init(),v.push(g),he.enabled===!0&&he.isPresenting===!0){let ce=x.xr.getDepthSensingMesh();ce!==null&&hc(ce,N,-1/0,x.sortObjects)}hc(E,N,0,x.sortObjects),g.finish(),x.sortObjects===!0&&g.sort(re,te),et=he.enabled===!1||he.isPresenting===!1||he.hasDepthSensing()===!1,et&&Ce.addToRenderList(g,E),this.info.render.frame++,Xe===!0&&ue.beginShadows();let H=p.state.shadowsArray;Ae.render(H,E,N),Xe===!0&&ue.endShadows(),this.info.autoReset===!0&&this.info.reset();let G=g.opaque,O=g.transmissive;if(p.setupLights(),N.isArrayCamera){let ce=N.cameras;if(O.length>0)for(let _e=0,we=ce.length;_e<we;_e++){let be=ce[_e];yu(G,O,E,be)}et&&Ce.render(E);for(let _e=0,we=ce.length;_e<we;_e++){let be=ce[_e];gu(g,E,be,be.viewport)}}else O.length>0&&yu(G,O,E,N),et&&Ce.render(E),gu(g,E,N);P!==null&&C===0&&(fe.updateMultisampleRenderTarget(P),fe.updateRenderTargetMipmap(P)),E.isScene===!0&&E.onAfterRender(x,E,N),xe.resetDefaultState(),b=-1,S=null,_.pop(),_.length>0?(p=_[_.length-1],Xe===!0&&ue.setGlobalState(x.clippingPlanes,p.state.camera)):p=null,v.pop(),v.length>0?g=v[v.length-1]:g=null};function hc(E,N,H,G){if(E.visible===!1)return;if(E.layers.test(N.layers)){if(E.isGroup)H=E.renderOrder;else if(E.isLOD)E.autoUpdate===!0&&E.update(N);else if(E.isLight)p.pushLight(E),E.castShadow&&p.pushShadow(E);else if(E.isSprite){if(!E.frustumCulled||je.intersectsSprite(E)){G&&Le.setFromMatrixPosition(E.matrixWorld).applyMatrix4(Q);let _e=B.update(E),we=E.material;we.visible&&g.push(E,_e,we,H,Le.z,null)}}else if((E.isMesh||E.isLine||E.isPoints)&&(!E.frustumCulled||je.intersectsObject(E))){let _e=B.update(E),we=E.material;if(G&&(E.boundingSphere!==void 0?(E.boundingSphere===null&&E.computeBoundingSphere(),Le.copy(E.boundingSphere.center)):(_e.boundingSphere===null&&_e.computeBoundingSphere(),Le.copy(_e.boundingSphere.center)),Le.applyMatrix4(E.matrixWorld).applyMatrix4(Q)),Array.isArray(we)){let be=_e.groups;for(let Oe=0,ze=be.length;Oe<ze;Oe++){let Ue=be[Oe],tt=we[Ue.materialIndex];tt&&tt.visible&&g.push(E,_e,tt,H,Le.z,Ue)}}else we.visible&&g.push(E,_e,we,H,Le.z,null)}}let ce=E.children;for(let _e=0,we=ce.length;_e<we;_e++)hc(ce[_e],N,H,G)}function gu(E,N,H,G){let O=E.opaque,ce=E.transmissive,_e=E.transparent;p.setupLightsView(H),Xe===!0&&ue.setGlobalState(x.clippingPlanes,H),G&&Z.viewport(I.copy(G)),O.length>0&&Oa(O,N,H),ce.length>0&&Oa(ce,N,H),_e.length>0&&Oa(_e,N,H),Z.buffers.depth.setTest(!0),Z.buffers.depth.setMask(!0),Z.buffers.color.setMask(!0),Z.setPolygonOffset(!1)}function yu(E,N,H,G){if((H.isScene===!0?H.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[G.id]===void 0&&(p.state.transmissionRenderTarget[G.id]=new Gn(1,1,{generateMipmaps:!0,type:K.has("EXT_color_buffer_half_float")||K.has("EXT_color_buffer_float")?ir:On,minFilter:Di,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:it.workingColorSpace}));let ce=p.state.transmissionRenderTarget[G.id],_e=G.viewport||I;ce.setSize(_e.z*x.transmissionResolutionScale,_e.w*x.transmissionResolutionScale);let we=x.getRenderTarget(),be=x.getActiveCubeFace(),Oe=x.getActiveMipmapLevel();x.setRenderTarget(ce),x.getClearColor(X),D=x.getClearAlpha(),D<1&&x.setClearColor(16777215,.5),x.clear(),et&&Ce.render(H);let ze=x.toneMapping;x.toneMapping=pi;let Ue=G.viewport;if(G.viewport!==void 0&&(G.viewport=void 0),p.setupLightsView(G),Xe===!0&&ue.setGlobalState(x.clippingPlanes,G),Oa(E,H,G),fe.updateMultisampleRenderTarget(ce),fe.updateRenderTargetMipmap(ce),K.has("WEBGL_multisampled_render_to_texture")===!1){let tt=!1;for(let lt=0,Tt=N.length;lt<Tt;lt++){let _t=N[lt],ut=_t.object,Ne=_t.geometry,bt=_t.material,rt=_t.group;if(bt.side===En&&ut.layers.test(G.layers)){let hn=bt.side;bt.side=Gt,bt.needsUpdate=!0,xu(ut,H,G,Ne,bt,rt),bt.side=hn,bt.needsUpdate=!0,tt=!0}}tt===!0&&(fe.updateMultisampleRenderTarget(ce),fe.updateRenderTargetMipmap(ce))}x.setRenderTarget(we,be,Oe),x.setClearColor(X,D),Ue!==void 0&&(G.viewport=Ue),x.toneMapping=ze}function Oa(E,N,H){let G=N.isScene===!0?N.overrideMaterial:null;for(let O=0,ce=E.length;O<ce;O++){let _e=E[O],we=_e.object,be=_e.geometry,Oe=_e.group,ze=_e.material;ze.allowOverride===!0&&G!==null&&(ze=G),we.layers.test(H.layers)&&xu(we,N,H,be,ze,Oe)}}function xu(E,N,H,G,O,ce){E.onBeforeRender(x,N,H,G,O,ce),E.modelViewMatrix.multiplyMatrices(H.matrixWorldInverse,E.matrixWorld),E.normalMatrix.getNormalMatrix(E.modelViewMatrix),O.onBeforeRender(x,N,H,G,E,ce),O.transparent===!0&&O.side===En&&O.forceSinglePass===!1?(O.side=Gt,O.needsUpdate=!0,x.renderBufferDirect(H,N,G,O,E,ce),O.side=ai,O.needsUpdate=!0,x.renderBufferDirect(H,N,G,O,E,ce),O.side=En):x.renderBufferDirect(H,N,G,O,E,ce),E.onAfterRender(x,N,H,G,O,ce)}function Ba(E,N,H){N.isScene!==!0&&(N=Te);let G=se.get(E),O=p.state.lights,ce=p.state.shadowsArray,_e=O.state.version,we=W.getParameters(E,O.state,ce,N,H),be=W.getProgramCacheKey(we),Oe=G.programs;G.environment=E.isMeshStandardMaterial?N.environment:null,G.fog=N.fog,G.envMap=(E.isMeshStandardMaterial?He:Ge).get(E.envMap||G.environment),G.envMapRotation=G.environment!==null&&E.envMap===null?N.environmentRotation:E.envMapRotation,Oe===void 0&&(E.addEventListener("dispose",j),Oe=new Map,G.programs=Oe);let ze=Oe.get(be);if(ze!==void 0){if(G.currentProgram===ze&&G.lightsStateVersion===_e)return vu(E,we),ze}else we.uniforms=W.getUniforms(E),E.onBeforeCompile(we,x),ze=W.acquireProgram(we,be),Oe.set(be,ze),G.uniforms=we.uniforms;let Ue=G.uniforms;return(!E.isShaderMaterial&&!E.isRawShaderMaterial||E.clipping===!0)&&(Ue.clippingPlanes=ue.uniform),vu(E,we),G.needsLights=Pp(E),G.lightsStateVersion=_e,G.needsLights&&(Ue.ambientLightColor.value=O.state.ambient,Ue.lightProbe.value=O.state.probe,Ue.directionalLights.value=O.state.directional,Ue.directionalLightShadows.value=O.state.directionalShadow,Ue.spotLights.value=O.state.spot,Ue.spotLightShadows.value=O.state.spotShadow,Ue.rectAreaLights.value=O.state.rectArea,Ue.ltc_1.value=O.state.rectAreaLTC1,Ue.ltc_2.value=O.state.rectAreaLTC2,Ue.pointLights.value=O.state.point,Ue.pointLightShadows.value=O.state.pointShadow,Ue.hemisphereLights.value=O.state.hemi,Ue.directionalShadowMap.value=O.state.directionalShadowMap,Ue.directionalShadowMatrix.value=O.state.directionalShadowMatrix,Ue.spotShadowMap.value=O.state.spotShadowMap,Ue.spotLightMatrix.value=O.state.spotLightMatrix,Ue.spotLightMap.value=O.state.spotLightMap,Ue.pointShadowMap.value=O.state.pointShadowMap,Ue.pointShadowMatrix.value=O.state.pointShadowMatrix),G.currentProgram=ze,G.uniformsList=null,ze}function _u(E){if(E.uniformsList===null){let N=E.currentProgram.getUniforms();E.uniformsList=cr.seqWithValue(N.seq,E.uniforms)}return E.uniformsList}function vu(E,N){let H=se.get(E);H.outputColorSpace=N.outputColorSpace,H.batching=N.batching,H.batchingColor=N.batchingColor,H.instancing=N.instancing,H.instancingColor=N.instancingColor,H.instancingMorph=N.instancingMorph,H.skinning=N.skinning,H.morphTargets=N.morphTargets,H.morphNormals=N.morphNormals,H.morphColors=N.morphColors,H.morphTargetsCount=N.morphTargetsCount,H.numClippingPlanes=N.numClippingPlanes,H.numIntersection=N.numClipIntersection,H.vertexAlphas=N.vertexAlphas,H.vertexTangents=N.vertexTangents,H.toneMapping=N.toneMapping}function Rp(E,N,H,G,O){N.isScene!==!0&&(N=Te),fe.resetTextureUnits();let ce=N.fog,_e=G.isMeshStandardMaterial?N.environment:null,we=P===null?x.outputColorSpace:P.isXRRenderTarget===!0?P.texture.colorSpace:ss,be=(G.isMeshStandardMaterial?He:Ge).get(G.envMap||_e),Oe=G.vertexColors===!0&&!!H.attributes.color&&H.attributes.color.itemSize===4,ze=!!H.attributes.tangent&&(!!G.normalMap||G.anisotropy>0),Ue=!!H.morphAttributes.position,tt=!!H.morphAttributes.normal,lt=!!H.morphAttributes.color,Tt=pi;G.toneMapped&&(P===null||P.isXRRenderTarget===!0)&&(Tt=x.toneMapping);let _t=H.morphAttributes.position||H.morphAttributes.normal||H.morphAttributes.color,ut=_t!==void 0?_t.length:0,Ne=se.get(G),bt=p.state.lights;if(Xe===!0&&($===!0||E!==S)){let Kt=E===S&&G.id===b;ue.setState(G,E,Kt)}let rt=!1;G.version===Ne.__version?(Ne.needsLights&&Ne.lightsStateVersion!==bt.state.version||Ne.outputColorSpace!==we||O.isBatchedMesh&&Ne.batching===!1||!O.isBatchedMesh&&Ne.batching===!0||O.isBatchedMesh&&Ne.batchingColor===!0&&O.colorTexture===null||O.isBatchedMesh&&Ne.batchingColor===!1&&O.colorTexture!==null||O.isInstancedMesh&&Ne.instancing===!1||!O.isInstancedMesh&&Ne.instancing===!0||O.isSkinnedMesh&&Ne.skinning===!1||!O.isSkinnedMesh&&Ne.skinning===!0||O.isInstancedMesh&&Ne.instancingColor===!0&&O.instanceColor===null||O.isInstancedMesh&&Ne.instancingColor===!1&&O.instanceColor!==null||O.isInstancedMesh&&Ne.instancingMorph===!0&&O.morphTexture===null||O.isInstancedMesh&&Ne.instancingMorph===!1&&O.morphTexture!==null||Ne.envMap!==be||G.fog===!0&&Ne.fog!==ce||Ne.numClippingPlanes!==void 0&&(Ne.numClippingPlanes!==ue.numPlanes||Ne.numIntersection!==ue.numIntersection)||Ne.vertexAlphas!==Oe||Ne.vertexTangents!==ze||Ne.morphTargets!==Ue||Ne.morphNormals!==tt||Ne.morphColors!==lt||Ne.toneMapping!==Tt||Ne.morphTargetsCount!==ut)&&(rt=!0):(rt=!0,Ne.__version=G.version);let hn=Ne.currentProgram;rt===!0&&(hn=Ba(G,N,O));let Ss=!1,un=!1,_r=!1,Et=hn.getUniforms(),Mn=Ne.uniforms;if(Z.useProgram(hn.program)&&(Ss=!0,un=!0,_r=!0),G.id!==b&&(b=G.id,un=!0),Ss||S!==E){Z.buffers.depth.getReversed()&&E.reversedDepth!==!0&&(E._reversedDepth=!0,E.updateProjectionMatrix()),Et.setValue(R,"projectionMatrix",E.projectionMatrix),Et.setValue(R,"viewMatrix",E.matrixWorldInverse);let sn=Et.map.cameraPosition;sn!==void 0&&sn.setValue(R,Me.setFromMatrixPosition(E.matrixWorld)),J.logarithmicDepthBuffer&&Et.setValue(R,"logDepthBufFC",2/(Math.log(E.far+1)/Math.LN2)),(G.isMeshPhongMaterial||G.isMeshToonMaterial||G.isMeshLambertMaterial||G.isMeshBasicMaterial||G.isMeshStandardMaterial||G.isShaderMaterial)&&Et.setValue(R,"isOrthographic",E.isOrthographicCamera===!0),S!==E&&(S=E,un=!0,_r=!0)}if(O.isSkinnedMesh){Et.setOptional(R,O,"bindMatrix"),Et.setOptional(R,O,"bindMatrixInverse");let Kt=O.skeleton;Kt&&(Kt.boneTexture===null&&Kt.computeBoneTexture(),Et.setValue(R,"boneTexture",Kt.boneTexture,fe))}O.isBatchedMesh&&(Et.setOptional(R,O,"batchingTexture"),Et.setValue(R,"batchingTexture",O._matricesTexture,fe),Et.setOptional(R,O,"batchingIdTexture"),Et.setValue(R,"batchingIdTexture",O._indirectTexture,fe),Et.setOptional(R,O,"batchingColorTexture"),O._colorsTexture!==null&&Et.setValue(R,"batchingColorTexture",O._colorsTexture,fe));let Sn=H.morphAttributes;if((Sn.position!==void 0||Sn.normal!==void 0||Sn.color!==void 0)&&ae.update(O,H,hn),(un||Ne.receiveShadow!==O.receiveShadow)&&(Ne.receiveShadow=O.receiveShadow,Et.setValue(R,"receiveShadow",O.receiveShadow)),G.isMeshGouraudMaterial&&G.envMap!==null&&(Mn.envMap.value=be,Mn.flipEnvMap.value=be.isCubeTexture&&be.isRenderTargetTexture===!1?-1:1),G.isMeshStandardMaterial&&G.envMap===null&&N.environment!==null&&(Mn.envMapIntensity.value=N.environmentIntensity),un&&(Et.setValue(R,"toneMappingExposure",x.toneMappingExposure),Ne.needsLights&&Ip(Mn,_r),ce&&G.fog===!0&&ee.refreshFogUniforms(Mn,ce),ee.refreshMaterialUniforms(Mn,G,k,Y,p.state.transmissionRenderTarget[E.id]),cr.upload(R,_u(Ne),Mn,fe)),G.isShaderMaterial&&G.uniformsNeedUpdate===!0&&(cr.upload(R,_u(Ne),Mn,fe),G.uniformsNeedUpdate=!1),G.isSpriteMaterial&&Et.setValue(R,"center",O.center),Et.setValue(R,"modelViewMatrix",O.modelViewMatrix),Et.setValue(R,"normalMatrix",O.normalMatrix),Et.setValue(R,"modelMatrix",O.matrixWorld),G.isShaderMaterial||G.isRawShaderMaterial){let Kt=G.uniformsGroups;for(let sn=0,uc=Kt.length;sn<uc;sn++){let ki=Kt[sn];$e.update(ki,hn),$e.bind(ki,hn)}}return hn}function Ip(E,N){E.ambientLightColor.needsUpdate=N,E.lightProbe.needsUpdate=N,E.directionalLights.needsUpdate=N,E.directionalLightShadows.needsUpdate=N,E.pointLights.needsUpdate=N,E.pointLightShadows.needsUpdate=N,E.spotLights.needsUpdate=N,E.spotLightShadows.needsUpdate=N,E.rectAreaLights.needsUpdate=N,E.hemisphereLights.needsUpdate=N}function Pp(E){return E.isMeshLambertMaterial||E.isMeshToonMaterial||E.isMeshPhongMaterial||E.isMeshStandardMaterial||E.isShadowMaterial||E.isShaderMaterial&&E.lights===!0}this.getActiveCubeFace=function(){return A},this.getActiveMipmapLevel=function(){return C},this.getRenderTarget=function(){return P},this.setRenderTargetTextures=function(E,N,H){let G=se.get(E);G.__autoAllocateDepthBuffer=E.resolveDepthBuffer===!1,G.__autoAllocateDepthBuffer===!1&&(G.__useRenderToTexture=!1),se.get(E.texture).__webglTexture=N,se.get(E.depthTexture).__webglTexture=G.__autoAllocateDepthBuffer?void 0:H,G.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(E,N){let H=se.get(E);H.__webglFramebuffer=N,H.__useDefaultFramebuffer=N===void 0};let Lp=R.createFramebuffer();this.setRenderTarget=function(E,N=0,H=0){P=E,A=N,C=H;let G=!0,O=null,ce=!1,_e=!1;if(E){let be=se.get(E);if(be.__useDefaultFramebuffer!==void 0)Z.bindFramebuffer(R.FRAMEBUFFER,null),G=!1;else if(be.__webglFramebuffer===void 0)fe.setupRenderTarget(E);else if(be.__hasExternalTextures)fe.rebindTextures(E,se.get(E.texture).__webglTexture,se.get(E.depthTexture).__webglTexture);else if(E.depthBuffer){let Ue=E.depthTexture;if(be.__boundDepthTexture!==Ue){if(Ue!==null&&se.has(Ue)&&(E.width!==Ue.image.width||E.height!==Ue.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");fe.setupDepthRenderbuffer(E)}}let Oe=E.texture;(Oe.isData3DTexture||Oe.isDataArrayTexture||Oe.isCompressedArrayTexture)&&(_e=!0);let ze=se.get(E).__webglFramebuffer;E.isWebGLCubeRenderTarget?(Array.isArray(ze[N])?O=ze[N][H]:O=ze[N],ce=!0):E.samples>0&&fe.useMultisampledRTT(E)===!1?O=se.get(E).__webglMultisampledFramebuffer:Array.isArray(ze)?O=ze[H]:O=ze,I.copy(E.viewport),F.copy(E.scissor),V=E.scissorTest}else I.copy(ie).multiplyScalar(k).floor(),F.copy(De).multiplyScalar(k).floor(),V=ke;if(H!==0&&(O=Lp),Z.bindFramebuffer(R.FRAMEBUFFER,O)&&G&&Z.drawBuffers(E,O),Z.viewport(I),Z.scissor(F),Z.setScissorTest(V),ce){let be=se.get(E.texture);R.framebufferTexture2D(R.FRAMEBUFFER,R.COLOR_ATTACHMENT0,R.TEXTURE_CUBE_MAP_POSITIVE_X+N,be.__webglTexture,H)}else if(_e){let be=N;for(let Oe=0;Oe<E.textures.length;Oe++){let ze=se.get(E.textures[Oe]);R.framebufferTextureLayer(R.FRAMEBUFFER,R.COLOR_ATTACHMENT0+Oe,ze.__webglTexture,H,be)}}else if(E!==null&&H!==0){let be=se.get(E.texture);R.framebufferTexture2D(R.FRAMEBUFFER,R.COLOR_ATTACHMENT0,R.TEXTURE_2D,be.__webglTexture,H)}b=-1},this.readRenderTargetPixels=function(E,N,H,G,O,ce,_e,we=0){if(!(E&&E.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let be=se.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&_e!==void 0&&(be=be[_e]),be){Z.bindFramebuffer(R.FRAMEBUFFER,be);try{let Oe=E.textures[we],ze=Oe.format,Ue=Oe.type;if(!J.textureFormatReadable(ze)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!J.textureTypeReadable(Ue)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}N>=0&&N<=E.width-G&&H>=0&&H<=E.height-O&&(E.textures.length>1&&R.readBuffer(R.COLOR_ATTACHMENT0+we),R.readPixels(N,H,G,O,Pe.convert(ze),Pe.convert(Ue),ce))}finally{let Oe=P!==null?se.get(P).__webglFramebuffer:null;Z.bindFramebuffer(R.FRAMEBUFFER,Oe)}}},this.readRenderTargetPixelsAsync=async function(E,N,H,G,O,ce,_e,we=0){if(!(E&&E.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let be=se.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&_e!==void 0&&(be=be[_e]),be)if(N>=0&&N<=E.width-G&&H>=0&&H<=E.height-O){Z.bindFramebuffer(R.FRAMEBUFFER,be);let Oe=E.textures[we],ze=Oe.format,Ue=Oe.type;if(!J.textureFormatReadable(ze))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!J.textureTypeReadable(Ue))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let tt=R.createBuffer();R.bindBuffer(R.PIXEL_PACK_BUFFER,tt),R.bufferData(R.PIXEL_PACK_BUFFER,ce.byteLength,R.STREAM_READ),E.textures.length>1&&R.readBuffer(R.COLOR_ATTACHMENT0+we),R.readPixels(N,H,G,O,Pe.convert(ze),Pe.convert(Ue),0);let lt=P!==null?se.get(P).__webglFramebuffer:null;Z.bindFramebuffer(R.FRAMEBUFFER,lt);let Tt=R.fenceSync(R.SYNC_GPU_COMMANDS_COMPLETE,0);return R.flush(),await df(R,Tt,4),R.bindBuffer(R.PIXEL_PACK_BUFFER,tt),R.getBufferSubData(R.PIXEL_PACK_BUFFER,0,ce),R.deleteBuffer(tt),R.deleteSync(Tt),ce}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(E,N=null,H=0){let G=Math.pow(2,-H),O=Math.floor(E.image.width*G),ce=Math.floor(E.image.height*G),_e=N!==null?N.x:0,we=N!==null?N.y:0;fe.setTexture2D(E,0),R.copyTexSubImage2D(R.TEXTURE_2D,H,0,0,_e,we,O,ce),Z.unbindTexture()};let Dp=R.createFramebuffer(),Up=R.createFramebuffer();this.copyTextureToTexture=function(E,N,H=null,G=null,O=0,ce=null){ce===null&&(O!==0?(Xs("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),ce=O,O=0):ce=0);let _e,we,be,Oe,ze,Ue,tt,lt,Tt,_t=E.isCompressedTexture?E.mipmaps[ce]:E.image;if(H!==null)_e=H.max.x-H.min.x,we=H.max.y-H.min.y,be=H.isBox3?H.max.z-H.min.z:1,Oe=H.min.x,ze=H.min.y,Ue=H.isBox3?H.min.z:0;else{let Sn=Math.pow(2,-O);_e=Math.floor(_t.width*Sn),we=Math.floor(_t.height*Sn),E.isDataArrayTexture?be=_t.depth:E.isData3DTexture?be=Math.floor(_t.depth*Sn):be=1,Oe=0,ze=0,Ue=0}G!==null?(tt=G.x,lt=G.y,Tt=G.z):(tt=0,lt=0,Tt=0);let ut=Pe.convert(N.format),Ne=Pe.convert(N.type),bt;N.isData3DTexture?(fe.setTexture3D(N,0),bt=R.TEXTURE_3D):N.isDataArrayTexture||N.isCompressedArrayTexture?(fe.setTexture2DArray(N,0),bt=R.TEXTURE_2D_ARRAY):(fe.setTexture2D(N,0),bt=R.TEXTURE_2D),R.pixelStorei(R.UNPACK_FLIP_Y_WEBGL,N.flipY),R.pixelStorei(R.UNPACK_PREMULTIPLY_ALPHA_WEBGL,N.premultiplyAlpha),R.pixelStorei(R.UNPACK_ALIGNMENT,N.unpackAlignment);let rt=R.getParameter(R.UNPACK_ROW_LENGTH),hn=R.getParameter(R.UNPACK_IMAGE_HEIGHT),Ss=R.getParameter(R.UNPACK_SKIP_PIXELS),un=R.getParameter(R.UNPACK_SKIP_ROWS),_r=R.getParameter(R.UNPACK_SKIP_IMAGES);R.pixelStorei(R.UNPACK_ROW_LENGTH,_t.width),R.pixelStorei(R.UNPACK_IMAGE_HEIGHT,_t.height),R.pixelStorei(R.UNPACK_SKIP_PIXELS,Oe),R.pixelStorei(R.UNPACK_SKIP_ROWS,ze),R.pixelStorei(R.UNPACK_SKIP_IMAGES,Ue);let Et=E.isDataArrayTexture||E.isData3DTexture,Mn=N.isDataArrayTexture||N.isData3DTexture;if(E.isDepthTexture){let Sn=se.get(E),Kt=se.get(N),sn=se.get(Sn.__renderTarget),uc=se.get(Kt.__renderTarget);Z.bindFramebuffer(R.READ_FRAMEBUFFER,sn.__webglFramebuffer),Z.bindFramebuffer(R.DRAW_FRAMEBUFFER,uc.__webglFramebuffer);for(let ki=0;ki<be;ki++)Et&&(R.framebufferTextureLayer(R.READ_FRAMEBUFFER,R.COLOR_ATTACHMENT0,se.get(E).__webglTexture,O,Ue+ki),R.framebufferTextureLayer(R.DRAW_FRAMEBUFFER,R.COLOR_ATTACHMENT0,se.get(N).__webglTexture,ce,Tt+ki)),R.blitFramebuffer(Oe,ze,_e,we,tt,lt,_e,we,R.DEPTH_BUFFER_BIT,R.NEAREST);Z.bindFramebuffer(R.READ_FRAMEBUFFER,null),Z.bindFramebuffer(R.DRAW_FRAMEBUFFER,null)}else if(O!==0||E.isRenderTargetTexture||se.has(E)){let Sn=se.get(E),Kt=se.get(N);Z.bindFramebuffer(R.READ_FRAMEBUFFER,Dp),Z.bindFramebuffer(R.DRAW_FRAMEBUFFER,Up);for(let sn=0;sn<be;sn++)Et?R.framebufferTextureLayer(R.READ_FRAMEBUFFER,R.COLOR_ATTACHMENT0,Sn.__webglTexture,O,Ue+sn):R.framebufferTexture2D(R.READ_FRAMEBUFFER,R.COLOR_ATTACHMENT0,R.TEXTURE_2D,Sn.__webglTexture,O),Mn?R.framebufferTextureLayer(R.DRAW_FRAMEBUFFER,R.COLOR_ATTACHMENT0,Kt.__webglTexture,ce,Tt+sn):R.framebufferTexture2D(R.DRAW_FRAMEBUFFER,R.COLOR_ATTACHMENT0,R.TEXTURE_2D,Kt.__webglTexture,ce),O!==0?R.blitFramebuffer(Oe,ze,_e,we,tt,lt,_e,we,R.COLOR_BUFFER_BIT,R.NEAREST):Mn?R.copyTexSubImage3D(bt,ce,tt,lt,Tt+sn,Oe,ze,_e,we):R.copyTexSubImage2D(bt,ce,tt,lt,Oe,ze,_e,we);Z.bindFramebuffer(R.READ_FRAMEBUFFER,null),Z.bindFramebuffer(R.DRAW_FRAMEBUFFER,null)}else Mn?E.isDataTexture||E.isData3DTexture?R.texSubImage3D(bt,ce,tt,lt,Tt,_e,we,be,ut,Ne,_t.data):N.isCompressedArrayTexture?R.compressedTexSubImage3D(bt,ce,tt,lt,Tt,_e,we,be,ut,_t.data):R.texSubImage3D(bt,ce,tt,lt,Tt,_e,we,be,ut,Ne,_t):E.isDataTexture?R.texSubImage2D(R.TEXTURE_2D,ce,tt,lt,_e,we,ut,Ne,_t.data):E.isCompressedTexture?R.compressedTexSubImage2D(R.TEXTURE_2D,ce,tt,lt,_t.width,_t.height,ut,_t.data):R.texSubImage2D(R.TEXTURE_2D,ce,tt,lt,_e,we,ut,Ne,_t);R.pixelStorei(R.UNPACK_ROW_LENGTH,rt),R.pixelStorei(R.UNPACK_IMAGE_HEIGHT,hn),R.pixelStorei(R.UNPACK_SKIP_PIXELS,Ss),R.pixelStorei(R.UNPACK_SKIP_ROWS,un),R.pixelStorei(R.UNPACK_SKIP_IMAGES,_r),ce===0&&N.generateMipmaps&&R.generateMipmap(bt),Z.unbindTexture()},this.initRenderTarget=function(E){se.get(E).__webglFramebuffer===void 0&&fe.setupRenderTarget(E)},this.initTexture=function(E){E.isCubeTexture?fe.setTextureCube(E,0):E.isData3DTexture?fe.setTexture3D(E,0):E.isDataArrayTexture||E.isCompressedArrayTexture?fe.setTexture2DArray(E,0):fe.setTexture2D(E,0),Z.unbindTexture()},this.resetState=function(){A=0,C=0,P=null,Z.reset(),xe.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return In}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=it._getDrawingBufferColorSpace(e),t.unpackColorSpace=it._getUnpackColorSpace()}};var tn=Object.freeze({chalk:16117464,teal:2645088,deep:1588301,moss:5081976,gold:14460501,copper:10707265,ink:2308168}),ur={chalk:new Rt({name:"chalk-sail",color:tn.chalk,roughness:.82,side:En}),stone:new Rt({name:"teal-basalt",color:tn.teal,roughness:.94,flatShading:!0}),dark:new Rt({name:"deep-basalt",color:tn.deep,roughness:.92,flatShading:!0}),moss:new Rt({name:"moss",color:tn.moss,roughness:.98}),gold:new Rt({name:"aged-brass",color:tn.gold,roughness:.42,metalness:.58}),copper:new Rt({name:"ochre-ceramic",color:tn.copper,roughness:.85}),ink:new Rt({name:"navy-cloth",color:tn.ink,roughness:.9}),glow:new Rt({name:"aether-glass",color:10941148,emissive:5287070,emissiveIntensity:.8,roughness:.28,metalness:.15}),skin:new Rt({name:"pilot-skin",color:13212542,roughness:.9}),turf:new Rt({name:"weathered-turf",color:6720632,roughness:1,flatShading:!0}),sand:new Rt({name:"mineral-sand",color:10070668,roughness:1,flatShading:!0})},jl={turf:ur.turf.clone(),sand:ur.sand.clone()};Object.assign(jl.turf,{name:"terrain-patch-turf",polygonOffset:!0,polygonOffsetFactor:0,polygonOffsetUnits:-1});Object.assign(jl.sand,{name:"terrain-patch-sand",polygonOffset:!0,polygonOffsetFactor:0,polygonOffsetUnits:-2});var rv=i=>ur[i]||ur.stone,Kf=i=>{let e=i+1>>>0;return()=>(e=Math.imul(1664525,e)+1013904223>>>0,e/4294967296)},Je=(i,e,t,n)=>{let s=new dt(i,typeof e=="string"?rv(e):e);return t&&s.position.set(...t),n&&s.scale.set(...n),s.castShadow=!0,s.receiveShadow=!0,s},Zt=(i,e,t,n=10)=>new oi(i,e,t,n);function zt(i,e,t,n="gold",s=6){let r=new L(...i),a=new L(...e),o=a.clone().sub(r),l=Je(Zt(t,t,o.length(),s),n);return l.position.copy(r).add(a).multiplyScalar(.5),l.quaternion.setFromUnitVectors(new L(0,1,0),o.normalize()),l}function Bn(i,e,t="gold",n=32){return Je(new Nn(i,e,5,n),t)}function jf(i){let e=Object.keys(i[0].attributes),t=new St;for(let n of e){let s=i.map(l=>l.attributes[n]),r=s[0].array.constructor,a=new r(s.reduce((l,c)=>l+c.array.length,0)),o=0;for(let l of s)a.set(l.array,o),o+=l.array.length;t.setAttribute(n,new Ct(a,s[0].itemSize,s[0].normalized))}return t.computeBoundingSphere(),t}function Ql(i){i.updateMatrixWorld(!0);let e=new Map,t=[];i.traverse(n=>{if(n.isMesh&&!n.isInstancedMesh&&!n.isSkinnedMesh&&!Array.isArray(n.material)){let s=(n.geometry.index?n.geometry.toNonIndexed():n.geometry.clone()).applyMatrix4(n.matrixWorld),r=`${n.material.uuid}:${Number(n.castShadow)}:${Number(n.receiveShadow)}`;e.has(r)||e.set(r,{material:n.material,geometries:[],castShadow:n.castShadow,receiveShadow:n.receiveShadow}),e.get(r).geometries.push(s),t.push(n)}});for(let n of t)n.removeFromParent();for(let{material:n,geometries:s,castShadow:r,receiveShadow:a}of e.values()){let o=Je(jf(s),n);o.name=n.name+"-merged",o.castShadow=r,o.receiveShadow=a,i.add(o);for(let l of s)l.dispose()}return i}function av(i,e,t){let n=new At;n.name=`landmark-${e}`;let s=[],r=i*1.04+6,a=[2.45,-.65,1.1,2.8,-1.8,.3][e%6],o=Math.sin(a)*r,l=Math.cos(a)*r,c=Je(Zt(5.7,2.2,5.5,t?9:5),"stone",[o,-3.2,l]);n.add(c);let h=zt([Math.sin(a)*i*.8,-3.5,Math.cos(a)*i*.8],[o,-3.5,l],3.1,"dark",6);n.add(h);let d=(u,f,y,g=.35,p="chalk")=>{n.add(Je(Zt(g,g*1.2,y,t?8:5),p,[u,y/2,f])),s.push({shape:"cylinder",x:u,z:f,y:0,radius:g*1.2,height:y})},m=(u,f)=>[o+u,l+f];if(e===0){for(let y of[-3.6,3.6])for(let g of[-2.8,2.8])d(...m(y,g),4.6,.15,"gold");let u=new Qs;u.moveTo(-4.2,0),u.lineTo(0,2.1),u.lineTo(4.2,0),u.lineTo(4.2,-.065),u.lineTo(0,2.035),u.lineTo(-4.2,-.065),u.closePath();let f=Je(new pa(u,{depth:6.4,bevelEnabled:!1}),"chalk",[o,4.5,l-3.2]);n.add(f),n.add(zt([o-4.2,4.5,l-3.2],[o,6.6,l-3.2],.055),zt([o,6.6,l-3.2],[o+4.2,4.5,l-3.2],.055),zt([o,6.6,l-3.2],[o,6.6,l+3.2],.055));for(let y=0;y<5;y++){let g=Je(new Dn(.23,.75,3),"copper",[o-2+y,4.3,l-3.25]);g.rotation.z=Math.PI,n.add(g)}}else if(e===1){for(let y of[-3.3,3.3])d(...m(y,0),5.7,.4);let u=Je(new Nn(3.3,.32,5,t?24:12,Math.PI),"chalk",[o,5.7,l]);n.add(u);let f=Bn(1.25,.095);f.position.set(o,5.9,l),n.add(f),n.add(zt([o,5.7,l],[o,9.6,l],.075));for(let y of[-1,1]){let g=Je(new Dt(1.6,.35,.1),"gold",[o+y*.8,9.2,l]);g.rotation.z=y*.12,n.add(g)}}else if(e===2){for(let f of[-3,3]){for(let y of[-3,3])d(...m(y,f),f<0?5.8:4.6,.55);n.add(Je(new Dt(7,.65,1.3),"chalk",[o,f<0?5.7:4.5,l+f]))}for(let f=0;f<5;f++){let y=Je(new Dt(6.4,.16,1),"sand",[o,.035,l-2.4+f*1.2]);n.add(y)}let u=Je(new as(1.15,0),"dark",[o+4.5,.5,l+3.3],[1,.5,1]);n.add(u),s.push({shape:"cylinder",x:o+4.5,z:l+3.3,y:0,radius:1.2,height:1.1})}else if(e===3){for(let u of[-3.6,3.6])d(...m(u,0),7.8,.4,"dark");n.add(zt([o-3.6,7.8,l],[o,10,l],.16),zt([o,10,l],[o+3.6,7.8,l],.16)),n.add(Je(new Un(1.1,0),"glow",[o,9.1,l],[.6,1.7,.6]));for(let u=0;u<3;u++){let f=Bn(1.35+u*.35,.055);f.position.set(o,7.1+u*.75,l),f.rotation.x=Math.PI/2,n.add(f)}n.add(zt([o,10,l],[o,13,l],.055))}else if(e===4){for(let f=0;f<7;f++){let y=f/6*Math.PI*1.45-.7,g=o+Math.sin(y)*4.2,p=l+Math.cos(y)*4.2;if(d(g,p,5.5+f%2*.6,.42),n.add(Je(Zt(.65,.65,.22,6),"gold",[g,5.6+f%2*.6,p])),f<6){let v=(f+1)/6*Math.PI*1.45-.7;n.add(zt([g,5.45,p],[o+Math.sin(v)*4.2,5.45,l+Math.cos(v)*4.2],.22,"chalk"))}}let u=Bn(2.4,.08);u.position.set(o,.11,l),u.rotation.x=Math.PI/2,n.add(u)}else{for(let y of[-3.5,3.5])d(...m(y,0),5.3,.45);let u=Je(new Nn(3.5,.12,5,t?28:14,Math.PI),"gold",[o,5.3,l]);n.add(u);for(let y=1;y<4;y++){let g=u.clone();g.rotation.y=y*Math.PI/4,n.add(g)}let f=Bn(3.5,.12);f.rotation.x=Math.PI/2,f.position.set(o,5.3,l),n.add(f),n.add(Je(new Un(.75,0),"glow",[o,6.5,l]))}return n.userData.obstacles=s,n}function Jf(i,e,t,n){let s=new At;s.name=`island-${e}-lod-${n}`;let r=Kf(e*37+11),a=n?40:18,o=new Rt({name:`island-${e}-terrace`,color:[7904390,6590082,6323326][t%3],roughness:1,flatShading:!0});s.add(Je(Zt(i,i*.98,.64,a),o,[0,-.32,0])),s.add(Je(Zt(i*.98,i*.78,i*.25,a),"stone",[0,-i*.125-.58,0])),s.add(Je(Zt(i*.79,i*.46,i*.31,a),"dark",[0,-i*.405-.5,0]));let l=Je(new Dn(i*.48,i*.55,a),"stone",[0,-i*.83-.42,0]);l.rotation.z=Math.PI,s.add(l);for(let h=0;h<(n?22:9);h++){let d=h*Math.PI*2/(n?22:9)+r()*.1,m=i*(.88+r()*.07),u=i*(.12+r()*.2),f=Je(Zt(i*.1,i*.07,u,5),"stone",[Math.sin(d)*m,-u*.45-.25,Math.cos(d)*m]);f.rotation.y=d,f.rotation.z=(r()-.5)*.24,s.add(f)}if(n){let h=new rs(1,9);h.rotateX(-Math.PI/2);for(let m=0;m<Math.max(9,Math.round(i*.6));m++){let u=r()*Math.PI*2,f=i*(.23+r()*.62),y=Je(h,m%3?jl.turf:jl.sand,[Math.sin(u)*f,m%3?.02:.03,Math.cos(u)*f],[1.5+r()*i*.12,1,1.2+r()*i*.1]);y.rotation.y=r()*6,y.castShadow=!1,s.add(y)}let d=Bn(i*.72,.055,"copper",48);d.rotation.x=-Math.PI/2,d.position.y=.025,s.add(d);for(let m=0;m<10;m++){let u=Je(new Dt(.32,.05,.9),"gold",[0,.025,i*(.17+m*.063)]);u.rotation.y=(e%3-1)*.1,s.add(u)}for(let m=0;m<8;m++){let u=m*Math.PI/4+.2,f=i*.84,y=Je(new as(i*.045,0),"chalk",[Math.sin(u)*f,.08,Math.cos(u)*f],[1,.45,1]);y.rotation.set(.2,u,.2),s.add(y)}for(let m=0;m<12;m++){let u=m*Math.PI/6,f=i*.84,y=Je(new Dt(1.5,.13,2.1),"sand",[Math.sin(u)*f,.025,Math.cos(u)*f]);y.rotation.y=u,s.add(y)}}let c=av(i,e,n);if(s.userData.obstacles=c.userData.obstacles,s.add(c),Ql(s),n){let h=ov({radius:i,count:Math.round(i*2.2)+e*3,seed:e});s.add(h)}return s}function Qf({radius:i=12,region:e=0,index:t=0}={}){let n=new At;n.name=`island-${t}`;let s=typeof e=="number"?e:{\u8D77\u98A8:0,\u65B7\u6A4B:1,\u96F7\u96F2:2,breeze:0,bridge:1,storm:2}[e]||0,r=new Jr;return r.addLevel(Jf(i,t,s,!0),0),r.addLevel(Jf(i,t,s,!1),145),n.add(r),n.userData={radius:i,region:s,index:t,collider:{shape:"cylinder",radius:i,height:.6,top:0},obstacles:r.levels[0].object.userData.obstacles,assetId:`aetherwake.island.${t+1}`,lodDistances:[0,145]},n}function ov({radius:i=12,count:e=24,seed:t=0}={}){let n=new At;n.name="windgrass-cluster";let s=Kf(t*41+9),r=new xt,a=new qn(new Dn(.24,.9,3),ur.moss,e*3),o=new qn(new li(.09,0),ur.gold,e);a.receiveShadow=!0;for(let l=0;l<e;l++){let c=s()*Math.PI*2,h=i*(.58+s()*.31),d=Math.sin(c)*h,m=Math.cos(c)*h;for(let u=0;u<3;u++)r.position.set(d+u*.23,.75,m+u*.18),r.rotation.set(.18,s()*6,.2+s()*.25),r.scale.set(1.7+s(),1.7+s()*1.8,2.2),r.updateMatrix(),a.setMatrixAt(l*3+u,r.matrix);r.position.set(d,1.7,m),r.rotation.set(0,0,0),r.scale.setScalar(1.8),r.updateMatrix(),o.setMatrixAt(l,r.matrix)}return a.name="instanced-grass",o.name="instanced-amber-seeds",n.add(a,o),n}function Zh(i=0){let e=typeof i=="number"?i%3:{wind:0,solar:1,astral:2}[i]??0,t=new At;t.name=["wind-observatory","solar-observatory","astral-observatory"][e],t.add(Je(Zt(2.05,2.3,.3,12),"chalk",[0,.15,0])),t.add(Je(Zt(1.6,1.9,.18,12),"copper",[0,.39,0]));let n=Bn(1.45,.07);n.rotation.x=Math.PI/2,n.position.y=.51,t.add(n);for(let r=0;r<8;r++){let a=r*Math.PI/4;t.add(zt([Math.sin(a)*1.1,.53,Math.cos(a)*1.1],[Math.sin(a)*1.38,.53,Math.cos(a)*1.38],.03))}for(let r of[-1,1])t.add(Je(Zt(.19,.3,2.4,8),"chalk",[r*1,1.65,0])),t.add(Je(Zt(.3,.3,.13,8),"gold",[r*1,2.8,0]));t.add(zt([-1,2.8,0],[1,2.8,0],.13));let s=Je(new Un(.47,0),"glow",[0,2.15,0],[.8,1.4,.8]);if(t.add(s),e===0){let r=Bn(1.1,.085);r.position.y=2.15,r.rotation.y=.45,t.add(r),t.add(zt([0,.5,0],[0,3.7,0],.08));for(let a=0;a<4;a++){let o=a*Math.PI/2,l=Je(new Dt(.65,.18,.08),"gold",[Math.cos(o)*.5,3.5+Math.sin(o)*.5,0]);l.rotation.z=o+.35,t.add(l)}}if(e===1){for(let r=0;r<3;r++){let a=Bn(.78+r*.18,.055);a.position.y=2.15,a.rotation.set(r*.8,.4+r*.65,.6),t.add(a)}for(let r=0;r<8;r++){let a=r*Math.PI/4;t.add(zt([Math.cos(a)*1.05,2.15+Math.sin(a)*1.05,0],[Math.cos(a)*1.35,2.15+Math.sin(a)*1.35,0],.065))}}if(e===2){for(let r=0;r<3;r++){let a=Bn(1.12,.065);a.position.y=2.2,a.rotation.set(r*Math.PI/3,.3+r,.5),t.add(a)}t.add(Je(new Dn(.6,1,8),"gold",[0,3.65,0]));for(let r=0;r<4;r++){let a=r*Math.PI/2;t.add(Je(new Un(.16,0),"glow",[Math.sin(a)*1.48,2.6,Math.cos(a)*1.48]))}}return Ql(t),t.userData={assetId:`aetherwake.station.${e+1}`,collider:{shape:"cylinder",radius:1.45,height:4.2},type:e},t}function ep(i=0){let e=(i%12+12)%12,t=new At;t.name=`relic-${String(e+1).padStart(2,"0")}`;let n=[new Un(.42,0),new li(.42,0),new as(.4,0)],s=Je(n[e%3],"glow",[0,.7,0],[.8+e%4*.1,1.15+e%3*.15,.65]);s.rotation.set(e*.15,e*.38,0),t.add(s);for(let o=0;o<3;o++)o!==e%3&&n[o].dispose();let r=Bn(.65,.045);r.position.y=.7,r.rotation.set(e%2?Math.PI/2:0,e*.28,e%3*.3),t.add(r);let a=3+e%4;for(let o=0;o<a;o++){let l=o*Math.PI*2/a+e*.31,c=Je(new Dt(.11,.23,.12),"gold",[Math.cos(l)*.62,.7+Math.sin(l)*.62,0]);c.rotation.z=l,t.add(c)}if(e>=6){let o=Bn(.34,.025,"chalk",16);o.position.y=.7,o.rotation.y=Math.PI/2,t.add(o)}return t.add(Je(Zt(.32,.43,.12,6),"dark",[0,.06,0])),Ql(t),t.userData={assetId:`aetherwake.relic.${String(e+1).padStart(2,"0")}`,variant:e,collider:{shape:"sphere",radius:1.15,center:[0,.7,0]}},t}function Jh(i="tailwind",{radius:e=3,height:t=9,length:n=14}={}){let s={steady:"tailwind",thermal:"updraft",side:"crosswind",tail:"tailwind",up:"updraft",cross:"crosswind"}[i]||i,r=new At;r.name=`wind-${s}`;let a=new mn({name:`wind-${s}-light`,color:s==="updraft"?16766873:s==="crosswind"?12498677:12381918,transparent:!0,opacity:.48,depthWrite:!1}),o=s==="updraft"?24:28,l=new qn(new Dn(.18,.85,4),a,o),c=new xt;l.name="wind-direction-volume",r.add(l);let h=0,d=[];if(s==="updraft")for(let u=0;u<3;u++){let f=Je(new Nn(e*.78,.055,4,40,Math.PI*1.65),a);f.rotation.x=-Math.PI/2,f.position.y=u*t/3,f.castShadow=!1,d.push(f),r.add(f)}else for(let u of[-1,1]){let f=new Li(Array.from({length:9},(g,p)=>new L(u*e*.55+Math.sin(p*.8)*e*.08,.6+Math.sin(p*.6)*.25,-n/2+p*n/8))),y=Je(new ls(f,20,.045,4,!1),a);y.castShadow=!1,r.add(y)}let m=(u=0)=>{h+=u;for(let f=0;f<o;f++){let y=(h*.13+f/o)%1,g=f*2.399+h*.25;s==="updraft"?(c.position.set(Math.cos(g)*e*.78,y*t,Math.sin(g)*e*.78),c.rotation.set(0,0,0)):(c.position.set(Math.sin(f*4.3)*e*.7,1.6+Math.sin(f*3.1)*1.7,(y-.5)*n),c.rotation.set(Math.PI/2,0,s==="crosswind"?Math.sin(h+f)*.3:0)),c.scale.setScalar(.7+Math.sin(y*Math.PI)*.5),c.updateMatrix(),l.setMatrixAt(f,c.matrix)}l.instanceMatrix.needsUpdate=!0;for(let f=0;f<d.length;f++)d[f].position.y=(h*1.4+f*t/3)%t,d[f].rotation.z=h*.25+f*2};return m(),r.userData={type:s,update:m,assetId:`aetherwake.wind.${s}`,distribution:{radius:e,height:t,length:n},fixedParticleSize:!0},r}function Pt(i,e,t){let n=[];for(let s of t){let r=new en().setFromEuler(new pn(...s));n.push(r.x,r.y,r.z,r.w)}return new ui(`${i}.quaternion`,e,n)}function tp(){let i=new At;i.name="aether-pilot";let e=new yn;e.name="root";let t=new yn;t.name="hips",t.position.y=.82,e.add(t);let n=new yn;n.name="torso",n.position.y=.22,t.add(n);let s=new yn;s.name="head",s.position.y=.55,n.add(s);let r=new yn;r.name="leftArm",r.position.set(-.32,.32,0),n.add(r);let a=new yn;a.name="rightArm",a.position.set(.32,.32,0),n.add(a);let o=new yn;o.name="leftLeg",o.position.set(-.15,-.05,0),t.add(o);let l=new yn;l.name="rightLeg",l.position.set(.15,-.05,0),t.add(l);let c=[e,t,n,s,r,a,o,l];e.updateMatrixWorld(!0);let h=[],d=(D,z,Y,k,re)=>{D.index&&(D=D.toNonIndexed());let te=new Ye().compose(new L(...Y),new en,new L(...k));D.applyMatrix4(te).applyMatrix4(z.matrixWorld);let ie=D.attributes.position.count,De=new Uint16Array(ie*4),ke=new Float32Array(ie*4),je=new Float32Array(ie*3),Xe=new Ve(re);for(let $=0;$<ie;$++)De[$*4]=c.indexOf(z),ke[$*4]=1,je[$*3]=Xe.r,je[$*3+1]=Xe.g,je[$*3+2]=Xe.b;D.setAttribute("skinIndex",new Ct(De,4)),D.setAttribute("skinWeight",new Ct(ke,4)),D.setAttribute("color",new Ct(je,3)),h.push(D)};d(Zt(.29,.24,.6,8),n,[0,.22,0],[1,1,1],tn.chalk),d(new Dt(.42,.16,.33),t,[0,.04,0],[1,1,1],tn.copper),d(new ci(.235,10,7),s,[0,.08,.035],[1,1.05,1],13212542),d(new ci(.25,10,6,0,Math.PI*2,0,Math.PI*.57),s,[0,.11,.02],[1,1,1],tn.ink),d(new Dt(.4,.11,.12),s,[0,.12,.23],[1,1,1],tn.gold),d(new Dt(.42,.5,.23),n,[0,.25,-.24],[1,1,1],tn.copper);for(let D of[r,a])d(Zt(.105,.08,.55,7),D,[0,-.2,0],[1,1,1],tn.chalk),d(new ci(.09,8,5),D,[0,-.48,0],[1,1,1],13212542);for(let D of[o,l])d(Zt(.105,.08,.59,7),D,[0,-.3,0],[1,1,1],tn.ink),d(new Dt(.19,.16,.33),D,[0,-.64,.065],[1,1,1],tn.copper);let m=jf(h),u=new Rt({name:"pilot-vertex-palette",vertexColors:!0,roughness:.8}),f=new Kr(m,u);f.name="pilot-rigged-body",f.add(e),f.bind(new Qr(c)),f.castShadow=!0,i.add(f);for(let D of h)D.dispose();let y=new At;y.name="ivory-glider";let g=7,p=17,v=[],_=[],x=[];for(let D=0;D<g;D++)for(let z=0;z<p;z++){let Y=z/(p-1),k=D/(g-1),re=(Y-.5)*4.6,te=(k-.5)*1.65-.12;v.push(re,2.13+.4*Math.sin(Y*Math.PI)+.16*Math.sin(k*Math.PI),te),_.push(Y,k)}for(let D=0;D<g-1;D++)for(let z=0;z<p-1;z++){let Y=D*p+z;x.push(Y,Y+1,Y+p,Y+1,Y+p+1,Y+p)}let T=g*p,A=[...x];for(let D=0;D<T;D++)v.push(v[D*3],v[D*3+1]-.026,v[D*3+2]),_.push(_[D*2],_[D*2+1]);for(let D=0;D<A.length;D+=3)x.push(A[D]+T,A[D+2]+T,A[D+1]+T);let C=[];for(let D=0;D<p;D++)C.push(D);for(let D=1;D<g;D++)C.push(D*p+p-1);for(let D=p-2;D>=0;D--)C.push((g-1)*p+D);for(let D=g-2;D>0;D--)C.push(D*p);for(let D=0;D<C.length;D++){let z=C[D],Y=C[(D+1)%C.length];x.push(z,Y,z+T,Y,Y+T,z+T)}let P=new St;P.setAttribute("position",new nt(v,3)),P.setAttribute("uv",new nt(_,2)),P.setIndex(x),P.computeVertexNormals(),y.add(Je(P,"chalk"));for(let D of[-1,-.5,0,.5,1]){let z=D*2.3,Y=2.13+.4*Math.sin((D+1)*Math.PI/2);y.add(zt([z,Y,-.94],[z,Y,.7],.023,"gold"))}y.add(zt([-2.3,2.13,-.94],[0,2.53,-.94],.035,"gold"),zt([0,2.53,-.94],[2.3,2.13,-.94],.035,"gold"));for(let D of[-1,1])y.add(zt([D*1.65,2.35,-.45],[D*.38,1.2,0],.016,"ink"),zt([D*1.65,2.35,.45],[D*.38,1.2,0],.016,"ink"));let b=Je(new Dt(.35,.025,1.58),"copper",[0,2.55,-.12]);y.add(b),Ql(y),y.visible=!1,i.add(y);let S=[new Fn("idle",2.4,[Pt("torso",[0,1.2,2.4],[[.025,0,0],[-.025,0,0],[.025,0,0]]),Pt("leftArm",[0,1.2,2.4],[[0,0,-.09],[.04,0,-.06],[0,0,-.09]]),Pt("rightArm",[0,1.2,2.4],[[0,0,.09],[-.04,0,.06],[0,0,.09]])]),new Fn("run",.7,[Pt("leftLeg",[0,.175,.35,.525,.7],[[.6,0,0],[0,0,0],[-.6,0,0],[0,0,0],[.6,0,0]]),Pt("rightLeg",[0,.175,.35,.525,.7],[[-.6,0,0],[0,0,0],[.6,0,0],[0,0,0],[-.6,0,0]]),Pt("leftArm",[0,.35,.7],[[-.5,0,-.08],[.5,0,-.08],[-.5,0,-.08]]),Pt("rightArm",[0,.35,.7],[[.5,0,.08],[-.5,0,.08],[.5,0,.08]])]),new Fn("jump",.45,[Pt("torso",[0,.2,.45],[[.12,0,0],[-.12,0,0],[-.05,0,0]]),Pt("leftLeg",[0,.2,.45],[[0,0,0],[-.5,0,0],[.15,0,0]]),Pt("rightLeg",[0,.2,.45],[[0,0,0],[-.45,0,0],[.1,0,0]]),Pt("leftArm",[0,.3,.45],[[0,0,0],[0,0,-1.4],[0,0,-1.2]]),Pt("rightArm",[0,.3,.45],[[0,0,0],[0,0,1.4],[0,0,1.2]])]),new Fn("glide",2,[Pt("torso",[0,1,2],[[.15,0,0],[.2,0,0],[.15,0,0]]),Pt("leftArm",[0,1,2],[[0,0,-1.7],[.06,0,-1.65],[0,0,-1.7]]),Pt("rightArm",[0,1,2],[[0,0,1.7],[-.06,0,1.65],[0,0,1.7]]),Pt("leftLeg",[0,1,2],[[.25,0,-.08],[.32,0,-.06],[.25,0,-.08]]),Pt("rightLeg",[0,1,2],[[.32,0,.08],[.25,0,.06],[.32,0,.08]])]),new Fn("land",.4,[Pt("torso",[0,.14,.4],[[.15,0,0],[.35,0,0],[0,0,0]]),Pt("leftLeg",[0,.14,.4],[[.2,0,0],[-.3,0,0],[0,0,0]]),Pt("rightLeg",[0,.14,.4],[[.2,0,0],[-.3,0,0],[0,0,0]])])],I=new Sa(i),F=Object.fromEntries(S.map(D=>[D.name,I.clipAction(D)]));for(let D of["jump","land"])F[D].setLoop(Wl,1),F[D].clampWhenFinished=!0;let V="idle";F.idle.play();let X=(D,z={})=>{let Y=typeof z=="string"?{mode:z}:z,k=Y.mode||Y.state||(Y.gliding?"glide":Y.grounded===!1?"jump":Y.speed>.5?"run":"idle"),re=F[k]?k:"idle";re!==V&&(F[re].reset().play(),F[V].crossFadeTo(F[re],.16,!1),V=re),y.visible=re==="glide",re==="run"&&(F.run.timeScale=Math.max(.7,Math.min(1.7,(Y.speed||5)/5))),I.update(Math.min(D,.1))};return i.userData={assetId:"aetherwake.pilot",skeleton:c.map(D=>D.name),clips:S.map(D=>D.name),collider:{shape:"capsule",radius:.3,height:1.85},rootMotion:!1},{group:i,mixer:I,clips:S,update:X,sail:y}}var Ft=L;function np(i,e=!1){let t={translateX:null,translateY:null,label:i,x:NaN,y:NaN,opacity:-1,textDistance:-1,textLabel:null,textHeading:!1,display:null,translate:null,transform:null};return i.attributeStyleMap&&globalThis.CSSTransformValue&&globalThis.CSSTranslate&&(t.translateX=CSS.px(0),t.translateY=CSS.px(0),t.translate=new CSSTranslate(t.translateX,t.translateY),t.transform=new CSSTransformValue([t.translate,new CSSTranslate(CSS.percent(-50),CSS.percent(e?-100:-50))])),t.bottom=e,t}function ip(i,e,t,n){if(Number.isFinite(i.x)||(n=!0),e=Math.round(e),t=Math.round(t),!(e===i.x&&t===i.y)){if(i.translate)i.translateX.value=e,i.translateY.value=t,i.label.attributeStyleMap.set("transform",i.transform);else if(n)i.label.style.transform=`translate3d(${e}px,${t}px,0) translate(-50%,${i.bottom?-100:-50}%)`;else return;i.x=e,i.y=t}}function lv(i){let e=new Float64Array(i.length*10),t=new Uint32Array(i.length),n=new Float64Array(i.length);for(let s=0;s<i.length;s++){let r=i[s].data,a=s*10;e[a]=r.x,e[a+1]=r.z,e[a+2]=r.radius||0,e[a+3]=i[s].halfLength||0,e[a+4]=r.start?1:0,r.start&&(e[a+5]=r.start.x,e[a+6]=r.start.z,e[a+7]=r.end.x-r.start.x,e[a+8]=r.end.z-r.start.z,e[a+9]=1/(e[a+7]**2+e[a+8]**2||1))}return{values:e,active:t,times:n,count:0,route:null}}function cv(i,e,t=le){if(!i)return null;let n=i.campaignIndex!=null?e.campaignCircuitStages[i.campaignIndex]:e.courseStages?.[i.id]||0,s=i.stages||[],r=n>=s.length?0:n,a=s[r],o=t.islands.find(m=>m.id===a?.fromIslandId),l=t.islands.find(m=>m.id===a?.toIslandId),c=o?{...i,x:o.x+18,y:o.y+22,z:o.z-18}:i,h=a?.gates||i.gates||[],d=i.campaignIndex!=null?e.campaignGate:e.challengeProgress?.[i.id]||0;return{entry:c,stage:a,stageIndex:r,completed:e.challenges?.includes(i.id)||!1,key:`${i.id}:${r}`,points:[c,...h,l||c],winds:(a?.winds||i.winds||[]).filter(m=>m.gate===d),progress:d}}function hv(i,e={}){let t=i.challengeHint||i.trackedHint||i.surveyHint,n=i.challengeHint?i.challengeHint.landing?`\u7B2C ${i.challengeHint.stage}/${i.challengeHint.stageTotal} \u6BB5 \xB7 \u843D\u5CF6\u4EA4\u4ED8`:`\u7B2C ${i.challengeHint.stage}/${i.challengeHint.stageTotal} \u6BB5 \xB7 \u6E2C\u98A8\u9580 ${i.challengeHint.step}/${i.challengeHint.total-1}`:i.trackedHint?i.trackedHint.transit?`\u5B89\u5168\u63A5\u99C1 ${i.trackedHint.transitStep}/${i.trackedHint.transitTotal}`:`${i.trackedHint.stageName||i.trackedHint.name}\u5165\u53E3`:i.surveyHint?`${i.surveyHint.name} ${i.surveyHint.step}/${i.surveyHint.total}`:null;return e.target=t,e.label=n,e.surveyTarget=i.activeChallenge?null:i.trackedHint?i.trackedHint.transit?i.trackedHint:null:i.surveyHint,e.mainRouteVisible=!i.activeChallenge&&!i.trackedHint&&i.activeCampaignCircuit==null,e}function uv(i,e){return!!(i&&e&&e.width>0&&e.height>0&&i.left<e.right+4&&i.right>e.left-4&&i.top<e.bottom+4&&i.bottom>e.top-4)}var Kh=class{constructor(e,t,n=globalThis.ResizeObserver,s=[]){this.label=e,this.card=t,this.cards=[t,...s].filter(Boolean),this.anchor=null,this.placedAnchor={x:0,y:0},this.bounds={left:0,right:0,top:0,bottom:0},this.size=null,this.origin={x:0,y:0},this.cardRect=null,this.cardRects=[],this.observer=new n(()=>this.refresh()),this.observer.observe(e);for(let r of this.cards)this.observer.observe(r)}refresh(){this.cardRects=this.cards.map(t=>t.getBoundingClientRect()),this.cardRect=this.cardRects[0]||null;let e=this.label.getBoundingClientRect();e.width>0&&e.height>0&&(this.size={width:e.width,height:e.height},this.anchor&&(this.origin.x=e.left+e.width/2-this.anchor.x,this.origin.y=e.top+e.height/2-this.anchor.y)),this.apply()}place(e,t){this.anchor=this.placedAnchor,this.anchor.x=e,this.anchor.y=t,this.apply()}apply(){let e=null;this.anchor&&this.size&&(e=this.bounds,e.left=this.anchor.x+this.origin.x-this.size.width/2,e.right=this.anchor.x+this.origin.x+this.size.width/2,e.top=this.anchor.y+this.origin.y-this.size.height/2,e.bottom=this.anchor.y+this.origin.y+this.size.height/2);let t=!1;for(let s=0;s<this.cardRects.length;s++)if(uv(e,this.cardRects[s])){t=!0;break}let n=t?"hidden":"";this.label.style.visibility!==n&&(this.label.style.visibility=n)}dispose(){this.observer.disconnect()}};function dv(i){let e=i.type==="updraft"||i.type==="thermal",t=i.start?Mt(i.end.x-i.start.x,i.end.z-i.start.z):30,n=Jh(i.type,{radius:e?i.radius*.65:5,height:e?32:9,length:t});if(n.position.set(i.x,e?i.ceiling-29:i.start?(i.start.y+i.end.y)/2:20,i.z),!e&&i.direction&&(n.rotation.y=Math.atan2(i.direction.x,i.direction.z)),i.start&&i.end){let s=n.worldToLocal(new Ft(i.start.x,i.start.y??i.y,i.start.z)),r=n.worldToLocal(new Ft(i.end.x,i.end.y??i.y,i.end.z)),a=new Li([s,new Ft().lerpVectors(s,r,.5).add(new Ft(0,1,0)),r]),o=new dt(new ls(a,24,.6,5,!1),new mn({color:i.type==="crosswind"?"#e6bc73":"#b6f1da",transparent:!0,opacity:.15,depthWrite:!1}));o.name="wind-corridor-path",n.add(o)}return n}function jh(i){let e=new Set,t=new Set;i.traverse(n=>{n.geometry&&e.add(n.geometry);for(let s of Array.isArray(n.material)?n.material:n.material?[n.material]:[])t.add(s)});for(let n of e)n.dispose();for(let n of t)n.dispose()}var ec=class{constructor(e="#ffe1a2"){this.group=new At,this.group.name="flight-target";let t=new mn({color:e,depthWrite:!1});this.ring=new dt(new Nn(1,.018,8,48),t),this.group.add(this.ring),this.arrow=new At,this.shaft=new dt(new oi(.1,.1,1,6),t),this.tip=new dt(new Dn(.75,1.8,7),t),this.shaft.rotation.x=this.tip.rotation.x=Math.PI/2,this.arrow.add(this.shaft,this.tip),this.group.add(this.arrow),this.group.visible=!1}update(e,t){if(this.group.visible=!!e,!e)return;let n=e.radius||10,s=e.heading,r=s&&Mt(s.x,s.z)>0;this.group.position.set(e.x,e.y+(e.landing?.25:0),e.z),this.ring.scale.setScalar(n),this.group.rotation.set(e.landing?-Math.PI/2:0,e.landing?0:r?Math.atan2(s.x,s.z):Math.atan2(t.x-e.x,t.z-e.z),0),this.arrow.visible=!!r&&!e.landing;let a=Math.min(12,Math.max(6,n));this.arrow.position.set(0,n+1.5,0),this.shaft.scale.y=a-1.8,this.shaft.position.z=-.9,this.tip.position.z=a/2-.9}dispose(){jh(this.group)}};function Qh(i){for(let e=i;e;e=e.parent)if(!e.visible)return!1;return!0}function sp(i,e,t,n=new ds){let s=t.filter(Qh),r=new Map;for(let[a,o]of[["head",1.65],["torso",1.05],["hips",.55]]){let c=new Ft(e.x,e.y+o,e.z).sub(i.position),h=c.length();if(!(h<=i.near+.1)){n.set(i.position,c.normalize()),n.near=i.near,n.far=h-.1;for(let d of n.intersectObjects(s,!1)){let m=r.get(d.object);(!m||d.distance<m.distance)&&r.set(d.object,{...d,sample:a})}}}return[...r.values()].sort((a,o)=>a.distance-o.distance)}var eu=class{constructor(){this.values=new Array(8).fill(null),this.size=0}clear(){this.size=0}has(e){for(let t=0;t<this.size;t++)if(this.values[t]===e)return!0;return!1}add(e){!this.has(e)&&this.size<this.values.length&&(this.values[this.size++]=e)}},tu=class{constructor(){this.meshes=[],this.bounds=[],this.localRay=new Wn,this.direction=new Ft,this.hitPoint=new Ft,this.pose=new Float64Array(6),this.pose.fill(1/0),this.owners=new Map,this.materials=new Map,this.materialEntries=[],this.targets=new eu,this.ray=new ds,this.sinceSample=1/0,this.maxFadedMeshes=8}register(e,t={}){e.updateWorldMatrix(!0,!0),e.traverse(n=>{!n.isMesh||n.isInstancedMesh||n.isSkinnedMesh||this.owners.has(n)||!(Array.isArray(n.material)?n.material:[n.material]).some(r=>r.visible&&(!r.transparent||r.opacity>=.85))||(n.geometry.computeBoundingBox(),this.bounds.push({mesh:n,box:n.geometry.boundingBox,inverse:n.matrixWorld.clone().invert()}),this.meshes.push(n),this.owners.set(n,t))})}blockers(e,t){this.targets.clear();for(let n=0;n<3;n++){this.direction.set(t.x,t.y+(n===0?1.65:n===1?1.05:.55),t.z).sub(e.position);let s=this.direction.length();if(!(s<=e.near+.1)){this.ray.set(e.position,this.direction.normalize());for(let r=0;r<this.bounds.length;r++){let a=this.bounds[r];if(!Qh(a.mesh)||(this.localRay.copy(this.ray.ray).applyMatrix4(a.inverse),!this.localRay.intersectBox(a.box,this.hitPoint)))continue;this.hitPoint.applyMatrix4(a.mesh.matrixWorld);let o=this.hitPoint.distanceTo(e.position);if(o>e.near&&o<s-.1&&this.targets.add(a.mesh),this.targets.size>=this.maxFadedMeshes)return}}}}update(e,t,n,s=!0){let r=Math.max(0,Math.min(n,.1));if(this.sinceSample+=r,!s)this.targets.clear(),this.sinceSample=1/0;else if(this.sinceSample>=.075){let o=e.position,l=this.pose;(l[0]!==o.x||l[1]!==o.y||l[2]!==o.z||l[3]!==t.x||l[4]!==t.y||l[5]!==t.z)&&(this.blockers(e,t),l[0]=o.x,l[1]=o.y,l[2]=o.z,l[3]=t.x,l[4]=t.y,l[5]=t.z),this.sinceSample=0}let a=Math.max(0,this.maxFadedMeshes-this.targets.size);for(let o=0;o<this.materialEntries.length;o++){let l=this.materialEntries[o],c=l.mesh;l.factor<1&&!this.targets.has(c)&&a--<=0&&(l.factor=1,c.material=l.original)}for(let o=0;o<this.targets.size;o++){let l=this.targets.values[o];if(this.materials.has(l))continue;let c=l.material,h=Array.isArray(c)?c:[c],d=h.map(u=>{let f=u.clone();return f.transparent=!0,f.depthWrite=!1,f}),m={mesh:l,original:c,sources:h,copies:d,factor:1,faded:Array.isArray(c)?d:d[0]};this.materials.set(l,m),this.materialEntries.push(m)}for(let o=0;o<this.materialEntries.length;o++){let l=this.materialEntries[o],c=l.mesh,h=s&&this.targets.has(c)&&Qh(c);if(l.factor=h?Math.max(.16,l.factor-r*8):Math.min(1,l.factor+r*6),l.factor>=1)c.material=l.original;else{for(let d=0;d<l.copies.length;d++)l.copies[d].opacity=l.sources[d].opacity*l.factor;c.material=l.faded}}}inspect(e,t){let n=sp(e,t,this.meshes),s=r=>{let a=this.materials.get(r);return{object:r.name||r.type,...this.owners.get(r),opacityFactor:a&&r.material===a.faded?a.factor:1}};return{hits:n,treatment:{method:"bounded-foreground-fade",applied:n.some(r=>s(r.object).opacityFactor<1),maximumMeshes:this.maxFadedMeshes,targetOpacityFactor:.16,sampleIntervalSeconds:.075,rawBlockers:n.map(r=>({...s(r.object),sample:r.sample})),fadingMeshes:[...this.materials].filter(([r,a])=>r.material===a.faded).map(([r])=>s(r)),retainedMaterialClones:[...this.materials.values()].reduce((r,a)=>r+a.copies.length,0)}}}dispose(){for(let e=0;e<this.materialEntries.length;e++){let t=this.materialEntries[e],n=t.mesh;n.material=t.original;for(let s of t.copies)s.dispose()}this.materials.clear(),this.materialEntries.length=0,this.targets.clear(),this.meshes.length=0,this.bounds.length=0,this.owners.clear()}},tc=class{constructor(e){this.canvas=e,this.mapScale=le.mapScale||1,this.scene=new Zr,this.scene.background=new Ve("#8fc8c8"),this.scene.fog=new Yr("#a4d2ce",.0012/this.mapScale),this.renderer=new Jl({canvas:e,antialias:!1,alpha:!1,powerPreference:"high-performance"}),this.renderer.info.autoReset=!1,this.renderer.setPixelRatio(Math.min(devicePixelRatio,1.5)),this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=Ko,this.renderer.outputColorSpace=Qt,this.renderer.toneMapping=rl,this.renderer.toneMappingExposure=1.2;let t=this.renderer.getContext(),n=t.getExtension("WEBGL_debug_renderer_info"),s=n?t.getParameter(n.UNMASKED_RENDERER_WEBGL):"";this.softwareRenderer=/swiftshader|llvmpipe|software/i.test(s),this.quality="auto",this.autoScale=this.softwareRenderer?.65:1,this.slowSamples=[],this.camera=new $t(56,1,.3,1800*this.mapScale),this.camera.position.set(100,88,145),this.scene.add(new _a("#e9f3d4","#277d81",2.7)),this.sun=new Ma("#fff1c5",3),this.sun.position.set(-80,130,40),this.sun.castShadow=!0,this.sun.shadow.mapSize.set(1024,1024),Object.assign(this.sun.shadow.camera,{left:-45,right:45,top:45,bottom:-45,near:1,far:240}),this.sun.shadow.bias=-.001,this.sun.shadow.normalBias=.2,this.scene.add(this.sun,this.sun.target);let r=new dt(new ci(1300*this.mapScale,32,16),new gn({side:Gt,depthWrite:!1,uniforms:{top:{value:new Ve("#438c9e")},bottom:{value:new Ve("#b4d8d2")}},vertexShader:"varying vec3 p;void main(){p=position;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}",fragmentShader:"varying vec3 p;uniform vec3 top;uniform vec3 bottom;void main(){float h=clamp(normalize(p).y*.85+.18,0.,1.);vec3 c=mix(bottom,top,pow(h,.65));float sun=pow(max(0.,dot(normalize(p),normalize(vec3(-.5,.35,-.6)))),80.);gl_FragColor=vec4(c+vec3(.35,.24,.1)*sun,1.);}"}));r.material.fog=!1,this.scene.add(r),this.islands=[],this.stations=[],this.relics=[],this.winds=[],this.collidables=[],this.foreground=new tu,this.labels=[],le.islands.forEach((f,y)=>{let g=Qf({radius:f.radius,region:f.region,index:y});if(g.position.set(f.x,f.y,f.z),this.scene.add(g),this.islands.push(g),this.foreground.register(g,{kind:"island",id:f.id}),g.traverse(v=>{v.isMesh&&!v.isInstancedMesh&&this.collidables.push(v)}),f.station){let v=Zh([0,2,1][this.stations.length%3]);v.position.set(f.x,f.y+.1,f.z),v.scale.setScalar(1.8),this.scene.add(v),this.foreground.register(v,{kind:"station",id:f.id}),this.stations.push({data:f,group:v})}else if(y===0){let v=Zh("astral");v.position.set(f.x+7,f.y,f.z+5),v.scale.setScalar(1.4),this.scene.add(v),this.foreground.register(v,{kind:"camp-decoration",id:f.id})}let p=document.createElement("div");p.className="island-label",p.innerHTML=`<span>${String(y+1).padStart(2,"0")} / ${f.region}</span>${f.name}<b>${f.station?"\u25C7":"\xB7"}</b>`,document.querySelector("#world-labels").append(p),this.labels.push({...np(p,!0),data:f})}),le.relics.forEach((f,y)=>{let g=ep(y);g.position.set(f.x,f.y+1.2,f.z),this.scene.add(g),this.relics.push({data:f,group:g})}),le.winds.forEach(f=>{let y=dv(f);this.scene.add(y);let g=f.start?Mt(f.end.x-f.start.x,f.end.z-f.start.z)/2:0,p=dc(g,f.radius||10,40),v=new ln(y.position.clone(),p);this.winds.push({data:f,group:y,halfLength:g,bounds:v,animationDt:0})}),this.packedWinds=lv(this.winds),this.hazards=le.hazards.map(f=>{let y=new At,g=new Rt({color:f.type==="thunder"?"#34485d":"#cbdfd4",transparent:!0,opacity:f.type==="thunder"?.57:.19,roughness:1,depthWrite:!1}),p=new qn(new li(1,1),g,12),v=new xt;for(let _=0;_<12;_++){let x=_*2.399;v.position.set(Math.cos(x)*f.radius*.6,_%4*10+18,Math.sin(x)*f.radius*.6),v.scale.set(f.radius*.42,8,f.radius*.32),v.updateMatrix(),p.setMatrixAt(_,v.matrix)}if(y.add(p),f.type==="thunder"){let _=new dt(new Un(4,0),new Rt({color:"#d6a9f4",emissive:"#ad77cf",emissiveIntensity:1}));_.position.y=33,y.add(_),y.userData.core=_}return y.position.set(f.x,f.y,f.z),this.scene.add(y),{group:y,data:f}}),this.challenges=le.challenges.map(f=>{let y=new ec("#f7d38e");return this.scene.add(y.group),{data:f,group:y.group,marker:y}}),this.surveyMarker=new ec,this.surveyMarker.group.name="main-survey-target",this.scene.add(this.surveyMarker.group),this.pilot=tp(),this.wasGrounded=!0,this.landingTime=0,this.scene.add(this.pilot.group);let a=new mn({color:"#082d39",transparent:!0,opacity:.24,depthWrite:!1});this.contactShadow=new dt(new rs(1.5,24),a),this.contactShadow.rotation.x=-Math.PI/2,this.scene.add(this.contactShadow),this.marker=new At;let o=new dt(new Nn(4.6,.12,6,56),new mn({color:"#ffe1a2",transparent:!0,opacity:.8}));o.rotation.x=-Math.PI/2,this.marker.add(o);let l=new dt(new oi(.15,.15,38,6),new mn({color:"#ffe5ae",transparent:!0,opacity:.25,depthWrite:!1}));l.position.y=19,this.marker.add(l),this.scene.add(this.marker);let c=new li(1,1),h=new Rt({color:"#d1e2ce",roughness:1,flatShading:!0,transparent:!0,opacity:.52,depthWrite:!1});this.clouds=new qn(c,h,100);let d=new xt;for(let f=0;f<100;f++){let y=f*2.39996,g=(90+Math.sqrt(f)*62)*this.mapScale;d.position.set(Math.cos(y)*g+70*this.mapScale,-55-f%5*8,Math.sin(y)*g-80*this.mapScale),d.scale.set((22+f%5*7)*Math.sqrt(this.mapScale),10+f%3*5,(15+f%7*4)*Math.sqrt(this.mapScale)),d.rotation.y=y,d.updateMatrix(),this.clouds.setMatrixAt(f,d.matrix)}this.scene.add(this.clouds);let m=new St,u=new Float32Array(540);for(let f=0;f<180;f++)u[f*3]=((Math.sin(f*237.33)*.5+.5)*700-250)*this.mapScale,u[f*3+1]=f%47*2,u[f*3+2]=(Math.cos(f*131.13)*350-50)*this.mapScale;m.setAttribute("position",new Ct(u,3)),this.dust=new na(m,new Js({size:.5,color:"#eff5c9",transparent:!0,opacity:.55,sizeAttenuation:!0})),this.scene.add(this.dust),this.routeLine=null,this.courseLine=null,this.courseId=null,this.courseWindKey="",this.courseWinds=[],this.yaw=0,this.manualYaw=0,this.cameraSnapPending=!1,this.pitch=.63,this.distance=26,this.overhead=!1,this.reduced=!1,this.menu=!0,this.target=new Ft,this.head=new Ft,this.desired=new Ft,this.look=new Ft,this.direction=new Ft,this.sunOffset=new Ft(-70,110,45),this.pilotSample={grounded:!0,gliding:!1,speed:0,mode:"idle"},this.navigationView={},this.navigationHint=void 0,this.navigationPhase="",this.fallbackNavigation={x:0,y:0,z:0,label:""},this.courseViews=new Map,this.projection=new Ft,this.worldPoint=new Ft,this.playerPoint=new Ft,this.windFrustum=new Pi,this.viewProjection=new Ye,this.phase={sceneUpdateMs:0,renderCpuMs:0},this.ray=new ds,this.frames=[],this.metrics={frames:0,drawCalls:0,triangles:0,geometries:0,textures:0},this.navTarget=document.querySelector("#nav-target"),this.navText=this.navTarget.querySelector("span"),this.navLabel=np(this.navTarget),this.labelClock=0,this.frameValues=new Float64Array(2),this.textTick=!1,this.navOcclusion=new Kh(this.navTarget,document.querySelector("#course"),globalThis.ResizeObserver,[document.querySelector(".telemetry")]),this.resize=()=>{let f=e.clientWidth,y=e.clientHeight;this.viewportWidth=f,this.viewportHeight=y,this.navTarget.style.width=`${Math.min(260,f-24)}px`,this.renderer.setSize(f,y,!1),this.camera.aspect=f/y,this.camera.updateProjectionMatrix(),this.navOcclusion.refresh()},window.addEventListener("resize",this.resize),this.resize()}setQuality(e){this.quality=e,this.renderer.setPixelRatio(e==="low"?.7:e==="auto"?Math.min(devicePixelRatio,1.5)*this.autoScale:Math.min(devicePixelRatio,1.5)),this.renderer.shadowMap.enabled=e==="high"||e==="auto"&&!this.softwareRenderer&&this.autoScale>=.9,this.clouds.visible=e!=="low",this.clouds.count=e==="auto"&&this.autoScale<.9?40:100,this.resize()}sampleFrame(e){if(this.quality!=="auto"||this.autoScale<=.5||(this.slowSamples.push(e),this.slowSamples.length<90))return;let t=this.slowSamples.reduce((n,s)=>n+s,0)/this.slowSamples.length;this.slowSamples.length=0,t>29&&(this.autoScale=Math.max(.5,this.autoScale-.15),this.setQuality("auto"))}setRoute(e){if(this.routeLine&&(this.scene.remove(this.routeLine),this.routeLine.geometry.dispose(),this.routeLine.material.dispose(),this.routeLine=null),!e?.waypoints?.length)return;let t=e.waypoints.map(n=>new Ft(n.x,n.y+2,n.z));this.routeLine=new Zs(new St().setFromPoints(t),new tr({color:e.style==="shortcut"?"#f2bf7a":"#c7f4df",dashSize:3,gapSize:4,transparent:!0,opacity:.55})),this.routeLine.computeLineDistances(),this.scene.add(this.routeLine)}cachedCourse(e,t,n=le){if(!e)return null;let s=e.campaignIndex!=null?t.campaignCircuitStages[e.campaignIndex]:t.courseStages[e.id]||0,r=e.campaignIndex!=null?t.campaignGate:t.challengeProgress[e.id]||0,a=t.challenges.includes(e.id),o=this.courseViews.get(e.id);return(!o||o.saved!==s||o.progress!==r||o.complete!==a)&&(o={saved:s,progress:r,complete:a,view:cv(e,t,n)},this.courseViews.set(e.id,o)),o.view}updateCourse(e,t=le){let n=e.activeCampaignCircuit!=null?t.campaignCircuits[e.activeCampaignCircuit]:null;if(!n){for(let o of t.challenges)if(o.id===e.activeChallenge){n=o;break}}let s=this.cachedCourse(n,e,t);if(this.courseVisual===s)return;this.courseVisual=s;let r=s?.key||null;if(this.courseId!==r&&(this.courseLine&&(this.scene.remove(this.courseLine),jh(this.courseLine),this.courseLine=null),this.courseId=r,s)){let o=s.points.map(l=>new Ft(l.x,l.y,l.z));this.courseLine=new Zs(new St().setFromPoints(o),new tr({color:"#f7d38e",dashSize:2,gapSize:4,transparent:!0,opacity:.6})),this.courseLine.computeLineDistances(),this.scene.add(this.courseLine)}let a=s?`${s.key}:${s.progress}`:"";if(this.courseWindKey!==a){for(let{group:o}of this.courseWinds)this.scene.remove(o),jh(o);this.courseWinds=[],this.courseWindKey=a;for(let o of s?.winds||[]){let l=o.type==="thermal"||o.type==="updraft",c=o.start?Mt(o.end.x-o.start.x,o.end.z-o.start.z):30,h=Jh(o.type,{radius:l?o.radius*.6:4,height:25,length:c});h.position.set(o.x,l?o.ceiling-22:o.start?(o.start.y+o.end.y)/2:o.y+o.height/2,o.z),!l&&o.direction&&(h.rotation.y=Math.atan2(o.direction.x,o.direction.z)),this.scene.add(h),this.courseWinds.push({data:o,group:h})}}}updateWorldWinds(e,t){let n=this.quality==="low"||this.quality==="auto"&&this.autoScale<.9;this.viewProjection.multiplyMatrices(this.camera.projectionMatrix,this.camera.matrixWorldInverse),this.windFrustum.setFromProjectionMatrix(this.viewProjection);let s=this.packedWinds,r=s.values,a=s.active,o=e.activeChallenge||e.activeCampaignCircuit!=null?"course":e.trackedHint||e.mainTransit?.[e.mainTransitIndex]?"safe":e.routeStyle;if(s.route!==o){s.route=o,s.count=0;for(let u=0;u<this.winds.length;u++){let f=this.winds[u];f.group.visible=Lu(f.data,e),f.group.visible&&(a[s.count++]=u)}}let l=e.player.x,c=e.player.z,h=-1,d=1/0;for(let u=0;u<s.count;u++){let f=a[u],y=f*10;if(!r[y+4])continue;let g=((l-r[y+5])*r[y+7]+(c-r[y+6])*r[y+8])*r[y+9],p=g<0?0:g>1?1:g,v=l-r[y+5]-p*r[y+7],_=c-r[y+6]-p*r[y+8],x=v*v+_*_;x<d&&(h=f,d=x)}let m=e.seed%1009/1009*Math.PI*2;for(let u=0;u<s.count;u++){let f=a[u],y=f*10,g=this.winds[f],p=g.data,v=g.group,_=r[y]-l,x=r[y+1]-c,T=_*_+x*x,A=(this.menu?850:420)+(r[y+3]||r[y+2]),C=!r[y+4]&&T<(r[y+2]+30)**2,P=!n||f===h||C||this.windFrustum.intersectsSphere(g.bounds);v.visible=T<A*A&&P&&(p.type!=="crosswind"||Math.sin(e.elapsed/p.period*Math.PI*2+m)>0),!(!v.visible||this.reduced)&&(s.times[f]+=t,(!n||s.times[f]>=.05)&&(v.userData.update?.(s.times[f]),s.times[f]=0))}}rotate(e,t){this.manualYaw-=e,this.pitch=ar.clamp(this.pitch+t,.23,1.15)}zoom(e){this.distance=ar.clamp(this.distance+e,16,52)}recenter({immediate:e=!1}={}){this.manualYaw=0,this.pitch=.63,this.distance=26,e&&(this.yaw=0,this.cameraSnapPending=!0)}inspectCamera(e){let t=new Ft(e.x,e.y+2,e.z),n=t.clone().project(this.camera),s=this.camera.position.distanceTo(t),r=this.foreground?.inspect(this.camera,e),a=r?.hits||sp(this.camera,e,this.collidables),o=a[0],l=le.islands.find(h=>dc(this.camera.position.x-h.x,this.camera.position.z-h.z)<h.radius),c=h=>({x:h.x,y:h.y,z:h.z});return{position:c(this.camera.position),target:c(this.target),near:this.camera.near,far:this.camera.far,fov:this.camera.fov,mode:this.menu?"menu":this.overhead?"overhead":"follow",manualYaw:this.manualYaw,yaw:this.yaw,pitch:this.pitch,distance:s,canvas:{width:this.canvas.width,height:this.canvas.height,cssWidth:this.canvas.clientWidth,cssHeight:this.canvas.clientHeight,pixelRatio:this.renderer.getPixelRatio()},playerNDC:c(n),playerInFrustum:Math.abs(n.x)<=1&&Math.abs(n.y)<=1&&Math.abs(n.z)<=1,platformUnderCamera:l?{id:l.id,surfaceY:l.y,clearance:this.camera.position.y-l.y}:null,occlusion:{blocked:!!o,rawBlocked:!!o,distance:o?.distance??null,point:o?c(o.point):null,object:o?o.object.name||o.object.type:null,sample:o?.sample??null,rawBlockerCount:a.length,treatment:r?.treatment??{method:"none",applied:!1},method:"Camera-to-player head, torso and hips rays against visible island and independent station/camp meshes. Raw geometry hits remain blocked even while locally faded. Excludes hidden LOD ancestry, instanced vegetation and translucent wind/cloud effects."}}}updateModels(e){let t=e.player,n=this.frameValues[0],s=this.frameValues[1],r=e.objective,a=this.navigationView,o=Mt(t.vx||0,t.vz||0);this.pilot.group.position.set(t.x,t.y,t.z),this.pilot.group.rotation.y=Math.PI-(t.heading||0),t.grounded&&!this.wasGrounded&&(this.landingTime=.42),this.landingTime=Math.max(0,this.landingTime-n),this.wasGrounded=t.grounded;let l=this.pilotSample;l.grounded=t.grounded,l.gliding=t.gliding,l.speed=o,l.mode=this.landingTime>0?"land":t.gliding?"glide":t.grounded?o>.4?"run":"idle":"jump",this.pilot.update(n,l);for(let h=0;h<this.relics.length;h++){let{data:d,group:m}=this.relics[h];m.visible=!e.relics.includes(d.id),this.reduced||(m.rotation.y=s*.7),m.position.y=d.y+1.2+(this.reduced?0:Math.sin(s*1.5+d.x)*.25)}for(let h=0;h<this.challenges.length;h++){let{data:d,marker:m}=this.challenges[h],u=this.cachedCourse(d,e);m.update(u.completed||e.activeCampaignCircuit!=null?null:e.activeChallenge===d.id&&e.challengeHint?e.challengeHint:u.entry,t)}this.surveyMarker.update(a.surveyTarget,t),this.updateCourse(e),this.routeLine&&(this.routeLine.visible=a.mainRouteVisible);for(let h=0;h<this.courseWinds.length;h++){let{data:d,group:m}=this.courseWinds[h];m.userData.update?.(this.reduced?0:n),d.type==="crosswind"&&(m.visible=Math.sin(e.elapsed/d.period*Math.PI*2+e.seed%1009/1009*Math.PI*2)>0)}for(let h=0;h<this.hazards.length;h++){let{data:d,group:m}=this.hazards[h];if(m.userData.core){let u=Math.sin(e.elapsed/d.period*Math.PI*2+e.seed%19)>.15;m.userData.core.material.emissiveIntensity=u?2:.25,m.userData.core.rotation.y=s*.3}}this.scene.fog.density=e.hazard==="fog"?.006:.0012/this.mapScale;let c=null;for(let h=0;h<le.islands.length;h++){let d=le.islands[h];if((t.x-d.x)**2+(t.z-d.z)**2<d.radius*d.radius){c=d;break}}this.contactShadow.visible=!!c,c&&(this.contactShadow.position.set(t.x,c.y+.09,t.z),this.contactShadow.scale.setScalar(Math.max(.5,1-(t.y-c.y)*.01))),this.marker.visible=!!r&&a.mainRouteVisible&&!e.surveyHint,this.marker.visible&&(this.marker.position.set(r.x,r.y+.2,r.z),this.marker.rotation.y=s*.2)}updateCamera(e){let t=e.player,n=this.frameValues[0],s=this.frameValues[1],r=this.head.set(t.x,t.y+2,t.z);this.camera.updateMatrixWorld();for(let o=0;o<this.islands.length;o++){let l=this.islands[o].children;for(let c=0;c<l.length;c++)l[c].isLOD&&l[c].update(this.camera)}let a;if(this.menu)a=this.desired.set(82+Math.sin(s*.03)*10,74,112),this.target.set(-20,7,-62),this.camera.position.lerp(a,1-Math.exp(-n*2));else{this.yaw=this.manualYaw;let o=this.overhead?1.22:this.pitch,l=this.overhead?65:this.distance*(this.camera.aspect<.8?1.3:1);a=this.desired.set(Math.sin(this.yaw)*Math.cos(o)*l,Math.sin(o)*l,Math.cos(this.yaw)*Math.cos(o)*l).add(r);let c=this.look.set(t.x+(t.vx||0)*.25,t.y+2,t.z+(t.vz||0)*.25),h=this.reduced||this.cameraSnapPending;this.target.lerp(c,h?1:1-Math.exp(-n*10));for(let u=0;u<le.islands.length;u++){let f=le.islands[u];(a.x-f.x)**2+(a.z-f.z)**2<(f.radius+3)**2&&(a.y=Math.max(a.y,f.y+8))}let d=r.distanceTo(a),m=d;for(let u=1;u<=48;u++){let f=u/48,y=r.x+(a.x-r.x)*f,g=r.y+(a.y-r.y)*f,p=r.z+(a.z-r.z)*f;if(!(f*d<=4)){for(let v=0;v<le.islands.length;v++){let _=le.islands[v],x=_.y-g;if(x<=-.2||x>=38)continue;let T=_.radius*Math.max(.15,1-Math.max(0,x-2)/43)+.75;if((y-_.x)**2+(p-_.z)**2<T*T){m=f*d;break}}if(m<d)break}}m<d&&a.lerp(r,Math.min(.7,1-(m-2)/d)),this.camera.position.lerp(a,h?1:1-Math.exp(-n*9)),this.cameraSnapPending=!1}this.camera.lookAt(this.target),this.camera.updateMatrixWorld();for(let o=0;o<this.islands.length;o++){let l=this.islands[o].children;for(let c=0;c<l.length;c++)l[c].isLOD&&l[c].update(this.camera)}this.sun.position.copy(r).add(this.sunOffset),this.sun.target.position.copy(r),this.sun.target.updateMatrixWorld()}updateLabels(e){let t=e.player,n=this.navigationView,s=this.viewportWidth,r=this.viewportHeight,a=this.textTick,o=null;for(let d of le.routes)if(d.id===e.objective?.routeId){o=d;break}let l=n.target;if(!l&&o){let d=0,m=1/0;for(let f=0;f<o.waypoints.length;f++){let y=o.waypoints[f],g=(y.x-t.x)**2+(y.z-t.z)**2;g<m&&(m=g,d=f)}l=this.fallbackNavigation;let u=o.waypoints[Math.min(d+1,o.waypoints.length-1)];l.x=u.x,l.y=u.y,l.z=u.z,l.label=d+1>=o.waypoints.length-1?"\u76EE\u6A19\u5CF6":"\u98A8\u9053\u7BC0\u9EDE"}let c=this.navTarget,h=l?"":"none";if(c.style.display!==h&&(c.style.display=h),l){let d=this.worldPoint.set(l.x,l.y,l.z),m=this.projection.copy(d).project(this.camera),u=(m.x*.5+.5)*s,f=(-m.y*.5+.5)*r;m.z>1&&(u=s/2,f=r-170);let y=Math.min(260,s-24),g=ar.clamp(u,y/2+8,s-y/2-8),p=ar.clamp(f,100,r-180);ip(this.navLabel,g,p,a);let v=n.label||l.label,_=this.navText;if(a||this.navLabel.textLabel!==v||this.navLabel.textHeading!==!!l.heading){let x=Math.round(d.distanceTo(this.playerPoint.set(t.x,t.y,t.z)));(this.navLabel.textDistance!==x||this.navLabel.textLabel!==v||this.navLabel.textHeading!==!!l.heading)&&(_.textContent=`${v} \xB7 ${x}m${l.heading?" \xB7 \u9806\u7BAD\u982D\u5165\u74B0":""}`,this.navLabel.textDistance=x,this.navLabel.textLabel=v,this.navLabel.textHeading=!!l.heading)}this.navOcclusion.place(this.navLabel.x,this.navLabel.y)}for(let d=0;d<this.labels.length;d++){let m=this.labels[d],u=m.label,f=m.data,y=this.projection.set(f.x,f.y+14,f.z).project(this.camera),g=this.camera.position.distanceTo(this.worldPoint.set(f.x,f.y,f.z)),p=y.z<1&&y.z>-1&&Math.abs(y.x)<1.1&&Math.abs(y.y)<1.1&&g>35?"block":"none";if(u.style.display!==p&&(u.style.display=p),p==="none")continue;ip(m,(y.x*.5+.5)*s,(-y.y*.5+.5)*r,a);let v=Math.round(Math.max(.35,1-g/(750*this.mapScale))*20);m.opacity!==v&&(u.style.opacity=String(v/20),m.opacity=v)}}update(e,t,n,s){let r=performance.now();this.frameValues[0]=t,this.frameValues[1]=this.reduced?0:n,this.labelClock+=t,this.textTick=this.labelClock>=.1,this.textTick&&(this.labelClock=0);let a=e.challengeHint||e.trackedHint||e.surveyHint;(this.navigationHint!==a||this.navigationPhase!==e.activeChallenge)&&(hv(e,this.navigationView),this.navigationHint=a,this.navigationPhase=e.activeChallenge),this.updateModels(e),this.updateCamera(e),this.updateWorldWinds(e,t),this.foreground.update(this.camera,e.player,t,!this.menu),this.updateLabels(e);let o=performance.now();this.phase.sceneUpdateMs=o-r,this.renderer.info.reset(),this.renderer.render(this.scene,this.camera),this.phase.renderCpuMs=performance.now()-o;let l=this.renderer.info;this.metrics.frames++,this.metrics.drawCalls=l.render.calls,this.metrics.triangles=l.render.triangles,this.metrics.geometries=l.memory.geometries,this.metrics.textures=l.memory.textures}dispose(){window.removeEventListener("resize",this.resize),this.navOcclusion.dispose(),this.foreground.dispose(),this.scene.traverse(e=>{e.geometry?.dispose(),e.material&&(Array.isArray(e.material)?e.material:[e.material]).forEach(n=>n.dispose())}),this.renderer.dispose()}};var nc=class{constructor(e,t){this.keys=new Set,this.axes={x:0,z:0},this.glide=!1,this.requestId=0,this.pendingId=0,this.sample={x:0,z:0,brake:!1,glide:!1,requestId:0},this.touchBrake=!1,this.brakePointer=null,this.enabled=!1,this.actions=t,this.listeners=[],this.disposed=!1,this.pointerCaptures=new Map,this.cameraPointer=null,this.cameraMousePointer=null,this.joyPointer=null;let n=(u,f,y,g)=>{u.addEventListener(f,y,g),this.listeners.push(()=>u.removeEventListener(f,y,g))};n(window,"keydown",u=>{if(!u.defaultPrevented){if(u.code==="Escape"){u.preventDefault(),u.repeat||t.pause();return}if(!/INPUT|SELECT|TEXTAREA/.test(u.target.tagName)&&["Space","ArrowUp","ArrowDown","ArrowLeft","ArrowRight","KeyW","KeyA","KeyS","KeyD","ShiftLeft","ShiftRight","KeyE","KeyC","KeyV","KeyH"].includes(u.code)){if(u.code==="Space"&&u.target.tagName==="BUTTON")return;u.preventDefault(),u.repeat||(u.code==="KeyH"&&t.help(),u.code==="KeyV"&&t.view(),u.code==="KeyC"&&t.recenter(),u.code==="KeyE"&&this.enabled&&t.interact(),u.code==="Space"&&this.enabled&&this.queueGlide()),this.enabled&&this.keys.add(u.code)}}}),n(window,"keyup",u=>this.keys.delete(u.code)),n(window,"blur",()=>{this.clear(),t.blur()}),n(document,"visibilitychange",()=>{document.hidden&&(this.clear(),t.blur())}),n(e,"contextmenu",u=>u.preventDefault());let s=u=>Number.isInteger(u.buttons)&&u.buttons>=0,r=u=>{this.cameraMousePointer!==u.pointerId&&this.cameraPointer?.id!==u.pointerId||(this.cameraPointer=null,this.cameraMousePointer=null,this.releasePointer(e,u.pointerId))};n(e,"pointerdown",u=>{if(!(this.cameraPointer!==null||this.cameraMousePointer!==null)){if(u.pointerType==="mouse"&&s(u)){if(!u.buttons||!this.capturePointer(e,u.pointerId))return;this.cameraMousePointer=u.pointerId,u.buttons&2&&(this.cameraPointer={id:u.pointerId,x:u.clientX,y:u.clientY});return}if(u.button===2||u.pointerType==="touch"){if(!this.capturePointer(e,u.pointerId))return;this.cameraPointer={id:u.pointerId,x:u.clientX,y:u.clientY}}}}),n(e,"pointermove",u=>{if(this.cameraMousePointer===u.pointerId){if(!s(u)||u.pointerType==="touch")return;if(!u.buttons)return r(u);if(!(u.buttons&2)){this.cameraPointer=null;return}if(!this.cameraPointer){this.cameraPointer={id:u.pointerId,x:u.clientX,y:u.clientY};return}}let f=this.cameraPointer;!f||f.id!==u.pointerId||(t.rotate((u.clientX-f.x)*.005,(u.clientY-f.y)*.004),f.x=u.clientX,f.y=u.clientY)}),n(e,"pointerup",r),n(e,"pointercancel",r),n(e,"lostpointercapture",r),n(e,"wheel",u=>{u.preventDefault(),t.zoom(u.deltaY*.02)},{passive:!1});let a=document.querySelector("#joystick"),o=document.querySelector("#stick"),l=u=>{if(this.joyPointer!==u.pointerId||!this.enabled)return;let f=a.getBoundingClientRect(),y=u.clientX-f.left-f.width/2,g=u.clientY-f.top-f.height/2,p=Math.hypot(y,g),v=Math.min(p,f.width*.32),_=p?y/p*v:0,x=p?g/p*v:0;this.axes={x:_/(f.width*.32),z:x/(f.height*.32)},o.style.transform=`translate(${_}px,${x}px)`};n(a,"pointerdown",u=>{u.preventDefault(),this.joyPointer===null&&this.capturePointer(a,u.pointerId)&&(this.joyPointer=u.pointerId,l(u))}),n(a,"pointermove",l);let c=u=>{this.joyPointer===u.pointerId&&(this.joyPointer=null,this.axes={x:0,z:0},o.style.transform="",this.releasePointer(a,u.pointerId))};n(a,"pointerup",c),n(a,"pointercancel",c),n(a,"lostpointercapture",c);let h=document.querySelector("#touch-glide");n(h,"pointerdown",u=>{u.preventDefault(),this.enabled&&this.queueGlide()});let d=document.querySelector("#touch-brake");n(d,"pointerdown",u=>{if(u.preventDefault(),this.enabled&&this.brakePointer===null){if(!this.capturePointer(d,u.pointerId))return;this.brakePointer=u.pointerId,this.touchBrake=!0}});let m=u=>{this.brakePointer===u.pointerId&&(this.brakePointer=null,this.touchBrake=!1,this.releasePointer(d,u.pointerId))};for(let u of["pointerup","pointercancel","lostpointercapture"])n(d,u,m);n(document.querySelector("#touch-reset"),"click",t.recenter)}capturePointer(e,t){try{return e.setPointerCapture(t),this.pointerCaptures.set(e,t),!0}catch{return!1}}releasePointer(e,t){this.pointerCaptures.get(e)===t&&this.pointerCaptures.delete(e);try{e.hasPointerCapture(t)&&e.releasePointerCapture(t)}catch{}}queueGlide(){return!this.enabled||this.glide?!1:(this.glide=!0,this.pendingId=++this.requestId,this.actions.glideQueued?.(this.pendingId),!0)}read(e=0){let t=this.sample;if(!this.enabled)return t.x=t.z=t.requestId=0,t.brake=t.glide=!1,t;let n=(this.keys.has("KeyD")||this.keys.has("ArrowRight")?1:0)-(this.keys.has("KeyA")||this.keys.has("ArrowLeft")?1:0)+this.axes.x,s=(this.keys.has("KeyS")||this.keys.has("ArrowDown")?1:0)-(this.keys.has("KeyW")||this.keys.has("ArrowUp")?1:0)+this.axes.z,r=Math.max(1,Math.sqrt(n*n+s*s));return t.x=(n*Math.cos(e)+s*Math.sin(e))/r,t.z=(s*Math.cos(e)-n*Math.sin(e))/r,t.brake=this.touchBrake||this.keys.has("ShiftLeft")||this.keys.has("ShiftRight"),t.glide=this.glide,t.requestId=this.pendingId,this.pendingId=0,this.glide=!1,t}clear(){let e=[...this.pointerCaptures];this.pointerCaptures.clear(),this.keys.clear(),this.glide=!1,this.pendingId=0,this.actions.glideCleared?.(),this.axes={x:0,z:0},this.touchBrake=!1,this.brakePointer=null,this.joyPointer=null,this.cameraPointer=null,this.cameraMousePointer=null,document.querySelector("#stick").style.transform="";for(let[t,n]of e)this.releasePointer(t,n)}setEnabled(e){this.enabled=e,e||this.clear()}dispose(){this.disposed||(this.disposed=!0,this.listeners.forEach(e=>e()),this.listeners.length=0,this.clear())}};var fv=Object.freeze({glide:{notes:[392,587.33,783.99],duration:.3,type:"triangle",gain:.18},tailwind:{notes:[293.66,440,587.33],duration:.45,type:"sine",gain:.13},energy:{notes:[220,196],duration:.16,type:"triangle",gain:.13},land:{notes:[98,146.83,196],duration:.22,type:"sine",gain:.22},stall:{notes:[293.66,220,146.83],duration:.2,type:"triangle",gain:.15},unlock:{notes:[293.66,369.99,440,587.33,739.99],duration:.19,type:"sine",gain:.2},ui:{notes:[587.33],duration:.07,type:"sine",gain:.09},relic:{notes:[440,587.33,880],duration:.15,type:"sine",gain:.17},finish:{notes:[293.66,369.99,440,587.33,739.99,880],duration:.25,type:"sine",gain:.2}}),pv={deploy:"glide",sail:"glide",open:"glide",wind:"tailwind",low:"energy",lowEnergy:"energy",exhausted:"energy",landing:"land",fail:"stall",respawn:"stall",station:"unlock",interact:"ui",collect:"relic",complete:"finish"},vs=(i,e,t)=>Math.min(t,Math.max(e,Number.isFinite(i)?i:e)),mv=[293.66,0,440,369.99,587.33,0,440,0,329.63,0,493.88,440,369.99,0,293.66,0],ic=class{constructor(){this.context=null,this.musicVolume=.55,this.sfxVolume=.7,this.paused=!1,this.active=new Set,this.lastEvent=new Map,this.musicTime=0,this.nextNote=0,this.noteIndex=0,this.windFilter=null,this.windGain=null,this.disposed=!1,this.sampleBuffers=new Map,this.sampleFailed=!1,this.stats={peakVoices:0,events:0,maxVoices:20}}async unlock(){try{return await this.openContext()}catch{return!1}}async openContext(){if(this.disposed)return!1;let e=globalThis.AudioContext||globalThis.webkitAudioContext;if(!e)return!1;if(!this.context){this.context=new e;let t=this.context;this.master=t.createGain(),this.master.gain.value=.6,this.master.connect(t.destination),this.musicBus=t.createGain(),this.sfxBus=t.createGain(),this.musicBus.gain.value=this.musicVolume,this.sfxBus.gain.value=this.sfxVolume,this.musicBus.connect(this.master),this.sfxBus.connect(this.master);let n=t.sampleRate*4,s=t.createBuffer(1,n,t.sampleRate),r=s.getChannelData(0),a=72429,o=0;for(let l=0;l<n;l++){a=Math.imul(a,1664525)+1013904223>>>0;let c=a/4294967296*2-1;o=.985*o+.015*c,r[l]=o*4*Math.min(1,l/512,(n-1-l)/512)}this.air=t.createBufferSource(),this.air.buffer=s,this.air.loop=!0,this.windFilter=t.createBiquadFilter(),this.windFilter.type="lowpass",this.windFilter.frequency.value=450,this.windGain=t.createGain(),this.windGain.gain.value=.12,this.air.connect(this.windFilter),this.windFilter.connect(this.windGain),this.windGain.connect(this.musicBus),this.air.start(),this.loadSamples()}return await this.syncContext(),this.context?.state==="running"}async loadSamples(){try{await Promise.all(["glide","land","stall","unlock","ui","relic"].map(async e=>{let t=await fetch(new URL(`./assets/audio/${e}.wav`,document.baseURI));if(!t.ok)throw new Error(`audio ${e}: ${t.status}`);let n=await this.context.decodeAudioData(await t.arrayBuffer());this.disposed||this.sampleBuffers.set(e,n)}))}catch{this.sampleFailed=!0}}setVolumes({music:e=this.musicVolume,sfx:t=this.sfxVolume}={}){if(this.musicVolume=vs(Number(e),0,1),this.sfxVolume=vs(Number(t),0,1),this.context){let n=this.context.currentTime;this.musicBus.gain.setTargetAtTime(this.musicVolume,n,.035),this.sfxBus.gain.setTargetAtTime(this.sfxVolume,n,.035)}}syncContext(){return this.transition=(this.transition||Promise.resolve()).catch(()=>{}).then(async()=>{let e=this.context;!e||this.disposed||e.state==="closed"||(this.paused&&e.state==="running"?await e.suspend():!this.paused&&e.state!=="running"&&(this.nextNote=e.currentTime+.1,await e.resume()))}).catch(()=>{}),this.transition}setPaused(e){this.paused=!!e,this.syncContext()}register(e){if(this.active.size>=this.stats.maxVoices){let t=this.active.values().next().value;try{t.stop()}catch{}this.active.delete(t)}this.active.add(e),this.stats.peakVoices=Math.max(this.stats.peakVoices,this.active.size),e.onended=()=>{e.onended=null,this.active.delete(e);try{e.disconnect()}catch{}}}tone(e,t,n,s,r,a){let o=this.context,l=o.createOscillator(),c=o.createGain();l.type=s,l.frequency.setValueAtTime(e,t),c.gain.setValueAtTime(1e-4,t),c.gain.exponentialRampToValueAtTime(Math.max(1e-4,r),t+.015),c.gain.exponentialRampToValueAtTime(1e-4,t+n),l.connect(c),c.connect(a),this.register(l);let h=l.onended;l.onended=()=>{h(),c.disconnect()},l.start(t),l.stop(t+n+.02)}play(e){if(!this.context||this.context.state!=="running"||this.paused||this.disposed)return;let t=pv[e]||e,n=fv[t];if(!n)return;let s=this.context.currentTime,r=this.lastEvent.get(t)??-1/0,a=t==="glide"?0:t==="energy"?1.6:t==="tailwind"?1:.08;if(s-r<a)return;this.lastEvent.set(t,s),this.stats.events++;let o=this.sampleBuffers.get(t);if(o){let l=this.context.createBufferSource(),c=this.context.createGain();l.buffer=o,c.gain.value=.6,l.connect(c),c.connect(this.sfxBus),this.register(l);let h=l.onended;l.onended=()=>{h(),c.disconnect()},l.start();return}n.notes.forEach((l,c)=>this.tone(l,s+c*n.duration*.58,n.duration,n.type,n.gain,this.sfxBus))}update({speed:e=0,energy:t=100,wind:n=0,dt:s=1/60}={}){if(!this.context||this.context.state!=="running"||this.paused||this.disposed)return;let r=this.context,a=r.currentTime,o=typeof n=="number"?n:n?1:0;this.windFilter.frequency.setTargetAtTime(360+vs(e,0,30)*28+vs(o,0,2)*190,a,.2),this.windGain.gain.setTargetAtTime(.07+vs(e,0,30)*.007+vs(o,0,2)*.07,a,.2),t<18&&t>0&&this.play("energy");let l=mv;if(this.nextNote<a-.5&&(this.nextNote=a+.06),this.nextNote<=a+.13){let c=this.noteIndex%l.length,h=l[c];h&&this.tone(h,this.nextNote,1.75,"sine",.065,this.musicBus),c%4===0&&this.tone(c<8?146.83:164.81,this.nextNote,3.3,"triangle",.028,this.musicBus),this.nextNote+=.8,this.noteIndex++}this.musicTime+=vs(s,0,.1)}async dispose(){if(!this.disposed){this.disposed=!0;for(let e of this.active)try{e.stop(),e.disconnect()}catch{}if(this.active.clear(),this.air)try{this.air.stop(),this.air.disconnect()}catch{}this.sampleBuffers.clear(),this.context&&this.context.state!=="closed"&&await this.context.close(),this.context=null}}};var rp=i=>{if(i===null||typeof i!="object")return!1;let e=Object.getPrototypeOf(i);return e===Object.prototype||e===null},sc=class{constructor(e){this.handlers=e,this.ready=!1,this.currentState="ready",this.session=new URLSearchParams(location.search).get("session"),this.embedded=window.parent!==window&&!!this.session,this.listener=t=>this.receive(t),window.addEventListener("message",this.listener)}send(e,t={}){this.embedded&&window.parent.postMessage({protocol:"stteak-game",version:1,sessionId:this.session,type:e,payload:t},location.origin)}setReady(){this.ready=!0,this.send("game:ready",{capabilities:["pause","resume","restart","keyboard","touch","local-save"]}),this.state(this.currentState)}state(e){this.currentState=e,this.send("game:state",{state:e})}receive(e){let t=e.data;if(!(!this.embedded||e.source!==window.parent||e.origin!==location.origin||!rp(t)||t.protocol!=="stteak-game"||t.version!==1||t.sessionId!==this.session||!rp(t.payload))){if(t.type==="host:init"){t.payload.gameId==="aetherwake"&&typeof t.payload.title=="string"&&this.ready&&this.setReady();return}!["host:start","host:pause","host:resume","host:restart"].includes(t.type)||Object.keys(t.payload).length||this.ready&&this.handlers[t.type]?.()}}dispose(){window.removeEventListener("message",this.listener)}};var rc=class{constructor(e,t=2048){this.names=e,this.capacity=t,this.samples=Object.fromEntries(e.map(n=>[n,new Float64Array(t)])),this.count=0,this.index=0}push(e){for(let t=0;t<this.names.length;t++){let n=this.names[t];this.samples[n][this.index]=e[n]}this.index=(this.index+1)%this.capacity,this.count=Math.min(this.count+1,this.capacity)}summary(){return Object.fromEntries(this.names.map(e=>{let t=Array.from(this.samples[e].subarray(0,this.count)).sort((n,s)=>n-s);return[e,{count:this.count,mean:this.count?t.reduce((n,s)=>n+s,0)/this.count:null,p95:this.count?t[Math.min(this.count-1,Math.floor(this.count*.95))]:null}]}))}};var nu={id:"aetherwake-r4-20261112",version:"1.1.0",stage:"candidate",date:"2026-11-12"};var ap=new Map,Se=i=>document.querySelector(i),Ht=(i,e=!0)=>Se(i).classList.toggle("hidden",!e),st=(i,e)=>{let t=ap.get(i);t||(t={element:Se(i),value:void 0},ap.set(i,t)),t.value!==e&&(t.element.textContent=e,t.value=e)},mr=i=>`${String(Math.floor(i/60)).padStart(2,"0")}:${String(Math.floor(i%60)).padStart(2,"0")}`,iu=new WeakMap;function gv(i){if(iu.has(i))return iu.get(i);let e=[];i.minSpeed&&e.push(`\u901F\u5EA6 \u2265${i.minSpeed}m/s`),i.maxSpeed&&e.push(`\u901F\u5EA6 \u2264${i.maxSpeed}m/s`),i.minEnergy&&e.push(`\u80FD\u91CF \u2265${i.minEnergy}%`),i.maxVerticalSpeed&&e.push(`\u5347\u964D \u2264${i.maxVerticalSpeed}m/s`),i.heading&&e.push("\u9806\u74B0\u4E0A\u7BAD\u982D\u901A\u904E");let t=e.join(" \xB7 ");return iu.set(i,t),t}var hu=matchMedia("(pointer: coarse)"),uu=hu.matches,dp=i=>{uu=i.matches};hu.addEventListener("change",dp);var fp=new Map(le.routes.map(i=>[i.id,i])),au=new Map(le.challenges.map(i=>[i.id,i])),ou=new Map;function dr(i,e,t="",n=""){ou.get(i)!==e&&(ou.set(i,e),st(i,t+e+n))}var Qe={hint:null,distance:-1,touch:null,grounded:null,braking:null,gliding:null,checkpoint:null,activated:-1,conditionHint:null,conditionNodes:[],conditionStates:new Int8Array(6),altitude:NaN,detailBand:NaN,cargo:NaN,seconds:-1,weatherSeconds:NaN},yv=le.islands.map((i,e)=>String(e+1)),du=.48/(le.mapScale||1),xv=[5,5],_v=[],La,pp,vv=i=>La.width*.3+i*du,Mv=i=>La.height*.6+i*du,Jt=i=>String(i).replace(/[&<>"']/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[e]),ct,vn,pe,Fe,Zn,Lt,ft,mp=null,gr="turn",ht=!1,Ot="",fr=null,op=0,vi=0,lp="",yr=!1,pr=!1,lc,Fi=0,Da=performance.now(),su=0,Ua=new qa,gp=new rc(["simulationMs","sceneUpdateMs","renderCpuMs","hudMapMs","rafIntervalMs","applicationUpdateMs"]),oc=new Float64Array(9e3),yp=0,ru=0,Ia=0,xp=0,cc=0,cp=0,ac={speed:0,energy:100,wind:!1},Ni={simulationMs:0,sceneUpdateMs:0,renderCpuMs:0,hudMapMs:0,rafIntervalMs:0,applicationUpdateMs:0},vt={accepted:0,applied:0,receipt:0,acknowledged:0,processed:0,consumed:0,maxProcessingMs:0,submitted:0,submittedId:0,maxConsumptionProcessingMs:0,maxAcknowledgementMs:0,eventCount:0,maxEventAcknowledgementMs:0},nn=()=>pe.status==="complete"||pe.status==="failed",yi=()=>pe.status==="failed"?Ap():Cp(),_p=0,vp=0,Mp=0;function kt(i){st("#toast",i),Se("#toast").classList.add("visible"),clearTimeout(op),op=setTimeout(()=>Se("#toast").classList.remove("visible"),4200)}function Sp(){return pe?.state.mode==="exploration"?"\u81EA\u7531\u63A2\u7D22\u5B8C\u6210 / \u4E0D\u8A08\u6392\u540D":mp?"\u9060\u5F81\u5B8C\u6210 / \u672C\u6B21\u4FDD\u5B58\u672A\u5B8C\u6210":"\u9060\u5F81\u5B8C\u6210 / \u500B\u4EBA\u6210\u7E3E\u5DF2\u4FDD\u5B58"}function fu(i){mp=i||null,Ht("#storage-warning",!!i),i&&st("#storage-warning",i),Ot==="result"&&st("#modal-kicker",Sp())}function Wt(){let i=Ua.save({...pe.saveData(),settings:Lt});return fu(i.warning),ft=Ua.load().save,i}function Ms(){ct.setQuality(Lt.quality),ct.reduced=Lt.reducedMotion,ct.overhead=Lt.camera==="overhead",Fe.setVolumes({music:Lt.music,sfx:Lt.sfx}),st("#camera",ct.overhead?"\u8FFD\u96A8 V":"\u4FEF\u77B0 V")}function Sv(){for(let i of document.querySelectorAll(".module"))i.setAttribute("aria-pressed",String(i.dataset.module===gr))}function bv(i){gr=i,Sv(),Fe?.play("ui")}function xi(i=!1){if(!pr){if(clearTimeout(vi),Bi(!1),Fe.unlock(),i?(pe=new As({save:ft}),gr=ft.module):(pe.persisted=ft,pe.state.mode=Se("#mode").value,pe.reset({seed:Number(Se("#seed").value)||2718,module:gr})),nn()){ht=!0,ct.menu=!1,ct.recenter({immediate:!0}),vn.setEnabled(!1),Ht("#landing",!1),Ht("#flight-hud"),Kn(),yi();return}pe.launch(),ht=!0,ct.menu=!1,ct.recenter({immediate:!0}),Fi=0,Da=performance.now(),vn.setEnabled(!0),Ht("#landing",!1),Ht("#flight-hud"),Fe.setPaused(!1),Zn.state("running"),Ht("#guide",!yr),Se("#world").focus(),Wt(),Kn(),kt(i?"\u5DF2\u56DE\u5230\u4E0A\u6B21\u7684\u5B89\u5168\u843D\u9EDE\u3002":uu?"\u5148\u9EDE\u5C55\u5E06\u8D77\u8DF3\uFF0C\u518D\u7528\u5DE6\u6416\u687F\u6CBF\u5730\u5716\u98A8\u7DDA\u524D\u9032\u3002":"\u5148\u6309 Space \u8D77\u8DF3\uFF0C\u518D\u6CBF\u5730\u5716\u4E0A\u7684\u98A8\u7DDA\u524D\u9032\u3002")}}function Oi(i="pause"){clearTimeout(vi),!(!ht||nn())&&(pe.setPaused(!0),vn.setEnabled(!1),i==="dialogue"?vi=setTimeout(()=>Fe.setPaused(!0),1200):Fe.setPaused(!0),Fi=0,Zn.state("paused"),Wt(),(i==="pause"||i==="blur")&&xr(i==="blur"?"\u822A\u7A0B\u5DF2\u5B89\u5168\u66AB\u505C":"\u5728\u98A8\u505C\u4E0B\u4F86\u7684\u5730\u65B9"))}function Jn(){pr||(clearTimeout(vi),!(!ht||nn())&&(Bi(!1),pe.setPaused(!1),vn.setEnabled(!0),Fe.unlock(),Fe.setPaused(!1),Da=performance.now(),Fi=0,Zn.state("running"),Se("#world").focus()))}function hp(){if(Ot)return bp();if(!ht)return _i();pe.status==="paused"?Jn():Oi()}function bp(){if(Ot&&Ot!=="context"){if(Ot==="erase")return Fa();if(Ot==="settings")return _i();if(Ot==="courses"||Ot==="journal")return ht&&nn()?yi():_i();if(Ot==="restart")return xr();if(Ot==="result"||Ot==="failure"){Na(),Se("#start").focus();return}if(Ot==="help")return ht?nn()?yi():xr():Bi();if(ht)return nn()?yi():Jn();Bi()}}var lu=0;function zn(i,e,t,n=[],s="AETHERWAKE / \u822A\u884C\u8A8C"){let r=++lu;Ot||(fr=document.activeElement),Ot=i,st("#modal-kicker",s),st("#modal-title",e),Se("#modal").append(Se("#storage-warning")),Se("#modal-body").innerHTML=t,Se("#modal-actions").replaceChildren();for(let a of n){let o=document.createElement("button");o.textContent=a.label,o.disabled=!!a.disabled,a.primary&&(o.className="primary"),o.onclick=()=>{Fe.play("ui"),a.action()},Se("#modal-actions").append(o)}Ht("#modal");for(let a of Se("#game").children)["modal","toast","storage-warning","fatal"].includes(a.id)||(a.inert=!0);requestAnimationFrame(()=>{if(r!==lu||!Ot)return;let a=Se("#modal .modal-panel"),o=Se("#modal-actions button"),l=Se("#close-modal"),c=a.scrollHeight>a.clientHeight,h=["help","journal","courses"].includes(i);a.scrollTop=0,(h||c?l:o||l).focus({preventScroll:!0})})}function Bi(i=!0){++lu,Ht("#modal",!1),Se("#toast").after(Se("#storage-warning")),Ot="";for(let e of Se("#game").children)e.inert=!1;i&&(fr?.isConnected&&fr!==document.body&&!fr.closest(".hidden")?fr:Se(ht?"#world":"#start")).focus(),fr=null,Se("#modal-body").replaceChildren(),Se("#modal-actions").replaceChildren()}function Ep(){return`<div class="settings-grid"><label>\u74B0\u5883\u8207\u97F3\u6A02 <input id="music-volume" type="range" min="0" max="1" step="0.05" value="${Lt.music}"></label><label>\u52D5\u4F5C\u97F3\u6548 <input id="sfx-volume" type="range" min="0" max="1" step="0.05" value="${Lt.sfx}"></label><label>\u756B\u8CEA <select id="quality"><option value="auto">\u81EA\u52D5 \xB7 \u4F9D\u6548\u80FD\u8ABF\u6574\u89E3\u6790\u5EA6</option><option value="low">\u7BC0\u80FD \xB7 \u95DC\u9589\u5373\u6642\u9670\u5F71</option><option value="high">\u7CBE\u7DFB \xB7 \u5373\u6642\u9670\u5F71</option></select></label><label>\u93E1\u982D <select id="camera-setting"><option value="follow">\u53D7\u63A7\u8FFD\u96A8</option><option value="overhead">\u4FEF\u77B0\u822A\u7DDA</option></select></label><label class="check"><input id="reduced-motion" type="checkbox" ${Lt.reducedMotion?"checked":""}>\u6E1B\u5C11\u52D5\u614B\uFF0F\u8996\u5DEE</label><label class="check"><input id="assist" type="checkbox" ${pe.assist?"checked":""}>\u98A8\u7DDA\u8F14\u52A9\uFF08\u7368\u7ACB\u6A19\u8A18\u6210\u7E3E\uFF09</label></div><p class="modal-note">\u5C07\u5169\u500B\u97F3\u91CF\u6ED1\u687F\u8ABF\u81F3 0 \u53EF\u5B8C\u5168\u975C\u97F3\u3002\u8A2D\u5B9A\u6703\u81EA\u52D5\u4FDD\u5B58\u3002</p>`}function wp(){if(pe.state.mode==="expedition"){let i=document.createElement("button");i.textContent="\u6C38\u4E45\u6539\u70BA\u81EA\u7531\u63A2\u7D22\uFF08\u672C\u6B21\u4E0D\u6392\u540D\uFF09",i.onclick=()=>{pe.setExploration(),Wt(),Fa()},Se("#modal-body").append(i)}Se("#quality").value=Lt.quality,Se("#camera-setting").value=Lt.camera;for(let[i,e]of[["music-volume","music"],["sfx-volume","sfx"]])Se("#"+i).oninput=t=>{Lt[e]=Number(t.target.value),Fe.unlock(),Ms(),Wt()};Se("#quality").onchange=i=>{Lt.quality=i.target.value,Ms(),Wt()},Se("#camera-setting").onchange=i=>{Lt.camera=i.target.value,Ms(),Wt()},Se("#reduced-motion").onchange=i=>{Lt.reducedMotion=i.target.checked,Ms(),Wt()},Se("#assist").onchange=i=>{pe.setAssist(i.target.checked),Wt()}}function Ev(){return ht?nn()?yi():xr():Bi()}function xr(i="\u5728\u98A8\u505C\u4E0B\u4F86\u7684\u5730\u65B9"){if(ht&&nn())return yi();zn("pause",i,`<p>\u98DB\u884C\u3001\u5E06\u80FD\u91CF\u8207\u8A08\u6642\u5DF2\u51CD\u7D50\u3002\u5B89\u5168\u843D\u5CF6\u8207\u53D6\u5F97\u788E\u7247\u6642\u6703\u81EA\u52D5\u5132\u5B58\uFF1B\u91CD\u65B0\u8F09\u5165\u6703\u56DE\u5230\u6700\u5F8C\u7684\u5B89\u5168\u5CF6\u3002</p>${Ep()}`,[{label:"\u7E7C\u7E8C\u822A\u7A0B",primary:!0,action:Jn},{label:"\u64CD\u4F5C\u8207\u822A\u884C\u8A8C",action:_i},{label:"\u9078\u64C7\u6E2C\u98A8\u9060\u5F81",action:pu},{label:"\u91CD\u65B0\u9060\u5F81",action:wv},{label:"\u8FD4\u56DE\u6E96\u5099\u756B\u9762",action:Na}],"\u2161 / \u822A\u7A0B\u66AB\u505C"),wp()}function wv(){zn("restart","\u91CD\u65B0\u8FCE\u63A5\u9019\u9663\u98A8\uFF1F","<p>\u672C\u8D9F\u89C0\u6E2C\u53F0\u3001\u4E3B\u7DDA\u89C0\u6E2C\u8207\u6642\u9593\u6703\u91CD\u65B0\u8A08\u7B97\u3002\u6587\u660E\u788E\u7247\u3001\u5DF2\u4EA4\u4ED8\u7684\u6E2C\u98A8\u968E\u6BB5\u3001\u5DF2\u767C\u73FE\u5CF6\u5DBC\u8207\u500B\u4EBA\u6210\u7E3E\u4FDD\u7559\u3002\u82E5\u8981\u63DB\u6A21\u7D44\u6216\u7A2E\u5B50\uFF0C\u8ACB\u8FD4\u56DE\u6E96\u5099\u756B\u9762\u3002</p>",[{label:"\u91CD\u65B0\u9060\u5F81",primary:!0,action:()=>xi(!1)},{label:"\u4FDD\u7559\u822A\u7A0B",action:()=>xr()}])}function Na(){clearTimeout(vi),ht&&!nn()&&(Oi("silent"),Wt()),ht=!1,vn.setEnabled(!1),Fe.setPaused(!0),ct.menu=!0,Bi(),Ht("#flight-hud",!1),Ht("#landing"),Ht("#continue",ft.elapsed>0),st("#continue",ft.failed?"\u67E5\u770B\u64A4\u56DE\u7D00\u9304":ft.completed?"\u67E5\u770B\u7D50\u7B97\uFF0F\u7E7C\u7E8C\u63A2\u7D22":"\u7E7C\u7E8C\u4E0A\u6B21\u822A\u7A0B"),Zn.state("ready"),st("#objective","\u8B93\u6C89\u7761\u7684\u661F\u5716\u518D\u6B21\u767C\u5149"),st("#objective-sub","\u4F9D\u5E8F\u4FEE\u5FA9\u4E09\u5EA7\u89C0\u6E2C\u53F0\uFF0C\u8FD4\u56DE\u71DF\u5730\u3002")}function _i(){ht&&pe.status==="running"&&Oi("silent"),zn("help","\u8B80\u61C2\u98A8\uFF0C\u627E\u5230\u56DE\u5BB6\u7684\u8DEF",'<p class="modal-note">\u9060\u5F81\u7684\u5929\u5019\u7A97\u53E3\u70BA 45 \u5206\u9418\uFF08\u50C5\u5BE6\u969B\u822A\u7A0B\u8A08\u6642\uFF0C\u5730\u9762\u4EA6\u8A08\u6642\uFF09\uFF1B\u903E\u6642\u9060\u5F81\u5931\u6557\uFF0C\u53EF\u91CD\u555F\u6216\u6C38\u4E45\u8F49\u70BA\u4E0D\u6392\u540D\u7684\u81EA\u7531\u63A2\u7D22\u3002\u4E09\u6BB5\u4E3B\u7DDA\u5206\u5225\u662F\u6E2C\u98A8\u6821\u6E96\u3001\u7A69\u5B9A\u8CA8\u904B\u3001\u9727\u4E2D\u5B9A\u4F4D\u3002\u6BCF\u5EA7\u89C0\u6E2C\u53F0\u4EA4\u4ED8\u5F8C\uFF0C\u5FC5\u9808\u5B8C\u6210\u4E09\u6BB5\u4E5D\u9580\u5DE1\u6E2C\uFF1A\u84C4\u98A8\u9810\u7B97\u3001\u5074\u6D41\u5B9A\u5411\u3001\u9727\u6D77\u5FA9\u6838\u3002\u6BCF\u6BB5\u843D\u5CF6\u6309 E \u4FDD\u5B58\uFF0C\u4E4B\u5F8C\u624D\u80FD\u63A5\u7E8C\u4E3B\u7DDA\u3002\u6700\u5F8C\u6CBF\u516D\u5EA7\u8FD4\u822A\u822A\u6A19\u56DE\u71DF\u5730\u7D50\u7B97\u3002\u4F9D\u5E8F\u901A\u904E\u5E36\u689D\u4EF6\u7684\u89C0\u6E2C\u74B0\uFF0C\u518D\u843D\u5230\u8606\u5149\u5EAD \u2192 \u96F7\u96F2\u5929\u6587\u53F0 \u2192 \u6B78\u661F\u81FA\u6309 E \u4EA4\u4ED8\uFF0C\u6700\u5F8C\u8FD4\u56DE\u6668\u98A8\u71DF\u5730\u7D50\u7B97\u3002\u74B0\u4E0A\u7BAD\u982D\u8868\u793A\u9032\u5165\u65B9\u5411\uFF0C\u76F4\u67F1\u8868\u793A\u4EA4\u4ED8\u9EDE\u3002</p><div class="control-table"><b>WASD / \u65B9\u5411\u9375</b><span>\u4F9D\u756B\u9762\u65B9\u5411\u79FB\u52D5\u3002\u7A7A\u4E2D\u653E\u958B\u6703\u4FDD\u6301\u6ED1\u7FD4\u3002</span><b>Space / \u5C55\u5E06</b><span>\u5730\u9762\u8D77\u8DF3\uFF0C\u7A7A\u4E2D\u5207\u63DB\u5C55\u5E06\u3002\u4E0D\u5FC5\u4E00\u76F4\u6309\u4F4F\u3002</span><b>Shift / \u6E1B\u901F</b><span>\u6309\u4F4F\u6536\u5E06\u4E0B\u964D\u3002\u62B5\u5CF6\u4E0A\u7A7A\u6642\u6E1B\u901F\uFF0C\u843D\u5730\u5F8C\u653E\u958B\u3002</span><b>E / \u4E92\u52D5\u9375</b><span>\u4EA4\u4ED8\u89C0\u6E2C\u8CC7\u6599\uFF0F\u6E2C\u98A8\u968E\u6BB5\uFF0C\u6216\u56DE\u71DF\u5730\u7D50\u7B97\u3002</span><b>\u53F3\u9375\u62D6\u66F3 / \u6EFE\u8F2A</b><span>\u8ABF\u6574\u93E1\u982D\uFF1BC \u56DE\u6B63\uFF0CV \u5207\u63DB\u4FEF\u77B0\u3002</span><b>\u624B\u6A5F</b><span>\u5DE6\u5074\u6416\u687F\uFF0B\u53F3\u5074\u5C55\u5E06\uFF0F\u6E1B\u901F\u53EF\u540C\u6642\u64CD\u4F5C\uFF1B\u7A7A\u767D\u5834\u666F\u62D6\u52D5\u93E1\u982D\u3002</span></div><h3>\u8B80\u98A8\u8207\u9078\u8DEF</h3><ul><li>\u9577\u5E36\uFF0B\u7BAD\u982D\uFF1D\u9806\u98A8\uFF0C\u6301\u7E8C\u88DC\u80FD\u4E26\u52A0\u901F\uFF1B\u87BA\u65CB\u74B0\uFF1D\u71B1\u6D41\uFF0C\u62AC\u5347\u9AD8\u5EA6\u3002</li><li>\u6A6B\u5411\u64FA\u52D5\u6A19\u8A18\uFF1D\u9593\u6B47\u5074\u98A8\uFF1B\u96F7\u5FC3\u8108\u52D5\u6642\u7E5E\u884C\u5916\u7DE3\uFF0C\u9727\u4E2D\u53C3\u8003\u5CF6\u540D\u548C\u5730\u5716\u3002</li><li>\u5B89\u5168\u98A8\u9053\u8F03\u5BEC\uFF0C\u9014\u7D93\u88DC\u7D66\u5CF6\uFF1B\u7A7F\u96F2\u6377\u5F91\u8DEF\u77ED\uFF0C\u9700\u8981\u66F4\u7CBE\u6E96\u7684\u65B9\u5411\u4FEE\u6B63\u3002</li><li>\u6C92\u6709\u80FD\u91CF\u6216\u6389\u843D\u6642\u56DE\u6700\u5F8C\u5B89\u5168\u5CF6\uFF0C\u52A0\u8A08 8 \u79D2\uFF0C\u788E\u7247\u4FDD\u7559\u3002\u9023\u7E8C\u4E09\u6B21\u5931\u901F\u6703\u63D0\u793A\u53EF\u958B\u555F\u8F14\u52A9\u3002</li><li>\u788E\u7247\u9760\u8FD1\u81EA\u52D5\u62FE\u53D6\uFF0C\u822A\u884C\u8A8C\u63D0\u4F9B\u5730\u6A19\u7DDA\u7D22\u3002\u5148\u5728\u5B89\u5168\u5730\u9762\u5F9E\u300C\u516D\u8D9F\u6E2C\u98A8\u9060\u5F81\u300D\u9078\u8AB2\uFF0C\u6CBF\u5B89\u5168\u63A5\u99C1\u98A8\u6A19\u5230\u91D1\u74B0\u958B\u59CB\u3002\u5B8C\u6210\u672C\u6BB5\u822A\u9580\u5F8C\u5230\u6307\u5B9A\u5CF6\u4E2D\u592E\u6309 E \u4EA4\u4ED8\uFF1B\u5DF2\u4EA4\u4ED8\u968E\u6BB5\u6C38\u4E45\u4FDD\u5B58\u3002\u9000\u51FA\u6703\u8FD4\u56DE\u6700\u5F8C\u5B89\u5168\u5CF6\uFF0C\u4E0D\u8A08\u5931\u901F\uFF0C\u53EA\u653E\u68C4\u672A\u4EA4\u4ED8\u6BB5\u3002</li></ul><h3>\u672C\u6A5F\u9032\u5EA6\u8207\u500B\u4EBA\u6210\u7E3E</h3><p>\u53EA\u6709\u9019\u500B\u700F\u89BD\u5668\u4FDD\u5B58\u9032\u5EA6\uFF0C\u6C92\u6709\u96F2\u7AEF\u540C\u6B65\u6216\u5168\u7403\u6392\u884C\u699C\u3002\u7A2E\u5B50\u53EF\u91CD\u73FE\u76F8\u540C\u98A8\u6CC1\uFF1B\u4ECA\u65E5\u98A8\u6CC1\u4EE5\u53F0\u5317\u65E5\u671F\u8A08\u7B97\u3002\u7D50\u7B97\u5206\u5225\u986F\u793A\u901F\u5EA6\u3001\u5E73\u7A69\u8207\u63A2\u7D22\u8A55\u7D1A\u3002</p>',[{label:ht?"\u56DE\u5230\u822A\u7A0B":"\u56DE\u5230\u6E96\u5099",primary:!0,action:()=>ht?nn()?yi():Jn():Bi()},{label:"\u6587\u660E\u788E\u7247",action:Tp},{label:"\u516D\u8D9F\u6E2C\u98A8\u9060\u5F81",action:pu},{label:"\u8A2D\u5B9A\u8207\u5B58\u6A94",action:Fa}])}function pu(){ht&&pe.status==="running"&&Oi("silent");let i=pe.state.activeCampaignCircuit!=null,e=(!ht||pe.player.grounded)&&!i&&pe.status!=="failed";zn("courses","\u5E36\u56DE\u4E0B\u4E00\u4EFD\u98A8\u7684\u7B54\u6848",`<p class="modal-note">${i?"\u76EE\u524D\u5FC5\u4FEE\u5DE1\u6E2C\u9032\u884C\u4E2D\uFF0C\u8ACB\u5148\u5B8C\u6210\u4E09\u6BB5\u4EA4\u4ED8\uFF0C\u518D\u9078\u64C7\u9078\u4FEE\u9060\u5F81\u3002":e?"\u5728\u5B89\u5168\u5730\u9762\u9078\u64C7\u4E00\u8D9F\u9060\u5F81\uFF0C\u518D\u6CBF\u5B89\u5168\u63A5\u99C1\u98A8\u6A19\u5230\u6307\u5B9A\u5CF6\u91D1\u74B0\u958B\u59CB\u3002":"\u8ACB\u5148\u5B89\u5168\u843D\u5CF6\uFF0C\u518D\u9078\u64C7\u9060\u5F81\uFF1B\u7A7A\u4E2D\u53EF\u5148\u95B1\u8B80\u5404\u8AB2\u7A0B\u3002"}\u5B8C\u6210\u4E00\u6BB5\u5F8C\u843D\u5CF6\u6309 E \u4EA4\u4ED8\uFF1B\u5DF2\u4EA4\u4ED8\u968E\u6BB5\u4FDD\u5B58\u3002\u9000\u51FA\u6703\u8FD4\u56DE\u6700\u5F8C\u5B89\u5168\u5CF6\uFF0C\u53EA\u653E\u68C4\u672A\u4EA4\u4ED8\u6BB5\u3002</p><div class="journal-list">${le.challenges.map(t=>`<div><b>${Jt(t.name)} \xB7 ${pe.state.courseStages[t.id]||0}/${t.stages?.length||1} \u6BB5</b><p>${Jt(t.description)}<br>\u4E0B\u4E00\u51FA\u767C\u9EDE\uFF1A${Jt(Vt(pe.courseStage(t)?.fromIslandId||t.islandId).name)}${pe.state.completedChallenges.includes(t.id)?" \xB7 \u5DF2\u53D6\u5F97\u5B8C\u6210\u5FBD\u8A18":""}</p></div>`).join("")}</div>`,[{label:pe.state.activeChallenge||pe.state.trackedHint?"\u9000\u51FA\u9060\u5F81\u4E26\u81EA\u7531\u63A2\u7D22\uFF08\u4FDD\u7559\u9032\u5EA6\uFF09":"\u81EA\u7531\u63A2\u7D22\uFF08\u4FDD\u7559\u9032\u5EA6\uFF09",primary:!0,action:()=>{ht||xi(ft.elapsed>0),(pe.state.activeChallenge||pe.state.trackedHint)&&(pe.cancelChallenge(),Pa()),pe.setExploration(),nn()&&(pe.status="paused",yr=!0),Jn(),Wt(),Kn()}},...le.challenges.filter(t=>!pe.challenges.includes(t.id)).map(t=>({label:`\u6A19\u8A18 ${t.name}`,disabled:!e,action:()=>{ht||xi(ft.elapsed>0),pe.trackChallenge(t.id)&&(nn()&&(pe.setExploration(),pe.status="paused",yr=!0),Jn(),Kn())}})),{label:"\u8FD4\u56DE\u822A\u884C\u8A8C",action:_i}],"\u6E2C\u98A8\u9060\u5F81 / \u968E\u6BB5\u6C38\u4E45\u4FDD\u5B58")}function Fa(){zn("settings","\u8ABF\u6574\u4F60\u7684\u822A\u7A0B",`${Ep()}<h3>\u5B89\u5168\u4FDD\u5B58</h3><p>\u5B58\u6A94\u683C\u5F0F v4\uFF1B\u843D\u5CF6\u3001\u89C0\u6E2C\u6A23\u672C\u3001\u788E\u7247\u3001\u968E\u6BB5\u4EA4\u4ED8\u3001\u7D50\u7B97\u53CA\u8A2D\u5B9A\u8B8A\u66F4\u6642\u4FDD\u5B58\u3002\u820A\u7248\u77ED\u7A0B\u6210\u7E3E\u8207\u5FBD\u8A18\u4FDD\u7559\u5728\u6B77\u53F2\u7D00\u9304\uFF0C\u65B0\u822A\u7A0B\u7368\u7ACB\u8A08\u5206\u3002\u640D\u58DE\u5B58\u6A94\u4E0D\u6703\u8B93\u904A\u6232\u5361\u4F4F\uFF0C\u5132\u5B58\u5931\u6557\u6703\u660E\u78BA\u63D0\u793A\u3002</p>${Tv()}`,[{label:"\u5B8C\u6210",primary:!0,action:Ev},{label:"\u91CD\u8A2D\u5168\u90E8\u9032\u5EA6",action:()=>zn("erase","\u78BA\u5B9A\u6E05\u9664\u5168\u90E8\u672C\u6A5F\u9032\u5EA6\uFF1F","<p>\u9019\u6703\u6E05\u9664\u6587\u660E\u788E\u7247\u3001\u5CF6\u5DBC\u3001\u89C0\u6E2C\u53F0\u3001\u500B\u4EBA\u6210\u7E3E\u8207\u672C\u5C40 checkpoint\uFF0C\u7121\u6CD5\u5FA9\u539F\u3002\u97F3\u91CF\u8207\u756B\u9762\u504F\u597D\u4FDD\u7559\u3002</p>",[{label:"\u53D6\u6D88",primary:!0,action:Fa},{label:"\u6E05\u9664\u5168\u90E8\u9032\u5EA6",action:()=>{let i=Ua.clearProgress();fu(i.warning),ft=Ua.load().save,pe=new As({save:ft}),Na(),kt("\u672C\u6A5F\u9032\u5EA6\u5DF2\u91CD\u8A2D\u3002")}}])}]),wp()}function Tv(){let i=pe.persisted,e=Object.entries(i.legacyRecords||{}).map(([s,r])=>`${Jt(Tn.find(a=>a.id===s)?.name||s)} \xB7 ${mr(r.time)}${r.assisted?" \xB7 \u5DF2\u4F7F\u7528\u8F14\u52A9":""}`),t=Object.entries(i.legacyRouteRecords||{}).map(([s,r])=>`${Jt(le.routes.find(a=>a.id===s)?.name||s)} \xB7 ${mr(r.time)}`),n=(i.legacyChallenges||[]).map(s=>Jt(le.challenges.find(r=>r.id===s)?.name||s));return!e.length&&!t.length&&!n.length?"":`<h3>\u820A\u7248\u77ED\u7A0B\u7D00\u9304</h3><p>\u4EE5\u4E0B\u6210\u7E3E\u5C6C\u65BC\u6539\u7248\u524D\u822A\u7A0B\uFF0C\u7368\u7ACB\u4FDD\u7559\u3002</p>${e.length?`<p>${e.join("<br>")}</p>`:""}${t.length?`<p>${t.join("<br>")}</p>`:""}${n.length?`<p>\u820A\u5FBD\u8A18\uFF1A${n.join("\u3001")}</p>`:""}`}function Tp(){let i=pe.relics;zn("journal","\u98A8\u7559\u4E0B\u7684\u822A\u4FE1",`<p>\u5DF2\u767C\u73FE ${i.length} / ${le.relics.length}\u3002\u9760\u8FD1\u5404\u6D6E\u5CF6\u4E0A\u7684\u91D1\u8272\u7ACB\u9AD4\u788E\u7247\u5373\u53EF\u62FE\u53D6\u3002</p><div class="journal-list">${le.relics.map((e,t)=>`<div><b><img src="${Jt(e.icon||`./assets/icons/${e.id}.svg`)}" width="24" height="24" alt=""> ${String(t+1).padStart(2,"0")} \xB7 ${i.includes(e.id)?Jt(e.name):"\u5C1A\u672A\u767C\u73FE"}</b><p>${i.includes(e.id)?Jt(e.text):Jt(Vt(e.islandId).name)+" \xB7 "+Jt(e.hint||"\u641C\u5C0B\u5CF6\u9762\u7684\u91D1\u8272\u5149\u8292\u3002")}</p></div>`).join("")}</div>`,[{label:"\u8FD4\u56DE\u822A\u884C\u8A8C",primary:!0,action:_i}])}function Av(i){Oi("dialogue"),zn("dialogue",i.title,`<p class="modal-note">${Jt(i.text)}</p><p><strong>\u63A5\u7E8C\u5FC5\u4FEE\u5DE1\u6E2C\uFF1A${Jt(pe.campaignStage()?.name||"\u8FD4\u822A")}</strong><br>${Jt(pe.campaignStage()?.description||"\u6CBF\u91D1\u8272\u822A\u6A19\u56DE\u5BB6\u3002")}</p><p>\u9019\u6BB5\u6545\u4E8B\u53EF\u8DF3\u904E\uFF1B\u4E0B\u4E00\u500B\u822A\u6A19\u5DF2\u5728\u5730\u5716\u4E0A\u4EAE\u8D77\u3002</p>`,[{label:"\u7E7C\u7E8C\u822A\u7A0B / \u8DF3\u904E",primary:!0,action:Jn}],"\u2727 / \u89C0\u6E2C\u53F0\u8A18\u9304")}function Ap(i=!1){vn.setEnabled(!1),Fi=0,clearTimeout(vi),i?(Fe.setPaused(!1),Fe.play("stall"),vi=setTimeout(()=>Fe.setPaused(!0),1400)):Fe.setPaused(!0),Zn.state("paused"),zn("failure","\u5929\u5019\u7A97\u53E3\u5DF2\u95DC\u9589",`<p>\u5DF2\u98DB\u884C ${mr(pe.state.activeSeconds)}\u3002\u5F37\u98A8\u5C01\u9589\u4E86\u822A\u57DF\uFF0C\u672C\u6B21\u9060\u5F81\u7D50\u675F\u3002\u5DF2\u4EA4\u4ED8\u8CC7\u6599\u3001\u788E\u7247\u8207\u9078\u4FEE\u5FBD\u8A18\u5DF2\u4FDD\u5B58\uFF1B\u672C\u6B21\u4E0D\u5BEB\u5165\u52DD\u5229\u6210\u7E3E\u3002</p>`,[{label:"\u91CD\u65B0\u9060\u5F81",primary:!0,action:()=>xi(!1)},{label:"\u6539\u70BA\u81EA\u7531\u63A2\u7D22",action:()=>{pe.setExploration(),Wt(),Jn(),Kn()}},{label:"\u8A2D\u5B9A\u8207\u5B58\u6A94",action:Fa},{label:"\u8FD4\u56DE\u6E96\u5099\u756B\u9762",action:Na}],"\u9060\u5F81\u672A\u5B8C\u6210 / \u5B89\u5168\u64A4\u56DE")}function Cp(i=!1){let e=pe.state,t=e.rating;vn.setEnabled(!1),i||Fe.setPaused(!0),i&&(Fe.setPaused(!1),Fe.play("finish"),vi=setTimeout(()=>Fe.setPaused(!0),1800)),Zn.state("paused"),zn("result",le.ending.title,`<p>${Jt(le.ending.text)}</p><div class="stats-grid"><div><strong>${t.speed}</strong><small>\u901F\u5EA6 \xB7 ${mr(e.elapsed)}</small></div><div><strong>${t.stability}</strong><small>\u5E73\u7A69 \xB7 ${e.stalls} \u6B21\u5931\u901F</small></div><div><strong>${t.exploration}</strong><small>\u63A2\u7D22 \xB7 ${e.relics.length}/${le.relics.length}</small></div></div><p>\u9078\u4FEE\u6E2C\u98A8 ${e.challenges.length}/${le.challenges.length} \xB7 \u672C\u5C40\u822A\u8DE1 ${Math.round(e.distance)}m \xB7 \u7A2E\u5B50 ${e.seed}<br>\u6A21\u7D44\uFF1A${Tn.find(n=>n.id===e.module).name} \xB7 ${t.assisted?"\u98A8\u7DDA\u8F14\u52A9\u5DF2\u4F7F\u7528\uFF0C\u6210\u7E3E\u7368\u7ACB\u6A19\u793A":"\u672A\u4F7F\u7528\u98A8\u7DDA\u8F14\u52A9"}</p><p class="modal-note">\u4E0B\u4E00\u8D9F\u76EE\u6A19\uFF1A${Jt(t.next)}</p>`,[{label:"\u518D\u98DB\u4E00\u8D9F",primary:!0,action:()=>xi(!1)},{label:"\u7E7C\u7E8C\u63A2\u7D22",action:pu},{label:"\u63DB\u6A21\u7D44\u8207\u98A8\u6CC1",action:Na},{label:"\u8B80\u6587\u660E\u788E\u7247",action:Tp}],Sp())}function up(){Lt.camera=Lt.camera==="overhead"?"follow":"overhead",Ms(),Wt(),pe.status==="running"&&Se("#world").focus(),kt(Lt.camera==="overhead"?"\u4FEF\u77B0\u6A21\u5F0F \xB7 V \u8FD4\u56DE\u8FFD\u96A8":"\u8FFD\u96A8\u6A21\u5F0F \xB7 C \u56DE\u6B63\u93E1\u982D")}function Cv(){pe.state.trackedHint||pe.state.surveyHint?.mainTransit||pe.state.activeChallenge||pe.state.activeCampaignCircuit!=null||(pe.setRouteStyle(pe.routeStyle==="safe"?"shortcut":"safe"),Wt(),Kn(),pe.status==="running"&&Se("#world").focus(),kt(le.routes.find(i=>i.id===pe.state.objective.routeId)?.description||"\u822A\u7DDA\u5DF2\u5207\u63DB"))}function Kn(){let i=pe.state,e=i.player,t=i.objective,n=fp.get(t.routeId),s=i.challengeHint||i.trackedHint||i.surveyHint,r=s||t,a=Math.round(Mt(e.x-r.x,e.z-r.z)),o=uu,l=o?"\u5C55\u5E06\u9375":"Space",c=o?"\u6E1B\u901F\u9375":"Shift",h=o?"\u4E92\u52D5\u9375":"E";ht&&(Qe.hint!==s||Qe.distance!==a||Qe.touch!==o||Qe.grounded!==e.grounded||Qe.checkpoint!==i.checkpoint||Qe.activated!==i.activated.length)&&(st("#objective",`${s?.campaign?`\u7B2C ${i.activeCampaignCircuit+1} \u822A\u5340 / \u6E2C\u98A8 ${s.stage}/3 \xB7 `:i.challengeHint||i.trackedHint?`\u6E2C\u98A8 ${s.stage}/${s.stageTotal} \xB7 `:i.activated.length<3?`${i.activated.length+1}/3 \xB7 `:"\u8FD4\u822A \xB7 "}${s?.stageName||s?.name||t.name}  ${a}m`),st("#objective-sub",i.nearby?.canInteract?`\u5B89\u5168\u843D\u5730 \xB7 \u6309 ${h} ${i.activeChallenge||i.activeCampaignCircuit!=null?"\u4EA4\u4ED8\u672C\u968E\u6BB5":"\u555F\u52D5\u822A\u6A19"}`:e.grounded?`${l} \u8D77\u822A \xB7 ${i.surveyHint?"\u4F9D\u5E8F\u5B8C\u6210\u89C0\u6E2C\u74B0":"\u5730\u5716\u53EF\u5207\u63DB\u822A\u7DDA"}`:s?.landing?`\u62B5\u5CF6\u4E0A\u7A7A\u6309\u4F4F ${c} \u4E0B\u964D`:s?gv(s)||"\u7A7F\u904E\u524D\u65B9\u89C0\u6E2C\u74B0\uFF0C\u8A18\u9304\u98A8\u6CC1":`\u62B5\u5CF6\u4E0A\u7A7A\u6309\u4F4F ${c} \u4E0B\u964D`)),Qe.checkpoint!==i.checkpoint&&st("#region",Vt(i.checkpoint).region+" / "+Vt(i.checkpoint).name),st("#flight-mode",e.grounded?"\u5B89\u5168\u5730\u9762":e.braking?"\u6536\u5E06\u4E0B\u964D":e.gliding?"\u4E58\u98A8\u6ED1\u7FD4":`\u81EA\u7531\u843D\u9AD4 \xB7 ${l} \u5C55\u5E06`),dr("#altitude",Math.round(e.y),""," m \u9AD8\u5EA6"),dr("#speed",Math.round(Mt(e.vx,e.vz)),""," m/s");let d=Math.floor(i.elapsed);Qe.seconds!==d&&(st("#clock",mr(d)),Qe.seconds=d),st("#flight-tip",o?"\u5DE6\u6416\u687F\u79FB\u52D5 \xB7 \u5C55\u5E06\u5207\u63DB \xB7 \u6309\u4F4F\u6E1B\u901F\u4E0B\u964D":"Space \u8D77\u8DF3\uFF0F\u5C55\u5E06\u3000\xB7\u3000Shift \u6536\u5E06\u6E1B\u901F\u3000\xB7\u3000E \u4E92\u52D5");let m=Math.round(e.energy);ou.get("#energy-value")!==m&&(dr("#energy-value",m,"","%"),Se("#energy-bar").style.width=m+"%"),Se(".energy-panel").classList.toggle("low",e.energy<22),st("#wind-label",i.hazard==="thunder"?"\u26A1 \u96F7\u96F2 \xB7 \u5411\u5916\u7E5E\u884C":i.hazard==="fog"?"\u224B \u96F2\u9727 \xB7 \u770B\u822A\u6A19":i.wind.includes("thermal")?"\u2191 \u71B1\u6D41\u62AC\u5347":i.wind.includes("tailwind")?"\u2197 \u9806\u98A8\u88DC\u80FD":i.wind.includes("crosswind")?"\u2194 \u5074\u98A8\u4FEE\u6B63":"\u98A8\u5E36\u5916 \xB7 \u6301\u7E8C\u8017\u80FD");let u=Math.max(0,Mr-i.activeSeconds),f=i.mode==="exploration"?-1:Math.floor(u);Qe.weatherSeconds!==f&&(st("#weather-clock",i.mode==="exploration"?"\u81EA\u7531\u63A2\u7D22 \xB7 \u4E0D\u9650\u6642":`\u5929\u5019 ${mr(u)}`),Qe.weatherSeconds=f),Se("#weather-clock").classList.toggle("weather-warning",i.mode==="expedition"&&u<=300);let y=u<=60?2:u<=300?1:0;i.status==="running"&&i.mode==="expedition"&&y>cp&&kt(y===2?"\u5929\u5019\u7A97\u53E3\u5269 1 \u5206\u9418\uFF1A\u8ACB\u76E1\u5FEB\u8FD4\u822A\u3002":"\u5929\u5019\u7A97\u53E3\u5269 5 \u5206\u9418\uFF1A\u53EF\u5728\u8A2D\u5B9A\u8F49\u70BA\u81EA\u7531\u63A2\u7D22\u3002"),cp=y,dr("#station-count",i.activated.length,"\u89C0\u6E2C\u53F0 "," / 3"),dr("#relic-count",i.relics.length,"\u788E\u7247 "," / 12"),dr("#challenge-count",i.challenges.length,"\u9078\u4FEE "," / 6"),st("#route-label",i.activeCampaignCircuit!=null?"\u5FC5\u4FEE\u5DE1\u6E2C\u98A8\u5ECA":i.activeChallenge?"\u6E2C\u98A8\u9060\u5F81\u822A\u9053":i.trackedHint||i.surveyHint?.mainTransit?"\u5B89\u5168\u63A5\u99C1\u98A8\u9053":i.routeStyle==="safe"?"\u5B89\u5168\u98A8\u9053":"\u7A7F\u96F2\u6377\u5F91"),Se("#route-toggle").disabled=!!i.trackedHint||!!i.surveyHint?.mainTransit||!!i.activeChallenge||i.activeCampaignCircuit!=null,st("#route-toggle",i.activeChallenge?"\u8DDF\u96A8\u672C\u6BB5\u822A\u9580":i.trackedHint||i.surveyHint?.mainTransit?"\u63A5\u99C1\u4F7F\u7528\u5B89\u5168\u98A8\u9053":i.routeStyle==="safe"?"\u5207\u63DB\uFF1A\u6280\u5DE7\u6377\u5F91":"\u5207\u63DB\uFF1A\u5B89\u5168\u98A8\u9053"),Ht("#interact",!!i.nearby?.canInteract&&i.status==="running"),st("#interact",i.activeChallenge||i.activeCampaignCircuit!=null?`${o?"":"E \xB7 "}\u4EA4\u4ED8\u672C\u968E\u6BB5`:i.activated.length===3?`${o?"":"E \xB7 "}\u8FD4\u56DE\u71DF\u5730\u7D50\u7B97`:`${o?"":"E \xB7 "}\u555F\u52D5\u89C0\u6E2C\u53F0`);let g=i.surveyHint?.mainTransit?i.mainTransit:t.routeId;if(lp!==g&&(ct.setRoute(i.surveyHint?.mainTransit?{waypoints:i.mainTransit,style:"safe"}:n),lp=g),Ht("#course",!!s),Ht("#leave-course",!!i.activeChallenge||!!i.trackedHint),Ht("#guide",!yr&&!s),s){let p=s,v=au.get(i.activeChallenge)?.kind,_=i.activeChallenge?v==="crosswind"||v==="stability":i.activated.length===1;st("#course-kicker",p.mainTransit?"\u4E3B\u7DDA\u5B89\u5168\u63A5\u99C1 \xB7 \u89C0\u6E2C\u9032\u5EA6\u4FDD\u7559":p.campaign?"\u5FC5\u4FEE\u5DE1\u6E2C \xB7 \u6BCF\u6BB5\u843D\u5CF6\u4EA4\u4ED8":i.activeChallenge||i.trackedHint?"\u9078\u64C7\u6027\u6E2C\u98A8\u9060\u5F81":"\u4E3B\u7DDA\u89C0\u6E2C \xB7 \u4E0D\u9700\u505C\u7559\u7B49\u5F85"),Qe.hint!==p&&st("#course-title",p.mainTransit?`\u5B89\u5168\u63A5\u99C1 ${p.step}/${p.total}`:p.transit?`\u5B89\u5168\u63A5\u99C1 ${p.transitStep}/${p.transitTotal}`:`${s?.campaign?`\u7B2C ${i.activeCampaignCircuit+1} \u822A\u5340 / \u6E2C\u98A8 ${s.stage}/3 \xB7 `:p.campaign||i.challengeHint||i.trackedHint?`${p.stageName} \xB7 `:"\u822A\u7DDA\u89C0\u6E2C \xB7 "}${p.entry?"\u524D\u5F80\u5165\u53E3":`${p.step}/${p.total}`}`);let x=e.y<p.y-p.radius?-1:e.y>p.y+p.radius?1:0,T=Math.round(i.cargoStability);(Qe.hint!==p||Qe.touch!==o||Qe.grounded!==e.grounded||Qe.detailBand!==x||Qe.cargo!==T)&&st("#course-detail",`${e.grounded&&!p.landing?`${l} \u5C55\u5E06\u8D77\u822A\uFF0C${o?"\u5DE6\u6416\u687F":"WASD"} \u5C0D\u6E96\u91D1\u74B0\u3002`:""}${p.transit?`\u6CBF\u98A8\u6A19\u524D\u9032\uFF0C\u76EE\u6A19\u9AD8\u5EA6 ${Math.round(p.y)}m\u3002\u62B5\u5CF6\u5F8C\u9032\u91D1\u74B0\u3002`:p.entry?p.instruction:p.landing?`\u843D\u5230\u5CF6\u4E2D\u592E\uFF0C\u6309 ${h} \u4EA4\u4ED8\uFF1B\u5DF2\u5B8C\u6210\u968E\u6BB5\u4FDD\u7559\u3002`:`\u76EE\u6A19\u9AD8\u5EA6 ${Math.round(p.y)}m\uFF1B${e.y<p.y-p.radius?"\u4FDD\u6301\u5C55\u5E06\uFF0C\u6CBF\u9752\u8272\u98A8\u5E36\u62AC\u5347\u3002":e.y>p.y+p.radius?`\u6309\u4F4F ${c} \u964D\u4F4E\u9AD8\u5EA6\u3002`:"\u9AD8\u5EA6\u5DF2\u5C0D\u6E96\uFF0C\u7A7F\u904E\u91D1\u74B0\u4E2D\u592E\u3002"}`}${_&&!p.entry&&!p.transit?` \u5100\u5668\u7A69\u5B9A ${Math.round(i.cargoStability)}%\u3002`:""}`);let A=Mt(e.vx,e.vz);if(Qe.conditionHint!==p){let P=Se("#gate-conditions");P.replaceChildren(),Qe.conditionNodes.length=0,Qe.conditionStates.fill(-1);let b=(S,I)=>{let F=document.createElement("span");P.append(F),Qe.conditionNodes.push({kind:S,label:I,el:F})};p.landing||b(0,""),p.minSpeed&&b(1,`\u901F\u5EA6 \u2265${p.minSpeed}m/s`),p.maxSpeed&&b(2,`\u901F\u5EA6 \u2264${p.maxSpeed}m/s`),p.minEnergy&&b(3,`\u80FD\u91CF \u2265${p.minEnergy}%`),p.maxVerticalSpeed&&b(4,`\u5347\u964D \u2264${p.maxVerticalSpeed}m/s`),p.heading&&b(5,"\u9806\u7BAD\u982D\u5165\u74B0"),Qe.conditionHint=p,Qe.altitude=NaN}let C=Math.round(e.y);for(let P=0;P<Qe.conditionNodes.length;P++){let b=Qe.conditionNodes[P],S=b.kind,I=S===0?Math.abs(e.y-p.y)<(p.radius||15):S===1?A>=p.minSpeed:S===2?A<=p.maxSpeed:S===3?e.energy>=p.minEnergy:S===4?Math.abs(e.vy)<=p.maxVerticalSpeed:(e.vx*p.heading.x+e.vz*p.heading.z)/Math.max(.001,A*Mt(p.heading.x,p.heading.z))>=(p.heading.minDot??.5);(Qe.conditionStates[P]!==Number(I)||S===0&&Qe.altitude!==C)&&(b.el.className=I?"met":"unmet",b.el.textContent=(I?"\u2713 ":"\u25CB ")+(S===0?`\u9AD8\u5EA6 ${C} / ${Math.round(p.y)}m`:b.label),Qe.conditionStates[P]=Number(I))}Qe.altitude=C,Qe.detailBand=x,Qe.cargo=T}if(!yr&&!s){let p,v,_,x=Vt(t.islandId);e.grounded&&i.checkpoint===t.islandId?(p="03 \xB7 \u555F\u52D5\u822A\u6A19",v=i.activated.length===3?`\u56DE\u71DF\u5730\u4E2D\u592E\u6309 ${h}`:`\u9760\u8FD1\u89C0\u6E2C\u53F0\u6309 ${h}`,_="\u5B89\u5168\u843D\u5730\u5DF2\u4FDD\u5B58\u3002\u8D70\u5411\u5CF6\u4E2D\u592E\u7684\u91D1\u8272\u822A\u6A19\u5B8C\u6210\u9019\u6BB5\u822A\u7A0B\u3002"):!e.grounded&&!e.gliding?(p="\u98DB\u884C\u63D0\u793A \xB7 \u6536\u5E06\u4E2D",v=`\u6309 ${l} \u91CD\u65B0\u5C55\u5E06`,_=`\u76EE\u524D\u5728\u81EA\u7531\u843D\u9AD4\u3002${l} \u662F\u5207\u63DB\uFF0C\u4E0D\u9700\u8981\u4E00\u76F4\u6309\u4F4F\uFF1B\u5C55\u5E06\u5F8C\u98A8\u5E36\u624D\u6703\u62AC\u5347\u4F60\u3002`):!e.grounded&&a<75&&e.y<x.y+3?(p="\u98DB\u884C\u63D0\u793A \xB7 \u9AD8\u5EA6\u4E0D\u8DB3",v="\u5148\u62AC\u5347\uFF0C\u518D\u964D\u843D",_=`\u4FDD\u6301\u5C55\u5E06\uFF0C\u6CBF\u5CF6\u908A\u87BA\u65CB\u71B1\u6D41\u4E0A\u5347\u3002\u5148\u653E\u958B ${c}\uFF1B\u9AD8\u904E\u5CF6\u9762\u5F8C\u518D\u79FB\u5411\u4E2D\u592E\u3002`):!e.grounded&&a<x.radius-4&&e.y>=x.y+3?(p="02 \xB7 \u5B89\u5168\u843D\u5CF6",v=`\u73FE\u5728\u6309\u4F4F ${c} \u4E0B\u964D`,_=`\u4F60\u5DF2\u5728\u5CF6\u9762\u4E0A\u65B9\u3002\u6301\u7E8C\u4FEE\u6B63\u65B9\u5411\uFF0C\u843D\u5730\u5F8C\u653E\u958B ${c}\uFF0C\u8D70\u5230\u89C0\u6E2C\u53F0\u6309 ${h}\u3002`):i.activated.length?(p="03 \xB7 \u63A5\u7E8C\u822A\u7A0B",v=t.name,_=n.description):e.grounded&&i.checkpoint==="island-camp"?(p="01 \xB7 \u8B93\u98A8\u63A5\u4F4F\u4F60",v=`\u6309 ${l} \u8D77\u8DF3\u5C55\u5E06`,_=`${o?"\u5DE6\u6416\u687F":"WASD"} \u671D\u524D\u65B9\u91D1\u8272\u822A\u6A19\u79FB\u52D5\uFF0C\u6CBF\u822A\u7DDA\u5716\u7684\u5B89\u5168\u98A8\u9053\u524D\u9032\u3002`):a<75?(p="02 \xB7 \u5C0D\u6E96\u5CF6\u9762",v="\u98DB\u5230\u5CF6\u9762\u4E0A\u65B9\u518D\u6E1B\u901F",_="\u4FDD\u6301\u5C55\u5E06\uFF0C\u671D\u91D1\u8272\u76F4\u67F1\u4FEE\u6B63\u65B9\u5411\u3002\u5230\u9054\u5CF6\u9762\u4E0A\u65B9\u5F8C\uFF0C\u63D0\u793A\u6703\u544A\u8A34\u4F60\u4F55\u6642\u964D\u843D\u3002"):(p="02 \xB7 \u6CBF\u98A8\u5E36\u524D\u9032",v="\u9806\u98A8\u88DC\u80FD\uFF0C\u71B1\u6D41\u62AC\u5347",_=`\u6CBF\u5730\u5716\u865B\u7DDA\u5230\u9054\u8606\u5149\u5EAD\u3002\u7A7A\u4E2D\u4E0D\u7528\u6301\u7E8C\u6309 ${l}\uFF1B\u653E\u958B\u65B9\u5411\u4ECD\u6703\u6ED1\u7FD4\u3002`),st("#guide-step",p),st("#guide-text",v),st("#guide-detail",_)}Qe.hint=s,Qe.distance=a,Qe.touch=o,Qe.grounded=e.grounded,Qe.checkpoint=i.checkpoint,Qe.activated=i.activated.length,Rv()}function Rv(){let i=La,e=pp,t=pe.state,n=du,s=vv,r=Mv;e.clearRect(0,0,i.width,i.height),e.strokeStyle="#bfd3bd14",e.lineWidth=1;for(let u=20;u<i.width;u+=40)e.beginPath(),e.moveTo(u,0),e.lineTo(u,i.height),e.stroke();for(let u=0;u<i.height;u+=40)e.beginPath(),e.moveTo(0,u),e.lineTo(i.width,u),e.stroke();let a=au.get(t.activeChallenge),o=pe.campaignStage()||pe.courseStage(a),l=au.get(t.trackedHint?.id),c=t.surveyHint?.mainTransit?t.mainTransit:l?t.transitWaypoints:null,h=o?o.waypoints:c||fp.get(t.objective.routeId)?.waypoints;if(h){e.strokeStyle=l||t.routeStyle==="safe"?"#bcdfd0":"#e6c17e",e.lineWidth=2,e.setLineDash(xv),e.beginPath();let u=c?t.surveyHint?.mainTransit?t.mainTransitIndex:t.transitIndex:0;c&&e.moveTo(s(t.player.x),r(t.player.z));for(let f=u;f<h.length;f++){let y=h[f];f===0&&!c?e.moveTo(s(y.x),r(y.z)):e.lineTo(s(y.x),r(y.z))}if(l){let f=pe.courseEntry(l);e.lineTo(s(f.x),r(f.z))}e.stroke(),e.setLineDash(_v)}for(let u=0;u<le.islands.length;u++){let f=le.islands[u];e.beginPath(),e.arc(s(f.x),r(f.z),Math.max(5,f.radius*n*.7),0,Math.PI*2),e.fillStyle=t.activated.includes(f.id)?"#cdb97855":"#6e97836b",e.fill(),e.strokeStyle=f.id===t.objective.islandId?"#ffdc8e":"#b3cdb061",e.lineWidth=f.id===t.objective.islandId?2:1,e.stroke(),e.fillStyle="#f0e5ba",e.font="17px Segoe UI",e.textAlign="center",e.fillText(yv[u],s(f.x),r(f.z)+6)}for(let u=0;u<le.relics.length;u++){let f=le.relics[u];t.relics.includes(f.id)||(e.fillStyle="#eac277",e.fillRect(s(f.x)-2,r(f.z)-2,4,4))}let d=t.challengeHint||t.trackedHint||t.surveyHint;d&&(e.beginPath(),e.arc(s(d.x),r(d.z),6,0,Math.PI*2),e.strokeStyle="#ffe6a7",e.lineWidth=2,e.stroke());let m=t.player;e.save(),e.translate(s(m.x),r(m.z)),e.rotate(m.heading),e.beginPath(),e.moveTo(0,-9),e.lineTo(6,7),e.lineTo(0,3),e.lineTo(-6,7),e.closePath(),e.fillStyle="#fff9dc",e.strokeStyle="#24565a",e.lineWidth=2,e.fill(),e.stroke(),e.restore(),e.fillStyle="#adccbf",e.font="14px Segoe UI",e.fillText("N \u2191",i.width-24,22)}function Pa(){for(let i of pe.drainEvents()){i.type==="save"&&Wt();let e=i.emittedAt||performance.now();i.type==="glide"&&((!i.requestId||i.requestId!==xp)&&Fe.play("glide"),vt.applied=i.requestId,vt.consumed=performance.now(),cc===i.requestId&&(cc=0,st("#sail-feedback",i.open?"\u5DF2\u5C55\u5E06":"\u5DF2\u6536\u5E06"),Se("#touch-glide").removeAttribute("data-queued"))),i.type==="wind"&&Fe.play("tailwind"),i.type==="land"&&(Fe.play("land"),kt(`${i.precise?"\u7CBE\u6E96\u843D\u5730":"\u5DF2\u5B89\u5168\u843D\u5CF6"} \xB7 ${i.name} \xB7 checkpoint \u5DF2\u4FDD\u5B58`)),i.type==="stall"&&(Fe.play("stall"),kt(i.message)),["hint","edge","assist-offer","low-energy"].includes(i.type)&&(kt(i.message),i.type==="low-energy"&&Fe.play("energy")),i.type==="relic"&&(Fe.play("unlock"),kt(`\u6587\u660E\u788E\u7247 \xB7 ${i.name}\uFF5C${i.text}`)),i.type==="challenge"&&(Fe.play("unlock"),kt(`\u6E2C\u98A8\u6311\u6230\u5B8C\u6210 \xB7 ${i.name} \xB7 \u5168\u90E8\u968E\u6BB5\u5DF2\u4FDD\u5B58`)),i.type==="challenge-start"&&(Fe.play("ui"),kt(i.message)),i.type==="challenge-gate"&&(Fe.play("relic"),i.message&&kt(i.message)),i.type==="survey"&&(Fe.play("relic"),kt(i.message)),i.type==="challenge-stage"&&(Fe.play("unlock"),kt(i.message)),i.type==="challenge-reset"&&i.reason==="cancel"&&kt(i.message),i.type==="station"&&(Fe.play("unlock"),Av(i.dialogue)),i.type==="campaign-stage"&&(Fe.play("unlock"),kt(i.message)),i.type==="failed"&&(Wt(),Kn(),Ap(!0)),i.type==="complete"&&(Wt(),Cp(!0)),["glide","survey","land","stall","station","complete","failed"].includes(i.type)&&(vt.eventCount++,vt.maxEventAcknowledgementMs=Math.max(vt.maxEventAcknowledgementMs,performance.now()-e))}}function cu(i){let e=i-Da,t=Math.min(e/1e3,.15);if(Da=i,pr){lc=requestAnimationFrame(cu);return}document.hidden||ct.sampleFrame(e);let n=performance.now();if(pe.status==="running"){Fi+=t;let l=0;for(;Fi>=1/60&&l++<9;){let c=vn.read(ct.yaw),h=performance.now();pe.step(c,1/60),yp++,c.glide&&(vt.maxConsumptionProcessingMs=Math.max(vt.maxConsumptionProcessingMs,performance.now()-h)),Fi-=1/60}Pa()}let s=performance.now()-n;ct.update(pe.state,Math.min(t,.05),i/1e3,pe.state.objective),vt.applied!==vt.submittedId&&(vt.submittedId=vt.applied,vt.submitted=performance.now());let r=performance.now();ac.speed=Mt(pe.player.vx,pe.player.vz),ac.energy=pe.player.energy,ac.wind=pe.state.wind.length>0,Fe.update(ac);let a=performance.now()-r,o=performance.now();su+=t,su>.1&&(Kn(),su=0),ht&&pe.status==="running"&&(Ni.simulationMs=s,Ni.sceneUpdateMs=ct.phase.sceneUpdateMs,Ni.renderCpuMs=ct.phase.renderCpuMs,Ni.hudMapMs=performance.now()-o,Ni.rafIntervalMs=e,Ni.applicationUpdateMs=s+ct.phase.sceneUpdateMs+a+Ni.hudMapMs,gp.push(Ni),_p++,vp+=t,oc[ru]=e,ru=(ru+1)%oc.length,Ia=Math.min(Ia+1,oc.length),t>.0333&&Mp++),lc=requestAnimationFrame(cu)}async function Iv(){La=Se("#map"),pp=La.getContext("2d"),ft=Ua.load(),fu(ft.warning),ft=ft.save,Lt={...ft.settings},!ft.elapsed&&matchMedia("(prefers-reduced-motion: reduce)").matches&&(Lt.reducedMotion=!0),gr=ft.module,pe=new As({save:ft}),ct=new tc(Se("#world")),Fe=new ic,Ms(),vn=new nc(Se("#world"),{glideQueued:i=>{if(pe.status!=="running")return;vt.receipt=performance.now(),vt.accepted=i,cc=i;let e=Fe.stats.events;Fe.play("glide"),Fe.stats.events>e&&(xp=i),st("#sail-feedback",pe.player.gliding?"\u6536\u5E06\u6307\u4EE4\u5DF2\u63A5\u6536":"\u5C55\u5E06\u6307\u4EE4\u5DF2\u63A5\u6536"),Se("#touch-glide").setAttribute("data-queued","true"),vt.acknowledged=performance.now(),vt.processed=performance.now(),vt.maxAcknowledgementMs=Math.max(vt.maxAcknowledgementMs,vt.acknowledged-vt.receipt),vt.maxProcessingMs=Math.max(vt.maxProcessingMs,vt.processed-vt.receipt)},glideCleared:()=>{cc=0,st("#sail-feedback",""),Se("#touch-glide").removeAttribute("data-queued")},pause:hp,help:()=>{Ot||_i()},view:()=>{Ot||up()},recenter:()=>{Ot||ct.recenter()},interact:()=>{pe.interact(),Pa()},blur:()=>{clearTimeout(vi),Fe.setPaused(!0),pe.status==="running"&&Oi("blur")},rotate:(i,e)=>ct.rotate(i,e),zoom:i=>ct.zoom(i)}),Zn=new sc({"host:start":()=>{ht?pe.status==="paused"&&Jn():xi(ft.elapsed>0||ft.completed)},"host:pause":()=>Oi(),"host:resume":Jn,"host:restart":()=>xi(!1)}),Se("#modules").innerHTML=Tn.map((i,e)=>`<button class="module" data-module="${i.id}" aria-pressed="${i.id===gr}"><span class="symbol">${["\u2301","\u25C8","\u2197"][e]}</span><strong>${i.name}</strong><small>${["\u8F49\u5411\u9748\u6D3B \xB7 \u5DE1\u822A\u8F03\u6162","\u6301\u4E45\u84C4\u80FD \xB7 \u8F49\u5411\u8F03\u7DE9","\u9806\u98A8\u52A0\u901F \xB7 \u96E2\u98A8\u8017\u80FD"][e]}</small></button>`).join(""),document.querySelectorAll(".module").forEach(i=>i.onclick=()=>bv(i.dataset.module)),Se("#mode").value=ft.mode,Se("#seed").value=ft.elapsed?ft.seed:2718,Se("#start").onclick=()=>xi(!1),Se("#continue").onclick=()=>xi(!0),Ht("#continue",ft.elapsed>0),st("#continue",ft.failed?"\u67E5\u770B\u64A4\u56DE\u7D00\u9304":ft.completed?"\u67E5\u770B\u7D50\u7B97\uFF0F\u7E7C\u7E8C\u63A2\u7D22":"\u7E7C\u7E8C\u4E0A\u6B21\u822A\u7A0B"),Se("#daily-seed").onclick=()=>{Se("#seed").value=Number(new Intl.DateTimeFormat("en-CA",{timeZone:"Asia/Taipei",year:"numeric",month:"2-digit",day:"2-digit"}).format(new Date).replace(/-/g,""))%999999,kt("\u4ECA\u65E5\u98A8\u6CC1\u50C5\u4F9B\u672C\u6A5F\u91CD\u73FE\uFF0C\u6C92\u6709\u5168\u7403\u6392\u540D\u3002")},Se("#new-seed").onclick=()=>{Se("#seed").value=crypto.getRandomValues(new Uint32Array(1))[0]%999999+1},Se("#pause").onclick=hp,Se("#help").onclick=_i,Se("#camera").onclick=up,Se("#route-toggle").onclick=Cv,Se("#leave-course").onclick=()=>{pe.cancelChallenge(),Pa(),Kn(),pe.status==="running"&&Se("#world").focus()},Se("#interact").onclick=()=>{pe.interact(),Pa()},Se("#hide-guide").onclick=()=>{yr=!0,Ht("#guide",!1),pe.status==="running"&&Se("#world").focus()},Se("#close-modal").onclick=bp,st("#build-label",`Aetherwake ${nu.version} \xB7 \u539F\u5275\u98A8\u5883\u63A2\u7D22`),Se("#world").addEventListener("webglcontextlost",i=>{i.preventDefault(),pr=!0,ht&&!nn()&&Oi("silent"),vn.setEnabled(!1),Fe.setPaused(!0),zn("context","\u6B63\u5728\u91CD\u65B0\u63A5\u4F4F\u9019\u9663\u98A8","<p>\u7E6A\u5716\u88DD\u7F6E\u66AB\u6642\u4E2D\u65B7\uFF0C\u822A\u7A0B\u5DF2\u51CD\u7D50\u3002\u6062\u5FA9\u5F8C\u53EF\u5F9E\u76EE\u524D\u4F4D\u7F6E\u7E7C\u7E8C\uFF1B\u82E5\u9700\u91CD\u65B0\u8F09\u5165\uFF0C\u6703\u8FD4\u56DE\u6700\u5F8C\u5B89\u5168\u5CF6\uFF0C\u4FDD\u7559\u5DF2\u53D6\u5F97\u7684\u89C0\u6E2C\u8207\u788E\u7247\u3002</p>",[{label:"\u5F9E\u5B89\u5168\u5CF6\u91CD\u65B0\u8F09\u5165",primary:!0,action:()=>location.reload()}],"\u7E6A\u5716\u88DD\u7F6E\u6062\u5FA9\u4E2D")}),Se("#world").addEventListener("webglcontextrestored",()=>{pr=!1,Da=performance.now(),Fi=0,Ms(),ht&&!nn()?xr("\u98A8\u5DF2\u56DE\u4F86\uFF0C\u6E96\u5099\u7E7C\u7E8C\u822A\u7A0B"):ht?yi():(Bi(),kt("\u7E6A\u5716\u88DD\u7F6E\u5DF2\u6062\u5FA9\uFF0C\u53EF\u6E96\u5099\u555F\u7A0B\u3002"))}),Se("#modal").addEventListener("keydown",i=>{if(i.key==="Tab"){let e=[...Se("#modal").querySelectorAll("button,input,select")].filter(s=>!s.disabled),t=e[0],n=e.at(-1);i.shiftKey&&document.activeElement===t?(i.preventDefault(),n.focus()):!i.shiftKey&&document.activeElement===n&&(i.preventDefault(),t.focus())}}),Object.defineProperty(window,"__aetherwake",{value:Object.freeze({build:Object.freeze({...nu}),snapshot:()=>pe.snapshot(),metrics:()=>{let i=Array.from(oc.subarray(0,Ia)).sort((n,s)=>n-s),e=ct.renderer.getContext(),t=e.getExtension("WEBGL_debug_renderer_info");return{...ct.metrics,simulationSteps:yp,feedback:{...vt},phases:gp.summary(),camera:ct.inspectCamera(pe.player),frameCount:_p,averageMs:Ia?i.reduce((n,s)=>n+s,0)/Ia:null,contextLost:pr,quality:ct.quality,inputListeners:vn.listeners.length,resolutionScale:ct.renderer.getPixelRatio(),elapsedSample:vp,p50:i[Math.floor(i.length*.5)]||null,p95:i[Math.floor(i.length*.95)]||null,longFrames:Mp,renderer:ct.renderer.getContext().getParameter(ct.renderer.getContext().RENDERER),unmaskedRenderer:t?e.getParameter(t.UNMASKED_RENDERER_WEBGL):null,audio:{contextState:Fe.context?.state||"uninitialized",activeVoices:Fe.active.size,events:Fe.stats.events,musicBeats:Fe.noteIndex,peakVoices:Fe.stats.peakVoices,musicVolume:Fe.musicVolume,sfxVolume:Fe.sfxVolume,loadedSamples:Fe.sampleBuffers.size,sampleFailed:Fe.sampleFailed}}}})}),window.addEventListener("pagehide",()=>{ht&&Wt(),vn.clear(),Fe.setPaused(!0)}),window.addEventListener("beforeunload",()=>{hu.removeEventListener("change",dp),cancelAnimationFrame(lc),vn.dispose(),Fe.dispose(),ct.dispose(),Zn.dispose()}),Kn(),Zn.setReady(),lc=requestAnimationFrame(cu)}Iv().catch(i=>{console.error(i),Ht("#fatal"),st("#fatal-message",`\u7121\u6CD5\u5EFA\u7ACB 3D \u5834\u666F\u3002\u8ACB\u78BA\u8A8D\u700F\u89BD\u5668\u5DF2\u555F\u7528 WebGL\uFF0C\u4E26\u91CD\u65B0\u8F09\u5165\u3002${i.message}`),Zn?.send("game:error",{message:String(i.message).slice(0,300)})});
/*! Bundled license information:

three/build/three.core.js:
three/build/three.module.js:
  (**
   * @license
   * Copyright 2010-2025 Three.js Authors
   * SPDX-License-Identifier: MIT
   *)
*/
