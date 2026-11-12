var Dm=Object.defineProperty;var Lm=(n,e)=>{for(var t in e)Dm(n,t,{get:e[t],enumerable:!0})};var Qc={};Lm(Qc,{CONTRACTS:()=>Ut,CURRENTS:()=>ls,DISCOVERIES:()=>vn,DIVE_SITES:()=>Zt,ISLANDS:()=>Lt,OBSERVATIONS:()=>so,REEFS:()=>gi,RIGS:()=>mi,ROUTE_CHOICES:()=>ro,ROUTE_DIRECTIONS:()=>io,STORY_STAGES:()=>Ki,TIDE_PERIOD:()=>on,WHIRLS:()=>xi,WORLD_BOUND:()=>pi,diveStage:()=>yn,diveTarget:()=>vi,encounterVariant:()=>dn,guardianInto:()=>oo,valvePhase:()=>Ri,voyageVariant:()=>hn});var pi=260,on=240,Lt=[{id:"harbor",name:"\u6F6E\u97F3\u6E2F",x:-12,z:174,radius:25,dock:{x:-12,z:141},color:"#ead9ad",type:"home",landmark:"harbor",discoveries:[]},{id:"coral",name:"\u73CA\u745A\u7063",x:-124,z:90,radius:24,dock:{x:-98,z:66},color:"#f59e8b",type:"explore",landmark:"coral",discoveries:["fan-coral","foxfish"],diveSiteId:"coral-dive"},{id:"gull",name:"\u767D\u7FBD\u5CF6",x:124,z:64,radius:23,dock:{x:100,z:42},color:"#f0e6c7",type:"explore",landmark:"birds",discoveries:["tern","turtle"]},{id:"mangrove",name:"\u9752\u6839\u5CF6",x:-140,z:-90,radius:25,dock:{x:-110,z:-74},color:"#7db38e",type:"explore",landmark:"mangrove",discoveries:["mangrove-root","seagrass"]},{id:"ruin",name:"\u661F\u76E4\u5CF6",x:126,z:-100,radius:24,dock:{x:99,z:-80},color:"#c3b8de",type:"explore",landmark:"ruins",discoveries:["star-tablet","tide-clock"],diveSiteId:"ruin-dive"},{id:"reef",name:"\u7409\u7483\u7901",x:0,z:4,radius:16,dock:{x:0,z:27},color:"#6ec8c0",type:"reef",landmark:"reef",discoveries:["glass-coral","nautilus"],diveSiteId:"reef-dive"},{id:"lighthouse",name:"\u9060\u6F6E\u71C8\u5854",x:0,z:-222,radius:22,dock:{x:0,z:-192},color:"#ead5a1",type:"lighthouse",landmark:"lighthouse",discoveries:["beacon-lens","keepers-vault"]}],vn=[{id:"foxfish",name:"\u73CA\u745A\u72D0\u9B5A",kind:"animal",islandId:"coral",diveSiteId:"coral-dive",description:"\u85CF\u5728\u6247\u73CA\u745A\u5F8C\u7684\u5C0F\u9B5A\uFF0C\u6A58\u8272\u689D\u7D0B\u96A8\u6F6E\u6C34\u9583\u52D5\u3002"},{id:"tern",name:"\u767D\u7FBD\u71D5\u9DD7",kind:"animal",islandId:"gull",description:"\u6CBF\u8457\u9806\u6D41\u6355\u9B5A\uFF1B\u7260\u5011\u7684\u822A\u7DDA\u662F\u5929\u7136\u7684\u6D77\u6D41\u63D0\u793A\u3002"},{id:"turtle",name:"\u7DA0\u6D77\u9F9C",kind:"animal",islandId:"gull",description:"\u5728\u6EAB\u6696\u6DFA\u7058\u4F11\u606F\u3002\u4FDD\u6301\u8DDD\u96E2\uFF0C\u5C07\u76F8\u9047\u756B\u9032\u6D77\u5716\u3002"},{id:"nautilus",name:"\u73CD\u73E0\u9E1A\u9D61\u87BA",kind:"animal",islandId:"reef",diveSiteId:"reef-dive",description:"\u5728\u7409\u7483\u7901\u4E0B\u7DE9\u6162\u6F02\u79FB\uFF0C\u6BBC\u4E2D\u85CF\u8457\u6D77\u7684\u87BA\u65CB\u3002"},{id:"fan-coral",name:"\u843D\u65E5\u6247\u73CA\u745A",kind:"plant",islandId:"coral",description:"\u73CA\u745A\u662F\u52D5\u7269\u7FA4\u9AD4\uFF1B\u672C\u5716\u9451\u5C07\u5176\u5217\u5165\u690D\u7269\uFF0F\u7901\u7269\u8ABF\u67E5\u3002"},{id:"mangrove-root",name:"\u9752\u6839\u7D05\u6A39",kind:"plant",islandId:"mangrove",description:"\u4EA4\u7E54\u6839\u7CFB\u8B77\u4F4F\u5CF6\u5CB8\uFF0C\u4E5F\u66FF\u5E7C\u9B5A\u4FDD\u7559\u907F\u98A8\u7684\u5C0F\u6C34\u9053\u3002"},{id:"seagrass",name:"\u9280\u5E36\u6D77\u8349",kind:"plant",islandId:"mangrove",description:"\u6D77\u8349\u96A8\u8457\u6F6E\u6D41\u50BE\u4F0F\uFF0C\u662F\u5224\u8B80\u6D41\u5411\u6700\u5B89\u975C\u7684\u5DE5\u5177\u3002"},{id:"glass-coral",name:"\u7409\u7483\u679D\u7901",kind:"plant",islandId:"reef",description:"\u534A\u900F\u660E\u7684\u6F6E\u9593\u7901\u8108\u3002\u9000\u6F6E\u6642\u9732\u51FA\uFF0C\u6EFF\u6F6E\u6642\u53EF\u5F9E\u5916\u570D\u901A\u884C\u3002"},{id:"star-tablet",name:"\u4E03\u661F\u822A\u6D77\u7891",kind:"relic",islandId:"ruin",description:"\u77F3\u523B\u8A18\u9304\u4E03\u5EA7\u5CF6\u5DBC\uFF0C\u4E2D\u592E\u7F3A\u53E3\u6B63\u6307\u5411\u9060\u6F6E\u71C8\u5854\u3002"},{id:"tide-clock",name:"\u6C89\u7761\u6F6E\u9418",kind:"relic",islandId:"ruin",diveSiteId:"ruin-dive",description:"\u9F52\u8F2A\u4ECD\u80FD\u96A8\u6F6E\u64FA\u52D5\uFF0C\u70BA\u4FEE\u5FA9\u71C8\u5854\u7559\u4E0B\u6700\u5F8C\u7684\u7DDA\u7D22\u3002"},{id:"beacon-lens",name:"\u5B88\u671B\u8005\u900F\u93E1",kind:"relic",islandId:"lighthouse",description:"\u6591\u99C1\u900F\u93E1\u7B49\u5F85\u4E09\u4EF6\u96F6\u4EF6\uFF0C\u5C07\u5149\u91CD\u65B0\u6295\u5411\u6F6E\u97F3\u6E2F\u3002"},{id:"keepers-vault",name:"\u5B88\u71C8\u4EBA\u822A\u8A8C",kind:"relic",islandId:"lighthouse",description:"\u300C\u8B80\u61C2\u6F6E\u6C34\uFF0C\u518D\u51FA\u767C\u3002\u300D\u822A\u8A8C\u6700\u5F8C\u4E00\u9801\u4ECD\u7559\u7D66\u4E0B\u4E00\u4F4D\u65C5\u4EBA\u3002"}],mi=[{id:"steady",name:"\u7A69\u5B9A\u5E06",description:"\u5747\u8861\u8F49\u5411\u8207\u822A\u901F\uFF0C\u521D\u6B21\u822A\u884C\u63A8\u85A6\u3002",speed:4,handling:1.75,capacity:8},{id:"swift",name:"\u9806\u98A8\u5E06",description:"\u9806\u98A8\u901F\u5EA6\u6700\u5FEB\uFF0C\u8F49\u5411\u8F03\u6162\uFF1B\u6311\u6230\u6700\u7701\u6642\u7D00\u9304\u3002",speed:5.25,handling:1.3,capacity:5},{id:"cargo",name:"\u9060\u822A\u5E06",description:"\u8CA8\u8259\u66F4\u5927\u3001\u8F49\u5411\u9748\u6D3B\uFF0C\u9069\u5408\u4E00\u6B21\u63A2\u7D22\u591A\u5EA7\u5CF6\u3002",speed:3.25,handling:2.05,capacity:14}],ed=n=>({...Lt.find(e=>e.id===n).dock}),Ht=(n,e,t=[])=>({fromIslandId:n,toIslandId:e,waypoints:[ed(n),...t.map(([i,r])=>({x:i,z:r})),ed(e)]}),zn=(n,e,t,i)=>({id:n,name:e,description:t,legs:i,waypoints:i.flatMap((r,s)=>s?r.waypoints.slice(1):r.waypoints)}),as=n=>{let e=vn.find(t=>t.id===n);return{discoveryId:e.id,islandId:e.islandId,kind:e.diveSiteId?"dive":"shore",...e.diveSiteId?{siteId:e.diveSiteId}:{},name:e.name}},Ut=[{id:"coral-survey",name:"\u56DB\u68F2\u5730\u7684\u6F6E\u6C50\u6D77\u5716",islandId:"coral",targetDiscovery:"fan-coral",reward:65,description:"\u5728\u540C\u4E00\u8D9F\u822A\u7A0B\u6BD4\u8F03\u73CA\u745A\u7063\u5CB8\u7901\u8207\u72D0\u9B5A\u3001\u9752\u6839\u7D05\u6A39\u3001\u7409\u7483\u679D\u7901\u8207\u9E1A\u9D61\u87BA\uFF0C\u518D\u8A18\u9304\u767D\u7FBD\u71D5\u9DD7\u3002\u56DB\u5CF6\u516D\u9805\u8ABF\u67E5\u3001\u5169\u6B21\u6DFA\u6F5B\u5F8C\u8FD4\u6E2F\uFF0C\u9023\u8D77\u6C34\u4E0B\u3001\u6F6E\u9593\u3001\u7D05\u6A39\u8207\u7A7A\u4E2D\u7684\u98DF\u7269\u93C8\uFF0C\u540C\u6642\u5C0B\u56DE\u5169\u4EF6\u71C8\u5854\u96F6\u4EF6\u3002",objectives:["fan-coral","foxfish","mangrove-root","glass-coral","nautilus","tern"].map(as),routes:[zn("safe","\u56DB\u68F2\u5730\u5916\u7DE3","\u5F9E\u73CA\u745A\u7063\u6CBF\u7D05\u6A39\u6771\u5CB8\u5317\u4E0A\uFF0C\u518D\u7531\u7409\u7483\u7901\u897F\u5357\u5916\u7DE3\u5165\u6E2F\uFF1B\u7D93\u767D\u7FBD\u5CF6\u6BD4\u8F03\u9CE5\u985E\u5F8C\u8FD4\u6E2F\uFF0C\u5168\u7A0B\u4E0D\u9700\u8981\u7B49\u6F6E\u3002",[Ht("harbor","coral"),Ht("coral","mangrove"),Ht("mangrove","reef",[[-42,38]]),Ht("reef","gull"),Ht("gull","harbor")]),zn("tide","\u56DB\u68F2\u5730\u6F6E\u9053","\u6CBF\u897F\u5074\u6F6E\u9053\u6BD4\u8F03\u68F2\u5730\uFF0C\u518D\u7A7F\u904E\u7409\u7483\u7901\u5357\u65B9\u6DF1\u6C34\u524D\u5F80\u767D\u7FBD\uFF1B\u6D41\u5411\u4E0D\u5229\u6642\u53EF\u79FB\u5230\u5916\u7DE3\u3002",[Ht("harbor","coral",[[-30,90]]),Ht("coral","mangrove",[[-66,12],[-70,-40]]),Ht("mangrove","reef",[[-40,-35],[-34,38]]),Ht("reef","gull",[[55,25]]),Ht("gull","harbor",[[32,90]])])]},{id:"gull-watch",name:"\u767D\u7FBD\u7684\u822A\u7DDA",islandId:"gull",targetDiscovery:"tern",reward:35,description:"\u767B\u9304\u767D\u7FBD\u5CF6\u71D5\u9DD7\uFF0C\u518D\u628A\u6D41\u5411\u89C0\u5BDF\u5E36\u56DE\u6BCD\u6E2F\u3002",objectives:[as("tern")],routes:[zn("safe","\u767D\u7FBD\u5167\u7DE3","\u6CBF\u65CB\u6D41\u897F\u5074\u8207\u767D\u7FBD\u5CF6\u897F\u5357\u5CB8\u4E4B\u9593\u7684\u6DF1\u6C34\u5ECA\u9053\u3002",[Ht("harbor","gull")]),zn("tide","\u767D\u7FBD\u6F6E\u7063","\u5F9E\u5357\u65B9\u6F6E\u810A\u6771\u5074\u5207\u5165\u5167\u7063\uFF0C\u89C0\u5BDF\u65CB\u6D41\u8207\u8FD1\u5CB8\u6D41\u5411\u3002",[Ht("harbor","gull",[[32,90]])])]},{id:"green-roots",name:"\u9752\u6839\u7684\u5B88\u8B77",islandId:"mangrove",targetDiscovery:"mangrove-root",reward:45,description:"\u8A18\u9304\u9752\u6839\u7D05\u6A39\u7684\u8B77\u5CB8\u6839\u7CFB\uFF0C\u8FD4\u6E2F\u4EA4\u4ED8\u3002",objectives:[as("mangrove-root")],routes:[zn("safe","\u897F\u7901\u5916\u7DE3","\u7E5E\u904E\u6F6E\u810A\u897F\u5074\u8207\u7409\u7483\u7901\uFF0C\u518D\u6CBF\u7D05\u6A39\u6771\u5CB8\u9760\u6E2F\u3002",[Ht("harbor","mangrove",[[-42,99],[-70,24],[-78,-35]])]),zn("tide","\u897F\u5074\u6F6E\u9053","\u6CBF\u9752\u8272\u6F6E\u9053\u5317\u884C\uFF1B\u9006\u6D41\u6642\u79FB\u5230\u6F6E\u9053\u5916\u7DE3\u3002",[Ht("harbor","mangrove",[[-50,70],[-50,-40]])])]},{id:"star-reading",name:"\u4E03\u661F\u7684\u822A\u6D77\u5716",islandId:"ruin",targetDiscovery:"star-tablet",reward:50,description:"\u8B80\u53D6\u661F\u76E4\u5CF6\u822A\u6D77\u7891\uFF0C\u5C07\u4E03\u5CF6\u7684\u8A18\u61B6\u5E36\u56DE\u3002",objectives:[as("star-tablet")],routes:[zn("safe","\u661F\u76E4\u6F6E\u9580\u5916\u7DE3","\u7A7F\u904E\u767D\u7FBD\u5CF6\u897F\u5074\uFF0C\u518D\u6CBF\u6F6E\u9580\u6771\u7DE3\u9760\u8FD1\u661F\u76E4\u5CF6\u897F\u5357\u6E2F\u3002",[Ht("harbor","ruin",[[48,96],[70,20],[76,-34]])]),zn("tide","\u6771\u5074\u6F6E\u9053","\u6CBF\u6771\u5074\u6F6E\u9053\u5229\u7528\u9806\u6D41\uFF0C\u9000\u6F6E\u907F\u958B\u6F6E\u9580\u3002",[Ht("harbor","ruin",[[55,90],[55,-40]])])]},{id:"glass-study",name:"\u7409\u7483\u7901\u8A18\u9304",islandId:"reef",targetDiscovery:"glass-coral",reward:40,description:"\u5728\u7409\u7483\u7901\u5B89\u5168\u9760\u5CB8\uFF0C\u767B\u9304\u7901\u8108\u5F8C\u56DE\u6E2F\u3002",objectives:[as("glass-coral")],routes:[zn("safe","\u7409\u7483\u897F\u74B0","\u7E5E\u958B\u5357\u5074\u6F6E\u810A\uFF0C\u5F9E\u7901\u5CF6\u897F\u5357\u65B9\u9760\u5CB8\uFF1B\u4EFB\u4F55\u6C34\u4F4D\u7686\u53EF\u62B5\u9054\u3002",[Ht("harbor","reef",[[-30,95],[-34,38]])]),zn("tide","\u6F6E\u810A\u76F4\u822A","\u6EFF\u6F6E\u6642\u8D8A\u904E\u5357\u65B9\u6F6E\u810A\uFF1B\u4F4E\u6F6E\u9078\u897F\u74B0\u3002",[Ht("harbor","reef",[[0,80]])])]},{id:"keepers-journal",name:"\u5B88\u71C8\u4EBA\u7684\u6D88\u606F",islandId:"lighthouse",targetDiscovery:"keepers-vault",reward:65,description:"\u63A2\u8A2A\u9060\u6F6E\u71C8\u5854\u4E26\u767B\u9304\u822A\u8A8C\u3002\u4E09\u4EF6\u96F6\u4EF6\u9F4A\u5099\u6642\u53EF\u540C\u6642\u4FEE\u5FA9\u3002",objectives:[as("keepers-vault")],routes:[zn("safe","\u71C8\u5854\u6DF1\u6C34\u5ECA\u9053","\u7D93\u7409\u7483\u7901\u897F\u5074\uFF0C\u518D\u5F9E\u9752\u6839\u65CB\u6D41\u6771\u7DE3\u7684\u6DF1\u6C34\u5ECA\u9053\u62B5\u9054\u71C8\u5854\uFF1B\u4E0D\u9700\u8981\u7B49\u6F6E\u3002",[Ht("harbor","lighthouse",[[-40,100],[-48,40],[-40,-25],[-20,-85],[0,-145]])]),zn("tide","\u6771\u5074\u501F\u6D41\u5ECA\u9053","\u6CBF\u661F\u76E4\u6F6E\u9053\u8B80\u53D6\u9806\u9006\u6D41\uFF0C\u518D\u5F9E\u6F6E\u9580\u6771\u5074\u6DF1\u6C34\u901A\u904E\uFF1B\u6C34\u4F4D\u4E0D\u8DB3\u4E5F\u6709\u5B8C\u6574\u822A\u8DEF\u3002",[Ht("harbor","lighthouse",[[45,90],[70,-40],[70,-140]])])]}],Ce=(n,e,t,i,r,s)=>({id:n,label:e,reason:t,kind:i,waypoints:[{x:r,z:s}]}),Bn=(n,e,t,i,r,s,o,a={})=>({id:n,name:e,x:t,z:i,radius:r,directions:{...s?{north:Array.isArray(s)?{options:s}:s}:{},...o?{south:Array.isArray(o)?{options:o}:o}:{},...a}}),io=Object.freeze({north:Object.freeze({x:0,z:-1}),south:Object.freeze({x:0,z:1}),east:Object.freeze({x:1,z:0}),west:Object.freeze({x:-1,z:0})}),ro=[Bn("shoal-margin","\u5357\u65B9\u6F6E\u810A\u897F\u7DE3",-35,99,35,{entries:[{destinationIslandId:"reef",x:0,z:126,radius:14,lateralRadius:24,options:[Ce("outer","\u6F6E\u810A\u897F\u5074\u7E5E\u884C","\u897F\u5074\u822A\u5411\u8F03\u63A5\u8FD1\u56FA\u5B9A\u98A8\u5411\uFF0C\u5F8C\u6BB5\u5F9E\u7409\u7483\u897F\u5357\u65B9\u5165\u6CCA\uFF1B\u5FC5\u9808\u4FDD\u6301\u7901\u5708\u5916\u7684\u8F49\u5411\u3002","safe",-30,76),Ce("inner","\u6F6E\u810A\u6771\u5074\u7E5E\u884C","\u6771\u5074\u822A\u5411\u7684\u5E06\u529B\u8F03\u5F31\uFF0C\u5F8C\u6BB5\u63A5\u7409\u7483\u5357\u9762\u6CCA\u4F4D\u8F03\u76F4\u63A5\uFF1B\u540C\u6A23\u5F9E\u7901\u5708\u5916\u901A\u904E\u3002","direct",28,72)]}],options:[Ce("outer","\u5916\u7DE3\u7559\u8DB3\u5CB8\u8DDD","\u897F\u5074\u6DF1\u6C34\u7559\u51FA\u66F4\u5927\u7684\u8F49\u8235\u7A7A\u9593\uFF0C\u4E0B\u4E00\u6BB5\u5230\u7409\u7483\u7901\u8F03\u9060\u3002","safe",-48,84),Ce("inner","\u5167\u7DE3\u7E2E\u77ED\u63A5\u8FD1","\u5F9E\u6F6E\u810A\u897F\u7DE3\u8FD1\u7DDA\u901A\u904E\uFF0C\u7E2E\u77ED\u5F80\u4E2D\u592E\u6CCA\u4F4D\u7684\u5F8C\u6BB5\uFF1B\u9700\u5B88\u4F4F\u7901\u5916\u5CB8\u8DDD\u3002","current",-24,84)]},{entry:{x:-35,z:99,radius:39.5},entries:[{destinationIslandId:"harbor",x:0,z:60,radius:9,lateralRadius:15,options:[Ce("outer","\u897F\u5074\u7E5E\u7901\u8FD4\u6E2F","\u7531\u6F6E\u810A\u897F\u5074\u6DF1\u6C34\u8FD4\u6E2F\uFF0C\u56FA\u5B9A\u98A8\u89D2\u8F03\u6709\u5229\uFF1B\u5F8C\u6BB5\u8981\u5411\u6771\u5C0D\u6E96\u6BCD\u6E2F\u3002","safe",-30,105),Ce("inner","\u6771\u5074\u7E5E\u7901\u8FD4\u6E2F","\u5F9E\u6F6E\u810A\u6771\u5074\u6DF1\u6C34\u8FD4\u6E2F\uFF0C\u5F8C\u6BB5\u8F03\u63A5\u8FD1\u6BCD\u6E2F\u4E2D\u7DDA\uFF1B\u5E06\u89D2\u8F03\u5F31\u4E14\u9760\u8FD1\u7901\u5074\uFF0C\u9808\u5B88\u4F4F\u8DEF\u9EDE\u3002","direct",30,108)]},{x:-34,z:82,radius:32,lateralRadius:8}],options:[Ce("outer","\u5916\u7DE3\u4FDD\u7559\u8F49\u8235\u7A7A\u9593","\u6CBF\u897F\u5074\u6DF1\u6C34\u51FA\u7063\uFF0C\u96E2\u6F6E\u810A\u8F03\u9060\u4F46\u8FD4\u6E2F\u9700\u591A\u8F49\u4E00\u6B21\u8235\u3002","safe",-48,94),Ce("inner","\u8FD1\u7901\u7DDA\u659C\u5411\u6BCD\u6E2F","\u5F9E\u6F6E\u810A\u897F\u7DE3\u659C\u5411\u6BCD\u6E2F\uFF0C\u822A\u7A0B\u8F03\u76F4\u63A5\uFF1B\u4E0D\u8981\u5207\u9032\u6A19\u793A\u7901\u5708\u3002","current",-24,94)]}),Bn("glass-west-current","\u7409\u7483\u897F\u5CB8\u6D41\u53E3",-53,37,50,[Ce("outer","\u6F6E\u9053\u5916\u7DE3","\u8F03\u897F\u7684\u822A\u7DDA\u6E1B\u5C11\u5074\u6D41\u63A8\u79FB\uFF0C\u4FDD\u7559\u8F03\u5927\u96E2\u7901\u7A7A\u9593\u3002","safe",-78,29),Ce("inner","\u8CBC\u6D41\u9032\u5165\u5167\u7063","\u9760\u8FD1\u9752\u6839\u6F6E\u9053\u4E2D\u5FC3\uFF0C\u9806\u6D41\u6642\u501F\u901F\u3001\u9006\u6D41\u6642\u591A\u627F\u53D7\u6D41\u963B\u3002","current",-36,29)],{entry:{x:-53,z:37,radius:52},entries:[{x:-40,z:-10,radius:14,lateralRadius:16,options:[Ce("outer","\u897F\u5074\u6DF1\u6C34\u659C\u51FA\u7063","\u659C\u5411\u897F\u5074\u6DF1\u6C34\uFF0C\u8207\u7409\u7483\u7901\u4FDD\u7559\u8F03\u5927\u8DDD\u96E2\uFF1B\u5F9E\u5317\u7901\u63A5\u8FD1\u6642\u5E06\u89D2\u8F03\u6709\u5229\uFF0C\u4F46\u822A\u7A0B\u8F03\u9577\uFF0C\u5357\u5074\u4ECD\u9700\u56DE\u6B63\u3002","safe",-58,28),Ce("inner","\u7901\u897F\u8FD1\u7DDA\u51FA\u7063","\u6CBF\u7901\u897F\u8F03\u8FD1\u7684\u6DF1\u6C34\u7DDA\u63A5\u5357\u7063\uFF0C\u7E2E\u77ED\u7E5E\u884C\uFF1B\u5CB8\u8DDD\u8F03\u5C0F\uFF0C\u5F9E\u5317\u7901\u63A5\u8FD1\u6642\u5E06\u89D2\u8F03\u5F31\u3002","current",-38,25)]},{x:-24,z:-10,radius:18.5,lateralRadius:24,options:[Ce("outer","\u897F\u5074\u7A7F\u6D41\u7559\u5CB8\u8DDD","\u659C\u7A7F\u897F\u5074\u6C34\u57DF\uFF0C\u4FDD\u7559\u8F03\u5927\u7901\u5CB8\u8DDD\u96E2\uFF1B\u5F9E\u5317\u7901\u63A5\u8FD1\u6642\u5E06\u89D2\u8F03\u6709\u5229\uFF0C\u5357\u5074\u4ECD\u9700\u56DE\u6B63\u3002\u8ACB\u6309\u7576\u4E0B\u6CBF\u822A\u8DEF\u6D41\u901F\u6BD4\u8F03\u53D6\u6368\u3002","current",-55,20),Ce("inner","\u7901\u897F\u8FD1\u7DDA\u63A5\u5357\u7063","\u5F9E\u7409\u7483\u897F\u5CB8\u8F03\u8FD1\u7684\u6DF1\u6C34\u7DDA\u9032\u5165\u5357\u7063\uFF0C\u5C11\u5411\u897F\u7E5E\u884C\uFF1B\u5CB8\u8DDD\u8F03\u5C0F\uFF0C\u5F9E\u5317\u7901\u63A5\u8FD1\u6642\u5E06\u89D2\u8F03\u5F31\u3002","safe",-36,20)]}],options:[Ce("outer","\u5916\u7DE3\u51FA\u7063","\u5F9E\u6F6E\u9053\u5916\u7DE3\u56DE\u5230\u5357\u7063\uFF0C\u6D41\u5F71\u97FF\u8F03\u5C0F\u4F46\u96E2\u6BCD\u6E2F\u4E2D\u7DDA\u8F03\u9060\u3002","safe",-70,12),Ce("inner","\u5167\u7DE3\u501F\u6D41\u51FA\u7063","\u6CBF\u7409\u7483\u7901\u897F\u5074\u7684\u8F03\u5F37\u6D41\u5E36\u51FA\u7063\uFF0C\u4F9D\u7576\u524D\u6D41\u5411\u6C7A\u5B9A\u662F\u5426\u503C\u5F97\u3002","current",-36,20)]}),Bn("green-current","\u9752\u6839\u6F6E\u9053\u5206\u6D41",-48,-8,48,[Ce("outer","\u7D05\u6A39\u5916\u7DE3\u6C34\u9053","\u8F03\u897F\u5074\u6D41\u529B\u8F03\u5F31\uFF0C\u9760\u9752\u6839\u6CCA\u4F4D\u4E5F\u8F03\u76F4\u63A5\u3002","safe",-87,-36),Ce("inner","\u4E2D\u592E\u6D41\u5E36","\u4E2D\u592E\u6D41\u5E36\u8F03\u5F37\uFF1B\u5317\u4E0A\u9806\u6D41\u53EF\u52A0\u901F\uFF0C\u9006\u6D41\u5247\u589E\u52A0\u6642\u9593\u3002","current",-43,-36)],[Ce("outer","\u897F\u7DE3\u6E1B\u5C11\u9006\u6D41","\u6CBF\u8F03\u5F31\u6D41\u529B\u7684\u5916\u7DE3\u8FD4\u822A\uFF0C\u4EE5\u8DDD\u96E2\u63DB\u53D6\u8F03\u5C11\u6D41\u963B\u3002","safe",-68,-12),Ce("inner","\u4E2D\u592E\u6D41\u5E36\u8FD4\u822A","\u4E2D\u592E\u6D41\u5E36\u8F03\u5F37\uFF1B\u5357\u4E0B\u662F\u5426\u501F\u5230\u6D41\u901F\u53D6\u6C7A\u65BC\u76EE\u524D\u6F6E\u76F8\u3002","current",-52,-20)]),Bn("whirl-east-margin","\u9752\u6839\u65CB\u6D41\u6771\u7DE3",-18,-87,54,{entry:{x:-18,z:-94,radius:45,lateralRadius:26},options:[Ce("outer","\u5411\u6771\u591A\u7559\u65CB\u6D41\u8DDD\u96E2","\u504F\u6771\u6DF1\u6C34\u96E2\u65CB\u6D41\u66F4\u9060\uFF0C\u9069\u5408\u5148\u78BA\u4FDD\u8F49\u8235\u7A7A\u9593\u3002","safe",5,-104),Ce("inner","\u65CB\u6D41\u5916\u5708\u8FD1\u7DDA","\u8CBC\u8457\u65CB\u6D41\u5916\u5708\u7684\u6DF1\u6C34\u8FD1\u7DDA\u5317\u4E0A\uFF0C\u8DEF\u8F03\u76F4\u63A5\u4F46\u8981\u5B88\u4F4F\u5916\u5708\u3002","current",-25,-104)]},{entry:{x:0,z:-87,radius:42,lateralRadius:42},options:[Ce("outer","\u6771\u5074\u6DF1\u6C34\u8FD4\u822A","\u9060\u96E2\u65CB\u6D41\u5F8C\u518D\u8F49\u5165\u6D77\u5716\u4E2D\u592E\uFF0C\u5074\u6D41\u5F71\u97FF\u8F03\u5C11\u3002","safe",5,-70),Ce("inner","\u9752\u6839\u6F6E\u9053\u63A5\u7E8C\u7DDA","\u6CBF\u65CB\u6D41\u6771\u5074\u63A5\u5165\u9752\u6839\u6F6E\u9053\uFF1B\u6BD4\u8F03\u7576\u524D\u6D41\u5411\u8207\u8F03\u76F4\u63A5\u7684\u897F\u5074\u8DEF\u5F91\u3002","current",-25,-70)]}),Bn("north-reef-current","\u7409\u7483\u5317\u7901\u6D41\u53E3",-24,-48,46,{destinationIslandId:"lighthouse",entry:{x:-24,z:-55,radius:54},options:[Ce("outer","\u897F\u5074\u5F37\u6D41\u7DDA","\u897F\u5074\u63A5\u8FD1\u9752\u6839\u6F6E\u9053\u4E2D\u5FC3\uFF0C\u9806\u6D41\u53EF\u7701\u6642\uFF0C\u9006\u6D41\u6703\u62D6\u6162\u3002","current",-40,-74),Ce("inner","\u6771\u5074\u5F31\u6D41\u7DDA","\u6771\u5074\u6D41\u529B\u8F03\u5F31\uFF0C\u4F46\u4E0B\u4E00\u6BB5\u9808\u4FDD\u7559\u65CB\u6D41\u7684\u6771\u5074\u901A\u9053\u3002","safe",-12,-74)]},{entry:{x:-20,z:-38,radius:34,lateralRadius:60},entries:[{x:4,z:-48,radius:31,lateralRadius:12,options:[Ce("outer","\u6771\u4F86\u5411\u897F\u5074\u6D41\u5E36","\u5F9E\u65CB\u6D41\u6771\u5074\u63A5\u8FD1\u6642\uFF0C\u659C\u5411\u897F\u5074\u8F03\u5F37\u6D41\u5E36\uFF0C\u8F03\u8FD1\u7901\u7DDA\u591A\u7559\u96E2\u5CB8\u8DDD\u96E2\uFF1B\u9806\u9006\u6D41\u6C7A\u5B9A\u9019\u6BB5\u7684\u6642\u9593\u6210\u672C\u3002","current",-33,-28),Ce("inner","\u6771\u4F86\u5411\u7901\u5916\u8FD1\u7DDA","\u5F9E\u65CB\u6D41\u6771\u5074\u63A5\u8FD1\u6642\uFF0C\u6CBF\u8F03\u5F31\u6D41\u7684\u8FD1\u7DDA\u5357\u4E0B\uFF1B\u6A6B\u5411\u822A\u7A0B\u8F03\u77ED\uFF0C\u4F46\u66F4\u9760\u8FD1\u7409\u7483\u7901\u5317\u5074\u5CB8\u7DDA\u3002","safe",-15,-22)]}],options:[Ce("outer","\u897F\u5074\u6D41\u5E36\u51FA\u5165\u53E3","\u8F03\u897F\u5074\u6D41\u529B\u66F4\u5F37\uFF0C\u4E14\u96E2\u7409\u7483\u7901\u8F03\u9060\uFF1B\u9806\u9006\u6D41\u6C7A\u5B9A\u6642\u9593\u6210\u672C\u3002","current",-40,-22),Ce("inner","\u7901\u5916\u5F31\u6D41\u7DDA","\u907F\u958B\u6F6E\u9053\u4E2D\u5FC3\u7684\u8F03\u5F37\u6D41\u529B\uFF0C\u4EE3\u50F9\u662F\u66F4\u9760\u8FD1\u7409\u7483\u7901\u5317\u5074\u5CB8\u7DDA\u3002","safe",-15,-22)]}),Bn("beacon-wind","\u71C8\u5854\u6CCA\u5916\u5206\u6D41",0,-145,26,{destinationIslandId:"lighthouse",entry:{x:0,z:-140,radius:30},options:[Ce("outer","\u897F\u5074\u5C0D\u4F4D\u518D\u9760\u6CCA","\u5F9E\u897F\u5074\u6DF1\u6C34\u9810\u7559\u8F49\u8235\u7A7A\u9593\uFF0C\u518D\u659C\u5411\u71C8\u5854\u6CCA\u4F4D\uFF1B\u822A\u7A0B\u8F03\u9577\uFF0C\u9700\u5728\u6700\u5F8C\u8F49\u5411\u524D\u6536\u5E06\u3002","safe",-20,-172),Ce("inner","\u4E2D\u592E\u8FD1\u7DDA\u9760\u6CCA","\u6CBF\u4E2D\u592E\u77ED\u7DDA\u63A5\u8FD1\u71C8\u5854\u6CCA\u4F4D\uFF1B\u8F03\u65E9\u9762\u5C0D\u5CF6\u5CB8\uFF0C\u9808\u53CA\u6642\u6536\u5E06\u907F\u514D\u904E\u885D\u3002","direct",0,-172)]},[Ce("outer","\u897F\u5074\u6DF1\u6C34\u8FD4\u822A","\u5411\u897F\u63A5\u5165\u65CB\u6D41\u6771\u5074\u6DF1\u6C34\u5ECA\u9053\uFF0C\u8F03\u5C11\u53D7\u5230\u661F\u76E4\u6F6E\u6D41\u5F71\u97FF\u3002","safe",-20,-112),Ce("inner","\u6771\u5074\u63A5\u661F\u76E4\u6F6E\u9053","\u504F\u6771\u63A5\u8FD1\u661F\u76E4\u6D41\u5E36\uFF1B\u9806\u6D41\u53EF\u80FD\u7701\u6642\uFF0C\u9006\u6D41\u6642\u5916\u7DE3\u66F4\u5BB9\u6613\u524D\u9032\u3002","current",20,-112)],{west:{destinationIslandId:"lighthouse",entry:{x:36,z:-140,radius:42,lateralRadius:35},options:[Ce("outer","\u6771\u5074\u7559\u5CB8\u8DDD\u5165\u6CCA","\u5148\u5728\u71C8\u5854\u6771\u5357\u5074\u9810\u7559\u8F49\u5411\u7A7A\u9593\uFF0C\u518D\u5411\u6CCA\u4F4D\u9760\u650F\uFF1B\u672B\u6BB5\u8F03\u9577\u4F46\u9060\u96E2\u5CF6\u5CB8\u3002","safe",20,-172),Ce("inner","\u4E2D\u592E\u77ED\u7DDA\u5C0D\u4F4D","\u76F4\u63A5\u659C\u5411\u4E2D\u592E\u6CCA\u4F4D\u5EF6\u9577\u7DDA\uFF0C\u5F8C\u6BB5\u8F03\u77ED\uFF1B\u5148\u6536\u5E06\u518D\u63A5\u8FD1\u71C8\u5854\u5CB8\u7DDA\u3002","direct",0,-172)]}}),Bn("white-whirl-margin","\u767D\u7FBD\u65CB\u6D41\u897F\u7DE3",54,91,48,{entry:{x:54,z:91,radius:40},options:[Ce("outer","\u897F\u5074\u5BEC\u6C34\u57DF","\u4FDD\u7559\u8F03\u5927\u65CB\u6D41\u8207\u5CF6\u5CB8\u8DDD\u96E2\uFF0C\u5F80\u767D\u7FBD\u6CCA\u4F4D\u9700\u518D\u8F49\u5411\u3002","safe",48,56),Ce("inner","\u767D\u7FBD\u6CCA\u5916\u8FD1\u7DDA","\u6CBF\u65CB\u6D41\u897F\u5074\u8FD1\u7DDA\u5C0D\u6E96\u767D\u7FBD\u6E2F\uFF0C\u7E2E\u77ED\u5F8C\u6BB5\u4F46\u9700\u8981\u7CBE\u6E96\u8F49\u8235\u3002","current",76,56)]},{entry:{x:54,z:91,radius:48},options:[Ce("outer","\u897F\u5074\u5BEC\u6C34\u57DF\u8FD4\u6E2F","\u5411\u897F\u4FDD\u7559\u65CB\u6D41\u8DDD\u96E2\uFF0C\u518D\u659C\u5411\u6BCD\u6E2F\uFF0C\u8F49\u8235\u7A7A\u9593\u8F03\u5927\u3002","safe",40,112),Ce("inner","\u65CB\u6D41\u8FD1\u5074\u77ED\u7DDA","\u7531\u65CB\u6D41\u897F\u5074\u6DF1\u6C34\u8FD1\u7DDA\u56DE\u6E2F\uFF0C\u8DEF\u66F4\u76F4\u63A5\u4F46\u4E0D\u8981\u5F80\u6771\u5207\u5165\u65CB\u6D41\u5708\u3002","current",50,100)]}),Bn("glass-east-margin","\u7409\u7483\u6771\u5CB8\u6C34\u9053",45,25,46,{entry:{x:45,z:25,radius:45},options:[Ce("outer","\u6771\u5074\u6DF1\u6C34\u7DDA","\u96E2\u7409\u7483\u7901\u8F03\u9060\uFF0C\u9069\u5408\u9810\u7559\u8F49\u5165\u661F\u76E4\u6F6E\u9053\u7684\u7A7A\u9593\u3002","safe",65,0),Ce("inner","\u7901\u5916\u8FD1\u5074\u7DDA","\u9760\u8FD1\u7409\u7483\u7901\u6771\u5074\u5916\u7DE3\u901A\u904E\uFF0C\u8207\u897F\u5074\u68F2\u5730\u7684\u63A5\u7E8C\u8F03\u77ED\uFF1B\u52FF\u8CBC\u5CB8\u6025\u8F49\u3002","current",42,0)]},{entry:{x:45,z:25,radius:45},options:[Ce("outer","\u767D\u7FBD\u5074\u6DF1\u6C34\u7DDA","\u5F9E\u6771\u5074\u6DF1\u6C34\u63A5\u5411\u767D\u7FBD\u5167\u7063\uFF0C\u8F03\u5C11\u8FD1\u5CB8\u4FEE\u6B63\u3002","safe",65,52),Ce("inner","\u4E2D\u592E\u7901\u5916\u8FD1\u7DDA","\u5F9E\u7409\u7483\u7901\u6771\u5074\u5916\u7DE3\u5411\u6BCD\u6E2F\u4E2D\u7DDA\u63A5\u8FD1\uFF0C\u7559\u610F\u8239\u9AD4\u7684\u96E2\u7901\u7A7A\u9593\u3002","current",36,52)]}),Bn("star-gate-margin","\u661F\u76E4\u6F6E\u9580\u6771\u7DE3",74,-29,26,{entry:{x:74,z:-29,radius:22},options:[Ce("outer","\u6771\u5074\u5BEC\u6DF1\u6C34","\u8207\u661F\u76E4\u6F6E\u9580\u4FDD\u6301\u8F03\u5927\u8DDD\u96E2\uFF0C\u6D41\u529B\u4E5F\u8F03\u504F\u5916\u7DE3\u3002","safe",82,-65),Ce("inner","\u6F6E\u9580\u5916\u501F\u6D41\u7DDA","\u4ECD\u5F9E\u6F6E\u9580\u5916\u5074\u901A\u904E\uFF0C\u4F46\u9760\u8FD1\u661F\u76E4\u6F6E\u9053\u4E2D\u5FC3\uFF1B\u6D41\u5411\u6C7A\u5B9A\u80FD\u5426\u7701\u6642\u3002","current",68,-64)]},[Ce("outer","\u6771\u5074\u5916\u7DE3\u8FD4\u822A","\u4EE5\u8F03\u5927\u7684\u7901\u5916\u7A7A\u9593\u63DB\u53D6\u8F03\u5F31\u7684\u6F6E\u9053\u63A8\u79FB\u3002","safe",82,7),Ce("inner","\u4E2D\u592E\u6D41\u5E36\u8FD4\u822A","\u6CBF\u6F6E\u9580\u6771\u5074\u6D41\u5E36\u5357\u4E0B\uFF0C\u9806\u9006\u6D41\u6703\u6539\u8B8A\u8FD4\u822A\u6642\u9593\u3002","current",65,7)]),Bn("star-north-current","\u661F\u76E4\u5317\u5074\u6D41\u7DE3",70,-100,26,[Ce("outer","\u5317\u5074\u6DF1\u6C34\u5916\u7DE3","\u5148\u6CBF\u661F\u76E4\u5916\u5074\u6DF1\u6C34\u5317\u884C\uFF0C\u518D\u8F49\u5411\u71C8\u5854\uFF0C\u4FDD\u7559\u5CF6\u5CB8\u7A7A\u9593\u3002","safe",76,-132),Ce("inner","\u504F\u897F\u63A5\u71C8\u5854","\u504F\u897F\u7A7F\u904E\u6F6E\u9053\uFF0C\u5F80\u71C8\u5854\u7684\u5F8C\u6BB5\u8F03\u77ED\uFF1B\u9700\u4FEE\u6B63\u5074\u6D41\u63A8\u79FB\u3002","current",48,-132)],[Ce("outer","\u6771\u5074\u6D41\u7DE3","\u5411\u661F\u76E4\u6F6E\u9053\u5916\u7DE3\u79FB\u52D5\uFF0C\u8F03\u5BB9\u6613\u63A7\u5236\u4E0B\u4E00\u6B21\u9760\u6CCA\u8F49\u5411\u3002","safe",76,-68),Ce("inner","\u897F\u5074\u6D41\u5E36","\u7559\u5728\u8F03\u9760\u8FD1\u6F6E\u9580\u7684\u6D41\u5E36\u4E2D\uFF0C\u4F9D\u9806\u9006\u6D41\u6BD4\u8F03\u8FD4\u822A\u8DEF\u7A0B\u3002","current",65,-68)]),Bn("west-current-exit","\u9752\u6839\u6D41\u5C3E\u8207\u6F6E\u810A\u8F49\u63A5",-41.5,56,40,null,{entries:[{x:-45,z:50,radius:36,options:[Ce("outer","\u897F\u5074\u6D41\u5C3E\u63A5\u6F6E\u810A","\u6CBF\u897F\u5074\u6C34\u57DF\u63A5\u5411\u6F6E\u810A\u5916\u7DE3\uFF0C\u4FDD\u7559\u8F03\u5927\u7684\u96E2\u7901\u7A7A\u9593\uFF1B\u5357\u7AEF\u518D\u5411\u6BCD\u6E2F\u56DE\u6B63\uFF0C\u6D41\u6CC1\u770B\u7576\u4E0B\u6CBF\u7DDA\u6295\u5F71\u3002","current",-48,70),Ce("inner","\u659C\u51FA\u6D41\u5C3E\u63A5\u6F6E\u810A","\u5411\u6771\u659C\u51FA\u6D41\u5C3E\uFF0C\u8F03\u65E9\u63A5\u8FD1\u6F6E\u810A\u897F\u5074\uFF1B\u5F8C\u6BB5\u8F03\u76F4\u63A5\uFF0C\u4F46\u96E2\u7901\u7A7A\u9593\u8F03\u5C0F\uFF0C\u9700\u5B88\u4F4F\u8FD1\u7DDA\u3002","safe",-30,60)]}],options:[Ce("outer","\u897F\u7DE3\u7559\u6D41\u518D\u7E5E\u6F6E\u810A","\u6CBF\u897F\u5074\u6D41\u5C3E\u63A5\u5411\u6F6E\u810A\u5916\u7DE3\uFF1B\u6BD4\u8F03\u76EE\u524D\u6D41\u6CC1\u8207\u5F8C\u7E8C\u8DDD\u96E2\u3002","current",-65,65),Ce("inner","\u63D0\u65E9\u96E2\u6D41\u63A5\u8FD1\u6F6E\u810A","\u659C\u7A7F\u6D41\u5C3E\u5F8C\u96E2\u958B\u6D41\u5E36\uFF0C\u8F03\u65E9\u63A5\u8FD1\u6F6E\u810A\u897F\u5074\uFF1B\u9806\u6D41\u6642\u6703\u653E\u68C4\u90E8\u5206\u6D41\u901F\u3002","safe",-30,65)]}),Bn("harbor-approach","\u6F6E\u97F3\u6E2F\u6CCA\u5916\u9032\u6E2F",20,147,60,null,{destinationIslandId:"harbor",entry:{x:20,z:147,radius:60,maxDestinationDistance:76},entries:[{x:-38,z:128,radius:38,lateralRadius:24,maxDestinationDistance:50}],options:[Ce("outer","\u5916\u5074\u5C0D\u4F4D\u5F8C\u5165\u6E2F","\u5148\u5728\u6CCA\u4F4D\u897F\u5074\u5C0D\u4F4D\uFF0C\u4FDD\u7559\u8F03\u5927\u7684\u5CB8\u8DDD\uFF1B\u6700\u5F8C\u4ECD\u9700\u6536\u5E06\u8F49\u5411\u91D1\u8272\u6CCA\u4F4D\u3002","safe",-20,135),Ce("inner","\u76F4\u63A5\u5C0D\u6E96\u91D1\u8272\u6CCA\u4F4D","\u6700\u76F4\u63A5\u7684\u9032\u6E2F\u7DDA\uFF0C\u9760\u8FD1\u6BCD\u6E2F\u5CB8\u7DDA\u524D\u9700\u53CA\u6642\u6536\u5E06\uFF0C\u907F\u514D\u904E\u885D\u3002","current",-12,141)]}),{id:"glass-white-crossing",name:"\u7409\u7483\u8207\u767D\u7FBD\u6A6B\u5411\u9032\u6E2F",x:54,z:35,radius:20,directions:{east:{destinationIslandId:"gull",entry:{x:64,z:35,radius:17,lateralRadius:38},options:[Ce("outer","\u767D\u7FBD\u6CCA\u5916\u5C0D\u4F4D","\u5148\u5728\u767D\u7FBD\u6CCA\u4F4D\u7684\u5916\u5074\u5EF6\u9577\u7DDA\u5C0D\u4F4D\uFF0C\u518D\u6CBF\u5CB8\u5916\u65B9\u5411\u5165\u6E2F\uFF1B\u822A\u7A0B\u8F03\u9577\uFF0C\u8F49\u5411\u6642\u6709\u8F03\u591A\u96E2\u5CB8\u7A7A\u9593\u3002","safe",76,20),Ce("inner","\u767D\u7FBD\u8FD1\u5074\u77ED\u7DDA","\u76F4\u63A5\u63A5\u8FD1\u767D\u7FBD\u897F\u5317\u6CCA\u4F4D\uFF0C\u5C11\u7E5E\u4E00\u6BB5\uFF1B\u8F03\u65E9\u63A5\u8FD1\u5CF6\u5CB8\uFF0C\u9808\u6536\u5E06\u4E26\u5B88\u4F4F\u91D1\u8272\u6CCA\u4F4D\u65B9\u5411\u3002","direct",76,38)]},west:{destinationIslandId:"reef",entry:{x:44,z:35,radius:20},options:[Ce("outer","\u7409\u7483\u6CCA\u5916\u5C0D\u4F4D","\u5148\u5230\u7409\u7483\u5357\u65B9\u6CCA\u4F4D\u5916\u5074\uFF0C\u518D\u5411\u5317\u5C0D\u6E96\u6CCA\u4F4D\uFF1B\u8F03\u9577\u4F46\u4FDD\u7559\u8F49\u8235\u8207\u96E2\u5CB8\u7A7A\u9593\u3002","safe",0,48),Ce("inner","\u7409\u7483\u8FD1\u5074\u77ED\u7DDA","\u5F9E\u6771\u5357\u65B9\u76F4\u63A5\u63A5\u8FD1\u7409\u7483\u6CCA\u4F4D\uFF0C\u7E2E\u77ED\u822A\u7A0B\uFF1B\u6536\u5E06\u5F8C\u624D\u8F49\u5411\u8FD1\u7901\u6CCA\u4F4D\uFF0C\u907F\u514D\u5207\u5165\u5CB8\u7DDA\u3002","direct",24,31)]}}},{id:"glass-port-approach",name:"\u7409\u7483\u897F\u5357\u6CCA\u5916",x:-38,z:36,radius:18,directions:{south:{destinationIslandId:"reef",entry:{x:-36,z:11,radius:6,lateralRadius:12},options:[Ce("outer","\u5357\u5074\u5C0D\u4F4D\u5165\u6E2F","\u5148\u7559\u5728\u7409\u7483\u5357\u5074\u6DF1\u6C34\uFF0C\u518D\u5411\u5317\u5C0D\u6E96\u6CCA\u4F4D\uFF1B\u8DDD\u96E2\u8F03\u9577\uFF0C\u8F49\u5411\u6642\u96E2\u5CB8\u8F03\u9060\u3002","safe",-8,40),Ce("inner","\u8FD1\u7901\u77ED\u7DDA\u5165\u6E2F","\u5F9E\u897F\u5357\u5074\u8FD1\u7DDA\u63A5\u6CCA\u4F4D\uFF0C\u7E2E\u77ED\u822A\u7A0B\uFF1B\u4FDD\u6301\u8239\u8EAB\u5728\u7901\u5CB8\u5916\uFF0C\u5148\u6536\u5E06\u518D\u8F49\u5411\u3002","direct",-16,31)]},east:{destinationIslandId:"reef",minForwardDot:.5,entry:{x:-38,z:36,radius:28,lateralRadius:26,maxDestinationDistance:54},options:[Ce("outer","\u5357\u5074\u5C0D\u4F4D\u5165\u6E2F","\u5148\u7559\u5728\u7409\u7483\u5357\u5074\u6DF1\u6C34\uFF0C\u518D\u5411\u5317\u5C0D\u6E96\u6CCA\u4F4D\uFF1B\u8DDD\u96E2\u8F03\u9577\uFF0C\u8F49\u5411\u6642\u96E2\u5CB8\u8F03\u9060\u3002","safe",-8,40),Ce("inner","\u8FD1\u7901\u77ED\u7DDA\u5165\u6E2F","\u5F9E\u897F\u5357\u5074\u8FD1\u7DDA\u63A5\u6CCA\u4F4D\uFF0C\u7E2E\u77ED\u822A\u7A0B\uFF1B\u4FDD\u6301\u8239\u8EAB\u5728\u7901\u5CB8\u5916\uFF0C\u5148\u6536\u5E06\u518D\u8F49\u5411\u3002","direct",-16,31)]},north:{destinationIslandId:"reef",entry:{x:-30,z:61,radius:18,lateralRadius:75},options:[Ce("outer","\u897F\u5357\u6DF1\u6C34\u5C0D\u4F4D","\u5148\u5728\u897F\u5357\u5074\u7559\u8DB3\u5CB8\u8DDD\uFF0C\u518D\u8F49\u5411\u7409\u7483\u6CCA\u4F4D\uFF1B\u8F03\u9060\u4F46\u8F49\u5411\u7A7A\u9593\u8F03\u5927\u3002","safe",-28,37),Ce("inner","\u5357\u9762\u76F4\u63A5\u5C0D\u4F4D","\u5F9E\u7409\u7483\u5357\u65B9\u63A5\u8FD1\u6CCA\u4F4D\uFF0C\u5F8C\u6BB5\u8F03\u77ED\uFF1B\u9760\u8FD1\u7901\u5CB8\u524D\u5148\u6536\u5E06\u3002","direct",0,43)]}}},{id:"green-port-approach",name:"\u9752\u6839\u6CCA\u5916\u8207\u6D41\u7DE3",x:-90,z:-52,radius:22,directions:{west:{destinationIslandId:"mangrove",entry:{x:-66,z:-60,radius:46},options:[Ce("outer","\u6CCA\u5916\u5EF6\u9577\u7DDA\u5C0D\u4F4D","\u5148\u7559\u5728\u6CCA\u4F4D\u5EF6\u9577\u7DDA\u7684\u6DF1\u6C34\u5074\uFF0C\u4FDD\u7559\u5CB8\u8DDD\uFF1B\u4ECD\u63A5\u8FD1\u9752\u6839\u6D41\u5E36\uFF0C\u9808\u6BD4\u8F03\u7576\u524D\u5074\u63A8\u8207\u8F03\u9577\u8DEF\u7A0B\u3002","current",-65,-50),Ce("inner","\u5CB8\u5916\u76F4\u63A5\u5165\u6E2F","\u76F4\u63A5\u63A5\u8FD1\u9752\u6839\u6771\u5357\u6CCA\u4F4D\uFF0C\u8DEF\u7A0B\u8F03\u77ED\u4E14\u96E2\u6D41\u9053\u4E2D\u5FC3\u8F03\u9060\uFF1B\u9760\u5CB8\u8F49\u5411\u9808\u66F4\u7CBE\u6E96\u3002","safe",-92,-75)]},north:{destinationIslandId:"mangrove",entry:{x:-98,z:-50,radius:25,lateralRadius:20},options:[Ce("outer","\u6771\u5074\u6DF1\u6C34\u63A5\u6CCA\u4F4D","\u504F\u6771\u4FDD\u7559\u7D05\u6A39\u5CB8\u8DDD\uFF0C\u518D\u8F49\u5411\u6CCA\u4F4D\uFF1B\u63A5\u8FD1\u6D41\u5E36\uFF0C\u9700\u4FEE\u6B63\u6F6E\u6D41\u5074\u63A8\u3002","current",-80,-58),Ce("inner","\u6CBF\u5CB8\u5916\u7DE3\u8FD1\u7DDA","\u6CBF\u7D05\u6A39\u6771\u5357\u5CB8\u5916\u7684\u8FD1\u7DDA\u5165\u6E2F\uFF0C\u8F03\u5C11\u7E5E\u884C\uFF1B\u9808\u5B88\u4F4F\u5CB8\u8DDD\u4E26\u63D0\u524D\u6536\u5E06\u3002","safe",-105,-50)]}}},{id:"coral-port-approach",name:"\u73CA\u745A\u7063\u6CCA\u5916\u5C0D\u4F4D",x:-63,z:67,radius:18,directions:{west:{destinationIslandId:"coral",options:[Ce("outer","\u5317\u5074\u6DF1\u6C34\u5C0D\u4F4D","\u5148\u5230\u73CA\u745A\u6CCA\u4F4D\u5317\u5074\u7684\u5EF6\u9577\u7DDA\uFF0C\u518D\u6CBF\u5CB8\u5916\u65B9\u5411\u9032\u6E2F\uFF1B\u8F03\u9060\u4F46\u6709\u66F4\u591A\u8F49\u8235\u7A7A\u9593\u3002","safe",-72,42),Ce("inner","\u6771\u5074\u8FD1\u7DDA\u9032\u6E2F","\u7531\u6771\u5074\u8FD1\u7DDA\u76F4\u63A5\u63A5\u8FD1\u73CA\u745A\u6CCA\u4F4D\uFF1B\u8DDD\u96E2\u8F03\u77ED\uFF0C\u6536\u5E06\u5F8C\u518D\u5B8C\u6210\u9760\u5CB8\u8F49\u5411\u3002","direct",-82,64)]}}}],so=[{id:"coral-crossing",name:"\u73CA\u745A\u5916\u7063\u6D6E\u6A19",x:-48,z:112,note:"\u73CA\u745A\u7063\u8207\u6F6E\u810A\u4E4B\u9593\u7559\u6709\u6DF1\u6C34\u7A7A\u9699\uFF0C\u96E2\u7901\u8D8A\u9060\uFF0C\u8D8A\u5C11\u53D7\u6C34\u4F4D\u9650\u5236\u3002"},{id:"coral-north",name:"\u73CA\u745A\u5317\u7DE3\u6D6E\u6A19",x:-89,z:18,note:"\u6CBF\u5CF6\u5CB8\u5916\u5074\u89C0\u5BDF\uFF0C\u6BD4\u8CBC\u8457\u73CA\u745A\u5CB8\u7DDA\u6025\u8F49\u66F4\u5BB9\u6613\u4FDD\u7559\u8239\u9AD4\u6DE8\u7A7A\u3002"},{id:"root-front",name:"\u7D05\u6A39\u524D\u7063\u6D6E\u6A19",x:-104,z:-30,note:"\u7D05\u6A39\u6839\u7CFB\u8B93\u7D30\u6C99\u6C89\u7A4D\uFF1B\u9760\u8FD1\u6839\u7063\u6642\u5148\u6536\u5E06\uFF0C\u80FD\u770B\u6E05\u6DFA\u7058\u908A\u7DE3\u3002"},{id:"root-stream",name:"\u9752\u6839\u6D41\u7DE3\u6D6E\u6A19",x:-86,z:-34,note:"\u540C\u4E00\u6F6E\u9053\u6703\u96A8\u6F6E\u76F8\u53CD\u5411\uFF1B\u6BD4\u8F03\u6D6E\u6CAB\u8207\u8239\u9996\uFF0C\u624D\u80FD\u5206\u8FA8\u9806\u6D41\u548C\u5074\u6D41\u3002"},{id:"glass-west",name:"\u7409\u7483\u897F\u7DE3\u6D6E\u6A19",x:-62,z:7,note:"\u7901\u5CF6\u897F\u7DE3\u9023\u63A5\u5169\u7247\u68F2\u5730\uFF1B\u7E5E\u5230\u6CCA\u4F4D\u5916\u5074\u5F8C\u518D\u8F49\u5411\uFF0C\u53EF\u4FDD\u7559\u5B89\u5168\u5CB8\u8DDD\u3002"},{id:"glass-approach",name:"\u7409\u7483\u6CCA\u5916\u6D6E\u6A19",x:-24,z:32,note:"\u7409\u7483\u6CCA\u4F4D\u5728\u7901\u5CF6\u5357\u9762\uFF0C\u6CBF\u5CF6\u5357\u5074\u9760\u8FD1\uFF0C\u80FD\u907F\u958B\u7A81\u51FA\u7684\u7901\u5CB8\u3002"},{id:"shoal-west",name:"\u6F6E\u810A\u897F\u5074\u6D6E\u6A19",x:-30,z:112,note:"\u5357\u65B9\u6F6E\u810A\u9732\u51FA\u6642\uFF0C\u897F\u5074\u6DF1\u6C34\u4ECD\u53EF\u901A\u884C\uFF1B\u53D6\u6A23\u4E5F\u80FD\u7528\u4F86\u6BD4\u8F03\u5169\u689D\u822A\u8DEF\u3002"},{id:"shoal-south",name:"\u6F6E\u810A\u8FD1\u7063\u6D6E\u6A19",x:-15,z:62,note:"\u6F6E\u810A\u7684\u53EF\u901A\u6C34\u4F4D\u7531\u7901\u9802\u6C7A\u5B9A\uFF1B\u6F32\u6F6E\u4E0D\u4EE3\u8868\u5DF2\u7D93\u80FD\u8D8A\u7901\uFF0C\u5148\u8B80\u6C34\u4F4D\u6A19\u8A18\u3002"},{id:"white-fork",name:"\u767D\u7FBD\u5206\u6D41\u6D6E\u6A19",x:74,z:135,note:"\u767D\u7FBD\u65CB\u6D41\u4F4D\u5728\u822A\u9053\u6771\u5074\uFF1B\u4FDD\u7559\u5916\u5708\u8DDD\u96E2\uFF0C\u6BD4\u7A7F\u904E\u4E2D\u5FC3\u66F4\u5BB9\u6613\u63A7\u5236\u8F49\u8235\u3002"},{id:"white-inlet",name:"\u767D\u7FBD\u6E2F\u5916\u6D6E\u6A19",x:75,z:68,note:"\u71D5\u9DD7\u6703\u6CBF\u9B5A\u7FA4\u8207\u6D41\u7DE3\u6D3B\u52D5\uFF1B\u89C0\u5BDF\u6D77\u9CE5\u53EF\u4EE5\u88DC\u5145\u6D77\u5716\uFF0C\u4E0D\u80FD\u53D6\u4EE3\u7901\u4F4D\u6A19\u8A18\u3002"},{id:"star-stream",name:"\u661F\u76E4\u5357\u6D41\u6D6E\u6A19",x:65,z:8,note:"\u6771\u5074\u6F6E\u9053\u8207\u897F\u5074\u6F6E\u9053\u65B9\u5411\u76F8\u53CD\uFF1B\u6F6E\u6C50\u9810\u5831\u80FD\u5E6B\u52A9\u9078\u64C7\u4E0B\u4E00\u6BB5\u501F\u6D41\u65B9\u5411\u3002"},{id:"star-gate",name:"\u6F6E\u9580\u6771\u7DE3\u6D6E\u6A19",x:77,z:-44,note:"\u661F\u76E4\u6F6E\u9580\u6771\u908A\u6709\u4E0D\u4F9D\u8CF4\u6C34\u4F4D\u7684\u5ECA\u9053\uFF1B\u501F\u4E2D\u592E\u6D41\u901F\u6642\u9700\u540C\u6642\u7559\u610F\u7901\u5708\u3002"},{id:"north-reef",name:"\u5317\u7901\u5ECA\u9053\u6D6E\u6A19",x:-42,z:-35,note:"\u96E2\u958B\u7409\u7483\u7901\u5411\u5317\u5F8C\uFF0C\u4E2D\u592E\u6DF1\u6C34\u9023\u63A5\u71C8\u5854\uFF1B\u5074\u6D41\u6703\u63A8\u79FB\u8239\u8EAB\uFF0C\u8239\u9996\u4E0D\u7B49\u65BC\u822A\u8DE1\u3002"},{id:"whirl-margin",name:"\u9752\u6839\u65CB\u6D41\u5916\u7DE3\u6D6E\u6A19",x:-35,z:-91,note:"\u65CB\u6D41\u5F37\u5EA6\u5177\u6709\u9031\u671F\uFF0C\u5916\u7DE3\u4ECD\u9700\u4FDD\u7559\u7A7A\u9593\uFF1B\u5B89\u5168\u5ECA\u9053\u5F9E\u65CB\u6D41\u6771\u908A\u7D93\u904E\u3002"},{id:"beacon-water",name:"\u9060\u6F6E\u6DF1\u6C34\u6D6E\u6A19",x:0,z:-145,note:"\u71C8\u5854\u5357\u9762\u7684\u6DF1\u6C34\u662F\u8FD4\u822A\u8F49\u5411\u5340\uFF1B\u5148\u5C0D\u6E96\u4E0B\u4E00\u6BB5\u822A\u8DEF\uFF0C\u518D\u628A\u5E06\u529B\u63D0\u9AD8\u3002"},{id:"beacon-approach",name:"\u5B88\u71C8\u4EBA\u8FCE\u822A\u6D6E\u6A19",x:-7,z:-166,note:"\u71C8\u5854\u6CCA\u4F4D\u671D\u5357\uFF0C\u6536\u5E06\u5F8C\u518D\u9032\u91D1\u8272\u6CCA\u4F4D\uFF1B\u53D6\u6A23\u8207\u9760\u5CB8\u90FD\u9700\u8981\u4F4E\u822A\u901F\u3002"}],ls=[{id:"west-stream",name:"\u9752\u6839\u6F6E\u9053",x:-50,z:-10,radius:70,dx:.1,dz:-1,strength:.775,phase:0},{id:"east-stream",name:"\u661F\u76E4\u6F6E\u9053",x:70,z:-80,radius:75,dx:-.1,dz:1,strength:.9,phase:Math.PI}],gi=[{id:"south-shoal",name:"\u5357\u65B9\u6F6E\u810A",x:0,z:92,radius:16,safeHeight:.35},{id:"east-gate",name:"\u661F\u76E4\u6F6E\u9580",x:43,z:-60,radius:15,safeHeight:.05}],xi=[{id:"west-whirl",name:"\u9752\u6839\u65CB\u6D41",x:-58,z:-125,radius:20,phase:0,strength:1.625},{id:"east-whirl",name:"\u767D\u7FBD\u65CB\u6D41",x:86,z:115,radius:16,phase:Math.PI,strength:6}],Zt=[{id:"coral-dive",islandId:"coral",name:"\u73CA\u745A\u6DFA\u7063",partId:"prism",partName:"\u805A\u5149\u7A1C\u93E1",discoveryId:"foxfish",entry:{x:-98,z:66},target:{x:-83,z:54},bubbles:[{x:-91,z:60}],radius:42,oxygen:55},{id:"ruin-dive",islandId:"ruin",name:"\u6C89\u9418\u6C34\u5EAD",partId:"gear",partName:"\u6F6E\u9418\u9F52\u8F2A",discoveryId:"tide-clock",entry:{x:99,z:-80},target:{x:83,z:-69},bubbles:[{x:91,z:-74}],radius:42,oxygen:45},{id:"reef-dive",islandId:"reef",name:"\u7409\u7483\u6D1E\u7063",partId:"crystal",partName:"\u71C8\u82AF\u6676\u77F3",discoveryId:"nautilus",entry:{x:0,z:27},target:{x:16,z:40},bubbles:[{x:8,z:33}],radius:42,oxygen:50}],Ki=[{siteId:"coral-dive",partId:"prism",mechanic:"observation",name:"\u68F2\u5730\u89C0\u5BDF",offsets:[[-28,18],[28,18],[28,-18]],labels:["\u6247\u73CA\u745A\u7684\u5E87\u8B77","\u72D0\u9B5A\u7684\u98DF\u7269","\u6D77\u8349\u7684\u80B2\u5E7C\u5834"]},{siteId:"reef-dive",partId:"crystal",mechanic:"valves",name:"\u6F6E\u6C50\u95A5\u9580",offsets:[[-28,-18],[28,-18],[28,18],[-28,18]],labels:["\u5165\u6C34\u95A5","\u5206\u6D41\u95A5","\u58D3\u529B\u95A5","\u71C8\u82AF\u95A5"]},{siteId:"ruin-dive",partId:"gear",mechanic:"guardian",name:"\u5B88\u9418\u6D0B\u6D41",offsets:[[-28,-18],[28,18],[-28,18],[28,-18]],labels:["\u897F\u5EAD\u661F\u76E4","\u6771\u5EAD\u661F\u76E4","\u56DE\u8072\u7891","\u5B88\u9418\u5C01\u5370"]}],Um=n=>Lt.every(e=>Math.hypot(n.x-e.x,n.z-e.z)>e.radius+9)&&gi.every(e=>Math.hypot(n.x-e.x,n.z-e.z)>e.radius+4)&&xi.every(e=>Math.hypot(n.x-e.x,n.z-e.z)>e.radius+6),Nm=(n,e)=>{for(let t=0;t<48;t++){let i=(t+(e===2?0:19))*Math.PI/24,r={...n,x:n.x+15*Math.cos(i),z:n.z+15*Math.sin(i)};if(Um(r))return Object.freeze(r)}throw Error("No safe survey position "+n.id)},Fm=[1,2,3].map(n=>Object.freeze({id:n,version:1,name:["\u6668\u5149\u6D77\u5716","\u8FD4\u6F6E\u6D77\u5716","\u661F\u6F6E\u6D77\u5716"][n-1],hazardPhase:n===3?Math.PI/2:0,observations:Object.freeze(so.filter((e,t)=>n===1||t%(n===2?5:4)!==(n===2?0:1)).map(e=>n===1?e:Nm(e,n))),stages:Object.freeze(Ki.map(e=>{let t=Zt.find(r=>r.id===e.siteId),i=e.offsets.map(([r,s],o)=>Object.freeze({id:e.siteId+"-"+o,name:e.labels[o],x:t.entry.x+r,z:t.entry.z+s}));return n===2&&([i[1],i[2]]=[i[2],i[1]]),Object.freeze({...e,stations:Object.freeze(i)})}))}));function hn(n=1){return Fm[((Math.trunc(Number(n)||1)-1)%3+3)%3]}function dn(n){return hn(n.voyage?.active&&n.voyage.variantId||n.seed)}function yn(n,e=n.activeDive){let t=dn(n).stages;for(let i=0;i<t.length;i++)if(t[i].siteId===e)return t[i]}function vi(n){let e=yn(n),t;for(let i=0;i<Zt.length;i++)Zt[i].id===n.activeDive&&(t=Zt[i]);if(e)for(let i=0;i<e.stations.length;i++){let r=e.stations[i];if(!n.diveTasks[t.id].completedStationIds.includes(r.id))return r}return t?.target}function Ri(n,e=1){return((n+hn(e).hazardPhase/Math.PI*3)%6+6)%6}function oo(n,e,t,i=1){let r=((n+(i===3?2:0))%8+8)%8;return t.x=e.entry.x+Math.sin(r/8*Math.PI*2)*23,t.z=e.entry.z,t.radius=6,t.warning=r>=6,t.active=r<6,t}var Rt=(n,e,t)=>Math.max(e,Math.min(t,n)),wt=(n,e)=>Math.hypot(n.x-e.x,n.z-e.z),td=Object.fromEntries(Lt.map(n=>[n.id,n])),nd=Object.fromEntries(mi.map(n=>[n.id,n])),id=Object.fromEntries(Zt.map(n=>[n.id,n])),_r=n=>Object.hasOwn(td,n)?td[n]:Lt[0],br=n=>Object.hasOwn(nd,n)?nd[n]:mi[0],Mr=n=>Object.hasOwn(id,n)?id[n]:void 0,Xe=(n,e,t={})=>({type:n,text:e,...t}),eu=[{label:"\u6F32\u6F6E\u30FB\u9AD8\u6C34\u4F4D",direction:"rising",waterLevel:"high",description:"\u5F9E\u4E2D\u6C34\u4F4D\u6301\u7E8C\u4E0A\u5347\uFF0C\u76F4\u5230\u6700\u9AD8\u6C34\u4F4D\u3002"},{label:"\u9000\u6F6E\u30FB\u9AD8\u6C34\u4F4D",direction:"falling",waterLevel:"high",description:"\u5F9E\u6700\u9AD8\u6C34\u4F4D\u6301\u7E8C\u4E0B\u964D\uFF0C\u76F4\u5230\u4E2D\u6C34\u4F4D\u3002"},{label:"\u9000\u6F6E\u30FB\u4F4E\u6C34\u4F4D",direction:"falling",waterLevel:"low",description:"\u5F9E\u4E2D\u6C34\u4F4D\u6301\u7E8C\u4E0B\u964D\uFF0C\u76F4\u5230\u6700\u4F4E\u6C34\u4F4D\u3002"},{label:"\u6F32\u6F6E\u30FB\u4F4E\u6C34\u4F4D",direction:"rising",waterLevel:"low",description:"\u5F9E\u6700\u4F4E\u6C34\u4F4D\u6301\u7E8C\u4E0A\u5347\uFF0C\u76F4\u5230\u4E2D\u6C34\u4F4D\u3002"}],rd="\u822A\u6D77\u5370\u8A18\u50C5\u4F9B\u6536\u85CF\u8207\u8A18\u9304\u6210\u5C31\uFF0C\u6C92\u6709\u8CFC\u8CB7\u7528\u9014\uFF1B\u6240\u6709\u5E06\u88DD\u8207\u4FEE\u5FA9\u7686\u514D\u8CBB\u3002",Mt=(n,e=0)=>Number.isFinite(n)?n:e,ld=n=>1+((Math.trunc(Mt(Number(n),1))-1)%16+16)%16,Ci=(n,e)=>n.includes(e)?!1:(n.push(e),!0);function co(n=1){let e=_r("harbor").dock;return{schemaVersion:1,seed:ld(n),time:0,elapsed:0,mode:"harbor",boat:{...e,heading:0,sail:0,hull:100,speed:0},rigId:"steady",contractId:"coral-survey",currentIsland:"harbor",lastSafeIsland:"harbor",discoveries:[],parts:[],completed:[],cargo:[],lighthouseFixed:!1,storyComplete:!1,storyStage:0,diveTasks:Object.fromEntries(Zt.map(t=>[t.id,{completedStationIds:[],opened:!1}])),supplyRemaining:900,supplyRefilledStages:[],difficulty:"standard",guardianCooldown:0,guardianWarnedCycle:-1,valveWarnedCycle:-1,oxygen:55,diver:{...e},activeDive:null,diveCollected:!1,credits:0,records:{bestTime:null,bestDamage:null,voyages:0,rescues:0,byContract:{},byVariant:{}},voyage:{variantId:hn(n).id,variantVersion:1,active:!1,startedAt:0,elapsed:0,damage:0,harvested:[],observed:[],skippedObservations:[],visited:[],rescued:!1,legIndex:-1,routeChoices:[],navigation:null},result:null,contactCooldown:0,warningCooldown:0,lowHullWarned:!1}}function lo(n,e){let t=(Mt(n)%240+240)%240;return e.height=Math.sin(t/240*Math.PI*2),e.index=Math.floor(t/(240/4)),e}var sd=[120,60,15],ao={x:0,z:0,radius:6,active:!1,warning:!1},tu={height:0,index:0},Om={x:0,z:0,dx:0,dz:0,strength:0};function Pi(n){let e=(Mt(n)%240+240)%240,t=240/4,i=Math.floor(e/t),r=t-e%t;return{height:Math.sin(e/240*Math.PI*2),...eu[i],nextLabel:eu[(i+1)%4].label,secondsToChange:r,forecastHorizon:r+t*2,forecast:[1,2].map(s=>({...eu[(i+s)%4],startsIn:r+t*(s-1),secondsUntil:r+t*(s-1),duration:t,height:Math.sin((i+s)*Math.PI/2)}))}}function ho(n,e,t,i=1){return Ca(n,e,t,i,{})}function Ca(n,e,t,i,r){let s=0,o=0,a=.88+ld(i)*.015;for(let l=0;l<ls.length;l++){let c=ls[l],u=Math.hypot(n-c.x,e-c.z);if(u>=c.radius)continue;let h=Math.sin(t/240*Math.PI*2+c.phase+hn(i).hazardPhase),d=(1-u/c.radius)*c.strength*h*a;s+=c.dx*d,o+=c.dz*d}for(let l=0;l<xi.length;l++){let c=xi[l];if(!cd(c,t,i))continue;let u=n-c.x,h=e-c.z,d=Math.hypot(u,h);if(d<.01||d>=c.radius)continue;let f=(1-d/c.radius)*c.strength;s+=(-h/d-u/d*.18)*f,o+=(u/d-h/d*.18)*f}return r.x=r.dx=s,r.z=r.dz=o,r.strength=Math.hypot(s,o),r}function cd(n,e,t=1){return Math.sin(e/240*Math.PI*2+n.phase+hn(t).hazardPhase)>.25}function Ii(n,e=n.contractId){let t=Ut.find(a=>a.id===e);if(!t)return{contractId:e,objectives:[],completedCount:0,total:0,readyToDeliver:!1,alreadyDelivered:!1,nextObjective:null};let i=n.voyage.observed||n.voyage.harvested||[],r=t.objectives.map(a=>({...a,islandName:_r(a.islandId).name,done:i.includes(a.discoveryId)})),s=r.filter(a=>a.done).length,o=r.find(a=>!a.done)||{kind:"return",islandId:"harbor",islandName:_r("harbor").name,name:"\u8FD4\u56DE\u6F6E\u97F3\u6E2F\u4EA4\u4ED8",done:!1};return{contractId:t.id,objectives:r,completedCount:s,total:r.length,readyToDeliver:s===r.length,alreadyDelivered:n.completed.includes(t.id),nextObjective:o}}function Sr(n){let e=n.voyage.navigation;return n.mode!=="sailing"||!e||e.legIndex!==n.voyage.legIndex||!e.waypoints[e.index]?null:{...e,target:e.waypoints[e.index],remaining:e.waypoints.length-e.index}}function zm(n,e,t){return e.directions[t].options.map(i=>{let r=n.boat,s=0,o=0,a=0;for(let u of i.waypoints){let h=wt(r,u),d=Math.atan2(u.x-r.x,-(u.z-r.z)),f=-Math.PI/4+(n.seed-1)*.035,m=.52+.48*(Math.cos(d-f)+1)/2,x=ho((r.x+u.x)/2,(r.z+u.z)/2,n.time,n.seed),g=x.x*Math.sin(d)-x.z*Math.cos(d);s+=h,a+=g*h,o+=h/Math.max(.5,br(n.rigId).speed*m+g),r=u}let l=s?a/s:0,c=Math.abs(l)<.04?"\u6B64\u6BB5\u6D41\u529B\u8F03\u5F31\uFF1B\u6BD4\u8F03\u8DDD\u96E2\u3001\u56FA\u5B9A\u98A8\u89D2\u8207\u96E2\u5CB8\u7A7A\u9593\u3002":`${l>0?"\u76EE\u524D\u5927\u81F4\u9806\u6D41":"\u76EE\u524D\u5927\u81F4\u9006\u6D41"}\uFF08\u6CBF\u822A\u8DEF\u7D04 ${Math.abs(l).toFixed(2)} m/s\uFF09\uFF1B\u6F6E\u76F8\u8B8A\u5316\u5F8C\u53D6\u6368\u6703\u6539\u8B8A\u3002`;return{...i,available:!0,condition:c,distanceMetres:Math.round(s),estimatedSeconds:Math.round(o),alongCurrent:l}})}var Bm=[...Lt.map(n=>({x:n.x,z:n.z,clearance:n.radius+7})),...gi.map(n=>({x:n.x,z:n.z,clearance:n.radius+1})),...xi.map(n=>({x:n.x,z:n.z,clearance:n.radius+1}))];function km(n,e){for(let t of e){let i=t.x-n.x,r=t.z-n.z,s=i*i+r*r;for(let o of Bm){let a=s?Rt(((o.x-n.x)*i+(o.z-n.z)*r)/s,0,1):0;if(Math.hypot(o.x-n.x-a*i,o.z-n.z-a*r)<o.clearance-1e-6)return!1}n=t}return!0}var Ra=n=>n&&Number.isFinite(n.x)&&Number.isFinite(n.z)&&Number.isFinite(n.radius)&&n.radius>0,iu=n=>Array.isArray(n)&&n.length>=2&&n.every(e=>e&&typeof e.id=="string"&&Array.isArray(e.waypoints)&&e.waypoints.length&&e.waypoints.every(t=>t&&Number.isFinite(t.x)&&Number.isFinite(t.z)));function Hm(n=ro){let e=[];for(let t of n)for(let[i,r]of Object.entries(t.directions)){let s=Object.hasOwn(io,i)&&io[i];if(!s||!r||!iu(r.options))continue;let o=[Ra(r.entry)?r.entry:t,...Array.isArray(r.entries)?r.entries.filter(Ra):[]];for(let a=0;a<o.length;a++){let l=o[a],c=typeof l.destinationIslandId=="string"?l.destinationIslandId:r.destinationIslandId,u=iu(l.options)?l.options:r.options;e.push({gate:t,entry:l,axis:s,direction:i,entryIndex:a,destination:Lt.find(h=>h.id===c),minForwardDot:Number.isFinite(r.minForwardDot)&&r.minForwardDot>=0&&r.minForwardDot<=1?r.minForwardDot:.2,resolved:{...t,x:l.x,z:l.z,radius:l.radius,axis:s,direction:i,entryIndex:a,directions:{...t.directions,[i]:{...r,destinationIslandId:c,options:u}}}})}}return e}var Vm=Hm(),Gm=Object.freeze([]);function Ia(n,e,t=Vm){let i=n.voyage.routeChoices||Gm,r=i?.at(-1),s=n.voyage.navigation;if(n.mode!=="sailing"||s&&s.legIndex===n.voyage.legIndex&&s.waypoints[s.index]&&r&&n.time-r.time<18)return null;let o=Math.sin(n.boat.heading),a=-Math.cos(n.boat.heading),l=null,c=1/0,u=!1;for(let h=0;h<t.length;h++){let d=t[h],f=d.entry,m=d.axis;if(o*m.x+a*m.z<d.minForwardDot)continue;let x=!1;for(let M=0;M<i.length;M++)if(i[M].id===d.gate.id&&i[M].legIndex===n.voyage.legIndex){x=!0;break}if(x)continue;let g=n.boat.x-f.x,p=n.boat.z-f.z,w=g*m.x+p*m.z,b=g*m.z-p*m.x;if(w>2)continue;let v=Number.isFinite(f.lateralRadius)&&f.lateralRadius>0?f.lateralRadius:f.radius,A=Math.hypot(w/f.radius,b/v)<=1,R=Math.hypot(g,p);if((Number.isFinite(e)&&e>0?R>e:!A)||R>=c||d.destination&&Number.isFinite(f.maxDestinationDistance)&&f.maxDestinationDistance>0&&wt(n.boat,d.destination.dock)>f.maxDestinationDistance)continue;let I=d.resolved.directions[d.direction].options,U=!0;for(let M=0;M<I.length;M++)if(!km(n.boat,I[M].waypoints)){U=!1;break}U&&(l=d,c=R,u=A)}return l?{...l.resolved,distance:c,withinEntry:u,options:zm(n,l.resolved,l.direction)}:null}function ud(n,e){if(typeof e!="string"||!Object.hasOwn(io,e)||!Object.hasOwn(n.directions,e))return[];let t=n.directions[e];return[Ra(t.entry)?t.entry:n,...Array.isArray(t.entries)?t.entries.filter(Ra):[]].map(i=>iu(i.options)?i.options:t.options)}function Wm(n){if(!n)return!1;let e=ro.find(r=>r.id===n.id);if(!e)return!1;let t=ud(e,n.direction),i=Object.hasOwn(n,"entryIndex")?n.entryIndex:0;return Number.isInteger(i)&&i>=0&&!!t[i]?.some(r=>r.id===n.optionId)}function Xm(n,e){if(!n||!Number.isInteger(n.legIndex)||n.legIndex!==e.legIndex||!Number.isInteger(n.index)||n.index<0)return null;let t=ro.find(c=>c.id===n.choiceId);if(!t)return null;let i=e.routeChoices.find(c=>c.id===t.id&&c.optionId===n.optionId&&c.legIndex===n.legIndex);if(!i)return null;let r=!Object.hasOwn(n,"direction")&&!Object.hasOwn(n,"entryIndex"),s=r?i.direction:n.direction;if(s!==i.direction)return null;let o=ud(t,s),a=n.entryIndex;if(r){let c=o.map((u,h)=>({option:u.find(d=>d.id===n.optionId),index:h})).filter(({option:u})=>u&&Array.isArray(n.waypoints)&&n.waypoints.length===u.waypoints.length&&n.waypoints.every((h,d)=>h&&Number.isFinite(h.x)&&Number.isFinite(h.z)&&h.x===u.waypoints[d].x&&h.z===u.waypoints[d].z));if(!c.length)return null;a=c[0].index}if(!Number.isInteger(a)||a<0||!r&&a!==i.entryIndex)return null;let l=o[a]?.find(c=>c.id===n.optionId);return!l||n.index>=l.waypoints.length?null:{choiceId:t.id,optionId:l.id,direction:s,entryIndex:a,label:l.label,waypoints:l.waypoints.map(c=>({x:c.x,z:c.z})),index:n.index,legIndex:n.legIndex}}function hd(n,e,t){let i=Ia(n);if(!i||i.id!==e)return[Xe("info","\u9760\u8FD1\u524D\u65B9\u5C0E\u822A\u9580\uFF0C\u518D\u6BD4\u8F03\u5169\u689D\u53EF\u884C\u652F\u8DEF\u3002")];let r=i.options.find(s=>s.id===t&&s.available);return r?(n.voyage.routeChoices||=[],n.voyage.routeChoices.push({id:i.id,choiceId:i.id,direction:i.direction,entryIndex:i.entryIndex??0,optionId:t,time:n.time,tideHeight:Pi(n.time).height,cargoCount:n.cargo.length,legIndex:n.voyage.legIndex}),n.voyage.navigation={choiceId:i.id,optionId:t,direction:i.direction,entryIndex:i.entryIndex??0,label:r.label,waypoints:r.waypoints.map(s=>({...s})),index:0,legIndex:n.voyage.legIndex},[Xe("route-choice",`\u5DF2\u9078${r.label}\u3002${r.condition} \u8ACB\u624B\u52D5\u99DB\u5411\u85CD\u8272\u822A\u8DEF\u9EDE\uFF1B\u96A8\u6642\u53EF\u53D6\u6D88\u5F15\u5C0E\u3002`,{choiceId:i.id,optionId:t})]):[Xe("info","\u8ACB\u9078\u64C7\u9019\u500B\u5C0E\u822A\u9580\u63D0\u4F9B\u7684\u822A\u8DEF\u3002")]}function dd(n){return n.voyage.navigation=null,[Xe("route-cancelled","\u5DF2\u53D6\u6D88\u8DEF\u9EDE\u5F15\u5C0E\uFF0C\u4FDD\u7559\u9019\u6B21\u9078\u8DEF\u7D00\u9304\uFF1B\u53EF\u624B\u52D5\u822A\u884C\u4E26\u5728\u4E0B\u4E00\u500B\u9580\u91CD\u65B0\u9078\u8DEF\u3002")]}function fd(n,e=45,{includeSkipped:t=!1}={}){if(n.mode!=="sailing")return null;let i=dn(n).observations,r=null,s=e*e;for(let o=0;o<i.length;o++){let a=i[o];if(n.voyage.harvested.includes(`observation:${a.id}`)||!t&&n.voyage.skippedObservations?.includes(a.id))continue;let l=a.x-n.boat.x,c=a.z-n.boat.z,u=l*l+c*c;u<=s&&(!r||u<s)&&(r=a,s=u)}return r?{...r,distance:Math.sqrt(s)}:null}function pd(n,e){let t=dn(n).observations.find(i=>i.id===e);return n.mode!=="sailing"||!t||wt(n.boat,t)>45||n.voyage.harvested.includes(`observation:${e}`)?[Xe("info","\u9760\u8FD1\u5C1A\u672A\u53D6\u6A23\u7684\u89C0\u6E2C\u6D6E\u6A19\uFF0C\u624D\u80FD\u9078\u64C7\u7E7C\u7E8C\u76F4\u822A\u3002")]:(n.voyage.skippedObservations||=[],Ci(n.voyage.skippedObservations,e),[Xe("observation-skipped",`\u5DF2\u8A18\u9304\u76F4\u822A\u9078\u64C7\uFF1A\u7565\u904E${t.name}\uFF0C\u4FDD\u7559\u6642\u9593\u8207\u8CA8\u8259\u3002\u7A0D\u5F8C\u4ECD\u53EF\u8FD4\u56DE\u53D6\u6A23\u3002`,{observationId:e})])}function ru(n,e=fd(n,9,{includeSkipped:!0})?.id){let t=dn(n).observations.find(r=>r.id===e);if(n.mode!=="sailing"||!t||wt(n.boat,t)>9)return[Xe("info","\u9032\u5165\u89C0\u6E2C\u6D6E\u6A19 9 \u516C\u5C3A\u5167\u4E26\u6536\u5E06\uFF0C\u6309 E \u53D6\u6A23\u3002")];let i=`observation:${e}`;return n.voyage.harvested.includes(i)?[Xe("info","\u9019\u5EA7\u6D6E\u6A19\u672C\u8D9F\u5DF2\u53D6\u6A23\uFF1B\u53EF\u7E7C\u7E8C\u76F4\u822A\u3002")]:n.boat.speed>1.4?[Xe("info","\u53D6\u6A23\u9700\u8981\u4F4E\u822A\u901F\uFF1A\u5148\u6309\u7A7A\u767D\u9375\u6536\u5E06\uFF0C\u518D\u6309 E\u3002")]:n.cargo.length>=br(n.rigId).capacity?[Xe("info","\u8CA8\u8259\u5DF2\u6EFF\uFF0C\u9019\u5EA7\u6D6E\u6A19\u5C1A\u672A\u6D88\u8017\uFF1B\u8FD4\u6E2F\u4EA4\u4ED8\u5F8C\u518D\u4F86\uFF0C\u6216\u7E7C\u7E8C\u76F4\u822A\u3002")]:(n.cargo.push(i),n.voyage.harvested.push(i),[Xe("observation",`\u5DF2\u53D6\u6A23${t.name}\u3002${t.note} \u666E\u901A\u8CA8\u7269 1 \u4EF6\uFF0C\u8FD4\u6E2F\u53EF\u5F97 3 \u822A\u6D77\u5370\u8A18\u3002`,{observationId:e})])}function su(n,e=n.contractId,t=n.rigId){if(!["harbor","island","result"].includes(n.mode))return[Xe("info","\u8ACB\u5148\u9760\u6E2F\uFF0C\u518D\u898F\u5283\u4E0B\u4E00\u6BB5\u822A\u7A0B\u3002")];n.currentIsland==="harbor"?(Ut.some(s=>s.id===e)&&(n.contractId=e),mi.some(s=>s.id===t)&&(n.rigId=t),n.boat.hull=100,n.lowHullWarned=!1,n.supplyRemaining=900,n.voyage={variantId:hn(n.seed).id,variantVersion:1,active:!0,startedAt:n.time,elapsed:0,damage:0,harvested:[],observed:[],skippedObservations:[],visited:["harbor"],rescued:!1,legIndex:0,routeChoices:[],navigation:null},n.elapsed=0):n.voyage.active||(n.voyage.active=!0),n.currentIsland!=="harbor"&&(n.voyage.legIndex=(n.voyage.legIndex??-1)+1),n.voyage.navigation=null;let i=_r(n.currentIsland||n.lastSafeIsland);n.boat.x=i.dock.x,n.boat.z=i.dock.z,n.boat.heading=Math.atan2(i.dock.x-i.x,-(i.dock.z-i.z));let r=Math.max(0,i.radius+8-wt(i,i.dock));return r>0&&(n.boat.x+=Math.sin(n.boat.heading)*r,n.boat.z-=Math.cos(n.boat.heading)*r),n.boat.sail=0,n.boat.speed=0,n.mode="sailing",n.currentIsland=null,n.activeDive=null,n.result=null,n.contactCooldown=0,[Xe("depart",`\u96E2\u958B${i.name}\u3002\u8239\u982D\u5DF2\u671D\u5916\u6D77\uFF0C\u5148\u6309 W \u76F4\u884C\u96E2\u5CB8\uFF0C\u518D\u8F49\u5411\u76EE\u7684\u5730\uFF1B\u9760\u6E2F\u524D\u6309\u7A7A\u767D\u9375\u6536\u5E06\u3002`)]}function ou(n,e){n.voyage.navigation=null,n.boat.x=e.dock.x,n.boat.z=e.dock.z,n.boat.speed=0,n.boat.sail=0,n.currentIsland=e.id,n.lastSafeIsland=e.id,n.activeDive=null,n.diver={...e.dock},n.oxygen=55}function od(n){if(n.mode==="diving")return[Xe("info","\u5148\u6309\u300C\u6D6E\u51FA\u56DE\u8239\u300D\uFF0C\u5C31\u80FD\u5B89\u5168\u9760\u6E2F\u3002")];let e=[...Lt].sort((c,u)=>wt(n.boat,c.dock)-wt(n.boat,u.dock))[0];if(wt(n.boat,e.dock)>13)return[Xe("info","\u9760\u8FD1\u91D1\u8272\u6CCA\u4F4D\u6A19\u8A18\uFF0C\u518D\u6309 E \u9760\u5CB8\u3002")];if(n.boat.speed>1.4)return[Xe("info","\u822A\u901F\u592A\u5FEB\uFF1A\u6309\u7A7A\u767D\u9375\u5FEB\u901F\u6536\u5E06\uFF0C\u518D\u6309 E \u9760\u5CB8\u3002")];ou(n,e),n.boat.hull=100,n.lowHullWarned=!1,Ci(n.voyage.visited,e.id),n.mode=e.id==="harbor"?"harbor":"island";let t=[Xe("dock",`\u5DF2\u9760\u5CB8${e.name}\uFF0C\u8239\u9AD4\u514D\u8CBB\u4FEE\u5FA9\u3002${e.id==="harbor"?"\u53EF\u91CD\u65B0\u9078\u64C7\u59D4\u8A17\u3001\u5E06\u88DD\u8207\u6F6E\u6C50\u3002":"\u6309 E \u8ABF\u67E5\uFF1B\u53EF\u518D\u51FA\u767C\u6216\u5C55\u958B\u6DFA\u6C34\u63A2\u7D22\u3002"}`,{islandId:e.id})];if(e.id!=="harbor"||!n.voyage.active)return t;let i=Ut.find(c=>c.id===n.contractId),r=i&&Ii(n).readyToDeliver&&!n.completed.includes(i.id);r&&(n.completed.push(i.id),n.credits+=i.reward,t.push(Xe("delivery",`\u59D4\u8A17\u5B8C\u6210\uFF1A${i.name}\uFF0C\u7372\u5F97 ${i.reward} \u822A\u6D77\u5370\u8A18\u3002${rd}`,{contractId:i.id,reward:i.reward})));let s=n.voyage.harvested.filter(c=>c.startsWith("observation:")).length,o=n.cargo.length*3;if(n.credits+=o,n.cargo=[],n.voyage.visited.some(c=>c!=="harbor")&&(n.records.voyages+=1,n.voyage.rescued||(n.records.bestTime=n.records.bestTime===null?n.voyage.elapsed:Math.min(n.records.bestTime,n.voyage.elapsed),n.records.bestDamage=n.records.bestDamage===null?n.voyage.damage:Math.min(n.records.bestDamage,n.voyage.damage))),i&&Ii(n).readyToDeliver&&!n.voyage.rescued){n.records.byContract||={};let c=n.records.byContract[i.id];n.records.byContract[i.id]={bestTime:c?Math.min(c.bestTime,n.voyage.elapsed):n.voyage.elapsed,bestDamage:c?Math.min(c.bestDamage,n.voyage.damage):n.voyage.damage,voyages:(c?.voyages||0)+1}}if(i&&Ii(n).readyToDeliver){let c=n.voyage.rescued?"bronze":n.voyage.damage>0?"silver":"gold";n.voyage.rank=c;let u=n.records.byVariant[i.id]||=Object.create(null),h=u[n.rigId]||=Object.create(null),d=n.voyage.variantId||1,f=h[d],m={bronze:1,silver:2,gold:3};h[d]={bestTime:Math.min(f?.bestTime??1/0,n.voyage.elapsed),bestDamage:Math.min(f?.bestDamage??1/0,n.voyage.damage),optionalSamples:Math.max(f?.optionalSamples||0,s),rank:f&&m[f.rank]>m[c]?f.rank:c}}let l=n.lighthouseFixed&&!n.storyComplete;return l&&(n.storyComplete=!0,t.push(Xe("ending","\u9060\u6F6E\u71C8\u5854\u91CD\u71C3\uFF0C\u6E2F\u53E3\u70BA\u4F60\u7684\u5B8C\u6574\u8FD4\u822A\u4EAE\u8D77\u6B61\u8FCE\u71C8\uFF01\u6545\u4E8B\u5B8C\u6210\uFF0C\u81EA\u7531\u822A\u7A0B\u5DF2\u958B\u653E\u3002"))),n.result={title:l?"\u71C8\u706B\u91CD\u9022\uFF0C\u6B61\u8FCE\u56DE\u5BB6":r?"\u59D4\u8A17\u5B8C\u6210":"\u5E73\u5B89\u8FD4\u822A",text:l?"\u4E09\u4EF6\u96F6\u4EF6\u91CD\u65B0\u9023\u8D77\u4E03\u5CF6\u3002\u7E7C\u7E8C\u81EA\u7531\u822A\u884C\uFF0C\u5B8C\u6210\u5168\u5716\u9451\u3001\u516D\u4EFD\u59D4\u8A17\uFF0C\u6311\u6230\u66F4\u5FEB\u4E14\u7121\u640D\u7684\u822A\u7DDA\u3002":r?`${i.name}\u5DF2\u4EA4\u4ED8\u3002\u4F60\u7684\u6D77\u5716\u4FDD\u5B58\u4E86\u9019\u6B21\u767C\u73FE\uFF1B\u53EF\u9078\u4E0B\u4E00\u4EFD\u59D4\u8A17\u6216\u91CD\u8D70\u822A\u7DDA\u6311\u6230\u7D00\u9304\u3002`:i&&!Ii(n).readyToDeliver?"\u672C\u8D9F\u59D4\u8A17\u672A\u5B8C\u6210\uFF1B\u4E0B\u8D9F\u9700\u91CD\u65B0\u5B8C\u6210\u8ABF\u67E5\u6E05\u55AE\uFF0C\u5716\u9451\u8207\u96F6\u4EF6\u4FDD\u7559\u3002\u6240\u6709\u4FEE\u5FA9\u514D\u8CBB\u3002":"\u672C\u8D9F\u5B8C\u6574\u8ABF\u67E5\u5DF2\u5B8C\u6210\uFF0C\u59D4\u8A17\u734E\u52F5\u4E0D\u91CD\u767C\uFF1B\u53EF\u6BD4\u8F03\u672C\u59D4\u8A17\u7D00\u9304\u3002\u5716\u9451\u8207\u4E3B\u7DDA\u96F6\u4EF6\u5DF2\u4FDD\u5B58\u3002",elapsed:n.voyage.elapsed,damage:n.voyage.damage,reward:(r?i.reward:0)+o,creditsDescription:rd,rank:n.voyage.rank||null,optionalSamples:s,discoveries:n.discoveries.length,parts:n.parts.length,rescued:n.voyage.rescued},n.mode="result",n.voyage.active=!1,t}function ad(n,e,t){let i=vn.find(s=>s.id===e);if(!i)return;n.voyage.observed||=[];let r=Ci(n.voyage.observed,e);Ci(n.discoveries,e)?t.push(Xe("discovery",`\u5716\u9451\u65B0\u589E\uFF1A${i.name}\u3002${i.description}`,{discoveryId:e})):r&&t.push(Xe("observation",`\u672C\u8D9F\u5DF2\u518D\u6B21\u8ABF\u67E5\uFF1A${i.name}\u3002${i.description}`,{discoveryId:e})),!n.voyage.harvested.includes(e)&&n.cargo.length<br(n.rigId).capacity?(Ci(n.cargo,e),Ci(n.voyage.harvested,e)):r&&n.cargo.length>=br(n.rigId).capacity&&t.push(Xe("info","\u8ABF\u67E5\u8207\u59D4\u8A17\u9032\u5EA6\u5DF2\u8A18\u9304\uFF1B\u8CA8\u8259\u5DF2\u6EFF\uFF0C\u9019\u6B21\u4E0D\u589E\u52A0\u666E\u901A\u8CA8\u7269\u3002\u4E3B\u7DDA\u96F6\u4EF6\u4ECD\u53EF\u53D6\u5F97\u3002"))}function au(n){if(n.mode==="sailing"){if(Lt.some(r=>wt(n.boat,r.dock)<=13))return od(n);let i=fd(n,9,{includeSkipped:!0});return i?ru(n,i.id):od(n)}if(n.mode==="diving"){let i=Mr(n.activeDive);if(!i)return Pa(n);let r=yn(n),s=n.diveTasks[i.id],o=vi(n);if(wt(n.diver,o)>4.5)return[Xe("info",`\u524D\u5F80${o.name||i.partName}\uFF0C4.5 \u516C\u5C3A\u5167\u6309 E\u3002\u6BCF\u7AD9\u88DC\u6EFF\u6C27\u6C23\uFF1B\u53EF\u96A8\u6642\u6D6E\u51FA\u3002`)];if(!s.opened)return r.mechanic==="valves"&&Ri(n.time,n.voyage.variantId)>=3?[Xe("info",`\u95A5\u9580\u95DC\u9589\uFF1A${(6-Ri(n.time,n.voyage.variantId)).toFixed(1)} \u79D2\u5F8C\u958B\u555F\u3002\u9752\u7DA0\u8272\u6642\u6309 E\u3002`)]:(Ci(s.completedStationIds,o.id),s.opened=s.completedStationIds.length===r.stations.length,n.oxygen=i.oxygen,[Xe("station",`\u2713 ${o.name} (${s.completedStationIds.length}/${r.stations.length}) \xB7 \u6C27\u6C23\u5DF2\u88DC\u6EFF\u3002${s.opened?"\u96F6\u4EF6\u5C01\u5370\u5DF2\u89E3\u958B\uFF0C\u524D\u5F80\u91D1\u8272\u7269\u4EF6\u3002":"\u6CBF\u767C\u5149\u5F15\u5C0E\u524D\u5F80\u4E0B\u4E00\u7AD9\u3002"}`)]);let a=[];return ad(n,i.discoveryId,a),Ci(n.parts,i.partId)&&(n.storyStage=Ki.filter(l=>n.parts.includes(l.partId)).length,Ci(n.supplyRefilledStages,i.id)&&(n.supplyRemaining=900),a.push(Xe("part",`\u53D6\u5F97\u71C8\u5854\u96F6\u4EF6\uFF1A${i.partName}\uFF08${n.parts.length}/3\uFF09\u3002\u4E3B\u7DDA\u96F6\u4EF6\u5728\u6551\u63F4\u8207\u91CD\u8F09\u5F8C\u90FD\u6703\u4FDD\u7559\u3002`,{partId:i.partId}))),n.diveCollected=!0,a.length||a.push(Xe("info","\u9019\u7247\u6DFA\u7063\u5DF2\u5B8C\u6210\u8ABF\u67E5\u3002\u53EF\u56DE\u5230\u8239\u65C1\uFF0C\u6216\u6309\u300C\u6D6E\u51FA\u56DE\u8239\u300D\u3002")),a}if(n.mode==="harbor"||n.mode==="result"&&n.currentIsland==="harbor")return[Xe("info","\u9078\u64C7\u59D4\u8A17\u8207\u5E06\u88DD\uFF0C\u518D\u6309\u300C\u63DA\u5E06\u51FA\u6E2F\u300D\u3002\u5148\u770B\u6D77\u5716\u8207\u672A\u4F86\u5169\u6BB5\u6F6E\u6C50\u3002")];if(n.mode!=="island")return[];let e=_r(n.currentIsland),t=[];for(let i of e.discoveries)vn.find(r=>r.id===i)?.diveSiteId||ad(n,i,t);return e.id==="lighthouse"&&(n.parts.length===Zt.length&&!n.lighthouseFixed?(n.lighthouseFixed=!0,t.push(Xe("lighthouse","\u4E09\u4EF6\u96F6\u4EF6\u5D4C\u5165\u71C8\u5854\uFF0C\u5149\u675F\u91CD\u8FD4\u6D77\u9762\uFF01\u6700\u5F8C\u4E00\u6B65\uFF1A\u99DB\u56DE\u6F6E\u97F3\u6E2F\u5B8C\u6210\u8FD4\u822A\u6176\u795D\u3002"))):n.lighthouseFixed||t.push(Xe("info",`\u71C8\u5854\u9084\u9700\u8981 ${3-n.parts.length} \u4EF6\u96F6\u4EF6\u3002\u73CA\u745A\u7063\u3001\u661F\u76E4\u5CF6\u8207\u7409\u7483\u7901\u7684\u6DFA\u7063\u5404\u85CF\u6709\u4E00\u4EF6\u3002`))),t.length||t.push(Xe("info",`${e.name}\u7684\u5CB8\u4E0A\u8ABF\u67E5\u5DF2\u5B8C\u6210\u3002${e.diveSiteId?"\u9019\u88E1\u9084\u6709\u6DFA\u6C34\u63A2\u7D22\u9EDE\u3002":"\u53EF\u4EE5\u524D\u5F80\u4E0B\u4E00\u5EA7\u5CF6\uFF0C\u6216\u56DE\u6BCD\u6E2F\u4EA4\u4ED8\u3002"}`)),t}function md(n,e){let t=Mr(e);if(n.mode!=="island"||!t||t.islandId!==n.currentIsland)return[Xe("info","\u8ACB\u5148\u9760\u5CB8\u5230\u8A72\u6DFA\u6C34\u9EDE\u6240\u5728\u5CF6\u5DBC\u3002")];let i=Ki.findIndex(r=>r.siteId===t.id);return i>0&&!n.parts.includes(Ki[i-1].partId)&&!n.parts.includes(t.partId)?[Xe("info",`\u5148\u5B8C\u6210${Mr(Ki[i-1].siteId).name}\u53D6\u5F97\u96F6\u4EF6\uFF0C\u518D\u6311\u6230${t.name}\u3002`)]:(n.guardianCooldown=yn(n,t.id).mechanic==="guardian"?2:0,n.guardianWarnedCycle=-1,n.valveWarnedCycle=-1,n.activeDive=t.id,n.mode="diving",n.oxygen=t.oxygen,n.diver={...t.entry},n.diveCollected=n.parts.includes(t.partId),[Xe("dive",`${t.name}\uFF1A${yn(n).name}\u3002\u4F9D\u5E8F\u5230\u767C\u5149\u7AD9\u6309 E\uFF0C\u6BCF\u7AD9\u88DC\u6EFF ${t.oxygen} \u79D2\u6C27\u6C23\u3002\u6700\u5F8C\u53D6\u5F97\u96F6\u4EF6\uFF1B\u96A8\u6642\u53EF\u6D6E\u51FA\u56DE\u8239\u3002${yn(n).mechanic==="guardian"?"\u5165\u6C34\u6709 2 \u79D2\u7DE9\u885D\uFF0C\u53EF\u5148\u96E2\u958B\u6D0B\u6D41\u5708\u3002":""}`)])}function Pa(n){if(n.mode!=="diving")return[];let e=Mr(n.activeDive);return n.mode="island",n.voyage.navigation=null,n.currentIsland=e?.islandId||n.lastSafeIsland,n.activeDive=null,n.oxygen=55,n.diver={x:n.boat.x,z:n.boat.z},[Xe("surface","\u5DF2\u5B89\u5168\u56DE\u8239\u3002\u5716\u9451\u8207\u96F6\u4EF6\u5DF2\u4FDD\u5B58\uFF1B\u53EF\u91CD\u65B0\u6F5B\u6C34\u6216\u7E7C\u7E8C\u822A\u884C\u3002")]}function uo(n,e="\u8239\u9AD4\u53D7\u640D"){let t=n.mode==="diving"?n.diver:n.boat,i=e==="\u9060\u822A\u88DC\u7D66\u8017\u76E1"?_r("harbor"):[...Lt].sort((s,o)=>wt(t,s.dock)-wt(t,o.dock))[0],r=Math.ceil(n.cargo.length/2);return n.cargo=n.cargo.slice(r),ou(n,i),n.boat.hull=100,n.lowHullWarned=!1,n.voyage.rescued=!0,n.records.rescues+=1,n.supplyRemaining<=0&&(n.supplyRemaining=900),n.mode=i.id==="harbor"?"harbor":"island",n.result=null,n.contactCooldown=2,[Xe("rescue",`${e}\uFF0C\u6551\u63F4\u8239\u5DF2\u9001\u4F60\u56DE${i.name}\u3002\u666E\u901A\u8CA8\u7269\u640D\u5931 ${r} \u4EF6\uFF1B\u5716\u9451\u3001\u96F6\u4EF6\u8207\u5DF2\u4EA4\u4ED8\u734E\u52F5\u5168\u90E8\u4FDD\u7559\u3002\u8239\u5DF2\u514D\u8CBB\u4FEE\u5FA9\uFF0C\u53EF\u4EE5\u7ACB\u5373\u518D\u51FA\u767C\u3002`,{islandId:i.id,lost:r})]}function nu(n,e,t,i){if(n.contactCooldown>0)return;let r=Math.min(n.boat.hull,e);if(n.boat.hull-=r,n.voyage.damage+=r,n.contactCooldown=1.2,i.push(Xe("damage",t)),n.boat.hull<=0)i.push(...uo(n,"\u8239\u9AD4\u5931\u53BB\u6D6E\u529B"));else if(n.boat.hull<25&&!n.lowHullWarned){n.lowHullWarned=!0;let s=[...Lt].sort((o,a)=>wt(n.boat,o.dock)-wt(n.boat,a.dock))[0];i.push(Xe("warning",`\u8239\u9AD4\u4F4E\u65BC 25%\uFF01\u6700\u8FD1\u5B89\u5168\u6E2F\u662F${s.name}\uFF0C\u9760\u5CB8\u5373\u53EF\u514D\u8CBB\u4FEE\u5FA9\u3002`))}}function $m(){let n=null,e=null,t=null,i=!1,r=!1,s=0,o=0;function a(){e=null,t=null}function l(x,g,p){if(i||!g||n===null||e===null||t!==p||!Number.isFinite(x)||x<n){a();return}e=x}let c={raw:NaN,dt:0};function u(x,g){return c.raw=x,c.dt=g,c}function h(x,g,p){let w=n,b=w===null?NaN:(x-w)/1e3;if(!Number.isFinite(x))return n=null,a(),u(NaN,0);if(n=x,i||!g)return a(),u(b,0);if(w===null||!Number.isFinite(b)||b<=0||b>.5||e===null||t!==p)return e=x,t=p,u(b,0);if(x<e)return u(b,0);let v=(x-e)/1e3;return e=x,t=p,u(b,Number.isFinite(v)&&v>=0&&v<=b?Math.min(.4,v):0)}function d(){if(r)throw Error("clock-reentrant");r=!0,s=0,o=0}function f(x){if(r){if(!Number.isFinite(x)||x<0||x>.05||o>=8||s+x>.400000000000001)throw Error("clock-budget");s+=x,o++}}function m(){if(!r)throw Error("clock-collector");return r=!1,s}return Object.freeze({reset:a,input:l,frame:h,begin:d,consume:f,end:m,dispose(){i=!0,a()},isDisposed:()=>i})}var kn=$m();function gd(n,e,t={},i){let r=n.mode,s=i||[];s.length=0;let o=Rt(Mt(e),0,30);if(o===0)return s;let a=Math.ceil(o/.05),l=o/a,c=lo(n.time,tu).index,u=Math.floor((n.time+30)/(240/4));for(let h=0;h<a&&!(n.mode!==r||n.mode!=="sailing"&&n.mode!=="diving");h+=1){if(kn.consume(l),n.time+=l,n.contactCooldown=Math.max(0,n.contactCooldown-l),n.warningCooldown=Math.max(0,n.warningCooldown-l),n.voyage.active&&(n.voyage.elapsed+=l,n.elapsed=n.voyage.elapsed),n.difficulty!=="relaxed"&&!n.storyComplete){let v=n.supplyRemaining;n.supplyRemaining=Math.max(0,v-l);for(let A=0;A<sd.length;A++){let R=sd[A];v>R&&n.supplyRemaining<=R&&s.push(Xe("warning",`\u9060\u822A\u88DC\u7D66\u5269 ${R} \u79D2\u3002\u5B8C\u6210\u65B0\u6F5B\u9EDE\u88DC\u6EFF\uFF0C\u6216\u8FD4\u56DE\u6BCD\u6E2F\u3002`))}if(n.supplyRemaining===0){s.push(...uo(n,"\u9060\u822A\u88DC\u7D66\u8017\u76E1"));break}}if(n.mode==="diving"){let v=Mr(n.activeDive);if(!v){s.push(...Pa(n));continue}let A=Rt(Mt(t.diveX),-1,1),R=Rt(Mt(t.diveZ),-1,1),I=Math.hypot(A,R);I>1&&(A/=I,R/=I),n.diver.x+=A*l*2,n.diver.z+=R*l*2;let U=wt(n.diver,v.entry);U>v.radius&&(n.diver.x=v.entry.x+(n.diver.x-v.entry.x)/U*v.radius,n.diver.z=v.entry.z+(n.diver.z-v.entry.z)/U*v.radius),n.oxygen-=l,n.guardianCooldown=Math.max(0,n.guardianCooldown-l);let M=yn(n);if(M.mechanic==="valves"){let L=Ri(n.time,n.voyage.variantId),B=Math.floor(n.time/6);Math.abs(n.diver.x-(v.entry.x+Math.sin(n.time*.35)*5))<3&&Math.abs(n.diver.z-v.entry.z)<12&&(n.diver.x+=Math.sin(n.time*.35)*.35*l),L>=4&&n.valveWarnedCycle!==B&&(n.valveWarnedCycle=B,s.push(Xe("valve-warning","\u6F6E\u6C50\u95A5\u9580\u5C07\u65BC 2 \u79D2\u5167\u958B\u555F\u3002\u9752\u7DA0\u6642\u6309 E\u3002")))}if(M.mechanic==="guardian"){oo(n.time,v,ao,n.voyage.variantId);let L=Math.floor((n.time+(n.voyage.variantId===3?2:0))/8);ao.warning&&n.guardianWarnedCycle!==L&&(n.guardianWarnedCycle=L,s.push(Xe("valve-warning","\u5B88\u9418\u6D0B\u6D41\uFF1A2 \u79D2\u9810\u8B66\u3002\u6CBF\u5713\u5708\u5916\u5074\u901A\u904E\u3002"))),ao.active&&wt(n.diver,ao)<ao.radius&&n.guardianCooldown===0&&(n.oxygen-=Math.min(4,n.oxygen),n.guardianCooldown=2,s.push(Xe("warning","\u5B88\u9418\u6D0B\u6D41\u6383\u904E\uFF1A\u6C27\u6C23 -4 \u79D2\u3002\u7E5E\u958B\u6709\u8272\u5713\u5708\uFF0C\u7425\u73C0\u8272\u63D0\u793A\u4E0B\u6B21\u6A6B\u6383\u3002")))}let S=!1;for(let L=0;L<v.bubbles.length;L++)wt(n.diver,v.bubbles[L])<3.5&&(S=!0);S&&(n.oxygen=Math.min(v.oxygen,n.oxygen+l*7),n.warningCooldown===0&&(s.push(Xe("bubble","\u6C23\u6CE1\u6B63\u5728\u88DC\u5145\u6C27\u6C23\u3002")),n.warningCooldown=5)),n.oxygen<12&&n.warningCooldown===0&&(s.push(Xe("warning","\u6C27\u6C23\u4E0D\u8DB3\uFF1A\u9760\u8FD1\u6C23\u6CE1\u6216\u7ACB\u5373\u6309\u300C\u6D6E\u51FA\u56DE\u8239\u300D\u3002")),n.warningCooldown=8),n.oxygen<=0&&s.push(...uo(n,"\u6F5B\u6C34\u6C27\u6C23\u8017\u76E1"));continue}if(n.mode!=="sailing")continue;let d=n.boat,f=br(n.rigId);d.sail=t.brake?Math.max(0,d.sail-l*4):Rt(d.sail+Mt(t.sailDelta)*l*.65,0,1),d.heading+=Rt(Mt(t.turn),-1,1)*f.handling*l*(.45+.55*Math.min(1,d.speed/f.speed)),d.heading=Math.atan2(Math.sin(d.heading),Math.cos(d.heading));let m=-Math.PI/4+(n.seed-1)*.035,x=.52+.48*(Math.cos(d.heading-m)+1)/2,g=f.speed*d.sail*x;d.speed+=(g-d.speed)*Math.min(1,l*(t.brake?5:1.35));let p=Ca(d.x,d.z,n.time,n.voyage.variantId||n.seed,Om);d.x+=(Math.sin(d.heading)*d.speed+p.x)*l,d.z+=(-Math.cos(d.heading)*d.speed+p.z)*l;for(let v=0;v<Lt.length;v++){let A=Lt[v],R=wt(d,A),I=A.radius+7;if(R>=I)continue;let U=R>.001?(d.x-A.x)/R:0,M=R>.001?(d.z-A.z)/R:-1;if(d.x=A.x+U*I,d.z=A.z+M*I,d.speed*=.35,nu(n,8,`\u64E6\u78B0${A.name}\u5CB8\u7DDA\uFF0C\u8239\u9AD4\u53D7\u640D\u3002\u6CBF\u5CB8\u5916\u5074\u99DB\u5411\u91D1\u8272\u6CCA\u4F4D\u3002`,s),n.mode!=="sailing")break}if(n.mode!=="sailing")continue;let w=lo(n.time,tu);for(let v=0;v<gi.length;v++){let A=gi[v];w.height>A.safeHeight||wt(d,A)>=A.radius+1||(d.speed*=Math.max(.5,1-l*2),nu(n,7,`${A.name}\u6C34\u4F4D\u4E0D\u8DB3\uFF0C\u64E6\u7901\u53D7\u640D\u3002\u7E5E\u958B\u7D05\u8272\u7901\u5708\u6216\u7B49\u5F85\u6F32\u6F6E\u3002`,s))}for(let v=0;v<xi.length;v++){let A=xi[v];cd(A,n.time,n.voyage.variantId||n.seed)&&wt(d,A)<A.radius*.45&&nu(n,5,`${A.name}\u6B63\u6D3B\u8E8D\uFF0C\u5411\u5916\u5708\u8F49\u8235\u812B\u96E2\u3002`,s)}(Math.abs(d.x)>255||Math.abs(d.z)>255)&&(d.x=Rt(d.x,-255,255),d.z=Rt(d.z,-255,255),d.speed*=.8,n.warningCooldown===0&&(s.push(Xe("warning","\u5DF2\u5230\u6D77\u5716\u908A\u754C\uFF0C\u8ACB\u8F49\u8235\u56DE\u5230\u4E03\u5CF6\u6D77\u57DF\u3002")),n.warningCooldown=5));let b=n.voyage.navigation;if(b&&b.legIndex===n.voyage.legIndex){for(;b.waypoints[b.index]&&wt(d,b.waypoints[b.index])<=8;)b.index+=1;b.index===b.waypoints.length&&(n.voyage.navigation=null,s.push(Xe("route-arrival","\u5DF2\u901A\u904E\u6240\u9078\u652F\u8DEF\uFF1B\u53EF\u4EE5\u7E7C\u7E8C\u99DB\u5411\u76EE\u7684\u5CF6\uFF0C\u6216\u5728\u4E0B\u4E00\u500B\u5C0E\u822A\u9580\u6BD4\u8F03\u8DEF\u6CC1\u3002")))}}if(lo(n.time,tu).index!==c&&s.push(Xe("tide",`\u6F6E\u6C50\u8F49\u70BA${Pi(n.time).label}\u3002\u6D77\u5716\u4E0A\u7684\u6F6E\u6D41\u3001\u6DFA\u7901\u8207\u65CB\u6D41\u5DF2\u540C\u6B65\u66F4\u65B0\u3002`)),Math.floor((n.time+30)/(240/4))>u){let h=Pi(n.time);s.push(Xe("tide-forecast",`\u6F6E\u6C50\u9810\u5831\uFF1A\u7D04 ${Math.ceil(h.secondsToChange)} \u79D2\u5F8C\u8F49\u70BA${h.nextLabel}\u3002${h.forecast[0].description}`,{startsIn:h.secondsToChange,nextLabel:h.nextLabel}))}return s}function xd(n){return!["harbor","result"].includes(n.mode)||n.currentIsland!=="harbor"?[Xe("info","\u53EA\u6709\u6F6E\u97F3\u6E2F\u53EF\u4EE5\u5B89\u5168\u7B49\u5F85\u4E0B\u4E00\u6F6E\u3002")]:(n.time+=Pi(n.time).secondsToChange+.001,[Xe("tide",`\u5DF2\u4F11\u606F\u81F3${Pi(n.time).label}\uFF0C\u8239\u9AD4\u8207\u6C27\u6C23\u4E0D\u53D7\u5F71\u97FF\u3002`)])}function lu(n){return JSON.stringify({...n,schemaVersion:1,savedAtSafeIsland:n.lastSafeIsland})}var yi=(n,e)=>[...new Set(Array.isArray(n)?n.filter(t=>e.includes(t)):[])];function vd(n){let e=u=>({state:co(),message:u});if(n==null||n==="")return e("\u65B0\u822A\u7A0B\u6E96\u5099\u597D\u4E86\u3002\u9078\u64C7\u7B2C\u4E00\u4EFD\u59D4\u8A17\uFF0C\u5F9E\u6F6E\u97F3\u6E2F\u958B\u59CB\u3002");let t;try{t=typeof n=="string"?JSON.parse(n):n}catch{return e("\u5B58\u6A94\u683C\u5F0F\u640D\u58DE\uFF0C\u5DF2\u5B89\u5168\u5EFA\u7ACB\u65B0\u822A\u7A0B\u3002")}if(!t||typeof t!="object"||Array.isArray(t)||t.schemaVersion!==1)return e("\u5B58\u6A94\u7248\u672C\u4E0D\u76F8\u5BB9\uFF0C\u5DF2\u5B89\u5168\u5EFA\u7ACB\u65B0\u822A\u7A0B\u3002");if(!Number.isFinite(t.time)||!Number.isFinite(t.seed)||t.time<0)return e("\u5B58\u6A94\u6642\u9593\u6216\u6D77\u6D41\u7A2E\u5B50\u7121\u6548\uFF0C\u5DF2\u5B89\u5168\u5EFA\u7ACB\u65B0\u822A\u7A0B\u3002");let i=co(t.seed);i.time=t.time,i.discoveries=yi(t.discoveries,vn.map(u=>u.id)),i.parts=yi(t.parts,Zt.map(u=>u.partId)),i.guardianCooldown=Rt(Mt(t.guardianCooldown),0,2),i.valveWarnedCycle=Math.floor(Mt(t.valveWarnedCycle,-1)),i.difficulty=t.difficulty==="relaxed"?"relaxed":"standard",i.supplyRemaining=Rt(Mt(t.supplyRemaining,900),0,900),i.supplyRefilledStages=yi(t.supplyRefilledStages,Zt.map(u=>u.id)),i.storyStage=Ki.filter(u=>i.parts.includes(u.partId)).length;for(let u of Zt){let h=hn(t.voyage?.variantId||t.seed).stages.find(m=>m.siteId===u.id),d=i.diveTasks[u.id],f=i.parts.includes(u.partId);d.completedStationIds=f?h.stations.map(m=>m.id):yi(t.diveTasks?.[u.id]?.completedStationIds,h.stations.map(m=>m.id)),d.opened=f||d.completedStationIds.length===h.stations.length}i.completed=yi(t.completed,Ut.map(u=>u.id)),i.rigId=br(t.rigId).id,i.contractId=Ut.some(u=>u.id===t.contractId)?t.contractId:Ut[0].id;let r=[...vn.map(u=>u.id),...so.map(u=>`observation:${u.id}`)];i.cargo=yi(t.cargo,r).slice(0,br(i.rigId).capacity),i.lighthouseFixed=t.lighthouseFixed===!0&&i.parts.length===3,i.storyComplete=t.storyComplete===!0&&i.lighthouseFixed,i.credits=Rt(Mt(t.credits),0,1e9);for(let u of["bestTime","bestDamage"])i.records[u]=Number.isFinite(t.records?.[u])&&t.records[u]>=0?t.records[u]:null;for(let u of["voyages","rescues"])i.records[u]=Math.floor(Rt(Mt(t.records?.[u]),0,1e6));i.records.byContract={};for(let u of Ut){let h=t.records?.byContract?.[u.id];h&&Number.isFinite(h.bestTime)&&h.bestTime>=0&&Number.isFinite(h.bestDamage)&&h.bestDamage>=0&&(i.records.byContract[u.id]={bestTime:h.bestTime,bestDamage:h.bestDamage,voyages:Math.floor(Rt(Mt(h.voyages),0,1e6))})}for(let u of Ut)for(let h of mi)for(let d of[1,2,3]){let f=t.records?.byVariant?.[u.id]?.[h.id]?.[d];if(f&&Number.isFinite(f.bestTime)&&f.bestTime>=0&&Number.isFinite(f.bestDamage)&&f.bestDamage>=0&&["gold","silver","bronze"].includes(f.rank)){let m=i.records.byVariant[u.id]||={},x=m[h.id]||={};x[d]={bestTime:f.bestTime,bestDamage:Rt(f.bestDamage,0,1e9),optionalSamples:Math.floor(Rt(Mt(f.optionalSamples),0,16)),rank:f.rank}}}let s=t.voyage||{};i.voyage={variantId:hn(s.variantId||i.seed).id,variantVersion:1,rank:["gold","silver","bronze"].includes(s.rank)?s.rank:null,active:s.active===!0,startedAt:Math.max(0,Mt(s.startedAt)),elapsed:Math.max(0,Mt(s.elapsed)),damage:Math.max(0,Mt(s.damage)),harvested:yi(s.harvested,r),observed:yi(s.observed??s.harvested,vn.map(u=>u.id)),skippedObservations:yi(s.skippedObservations,so.map(u=>u.id)),legIndex:Math.floor(Math.max(0,Mt(s.legIndex))),routeChoices:(Array.isArray(s.routeChoices)?s.routeChoices:[]).filter(Wm).slice(-100).map(u=>({id:u.id,choiceId:u.id,direction:u.direction,entryIndex:u.entryIndex??0,optionId:u.optionId,time:Math.max(0,Mt(u.time)),tideHeight:Rt(Mt(u.tideHeight),-1,1),cargoCount:Math.floor(Rt(Mt(u.cargoCount),0,14)),legIndex:Math.floor(Math.max(0,Mt(u.legIndex)))})),navigation:null,visited:yi(s.visited,Lt.map(u=>u.id)),rescued:s.rescued===!0};let o=Xm(s.navigation,i.voyage);if(o&&!Object.hasOwn(s.navigation,"direction")&&!Object.hasOwn(s.navigation,"entryIndex")){let u=i.voyage.routeChoices.find(h=>h.id===o.choiceId&&h.direction===o.direction&&h.optionId===o.optionId&&h.legIndex===o.legIndex);u.entryIndex=o.entryIndex}i.elapsed=i.voyage.elapsed;let a=_r(t.lastSafeIsland);ou(i,a),i.mode=a.id==="harbor"?"harbor":"island";let l=u=>u&&Number.isFinite(u.x)&&Number.isFinite(u.z)&&Math.abs(u.x)<=260&&Math.abs(u.z)<=260,c=t.mode==="sailing"||t.mode==="diving";if(c&&l(t.boat)&&Number.isFinite(t.boat.heading)&&Number.isFinite(t.boat.hull)&&t.boat.hull>0&&Lt.every(u=>wt(t.boat,u)>=u.radius+6)){if(i.boat={x:t.boat.x,z:t.boat.z,heading:t.boat.heading%(Math.PI*2),sail:Rt(Mt(t.boat.sail),0,1),hull:Rt(t.boat.hull,1,100),speed:Rt(Mt(t.boat.speed),0,10)},i.mode="sailing",i.currentIsland=null,t.mode==="diving"){let u=Mr(t.activeDive);u&&u.islandId===a.id&&l(t.diver)&&wt(t.diver,u.entry)<=u.radius&&Mt(t.oxygen)>0&&(i.mode="diving",i.currentIsland=a.id,i.activeDive=u.id,i.diver={x:t.diver.x,z:t.diver.z},i.oxygen=Rt(t.oxygen,.1,u.oxygen),i.diveCollected=t.diveCollected===!0)}return i.mode==="sailing"&&(i.voyage.navigation=o),{state:i,message:"\u5DF2\u6062\u5FA9\u822A\u7A0B\u3002\u8239\u4F4D\u3001\u8ABF\u67E5\u8207\u8CA8\u7269\u5B8C\u6574\u4FDD\u7559\uFF1B\u96E2\u7DDA\u4E0D\u6D88\u8017\u6F6E\u6C50\u6216\u6C27\u6C23\u3002"}}if(t.mode==="diving"){let u=Mr(t.activeDive);if(u&&u.islandId===a.id&&l(t.diver)&&wt(t.diver,u.entry)<=u.radius&&Mt(t.oxygen)>0)return i.mode="diving",i.activeDive=u.id,i.diver={x:t.diver.x,z:t.diver.z},i.oxygen=Rt(t.oxygen,.1,u.oxygen),i.diveCollected=t.diveCollected===!0,{state:i,message:"\u5DF2\u6062\u5FA9\u6DFA\u6C34\u63A2\u7D22\uFF0C\u96E2\u7DDA\u4E0D\u6263\u6C27\u6C23\u3002"}}return c?{state:i,message:`\u5DF2\u5B89\u5168\u56DE\u5230${a.name}\u3002\u7121\u6548\u8239\u4F4D\u5DF2\u4FEE\u5FA9\uFF0C\u8CA8\u7269\u8207\u4E3B\u7DDA\u9032\u5EA6\u4FDD\u7559\u3002`}:{state:i,message:`\u5DF2\u6062\u5FA9${a.name}\u7684\u9760\u6E2F\u7D00\u9304\u3002\u6F6E\u6C50\u3001\u5716\u9451\u3001\u96F6\u4EF6\u8207\u734E\u52F5\u4FDD\u6301\u4E0D\u8B8A\uFF1B\u8239\u5DF2\u514D\u8CBB\u4FEE\u5FA9\u3002`}}var tf=0,qu=1,nf=2;var Yu=1,Dl=2,wi=3,Vn=0,mn=1,Xn=2,Vi=0,Dr=1,Zu=2,Ju=3,Ku=4,rf=5,or=100,sf=101,of=102,af=103,lf=104,cf=200,uf=201,hf=202,df=203,rl=204,sl=205,ff=206,pf=207,mf=208,gf=209,xf=210,vf=211,yf=212,_f=213,bf=214,Ll=0,Ul=1,Nl=2,Lr=3,Fl=4,Ol=5,zl=6,Bl=7,kl=0,Mf=1,Sf=2,ai=0,Ef=1,wf=2,Tf=3,ca=4,Af=5,Rf=6,Cf=7,zu="attached",If="detached",ju=300,Wr=301,Xr=302,Hl=303,Vl=304,ua=306,ol=1e3,sr=1001,al=1002,_n=1003,Pf=1004;var ha=1005;var ii=1006,Gl=1007;var cr=1008;var li=1009,Qu=1010,eh=1011,ks=1012,Wl=1013,ur=1014,$n=1015,Hs=1016,Xl=1017,$l=1018,Vs=1020,th=35902,nh=35899,ih=1021,rh=1022,Nn=1023,Es=1026,Gs=1027,ql=1028,Yl=1029,sh=1030,Zl=1031;var Jl=1033,da=33776,fa=33777,pa=33778,ma=33779,Kl=35840,jl=35841,Ql=35842,ec=35843,tc=36196,nc=37492,ic=37496,rc=37808,sc=37809,oc=37810,ac=37811,lc=37812,cc=37813,uc=37814,hc=37815,dc=37816,fc=37817,pc=37818,mc=37819,gc=37820,xc=37821,vc=36492,yc=36494,_c=36495,bc=36283,Mc=36284,Sc=36285,Ec=36286,Df=2200,Lf=2201,Uf=2202,To=2300,ll=2301,il=2302,Cr=2400,Ir=2401,Ao=2402,wc=2500,Nf=2501;var Ff=3200,Of=3201;var Tc=0,zf=1,Gi="",pn="srgb",Ur="srgb-linear",Ro="linear",yt="srgb";var Rr=7680;var Bu=519,Bf=512,kf=513,Hf=514,oh=515,Vf=516,Gf=517,Wf=518,Xf=519,ku=35044,ah=35048;var lh="300 es",ni=2e3,Co=2001;var bi=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){let i=this._listeners;return i===void 0?!1:i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){let i=this._listeners;if(i===void 0)return;let r=i[e];if(r!==void 0){let s=r.indexOf(t);s!==-1&&r.splice(s,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let i=t[e.type];if(i!==void 0){e.target=this;let r=i.slice(0);for(let s=0,o=r.length;s<o;s++)r[s].call(this,e);e.target=null}}},an=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],yd=1234567,Mo=Math.PI/180,ws=180/Math.PI;function Wi(){let n=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(an[n&255]+an[n>>8&255]+an[n>>16&255]+an[n>>24&255]+"-"+an[e&255]+an[e>>8&255]+"-"+an[e>>16&15|64]+an[e>>24&255]+"-"+an[t&63|128]+an[t>>8&255]+"-"+an[t>>16&255]+an[t>>24&255]+an[i&255]+an[i>>8&255]+an[i>>16&255]+an[i>>24&255]).toLowerCase()}function st(n,e,t){return Math.max(e,Math.min(t,n))}function ch(n,e){return(n%e+e)%e}function qm(n,e,t,i,r){return i+(n-e)*(r-i)/(t-e)}function Ym(n,e,t){return n!==e?(t-n)/(e-n):0}function So(n,e,t){return(1-t)*n+t*e}function Zm(n,e,t,i){return So(n,e,1-Math.exp(-t*i))}function Jm(n,e=1){return e-Math.abs(ch(n,e*2)-e)}function Km(n,e,t){return n<=e?0:n>=t?1:(n=(n-e)/(t-e),n*n*(3-2*n))}function jm(n,e,t){return n<=e?0:n>=t?1:(n=(n-e)/(t-e),n*n*n*(n*(n*6-15)+10))}function Qm(n,e){return n+Math.floor(Math.random()*(e-n+1))}function eg(n,e){return n+Math.random()*(e-n)}function tg(n){return n*(.5-Math.random())}function ng(n){n!==void 0&&(yd=n);let e=yd+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function ig(n){return n*Mo}function rg(n){return n*ws}function sg(n){return(n&n-1)===0&&n!==0}function og(n){return Math.pow(2,Math.ceil(Math.log(n)/Math.LN2))}function ag(n){return Math.pow(2,Math.floor(Math.log(n)/Math.LN2))}function lg(n,e,t,i,r){let s=Math.cos,o=Math.sin,a=s(t/2),l=o(t/2),c=s((e+i)/2),u=o((e+i)/2),h=s((e-i)/2),d=o((e-i)/2),f=s((i-e)/2),m=o((i-e)/2);switch(r){case"XYX":n.set(a*u,l*h,l*d,a*c);break;case"YZY":n.set(l*d,a*u,l*h,a*c);break;case"ZXZ":n.set(l*h,l*d,a*u,a*c);break;case"XZX":n.set(a*u,l*m,l*f,a*c);break;case"YXY":n.set(l*f,a*u,l*m,a*c);break;case"ZYZ":n.set(l*m,l*f,a*u,a*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+r)}}function Ms(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("Invalid component type.")}}function fn(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("Invalid component type.")}}var uh={DEG2RAD:Mo,RAD2DEG:ws,generateUUID:Wi,clamp:st,euclideanModulo:ch,mapLinear:qm,inverseLerp:Ym,lerp:So,damp:Zm,pingpong:Jm,smoothstep:Km,smootherstep:jm,randInt:Qm,randFloat:eg,randFloatSpread:tg,seededRandom:ng,degToRad:ig,radToDeg:rg,isPowerOfTwo:sg,ceilPowerOfTwo:og,floorPowerOfTwo:ag,setQuaternionFromProperEuler:lg,normalize:fn,denormalize:Ms},Ee=class n{constructor(e=0,t=0){n.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,i=this.y,r=e.elements;return this.x=r[0]*t+r[3]*i+r[6],this.y=r[1]*t+r[4]*i+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=st(this.x,e.x,t.x),this.y=st(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=st(this.x,e,t),this.y=st(this.y,e,t),this}clampLength(e,t){let i=this.length();return this.divideScalar(i||1).multiplyScalar(st(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let i=this.dot(e)/t;return Math.acos(st(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let i=Math.cos(t),r=Math.sin(t),s=this.x-e.x,o=this.y-e.y;return this.x=s*i-o*r+e.x,this.y=s*r+o*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},cn=class{constructor(e=0,t=0,i=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=r}static slerpFlat(e,t,i,r,s,o,a){let l=i[r+0],c=i[r+1],u=i[r+2],h=i[r+3],d=s[o+0],f=s[o+1],m=s[o+2],x=s[o+3];if(a===0){e[t+0]=l,e[t+1]=c,e[t+2]=u,e[t+3]=h;return}if(a===1){e[t+0]=d,e[t+1]=f,e[t+2]=m,e[t+3]=x;return}if(h!==x||l!==d||c!==f||u!==m){let g=1-a,p=l*d+c*f+u*m+h*x,w=p>=0?1:-1,b=1-p*p;if(b>Number.EPSILON){let A=Math.sqrt(b),R=Math.atan2(A,p*w);g=Math.sin(g*R)/A,a=Math.sin(a*R)/A}let v=a*w;if(l=l*g+d*v,c=c*g+f*v,u=u*g+m*v,h=h*g+x*v,g===1-a){let A=1/Math.sqrt(l*l+c*c+u*u+h*h);l*=A,c*=A,u*=A,h*=A}}e[t]=l,e[t+1]=c,e[t+2]=u,e[t+3]=h}static multiplyQuaternionsFlat(e,t,i,r,s,o){let a=i[r],l=i[r+1],c=i[r+2],u=i[r+3],h=s[o],d=s[o+1],f=s[o+2],m=s[o+3];return e[t]=a*m+u*h+l*f-c*d,e[t+1]=l*m+u*d+c*h-a*f,e[t+2]=c*m+u*f+a*d-l*h,e[t+3]=u*m-a*h-l*d-c*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,r){return this._x=e,this._y=t,this._z=i,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let i=e._x,r=e._y,s=e._z,o=e._order,a=Math.cos,l=Math.sin,c=a(i/2),u=a(r/2),h=a(s/2),d=l(i/2),f=l(r/2),m=l(s/2);switch(o){case"XYZ":this._x=d*u*h+c*f*m,this._y=c*f*h-d*u*m,this._z=c*u*m+d*f*h,this._w=c*u*h-d*f*m;break;case"YXZ":this._x=d*u*h+c*f*m,this._y=c*f*h-d*u*m,this._z=c*u*m-d*f*h,this._w=c*u*h+d*f*m;break;case"ZXY":this._x=d*u*h-c*f*m,this._y=c*f*h+d*u*m,this._z=c*u*m+d*f*h,this._w=c*u*h-d*f*m;break;case"ZYX":this._x=d*u*h-c*f*m,this._y=c*f*h+d*u*m,this._z=c*u*m-d*f*h,this._w=c*u*h+d*f*m;break;case"YZX":this._x=d*u*h+c*f*m,this._y=c*f*h+d*u*m,this._z=c*u*m-d*f*h,this._w=c*u*h-d*f*m;break;case"XZY":this._x=d*u*h-c*f*m,this._y=c*f*h-d*u*m,this._z=c*u*m+d*f*h,this._w=c*u*h+d*f*m;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let i=t/2,r=Math.sin(i);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,i=t[0],r=t[4],s=t[8],o=t[1],a=t[5],l=t[9],c=t[2],u=t[6],h=t[10],d=i+a+h;if(d>0){let f=.5/Math.sqrt(d+1);this._w=.25/f,this._x=(u-l)*f,this._y=(s-c)*f,this._z=(o-r)*f}else if(i>a&&i>h){let f=2*Math.sqrt(1+i-a-h);this._w=(u-l)/f,this._x=.25*f,this._y=(r+o)/f,this._z=(s+c)/f}else if(a>h){let f=2*Math.sqrt(1+a-i-h);this._w=(s-c)/f,this._x=(r+o)/f,this._y=.25*f,this._z=(l+u)/f}else{let f=2*Math.sqrt(1+h-i-a);this._w=(o-r)/f,this._x=(s+c)/f,this._y=(l+u)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<1e-8?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(st(this.dot(e),-1,1)))}rotateTowards(e,t){let i=this.angleTo(e);if(i===0)return this;let r=Math.min(1,t/i);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let i=e._x,r=e._y,s=e._z,o=e._w,a=t._x,l=t._y,c=t._z,u=t._w;return this._x=i*u+o*a+r*c-s*l,this._y=r*u+o*l+s*a-i*c,this._z=s*u+o*c+i*l-r*a,this._w=o*u-i*a-r*l-s*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);let i=this._x,r=this._y,s=this._z,o=this._w,a=o*e._w+i*e._x+r*e._y+s*e._z;if(a<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,a=-a):this.copy(e),a>=1)return this._w=o,this._x=i,this._y=r,this._z=s,this;let l=1-a*a;if(l<=Number.EPSILON){let f=1-t;return this._w=f*o+t*this._w,this._x=f*i+t*this._x,this._y=f*r+t*this._y,this._z=f*s+t*this._z,this.normalize(),this}let c=Math.sqrt(l),u=Math.atan2(c,a),h=Math.sin((1-t)*u)/c,d=Math.sin(t*u)/c;return this._w=o*h+this._w*d,this._x=i*h+this._x*d,this._y=r*h+this._y*d,this._z=s*h+this._z*d,this._onChangeCallback(),this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),i=Math.random(),r=Math.sqrt(1-i),s=Math.sqrt(i);return this.set(r*Math.sin(e),r*Math.cos(e),s*Math.sin(t),s*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},P=class n{constructor(e=0,t=0,i=0){n.prototype.isVector3=!0,this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(_d.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(_d.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[3]*i+s[6]*r,this.y=s[1]*t+s[4]*i+s[7]*r,this.z=s[2]*t+s[5]*i+s[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,i=this.y,r=this.z,s=e.elements,o=1/(s[3]*t+s[7]*i+s[11]*r+s[15]);return this.x=(s[0]*t+s[4]*i+s[8]*r+s[12])*o,this.y=(s[1]*t+s[5]*i+s[9]*r+s[13])*o,this.z=(s[2]*t+s[6]*i+s[10]*r+s[14])*o,this}applyQuaternion(e){let t=this.x,i=this.y,r=this.z,s=e.x,o=e.y,a=e.z,l=e.w,c=2*(o*r-a*i),u=2*(a*t-s*r),h=2*(s*i-o*t);return this.x=t+l*c+o*h-a*u,this.y=i+l*u+a*c-s*h,this.z=r+l*h+s*u-o*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[4]*i+s[8]*r,this.y=s[1]*t+s[5]*i+s[9]*r,this.z=s[2]*t+s[6]*i+s[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=st(this.x,e.x,t.x),this.y=st(this.y,e.y,t.y),this.z=st(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=st(this.x,e,t),this.y=st(this.y,e,t),this.z=st(this.z,e,t),this}clampLength(e,t){let i=this.length();return this.divideScalar(i||1).multiplyScalar(st(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let i=e.x,r=e.y,s=e.z,o=t.x,a=t.y,l=t.z;return this.x=r*l-s*a,this.y=s*o-i*l,this.z=i*a-r*o,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return cu.copy(this).projectOnVector(e),this.sub(cu)}reflect(e){return this.sub(cu.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let i=this.dot(e)/t;return Math.acos(st(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,i=this.y-e.y,r=this.z-e.z;return t*t+i*i+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){let r=Math.sin(t)*e;return this.x=r*Math.sin(i),this.y=Math.cos(t)*e,this.z=r*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,i=Math.sqrt(1-t*t);return this.x=i*Math.cos(e),this.y=t,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},cu=new P,_d=new cn,it=class n{constructor(e,t,i,r,s,o,a,l,c){n.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,i,r,s,o,a,l,c)}set(e,t,i,r,s,o,a,l,c){let u=this.elements;return u[0]=e,u[1]=r,u[2]=a,u[3]=t,u[4]=s,u[5]=l,u[6]=i,u[7]=o,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let i=e.elements,r=t.elements,s=this.elements,o=i[0],a=i[3],l=i[6],c=i[1],u=i[4],h=i[7],d=i[2],f=i[5],m=i[8],x=r[0],g=r[3],p=r[6],w=r[1],b=r[4],v=r[7],A=r[2],R=r[5],I=r[8];return s[0]=o*x+a*w+l*A,s[3]=o*g+a*b+l*R,s[6]=o*p+a*v+l*I,s[1]=c*x+u*w+h*A,s[4]=c*g+u*b+h*R,s[7]=c*p+u*v+h*I,s[2]=d*x+f*w+m*A,s[5]=d*g+f*b+m*R,s[8]=d*p+f*v+m*I,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8];return t*o*u-t*a*c-i*s*u+i*a*l+r*s*c-r*o*l}invert(){let e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8],h=u*o-a*c,d=a*l-u*s,f=c*s-o*l,m=t*h+i*d+r*f;if(m===0)return this.set(0,0,0,0,0,0,0,0,0);let x=1/m;return e[0]=h*x,e[1]=(r*c-u*i)*x,e[2]=(a*i-r*o)*x,e[3]=d*x,e[4]=(u*t-r*l)*x,e[5]=(r*s-a*t)*x,e[6]=f*x,e[7]=(i*l-c*t)*x,e[8]=(o*t-i*s)*x,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,r,s,o,a){let l=Math.cos(s),c=Math.sin(s);return this.set(i*l,i*c,-i*(l*o+c*a)+o+e,-r*c,r*l,-r*(-c*o+l*a)+a+t,0,0,1),this}scale(e,t){return this.premultiply(uu.makeScale(e,t)),this}rotate(e){return this.premultiply(uu.makeRotation(-e)),this}translate(e,t){return this.premultiply(uu.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,i=e.elements;for(let r=0;r<9;r++)if(t[r]!==i[r])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){let i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}},uu=new it;function hh(n){for(let e=n.length-1;e>=0;--e)if(n[e]>=65535)return!0;return!1}function Io(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function $f(){let n=Io("canvas");return n.style.display="block",n}var bd={};function Ts(n){n in bd||(bd[n]=!0,console.warn(n))}function qf(n,e,t){return new Promise(function(i,r){function s(){switch(n.clientWaitSync(e,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:r();break;case n.TIMEOUT_EXPIRED:setTimeout(s,t);break;default:i()}}setTimeout(s,t)})}var Md=new it().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Sd=new it().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function cg(){let n={enabled:!0,workingColorSpace:Ur,spaces:{},convert:function(r,s,o){return this.enabled===!1||s===o||!s||!o||(this.spaces[s].transfer===yt&&(r.r=Oi(r.r),r.g=Oi(r.g),r.b=Oi(r.b)),this.spaces[s].primaries!==this.spaces[o].primaries&&(r.applyMatrix3(this.spaces[s].toXYZ),r.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===yt&&(r.r=Ss(r.r),r.g=Ss(r.g),r.b=Ss(r.b))),r},workingToColorSpace:function(r,s){return this.convert(r,this.workingColorSpace,s)},colorSpaceToWorking:function(r,s){return this.convert(r,s,this.workingColorSpace)},getPrimaries:function(r){return this.spaces[r].primaries},getTransfer:function(r){return r===Gi?Ro:this.spaces[r].transfer},getToneMappingMode:function(r){return this.spaces[r].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(r,s=this.workingColorSpace){return r.fromArray(this.spaces[s].luminanceCoefficients)},define:function(r){Object.assign(this.spaces,r)},_getMatrix:function(r,s,o){return r.copy(this.spaces[s].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(r){return this.spaces[r].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(r=this.workingColorSpace){return this.spaces[r].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(r,s){return Ts("THREE.ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),n.workingToColorSpace(r,s)},toWorkingColorSpace:function(r,s){return Ts("THREE.ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),n.colorSpaceToWorking(r,s)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],i=[.3127,.329];return n.define({[Ur]:{primaries:e,whitePoint:i,transfer:Ro,toXYZ:Md,fromXYZ:Sd,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:pn},outputColorSpaceConfig:{drawingBufferColorSpace:pn}},[pn]:{primaries:e,whitePoint:i,transfer:yt,toXYZ:Md,fromXYZ:Sd,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:pn}}}),n}var dt=cg();function Oi(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function Ss(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}var cs,cl=class{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let i;if(e instanceof HTMLCanvasElement)i=e;else{cs===void 0&&(cs=Io("canvas")),cs.width=e.width,cs.height=e.height;let r=cs.getContext("2d");e instanceof ImageData?r.putImageData(e,0,0):r.drawImage(e,0,0,e.width,e.height),i=cs}return i.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){let t=Io("canvas");t.width=e.width,t.height=e.height;let i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);let r=i.getImageData(0,0,e.width,e.height),s=r.data;for(let o=0;o<s.length;o++)s[o]=Oi(s[o]/255)*255;return i.putImageData(r,0,0),t}else if(e.data){let t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor(Oi(t[i]/255)*255):t[i]=Oi(t[i]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}},ug=0,As=class{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:ug++}),this.uuid=Wi(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):t instanceof VideoFrame?e.set(t.displayHeight,t.displayWidth,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let i={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let o=0,a=r.length;o<a;o++)r[o].isDataTexture?s.push(hu(r[o].image)):s.push(hu(r[o]))}else s=hu(r);i.url=s}return t||(e.images[this.uuid]=i),i}};function hu(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?cl.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}var hg=0,du=new P,bn=class n extends bi{constructor(e=n.DEFAULT_IMAGE,t=n.DEFAULT_MAPPING,i=sr,r=sr,s=ii,o=cr,a=Nn,l=li,c=n.DEFAULT_ANISOTROPY,u=Gi){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:hg++}),this.uuid=Wi(),this.name="",this.source=new As(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=i,this.wrapT=r,this.magFilter=s,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new Ee(0,0),this.repeat=new Ee(1,1),this.center=new Ee(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new it,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(du).x}get height(){return this.source.getSize(du).y}get depth(){return this.source.getSize(du).z}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(let t in e){let i=e[t];if(i===void 0){console.warn(`THREE.Texture.setValues(): parameter '${t}' has value of undefined.`);continue}let r=this[t];if(r===void 0){console.warn(`THREE.Texture.setValues(): property '${t}' does not exist.`);continue}r&&i&&r.isVector2&&i.isVector2||r&&i&&r.isVector3&&i.isVector3||r&&i&&r.isMatrix3&&i.isMatrix3?r.copy(i):this[t]=i}}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),t||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==ju)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case ol:e.x=e.x-Math.floor(e.x);break;case sr:e.x=e.x<0?0:1;break;case al:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case ol:e.y=e.y-Math.floor(e.y);break;case sr:e.y=e.y<0?0:1;break;case al:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};bn.DEFAULT_IMAGE=null;bn.DEFAULT_MAPPING=ju;bn.DEFAULT_ANISOTROPY=1;var pt=class n{constructor(e=0,t=0,i=0,r=1){n.prototype.isVector4=!0,this.x=e,this.y=t,this.z=i,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,r){return this.x=e,this.y=t,this.z=i,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,i=this.y,r=this.z,s=this.w,o=e.elements;return this.x=o[0]*t+o[4]*i+o[8]*r+o[12]*s,this.y=o[1]*t+o[5]*i+o[9]*r+o[13]*s,this.z=o[2]*t+o[6]*i+o[10]*r+o[14]*s,this.w=o[3]*t+o[7]*i+o[11]*r+o[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,r,s,l=e.elements,c=l[0],u=l[4],h=l[8],d=l[1],f=l[5],m=l[9],x=l[2],g=l[6],p=l[10];if(Math.abs(u-d)<.01&&Math.abs(h-x)<.01&&Math.abs(m-g)<.01){if(Math.abs(u+d)<.1&&Math.abs(h+x)<.1&&Math.abs(m+g)<.1&&Math.abs(c+f+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;let b=(c+1)/2,v=(f+1)/2,A=(p+1)/2,R=(u+d)/4,I=(h+x)/4,U=(m+g)/4;return b>v&&b>A?b<.01?(i=0,r=.707106781,s=.707106781):(i=Math.sqrt(b),r=R/i,s=I/i):v>A?v<.01?(i=.707106781,r=0,s=.707106781):(r=Math.sqrt(v),i=R/r,s=U/r):A<.01?(i=.707106781,r=.707106781,s=0):(s=Math.sqrt(A),i=I/s,r=U/s),this.set(i,r,s,t),this}let w=Math.sqrt((g-m)*(g-m)+(h-x)*(h-x)+(d-u)*(d-u));return Math.abs(w)<.001&&(w=1),this.x=(g-m)/w,this.y=(h-x)/w,this.z=(d-u)/w,this.w=Math.acos((c+f+p-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=st(this.x,e.x,t.x),this.y=st(this.y,e.y,t.y),this.z=st(this.z,e.z,t.z),this.w=st(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=st(this.x,e,t),this.y=st(this.y,e,t),this.z=st(this.z,e,t),this.w=st(this.w,e,t),this}clampLength(e,t){let i=this.length();return this.divideScalar(i||1).multiplyScalar(st(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},ul=class extends bi{constructor(e=1,t=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:ii,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},i),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=i.depth,this.scissor=new pt(0,0,e,t),this.scissorTest=!1,this.viewport=new pt(0,0,e,t);let r={width:e,height:t,depth:i.depth},s=new bn(r);this.textures=[];let o=i.count;for(let a=0;a<o;a++)this.textures[a]=s.clone(),this.textures[a].isRenderTargetTexture=!0,this.textures[a].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview}_setTextureOptions(e={}){let t={minFilter:ii,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,i=1){if(this.width!==e||this.height!==t||this.depth!==i){this.width=e,this.height=t,this.depth=i;for(let r=0,s=this.textures.length;r<s;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=i,this.textures[r].isArrayTexture=this.textures[r].image.depth>1;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,i=e.textures.length;t<i;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let r=Object.assign({},e.textures[t].image);this.textures[t].source=new As(r)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}},Mi=class extends ul{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}},Po=class extends bn{constructor(e=null,t=1,i=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=_n,this.minFilter=_n,this.wrapR=sr,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}};var hl=class extends bn{constructor(e=null,t=1,i=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=_n,this.minFilter=_n,this.wrapR=sr,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var Ln=class{constructor(e=new P(1/0,1/0,1/0),t=new P(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint(Qn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint(Qn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let i=Qn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let i=e.geometry;if(i!==void 0){let s=i.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=s.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,Qn):Qn.fromBufferAttribute(s,o),Qn.applyMatrix4(e.matrixWorld),this.expandByPoint(Qn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Da.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),Da.copy(i.boundingBox)),Da.applyMatrix4(e.matrixWorld),this.union(Da)}let r=e.children;for(let s=0,o=r.length;s<o;s++)this.expandByObject(r[s],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Qn),Qn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(fo),La.subVectors(this.max,fo),us.subVectors(e.a,fo),hs.subVectors(e.b,fo),ds.subVectors(e.c,fo),ji.subVectors(hs,us),Qi.subVectors(ds,hs),Er.subVectors(us,ds);let t=[0,-ji.z,ji.y,0,-Qi.z,Qi.y,0,-Er.z,Er.y,ji.z,0,-ji.x,Qi.z,0,-Qi.x,Er.z,0,-Er.x,-ji.y,ji.x,0,-Qi.y,Qi.x,0,-Er.y,Er.x,0];return!fu(t,us,hs,ds,La)||(t=[1,0,0,0,1,0,0,0,1],!fu(t,us,hs,ds,La))?!1:(Ua.crossVectors(ji,Qi),t=[Ua.x,Ua.y,Ua.z],fu(t,us,hs,ds,La))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Qn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Qn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Di[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Di[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Di[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Di[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Di[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Di[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Di[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Di[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Di),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},Di=[new P,new P,new P,new P,new P,new P,new P,new P],Qn=new P,Da=new Ln,us=new P,hs=new P,ds=new P,ji=new P,Qi=new P,Er=new P,fo=new P,La=new P,Ua=new P,wr=new P;function fu(n,e,t,i,r){for(let s=0,o=n.length-3;s<=o;s+=3){wr.fromArray(n,s);let a=r.x*Math.abs(wr.x)+r.y*Math.abs(wr.y)+r.z*Math.abs(wr.z),l=e.dot(wr),c=t.dot(wr),u=i.dot(wr);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>a)return!1}return!0}var dg=new Ln,po=new P,pu=new P,ri=class{constructor(e=new P,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let i=this.center;t!==void 0?i.copy(t):dg.setFromPoints(e).getCenter(i);let r=0;for(let s=0,o=e.length;s<o;s++)r=Math.max(r,i.distanceToSquared(e[s]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;po.subVectors(e,this.center);let t=po.lengthSq();if(t>this.radius*this.radius){let i=Math.sqrt(t),r=(i-this.radius)*.5;this.center.addScaledVector(po,r/i),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(pu.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(po.copy(e.center).add(pu)),this.expandByPoint(po.copy(e.center).sub(pu))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},Li=new P,mu=new P,Na=new P,er=new P,gu=new P,Fa=new P,xu=new P,Rs=class{constructor(e=new P,t=new P(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Li)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=Li.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Li.copy(this.origin).addScaledVector(this.direction,t),Li.distanceToSquared(e))}distanceSqToSegment(e,t,i,r){mu.copy(e).add(t).multiplyScalar(.5),Na.copy(t).sub(e).normalize(),er.copy(this.origin).sub(mu);let s=e.distanceTo(t)*.5,o=-this.direction.dot(Na),a=er.dot(this.direction),l=-er.dot(Na),c=er.lengthSq(),u=Math.abs(1-o*o),h,d,f,m;if(u>0)if(h=o*l-a,d=o*a-l,m=s*u,h>=0)if(d>=-m)if(d<=m){let x=1/u;h*=x,d*=x,f=h*(h+o*d+2*a)+d*(o*h+d+2*l)+c}else d=s,h=Math.max(0,-(o*d+a)),f=-h*h+d*(d+2*l)+c;else d=-s,h=Math.max(0,-(o*d+a)),f=-h*h+d*(d+2*l)+c;else d<=-m?(h=Math.max(0,-(-o*s+a)),d=h>0?-s:Math.min(Math.max(-s,-l),s),f=-h*h+d*(d+2*l)+c):d<=m?(h=0,d=Math.min(Math.max(-s,-l),s),f=d*(d+2*l)+c):(h=Math.max(0,-(o*s+a)),d=h>0?s:Math.min(Math.max(-s,-l),s),f=-h*h+d*(d+2*l)+c);else d=o>0?-s:s,h=Math.max(0,-(o*d+a)),f=-h*h+d*(d+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,h),r&&r.copy(mu).addScaledVector(Na,d),f}intersectSphere(e,t){Li.subVectors(e.center,this.origin);let i=Li.dot(this.direction),r=Li.dot(Li)-i*i,s=e.radius*e.radius;if(r>s)return null;let o=Math.sqrt(s-r),a=i-o,l=i+o;return l<0?null:a<0?this.at(l,t):this.at(a,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){let i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,r,s,o,a,l,c=1/this.direction.x,u=1/this.direction.y,h=1/this.direction.z,d=this.origin;return c>=0?(i=(e.min.x-d.x)*c,r=(e.max.x-d.x)*c):(i=(e.max.x-d.x)*c,r=(e.min.x-d.x)*c),u>=0?(s=(e.min.y-d.y)*u,o=(e.max.y-d.y)*u):(s=(e.max.y-d.y)*u,o=(e.min.y-d.y)*u),i>o||s>r||((s>i||isNaN(i))&&(i=s),(o<r||isNaN(r))&&(r=o),h>=0?(a=(e.min.z-d.z)*h,l=(e.max.z-d.z)*h):(a=(e.max.z-d.z)*h,l=(e.min.z-d.z)*h),i>l||a>r)||((a>i||i!==i)&&(i=a),(l<r||r!==r)&&(r=l),r<0)?null:this.at(i>=0?i:r,t)}intersectsBox(e){return this.intersectBox(e,Li)!==null}intersectTriangle(e,t,i,r,s){gu.subVectors(t,e),Fa.subVectors(i,e),xu.crossVectors(gu,Fa);let o=this.direction.dot(xu),a;if(o>0){if(r)return null;a=1}else if(o<0)a=-1,o=-o;else return null;er.subVectors(this.origin,e);let l=a*this.direction.dot(Fa.crossVectors(er,Fa));if(l<0)return null;let c=a*this.direction.dot(gu.cross(er));if(c<0||l+c>o)return null;let u=-a*er.dot(xu);return u<0?null:this.at(u/o,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},ot=class n{constructor(e,t,i,r,s,o,a,l,c,u,h,d,f,m,x,g){n.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,i,r,s,o,a,l,c,u,h,d,f,m,x,g)}set(e,t,i,r,s,o,a,l,c,u,h,d,f,m,x,g){let p=this.elements;return p[0]=e,p[4]=t,p[8]=i,p[12]=r,p[1]=s,p[5]=o,p[9]=a,p[13]=l,p[2]=c,p[6]=u,p[10]=h,p[14]=d,p[3]=f,p[7]=m,p[11]=x,p[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new n().fromArray(this.elements)}copy(e){let t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){let t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){let t=this.elements,i=e.elements,r=1/fs.setFromMatrixColumn(e,0).length(),s=1/fs.setFromMatrixColumn(e,1).length(),o=1/fs.setFromMatrixColumn(e,2).length();return t[0]=i[0]*r,t[1]=i[1]*r,t[2]=i[2]*r,t[3]=0,t[4]=i[4]*s,t[5]=i[5]*s,t[6]=i[6]*s,t[7]=0,t[8]=i[8]*o,t[9]=i[9]*o,t[10]=i[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,i=e.x,r=e.y,s=e.z,o=Math.cos(i),a=Math.sin(i),l=Math.cos(r),c=Math.sin(r),u=Math.cos(s),h=Math.sin(s);if(e.order==="XYZ"){let d=o*u,f=o*h,m=a*u,x=a*h;t[0]=l*u,t[4]=-l*h,t[8]=c,t[1]=f+m*c,t[5]=d-x*c,t[9]=-a*l,t[2]=x-d*c,t[6]=m+f*c,t[10]=o*l}else if(e.order==="YXZ"){let d=l*u,f=l*h,m=c*u,x=c*h;t[0]=d+x*a,t[4]=m*a-f,t[8]=o*c,t[1]=o*h,t[5]=o*u,t[9]=-a,t[2]=f*a-m,t[6]=x+d*a,t[10]=o*l}else if(e.order==="ZXY"){let d=l*u,f=l*h,m=c*u,x=c*h;t[0]=d-x*a,t[4]=-o*h,t[8]=m+f*a,t[1]=f+m*a,t[5]=o*u,t[9]=x-d*a,t[2]=-o*c,t[6]=a,t[10]=o*l}else if(e.order==="ZYX"){let d=o*u,f=o*h,m=a*u,x=a*h;t[0]=l*u,t[4]=m*c-f,t[8]=d*c+x,t[1]=l*h,t[5]=x*c+d,t[9]=f*c-m,t[2]=-c,t[6]=a*l,t[10]=o*l}else if(e.order==="YZX"){let d=o*l,f=o*c,m=a*l,x=a*c;t[0]=l*u,t[4]=x-d*h,t[8]=m*h+f,t[1]=h,t[5]=o*u,t[9]=-a*u,t[2]=-c*u,t[6]=f*h+m,t[10]=d-x*h}else if(e.order==="XZY"){let d=o*l,f=o*c,m=a*l,x=a*c;t[0]=l*u,t[4]=-h,t[8]=c*u,t[1]=d*h+x,t[5]=o*u,t[9]=f*h-m,t[2]=m*h-f,t[6]=a*u,t[10]=x*h+d}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(fg,e,pg)}lookAt(e,t,i){let r=this.elements;return Pn.subVectors(e,t),Pn.lengthSq()===0&&(Pn.z=1),Pn.normalize(),tr.crossVectors(i,Pn),tr.lengthSq()===0&&(Math.abs(i.z)===1?Pn.x+=1e-4:Pn.z+=1e-4,Pn.normalize(),tr.crossVectors(i,Pn)),tr.normalize(),Oa.crossVectors(Pn,tr),r[0]=tr.x,r[4]=Oa.x,r[8]=Pn.x,r[1]=tr.y,r[5]=Oa.y,r[9]=Pn.y,r[2]=tr.z,r[6]=Oa.z,r[10]=Pn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let i=e.elements,r=t.elements,s=this.elements,o=i[0],a=i[4],l=i[8],c=i[12],u=i[1],h=i[5],d=i[9],f=i[13],m=i[2],x=i[6],g=i[10],p=i[14],w=i[3],b=i[7],v=i[11],A=i[15],R=r[0],I=r[4],U=r[8],M=r[12],S=r[1],L=r[5],B=r[9],H=r[13],Z=r[2],X=r[6],J=r[10],le=r[14],$=r[3],_e=r[7],we=r[11],Le=r[15];return s[0]=o*R+a*S+l*Z+c*$,s[4]=o*I+a*L+l*X+c*_e,s[8]=o*U+a*B+l*J+c*we,s[12]=o*M+a*H+l*le+c*Le,s[1]=u*R+h*S+d*Z+f*$,s[5]=u*I+h*L+d*X+f*_e,s[9]=u*U+h*B+d*J+f*we,s[13]=u*M+h*H+d*le+f*Le,s[2]=m*R+x*S+g*Z+p*$,s[6]=m*I+x*L+g*X+p*_e,s[10]=m*U+x*B+g*J+p*we,s[14]=m*M+x*H+g*le+p*Le,s[3]=w*R+b*S+v*Z+A*$,s[7]=w*I+b*L+v*X+A*_e,s[11]=w*U+b*B+v*J+A*we,s[15]=w*M+b*H+v*le+A*Le,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],i=e[4],r=e[8],s=e[12],o=e[1],a=e[5],l=e[9],c=e[13],u=e[2],h=e[6],d=e[10],f=e[14],m=e[3],x=e[7],g=e[11],p=e[15];return m*(+s*l*h-r*c*h-s*a*d+i*c*d+r*a*f-i*l*f)+x*(+t*l*f-t*c*d+s*o*d-r*o*f+r*c*u-s*l*u)+g*(+t*c*h-t*a*f-s*o*h+i*o*f+s*a*u-i*c*u)+p*(-r*a*u-t*l*h+t*a*d+r*o*h-i*o*d+i*l*u)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){let r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=i),this}invert(){let e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8],h=e[9],d=e[10],f=e[11],m=e[12],x=e[13],g=e[14],p=e[15],w=h*g*c-x*d*c+x*l*f-a*g*f-h*l*p+a*d*p,b=m*d*c-u*g*c-m*l*f+o*g*f+u*l*p-o*d*p,v=u*x*c-m*h*c+m*a*f-o*x*f-u*a*p+o*h*p,A=m*h*l-u*x*l-m*a*d+o*x*d+u*a*g-o*h*g,R=t*w+i*b+r*v+s*A;if(R===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let I=1/R;return e[0]=w*I,e[1]=(x*d*s-h*g*s-x*r*f+i*g*f+h*r*p-i*d*p)*I,e[2]=(a*g*s-x*l*s+x*r*c-i*g*c-a*r*p+i*l*p)*I,e[3]=(h*l*s-a*d*s-h*r*c+i*d*c+a*r*f-i*l*f)*I,e[4]=b*I,e[5]=(u*g*s-m*d*s+m*r*f-t*g*f-u*r*p+t*d*p)*I,e[6]=(m*l*s-o*g*s-m*r*c+t*g*c+o*r*p-t*l*p)*I,e[7]=(o*d*s-u*l*s+u*r*c-t*d*c-o*r*f+t*l*f)*I,e[8]=v*I,e[9]=(m*h*s-u*x*s-m*i*f+t*x*f+u*i*p-t*h*p)*I,e[10]=(o*x*s-m*a*s+m*i*c-t*x*c-o*i*p+t*a*p)*I,e[11]=(u*a*s-o*h*s-u*i*c+t*h*c+o*i*f-t*a*f)*I,e[12]=A*I,e[13]=(u*x*r-m*h*r+m*i*d-t*x*d-u*i*g+t*h*g)*I,e[14]=(m*a*r-o*x*r-m*i*l+t*x*l+o*i*g-t*a*g)*I,e[15]=(o*h*r-u*a*r+u*i*l-t*h*l-o*i*d+t*a*d)*I,this}scale(e){let t=this.elements,i=e.x,r=e.y,s=e.z;return t[0]*=i,t[4]*=r,t[8]*=s,t[1]*=i,t[5]*=r,t[9]*=s,t[2]*=i,t[6]*=r,t[10]*=s,t[3]*=i,t[7]*=r,t[11]*=s,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,r))}makeTranslation(e,t,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let i=Math.cos(t),r=Math.sin(t),s=1-i,o=e.x,a=e.y,l=e.z,c=s*o,u=s*a;return this.set(c*o+i,c*a-r*l,c*l+r*a,0,c*a+r*l,u*a+i,u*l-r*o,0,c*l-r*a,u*l+r*o,s*l*l+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,r,s,o){return this.set(1,i,s,0,e,1,o,0,t,r,1,0,0,0,0,1),this}compose(e,t,i){let r=this.elements,s=t._x,o=t._y,a=t._z,l=t._w,c=s+s,u=o+o,h=a+a,d=s*c,f=s*u,m=s*h,x=o*u,g=o*h,p=a*h,w=l*c,b=l*u,v=l*h,A=i.x,R=i.y,I=i.z;return r[0]=(1-(x+p))*A,r[1]=(f+v)*A,r[2]=(m-b)*A,r[3]=0,r[4]=(f-v)*R,r[5]=(1-(d+p))*R,r[6]=(g+w)*R,r[7]=0,r[8]=(m+b)*I,r[9]=(g-w)*I,r[10]=(1-(d+x))*I,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,i){let r=this.elements,s=fs.set(r[0],r[1],r[2]).length(),o=fs.set(r[4],r[5],r[6]).length(),a=fs.set(r[8],r[9],r[10]).length();this.determinant()<0&&(s=-s),e.x=r[12],e.y=r[13],e.z=r[14],ei.copy(this);let c=1/s,u=1/o,h=1/a;return ei.elements[0]*=c,ei.elements[1]*=c,ei.elements[2]*=c,ei.elements[4]*=u,ei.elements[5]*=u,ei.elements[6]*=u,ei.elements[8]*=h,ei.elements[9]*=h,ei.elements[10]*=h,t.setFromRotationMatrix(ei),i.x=s,i.y=o,i.z=a,this}makePerspective(e,t,i,r,s,o,a=ni,l=!1){let c=this.elements,u=2*s/(t-e),h=2*s/(i-r),d=(t+e)/(t-e),f=(i+r)/(i-r),m,x;if(l)m=s/(o-s),x=o*s/(o-s);else if(a===ni)m=-(o+s)/(o-s),x=-2*o*s/(o-s);else if(a===Co)m=-o/(o-s),x=-o*s/(o-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return c[0]=u,c[4]=0,c[8]=d,c[12]=0,c[1]=0,c[5]=h,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=m,c[14]=x,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,i,r,s,o,a=ni,l=!1){let c=this.elements,u=2/(t-e),h=2/(i-r),d=-(t+e)/(t-e),f=-(i+r)/(i-r),m,x;if(l)m=1/(o-s),x=o/(o-s);else if(a===ni)m=-2/(o-s),x=-(o+s)/(o-s);else if(a===Co)m=-1/(o-s),x=-s/(o-s);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return c[0]=u,c[4]=0,c[8]=0,c[12]=d,c[1]=0,c[5]=h,c[9]=0,c[13]=f,c[2]=0,c[6]=0,c[10]=m,c[14]=x,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){let t=this.elements,i=e.elements;for(let r=0;r<16;r++)if(t[r]!==i[r])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){let i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}},fs=new P,ei=new ot,fg=new P(0,0,0),pg=new P(1,1,1),tr=new P,Oa=new P,Pn=new P,Ed=new ot,wd=new cn,Gn=class n{constructor(e=0,t=0,i=0,r=n.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=i,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,i,r=this._order){return this._x=e,this._y=t,this._z=i,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,i=!0){let r=e.elements,s=r[0],o=r[4],a=r[8],l=r[1],c=r[5],u=r[9],h=r[2],d=r[6],f=r[10];switch(t){case"XYZ":this._y=Math.asin(st(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-u,f),this._z=Math.atan2(-o,s)):(this._x=Math.atan2(d,c),this._z=0);break;case"YXZ":this._x=Math.asin(-st(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(a,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-h,s),this._z=0);break;case"ZXY":this._x=Math.asin(st(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-h,f),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-st(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(st(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-h,s)):(this._x=0,this._y=Math.atan2(a,f));break;case"XZY":this._z=Math.asin(-st(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(a,s)):(this._x=Math.atan2(-u,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,i){return Ed.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Ed,t,i)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return wd.setFromEuler(this),this.setFromQuaternion(wd,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};Gn.DEFAULT_ORDER="XYZ";var Do=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}},mg=0,Td=new P,ps=new cn,Ui=new ot,za=new P,mo=new P,gg=new P,xg=new cn,Ad=new P(1,0,0),Rd=new P(0,1,0),Cd=new P(0,0,1),Id={type:"added"},vg={type:"removed"},ms={type:"childadded",child:null},vu={type:"childremoved",child:null},Gt=class n extends bi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:mg++}),this.uuid=Wi(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=n.DEFAULT_UP.clone();let e=new P,t=new Gn,i=new cn,r=new P(1,1,1);function s(){i.setFromEuler(t,!1)}function o(){t.setFromQuaternion(i,void 0,!1)}t._onChange(s),i._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new ot},normalMatrix:{value:new it}}),this.matrix=new ot,this.matrixWorld=new ot,this.matrixAutoUpdate=n.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=n.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Do,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return ps.setFromAxisAngle(e,t),this.quaternion.multiply(ps),this}rotateOnWorldAxis(e,t){return ps.setFromAxisAngle(e,t),this.quaternion.premultiply(ps),this}rotateX(e){return this.rotateOnAxis(Ad,e)}rotateY(e){return this.rotateOnAxis(Rd,e)}rotateZ(e){return this.rotateOnAxis(Cd,e)}translateOnAxis(e,t){return Td.copy(e).applyQuaternion(this.quaternion),this.position.add(Td.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Ad,e)}translateY(e){return this.translateOnAxis(Rd,e)}translateZ(e){return this.translateOnAxis(Cd,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Ui.copy(this.matrixWorld).invert())}lookAt(e,t,i){e.isVector3?za.copy(e):za.set(e,t,i);let r=this.parent;this.updateWorldMatrix(!0,!1),mo.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Ui.lookAt(mo,za,this.up):Ui.lookAt(za,mo,this.up),this.quaternion.setFromRotationMatrix(Ui),r&&(Ui.extractRotation(r.matrixWorld),ps.setFromRotationMatrix(Ui),this.quaternion.premultiply(ps.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Id),ms.child=e,this.dispatchEvent(ms),ms.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(vg),vu.child=e,this.dispatchEvent(vu),vu.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Ui.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Ui.multiply(e.parent.matrixWorld)),e.applyMatrix4(Ui),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Id),ms.child=e,this.dispatchEvent(ms),ms.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let i=0,r=this.children.length;i<r;i++){let o=this.children[i].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t,i=[]){this[e]===t&&i.push(this);let r=this.children;for(let s=0,o=r.length;s<o;s++)r[s].getObjectsByProperty(e,t,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(mo,e,gg),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(mo,xg,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);let t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].updateMatrixWorld(e)}updateWorldMatrix(e,t){let i=this.parent;if(e===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){let r=this.children;for(let s=0,o=r.length;s<o;s++)r[s].updateWorldMatrix(!1,!0)}}toJSON(e){let t=e===void 0||typeof e=="string",i={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(a=>({...a,boundingBox:a.boundingBox?a.boundingBox.toJSON():void 0,boundingSphere:a.boundingSphere?a.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(a=>({...a})),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(e),r.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(r.boundingBox=this.boundingBox.toJSON()));function s(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(e.geometries,this.geometry);let a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){let l=a.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){let h=l[c];s(e.shapes,h)}else s(e.shapes,l)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(s(e.materials,this.material[l]));r.material=a}else r.material=s(e.materials,this.material);if(this.children.length>0){r.children=[];for(let a=0;a<this.children.length;a++)r.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let a=0;a<this.animations.length;a++){let l=this.animations[a];r.animations.push(s(e.animations,l))}}if(t){let a=o(e.geometries),l=o(e.materials),c=o(e.textures),u=o(e.images),h=o(e.shapes),d=o(e.skeletons),f=o(e.animations),m=o(e.nodes);a.length>0&&(i.geometries=a),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),u.length>0&&(i.images=u),h.length>0&&(i.shapes=h),d.length>0&&(i.skeletons=d),f.length>0&&(i.animations=f),m.length>0&&(i.nodes=m)}return i.object=r,i;function o(a){let l=[];for(let c in a){let u=a[c];delete u.metadata,l.push(u)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let i=0;i<e.children.length;i++){let r=e.children[i];this.add(r.clone())}return this}};Gt.DEFAULT_UP=new P(0,1,0);Gt.DEFAULT_MATRIX_AUTO_UPDATE=!0;Gt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var ti=new P,Ni=new P,yu=new P,Fi=new P,gs=new P,xs=new P,Pd=new P,_u=new P,bu=new P,Mu=new P,Su=new pt,Eu=new pt,wu=new pt,rr=class n{constructor(e=new P,t=new P,i=new P){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,r){r.subVectors(i,t),ti.subVectors(e,t),r.cross(ti);let s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(e,t,i,r,s){ti.subVectors(r,t),Ni.subVectors(i,t),yu.subVectors(e,t);let o=ti.dot(ti),a=ti.dot(Ni),l=ti.dot(yu),c=Ni.dot(Ni),u=Ni.dot(yu),h=o*c-a*a;if(h===0)return s.set(0,0,0),null;let d=1/h,f=(c*l-a*u)*d,m=(o*u-a*l)*d;return s.set(1-f-m,m,f)}static containsPoint(e,t,i,r){return this.getBarycoord(e,t,i,r,Fi)===null?!1:Fi.x>=0&&Fi.y>=0&&Fi.x+Fi.y<=1}static getInterpolation(e,t,i,r,s,o,a,l){return this.getBarycoord(e,t,i,r,Fi)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,Fi.x),l.addScaledVector(o,Fi.y),l.addScaledVector(a,Fi.z),l)}static getInterpolatedAttribute(e,t,i,r,s,o){return Su.setScalar(0),Eu.setScalar(0),wu.setScalar(0),Su.fromBufferAttribute(e,t),Eu.fromBufferAttribute(e,i),wu.fromBufferAttribute(e,r),o.setScalar(0),o.addScaledVector(Su,s.x),o.addScaledVector(Eu,s.y),o.addScaledVector(wu,s.z),o}static isFrontFacing(e,t,i,r){return ti.subVectors(i,t),Ni.subVectors(e,t),ti.cross(Ni).dot(r)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,r){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,i,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return ti.subVectors(this.c,this.b),Ni.subVectors(this.a,this.b),ti.cross(Ni).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return n.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return n.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,i,r,s){return n.getInterpolation(e,this.a,this.b,this.c,t,i,r,s)}containsPoint(e){return n.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return n.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let i=this.a,r=this.b,s=this.c,o,a;gs.subVectors(r,i),xs.subVectors(s,i),_u.subVectors(e,i);let l=gs.dot(_u),c=xs.dot(_u);if(l<=0&&c<=0)return t.copy(i);bu.subVectors(e,r);let u=gs.dot(bu),h=xs.dot(bu);if(u>=0&&h<=u)return t.copy(r);let d=l*h-u*c;if(d<=0&&l>=0&&u<=0)return o=l/(l-u),t.copy(i).addScaledVector(gs,o);Mu.subVectors(e,s);let f=gs.dot(Mu),m=xs.dot(Mu);if(m>=0&&f<=m)return t.copy(s);let x=f*c-l*m;if(x<=0&&c>=0&&m<=0)return a=c/(c-m),t.copy(i).addScaledVector(xs,a);let g=u*m-f*h;if(g<=0&&h-u>=0&&f-m>=0)return Pd.subVectors(s,r),a=(h-u)/(h-u+(f-m)),t.copy(r).addScaledVector(Pd,a);let p=1/(g+x+d);return o=x*p,a=d*p,t.copy(i).addScaledVector(gs,o).addScaledVector(xs,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},Yf={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},nr={h:0,s:0,l:0},Ba={h:0,s:0,l:0};function Tu(n,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?n+(e-n)*6*t:t<1/2?e:t<2/3?n+(e-n)*6*(2/3-t):n}var tt=class{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){if(t===void 0&&i===void 0){let r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,t,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=pn){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,dt.colorSpaceToWorking(this,t),this}setRGB(e,t,i,r=dt.workingColorSpace){return this.r=e,this.g=t,this.b=i,dt.colorSpaceToWorking(this,r),this}setHSL(e,t,i,r=dt.workingColorSpace){if(e=ch(e,1),t=st(t,0,1),i=st(i,0,1),t===0)this.r=this.g=this.b=i;else{let s=i<=.5?i*(1+t):i+t-i*t,o=2*i-s;this.r=Tu(o,s,e+1/3),this.g=Tu(o,s,e),this.b=Tu(o,s,e-1/3)}return dt.colorSpaceToWorking(this,r),this}setStyle(e,t=pn){function i(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let s,o=r[1],a=r[2];switch(o){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){let s=r[1],o=s.length;if(o===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(s,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=pn){let i=Yf[e.toLowerCase()];return i!==void 0?this.setHex(i,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Oi(e.r),this.g=Oi(e.g),this.b=Oi(e.b),this}copyLinearToSRGB(e){return this.r=Ss(e.r),this.g=Ss(e.g),this.b=Ss(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=pn){return dt.workingToColorSpace(ln.copy(this),e),Math.round(st(ln.r*255,0,255))*65536+Math.round(st(ln.g*255,0,255))*256+Math.round(st(ln.b*255,0,255))}getHexString(e=pn){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=dt.workingColorSpace){dt.workingToColorSpace(ln.copy(this),t);let i=ln.r,r=ln.g,s=ln.b,o=Math.max(i,r,s),a=Math.min(i,r,s),l,c,u=(a+o)/2;if(a===o)l=0,c=0;else{let h=o-a;switch(c=u<=.5?h/(o+a):h/(2-o-a),o){case i:l=(r-s)/h+(r<s?6:0);break;case r:l=(s-i)/h+2;break;case s:l=(i-r)/h+4;break}l/=6}return e.h=l,e.s=c,e.l=u,e}getRGB(e,t=dt.workingColorSpace){return dt.workingToColorSpace(ln.copy(this),t),e.r=ln.r,e.g=ln.g,e.b=ln.b,e}getStyle(e=pn){dt.workingToColorSpace(ln.copy(this),e);let t=ln.r,i=ln.g,r=ln.b;return e!==pn?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(i*255)},${Math.round(r*255)})`}offsetHSL(e,t,i){return this.getHSL(nr),this.setHSL(nr.h+e,nr.s+t,nr.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(nr),e.getHSL(Ba);let i=So(nr.h,Ba.h,t),r=So(nr.s,Ba.s,t),s=So(nr.l,Ba.l,t);return this.setHSL(i,r,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,i=this.g,r=this.b,s=e.elements;return this.r=s[0]*t+s[3]*i+s[6]*r,this.g=s[1]*t+s[4]*i+s[7]*r,this.b=s[2]*t+s[5]*i+s[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},ln=new tt;tt.NAMES=Yf;var yg=0,Si=class extends bi{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:yg++}),this.uuid=Wi(),this.name="",this.type="Material",this.blending=Dr,this.side=Vn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=rl,this.blendDst=sl,this.blendEquation=or,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new tt(0,0,0),this.blendAlpha=0,this.depthFunc=Lr,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Bu,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Rr,this.stencilZFail=Rr,this.stencilZPass=Rr,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let i=e[t];if(i===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}let r=this[t];if(r===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(i):r&&r.isVector3&&i&&i.isVector3?r.copy(i):this[t]=i}}toJSON(e){let t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});let i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==Dr&&(i.blending=this.blending),this.side!==Vn&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==rl&&(i.blendSrc=this.blendSrc),this.blendDst!==sl&&(i.blendDst=this.blendDst),this.blendEquation!==or&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==Lr&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Bu&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Rr&&(i.stencilFail=this.stencilFail),this.stencilZFail!==Rr&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==Rr&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function r(s){let o=[];for(let a in s){let l=s[a];delete l.metadata,o.push(l)}return o}if(t){let s=r(e.textures),o=r(e.images);s.length>0&&(i.textures=s),o.length>0&&(i.images=o)}return i}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,i=null;if(t!==null){let r=t.length;i=new Array(r);for(let s=0;s!==r;++s)i[s]=t[s].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}},Lo=class extends Si{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new tt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Gn,this.combine=kl,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}};var Vt=new P,ka=new Ee,_g=0,Nt=class{constructor(e,t,i=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:_g++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=ku,this.updateRanges=[],this.gpuType=$n,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[e+r]=t.array[i+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)ka.fromBufferAttribute(this,t),ka.applyMatrix3(e),this.setXY(t,ka.x,ka.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)Vt.fromBufferAttribute(this,t),Vt.applyMatrix3(e),this.setXYZ(t,Vt.x,Vt.y,Vt.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)Vt.fromBufferAttribute(this,t),Vt.applyMatrix4(e),this.setXYZ(t,Vt.x,Vt.y,Vt.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)Vt.fromBufferAttribute(this,t),Vt.applyNormalMatrix(e),this.setXYZ(t,Vt.x,Vt.y,Vt.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)Vt.fromBufferAttribute(this,t),Vt.transformDirection(e),this.setXYZ(t,Vt.x,Vt.y,Vt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=Ms(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=fn(i,this.array)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Ms(t,this.array)),t}setX(e,t){return this.normalized&&(t=fn(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Ms(t,this.array)),t}setY(e,t){return this.normalized&&(t=fn(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Ms(t,this.array)),t}setZ(e,t){return this.normalized&&(t=fn(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Ms(t,this.array)),t}setW(e,t){return this.normalized&&(t=fn(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=fn(t,this.array),i=fn(i,this.array)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,r){return e*=this.itemSize,this.normalized&&(t=fn(t,this.array),i=fn(i,this.array),r=fn(r,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this}setXYZW(e,t,i,r,s){return e*=this.itemSize,this.normalized&&(t=fn(t,this.array),i=fn(i,this.array),r=fn(r,this.array),s=fn(s,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==ku&&(e.usage=this.usage),e}};var Nr=class extends Nt{constructor(e,t,i){super(new Uint16Array(e),t,i)}};var Uo=class extends Nt{constructor(e,t,i){super(new Uint32Array(e),t,i)}};var ut=class extends Nt{constructor(e,t,i){super(new Float32Array(e),t,i)}},bg=0,Hn=new ot,Au=new Gt,vs=new P,Dn=new Ln,go=new Ln,Jt=new P,Ft=class n extends bi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:bg++}),this.uuid=Wi(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(hh(e)?Uo:Nr)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let i=this.attributes.normal;if(i!==void 0){let s=new it().getNormalMatrix(e);i.applyNormalMatrix(s),i.needsUpdate=!0}let r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Hn.makeRotationFromQuaternion(e),this.applyMatrix4(Hn),this}rotateX(e){return Hn.makeRotationX(e),this.applyMatrix4(Hn),this}rotateY(e){return Hn.makeRotationY(e),this.applyMatrix4(Hn),this}rotateZ(e){return Hn.makeRotationZ(e),this.applyMatrix4(Hn),this}translate(e,t,i){return Hn.makeTranslation(e,t,i),this.applyMatrix4(Hn),this}scale(e,t,i){return Hn.makeScale(e,t,i),this.applyMatrix4(Hn),this}lookAt(e){return Au.lookAt(e),Au.updateMatrix(),this.applyMatrix4(Au.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(vs).negate(),this.translate(vs.x,vs.y,vs.z),this}setFromPoints(e){let t=this.getAttribute("position");if(t===void 0){let i=[];for(let r=0,s=e.length;r<s;r++){let o=e[r];i.push(o.x,o.y,o.z||0)}this.setAttribute("position",new ut(i,3))}else{let i=Math.min(e.length,t.count);for(let r=0;r<i;r++){let s=e[r];t.setXYZ(r,s.x,s.y,s.z||0)}e.length>t.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Ln);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new P(-1/0,-1/0,-1/0),new P(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,r=t.length;i<r;i++){let s=t[i];Dn.setFromBufferAttribute(s),this.morphTargetsRelative?(Jt.addVectors(this.boundingBox.min,Dn.min),this.boundingBox.expandByPoint(Jt),Jt.addVectors(this.boundingBox.max,Dn.max),this.boundingBox.expandByPoint(Jt)):(this.boundingBox.expandByPoint(Dn.min),this.boundingBox.expandByPoint(Dn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new ri);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new P,1/0);return}if(e){let i=this.boundingSphere.center;if(Dn.setFromBufferAttribute(e),t)for(let s=0,o=t.length;s<o;s++){let a=t[s];go.setFromBufferAttribute(a),this.morphTargetsRelative?(Jt.addVectors(Dn.min,go.min),Dn.expandByPoint(Jt),Jt.addVectors(Dn.max,go.max),Dn.expandByPoint(Jt)):(Dn.expandByPoint(go.min),Dn.expandByPoint(go.max))}Dn.getCenter(i);let r=0;for(let s=0,o=e.count;s<o;s++)Jt.fromBufferAttribute(e,s),r=Math.max(r,i.distanceToSquared(Jt));if(t)for(let s=0,o=t.length;s<o;s++){let a=t[s],l=this.morphTargetsRelative;for(let c=0,u=a.count;c<u;c++)Jt.fromBufferAttribute(a,c),l&&(vs.fromBufferAttribute(e,c),Jt.add(vs)),r=Math.max(r,i.distanceToSquared(Jt))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let i=t.position,r=t.normal,s=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Nt(new Float32Array(4*i.count),4));let o=this.getAttribute("tangent"),a=[],l=[];for(let U=0;U<i.count;U++)a[U]=new P,l[U]=new P;let c=new P,u=new P,h=new P,d=new Ee,f=new Ee,m=new Ee,x=new P,g=new P;function p(U,M,S){c.fromBufferAttribute(i,U),u.fromBufferAttribute(i,M),h.fromBufferAttribute(i,S),d.fromBufferAttribute(s,U),f.fromBufferAttribute(s,M),m.fromBufferAttribute(s,S),u.sub(c),h.sub(c),f.sub(d),m.sub(d);let L=1/(f.x*m.y-m.x*f.y);isFinite(L)&&(x.copy(u).multiplyScalar(m.y).addScaledVector(h,-f.y).multiplyScalar(L),g.copy(h).multiplyScalar(f.x).addScaledVector(u,-m.x).multiplyScalar(L),a[U].add(x),a[M].add(x),a[S].add(x),l[U].add(g),l[M].add(g),l[S].add(g))}let w=this.groups;w.length===0&&(w=[{start:0,count:e.count}]);for(let U=0,M=w.length;U<M;++U){let S=w[U],L=S.start,B=S.count;for(let H=L,Z=L+B;H<Z;H+=3)p(e.getX(H+0),e.getX(H+1),e.getX(H+2))}let b=new P,v=new P,A=new P,R=new P;function I(U){A.fromBufferAttribute(r,U),R.copy(A);let M=a[U];b.copy(M),b.sub(A.multiplyScalar(A.dot(M))).normalize(),v.crossVectors(R,M);let L=v.dot(l[U])<0?-1:1;o.setXYZW(U,b.x,b.y,b.z,L)}for(let U=0,M=w.length;U<M;++U){let S=w[U],L=S.start,B=S.count;for(let H=L,Z=L+B;H<Z;H+=3)I(e.getX(H+0)),I(e.getX(H+1)),I(e.getX(H+2))}}computeVertexNormals(){let e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new Nt(new Float32Array(t.count*3),3),this.setAttribute("normal",i);else for(let d=0,f=i.count;d<f;d++)i.setXYZ(d,0,0,0);let r=new P,s=new P,o=new P,a=new P,l=new P,c=new P,u=new P,h=new P;if(e)for(let d=0,f=e.count;d<f;d+=3){let m=e.getX(d+0),x=e.getX(d+1),g=e.getX(d+2);r.fromBufferAttribute(t,m),s.fromBufferAttribute(t,x),o.fromBufferAttribute(t,g),u.subVectors(o,s),h.subVectors(r,s),u.cross(h),a.fromBufferAttribute(i,m),l.fromBufferAttribute(i,x),c.fromBufferAttribute(i,g),a.add(u),l.add(u),c.add(u),i.setXYZ(m,a.x,a.y,a.z),i.setXYZ(x,l.x,l.y,l.z),i.setXYZ(g,c.x,c.y,c.z)}else for(let d=0,f=t.count;d<f;d+=3)r.fromBufferAttribute(t,d+0),s.fromBufferAttribute(t,d+1),o.fromBufferAttribute(t,d+2),u.subVectors(o,s),h.subVectors(r,s),u.cross(h),i.setXYZ(d+0,u.x,u.y,u.z),i.setXYZ(d+1,u.x,u.y,u.z),i.setXYZ(d+2,u.x,u.y,u.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)Jt.fromBufferAttribute(e,t),Jt.normalize(),e.setXYZ(t,Jt.x,Jt.y,Jt.z)}toNonIndexed(){function e(a,l){let c=a.array,u=a.itemSize,h=a.normalized,d=new c.constructor(l.length*u),f=0,m=0;for(let x=0,g=l.length;x<g;x++){a.isInterleavedBufferAttribute?f=l[x]*a.data.stride+a.offset:f=l[x]*u;for(let p=0;p<u;p++)d[m++]=c[f++]}return new Nt(d,u,h)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let t=new n,i=this.index.array,r=this.attributes;for(let a in r){let l=r[a],c=e(l,i);t.setAttribute(a,c)}let s=this.morphAttributes;for(let a in s){let l=[],c=s[a];for(let u=0,h=c.length;u<h;u++){let d=c[u],f=e(d,i);l.push(f)}t.morphAttributes[a]=l}t.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let a=0,l=o.length;a<l;a++){let c=o[a];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){let e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){let l=this.parameters;for(let c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let i=this.attributes;for(let l in i){let c=i[l];e.data.attributes[l]=c.toJSON(e.data)}let r={},s=!1;for(let l in this.morphAttributes){let c=this.morphAttributes[l],u=[];for(let h=0,d=c.length;h<d;h++){let f=c[h];u.push(f.toJSON(e.data))}u.length>0&&(r[l]=u,s=!0)}s&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);let o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));let a=this.boundingSphere;return a!==null&&(e.data.boundingSphere=a.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let i=e.index;i!==null&&this.setIndex(i.clone());let r=e.attributes;for(let c in r){let u=r[c];this.setAttribute(c,u.clone(t))}let s=e.morphAttributes;for(let c in s){let u=[],h=s[c];for(let d=0,f=h.length;d<f;d++)u.push(h[d].clone(t));this.morphAttributes[c]=u}this.morphTargetsRelative=e.morphTargetsRelative;let o=e.groups;for(let c=0,u=o.length;c<u;c++){let h=o[c];this.addGroup(h.start,h.count,h.materialIndex)}let a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());let l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}},Dd=new ot,Tr=new Rs,Ha=new ri,Ld=new P,Va=new P,Ga=new P,Wa=new P,Ru=new P,Xa=new P,Ud=new P,$a=new P,Ct=class extends Gt{constructor(e=new Ft,t=new Lo){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){let r=t[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){let a=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}getVertexPosition(e,t){let i=this.geometry,r=i.attributes.position,s=i.morphAttributes.position,o=i.morphTargetsRelative;t.fromBufferAttribute(r,e);let a=this.morphTargetInfluences;if(s&&a){Xa.set(0,0,0);for(let l=0,c=s.length;l<c;l++){let u=a[l],h=s[l];u!==0&&(Ru.fromBufferAttribute(h,e),o?Xa.addScaledVector(Ru,u):Xa.addScaledVector(Ru.sub(t),u))}t.add(Xa)}return t}raycast(e,t){let i=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),Ha.copy(i.boundingSphere),Ha.applyMatrix4(s),Tr.copy(e.ray).recast(e.near),!(Ha.containsPoint(Tr.origin)===!1&&(Tr.intersectSphere(Ha,Ld)===null||Tr.origin.distanceToSquared(Ld)>(e.far-e.near)**2))&&(Dd.copy(s).invert(),Tr.copy(e.ray).applyMatrix4(Dd),!(i.boundingBox!==null&&Tr.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,t,Tr)))}_computeIntersections(e,t,i){let r,s=this.geometry,o=this.material,a=s.index,l=s.attributes.position,c=s.attributes.uv,u=s.attributes.uv1,h=s.attributes.normal,d=s.groups,f=s.drawRange;if(a!==null)if(Array.isArray(o))for(let m=0,x=d.length;m<x;m++){let g=d[m],p=o[g.materialIndex],w=Math.max(g.start,f.start),b=Math.min(a.count,Math.min(g.start+g.count,f.start+f.count));for(let v=w,A=b;v<A;v+=3){let R=a.getX(v),I=a.getX(v+1),U=a.getX(v+2);r=qa(this,p,e,i,c,u,h,R,I,U),r&&(r.faceIndex=Math.floor(v/3),r.face.materialIndex=g.materialIndex,t.push(r))}}else{let m=Math.max(0,f.start),x=Math.min(a.count,f.start+f.count);for(let g=m,p=x;g<p;g+=3){let w=a.getX(g),b=a.getX(g+1),v=a.getX(g+2);r=qa(this,o,e,i,c,u,h,w,b,v),r&&(r.faceIndex=Math.floor(g/3),t.push(r))}}else if(l!==void 0)if(Array.isArray(o))for(let m=0,x=d.length;m<x;m++){let g=d[m],p=o[g.materialIndex],w=Math.max(g.start,f.start),b=Math.min(l.count,Math.min(g.start+g.count,f.start+f.count));for(let v=w,A=b;v<A;v+=3){let R=v,I=v+1,U=v+2;r=qa(this,p,e,i,c,u,h,R,I,U),r&&(r.faceIndex=Math.floor(v/3),r.face.materialIndex=g.materialIndex,t.push(r))}}else{let m=Math.max(0,f.start),x=Math.min(l.count,f.start+f.count);for(let g=m,p=x;g<p;g+=3){let w=g,b=g+1,v=g+2;r=qa(this,o,e,i,c,u,h,w,b,v),r&&(r.faceIndex=Math.floor(g/3),t.push(r))}}}};function Mg(n,e,t,i,r,s,o,a){let l;if(e.side===mn?l=i.intersectTriangle(o,s,r,!0,a):l=i.intersectTriangle(r,s,o,e.side===Vn,a),l===null)return null;$a.copy(a),$a.applyMatrix4(n.matrixWorld);let c=t.ray.origin.distanceTo($a);return c<t.near||c>t.far?null:{distance:c,point:$a.clone(),object:n}}function qa(n,e,t,i,r,s,o,a,l,c){n.getVertexPosition(a,Va),n.getVertexPosition(l,Ga),n.getVertexPosition(c,Wa);let u=Mg(n,e,t,i,Va,Ga,Wa,Ud);if(u){let h=new P;rr.getBarycoord(Ud,Va,Ga,Wa,h),r&&(u.uv=rr.getInterpolatedAttribute(r,a,l,c,h,new Ee)),s&&(u.uv1=rr.getInterpolatedAttribute(s,a,l,c,h,new Ee)),o&&(u.normal=rr.getInterpolatedAttribute(o,a,l,c,h,new P),u.normal.dot(i.direction)>0&&u.normal.multiplyScalar(-1));let d={a,b:l,c,normal:new P,materialIndex:0};rr.getNormal(Va,Ga,Wa,d.normal),u.face=d,u.barycoord=h}return u}var si=class n extends Ft{constructor(e=1,t=1,i=1,r=1,s=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:r,heightSegments:s,depthSegments:o};let a=this;r=Math.floor(r),s=Math.floor(s),o=Math.floor(o);let l=[],c=[],u=[],h=[],d=0,f=0;m("z","y","x",-1,-1,i,t,e,o,s,0),m("z","y","x",1,-1,i,t,-e,o,s,1),m("x","z","y",1,1,e,i,t,r,o,2),m("x","z","y",1,-1,e,i,-t,r,o,3),m("x","y","z",1,-1,e,t,i,r,s,4),m("x","y","z",-1,-1,e,t,-i,r,s,5),this.setIndex(l),this.setAttribute("position",new ut(c,3)),this.setAttribute("normal",new ut(u,3)),this.setAttribute("uv",new ut(h,2));function m(x,g,p,w,b,v,A,R,I,U,M){let S=v/I,L=A/U,B=v/2,H=A/2,Z=R/2,X=I+1,J=U+1,le=0,$=0,_e=new P;for(let we=0;we<J;we++){let Le=we*L-H;for(let je=0;je<X;je++){let at=je*S-B;_e[x]=at*w,_e[g]=Le*b,_e[p]=Z,c.push(_e.x,_e.y,_e.z),_e[x]=0,_e[g]=0,_e[p]=R>0?1:-1,u.push(_e.x,_e.y,_e.z),h.push(je/I),h.push(1-we/U),le+=1}}for(let we=0;we<U;we++)for(let Le=0;Le<I;Le++){let je=d+Le+X*we,at=d+Le+X*(we+1),lt=d+(Le+1)+X*(we+1),ct=d+(Le+1)+X*we;l.push(je,at,ct),l.push(at,lt,ct),$+=6}a.addGroup(f,$,M),f+=$,d+=le}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}};function $r(n){let e={};for(let t in n){e[t]={};for(let i in n[t]){let r=n[t][i];r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)?r.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][i]=null):e[t][i]=r.clone():Array.isArray(r)?e[t][i]=r.slice():e[t][i]=r}}return e}function un(n){let e={};for(let t=0;t<n.length;t++){let i=$r(n[t]);for(let r in i)e[r]=i[r]}return e}function Sg(n){let e=[];for(let t=0;t<n.length;t++)e.push(n[t].clone());return e}function dh(n){let e=n.getRenderTarget();return e===null?n.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:dt.workingColorSpace}var Zf={clone:$r,merge:un},Eg=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,wg=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,Mn=class extends Si{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Eg,this.fragmentShader=wg,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=$r(e.uniforms),this.uniformsGroups=Sg(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let r in this.uniforms){let o=this.uniforms[r].value;o&&o.isTexture?t.uniforms[r]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[r]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[r]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[r]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[r]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[r]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[r]={type:"m4",value:o.toArray()}:t.uniforms[r]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let i={};for(let r in this.extensions)this.extensions[r]===!0&&(i[r]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}},No=class extends Gt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ot,this.projectionMatrix=new ot,this.projectionMatrixInverse=new ot,this.coordinateSystem=ni,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}},ir=new P,Nd=new Ee,Fd=new Ee,nn=class extends No{constructor(e=50,t=1,i=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=ws*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(Mo*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return ws*2*Math.atan(Math.tan(Mo*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,i){ir.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(ir.x,ir.y).multiplyScalar(-e/ir.z),ir.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(ir.x,ir.y).multiplyScalar(-e/ir.z)}getViewSize(e,t){return this.getViewBounds(e,Nd,Fd),t.subVectors(Fd,Nd)}setViewOffset(e,t,i,r,s,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(Mo*.5*this.fov)/this.zoom,i=2*t,r=this.aspect*i,s=-.5*r,o=this.view;if(this.view!==null&&this.view.enabled){let l=o.fullWidth,c=o.fullHeight;s+=o.offsetX*r/l,t-=o.offsetY*i/c,r*=o.width/l,i*=o.height/c}let a=this.filmOffset;a!==0&&(s+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,t,t-i,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}},ys=-90,_s=1,dl=class extends Gt{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;let r=new nn(ys,_s,e,t);r.layers=this.layers,this.add(r);let s=new nn(ys,_s,e,t);s.layers=this.layers,this.add(s);let o=new nn(ys,_s,e,t);o.layers=this.layers,this.add(o);let a=new nn(ys,_s,e,t);a.layers=this.layers,this.add(a);let l=new nn(ys,_s,e,t);l.layers=this.layers,this.add(l);let c=new nn(ys,_s,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[i,r,s,o,a,l]=t;for(let c of t)this.remove(c);if(e===ni)i.up.set(0,1,0),i.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===Co)i.up.set(0,-1,0),i.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(let c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:i,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[s,o,a,l,c,u]=this.children,h=e.getRenderTarget(),d=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),m=e.xr.enabled;e.xr.enabled=!1;let x=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,e.setRenderTarget(i,0,r),e.render(t,s),e.setRenderTarget(i,1,r),e.render(t,o),e.setRenderTarget(i,2,r),e.render(t,a),e.setRenderTarget(i,3,r),e.render(t,l),e.setRenderTarget(i,4,r),e.render(t,c),i.texture.generateMipmaps=x,e.setRenderTarget(i,5,r),e.render(t,u),e.setRenderTarget(h,d,f),e.xr.enabled=m,i.texture.needsPMREMUpdate=!0}},Fo=class extends bn{constructor(e=[],t=Wr,i,r,s,o,a,l,c,u){super(e,t,i,r,s,o,a,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},fl=class extends Mi{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let i={width:e,height:e,depth:1},r=[i,i,i,i,i,i];this.texture=new Fo(r),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let i={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},r=new si(5,5,5),s=new Mn({name:"CubemapFromEquirect",uniforms:$r(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:mn,blending:Vi});s.uniforms.tEquirect.value=t;let o=new Ct(r,s),a=t.minFilter;return t.minFilter===cr&&(t.minFilter=ii),new dl(1,10,this).update(e,o),t.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,t=!0,i=!0,r=!0){let s=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,i,r);e.setRenderTarget(s)}},rn=class extends Gt{constructor(){super(),this.isGroup=!0,this.type="Group"}},Tg={type:"move"},Cs=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new rn,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new rn,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new P,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new P),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new rn,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new P,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new P),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let r=null,s=null,o=null,a=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){o=!0;for(let x of e.hand.values()){let g=t.getJointPose(x,i),p=this._getHandJoint(c,x);g!==null&&(p.matrix.fromArray(g.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=g.radius),p.visible=g!==null}let u=c.joints["index-finger-tip"],h=c.joints["thumb-tip"],d=u.position.distanceTo(h.position),f=.02,m=.005;c.inputState.pinching&&d>f+m?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&d<=f-m&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,i),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(r=t.getPose(e.targetRaySpace,i),r===null&&s!==null&&(r=s),r!==null&&(a.matrix.fromArray(r.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,r.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(r.linearVelocity)):a.hasLinearVelocity=!1,r.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(r.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(Tg)))}return a!==null&&(a.visible=r!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let i=new rn;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}};var Oo=class n{constructor(e,t=1,i=1e3){this.isFog=!0,this.name="",this.color=new tt(e),this.near=t,this.far=i}clone(){return new n(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}},zo=class extends Gt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Gn,this.environmentIntensity=1,this.environmentRotation=new Gn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}};var Od=new P,zd=new pt,Bd=new pt,Ag=new P,kd=new ot,Ya=new P,Cu=new ri,Hd=new ot,Iu=new Rs,Bo=class extends Ct{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=zu,this.bindMatrix=new ot,this.bindMatrixInverse=new ot,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){let e=this.geometry;this.boundingBox===null&&(this.boundingBox=new Ln),this.boundingBox.makeEmpty();let t=e.getAttribute("position");for(let i=0;i<t.count;i++)this.getVertexPosition(i,Ya),this.boundingBox.expandByPoint(Ya)}computeBoundingSphere(){let e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new ri),this.boundingSphere.makeEmpty();let t=e.getAttribute("position");for(let i=0;i<t.count;i++)this.getVertexPosition(i,Ya),this.boundingSphere.expandByPoint(Ya)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,t){let i=this.material,r=this.matrixWorld;i!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Cu.copy(this.boundingSphere),Cu.applyMatrix4(r),e.ray.intersectsSphere(Cu)!==!1&&(Hd.copy(r).invert(),Iu.copy(e.ray).applyMatrix4(Hd),!(this.boundingBox!==null&&Iu.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(e,t,Iu)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){let e=new pt,t=this.geometry.attributes.skinWeight;for(let i=0,r=t.count;i<r;i++){e.fromBufferAttribute(t,i);let s=1/e.manhattanLength();s!==1/0?e.multiplyScalar(s):e.set(1,0,0,0),t.setXYZW(i,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===zu?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===If?this.bindMatrixInverse.copy(this.bindMatrix).invert():console.warn("THREE.SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){let i=this.skeleton,r=this.geometry;zd.fromBufferAttribute(r.attributes.skinIndex,e),Bd.fromBufferAttribute(r.attributes.skinWeight,e),Od.copy(t).applyMatrix4(this.bindMatrix),t.set(0,0,0);for(let s=0;s<4;s++){let o=Bd.getComponent(s);if(o!==0){let a=zd.getComponent(s);kd.multiplyMatrices(i.bones[a].matrixWorld,i.boneInverses[a]),t.addScaledVector(Ag.copy(Od).applyMatrix4(kd),o)}}return t.applyMatrix4(this.bindMatrixInverse)}},Is=class extends Gt{constructor(){super(),this.isBone=!0,this.type="Bone"}},ko=class extends bn{constructor(e=null,t=1,i=1,r,s,o,a,l,c=_n,u=_n,h,d){super(null,o,a,l,c,u,r,s,h,d),this.isDataTexture=!0,this.image={data:e,width:t,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},Vd=new ot,Rg=new ot,Ho=class n{constructor(e=[],t=[]){this.uuid=Wi(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){let e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){console.warn("THREE.Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let i=0,r=this.bones.length;i<r;i++)this.boneInverses.push(new ot)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){let i=new ot;this.bones[e]&&i.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(i)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){let i=this.bones[e];i&&i.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){let i=this.bones[e];i&&(i.parent&&i.parent.isBone?(i.matrix.copy(i.parent.matrixWorld).invert(),i.matrix.multiply(i.matrixWorld)):i.matrix.copy(i.matrixWorld),i.matrix.decompose(i.position,i.quaternion,i.scale))}}update(){let e=this.bones,t=this.boneInverses,i=this.boneMatrices,r=this.boneTexture;for(let s=0,o=e.length;s<o;s++){let a=e[s]?e[s].matrixWorld:Rg;Vd.multiplyMatrices(a,t[s]),Vd.toArray(i,s*16)}r!==null&&(r.needsUpdate=!0)}clone(){return new n(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);let t=new Float32Array(e*e*4);t.set(this.boneMatrices);let i=new ko(t,e,e,Nn,$n);return i.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=i,this}getBoneByName(e){for(let t=0,i=this.bones.length;t<i;t++){let r=this.bones[t];if(r.name===e)return r}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let i=0,r=e.bones.length;i<r;i++){let s=e.bones[i],o=t[s];o===void 0&&(console.warn("THREE.Skeleton: No bone found with UUID:",s),o=new Is),this.bones.push(o),this.boneInverses.push(new ot().fromArray(e.boneInverses[i]))}return this.init(),this}toJSON(){let e={metadata:{version:4.7,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;let t=this.bones,i=this.boneInverses;for(let r=0,s=t.length;r<s;r++){let o=t[r];e.bones.push(o.uuid);let a=i[r];e.boneInverses.push(a.toArray())}return e}},Ps=class extends Nt{constructor(e,t,i,r=1){super(e,t,i),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=r}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){let e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}},bs=new ot,Gd=new ot,Za=[],Wd=new Ln,Cg=new ot,xo=new Ct,vo=new ri,Ds=class extends Ct{constructor(e,t,i){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new Ps(new Float32Array(i*16),16),this.instanceColor=null,this.morphTexture=null,this.count=i,this.boundingBox=null,this.boundingSphere=null;for(let r=0;r<i;r++)this.setMatrixAt(r,Cg)}computeBoundingBox(){let e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new Ln),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let i=0;i<t;i++)this.getMatrixAt(i,bs),Wd.copy(e.boundingBox).applyMatrix4(bs),this.boundingBox.union(Wd)}computeBoundingSphere(){let e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new ri),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let i=0;i<t;i++)this.getMatrixAt(i,bs),vo.copy(e.boundingSphere).applyMatrix4(bs),this.boundingSphere.union(vo)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){let i=t.morphTargetInfluences,r=this.morphTexture.source.data.data,s=i.length+1,o=e*s+1;for(let a=0;a<i.length;a++)i[a]=r[o+a]}raycast(e,t){let i=this.matrixWorld,r=this.count;if(xo.geometry=this.geometry,xo.material=this.material,xo.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),vo.copy(this.boundingSphere),vo.applyMatrix4(i),e.ray.intersectsSphere(vo)!==!1))for(let s=0;s<r;s++){this.getMatrixAt(s,bs),Gd.multiplyMatrices(i,bs),xo.matrixWorld=Gd,xo.raycast(e,Za);for(let o=0,a=Za.length;o<a;o++){let l=Za[o];l.instanceId=s,l.object=this,t.push(l)}Za.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new Ps(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}setMorphAt(e,t){let i=t.morphTargetInfluences,r=i.length+1;this.morphTexture===null&&(this.morphTexture=new ko(new Float32Array(r*this.count),r,this.count,ql,$n));let s=this.morphTexture.source.data.data,o=0;for(let c=0;c<i.length;c++)o+=i[c];let a=this.geometry.morphTargetsRelative?1:1-o,l=r*e;s[l]=a,s.set(i,l+1)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}},Pu=new P,Ig=new P,Pg=new it,_i=class{constructor(e=new P(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,r){return this.normal.set(e,t,i),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){let r=Pu.subVectors(i,t).cross(Ig.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){let i=e.delta(Pu),r=this.normal.dot(i);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let s=-(e.start.dot(this.normal)+this.constant)/r;return s<0||s>1?null:t.copy(e.start).addScaledVector(i,s)}intersectsLine(e){let t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let i=t||Pg.getNormalMatrix(e),r=this.coplanarPoint(Pu).applyMatrix4(e),s=this.normal.applyMatrix3(i).normalize();return this.constant=-r.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}},Ar=new ri,Dg=new Ee(.5,.5),Ja=new P,Ls=class{constructor(e=new _i,t=new _i,i=new _i,r=new _i,s=new _i,o=new _i){this.planes=[e,t,i,r,s,o]}set(e,t,i,r,s,o){let a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(i),a[3].copy(r),a[4].copy(s),a[5].copy(o),this}copy(e){let t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=ni,i=!1){let r=this.planes,s=e.elements,o=s[0],a=s[1],l=s[2],c=s[3],u=s[4],h=s[5],d=s[6],f=s[7],m=s[8],x=s[9],g=s[10],p=s[11],w=s[12],b=s[13],v=s[14],A=s[15];if(r[0].setComponents(c-o,f-u,p-m,A-w).normalize(),r[1].setComponents(c+o,f+u,p+m,A+w).normalize(),r[2].setComponents(c+a,f+h,p+x,A+b).normalize(),r[3].setComponents(c-a,f-h,p-x,A-b).normalize(),i)r[4].setComponents(l,d,g,v).normalize(),r[5].setComponents(c-l,f-d,p-g,A-v).normalize();else if(r[4].setComponents(c-l,f-d,p-g,A-v).normalize(),t===ni)r[5].setComponents(c+l,f+d,p+g,A+v).normalize();else if(t===Co)r[5].setComponents(l,d,g,v).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Ar.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Ar.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Ar)}intersectsSprite(e){Ar.center.set(0,0,0);let t=Dg.distanceTo(e.center);return Ar.radius=.7071067811865476+t,Ar.applyMatrix4(e.matrixWorld),this.intersectsSphere(Ar)}intersectsSphere(e){let t=this.planes,i=e.center,r=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(i)<r)return!1;return!0}intersectsBox(e){let t=this.planes;for(let i=0;i<6;i++){let r=t[i];if(Ja.x=r.normal.x>0?e.max.x:e.min.x,Ja.y=r.normal.y>0?e.max.y:e.min.y,Ja.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(Ja)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};var Us=class extends Si{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new tt(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}},pl=new P,ml=new P,Xd=new ot,yo=new Rs,Ka=new ri,Du=new P,$d=new P,Vo=class extends Gt{constructor(e=new Ft,t=new Us){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,i=[0];for(let r=1,s=t.count;r<s;r++)pl.fromBufferAttribute(t,r-1),ml.fromBufferAttribute(t,r),i[r]=i[r-1],i[r]+=pl.distanceTo(ml);e.setAttribute("lineDistance",new ut(i,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){let i=this.geometry,r=this.matrixWorld,s=e.params.Line.threshold,o=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),Ka.copy(i.boundingSphere),Ka.applyMatrix4(r),Ka.radius+=s,e.ray.intersectsSphere(Ka)===!1)return;Xd.copy(r).invert(),yo.copy(e.ray).applyMatrix4(Xd);let a=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=this.isLineSegments?2:1,u=i.index,d=i.attributes.position;if(u!==null){let f=Math.max(0,o.start),m=Math.min(u.count,o.start+o.count);for(let x=f,g=m-1;x<g;x+=c){let p=u.getX(x),w=u.getX(x+1),b=ja(this,e,yo,l,p,w,x);b&&t.push(b)}if(this.isLineLoop){let x=u.getX(m-1),g=u.getX(f),p=ja(this,e,yo,l,x,g,m-1);p&&t.push(p)}}else{let f=Math.max(0,o.start),m=Math.min(d.count,o.start+o.count);for(let x=f,g=m-1;x<g;x+=c){let p=ja(this,e,yo,l,x,x+1,x);p&&t.push(p)}if(this.isLineLoop){let x=ja(this,e,yo,l,m-1,f,m-1);x&&t.push(x)}}}updateMorphTargets(){let t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){let r=t[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){let a=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}};function ja(n,e,t,i,r,s,o){let a=n.geometry.attributes.position;if(pl.fromBufferAttribute(a,r),ml.fromBufferAttribute(a,s),t.distanceSqToSegment(pl,ml,Du,$d)>i)return;Du.applyMatrix4(n.matrixWorld);let c=e.ray.origin.distanceTo(Du);if(!(c<e.near||c>e.far))return{distance:c,point:$d.clone().applyMatrix4(n.matrixWorld),index:o,face:null,faceIndex:null,barycoord:null,object:n}}var Go=class extends bn{constructor(e,t,i=ur,r,s,o,a=_n,l=_n,c,u=Es,h=1){if(u!==Es&&u!==Gs)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let d={width:e,height:t,depth:h};super(d,r,s,o,a,l,u,i,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new As(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}},Wo=class extends bn{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}};var Wn=class n extends Ft{constructor(e=1,t=1,i=1,r=32,s=1,o=!1,a=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:i,radialSegments:r,heightSegments:s,openEnded:o,thetaStart:a,thetaLength:l};let c=this;r=Math.floor(r),s=Math.floor(s);let u=[],h=[],d=[],f=[],m=0,x=[],g=i/2,p=0;w(),o===!1&&(e>0&&b(!0),t>0&&b(!1)),this.setIndex(u),this.setAttribute("position",new ut(h,3)),this.setAttribute("normal",new ut(d,3)),this.setAttribute("uv",new ut(f,2));function w(){let v=new P,A=new P,R=0,I=(t-e)/i;for(let U=0;U<=s;U++){let M=[],S=U/s,L=S*(t-e)+e;for(let B=0;B<=r;B++){let H=B/r,Z=H*l+a,X=Math.sin(Z),J=Math.cos(Z);A.x=L*X,A.y=-S*i+g,A.z=L*J,h.push(A.x,A.y,A.z),v.set(X,I,J).normalize(),d.push(v.x,v.y,v.z),f.push(H,1-S),M.push(m++)}x.push(M)}for(let U=0;U<r;U++)for(let M=0;M<s;M++){let S=x[M][U],L=x[M+1][U],B=x[M+1][U+1],H=x[M][U+1];(e>0||M!==0)&&(u.push(S,L,H),R+=3),(t>0||M!==s-1)&&(u.push(L,B,H),R+=3)}c.addGroup(p,R,0),p+=R}function b(v){let A=m,R=new Ee,I=new P,U=0,M=v===!0?e:t,S=v===!0?1:-1;for(let B=1;B<=r;B++)h.push(0,g*S,0),d.push(0,S,0),f.push(.5,.5),m++;let L=m;for(let B=0;B<=r;B++){let Z=B/r*l+a,X=Math.cos(Z),J=Math.sin(Z);I.x=M*J,I.y=g*S,I.z=M*X,h.push(I.x,I.y,I.z),d.push(0,S,0),R.x=X*.5+.5,R.y=J*.5*S+.5,f.push(R.x,R.y),m++}for(let B=0;B<r;B++){let H=A+B,Z=L+B;v===!0?u.push(Z,Z+1,H):u.push(Z+1,Z,H),U+=3}c.addGroup(p,U,v===!0?1:2),p+=U}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}},Fr=class n extends Wn{constructor(e=1,t=1,i=32,r=1,s=!1,o=0,a=Math.PI*2){super(0,e,t,i,r,s,o,a),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:i,heightSegments:r,openEnded:s,thetaStart:o,thetaLength:a}}static fromJSON(e){return new n(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}},Xo=class n extends Ft{constructor(e=[],t=[],i=1,r=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:i,detail:r};let s=[],o=[];a(r),c(i),u(),this.setAttribute("position",new ut(s,3)),this.setAttribute("normal",new ut(s.slice(),3)),this.setAttribute("uv",new ut(o,2)),r===0?this.computeVertexNormals():this.normalizeNormals();function a(w){let b=new P,v=new P,A=new P;for(let R=0;R<t.length;R+=3)f(t[R+0],b),f(t[R+1],v),f(t[R+2],A),l(b,v,A,w)}function l(w,b,v,A){let R=A+1,I=[];for(let U=0;U<=R;U++){I[U]=[];let M=w.clone().lerp(v,U/R),S=b.clone().lerp(v,U/R),L=R-U;for(let B=0;B<=L;B++)B===0&&U===R?I[U][B]=M:I[U][B]=M.clone().lerp(S,B/L)}for(let U=0;U<R;U++)for(let M=0;M<2*(R-U)-1;M++){let S=Math.floor(M/2);M%2===0?(d(I[U][S+1]),d(I[U+1][S]),d(I[U][S])):(d(I[U][S+1]),d(I[U+1][S+1]),d(I[U+1][S]))}}function c(w){let b=new P;for(let v=0;v<s.length;v+=3)b.x=s[v+0],b.y=s[v+1],b.z=s[v+2],b.normalize().multiplyScalar(w),s[v+0]=b.x,s[v+1]=b.y,s[v+2]=b.z}function u(){let w=new P;for(let b=0;b<s.length;b+=3){w.x=s[b+0],w.y=s[b+1],w.z=s[b+2];let v=g(w)/2/Math.PI+.5,A=p(w)/Math.PI+.5;o.push(v,1-A)}m(),h()}function h(){for(let w=0;w<o.length;w+=6){let b=o[w+0],v=o[w+2],A=o[w+4],R=Math.max(b,v,A),I=Math.min(b,v,A);R>.9&&I<.1&&(b<.2&&(o[w+0]+=1),v<.2&&(o[w+2]+=1),A<.2&&(o[w+4]+=1))}}function d(w){s.push(w.x,w.y,w.z)}function f(w,b){let v=w*3;b.x=e[v+0],b.y=e[v+1],b.z=e[v+2]}function m(){let w=new P,b=new P,v=new P,A=new P,R=new Ee,I=new Ee,U=new Ee;for(let M=0,S=0;M<s.length;M+=9,S+=6){w.set(s[M+0],s[M+1],s[M+2]),b.set(s[M+3],s[M+4],s[M+5]),v.set(s[M+6],s[M+7],s[M+8]),R.set(o[S+0],o[S+1]),I.set(o[S+2],o[S+3]),U.set(o[S+4],o[S+5]),A.copy(w).add(b).add(v).divideScalar(3);let L=g(A);x(R,S+0,w,L),x(I,S+2,b,L),x(U,S+4,v,L)}}function x(w,b,v,A){A<0&&w.x===1&&(o[b]=w.x-1),v.x===0&&v.z===0&&(o[b]=A/2/Math.PI+.5)}function g(w){return Math.atan2(w.z,-w.x)}function p(w){return Math.atan2(-w.y,Math.sqrt(w.x*w.x+w.z*w.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.vertices,e.indices,e.radius,e.details)}};var Un=class{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){console.warn("THREE.Curve: .getPoint() not implemented.")}getPointAt(e,t){let i=this.getUtoTmapping(e);return this.getPoint(i,t)}getPoints(e=5){let t=[];for(let i=0;i<=e;i++)t.push(this.getPoint(i/e));return t}getSpacedPoints(e=5){let t=[];for(let i=0;i<=e;i++)t.push(this.getPointAt(i/e));return t}getLength(){let e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let t=[],i,r=this.getPoint(0),s=0;t.push(0);for(let o=1;o<=e;o++)i=this.getPoint(o/e),s+=i.distanceTo(r),t.push(s),r=i;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){let i=this.getLengths(),r=0,s=i.length,o;t?o=t:o=e*i[s-1];let a=0,l=s-1,c;for(;a<=l;)if(r=Math.floor(a+(l-a)/2),c=i[r]-o,c<0)a=r+1;else if(c>0)l=r-1;else{l=r;break}if(r=l,i[r]===o)return r/(s-1);let u=i[r],d=i[r+1]-u,f=(o-u)/d;return(r+f)/(s-1)}getTangent(e,t){let r=e-1e-4,s=e+1e-4;r<0&&(r=0),s>1&&(s=1);let o=this.getPoint(r),a=this.getPoint(s),l=t||(o.isVector2?new Ee:new P);return l.copy(a).sub(o).normalize(),l}getTangentAt(e,t){let i=this.getUtoTmapping(e);return this.getTangent(i,t)}computeFrenetFrames(e,t=!1){let i=new P,r=[],s=[],o=[],a=new P,l=new ot;for(let f=0;f<=e;f++){let m=f/e;r[f]=this.getTangentAt(m,new P)}s[0]=new P,o[0]=new P;let c=Number.MAX_VALUE,u=Math.abs(r[0].x),h=Math.abs(r[0].y),d=Math.abs(r[0].z);u<=c&&(c=u,i.set(1,0,0)),h<=c&&(c=h,i.set(0,1,0)),d<=c&&i.set(0,0,1),a.crossVectors(r[0],i).normalize(),s[0].crossVectors(r[0],a),o[0].crossVectors(r[0],s[0]);for(let f=1;f<=e;f++){if(s[f]=s[f-1].clone(),o[f]=o[f-1].clone(),a.crossVectors(r[f-1],r[f]),a.length()>Number.EPSILON){a.normalize();let m=Math.acos(st(r[f-1].dot(r[f]),-1,1));s[f].applyMatrix4(l.makeRotationAxis(a,m))}o[f].crossVectors(r[f],s[f])}if(t===!0){let f=Math.acos(st(s[0].dot(s[e]),-1,1));f/=e,r[0].dot(a.crossVectors(s[0],s[e]))>0&&(f=-f);for(let m=1;m<=e;m++)s[m].applyMatrix4(l.makeRotationAxis(r[m],f*m)),o[m].crossVectors(r[m],s[m])}return{tangents:r,normals:s,binormals:o}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){let e={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}},Ns=class extends Un{constructor(e=0,t=0,i=1,r=1,s=0,o=Math.PI*2,a=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=i,this.yRadius=r,this.aStartAngle=s,this.aEndAngle=o,this.aClockwise=a,this.aRotation=l}getPoint(e,t=new Ee){let i=t,r=Math.PI*2,s=this.aEndAngle-this.aStartAngle,o=Math.abs(s)<Number.EPSILON;for(;s<0;)s+=r;for(;s>r;)s-=r;s<Number.EPSILON&&(o?s=0:s=r),this.aClockwise===!0&&!o&&(s===r?s=-r:s=s-r);let a=this.aStartAngle+e*s,l=this.aX+this.xRadius*Math.cos(a),c=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){let u=Math.cos(this.aRotation),h=Math.sin(this.aRotation),d=l-this.aX,f=c-this.aY;l=d*u-f*h+this.aX,c=d*h+f*u+this.aY}return i.set(l,c)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){let e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}},gl=class extends Ns{constructor(e,t,i,r,s,o){super(e,t,i,i,r,s,o),this.isArcCurve=!0,this.type="ArcCurve"}};function fh(){let n=0,e=0,t=0,i=0;function r(s,o,a,l){n=s,e=a,t=-3*s+3*o-2*a-l,i=2*s-2*o+a+l}return{initCatmullRom:function(s,o,a,l,c){r(o,a,c*(a-s),c*(l-o))},initNonuniformCatmullRom:function(s,o,a,l,c,u,h){let d=(o-s)/c-(a-s)/(c+u)+(a-o)/u,f=(a-o)/u-(l-o)/(u+h)+(l-a)/h;d*=u,f*=u,r(o,a,d,f)},calc:function(s){let o=s*s,a=o*s;return n+e*s+t*o+i*a}}}var Qa=new P,Lu=new fh,Uu=new fh,Nu=new fh,Fs=class extends Un{constructor(e=[],t=!1,i="centripetal",r=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=i,this.tension=r}getPoint(e,t=new P){let i=t,r=this.points,s=r.length,o=(s-(this.closed?0:1))*e,a=Math.floor(o),l=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/s)+1)*s:l===0&&a===s-1&&(a=s-2,l=1);let c,u;this.closed||a>0?c=r[(a-1)%s]:(Qa.subVectors(r[0],r[1]).add(r[0]),c=Qa);let h=r[a%s],d=r[(a+1)%s];if(this.closed||a+2<s?u=r[(a+2)%s]:(Qa.subVectors(r[s-1],r[s-2]).add(r[s-1]),u=Qa),this.curveType==="centripetal"||this.curveType==="chordal"){let f=this.curveType==="chordal"?.5:.25,m=Math.pow(c.distanceToSquared(h),f),x=Math.pow(h.distanceToSquared(d),f),g=Math.pow(d.distanceToSquared(u),f);x<1e-4&&(x=1),m<1e-4&&(m=x),g<1e-4&&(g=x),Lu.initNonuniformCatmullRom(c.x,h.x,d.x,u.x,m,x,g),Uu.initNonuniformCatmullRom(c.y,h.y,d.y,u.y,m,x,g),Nu.initNonuniformCatmullRom(c.z,h.z,d.z,u.z,m,x,g)}else this.curveType==="catmullrom"&&(Lu.initCatmullRom(c.x,h.x,d.x,u.x,this.tension),Uu.initCatmullRom(c.y,h.y,d.y,u.y,this.tension),Nu.initCatmullRom(c.z,h.z,d.z,u.z,this.tension));return i.set(Lu.calc(l),Uu.calc(l),Nu.calc(l)),i}copy(e){super.copy(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){let r=e.points[t];this.points.push(r.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,i=this.points.length;t<i;t++){let r=this.points[t];e.points.push(r.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){let r=e.points[t];this.points.push(new P().fromArray(r))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}};function qd(n,e,t,i,r){let s=(i-e)*.5,o=(r-t)*.5,a=n*n,l=n*a;return(2*t-2*i+s+o)*l+(-3*t+3*i-2*s-o)*a+s*n+t}function Lg(n,e){let t=1-n;return t*t*e}function Ug(n,e){return 2*(1-n)*n*e}function Ng(n,e){return n*n*e}function Eo(n,e,t,i){return Lg(n,e)+Ug(n,t)+Ng(n,i)}function Fg(n,e){let t=1-n;return t*t*t*e}function Og(n,e){let t=1-n;return 3*t*t*n*e}function zg(n,e){return 3*(1-n)*n*n*e}function Bg(n,e){return n*n*n*e}function wo(n,e,t,i,r){return Fg(n,e)+Og(n,t)+zg(n,i)+Bg(n,r)}var $o=class extends Un{constructor(e=new Ee,t=new Ee,i=new Ee,r=new Ee){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=i,this.v3=r}getPoint(e,t=new Ee){let i=t,r=this.v0,s=this.v1,o=this.v2,a=this.v3;return i.set(wo(e,r.x,s.x,o.x,a.x),wo(e,r.y,s.y,o.y,a.y)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},xl=class extends Un{constructor(e=new P,t=new P,i=new P,r=new P){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=i,this.v3=r}getPoint(e,t=new P){let i=t,r=this.v0,s=this.v1,o=this.v2,a=this.v3;return i.set(wo(e,r.x,s.x,o.x,a.x),wo(e,r.y,s.y,o.y,a.y),wo(e,r.z,s.z,o.z,a.z)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},qo=class extends Un{constructor(e=new Ee,t=new Ee){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new Ee){let i=t;return e===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(e).add(this.v1)),i}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new Ee){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},vl=class extends Un{constructor(e=new P,t=new P){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new P){let i=t;return e===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(e).add(this.v1)),i}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new P){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Yo=class extends Un{constructor(e=new Ee,t=new Ee,i=new Ee){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=i}getPoint(e,t=new Ee){let i=t,r=this.v0,s=this.v1,o=this.v2;return i.set(Eo(e,r.x,s.x,o.x),Eo(e,r.y,s.y,o.y)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Zo=class extends Un{constructor(e=new P,t=new P,i=new P){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=i}getPoint(e,t=new P){let i=t,r=this.v0,s=this.v1,o=this.v2;return i.set(Eo(e,r.x,s.x,o.x),Eo(e,r.y,s.y,o.y),Eo(e,r.z,s.z,o.z)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Jo=class extends Un{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new Ee){let i=t,r=this.points,s=(r.length-1)*e,o=Math.floor(s),a=s-o,l=r[o===0?o:o-1],c=r[o],u=r[o>r.length-2?r.length-1:o+1],h=r[o>r.length-3?r.length-1:o+2];return i.set(qd(a,l.x,c.x,u.x,h.x),qd(a,l.y,c.y,u.y,h.y)),i}copy(e){super.copy(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){let r=e.points[t];this.points.push(r.clone())}return this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,i=this.points.length;t<i;t++){let r=this.points[t];e.points.push(r.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){let r=e.points[t];this.points.push(new Ee().fromArray(r))}return this}},yl=Object.freeze({__proto__:null,ArcCurve:gl,CatmullRomCurve3:Fs,CubicBezierCurve:$o,CubicBezierCurve3:xl,EllipseCurve:Ns,LineCurve:qo,LineCurve3:vl,QuadraticBezierCurve:Yo,QuadraticBezierCurve3:Zo,SplineCurve:Jo}),_l=class extends Un{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){let e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){let i=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new yl[i](t,e))}return this}getPoint(e,t){let i=e*this.getLength(),r=this.getCurveLengths(),s=0;for(;s<r.length;){if(r[s]>=i){let o=r[s]-i,a=this.curves[s],l=a.getLength(),c=l===0?0:1-o/l;return a.getPointAt(c,t)}s++}return null}getLength(){let e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let e=[],t=0;for(let i=0,r=this.curves.length;i<r;i++)t+=this.curves[i].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){let t=[];for(let i=0;i<=e;i++)t.push(this.getPoint(i/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){let t=[],i;for(let r=0,s=this.curves;r<s.length;r++){let o=s[r],a=o.isEllipseCurve?e*2:o.isLineCurve||o.isLineCurve3?1:o.isSplineCurve?e*o.points.length:e,l=o.getPoints(a);for(let c=0;c<l.length;c++){let u=l[c];i&&i.equals(u)||(t.push(u),i=u)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,i=e.curves.length;t<i;t++){let r=e.curves[t];this.curves.push(r.clone())}return this.autoClose=e.autoClose,this}toJSON(){let e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,i=this.curves.length;t<i;t++){let r=this.curves[t];e.curves.push(r.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,i=e.curves.length;t<i;t++){let r=e.curves[t];this.curves.push(new yl[r.type]().fromJSON(r))}return this}},Ko=class extends _l{constructor(e){super(),this.type="Path",this.currentPoint=new Ee,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,i=e.length;t<i;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){let i=new qo(this.currentPoint.clone(),new Ee(e,t));return this.curves.push(i),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,i,r){let s=new Yo(this.currentPoint.clone(),new Ee(e,t),new Ee(i,r));return this.curves.push(s),this.currentPoint.set(i,r),this}bezierCurveTo(e,t,i,r,s,o){let a=new $o(this.currentPoint.clone(),new Ee(e,t),new Ee(i,r),new Ee(s,o));return this.curves.push(a),this.currentPoint.set(s,o),this}splineThru(e){let t=[this.currentPoint.clone()].concat(e),i=new Jo(t);return this.curves.push(i),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,i,r,s,o){let a=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(e+a,t+l,i,r,s,o),this}absarc(e,t,i,r,s,o){return this.absellipse(e,t,i,i,r,s,o),this}ellipse(e,t,i,r,s,o,a,l){let c=this.currentPoint.x,u=this.currentPoint.y;return this.absellipse(e+c,t+u,i,r,s,o,a,l),this}absellipse(e,t,i,r,s,o,a,l){let c=new Ns(e,t,i,r,s,o,a,l);if(this.curves.length>0){let h=c.getPoint(0);h.equals(this.currentPoint)||this.lineTo(h.x,h.y)}this.curves.push(c);let u=c.getPoint(1);return this.currentPoint.copy(u),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){let e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}},ar=class extends Ko{constructor(e){super(e),this.uuid=Wi(),this.type="Shape",this.holes=[]}getPointsHoles(e){let t=[];for(let i=0,r=this.holes.length;i<r;i++)t[i]=this.holes[i].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,i=e.holes.length;t<i;t++){let r=e.holes[t];this.holes.push(r.clone())}return this}toJSON(){let e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,i=this.holes.length;t<i;t++){let r=this.holes[t];e.holes.push(r.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,i=e.holes.length;t<i;t++){let r=e.holes[t];this.holes.push(new Ko().fromJSON(r))}return this}};function kg(n,e,t=2){let i=e&&e.length,r=i?e[0]*t:n.length,s=Jf(n,0,r,t,!0),o=[];if(!s||s.next===s.prev)return o;let a,l,c;if(i&&(s=Xg(n,e,s,t)),n.length>80*t){a=1/0,l=1/0;let u=-1/0,h=-1/0;for(let d=t;d<r;d+=t){let f=n[d],m=n[d+1];f<a&&(a=f),m<l&&(l=m),f>u&&(u=f),m>h&&(h=m)}c=Math.max(u-a,h-l),c=c!==0?32767/c:0}return jo(s,o,t,a,l,c,0),o}function Jf(n,e,t,i,r){let s;if(r===n0(n,e,t,i)>0)for(let o=e;o<t;o+=i)s=Yd(o/i|0,n[o],n[o+1],s);else for(let o=t-i;o>=e;o-=i)s=Yd(o/i|0,n[o],n[o+1],s);return s&&Os(s,s.next)&&(ea(s),s=s.next),s}function Or(n,e){if(!n)return n;e||(e=n);let t=n,i;do if(i=!1,!t.steiner&&(Os(t,t.next)||At(t.prev,t,t.next)===0)){if(ea(t),t=e=t.prev,t===t.next)break;i=!0}else t=t.next;while(i||t!==e);return e}function jo(n,e,t,i,r,s,o){if(!n)return;!o&&s&&Jg(n,i,r,s);let a=n;for(;n.prev!==n.next;){let l=n.prev,c=n.next;if(s?Vg(n,i,r,s):Hg(n)){e.push(l.i,n.i,c.i),ea(n),n=c.next,a=c.next;continue}if(n=c,n===a){o?o===1?(n=Gg(Or(n),e),jo(n,e,t,i,r,s,2)):o===2&&Wg(n,e,t,i,r,s):jo(Or(n),e,t,i,r,s,1);break}}}function Hg(n){let e=n.prev,t=n,i=n.next;if(At(e,t,i)>=0)return!1;let r=e.x,s=t.x,o=i.x,a=e.y,l=t.y,c=i.y,u=Math.min(r,s,o),h=Math.min(a,l,c),d=Math.max(r,s,o),f=Math.max(a,l,c),m=i.next;for(;m!==e;){if(m.x>=u&&m.x<=d&&m.y>=h&&m.y<=f&&bo(r,a,s,l,o,c,m.x,m.y)&&At(m.prev,m,m.next)>=0)return!1;m=m.next}return!0}function Vg(n,e,t,i){let r=n.prev,s=n,o=n.next;if(At(r,s,o)>=0)return!1;let a=r.x,l=s.x,c=o.x,u=r.y,h=s.y,d=o.y,f=Math.min(a,l,c),m=Math.min(u,h,d),x=Math.max(a,l,c),g=Math.max(u,h,d),p=Hu(f,m,e,t,i),w=Hu(x,g,e,t,i),b=n.prevZ,v=n.nextZ;for(;b&&b.z>=p&&v&&v.z<=w;){if(b.x>=f&&b.x<=x&&b.y>=m&&b.y<=g&&b!==r&&b!==o&&bo(a,u,l,h,c,d,b.x,b.y)&&At(b.prev,b,b.next)>=0||(b=b.prevZ,v.x>=f&&v.x<=x&&v.y>=m&&v.y<=g&&v!==r&&v!==o&&bo(a,u,l,h,c,d,v.x,v.y)&&At(v.prev,v,v.next)>=0))return!1;v=v.nextZ}for(;b&&b.z>=p;){if(b.x>=f&&b.x<=x&&b.y>=m&&b.y<=g&&b!==r&&b!==o&&bo(a,u,l,h,c,d,b.x,b.y)&&At(b.prev,b,b.next)>=0)return!1;b=b.prevZ}for(;v&&v.z<=w;){if(v.x>=f&&v.x<=x&&v.y>=m&&v.y<=g&&v!==r&&v!==o&&bo(a,u,l,h,c,d,v.x,v.y)&&At(v.prev,v,v.next)>=0)return!1;v=v.nextZ}return!0}function Gg(n,e){let t=n;do{let i=t.prev,r=t.next.next;!Os(i,r)&&jf(i,t,t.next,r)&&Qo(i,r)&&Qo(r,i)&&(e.push(i.i,t.i,r.i),ea(t),ea(t.next),t=n=r),t=t.next}while(t!==n);return Or(t)}function Wg(n,e,t,i,r,s){let o=n;do{let a=o.next.next;for(;a!==o.prev;){if(o.i!==a.i&&Qg(o,a)){let l=Qf(o,a);o=Or(o,o.next),l=Or(l,l.next),jo(o,e,t,i,r,s,0),jo(l,e,t,i,r,s,0);return}a=a.next}o=o.next}while(o!==n)}function Xg(n,e,t,i){let r=[];for(let s=0,o=e.length;s<o;s++){let a=e[s]*i,l=s<o-1?e[s+1]*i:n.length,c=Jf(n,a,l,i,!1);c===c.next&&(c.steiner=!0),r.push(jg(c))}r.sort($g);for(let s=0;s<r.length;s++)t=qg(r[s],t);return t}function $g(n,e){let t=n.x-e.x;if(t===0&&(t=n.y-e.y,t===0)){let i=(n.next.y-n.y)/(n.next.x-n.x),r=(e.next.y-e.y)/(e.next.x-e.x);t=i-r}return t}function qg(n,e){let t=Yg(n,e);if(!t)return e;let i=Qf(t,n);return Or(i,i.next),Or(t,t.next)}function Yg(n,e){let t=e,i=n.x,r=n.y,s=-1/0,o;if(Os(n,t))return t;do{if(Os(n,t.next))return t.next;if(r<=t.y&&r>=t.next.y&&t.next.y!==t.y){let h=t.x+(r-t.y)*(t.next.x-t.x)/(t.next.y-t.y);if(h<=i&&h>s&&(s=h,o=t.x<t.next.x?t:t.next,h===i))return o}t=t.next}while(t!==e);if(!o)return null;let a=o,l=o.x,c=o.y,u=1/0;t=o;do{if(i>=t.x&&t.x>=l&&i!==t.x&&Kf(r<c?i:s,r,l,c,r<c?s:i,r,t.x,t.y)){let h=Math.abs(r-t.y)/(i-t.x);Qo(t,n)&&(h<u||h===u&&(t.x>o.x||t.x===o.x&&Zg(o,t)))&&(o=t,u=h)}t=t.next}while(t!==a);return o}function Zg(n,e){return At(n.prev,n,e.prev)<0&&At(e.next,n,n.next)<0}function Jg(n,e,t,i){let r=n;do r.z===0&&(r.z=Hu(r.x,r.y,e,t,i)),r.prevZ=r.prev,r.nextZ=r.next,r=r.next;while(r!==n);r.prevZ.nextZ=null,r.prevZ=null,Kg(r)}function Kg(n){let e,t=1;do{let i=n,r;n=null;let s=null;for(e=0;i;){e++;let o=i,a=0;for(let c=0;c<t&&(a++,o=o.nextZ,!!o);c++);let l=t;for(;a>0||l>0&&o;)a!==0&&(l===0||!o||i.z<=o.z)?(r=i,i=i.nextZ,a--):(r=o,o=o.nextZ,l--),s?s.nextZ=r:n=r,r.prevZ=s,s=r;i=o}s.nextZ=null,t*=2}while(e>1);return n}function Hu(n,e,t,i,r){return n=(n-t)*r|0,e=(e-i)*r|0,n=(n|n<<8)&16711935,n=(n|n<<4)&252645135,n=(n|n<<2)&858993459,n=(n|n<<1)&1431655765,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,n|e<<1}function jg(n){let e=n,t=n;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==n);return t}function Kf(n,e,t,i,r,s,o,a){return(r-o)*(e-a)>=(n-o)*(s-a)&&(n-o)*(i-a)>=(t-o)*(e-a)&&(t-o)*(s-a)>=(r-o)*(i-a)}function bo(n,e,t,i,r,s,o,a){return!(n===o&&e===a)&&Kf(n,e,t,i,r,s,o,a)}function Qg(n,e){return n.next.i!==e.i&&n.prev.i!==e.i&&!e0(n,e)&&(Qo(n,e)&&Qo(e,n)&&t0(n,e)&&(At(n.prev,n,e.prev)||At(n,e.prev,e))||Os(n,e)&&At(n.prev,n,n.next)>0&&At(e.prev,e,e.next)>0)}function At(n,e,t){return(e.y-n.y)*(t.x-e.x)-(e.x-n.x)*(t.y-e.y)}function Os(n,e){return n.x===e.x&&n.y===e.y}function jf(n,e,t,i){let r=tl(At(n,e,t)),s=tl(At(n,e,i)),o=tl(At(t,i,n)),a=tl(At(t,i,e));return!!(r!==s&&o!==a||r===0&&el(n,t,e)||s===0&&el(n,i,e)||o===0&&el(t,n,i)||a===0&&el(t,e,i))}function el(n,e,t){return e.x<=Math.max(n.x,t.x)&&e.x>=Math.min(n.x,t.x)&&e.y<=Math.max(n.y,t.y)&&e.y>=Math.min(n.y,t.y)}function tl(n){return n>0?1:n<0?-1:0}function e0(n,e){let t=n;do{if(t.i!==n.i&&t.next.i!==n.i&&t.i!==e.i&&t.next.i!==e.i&&jf(t,t.next,n,e))return!0;t=t.next}while(t!==n);return!1}function Qo(n,e){return At(n.prev,n,n.next)<0?At(n,e,n.next)>=0&&At(n,n.prev,e)>=0:At(n,e,n.prev)<0||At(n,n.next,e)<0}function t0(n,e){let t=n,i=!1,r=(n.x+e.x)/2,s=(n.y+e.y)/2;do t.y>s!=t.next.y>s&&t.next.y!==t.y&&r<(t.next.x-t.x)*(s-t.y)/(t.next.y-t.y)+t.x&&(i=!i),t=t.next;while(t!==n);return i}function Qf(n,e){let t=Vu(n.i,n.x,n.y),i=Vu(e.i,e.x,e.y),r=n.next,s=e.prev;return n.next=e,e.prev=n,t.next=r,r.prev=t,i.next=t,t.prev=i,s.next=i,i.prev=s,i}function Yd(n,e,t,i){let r=Vu(n,e,t);return i?(r.next=i.next,r.prev=i,i.next.prev=r,i.next=r):(r.prev=r,r.next=r),r}function ea(n){n.next.prev=n.prev,n.prev.next=n.next,n.prevZ&&(n.prevZ.nextZ=n.nextZ),n.nextZ&&(n.nextZ.prevZ=n.prevZ)}function Vu(n,e,t){return{i:n,x:e,y:t,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function n0(n,e,t,i){let r=0;for(let s=e,o=t-i;s<t;s+=i)r+=(n[o]-n[s])*(n[s+1]+n[o+1]),o=s;return r}var Gu=class{static triangulate(e,t,i=2){return kg(e,t,i)}},Pr=class n{static area(e){let t=e.length,i=0;for(let r=t-1,s=0;s<t;r=s++)i+=e[r].x*e[s].y-e[s].x*e[r].y;return i*.5}static isClockWise(e){return n.area(e)<0}static triangulateShape(e,t){let i=[],r=[],s=[];Zd(e),Jd(i,e);let o=e.length;t.forEach(Zd);for(let l=0;l<t.length;l++)r.push(o),o+=t[l].length,Jd(i,t[l]);let a=Gu.triangulate(i,r);for(let l=0;l<a.length;l+=3)s.push(a.slice(l,l+3));return s}};function Zd(n){let e=n.length;e>2&&n[e-1].equals(n[0])&&n.pop()}function Jd(n,e){for(let t=0;t<e.length;t++)n.push(e[t].x),n.push(e[t].y)}var zr=class n extends Ft{constructor(e=new ar([new Ee(.5,.5),new Ee(-.5,.5),new Ee(-.5,-.5),new Ee(.5,-.5)]),t={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:e,options:t},e=Array.isArray(e)?e:[e];let i=this,r=[],s=[];for(let a=0,l=e.length;a<l;a++){let c=e[a];o(c)}this.setAttribute("position",new ut(r,3)),this.setAttribute("uv",new ut(s,2)),this.computeVertexNormals();function o(a){let l=[],c=t.curveSegments!==void 0?t.curveSegments:12,u=t.steps!==void 0?t.steps:1,h=t.depth!==void 0?t.depth:1,d=t.bevelEnabled!==void 0?t.bevelEnabled:!0,f=t.bevelThickness!==void 0?t.bevelThickness:.2,m=t.bevelSize!==void 0?t.bevelSize:f-.1,x=t.bevelOffset!==void 0?t.bevelOffset:0,g=t.bevelSegments!==void 0?t.bevelSegments:3,p=t.extrudePath,w=t.UVGenerator!==void 0?t.UVGenerator:i0,b,v=!1,A,R,I,U;p&&(b=p.getSpacedPoints(u),v=!0,d=!1,A=p.computeFrenetFrames(u,!1),R=new P,I=new P,U=new P),d||(g=0,f=0,m=0,x=0);let M=a.extractPoints(c),S=M.shape,L=M.holes;if(!Pr.isClockWise(S)){S=S.reverse();for(let se=0,te=L.length;se<te;se++){let Q=L[se];Pr.isClockWise(Q)&&(L[se]=Q.reverse())}}function H(se){let Q=10000000000000001e-36,K=se[0];for(let be=1;be<=se.length;be++){let ce=be%se.length,ye=se[ce],Ye=ye.x-K.x,qe=ye.y-K.y,T=Ye*Ye+qe*qe,_=Math.max(Math.abs(ye.x),Math.abs(ye.y),Math.abs(K.x),Math.abs(K.y)),z=Q*_*_;if(T<=z){se.splice(ce,1),be--;continue}K=ye}}H(S),L.forEach(H);let Z=L.length,X=S;for(let se=0;se<Z;se++){let te=L[se];S=S.concat(te)}function J(se,te,Q){return te||console.error("THREE.ExtrudeGeometry: vec does not exist"),se.clone().addScaledVector(te,Q)}let le=S.length;function $(se,te,Q){let K,be,ce,ye=se.x-te.x,Ye=se.y-te.y,qe=Q.x-se.x,T=Q.y-se.y,_=ye*ye+Ye*Ye,z=ye*T-Ye*qe;if(Math.abs(z)>Number.EPSILON){let W=Math.sqrt(_),ie=Math.sqrt(qe*qe+T*T),q=te.x-Ye/W,De=te.y+ye/W,me=Q.x-T/ie,Ue=Q.y+qe/ie,Re=((me-q)*T-(Ue-De)*qe)/(ye*T-Ye*qe);K=q+ye*Re-se.x,be=De+Ye*Re-se.y;let ue=K*K+be*be;if(ue<=2)return new Ee(K,be);ce=Math.sqrt(ue/2)}else{let W=!1;ye>Number.EPSILON?qe>Number.EPSILON&&(W=!0):ye<-Number.EPSILON?qe<-Number.EPSILON&&(W=!0):Math.sign(Ye)===Math.sign(T)&&(W=!0),W?(K=-Ye,be=ye,ce=Math.sqrt(_)):(K=ye,be=Ye,ce=Math.sqrt(_/2))}return new Ee(K/ce,be/ce)}let _e=[];for(let se=0,te=X.length,Q=te-1,K=se+1;se<te;se++,Q++,K++)Q===te&&(Q=0),K===te&&(K=0),_e[se]=$(X[se],X[Q],X[K]);let we=[],Le,je=_e.concat();for(let se=0,te=Z;se<te;se++){let Q=L[se];Le=[];for(let K=0,be=Q.length,ce=be-1,ye=K+1;K<be;K++,ce++,ye++)ce===be&&(ce=0),ye===be&&(ye=0),Le[K]=$(Q[K],Q[ce],Q[ye]);we.push(Le),je=je.concat(Le)}let at;if(g===0)at=Pr.triangulateShape(X,L);else{let se=[],te=[];for(let Q=0;Q<g;Q++){let K=Q/g,be=f*Math.cos(K*Math.PI/2),ce=m*Math.sin(K*Math.PI/2)+x;for(let ye=0,Ye=X.length;ye<Ye;ye++){let qe=J(X[ye],_e[ye],ce);Ne(qe.x,qe.y,-be),K===0&&se.push(qe)}for(let ye=0,Ye=Z;ye<Ye;ye++){let qe=L[ye];Le=we[ye];let T=[];for(let _=0,z=qe.length;_<z;_++){let W=J(qe[_],Le[_],ce);Ne(W.x,W.y,-be),K===0&&T.push(W)}K===0&&te.push(T)}}at=Pr.triangulateShape(se,te)}let lt=at.length,ct=m+x;for(let se=0;se<le;se++){let te=d?J(S[se],je[se],ct):S[se];v?(I.copy(A.normals[0]).multiplyScalar(te.x),R.copy(A.binormals[0]).multiplyScalar(te.y),U.copy(b[0]).add(I).add(R),Ne(U.x,U.y,U.z)):Ne(te.x,te.y,0)}for(let se=1;se<=u;se++)for(let te=0;te<le;te++){let Q=d?J(S[te],je[te],ct):S[te];v?(I.copy(A.normals[se]).multiplyScalar(Q.x),R.copy(A.binormals[se]).multiplyScalar(Q.y),U.copy(b[se]).add(I).add(R),Ne(U.x,U.y,U.z)):Ne(Q.x,Q.y,h/u*se)}for(let se=g-1;se>=0;se--){let te=se/g,Q=f*Math.cos(te*Math.PI/2),K=m*Math.sin(te*Math.PI/2)+x;for(let be=0,ce=X.length;be<ce;be++){let ye=J(X[be],_e[be],K);Ne(ye.x,ye.y,h+Q)}for(let be=0,ce=L.length;be<ce;be++){let ye=L[be];Le=we[be];for(let Ye=0,qe=ye.length;Ye<qe;Ye++){let T=J(ye[Ye],Le[Ye],K);v?Ne(T.x,T.y+b[u-1].y,b[u-1].x+Q):Ne(T.x,T.y,h+Q)}}}j(),re();function j(){let se=r.length/3;if(d){let te=0,Q=le*te;for(let K=0;K<lt;K++){let be=at[K];Fe(be[2]+Q,be[1]+Q,be[0]+Q)}te=u+g*2,Q=le*te;for(let K=0;K<lt;K++){let be=at[K];Fe(be[0]+Q,be[1]+Q,be[2]+Q)}}else{for(let te=0;te<lt;te++){let Q=at[te];Fe(Q[2],Q[1],Q[0])}for(let te=0;te<lt;te++){let Q=at[te];Fe(Q[0]+le*u,Q[1]+le*u,Q[2]+le*u)}}i.addGroup(se,r.length/3-se,0)}function re(){let se=r.length/3,te=0;Pe(X,te),te+=X.length;for(let Q=0,K=L.length;Q<K;Q++){let be=L[Q];Pe(be,te),te+=be.length}i.addGroup(se,r.length/3-se,1)}function Pe(se,te){let Q=se.length;for(;--Q>=0;){let K=Q,be=Q-1;be<0&&(be=se.length-1);for(let ce=0,ye=u+g*2;ce<ye;ce++){let Ye=le*ce,qe=le*(ce+1),T=te+K+Ye,_=te+be+Ye,z=te+be+qe,W=te+K+qe;nt(T,_,z,W)}}}function Ne(se,te,Q){l.push(se),l.push(te),l.push(Q)}function Fe(se,te,Q){vt(se),vt(te),vt(Q);let K=r.length/3,be=w.generateTopUV(i,r,K-3,K-2,K-1);D(be[0]),D(be[1]),D(be[2])}function nt(se,te,Q,K){vt(se),vt(te),vt(K),vt(te),vt(Q),vt(K);let be=r.length/3,ce=w.generateSideWallUV(i,r,be-6,be-3,be-2,be-1);D(ce[0]),D(ce[1]),D(ce[3]),D(ce[1]),D(ce[2]),D(ce[3])}function vt(se){r.push(l[se*3+0]),r.push(l[se*3+1]),r.push(l[se*3+2])}function D(se){s.push(se.x),s.push(se.y)}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON(),t=this.parameters.shapes,i=this.parameters.options;return r0(t,i,e)}static fromJSON(e,t){let i=[];for(let s=0,o=e.shapes.length;s<o;s++){let a=t[e.shapes[s]];i.push(a)}let r=e.options.extrudePath;return r!==void 0&&(e.options.extrudePath=new yl[r.type]().fromJSON(r)),new n(i,e.options)}},i0={generateTopUV:function(n,e,t,i,r){let s=e[t*3],o=e[t*3+1],a=e[i*3],l=e[i*3+1],c=e[r*3],u=e[r*3+1];return[new Ee(s,o),new Ee(a,l),new Ee(c,u)]},generateSideWallUV:function(n,e,t,i,r,s){let o=e[t*3],a=e[t*3+1],l=e[t*3+2],c=e[i*3],u=e[i*3+1],h=e[i*3+2],d=e[r*3],f=e[r*3+1],m=e[r*3+2],x=e[s*3],g=e[s*3+1],p=e[s*3+2];return Math.abs(a-u)<Math.abs(o-c)?[new Ee(o,1-l),new Ee(c,1-h),new Ee(d,1-m),new Ee(x,1-p)]:[new Ee(a,1-l),new Ee(u,1-h),new Ee(f,1-m),new Ee(g,1-p)]}};function r0(n,e,t){if(t.shapes=[],Array.isArray(n))for(let i=0,r=n.length;i<r;i++){let s=n[i];t.shapes.push(s.uuid)}else t.shapes.push(n.uuid);return t.options=Object.assign({},e),e.extrudePath!==void 0&&(t.options.extrudePath=e.extrudePath.toJSON()),t}var Ei=class n extends Xo{constructor(e=1,t=0){let i=(1+Math.sqrt(5))/2,r=[-1,i,0,1,i,0,-1,-i,0,1,-i,0,0,-1,i,0,1,i,0,-1,-i,0,1,-i,i,0,-1,i,0,1,-i,0,-1,-i,0,1],s=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(r,s,e,t),this.type="IcosahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new n(e.radius,e.detail)}};var zs=class n extends Xo{constructor(e=1,t=0){let i=[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],r=[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2];super(i,r,e,t),this.type="OctahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new n(e.radius,e.detail)}},lr=class n extends Ft{constructor(e=1,t=1,i=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:r};let s=e/2,o=t/2,a=Math.floor(i),l=Math.floor(r),c=a+1,u=l+1,h=e/a,d=t/l,f=[],m=[],x=[],g=[];for(let p=0;p<u;p++){let w=p*d-o;for(let b=0;b<c;b++){let v=b*h-s;m.push(v,-w,0),x.push(0,0,1),g.push(b/a),g.push(1-p/l)}}for(let p=0;p<l;p++)for(let w=0;w<a;w++){let b=w+c*p,v=w+c*(p+1),A=w+1+c*(p+1),R=w+1+c*p;f.push(b,v,R),f.push(v,A,R)}this.setIndex(f),this.setAttribute("position",new ut(m,3)),this.setAttribute("normal",new ut(x,3)),this.setAttribute("uv",new ut(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.width,e.height,e.widthSegments,e.heightSegments)}};var oi=class n extends Ft{constructor(e=1,t=.4,i=12,r=48,s=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:i,tubularSegments:r,arc:s},i=Math.floor(i),r=Math.floor(r);let o=[],a=[],l=[],c=[],u=new P,h=new P,d=new P;for(let f=0;f<=i;f++)for(let m=0;m<=r;m++){let x=m/r*s,g=f/i*Math.PI*2;h.x=(e+t*Math.cos(g))*Math.cos(x),h.y=(e+t*Math.cos(g))*Math.sin(x),h.z=t*Math.sin(g),a.push(h.x,h.y,h.z),u.x=e*Math.cos(x),u.y=e*Math.sin(x),d.subVectors(h,u).normalize(),l.push(d.x,d.y,d.z),c.push(m/r),c.push(f/i)}for(let f=1;f<=i;f++)for(let m=1;m<=r;m++){let x=(r+1)*f+m-1,g=(r+1)*(f-1)+m-1,p=(r+1)*(f-1)+m,w=(r+1)*f+m;o.push(x,g,w),o.push(g,p,w)}this.setIndex(o),this.setAttribute("position",new ut(a,3)),this.setAttribute("normal",new ut(l,3)),this.setAttribute("uv",new ut(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}};var ta=class n extends Ft{constructor(e=new Zo(new P(-1,-1,0),new P(-1,1,0),new P(1,1,0)),t=64,i=1,r=8,s=!1){super(),this.type="TubeGeometry",this.parameters={path:e,tubularSegments:t,radius:i,radialSegments:r,closed:s};let o=e.computeFrenetFrames(t,s);this.tangents=o.tangents,this.normals=o.normals,this.binormals=o.binormals;let a=new P,l=new P,c=new Ee,u=new P,h=[],d=[],f=[],m=[];x(),this.setIndex(m),this.setAttribute("position",new ut(h,3)),this.setAttribute("normal",new ut(d,3)),this.setAttribute("uv",new ut(f,2));function x(){for(let b=0;b<t;b++)g(b);g(s===!1?t:0),w(),p()}function g(b){u=e.getPointAt(b/t,u);let v=o.normals[b],A=o.binormals[b];for(let R=0;R<=r;R++){let I=R/r*Math.PI*2,U=Math.sin(I),M=-Math.cos(I);l.x=M*v.x+U*A.x,l.y=M*v.y+U*A.y,l.z=M*v.z+U*A.z,l.normalize(),d.push(l.x,l.y,l.z),a.x=u.x+i*l.x,a.y=u.y+i*l.y,a.z=u.z+i*l.z,h.push(a.x,a.y,a.z)}}function p(){for(let b=1;b<=t;b++)for(let v=1;v<=r;v++){let A=(r+1)*(b-1)+(v-1),R=(r+1)*b+(v-1),I=(r+1)*b+v,U=(r+1)*(b-1)+v;m.push(A,R,U),m.push(R,I,U)}}function w(){for(let b=0;b<=t;b++)for(let v=0;v<=r;v++)c.x=b/t,c.y=v/r,f.push(c.x,c.y)}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON();return e.path=this.parameters.path.toJSON(),e}static fromJSON(e){return new n(new yl[e.path.type]().fromJSON(e.path),e.tubularSegments,e.radius,e.radialSegments,e.closed)}};var Br=class extends Si{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new tt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new tt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Tc,this.normalScale=new Ee(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Gn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}};var na=class extends Si{constructor(e){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new tt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new tt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Tc,this.normalScale=new Ee(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Gn,this.combine=kl,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},bl=class extends Si{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Ff,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},Ml=class extends Si{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}};function nl(n,e){return!n||n.constructor===e?n:typeof e.BYTES_PER_ELEMENT=="number"?new e(n):Array.prototype.slice.call(n)}function s0(n){return ArrayBuffer.isView(n)&&!(n instanceof DataView)}function o0(n){function e(r,s){return n[r]-n[s]}let t=n.length,i=new Array(t);for(let r=0;r!==t;++r)i[r]=r;return i.sort(e),i}function Kd(n,e,t){let i=n.length,r=new n.constructor(i);for(let s=0,o=0;o!==i;++s){let a=t[s]*e;for(let l=0;l!==e;++l)r[o++]=n[a+l]}return r}function ep(n,e,t,i){let r=1,s=n[0];for(;s!==void 0&&s[i]===void 0;)s=n[r++];if(s===void 0)return;let o=s[i];if(o!==void 0)if(Array.isArray(o))do o=s[i],o!==void 0&&(e.push(s.time),t.push(...o)),s=n[r++];while(s!==void 0);else if(o.toArray!==void 0)do o=s[i],o!==void 0&&(e.push(s.time),o.toArray(t,t.length)),s=n[r++];while(s!==void 0);else do o=s[i],o!==void 0&&(e.push(s.time),t.push(o)),s=n[r++];while(s!==void 0)}var kr=class{constructor(e,t,i,r){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=r!==void 0?r:new t.constructor(i),this.sampleValues=t,this.valueSize=i,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,i=this._cachedIndex,r=t[i],s=t[i-1];e:{t:{let o;n:{i:if(!(e<r)){for(let a=i+2;;){if(r===void 0){if(e<s)break i;return i=t.length,this._cachedIndex=i,this.copySampleValue_(i-1)}if(i===a)break;if(s=r,r=t[++i],e<r)break t}o=t.length;break n}if(!(e>=s)){let a=t[1];e<a&&(i=2,s=a);for(let l=i-2;;){if(s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===l)break;if(r=s,s=t[--i-1],e>=s)break t}o=i,i=0;break n}break e}for(;i<o;){let a=i+o>>>1;e<t[a]?o=a:i=a+1}if(r=t[i],s=t[i-1],s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(r===void 0)return i=t.length,this._cachedIndex=i,this.copySampleValue_(i-1)}this._cachedIndex=i,this.intervalChanged_(i,s,r)}return this.interpolate_(i,s,e,r)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,i=this.sampleValues,r=this.valueSize,s=e*r;for(let o=0;o!==r;++o)t[o]=i[s+o];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}},Sl=class extends kr{constructor(e,t,i,r){super(e,t,i,r),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Cr,endingEnd:Cr}}intervalChanged_(e,t,i){let r=this.parameterPositions,s=e-2,o=e+1,a=r[s],l=r[o];if(a===void 0)switch(this.getSettings_().endingStart){case Ir:s=e,a=2*t-i;break;case Ao:s=r.length-2,a=t+r[s]-r[s+1];break;default:s=e,a=i}if(l===void 0)switch(this.getSettings_().endingEnd){case Ir:o=e,l=2*i-t;break;case Ao:o=1,l=i+r[1]-r[0];break;default:o=e-1,l=t}let c=(i-t)*.5,u=this.valueSize;this._weightPrev=c/(t-a),this._weightNext=c/(l-i),this._offsetPrev=s*u,this._offsetNext=o*u}interpolate_(e,t,i,r){let s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=e*a,c=l-a,u=this._offsetPrev,h=this._offsetNext,d=this._weightPrev,f=this._weightNext,m=(i-t)/(r-t),x=m*m,g=x*m,p=-d*g+2*d*x-d*m,w=(1+d)*g+(-1.5-2*d)*x+(-.5+d)*m+1,b=(-1-f)*g+(1.5+f)*x+.5*m,v=f*g-f*x;for(let A=0;A!==a;++A)s[A]=p*o[u+A]+w*o[c+A]+b*o[l+A]+v*o[h+A];return s}},ia=class extends kr{constructor(e,t,i,r){super(e,t,i,r)}interpolate_(e,t,i,r){let s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=e*a,c=l-a,u=(i-t)/(r-t),h=1-u;for(let d=0;d!==a;++d)s[d]=o[c+d]*h+o[l+d]*u;return s}},El=class extends kr{constructor(e,t,i,r){super(e,t,i,r)}interpolate_(e){return this.copySampleValue_(e-1)}},Sn=class{constructor(e,t,i,r){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=nl(t,this.TimeBufferType),this.values=nl(i,this.ValueBufferType),this.setInterpolation(r||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,i;if(t.toJSON!==this.toJSON)i=t.toJSON(e);else{i={name:e.name,times:nl(e.times,Array),values:nl(e.values,Array)};let r=e.getInterpolation();r!==e.DefaultInterpolation&&(i.interpolation=r)}return i.type=e.ValueTypeName,i}InterpolantFactoryMethodDiscrete(e){return new El(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new ia(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new Sl(this.times,this.values,this.getValueSize(),e)}setInterpolation(e){let t;switch(e){case To:t=this.InterpolantFactoryMethodDiscrete;break;case ll:t=this.InterpolantFactoryMethodLinear;break;case il:t=this.InterpolantFactoryMethodSmooth;break}if(t===void 0){let i="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(i);return console.warn("THREE.KeyframeTrack:",i),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return To;case this.InterpolantFactoryMethodLinear:return ll;case this.InterpolantFactoryMethodSmooth:return il}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let i=0,r=t.length;i!==r;++i)t[i]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let i=0,r=t.length;i!==r;++i)t[i]*=e}return this}trim(e,t){let i=this.times,r=i.length,s=0,o=r-1;for(;s!==r&&i[s]<e;)++s;for(;o!==-1&&i[o]>t;)--o;if(++o,s!==0||o!==r){s>=o&&(o=Math.max(o,1),s=o-1);let a=this.getValueSize();this.times=i.slice(s,o),this.values=this.values.slice(s*a,o*a)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),e=!1);let i=this.times,r=this.values,s=i.length;s===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),e=!1);let o=null;for(let a=0;a!==s;a++){let l=i[a];if(typeof l=="number"&&isNaN(l)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,a,l),e=!1;break}if(o!==null&&o>l){console.error("THREE.KeyframeTrack: Out of order keys.",this,a,l,o),e=!1;break}o=l}if(r!==void 0&&s0(r))for(let a=0,l=r.length;a!==l;++a){let c=r[a];if(isNaN(c)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,a,c),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),i=this.getValueSize(),r=this.getInterpolation()===il,s=e.length-1,o=1;for(let a=1;a<s;++a){let l=!1,c=e[a],u=e[a+1];if(c!==u&&(a!==1||c!==e[0]))if(r)l=!0;else{let h=a*i,d=h-i,f=h+i;for(let m=0;m!==i;++m){let x=t[h+m];if(x!==t[d+m]||x!==t[f+m]){l=!0;break}}}if(l){if(a!==o){e[o]=e[a];let h=a*i,d=o*i;for(let f=0;f!==i;++f)t[d+f]=t[h+f]}++o}}if(s>0){e[o]=e[s];for(let a=s*i,l=o*i,c=0;c!==i;++c)t[l+c]=t[a+c];++o}return o!==e.length?(this.times=e.slice(0,o),this.values=t.slice(0,o*i)):(this.times=e,this.values=t),this}clone(){let e=this.times.slice(),t=this.values.slice(),i=this.constructor,r=new i(this.name,e,t);return r.createInterpolant=this.createInterpolant,r}};Sn.prototype.ValueTypeName="";Sn.prototype.TimeBufferType=Float32Array;Sn.prototype.ValueBufferType=Float32Array;Sn.prototype.DefaultInterpolation=ll;var zi=class extends Sn{constructor(e,t,i){super(e,t,i)}};zi.prototype.ValueTypeName="bool";zi.prototype.ValueBufferType=Array;zi.prototype.DefaultInterpolation=To;zi.prototype.InterpolantFactoryMethodLinear=void 0;zi.prototype.InterpolantFactoryMethodSmooth=void 0;var ra=class extends Sn{constructor(e,t,i,r){super(e,t,i,r)}};ra.prototype.ValueTypeName="color";var Hr=class extends Sn{constructor(e,t,i,r){super(e,t,i,r)}};Hr.prototype.ValueTypeName="number";var wl=class extends kr{constructor(e,t,i,r){super(e,t,i,r)}interpolate_(e,t,i,r){let s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=(i-t)/(r-t),c=e*a;for(let u=c+a;c!==u;c+=4)cn.slerpFlat(s,0,o,c-a,o,c,l);return s}},Bi=class extends Sn{constructor(e,t,i,r){super(e,t,i,r)}InterpolantFactoryMethodLinear(e){return new wl(this.times,this.values,this.getValueSize(),e)}};Bi.prototype.ValueTypeName="quaternion";Bi.prototype.InterpolantFactoryMethodSmooth=void 0;var ki=class extends Sn{constructor(e,t,i){super(e,t,i)}};ki.prototype.ValueTypeName="string";ki.prototype.ValueBufferType=Array;ki.prototype.DefaultInterpolation=To;ki.prototype.InterpolantFactoryMethodLinear=void 0;ki.prototype.InterpolantFactoryMethodSmooth=void 0;var Vr=class extends Sn{constructor(e,t,i,r){super(e,t,i,r)}};Vr.prototype.ValueTypeName="vector";var Hi=class{constructor(e="",t=-1,i=[],r=wc){this.name=e,this.tracks=i,this.duration=t,this.blendMode=r,this.uuid=Wi(),this.userData={},this.duration<0&&this.resetDuration()}static parse(e){let t=[],i=e.tracks,r=1/(e.fps||1);for(let o=0,a=i.length;o!==a;++o)t.push(l0(i[o]).scale(r));let s=new this(e.name,e.duration,t,e.blendMode);return s.uuid=e.uuid,s.userData=JSON.parse(e.userData||"{}"),s}static toJSON(e){let t=[],i=e.tracks,r={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode,userData:JSON.stringify(e.userData)};for(let s=0,o=i.length;s!==o;++s)t.push(Sn.toJSON(i[s]));return r}static CreateFromMorphTargetSequence(e,t,i,r){let s=t.length,o=[];for(let a=0;a<s;a++){let l=[],c=[];l.push((a+s-1)%s,a,(a+1)%s),c.push(0,1,0);let u=o0(l);l=Kd(l,1,u),c=Kd(c,1,u),!r&&l[0]===0&&(l.push(s),c.push(c[0])),o.push(new Hr(".morphTargetInfluences["+t[a].name+"]",l,c).scale(1/i))}return new this(e,-1,o)}static findByName(e,t){let i=e;if(!Array.isArray(e)){let r=e;i=r.geometry&&r.geometry.animations||r.animations}for(let r=0;r<i.length;r++)if(i[r].name===t)return i[r];return null}static CreateClipsFromMorphTargetSequences(e,t,i){let r={},s=/^([\w-]*?)([\d]+)$/;for(let a=0,l=e.length;a<l;a++){let c=e[a],u=c.name.match(s);if(u&&u.length>1){let h=u[1],d=r[h];d||(r[h]=d=[]),d.push(c)}}let o=[];for(let a in r)o.push(this.CreateFromMorphTargetSequence(a,r[a],t,i));return o}static parseAnimation(e,t){if(console.warn("THREE.AnimationClip: parseAnimation() is deprecated and will be removed with r185"),!e)return console.error("THREE.AnimationClip: No animation in JSONLoader data."),null;let i=function(h,d,f,m,x){if(f.length!==0){let g=[],p=[];ep(f,g,p,m),g.length!==0&&x.push(new h(d,g,p))}},r=[],s=e.name||"default",o=e.fps||30,a=e.blendMode,l=e.length||-1,c=e.hierarchy||[];for(let h=0;h<c.length;h++){let d=c[h].keys;if(!(!d||d.length===0))if(d[0].morphTargets){let f={},m;for(m=0;m<d.length;m++)if(d[m].morphTargets)for(let x=0;x<d[m].morphTargets.length;x++)f[d[m].morphTargets[x]]=-1;for(let x in f){let g=[],p=[];for(let w=0;w!==d[m].morphTargets.length;++w){let b=d[m];g.push(b.time),p.push(b.morphTarget===x?1:0)}r.push(new Hr(".morphTargetInfluence["+x+"]",g,p))}l=f.length*o}else{let f=".bones["+t[h].name+"]";i(Vr,f+".position",d,"pos",r),i(Bi,f+".quaternion",d,"rot",r),i(Vr,f+".scale",d,"scl",r)}}return r.length===0?null:new this(s,l,r,a)}resetDuration(){let e=this.tracks,t=0;for(let i=0,r=e.length;i!==r;++i){let s=this.tracks[i];t=Math.max(t,s.times[s.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){let e=[];for(let i=0;i<this.tracks.length;i++)e.push(this.tracks[i].clone());let t=new this.constructor(this.name,this.duration,e,this.blendMode);return t.userData=JSON.parse(JSON.stringify(this.userData)),t}toJSON(){return this.constructor.toJSON(this)}};function a0(n){switch(n.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return Hr;case"vector":case"vector2":case"vector3":case"vector4":return Vr;case"color":return ra;case"quaternion":return Bi;case"bool":case"boolean":return zi;case"string":return ki}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+n)}function l0(n){if(n.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");let e=a0(n.type);if(n.times===void 0){let t=[],i=[];ep(n.keys,t,i,"value"),n.times=t,n.values=i}return e.parse!==void 0?e.parse(n):new e(n.name,n.times,n.values,n.interpolation)}var Tl=class{constructor(e,t,i){let r=this,s=!1,o=0,a=0,l,c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=i,this.abortController=new AbortController,this.itemStart=function(u){a++,s===!1&&r.onStart!==void 0&&r.onStart(u,o,a),s=!0},this.itemEnd=function(u){o++,r.onProgress!==void 0&&r.onProgress(u,o,a),o===a&&(s=!1,r.onLoad!==void 0&&r.onLoad())},this.itemError=function(u){r.onError!==void 0&&r.onError(u)},this.resolveURL=function(u){return l?l(u):u},this.setURLModifier=function(u){return l=u,this},this.addHandler=function(u,h){return c.push(u,h),this},this.removeHandler=function(u){let h=c.indexOf(u);return h!==-1&&c.splice(h,2),this},this.getHandler=function(u){for(let h=0,d=c.length;h<d;h+=2){let f=c[h],m=c[h+1];if(f.global&&(f.lastIndex=0),f.test(u))return m}return null},this.abort=function(){return this.abortController.abort(),this.abortController=new AbortController,this}}},tp=new Tl,Al=class{constructor(e){this.manager=e!==void 0?e:tp,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){let i=this;return new Promise(function(r,s){i.load(e,r,t,s)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}};Al.DEFAULT_MATERIAL_NAME="__DEFAULT";var Bs=class extends Gt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new tt(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}},sa=class extends Bs{constructor(e,t,i){super(e,i),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Gt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new tt(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}},Fu=new ot,jd=new P,Qd=new P,Rl=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Ee(512,512),this.mapType=li,this.map=null,this.mapPass=null,this.matrix=new ot,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Ls,this._frameExtents=new Ee(1,1),this._viewportCount=1,this._viewports=[new pt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera,i=this.matrix;jd.setFromMatrixPosition(e.matrixWorld),t.position.copy(jd),Qd.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Qd),t.updateMatrixWorld(),Fu.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Fu,t.coordinateSystem,t.reversedDepth),t.reversedDepth?i.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(Fu)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}};var ef=new ot,_o=new P,Ou=new P,Wu=class extends Rl{constructor(){super(new nn(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new Ee(4,2),this._viewportCount=6,this._viewports=[new pt(2,1,1,1),new pt(0,1,1,1),new pt(3,1,1,1),new pt(1,1,1,1),new pt(3,0,1,1),new pt(1,0,1,1)],this._cubeDirections=[new P(1,0,0),new P(-1,0,0),new P(0,0,1),new P(0,0,-1),new P(0,1,0),new P(0,-1,0)],this._cubeUps=[new P(0,1,0),new P(0,1,0),new P(0,1,0),new P(0,1,0),new P(0,0,1),new P(0,0,-1)]}updateMatrices(e,t=0){let i=this.camera,r=this.matrix,s=e.distance||i.far;s!==i.far&&(i.far=s,i.updateProjectionMatrix()),_o.setFromMatrixPosition(e.matrixWorld),i.position.copy(_o),Ou.copy(i.position),Ou.add(this._cubeDirections[t]),i.up.copy(this._cubeUps[t]),i.lookAt(Ou),i.updateMatrixWorld(),r.makeTranslation(-_o.x,-_o.y,-_o.z),ef.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),this._frustum.setFromProjectionMatrix(ef,i.coordinateSystem,i.reversedDepth)}},oa=class extends Bs{constructor(e,t,i=0,r=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=i,this.decay=r,this.shadow=new Wu}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}},aa=class extends No{constructor(e=-1,t=1,i=1,r=-1,s=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=r,this.near=s,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,r,s,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,r=(this.top+this.bottom)/2,s=i-e,o=i+e,a=r+t,l=r-t;if(this.view!==null&&this.view.enabled){let c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,o=s+c*this.view.width,a-=u*this.view.offsetY,l=a-u*this.view.height}this.projectionMatrix.makeOrthographic(s,o,a,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},Xu=class extends Rl{constructor(){super(new aa(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},la=class extends Bs{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Gt.DEFAULT_UP),this.updateMatrix(),this.target=new Gt,this.shadow=new Xu}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}};var Cl=class extends nn{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}};var Il=class{constructor(e,t,i){this.binding=e,this.valueSize=i;let r,s,o;switch(t){case"quaternion":r=this._slerp,s=this._slerpAdditive,o=this._setAdditiveIdentityQuaternion,this.buffer=new Float64Array(i*6),this._workIndex=5;break;case"string":case"bool":r=this._select,s=this._select,o=this._setAdditiveIdentityOther,this.buffer=new Array(i*5);break;default:r=this._lerp,s=this._lerpAdditive,o=this._setAdditiveIdentityNumeric,this.buffer=new Float64Array(i*5)}this._mixBufferRegion=r,this._mixBufferRegionAdditive=s,this._setIdentity=o,this._origIndex=3,this._addIndex=4,this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,this.useCount=0,this.referenceCount=0}accumulate(e,t){let i=this.buffer,r=this.valueSize,s=e*r+r,o=this.cumulativeWeight;if(o===0){for(let a=0;a!==r;++a)i[s+a]=i[a];o=t}else{o+=t;let a=t/o;this._mixBufferRegion(i,s,0,a,r)}this.cumulativeWeight=o}accumulateAdditive(e){let t=this.buffer,i=this.valueSize,r=i*this._addIndex;this.cumulativeWeightAdditive===0&&this._setIdentity(),this._mixBufferRegionAdditive(t,r,0,e,i),this.cumulativeWeightAdditive+=e}apply(e){let t=this.valueSize,i=this.buffer,r=e*t+t,s=this.cumulativeWeight,o=this.cumulativeWeightAdditive,a=this.binding;if(this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,s<1){let l=t*this._origIndex;this._mixBufferRegion(i,r,l,1-s,t)}o>0&&this._mixBufferRegionAdditive(i,r,this._addIndex*t,1,t);for(let l=t,c=t+t;l!==c;++l)if(i[l]!==i[l+t]){a.setValue(i,r);break}}saveOriginalState(){let e=this.binding,t=this.buffer,i=this.valueSize,r=i*this._origIndex;e.getValue(t,r);for(let s=i,o=r;s!==o;++s)t[s]=t[r+s%i];this._setIdentity(),this.cumulativeWeight=0,this.cumulativeWeightAdditive=0}restoreOriginalState(){let e=this.valueSize*3;this.binding.setValue(this.buffer,e)}_setAdditiveIdentityNumeric(){let e=this._addIndex*this.valueSize,t=e+this.valueSize;for(let i=e;i<t;i++)this.buffer[i]=0}_setAdditiveIdentityQuaternion(){this._setAdditiveIdentityNumeric(),this.buffer[this._addIndex*this.valueSize+3]=1}_setAdditiveIdentityOther(){let e=this._origIndex*this.valueSize,t=this._addIndex*this.valueSize;for(let i=0;i<this.valueSize;i++)this.buffer[t+i]=this.buffer[e+i]}_select(e,t,i,r,s){if(r>=.5)for(let o=0;o!==s;++o)e[t+o]=e[i+o]}_slerp(e,t,i,r){cn.slerpFlat(e,t,e,t,e,i,r)}_slerpAdditive(e,t,i,r,s){let o=this._workIndex*s;cn.multiplyQuaternionsFlat(e,o,e,t,e,i),cn.slerpFlat(e,t,e,t,e,o,r)}_lerp(e,t,i,r,s){let o=1-r;for(let a=0;a!==s;++a){let l=t+a;e[l]=e[l]*o+e[i+a]*r}}_lerpAdditive(e,t,i,r,s){for(let o=0;o!==s;++o){let a=t+o;e[a]=e[a]+e[i+o]*r}}},ph="\\[\\]\\.:\\/",c0=new RegExp("["+ph+"]","g"),mh="[^"+ph+"]",u0="[^"+ph.replace("\\.","")+"]",h0=/((?:WC+[\/:])*)/.source.replace("WC",mh),d0=/(WCOD+)?/.source.replace("WCOD",u0),f0=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",mh),p0=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",mh),m0=new RegExp("^"+h0+d0+f0+p0+"$"),g0=["material","materials","bones","map"],$u=class{constructor(e,t,i){let r=i||Et.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,r)}getValue(e,t){this.bind();let i=this._targetGroup.nCachedObjects_,r=this._bindings[i];r!==void 0&&r.getValue(e,t)}setValue(e,t){let i=this._bindings;for(let r=this._targetGroup.nCachedObjects_,s=i.length;r!==s;++r)i[r].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,i=e.length;t!==i;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,i=e.length;t!==i;++t)e[t].unbind()}},Et=class n{constructor(e,t,i){this.path=t,this.parsedPath=i||n.parseTrackName(t),this.node=n.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,i){return e&&e.isAnimationObjectGroup?new n.Composite(e,t,i):new n(e,t,i)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(c0,"")}static parseTrackName(e){let t=m0.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);let i={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},r=i.nodeName&&i.nodeName.lastIndexOf(".");if(r!==void 0&&r!==-1){let s=i.nodeName.substring(r+1);g0.indexOf(s)!==-1&&(i.nodeName=i.nodeName.substring(0,r),i.objectName=s)}if(i.propertyName===null||i.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return i}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let i=e.skeleton.getBoneByName(t);if(i!==void 0)return i}if(e.children){let i=function(s){for(let o=0;o<s.length;o++){let a=s[o];if(a.name===t||a.uuid===t)return a;let l=i(a.children);if(l)return l}return null},r=i(e.children);if(r)return r}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let i=this.resolvedProperty;for(let r=0,s=i.length;r!==s;++r)e[t++]=i[r]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let i=this.resolvedProperty;for(let r=0,s=i.length;r!==s;++r)i[r]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let i=this.resolvedProperty;for(let r=0,s=i.length;r!==s;++r)i[r]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let i=this.resolvedProperty;for(let r=0,s=i.length;r!==s;++r)i[r]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node,t=this.parsedPath,i=t.objectName,r=t.propertyName,s=t.propertyIndex;if(e||(e=n.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(i){let c=t.objectIndex;switch(i){case"materials":if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let u=0;u<e.length;u++)if(e[u].name===c){c=u;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[i]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[i]}if(c!==void 0){if(e[c]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[c]}}let o=e[r];if(o===void 0){let c=t.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+c+"."+r+" but it wasn't found.",e);return}let a=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?a=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(s!==void 0){if(r==="morphTargetInfluences"){if(!e.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[s]!==void 0&&(s=e.morphTargetDictionary[s])}l=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=s}else o.fromArray!==void 0&&o.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(l=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=r;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};Et.Composite=$u;Et.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};Et.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};Et.prototype.GetterByBindingType=[Et.prototype._getValue_direct,Et.prototype._getValue_array,Et.prototype._getValue_arrayElement,Et.prototype._getValue_toArray];Et.prototype.SetterByBindingTypeAndVersioning=[[Et.prototype._setValue_direct,Et.prototype._setValue_direct_setNeedsUpdate,Et.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Et.prototype._setValue_array,Et.prototype._setValue_array_setNeedsUpdate,Et.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Et.prototype._setValue_arrayElement,Et.prototype._setValue_arrayElement_setNeedsUpdate,Et.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Et.prototype._setValue_fromArray,Et.prototype._setValue_fromArray_setNeedsUpdate,Et.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var Pl=class{constructor(e,t,i=null,r=t.blendMode){this._mixer=e,this._clip=t,this._localRoot=i,this.blendMode=r;let s=t.tracks,o=s.length,a=new Array(o),l={endingStart:Cr,endingEnd:Cr};for(let c=0;c!==o;++c){let u=s[c].createInterpolant(null);a[c]=u,u.settings=l}this._interpolantSettings=l,this._interpolants=a,this._propertyBindings=new Array(o),this._cacheIndex=null,this._byClipCacheIndex=null,this._timeScaleInterpolant=null,this._weightInterpolant=null,this.loop=Lf,this._loopCount=-1,this._startTime=null,this.time=0,this.timeScale=1,this._effectiveTimeScale=1,this.weight=1,this._effectiveWeight=1,this.repetitions=1/0,this.paused=!1,this.enabled=!0,this.clampWhenFinished=!1,this.zeroSlopeAtStart=!0,this.zeroSlopeAtEnd=!0}play(){return this._mixer._activateAction(this),this}stop(){return this._mixer._deactivateAction(this),this.reset()}reset(){return this.paused=!1,this.enabled=!0,this.time=0,this._loopCount=-1,this._startTime=null,this.stopFading().stopWarping()}isRunning(){return this.enabled&&!this.paused&&this.timeScale!==0&&this._startTime===null&&this._mixer._isActiveAction(this)}isScheduled(){return this._mixer._isActiveAction(this)}startAt(e){return this._startTime=e,this}setLoop(e,t){return this.loop=e,this.repetitions=t,this}setEffectiveWeight(e){return this.weight=e,this._effectiveWeight=this.enabled?e:0,this.stopFading()}getEffectiveWeight(){return this._effectiveWeight}fadeIn(e){return this._scheduleFading(e,0,1)}fadeOut(e){return this._scheduleFading(e,1,0)}crossFadeFrom(e,t,i=!1){if(e.fadeOut(t),this.fadeIn(t),i===!0){let r=this._clip.duration,s=e._clip.duration,o=s/r,a=r/s;e.warp(1,o,t),this.warp(a,1,t)}return this}crossFadeTo(e,t,i=!1){return e.crossFadeFrom(this,t,i)}stopFading(){let e=this._weightInterpolant;return e!==null&&(this._weightInterpolant=null,this._mixer._takeBackControlInterpolant(e)),this}setEffectiveTimeScale(e){return this.timeScale=e,this._effectiveTimeScale=this.paused?0:e,this.stopWarping()}getEffectiveTimeScale(){return this._effectiveTimeScale}setDuration(e){return this.timeScale=this._clip.duration/e,this.stopWarping()}syncWith(e){return this.time=e.time,this.timeScale=e.timeScale,this.stopWarping()}halt(e){return this.warp(this._effectiveTimeScale,0,e)}warp(e,t,i){let r=this._mixer,s=r.time,o=this.timeScale,a=this._timeScaleInterpolant;a===null&&(a=r._lendControlInterpolant(),this._timeScaleInterpolant=a);let l=a.parameterPositions,c=a.sampleValues;return l[0]=s,l[1]=s+i,c[0]=e/o,c[1]=t/o,this}stopWarping(){let e=this._timeScaleInterpolant;return e!==null&&(this._timeScaleInterpolant=null,this._mixer._takeBackControlInterpolant(e)),this}getMixer(){return this._mixer}getClip(){return this._clip}getRoot(){return this._localRoot||this._mixer._root}_update(e,t,i,r){if(!this.enabled){this._updateWeight(e);return}let s=this._startTime;if(s!==null){let l=(e-s)*i;l<0||i===0?t=0:(this._startTime=null,t=i*l)}t*=this._updateTimeScale(e);let o=this._updateTime(t),a=this._updateWeight(e);if(a>0){let l=this._interpolants,c=this._propertyBindings;switch(this.blendMode){case Nf:for(let u=0,h=l.length;u!==h;++u)l[u].evaluate(o),c[u].accumulateAdditive(a);break;case wc:default:for(let u=0,h=l.length;u!==h;++u)l[u].evaluate(o),c[u].accumulate(r,a)}}}_updateWeight(e){let t=0;if(this.enabled){t=this.weight;let i=this._weightInterpolant;if(i!==null){let r=i.evaluate(e)[0];t*=r,e>i.parameterPositions[1]&&(this.stopFading(),r===0&&(this.enabled=!1))}}return this._effectiveWeight=t,t}_updateTimeScale(e){let t=0;if(!this.paused){t=this.timeScale;let i=this._timeScaleInterpolant;if(i!==null){let r=i.evaluate(e)[0];t*=r,e>i.parameterPositions[1]&&(this.stopWarping(),t===0?this.paused=!0:this.timeScale=t)}}return this._effectiveTimeScale=t,t}_updateTime(e){let t=this._clip.duration,i=this.loop,r=this.time+e,s=this._loopCount,o=i===Uf;if(e===0)return s===-1?r:o&&(s&1)===1?t-r:r;if(i===Df){s===-1&&(this._loopCount=0,this._setEndings(!0,!0,!1));e:{if(r>=t)r=t;else if(r<0)r=0;else{this.time=r;break e}this.clampWhenFinished?this.paused=!0:this.enabled=!1,this.time=r,this._mixer.dispatchEvent({type:"finished",action:this,direction:e<0?-1:1})}}else{if(s===-1&&(e>=0?(s=0,this._setEndings(!0,this.repetitions===0,o)):this._setEndings(this.repetitions===0,!0,o)),r>=t||r<0){let a=Math.floor(r/t);r-=t*a,s+=Math.abs(a);let l=this.repetitions-s;if(l<=0)this.clampWhenFinished?this.paused=!0:this.enabled=!1,r=e>0?t:0,this.time=r,this._mixer.dispatchEvent({type:"finished",action:this,direction:e>0?1:-1});else{if(l===1){let c=e<0;this._setEndings(c,!c,o)}else this._setEndings(!1,!1,o);this._loopCount=s,this.time=r,this._mixer.dispatchEvent({type:"loop",action:this,loopDelta:a})}}else this.time=r;if(o&&(s&1)===1)return t-r}return r}_setEndings(e,t,i){let r=this._interpolantSettings;i?(r.endingStart=Ir,r.endingEnd=Ir):(e?r.endingStart=this.zeroSlopeAtStart?Ir:Cr:r.endingStart=Ao,t?r.endingEnd=this.zeroSlopeAtEnd?Ir:Cr:r.endingEnd=Ao)}_scheduleFading(e,t,i){let r=this._mixer,s=r.time,o=this._weightInterpolant;o===null&&(o=r._lendControlInterpolant(),this._weightInterpolant=o);let a=o.parameterPositions,l=o.sampleValues;return a[0]=s,l[0]=t,a[1]=s+e,l[1]=i,this}},x0=new Float32Array(1),Gr=class extends bi{constructor(e){super(),this._root=e,this._initMemoryManager(),this._accuIndex=0,this.time=0,this.timeScale=1}_bindAction(e,t){let i=e._localRoot||this._root,r=e._clip.tracks,s=r.length,o=e._propertyBindings,a=e._interpolants,l=i.uuid,c=this._bindingsByRootAndName,u=c[l];u===void 0&&(u={},c[l]=u);for(let h=0;h!==s;++h){let d=r[h],f=d.name,m=u[f];if(m!==void 0)++m.referenceCount,o[h]=m;else{if(m=o[h],m!==void 0){m._cacheIndex===null&&(++m.referenceCount,this._addInactiveBinding(m,l,f));continue}let x=t&&t._propertyBindings[h].binding.parsedPath;m=new Il(Et.create(i,f,x),d.ValueTypeName,d.getValueSize()),++m.referenceCount,this._addInactiveBinding(m,l,f),o[h]=m}a[h].resultBuffer=m.buffer}}_activateAction(e){if(!this._isActiveAction(e)){if(e._cacheIndex===null){let i=(e._localRoot||this._root).uuid,r=e._clip.uuid,s=this._actionsByClip[r];this._bindAction(e,s&&s.knownActions[0]),this._addInactiveAction(e,r,i)}let t=e._propertyBindings;for(let i=0,r=t.length;i!==r;++i){let s=t[i];s.useCount++===0&&(this._lendBinding(s),s.saveOriginalState())}this._lendAction(e)}}_deactivateAction(e){if(this._isActiveAction(e)){let t=e._propertyBindings;for(let i=0,r=t.length;i!==r;++i){let s=t[i];--s.useCount===0&&(s.restoreOriginalState(),this._takeBackBinding(s))}this._takeBackAction(e)}}_initMemoryManager(){this._actions=[],this._nActiveActions=0,this._actionsByClip={},this._bindings=[],this._nActiveBindings=0,this._bindingsByRootAndName={},this._controlInterpolants=[],this._nActiveControlInterpolants=0;let e=this;this.stats={actions:{get total(){return e._actions.length},get inUse(){return e._nActiveActions}},bindings:{get total(){return e._bindings.length},get inUse(){return e._nActiveBindings}},controlInterpolants:{get total(){return e._controlInterpolants.length},get inUse(){return e._nActiveControlInterpolants}}}}_isActiveAction(e){let t=e._cacheIndex;return t!==null&&t<this._nActiveActions}_addInactiveAction(e,t,i){let r=this._actions,s=this._actionsByClip,o=s[t];if(o===void 0)o={knownActions:[e],actionByRoot:{}},e._byClipCacheIndex=0,s[t]=o;else{let a=o.knownActions;e._byClipCacheIndex=a.length,a.push(e)}e._cacheIndex=r.length,r.push(e),o.actionByRoot[i]=e}_removeInactiveAction(e){let t=this._actions,i=t[t.length-1],r=e._cacheIndex;i._cacheIndex=r,t[r]=i,t.pop(),e._cacheIndex=null;let s=e._clip.uuid,o=this._actionsByClip,a=o[s],l=a.knownActions,c=l[l.length-1],u=e._byClipCacheIndex;c._byClipCacheIndex=u,l[u]=c,l.pop(),e._byClipCacheIndex=null;let h=a.actionByRoot,d=(e._localRoot||this._root).uuid;delete h[d],l.length===0&&delete o[s],this._removeInactiveBindingsForAction(e)}_removeInactiveBindingsForAction(e){let t=e._propertyBindings;for(let i=0,r=t.length;i!==r;++i){let s=t[i];--s.referenceCount===0&&this._removeInactiveBinding(s)}}_lendAction(e){let t=this._actions,i=e._cacheIndex,r=this._nActiveActions++,s=t[r];e._cacheIndex=r,t[r]=e,s._cacheIndex=i,t[i]=s}_takeBackAction(e){let t=this._actions,i=e._cacheIndex,r=--this._nActiveActions,s=t[r];e._cacheIndex=r,t[r]=e,s._cacheIndex=i,t[i]=s}_addInactiveBinding(e,t,i){let r=this._bindingsByRootAndName,s=this._bindings,o=r[t];o===void 0&&(o={},r[t]=o),o[i]=e,e._cacheIndex=s.length,s.push(e)}_removeInactiveBinding(e){let t=this._bindings,i=e.binding,r=i.rootNode.uuid,s=i.path,o=this._bindingsByRootAndName,a=o[r],l=t[t.length-1],c=e._cacheIndex;l._cacheIndex=c,t[c]=l,t.pop(),delete a[s],Object.keys(a).length===0&&delete o[r]}_lendBinding(e){let t=this._bindings,i=e._cacheIndex,r=this._nActiveBindings++,s=t[r];e._cacheIndex=r,t[r]=e,s._cacheIndex=i,t[i]=s}_takeBackBinding(e){let t=this._bindings,i=e._cacheIndex,r=--this._nActiveBindings,s=t[r];e._cacheIndex=r,t[r]=e,s._cacheIndex=i,t[i]=s}_lendControlInterpolant(){let e=this._controlInterpolants,t=this._nActiveControlInterpolants++,i=e[t];return i===void 0&&(i=new ia(new Float32Array(2),new Float32Array(2),1,x0),i.__cacheIndex=t,e[t]=i),i}_takeBackControlInterpolant(e){let t=this._controlInterpolants,i=e.__cacheIndex,r=--this._nActiveControlInterpolants,s=t[r];e.__cacheIndex=r,t[r]=e,s.__cacheIndex=i,t[i]=s}clipAction(e,t,i){let r=t||this._root,s=r.uuid,o=typeof e=="string"?Hi.findByName(r,e):e,a=o!==null?o.uuid:e,l=this._actionsByClip[a],c=null;if(i===void 0&&(o!==null?i=o.blendMode:i=wc),l!==void 0){let h=l.actionByRoot[s];if(h!==void 0&&h.blendMode===i)return h;c=l.knownActions[0],o===null&&(o=c._clip)}if(o===null)return null;let u=new Pl(this,o,t,i);return this._bindAction(u,c),this._addInactiveAction(u,a,s),u}existingAction(e,t){let i=t||this._root,r=i.uuid,s=typeof e=="string"?Hi.findByName(i,e):e,o=s?s.uuid:e,a=this._actionsByClip[o];return a!==void 0&&a.actionByRoot[r]||null}stopAllAction(){let e=this._actions,t=this._nActiveActions;for(let i=t-1;i>=0;--i)e[i].stop();return this}update(e){e*=this.timeScale;let t=this._actions,i=this._nActiveActions,r=this.time+=e,s=Math.sign(e),o=this._accuIndex^=1;for(let c=0;c!==i;++c)t[c]._update(r,e,s,o);let a=this._bindings,l=this._nActiveBindings;for(let c=0;c!==l;++c)a[c].apply(o);return this}setTime(e){this.time=0;for(let t=0;t<this._actions.length;t++)this._actions[t].time=0;return this.update(e)}getRoot(){return this._root}uncacheClip(e){let t=this._actions,i=e.uuid,r=this._actionsByClip,s=r[i];if(s!==void 0){let o=s.knownActions;for(let a=0,l=o.length;a!==l;++a){let c=o[a];this._deactivateAction(c);let u=c._cacheIndex,h=t[t.length-1];c._cacheIndex=null,c._byClipCacheIndex=null,h._cacheIndex=u,t[u]=h,t.pop(),this._removeInactiveBindingsForAction(c)}delete r[i]}}uncacheRoot(e){let t=e.uuid,i=this._actionsByClip;for(let o in i){let a=i[o].actionByRoot,l=a[t];l!==void 0&&(this._deactivateAction(l),this._removeInactiveAction(l))}let r=this._bindingsByRootAndName,s=r[t];if(s!==void 0)for(let o in s){let a=s[o];a.restoreOriginalState(),this._removeInactiveBinding(a)}}uncacheAction(e,t){let i=this.existingAction(e,t);i!==null&&(this._deactivateAction(i),this._removeInactiveAction(i))}};function gh(n,e,t,i){let r=v0(i);switch(t){case ih:return n*e;case ql:return n*e/r.components*r.byteLength;case Yl:return n*e/r.components*r.byteLength;case sh:return n*e*2/r.components*r.byteLength;case Zl:return n*e*2/r.components*r.byteLength;case rh:return n*e*3/r.components*r.byteLength;case Nn:return n*e*4/r.components*r.byteLength;case Jl:return n*e*4/r.components*r.byteLength;case da:case fa:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case pa:case ma:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case jl:case ec:return Math.max(n,16)*Math.max(e,8)/4;case Kl:case Ql:return Math.max(n,8)*Math.max(e,8)/2;case tc:case nc:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case ic:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case rc:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case sc:return Math.floor((n+4)/5)*Math.floor((e+3)/4)*16;case oc:return Math.floor((n+4)/5)*Math.floor((e+4)/5)*16;case ac:return Math.floor((n+5)/6)*Math.floor((e+4)/5)*16;case lc:return Math.floor((n+5)/6)*Math.floor((e+5)/6)*16;case cc:return Math.floor((n+7)/8)*Math.floor((e+4)/5)*16;case uc:return Math.floor((n+7)/8)*Math.floor((e+5)/6)*16;case hc:return Math.floor((n+7)/8)*Math.floor((e+7)/8)*16;case dc:return Math.floor((n+9)/10)*Math.floor((e+4)/5)*16;case fc:return Math.floor((n+9)/10)*Math.floor((e+5)/6)*16;case pc:return Math.floor((n+9)/10)*Math.floor((e+7)/8)*16;case mc:return Math.floor((n+9)/10)*Math.floor((e+9)/10)*16;case gc:return Math.floor((n+11)/12)*Math.floor((e+9)/10)*16;case xc:return Math.floor((n+11)/12)*Math.floor((e+11)/12)*16;case vc:case yc:case _c:return Math.ceil(n/4)*Math.ceil(e/4)*16;case bc:case Mc:return Math.ceil(n/4)*Math.ceil(e/4)*8;case Sc:case Ec:return Math.ceil(n/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function v0(n){switch(n){case li:case Qu:return{byteLength:1,components:1};case ks:case eh:case Hs:return{byteLength:2,components:1};case Xl:case $l:return{byteLength:2,components:4};case ur:case Wl:case $n:return{byteLength:4,components:1};case th:case nh:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${n}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"180"}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="180");function wp(){let n=null,e=!1,t=null,i=null;function r(s,o){t(s,o),i=n.requestAnimationFrame(r)}return{start:function(){e!==!0&&t!==null&&(i=n.requestAnimationFrame(r),e=!0)},stop:function(){n.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){n=s}}}function E0(n){let e=new WeakMap;function t(a,l){let c=a.array,u=a.usage,h=c.byteLength,d=n.createBuffer();n.bindBuffer(l,d),n.bufferData(l,c,u),a.onUploadCallback();let f;if(c instanceof Float32Array)f=n.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)f=n.HALF_FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?f=n.HALF_FLOAT:f=n.UNSIGNED_SHORT;else if(c instanceof Int16Array)f=n.SHORT;else if(c instanceof Uint32Array)f=n.UNSIGNED_INT;else if(c instanceof Int32Array)f=n.INT;else if(c instanceof Int8Array)f=n.BYTE;else if(c instanceof Uint8Array)f=n.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)f=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:d,type:f,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:h}}function i(a,l,c){let u=l.array,h=l.updateRanges;if(n.bindBuffer(c,a),h.length===0)n.bufferSubData(c,0,u);else{h.sort((f,m)=>f.start-m.start);let d=0;for(let f=1;f<h.length;f++){let m=h[d],x=h[f];x.start<=m.start+m.count+1?m.count=Math.max(m.count,x.start+x.count-m.start):(++d,h[d]=x)}h.length=d+1;for(let f=0,m=h.length;f<m;f++){let x=h[f];n.bufferSubData(c,x.start*u.BYTES_PER_ELEMENT,u,x.start,x.count)}l.clearUpdateRanges()}l.onUploadCallback()}function r(a){return a.isInterleavedBufferAttribute&&(a=a.data),e.get(a)}function s(a){a.isInterleavedBufferAttribute&&(a=a.data);let l=e.get(a);l&&(n.deleteBuffer(l.buffer),e.delete(a))}function o(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){let u=e.get(a);(!u||u.version<a.version)&&e.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}let c=e.get(a);if(c===void 0)e.set(a,t(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,a,l),c.version=a.version}}return{get:r,remove:s,update:o}}var w0=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,T0=`#ifdef USE_ALPHAHASH
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
#endif`,A0=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,R0=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,C0=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,I0=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,P0=`#ifdef USE_AOMAP
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
#endif`,D0=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,L0=`#ifdef USE_BATCHING
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
#endif`,U0=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,N0=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,F0=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,O0=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,z0=`#ifdef USE_IRIDESCENCE
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
#endif`,B0=`#ifdef USE_BUMPMAP
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
#endif`,k0=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,H0=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,V0=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,G0=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,W0=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,X0=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,$0=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,q0=`#if defined( USE_COLOR_ALPHA )
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
#endif`,Y0=`#define PI 3.141592653589793
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
} // validated`,Z0=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,J0=`vec3 transformedNormal = objectNormal;
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
#endif`,K0=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,j0=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Q0=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,ex=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,tx="gl_FragColor = linearToOutputTexel( gl_FragColor );",nx=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,ix=`#ifdef USE_ENVMAP
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
#endif`,rx=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,sx=`#ifdef USE_ENVMAP
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
#endif`,ox=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,ax=`#ifdef USE_ENVMAP
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
#endif`,lx=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,cx=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,ux=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,hx=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,dx=`#ifdef USE_GRADIENTMAP
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
}`,fx=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,px=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,mx=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,gx=`uniform bool receiveShadow;
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
#endif`,xx=`#ifdef USE_ENVMAP
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
#endif`,vx=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,yx=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,_x=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,bx=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Mx=`PhysicalMaterial material;
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
#endif`,Sx=`struct PhysicalMaterial {
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
}`,Ex=`
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
#endif`,wx=`#if defined( RE_IndirectDiffuse )
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
#endif`,Tx=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Ax=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Rx=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Cx=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Ix=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Px=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Dx=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Lx=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Ux=`#if defined( USE_POINTS_UV )
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
#endif`,Nx=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Fx=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Ox=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,zx=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Bx=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,kx=`#ifdef USE_MORPHTARGETS
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
#endif`,Hx=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Vx=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Gx=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,Wx=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Xx=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,$x=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,qx=`#ifdef USE_NORMALMAP
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
#endif`,Yx=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Zx=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Jx=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Kx=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,jx=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Qx=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,ev=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,tv=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,nv=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,iv=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,rv=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,sv=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,ov=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,av=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,lv=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,cv=`float getShadowMask() {
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
}`,uv=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,hv=`#ifdef USE_SKINNING
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
#endif`,dv=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,fv=`#ifdef USE_SKINNING
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
#endif`,pv=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,mv=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,gv=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,xv=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,vv=`#ifdef USE_TRANSMISSION
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
#endif`,yv=`#ifdef USE_TRANSMISSION
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
#endif`,_v=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,bv=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Mv=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Sv=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,Ev=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,wv=`uniform sampler2D t2D;
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
}`,Tv=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Av=`#ifdef ENVMAP_TYPE_CUBE
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
}`,Rv=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Cv=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Iv=`#include <common>
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
}`,Pv=`#if DEPTH_PACKING == 3200
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
}`,Dv=`#define DISTANCE
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
}`,Lv=`#define DISTANCE
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
}`,Uv=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Nv=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Fv=`uniform float scale;
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
}`,Ov=`uniform vec3 diffuse;
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
}`,zv=`#include <common>
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
}`,Bv=`uniform vec3 diffuse;
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
}`,kv=`#define LAMBERT
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
}`,Hv=`#define LAMBERT
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
}`,Vv=`#define MATCAP
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
}`,Gv=`#define MATCAP
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
}`,Wv=`#define NORMAL
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
}`,Xv=`#define NORMAL
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
}`,$v=`#define PHONG
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
}`,qv=`#define PHONG
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
}`,Yv=`#define STANDARD
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
}`,Zv=`#define STANDARD
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
}`,Jv=`#define TOON
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
}`,Kv=`#define TOON
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
}`,jv=`uniform float size;
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
}`,Qv=`uniform vec3 diffuse;
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
}`,ey=`#include <common>
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
}`,ty=`uniform vec3 color;
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
}`,ny=`uniform float rotation;
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
}`,iy=`uniform vec3 diffuse;
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
}`,rt={alphahash_fragment:w0,alphahash_pars_fragment:T0,alphamap_fragment:A0,alphamap_pars_fragment:R0,alphatest_fragment:C0,alphatest_pars_fragment:I0,aomap_fragment:P0,aomap_pars_fragment:D0,batching_pars_vertex:L0,batching_vertex:U0,begin_vertex:N0,beginnormal_vertex:F0,bsdfs:O0,iridescence_fragment:z0,bumpmap_pars_fragment:B0,clipping_planes_fragment:k0,clipping_planes_pars_fragment:H0,clipping_planes_pars_vertex:V0,clipping_planes_vertex:G0,color_fragment:W0,color_pars_fragment:X0,color_pars_vertex:$0,color_vertex:q0,common:Y0,cube_uv_reflection_fragment:Z0,defaultnormal_vertex:J0,displacementmap_pars_vertex:K0,displacementmap_vertex:j0,emissivemap_fragment:Q0,emissivemap_pars_fragment:ex,colorspace_fragment:tx,colorspace_pars_fragment:nx,envmap_fragment:ix,envmap_common_pars_fragment:rx,envmap_pars_fragment:sx,envmap_pars_vertex:ox,envmap_physical_pars_fragment:xx,envmap_vertex:ax,fog_vertex:lx,fog_pars_vertex:cx,fog_fragment:ux,fog_pars_fragment:hx,gradientmap_pars_fragment:dx,lightmap_pars_fragment:fx,lights_lambert_fragment:px,lights_lambert_pars_fragment:mx,lights_pars_begin:gx,lights_toon_fragment:vx,lights_toon_pars_fragment:yx,lights_phong_fragment:_x,lights_phong_pars_fragment:bx,lights_physical_fragment:Mx,lights_physical_pars_fragment:Sx,lights_fragment_begin:Ex,lights_fragment_maps:wx,lights_fragment_end:Tx,logdepthbuf_fragment:Ax,logdepthbuf_pars_fragment:Rx,logdepthbuf_pars_vertex:Cx,logdepthbuf_vertex:Ix,map_fragment:Px,map_pars_fragment:Dx,map_particle_fragment:Lx,map_particle_pars_fragment:Ux,metalnessmap_fragment:Nx,metalnessmap_pars_fragment:Fx,morphinstance_vertex:Ox,morphcolor_vertex:zx,morphnormal_vertex:Bx,morphtarget_pars_vertex:kx,morphtarget_vertex:Hx,normal_fragment_begin:Vx,normal_fragment_maps:Gx,normal_pars_fragment:Wx,normal_pars_vertex:Xx,normal_vertex:$x,normalmap_pars_fragment:qx,clearcoat_normal_fragment_begin:Yx,clearcoat_normal_fragment_maps:Zx,clearcoat_pars_fragment:Jx,iridescence_pars_fragment:Kx,opaque_fragment:jx,packing:Qx,premultiplied_alpha_fragment:ev,project_vertex:tv,dithering_fragment:nv,dithering_pars_fragment:iv,roughnessmap_fragment:rv,roughnessmap_pars_fragment:sv,shadowmap_pars_fragment:ov,shadowmap_pars_vertex:av,shadowmap_vertex:lv,shadowmask_pars_fragment:cv,skinbase_vertex:uv,skinning_pars_vertex:hv,skinning_vertex:dv,skinnormal_vertex:fv,specularmap_fragment:pv,specularmap_pars_fragment:mv,tonemapping_fragment:gv,tonemapping_pars_fragment:xv,transmission_fragment:vv,transmission_pars_fragment:yv,uv_pars_fragment:_v,uv_pars_vertex:bv,uv_vertex:Mv,worldpos_vertex:Sv,background_vert:Ev,background_frag:wv,backgroundCube_vert:Tv,backgroundCube_frag:Av,cube_vert:Rv,cube_frag:Cv,depth_vert:Iv,depth_frag:Pv,distanceRGBA_vert:Dv,distanceRGBA_frag:Lv,equirect_vert:Uv,equirect_frag:Nv,linedashed_vert:Fv,linedashed_frag:Ov,meshbasic_vert:zv,meshbasic_frag:Bv,meshlambert_vert:kv,meshlambert_frag:Hv,meshmatcap_vert:Vv,meshmatcap_frag:Gv,meshnormal_vert:Wv,meshnormal_frag:Xv,meshphong_vert:$v,meshphong_frag:qv,meshphysical_vert:Yv,meshphysical_frag:Zv,meshtoon_vert:Jv,meshtoon_frag:Kv,points_vert:jv,points_frag:Qv,shadow_vert:ey,shadow_frag:ty,sprite_vert:ny,sprite_frag:iy},Ae={common:{diffuse:{value:new tt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new it},alphaMap:{value:null},alphaMapTransform:{value:new it},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new it}},envmap:{envMap:{value:null},envMapRotation:{value:new it},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new it}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new it}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new it},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new it},normalScale:{value:new Ee(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new it},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new it}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new it}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new it}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new tt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new tt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new it},alphaTest:{value:0},uvTransform:{value:new it}},sprite:{diffuse:{value:new tt(16777215)},opacity:{value:1},center:{value:new Ee(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new it},alphaMap:{value:null},alphaMapTransform:{value:new it},alphaTest:{value:0}}},Ti={basic:{uniforms:un([Ae.common,Ae.specularmap,Ae.envmap,Ae.aomap,Ae.lightmap,Ae.fog]),vertexShader:rt.meshbasic_vert,fragmentShader:rt.meshbasic_frag},lambert:{uniforms:un([Ae.common,Ae.specularmap,Ae.envmap,Ae.aomap,Ae.lightmap,Ae.emissivemap,Ae.bumpmap,Ae.normalmap,Ae.displacementmap,Ae.fog,Ae.lights,{emissive:{value:new tt(0)}}]),vertexShader:rt.meshlambert_vert,fragmentShader:rt.meshlambert_frag},phong:{uniforms:un([Ae.common,Ae.specularmap,Ae.envmap,Ae.aomap,Ae.lightmap,Ae.emissivemap,Ae.bumpmap,Ae.normalmap,Ae.displacementmap,Ae.fog,Ae.lights,{emissive:{value:new tt(0)},specular:{value:new tt(1118481)},shininess:{value:30}}]),vertexShader:rt.meshphong_vert,fragmentShader:rt.meshphong_frag},standard:{uniforms:un([Ae.common,Ae.envmap,Ae.aomap,Ae.lightmap,Ae.emissivemap,Ae.bumpmap,Ae.normalmap,Ae.displacementmap,Ae.roughnessmap,Ae.metalnessmap,Ae.fog,Ae.lights,{emissive:{value:new tt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:rt.meshphysical_vert,fragmentShader:rt.meshphysical_frag},toon:{uniforms:un([Ae.common,Ae.aomap,Ae.lightmap,Ae.emissivemap,Ae.bumpmap,Ae.normalmap,Ae.displacementmap,Ae.gradientmap,Ae.fog,Ae.lights,{emissive:{value:new tt(0)}}]),vertexShader:rt.meshtoon_vert,fragmentShader:rt.meshtoon_frag},matcap:{uniforms:un([Ae.common,Ae.bumpmap,Ae.normalmap,Ae.displacementmap,Ae.fog,{matcap:{value:null}}]),vertexShader:rt.meshmatcap_vert,fragmentShader:rt.meshmatcap_frag},points:{uniforms:un([Ae.points,Ae.fog]),vertexShader:rt.points_vert,fragmentShader:rt.points_frag},dashed:{uniforms:un([Ae.common,Ae.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:rt.linedashed_vert,fragmentShader:rt.linedashed_frag},depth:{uniforms:un([Ae.common,Ae.displacementmap]),vertexShader:rt.depth_vert,fragmentShader:rt.depth_frag},normal:{uniforms:un([Ae.common,Ae.bumpmap,Ae.normalmap,Ae.displacementmap,{opacity:{value:1}}]),vertexShader:rt.meshnormal_vert,fragmentShader:rt.meshnormal_frag},sprite:{uniforms:un([Ae.sprite,Ae.fog]),vertexShader:rt.sprite_vert,fragmentShader:rt.sprite_frag},background:{uniforms:{uvTransform:{value:new it},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:rt.background_vert,fragmentShader:rt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new it}},vertexShader:rt.backgroundCube_vert,fragmentShader:rt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:rt.cube_vert,fragmentShader:rt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:rt.equirect_vert,fragmentShader:rt.equirect_frag},distanceRGBA:{uniforms:un([Ae.common,Ae.displacementmap,{referencePosition:{value:new P},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:rt.distanceRGBA_vert,fragmentShader:rt.distanceRGBA_frag},shadow:{uniforms:un([Ae.lights,Ae.fog,{color:{value:new tt(0)},opacity:{value:1}}]),vertexShader:rt.shadow_vert,fragmentShader:rt.shadow_frag}};Ti.physical={uniforms:un([Ti.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new it},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new it},clearcoatNormalScale:{value:new Ee(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new it},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new it},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new it},sheen:{value:0},sheenColor:{value:new tt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new it},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new it},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new it},transmissionSamplerSize:{value:new Ee},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new it},attenuationDistance:{value:0},attenuationColor:{value:new tt(0)},specularColor:{value:new tt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new it},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new it},anisotropyVector:{value:new Ee},anisotropyMap:{value:null},anisotropyMapTransform:{value:new it}}]),vertexShader:rt.meshphysical_vert,fragmentShader:rt.meshphysical_frag};var Ac={r:0,b:0,g:0},qr=new Gn,ry=new ot;function sy(n,e,t,i,r,s,o){let a=new tt(0),l=s===!0?0:1,c,u,h=null,d=0,f=null;function m(b){let v=b.isScene===!0?b.background:null;return v&&v.isTexture&&(v=(b.backgroundBlurriness>0?t:e).get(v)),v}function x(b){let v=!1,A=m(b);A===null?p(a,l):A&&A.isColor&&(p(A,1),v=!0);let R=n.xr.getEnvironmentBlendMode();R==="additive"?i.buffers.color.setClear(0,0,0,1,o):R==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,o),(n.autoClear||v)&&(i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function g(b,v){let A=m(v);A&&(A.isCubeTexture||A.mapping===ua)?(u===void 0&&(u=new Ct(new si(1,1,1),new Mn({name:"BackgroundCubeMaterial",uniforms:$r(Ti.backgroundCube.uniforms),vertexShader:Ti.backgroundCube.vertexShader,fragmentShader:Ti.backgroundCube.fragmentShader,side:mn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(R,I,U){this.matrixWorld.copyPosition(U.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(u)),qr.copy(v.backgroundRotation),qr.x*=-1,qr.y*=-1,qr.z*=-1,A.isCubeTexture&&A.isRenderTargetTexture===!1&&(qr.y*=-1,qr.z*=-1),u.material.uniforms.envMap.value=A,u.material.uniforms.flipEnvMap.value=A.isCubeTexture&&A.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=v.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,u.material.uniforms.backgroundRotation.value.setFromMatrix4(ry.makeRotationFromEuler(qr)),u.material.toneMapped=dt.getTransfer(A.colorSpace)!==yt,(h!==A||d!==A.version||f!==n.toneMapping)&&(u.material.needsUpdate=!0,h=A,d=A.version,f=n.toneMapping),u.layers.enableAll(),b.unshift(u,u.geometry,u.material,0,0,null)):A&&A.isTexture&&(c===void 0&&(c=new Ct(new lr(2,2),new Mn({name:"BackgroundMaterial",uniforms:$r(Ti.background.uniforms),vertexShader:Ti.background.vertexShader,fragmentShader:Ti.background.fragmentShader,side:Vn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(c)),c.material.uniforms.t2D.value=A,c.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,c.material.toneMapped=dt.getTransfer(A.colorSpace)!==yt,A.matrixAutoUpdate===!0&&A.updateMatrix(),c.material.uniforms.uvTransform.value.copy(A.matrix),(h!==A||d!==A.version||f!==n.toneMapping)&&(c.material.needsUpdate=!0,h=A,d=A.version,f=n.toneMapping),c.layers.enableAll(),b.unshift(c,c.geometry,c.material,0,0,null))}function p(b,v){b.getRGB(Ac,dh(n)),i.buffers.color.setClear(Ac.r,Ac.g,Ac.b,v,o)}function w(){u!==void 0&&(u.geometry.dispose(),u.material.dispose(),u=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return a},setClearColor:function(b,v=1){a.set(b),l=v,p(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(b){l=b,p(a,l)},render:x,addToRenderList:g,dispose:w}}function oy(n,e){let t=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},r=d(null),s=r,o=!1;function a(S,L,B,H,Z){let X=!1,J=h(H,B,L);s!==J&&(s=J,c(s.object)),X=f(S,H,B,Z),X&&m(S,H,B,Z),Z!==null&&e.update(Z,n.ELEMENT_ARRAY_BUFFER),(X||o)&&(o=!1,v(S,L,B,H),Z!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,e.get(Z).buffer))}function l(){return n.createVertexArray()}function c(S){return n.bindVertexArray(S)}function u(S){return n.deleteVertexArray(S)}function h(S,L,B){let H=B.wireframe===!0,Z=i[S.id];Z===void 0&&(Z={},i[S.id]=Z);let X=Z[L.id];X===void 0&&(X={},Z[L.id]=X);let J=X[H];return J===void 0&&(J=d(l()),X[H]=J),J}function d(S){let L=[],B=[],H=[];for(let Z=0;Z<t;Z++)L[Z]=0,B[Z]=0,H[Z]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:L,enabledAttributes:B,attributeDivisors:H,object:S,attributes:{},index:null}}function f(S,L,B,H){let Z=s.attributes,X=L.attributes,J=0,le=B.getAttributes();for(let $ in le)if(le[$].location>=0){let we=Z[$],Le=X[$];if(Le===void 0&&($==="instanceMatrix"&&S.instanceMatrix&&(Le=S.instanceMatrix),$==="instanceColor"&&S.instanceColor&&(Le=S.instanceColor)),we===void 0||we.attribute!==Le||Le&&we.data!==Le.data)return!0;J++}return s.attributesNum!==J||s.index!==H}function m(S,L,B,H){let Z={},X=L.attributes,J=0,le=B.getAttributes();for(let $ in le)if(le[$].location>=0){let we=X[$];we===void 0&&($==="instanceMatrix"&&S.instanceMatrix&&(we=S.instanceMatrix),$==="instanceColor"&&S.instanceColor&&(we=S.instanceColor));let Le={};Le.attribute=we,we&&we.data&&(Le.data=we.data),Z[$]=Le,J++}s.attributes=Z,s.attributesNum=J,s.index=H}function x(){let S=s.newAttributes;for(let L=0,B=S.length;L<B;L++)S[L]=0}function g(S){p(S,0)}function p(S,L){let B=s.newAttributes,H=s.enabledAttributes,Z=s.attributeDivisors;B[S]=1,H[S]===0&&(n.enableVertexAttribArray(S),H[S]=1),Z[S]!==L&&(n.vertexAttribDivisor(S,L),Z[S]=L)}function w(){let S=s.newAttributes,L=s.enabledAttributes;for(let B=0,H=L.length;B<H;B++)L[B]!==S[B]&&(n.disableVertexAttribArray(B),L[B]=0)}function b(S,L,B,H,Z,X,J){J===!0?n.vertexAttribIPointer(S,L,B,Z,X):n.vertexAttribPointer(S,L,B,H,Z,X)}function v(S,L,B,H){x();let Z=H.attributes,X=B.getAttributes(),J=L.defaultAttributeValues;for(let le in X){let $=X[le];if($.location>=0){let _e=Z[le];if(_e===void 0&&(le==="instanceMatrix"&&S.instanceMatrix&&(_e=S.instanceMatrix),le==="instanceColor"&&S.instanceColor&&(_e=S.instanceColor)),_e!==void 0){let we=_e.normalized,Le=_e.itemSize,je=e.get(_e);if(je===void 0)continue;let at=je.buffer,lt=je.type,ct=je.bytesPerElement,j=lt===n.INT||lt===n.UNSIGNED_INT||_e.gpuType===Wl;if(_e.isInterleavedBufferAttribute){let re=_e.data,Pe=re.stride,Ne=_e.offset;if(re.isInstancedInterleavedBuffer){for(let Fe=0;Fe<$.locationSize;Fe++)p($.location+Fe,re.meshPerAttribute);S.isInstancedMesh!==!0&&H._maxInstanceCount===void 0&&(H._maxInstanceCount=re.meshPerAttribute*re.count)}else for(let Fe=0;Fe<$.locationSize;Fe++)g($.location+Fe);n.bindBuffer(n.ARRAY_BUFFER,at);for(let Fe=0;Fe<$.locationSize;Fe++)b($.location+Fe,Le/$.locationSize,lt,we,Pe*ct,(Ne+Le/$.locationSize*Fe)*ct,j)}else{if(_e.isInstancedBufferAttribute){for(let re=0;re<$.locationSize;re++)p($.location+re,_e.meshPerAttribute);S.isInstancedMesh!==!0&&H._maxInstanceCount===void 0&&(H._maxInstanceCount=_e.meshPerAttribute*_e.count)}else for(let re=0;re<$.locationSize;re++)g($.location+re);n.bindBuffer(n.ARRAY_BUFFER,at);for(let re=0;re<$.locationSize;re++)b($.location+re,Le/$.locationSize,lt,we,Le*ct,Le/$.locationSize*re*ct,j)}}else if(J!==void 0){let we=J[le];if(we!==void 0)switch(we.length){case 2:n.vertexAttrib2fv($.location,we);break;case 3:n.vertexAttrib3fv($.location,we);break;case 4:n.vertexAttrib4fv($.location,we);break;default:n.vertexAttrib1fv($.location,we)}}}}w()}function A(){U();for(let S in i){let L=i[S];for(let B in L){let H=L[B];for(let Z in H)u(H[Z].object),delete H[Z];delete L[B]}delete i[S]}}function R(S){if(i[S.id]===void 0)return;let L=i[S.id];for(let B in L){let H=L[B];for(let Z in H)u(H[Z].object),delete H[Z];delete L[B]}delete i[S.id]}function I(S){for(let L in i){let B=i[L];if(B[S.id]===void 0)continue;let H=B[S.id];for(let Z in H)u(H[Z].object),delete H[Z];delete B[S.id]}}function U(){M(),o=!0,s!==r&&(s=r,c(s.object))}function M(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:a,reset:U,resetDefaultState:M,dispose:A,releaseStatesOfGeometry:R,releaseStatesOfProgram:I,initAttributes:x,enableAttribute:g,disableUnusedAttributes:w}}function ay(n,e,t){let i;function r(c){i=c}function s(c,u){n.drawArrays(i,c,u),t.update(u,i,1)}function o(c,u,h){h!==0&&(n.drawArraysInstanced(i,c,u,h),t.update(u,i,h))}function a(c,u,h){if(h===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,c,0,u,0,h);let f=0;for(let m=0;m<h;m++)f+=u[m];t.update(f,i,1)}function l(c,u,h,d){if(h===0)return;let f=e.get("WEBGL_multi_draw");if(f===null)for(let m=0;m<c.length;m++)o(c[m],u[m],d[m]);else{f.multiDrawArraysInstancedWEBGL(i,c,0,u,0,d,0,h);let m=0;for(let x=0;x<h;x++)m+=u[x]*d[x];t.update(m,i,1)}}this.setMode=r,this.render=s,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=l}function ly(n,e,t,i){let r;function s(){if(r!==void 0)return r;if(e.has("EXT_texture_filter_anisotropic")===!0){let I=e.get("EXT_texture_filter_anisotropic");r=n.getParameter(I.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function o(I){return!(I!==Nn&&i.convert(I)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(I){let U=I===Hs&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(I!==li&&i.convert(I)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE)&&I!==$n&&!U)}function l(I){if(I==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";I="mediump"}return I==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp",u=l(c);u!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",u,"instead."),c=u);let h=t.logarithmicDepthBuffer===!0,d=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control"),f=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),m=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),x=n.getParameter(n.MAX_TEXTURE_SIZE),g=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),p=n.getParameter(n.MAX_VERTEX_ATTRIBS),w=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),b=n.getParameter(n.MAX_VARYING_VECTORS),v=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),A=m>0,R=n.getParameter(n.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:h,reversedDepthBuffer:d,maxTextures:f,maxVertexTextures:m,maxTextureSize:x,maxCubemapSize:g,maxAttributes:p,maxVertexUniforms:w,maxVaryings:b,maxFragmentUniforms:v,vertexTextures:A,maxSamples:R}}function cy(n){let e=this,t=null,i=0,r=!1,s=!1,o=new _i,a=new it,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(h,d){let f=h.length!==0||d||i!==0||r;return r=d,i=h.length,f},this.beginShadows=function(){s=!0,u(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(h,d){t=u(h,d,0)},this.setState=function(h,d,f){let m=h.clippingPlanes,x=h.clipIntersection,g=h.clipShadows,p=n.get(h);if(!r||m===null||m.length===0||s&&!g)s?u(null):c();else{let w=s?0:i,b=w*4,v=p.clippingState||null;l.value=v,v=u(m,d,b,f);for(let A=0;A!==b;++A)v[A]=t[A];p.clippingState=v,this.numIntersection=x?this.numPlanes:0,this.numPlanes+=w}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function u(h,d,f,m){let x=h!==null?h.length:0,g=null;if(x!==0){if(g=l.value,m!==!0||g===null){let p=f+x*4,w=d.matrixWorldInverse;a.getNormalMatrix(w),(g===null||g.length<p)&&(g=new Float32Array(p));for(let b=0,v=f;b!==x;++b,v+=4)o.copy(h[b]).applyMatrix4(w,a),o.normal.toArray(g,v),g[v+3]=o.constant}l.value=g,l.needsUpdate=!0}return e.numPlanes=x,e.numIntersection=0,g}}function uy(n){let e=new WeakMap;function t(o,a){return a===Hl?o.mapping=Wr:a===Vl&&(o.mapping=Xr),o}function i(o){if(o&&o.isTexture){let a=o.mapping;if(a===Hl||a===Vl)if(e.has(o)){let l=e.get(o).texture;return t(l,o.mapping)}else{let l=o.image;if(l&&l.height>0){let c=new fl(l.height);return c.fromEquirectangularTexture(n,o),e.set(o,c),o.addEventListener("dispose",r),t(c.texture,o.mapping)}else return null}}return o}function r(o){let a=o.target;a.removeEventListener("dispose",r);let l=e.get(a);l!==void 0&&(e.delete(a),l.dispose())}function s(){e=new WeakMap}return{get:i,dispose:s}}var Xs=4,np=[.125,.215,.35,.446,.526,.582],Jr=20,xh=new aa,ip=new tt,vh=null,yh=0,_h=0,bh=!1,Zr=(1+Math.sqrt(5))/2,Ws=1/Zr,rp=[new P(-Zr,Ws,0),new P(Zr,Ws,0),new P(-Ws,0,Zr),new P(Ws,0,Zr),new P(0,Zr,-Ws),new P(0,Zr,Ws),new P(-1,1,-1),new P(1,1,-1),new P(-1,1,1),new P(1,1,1)],hy=new P,Ic=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,i=.1,r=100,s={}){let{size:o=256,position:a=hy}=s;vh=this._renderer.getRenderTarget(),yh=this._renderer.getActiveCubeFace(),_h=this._renderer.getActiveMipmapLevel(),bh=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(o);let l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,i,r,l,a),t>0&&this._blur(l,0,0,t),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=ap(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=op(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(vh,yh,_h),this._renderer.xr.enabled=bh,e.scissorTest=!1,Rc(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Wr||e.mapping===Xr?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),vh=this._renderer.getRenderTarget(),yh=this._renderer.getActiveCubeFace(),_h=this._renderer.getActiveMipmapLevel(),bh=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let i=t||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:ii,minFilter:ii,generateMipmaps:!1,type:Hs,format:Nn,colorSpace:Ur,depthBuffer:!1},r=sp(e,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=sp(e,t,i);let{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=dy(s)),this._blurMaterial=fy(s,e,t)}return r}_compileMaterial(e){let t=new Ct(this._lodPlanes[0],e);this._renderer.compile(t,xh)}_sceneToCubeUV(e,t,i,r,s){let l=new nn(90,1,t,i),c=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],h=this._renderer,d=h.autoClear,f=h.toneMapping;h.getClearColor(ip),h.toneMapping=ai,h.autoClear=!1,h.state.buffers.depth.getReversed()&&(h.setRenderTarget(r),h.clearDepth(),h.setRenderTarget(null));let x=new Lo({name:"PMREM.Background",side:mn,depthWrite:!1,depthTest:!1}),g=new Ct(new si,x),p=!1,w=e.background;w?w.isColor&&(x.color.copy(w),e.background=null,p=!0):(x.color.copy(ip),p=!0);for(let b=0;b<6;b++){let v=b%3;v===0?(l.up.set(0,c[b],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x+u[b],s.y,s.z)):v===1?(l.up.set(0,0,c[b]),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y+u[b],s.z)):(l.up.set(0,c[b],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y,s.z+u[b]));let A=this._cubeSize;Rc(r,v*A,b>2?A:0,A,A),h.setRenderTarget(r),p&&h.render(g,l),h.render(e,l)}g.geometry.dispose(),g.material.dispose(),h.toneMapping=f,h.autoClear=d,e.background=w}_textureToCubeUV(e,t){let i=this._renderer,r=e.mapping===Wr||e.mapping===Xr;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=ap()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=op());let s=r?this._cubemapMaterial:this._equirectMaterial,o=new Ct(this._lodPlanes[0],s),a=s.uniforms;a.envMap.value=e;let l=this._cubeSize;Rc(t,0,0,3*l,2*l),i.setRenderTarget(t),i.render(o,xh)}_applyPMREM(e){let t=this._renderer,i=t.autoClear;t.autoClear=!1;let r=this._lodPlanes.length;for(let s=1;s<r;s++){let o=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),a=rp[(r-s-1)%rp.length];this._blur(e,s-1,s,o,a)}t.autoClear=i}_blur(e,t,i,r,s){let o=this._pingPongRenderTarget;this._halfBlur(e,o,t,i,r,"latitudinal",s),this._halfBlur(o,e,i,i,r,"longitudinal",s)}_halfBlur(e,t,i,r,s,o,a){let l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");let u=3,h=new Ct(this._lodPlanes[r],c),d=c.uniforms,f=this._sizeLods[i]-1,m=isFinite(s)?Math.PI/(2*f):2*Math.PI/(2*Jr-1),x=s/m,g=isFinite(s)?1+Math.floor(u*x):Jr;g>Jr&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${g} samples when the maximum is set to ${Jr}`);let p=[],w=0;for(let I=0;I<Jr;++I){let U=I/x,M=Math.exp(-U*U/2);p.push(M),I===0?w+=M:I<g&&(w+=2*M)}for(let I=0;I<p.length;I++)p[I]=p[I]/w;d.envMap.value=e.texture,d.samples.value=g,d.weights.value=p,d.latitudinal.value=o==="latitudinal",a&&(d.poleAxis.value=a);let{_lodMax:b}=this;d.dTheta.value=m,d.mipInt.value=b-i;let v=this._sizeLods[r],A=3*v*(r>b-Xs?r-b+Xs:0),R=4*(this._cubeSize-v);Rc(t,A,R,3*v,2*v),l.setRenderTarget(t),l.render(h,xh)}};function dy(n){let e=[],t=[],i=[],r=n,s=n-Xs+1+np.length;for(let o=0;o<s;o++){let a=Math.pow(2,r);t.push(a);let l=1/a;o>n-Xs?l=np[o-n+Xs-1]:o===0&&(l=0),i.push(l);let c=1/(a-2),u=-c,h=1+c,d=[u,u,h,u,h,h,u,u,h,h,u,h],f=6,m=6,x=3,g=2,p=1,w=new Float32Array(x*m*f),b=new Float32Array(g*m*f),v=new Float32Array(p*m*f);for(let R=0;R<f;R++){let I=R%3*2/3-1,U=R>2?0:-1,M=[I,U,0,I+2/3,U,0,I+2/3,U+1,0,I,U,0,I+2/3,U+1,0,I,U+1,0];w.set(M,x*m*R),b.set(d,g*m*R);let S=[R,R,R,R,R,R];v.set(S,p*m*R)}let A=new Ft;A.setAttribute("position",new Nt(w,x)),A.setAttribute("uv",new Nt(b,g)),A.setAttribute("faceIndex",new Nt(v,p)),e.push(A),r>Xs&&r--}return{lodPlanes:e,sizeLods:t,sigmas:i}}function sp(n,e,t){let i=new Mi(n,e,t);return i.texture.mapping=ua,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function Rc(n,e,t,i,r){n.viewport.set(e,t,i,r),n.scissor.set(e,t,i,r)}function fy(n,e,t){let i=new Float32Array(Jr),r=new P(0,1,0);return new Mn({name:"SphericalGaussianBlur",defines:{n:Jr,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:Dh(),fragmentShader:`

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
		`,blending:Vi,depthTest:!1,depthWrite:!1})}function op(){return new Mn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Dh(),fragmentShader:`

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
		`,blending:Vi,depthTest:!1,depthWrite:!1})}function ap(){return new Mn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Dh(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Vi,depthTest:!1,depthWrite:!1})}function Dh(){return`

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
	`}function py(n){let e=new WeakMap,t=null;function i(a){if(a&&a.isTexture){let l=a.mapping,c=l===Hl||l===Vl,u=l===Wr||l===Xr;if(c||u){let h=e.get(a),d=h!==void 0?h.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==d)return t===null&&(t=new Ic(n)),h=c?t.fromEquirectangular(a,h):t.fromCubemap(a,h),h.texture.pmremVersion=a.pmremVersion,e.set(a,h),h.texture;if(h!==void 0)return h.texture;{let f=a.image;return c&&f&&f.height>0||u&&f&&r(f)?(t===null&&(t=new Ic(n)),h=c?t.fromEquirectangular(a):t.fromCubemap(a),h.texture.pmremVersion=a.pmremVersion,e.set(a,h),a.addEventListener("dispose",s),h.texture):null}}}return a}function r(a){let l=0,c=6;for(let u=0;u<c;u++)a[u]!==void 0&&l++;return l===c}function s(a){let l=a.target;l.removeEventListener("dispose",s);let c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function o(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:i,dispose:o}}function my(n){let e={};function t(i){if(e[i]!==void 0)return e[i];let r;switch(i){case"WEBGL_depth_texture":r=n.getExtension("WEBGL_depth_texture")||n.getExtension("MOZ_WEBGL_depth_texture")||n.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":r=n.getExtension("EXT_texture_filter_anisotropic")||n.getExtension("MOZ_EXT_texture_filter_anisotropic")||n.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":r=n.getExtension("WEBGL_compressed_texture_s3tc")||n.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":r=n.getExtension("WEBGL_compressed_texture_pvrtc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:r=n.getExtension(i)}return e[i]=r,r}return{has:function(i){return t(i)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(i){let r=t(i);return r===null&&Ts("THREE.WebGLRenderer: "+i+" extension not supported."),r}}}function gy(n,e,t,i){let r={},s=new WeakMap;function o(h){let d=h.target;d.index!==null&&e.remove(d.index);for(let m in d.attributes)e.remove(d.attributes[m]);d.removeEventListener("dispose",o),delete r[d.id];let f=s.get(d);f&&(e.remove(f),s.delete(d)),i.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,t.memory.geometries--}function a(h,d){return r[d.id]===!0||(d.addEventListener("dispose",o),r[d.id]=!0,t.memory.geometries++),d}function l(h){let d=h.attributes;for(let f in d)e.update(d[f],n.ARRAY_BUFFER)}function c(h){let d=[],f=h.index,m=h.attributes.position,x=0;if(f!==null){let w=f.array;x=f.version;for(let b=0,v=w.length;b<v;b+=3){let A=w[b+0],R=w[b+1],I=w[b+2];d.push(A,R,R,I,I,A)}}else if(m!==void 0){let w=m.array;x=m.version;for(let b=0,v=w.length/3-1;b<v;b+=3){let A=b+0,R=b+1,I=b+2;d.push(A,R,R,I,I,A)}}else return;let g=new(hh(d)?Uo:Nr)(d,1);g.version=x;let p=s.get(h);p&&e.remove(p),s.set(h,g)}function u(h){let d=s.get(h);if(d){let f=h.index;f!==null&&d.version<f.version&&c(h)}else c(h);return s.get(h)}return{get:a,update:l,getWireframeAttribute:u}}function xy(n,e,t){let i;function r(d){i=d}let s,o;function a(d){s=d.type,o=d.bytesPerElement}function l(d,f){n.drawElements(i,f,s,d*o),t.update(f,i,1)}function c(d,f,m){m!==0&&(n.drawElementsInstanced(i,f,s,d*o,m),t.update(f,i,m))}function u(d,f,m){if(m===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,f,0,s,d,0,m);let g=0;for(let p=0;p<m;p++)g+=f[p];t.update(g,i,1)}function h(d,f,m,x){if(m===0)return;let g=e.get("WEBGL_multi_draw");if(g===null)for(let p=0;p<d.length;p++)c(d[p]/o,f[p],x[p]);else{g.multiDrawElementsInstancedWEBGL(i,f,0,s,d,0,x,0,m);let p=0;for(let w=0;w<m;w++)p+=f[w]*x[w];t.update(p,i,1)}}this.setMode=r,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=u,this.renderMultiDrawInstances=h}function vy(n){let e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(s,o,a){switch(t.calls++,o){case n.TRIANGLES:t.triangles+=a*(s/3);break;case n.LINES:t.lines+=a*(s/2);break;case n.LINE_STRIP:t.lines+=a*(s-1);break;case n.LINE_LOOP:t.lines+=a*s;break;case n.POINTS:t.points+=a*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function r(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:r,update:i}}function yy(n,e,t){let i=new WeakMap,r=new pt;function s(o,a,l){let c=o.morphTargetInfluences,u=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,h=u!==void 0?u.length:0,d=i.get(a);if(d===void 0||d.count!==h){let M=function(){I.dispose(),i.delete(a),a.removeEventListener("dispose",M)};d!==void 0&&d.texture.dispose();let f=a.morphAttributes.position!==void 0,m=a.morphAttributes.normal!==void 0,x=a.morphAttributes.color!==void 0,g=a.morphAttributes.position||[],p=a.morphAttributes.normal||[],w=a.morphAttributes.color||[],b=0;f===!0&&(b=1),m===!0&&(b=2),x===!0&&(b=3);let v=a.attributes.position.count*b,A=1;v>e.maxTextureSize&&(A=Math.ceil(v/e.maxTextureSize),v=e.maxTextureSize);let R=new Float32Array(v*A*4*h),I=new Po(R,v,A,h);I.type=$n,I.needsUpdate=!0;let U=b*4;for(let S=0;S<h;S++){let L=g[S],B=p[S],H=w[S],Z=v*A*4*S;for(let X=0;X<L.count;X++){let J=X*U;f===!0&&(r.fromBufferAttribute(L,X),R[Z+J+0]=r.x,R[Z+J+1]=r.y,R[Z+J+2]=r.z,R[Z+J+3]=0),m===!0&&(r.fromBufferAttribute(B,X),R[Z+J+4]=r.x,R[Z+J+5]=r.y,R[Z+J+6]=r.z,R[Z+J+7]=0),x===!0&&(r.fromBufferAttribute(H,X),R[Z+J+8]=r.x,R[Z+J+9]=r.y,R[Z+J+10]=r.z,R[Z+J+11]=H.itemSize===4?r.w:1)}}d={count:h,texture:I,size:new Ee(v,A)},i.set(a,d),a.addEventListener("dispose",M)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(n,"morphTexture",o.morphTexture,t);else{let f=0;for(let x=0;x<c.length;x++)f+=c[x];let m=a.morphTargetsRelative?1:1-f;l.getUniforms().setValue(n,"morphTargetBaseInfluence",m),l.getUniforms().setValue(n,"morphTargetInfluences",c)}l.getUniforms().setValue(n,"morphTargetsTexture",d.texture,t),l.getUniforms().setValue(n,"morphTargetsTextureSize",d.size)}return{update:s}}function _y(n,e,t,i){let r=new WeakMap;function s(l){let c=i.render.frame,u=l.geometry,h=e.get(l,u);if(r.get(h)!==c&&(e.update(h),r.set(h,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),r.get(l)!==c&&(t.update(l.instanceMatrix,n.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,n.ARRAY_BUFFER),r.set(l,c))),l.isSkinnedMesh){let d=l.skeleton;r.get(d)!==c&&(d.update(),r.set(d,c))}return h}function o(){r=new WeakMap}function a(l){let c=l.target;c.removeEventListener("dispose",a),t.remove(c.instanceMatrix),c.instanceColor!==null&&t.remove(c.instanceColor)}return{update:s,dispose:o}}var Tp=new bn,lp=new Go(1,1),Ap=new Po,Rp=new hl,Cp=new Fo,cp=[],up=[],hp=new Float32Array(16),dp=new Float32Array(9),fp=new Float32Array(4);function qs(n,e,t){let i=n[0];if(i<=0||i>0)return n;let r=e*t,s=cp[r];if(s===void 0&&(s=new Float32Array(r),cp[r]=s),e!==0){i.toArray(s,0);for(let o=1,a=0;o!==e;++o)a+=t,n[o].toArray(s,a)}return s}function Xt(n,e){if(n.length!==e.length)return!1;for(let t=0,i=n.length;t<i;t++)if(n[t]!==e[t])return!1;return!0}function $t(n,e){for(let t=0,i=e.length;t<i;t++)n[t]=e[t]}function Dc(n,e){let t=up[e];t===void 0&&(t=new Int32Array(e),up[e]=t);for(let i=0;i!==e;++i)t[i]=n.allocateTextureUnit();return t}function by(n,e){let t=this.cache;t[0]!==e&&(n.uniform1f(this.addr,e),t[0]=e)}function My(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Xt(t,e))return;n.uniform2fv(this.addr,e),$t(t,e)}}function Sy(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(n.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Xt(t,e))return;n.uniform3fv(this.addr,e),$t(t,e)}}function Ey(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Xt(t,e))return;n.uniform4fv(this.addr,e),$t(t,e)}}function wy(n,e){let t=this.cache,i=e.elements;if(i===void 0){if(Xt(t,e))return;n.uniformMatrix2fv(this.addr,!1,e),$t(t,e)}else{if(Xt(t,i))return;fp.set(i),n.uniformMatrix2fv(this.addr,!1,fp),$t(t,i)}}function Ty(n,e){let t=this.cache,i=e.elements;if(i===void 0){if(Xt(t,e))return;n.uniformMatrix3fv(this.addr,!1,e),$t(t,e)}else{if(Xt(t,i))return;dp.set(i),n.uniformMatrix3fv(this.addr,!1,dp),$t(t,i)}}function Ay(n,e){let t=this.cache,i=e.elements;if(i===void 0){if(Xt(t,e))return;n.uniformMatrix4fv(this.addr,!1,e),$t(t,e)}else{if(Xt(t,i))return;hp.set(i),n.uniformMatrix4fv(this.addr,!1,hp),$t(t,i)}}function Ry(n,e){let t=this.cache;t[0]!==e&&(n.uniform1i(this.addr,e),t[0]=e)}function Cy(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Xt(t,e))return;n.uniform2iv(this.addr,e),$t(t,e)}}function Iy(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Xt(t,e))return;n.uniform3iv(this.addr,e),$t(t,e)}}function Py(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Xt(t,e))return;n.uniform4iv(this.addr,e),$t(t,e)}}function Dy(n,e){let t=this.cache;t[0]!==e&&(n.uniform1ui(this.addr,e),t[0]=e)}function Ly(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Xt(t,e))return;n.uniform2uiv(this.addr,e),$t(t,e)}}function Uy(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Xt(t,e))return;n.uniform3uiv(this.addr,e),$t(t,e)}}function Ny(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Xt(t,e))return;n.uniform4uiv(this.addr,e),$t(t,e)}}function Fy(n,e,t){let i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r);let s;this.type===n.SAMPLER_2D_SHADOW?(lp.compareFunction=oh,s=lp):s=Tp,t.setTexture2D(e||s,r)}function Oy(n,e,t){let i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTexture3D(e||Rp,r)}function zy(n,e,t){let i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTextureCube(e||Cp,r)}function By(n,e,t){let i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTexture2DArray(e||Ap,r)}function ky(n){switch(n){case 5126:return by;case 35664:return My;case 35665:return Sy;case 35666:return Ey;case 35674:return wy;case 35675:return Ty;case 35676:return Ay;case 5124:case 35670:return Ry;case 35667:case 35671:return Cy;case 35668:case 35672:return Iy;case 35669:case 35673:return Py;case 5125:return Dy;case 36294:return Ly;case 36295:return Uy;case 36296:return Ny;case 35678:case 36198:case 36298:case 36306:case 35682:return Fy;case 35679:case 36299:case 36307:return Oy;case 35680:case 36300:case 36308:case 36293:return zy;case 36289:case 36303:case 36311:case 36292:return By}}function Hy(n,e){n.uniform1fv(this.addr,e)}function Vy(n,e){let t=qs(e,this.size,2);n.uniform2fv(this.addr,t)}function Gy(n,e){let t=qs(e,this.size,3);n.uniform3fv(this.addr,t)}function Wy(n,e){let t=qs(e,this.size,4);n.uniform4fv(this.addr,t)}function Xy(n,e){let t=qs(e,this.size,4);n.uniformMatrix2fv(this.addr,!1,t)}function $y(n,e){let t=qs(e,this.size,9);n.uniformMatrix3fv(this.addr,!1,t)}function qy(n,e){let t=qs(e,this.size,16);n.uniformMatrix4fv(this.addr,!1,t)}function Yy(n,e){n.uniform1iv(this.addr,e)}function Zy(n,e){n.uniform2iv(this.addr,e)}function Jy(n,e){n.uniform3iv(this.addr,e)}function Ky(n,e){n.uniform4iv(this.addr,e)}function jy(n,e){n.uniform1uiv(this.addr,e)}function Qy(n,e){n.uniform2uiv(this.addr,e)}function e_(n,e){n.uniform3uiv(this.addr,e)}function t_(n,e){n.uniform4uiv(this.addr,e)}function n_(n,e,t){let i=this.cache,r=e.length,s=Dc(t,r);Xt(i,s)||(n.uniform1iv(this.addr,s),$t(i,s));for(let o=0;o!==r;++o)t.setTexture2D(e[o]||Tp,s[o])}function i_(n,e,t){let i=this.cache,r=e.length,s=Dc(t,r);Xt(i,s)||(n.uniform1iv(this.addr,s),$t(i,s));for(let o=0;o!==r;++o)t.setTexture3D(e[o]||Rp,s[o])}function r_(n,e,t){let i=this.cache,r=e.length,s=Dc(t,r);Xt(i,s)||(n.uniform1iv(this.addr,s),$t(i,s));for(let o=0;o!==r;++o)t.setTextureCube(e[o]||Cp,s[o])}function s_(n,e,t){let i=this.cache,r=e.length,s=Dc(t,r);Xt(i,s)||(n.uniform1iv(this.addr,s),$t(i,s));for(let o=0;o!==r;++o)t.setTexture2DArray(e[o]||Ap,s[o])}function o_(n){switch(n){case 5126:return Hy;case 35664:return Vy;case 35665:return Gy;case 35666:return Wy;case 35674:return Xy;case 35675:return $y;case 35676:return qy;case 5124:case 35670:return Yy;case 35667:case 35671:return Zy;case 35668:case 35672:return Jy;case 35669:case 35673:return Ky;case 5125:return jy;case 36294:return Qy;case 36295:return e_;case 36296:return t_;case 35678:case 36198:case 36298:case 36306:case 35682:return n_;case 35679:case 36299:case 36307:return i_;case 35680:case 36300:case 36308:case 36293:return r_;case 36289:case 36303:case 36311:case 36292:return s_}}var Sh=class{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.setValue=ky(t.type)}},Eh=class{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=o_(t.type)}},wh=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){let r=this.seq;for(let s=0,o=r.length;s!==o;++s){let a=r[s];a.setValue(e,t[a.id],i)}}},Mh=/(\w+)(\])?(\[|\.)?/g;function pp(n,e){n.seq.push(e),n.map[e.id]=e}function a_(n,e,t){let i=n.name,r=i.length;for(Mh.lastIndex=0;;){let s=Mh.exec(i),o=Mh.lastIndex,a=s[1],l=s[2]==="]",c=s[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===r){pp(t,c===void 0?new Sh(a,n,e):new Eh(a,n,e));break}else{let h=t.map[a];h===void 0&&(h=new wh(a),pp(t,h)),t=h}}}var $s=class{constructor(e,t){this.seq=[],this.map={};let i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let r=0;r<i;++r){let s=e.getActiveUniform(t,r),o=e.getUniformLocation(t,s.name);a_(s,o,this)}}setValue(e,t,i,r){let s=this.map[t];s!==void 0&&s.setValue(e,i,r)}setOptional(e,t,i){let r=t[i];r!==void 0&&this.setValue(e,i,r)}static upload(e,t,i,r){for(let s=0,o=t.length;s!==o;++s){let a=t[s],l=i[a.id];l.needsUpdate!==!1&&a.setValue(e,l.value,r)}}static seqWithValue(e,t){let i=[];for(let r=0,s=e.length;r!==s;++r){let o=e[r];o.id in t&&i.push(o)}return i}};function mp(n,e,t){let i=n.createShader(e);return n.shaderSource(i,t),n.compileShader(i),i}var l_=37297,c_=0;function u_(n,e){let t=n.split(`
`),i=[],r=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let o=r;o<s;o++){let a=o+1;i.push(`${a===e?">":" "} ${a}: ${t[o]}`)}return i.join(`
`)}var gp=new it;function h_(n){dt._getMatrix(gp,dt.workingColorSpace,n);let e=`mat3( ${gp.elements.map(t=>t.toFixed(4))} )`;switch(dt.getTransfer(n)){case Ro:return[e,"LinearTransferOETF"];case yt:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",n),[e,"LinearTransferOETF"]}}function xp(n,e,t){let i=n.getShaderParameter(e,n.COMPILE_STATUS),s=(n.getShaderInfoLog(e)||"").trim();if(i&&s==="")return"";let o=/ERROR: 0:(\d+)/.exec(s);if(o){let a=parseInt(o[1]);return t.toUpperCase()+`

`+s+`

`+u_(n.getShaderSource(e),a)}else return s}function d_(n,e){let t=h_(e);return[`vec4 ${n}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function f_(n,e){let t;switch(e){case Ef:t="Linear";break;case wf:t="Reinhard";break;case Tf:t="Cineon";break;case ca:t="ACESFilmic";break;case Rf:t="AgX";break;case Cf:t="Neutral";break;case Af:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+n+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}var Cc=new P;function p_(){dt.getLuminanceCoefficients(Cc);let n=Cc.x.toFixed(4),e=Cc.y.toFixed(4),t=Cc.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function m_(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(ga).join(`
`)}function g_(n){let e=[];for(let t in n){let i=n[t];i!==!1&&e.push("#define "+t+" "+i)}return e.join(`
`)}function x_(n,e){let t={},i=n.getProgramParameter(e,n.ACTIVE_ATTRIBUTES);for(let r=0;r<i;r++){let s=n.getActiveAttrib(e,r),o=s.name,a=1;s.type===n.FLOAT_MAT2&&(a=2),s.type===n.FLOAT_MAT3&&(a=3),s.type===n.FLOAT_MAT4&&(a=4),t[o]={type:s.type,location:n.getAttribLocation(e,o),locationSize:a}}return t}function ga(n){return n!==""}function vp(n,e){let t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function yp(n,e){return n.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}var v_=/^[ \t]*#include +<([\w\d./]+)>/gm;function Th(n){return n.replace(v_,__)}var y_=new Map;function __(n,e){let t=rt[e];if(t===void 0){let i=y_.get(e);if(i!==void 0)t=rt[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("Can not resolve #include <"+e+">")}return Th(t)}var b_=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function _p(n){return n.replace(b_,M_)}function M_(n,e,t,i){let r="";for(let s=parseInt(e);s<parseInt(t);s++)r+=i.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function bp(n){let e=`precision ${n.precision} float;
	precision ${n.precision} int;
	precision ${n.precision} sampler2D;
	precision ${n.precision} samplerCube;
	precision ${n.precision} sampler3D;
	precision ${n.precision} sampler2DArray;
	precision ${n.precision} sampler2DShadow;
	precision ${n.precision} samplerCubeShadow;
	precision ${n.precision} sampler2DArrayShadow;
	precision ${n.precision} isampler2D;
	precision ${n.precision} isampler3D;
	precision ${n.precision} isamplerCube;
	precision ${n.precision} isampler2DArray;
	precision ${n.precision} usampler2D;
	precision ${n.precision} usampler3D;
	precision ${n.precision} usamplerCube;
	precision ${n.precision} usampler2DArray;
	`;return n.precision==="highp"?e+=`
#define HIGH_PRECISION`:n.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:n.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function S_(n){let e="SHADOWMAP_TYPE_BASIC";return n.shadowMapType===Yu?e="SHADOWMAP_TYPE_PCF":n.shadowMapType===Dl?e="SHADOWMAP_TYPE_PCF_SOFT":n.shadowMapType===wi&&(e="SHADOWMAP_TYPE_VSM"),e}function E_(n){let e="ENVMAP_TYPE_CUBE";if(n.envMap)switch(n.envMapMode){case Wr:case Xr:e="ENVMAP_TYPE_CUBE";break;case ua:e="ENVMAP_TYPE_CUBE_UV";break}return e}function w_(n){let e="ENVMAP_MODE_REFLECTION";if(n.envMap)switch(n.envMapMode){case Xr:e="ENVMAP_MODE_REFRACTION";break}return e}function T_(n){let e="ENVMAP_BLENDING_NONE";if(n.envMap)switch(n.combine){case kl:e="ENVMAP_BLENDING_MULTIPLY";break;case Mf:e="ENVMAP_BLENDING_MIX";break;case Sf:e="ENVMAP_BLENDING_ADD";break}return e}function A_(n){let e=n.envMapCubeUVHeight;if(e===null)return null;let t=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:i,maxMip:t}}function R_(n,e,t,i){let r=n.getContext(),s=t.defines,o=t.vertexShader,a=t.fragmentShader,l=S_(t),c=E_(t),u=w_(t),h=T_(t),d=A_(t),f=m_(t),m=g_(s),x=r.createProgram(),g,p,w=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(g=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m].filter(ga).join(`
`),g.length>0&&(g+=`
`),p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m].filter(ga).join(`
`),p.length>0&&(p+=`
`)):(g=[bp(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(ga).join(`
`),p=[bp(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+u:"",t.envMap?"#define "+h:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==ai?"#define TONE_MAPPING":"",t.toneMapping!==ai?rt.tonemapping_pars_fragment:"",t.toneMapping!==ai?f_("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",rt.colorspace_pars_fragment,d_("linearToOutputTexel",t.outputColorSpace),p_(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(ga).join(`
`)),o=Th(o),o=vp(o,t),o=yp(o,t),a=Th(a),a=vp(a,t),a=yp(a,t),o=_p(o),a=_p(a),t.isRawShaderMaterial!==!0&&(w=`#version 300 es
`,g=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,p=["#define varying in",t.glslVersion===lh?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===lh?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);let b=w+g+o,v=w+p+a,A=mp(r,r.VERTEX_SHADER,b),R=mp(r,r.FRAGMENT_SHADER,v);r.attachShader(x,A),r.attachShader(x,R),t.index0AttributeName!==void 0?r.bindAttribLocation(x,0,t.index0AttributeName):t.morphTargets===!0&&r.bindAttribLocation(x,0,"position"),r.linkProgram(x);function I(L){if(n.debug.checkShaderErrors){let B=r.getProgramInfoLog(x)||"",H=r.getShaderInfoLog(A)||"",Z=r.getShaderInfoLog(R)||"",X=B.trim(),J=H.trim(),le=Z.trim(),$=!0,_e=!0;if(r.getProgramParameter(x,r.LINK_STATUS)===!1)if($=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(r,x,A,R);else{let we=xp(r,A,"vertex"),Le=xp(r,R,"fragment");console.error("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(x,r.VALIDATE_STATUS)+`

Material Name: `+L.name+`
Material Type: `+L.type+`

Program Info Log: `+X+`
`+we+`
`+Le)}else X!==""?console.warn("THREE.WebGLProgram: Program Info Log:",X):(J===""||le==="")&&(_e=!1);_e&&(L.diagnostics={runnable:$,programLog:X,vertexShader:{log:J,prefix:g},fragmentShader:{log:le,prefix:p}})}r.deleteShader(A),r.deleteShader(R),U=new $s(r,x),M=x_(r,x)}let U;this.getUniforms=function(){return U===void 0&&I(this),U};let M;this.getAttributes=function(){return M===void 0&&I(this),M};let S=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return S===!1&&(S=r.getProgramParameter(x,l_)),S},this.destroy=function(){i.releaseStatesOfProgram(this),r.deleteProgram(x),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=c_++,this.cacheKey=e,this.usedTimes=1,this.program=x,this.vertexShader=A,this.fragmentShader=R,this}var C_=0,Ah=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){let t=e.vertexShader,i=e.fragmentShader,r=this._getShaderStage(t),s=this._getShaderStage(i),o=this._getShaderCacheForMaterial(e);return o.has(r)===!1&&(o.add(r),r.usedTimes++),o.has(s)===!1&&(o.add(s),s.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){let t=this.shaderCache,i=t.get(e);return i===void 0&&(i=new Rh(e),t.set(e,i)),i}},Rh=class{constructor(e){this.id=C_++,this.code=e,this.usedTimes=0}};function I_(n,e,t,i,r,s,o){let a=new Do,l=new Ah,c=new Set,u=[],h=r.logarithmicDepthBuffer,d=r.vertexTextures,f=r.precision,m={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function x(M){return c.add(M),M===0?"uv":`uv${M}`}function g(M,S,L,B,H){let Z=B.fog,X=H.geometry,J=M.isMeshStandardMaterial?B.environment:null,le=(M.isMeshStandardMaterial?t:e).get(M.envMap||J),$=le&&le.mapping===ua?le.image.height:null,_e=m[M.type];M.precision!==null&&(f=r.getMaxPrecision(M.precision),f!==M.precision&&console.warn("THREE.WebGLProgram.getParameters:",M.precision,"not supported, using",f,"instead."));let we=X.morphAttributes.position||X.morphAttributes.normal||X.morphAttributes.color,Le=we!==void 0?we.length:0,je=0;X.morphAttributes.position!==void 0&&(je=1),X.morphAttributes.normal!==void 0&&(je=2),X.morphAttributes.color!==void 0&&(je=3);let at,lt,ct,j;if(_e){let ft=Ti[_e];at=ft.vertexShader,lt=ft.fragmentShader}else at=M.vertexShader,lt=M.fragmentShader,l.update(M),ct=l.getVertexShaderID(M),j=l.getFragmentShaderID(M);let re=n.getRenderTarget(),Pe=n.state.buffers.depth.getReversed(),Ne=H.isInstancedMesh===!0,Fe=H.isBatchedMesh===!0,nt=!!M.map,vt=!!M.matcap,D=!!le,se=!!M.aoMap,te=!!M.lightMap,Q=!!M.bumpMap,K=!!M.normalMap,be=!!M.displacementMap,ce=!!M.emissiveMap,ye=!!M.metalnessMap,Ye=!!M.roughnessMap,qe=M.anisotropy>0,T=M.clearcoat>0,_=M.dispersion>0,z=M.iridescence>0,W=M.sheen>0,ie=M.transmission>0,q=qe&&!!M.anisotropyMap,De=T&&!!M.clearcoatMap,me=T&&!!M.clearcoatNormalMap,Ue=T&&!!M.clearcoatRoughnessMap,Re=z&&!!M.iridescenceMap,ue=z&&!!M.iridescenceThicknessMap,Te=W&&!!M.sheenColorMap,Ge=W&&!!M.sheenRoughnessMap,Oe=!!M.specularMap,ve=!!M.specularColorMap,Ze=!!M.specularIntensityMap,F=ie&&!!M.transmissionMap,de=ie&&!!M.thicknessMap,ge=!!M.gradientMap,Ie=!!M.alphaMap,fe=M.alphaTest>0,ne=!!M.alphaHash,ze=!!M.extensions,Qe=ai;M.toneMapped&&(re===null||re.isXRRenderTarget===!0)&&(Qe=n.toneMapping);let bt={shaderID:_e,shaderType:M.type,shaderName:M.name,vertexShader:at,fragmentShader:lt,defines:M.defines,customVertexShaderID:ct,customFragmentShaderID:j,isRawShaderMaterial:M.isRawShaderMaterial===!0,glslVersion:M.glslVersion,precision:f,batching:Fe,batchingColor:Fe&&H._colorsTexture!==null,instancing:Ne,instancingColor:Ne&&H.instanceColor!==null,instancingMorph:Ne&&H.morphTexture!==null,supportsVertexTextures:d,outputColorSpace:re===null?n.outputColorSpace:re.isXRRenderTarget===!0?re.texture.colorSpace:Ur,alphaToCoverage:!!M.alphaToCoverage,map:nt,matcap:vt,envMap:D,envMapMode:D&&le.mapping,envMapCubeUVHeight:$,aoMap:se,lightMap:te,bumpMap:Q,normalMap:K,displacementMap:d&&be,emissiveMap:ce,normalMapObjectSpace:K&&M.normalMapType===zf,normalMapTangentSpace:K&&M.normalMapType===Tc,metalnessMap:ye,roughnessMap:Ye,anisotropy:qe,anisotropyMap:q,clearcoat:T,clearcoatMap:De,clearcoatNormalMap:me,clearcoatRoughnessMap:Ue,dispersion:_,iridescence:z,iridescenceMap:Re,iridescenceThicknessMap:ue,sheen:W,sheenColorMap:Te,sheenRoughnessMap:Ge,specularMap:Oe,specularColorMap:ve,specularIntensityMap:Ze,transmission:ie,transmissionMap:F,thicknessMap:de,gradientMap:ge,opaque:M.transparent===!1&&M.blending===Dr&&M.alphaToCoverage===!1,alphaMap:Ie,alphaTest:fe,alphaHash:ne,combine:M.combine,mapUv:nt&&x(M.map.channel),aoMapUv:se&&x(M.aoMap.channel),lightMapUv:te&&x(M.lightMap.channel),bumpMapUv:Q&&x(M.bumpMap.channel),normalMapUv:K&&x(M.normalMap.channel),displacementMapUv:be&&x(M.displacementMap.channel),emissiveMapUv:ce&&x(M.emissiveMap.channel),metalnessMapUv:ye&&x(M.metalnessMap.channel),roughnessMapUv:Ye&&x(M.roughnessMap.channel),anisotropyMapUv:q&&x(M.anisotropyMap.channel),clearcoatMapUv:De&&x(M.clearcoatMap.channel),clearcoatNormalMapUv:me&&x(M.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Ue&&x(M.clearcoatRoughnessMap.channel),iridescenceMapUv:Re&&x(M.iridescenceMap.channel),iridescenceThicknessMapUv:ue&&x(M.iridescenceThicknessMap.channel),sheenColorMapUv:Te&&x(M.sheenColorMap.channel),sheenRoughnessMapUv:Ge&&x(M.sheenRoughnessMap.channel),specularMapUv:Oe&&x(M.specularMap.channel),specularColorMapUv:ve&&x(M.specularColorMap.channel),specularIntensityMapUv:Ze&&x(M.specularIntensityMap.channel),transmissionMapUv:F&&x(M.transmissionMap.channel),thicknessMapUv:de&&x(M.thicknessMap.channel),alphaMapUv:Ie&&x(M.alphaMap.channel),vertexTangents:!!X.attributes.tangent&&(K||qe),vertexColors:M.vertexColors,vertexAlphas:M.vertexColors===!0&&!!X.attributes.color&&X.attributes.color.itemSize===4,pointsUvs:H.isPoints===!0&&!!X.attributes.uv&&(nt||Ie),fog:!!Z,useFog:M.fog===!0,fogExp2:!!Z&&Z.isFogExp2,flatShading:M.flatShading===!0&&M.wireframe===!1,sizeAttenuation:M.sizeAttenuation===!0,logarithmicDepthBuffer:h,reversedDepthBuffer:Pe,skinning:H.isSkinnedMesh===!0,morphTargets:X.morphAttributes.position!==void 0,morphNormals:X.morphAttributes.normal!==void 0,morphColors:X.morphAttributes.color!==void 0,morphTargetsCount:Le,morphTextureStride:je,numDirLights:S.directional.length,numPointLights:S.point.length,numSpotLights:S.spot.length,numSpotLightMaps:S.spotLightMap.length,numRectAreaLights:S.rectArea.length,numHemiLights:S.hemi.length,numDirLightShadows:S.directionalShadowMap.length,numPointLightShadows:S.pointShadowMap.length,numSpotLightShadows:S.spotShadowMap.length,numSpotLightShadowsWithMaps:S.numSpotLightShadowsWithMaps,numLightProbes:S.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:M.dithering,shadowMapEnabled:n.shadowMap.enabled&&L.length>0,shadowMapType:n.shadowMap.type,toneMapping:Qe,decodeVideoTexture:nt&&M.map.isVideoTexture===!0&&dt.getTransfer(M.map.colorSpace)===yt,decodeVideoTextureEmissive:ce&&M.emissiveMap.isVideoTexture===!0&&dt.getTransfer(M.emissiveMap.colorSpace)===yt,premultipliedAlpha:M.premultipliedAlpha,doubleSided:M.side===Xn,flipSided:M.side===mn,useDepthPacking:M.depthPacking>=0,depthPacking:M.depthPacking||0,index0AttributeName:M.index0AttributeName,extensionClipCullDistance:ze&&M.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(ze&&M.extensions.multiDraw===!0||Fe)&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:M.customProgramCacheKey()};return bt.vertexUv1s=c.has(1),bt.vertexUv2s=c.has(2),bt.vertexUv3s=c.has(3),c.clear(),bt}function p(M){let S=[];if(M.shaderID?S.push(M.shaderID):(S.push(M.customVertexShaderID),S.push(M.customFragmentShaderID)),M.defines!==void 0)for(let L in M.defines)S.push(L),S.push(M.defines[L]);return M.isRawShaderMaterial===!1&&(w(S,M),b(S,M),S.push(n.outputColorSpace)),S.push(M.customProgramCacheKey),S.join()}function w(M,S){M.push(S.precision),M.push(S.outputColorSpace),M.push(S.envMapMode),M.push(S.envMapCubeUVHeight),M.push(S.mapUv),M.push(S.alphaMapUv),M.push(S.lightMapUv),M.push(S.aoMapUv),M.push(S.bumpMapUv),M.push(S.normalMapUv),M.push(S.displacementMapUv),M.push(S.emissiveMapUv),M.push(S.metalnessMapUv),M.push(S.roughnessMapUv),M.push(S.anisotropyMapUv),M.push(S.clearcoatMapUv),M.push(S.clearcoatNormalMapUv),M.push(S.clearcoatRoughnessMapUv),M.push(S.iridescenceMapUv),M.push(S.iridescenceThicknessMapUv),M.push(S.sheenColorMapUv),M.push(S.sheenRoughnessMapUv),M.push(S.specularMapUv),M.push(S.specularColorMapUv),M.push(S.specularIntensityMapUv),M.push(S.transmissionMapUv),M.push(S.thicknessMapUv),M.push(S.combine),M.push(S.fogExp2),M.push(S.sizeAttenuation),M.push(S.morphTargetsCount),M.push(S.morphAttributeCount),M.push(S.numDirLights),M.push(S.numPointLights),M.push(S.numSpotLights),M.push(S.numSpotLightMaps),M.push(S.numHemiLights),M.push(S.numRectAreaLights),M.push(S.numDirLightShadows),M.push(S.numPointLightShadows),M.push(S.numSpotLightShadows),M.push(S.numSpotLightShadowsWithMaps),M.push(S.numLightProbes),M.push(S.shadowMapType),M.push(S.toneMapping),M.push(S.numClippingPlanes),M.push(S.numClipIntersection),M.push(S.depthPacking)}function b(M,S){a.disableAll(),S.supportsVertexTextures&&a.enable(0),S.instancing&&a.enable(1),S.instancingColor&&a.enable(2),S.instancingMorph&&a.enable(3),S.matcap&&a.enable(4),S.envMap&&a.enable(5),S.normalMapObjectSpace&&a.enable(6),S.normalMapTangentSpace&&a.enable(7),S.clearcoat&&a.enable(8),S.iridescence&&a.enable(9),S.alphaTest&&a.enable(10),S.vertexColors&&a.enable(11),S.vertexAlphas&&a.enable(12),S.vertexUv1s&&a.enable(13),S.vertexUv2s&&a.enable(14),S.vertexUv3s&&a.enable(15),S.vertexTangents&&a.enable(16),S.anisotropy&&a.enable(17),S.alphaHash&&a.enable(18),S.batching&&a.enable(19),S.dispersion&&a.enable(20),S.batchingColor&&a.enable(21),S.gradientMap&&a.enable(22),M.push(a.mask),a.disableAll(),S.fog&&a.enable(0),S.useFog&&a.enable(1),S.flatShading&&a.enable(2),S.logarithmicDepthBuffer&&a.enable(3),S.reversedDepthBuffer&&a.enable(4),S.skinning&&a.enable(5),S.morphTargets&&a.enable(6),S.morphNormals&&a.enable(7),S.morphColors&&a.enable(8),S.premultipliedAlpha&&a.enable(9),S.shadowMapEnabled&&a.enable(10),S.doubleSided&&a.enable(11),S.flipSided&&a.enable(12),S.useDepthPacking&&a.enable(13),S.dithering&&a.enable(14),S.transmission&&a.enable(15),S.sheen&&a.enable(16),S.opaque&&a.enable(17),S.pointsUvs&&a.enable(18),S.decodeVideoTexture&&a.enable(19),S.decodeVideoTextureEmissive&&a.enable(20),S.alphaToCoverage&&a.enable(21),M.push(a.mask)}function v(M){let S=m[M.type],L;if(S){let B=Ti[S];L=Zf.clone(B.uniforms)}else L=M.uniforms;return L}function A(M,S){let L;for(let B=0,H=u.length;B<H;B++){let Z=u[B];if(Z.cacheKey===S){L=Z,++L.usedTimes;break}}return L===void 0&&(L=new R_(n,S,M,s),u.push(L)),L}function R(M){if(--M.usedTimes===0){let S=u.indexOf(M);u[S]=u[u.length-1],u.pop(),M.destroy()}}function I(M){l.remove(M)}function U(){l.dispose()}return{getParameters:g,getProgramCacheKey:p,getUniforms:v,acquireProgram:A,releaseProgram:R,releaseShaderCache:I,programs:u,dispose:U}}function P_(){let n=new WeakMap;function e(o){return n.has(o)}function t(o){let a=n.get(o);return a===void 0&&(a={},n.set(o,a)),a}function i(o){n.delete(o)}function r(o,a,l){n.get(o)[a]=l}function s(){n=new WeakMap}return{has:e,get:t,remove:i,update:r,dispose:s}}function D_(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.material.id!==e.material.id?n.material.id-e.material.id:n.z!==e.z?n.z-e.z:n.id-e.id}function Mp(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.z!==e.z?e.z-n.z:n.id-e.id}function Sp(){let n=[],e=0,t=[],i=[],r=[];function s(){e=0,t.length=0,i.length=0,r.length=0}function o(h,d,f,m,x,g){let p=n[e];return p===void 0?(p={id:h.id,object:h,geometry:d,material:f,groupOrder:m,renderOrder:h.renderOrder,z:x,group:g},n[e]=p):(p.id=h.id,p.object=h,p.geometry=d,p.material=f,p.groupOrder=m,p.renderOrder=h.renderOrder,p.z=x,p.group=g),e++,p}function a(h,d,f,m,x,g){let p=o(h,d,f,m,x,g);f.transmission>0?i.push(p):f.transparent===!0?r.push(p):t.push(p)}function l(h,d,f,m,x,g){let p=o(h,d,f,m,x,g);f.transmission>0?i.unshift(p):f.transparent===!0?r.unshift(p):t.unshift(p)}function c(h,d){t.length>1&&t.sort(h||D_),i.length>1&&i.sort(d||Mp),r.length>1&&r.sort(d||Mp)}function u(){for(let h=e,d=n.length;h<d;h++){let f=n[h];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:t,transmissive:i,transparent:r,init:s,push:a,unshift:l,finish:u,sort:c}}function L_(){let n=new WeakMap;function e(i,r){let s=n.get(i),o;return s===void 0?(o=new Sp,n.set(i,[o])):r>=s.length?(o=new Sp,s.push(o)):o=s[r],o}function t(){n=new WeakMap}return{get:e,dispose:t}}function U_(){let n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new P,color:new tt};break;case"SpotLight":t={position:new P,direction:new P,color:new tt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new P,color:new tt,distance:0,decay:0};break;case"HemisphereLight":t={direction:new P,skyColor:new tt,groundColor:new tt};break;case"RectAreaLight":t={color:new tt,position:new P,halfWidth:new P,halfHeight:new P};break}return n[e.id]=t,t}}}function N_(){let n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ee};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ee};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ee,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[e.id]=t,t}}}var F_=0;function O_(n,e){return(e.castShadow?2:0)-(n.castShadow?2:0)+(e.map?1:0)-(n.map?1:0)}function z_(n){let e=new U_,t=N_(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new P);let r=new P,s=new ot,o=new ot;function a(c){let u=0,h=0,d=0;for(let M=0;M<9;M++)i.probe[M].set(0,0,0);let f=0,m=0,x=0,g=0,p=0,w=0,b=0,v=0,A=0,R=0,I=0;c.sort(O_);for(let M=0,S=c.length;M<S;M++){let L=c[M],B=L.color,H=L.intensity,Z=L.distance,X=L.shadow&&L.shadow.map?L.shadow.map.texture:null;if(L.isAmbientLight)u+=B.r*H,h+=B.g*H,d+=B.b*H;else if(L.isLightProbe){for(let J=0;J<9;J++)i.probe[J].addScaledVector(L.sh.coefficients[J],H);I++}else if(L.isDirectionalLight){let J=e.get(L);if(J.color.copy(L.color).multiplyScalar(L.intensity),L.castShadow){let le=L.shadow,$=t.get(L);$.shadowIntensity=le.intensity,$.shadowBias=le.bias,$.shadowNormalBias=le.normalBias,$.shadowRadius=le.radius,$.shadowMapSize=le.mapSize,i.directionalShadow[f]=$,i.directionalShadowMap[f]=X,i.directionalShadowMatrix[f]=L.shadow.matrix,w++}i.directional[f]=J,f++}else if(L.isSpotLight){let J=e.get(L);J.position.setFromMatrixPosition(L.matrixWorld),J.color.copy(B).multiplyScalar(H),J.distance=Z,J.coneCos=Math.cos(L.angle),J.penumbraCos=Math.cos(L.angle*(1-L.penumbra)),J.decay=L.decay,i.spot[x]=J;let le=L.shadow;if(L.map&&(i.spotLightMap[A]=L.map,A++,le.updateMatrices(L),L.castShadow&&R++),i.spotLightMatrix[x]=le.matrix,L.castShadow){let $=t.get(L);$.shadowIntensity=le.intensity,$.shadowBias=le.bias,$.shadowNormalBias=le.normalBias,$.shadowRadius=le.radius,$.shadowMapSize=le.mapSize,i.spotShadow[x]=$,i.spotShadowMap[x]=X,v++}x++}else if(L.isRectAreaLight){let J=e.get(L);J.color.copy(B).multiplyScalar(H),J.halfWidth.set(L.width*.5,0,0),J.halfHeight.set(0,L.height*.5,0),i.rectArea[g]=J,g++}else if(L.isPointLight){let J=e.get(L);if(J.color.copy(L.color).multiplyScalar(L.intensity),J.distance=L.distance,J.decay=L.decay,L.castShadow){let le=L.shadow,$=t.get(L);$.shadowIntensity=le.intensity,$.shadowBias=le.bias,$.shadowNormalBias=le.normalBias,$.shadowRadius=le.radius,$.shadowMapSize=le.mapSize,$.shadowCameraNear=le.camera.near,$.shadowCameraFar=le.camera.far,i.pointShadow[m]=$,i.pointShadowMap[m]=X,i.pointShadowMatrix[m]=L.shadow.matrix,b++}i.point[m]=J,m++}else if(L.isHemisphereLight){let J=e.get(L);J.skyColor.copy(L.color).multiplyScalar(H),J.groundColor.copy(L.groundColor).multiplyScalar(H),i.hemi[p]=J,p++}}g>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=Ae.LTC_FLOAT_1,i.rectAreaLTC2=Ae.LTC_FLOAT_2):(i.rectAreaLTC1=Ae.LTC_HALF_1,i.rectAreaLTC2=Ae.LTC_HALF_2)),i.ambient[0]=u,i.ambient[1]=h,i.ambient[2]=d;let U=i.hash;(U.directionalLength!==f||U.pointLength!==m||U.spotLength!==x||U.rectAreaLength!==g||U.hemiLength!==p||U.numDirectionalShadows!==w||U.numPointShadows!==b||U.numSpotShadows!==v||U.numSpotMaps!==A||U.numLightProbes!==I)&&(i.directional.length=f,i.spot.length=x,i.rectArea.length=g,i.point.length=m,i.hemi.length=p,i.directionalShadow.length=w,i.directionalShadowMap.length=w,i.pointShadow.length=b,i.pointShadowMap.length=b,i.spotShadow.length=v,i.spotShadowMap.length=v,i.directionalShadowMatrix.length=w,i.pointShadowMatrix.length=b,i.spotLightMatrix.length=v+A-R,i.spotLightMap.length=A,i.numSpotLightShadowsWithMaps=R,i.numLightProbes=I,U.directionalLength=f,U.pointLength=m,U.spotLength=x,U.rectAreaLength=g,U.hemiLength=p,U.numDirectionalShadows=w,U.numPointShadows=b,U.numSpotShadows=v,U.numSpotMaps=A,U.numLightProbes=I,i.version=F_++)}function l(c,u){let h=0,d=0,f=0,m=0,x=0,g=u.matrixWorldInverse;for(let p=0,w=c.length;p<w;p++){let b=c[p];if(b.isDirectionalLight){let v=i.directional[h];v.direction.setFromMatrixPosition(b.matrixWorld),r.setFromMatrixPosition(b.target.matrixWorld),v.direction.sub(r),v.direction.transformDirection(g),h++}else if(b.isSpotLight){let v=i.spot[f];v.position.setFromMatrixPosition(b.matrixWorld),v.position.applyMatrix4(g),v.direction.setFromMatrixPosition(b.matrixWorld),r.setFromMatrixPosition(b.target.matrixWorld),v.direction.sub(r),v.direction.transformDirection(g),f++}else if(b.isRectAreaLight){let v=i.rectArea[m];v.position.setFromMatrixPosition(b.matrixWorld),v.position.applyMatrix4(g),o.identity(),s.copy(b.matrixWorld),s.premultiply(g),o.extractRotation(s),v.halfWidth.set(b.width*.5,0,0),v.halfHeight.set(0,b.height*.5,0),v.halfWidth.applyMatrix4(o),v.halfHeight.applyMatrix4(o),m++}else if(b.isPointLight){let v=i.point[d];v.position.setFromMatrixPosition(b.matrixWorld),v.position.applyMatrix4(g),d++}else if(b.isHemisphereLight){let v=i.hemi[x];v.direction.setFromMatrixPosition(b.matrixWorld),v.direction.transformDirection(g),x++}}}return{setup:a,setupView:l,state:i}}function Ep(n){let e=new z_(n),t=[],i=[];function r(u){c.camera=u,t.length=0,i.length=0}function s(u){t.push(u)}function o(u){i.push(u)}function a(){e.setup(t)}function l(u){e.setupView(t,u)}let c={lightsArray:t,shadowsArray:i,camera:null,lights:e,transmissionRenderTarget:{}};return{init:r,state:c,setupLights:a,setupLightsView:l,pushLight:s,pushShadow:o}}function B_(n){let e=new WeakMap;function t(r,s=0){let o=e.get(r),a;return o===void 0?(a=new Ep(n),e.set(r,[a])):s>=o.length?(a=new Ep(n),o.push(a)):a=o[s],a}function i(){e=new WeakMap}return{get:t,dispose:i}}var k_=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,H_=`uniform sampler2D shadow_pass;
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
}`;function V_(n,e,t){let i=new Ls,r=new Ee,s=new Ee,o=new pt,a=new bl({depthPacking:Of}),l=new Ml,c={},u=t.maxTextureSize,h={[Vn]:mn,[mn]:Vn,[Xn]:Xn},d=new Mn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Ee},radius:{value:4}},vertexShader:k_,fragmentShader:H_}),f=d.clone();f.defines.HORIZONTAL_PASS=1;let m=new Ft;m.setAttribute("position",new Nt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let x=new Ct(m,d),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Yu;let p=this.type;this.render=function(R,I,U){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||R.length===0)return;let M=n.getRenderTarget(),S=n.getActiveCubeFace(),L=n.getActiveMipmapLevel(),B=n.state;B.setBlending(Vi),B.buffers.depth.getReversed()===!0?B.buffers.color.setClear(0,0,0,0):B.buffers.color.setClear(1,1,1,1),B.buffers.depth.setTest(!0),B.setScissorTest(!1);let H=p!==wi&&this.type===wi,Z=p===wi&&this.type!==wi;for(let X=0,J=R.length;X<J;X++){let le=R[X],$=le.shadow;if($===void 0){console.warn("THREE.WebGLShadowMap:",le,"has no shadow.");continue}if($.autoUpdate===!1&&$.needsUpdate===!1)continue;r.copy($.mapSize);let _e=$.getFrameExtents();if(r.multiply(_e),s.copy($.mapSize),(r.x>u||r.y>u)&&(r.x>u&&(s.x=Math.floor(u/_e.x),r.x=s.x*_e.x,$.mapSize.x=s.x),r.y>u&&(s.y=Math.floor(u/_e.y),r.y=s.y*_e.y,$.mapSize.y=s.y)),$.map===null||H===!0||Z===!0){let Le=this.type!==wi?{minFilter:_n,magFilter:_n}:{};$.map!==null&&$.map.dispose(),$.map=new Mi(r.x,r.y,Le),$.map.texture.name=le.name+".shadowMap",$.camera.updateProjectionMatrix()}n.setRenderTarget($.map),n.clear();let we=$.getViewportCount();for(let Le=0;Le<we;Le++){let je=$.getViewport(Le);o.set(s.x*je.x,s.y*je.y,s.x*je.z,s.y*je.w),B.viewport(o),$.updateMatrices(le,Le),i=$.getFrustum(),v(I,U,$.camera,le,this.type)}$.isPointLightShadow!==!0&&this.type===wi&&w($,U),$.needsUpdate=!1}p=this.type,g.needsUpdate=!1,n.setRenderTarget(M,S,L)};function w(R,I){let U=e.update(x);d.defines.VSM_SAMPLES!==R.blurSamples&&(d.defines.VSM_SAMPLES=R.blurSamples,f.defines.VSM_SAMPLES=R.blurSamples,d.needsUpdate=!0,f.needsUpdate=!0),R.mapPass===null&&(R.mapPass=new Mi(r.x,r.y)),d.uniforms.shadow_pass.value=R.map.texture,d.uniforms.resolution.value=R.mapSize,d.uniforms.radius.value=R.radius,n.setRenderTarget(R.mapPass),n.clear(),n.renderBufferDirect(I,null,U,d,x,null),f.uniforms.shadow_pass.value=R.mapPass.texture,f.uniforms.resolution.value=R.mapSize,f.uniforms.radius.value=R.radius,n.setRenderTarget(R.map),n.clear(),n.renderBufferDirect(I,null,U,f,x,null)}function b(R,I,U,M){let S=null,L=U.isPointLight===!0?R.customDistanceMaterial:R.customDepthMaterial;if(L!==void 0)S=L;else if(S=U.isPointLight===!0?l:a,n.localClippingEnabled&&I.clipShadows===!0&&Array.isArray(I.clippingPlanes)&&I.clippingPlanes.length!==0||I.displacementMap&&I.displacementScale!==0||I.alphaMap&&I.alphaTest>0||I.map&&I.alphaTest>0||I.alphaToCoverage===!0){let B=S.uuid,H=I.uuid,Z=c[B];Z===void 0&&(Z={},c[B]=Z);let X=Z[H];X===void 0&&(X=S.clone(),Z[H]=X,I.addEventListener("dispose",A)),S=X}if(S.visible=I.visible,S.wireframe=I.wireframe,M===wi?S.side=I.shadowSide!==null?I.shadowSide:I.side:S.side=I.shadowSide!==null?I.shadowSide:h[I.side],S.alphaMap=I.alphaMap,S.alphaTest=I.alphaToCoverage===!0?.5:I.alphaTest,S.map=I.map,S.clipShadows=I.clipShadows,S.clippingPlanes=I.clippingPlanes,S.clipIntersection=I.clipIntersection,S.displacementMap=I.displacementMap,S.displacementScale=I.displacementScale,S.displacementBias=I.displacementBias,S.wireframeLinewidth=I.wireframeLinewidth,S.linewidth=I.linewidth,U.isPointLight===!0&&S.isMeshDistanceMaterial===!0){let B=n.properties.get(S);B.light=U}return S}function v(R,I,U,M,S){if(R.visible===!1)return;if(R.layers.test(I.layers)&&(R.isMesh||R.isLine||R.isPoints)&&(R.castShadow||R.receiveShadow&&S===wi)&&(!R.frustumCulled||i.intersectsObject(R))){R.modelViewMatrix.multiplyMatrices(U.matrixWorldInverse,R.matrixWorld);let H=e.update(R),Z=R.material;if(Array.isArray(Z)){let X=H.groups;for(let J=0,le=X.length;J<le;J++){let $=X[J],_e=Z[$.materialIndex];if(_e&&_e.visible){let we=b(R,_e,M,S);R.onBeforeShadow(n,R,I,U,H,we,$),n.renderBufferDirect(U,null,H,we,R,$),R.onAfterShadow(n,R,I,U,H,we,$)}}}else if(Z.visible){let X=b(R,Z,M,S);R.onBeforeShadow(n,R,I,U,H,X,null),n.renderBufferDirect(U,null,H,X,R,null),R.onAfterShadow(n,R,I,U,H,X,null)}}let B=R.children;for(let H=0,Z=B.length;H<Z;H++)v(B[H],I,U,M,S)}function A(R){R.target.removeEventListener("dispose",A);for(let U in c){let M=c[U],S=R.target.uuid;S in M&&(M[S].dispose(),delete M[S])}}}var G_={[Ll]:Ul,[Nl]:zl,[Fl]:Bl,[Lr]:Ol,[Ul]:Ll,[zl]:Nl,[Bl]:Fl,[Ol]:Lr};function W_(n,e){function t(){let F=!1,de=new pt,ge=null,Ie=new pt(0,0,0,0);return{setMask:function(fe){ge!==fe&&!F&&(n.colorMask(fe,fe,fe,fe),ge=fe)},setLocked:function(fe){F=fe},setClear:function(fe,ne,ze,Qe,bt){bt===!0&&(fe*=Qe,ne*=Qe,ze*=Qe),de.set(fe,ne,ze,Qe),Ie.equals(de)===!1&&(n.clearColor(fe,ne,ze,Qe),Ie.copy(de))},reset:function(){F=!1,ge=null,Ie.set(-1,0,0,0)}}}function i(){let F=!1,de=!1,ge=null,Ie=null,fe=null;return{setReversed:function(ne){if(de!==ne){let ze=e.get("EXT_clip_control");ne?ze.clipControlEXT(ze.LOWER_LEFT_EXT,ze.ZERO_TO_ONE_EXT):ze.clipControlEXT(ze.LOWER_LEFT_EXT,ze.NEGATIVE_ONE_TO_ONE_EXT),de=ne;let Qe=fe;fe=null,this.setClear(Qe)}},getReversed:function(){return de},setTest:function(ne){ne?re(n.DEPTH_TEST):Pe(n.DEPTH_TEST)},setMask:function(ne){ge!==ne&&!F&&(n.depthMask(ne),ge=ne)},setFunc:function(ne){if(de&&(ne=G_[ne]),Ie!==ne){switch(ne){case Ll:n.depthFunc(n.NEVER);break;case Ul:n.depthFunc(n.ALWAYS);break;case Nl:n.depthFunc(n.LESS);break;case Lr:n.depthFunc(n.LEQUAL);break;case Fl:n.depthFunc(n.EQUAL);break;case Ol:n.depthFunc(n.GEQUAL);break;case zl:n.depthFunc(n.GREATER);break;case Bl:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}Ie=ne}},setLocked:function(ne){F=ne},setClear:function(ne){fe!==ne&&(de&&(ne=1-ne),n.clearDepth(ne),fe=ne)},reset:function(){F=!1,ge=null,Ie=null,fe=null,de=!1}}}function r(){let F=!1,de=null,ge=null,Ie=null,fe=null,ne=null,ze=null,Qe=null,bt=null;return{setTest:function(ft){F||(ft?re(n.STENCIL_TEST):Pe(n.STENCIL_TEST))},setMask:function(ft){de!==ft&&!F&&(n.stencilMask(ft),de=ft)},setFunc:function(ft,gn,Rn){(ge!==ft||Ie!==gn||fe!==Rn)&&(n.stencilFunc(ft,gn,Rn),ge=ft,Ie=gn,fe=Rn)},setOp:function(ft,gn,Rn){(ne!==ft||ze!==gn||Qe!==Rn)&&(n.stencilOp(ft,gn,Rn),ne=ft,ze=gn,Qe=Rn)},setLocked:function(ft){F=ft},setClear:function(ft){bt!==ft&&(n.clearStencil(ft),bt=ft)},reset:function(){F=!1,de=null,ge=null,Ie=null,fe=null,ne=null,ze=null,Qe=null,bt=null}}}let s=new t,o=new i,a=new r,l=new WeakMap,c=new WeakMap,u={},h={},d=new WeakMap,f=[],m=null,x=!1,g=null,p=null,w=null,b=null,v=null,A=null,R=null,I=new tt(0,0,0),U=0,M=!1,S=null,L=null,B=null,H=null,Z=null,X=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS),J=!1,le=0,$=n.getParameter(n.VERSION);$.indexOf("WebGL")!==-1?(le=parseFloat(/^WebGL (\d)/.exec($)[1]),J=le>=1):$.indexOf("OpenGL ES")!==-1&&(le=parseFloat(/^OpenGL ES (\d)/.exec($)[1]),J=le>=2);let _e=null,we={},Le=n.getParameter(n.SCISSOR_BOX),je=n.getParameter(n.VIEWPORT),at=new pt().fromArray(Le),lt=new pt().fromArray(je);function ct(F,de,ge,Ie){let fe=new Uint8Array(4),ne=n.createTexture();n.bindTexture(F,ne),n.texParameteri(F,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(F,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let ze=0;ze<ge;ze++)F===n.TEXTURE_3D||F===n.TEXTURE_2D_ARRAY?n.texImage3D(de,0,n.RGBA,1,1,Ie,0,n.RGBA,n.UNSIGNED_BYTE,fe):n.texImage2D(de+ze,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,fe);return ne}let j={};j[n.TEXTURE_2D]=ct(n.TEXTURE_2D,n.TEXTURE_2D,1),j[n.TEXTURE_CUBE_MAP]=ct(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),j[n.TEXTURE_2D_ARRAY]=ct(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),j[n.TEXTURE_3D]=ct(n.TEXTURE_3D,n.TEXTURE_3D,1,1),s.setClear(0,0,0,1),o.setClear(1),a.setClear(0),re(n.DEPTH_TEST),o.setFunc(Lr),Q(!1),K(qu),re(n.CULL_FACE),se(Vi);function re(F){u[F]!==!0&&(n.enable(F),u[F]=!0)}function Pe(F){u[F]!==!1&&(n.disable(F),u[F]=!1)}function Ne(F,de){return h[F]!==de?(n.bindFramebuffer(F,de),h[F]=de,F===n.DRAW_FRAMEBUFFER&&(h[n.FRAMEBUFFER]=de),F===n.FRAMEBUFFER&&(h[n.DRAW_FRAMEBUFFER]=de),!0):!1}function Fe(F,de){let ge=f,Ie=!1;if(F){ge=d.get(de),ge===void 0&&(ge=[],d.set(de,ge));let fe=F.textures;if(ge.length!==fe.length||ge[0]!==n.COLOR_ATTACHMENT0){for(let ne=0,ze=fe.length;ne<ze;ne++)ge[ne]=n.COLOR_ATTACHMENT0+ne;ge.length=fe.length,Ie=!0}}else ge[0]!==n.BACK&&(ge[0]=n.BACK,Ie=!0);Ie&&n.drawBuffers(ge)}function nt(F){return m!==F?(n.useProgram(F),m=F,!0):!1}let vt={[or]:n.FUNC_ADD,[sf]:n.FUNC_SUBTRACT,[of]:n.FUNC_REVERSE_SUBTRACT};vt[af]=n.MIN,vt[lf]=n.MAX;let D={[cf]:n.ZERO,[uf]:n.ONE,[hf]:n.SRC_COLOR,[rl]:n.SRC_ALPHA,[xf]:n.SRC_ALPHA_SATURATE,[mf]:n.DST_COLOR,[ff]:n.DST_ALPHA,[df]:n.ONE_MINUS_SRC_COLOR,[sl]:n.ONE_MINUS_SRC_ALPHA,[gf]:n.ONE_MINUS_DST_COLOR,[pf]:n.ONE_MINUS_DST_ALPHA,[vf]:n.CONSTANT_COLOR,[yf]:n.ONE_MINUS_CONSTANT_COLOR,[_f]:n.CONSTANT_ALPHA,[bf]:n.ONE_MINUS_CONSTANT_ALPHA};function se(F,de,ge,Ie,fe,ne,ze,Qe,bt,ft){if(F===Vi){x===!0&&(Pe(n.BLEND),x=!1);return}if(x===!1&&(re(n.BLEND),x=!0),F!==rf){if(F!==g||ft!==M){if((p!==or||v!==or)&&(n.blendEquation(n.FUNC_ADD),p=or,v=or),ft)switch(F){case Dr:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Zu:n.blendFunc(n.ONE,n.ONE);break;case Ju:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case Ku:n.blendFuncSeparate(n.DST_COLOR,n.ONE_MINUS_SRC_ALPHA,n.ZERO,n.ONE);break;default:console.error("THREE.WebGLState: Invalid blending: ",F);break}else switch(F){case Dr:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Zu:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE,n.ONE,n.ONE);break;case Ju:console.error("THREE.WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Ku:console.error("THREE.WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:console.error("THREE.WebGLState: Invalid blending: ",F);break}w=null,b=null,A=null,R=null,I.set(0,0,0),U=0,g=F,M=ft}return}fe=fe||de,ne=ne||ge,ze=ze||Ie,(de!==p||fe!==v)&&(n.blendEquationSeparate(vt[de],vt[fe]),p=de,v=fe),(ge!==w||Ie!==b||ne!==A||ze!==R)&&(n.blendFuncSeparate(D[ge],D[Ie],D[ne],D[ze]),w=ge,b=Ie,A=ne,R=ze),(Qe.equals(I)===!1||bt!==U)&&(n.blendColor(Qe.r,Qe.g,Qe.b,bt),I.copy(Qe),U=bt),g=F,M=!1}function te(F,de){F.side===Xn?Pe(n.CULL_FACE):re(n.CULL_FACE);let ge=F.side===mn;de&&(ge=!ge),Q(ge),F.blending===Dr&&F.transparent===!1?se(Vi):se(F.blending,F.blendEquation,F.blendSrc,F.blendDst,F.blendEquationAlpha,F.blendSrcAlpha,F.blendDstAlpha,F.blendColor,F.blendAlpha,F.premultipliedAlpha),o.setFunc(F.depthFunc),o.setTest(F.depthTest),o.setMask(F.depthWrite),s.setMask(F.colorWrite);let Ie=F.stencilWrite;a.setTest(Ie),Ie&&(a.setMask(F.stencilWriteMask),a.setFunc(F.stencilFunc,F.stencilRef,F.stencilFuncMask),a.setOp(F.stencilFail,F.stencilZFail,F.stencilZPass)),ce(F.polygonOffset,F.polygonOffsetFactor,F.polygonOffsetUnits),F.alphaToCoverage===!0?re(n.SAMPLE_ALPHA_TO_COVERAGE):Pe(n.SAMPLE_ALPHA_TO_COVERAGE)}function Q(F){S!==F&&(F?n.frontFace(n.CW):n.frontFace(n.CCW),S=F)}function K(F){F!==tf?(re(n.CULL_FACE),F!==L&&(F===qu?n.cullFace(n.BACK):F===nf?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):Pe(n.CULL_FACE),L=F}function be(F){F!==B&&(J&&n.lineWidth(F),B=F)}function ce(F,de,ge){F?(re(n.POLYGON_OFFSET_FILL),(H!==de||Z!==ge)&&(n.polygonOffset(de,ge),H=de,Z=ge)):Pe(n.POLYGON_OFFSET_FILL)}function ye(F){F?re(n.SCISSOR_TEST):Pe(n.SCISSOR_TEST)}function Ye(F){F===void 0&&(F=n.TEXTURE0+X-1),_e!==F&&(n.activeTexture(F),_e=F)}function qe(F,de,ge){ge===void 0&&(_e===null?ge=n.TEXTURE0+X-1:ge=_e);let Ie=we[ge];Ie===void 0&&(Ie={type:void 0,texture:void 0},we[ge]=Ie),(Ie.type!==F||Ie.texture!==de)&&(_e!==ge&&(n.activeTexture(ge),_e=ge),n.bindTexture(F,de||j[F]),Ie.type=F,Ie.texture=de)}function T(){let F=we[_e];F!==void 0&&F.type!==void 0&&(n.bindTexture(F.type,null),F.type=void 0,F.texture=void 0)}function _(){try{n.compressedTexImage2D(...arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function z(){try{n.compressedTexImage3D(...arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function W(){try{n.texSubImage2D(...arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function ie(){try{n.texSubImage3D(...arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function q(){try{n.compressedTexSubImage2D(...arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function De(){try{n.compressedTexSubImage3D(...arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function me(){try{n.texStorage2D(...arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function Ue(){try{n.texStorage3D(...arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function Re(){try{n.texImage2D(...arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function ue(){try{n.texImage3D(...arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function Te(F){at.equals(F)===!1&&(n.scissor(F.x,F.y,F.z,F.w),at.copy(F))}function Ge(F){lt.equals(F)===!1&&(n.viewport(F.x,F.y,F.z,F.w),lt.copy(F))}function Oe(F,de){let ge=c.get(de);ge===void 0&&(ge=new WeakMap,c.set(de,ge));let Ie=ge.get(F);Ie===void 0&&(Ie=n.getUniformBlockIndex(de,F.name),ge.set(F,Ie))}function ve(F,de){let Ie=c.get(de).get(F);l.get(de)!==Ie&&(n.uniformBlockBinding(de,Ie,F.__bindingPointIndex),l.set(de,Ie))}function Ze(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),o.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),u={},_e=null,we={},h={},d=new WeakMap,f=[],m=null,x=!1,g=null,p=null,w=null,b=null,v=null,A=null,R=null,I=new tt(0,0,0),U=0,M=!1,S=null,L=null,B=null,H=null,Z=null,at.set(0,0,n.canvas.width,n.canvas.height),lt.set(0,0,n.canvas.width,n.canvas.height),s.reset(),o.reset(),a.reset()}return{buffers:{color:s,depth:o,stencil:a},enable:re,disable:Pe,bindFramebuffer:Ne,drawBuffers:Fe,useProgram:nt,setBlending:se,setMaterial:te,setFlipSided:Q,setCullFace:K,setLineWidth:be,setPolygonOffset:ce,setScissorTest:ye,activeTexture:Ye,bindTexture:qe,unbindTexture:T,compressedTexImage2D:_,compressedTexImage3D:z,texImage2D:Re,texImage3D:ue,updateUBOMapping:Oe,uniformBlockBinding:ve,texStorage2D:me,texStorage3D:Ue,texSubImage2D:W,texSubImage3D:ie,compressedTexSubImage2D:q,compressedTexSubImage3D:De,scissor:Te,viewport:Ge,reset:Ze}}function X_(n,e,t,i,r,s,o){let a=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new Ee,u=new WeakMap,h,d=new WeakMap,f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function m(T,_){return f?new OffscreenCanvas(T,_):Io("canvas")}function x(T,_,z){let W=1,ie=qe(T);if((ie.width>z||ie.height>z)&&(W=z/Math.max(ie.width,ie.height)),W<1)if(typeof HTMLImageElement<"u"&&T instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&T instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&T instanceof ImageBitmap||typeof VideoFrame<"u"&&T instanceof VideoFrame){let q=Math.floor(W*ie.width),De=Math.floor(W*ie.height);h===void 0&&(h=m(q,De));let me=_?m(q,De):h;return me.width=q,me.height=De,me.getContext("2d").drawImage(T,0,0,q,De),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+ie.width+"x"+ie.height+") to ("+q+"x"+De+")."),me}else return"data"in T&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+ie.width+"x"+ie.height+")."),T;return T}function g(T){return T.generateMipmaps}function p(T){n.generateMipmap(T)}function w(T){return T.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:T.isWebGL3DRenderTarget?n.TEXTURE_3D:T.isWebGLArrayRenderTarget||T.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function b(T,_,z,W,ie=!1){if(T!==null){if(n[T]!==void 0)return n[T];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+T+"'")}let q=_;if(_===n.RED&&(z===n.FLOAT&&(q=n.R32F),z===n.HALF_FLOAT&&(q=n.R16F),z===n.UNSIGNED_BYTE&&(q=n.R8)),_===n.RED_INTEGER&&(z===n.UNSIGNED_BYTE&&(q=n.R8UI),z===n.UNSIGNED_SHORT&&(q=n.R16UI),z===n.UNSIGNED_INT&&(q=n.R32UI),z===n.BYTE&&(q=n.R8I),z===n.SHORT&&(q=n.R16I),z===n.INT&&(q=n.R32I)),_===n.RG&&(z===n.FLOAT&&(q=n.RG32F),z===n.HALF_FLOAT&&(q=n.RG16F),z===n.UNSIGNED_BYTE&&(q=n.RG8)),_===n.RG_INTEGER&&(z===n.UNSIGNED_BYTE&&(q=n.RG8UI),z===n.UNSIGNED_SHORT&&(q=n.RG16UI),z===n.UNSIGNED_INT&&(q=n.RG32UI),z===n.BYTE&&(q=n.RG8I),z===n.SHORT&&(q=n.RG16I),z===n.INT&&(q=n.RG32I)),_===n.RGB_INTEGER&&(z===n.UNSIGNED_BYTE&&(q=n.RGB8UI),z===n.UNSIGNED_SHORT&&(q=n.RGB16UI),z===n.UNSIGNED_INT&&(q=n.RGB32UI),z===n.BYTE&&(q=n.RGB8I),z===n.SHORT&&(q=n.RGB16I),z===n.INT&&(q=n.RGB32I)),_===n.RGBA_INTEGER&&(z===n.UNSIGNED_BYTE&&(q=n.RGBA8UI),z===n.UNSIGNED_SHORT&&(q=n.RGBA16UI),z===n.UNSIGNED_INT&&(q=n.RGBA32UI),z===n.BYTE&&(q=n.RGBA8I),z===n.SHORT&&(q=n.RGBA16I),z===n.INT&&(q=n.RGBA32I)),_===n.RGB&&(z===n.UNSIGNED_INT_5_9_9_9_REV&&(q=n.RGB9_E5),z===n.UNSIGNED_INT_10F_11F_11F_REV&&(q=n.R11F_G11F_B10F)),_===n.RGBA){let De=ie?Ro:dt.getTransfer(W);z===n.FLOAT&&(q=n.RGBA32F),z===n.HALF_FLOAT&&(q=n.RGBA16F),z===n.UNSIGNED_BYTE&&(q=De===yt?n.SRGB8_ALPHA8:n.RGBA8),z===n.UNSIGNED_SHORT_4_4_4_4&&(q=n.RGBA4),z===n.UNSIGNED_SHORT_5_5_5_1&&(q=n.RGB5_A1)}return(q===n.R16F||q===n.R32F||q===n.RG16F||q===n.RG32F||q===n.RGBA16F||q===n.RGBA32F)&&e.get("EXT_color_buffer_float"),q}function v(T,_){let z;return T?_===null||_===ur||_===Vs?z=n.DEPTH24_STENCIL8:_===$n?z=n.DEPTH32F_STENCIL8:_===ks&&(z=n.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):_===null||_===ur||_===Vs?z=n.DEPTH_COMPONENT24:_===$n?z=n.DEPTH_COMPONENT32F:_===ks&&(z=n.DEPTH_COMPONENT16),z}function A(T,_){return g(T)===!0||T.isFramebufferTexture&&T.minFilter!==_n&&T.minFilter!==ii?Math.log2(Math.max(_.width,_.height))+1:T.mipmaps!==void 0&&T.mipmaps.length>0?T.mipmaps.length:T.isCompressedTexture&&Array.isArray(T.image)?_.mipmaps.length:1}function R(T){let _=T.target;_.removeEventListener("dispose",R),U(_),_.isVideoTexture&&u.delete(_)}function I(T){let _=T.target;_.removeEventListener("dispose",I),S(_)}function U(T){let _=i.get(T);if(_.__webglInit===void 0)return;let z=T.source,W=d.get(z);if(W){let ie=W[_.__cacheKey];ie.usedTimes--,ie.usedTimes===0&&M(T),Object.keys(W).length===0&&d.delete(z)}i.remove(T)}function M(T){let _=i.get(T);n.deleteTexture(_.__webglTexture);let z=T.source,W=d.get(z);delete W[_.__cacheKey],o.memory.textures--}function S(T){let _=i.get(T);if(T.depthTexture&&(T.depthTexture.dispose(),i.remove(T.depthTexture)),T.isWebGLCubeRenderTarget)for(let W=0;W<6;W++){if(Array.isArray(_.__webglFramebuffer[W]))for(let ie=0;ie<_.__webglFramebuffer[W].length;ie++)n.deleteFramebuffer(_.__webglFramebuffer[W][ie]);else n.deleteFramebuffer(_.__webglFramebuffer[W]);_.__webglDepthbuffer&&n.deleteRenderbuffer(_.__webglDepthbuffer[W])}else{if(Array.isArray(_.__webglFramebuffer))for(let W=0;W<_.__webglFramebuffer.length;W++)n.deleteFramebuffer(_.__webglFramebuffer[W]);else n.deleteFramebuffer(_.__webglFramebuffer);if(_.__webglDepthbuffer&&n.deleteRenderbuffer(_.__webglDepthbuffer),_.__webglMultisampledFramebuffer&&n.deleteFramebuffer(_.__webglMultisampledFramebuffer),_.__webglColorRenderbuffer)for(let W=0;W<_.__webglColorRenderbuffer.length;W++)_.__webglColorRenderbuffer[W]&&n.deleteRenderbuffer(_.__webglColorRenderbuffer[W]);_.__webglDepthRenderbuffer&&n.deleteRenderbuffer(_.__webglDepthRenderbuffer)}let z=T.textures;for(let W=0,ie=z.length;W<ie;W++){let q=i.get(z[W]);q.__webglTexture&&(n.deleteTexture(q.__webglTexture),o.memory.textures--),i.remove(z[W])}i.remove(T)}let L=0;function B(){L=0}function H(){let T=L;return T>=r.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+T+" texture units while this GPU supports only "+r.maxTextures),L+=1,T}function Z(T){let _=[];return _.push(T.wrapS),_.push(T.wrapT),_.push(T.wrapR||0),_.push(T.magFilter),_.push(T.minFilter),_.push(T.anisotropy),_.push(T.internalFormat),_.push(T.format),_.push(T.type),_.push(T.generateMipmaps),_.push(T.premultiplyAlpha),_.push(T.flipY),_.push(T.unpackAlignment),_.push(T.colorSpace),_.join()}function X(T,_){let z=i.get(T);if(T.isVideoTexture&&ye(T),T.isRenderTargetTexture===!1&&T.isExternalTexture!==!0&&T.version>0&&z.__version!==T.version){let W=T.image;if(W===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(W.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{j(z,T,_);return}}else T.isExternalTexture&&(z.__webglTexture=T.sourceTexture?T.sourceTexture:null);t.bindTexture(n.TEXTURE_2D,z.__webglTexture,n.TEXTURE0+_)}function J(T,_){let z=i.get(T);if(T.isRenderTargetTexture===!1&&T.version>0&&z.__version!==T.version){j(z,T,_);return}t.bindTexture(n.TEXTURE_2D_ARRAY,z.__webglTexture,n.TEXTURE0+_)}function le(T,_){let z=i.get(T);if(T.isRenderTargetTexture===!1&&T.version>0&&z.__version!==T.version){j(z,T,_);return}t.bindTexture(n.TEXTURE_3D,z.__webglTexture,n.TEXTURE0+_)}function $(T,_){let z=i.get(T);if(T.version>0&&z.__version!==T.version){re(z,T,_);return}t.bindTexture(n.TEXTURE_CUBE_MAP,z.__webglTexture,n.TEXTURE0+_)}let _e={[ol]:n.REPEAT,[sr]:n.CLAMP_TO_EDGE,[al]:n.MIRRORED_REPEAT},we={[_n]:n.NEAREST,[Pf]:n.NEAREST_MIPMAP_NEAREST,[ha]:n.NEAREST_MIPMAP_LINEAR,[ii]:n.LINEAR,[Gl]:n.LINEAR_MIPMAP_NEAREST,[cr]:n.LINEAR_MIPMAP_LINEAR},Le={[Bf]:n.NEVER,[Xf]:n.ALWAYS,[kf]:n.LESS,[oh]:n.LEQUAL,[Hf]:n.EQUAL,[Wf]:n.GEQUAL,[Vf]:n.GREATER,[Gf]:n.NOTEQUAL};function je(T,_){if(_.type===$n&&e.has("OES_texture_float_linear")===!1&&(_.magFilter===ii||_.magFilter===Gl||_.magFilter===ha||_.magFilter===cr||_.minFilter===ii||_.minFilter===Gl||_.minFilter===ha||_.minFilter===cr)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(T,n.TEXTURE_WRAP_S,_e[_.wrapS]),n.texParameteri(T,n.TEXTURE_WRAP_T,_e[_.wrapT]),(T===n.TEXTURE_3D||T===n.TEXTURE_2D_ARRAY)&&n.texParameteri(T,n.TEXTURE_WRAP_R,_e[_.wrapR]),n.texParameteri(T,n.TEXTURE_MAG_FILTER,we[_.magFilter]),n.texParameteri(T,n.TEXTURE_MIN_FILTER,we[_.minFilter]),_.compareFunction&&(n.texParameteri(T,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(T,n.TEXTURE_COMPARE_FUNC,Le[_.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(_.magFilter===_n||_.minFilter!==ha&&_.minFilter!==cr||_.type===$n&&e.has("OES_texture_float_linear")===!1)return;if(_.anisotropy>1||i.get(_).__currentAnisotropy){let z=e.get("EXT_texture_filter_anisotropic");n.texParameterf(T,z.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(_.anisotropy,r.getMaxAnisotropy())),i.get(_).__currentAnisotropy=_.anisotropy}}}function at(T,_){let z=!1;T.__webglInit===void 0&&(T.__webglInit=!0,_.addEventListener("dispose",R));let W=_.source,ie=d.get(W);ie===void 0&&(ie={},d.set(W,ie));let q=Z(_);if(q!==T.__cacheKey){ie[q]===void 0&&(ie[q]={texture:n.createTexture(),usedTimes:0},o.memory.textures++,z=!0),ie[q].usedTimes++;let De=ie[T.__cacheKey];De!==void 0&&(ie[T.__cacheKey].usedTimes--,De.usedTimes===0&&M(_)),T.__cacheKey=q,T.__webglTexture=ie[q].texture}return z}function lt(T,_,z){return Math.floor(Math.floor(T/z)/_)}function ct(T,_,z,W){let q=T.updateRanges;if(q.length===0)t.texSubImage2D(n.TEXTURE_2D,0,0,0,_.width,_.height,z,W,_.data);else{q.sort((ue,Te)=>ue.start-Te.start);let De=0;for(let ue=1;ue<q.length;ue++){let Te=q[De],Ge=q[ue],Oe=Te.start+Te.count,ve=lt(Ge.start,_.width,4),Ze=lt(Te.start,_.width,4);Ge.start<=Oe+1&&ve===Ze&&lt(Ge.start+Ge.count-1,_.width,4)===ve?Te.count=Math.max(Te.count,Ge.start+Ge.count-Te.start):(++De,q[De]=Ge)}q.length=De+1;let me=n.getParameter(n.UNPACK_ROW_LENGTH),Ue=n.getParameter(n.UNPACK_SKIP_PIXELS),Re=n.getParameter(n.UNPACK_SKIP_ROWS);n.pixelStorei(n.UNPACK_ROW_LENGTH,_.width);for(let ue=0,Te=q.length;ue<Te;ue++){let Ge=q[ue],Oe=Math.floor(Ge.start/4),ve=Math.ceil(Ge.count/4),Ze=Oe%_.width,F=Math.floor(Oe/_.width),de=ve,ge=1;n.pixelStorei(n.UNPACK_SKIP_PIXELS,Ze),n.pixelStorei(n.UNPACK_SKIP_ROWS,F),t.texSubImage2D(n.TEXTURE_2D,0,Ze,F,de,ge,z,W,_.data)}T.clearUpdateRanges(),n.pixelStorei(n.UNPACK_ROW_LENGTH,me),n.pixelStorei(n.UNPACK_SKIP_PIXELS,Ue),n.pixelStorei(n.UNPACK_SKIP_ROWS,Re)}}function j(T,_,z){let W=n.TEXTURE_2D;(_.isDataArrayTexture||_.isCompressedArrayTexture)&&(W=n.TEXTURE_2D_ARRAY),_.isData3DTexture&&(W=n.TEXTURE_3D);let ie=at(T,_),q=_.source;t.bindTexture(W,T.__webglTexture,n.TEXTURE0+z);let De=i.get(q);if(q.version!==De.__version||ie===!0){t.activeTexture(n.TEXTURE0+z);let me=dt.getPrimaries(dt.workingColorSpace),Ue=_.colorSpace===Gi?null:dt.getPrimaries(_.colorSpace),Re=_.colorSpace===Gi||me===Ue?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,_.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,_.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Re);let ue=x(_.image,!1,r.maxTextureSize);ue=Ye(_,ue);let Te=s.convert(_.format,_.colorSpace),Ge=s.convert(_.type),Oe=b(_.internalFormat,Te,Ge,_.colorSpace,_.isVideoTexture);je(W,_);let ve,Ze=_.mipmaps,F=_.isVideoTexture!==!0,de=De.__version===void 0||ie===!0,ge=q.dataReady,Ie=A(_,ue);if(_.isDepthTexture)Oe=v(_.format===Gs,_.type),de&&(F?t.texStorage2D(n.TEXTURE_2D,1,Oe,ue.width,ue.height):t.texImage2D(n.TEXTURE_2D,0,Oe,ue.width,ue.height,0,Te,Ge,null));else if(_.isDataTexture)if(Ze.length>0){F&&de&&t.texStorage2D(n.TEXTURE_2D,Ie,Oe,Ze[0].width,Ze[0].height);for(let fe=0,ne=Ze.length;fe<ne;fe++)ve=Ze[fe],F?ge&&t.texSubImage2D(n.TEXTURE_2D,fe,0,0,ve.width,ve.height,Te,Ge,ve.data):t.texImage2D(n.TEXTURE_2D,fe,Oe,ve.width,ve.height,0,Te,Ge,ve.data);_.generateMipmaps=!1}else F?(de&&t.texStorage2D(n.TEXTURE_2D,Ie,Oe,ue.width,ue.height),ge&&ct(_,ue,Te,Ge)):t.texImage2D(n.TEXTURE_2D,0,Oe,ue.width,ue.height,0,Te,Ge,ue.data);else if(_.isCompressedTexture)if(_.isCompressedArrayTexture){F&&de&&t.texStorage3D(n.TEXTURE_2D_ARRAY,Ie,Oe,Ze[0].width,Ze[0].height,ue.depth);for(let fe=0,ne=Ze.length;fe<ne;fe++)if(ve=Ze[fe],_.format!==Nn)if(Te!==null)if(F){if(ge)if(_.layerUpdates.size>0){let ze=gh(ve.width,ve.height,_.format,_.type);for(let Qe of _.layerUpdates){let bt=ve.data.subarray(Qe*ze/ve.data.BYTES_PER_ELEMENT,(Qe+1)*ze/ve.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,fe,0,0,Qe,ve.width,ve.height,1,Te,bt)}_.clearLayerUpdates()}else t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,fe,0,0,0,ve.width,ve.height,ue.depth,Te,ve.data)}else t.compressedTexImage3D(n.TEXTURE_2D_ARRAY,fe,Oe,ve.width,ve.height,ue.depth,0,ve.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else F?ge&&t.texSubImage3D(n.TEXTURE_2D_ARRAY,fe,0,0,0,ve.width,ve.height,ue.depth,Te,Ge,ve.data):t.texImage3D(n.TEXTURE_2D_ARRAY,fe,Oe,ve.width,ve.height,ue.depth,0,Te,Ge,ve.data)}else{F&&de&&t.texStorage2D(n.TEXTURE_2D,Ie,Oe,Ze[0].width,Ze[0].height);for(let fe=0,ne=Ze.length;fe<ne;fe++)ve=Ze[fe],_.format!==Nn?Te!==null?F?ge&&t.compressedTexSubImage2D(n.TEXTURE_2D,fe,0,0,ve.width,ve.height,Te,ve.data):t.compressedTexImage2D(n.TEXTURE_2D,fe,Oe,ve.width,ve.height,0,ve.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):F?ge&&t.texSubImage2D(n.TEXTURE_2D,fe,0,0,ve.width,ve.height,Te,Ge,ve.data):t.texImage2D(n.TEXTURE_2D,fe,Oe,ve.width,ve.height,0,Te,Ge,ve.data)}else if(_.isDataArrayTexture)if(F){if(de&&t.texStorage3D(n.TEXTURE_2D_ARRAY,Ie,Oe,ue.width,ue.height,ue.depth),ge)if(_.layerUpdates.size>0){let fe=gh(ue.width,ue.height,_.format,_.type);for(let ne of _.layerUpdates){let ze=ue.data.subarray(ne*fe/ue.data.BYTES_PER_ELEMENT,(ne+1)*fe/ue.data.BYTES_PER_ELEMENT);t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,ne,ue.width,ue.height,1,Te,Ge,ze)}_.clearLayerUpdates()}else t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,ue.width,ue.height,ue.depth,Te,Ge,ue.data)}else t.texImage3D(n.TEXTURE_2D_ARRAY,0,Oe,ue.width,ue.height,ue.depth,0,Te,Ge,ue.data);else if(_.isData3DTexture)F?(de&&t.texStorage3D(n.TEXTURE_3D,Ie,Oe,ue.width,ue.height,ue.depth),ge&&t.texSubImage3D(n.TEXTURE_3D,0,0,0,0,ue.width,ue.height,ue.depth,Te,Ge,ue.data)):t.texImage3D(n.TEXTURE_3D,0,Oe,ue.width,ue.height,ue.depth,0,Te,Ge,ue.data);else if(_.isFramebufferTexture){if(de)if(F)t.texStorage2D(n.TEXTURE_2D,Ie,Oe,ue.width,ue.height);else{let fe=ue.width,ne=ue.height;for(let ze=0;ze<Ie;ze++)t.texImage2D(n.TEXTURE_2D,ze,Oe,fe,ne,0,Te,Ge,null),fe>>=1,ne>>=1}}else if(Ze.length>0){if(F&&de){let fe=qe(Ze[0]);t.texStorage2D(n.TEXTURE_2D,Ie,Oe,fe.width,fe.height)}for(let fe=0,ne=Ze.length;fe<ne;fe++)ve=Ze[fe],F?ge&&t.texSubImage2D(n.TEXTURE_2D,fe,0,0,Te,Ge,ve):t.texImage2D(n.TEXTURE_2D,fe,Oe,Te,Ge,ve);_.generateMipmaps=!1}else if(F){if(de){let fe=qe(ue);t.texStorage2D(n.TEXTURE_2D,Ie,Oe,fe.width,fe.height)}ge&&t.texSubImage2D(n.TEXTURE_2D,0,0,0,Te,Ge,ue)}else t.texImage2D(n.TEXTURE_2D,0,Oe,Te,Ge,ue);g(_)&&p(W),De.__version=q.version,_.onUpdate&&_.onUpdate(_)}T.__version=_.version}function re(T,_,z){if(_.image.length!==6)return;let W=at(T,_),ie=_.source;t.bindTexture(n.TEXTURE_CUBE_MAP,T.__webglTexture,n.TEXTURE0+z);let q=i.get(ie);if(ie.version!==q.__version||W===!0){t.activeTexture(n.TEXTURE0+z);let De=dt.getPrimaries(dt.workingColorSpace),me=_.colorSpace===Gi?null:dt.getPrimaries(_.colorSpace),Ue=_.colorSpace===Gi||De===me?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,_.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,_.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ue);let Re=_.isCompressedTexture||_.image[0].isCompressedTexture,ue=_.image[0]&&_.image[0].isDataTexture,Te=[];for(let ne=0;ne<6;ne++)!Re&&!ue?Te[ne]=x(_.image[ne],!0,r.maxCubemapSize):Te[ne]=ue?_.image[ne].image:_.image[ne],Te[ne]=Ye(_,Te[ne]);let Ge=Te[0],Oe=s.convert(_.format,_.colorSpace),ve=s.convert(_.type),Ze=b(_.internalFormat,Oe,ve,_.colorSpace),F=_.isVideoTexture!==!0,de=q.__version===void 0||W===!0,ge=ie.dataReady,Ie=A(_,Ge);je(n.TEXTURE_CUBE_MAP,_);let fe;if(Re){F&&de&&t.texStorage2D(n.TEXTURE_CUBE_MAP,Ie,Ze,Ge.width,Ge.height);for(let ne=0;ne<6;ne++){fe=Te[ne].mipmaps;for(let ze=0;ze<fe.length;ze++){let Qe=fe[ze];_.format!==Nn?Oe!==null?F?ge&&t.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ne,ze,0,0,Qe.width,Qe.height,Oe,Qe.data):t.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ne,ze,Ze,Qe.width,Qe.height,0,Qe.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):F?ge&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ne,ze,0,0,Qe.width,Qe.height,Oe,ve,Qe.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ne,ze,Ze,Qe.width,Qe.height,0,Oe,ve,Qe.data)}}}else{if(fe=_.mipmaps,F&&de){fe.length>0&&Ie++;let ne=qe(Te[0]);t.texStorage2D(n.TEXTURE_CUBE_MAP,Ie,Ze,ne.width,ne.height)}for(let ne=0;ne<6;ne++)if(ue){F?ge&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ne,0,0,0,Te[ne].width,Te[ne].height,Oe,ve,Te[ne].data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ne,0,Ze,Te[ne].width,Te[ne].height,0,Oe,ve,Te[ne].data);for(let ze=0;ze<fe.length;ze++){let bt=fe[ze].image[ne].image;F?ge&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ne,ze+1,0,0,bt.width,bt.height,Oe,ve,bt.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ne,ze+1,Ze,bt.width,bt.height,0,Oe,ve,bt.data)}}else{F?ge&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ne,0,0,0,Oe,ve,Te[ne]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ne,0,Ze,Oe,ve,Te[ne]);for(let ze=0;ze<fe.length;ze++){let Qe=fe[ze];F?ge&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ne,ze+1,0,0,Oe,ve,Qe.image[ne]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ne,ze+1,Ze,Oe,ve,Qe.image[ne])}}}g(_)&&p(n.TEXTURE_CUBE_MAP),q.__version=ie.version,_.onUpdate&&_.onUpdate(_)}T.__version=_.version}function Pe(T,_,z,W,ie,q){let De=s.convert(z.format,z.colorSpace),me=s.convert(z.type),Ue=b(z.internalFormat,De,me,z.colorSpace),Re=i.get(_),ue=i.get(z);if(ue.__renderTarget=_,!Re.__hasExternalTextures){let Te=Math.max(1,_.width>>q),Ge=Math.max(1,_.height>>q);ie===n.TEXTURE_3D||ie===n.TEXTURE_2D_ARRAY?t.texImage3D(ie,q,Ue,Te,Ge,_.depth,0,De,me,null):t.texImage2D(ie,q,Ue,Te,Ge,0,De,me,null)}t.bindFramebuffer(n.FRAMEBUFFER,T),ce(_)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,W,ie,ue.__webglTexture,0,be(_)):(ie===n.TEXTURE_2D||ie>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&ie<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,W,ie,ue.__webglTexture,q),t.bindFramebuffer(n.FRAMEBUFFER,null)}function Ne(T,_,z){if(n.bindRenderbuffer(n.RENDERBUFFER,T),_.depthBuffer){let W=_.depthTexture,ie=W&&W.isDepthTexture?W.type:null,q=v(_.stencilBuffer,ie),De=_.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,me=be(_);ce(_)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,me,q,_.width,_.height):z?n.renderbufferStorageMultisample(n.RENDERBUFFER,me,q,_.width,_.height):n.renderbufferStorage(n.RENDERBUFFER,q,_.width,_.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,De,n.RENDERBUFFER,T)}else{let W=_.textures;for(let ie=0;ie<W.length;ie++){let q=W[ie],De=s.convert(q.format,q.colorSpace),me=s.convert(q.type),Ue=b(q.internalFormat,De,me,q.colorSpace),Re=be(_);z&&ce(_)===!1?n.renderbufferStorageMultisample(n.RENDERBUFFER,Re,Ue,_.width,_.height):ce(_)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,Re,Ue,_.width,_.height):n.renderbufferStorage(n.RENDERBUFFER,Ue,_.width,_.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function Fe(T,_){if(_&&_.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(n.FRAMEBUFFER,T),!(_.depthTexture&&_.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");let W=i.get(_.depthTexture);W.__renderTarget=_,(!W.__webglTexture||_.depthTexture.image.width!==_.width||_.depthTexture.image.height!==_.height)&&(_.depthTexture.image.width=_.width,_.depthTexture.image.height=_.height,_.depthTexture.needsUpdate=!0),X(_.depthTexture,0);let ie=W.__webglTexture,q=be(_);if(_.depthTexture.format===Es)ce(_)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,ie,0,q):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,ie,0);else if(_.depthTexture.format===Gs)ce(_)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,ie,0,q):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,ie,0);else throw new Error("Unknown depthTexture format")}function nt(T){let _=i.get(T),z=T.isWebGLCubeRenderTarget===!0;if(_.__boundDepthTexture!==T.depthTexture){let W=T.depthTexture;if(_.__depthDisposeCallback&&_.__depthDisposeCallback(),W){let ie=()=>{delete _.__boundDepthTexture,delete _.__depthDisposeCallback,W.removeEventListener("dispose",ie)};W.addEventListener("dispose",ie),_.__depthDisposeCallback=ie}_.__boundDepthTexture=W}if(T.depthTexture&&!_.__autoAllocateDepthBuffer){if(z)throw new Error("target.depthTexture not supported in Cube render targets");let W=T.texture.mipmaps;W&&W.length>0?Fe(_.__webglFramebuffer[0],T):Fe(_.__webglFramebuffer,T)}else if(z){_.__webglDepthbuffer=[];for(let W=0;W<6;W++)if(t.bindFramebuffer(n.FRAMEBUFFER,_.__webglFramebuffer[W]),_.__webglDepthbuffer[W]===void 0)_.__webglDepthbuffer[W]=n.createRenderbuffer(),Ne(_.__webglDepthbuffer[W],T,!1);else{let ie=T.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,q=_.__webglDepthbuffer[W];n.bindRenderbuffer(n.RENDERBUFFER,q),n.framebufferRenderbuffer(n.FRAMEBUFFER,ie,n.RENDERBUFFER,q)}}else{let W=T.texture.mipmaps;if(W&&W.length>0?t.bindFramebuffer(n.FRAMEBUFFER,_.__webglFramebuffer[0]):t.bindFramebuffer(n.FRAMEBUFFER,_.__webglFramebuffer),_.__webglDepthbuffer===void 0)_.__webglDepthbuffer=n.createRenderbuffer(),Ne(_.__webglDepthbuffer,T,!1);else{let ie=T.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,q=_.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,q),n.framebufferRenderbuffer(n.FRAMEBUFFER,ie,n.RENDERBUFFER,q)}}t.bindFramebuffer(n.FRAMEBUFFER,null)}function vt(T,_,z){let W=i.get(T);_!==void 0&&Pe(W.__webglFramebuffer,T,T.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),z!==void 0&&nt(T)}function D(T){let _=T.texture,z=i.get(T),W=i.get(_);T.addEventListener("dispose",I);let ie=T.textures,q=T.isWebGLCubeRenderTarget===!0,De=ie.length>1;if(De||(W.__webglTexture===void 0&&(W.__webglTexture=n.createTexture()),W.__version=_.version,o.memory.textures++),q){z.__webglFramebuffer=[];for(let me=0;me<6;me++)if(_.mipmaps&&_.mipmaps.length>0){z.__webglFramebuffer[me]=[];for(let Ue=0;Ue<_.mipmaps.length;Ue++)z.__webglFramebuffer[me][Ue]=n.createFramebuffer()}else z.__webglFramebuffer[me]=n.createFramebuffer()}else{if(_.mipmaps&&_.mipmaps.length>0){z.__webglFramebuffer=[];for(let me=0;me<_.mipmaps.length;me++)z.__webglFramebuffer[me]=n.createFramebuffer()}else z.__webglFramebuffer=n.createFramebuffer();if(De)for(let me=0,Ue=ie.length;me<Ue;me++){let Re=i.get(ie[me]);Re.__webglTexture===void 0&&(Re.__webglTexture=n.createTexture(),o.memory.textures++)}if(T.samples>0&&ce(T)===!1){z.__webglMultisampledFramebuffer=n.createFramebuffer(),z.__webglColorRenderbuffer=[],t.bindFramebuffer(n.FRAMEBUFFER,z.__webglMultisampledFramebuffer);for(let me=0;me<ie.length;me++){let Ue=ie[me];z.__webglColorRenderbuffer[me]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,z.__webglColorRenderbuffer[me]);let Re=s.convert(Ue.format,Ue.colorSpace),ue=s.convert(Ue.type),Te=b(Ue.internalFormat,Re,ue,Ue.colorSpace,T.isXRRenderTarget===!0),Ge=be(T);n.renderbufferStorageMultisample(n.RENDERBUFFER,Ge,Te,T.width,T.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+me,n.RENDERBUFFER,z.__webglColorRenderbuffer[me])}n.bindRenderbuffer(n.RENDERBUFFER,null),T.depthBuffer&&(z.__webglDepthRenderbuffer=n.createRenderbuffer(),Ne(z.__webglDepthRenderbuffer,T,!0)),t.bindFramebuffer(n.FRAMEBUFFER,null)}}if(q){t.bindTexture(n.TEXTURE_CUBE_MAP,W.__webglTexture),je(n.TEXTURE_CUBE_MAP,_);for(let me=0;me<6;me++)if(_.mipmaps&&_.mipmaps.length>0)for(let Ue=0;Ue<_.mipmaps.length;Ue++)Pe(z.__webglFramebuffer[me][Ue],T,_,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+me,Ue);else Pe(z.__webglFramebuffer[me],T,_,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+me,0);g(_)&&p(n.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(De){for(let me=0,Ue=ie.length;me<Ue;me++){let Re=ie[me],ue=i.get(Re),Te=n.TEXTURE_2D;(T.isWebGL3DRenderTarget||T.isWebGLArrayRenderTarget)&&(Te=T.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(Te,ue.__webglTexture),je(Te,Re),Pe(z.__webglFramebuffer,T,Re,n.COLOR_ATTACHMENT0+me,Te,0),g(Re)&&p(Te)}t.unbindTexture()}else{let me=n.TEXTURE_2D;if((T.isWebGL3DRenderTarget||T.isWebGLArrayRenderTarget)&&(me=T.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(me,W.__webglTexture),je(me,_),_.mipmaps&&_.mipmaps.length>0)for(let Ue=0;Ue<_.mipmaps.length;Ue++)Pe(z.__webglFramebuffer[Ue],T,_,n.COLOR_ATTACHMENT0,me,Ue);else Pe(z.__webglFramebuffer,T,_,n.COLOR_ATTACHMENT0,me,0);g(_)&&p(me),t.unbindTexture()}T.depthBuffer&&nt(T)}function se(T){let _=T.textures;for(let z=0,W=_.length;z<W;z++){let ie=_[z];if(g(ie)){let q=w(T),De=i.get(ie).__webglTexture;t.bindTexture(q,De),p(q),t.unbindTexture()}}}let te=[],Q=[];function K(T){if(T.samples>0){if(ce(T)===!1){let _=T.textures,z=T.width,W=T.height,ie=n.COLOR_BUFFER_BIT,q=T.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,De=i.get(T),me=_.length>1;if(me)for(let Re=0;Re<_.length;Re++)t.bindFramebuffer(n.FRAMEBUFFER,De.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Re,n.RENDERBUFFER,null),t.bindFramebuffer(n.FRAMEBUFFER,De.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+Re,n.TEXTURE_2D,null,0);t.bindFramebuffer(n.READ_FRAMEBUFFER,De.__webglMultisampledFramebuffer);let Ue=T.texture.mipmaps;Ue&&Ue.length>0?t.bindFramebuffer(n.DRAW_FRAMEBUFFER,De.__webglFramebuffer[0]):t.bindFramebuffer(n.DRAW_FRAMEBUFFER,De.__webglFramebuffer);for(let Re=0;Re<_.length;Re++){if(T.resolveDepthBuffer&&(T.depthBuffer&&(ie|=n.DEPTH_BUFFER_BIT),T.stencilBuffer&&T.resolveStencilBuffer&&(ie|=n.STENCIL_BUFFER_BIT)),me){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,De.__webglColorRenderbuffer[Re]);let ue=i.get(_[Re]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,ue,0)}n.blitFramebuffer(0,0,z,W,0,0,z,W,ie,n.NEAREST),l===!0&&(te.length=0,Q.length=0,te.push(n.COLOR_ATTACHMENT0+Re),T.depthBuffer&&T.resolveDepthBuffer===!1&&(te.push(q),Q.push(q),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,Q)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,te))}if(t.bindFramebuffer(n.READ_FRAMEBUFFER,null),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),me)for(let Re=0;Re<_.length;Re++){t.bindFramebuffer(n.FRAMEBUFFER,De.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Re,n.RENDERBUFFER,De.__webglColorRenderbuffer[Re]);let ue=i.get(_[Re]).__webglTexture;t.bindFramebuffer(n.FRAMEBUFFER,De.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+Re,n.TEXTURE_2D,ue,0)}t.bindFramebuffer(n.DRAW_FRAMEBUFFER,De.__webglMultisampledFramebuffer)}else if(T.depthBuffer&&T.resolveDepthBuffer===!1&&l){let _=T.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[_])}}}function be(T){return Math.min(r.maxSamples,T.samples)}function ce(T){let _=i.get(T);return T.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&_.__useRenderToTexture!==!1}function ye(T){let _=o.render.frame;u.get(T)!==_&&(u.set(T,_),T.update())}function Ye(T,_){let z=T.colorSpace,W=T.format,ie=T.type;return T.isCompressedTexture===!0||T.isVideoTexture===!0||z!==Ur&&z!==Gi&&(dt.getTransfer(z)===yt?(W!==Nn||ie!==li)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",z)),_}function qe(T){return typeof HTMLImageElement<"u"&&T instanceof HTMLImageElement?(c.width=T.naturalWidth||T.width,c.height=T.naturalHeight||T.height):typeof VideoFrame<"u"&&T instanceof VideoFrame?(c.width=T.displayWidth,c.height=T.displayHeight):(c.width=T.width,c.height=T.height),c}this.allocateTextureUnit=H,this.resetTextureUnits=B,this.setTexture2D=X,this.setTexture2DArray=J,this.setTexture3D=le,this.setTextureCube=$,this.rebindTextures=vt,this.setupRenderTarget=D,this.updateRenderTargetMipmap=se,this.updateMultisampleRenderTarget=K,this.setupDepthRenderbuffer=nt,this.setupFrameBufferTexture=Pe,this.useMultisampledRTT=ce}function $_(n,e){function t(i,r=Gi){let s,o=dt.getTransfer(r);if(i===li)return n.UNSIGNED_BYTE;if(i===Xl)return n.UNSIGNED_SHORT_4_4_4_4;if(i===$l)return n.UNSIGNED_SHORT_5_5_5_1;if(i===th)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===nh)return n.UNSIGNED_INT_10F_11F_11F_REV;if(i===Qu)return n.BYTE;if(i===eh)return n.SHORT;if(i===ks)return n.UNSIGNED_SHORT;if(i===Wl)return n.INT;if(i===ur)return n.UNSIGNED_INT;if(i===$n)return n.FLOAT;if(i===Hs)return n.HALF_FLOAT;if(i===ih)return n.ALPHA;if(i===rh)return n.RGB;if(i===Nn)return n.RGBA;if(i===Es)return n.DEPTH_COMPONENT;if(i===Gs)return n.DEPTH_STENCIL;if(i===ql)return n.RED;if(i===Yl)return n.RED_INTEGER;if(i===sh)return n.RG;if(i===Zl)return n.RG_INTEGER;if(i===Jl)return n.RGBA_INTEGER;if(i===da||i===fa||i===pa||i===ma)if(o===yt)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(i===da)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===fa)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===pa)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===ma)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(i===da)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===fa)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===pa)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===ma)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===Kl||i===jl||i===Ql||i===ec)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(i===Kl)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===jl)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===Ql)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===ec)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===tc||i===nc||i===ic)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(i===tc||i===nc)return o===yt?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(i===ic)return o===yt?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(i===rc||i===sc||i===oc||i===ac||i===lc||i===cc||i===uc||i===hc||i===dc||i===fc||i===pc||i===mc||i===gc||i===xc)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(i===rc)return o===yt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===sc)return o===yt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===oc)return o===yt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===ac)return o===yt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===lc)return o===yt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===cc)return o===yt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===uc)return o===yt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===hc)return o===yt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===dc)return o===yt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===fc)return o===yt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===pc)return o===yt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===mc)return o===yt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===gc)return o===yt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===xc)return o===yt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===vc||i===yc||i===_c)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(i===vc)return o===yt?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===yc)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===_c)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===bc||i===Mc||i===Sc||i===Ec)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(i===bc)return s.COMPRESSED_RED_RGTC1_EXT;if(i===Mc)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===Sc)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===Ec)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===Vs?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:t}}var q_=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Y_=`
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

}`,Ch=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let i=new Wo(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,i=new Mn({vertexShader:q_,fragmentShader:Y_,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Ct(new lr(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},Ih=class extends bi{constructor(e,t){super();let i=this,r=null,s=1,o=null,a="local-floor",l=1,c=null,u=null,h=null,d=null,f=null,m=null,x=typeof XRWebGLBinding<"u",g=new Ch,p={},w=t.getContextAttributes(),b=null,v=null,A=[],R=[],I=new Ee,U=null,M=new nn;M.viewport=new pt;let S=new nn;S.viewport=new pt;let L=[M,S],B=new Cl,H=null,Z=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(j){let re=A[j];return re===void 0&&(re=new Cs,A[j]=re),re.getTargetRaySpace()},this.getControllerGrip=function(j){let re=A[j];return re===void 0&&(re=new Cs,A[j]=re),re.getGripSpace()},this.getHand=function(j){let re=A[j];return re===void 0&&(re=new Cs,A[j]=re),re.getHandSpace()};function X(j){let re=R.indexOf(j.inputSource);if(re===-1)return;let Pe=A[re];Pe!==void 0&&(Pe.update(j.inputSource,j.frame,c||o),Pe.dispatchEvent({type:j.type,data:j.inputSource}))}function J(){r.removeEventListener("select",X),r.removeEventListener("selectstart",X),r.removeEventListener("selectend",X),r.removeEventListener("squeeze",X),r.removeEventListener("squeezestart",X),r.removeEventListener("squeezeend",X),r.removeEventListener("end",J),r.removeEventListener("inputsourceschange",le);for(let j=0;j<A.length;j++){let re=R[j];re!==null&&(R[j]=null,A[j].disconnect(re))}H=null,Z=null,g.reset();for(let j in p)delete p[j];e.setRenderTarget(b),f=null,d=null,h=null,r=null,v=null,ct.stop(),i.isPresenting=!1,e.setPixelRatio(U),e.setSize(I.width,I.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(j){s=j,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(j){a=j,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(j){c=j},this.getBaseLayer=function(){return d!==null?d:f},this.getBinding=function(){return h===null&&x&&(h=new XRWebGLBinding(r,t)),h},this.getFrame=function(){return m},this.getSession=function(){return r},this.setSession=async function(j){if(r=j,r!==null){if(b=e.getRenderTarget(),r.addEventListener("select",X),r.addEventListener("selectstart",X),r.addEventListener("selectend",X),r.addEventListener("squeeze",X),r.addEventListener("squeezestart",X),r.addEventListener("squeezeend",X),r.addEventListener("end",J),r.addEventListener("inputsourceschange",le),w.xrCompatible!==!0&&await t.makeXRCompatible(),U=e.getPixelRatio(),e.getSize(I),x&&"createProjectionLayer"in XRWebGLBinding.prototype){let Pe=null,Ne=null,Fe=null;w.depth&&(Fe=w.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,Pe=w.stencil?Gs:Es,Ne=w.stencil?Vs:ur);let nt={colorFormat:t.RGBA8,depthFormat:Fe,scaleFactor:s};h=this.getBinding(),d=h.createProjectionLayer(nt),r.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),v=new Mi(d.textureWidth,d.textureHeight,{format:Nn,type:li,depthTexture:new Go(d.textureWidth,d.textureHeight,Ne,void 0,void 0,void 0,void 0,void 0,void 0,Pe),stencilBuffer:w.stencil,colorSpace:e.outputColorSpace,samples:w.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1})}else{let Pe={antialias:w.antialias,alpha:!0,depth:w.depth,stencil:w.stencil,framebufferScaleFactor:s};f=new XRWebGLLayer(r,t,Pe),r.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),v=new Mi(f.framebufferWidth,f.framebufferHeight,{format:Nn,type:li,colorSpace:e.outputColorSpace,stencilBuffer:w.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}v.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await r.requestReferenceSpace(a),ct.setContext(r),ct.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return g.getDepthTexture()};function le(j){for(let re=0;re<j.removed.length;re++){let Pe=j.removed[re],Ne=R.indexOf(Pe);Ne>=0&&(R[Ne]=null,A[Ne].disconnect(Pe))}for(let re=0;re<j.added.length;re++){let Pe=j.added[re],Ne=R.indexOf(Pe);if(Ne===-1){for(let nt=0;nt<A.length;nt++)if(nt>=R.length){R.push(Pe),Ne=nt;break}else if(R[nt]===null){R[nt]=Pe,Ne=nt;break}if(Ne===-1)break}let Fe=A[Ne];Fe&&Fe.connect(Pe)}}let $=new P,_e=new P;function we(j,re,Pe){$.setFromMatrixPosition(re.matrixWorld),_e.setFromMatrixPosition(Pe.matrixWorld);let Ne=$.distanceTo(_e),Fe=re.projectionMatrix.elements,nt=Pe.projectionMatrix.elements,vt=Fe[14]/(Fe[10]-1),D=Fe[14]/(Fe[10]+1),se=(Fe[9]+1)/Fe[5],te=(Fe[9]-1)/Fe[5],Q=(Fe[8]-1)/Fe[0],K=(nt[8]+1)/nt[0],be=vt*Q,ce=vt*K,ye=Ne/(-Q+K),Ye=ye*-Q;if(re.matrixWorld.decompose(j.position,j.quaternion,j.scale),j.translateX(Ye),j.translateZ(ye),j.matrixWorld.compose(j.position,j.quaternion,j.scale),j.matrixWorldInverse.copy(j.matrixWorld).invert(),Fe[10]===-1)j.projectionMatrix.copy(re.projectionMatrix),j.projectionMatrixInverse.copy(re.projectionMatrixInverse);else{let qe=vt+ye,T=D+ye,_=be-Ye,z=ce+(Ne-Ye),W=se*D/T*qe,ie=te*D/T*qe;j.projectionMatrix.makePerspective(_,z,W,ie,qe,T),j.projectionMatrixInverse.copy(j.projectionMatrix).invert()}}function Le(j,re){re===null?j.matrixWorld.copy(j.matrix):j.matrixWorld.multiplyMatrices(re.matrixWorld,j.matrix),j.matrixWorldInverse.copy(j.matrixWorld).invert()}this.updateCamera=function(j){if(r===null)return;let re=j.near,Pe=j.far;g.texture!==null&&(g.depthNear>0&&(re=g.depthNear),g.depthFar>0&&(Pe=g.depthFar)),B.near=S.near=M.near=re,B.far=S.far=M.far=Pe,(H!==B.near||Z!==B.far)&&(r.updateRenderState({depthNear:B.near,depthFar:B.far}),H=B.near,Z=B.far),B.layers.mask=j.layers.mask|6,M.layers.mask=B.layers.mask&3,S.layers.mask=B.layers.mask&5;let Ne=j.parent,Fe=B.cameras;Le(B,Ne);for(let nt=0;nt<Fe.length;nt++)Le(Fe[nt],Ne);Fe.length===2?we(B,M,S):B.projectionMatrix.copy(M.projectionMatrix),je(j,B,Ne)};function je(j,re,Pe){Pe===null?j.matrix.copy(re.matrixWorld):(j.matrix.copy(Pe.matrixWorld),j.matrix.invert(),j.matrix.multiply(re.matrixWorld)),j.matrix.decompose(j.position,j.quaternion,j.scale),j.updateMatrixWorld(!0),j.projectionMatrix.copy(re.projectionMatrix),j.projectionMatrixInverse.copy(re.projectionMatrixInverse),j.isPerspectiveCamera&&(j.fov=ws*2*Math.atan(1/j.projectionMatrix.elements[5]),j.zoom=1)}this.getCamera=function(){return B},this.getFoveation=function(){if(!(d===null&&f===null))return l},this.setFoveation=function(j){l=j,d!==null&&(d.fixedFoveation=j),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=j)},this.hasDepthSensing=function(){return g.texture!==null},this.getDepthSensingMesh=function(){return g.getMesh(B)},this.getCameraTexture=function(j){return p[j]};let at=null;function lt(j,re){if(u=re.getViewerPose(c||o),m=re,u!==null){let Pe=u.views;f!==null&&(e.setRenderTargetFramebuffer(v,f.framebuffer),e.setRenderTarget(v));let Ne=!1;Pe.length!==B.cameras.length&&(B.cameras.length=0,Ne=!0);for(let D=0;D<Pe.length;D++){let se=Pe[D],te=null;if(f!==null)te=f.getViewport(se);else{let K=h.getViewSubImage(d,se);te=K.viewport,D===0&&(e.setRenderTargetTextures(v,K.colorTexture,K.depthStencilTexture),e.setRenderTarget(v))}let Q=L[D];Q===void 0&&(Q=new nn,Q.layers.enable(D),Q.viewport=new pt,L[D]=Q),Q.matrix.fromArray(se.transform.matrix),Q.matrix.decompose(Q.position,Q.quaternion,Q.scale),Q.projectionMatrix.fromArray(se.projectionMatrix),Q.projectionMatrixInverse.copy(Q.projectionMatrix).invert(),Q.viewport.set(te.x,te.y,te.width,te.height),D===0&&(B.matrix.copy(Q.matrix),B.matrix.decompose(B.position,B.quaternion,B.scale)),Ne===!0&&B.cameras.push(Q)}let Fe=r.enabledFeatures;if(Fe&&Fe.includes("depth-sensing")&&r.depthUsage=="gpu-optimized"&&x){h=i.getBinding();let D=h.getDepthInformation(Pe[0]);D&&D.isValid&&D.texture&&g.init(D,r.renderState)}if(Fe&&Fe.includes("camera-access")&&x){e.state.unbindTexture(),h=i.getBinding();for(let D=0;D<Pe.length;D++){let se=Pe[D].camera;if(se){let te=p[se];te||(te=new Wo,p[se]=te);let Q=h.getCameraImage(se);te.sourceTexture=Q}}}}for(let Pe=0;Pe<A.length;Pe++){let Ne=R[Pe],Fe=A[Pe];Ne!==null&&Fe!==void 0&&Fe.update(Ne,re,c||o)}at&&at(j,re),re.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:re}),m=null}let ct=new wp;ct.setAnimationLoop(lt),this.setAnimationLoop=function(j){at=j},this.dispose=function(){}}},Yr=new Gn,Z_=new ot;function J_(n,e){function t(g,p){g.matrixAutoUpdate===!0&&g.updateMatrix(),p.value.copy(g.matrix)}function i(g,p){p.color.getRGB(g.fogColor.value,dh(n)),p.isFog?(g.fogNear.value=p.near,g.fogFar.value=p.far):p.isFogExp2&&(g.fogDensity.value=p.density)}function r(g,p,w,b,v){p.isMeshBasicMaterial||p.isMeshLambertMaterial?s(g,p):p.isMeshToonMaterial?(s(g,p),h(g,p)):p.isMeshPhongMaterial?(s(g,p),u(g,p)):p.isMeshStandardMaterial?(s(g,p),d(g,p),p.isMeshPhysicalMaterial&&f(g,p,v)):p.isMeshMatcapMaterial?(s(g,p),m(g,p)):p.isMeshDepthMaterial?s(g,p):p.isMeshDistanceMaterial?(s(g,p),x(g,p)):p.isMeshNormalMaterial?s(g,p):p.isLineBasicMaterial?(o(g,p),p.isLineDashedMaterial&&a(g,p)):p.isPointsMaterial?l(g,p,w,b):p.isSpriteMaterial?c(g,p):p.isShadowMaterial?(g.color.value.copy(p.color),g.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function s(g,p){g.opacity.value=p.opacity,p.color&&g.diffuse.value.copy(p.color),p.emissive&&g.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(g.map.value=p.map,t(p.map,g.mapTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,t(p.alphaMap,g.alphaMapTransform)),p.bumpMap&&(g.bumpMap.value=p.bumpMap,t(p.bumpMap,g.bumpMapTransform),g.bumpScale.value=p.bumpScale,p.side===mn&&(g.bumpScale.value*=-1)),p.normalMap&&(g.normalMap.value=p.normalMap,t(p.normalMap,g.normalMapTransform),g.normalScale.value.copy(p.normalScale),p.side===mn&&g.normalScale.value.negate()),p.displacementMap&&(g.displacementMap.value=p.displacementMap,t(p.displacementMap,g.displacementMapTransform),g.displacementScale.value=p.displacementScale,g.displacementBias.value=p.displacementBias),p.emissiveMap&&(g.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,g.emissiveMapTransform)),p.specularMap&&(g.specularMap.value=p.specularMap,t(p.specularMap,g.specularMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest);let w=e.get(p),b=w.envMap,v=w.envMapRotation;b&&(g.envMap.value=b,Yr.copy(v),Yr.x*=-1,Yr.y*=-1,Yr.z*=-1,b.isCubeTexture&&b.isRenderTargetTexture===!1&&(Yr.y*=-1,Yr.z*=-1),g.envMapRotation.value.setFromMatrix4(Z_.makeRotationFromEuler(Yr)),g.flipEnvMap.value=b.isCubeTexture&&b.isRenderTargetTexture===!1?-1:1,g.reflectivity.value=p.reflectivity,g.ior.value=p.ior,g.refractionRatio.value=p.refractionRatio),p.lightMap&&(g.lightMap.value=p.lightMap,g.lightMapIntensity.value=p.lightMapIntensity,t(p.lightMap,g.lightMapTransform)),p.aoMap&&(g.aoMap.value=p.aoMap,g.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,g.aoMapTransform))}function o(g,p){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,p.map&&(g.map.value=p.map,t(p.map,g.mapTransform))}function a(g,p){g.dashSize.value=p.dashSize,g.totalSize.value=p.dashSize+p.gapSize,g.scale.value=p.scale}function l(g,p,w,b){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,g.size.value=p.size*w,g.scale.value=b*.5,p.map&&(g.map.value=p.map,t(p.map,g.uvTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,t(p.alphaMap,g.alphaMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest)}function c(g,p){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,g.rotation.value=p.rotation,p.map&&(g.map.value=p.map,t(p.map,g.mapTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,t(p.alphaMap,g.alphaMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest)}function u(g,p){g.specular.value.copy(p.specular),g.shininess.value=Math.max(p.shininess,1e-4)}function h(g,p){p.gradientMap&&(g.gradientMap.value=p.gradientMap)}function d(g,p){g.metalness.value=p.metalness,p.metalnessMap&&(g.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,g.metalnessMapTransform)),g.roughness.value=p.roughness,p.roughnessMap&&(g.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,g.roughnessMapTransform)),p.envMap&&(g.envMapIntensity.value=p.envMapIntensity)}function f(g,p,w){g.ior.value=p.ior,p.sheen>0&&(g.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),g.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(g.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,g.sheenColorMapTransform)),p.sheenRoughnessMap&&(g.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,g.sheenRoughnessMapTransform))),p.clearcoat>0&&(g.clearcoat.value=p.clearcoat,g.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(g.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,g.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(g.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===mn&&g.clearcoatNormalScale.value.negate())),p.dispersion>0&&(g.dispersion.value=p.dispersion),p.iridescence>0&&(g.iridescence.value=p.iridescence,g.iridescenceIOR.value=p.iridescenceIOR,g.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(g.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,g.iridescenceMapTransform)),p.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),p.transmission>0&&(g.transmission.value=p.transmission,g.transmissionSamplerMap.value=w.texture,g.transmissionSamplerSize.value.set(w.width,w.height),p.transmissionMap&&(g.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,g.transmissionMapTransform)),g.thickness.value=p.thickness,p.thicknessMap&&(g.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=p.attenuationDistance,g.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(g.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(g.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=p.specularIntensity,g.specularColor.value.copy(p.specularColor),p.specularColorMap&&(g.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,g.specularColorMapTransform)),p.specularIntensityMap&&(g.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,g.specularIntensityMapTransform))}function m(g,p){p.matcap&&(g.matcap.value=p.matcap)}function x(g,p){let w=e.get(p).light;g.referencePosition.value.setFromMatrixPosition(w.matrixWorld),g.nearDistance.value=w.shadow.camera.near,g.farDistance.value=w.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:r}}function K_(n,e,t,i){let r={},s={},o=[],a=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function l(w,b){let v=b.program;i.uniformBlockBinding(w,v)}function c(w,b){let v=r[w.id];v===void 0&&(m(w),v=u(w),r[w.id]=v,w.addEventListener("dispose",g));let A=b.program;i.updateUBOMapping(w,A);let R=e.render.frame;s[w.id]!==R&&(d(w),s[w.id]=R)}function u(w){let b=h();w.__bindingPointIndex=b;let v=n.createBuffer(),A=w.__size,R=w.usage;return n.bindBuffer(n.UNIFORM_BUFFER,v),n.bufferData(n.UNIFORM_BUFFER,A,R),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,b,v),v}function h(){for(let w=0;w<a;w++)if(o.indexOf(w)===-1)return o.push(w),w;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(w){let b=r[w.id],v=w.uniforms,A=w.__cache;n.bindBuffer(n.UNIFORM_BUFFER,b);for(let R=0,I=v.length;R<I;R++){let U=Array.isArray(v[R])?v[R]:[v[R]];for(let M=0,S=U.length;M<S;M++){let L=U[M];if(f(L,R,M,A)===!0){let B=L.__offset,H=Array.isArray(L.value)?L.value:[L.value],Z=0;for(let X=0;X<H.length;X++){let J=H[X],le=x(J);typeof J=="number"||typeof J=="boolean"?(L.__data[0]=J,n.bufferSubData(n.UNIFORM_BUFFER,B+Z,L.__data)):J.isMatrix3?(L.__data[0]=J.elements[0],L.__data[1]=J.elements[1],L.__data[2]=J.elements[2],L.__data[3]=0,L.__data[4]=J.elements[3],L.__data[5]=J.elements[4],L.__data[6]=J.elements[5],L.__data[7]=0,L.__data[8]=J.elements[6],L.__data[9]=J.elements[7],L.__data[10]=J.elements[8],L.__data[11]=0):(J.toArray(L.__data,Z),Z+=le.storage/Float32Array.BYTES_PER_ELEMENT)}n.bufferSubData(n.UNIFORM_BUFFER,B,L.__data)}}}n.bindBuffer(n.UNIFORM_BUFFER,null)}function f(w,b,v,A){let R=w.value,I=b+"_"+v;if(A[I]===void 0)return typeof R=="number"||typeof R=="boolean"?A[I]=R:A[I]=R.clone(),!0;{let U=A[I];if(typeof R=="number"||typeof R=="boolean"){if(U!==R)return A[I]=R,!0}else if(U.equals(R)===!1)return U.copy(R),!0}return!1}function m(w){let b=w.uniforms,v=0,A=16;for(let I=0,U=b.length;I<U;I++){let M=Array.isArray(b[I])?b[I]:[b[I]];for(let S=0,L=M.length;S<L;S++){let B=M[S],H=Array.isArray(B.value)?B.value:[B.value];for(let Z=0,X=H.length;Z<X;Z++){let J=H[Z],le=x(J),$=v%A,_e=$%le.boundary,we=$+_e;v+=_e,we!==0&&A-we<le.storage&&(v+=A-we),B.__data=new Float32Array(le.storage/Float32Array.BYTES_PER_ELEMENT),B.__offset=v,v+=le.storage}}}let R=v%A;return R>0&&(v+=A-R),w.__size=v,w.__cache={},this}function x(w){let b={boundary:0,storage:0};return typeof w=="number"||typeof w=="boolean"?(b.boundary=4,b.storage=4):w.isVector2?(b.boundary=8,b.storage=8):w.isVector3||w.isColor?(b.boundary=16,b.storage=12):w.isVector4?(b.boundary=16,b.storage=16):w.isMatrix3?(b.boundary=48,b.storage=48):w.isMatrix4?(b.boundary=64,b.storage=64):w.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",w),b}function g(w){let b=w.target;b.removeEventListener("dispose",g);let v=o.indexOf(b.__bindingPointIndex);o.splice(v,1),n.deleteBuffer(r[b.id]),delete r[b.id],delete s[b.id]}function p(){for(let w in r)n.deleteBuffer(r[w]);o=[],r={},s={}}return{bind:l,update:c,dispose:p}}var Pc=class{constructor(e={}){let{canvas:t=$f(),context:i=null,depth:r=!0,stencil:s=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:h=!1,reversedDepthBuffer:d=!1}=e;this.isWebGLRenderer=!0;let f;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");f=i.getContextAttributes().alpha}else f=o;let m=new Uint32Array(4),x=new Int32Array(4),g=null,p=null,w=[],b=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=ai,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let v=this,A=!1;this._outputColorSpace=pn;let R=0,I=0,U=null,M=-1,S=null,L=new pt,B=new pt,H=null,Z=new tt(0),X=0,J=t.width,le=t.height,$=1,_e=null,we=null,Le=new pt(0,0,J,le),je=new pt(0,0,J,le),at=!1,lt=new Ls,ct=!1,j=!1,re=new ot,Pe=new P,Ne=new pt,Fe={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},nt=!1;function vt(){return U===null?$:1}let D=i;function se(E,O){return t.getContext(E,O)}try{let E={alpha:!0,depth:r,stencil:s,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:h};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${"180"}`),t.addEventListener("webglcontextlost",ge,!1),t.addEventListener("webglcontextrestored",Ie,!1),t.addEventListener("webglcontextcreationerror",fe,!1),D===null){let O="webgl2";if(D=se(O,E),D===null)throw se(O)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(E){throw console.error("THREE.WebGLRenderer: "+E.message),E}let te,Q,K,be,ce,ye,Ye,qe,T,_,z,W,ie,q,De,me,Ue,Re,ue,Te,Ge,Oe,ve,Ze;function F(){te=new my(D),te.init(),Oe=new $_(D,te),Q=new ly(D,te,e,Oe),K=new W_(D,te),Q.reversedDepthBuffer&&d&&K.buffers.depth.setReversed(!0),be=new vy(D),ce=new P_,ye=new X_(D,te,K,ce,Q,Oe,be),Ye=new uy(v),qe=new py(v),T=new E0(D),ve=new oy(D,T),_=new gy(D,T,be,ve),z=new _y(D,_,T,be),ue=new yy(D,Q,ye),me=new cy(ce),W=new I_(v,Ye,qe,te,Q,ve,me),ie=new J_(v,ce),q=new L_,De=new B_(te),Re=new sy(v,Ye,qe,K,z,f,l),Ue=new V_(v,z,Q),Ze=new K_(D,be,Q,K),Te=new ay(D,te,be),Ge=new xy(D,te,be),be.programs=W.programs,v.capabilities=Q,v.extensions=te,v.properties=ce,v.renderLists=q,v.shadowMap=Ue,v.state=K,v.info=be}F();let de=new Ih(v,D);this.xr=de,this.getContext=function(){return D},this.getContextAttributes=function(){return D.getContextAttributes()},this.forceContextLoss=function(){let E=te.get("WEBGL_lose_context");E&&E.loseContext()},this.forceContextRestore=function(){let E=te.get("WEBGL_lose_context");E&&E.restoreContext()},this.getPixelRatio=function(){return $},this.setPixelRatio=function(E){E!==void 0&&($=E,this.setSize(J,le,!1))},this.getSize=function(E){return E.set(J,le)},this.setSize=function(E,O,V=!0){if(de.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}J=E,le=O,t.width=Math.floor(E*$),t.height=Math.floor(O*$),V===!0&&(t.style.width=E+"px",t.style.height=O+"px"),this.setViewport(0,0,E,O)},this.getDrawingBufferSize=function(E){return E.set(J*$,le*$).floor()},this.setDrawingBufferSize=function(E,O,V){J=E,le=O,$=V,t.width=Math.floor(E*V),t.height=Math.floor(O*V),this.setViewport(0,0,E,O)},this.getCurrentViewport=function(E){return E.copy(L)},this.getViewport=function(E){return E.copy(Le)},this.setViewport=function(E,O,V,G){E.isVector4?Le.set(E.x,E.y,E.z,E.w):Le.set(E,O,V,G),K.viewport(L.copy(Le).multiplyScalar($).round())},this.getScissor=function(E){return E.copy(je)},this.setScissor=function(E,O,V,G){E.isVector4?je.set(E.x,E.y,E.z,E.w):je.set(E,O,V,G),K.scissor(B.copy(je).multiplyScalar($).round())},this.getScissorTest=function(){return at},this.setScissorTest=function(E){K.setScissorTest(at=E)},this.setOpaqueSort=function(E){_e=E},this.setTransparentSort=function(E){we=E},this.getClearColor=function(E){return E.copy(Re.getClearColor())},this.setClearColor=function(){Re.setClearColor(...arguments)},this.getClearAlpha=function(){return Re.getClearAlpha()},this.setClearAlpha=function(){Re.setClearAlpha(...arguments)},this.clear=function(E=!0,O=!0,V=!0){let G=0;if(E){let y=!1;if(U!==null){let N=U.texture.format;y=N===Jl||N===Zl||N===Yl}if(y){let N=U.texture.type,k=N===li||N===ur||N===ks||N===Vs||N===Xl||N===$l,he=Re.getClearColor(),Se=Re.getClearAlpha(),ke=he.r,pe=he.g,Be=he.b;k?(m[0]=ke,m[1]=pe,m[2]=Be,m[3]=Se,D.clearBufferuiv(D.COLOR,0,m)):(x[0]=ke,x[1]=pe,x[2]=Be,x[3]=Se,D.clearBufferiv(D.COLOR,0,x))}else G|=D.COLOR_BUFFER_BIT}O&&(G|=D.DEPTH_BUFFER_BIT),V&&(G|=D.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),D.clear(G)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",ge,!1),t.removeEventListener("webglcontextrestored",Ie,!1),t.removeEventListener("webglcontextcreationerror",fe,!1),Re.dispose(),q.dispose(),De.dispose(),ce.dispose(),Ye.dispose(),qe.dispose(),z.dispose(),ve.dispose(),Ze.dispose(),W.dispose(),de.dispose(),de.removeEventListener("sessionstart",Rn),de.removeEventListener("sessionend",is),On.stop()};function ge(E){E.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),A=!0}function Ie(){console.log("THREE.WebGLRenderer: Context Restored."),A=!1;let E=be.autoReset,O=Ue.enabled,V=Ue.autoUpdate,G=Ue.needsUpdate,y=Ue.type;F(),be.autoReset=E,Ue.enabled=O,Ue.autoUpdate=V,Ue.needsUpdate=G,Ue.type=y}function fe(E){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",E.statusMessage)}function ne(E){let O=E.target;O.removeEventListener("dispose",ne),ze(O)}function ze(E){Qe(E),ce.remove(E)}function Qe(E){let O=ce.get(E).programs;O!==void 0&&(O.forEach(function(V){W.releaseProgram(V)}),E.isShaderMaterial&&W.releaseShaderCache(E))}this.renderBufferDirect=function(E,O,V,G,y,N){O===null&&(O=Fe);let k=y.isMesh&&y.matrixWorld.determinant()<0,he=vr(E,O,V,G,y);K.setMaterial(G,k);let Se=V.index,ke=1;if(G.wireframe===!0){if(Se=_.getWireframeAttribute(V),Se===void 0)return;ke=2}let pe=V.drawRange,Be=V.attributes.position,Ve=pe.start*ke,et=(pe.start+pe.count)*ke;N!==null&&(Ve=Math.max(Ve,N.start*ke),et=Math.min(et,(N.start+N.count)*ke)),Se!==null?(Ve=Math.max(Ve,0),et=Math.min(et,Se.count)):Be!=null&&(Ve=Math.max(Ve,0),et=Math.min(et,Be.count));let Me=et-Ve;if(Me<0||Me===1/0)return;ve.setup(y,G,he,V,Se);let xe,Je=Te;if(Se!==null&&(xe=T.get(Se),Je=Ge,Je.setIndex(xe)),y.isMesh)G.wireframe===!0?(K.setLineWidth(G.wireframeLinewidth*vt()),Je.setMode(D.LINES)):Je.setMode(D.TRIANGLES);else if(y.isLine){let He=G.linewidth;He===void 0&&(He=1),K.setLineWidth(He*vt()),y.isLineSegments?Je.setMode(D.LINES):y.isLineLoop?Je.setMode(D.LINE_LOOP):Je.setMode(D.LINE_STRIP)}else y.isPoints?Je.setMode(D.POINTS):y.isSprite&&Je.setMode(D.TRIANGLES);if(y.isBatchedMesh)if(y._multiDrawInstances!==null)Ts("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),Je.renderMultiDrawInstances(y._multiDrawStarts,y._multiDrawCounts,y._multiDrawCount,y._multiDrawInstances);else if(te.get("WEBGL_multi_draw"))Je.renderMultiDraw(y._multiDrawStarts,y._multiDrawCounts,y._multiDrawCount);else{let He=y._multiDrawStarts,We=y._multiDrawCounts,Ke=y._multiDrawCount,xt=Se?T.get(Se).bytesPerElement:1,Cn=ce.get(G).currentProgram.getUniforms();for(let kt=0;kt<Ke;kt++)Cn.setValue(D,"_gl_DrawID",kt),Je.render(He[kt]/xt,We[kt])}else if(y.isInstancedMesh)Je.renderInstances(Ve,Me,y.count);else if(V.isInstancedBufferGeometry){let He=V._maxInstanceCount!==void 0?V._maxInstanceCount:1/0,We=Math.min(V.instanceCount,He);Je.renderInstances(Ve,Me,We)}else Je.render(Ve,Me)};function bt(E,O,V){E.transparent===!0&&E.side===Xn&&E.forceSinglePass===!1?(E.side=mn,E.needsUpdate=!0,xn(E,O,V),E.side=Vn,E.needsUpdate=!0,xn(E,O,V),E.side=Xn):xn(E,O,V)}this.compile=function(E,O,V=null){V===null&&(V=E),p=De.get(V),p.init(O),b.push(p),V.traverseVisible(function(y){y.isLight&&y.layers.test(O.layers)&&(p.pushLight(y),y.castShadow&&p.pushShadow(y))}),E!==V&&E.traverseVisible(function(y){y.isLight&&y.layers.test(O.layers)&&(p.pushLight(y),y.castShadow&&p.pushShadow(y))}),p.setupLights();let G=new Set;return E.traverse(function(y){if(!(y.isMesh||y.isPoints||y.isLine||y.isSprite))return;let N=y.material;if(N)if(Array.isArray(N))for(let k=0;k<N.length;k++){let he=N[k];bt(he,V,y),G.add(he)}else bt(N,V,y),G.add(N)}),p=b.pop(),G},this.compileAsync=function(E,O,V=null){let G=this.compile(E,O,V);return new Promise(y=>{function N(){if(G.forEach(function(k){ce.get(k).currentProgram.isReady()&&G.delete(k)}),G.size===0){y(E);return}setTimeout(N,10)}te.get("KHR_parallel_shader_compile")!==null?N():setTimeout(N,10)})};let ft=null;function gn(E){ft&&ft(E)}function Rn(){On.stop()}function is(){On.start()}let On=new wp;On.setAnimationLoop(gn),typeof self<"u"&&On.setContext(self),this.setAnimationLoop=function(E){ft=E,de.setAnimationLoop(E),E===null?On.stop():On.start()},de.addEventListener("sessionstart",Rn),de.addEventListener("sessionend",is),this.render=function(E,O){if(O!==void 0&&O.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(A===!0)return;if(E.matrixWorldAutoUpdate===!0&&E.updateMatrixWorld(),O.parent===null&&O.matrixWorldAutoUpdate===!0&&O.updateMatrixWorld(),de.enabled===!0&&de.isPresenting===!0&&(de.cameraAutoUpdate===!0&&de.updateCamera(O),O=de.getCamera()),E.isScene===!0&&E.onBeforeRender(v,E,O,U),p=De.get(E,b.length),p.init(O),b.push(p),re.multiplyMatrices(O.projectionMatrix,O.matrixWorldInverse),lt.setFromProjectionMatrix(re,ni,O.reversedDepth),j=this.localClippingEnabled,ct=me.init(this.clippingPlanes,j),g=q.get(E,w.length),g.init(),w.push(g),de.enabled===!0&&de.isPresenting===!0){let N=v.xr.getDepthSensingMesh();N!==null&&Yi(N,O,-1/0,v.sortObjects)}Yi(E,O,0,v.sortObjects),g.finish(),v.sortObjects===!0&&g.sort(_e,we),nt=de.enabled===!1||de.isPresenting===!1||de.hasDepthSensing()===!1,nt&&Re.addToRenderList(g,E),this.info.render.frame++,ct===!0&&me.beginShadows();let V=p.state.shadowsArray;Ue.render(V,E,O),ct===!0&&me.endShadows(),this.info.autoReset===!0&&this.info.reset();let G=g.opaque,y=g.transmissive;if(p.setupLights(),O.isArrayCamera){let N=O.cameras;if(y.length>0)for(let k=0,he=N.length;k<he;k++){let Se=N[k];Zi(G,y,E,Se)}nt&&Re.render(E);for(let k=0,he=N.length;k<he;k++){let Se=N[k];rs(g,E,Se,Se.viewport)}}else y.length>0&&Zi(G,y,E,O),nt&&Re.render(E),rs(g,E,O);U!==null&&I===0&&(ye.updateMultisampleRenderTarget(U),ye.updateRenderTargetMipmap(U)),E.isScene===!0&&E.onAfterRender(v,E,O),ve.resetDefaultState(),M=-1,S=null,b.pop(),b.length>0?(p=b[b.length-1],ct===!0&&me.setGlobalState(v.clippingPlanes,p.state.camera)):p=null,w.pop(),w.length>0?g=w[w.length-1]:g=null};function Yi(E,O,V,G){if(E.visible===!1)return;if(E.layers.test(O.layers)){if(E.isGroup)V=E.renderOrder;else if(E.isLOD)E.autoUpdate===!0&&E.update(O);else if(E.isLight)p.pushLight(E),E.castShadow&&p.pushShadow(E);else if(E.isSprite){if(!E.frustumCulled||lt.intersectsSprite(E)){G&&Ne.setFromMatrixPosition(E.matrixWorld).applyMatrix4(re);let k=z.update(E),he=E.material;he.visible&&g.push(E,k,he,V,Ne.z,null)}}else if((E.isMesh||E.isLine||E.isPoints)&&(!E.frustumCulled||lt.intersectsObject(E))){let k=z.update(E),he=E.material;if(G&&(E.boundingSphere!==void 0?(E.boundingSphere===null&&E.computeBoundingSphere(),Ne.copy(E.boundingSphere.center)):(k.boundingSphere===null&&k.computeBoundingSphere(),Ne.copy(k.boundingSphere.center)),Ne.applyMatrix4(E.matrixWorld).applyMatrix4(re)),Array.isArray(he)){let Se=k.groups;for(let ke=0,pe=Se.length;ke<pe;ke++){let Be=Se[ke],Ve=he[Be.materialIndex];Ve&&Ve.visible&&g.push(E,k,Ve,V,Ne.z,Be)}}else he.visible&&g.push(E,k,he,V,Ne.z,null)}}let N=E.children;for(let k=0,he=N.length;k<he;k++)Yi(N[k],O,V,G)}function rs(E,O,V,G){let y=E.opaque,N=E.transmissive,k=E.transparent;p.setupLightsView(V),ct===!0&&me.setGlobalState(v.clippingPlanes,V),G&&K.viewport(L.copy(G)),y.length>0&&Ai(y,O,V),N.length>0&&Ai(N,O,V),k.length>0&&Ai(k,O,V),K.buffers.depth.setTest(!0),K.buffers.depth.setMask(!0),K.buffers.color.setMask(!0),K.setPolygonOffset(!1)}function Zi(E,O,V,G){if((V.isScene===!0?V.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[G.id]===void 0&&(p.state.transmissionRenderTarget[G.id]=new Mi(1,1,{generateMipmaps:!0,type:te.has("EXT_color_buffer_half_float")||te.has("EXT_color_buffer_float")?Hs:li,minFilter:cr,samples:4,stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:dt.workingColorSpace}));let N=p.state.transmissionRenderTarget[G.id],k=G.viewport||L;N.setSize(k.z*v.transmissionResolutionScale,k.w*v.transmissionResolutionScale);let he=v.getRenderTarget(),Se=v.getActiveCubeFace(),ke=v.getActiveMipmapLevel();v.setRenderTarget(N),v.getClearColor(Z),X=v.getClearAlpha(),X<1&&v.setClearColor(16777215,.5),v.clear(),nt&&Re.render(V);let pe=v.toneMapping;v.toneMapping=ai;let Be=G.viewport;if(G.viewport!==void 0&&(G.viewport=void 0),p.setupLightsView(G),ct===!0&&me.setGlobalState(v.clippingPlanes,G),Ai(E,V,G),ye.updateMultisampleRenderTarget(N),ye.updateRenderTargetMipmap(N),te.has("WEBGL_multisampled_render_to_texture")===!1){let Ve=!1;for(let et=0,Me=O.length;et<Me;et++){let xe=O[et],Je=xe.object,He=xe.geometry,We=xe.material,Ke=xe.group;if(We.side===Xn&&Je.layers.test(G.layers)){let xt=We.side;We.side=mn,We.needsUpdate=!0,Pt(Je,V,G,He,We,Ke),We.side=xt,We.needsUpdate=!0,Ve=!0}}Ve===!0&&(ye.updateMultisampleRenderTarget(N),ye.updateRenderTargetMipmap(N))}v.setRenderTarget(he,Se,ke),v.setClearColor(Z,X),Be!==void 0&&(G.viewport=Be),v.toneMapping=pe}function Ai(E,O,V){let G=O.isScene===!0?O.overrideMaterial:null;for(let y=0,N=E.length;y<N;y++){let k=E[y],he=k.object,Se=k.geometry,ke=k.group,pe=k.material;pe.allowOverride===!0&&G!==null&&(pe=G),he.layers.test(V.layers)&&Pt(he,O,V,Se,pe,ke)}}function Pt(E,O,V,G,y,N){E.onBeforeRender(v,O,V,G,y,N),E.modelViewMatrix.multiplyMatrices(V.matrixWorldInverse,E.matrixWorld),E.normalMatrix.getNormalMatrix(E.modelViewMatrix),y.onBeforeRender(v,O,V,G,E,N),y.transparent===!0&&y.side===Xn&&y.forceSinglePass===!1?(y.side=mn,y.needsUpdate=!0,v.renderBufferDirect(V,O,G,y,E,N),y.side=Vn,y.needsUpdate=!0,v.renderBufferDirect(V,O,G,y,E,N),y.side=Xn):v.renderBufferDirect(V,O,G,y,E,N),E.onAfterRender(v,O,V,G,y,N)}function xn(E,O,V){O.isScene!==!0&&(O=Fe);let G=ce.get(E),y=p.state.lights,N=p.state.shadowsArray,k=y.state.version,he=W.getParameters(E,y.state,N,O,V),Se=W.getProgramCacheKey(he),ke=G.programs;G.environment=E.isMeshStandardMaterial?O.environment:null,G.fog=O.fog,G.envMap=(E.isMeshStandardMaterial?qe:Ye).get(E.envMap||G.environment),G.envMapRotation=G.environment!==null&&E.envMap===null?O.environmentRotation:E.envMapRotation,ke===void 0&&(E.addEventListener("dispose",ne),ke=new Map,G.programs=ke);let pe=ke.get(Se);if(pe!==void 0){if(G.currentProgram===pe&&G.lightsStateVersion===k)return Aa(E,he),pe}else he.uniforms=W.getUniforms(E),E.onBeforeCompile(he,v),pe=W.acquireProgram(he,Se),ke.set(Se,pe),G.uniforms=he.uniforms;let Be=G.uniforms;return(!E.isShaderMaterial&&!E.isRawShaderMaterial||E.clipping===!0)&&(Be.clippingPlanes=me.uniform),Aa(E,he),G.needsLights=no(E),G.lightsStateVersion=k,G.needsLights&&(Be.ambientLightColor.value=y.state.ambient,Be.lightProbe.value=y.state.probe,Be.directionalLights.value=y.state.directional,Be.directionalLightShadows.value=y.state.directionalShadow,Be.spotLights.value=y.state.spot,Be.spotLightShadows.value=y.state.spotShadow,Be.rectAreaLights.value=y.state.rectArea,Be.ltc_1.value=y.state.rectAreaLTC1,Be.ltc_2.value=y.state.rectAreaLTC2,Be.pointLights.value=y.state.point,Be.pointLightShadows.value=y.state.pointShadow,Be.hemisphereLights.value=y.state.hemi,Be.directionalShadowMap.value=y.state.directionalShadowMap,Be.directionalShadowMatrix.value=y.state.directionalShadowMatrix,Be.spotShadowMap.value=y.state.spotShadowMap,Be.spotLightMatrix.value=y.state.spotLightMatrix,Be.spotLightMap.value=y.state.spotLightMap,Be.pointShadowMap.value=y.state.pointShadowMap,Be.pointShadowMatrix.value=y.state.pointShadowMatrix),G.currentProgram=pe,G.uniformsList=null,pe}function xr(E){if(E.uniformsList===null){let O=E.currentProgram.getUniforms();E.uniformsList=$s.seqWithValue(O.seq,E.uniforms)}return E.uniformsList}function Aa(E,O){let V=ce.get(E);V.outputColorSpace=O.outputColorSpace,V.batching=O.batching,V.batchingColor=O.batchingColor,V.instancing=O.instancing,V.instancingColor=O.instancingColor,V.instancingMorph=O.instancingMorph,V.skinning=O.skinning,V.morphTargets=O.morphTargets,V.morphNormals=O.morphNormals,V.morphColors=O.morphColors,V.morphTargetsCount=O.morphTargetsCount,V.numClippingPlanes=O.numClippingPlanes,V.numIntersection=O.numClipIntersection,V.vertexAlphas=O.vertexAlphas,V.vertexTangents=O.vertexTangents,V.toneMapping=O.toneMapping}function vr(E,O,V,G,y){O.isScene!==!0&&(O=Fe),ye.resetTextureUnits();let N=O.fog,k=G.isMeshStandardMaterial?O.environment:null,he=U===null?v.outputColorSpace:U.isXRRenderTarget===!0?U.texture.colorSpace:Ur,Se=(G.isMeshStandardMaterial?qe:Ye).get(G.envMap||k),ke=G.vertexColors===!0&&!!V.attributes.color&&V.attributes.color.itemSize===4,pe=!!V.attributes.tangent&&(!!G.normalMap||G.anisotropy>0),Be=!!V.morphAttributes.position,Ve=!!V.morphAttributes.normal,et=!!V.morphAttributes.color,Me=ai;G.toneMapped&&(U===null||U.isXRRenderTarget===!0)&&(Me=v.toneMapping);let xe=V.morphAttributes.position||V.morphAttributes.normal||V.morphAttributes.color,Je=xe!==void 0?xe.length:0,He=ce.get(G),We=p.state.lights;if(ct===!0&&(j===!0||E!==S)){let Yt=E===S&&G.id===M;me.setState(G,E,Yt)}let Ke=!1;G.version===He.__version?(He.needsLights&&He.lightsStateVersion!==We.state.version||He.outputColorSpace!==he||y.isBatchedMesh&&He.batching===!1||!y.isBatchedMesh&&He.batching===!0||y.isBatchedMesh&&He.batchingColor===!0&&y.colorTexture===null||y.isBatchedMesh&&He.batchingColor===!1&&y.colorTexture!==null||y.isInstancedMesh&&He.instancing===!1||!y.isInstancedMesh&&He.instancing===!0||y.isSkinnedMesh&&He.skinning===!1||!y.isSkinnedMesh&&He.skinning===!0||y.isInstancedMesh&&He.instancingColor===!0&&y.instanceColor===null||y.isInstancedMesh&&He.instancingColor===!1&&y.instanceColor!==null||y.isInstancedMesh&&He.instancingMorph===!0&&y.morphTexture===null||y.isInstancedMesh&&He.instancingMorph===!1&&y.morphTexture!==null||He.envMap!==Se||G.fog===!0&&He.fog!==N||He.numClippingPlanes!==void 0&&(He.numClippingPlanes!==me.numPlanes||He.numIntersection!==me.numIntersection)||He.vertexAlphas!==ke||He.vertexTangents!==pe||He.morphTargets!==Be||He.morphNormals!==Ve||He.morphColors!==et||He.toneMapping!==Me||He.morphTargetsCount!==Je)&&(Ke=!0):(Ke=!0,He.__version=G.version);let xt=He.currentProgram;Ke===!0&&(xt=xn(G,O,y));let Cn=!1,kt=!1,jn=!1,St=xt.getUniforms(),sn=He.uniforms;if(K.useProgram(xt.program)&&(Cn=!0,kt=!0,jn=!0),G.id!==M&&(M=G.id,kt=!0),Cn||S!==E){K.buffers.depth.getReversed()&&E.reversedDepth!==!0&&(E._reversedDepth=!0,E.updateProjectionMatrix()),St.setValue(D,"projectionMatrix",E.projectionMatrix),St.setValue(D,"viewMatrix",E.matrixWorldInverse);let tn=St.map.cameraPosition;tn!==void 0&&tn.setValue(D,Pe.setFromMatrixPosition(E.matrixWorld)),Q.logarithmicDepthBuffer&&St.setValue(D,"logDepthBufFC",2/(Math.log(E.far+1)/Math.LN2)),(G.isMeshPhongMaterial||G.isMeshToonMaterial||G.isMeshLambertMaterial||G.isMeshBasicMaterial||G.isMeshStandardMaterial||G.isShaderMaterial)&&St.setValue(D,"isOrthographic",E.isOrthographicCamera===!0),S!==E&&(S=E,kt=!0,jn=!0)}if(y.isSkinnedMesh){St.setOptional(D,y,"bindMatrix"),St.setOptional(D,y,"bindMatrixInverse");let Yt=y.skeleton;Yt&&(Yt.boneTexture===null&&Yt.computeBoneTexture(),St.setValue(D,"boneTexture",Yt.boneTexture,ye))}y.isBatchedMesh&&(St.setOptional(D,y,"batchingTexture"),St.setValue(D,"batchingTexture",y._matricesTexture,ye),St.setOptional(D,y,"batchingIdTexture"),St.setValue(D,"batchingIdTexture",y._indirectTexture,ye),St.setOptional(D,y,"batchingColorTexture"),y._colorsTexture!==null&&St.setValue(D,"batchingColorTexture",y._colorsTexture,ye));let In=V.morphAttributes;if((In.position!==void 0||In.normal!==void 0||In.color!==void 0)&&ue.update(y,V,xt),(kt||He.receiveShadow!==y.receiveShadow)&&(He.receiveShadow=y.receiveShadow,St.setValue(D,"receiveShadow",y.receiveShadow)),G.isMeshGouraudMaterial&&G.envMap!==null&&(sn.envMap.value=Se,sn.flipEnvMap.value=Se.isCubeTexture&&Se.isRenderTargetTexture===!1?-1:1),G.isMeshStandardMaterial&&G.envMap===null&&O.environment!==null&&(sn.envMapIntensity.value=O.environmentIntensity),kt&&(St.setValue(D,"toneMappingExposure",v.toneMappingExposure),He.needsLights&&ss(sn,jn),N&&G.fog===!0&&ie.refreshFogUniforms(sn,N),ie.refreshMaterialUniforms(sn,G,$,le,p.state.transmissionRenderTarget[E.id]),$s.upload(D,xr(He),sn,ye)),G.isShaderMaterial&&G.uniformsNeedUpdate===!0&&($s.upload(D,xr(He),sn,ye),G.uniformsNeedUpdate=!1),G.isSpriteMaterial&&St.setValue(D,"center",y.center),St.setValue(D,"modelViewMatrix",y.modelViewMatrix),St.setValue(D,"normalMatrix",y.normalMatrix),St.setValue(D,"modelMatrix",y.matrixWorld),G.isShaderMaterial||G.isRawShaderMaterial){let Yt=G.uniformsGroups;for(let tn=0,Ji=Yt.length;tn<Ji;tn++){let hi=Yt[tn];Ze.update(hi,xt),Ze.bind(hi,xt)}}return xt}function ss(E,O){E.ambientLightColor.needsUpdate=O,E.lightProbe.needsUpdate=O,E.directionalLights.needsUpdate=O,E.directionalLightShadows.needsUpdate=O,E.pointLights.needsUpdate=O,E.pointLightShadows.needsUpdate=O,E.spotLights.needsUpdate=O,E.spotLightShadows.needsUpdate=O,E.rectAreaLights.needsUpdate=O,E.hemisphereLights.needsUpdate=O}function no(E){return E.isMeshLambertMaterial||E.isMeshToonMaterial||E.isMeshPhongMaterial||E.isMeshStandardMaterial||E.isShadowMaterial||E.isShaderMaterial&&E.lights===!0}this.getActiveCubeFace=function(){return R},this.getActiveMipmapLevel=function(){return I},this.getRenderTarget=function(){return U},this.setRenderTargetTextures=function(E,O,V){let G=ce.get(E);G.__autoAllocateDepthBuffer=E.resolveDepthBuffer===!1,G.__autoAllocateDepthBuffer===!1&&(G.__useRenderToTexture=!1),ce.get(E.texture).__webglTexture=O,ce.get(E.depthTexture).__webglTexture=G.__autoAllocateDepthBuffer?void 0:V,G.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(E,O){let V=ce.get(E);V.__webglFramebuffer=O,V.__useDefaultFramebuffer=O===void 0};let Jc=D.createFramebuffer();this.setRenderTarget=function(E,O=0,V=0){U=E,R=O,I=V;let G=!0,y=null,N=!1,k=!1;if(E){let Se=ce.get(E);if(Se.__useDefaultFramebuffer!==void 0)K.bindFramebuffer(D.FRAMEBUFFER,null),G=!1;else if(Se.__webglFramebuffer===void 0)ye.setupRenderTarget(E);else if(Se.__hasExternalTextures)ye.rebindTextures(E,ce.get(E.texture).__webglTexture,ce.get(E.depthTexture).__webglTexture);else if(E.depthBuffer){let Be=E.depthTexture;if(Se.__boundDepthTexture!==Be){if(Be!==null&&ce.has(Be)&&(E.width!==Be.image.width||E.height!==Be.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");ye.setupDepthRenderbuffer(E)}}let ke=E.texture;(ke.isData3DTexture||ke.isDataArrayTexture||ke.isCompressedArrayTexture)&&(k=!0);let pe=ce.get(E).__webglFramebuffer;E.isWebGLCubeRenderTarget?(Array.isArray(pe[O])?y=pe[O][V]:y=pe[O],N=!0):E.samples>0&&ye.useMultisampledRTT(E)===!1?y=ce.get(E).__webglMultisampledFramebuffer:Array.isArray(pe)?y=pe[V]:y=pe,L.copy(E.viewport),B.copy(E.scissor),H=E.scissorTest}else L.copy(Le).multiplyScalar($).floor(),B.copy(je).multiplyScalar($).floor(),H=at;if(V!==0&&(y=Jc),K.bindFramebuffer(D.FRAMEBUFFER,y)&&G&&K.drawBuffers(E,y),K.viewport(L),K.scissor(B),K.setScissorTest(H),N){let Se=ce.get(E.texture);D.framebufferTexture2D(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_CUBE_MAP_POSITIVE_X+O,Se.__webglTexture,V)}else if(k){let Se=O;for(let ke=0;ke<E.textures.length;ke++){let pe=ce.get(E.textures[ke]);D.framebufferTextureLayer(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0+ke,pe.__webglTexture,V,Se)}}else if(E!==null&&V!==0){let Se=ce.get(E.texture);D.framebufferTexture2D(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_2D,Se.__webglTexture,V)}M=-1},this.readRenderTargetPixels=function(E,O,V,G,y,N,k,he=0){if(!(E&&E.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Se=ce.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&k!==void 0&&(Se=Se[k]),Se){K.bindFramebuffer(D.FRAMEBUFFER,Se);try{let ke=E.textures[he],pe=ke.format,Be=ke.type;if(!Q.textureFormatReadable(pe)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Q.textureTypeReadable(Be)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}O>=0&&O<=E.width-G&&V>=0&&V<=E.height-y&&(E.textures.length>1&&D.readBuffer(D.COLOR_ATTACHMENT0+he),D.readPixels(O,V,G,y,Oe.convert(pe),Oe.convert(Be),N))}finally{let ke=U!==null?ce.get(U).__webglFramebuffer:null;K.bindFramebuffer(D.FRAMEBUFFER,ke)}}},this.readRenderTargetPixelsAsync=async function(E,O,V,G,y,N,k,he=0){if(!(E&&E.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Se=ce.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&k!==void 0&&(Se=Se[k]),Se)if(O>=0&&O<=E.width-G&&V>=0&&V<=E.height-y){K.bindFramebuffer(D.FRAMEBUFFER,Se);let ke=E.textures[he],pe=ke.format,Be=ke.type;if(!Q.textureFormatReadable(pe))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Q.textureTypeReadable(Be))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let Ve=D.createBuffer();D.bindBuffer(D.PIXEL_PACK_BUFFER,Ve),D.bufferData(D.PIXEL_PACK_BUFFER,N.byteLength,D.STREAM_READ),E.textures.length>1&&D.readBuffer(D.COLOR_ATTACHMENT0+he),D.readPixels(O,V,G,y,Oe.convert(pe),Oe.convert(Be),0);let et=U!==null?ce.get(U).__webglFramebuffer:null;K.bindFramebuffer(D.FRAMEBUFFER,et);let Me=D.fenceSync(D.SYNC_GPU_COMMANDS_COMPLETE,0);return D.flush(),await qf(D,Me,4),D.bindBuffer(D.PIXEL_PACK_BUFFER,Ve),D.getBufferSubData(D.PIXEL_PACK_BUFFER,0,N),D.deleteBuffer(Ve),D.deleteSync(Me),N}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(E,O=null,V=0){let G=Math.pow(2,-V),y=Math.floor(E.image.width*G),N=Math.floor(E.image.height*G),k=O!==null?O.x:0,he=O!==null?O.y:0;ye.setTexture2D(E,0),D.copyTexSubImage2D(D.TEXTURE_2D,V,0,0,k,he,y,N),K.unbindTexture()};let Kc=D.createFramebuffer(),jc=D.createFramebuffer();this.copyTextureToTexture=function(E,O,V=null,G=null,y=0,N=null){N===null&&(y!==0?(Ts("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),N=y,y=0):N=0);let k,he,Se,ke,pe,Be,Ve,et,Me,xe=E.isCompressedTexture?E.mipmaps[N]:E.image;if(V!==null)k=V.max.x-V.min.x,he=V.max.y-V.min.y,Se=V.isBox3?V.max.z-V.min.z:1,ke=V.min.x,pe=V.min.y,Be=V.isBox3?V.min.z:0;else{let In=Math.pow(2,-y);k=Math.floor(xe.width*In),he=Math.floor(xe.height*In),E.isDataArrayTexture?Se=xe.depth:E.isData3DTexture?Se=Math.floor(xe.depth*In):Se=1,ke=0,pe=0,Be=0}G!==null?(Ve=G.x,et=G.y,Me=G.z):(Ve=0,et=0,Me=0);let Je=Oe.convert(O.format),He=Oe.convert(O.type),We;O.isData3DTexture?(ye.setTexture3D(O,0),We=D.TEXTURE_3D):O.isDataArrayTexture||O.isCompressedArrayTexture?(ye.setTexture2DArray(O,0),We=D.TEXTURE_2D_ARRAY):(ye.setTexture2D(O,0),We=D.TEXTURE_2D),D.pixelStorei(D.UNPACK_FLIP_Y_WEBGL,O.flipY),D.pixelStorei(D.UNPACK_PREMULTIPLY_ALPHA_WEBGL,O.premultiplyAlpha),D.pixelStorei(D.UNPACK_ALIGNMENT,O.unpackAlignment);let Ke=D.getParameter(D.UNPACK_ROW_LENGTH),xt=D.getParameter(D.UNPACK_IMAGE_HEIGHT),Cn=D.getParameter(D.UNPACK_SKIP_PIXELS),kt=D.getParameter(D.UNPACK_SKIP_ROWS),jn=D.getParameter(D.UNPACK_SKIP_IMAGES);D.pixelStorei(D.UNPACK_ROW_LENGTH,xe.width),D.pixelStorei(D.UNPACK_IMAGE_HEIGHT,xe.height),D.pixelStorei(D.UNPACK_SKIP_PIXELS,ke),D.pixelStorei(D.UNPACK_SKIP_ROWS,pe),D.pixelStorei(D.UNPACK_SKIP_IMAGES,Be);let St=E.isDataArrayTexture||E.isData3DTexture,sn=O.isDataArrayTexture||O.isData3DTexture;if(E.isDepthTexture){let In=ce.get(E),Yt=ce.get(O),tn=ce.get(In.__renderTarget),Ji=ce.get(Yt.__renderTarget);K.bindFramebuffer(D.READ_FRAMEBUFFER,tn.__webglFramebuffer),K.bindFramebuffer(D.DRAW_FRAMEBUFFER,Ji.__webglFramebuffer);for(let hi=0;hi<Se;hi++)St&&(D.framebufferTextureLayer(D.READ_FRAMEBUFFER,D.COLOR_ATTACHMENT0,ce.get(E).__webglTexture,y,Be+hi),D.framebufferTextureLayer(D.DRAW_FRAMEBUFFER,D.COLOR_ATTACHMENT0,ce.get(O).__webglTexture,N,Me+hi)),D.blitFramebuffer(ke,pe,k,he,Ve,et,k,he,D.DEPTH_BUFFER_BIT,D.NEAREST);K.bindFramebuffer(D.READ_FRAMEBUFFER,null),K.bindFramebuffer(D.DRAW_FRAMEBUFFER,null)}else if(y!==0||E.isRenderTargetTexture||ce.has(E)){let In=ce.get(E),Yt=ce.get(O);K.bindFramebuffer(D.READ_FRAMEBUFFER,Kc),K.bindFramebuffer(D.DRAW_FRAMEBUFFER,jc);for(let tn=0;tn<Se;tn++)St?D.framebufferTextureLayer(D.READ_FRAMEBUFFER,D.COLOR_ATTACHMENT0,In.__webglTexture,y,Be+tn):D.framebufferTexture2D(D.READ_FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_2D,In.__webglTexture,y),sn?D.framebufferTextureLayer(D.DRAW_FRAMEBUFFER,D.COLOR_ATTACHMENT0,Yt.__webglTexture,N,Me+tn):D.framebufferTexture2D(D.DRAW_FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_2D,Yt.__webglTexture,N),y!==0?D.blitFramebuffer(ke,pe,k,he,Ve,et,k,he,D.COLOR_BUFFER_BIT,D.NEAREST):sn?D.copyTexSubImage3D(We,N,Ve,et,Me+tn,ke,pe,k,he):D.copyTexSubImage2D(We,N,Ve,et,ke,pe,k,he);K.bindFramebuffer(D.READ_FRAMEBUFFER,null),K.bindFramebuffer(D.DRAW_FRAMEBUFFER,null)}else sn?E.isDataTexture||E.isData3DTexture?D.texSubImage3D(We,N,Ve,et,Me,k,he,Se,Je,He,xe.data):O.isCompressedArrayTexture?D.compressedTexSubImage3D(We,N,Ve,et,Me,k,he,Se,Je,xe.data):D.texSubImage3D(We,N,Ve,et,Me,k,he,Se,Je,He,xe):E.isDataTexture?D.texSubImage2D(D.TEXTURE_2D,N,Ve,et,k,he,Je,He,xe.data):E.isCompressedTexture?D.compressedTexSubImage2D(D.TEXTURE_2D,N,Ve,et,xe.width,xe.height,Je,xe.data):D.texSubImage2D(D.TEXTURE_2D,N,Ve,et,k,he,Je,He,xe);D.pixelStorei(D.UNPACK_ROW_LENGTH,Ke),D.pixelStorei(D.UNPACK_IMAGE_HEIGHT,xt),D.pixelStorei(D.UNPACK_SKIP_PIXELS,Cn),D.pixelStorei(D.UNPACK_SKIP_ROWS,kt),D.pixelStorei(D.UNPACK_SKIP_IMAGES,jn),N===0&&O.generateMipmaps&&D.generateMipmap(We),K.unbindTexture()},this.initRenderTarget=function(E){ce.get(E).__webglFramebuffer===void 0&&ye.setupRenderTarget(E)},this.initTexture=function(E){E.isCubeTexture?ye.setTextureCube(E,0):E.isData3DTexture?ye.setTexture3D(E,0):E.isDataArrayTexture||E.isCompressedArrayTexture?ye.setTexture2DArray(E,0):ye.setTexture2D(E,0),K.unbindTexture()},this.resetState=function(){R=0,I=0,U=null,K.reset(),ve.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return ni}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=dt._getDrawingBufferColorSpace(e),t.unpackColorSpace=dt._getUnpackColorSpace()}};function Lh(n,e=!1){let t=n[0].index!==null,i=new Set(Object.keys(n[0].attributes)),r=new Set(Object.keys(n[0].morphAttributes)),s={},o={},a=n[0].morphTargetsRelative,l=new Ft,c=0;for(let u=0;u<n.length;++u){let h=n[u],d=0;if(t!==(h.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(let f in h.attributes){if(!i.has(f))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+'. All geometries must have compatible attributes; make sure "'+f+'" attribute exists among all geometries, or in none of them.'),null;s[f]===void 0&&(s[f]=[]),s[f].push(h.attributes[f]),d++}if(d!==i.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". Make sure all geometries have the same number of attributes."),null;if(a!==h.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(let f in h.morphAttributes){if(!r.has(f))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+".  .morphAttributes must be consistent throughout all geometries."),null;o[f]===void 0&&(o[f]=[]),o[f].push(h.morphAttributes[f])}if(e){let f;if(t)f=h.index.count;else if(h.attributes.position!==void 0)f=h.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". The geometry must have either an index or a position attribute"),null;l.addGroup(c,f,u),c+=f}}if(t){let u=0,h=[];for(let d=0;d<n.length;++d){let f=n[d].index;for(let m=0;m<f.count;++m)h.push(f.getX(m)+u);u+=n[d].attributes.position.count}l.setIndex(h)}for(let u in s){let h=Pp(s[u]);if(!h)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+u+" attribute."),null;l.setAttribute(u,h)}for(let u in o){let h=o[u][0].length;if(h===0)break;l.morphAttributes=l.morphAttributes||{},l.morphAttributes[u]=[];for(let d=0;d<h;++d){let f=[];for(let x=0;x<o[u].length;++x)f.push(o[u][x][d]);let m=Pp(f);if(!m)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+u+" morphAttribute."),null;l.morphAttributes[u].push(m)}}return l}function Pp(n){let e,t,i,r=-1,s=0;for(let c=0;c<n.length;++c){let u=n[c];if(e===void 0&&(e=u.array.constructor),e!==u.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(t===void 0&&(t=u.itemSize),t!==u.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(i===void 0&&(i=u.normalized),i!==u.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(r===-1&&(r=u.gpuType),r!==u.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;s+=u.count*t}let o=new e(s),a=new Nt(o,t,i),l=0;for(let c=0;c<n.length;++c){let u=n[c];if(u.isInterleavedBufferAttribute){let h=l/t;for(let d=0,f=u.count;d<f;d++)for(let m=0;m<t;m++){let x=u.getComponent(d,m);a.setComponent(d+h,m,x)}}else o.set(u.array,l);l+=u.count*t}return r!==void 0&&(a.gpuType=r),a}var ht={water:1605517,deep:1334128,foam:13234911,cream:16773326,sand:15124888,coral:15695981,dark:2445145,wood:9989198,leaf:4099191,leafLight:7846289,brass:15120733,stone:10991790};function mt(n,e,t=.78,i={}){let r=new Br({color:e,roughness:t,metalness:0,...i});return r.name=n,r}var oe={cream:mt("warm-linen",ht.cream),sand:mt("warm-sand",ht.sand),coral:mt("coral-enamel",ht.coral),dark:mt("deep-teal-enamel",ht.dark),wood:mt("oiled-timber",ht.wood),leaf:mt("mangrove-leaf",ht.leaf),leafLight:mt("palm-leaf-tip",ht.leafLight),brass:mt("aged-brass",ht.brass,.4,{metalness:.45}),stone:mt("chalk-stone",ht.stone),rock:mt("submerged-basalt",6653318),glass:mt("sea-glass",8773329,.25,{metalness:.1})};function _t(n,e,t=0,i=0,r=0,s="mesh"){let o=new Ct(n,e);return o.position.set(t,i,r),o.name=s,o.castShadow=!0,o.receiveShadow=!0,o}var gt=(n,e,t,i,r=0,s=0,o=0,a="timber")=>_t(new si(n,e,t),i,r,s,o,a),It=(n,e,t,i,r=0,s=0,o=0,a=8,l="column")=>_t(new Wn(n,e,t,a),i,r,s,o,l),Kt=(n,e,t=0,i=0,r=0,s=0,o="stone")=>_t(new Ei(n,s),e,t,i,r,o),Fn=n=>{let e=new rn;return e.name=n,e};function hr(n,e,t,i=oe.wood,r="branch"){let s=new P().subVectors(e,n),o=It(t*.8,t,s.length(),i,0,0,0,6,r);return o.position.copy(n).add(e).multiplyScalar(.5),o.quaternion.setFromUnitVectors(new P(0,1,0),s.normalize()),o}function j_(){let n=[[0,-6.8],[1.9,-4.3],[2.65,-1],[2.5,3.6],[1.85,5.1],[-1.85,5.1],[-2.5,3.6],[-2.65,-1],[-1.9,-4.3]],e=[],t=[],i=[];[{scale:.55,y:-1.45},{scale:.92,y:-.25},{scale:1,y:.85}].forEach(o=>n.forEach(([a,l],c)=>{e.push(a*o.scale,o.y,l*o.scale),i.push(c/(n.length-1),(o.y+1.45)/2.3)}));for(let o=0;o<2;o++)for(let a=0;a<n.length;a++){let l=o*n.length+a,c=o*n.length+(a+1)%n.length,u=l+n.length,h=c+n.length;t.push(l,u,c,c,u,h)}let s=new Ft;return s.setAttribute("position",new ut(e,3)),s.setAttribute("uv",new ut(i,2)),s.setIndex(t),s.computeVertexNormals(),s}function Lc(n,e,t,i){let r=new ar;return r.moveTo(0,0),r.lineTo(n,1),r.quadraticCurveTo(n*.48,e*.48,0,e),r.closePath(),_t(new zr(r,{depth:.095,bevelEnabled:!0,bevelSegments:1,steps:1,bevelSize:.04,bevelThickness:.025,curveSegments:5}),t,0,0,0,i)}function Dp(n="steady"){let e=Fn(`tidebound-vessel-${n}`);e.add(_t(j_(),oe.dark,0,0,0,"lapstrake-hull"));let t=new ar;t.moveTo(0,6.5),t.lineTo(1.8,4.2),t.lineTo(2.45,1),t.lineTo(2.3,-3.5),t.lineTo(1.7,-4.9),t.lineTo(-1.7,-4.9),t.lineTo(-2.3,-3.5),t.lineTo(-2.45,1),t.lineTo(-1.8,4.2),t.closePath();let i=_t(new zr(t,{depth:.22,bevelEnabled:!1}),oe.cream,0,.72,0,"laid-deck");i.rotation.x=-Math.PI/2,e.add(i);for(let a of[-1,1]){let l=gt(.14,.35,7.4,oe.coral,a*2.45,.51,.1,"painted-waterline");l.rotation.y=a*.04,e.add(l),e.add(gt(.12,.15,7.4,oe.wood,a*2.39,1.35,.2,"gunwale"));for(let c=-2.8;c<4;c+=2.1)e.add(It(.07,.07,.7,oe.wood,a*2.38,1.05,c,5,"railing-post"))}e.add(gt(2.4,.9,2.4,oe.wood,0,1.25,2.3,"cabin")),e.add(gt(2.6,.18,2.6,oe.cream,0,1.8,2.3,"cabin-roof")),e.add(gt(1.1,.65,.06,oe.dark,0,1.35,1.07,"cabin-window")),e.add(It(.14,.21,11.6,oe.wood,0,6.1,-.55,8,"main-mast")),e.add(gt(.22,.3,2,oe.wood,0,1.2,4.5,"rudder-tiller"));let r=Fn("sail-rig");if(r.position.set(0,2.1,-.55),n==="cargo"){let a=gt(7.4,6.4,.1,oe.cream,0,4.5,0,"cargo-square-sail");r.add(a),r.add(gt(7.6,.15,.17,oe.wood,0,7.75,0,"cargo-yard")),r.add(gt(7.4,.65,.16,oe.coral,0,1.8,-.05,"sail-reef-band"));for(let l of[-2.4,0,2.4])r.add(gt(.05,6.2,.12,oe.sand,l,4.5,-.08,"cloth-seam"))}else{r.add(Lc(n==="swift"?6:4.9,9,oe.cream,"mainsail"));let a=Lc(n==="swift"?-4.4:-2.7,n==="swift"?7.7:6.5,n==="swift"?oe.coral:oe.sand,"jib");a.position.z=-.12,r.add(a),r.add(hr(new P(0,.15,.1),new P(n==="swift"?6:4.9,1,.1),.09,oe.wood,"sail-boom"));let l=Kt(.64,oe.coral,1.1,4.5,-.14,0,"sail-star");l.scale.set(1,1,.15),r.add(l)}e.add(r),e.add(hr(new P(0,11.8,-.55),new P(0,1,-6.1),.025,oe.cream,"forestay")),e.add(hr(new P(0,11.8,-.55),new P(0,1,4.9),.025,oe.cream,"backstay"));let s=Lc(1.8,.85,oe.coral,"mast-pennant");s.position.set(0,11.3,-.55),e.add(s);let o=_t(new oi(.6,.15,6,12),oe.coral,-2.5,.85,2.4,"life-ring");o.rotation.y=Math.PI/2,e.add(o);for(let a=0;a<(n==="cargo"?3:1);a++)e.add(gt(.9,.8,.9,oe.sand,(a-1)*1.1,1.2,-3.5,"supply-crate"));return e.userData={assetId:`tidebound.vessel.${n}`,forward:"-Z",rig:n,colliders:[{type:"capsule",radius:2.5,length:8,axis:"z",center:[0,0,-.7]}]},e}function Uh(n=0,e=!1){let t=Fn(e?"mangrove-tree":"coastal-palm"),i=7+n%3,r=(n%2?1:-1)*1.1;if(t.add(hr(new P(0,0,0),new P(r,i,0),e?.55:.32,oe.wood,"trunk")),e){for(let o=0;o<5;o++){let a=o*Math.PI*2/5;t.add(hr(new P(r*.2,2.4,0),new P(Math.cos(a)*2.2,-.3,Math.sin(a)*2.2),.18,oe.wood,"exposed-root"))}let s=Kt(3.5,oe.leaf,r,i,0,1,"mangrove-crown");s.scale.y=.65,t.add(s)}else{for(let s=0;s<7;s++){let o=s*Math.PI*2/7,a=new ar;a.moveTo(0,0),a.quadraticCurveTo(.7,1.3,0,4.7),a.quadraticCurveTo(-.7,1.3,0,0);let l=_t(new zr(a,{depth:.13,bevelEnabled:!1,curveSegments:4}),s%2?oe.leaf:oe.leafLight,r,i,0,`palm-frond-${s}`);l.rotation.set(-.95,o,0,"YXZ"),t.add(l)}for(let s=0;s<3;s++)t.add(Kt(.36,oe.wood,r+Math.sin(s*2)*.4,i-.4,Math.cos(s*2)*.4,0,"coconut"))}return t.userData={assetId:`tidebound.flora.${e?"mangrove":"palm"}`,colliders:[{type:"cylinder",radius:.6,height:i,center:[r*.5,i*.5,0]}]},t}function Ys(n,e,t,i,r=0){let s=new Wn(n*.9,n,e,12,1,!1),o=s.attributes.position;for(let l=0;l<o.count;l++){let c=o.getX(l),u=o.getZ(l),h=Math.atan2(u,c),d=(1+.09*Math.sin(h*3+t)+.04*Math.cos(h*5+t))/1.13;o.setXYZ(l,c*d,o.getY(l),u*d)}return s.computeVertexNormals(),_t(s,i,0,r,0,"terraced-shore")}function Lp(n={id:"island",radius:24,color:"#ead9ad",type:"explore"}){let e=Fn(`island-${n.id}`),t=n.radius||24,i=String(n.id).split("").reduce((s,o)=>s+o.charCodeAt(0),0);e.add(Ys(t,4,i,oe.sand,-1.9)),e.add(Ys(t*.99,3.6,i,oe.sand,1));let r=mt(`${n.id}-earth`,n.type==="reef"?6790804:8366474);if(e.add(Ys(t*.79,5.1,i,oe.rock,3)),e.add(Ys(t*.8,.8,i,r,5.5)),n.id==="gull"||n.id==="lighthouse"){let s=n.id==="gull"?.74:.53;e.add(Ys(t*s,5,i+4,oe.stone,7.5)),e.add(Ys(t*(s+.01),.7,i+4,r,10))}if(n.id==="ruin"){for(let s=0;s<5;s++){let o=s*1.25;e.add(It(1.1,1.3,7.3,oe.cream,Math.sin(o)*10,9.4,Math.cos(o)*9,6,"ruin-colonnade")),e.add(gt(3,.6,2.5,oe.stone,Math.sin(o)*10,13.1,Math.cos(o)*9,"ruin-capital"))}e.add(It(7,7,1,oe.stone,0,6.2,0,12,"star-court"))}if(n.id==="reef"){for(let s=0;s<9;s++){let o=Kt(3.1,s%2?oe.glass:oe.coral,Math.cos(s*2.4)*8,5.4,Math.sin(s*2.4)*8,0,"glassy-reef-spire");o.scale.set(.65,1.7,.65),e.add(o)}e.add(gt(5.2,2.2,3,oe.sand,-7,1.1,10.2,"reef-jetty-landing"))}return e.userData={assetId:`tidebound.island.${n.id}`,groundHeight:n.id==="gull"||n.id==="lighthouse"?10.4:5.9,colliders:[{type:"cylinder",radius:t,height:10,center:[0,2.5,0]}]},e}function Up(){let n=Fn("harbor-kit");for(let t=0;t<3;t++){let i=(t-1)*8,r=t%2?2:-2;n.add(gt(6.4,5.2,6.4,oe.cream,i,8.6,r,"port-house"));let s=It(0,5.3,2.9,t===1?oe.dark:oe.coral,i,12.4,r,4,"hipped-tile-roof");s.rotation.y=Math.PI/4,n.add(s);for(let o of[-1,1])n.add(gt(1.1,1.7,.13,oe.dark,i+o*1.6,8.8,r-3.24,"shutter-window"));n.add(gt(1.4,2.6,.13,oe.wood,i,7.4,r-3.24,"port-door"))}n.add(It(.2,.25,11,oe.wood,10,10,-9,8,"harbor-flagpole"));let e=Lc(4,2,oe.coral,"harbor-pennant");e.position.set(10,13,-9),n.add(e);for(let t=0;t<5;t++)n.add(gt(1.8,1.8,1.8,t%2?oe.sand:oe.wood,-11.7+t*2.1,6.8,-9,"cargo-stack"));return n.userData.colliders=[{type:"box",size:[25,9,15],center:[0,9,0]}],n}function Np(n=13){let e=Fn("timber-jetty");for(let t=0;t<n;t+=1.3)e.add(gt(5,.28,1.12,oe.wood,0,2.15,t,"jetty-plank"));for(let t=1;t<n;t+=4)for(let i of[-2.2,2.2])e.add(It(.18,.23,5.8,oe.wood,i,.8,t,6,"jetty-pile"));for(let t of[-2.3,2.3]){e.add(It(.35,.35,1.1,oe.dark,t,2.9,.5,8,"mooring-bollard"));let i=_t(new oi(.5,.11,5,12),oe.sand,t,2.8,.5,"mooring-rope");i.rotation.x=Math.PI/2,e.add(i)}return e}function Fp(n=!1){let e=Fn("far-tide-lighthouse");e.add(It(4.8,6,1.7,oe.stone,0,.85,0,12,"tower-foundation")),e.add(It(2.8,4.3,22,oe.cream,0,12,0,12,"lighthouse-tower"));for(let i of[5.5,12,18])e.add(It(i>15?3:3.8,i>15?3.2:4,1.8,oe.coral,0,i,0,12,"tower-band"));e.add(It(4.1,4.1,.8,oe.dark,0,23,0,12,"lantern-balcony"));for(let i=0;i<8;i++){let r=i*Math.PI/4;e.add(It(.09,.09,3.8,oe.dark,Math.sin(r)*2.7,25,Math.cos(r)*2.7,5,"lantern-frame"))}e.add(It(0,4.1,3.2,oe.dark,0,28,0,12,"lantern-roof"));let t=Kt(1.7,n?mt("beacon-light",16771238,.25,{emissive:16764521,emissiveIntensity:2}):oe.glass,0,25,0,1,"keeper-lens");return e.add(t),e.add(gt(1.6,3,.2,oe.dark,0,2,-4.25,"lighthouse-door")),e.userData={assetId:"tidebound.structure.lighthouse",colliders:[{type:"cylinder",radius:5,height:30,center:[0,15,0]}]},e}function Op(n=6){let e=Fn("tidal-rock-cluster");for(let t=0;t<7;t++){let i=t*2.4,r=n*(.24+.1*(t%4)),s=Kt(n*(.25+.06*(t%3)),t%3?oe.rock:oe.sand,Math.cos(i)*r,-.8+Math.sin(t)*.3,Math.sin(i)*r,0,"tidal-reef");s.scale.y=.75,e.add(s)}return e}function xa(n){let e=Fn(`discovery-${n}`);if(n==="foxfish"){let t=Kt(1.15,oe.coral,0,0,0,1,"fox-fish-body");t.scale.set(.45,.8,1.7),e.add(t);let i=It(0,.9,1.6,oe.brass,0,0,2,3,"fish-tail");i.rotation.x=Math.PI/2,e.add(i);for(let r of[-1,1])e.add(Kt(.18,oe.dark,r*.42,.25,-1,1,"fish-eye"));for(let r of[-.3,.4])e.add(gt(.95,1.35,.13,oe.cream,0,0,r,"fish-stripe"))}else if(n==="tern"){let t=Kt(1,oe.cream,0,0,0,1,"tern-body");t.scale.set(.6,.6,1.3),e.add(t);for(let r of[-1,1]){let s=Kt(1,oe.cream,r*1.4,.2,.15,0,"tern-wing");s.scale.set(2,.15,.7),s.rotation.z=r*.2,e.add(s)}let i=It(0,.25,1,oe.coral,0,.15,-1.25,5,"tern-beak");i.rotation.x=-Math.PI/2,e.add(i)}else if(n==="turtle"){let t=Kt(1.8,oe.leaf,0,.3,0,1,"turtle-shell");t.scale.set(1,.5,1.15),e.add(t),e.add(Kt(.65,oe.leafLight,0,.15,-2,1,"turtle-head"));for(let i of[-1,1])for(let r of[-1,1]){let s=Kt(.9,oe.leafLight,i*1.5,0,r,0,"turtle-flipper");s.scale.set(1.1,.2,.5),s.rotation.y=i*r*.45,e.add(s)}}else if(n==="nautilus"){for(let t=0;t<10;t++){let i=t*.65,r=.15+t*.15;e.add(Kt(.25+t*.075,t%2?oe.sand:oe.cream,Math.cos(i)*r,Math.sin(i)*r,0,0,"nautilus-shell-ridge"))}for(let t=0;t<5;t++)e.add(hr(new P(-1,-.5,0),new P(-2.1,-1+t*.3,(t-2)*.18),.07,oe.coral,"nautilus-tentacle"))}else if(n==="fan-coral")for(let t=0;t<8;t++){let i=(t/7-.5)*2.4,r=new P(Math.sin(i)*3.5,Math.cos(i)*3.5+.6,Math.sin(t)*.25);e.add(hr(new P(0,0,0),r,.15,oe.coral,"coral-fan-branch"));for(let s=1;s<4;s++){let o=r.clone().multiplyScalar(s/4);e.add(hr(o,o.clone().add(new P(.55,1,.18)),.09,oe.coral,"coral-fan-filament"))}}else if(n==="mangrove-root")e.add(Uh(1,!0));else if(n==="seagrass")for(let t=0;t<12;t++){let i=It(.02,.14,2.5+t%3,oe.leafLight,Math.sin(t*2.4)*1.4,1.4,Math.cos(t*2.4)*1.4,3,"ribbon-seagrass");i.rotation.z=Math.sin(t)*.3,e.add(i)}else if(n==="glass-coral")for(let t=0;t<7;t++){let i=Kt(1.1,oe.glass,Math.sin(t*2.4)*1.8,1+t%3*.45,Math.cos(t*2.4)*1.8,0,"glass-branch");i.scale.set(.45,2.4,.55),e.add(i)}else if(n==="star-tablet"){e.add(gt(3.2,4.5,.75,oe.stone,0,2.2,0,"star-tablet"));for(let t=0;t<7;t++){let i=t*Math.PI*2/7;e.add(Kt(.17,oe.brass,Math.sin(i)*1.05,2.4+Math.cos(i)*1.25,-.45,0,"seven-star-inlay"))}e.add(gt(3.6,.5,1.4,oe.cream,0,.25,0,"tablet-plinth"))}else if(n==="tide-clock"){let t=_t(new oi(2,.35,6,16),oe.brass,0,2,0,"tide-clock-rim");e.add(t),e.add(It(1.9,1.9,.4,oe.dark,0,2,0,12,"clock-face")),e.children[1].rotation.x=Math.PI/2,e.add(gt(.15,1.6,.2,oe.cream,.15,2.5,-.4,"clock-hand"));for(let i=0;i<8;i++){let r=i*Math.PI/4;e.add(gt(.35,.35,.6,oe.brass,Math.sin(r)*2.1,2+Math.cos(r)*2.1,0,"clock-gear"))}}else if(n==="beacon-lens"){e.add(It(1.5,1.9,.7,oe.stone,0,.35,0,8,"lens-plinth"));let t=Kt(2,oe.glass,0,2.5,0,1,"refractor-lens");t.scale.set(1,1,.4),e.add(t);let i=_t(new oi(2.1,.18,6,16),oe.brass,0,2.5,0,"lens-frame");e.add(i)}else{e.add(gt(3.8,1.5,2.4,oe.wood,0,.75,0,"keepers-archive")),e.add(gt(4,.3,2.5,oe.coral,0,1.6,0,"archive-lid")),e.add(gt(.5,.7,.15,oe.brass,0,1,-1.25,"archive-lock"));let t=gt(1.3,.3,1.7,oe.cream,.4,1.95,0,"keepers-journal");t.rotation.y=-.2,e.add(t)}return e.userData={assetId:`tidebound.discovery.${n}`,colliders:[{type:"sphere",radius:2.5,center:[0,1,0]}]},e}function Uc(){let n=Fn("tide-voyager"),e=[],t=(b,v,A,R,I)=>{let U=new Is;return U.name=b,U.position.set(A,R,I),v?.add(U),e.push(U),U},i=t("Hips",null,0,1.1,0),r=t("Spine",i,0,.5,0),s=t("Head",r,0,.62,0);t("LeftArm",r,-.52,.22,0),t("RightArm",r,.52,.22,0),t("LeftLeg",i,-.24,-.2,0),t("RightLeg",i,.24,-.2,0),n.add(i),n.updateMatrixWorld(!0);let o=[],a=[],l=[],c=[],u=[],h=[],d=[],f=(b,v,A,R)=>{let I=new si(...v),U=new P,M=new tt(R),S=o.length/3;for(let L=0;L<I.attributes.position.count;L++)U.fromBufferAttribute(I.attributes.position,L).add(new P(...A)),e[b].localToWorld(U),o.push(U.x,U.y,U.z),a.push(I.attributes.normal.getX(L),I.attributes.normal.getY(L),I.attributes.normal.getZ(L)),l.push(I.attributes.uv.getX(L),I.attributes.uv.getY(L)),c.push(b,0,0,0),u.push(1,0,0,0),h.push(M.r,M.g,M.b);for(let L=0;L<I.index.count;L++)d.push(S+I.index.getX(L));I.dispose()};f(0,[.7,.4,.48],[0,0,0],ht.dark),f(1,[.86,.78,.5],[0,0,0],ht.coral),f(2,[.61,.6,.58],[0,.04,0],15318161),f(2,[.8,.13,.78],[0,.4,0],ht.cream),f(2,[.58,.28,.56],[0,.52,0],ht.cream),f(2,[.46,.16,.1],[0,.12,-.32],ht.dark);for(let b of[3,4])f(b,[.24,.72,.28],[0,-.3,0],ht.coral),f(b,[.23,.24,.25],[0,-.75,0],15318161);for(let b of[5,6])f(b,[.3,.8,.34],[0,-.35,0],ht.dark),f(b,[.35,.22,.58],[0,-.82,-.12],ht.cream);let m=new Ft;m.setAttribute("position",new ut(o,3)),m.setAttribute("normal",new ut(a,3)),m.setAttribute("uv",new ut(l,2)),m.setAttribute("color",new ut(h,3)),m.setAttribute("skinIndex",new Nr(c,4)),m.setAttribute("skinWeight",new ut(u,4)),m.setIndex(d);let x=new Bo(m,mt("voyager-woven-uniform",16777215,.85,{vertexColors:!0}));x.name="VoyagerSkin",x.castShadow=!0,n.add(x),x.bind(new Ho(e));let g=(b,v,A,R)=>{let I=A.flatMap(U=>new cn().setFromAxisAngle(v,U).toArray());return new Bi(`${b}.quaternion`,R,I)},p=new P(1,0,0),w=new P(0,0,1);return n.animations=[new Hi("DockIdle",3,[g("LeftArm",w,[.08,.14,.08],[0,1.5,3]),g("RightArm",w,[-.08,-.14,-.08],[0,1.5,3]),g("Head",p,[0,.07,0],[0,1.5,3])]),new Hi("Swim",1.6,[g("LeftArm",p,[-1.8,.6,-1.8],[0,.8,1.6]),g("RightArm",p,[.6,-1.8,.6],[0,.8,1.6]),g("LeftLeg",p,[-.4,.4,-.4],[0,.8,1.6]),g("RightLeg",p,[.4,-.4,.4],[0,.8,1.6])]),new Hi("DockWave",1.8,[g("RightArm",w,[-2.5,-2.1,-2.5,-2.1,-2.5],[0,.45,.9,1.35,1.8])])],n.userData={assetId:"tidebound.character.voyager",rootMotion:!1,colliders:[{type:"capsule",radius:.48,height:2.7,center:[0,1.35,0]}]},n}function zp(){let n=Fn("three-dimensional-current-marker"),e=gt(.45,.15,3.7,oe.glass,0,0,.3,"current-shaft");n.add(e);for(let t of[-1,1]){let i=gt(.45,.16,1.9,oe.glass,t*.62,0,-1.1,"current-chevron");i.rotation.y=-t*.75,n.add(i)}return n}function Bp(){let n=Fn("sea-survey-buoy");return n.add(It(1.6,1.3,.7,oe.coral,0,.25,0,12,"buoy-float")),n.add(It(.13,.19,3.5,oe.dark,0,2,0,6,"buoy-mast")),n.add(Kt(.85,oe.brass,0,4,0,0,"survey-signal")),n.add(gt(1.6,.65,.2,oe.cream,0,2.6,0,"research-plate")),n.add(gt(.7,.42,.8,oe.glass,.8,.9,0,"sample-container")),n.userData={assetId:"tidebound.navigation.survey-buoy",colliders:[{type:"sphere",radius:9,center:[0,0,0],trigger:!0,purpose:"optional low-speed observation; no rigid collision"}]},n}function kp(n=15){let e=Fn("tidal-whirlpool");for(let t=0;t<4;t++){let i=_t(new oi(n*(.3+t*.2),.14+t*.04,5,36,Math.PI*1.6),t%2?oe.glass:oe.cream,0,-t*.045,0,"spiral-current");i.rotation.x=-Math.PI/2,i.rotation.z=t*.8,e.add(i)}return e}var Nh=Math.PI*2;function Zs(n,e,t){return Math.sin(n*.075+t*.9)*.34+Math.sin(e*.11-t*.65)*.22+Math.sin((n+e)*.041+t*.55)*.18}var Hp=`
uniform float uTime;uniform float uTide;uniform float uMotion;
varying vec3 vWorld;varying vec3 vNormal;varying float vWave;
void main(){vec3 p=position;float a=p.x*.075+uTime*.9;float b=-p.y*.11-uTime*.65;float c=(p.x-p.y)*.041+uTime*.55;
float h=(sin(a)*.34+sin(b)*.22+sin(c)*.18)*uMotion;p.z+=h+uTide;
vec4 world=modelMatrix*vec4(p,1.);vWorld=world.xyz;vWave=h;vNormal=normalize(vec3(-cos(a)*.0255*uMotion-cos(c)*.00738*uMotion,1.,-cos(b)*.0242*uMotion-cos(c)*.00738*uMotion));
gl_Position=projectionMatrix*viewMatrix*world;}`,Q_=`
uniform float uTime;uniform vec3 uCamera;uniform float uDive;uniform float uEconomy;
varying vec3 vWorld;varying vec3 vNormal;varying float vWave;
void main(){vec3 deep=vec3(.055,.34,.40),shallow=vec3(.10,.53,.55);float l=.52+vWave*.55;vec3 col=mix(deep,shallow,l);
if(uEconomy>.5){float ripple=sin(vWorld.x*.13+vWorld.z*.17+uTime*.4);col+=smoothstep(.94,1.,ripple)*.025;float fog=smoothstep(240.,650.,length(uCamera-vWorld));gl_FragColor=vec4(mix(col,vec3(.69,.82,.79),fog),1.);return;}
vec3 light=normalize(vec3(-.5,1.,-.35));vec3 viewDir=normalize(uCamera-vWorld);float spec=pow(max(dot(reflect(-light,vNormal),viewDir),0.),180.);
float ripple=sin(vWorld.x*.22+sin(vWorld.z*.13)*1.3+uTime*.4)*sin(vWorld.z*.27+sin(vWorld.x*.14));float glint=smoothstep(.94,.999,ripple)*.085;
col+=vec3(.82,.88,.70)*spec*.45+glint;float fog=smoothstep(240.,650.,distance(uCamera,vWorld));col=mix(col,vec3(.69,.82,.79),fog);
gl_FragColor=vec4(col,1.-uDive*.43);}`,eb=`
uniform vec3 uCamera;varying vec3 vWorld;varying float vWave;
void main(){vec3 col=mix(vec3(.055,.34,.40),vec3(.10,.53,.55),.52+vWave*.55);
col+=smoothstep(.21,.34,vWave)*.025;float fog=smoothstep(240.,650.,length(uCamera-vWorld));
gl_FragColor=vec4(mix(col,vec3(.69,.82,.79),fog),1.);}`;function qn(n,e){let t=_t(new oi(n,.22,5,40),mt("navigation-ring",e,.6,{emissive:e,emissiveIntensity:.12}));return t.rotation.x=-Math.PI/2,t.castShadow=!1,t}function Vp(n,e,t=!1,i=!1){if(!e.length)return[];let r=(i?Gp:Yn)(Uh(1,t));r.updateMatrixWorld(!0);let s=[];return r.traverse(o=>{if(!o.isMesh)return;let a=new Ds(o.geometry,o.material,e.length);a.name=t?"instanced-mangroves":"instanced-palms",a.castShadow=!0,a.receiveShadow=!0;let l=new ot,c=new cn,u=new P;e.forEach((h,d)=>{c.setFromAxisAngle(new P(0,1,0),h.a),u.setScalar(h.scale),l.compose(new P(h.x,h.y,h.z),c,u).multiply(o.matrixWorld),a.setMatrixAt(d,l)}),a.computeBoundingSphere(),n.add(a),s.push(a)}),s}function Yn(n){n.updateMatrixWorld(!0);let e=new Map;for(let t of[...n.children])if(t.isMesh&&!t.isSkinnedMesh&&!Array.isArray(t.material)){let i=t.material.uuid;e.has(i)||e.set(i,[]),e.get(i).push(t)}for(let t of e.values()){if(t.length<2)continue;let i=t.map(o=>{let a=o.geometry.index?o.geometry.toNonIndexed():o.geometry.clone();for(let l of Object.keys(a.attributes))["position","normal","uv"].includes(l)||a.deleteAttribute(l);return a.attributes.uv||a.setAttribute("uv",new Nt(new Float32Array(a.attributes.position.count*2),2)),a.applyMatrix4(o.matrix)}),r=Lh(i);if(i.forEach(o=>o.dispose()),!r)continue;let s=new Ct(r,t[0].material);s.castShadow=t.some(o=>o.castShadow),s.receiveShadow=!0,s.name="batched-"+n.name,t.forEach(o=>n.remove(o)),n.add(s)}return n}function Gp(n){n.updateMatrixWorld(!0);let e=[...n.children].filter(s=>s.isMesh&&!s.isSkinnedMesh&&!Array.isArray(s.material)&&!s.material.transparent&&s.material.emissive?.getHex()===0);if(e.length<2)return Yn(n);let t=e.map(s=>{let o=s.geometry.index?s.geometry.toNonIndexed():s.geometry.clone();for(let u of Object.keys(o.attributes))["position","normal","uv","color"].includes(u)||o.deleteAttribute(u);o.attributes.uv||o.setAttribute("uv",new Nt(new Float32Array(o.attributes.position.count*2),2));let a=new Float32Array(o.attributes.position.count*3),l=o.attributes.color,c=s.material.color;for(let u=0;u<o.attributes.position.count;u++)a[u*3]=c.r*(l?l.getX(u):1),a[u*3+1]=c.g*(l?l.getY(u):1),a[u*3+2]=c.b*(l?l.getZ(u):1);return o.setAttribute("color",new Nt(a,3)),o.applyMatrix4(s.matrix)}),i=Lh(t);if(t.forEach(s=>s.dispose()),!i)return n;let r=new Ct(i,new Br({name:"baked-static-colours",color:16777215,vertexColors:!0,roughness:.78}));return r.name="colour-batched-"+n.name,r.castShadow=e.some(s=>s.castShadow),r.receiveShadow=!0,e.forEach(s=>n.remove(s)),n.add(r),n}function Wp(n,e){let{ISLANDS:t=[],DISCOVERIES:i=[],REEFS:r=[],CURRENTS:s=[],WHIRLS:o=[],DIVE_SITES:a=[],OBSERVATIONS:l=[]}=e,c=new Pc({canvas:n,antialias:!1,alpha:!1,powerPreference:"high-performance"});c.setClearColor(11653834),c.outputColorSpace=pn,c.toneMapping=ca,c.toneMappingExposure=1.22,c.shadowMap.enabled=!0,c.shadowMap.type=Dl,c.shadowMap.autoUpdate=!1;let u=c.getContext(),h=u.getExtension("WEBGL_debug_renderer_info"),d=!!h&&/swiftshader|llvmpipe|software/i.test(u.getParameter(h.UNMASKED_RENDERER_WEBGL)),f=d?Gp:Yn,m=new zo;m.background=new tt(11653834),m.fog=new Oo(11653834,230,620);let x=new nn(43,1,.35,1e3);x.position.set(0,73,229);let g=new sa(15267555,3766390,2.3);m.add(g);let p=new la(16772305,3);p.position.set(-130,220,-100),p.castShadow=!0,p.shadow.mapSize.set(768,768),p.shadow.camera.left=-95,p.shadow.camera.right=95,p.shadow.camera.top=95,p.shadow.camera.bottom=-95,p.shadow.camera.near=5,p.shadow.camera.far=480,p.shadow.bias=-5e-4,p.shadow.normalBias=.18,m.add(p),m.add(p.target);let w=new Mn({uniforms:{uTime:{value:0},uTide:{value:0},uMotion:{value:1},uCamera:{value:x.position},uDive:{value:0},uEconomy:{value:0}},vertexShader:Hp,fragmentShader:Q_,side:Vn,transparent:!1,depthWrite:!0}),b=new Mn({uniforms:w.uniforms,vertexShader:Hp,fragmentShader:eb,side:Vn}),v=64,A=new Ct(new lr(1500,1500,v,v),w);A.rotation.x=-Math.PI/2,A.name="displaced-ocean-surface",A.frustumCulled=!1,A.renderOrder=0,m.add(A);let R=[],I=[],U=[],M=[],S=[],L=[],B=[],H,Z,X;for(let y of t){let N=f(Lp(y));N.position.set(y.x,0,y.z),m.add(N);let k=new rn;k.name=`island-detail-${y.id}`,k.position.set(y.x,0,y.z),m.add(k);let he=N.userData.groundHeight;if(y.id==="harbor"&&k.add(f(Up())),y.id==="lighthouse"){H=Fp(!1),H.position.y=he,k.add(H);let Me=H.getObjectByName("keeper-lens");Me.material=Me.material.clone(),Me.material.name="keeper-lens-active",H.remove(Me),Yn(H),H.add(Me),Z=new oa(16768138,0,80,2),Z.position.set(y.x,he+25,y.z),m.add(Z),X=_t(new Fr(17,110,24,1,!0),mt("restored-beacon-ray",16770464,.6,{transparent:!0,opacity:.075,depthWrite:!1,side:Xn,emissive:16769698,emissiveIntensity:.8}),0,0,0,"restored-lighthouse-beam"),X.geometry.translate(0,-55,0),X.rotation.z=Math.PI/2;let xe=new rn;xe.name="beacon-rotation",xe.position.set(y.x,he+25,y.z),xe.add(X),m.add(xe),X.userData.rotor=xe,xe.visible=!1}let Se=new P(y.x-y.dock.x,0,y.z-y.dock.z),ke=Math.max(8,Se.length()-y.radius*.63),pe=f(Np(ke));pe.rotation.y=Math.atan2(Se.x,Se.z),pe.position.set(y.dock.x+Math.cos(pe.rotation.y)*7,0,y.dock.z-Math.sin(pe.rotation.y)*7),m.add(pe),R.push({object:pe,x:y.dock.x,z:y.dock.z});let Be=qn(5.9,16767117);Be.position.set(y.dock.x,.85,y.dock.z),m.add(Be);let Ve=_t(new Wn(.7,.9,4.5,8),mt("dock-marker",ht.coral),y.dock.x+Math.cos(pe.rotation.y)*4,2.8,y.dock.z-Math.sin(pe.rotation.y)*4,"safe-mooring-marker");m.add(Ve);let et=_t(new Ei(.9,0),mt("port-lantern",ht.cream,.4,{emissive:16767366,emissiveIntensity:.5}),0,2.9,0,"dock-lantern");if(Ve.add(et),R.push({object:Ve,x:y.dock.x,z:y.dock.z}),y.id!=="reef"&&y.id!=="ruin"&&y.id!=="lighthouse")for(let Me=0;Me<(y.id==="mangrove"?7:4);Me++){let xe=Me*2.399+y.x*.01,Je=y.radius*(.3+.1*(Me%3));(y.id==="mangrove"?B:L).push({x:y.x+Math.cos(xe)*Je,y:he,z:y.z+Math.sin(xe)*Je,a:xe,scale:.75+Me%3*.14})}if(y.id==="harbor"||y.id==="gull"){let Me=Uc();Me.scale.setScalar(1.3),Me.position.set(-3,he,-y.radius*.55),k.add(Me);let xe=new Gr(Me);xe.clipAction(Me.animations[y.id==="harbor"?2:0]).play(),M.push({mixer:xe,person:Me,islandId:y.id})}for(let[Me,xe]of i.filter(Je=>Je.islandId===y.id&&!Je.diveSiteId).entries()){let Je=Yn(xa(xe.id)),He=-Math.PI*.7+Me*1.3;Je.position.set(Math.sin(He)*y.radius*.37,he+.3,Math.cos(He)*y.radius*.37),xe.id==="tern"&&(Je.position.y+=4.5),k.add(Je);let We=qn(3,ht.brass);We.position.copy(Je.position),We.position.y=he+.15,k.add(We),U.push({id:xe.id,model:Je,ring:We,baseY:Je.position.y,animal:xe.kind==="animal"})}I.push({land:N,detail:k,ring:Be,data:y})}let J=[...Vp(m,L,!1,d),...Vp(m,B,!0,d)],le=Yn(Bp()),$=l.map(y=>{let N=le.clone(!0);N.name=`survey-${y.id}`,m.add(N);let k=qn(3.6,ht.brass);return m.add(k),{id:y.id,cargoId:`observation:${y.id}`,data:y,model:N,ring:k}}),_e=qn(4,5541867);m.add(_e);let we=_t(new Fr(.7,2.2,6),mt("navigation-guide",5541867,.5,{emissive:2710714,emissiveIntensity:.25}),0,0,0,"selected-route-waypoint");m.add(we);let Le=r.map(y=>{let N=Yn(Op(y.radius));N.scale.y=.42;let k=new Ln().setFromObject(N);N.position.set(y.x,y.safeHeight*1.7-k.max.y,y.z),m.add(N);let he=qn(y.radius+.5,15571827);return he.position.set(y.x,0,y.z),m.add(he),{id:y.id,data:y,model:N,ring:he}}),je=s.map((y,N)=>{let k=[];for(let he=0;he<7;he++){let Se=Yn(zp());Se.position.set(y.x+(N?8:-8)*Math.sin(he),.3,y.z+(he-3)*15),m.add(Se),k.push(Se)}return{data:y,arrows:k}}),at=o.map(y=>{let N=Yn(kp(y.radius));N.position.set(y.x,0,y.z),m.add(N);let k=qn(y.radius,ht.coral);return k.position.copy(N.position),m.add(k),{data:y,model:N,rim:k}});for(let y of a){let N=new rn;N.name=`underwater-${y.id}`;let k=_t(new Wn(y.radius,y.radius*1.1,2,16),mt("underwater-sand",10798765),y.entry.x,-9.5,y.entry.z,"shallow-seabed");N.add(k);let he=new rn;he.name="dive-garden",N.add(he);for(let We=0;We<14;We++){let Ke=We*2.4,xt=8+We%4*4,Cn=xa(y.id==="ruin-dive"?We%3?"glass-coral":"star-tablet":We%2?"fan-coral":"seagrass");Cn.scale.setScalar(.45+We%3*.2),Cn.position.set(y.entry.x+Math.sin(Ke)*xt,-8.6,y.entry.z+Math.cos(Ke)*xt),Cn.updateMatrixWorld(!0),Cn.traverse(kt=>{if(!kt.isMesh)return;let jn=new Ct(kt.geometry,kt.material);jn.applyMatrix4(kt.matrixWorld),he.add(jn)})}Yn(he);let Se=Yn(xa(y.discoveryId));Se.position.set(y.target.x,-6.8,y.target.z),Se.scale.setScalar(1.35),N.add(Se),U.push({id:y.discoveryId,model:Se,ring:null,baseY:-6.8,animal:y.discoveryId!=="tide-clock",underwater:!0});let ke=_t(new zs(1.2),mt(`lighthouse-part-${y.partId}`,ht.brass,.28,{metalness:.45,emissive:16764007,emissiveIntensity:.3}),y.target.x+2,-6.1,y.target.z,"recoverable-lighthouse-part");N.add(ke);let pe=qn(4,ht.brass);pe.position.set(y.target.x,-8.4,y.target.z),N.add(pe);let Be=[],Ve=new Ei(1,0),et=mt("oxygen-bubble",14221298,.2,{transparent:!0,opacity:.6}),Me=new Ds(Ve,et,y.bubbles.length*8);Me.instanceMatrix.setUsage(ah),Me.frustumCulled=!1,N.add(Me);for(let We of y.bubbles){let Ke=_t(new Ei(.9,0),mt("oxygen-spring",12188656,.2,{emissive:7527621,emissiveIntensity:.6}),We.x,-8.1,We.z,"oxygen-spring");N.add(Ke);for(let xt=0;xt<8;xt++)Be.push({x:We.x,z:We.z,phase:xt*.8,scale:.16+xt%3*.07})}let xe=qn(4,8974041);xe.position.set(y.entry.x,-8.1,y.entry.z),N.add(xe);let Je=_t(new Wn(.045,.045,8,5),mt("dive-return-rope",ht.cream),y.entry.x,-3.3,y.entry.z,"return-to-vessel-rope");N.add(Je);let He=[];for(let We of hn(1).stages.find(Ke=>Ke.siteId===y.id).stations){let Ke=qn(4.5,8974041);Ke.position.set(We.x,-8.1,We.z),N.add(Ke);let xt=_t(new zs(.7),mt("station-"+We.id,8974041,.4,{emissive:3500902,emissiveIntensity:.5}),We.x,-6.4,We.z);N.add(xt),He.push({ring:Ke,pin:xt})}m.add(N),S.push({site:y,group:N,part:ke,partRing:pe,bubbles:Be,bubbleMesh:Me,treasure:Se,stations:He})}let lt=new Float32Array(6),ct=new Ft;ct.setAttribute("position",new Nt(lt,3));let j=new Vo(ct,new Us({color:16768916}));j.frustumCulled=!1,m.add(j);let re=qn(6,15630703),Pe=qn(12,6933457);Pe.scale.x=.25,m.add(re,Pe);let Ne=new rn;Ne.name="player-buoyant-vessel",m.add(Ne);let Fe=["steady","swift","cargo"].map(y=>{let N=Dp(y);return N.userData.sailRig=N.getObjectByName("sail-rig"),f(N.userData.sailRig),f(N),N.visible=y==="steady",Ne.add(N),N}),nt=Uc();nt.scale.setScalar(.83),nt.position.set(-.9,1.1,3.5),Ne.add(nt);let vt=new Gr(nt);vt.clipAction(nt.animations[0]).play();let D=Uc();D.scale.setScalar(1.2),m.add(D);let se=new Gr(D);se.clipAction(D.animations[1]).play(),D.visible=!1;let te=[];for(let y=0;y<10;y++){let N=qn(1.6+y*.18,12774103);N.material.transparent=!0,N.material.opacity=.3,m.add(N),te.push(N)}let Q=[];for(let y=0;y<4;y++){let N=xa("tern");N.scale.setScalar(.6),m.add(N),Q.push(N)}let K=new rn;K.name="harbor-story-celebration";let be=t.find(y=>y.id==="harbor");K.position.set(be?.x||0,0,be?.z||190),K.visible=!1,m.add(K);let ce=[mt("festival-coral",ht.coral),mt("festival-linen",ht.cream),mt("festival-brass",ht.brass)],ye=[];for(let y of[-1,1]){let N=y*12;K.add(_t(new Wn(.16,.21,10,6),mt("festival-timber",ht.wood),N,10.5,-14,"festival-mast"));let k=_t(new Ei(.65,1),mt("warm-welcome-lantern",16768916,.3,{emissive:16763230,emissiveIntensity:1.2}),N,16.2,-14,"welcome-lantern");K.add(k),ye.push(k)}let Ye=new Fr(.8,1.65,3);Ye.scale(1,1,.22);let qe=[];for(let y=0;y<13;y++){let N=-12+y*2,k=14.4+Math.pow(N/12,2)*1.1;if(qe.push(new P(N,k,-14)),y>0&&y<12){let he=_t(Ye,ce[y%3],N,k-.7,-14,"welcome-pennant");he.rotation.z=Math.PI,K.add(he)}}let T=_t(new ta(new Fs(qe),24,.045,4,!1),mt("festival-cord",ht.cream),0,0,0,"festival-bunting-cord");K.add(T);let _=new rn;_.name="one-shot-return-confetti",K.add(_);let z=new si(.24,.06,.42),W=[];for(let y=0;y<30;y++){let N=_t(z,ce[y%3],0,0,0,"volumetric-confetti");N.castShadow=!1,_.add(N),W.push({mesh:N,phase:y/30*Nh,x:(y%10-4.5)*1.6,z:-18-Math.floor(y/10)*2,delay:y%5*.14})}Yn(K);let ie=!1,q=0,De=d?.85:1,me=0,Ue=0,Re={update:{total:0,max:0,count:0},render:{total:0,max:0,count:0}},ue=0,Te=0,Ge="follow",Oe=0,ve="high",Ze=!1,F=0,de=0,ge=null,Ie=!1,fe=!1,ne=Object.fromEntries(t.map(y=>[y.id,y])),ze=Object.fromEntries(a.map(y=>[y.id,y])),Qe=Object.fromEntries(S.map(y=>[y.site.id,y])),bt={height:0,index:0},ft={x:0,z:0,strength:0},gn={x:0,z:0,warning:!1},Rn=new Float32Array(2048),is=0,On=new Gt,Yi=new P,rs=!1,Zi=1280,Ai=720,Pt=new P,xn=new P,xr=new P(0,0,157),Aa=new P;function vr(){if(Ze)return;let y=n.getBoundingClientRect(),N=Math.max(1,y.width||n.clientWidth||1280),k=Math.max(1,y.height||n.clientHeight||720);Zi=N,Ai=k,c.setSize(N,k,!1),c.setPixelRatio(Math.min(globalThis.devicePixelRatio||1,ve==="low"?1:1.5)*De),x.aspect=N/k,x.updateProjectionMatrix()}let ss=new Map,no=new Map;m.traverse(y=>{if(y.isMesh&&y.material?.isMeshStandardMaterial){let N=y.material;if(no.set(y,N),!ss.has(N)){let k=new na({name:N.name,color:N.color,emissive:N.emissive,emissiveIntensity:N.emissiveIntensity,transparent:N.transparent,opacity:N.opacity,side:N.side,depthWrite:N.depthWrite,vertexColors:N.vertexColors});ss.set(N,k)}}});function Jc(y){if(ve!==y){ve=y,A.material=ve==="low"?b:w,c.toneMapping=ve==="low"?ai:ca;for(let[N,k]of no)N.material=ve==="low"?ss.get(k):k;w.uniforms.uEconomy.value=ve==="low"?1:0,c.shadowMap.enabled=ve==="high",v=ve==="high"?64:32,A.geometry.dispose(),A.geometry=new lr(1500,1500,v,v),J.forEach(N=>N.castShadow=ve==="high"),vr()}}function Kc(y,N=0,k={}){if(Ze)return;let he=performance.now();ge=y,N>.036?(me++,Ue=0):N>0&&N<.024&&(Ue++,me=Math.max(0,me-1)),me>45&&De>.6?(De=Math.max(.6,De-.15),me=0,vr()):Ue>600&&De<1&&(De=Math.min(1,De+.1),Ue=0,vr());let ke=!!k.paused?0:Math.min(N,.1);F+=ke,de++,Jc(k.quality==="auto"?d?"low":"high":k.quality||"high");let pe=Number(y.time)||0,Be=lo(pe,bt),Ve=Be.height*1.7;rs=!!k.reducedMotion;let et=k.reducedMotion?.18:1,Me=y.mode==="diving";w.uniforms.uTime.value=pe,w.uniforms.uTide.value=Ve,w.uniforms.uMotion.value=et,w.uniforms.uDive.value=Me?1:0;let xe=y.boat,Je=dn(y);if(is!==Je.id){is=Je.id;for(let ae of $)ae.data=Je.observations.find(ee=>ee.id===ae.id)||null}Ne.position.set(xe.x,Ve+.14+Zs(xe.x,xe.z,pe)*et,xe.z),Ne.rotation.set((Zs(xe.x,xe.z-3,pe)-Zs(xe.x,xe.z+3,pe))*.075*et,-(xe.heading||0),(Zs(xe.x-2,xe.z,pe)-Zs(xe.x+2,xe.z,pe))*.11*et,"YXZ");let He=y.rigId||xe.rig||"steady";for(let ae=0;ae<Fe.length;ae++){let ee=Fe[ae];ee.visible=ee.userData.rig===He;let $e=ee.userData.sailRig,Dt=typeof xe.sail=="number"?xe.sail:1;$e.scale.y=.15+Math.max(0,Math.min(1,Dt))*.85,$e.rotation.y=Math.sin(pe*.6)*.025*et}Me||vt.update(ke);for(let ae=0;ae<M.length;ae++){let ee=M[ae],$e=ne[ee.islandId];!Me&&Math.hypot(xe.x-$e.x,xe.z-$e.z)<150&&!k.reducedMotion&&ee.mixer.update(ke)}Me&&se.update(ke);let We=!!y.storyComplete&&y.currentIsland==="harbor";K.visible=!!y.storyComplete&&!Me,y.storyComplete?We&&!ie&&(ie=!0,q=0):(ie=!1,q=0),ie&&(q=Math.min(6,q+ke)),_.visible=We&&ie&&q<5&&!k.reducedMotion;for(let ae=0;ae<W.length;ae++){let ee=W[ae],$e=Math.max(0,q-ee.delay);ee.mesh.visible=$e>0&&$e<4.3,ee.mesh.position.set(ee.x+Math.sin($e*1.6+ee.phase)*1.5,8+$e*5-$e*$e*1.4,ee.z+$e*.6),ee.mesh.rotation.set($e*2+ee.phase,$e*1.4,$e*2.6)}for(let ae=0;ae<ye.length;ae++){let ee=ye[ae];ee.material.emissiveIntensity=k.reducedMotion?1.2:1.2+Math.sin(F*1.2+ae)*.12}let Ke=y.voyage.navigation,xt=Ke?.waypoints[Ke.index];_e.visible=we.visible=!!xt&&!Me&&y.mode==="sailing",xt&&(_e.position.set(xt.x,Ve+.18,xt.z),we.position.set(xt.x,Ve+2.2,xt.z),we.rotation.z=Math.PI);for(let ae=0;ae<$.length;ae++){let ee=$[ae];if(!ee.data){ee.model.visible=ee.ring.visible=!1;continue}let $e=Math.hypot(xe.x-ee.data.x,xe.z-ee.data.z),Dt=y.voyage?.harvested?.includes(ee.cargoId);ee.model.position.set(ee.data.x,Ve+Zs(ee.data.x,ee.data.z,pe)*et,ee.data.z),ee.model.rotation.z=Math.sin(pe*.9+ee.data.x)*.045*et,ee.model.visible=!Me&&$e<180,ee.ring.position.set(ee.data.x,Ve+.12,ee.data.z),ee.ring.visible=!Me&&!Dt&&$e<55}let Cn=y.discoveries;for(let ae=0;ae<U.length;ae++){let ee=U[ae];ee.ring&&(ee.ring.material.color.setHex(Cn.includes(ee.id)?8702371:ht.brass),ee.ring.visible=!0),ee.animal&&(ee.model.position.y=ee.baseY+Math.sin(pe*1.7+ee.baseY)*.25*et,ee.model.rotation.y=Math.sin(pe*.3)*.25)}for(let ae=0;ae<Le.length;ae++){let ee=Le[ae],$e=Be.height<=ee.data.safeHeight;ee.ring.position.y=Ve+.15;let Dt=!Me&&Math.hypot(xe.x-ee.data.x,xe.z-ee.data.z)<200;ee.ring.visible=$e&&Dt,ee.model.visible=Dt}for(let ae=0;ae<je.length;ae++){let ee=je[ae],$e=Ca(ee.data.x,ee.data.z,pe,y.voyage.variantId||y.seed,ft),Dt=Math.atan2(-$e.x,-$e.z);for(let di=0;di<ee.arrows.length;di++){let fi=ee.arrows[di];fi.visible=!Me&&Math.hypot(xe.x-fi.position.x,xe.z-fi.position.z)<140,fi.position.y=Ve+.18+Math.sin(pe+di)*.025,fi.rotation.y=Number.isFinite(Dt)?Dt:0}}for(let ae=0;ae<at.length;ae++){let ee=at[ae],$e=Math.sin(pe/240*Nh+ee.data.phase+dn(y).hazardPhase)>.25;ee.model.position.y=Ve+.19,ee.model.rotation.y=k.reducedMotion?0:pe*($e?.55:.12),ee.model.scale.setScalar($e?1:.75),ee.rim.position.y=Ve+.13,ee.rim.material.color.setHex($e?ht.coral:ht.brass),ee.rim.visible=ee.model.visible=!Me&&Math.hypot(xe.x-ee.data.x,xe.z-ee.data.z)<180}let kt=y.parts;for(let ae=0;ae<S.length;ae++){let ee=S[ae];if(ee.group.visible=Me&&y.activeDive===ee.site.id,ee.part.visible=!kt.includes(ee.site.partId),ee.part.position.y=-6.1+Math.sin(pe*1.3)*.18*et,ee.part.rotation.y=pe*.6,ee.group.visible){for(let $e=0;$e<ee.bubbles.length;$e++){let Dt=ee.bubbles[$e];On.position.set(Dt.x+Math.sin(pe+$e)*.3,-8+(pe*.8+Dt.phase)%8,Dt.z+Math.cos(pe+$e)*.3),On.scale.setScalar(Dt.scale),On.updateMatrix(),ee.bubbleMesh.setMatrixAt($e,On.matrix)}ee.bubbleMesh.instanceMatrix.needsUpdate=!0}}if(Me){let ae=yn(y),ee=ze[y.activeDive],$e=y.diveTasks[ee.id],Dt=vi(y),di=Qe[ee.id];for(let fi=0;fi<di.stations.length;fi++){let yr=di.stations[fi],os=ae.stations[fi],Im=$e.completedStationIds.includes(os.id),Qh=os===Dt,Pm=ae.mechanic!=="valves"||Ri(pe,y.voyage.variantId)<3;yr.ring.position.set(os.x,-8.1,os.z),yr.pin.position.set(os.x,-6.4,os.z),yr.ring.material.color.setHex(Im?8702371:Qh?Pm?8974041:15642215:7442073),yr.pin.material.color.copy(yr.ring.material.color),yr.pin.scale.setScalar(Qh?1.2:.65),yr.pin.rotation.y=k.reducedMotion?0:pe*.4}di.partRing.visible=$e.opened&&!y.diveCollected,j.visible=!y.diveCollected,lt[0]=y.diver.x,lt[1]=-8,lt[2]=y.diver.z,lt[3]=Dt.x,lt[4]=-8,lt[5]=Dt.z,j.geometry.attributes.position.needsUpdate=!0,re.visible=ae.mechanic==="guardian",Pe.visible=ae.mechanic==="valves",re.visible&&(oo(pe,ee,gn,y.voyage.variantId),re.position.set(gn.x,-7.9,gn.z),re.material.color.setHex(gn.warning?16044160:15630703)),Pe.visible&&Pe.position.set(ee.entry.x+Math.sin(pe*.35)*5,-8.2,ee.entry.z)}else j.visible=re.visible=Pe.visible=!1;if(D.visible=Me,Me){let ae=y.diver;D.position.set(ae.x,-5.9+Math.sin(pe*2)*.12*et,ae.z),D.rotation.set(-Math.PI*.34,-(ae.heading||0),0,"YXZ")}if(H&&!!y.lighthouseFixed!==Ie){Ie=!!y.lighthouseFixed;let ae=H.getObjectByName("keeper-lens");ae.material.color.setHex(Ie?16768928:8773329),ae.material.emissive.setHex(Ie?16762971:0),ae.material.emissiveIntensity=Ie?2:0,Z.intensity=Ie?50:0,X.userData.rotor.visible=Ie}X&&(X.userData.rotor.rotation.y=k.reducedMotion?0:pe*.16);let jn=Math.abs(xe.speed||0);for(let ae=0;ae<te.length;ae++){let ee=te[ae];ee.visible=!Me&&jn>1;let $e=6+ae*1.25+pe*3%1.25;ee.position.set(xe.x-Math.sin(xe.heading||0)*$e,Ve+.12,xe.z+Math.cos(xe.heading||0)*$e),ee.scale.set(1+ae*.12,.6+ae*.08,1),ee.material.opacity=(1-ae/10)*.25*Math.min(jn/6,1)}for(let ae=0;ae<Q.length;ae++){let ee=Q[ae],$e=pe*.04+ae*Nh/4;ee.position.set(119+Math.sin($e)*40,24+ae*3,57+Math.cos($e)*30),ee.rotation.y=-$e,ee.rotation.z=Math.sin(pe*2+ae)*.06*et,ee.visible=!Me&&ve==="high"}Pt.set(Me?y.diver?.x??xe.x:xe.x,Me?-5.4:Ve+1,Me?y.diver?.z??xe.z:xe.z);let St=-(xe.heading||0)+Oe,sn=!1;if(Me){let ae=ze[y.activeDive];Pt.set(y.diver.x,-7,y.diver.z),xn.set(Pt.x+20,Pt.y+34,Pt.z+26),x.fov=50,m.fog.color.setHex(3768202),m.fog.near=38,m.fog.far=120,m.background.setHex(3768202),A.visible=!1}else{A.visible=!0,x.fov=43,m.fog.color.setHex(11653834),m.fog.near=230,m.fog.far=620,m.background.setHex(11653834);let ae=Ge==="overhead",ee=ne.lighthouse;sn=!!ee&&Math.hypot(xe.x-ee.x,xe.z-ee.z)<78;let $e=ae||sn,Dt=$e?42:66,di=$e?108:61;xn.set(Pt.x+Math.sin(St)*Dt,Pt.y+di,Pt.z+Math.cos(St)*Dt)}if(y.mode==="island"||y.mode==="harbor"||y.mode==="result"){let ae=ne[y.currentIsland]||t[0];Pt.set(ae.x*.72+ae.dock.x*.28,ae.id==="lighthouse"?12:3,ae.z*.72+ae.dock.z*.28),xn.set(Pt.x+20,Pt.y+(ae.id==="lighthouse"?105:85),Pt.z+85),x.setViewOffset(Zi,Ai,Math.min(210,Zi*.16),0,Zi,Ai)}else x.clearViewOffset();if((fe!==Me||sn&&de===1)&&(x.position.copy(xn),xr.copy(Pt),fe=Me),!Me)for(let ae=0;ae<t.length;ae++){let ee=t[ae];Math.hypot(xn.x-ee.x,xn.z-ee.z)<ee.radius+8&&(xn.y=Math.max(xn.y,ee.id==="lighthouse"?80:60))}let Yt=k.reducedMotion?1:1-Math.exp(-Math.max(ke,.016)*4.2);x.position.lerp(xn,Yt),xr.lerp(Pt,Yt),x.lookAt(xr),x.updateProjectionMatrix(),(de%4===0||de===1)&&(p.position.copy(Pt).add(Aa.set(-100,180,-80)),p.target.position.copy(Pt),p.target.updateMatrixWorld(),c.shadowMap.needsUpdate=!0);for(let ae=0;ae<I.length;ae++){let ee=I[ae];ee.detail.visible=!Me&&Math.hypot(Pt.x-ee.data.x,Pt.z-ee.data.z)<(ve==="low"?230:420),ee.land.visible=!Me,ee.ring.position.y=Ve+.14,ee.ring.visible=!Me}for(let ae=0;ae<J.length;ae++)J[ae].visible=!Me;Ne.visible=!Me,Me?(g.intensity=2.8,p.intensity=1.8):(g.intensity=2.3,p.intensity=3);for(let ae of R)ae.object.visible=!Me&&Math.hypot(xe.x-ae.x,xe.z-ae.z)<180;X&&(X.userData.rotor.visible=Ie&&!Me);let tn=performance.now(),Ji=tn-he;Re.update.total+=Ji,Re.update.count++,Re.update.max=Math.max(Re.update.max,Ji),c.info.autoReset=!1,c.info.reset(),c.render(m,x),ue=Math.max(ue,c.info.render.calls),Te=Math.max(Te,c.info.render.triangles);let hi=performance.now()-tn;return Re.render.total+=hi,Re.render.count++,Re.render.max=Math.max(Re.render.max,hi),Rn[(Re.update.count-1)%2048]=Ji,Ji}function jc(y){return Ge=y==="overhead"||y==="overview"?"overhead":"follow",Oe=0,Ge}function E(y){Oe=uh.clamp(Oe+(Number(y)||0),-Math.PI*.8,Math.PI*.8)}function O(){return{renderer:"Three.js WebGLRenderer",cpu:Object.fromEntries(Object.entries(Re).map(([y,N])=>[y,{average:N.total/(N.count||1),max:N.max,count:N.count}])),revision:"180",camera:Ge,orbitOffset:Oe,updateP95:Array.from(Rn.subarray(0,Math.min(Re.update.count,2048))).sort((y,N)=>y-N)[Math.floor(Math.min(Re.update.count,2048)*.95)]||0,projections:ge?.mode==="diving"?Object.fromEntries(["entry","target"].map(y=>{let N=a.find(k=>k.id===ge.activeDive);return[y,G((y==="target"?vi(ge):N[y]).x,-6.8,(y==="target"?vi(ge):N[y]).z)]})):null,reducedMotion:rs,motionScale:rs?.18:1,cameraPosition:x.position.toArray(),cameraTarget:xr.toArray(),encounterSignature:{variantId:is,observations:$.filter(y=>y.data).map(y=>({id:y.data.id,x:y.data.x,z:y.data.z})),hazardPhase:ge?dn(ge).hazardPhase:0},maxDrawCalls:ue,maxTriangles:Te,textureBytesUpperBound:768*768*16*4/3+c.info.memory.textures*65536,drawCalls:c.info.render.calls,triangles:c.info.render.triangles,geometries:c.info.memory.geometries,textures:c.info.memory.textures,frames:de,quality:ve,software:d,renderScale:De,waterVertices:A.geometry.attributes.position.count,rig:ge?.rigId||"steady",sceneMeshes:m.children.length,actualSkeletons:M.length+2,transparentEffects:te.length+1,shadowMaps:c.shadowMap.enabled?1:0,celebration:{visible:K.visible,confetti:_.visible,elapsed:q}}}function V(){if(Ze)return;Ze=!0,vt.stopAllAction(),se.stopAllAction(),M.forEach(k=>k.mixer.stopAllAction());let y=new Set,N=new Set;m.traverse(k=>{k.geometry&&y.add(k.geometry),k.material&&(Array.isArray(k.material)?k.material:[k.material]).forEach(he=>N.add(he))}),y.forEach(k=>k.dispose());for(let k of no.values())N.add(k);for(let k of ss.values())N.add(k);N.add(w),N.add(b),N.forEach(k=>k.dispose()),c.dispose(),c.forceContextLoss()}function G(y,N,k,he={}){return Yi.set(y,N,k).project(x),he.x=(Yi.x+1)*Zi/2,he.y=(1-Yi.y)*Ai/2,he.z=Yi.z,he}return vr(),{update:Kc,resize:vr,dispose:V,setCamera:jc,orbit:E,stats:O,project:G,renderTotal:()=>Re.render.total}}var Nc=class{constructor(){this.ctx=null,this.buffers={},this.voices=new Set,this.loops=[],this.last=new Map,this.prefs={music:.35,sfx:.65},this.active=!1,this.ambient=!1,this.disposed=!1,this.resumePending=null,this.pendingCue=null,this.appliedMusic=null,this.appliedSfx=null}prepare(){if(this.preparing)return this.preparing;if(this.disposed)return Promise.resolve();let e=window.OfflineAudioContext||window.webkitOfflineAudioContext;return this.preparing=(async()=>{if(!e)throw new Error("Offline audio unavailable");let t=new e(1,1,44100);try{await Promise.all(["waves","music","sail","dock","discovery","danger","gull","helm","bubble"].map(async i=>{if(this.buffers[i])return;let r=await fetch(new URL(`./assets/audio/${i}.wav`,location.href));if(!r.ok)throw new Error("\u97F3\u8A0A\u8F09\u5165\u5931\u6557");let s=await t.decodeAudioData(await r.arrayBuffer());this.disposed||(this.buffers[i]=s)}))}finally{t=null}})().catch(t=>{throw this.preparing=null,t}),this.preparing}async unlock(){if(this.disposed)return;if(!this.ctx){let t=window.AudioContext||window.webkitAudioContext;if(!t)throw new Error("Web Audio unavailable");this.ctx=new t,this.master=this.ctx.createGain(),this.master.gain.value=.75,this.master.connect(this.ctx.destination),this.music=this.ctx.createGain(),this.effects=this.ctx.createGain(),this.music.gain.value=this.prefs.music*.32,this.effects.gain.value=this.prefs.sfx*.42,this.appliedMusic=this.prefs.music,this.appliedSfx=this.prefs.sfx,this.music.connect(this.master),this.effects.connect(this.master),this.ctx.onstatechange=()=>{this.active&&this.ctx.state==="suspended"&&this.resume()}}if(await this.ctx.resume(),await this.prepare(),this.disposed)return;this.setPrefs(this.prefs),this.setActive(this.active,this.ambient);let e=this.pendingCue;this.pendingCue=null,e&&this.active&&performance.now()-e.time<=500&&this.play(e.name,!0)}resume(){!this.ctx||this.ctx.state==="closed"||this.ctx.state==="running"||this.resumePending||(this.resumePending=this.ctx.resume().catch(()=>{}).finally(()=>{this.resumePending=null}))}setPrefs(e){this.prefs.music=Math.max(0,Math.min(1,Number(e.music)||0)),this.prefs.sfx=Math.max(0,Math.min(1,Number(e.sfx)||0)),this.ctx&&(this.appliedMusic!==this.prefs.music&&(this.appliedMusic=this.prefs.music,this.music.gain.setTargetAtTime(this.prefs.music*.32,this.ctx.currentTime,.03)),this.appliedSfx!==this.prefs.sfx&&(this.appliedSfx=this.prefs.sfx,this.effects.gain.setTargetAtTime(this.prefs.sfx*.42,this.ctx.currentTime,.03)))}setActive(e,t=e){if(this.active=e,this.ambient=t,!(!this.ctx||this.disposed)){e&&this.resume();for(let i of["waves","music"]){let r=e&&(i==="music"||t)&&this.buffers[i],s=this.loops.find(o=>o.sound===i);if(r&&!s){let o=this.ctx.createBufferSource();o.sound=i,o.buffer=this.buffers[i],o.loop=!0,o.connect(i==="music"?this.music:this.effects),o.start(),this.loops.push(o)}if(!r&&s){try{s.stop()}catch{}s.disconnect(),this.loops=this.loops.filter(o=>o!==s)}}if(!e){this.pendingCue=null;for(let i of this.voices){try{i.stop()}catch{}i.disconnect()}this.voices.clear()}}}play(e,t=!1){if(this.disposed||!this.active)return;if(!this.buffers[e]){this.pendingCue={name:e,time:performance.now()};return}if(!this.ctx||this.voices.size>=8)return;this.resume();let i=this.ctx.currentTime;if(!t&&i-(this.last.get(e)??-10)<.15)return;this.last.set(e,i);let r=this.ctx.createBufferSource();r.sound=e,r.buffer=this.buffers[e],r.connect(this.effects),this.voices.add(r),r.onended=()=>{this.voices.delete(r),r.disconnect()},r.start()}dispose(){this.setActive(!1),this.disposed=!0,this.buffers={},this.ctx&&(this.ctx.onstatechange=null),this.music?.disconnect(),this.effects?.disconnect(),this.master?.disconnect(),this.ctx?.close().catch(()=>{})}stats(){return{context:this.ctx?.state??"locked",loops:this.loops.length,voices:this.voices.size,loaded:Object.keys(this.buffers).length,music:this.prefs.music,sfx:this.prefs.sfx}}};function Xp({advance:n,eligible:e,now:t=()=>performance.now(),channel:i=new MessageChannel,enqueue:r=queueMicrotask}){let s=0,o=!1,a=!1,l=!1,c=0;function u(){if(a=!1,l||!o)return;if(!e()){o=!1;return}let h=t(),d=n(h)!==!1;if(!d){let f=h;for(let m=0;m<2048&&f===h;m++)f=t();f>h&&(d=n(f)!==!1)}d?o=!1:c++<2&&!a&&(a=!0,r(u))}return i.port1.onmessage=function(d){l||d.data!==s||!o||u()},{schedule(){l||o||(o=!0,c=0,i.port2.postMessage(s),a||(a=!0,r(u)))},invalidate(){s++,o=!1},dispose(){l=!0,s++,o=!1,i.port1.onmessage=null,i.port1.close(),i.port2.close()}}}function fr(){return!Bt&&!en&&zt==="running"&&(C.mode==="sailing"||C.mode==="diving")}var Qs=-1,lm=0,Ks=0,zc=new Float32Array(256),cm=new Float32Array(256),Bc=0;function jr(){let n=performance.now();kn.input(n,fr(),C.mode);let e=performance.now();bm(),fr()&&(cm[Bc++%256]=performance.now()-e,Qs<0&&(Qs=n,lm=En?.renderTotal()||0),Zc.schedule())}var Oh="tidebound-r4-20261112",um="stteak.tidebound.save.v1",hm="stteak.tidebound.preferences.v1",Y=n=>document.querySelector(n),Qr=n=>Lt.find(e=>e.id===n),jt=n=>String(n??"").replace(/[&<>"']/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[e]),Wt=new Nc,dm=Object.fromEntries(mi.map(n=>[n.id,n])),Tt={music:.35,sfx:.65,reducedMotion:matchMedia("(prefers-reduced-motion: reduce)").matches,quality:"auto",camera:matchMedia("(pointer:coarse)").matches?"follow":"overhead"},C=co(1),to=!0,Kr="";try{let n=localStorage.getItem(um);if(n){let e=vd(n);C=e.state,Kr=e.message}}catch{Kr="\u4FDD\u5B58\u8CC7\u6599\u7121\u6CD5\u8B80\u53D6\uFF0C\u5DF2\u5B89\u5168\u5EFA\u7ACB\u65B0\u822A\u6D77\u65E5\u8A8C\u3002",to=!1}try{let n=localStorage.getItem(hm),e={};try{e=JSON.parse(n||"{}")}catch{}(!e||typeof e!="object"||Array.isArray(e))&&(e={});for(let t of["music","sfx"])Number.isFinite(e[t])&&(Tt[t]=Math.max(0,Math.min(1,e[t])));typeof e.reducedMotion=="boolean"&&(Tt.reducedMotion=e.reducedMotion),["auto","low","high"].includes(e.quality)&&(Tt.quality=e.quality),["overhead","follow"].includes(e.camera)&&(Tt.camera=e.camera)}catch{to=!1}var En,zt="ready",Vc=window.parent===window,Bt=!1,en=null,zh="",fm=0,Zh=0,$p=0,qp=0,Bh=0,dr=C.contractId||Ut[0].id,Fc=C.rigId||mi[0].id,va=hn(C.seed).id,es=!1,Gc=!1,kh=null,Ot=new Set,Wc=new Map,ya=[],Jn={x:0,y:0},pr=null,qi=null,js=new Map,ui=null,ba=null,kc=1/0,Hh=null,Xc=new URLSearchParams(location.search).get("session");function $c(n,e={}){Xc&&window.parent!==window&&window.parent.postMessage({protocol:"stteak-game",version:1,sessionId:Xc,type:n,payload:e},location.origin)}function gr(){Zc.invalidate(),Qs=-1,kn.reset(),Ot.clear();let n=qi;if(qi=null,n){let r=Y("#sea");try{r.hasPointerCapture(n.id)&&r.releasePointerCapture(n.id)}catch{}}let e=[...js];js.clear(),Wc.clear();for(let[r,s]of e)try{s.hasPointerCapture(r)&&s.releasePointerCapture(r)}catch{}Jn={x:0,y:0},bm();let t=pr;pr=null;let i=Y("#helm");if(Y("#helm-knob")?.style.setProperty("transform","translate(0px,0px)"),i?.setAttribute("aria-valuenow","0"),t!==null)try{i?.hasPointerCapture?.(t)&&i.releasePointerCapture(t)}catch{}}function An(n,e=4500,t=!1){!n||!t&&performance.now()<Zh||(Y("#toast").textContent=n,Y("#toast").classList.add("visible"),fm=performance.now()+e)}function Jh(){to=!1,Y("#storage-warning").hidden=!1,Y("#storage-warning").textContent="\u672C\u6A5F\u5132\u5B58\u4E0D\u53EF\u7528\uFF1A\u6B64\u822A\u7A0B\u4ECD\u53EF\u73A9\uFF0C\u95DC\u9589\u9801\u9762\u5F8C\u9032\u5EA6\u53EF\u80FD\u6D88\u5931\u3002"}function Tn(){try{return localStorage.setItem(um,lu(C)),to=!0,Y("#storage-warning").hidden=!0,!0}catch{return Jh(),!1}}function _a(){try{localStorage.setItem(hm,JSON.stringify(Tt))}catch{Jh()}Wt.setPrefs(Tt),document.body.classList.toggle("reduced",Tt.reducedMotion)}async function Kn(){Gc=!0;try{await Wt.unlock(),wa()}catch{An("\u97F3\u8A0A\u5C1A\u672A\u8F09\u5165\uFF1B\u4ECD\u53EF\u4F7F\u7528\u756B\u9762\u63D0\u793A\u904A\u73A9\u3002")}}var Yp=null,Zp=null;function wa(){let n=zt==="running"&&!Bt&&!en,e=C.mode==="sailing"||C.mode==="diving";(n!==Yp||e!==Zp)&&(Yp=n,Zp=e,Wt.setActive(n,e))}function Ma(n){kn.reset(),zt=n,$c("game:state",{state:n})}function ns(){$h++,zh="",Yc(),Am(),Cm()}function Kh(n){if(!n||n.length===0)return;let e=Array.isArray(n)?n:[n],t="",i=!1;for(let r of e)if(r.type==="discovery"){let s=vn.find(o=>o.id===r.discoveryId);s&&(t+=(t?"\u3001":"")+s.name)}for(let r of e){r.type==="depart"&&(Ea=C.boat.sail,Sa=-1/0);let s=/^(damage|collision|rescue|warning|oxygen)$/.test(r.type);r.text&&(!t||s)&&(An(r.text,4500,s),s&&(i=!0)),(r.type==="bubble"||r.type==="station")&&(Wt.play("bubble"),Ta("oxygen")),r.type==="valve-warning"&&Wt.play("helm"),s?Wt.play("danger"):/^(part|complete|lighthouse|ending|observation)$/.test(r.type)&&!t?Wt.play("discovery"):/^(dock|deliver|delivery|result)$/.test(r.type)?Wt.play("dock"):/^(depart|dive|surface)$/.test(r.type)&&Wt.play("sail"),/^(dock|deliver|delivery|rescue|discovery|part|complete|lighthouse|observation|station)$/.test(r.type)&&Tn()}t&&(Wt.play("discovery"),i||(An(`\u5716\u9451\u65B0\u589E\uFF1A${t}\u3002`,5e3,!0),Zh=performance.now()+5e3)),wa()}function ci(n){try{Zh=0,zt==="ready"&&qc();let e=C.mode,t=n();C.mode!==e&&kn.reset(),Kh(t),(C.mode!==e||["harbor","island","result"].includes(C.mode))&&Tn(),ns()}catch(e){An("\u9019\u500B\u52D5\u4F5C\u672A\u5B8C\u6210\uFF0C\u8ACB\u518D\u8A66\u4E00\u6B21\u3002"),console.error(e)}}function mr(n=!0){es&&(Bt=n,gr(),n?(Ma("paused"),wn("pause"),Tn()):(ts(!1),Ma("running")),wa(),ns())}function qc(){Vc&&(Ea=C.boat.sail,Sa=-1/0,Ma("running"),Bt=!1,ts(!1),ns(),Kr&&(An(Kr,6500),Kr=""))}function pm(){if(!es)return;gr(),Kh(uo(C,"restart")),C.mode="harbor",C.currentIsland="harbor",C.lastSafeIsland="harbor";let n=Qr("harbor");C.boat.x=n.dock.x,C.boat.z=n.dock.z,C.boat.sail=0,C.boat.speed=0,C.boat.hull=100,C.result=null,Tn(),Bt=!1,ts(!1),Ma("running"),ns(),An("\u5DF2\u514D\u8CBB\u4FEE\u5FA9\u4E26\u8FD4\u56DE\u6BCD\u6E2F\u3002\u5716\u9451\u3001\u96F6\u4EF6\u8207\u4EA4\u4ED8\u7D00\u9304\u4FDD\u7559\u3002")}function ts(n=!0){en=null,mm(!1),Y("#modal").hidden=!0,Y("#modal-content").innerHTML="",gr(),n&&Bt&&(Bt=!1,Ma("running")),kh?.isConnected?kh.focus():Y("#pause-button").focus(),wa()}function Js(n,e="\u822A\u6D77\u624B\u518A"){return`<div class="modal-top"><div><span class="eyebrow">${e}</span><h2 id="modal-title">${n}</h2></div><button class="close" data-close aria-label="\u95DC\u9589">\xD7</button></div>`}function mm(n){for(let e of document.body.children)!["modal","toast","storage-warning","loading"].includes(e.id)&&e.tagName!=="SCRIPT"&&(e.inert=n)}function wn(n){en||(kh=document.activeElement),mm(!0),en=n,gr(),Y("#modal").hidden=!1;let e=Y("#modal-content");if(n==="map")e.innerHTML=Js("\u4E03\u5CF6\u6D77\u5716","YOUR CHART \xB7 \u5317\u65B9\u5728\u4E0A")+'<div class="map-layout"><div class="map-wrap" id="map-wrap"><svg id="chart" viewBox="-290 -290 580 580" role="img" aria-label="\u4E03\u5CF6\u6D77\u5716\uFF0C\u6A59\u8272\u865B\u7DDA\u70BA\u9078\u5B9A\u822A\u7DDA"><defs><pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M40 0H0V40" fill="none" stroke="#a3c3b7" stroke-width=".6"/></pattern></defs><rect x="-500" y="-500" width="1000" height="1000" fill="url(#grid)"/><g id="map-world"></g></svg><div class="map-actions"><button data-zoom="1.2" aria-label="\u653E\u5927\u6D77\u5716">\uFF0B</button><button data-zoom="0.8" aria-label="\u7E2E\u5C0F\u6D77\u5716">\u2212</button><button id="map-reset">\u5FA9\u4F4D</button></div></div><div class="map-copy"><span class="eyebrow">\u822A\u524D\u8B80\u6D77</span><h3>\u9806\u6D41\uFF0C\u4E5F\u8981\u770B\u6F6E\u3002</h3><p id="map-forecast"></p><label class="field">\u672C\u8D9F\u822A\u7DDA<select id="route-choice"><option value="0">\u5B89\u5168\u5916\u6D77\u8DEF</option><option value="1">\u6F6E\u7A97\u6377\u5F91</option></select></label><p id="route-description"></p><div id="map-branch-options"></div><div id="map-mission"></div><ul><li>\u25B3 \u4F60\u7684\u8239\uFF0C\u671D\u5C16\u7AEF\u524D\u9032</li><li>\u25CB \u6E2F\u53E3\u5916\u5074\u53EF\u9760\u6CCA</li><li>\u25B0 \u7901\u77F3\uFF1A\u6F32\u6F6E\u53EF\u8D8A\u3001\u9000\u6F6E\u7E5E\u884C</li><li>\u219D \u6D77\u6D41\uFF1A\u7BAD\u982D\u70BA\u6D41\u5411</li><li>\u25CE \u65CB\u6D41\uFF1A\u53EF\u7531\u5916\u5074\u7E5E\u958B</li><li>\u25C7 \u6DFA\u6C34\u6F5B\u9EDE\uFF1A\u9760\u5CB8\u5F8C\u4E0B\u6F5B</li><li>\u25CF \u89C0\u6E2C\u6D6E\u6A19\uFF1A\u53EF\u7565\u904E\uFF1B\u53D6\u6A23\u4F54\u8CA8\u8259\uFF0C\u8FD4\u6E2F +3 \u5370\u8A18</li></ul><p class="note">\u958B\u555F\u6D77\u5716\u6642\u66AB\u505C\u6F6E\u6C50\u8207\u6C27\u6C23\u3002\u53EF\u55AE\u6307\u62D6\u66F3\u3001\u96D9\u6307\u7E2E\u653E\uFF0C\u6216\u4F7F\u7528 \uFF0B\uFF0F\u2212\u3002</p></div></div>',Y("#route-choice").value=Bh,Y("#route-choice").onchange=t=>{Bh=+t.target.value,Jp()},nb(),Jp();else if(n==="journal")e.innerHTML=Js("\u628A\u767C\u73FE\u756B\u9032\u6D77\u5716\u3002","FIELD JOURNAL")+`<p>\u5DF2\u767B\u9304 ${C.discoveries.length}/${vn.length} \xB7 \u71C8\u5854\u96F6\u4EF6 ${C.parts.length}/3 \xB7 \u59D4\u8A17 ${C.completed.length}/${Ut.length}\u3002${C.storyComplete?"\u71C8\u5854\u5DF2\u9EDE\u4EAE\uFF1B\u81EA\u7531\u822A\u7A0B\u958B\u653E\u3002":"\u628A\u4E09\u500B\u6DFA\u6C34\u9EDE\u7684\u96F6\u4EF6\u5E36\u5F80\u5317\u65B9\u71C8\u5854\uFF0C\u518D\u56DE\u6BCD\u6E2F\u3002"}</p><div class="journal-grid">${vn.map(t=>`<article class="journal-entry ${C.discoveries.includes(t.id)?"":"locked"}"><span class="eyebrow">${jt(t.kind)} \xB7 ${jt(Qr(t.islandId)?.name)}</span><h3>${C.discoveries.includes(t.id)?jt(t.name):"\u5C1A\u672A\u8A18\u9304"}</h3><p>${C.discoveries.includes(t.id)?jt(t.description):"\u5728\u5C0D\u61C9\u5CF6\u5DBC\u8ABF\u67E5\u6216\u5B8C\u6210\u6DFA\u6C34\u63A2\u7D22\u3002"}</p></article>`).join("")}</div><div class="rule"></div><h3>\u81EA\u5DF1\u7684\u822A\u7A0B\u7D00\u9304</h3><p>${gm()}</p><button id="export-journal">\u532F\u51FA\u822A\u6D77\u8A8C JSON</button>`,Y("#export-journal").onclick=()=>{let t=Tn();tb("tidebound-journal.json",{buildId:Oh,state:JSON.parse(lu(C)),savedLocally:t})};else if(n==="help")e.innerHTML=Js("\u7B2C\u4E00\u6B21\u51FA\u6D77\u3002","HOW TO SAIL")+'<p>\u5148\u9078\u4E00\u4EFD\u59D4\u8A17\u8207\u5E06\u88DD\uFF0C\u5347\u5E06\u51FA\u6E2F\u3002\u6CBF\u6D77\u5716\u5230\u9054\u76EE\u6A19\u5CF6\u5916\u7684\u78BC\u982D\uFF0C\u6536\u5E06\u6E1B\u901F\uFF0C\u6309 E \u9760\u5CB8\u8207\u8ABF\u67E5\u3002\u5728\u540C\u4E00\u8D9F\u822A\u7A0B\u5B8C\u6210\u6E05\u55AE\u7684\u6BCF\u9805\u8ABF\u67E5\uFF0C\u518D\u56DE\u6BCD\u6E2F\u4EA4\u4ED8\uFF1B\u4E2D\u9014\u8FD4\u6BCD\u6E2F\u6703\u7D50\u675F\u672C\u8D9F\uFF0C\u4E0B\u8D9F\u9700\u91CD\u65B0\u8ABF\u67E5\uFF0C\u6C38\u4E45\u5716\u9451\u8207\u96F6\u4EF6\u4ECD\u4FDD\u7559\u3002\u7B2C\u4E00\u4EFD\u8981\u6BD4\u8F03\u73CA\u745A\u7063\u3001\u9752\u6839\u5CF6\u3001\u7409\u7483\u7901\u8207\u767D\u7FBD\u5CF6\uFF0C\u5169\u6B21\u6DFA\u6F5B\u540C\u6642\u53D6\u5F97\u71C8\u5854\u96F6\u4EF6\u3002</p><p>\u6D77\u4E0A\u91D1\u8272\u6D6E\u6A19\u662F\u53EF\u9078\u89C0\u6E2C\u3002\u53D6\u6A23\u9700\u8DDD\u96E2 9 \u516C\u5C3A\u5167\u3001\u901F\u5EA6\u4E0D\u8D85\u904E 1.4 m/s\uFF0C\u4F54 1 \u683C\u666E\u901A\u8CA8\u8259\uFF0C\u56DE\u6E2F\u53EF\u63DB 3 \u5370\u8A18\uFF1B\u4E5F\u53EF\u7E7C\u7E8C\u76F4\u822A\u6311\u6230\u6700\u5FEB\u7D00\u9304\u3002\u6D6E\u6A19\u4E0D\u6703\u649E\u50B7\u8239\u3002</p><table class="controls-table"><tr><td>A / D\u3001\u2190 / \u2192</td><td>\u8F49\u8235\uFF0C\u8239\u9996\u6C7A\u5B9A\u524D\u9032\u65B9\u5411</td></tr><tr><td>W / S\u3001\u2191 / \u2193</td><td>\u589E\u52A0 / \u6E1B\u5C11\u5E06\u529B\uFF1B\u4E0D\u662F\u524D\u9032 / \u5F8C\u9000</td></tr><tr><td>Space</td><td>\u5FEB\u901F\u6536\u5E06\uFF0C\u964D\u4F4E\u6163\u6027</td></tr><tr><td>E</td><td>\u9760\u5CB8 / \u8ABF\u67E5 / \u6F5B\u6C34\u53D6\u5F97\u7269\u4EF6</td></tr><tr><td>M / C / Esc</td><td>\u6D77\u5716 / \u93E1\u982D / \u66AB\u505C</td></tr><tr><td>\u6F5B\u6C34 WASD</td><td>\u5728\u6DFA\u6C34\u5340\u79FB\u52D5\uFF1B\u9760\u8FD1\u767C\u5149\u76EE\u6A19\u6309 E\uFF0C\u6D6E\u51FA\u9375\u96A8\u6642\u8FD4\u8239</td></tr></table><p>\u89F8\u63A7\u4F7F\u7528\u5DE6\u5074\u8F49\u8235\u9375\u53CA\u53F3\u5074\u5E06\u529B\u4E09\u6A94\uFF1B\u6F5B\u6C34\u6703\u589E\u52A0\u4E0A\u4E0B\u9375\u3002\u62D6\u66F3\u6D77\u9762\u53F3\u534A\u90E8\u6216\u6ED1\u9F20\u53F3\u9375\u62D6\u66F3\u53EF\u7E5E\u8239\u770B\u666F\u3002</p><p>\u25B0 \u9000\u6F6E\u9732\u7901\uFF0C\u9806\u6D41\u52A0\u901F\uFF0C\u25CE \u65CB\u6D41\u6709\u9031\u671F\u3002\u6E2F\u53E3\u300C\u7B49\u4E0B\u4E00\u6F6E\u300D\u53EF\u76F4\u63A5\u63A8\u9032\u6642\u9593\u3002\u6240\u6709\u5371\u96AA\u90FD\u6709\u5916\u6D77\u5B89\u5168\u8DEF\u3002\u8239\u9AD4\u4F4E\u65BC 25% \u6642\u8ACB\u8FD4\u6700\u8FD1\u6E2F\uFF1B\u8239\u6C89\u6216\u6C27\u6C23\u8017\u76E1\u6703\u6551\u63F4\uFF0C\u666E\u901A\u8CA8\u7269\u6E1B\u534A\uFF0C\u4E3B\u7DDA\u96F6\u4EF6\u8207\u5716\u9451\u4FDD\u7559\u3002</p><p>\u4E09\u6BB5\u6DFA\u6F5B\u4F9D\u5E8F\u70BA\u73CA\u745A\u2192\u7409\u7483\u2192\u661F\u76E4\u3002\u5148\u5B8C\u6210\u89C0\u5BDF\u7AD9\uFF0C\u518D\u64CD\u4F5C\u6BCF 6 \u79D2\u958B\u95DC\u7684\u6F6E\u6C50\u95A5\uFF0C\u6700\u5F8C\u9810\u5224\u6BCF 8 \u79D2\u6A6B\u6383\u7684\u5B88\u9418\u6D0B\u6D41\u3002\u9752\u7DA0\u6A19\u8A18\u662F\u4E0B\u4E00\u7AD9\uFF1B\u5B8C\u6210\u7AD9\u6703\u88DC\u6EFF\u6C27\u6C23\u3002\u6A19\u6E96\u822A\u7A0B\u88DC\u7D66 15 \u5206\u9418\uFF0C\u65B0\u96F6\u4EF6\u88DC\u6EFF\uFF0C120\uFF0F60\uFF0F15 \u79D2\u6703\u63D0\u9192\uFF1B\u8017\u76E1\u6551\u63F4\u3002\u6BCD\u6E2F\u53EF\u9078\u60A0\u904A\u6A21\u5F0F\u3002</p><p>\u96E2\u7DDA\u4E0D\u6263\u8CC7\u6E90\u3002\u6BCF 15 \u79D2\u3001\u66AB\u505C\u3001\u9760\u6E2F\u8207\u767C\u73FE\u5F8C\u81EA\u52D5\u4FDD\u5B58\uFF1B\u91CD\u8F09\u5F8C\u6309\u300C\u7E7C\u7E8C\u822A\u7A0B\u300D\u6062\u5FA9\u8239\u4F4D\u8207\u6C27\u6C23\u3002\u57FA\u790E\u4FEE\u5FA9\u514D\u8CBB\u3002</p><button class="primary" data-close>\u660E\u767D\u4E86\uFF0C\u53BB\u770B\u6D77</button>';else if(n==="restart")e.innerHTML=Js("\u7D50\u675F\u9019\u8D9F\u822A\u7A0B\uFF1F","RETURN TO HARBOR")+'<p>\u8FD4\u56DE\u6BCD\u6E2F\u4E26\u514D\u8CBB\u4FEE\u8239\u3002\u672A\u4EA4\u4ED8\u666E\u901A\u8CA8\u7269\u6E1B\u534A\uFF0C\u4E3B\u7DDA\u96F6\u4EF6\u3001\u5716\u9451\u548C\u5B8C\u6210\u7D00\u9304\u4FDD\u7559\u3002</p><div class="actions"><button data-close>\u7E7C\u7E8C\u822A\u884C</button><button id="confirm-restart" class="primary">\u78BA\u8A8D\u8FD4\u6E2F</button></div>',Y("#confirm-restart").onclick=pm;else if(n==="reset")e.innerHTML=Js("\u6E05\u9664\u6574\u672C\u822A\u6D77\u8A8C\uFF1F","ERASE LOCAL PROGRESS")+'<p>\u6B64\u64CD\u4F5C\u6703\u6E05\u9664\u672C\u6A5F\u7684\u96F6\u4EF6\u3001\u5716\u9451\u3001\u59D4\u8A17\u8207\u6700\u4F73\u7D00\u9304\u3002\u53EF\u5148\u5F9E\u822A\u6D77\u8A8C\u532F\u51FA\u5099\u4EFD\u3002</p><div class="actions"><button data-close>\u4FDD\u7559\u9032\u5EA6</button><button id="confirm-reset">\u6E05\u9664\u4E26\u91CD\u65B0\u958B\u59CB</button></div>',Y("#confirm-reset").onclick=()=>{C=co(1),Tn(),ts(),ns(),An("\u5DF2\u5EFA\u7ACB\u5168\u65B0\u822A\u6D77\u8A8C\u3002")};else{e.innerHTML=Js(Bt?"\u628A\u6642\u9593\u7559\u7D66\u6D77\u3002":"\u8072\u97F3\u8207\u756B\u9762","PAUSED \xB7 \u5DF2\u66AB\u505C")+`<p>\u6F6E\u6C50\u3001\u8239\u9AD4\u8207\u6C27\u6C23\u5747\u5DF2\u505C\u6B62\u3002\u95DC\u9589\u6B64\u8996\u7A97\u5373\u53EF\u7E7C\u7E8C\u3002</p><div class="settings-grid"><label>\u97F3\u6A02 <input id="music" type="range" min="0" max="1" step="0.05" value="${Tt.music}"></label><label>\u97F3\u6548 <input id="sfx" type="range" min="0" max="1" step="0.05" value="${Tt.sfx}"></label><label><input id="reduced" type="checkbox" ${Tt.reducedMotion?"checked":""}> \u6E1B\u5C11\u6D6A\u9AD8\u8207\u93E1\u982D\u52D5\u614B</label><label>\u756B\u8CEA <select id="quality"><option value="auto">\u81EA\u52D5 \xB7 \u9069\u5408\u6B64\u88DD\u7F6E</option><option value="high">\u6A19\u6E96 \xB7 \u9670\u5F71</option><option value="low">\u7BC0\u80FD \xB7 \u4F4E DPR</option></select></label></div><div class="actions"><button class="primary" data-close>\u7E7C\u7E8C</button><button id="show-help">\u64CD\u4F5C\u8AAA\u660E</button><button id="save-voyage">\u5132\u5B58\u822A\u7A0B</button><button id="restart-button">\u91CD\u65B0\u6E96\u5099\u51FA\u6D77</button></div><div class="rule"></div><p class="note">${Oh} \xB7 \u4FDD\u5B58 schema 1 \xB7 \u9032\u5EA6\u53EA\u5B58\u6B64\u700F\u89BD\u5668\uFF0C\u7121\u96F2\u7AEF\u540C\u6B65\u3002</p><button id="reset-button">\u6E05\u9664\u672C\u6A5F\u9032\u5EA6\u2026</button>`,Y("#quality").value=Tt.quality;for(let t of["music","sfx"])Y("#"+t).oninput=i=>{Tt[t]=+i.target.value,_a()};Y("#reduced").onchange=t=>{Tt.reducedMotion=t.target.checked,_a()},Y("#quality").onchange=t=>{Tt.quality=t.target.value,_a()},Y("#save-voyage").onclick=()=>An(Tn()?"\u822A\u7A0B\u5DF2\u5132\u5B58\u3002\u4E0B\u6B21\u53EF\u5F9E\u6B64\u523B\u7E7C\u7E8C\u3002":"\u822A\u7A0B\u672A\u80FD\u5132\u5B58\u3002\u8ACB\u4FDD\u7559\u6B64\u9801\uFF0C\u6216\u5148\u532F\u51FA\u822A\u6D77\u8A8C\u5099\u4EFD\u3002",6500),Y("#show-help").onclick=()=>wn("help"),Y("#restart-button").onclick=()=>wn("restart"),Y("#reset-button").onclick=()=>wn("reset")}e.querySelectorAll("[data-close]").forEach(t=>t.onclick=()=>ts()),e.querySelector("button")?.focus(),wa()}function gm(){let n=C.records||{},e=C.contractId,t=n.byContract?.[e],i=Ut.find(a=>a.id===e)?.name||"\u672C\u59D4\u8A17",r=Number.isFinite(t?.bestTime)?`${Math.floor(Math.round(t.bestTime)/60)} \u5206 ${Math.round(t.bestTime)%60} \u79D2`:"\u5C1A\u7121",s=n.byVariant?.[e]?.[C.rigId]?.[C.voyage.variantId||1];return`${s?`\u672C\u5E06\u88DD\uFF0F\u6D77\u5716 ${C.voyage.variantId||1}\uFF1A${Math.round(s.bestTime)} \u79D2 \xB7 ${s.rank} \xB7 \u6700\u591A\u53D6\u6A23 ${s.optionalSamples}\u3002`:"\u672C\u5E06\u88DD\uFF0F\u6D77\u5716\u5C1A\u7121\u7D00\u9304\u3002"} \u91CD\u822A\u76EE\u6A19\uFF1A\u9806\u98A8\u5E06\u6700\u5FEB\u822A\u7A0B\u3001\u7A69\u5B9A\u5E06\u7121\u640D\u91D1\u724C\u3001\u9060\u822A\u5E06\u6700\u5927\u53D6\u6A23\u3002\u820A\u7248\uFF0F\u8DE8\u5E06\u88DD\u7D9C\u5408\uFF1A${i}\uFF1A\u5B8C\u6574\u822A\u7A0B\u6700\u4F73 ${r} \xB7 \u6700\u5C11\u640D\u50B7 ${Number.isFinite(t?.bestDamage)?Math.round(t.bestDamage)+"%":"\u5C1A\u7121"}\u3002\u50C5\u6BD4\u8F03\u672C\u59D4\u8A17\u5B8C\u6210\u4E14\u7121\u6551\u63F4\u7684\u822A\u7A0B\uFF1B\u4E0D\u540C\u5E06\u88DD\u53EF\u6311\u6230\u3002\u6B77\u4F86\u8FD4\u822A ${n.voyages||0} \u6B21 \xB7 \u6551\u63F4 ${n.rescues||0} \u6B21\u3002\u822A\u6D77\u5370\u8A18 ${C.credits||0} \u679A\uFF08\u50C5\u4F9B\u6536\u85CF\uFF0C\u5E06\u88DD\u8207\u4FEE\u5FA9\u514D\u8CBB\uFF09\u3002`}function tb(n,e){let t=URL.createObjectURL(new Blob([JSON.stringify(e,null,2)],{type:"application/json"})),i=document.createElement("a");i.href=t,i.download=n,i.click(),setTimeout(()=>URL.revokeObjectURL(t),1e3)}var qt={x:-290,z:-290,size:580};function nb(){qt={x:-290,z:-290,size:580};let n=Y("#chart"),e=Y("#map-wrap"),t=new Map,i=0,r=s=>{let o=qt.size;qt.size=Math.max(180,Math.min(800,o/s)),qt.x+=(o-qt.size)/2,qt.z+=(o-qt.size)/2,n.setAttribute("viewBox",`${qt.x} ${qt.z} ${qt.size} ${qt.size}`)};e.onpointerdown=s=>{s.target.closest("button")||(t.set(s.pointerId,{x:s.clientX,y:s.clientY}),e.setPointerCapture(s.pointerId))},e.onpointermove=s=>{let o=t.get(s.pointerId);if(!o)return;let a=s.clientX-o.x,l=s.clientY-o.y;if(t.set(s.pointerId,{x:s.clientX,y:s.clientY}),t.size===1){let c=qt.size/e.clientWidth;qt.x-=a*c,qt.z-=l*c,n.setAttribute("viewBox",`${qt.x} ${qt.z} ${qt.size} ${qt.size}`)}else{let[c,u]=[...t.values()],h=Math.hypot(c.x-u.x,c.y-u.y);i&&r(h/i),i=h}},e.onpointerup=e.onpointercancel=s=>{t.delete(s.pointerId),i=0},e.querySelectorAll("[data-zoom]").forEach(s=>s.onclick=()=>r(+s.dataset.zoom)),Y("#map-reset").onclick=()=>{qt={x:-290,z:-290,size:580},r(1)}}function Jp(){if(en!=="map")return;let n=["harbor","result"].includes(C.mode),e=Ut.find(a=>a.id===(n?dr:C.contractId)),t=e?.routes?.[Bh],i=Pi(C.time),r="";for(let a of gi)r+=`<ellipse cx="${a.x}" cy="${a.z}" rx="${a.radius||a.r||15}" ry="${a.radius||a.r||15}" fill="#e6c997" opacity=".6"/><text x="${a.x-5}" y="${a.z+4}" style="font-size:14px">\u25B0</text>`;for(let a of xi)r+=`<text x="${a.x-6}" y="${a.z+5}" style="font-size:20px">\u25CE</text>`;for(let a of ls){let l=ho(a.x,a.z,C.time,n?va:C.seed),c=Math.atan2(l.z,l.x)*180/Math.PI;r+=`<text x="0" y="5" text-anchor="middle" transform="translate(${a.x},${a.z}) rotate(${c})" style="font-size:19px">${l.strength>.02?"\u219D":"\xB7"}</text>`}if(t?.waypoints&&(r+=`<polyline class="route" points="${t.waypoints.map(a=>`${a.x},${a.z}`).join(" ")}"/>`),!n&&t?.legs){let a=Ii(C).nextObjective,l=t.legs.find(c=>c.toIslandId===(a?.islandId||"harbor"));l&&(r+=`<polyline class="active-leg" points="${l.waypoints.map(c=>`${c.x},${c.z}`).join(" ")}"/>`)}for(let a of Lt)r+=`<circle cx="${a.x}" cy="${a.z}" r="${a.radius}" fill="${typeof a.color=="string"?a.color:"#8cae88"}" stroke="#ede4bc" stroke-width="6"/><circle cx="${a.dock.x}" cy="${a.dock.z}" r="4" fill="#fff9dc" stroke="#285d60"/><text x="${a.x}" y="${a.z-a.radius-9}" text-anchor="middle">${jt(a.name)}</text>`;for(let a of hn(n?va:C.voyage.variantId||C.seed).observations)r+=`<g class="map-survey" data-observation="${a.id}"><title>${jt(a.name)}</title><circle cx="${a.x}" cy="${a.z}" r="3" fill="#b58030"/></g>`;for(let a of Zt){let l=a.target||Qr(a.islandId).dock;r+=`<text x="${l.x}" y="${l.z+4}" style="font-size:14px">\u25C7</text>`}r+=`<path id="map-boat" d="M0 -9L6 7L0 4L-6 7Z" transform="translate(${C.boat.x} ${C.boat.z}) rotate(${C.boat.heading*180/Math.PI})"/>`;let s=C.mode==="sailing"?Ia(C):null,o=Sr(C);if(s)for(let a of s.options)r+=`<polyline class="branch-${a.kind}" points="${[C.boat,...a.waypoints].map(l=>`${l.x},${l.z}`).join(" ")}"/>`;o&&(r+=`<polyline class="branch-selected" points="${[C.boat,...o.waypoints.slice(o.index)].map(a=>`${a.x},${a.z}`).join(" ")}"/>`),Gh(Y("#map-branch-options"),s,!0),Y("#map-world").innerHTML=r,Y("#map-forecast").textContent=`\u73FE\u5728 ${i.label} \xB7 ${Math.ceil(i.secondsToChange)} \u79D2\u5F8C ${i.nextLabel}\u3002\u63A5\u8457 ${(i.forecast||[]).map(a=>`${a.label}\uFF08${Math.ceil(a.startsIn??a.secondsUntil)}\u79D2\u5F8C\uFF09`).join(" \u2192 ")}`,Y("#route-description").textContent=t?.description||"\u9078\u64C7\u59D4\u8A17\u5F8C\u986F\u793A\u822A\u7DDA\u3002\u5B89\u5168\u8DEF\u6C38\u9060\u958B\u653E\u3002",Y("#map-mission").innerHTML=Vh(e?.id,n)}function ib(){let n=`${C.mode}|${zt}|${C.currentIsland}|${C.discoveries.length}|${C.parts.length}|${C.completed.length}|${C.voyage.observed?.length}|${C.lighthouseFixed}|${C.storyComplete}|${Bt}`;if(zh===n)return;zh=n;let e=Y("#panel"),t=["harbor","island","result"].includes(C.mode)||zt==="ready";if(e.hidden=!t,document.body.classList.toggle("in-menu",t),!t)return;if(zt==="ready"&&["sailing","diving"].includes(C.mode)){e.innerHTML=`<span class="eyebrow">WELCOME BACK \xB7 \u822A\u7A0B\u5DF2\u4FDD\u5B58</span><h2>\u6D77\u98A8\uFF0C\u7B49\u4F60\u56DE\u4F86\u3002</h2><p>\u5DF2\u6062\u5FA9\u8239\u4F4D\u3001\u822A\u6D77\u8A8C\u8207\u672C\u8D9F\u8ABF\u67E5\u3002\u96E2\u7DDA\u671F\u9593\u6F6E\u6C50\u8207\u6C27\u6C23\u5747\u5DF2\u505C\u6B62\u3002</p><div class="progress-line"><span>\u8239\u9AD4 ${Math.ceil(C.boat.hull)}%</span><span>\u96F6\u4EF6 ${C.parts.length}/3</span></div><button id="continue-voyage" class="primary">\u7E7C\u7E8C\u822A\u7A0B \u2197</button><button id="continue-map" class="secondary">\u5148\u770B\u6D77\u5716</button>`,Y("#continue-voyage").onclick=()=>{Kn(),qc()},Y("#continue-map").onclick=()=>wn("map");return}if(C.mode==="result"&&zt!=="ready"){e.innerHTML=`<span class="eyebrow">VOYAGE COMPLETE</span><h2>${jt(C.result?.title||"\u53C8\u4E00\u6BB5\u822A\u7A0B\uFF0C\u5BEB\u9032\u6D77\u5716\u3002")}</h2><p>${jt(C.result?.text||"\u5DF2\u5B89\u5168\u8FD4\u822A\uFF0C\u9032\u5EA6\u8207\u6700\u4F73\u7D00\u9304\u4FDD\u5B58\u5728\u6B64\u88DD\u7F6E\u3002")} ${C.result?.rank?`\u672C\u8D9F ${jt(C.result.rank.toUpperCase())} \xB7 \u53EF\u9078\u53D6\u6A23 ${C.result.optionalSamples}`:""}</p><div class="progress-line"><span>\u5716\u9451 ${C.discoveries.length}/${vn.length}</span><span>\u96F6\u4EF6 ${C.parts.length}/3</span><span>\u59D4\u8A17 ${C.completed.length}/${Ut.length}</span></div><p class="note">${gm()}</p><button class="primary" id="next-voyage">${C.storyComplete?"\u5C55\u958B\u81EA\u7531\u822A\u7A0B":"\u6E96\u5099\u4E0B\u4E00\u8D9F\u822A\u7A0B"} \u2197</button><button class="secondary" id="result-journal">\u7FFB\u95B1\u822A\u6D77\u8A8C</button>`,Y("#next-voyage").onclick=()=>{C.mode="harbor",C.result=null,ns()},Y("#result-journal").onclick=()=>wn("journal");return}if(C.mode==="island"){let r=Qr(C.currentIsland),s=Zt.find(o=>o.islandId===r.id);e.innerHTML=`<span class="eyebrow">ASHORE \xB7 \u5DF2\u5B89\u5168\u9760\u6CCA</span><h2>${jt(r.name)}</h2><p>${r.id==="lighthouse"?"\u4E09\u4EFD\u6DF1\u6D77\u8A18\u61B6\uFF0C\u80FD\u8B93\u9019\u5EA7\u71C8\u5854\u518D\u6B21\u767C\u5149\u3002\u4FEE\u5FA9\u5F8C\u8FD4\u56DE\u6BCD\u6E2F\uFF0C\u5B8C\u6210\u6545\u4E8B\u3002":"\u6536\u8D77\u5E06\uFF0C\u807D\u4E00\u807D\u5CF6\u7684\u8072\u97F3\u3002\u8ABF\u67E5\u5CB8\u908A\u7684\u7269\u7A2E\u8207\u907A\u8DE1\uFF0C\u628A\u767C\u73FE\u5BEB\u5165\u822A\u6D77\u8A8C\u3002"}</p>${r.id==="gull"||r.id==="mangrove"?`<p class="note" id="island-lesson">${r.id==="gull"?"\u71D5\u9DD7\u907F\u958B\u6A6B\u6383\u7684\u6D0B\u6D41\u3002\u661F\u76E4\u6C34\u5EAD\u7684\u5B88\u9418\u6D0B\u6D41\u6BCF 8 \u79D2\u5FAA\u74B0\uFF0C\u7425\u73C0\u8272\u9810\u8B66 2 \u79D2\u5F8C\u6A6B\u6383\uFF1B\u7E5E\u958B\u6709\u8272\u5713\u5708\u5373\u53EF\u5B89\u5168\u901A\u904E\u3002":"\u9752\u6839\u822A\u8A8C\uFF1A\u4E0B\u4E00\u7AD9\u7409\u7483\u7901\u6709\u6F6E\u6C50\u95A5\u9580\uFF0C\u6BCF 6 \u79D2\u958B\u95DC\uFF0C\u9752\u7DA0\u8272\u53EF\u64CD\u4F5C\uFF0C\u7425\u73C0\u8272\u9810\u544A\u958B\u555F\u3002\u6BCF\u500B\u95A5\u9580\u90FD\u80FD\u88DC\u6EFF\u6C27\u6C23\u3002"}</p>`:""}${Vh()}<div class="progress-line"><span>\u8239\u9AD4 ${Math.round(C.boat.hull)}%</span><span>\u96F6\u4EF6 ${C.parts.length}/3</span></div><button class="primary" id="investigate">${r.id==="lighthouse"?"\u8ABF\u67E5 / \u4FEE\u5FA9\u71C8\u5854":"\u8ABF\u67E5\u6B64\u5CF6"} <kbd>E</kbd></button>${s?`<button class="primary" id="dive">\u6DFA\u6C34\u63A2\u7D22 \xB7 ${jt(s.name)}</button><p class="note">${s.oxygen} \u79D2\u6C27\u6C23 \xB7 ${yn(C,s.id).name}\u3002\u4F9D\u5E8F\u5B8C\u6210\u767C\u5149\u7AD9\uFF0C\u6BCF\u7AD9\u88DC\u6EFF\u6C27\u6C23\uFF0C\u518D\u53D6\u96F6\u4EF6\u3002${s.id==="reef-dive"?"\u95A5\u9580\u6BCF 6 \u79D2\u5FAA\u74B0\uFF0C\u9752\u7DA0\u6642\u6309 E\u3002":s.id==="ruin-dive"?"\u5165\u6C34\u6709 2 \u79D2\u7DE9\u885D\uFF0C\u53EF\u5148\u96E2\u958B\u6D0B\u6D41\u5708\u3002\u7E5E\u958B\u73CA\u745A\u8272\u6D0B\u6D41\u5708\uFF1B\u7425\u73C0\u8272\u70BA 2 \u79D2\u9810\u8B66\u3002":"\u89C0\u5BDF\u5E87\u8B77\u3001\u98DF\u7269\u8207\u80B2\u5E7C\u5834\u3002"}</p>`:""}<div class="actions"><button id="leave-island">\u56DE\u8239\uFF0C\u7E7C\u7E8C\u822A\u884C \u2197</button><button id="island-map">\u67E5\u770B\u6D77\u5716</button></div><p class="note">\u5DF2\u5728\u6B64\u5B89\u5168\u6E2F\u4FDD\u5B58\uFF1B\u91CD\u8F09\u56DE\u5230\u9019\u88E1\u3002</p>`,Y("#investigate").onclick=()=>ci(()=>au(C)),Y("#dive")?.addEventListener("click",()=>{Kn(),ci(()=>md(C,s.id))}),Y("#leave-island").onclick=()=>{Kn(),ci(()=>su(C,C.contractId||dr,C.rigId||Fc))},Y("#island-map").onclick=()=>wn("map");return}e.innerHTML=`<span class="eyebrow">CHAPTER 01 \xB7 THE LIGHT WE BRING HOME</span><h2>${C.storyComplete?"\u6D77\uFF0C\u4ECD\u6709\u65B0\u6545\u4E8B\u3002":"\u7D66\u6D77\u4E00\u76DE\u71C8\u3002"}</h2><p>${zt==="ready"?"\u4F60\u662F\u4E03\u5CF6\u7684\u65B0\u4EFB\u822A\u6D77\u54E1\u3002\u9078\u4E00\u4EFD\u59D4\u8A17\uFF0C\u6CBF\u6D77\u6D41\u5C0B\u627E\u5CF6\u5DBC\uFF0C\u8B93\u5317\u65B9\u71C8\u5854\u91CD\u65B0\u767C\u5149\u3002":"\u6BCD\u6E2F\u70BA\u4F60\u514D\u8CBB\u4FEE\u8239\u3002\u9078\u64C7\u76EE\u7684\u5730\u3001\u5E06\u88DD\u8207\u822A\u7DDA\uFF0C\u518D\u628A\u4E0B\u4E00\u500B\u767C\u73FE\u5E36\u56DE\u4F86\u3002"}</p><button class="primary" id="depart">\u51FA\u6E2F \xB7 \u958B\u59CB\u822A\u7A0B \u2197</button><p class="note">W \u5347\u5E06 \xB7 A D \u8F49\u8235 \xB7 \u7A7A\u767D\u9375\u6536\u5E06 \xB7 E \u9760\u5CB8<br>\u4E5F\u53EF\u5728\u4E0B\u65B9\u8ABF\u6574\u59D4\u8A17\u3001\u5E06\u88DD\u8207\u6D77\u6D41\u3002</p><label class="field">01 / \u9019\u8D9F\u60F3\u5E36\u56DE\u4EC0\u9EBC<select id="contract">${Ut.map((r,s)=>`<option value="${r.id}">${C.completed.includes(r.id)?"\u2713 ":""}${String(s+1).padStart(2,"0")} ${jt(r.name)}</option>`).join("")}</select></label><p class="note" id="contract-note"></p><div id="contract-objectives"></div><label class="field">02 / \u9078\u4E00\u5F35\u5E06<select id="rig">${mi.map(r=>`<option value="${r.id}">${jt(r.name)} \xB7 ${jt(r.description)}</option>`).join("")}</select></label><label class="field">03 / \u906D\u9047\u6D77\u5716<select id="seed"><option value="1">01 \xB7 \u4FE1\u98A8\u6668\u822A</option><option value="2">02 \xB7 \u5CF6\u9593\u5B63\u6D41</option><option value="3">03 \xB7 \u56DE\u8072\u822A\u7DDA</option></select></label><label class="field">04 / \u9060\u822A\u88DC\u7D66<select id="difficulty"><option value="standard">\u6A19\u6E96 \xB7 15 \u5206\u9418\u88DC\u7D66</option><option value="relaxed">\u60A0\u904A \xB7 \u4E0D\u9650\u9060\u822A\u88DC\u7D66</option></select></label><p class="note">\u6A19\u6E96\u88DC\u7D66\u50C5\u822A\u884C\u8207\u6F5B\u6C34\u6642\u6D88\u8017\uFF1B\u9996\u6B21\u5B8C\u6210\u6BCF\u500B\u96F6\u4EF6\u88DC\u6EFF\u3002\u8017\u76E1\u6703\u6551\u63F4\uFF0C\u6C38\u4E45\u9032\u5EA6\u4FDD\u7559\u3002\u6F5B\u6C34\u4ECD\u9700\u6C27\u6C23\u3002</p><div class="actions"><button id="wait-tide">\u7B49\u4E0B\u4E00\u6F6E</button><button id="plan-route">\u898F\u5283\u822A\u7DDA</button><button id="help">\u64CD\u4F5C\u8AAA\u660E</button></div><div class="rule"></div><div class="progress-line"><span>\u5716\u9451 ${C.discoveries.length}/${vn.length}</span><span>\u96F6\u4EF6 ${C.parts.length}/3</span><span>\u59D4\u8A17 ${C.completed.length}/${Ut.length}</span></div><p class="note">7 \u5CF6\u624B\u5DE5\u6D77\u57DF \xB7 \u55AE\u4EBA\u672C\u6A5F\u4FDD\u5B58<br>${jt(Kr||"\u78B0\u7901\u53EF\u4FEE\u5FA9\uFF0C\u5931\u6557\u53EF\u6551\u63F4\u3002\u653E\u5FC3\u51FA\u767C\u3002")}</p>`,Y("#contract").value=dr,Y("#rig").value=Fc,Y("#seed").value=va,Y("#difficulty").value=C.difficulty,Y("#difficulty").onchange=r=>{C.difficulty=r.target.value,Tn()};let i=()=>{Y("#contract-note").textContent=Ut.find(r=>r.id===dr)?.description||"",Y("#contract-objectives").innerHTML=Vh(dr,!0)};i(),Y("#contract").onchange=r=>{dr=r.target.value,i()},Y("#rig").onchange=r=>Fc=r.target.value,Y("#seed").onchange=r=>va=+r.target.value,Y("#depart").onclick=()=>{Kn(),Wt.setActive(!0,!0),Wt.play("sail",!0),qc(),C.seed=va,ui=null,ci(()=>su(C,dr,Fc)),An("\u5148\u6309 W \u5347\u5E06\uFF0CA / D \u8F49\u8235\u3002\u6309 M \u770B\u6D77\u5716\uFF1B\u5230\u5CF6\u5916\u91D1\u8272\u6CCA\u4F4D\u6536\u5E06\u6309 E\u3002",6500)},Y("#wait-tide").onclick=()=>{ci(()=>xd(C)),Tn()},Y("#plan-route").onclick=()=>wn("map"),Y("#help").onclick=()=>wn("help")}function Vh(n=C.contractId,e=!1){let t=Ii(C,n);return t?.objectives?`<ol class="contract-checklist" aria-label="${e?"\u59D4\u8A17\u8981\u6C42":"\u672C\u8D9F\u8ABF\u67E5\u9032\u5EA6"}">${t.objectives.map(i=>`<li class="${!e&&i.done?"done":""}">${!e&&i.done?"\u2713 ":""}${jt(i.name)}${i.kind==="dive"?" \xB7 \u6DFA\u6F5B":""}</li>`).join("")}</ol>${!e&&t.readyToDeliver?'<p class="note">\u672C\u8D9F\u8ABF\u67E5\u9F4A\u5099\uFF0C\u8FD4\u56DE\u6F6E\u97F3\u6E2F\u4EA4\u4ED8\u3002</p>':""}`:""}var Kp=null,jp=-1,Qp=-1,em="";function rb(n){let e=Math.floor(C.time);return(Kp!==n||jp!==e||Qp!==C.seed)&&(Kp=n,jp=e,Qp=C.seed,em=sb(n)),em}function sb(n){let e=ho(n.x,n.z,C.time,C.seed);if(e.strength>.12){let i=e.z<0?"\u5317":"\u5357",r=e.x<0?"\u897F":"\u6771";return`\u6B64\u8655\u6B63\u5411${Math.abs(e.z)>Math.abs(e.x)*2?i:Math.abs(e.x)>Math.abs(e.z)*2?r:i+r}\u6D41 ${e.strength.toFixed(1)} m/s\uFF1B\u9760\u8FD1\u6642\u6536\u5E06\u4ECD\u6703\u6F02\u79FB\u3002\u53EF\u7559\u5728\u6D41\u9053\u501F\u529B\uFF0C\u6216\u5411\u5916\u7DE3\u8D70\u7A69\u5B9A\u6C34\u8DEF\u3002`}let t=gi.find(i=>Math.hypot(i.x-n.x,i.z-n.z)<65);return t?`${t.name}${Pi(C.time).height>t.safeHeight?"\u76EE\u524D\u6C34\u4F4D\u53EF\u901A\u884C\uFF1B\u4ECD\u8981\u770B\u4E0B\u4E00\u6F6E\u9810\u5831":"\u76EE\u524D\u9732\u7901\uFF1B\u6CBF\u6D77\u5716\u5916\u5074\u6DF1\u6C34\u8DEF\u7E5E\u884C"}\u3002`:n.note}function ob(n,e){ui=null,ci(()=>hd(C,n.id,e)),Tn(),Sr(C)&&Y("#route-cancel").focus({preventScroll:!0})}function Gh(n,e,t=!1){let i=e?`${e.id}:${e.direction}:${e.entryIndex??0}:${e.options.map(r=>`${r.id}:${r.available}`).join(",")}`:"";if(n.dataset.choice!==i){n.dataset.choice=i,n.replaceChildren();for(let r of e?.options||[]){let s=document.createElement("button");s.type="button",s.disabled=r.available===!1;let o=document.createElement("span");o.textContent=r.label;let a=document.createElement("em"),l=document.createElement("small");s.append(o,a,l),s.dataset.option=r.id,s.onclick=()=>{t&&ts(),ob(e,r.id),s.blur()},n.append(s)}}for(let r of e?.options||[]){let s=n.querySelector(`[data-option="${r.id}"]`);s&&(s.querySelector("small").textContent=`${r.reason} ${r.condition||""}`,s.querySelector("em").textContent=`\u8DEF\u9EDE ${r.distanceMetres} m \xB7 \u7D04 ${r.estimatedSeconds} s`)}if(t&&e&&!n.querySelector(".route-estimate-note")){let r=document.createElement("p");r.className="route-estimate-note note",r.textContent="\u79D2\u6578\u6309\u6EFF\u5E06\u8207\u76EE\u524D\u6D41\u6CC1\u4F30\u7B97\u5230\u5404\u81EA\u8DEF\u9EDE\uFF0C\u4E0D\u542B\u8F49\u8235\u3001\u505C\u8239\u8207\u5F8C\u7E8C\u822A\u7A0B\u3002",n.append(r)}}var Wh=new Set,Xh=new Set,tm=null,nm=null,im=-1,rm=-1;function ab(){let n=C.voyage.harvested,e=C.voyage.skippedObservations;if(tm!==n||im!==n.length){tm=n,im=n.length,Wh.clear();for(let t=0;t<n.length;t++)n[t].startsWith("observation:")&&Wh.add(n[t].slice(12))}if(nm!==e||rm!==e.length){nm=e,rm=e.length,Xh.clear();for(let t=0;t<e.length;t++)Xh.add(e[t])}}var lb={x:NaN,z:NaN,heading:NaN,second:-1,revision:-1,value:null},$h=0;function cb(){let n=lb,e=C.boat,t=Math.floor(C.time);return(n.x!==e.x||n.z!==e.z||n.heading!==e.heading||n.second!==t||n.revision!==$h)&&(n.x=e.x,n.z=e.z,n.heading=e.heading,n.second=t,n.revision=$h,n.value=Ia(C)),n.value}function ub(){let n=Y("#route-choice-card");if(Hh=null,C.mode!=="sailing"||zt!=="running"||Bt||en){n.hidden=!0;return}if(C.cargo.length<dm[C.rigId].capacity&&dn(C).observations.some(r=>Math.hypot(r.x-C.boat.x,r.z-C.boat.z)<=20&&(r.id===ui||C.boat.speed<=1.4)&&!C.voyage.harvested.includes(`observation:${r.id}`)&&!C.voyage.skippedObservations?.includes(r.id))&&!Sr(C)){n.hidden=!0;return}let t=Sr(C),i=cb();if(n.hidden=!i&&!t,Y("#route-cancel").hidden=!t,t&&!i){Y("#route-choice-title").textContent=t.label,Y("#route-choice-context").textContent="\u4F9D\u85CD\u8272\u8DEF\u9EDE\u624B\u52D5\u638C\u8235\uFF1B\u53D6\u6D88\u5F15\u5C0E\u53EF\u6062\u5FA9\u539F\u672C\u4EFB\u52D9\u76EE\u6A19\u3002",Gh(Y("#route-options"),null);return}i&&(Hh=i,Y("#route-choice-title").textContent=i.name,Y("#route-choice-context").textContent=t?`\u76EE\u524D\u6CBF\u300C${t.label}\u300D\u3002\u53EF\u6BD4\u8F03\u524D\u65B9\u6D77\u6CC1\u8207\u9032\u6E2F\u89D2\u5EA6\uFF0C\u6539\u9078\u4E0B\u4E00\u6BB5\u85CD\u8272\u5F15\u5C0E\uFF1B\u4ECD\u9700\u624B\u52D5\u638C\u8235\u3002`:"\u9078\u64C7\u5F8C\u4F9D\u5DE6\u4E0A\u65B9\u4F4D\u624B\u52D5\u638C\u8235\uFF1B\u85CD\u8272\u8DEF\u9EDE\u53EA\u63D0\u4F9B\u5F15\u5C0E\uFF0C\u4E0D\u6703\u81EA\u52D5\u64CD\u8239\u3002",Gh(Y("#route-options"),i))}Y("#route-branch-map").onclick=()=>wn("map");Y("#route-cancel").onclick=()=>{ci(()=>dd(C)),Tn()};function hb(){let n=Y("#survey-choice");if(ba=null,C.mode!=="sailing"||zt!=="running"||Bt||en||Hh||Sr(C)){n.hidden=!0;return}let e=dn(C).observations;ab();let t=null,i=1/0;for(let a=0;a<e.length;a++){let l=e[a];if(Wh.has(l.id)||Xh.has(l.id))continue;let c=l.x-C.boat.x,u=l.z-C.boat.z,h=c*c+u*u;if(!(h>2025)){if(l.id===ui){t=l,i=h;break}h<i&&(t=l,i=h)}}if(n.hidden=!t,!t)return;ba=t,kc=Math.sqrt(i);let r=dm[C.rigId].capacity,s=C.cargo.length>=r;$i("#survey-title",`${t.name} \xB7 ${Math.round(kc)} m`),$i("#survey-detail",rb(t)),$i("#survey-tradeoff",`\u53D6\u6A23\u4F54 1 \u683C\u8CA8\u8259\uFF0C\u8FD4\u6E2F +3 \u5370\u8A18\uFF1B\u76F4\u822A\u53EF\u7701\u505C\u8239\u6642\u9593\u3002\u8CA8\u8259 ${C.cargo.length}/${r}\u3002`);let o=Y("#survey-sample");o.disabled=s,$i("#survey-sample",s?"\u8CA8\u8259\u5DF2\u6EFF":kc>9?ui===t.id?"\u5DF2\u6A19\u8A18 \xB7 \u4F9D\u65B9\u4F4D\u524D\u9032":"\u6A19\u8A18\u53D6\u6A23\u9EDE":C.boat.speed>1.4?"\u6536\u5E06\u6E1B\u901F":"\u53D6\u5F97\u53D6\u6A23 E")}Y("#survey-sample").onclick=()=>{let n=ba;n&&(Kn(),kc>9?(ui=n.id,An("\u53D6\u6A23\u9EDE\u5DF2\u6A19\u8A18\u3002\u4F9D\u5DE6\u4E0A\u65B9\u4F4D\u822A\u884C\uFF0C\u63A5\u8FD1\u6D6E\u6A19\u5F8C\u6536\u5E06\u6E1B\u901F\u3002")):C.boat.speed>1.4?(gr(),C.boat.sail=0,An("\u5DF2\u6536\u5E06\u3002\u822A\u901F\u964D\u5230 1.4 m/s \u5F8C\u6309 E \u53D6\u6A23\u3002")):ci(()=>ru(C,n.id)),Y("#survey-sample").blur(),Yc())};Y("#survey-pass").onclick=()=>{if(!ba)return;let n=ba.id;ui===n&&(ui=null),ci(()=>pd(C,n)),Y("#survey-pass").blur()};function db(){if(C.mode==="diving"){let t=Zt.find(o=>o.id===C.activeDive)||Zt.find(o=>o.islandId===C.currentIsland),i=vi(C),r=yn(C),s=C.diveTasks[t.id];return{title:`${r.name} \xB7 ${s.completedStationIds.length}/${r.stations.length}`,text:`${t?.name||"\u6DFA\u6C34\u63A2\u7D22"} \xB7 ${C.diveCollected?"\u5DF2\u5B8C\u6210\u8ABF\u67E5\uFF0C\u53EF\u6D6E\u51FA\u56DE\u8239\u3002":`\u76EE\u6A19\u7D04 ${Math.round(Math.hypot((i?.x||0)-C.diver.x,(i?.z||0)-C.diver.z))} m\uFF1B${i.name||t.partName}\uFF0C4.5 m \u5167\u6309 E\u3002${r.mechanic==="valves"?`\u95A5\u9580${Ri(C.time,C.voyage.variantId)<3?"\u958B\u555F \u2713":"\u95DC\u9589"} \xB7 \u6BCF 6 \u79D2\u5FAA\u74B0\u3002`:r.mechanic==="guardian"?"\u907F\u958B\u79FB\u52D5\u5713\u5708\uFF1B\u7425\u73C0\u8272\u70BA\u9810\u8B66\u3002":""}`} \u6C23\u6CE1\u88DC\u6C27\u3002`}}let n=Sr(C);if(C.mode==="sailing"&&n){let t=n.target,i=Math.hypot(t.x-C.boat.x,t.z-C.boat.z),r=(Math.atan2(t.x-C.boat.x,-(t.z-C.boat.z))*180/Math.PI+360)%360;return{title:n.label,text:`\u8DEF\u9EDE ${n.index+1}/${n.waypoints.length} \xB7 \u7D04 ${Math.round(i)} \u516C\u5C3A \xB7 \u65B9\u4F4D ${Math.round(r)}\xB0\u3002\u4F9D\u85CD\u8272\u8DEF\u9EDE\u638C\u8235\uFF0C\u5B8C\u6210\u5F8C\u7E7C\u7E8C\u59D4\u8A17\u3002`}}if(C.lighthouseFixed&&!C.storyComplete)return{title:"\u5E36\u8457\u5149\uFF0C\u56DE\u5BB6\u3002",text:"\u71C8\u5854\u5DF2\u4FEE\u5FA9\u3002\u8FD4\u56DE\u5357\u65B9\u6BCD\u6E2F\uFF0C\u5B8C\u6210\u6545\u4E8B\u3002"};if(C.mode==="sailing"&&ui){let t=dn(C).observations.find(i=>i.id===ui);if(t&&!C.voyage.harvested.includes(`observation:${t.id}`)){let i=Math.hypot(t.x-C.boat.x,t.z-C.boat.z),r=(Math.atan2(t.x-C.boat.x,-(t.z-C.boat.z))*180/Math.PI+360)%360;return{title:`\u53D6\u6A23 \xB7 ${t.name}`,text:`\u7D04 ${Math.round(i)} \u516C\u5C3A \xB7 \u65B9\u4F4D ${Math.round(r)}\xB0\u3002\u91D1\u8272\u6D6E\u6A19 9 \u516C\u5C3A\u5167\u6536\u5E06\uFF0C\u4F4E\u901F\u6309 E\uFF1B\u53EF\u96A8\u6642\u7565\u904E\u3002`}}ui=null}if(C.parts.length===3&&!C.lighthouseFixed)return{title:"\u9EDE\u4EAE\u5317\u65B9\u71C8\u5854\u3002",text:"\u4E09\u500B\u96F6\u4EF6\u5DF2\u9F4A\u5099\u3002\u524D\u5F80\u5317\u65B9\u71C8\u5854\u9760\u6CCA\uFF0C\u8ABF\u67E5\u4FEE\u5FA9\u3002"};if(C.mode==="harbor"){let t=Ut.find(i=>i.id===dr);return{title:t?.name||"\u6E96\u5099\u51FA\u6D77\u3002",text:`\u6E96\u5099\u524D\u5F80${Qr(t?.islandId)?.name||"\u4E03\u5CF6"}\u3002\u5148\u770B\u822A\u7DDA\u8207\u6F6E\u6C50\uFF0C\u518D\u6309 W \u5347\u5E06\u3002`}}let e=Ut.find(t=>t.id===C.contractId);if(e&&C.mode==="sailing"){let t=Ii(C),i=t.readyToDeliver,r=t.nextObjective,s=Qr(i?"harbor":r?.islandId||e.islandId),o=Math.hypot(C.boat.x-s.dock.x,C.boat.z-s.dock.z);return{title:i?"\u628A\u767C\u73FE\u5E36\u56DE\u6BCD\u6E2F\u3002":e.name,text:`${s.name} \xB7 ${Math.round((Math.atan2(s.dock.x-C.boat.x,-(s.dock.z-C.boat.z))*180/Math.PI+360)%360)}\xB0 \xB7 ${Math.round(o)} m \xB7 ${i?"\u9760\u6CCA\u4EA4\u4ED8\u5F8C\u7D50\u7B97":`\u8ABF\u67E5 ${t.completedCount}/${t.total} \xB7 ${r?.kind==="dive"?"\u9760\u5CB8\u5F8C\u4E0B\u6F5B":"\u5230\u91D1\u8272\u6CCA\u4F4D\u6536\u5E06\uFF0C\u6309 E \u9760\u5CB8"}`}`}}return{title:C.storyComplete?"\u4E03\u5CF6\uFF0C\u7E7C\u7E8C\u63A2\u7D22\u3002":"\u7D66\u6D77\u4E00\u76DE\u71C8\u3002",text:C.storyComplete?"\u81EA\u7531\u822A\u7A0B\u5DF2\u958B\u653E\u3002\u88DC\u9F4A\u5716\u9451\uFF0C\u6216\u63DB\u5E06\u88DD\u8207\u822A\u7DDA\u6311\u6230\u7D00\u9304\u3002":"\u5C0B\u627E\u4E09\u500B\u6DFA\u6C34\u96F6\u4EF6\uFF0C\u4FEE\u5FA9\u71C8\u5854\u4E26\u5B89\u5168\u8FD4\u822A\u3002"}}function $i(n,e){let t=Y(n);t.textContent!==String(e)&&(t.textContent=e)}var sm=-1,om=null;function fb(){let n=Math.floor(C.time);return n!==sm&&(sm=n,om=Pi(C.time)),om}function Yc(){$i("#supply-clock",C.difficulty==="relaxed"||C.storyComplete?"\u88DC\u7D66 \u221E \xB7 \u60A0\u904A":`\u88DC\u7D66 ${Math.floor(Math.ceil(C.supplyRemaining)/60)}:${String(Math.ceil(C.supplyRemaining)%60).padStart(2,"0")} \xB7 \u65B0\u96F6\u4EF6\u88DC\u6EFF`),Y("#supply-clock").classList.toggle("urgent",C.difficulty==="standard"&&C.supplyRemaining<120);let n=Y("#dive-checklist");if(n.hidden=C.mode!=="diving"||zt!=="running",!n.hidden){let u=yn(C),h=C.diveTasks[C.activeDive],d=C.activeDive+":"+h.completedStationIds.join(",")+C.diveCollected;n.dataset.key!==d&&(n.dataset.key=d,n.innerHTML=`<span class="eyebrow">${jt(u.name)} \xB7 \u6BCF\u7AD9\u88DC\u6EFF\u6C27\u6C23</span><ol>${u.stations.map(f=>`<li class="${h.completedStationIds.includes(f.id)?"done":""}">${h.completedStationIds.includes(f.id)?"\u2713 ":""}${jt(f.name)}</li>`).join("")}<li class="${C.diveCollected?"done":""}">${h.opened?"\u25C7 \u524D\u5F80\u96F6\u4EF6":"\u5B8C\u6210\u5404\u7AD9\u89E3\u958B\u96F6\u4EF6"}</li></ol>`)}let e=C.mode==="diving"?"W A S D / \u65B9\u5411\u9375 \u6E38\u52D5 \xB7 E \u53D6\u5F97\u7269\u4EF6 \xB7 \u6D6E\u51FA\u56DE\u8239 \u8FD4\u56DE\u8239\u4E0A \xB7 M \u6D77\u5716 \xB7 Esc \u66AB\u505C":"A D \u8F49\u8235 \xB7 W S \u5E06\u529B \xB7 SPACE \u6536\u5E06 \xB7 E \u9760\u5CB8 \xB7 M \u6D77\u5716 \xB7 C \u8996\u89D2";Y("#keyboard-hint").textContent!==e&&(Y("#keyboard-hint").textContent=e),ib(),ub(),hb();let t=fb(),i=db();$i("#objective",i.title),$i("#objective-detail",i.text),$i("#hull-label",`${Math.ceil(C.boat.hull)}%`),Y("#hull-meter").value=C.boat.hull;let r=C.mode==="diving";document.body.classList.toggle("diving",r),Y("#oxygen-row").hidden=!r,$i("#oxygen-label",`${Math.ceil(C.oxygen||0)} \u79D2`),Y("#oxygen-meter").max=Zt.find(u=>u.id===C.activeDive)?.oxygen||55,Y("#oxygen-meter").value=C.oxygen||0,Y("#surface-button").hidden=!r,Y("#sail-label").textContent=r?"\u6F5B\u6C34 \xB7 WASD \u65B9\u5411\u79FB\u52D5":`\u5E06\u529B ${Math.round(C.boat.sail*100)}% \xB7 ${Math.abs(C.boat.speed||0).toFixed(1)} m/s`,Y("#tide-label").textContent=`${t.label} \xB7 ${Math.ceil(t.secondsToChange)}s`,Y("#forecast").textContent=`\u63A5\u8457 ${t.nextLabel} \u2192 ${t.forecast?.[1]?.label||""}`,Y("#voyage-time").textContent=`${String(Math.floor((C.elapsed||0)/60)).padStart(2,"0")}:${String(Math.floor((C.elapsed||0)%60)).padStart(2,"0")}`,Y("#compass-arrow").style.transform=`rotate(${C.boat.heading*180/Math.PI}deg)`,Y("#bearing-label").textContent=`${(Math.round(C.boat.heading*180/Math.PI)%360+360)%360}\xB0`;let s=ho(C.boat.x,C.boat.z,C.time,C.seed);Y("#flow-arrow").style.display="inline-block",Y("#flow-arrow").style.transform=`rotate(${Math.atan2(s.z||0,s.x||0)*180/Math.PI}deg)`,Y("#safety-warning").textContent=C.boat.hull<25?"\u26A0 \u8239\u9AD4\u4F4E\u65BC 25%\uFF0C\u8ACB\u9760\u6700\u8FD1\u6E2F\u53E3\u514D\u8CBB\u4FEE\u5FA9\u3002":"";let o=C.mode==="sailing"&&dn(C).observations.some(u=>!C.voyage.harvested.includes(`observation:${u.id}`)&&Math.hypot(u.x-C.boat.x,u.z-C.boat.z)<=9),a=Lt.some(u=>Math.hypot(u.dock.x-C.boat.x,u.dock.z-C.boat.z)<=13),l=r?"\u53D6\u5F97\u7269\u4EF6 <kbd>E</kbd>":o&&!a?"\u89C0\u6E2C\u53D6\u6A23 <kbd>E</kbd>":"\u9760\u5CB8 / \u8ABF\u67E5 <kbd>E</kbd>",c=Y("#interact-button");c.dataset.action!==l&&(c.dataset.action=l,c.innerHTML=l),document.querySelectorAll("[data-sail]").forEach(u=>u.classList.toggle("selected",Math.abs(C.boat.sail-+u.dataset.sail)<.08)),document.querySelectorAll(".dive-control").forEach(u=>u.hidden=!r)}function xm(){Bt||en||zt!=="running"||ci(()=>au(C))}function vm(){Tt.camera=Tt.camera==="overhead"?"follow":"overhead",En?.setCamera(Tt.camera),_a(),An(Tt.camera==="overhead"?"\u659C\u4FEF\u77B0\u93E1\u982D":"\u8FFD\u8239\u93E1\u982D")}document.addEventListener("pointerdown",n=>{es&&!Gc&&n.target.closest("button")&&Kn()},!0);document.addEventListener("keydown",n=>{if(!es||n.ctrlKey||n.altKey||n.metaKey)return;let e=n.key.toLowerCase();if(!Gc&&n.target.tagName==="BUTTON"&&(e==="enter"||e===" ")&&Kn(),n.repeat&&(e==="escape"||e==="m"||e==="c")){n.preventDefault();return}if(en){if((e==="escape"||e==="m"&&en==="map")&&(n.preventDefault(),ts()),e==="tab"){let t=[...Y("#modal-content").querySelectorAll("button,input,select")].filter(i=>!i.disabled&&i.getClientRects().length);n.shiftKey&&document.activeElement===t[0]?(n.preventDefault(),t.at(-1)?.focus()):!n.shiftKey&&document.activeElement===t.at(-1)&&(n.preventDefault(),t[0]?.focus())}return}["input","select","textarea"].includes(n.target.tagName.toLowerCase())&&e!=="escape"||n.target.tagName==="BUTTON"&&e===" "&&!["sailing","diving"].includes(C.mode)||(["w","a","s","d","arrowup","arrowdown","arrowleft","arrowright"," ","e","m","c","escape"].includes(e)&&(n.preventDefault(),Gc||Kn()),n.repeat||(e==="escape"&&mr(!Bt),e==="m"&&wn("map"),e==="c"&&vm(),e==="e"&&xm()),Ot.has(e)||(!n.repeat&&fr()&&pb(e),Ot.add(e),jr()))});document.addEventListener("keyup",n=>{Ot.delete(n.key.toLowerCase())&&jr()});var ym=Y(".steering");for(let[n,e]of[["forward","\u2191"],["back","\u2193"]]){let t=document.createElement("button");t.dataset.hold=n,t.textContent=e,t.className="dive-control",t.setAttribute("aria-label",n==="forward"?"\u5411\u524D\u6F5B\u6E38":"\u5411\u5F8C\u6F5B\u6E38"),t.hidden=!0,ym.append(t)}var Qt=document.createElement("div");Qt.id="helm";Qt.setAttribute("role","slider");Qt.tabIndex=0;Qt.setAttribute("aria-label","\u8F49\u8235\u6416\u687F\uFF0C\u6F5B\u6C34\u6642\u53EF\u5411\u56DB\u65B9\u6E38\u52D5");Qt.setAttribute("aria-valuemin","-100");Qt.setAttribute("aria-valuemax","100");Qt.setAttribute("aria-valuenow","0");Qt.innerHTML='<span id="helm-knob">\u2726</span>';ym.prepend(Qt);function _m(n){if(n.pointerId!==pr||Bt||en)return;let e=Qt.getBoundingClientRect(),t=n.clientX-e.left-e.width/2,i=n.clientY-e.top-e.height/2,r=e.width*.32,s=Math.max(r,Math.hypot(t,i));(Jn.x!==t/s||Jn.y!==i/s)&&(Jn={x:t/s,y:i/s},jr()),Y("#helm-knob").style.transform=`translate(${Jn.x*r}px,${Jn.y*r}px)`,Qt.setAttribute("aria-valuenow",String(Math.round(Jn.x*100)))}Qt.onpointerdown=n=>{if(!(Bt||en||pr!==null)){n.preventDefault(),Kn();try{Qt.setPointerCapture(n.pointerId)}catch{return}pr=n.pointerId,fr()&&(Wt.play("helm"),Ta("helm")),_m(n)}};Qt.onpointermove=n=>{n.pointerId===pr&&_m(n)};Qt.onpointerup=Qt.onpointercancel=Qt.onlostpointercapture=n=>{n.pointerId===pr&&(pr=null,(Jn.x!==0||Jn.y!==0)&&(Jn={x:0,y:0},jr()),Y("#helm-knob").style.transform="translate(0px,0px)",Qt.setAttribute("aria-valuenow","0"))};document.querySelectorAll("[data-hold]").forEach(n=>{n.onpointerdown=e=>{if(!(Bt||en||js.has(e.pointerId))){e.preventDefault(),Kn();try{n.setPointerCapture(e.pointerId)}catch{return}fr()&&(Wt.play("helm"),Ta("helm")),js.set(e.pointerId,n),Wc.set(e.pointerId,n.dataset.hold),jr()}},n.onpointerup=n.onpointercancel=n.onlostpointercapture=e=>{js.get(e.pointerId)===n&&(js.delete(e.pointerId),Wc.delete(e.pointerId)&&jr())}});document.querySelectorAll("[data-sail]").forEach(n=>n.onclick=()=>{if(!fr()||C.mode!=="sailing")return;Kn();let e=C.boat.sail;C.boat.sail!==+n.dataset.sail&&(C.boat.sail=+n.dataset.sail,jr()),e!==C.boat.sail&&Mm("preset",performance.now()),n.blur()});Y("#interact-button").onclick=()=>{Kn(),xm(),Y("#interact-button").blur()};Y("#surface-button").onclick=()=>ci(()=>Pa(C));Y("#mini-chart").onclick=()=>wn("map");Y("#map-button").onclick=()=>wn("map");Y("#journal-button").onclick=()=>wn("journal");Y("#camera-button").onclick=vm;Y("#pause-button").onclick=()=>mr(!Bt);Y("#sea").oncontextmenu=n=>n.preventDefault();Y("#sea").onpointerdown=n=>{if(!(Bt||en||qi)&&(n.button===2||n.pointerType==="touch"&&n.clientX>innerWidth/2)){try{Y("#sea").setPointerCapture(n.pointerId)}catch{return}qi={id:n.pointerId,x:n.clientX}}};Y("#sea").onpointermove=n=>{qi?.id===n.pointerId&&(En?.orbit((n.clientX-qi.x)*.006),qi.x=n.clientX)};Y("#sea").onpointerup=Y("#sea").onpointercancel=Y("#sea").onlostpointercapture=n=>{if(qi?.id===n.pointerId){qi=null;try{Y("#sea").hasPointerCapture(n.pointerId)&&Y("#sea").releasePointerCapture(n.pointerId)}catch{}}};window.addEventListener("blur",()=>{gr(),zt==="running"&&mr()});document.addEventListener("visibilitychange",()=>{gr(),document.hidden&&zt==="running"&&mr()});window.addEventListener("pagehide",n=>{gr(),Tn(),n.persisted||(kn.dispose(),Zc.dispose(),Wt.dispose(),En?.dispose())});window.addEventListener("pageshow",n=>{n.persisted&&mr()});window.addEventListener("message",n=>{if(n.source!==window.parent||n.origin!==location.origin||!Xc)return;let e=n.data;if(!(!e||e.protocol!=="stteak-game"||e.version!==1||e.sessionId!==Xc||!e.payload||typeof e.payload!="object"||Array.isArray(e.payload))){if(e.type==="host:init"){if(e.payload.gameId!=="tidebound"||typeof e.payload.title!="string"||typeof e.payload.image!="string")return;Vc=!0,es&&$c("game:ready",{capabilities:["pause","resume","restart","keyboard","touch"]});return}!Vc||!es||(e.type==="host:start"&&zt==="ready"&&qc(),e.type==="host:pause"&&mr(),e.type==="host:resume"&&mr(!1),e.type==="host:restart"&&pm())}});var Xi={turn:0,sailDelta:0,brake:!1,diveX:0,diveZ:0};function bm(){let n=Ot.has("a")||Ot.has("arrowleft"),e=Ot.has("d")||Ot.has("arrowright"),t=Ot.has("w")||Ot.has("arrowup"),i=Ot.has("s")||Ot.has("arrowdown");for(let r of Wc.values())r==="left"?n=!0:r==="right"?e=!0:r==="forward"?t=!0:r==="back"&&(i=!0);return Xi.turn=Xi.diveX=Math.max(-1,Math.min(1,Number(e)-Number(n)+Jn.x)),Xi.sailDelta=Number(t)-Number(i),Xi.brake=Ot.has(" "),Xi.diveZ=Math.max(-1,Math.min(1,Number(i)-Number(t)+Jn.y)),Xi}var Hc={sail:0,helm:0,oxygen:0};function Ta(n,e=performance.now()){let t=Y(n==="oxygen"?"#oxygen-row":n==="helm"?"#bearing-label":"#sail-label");Hc[n]=e+350,t?.classList.add("action-cue"),t&&(t.dataset.cueAt=String(e))}function Mm(n,e){Wt.play("sail",!0),Ta("sail",e),Sa=e,Ea=C.boat.sail}function pb(n){let e=n==="w"||n==="arrowup",t=n==="s"||n==="arrowdown",i=n==="a"||n==="arrowleft",r=n==="d"||n==="arrowright";if(C.mode==="sailing"&&(e||t||n===" ")){if(e&&(Ot.has("w")||Ot.has("arrowup"))||t&&(Ot.has("s")||Ot.has("arrowdown")))return;Mm(n===" "?"brake":e?"raise":"lower",performance.now())}else if(i||r||C.mode==="diving"&&(e||t)){if(i&&(Ot.has("a")||Ot.has("arrowleft"))||r&&(Ot.has("d")||Ot.has("arrowright")))return;Wt.play("helm"),Ta("helm")}}var Sa=-1/0,Ea=C.boat.sail;function mb(n,e,t,i){!t||n===e||(Math.abs(e-Ea)>=.1||n>0&&e===0)&&i-Sa>=500&&(Wt.play("sail"),Sa=i,Ea=e)}var Sm={step:{count:0,total:0,max:0,samples:new Float32Array(2048)},scene:{count:0,total:0,max:0,samples:new Float32Array(2048)},hud:{count:0,total:0,max:0,samples:new Float32Array(2048)}};function qh(n,e){let t=performance.now()-e,i=Sm[n];i.samples[i.count%2048]=t,i.count++,i.total+=t,i.max=Math.max(i.max,t)}var gb=[],Oc={...Tt,paused:!1},am=0,Em=0,Yh=0,eo=!1;function wm(n){let e=fr()&&!eo,t=C.mode,i=kn.frame(n,e,C.mode);if(e&&i.dt>0){kn.begin();let r=C.boat.sail,s=performance.now(),o=gd(C,i.dt,Xi,gb);qh("step",s),Qs>=0&&(zc[Ks++%256]=Math.max(0,performance.now()-Qs-((En?.renderTotal()||0)-lm)),Qs=-1),kn.end(),mb(r,C.boat.sail,C.mode==="sailing"&&(Xi.sailDelta!==0||Xi.brake),n),Kh(o),C.mode!==t&&(Zc.invalidate(),kn.reset(),Tn(),ns())}return e&&i.dt>0}var Zc=Xp({advance:wm,eligible:()=>fr()&&!eo}),Fh=null;function Tm(n){if(kn.isDisposed())return;let e=Fh===null?0:(n-Fh)/1e3;Fh=n;let t=Number.isFinite(e)&&e>0?Math.min(.1,e):0;if(wm(performance.now()),!eo){let i=performance.now();Oc.quality=Tt.quality,Oc.reducedMotion=Tt.reducedMotion,Oc.paused=Bt||!!en||zt!=="running";let r=En.update(C,t,Oc);qh("scene",performance.now()-r)}if($p++%8===0||n-qp>180){let i=performance.now();Yc(),Am(),Cm(),qh("hud",i),qp=n}if(n>fm&&Y("#toast").classList.contains("visible")&&Y("#toast").classList.remove("visible"),n>Hc.sail&&Y("#sail-label").classList.remove("action-cue"),n>Hc.helm&&Y("#bearing-label").classList.remove("action-cue"),n>Hc.oxygen&&Y("#oxygen-row").classList.remove("action-cue"),zt==="running"&&n-am>15e3&&(Tn(),am=n),$p>30&&Number.isFinite(e)&&e>0&&e<1){let i=e*1e3;ya.push(i),ya.length>3600&&ya.shift(),Em+=i,Yh++}requestAnimationFrame(Tm)}function Am(){let n=Y("#mini-chart");if(n.hidden=!["sailing","diving"].includes(C.mode)||zt!=="running",n.hidden)return;let e=Ii(C),t=Qr(C.parts.length===3&&!C.lighthouseFixed?"lighthouse":C.lighthouseFixed&&!C.storyComplete?"harbor":e.nextObjective?.islandId||"harbor"),i=C.mode==="diving"?C.diver:C.boat;n.dataset.built||(Y("#mini-world").innerHTML=Lt.map(s=>`<circle data-island="${s.id}" cx="${s.x}" cy="${s.z}" r="${s.radius}" fill="#8eaf99" stroke="#eff3d7" stroke-width="4"/>`).join("")+gi.map(s=>`<circle cx="${s.x}" cy="${s.z}" r="${s.radius}" fill="#edab73" opacity=".6"/>`).join("")+'<line id="mini-line" stroke="#f9d295" stroke-width="3" stroke-dasharray="10 7"/><path id="mini-boat" d="M0 -12L8 10L0 6L-8 10Z" fill="#fff8df" stroke="#173e45" stroke-width="2"/>',n.dataset.built="true");let r=Y("#mini-line");for(let[s,o]of Object.entries({x1:i.x,y1:i.z,x2:t.dock.x,y2:t.dock.z}))r.setAttribute(s,o);if(Y("#mini-boat").setAttribute("transform",`translate(${i.x},${i.z}) rotate(${C.boat.heading*180/Math.PI})`),n.dataset.goal!==t.id){n.dataset.goal=t.id;for(let s of n.querySelectorAll("[data-island]"))s.setAttribute("fill",s.dataset.island===t.id?"#ffd595":"#8eaf99");Y("#mini-goal").textContent=t.name}}var Rm=document.createElement("span");Rm.id="supply-clock";Y("#voyage-time").parentElement.append(Rm);var jh=document.createElement("div");jh.id="dive-checklist";jh.hidden=!0;Y("#objective-detail").parentElement.append(jh);var xb={x:0,y:0,z:0},Zn=document.createElement("div");Zn.id="dive-direction";Zn.hidden=!0;Zn.innerHTML='<span aria-hidden="true">\u279C</span><small></small>';document.body.append(Zn);function Cm(){let n=C.mode==="diving";if(Zn.hidden=!n||C.diveCollected||zt!=="running"||Bt||!!en,Zn.hidden)return;let e=vi(C),t=En.project(e.x,-6.8,e.z,xb),i=340,r=innerWidth-90,s=130,o=innerHeight-230,a=Math.max(i,Math.min(r,t.x)),l=Math.max(s,Math.min(o,t.y));Zn.hidden=t.z<1&&t.x>=i&&t.x<=r&&t.y>=s&&t.y<=o,!Zn.hidden&&(Zn.style.left=a+"px",Zn.style.top=l+"px",Zn.querySelector("span").style.transform=`rotate(${Math.atan2(t.y-l,t.x-a)}rad)`,Zn.querySelector("small").textContent=`\u76EE\u6A19 ${Math.round(Math.hypot(e.x-C.diver.x,e.z-C.diver.z))} m`)}var vb=Wt.prepare().catch(()=>{Kr="\u97F3\u8A0A\u7121\u6CD5\u6E96\u5099\uFF0C\u5DF2\u975C\u97F3\uFF1B\u4ECD\u53EF\u4F9D\u756B\u9762\u63D0\u793A\u904A\u73A9\u3002",Tt.music=0,Tt.sfx=0});try{En=Wp(Y("#sea"),Qc),En.setCamera(Tt.camera),document.body.classList.toggle("software",En.stats().software),Y("#sea").addEventListener("webglcontextlost",n=>{n.preventDefault(),eo=!0,mr(),An("\u7E6A\u5716\u66AB\u505C\uFF0C\u6B63\u5728\u7B49\u5F85\u986F\u793A\u88DD\u7F6E\u6062\u5FA9\u3002",2e4)}),Y("#sea").addEventListener("webglcontextrestored",()=>{eo=!1,En.resize(),An("\u6D77\u57DF\u5DF2\u6062\u5FA9\u3002\u6309\u7E7C\u7E8C\u8FD4\u56DE\u822A\u7A0B\u3002")}),window.addEventListener("resize",()=>En.resize()),En.resize(),await vb,_a(),Y("#loading").hidden=!0,es=!0,Yc(),Vc&&$c("game:ready",{capabilities:["pause","resume","restart","keyboard","touch"]}),to||Jh(),requestAnimationFrame(Tm),window.tidebound=Object.freeze({buildId:Oh,snapshot:()=>structuredClone(C),metrics:()=>{let n=[...ya].sort((e,t)=>e-t);return{inputResponse:{method:"control update during input dispatch",count:Bc,p95:Array.from(cm.subarray(0,Math.min(Bc,256))).sort((e,t)=>e-t)[Math.floor(Math.min(Bc,256)*.95)]||0},physicsInputQueue:{method:"event to positive physics step minus actual rendering duration",count:Ks,p50:Array.from(zc.subarray(0,Math.min(Ks,256))).sort((e,t)=>e-t)[Math.floor(Math.min(Ks,256)*.5)]||0,max:Math.max(0,...zc),p95:Array.from(zc.subarray(0,Math.min(Ks,256))).sort((e,t)=>e-t)[Math.floor(Math.min(Ks,256)*.95)]||0},frames:ya.length,average:Yh?Em/Yh:null,contextLost:eo,cpu:Object.fromEntries(Object.entries(Sm).map(([e,t])=>[e,{average:t.total/(t.count||1),max:t.max,count:t.count,p95:Array.from(t.samples.subarray(0,Math.min(t.count,2048))).sort((i,r)=>i-r)[Math.floor(Math.min(t.count,2048)*.95)]||0}])),p50:n[Math.floor(n.length*.5)]||null,p95:n[Math.floor(n.length*.95)]||null,renderer:En.stats(),audio:Wt.stats(),phase:zt,paused:Bt,overlay:en,storageAvailable:to}}})}catch(n){console.error(n),Y("#loading").innerHTML='<span>\u2248</span><h1>\u6D77\u57DF\u66AB\u6642\u7121\u6CD5\u958B\u555F\u3002</h1><p>\u6B64\u904A\u6232\u9700\u8981\u652F\u63F4 WebGL 2 \u7684\u700F\u89BD\u5668\u3002\u8ACB\u78BA\u8A8D\u786C\u9AD4\u52A0\u901F\u5DF2\u958B\u555F\u5F8C\u91CD\u8A66\u3002</p><button onclick="location.reload()">\u91CD\u65B0\u8F09\u5165</button>',$c("game:error",{message:"3D \u6D77\u57DF\u521D\u59CB\u5316\u5931\u6557\u3002\u8ACB\u4F7F\u7528\u652F\u63F4 WebGL 2 \u7684\u700F\u89BD\u5668\u4E26\u91CD\u8A66\u3002"})}
/*! Bundled license information:

three/build/three.core.js:
three/build/three.module.js:
  (**
   * @license
   * Copyright 2010-2025 Three.js Authors
   * SPDX-License-Identifier: MIT
   *)
*/
