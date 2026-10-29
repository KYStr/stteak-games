var Wf=Object.defineProperty;var Xf=(i,e)=>{for(var t in e)Wf(i,t,{get:e[t],enumerable:!0})};var Ql={};Xf(Ql,{CONTRACTS:()=>It,CURRENTS:()=>br,DISCOVERIES:()=>pn,DIVE_SITES:()=>Yn,ISLANDS:()=>Gt,OBSERVATIONS:()=>mn,REEFS:()=>Zi,RIGS:()=>qn,ROUTE_CHOICES:()=>ko,ROUTE_DIRECTIONS:()=>Mr,TIDE_PERIOD:()=>Nn,WHIRLS:()=>Ji,WORLD_BOUND:()=>Ei});var Ei=260,Nn=240,Gt=[{id:"harbor",name:"\u6F6E\u97F3\u6E2F",x:-12,z:174,radius:25,dock:{x:-12,z:141},color:"#ead9ad",type:"home",landmark:"harbor",discoveries:[]},{id:"coral",name:"\u73CA\u745A\u7063",x:-124,z:90,radius:24,dock:{x:-98,z:66},color:"#f59e8b",type:"explore",landmark:"coral",discoveries:["fan-coral","foxfish"],diveSiteId:"coral-dive"},{id:"gull",name:"\u767D\u7FBD\u5CF6",x:124,z:64,radius:23,dock:{x:100,z:42},color:"#f0e6c7",type:"explore",landmark:"birds",discoveries:["tern","turtle"]},{id:"mangrove",name:"\u9752\u6839\u5CF6",x:-140,z:-90,radius:25,dock:{x:-110,z:-74},color:"#7db38e",type:"explore",landmark:"mangrove",discoveries:["mangrove-root","seagrass"]},{id:"ruin",name:"\u661F\u76E4\u5CF6",x:126,z:-100,radius:24,dock:{x:99,z:-80},color:"#c3b8de",type:"explore",landmark:"ruins",discoveries:["star-tablet","tide-clock"],diveSiteId:"ruin-dive"},{id:"reef",name:"\u7409\u7483\u7901",x:0,z:4,radius:16,dock:{x:0,z:27},color:"#6ec8c0",type:"reef",landmark:"reef",discoveries:["glass-coral","nautilus"],diveSiteId:"reef-dive"},{id:"lighthouse",name:"\u9060\u6F6E\u71C8\u5854",x:0,z:-222,radius:22,dock:{x:0,z:-192},color:"#ead5a1",type:"lighthouse",landmark:"lighthouse",discoveries:["beacon-lens","keepers-vault"]}],pn=[{id:"foxfish",name:"\u73CA\u745A\u72D0\u9B5A",kind:"animal",islandId:"coral",diveSiteId:"coral-dive",description:"\u85CF\u5728\u6247\u73CA\u745A\u5F8C\u7684\u5C0F\u9B5A\uFF0C\u6A58\u8272\u689D\u7D0B\u96A8\u6F6E\u6C34\u9583\u52D5\u3002"},{id:"tern",name:"\u767D\u7FBD\u71D5\u9DD7",kind:"animal",islandId:"gull",description:"\u6CBF\u8457\u9806\u6D41\u6355\u9B5A\uFF1B\u7260\u5011\u7684\u822A\u7DDA\u662F\u5929\u7136\u7684\u6D77\u6D41\u63D0\u793A\u3002"},{id:"turtle",name:"\u7DA0\u6D77\u9F9C",kind:"animal",islandId:"gull",description:"\u5728\u6EAB\u6696\u6DFA\u7058\u4F11\u606F\u3002\u4FDD\u6301\u8DDD\u96E2\uFF0C\u5C07\u76F8\u9047\u756B\u9032\u6D77\u5716\u3002"},{id:"nautilus",name:"\u73CD\u73E0\u9E1A\u9D61\u87BA",kind:"animal",islandId:"reef",diveSiteId:"reef-dive",description:"\u5728\u7409\u7483\u7901\u4E0B\u7DE9\u6162\u6F02\u79FB\uFF0C\u6BBC\u4E2D\u85CF\u8457\u6D77\u7684\u87BA\u65CB\u3002"},{id:"fan-coral",name:"\u843D\u65E5\u6247\u73CA\u745A",kind:"plant",islandId:"coral",description:"\u73CA\u745A\u662F\u52D5\u7269\u7FA4\u9AD4\uFF1B\u672C\u5716\u9451\u5C07\u5176\u5217\u5165\u690D\u7269\uFF0F\u7901\u7269\u8ABF\u67E5\u3002"},{id:"mangrove-root",name:"\u9752\u6839\u7D05\u6A39",kind:"plant",islandId:"mangrove",description:"\u4EA4\u7E54\u6839\u7CFB\u8B77\u4F4F\u5CF6\u5CB8\uFF0C\u4E5F\u66FF\u5E7C\u9B5A\u4FDD\u7559\u907F\u98A8\u7684\u5C0F\u6C34\u9053\u3002"},{id:"seagrass",name:"\u9280\u5E36\u6D77\u8349",kind:"plant",islandId:"mangrove",description:"\u6D77\u8349\u96A8\u8457\u6F6E\u6D41\u50BE\u4F0F\uFF0C\u662F\u5224\u8B80\u6D41\u5411\u6700\u5B89\u975C\u7684\u5DE5\u5177\u3002"},{id:"glass-coral",name:"\u7409\u7483\u679D\u7901",kind:"plant",islandId:"reef",description:"\u534A\u900F\u660E\u7684\u6F6E\u9593\u7901\u8108\u3002\u9000\u6F6E\u6642\u9732\u51FA\uFF0C\u6EFF\u6F6E\u6642\u53EF\u5F9E\u5916\u570D\u901A\u884C\u3002"},{id:"star-tablet",name:"\u4E03\u661F\u822A\u6D77\u7891",kind:"relic",islandId:"ruin",description:"\u77F3\u523B\u8A18\u9304\u4E03\u5EA7\u5CF6\u5DBC\uFF0C\u4E2D\u592E\u7F3A\u53E3\u6B63\u6307\u5411\u9060\u6F6E\u71C8\u5854\u3002"},{id:"tide-clock",name:"\u6C89\u7761\u6F6E\u9418",kind:"relic",islandId:"ruin",diveSiteId:"ruin-dive",description:"\u9F52\u8F2A\u4ECD\u80FD\u96A8\u6F6E\u64FA\u52D5\uFF0C\u70BA\u4FEE\u5FA9\u71C8\u5854\u7559\u4E0B\u6700\u5F8C\u7684\u7DDA\u7D22\u3002"},{id:"beacon-lens",name:"\u5B88\u671B\u8005\u900F\u93E1",kind:"relic",islandId:"lighthouse",description:"\u6591\u99C1\u900F\u93E1\u7B49\u5F85\u4E09\u4EF6\u96F6\u4EF6\uFF0C\u5C07\u5149\u91CD\u65B0\u6295\u5411\u6F6E\u97F3\u6E2F\u3002"},{id:"keepers-vault",name:"\u5B88\u71C8\u4EBA\u822A\u8A8C",kind:"relic",islandId:"lighthouse",description:"\u300C\u8B80\u61C2\u6F6E\u6C34\uFF0C\u518D\u51FA\u767C\u3002\u300D\u822A\u8A8C\u6700\u5F8C\u4E00\u9801\u4ECD\u7559\u7D66\u4E0B\u4E00\u4F4D\u65C5\u4EBA\u3002"}],qn=[{id:"steady",name:"\u7A69\u5B9A\u5E06",description:"\u5747\u8861\u8F49\u5411\u8207\u822A\u901F\uFF0C\u521D\u6B21\u822A\u884C\u63A8\u85A6\u3002",speed:4,handling:1.75,capacity:8},{id:"swift",name:"\u9806\u98A8\u5E06",description:"\u9806\u98A8\u901F\u5EA6\u6700\u5FEB\uFF0C\u8F49\u5411\u8F03\u6162\uFF1B\u6311\u6230\u6700\u7701\u6642\u7D00\u9304\u3002",speed:5.25,handling:1.3,capacity:5},{id:"cargo",name:"\u9060\u822A\u5E06",description:"\u8CA8\u8259\u66F4\u5927\u3001\u8F49\u5411\u9748\u6D3B\uFF0C\u9069\u5408\u4E00\u6B21\u63A2\u7D22\u591A\u5EA7\u5CF6\u3002",speed:3.25,handling:2.05,capacity:14}],Xh=i=>({...Gt.find(e=>e.id===i).dock}),Ct=(i,e,t=[])=>({fromIslandId:i,toIslandId:e,waypoints:[Xh(i),...t.map(([n,s])=>({x:n,z:s})),Xh(e)]}),An=(i,e,t,n)=>({id:i,name:e,description:t,legs:n,waypoints:n.flatMap((s,r)=>r?s.waypoints.slice(1):s.waypoints)}),Is=i=>{let e=pn.find(t=>t.id===i);return{discoveryId:e.id,islandId:e.islandId,kind:e.diveSiteId?"dive":"shore",...e.diveSiteId?{siteId:e.diveSiteId}:{},name:e.name}},It=[{id:"coral-survey",name:"\u56DB\u68F2\u5730\u7684\u6F6E\u6C50\u6D77\u5716",islandId:"coral",targetDiscovery:"fan-coral",reward:65,description:"\u5728\u540C\u4E00\u8D9F\u822A\u7A0B\u6BD4\u8F03\u73CA\u745A\u7063\u5CB8\u7901\u8207\u72D0\u9B5A\u3001\u9752\u6839\u7D05\u6A39\u3001\u7409\u7483\u679D\u7901\u8207\u9E1A\u9D61\u87BA\uFF0C\u518D\u8A18\u9304\u767D\u7FBD\u71D5\u9DD7\u3002\u56DB\u5CF6\u516D\u9805\u8ABF\u67E5\u3001\u5169\u6B21\u6DFA\u6F5B\u5F8C\u8FD4\u6E2F\uFF0C\u9023\u8D77\u6C34\u4E0B\u3001\u6F6E\u9593\u3001\u7D05\u6A39\u8207\u7A7A\u4E2D\u7684\u98DF\u7269\u93C8\uFF0C\u540C\u6642\u5C0B\u56DE\u5169\u4EF6\u71C8\u5854\u96F6\u4EF6\u3002",objectives:["fan-coral","foxfish","mangrove-root","glass-coral","nautilus","tern"].map(Is),routes:[An("safe","\u56DB\u68F2\u5730\u5916\u7DE3","\u5F9E\u73CA\u745A\u7063\u6CBF\u7D05\u6A39\u6771\u5CB8\u5317\u4E0A\uFF0C\u518D\u7531\u7409\u7483\u7901\u897F\u5357\u5916\u7DE3\u5165\u6E2F\uFF1B\u7D93\u767D\u7FBD\u5CF6\u6BD4\u8F03\u9CE5\u985E\u5F8C\u8FD4\u6E2F\uFF0C\u5168\u7A0B\u4E0D\u9700\u8981\u7B49\u6F6E\u3002",[Ct("harbor","coral"),Ct("coral","mangrove"),Ct("mangrove","reef",[[-42,38]]),Ct("reef","gull"),Ct("gull","harbor")]),An("tide","\u56DB\u68F2\u5730\u6F6E\u9053","\u6CBF\u897F\u5074\u6F6E\u9053\u6BD4\u8F03\u68F2\u5730\uFF0C\u518D\u7A7F\u904E\u7409\u7483\u7901\u5357\u65B9\u6DF1\u6C34\u524D\u5F80\u767D\u7FBD\uFF1B\u6D41\u5411\u4E0D\u5229\u6642\u53EF\u79FB\u5230\u5916\u7DE3\u3002",[Ct("harbor","coral",[[-30,90]]),Ct("coral","mangrove",[[-66,12],[-70,-40]]),Ct("mangrove","reef",[[-40,-35],[-34,38]]),Ct("reef","gull",[[55,25]]),Ct("gull","harbor",[[32,90]])])]},{id:"gull-watch",name:"\u767D\u7FBD\u7684\u822A\u7DDA",islandId:"gull",targetDiscovery:"tern",reward:35,description:"\u767B\u9304\u767D\u7FBD\u5CF6\u71D5\u9DD7\uFF0C\u518D\u628A\u6D41\u5411\u89C0\u5BDF\u5E36\u56DE\u6BCD\u6E2F\u3002",objectives:[Is("tern")],routes:[An("safe","\u767D\u7FBD\u5167\u7DE3","\u6CBF\u65CB\u6D41\u897F\u5074\u8207\u767D\u7FBD\u5CF6\u897F\u5357\u5CB8\u4E4B\u9593\u7684\u6DF1\u6C34\u5ECA\u9053\u3002",[Ct("harbor","gull")]),An("tide","\u767D\u7FBD\u6F6E\u7063","\u5F9E\u5357\u65B9\u6F6E\u810A\u6771\u5074\u5207\u5165\u5167\u7063\uFF0C\u89C0\u5BDF\u65CB\u6D41\u8207\u8FD1\u5CB8\u6D41\u5411\u3002",[Ct("harbor","gull",[[32,90]])])]},{id:"green-roots",name:"\u9752\u6839\u7684\u5B88\u8B77",islandId:"mangrove",targetDiscovery:"mangrove-root",reward:45,description:"\u8A18\u9304\u9752\u6839\u7D05\u6A39\u7684\u8B77\u5CB8\u6839\u7CFB\uFF0C\u8FD4\u6E2F\u4EA4\u4ED8\u3002",objectives:[Is("mangrove-root")],routes:[An("safe","\u897F\u7901\u5916\u7DE3","\u7E5E\u904E\u6F6E\u810A\u897F\u5074\u8207\u7409\u7483\u7901\uFF0C\u518D\u6CBF\u7D05\u6A39\u6771\u5CB8\u9760\u6E2F\u3002",[Ct("harbor","mangrove",[[-42,99],[-70,24],[-78,-35]])]),An("tide","\u897F\u5074\u6F6E\u9053","\u6CBF\u9752\u8272\u6F6E\u9053\u5317\u884C\uFF1B\u9006\u6D41\u6642\u79FB\u5230\u6F6E\u9053\u5916\u7DE3\u3002",[Ct("harbor","mangrove",[[-50,70],[-50,-40]])])]},{id:"star-reading",name:"\u4E03\u661F\u7684\u822A\u6D77\u5716",islandId:"ruin",targetDiscovery:"star-tablet",reward:50,description:"\u8B80\u53D6\u661F\u76E4\u5CF6\u822A\u6D77\u7891\uFF0C\u5C07\u4E03\u5CF6\u7684\u8A18\u61B6\u5E36\u56DE\u3002",objectives:[Is("star-tablet")],routes:[An("safe","\u661F\u76E4\u6F6E\u9580\u5916\u7DE3","\u7A7F\u904E\u767D\u7FBD\u5CF6\u897F\u5074\uFF0C\u518D\u6CBF\u6F6E\u9580\u6771\u7DE3\u9760\u8FD1\u661F\u76E4\u5CF6\u897F\u5357\u6E2F\u3002",[Ct("harbor","ruin",[[48,96],[70,20],[76,-34]])]),An("tide","\u6771\u5074\u6F6E\u9053","\u6CBF\u6771\u5074\u6F6E\u9053\u5229\u7528\u9806\u6D41\uFF0C\u9000\u6F6E\u907F\u958B\u6F6E\u9580\u3002",[Ct("harbor","ruin",[[55,90],[55,-40]])])]},{id:"glass-study",name:"\u7409\u7483\u7901\u8A18\u9304",islandId:"reef",targetDiscovery:"glass-coral",reward:40,description:"\u5728\u7409\u7483\u7901\u5B89\u5168\u9760\u5CB8\uFF0C\u767B\u9304\u7901\u8108\u5F8C\u56DE\u6E2F\u3002",objectives:[Is("glass-coral")],routes:[An("safe","\u7409\u7483\u897F\u74B0","\u7E5E\u958B\u5357\u5074\u6F6E\u810A\uFF0C\u5F9E\u7901\u5CF6\u897F\u5357\u65B9\u9760\u5CB8\uFF1B\u4EFB\u4F55\u6C34\u4F4D\u7686\u53EF\u62B5\u9054\u3002",[Ct("harbor","reef",[[-30,95],[-34,38]])]),An("tide","\u6F6E\u810A\u76F4\u822A","\u6EFF\u6F6E\u6642\u8D8A\u904E\u5357\u65B9\u6F6E\u810A\uFF1B\u4F4E\u6F6E\u9078\u897F\u74B0\u3002",[Ct("harbor","reef",[[0,80]])])]},{id:"keepers-journal",name:"\u5B88\u71C8\u4EBA\u7684\u6D88\u606F",islandId:"lighthouse",targetDiscovery:"keepers-vault",reward:65,description:"\u63A2\u8A2A\u9060\u6F6E\u71C8\u5854\u4E26\u767B\u9304\u822A\u8A8C\u3002\u4E09\u4EF6\u96F6\u4EF6\u9F4A\u5099\u6642\u53EF\u540C\u6642\u4FEE\u5FA9\u3002",objectives:[Is("keepers-vault")],routes:[An("safe","\u71C8\u5854\u6DF1\u6C34\u5ECA\u9053","\u7D93\u7409\u7483\u7901\u897F\u5074\uFF0C\u518D\u5F9E\u9752\u6839\u65CB\u6D41\u6771\u7DE3\u7684\u6DF1\u6C34\u5ECA\u9053\u62B5\u9054\u71C8\u5854\uFF1B\u4E0D\u9700\u8981\u7B49\u6F6E\u3002",[Ct("harbor","lighthouse",[[-40,100],[-48,40],[-40,-25],[-20,-85],[0,-145]])]),An("tide","\u6771\u5074\u501F\u6D41\u5ECA\u9053","\u6CBF\u661F\u76E4\u6F6E\u9053\u8B80\u53D6\u9806\u9006\u6D41\uFF0C\u518D\u5F9E\u6F6E\u9580\u6771\u5074\u6DF1\u6C34\u901A\u904E\uFF1B\u6C34\u4F4D\u4E0D\u8DB3\u4E5F\u6709\u5B8C\u6574\u822A\u8DEF\u3002",[Ct("harbor","lighthouse",[[45,90],[70,-40],[70,-140]])])]}],Ee=(i,e,t,n,s,r)=>({id:i,label:e,reason:t,kind:n,waypoints:[{x:s,z:r}]}),Rn=(i,e,t,n,s,r,o,a={})=>({id:i,name:e,x:t,z:n,radius:s,directions:{...r?{north:Array.isArray(r)?{options:r}:r}:{},...o?{south:Array.isArray(o)?{options:o}:o}:{},...a}}),Mr=Object.freeze({north:Object.freeze({x:0,z:-1}),south:Object.freeze({x:0,z:1}),east:Object.freeze({x:1,z:0}),west:Object.freeze({x:-1,z:0})}),ko=[Rn("shoal-margin","\u5357\u65B9\u6F6E\u810A\u897F\u7DE3",-35,99,35,{entries:[{destinationIslandId:"reef",x:0,z:126,radius:14,lateralRadius:24,options:[Ee("outer","\u6F6E\u810A\u897F\u5074\u7E5E\u884C","\u897F\u5074\u822A\u5411\u8F03\u63A5\u8FD1\u56FA\u5B9A\u98A8\u5411\uFF0C\u5F8C\u6BB5\u5F9E\u7409\u7483\u897F\u5357\u65B9\u5165\u6CCA\uFF1B\u5FC5\u9808\u4FDD\u6301\u7901\u5708\u5916\u7684\u8F49\u5411\u3002","safe",-30,76),Ee("inner","\u6F6E\u810A\u6771\u5074\u7E5E\u884C","\u6771\u5074\u822A\u5411\u7684\u5E06\u529B\u8F03\u5F31\uFF0C\u5F8C\u6BB5\u63A5\u7409\u7483\u5357\u9762\u6CCA\u4F4D\u8F03\u76F4\u63A5\uFF1B\u540C\u6A23\u5F9E\u7901\u5708\u5916\u901A\u904E\u3002","direct",28,72)]}],options:[Ee("outer","\u5916\u7DE3\u7559\u8DB3\u5CB8\u8DDD","\u897F\u5074\u6DF1\u6C34\u7559\u51FA\u66F4\u5927\u7684\u8F49\u8235\u7A7A\u9593\uFF0C\u4E0B\u4E00\u6BB5\u5230\u7409\u7483\u7901\u8F03\u9060\u3002","safe",-48,84),Ee("inner","\u5167\u7DE3\u7E2E\u77ED\u63A5\u8FD1","\u5F9E\u6F6E\u810A\u897F\u7DE3\u8FD1\u7DDA\u901A\u904E\uFF0C\u7E2E\u77ED\u5F80\u4E2D\u592E\u6CCA\u4F4D\u7684\u5F8C\u6BB5\uFF1B\u9700\u5B88\u4F4F\u7901\u5916\u5CB8\u8DDD\u3002","current",-24,84)]},{entry:{x:-35,z:99,radius:39.5},entries:[{destinationIslandId:"harbor",x:0,z:60,radius:9,lateralRadius:15,options:[Ee("outer","\u897F\u5074\u7E5E\u7901\u8FD4\u6E2F","\u7531\u6F6E\u810A\u897F\u5074\u6DF1\u6C34\u8FD4\u6E2F\uFF0C\u56FA\u5B9A\u98A8\u89D2\u8F03\u6709\u5229\uFF1B\u5F8C\u6BB5\u8981\u5411\u6771\u5C0D\u6E96\u6BCD\u6E2F\u3002","safe",-30,105),Ee("inner","\u6771\u5074\u7E5E\u7901\u8FD4\u6E2F","\u5F9E\u6F6E\u810A\u6771\u5074\u6DF1\u6C34\u8FD4\u6E2F\uFF0C\u5F8C\u6BB5\u8F03\u63A5\u8FD1\u6BCD\u6E2F\u4E2D\u7DDA\uFF1B\u5E06\u89D2\u8F03\u5F31\u4E14\u9760\u8FD1\u7901\u5074\uFF0C\u9808\u5B88\u4F4F\u8DEF\u9EDE\u3002","direct",30,108)]},{x:-34,z:82,radius:32,lateralRadius:8}],options:[Ee("outer","\u5916\u7DE3\u4FDD\u7559\u8F49\u8235\u7A7A\u9593","\u6CBF\u897F\u5074\u6DF1\u6C34\u51FA\u7063\uFF0C\u96E2\u6F6E\u810A\u8F03\u9060\u4F46\u8FD4\u6E2F\u9700\u591A\u8F49\u4E00\u6B21\u8235\u3002","safe",-48,94),Ee("inner","\u8FD1\u7901\u7DDA\u659C\u5411\u6BCD\u6E2F","\u5F9E\u6F6E\u810A\u897F\u7DE3\u659C\u5411\u6BCD\u6E2F\uFF0C\u822A\u7A0B\u8F03\u76F4\u63A5\uFF1B\u4E0D\u8981\u5207\u9032\u6A19\u793A\u7901\u5708\u3002","current",-24,94)]}),Rn("glass-west-current","\u7409\u7483\u897F\u5CB8\u6D41\u53E3",-53,37,50,[Ee("outer","\u6F6E\u9053\u5916\u7DE3","\u8F03\u897F\u7684\u822A\u7DDA\u6E1B\u5C11\u5074\u6D41\u63A8\u79FB\uFF0C\u4FDD\u7559\u8F03\u5927\u96E2\u7901\u7A7A\u9593\u3002","safe",-78,29),Ee("inner","\u8CBC\u6D41\u9032\u5165\u5167\u7063","\u9760\u8FD1\u9752\u6839\u6F6E\u9053\u4E2D\u5FC3\uFF0C\u9806\u6D41\u6642\u501F\u901F\u3001\u9006\u6D41\u6642\u591A\u627F\u53D7\u6D41\u963B\u3002","current",-36,29)],{entry:{x:-53,z:37,radius:52},entries:[{x:-40,z:-10,radius:14,lateralRadius:16,options:[Ee("outer","\u897F\u5074\u6DF1\u6C34\u659C\u51FA\u7063","\u659C\u5411\u897F\u5074\u6DF1\u6C34\uFF0C\u8207\u7409\u7483\u7901\u4FDD\u7559\u8F03\u5927\u8DDD\u96E2\uFF1B\u5F9E\u5317\u7901\u63A5\u8FD1\u6642\u5E06\u89D2\u8F03\u6709\u5229\uFF0C\u4F46\u822A\u7A0B\u8F03\u9577\uFF0C\u5357\u5074\u4ECD\u9700\u56DE\u6B63\u3002","safe",-58,28),Ee("inner","\u7901\u897F\u8FD1\u7DDA\u51FA\u7063","\u6CBF\u7901\u897F\u8F03\u8FD1\u7684\u6DF1\u6C34\u7DDA\u63A5\u5357\u7063\uFF0C\u7E2E\u77ED\u7E5E\u884C\uFF1B\u5CB8\u8DDD\u8F03\u5C0F\uFF0C\u5F9E\u5317\u7901\u63A5\u8FD1\u6642\u5E06\u89D2\u8F03\u5F31\u3002","current",-38,25)]},{x:-24,z:-10,radius:18.5,lateralRadius:24,options:[Ee("outer","\u897F\u5074\u7A7F\u6D41\u7559\u5CB8\u8DDD","\u659C\u7A7F\u897F\u5074\u6C34\u57DF\uFF0C\u4FDD\u7559\u8F03\u5927\u7901\u5CB8\u8DDD\u96E2\uFF1B\u5F9E\u5317\u7901\u63A5\u8FD1\u6642\u5E06\u89D2\u8F03\u6709\u5229\uFF0C\u5357\u5074\u4ECD\u9700\u56DE\u6B63\u3002\u8ACB\u6309\u7576\u4E0B\u6CBF\u822A\u8DEF\u6D41\u901F\u6BD4\u8F03\u53D6\u6368\u3002","current",-55,20),Ee("inner","\u7901\u897F\u8FD1\u7DDA\u63A5\u5357\u7063","\u5F9E\u7409\u7483\u897F\u5CB8\u8F03\u8FD1\u7684\u6DF1\u6C34\u7DDA\u9032\u5165\u5357\u7063\uFF0C\u5C11\u5411\u897F\u7E5E\u884C\uFF1B\u5CB8\u8DDD\u8F03\u5C0F\uFF0C\u5F9E\u5317\u7901\u63A5\u8FD1\u6642\u5E06\u89D2\u8F03\u5F31\u3002","safe",-36,20)]}],options:[Ee("outer","\u5916\u7DE3\u51FA\u7063","\u5F9E\u6F6E\u9053\u5916\u7DE3\u56DE\u5230\u5357\u7063\uFF0C\u6D41\u5F71\u97FF\u8F03\u5C0F\u4F46\u96E2\u6BCD\u6E2F\u4E2D\u7DDA\u8F03\u9060\u3002","safe",-70,12),Ee("inner","\u5167\u7DE3\u501F\u6D41\u51FA\u7063","\u6CBF\u7409\u7483\u7901\u897F\u5074\u7684\u8F03\u5F37\u6D41\u5E36\u51FA\u7063\uFF0C\u4F9D\u7576\u524D\u6D41\u5411\u6C7A\u5B9A\u662F\u5426\u503C\u5F97\u3002","current",-36,20)]}),Rn("green-current","\u9752\u6839\u6F6E\u9053\u5206\u6D41",-48,-8,48,[Ee("outer","\u7D05\u6A39\u5916\u7DE3\u6C34\u9053","\u8F03\u897F\u5074\u6D41\u529B\u8F03\u5F31\uFF0C\u9760\u9752\u6839\u6CCA\u4F4D\u4E5F\u8F03\u76F4\u63A5\u3002","safe",-87,-36),Ee("inner","\u4E2D\u592E\u6D41\u5E36","\u4E2D\u592E\u6D41\u5E36\u8F03\u5F37\uFF1B\u5317\u4E0A\u9806\u6D41\u53EF\u52A0\u901F\uFF0C\u9006\u6D41\u5247\u589E\u52A0\u6642\u9593\u3002","current",-43,-36)],[Ee("outer","\u897F\u7DE3\u6E1B\u5C11\u9006\u6D41","\u6CBF\u8F03\u5F31\u6D41\u529B\u7684\u5916\u7DE3\u8FD4\u822A\uFF0C\u4EE5\u8DDD\u96E2\u63DB\u53D6\u8F03\u5C11\u6D41\u963B\u3002","safe",-68,-12),Ee("inner","\u4E2D\u592E\u6D41\u5E36\u8FD4\u822A","\u4E2D\u592E\u6D41\u5E36\u8F03\u5F37\uFF1B\u5357\u4E0B\u662F\u5426\u501F\u5230\u6D41\u901F\u53D6\u6C7A\u65BC\u76EE\u524D\u6F6E\u76F8\u3002","current",-52,-20)]),Rn("whirl-east-margin","\u9752\u6839\u65CB\u6D41\u6771\u7DE3",-18,-87,54,{entry:{x:-18,z:-94,radius:45,lateralRadius:26},options:[Ee("outer","\u5411\u6771\u591A\u7559\u65CB\u6D41\u8DDD\u96E2","\u504F\u6771\u6DF1\u6C34\u96E2\u65CB\u6D41\u66F4\u9060\uFF0C\u9069\u5408\u5148\u78BA\u4FDD\u8F49\u8235\u7A7A\u9593\u3002","safe",5,-104),Ee("inner","\u65CB\u6D41\u5916\u5708\u8FD1\u7DDA","\u8CBC\u8457\u65CB\u6D41\u5916\u5708\u7684\u6DF1\u6C34\u8FD1\u7DDA\u5317\u4E0A\uFF0C\u8DEF\u8F03\u76F4\u63A5\u4F46\u8981\u5B88\u4F4F\u5916\u5708\u3002","current",-25,-104)]},{entry:{x:0,z:-87,radius:42,lateralRadius:42},options:[Ee("outer","\u6771\u5074\u6DF1\u6C34\u8FD4\u822A","\u9060\u96E2\u65CB\u6D41\u5F8C\u518D\u8F49\u5165\u6D77\u5716\u4E2D\u592E\uFF0C\u5074\u6D41\u5F71\u97FF\u8F03\u5C11\u3002","safe",5,-70),Ee("inner","\u9752\u6839\u6F6E\u9053\u63A5\u7E8C\u7DDA","\u6CBF\u65CB\u6D41\u6771\u5074\u63A5\u5165\u9752\u6839\u6F6E\u9053\uFF1B\u6BD4\u8F03\u7576\u524D\u6D41\u5411\u8207\u8F03\u76F4\u63A5\u7684\u897F\u5074\u8DEF\u5F91\u3002","current",-25,-70)]}),Rn("north-reef-current","\u7409\u7483\u5317\u7901\u6D41\u53E3",-24,-48,46,{destinationIslandId:"lighthouse",entry:{x:-24,z:-55,radius:54},options:[Ee("outer","\u897F\u5074\u5F37\u6D41\u7DDA","\u897F\u5074\u63A5\u8FD1\u9752\u6839\u6F6E\u9053\u4E2D\u5FC3\uFF0C\u9806\u6D41\u53EF\u7701\u6642\uFF0C\u9006\u6D41\u6703\u62D6\u6162\u3002","current",-40,-74),Ee("inner","\u6771\u5074\u5F31\u6D41\u7DDA","\u6771\u5074\u6D41\u529B\u8F03\u5F31\uFF0C\u4F46\u4E0B\u4E00\u6BB5\u9808\u4FDD\u7559\u65CB\u6D41\u7684\u6771\u5074\u901A\u9053\u3002","safe",-12,-74)]},{entry:{x:-20,z:-38,radius:34,lateralRadius:60},entries:[{x:4,z:-48,radius:31,lateralRadius:12,options:[Ee("outer","\u6771\u4F86\u5411\u897F\u5074\u6D41\u5E36","\u5F9E\u65CB\u6D41\u6771\u5074\u63A5\u8FD1\u6642\uFF0C\u659C\u5411\u897F\u5074\u8F03\u5F37\u6D41\u5E36\uFF0C\u8F03\u8FD1\u7901\u7DDA\u591A\u7559\u96E2\u5CB8\u8DDD\u96E2\uFF1B\u9806\u9006\u6D41\u6C7A\u5B9A\u9019\u6BB5\u7684\u6642\u9593\u6210\u672C\u3002","current",-33,-28),Ee("inner","\u6771\u4F86\u5411\u7901\u5916\u8FD1\u7DDA","\u5F9E\u65CB\u6D41\u6771\u5074\u63A5\u8FD1\u6642\uFF0C\u6CBF\u8F03\u5F31\u6D41\u7684\u8FD1\u7DDA\u5357\u4E0B\uFF1B\u6A6B\u5411\u822A\u7A0B\u8F03\u77ED\uFF0C\u4F46\u66F4\u9760\u8FD1\u7409\u7483\u7901\u5317\u5074\u5CB8\u7DDA\u3002","safe",-15,-22)]}],options:[Ee("outer","\u897F\u5074\u6D41\u5E36\u51FA\u5165\u53E3","\u8F03\u897F\u5074\u6D41\u529B\u66F4\u5F37\uFF0C\u4E14\u96E2\u7409\u7483\u7901\u8F03\u9060\uFF1B\u9806\u9006\u6D41\u6C7A\u5B9A\u6642\u9593\u6210\u672C\u3002","current",-40,-22),Ee("inner","\u7901\u5916\u5F31\u6D41\u7DDA","\u907F\u958B\u6F6E\u9053\u4E2D\u5FC3\u7684\u8F03\u5F37\u6D41\u529B\uFF0C\u4EE3\u50F9\u662F\u66F4\u9760\u8FD1\u7409\u7483\u7901\u5317\u5074\u5CB8\u7DDA\u3002","safe",-15,-22)]}),Rn("beacon-wind","\u71C8\u5854\u6CCA\u5916\u5206\u6D41",0,-145,26,{destinationIslandId:"lighthouse",entry:{x:0,z:-140,radius:30},options:[Ee("outer","\u897F\u5074\u5C0D\u4F4D\u518D\u9760\u6CCA","\u5F9E\u897F\u5074\u6DF1\u6C34\u9810\u7559\u8F49\u8235\u7A7A\u9593\uFF0C\u518D\u659C\u5411\u71C8\u5854\u6CCA\u4F4D\uFF1B\u822A\u7A0B\u8F03\u9577\uFF0C\u9700\u5728\u6700\u5F8C\u8F49\u5411\u524D\u6536\u5E06\u3002","safe",-20,-172),Ee("inner","\u4E2D\u592E\u8FD1\u7DDA\u9760\u6CCA","\u6CBF\u4E2D\u592E\u77ED\u7DDA\u63A5\u8FD1\u71C8\u5854\u6CCA\u4F4D\uFF1B\u8F03\u65E9\u9762\u5C0D\u5CF6\u5CB8\uFF0C\u9808\u53CA\u6642\u6536\u5E06\u907F\u514D\u904E\u885D\u3002","direct",0,-172)]},[Ee("outer","\u897F\u5074\u6DF1\u6C34\u8FD4\u822A","\u5411\u897F\u63A5\u5165\u65CB\u6D41\u6771\u5074\u6DF1\u6C34\u5ECA\u9053\uFF0C\u8F03\u5C11\u53D7\u5230\u661F\u76E4\u6F6E\u6D41\u5F71\u97FF\u3002","safe",-20,-112),Ee("inner","\u6771\u5074\u63A5\u661F\u76E4\u6F6E\u9053","\u504F\u6771\u63A5\u8FD1\u661F\u76E4\u6D41\u5E36\uFF1B\u9806\u6D41\u53EF\u80FD\u7701\u6642\uFF0C\u9006\u6D41\u6642\u5916\u7DE3\u66F4\u5BB9\u6613\u524D\u9032\u3002","current",20,-112)],{west:{destinationIslandId:"lighthouse",entry:{x:36,z:-140,radius:42,lateralRadius:35},options:[Ee("outer","\u6771\u5074\u7559\u5CB8\u8DDD\u5165\u6CCA","\u5148\u5728\u71C8\u5854\u6771\u5357\u5074\u9810\u7559\u8F49\u5411\u7A7A\u9593\uFF0C\u518D\u5411\u6CCA\u4F4D\u9760\u650F\uFF1B\u672B\u6BB5\u8F03\u9577\u4F46\u9060\u96E2\u5CF6\u5CB8\u3002","safe",20,-172),Ee("inner","\u4E2D\u592E\u77ED\u7DDA\u5C0D\u4F4D","\u76F4\u63A5\u659C\u5411\u4E2D\u592E\u6CCA\u4F4D\u5EF6\u9577\u7DDA\uFF0C\u5F8C\u6BB5\u8F03\u77ED\uFF1B\u5148\u6536\u5E06\u518D\u63A5\u8FD1\u71C8\u5854\u5CB8\u7DDA\u3002","direct",0,-172)]}}),Rn("white-whirl-margin","\u767D\u7FBD\u65CB\u6D41\u897F\u7DE3",54,91,48,{entry:{x:54,z:91,radius:40},options:[Ee("outer","\u897F\u5074\u5BEC\u6C34\u57DF","\u4FDD\u7559\u8F03\u5927\u65CB\u6D41\u8207\u5CF6\u5CB8\u8DDD\u96E2\uFF0C\u5F80\u767D\u7FBD\u6CCA\u4F4D\u9700\u518D\u8F49\u5411\u3002","safe",48,56),Ee("inner","\u767D\u7FBD\u6CCA\u5916\u8FD1\u7DDA","\u6CBF\u65CB\u6D41\u897F\u5074\u8FD1\u7DDA\u5C0D\u6E96\u767D\u7FBD\u6E2F\uFF0C\u7E2E\u77ED\u5F8C\u6BB5\u4F46\u9700\u8981\u7CBE\u6E96\u8F49\u8235\u3002","current",76,56)]},{entry:{x:54,z:91,radius:48},options:[Ee("outer","\u897F\u5074\u5BEC\u6C34\u57DF\u8FD4\u6E2F","\u5411\u897F\u4FDD\u7559\u65CB\u6D41\u8DDD\u96E2\uFF0C\u518D\u659C\u5411\u6BCD\u6E2F\uFF0C\u8F49\u8235\u7A7A\u9593\u8F03\u5927\u3002","safe",40,112),Ee("inner","\u65CB\u6D41\u8FD1\u5074\u77ED\u7DDA","\u7531\u65CB\u6D41\u897F\u5074\u6DF1\u6C34\u8FD1\u7DDA\u56DE\u6E2F\uFF0C\u8DEF\u66F4\u76F4\u63A5\u4F46\u4E0D\u8981\u5F80\u6771\u5207\u5165\u65CB\u6D41\u5708\u3002","current",50,100)]}),Rn("glass-east-margin","\u7409\u7483\u6771\u5CB8\u6C34\u9053",45,25,46,{entry:{x:45,z:25,radius:45},options:[Ee("outer","\u6771\u5074\u6DF1\u6C34\u7DDA","\u96E2\u7409\u7483\u7901\u8F03\u9060\uFF0C\u9069\u5408\u9810\u7559\u8F49\u5165\u661F\u76E4\u6F6E\u9053\u7684\u7A7A\u9593\u3002","safe",65,0),Ee("inner","\u7901\u5916\u8FD1\u5074\u7DDA","\u9760\u8FD1\u7409\u7483\u7901\u6771\u5074\u5916\u7DE3\u901A\u904E\uFF0C\u8207\u897F\u5074\u68F2\u5730\u7684\u63A5\u7E8C\u8F03\u77ED\uFF1B\u52FF\u8CBC\u5CB8\u6025\u8F49\u3002","current",42,0)]},{entry:{x:45,z:25,radius:45},options:[Ee("outer","\u767D\u7FBD\u5074\u6DF1\u6C34\u7DDA","\u5F9E\u6771\u5074\u6DF1\u6C34\u63A5\u5411\u767D\u7FBD\u5167\u7063\uFF0C\u8F03\u5C11\u8FD1\u5CB8\u4FEE\u6B63\u3002","safe",65,52),Ee("inner","\u4E2D\u592E\u7901\u5916\u8FD1\u7DDA","\u5F9E\u7409\u7483\u7901\u6771\u5074\u5916\u7DE3\u5411\u6BCD\u6E2F\u4E2D\u7DDA\u63A5\u8FD1\uFF0C\u7559\u610F\u8239\u9AD4\u7684\u96E2\u7901\u7A7A\u9593\u3002","current",36,52)]}),Rn("star-gate-margin","\u661F\u76E4\u6F6E\u9580\u6771\u7DE3",74,-29,26,{entry:{x:74,z:-29,radius:22},options:[Ee("outer","\u6771\u5074\u5BEC\u6DF1\u6C34","\u8207\u661F\u76E4\u6F6E\u9580\u4FDD\u6301\u8F03\u5927\u8DDD\u96E2\uFF0C\u6D41\u529B\u4E5F\u8F03\u504F\u5916\u7DE3\u3002","safe",82,-65),Ee("inner","\u6F6E\u9580\u5916\u501F\u6D41\u7DDA","\u4ECD\u5F9E\u6F6E\u9580\u5916\u5074\u901A\u904E\uFF0C\u4F46\u9760\u8FD1\u661F\u76E4\u6F6E\u9053\u4E2D\u5FC3\uFF1B\u6D41\u5411\u6C7A\u5B9A\u80FD\u5426\u7701\u6642\u3002","current",68,-64)]},[Ee("outer","\u6771\u5074\u5916\u7DE3\u8FD4\u822A","\u4EE5\u8F03\u5927\u7684\u7901\u5916\u7A7A\u9593\u63DB\u53D6\u8F03\u5F31\u7684\u6F6E\u9053\u63A8\u79FB\u3002","safe",82,7),Ee("inner","\u4E2D\u592E\u6D41\u5E36\u8FD4\u822A","\u6CBF\u6F6E\u9580\u6771\u5074\u6D41\u5E36\u5357\u4E0B\uFF0C\u9806\u9006\u6D41\u6703\u6539\u8B8A\u8FD4\u822A\u6642\u9593\u3002","current",65,7)]),Rn("star-north-current","\u661F\u76E4\u5317\u5074\u6D41\u7DE3",70,-100,26,[Ee("outer","\u5317\u5074\u6DF1\u6C34\u5916\u7DE3","\u5148\u6CBF\u661F\u76E4\u5916\u5074\u6DF1\u6C34\u5317\u884C\uFF0C\u518D\u8F49\u5411\u71C8\u5854\uFF0C\u4FDD\u7559\u5CF6\u5CB8\u7A7A\u9593\u3002","safe",76,-132),Ee("inner","\u504F\u897F\u63A5\u71C8\u5854","\u504F\u897F\u7A7F\u904E\u6F6E\u9053\uFF0C\u5F80\u71C8\u5854\u7684\u5F8C\u6BB5\u8F03\u77ED\uFF1B\u9700\u4FEE\u6B63\u5074\u6D41\u63A8\u79FB\u3002","current",48,-132)],[Ee("outer","\u6771\u5074\u6D41\u7DE3","\u5411\u661F\u76E4\u6F6E\u9053\u5916\u7DE3\u79FB\u52D5\uFF0C\u8F03\u5BB9\u6613\u63A7\u5236\u4E0B\u4E00\u6B21\u9760\u6CCA\u8F49\u5411\u3002","safe",76,-68),Ee("inner","\u897F\u5074\u6D41\u5E36","\u7559\u5728\u8F03\u9760\u8FD1\u6F6E\u9580\u7684\u6D41\u5E36\u4E2D\uFF0C\u4F9D\u9806\u9006\u6D41\u6BD4\u8F03\u8FD4\u822A\u8DEF\u7A0B\u3002","current",65,-68)]),Rn("west-current-exit","\u9752\u6839\u6D41\u5C3E\u8207\u6F6E\u810A\u8F49\u63A5",-41.5,56,40,null,{entries:[{x:-45,z:50,radius:36,options:[Ee("outer","\u897F\u5074\u6D41\u5C3E\u63A5\u6F6E\u810A","\u6CBF\u897F\u5074\u6C34\u57DF\u63A5\u5411\u6F6E\u810A\u5916\u7DE3\uFF0C\u4FDD\u7559\u8F03\u5927\u7684\u96E2\u7901\u7A7A\u9593\uFF1B\u5357\u7AEF\u518D\u5411\u6BCD\u6E2F\u56DE\u6B63\uFF0C\u6D41\u6CC1\u770B\u7576\u4E0B\u6CBF\u7DDA\u6295\u5F71\u3002","current",-48,70),Ee("inner","\u659C\u51FA\u6D41\u5C3E\u63A5\u6F6E\u810A","\u5411\u6771\u659C\u51FA\u6D41\u5C3E\uFF0C\u8F03\u65E9\u63A5\u8FD1\u6F6E\u810A\u897F\u5074\uFF1B\u5F8C\u6BB5\u8F03\u76F4\u63A5\uFF0C\u4F46\u96E2\u7901\u7A7A\u9593\u8F03\u5C0F\uFF0C\u9700\u5B88\u4F4F\u8FD1\u7DDA\u3002","safe",-30,60)]}],options:[Ee("outer","\u897F\u7DE3\u7559\u6D41\u518D\u7E5E\u6F6E\u810A","\u6CBF\u897F\u5074\u6D41\u5C3E\u63A5\u5411\u6F6E\u810A\u5916\u7DE3\uFF1B\u6BD4\u8F03\u76EE\u524D\u6D41\u6CC1\u8207\u5F8C\u7E8C\u8DDD\u96E2\u3002","current",-65,65),Ee("inner","\u63D0\u65E9\u96E2\u6D41\u63A5\u8FD1\u6F6E\u810A","\u659C\u7A7F\u6D41\u5C3E\u5F8C\u96E2\u958B\u6D41\u5E36\uFF0C\u8F03\u65E9\u63A5\u8FD1\u6F6E\u810A\u897F\u5074\uFF1B\u9806\u6D41\u6642\u6703\u653E\u68C4\u90E8\u5206\u6D41\u901F\u3002","safe",-30,65)]}),Rn("harbor-approach","\u6F6E\u97F3\u6E2F\u6CCA\u5916\u9032\u6E2F",20,147,60,null,{destinationIslandId:"harbor",entry:{x:20,z:147,radius:60,maxDestinationDistance:76},entries:[{x:-38,z:128,radius:38,lateralRadius:24,maxDestinationDistance:50}],options:[Ee("outer","\u5916\u5074\u5C0D\u4F4D\u5F8C\u5165\u6E2F","\u5148\u5728\u6CCA\u4F4D\u897F\u5074\u5C0D\u4F4D\uFF0C\u4FDD\u7559\u8F03\u5927\u7684\u5CB8\u8DDD\uFF1B\u6700\u5F8C\u4ECD\u9700\u6536\u5E06\u8F49\u5411\u91D1\u8272\u6CCA\u4F4D\u3002","safe",-20,135),Ee("inner","\u76F4\u63A5\u5C0D\u6E96\u91D1\u8272\u6CCA\u4F4D","\u6700\u76F4\u63A5\u7684\u9032\u6E2F\u7DDA\uFF0C\u9760\u8FD1\u6BCD\u6E2F\u5CB8\u7DDA\u524D\u9700\u53CA\u6642\u6536\u5E06\uFF0C\u907F\u514D\u904E\u885D\u3002","current",-12,141)]}),{id:"glass-white-crossing",name:"\u7409\u7483\u8207\u767D\u7FBD\u6A6B\u5411\u9032\u6E2F",x:54,z:35,radius:20,directions:{east:{destinationIslandId:"gull",entry:{x:64,z:35,radius:17,lateralRadius:38},options:[Ee("outer","\u767D\u7FBD\u6CCA\u5916\u5C0D\u4F4D","\u5148\u5728\u767D\u7FBD\u6CCA\u4F4D\u7684\u5916\u5074\u5EF6\u9577\u7DDA\u5C0D\u4F4D\uFF0C\u518D\u6CBF\u5CB8\u5916\u65B9\u5411\u5165\u6E2F\uFF1B\u822A\u7A0B\u8F03\u9577\uFF0C\u8F49\u5411\u6642\u6709\u8F03\u591A\u96E2\u5CB8\u7A7A\u9593\u3002","safe",76,20),Ee("inner","\u767D\u7FBD\u8FD1\u5074\u77ED\u7DDA","\u76F4\u63A5\u63A5\u8FD1\u767D\u7FBD\u897F\u5317\u6CCA\u4F4D\uFF0C\u5C11\u7E5E\u4E00\u6BB5\uFF1B\u8F03\u65E9\u63A5\u8FD1\u5CF6\u5CB8\uFF0C\u9808\u6536\u5E06\u4E26\u5B88\u4F4F\u91D1\u8272\u6CCA\u4F4D\u65B9\u5411\u3002","direct",76,38)]},west:{destinationIslandId:"reef",entry:{x:44,z:35,radius:20},options:[Ee("outer","\u7409\u7483\u6CCA\u5916\u5C0D\u4F4D","\u5148\u5230\u7409\u7483\u5357\u65B9\u6CCA\u4F4D\u5916\u5074\uFF0C\u518D\u5411\u5317\u5C0D\u6E96\u6CCA\u4F4D\uFF1B\u8F03\u9577\u4F46\u4FDD\u7559\u8F49\u8235\u8207\u96E2\u5CB8\u7A7A\u9593\u3002","safe",0,48),Ee("inner","\u7409\u7483\u8FD1\u5074\u77ED\u7DDA","\u5F9E\u6771\u5357\u65B9\u76F4\u63A5\u63A5\u8FD1\u7409\u7483\u6CCA\u4F4D\uFF0C\u7E2E\u77ED\u822A\u7A0B\uFF1B\u6536\u5E06\u5F8C\u624D\u8F49\u5411\u8FD1\u7901\u6CCA\u4F4D\uFF0C\u907F\u514D\u5207\u5165\u5CB8\u7DDA\u3002","direct",24,31)]}}},{id:"glass-port-approach",name:"\u7409\u7483\u897F\u5357\u6CCA\u5916",x:-38,z:36,radius:18,directions:{south:{destinationIslandId:"reef",entry:{x:-36,z:11,radius:6,lateralRadius:12},options:[Ee("outer","\u5357\u5074\u5C0D\u4F4D\u5165\u6E2F","\u5148\u7559\u5728\u7409\u7483\u5357\u5074\u6DF1\u6C34\uFF0C\u518D\u5411\u5317\u5C0D\u6E96\u6CCA\u4F4D\uFF1B\u8DDD\u96E2\u8F03\u9577\uFF0C\u8F49\u5411\u6642\u96E2\u5CB8\u8F03\u9060\u3002","safe",-8,40),Ee("inner","\u8FD1\u7901\u77ED\u7DDA\u5165\u6E2F","\u5F9E\u897F\u5357\u5074\u8FD1\u7DDA\u63A5\u6CCA\u4F4D\uFF0C\u7E2E\u77ED\u822A\u7A0B\uFF1B\u4FDD\u6301\u8239\u8EAB\u5728\u7901\u5CB8\u5916\uFF0C\u5148\u6536\u5E06\u518D\u8F49\u5411\u3002","direct",-16,31)]},east:{destinationIslandId:"reef",minForwardDot:.5,entry:{x:-38,z:36,radius:28,lateralRadius:26,maxDestinationDistance:54},options:[Ee("outer","\u5357\u5074\u5C0D\u4F4D\u5165\u6E2F","\u5148\u7559\u5728\u7409\u7483\u5357\u5074\u6DF1\u6C34\uFF0C\u518D\u5411\u5317\u5C0D\u6E96\u6CCA\u4F4D\uFF1B\u8DDD\u96E2\u8F03\u9577\uFF0C\u8F49\u5411\u6642\u96E2\u5CB8\u8F03\u9060\u3002","safe",-8,40),Ee("inner","\u8FD1\u7901\u77ED\u7DDA\u5165\u6E2F","\u5F9E\u897F\u5357\u5074\u8FD1\u7DDA\u63A5\u6CCA\u4F4D\uFF0C\u7E2E\u77ED\u822A\u7A0B\uFF1B\u4FDD\u6301\u8239\u8EAB\u5728\u7901\u5CB8\u5916\uFF0C\u5148\u6536\u5E06\u518D\u8F49\u5411\u3002","direct",-16,31)]},north:{destinationIslandId:"reef",entry:{x:-30,z:61,radius:18,lateralRadius:75},options:[Ee("outer","\u897F\u5357\u6DF1\u6C34\u5C0D\u4F4D","\u5148\u5728\u897F\u5357\u5074\u7559\u8DB3\u5CB8\u8DDD\uFF0C\u518D\u8F49\u5411\u7409\u7483\u6CCA\u4F4D\uFF1B\u8F03\u9060\u4F46\u8F49\u5411\u7A7A\u9593\u8F03\u5927\u3002","safe",-28,37),Ee("inner","\u5357\u9762\u76F4\u63A5\u5C0D\u4F4D","\u5F9E\u7409\u7483\u5357\u65B9\u63A5\u8FD1\u6CCA\u4F4D\uFF0C\u5F8C\u6BB5\u8F03\u77ED\uFF1B\u9760\u8FD1\u7901\u5CB8\u524D\u5148\u6536\u5E06\u3002","direct",0,43)]}}},{id:"green-port-approach",name:"\u9752\u6839\u6CCA\u5916\u8207\u6D41\u7DE3",x:-90,z:-52,radius:22,directions:{west:{destinationIslandId:"mangrove",entry:{x:-66,z:-60,radius:46},options:[Ee("outer","\u6CCA\u5916\u5EF6\u9577\u7DDA\u5C0D\u4F4D","\u5148\u7559\u5728\u6CCA\u4F4D\u5EF6\u9577\u7DDA\u7684\u6DF1\u6C34\u5074\uFF0C\u4FDD\u7559\u5CB8\u8DDD\uFF1B\u4ECD\u63A5\u8FD1\u9752\u6839\u6D41\u5E36\uFF0C\u9808\u6BD4\u8F03\u7576\u524D\u5074\u63A8\u8207\u8F03\u9577\u8DEF\u7A0B\u3002","current",-65,-50),Ee("inner","\u5CB8\u5916\u76F4\u63A5\u5165\u6E2F","\u76F4\u63A5\u63A5\u8FD1\u9752\u6839\u6771\u5357\u6CCA\u4F4D\uFF0C\u8DEF\u7A0B\u8F03\u77ED\u4E14\u96E2\u6D41\u9053\u4E2D\u5FC3\u8F03\u9060\uFF1B\u9760\u5CB8\u8F49\u5411\u9808\u66F4\u7CBE\u6E96\u3002","safe",-92,-75)]},north:{destinationIslandId:"mangrove",entry:{x:-98,z:-50,radius:25,lateralRadius:20},options:[Ee("outer","\u6771\u5074\u6DF1\u6C34\u63A5\u6CCA\u4F4D","\u504F\u6771\u4FDD\u7559\u7D05\u6A39\u5CB8\u8DDD\uFF0C\u518D\u8F49\u5411\u6CCA\u4F4D\uFF1B\u63A5\u8FD1\u6D41\u5E36\uFF0C\u9700\u4FEE\u6B63\u6F6E\u6D41\u5074\u63A8\u3002","current",-80,-58),Ee("inner","\u6CBF\u5CB8\u5916\u7DE3\u8FD1\u7DDA","\u6CBF\u7D05\u6A39\u6771\u5357\u5CB8\u5916\u7684\u8FD1\u7DDA\u5165\u6E2F\uFF0C\u8F03\u5C11\u7E5E\u884C\uFF1B\u9808\u5B88\u4F4F\u5CB8\u8DDD\u4E26\u63D0\u524D\u6536\u5E06\u3002","safe",-105,-50)]}}},{id:"coral-port-approach",name:"\u73CA\u745A\u7063\u6CCA\u5916\u5C0D\u4F4D",x:-63,z:67,radius:18,directions:{west:{destinationIslandId:"coral",options:[Ee("outer","\u5317\u5074\u6DF1\u6C34\u5C0D\u4F4D","\u5148\u5230\u73CA\u745A\u6CCA\u4F4D\u5317\u5074\u7684\u5EF6\u9577\u7DDA\uFF0C\u518D\u6CBF\u5CB8\u5916\u65B9\u5411\u9032\u6E2F\uFF1B\u8F03\u9060\u4F46\u6709\u66F4\u591A\u8F49\u8235\u7A7A\u9593\u3002","safe",-72,42),Ee("inner","\u6771\u5074\u8FD1\u7DDA\u9032\u6E2F","\u7531\u6771\u5074\u8FD1\u7DDA\u76F4\u63A5\u63A5\u8FD1\u73CA\u745A\u6CCA\u4F4D\uFF1B\u8DDD\u96E2\u8F03\u77ED\uFF0C\u6536\u5E06\u5F8C\u518D\u5B8C\u6210\u9760\u5CB8\u8F49\u5411\u3002","direct",-82,64)]}}}],mn=[{id:"coral-crossing",name:"\u73CA\u745A\u5916\u7063\u6D6E\u6A19",x:-48,z:112,note:"\u73CA\u745A\u7063\u8207\u6F6E\u810A\u4E4B\u9593\u7559\u6709\u6DF1\u6C34\u7A7A\u9699\uFF0C\u96E2\u7901\u8D8A\u9060\uFF0C\u8D8A\u5C11\u53D7\u6C34\u4F4D\u9650\u5236\u3002"},{id:"coral-north",name:"\u73CA\u745A\u5317\u7DE3\u6D6E\u6A19",x:-89,z:18,note:"\u6CBF\u5CF6\u5CB8\u5916\u5074\u89C0\u5BDF\uFF0C\u6BD4\u8CBC\u8457\u73CA\u745A\u5CB8\u7DDA\u6025\u8F49\u66F4\u5BB9\u6613\u4FDD\u7559\u8239\u9AD4\u6DE8\u7A7A\u3002"},{id:"root-front",name:"\u7D05\u6A39\u524D\u7063\u6D6E\u6A19",x:-104,z:-30,note:"\u7D05\u6A39\u6839\u7CFB\u8B93\u7D30\u6C99\u6C89\u7A4D\uFF1B\u9760\u8FD1\u6839\u7063\u6642\u5148\u6536\u5E06\uFF0C\u80FD\u770B\u6E05\u6DFA\u7058\u908A\u7DE3\u3002"},{id:"root-stream",name:"\u9752\u6839\u6D41\u7DE3\u6D6E\u6A19",x:-86,z:-34,note:"\u540C\u4E00\u6F6E\u9053\u6703\u96A8\u6F6E\u76F8\u53CD\u5411\uFF1B\u6BD4\u8F03\u6D6E\u6CAB\u8207\u8239\u9996\uFF0C\u624D\u80FD\u5206\u8FA8\u9806\u6D41\u548C\u5074\u6D41\u3002"},{id:"glass-west",name:"\u7409\u7483\u897F\u7DE3\u6D6E\u6A19",x:-62,z:7,note:"\u7901\u5CF6\u897F\u7DE3\u9023\u63A5\u5169\u7247\u68F2\u5730\uFF1B\u7E5E\u5230\u6CCA\u4F4D\u5916\u5074\u5F8C\u518D\u8F49\u5411\uFF0C\u53EF\u4FDD\u7559\u5B89\u5168\u5CB8\u8DDD\u3002"},{id:"glass-approach",name:"\u7409\u7483\u6CCA\u5916\u6D6E\u6A19",x:-24,z:32,note:"\u7409\u7483\u6CCA\u4F4D\u5728\u7901\u5CF6\u5357\u9762\uFF0C\u6CBF\u5CF6\u5357\u5074\u9760\u8FD1\uFF0C\u80FD\u907F\u958B\u7A81\u51FA\u7684\u7901\u5CB8\u3002"},{id:"shoal-west",name:"\u6F6E\u810A\u897F\u5074\u6D6E\u6A19",x:-30,z:112,note:"\u5357\u65B9\u6F6E\u810A\u9732\u51FA\u6642\uFF0C\u897F\u5074\u6DF1\u6C34\u4ECD\u53EF\u901A\u884C\uFF1B\u53D6\u6A23\u4E5F\u80FD\u7528\u4F86\u6BD4\u8F03\u5169\u689D\u822A\u8DEF\u3002"},{id:"shoal-south",name:"\u6F6E\u810A\u8FD1\u7063\u6D6E\u6A19",x:-15,z:62,note:"\u6F6E\u810A\u7684\u53EF\u901A\u6C34\u4F4D\u7531\u7901\u9802\u6C7A\u5B9A\uFF1B\u6F32\u6F6E\u4E0D\u4EE3\u8868\u5DF2\u7D93\u80FD\u8D8A\u7901\uFF0C\u5148\u8B80\u6C34\u4F4D\u6A19\u8A18\u3002"},{id:"white-fork",name:"\u767D\u7FBD\u5206\u6D41\u6D6E\u6A19",x:74,z:135,note:"\u767D\u7FBD\u65CB\u6D41\u4F4D\u5728\u822A\u9053\u6771\u5074\uFF1B\u4FDD\u7559\u5916\u5708\u8DDD\u96E2\uFF0C\u6BD4\u7A7F\u904E\u4E2D\u5FC3\u66F4\u5BB9\u6613\u63A7\u5236\u8F49\u8235\u3002"},{id:"white-inlet",name:"\u767D\u7FBD\u6E2F\u5916\u6D6E\u6A19",x:75,z:68,note:"\u71D5\u9DD7\u6703\u6CBF\u9B5A\u7FA4\u8207\u6D41\u7DE3\u6D3B\u52D5\uFF1B\u89C0\u5BDF\u6D77\u9CE5\u53EF\u4EE5\u88DC\u5145\u6D77\u5716\uFF0C\u4E0D\u80FD\u53D6\u4EE3\u7901\u4F4D\u6A19\u8A18\u3002"},{id:"star-stream",name:"\u661F\u76E4\u5357\u6D41\u6D6E\u6A19",x:65,z:8,note:"\u6771\u5074\u6F6E\u9053\u8207\u897F\u5074\u6F6E\u9053\u65B9\u5411\u76F8\u53CD\uFF1B\u6F6E\u6C50\u9810\u5831\u80FD\u5E6B\u52A9\u9078\u64C7\u4E0B\u4E00\u6BB5\u501F\u6D41\u65B9\u5411\u3002"},{id:"star-gate",name:"\u6F6E\u9580\u6771\u7DE3\u6D6E\u6A19",x:77,z:-44,note:"\u661F\u76E4\u6F6E\u9580\u6771\u908A\u6709\u4E0D\u4F9D\u8CF4\u6C34\u4F4D\u7684\u5ECA\u9053\uFF1B\u501F\u4E2D\u592E\u6D41\u901F\u6642\u9700\u540C\u6642\u7559\u610F\u7901\u5708\u3002"},{id:"north-reef",name:"\u5317\u7901\u5ECA\u9053\u6D6E\u6A19",x:-42,z:-35,note:"\u96E2\u958B\u7409\u7483\u7901\u5411\u5317\u5F8C\uFF0C\u4E2D\u592E\u6DF1\u6C34\u9023\u63A5\u71C8\u5854\uFF1B\u5074\u6D41\u6703\u63A8\u79FB\u8239\u8EAB\uFF0C\u8239\u9996\u4E0D\u7B49\u65BC\u822A\u8DE1\u3002"},{id:"whirl-margin",name:"\u9752\u6839\u65CB\u6D41\u5916\u7DE3\u6D6E\u6A19",x:-35,z:-91,note:"\u65CB\u6D41\u5F37\u5EA6\u5177\u6709\u9031\u671F\uFF0C\u5916\u7DE3\u4ECD\u9700\u4FDD\u7559\u7A7A\u9593\uFF1B\u5B89\u5168\u5ECA\u9053\u5F9E\u65CB\u6D41\u6771\u908A\u7D93\u904E\u3002"},{id:"beacon-water",name:"\u9060\u6F6E\u6DF1\u6C34\u6D6E\u6A19",x:0,z:-145,note:"\u71C8\u5854\u5357\u9762\u7684\u6DF1\u6C34\u662F\u8FD4\u822A\u8F49\u5411\u5340\uFF1B\u5148\u5C0D\u6E96\u4E0B\u4E00\u6BB5\u822A\u8DEF\uFF0C\u518D\u628A\u5E06\u529B\u63D0\u9AD8\u3002"},{id:"beacon-approach",name:"\u5B88\u71C8\u4EBA\u8FCE\u822A\u6D6E\u6A19",x:-7,z:-166,note:"\u71C8\u5854\u6CCA\u4F4D\u671D\u5357\uFF0C\u6536\u5E06\u5F8C\u518D\u9032\u91D1\u8272\u6CCA\u4F4D\uFF1B\u53D6\u6A23\u8207\u9760\u5CB8\u90FD\u9700\u8981\u4F4E\u822A\u901F\u3002"}],br=[{id:"west-stream",name:"\u9752\u6839\u6F6E\u9053",x:-50,z:-10,radius:70,dx:.1,dz:-1,strength:.775,phase:0},{id:"east-stream",name:"\u661F\u76E4\u6F6E\u9053",x:70,z:-80,radius:75,dx:-.1,dz:1,strength:.9,phase:Math.PI}],Zi=[{id:"south-shoal",name:"\u5357\u65B9\u6F6E\u810A",x:0,z:92,radius:16,safeHeight:.35},{id:"east-gate",name:"\u661F\u76E4\u6F6E\u9580",x:43,z:-60,radius:15,safeHeight:.05}],Ji=[{id:"west-whirl",name:"\u9752\u6839\u65CB\u6D41",x:-58,z:-125,radius:20,phase:0,strength:1.625},{id:"east-whirl",name:"\u767D\u7FBD\u65CB\u6D41",x:86,z:115,radius:16,phase:Math.PI,strength:6}],Yn=[{id:"coral-dive",islandId:"coral",name:"\u73CA\u745A\u6DFA\u7063",partId:"prism",partName:"\u805A\u5149\u7A1C\u93E1",discoveryId:"foxfish",entry:{x:-98,z:66},target:{x:-83,z:54},bubbles:[{x:-91,z:60}],radius:26,oxygen:55},{id:"ruin-dive",islandId:"ruin",name:"\u6C89\u9418\u6C34\u5EAD",partId:"gear",partName:"\u6F6E\u9418\u9F52\u8F2A",discoveryId:"tide-clock",entry:{x:99,z:-80},target:{x:83,z:-69},bubbles:[{x:91,z:-74}],radius:26,oxygen:55},{id:"reef-dive",islandId:"reef",name:"\u7409\u7483\u6D1E\u7063",partId:"crystal",partName:"\u71C8\u82AF\u6676\u77F3",discoveryId:"nautilus",entry:{x:0,z:27},target:{x:16,z:40},bubbles:[{x:8,z:33}],radius:26,oxygen:55}];var gn=(i,e,t)=>Math.max(e,Math.min(t,i)),Tt=(i,e)=>Math.hypot(i.x-e.x,i.z-e.z),Ps=i=>Gt.find(e=>e.id===i)||Gt[0],Qi=i=>qn.find(e=>e.id===i)||qn[0],Ho=i=>Yn.find(e=>e.id===i),Ye=(i,e,t={})=>({type:i,text:e,...t}),ec=[{label:"\u6F32\u6F6E\u30FB\u9AD8\u6C34\u4F4D",direction:"rising",waterLevel:"high",description:"\u5F9E\u4E2D\u6C34\u4F4D\u6301\u7E8C\u4E0A\u5347\uFF0C\u76F4\u5230\u6700\u9AD8\u6C34\u4F4D\u3002"},{label:"\u9000\u6F6E\u30FB\u9AD8\u6C34\u4F4D",direction:"falling",waterLevel:"high",description:"\u5F9E\u6700\u9AD8\u6C34\u4F4D\u6301\u7E8C\u4E0B\u964D\uFF0C\u76F4\u5230\u4E2D\u6C34\u4F4D\u3002"},{label:"\u9000\u6F6E\u30FB\u4F4E\u6C34\u4F4D",direction:"falling",waterLevel:"low",description:"\u5F9E\u4E2D\u6C34\u4F4D\u6301\u7E8C\u4E0B\u964D\uFF0C\u76F4\u5230\u6700\u4F4E\u6C34\u4F4D\u3002"},{label:"\u6F32\u6F6E\u30FB\u4F4E\u6C34\u4F4D",direction:"rising",waterLevel:"low",description:"\u5F9E\u6700\u4F4E\u6C34\u4F4D\u6301\u7E8C\u4E0A\u5347\uFF0C\u76F4\u5230\u4E2D\u6C34\u4F4D\u3002"}],$h="\u822A\u6D77\u5370\u8A18\u50C5\u4F9B\u6536\u85CF\u8207\u8A18\u9304\u6210\u5C31\uFF0C\u6C92\u6709\u8CFC\u8CB7\u7528\u9014\uFF1B\u6240\u6709\u5E06\u88DD\u8207\u4FEE\u5FA9\u7686\u514D\u8CBB\u3002",Bt=(i,e=0)=>Number.isFinite(i)?i:e,Kh=i=>1+((Math.trunc(Bt(Number(i),1))-1)%16+16)%16,Ki=(i,e)=>i.includes(e)?!1:(i.push(e),!0);function Sr(i=1){let e=Ps("harbor").dock;return{schemaVersion:1,seed:Kh(i),time:0,elapsed:0,mode:"harbor",boat:{...e,heading:0,sail:0,hull:100,speed:0},rigId:"steady",contractId:"coral-survey",currentIsland:"harbor",lastSafeIsland:"harbor",discoveries:[],parts:[],completed:[],cargo:[],lighthouseFixed:!1,storyComplete:!1,oxygen:55,diver:{...e},activeDive:null,diveCollected:!1,credits:0,records:{bestTime:null,bestDamage:null,voyages:0,rescues:0,byContract:{}},voyage:{active:!1,startedAt:0,elapsed:0,damage:0,harvested:[],observed:[],skippedObservations:[],visited:[],rescued:!1,legIndex:-1,routeChoices:[],navigation:null},result:null,contactCooldown:0,warningCooldown:0,lowHullWarned:!1}}function an(i){let e=(Bt(i)%240+240)%240,t=240/4,n=Math.floor(e/t),s=t-e%t;return{height:Math.sin(e/240*Math.PI*2),...ec[n],nextLabel:ec[(n+1)%4].label,secondsToChange:s,forecastHorizon:s+t*2,forecast:[1,2].map(r=>({...ec[(n+r)%4],startsIn:s+t*(r-1),secondsUntil:s+t*(r-1),duration:t,height:Math.sin((n+r)*Math.PI/2)}))}}function Ti(i,e,t,n=1){let s=0,r=0,o=.88+Kh(n)*.015;for(let a of br){let l=Math.hypot(i-a.x,e-a.z);if(l>=a.radius)continue;let c=Math.sin(t/240*Math.PI*2+a.phase),h=(1-l/a.radius)*a.strength*c*o;s+=a.dx*h,r+=a.dz*h}for(let a of Ji){if(!jh(a,t))continue;let l=i-a.x,c=e-a.z,h=Math.hypot(l,c);if(h<.01||h>=a.radius)continue;let u=(1-h/a.radius)*a.strength;s+=(-c/h-l/h*.18)*u,r+=(l/h-c/h*.18)*u}return{x:s,z:r,dx:s,dz:r,strength:Math.hypot(s,r)}}function jh(i,e){return Math.sin(e/240*Math.PI*2+i.phase)>.25}function ji(i,e=i.contractId){let t=It.find(a=>a.id===e);if(!t)return{contractId:e,objectives:[],completedCount:0,total:0,readyToDeliver:!1,alreadyDelivered:!1,nextObjective:null};let n=i.voyage.observed||i.voyage.harvested||[],s=t.objectives.map(a=>({...a,islandName:Ps(a.islandId).name,done:n.includes(a.discoveryId)})),r=s.filter(a=>a.done).length,o=s.find(a=>!a.done)||{kind:"return",islandId:"harbor",islandName:Ps("harbor").name,name:"\u8FD4\u56DE\u6F6E\u97F3\u6E2F\u4EA4\u4ED8",done:!1};return{contractId:t.id,objectives:s,completedCount:r,total:s.length,readyToDeliver:r===s.length,alreadyDelivered:i.completed.includes(t.id),nextObjective:o}}function si(i){let e=i.voyage.navigation;return i.mode!=="sailing"||!e||e.legIndex!==i.voyage.legIndex||!e.waypoints[e.index]?null:{...e,target:e.waypoints[e.index],remaining:e.waypoints.length-e.index}}function $f(i,e,t){return e.directions[t].options.map(n=>{let s=i.boat,r=0,o=0,a=0;for(let h of n.waypoints){let u=Tt(s,h),d=Math.atan2(h.x-s.x,-(h.z-s.z)),f=-Math.PI/4+(i.seed-1)*.035,g=.52+.48*(Math.cos(d-f)+1)/2,v=Ti((s.x+h.x)/2,(s.z+h.z)/2,i.time,i.seed),m=v.x*Math.sin(d)-v.z*Math.cos(d);r+=u,a+=m*u,o+=u/Math.max(.5,Qi(i.rigId).speed*g+m),s=h}let l=r?a/r:0,c=Math.abs(l)<.04?"\u6B64\u6BB5\u6D41\u529B\u8F03\u5F31\uFF1B\u6BD4\u8F03\u8DDD\u96E2\u3001\u56FA\u5B9A\u98A8\u89D2\u8207\u96E2\u5CB8\u7A7A\u9593\u3002":`${l>0?"\u76EE\u524D\u5927\u81F4\u9806\u6D41":"\u76EE\u524D\u5927\u81F4\u9006\u6D41"}\uFF08\u6CBF\u822A\u8DEF\u7D04 ${Math.abs(l).toFixed(2)} m/s\uFF09\uFF1B\u6F6E\u76F8\u8B8A\u5316\u5F8C\u53D6\u6368\u6703\u6539\u8B8A\u3002`;return{...n,available:!0,condition:c,distanceMetres:Math.round(r),estimatedSeconds:Math.round(o),alongCurrent:l}})}function qf(i,e){for(let t of e){let n=t.x-i.x,s=t.z-i.z,r=n*n+s*s;for(let o of[...Gt.map(a=>({...a,clearance:a.radius+7})),...Zi.map(a=>({...a,clearance:a.radius+1})),...Ji.map(a=>({...a,clearance:a.radius+1}))]){let a=r?gn(((o.x-i.x)*n+(o.z-i.z)*s)/r,0,1):0;if(Math.hypot(o.x-i.x-a*n,o.z-i.z-a*s)<o.clearance-1e-6)return!1}i=t}return!0}var qh=i=>i&&Number.isFinite(i.x)&&Number.isFinite(i.z)&&Number.isFinite(i.radius)&&i.radius>0,Yh=i=>Array.isArray(i)&&i.length>=2&&i.every(e=>e&&typeof e.id=="string"&&Array.isArray(e.waypoints)&&e.waypoints.length&&e.waypoints.every(t=>t&&Number.isFinite(t.x)&&Number.isFinite(t.z)));function Vo(i,e){let t=i.voyage.routeChoices?.at(-1);if(i.mode!=="sailing"||si(i)&&t&&i.time-t.time<18)return null;let n={x:Math.sin(i.boat.heading),z:-Math.cos(i.boat.heading)};return ko.flatMap(s=>Object.entries(s.directions).flatMap(([r,o])=>{let a=Object.hasOwn(Mr,r)&&Mr[r],l=Number.isFinite(o?.minForwardDot)&&o.minForwardDot>=0&&o.minForwardDot<=1?o.minForwardDot:.2;return!a||!o||!Yh(o.options)||n.x*a.x+n.z*a.z<l?[]:[qh(o.entry)?o.entry:s,...Array.isArray(o.entries)?o.entries.filter(qh):[]].flatMap((h,u)=>{let d=typeof h.destinationIslandId=="string"?h.destinationIslandId:o.destinationIslandId,f=Gt.find(R=>R.id===d);if(f&&Number.isFinite(h.maxDestinationDistance)&&h.maxDestinationDistance>0&&Tt(i.boat,f.dock)>h.maxDestinationDistance)return[];let g=i.boat.x-h.x,v=i.boat.z-h.z,m=g*a.x+v*a.z,p=g*a.z-v*a.x,E=Number.isFinite(h.lateralRadius)&&h.lateralRadius>0?h.lateralRadius:h.radius,y=Math.hypot(m/h.radius,p/E)<=1,_=Yh(h.options)?h.options:o.options;return[{...s,directions:{...s.directions,[r]:{...o,destinationIslandId:d,options:_}},x:h.x,z:h.z,radius:h.radius,direction:r,entryIndex:u,axis:a,withinEntry:y,distance:Tt(i.boat,h)}]})})).filter(s=>(Number.isFinite(e)&&e>0?s.distance<=e:s.withinEntry)&&(i.boat.x-s.x)*s.axis.x+(i.boat.z-s.z)*s.axis.z<=2&&s.directions[s.direction].options.every(r=>qf(i.boat,r.waypoints))&&!(i.voyage.routeChoices||[]).some(r=>r.id===s.id&&r.legIndex===i.voyage.legIndex)).sort((s,r)=>s.distance-r.distance).map(s=>({...s,options:$f(i,s,s.direction)}))[0]||null}function Yf(i){if(!i||typeof i.direction!="string"||!Object.hasOwn(Mr,i.direction))return!1;let e=ko.find(n=>n.id===i.id);if(!e||!Object.hasOwn(e.directions,i.direction))return!1;let t=e.directions[i.direction]?.options;return Array.isArray(t)&&t.some(n=>n.id===i.optionId)}function Qh(i,e,t){let n=Vo(i);if(!n||n.id!==e)return[Ye("info","\u9760\u8FD1\u524D\u65B9\u5C0E\u822A\u9580\uFF0C\u518D\u6BD4\u8F03\u5169\u689D\u53EF\u884C\u652F\u8DEF\u3002")];let s=n.options.find(r=>r.id===t&&r.available);return s?(i.voyage.routeChoices||=[],i.voyage.routeChoices.push({id:n.id,choiceId:n.id,direction:n.direction,optionId:t,time:i.time,tideHeight:an(i.time).height,cargoCount:i.cargo.length,legIndex:i.voyage.legIndex}),i.voyage.navigation={choiceId:n.id,optionId:t,label:s.label,waypoints:s.waypoints.map(r=>({...r})),index:0,legIndex:i.voyage.legIndex},[Ye("route-choice",`\u5DF2\u9078${s.label}\u3002${s.condition} \u8ACB\u624B\u52D5\u99DB\u5411\u85CD\u8272\u822A\u8DEF\u9EDE\uFF1B\u96A8\u6642\u53EF\u53D6\u6D88\u5F15\u5C0E\u3002`,{choiceId:n.id,optionId:t})]):[Ye("info","\u8ACB\u9078\u64C7\u9019\u500B\u5C0E\u822A\u9580\u63D0\u4F9B\u7684\u822A\u8DEF\u3002")]}function eu(i){return i.voyage.navigation=null,[Ye("route-cancelled","\u5DF2\u53D6\u6D88\u8DEF\u9EDE\u5F15\u5C0E\uFF0C\u4FDD\u7559\u9019\u6B21\u9078\u8DEF\u7D00\u9304\uFF1B\u53EF\u624B\u52D5\u822A\u884C\u4E26\u5728\u4E0B\u4E00\u500B\u9580\u91CD\u65B0\u9078\u8DEF\u3002")]}function tu(i,e=45,{includeSkipped:t=!1}={}){return i.mode!=="sailing"?null:mn.map(n=>({...n,distance:Tt(i.boat,n)})).filter(n=>n.distance<=e&&!i.voyage.harvested.includes(`observation:${n.id}`)&&(t||!i.voyage.skippedObservations?.includes(n.id))).sort((n,s)=>n.distance-s.distance)[0]||null}function nu(i,e){let t=mn.find(n=>n.id===e);return i.mode!=="sailing"||!t||Tt(i.boat,t)>45||i.voyage.harvested.includes(`observation:${e}`)?[Ye("info","\u9760\u8FD1\u5C1A\u672A\u53D6\u6A23\u7684\u89C0\u6E2C\u6D6E\u6A19\uFF0C\u624D\u80FD\u9078\u64C7\u7E7C\u7E8C\u76F4\u822A\u3002")]:(i.voyage.skippedObservations||=[],Ki(i.voyage.skippedObservations,e),[Ye("observation-skipped",`\u5DF2\u8A18\u9304\u76F4\u822A\u9078\u64C7\uFF1A\u7565\u904E${t.name}\uFF0C\u4FDD\u7559\u6642\u9593\u8207\u8CA8\u8259\u3002\u7A0D\u5F8C\u4ECD\u53EF\u8FD4\u56DE\u53D6\u6A23\u3002`,{observationId:e})])}function nc(i,e=tu(i,9,{includeSkipped:!0})?.id){let t=mn.find(s=>s.id===e);if(i.mode!=="sailing"||!t||Tt(i.boat,t)>9)return[Ye("info","\u9032\u5165\u89C0\u6E2C\u6D6E\u6A19 9 \u516C\u5C3A\u5167\u4E26\u6536\u5E06\uFF0C\u6309 E \u53D6\u6A23\u3002")];let n=`observation:${e}`;return i.voyage.harvested.includes(n)?[Ye("info","\u9019\u5EA7\u6D6E\u6A19\u672C\u8D9F\u5DF2\u53D6\u6A23\uFF1B\u53EF\u7E7C\u7E8C\u76F4\u822A\u3002")]:i.boat.speed>1.4?[Ye("info","\u53D6\u6A23\u9700\u8981\u4F4E\u822A\u901F\uFF1A\u5148\u6309\u7A7A\u767D\u9375\u6536\u5E06\uFF0C\u518D\u6309 E\u3002")]:i.cargo.length>=Qi(i.rigId).capacity?[Ye("info","\u8CA8\u8259\u5DF2\u6EFF\uFF0C\u9019\u5EA7\u6D6E\u6A19\u5C1A\u672A\u6D88\u8017\uFF1B\u8FD4\u6E2F\u4EA4\u4ED8\u5F8C\u518D\u4F86\uFF0C\u6216\u7E7C\u7E8C\u76F4\u822A\u3002")]:(i.cargo.push(n),i.voyage.harvested.push(n),[Ye("observation",`\u5DF2\u53D6\u6A23${t.name}\u3002${t.note} \u666E\u901A\u8CA8\u7269 1 \u4EF6\uFF0C\u8FD4\u6E2F\u53EF\u5F97 3 \u822A\u6D77\u5370\u8A18\u3002`,{observationId:e})])}function ic(i,e=i.contractId,t=i.rigId){if(!["harbor","island","result"].includes(i.mode))return[Ye("info","\u8ACB\u5148\u9760\u6E2F\uFF0C\u518D\u898F\u5283\u4E0B\u4E00\u6BB5\u822A\u7A0B\u3002")];i.currentIsland==="harbor"?(It.some(r=>r.id===e)&&(i.contractId=e),qn.some(r=>r.id===t)&&(i.rigId=t),i.boat.hull=100,i.lowHullWarned=!1,i.voyage={active:!0,startedAt:i.time,elapsed:0,damage:0,harvested:[],observed:[],skippedObservations:[],visited:["harbor"],rescued:!1,legIndex:0,routeChoices:[],navigation:null},i.elapsed=0):i.voyage.active||(i.voyage.active=!0),i.currentIsland!=="harbor"&&(i.voyage.legIndex=(i.voyage.legIndex??-1)+1),i.voyage.navigation=null;let n=Ps(i.currentIsland||i.lastSafeIsland);i.boat.x=n.dock.x,i.boat.z=n.dock.z,i.boat.heading=Math.atan2(n.dock.x-n.x,-(n.dock.z-n.z));let s=Math.max(0,n.radius+8-Tt(n,n.dock));return s>0&&(i.boat.x+=Math.sin(i.boat.heading)*s,i.boat.z-=Math.cos(i.boat.heading)*s),i.boat.sail=0,i.boat.speed=0,i.mode="sailing",i.currentIsland=null,i.activeDive=null,i.result=null,i.contactCooldown=0,[Ye("depart",`\u96E2\u958B${n.name}\u3002\u8239\u982D\u5DF2\u671D\u5916\u6D77\uFF0C\u5148\u6309 W \u76F4\u884C\u96E2\u5CB8\uFF0C\u518D\u8F49\u5411\u76EE\u7684\u5730\uFF1B\u9760\u6E2F\u524D\u6309\u7A7A\u767D\u9375\u6536\u5E06\u3002`)]}function sc(i,e){i.voyage.navigation=null,i.boat.x=e.dock.x,i.boat.z=e.dock.z,i.boat.speed=0,i.boat.sail=0,i.currentIsland=e.id,i.lastSafeIsland=e.id,i.activeDive=null,i.diver={...e.dock},i.oxygen=55}function Zh(i){if(i.mode==="diving")return[Ye("info","\u5148\u6309\u300C\u6D6E\u51FA\u56DE\u8239\u300D\uFF0C\u5C31\u80FD\u5B89\u5168\u9760\u6E2F\u3002")];let e=[...Gt].sort((l,c)=>Tt(i.boat,l.dock)-Tt(i.boat,c.dock))[0];if(Tt(i.boat,e.dock)>13)return[Ye("info","\u9760\u8FD1\u91D1\u8272\u6CCA\u4F4D\u6A19\u8A18\uFF0C\u518D\u6309 E \u9760\u5CB8\u3002")];if(i.boat.speed>1.4)return[Ye("info","\u822A\u901F\u592A\u5FEB\uFF1A\u6309\u7A7A\u767D\u9375\u5FEB\u901F\u6536\u5E06\uFF0C\u518D\u6309 E \u9760\u5CB8\u3002")];sc(i,e),i.boat.hull=100,i.lowHullWarned=!1,Ki(i.voyage.visited,e.id),i.mode=e.id==="harbor"?"harbor":"island";let t=[Ye("dock",`\u5DF2\u9760\u5CB8${e.name}\uFF0C\u8239\u9AD4\u514D\u8CBB\u4FEE\u5FA9\u3002${e.id==="harbor"?"\u53EF\u91CD\u65B0\u9078\u64C7\u59D4\u8A17\u3001\u5E06\u88DD\u8207\u6F6E\u6C50\u3002":"\u6309 E \u8ABF\u67E5\uFF1B\u53EF\u518D\u51FA\u767C\u6216\u5C55\u958B\u6DFA\u6C34\u63A2\u7D22\u3002"}`,{islandId:e.id})];if(e.id!=="harbor"||!i.voyage.active)return t;let n=It.find(l=>l.id===i.contractId),s=n&&ji(i).readyToDeliver&&!i.completed.includes(n.id);s&&(i.completed.push(n.id),i.credits+=n.reward,t.push(Ye("delivery",`\u59D4\u8A17\u5B8C\u6210\uFF1A${n.name}\uFF0C\u7372\u5F97 ${n.reward} \u822A\u6D77\u5370\u8A18\u3002${$h}`,{contractId:n.id,reward:n.reward})));let r=i.cargo.length*3;if(i.credits+=r,i.cargo=[],i.voyage.visited.some(l=>l!=="harbor")&&(i.records.voyages+=1,i.voyage.rescued||(i.records.bestTime=i.records.bestTime===null?i.voyage.elapsed:Math.min(i.records.bestTime,i.voyage.elapsed),i.records.bestDamage=i.records.bestDamage===null?i.voyage.damage:Math.min(i.records.bestDamage,i.voyage.damage))),n&&ji(i).readyToDeliver&&!i.voyage.rescued){i.records.byContract||={};let l=i.records.byContract[n.id];i.records.byContract[n.id]={bestTime:l?Math.min(l.bestTime,i.voyage.elapsed):i.voyage.elapsed,bestDamage:l?Math.min(l.bestDamage,i.voyage.damage):i.voyage.damage,voyages:(l?.voyages||0)+1}}let a=i.lighthouseFixed&&!i.storyComplete;return a&&(i.storyComplete=!0,t.push(Ye("ending","\u9060\u6F6E\u71C8\u5854\u91CD\u71C3\uFF0C\u6E2F\u53E3\u70BA\u4F60\u7684\u5B8C\u6574\u8FD4\u822A\u4EAE\u8D77\u6B61\u8FCE\u71C8\uFF01\u6545\u4E8B\u5B8C\u6210\uFF0C\u81EA\u7531\u822A\u7A0B\u5DF2\u958B\u653E\u3002"))),i.result={title:a?"\u71C8\u706B\u91CD\u9022\uFF0C\u6B61\u8FCE\u56DE\u5BB6":s?"\u59D4\u8A17\u5B8C\u6210":"\u5E73\u5B89\u8FD4\u822A",text:a?"\u4E09\u4EF6\u96F6\u4EF6\u91CD\u65B0\u9023\u8D77\u4E03\u5CF6\u3002\u7E7C\u7E8C\u81EA\u7531\u822A\u884C\uFF0C\u5B8C\u6210\u5168\u5716\u9451\u3001\u516D\u4EFD\u59D4\u8A17\uFF0C\u6311\u6230\u66F4\u5FEB\u4E14\u7121\u640D\u7684\u822A\u7DDA\u3002":s?`${n.name}\u5DF2\u4EA4\u4ED8\u3002\u4F60\u7684\u6D77\u5716\u4FDD\u5B58\u4E86\u9019\u6B21\u767C\u73FE\uFF1B\u53EF\u9078\u4E0B\u4E00\u4EFD\u59D4\u8A17\u6216\u91CD\u8D70\u822A\u7DDA\u6311\u6230\u7D00\u9304\u3002`:n&&!ji(i).readyToDeliver?"\u672C\u8D9F\u59D4\u8A17\u672A\u5B8C\u6210\uFF1B\u4E0B\u8D9F\u9700\u91CD\u65B0\u5B8C\u6210\u8ABF\u67E5\u6E05\u55AE\uFF0C\u5716\u9451\u8207\u96F6\u4EF6\u4FDD\u7559\u3002\u6240\u6709\u4FEE\u5FA9\u514D\u8CBB\u3002":"\u672C\u8D9F\u5B8C\u6574\u8ABF\u67E5\u5DF2\u5B8C\u6210\uFF0C\u59D4\u8A17\u734E\u52F5\u4E0D\u91CD\u767C\uFF1B\u53EF\u6BD4\u8F03\u672C\u59D4\u8A17\u7D00\u9304\u3002\u5716\u9451\u8207\u4E3B\u7DDA\u96F6\u4EF6\u5DF2\u4FDD\u5B58\u3002",elapsed:i.voyage.elapsed,damage:i.voyage.damage,reward:(s?n.reward:0)+r,creditsDescription:$h,discoveries:i.discoveries.length,parts:i.parts.length,rescued:i.voyage.rescued},i.mode="result",i.voyage.active=!1,t}function Jh(i,e,t){let n=pn.find(r=>r.id===e);if(!n)return;i.voyage.observed||=[];let s=Ki(i.voyage.observed,e);Ki(i.discoveries,e)?t.push(Ye("discovery",`\u5716\u9451\u65B0\u589E\uFF1A${n.name}\u3002${n.description}`,{discoveryId:e})):s&&t.push(Ye("observation",`\u672C\u8D9F\u5DF2\u518D\u6B21\u8ABF\u67E5\uFF1A${n.name}\u3002${n.description}`,{discoveryId:e})),!i.voyage.harvested.includes(e)&&i.cargo.length<Qi(i.rigId).capacity?(Ki(i.cargo,e),Ki(i.voyage.harvested,e)):s&&i.cargo.length>=Qi(i.rigId).capacity&&t.push(Ye("info","\u8ABF\u67E5\u8207\u59D4\u8A17\u9032\u5EA6\u5DF2\u8A18\u9304\uFF1B\u8CA8\u8259\u5DF2\u6EFF\uFF0C\u9019\u6B21\u4E0D\u589E\u52A0\u666E\u901A\u8CA8\u7269\u3002\u4E3B\u7DDA\u96F6\u4EF6\u4ECD\u53EF\u53D6\u5F97\u3002"))}function rc(i){if(i.mode==="sailing"){if(Gt.some(s=>Tt(i.boat,s.dock)<=13))return Zh(i);let n=tu(i,9,{includeSkipped:!0});return n?nc(i,n.id):Zh(i)}if(i.mode==="diving"){let n=Ho(i.activeDive);if(!n)return Go(i);if(Tt(i.diver,n.target)>4.5)return[Ye("info","\u6CBF\u767C\u5149\u8DEF\u6A19\u6E38\u5411\u91D1\u8272\u76EE\u6A19\uFF0C\u9760\u8FD1\u5F8C\u6309 E\uFF1B\u6C23\u6CE1\u53EF\u88DC\u5145\u6C27\u6C23\u3002")];let s=[];return Jh(i,n.discoveryId,s),Ki(i.parts,n.partId)&&s.push(Ye("part",`\u53D6\u5F97\u71C8\u5854\u96F6\u4EF6\uFF1A${n.partName}\uFF08${i.parts.length}/3\uFF09\u3002\u4E3B\u7DDA\u96F6\u4EF6\u5728\u6551\u63F4\u8207\u91CD\u8F09\u5F8C\u90FD\u6703\u4FDD\u7559\u3002`,{partId:n.partId})),i.diveCollected=!0,s.length||s.push(Ye("info","\u9019\u7247\u6DFA\u7063\u5DF2\u5B8C\u6210\u8ABF\u67E5\u3002\u53EF\u56DE\u5230\u8239\u65C1\uFF0C\u6216\u6309\u300C\u6D6E\u51FA\u56DE\u8239\u300D\u3002")),s}if(i.mode==="harbor"||i.mode==="result"&&i.currentIsland==="harbor")return[Ye("info","\u9078\u64C7\u59D4\u8A17\u8207\u5E06\u88DD\uFF0C\u518D\u6309\u300C\u63DA\u5E06\u51FA\u6E2F\u300D\u3002\u5148\u770B\u6D77\u5716\u8207\u672A\u4F86\u5169\u6BB5\u6F6E\u6C50\u3002")];if(i.mode!=="island")return[];let e=Ps(i.currentIsland),t=[];for(let n of e.discoveries)pn.find(s=>s.id===n)?.diveSiteId||Jh(i,n,t);return e.id==="lighthouse"&&(i.parts.length===Yn.length&&!i.lighthouseFixed?(i.lighthouseFixed=!0,t.push(Ye("lighthouse","\u4E09\u4EF6\u96F6\u4EF6\u5D4C\u5165\u71C8\u5854\uFF0C\u5149\u675F\u91CD\u8FD4\u6D77\u9762\uFF01\u6700\u5F8C\u4E00\u6B65\uFF1A\u99DB\u56DE\u6F6E\u97F3\u6E2F\u5B8C\u6210\u8FD4\u822A\u6176\u795D\u3002"))):i.lighthouseFixed||t.push(Ye("info",`\u71C8\u5854\u9084\u9700\u8981 ${3-i.parts.length} \u4EF6\u96F6\u4EF6\u3002\u73CA\u745A\u7063\u3001\u661F\u76E4\u5CF6\u8207\u7409\u7483\u7901\u7684\u6DFA\u7063\u5404\u85CF\u6709\u4E00\u4EF6\u3002`))),t.length||t.push(Ye("info",`${e.name}\u7684\u5CB8\u4E0A\u8ABF\u67E5\u5DF2\u5B8C\u6210\u3002${e.diveSiteId?"\u9019\u88E1\u9084\u6709\u6DFA\u6C34\u63A2\u7D22\u9EDE\u3002":"\u53EF\u4EE5\u524D\u5F80\u4E0B\u4E00\u5EA7\u5CF6\uFF0C\u6216\u56DE\u6BCD\u6E2F\u4EA4\u4ED8\u3002"}`)),t}function iu(i,e){let t=Ho(e);return i.mode!=="island"||!t||t.islandId!==i.currentIsland?[Ye("info","\u8ACB\u5148\u9760\u5CB8\u5230\u8A72\u6DFA\u6C34\u9EDE\u6240\u5728\u5CF6\u5DBC\u3002")]:(i.activeDive=t.id,i.mode="diving",i.oxygen=t.oxygen,i.diver={...t.entry},i.diveCollected=i.parts.includes(t.partId),[Ye("dive",`${t.name}\uFF1A\u65B9\u5411\u9375\uFF0FWASD \u6E38\u52D5\uFF0C\u9760\u8FD1\u91D1\u8272\u76EE\u6A19\u6309 E\uFF1B\u6C23\u6CE1\u88DC\u6C27\uFF0C\u96A8\u6642\u53EF\u6D6E\u51FA\u56DE\u8239\u3002`)])}function Go(i){if(i.mode!=="diving")return[];let e=Ho(i.activeDive);return i.mode="island",i.voyage.navigation=null,i.currentIsland=e?.islandId||i.lastSafeIsland,i.activeDive=null,i.oxygen=55,i.diver={x:i.boat.x,z:i.boat.z},[Ye("surface","\u5DF2\u5B89\u5168\u56DE\u8239\u3002\u5716\u9451\u8207\u96F6\u4EF6\u5DF2\u4FDD\u5B58\uFF1B\u53EF\u91CD\u65B0\u6F5B\u6C34\u6216\u7E7C\u7E8C\u822A\u884C\u3002")]}function Wo(i,e="\u8239\u9AD4\u53D7\u640D"){let t=i.mode==="diving"?i.diver:i.boat,n=[...Gt].sort((r,o)=>Tt(t,r.dock)-Tt(t,o.dock))[0],s=Math.ceil(i.cargo.length/2);return i.cargo=i.cargo.slice(s),sc(i,n),i.boat.hull=100,i.lowHullWarned=!1,i.voyage.rescued=!0,i.records.rescues+=1,i.mode=n.id==="harbor"?"harbor":"island",i.result=null,i.contactCooldown=2,[Ye("rescue",`${e}\uFF0C\u6551\u63F4\u8239\u5DF2\u9001\u4F60\u56DE${n.name}\u3002\u666E\u901A\u8CA8\u7269\u640D\u5931 ${s} \u4EF6\uFF1B\u5716\u9451\u3001\u96F6\u4EF6\u8207\u5DF2\u4EA4\u4ED8\u734E\u52F5\u5168\u90E8\u4FDD\u7559\u3002\u8239\u5DF2\u514D\u8CBB\u4FEE\u5FA9\uFF0C\u53EF\u4EE5\u7ACB\u5373\u518D\u51FA\u767C\u3002`,{islandId:n.id,lost:s})]}function tc(i,e,t,n){if(i.contactCooldown>0)return;let s=Math.min(i.boat.hull,e);if(i.boat.hull-=s,i.voyage.damage+=s,i.contactCooldown=1.2,n.push(Ye("damage",t)),i.boat.hull<=0)n.push(...Wo(i,"\u8239\u9AD4\u5931\u53BB\u6D6E\u529B"));else if(i.boat.hull<25&&!i.lowHullWarned){i.lowHullWarned=!0;let r=[...Gt].sort((o,a)=>Tt(i.boat,o.dock)-Tt(i.boat,a.dock))[0];n.push(Ye("warning",`\u8239\u9AD4\u4F4E\u65BC 25%\uFF01\u6700\u8FD1\u5B89\u5168\u6E2F\u662F${r.name}\uFF0C\u9760\u5CB8\u5373\u53EF\u514D\u8CBB\u4FEE\u5FA9\u3002`))}}function su(i,e,t={}){let n=[],s=gn(Bt(e),0,30);if(s===0)return n;let r=Math.ceil(s/.05),o=s/r,a=an(i.time).label,l=Math.floor((i.time+30)/(240/4));for(let c=0;c<r;c+=1){if(i.time+=o,i.contactCooldown=Math.max(0,i.contactCooldown-o),i.warningCooldown=Math.max(0,i.warningCooldown-o),i.voyage.active&&(i.voyage.elapsed+=o,i.elapsed=i.voyage.elapsed),i.mode==="diving"){let E=Ho(i.activeDive);if(!E){n.push(...Go(i));continue}let y=gn(Bt(t.diveX),-1,1),_=gn(Bt(t.diveZ),-1,1),R=Math.hypot(y,_);R>1&&(y/=R,_/=R),i.diver.x+=y*o*2,i.diver.z+=_*o*2;let A=Tt(i.diver,E.entry);A>E.radius&&(i.diver.x=E.entry.x+(i.diver.x-E.entry.x)/A*E.radius,i.diver.z=E.entry.z+(i.diver.z-E.entry.z)/A*E.radius),i.oxygen-=o,E.bubbles.some(I=>Tt(i.diver,I)<3.5)&&(i.oxygen=Math.min(E.oxygen,i.oxygen+o*7),i.warningCooldown===0&&(n.push(Ye("bubble","\u6C23\u6CE1\u6B63\u5728\u88DC\u5145\u6C27\u6C23\u3002")),i.warningCooldown=5)),i.oxygen<12&&i.warningCooldown===0&&(n.push(Ye("warning","\u6C27\u6C23\u4E0D\u8DB3\uFF1A\u9760\u8FD1\u6C23\u6CE1\u6216\u7ACB\u5373\u6309\u300C\u6D6E\u51FA\u56DE\u8239\u300D\u3002")),i.warningCooldown=8),i.oxygen<=0&&n.push(...Wo(i,"\u6F5B\u6C34\u6C27\u6C23\u8017\u76E1"));continue}if(i.mode!=="sailing")continue;let h=i.boat,u=Qi(i.rigId);h.sail=t.brake?Math.max(0,h.sail-o*4):gn(h.sail+Bt(t.sailDelta)*o*.65,0,1),h.heading+=gn(Bt(t.turn),-1,1)*u.handling*o*(.45+.55*Math.min(1,h.speed/u.speed)),h.heading=Math.atan2(Math.sin(h.heading),Math.cos(h.heading));let d=-Math.PI/4+(i.seed-1)*.035,f=.52+.48*(Math.cos(h.heading-d)+1)/2,g=u.speed*h.sail*f;h.speed+=(g-h.speed)*Math.min(1,o*(t.brake?5:1.35));let v=Ti(h.x,h.z,i.time,i.seed);h.x+=(Math.sin(h.heading)*h.speed+v.x)*o,h.z+=(-Math.cos(h.heading)*h.speed+v.z)*o;for(let E of Gt){let y=Tt(h,E),_=E.radius+7;if(y>=_)continue;let R=y>.001?(h.x-E.x)/y:0,A=y>.001?(h.z-E.z)/y:-1;if(h.x=E.x+R*_,h.z=E.z+A*_,h.speed*=.35,tc(i,8,`\u64E6\u78B0${E.name}\u5CB8\u7DDA\uFF0C\u8239\u9AD4\u53D7\u640D\u3002\u6CBF\u5CB8\u5916\u5074\u99DB\u5411\u91D1\u8272\u6CCA\u4F4D\u3002`,n),i.mode!=="sailing")break}if(i.mode!=="sailing")continue;let m=an(i.time);for(let E of Zi)m.height>E.safeHeight||Tt(h,E)>=E.radius+1||(h.speed*=Math.max(.5,1-o*2),tc(i,7,`${E.name}\u6C34\u4F4D\u4E0D\u8DB3\uFF0C\u64E6\u7901\u53D7\u640D\u3002\u7E5E\u958B\u7D05\u8272\u7901\u5708\u6216\u7B49\u5F85\u6F32\u6F6E\u3002`,n));for(let E of Ji)jh(E,i.time)&&Tt(h,E)<E.radius*.45&&tc(i,5,`${E.name}\u6B63\u6D3B\u8E8D\uFF0C\u5411\u5916\u5708\u8F49\u8235\u812B\u96E2\u3002`,n);(Math.abs(h.x)>255||Math.abs(h.z)>255)&&(h.x=gn(h.x,-255,255),h.z=gn(h.z,-255,255),h.speed*=.8,i.warningCooldown===0&&(n.push(Ye("warning","\u5DF2\u5230\u6D77\u5716\u908A\u754C\uFF0C\u8ACB\u8F49\u8235\u56DE\u5230\u4E03\u5CF6\u6D77\u57DF\u3002")),i.warningCooldown=5));let p=i.voyage.navigation;if(p&&p.legIndex===i.voyage.legIndex){for(;p.waypoints[p.index]&&Tt(h,p.waypoints[p.index])<=8;)p.index+=1;p.index===p.waypoints.length&&(i.voyage.navigation=null,n.push(Ye("route-arrival","\u5DF2\u901A\u904E\u6240\u9078\u652F\u8DEF\uFF1B\u53EF\u4EE5\u7E7C\u7E8C\u99DB\u5411\u76EE\u7684\u5CF6\uFF0C\u6216\u5728\u4E0B\u4E00\u500B\u5C0E\u822A\u9580\u6BD4\u8F03\u8DEF\u6CC1\u3002")))}}if(an(i.time).label!==a&&n.push(Ye("tide",`\u6F6E\u6C50\u8F49\u70BA${an(i.time).label}\u3002\u6D77\u5716\u4E0A\u7684\u6F6E\u6D41\u3001\u6DFA\u7901\u8207\u65CB\u6D41\u5DF2\u540C\u6B65\u66F4\u65B0\u3002`)),Math.floor((i.time+30)/(240/4))>l){let c=an(i.time);n.push(Ye("tide-forecast",`\u6F6E\u6C50\u9810\u5831\uFF1A\u7D04 ${Math.ceil(c.secondsToChange)} \u79D2\u5F8C\u8F49\u70BA${c.nextLabel}\u3002${c.forecast[0].description}`,{startsIn:c.secondsToChange,nextLabel:c.nextLabel}))}return n}function ru(i){return!["harbor","result"].includes(i.mode)||i.currentIsland!=="harbor"?[Ye("info","\u53EA\u6709\u6F6E\u97F3\u6E2F\u53EF\u4EE5\u5B89\u5168\u7B49\u5F85\u4E0B\u4E00\u6F6E\u3002")]:(i.time+=an(i.time).secondsToChange+.001,[Ye("tide",`\u5DF2\u4F11\u606F\u81F3${an(i.time).label}\uFF0C\u8239\u9AD4\u8207\u6C27\u6C23\u4E0D\u53D7\u5F71\u97FF\u3002`)])}function oc(i){return JSON.stringify({...i,schemaVersion:1,savedAtSafeIsland:i.lastSafeIsland})}var wi=(i,e)=>[...new Set(Array.isArray(i)?i.filter(t=>e.includes(t)):[])];function ou(i){let e=l=>({state:Sr(),message:l});if(i==null||i==="")return e("\u65B0\u822A\u7A0B\u6E96\u5099\u597D\u4E86\u3002\u9078\u64C7\u7B2C\u4E00\u4EFD\u59D4\u8A17\uFF0C\u5F9E\u6F6E\u97F3\u6E2F\u958B\u59CB\u3002");let t;try{t=typeof i=="string"?JSON.parse(i):i}catch{return e("\u5B58\u6A94\u683C\u5F0F\u640D\u58DE\uFF0C\u5DF2\u5B89\u5168\u5EFA\u7ACB\u65B0\u822A\u7A0B\u3002")}if(!t||typeof t!="object"||Array.isArray(t)||t.schemaVersion!==1)return e("\u5B58\u6A94\u7248\u672C\u4E0D\u76F8\u5BB9\uFF0C\u5DF2\u5B89\u5168\u5EFA\u7ACB\u65B0\u822A\u7A0B\u3002");if(!Number.isFinite(t.time)||!Number.isFinite(t.seed)||t.time<0)return e("\u5B58\u6A94\u6642\u9593\u6216\u6D77\u6D41\u7A2E\u5B50\u7121\u6548\uFF0C\u5DF2\u5B89\u5168\u5EFA\u7ACB\u65B0\u822A\u7A0B\u3002");let n=Sr(t.seed);n.time=t.time,n.discoveries=wi(t.discoveries,pn.map(l=>l.id)),n.parts=wi(t.parts,Yn.map(l=>l.partId)),n.completed=wi(t.completed,It.map(l=>l.id)),n.rigId=Qi(t.rigId).id,n.contractId=It.some(l=>l.id===t.contractId)?t.contractId:It[0].id;let s=[...pn.map(l=>l.id),...mn.map(l=>`observation:${l.id}`)];n.cargo=wi(t.cargo,s).slice(0,Qi(n.rigId).capacity),n.lighthouseFixed=t.lighthouseFixed===!0&&n.parts.length===3,n.storyComplete=t.storyComplete===!0&&n.lighthouseFixed,n.credits=gn(Bt(t.credits),0,1e9);for(let l of["bestTime","bestDamage"])n.records[l]=Number.isFinite(t.records?.[l])&&t.records[l]>=0?t.records[l]:null;for(let l of["voyages","rescues"])n.records[l]=Math.floor(gn(Bt(t.records?.[l]),0,1e6));n.records.byContract={};for(let l of It){let c=t.records?.byContract?.[l.id];c&&Number.isFinite(c.bestTime)&&c.bestTime>=0&&Number.isFinite(c.bestDamage)&&c.bestDamage>=0&&(n.records.byContract[l.id]={bestTime:c.bestTime,bestDamage:c.bestDamage,voyages:Math.floor(gn(Bt(c.voyages),0,1e6))})}let r=t.voyage||{};n.voyage={active:r.active===!0,startedAt:Math.max(0,Bt(r.startedAt)),elapsed:Math.max(0,Bt(r.elapsed)),damage:Math.max(0,Bt(r.damage)),harvested:wi(r.harvested,s),observed:wi(r.observed??r.harvested,pn.map(l=>l.id)),skippedObservations:wi(r.skippedObservations,mn.map(l=>l.id)),legIndex:Math.floor(Math.max(0,Bt(r.legIndex))),routeChoices:(Array.isArray(r.routeChoices)?r.routeChoices:[]).filter(Yf).slice(-100).map(l=>({id:l.id,choiceId:l.id,direction:l.direction,optionId:l.optionId,time:Math.max(0,Bt(l.time)),tideHeight:gn(Bt(l.tideHeight),-1,1),cargoCount:Math.floor(gn(Bt(l.cargoCount),0,14)),legIndex:Math.floor(Math.max(0,Bt(l.legIndex)))})),navigation:null,visited:wi(r.visited,Gt.map(l=>l.id)),rescued:r.rescued===!0},n.elapsed=n.voyage.elapsed;let o=Ps(t.lastSafeIsland);return sc(n,o),n.mode=o.id==="harbor"?"harbor":"island",t.mode==="sailing"||t.mode==="diving"?(n.cargo=n.cargo.slice(Math.ceil(n.cargo.length/2)),n.voyage.rescued=!0,{state:n,message:`\u5DF2\u56DE\u5230\u6700\u8FD1\u5B89\u5168\u6E2F${o.name}\u3002\u4E2D\u9014\u96E2\u958B\u4FDD\u7559\u4E00\u534A\u666E\u901A\u8CA8\u7269\uFF1B\u5716\u9451\u3001\u4E3B\u7DDA\u96F6\u4EF6\u8207\u5DF2\u4EA4\u4ED8\u734E\u52F5\u5B8C\u6574\u4FDD\u7559\uFF0C\u96E2\u7DDA\u4E0D\u6D88\u8017\u6C27\u6C23\u6216\u6F6E\u6C50\u3002`}):{state:n,message:`\u5DF2\u6062\u5FA9${o.name}\u7684\u9760\u6E2F\u7D00\u9304\u3002\u6F6E\u6C50\u3001\u5716\u9451\u3001\u96F6\u4EF6\u8207\u734E\u52F5\u4FDD\u6301\u4E0D\u8B8A\uFF1B\u8239\u5DF2\u514D\u8CBB\u4FEE\u5FA9\u3002`}}var Hu=0,Wc=1,Vu=2;var Xc=1,Ha=2,ei=3,ui=0,sn=1,bn=2,gi=0,ls=1,$c=2,qc=3,Yc=4,Gu=5,Ni=100,Wu=101,Xu=102,$u=103,qu=104,Yu=200,Zu=201,Ju=202,Ku=203,ma=204,ga=205,ju=206,Qu=207,ed=208,td=209,nd=210,id=211,sd=212,rd=213,od=214,Va=0,Ga=1,Wa=2,cs=3,Xa=4,$a=5,qa=6,Ya=7,Zc=0,ad=1,ld=2,xi=0,cd=1,hd=2,ud=3,Za=4,dd=5,fd=6,pd=7,Nc="attached",md="detached",Jc=300,vs=301,ys=302,Ja=303,Ka=304,So=306,xa=1e3,Ui=1001,_a=1002,cn=1003,gd=1004;var Eo=1005;var kn=1006,ja=1007;var zi=1008;var Wn=1009,Kc=1010,jc=1011,sr=1012,Qa=1013,ki=1014,Pn=1015,rr=1016,el=1017,tl=1018,or=1020,Qc=35902,eh=35899,th=1021,nh=1022,Sn=1023,qs=1026,ar=1027,nl=1028,il=1029,ih=1030,sl=1031;var rl=1033,wo=33776,To=33777,Ao=33778,Ro=33779,ol=35840,al=35841,ll=35842,cl=35843,hl=36196,ul=37492,dl=37496,fl=37808,pl=37809,ml=37810,gl=37811,xl=37812,_l=37813,vl=37814,yl=37815,Ml=37816,bl=37817,Sl=37818,El=37819,wl=37820,Tl=37821,Al=36492,Rl=36494,Cl=36495,Il=36283,Pl=36284,Dl=36285,Ll=36286,xd=2200,_d=2201,vd=2202,Fr=2300,va=2301,pa=2302,rs=2400,os=2401,Or=2402,Ul=2500,yd=2501;var Md=3200,bd=3201;var sh=0,Sd=1,_i="",nn="srgb",hs="srgb-linear",Br="linear",pt="srgb";var ss=7680;var Fc=519,Ed=512,wd=513,Td=514,rh=515,Ad=516,Rd=517,Cd=518,Id=519,Oc=35044;var oh="300 es",zn=2e3,zr=2001;var Jn=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){let n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){let n=this._listeners;if(n===void 0)return;let s=n[e];if(s!==void 0){let r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let n=t[e.type];if(n!==void 0){e.target=this;let s=n.slice(0);for(let r=0,o=s.length;r<o;r++)s[r].call(this,e);e.target=null}}},qt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],au=1234567,Dr=Math.PI/180,Ys=180/Math.PI;function vi(){let i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(qt[i&255]+qt[i>>8&255]+qt[i>>16&255]+qt[i>>24&255]+"-"+qt[e&255]+qt[e>>8&255]+"-"+qt[e>>16&15|64]+qt[e>>24&255]+"-"+qt[t&63|128]+qt[t>>8&255]+"-"+qt[t>>16&255]+qt[t>>24&255]+qt[n&255]+qt[n>>8&255]+qt[n>>16&255]+qt[n>>24&255]).toLowerCase()}function tt(i,e,t){return Math.max(e,Math.min(t,i))}function ah(i,e){return(i%e+e)%e}function Zf(i,e,t,n,s){return n+(i-e)*(s-n)/(t-e)}function Jf(i,e,t){return i!==e?(t-i)/(e-i):0}function Lr(i,e,t){return(1-t)*i+t*e}function Kf(i,e,t,n){return Lr(i,e,1-Math.exp(-t*n))}function jf(i,e=1){return e-Math.abs(ah(i,e*2)-e)}function Qf(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*(3-2*i))}function ep(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*i*(i*(i*6-15)+10))}function tp(i,e){return i+Math.floor(Math.random()*(e-i+1))}function np(i,e){return i+Math.random()*(e-i)}function ip(i){return i*(.5-Math.random())}function sp(i){i!==void 0&&(au=i);let e=au+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function rp(i){return i*Dr}function op(i){return i*Ys}function ap(i){return(i&i-1)===0&&i!==0}function lp(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function cp(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function hp(i,e,t,n,s){let r=Math.cos,o=Math.sin,a=r(t/2),l=o(t/2),c=r((e+n)/2),h=o((e+n)/2),u=r((e-n)/2),d=o((e-n)/2),f=r((n-e)/2),g=o((n-e)/2);switch(s){case"XYX":i.set(a*h,l*u,l*d,a*c);break;case"YZY":i.set(l*d,a*h,l*u,a*c);break;case"ZXZ":i.set(l*u,l*d,a*h,a*c);break;case"XZX":i.set(a*h,l*g,l*f,a*c);break;case"YXY":i.set(l*f,a*h,l*g,a*c);break;case"ZYZ":i.set(l*g,l*f,a*h,a*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function Xs(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function tn(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}var lh={DEG2RAD:Dr,RAD2DEG:Ys,generateUUID:vi,clamp:tt,euclideanModulo:ah,mapLinear:Zf,inverseLerp:Jf,lerp:Lr,damp:Kf,pingpong:jf,smoothstep:Qf,smootherstep:ep,randInt:tp,randFloat:np,randFloatSpread:ip,seededRandom:sp,degToRad:rp,radToDeg:op,isPowerOfTwo:ap,ceilPowerOfTwo:lp,floorPowerOfTwo:cp,setQuaternionFromProperEuler:hp,normalize:tn,denormalize:Xs},ye=class i{constructor(e=0,t=0){i.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6],this.y=s[1]*t+s[4]*n+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=tt(this.x,e.x,t.x),this.y=tt(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=tt(this.x,e,t),this.y=tt(this.y,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(tt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(tt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),s=Math.sin(t),r=this.x-e.x,o=this.y-e.y;return this.x=r*n-o*s+e.x,this.y=r*s+o*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},Jt=class{constructor(e=0,t=0,n=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=s}static slerpFlat(e,t,n,s,r,o,a){let l=n[s+0],c=n[s+1],h=n[s+2],u=n[s+3],d=r[o+0],f=r[o+1],g=r[o+2],v=r[o+3];if(a===0){e[t+0]=l,e[t+1]=c,e[t+2]=h,e[t+3]=u;return}if(a===1){e[t+0]=d,e[t+1]=f,e[t+2]=g,e[t+3]=v;return}if(u!==v||l!==d||c!==f||h!==g){let m=1-a,p=l*d+c*f+h*g+u*v,E=p>=0?1:-1,y=1-p*p;if(y>Number.EPSILON){let R=Math.sqrt(y),A=Math.atan2(R,p*E);m=Math.sin(m*A)/R,a=Math.sin(a*A)/R}let _=a*E;if(l=l*m+d*_,c=c*m+f*_,h=h*m+g*_,u=u*m+v*_,m===1-a){let R=1/Math.sqrt(l*l+c*c+h*h+u*u);l*=R,c*=R,h*=R,u*=R}}e[t]=l,e[t+1]=c,e[t+2]=h,e[t+3]=u}static multiplyQuaternionsFlat(e,t,n,s,r,o){let a=n[s],l=n[s+1],c=n[s+2],h=n[s+3],u=r[o],d=r[o+1],f=r[o+2],g=r[o+3];return e[t]=a*g+h*u+l*f-c*d,e[t+1]=l*g+h*d+c*u-a*f,e[t+2]=c*g+h*f+a*d-l*u,e[t+3]=h*g-a*u-l*d-c*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,s){return this._x=e,this._y=t,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,s=e._y,r=e._z,o=e._order,a=Math.cos,l=Math.sin,c=a(n/2),h=a(s/2),u=a(r/2),d=l(n/2),f=l(s/2),g=l(r/2);switch(o){case"XYZ":this._x=d*h*u+c*f*g,this._y=c*f*u-d*h*g,this._z=c*h*g+d*f*u,this._w=c*h*u-d*f*g;break;case"YXZ":this._x=d*h*u+c*f*g,this._y=c*f*u-d*h*g,this._z=c*h*g-d*f*u,this._w=c*h*u+d*f*g;break;case"ZXY":this._x=d*h*u-c*f*g,this._y=c*f*u+d*h*g,this._z=c*h*g+d*f*u,this._w=c*h*u-d*f*g;break;case"ZYX":this._x=d*h*u-c*f*g,this._y=c*f*u+d*h*g,this._z=c*h*g-d*f*u,this._w=c*h*u+d*f*g;break;case"YZX":this._x=d*h*u+c*f*g,this._y=c*f*u+d*h*g,this._z=c*h*g-d*f*u,this._w=c*h*u-d*f*g;break;case"XZY":this._x=d*h*u-c*f*g,this._y=c*f*u-d*h*g,this._z=c*h*g+d*f*u,this._w=c*h*u+d*f*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,s=Math.sin(n);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],s=t[4],r=t[8],o=t[1],a=t[5],l=t[9],c=t[2],h=t[6],u=t[10],d=n+a+u;if(d>0){let f=.5/Math.sqrt(d+1);this._w=.25/f,this._x=(h-l)*f,this._y=(r-c)*f,this._z=(o-s)*f}else if(n>a&&n>u){let f=2*Math.sqrt(1+n-a-u);this._w=(h-l)/f,this._x=.25*f,this._y=(s+o)/f,this._z=(r+c)/f}else if(a>u){let f=2*Math.sqrt(1+a-n-u);this._w=(r-c)/f,this._x=(s+o)/f,this._y=.25*f,this._z=(l+h)/f}else{let f=2*Math.sqrt(1+u-n-a);this._w=(o-s)/f,this._x=(r+c)/f,this._y=(l+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(tt(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let s=Math.min(1,t/n);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,s=e._y,r=e._z,o=e._w,a=t._x,l=t._y,c=t._z,h=t._w;return this._x=n*h+o*a+s*c-r*l,this._y=s*h+o*l+r*a-n*c,this._z=r*h+o*c+n*l-s*a,this._w=o*h-n*a-s*l-r*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);let n=this._x,s=this._y,r=this._z,o=this._w,a=o*e._w+n*e._x+s*e._y+r*e._z;if(a<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,a=-a):this.copy(e),a>=1)return this._w=o,this._x=n,this._y=s,this._z=r,this;let l=1-a*a;if(l<=Number.EPSILON){let f=1-t;return this._w=f*o+t*this._w,this._x=f*n+t*this._x,this._y=f*s+t*this._y,this._z=f*r+t*this._z,this.normalize(),this}let c=Math.sqrt(l),h=Math.atan2(c,a),u=Math.sin((1-t)*h)/c,d=Math.sin(t*h)/c;return this._w=o*u+this._w*d,this._x=n*u+this._x*d,this._y=s*u+this._y*d,this._z=r*u+this._z*d,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(e),s*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},C=class i{constructor(e=0,t=0,n=0){i.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(lu.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(lu.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*s,this.y=r[1]*t+r[4]*n+r[7]*s,this.z=r[2]*t+r[5]*n+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,s=this.z,r=e.elements,o=1/(r[3]*t+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*s+r[12])*o,this.y=(r[1]*t+r[5]*n+r[9]*s+r[13])*o,this.z=(r[2]*t+r[6]*n+r[10]*s+r[14])*o,this}applyQuaternion(e){let t=this.x,n=this.y,s=this.z,r=e.x,o=e.y,a=e.z,l=e.w,c=2*(o*s-a*n),h=2*(a*t-r*s),u=2*(r*n-o*t);return this.x=t+l*c+o*u-a*h,this.y=n+l*h+a*c-r*u,this.z=s+l*u+r*h-o*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*s,this.y=r[1]*t+r[5]*n+r[9]*s,this.z=r[2]*t+r[6]*n+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=tt(this.x,e.x,t.x),this.y=tt(this.y,e.y,t.y),this.z=tt(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=tt(this.x,e,t),this.y=tt(this.y,e,t),this.z=tt(this.z,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(tt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,s=e.y,r=e.z,o=t.x,a=t.y,l=t.z;return this.x=s*l-r*a,this.y=r*o-n*l,this.z=n*a-s*o,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return ac.copy(this).projectOnVector(e),this.sub(ac)}reflect(e){return this.sub(ac.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(tt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,s=this.z-e.z;return t*t+n*n+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let s=Math.sin(t)*e;return this.x=s*Math.sin(n),this.y=Math.cos(t)*e,this.z=s*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},ac=new C,lu=new Jt,Ze=class i{constructor(e,t,n,s,r,o,a,l,c){i.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,o,a,l,c)}set(e,t,n,s,r,o,a,l,c){let h=this.elements;return h[0]=e,h[1]=s,h[2]=a,h[3]=t,h[4]=r,h[5]=l,h[6]=n,h[7]=o,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,s=t.elements,r=this.elements,o=n[0],a=n[3],l=n[6],c=n[1],h=n[4],u=n[7],d=n[2],f=n[5],g=n[8],v=s[0],m=s[3],p=s[6],E=s[1],y=s[4],_=s[7],R=s[2],A=s[5],I=s[8];return r[0]=o*v+a*E+l*R,r[3]=o*m+a*y+l*A,r[6]=o*p+a*_+l*I,r[1]=c*v+h*E+u*R,r[4]=c*m+h*y+u*A,r[7]=c*p+h*_+u*I,r[2]=d*v+f*E+g*R,r[5]=d*m+f*y+g*A,r[8]=d*p+f*_+g*I,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],o=e[4],a=e[5],l=e[6],c=e[7],h=e[8];return t*o*h-t*a*c-n*r*h+n*a*l+s*r*c-s*o*l}invert(){let e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],o=e[4],a=e[5],l=e[6],c=e[7],h=e[8],u=h*o-a*c,d=a*l-h*r,f=c*r-o*l,g=t*u+n*d+s*f;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);let v=1/g;return e[0]=u*v,e[1]=(s*c-h*n)*v,e[2]=(a*n-s*o)*v,e[3]=d*v,e[4]=(h*t-s*l)*v,e[5]=(s*r-a*t)*v,e[6]=f*v,e[7]=(n*l-c*t)*v,e[8]=(o*t-n*r)*v,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,s,r,o,a){let l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*o+c*a)+o+e,-s*c,s*l,-s*(-c*o+l*a)+a+t,0,0,1),this}scale(e,t){return this.premultiply(lc.makeScale(e,t)),this}rotate(e){return this.premultiply(lc.makeRotation(-e)),this}translate(e,t){return this.premultiply(lc.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let s=0;s<9;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}},lc=new Ze;function ch(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function kr(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function Pd(){let i=kr("canvas");return i.style.display="block",i}var cu={};function Zs(i){i in cu||(cu[i]=!0,console.warn(i))}function Dd(i,e,t){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:n()}}setTimeout(r,t)})}var hu=new Ze().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),uu=new Ze().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function up(){let i={enabled:!0,workingColorSpace:hs,spaces:{},convert:function(s,r,o){return this.enabled===!1||r===o||!r||!o||(this.spaces[r].transfer===pt&&(s.r=hi(s.r),s.g=hi(s.g),s.b=hi(s.b)),this.spaces[r].primaries!==this.spaces[o].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===pt&&(s.r=$s(s.r),s.g=$s(s.g),s.b=$s(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===_i?Br:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,o){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return Zs("THREE.ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return Zs("THREE.ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(s,r)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[hs]:{primaries:e,whitePoint:n,transfer:Br,toXYZ:hu,fromXYZ:uu,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:nn},outputColorSpaceConfig:{drawingBufferColorSpace:nn}},[nn]:{primaries:e,whitePoint:n,transfer:pt,toXYZ:hu,fromXYZ:uu,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:nn}}}),i}var lt=up();function hi(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function $s(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}var Ds,ya=class{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{Ds===void 0&&(Ds=kr("canvas")),Ds.width=e.width,Ds.height=e.height;let s=Ds.getContext("2d");e instanceof ImageData?s.putImageData(e,0,0):s.drawImage(e,0,0,e.width,e.height),n=Ds}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){let t=kr("canvas");t.width=e.width,t.height=e.height;let n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);let s=n.getImageData(0,0,e.width,e.height),r=s.data;for(let o=0;o<r.length;o++)r[o]=hi(r[o]/255)*255;return n.putImageData(s,0,0),t}else if(e.data){let t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(hi(t[n]/255)*255):t[n]=hi(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}},dp=0,Js=class{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:dp++}),this.uuid=vi(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):t instanceof VideoFrame?e.set(t.displayHeight,t.displayWidth,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let o=0,a=s.length;o<a;o++)s[o].isDataTexture?r.push(cc(s[o].image)):r.push(cc(s[o]))}else r=cc(s);n.url=r}return t||(e.images[this.uuid]=n),n}};function cc(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?ya.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}var fp=0,hc=new C,hn=class i extends Jn{constructor(e=i.DEFAULT_IMAGE,t=i.DEFAULT_MAPPING,n=Ui,s=Ui,r=kn,o=zi,a=Sn,l=Wn,c=i.DEFAULT_ANISOTROPY,h=_i){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:fp++}),this.uuid=vi(),this.name="",this.source=new Js(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new ye(0,0),this.repeat=new ye(1,1),this.center=new ye(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ze,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(hc).x}get height(){return this.source.getSize(hc).y}get depth(){return this.source.getSize(hc).z}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(let t in e){let n=e[t];if(n===void 0){console.warn(`THREE.Texture.setValues(): parameter '${t}' has value of undefined.`);continue}let s=this[t];if(s===void 0){console.warn(`THREE.Texture.setValues(): property '${t}' does not exist.`);continue}s&&n&&s.isVector2&&n.isVector2||s&&n&&s.isVector3&&n.isVector3||s&&n&&s.isMatrix3&&n.isMatrix3?s.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Jc)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case xa:e.x=e.x-Math.floor(e.x);break;case Ui:e.x=e.x<0?0:1;break;case _a:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case xa:e.y=e.y-Math.floor(e.y);break;case Ui:e.y=e.y<0?0:1;break;case _a:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};hn.DEFAULT_IMAGE=null;hn.DEFAULT_MAPPING=Jc;hn.DEFAULT_ANISOTROPY=1;var ht=class i{constructor(e=0,t=0,n=0,s=1){i.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,s){return this.x=e,this.y=t,this.z=n,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,s=this.z,r=this.w,o=e.elements;return this.x=o[0]*t+o[4]*n+o[8]*s+o[12]*r,this.y=o[1]*t+o[5]*n+o[9]*s+o[13]*r,this.z=o[2]*t+o[6]*n+o[10]*s+o[14]*r,this.w=o[3]*t+o[7]*n+o[11]*s+o[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,s,r,l=e.elements,c=l[0],h=l[4],u=l[8],d=l[1],f=l[5],g=l[9],v=l[2],m=l[6],p=l[10];if(Math.abs(h-d)<.01&&Math.abs(u-v)<.01&&Math.abs(g-m)<.01){if(Math.abs(h+d)<.1&&Math.abs(u+v)<.1&&Math.abs(g+m)<.1&&Math.abs(c+f+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;let y=(c+1)/2,_=(f+1)/2,R=(p+1)/2,A=(h+d)/4,I=(u+v)/4,L=(g+m)/4;return y>_&&y>R?y<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(y),s=A/n,r=I/n):_>R?_<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(_),n=A/s,r=L/s):R<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(R),n=I/r,s=L/r),this.set(n,s,r,t),this}let E=Math.sqrt((m-g)*(m-g)+(u-v)*(u-v)+(d-h)*(d-h));return Math.abs(E)<.001&&(E=1),this.x=(m-g)/E,this.y=(u-v)/E,this.z=(d-h)/E,this.w=Math.acos((c+f+p-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=tt(this.x,e.x,t.x),this.y=tt(this.y,e.y,t.y),this.z=tt(this.z,e.z,t.z),this.w=tt(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=tt(this.x,e,t),this.y=tt(this.y,e,t),this.z=tt(this.z,e,t),this.w=tt(this.w,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(tt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},Ma=class extends Jn{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:kn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new ht(0,0,e,t),this.scissorTest=!1,this.viewport=new ht(0,0,e,t);let s={width:e,height:t,depth:n.depth},r=new hn(s);this.textures=[];let o=n.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0,this.textures[a].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview}_setTextureOptions(e={}){let t={minFilter:kn,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=n,this.textures[s].isArrayTexture=this.textures[s].image.depth>1;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let s=Object.assign({},e.textures[t].image);this.textures[t].source=new Js(s)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}},Kn=class extends Ma{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}},Hr=class extends hn{constructor(e=null,t=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=cn,this.minFilter=cn,this.wrapR=Ui,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}};var ba=class extends hn{constructor(e=null,t=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=cn,this.minFilter=cn,this.wrapR=Ui,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var vn=class{constructor(e=new C(1/0,1/0,1/0),t=new C(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(Fn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(Fn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=Fn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,Fn):Fn.fromBufferAttribute(r,o),Fn.applyMatrix4(e.matrixWorld),this.expandByPoint(Fn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Xo.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Xo.copy(n.boundingBox)),Xo.applyMatrix4(e.matrixWorld),this.union(Xo)}let s=e.children;for(let r=0,o=s.length;r<o;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Fn),Fn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Er),$o.subVectors(this.max,Er),Ls.subVectors(e.a,Er),Us.subVectors(e.b,Er),Ns.subVectors(e.c,Er),Ai.subVectors(Us,Ls),Ri.subVectors(Ns,Us),es.subVectors(Ls,Ns);let t=[0,-Ai.z,Ai.y,0,-Ri.z,Ri.y,0,-es.z,es.y,Ai.z,0,-Ai.x,Ri.z,0,-Ri.x,es.z,0,-es.x,-Ai.y,Ai.x,0,-Ri.y,Ri.x,0,-es.y,es.x,0];return!uc(t,Ls,Us,Ns,$o)||(t=[1,0,0,0,1,0,0,0,1],!uc(t,Ls,Us,Ns,$o))?!1:(qo.crossVectors(Ai,Ri),t=[qo.x,qo.y,qo.z],uc(t,Ls,Us,Ns,$o))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Fn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Fn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(ri[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),ri[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),ri[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),ri[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),ri[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),ri[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),ri[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),ri[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(ri),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},ri=[new C,new C,new C,new C,new C,new C,new C,new C],Fn=new C,Xo=new vn,Ls=new C,Us=new C,Ns=new C,Ai=new C,Ri=new C,es=new C,Er=new C,$o=new C,qo=new C,ts=new C;function uc(i,e,t,n,s){for(let r=0,o=i.length-3;r<=o;r+=3){ts.fromArray(i,r);let a=s.x*Math.abs(ts.x)+s.y*Math.abs(ts.y)+s.z*Math.abs(ts.z),l=e.dot(ts),c=t.dot(ts),h=n.dot(ts);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>a)return!1}return!0}var pp=new vn,wr=new C,dc=new C,jn=class{constructor(e=new C,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t!==void 0?n.copy(t):pp.setFromPoints(e).getCenter(n);let s=0;for(let r=0,o=e.length;r<o;r++)s=Math.max(s,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;wr.subVectors(e,this.center);let t=wr.lengthSq();if(t>this.radius*this.radius){let n=Math.sqrt(t),s=(n-this.radius)*.5;this.center.addScaledVector(wr,s/n),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(dc.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(wr.copy(e.center).add(dc)),this.expandByPoint(wr.copy(e.center).sub(dc))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},oi=new C,fc=new C,Yo=new C,Ci=new C,pc=new C,Zo=new C,mc=new C,Vr=class{constructor(e=new C,t=new C(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,oi)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=oi.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(oi.copy(this.origin).addScaledVector(this.direction,t),oi.distanceToSquared(e))}distanceSqToSegment(e,t,n,s){fc.copy(e).add(t).multiplyScalar(.5),Yo.copy(t).sub(e).normalize(),Ci.copy(this.origin).sub(fc);let r=e.distanceTo(t)*.5,o=-this.direction.dot(Yo),a=Ci.dot(this.direction),l=-Ci.dot(Yo),c=Ci.lengthSq(),h=Math.abs(1-o*o),u,d,f,g;if(h>0)if(u=o*l-a,d=o*a-l,g=r*h,u>=0)if(d>=-g)if(d<=g){let v=1/h;u*=v,d*=v,f=u*(u+o*d+2*a)+d*(o*u+d+2*l)+c}else d=r,u=Math.max(0,-(o*d+a)),f=-u*u+d*(d+2*l)+c;else d=-r,u=Math.max(0,-(o*d+a)),f=-u*u+d*(d+2*l)+c;else d<=-g?(u=Math.max(0,-(-o*r+a)),d=u>0?-r:Math.min(Math.max(-r,-l),r),f=-u*u+d*(d+2*l)+c):d<=g?(u=0,d=Math.min(Math.max(-r,-l),r),f=d*(d+2*l)+c):(u=Math.max(0,-(o*r+a)),d=u>0?r:Math.min(Math.max(-r,-l),r),f=-u*u+d*(d+2*l)+c);else d=o>0?-r:r,u=Math.max(0,-(o*d+a)),f=-u*u+d*(d+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,u),s&&s.copy(fc).addScaledVector(Yo,d),f}intersectSphere(e,t){oi.subVectors(e.center,this.origin);let n=oi.dot(this.direction),s=oi.dot(oi)-n*n,r=e.radius*e.radius;if(s>r)return null;let o=Math.sqrt(r-s),a=n-o,l=n+o;return l<0?null:a<0?this.at(l,t):this.at(a,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,s,r,o,a,l,c=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,d=this.origin;return c>=0?(n=(e.min.x-d.x)*c,s=(e.max.x-d.x)*c):(n=(e.max.x-d.x)*c,s=(e.min.x-d.x)*c),h>=0?(r=(e.min.y-d.y)*h,o=(e.max.y-d.y)*h):(r=(e.max.y-d.y)*h,o=(e.min.y-d.y)*h),n>o||r>s||((r>n||isNaN(n))&&(n=r),(o<s||isNaN(s))&&(s=o),u>=0?(a=(e.min.z-d.z)*u,l=(e.max.z-d.z)*u):(a=(e.max.z-d.z)*u,l=(e.min.z-d.z)*u),n>l||a>s)||((a>n||n!==n)&&(n=a),(l<s||s!==s)&&(s=l),s<0)?null:this.at(n>=0?n:s,t)}intersectsBox(e){return this.intersectBox(e,oi)!==null}intersectTriangle(e,t,n,s,r){pc.subVectors(t,e),Zo.subVectors(n,e),mc.crossVectors(pc,Zo);let o=this.direction.dot(mc),a;if(o>0){if(s)return null;a=1}else if(o<0)a=-1,o=-o;else return null;Ci.subVectors(this.origin,e);let l=a*this.direction.dot(Zo.crossVectors(Ci,Zo));if(l<0)return null;let c=a*this.direction.dot(pc.cross(Ci));if(c<0||l+c>o)return null;let h=-a*Ci.dot(mc);return h<0?null:this.at(h/o,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},nt=class i{constructor(e,t,n,s,r,o,a,l,c,h,u,d,f,g,v,m){i.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,o,a,l,c,h,u,d,f,g,v,m)}set(e,t,n,s,r,o,a,l,c,h,u,d,f,g,v,m){let p=this.elements;return p[0]=e,p[4]=t,p[8]=n,p[12]=s,p[1]=r,p[5]=o,p[9]=a,p[13]=l,p[2]=c,p[6]=h,p[10]=u,p[14]=d,p[3]=f,p[7]=g,p[11]=v,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new i().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){let t=this.elements,n=e.elements,s=1/Fs.setFromMatrixColumn(e,0).length(),r=1/Fs.setFromMatrixColumn(e,1).length(),o=1/Fs.setFromMatrixColumn(e,2).length();return t[0]=n[0]*s,t[1]=n[1]*s,t[2]=n[2]*s,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*o,t[9]=n[9]*o,t[10]=n[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,s=e.y,r=e.z,o=Math.cos(n),a=Math.sin(n),l=Math.cos(s),c=Math.sin(s),h=Math.cos(r),u=Math.sin(r);if(e.order==="XYZ"){let d=o*h,f=o*u,g=a*h,v=a*u;t[0]=l*h,t[4]=-l*u,t[8]=c,t[1]=f+g*c,t[5]=d-v*c,t[9]=-a*l,t[2]=v-d*c,t[6]=g+f*c,t[10]=o*l}else if(e.order==="YXZ"){let d=l*h,f=l*u,g=c*h,v=c*u;t[0]=d+v*a,t[4]=g*a-f,t[8]=o*c,t[1]=o*u,t[5]=o*h,t[9]=-a,t[2]=f*a-g,t[6]=v+d*a,t[10]=o*l}else if(e.order==="ZXY"){let d=l*h,f=l*u,g=c*h,v=c*u;t[0]=d-v*a,t[4]=-o*u,t[8]=g+f*a,t[1]=f+g*a,t[5]=o*h,t[9]=v-d*a,t[2]=-o*c,t[6]=a,t[10]=o*l}else if(e.order==="ZYX"){let d=o*h,f=o*u,g=a*h,v=a*u;t[0]=l*h,t[4]=g*c-f,t[8]=d*c+v,t[1]=l*u,t[5]=v*c+d,t[9]=f*c-g,t[2]=-c,t[6]=a*l,t[10]=o*l}else if(e.order==="YZX"){let d=o*l,f=o*c,g=a*l,v=a*c;t[0]=l*h,t[4]=v-d*u,t[8]=g*u+f,t[1]=u,t[5]=o*h,t[9]=-a*h,t[2]=-c*h,t[6]=f*u+g,t[10]=d-v*u}else if(e.order==="XZY"){let d=o*l,f=o*c,g=a*l,v=a*c;t[0]=l*h,t[4]=-u,t[8]=c*h,t[1]=d*u+v,t[5]=o*h,t[9]=f*u-g,t[2]=g*u-f,t[6]=a*h,t[10]=v*u+d}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(mp,e,gp)}lookAt(e,t,n){let s=this.elements;return xn.subVectors(e,t),xn.lengthSq()===0&&(xn.z=1),xn.normalize(),Ii.crossVectors(n,xn),Ii.lengthSq()===0&&(Math.abs(n.z)===1?xn.x+=1e-4:xn.z+=1e-4,xn.normalize(),Ii.crossVectors(n,xn)),Ii.normalize(),Jo.crossVectors(xn,Ii),s[0]=Ii.x,s[4]=Jo.x,s[8]=xn.x,s[1]=Ii.y,s[5]=Jo.y,s[9]=xn.y,s[2]=Ii.z,s[6]=Jo.z,s[10]=xn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,s=t.elements,r=this.elements,o=n[0],a=n[4],l=n[8],c=n[12],h=n[1],u=n[5],d=n[9],f=n[13],g=n[2],v=n[6],m=n[10],p=n[14],E=n[3],y=n[7],_=n[11],R=n[15],A=s[0],I=s[4],L=s[8],b=s[12],M=s[1],D=s[5],z=s[9],G=s[13],q=s[2],Z=s[6],Y=s[10],he=s[14],W=s[3],ve=s[7],Me=s[11],Ae=s[15];return r[0]=o*A+a*M+l*q+c*W,r[4]=o*I+a*D+l*Z+c*ve,r[8]=o*L+a*z+l*Y+c*Me,r[12]=o*b+a*G+l*he+c*Ae,r[1]=h*A+u*M+d*q+f*W,r[5]=h*I+u*D+d*Z+f*ve,r[9]=h*L+u*z+d*Y+f*Me,r[13]=h*b+u*G+d*he+f*Ae,r[2]=g*A+v*M+m*q+p*W,r[6]=g*I+v*D+m*Z+p*ve,r[10]=g*L+v*z+m*Y+p*Me,r[14]=g*b+v*G+m*he+p*Ae,r[3]=E*A+y*M+_*q+R*W,r[7]=E*I+y*D+_*Z+R*ve,r[11]=E*L+y*z+_*Y+R*Me,r[15]=E*b+y*G+_*he+R*Ae,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],s=e[8],r=e[12],o=e[1],a=e[5],l=e[9],c=e[13],h=e[2],u=e[6],d=e[10],f=e[14],g=e[3],v=e[7],m=e[11],p=e[15];return g*(+r*l*u-s*c*u-r*a*d+n*c*d+s*a*f-n*l*f)+v*(+t*l*f-t*c*d+r*o*d-s*o*f+s*c*h-r*l*h)+m*(+t*c*u-t*a*f-r*o*u+n*o*f+r*a*h-n*c*h)+p*(-s*a*h-t*l*u+t*a*d+s*o*u-n*o*d+n*l*h)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],o=e[4],a=e[5],l=e[6],c=e[7],h=e[8],u=e[9],d=e[10],f=e[11],g=e[12],v=e[13],m=e[14],p=e[15],E=u*m*c-v*d*c+v*l*f-a*m*f-u*l*p+a*d*p,y=g*d*c-h*m*c-g*l*f+o*m*f+h*l*p-o*d*p,_=h*v*c-g*u*c+g*a*f-o*v*f-h*a*p+o*u*p,R=g*u*l-h*v*l-g*a*d+o*v*d+h*a*m-o*u*m,A=t*E+n*y+s*_+r*R;if(A===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let I=1/A;return e[0]=E*I,e[1]=(v*d*r-u*m*r-v*s*f+n*m*f+u*s*p-n*d*p)*I,e[2]=(a*m*r-v*l*r+v*s*c-n*m*c-a*s*p+n*l*p)*I,e[3]=(u*l*r-a*d*r-u*s*c+n*d*c+a*s*f-n*l*f)*I,e[4]=y*I,e[5]=(h*m*r-g*d*r+g*s*f-t*m*f-h*s*p+t*d*p)*I,e[6]=(g*l*r-o*m*r-g*s*c+t*m*c+o*s*p-t*l*p)*I,e[7]=(o*d*r-h*l*r+h*s*c-t*d*c-o*s*f+t*l*f)*I,e[8]=_*I,e[9]=(g*u*r-h*v*r-g*n*f+t*v*f+h*n*p-t*u*p)*I,e[10]=(o*v*r-g*a*r+g*n*c-t*v*c-o*n*p+t*a*p)*I,e[11]=(h*a*r-o*u*r-h*n*c+t*u*c+o*n*f-t*a*f)*I,e[12]=R*I,e[13]=(h*v*s-g*u*s+g*n*d-t*v*d-h*n*m+t*u*m)*I,e[14]=(g*a*s-o*v*s-g*n*l+t*v*l+o*n*m-t*a*m)*I,e[15]=(o*u*s-h*a*s+h*n*l-t*u*l-o*n*d+t*a*d)*I,this}scale(e){let t=this.elements,n=e.x,s=e.y,r=e.z;return t[0]*=n,t[4]*=s,t[8]*=r,t[1]*=n,t[5]*=s,t[9]*=r,t[2]*=n,t[6]*=s,t[10]*=r,t[3]*=n,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,s))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),s=Math.sin(t),r=1-n,o=e.x,a=e.y,l=e.z,c=r*o,h=r*a;return this.set(c*o+n,c*a-s*l,c*l+s*a,0,c*a+s*l,h*a+n,h*l-s*o,0,c*l-s*a,h*l+s*o,r*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,s,r,o){return this.set(1,n,r,0,e,1,o,0,t,s,1,0,0,0,0,1),this}compose(e,t,n){let s=this.elements,r=t._x,o=t._y,a=t._z,l=t._w,c=r+r,h=o+o,u=a+a,d=r*c,f=r*h,g=r*u,v=o*h,m=o*u,p=a*u,E=l*c,y=l*h,_=l*u,R=n.x,A=n.y,I=n.z;return s[0]=(1-(v+p))*R,s[1]=(f+_)*R,s[2]=(g-y)*R,s[3]=0,s[4]=(f-_)*A,s[5]=(1-(d+p))*A,s[6]=(m+E)*A,s[7]=0,s[8]=(g+y)*I,s[9]=(m-E)*I,s[10]=(1-(d+v))*I,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,n){let s=this.elements,r=Fs.set(s[0],s[1],s[2]).length(),o=Fs.set(s[4],s[5],s[6]).length(),a=Fs.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),e.x=s[12],e.y=s[13],e.z=s[14],On.copy(this);let c=1/r,h=1/o,u=1/a;return On.elements[0]*=c,On.elements[1]*=c,On.elements[2]*=c,On.elements[4]*=h,On.elements[5]*=h,On.elements[6]*=h,On.elements[8]*=u,On.elements[9]*=u,On.elements[10]*=u,t.setFromRotationMatrix(On),n.x=r,n.y=o,n.z=a,this}makePerspective(e,t,n,s,r,o,a=zn,l=!1){let c=this.elements,h=2*r/(t-e),u=2*r/(n-s),d=(t+e)/(t-e),f=(n+s)/(n-s),g,v;if(l)g=r/(o-r),v=o*r/(o-r);else if(a===zn)g=-(o+r)/(o-r),v=-2*o*r/(o-r);else if(a===zr)g=-o/(o-r),v=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return c[0]=h,c[4]=0,c[8]=d,c[12]=0,c[1]=0,c[5]=u,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=g,c[14]=v,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,s,r,o,a=zn,l=!1){let c=this.elements,h=2/(t-e),u=2/(n-s),d=-(t+e)/(t-e),f=-(n+s)/(n-s),g,v;if(l)g=1/(o-r),v=o/(o-r);else if(a===zn)g=-2/(o-r),v=-(o+r)/(o-r);else if(a===zr)g=-1/(o-r),v=-r/(o-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return c[0]=h,c[4]=0,c[8]=0,c[12]=d,c[1]=0,c[5]=u,c[9]=0,c[13]=f,c[2]=0,c[6]=0,c[10]=g,c[14]=v,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let s=0;s<16;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}},Fs=new C,On=new nt,mp=new C(0,0,0),gp=new C(1,1,1),Ii=new C,Jo=new C,xn=new C,du=new nt,fu=new Jt,Hn=class i{constructor(e=0,t=0,n=0,s=i.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,s=this._order){return this._x=e,this._y=t,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let s=e.elements,r=s[0],o=s[4],a=s[8],l=s[1],c=s[5],h=s[9],u=s[2],d=s[6],f=s[10];switch(t){case"XYZ":this._y=Math.asin(tt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(d,c),this._z=0);break;case"YXZ":this._x=Math.asin(-tt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(tt(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,f),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-tt(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(tt(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(a,f));break;case"XZY":this._z=Math.asin(-tt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-h,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return du.makeRotationFromQuaternion(e),this.setFromRotationMatrix(du,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return fu.setFromEuler(this),this.setFromQuaternion(fu,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};Hn.DEFAULT_ORDER="XYZ";var Gr=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}},xp=0,pu=new C,Os=new Jt,ai=new nt,Ko=new C,Tr=new C,_p=new C,vp=new Jt,mu=new C(1,0,0),gu=new C(0,1,0),xu=new C(0,0,1),_u={type:"added"},yp={type:"removed"},Bs={type:"childadded",child:null},gc={type:"childremoved",child:null},Xt=class i extends Jn{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:xp++}),this.uuid=vi(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=i.DEFAULT_UP.clone();let e=new C,t=new Hn,n=new Jt,s=new C(1,1,1);function r(){n.setFromEuler(t,!1)}function o(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new nt},normalMatrix:{value:new Ze}}),this.matrix=new nt,this.matrixWorld=new nt,this.matrixAutoUpdate=i.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=i.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Gr,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Os.setFromAxisAngle(e,t),this.quaternion.multiply(Os),this}rotateOnWorldAxis(e,t){return Os.setFromAxisAngle(e,t),this.quaternion.premultiply(Os),this}rotateX(e){return this.rotateOnAxis(mu,e)}rotateY(e){return this.rotateOnAxis(gu,e)}rotateZ(e){return this.rotateOnAxis(xu,e)}translateOnAxis(e,t){return pu.copy(e).applyQuaternion(this.quaternion),this.position.add(pu.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(mu,e)}translateY(e){return this.translateOnAxis(gu,e)}translateZ(e){return this.translateOnAxis(xu,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(ai.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?Ko.copy(e):Ko.set(e,t,n);let s=this.parent;this.updateWorldMatrix(!0,!1),Tr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?ai.lookAt(Tr,Ko,this.up):ai.lookAt(Ko,Tr,this.up),this.quaternion.setFromRotationMatrix(ai),s&&(ai.extractRotation(s.matrixWorld),Os.setFromRotationMatrix(ai),this.quaternion.premultiply(Os.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(_u),Bs.child=e,this.dispatchEvent(Bs),Bs.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(yp),gc.child=e,this.dispatchEvent(gc),gc.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),ai.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),ai.multiply(e.parent.matrixWorld)),e.applyMatrix4(ai),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(_u),Bs.child=e,this.dispatchEvent(Bs),Bs.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,s=this.children.length;n<s;n++){let o=this.children[n].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Tr,e,_p),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Tr,vp,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);let t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){let n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){let s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(e){let t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(a=>({...a,boundingBox:a.boundingBox?a.boundingBox.toJSON():void 0,boundingSphere:a.boundingSphere?a.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(a=>({...a})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(e),s.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);let a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){let l=a.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){let u=l[c];r(e.shapes,u)}else r(e.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(r(e.materials,this.material[l]));s.material=a}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){let l=this.animations[a];s.animations.push(r(e.animations,l))}}if(t){let a=o(e.geometries),l=o(e.materials),c=o(e.textures),h=o(e.images),u=o(e.shapes),d=o(e.skeletons),f=o(e.animations),g=o(e.nodes);a.length>0&&(n.geometries=a),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),d.length>0&&(n.skeletons=d),f.length>0&&(n.animations=f),g.length>0&&(n.nodes=g)}return n.object=s,n;function o(a){let l=[];for(let c in a){let h=a[c];delete h.metadata,l.push(h)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){let s=e.children[n];this.add(s.clone())}return this}};Xt.DEFAULT_UP=new C(0,1,0);Xt.DEFAULT_MATRIX_AUTO_UPDATE=!0;Xt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var Bn=new C,li=new C,xc=new C,ci=new C,zs=new C,ks=new C,vu=new C,_c=new C,vc=new C,yc=new C,Mc=new ht,bc=new ht,Sc=new ht,Li=class i{constructor(e=new C,t=new C,n=new C){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,s){s.subVectors(n,t),Bn.subVectors(e,t),s.cross(Bn);let r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,n,s,r){Bn.subVectors(s,t),li.subVectors(n,t),xc.subVectors(e,t);let o=Bn.dot(Bn),a=Bn.dot(li),l=Bn.dot(xc),c=li.dot(li),h=li.dot(xc),u=o*c-a*a;if(u===0)return r.set(0,0,0),null;let d=1/u,f=(c*l-a*h)*d,g=(o*h-a*l)*d;return r.set(1-f-g,g,f)}static containsPoint(e,t,n,s){return this.getBarycoord(e,t,n,s,ci)===null?!1:ci.x>=0&&ci.y>=0&&ci.x+ci.y<=1}static getInterpolation(e,t,n,s,r,o,a,l){return this.getBarycoord(e,t,n,s,ci)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,ci.x),l.addScaledVector(o,ci.y),l.addScaledVector(a,ci.z),l)}static getInterpolatedAttribute(e,t,n,s,r,o){return Mc.setScalar(0),bc.setScalar(0),Sc.setScalar(0),Mc.fromBufferAttribute(e,t),bc.fromBufferAttribute(e,n),Sc.fromBufferAttribute(e,s),o.setScalar(0),o.addScaledVector(Mc,r.x),o.addScaledVector(bc,r.y),o.addScaledVector(Sc,r.z),o}static isFrontFacing(e,t,n,s){return Bn.subVectors(n,t),li.subVectors(e,t),Bn.cross(li).dot(s)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,s){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,n,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Bn.subVectors(this.c,this.b),li.subVectors(this.a,this.b),Bn.cross(li).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return i.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return i.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,s,r){return i.getInterpolation(e,this.a,this.b,this.c,t,n,s,r)}containsPoint(e){return i.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return i.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,s=this.b,r=this.c,o,a;zs.subVectors(s,n),ks.subVectors(r,n),_c.subVectors(e,n);let l=zs.dot(_c),c=ks.dot(_c);if(l<=0&&c<=0)return t.copy(n);vc.subVectors(e,s);let h=zs.dot(vc),u=ks.dot(vc);if(h>=0&&u<=h)return t.copy(s);let d=l*u-h*c;if(d<=0&&l>=0&&h<=0)return o=l/(l-h),t.copy(n).addScaledVector(zs,o);yc.subVectors(e,r);let f=zs.dot(yc),g=ks.dot(yc);if(g>=0&&f<=g)return t.copy(r);let v=f*c-l*g;if(v<=0&&c>=0&&g<=0)return a=c/(c-g),t.copy(n).addScaledVector(ks,a);let m=h*g-f*u;if(m<=0&&u-h>=0&&f-g>=0)return vu.subVectors(r,s),a=(u-h)/(u-h+(f-g)),t.copy(s).addScaledVector(vu,a);let p=1/(m+v+d);return o=v*p,a=d*p,t.copy(n).addScaledVector(zs,o).addScaledVector(ks,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},Ld={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Pi={h:0,s:0,l:0},jo={h:0,s:0,l:0};function Ec(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}var Ke=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=nn){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,lt.colorSpaceToWorking(this,t),this}setRGB(e,t,n,s=lt.workingColorSpace){return this.r=e,this.g=t,this.b=n,lt.colorSpaceToWorking(this,s),this}setHSL(e,t,n,s=lt.workingColorSpace){if(e=ah(e,1),t=tt(t,0,1),n=tt(n,0,1),t===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+t):n+t-n*t,o=2*n-r;this.r=Ec(o,r,e+1/3),this.g=Ec(o,r,e),this.b=Ec(o,r,e-1/3)}return lt.colorSpaceToWorking(this,s),this}setStyle(e,t=nn){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r,o=s[1],a=s[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){let r=s[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(r,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=nn){let n=Ld[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=hi(e.r),this.g=hi(e.g),this.b=hi(e.b),this}copyLinearToSRGB(e){return this.r=$s(e.r),this.g=$s(e.g),this.b=$s(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=nn){return lt.workingToColorSpace(Yt.copy(this),e),Math.round(tt(Yt.r*255,0,255))*65536+Math.round(tt(Yt.g*255,0,255))*256+Math.round(tt(Yt.b*255,0,255))}getHexString(e=nn){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=lt.workingColorSpace){lt.workingToColorSpace(Yt.copy(this),t);let n=Yt.r,s=Yt.g,r=Yt.b,o=Math.max(n,s,r),a=Math.min(n,s,r),l,c,h=(a+o)/2;if(a===o)l=0,c=0;else{let u=o-a;switch(c=h<=.5?u/(o+a):u/(2-o-a),o){case n:l=(s-r)/u+(s<r?6:0);break;case s:l=(r-n)/u+2;break;case r:l=(n-s)/u+4;break}l/=6}return e.h=l,e.s=c,e.l=h,e}getRGB(e,t=lt.workingColorSpace){return lt.workingToColorSpace(Yt.copy(this),t),e.r=Yt.r,e.g=Yt.g,e.b=Yt.b,e}getStyle(e=nn){lt.workingToColorSpace(Yt.copy(this),e);let t=Yt.r,n=Yt.g,s=Yt.b;return e!==nn?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(e,t,n){return this.getHSL(Pi),this.setHSL(Pi.h+e,Pi.s+t,Pi.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Pi),e.getHSL(jo);let n=Lr(Pi.h,jo.h,t),s=Lr(Pi.s,jo.s,t),r=Lr(Pi.l,jo.l,t);return this.setHSL(n,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*s,this.g=r[1]*t+r[4]*n+r[7]*s,this.b=r[2]*t+r[5]*n+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},Yt=new Ke;Ke.NAMES=Ld;var Mp=0,Fi=class extends Jn{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Mp++}),this.uuid=vi(),this.name="",this.type="Material",this.blending=ls,this.side=ui,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=ma,this.blendDst=ga,this.blendEquation=Ni,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Ke(0,0,0),this.blendAlpha=0,this.depthFunc=cs,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Fc,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=ss,this.stencilZFail=ss,this.stencilZPass=ss,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}let s=this[t];if(s===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});let n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==ls&&(n.blending=this.blending),this.side!==ui&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==ma&&(n.blendSrc=this.blendSrc),this.blendDst!==ga&&(n.blendDst=this.blendDst),this.blendEquation!==Ni&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==cs&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Fc&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==ss&&(n.stencilFail=this.stencilFail),this.stencilZFail!==ss&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==ss&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){let o=[];for(let a in r){let l=r[a];delete l.metadata,o.push(l)}return o}if(t){let r=s(e.textures),o=s(e.images);r.length>0&&(n.textures=r),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let s=t.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}},Wr=class extends Fi{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Ke(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Hn,this.combine=Zc,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}};var Pt=new C,Qo=new ye,bp=0,ln=class{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:bp++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=Oc,this.updateRanges=[],this.gpuType=Pn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[n+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)Qo.fromBufferAttribute(this,t),Qo.applyMatrix3(e),this.setXY(t,Qo.x,Qo.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)Pt.fromBufferAttribute(this,t),Pt.applyMatrix3(e),this.setXYZ(t,Pt.x,Pt.y,Pt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)Pt.fromBufferAttribute(this,t),Pt.applyMatrix4(e),this.setXYZ(t,Pt.x,Pt.y,Pt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Pt.fromBufferAttribute(this,t),Pt.applyNormalMatrix(e),this.setXYZ(t,Pt.x,Pt.y,Pt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Pt.fromBufferAttribute(this,t),Pt.transformDirection(e),this.setXYZ(t,Pt.x,Pt.y,Pt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=Xs(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=tn(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Xs(t,this.array)),t}setX(e,t){return this.normalized&&(t=tn(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Xs(t,this.array)),t}setY(e,t){return this.normalized&&(t=tn(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Xs(t,this.array)),t}setZ(e,t){return this.normalized&&(t=tn(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Xs(t,this.array)),t}setW(e,t){return this.normalized&&(t=tn(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=tn(t,this.array),n=tn(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,s){return e*=this.itemSize,this.normalized&&(t=tn(t,this.array),n=tn(n,this.array),s=tn(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e*=this.itemSize,this.normalized&&(t=tn(t,this.array),n=tn(n,this.array),s=tn(s,this.array),r=tn(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Oc&&(e.usage=this.usage),e}};var us=class extends ln{constructor(e,t,n){super(new Uint16Array(e),t,n)}};var Xr=class extends ln{constructor(e,t,n){super(new Uint32Array(e),t,n)}};var ut=class extends ln{constructor(e,t,n){super(new Float32Array(e),t,n)}},Sp=0,Cn=new nt,wc=new Xt,Hs=new C,_n=new vn,Ar=new vn,zt=new C,Kt=class i extends Jn{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Sp++}),this.uuid=vi(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(ch(e)?Xr:us)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let r=new Ze().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}let s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Cn.makeRotationFromQuaternion(e),this.applyMatrix4(Cn),this}rotateX(e){return Cn.makeRotationX(e),this.applyMatrix4(Cn),this}rotateY(e){return Cn.makeRotationY(e),this.applyMatrix4(Cn),this}rotateZ(e){return Cn.makeRotationZ(e),this.applyMatrix4(Cn),this}translate(e,t,n){return Cn.makeTranslation(e,t,n),this.applyMatrix4(Cn),this}scale(e,t,n){return Cn.makeScale(e,t,n),this.applyMatrix4(Cn),this}lookAt(e){return wc.lookAt(e),wc.updateMatrix(),this.applyMatrix4(wc.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Hs).negate(),this.translate(Hs.x,Hs.y,Hs.z),this}setFromPoints(e){let t=this.getAttribute("position");if(t===void 0){let n=[];for(let s=0,r=e.length;s<r;s++){let o=e[s];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new ut(n,3))}else{let n=Math.min(e.length,t.count);for(let s=0;s<n;s++){let r=e[s];t.setXYZ(s,r.x,r.y,r.z||0)}e.length>t.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new vn);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new C(-1/0,-1/0,-1/0),new C(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,s=t.length;n<s;n++){let r=t[n];_n.setFromBufferAttribute(r),this.morphTargetsRelative?(zt.addVectors(this.boundingBox.min,_n.min),this.boundingBox.expandByPoint(zt),zt.addVectors(this.boundingBox.max,_n.max),this.boundingBox.expandByPoint(zt)):(this.boundingBox.expandByPoint(_n.min),this.boundingBox.expandByPoint(_n.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new jn);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new C,1/0);return}if(e){let n=this.boundingSphere.center;if(_n.setFromBufferAttribute(e),t)for(let r=0,o=t.length;r<o;r++){let a=t[r];Ar.setFromBufferAttribute(a),this.morphTargetsRelative?(zt.addVectors(_n.min,Ar.min),_n.expandByPoint(zt),zt.addVectors(_n.max,Ar.max),_n.expandByPoint(zt)):(_n.expandByPoint(Ar.min),_n.expandByPoint(Ar.max))}_n.getCenter(n);let s=0;for(let r=0,o=e.count;r<o;r++)zt.fromBufferAttribute(e,r),s=Math.max(s,n.distanceToSquared(zt));if(t)for(let r=0,o=t.length;r<o;r++){let a=t[r],l=this.morphTargetsRelative;for(let c=0,h=a.count;c<h;c++)zt.fromBufferAttribute(a,c),l&&(Hs.fromBufferAttribute(e,c),zt.add(Hs)),s=Math.max(s,n.distanceToSquared(zt))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=t.position,s=t.normal,r=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new ln(new Float32Array(4*n.count),4));let o=this.getAttribute("tangent"),a=[],l=[];for(let L=0;L<n.count;L++)a[L]=new C,l[L]=new C;let c=new C,h=new C,u=new C,d=new ye,f=new ye,g=new ye,v=new C,m=new C;function p(L,b,M){c.fromBufferAttribute(n,L),h.fromBufferAttribute(n,b),u.fromBufferAttribute(n,M),d.fromBufferAttribute(r,L),f.fromBufferAttribute(r,b),g.fromBufferAttribute(r,M),h.sub(c),u.sub(c),f.sub(d),g.sub(d);let D=1/(f.x*g.y-g.x*f.y);isFinite(D)&&(v.copy(h).multiplyScalar(g.y).addScaledVector(u,-f.y).multiplyScalar(D),m.copy(u).multiplyScalar(f.x).addScaledVector(h,-g.x).multiplyScalar(D),a[L].add(v),a[b].add(v),a[M].add(v),l[L].add(m),l[b].add(m),l[M].add(m))}let E=this.groups;E.length===0&&(E=[{start:0,count:e.count}]);for(let L=0,b=E.length;L<b;++L){let M=E[L],D=M.start,z=M.count;for(let G=D,q=D+z;G<q;G+=3)p(e.getX(G+0),e.getX(G+1),e.getX(G+2))}let y=new C,_=new C,R=new C,A=new C;function I(L){R.fromBufferAttribute(s,L),A.copy(R);let b=a[L];y.copy(b),y.sub(R.multiplyScalar(R.dot(b))).normalize(),_.crossVectors(A,b);let D=_.dot(l[L])<0?-1:1;o.setXYZW(L,y.x,y.y,y.z,D)}for(let L=0,b=E.length;L<b;++L){let M=E[L],D=M.start,z=M.count;for(let G=D,q=D+z;G<q;G+=3)I(e.getX(G+0)),I(e.getX(G+1)),I(e.getX(G+2))}}computeVertexNormals(){let e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new ln(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let d=0,f=n.count;d<f;d++)n.setXYZ(d,0,0,0);let s=new C,r=new C,o=new C,a=new C,l=new C,c=new C,h=new C,u=new C;if(e)for(let d=0,f=e.count;d<f;d+=3){let g=e.getX(d+0),v=e.getX(d+1),m=e.getX(d+2);s.fromBufferAttribute(t,g),r.fromBufferAttribute(t,v),o.fromBufferAttribute(t,m),h.subVectors(o,r),u.subVectors(s,r),h.cross(u),a.fromBufferAttribute(n,g),l.fromBufferAttribute(n,v),c.fromBufferAttribute(n,m),a.add(h),l.add(h),c.add(h),n.setXYZ(g,a.x,a.y,a.z),n.setXYZ(v,l.x,l.y,l.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let d=0,f=t.count;d<f;d+=3)s.fromBufferAttribute(t,d+0),r.fromBufferAttribute(t,d+1),o.fromBufferAttribute(t,d+2),h.subVectors(o,r),u.subVectors(s,r),h.cross(u),n.setXYZ(d+0,h.x,h.y,h.z),n.setXYZ(d+1,h.x,h.y,h.z),n.setXYZ(d+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)zt.fromBufferAttribute(e,t),zt.normalize(),e.setXYZ(t,zt.x,zt.y,zt.z)}toNonIndexed(){function e(a,l){let c=a.array,h=a.itemSize,u=a.normalized,d=new c.constructor(l.length*h),f=0,g=0;for(let v=0,m=l.length;v<m;v++){a.isInterleavedBufferAttribute?f=l[v]*a.data.stride+a.offset:f=l[v]*h;for(let p=0;p<h;p++)d[g++]=c[f++]}return new ln(d,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let t=new i,n=this.index.array,s=this.attributes;for(let a in s){let l=s[a],c=e(l,n);t.setAttribute(a,c)}let r=this.morphAttributes;for(let a in r){let l=[],c=r[a];for(let h=0,u=c.length;h<u;h++){let d=c[h],f=e(d,n);l.push(f)}t.morphAttributes[a]=l}t.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let a=0,l=o.length;a<l;a++){let c=o[a];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){let e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){let l=this.parameters;for(let c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let l in n){let c=n[l];e.data.attributes[l]=c.toJSON(e.data)}let s={},r=!1;for(let l in this.morphAttributes){let c=this.morphAttributes[l],h=[];for(let u=0,d=c.length;u<d;u++){let f=c[u];h.push(f.toJSON(e.data))}h.length>0&&(s[l]=h,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);let o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));let a=this.boundingSphere;return a!==null&&(e.data.boundingSphere=a.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone());let s=e.attributes;for(let c in s){let h=s[c];this.setAttribute(c,h.clone(t))}let r=e.morphAttributes;for(let c in r){let h=[],u=r[c];for(let d=0,f=u.length;d<f;d++)h.push(u[d].clone(t));this.morphAttributes[c]=h}this.morphTargetsRelative=e.morphTargetsRelative;let o=e.groups;for(let c=0,h=o.length;c<h;c++){let u=o[c];this.addGroup(u.start,u.count,u.materialIndex)}let a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());let l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}},yu=new nt,ns=new Vr,ea=new jn,Mu=new C,ta=new C,na=new C,ia=new C,Tc=new C,sa=new C,bu=new C,ra=new C,Lt=class extends Xt{constructor(e=new Kt,t=new Wr){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){let a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(e,t){let n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,o=n.morphTargetsRelative;t.fromBufferAttribute(s,e);let a=this.morphTargetInfluences;if(r&&a){sa.set(0,0,0);for(let l=0,c=r.length;l<c;l++){let h=a[l],u=r[l];h!==0&&(Tc.fromBufferAttribute(u,e),o?sa.addScaledVector(Tc,h):sa.addScaledVector(Tc.sub(t),h))}t.add(sa)}return t}raycast(e,t){let n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),ea.copy(n.boundingSphere),ea.applyMatrix4(r),ns.copy(e.ray).recast(e.near),!(ea.containsPoint(ns.origin)===!1&&(ns.intersectSphere(ea,Mu)===null||ns.origin.distanceToSquared(Mu)>(e.far-e.near)**2))&&(yu.copy(r).invert(),ns.copy(e.ray).applyMatrix4(yu),!(n.boundingBox!==null&&ns.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,ns)))}_computeIntersections(e,t,n){let s,r=this.geometry,o=this.material,a=r.index,l=r.attributes.position,c=r.attributes.uv,h=r.attributes.uv1,u=r.attributes.normal,d=r.groups,f=r.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,v=d.length;g<v;g++){let m=d[g],p=o[m.materialIndex],E=Math.max(m.start,f.start),y=Math.min(a.count,Math.min(m.start+m.count,f.start+f.count));for(let _=E,R=y;_<R;_+=3){let A=a.getX(_),I=a.getX(_+1),L=a.getX(_+2);s=oa(this,p,e,n,c,h,u,A,I,L),s&&(s.faceIndex=Math.floor(_/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{let g=Math.max(0,f.start),v=Math.min(a.count,f.start+f.count);for(let m=g,p=v;m<p;m+=3){let E=a.getX(m),y=a.getX(m+1),_=a.getX(m+2);s=oa(this,o,e,n,c,h,u,E,y,_),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}else if(l!==void 0)if(Array.isArray(o))for(let g=0,v=d.length;g<v;g++){let m=d[g],p=o[m.materialIndex],E=Math.max(m.start,f.start),y=Math.min(l.count,Math.min(m.start+m.count,f.start+f.count));for(let _=E,R=y;_<R;_+=3){let A=_,I=_+1,L=_+2;s=oa(this,p,e,n,c,h,u,A,I,L),s&&(s.faceIndex=Math.floor(_/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{let g=Math.max(0,f.start),v=Math.min(l.count,f.start+f.count);for(let m=g,p=v;m<p;m+=3){let E=m,y=m+1,_=m+2;s=oa(this,o,e,n,c,h,u,E,y,_),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}}};function Ep(i,e,t,n,s,r,o,a){let l;if(e.side===sn?l=n.intersectTriangle(o,r,s,!0,a):l=n.intersectTriangle(s,r,o,e.side===ui,a),l===null)return null;ra.copy(a),ra.applyMatrix4(i.matrixWorld);let c=t.ray.origin.distanceTo(ra);return c<t.near||c>t.far?null:{distance:c,point:ra.clone(),object:i}}function oa(i,e,t,n,s,r,o,a,l,c){i.getVertexPosition(a,ta),i.getVertexPosition(l,na),i.getVertexPosition(c,ia);let h=Ep(i,e,t,n,ta,na,ia,bu);if(h){let u=new C;Li.getBarycoord(bu,ta,na,ia,u),s&&(h.uv=Li.getInterpolatedAttribute(s,a,l,c,u,new ye)),r&&(h.uv1=Li.getInterpolatedAttribute(r,a,l,c,u,new ye)),o&&(h.normal=Li.getInterpolatedAttribute(o,a,l,c,u,new C),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));let d={a,b:l,c,normal:new C,materialIndex:0};Li.getNormal(ta,na,ia,d.normal),h.face=d,h.barycoord=u}return h}var Vn=class i extends Kt{constructor(e=1,t=1,n=1,s=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:s,heightSegments:r,depthSegments:o};let a=this;s=Math.floor(s),r=Math.floor(r),o=Math.floor(o);let l=[],c=[],h=[],u=[],d=0,f=0;g("z","y","x",-1,-1,n,t,e,o,r,0),g("z","y","x",1,-1,n,t,-e,o,r,1),g("x","z","y",1,1,e,n,t,s,o,2),g("x","z","y",1,-1,e,n,-t,s,o,3),g("x","y","z",1,-1,e,t,n,s,r,4),g("x","y","z",-1,-1,e,t,-n,s,r,5),this.setIndex(l),this.setAttribute("position",new ut(c,3)),this.setAttribute("normal",new ut(h,3)),this.setAttribute("uv",new ut(u,2));function g(v,m,p,E,y,_,R,A,I,L,b){let M=_/I,D=R/L,z=_/2,G=R/2,q=A/2,Z=I+1,Y=L+1,he=0,W=0,ve=new C;for(let Me=0;Me<Y;Me++){let Ae=Me*D-G;for(let He=0;He<Z;He++){let et=He*M-z;ve[v]=et*E,ve[m]=Ae*y,ve[p]=q,c.push(ve.x,ve.y,ve.z),ve[v]=0,ve[m]=0,ve[p]=A>0?1:-1,h.push(ve.x,ve.y,ve.z),u.push(He/I),u.push(1-Me/L),he+=1}}for(let Me=0;Me<L;Me++)for(let Ae=0;Ae<I;Ae++){let He=d+Ae+Z*Me,et=d+Ae+Z*(Me+1),at=d+(Ae+1)+Z*(Me+1),it=d+(Ae+1)+Z*Me;l.push(He,et,it),l.push(et,at,it),W+=6}a.addGroup(f,W,b),f+=W,d+=he}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}};function Ms(i){let e={};for(let t in i){e[t]={};for(let n in i[t]){let s=i[t][n];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=s.clone():Array.isArray(s)?e[t][n]=s.slice():e[t][n]=s}}return e}function jt(i){let e={};for(let t=0;t<i.length;t++){let n=Ms(i[t]);for(let s in n)e[s]=n[s]}return e}function wp(i){let e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function hh(i){let e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:lt.workingColorSpace}var Ud={clone:Ms,merge:jt},Tp=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Ap=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,yn=class extends Fi{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Tp,this.fragmentShader=Ap,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Ms(e.uniforms),this.uniformsGroups=wp(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let s in this.uniforms){let o=this.uniforms[s].value;o&&o.isTexture?t.uniforms[s]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[s]={type:"m4",value:o.toArray()}:t.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let n={};for(let s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}},$r=class extends Xt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new nt,this.projectionMatrix=new nt,this.projectionMatrixInverse=new nt,this.coordinateSystem=zn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}},Di=new C,Su=new ye,Eu=new ye,Wt=class extends $r{constructor(e=50,t=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=Ys*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(Dr*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Ys*2*Math.atan(Math.tan(Dr*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){Di.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Di.x,Di.y).multiplyScalar(-e/Di.z),Di.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Di.x,Di.y).multiplyScalar(-e/Di.z)}getViewSize(e,t){return this.getViewBounds(e,Su,Eu),t.subVectors(Eu,Su)}setViewOffset(e,t,n,s,r,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(Dr*.5*this.fov)/this.zoom,n=2*t,s=this.aspect*n,r=-.5*s,o=this.view;if(this.view!==null&&this.view.enabled){let l=o.fullWidth,c=o.fullHeight;r+=o.offsetX*s/l,t-=o.offsetY*n/c,s*=o.width/l,n*=o.height/c}let a=this.filmOffset;a!==0&&(r+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}},Vs=-90,Gs=1,Sa=class extends Xt{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let s=new Wt(Vs,Gs,e,t);s.layers=this.layers,this.add(s);let r=new Wt(Vs,Gs,e,t);r.layers=this.layers,this.add(r);let o=new Wt(Vs,Gs,e,t);o.layers=this.layers,this.add(o);let a=new Wt(Vs,Gs,e,t);a.layers=this.layers,this.add(a);let l=new Wt(Vs,Gs,e,t);l.layers=this.layers,this.add(l);let c=new Wt(Vs,Gs,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[n,s,r,o,a,l]=t;for(let c of t)this.remove(c);if(e===zn)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===zr)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(let c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[r,o,a,l,c,h]=this.children,u=e.getRenderTarget(),d=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;let v=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,s),e.render(t,r),e.setRenderTarget(n,1,s),e.render(t,o),e.setRenderTarget(n,2,s),e.render(t,a),e.setRenderTarget(n,3,s),e.render(t,l),e.setRenderTarget(n,4,s),e.render(t,c),n.texture.generateMipmaps=v,e.setRenderTarget(n,5,s),e.render(t,h),e.setRenderTarget(u,d,f),e.xr.enabled=g,n.texture.needsPMREMUpdate=!0}},qr=class extends hn{constructor(e=[],t=vs,n,s,r,o,a,l,c,h){super(e,t,n,s,r,o,a,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},Ea=class extends Kn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},s=[n,n,n,n,n,n];this.texture=new qr(s),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new Vn(5,5,5),r=new yn({name:"CubemapFromEquirect",uniforms:Ms(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:sn,blending:gi});r.uniforms.tEquirect.value=t;let o=new Lt(s,r),a=t.minFilter;return t.minFilter===zi&&(t.minFilter=kn),new Sa(1,10,this).update(e,o),t.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,t=!0,n=!0,s=!0){let r=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,n,s);e.setRenderTarget(r)}},Zt=class extends Xt{constructor(){super(),this.isGroup=!0,this.type="Group"}},Rp={type:"move"},Ks=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Zt,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Zt,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new C,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new C),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Zt,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new C,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new C),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let s=null,r=null,o=null,a=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){o=!0;for(let v of e.hand.values()){let m=t.getJointPose(v,n),p=this._getHandJoint(c,v);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}let h=c.joints["index-finger-tip"],u=c.joints["thumb-tip"],d=h.position.distanceTo(u.position),f=.02,g=.005;c.inputState.pinching&&d>f+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&d<=f-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(s=t.getPose(e.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(Rp)))}return a!==null&&(a.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let n=new Zt;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}};var Yr=class i{constructor(e,t=1,n=1e3){this.isFog=!0,this.name="",this.color=new Ke(e),this.near=t,this.far=n}clone(){return new i(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}},Zr=class extends Xt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Hn,this.environmentIntensity=1,this.environmentRotation=new Hn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}};var wu=new C,Tu=new ht,Au=new ht,Cp=new C,Ru=new nt,aa=new C,Ac=new jn,Cu=new nt,Rc=new Vr,Jr=class extends Lt{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=Nc,this.bindMatrix=new nt,this.bindMatrixInverse=new nt,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){let e=this.geometry;this.boundingBox===null&&(this.boundingBox=new vn),this.boundingBox.makeEmpty();let t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,aa),this.boundingBox.expandByPoint(aa)}computeBoundingSphere(){let e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new jn),this.boundingSphere.makeEmpty();let t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,aa),this.boundingSphere.expandByPoint(aa)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,t){let n=this.material,s=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Ac.copy(this.boundingSphere),Ac.applyMatrix4(s),e.ray.intersectsSphere(Ac)!==!1&&(Cu.copy(s).invert(),Rc.copy(e.ray).applyMatrix4(Cu),!(this.boundingBox!==null&&Rc.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(e,t,Rc)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){let e=new ht,t=this.geometry.attributes.skinWeight;for(let n=0,s=t.count;n<s;n++){e.fromBufferAttribute(t,n);let r=1/e.manhattanLength();r!==1/0?e.multiplyScalar(r):e.set(1,0,0,0),t.setXYZW(n,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===Nc?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===md?this.bindMatrixInverse.copy(this.bindMatrix).invert():console.warn("THREE.SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){let n=this.skeleton,s=this.geometry;Tu.fromBufferAttribute(s.attributes.skinIndex,e),Au.fromBufferAttribute(s.attributes.skinWeight,e),wu.copy(t).applyMatrix4(this.bindMatrix),t.set(0,0,0);for(let r=0;r<4;r++){let o=Au.getComponent(r);if(o!==0){let a=Tu.getComponent(r);Ru.multiplyMatrices(n.bones[a].matrixWorld,n.boneInverses[a]),t.addScaledVector(Cp.copy(wu).applyMatrix4(Ru),o)}}return t.applyMatrix4(this.bindMatrixInverse)}},js=class extends Xt{constructor(){super(),this.isBone=!0,this.type="Bone"}},Kr=class extends hn{constructor(e=null,t=1,n=1,s,r,o,a,l,c=cn,h=cn,u,d){super(null,o,a,l,c,h,s,r,u,d),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},Iu=new nt,Ip=new nt,jr=class i{constructor(e=[],t=[]){this.uuid=vi(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){let e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){console.warn("THREE.Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,s=this.bones.length;n<s;n++)this.boneInverses.push(new nt)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){let n=new nt;this.bones[e]&&n.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){let n=this.bones[e];n&&n.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){let n=this.bones[e];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){let e=this.bones,t=this.boneInverses,n=this.boneMatrices,s=this.boneTexture;for(let r=0,o=e.length;r<o;r++){let a=e[r]?e[r].matrixWorld:Ip;Iu.multiplyMatrices(a,t[r]),Iu.toArray(n,r*16)}s!==null&&(s.needsUpdate=!0)}clone(){return new i(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);let t=new Float32Array(e*e*4);t.set(this.boneMatrices);let n=new Kr(t,e,e,Sn,Pn);return n.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=n,this}getBoneByName(e){for(let t=0,n=this.bones.length;t<n;t++){let s=this.bones[t];if(s.name===e)return s}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let n=0,s=e.bones.length;n<s;n++){let r=e.bones[n],o=t[r];o===void 0&&(console.warn("THREE.Skeleton: No bone found with UUID:",r),o=new js),this.bones.push(o),this.boneInverses.push(new nt().fromArray(e.boneInverses[n]))}return this.init(),this}toJSON(){let e={metadata:{version:4.7,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;let t=this.bones,n=this.boneInverses;for(let s=0,r=t.length;s<r;s++){let o=t[s];e.bones.push(o.uuid);let a=n[s];e.boneInverses.push(a.toArray())}return e}},Qr=class extends ln{constructor(e,t,n,s=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){let e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}},Ws=new nt,Pu=new nt,la=[],Du=new vn,Pp=new nt,Rr=new Lt,Cr=new jn,eo=class extends Lt{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new Qr(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<n;s++)this.setMatrixAt(s,Pp)}computeBoundingBox(){let e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new vn),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Ws),Du.copy(e.boundingBox).applyMatrix4(Ws),this.boundingBox.union(Du)}computeBoundingSphere(){let e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new jn),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Ws),Cr.copy(e.boundingSphere).applyMatrix4(Ws),this.boundingSphere.union(Cr)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){let n=t.morphTargetInfluences,s=this.morphTexture.source.data.data,r=n.length+1,o=e*r+1;for(let a=0;a<n.length;a++)n[a]=s[o+a]}raycast(e,t){let n=this.matrixWorld,s=this.count;if(Rr.geometry=this.geometry,Rr.material=this.material,Rr.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Cr.copy(this.boundingSphere),Cr.applyMatrix4(n),e.ray.intersectsSphere(Cr)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,Ws),Pu.multiplyMatrices(n,Ws),Rr.matrixWorld=Pu,Rr.raycast(e,la);for(let o=0,a=la.length;o<a;o++){let l=la[o];l.instanceId=r,l.object=this,t.push(l)}la.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new Qr(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}setMorphAt(e,t){let n=t.morphTargetInfluences,s=n.length+1;this.morphTexture===null&&(this.morphTexture=new Kr(new Float32Array(s*this.count),s,this.count,nl,Pn));let r=this.morphTexture.source.data.data,o=0;for(let c=0;c<n.length;c++)o+=n[c];let a=this.geometry.morphTargetsRelative?1:1-o,l=s*e;r[l]=a,r.set(n,l+1)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}},Cc=new C,Dp=new C,Lp=new Ze,Zn=class{constructor(e=new C(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,s){return this.normal.set(e,t,n),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let s=Cc.subVectors(n,t).cross(Dp.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){let n=e.delta(Cc),s=this.normal.dot(n);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let r=-(e.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:t.copy(e.start).addScaledVector(n,r)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||Lp.getNormalMatrix(e),s=this.coplanarPoint(Cc).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}},is=new jn,Up=new ye(.5,.5),ca=new C,Qs=class{constructor(e=new Zn,t=new Zn,n=new Zn,s=new Zn,r=new Zn,o=new Zn){this.planes=[e,t,n,s,r,o]}set(e,t,n,s,r,o){let a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(n),a[3].copy(s),a[4].copy(r),a[5].copy(o),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=zn,n=!1){let s=this.planes,r=e.elements,o=r[0],a=r[1],l=r[2],c=r[3],h=r[4],u=r[5],d=r[6],f=r[7],g=r[8],v=r[9],m=r[10],p=r[11],E=r[12],y=r[13],_=r[14],R=r[15];if(s[0].setComponents(c-o,f-h,p-g,R-E).normalize(),s[1].setComponents(c+o,f+h,p+g,R+E).normalize(),s[2].setComponents(c+a,f+u,p+v,R+y).normalize(),s[3].setComponents(c-a,f-u,p-v,R-y).normalize(),n)s[4].setComponents(l,d,m,_).normalize(),s[5].setComponents(c-l,f-d,p-m,R-_).normalize();else if(s[4].setComponents(c-l,f-d,p-m,R-_).normalize(),t===zn)s[5].setComponents(c+l,f+d,p+m,R+_).normalize();else if(t===zr)s[5].setComponents(l,d,m,_).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),is.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),is.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(is)}intersectsSprite(e){is.center.set(0,0,0);let t=Up.distanceTo(e.center);return is.radius=.7071067811865476+t,is.applyMatrix4(e.matrixWorld),this.intersectsSphere(is)}intersectsSphere(e){let t=this.planes,n=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let s=t[n];if(ca.x=s.normal.x>0?e.max.x:e.min.x,ca.y=s.normal.y>0?e.max.y:e.min.y,ca.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(ca)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};var to=class extends hn{constructor(e,t,n=ki,s,r,o,a=cn,l=cn,c,h=qs,u=1){if(h!==qs&&h!==ar)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let d={width:e,height:t,depth:u};super(d,s,r,o,a,l,h,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Js(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}},no=class extends hn{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}};var In=class i extends Kt{constructor(e=1,t=1,n=1,s=32,r=1,o=!1,a=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:s,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:l};let c=this;s=Math.floor(s),r=Math.floor(r);let h=[],u=[],d=[],f=[],g=0,v=[],m=n/2,p=0;E(),o===!1&&(e>0&&y(!0),t>0&&y(!1)),this.setIndex(h),this.setAttribute("position",new ut(u,3)),this.setAttribute("normal",new ut(d,3)),this.setAttribute("uv",new ut(f,2));function E(){let _=new C,R=new C,A=0,I=(t-e)/n;for(let L=0;L<=r;L++){let b=[],M=L/r,D=M*(t-e)+e;for(let z=0;z<=s;z++){let G=z/s,q=G*l+a,Z=Math.sin(q),Y=Math.cos(q);R.x=D*Z,R.y=-M*n+m,R.z=D*Y,u.push(R.x,R.y,R.z),_.set(Z,I,Y).normalize(),d.push(_.x,_.y,_.z),f.push(G,1-M),b.push(g++)}v.push(b)}for(let L=0;L<s;L++)for(let b=0;b<r;b++){let M=v[b][L],D=v[b+1][L],z=v[b+1][L+1],G=v[b][L+1];(e>0||b!==0)&&(h.push(M,D,G),A+=3),(t>0||b!==r-1)&&(h.push(D,z,G),A+=3)}c.addGroup(p,A,0),p+=A}function y(_){let R=g,A=new ye,I=new C,L=0,b=_===!0?e:t,M=_===!0?1:-1;for(let z=1;z<=s;z++)u.push(0,m*M,0),d.push(0,M,0),f.push(.5,.5),g++;let D=g;for(let z=0;z<=s;z++){let q=z/s*l+a,Z=Math.cos(q),Y=Math.sin(q);I.x=b*Y,I.y=m*M,I.z=b*Z,u.push(I.x,I.y,I.z),d.push(0,M,0),A.x=Z*.5+.5,A.y=Y*.5*M+.5,f.push(A.x,A.y),g++}for(let z=0;z<s;z++){let G=R+z,q=D+z;_===!0?h.push(q,q+1,G):h.push(q+1,q,G),L+=3}c.addGroup(p,L,_===!0?1:2),p+=L}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}},ds=class i extends In{constructor(e=1,t=1,n=32,s=1,r=!1,o=0,a=Math.PI*2){super(0,e,t,n,s,r,o,a),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:n,heightSegments:s,openEnded:r,thetaStart:o,thetaLength:a}}static fromJSON(e){return new i(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}},io=class i extends Kt{constructor(e=[],t=[],n=1,s=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:n,detail:s};let r=[],o=[];a(s),c(n),h(),this.setAttribute("position",new ut(r,3)),this.setAttribute("normal",new ut(r.slice(),3)),this.setAttribute("uv",new ut(o,2)),s===0?this.computeVertexNormals():this.normalizeNormals();function a(E){let y=new C,_=new C,R=new C;for(let A=0;A<t.length;A+=3)f(t[A+0],y),f(t[A+1],_),f(t[A+2],R),l(y,_,R,E)}function l(E,y,_,R){let A=R+1,I=[];for(let L=0;L<=A;L++){I[L]=[];let b=E.clone().lerp(_,L/A),M=y.clone().lerp(_,L/A),D=A-L;for(let z=0;z<=D;z++)z===0&&L===A?I[L][z]=b:I[L][z]=b.clone().lerp(M,z/D)}for(let L=0;L<A;L++)for(let b=0;b<2*(A-L)-1;b++){let M=Math.floor(b/2);b%2===0?(d(I[L][M+1]),d(I[L+1][M]),d(I[L][M])):(d(I[L][M+1]),d(I[L+1][M+1]),d(I[L+1][M]))}}function c(E){let y=new C;for(let _=0;_<r.length;_+=3)y.x=r[_+0],y.y=r[_+1],y.z=r[_+2],y.normalize().multiplyScalar(E),r[_+0]=y.x,r[_+1]=y.y,r[_+2]=y.z}function h(){let E=new C;for(let y=0;y<r.length;y+=3){E.x=r[y+0],E.y=r[y+1],E.z=r[y+2];let _=m(E)/2/Math.PI+.5,R=p(E)/Math.PI+.5;o.push(_,1-R)}g(),u()}function u(){for(let E=0;E<o.length;E+=6){let y=o[E+0],_=o[E+2],R=o[E+4],A=Math.max(y,_,R),I=Math.min(y,_,R);A>.9&&I<.1&&(y<.2&&(o[E+0]+=1),_<.2&&(o[E+2]+=1),R<.2&&(o[E+4]+=1))}}function d(E){r.push(E.x,E.y,E.z)}function f(E,y){let _=E*3;y.x=e[_+0],y.y=e[_+1],y.z=e[_+2]}function g(){let E=new C,y=new C,_=new C,R=new C,A=new ye,I=new ye,L=new ye;for(let b=0,M=0;b<r.length;b+=9,M+=6){E.set(r[b+0],r[b+1],r[b+2]),y.set(r[b+3],r[b+4],r[b+5]),_.set(r[b+6],r[b+7],r[b+8]),A.set(o[M+0],o[M+1]),I.set(o[M+2],o[M+3]),L.set(o[M+4],o[M+5]),R.copy(E).add(y).add(_).divideScalar(3);let D=m(R);v(A,M+0,E,D),v(I,M+2,y,D),v(L,M+4,_,D)}}function v(E,y,_,R){R<0&&E.x===1&&(o[y]=E.x-1),_.x===0&&_.z===0&&(o[y]=R/2/Math.PI+.5)}function m(E){return Math.atan2(E.z,-E.x)}function p(E){return Math.atan2(-E.y,Math.sqrt(E.x*E.x+E.z*E.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.vertices,e.indices,e.radius,e.details)}};var Mn=class{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){console.warn("THREE.Curve: .getPoint() not implemented.")}getPointAt(e,t){let n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){let e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let t=[],n,s=this.getPoint(0),r=0;t.push(0);for(let o=1;o<=e;o++)n=this.getPoint(o/e),r+=n.distanceTo(s),t.push(r),s=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){let n=this.getLengths(),s=0,r=n.length,o;t?o=t:o=e*n[r-1];let a=0,l=r-1,c;for(;a<=l;)if(s=Math.floor(a+(l-a)/2),c=n[s]-o,c<0)a=s+1;else if(c>0)l=s-1;else{l=s;break}if(s=l,n[s]===o)return s/(r-1);let h=n[s],d=n[s+1]-h,f=(o-h)/d;return(s+f)/(r-1)}getTangent(e,t){let s=e-1e-4,r=e+1e-4;s<0&&(s=0),r>1&&(r=1);let o=this.getPoint(s),a=this.getPoint(r),l=t||(o.isVector2?new ye:new C);return l.copy(a).sub(o).normalize(),l}getTangentAt(e,t){let n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t=!1){let n=new C,s=[],r=[],o=[],a=new C,l=new nt;for(let f=0;f<=e;f++){let g=f/e;s[f]=this.getTangentAt(g,new C)}r[0]=new C,o[0]=new C;let c=Number.MAX_VALUE,h=Math.abs(s[0].x),u=Math.abs(s[0].y),d=Math.abs(s[0].z);h<=c&&(c=h,n.set(1,0,0)),u<=c&&(c=u,n.set(0,1,0)),d<=c&&n.set(0,0,1),a.crossVectors(s[0],n).normalize(),r[0].crossVectors(s[0],a),o[0].crossVectors(s[0],r[0]);for(let f=1;f<=e;f++){if(r[f]=r[f-1].clone(),o[f]=o[f-1].clone(),a.crossVectors(s[f-1],s[f]),a.length()>Number.EPSILON){a.normalize();let g=Math.acos(tt(s[f-1].dot(s[f]),-1,1));r[f].applyMatrix4(l.makeRotationAxis(a,g))}o[f].crossVectors(s[f],r[f])}if(t===!0){let f=Math.acos(tt(r[0].dot(r[e]),-1,1));f/=e,s[0].dot(a.crossVectors(r[0],r[e]))>0&&(f=-f);for(let g=1;g<=e;g++)r[g].applyMatrix4(l.makeRotationAxis(s[g],f*g)),o[g].crossVectors(s[g],r[g])}return{tangents:s,normals:r,binormals:o}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){let e={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}},er=class extends Mn{constructor(e=0,t=0,n=1,s=1,r=0,o=Math.PI*2,a=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=o,this.aClockwise=a,this.aRotation=l}getPoint(e,t=new ye){let n=t,s=Math.PI*2,r=this.aEndAngle-this.aStartAngle,o=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(o?r=0:r=s),this.aClockwise===!0&&!o&&(r===s?r=-s:r=r-s);let a=this.aStartAngle+e*r,l=this.aX+this.xRadius*Math.cos(a),c=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){let h=Math.cos(this.aRotation),u=Math.sin(this.aRotation),d=l-this.aX,f=c-this.aY;l=d*h-f*u+this.aX,c=d*u+f*h+this.aY}return n.set(l,c)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){let e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}},wa=class extends er{constructor(e,t,n,s,r,o){super(e,t,n,n,s,r,o),this.isArcCurve=!0,this.type="ArcCurve"}};function uh(){let i=0,e=0,t=0,n=0;function s(r,o,a,l){i=r,e=a,t=-3*r+3*o-2*a-l,n=2*r-2*o+a+l}return{initCatmullRom:function(r,o,a,l,c){s(o,a,c*(a-r),c*(l-o))},initNonuniformCatmullRom:function(r,o,a,l,c,h,u){let d=(o-r)/c-(a-r)/(c+h)+(a-o)/h,f=(a-o)/h-(l-o)/(h+u)+(l-a)/u;d*=h,f*=h,s(o,a,d,f)},calc:function(r){let o=r*r,a=o*r;return i+e*r+t*o+n*a}}}var ha=new C,Ic=new uh,Pc=new uh,Dc=new uh,tr=class extends Mn{constructor(e=[],t=!1,n="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=n,this.tension=s}getPoint(e,t=new C){let n=t,s=this.points,r=s.length,o=(r-(this.closed?0:1))*e,a=Math.floor(o),l=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/r)+1)*r:l===0&&a===r-1&&(a=r-2,l=1);let c,h;this.closed||a>0?c=s[(a-1)%r]:(ha.subVectors(s[0],s[1]).add(s[0]),c=ha);let u=s[a%r],d=s[(a+1)%r];if(this.closed||a+2<r?h=s[(a+2)%r]:(ha.subVectors(s[r-1],s[r-2]).add(s[r-1]),h=ha),this.curveType==="centripetal"||this.curveType==="chordal"){let f=this.curveType==="chordal"?.5:.25,g=Math.pow(c.distanceToSquared(u),f),v=Math.pow(u.distanceToSquared(d),f),m=Math.pow(d.distanceToSquared(h),f);v<1e-4&&(v=1),g<1e-4&&(g=v),m<1e-4&&(m=v),Ic.initNonuniformCatmullRom(c.x,u.x,d.x,h.x,g,v,m),Pc.initNonuniformCatmullRom(c.y,u.y,d.y,h.y,g,v,m),Dc.initNonuniformCatmullRom(c.z,u.z,d.z,h.z,g,v,m)}else this.curveType==="catmullrom"&&(Ic.initCatmullRom(c.x,u.x,d.x,h.x,this.tension),Pc.initCatmullRom(c.y,u.y,d.y,h.y,this.tension),Dc.initCatmullRom(c.z,u.z,d.z,h.z,this.tension));return n.set(Ic.calc(l),Pc.calc(l),Dc.calc(l)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let s=e.points[t];this.points.push(s.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let s=this.points[t];e.points.push(s.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let s=e.points[t];this.points.push(new C().fromArray(s))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}};function Lu(i,e,t,n,s){let r=(n-e)*.5,o=(s-t)*.5,a=i*i,l=i*a;return(2*t-2*n+r+o)*l+(-3*t+3*n-2*r-o)*a+r*i+t}function Np(i,e){let t=1-i;return t*t*e}function Fp(i,e){return 2*(1-i)*i*e}function Op(i,e){return i*i*e}function Ur(i,e,t,n){return Np(i,e)+Fp(i,t)+Op(i,n)}function Bp(i,e){let t=1-i;return t*t*t*e}function zp(i,e){let t=1-i;return 3*t*t*i*e}function kp(i,e){return 3*(1-i)*i*i*e}function Hp(i,e){return i*i*i*e}function Nr(i,e,t,n,s){return Bp(i,e)+zp(i,t)+kp(i,n)+Hp(i,s)}var so=class extends Mn{constructor(e=new ye,t=new ye,n=new ye,s=new ye){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=n,this.v3=s}getPoint(e,t=new ye){let n=t,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(Nr(e,s.x,r.x,o.x,a.x),Nr(e,s.y,r.y,o.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},Ta=class extends Mn{constructor(e=new C,t=new C,n=new C,s=new C){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=n,this.v3=s}getPoint(e,t=new C){let n=t,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(Nr(e,s.x,r.x,o.x,a.x),Nr(e,s.y,r.y,o.y,a.y),Nr(e,s.z,r.z,o.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},ro=class extends Mn{constructor(e=new ye,t=new ye){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new ye){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new ye){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Aa=class extends Mn{constructor(e=new C,t=new C){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new C){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new C){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},oo=class extends Mn{constructor(e=new ye,t=new ye,n=new ye){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new ye){let n=t,s=this.v0,r=this.v1,o=this.v2;return n.set(Ur(e,s.x,r.x,o.x),Ur(e,s.y,r.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},ao=class extends Mn{constructor(e=new C,t=new C,n=new C){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new C){let n=t,s=this.v0,r=this.v1,o=this.v2;return n.set(Ur(e,s.x,r.x,o.x),Ur(e,s.y,r.y,o.y),Ur(e,s.z,r.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},lo=class extends Mn{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new ye){let n=t,s=this.points,r=(s.length-1)*e,o=Math.floor(r),a=r-o,l=s[o===0?o:o-1],c=s[o],h=s[o>s.length-2?s.length-1:o+1],u=s[o>s.length-3?s.length-1:o+2];return n.set(Lu(a,l.x,c.x,h.x,u.x),Lu(a,l.y,c.y,h.y,u.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let s=e.points[t];this.points.push(s.clone())}return this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let s=this.points[t];e.points.push(s.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let s=e.points[t];this.points.push(new ye().fromArray(s))}return this}},Ra=Object.freeze({__proto__:null,ArcCurve:wa,CatmullRomCurve3:tr,CubicBezierCurve:so,CubicBezierCurve3:Ta,EllipseCurve:er,LineCurve:ro,LineCurve3:Aa,QuadraticBezierCurve:oo,QuadraticBezierCurve3:ao,SplineCurve:lo}),Ca=class extends Mn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){let e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){let n=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new Ra[n](t,e))}return this}getPoint(e,t){let n=e*this.getLength(),s=this.getCurveLengths(),r=0;for(;r<s.length;){if(s[r]>=n){let o=s[r]-n,a=this.curves[r],l=a.getLength(),c=l===0?0:1-o/l;return a.getPointAt(c,t)}r++}return null}getLength(){let e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let e=[],t=0;for(let n=0,s=this.curves.length;n<s;n++)t+=this.curves[n].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){let t=[],n;for(let s=0,r=this.curves;s<r.length;s++){let o=r[s],a=o.isEllipseCurve?e*2:o.isLineCurve||o.isLineCurve3?1:o.isSplineCurve?e*o.points.length:e,l=o.getPoints(a);for(let c=0;c<l.length;c++){let h=l[c];n&&n.equals(h)||(t.push(h),n=h)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let s=e.curves[t];this.curves.push(s.clone())}return this.autoClose=e.autoClose,this}toJSON(){let e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,n=this.curves.length;t<n;t++){let s=this.curves[t];e.curves.push(s.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let s=e.curves[t];this.curves.push(new Ra[s.type]().fromJSON(s))}return this}},co=class extends Ca{constructor(e){super(),this.type="Path",this.currentPoint=new ye,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,n=e.length;t<n;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){let n=new ro(this.currentPoint.clone(),new ye(e,t));return this.curves.push(n),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,n,s){let r=new oo(this.currentPoint.clone(),new ye(e,t),new ye(n,s));return this.curves.push(r),this.currentPoint.set(n,s),this}bezierCurveTo(e,t,n,s,r,o){let a=new so(this.currentPoint.clone(),new ye(e,t),new ye(n,s),new ye(r,o));return this.curves.push(a),this.currentPoint.set(r,o),this}splineThru(e){let t=[this.currentPoint.clone()].concat(e),n=new lo(t);return this.curves.push(n),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,n,s,r,o){let a=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(e+a,t+l,n,s,r,o),this}absarc(e,t,n,s,r,o){return this.absellipse(e,t,n,n,s,r,o),this}ellipse(e,t,n,s,r,o,a,l){let c=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(e+c,t+h,n,s,r,o,a,l),this}absellipse(e,t,n,s,r,o,a,l){let c=new er(e,t,n,s,r,o,a,l);if(this.curves.length>0){let u=c.getPoint(0);u.equals(this.currentPoint)||this.lineTo(u.x,u.y)}this.curves.push(c);let h=c.getPoint(1);return this.currentPoint.copy(h),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){let e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}},Oi=class extends co{constructor(e){super(e),this.uuid=vi(),this.type="Shape",this.holes=[]}getPointsHoles(e){let t=[];for(let n=0,s=this.holes.length;n<s;n++)t[n]=this.holes[n].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){let s=e.holes[t];this.holes.push(s.clone())}return this}toJSON(){let e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,n=this.holes.length;t<n;t++){let s=this.holes[t];e.holes.push(s.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){let s=e.holes[t];this.holes.push(new co().fromJSON(s))}return this}};function Vp(i,e,t=2){let n=e&&e.length,s=n?e[0]*t:i.length,r=Nd(i,0,s,t,!0),o=[];if(!r||r.next===r.prev)return o;let a,l,c;if(n&&(r=qp(i,e,r,t)),i.length>80*t){a=1/0,l=1/0;let h=-1/0,u=-1/0;for(let d=t;d<s;d+=t){let f=i[d],g=i[d+1];f<a&&(a=f),g<l&&(l=g),f>h&&(h=f),g>u&&(u=g)}c=Math.max(h-a,u-l),c=c!==0?32767/c:0}return ho(r,o,t,a,l,c,0),o}function Nd(i,e,t,n,s){let r;if(s===sm(i,e,t,n)>0)for(let o=e;o<t;o+=n)r=Uu(o/n|0,i[o],i[o+1],r);else for(let o=t-n;o>=e;o-=n)r=Uu(o/n|0,i[o],i[o+1],r);return r&&nr(r,r.next)&&(fo(r),r=r.next),r}function fs(i,e){if(!i)return i;e||(e=i);let t=i,n;do if(n=!1,!t.steiner&&(nr(t,t.next)||Et(t.prev,t,t.next)===0)){if(fo(t),t=e=t.prev,t===t.next)break;n=!0}else t=t.next;while(n||t!==e);return e}function ho(i,e,t,n,s,r,o){if(!i)return;!o&&r&&jp(i,n,s,r);let a=i;for(;i.prev!==i.next;){let l=i.prev,c=i.next;if(r?Wp(i,n,s,r):Gp(i)){e.push(l.i,i.i,c.i),fo(i),i=c.next,a=c.next;continue}if(i=c,i===a){o?o===1?(i=Xp(fs(i),e),ho(i,e,t,n,s,r,2)):o===2&&$p(i,e,t,n,s,r):ho(fs(i),e,t,n,s,r,1);break}}}function Gp(i){let e=i.prev,t=i,n=i.next;if(Et(e,t,n)>=0)return!1;let s=e.x,r=t.x,o=n.x,a=e.y,l=t.y,c=n.y,h=Math.min(s,r,o),u=Math.min(a,l,c),d=Math.max(s,r,o),f=Math.max(a,l,c),g=n.next;for(;g!==e;){if(g.x>=h&&g.x<=d&&g.y>=u&&g.y<=f&&Pr(s,a,r,l,o,c,g.x,g.y)&&Et(g.prev,g,g.next)>=0)return!1;g=g.next}return!0}function Wp(i,e,t,n){let s=i.prev,r=i,o=i.next;if(Et(s,r,o)>=0)return!1;let a=s.x,l=r.x,c=o.x,h=s.y,u=r.y,d=o.y,f=Math.min(a,l,c),g=Math.min(h,u,d),v=Math.max(a,l,c),m=Math.max(h,u,d),p=Bc(f,g,e,t,n),E=Bc(v,m,e,t,n),y=i.prevZ,_=i.nextZ;for(;y&&y.z>=p&&_&&_.z<=E;){if(y.x>=f&&y.x<=v&&y.y>=g&&y.y<=m&&y!==s&&y!==o&&Pr(a,h,l,u,c,d,y.x,y.y)&&Et(y.prev,y,y.next)>=0||(y=y.prevZ,_.x>=f&&_.x<=v&&_.y>=g&&_.y<=m&&_!==s&&_!==o&&Pr(a,h,l,u,c,d,_.x,_.y)&&Et(_.prev,_,_.next)>=0))return!1;_=_.nextZ}for(;y&&y.z>=p;){if(y.x>=f&&y.x<=v&&y.y>=g&&y.y<=m&&y!==s&&y!==o&&Pr(a,h,l,u,c,d,y.x,y.y)&&Et(y.prev,y,y.next)>=0)return!1;y=y.prevZ}for(;_&&_.z<=E;){if(_.x>=f&&_.x<=v&&_.y>=g&&_.y<=m&&_!==s&&_!==o&&Pr(a,h,l,u,c,d,_.x,_.y)&&Et(_.prev,_,_.next)>=0)return!1;_=_.nextZ}return!0}function Xp(i,e){let t=i;do{let n=t.prev,s=t.next.next;!nr(n,s)&&Od(n,t,t.next,s)&&uo(n,s)&&uo(s,n)&&(e.push(n.i,t.i,s.i),fo(t),fo(t.next),t=i=s),t=t.next}while(t!==i);return fs(t)}function $p(i,e,t,n,s,r){let o=i;do{let a=o.next.next;for(;a!==o.prev;){if(o.i!==a.i&&tm(o,a)){let l=Bd(o,a);o=fs(o,o.next),l=fs(l,l.next),ho(o,e,t,n,s,r,0),ho(l,e,t,n,s,r,0);return}a=a.next}o=o.next}while(o!==i)}function qp(i,e,t,n){let s=[];for(let r=0,o=e.length;r<o;r++){let a=e[r]*n,l=r<o-1?e[r+1]*n:i.length,c=Nd(i,a,l,n,!1);c===c.next&&(c.steiner=!0),s.push(em(c))}s.sort(Yp);for(let r=0;r<s.length;r++)t=Zp(s[r],t);return t}function Yp(i,e){let t=i.x-e.x;if(t===0&&(t=i.y-e.y,t===0)){let n=(i.next.y-i.y)/(i.next.x-i.x),s=(e.next.y-e.y)/(e.next.x-e.x);t=n-s}return t}function Zp(i,e){let t=Jp(i,e);if(!t)return e;let n=Bd(t,i);return fs(n,n.next),fs(t,t.next)}function Jp(i,e){let t=e,n=i.x,s=i.y,r=-1/0,o;if(nr(i,t))return t;do{if(nr(i,t.next))return t.next;if(s<=t.y&&s>=t.next.y&&t.next.y!==t.y){let u=t.x+(s-t.y)*(t.next.x-t.x)/(t.next.y-t.y);if(u<=n&&u>r&&(r=u,o=t.x<t.next.x?t:t.next,u===n))return o}t=t.next}while(t!==e);if(!o)return null;let a=o,l=o.x,c=o.y,h=1/0;t=o;do{if(n>=t.x&&t.x>=l&&n!==t.x&&Fd(s<c?n:r,s,l,c,s<c?r:n,s,t.x,t.y)){let u=Math.abs(s-t.y)/(n-t.x);uo(t,i)&&(u<h||u===h&&(t.x>o.x||t.x===o.x&&Kp(o,t)))&&(o=t,h=u)}t=t.next}while(t!==a);return o}function Kp(i,e){return Et(i.prev,i,e.prev)<0&&Et(e.next,i,i.next)<0}function jp(i,e,t,n){let s=i;do s.z===0&&(s.z=Bc(s.x,s.y,e,t,n)),s.prevZ=s.prev,s.nextZ=s.next,s=s.next;while(s!==i);s.prevZ.nextZ=null,s.prevZ=null,Qp(s)}function Qp(i){let e,t=1;do{let n=i,s;i=null;let r=null;for(e=0;n;){e++;let o=n,a=0;for(let c=0;c<t&&(a++,o=o.nextZ,!!o);c++);let l=t;for(;a>0||l>0&&o;)a!==0&&(l===0||!o||n.z<=o.z)?(s=n,n=n.nextZ,a--):(s=o,o=o.nextZ,l--),r?r.nextZ=s:i=s,s.prevZ=r,r=s;n=o}r.nextZ=null,t*=2}while(e>1);return i}function Bc(i,e,t,n,s){return i=(i-t)*s|0,e=(e-n)*s|0,i=(i|i<<8)&16711935,i=(i|i<<4)&252645135,i=(i|i<<2)&858993459,i=(i|i<<1)&1431655765,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,i|e<<1}function em(i){let e=i,t=i;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==i);return t}function Fd(i,e,t,n,s,r,o,a){return(s-o)*(e-a)>=(i-o)*(r-a)&&(i-o)*(n-a)>=(t-o)*(e-a)&&(t-o)*(r-a)>=(s-o)*(n-a)}function Pr(i,e,t,n,s,r,o,a){return!(i===o&&e===a)&&Fd(i,e,t,n,s,r,o,a)}function tm(i,e){return i.next.i!==e.i&&i.prev.i!==e.i&&!nm(i,e)&&(uo(i,e)&&uo(e,i)&&im(i,e)&&(Et(i.prev,i,e.prev)||Et(i,e.prev,e))||nr(i,e)&&Et(i.prev,i,i.next)>0&&Et(e.prev,e,e.next)>0)}function Et(i,e,t){return(e.y-i.y)*(t.x-e.x)-(e.x-i.x)*(t.y-e.y)}function nr(i,e){return i.x===e.x&&i.y===e.y}function Od(i,e,t,n){let s=da(Et(i,e,t)),r=da(Et(i,e,n)),o=da(Et(t,n,i)),a=da(Et(t,n,e));return!!(s!==r&&o!==a||s===0&&ua(i,t,e)||r===0&&ua(i,n,e)||o===0&&ua(t,i,n)||a===0&&ua(t,e,n))}function ua(i,e,t){return e.x<=Math.max(i.x,t.x)&&e.x>=Math.min(i.x,t.x)&&e.y<=Math.max(i.y,t.y)&&e.y>=Math.min(i.y,t.y)}function da(i){return i>0?1:i<0?-1:0}function nm(i,e){let t=i;do{if(t.i!==i.i&&t.next.i!==i.i&&t.i!==e.i&&t.next.i!==e.i&&Od(t,t.next,i,e))return!0;t=t.next}while(t!==i);return!1}function uo(i,e){return Et(i.prev,i,i.next)<0?Et(i,e,i.next)>=0&&Et(i,i.prev,e)>=0:Et(i,e,i.prev)<0||Et(i,i.next,e)<0}function im(i,e){let t=i,n=!1,s=(i.x+e.x)/2,r=(i.y+e.y)/2;do t.y>r!=t.next.y>r&&t.next.y!==t.y&&s<(t.next.x-t.x)*(r-t.y)/(t.next.y-t.y)+t.x&&(n=!n),t=t.next;while(t!==i);return n}function Bd(i,e){let t=zc(i.i,i.x,i.y),n=zc(e.i,e.x,e.y),s=i.next,r=e.prev;return i.next=e,e.prev=i,t.next=s,s.prev=t,n.next=t,t.prev=n,r.next=n,n.prev=r,n}function Uu(i,e,t,n){let s=zc(i,e,t);return n?(s.next=n.next,s.prev=n,n.next.prev=s,n.next=s):(s.prev=s,s.next=s),s}function fo(i){i.next.prev=i.prev,i.prev.next=i.next,i.prevZ&&(i.prevZ.nextZ=i.nextZ),i.nextZ&&(i.nextZ.prevZ=i.prevZ)}function zc(i,e,t){return{i,x:e,y:t,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function sm(i,e,t,n){let s=0;for(let r=e,o=t-n;r<t;r+=n)s+=(i[o]-i[r])*(i[r+1]+i[o+1]),o=r;return s}var kc=class{static triangulate(e,t,n=2){return Vp(e,t,n)}},as=class i{static area(e){let t=e.length,n=0;for(let s=t-1,r=0;r<t;s=r++)n+=e[s].x*e[r].y-e[r].x*e[s].y;return n*.5}static isClockWise(e){return i.area(e)<0}static triangulateShape(e,t){let n=[],s=[],r=[];Nu(e),Fu(n,e);let o=e.length;t.forEach(Nu);for(let l=0;l<t.length;l++)s.push(o),o+=t[l].length,Fu(n,t[l]);let a=kc.triangulate(n,s);for(let l=0;l<a.length;l+=3)r.push(a.slice(l,l+3));return r}};function Nu(i){let e=i.length;e>2&&i[e-1].equals(i[0])&&i.pop()}function Fu(i,e){for(let t=0;t<e.length;t++)i.push(e[t].x),i.push(e[t].y)}var ps=class i extends Kt{constructor(e=new Oi([new ye(.5,.5),new ye(-.5,.5),new ye(-.5,-.5),new ye(.5,-.5)]),t={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:e,options:t},e=Array.isArray(e)?e:[e];let n=this,s=[],r=[];for(let a=0,l=e.length;a<l;a++){let c=e[a];o(c)}this.setAttribute("position",new ut(s,3)),this.setAttribute("uv",new ut(r,2)),this.computeVertexNormals();function o(a){let l=[],c=t.curveSegments!==void 0?t.curveSegments:12,h=t.steps!==void 0?t.steps:1,u=t.depth!==void 0?t.depth:1,d=t.bevelEnabled!==void 0?t.bevelEnabled:!0,f=t.bevelThickness!==void 0?t.bevelThickness:.2,g=t.bevelSize!==void 0?t.bevelSize:f-.1,v=t.bevelOffset!==void 0?t.bevelOffset:0,m=t.bevelSegments!==void 0?t.bevelSegments:3,p=t.extrudePath,E=t.UVGenerator!==void 0?t.UVGenerator:rm,y,_=!1,R,A,I,L;p&&(y=p.getSpacedPoints(h),_=!0,d=!1,R=p.computeFrenetFrames(h,!1),A=new C,I=new C,L=new C),d||(m=0,f=0,g=0,v=0);let b=a.extractPoints(c),M=b.shape,D=b.holes;if(!as.isClockWise(M)){M=M.reverse();for(let le=0,ne=D.length;le<ne;le++){let ee=D[le];as.isClockWise(ee)&&(D[le]=ee.reverse())}}function G(le){let ee=10000000000000001e-36,j=le[0];for(let me=1;me<=le.length;me++){let ce=me%le.length,fe=le[ce],Xe=fe.x-j.x,$e=fe.y-j.y,w=Xe*Xe+$e*$e,x=Math.max(Math.abs(fe.x),Math.abs(fe.y),Math.abs(j.x),Math.abs(j.y)),O=ee*x*x;if(w<=O){le.splice(ce,1),me--;continue}j=fe}}G(M),D.forEach(G);let q=D.length,Z=M;for(let le=0;le<q;le++){let ne=D[le];M=M.concat(ne)}function Y(le,ne,ee){return ne||console.error("THREE.ExtrudeGeometry: vec does not exist"),le.clone().addScaledVector(ne,ee)}let he=M.length;function W(le,ne,ee){let j,me,ce,fe=le.x-ne.x,Xe=le.y-ne.y,$e=ee.x-le.x,w=ee.y-le.y,x=fe*fe+Xe*Xe,O=fe*w-Xe*$e;if(Math.abs(O)>Number.EPSILON){let X=Math.sqrt(x),te=Math.sqrt($e*$e+w*w),$=ne.x-Xe/X,De=ne.y+fe/X,ge=ee.x-w/te,Ie=ee.y+$e/te,Le=((ge-$)*w-(Ie-De)*$e)/(fe*w-Xe*$e);j=$+fe*Le-le.x,me=De+Xe*Le-le.y;let de=j*j+me*me;if(de<=2)return new ye(j,me);ce=Math.sqrt(de/2)}else{let X=!1;fe>Number.EPSILON?$e>Number.EPSILON&&(X=!0):fe<-Number.EPSILON?$e<-Number.EPSILON&&(X=!0):Math.sign(Xe)===Math.sign(w)&&(X=!0),X?(j=-Xe,me=fe,ce=Math.sqrt(x)):(j=fe,me=Xe,ce=Math.sqrt(x/2))}return new ye(j/ce,me/ce)}let ve=[];for(let le=0,ne=Z.length,ee=ne-1,j=le+1;le<ne;le++,ee++,j++)ee===ne&&(ee=0),j===ne&&(j=0),ve[le]=W(Z[le],Z[ee],Z[j]);let Me=[],Ae,He=ve.concat();for(let le=0,ne=q;le<ne;le++){let ee=D[le];Ae=[];for(let j=0,me=ee.length,ce=me-1,fe=j+1;j<me;j++,ce++,fe++)ce===me&&(ce=0),fe===me&&(fe=0),Ae[j]=W(ee[j],ee[ce],ee[fe]);Me.push(Ae),He=He.concat(Ae)}let et;if(m===0)et=as.triangulateShape(Z,D);else{let le=[],ne=[];for(let ee=0;ee<m;ee++){let j=ee/m,me=f*Math.cos(j*Math.PI/2),ce=g*Math.sin(j*Math.PI/2)+v;for(let fe=0,Xe=Z.length;fe<Xe;fe++){let $e=Y(Z[fe],ve[fe],ce);Oe($e.x,$e.y,-me),j===0&&le.push($e)}for(let fe=0,Xe=q;fe<Xe;fe++){let $e=D[fe];Ae=Me[fe];let w=[];for(let x=0,O=$e.length;x<O;x++){let X=Y($e[x],Ae[x],ce);Oe(X.x,X.y,-me),j===0&&w.push(X)}j===0&&ne.push(w)}}et=as.triangulateShape(le,ne)}let at=et.length,it=g+v;for(let le=0;le<he;le++){let ne=d?Y(M[le],He[le],it):M[le];_?(I.copy(R.normals[0]).multiplyScalar(ne.x),A.copy(R.binormals[0]).multiplyScalar(ne.y),L.copy(y[0]).add(I).add(A),Oe(L.x,L.y,L.z)):Oe(ne.x,ne.y,0)}for(let le=1;le<=h;le++)for(let ne=0;ne<he;ne++){let ee=d?Y(M[ne],He[ne],it):M[ne];_?(I.copy(R.normals[le]).multiplyScalar(ee.x),A.copy(R.binormals[le]).multiplyScalar(ee.y),L.copy(y[le]).add(I).add(A),Oe(L.x,L.y,L.z)):Oe(ee.x,ee.y,u/h*le)}for(let le=m-1;le>=0;le--){let ne=le/m,ee=f*Math.cos(ne*Math.PI/2),j=g*Math.sin(ne*Math.PI/2)+v;for(let me=0,ce=Z.length;me<ce;me++){let fe=Y(Z[me],ve[me],j);Oe(fe.x,fe.y,u+ee)}for(let me=0,ce=D.length;me<ce;me++){let fe=D[me];Ae=Me[me];for(let Xe=0,$e=fe.length;Xe<$e;Xe++){let w=Y(fe[Xe],Ae[Xe],j);_?Oe(w.x,w.y+y[h-1].y,y[h-1].x+ee):Oe(w.x,w.y,u+ee)}}}J(),ae();function J(){let le=s.length/3;if(d){let ne=0,ee=he*ne;for(let j=0;j<at;j++){let me=et[j];Pe(me[2]+ee,me[1]+ee,me[0]+ee)}ne=h+m*2,ee=he*ne;for(let j=0;j<at;j++){let me=et[j];Pe(me[0]+ee,me[1]+ee,me[2]+ee)}}else{for(let ne=0;ne<at;ne++){let ee=et[ne];Pe(ee[2],ee[1],ee[0])}for(let ne=0;ne<at;ne++){let ee=et[ne];Pe(ee[0]+he*h,ee[1]+he*h,ee[2]+he*h)}}n.addGroup(le,s.length/3-le,0)}function ae(){let le=s.length/3,ne=0;Re(Z,ne),ne+=Z.length;for(let ee=0,j=D.length;ee<j;ee++){let me=D[ee];Re(me,ne),ne+=me.length}n.addGroup(le,s.length/3-le,1)}function Re(le,ne){let ee=le.length;for(;--ee>=0;){let j=ee,me=ee-1;me<0&&(me=le.length-1);for(let ce=0,fe=h+m*2;ce<fe;ce++){let Xe=he*ce,$e=he*(ce+1),w=ne+j+Xe,x=ne+me+Xe,O=ne+me+$e,X=ne+j+$e;Qe(w,x,O,X)}}}function Oe(le,ne,ee){l.push(le),l.push(ne),l.push(ee)}function Pe(le,ne,ee){gt(le),gt(ne),gt(ee);let j=s.length/3,me=E.generateTopUV(n,s,j-3,j-2,j-1);P(me[0]),P(me[1]),P(me[2])}function Qe(le,ne,ee,j){gt(le),gt(ne),gt(j),gt(ne),gt(ee),gt(j);let me=s.length/3,ce=E.generateSideWallUV(n,s,me-6,me-3,me-2,me-1);P(ce[0]),P(ce[1]),P(ce[3]),P(ce[1]),P(ce[2]),P(ce[3])}function gt(le){s.push(l[le*3+0]),s.push(l[le*3+1]),s.push(l[le*3+2])}function P(le){r.push(le.x),r.push(le.y)}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON(),t=this.parameters.shapes,n=this.parameters.options;return om(t,n,e)}static fromJSON(e,t){let n=[];for(let r=0,o=e.shapes.length;r<o;r++){let a=t[e.shapes[r]];n.push(a)}let s=e.options.extrudePath;return s!==void 0&&(e.options.extrudePath=new Ra[s.type]().fromJSON(s)),new i(n,e.options)}},rm={generateTopUV:function(i,e,t,n,s){let r=e[t*3],o=e[t*3+1],a=e[n*3],l=e[n*3+1],c=e[s*3],h=e[s*3+1];return[new ye(r,o),new ye(a,l),new ye(c,h)]},generateSideWallUV:function(i,e,t,n,s,r){let o=e[t*3],a=e[t*3+1],l=e[t*3+2],c=e[n*3],h=e[n*3+1],u=e[n*3+2],d=e[s*3],f=e[s*3+1],g=e[s*3+2],v=e[r*3],m=e[r*3+1],p=e[r*3+2];return Math.abs(a-h)<Math.abs(o-c)?[new ye(o,1-l),new ye(c,1-u),new ye(d,1-g),new ye(v,1-p)]:[new ye(a,1-l),new ye(h,1-u),new ye(f,1-g),new ye(m,1-p)]}};function om(i,e,t){if(t.shapes=[],Array.isArray(i))for(let n=0,s=i.length;n<s;n++){let r=i[n];t.shapes.push(r.uuid)}else t.shapes.push(i.uuid);return t.options=Object.assign({},e),e.extrudePath!==void 0&&(t.options.extrudePath=e.extrudePath.toJSON()),t}var Qn=class i extends io{constructor(e=1,t=0){let n=(1+Math.sqrt(5))/2,s=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],r=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(s,r,e,t),this.type="IcosahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new i(e.radius,e.detail)}};var po=class i extends io{constructor(e=1,t=0){let n=[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],s=[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2];super(n,s,e,t),this.type="OctahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new i(e.radius,e.detail)}},Bi=class i extends Kt{constructor(e=1,t=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:s};let r=e/2,o=t/2,a=Math.floor(n),l=Math.floor(s),c=a+1,h=l+1,u=e/a,d=t/l,f=[],g=[],v=[],m=[];for(let p=0;p<h;p++){let E=p*d-o;for(let y=0;y<c;y++){let _=y*u-r;g.push(_,-E,0),v.push(0,0,1),m.push(y/a),m.push(1-p/l)}}for(let p=0;p<l;p++)for(let E=0;E<a;E++){let y=E+c*p,_=E+c*(p+1),R=E+1+c*(p+1),A=E+1+c*p;f.push(y,_,A),f.push(_,R,A)}this.setIndex(f),this.setAttribute("position",new ut(g,3)),this.setAttribute("normal",new ut(v,3)),this.setAttribute("uv",new ut(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.width,e.height,e.widthSegments,e.heightSegments)}};var Gn=class i extends Kt{constructor(e=1,t=.4,n=12,s=48,r=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:s,arc:r},n=Math.floor(n),s=Math.floor(s);let o=[],a=[],l=[],c=[],h=new C,u=new C,d=new C;for(let f=0;f<=n;f++)for(let g=0;g<=s;g++){let v=g/s*r,m=f/n*Math.PI*2;u.x=(e+t*Math.cos(m))*Math.cos(v),u.y=(e+t*Math.cos(m))*Math.sin(v),u.z=t*Math.sin(m),a.push(u.x,u.y,u.z),h.x=e*Math.cos(v),h.y=e*Math.sin(v),d.subVectors(u,h).normalize(),l.push(d.x,d.y,d.z),c.push(g/s),c.push(f/n)}for(let f=1;f<=n;f++)for(let g=1;g<=s;g++){let v=(s+1)*f+g-1,m=(s+1)*(f-1)+g-1,p=(s+1)*(f-1)+g,E=(s+1)*f+g;o.push(v,m,E),o.push(m,p,E)}this.setIndex(o),this.setAttribute("position",new ut(a,3)),this.setAttribute("normal",new ut(l,3)),this.setAttribute("uv",new ut(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}};var mo=class i extends Kt{constructor(e=new ao(new C(-1,-1,0),new C(-1,1,0),new C(1,1,0)),t=64,n=1,s=8,r=!1){super(),this.type="TubeGeometry",this.parameters={path:e,tubularSegments:t,radius:n,radialSegments:s,closed:r};let o=e.computeFrenetFrames(t,r);this.tangents=o.tangents,this.normals=o.normals,this.binormals=o.binormals;let a=new C,l=new C,c=new ye,h=new C,u=[],d=[],f=[],g=[];v(),this.setIndex(g),this.setAttribute("position",new ut(u,3)),this.setAttribute("normal",new ut(d,3)),this.setAttribute("uv",new ut(f,2));function v(){for(let y=0;y<t;y++)m(y);m(r===!1?t:0),E(),p()}function m(y){h=e.getPointAt(y/t,h);let _=o.normals[y],R=o.binormals[y];for(let A=0;A<=s;A++){let I=A/s*Math.PI*2,L=Math.sin(I),b=-Math.cos(I);l.x=b*_.x+L*R.x,l.y=b*_.y+L*R.y,l.z=b*_.z+L*R.z,l.normalize(),d.push(l.x,l.y,l.z),a.x=h.x+n*l.x,a.y=h.y+n*l.y,a.z=h.z+n*l.z,u.push(a.x,a.y,a.z)}}function p(){for(let y=1;y<=t;y++)for(let _=1;_<=s;_++){let R=(s+1)*(y-1)+(_-1),A=(s+1)*y+(_-1),I=(s+1)*y+_,L=(s+1)*(y-1)+_;g.push(R,A,L),g.push(A,I,L)}}function E(){for(let y=0;y<=t;y++)for(let _=0;_<=s;_++)c.x=y/t,c.y=_/s,f.push(c.x,c.y)}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON();return e.path=this.parameters.path.toJSON(),e}static fromJSON(e){return new i(new Ra[e.path.type]().fromJSON(e.path),e.tubularSegments,e.radius,e.radialSegments,e.closed)}};var go=class extends Fi{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Ke(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ke(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=sh,this.normalScale=new ye(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Hn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}};var Ia=class extends Fi{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Md,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},Pa=class extends Fi{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}};function fa(i,e){return!i||i.constructor===e?i:typeof e.BYTES_PER_ELEMENT=="number"?new e(i):Array.prototype.slice.call(i)}function am(i){return ArrayBuffer.isView(i)&&!(i instanceof DataView)}function lm(i){function e(s,r){return i[s]-i[r]}let t=i.length,n=new Array(t);for(let s=0;s!==t;++s)n[s]=s;return n.sort(e),n}function Ou(i,e,t){let n=i.length,s=new i.constructor(n);for(let r=0,o=0;o!==n;++r){let a=t[r]*e;for(let l=0;l!==e;++l)s[o++]=i[a+l]}return s}function zd(i,e,t,n){let s=1,r=i[0];for(;r!==void 0&&r[n]===void 0;)r=i[s++];if(r===void 0)return;let o=r[n];if(o!==void 0)if(Array.isArray(o))do o=r[n],o!==void 0&&(e.push(r.time),t.push(...o)),r=i[s++];while(r!==void 0);else if(o.toArray!==void 0)do o=r[n],o!==void 0&&(e.push(r.time),o.toArray(t,t.length)),r=i[s++];while(r!==void 0);else do o=r[n],o!==void 0&&(e.push(r.time),t.push(o)),r=i[s++];while(r!==void 0)}var ms=class{constructor(e,t,n,s){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,s=t[n],r=t[n-1];e:{t:{let o;n:{i:if(!(e<s)){for(let a=n+2;;){if(s===void 0){if(e<r)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(r=s,s=t[++n],e<s)break t}o=t.length;break n}if(!(e>=r)){let a=t[1];e<a&&(n=2,r=a);for(let l=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===l)break;if(s=r,r=t[--n-1],e>=r)break t}o=n,n=0;break n}break e}for(;n<o;){let a=n+o>>>1;e<t[a]?o=a:n=a+1}if(s=t[n],r=t[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,s)}return this.interpolate_(n,r,e,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=e*s;for(let o=0;o!==s;++o)t[o]=n[r+o];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}},Da=class extends ms{constructor(e,t,n,s){super(e,t,n,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:rs,endingEnd:rs}}intervalChanged_(e,t,n){let s=this.parameterPositions,r=e-2,o=e+1,a=s[r],l=s[o];if(a===void 0)switch(this.getSettings_().endingStart){case os:r=e,a=2*t-n;break;case Or:r=s.length-2,a=t+s[r]-s[r+1];break;default:r=e,a=n}if(l===void 0)switch(this.getSettings_().endingEnd){case os:o=e,l=2*n-t;break;case Or:o=1,l=n+s[1]-s[0];break;default:o=e-1,l=t}let c=(n-t)*.5,h=this.valueSize;this._weightPrev=c/(t-a),this._weightNext=c/(l-n),this._offsetPrev=r*h,this._offsetNext=o*h}interpolate_(e,t,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=e*a,c=l-a,h=this._offsetPrev,u=this._offsetNext,d=this._weightPrev,f=this._weightNext,g=(n-t)/(s-t),v=g*g,m=v*g,p=-d*m+2*d*v-d*g,E=(1+d)*m+(-1.5-2*d)*v+(-.5+d)*g+1,y=(-1-f)*m+(1.5+f)*v+.5*g,_=f*m-f*v;for(let R=0;R!==a;++R)r[R]=p*o[h+R]+E*o[c+R]+y*o[l+R]+_*o[u+R];return r}},xo=class extends ms{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e,t,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=e*a,c=l-a,h=(n-t)/(s-t),u=1-h;for(let d=0;d!==a;++d)r[d]=o[c+d]*u+o[l+d]*h;return r}},La=class extends ms{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e){return this.copySampleValue_(e-1)}},un=class{constructor(e,t,n,s){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=fa(t,this.TimeBufferType),this.values=fa(n,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:fa(e.times,Array),values:fa(e.values,Array)};let s=e.getInterpolation();s!==e.DefaultInterpolation&&(n.interpolation=s)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new La(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new xo(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new Da(this.times,this.values,this.getValueSize(),e)}setInterpolation(e){let t;switch(e){case Fr:t=this.InterpolantFactoryMethodDiscrete;break;case va:t=this.InterpolantFactoryMethodLinear;break;case pa:t=this.InterpolantFactoryMethodSmooth;break}if(t===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Fr;case this.InterpolantFactoryMethodLinear:return va;case this.InterpolantFactoryMethodSmooth:return pa}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,s=t.length;n!==s;++n)t[n]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,s=t.length;n!==s;++n)t[n]*=e}return this}trim(e,t){let n=this.times,s=n.length,r=0,o=s-1;for(;r!==s&&n[r]<e;)++r;for(;o!==-1&&n[o]>t;)--o;if(++o,r!==0||o!==s){r>=o&&(o=Math.max(o,1),r=o-1);let a=this.getValueSize();this.times=n.slice(r,o),this.values=this.values.slice(r*a,o*a)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),e=!1);let n=this.times,s=this.values,r=n.length;r===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),e=!1);let o=null;for(let a=0;a!==r;a++){let l=n[a];if(typeof l=="number"&&isNaN(l)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,a,l),e=!1;break}if(o!==null&&o>l){console.error("THREE.KeyframeTrack: Out of order keys.",this,a,l,o),e=!1;break}o=l}if(s!==void 0&&am(s))for(let a=0,l=s.length;a!==l;++a){let c=s[a];if(isNaN(c)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,a,c),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),s=this.getInterpolation()===pa,r=e.length-1,o=1;for(let a=1;a<r;++a){let l=!1,c=e[a],h=e[a+1];if(c!==h&&(a!==1||c!==e[0]))if(s)l=!0;else{let u=a*n,d=u-n,f=u+n;for(let g=0;g!==n;++g){let v=t[u+g];if(v!==t[d+g]||v!==t[f+g]){l=!0;break}}}if(l){if(a!==o){e[o]=e[a];let u=a*n,d=o*n;for(let f=0;f!==n;++f)t[d+f]=t[u+f]}++o}}if(r>0){e[o]=e[r];for(let a=r*n,l=o*n,c=0;c!==n;++c)t[l+c]=t[a+c];++o}return o!==e.length?(this.times=e.slice(0,o),this.values=t.slice(0,o*n)):(this.times=e,this.values=t),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=this.constructor,s=new n(this.name,e,t);return s.createInterpolant=this.createInterpolant,s}};un.prototype.ValueTypeName="";un.prototype.TimeBufferType=Float32Array;un.prototype.ValueBufferType=Float32Array;un.prototype.DefaultInterpolation=va;var di=class extends un{constructor(e,t,n){super(e,t,n)}};di.prototype.ValueTypeName="bool";di.prototype.ValueBufferType=Array;di.prototype.DefaultInterpolation=Fr;di.prototype.InterpolantFactoryMethodLinear=void 0;di.prototype.InterpolantFactoryMethodSmooth=void 0;var _o=class extends un{constructor(e,t,n,s){super(e,t,n,s)}};_o.prototype.ValueTypeName="color";var gs=class extends un{constructor(e,t,n,s){super(e,t,n,s)}};gs.prototype.ValueTypeName="number";var Ua=class extends ms{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e,t,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=(n-t)/(s-t),c=e*a;for(let h=c+a;c!==h;c+=4)Jt.slerpFlat(r,0,o,c-a,o,c,l);return r}},fi=class extends un{constructor(e,t,n,s){super(e,t,n,s)}InterpolantFactoryMethodLinear(e){return new Ua(this.times,this.values,this.getValueSize(),e)}};fi.prototype.ValueTypeName="quaternion";fi.prototype.InterpolantFactoryMethodSmooth=void 0;var pi=class extends un{constructor(e,t,n){super(e,t,n)}};pi.prototype.ValueTypeName="string";pi.prototype.ValueBufferType=Array;pi.prototype.DefaultInterpolation=Fr;pi.prototype.InterpolantFactoryMethodLinear=void 0;pi.prototype.InterpolantFactoryMethodSmooth=void 0;var xs=class extends un{constructor(e,t,n,s){super(e,t,n,s)}};xs.prototype.ValueTypeName="vector";var mi=class{constructor(e="",t=-1,n=[],s=Ul){this.name=e,this.tracks=n,this.duration=t,this.blendMode=s,this.uuid=vi(),this.userData={},this.duration<0&&this.resetDuration()}static parse(e){let t=[],n=e.tracks,s=1/(e.fps||1);for(let o=0,a=n.length;o!==a;++o)t.push(hm(n[o]).scale(s));let r=new this(e.name,e.duration,t,e.blendMode);return r.uuid=e.uuid,r.userData=JSON.parse(e.userData||"{}"),r}static toJSON(e){let t=[],n=e.tracks,s={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode,userData:JSON.stringify(e.userData)};for(let r=0,o=n.length;r!==o;++r)t.push(un.toJSON(n[r]));return s}static CreateFromMorphTargetSequence(e,t,n,s){let r=t.length,o=[];for(let a=0;a<r;a++){let l=[],c=[];l.push((a+r-1)%r,a,(a+1)%r),c.push(0,1,0);let h=lm(l);l=Ou(l,1,h),c=Ou(c,1,h),!s&&l[0]===0&&(l.push(r),c.push(c[0])),o.push(new gs(".morphTargetInfluences["+t[a].name+"]",l,c).scale(1/n))}return new this(e,-1,o)}static findByName(e,t){let n=e;if(!Array.isArray(e)){let s=e;n=s.geometry&&s.geometry.animations||s.animations}for(let s=0;s<n.length;s++)if(n[s].name===t)return n[s];return null}static CreateClipsFromMorphTargetSequences(e,t,n){let s={},r=/^([\w-]*?)([\d]+)$/;for(let a=0,l=e.length;a<l;a++){let c=e[a],h=c.name.match(r);if(h&&h.length>1){let u=h[1],d=s[u];d||(s[u]=d=[]),d.push(c)}}let o=[];for(let a in s)o.push(this.CreateFromMorphTargetSequence(a,s[a],t,n));return o}static parseAnimation(e,t){if(console.warn("THREE.AnimationClip: parseAnimation() is deprecated and will be removed with r185"),!e)return console.error("THREE.AnimationClip: No animation in JSONLoader data."),null;let n=function(u,d,f,g,v){if(f.length!==0){let m=[],p=[];zd(f,m,p,g),m.length!==0&&v.push(new u(d,m,p))}},s=[],r=e.name||"default",o=e.fps||30,a=e.blendMode,l=e.length||-1,c=e.hierarchy||[];for(let u=0;u<c.length;u++){let d=c[u].keys;if(!(!d||d.length===0))if(d[0].morphTargets){let f={},g;for(g=0;g<d.length;g++)if(d[g].morphTargets)for(let v=0;v<d[g].morphTargets.length;v++)f[d[g].morphTargets[v]]=-1;for(let v in f){let m=[],p=[];for(let E=0;E!==d[g].morphTargets.length;++E){let y=d[g];m.push(y.time),p.push(y.morphTarget===v?1:0)}s.push(new gs(".morphTargetInfluence["+v+"]",m,p))}l=f.length*o}else{let f=".bones["+t[u].name+"]";n(xs,f+".position",d,"pos",s),n(fi,f+".quaternion",d,"rot",s),n(xs,f+".scale",d,"scl",s)}}return s.length===0?null:new this(r,l,s,a)}resetDuration(){let e=this.tracks,t=0;for(let n=0,s=e.length;n!==s;++n){let r=this.tracks[n];t=Math.max(t,r.times[r.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){let e=[];for(let n=0;n<this.tracks.length;n++)e.push(this.tracks[n].clone());let t=new this.constructor(this.name,this.duration,e,this.blendMode);return t.userData=JSON.parse(JSON.stringify(this.userData)),t}toJSON(){return this.constructor.toJSON(this)}};function cm(i){switch(i.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return gs;case"vector":case"vector2":case"vector3":case"vector4":return xs;case"color":return _o;case"quaternion":return fi;case"bool":case"boolean":return di;case"string":return pi}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+i)}function hm(i){if(i.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");let e=cm(i.type);if(i.times===void 0){let t=[],n=[];zd(i.keys,t,n,"value"),i.times=t,i.values=n}return e.parse!==void 0?e.parse(i):new e(i.name,i.times,i.values,i.interpolation)}var Na=class{constructor(e,t,n){let s=this,r=!1,o=0,a=0,l,c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this.abortController=new AbortController,this.itemStart=function(h){a++,r===!1&&s.onStart!==void 0&&s.onStart(h,o,a),r=!0},this.itemEnd=function(h){o++,s.onProgress!==void 0&&s.onProgress(h,o,a),o===a&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(h){s.onError!==void 0&&s.onError(h)},this.resolveURL=function(h){return l?l(h):h},this.setURLModifier=function(h){return l=h,this},this.addHandler=function(h,u){return c.push(h,u),this},this.removeHandler=function(h){let u=c.indexOf(h);return u!==-1&&c.splice(u,2),this},this.getHandler=function(h){for(let u=0,d=c.length;u<d;u+=2){let f=c[u],g=c[u+1];if(f.global&&(f.lastIndex=0),f.test(h))return g}return null},this.abort=function(){return this.abortController.abort(),this.abortController=new AbortController,this}}},kd=new Na,Fa=class{constructor(e){this.manager=e!==void 0?e:kd,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){let n=this;return new Promise(function(s,r){n.load(e,s,t,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}};Fa.DEFAULT_MATERIAL_NAME="__DEFAULT";var ir=class extends Xt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Ke(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}},vo=class extends ir{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Xt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Ke(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}},Lc=new nt,Bu=new C,zu=new C,Oa=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new ye(512,512),this.mapType=Wn,this.map=null,this.mapPass=null,this.matrix=new nt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Qs,this._frameExtents=new ye(1,1),this._viewportCount=1,this._viewports=[new ht(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera,n=this.matrix;Bu.setFromMatrixPosition(e.matrixWorld),t.position.copy(Bu),zu.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(zu),t.updateMatrixWorld(),Lc.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Lc,t.coordinateSystem,t.reversedDepth),t.reversedDepth?n.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Lc)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}};var ku=new nt,Ir=new C,Uc=new C,Hc=class extends Oa{constructor(){super(new Wt(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new ye(4,2),this._viewportCount=6,this._viewports=[new ht(2,1,1,1),new ht(0,1,1,1),new ht(3,1,1,1),new ht(1,1,1,1),new ht(3,0,1,1),new ht(1,0,1,1)],this._cubeDirections=[new C(1,0,0),new C(-1,0,0),new C(0,0,1),new C(0,0,-1),new C(0,1,0),new C(0,-1,0)],this._cubeUps=[new C(0,1,0),new C(0,1,0),new C(0,1,0),new C(0,1,0),new C(0,0,1),new C(0,0,-1)]}updateMatrices(e,t=0){let n=this.camera,s=this.matrix,r=e.distance||n.far;r!==n.far&&(n.far=r,n.updateProjectionMatrix()),Ir.setFromMatrixPosition(e.matrixWorld),n.position.copy(Ir),Uc.copy(n.position),Uc.add(this._cubeDirections[t]),n.up.copy(this._cubeUps[t]),n.lookAt(Uc),n.updateMatrixWorld(),s.makeTranslation(-Ir.x,-Ir.y,-Ir.z),ku.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(ku,n.coordinateSystem,n.reversedDepth)}},yo=class extends ir{constructor(e,t,n=0,s=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=s,this.shadow=new Hc}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}},Mo=class extends $r{constructor(e=-1,t=1,n=1,s=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=s,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,s,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2,r=n-e,o=n+e,a=s+t,l=s-t;if(this.view!==null&&this.view.enabled){let c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,o=r+c*this.view.width,a-=h*this.view.offsetY,l=a-h*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},Vc=class extends Oa{constructor(){super(new Mo(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},bo=class extends ir{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Xt.DEFAULT_UP),this.updateMatrix(),this.target=new Xt,this.shadow=new Vc}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}};var Ba=class extends Wt{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}};var za=class{constructor(e,t,n){this.binding=e,this.valueSize=n;let s,r,o;switch(t){case"quaternion":s=this._slerp,r=this._slerpAdditive,o=this._setAdditiveIdentityQuaternion,this.buffer=new Float64Array(n*6),this._workIndex=5;break;case"string":case"bool":s=this._select,r=this._select,o=this._setAdditiveIdentityOther,this.buffer=new Array(n*5);break;default:s=this._lerp,r=this._lerpAdditive,o=this._setAdditiveIdentityNumeric,this.buffer=new Float64Array(n*5)}this._mixBufferRegion=s,this._mixBufferRegionAdditive=r,this._setIdentity=o,this._origIndex=3,this._addIndex=4,this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,this.useCount=0,this.referenceCount=0}accumulate(e,t){let n=this.buffer,s=this.valueSize,r=e*s+s,o=this.cumulativeWeight;if(o===0){for(let a=0;a!==s;++a)n[r+a]=n[a];o=t}else{o+=t;let a=t/o;this._mixBufferRegion(n,r,0,a,s)}this.cumulativeWeight=o}accumulateAdditive(e){let t=this.buffer,n=this.valueSize,s=n*this._addIndex;this.cumulativeWeightAdditive===0&&this._setIdentity(),this._mixBufferRegionAdditive(t,s,0,e,n),this.cumulativeWeightAdditive+=e}apply(e){let t=this.valueSize,n=this.buffer,s=e*t+t,r=this.cumulativeWeight,o=this.cumulativeWeightAdditive,a=this.binding;if(this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,r<1){let l=t*this._origIndex;this._mixBufferRegion(n,s,l,1-r,t)}o>0&&this._mixBufferRegionAdditive(n,s,this._addIndex*t,1,t);for(let l=t,c=t+t;l!==c;++l)if(n[l]!==n[l+t]){a.setValue(n,s);break}}saveOriginalState(){let e=this.binding,t=this.buffer,n=this.valueSize,s=n*this._origIndex;e.getValue(t,s);for(let r=n,o=s;r!==o;++r)t[r]=t[s+r%n];this._setIdentity(),this.cumulativeWeight=0,this.cumulativeWeightAdditive=0}restoreOriginalState(){let e=this.valueSize*3;this.binding.setValue(this.buffer,e)}_setAdditiveIdentityNumeric(){let e=this._addIndex*this.valueSize,t=e+this.valueSize;for(let n=e;n<t;n++)this.buffer[n]=0}_setAdditiveIdentityQuaternion(){this._setAdditiveIdentityNumeric(),this.buffer[this._addIndex*this.valueSize+3]=1}_setAdditiveIdentityOther(){let e=this._origIndex*this.valueSize,t=this._addIndex*this.valueSize;for(let n=0;n<this.valueSize;n++)this.buffer[t+n]=this.buffer[e+n]}_select(e,t,n,s,r){if(s>=.5)for(let o=0;o!==r;++o)e[t+o]=e[n+o]}_slerp(e,t,n,s){Jt.slerpFlat(e,t,e,t,e,n,s)}_slerpAdditive(e,t,n,s,r){let o=this._workIndex*r;Jt.multiplyQuaternionsFlat(e,o,e,t,e,n),Jt.slerpFlat(e,t,e,t,e,o,s)}_lerp(e,t,n,s,r){let o=1-s;for(let a=0;a!==r;++a){let l=t+a;e[l]=e[l]*o+e[n+a]*s}}_lerpAdditive(e,t,n,s,r){for(let o=0;o!==r;++o){let a=t+o;e[a]=e[a]+e[n+o]*s}}},dh="\\[\\]\\.:\\/",um=new RegExp("["+dh+"]","g"),fh="[^"+dh+"]",dm="[^"+dh.replace("\\.","")+"]",fm=/((?:WC+[\/:])*)/.source.replace("WC",fh),pm=/(WCOD+)?/.source.replace("WCOD",dm),mm=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",fh),gm=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",fh),xm=new RegExp("^"+fm+pm+mm+gm+"$"),_m=["material","materials","bones","map"],Gc=class{constructor(e,t,n){let s=n||vt.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,s)}getValue(e,t){this.bind();let n=this._targetGroup.nCachedObjects_,s=this._bindings[n];s!==void 0&&s.getValue(e,t)}setValue(e,t){let n=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=n.length;s!==r;++s)n[s].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}},vt=class i{constructor(e,t,n){this.path=t,this.parsedPath=n||i.parseTrackName(t),this.node=i.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new i.Composite(e,t,n):new i(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(um,"")}static parseTrackName(e){let t=xm.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},s=n.nodeName&&n.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){let r=n.nodeName.substring(s+1);_m.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,s),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(r){for(let o=0;o<r.length;o++){let a=r[o];if(a.name===t||a.uuid===t)return a;let l=n(a.children);if(l)return l}return null},s=n(e.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)e[t++]=n[s]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node,t=this.parsedPath,n=t.objectName,s=t.propertyName,r=t.propertyIndex;if(e||(e=i.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let c=t.objectIndex;switch(n){case"materials":if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let h=0;h<e.length;h++)if(e[h].name===c){c=h;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(c!==void 0){if(e[c]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[c]}}let o=e[s];if(o===void 0){let c=t.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+c+"."+s+" but it wasn't found.",e);return}let a=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?a=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!e.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[r]!==void 0&&(r=e.morphTargetDictionary[r])}l=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=r}else o.fromArray!==void 0&&o.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(l=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=s;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};vt.Composite=Gc;vt.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};vt.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};vt.prototype.GetterByBindingType=[vt.prototype._getValue_direct,vt.prototype._getValue_array,vt.prototype._getValue_arrayElement,vt.prototype._getValue_toArray];vt.prototype.SetterByBindingTypeAndVersioning=[[vt.prototype._setValue_direct,vt.prototype._setValue_direct_setNeedsUpdate,vt.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[vt.prototype._setValue_array,vt.prototype._setValue_array_setNeedsUpdate,vt.prototype._setValue_array_setMatrixWorldNeedsUpdate],[vt.prototype._setValue_arrayElement,vt.prototype._setValue_arrayElement_setNeedsUpdate,vt.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[vt.prototype._setValue_fromArray,vt.prototype._setValue_fromArray_setNeedsUpdate,vt.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var ka=class{constructor(e,t,n=null,s=t.blendMode){this._mixer=e,this._clip=t,this._localRoot=n,this.blendMode=s;let r=t.tracks,o=r.length,a=new Array(o),l={endingStart:rs,endingEnd:rs};for(let c=0;c!==o;++c){let h=r[c].createInterpolant(null);a[c]=h,h.settings=l}this._interpolantSettings=l,this._interpolants=a,this._propertyBindings=new Array(o),this._cacheIndex=null,this._byClipCacheIndex=null,this._timeScaleInterpolant=null,this._weightInterpolant=null,this.loop=_d,this._loopCount=-1,this._startTime=null,this.time=0,this.timeScale=1,this._effectiveTimeScale=1,this.weight=1,this._effectiveWeight=1,this.repetitions=1/0,this.paused=!1,this.enabled=!0,this.clampWhenFinished=!1,this.zeroSlopeAtStart=!0,this.zeroSlopeAtEnd=!0}play(){return this._mixer._activateAction(this),this}stop(){return this._mixer._deactivateAction(this),this.reset()}reset(){return this.paused=!1,this.enabled=!0,this.time=0,this._loopCount=-1,this._startTime=null,this.stopFading().stopWarping()}isRunning(){return this.enabled&&!this.paused&&this.timeScale!==0&&this._startTime===null&&this._mixer._isActiveAction(this)}isScheduled(){return this._mixer._isActiveAction(this)}startAt(e){return this._startTime=e,this}setLoop(e,t){return this.loop=e,this.repetitions=t,this}setEffectiveWeight(e){return this.weight=e,this._effectiveWeight=this.enabled?e:0,this.stopFading()}getEffectiveWeight(){return this._effectiveWeight}fadeIn(e){return this._scheduleFading(e,0,1)}fadeOut(e){return this._scheduleFading(e,1,0)}crossFadeFrom(e,t,n=!1){if(e.fadeOut(t),this.fadeIn(t),n===!0){let s=this._clip.duration,r=e._clip.duration,o=r/s,a=s/r;e.warp(1,o,t),this.warp(a,1,t)}return this}crossFadeTo(e,t,n=!1){return e.crossFadeFrom(this,t,n)}stopFading(){let e=this._weightInterpolant;return e!==null&&(this._weightInterpolant=null,this._mixer._takeBackControlInterpolant(e)),this}setEffectiveTimeScale(e){return this.timeScale=e,this._effectiveTimeScale=this.paused?0:e,this.stopWarping()}getEffectiveTimeScale(){return this._effectiveTimeScale}setDuration(e){return this.timeScale=this._clip.duration/e,this.stopWarping()}syncWith(e){return this.time=e.time,this.timeScale=e.timeScale,this.stopWarping()}halt(e){return this.warp(this._effectiveTimeScale,0,e)}warp(e,t,n){let s=this._mixer,r=s.time,o=this.timeScale,a=this._timeScaleInterpolant;a===null&&(a=s._lendControlInterpolant(),this._timeScaleInterpolant=a);let l=a.parameterPositions,c=a.sampleValues;return l[0]=r,l[1]=r+n,c[0]=e/o,c[1]=t/o,this}stopWarping(){let e=this._timeScaleInterpolant;return e!==null&&(this._timeScaleInterpolant=null,this._mixer._takeBackControlInterpolant(e)),this}getMixer(){return this._mixer}getClip(){return this._clip}getRoot(){return this._localRoot||this._mixer._root}_update(e,t,n,s){if(!this.enabled){this._updateWeight(e);return}let r=this._startTime;if(r!==null){let l=(e-r)*n;l<0||n===0?t=0:(this._startTime=null,t=n*l)}t*=this._updateTimeScale(e);let o=this._updateTime(t),a=this._updateWeight(e);if(a>0){let l=this._interpolants,c=this._propertyBindings;switch(this.blendMode){case yd:for(let h=0,u=l.length;h!==u;++h)l[h].evaluate(o),c[h].accumulateAdditive(a);break;case Ul:default:for(let h=0,u=l.length;h!==u;++h)l[h].evaluate(o),c[h].accumulate(s,a)}}}_updateWeight(e){let t=0;if(this.enabled){t=this.weight;let n=this._weightInterpolant;if(n!==null){let s=n.evaluate(e)[0];t*=s,e>n.parameterPositions[1]&&(this.stopFading(),s===0&&(this.enabled=!1))}}return this._effectiveWeight=t,t}_updateTimeScale(e){let t=0;if(!this.paused){t=this.timeScale;let n=this._timeScaleInterpolant;if(n!==null){let s=n.evaluate(e)[0];t*=s,e>n.parameterPositions[1]&&(this.stopWarping(),t===0?this.paused=!0:this.timeScale=t)}}return this._effectiveTimeScale=t,t}_updateTime(e){let t=this._clip.duration,n=this.loop,s=this.time+e,r=this._loopCount,o=n===vd;if(e===0)return r===-1?s:o&&(r&1)===1?t-s:s;if(n===xd){r===-1&&(this._loopCount=0,this._setEndings(!0,!0,!1));e:{if(s>=t)s=t;else if(s<0)s=0;else{this.time=s;break e}this.clampWhenFinished?this.paused=!0:this.enabled=!1,this.time=s,this._mixer.dispatchEvent({type:"finished",action:this,direction:e<0?-1:1})}}else{if(r===-1&&(e>=0?(r=0,this._setEndings(!0,this.repetitions===0,o)):this._setEndings(this.repetitions===0,!0,o)),s>=t||s<0){let a=Math.floor(s/t);s-=t*a,r+=Math.abs(a);let l=this.repetitions-r;if(l<=0)this.clampWhenFinished?this.paused=!0:this.enabled=!1,s=e>0?t:0,this.time=s,this._mixer.dispatchEvent({type:"finished",action:this,direction:e>0?1:-1});else{if(l===1){let c=e<0;this._setEndings(c,!c,o)}else this._setEndings(!1,!1,o);this._loopCount=r,this.time=s,this._mixer.dispatchEvent({type:"loop",action:this,loopDelta:a})}}else this.time=s;if(o&&(r&1)===1)return t-s}return s}_setEndings(e,t,n){let s=this._interpolantSettings;n?(s.endingStart=os,s.endingEnd=os):(e?s.endingStart=this.zeroSlopeAtStart?os:rs:s.endingStart=Or,t?s.endingEnd=this.zeroSlopeAtEnd?os:rs:s.endingEnd=Or)}_scheduleFading(e,t,n){let s=this._mixer,r=s.time,o=this._weightInterpolant;o===null&&(o=s._lendControlInterpolant(),this._weightInterpolant=o);let a=o.parameterPositions,l=o.sampleValues;return a[0]=r,l[0]=t,a[1]=r+e,l[1]=n,this}},vm=new Float32Array(1),_s=class extends Jn{constructor(e){super(),this._root=e,this._initMemoryManager(),this._accuIndex=0,this.time=0,this.timeScale=1}_bindAction(e,t){let n=e._localRoot||this._root,s=e._clip.tracks,r=s.length,o=e._propertyBindings,a=e._interpolants,l=n.uuid,c=this._bindingsByRootAndName,h=c[l];h===void 0&&(h={},c[l]=h);for(let u=0;u!==r;++u){let d=s[u],f=d.name,g=h[f];if(g!==void 0)++g.referenceCount,o[u]=g;else{if(g=o[u],g!==void 0){g._cacheIndex===null&&(++g.referenceCount,this._addInactiveBinding(g,l,f));continue}let v=t&&t._propertyBindings[u].binding.parsedPath;g=new za(vt.create(n,f,v),d.ValueTypeName,d.getValueSize()),++g.referenceCount,this._addInactiveBinding(g,l,f),o[u]=g}a[u].resultBuffer=g.buffer}}_activateAction(e){if(!this._isActiveAction(e)){if(e._cacheIndex===null){let n=(e._localRoot||this._root).uuid,s=e._clip.uuid,r=this._actionsByClip[s];this._bindAction(e,r&&r.knownActions[0]),this._addInactiveAction(e,s,n)}let t=e._propertyBindings;for(let n=0,s=t.length;n!==s;++n){let r=t[n];r.useCount++===0&&(this._lendBinding(r),r.saveOriginalState())}this._lendAction(e)}}_deactivateAction(e){if(this._isActiveAction(e)){let t=e._propertyBindings;for(let n=0,s=t.length;n!==s;++n){let r=t[n];--r.useCount===0&&(r.restoreOriginalState(),this._takeBackBinding(r))}this._takeBackAction(e)}}_initMemoryManager(){this._actions=[],this._nActiveActions=0,this._actionsByClip={},this._bindings=[],this._nActiveBindings=0,this._bindingsByRootAndName={},this._controlInterpolants=[],this._nActiveControlInterpolants=0;let e=this;this.stats={actions:{get total(){return e._actions.length},get inUse(){return e._nActiveActions}},bindings:{get total(){return e._bindings.length},get inUse(){return e._nActiveBindings}},controlInterpolants:{get total(){return e._controlInterpolants.length},get inUse(){return e._nActiveControlInterpolants}}}}_isActiveAction(e){let t=e._cacheIndex;return t!==null&&t<this._nActiveActions}_addInactiveAction(e,t,n){let s=this._actions,r=this._actionsByClip,o=r[t];if(o===void 0)o={knownActions:[e],actionByRoot:{}},e._byClipCacheIndex=0,r[t]=o;else{let a=o.knownActions;e._byClipCacheIndex=a.length,a.push(e)}e._cacheIndex=s.length,s.push(e),o.actionByRoot[n]=e}_removeInactiveAction(e){let t=this._actions,n=t[t.length-1],s=e._cacheIndex;n._cacheIndex=s,t[s]=n,t.pop(),e._cacheIndex=null;let r=e._clip.uuid,o=this._actionsByClip,a=o[r],l=a.knownActions,c=l[l.length-1],h=e._byClipCacheIndex;c._byClipCacheIndex=h,l[h]=c,l.pop(),e._byClipCacheIndex=null;let u=a.actionByRoot,d=(e._localRoot||this._root).uuid;delete u[d],l.length===0&&delete o[r],this._removeInactiveBindingsForAction(e)}_removeInactiveBindingsForAction(e){let t=e._propertyBindings;for(let n=0,s=t.length;n!==s;++n){let r=t[n];--r.referenceCount===0&&this._removeInactiveBinding(r)}}_lendAction(e){let t=this._actions,n=e._cacheIndex,s=this._nActiveActions++,r=t[s];e._cacheIndex=s,t[s]=e,r._cacheIndex=n,t[n]=r}_takeBackAction(e){let t=this._actions,n=e._cacheIndex,s=--this._nActiveActions,r=t[s];e._cacheIndex=s,t[s]=e,r._cacheIndex=n,t[n]=r}_addInactiveBinding(e,t,n){let s=this._bindingsByRootAndName,r=this._bindings,o=s[t];o===void 0&&(o={},s[t]=o),o[n]=e,e._cacheIndex=r.length,r.push(e)}_removeInactiveBinding(e){let t=this._bindings,n=e.binding,s=n.rootNode.uuid,r=n.path,o=this._bindingsByRootAndName,a=o[s],l=t[t.length-1],c=e._cacheIndex;l._cacheIndex=c,t[c]=l,t.pop(),delete a[r],Object.keys(a).length===0&&delete o[s]}_lendBinding(e){let t=this._bindings,n=e._cacheIndex,s=this._nActiveBindings++,r=t[s];e._cacheIndex=s,t[s]=e,r._cacheIndex=n,t[n]=r}_takeBackBinding(e){let t=this._bindings,n=e._cacheIndex,s=--this._nActiveBindings,r=t[s];e._cacheIndex=s,t[s]=e,r._cacheIndex=n,t[n]=r}_lendControlInterpolant(){let e=this._controlInterpolants,t=this._nActiveControlInterpolants++,n=e[t];return n===void 0&&(n=new xo(new Float32Array(2),new Float32Array(2),1,vm),n.__cacheIndex=t,e[t]=n),n}_takeBackControlInterpolant(e){let t=this._controlInterpolants,n=e.__cacheIndex,s=--this._nActiveControlInterpolants,r=t[s];e.__cacheIndex=s,t[s]=e,r.__cacheIndex=n,t[n]=r}clipAction(e,t,n){let s=t||this._root,r=s.uuid,o=typeof e=="string"?mi.findByName(s,e):e,a=o!==null?o.uuid:e,l=this._actionsByClip[a],c=null;if(n===void 0&&(o!==null?n=o.blendMode:n=Ul),l!==void 0){let u=l.actionByRoot[r];if(u!==void 0&&u.blendMode===n)return u;c=l.knownActions[0],o===null&&(o=c._clip)}if(o===null)return null;let h=new ka(this,o,t,n);return this._bindAction(h,c),this._addInactiveAction(h,a,r),h}existingAction(e,t){let n=t||this._root,s=n.uuid,r=typeof e=="string"?mi.findByName(n,e):e,o=r?r.uuid:e,a=this._actionsByClip[o];return a!==void 0&&a.actionByRoot[s]||null}stopAllAction(){let e=this._actions,t=this._nActiveActions;for(let n=t-1;n>=0;--n)e[n].stop();return this}update(e){e*=this.timeScale;let t=this._actions,n=this._nActiveActions,s=this.time+=e,r=Math.sign(e),o=this._accuIndex^=1;for(let c=0;c!==n;++c)t[c]._update(s,e,r,o);let a=this._bindings,l=this._nActiveBindings;for(let c=0;c!==l;++c)a[c].apply(o);return this}setTime(e){this.time=0;for(let t=0;t<this._actions.length;t++)this._actions[t].time=0;return this.update(e)}getRoot(){return this._root}uncacheClip(e){let t=this._actions,n=e.uuid,s=this._actionsByClip,r=s[n];if(r!==void 0){let o=r.knownActions;for(let a=0,l=o.length;a!==l;++a){let c=o[a];this._deactivateAction(c);let h=c._cacheIndex,u=t[t.length-1];c._cacheIndex=null,c._byClipCacheIndex=null,u._cacheIndex=h,t[h]=u,t.pop(),this._removeInactiveBindingsForAction(c)}delete s[n]}}uncacheRoot(e){let t=e.uuid,n=this._actionsByClip;for(let o in n){let a=n[o].actionByRoot,l=a[t];l!==void 0&&(this._deactivateAction(l),this._removeInactiveAction(l))}let s=this._bindingsByRootAndName,r=s[t];if(r!==void 0)for(let o in r){let a=r[o];a.restoreOriginalState(),this._removeInactiveBinding(a)}}uncacheAction(e,t){let n=this.existingAction(e,t);n!==null&&(this._deactivateAction(n),this._removeInactiveAction(n))}};function ph(i,e,t,n){let s=ym(n);switch(t){case th:return i*e;case nl:return i*e/s.components*s.byteLength;case il:return i*e/s.components*s.byteLength;case ih:return i*e*2/s.components*s.byteLength;case sl:return i*e*2/s.components*s.byteLength;case nh:return i*e*3/s.components*s.byteLength;case Sn:return i*e*4/s.components*s.byteLength;case rl:return i*e*4/s.components*s.byteLength;case wo:case To:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case Ao:case Ro:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case al:case cl:return Math.max(i,16)*Math.max(e,8)/4;case ol:case ll:return Math.max(i,8)*Math.max(e,8)/2;case hl:case ul:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case dl:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case fl:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case pl:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case ml:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case gl:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case xl:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case _l:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case vl:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case yl:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case Ml:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case bl:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case Sl:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case El:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case wl:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case Tl:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case Al:case Rl:case Cl:return Math.ceil(i/4)*Math.ceil(e/4)*16;case Il:case Pl:return Math.ceil(i/4)*Math.ceil(e/4)*8;case Dl:case Ll:return Math.ceil(i/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function ym(i){switch(i){case Wn:case Kc:return{byteLength:1,components:1};case sr:case jc:case rr:return{byteLength:2,components:1};case el:case tl:return{byteLength:2,components:4};case ki:case Qa:case Pn:return{byteLength:4,components:1};case Qc:case eh:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"180"}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="180");function uf(){let i=null,e=!1,t=null,n=null;function s(r,o){t(r,o),n=i.requestAnimationFrame(s)}return{start:function(){e!==!0&&t!==null&&(n=i.requestAnimationFrame(s),e=!0)},stop:function(){i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){i=r}}}function Mm(i){let e=new WeakMap;function t(a,l){let c=a.array,h=a.usage,u=c.byteLength,d=i.createBuffer();i.bindBuffer(l,d),i.bufferData(l,c,h),a.onUploadCallback();let f;if(c instanceof Float32Array)f=i.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)f=i.HALF_FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?f=i.HALF_FLOAT:f=i.UNSIGNED_SHORT;else if(c instanceof Int16Array)f=i.SHORT;else if(c instanceof Uint32Array)f=i.UNSIGNED_INT;else if(c instanceof Int32Array)f=i.INT;else if(c instanceof Int8Array)f=i.BYTE;else if(c instanceof Uint8Array)f=i.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)f=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:d,type:f,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:u}}function n(a,l,c){let h=l.array,u=l.updateRanges;if(i.bindBuffer(c,a),u.length===0)i.bufferSubData(c,0,h);else{u.sort((f,g)=>f.start-g.start);let d=0;for(let f=1;f<u.length;f++){let g=u[d],v=u[f];v.start<=g.start+g.count+1?g.count=Math.max(g.count,v.start+v.count-g.start):(++d,u[d]=v)}u.length=d+1;for(let f=0,g=u.length;f<g;f++){let v=u[f];i.bufferSubData(c,v.start*h.BYTES_PER_ELEMENT,h,v.start,v.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(a){return a.isInterleavedBufferAttribute&&(a=a.data),e.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);let l=e.get(a);l&&(i.deleteBuffer(l.buffer),e.delete(a))}function o(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){let h=e.get(a);(!h||h.version<a.version)&&e.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}let c=e.get(a);if(c===void 0)e.set(a,t(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,a,l),c.version=a.version}}return{get:s,remove:r,update:o}}var bm=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Sm=`#ifdef USE_ALPHAHASH
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
#endif`,Em=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,wm=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Tm=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Am=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Rm=`#ifdef USE_AOMAP
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
#endif`,Cm=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Im=`#ifdef USE_BATCHING
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
#endif`,Pm=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Dm=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Lm=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Um=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Nm=`#ifdef USE_IRIDESCENCE
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
#endif`,Fm=`#ifdef USE_BUMPMAP
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
#endif`,Om=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Bm=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,zm=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,km=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Hm=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Vm=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Gm=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,Wm=`#if defined( USE_COLOR_ALPHA )
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
#endif`,Xm=`#define PI 3.141592653589793
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
} // validated`,$m=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,qm=`vec3 transformedNormal = objectNormal;
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
#endif`,Ym=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Zm=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Jm=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Km=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,jm="gl_FragColor = linearToOutputTexel( gl_FragColor );",Qm=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,eg=`#ifdef USE_ENVMAP
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
#endif`,tg=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,ng=`#ifdef USE_ENVMAP
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
#endif`,ig=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,sg=`#ifdef USE_ENVMAP
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
#endif`,rg=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,og=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,ag=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,lg=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,cg=`#ifdef USE_GRADIENTMAP
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
}`,hg=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,ug=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,dg=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,fg=`uniform bool receiveShadow;
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
#endif`,pg=`#ifdef USE_ENVMAP
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
#endif`,mg=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,gg=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,xg=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,_g=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,vg=`PhysicalMaterial material;
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
#endif`,yg=`struct PhysicalMaterial {
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
}`,Mg=`
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
#endif`,bg=`#if defined( RE_IndirectDiffuse )
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
#endif`,Sg=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Eg=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,wg=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Tg=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Ag=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Rg=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Cg=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Ig=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Pg=`#if defined( USE_POINTS_UV )
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
#endif`,Dg=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Lg=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Ug=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Ng=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Fg=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Og=`#ifdef USE_MORPHTARGETS
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
#endif`,Bg=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,zg=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,kg=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,Hg=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Vg=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Gg=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Wg=`#ifdef USE_NORMALMAP
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
#endif`,Xg=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,$g=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,qg=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Yg=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Zg=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Jg=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,Kg=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,jg=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Qg=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,e0=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,t0=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,n0=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,i0=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,s0=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,r0=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,o0=`float getShadowMask() {
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
}`,a0=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,l0=`#ifdef USE_SKINNING
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
#endif`,c0=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,h0=`#ifdef USE_SKINNING
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
#endif`,u0=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,d0=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,f0=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,p0=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,m0=`#ifdef USE_TRANSMISSION
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
#endif`,g0=`#ifdef USE_TRANSMISSION
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
#endif`,x0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,_0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,v0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,y0=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,M0=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,b0=`uniform sampler2D t2D;
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
}`,S0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,E0=`#ifdef ENVMAP_TYPE_CUBE
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
}`,w0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,T0=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,A0=`#include <common>
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
}`,R0=`#if DEPTH_PACKING == 3200
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
}`,C0=`#define DISTANCE
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
}`,I0=`#define DISTANCE
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
}`,P0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,D0=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,L0=`uniform float scale;
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
}`,U0=`uniform vec3 diffuse;
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
}`,N0=`#include <common>
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
}`,F0=`uniform vec3 diffuse;
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
}`,O0=`#define LAMBERT
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
}`,B0=`#define LAMBERT
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
}`,z0=`#define MATCAP
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
}`,k0=`#define MATCAP
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
}`,H0=`#define NORMAL
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
}`,V0=`#define NORMAL
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
}`,G0=`#define PHONG
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
}`,W0=`#define PHONG
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
}`,X0=`#define STANDARD
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
}`,$0=`#define STANDARD
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
}`,q0=`#define TOON
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
}`,Y0=`#define TOON
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
}`,Z0=`uniform float size;
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
}`,J0=`uniform vec3 diffuse;
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
}`,K0=`#include <common>
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
}`,j0=`uniform vec3 color;
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
}`,Q0=`uniform float rotation;
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
}`,ex=`uniform vec3 diffuse;
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
}`,je={alphahash_fragment:bm,alphahash_pars_fragment:Sm,alphamap_fragment:Em,alphamap_pars_fragment:wm,alphatest_fragment:Tm,alphatest_pars_fragment:Am,aomap_fragment:Rm,aomap_pars_fragment:Cm,batching_pars_vertex:Im,batching_vertex:Pm,begin_vertex:Dm,beginnormal_vertex:Lm,bsdfs:Um,iridescence_fragment:Nm,bumpmap_pars_fragment:Fm,clipping_planes_fragment:Om,clipping_planes_pars_fragment:Bm,clipping_planes_pars_vertex:zm,clipping_planes_vertex:km,color_fragment:Hm,color_pars_fragment:Vm,color_pars_vertex:Gm,color_vertex:Wm,common:Xm,cube_uv_reflection_fragment:$m,defaultnormal_vertex:qm,displacementmap_pars_vertex:Ym,displacementmap_vertex:Zm,emissivemap_fragment:Jm,emissivemap_pars_fragment:Km,colorspace_fragment:jm,colorspace_pars_fragment:Qm,envmap_fragment:eg,envmap_common_pars_fragment:tg,envmap_pars_fragment:ng,envmap_pars_vertex:ig,envmap_physical_pars_fragment:pg,envmap_vertex:sg,fog_vertex:rg,fog_pars_vertex:og,fog_fragment:ag,fog_pars_fragment:lg,gradientmap_pars_fragment:cg,lightmap_pars_fragment:hg,lights_lambert_fragment:ug,lights_lambert_pars_fragment:dg,lights_pars_begin:fg,lights_toon_fragment:mg,lights_toon_pars_fragment:gg,lights_phong_fragment:xg,lights_phong_pars_fragment:_g,lights_physical_fragment:vg,lights_physical_pars_fragment:yg,lights_fragment_begin:Mg,lights_fragment_maps:bg,lights_fragment_end:Sg,logdepthbuf_fragment:Eg,logdepthbuf_pars_fragment:wg,logdepthbuf_pars_vertex:Tg,logdepthbuf_vertex:Ag,map_fragment:Rg,map_pars_fragment:Cg,map_particle_fragment:Ig,map_particle_pars_fragment:Pg,metalnessmap_fragment:Dg,metalnessmap_pars_fragment:Lg,morphinstance_vertex:Ug,morphcolor_vertex:Ng,morphnormal_vertex:Fg,morphtarget_pars_vertex:Og,morphtarget_vertex:Bg,normal_fragment_begin:zg,normal_fragment_maps:kg,normal_pars_fragment:Hg,normal_pars_vertex:Vg,normal_vertex:Gg,normalmap_pars_fragment:Wg,clearcoat_normal_fragment_begin:Xg,clearcoat_normal_fragment_maps:$g,clearcoat_pars_fragment:qg,iridescence_pars_fragment:Yg,opaque_fragment:Zg,packing:Jg,premultiplied_alpha_fragment:Kg,project_vertex:jg,dithering_fragment:Qg,dithering_pars_fragment:e0,roughnessmap_fragment:t0,roughnessmap_pars_fragment:n0,shadowmap_pars_fragment:i0,shadowmap_pars_vertex:s0,shadowmap_vertex:r0,shadowmask_pars_fragment:o0,skinbase_vertex:a0,skinning_pars_vertex:l0,skinning_vertex:c0,skinnormal_vertex:h0,specularmap_fragment:u0,specularmap_pars_fragment:d0,tonemapping_fragment:f0,tonemapping_pars_fragment:p0,transmission_fragment:m0,transmission_pars_fragment:g0,uv_pars_fragment:x0,uv_pars_vertex:_0,uv_vertex:v0,worldpos_vertex:y0,background_vert:M0,background_frag:b0,backgroundCube_vert:S0,backgroundCube_frag:E0,cube_vert:w0,cube_frag:T0,depth_vert:A0,depth_frag:R0,distanceRGBA_vert:C0,distanceRGBA_frag:I0,equirect_vert:P0,equirect_frag:D0,linedashed_vert:L0,linedashed_frag:U0,meshbasic_vert:N0,meshbasic_frag:F0,meshlambert_vert:O0,meshlambert_frag:B0,meshmatcap_vert:z0,meshmatcap_frag:k0,meshnormal_vert:H0,meshnormal_frag:V0,meshphong_vert:G0,meshphong_frag:W0,meshphysical_vert:X0,meshphysical_frag:$0,meshtoon_vert:q0,meshtoon_frag:Y0,points_vert:Z0,points_frag:J0,shadow_vert:K0,shadow_frag:j0,sprite_vert:Q0,sprite_frag:ex},Se={common:{diffuse:{value:new Ke(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ze},alphaMap:{value:null},alphaMapTransform:{value:new Ze},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ze}},envmap:{envMap:{value:null},envMapRotation:{value:new Ze},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ze}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ze}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ze},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ze},normalScale:{value:new ye(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ze},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ze}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ze}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ze}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ke(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Ke(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ze},alphaTest:{value:0},uvTransform:{value:new Ze}},sprite:{diffuse:{value:new Ke(16777215)},opacity:{value:1},center:{value:new ye(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ze},alphaMap:{value:null},alphaMapTransform:{value:new Ze},alphaTest:{value:0}}},ti={basic:{uniforms:jt([Se.common,Se.specularmap,Se.envmap,Se.aomap,Se.lightmap,Se.fog]),vertexShader:je.meshbasic_vert,fragmentShader:je.meshbasic_frag},lambert:{uniforms:jt([Se.common,Se.specularmap,Se.envmap,Se.aomap,Se.lightmap,Se.emissivemap,Se.bumpmap,Se.normalmap,Se.displacementmap,Se.fog,Se.lights,{emissive:{value:new Ke(0)}}]),vertexShader:je.meshlambert_vert,fragmentShader:je.meshlambert_frag},phong:{uniforms:jt([Se.common,Se.specularmap,Se.envmap,Se.aomap,Se.lightmap,Se.emissivemap,Se.bumpmap,Se.normalmap,Se.displacementmap,Se.fog,Se.lights,{emissive:{value:new Ke(0)},specular:{value:new Ke(1118481)},shininess:{value:30}}]),vertexShader:je.meshphong_vert,fragmentShader:je.meshphong_frag},standard:{uniforms:jt([Se.common,Se.envmap,Se.aomap,Se.lightmap,Se.emissivemap,Se.bumpmap,Se.normalmap,Se.displacementmap,Se.roughnessmap,Se.metalnessmap,Se.fog,Se.lights,{emissive:{value:new Ke(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:je.meshphysical_vert,fragmentShader:je.meshphysical_frag},toon:{uniforms:jt([Se.common,Se.aomap,Se.lightmap,Se.emissivemap,Se.bumpmap,Se.normalmap,Se.displacementmap,Se.gradientmap,Se.fog,Se.lights,{emissive:{value:new Ke(0)}}]),vertexShader:je.meshtoon_vert,fragmentShader:je.meshtoon_frag},matcap:{uniforms:jt([Se.common,Se.bumpmap,Se.normalmap,Se.displacementmap,Se.fog,{matcap:{value:null}}]),vertexShader:je.meshmatcap_vert,fragmentShader:je.meshmatcap_frag},points:{uniforms:jt([Se.points,Se.fog]),vertexShader:je.points_vert,fragmentShader:je.points_frag},dashed:{uniforms:jt([Se.common,Se.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:je.linedashed_vert,fragmentShader:je.linedashed_frag},depth:{uniforms:jt([Se.common,Se.displacementmap]),vertexShader:je.depth_vert,fragmentShader:je.depth_frag},normal:{uniforms:jt([Se.common,Se.bumpmap,Se.normalmap,Se.displacementmap,{opacity:{value:1}}]),vertexShader:je.meshnormal_vert,fragmentShader:je.meshnormal_frag},sprite:{uniforms:jt([Se.sprite,Se.fog]),vertexShader:je.sprite_vert,fragmentShader:je.sprite_frag},background:{uniforms:{uvTransform:{value:new Ze},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:je.background_vert,fragmentShader:je.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ze}},vertexShader:je.backgroundCube_vert,fragmentShader:je.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:je.cube_vert,fragmentShader:je.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:je.equirect_vert,fragmentShader:je.equirect_frag},distanceRGBA:{uniforms:jt([Se.common,Se.displacementmap,{referencePosition:{value:new C},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:je.distanceRGBA_vert,fragmentShader:je.distanceRGBA_frag},shadow:{uniforms:jt([Se.lights,Se.fog,{color:{value:new Ke(0)},opacity:{value:1}}]),vertexShader:je.shadow_vert,fragmentShader:je.shadow_frag}};ti.physical={uniforms:jt([ti.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ze},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ze},clearcoatNormalScale:{value:new ye(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ze},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ze},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ze},sheen:{value:0},sheenColor:{value:new Ke(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ze},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ze},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ze},transmissionSamplerSize:{value:new ye},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ze},attenuationDistance:{value:0},attenuationColor:{value:new Ke(0)},specularColor:{value:new Ke(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ze},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ze},anisotropyVector:{value:new ye},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ze}}]),vertexShader:je.meshphysical_vert,fragmentShader:je.meshphysical_frag};var Nl={r:0,b:0,g:0},bs=new Hn,tx=new nt;function nx(i,e,t,n,s,r,o){let a=new Ke(0),l=r===!0?0:1,c,h,u=null,d=0,f=null;function g(y){let _=y.isScene===!0?y.background:null;return _&&_.isTexture&&(_=(y.backgroundBlurriness>0?t:e).get(_)),_}function v(y){let _=!1,R=g(y);R===null?p(a,l):R&&R.isColor&&(p(R,1),_=!0);let A=i.xr.getEnvironmentBlendMode();A==="additive"?n.buffers.color.setClear(0,0,0,1,o):A==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(i.autoClear||_)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function m(y,_){let R=g(_);R&&(R.isCubeTexture||R.mapping===So)?(h===void 0&&(h=new Lt(new Vn(1,1,1),new yn({name:"BackgroundCubeMaterial",uniforms:Ms(ti.backgroundCube.uniforms),vertexShader:ti.backgroundCube.vertexShader,fragmentShader:ti.backgroundCube.fragmentShader,side:sn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(A,I,L){this.matrixWorld.copyPosition(L.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(h)),bs.copy(_.backgroundRotation),bs.x*=-1,bs.y*=-1,bs.z*=-1,R.isCubeTexture&&R.isRenderTargetTexture===!1&&(bs.y*=-1,bs.z*=-1),h.material.uniforms.envMap.value=R,h.material.uniforms.flipEnvMap.value=R.isCubeTexture&&R.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=_.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=_.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(tx.makeRotationFromEuler(bs)),h.material.toneMapped=lt.getTransfer(R.colorSpace)!==pt,(u!==R||d!==R.version||f!==i.toneMapping)&&(h.material.needsUpdate=!0,u=R,d=R.version,f=i.toneMapping),h.layers.enableAll(),y.unshift(h,h.geometry,h.material,0,0,null)):R&&R.isTexture&&(c===void 0&&(c=new Lt(new Bi(2,2),new yn({name:"BackgroundMaterial",uniforms:Ms(ti.background.uniforms),vertexShader:ti.background.vertexShader,fragmentShader:ti.background.fragmentShader,side:ui,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(c)),c.material.uniforms.t2D.value=R,c.material.uniforms.backgroundIntensity.value=_.backgroundIntensity,c.material.toneMapped=lt.getTransfer(R.colorSpace)!==pt,R.matrixAutoUpdate===!0&&R.updateMatrix(),c.material.uniforms.uvTransform.value.copy(R.matrix),(u!==R||d!==R.version||f!==i.toneMapping)&&(c.material.needsUpdate=!0,u=R,d=R.version,f=i.toneMapping),c.layers.enableAll(),y.unshift(c,c.geometry,c.material,0,0,null))}function p(y,_){y.getRGB(Nl,hh(i)),n.buffers.color.setClear(Nl.r,Nl.g,Nl.b,_,o)}function E(){h!==void 0&&(h.geometry.dispose(),h.material.dispose(),h=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return a},setClearColor:function(y,_=1){a.set(y),l=_,p(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(y){l=y,p(a,l)},render:v,addToRenderList:m,dispose:E}}function ix(i,e){let t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=d(null),r=s,o=!1;function a(M,D,z,G,q){let Z=!1,Y=u(G,z,D);r!==Y&&(r=Y,c(r.object)),Z=f(M,G,z,q),Z&&g(M,G,z,q),q!==null&&e.update(q,i.ELEMENT_ARRAY_BUFFER),(Z||o)&&(o=!1,_(M,D,z,G),q!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(q).buffer))}function l(){return i.createVertexArray()}function c(M){return i.bindVertexArray(M)}function h(M){return i.deleteVertexArray(M)}function u(M,D,z){let G=z.wireframe===!0,q=n[M.id];q===void 0&&(q={},n[M.id]=q);let Z=q[D.id];Z===void 0&&(Z={},q[D.id]=Z);let Y=Z[G];return Y===void 0&&(Y=d(l()),Z[G]=Y),Y}function d(M){let D=[],z=[],G=[];for(let q=0;q<t;q++)D[q]=0,z[q]=0,G[q]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:D,enabledAttributes:z,attributeDivisors:G,object:M,attributes:{},index:null}}function f(M,D,z,G){let q=r.attributes,Z=D.attributes,Y=0,he=z.getAttributes();for(let W in he)if(he[W].location>=0){let Me=q[W],Ae=Z[W];if(Ae===void 0&&(W==="instanceMatrix"&&M.instanceMatrix&&(Ae=M.instanceMatrix),W==="instanceColor"&&M.instanceColor&&(Ae=M.instanceColor)),Me===void 0||Me.attribute!==Ae||Ae&&Me.data!==Ae.data)return!0;Y++}return r.attributesNum!==Y||r.index!==G}function g(M,D,z,G){let q={},Z=D.attributes,Y=0,he=z.getAttributes();for(let W in he)if(he[W].location>=0){let Me=Z[W];Me===void 0&&(W==="instanceMatrix"&&M.instanceMatrix&&(Me=M.instanceMatrix),W==="instanceColor"&&M.instanceColor&&(Me=M.instanceColor));let Ae={};Ae.attribute=Me,Me&&Me.data&&(Ae.data=Me.data),q[W]=Ae,Y++}r.attributes=q,r.attributesNum=Y,r.index=G}function v(){let M=r.newAttributes;for(let D=0,z=M.length;D<z;D++)M[D]=0}function m(M){p(M,0)}function p(M,D){let z=r.newAttributes,G=r.enabledAttributes,q=r.attributeDivisors;z[M]=1,G[M]===0&&(i.enableVertexAttribArray(M),G[M]=1),q[M]!==D&&(i.vertexAttribDivisor(M,D),q[M]=D)}function E(){let M=r.newAttributes,D=r.enabledAttributes;for(let z=0,G=D.length;z<G;z++)D[z]!==M[z]&&(i.disableVertexAttribArray(z),D[z]=0)}function y(M,D,z,G,q,Z,Y){Y===!0?i.vertexAttribIPointer(M,D,z,q,Z):i.vertexAttribPointer(M,D,z,G,q,Z)}function _(M,D,z,G){v();let q=G.attributes,Z=z.getAttributes(),Y=D.defaultAttributeValues;for(let he in Z){let W=Z[he];if(W.location>=0){let ve=q[he];if(ve===void 0&&(he==="instanceMatrix"&&M.instanceMatrix&&(ve=M.instanceMatrix),he==="instanceColor"&&M.instanceColor&&(ve=M.instanceColor)),ve!==void 0){let Me=ve.normalized,Ae=ve.itemSize,He=e.get(ve);if(He===void 0)continue;let et=He.buffer,at=He.type,it=He.bytesPerElement,J=at===i.INT||at===i.UNSIGNED_INT||ve.gpuType===Qa;if(ve.isInterleavedBufferAttribute){let ae=ve.data,Re=ae.stride,Oe=ve.offset;if(ae.isInstancedInterleavedBuffer){for(let Pe=0;Pe<W.locationSize;Pe++)p(W.location+Pe,ae.meshPerAttribute);M.isInstancedMesh!==!0&&G._maxInstanceCount===void 0&&(G._maxInstanceCount=ae.meshPerAttribute*ae.count)}else for(let Pe=0;Pe<W.locationSize;Pe++)m(W.location+Pe);i.bindBuffer(i.ARRAY_BUFFER,et);for(let Pe=0;Pe<W.locationSize;Pe++)y(W.location+Pe,Ae/W.locationSize,at,Me,Re*it,(Oe+Ae/W.locationSize*Pe)*it,J)}else{if(ve.isInstancedBufferAttribute){for(let ae=0;ae<W.locationSize;ae++)p(W.location+ae,ve.meshPerAttribute);M.isInstancedMesh!==!0&&G._maxInstanceCount===void 0&&(G._maxInstanceCount=ve.meshPerAttribute*ve.count)}else for(let ae=0;ae<W.locationSize;ae++)m(W.location+ae);i.bindBuffer(i.ARRAY_BUFFER,et);for(let ae=0;ae<W.locationSize;ae++)y(W.location+ae,Ae/W.locationSize,at,Me,Ae*it,Ae/W.locationSize*ae*it,J)}}else if(Y!==void 0){let Me=Y[he];if(Me!==void 0)switch(Me.length){case 2:i.vertexAttrib2fv(W.location,Me);break;case 3:i.vertexAttrib3fv(W.location,Me);break;case 4:i.vertexAttrib4fv(W.location,Me);break;default:i.vertexAttrib1fv(W.location,Me)}}}}E()}function R(){L();for(let M in n){let D=n[M];for(let z in D){let G=D[z];for(let q in G)h(G[q].object),delete G[q];delete D[z]}delete n[M]}}function A(M){if(n[M.id]===void 0)return;let D=n[M.id];for(let z in D){let G=D[z];for(let q in G)h(G[q].object),delete G[q];delete D[z]}delete n[M.id]}function I(M){for(let D in n){let z=n[D];if(z[M.id]===void 0)continue;let G=z[M.id];for(let q in G)h(G[q].object),delete G[q];delete z[M.id]}}function L(){b(),o=!0,r!==s&&(r=s,c(r.object))}function b(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:a,reset:L,resetDefaultState:b,dispose:R,releaseStatesOfGeometry:A,releaseStatesOfProgram:I,initAttributes:v,enableAttribute:m,disableUnusedAttributes:E}}function sx(i,e,t){let n;function s(c){n=c}function r(c,h){i.drawArrays(n,c,h),t.update(h,n,1)}function o(c,h,u){u!==0&&(i.drawArraysInstanced(n,c,h,u),t.update(h,n,u))}function a(c,h,u){if(u===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,h,0,u);let f=0;for(let g=0;g<u;g++)f+=h[g];t.update(f,n,1)}function l(c,h,u,d){if(u===0)return;let f=e.get("WEBGL_multi_draw");if(f===null)for(let g=0;g<c.length;g++)o(c[g],h[g],d[g]);else{f.multiDrawArraysInstancedWEBGL(n,c,0,h,0,d,0,u);let g=0;for(let v=0;v<u;v++)g+=h[v]*d[v];t.update(g,n,1)}}this.setMode=s,this.render=r,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=l}function rx(i,e,t,n){let s;function r(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){let I=e.get("EXT_texture_filter_anisotropic");s=i.getParameter(I.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function o(I){return!(I!==Sn&&n.convert(I)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(I){let L=I===rr&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(I!==Wn&&n.convert(I)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&I!==Pn&&!L)}function l(I){if(I==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";I="mediump"}return I==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp",h=l(c);h!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);let u=t.logarithmicDepthBuffer===!0,d=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control"),f=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),g=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),v=i.getParameter(i.MAX_TEXTURE_SIZE),m=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),p=i.getParameter(i.MAX_VERTEX_ATTRIBS),E=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),y=i.getParameter(i.MAX_VARYING_VECTORS),_=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),R=g>0,A=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:u,reversedDepthBuffer:d,maxTextures:f,maxVertexTextures:g,maxTextureSize:v,maxCubemapSize:m,maxAttributes:p,maxVertexUniforms:E,maxVaryings:y,maxFragmentUniforms:_,vertexTextures:R,maxSamples:A}}function ox(i){let e=this,t=null,n=0,s=!1,r=!1,o=new Zn,a=new Ze,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(u,d){let f=u.length!==0||d||n!==0||s;return s=d,n=u.length,f},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,d){t=h(u,d,0)},this.setState=function(u,d,f){let g=u.clippingPlanes,v=u.clipIntersection,m=u.clipShadows,p=i.get(u);if(!s||g===null||g.length===0||r&&!m)r?h(null):c();else{let E=r?0:n,y=E*4,_=p.clippingState||null;l.value=_,_=h(g,d,y,f);for(let R=0;R!==y;++R)_[R]=t[R];p.clippingState=_,this.numIntersection=v?this.numPlanes:0,this.numPlanes+=E}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function h(u,d,f,g){let v=u!==null?u.length:0,m=null;if(v!==0){if(m=l.value,g!==!0||m===null){let p=f+v*4,E=d.matrixWorldInverse;a.getNormalMatrix(E),(m===null||m.length<p)&&(m=new Float32Array(p));for(let y=0,_=f;y!==v;++y,_+=4)o.copy(u[y]).applyMatrix4(E,a),o.normal.toArray(m,_),m[_+3]=o.constant}l.value=m,l.needsUpdate=!0}return e.numPlanes=v,e.numIntersection=0,m}}function ax(i){let e=new WeakMap;function t(o,a){return a===Ja?o.mapping=vs:a===Ka&&(o.mapping=ys),o}function n(o){if(o&&o.isTexture){let a=o.mapping;if(a===Ja||a===Ka)if(e.has(o)){let l=e.get(o).texture;return t(l,o.mapping)}else{let l=o.image;if(l&&l.height>0){let c=new Ea(l.height);return c.fromEquirectangularTexture(i,o),e.set(o,c),o.addEventListener("dispose",s),t(c.texture,o.mapping)}else return null}}return o}function s(o){let a=o.target;a.removeEventListener("dispose",s);let l=e.get(a);l!==void 0&&(e.delete(a),l.dispose())}function r(){e=new WeakMap}return{get:n,dispose:r}}var cr=4,Hd=[.125,.215,.35,.446,.526,.582],ws=20,mh=new Mo,Vd=new Ke,gh=null,xh=0,_h=0,vh=!1,Es=(1+Math.sqrt(5))/2,lr=1/Es,Gd=[new C(-Es,lr,0),new C(Es,lr,0),new C(-lr,0,Es),new C(lr,0,Es),new C(0,Es,-lr),new C(0,Es,lr),new C(-1,1,-1),new C(1,1,-1),new C(-1,1,1),new C(1,1,1)],lx=new C,Bl=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,s=100,r={}){let{size:o=256,position:a=lx}=r;gh=this._renderer.getRenderTarget(),xh=this._renderer.getActiveCubeFace(),_h=this._renderer.getActiveMipmapLevel(),vh=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(o);let l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,n,s,l,a),t>0&&this._blur(l,0,0,t),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=$d(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Xd(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(gh,xh,_h),this._renderer.xr.enabled=vh,e.scissorTest=!1,Fl(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===vs||e.mapping===ys?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),gh=this._renderer.getRenderTarget(),xh=this._renderer.getActiveCubeFace(),_h=this._renderer.getActiveMipmapLevel(),vh=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:kn,minFilter:kn,generateMipmaps:!1,type:rr,format:Sn,colorSpace:hs,depthBuffer:!1},s=Wd(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Wd(e,t,n);let{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=cx(r)),this._blurMaterial=hx(r,e,t)}return s}_compileMaterial(e){let t=new Lt(this._lodPlanes[0],e);this._renderer.compile(t,mh)}_sceneToCubeUV(e,t,n,s,r){let l=new Wt(90,1,t,n),c=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],u=this._renderer,d=u.autoClear,f=u.toneMapping;u.getClearColor(Vd),u.toneMapping=xi,u.autoClear=!1,u.state.buffers.depth.getReversed()&&(u.setRenderTarget(s),u.clearDepth(),u.setRenderTarget(null));let v=new Wr({name:"PMREM.Background",side:sn,depthWrite:!1,depthTest:!1}),m=new Lt(new Vn,v),p=!1,E=e.background;E?E.isColor&&(v.color.copy(E),e.background=null,p=!0):(v.color.copy(Vd),p=!0);for(let y=0;y<6;y++){let _=y%3;_===0?(l.up.set(0,c[y],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x+h[y],r.y,r.z)):_===1?(l.up.set(0,0,c[y]),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y+h[y],r.z)):(l.up.set(0,c[y],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y,r.z+h[y]));let R=this._cubeSize;Fl(s,_*R,y>2?R:0,R,R),u.setRenderTarget(s),p&&u.render(m,l),u.render(e,l)}m.geometry.dispose(),m.material.dispose(),u.toneMapping=f,u.autoClear=d,e.background=E}_textureToCubeUV(e,t){let n=this._renderer,s=e.mapping===vs||e.mapping===ys;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=$d()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Xd());let r=s?this._cubemapMaterial:this._equirectMaterial,o=new Lt(this._lodPlanes[0],r),a=r.uniforms;a.envMap.value=e;let l=this._cubeSize;Fl(t,0,0,3*l,2*l),n.setRenderTarget(t),n.render(o,mh)}_applyPMREM(e){let t=this._renderer,n=t.autoClear;t.autoClear=!1;let s=this._lodPlanes.length;for(let r=1;r<s;r++){let o=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),a=Gd[(s-r-1)%Gd.length];this._blur(e,r-1,r,o,a)}t.autoClear=n}_blur(e,t,n,s,r){let o=this._pingPongRenderTarget;this._halfBlur(e,o,t,n,s,"latitudinal",r),this._halfBlur(o,e,n,n,s,"longitudinal",r)}_halfBlur(e,t,n,s,r,o,a){let l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");let h=3,u=new Lt(this._lodPlanes[s],c),d=c.uniforms,f=this._sizeLods[n]-1,g=isFinite(r)?Math.PI/(2*f):2*Math.PI/(2*ws-1),v=r/g,m=isFinite(r)?1+Math.floor(h*v):ws;m>ws&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${ws}`);let p=[],E=0;for(let I=0;I<ws;++I){let L=I/v,b=Math.exp(-L*L/2);p.push(b),I===0?E+=b:I<m&&(E+=2*b)}for(let I=0;I<p.length;I++)p[I]=p[I]/E;d.envMap.value=e.texture,d.samples.value=m,d.weights.value=p,d.latitudinal.value=o==="latitudinal",a&&(d.poleAxis.value=a);let{_lodMax:y}=this;d.dTheta.value=g,d.mipInt.value=y-n;let _=this._sizeLods[s],R=3*_*(s>y-cr?s-y+cr:0),A=4*(this._cubeSize-_);Fl(t,R,A,3*_,2*_),l.setRenderTarget(t),l.render(u,mh)}};function cx(i){let e=[],t=[],n=[],s=i,r=i-cr+1+Hd.length;for(let o=0;o<r;o++){let a=Math.pow(2,s);t.push(a);let l=1/a;o>i-cr?l=Hd[o-i+cr-1]:o===0&&(l=0),n.push(l);let c=1/(a-2),h=-c,u=1+c,d=[h,h,u,h,u,u,h,h,u,u,h,u],f=6,g=6,v=3,m=2,p=1,E=new Float32Array(v*g*f),y=new Float32Array(m*g*f),_=new Float32Array(p*g*f);for(let A=0;A<f;A++){let I=A%3*2/3-1,L=A>2?0:-1,b=[I,L,0,I+2/3,L,0,I+2/3,L+1,0,I,L,0,I+2/3,L+1,0,I,L+1,0];E.set(b,v*g*A),y.set(d,m*g*A);let M=[A,A,A,A,A,A];_.set(M,p*g*A)}let R=new Kt;R.setAttribute("position",new ln(E,v)),R.setAttribute("uv",new ln(y,m)),R.setAttribute("faceIndex",new ln(_,p)),e.push(R),s>cr&&s--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function Wd(i,e,t){let n=new Kn(i,e,t);return n.texture.mapping=So,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Fl(i,e,t,n,s){i.viewport.set(e,t,n,s),i.scissor.set(e,t,n,s)}function hx(i,e,t){let n=new Float32Array(ws),s=new C(0,1,0);return new yn({name:"SphericalGaussianBlur",defines:{n:ws,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:Ih(),fragmentShader:`

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
		`,blending:gi,depthTest:!1,depthWrite:!1})}function Xd(){return new yn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Ih(),fragmentShader:`

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
		`,blending:gi,depthTest:!1,depthWrite:!1})}function $d(){return new yn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Ih(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:gi,depthTest:!1,depthWrite:!1})}function Ih(){return`

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
	`}function ux(i){let e=new WeakMap,t=null;function n(a){if(a&&a.isTexture){let l=a.mapping,c=l===Ja||l===Ka,h=l===vs||l===ys;if(c||h){let u=e.get(a),d=u!==void 0?u.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==d)return t===null&&(t=new Bl(i)),u=c?t.fromEquirectangular(a,u):t.fromCubemap(a,u),u.texture.pmremVersion=a.pmremVersion,e.set(a,u),u.texture;if(u!==void 0)return u.texture;{let f=a.image;return c&&f&&f.height>0||h&&f&&s(f)?(t===null&&(t=new Bl(i)),u=c?t.fromEquirectangular(a):t.fromCubemap(a),u.texture.pmremVersion=a.pmremVersion,e.set(a,u),a.addEventListener("dispose",r),u.texture):null}}}return a}function s(a){let l=0,c=6;for(let h=0;h<c;h++)a[h]!==void 0&&l++;return l===c}function r(a){let l=a.target;l.removeEventListener("dispose",r);let c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function o(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:o}}function dx(i){let e={};function t(n){if(e[n]!==void 0)return e[n];let s;switch(n){case"WEBGL_depth_texture":s=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=i.getExtension(n)}return e[n]=s,s}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){let s=t(n);return s===null&&Zs("THREE.WebGLRenderer: "+n+" extension not supported."),s}}}function fx(i,e,t,n){let s={},r=new WeakMap;function o(u){let d=u.target;d.index!==null&&e.remove(d.index);for(let g in d.attributes)e.remove(d.attributes[g]);d.removeEventListener("dispose",o),delete s[d.id];let f=r.get(d);f&&(e.remove(f),r.delete(d)),n.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,t.memory.geometries--}function a(u,d){return s[d.id]===!0||(d.addEventListener("dispose",o),s[d.id]=!0,t.memory.geometries++),d}function l(u){let d=u.attributes;for(let f in d)e.update(d[f],i.ARRAY_BUFFER)}function c(u){let d=[],f=u.index,g=u.attributes.position,v=0;if(f!==null){let E=f.array;v=f.version;for(let y=0,_=E.length;y<_;y+=3){let R=E[y+0],A=E[y+1],I=E[y+2];d.push(R,A,A,I,I,R)}}else if(g!==void 0){let E=g.array;v=g.version;for(let y=0,_=E.length/3-1;y<_;y+=3){let R=y+0,A=y+1,I=y+2;d.push(R,A,A,I,I,R)}}else return;let m=new(ch(d)?Xr:us)(d,1);m.version=v;let p=r.get(u);p&&e.remove(p),r.set(u,m)}function h(u){let d=r.get(u);if(d){let f=u.index;f!==null&&d.version<f.version&&c(u)}else c(u);return r.get(u)}return{get:a,update:l,getWireframeAttribute:h}}function px(i,e,t){let n;function s(d){n=d}let r,o;function a(d){r=d.type,o=d.bytesPerElement}function l(d,f){i.drawElements(n,f,r,d*o),t.update(f,n,1)}function c(d,f,g){g!==0&&(i.drawElementsInstanced(n,f,r,d*o,g),t.update(f,n,g))}function h(d,f,g){if(g===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,f,0,r,d,0,g);let m=0;for(let p=0;p<g;p++)m+=f[p];t.update(m,n,1)}function u(d,f,g,v){if(g===0)return;let m=e.get("WEBGL_multi_draw");if(m===null)for(let p=0;p<d.length;p++)c(d[p]/o,f[p],v[p]);else{m.multiDrawElementsInstancedWEBGL(n,f,0,r,d,0,v,0,g);let p=0;for(let E=0;E<g;E++)p+=f[E]*v[E];t.update(p,n,1)}}this.setMode=s,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=h,this.renderMultiDrawInstances=u}function mx(i){let e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,o,a){switch(t.calls++,o){case i.TRIANGLES:t.triangles+=a*(r/3);break;case i.LINES:t.lines+=a*(r/2);break;case i.LINE_STRIP:t.lines+=a*(r-1);break;case i.LINE_LOOP:t.lines+=a*r;break;case i.POINTS:t.points+=a*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:n}}function gx(i,e,t){let n=new WeakMap,s=new ht;function r(o,a,l){let c=o.morphTargetInfluences,h=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,u=h!==void 0?h.length:0,d=n.get(a);if(d===void 0||d.count!==u){let b=function(){I.dispose(),n.delete(a),a.removeEventListener("dispose",b)};d!==void 0&&d.texture.dispose();let f=a.morphAttributes.position!==void 0,g=a.morphAttributes.normal!==void 0,v=a.morphAttributes.color!==void 0,m=a.morphAttributes.position||[],p=a.morphAttributes.normal||[],E=a.morphAttributes.color||[],y=0;f===!0&&(y=1),g===!0&&(y=2),v===!0&&(y=3);let _=a.attributes.position.count*y,R=1;_>e.maxTextureSize&&(R=Math.ceil(_/e.maxTextureSize),_=e.maxTextureSize);let A=new Float32Array(_*R*4*u),I=new Hr(A,_,R,u);I.type=Pn,I.needsUpdate=!0;let L=y*4;for(let M=0;M<u;M++){let D=m[M],z=p[M],G=E[M],q=_*R*4*M;for(let Z=0;Z<D.count;Z++){let Y=Z*L;f===!0&&(s.fromBufferAttribute(D,Z),A[q+Y+0]=s.x,A[q+Y+1]=s.y,A[q+Y+2]=s.z,A[q+Y+3]=0),g===!0&&(s.fromBufferAttribute(z,Z),A[q+Y+4]=s.x,A[q+Y+5]=s.y,A[q+Y+6]=s.z,A[q+Y+7]=0),v===!0&&(s.fromBufferAttribute(G,Z),A[q+Y+8]=s.x,A[q+Y+9]=s.y,A[q+Y+10]=s.z,A[q+Y+11]=G.itemSize===4?s.w:1)}}d={count:u,texture:I,size:new ye(_,R)},n.set(a,d),a.addEventListener("dispose",b)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(i,"morphTexture",o.morphTexture,t);else{let f=0;for(let v=0;v<c.length;v++)f+=c[v];let g=a.morphTargetsRelative?1:1-f;l.getUniforms().setValue(i,"morphTargetBaseInfluence",g),l.getUniforms().setValue(i,"morphTargetInfluences",c)}l.getUniforms().setValue(i,"morphTargetsTexture",d.texture,t),l.getUniforms().setValue(i,"morphTargetsTextureSize",d.size)}return{update:r}}function xx(i,e,t,n){let s=new WeakMap;function r(l){let c=n.render.frame,h=l.geometry,u=e.get(l,h);if(s.get(u)!==c&&(e.update(u),s.set(u,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),s.get(l)!==c&&(t.update(l.instanceMatrix,i.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,i.ARRAY_BUFFER),s.set(l,c))),l.isSkinnedMesh){let d=l.skeleton;s.get(d)!==c&&(d.update(),s.set(d,c))}return u}function o(){s=new WeakMap}function a(l){let c=l.target;c.removeEventListener("dispose",a),t.remove(c.instanceMatrix),c.instanceColor!==null&&t.remove(c.instanceColor)}return{update:r,dispose:o}}var df=new hn,qd=new to(1,1),ff=new Hr,pf=new ba,mf=new qr,Yd=[],Zd=[],Jd=new Float32Array(16),Kd=new Float32Array(9),jd=new Float32Array(4);function ur(i,e,t){let n=i[0];if(n<=0||n>0)return i;let s=e*t,r=Yd[s];if(r===void 0&&(r=new Float32Array(s),Yd[s]=r),e!==0){n.toArray(r,0);for(let o=1,a=0;o!==e;++o)a+=t,i[o].toArray(r,a)}return r}function Ut(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function Nt(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function kl(i,e){let t=Zd[e];t===void 0&&(t=new Int32Array(e),Zd[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function _x(i,e){let t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function vx(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Ut(t,e))return;i.uniform2fv(this.addr,e),Nt(t,e)}}function yx(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Ut(t,e))return;i.uniform3fv(this.addr,e),Nt(t,e)}}function Mx(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Ut(t,e))return;i.uniform4fv(this.addr,e),Nt(t,e)}}function bx(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(Ut(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),Nt(t,e)}else{if(Ut(t,n))return;jd.set(n),i.uniformMatrix2fv(this.addr,!1,jd),Nt(t,n)}}function Sx(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(Ut(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),Nt(t,e)}else{if(Ut(t,n))return;Kd.set(n),i.uniformMatrix3fv(this.addr,!1,Kd),Nt(t,n)}}function Ex(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(Ut(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),Nt(t,e)}else{if(Ut(t,n))return;Jd.set(n),i.uniformMatrix4fv(this.addr,!1,Jd),Nt(t,n)}}function wx(i,e){let t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function Tx(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Ut(t,e))return;i.uniform2iv(this.addr,e),Nt(t,e)}}function Ax(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Ut(t,e))return;i.uniform3iv(this.addr,e),Nt(t,e)}}function Rx(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Ut(t,e))return;i.uniform4iv(this.addr,e),Nt(t,e)}}function Cx(i,e){let t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function Ix(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Ut(t,e))return;i.uniform2uiv(this.addr,e),Nt(t,e)}}function Px(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Ut(t,e))return;i.uniform3uiv(this.addr,e),Nt(t,e)}}function Dx(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Ut(t,e))return;i.uniform4uiv(this.addr,e),Nt(t,e)}}function Lx(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(qd.compareFunction=rh,r=qd):r=df,t.setTexture2D(e||r,s)}function Ux(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture3D(e||pf,s)}function Nx(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTextureCube(e||mf,s)}function Fx(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture2DArray(e||ff,s)}function Ox(i){switch(i){case 5126:return _x;case 35664:return vx;case 35665:return yx;case 35666:return Mx;case 35674:return bx;case 35675:return Sx;case 35676:return Ex;case 5124:case 35670:return wx;case 35667:case 35671:return Tx;case 35668:case 35672:return Ax;case 35669:case 35673:return Rx;case 5125:return Cx;case 36294:return Ix;case 36295:return Px;case 36296:return Dx;case 35678:case 36198:case 36298:case 36306:case 35682:return Lx;case 35679:case 36299:case 36307:return Ux;case 35680:case 36300:case 36308:case 36293:return Nx;case 36289:case 36303:case 36311:case 36292:return Fx}}function Bx(i,e){i.uniform1fv(this.addr,e)}function zx(i,e){let t=ur(e,this.size,2);i.uniform2fv(this.addr,t)}function kx(i,e){let t=ur(e,this.size,3);i.uniform3fv(this.addr,t)}function Hx(i,e){let t=ur(e,this.size,4);i.uniform4fv(this.addr,t)}function Vx(i,e){let t=ur(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function Gx(i,e){let t=ur(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function Wx(i,e){let t=ur(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function Xx(i,e){i.uniform1iv(this.addr,e)}function $x(i,e){i.uniform2iv(this.addr,e)}function qx(i,e){i.uniform3iv(this.addr,e)}function Yx(i,e){i.uniform4iv(this.addr,e)}function Zx(i,e){i.uniform1uiv(this.addr,e)}function Jx(i,e){i.uniform2uiv(this.addr,e)}function Kx(i,e){i.uniform3uiv(this.addr,e)}function jx(i,e){i.uniform4uiv(this.addr,e)}function Qx(i,e,t){let n=this.cache,s=e.length,r=kl(t,s);Ut(n,r)||(i.uniform1iv(this.addr,r),Nt(n,r));for(let o=0;o!==s;++o)t.setTexture2D(e[o]||df,r[o])}function e_(i,e,t){let n=this.cache,s=e.length,r=kl(t,s);Ut(n,r)||(i.uniform1iv(this.addr,r),Nt(n,r));for(let o=0;o!==s;++o)t.setTexture3D(e[o]||pf,r[o])}function t_(i,e,t){let n=this.cache,s=e.length,r=kl(t,s);Ut(n,r)||(i.uniform1iv(this.addr,r),Nt(n,r));for(let o=0;o!==s;++o)t.setTextureCube(e[o]||mf,r[o])}function n_(i,e,t){let n=this.cache,s=e.length,r=kl(t,s);Ut(n,r)||(i.uniform1iv(this.addr,r),Nt(n,r));for(let o=0;o!==s;++o)t.setTexture2DArray(e[o]||ff,r[o])}function i_(i){switch(i){case 5126:return Bx;case 35664:return zx;case 35665:return kx;case 35666:return Hx;case 35674:return Vx;case 35675:return Gx;case 35676:return Wx;case 5124:case 35670:return Xx;case 35667:case 35671:return $x;case 35668:case 35672:return qx;case 35669:case 35673:return Yx;case 5125:return Zx;case 36294:return Jx;case 36295:return Kx;case 36296:return jx;case 35678:case 36198:case 36298:case 36306:case 35682:return Qx;case 35679:case 36299:case 36307:return e_;case 35680:case 36300:case 36308:case 36293:return t_;case 36289:case 36303:case 36311:case 36292:return n_}}var Mh=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=Ox(t.type)}},bh=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=i_(t.type)}},Sh=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let s=this.seq;for(let r=0,o=s.length;r!==o;++r){let a=s[r];a.setValue(e,t[a.id],n)}}},yh=/(\w+)(\])?(\[|\.)?/g;function Qd(i,e){i.seq.push(e),i.map[e.id]=e}function s_(i,e,t){let n=i.name,s=n.length;for(yh.lastIndex=0;;){let r=yh.exec(n),o=yh.lastIndex,a=r[1],l=r[2]==="]",c=r[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===s){Qd(t,c===void 0?new Mh(a,i,e):new bh(a,i,e));break}else{let u=t.map[a];u===void 0&&(u=new Sh(a),Qd(t,u)),t=u}}}var hr=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let s=0;s<n;++s){let r=e.getActiveUniform(t,s),o=e.getUniformLocation(t,r.name);s_(r,o,this)}}setValue(e,t,n,s){let r=this.map[t];r!==void 0&&r.setValue(e,n,s)}setOptional(e,t,n){let s=t[n];s!==void 0&&this.setValue(e,n,s)}static upload(e,t,n,s){for(let r=0,o=t.length;r!==o;++r){let a=t[r],l=n[a.id];l.needsUpdate!==!1&&a.setValue(e,l.value,s)}}static seqWithValue(e,t){let n=[];for(let s=0,r=e.length;s!==r;++s){let o=e[s];o.id in t&&n.push(o)}return n}};function ef(i,e,t){let n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}var r_=37297,o_=0;function a_(i,e){let t=i.split(`
`),n=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let o=s;o<r;o++){let a=o+1;n.push(`${a===e?">":" "} ${a}: ${t[o]}`)}return n.join(`
`)}var tf=new Ze;function l_(i){lt._getMatrix(tf,lt.workingColorSpace,i);let e=`mat3( ${tf.elements.map(t=>t.toFixed(4))} )`;switch(lt.getTransfer(i)){case Br:return[e,"LinearTransferOETF"];case pt:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",i),[e,"LinearTransferOETF"]}}function nf(i,e,t){let n=i.getShaderParameter(e,i.COMPILE_STATUS),r=(i.getShaderInfoLog(e)||"").trim();if(n&&r==="")return"";let o=/ERROR: 0:(\d+)/.exec(r);if(o){let a=parseInt(o[1]);return t.toUpperCase()+`

`+r+`

`+a_(i.getShaderSource(e),a)}else return r}function c_(i,e){let t=l_(e);return[`vec4 ${i}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function h_(i,e){let t;switch(e){case cd:t="Linear";break;case hd:t="Reinhard";break;case ud:t="Cineon";break;case Za:t="ACESFilmic";break;case fd:t="AgX";break;case pd:t="Neutral";break;case dd:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}var Ol=new C;function u_(){lt.getLuminanceCoefficients(Ol);let i=Ol.x.toFixed(4),e=Ol.y.toFixed(4),t=Ol.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function d_(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Co).join(`
`)}function f_(i){let e=[];for(let t in i){let n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function p_(i,e){let t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){let r=i.getActiveAttrib(e,s),o=r.name,a=1;r.type===i.FLOAT_MAT2&&(a=2),r.type===i.FLOAT_MAT3&&(a=3),r.type===i.FLOAT_MAT4&&(a=4),t[o]={type:r.type,location:i.getAttribLocation(e,o),locationSize:a}}return t}function Co(i){return i!==""}function sf(i,e){let t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function rf(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}var m_=/^[ \t]*#include +<([\w\d./]+)>/gm;function Eh(i){return i.replace(m_,x_)}var g_=new Map;function x_(i,e){let t=je[e];if(t===void 0){let n=g_.get(e);if(n!==void 0)t=je[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return Eh(t)}var __=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function of(i){return i.replace(__,v_)}function v_(i,e,t,n){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function af(i){let e=`precision ${i.precision} float;
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
#define LOW_PRECISION`),e}function y_(i){let e="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===Xc?e="SHADOWMAP_TYPE_PCF":i.shadowMapType===Ha?e="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===ei&&(e="SHADOWMAP_TYPE_VSM"),e}function M_(i){let e="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case vs:case ys:e="ENVMAP_TYPE_CUBE";break;case So:e="ENVMAP_TYPE_CUBE_UV";break}return e}function b_(i){let e="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case ys:e="ENVMAP_MODE_REFRACTION";break}return e}function S_(i){let e="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case Zc:e="ENVMAP_BLENDING_MULTIPLY";break;case ad:e="ENVMAP_BLENDING_MIX";break;case ld:e="ENVMAP_BLENDING_ADD";break}return e}function E_(i){let e=i.envMapCubeUVHeight;if(e===null)return null;let t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:n,maxMip:t}}function w_(i,e,t,n){let s=i.getContext(),r=t.defines,o=t.vertexShader,a=t.fragmentShader,l=y_(t),c=M_(t),h=b_(t),u=S_(t),d=E_(t),f=d_(t),g=f_(r),v=s.createProgram(),m,p,E=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Co).join(`
`),m.length>0&&(m+=`
`),p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Co).join(`
`),p.length>0&&(p+=`
`)):(m=[af(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Co).join(`
`),p=[af(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+h:"",t.envMap?"#define "+u:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==xi?"#define TONE_MAPPING":"",t.toneMapping!==xi?je.tonemapping_pars_fragment:"",t.toneMapping!==xi?h_("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",je.colorspace_pars_fragment,c_("linearToOutputTexel",t.outputColorSpace),u_(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Co).join(`
`)),o=Eh(o),o=sf(o,t),o=rf(o,t),a=Eh(a),a=sf(a,t),a=rf(a,t),o=of(o),a=of(a),t.isRawShaderMaterial!==!0&&(E=`#version 300 es
`,m=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["#define varying in",t.glslVersion===oh?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===oh?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);let y=E+m+o,_=E+p+a,R=ef(s,s.VERTEX_SHADER,y),A=ef(s,s.FRAGMENT_SHADER,_);s.attachShader(v,R),s.attachShader(v,A),t.index0AttributeName!==void 0?s.bindAttribLocation(v,0,t.index0AttributeName):t.morphTargets===!0&&s.bindAttribLocation(v,0,"position"),s.linkProgram(v);function I(D){if(i.debug.checkShaderErrors){let z=s.getProgramInfoLog(v)||"",G=s.getShaderInfoLog(R)||"",q=s.getShaderInfoLog(A)||"",Z=z.trim(),Y=G.trim(),he=q.trim(),W=!0,ve=!0;if(s.getProgramParameter(v,s.LINK_STATUS)===!1)if(W=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,v,R,A);else{let Me=nf(s,R,"vertex"),Ae=nf(s,A,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(v,s.VALIDATE_STATUS)+`

Material Name: `+D.name+`
Material Type: `+D.type+`

Program Info Log: `+Z+`
`+Me+`
`+Ae)}else Z!==""?console.warn("THREE.WebGLProgram: Program Info Log:",Z):(Y===""||he==="")&&(ve=!1);ve&&(D.diagnostics={runnable:W,programLog:Z,vertexShader:{log:Y,prefix:m},fragmentShader:{log:he,prefix:p}})}s.deleteShader(R),s.deleteShader(A),L=new hr(s,v),b=p_(s,v)}let L;this.getUniforms=function(){return L===void 0&&I(this),L};let b;this.getAttributes=function(){return b===void 0&&I(this),b};let M=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return M===!1&&(M=s.getProgramParameter(v,r_)),M},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(v),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=o_++,this.cacheKey=e,this.usedTimes=1,this.program=v,this.vertexShader=R,this.fragmentShader=A,this}var T_=0,wh=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){let t=e.vertexShader,n=e.fragmentShader,s=this._getShaderStage(t),r=this._getShaderStage(n),o=this._getShaderCacheForMaterial(e);return o.has(s)===!1&&(o.add(s),s.usedTimes++),o.has(r)===!1&&(o.add(r),r.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new Th(e),t.set(e,n)),n}},Th=class{constructor(e){this.id=T_++,this.code=e,this.usedTimes=0}};function A_(i,e,t,n,s,r,o){let a=new Gr,l=new wh,c=new Set,h=[],u=s.logarithmicDepthBuffer,d=s.vertexTextures,f=s.precision,g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function v(b){return c.add(b),b===0?"uv":`uv${b}`}function m(b,M,D,z,G){let q=z.fog,Z=G.geometry,Y=b.isMeshStandardMaterial?z.environment:null,he=(b.isMeshStandardMaterial?t:e).get(b.envMap||Y),W=he&&he.mapping===So?he.image.height:null,ve=g[b.type];b.precision!==null&&(f=s.getMaxPrecision(b.precision),f!==b.precision&&console.warn("THREE.WebGLProgram.getParameters:",b.precision,"not supported, using",f,"instead."));let Me=Z.morphAttributes.position||Z.morphAttributes.normal||Z.morphAttributes.color,Ae=Me!==void 0?Me.length:0,He=0;Z.morphAttributes.position!==void 0&&(He=1),Z.morphAttributes.normal!==void 0&&(He=2),Z.morphAttributes.color!==void 0&&(He=3);let et,at,it,J;if(ve){let ue=ti[ve];et=ue.vertexShader,at=ue.fragmentShader}else et=b.vertexShader,at=b.fragmentShader,l.update(b),it=l.getVertexShaderID(b),J=l.getFragmentShaderID(b);let ae=i.getRenderTarget(),Re=i.state.buffers.depth.getReversed(),Oe=G.isInstancedMesh===!0,Pe=G.isBatchedMesh===!0,Qe=!!b.map,gt=!!b.matcap,P=!!he,le=!!b.aoMap,ne=!!b.lightMap,ee=!!b.bumpMap,j=!!b.normalMap,me=!!b.displacementMap,ce=!!b.emissiveMap,fe=!!b.metalnessMap,Xe=!!b.roughnessMap,$e=b.anisotropy>0,w=b.clearcoat>0,x=b.dispersion>0,O=b.iridescence>0,X=b.sheen>0,te=b.transmission>0,$=$e&&!!b.anisotropyMap,De=w&&!!b.clearcoatMap,ge=w&&!!b.clearcoatNormalMap,Ie=w&&!!b.clearcoatRoughnessMap,Le=O&&!!b.iridescenceMap,de=O&&!!b.iridescenceThicknessMap,we=X&&!!b.sheenColorMap,Ge=X&&!!b.sheenRoughnessMap,Fe=!!b.specularMap,be=!!b.specularColorMap,U=!!b.specularIntensityMap,T=te&&!!b.transmissionMap,k=te&&!!b.thicknessMap,re=!!b.gradientMap,xe=!!b.alphaMap,Q=b.alphaTest>0,K=!!b.alphaHash,_e=!!b.extensions,Ue=xi;b.toneMapped&&(ae===null||ae.isXRRenderTarget===!0)&&(Ue=i.toneMapping);let Be={shaderID:ve,shaderType:b.type,shaderName:b.name,vertexShader:et,fragmentShader:at,defines:b.defines,customVertexShaderID:it,customFragmentShaderID:J,isRawShaderMaterial:b.isRawShaderMaterial===!0,glslVersion:b.glslVersion,precision:f,batching:Pe,batchingColor:Pe&&G._colorsTexture!==null,instancing:Oe,instancingColor:Oe&&G.instanceColor!==null,instancingMorph:Oe&&G.morphTexture!==null,supportsVertexTextures:d,outputColorSpace:ae===null?i.outputColorSpace:ae.isXRRenderTarget===!0?ae.texture.colorSpace:hs,alphaToCoverage:!!b.alphaToCoverage,map:Qe,matcap:gt,envMap:P,envMapMode:P&&he.mapping,envMapCubeUVHeight:W,aoMap:le,lightMap:ne,bumpMap:ee,normalMap:j,displacementMap:d&&me,emissiveMap:ce,normalMapObjectSpace:j&&b.normalMapType===Sd,normalMapTangentSpace:j&&b.normalMapType===sh,metalnessMap:fe,roughnessMap:Xe,anisotropy:$e,anisotropyMap:$,clearcoat:w,clearcoatMap:De,clearcoatNormalMap:ge,clearcoatRoughnessMap:Ie,dispersion:x,iridescence:O,iridescenceMap:Le,iridescenceThicknessMap:de,sheen:X,sheenColorMap:we,sheenRoughnessMap:Ge,specularMap:Fe,specularColorMap:be,specularIntensityMap:U,transmission:te,transmissionMap:T,thicknessMap:k,gradientMap:re,opaque:b.transparent===!1&&b.blending===ls&&b.alphaToCoverage===!1,alphaMap:xe,alphaTest:Q,alphaHash:K,combine:b.combine,mapUv:Qe&&v(b.map.channel),aoMapUv:le&&v(b.aoMap.channel),lightMapUv:ne&&v(b.lightMap.channel),bumpMapUv:ee&&v(b.bumpMap.channel),normalMapUv:j&&v(b.normalMap.channel),displacementMapUv:me&&v(b.displacementMap.channel),emissiveMapUv:ce&&v(b.emissiveMap.channel),metalnessMapUv:fe&&v(b.metalnessMap.channel),roughnessMapUv:Xe&&v(b.roughnessMap.channel),anisotropyMapUv:$&&v(b.anisotropyMap.channel),clearcoatMapUv:De&&v(b.clearcoatMap.channel),clearcoatNormalMapUv:ge&&v(b.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Ie&&v(b.clearcoatRoughnessMap.channel),iridescenceMapUv:Le&&v(b.iridescenceMap.channel),iridescenceThicknessMapUv:de&&v(b.iridescenceThicknessMap.channel),sheenColorMapUv:we&&v(b.sheenColorMap.channel),sheenRoughnessMapUv:Ge&&v(b.sheenRoughnessMap.channel),specularMapUv:Fe&&v(b.specularMap.channel),specularColorMapUv:be&&v(b.specularColorMap.channel),specularIntensityMapUv:U&&v(b.specularIntensityMap.channel),transmissionMapUv:T&&v(b.transmissionMap.channel),thicknessMapUv:k&&v(b.thicknessMap.channel),alphaMapUv:xe&&v(b.alphaMap.channel),vertexTangents:!!Z.attributes.tangent&&(j||$e),vertexColors:b.vertexColors,vertexAlphas:b.vertexColors===!0&&!!Z.attributes.color&&Z.attributes.color.itemSize===4,pointsUvs:G.isPoints===!0&&!!Z.attributes.uv&&(Qe||xe),fog:!!q,useFog:b.fog===!0,fogExp2:!!q&&q.isFogExp2,flatShading:b.flatShading===!0&&b.wireframe===!1,sizeAttenuation:b.sizeAttenuation===!0,logarithmicDepthBuffer:u,reversedDepthBuffer:Re,skinning:G.isSkinnedMesh===!0,morphTargets:Z.morphAttributes.position!==void 0,morphNormals:Z.morphAttributes.normal!==void 0,morphColors:Z.morphAttributes.color!==void 0,morphTargetsCount:Ae,morphTextureStride:He,numDirLights:M.directional.length,numPointLights:M.point.length,numSpotLights:M.spot.length,numSpotLightMaps:M.spotLightMap.length,numRectAreaLights:M.rectArea.length,numHemiLights:M.hemi.length,numDirLightShadows:M.directionalShadowMap.length,numPointLightShadows:M.pointShadowMap.length,numSpotLightShadows:M.spotShadowMap.length,numSpotLightShadowsWithMaps:M.numSpotLightShadowsWithMaps,numLightProbes:M.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:b.dithering,shadowMapEnabled:i.shadowMap.enabled&&D.length>0,shadowMapType:i.shadowMap.type,toneMapping:Ue,decodeVideoTexture:Qe&&b.map.isVideoTexture===!0&&lt.getTransfer(b.map.colorSpace)===pt,decodeVideoTextureEmissive:ce&&b.emissiveMap.isVideoTexture===!0&&lt.getTransfer(b.emissiveMap.colorSpace)===pt,premultipliedAlpha:b.premultipliedAlpha,doubleSided:b.side===bn,flipSided:b.side===sn,useDepthPacking:b.depthPacking>=0,depthPacking:b.depthPacking||0,index0AttributeName:b.index0AttributeName,extensionClipCullDistance:_e&&b.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(_e&&b.extensions.multiDraw===!0||Pe)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:b.customProgramCacheKey()};return Be.vertexUv1s=c.has(1),Be.vertexUv2s=c.has(2),Be.vertexUv3s=c.has(3),c.clear(),Be}function p(b){let M=[];if(b.shaderID?M.push(b.shaderID):(M.push(b.customVertexShaderID),M.push(b.customFragmentShaderID)),b.defines!==void 0)for(let D in b.defines)M.push(D),M.push(b.defines[D]);return b.isRawShaderMaterial===!1&&(E(M,b),y(M,b),M.push(i.outputColorSpace)),M.push(b.customProgramCacheKey),M.join()}function E(b,M){b.push(M.precision),b.push(M.outputColorSpace),b.push(M.envMapMode),b.push(M.envMapCubeUVHeight),b.push(M.mapUv),b.push(M.alphaMapUv),b.push(M.lightMapUv),b.push(M.aoMapUv),b.push(M.bumpMapUv),b.push(M.normalMapUv),b.push(M.displacementMapUv),b.push(M.emissiveMapUv),b.push(M.metalnessMapUv),b.push(M.roughnessMapUv),b.push(M.anisotropyMapUv),b.push(M.clearcoatMapUv),b.push(M.clearcoatNormalMapUv),b.push(M.clearcoatRoughnessMapUv),b.push(M.iridescenceMapUv),b.push(M.iridescenceThicknessMapUv),b.push(M.sheenColorMapUv),b.push(M.sheenRoughnessMapUv),b.push(M.specularMapUv),b.push(M.specularColorMapUv),b.push(M.specularIntensityMapUv),b.push(M.transmissionMapUv),b.push(M.thicknessMapUv),b.push(M.combine),b.push(M.fogExp2),b.push(M.sizeAttenuation),b.push(M.morphTargetsCount),b.push(M.morphAttributeCount),b.push(M.numDirLights),b.push(M.numPointLights),b.push(M.numSpotLights),b.push(M.numSpotLightMaps),b.push(M.numHemiLights),b.push(M.numRectAreaLights),b.push(M.numDirLightShadows),b.push(M.numPointLightShadows),b.push(M.numSpotLightShadows),b.push(M.numSpotLightShadowsWithMaps),b.push(M.numLightProbes),b.push(M.shadowMapType),b.push(M.toneMapping),b.push(M.numClippingPlanes),b.push(M.numClipIntersection),b.push(M.depthPacking)}function y(b,M){a.disableAll(),M.supportsVertexTextures&&a.enable(0),M.instancing&&a.enable(1),M.instancingColor&&a.enable(2),M.instancingMorph&&a.enable(3),M.matcap&&a.enable(4),M.envMap&&a.enable(5),M.normalMapObjectSpace&&a.enable(6),M.normalMapTangentSpace&&a.enable(7),M.clearcoat&&a.enable(8),M.iridescence&&a.enable(9),M.alphaTest&&a.enable(10),M.vertexColors&&a.enable(11),M.vertexAlphas&&a.enable(12),M.vertexUv1s&&a.enable(13),M.vertexUv2s&&a.enable(14),M.vertexUv3s&&a.enable(15),M.vertexTangents&&a.enable(16),M.anisotropy&&a.enable(17),M.alphaHash&&a.enable(18),M.batching&&a.enable(19),M.dispersion&&a.enable(20),M.batchingColor&&a.enable(21),M.gradientMap&&a.enable(22),b.push(a.mask),a.disableAll(),M.fog&&a.enable(0),M.useFog&&a.enable(1),M.flatShading&&a.enable(2),M.logarithmicDepthBuffer&&a.enable(3),M.reversedDepthBuffer&&a.enable(4),M.skinning&&a.enable(5),M.morphTargets&&a.enable(6),M.morphNormals&&a.enable(7),M.morphColors&&a.enable(8),M.premultipliedAlpha&&a.enable(9),M.shadowMapEnabled&&a.enable(10),M.doubleSided&&a.enable(11),M.flipSided&&a.enable(12),M.useDepthPacking&&a.enable(13),M.dithering&&a.enable(14),M.transmission&&a.enable(15),M.sheen&&a.enable(16),M.opaque&&a.enable(17),M.pointsUvs&&a.enable(18),M.decodeVideoTexture&&a.enable(19),M.decodeVideoTextureEmissive&&a.enable(20),M.alphaToCoverage&&a.enable(21),b.push(a.mask)}function _(b){let M=g[b.type],D;if(M){let z=ti[M];D=Ud.clone(z.uniforms)}else D=b.uniforms;return D}function R(b,M){let D;for(let z=0,G=h.length;z<G;z++){let q=h[z];if(q.cacheKey===M){D=q,++D.usedTimes;break}}return D===void 0&&(D=new w_(i,M,b,r),h.push(D)),D}function A(b){if(--b.usedTimes===0){let M=h.indexOf(b);h[M]=h[h.length-1],h.pop(),b.destroy()}}function I(b){l.remove(b)}function L(){l.dispose()}return{getParameters:m,getProgramCacheKey:p,getUniforms:_,acquireProgram:R,releaseProgram:A,releaseShaderCache:I,programs:h,dispose:L}}function R_(){let i=new WeakMap;function e(o){return i.has(o)}function t(o){let a=i.get(o);return a===void 0&&(a={},i.set(o,a)),a}function n(o){i.delete(o)}function s(o,a,l){i.get(o)[a]=l}function r(){i=new WeakMap}return{has:e,get:t,remove:n,update:s,dispose:r}}function C_(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.z!==e.z?i.z-e.z:i.id-e.id}function lf(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function cf(){let i=[],e=0,t=[],n=[],s=[];function r(){e=0,t.length=0,n.length=0,s.length=0}function o(u,d,f,g,v,m){let p=i[e];return p===void 0?(p={id:u.id,object:u,geometry:d,material:f,groupOrder:g,renderOrder:u.renderOrder,z:v,group:m},i[e]=p):(p.id=u.id,p.object=u,p.geometry=d,p.material=f,p.groupOrder=g,p.renderOrder=u.renderOrder,p.z=v,p.group=m),e++,p}function a(u,d,f,g,v,m){let p=o(u,d,f,g,v,m);f.transmission>0?n.push(p):f.transparent===!0?s.push(p):t.push(p)}function l(u,d,f,g,v,m){let p=o(u,d,f,g,v,m);f.transmission>0?n.unshift(p):f.transparent===!0?s.unshift(p):t.unshift(p)}function c(u,d){t.length>1&&t.sort(u||C_),n.length>1&&n.sort(d||lf),s.length>1&&s.sort(d||lf)}function h(){for(let u=e,d=i.length;u<d;u++){let f=i[u];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:t,transmissive:n,transparent:s,init:r,push:a,unshift:l,finish:h,sort:c}}function I_(){let i=new WeakMap;function e(n,s){let r=i.get(n),o;return r===void 0?(o=new cf,i.set(n,[o])):s>=r.length?(o=new cf,r.push(o)):o=r[s],o}function t(){i=new WeakMap}return{get:e,dispose:t}}function P_(){let i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new C,color:new Ke};break;case"SpotLight":t={position:new C,direction:new C,color:new Ke,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new C,color:new Ke,distance:0,decay:0};break;case"HemisphereLight":t={direction:new C,skyColor:new Ke,groundColor:new Ke};break;case"RectAreaLight":t={color:new Ke,position:new C,halfWidth:new C,halfHeight:new C};break}return i[e.id]=t,t}}}function D_(){let i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ye};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ye};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ye,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}var L_=0;function U_(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function N_(i){let e=new P_,t=D_(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new C);let s=new C,r=new nt,o=new nt;function a(c){let h=0,u=0,d=0;for(let b=0;b<9;b++)n.probe[b].set(0,0,0);let f=0,g=0,v=0,m=0,p=0,E=0,y=0,_=0,R=0,A=0,I=0;c.sort(U_);for(let b=0,M=c.length;b<M;b++){let D=c[b],z=D.color,G=D.intensity,q=D.distance,Z=D.shadow&&D.shadow.map?D.shadow.map.texture:null;if(D.isAmbientLight)h+=z.r*G,u+=z.g*G,d+=z.b*G;else if(D.isLightProbe){for(let Y=0;Y<9;Y++)n.probe[Y].addScaledVector(D.sh.coefficients[Y],G);I++}else if(D.isDirectionalLight){let Y=e.get(D);if(Y.color.copy(D.color).multiplyScalar(D.intensity),D.castShadow){let he=D.shadow,W=t.get(D);W.shadowIntensity=he.intensity,W.shadowBias=he.bias,W.shadowNormalBias=he.normalBias,W.shadowRadius=he.radius,W.shadowMapSize=he.mapSize,n.directionalShadow[f]=W,n.directionalShadowMap[f]=Z,n.directionalShadowMatrix[f]=D.shadow.matrix,E++}n.directional[f]=Y,f++}else if(D.isSpotLight){let Y=e.get(D);Y.position.setFromMatrixPosition(D.matrixWorld),Y.color.copy(z).multiplyScalar(G),Y.distance=q,Y.coneCos=Math.cos(D.angle),Y.penumbraCos=Math.cos(D.angle*(1-D.penumbra)),Y.decay=D.decay,n.spot[v]=Y;let he=D.shadow;if(D.map&&(n.spotLightMap[R]=D.map,R++,he.updateMatrices(D),D.castShadow&&A++),n.spotLightMatrix[v]=he.matrix,D.castShadow){let W=t.get(D);W.shadowIntensity=he.intensity,W.shadowBias=he.bias,W.shadowNormalBias=he.normalBias,W.shadowRadius=he.radius,W.shadowMapSize=he.mapSize,n.spotShadow[v]=W,n.spotShadowMap[v]=Z,_++}v++}else if(D.isRectAreaLight){let Y=e.get(D);Y.color.copy(z).multiplyScalar(G),Y.halfWidth.set(D.width*.5,0,0),Y.halfHeight.set(0,D.height*.5,0),n.rectArea[m]=Y,m++}else if(D.isPointLight){let Y=e.get(D);if(Y.color.copy(D.color).multiplyScalar(D.intensity),Y.distance=D.distance,Y.decay=D.decay,D.castShadow){let he=D.shadow,W=t.get(D);W.shadowIntensity=he.intensity,W.shadowBias=he.bias,W.shadowNormalBias=he.normalBias,W.shadowRadius=he.radius,W.shadowMapSize=he.mapSize,W.shadowCameraNear=he.camera.near,W.shadowCameraFar=he.camera.far,n.pointShadow[g]=W,n.pointShadowMap[g]=Z,n.pointShadowMatrix[g]=D.shadow.matrix,y++}n.point[g]=Y,g++}else if(D.isHemisphereLight){let Y=e.get(D);Y.skyColor.copy(D.color).multiplyScalar(G),Y.groundColor.copy(D.groundColor).multiplyScalar(G),n.hemi[p]=Y,p++}}m>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=Se.LTC_FLOAT_1,n.rectAreaLTC2=Se.LTC_FLOAT_2):(n.rectAreaLTC1=Se.LTC_HALF_1,n.rectAreaLTC2=Se.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=u,n.ambient[2]=d;let L=n.hash;(L.directionalLength!==f||L.pointLength!==g||L.spotLength!==v||L.rectAreaLength!==m||L.hemiLength!==p||L.numDirectionalShadows!==E||L.numPointShadows!==y||L.numSpotShadows!==_||L.numSpotMaps!==R||L.numLightProbes!==I)&&(n.directional.length=f,n.spot.length=v,n.rectArea.length=m,n.point.length=g,n.hemi.length=p,n.directionalShadow.length=E,n.directionalShadowMap.length=E,n.pointShadow.length=y,n.pointShadowMap.length=y,n.spotShadow.length=_,n.spotShadowMap.length=_,n.directionalShadowMatrix.length=E,n.pointShadowMatrix.length=y,n.spotLightMatrix.length=_+R-A,n.spotLightMap.length=R,n.numSpotLightShadowsWithMaps=A,n.numLightProbes=I,L.directionalLength=f,L.pointLength=g,L.spotLength=v,L.rectAreaLength=m,L.hemiLength=p,L.numDirectionalShadows=E,L.numPointShadows=y,L.numSpotShadows=_,L.numSpotMaps=R,L.numLightProbes=I,n.version=L_++)}function l(c,h){let u=0,d=0,f=0,g=0,v=0,m=h.matrixWorldInverse;for(let p=0,E=c.length;p<E;p++){let y=c[p];if(y.isDirectionalLight){let _=n.directional[u];_.direction.setFromMatrixPosition(y.matrixWorld),s.setFromMatrixPosition(y.target.matrixWorld),_.direction.sub(s),_.direction.transformDirection(m),u++}else if(y.isSpotLight){let _=n.spot[f];_.position.setFromMatrixPosition(y.matrixWorld),_.position.applyMatrix4(m),_.direction.setFromMatrixPosition(y.matrixWorld),s.setFromMatrixPosition(y.target.matrixWorld),_.direction.sub(s),_.direction.transformDirection(m),f++}else if(y.isRectAreaLight){let _=n.rectArea[g];_.position.setFromMatrixPosition(y.matrixWorld),_.position.applyMatrix4(m),o.identity(),r.copy(y.matrixWorld),r.premultiply(m),o.extractRotation(r),_.halfWidth.set(y.width*.5,0,0),_.halfHeight.set(0,y.height*.5,0),_.halfWidth.applyMatrix4(o),_.halfHeight.applyMatrix4(o),g++}else if(y.isPointLight){let _=n.point[d];_.position.setFromMatrixPosition(y.matrixWorld),_.position.applyMatrix4(m),d++}else if(y.isHemisphereLight){let _=n.hemi[v];_.direction.setFromMatrixPosition(y.matrixWorld),_.direction.transformDirection(m),v++}}}return{setup:a,setupView:l,state:n}}function hf(i){let e=new N_(i),t=[],n=[];function s(h){c.camera=h,t.length=0,n.length=0}function r(h){t.push(h)}function o(h){n.push(h)}function a(){e.setup(t)}function l(h){e.setupView(t,h)}let c={lightsArray:t,shadowsArray:n,camera:null,lights:e,transmissionRenderTarget:{}};return{init:s,state:c,setupLights:a,setupLightsView:l,pushLight:r,pushShadow:o}}function F_(i){let e=new WeakMap;function t(s,r=0){let o=e.get(s),a;return o===void 0?(a=new hf(i),e.set(s,[a])):r>=o.length?(a=new hf(i),o.push(a)):a=o[r],a}function n(){e=new WeakMap}return{get:t,dispose:n}}var O_=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,B_=`uniform sampler2D shadow_pass;
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
}`;function z_(i,e,t){let n=new Qs,s=new ye,r=new ye,o=new ht,a=new Ia({depthPacking:bd}),l=new Pa,c={},h=t.maxTextureSize,u={[ui]:sn,[sn]:ui,[bn]:bn},d=new yn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ye},radius:{value:4}},vertexShader:O_,fragmentShader:B_}),f=d.clone();f.defines.HORIZONTAL_PASS=1;let g=new Kt;g.setAttribute("position",new ln(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let v=new Lt(g,d),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Xc;let p=this.type;this.render=function(A,I,L){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||A.length===0)return;let b=i.getRenderTarget(),M=i.getActiveCubeFace(),D=i.getActiveMipmapLevel(),z=i.state;z.setBlending(gi),z.buffers.depth.getReversed()===!0?z.buffers.color.setClear(0,0,0,0):z.buffers.color.setClear(1,1,1,1),z.buffers.depth.setTest(!0),z.setScissorTest(!1);let G=p!==ei&&this.type===ei,q=p===ei&&this.type!==ei;for(let Z=0,Y=A.length;Z<Y;Z++){let he=A[Z],W=he.shadow;if(W===void 0){console.warn("THREE.WebGLShadowMap:",he,"has no shadow.");continue}if(W.autoUpdate===!1&&W.needsUpdate===!1)continue;s.copy(W.mapSize);let ve=W.getFrameExtents();if(s.multiply(ve),r.copy(W.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/ve.x),s.x=r.x*ve.x,W.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/ve.y),s.y=r.y*ve.y,W.mapSize.y=r.y)),W.map===null||G===!0||q===!0){let Ae=this.type!==ei?{minFilter:cn,magFilter:cn}:{};W.map!==null&&W.map.dispose(),W.map=new Kn(s.x,s.y,Ae),W.map.texture.name=he.name+".shadowMap",W.camera.updateProjectionMatrix()}i.setRenderTarget(W.map),i.clear();let Me=W.getViewportCount();for(let Ae=0;Ae<Me;Ae++){let He=W.getViewport(Ae);o.set(r.x*He.x,r.y*He.y,r.x*He.z,r.y*He.w),z.viewport(o),W.updateMatrices(he,Ae),n=W.getFrustum(),_(I,L,W.camera,he,this.type)}W.isPointLightShadow!==!0&&this.type===ei&&E(W,L),W.needsUpdate=!1}p=this.type,m.needsUpdate=!1,i.setRenderTarget(b,M,D)};function E(A,I){let L=e.update(v);d.defines.VSM_SAMPLES!==A.blurSamples&&(d.defines.VSM_SAMPLES=A.blurSamples,f.defines.VSM_SAMPLES=A.blurSamples,d.needsUpdate=!0,f.needsUpdate=!0),A.mapPass===null&&(A.mapPass=new Kn(s.x,s.y)),d.uniforms.shadow_pass.value=A.map.texture,d.uniforms.resolution.value=A.mapSize,d.uniforms.radius.value=A.radius,i.setRenderTarget(A.mapPass),i.clear(),i.renderBufferDirect(I,null,L,d,v,null),f.uniforms.shadow_pass.value=A.mapPass.texture,f.uniforms.resolution.value=A.mapSize,f.uniforms.radius.value=A.radius,i.setRenderTarget(A.map),i.clear(),i.renderBufferDirect(I,null,L,f,v,null)}function y(A,I,L,b){let M=null,D=L.isPointLight===!0?A.customDistanceMaterial:A.customDepthMaterial;if(D!==void 0)M=D;else if(M=L.isPointLight===!0?l:a,i.localClippingEnabled&&I.clipShadows===!0&&Array.isArray(I.clippingPlanes)&&I.clippingPlanes.length!==0||I.displacementMap&&I.displacementScale!==0||I.alphaMap&&I.alphaTest>0||I.map&&I.alphaTest>0||I.alphaToCoverage===!0){let z=M.uuid,G=I.uuid,q=c[z];q===void 0&&(q={},c[z]=q);let Z=q[G];Z===void 0&&(Z=M.clone(),q[G]=Z,I.addEventListener("dispose",R)),M=Z}if(M.visible=I.visible,M.wireframe=I.wireframe,b===ei?M.side=I.shadowSide!==null?I.shadowSide:I.side:M.side=I.shadowSide!==null?I.shadowSide:u[I.side],M.alphaMap=I.alphaMap,M.alphaTest=I.alphaToCoverage===!0?.5:I.alphaTest,M.map=I.map,M.clipShadows=I.clipShadows,M.clippingPlanes=I.clippingPlanes,M.clipIntersection=I.clipIntersection,M.displacementMap=I.displacementMap,M.displacementScale=I.displacementScale,M.displacementBias=I.displacementBias,M.wireframeLinewidth=I.wireframeLinewidth,M.linewidth=I.linewidth,L.isPointLight===!0&&M.isMeshDistanceMaterial===!0){let z=i.properties.get(M);z.light=L}return M}function _(A,I,L,b,M){if(A.visible===!1)return;if(A.layers.test(I.layers)&&(A.isMesh||A.isLine||A.isPoints)&&(A.castShadow||A.receiveShadow&&M===ei)&&(!A.frustumCulled||n.intersectsObject(A))){A.modelViewMatrix.multiplyMatrices(L.matrixWorldInverse,A.matrixWorld);let G=e.update(A),q=A.material;if(Array.isArray(q)){let Z=G.groups;for(let Y=0,he=Z.length;Y<he;Y++){let W=Z[Y],ve=q[W.materialIndex];if(ve&&ve.visible){let Me=y(A,ve,b,M);A.onBeforeShadow(i,A,I,L,G,Me,W),i.renderBufferDirect(L,null,G,Me,A,W),A.onAfterShadow(i,A,I,L,G,Me,W)}}}else if(q.visible){let Z=y(A,q,b,M);A.onBeforeShadow(i,A,I,L,G,Z,null),i.renderBufferDirect(L,null,G,Z,A,null),A.onAfterShadow(i,A,I,L,G,Z,null)}}let z=A.children;for(let G=0,q=z.length;G<q;G++)_(z[G],I,L,b,M)}function R(A){A.target.removeEventListener("dispose",R);for(let L in c){let b=c[L],M=A.target.uuid;M in b&&(b[M].dispose(),delete b[M])}}}var k_={[Va]:Ga,[Wa]:qa,[Xa]:Ya,[cs]:$a,[Ga]:Va,[qa]:Wa,[Ya]:Xa,[$a]:cs};function H_(i,e){function t(){let T=!1,k=new ht,re=null,xe=new ht(0,0,0,0);return{setMask:function(Q){re!==Q&&!T&&(i.colorMask(Q,Q,Q,Q),re=Q)},setLocked:function(Q){T=Q},setClear:function(Q,K,_e,Ue,Be){Be===!0&&(Q*=Ue,K*=Ue,_e*=Ue),k.set(Q,K,_e,Ue),xe.equals(k)===!1&&(i.clearColor(Q,K,_e,Ue),xe.copy(k))},reset:function(){T=!1,re=null,xe.set(-1,0,0,0)}}}function n(){let T=!1,k=!1,re=null,xe=null,Q=null;return{setReversed:function(K){if(k!==K){let _e=e.get("EXT_clip_control");K?_e.clipControlEXT(_e.LOWER_LEFT_EXT,_e.ZERO_TO_ONE_EXT):_e.clipControlEXT(_e.LOWER_LEFT_EXT,_e.NEGATIVE_ONE_TO_ONE_EXT),k=K;let Ue=Q;Q=null,this.setClear(Ue)}},getReversed:function(){return k},setTest:function(K){K?ae(i.DEPTH_TEST):Re(i.DEPTH_TEST)},setMask:function(K){re!==K&&!T&&(i.depthMask(K),re=K)},setFunc:function(K){if(k&&(K=k_[K]),xe!==K){switch(K){case Va:i.depthFunc(i.NEVER);break;case Ga:i.depthFunc(i.ALWAYS);break;case Wa:i.depthFunc(i.LESS);break;case cs:i.depthFunc(i.LEQUAL);break;case Xa:i.depthFunc(i.EQUAL);break;case $a:i.depthFunc(i.GEQUAL);break;case qa:i.depthFunc(i.GREATER);break;case Ya:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}xe=K}},setLocked:function(K){T=K},setClear:function(K){Q!==K&&(k&&(K=1-K),i.clearDepth(K),Q=K)},reset:function(){T=!1,re=null,xe=null,Q=null,k=!1}}}function s(){let T=!1,k=null,re=null,xe=null,Q=null,K=null,_e=null,Ue=null,Be=null;return{setTest:function(ue){T||(ue?ae(i.STENCIL_TEST):Re(i.STENCIL_TEST))},setMask:function(ue){k!==ue&&!T&&(i.stencilMask(ue),k=ue)},setFunc:function(ue,Je,rt){(re!==ue||xe!==Je||Q!==rt)&&(i.stencilFunc(ue,Je,rt),re=ue,xe=Je,Q=rt)},setOp:function(ue,Je,rt){(K!==ue||_e!==Je||Ue!==rt)&&(i.stencilOp(ue,Je,rt),K=ue,_e=Je,Ue=rt)},setLocked:function(ue){T=ue},setClear:function(ue){Be!==ue&&(i.clearStencil(ue),Be=ue)},reset:function(){T=!1,k=null,re=null,xe=null,Q=null,K=null,_e=null,Ue=null,Be=null}}}let r=new t,o=new n,a=new s,l=new WeakMap,c=new WeakMap,h={},u={},d=new WeakMap,f=[],g=null,v=!1,m=null,p=null,E=null,y=null,_=null,R=null,A=null,I=new Ke(0,0,0),L=0,b=!1,M=null,D=null,z=null,G=null,q=null,Z=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS),Y=!1,he=0,W=i.getParameter(i.VERSION);W.indexOf("WebGL")!==-1?(he=parseFloat(/^WebGL (\d)/.exec(W)[1]),Y=he>=1):W.indexOf("OpenGL ES")!==-1&&(he=parseFloat(/^OpenGL ES (\d)/.exec(W)[1]),Y=he>=2);let ve=null,Me={},Ae=i.getParameter(i.SCISSOR_BOX),He=i.getParameter(i.VIEWPORT),et=new ht().fromArray(Ae),at=new ht().fromArray(He);function it(T,k,re,xe){let Q=new Uint8Array(4),K=i.createTexture();i.bindTexture(T,K),i.texParameteri(T,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(T,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let _e=0;_e<re;_e++)T===i.TEXTURE_3D||T===i.TEXTURE_2D_ARRAY?i.texImage3D(k,0,i.RGBA,1,1,xe,0,i.RGBA,i.UNSIGNED_BYTE,Q):i.texImage2D(k+_e,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,Q);return K}let J={};J[i.TEXTURE_2D]=it(i.TEXTURE_2D,i.TEXTURE_2D,1),J[i.TEXTURE_CUBE_MAP]=it(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),J[i.TEXTURE_2D_ARRAY]=it(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),J[i.TEXTURE_3D]=it(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),ae(i.DEPTH_TEST),o.setFunc(cs),ee(!1),j(Wc),ae(i.CULL_FACE),le(gi);function ae(T){h[T]!==!0&&(i.enable(T),h[T]=!0)}function Re(T){h[T]!==!1&&(i.disable(T),h[T]=!1)}function Oe(T,k){return u[T]!==k?(i.bindFramebuffer(T,k),u[T]=k,T===i.DRAW_FRAMEBUFFER&&(u[i.FRAMEBUFFER]=k),T===i.FRAMEBUFFER&&(u[i.DRAW_FRAMEBUFFER]=k),!0):!1}function Pe(T,k){let re=f,xe=!1;if(T){re=d.get(k),re===void 0&&(re=[],d.set(k,re));let Q=T.textures;if(re.length!==Q.length||re[0]!==i.COLOR_ATTACHMENT0){for(let K=0,_e=Q.length;K<_e;K++)re[K]=i.COLOR_ATTACHMENT0+K;re.length=Q.length,xe=!0}}else re[0]!==i.BACK&&(re[0]=i.BACK,xe=!0);xe&&i.drawBuffers(re)}function Qe(T){return g!==T?(i.useProgram(T),g=T,!0):!1}let gt={[Ni]:i.FUNC_ADD,[Wu]:i.FUNC_SUBTRACT,[Xu]:i.FUNC_REVERSE_SUBTRACT};gt[$u]=i.MIN,gt[qu]=i.MAX;let P={[Yu]:i.ZERO,[Zu]:i.ONE,[Ju]:i.SRC_COLOR,[ma]:i.SRC_ALPHA,[nd]:i.SRC_ALPHA_SATURATE,[ed]:i.DST_COLOR,[ju]:i.DST_ALPHA,[Ku]:i.ONE_MINUS_SRC_COLOR,[ga]:i.ONE_MINUS_SRC_ALPHA,[td]:i.ONE_MINUS_DST_COLOR,[Qu]:i.ONE_MINUS_DST_ALPHA,[id]:i.CONSTANT_COLOR,[sd]:i.ONE_MINUS_CONSTANT_COLOR,[rd]:i.CONSTANT_ALPHA,[od]:i.ONE_MINUS_CONSTANT_ALPHA};function le(T,k,re,xe,Q,K,_e,Ue,Be,ue){if(T===gi){v===!0&&(Re(i.BLEND),v=!1);return}if(v===!1&&(ae(i.BLEND),v=!0),T!==Gu){if(T!==m||ue!==b){if((p!==Ni||_!==Ni)&&(i.blendEquation(i.FUNC_ADD),p=Ni,_=Ni),ue)switch(T){case ls:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case $c:i.blendFunc(i.ONE,i.ONE);break;case qc:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Yc:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:console.error("THREE.WebGLState: Invalid blending: ",T);break}else switch(T){case ls:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case $c:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case qc:console.error("THREE.WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Yc:console.error("THREE.WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:console.error("THREE.WebGLState: Invalid blending: ",T);break}E=null,y=null,R=null,A=null,I.set(0,0,0),L=0,m=T,b=ue}return}Q=Q||k,K=K||re,_e=_e||xe,(k!==p||Q!==_)&&(i.blendEquationSeparate(gt[k],gt[Q]),p=k,_=Q),(re!==E||xe!==y||K!==R||_e!==A)&&(i.blendFuncSeparate(P[re],P[xe],P[K],P[_e]),E=re,y=xe,R=K,A=_e),(Ue.equals(I)===!1||Be!==L)&&(i.blendColor(Ue.r,Ue.g,Ue.b,Be),I.copy(Ue),L=Be),m=T,b=!1}function ne(T,k){T.side===bn?Re(i.CULL_FACE):ae(i.CULL_FACE);let re=T.side===sn;k&&(re=!re),ee(re),T.blending===ls&&T.transparent===!1?le(gi):le(T.blending,T.blendEquation,T.blendSrc,T.blendDst,T.blendEquationAlpha,T.blendSrcAlpha,T.blendDstAlpha,T.blendColor,T.blendAlpha,T.premultipliedAlpha),o.setFunc(T.depthFunc),o.setTest(T.depthTest),o.setMask(T.depthWrite),r.setMask(T.colorWrite);let xe=T.stencilWrite;a.setTest(xe),xe&&(a.setMask(T.stencilWriteMask),a.setFunc(T.stencilFunc,T.stencilRef,T.stencilFuncMask),a.setOp(T.stencilFail,T.stencilZFail,T.stencilZPass)),ce(T.polygonOffset,T.polygonOffsetFactor,T.polygonOffsetUnits),T.alphaToCoverage===!0?ae(i.SAMPLE_ALPHA_TO_COVERAGE):Re(i.SAMPLE_ALPHA_TO_COVERAGE)}function ee(T){M!==T&&(T?i.frontFace(i.CW):i.frontFace(i.CCW),M=T)}function j(T){T!==Hu?(ae(i.CULL_FACE),T!==D&&(T===Wc?i.cullFace(i.BACK):T===Vu?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):Re(i.CULL_FACE),D=T}function me(T){T!==z&&(Y&&i.lineWidth(T),z=T)}function ce(T,k,re){T?(ae(i.POLYGON_OFFSET_FILL),(G!==k||q!==re)&&(i.polygonOffset(k,re),G=k,q=re)):Re(i.POLYGON_OFFSET_FILL)}function fe(T){T?ae(i.SCISSOR_TEST):Re(i.SCISSOR_TEST)}function Xe(T){T===void 0&&(T=i.TEXTURE0+Z-1),ve!==T&&(i.activeTexture(T),ve=T)}function $e(T,k,re){re===void 0&&(ve===null?re=i.TEXTURE0+Z-1:re=ve);let xe=Me[re];xe===void 0&&(xe={type:void 0,texture:void 0},Me[re]=xe),(xe.type!==T||xe.texture!==k)&&(ve!==re&&(i.activeTexture(re),ve=re),i.bindTexture(T,k||J[T]),xe.type=T,xe.texture=k)}function w(){let T=Me[ve];T!==void 0&&T.type!==void 0&&(i.bindTexture(T.type,null),T.type=void 0,T.texture=void 0)}function x(){try{i.compressedTexImage2D(...arguments)}catch(T){console.error("THREE.WebGLState:",T)}}function O(){try{i.compressedTexImage3D(...arguments)}catch(T){console.error("THREE.WebGLState:",T)}}function X(){try{i.texSubImage2D(...arguments)}catch(T){console.error("THREE.WebGLState:",T)}}function te(){try{i.texSubImage3D(...arguments)}catch(T){console.error("THREE.WebGLState:",T)}}function $(){try{i.compressedTexSubImage2D(...arguments)}catch(T){console.error("THREE.WebGLState:",T)}}function De(){try{i.compressedTexSubImage3D(...arguments)}catch(T){console.error("THREE.WebGLState:",T)}}function ge(){try{i.texStorage2D(...arguments)}catch(T){console.error("THREE.WebGLState:",T)}}function Ie(){try{i.texStorage3D(...arguments)}catch(T){console.error("THREE.WebGLState:",T)}}function Le(){try{i.texImage2D(...arguments)}catch(T){console.error("THREE.WebGLState:",T)}}function de(){try{i.texImage3D(...arguments)}catch(T){console.error("THREE.WebGLState:",T)}}function we(T){et.equals(T)===!1&&(i.scissor(T.x,T.y,T.z,T.w),et.copy(T))}function Ge(T){at.equals(T)===!1&&(i.viewport(T.x,T.y,T.z,T.w),at.copy(T))}function Fe(T,k){let re=c.get(k);re===void 0&&(re=new WeakMap,c.set(k,re));let xe=re.get(T);xe===void 0&&(xe=i.getUniformBlockIndex(k,T.name),re.set(T,xe))}function be(T,k){let xe=c.get(k).get(T);l.get(k)!==xe&&(i.uniformBlockBinding(k,xe,T.__bindingPointIndex),l.set(k,xe))}function U(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),o.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),h={},ve=null,Me={},u={},d=new WeakMap,f=[],g=null,v=!1,m=null,p=null,E=null,y=null,_=null,R=null,A=null,I=new Ke(0,0,0),L=0,b=!1,M=null,D=null,z=null,G=null,q=null,et.set(0,0,i.canvas.width,i.canvas.height),at.set(0,0,i.canvas.width,i.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:ae,disable:Re,bindFramebuffer:Oe,drawBuffers:Pe,useProgram:Qe,setBlending:le,setMaterial:ne,setFlipSided:ee,setCullFace:j,setLineWidth:me,setPolygonOffset:ce,setScissorTest:fe,activeTexture:Xe,bindTexture:$e,unbindTexture:w,compressedTexImage2D:x,compressedTexImage3D:O,texImage2D:Le,texImage3D:de,updateUBOMapping:Fe,uniformBlockBinding:be,texStorage2D:ge,texStorage3D:Ie,texSubImage2D:X,texSubImage3D:te,compressedTexSubImage2D:$,compressedTexSubImage3D:De,scissor:we,viewport:Ge,reset:U}}function V_(i,e,t,n,s,r,o){let a=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new ye,h=new WeakMap,u,d=new WeakMap,f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(w,x){return f?new OffscreenCanvas(w,x):kr("canvas")}function v(w,x,O){let X=1,te=$e(w);if((te.width>O||te.height>O)&&(X=O/Math.max(te.width,te.height)),X<1)if(typeof HTMLImageElement<"u"&&w instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&w instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&w instanceof ImageBitmap||typeof VideoFrame<"u"&&w instanceof VideoFrame){let $=Math.floor(X*te.width),De=Math.floor(X*te.height);u===void 0&&(u=g($,De));let ge=x?g($,De):u;return ge.width=$,ge.height=De,ge.getContext("2d").drawImage(w,0,0,$,De),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+te.width+"x"+te.height+") to ("+$+"x"+De+")."),ge}else return"data"in w&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+te.width+"x"+te.height+")."),w;return w}function m(w){return w.generateMipmaps}function p(w){i.generateMipmap(w)}function E(w){return w.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:w.isWebGL3DRenderTarget?i.TEXTURE_3D:w.isWebGLArrayRenderTarget||w.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function y(w,x,O,X,te=!1){if(w!==null){if(i[w]!==void 0)return i[w];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+w+"'")}let $=x;if(x===i.RED&&(O===i.FLOAT&&($=i.R32F),O===i.HALF_FLOAT&&($=i.R16F),O===i.UNSIGNED_BYTE&&($=i.R8)),x===i.RED_INTEGER&&(O===i.UNSIGNED_BYTE&&($=i.R8UI),O===i.UNSIGNED_SHORT&&($=i.R16UI),O===i.UNSIGNED_INT&&($=i.R32UI),O===i.BYTE&&($=i.R8I),O===i.SHORT&&($=i.R16I),O===i.INT&&($=i.R32I)),x===i.RG&&(O===i.FLOAT&&($=i.RG32F),O===i.HALF_FLOAT&&($=i.RG16F),O===i.UNSIGNED_BYTE&&($=i.RG8)),x===i.RG_INTEGER&&(O===i.UNSIGNED_BYTE&&($=i.RG8UI),O===i.UNSIGNED_SHORT&&($=i.RG16UI),O===i.UNSIGNED_INT&&($=i.RG32UI),O===i.BYTE&&($=i.RG8I),O===i.SHORT&&($=i.RG16I),O===i.INT&&($=i.RG32I)),x===i.RGB_INTEGER&&(O===i.UNSIGNED_BYTE&&($=i.RGB8UI),O===i.UNSIGNED_SHORT&&($=i.RGB16UI),O===i.UNSIGNED_INT&&($=i.RGB32UI),O===i.BYTE&&($=i.RGB8I),O===i.SHORT&&($=i.RGB16I),O===i.INT&&($=i.RGB32I)),x===i.RGBA_INTEGER&&(O===i.UNSIGNED_BYTE&&($=i.RGBA8UI),O===i.UNSIGNED_SHORT&&($=i.RGBA16UI),O===i.UNSIGNED_INT&&($=i.RGBA32UI),O===i.BYTE&&($=i.RGBA8I),O===i.SHORT&&($=i.RGBA16I),O===i.INT&&($=i.RGBA32I)),x===i.RGB&&(O===i.UNSIGNED_INT_5_9_9_9_REV&&($=i.RGB9_E5),O===i.UNSIGNED_INT_10F_11F_11F_REV&&($=i.R11F_G11F_B10F)),x===i.RGBA){let De=te?Br:lt.getTransfer(X);O===i.FLOAT&&($=i.RGBA32F),O===i.HALF_FLOAT&&($=i.RGBA16F),O===i.UNSIGNED_BYTE&&($=De===pt?i.SRGB8_ALPHA8:i.RGBA8),O===i.UNSIGNED_SHORT_4_4_4_4&&($=i.RGBA4),O===i.UNSIGNED_SHORT_5_5_5_1&&($=i.RGB5_A1)}return($===i.R16F||$===i.R32F||$===i.RG16F||$===i.RG32F||$===i.RGBA16F||$===i.RGBA32F)&&e.get("EXT_color_buffer_float"),$}function _(w,x){let O;return w?x===null||x===ki||x===or?O=i.DEPTH24_STENCIL8:x===Pn?O=i.DEPTH32F_STENCIL8:x===sr&&(O=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):x===null||x===ki||x===or?O=i.DEPTH_COMPONENT24:x===Pn?O=i.DEPTH_COMPONENT32F:x===sr&&(O=i.DEPTH_COMPONENT16),O}function R(w,x){return m(w)===!0||w.isFramebufferTexture&&w.minFilter!==cn&&w.minFilter!==kn?Math.log2(Math.max(x.width,x.height))+1:w.mipmaps!==void 0&&w.mipmaps.length>0?w.mipmaps.length:w.isCompressedTexture&&Array.isArray(w.image)?x.mipmaps.length:1}function A(w){let x=w.target;x.removeEventListener("dispose",A),L(x),x.isVideoTexture&&h.delete(x)}function I(w){let x=w.target;x.removeEventListener("dispose",I),M(x)}function L(w){let x=n.get(w);if(x.__webglInit===void 0)return;let O=w.source,X=d.get(O);if(X){let te=X[x.__cacheKey];te.usedTimes--,te.usedTimes===0&&b(w),Object.keys(X).length===0&&d.delete(O)}n.remove(w)}function b(w){let x=n.get(w);i.deleteTexture(x.__webglTexture);let O=w.source,X=d.get(O);delete X[x.__cacheKey],o.memory.textures--}function M(w){let x=n.get(w);if(w.depthTexture&&(w.depthTexture.dispose(),n.remove(w.depthTexture)),w.isWebGLCubeRenderTarget)for(let X=0;X<6;X++){if(Array.isArray(x.__webglFramebuffer[X]))for(let te=0;te<x.__webglFramebuffer[X].length;te++)i.deleteFramebuffer(x.__webglFramebuffer[X][te]);else i.deleteFramebuffer(x.__webglFramebuffer[X]);x.__webglDepthbuffer&&i.deleteRenderbuffer(x.__webglDepthbuffer[X])}else{if(Array.isArray(x.__webglFramebuffer))for(let X=0;X<x.__webglFramebuffer.length;X++)i.deleteFramebuffer(x.__webglFramebuffer[X]);else i.deleteFramebuffer(x.__webglFramebuffer);if(x.__webglDepthbuffer&&i.deleteRenderbuffer(x.__webglDepthbuffer),x.__webglMultisampledFramebuffer&&i.deleteFramebuffer(x.__webglMultisampledFramebuffer),x.__webglColorRenderbuffer)for(let X=0;X<x.__webglColorRenderbuffer.length;X++)x.__webglColorRenderbuffer[X]&&i.deleteRenderbuffer(x.__webglColorRenderbuffer[X]);x.__webglDepthRenderbuffer&&i.deleteRenderbuffer(x.__webglDepthRenderbuffer)}let O=w.textures;for(let X=0,te=O.length;X<te;X++){let $=n.get(O[X]);$.__webglTexture&&(i.deleteTexture($.__webglTexture),o.memory.textures--),n.remove(O[X])}n.remove(w)}let D=0;function z(){D=0}function G(){let w=D;return w>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+w+" texture units while this GPU supports only "+s.maxTextures),D+=1,w}function q(w){let x=[];return x.push(w.wrapS),x.push(w.wrapT),x.push(w.wrapR||0),x.push(w.magFilter),x.push(w.minFilter),x.push(w.anisotropy),x.push(w.internalFormat),x.push(w.format),x.push(w.type),x.push(w.generateMipmaps),x.push(w.premultiplyAlpha),x.push(w.flipY),x.push(w.unpackAlignment),x.push(w.colorSpace),x.join()}function Z(w,x){let O=n.get(w);if(w.isVideoTexture&&fe(w),w.isRenderTargetTexture===!1&&w.isExternalTexture!==!0&&w.version>0&&O.__version!==w.version){let X=w.image;if(X===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(X.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{J(O,w,x);return}}else w.isExternalTexture&&(O.__webglTexture=w.sourceTexture?w.sourceTexture:null);t.bindTexture(i.TEXTURE_2D,O.__webglTexture,i.TEXTURE0+x)}function Y(w,x){let O=n.get(w);if(w.isRenderTargetTexture===!1&&w.version>0&&O.__version!==w.version){J(O,w,x);return}t.bindTexture(i.TEXTURE_2D_ARRAY,O.__webglTexture,i.TEXTURE0+x)}function he(w,x){let O=n.get(w);if(w.isRenderTargetTexture===!1&&w.version>0&&O.__version!==w.version){J(O,w,x);return}t.bindTexture(i.TEXTURE_3D,O.__webglTexture,i.TEXTURE0+x)}function W(w,x){let O=n.get(w);if(w.version>0&&O.__version!==w.version){ae(O,w,x);return}t.bindTexture(i.TEXTURE_CUBE_MAP,O.__webglTexture,i.TEXTURE0+x)}let ve={[xa]:i.REPEAT,[Ui]:i.CLAMP_TO_EDGE,[_a]:i.MIRRORED_REPEAT},Me={[cn]:i.NEAREST,[gd]:i.NEAREST_MIPMAP_NEAREST,[Eo]:i.NEAREST_MIPMAP_LINEAR,[kn]:i.LINEAR,[ja]:i.LINEAR_MIPMAP_NEAREST,[zi]:i.LINEAR_MIPMAP_LINEAR},Ae={[Ed]:i.NEVER,[Id]:i.ALWAYS,[wd]:i.LESS,[rh]:i.LEQUAL,[Td]:i.EQUAL,[Cd]:i.GEQUAL,[Ad]:i.GREATER,[Rd]:i.NOTEQUAL};function He(w,x){if(x.type===Pn&&e.has("OES_texture_float_linear")===!1&&(x.magFilter===kn||x.magFilter===ja||x.magFilter===Eo||x.magFilter===zi||x.minFilter===kn||x.minFilter===ja||x.minFilter===Eo||x.minFilter===zi)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(w,i.TEXTURE_WRAP_S,ve[x.wrapS]),i.texParameteri(w,i.TEXTURE_WRAP_T,ve[x.wrapT]),(w===i.TEXTURE_3D||w===i.TEXTURE_2D_ARRAY)&&i.texParameteri(w,i.TEXTURE_WRAP_R,ve[x.wrapR]),i.texParameteri(w,i.TEXTURE_MAG_FILTER,Me[x.magFilter]),i.texParameteri(w,i.TEXTURE_MIN_FILTER,Me[x.minFilter]),x.compareFunction&&(i.texParameteri(w,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(w,i.TEXTURE_COMPARE_FUNC,Ae[x.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(x.magFilter===cn||x.minFilter!==Eo&&x.minFilter!==zi||x.type===Pn&&e.has("OES_texture_float_linear")===!1)return;if(x.anisotropy>1||n.get(x).__currentAnisotropy){let O=e.get("EXT_texture_filter_anisotropic");i.texParameterf(w,O.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(x.anisotropy,s.getMaxAnisotropy())),n.get(x).__currentAnisotropy=x.anisotropy}}}function et(w,x){let O=!1;w.__webglInit===void 0&&(w.__webglInit=!0,x.addEventListener("dispose",A));let X=x.source,te=d.get(X);te===void 0&&(te={},d.set(X,te));let $=q(x);if($!==w.__cacheKey){te[$]===void 0&&(te[$]={texture:i.createTexture(),usedTimes:0},o.memory.textures++,O=!0),te[$].usedTimes++;let De=te[w.__cacheKey];De!==void 0&&(te[w.__cacheKey].usedTimes--,De.usedTimes===0&&b(x)),w.__cacheKey=$,w.__webglTexture=te[$].texture}return O}function at(w,x,O){return Math.floor(Math.floor(w/O)/x)}function it(w,x,O,X){let $=w.updateRanges;if($.length===0)t.texSubImage2D(i.TEXTURE_2D,0,0,0,x.width,x.height,O,X,x.data);else{$.sort((de,we)=>de.start-we.start);let De=0;for(let de=1;de<$.length;de++){let we=$[De],Ge=$[de],Fe=we.start+we.count,be=at(Ge.start,x.width,4),U=at(we.start,x.width,4);Ge.start<=Fe+1&&be===U&&at(Ge.start+Ge.count-1,x.width,4)===be?we.count=Math.max(we.count,Ge.start+Ge.count-we.start):(++De,$[De]=Ge)}$.length=De+1;let ge=i.getParameter(i.UNPACK_ROW_LENGTH),Ie=i.getParameter(i.UNPACK_SKIP_PIXELS),Le=i.getParameter(i.UNPACK_SKIP_ROWS);i.pixelStorei(i.UNPACK_ROW_LENGTH,x.width);for(let de=0,we=$.length;de<we;de++){let Ge=$[de],Fe=Math.floor(Ge.start/4),be=Math.ceil(Ge.count/4),U=Fe%x.width,T=Math.floor(Fe/x.width),k=be,re=1;i.pixelStorei(i.UNPACK_SKIP_PIXELS,U),i.pixelStorei(i.UNPACK_SKIP_ROWS,T),t.texSubImage2D(i.TEXTURE_2D,0,U,T,k,re,O,X,x.data)}w.clearUpdateRanges(),i.pixelStorei(i.UNPACK_ROW_LENGTH,ge),i.pixelStorei(i.UNPACK_SKIP_PIXELS,Ie),i.pixelStorei(i.UNPACK_SKIP_ROWS,Le)}}function J(w,x,O){let X=i.TEXTURE_2D;(x.isDataArrayTexture||x.isCompressedArrayTexture)&&(X=i.TEXTURE_2D_ARRAY),x.isData3DTexture&&(X=i.TEXTURE_3D);let te=et(w,x),$=x.source;t.bindTexture(X,w.__webglTexture,i.TEXTURE0+O);let De=n.get($);if($.version!==De.__version||te===!0){t.activeTexture(i.TEXTURE0+O);let ge=lt.getPrimaries(lt.workingColorSpace),Ie=x.colorSpace===_i?null:lt.getPrimaries(x.colorSpace),Le=x.colorSpace===_i||ge===Ie?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,x.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,x.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Le);let de=v(x.image,!1,s.maxTextureSize);de=Xe(x,de);let we=r.convert(x.format,x.colorSpace),Ge=r.convert(x.type),Fe=y(x.internalFormat,we,Ge,x.colorSpace,x.isVideoTexture);He(X,x);let be,U=x.mipmaps,T=x.isVideoTexture!==!0,k=De.__version===void 0||te===!0,re=$.dataReady,xe=R(x,de);if(x.isDepthTexture)Fe=_(x.format===ar,x.type),k&&(T?t.texStorage2D(i.TEXTURE_2D,1,Fe,de.width,de.height):t.texImage2D(i.TEXTURE_2D,0,Fe,de.width,de.height,0,we,Ge,null));else if(x.isDataTexture)if(U.length>0){T&&k&&t.texStorage2D(i.TEXTURE_2D,xe,Fe,U[0].width,U[0].height);for(let Q=0,K=U.length;Q<K;Q++)be=U[Q],T?re&&t.texSubImage2D(i.TEXTURE_2D,Q,0,0,be.width,be.height,we,Ge,be.data):t.texImage2D(i.TEXTURE_2D,Q,Fe,be.width,be.height,0,we,Ge,be.data);x.generateMipmaps=!1}else T?(k&&t.texStorage2D(i.TEXTURE_2D,xe,Fe,de.width,de.height),re&&it(x,de,we,Ge)):t.texImage2D(i.TEXTURE_2D,0,Fe,de.width,de.height,0,we,Ge,de.data);else if(x.isCompressedTexture)if(x.isCompressedArrayTexture){T&&k&&t.texStorage3D(i.TEXTURE_2D_ARRAY,xe,Fe,U[0].width,U[0].height,de.depth);for(let Q=0,K=U.length;Q<K;Q++)if(be=U[Q],x.format!==Sn)if(we!==null)if(T){if(re)if(x.layerUpdates.size>0){let _e=ph(be.width,be.height,x.format,x.type);for(let Ue of x.layerUpdates){let Be=be.data.subarray(Ue*_e/be.data.BYTES_PER_ELEMENT,(Ue+1)*_e/be.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,Q,0,0,Ue,be.width,be.height,1,we,Be)}x.clearLayerUpdates()}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,Q,0,0,0,be.width,be.height,de.depth,we,be.data)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,Q,Fe,be.width,be.height,de.depth,0,be.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else T?re&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,Q,0,0,0,be.width,be.height,de.depth,we,Ge,be.data):t.texImage3D(i.TEXTURE_2D_ARRAY,Q,Fe,be.width,be.height,de.depth,0,we,Ge,be.data)}else{T&&k&&t.texStorage2D(i.TEXTURE_2D,xe,Fe,U[0].width,U[0].height);for(let Q=0,K=U.length;Q<K;Q++)be=U[Q],x.format!==Sn?we!==null?T?re&&t.compressedTexSubImage2D(i.TEXTURE_2D,Q,0,0,be.width,be.height,we,be.data):t.compressedTexImage2D(i.TEXTURE_2D,Q,Fe,be.width,be.height,0,be.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):T?re&&t.texSubImage2D(i.TEXTURE_2D,Q,0,0,be.width,be.height,we,Ge,be.data):t.texImage2D(i.TEXTURE_2D,Q,Fe,be.width,be.height,0,we,Ge,be.data)}else if(x.isDataArrayTexture)if(T){if(k&&t.texStorage3D(i.TEXTURE_2D_ARRAY,xe,Fe,de.width,de.height,de.depth),re)if(x.layerUpdates.size>0){let Q=ph(de.width,de.height,x.format,x.type);for(let K of x.layerUpdates){let _e=de.data.subarray(K*Q/de.data.BYTES_PER_ELEMENT,(K+1)*Q/de.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,K,de.width,de.height,1,we,Ge,_e)}x.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,de.width,de.height,de.depth,we,Ge,de.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,Fe,de.width,de.height,de.depth,0,we,Ge,de.data);else if(x.isData3DTexture)T?(k&&t.texStorage3D(i.TEXTURE_3D,xe,Fe,de.width,de.height,de.depth),re&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,de.width,de.height,de.depth,we,Ge,de.data)):t.texImage3D(i.TEXTURE_3D,0,Fe,de.width,de.height,de.depth,0,we,Ge,de.data);else if(x.isFramebufferTexture){if(k)if(T)t.texStorage2D(i.TEXTURE_2D,xe,Fe,de.width,de.height);else{let Q=de.width,K=de.height;for(let _e=0;_e<xe;_e++)t.texImage2D(i.TEXTURE_2D,_e,Fe,Q,K,0,we,Ge,null),Q>>=1,K>>=1}}else if(U.length>0){if(T&&k){let Q=$e(U[0]);t.texStorage2D(i.TEXTURE_2D,xe,Fe,Q.width,Q.height)}for(let Q=0,K=U.length;Q<K;Q++)be=U[Q],T?re&&t.texSubImage2D(i.TEXTURE_2D,Q,0,0,we,Ge,be):t.texImage2D(i.TEXTURE_2D,Q,Fe,we,Ge,be);x.generateMipmaps=!1}else if(T){if(k){let Q=$e(de);t.texStorage2D(i.TEXTURE_2D,xe,Fe,Q.width,Q.height)}re&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,we,Ge,de)}else t.texImage2D(i.TEXTURE_2D,0,Fe,we,Ge,de);m(x)&&p(X),De.__version=$.version,x.onUpdate&&x.onUpdate(x)}w.__version=x.version}function ae(w,x,O){if(x.image.length!==6)return;let X=et(w,x),te=x.source;t.bindTexture(i.TEXTURE_CUBE_MAP,w.__webglTexture,i.TEXTURE0+O);let $=n.get(te);if(te.version!==$.__version||X===!0){t.activeTexture(i.TEXTURE0+O);let De=lt.getPrimaries(lt.workingColorSpace),ge=x.colorSpace===_i?null:lt.getPrimaries(x.colorSpace),Ie=x.colorSpace===_i||De===ge?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,x.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,x.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ie);let Le=x.isCompressedTexture||x.image[0].isCompressedTexture,de=x.image[0]&&x.image[0].isDataTexture,we=[];for(let K=0;K<6;K++)!Le&&!de?we[K]=v(x.image[K],!0,s.maxCubemapSize):we[K]=de?x.image[K].image:x.image[K],we[K]=Xe(x,we[K]);let Ge=we[0],Fe=r.convert(x.format,x.colorSpace),be=r.convert(x.type),U=y(x.internalFormat,Fe,be,x.colorSpace),T=x.isVideoTexture!==!0,k=$.__version===void 0||X===!0,re=te.dataReady,xe=R(x,Ge);He(i.TEXTURE_CUBE_MAP,x);let Q;if(Le){T&&k&&t.texStorage2D(i.TEXTURE_CUBE_MAP,xe,U,Ge.width,Ge.height);for(let K=0;K<6;K++){Q=we[K].mipmaps;for(let _e=0;_e<Q.length;_e++){let Ue=Q[_e];x.format!==Sn?Fe!==null?T?re&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,_e,0,0,Ue.width,Ue.height,Fe,Ue.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,_e,U,Ue.width,Ue.height,0,Ue.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):T?re&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,_e,0,0,Ue.width,Ue.height,Fe,be,Ue.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,_e,U,Ue.width,Ue.height,0,Fe,be,Ue.data)}}}else{if(Q=x.mipmaps,T&&k){Q.length>0&&xe++;let K=$e(we[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,xe,U,K.width,K.height)}for(let K=0;K<6;K++)if(de){T?re&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,0,0,0,we[K].width,we[K].height,Fe,be,we[K].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,0,U,we[K].width,we[K].height,0,Fe,be,we[K].data);for(let _e=0;_e<Q.length;_e++){let Be=Q[_e].image[K].image;T?re&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,_e+1,0,0,Be.width,Be.height,Fe,be,Be.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,_e+1,U,Be.width,Be.height,0,Fe,be,Be.data)}}else{T?re&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,0,0,0,Fe,be,we[K]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,0,U,Fe,be,we[K]);for(let _e=0;_e<Q.length;_e++){let Ue=Q[_e];T?re&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,_e+1,0,0,Fe,be,Ue.image[K]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,_e+1,U,Fe,be,Ue.image[K])}}}m(x)&&p(i.TEXTURE_CUBE_MAP),$.__version=te.version,x.onUpdate&&x.onUpdate(x)}w.__version=x.version}function Re(w,x,O,X,te,$){let De=r.convert(O.format,O.colorSpace),ge=r.convert(O.type),Ie=y(O.internalFormat,De,ge,O.colorSpace),Le=n.get(x),de=n.get(O);if(de.__renderTarget=x,!Le.__hasExternalTextures){let we=Math.max(1,x.width>>$),Ge=Math.max(1,x.height>>$);te===i.TEXTURE_3D||te===i.TEXTURE_2D_ARRAY?t.texImage3D(te,$,Ie,we,Ge,x.depth,0,De,ge,null):t.texImage2D(te,$,Ie,we,Ge,0,De,ge,null)}t.bindFramebuffer(i.FRAMEBUFFER,w),ce(x)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,X,te,de.__webglTexture,0,me(x)):(te===i.TEXTURE_2D||te>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&te<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,X,te,de.__webglTexture,$),t.bindFramebuffer(i.FRAMEBUFFER,null)}function Oe(w,x,O){if(i.bindRenderbuffer(i.RENDERBUFFER,w),x.depthBuffer){let X=x.depthTexture,te=X&&X.isDepthTexture?X.type:null,$=_(x.stencilBuffer,te),De=x.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ge=me(x);ce(x)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,ge,$,x.width,x.height):O?i.renderbufferStorageMultisample(i.RENDERBUFFER,ge,$,x.width,x.height):i.renderbufferStorage(i.RENDERBUFFER,$,x.width,x.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,De,i.RENDERBUFFER,w)}else{let X=x.textures;for(let te=0;te<X.length;te++){let $=X[te],De=r.convert($.format,$.colorSpace),ge=r.convert($.type),Ie=y($.internalFormat,De,ge,$.colorSpace),Le=me(x);O&&ce(x)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,Le,Ie,x.width,x.height):ce(x)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Le,Ie,x.width,x.height):i.renderbufferStorage(i.RENDERBUFFER,Ie,x.width,x.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function Pe(w,x){if(x&&x.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(i.FRAMEBUFFER,w),!(x.depthTexture&&x.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");let X=n.get(x.depthTexture);X.__renderTarget=x,(!X.__webglTexture||x.depthTexture.image.width!==x.width||x.depthTexture.image.height!==x.height)&&(x.depthTexture.image.width=x.width,x.depthTexture.image.height=x.height,x.depthTexture.needsUpdate=!0),Z(x.depthTexture,0);let te=X.__webglTexture,$=me(x);if(x.depthTexture.format===qs)ce(x)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,te,0,$):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,te,0);else if(x.depthTexture.format===ar)ce(x)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,te,0,$):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,te,0);else throw new Error("Unknown depthTexture format")}function Qe(w){let x=n.get(w),O=w.isWebGLCubeRenderTarget===!0;if(x.__boundDepthTexture!==w.depthTexture){let X=w.depthTexture;if(x.__depthDisposeCallback&&x.__depthDisposeCallback(),X){let te=()=>{delete x.__boundDepthTexture,delete x.__depthDisposeCallback,X.removeEventListener("dispose",te)};X.addEventListener("dispose",te),x.__depthDisposeCallback=te}x.__boundDepthTexture=X}if(w.depthTexture&&!x.__autoAllocateDepthBuffer){if(O)throw new Error("target.depthTexture not supported in Cube render targets");let X=w.texture.mipmaps;X&&X.length>0?Pe(x.__webglFramebuffer[0],w):Pe(x.__webglFramebuffer,w)}else if(O){x.__webglDepthbuffer=[];for(let X=0;X<6;X++)if(t.bindFramebuffer(i.FRAMEBUFFER,x.__webglFramebuffer[X]),x.__webglDepthbuffer[X]===void 0)x.__webglDepthbuffer[X]=i.createRenderbuffer(),Oe(x.__webglDepthbuffer[X],w,!1);else{let te=w.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,$=x.__webglDepthbuffer[X];i.bindRenderbuffer(i.RENDERBUFFER,$),i.framebufferRenderbuffer(i.FRAMEBUFFER,te,i.RENDERBUFFER,$)}}else{let X=w.texture.mipmaps;if(X&&X.length>0?t.bindFramebuffer(i.FRAMEBUFFER,x.__webglFramebuffer[0]):t.bindFramebuffer(i.FRAMEBUFFER,x.__webglFramebuffer),x.__webglDepthbuffer===void 0)x.__webglDepthbuffer=i.createRenderbuffer(),Oe(x.__webglDepthbuffer,w,!1);else{let te=w.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,$=x.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,$),i.framebufferRenderbuffer(i.FRAMEBUFFER,te,i.RENDERBUFFER,$)}}t.bindFramebuffer(i.FRAMEBUFFER,null)}function gt(w,x,O){let X=n.get(w);x!==void 0&&Re(X.__webglFramebuffer,w,w.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),O!==void 0&&Qe(w)}function P(w){let x=w.texture,O=n.get(w),X=n.get(x);w.addEventListener("dispose",I);let te=w.textures,$=w.isWebGLCubeRenderTarget===!0,De=te.length>1;if(De||(X.__webglTexture===void 0&&(X.__webglTexture=i.createTexture()),X.__version=x.version,o.memory.textures++),$){O.__webglFramebuffer=[];for(let ge=0;ge<6;ge++)if(x.mipmaps&&x.mipmaps.length>0){O.__webglFramebuffer[ge]=[];for(let Ie=0;Ie<x.mipmaps.length;Ie++)O.__webglFramebuffer[ge][Ie]=i.createFramebuffer()}else O.__webglFramebuffer[ge]=i.createFramebuffer()}else{if(x.mipmaps&&x.mipmaps.length>0){O.__webglFramebuffer=[];for(let ge=0;ge<x.mipmaps.length;ge++)O.__webglFramebuffer[ge]=i.createFramebuffer()}else O.__webglFramebuffer=i.createFramebuffer();if(De)for(let ge=0,Ie=te.length;ge<Ie;ge++){let Le=n.get(te[ge]);Le.__webglTexture===void 0&&(Le.__webglTexture=i.createTexture(),o.memory.textures++)}if(w.samples>0&&ce(w)===!1){O.__webglMultisampledFramebuffer=i.createFramebuffer(),O.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,O.__webglMultisampledFramebuffer);for(let ge=0;ge<te.length;ge++){let Ie=te[ge];O.__webglColorRenderbuffer[ge]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,O.__webglColorRenderbuffer[ge]);let Le=r.convert(Ie.format,Ie.colorSpace),de=r.convert(Ie.type),we=y(Ie.internalFormat,Le,de,Ie.colorSpace,w.isXRRenderTarget===!0),Ge=me(w);i.renderbufferStorageMultisample(i.RENDERBUFFER,Ge,we,w.width,w.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ge,i.RENDERBUFFER,O.__webglColorRenderbuffer[ge])}i.bindRenderbuffer(i.RENDERBUFFER,null),w.depthBuffer&&(O.__webglDepthRenderbuffer=i.createRenderbuffer(),Oe(O.__webglDepthRenderbuffer,w,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if($){t.bindTexture(i.TEXTURE_CUBE_MAP,X.__webglTexture),He(i.TEXTURE_CUBE_MAP,x);for(let ge=0;ge<6;ge++)if(x.mipmaps&&x.mipmaps.length>0)for(let Ie=0;Ie<x.mipmaps.length;Ie++)Re(O.__webglFramebuffer[ge][Ie],w,x,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+ge,Ie);else Re(O.__webglFramebuffer[ge],w,x,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+ge,0);m(x)&&p(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(De){for(let ge=0,Ie=te.length;ge<Ie;ge++){let Le=te[ge],de=n.get(Le),we=i.TEXTURE_2D;(w.isWebGL3DRenderTarget||w.isWebGLArrayRenderTarget)&&(we=w.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(we,de.__webglTexture),He(we,Le),Re(O.__webglFramebuffer,w,Le,i.COLOR_ATTACHMENT0+ge,we,0),m(Le)&&p(we)}t.unbindTexture()}else{let ge=i.TEXTURE_2D;if((w.isWebGL3DRenderTarget||w.isWebGLArrayRenderTarget)&&(ge=w.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(ge,X.__webglTexture),He(ge,x),x.mipmaps&&x.mipmaps.length>0)for(let Ie=0;Ie<x.mipmaps.length;Ie++)Re(O.__webglFramebuffer[Ie],w,x,i.COLOR_ATTACHMENT0,ge,Ie);else Re(O.__webglFramebuffer,w,x,i.COLOR_ATTACHMENT0,ge,0);m(x)&&p(ge),t.unbindTexture()}w.depthBuffer&&Qe(w)}function le(w){let x=w.textures;for(let O=0,X=x.length;O<X;O++){let te=x[O];if(m(te)){let $=E(w),De=n.get(te).__webglTexture;t.bindTexture($,De),p($),t.unbindTexture()}}}let ne=[],ee=[];function j(w){if(w.samples>0){if(ce(w)===!1){let x=w.textures,O=w.width,X=w.height,te=i.COLOR_BUFFER_BIT,$=w.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,De=n.get(w),ge=x.length>1;if(ge)for(let Le=0;Le<x.length;Le++)t.bindFramebuffer(i.FRAMEBUFFER,De.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Le,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,De.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Le,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,De.__webglMultisampledFramebuffer);let Ie=w.texture.mipmaps;Ie&&Ie.length>0?t.bindFramebuffer(i.DRAW_FRAMEBUFFER,De.__webglFramebuffer[0]):t.bindFramebuffer(i.DRAW_FRAMEBUFFER,De.__webglFramebuffer);for(let Le=0;Le<x.length;Le++){if(w.resolveDepthBuffer&&(w.depthBuffer&&(te|=i.DEPTH_BUFFER_BIT),w.stencilBuffer&&w.resolveStencilBuffer&&(te|=i.STENCIL_BUFFER_BIT)),ge){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,De.__webglColorRenderbuffer[Le]);let de=n.get(x[Le]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,de,0)}i.blitFramebuffer(0,0,O,X,0,0,O,X,te,i.NEAREST),l===!0&&(ne.length=0,ee.length=0,ne.push(i.COLOR_ATTACHMENT0+Le),w.depthBuffer&&w.resolveDepthBuffer===!1&&(ne.push($),ee.push($),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,ee)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,ne))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),ge)for(let Le=0;Le<x.length;Le++){t.bindFramebuffer(i.FRAMEBUFFER,De.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Le,i.RENDERBUFFER,De.__webglColorRenderbuffer[Le]);let de=n.get(x[Le]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,De.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Le,i.TEXTURE_2D,de,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,De.__webglMultisampledFramebuffer)}else if(w.depthBuffer&&w.resolveDepthBuffer===!1&&l){let x=w.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[x])}}}function me(w){return Math.min(s.maxSamples,w.samples)}function ce(w){let x=n.get(w);return w.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&x.__useRenderToTexture!==!1}function fe(w){let x=o.render.frame;h.get(w)!==x&&(h.set(w,x),w.update())}function Xe(w,x){let O=w.colorSpace,X=w.format,te=w.type;return w.isCompressedTexture===!0||w.isVideoTexture===!0||O!==hs&&O!==_i&&(lt.getTransfer(O)===pt?(X!==Sn||te!==Wn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",O)),x}function $e(w){return typeof HTMLImageElement<"u"&&w instanceof HTMLImageElement?(c.width=w.naturalWidth||w.width,c.height=w.naturalHeight||w.height):typeof VideoFrame<"u"&&w instanceof VideoFrame?(c.width=w.displayWidth,c.height=w.displayHeight):(c.width=w.width,c.height=w.height),c}this.allocateTextureUnit=G,this.resetTextureUnits=z,this.setTexture2D=Z,this.setTexture2DArray=Y,this.setTexture3D=he,this.setTextureCube=W,this.rebindTextures=gt,this.setupRenderTarget=P,this.updateRenderTargetMipmap=le,this.updateMultisampleRenderTarget=j,this.setupDepthRenderbuffer=Qe,this.setupFrameBufferTexture=Re,this.useMultisampledRTT=ce}function G_(i,e){function t(n,s=_i){let r,o=lt.getTransfer(s);if(n===Wn)return i.UNSIGNED_BYTE;if(n===el)return i.UNSIGNED_SHORT_4_4_4_4;if(n===tl)return i.UNSIGNED_SHORT_5_5_5_1;if(n===Qc)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===eh)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===Kc)return i.BYTE;if(n===jc)return i.SHORT;if(n===sr)return i.UNSIGNED_SHORT;if(n===Qa)return i.INT;if(n===ki)return i.UNSIGNED_INT;if(n===Pn)return i.FLOAT;if(n===rr)return i.HALF_FLOAT;if(n===th)return i.ALPHA;if(n===nh)return i.RGB;if(n===Sn)return i.RGBA;if(n===qs)return i.DEPTH_COMPONENT;if(n===ar)return i.DEPTH_STENCIL;if(n===nl)return i.RED;if(n===il)return i.RED_INTEGER;if(n===ih)return i.RG;if(n===sl)return i.RG_INTEGER;if(n===rl)return i.RGBA_INTEGER;if(n===wo||n===To||n===Ao||n===Ro)if(o===pt)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===wo)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===To)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Ao)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Ro)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===wo)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===To)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Ao)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Ro)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===ol||n===al||n===ll||n===cl)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===ol)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===al)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===ll)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===cl)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===hl||n===ul||n===dl)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(n===hl||n===ul)return o===pt?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===dl)return o===pt?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===fl||n===pl||n===ml||n===gl||n===xl||n===_l||n===vl||n===yl||n===Ml||n===bl||n===Sl||n===El||n===wl||n===Tl)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(n===fl)return o===pt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===pl)return o===pt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===ml)return o===pt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===gl)return o===pt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===xl)return o===pt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===_l)return o===pt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===vl)return o===pt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===yl)return o===pt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Ml)return o===pt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===bl)return o===pt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Sl)return o===pt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===El)return o===pt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===wl)return o===pt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Tl)return o===pt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Al||n===Rl||n===Cl)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(n===Al)return o===pt?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Rl)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Cl)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Il||n===Pl||n===Dl||n===Ll)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(n===Il)return r.COMPRESSED_RED_RGTC1_EXT;if(n===Pl)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Dl)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Ll)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===or?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:t}}var W_=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,X_=`
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

}`,Ah=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let n=new no(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,n=new yn({vertexShader:W_,fragmentShader:X_,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Lt(new Bi(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},Rh=class extends Jn{constructor(e,t){super();let n=this,s=null,r=1,o=null,a="local-floor",l=1,c=null,h=null,u=null,d=null,f=null,g=null,v=typeof XRWebGLBinding<"u",m=new Ah,p={},E=t.getContextAttributes(),y=null,_=null,R=[],A=[],I=new ye,L=null,b=new Wt;b.viewport=new ht;let M=new Wt;M.viewport=new ht;let D=[b,M],z=new Ba,G=null,q=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(J){let ae=R[J];return ae===void 0&&(ae=new Ks,R[J]=ae),ae.getTargetRaySpace()},this.getControllerGrip=function(J){let ae=R[J];return ae===void 0&&(ae=new Ks,R[J]=ae),ae.getGripSpace()},this.getHand=function(J){let ae=R[J];return ae===void 0&&(ae=new Ks,R[J]=ae),ae.getHandSpace()};function Z(J){let ae=A.indexOf(J.inputSource);if(ae===-1)return;let Re=R[ae];Re!==void 0&&(Re.update(J.inputSource,J.frame,c||o),Re.dispatchEvent({type:J.type,data:J.inputSource}))}function Y(){s.removeEventListener("select",Z),s.removeEventListener("selectstart",Z),s.removeEventListener("selectend",Z),s.removeEventListener("squeeze",Z),s.removeEventListener("squeezestart",Z),s.removeEventListener("squeezeend",Z),s.removeEventListener("end",Y),s.removeEventListener("inputsourceschange",he);for(let J=0;J<R.length;J++){let ae=A[J];ae!==null&&(A[J]=null,R[J].disconnect(ae))}G=null,q=null,m.reset();for(let J in p)delete p[J];e.setRenderTarget(y),f=null,d=null,u=null,s=null,_=null,it.stop(),n.isPresenting=!1,e.setPixelRatio(L),e.setSize(I.width,I.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(J){r=J,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(J){a=J,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(J){c=J},this.getBaseLayer=function(){return d!==null?d:f},this.getBinding=function(){return u===null&&v&&(u=new XRWebGLBinding(s,t)),u},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(J){if(s=J,s!==null){if(y=e.getRenderTarget(),s.addEventListener("select",Z),s.addEventListener("selectstart",Z),s.addEventListener("selectend",Z),s.addEventListener("squeeze",Z),s.addEventListener("squeezestart",Z),s.addEventListener("squeezeend",Z),s.addEventListener("end",Y),s.addEventListener("inputsourceschange",he),E.xrCompatible!==!0&&await t.makeXRCompatible(),L=e.getPixelRatio(),e.getSize(I),v&&"createProjectionLayer"in XRWebGLBinding.prototype){let Re=null,Oe=null,Pe=null;E.depth&&(Pe=E.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,Re=E.stencil?ar:qs,Oe=E.stencil?or:ki);let Qe={colorFormat:t.RGBA8,depthFormat:Pe,scaleFactor:r};u=this.getBinding(),d=u.createProjectionLayer(Qe),s.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),_=new Kn(d.textureWidth,d.textureHeight,{format:Sn,type:Wn,depthTexture:new to(d.textureWidth,d.textureHeight,Oe,void 0,void 0,void 0,void 0,void 0,void 0,Re),stencilBuffer:E.stencil,colorSpace:e.outputColorSpace,samples:E.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1})}else{let Re={antialias:E.antialias,alpha:!0,depth:E.depth,stencil:E.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(s,t,Re),s.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),_=new Kn(f.framebufferWidth,f.framebufferHeight,{format:Sn,type:Wn,colorSpace:e.outputColorSpace,stencilBuffer:E.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}_.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await s.requestReferenceSpace(a),it.setContext(s),it.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function he(J){for(let ae=0;ae<J.removed.length;ae++){let Re=J.removed[ae],Oe=A.indexOf(Re);Oe>=0&&(A[Oe]=null,R[Oe].disconnect(Re))}for(let ae=0;ae<J.added.length;ae++){let Re=J.added[ae],Oe=A.indexOf(Re);if(Oe===-1){for(let Qe=0;Qe<R.length;Qe++)if(Qe>=A.length){A.push(Re),Oe=Qe;break}else if(A[Qe]===null){A[Qe]=Re,Oe=Qe;break}if(Oe===-1)break}let Pe=R[Oe];Pe&&Pe.connect(Re)}}let W=new C,ve=new C;function Me(J,ae,Re){W.setFromMatrixPosition(ae.matrixWorld),ve.setFromMatrixPosition(Re.matrixWorld);let Oe=W.distanceTo(ve),Pe=ae.projectionMatrix.elements,Qe=Re.projectionMatrix.elements,gt=Pe[14]/(Pe[10]-1),P=Pe[14]/(Pe[10]+1),le=(Pe[9]+1)/Pe[5],ne=(Pe[9]-1)/Pe[5],ee=(Pe[8]-1)/Pe[0],j=(Qe[8]+1)/Qe[0],me=gt*ee,ce=gt*j,fe=Oe/(-ee+j),Xe=fe*-ee;if(ae.matrixWorld.decompose(J.position,J.quaternion,J.scale),J.translateX(Xe),J.translateZ(fe),J.matrixWorld.compose(J.position,J.quaternion,J.scale),J.matrixWorldInverse.copy(J.matrixWorld).invert(),Pe[10]===-1)J.projectionMatrix.copy(ae.projectionMatrix),J.projectionMatrixInverse.copy(ae.projectionMatrixInverse);else{let $e=gt+fe,w=P+fe,x=me-Xe,O=ce+(Oe-Xe),X=le*P/w*$e,te=ne*P/w*$e;J.projectionMatrix.makePerspective(x,O,X,te,$e,w),J.projectionMatrixInverse.copy(J.projectionMatrix).invert()}}function Ae(J,ae){ae===null?J.matrixWorld.copy(J.matrix):J.matrixWorld.multiplyMatrices(ae.matrixWorld,J.matrix),J.matrixWorldInverse.copy(J.matrixWorld).invert()}this.updateCamera=function(J){if(s===null)return;let ae=J.near,Re=J.far;m.texture!==null&&(m.depthNear>0&&(ae=m.depthNear),m.depthFar>0&&(Re=m.depthFar)),z.near=M.near=b.near=ae,z.far=M.far=b.far=Re,(G!==z.near||q!==z.far)&&(s.updateRenderState({depthNear:z.near,depthFar:z.far}),G=z.near,q=z.far),z.layers.mask=J.layers.mask|6,b.layers.mask=z.layers.mask&3,M.layers.mask=z.layers.mask&5;let Oe=J.parent,Pe=z.cameras;Ae(z,Oe);for(let Qe=0;Qe<Pe.length;Qe++)Ae(Pe[Qe],Oe);Pe.length===2?Me(z,b,M):z.projectionMatrix.copy(b.projectionMatrix),He(J,z,Oe)};function He(J,ae,Re){Re===null?J.matrix.copy(ae.matrixWorld):(J.matrix.copy(Re.matrixWorld),J.matrix.invert(),J.matrix.multiply(ae.matrixWorld)),J.matrix.decompose(J.position,J.quaternion,J.scale),J.updateMatrixWorld(!0),J.projectionMatrix.copy(ae.projectionMatrix),J.projectionMatrixInverse.copy(ae.projectionMatrixInverse),J.isPerspectiveCamera&&(J.fov=Ys*2*Math.atan(1/J.projectionMatrix.elements[5]),J.zoom=1)}this.getCamera=function(){return z},this.getFoveation=function(){if(!(d===null&&f===null))return l},this.setFoveation=function(J){l=J,d!==null&&(d.fixedFoveation=J),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=J)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(z)},this.getCameraTexture=function(J){return p[J]};let et=null;function at(J,ae){if(h=ae.getViewerPose(c||o),g=ae,h!==null){let Re=h.views;f!==null&&(e.setRenderTargetFramebuffer(_,f.framebuffer),e.setRenderTarget(_));let Oe=!1;Re.length!==z.cameras.length&&(z.cameras.length=0,Oe=!0);for(let P=0;P<Re.length;P++){let le=Re[P],ne=null;if(f!==null)ne=f.getViewport(le);else{let j=u.getViewSubImage(d,le);ne=j.viewport,P===0&&(e.setRenderTargetTextures(_,j.colorTexture,j.depthStencilTexture),e.setRenderTarget(_))}let ee=D[P];ee===void 0&&(ee=new Wt,ee.layers.enable(P),ee.viewport=new ht,D[P]=ee),ee.matrix.fromArray(le.transform.matrix),ee.matrix.decompose(ee.position,ee.quaternion,ee.scale),ee.projectionMatrix.fromArray(le.projectionMatrix),ee.projectionMatrixInverse.copy(ee.projectionMatrix).invert(),ee.viewport.set(ne.x,ne.y,ne.width,ne.height),P===0&&(z.matrix.copy(ee.matrix),z.matrix.decompose(z.position,z.quaternion,z.scale)),Oe===!0&&z.cameras.push(ee)}let Pe=s.enabledFeatures;if(Pe&&Pe.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&v){u=n.getBinding();let P=u.getDepthInformation(Re[0]);P&&P.isValid&&P.texture&&m.init(P,s.renderState)}if(Pe&&Pe.includes("camera-access")&&v){e.state.unbindTexture(),u=n.getBinding();for(let P=0;P<Re.length;P++){let le=Re[P].camera;if(le){let ne=p[le];ne||(ne=new no,p[le]=ne);let ee=u.getCameraImage(le);ne.sourceTexture=ee}}}}for(let Re=0;Re<R.length;Re++){let Oe=A[Re],Pe=R[Re];Oe!==null&&Pe!==void 0&&Pe.update(Oe,ae,c||o)}et&&et(J,ae),ae.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:ae}),g=null}let it=new uf;it.setAnimationLoop(at),this.setAnimationLoop=function(J){et=J},this.dispose=function(){}}},Ss=new Hn,$_=new nt;function q_(i,e){function t(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function n(m,p){p.color.getRGB(m.fogColor.value,hh(i)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function s(m,p,E,y,_){p.isMeshBasicMaterial||p.isMeshLambertMaterial?r(m,p):p.isMeshToonMaterial?(r(m,p),u(m,p)):p.isMeshPhongMaterial?(r(m,p),h(m,p)):p.isMeshStandardMaterial?(r(m,p),d(m,p),p.isMeshPhysicalMaterial&&f(m,p,_)):p.isMeshMatcapMaterial?(r(m,p),g(m,p)):p.isMeshDepthMaterial?r(m,p):p.isMeshDistanceMaterial?(r(m,p),v(m,p)):p.isMeshNormalMaterial?r(m,p):p.isLineBasicMaterial?(o(m,p),p.isLineDashedMaterial&&a(m,p)):p.isPointsMaterial?l(m,p,E,y):p.isSpriteMaterial?c(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,t(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===sn&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,t(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===sn&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,t(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,t(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);let E=e.get(p),y=E.envMap,_=E.envMapRotation;y&&(m.envMap.value=y,Ss.copy(_),Ss.x*=-1,Ss.y*=-1,Ss.z*=-1,y.isCubeTexture&&y.isRenderTargetTexture===!1&&(Ss.y*=-1,Ss.z*=-1),m.envMapRotation.value.setFromMatrix4($_.makeRotationFromEuler(Ss)),m.flipEnvMap.value=y.isCubeTexture&&y.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,t(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,m.aoMapTransform))}function o(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform))}function a(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function l(m,p,E,y){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*E,m.scale.value=y*.5,p.map&&(m.map.value=p.map,t(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function c(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function h(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function u(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function d(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function f(m,p,E){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===sn&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=E.texture,m.transmissionSamplerSize.value.set(E.width,E.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,p){p.matcap&&(m.matcap.value=p.matcap)}function v(m,p){let E=e.get(p).light;m.referencePosition.value.setFromMatrixPosition(E.matrixWorld),m.nearDistance.value=E.shadow.camera.near,m.farDistance.value=E.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function Y_(i,e,t,n){let s={},r={},o=[],a=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function l(E,y){let _=y.program;n.uniformBlockBinding(E,_)}function c(E,y){let _=s[E.id];_===void 0&&(g(E),_=h(E),s[E.id]=_,E.addEventListener("dispose",m));let R=y.program;n.updateUBOMapping(E,R);let A=e.render.frame;r[E.id]!==A&&(d(E),r[E.id]=A)}function h(E){let y=u();E.__bindingPointIndex=y;let _=i.createBuffer(),R=E.__size,A=E.usage;return i.bindBuffer(i.UNIFORM_BUFFER,_),i.bufferData(i.UNIFORM_BUFFER,R,A),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,y,_),_}function u(){for(let E=0;E<a;E++)if(o.indexOf(E)===-1)return o.push(E),E;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(E){let y=s[E.id],_=E.uniforms,R=E.__cache;i.bindBuffer(i.UNIFORM_BUFFER,y);for(let A=0,I=_.length;A<I;A++){let L=Array.isArray(_[A])?_[A]:[_[A]];for(let b=0,M=L.length;b<M;b++){let D=L[b];if(f(D,A,b,R)===!0){let z=D.__offset,G=Array.isArray(D.value)?D.value:[D.value],q=0;for(let Z=0;Z<G.length;Z++){let Y=G[Z],he=v(Y);typeof Y=="number"||typeof Y=="boolean"?(D.__data[0]=Y,i.bufferSubData(i.UNIFORM_BUFFER,z+q,D.__data)):Y.isMatrix3?(D.__data[0]=Y.elements[0],D.__data[1]=Y.elements[1],D.__data[2]=Y.elements[2],D.__data[3]=0,D.__data[4]=Y.elements[3],D.__data[5]=Y.elements[4],D.__data[6]=Y.elements[5],D.__data[7]=0,D.__data[8]=Y.elements[6],D.__data[9]=Y.elements[7],D.__data[10]=Y.elements[8],D.__data[11]=0):(Y.toArray(D.__data,q),q+=he.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,z,D.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function f(E,y,_,R){let A=E.value,I=y+"_"+_;if(R[I]===void 0)return typeof A=="number"||typeof A=="boolean"?R[I]=A:R[I]=A.clone(),!0;{let L=R[I];if(typeof A=="number"||typeof A=="boolean"){if(L!==A)return R[I]=A,!0}else if(L.equals(A)===!1)return L.copy(A),!0}return!1}function g(E){let y=E.uniforms,_=0,R=16;for(let I=0,L=y.length;I<L;I++){let b=Array.isArray(y[I])?y[I]:[y[I]];for(let M=0,D=b.length;M<D;M++){let z=b[M],G=Array.isArray(z.value)?z.value:[z.value];for(let q=0,Z=G.length;q<Z;q++){let Y=G[q],he=v(Y),W=_%R,ve=W%he.boundary,Me=W+ve;_+=ve,Me!==0&&R-Me<he.storage&&(_+=R-Me),z.__data=new Float32Array(he.storage/Float32Array.BYTES_PER_ELEMENT),z.__offset=_,_+=he.storage}}}let A=_%R;return A>0&&(_+=R-A),E.__size=_,E.__cache={},this}function v(E){let y={boundary:0,storage:0};return typeof E=="number"||typeof E=="boolean"?(y.boundary=4,y.storage=4):E.isVector2?(y.boundary=8,y.storage=8):E.isVector3||E.isColor?(y.boundary=16,y.storage=12):E.isVector4?(y.boundary=16,y.storage=16):E.isMatrix3?(y.boundary=48,y.storage=48):E.isMatrix4?(y.boundary=64,y.storage=64):E.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",E),y}function m(E){let y=E.target;y.removeEventListener("dispose",m);let _=o.indexOf(y.__bindingPointIndex);o.splice(_,1),i.deleteBuffer(s[y.id]),delete s[y.id],delete r[y.id]}function p(){for(let E in s)i.deleteBuffer(s[E]);o=[],s={},r={}}return{bind:l,update:c,dispose:p}}var zl=class{constructor(e={}){let{canvas:t=Pd(),context:n=null,depth:s=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reversedDepthBuffer:d=!1}=e;this.isWebGLRenderer=!0;let f;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");f=n.getContextAttributes().alpha}else f=o;let g=new Uint32Array(4),v=new Int32Array(4),m=null,p=null,E=[],y=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=xi,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let _=this,R=!1;this._outputColorSpace=nn;let A=0,I=0,L=null,b=-1,M=null,D=new ht,z=new ht,G=null,q=new Ke(0),Z=0,Y=t.width,he=t.height,W=1,ve=null,Me=null,Ae=new ht(0,0,Y,he),He=new ht(0,0,Y,he),et=!1,at=new Qs,it=!1,J=!1,ae=new nt,Re=new C,Oe=new ht,Pe={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},Qe=!1;function gt(){return L===null?W:1}let P=n;function le(S,N){return t.getContext(S,N)}try{let S={alpha:!0,depth:s,stencil:r,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${"180"}`),t.addEventListener("webglcontextlost",re,!1),t.addEventListener("webglcontextrestored",xe,!1),t.addEventListener("webglcontextcreationerror",Q,!1),P===null){let N="webgl2";if(P=le(N,S),P===null)throw le(N)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(S){throw console.error("THREE.WebGLRenderer: "+S.message),S}let ne,ee,j,me,ce,fe,Xe,$e,w,x,O,X,te,$,De,ge,Ie,Le,de,we,Ge,Fe,be,U;function T(){ne=new dx(P),ne.init(),Fe=new G_(P,ne),ee=new rx(P,ne,e,Fe),j=new H_(P,ne),ee.reversedDepthBuffer&&d&&j.buffers.depth.setReversed(!0),me=new mx(P),ce=new R_,fe=new V_(P,ne,j,ce,ee,Fe,me),Xe=new ax(_),$e=new ux(_),w=new Mm(P),be=new ix(P,w),x=new fx(P,w,me,be),O=new xx(P,x,w,me),de=new gx(P,ee,fe),ge=new ox(ce),X=new A_(_,Xe,$e,ne,ee,be,ge),te=new q_(_,ce),$=new I_,De=new F_(ne),Le=new nx(_,Xe,$e,j,O,f,l),Ie=new z_(_,O,ee),U=new Y_(P,me,ee,j),we=new sx(P,ne,me),Ge=new px(P,ne,me),me.programs=X.programs,_.capabilities=ee,_.extensions=ne,_.properties=ce,_.renderLists=$,_.shadowMap=Ie,_.state=j,_.info=me}T();let k=new Rh(_,P);this.xr=k,this.getContext=function(){return P},this.getContextAttributes=function(){return P.getContextAttributes()},this.forceContextLoss=function(){let S=ne.get("WEBGL_lose_context");S&&S.loseContext()},this.forceContextRestore=function(){let S=ne.get("WEBGL_lose_context");S&&S.restoreContext()},this.getPixelRatio=function(){return W},this.setPixelRatio=function(S){S!==void 0&&(W=S,this.setSize(Y,he,!1))},this.getSize=function(S){return S.set(Y,he)},this.setSize=function(S,N,H=!0){if(k.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}Y=S,he=N,t.width=Math.floor(S*W),t.height=Math.floor(N*W),H===!0&&(t.style.width=S+"px",t.style.height=N+"px"),this.setViewport(0,0,S,N)},this.getDrawingBufferSize=function(S){return S.set(Y*W,he*W).floor()},this.setDrawingBufferSize=function(S,N,H){Y=S,he=N,W=H,t.width=Math.floor(S*H),t.height=Math.floor(N*H),this.setViewport(0,0,S,N)},this.getCurrentViewport=function(S){return S.copy(D)},this.getViewport=function(S){return S.copy(Ae)},this.setViewport=function(S,N,H,V){S.isVector4?Ae.set(S.x,S.y,S.z,S.w):Ae.set(S,N,H,V),j.viewport(D.copy(Ae).multiplyScalar(W).round())},this.getScissor=function(S){return S.copy(He)},this.setScissor=function(S,N,H,V){S.isVector4?He.set(S.x,S.y,S.z,S.w):He.set(S,N,H,V),j.scissor(z.copy(He).multiplyScalar(W).round())},this.getScissorTest=function(){return et},this.setScissorTest=function(S){j.setScissorTest(et=S)},this.setOpaqueSort=function(S){ve=S},this.setTransparentSort=function(S){Me=S},this.getClearColor=function(S){return S.copy(Le.getClearColor())},this.setClearColor=function(){Le.setClearColor(...arguments)},this.getClearAlpha=function(){return Le.getClearAlpha()},this.setClearAlpha=function(){Le.setClearAlpha(...arguments)},this.clear=function(S=!0,N=!0,H=!0){let V=0;if(S){let B=!1;if(L!==null){let pe=L.texture.format;B=pe===rl||pe===sl||pe===il}if(B){let pe=L.texture.type,Te=pe===Wn||pe===ki||pe===sr||pe===or||pe===el||pe===tl,Ne=Le.getClearColor(),Ce=Le.getClearAlpha(),We=Ne.r,qe=Ne.g,ke=Ne.b;Te?(g[0]=We,g[1]=qe,g[2]=ke,g[3]=Ce,P.clearBufferuiv(P.COLOR,0,g)):(v[0]=We,v[1]=qe,v[2]=ke,v[3]=Ce,P.clearBufferiv(P.COLOR,0,v))}else V|=P.COLOR_BUFFER_BIT}N&&(V|=P.DEPTH_BUFFER_BIT),H&&(V|=P.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),P.clear(V)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",re,!1),t.removeEventListener("webglcontextrestored",xe,!1),t.removeEventListener("webglcontextcreationerror",Q,!1),Le.dispose(),$.dispose(),De.dispose(),ce.dispose(),Xe.dispose(),$e.dispose(),O.dispose(),be.dispose(),U.dispose(),X.dispose(),k.dispose(),k.removeEventListener("sessionstart",rt),k.removeEventListener("sessionend",Vt),Dt.stop()};function re(S){S.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),R=!0}function xe(){console.log("THREE.WebGLRenderer: Context Restored."),R=!1;let S=me.autoReset,N=Ie.enabled,H=Ie.autoUpdate,V=Ie.needsUpdate,B=Ie.type;T(),me.autoReset=S,Ie.enabled=N,Ie.autoUpdate=H,Ie.needsUpdate=V,Ie.type=B}function Q(S){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",S.statusMessage)}function K(S){let N=S.target;N.removeEventListener("dispose",K),_e(N)}function _e(S){Ue(S),ce.remove(S)}function Ue(S){let N=ce.get(S).programs;N!==void 0&&(N.forEach(function(H){X.releaseProgram(H)}),S.isShaderMaterial&&X.releaseShaderCache(S))}this.renderBufferDirect=function(S,N,H,V,B,pe){N===null&&(N=Pe);let Te=B.isMesh&&B.matrixWorld.determinant()<0,Ne=Mt(S,N,H,V,B);j.setMaterial(V,Te);let Ce=H.index,We=1;if(V.wireframe===!0){if(Ce=x.getWireframeAttribute(H),Ce===void 0)return;We=2}let qe=H.drawRange,ke=H.attributes.position,st=qe.start*We,xt=(qe.start+qe.count)*We;pe!==null&&(st=Math.max(st,pe.start*We),xt=Math.min(xt,(pe.start+pe.count)*We)),Ce!==null?(st=Math.max(st,0),xt=Math.min(xt,Ce.count)):ke!=null&&(st=Math.max(st,0),xt=Math.min(xt,ke.count));let wt=xt-st;if(wt<0||wt===1/0)return;be.setup(B,V,Ne,H,Ce);let yt,_t=we;if(Ce!==null&&(yt=w.get(Ce),_t=Ge,_t.setIndex(yt)),B.isMesh)V.wireframe===!0?(j.setLineWidth(V.wireframeLinewidth*gt()),_t.setMode(P.LINES)):_t.setMode(P.TRIANGLES);else if(B.isLine){let Ve=V.linewidth;Ve===void 0&&(Ve=1),j.setLineWidth(Ve*gt()),B.isLineSegments?_t.setMode(P.LINES):B.isLineLoop?_t.setMode(P.LINE_LOOP):_t.setMode(P.LINE_STRIP)}else B.isPoints?_t.setMode(P.POINTS):B.isSprite&&_t.setMode(P.TRIANGLES);if(B.isBatchedMesh)if(B._multiDrawInstances!==null)Zs("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),_t.renderMultiDrawInstances(B._multiDrawStarts,B._multiDrawCounts,B._multiDrawCount,B._multiDrawInstances);else if(ne.get("WEBGL_multi_draw"))_t.renderMultiDraw(B._multiDrawStarts,B._multiDrawCounts,B._multiDrawCount);else{let Ve=B._multiDrawStarts,bt=B._multiDrawCounts,ct=B._multiDrawCount,dn=Ce?w.get(Ce).bytesPerElement:1,Cs=ce.get(V).currentProgram.getUniforms();for(let fn=0;fn<ct;fn++)Cs.setValue(P,"_gl_DrawID",fn),_t.render(Ve[fn]/dn,bt[fn])}else if(B.isInstancedMesh)_t.renderInstances(st,wt,B.count);else if(H.isInstancedBufferGeometry){let Ve=H._maxInstanceCount!==void 0?H._maxInstanceCount:1/0,bt=Math.min(H.instanceCount,Ve);_t.renderInstances(st,wt,bt)}else _t.render(st,wt)};function Be(S,N,H){S.transparent===!0&&S.side===bn&&S.forceSinglePass===!1?(S.side=sn,S.needsUpdate=!0,$i(S,N,H),S.side=ui,S.needsUpdate=!0,$i(S,N,H),S.side=bn):$i(S,N,H)}this.compile=function(S,N,H=null){H===null&&(H=S),p=De.get(H),p.init(N),y.push(p),H.traverseVisible(function(B){B.isLight&&B.layers.test(N.layers)&&(p.pushLight(B),B.castShadow&&p.pushShadow(B))}),S!==H&&S.traverseVisible(function(B){B.isLight&&B.layers.test(N.layers)&&(p.pushLight(B),B.castShadow&&p.pushShadow(B))}),p.setupLights();let V=new Set;return S.traverse(function(B){if(!(B.isMesh||B.isPoints||B.isLine||B.isSprite))return;let pe=B.material;if(pe)if(Array.isArray(pe))for(let Te=0;Te<pe.length;Te++){let Ne=pe[Te];Be(Ne,H,B),V.add(Ne)}else Be(pe,H,B),V.add(pe)}),p=y.pop(),V},this.compileAsync=function(S,N,H=null){let V=this.compile(S,N,H);return new Promise(B=>{function pe(){if(V.forEach(function(Te){ce.get(Te).currentProgram.isReady()&&V.delete(Te)}),V.size===0){B(S);return}setTimeout(pe,10)}ne.get("KHR_parallel_shader_compile")!==null?pe():setTimeout(pe,10)})};let ue=null;function Je(S){ue&&ue(S)}function rt(){Dt.stop()}function Vt(){Dt.start()}let Dt=new uf;Dt.setAnimationLoop(Je),typeof self<"u"&&Dt.setContext(self),this.setAnimationLoop=function(S){ue=S,k.setAnimationLoop(S),S===null?Dt.stop():Dt.start()},k.addEventListener("sessionstart",rt),k.addEventListener("sessionend",Vt),this.render=function(S,N){if(N!==void 0&&N.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(R===!0)return;if(S.matrixWorldAutoUpdate===!0&&S.updateMatrixWorld(),N.parent===null&&N.matrixWorldAutoUpdate===!0&&N.updateMatrixWorld(),k.enabled===!0&&k.isPresenting===!0&&(k.cameraAutoUpdate===!0&&k.updateCamera(N),N=k.getCamera()),S.isScene===!0&&S.onBeforeRender(_,S,N,L),p=De.get(S,y.length),p.init(N),y.push(p),ae.multiplyMatrices(N.projectionMatrix,N.matrixWorldInverse),at.setFromProjectionMatrix(ae,zn,N.reversedDepth),J=this.localClippingEnabled,it=ge.init(this.clippingPlanes,J),m=$.get(S,E.length),m.init(),E.push(m),k.enabled===!0&&k.isPresenting===!0){let pe=_.xr.getDepthSensingMesh();pe!==null&&xr(pe,N,-1/0,_.sortObjects)}xr(S,N,0,_.sortObjects),m.finish(),_.sortObjects===!0&&m.sort(ve,Me),Qe=k.enabled===!1||k.isPresenting===!1||k.hasDepthSensing()===!1,Qe&&Le.addToRenderList(m,S),this.info.render.frame++,it===!0&&ge.beginShadows();let H=p.state.shadowsArray;Ie.render(H,S,N),it===!0&&ge.endShadows(),this.info.autoReset===!0&&this.info.reset();let V=m.opaque,B=m.transmissive;if(p.setupLights(),N.isArrayCamera){let pe=N.cameras;if(B.length>0)for(let Te=0,Ne=pe.length;Te<Ne;Te++){let Ce=pe[Te];_r(V,B,S,Ce)}Qe&&Le.render(S);for(let Te=0,Ne=pe.length;Te<Ne;Te++){let Ce=pe[Te];zo(m,S,Ce,Ce.viewport)}}else B.length>0&&_r(V,B,S,N),Qe&&Le.render(S),zo(m,S,N);L!==null&&I===0&&(fe.updateMultisampleRenderTarget(L),fe.updateRenderTargetMipmap(L)),S.isScene===!0&&S.onAfterRender(_,S,N),be.resetDefaultState(),b=-1,M=null,y.pop(),y.length>0?(p=y[y.length-1],it===!0&&ge.setGlobalState(_.clippingPlanes,p.state.camera)):p=null,E.pop(),E.length>0?m=E[E.length-1]:m=null};function xr(S,N,H,V){if(S.visible===!1)return;if(S.layers.test(N.layers)){if(S.isGroup)H=S.renderOrder;else if(S.isLOD)S.autoUpdate===!0&&S.update(N);else if(S.isLight)p.pushLight(S),S.castShadow&&p.pushShadow(S);else if(S.isSprite){if(!S.frustumCulled||at.intersectsSprite(S)){V&&Oe.setFromMatrixPosition(S.matrixWorld).applyMatrix4(ae);let Te=O.update(S),Ne=S.material;Ne.visible&&m.push(S,Te,Ne,H,Oe.z,null)}}else if((S.isMesh||S.isLine||S.isPoints)&&(!S.frustumCulled||at.intersectsObject(S))){let Te=O.update(S),Ne=S.material;if(V&&(S.boundingSphere!==void 0?(S.boundingSphere===null&&S.computeBoundingSphere(),Oe.copy(S.boundingSphere.center)):(Te.boundingSphere===null&&Te.computeBoundingSphere(),Oe.copy(Te.boundingSphere.center)),Oe.applyMatrix4(S.matrixWorld).applyMatrix4(ae)),Array.isArray(Ne)){let Ce=Te.groups;for(let We=0,qe=Ce.length;We<qe;We++){let ke=Ce[We],st=Ne[ke.materialIndex];st&&st.visible&&m.push(S,Te,st,H,Oe.z,ke)}}else Ne.visible&&m.push(S,Te,Ne,H,Oe.z,null)}}let pe=S.children;for(let Te=0,Ne=pe.length;Te<Ne;Te++)xr(pe[Te],N,H,V)}function zo(S,N,H,V){let B=S.opaque,pe=S.transmissive,Te=S.transparent;p.setupLightsView(H),it===!0&&ge.setGlobalState(_.clippingPlanes,H),V&&j.viewport(D.copy(V)),B.length>0&&Xi(B,N,H),pe.length>0&&Xi(pe,N,H),Te.length>0&&Xi(Te,N,H),j.buffers.depth.setTest(!0),j.buffers.depth.setMask(!0),j.buffers.color.setMask(!0),j.setPolygonOffset(!1)}function _r(S,N,H,V){if((H.isScene===!0?H.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[V.id]===void 0&&(p.state.transmissionRenderTarget[V.id]=new Kn(1,1,{generateMipmaps:!0,type:ne.has("EXT_color_buffer_half_float")||ne.has("EXT_color_buffer_float")?rr:Wn,minFilter:zi,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:lt.workingColorSpace}));let pe=p.state.transmissionRenderTarget[V.id],Te=V.viewport||D;pe.setSize(Te.z*_.transmissionResolutionScale,Te.w*_.transmissionResolutionScale);let Ne=_.getRenderTarget(),Ce=_.getActiveCubeFace(),We=_.getActiveMipmapLevel();_.setRenderTarget(pe),_.getClearColor(q),Z=_.getClearAlpha(),Z<1&&_.setClearColor(16777215,.5),_.clear(),Qe&&Le.render(H);let qe=_.toneMapping;_.toneMapping=xi;let ke=V.viewport;if(V.viewport!==void 0&&(V.viewport=void 0),p.setupLightsView(V),it===!0&&ge.setGlobalState(_.clippingPlanes,V),Xi(S,H,V),fe.updateMultisampleRenderTarget(pe),fe.updateRenderTargetMipmap(pe),ne.has("WEBGL_multisampled_render_to_texture")===!1){let st=!1;for(let xt=0,wt=N.length;xt<wt;xt++){let yt=N[xt],_t=yt.object,Ve=yt.geometry,bt=yt.material,ct=yt.group;if(bt.side===bn&&_t.layers.test(V.layers)){let dn=bt.side;bt.side=sn,bt.needsUpdate=!0,Rs(_t,H,V,Ve,bt,ct),bt.side=dn,bt.needsUpdate=!0,st=!0}}st===!0&&(fe.updateMultisampleRenderTarget(pe),fe.updateRenderTargetMipmap(pe))}_.setRenderTarget(Ne,Ce,We),_.setClearColor(q,Z),ke!==void 0&&(V.viewport=ke),_.toneMapping=qe}function Xi(S,N,H){let V=N.isScene===!0?N.overrideMaterial:null;for(let B=0,pe=S.length;B<pe;B++){let Te=S[B],Ne=Te.object,Ce=Te.geometry,We=Te.group,qe=Te.material;qe.allowOverride===!0&&V!==null&&(qe=V),Ne.layers.test(H.layers)&&Rs(Ne,N,H,Ce,qe,We)}}function Rs(S,N,H,V,B,pe){S.onBeforeRender(_,N,H,V,B,pe),S.modelViewMatrix.multiplyMatrices(H.matrixWorldInverse,S.matrixWorld),S.normalMatrix.getNormalMatrix(S.modelViewMatrix),B.onBeforeRender(_,N,H,V,S,pe),B.transparent===!0&&B.side===bn&&B.forceSinglePass===!1?(B.side=sn,B.needsUpdate=!0,_.renderBufferDirect(H,N,V,B,S,pe),B.side=ui,B.needsUpdate=!0,_.renderBufferDirect(H,N,V,B,S,pe),B.side=bn):_.renderBufferDirect(H,N,V,B,S,pe),S.onAfterRender(_,N,H,V,B,pe)}function $i(S,N,H){N.isScene!==!0&&(N=Pe);let V=ce.get(S),B=p.state.lights,pe=p.state.shadowsArray,Te=B.state.version,Ne=X.getParameters(S,B.state,pe,N,H),Ce=X.getProgramCacheKey(Ne),We=V.programs;V.environment=S.isMeshStandardMaterial?N.environment:null,V.fog=N.fog,V.envMap=(S.isMeshStandardMaterial?$e:Xe).get(S.envMap||V.environment),V.envMapRotation=V.environment!==null&&S.envMap===null?N.environmentRotation:S.envMapRotation,We===void 0&&(S.addEventListener("dispose",K),We=new Map,V.programs=We);let qe=We.get(Ce);if(qe!==void 0){if(V.currentProgram===qe&&V.lightsStateVersion===Te)return ze(S,Ne),qe}else Ne.uniforms=X.getUniforms(S),S.onBeforeCompile(Ne,_),qe=X.acquireProgram(Ne,Ce),We.set(Ce,qe),V.uniforms=Ne.uniforms;let ke=V.uniforms;return(!S.isShaderMaterial&&!S.isRawShaderMaterial||S.clipping===!0)&&(ke.clippingPlanes=ge.uniform),ze(S,Ne),V.needsLights=vr(S),V.lightsStateVersion=Te,V.needsLights&&(ke.ambientLightColor.value=B.state.ambient,ke.lightProbe.value=B.state.probe,ke.directionalLights.value=B.state.directional,ke.directionalLightShadows.value=B.state.directionalShadow,ke.spotLights.value=B.state.spot,ke.spotLightShadows.value=B.state.spotShadow,ke.rectAreaLights.value=B.state.rectArea,ke.ltc_1.value=B.state.rectAreaLTC1,ke.ltc_2.value=B.state.rectAreaLTC2,ke.pointLights.value=B.state.point,ke.pointLightShadows.value=B.state.pointShadow,ke.hemisphereLights.value=B.state.hemi,ke.directionalShadowMap.value=B.state.directionalShadowMap,ke.directionalShadowMatrix.value=B.state.directionalShadowMatrix,ke.spotShadowMap.value=B.state.spotShadowMap,ke.spotLightMatrix.value=B.state.spotLightMatrix,ke.spotLightMap.value=B.state.spotLightMap,ke.pointShadowMap.value=B.state.pointShadowMap,ke.pointShadowMatrix.value=B.state.pointShadowMatrix),V.currentProgram=qe,V.uniformsList=null,qe}function ie(S){if(S.uniformsList===null){let N=S.currentProgram.getUniforms();S.uniformsList=hr.seqWithValue(N.seq,S.uniforms)}return S.uniformsList}function ze(S,N){let H=ce.get(S);H.outputColorSpace=N.outputColorSpace,H.batching=N.batching,H.batchingColor=N.batchingColor,H.instancing=N.instancing,H.instancingColor=N.instancingColor,H.instancingMorph=N.instancingMorph,H.skinning=N.skinning,H.morphTargets=N.morphTargets,H.morphNormals=N.morphNormals,H.morphColors=N.morphColors,H.morphTargetsCount=N.morphTargetsCount,H.numClippingPlanes=N.numClippingPlanes,H.numIntersection=N.numClipIntersection,H.vertexAlphas=N.vertexAlphas,H.vertexTangents=N.vertexTangents,H.toneMapping=N.toneMapping}function Mt(S,N,H,V,B){N.isScene!==!0&&(N=Pe),fe.resetTextureUnits();let pe=N.fog,Te=V.isMeshStandardMaterial?N.environment:null,Ne=L===null?_.outputColorSpace:L.isXRRenderTarget===!0?L.texture.colorSpace:hs,Ce=(V.isMeshStandardMaterial?$e:Xe).get(V.envMap||Te),We=V.vertexColors===!0&&!!H.attributes.color&&H.attributes.color.itemSize===4,qe=!!H.attributes.tangent&&(!!V.normalMap||V.anisotropy>0),ke=!!H.morphAttributes.position,st=!!H.morphAttributes.normal,xt=!!H.morphAttributes.color,wt=xi;V.toneMapped&&(L===null||L.isXRRenderTarget===!0)&&(wt=_.toneMapping);let yt=H.morphAttributes.position||H.morphAttributes.normal||H.morphAttributes.color,_t=yt!==void 0?yt.length:0,Ve=ce.get(V),bt=p.state.lights;if(it===!0&&(J===!0||S!==M)){let en=S===M&&V.id===b;ge.setState(V,S,en)}let ct=!1;V.version===Ve.__version?(Ve.needsLights&&Ve.lightsStateVersion!==bt.state.version||Ve.outputColorSpace!==Ne||B.isBatchedMesh&&Ve.batching===!1||!B.isBatchedMesh&&Ve.batching===!0||B.isBatchedMesh&&Ve.batchingColor===!0&&B.colorTexture===null||B.isBatchedMesh&&Ve.batchingColor===!1&&B.colorTexture!==null||B.isInstancedMesh&&Ve.instancing===!1||!B.isInstancedMesh&&Ve.instancing===!0||B.isSkinnedMesh&&Ve.skinning===!1||!B.isSkinnedMesh&&Ve.skinning===!0||B.isInstancedMesh&&Ve.instancingColor===!0&&B.instanceColor===null||B.isInstancedMesh&&Ve.instancingColor===!1&&B.instanceColor!==null||B.isInstancedMesh&&Ve.instancingMorph===!0&&B.morphTexture===null||B.isInstancedMesh&&Ve.instancingMorph===!1&&B.morphTexture!==null||Ve.envMap!==Ce||V.fog===!0&&Ve.fog!==pe||Ve.numClippingPlanes!==void 0&&(Ve.numClippingPlanes!==ge.numPlanes||Ve.numIntersection!==ge.numIntersection)||Ve.vertexAlphas!==We||Ve.vertexTangents!==qe||Ve.morphTargets!==ke||Ve.morphNormals!==st||Ve.morphColors!==xt||Ve.toneMapping!==wt||Ve.morphTargetsCount!==_t)&&(ct=!0):(ct=!0,Ve.__version=V.version);let dn=Ve.currentProgram;ct===!0&&(dn=$i(V,N,B));let Cs=!1,fn=!1,yr=!1,St=dn.getUniforms(),wn=Ve.uniforms;if(j.useProgram(dn.program)&&(Cs=!0,fn=!0,yr=!0),V.id!==b&&(b=V.id,fn=!0),Cs||M!==S){j.buffers.depth.getReversed()&&S.reversedDepth!==!0&&(S._reversedDepth=!0,S.updateProjectionMatrix()),St.setValue(P,"projectionMatrix",S.projectionMatrix),St.setValue(P,"viewMatrix",S.matrixWorldInverse);let on=St.map.cameraPosition;on!==void 0&&on.setValue(P,Re.setFromMatrixPosition(S.matrixWorld)),ee.logarithmicDepthBuffer&&St.setValue(P,"logDepthBufFC",2/(Math.log(S.far+1)/Math.LN2)),(V.isMeshPhongMaterial||V.isMeshToonMaterial||V.isMeshLambertMaterial||V.isMeshBasicMaterial||V.isMeshStandardMaterial||V.isShaderMaterial)&&St.setValue(P,"isOrthographic",S.isOrthographicCamera===!0),M!==S&&(M=S,fn=!0,yr=!0)}if(B.isSkinnedMesh){St.setOptional(P,B,"bindMatrix"),St.setOptional(P,B,"bindMatrixInverse");let en=B.skeleton;en&&(en.boneTexture===null&&en.computeBoneTexture(),St.setValue(P,"boneTexture",en.boneTexture,fe))}B.isBatchedMesh&&(St.setOptional(P,B,"batchingTexture"),St.setValue(P,"batchingTexture",B._matricesTexture,fe),St.setOptional(P,B,"batchingIdTexture"),St.setValue(P,"batchingIdTexture",B._indirectTexture,fe),St.setOptional(P,B,"batchingColorTexture"),B._colorsTexture!==null&&St.setValue(P,"batchingColorTexture",B._colorsTexture,fe));let Tn=H.morphAttributes;if((Tn.position!==void 0||Tn.normal!==void 0||Tn.color!==void 0)&&de.update(B,H,dn),(fn||Ve.receiveShadow!==B.receiveShadow)&&(Ve.receiveShadow=B.receiveShadow,St.setValue(P,"receiveShadow",B.receiveShadow)),V.isMeshGouraudMaterial&&V.envMap!==null&&(wn.envMap.value=Ce,wn.flipEnvMap.value=Ce.isCubeTexture&&Ce.isRenderTargetTexture===!1?-1:1),V.isMeshStandardMaterial&&V.envMap===null&&N.environment!==null&&(wn.envMapIntensity.value=N.environmentIntensity),fn&&(St.setValue(P,"toneMappingExposure",_.toneMappingExposure),Ve.needsLights&&qi(wn,yr),pe&&V.fog===!0&&te.refreshFogUniforms(wn,pe),te.refreshMaterialUniforms(wn,V,W,he,p.state.transmissionRenderTarget[S.id]),hr.upload(P,ie(Ve),wn,fe)),V.isShaderMaterial&&V.uniformsNeedUpdate===!0&&(hr.upload(P,ie(Ve),wn,fe),V.uniformsNeedUpdate=!1),V.isSpriteMaterial&&St.setValue(P,"center",B.center),St.setValue(P,"modelViewMatrix",B.modelViewMatrix),St.setValue(P,"normalMatrix",B.normalMatrix),St.setValue(P,"modelMatrix",B.matrixWorld),V.isShaderMaterial||V.isRawShaderMaterial){let en=V.uniformsGroups;for(let on=0,jl=en.length;on<jl;on++){let Yi=en[on];U.update(Yi,dn),U.bind(Yi,dn)}}return dn}function qi(S,N){S.ambientLightColor.needsUpdate=N,S.lightProbe.needsUpdate=N,S.directionalLights.needsUpdate=N,S.directionalLightShadows.needsUpdate=N,S.pointLights.needsUpdate=N,S.pointLightShadows.needsUpdate=N,S.spotLights.needsUpdate=N,S.spotLightShadows.needsUpdate=N,S.rectAreaLights.needsUpdate=N,S.hemisphereLights.needsUpdate=N}function vr(S){return S.isMeshLambertMaterial||S.isMeshToonMaterial||S.isMeshPhongMaterial||S.isMeshStandardMaterial||S.isShadowMaterial||S.isShaderMaterial&&S.lights===!0}this.getActiveCubeFace=function(){return A},this.getActiveMipmapLevel=function(){return I},this.getRenderTarget=function(){return L},this.setRenderTargetTextures=function(S,N,H){let V=ce.get(S);V.__autoAllocateDepthBuffer=S.resolveDepthBuffer===!1,V.__autoAllocateDepthBuffer===!1&&(V.__useRenderToTexture=!1),ce.get(S.texture).__webglTexture=N,ce.get(S.depthTexture).__webglTexture=V.__autoAllocateDepthBuffer?void 0:H,V.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(S,N){let H=ce.get(S);H.__webglFramebuffer=N,H.__useDefaultFramebuffer=N===void 0};let Kl=P.createFramebuffer();this.setRenderTarget=function(S,N=0,H=0){L=S,A=N,I=H;let V=!0,B=null,pe=!1,Te=!1;if(S){let Ce=ce.get(S);if(Ce.__useDefaultFramebuffer!==void 0)j.bindFramebuffer(P.FRAMEBUFFER,null),V=!1;else if(Ce.__webglFramebuffer===void 0)fe.setupRenderTarget(S);else if(Ce.__hasExternalTextures)fe.rebindTextures(S,ce.get(S.texture).__webglTexture,ce.get(S.depthTexture).__webglTexture);else if(S.depthBuffer){let ke=S.depthTexture;if(Ce.__boundDepthTexture!==ke){if(ke!==null&&ce.has(ke)&&(S.width!==ke.image.width||S.height!==ke.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");fe.setupDepthRenderbuffer(S)}}let We=S.texture;(We.isData3DTexture||We.isDataArrayTexture||We.isCompressedArrayTexture)&&(Te=!0);let qe=ce.get(S).__webglFramebuffer;S.isWebGLCubeRenderTarget?(Array.isArray(qe[N])?B=qe[N][H]:B=qe[N],pe=!0):S.samples>0&&fe.useMultisampledRTT(S)===!1?B=ce.get(S).__webglMultisampledFramebuffer:Array.isArray(qe)?B=qe[H]:B=qe,D.copy(S.viewport),z.copy(S.scissor),G=S.scissorTest}else D.copy(Ae).multiplyScalar(W).floor(),z.copy(He).multiplyScalar(W).floor(),G=et;if(H!==0&&(B=Kl),j.bindFramebuffer(P.FRAMEBUFFER,B)&&V&&j.drawBuffers(S,B),j.viewport(D),j.scissor(z),j.setScissorTest(G),pe){let Ce=ce.get(S.texture);P.framebufferTexture2D(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_CUBE_MAP_POSITIVE_X+N,Ce.__webglTexture,H)}else if(Te){let Ce=N;for(let We=0;We<S.textures.length;We++){let qe=ce.get(S.textures[We]);P.framebufferTextureLayer(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0+We,qe.__webglTexture,H,Ce)}}else if(S!==null&&H!==0){let Ce=ce.get(S.texture);P.framebufferTexture2D(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_2D,Ce.__webglTexture,H)}b=-1},this.readRenderTargetPixels=function(S,N,H,V,B,pe,Te,Ne=0){if(!(S&&S.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ce=ce.get(S).__webglFramebuffer;if(S.isWebGLCubeRenderTarget&&Te!==void 0&&(Ce=Ce[Te]),Ce){j.bindFramebuffer(P.FRAMEBUFFER,Ce);try{let We=S.textures[Ne],qe=We.format,ke=We.type;if(!ee.textureFormatReadable(qe)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!ee.textureTypeReadable(ke)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}N>=0&&N<=S.width-V&&H>=0&&H<=S.height-B&&(S.textures.length>1&&P.readBuffer(P.COLOR_ATTACHMENT0+Ne),P.readPixels(N,H,V,B,Fe.convert(qe),Fe.convert(ke),pe))}finally{let We=L!==null?ce.get(L).__webglFramebuffer:null;j.bindFramebuffer(P.FRAMEBUFFER,We)}}},this.readRenderTargetPixelsAsync=async function(S,N,H,V,B,pe,Te,Ne=0){if(!(S&&S.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Ce=ce.get(S).__webglFramebuffer;if(S.isWebGLCubeRenderTarget&&Te!==void 0&&(Ce=Ce[Te]),Ce)if(N>=0&&N<=S.width-V&&H>=0&&H<=S.height-B){j.bindFramebuffer(P.FRAMEBUFFER,Ce);let We=S.textures[Ne],qe=We.format,ke=We.type;if(!ee.textureFormatReadable(qe))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!ee.textureTypeReadable(ke))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let st=P.createBuffer();P.bindBuffer(P.PIXEL_PACK_BUFFER,st),P.bufferData(P.PIXEL_PACK_BUFFER,pe.byteLength,P.STREAM_READ),S.textures.length>1&&P.readBuffer(P.COLOR_ATTACHMENT0+Ne),P.readPixels(N,H,V,B,Fe.convert(qe),Fe.convert(ke),0);let xt=L!==null?ce.get(L).__webglFramebuffer:null;j.bindFramebuffer(P.FRAMEBUFFER,xt);let wt=P.fenceSync(P.SYNC_GPU_COMMANDS_COMPLETE,0);return P.flush(),await Dd(P,wt,4),P.bindBuffer(P.PIXEL_PACK_BUFFER,st),P.getBufferSubData(P.PIXEL_PACK_BUFFER,0,pe),P.deleteBuffer(st),P.deleteSync(wt),pe}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(S,N=null,H=0){let V=Math.pow(2,-H),B=Math.floor(S.image.width*V),pe=Math.floor(S.image.height*V),Te=N!==null?N.x:0,Ne=N!==null?N.y:0;fe.setTexture2D(S,0),P.copyTexSubImage2D(P.TEXTURE_2D,H,0,0,Te,Ne,B,pe),j.unbindTexture()};let Vf=P.createFramebuffer(),Gf=P.createFramebuffer();this.copyTextureToTexture=function(S,N,H=null,V=null,B=0,pe=null){pe===null&&(B!==0?(Zs("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),pe=B,B=0):pe=0);let Te,Ne,Ce,We,qe,ke,st,xt,wt,yt=S.isCompressedTexture?S.mipmaps[pe]:S.image;if(H!==null)Te=H.max.x-H.min.x,Ne=H.max.y-H.min.y,Ce=H.isBox3?H.max.z-H.min.z:1,We=H.min.x,qe=H.min.y,ke=H.isBox3?H.min.z:0;else{let Tn=Math.pow(2,-B);Te=Math.floor(yt.width*Tn),Ne=Math.floor(yt.height*Tn),S.isDataArrayTexture?Ce=yt.depth:S.isData3DTexture?Ce=Math.floor(yt.depth*Tn):Ce=1,We=0,qe=0,ke=0}V!==null?(st=V.x,xt=V.y,wt=V.z):(st=0,xt=0,wt=0);let _t=Fe.convert(N.format),Ve=Fe.convert(N.type),bt;N.isData3DTexture?(fe.setTexture3D(N,0),bt=P.TEXTURE_3D):N.isDataArrayTexture||N.isCompressedArrayTexture?(fe.setTexture2DArray(N,0),bt=P.TEXTURE_2D_ARRAY):(fe.setTexture2D(N,0),bt=P.TEXTURE_2D),P.pixelStorei(P.UNPACK_FLIP_Y_WEBGL,N.flipY),P.pixelStorei(P.UNPACK_PREMULTIPLY_ALPHA_WEBGL,N.premultiplyAlpha),P.pixelStorei(P.UNPACK_ALIGNMENT,N.unpackAlignment);let ct=P.getParameter(P.UNPACK_ROW_LENGTH),dn=P.getParameter(P.UNPACK_IMAGE_HEIGHT),Cs=P.getParameter(P.UNPACK_SKIP_PIXELS),fn=P.getParameter(P.UNPACK_SKIP_ROWS),yr=P.getParameter(P.UNPACK_SKIP_IMAGES);P.pixelStorei(P.UNPACK_ROW_LENGTH,yt.width),P.pixelStorei(P.UNPACK_IMAGE_HEIGHT,yt.height),P.pixelStorei(P.UNPACK_SKIP_PIXELS,We),P.pixelStorei(P.UNPACK_SKIP_ROWS,qe),P.pixelStorei(P.UNPACK_SKIP_IMAGES,ke);let St=S.isDataArrayTexture||S.isData3DTexture,wn=N.isDataArrayTexture||N.isData3DTexture;if(S.isDepthTexture){let Tn=ce.get(S),en=ce.get(N),on=ce.get(Tn.__renderTarget),jl=ce.get(en.__renderTarget);j.bindFramebuffer(P.READ_FRAMEBUFFER,on.__webglFramebuffer),j.bindFramebuffer(P.DRAW_FRAMEBUFFER,jl.__webglFramebuffer);for(let Yi=0;Yi<Ce;Yi++)St&&(P.framebufferTextureLayer(P.READ_FRAMEBUFFER,P.COLOR_ATTACHMENT0,ce.get(S).__webglTexture,B,ke+Yi),P.framebufferTextureLayer(P.DRAW_FRAMEBUFFER,P.COLOR_ATTACHMENT0,ce.get(N).__webglTexture,pe,wt+Yi)),P.blitFramebuffer(We,qe,Te,Ne,st,xt,Te,Ne,P.DEPTH_BUFFER_BIT,P.NEAREST);j.bindFramebuffer(P.READ_FRAMEBUFFER,null),j.bindFramebuffer(P.DRAW_FRAMEBUFFER,null)}else if(B!==0||S.isRenderTargetTexture||ce.has(S)){let Tn=ce.get(S),en=ce.get(N);j.bindFramebuffer(P.READ_FRAMEBUFFER,Vf),j.bindFramebuffer(P.DRAW_FRAMEBUFFER,Gf);for(let on=0;on<Ce;on++)St?P.framebufferTextureLayer(P.READ_FRAMEBUFFER,P.COLOR_ATTACHMENT0,Tn.__webglTexture,B,ke+on):P.framebufferTexture2D(P.READ_FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_2D,Tn.__webglTexture,B),wn?P.framebufferTextureLayer(P.DRAW_FRAMEBUFFER,P.COLOR_ATTACHMENT0,en.__webglTexture,pe,wt+on):P.framebufferTexture2D(P.DRAW_FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_2D,en.__webglTexture,pe),B!==0?P.blitFramebuffer(We,qe,Te,Ne,st,xt,Te,Ne,P.COLOR_BUFFER_BIT,P.NEAREST):wn?P.copyTexSubImage3D(bt,pe,st,xt,wt+on,We,qe,Te,Ne):P.copyTexSubImage2D(bt,pe,st,xt,We,qe,Te,Ne);j.bindFramebuffer(P.READ_FRAMEBUFFER,null),j.bindFramebuffer(P.DRAW_FRAMEBUFFER,null)}else wn?S.isDataTexture||S.isData3DTexture?P.texSubImage3D(bt,pe,st,xt,wt,Te,Ne,Ce,_t,Ve,yt.data):N.isCompressedArrayTexture?P.compressedTexSubImage3D(bt,pe,st,xt,wt,Te,Ne,Ce,_t,yt.data):P.texSubImage3D(bt,pe,st,xt,wt,Te,Ne,Ce,_t,Ve,yt):S.isDataTexture?P.texSubImage2D(P.TEXTURE_2D,pe,st,xt,Te,Ne,_t,Ve,yt.data):S.isCompressedTexture?P.compressedTexSubImage2D(P.TEXTURE_2D,pe,st,xt,yt.width,yt.height,_t,yt.data):P.texSubImage2D(P.TEXTURE_2D,pe,st,xt,Te,Ne,_t,Ve,yt);P.pixelStorei(P.UNPACK_ROW_LENGTH,ct),P.pixelStorei(P.UNPACK_IMAGE_HEIGHT,dn),P.pixelStorei(P.UNPACK_SKIP_PIXELS,Cs),P.pixelStorei(P.UNPACK_SKIP_ROWS,fn),P.pixelStorei(P.UNPACK_SKIP_IMAGES,yr),pe===0&&N.generateMipmaps&&P.generateMipmap(bt),j.unbindTexture()},this.initRenderTarget=function(S){ce.get(S).__webglFramebuffer===void 0&&fe.setupRenderTarget(S)},this.initTexture=function(S){S.isCubeTexture?fe.setTextureCube(S,0):S.isData3DTexture?fe.setTexture3D(S,0):S.isDataArrayTexture||S.isCompressedArrayTexture?fe.setTexture2DArray(S,0):fe.setTexture2D(S,0),j.unbindTexture()},this.resetState=function(){A=0,I=0,L=null,j.reset(),be.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return zn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=lt._getDrawingBufferColorSpace(e),t.unpackColorSpace=lt._getUnpackColorSpace()}};var ot={water:1605517,deep:1334128,foam:13234911,cream:16773326,sand:15124888,coral:15695981,dark:2445145,wood:9989198,leaf:4099191,leafLight:7846289,brass:15120733,stone:10991790};function ft(i,e,t=.78,n={}){let s=new go({color:e,roughness:t,metalness:0,...n});return s.name=i,s}var oe={cream:ft("warm-linen",ot.cream),sand:ft("warm-sand",ot.sand),coral:ft("coral-enamel",ot.coral),dark:ft("deep-teal-enamel",ot.dark),wood:ft("oiled-timber",ot.wood),leaf:ft("mangrove-leaf",ot.leaf),leafLight:ft("palm-leaf-tip",ot.leafLight),brass:ft("aged-brass",ot.brass,.4,{metalness:.45}),stone:ft("chalk-stone",ot.stone),rock:ft("submerged-basalt",6653318),glass:ft("sea-glass",8773329,.25,{metalness:.1})};function mt(i,e,t=0,n=0,s=0,r="mesh"){let o=new Lt(i,e);return o.position.set(t,n,s),o.name=r,o.castShadow=!0,o.receiveShadow=!0,o}var dt=(i,e,t,n,s=0,r=0,o=0,a="timber")=>mt(new Vn(i,e,t),n,s,r,o,a),At=(i,e,t,n,s=0,r=0,o=0,a=8,l="column")=>mt(new In(i,e,t,a),n,s,r,o,l),kt=(i,e,t=0,n=0,s=0,r=0,o="stone")=>mt(new Qn(i,r),e,t,n,s,o),En=i=>{let e=new Zt;return e.name=i,e};function Hi(i,e,t,n=oe.wood,s="branch"){let r=new C().subVectors(e,i),o=At(t*.8,t,r.length(),n,0,0,0,6,s);return o.position.copy(i).add(e).multiplyScalar(.5),o.quaternion.setFromUnitVectors(new C(0,1,0),r.normalize()),o}function Z_(){let i=[[0,-6.8],[1.9,-4.3],[2.65,-1],[2.5,3.6],[1.85,5.1],[-1.85,5.1],[-2.5,3.6],[-2.65,-1],[-1.9,-4.3]],e=[],t=[],n=[];[{scale:.55,y:-1.45},{scale:.92,y:-.25},{scale:1,y:.85}].forEach(o=>i.forEach(([a,l],c)=>{e.push(a*o.scale,o.y,l*o.scale),n.push(c/(i.length-1),(o.y+1.45)/2.3)}));for(let o=0;o<2;o++)for(let a=0;a<i.length;a++){let l=o*i.length+a,c=o*i.length+(a+1)%i.length,h=l+i.length,u=c+i.length;t.push(l,h,c,c,h,u)}let r=new Kt;return r.setAttribute("position",new ut(e,3)),r.setAttribute("uv",new ut(n,2)),r.setIndex(t),r.computeVertexNormals(),r}function Hl(i,e,t,n){let s=new Oi;return s.moveTo(0,0),s.lineTo(i,1),s.quadraticCurveTo(i*.48,e*.48,0,e),s.closePath(),mt(new ps(s,{depth:.095,bevelEnabled:!0,bevelSegments:1,steps:1,bevelSize:.04,bevelThickness:.025,curveSegments:5}),t,0,0,0,n)}function xf(i="steady"){let e=En(`tidebound-vessel-${i}`);e.add(mt(Z_(),oe.dark,0,0,0,"lapstrake-hull"));let t=new Oi;t.moveTo(0,6.5),t.lineTo(1.8,4.2),t.lineTo(2.45,1),t.lineTo(2.3,-3.5),t.lineTo(1.7,-4.9),t.lineTo(-1.7,-4.9),t.lineTo(-2.3,-3.5),t.lineTo(-2.45,1),t.lineTo(-1.8,4.2),t.closePath();let n=mt(new ps(t,{depth:.22,bevelEnabled:!1}),oe.cream,0,.72,0,"laid-deck");n.rotation.x=-Math.PI/2,e.add(n);for(let a of[-1,1]){let l=dt(.14,.35,7.4,oe.coral,a*2.45,.51,.1,"painted-waterline");l.rotation.y=a*.04,e.add(l),e.add(dt(.12,.15,7.4,oe.wood,a*2.39,1.35,.2,"gunwale"));for(let c=-2.8;c<4;c+=2.1)e.add(At(.07,.07,.7,oe.wood,a*2.38,1.05,c,5,"railing-post"))}e.add(dt(2.4,.9,2.4,oe.wood,0,1.25,2.3,"cabin")),e.add(dt(2.6,.18,2.6,oe.cream,0,1.8,2.3,"cabin-roof")),e.add(dt(1.1,.65,.06,oe.dark,0,1.35,1.07,"cabin-window")),e.add(At(.14,.21,11.6,oe.wood,0,6.1,-.55,8,"main-mast")),e.add(dt(.22,.3,2,oe.wood,0,1.2,4.5,"rudder-tiller"));let s=En("sail-rig");if(s.position.set(0,2.1,-.55),i==="cargo"){let a=dt(7.4,6.4,.1,oe.cream,0,4.5,0,"cargo-square-sail");s.add(a),s.add(dt(7.6,.15,.17,oe.wood,0,7.75,0,"cargo-yard")),s.add(dt(7.4,.65,.16,oe.coral,0,1.8,-.05,"sail-reef-band"));for(let l of[-2.4,0,2.4])s.add(dt(.05,6.2,.12,oe.sand,l,4.5,-.08,"cloth-seam"))}else{s.add(Hl(i==="swift"?6:4.9,9,oe.cream,"mainsail"));let a=Hl(i==="swift"?-4.4:-2.7,i==="swift"?7.7:6.5,i==="swift"?oe.coral:oe.sand,"jib");a.position.z=-.12,s.add(a),s.add(Hi(new C(0,.15,.1),new C(i==="swift"?6:4.9,1,.1),.09,oe.wood,"sail-boom"));let l=kt(.64,oe.coral,1.1,4.5,-.14,0,"sail-star");l.scale.set(1,1,.15),s.add(l)}e.add(s),e.add(Hi(new C(0,11.8,-.55),new C(0,1,-6.1),.025,oe.cream,"forestay")),e.add(Hi(new C(0,11.8,-.55),new C(0,1,4.9),.025,oe.cream,"backstay"));let r=Hl(1.8,.85,oe.coral,"mast-pennant");r.position.set(0,11.3,-.55),e.add(r);let o=mt(new Gn(.6,.15,6,12),oe.coral,-2.5,.85,2.4,"life-ring");o.rotation.y=Math.PI/2,e.add(o);for(let a=0;a<(i==="cargo"?3:1);a++)e.add(dt(.9,.8,.9,oe.sand,(a-1)*1.1,1.2,-3.5,"supply-crate"));return e.userData={assetId:`tidebound.vessel.${i}`,forward:"-Z",rig:i,colliders:[{type:"capsule",radius:2.5,length:8,axis:"z",center:[0,0,-.7]}]},e}function Ph(i=0,e=!1){let t=En(e?"mangrove-tree":"coastal-palm"),n=7+i%3,s=(i%2?1:-1)*1.1;if(t.add(Hi(new C(0,0,0),new C(s,n,0),e?.55:.32,oe.wood,"trunk")),e){for(let o=0;o<5;o++){let a=o*Math.PI*2/5;t.add(Hi(new C(s*.2,2.4,0),new C(Math.cos(a)*2.2,-.3,Math.sin(a)*2.2),.18,oe.wood,"exposed-root"))}let r=kt(3.5,oe.leaf,s,n,0,1,"mangrove-crown");r.scale.y=.65,t.add(r)}else{for(let r=0;r<7;r++){let o=r*Math.PI*2/7,a=new Oi;a.moveTo(0,0),a.quadraticCurveTo(.7,1.3,0,4.7),a.quadraticCurveTo(-.7,1.3,0,0);let l=mt(new ps(a,{depth:.13,bevelEnabled:!1,curveSegments:4}),r%2?oe.leaf:oe.leafLight,s,n,0,`palm-frond-${r}`);l.rotation.set(-.95,o,0,"YXZ"),t.add(l)}for(let r=0;r<3;r++)t.add(kt(.36,oe.wood,s+Math.sin(r*2)*.4,n-.4,Math.cos(r*2)*.4,0,"coconut"))}return t.userData={assetId:`tidebound.flora.${e?"mangrove":"palm"}`,colliders:[{type:"cylinder",radius:.6,height:n,center:[s*.5,n*.5,0]}]},t}function dr(i,e,t,n,s=0){let r=new In(i*.9,i,e,12,1,!1),o=r.attributes.position;for(let l=0;l<o.count;l++){let c=o.getX(l),h=o.getZ(l),u=Math.atan2(h,c),d=(1+.09*Math.sin(u*3+t)+.04*Math.cos(u*5+t))/1.13;o.setXYZ(l,c*d,o.getY(l),h*d)}return r.computeVertexNormals(),mt(r,n,0,s,0,"terraced-shore")}function _f(i={id:"island",radius:24,color:"#ead9ad",type:"explore"}){let e=En(`island-${i.id}`),t=i.radius||24,n=String(i.id).split("").reduce((r,o)=>r+o.charCodeAt(0),0);e.add(dr(t,4,n,oe.sand,-1.9)),e.add(dr(t*.99,3.6,n,oe.sand,1));let s=ft(`${i.id}-earth`,i.type==="reef"?6790804:8366474);if(e.add(dr(t*.79,5.1,n,oe.rock,3)),e.add(dr(t*.8,.8,n,s,5.5)),i.id==="gull"||i.id==="lighthouse"){let r=i.id==="gull"?.74:.53;e.add(dr(t*r,5,n+4,oe.stone,7.5)),e.add(dr(t*(r+.01),.7,n+4,s,10))}if(i.id==="ruin"){for(let r=0;r<5;r++){let o=r*1.25;e.add(At(1.1,1.3,7.3,oe.cream,Math.sin(o)*10,9.4,Math.cos(o)*9,6,"ruin-colonnade")),e.add(dt(3,.6,2.5,oe.stone,Math.sin(o)*10,13.1,Math.cos(o)*9,"ruin-capital"))}e.add(At(7,7,1,oe.stone,0,6.2,0,12,"star-court"))}if(i.id==="reef"){for(let r=0;r<9;r++){let o=kt(3.1,r%2?oe.glass:oe.coral,Math.cos(r*2.4)*8,5.4,Math.sin(r*2.4)*8,0,"glassy-reef-spire");o.scale.set(.65,1.7,.65),e.add(o)}e.add(dt(5.2,2.2,3,oe.sand,-7,1.1,10.2,"reef-jetty-landing"))}return e.userData={assetId:`tidebound.island.${i.id}`,groundHeight:i.id==="gull"||i.id==="lighthouse"?10.4:5.9,colliders:[{type:"cylinder",radius:t,height:10,center:[0,2.5,0]}]},e}function vf(){let i=En("harbor-kit");for(let t=0;t<3;t++){let n=(t-1)*8,s=t%2?2:-2;i.add(dt(6.4,5.2,6.4,oe.cream,n,8.6,s,"port-house"));let r=At(0,5.3,2.9,t===1?oe.dark:oe.coral,n,12.4,s,4,"hipped-tile-roof");r.rotation.y=Math.PI/4,i.add(r);for(let o of[-1,1])i.add(dt(1.1,1.7,.13,oe.dark,n+o*1.6,8.8,s-3.24,"shutter-window"));i.add(dt(1.4,2.6,.13,oe.wood,n,7.4,s-3.24,"port-door"))}i.add(At(.2,.25,11,oe.wood,10,10,-9,8,"harbor-flagpole"));let e=Hl(4,2,oe.coral,"harbor-pennant");e.position.set(10,13,-9),i.add(e);for(let t=0;t<5;t++)i.add(dt(1.8,1.8,1.8,t%2?oe.sand:oe.wood,-11.7+t*2.1,6.8,-9,"cargo-stack"));return i.userData.colliders=[{type:"box",size:[25,9,15],center:[0,9,0]}],i}function yf(i=13){let e=En("timber-jetty");for(let t=0;t<i;t+=1.3)e.add(dt(5,.28,1.12,oe.wood,0,2.15,t,"jetty-plank"));for(let t=1;t<i;t+=4)for(let n of[-2.2,2.2])e.add(At(.18,.23,5.8,oe.wood,n,.8,t,6,"jetty-pile"));for(let t of[-2.3,2.3]){e.add(At(.35,.35,1.1,oe.dark,t,2.9,.5,8,"mooring-bollard"));let n=mt(new Gn(.5,.11,5,12),oe.sand,t,2.8,.5,"mooring-rope");n.rotation.x=Math.PI/2,e.add(n)}return e}function Mf(i=!1){let e=En("far-tide-lighthouse");e.add(At(4.8,6,1.7,oe.stone,0,.85,0,12,"tower-foundation")),e.add(At(2.8,4.3,22,oe.cream,0,12,0,12,"lighthouse-tower"));for(let n of[5.5,12,18])e.add(At(n>15?3:3.8,n>15?3.2:4,1.8,oe.coral,0,n,0,12,"tower-band"));e.add(At(4.1,4.1,.8,oe.dark,0,23,0,12,"lantern-balcony"));for(let n=0;n<8;n++){let s=n*Math.PI/4;e.add(At(.09,.09,3.8,oe.dark,Math.sin(s)*2.7,25,Math.cos(s)*2.7,5,"lantern-frame"))}e.add(At(0,4.1,3.2,oe.dark,0,28,0,12,"lantern-roof"));let t=kt(1.7,i?ft("beacon-light",16771238,.25,{emissive:16764521,emissiveIntensity:2}):oe.glass,0,25,0,1,"keeper-lens");return e.add(t),e.add(dt(1.6,3,.2,oe.dark,0,2,-4.25,"lighthouse-door")),e.userData={assetId:"tidebound.structure.lighthouse",colliders:[{type:"cylinder",radius:5,height:30,center:[0,15,0]}]},e}function bf(i=6){let e=En("tidal-rock-cluster");for(let t=0;t<7;t++){let n=t*2.4,s=i*(.24+.1*(t%4)),r=kt(i*(.25+.06*(t%3)),t%3?oe.rock:oe.sand,Math.cos(n)*s,-.8+Math.sin(t)*.3,Math.sin(n)*s,0,"tidal-reef");r.scale.y=.75,e.add(r)}return e}function Io(i){let e=En(`discovery-${i}`);if(i==="foxfish"){let t=kt(1.15,oe.coral,0,0,0,1,"fox-fish-body");t.scale.set(.45,.8,1.7),e.add(t);let n=At(0,.9,1.6,oe.brass,0,0,2,3,"fish-tail");n.rotation.x=Math.PI/2,e.add(n);for(let s of[-1,1])e.add(kt(.18,oe.dark,s*.42,.25,-1,1,"fish-eye"));for(let s of[-.3,.4])e.add(dt(.95,1.35,.13,oe.cream,0,0,s,"fish-stripe"))}else if(i==="tern"){let t=kt(1,oe.cream,0,0,0,1,"tern-body");t.scale.set(.6,.6,1.3),e.add(t);for(let s of[-1,1]){let r=kt(1,oe.cream,s*1.4,.2,.15,0,"tern-wing");r.scale.set(2,.15,.7),r.rotation.z=s*.2,e.add(r)}let n=At(0,.25,1,oe.coral,0,.15,-1.25,5,"tern-beak");n.rotation.x=-Math.PI/2,e.add(n)}else if(i==="turtle"){let t=kt(1.8,oe.leaf,0,.3,0,1,"turtle-shell");t.scale.set(1,.5,1.15),e.add(t),e.add(kt(.65,oe.leafLight,0,.15,-2,1,"turtle-head"));for(let n of[-1,1])for(let s of[-1,1]){let r=kt(.9,oe.leafLight,n*1.5,0,s,0,"turtle-flipper");r.scale.set(1.1,.2,.5),r.rotation.y=n*s*.45,e.add(r)}}else if(i==="nautilus"){for(let t=0;t<10;t++){let n=t*.65,s=.15+t*.15;e.add(kt(.25+t*.075,t%2?oe.sand:oe.cream,Math.cos(n)*s,Math.sin(n)*s,0,0,"nautilus-shell-ridge"))}for(let t=0;t<5;t++)e.add(Hi(new C(-1,-.5,0),new C(-2.1,-1+t*.3,(t-2)*.18),.07,oe.coral,"nautilus-tentacle"))}else if(i==="fan-coral")for(let t=0;t<8;t++){let n=(t/7-.5)*2.4,s=new C(Math.sin(n)*3.5,Math.cos(n)*3.5+.6,Math.sin(t)*.25);e.add(Hi(new C(0,0,0),s,.15,oe.coral,"coral-fan-branch"));for(let r=1;r<4;r++){let o=s.clone().multiplyScalar(r/4);e.add(Hi(o,o.clone().add(new C(.55,1,.18)),.09,oe.coral,"coral-fan-filament"))}}else if(i==="mangrove-root")e.add(Ph(1,!0));else if(i==="seagrass")for(let t=0;t<12;t++){let n=At(.02,.14,2.5+t%3,oe.leafLight,Math.sin(t*2.4)*1.4,1.4,Math.cos(t*2.4)*1.4,3,"ribbon-seagrass");n.rotation.z=Math.sin(t)*.3,e.add(n)}else if(i==="glass-coral")for(let t=0;t<7;t++){let n=kt(1.1,oe.glass,Math.sin(t*2.4)*1.8,1+t%3*.45,Math.cos(t*2.4)*1.8,0,"glass-branch");n.scale.set(.45,2.4,.55),e.add(n)}else if(i==="star-tablet"){e.add(dt(3.2,4.5,.75,oe.stone,0,2.2,0,"star-tablet"));for(let t=0;t<7;t++){let n=t*Math.PI*2/7;e.add(kt(.17,oe.brass,Math.sin(n)*1.05,2.4+Math.cos(n)*1.25,-.45,0,"seven-star-inlay"))}e.add(dt(3.6,.5,1.4,oe.cream,0,.25,0,"tablet-plinth"))}else if(i==="tide-clock"){let t=mt(new Gn(2,.35,6,16),oe.brass,0,2,0,"tide-clock-rim");e.add(t),e.add(At(1.9,1.9,.4,oe.dark,0,2,0,12,"clock-face")),e.children[1].rotation.x=Math.PI/2,e.add(dt(.15,1.6,.2,oe.cream,.15,2.5,-.4,"clock-hand"));for(let n=0;n<8;n++){let s=n*Math.PI/4;e.add(dt(.35,.35,.6,oe.brass,Math.sin(s)*2.1,2+Math.cos(s)*2.1,0,"clock-gear"))}}else if(i==="beacon-lens"){e.add(At(1.5,1.9,.7,oe.stone,0,.35,0,8,"lens-plinth"));let t=kt(2,oe.glass,0,2.5,0,1,"refractor-lens");t.scale.set(1,1,.4),e.add(t);let n=mt(new Gn(2.1,.18,6,16),oe.brass,0,2.5,0,"lens-frame");e.add(n)}else{e.add(dt(3.8,1.5,2.4,oe.wood,0,.75,0,"keepers-archive")),e.add(dt(4,.3,2.5,oe.coral,0,1.6,0,"archive-lid")),e.add(dt(.5,.7,.15,oe.brass,0,1,-1.25,"archive-lock"));let t=dt(1.3,.3,1.7,oe.cream,.4,1.95,0,"keepers-journal");t.rotation.y=-.2,e.add(t)}return e.userData={assetId:`tidebound.discovery.${i}`,colliders:[{type:"sphere",radius:2.5,center:[0,1,0]}]},e}function Vl(){let i=En("tide-voyager"),e=[],t=(y,_,R,A,I)=>{let L=new js;return L.name=y,L.position.set(R,A,I),_?.add(L),e.push(L),L},n=t("Hips",null,0,1.1,0),s=t("Spine",n,0,.5,0),r=t("Head",s,0,.62,0);t("LeftArm",s,-.52,.22,0),t("RightArm",s,.52,.22,0),t("LeftLeg",n,-.24,-.2,0),t("RightLeg",n,.24,-.2,0),i.add(n),i.updateMatrixWorld(!0);let o=[],a=[],l=[],c=[],h=[],u=[],d=[],f=(y,_,R,A)=>{let I=new Vn(..._),L=new C,b=new Ke(A),M=o.length/3;for(let D=0;D<I.attributes.position.count;D++)L.fromBufferAttribute(I.attributes.position,D).add(new C(...R)),e[y].localToWorld(L),o.push(L.x,L.y,L.z),a.push(I.attributes.normal.getX(D),I.attributes.normal.getY(D),I.attributes.normal.getZ(D)),l.push(I.attributes.uv.getX(D),I.attributes.uv.getY(D)),c.push(y,0,0,0),h.push(1,0,0,0),u.push(b.r,b.g,b.b);for(let D=0;D<I.index.count;D++)d.push(M+I.index.getX(D));I.dispose()};f(0,[.7,.4,.48],[0,0,0],ot.dark),f(1,[.86,.78,.5],[0,0,0],ot.coral),f(2,[.61,.6,.58],[0,.04,0],15318161),f(2,[.8,.13,.78],[0,.4,0],ot.cream),f(2,[.58,.28,.56],[0,.52,0],ot.cream),f(2,[.46,.16,.1],[0,.12,-.32],ot.dark);for(let y of[3,4])f(y,[.24,.72,.28],[0,-.3,0],ot.coral),f(y,[.23,.24,.25],[0,-.75,0],15318161);for(let y of[5,6])f(y,[.3,.8,.34],[0,-.35,0],ot.dark),f(y,[.35,.22,.58],[0,-.82,-.12],ot.cream);let g=new Kt;g.setAttribute("position",new ut(o,3)),g.setAttribute("normal",new ut(a,3)),g.setAttribute("uv",new ut(l,2)),g.setAttribute("color",new ut(u,3)),g.setAttribute("skinIndex",new us(c,4)),g.setAttribute("skinWeight",new ut(h,4)),g.setIndex(d);let v=new Jr(g,ft("voyager-woven-uniform",16777215,.85,{vertexColors:!0}));v.name="VoyagerSkin",v.castShadow=!0,i.add(v),v.bind(new jr(e));let m=(y,_,R,A)=>{let I=R.flatMap(L=>new Jt().setFromAxisAngle(_,L).toArray());return new fi(`${y}.quaternion`,A,I)},p=new C(1,0,0),E=new C(0,0,1);return i.animations=[new mi("DockIdle",3,[m("LeftArm",E,[.08,.14,.08],[0,1.5,3]),m("RightArm",E,[-.08,-.14,-.08],[0,1.5,3]),m("Head",p,[0,.07,0],[0,1.5,3])]),new mi("Swim",1.6,[m("LeftArm",p,[-1.8,.6,-1.8],[0,.8,1.6]),m("RightArm",p,[.6,-1.8,.6],[0,.8,1.6]),m("LeftLeg",p,[-.4,.4,-.4],[0,.8,1.6]),m("RightLeg",p,[.4,-.4,.4],[0,.8,1.6])]),new mi("DockWave",1.8,[m("RightArm",E,[-2.5,-2.1,-2.5,-2.1,-2.5],[0,.45,.9,1.35,1.8])])],i.userData={assetId:"tidebound.character.voyager",rootMotion:!1,colliders:[{type:"capsule",radius:.48,height:2.7,center:[0,1.35,0]}]},i}function Sf(){let i=En("three-dimensional-current-marker"),e=dt(.45,.15,3.7,oe.glass,0,0,.3,"current-shaft");i.add(e);for(let t of[-1,1]){let n=dt(.45,.16,1.9,oe.glass,t*.62,0,-1.1,"current-chevron");n.rotation.y=-t*.75,i.add(n)}return i}function Ef(){let i=En("sea-survey-buoy");return i.add(At(1.6,1.3,.7,oe.coral,0,.25,0,12,"buoy-float")),i.add(At(.13,.19,3.5,oe.dark,0,2,0,6,"buoy-mast")),i.add(kt(.85,oe.brass,0,4,0,0,"survey-signal")),i.add(dt(1.6,.65,.2,oe.cream,0,2.6,0,"research-plate")),i.add(dt(.7,.42,.8,oe.glass,.8,.9,0,"sample-container")),i.userData={assetId:"tidebound.navigation.survey-buoy",colliders:[{type:"sphere",radius:9,center:[0,0,0],trigger:!0,purpose:"optional low-speed observation; no rigid collision"}]},i}function wf(i=15){let e=En("tidal-whirlpool");for(let t=0;t<4;t++){let n=mt(new Gn(i*(.3+t*.2),.14+t*.04,5,36,Math.PI*1.6),t%2?oe.glass:oe.cream,0,-t*.045,0,"spiral-current");n.rotation.x=-Math.PI/2,n.rotation.z=t*.8,e.add(n)}return e}var Dh=Math.PI*2,J_=`
uniform float uTime;uniform float uTide;uniform float uMotion;
varying vec3 vWorld;varying vec3 vNormal;varying float vWave;
void main(){vec3 p=position;float a=p.x*.075+uTime*.9;float b=-p.y*.11-uTime*.65;float c=(p.x-p.y)*.041+uTime*.55;
float h=(sin(a)*.34+sin(b)*.22+sin(c)*.18)*uMotion;p.z+=h+uTide;
vec4 world=modelMatrix*vec4(p,1.);vWorld=world.xyz;vWave=h;vNormal=normalize(vec3(-cos(a)*.0255*uMotion-cos(c)*.00738*uMotion,1.,-cos(b)*.0242*uMotion-cos(c)*.00738*uMotion));
gl_Position=projectionMatrix*viewMatrix*world;}`,K_=`
uniform float uTime;uniform vec3 uCamera;uniform float uDive;
varying vec3 vWorld;varying vec3 vNormal;varying float vWave;
void main(){vec3 deep=vec3(.055,.34,.40),shallow=vec3(.10,.53,.55);float l=.52+vWave*.55;vec3 col=mix(deep,shallow,l);
vec3 light=normalize(vec3(-.5,1.,-.35));vec3 viewDir=normalize(uCamera-vWorld);float spec=pow(max(dot(reflect(-light,vNormal),viewDir),0.),180.);
float ripple=sin(vWorld.x*.22+sin(vWorld.z*.13)*1.3+uTime*.4)*sin(vWorld.z*.27+sin(vWorld.x*.14));float glint=smoothstep(.94,.999,ripple)*.085;
col+=vec3(.82,.88,.70)*spec*.45+glint;float fog=smoothstep(240.,650.,distance(uCamera,vWorld));col=mix(col,vec3(.69,.82,.79),fog);
gl_FragColor=vec4(col,1.-uDive*.43);}`;function Tf(i){return new Set(Array.isArray(i)?i.map(e=>typeof e=="string"?e:e.id):Object.keys(i||{}))}function yi(i,e){let t=mt(new Gn(i,.15,5,40),ft("navigation-ring",e,.6,{emissive:e,emissiveIntensity:.12}));return t.rotation.x=-Math.PI/2,t.castShadow=!1,t}function Af(i,e,t=!1){if(!e.length)return[];let n=Ph(1,t);n.updateMatrixWorld(!0);let s=[];return n.traverse(r=>{if(!r.isMesh)return;let o=new eo(r.geometry,r.material,e.length);o.name=t?"instanced-mangroves":"instanced-palms",o.castShadow=!0,o.receiveShadow=!0;let a=new nt,l=new Jt,c=new C;e.forEach((h,u)=>{l.setFromAxisAngle(new C(0,1,0),h.a),c.setScalar(h.scale),a.compose(new C(h.x,h.y,h.z),l,c).multiply(r.matrixWorld),o.setMatrixAt(u,a)}),o.computeBoundingSphere(),i.add(o),s.push(o)}),s}function Rf(i,e){let{ISLANDS:t=[],DISCOVERIES:n=[],REEFS:s=[],CURRENTS:r=[],WHIRLS:o=[],DIVE_SITES:a=[],OBSERVATIONS:l=[]}=e,c=new zl({canvas:i,antialias:!0,alpha:!1,powerPreference:"high-performance"});c.setClearColor(11653834),c.outputColorSpace=nn,c.toneMapping=Za,c.toneMappingExposure=1.22,c.shadowMap.enabled=!0,c.shadowMap.type=Ha;let h=new Zr;h.background=new Ke(11653834),h.fog=new Yr(11653834,230,620);let u=new Wt(43,1,.35,1e3);u.position.set(0,73,229);let d=new vo(15267555,3766390,2.3);h.add(d);let f=new bo(16772305,3);f.position.set(-130,220,-100),f.castShadow=!0,f.shadow.mapSize.set(1536,1536),f.shadow.camera.left=-95,f.shadow.camera.right=95,f.shadow.camera.top=95,f.shadow.camera.bottom=-95,f.shadow.camera.near=5,f.shadow.camera.far=480,f.shadow.bias=-5e-4,f.shadow.normalBias=.18,h.add(f),h.add(f.target);let g=new yn({uniforms:{uTime:{value:0},uTide:{value:0},uMotion:{value:1},uCamera:{value:u.position},uDive:{value:0}},vertexShader:J_,fragmentShader:K_,side:bn,transparent:!0,depthWrite:!0}),v=112,m=new Lt(new Bi(1500,1500,v,v),g);m.rotation.x=-Math.PI/2,m.name="displaced-ocean-surface",m.frustumCulled=!1,m.renderOrder=0,h.add(m);let p=[],E=[],y=[],_=[],R=[],A=[],I,L,b;for(let U of t){let T=_f(U);T.position.set(U.x,0,U.z),h.add(T);let k=new Zt;k.name=`island-detail-${U.id}`,k.position.set(U.x,0,U.z),h.add(k);let re=T.userData.groundHeight;if(U.id==="harbor"&&k.add(vf()),U.id==="lighthouse"){I=Mf(!1),I.position.y=re,k.add(I);let ue=I.getObjectByName("keeper-lens");ue.material=ue.material.clone(),ue.material.name="keeper-lens-active",L=new yo(16768138,0,80,2),L.position.set(U.x,re+25,U.z),h.add(L),b=mt(new ds(17,110,24,1,!0),ft("restored-beacon-ray",16770464,.6,{transparent:!0,opacity:.075,depthWrite:!1,side:bn,emissive:16769698,emissiveIntensity:.8}),0,0,0,"restored-lighthouse-beam"),b.geometry.translate(0,-55,0),b.rotation.z=Math.PI/2;let Je=new Zt;Je.name="beacon-rotation",Je.position.set(U.x,re+25,U.z),Je.add(b),h.add(Je),b.userData.rotor=Je,Je.visible=!1}let xe=new C(U.x-U.dock.x,0,U.z-U.dock.z),Q=Math.max(8,xe.length()-U.radius*.63),K=yf(Q);K.rotation.y=Math.atan2(xe.x,xe.z),K.position.set(U.dock.x+Math.cos(K.rotation.y)*7,0,U.dock.z-Math.sin(K.rotation.y)*7),h.add(K);let _e=yi(5.9,16767117);_e.position.set(U.dock.x,.85,U.dock.z),h.add(_e);let Ue=mt(new In(.7,.9,4.5,8),ft("dock-marker",ot.coral),U.dock.x+Math.cos(K.rotation.y)*4,2.8,U.dock.z-Math.sin(K.rotation.y)*4,"safe-mooring-marker");h.add(Ue);let Be=mt(new Qn(.9,0),ft("port-lantern",ot.cream,.4,{emissive:16767366,emissiveIntensity:.5}),0,2.9,0,"dock-lantern");if(Ue.add(Be),U.id!=="reef"&&U.id!=="ruin"&&U.id!=="lighthouse")for(let ue=0;ue<(U.id==="mangrove"?7:4);ue++){let Je=ue*2.399+U.x*.01,rt=U.radius*(.3+.1*(ue%3));(U.id==="mangrove"?A:R).push({x:U.x+Math.cos(Je)*rt,y:re,z:U.z+Math.sin(Je)*rt,a:Je,scale:.75+ue%3*.14})}if(U.id==="harbor"||U.id==="gull"){let ue=Vl();ue.scale.setScalar(1.3),ue.position.set(-3,re,-U.radius*.55),k.add(ue);let Je=new _s(ue);Je.clipAction(ue.animations[U.id==="harbor"?2:0]).play(),y.push({mixer:Je,person:ue,islandId:U.id})}for(let[ue,Je]of n.filter(rt=>rt.islandId===U.id&&!rt.diveSiteId).entries()){let rt=Io(Je.id),Vt=-Math.PI*.7+ue*1.3;rt.position.set(Math.sin(Vt)*U.radius*.37,re+.3,Math.cos(Vt)*U.radius*.37),Je.id==="tern"&&(rt.position.y+=4.5),k.add(rt);let Dt=yi(3,ot.brass);Dt.position.copy(rt.position),Dt.position.y=re+.15,k.add(Dt),E.push({id:Je.id,model:rt,ring:Dt,baseY:rt.position.y,animal:Je.kind==="animal"})}p.push({land:T,detail:k,ring:_e,data:U})}let M=[...Af(h,R),...Af(h,A,!0)],D=Ef(),z=l.map(U=>{let T=D.clone(!0);T.name=`survey-${U.id}`,h.add(T);let k=yi(3.6,ot.brass);return h.add(k),{data:U,model:T,ring:k}}),G=yi(4,5541867);h.add(G);let q=mt(new ds(.7,2.2,6),ft("navigation-guide",5541867,.5,{emissive:2710714,emissiveIntensity:.25}),0,0,0,"selected-route-waypoint");h.add(q);let Z=s.map(U=>{let T=bf(U.radius);T.scale.y=.42;let k=new vn().setFromObject(T);T.position.set(U.x,U.safeHeight*1.7-k.max.y,U.z),h.add(T);let re=yi(U.radius+.5,15571827);return re.position.set(U.x,0,U.z),h.add(re),{data:U,model:T,ring:re}}),Y=r.map((U,T)=>{let k=[];for(let re=0;re<7;re++){let xe=Sf();xe.position.set(U.x+(T?8:-8)*Math.sin(re),.3,U.z+(re-3)*15),h.add(xe),k.push(xe)}return{data:U,arrows:k}}),he=o.map(U=>{let T=wf(U.radius);T.position.set(U.x,0,U.z),h.add(T);let k=yi(U.radius,ot.coral);return k.position.copy(T.position),h.add(k),{data:U,model:T,rim:k}});for(let U of a){let T=new Zt;T.name=`underwater-${U.id}`;let k=mt(new In(U.radius,U.radius*1.1,2,16),ft("underwater-sand",10798765),U.entry.x,-9.5,U.entry.z,"shallow-seabed");T.add(k);let re=[];for(let ue=0;ue<14;ue++){let Je=ue*2.4,rt=8+ue%4*4,Vt=Io(U.id==="ruin-dive"?ue%3?"glass-coral":"star-tablet":ue%2?"fan-coral":"seagrass");Vt.scale.setScalar(.45+ue%3*.2),Vt.position.set(U.entry.x+Math.sin(Je)*rt,-8.6,U.entry.z+Math.cos(Je)*rt),T.add(Vt),re.push(Vt)}let xe=Io(U.discoveryId);xe.position.set(U.target.x,-6.8,U.target.z),xe.scale.setScalar(1.35),T.add(xe),E.push({id:U.discoveryId,model:xe,ring:null,baseY:-6.8,animal:U.discoveryId!=="tide-clock",underwater:!0});let Q=mt(new po(1.2),ft(`lighthouse-part-${U.partId}`,ot.brass,.28,{metalness:.45,emissive:16764007,emissiveIntensity:.3}),U.target.x+2,-6.1,U.target.z,"recoverable-lighthouse-part");T.add(Q);let K=yi(4,ot.brass);K.position.set(U.target.x,-8.4,U.target.z),T.add(K);let _e=[];for(let ue of U.bubbles){let Je=mt(new Qn(.9,0),ft("oxygen-spring",12188656,.2,{emissive:7527621,emissiveIntensity:.6}),ue.x,-8.1,ue.z,"oxygen-spring");T.add(Je);for(let rt=0;rt<8;rt++){let Vt=mt(new Qn(.16+rt%3*.07,1),ft("oxygen-bubble",14221298,.2,{transparent:!0,opacity:.6}),ue.x,-7+rt*.8,ue.z);Vt.castShadow=!1,T.add(Vt),_e.push({mesh:Vt,x:ue.x,z:ue.z,phase:rt*.8})}}let Ue=yi(4,8974041);Ue.position.set(U.entry.x,-8.1,U.entry.z),T.add(Ue);let Be=mt(new In(.045,.045,8,5),ft("dive-return-rope",ot.cream),U.entry.x,-3.3,U.entry.z,"return-to-vessel-rope");T.add(Be),h.add(T),_.push({site:U,group:T,part:Q,partRing:K,bubbles:_e,objects:re,treasure:xe})}let W=new Zt;W.name="player-buoyant-vessel",h.add(W);let ve=["steady","swift","cargo"].map(U=>{let T=xf(U);return T.visible=U==="steady",W.add(T),T}),Me=Vl();Me.scale.setScalar(.83),Me.position.set(-.9,1.1,3.5),W.add(Me);let Ae=new _s(Me);Ae.clipAction(Me.animations[0]).play();let He=Vl();He.scale.setScalar(1.2),h.add(He);let et=new _s(He);et.clipAction(He.animations[1]).play(),He.visible=!1;let at=[];for(let U=0;U<10;U++){let T=yi(1.6+U*.18,12774103);T.material.transparent=!0,T.material.opacity=.3,h.add(T),at.push(T)}let it=[];for(let U=0;U<4;U++){let T=Io("tern");T.scale.setScalar(.6),h.add(T),it.push(T)}let J=new Zt;J.name="harbor-story-celebration";let ae=t.find(U=>U.id==="harbor");J.position.set(ae?.x||0,0,ae?.z||190),J.visible=!1,h.add(J);let Re=[ft("festival-coral",ot.coral),ft("festival-linen",ot.cream),ft("festival-brass",ot.brass)],Oe=[];for(let U of[-1,1]){let T=U*12;J.add(mt(new In(.16,.21,10,6),ft("festival-timber",ot.wood),T,10.5,-14,"festival-mast"));let k=mt(new Qn(.65,1),ft("warm-welcome-lantern",16768916,.3,{emissive:16763230,emissiveIntensity:1.2}),T,16.2,-14,"welcome-lantern");J.add(k),Oe.push(k)}let Pe=new ds(.8,1.65,3);Pe.scale(1,1,.22);let Qe=[];for(let U=0;U<13;U++){let T=-12+U*2,k=14.4+Math.pow(T/12,2)*1.1;if(Qe.push(new C(T,k,-14)),U>0&&U<12){let re=mt(Pe,Re[U%3],T,k-.7,-14,"welcome-pennant");re.rotation.z=Math.PI,J.add(re)}}let gt=mt(new mo(new tr(Qe),24,.045,4,!1),ft("festival-cord",ot.cream),0,0,0,"festival-bunting-cord");J.add(gt);let P=new Zt;P.name="one-shot-return-confetti",J.add(P);let le=new Vn(.24,.06,.42),ne=[];for(let U=0;U<30;U++){let T=mt(le,Re[U%3],0,0,0,"volumetric-confetti");T.castShadow=!1,P.add(T),ne.push({mesh:T,phase:U/30*Dh,x:(U%10-4.5)*1.6,z:-18-Math.floor(U/10)*2,delay:U%5*.14})}let ee=!1,j=0,me="follow",ce=0,fe="high",Xe=!1,$e=0,w=0,x=null,O=!1,X=!1,te=new C,$=new C,De=new C(0,0,157),ge=new C;function Ie(){if(Xe)return;let U=i.getBoundingClientRect(),T=Math.max(1,U.width||i.clientWidth||1280),k=Math.max(1,U.height||i.clientHeight||720);c.setSize(T,k,!1),c.setPixelRatio(Math.min(globalThis.devicePixelRatio||1,fe==="low"?1.2:1.65)),u.aspect=T/k,u.updateProjectionMatrix()}function Le(U){fe!==U&&(fe=U,c.shadowMap.enabled=fe==="high",v=fe==="high"?112:56,m.geometry.dispose(),m.geometry=new Bi(1500,1500,v,v),M.forEach(T=>T.castShadow=fe==="high"),Ie())}function de(U,T=0,k={}){if(Xe)return;x=U;let xe=!!k.paused?0:Math.min(T,.1);$e+=xe,w++,Le(k.quality||"high");let Q=Number(U.time)||0,K=an(Q),_e=K.height*1.7,Ue=k.reducedMotion?.18:1,Be=U.mode==="diving";g.uniforms.uTime.value=Q,g.uniforms.uTide.value=_e,g.uniforms.uMotion.value=Ue,g.uniforms.uDive.value=Be?1:0;let ue=U.boat||{x:0,z:157,heading:0,speed:0,sail:0},Je=(ie,ze)=>Math.sin(ie*.075+Q*.9)*.34+Math.sin(ze*.11-Q*.65)*.22+Math.sin((ie+ze)*.041+Q*.55)*.18;W.position.set(ue.x,_e+.14+Je(ue.x,ue.z)*Ue,ue.z),W.rotation.set((Je(ue.x,ue.z-3)-Je(ue.x,ue.z+3))*.075*Ue,-(ue.heading||0),(Je(ue.x-2,ue.z)-Je(ue.x+2,ue.z))*.11*Ue,"YXZ");let rt=U.rigId||ue.rig||"steady";ve.forEach(ie=>{ie.visible=ie.userData.rig===rt;let ze=ie.getObjectByName("sail-rig"),Mt=typeof ue.sail=="number"?ue.sail:1;ze.scale.y=.15+Math.max(0,Math.min(1,Mt))*.85,ze.rotation.y=Math.sin(Q*.6)*.025*Ue}),Ae.update(xe),y.forEach(ie=>{k.reducedMotion&&ie.islandId==="harbor"||ie.mixer.update(xe)}),et.update(xe);let Vt=!!U.storyComplete&&U.currentIsland==="harbor";J.visible=!!U.storyComplete&&!Be,U.storyComplete?Vt&&!ee&&(ee=!0,j=0):(ee=!1,j=0),ee&&(j=Math.min(6,j+xe)),P.visible=Vt&&ee&&j<5&&!k.reducedMotion;for(let ie of ne){let ze=Math.max(0,j-ie.delay);ie.mesh.visible=ze>0&&ze<4.3,ie.mesh.position.set(ie.x+Math.sin(ze*1.6+ie.phase)*1.5,8+ze*5-ze*ze*1.4,ie.z+ze*.6),ie.mesh.rotation.set(ze*2+ie.phase,ze*1.4,ze*2.6)}Oe.forEach((ie,ze)=>{ie.material.emissiveIntensity=k.reducedMotion?1.2:1.2+Math.sin($e*1.2+ze)*.12});let Dt=si(U);G.visible=q.visible=!!Dt&&!Be&&U.mode==="sailing",Dt&&(G.position.set(Dt.target.x,_e+.18,Dt.target.z),q.position.set(Dt.target.x,_e+2.2,Dt.target.z),q.rotation.z=Math.PI);for(let ie of z){let ze=Math.hypot(ue.x-ie.data.x,ue.z-ie.data.z),Mt=U.voyage?.harvested?.includes(`observation:${ie.data.id}`);ie.model.position.set(ie.data.x,_e+Je(ie.data.x,ie.data.z)*Ue,ie.data.z),ie.model.rotation.z=Math.sin(Q*.9+ie.data.x)*.045*Ue,ie.model.visible=!Be&&ze<180,ie.ring.position.set(ie.data.x,_e+.12,ie.data.z),ie.ring.visible=!Be&&!Mt&&ze<55}let xr=Tf(U.discoveries);for(let ie of E)ie.ring&&(ie.ring.material.color.setHex(xr.has(ie.id)?8702371:ot.brass),ie.ring.visible=!0),ie.animal&&(ie.model.position.y=ie.baseY+Math.sin(Q*1.7+ie.baseY)*.25*Ue,ie.model.rotation.y=Math.sin(Q*.3)*.25);for(let ie of Z){let ze=K.height<=ie.data.safeHeight;ie.ring.position.y=_e+.15,ie.ring.visible=ze,ie.model.visible=!0}for(let ie of Y){let ze=Ti(ie.data.x,ie.data.z,Q,U.seed||1),Mt=Math.atan2(-ze.x,-ze.z);ie.arrows.forEach((qi,vr)=>{qi.position.y=_e+.18+Math.sin(Q+vr)*.025,qi.rotation.y=Number.isFinite(Mt)?Mt:0})}for(let ie of he){let ze=Math.sin(Q/240*Dh+ie.data.phase)>.25;ie.model.position.y=_e+.19,ie.model.rotation.y=k.reducedMotion?0:Q*(ze?.55:.12),ie.model.scale.setScalar(ze?1:.75),ie.rim.position.y=_e+.13,ie.rim.material.color.setHex(ze?ot.coral:ot.brass),ie.model.visible=!0}let zo=Tf(U.parts);for(let ie of _)ie.group.visible=Be&&U.activeDive===ie.site.id,ie.objects.forEach((ze,Mt)=>ze.visible=fe!=="low"||Mt%3===0),ie.part.visible=!zo.has(ie.site.partId),ie.part.position.y=-6.1+Math.sin(Q*1.3)*.18*Ue,ie.part.rotation.y=Q*.6,ie.bubbles.forEach((ze,Mt)=>{ze.mesh.position.set(ze.x+Math.sin(Q+Mt)*.3,-8+(Q*.8+ze.phase)%8,ze.z+Math.cos(Q+Mt)*.3)});if(He.visible=Be,Be){let ie=U.diver||ue;He.position.set(ie.x,-5.9+Math.sin(Q*2)*.12*Ue,ie.z),He.rotation.set(-Math.PI*.34,-(ie.heading||0),0,"YXZ")}if(I&&!!U.lighthouseFixed!==O){O=!!U.lighthouseFixed;let ie=I.getObjectByName("keeper-lens");ie.material.color.setHex(O?16768928:8773329),ie.material.emissive.setHex(O?16762971:0),ie.material.emissiveIntensity=O?2:0,L.intensity=O?50:0,b.userData.rotor.visible=O}b&&(b.userData.rotor.rotation.y=k.reducedMotion?0:Q*.16);let _r=Math.abs(ue.speed||0);at.forEach((ie,ze)=>{ie.visible=!Be&&_r>1;let Mt=6+ze*1.25+Q*3%1.25;ie.position.set(ue.x-Math.sin(ue.heading||0)*Mt,_e+.12,ue.z+Math.cos(ue.heading||0)*Mt),ie.scale.set(1+ze*.12,.6+ze*.08,1),ie.material.opacity=(1-ze/10)*.25*Math.min(_r/6,1)}),it.forEach((ie,ze)=>{let Mt=Q*.04+ze*Dh/4;ie.position.set(119+Math.sin(Mt)*40,24+ze*3,57+Math.cos(Mt)*30),ie.rotation.y=-Mt,ie.rotation.z=Math.sin(Q*2+ze)*.06*Ue,ie.visible=!Be&&fe==="high"}),te.set(Be?U.diver?.x??ue.x:ue.x,Be?-5.4:_e+1,Be?U.diver?.z??ue.z:ue.z);let Xi=-(ue.heading||0)+ce,Rs=!1;if(Be)$.set(te.x+18,Math.min(_e-.65,te.y+8),te.z+23),u.fov=46,h.fog.color.setHex(3768202),h.fog.near=15,h.fog.far=90,h.background.setHex(3768202),m.visible=!1;else{m.visible=!0,u.fov=43,h.fog.color.setHex(11653834),h.fog.near=230,h.fog.far=620,h.background.setHex(11653834);let ie=me==="overhead",ze=t.find(Kl=>Kl.id==="lighthouse");Rs=!!ze&&Math.hypot(ue.x-ze.x,ue.z-ze.z)<78;let Mt=ie||Rs,qi=Mt?42:66,vr=Mt?108:61;$.set(te.x+Math.sin(Xi)*qi,te.y+vr,te.z+Math.cos(Xi)*qi)}if((X!==Be||Rs&&w===1)&&(u.position.copy($),De.copy(te),X=Be),!Be)for(let ie of t)Math.hypot($.x-ie.x,$.z-ie.z)<ie.radius+8&&($.y=Math.max($.y,ie.id==="lighthouse"?80:60));let $i=k.reducedMotion?1:1-Math.exp(-Math.max(xe,.016)*4.2);u.position.lerp($,$i),De.lerp(te,$i),u.lookAt(De),u.updateProjectionMatrix(),f.position.copy(te).add(new C(-100,180,-80)),f.target.position.copy(te),f.target.updateMatrixWorld(),p.forEach(ie=>{ie.detail.visible=!Be&&Math.hypot(te.x-ie.data.x,te.z-ie.data.z)<(fe==="low"?230:420),ie.land.visible=!Be,ie.ring.position.y=_e+.14,ie.ring.visible=!Be}),M.forEach(ie=>ie.visible=!Be),W.visible=!Be,Be?(d.intensity=2.8,f.intensity=1.8):(d.intensity=2.3,f.intensity=3),c.render(h,u)}function we(U){return me=U==="overhead"||U==="overview"?"overhead":"follow",ce=0,me}function Ge(U){ce=lh.clamp(ce+(Number(U)||0),-Math.PI*.8,Math.PI*.8)}function Fe(){return{renderer:"Three.js WebGLRenderer",revision:"180",camera:me,drawCalls:c.info.render.calls,triangles:c.info.render.triangles,geometries:c.info.memory.geometries,textures:c.info.memory.textures,frames:w,quality:fe,waterVertices:m.geometry.attributes.position.count,rig:x?.rigId||"steady",sceneMeshes:h.children.length,actualSkeletons:y.length+2,transparentEffects:at.length+1,shadowMaps:c.shadowMap.enabled?1:0,celebration:{visible:J.visible,confetti:P.visible,elapsed:j}}}function be(){if(Xe)return;Xe=!0,Ae.stopAllAction(),et.stopAllAction(),y.forEach(k=>k.mixer.stopAllAction());let U=new Set,T=new Set;h.traverse(k=>{k.geometry&&U.add(k.geometry),k.material&&(Array.isArray(k.material)?k.material:[k.material]).forEach(re=>T.add(re))}),U.forEach(k=>k.dispose()),T.forEach(k=>k.dispose()),c.dispose(),c.forceContextLoss()}return Ie(),{update:de,resize:Ie,dispose:be,setCamera:we,orbit:Ge,stats:Fe}}var Gl=class{constructor(){this.ctx=null,this.buffers={},this.voices=new Set,this.loops=[],this.last=new Map,this.prefs={music:.35,sfx:.65},this.active=!1,this.ambient=!1}async unlock(){this.ctx||(this.ctx=new(window.AudioContext||window.webkitAudioContext),this.master=this.ctx.createGain(),this.master.gain.value=.75,this.master.connect(this.ctx.destination),this.music=this.ctx.createGain(),this.effects=this.ctx.createGain(),this.music.connect(this.master),this.effects.connect(this.master),this.pending=Promise.all(["waves","music","sail","dock","discovery","danger","gull"].map(async e=>{let t=await fetch(new URL(`./assets/audio/${e}.wav`,location.href));if(!t.ok)throw new Error("\u97F3\u8A0A\u8F09\u5165\u5931\u6557");this.buffers[e]=await this.ctx.decodeAudioData(await t.arrayBuffer())}))),await this.ctx.resume(),await this.pending,this.setPrefs(this.prefs),this.setActive(this.active,this.ambient)}setPrefs(e){this.prefs=e,this.ctx&&(this.music.gain.value=e.music*.32,this.effects.gain.value=e.sfx*.42)}setActive(e,t=e){if(this.active=e,this.ambient=t,!(!this.ctx||!this.buffers.waves)){if(e&&t&&this.loops.length===0)for(let n of["waves","music"]){let s=this.ctx.createBufferSource();s.buffer=this.buffers[n],s.loop=!0,s.connect(n==="music"?this.music:this.effects),s.start(),this.loops.push(s)}else(!e||!t)&&(this.loops.forEach(n=>{n.stop(),n.disconnect()}),this.loops=[]);if(!e){for(let n of this.voices){try{n.stop()}catch{}n.disconnect()}this.voices.clear()}}}play(e){if(!this.ctx||!this.active||!this.buffers[e]||this.voices.size>=8)return;let t=this.ctx.currentTime;if(t-(this.last.get(e)??-10)<.15)return;this.last.set(e,t);let n=this.ctx.createBufferSource();n.buffer=this.buffers[e],n.connect(this.effects),this.voices.add(n),n.onended=()=>{this.voices.delete(n),n.disconnect()},n.start()}dispose(){this.setActive(!1),this.music?.disconnect(),this.effects?.disconnect(),this.master?.disconnect(),this.ctx?.close()}stats(){return{context:this.ctx?.state??"locked",loops:this.loops.length,voices:this.voices.size}}};var Nh="tidebound-cloud-input-lifecycle-20261028-01",If="stteak.tidebound.save.v1",Pf="stteak.tidebound.preferences.v1",se=i=>document.querySelector(i),mr=i=>Gt.find(e=>e.id===i),rn=i=>String(i??"").replace(/[&<>"']/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[e]),$n=new Gl,Rt={music:.35,sfx:.65,reducedMotion:matchMedia("(prefers-reduced-motion: reduce)").matches,quality:"high",camera:matchMedia("(pointer:coarse)").matches?"follow":"overhead"},F=Sr(1),Uo=!0,pr="";try{let i=localStorage.getItem(If);if(i){let t=ou(i);F=t.state,pr=t.message}let e=JSON.parse(localStorage.getItem(Pf)||"{}");for(let t of["music","sfx"])Number.isFinite(e[t])&&(Rt[t]=Math.max(0,Math.min(1,e[t])));typeof e.reducedMotion=="boolean"&&(Rt.reducedMotion=e.reducedMotion),["low","high"].includes(e.quality)&&(Rt.quality=e.quality),["overhead","follow"].includes(e.camera)&&(Rt.camera=e.camera)}catch{pr="\u4FDD\u5B58\u8CC7\u6599\u7121\u6CD5\u8B80\u53D6\uFF0C\u5DF2\u5B89\u5168\u5EFA\u7ACB\u65B0\u822A\u6D77\u65E5\u8A8C\u3002",Uo=!1}var Mi,Qt="ready",$l=window.parent===window,Ot=!1,$t=null,Fh="",Df=0,Lh=0,Uh=0,Cf=0,Oh=0,Vi=F.contractId||It[0].id,Wl=F.rigId||qn[0].id,Xl=F.seed||1,No=!1,Lf=!1,Uf=null,Dn=new Set,ql=new Map,Po=[],bi={x:0,y:0},Gi=null,Un=null,Fo=null,Bh=null,Yl=new URLSearchParams(location.search).get("session");function Zl(i,e={}){Yl&&window.parent!==window&&window.parent.postMessage({protocol:"stteak-game",version:1,sessionId:Yl,type:i,payload:e},location.origin)}function Wi(){Dn.clear(),ql.clear(),bi={x:0,y:0};let i=Gi;Gi=null;let e=se("#helm");if(se("#helm-knob")?.style.setProperty("transform","translate(0px,0px)"),e?.setAttribute("aria-valuenow","0"),i!==null)try{e?.hasPointerCapture?.(i)&&e.releasePointerCapture(i)}catch{}}function ni(i,e=4500){i&&(se("#toast").textContent=i,se("#toast").classList.add("visible"),Df=performance.now()+e)}function Vh(){Uo=!1,se("#storage-warning").hidden=!1,se("#storage-warning").textContent="\u672C\u6A5F\u5132\u5B58\u4E0D\u53EF\u7528\uFF1A\u6B64\u822A\u7A0B\u4ECD\u53EF\u73A9\uFF0C\u95DC\u9589\u9801\u9762\u5F8C\u9032\u5EA6\u53EF\u80FD\u6D88\u5931\u3002"}function ii(){try{localStorage.setItem(If,oc(F)),Uo=!0}catch{Vh()}}function Do(){try{localStorage.setItem(Pf,JSON.stringify(Rt))}catch{Vh()}$n.setPrefs(Rt),document.body.classList.toggle("reduced",Rt.reducedMotion)}async function Si(){Lf=!0;try{await $n.unlock(),Bo()}catch{ni("\u97F3\u8A0A\u5C1A\u672A\u8F09\u5165\uFF1B\u4ECD\u53EF\u4F7F\u7528\u756B\u9762\u63D0\u793A\u904A\u73A9\u3002")}}function Bo(){$n.setPrefs(Rt),$n.setActive(Qt==="running"&&!Ot&&!$t,["sailing","diving"].includes(F.mode))}function Oo(i){Qt=i,Zl("game:state",{state:i})}function As(){Fh="",Jl()}function Gh(i){for(let e of Array.isArray(i)?i:i?[i]:[])e.text&&ni(e.text),/damage|collision|rescue|warning|oxygen/.test(e.type)?$n.play("danger"):/discover|part|complete|lighthouse|ending|^observation$/.test(e.type)?$n.play("discovery"):/dock|deliver|result/.test(e.type)&&$n.play("dock"),/dock|deliver|rescue|discover|part|complete|lighthouse|observation/.test(e.type)&&ii();Bo()}function Xn(i){try{Qt==="ready"&&Wh();let e=F.mode;Gh(i()),(F.mode!==e||["harbor","island","result"].includes(F.mode))&&ii(),As()}catch(e){ni("\u9019\u500B\u52D5\u4F5C\u672A\u5B8C\u6210\uFF0C\u8ACB\u518D\u8A66\u4E00\u6B21\u3002"),console.error(e)}}function gr(i=!0){No&&(Ot=i,Wi(),i?(Oo("paused"),Ln("pause"),ii()):(Ts(!1),Oo("running")),Bo(),As())}function Wh(){$l&&(Oo("running"),Ot=!1,Ts(!1),As(),pr&&(ni(pr,6500),pr=""))}function Nf(){if(!No)return;Wi(),Gh(Wo(F,"restart")),F.mode="harbor",F.currentIsland="harbor",F.lastSafeIsland="harbor";let i=mr("harbor");F.boat.x=i.dock.x,F.boat.z=i.dock.z,F.boat.sail=0,F.boat.speed=0,F.boat.hull=100,F.result=null,ii(),Ot=!1,Ts(!1),Oo("running"),As(),ni("\u5DF2\u514D\u8CBB\u4FEE\u5FA9\u4E26\u8FD4\u56DE\u6BCD\u6E2F\u3002\u5716\u9451\u3001\u96F6\u4EF6\u8207\u4EA4\u4ED8\u7D00\u9304\u4FDD\u7559\u3002")}function Ts(i=!0){$t=null,se("#modal").hidden=!0,se("#modal-content").innerHTML="",Wi(),i&&Ot&&(Ot=!1,Oo("running")),Uf?.focus?.(),Bo()}function fr(i,e="\u822A\u6D77\u624B\u518A"){return`<div class="modal-top"><div><span class="eyebrow">${e}</span><h2 id="modal-title">${i}</h2></div><button class="close" data-close aria-label="\u95DC\u9589">\xD7</button></div>`}function Ln(i){Uf=document.activeElement,$t=i,Wi(),se("#modal").hidden=!1;let e=se("#modal-content");if(i==="map")e.innerHTML=fr("\u4E03\u5CF6\u6D77\u5716","YOUR CHART \xB7 \u5317\u65B9\u5728\u4E0A")+'<div class="map-layout"><div class="map-wrap" id="map-wrap"><svg id="chart" viewBox="-290 -290 580 580" role="img" aria-label="\u4E03\u5CF6\u6D77\u5716\uFF0C\u6A59\u8272\u865B\u7DDA\u70BA\u9078\u5B9A\u822A\u7DDA"><defs><pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M40 0H0V40" fill="none" stroke="#a3c3b7" stroke-width=".6"/></pattern></defs><rect x="-500" y="-500" width="1000" height="1000" fill="url(#grid)"/><g id="map-world"></g></svg><div class="map-actions"><button data-zoom="1.2" aria-label="\u653E\u5927\u6D77\u5716">\uFF0B</button><button data-zoom="0.8" aria-label="\u7E2E\u5C0F\u6D77\u5716">\u2212</button><button id="map-reset">\u5FA9\u4F4D</button></div></div><div class="map-copy"><span class="eyebrow">\u822A\u524D\u8B80\u6D77</span><h3>\u9806\u6D41\uFF0C\u4E5F\u8981\u770B\u6F6E\u3002</h3><p id="map-forecast"></p><label class="field">\u672C\u8D9F\u822A\u7DDA<select id="route-choice"><option value="0">\u5B89\u5168\u5916\u6D77\u8DEF</option><option value="1">\u6F6E\u7A97\u6377\u5F91</option></select></label><p id="route-description"></p><div id="map-branch-options"></div><div id="map-mission"></div><ul><li>\u25B3 \u4F60\u7684\u8239\uFF0C\u671D\u5C16\u7AEF\u524D\u9032</li><li>\u25CB \u6E2F\u53E3\u5916\u5074\u53EF\u9760\u6CCA</li><li>\u25B0 \u7901\u77F3\uFF1A\u6F32\u6F6E\u53EF\u8D8A\u3001\u9000\u6F6E\u7E5E\u884C</li><li>\u219D \u6D77\u6D41\uFF1A\u7BAD\u982D\u70BA\u6D41\u5411</li><li>\u25CE \u65CB\u6D41\uFF1A\u53EF\u7531\u5916\u5074\u7E5E\u958B</li><li>\u25C7 \u6DFA\u6C34\u6F5B\u9EDE\uFF1A\u9760\u5CB8\u5F8C\u4E0B\u6F5B</li><li>\u25CF \u89C0\u6E2C\u6D6E\u6A19\uFF1A\u53EF\u7565\u904E\uFF1B\u53D6\u6A23\u4F54\u8CA8\u8259\uFF0C\u8FD4\u6E2F +3 \u5370\u8A18</li></ul><p class="note">\u958B\u555F\u6D77\u5716\u6642\u66AB\u505C\u6F6E\u6C50\u8207\u6C27\u6C23\u3002\u53EF\u55AE\u6307\u62D6\u66F3\u3001\u96D9\u6307\u7E2E\u653E\uFF0C\u6216\u4F7F\u7528 \uFF0B\uFF0F\u2212\u3002</p></div></div>',se("#route-choice").value=Oh,se("#route-choice").onchange=t=>{Oh=+t.target.value,zh()},Q_(),zh();else if(i==="journal")e.innerHTML=fr("\u628A\u767C\u73FE\u756B\u9032\u6D77\u5716\u3002","FIELD JOURNAL")+`<p>\u5DF2\u767B\u9304 ${F.discoveries.length}/${pn.length} \xB7 \u71C8\u5854\u96F6\u4EF6 ${F.parts.length}/3 \xB7 \u59D4\u8A17 ${F.completed.length}/${It.length}\u3002${F.storyComplete?"\u71C8\u5854\u5DF2\u9EDE\u4EAE\uFF1B\u81EA\u7531\u822A\u7A0B\u958B\u653E\u3002":"\u628A\u4E09\u500B\u6DFA\u6C34\u9EDE\u7684\u96F6\u4EF6\u5E36\u5F80\u5317\u65B9\u71C8\u5854\uFF0C\u518D\u56DE\u6BCD\u6E2F\u3002"}</p><div class="journal-grid">${pn.map(t=>`<article class="journal-entry ${F.discoveries.includes(t.id)?"":"locked"}"><span class="eyebrow">${rn(t.kind)} \xB7 ${rn(mr(t.islandId)?.name)}</span><h3>${F.discoveries.includes(t.id)?rn(t.name):"\u5C1A\u672A\u8A18\u9304"}</h3><p>${F.discoveries.includes(t.id)?rn(t.description):"\u5728\u5C0D\u61C9\u5CF6\u5DBC\u8ABF\u67E5\u6216\u5B8C\u6210\u6DFA\u6C34\u63A2\u7D22\u3002"}</p></article>`).join("")}</div><div class="rule"></div><h3>\u81EA\u5DF1\u7684\u822A\u7A0B\u7D00\u9304</h3><p>${Ff()}</p><button id="export-journal">\u532F\u51FA\u822A\u6D77\u8A8C JSON</button>`,se("#export-journal").onclick=()=>j_("tidebound-journal.json",{buildId:Nh,state:JSON.parse(oc(F)),savedLocally:!0});else if(i==="help")e.innerHTML=fr("\u7B2C\u4E00\u6B21\u51FA\u6D77\u3002","HOW TO SAIL")+'<p>\u5148\u9078\u4E00\u4EFD\u59D4\u8A17\u8207\u5E06\u88DD\uFF0C\u5347\u5E06\u51FA\u6E2F\u3002\u6CBF\u6D77\u5716\u5230\u9054\u76EE\u6A19\u5CF6\u5916\u7684\u78BC\u982D\uFF0C\u6536\u5E06\u6E1B\u901F\uFF0C\u6309 E \u9760\u5CB8\u8207\u8ABF\u67E5\u3002\u5728\u540C\u4E00\u8D9F\u822A\u7A0B\u5B8C\u6210\u6E05\u55AE\u7684\u6BCF\u9805\u8ABF\u67E5\uFF0C\u518D\u56DE\u6BCD\u6E2F\u4EA4\u4ED8\uFF1B\u4E2D\u9014\u8FD4\u6BCD\u6E2F\u6703\u7D50\u675F\u672C\u8D9F\uFF0C\u4E0B\u8D9F\u9700\u91CD\u65B0\u8ABF\u67E5\uFF0C\u6C38\u4E45\u5716\u9451\u8207\u96F6\u4EF6\u4ECD\u4FDD\u7559\u3002\u7B2C\u4E00\u4EFD\u8981\u6BD4\u8F03\u73CA\u745A\u7063\u3001\u9752\u6839\u5CF6\u3001\u7409\u7483\u7901\u8207\u767D\u7FBD\u5CF6\uFF0C\u5169\u6B21\u6DFA\u6F5B\u540C\u6642\u53D6\u5F97\u71C8\u5854\u96F6\u4EF6\u3002</p><p>\u6D77\u4E0A\u91D1\u8272\u6D6E\u6A19\u662F\u53EF\u9078\u89C0\u6E2C\u3002\u53D6\u6A23\u9700\u8DDD\u96E2 9 \u516C\u5C3A\u5167\u3001\u901F\u5EA6\u4E0D\u8D85\u904E 1.4 m/s\uFF0C\u4F54 1 \u683C\u666E\u901A\u8CA8\u8259\uFF0C\u56DE\u6E2F\u53EF\u63DB 3 \u5370\u8A18\uFF1B\u4E5F\u53EF\u7E7C\u7E8C\u76F4\u822A\u6311\u6230\u6700\u5FEB\u7D00\u9304\u3002\u6D6E\u6A19\u4E0D\u6703\u649E\u50B7\u8239\u3002</p><table class="controls-table"><tr><td>A / D\u3001\u2190 / \u2192</td><td>\u8F49\u8235\uFF0C\u8239\u9996\u6C7A\u5B9A\u524D\u9032\u65B9\u5411</td></tr><tr><td>W / S\u3001\u2191 / \u2193</td><td>\u589E\u52A0 / \u6E1B\u5C11\u5E06\u529B\uFF1B\u4E0D\u662F\u524D\u9032 / \u5F8C\u9000</td></tr><tr><td>Space</td><td>\u5FEB\u901F\u6536\u5E06\uFF0C\u964D\u4F4E\u6163\u6027</td></tr><tr><td>E</td><td>\u9760\u5CB8 / \u8ABF\u67E5 / \u6F5B\u6C34\u53D6\u5F97\u7269\u4EF6</td></tr><tr><td>M / C / Esc</td><td>\u6D77\u5716 / \u93E1\u982D / \u66AB\u505C</td></tr><tr><td>\u6F5B\u6C34 WASD</td><td>\u5728\u6DFA\u6C34\u5340\u79FB\u52D5\uFF1B\u9760\u8FD1\u767C\u5149\u76EE\u6A19\u6309 E\uFF0C\u6D6E\u51FA\u9375\u96A8\u6642\u8FD4\u8239</td></tr></table><p>\u89F8\u63A7\u4F7F\u7528\u5DE6\u5074\u8F49\u8235\u9375\u53CA\u53F3\u5074\u5E06\u529B\u4E09\u6A94\uFF1B\u6F5B\u6C34\u6703\u589E\u52A0\u4E0A\u4E0B\u9375\u3002\u62D6\u66F3\u6D77\u9762\u53F3\u534A\u90E8\u6216\u6ED1\u9F20\u53F3\u9375\u62D6\u66F3\u53EF\u7E5E\u8239\u770B\u666F\u3002</p><p>\u25B0 \u9000\u6F6E\u9732\u7901\uFF0C\u9806\u6D41\u52A0\u901F\uFF0C\u25CE \u65CB\u6D41\u6709\u9031\u671F\u3002\u6E2F\u53E3\u300C\u7B49\u4E0B\u4E00\u6F6E\u300D\u53EF\u76F4\u63A5\u63A8\u9032\u6642\u9593\u3002\u6240\u6709\u5371\u96AA\u90FD\u6709\u5916\u6D77\u5B89\u5168\u8DEF\u3002\u8239\u9AD4\u4F4E\u65BC 25% \u6642\u8ACB\u8FD4\u6700\u8FD1\u6E2F\uFF1B\u8239\u6C89\u6216\u6C27\u6C23\u8017\u76E1\u6703\u6551\u63F4\uFF0C\u666E\u901A\u8CA8\u7269\u6E1B\u534A\uFF0C\u4E3B\u7DDA\u96F6\u4EF6\u8207\u5716\u9451\u4FDD\u7559\u3002</p><p>\u96E2\u7DDA\u4E0D\u6263\u8CC7\u6E90\u3002\u9760\u6E2F\u3001\u4EA4\u4ED8\u8207\u767C\u73FE\u5F8C\u4FDD\u5B58\uFF1B\u4E2D\u9014\u91CD\u8F09\u56DE\u6700\u8FD1\u5B89\u5168\u6E2F\uFF0C\u666E\u901A\u8CA8\u7269\u6E1B\u534A\u3002\u57FA\u790E\u4FEE\u5FA9\u514D\u8CBB\u3002</p><button class="primary" data-close>\u660E\u767D\u4E86\uFF0C\u53BB\u770B\u6D77</button>';else if(i==="restart")e.innerHTML=fr("\u7D50\u675F\u9019\u8D9F\u822A\u7A0B\uFF1F","RETURN TO HARBOR")+'<p>\u8FD4\u56DE\u6BCD\u6E2F\u4E26\u514D\u8CBB\u4FEE\u8239\u3002\u672A\u4EA4\u4ED8\u666E\u901A\u8CA8\u7269\u6E1B\u534A\uFF0C\u4E3B\u7DDA\u96F6\u4EF6\u3001\u5716\u9451\u548C\u5B8C\u6210\u7D00\u9304\u4FDD\u7559\u3002</p><div class="actions"><button data-close>\u7E7C\u7E8C\u822A\u884C</button><button id="confirm-restart" class="primary">\u78BA\u8A8D\u8FD4\u6E2F</button></div>',se("#confirm-restart").onclick=Nf;else if(i==="reset")e.innerHTML=fr("\u6E05\u9664\u6574\u672C\u822A\u6D77\u8A8C\uFF1F","ERASE LOCAL PROGRESS")+'<p>\u6B64\u64CD\u4F5C\u6703\u6E05\u9664\u672C\u6A5F\u7684\u96F6\u4EF6\u3001\u5716\u9451\u3001\u59D4\u8A17\u8207\u6700\u4F73\u7D00\u9304\u3002\u53EF\u5148\u5F9E\u822A\u6D77\u8A8C\u532F\u51FA\u5099\u4EFD\u3002</p><div class="actions"><button data-close>\u4FDD\u7559\u9032\u5EA6</button><button id="confirm-reset">\u6E05\u9664\u4E26\u91CD\u65B0\u958B\u59CB</button></div>',se("#confirm-reset").onclick=()=>{F=Sr(1),ii(),Ts(),As(),ni("\u5DF2\u5EFA\u7ACB\u5168\u65B0\u822A\u6D77\u8A8C\u3002")};else{e.innerHTML=fr(Ot?"\u628A\u6642\u9593\u7559\u7D66\u6D77\u3002":"\u8072\u97F3\u8207\u756B\u9762","PAUSED \xB7 \u5DF2\u66AB\u505C")+`<p>\u6F6E\u6C50\u3001\u8239\u9AD4\u8207\u6C27\u6C23\u5747\u5DF2\u505C\u6B62\u3002\u95DC\u9589\u6B64\u8996\u7A97\u5373\u53EF\u7E7C\u7E8C\u3002</p><div class="settings-grid"><label>\u97F3\u6A02 <input id="music" type="range" min="0" max="1" step="0.05" value="${Rt.music}"></label><label>\u97F3\u6548 <input id="sfx" type="range" min="0" max="1" step="0.05" value="${Rt.sfx}"></label><label><input id="reduced" type="checkbox" ${Rt.reducedMotion?"checked":""}> \u6E1B\u5C11\u6D6A\u9AD8\u8207\u93E1\u982D\u52D5\u614B</label><label>\u756B\u8CEA <select id="quality"><option value="high">\u6A19\u6E96 \xB7 \u9670\u5F71</option><option value="low">\u7BC0\u80FD \xB7 \u4F4E DPR</option></select></label></div><div class="actions"><button class="primary" data-close>\u7E7C\u7E8C</button><button id="show-help">\u64CD\u4F5C\u8AAA\u660E</button><button id="restart-button">\u91CD\u65B0\u6E96\u5099\u51FA\u6D77</button></div><div class="rule"></div><p class="note">${Nh} \xB7 \u4FDD\u5B58 schema 1 \xB7 \u9032\u5EA6\u53EA\u5B58\u6B64\u700F\u89BD\u5668\uFF0C\u7121\u96F2\u7AEF\u540C\u6B65\u3002</p><button id="reset-button">\u6E05\u9664\u672C\u6A5F\u9032\u5EA6\u2026</button>`,se("#quality").value=Rt.quality;for(let t of["music","sfx"])se("#"+t).oninput=n=>{Rt[t]=+n.target.value,Do()};se("#reduced").onchange=t=>{Rt.reducedMotion=t.target.checked,Do()},se("#quality").onchange=t=>{Rt.quality=t.target.value,Do()},se("#show-help").onclick=()=>Ln("help"),se("#restart-button").onclick=()=>Ln("restart"),se("#reset-button").onclick=()=>Ln("reset")}e.querySelectorAll("[data-close]").forEach(t=>t.onclick=()=>Ts()),e.querySelector("button")?.focus(),Bo()}function Ff(){let i=F.records||{},e=F.contractId,t=i.byContract?.[e],n=It.find(r=>r.id===e)?.name||"\u672C\u59D4\u8A17",s=Number.isFinite(t?.bestTime)?`${Math.floor(Math.round(t.bestTime)/60)} \u5206 ${Math.round(t.bestTime)%60} \u79D2`:"\u5C1A\u7121";return`${n}\uFF1A\u5B8C\u6574\u822A\u7A0B\u6700\u4F73 ${s} \xB7 \u6700\u5C11\u640D\u50B7 ${Number.isFinite(t?.bestDamage)?Math.round(t.bestDamage)+"%":"\u5C1A\u7121"}\u3002\u50C5\u6BD4\u8F03\u672C\u59D4\u8A17\u5B8C\u6210\u4E14\u7121\u6551\u63F4\u7684\u822A\u7A0B\uFF1B\u4E0D\u540C\u5E06\u88DD\u53EF\u6311\u6230\u3002\u6B77\u4F86\u8FD4\u822A ${i.voyages||0} \u6B21 \xB7 \u6551\u63F4 ${i.rescues||0} \u6B21\u3002\u822A\u6D77\u5370\u8A18 ${F.credits||0} \u679A\uFF08\u50C5\u4F9B\u6536\u85CF\uFF0C\u5E06\u88DD\u8207\u4FEE\u5FA9\u514D\u8CBB\uFF09\u3002`}function j_(i,e){let t=URL.createObjectURL(new Blob([JSON.stringify(e,null,2)],{type:"application/json"})),n=document.createElement("a");n.href=t,n.download=i,n.click(),setTimeout(()=>URL.revokeObjectURL(t),1e3)}var Ft={x:-290,z:-290,size:580};function Q_(){Ft={x:-290,z:-290,size:580};let i=se("#chart"),e=se("#map-wrap"),t=new Map,n=0,s=r=>{let o=Ft.size;Ft.size=Math.max(180,Math.min(800,o/r)),Ft.x+=(o-Ft.size)/2,Ft.z+=(o-Ft.size)/2,i.setAttribute("viewBox",`${Ft.x} ${Ft.z} ${Ft.size} ${Ft.size}`)};e.onpointerdown=r=>{r.target.closest("button")||(t.set(r.pointerId,{x:r.clientX,y:r.clientY}),e.setPointerCapture(r.pointerId))},e.onpointermove=r=>{let o=t.get(r.pointerId);if(!o)return;let a=r.clientX-o.x,l=r.clientY-o.y;if(t.set(r.pointerId,{x:r.clientX,y:r.clientY}),t.size===1){let c=Ft.size/e.clientWidth;Ft.x-=a*c,Ft.z-=l*c,i.setAttribute("viewBox",`${Ft.x} ${Ft.z} ${Ft.size} ${Ft.size}`)}else{let[c,h]=[...t.values()],u=Math.hypot(c.x-h.x,c.y-h.y);n&&s(u/n),n=u}},e.onpointerup=e.onpointercancel=r=>{t.delete(r.pointerId),n=0},e.querySelectorAll("[data-zoom]").forEach(r=>r.onclick=()=>s(+r.dataset.zoom)),se("#map-reset").onclick=()=>{Ft={x:-290,z:-290,size:580},s(1)}}function zh(){if($t!=="map")return;let i=["harbor","result"].includes(F.mode),e=It.find(a=>a.id===(i?Vi:F.contractId)),t=e?.routes?.[Oh],n=an(F.time),s="";for(let a of Zi)s+=`<ellipse cx="${a.x}" cy="${a.z}" rx="${a.radius||a.r||15}" ry="${a.radius||a.r||15}" fill="#e6c997" opacity=".6"/><text x="${a.x-5}" y="${a.z+4}" style="font-size:14px">\u25B0</text>`;for(let a of Ji)s+=`<text x="${a.x-6}" y="${a.z+5}" style="font-size:20px">\u25CE</text>`;for(let a of br){let l=Ti(a.x,a.z,F.time,i?Xl:F.seed),c=Math.atan2(l.z,l.x)*180/Math.PI;s+=`<text x="0" y="5" text-anchor="middle" transform="translate(${a.x},${a.z}) rotate(${c})" style="font-size:19px">${l.strength>.02?"\u219D":"\xB7"}</text>`}if(t?.waypoints&&(s+=`<polyline class="route" points="${t.waypoints.map(a=>`${a.x},${a.z}`).join(" ")}"/>`),!i&&t?.legs){let a=ji(F).nextObjective,l=t.legs.find(c=>c.toIslandId===(a?.islandId||"harbor"));l&&(s+=`<polyline class="active-leg" points="${l.waypoints.map(c=>`${c.x},${c.z}`).join(" ")}"/>`)}for(let a of Gt)s+=`<circle cx="${a.x}" cy="${a.z}" r="${a.radius}" fill="${typeof a.color=="string"?a.color:"#8cae88"}" stroke="#ede4bc" stroke-width="6"/><circle cx="${a.dock.x}" cy="${a.dock.z}" r="4" fill="#fff9dc" stroke="#285d60"/><text x="${a.x}" y="${a.z-a.radius-9}" text-anchor="middle">${rn(a.name)}</text>`;for(let a of mn)s+=`<g class="map-survey" data-observation="${a.id}"><title>${rn(a.name)}</title><circle cx="${a.x}" cy="${a.z}" r="3" fill="#b58030"/></g>`;for(let a of Yn){let l=a.target||mr(a.islandId).dock;s+=`<text x="${l.x}" y="${l.z+4}" style="font-size:14px">\u25C7</text>`}s+=`<path id="map-boat" d="M0 -9L6 7L0 4L-6 7Z" transform="translate(${F.boat.x} ${F.boat.z}) rotate(${F.boat.heading*180/Math.PI})"/>`;let r=F.mode==="sailing"?Vo(F):null,o=si(F);if(r)for(let a of r.options)s+=`<polyline class="branch-${a.kind}" points="${[F.boat,...a.waypoints].map(l=>`${l.x},${l.z}`).join(" ")}"/>`;o&&(s+=`<polyline class="branch-selected" points="${[F.boat,...o.waypoints.slice(o.index)].map(a=>`${a.x},${a.z}`).join(" ")}"/>`),Hh(se("#map-branch-options"),r,!0),se("#map-world").innerHTML=s,se("#map-forecast").textContent=`\u73FE\u5728 ${n.label} \xB7 ${Math.ceil(n.secondsToChange)} \u79D2\u5F8C ${n.nextLabel}\u3002\u63A5\u8457 ${(n.forecast||[]).map(a=>`${a.label}\uFF08${Math.ceil(a.startsIn??a.secondsUntil)}\u79D2\u5F8C\uFF09`).join(" \u2192 ")}`,se("#route-description").textContent=t?.description||"\u9078\u64C7\u59D4\u8A17\u5F8C\u986F\u793A\u822A\u7DDA\u3002\u5B89\u5168\u8DEF\u6C38\u9060\u958B\u653E\u3002",se("#map-mission").innerHTML=kh(e?.id,i)}function ev(){let i=`${F.mode}|${Qt}|${F.currentIsland}|${F.discoveries.length}|${F.parts.length}|${F.completed.length}|${F.voyage.observed?.join(",")}|${F.lighthouseFixed}|${F.storyComplete}|${Ot}`;if(Fh===i)return;Fh=i;let e=se("#panel"),t=["harbor","island","result"].includes(F.mode)||Qt==="ready";if(e.hidden=!t,document.body.classList.toggle("in-menu",t),!t)return;if(F.mode==="result"&&Qt!=="ready"){e.innerHTML=`<span class="eyebrow">VOYAGE COMPLETE</span><h2>${rn(F.result?.title||"\u53C8\u4E00\u6BB5\u822A\u7A0B\uFF0C\u5BEB\u9032\u6D77\u5716\u3002")}</h2><p>${rn(F.result?.text||"\u5DF2\u5B89\u5168\u8FD4\u822A\uFF0C\u9032\u5EA6\u8207\u6700\u4F73\u7D00\u9304\u4FDD\u5B58\u5728\u6B64\u88DD\u7F6E\u3002")}</p><div class="progress-line"><span>\u5716\u9451 ${F.discoveries.length}/${pn.length}</span><span>\u96F6\u4EF6 ${F.parts.length}/3</span><span>\u59D4\u8A17 ${F.completed.length}/${It.length}</span></div><p class="note">${Ff()}</p><button class="primary" id="next-voyage">${F.storyComplete?"\u5C55\u958B\u81EA\u7531\u822A\u7A0B":"\u6E96\u5099\u4E0B\u4E00\u8D9F\u822A\u7A0B"} \u2197</button><button class="secondary" id="result-journal">\u7FFB\u95B1\u822A\u6D77\u8A8C</button>`,se("#next-voyage").onclick=()=>{F.mode="harbor",F.result=null,As()},se("#result-journal").onclick=()=>Ln("journal");return}if(F.mode==="island"){let s=mr(F.currentIsland),r=Yn.find(o=>o.islandId===s.id);e.innerHTML=`<span class="eyebrow">ASHORE \xB7 \u5DF2\u5B89\u5168\u9760\u6CCA</span><h2>${rn(s.name)}</h2><p>${s.id==="lighthouse"?"\u4E09\u4EFD\u6DF1\u6D77\u8A18\u61B6\uFF0C\u80FD\u8B93\u9019\u5EA7\u71C8\u5854\u518D\u6B21\u767C\u5149\u3002\u4FEE\u5FA9\u5F8C\u8FD4\u56DE\u6BCD\u6E2F\uFF0C\u5B8C\u6210\u6545\u4E8B\u3002":"\u6536\u8D77\u5E06\uFF0C\u807D\u4E00\u807D\u5CF6\u7684\u8072\u97F3\u3002\u8ABF\u67E5\u5CB8\u908A\u7684\u7269\u7A2E\u8207\u907A\u8DE1\uFF0C\u628A\u767C\u73FE\u5BEB\u5165\u822A\u6D77\u8A8C\u3002"}</p>${kh()}<div class="progress-line"><span>\u8239\u9AD4 ${Math.round(F.boat.hull)}%</span><span>\u96F6\u4EF6 ${F.parts.length}/3</span></div><button class="primary" id="investigate">${s.id==="lighthouse"?"\u8ABF\u67E5 / \u4FEE\u5FA9\u71C8\u5854":"\u8ABF\u67E5\u6B64\u5CF6"} <kbd>E</kbd></button>${r?`<button class="primary" id="dive">\u6DFA\u6C34\u63A2\u7D22 \xB7 ${rn(r.name)}</button><p class="note">55 \u79D2\u6C27\u6C23\u3002\u627E\u767C\u5149\u76EE\u6A19\uFF0C\u9760\u8FD1\u5F8C\u6309 E\uFF1B\u6C23\u6CE1\u53EF\u88DC\u6C23\uFF0C\u96A8\u6642\u53EF\u6D6E\u51FA\u8FD4\u8239\u3002</p>`:""}<div class="actions"><button id="leave-island">\u56DE\u8239\uFF0C\u7E7C\u7E8C\u822A\u884C \u2197</button><button id="island-map">\u67E5\u770B\u6D77\u5716</button></div><p class="note">\u5DF2\u5728\u6B64\u5B89\u5168\u6E2F\u4FDD\u5B58\uFF1B\u91CD\u8F09\u56DE\u5230\u9019\u88E1\u3002</p>`,se("#investigate").onclick=()=>Xn(()=>rc(F)),se("#dive")?.addEventListener("click",()=>{Si(),Xn(()=>iu(F,r.id))}),se("#leave-island").onclick=()=>{Si(),Xn(()=>ic(F,F.contractId||Vi,F.rigId||Wl))},se("#island-map").onclick=()=>Ln("map");return}e.innerHTML=`<span class="eyebrow">CHAPTER 01 \xB7 THE LIGHT WE BRING HOME</span><h2>${F.storyComplete?"\u6D77\uFF0C\u4ECD\u6709\u65B0\u6545\u4E8B\u3002":"\u7D66\u6D77\u4E00\u76DE\u71C8\u3002"}</h2><p>${Qt==="ready"?"\u4F60\u662F\u4E03\u5CF6\u7684\u65B0\u4EFB\u822A\u6D77\u54E1\u3002\u9078\u4E00\u4EFD\u59D4\u8A17\uFF0C\u6CBF\u6D77\u6D41\u5C0B\u627E\u5CF6\u5DBC\uFF0C\u8B93\u5317\u65B9\u71C8\u5854\u91CD\u65B0\u767C\u5149\u3002":"\u6BCD\u6E2F\u70BA\u4F60\u514D\u8CBB\u4FEE\u8239\u3002\u9078\u64C7\u76EE\u7684\u5730\u3001\u5E06\u88DD\u8207\u822A\u7DDA\uFF0C\u518D\u628A\u4E0B\u4E00\u500B\u767C\u73FE\u5E36\u56DE\u4F86\u3002"}</p><label class="field">01 / \u9019\u8D9F\u60F3\u5E36\u56DE\u4EC0\u9EBC<select id="contract">${It.map((s,r)=>`<option value="${s.id}">${F.completed.includes(s.id)?"\u2713 ":""}${String(r+1).padStart(2,"0")} ${rn(s.name)}</option>`).join("")}</select></label><p class="note" id="contract-note"></p><div id="contract-objectives"></div><label class="field">02 / \u9078\u4E00\u5F35\u5E06<select id="rig">${qn.map(s=>`<option value="${s.id}">${rn(s.name)} \xB7 ${rn(s.description)}</option>`).join("")}</select></label><label class="field">03 / \u6D77\u6D41\u5716\u8B5C<select id="seed"><option value="1">01 \xB7 \u4FE1\u98A8\u6668\u822A</option><option value="2">02 \xB7 \u5CF6\u9593\u5B63\u6D41</option><option value="3">03 \xB7 \u56DE\u8072\u822A\u7DDA</option></select></label><button class="primary" id="depart">\u5347\u5E06\u51FA\u6E2F \u2197</button><div class="actions"><button id="wait-tide">\u7B49\u4E0B\u4E00\u6F6E</button><button id="plan-route">\u898F\u5283\u822A\u7DDA</button><button id="help">\u64CD\u4F5C\u8AAA\u660E</button></div><div class="rule"></div><div class="progress-line"><span>\u5716\u9451 ${F.discoveries.length}/${pn.length}</span><span>\u96F6\u4EF6 ${F.parts.length}/3</span><span>\u59D4\u8A17 ${F.completed.length}/${It.length}</span></div><p class="note">7 \u5CF6\u624B\u5DE5\u6D77\u57DF \xB7 \u55AE\u4EBA\u672C\u6A5F\u4FDD\u5B58<br>${rn(pr||"\u78B0\u7901\u53EF\u4FEE\u5FA9\uFF0C\u5931\u6557\u53EF\u6551\u63F4\u3002\u653E\u5FC3\u51FA\u767C\u3002")}</p>`,se("#contract").value=Vi,se("#rig").value=Wl,se("#seed").value=Xl;let n=()=>{se("#contract-note").textContent=It.find(s=>s.id===Vi)?.description||"",se("#contract-objectives").innerHTML=kh(Vi,!0)};n(),se("#contract").onchange=s=>{Vi=s.target.value,n()},se("#rig").onchange=s=>Wl=s.target.value,se("#seed").onchange=s=>Xl=+s.target.value,se("#depart").onclick=()=>{Si(),Wh(),F.seed=Xl,Un=null,Xn(()=>ic(F,Vi,Wl)),ni("\u5148\u6309 W \u5347\u5E06\uFF0CA / D \u8F49\u8235\u3002\u6309 M \u770B\u6D77\u5716\uFF1B\u5230\u5CF6\u5916\u91D1\u8272\u6CCA\u4F4D\u6536\u5E06\u6309 E\u3002",6500)},se("#wait-tide").onclick=()=>{Xn(()=>ru(F)),ii()},se("#plan-route").onclick=()=>Ln("map"),se("#help").onclick=()=>Ln("help")}function kh(i=F.contractId,e=!1){let t=ji(F,i);return t?.objectives?`<ol class="contract-checklist" aria-label="${e?"\u59D4\u8A17\u8981\u6C42":"\u672C\u8D9F\u8ABF\u67E5\u9032\u5EA6"}">${t.objectives.map(n=>`<li class="${!e&&n.done?"done":""}">${!e&&n.done?"\u2713 ":""}${rn(n.name)}${n.kind==="dive"?" \xB7 \u6DFA\u6F5B":""}</li>`).join("")}</ol>${!e&&t.readyToDeliver?'<p class="note">\u672C\u8D9F\u8ABF\u67E5\u9F4A\u5099\uFF0C\u8FD4\u56DE\u6F6E\u97F3\u6E2F\u4EA4\u4ED8\u3002</p>':""}`:""}function tv(i){let e=Ti(i.x,i.z,F.time,F.seed);if(e.strength>.12){let n=e.z<0?"\u5317":"\u5357",s=e.x<0?"\u897F":"\u6771";return`\u6B64\u8655\u6B63\u5411${Math.abs(e.z)>Math.abs(e.x)*2?n:Math.abs(e.x)>Math.abs(e.z)*2?s:n+s}\u6D41 ${e.strength.toFixed(1)} m/s\uFF1B\u9760\u8FD1\u6642\u6536\u5E06\u4ECD\u6703\u6F02\u79FB\u3002\u53EF\u7559\u5728\u6D41\u9053\u501F\u529B\uFF0C\u6216\u5411\u5916\u7DE3\u8D70\u7A69\u5B9A\u6C34\u8DEF\u3002`}let t=Zi.find(n=>Math.hypot(n.x-i.x,n.z-i.z)<65);return t?`${t.name}${an(F.time).height>t.safeHeight?"\u76EE\u524D\u6C34\u4F4D\u53EF\u901A\u884C\uFF1B\u4ECD\u8981\u770B\u4E0B\u4E00\u6F6E\u9810\u5831":"\u76EE\u524D\u9732\u7901\uFF1B\u6CBF\u6D77\u5716\u5916\u5074\u6DF1\u6C34\u8DEF\u7E5E\u884C"}\u3002`:i.note}function nv(i,e){Un=null,Xn(()=>Qh(F,i.id,e)),ii()}function Hh(i,e,t=!1){let n=e?`${e.id}:${e.direction}:${e.entryIndex??0}:${e.options.map(s=>`${s.id}:${s.available}`).join(",")}`:"";if(i.dataset.choice!==n){i.dataset.choice=n,i.replaceChildren();for(let s of e?.options||[]){let r=document.createElement("button");r.type="button",r.disabled=s.available===!1;let o=document.createElement("span");o.textContent=s.label;let a=document.createElement("em"),l=document.createElement("small");r.append(o,a,l),r.dataset.option=s.id,r.onclick=()=>{t&&Ts(),nv(e,s.id),r.blur()},i.append(r)}}for(let s of e?.options||[]){let r=i.querySelector(`[data-option="${s.id}"]`);r&&(r.querySelector("small").textContent=`${s.reason} ${s.condition||""}`,r.querySelector("em").textContent=`\u8DEF\u9EDE ${s.distanceMetres} m \xB7 \u7D04 ${s.estimatedSeconds} s`)}if(t&&e&&!i.querySelector(".route-estimate-note")){let s=document.createElement("p");s.className="route-estimate-note note",s.textContent="\u79D2\u6578\u6309\u6EFF\u5E06\u8207\u76EE\u524D\u6D41\u6CC1\u4F30\u7B97\u5230\u5404\u81EA\u8DEF\u9EDE\uFF0C\u4E0D\u542B\u8F49\u8235\u3001\u505C\u8239\u8207\u5F8C\u7E8C\u822A\u7A0B\u3002",i.append(s)}}function iv(){let i=se("#route-choice-card");if(Bh=null,F.mode!=="sailing"||Qt!=="running"||Ot||$t){i.hidden=!0;return}if(F.cargo.length<qn.find(s=>s.id===F.rigId).capacity&&mn.some(s=>Math.hypot(s.x-F.boat.x,s.z-F.boat.z)<=20&&(s.id===Un||F.boat.speed<=1.4)&&!F.voyage.harvested.includes(`observation:${s.id}`)&&!F.voyage.skippedObservations?.includes(s.id))&&!si(F)){i.hidden=!0;return}let t=si(F),n=Vo(F);if(i.hidden=!n&&!t,se("#route-cancel").hidden=!t,t&&!n){se("#route-choice-title").textContent=t.label,se("#route-choice-context").textContent="\u4F9D\u85CD\u8272\u8DEF\u9EDE\u624B\u52D5\u638C\u8235\uFF1B\u53D6\u6D88\u5F15\u5C0E\u53EF\u6062\u5FA9\u539F\u672C\u4EFB\u52D9\u76EE\u6A19\u3002",Hh(se("#route-options"),null);return}n&&(Bh=n,se("#route-choice-title").textContent=n.name,se("#route-choice-context").textContent=t?`\u76EE\u524D\u6CBF\u300C${t.label}\u300D\u3002\u53EF\u6BD4\u8F03\u524D\u65B9\u6D77\u6CC1\u8207\u9032\u6E2F\u89D2\u5EA6\uFF0C\u6539\u9078\u4E0B\u4E00\u6BB5\u85CD\u8272\u5F15\u5C0E\uFF1B\u4ECD\u9700\u624B\u52D5\u638C\u8235\u3002`:"\u9078\u64C7\u5F8C\u4F9D\u5DE6\u4E0A\u65B9\u4F4D\u624B\u52D5\u638C\u8235\uFF1B\u85CD\u8272\u8DEF\u9EDE\u53EA\u63D0\u4F9B\u5F15\u5C0E\uFF0C\u4E0D\u6703\u81EA\u52D5\u64CD\u8239\u3002",Hh(se("#route-options"),n))}se("#route-branch-map").onclick=()=>Ln("map");se("#route-cancel").onclick=()=>{Xn(()=>eu(F)),ii()};function sv(){let i=se("#survey-choice");if(Fo=null,F.mode!=="sailing"||Qt!=="running"||Ot||$t||Bh||si(F)){i.hidden=!0;return}let t=mn.filter(o=>!F.voyage.harvested.includes(`observation:${o.id}`)&&!F.voyage.skippedObservations?.includes(o.id)).map(o=>({...o,distance:Math.hypot(o.x-F.boat.x,o.z-F.boat.z)})).filter(o=>o.distance<=45).sort((o,a)=>o.id===Un?-1:a.id===Un?1:o.distance-a.distance)[0];if(i.hidden=!t,!t)return;Fo=t;let n=qn.find(o=>o.id===F.rigId).capacity,s=F.cargo.length>=n;se("#survey-title").textContent=`${t.name} \xB7 ${Math.round(t.distance)} m`,se("#survey-detail").textContent=tv(t),se("#survey-tradeoff").textContent=`\u53D6\u6A23\u4F54 1 \u683C\u8CA8\u8259\uFF0C\u8FD4\u6E2F +3 \u5370\u8A18\uFF1B\u76F4\u822A\u53EF\u7701\u505C\u8239\u6642\u9593\u3002\u8CA8\u8259 ${F.cargo.length}/${n}\u3002`;let r=se("#survey-sample");r.disabled=s,r.textContent=s?"\u8CA8\u8259\u5DF2\u6EFF":t.distance>9?Un===t.id?"\u5DF2\u6A19\u8A18 \xB7 \u4F9D\u65B9\u4F4D\u524D\u9032":"\u6A19\u8A18\u53D6\u6A23\u9EDE":F.boat.speed>1.4?"\u6536\u5E06\u6E1B\u901F":"\u53D6\u5F97\u53D6\u6A23 E"}se("#survey-sample").onclick=()=>{let i=Fo;i&&(Si(),i.distance>9?(Un=i.id,ni("\u53D6\u6A23\u9EDE\u5DF2\u6A19\u8A18\u3002\u4F9D\u5DE6\u4E0A\u65B9\u4F4D\u822A\u884C\uFF0C\u63A5\u8FD1\u6D6E\u6A19\u5F8C\u6536\u5E06\u6E1B\u901F\u3002")):F.boat.speed>1.4?(Wi(),F.boat.sail=0,ni("\u5DF2\u6536\u5E06\u3002\u822A\u901F\u964D\u5230 1.4 m/s \u5F8C\u6309 E \u53D6\u6A23\u3002")):Xn(()=>nc(F,i.id)),se("#survey-sample").blur(),Jl())};se("#survey-pass").onclick=()=>{if(!Fo)return;let i=Fo.id;Un===i&&(Un=null),Xn(()=>nu(F,i)),se("#survey-pass").blur()};function rv(){if(F.mode==="diving")return{title:"\u6D77\u4E0B\uFF0C\u4E5F\u6709\u661F\u5149\u3002",text:`${(Yn.find(n=>n.id===F.activeDive)||Yn.find(n=>n.islandId===F.currentIsland))?.name||"\u6DFA\u6C34\u63A2\u7D22"} \xB7 \u9760\u8FD1\u767C\u5149\u7269\u4EF6\u6309 E\uFF1B\u6C23\u6CE1\u88DC\u6C27\uFF0C\u6D6E\u51FA\u96A8\u6642\u56DE\u8239\u3002`};let i=si(F);if(F.mode==="sailing"&&i){let t=i.target,n=Math.hypot(t.x-F.boat.x,t.z-F.boat.z),s=(Math.atan2(t.x-F.boat.x,-(t.z-F.boat.z))*180/Math.PI+360)%360;return{title:i.label,text:`\u8DEF\u9EDE ${i.index+1}/${i.waypoints.length} \xB7 \u7D04 ${Math.round(n)} \u516C\u5C3A \xB7 \u65B9\u4F4D ${Math.round(s)}\xB0\u3002\u4F9D\u85CD\u8272\u8DEF\u9EDE\u638C\u8235\uFF0C\u5B8C\u6210\u5F8C\u7E7C\u7E8C\u59D4\u8A17\u3002`}}if(F.lighthouseFixed&&!F.storyComplete)return{title:"\u5E36\u8457\u5149\uFF0C\u56DE\u5BB6\u3002",text:"\u71C8\u5854\u5DF2\u4FEE\u5FA9\u3002\u8FD4\u56DE\u5357\u65B9\u6BCD\u6E2F\uFF0C\u5B8C\u6210\u6545\u4E8B\u3002"};if(F.mode==="sailing"&&Un){let t=mn.find(n=>n.id===Un);if(t&&!F.voyage.harvested.includes(`observation:${t.id}`)){let n=Math.hypot(t.x-F.boat.x,t.z-F.boat.z),s=(Math.atan2(t.x-F.boat.x,-(t.z-F.boat.z))*180/Math.PI+360)%360;return{title:`\u53D6\u6A23 \xB7 ${t.name}`,text:`\u7D04 ${Math.round(n)} \u516C\u5C3A \xB7 \u65B9\u4F4D ${Math.round(s)}\xB0\u3002\u91D1\u8272\u6D6E\u6A19 9 \u516C\u5C3A\u5167\u6536\u5E06\uFF0C\u4F4E\u901F\u6309 E\uFF1B\u53EF\u96A8\u6642\u7565\u904E\u3002`}}Un=null}if(F.parts.length===3&&!F.lighthouseFixed)return{title:"\u9EDE\u4EAE\u5317\u65B9\u71C8\u5854\u3002",text:"\u4E09\u500B\u96F6\u4EF6\u5DF2\u9F4A\u5099\u3002\u524D\u5F80\u5317\u65B9\u71C8\u5854\u9760\u6CCA\uFF0C\u8ABF\u67E5\u4FEE\u5FA9\u3002"};if(F.mode==="harbor"){let t=It.find(n=>n.id===Vi);return{title:t?.name||"\u6E96\u5099\u51FA\u6D77\u3002",text:`\u6E96\u5099\u524D\u5F80${mr(t?.islandId)?.name||"\u4E03\u5CF6"}\u3002\u5148\u770B\u822A\u7DDA\u8207\u6F6E\u6C50\uFF0C\u518D\u6309 W \u5347\u5E06\u3002`}}let e=It.find(t=>t.id===F.contractId);if(e&&F.mode==="sailing"){let t=ji(F),n=t.readyToDeliver,s=t.nextObjective,r=mr(n?"harbor":s?.islandId||e.islandId),o=Math.hypot(F.boat.x-r.dock.x,F.boat.z-r.dock.z);return{title:n?"\u628A\u767C\u73FE\u5E36\u56DE\u6BCD\u6E2F\u3002":e.name,text:`${r.name} \xB7 \u7D04 ${Math.round(o)} \u516C\u5C3A \xB7 ${n?"\u9760\u6CCA\u4EA4\u4ED8\u5F8C\u7D50\u7B97":`\u8ABF\u67E5 ${t.completedCount}/${t.total} \xB7 ${s?.kind==="dive"?"\u9760\u5CB8\u5F8C\u4E0B\u6F5B":"\u5230\u91D1\u8272\u6CCA\u4F4D\u6536\u5E06\uFF0C\u6309 E \u9760\u5CB8"}`}`}}return{title:F.storyComplete?"\u4E03\u5CF6\uFF0C\u7E7C\u7E8C\u63A2\u7D22\u3002":"\u7D66\u6D77\u4E00\u76DE\u71C8\u3002",text:F.storyComplete?"\u81EA\u7531\u822A\u7A0B\u5DF2\u958B\u653E\u3002\u88DC\u9F4A\u5716\u9451\uFF0C\u6216\u63DB\u5E06\u88DD\u8207\u822A\u7DDA\u6311\u6230\u7D00\u9304\u3002":"\u5C0B\u627E\u4E09\u500B\u6DFA\u6C34\u96F6\u4EF6\uFF0C\u4FEE\u5FA9\u71C8\u5854\u4E26\u5B89\u5168\u8FD4\u822A\u3002"}}function Jl(){ev(),iv(),sv();let i=an(F.time),e=rv();se("#objective").textContent=e.title,se("#objective-detail").textContent=e.text,se("#hull-label").textContent=`${Math.ceil(F.boat.hull)}%`,se("#hull-meter").value=F.boat.hull;let t=F.mode==="diving";se("#oxygen-row").hidden=!t,se("#oxygen-label").textContent=`${Math.ceil(F.oxygen||0)} \u79D2`,se("#oxygen-meter").max=55,se("#oxygen-meter").value=F.oxygen||0,se("#surface-button").hidden=!t,se("#sail-label").textContent=t?"\u6F5B\u6C34 \xB7 WASD \u65B9\u5411\u79FB\u52D5":`\u5E06\u529B ${Math.round(F.boat.sail*100)}% \xB7 ${Math.abs(F.boat.speed||0).toFixed(1)} m/s`,se("#tide-label").textContent=`${i.label} \xB7 ${Math.ceil(i.secondsToChange)}s`,se("#forecast").textContent=`\u63A5\u8457 ${i.nextLabel} \u2192 ${i.forecast?.[1]?.label||""}`,se("#voyage-time").textContent=`${String(Math.floor((F.elapsed||0)/60)).padStart(2,"0")}:${String(Math.floor((F.elapsed||0)%60)).padStart(2,"0")}`,se("#compass-arrow").style.transform=`rotate(${F.boat.heading*180/Math.PI}deg)`,se("#bearing-label").textContent=`${(Math.round(F.boat.heading*180/Math.PI)%360+360)%360}\xB0`;let n=Ti(F.boat.x,F.boat.z,F.time,F.seed);se("#flow-arrow").style.display="inline-block",se("#flow-arrow").style.transform=`rotate(${Math.atan2(n.z||0,n.x||0)*180/Math.PI}deg)`,se("#safety-warning").textContent=F.boat.hull<25?"\u26A0 \u8239\u9AD4\u4F4E\u65BC 25%\uFF0C\u8ACB\u9760\u6700\u8FD1\u6E2F\u53E3\u514D\u8CBB\u4FEE\u5FA9\u3002":"";let s=F.mode==="sailing"&&mn.some(o=>!F.voyage.harvested.includes(`observation:${o.id}`)&&Math.hypot(o.x-F.boat.x,o.z-F.boat.z)<=9),r=Gt.some(o=>Math.hypot(o.dock.x-F.boat.x,o.dock.z-F.boat.z)<=13);se("#interact-button").innerHTML=t?"\u53D6\u5F97\u7269\u4EF6 <kbd>E</kbd>":s&&!r?"\u89C0\u6E2C\u53D6\u6A23 <kbd>E</kbd>":"\u9760\u5CB8 / \u8ABF\u67E5 <kbd>E</kbd>",document.querySelectorAll("[data-sail]").forEach(o=>o.classList.toggle("selected",Math.abs(F.boat.sail-+o.dataset.sail)<.08)),document.querySelectorAll(".dive-control").forEach(o=>o.hidden=!t),$t==="map"&&zh()}function Of(){Ot||$t||Qt!=="running"||Xn(()=>rc(F))}function Bf(){Rt.camera=Rt.camera==="overhead"?"follow":"overhead",Mi?.setCamera(Rt.camera),Do(),ni(Rt.camera==="overhead"?"\u659C\u4FEF\u77B0\u93E1\u982D":"\u8FFD\u8239\u93E1\u982D")}document.addEventListener("keydown",i=>{if(i.ctrlKey||i.altKey||i.metaKey)return;let e=i.key.toLowerCase();if($t){if((e==="escape"||e==="m"&&$t==="map")&&(i.preventDefault(),Ts()),e==="tab"){let t=[...se("#modal-content").querySelectorAll("button,input,select")].filter(n=>!n.disabled);i.shiftKey&&document.activeElement===t[0]?(i.preventDefault(),t.at(-1)?.focus()):!i.shiftKey&&document.activeElement===t.at(-1)&&(i.preventDefault(),t[0]?.focus())}return}["input","select","textarea"].includes(i.target.tagName.toLowerCase())&&e!=="escape"||i.target.tagName==="BUTTON"&&e===" "&&!["sailing","diving"].includes(F.mode)||(["w","a","s","d","arrowup","arrowdown","arrowleft","arrowright"," ","e","m","c","escape"].includes(e)&&(i.preventDefault(),Lf||Si()),i.repeat||(e==="escape"&&gr(!Ot),e==="m"&&Ln("map"),e==="c"&&Bf(),e==="e"&&Of()),Dn.add(e))});document.addEventListener("keyup",i=>Dn.delete(i.key.toLowerCase()));var zf=se(".steering");for(let[i,e]of[["forward","\u2191"],["back","\u2193"]]){let t=document.createElement("button");t.dataset.hold=i,t.textContent=e,t.className="dive-control",t.setAttribute("aria-label",i==="forward"?"\u5411\u524D\u6F5B\u6E38":"\u5411\u5F8C\u6F5B\u6E38"),t.hidden=!0,zf.append(t)}var Ht=document.createElement("div");Ht.id="helm";Ht.setAttribute("role","slider");Ht.tabIndex=0;Ht.setAttribute("aria-label","\u8F49\u8235\u6416\u687F\uFF0C\u6F5B\u6C34\u6642\u53EF\u5411\u56DB\u65B9\u6E38\u52D5");Ht.setAttribute("aria-valuemin","-100");Ht.setAttribute("aria-valuemax","100");Ht.setAttribute("aria-valuenow","0");Ht.innerHTML='<span id="helm-knob">\u2726</span>';zf.prepend(Ht);function kf(i){if(i.pointerId!==Gi||Ot||$t)return;let e=Ht.getBoundingClientRect(),t=i.clientX-e.left-e.width/2,n=i.clientY-e.top-e.height/2,s=e.width*.32,r=Math.max(s,Math.hypot(t,n));bi={x:t/r,y:n/r},se("#helm-knob").style.transform=`translate(${bi.x*s}px,${bi.y*s}px)`,Ht.setAttribute("aria-valuenow",String(Math.round(bi.x*100)))}Ht.onpointerdown=i=>{if(!(Ot||$t||Gi!==null)){i.preventDefault(),Si();try{Ht.setPointerCapture(i.pointerId)}catch{return}Gi=i.pointerId,kf(i)}};Ht.onpointermove=i=>{i.pointerId===Gi&&kf(i)};Ht.onpointerup=Ht.onpointercancel=Ht.onlostpointercapture=i=>{i.pointerId===Gi&&(Gi=null,bi={x:0,y:0},se("#helm-knob").style.transform="translate(0px,0px)",Ht.setAttribute("aria-valuenow","0"))};document.querySelectorAll("[data-hold]").forEach(i=>{i.onpointerdown=e=>{e.preventDefault(),Si(),ql.set(e.pointerId,i.dataset.hold),i.setPointerCapture(e.pointerId)},i.onpointerup=i.onpointercancel=i.onlostpointercapture=e=>ql.delete(e.pointerId)});document.querySelectorAll("[data-sail]").forEach(i=>i.onclick=()=>{Ot||$t||(Si(),F.boat.sail=+i.dataset.sail,$n.play("sail"),i.blur())});se("#interact-button").onclick=()=>{Si(),Of(),se("#interact-button").blur()};se("#surface-button").onclick=()=>Xn(()=>Go(F));se("#map-button").onclick=()=>Ln("map");se("#journal-button").onclick=()=>Ln("journal");se("#camera-button").onclick=Bf;se("#pause-button").onclick=()=>gr(!Ot);var Lo=null;se("#sea").oncontextmenu=i=>i.preventDefault();se("#sea").onpointerdown=i=>{(i.button===2||i.pointerType==="touch"&&i.clientX>innerWidth/2)&&(Lo={id:i.pointerId,x:i.clientX},se("#sea").setPointerCapture(i.pointerId))};se("#sea").onpointermove=i=>{Lo?.id===i.pointerId&&(Mi?.orbit((i.clientX-Lo.x)*.006),Lo.x=i.clientX)};se("#sea").onpointerup=se("#sea").onpointercancel=()=>Lo=null;window.addEventListener("blur",()=>{Wi(),Qt==="running"&&!$t&&gr()});document.addEventListener("visibilitychange",()=>{Wi(),document.hidden&&Qt==="running"&&gr()});window.addEventListener("pagehide",()=>{Wi(),ii(),$n.dispose(),Mi?.dispose()});window.addEventListener("message",i=>{if(i.source!==window.parent||i.origin!==location.origin||!Yl)return;let e=i.data;if(!(!e||e.protocol!=="stteak-game"||e.version!==1||e.sessionId!==Yl||!e.payload||typeof e.payload!="object"||Array.isArray(e.payload))){if(e.type==="host:init"){if(e.payload.gameId!=="tidebound"||typeof e.payload.title!="string"||typeof e.payload.image!="string")return;$l=!0,No&&Zl("game:ready",{capabilities:["pause","resume","restart","keyboard","touch"]});return}!$l||!No||(e.type==="host:start"&&Qt==="ready"&&Wh(),e.type==="host:pause"&&gr(),e.type==="host:resume"&&gr(!1),e.type==="host:restart"&&Nf())}});function ov(){let i=new Set(ql.values()),e=Dn.has("a")||Dn.has("arrowleft")||i.has("left"),t=Dn.has("d")||Dn.has("arrowright")||i.has("right"),n=Dn.has("w")||Dn.has("arrowup")||i.has("forward"),s=Dn.has("s")||Dn.has("arrowdown")||i.has("back");return{turn:Math.max(-1,Math.min(1,Number(t)-Number(e)+bi.x)),sailDelta:Number(n)-Number(s),brake:Dn.has(" "),diveX:Math.max(-1,Math.min(1,Number(t)-Number(e)+bi.x)),diveZ:Math.max(-1,Math.min(1,Number(s)-Number(n)+bi.y))}}function Hf(i){let e=Lh?(i-Lh)/1e3:.016666666666666666;Lh=i;let t=Math.min(.05,e);if(!Ot&&!$t&&Qt==="running"&&["sailing","diving"].includes(F.mode)){let n=F.mode;Gh(su(F,t,ov())),n!==F.mode&&(ii(),As()),Uh%900===0&&$n.play("gull")}Mi.update(F,t,{...Rt,paused:Ot||!!$t||Qt!=="running"}),(Uh++%10===0||i-Cf>180)&&(Jl(),Cf=i),i>Df&&se("#toast").classList.remove("visible"),Uh>30&&(Po.push(e*1e3),Po.length>18e3&&Po.shift()),requestAnimationFrame(Hf)}try{Mi=Rf(se("#sea"),Ql),Mi.setCamera(Rt.camera),window.addEventListener("resize",()=>Mi.resize()),Mi.resize(),Do(),se("#loading").hidden=!0,No=!0,Jl(),$l&&Zl("game:ready",{capabilities:["pause","resume","restart","keyboard","touch"]}),Uo||Vh(),requestAnimationFrame(Hf),window.tidebound=Object.freeze({buildId:Nh,snapshot:()=>structuredClone(F),metrics:()=>{let i=[...Po].sort((e,t)=>e-t);return{frames:Po.length,p50:i[Math.floor(i.length*.5)]||null,p95:i[Math.floor(i.length*.95)]||null,renderer:Mi.stats(),audio:$n.stats(),phase:Qt,paused:Ot,overlay:$t,storageAvailable:Uo}}})}catch(i){console.error(i),se("#loading").innerHTML='<span>\u2248</span><h1>\u6D77\u57DF\u66AB\u6642\u7121\u6CD5\u958B\u555F\u3002</h1><p>\u6B64\u904A\u6232\u9700\u8981\u652F\u63F4 WebGL 2 \u7684\u700F\u89BD\u5668\u3002\u8ACB\u78BA\u8A8D\u786C\u9AD4\u52A0\u901F\u5DF2\u958B\u555F\u5F8C\u91CD\u8A66\u3002</p><button onclick="location.reload()">\u91CD\u65B0\u8F09\u5165</button>',Zl("game:error",{message:"3D \u6D77\u57DF\u521D\u59CB\u5316\u5931\u6557\u3002\u8ACB\u4F7F\u7528\u652F\u63F4 WebGL 2 \u7684\u700F\u89BD\u5668\u4E26\u91CD\u8A66\u3002"})}
/*! Bundled license information:

three/build/three.core.js:
three/build/three.module.js:
  (**
   * @license
   * Copyright 2010-2025 Three.js Authors
   * SPDX-License-Identifier: MIT
   *)
*/
