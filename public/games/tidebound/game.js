var fp=Object.defineProperty;var pp=(i,e)=>{for(var t in e)fp(i,t,{get:e[t],enumerable:!0})};var mc={};pp(mc,{CONTRACTS:()=>Nt,CURRENTS:()=>Fs,DISCOVERIES:()=>yn,DIVE_SITES:()=>Kn,ISLANDS:()=>kt,OBSERVATIONS:()=>bn,REEFS:()=>Oi,RIGS:()=>hi,ROUTE_CHOICES:()=>Ns,ROUTE_DIRECTIONS:()=>Us,TIDE_PERIOD:()=>Jn,WHIRLS:()=>or,WORLD_BOUND:()=>ci});var ci=260,Jn=240,kt=[{id:"harbor",name:"\u6F6E\u97F3\u6E2F",x:-12,z:174,radius:25,dock:{x:-12,z:141},color:"#ead9ad",type:"home",landmark:"harbor",discoveries:[]},{id:"coral",name:"\u73CA\u745A\u7063",x:-124,z:90,radius:24,dock:{x:-98,z:66},color:"#f59e8b",type:"explore",landmark:"coral",discoveries:["fan-coral","foxfish"],diveSiteId:"coral-dive"},{id:"gull",name:"\u767D\u7FBD\u5CF6",x:124,z:64,radius:23,dock:{x:100,z:42},color:"#f0e6c7",type:"explore",landmark:"birds",discoveries:["tern","turtle"]},{id:"mangrove",name:"\u9752\u6839\u5CF6",x:-140,z:-90,radius:25,dock:{x:-110,z:-74},color:"#7db38e",type:"explore",landmark:"mangrove",discoveries:["mangrove-root","seagrass"]},{id:"ruin",name:"\u661F\u76E4\u5CF6",x:126,z:-100,radius:24,dock:{x:99,z:-80},color:"#c3b8de",type:"explore",landmark:"ruins",discoveries:["star-tablet","tide-clock"],diveSiteId:"ruin-dive"},{id:"reef",name:"\u7409\u7483\u7901",x:0,z:4,radius:16,dock:{x:0,z:27},color:"#6ec8c0",type:"reef",landmark:"reef",discoveries:["glass-coral","nautilus"],diveSiteId:"reef-dive"},{id:"lighthouse",name:"\u9060\u6F6E\u71C8\u5854",x:0,z:-222,radius:22,dock:{x:0,z:-192},color:"#ead5a1",type:"lighthouse",landmark:"lighthouse",discoveries:["beacon-lens","keepers-vault"]}],yn=[{id:"foxfish",name:"\u73CA\u745A\u72D0\u9B5A",kind:"animal",islandId:"coral",diveSiteId:"coral-dive",description:"\u85CF\u5728\u6247\u73CA\u745A\u5F8C\u7684\u5C0F\u9B5A\uFF0C\u6A58\u8272\u689D\u7D0B\u96A8\u6F6E\u6C34\u9583\u52D5\u3002"},{id:"tern",name:"\u767D\u7FBD\u71D5\u9DD7",kind:"animal",islandId:"gull",description:"\u6CBF\u8457\u9806\u6D41\u6355\u9B5A\uFF1B\u7260\u5011\u7684\u822A\u7DDA\u662F\u5929\u7136\u7684\u6D77\u6D41\u63D0\u793A\u3002"},{id:"turtle",name:"\u7DA0\u6D77\u9F9C",kind:"animal",islandId:"gull",description:"\u5728\u6EAB\u6696\u6DFA\u7058\u4F11\u606F\u3002\u4FDD\u6301\u8DDD\u96E2\uFF0C\u5C07\u76F8\u9047\u756B\u9032\u6D77\u5716\u3002"},{id:"nautilus",name:"\u73CD\u73E0\u9E1A\u9D61\u87BA",kind:"animal",islandId:"reef",diveSiteId:"reef-dive",description:"\u5728\u7409\u7483\u7901\u4E0B\u7DE9\u6162\u6F02\u79FB\uFF0C\u6BBC\u4E2D\u85CF\u8457\u6D77\u7684\u87BA\u65CB\u3002"},{id:"fan-coral",name:"\u843D\u65E5\u6247\u73CA\u745A",kind:"plant",islandId:"coral",description:"\u73CA\u745A\u662F\u52D5\u7269\u7FA4\u9AD4\uFF1B\u672C\u5716\u9451\u5C07\u5176\u5217\u5165\u690D\u7269\uFF0F\u7901\u7269\u8ABF\u67E5\u3002"},{id:"mangrove-root",name:"\u9752\u6839\u7D05\u6A39",kind:"plant",islandId:"mangrove",description:"\u4EA4\u7E54\u6839\u7CFB\u8B77\u4F4F\u5CF6\u5CB8\uFF0C\u4E5F\u66FF\u5E7C\u9B5A\u4FDD\u7559\u907F\u98A8\u7684\u5C0F\u6C34\u9053\u3002"},{id:"seagrass",name:"\u9280\u5E36\u6D77\u8349",kind:"plant",islandId:"mangrove",description:"\u6D77\u8349\u96A8\u8457\u6F6E\u6D41\u50BE\u4F0F\uFF0C\u662F\u5224\u8B80\u6D41\u5411\u6700\u5B89\u975C\u7684\u5DE5\u5177\u3002"},{id:"glass-coral",name:"\u7409\u7483\u679D\u7901",kind:"plant",islandId:"reef",description:"\u534A\u900F\u660E\u7684\u6F6E\u9593\u7901\u8108\u3002\u9000\u6F6E\u6642\u9732\u51FA\uFF0C\u6EFF\u6F6E\u6642\u53EF\u5F9E\u5916\u570D\u901A\u884C\u3002"},{id:"star-tablet",name:"\u4E03\u661F\u822A\u6D77\u7891",kind:"relic",islandId:"ruin",description:"\u77F3\u523B\u8A18\u9304\u4E03\u5EA7\u5CF6\u5DBC\uFF0C\u4E2D\u592E\u7F3A\u53E3\u6B63\u6307\u5411\u9060\u6F6E\u71C8\u5854\u3002"},{id:"tide-clock",name:"\u6C89\u7761\u6F6E\u9418",kind:"relic",islandId:"ruin",diveSiteId:"ruin-dive",description:"\u9F52\u8F2A\u4ECD\u80FD\u96A8\u6F6E\u64FA\u52D5\uFF0C\u70BA\u4FEE\u5FA9\u71C8\u5854\u7559\u4E0B\u6700\u5F8C\u7684\u7DDA\u7D22\u3002"},{id:"beacon-lens",name:"\u5B88\u671B\u8005\u900F\u93E1",kind:"relic",islandId:"lighthouse",description:"\u6591\u99C1\u900F\u93E1\u7B49\u5F85\u4E09\u4EF6\u96F6\u4EF6\uFF0C\u5C07\u5149\u91CD\u65B0\u6295\u5411\u6F6E\u97F3\u6E2F\u3002"},{id:"keepers-vault",name:"\u5B88\u71C8\u4EBA\u822A\u8A8C",kind:"relic",islandId:"lighthouse",description:"\u300C\u8B80\u61C2\u6F6E\u6C34\uFF0C\u518D\u51FA\u767C\u3002\u300D\u822A\u8A8C\u6700\u5F8C\u4E00\u9801\u4ECD\u7559\u7D66\u4E0B\u4E00\u4F4D\u65C5\u4EBA\u3002"}],hi=[{id:"steady",name:"\u7A69\u5B9A\u5E06",description:"\u5747\u8861\u8F49\u5411\u8207\u822A\u901F\uFF0C\u521D\u6B21\u822A\u884C\u63A8\u85A6\u3002",speed:4,handling:1.75,capacity:8},{id:"swift",name:"\u9806\u98A8\u5E06",description:"\u9806\u98A8\u901F\u5EA6\u6700\u5FEB\uFF0C\u8F49\u5411\u8F03\u6162\uFF1B\u6311\u6230\u6700\u7701\u6642\u7D00\u9304\u3002",speed:5.25,handling:1.3,capacity:5},{id:"cargo",name:"\u9060\u822A\u5E06",description:"\u8CA8\u8259\u66F4\u5927\u3001\u8F49\u5411\u9748\u6D3B\uFF0C\u9069\u5408\u4E00\u6B21\u63A2\u7D22\u591A\u5EA7\u5CF6\u3002",speed:3.25,handling:2.05,capacity:14}],lu=i=>({...kt.find(e=>e.id===i).dock}),Ut=(i,e,t=[])=>({fromIslandId:i,toIslandId:e,waypoints:[lu(i),...t.map(([n,r])=>({x:n,z:r})),lu(e)]}),Nn=(i,e,t,n)=>({id:i,name:e,description:t,legs:n,waypoints:n.flatMap((r,s)=>s?r.waypoints.slice(1):r.waypoints)}),Hr=i=>{let e=yn.find(t=>t.id===i);return{discoveryId:e.id,islandId:e.islandId,kind:e.diveSiteId?"dive":"shore",...e.diveSiteId?{siteId:e.diveSiteId}:{},name:e.name}},Nt=[{id:"coral-survey",name:"\u56DB\u68F2\u5730\u7684\u6F6E\u6C50\u6D77\u5716",islandId:"coral",targetDiscovery:"fan-coral",reward:65,description:"\u5728\u540C\u4E00\u8D9F\u822A\u7A0B\u6BD4\u8F03\u73CA\u745A\u7063\u5CB8\u7901\u8207\u72D0\u9B5A\u3001\u9752\u6839\u7D05\u6A39\u3001\u7409\u7483\u679D\u7901\u8207\u9E1A\u9D61\u87BA\uFF0C\u518D\u8A18\u9304\u767D\u7FBD\u71D5\u9DD7\u3002\u56DB\u5CF6\u516D\u9805\u8ABF\u67E5\u3001\u5169\u6B21\u6DFA\u6F5B\u5F8C\u8FD4\u6E2F\uFF0C\u9023\u8D77\u6C34\u4E0B\u3001\u6F6E\u9593\u3001\u7D05\u6A39\u8207\u7A7A\u4E2D\u7684\u98DF\u7269\u93C8\uFF0C\u540C\u6642\u5C0B\u56DE\u5169\u4EF6\u71C8\u5854\u96F6\u4EF6\u3002",objectives:["fan-coral","foxfish","mangrove-root","glass-coral","nautilus","tern"].map(Hr),routes:[Nn("safe","\u56DB\u68F2\u5730\u5916\u7DE3","\u5F9E\u73CA\u745A\u7063\u6CBF\u7D05\u6A39\u6771\u5CB8\u5317\u4E0A\uFF0C\u518D\u7531\u7409\u7483\u7901\u897F\u5357\u5916\u7DE3\u5165\u6E2F\uFF1B\u7D93\u767D\u7FBD\u5CF6\u6BD4\u8F03\u9CE5\u985E\u5F8C\u8FD4\u6E2F\uFF0C\u5168\u7A0B\u4E0D\u9700\u8981\u7B49\u6F6E\u3002",[Ut("harbor","coral"),Ut("coral","mangrove"),Ut("mangrove","reef",[[-42,38]]),Ut("reef","gull"),Ut("gull","harbor")]),Nn("tide","\u56DB\u68F2\u5730\u6F6E\u9053","\u6CBF\u897F\u5074\u6F6E\u9053\u6BD4\u8F03\u68F2\u5730\uFF0C\u518D\u7A7F\u904E\u7409\u7483\u7901\u5357\u65B9\u6DF1\u6C34\u524D\u5F80\u767D\u7FBD\uFF1B\u6D41\u5411\u4E0D\u5229\u6642\u53EF\u79FB\u5230\u5916\u7DE3\u3002",[Ut("harbor","coral",[[-30,90]]),Ut("coral","mangrove",[[-66,12],[-70,-40]]),Ut("mangrove","reef",[[-40,-35],[-34,38]]),Ut("reef","gull",[[55,25]]),Ut("gull","harbor",[[32,90]])])]},{id:"gull-watch",name:"\u767D\u7FBD\u7684\u822A\u7DDA",islandId:"gull",targetDiscovery:"tern",reward:35,description:"\u767B\u9304\u767D\u7FBD\u5CF6\u71D5\u9DD7\uFF0C\u518D\u628A\u6D41\u5411\u89C0\u5BDF\u5E36\u56DE\u6BCD\u6E2F\u3002",objectives:[Hr("tern")],routes:[Nn("safe","\u767D\u7FBD\u5167\u7DE3","\u6CBF\u65CB\u6D41\u897F\u5074\u8207\u767D\u7FBD\u5CF6\u897F\u5357\u5CB8\u4E4B\u9593\u7684\u6DF1\u6C34\u5ECA\u9053\u3002",[Ut("harbor","gull")]),Nn("tide","\u767D\u7FBD\u6F6E\u7063","\u5F9E\u5357\u65B9\u6F6E\u810A\u6771\u5074\u5207\u5165\u5167\u7063\uFF0C\u89C0\u5BDF\u65CB\u6D41\u8207\u8FD1\u5CB8\u6D41\u5411\u3002",[Ut("harbor","gull",[[32,90]])])]},{id:"green-roots",name:"\u9752\u6839\u7684\u5B88\u8B77",islandId:"mangrove",targetDiscovery:"mangrove-root",reward:45,description:"\u8A18\u9304\u9752\u6839\u7D05\u6A39\u7684\u8B77\u5CB8\u6839\u7CFB\uFF0C\u8FD4\u6E2F\u4EA4\u4ED8\u3002",objectives:[Hr("mangrove-root")],routes:[Nn("safe","\u897F\u7901\u5916\u7DE3","\u7E5E\u904E\u6F6E\u810A\u897F\u5074\u8207\u7409\u7483\u7901\uFF0C\u518D\u6CBF\u7D05\u6A39\u6771\u5CB8\u9760\u6E2F\u3002",[Ut("harbor","mangrove",[[-42,99],[-70,24],[-78,-35]])]),Nn("tide","\u897F\u5074\u6F6E\u9053","\u6CBF\u9752\u8272\u6F6E\u9053\u5317\u884C\uFF1B\u9006\u6D41\u6642\u79FB\u5230\u6F6E\u9053\u5916\u7DE3\u3002",[Ut("harbor","mangrove",[[-50,70],[-50,-40]])])]},{id:"star-reading",name:"\u4E03\u661F\u7684\u822A\u6D77\u5716",islandId:"ruin",targetDiscovery:"star-tablet",reward:50,description:"\u8B80\u53D6\u661F\u76E4\u5CF6\u822A\u6D77\u7891\uFF0C\u5C07\u4E03\u5CF6\u7684\u8A18\u61B6\u5E36\u56DE\u3002",objectives:[Hr("star-tablet")],routes:[Nn("safe","\u661F\u76E4\u6F6E\u9580\u5916\u7DE3","\u7A7F\u904E\u767D\u7FBD\u5CF6\u897F\u5074\uFF0C\u518D\u6CBF\u6F6E\u9580\u6771\u7DE3\u9760\u8FD1\u661F\u76E4\u5CF6\u897F\u5357\u6E2F\u3002",[Ut("harbor","ruin",[[48,96],[70,20],[76,-34]])]),Nn("tide","\u6771\u5074\u6F6E\u9053","\u6CBF\u6771\u5074\u6F6E\u9053\u5229\u7528\u9806\u6D41\uFF0C\u9000\u6F6E\u907F\u958B\u6F6E\u9580\u3002",[Ut("harbor","ruin",[[55,90],[55,-40]])])]},{id:"glass-study",name:"\u7409\u7483\u7901\u8A18\u9304",islandId:"reef",targetDiscovery:"glass-coral",reward:40,description:"\u5728\u7409\u7483\u7901\u5B89\u5168\u9760\u5CB8\uFF0C\u767B\u9304\u7901\u8108\u5F8C\u56DE\u6E2F\u3002",objectives:[Hr("glass-coral")],routes:[Nn("safe","\u7409\u7483\u897F\u74B0","\u7E5E\u958B\u5357\u5074\u6F6E\u810A\uFF0C\u5F9E\u7901\u5CF6\u897F\u5357\u65B9\u9760\u5CB8\uFF1B\u4EFB\u4F55\u6C34\u4F4D\u7686\u53EF\u62B5\u9054\u3002",[Ut("harbor","reef",[[-30,95],[-34,38]])]),Nn("tide","\u6F6E\u810A\u76F4\u822A","\u6EFF\u6F6E\u6642\u8D8A\u904E\u5357\u65B9\u6F6E\u810A\uFF1B\u4F4E\u6F6E\u9078\u897F\u74B0\u3002",[Ut("harbor","reef",[[0,80]])])]},{id:"keepers-journal",name:"\u5B88\u71C8\u4EBA\u7684\u6D88\u606F",islandId:"lighthouse",targetDiscovery:"keepers-vault",reward:65,description:"\u63A2\u8A2A\u9060\u6F6E\u71C8\u5854\u4E26\u767B\u9304\u822A\u8A8C\u3002\u4E09\u4EF6\u96F6\u4EF6\u9F4A\u5099\u6642\u53EF\u540C\u6642\u4FEE\u5FA9\u3002",objectives:[Hr("keepers-vault")],routes:[Nn("safe","\u71C8\u5854\u6DF1\u6C34\u5ECA\u9053","\u7D93\u7409\u7483\u7901\u897F\u5074\uFF0C\u518D\u5F9E\u9752\u6839\u65CB\u6D41\u6771\u7DE3\u7684\u6DF1\u6C34\u5ECA\u9053\u62B5\u9054\u71C8\u5854\uFF1B\u4E0D\u9700\u8981\u7B49\u6F6E\u3002",[Ut("harbor","lighthouse",[[-40,100],[-48,40],[-40,-25],[-20,-85],[0,-145]])]),Nn("tide","\u6771\u5074\u501F\u6D41\u5ECA\u9053","\u6CBF\u661F\u76E4\u6F6E\u9053\u8B80\u53D6\u9806\u9006\u6D41\uFF0C\u518D\u5F9E\u6F6E\u9580\u6771\u5074\u6DF1\u6C34\u901A\u904E\uFF1B\u6C34\u4F4D\u4E0D\u8DB3\u4E5F\u6709\u5B8C\u6574\u822A\u8DEF\u3002",[Ut("harbor","lighthouse",[[45,90],[70,-40],[70,-140]])])]}],Re=(i,e,t,n,r,s)=>({id:i,label:e,reason:t,kind:n,waypoints:[{x:r,z:s}]}),Fn=(i,e,t,n,r,s,o,a={})=>({id:i,name:e,x:t,z:n,radius:r,directions:{...s?{north:Array.isArray(s)?{options:s}:s}:{},...o?{south:Array.isArray(o)?{options:o}:o}:{},...a}}),Us=Object.freeze({north:Object.freeze({x:0,z:-1}),south:Object.freeze({x:0,z:1}),east:Object.freeze({x:1,z:0}),west:Object.freeze({x:-1,z:0})}),Ns=[Fn("shoal-margin","\u5357\u65B9\u6F6E\u810A\u897F\u7DE3",-35,99,35,{entries:[{destinationIslandId:"reef",x:0,z:126,radius:14,lateralRadius:24,options:[Re("outer","\u6F6E\u810A\u897F\u5074\u7E5E\u884C","\u897F\u5074\u822A\u5411\u8F03\u63A5\u8FD1\u56FA\u5B9A\u98A8\u5411\uFF0C\u5F8C\u6BB5\u5F9E\u7409\u7483\u897F\u5357\u65B9\u5165\u6CCA\uFF1B\u5FC5\u9808\u4FDD\u6301\u7901\u5708\u5916\u7684\u8F49\u5411\u3002","safe",-30,76),Re("inner","\u6F6E\u810A\u6771\u5074\u7E5E\u884C","\u6771\u5074\u822A\u5411\u7684\u5E06\u529B\u8F03\u5F31\uFF0C\u5F8C\u6BB5\u63A5\u7409\u7483\u5357\u9762\u6CCA\u4F4D\u8F03\u76F4\u63A5\uFF1B\u540C\u6A23\u5F9E\u7901\u5708\u5916\u901A\u904E\u3002","direct",28,72)]}],options:[Re("outer","\u5916\u7DE3\u7559\u8DB3\u5CB8\u8DDD","\u897F\u5074\u6DF1\u6C34\u7559\u51FA\u66F4\u5927\u7684\u8F49\u8235\u7A7A\u9593\uFF0C\u4E0B\u4E00\u6BB5\u5230\u7409\u7483\u7901\u8F03\u9060\u3002","safe",-48,84),Re("inner","\u5167\u7DE3\u7E2E\u77ED\u63A5\u8FD1","\u5F9E\u6F6E\u810A\u897F\u7DE3\u8FD1\u7DDA\u901A\u904E\uFF0C\u7E2E\u77ED\u5F80\u4E2D\u592E\u6CCA\u4F4D\u7684\u5F8C\u6BB5\uFF1B\u9700\u5B88\u4F4F\u7901\u5916\u5CB8\u8DDD\u3002","current",-24,84)]},{entry:{x:-35,z:99,radius:39.5},entries:[{destinationIslandId:"harbor",x:0,z:60,radius:9,lateralRadius:15,options:[Re("outer","\u897F\u5074\u7E5E\u7901\u8FD4\u6E2F","\u7531\u6F6E\u810A\u897F\u5074\u6DF1\u6C34\u8FD4\u6E2F\uFF0C\u56FA\u5B9A\u98A8\u89D2\u8F03\u6709\u5229\uFF1B\u5F8C\u6BB5\u8981\u5411\u6771\u5C0D\u6E96\u6BCD\u6E2F\u3002","safe",-30,105),Re("inner","\u6771\u5074\u7E5E\u7901\u8FD4\u6E2F","\u5F9E\u6F6E\u810A\u6771\u5074\u6DF1\u6C34\u8FD4\u6E2F\uFF0C\u5F8C\u6BB5\u8F03\u63A5\u8FD1\u6BCD\u6E2F\u4E2D\u7DDA\uFF1B\u5E06\u89D2\u8F03\u5F31\u4E14\u9760\u8FD1\u7901\u5074\uFF0C\u9808\u5B88\u4F4F\u8DEF\u9EDE\u3002","direct",30,108)]},{x:-34,z:82,radius:32,lateralRadius:8}],options:[Re("outer","\u5916\u7DE3\u4FDD\u7559\u8F49\u8235\u7A7A\u9593","\u6CBF\u897F\u5074\u6DF1\u6C34\u51FA\u7063\uFF0C\u96E2\u6F6E\u810A\u8F03\u9060\u4F46\u8FD4\u6E2F\u9700\u591A\u8F49\u4E00\u6B21\u8235\u3002","safe",-48,94),Re("inner","\u8FD1\u7901\u7DDA\u659C\u5411\u6BCD\u6E2F","\u5F9E\u6F6E\u810A\u897F\u7DE3\u659C\u5411\u6BCD\u6E2F\uFF0C\u822A\u7A0B\u8F03\u76F4\u63A5\uFF1B\u4E0D\u8981\u5207\u9032\u6A19\u793A\u7901\u5708\u3002","current",-24,94)]}),Fn("glass-west-current","\u7409\u7483\u897F\u5CB8\u6D41\u53E3",-53,37,50,[Re("outer","\u6F6E\u9053\u5916\u7DE3","\u8F03\u897F\u7684\u822A\u7DDA\u6E1B\u5C11\u5074\u6D41\u63A8\u79FB\uFF0C\u4FDD\u7559\u8F03\u5927\u96E2\u7901\u7A7A\u9593\u3002","safe",-78,29),Re("inner","\u8CBC\u6D41\u9032\u5165\u5167\u7063","\u9760\u8FD1\u9752\u6839\u6F6E\u9053\u4E2D\u5FC3\uFF0C\u9806\u6D41\u6642\u501F\u901F\u3001\u9006\u6D41\u6642\u591A\u627F\u53D7\u6D41\u963B\u3002","current",-36,29)],{entry:{x:-53,z:37,radius:52},entries:[{x:-40,z:-10,radius:14,lateralRadius:16,options:[Re("outer","\u897F\u5074\u6DF1\u6C34\u659C\u51FA\u7063","\u659C\u5411\u897F\u5074\u6DF1\u6C34\uFF0C\u8207\u7409\u7483\u7901\u4FDD\u7559\u8F03\u5927\u8DDD\u96E2\uFF1B\u5F9E\u5317\u7901\u63A5\u8FD1\u6642\u5E06\u89D2\u8F03\u6709\u5229\uFF0C\u4F46\u822A\u7A0B\u8F03\u9577\uFF0C\u5357\u5074\u4ECD\u9700\u56DE\u6B63\u3002","safe",-58,28),Re("inner","\u7901\u897F\u8FD1\u7DDA\u51FA\u7063","\u6CBF\u7901\u897F\u8F03\u8FD1\u7684\u6DF1\u6C34\u7DDA\u63A5\u5357\u7063\uFF0C\u7E2E\u77ED\u7E5E\u884C\uFF1B\u5CB8\u8DDD\u8F03\u5C0F\uFF0C\u5F9E\u5317\u7901\u63A5\u8FD1\u6642\u5E06\u89D2\u8F03\u5F31\u3002","current",-38,25)]},{x:-24,z:-10,radius:18.5,lateralRadius:24,options:[Re("outer","\u897F\u5074\u7A7F\u6D41\u7559\u5CB8\u8DDD","\u659C\u7A7F\u897F\u5074\u6C34\u57DF\uFF0C\u4FDD\u7559\u8F03\u5927\u7901\u5CB8\u8DDD\u96E2\uFF1B\u5F9E\u5317\u7901\u63A5\u8FD1\u6642\u5E06\u89D2\u8F03\u6709\u5229\uFF0C\u5357\u5074\u4ECD\u9700\u56DE\u6B63\u3002\u8ACB\u6309\u7576\u4E0B\u6CBF\u822A\u8DEF\u6D41\u901F\u6BD4\u8F03\u53D6\u6368\u3002","current",-55,20),Re("inner","\u7901\u897F\u8FD1\u7DDA\u63A5\u5357\u7063","\u5F9E\u7409\u7483\u897F\u5CB8\u8F03\u8FD1\u7684\u6DF1\u6C34\u7DDA\u9032\u5165\u5357\u7063\uFF0C\u5C11\u5411\u897F\u7E5E\u884C\uFF1B\u5CB8\u8DDD\u8F03\u5C0F\uFF0C\u5F9E\u5317\u7901\u63A5\u8FD1\u6642\u5E06\u89D2\u8F03\u5F31\u3002","safe",-36,20)]}],options:[Re("outer","\u5916\u7DE3\u51FA\u7063","\u5F9E\u6F6E\u9053\u5916\u7DE3\u56DE\u5230\u5357\u7063\uFF0C\u6D41\u5F71\u97FF\u8F03\u5C0F\u4F46\u96E2\u6BCD\u6E2F\u4E2D\u7DDA\u8F03\u9060\u3002","safe",-70,12),Re("inner","\u5167\u7DE3\u501F\u6D41\u51FA\u7063","\u6CBF\u7409\u7483\u7901\u897F\u5074\u7684\u8F03\u5F37\u6D41\u5E36\u51FA\u7063\uFF0C\u4F9D\u7576\u524D\u6D41\u5411\u6C7A\u5B9A\u662F\u5426\u503C\u5F97\u3002","current",-36,20)]}),Fn("green-current","\u9752\u6839\u6F6E\u9053\u5206\u6D41",-48,-8,48,[Re("outer","\u7D05\u6A39\u5916\u7DE3\u6C34\u9053","\u8F03\u897F\u5074\u6D41\u529B\u8F03\u5F31\uFF0C\u9760\u9752\u6839\u6CCA\u4F4D\u4E5F\u8F03\u76F4\u63A5\u3002","safe",-87,-36),Re("inner","\u4E2D\u592E\u6D41\u5E36","\u4E2D\u592E\u6D41\u5E36\u8F03\u5F37\uFF1B\u5317\u4E0A\u9806\u6D41\u53EF\u52A0\u901F\uFF0C\u9006\u6D41\u5247\u589E\u52A0\u6642\u9593\u3002","current",-43,-36)],[Re("outer","\u897F\u7DE3\u6E1B\u5C11\u9006\u6D41","\u6CBF\u8F03\u5F31\u6D41\u529B\u7684\u5916\u7DE3\u8FD4\u822A\uFF0C\u4EE5\u8DDD\u96E2\u63DB\u53D6\u8F03\u5C11\u6D41\u963B\u3002","safe",-68,-12),Re("inner","\u4E2D\u592E\u6D41\u5E36\u8FD4\u822A","\u4E2D\u592E\u6D41\u5E36\u8F03\u5F37\uFF1B\u5357\u4E0B\u662F\u5426\u501F\u5230\u6D41\u901F\u53D6\u6C7A\u65BC\u76EE\u524D\u6F6E\u76F8\u3002","current",-52,-20)]),Fn("whirl-east-margin","\u9752\u6839\u65CB\u6D41\u6771\u7DE3",-18,-87,54,{entry:{x:-18,z:-94,radius:45,lateralRadius:26},options:[Re("outer","\u5411\u6771\u591A\u7559\u65CB\u6D41\u8DDD\u96E2","\u504F\u6771\u6DF1\u6C34\u96E2\u65CB\u6D41\u66F4\u9060\uFF0C\u9069\u5408\u5148\u78BA\u4FDD\u8F49\u8235\u7A7A\u9593\u3002","safe",5,-104),Re("inner","\u65CB\u6D41\u5916\u5708\u8FD1\u7DDA","\u8CBC\u8457\u65CB\u6D41\u5916\u5708\u7684\u6DF1\u6C34\u8FD1\u7DDA\u5317\u4E0A\uFF0C\u8DEF\u8F03\u76F4\u63A5\u4F46\u8981\u5B88\u4F4F\u5916\u5708\u3002","current",-25,-104)]},{entry:{x:0,z:-87,radius:42,lateralRadius:42},options:[Re("outer","\u6771\u5074\u6DF1\u6C34\u8FD4\u822A","\u9060\u96E2\u65CB\u6D41\u5F8C\u518D\u8F49\u5165\u6D77\u5716\u4E2D\u592E\uFF0C\u5074\u6D41\u5F71\u97FF\u8F03\u5C11\u3002","safe",5,-70),Re("inner","\u9752\u6839\u6F6E\u9053\u63A5\u7E8C\u7DDA","\u6CBF\u65CB\u6D41\u6771\u5074\u63A5\u5165\u9752\u6839\u6F6E\u9053\uFF1B\u6BD4\u8F03\u7576\u524D\u6D41\u5411\u8207\u8F03\u76F4\u63A5\u7684\u897F\u5074\u8DEF\u5F91\u3002","current",-25,-70)]}),Fn("north-reef-current","\u7409\u7483\u5317\u7901\u6D41\u53E3",-24,-48,46,{destinationIslandId:"lighthouse",entry:{x:-24,z:-55,radius:54},options:[Re("outer","\u897F\u5074\u5F37\u6D41\u7DDA","\u897F\u5074\u63A5\u8FD1\u9752\u6839\u6F6E\u9053\u4E2D\u5FC3\uFF0C\u9806\u6D41\u53EF\u7701\u6642\uFF0C\u9006\u6D41\u6703\u62D6\u6162\u3002","current",-40,-74),Re("inner","\u6771\u5074\u5F31\u6D41\u7DDA","\u6771\u5074\u6D41\u529B\u8F03\u5F31\uFF0C\u4F46\u4E0B\u4E00\u6BB5\u9808\u4FDD\u7559\u65CB\u6D41\u7684\u6771\u5074\u901A\u9053\u3002","safe",-12,-74)]},{entry:{x:-20,z:-38,radius:34,lateralRadius:60},entries:[{x:4,z:-48,radius:31,lateralRadius:12,options:[Re("outer","\u6771\u4F86\u5411\u897F\u5074\u6D41\u5E36","\u5F9E\u65CB\u6D41\u6771\u5074\u63A5\u8FD1\u6642\uFF0C\u659C\u5411\u897F\u5074\u8F03\u5F37\u6D41\u5E36\uFF0C\u8F03\u8FD1\u7901\u7DDA\u591A\u7559\u96E2\u5CB8\u8DDD\u96E2\uFF1B\u9806\u9006\u6D41\u6C7A\u5B9A\u9019\u6BB5\u7684\u6642\u9593\u6210\u672C\u3002","current",-33,-28),Re("inner","\u6771\u4F86\u5411\u7901\u5916\u8FD1\u7DDA","\u5F9E\u65CB\u6D41\u6771\u5074\u63A5\u8FD1\u6642\uFF0C\u6CBF\u8F03\u5F31\u6D41\u7684\u8FD1\u7DDA\u5357\u4E0B\uFF1B\u6A6B\u5411\u822A\u7A0B\u8F03\u77ED\uFF0C\u4F46\u66F4\u9760\u8FD1\u7409\u7483\u7901\u5317\u5074\u5CB8\u7DDA\u3002","safe",-15,-22)]}],options:[Re("outer","\u897F\u5074\u6D41\u5E36\u51FA\u5165\u53E3","\u8F03\u897F\u5074\u6D41\u529B\u66F4\u5F37\uFF0C\u4E14\u96E2\u7409\u7483\u7901\u8F03\u9060\uFF1B\u9806\u9006\u6D41\u6C7A\u5B9A\u6642\u9593\u6210\u672C\u3002","current",-40,-22),Re("inner","\u7901\u5916\u5F31\u6D41\u7DDA","\u907F\u958B\u6F6E\u9053\u4E2D\u5FC3\u7684\u8F03\u5F37\u6D41\u529B\uFF0C\u4EE3\u50F9\u662F\u66F4\u9760\u8FD1\u7409\u7483\u7901\u5317\u5074\u5CB8\u7DDA\u3002","safe",-15,-22)]}),Fn("beacon-wind","\u71C8\u5854\u6CCA\u5916\u5206\u6D41",0,-145,26,{destinationIslandId:"lighthouse",entry:{x:0,z:-140,radius:30},options:[Re("outer","\u897F\u5074\u5C0D\u4F4D\u518D\u9760\u6CCA","\u5F9E\u897F\u5074\u6DF1\u6C34\u9810\u7559\u8F49\u8235\u7A7A\u9593\uFF0C\u518D\u659C\u5411\u71C8\u5854\u6CCA\u4F4D\uFF1B\u822A\u7A0B\u8F03\u9577\uFF0C\u9700\u5728\u6700\u5F8C\u8F49\u5411\u524D\u6536\u5E06\u3002","safe",-20,-172),Re("inner","\u4E2D\u592E\u8FD1\u7DDA\u9760\u6CCA","\u6CBF\u4E2D\u592E\u77ED\u7DDA\u63A5\u8FD1\u71C8\u5854\u6CCA\u4F4D\uFF1B\u8F03\u65E9\u9762\u5C0D\u5CF6\u5CB8\uFF0C\u9808\u53CA\u6642\u6536\u5E06\u907F\u514D\u904E\u885D\u3002","direct",0,-172)]},[Re("outer","\u897F\u5074\u6DF1\u6C34\u8FD4\u822A","\u5411\u897F\u63A5\u5165\u65CB\u6D41\u6771\u5074\u6DF1\u6C34\u5ECA\u9053\uFF0C\u8F03\u5C11\u53D7\u5230\u661F\u76E4\u6F6E\u6D41\u5F71\u97FF\u3002","safe",-20,-112),Re("inner","\u6771\u5074\u63A5\u661F\u76E4\u6F6E\u9053","\u504F\u6771\u63A5\u8FD1\u661F\u76E4\u6D41\u5E36\uFF1B\u9806\u6D41\u53EF\u80FD\u7701\u6642\uFF0C\u9006\u6D41\u6642\u5916\u7DE3\u66F4\u5BB9\u6613\u524D\u9032\u3002","current",20,-112)],{west:{destinationIslandId:"lighthouse",entry:{x:36,z:-140,radius:42,lateralRadius:35},options:[Re("outer","\u6771\u5074\u7559\u5CB8\u8DDD\u5165\u6CCA","\u5148\u5728\u71C8\u5854\u6771\u5357\u5074\u9810\u7559\u8F49\u5411\u7A7A\u9593\uFF0C\u518D\u5411\u6CCA\u4F4D\u9760\u650F\uFF1B\u672B\u6BB5\u8F03\u9577\u4F46\u9060\u96E2\u5CF6\u5CB8\u3002","safe",20,-172),Re("inner","\u4E2D\u592E\u77ED\u7DDA\u5C0D\u4F4D","\u76F4\u63A5\u659C\u5411\u4E2D\u592E\u6CCA\u4F4D\u5EF6\u9577\u7DDA\uFF0C\u5F8C\u6BB5\u8F03\u77ED\uFF1B\u5148\u6536\u5E06\u518D\u63A5\u8FD1\u71C8\u5854\u5CB8\u7DDA\u3002","direct",0,-172)]}}),Fn("white-whirl-margin","\u767D\u7FBD\u65CB\u6D41\u897F\u7DE3",54,91,48,{entry:{x:54,z:91,radius:40},options:[Re("outer","\u897F\u5074\u5BEC\u6C34\u57DF","\u4FDD\u7559\u8F03\u5927\u65CB\u6D41\u8207\u5CF6\u5CB8\u8DDD\u96E2\uFF0C\u5F80\u767D\u7FBD\u6CCA\u4F4D\u9700\u518D\u8F49\u5411\u3002","safe",48,56),Re("inner","\u767D\u7FBD\u6CCA\u5916\u8FD1\u7DDA","\u6CBF\u65CB\u6D41\u897F\u5074\u8FD1\u7DDA\u5C0D\u6E96\u767D\u7FBD\u6E2F\uFF0C\u7E2E\u77ED\u5F8C\u6BB5\u4F46\u9700\u8981\u7CBE\u6E96\u8F49\u8235\u3002","current",76,56)]},{entry:{x:54,z:91,radius:48},options:[Re("outer","\u897F\u5074\u5BEC\u6C34\u57DF\u8FD4\u6E2F","\u5411\u897F\u4FDD\u7559\u65CB\u6D41\u8DDD\u96E2\uFF0C\u518D\u659C\u5411\u6BCD\u6E2F\uFF0C\u8F49\u8235\u7A7A\u9593\u8F03\u5927\u3002","safe",40,112),Re("inner","\u65CB\u6D41\u8FD1\u5074\u77ED\u7DDA","\u7531\u65CB\u6D41\u897F\u5074\u6DF1\u6C34\u8FD1\u7DDA\u56DE\u6E2F\uFF0C\u8DEF\u66F4\u76F4\u63A5\u4F46\u4E0D\u8981\u5F80\u6771\u5207\u5165\u65CB\u6D41\u5708\u3002","current",50,100)]}),Fn("glass-east-margin","\u7409\u7483\u6771\u5CB8\u6C34\u9053",45,25,46,{entry:{x:45,z:25,radius:45},options:[Re("outer","\u6771\u5074\u6DF1\u6C34\u7DDA","\u96E2\u7409\u7483\u7901\u8F03\u9060\uFF0C\u9069\u5408\u9810\u7559\u8F49\u5165\u661F\u76E4\u6F6E\u9053\u7684\u7A7A\u9593\u3002","safe",65,0),Re("inner","\u7901\u5916\u8FD1\u5074\u7DDA","\u9760\u8FD1\u7409\u7483\u7901\u6771\u5074\u5916\u7DE3\u901A\u904E\uFF0C\u8207\u897F\u5074\u68F2\u5730\u7684\u63A5\u7E8C\u8F03\u77ED\uFF1B\u52FF\u8CBC\u5CB8\u6025\u8F49\u3002","current",42,0)]},{entry:{x:45,z:25,radius:45},options:[Re("outer","\u767D\u7FBD\u5074\u6DF1\u6C34\u7DDA","\u5F9E\u6771\u5074\u6DF1\u6C34\u63A5\u5411\u767D\u7FBD\u5167\u7063\uFF0C\u8F03\u5C11\u8FD1\u5CB8\u4FEE\u6B63\u3002","safe",65,52),Re("inner","\u4E2D\u592E\u7901\u5916\u8FD1\u7DDA","\u5F9E\u7409\u7483\u7901\u6771\u5074\u5916\u7DE3\u5411\u6BCD\u6E2F\u4E2D\u7DDA\u63A5\u8FD1\uFF0C\u7559\u610F\u8239\u9AD4\u7684\u96E2\u7901\u7A7A\u9593\u3002","current",36,52)]}),Fn("star-gate-margin","\u661F\u76E4\u6F6E\u9580\u6771\u7DE3",74,-29,26,{entry:{x:74,z:-29,radius:22},options:[Re("outer","\u6771\u5074\u5BEC\u6DF1\u6C34","\u8207\u661F\u76E4\u6F6E\u9580\u4FDD\u6301\u8F03\u5927\u8DDD\u96E2\uFF0C\u6D41\u529B\u4E5F\u8F03\u504F\u5916\u7DE3\u3002","safe",82,-65),Re("inner","\u6F6E\u9580\u5916\u501F\u6D41\u7DDA","\u4ECD\u5F9E\u6F6E\u9580\u5916\u5074\u901A\u904E\uFF0C\u4F46\u9760\u8FD1\u661F\u76E4\u6F6E\u9053\u4E2D\u5FC3\uFF1B\u6D41\u5411\u6C7A\u5B9A\u80FD\u5426\u7701\u6642\u3002","current",68,-64)]},[Re("outer","\u6771\u5074\u5916\u7DE3\u8FD4\u822A","\u4EE5\u8F03\u5927\u7684\u7901\u5916\u7A7A\u9593\u63DB\u53D6\u8F03\u5F31\u7684\u6F6E\u9053\u63A8\u79FB\u3002","safe",82,7),Re("inner","\u4E2D\u592E\u6D41\u5E36\u8FD4\u822A","\u6CBF\u6F6E\u9580\u6771\u5074\u6D41\u5E36\u5357\u4E0B\uFF0C\u9806\u9006\u6D41\u6703\u6539\u8B8A\u8FD4\u822A\u6642\u9593\u3002","current",65,7)]),Fn("star-north-current","\u661F\u76E4\u5317\u5074\u6D41\u7DE3",70,-100,26,[Re("outer","\u5317\u5074\u6DF1\u6C34\u5916\u7DE3","\u5148\u6CBF\u661F\u76E4\u5916\u5074\u6DF1\u6C34\u5317\u884C\uFF0C\u518D\u8F49\u5411\u71C8\u5854\uFF0C\u4FDD\u7559\u5CF6\u5CB8\u7A7A\u9593\u3002","safe",76,-132),Re("inner","\u504F\u897F\u63A5\u71C8\u5854","\u504F\u897F\u7A7F\u904E\u6F6E\u9053\uFF0C\u5F80\u71C8\u5854\u7684\u5F8C\u6BB5\u8F03\u77ED\uFF1B\u9700\u4FEE\u6B63\u5074\u6D41\u63A8\u79FB\u3002","current",48,-132)],[Re("outer","\u6771\u5074\u6D41\u7DE3","\u5411\u661F\u76E4\u6F6E\u9053\u5916\u7DE3\u79FB\u52D5\uFF0C\u8F03\u5BB9\u6613\u63A7\u5236\u4E0B\u4E00\u6B21\u9760\u6CCA\u8F49\u5411\u3002","safe",76,-68),Re("inner","\u897F\u5074\u6D41\u5E36","\u7559\u5728\u8F03\u9760\u8FD1\u6F6E\u9580\u7684\u6D41\u5E36\u4E2D\uFF0C\u4F9D\u9806\u9006\u6D41\u6BD4\u8F03\u8FD4\u822A\u8DEF\u7A0B\u3002","current",65,-68)]),Fn("west-current-exit","\u9752\u6839\u6D41\u5C3E\u8207\u6F6E\u810A\u8F49\u63A5",-41.5,56,40,null,{entries:[{x:-45,z:50,radius:36,options:[Re("outer","\u897F\u5074\u6D41\u5C3E\u63A5\u6F6E\u810A","\u6CBF\u897F\u5074\u6C34\u57DF\u63A5\u5411\u6F6E\u810A\u5916\u7DE3\uFF0C\u4FDD\u7559\u8F03\u5927\u7684\u96E2\u7901\u7A7A\u9593\uFF1B\u5357\u7AEF\u518D\u5411\u6BCD\u6E2F\u56DE\u6B63\uFF0C\u6D41\u6CC1\u770B\u7576\u4E0B\u6CBF\u7DDA\u6295\u5F71\u3002","current",-48,70),Re("inner","\u659C\u51FA\u6D41\u5C3E\u63A5\u6F6E\u810A","\u5411\u6771\u659C\u51FA\u6D41\u5C3E\uFF0C\u8F03\u65E9\u63A5\u8FD1\u6F6E\u810A\u897F\u5074\uFF1B\u5F8C\u6BB5\u8F03\u76F4\u63A5\uFF0C\u4F46\u96E2\u7901\u7A7A\u9593\u8F03\u5C0F\uFF0C\u9700\u5B88\u4F4F\u8FD1\u7DDA\u3002","safe",-30,60)]}],options:[Re("outer","\u897F\u7DE3\u7559\u6D41\u518D\u7E5E\u6F6E\u810A","\u6CBF\u897F\u5074\u6D41\u5C3E\u63A5\u5411\u6F6E\u810A\u5916\u7DE3\uFF1B\u6BD4\u8F03\u76EE\u524D\u6D41\u6CC1\u8207\u5F8C\u7E8C\u8DDD\u96E2\u3002","current",-65,65),Re("inner","\u63D0\u65E9\u96E2\u6D41\u63A5\u8FD1\u6F6E\u810A","\u659C\u7A7F\u6D41\u5C3E\u5F8C\u96E2\u958B\u6D41\u5E36\uFF0C\u8F03\u65E9\u63A5\u8FD1\u6F6E\u810A\u897F\u5074\uFF1B\u9806\u6D41\u6642\u6703\u653E\u68C4\u90E8\u5206\u6D41\u901F\u3002","safe",-30,65)]}),Fn("harbor-approach","\u6F6E\u97F3\u6E2F\u6CCA\u5916\u9032\u6E2F",20,147,60,null,{destinationIslandId:"harbor",entry:{x:20,z:147,radius:60,maxDestinationDistance:76},entries:[{x:-38,z:128,radius:38,lateralRadius:24,maxDestinationDistance:50}],options:[Re("outer","\u5916\u5074\u5C0D\u4F4D\u5F8C\u5165\u6E2F","\u5148\u5728\u6CCA\u4F4D\u897F\u5074\u5C0D\u4F4D\uFF0C\u4FDD\u7559\u8F03\u5927\u7684\u5CB8\u8DDD\uFF1B\u6700\u5F8C\u4ECD\u9700\u6536\u5E06\u8F49\u5411\u91D1\u8272\u6CCA\u4F4D\u3002","safe",-20,135),Re("inner","\u76F4\u63A5\u5C0D\u6E96\u91D1\u8272\u6CCA\u4F4D","\u6700\u76F4\u63A5\u7684\u9032\u6E2F\u7DDA\uFF0C\u9760\u8FD1\u6BCD\u6E2F\u5CB8\u7DDA\u524D\u9700\u53CA\u6642\u6536\u5E06\uFF0C\u907F\u514D\u904E\u885D\u3002","current",-12,141)]}),{id:"glass-white-crossing",name:"\u7409\u7483\u8207\u767D\u7FBD\u6A6B\u5411\u9032\u6E2F",x:54,z:35,radius:20,directions:{east:{destinationIslandId:"gull",entry:{x:64,z:35,radius:17,lateralRadius:38},options:[Re("outer","\u767D\u7FBD\u6CCA\u5916\u5C0D\u4F4D","\u5148\u5728\u767D\u7FBD\u6CCA\u4F4D\u7684\u5916\u5074\u5EF6\u9577\u7DDA\u5C0D\u4F4D\uFF0C\u518D\u6CBF\u5CB8\u5916\u65B9\u5411\u5165\u6E2F\uFF1B\u822A\u7A0B\u8F03\u9577\uFF0C\u8F49\u5411\u6642\u6709\u8F03\u591A\u96E2\u5CB8\u7A7A\u9593\u3002","safe",76,20),Re("inner","\u767D\u7FBD\u8FD1\u5074\u77ED\u7DDA","\u76F4\u63A5\u63A5\u8FD1\u767D\u7FBD\u897F\u5317\u6CCA\u4F4D\uFF0C\u5C11\u7E5E\u4E00\u6BB5\uFF1B\u8F03\u65E9\u63A5\u8FD1\u5CF6\u5CB8\uFF0C\u9808\u6536\u5E06\u4E26\u5B88\u4F4F\u91D1\u8272\u6CCA\u4F4D\u65B9\u5411\u3002","direct",76,38)]},west:{destinationIslandId:"reef",entry:{x:44,z:35,radius:20},options:[Re("outer","\u7409\u7483\u6CCA\u5916\u5C0D\u4F4D","\u5148\u5230\u7409\u7483\u5357\u65B9\u6CCA\u4F4D\u5916\u5074\uFF0C\u518D\u5411\u5317\u5C0D\u6E96\u6CCA\u4F4D\uFF1B\u8F03\u9577\u4F46\u4FDD\u7559\u8F49\u8235\u8207\u96E2\u5CB8\u7A7A\u9593\u3002","safe",0,48),Re("inner","\u7409\u7483\u8FD1\u5074\u77ED\u7DDA","\u5F9E\u6771\u5357\u65B9\u76F4\u63A5\u63A5\u8FD1\u7409\u7483\u6CCA\u4F4D\uFF0C\u7E2E\u77ED\u822A\u7A0B\uFF1B\u6536\u5E06\u5F8C\u624D\u8F49\u5411\u8FD1\u7901\u6CCA\u4F4D\uFF0C\u907F\u514D\u5207\u5165\u5CB8\u7DDA\u3002","direct",24,31)]}}},{id:"glass-port-approach",name:"\u7409\u7483\u897F\u5357\u6CCA\u5916",x:-38,z:36,radius:18,directions:{south:{destinationIslandId:"reef",entry:{x:-36,z:11,radius:6,lateralRadius:12},options:[Re("outer","\u5357\u5074\u5C0D\u4F4D\u5165\u6E2F","\u5148\u7559\u5728\u7409\u7483\u5357\u5074\u6DF1\u6C34\uFF0C\u518D\u5411\u5317\u5C0D\u6E96\u6CCA\u4F4D\uFF1B\u8DDD\u96E2\u8F03\u9577\uFF0C\u8F49\u5411\u6642\u96E2\u5CB8\u8F03\u9060\u3002","safe",-8,40),Re("inner","\u8FD1\u7901\u77ED\u7DDA\u5165\u6E2F","\u5F9E\u897F\u5357\u5074\u8FD1\u7DDA\u63A5\u6CCA\u4F4D\uFF0C\u7E2E\u77ED\u822A\u7A0B\uFF1B\u4FDD\u6301\u8239\u8EAB\u5728\u7901\u5CB8\u5916\uFF0C\u5148\u6536\u5E06\u518D\u8F49\u5411\u3002","direct",-16,31)]},east:{destinationIslandId:"reef",minForwardDot:.5,entry:{x:-38,z:36,radius:28,lateralRadius:26,maxDestinationDistance:54},options:[Re("outer","\u5357\u5074\u5C0D\u4F4D\u5165\u6E2F","\u5148\u7559\u5728\u7409\u7483\u5357\u5074\u6DF1\u6C34\uFF0C\u518D\u5411\u5317\u5C0D\u6E96\u6CCA\u4F4D\uFF1B\u8DDD\u96E2\u8F03\u9577\uFF0C\u8F49\u5411\u6642\u96E2\u5CB8\u8F03\u9060\u3002","safe",-8,40),Re("inner","\u8FD1\u7901\u77ED\u7DDA\u5165\u6E2F","\u5F9E\u897F\u5357\u5074\u8FD1\u7DDA\u63A5\u6CCA\u4F4D\uFF0C\u7E2E\u77ED\u822A\u7A0B\uFF1B\u4FDD\u6301\u8239\u8EAB\u5728\u7901\u5CB8\u5916\uFF0C\u5148\u6536\u5E06\u518D\u8F49\u5411\u3002","direct",-16,31)]},north:{destinationIslandId:"reef",entry:{x:-30,z:61,radius:18,lateralRadius:75},options:[Re("outer","\u897F\u5357\u6DF1\u6C34\u5C0D\u4F4D","\u5148\u5728\u897F\u5357\u5074\u7559\u8DB3\u5CB8\u8DDD\uFF0C\u518D\u8F49\u5411\u7409\u7483\u6CCA\u4F4D\uFF1B\u8F03\u9060\u4F46\u8F49\u5411\u7A7A\u9593\u8F03\u5927\u3002","safe",-28,37),Re("inner","\u5357\u9762\u76F4\u63A5\u5C0D\u4F4D","\u5F9E\u7409\u7483\u5357\u65B9\u63A5\u8FD1\u6CCA\u4F4D\uFF0C\u5F8C\u6BB5\u8F03\u77ED\uFF1B\u9760\u8FD1\u7901\u5CB8\u524D\u5148\u6536\u5E06\u3002","direct",0,43)]}}},{id:"green-port-approach",name:"\u9752\u6839\u6CCA\u5916\u8207\u6D41\u7DE3",x:-90,z:-52,radius:22,directions:{west:{destinationIslandId:"mangrove",entry:{x:-66,z:-60,radius:46},options:[Re("outer","\u6CCA\u5916\u5EF6\u9577\u7DDA\u5C0D\u4F4D","\u5148\u7559\u5728\u6CCA\u4F4D\u5EF6\u9577\u7DDA\u7684\u6DF1\u6C34\u5074\uFF0C\u4FDD\u7559\u5CB8\u8DDD\uFF1B\u4ECD\u63A5\u8FD1\u9752\u6839\u6D41\u5E36\uFF0C\u9808\u6BD4\u8F03\u7576\u524D\u5074\u63A8\u8207\u8F03\u9577\u8DEF\u7A0B\u3002","current",-65,-50),Re("inner","\u5CB8\u5916\u76F4\u63A5\u5165\u6E2F","\u76F4\u63A5\u63A5\u8FD1\u9752\u6839\u6771\u5357\u6CCA\u4F4D\uFF0C\u8DEF\u7A0B\u8F03\u77ED\u4E14\u96E2\u6D41\u9053\u4E2D\u5FC3\u8F03\u9060\uFF1B\u9760\u5CB8\u8F49\u5411\u9808\u66F4\u7CBE\u6E96\u3002","safe",-92,-75)]},north:{destinationIslandId:"mangrove",entry:{x:-98,z:-50,radius:25,lateralRadius:20},options:[Re("outer","\u6771\u5074\u6DF1\u6C34\u63A5\u6CCA\u4F4D","\u504F\u6771\u4FDD\u7559\u7D05\u6A39\u5CB8\u8DDD\uFF0C\u518D\u8F49\u5411\u6CCA\u4F4D\uFF1B\u63A5\u8FD1\u6D41\u5E36\uFF0C\u9700\u4FEE\u6B63\u6F6E\u6D41\u5074\u63A8\u3002","current",-80,-58),Re("inner","\u6CBF\u5CB8\u5916\u7DE3\u8FD1\u7DDA","\u6CBF\u7D05\u6A39\u6771\u5357\u5CB8\u5916\u7684\u8FD1\u7DDA\u5165\u6E2F\uFF0C\u8F03\u5C11\u7E5E\u884C\uFF1B\u9808\u5B88\u4F4F\u5CB8\u8DDD\u4E26\u63D0\u524D\u6536\u5E06\u3002","safe",-105,-50)]}}},{id:"coral-port-approach",name:"\u73CA\u745A\u7063\u6CCA\u5916\u5C0D\u4F4D",x:-63,z:67,radius:18,directions:{west:{destinationIslandId:"coral",options:[Re("outer","\u5317\u5074\u6DF1\u6C34\u5C0D\u4F4D","\u5148\u5230\u73CA\u745A\u6CCA\u4F4D\u5317\u5074\u7684\u5EF6\u9577\u7DDA\uFF0C\u518D\u6CBF\u5CB8\u5916\u65B9\u5411\u9032\u6E2F\uFF1B\u8F03\u9060\u4F46\u6709\u66F4\u591A\u8F49\u8235\u7A7A\u9593\u3002","safe",-72,42),Re("inner","\u6771\u5074\u8FD1\u7DDA\u9032\u6E2F","\u7531\u6771\u5074\u8FD1\u7DDA\u76F4\u63A5\u63A5\u8FD1\u73CA\u745A\u6CCA\u4F4D\uFF1B\u8DDD\u96E2\u8F03\u77ED\uFF0C\u6536\u5E06\u5F8C\u518D\u5B8C\u6210\u9760\u5CB8\u8F49\u5411\u3002","direct",-82,64)]}}}],bn=[{id:"coral-crossing",name:"\u73CA\u745A\u5916\u7063\u6D6E\u6A19",x:-48,z:112,note:"\u73CA\u745A\u7063\u8207\u6F6E\u810A\u4E4B\u9593\u7559\u6709\u6DF1\u6C34\u7A7A\u9699\uFF0C\u96E2\u7901\u8D8A\u9060\uFF0C\u8D8A\u5C11\u53D7\u6C34\u4F4D\u9650\u5236\u3002"},{id:"coral-north",name:"\u73CA\u745A\u5317\u7DE3\u6D6E\u6A19",x:-89,z:18,note:"\u6CBF\u5CF6\u5CB8\u5916\u5074\u89C0\u5BDF\uFF0C\u6BD4\u8CBC\u8457\u73CA\u745A\u5CB8\u7DDA\u6025\u8F49\u66F4\u5BB9\u6613\u4FDD\u7559\u8239\u9AD4\u6DE8\u7A7A\u3002"},{id:"root-front",name:"\u7D05\u6A39\u524D\u7063\u6D6E\u6A19",x:-104,z:-30,note:"\u7D05\u6A39\u6839\u7CFB\u8B93\u7D30\u6C99\u6C89\u7A4D\uFF1B\u9760\u8FD1\u6839\u7063\u6642\u5148\u6536\u5E06\uFF0C\u80FD\u770B\u6E05\u6DFA\u7058\u908A\u7DE3\u3002"},{id:"root-stream",name:"\u9752\u6839\u6D41\u7DE3\u6D6E\u6A19",x:-86,z:-34,note:"\u540C\u4E00\u6F6E\u9053\u6703\u96A8\u6F6E\u76F8\u53CD\u5411\uFF1B\u6BD4\u8F03\u6D6E\u6CAB\u8207\u8239\u9996\uFF0C\u624D\u80FD\u5206\u8FA8\u9806\u6D41\u548C\u5074\u6D41\u3002"},{id:"glass-west",name:"\u7409\u7483\u897F\u7DE3\u6D6E\u6A19",x:-62,z:7,note:"\u7901\u5CF6\u897F\u7DE3\u9023\u63A5\u5169\u7247\u68F2\u5730\uFF1B\u7E5E\u5230\u6CCA\u4F4D\u5916\u5074\u5F8C\u518D\u8F49\u5411\uFF0C\u53EF\u4FDD\u7559\u5B89\u5168\u5CB8\u8DDD\u3002"},{id:"glass-approach",name:"\u7409\u7483\u6CCA\u5916\u6D6E\u6A19",x:-24,z:32,note:"\u7409\u7483\u6CCA\u4F4D\u5728\u7901\u5CF6\u5357\u9762\uFF0C\u6CBF\u5CF6\u5357\u5074\u9760\u8FD1\uFF0C\u80FD\u907F\u958B\u7A81\u51FA\u7684\u7901\u5CB8\u3002"},{id:"shoal-west",name:"\u6F6E\u810A\u897F\u5074\u6D6E\u6A19",x:-30,z:112,note:"\u5357\u65B9\u6F6E\u810A\u9732\u51FA\u6642\uFF0C\u897F\u5074\u6DF1\u6C34\u4ECD\u53EF\u901A\u884C\uFF1B\u53D6\u6A23\u4E5F\u80FD\u7528\u4F86\u6BD4\u8F03\u5169\u689D\u822A\u8DEF\u3002"},{id:"shoal-south",name:"\u6F6E\u810A\u8FD1\u7063\u6D6E\u6A19",x:-15,z:62,note:"\u6F6E\u810A\u7684\u53EF\u901A\u6C34\u4F4D\u7531\u7901\u9802\u6C7A\u5B9A\uFF1B\u6F32\u6F6E\u4E0D\u4EE3\u8868\u5DF2\u7D93\u80FD\u8D8A\u7901\uFF0C\u5148\u8B80\u6C34\u4F4D\u6A19\u8A18\u3002"},{id:"white-fork",name:"\u767D\u7FBD\u5206\u6D41\u6D6E\u6A19",x:74,z:135,note:"\u767D\u7FBD\u65CB\u6D41\u4F4D\u5728\u822A\u9053\u6771\u5074\uFF1B\u4FDD\u7559\u5916\u5708\u8DDD\u96E2\uFF0C\u6BD4\u7A7F\u904E\u4E2D\u5FC3\u66F4\u5BB9\u6613\u63A7\u5236\u8F49\u8235\u3002"},{id:"white-inlet",name:"\u767D\u7FBD\u6E2F\u5916\u6D6E\u6A19",x:75,z:68,note:"\u71D5\u9DD7\u6703\u6CBF\u9B5A\u7FA4\u8207\u6D41\u7DE3\u6D3B\u52D5\uFF1B\u89C0\u5BDF\u6D77\u9CE5\u53EF\u4EE5\u88DC\u5145\u6D77\u5716\uFF0C\u4E0D\u80FD\u53D6\u4EE3\u7901\u4F4D\u6A19\u8A18\u3002"},{id:"star-stream",name:"\u661F\u76E4\u5357\u6D41\u6D6E\u6A19",x:65,z:8,note:"\u6771\u5074\u6F6E\u9053\u8207\u897F\u5074\u6F6E\u9053\u65B9\u5411\u76F8\u53CD\uFF1B\u6F6E\u6C50\u9810\u5831\u80FD\u5E6B\u52A9\u9078\u64C7\u4E0B\u4E00\u6BB5\u501F\u6D41\u65B9\u5411\u3002"},{id:"star-gate",name:"\u6F6E\u9580\u6771\u7DE3\u6D6E\u6A19",x:77,z:-44,note:"\u661F\u76E4\u6F6E\u9580\u6771\u908A\u6709\u4E0D\u4F9D\u8CF4\u6C34\u4F4D\u7684\u5ECA\u9053\uFF1B\u501F\u4E2D\u592E\u6D41\u901F\u6642\u9700\u540C\u6642\u7559\u610F\u7901\u5708\u3002"},{id:"north-reef",name:"\u5317\u7901\u5ECA\u9053\u6D6E\u6A19",x:-42,z:-35,note:"\u96E2\u958B\u7409\u7483\u7901\u5411\u5317\u5F8C\uFF0C\u4E2D\u592E\u6DF1\u6C34\u9023\u63A5\u71C8\u5854\uFF1B\u5074\u6D41\u6703\u63A8\u79FB\u8239\u8EAB\uFF0C\u8239\u9996\u4E0D\u7B49\u65BC\u822A\u8DE1\u3002"},{id:"whirl-margin",name:"\u9752\u6839\u65CB\u6D41\u5916\u7DE3\u6D6E\u6A19",x:-35,z:-91,note:"\u65CB\u6D41\u5F37\u5EA6\u5177\u6709\u9031\u671F\uFF0C\u5916\u7DE3\u4ECD\u9700\u4FDD\u7559\u7A7A\u9593\uFF1B\u5B89\u5168\u5ECA\u9053\u5F9E\u65CB\u6D41\u6771\u908A\u7D93\u904E\u3002"},{id:"beacon-water",name:"\u9060\u6F6E\u6DF1\u6C34\u6D6E\u6A19",x:0,z:-145,note:"\u71C8\u5854\u5357\u9762\u7684\u6DF1\u6C34\u662F\u8FD4\u822A\u8F49\u5411\u5340\uFF1B\u5148\u5C0D\u6E96\u4E0B\u4E00\u6BB5\u822A\u8DEF\uFF0C\u518D\u628A\u5E06\u529B\u63D0\u9AD8\u3002"},{id:"beacon-approach",name:"\u5B88\u71C8\u4EBA\u8FCE\u822A\u6D6E\u6A19",x:-7,z:-166,note:"\u71C8\u5854\u6CCA\u4F4D\u671D\u5357\uFF0C\u6536\u5E06\u5F8C\u518D\u9032\u91D1\u8272\u6CCA\u4F4D\uFF1B\u53D6\u6A23\u8207\u9760\u5CB8\u90FD\u9700\u8981\u4F4E\u822A\u901F\u3002"}],Fs=[{id:"west-stream",name:"\u9752\u6839\u6F6E\u9053",x:-50,z:-10,radius:70,dx:.1,dz:-1,strength:.775,phase:0},{id:"east-stream",name:"\u661F\u76E4\u6F6E\u9053",x:70,z:-80,radius:75,dx:-.1,dz:1,strength:.9,phase:Math.PI}],Oi=[{id:"south-shoal",name:"\u5357\u65B9\u6F6E\u810A",x:0,z:92,radius:16,safeHeight:.35},{id:"east-gate",name:"\u661F\u76E4\u6F6E\u9580",x:43,z:-60,radius:15,safeHeight:.05}],or=[{id:"west-whirl",name:"\u9752\u6839\u65CB\u6D41",x:-58,z:-125,radius:20,phase:0,strength:1.625},{id:"east-whirl",name:"\u767D\u7FBD\u65CB\u6D41",x:86,z:115,radius:16,phase:Math.PI,strength:6}],Kn=[{id:"coral-dive",islandId:"coral",name:"\u73CA\u745A\u6DFA\u7063",partId:"prism",partName:"\u805A\u5149\u7A1C\u93E1",discoveryId:"foxfish",entry:{x:-98,z:66},target:{x:-83,z:54},bubbles:[{x:-91,z:60}],radius:26,oxygen:55},{id:"ruin-dive",islandId:"ruin",name:"\u6C89\u9418\u6C34\u5EAD",partId:"gear",partName:"\u6F6E\u9418\u9F52\u8F2A",discoveryId:"tide-clock",entry:{x:99,z:-80},target:{x:83,z:-69},bubbles:[{x:91,z:-74}],radius:26,oxygen:55},{id:"reef-dive",islandId:"reef",name:"\u7409\u7483\u6D1E\u7063",partId:"crystal",partName:"\u71C8\u82AF\u6676\u77F3",discoveryId:"nautilus",entry:{x:0,z:27},target:{x:16,z:40},bubbles:[{x:8,z:33}],radius:26,oxygen:55}];var Xt=(i,e,t)=>Math.max(e,Math.min(t,i)),wt=(i,e)=>Math.hypot(i.x-e.x,i.z-e.z),Vr=i=>kt.find(e=>e.id===i)||kt[0],lr=i=>hi.find(e=>e.id===i)||hi[0],Gr=i=>Kn.find(e=>e.id===i),Je=(i,e,t={})=>({type:i,text:e,...t}),gc=[{label:"\u6F32\u6F6E\u30FB\u9AD8\u6C34\u4F4D",direction:"rising",waterLevel:"high",description:"\u5F9E\u4E2D\u6C34\u4F4D\u6301\u7E8C\u4E0A\u5347\uFF0C\u76F4\u5230\u6700\u9AD8\u6C34\u4F4D\u3002"},{label:"\u9000\u6F6E\u30FB\u9AD8\u6C34\u4F4D",direction:"falling",waterLevel:"high",description:"\u5F9E\u6700\u9AD8\u6C34\u4F4D\u6301\u7E8C\u4E0B\u964D\uFF0C\u76F4\u5230\u4E2D\u6C34\u4F4D\u3002"},{label:"\u9000\u6F6E\u30FB\u4F4E\u6C34\u4F4D",direction:"falling",waterLevel:"low",description:"\u5F9E\u4E2D\u6C34\u4F4D\u6301\u7E8C\u4E0B\u964D\uFF0C\u76F4\u5230\u6700\u4F4E\u6C34\u4F4D\u3002"},{label:"\u6F32\u6F6E\u30FB\u4F4E\u6C34\u4F4D",direction:"rising",waterLevel:"low",description:"\u5F9E\u6700\u4F4E\u6C34\u4F4D\u6301\u7E8C\u4E0A\u5347\uFF0C\u76F4\u5230\u4E2D\u6C34\u4F4D\u3002"}],cu="\u822A\u6D77\u5370\u8A18\u50C5\u4F9B\u6536\u85CF\u8207\u8A18\u9304\u6210\u5C31\uFF0C\u6C92\u6709\u8CFC\u8CB7\u7528\u9014\uFF1B\u6240\u6709\u5E06\u88DD\u8207\u4FEE\u5FA9\u7686\u514D\u8CBB\u3002",Rt=(i,e=0)=>Number.isFinite(i)?i:e,du=i=>1+((Math.trunc(Rt(Number(i),1))-1)%16+16)%16,ar=(i,e)=>i.includes(e)?!1:(i.push(e),!0);function Os(i=1){let e=Vr("harbor").dock;return{schemaVersion:1,seed:du(i),time:0,elapsed:0,mode:"harbor",boat:{...e,heading:0,sail:0,hull:100,speed:0},rigId:"steady",contractId:"coral-survey",currentIsland:"harbor",lastSafeIsland:"harbor",discoveries:[],parts:[],completed:[],cargo:[],lighthouseFixed:!1,storyComplete:!1,oxygen:55,diver:{...e},activeDive:null,diveCollected:!1,credits:0,records:{bestTime:null,bestDamage:null,voyages:0,rescues:0,byContract:{}},voyage:{active:!1,startedAt:0,elapsed:0,damage:0,harvested:[],observed:[],skippedObservations:[],visited:[],rescued:!1,legIndex:-1,routeChoices:[],navigation:null},result:null,contactCooldown:0,warningCooldown:0,lowHullWarned:!1}}function dn(i){let e=(Rt(i)%240+240)%240,t=240/4,n=Math.floor(e/t),r=t-e%t;return{height:Math.sin(e/240*Math.PI*2),...gc[n],nextLabel:gc[(n+1)%4].label,secondsToChange:r,forecastHorizon:r+t*2,forecast:[1,2].map(s=>({...gc[(n+s)%4],startsIn:r+t*(s-1),secondsUntil:r+t*(s-1),duration:t,height:Math.sin((n+s)*Math.PI/2)}))}}function ki(i,e,t,n=1){let r=0,s=0,o=.88+du(n)*.015;for(let a of Fs){let l=Math.hypot(i-a.x,e-a.z);if(l>=a.radius)continue;let c=Math.sin(t/240*Math.PI*2+a.phase),h=(1-l/a.radius)*a.strength*c*o;r+=a.dx*h,s+=a.dz*h}for(let a of or){if(!fu(a,t))continue;let l=i-a.x,c=e-a.z,h=Math.hypot(l,c);if(h<.01||h>=a.radius)continue;let u=(1-h/a.radius)*a.strength;r+=(-c/h-l/h*.18)*u,s+=(l/h-c/h*.18)*u}return{x:r,z:s,dx:r,dz:s,strength:Math.hypot(r,s)}}function fu(i,e){return Math.sin(e/240*Math.PI*2+i.phase)>.25}function zi(i,e=i.contractId){let t=Nt.find(a=>a.id===e);if(!t)return{contractId:e,objectives:[],completedCount:0,total:0,readyToDeliver:!1,alreadyDelivered:!1,nextObjective:null};let n=i.voyage.observed||i.voyage.harvested||[],r=t.objectives.map(a=>({...a,islandName:Vr(a.islandId).name,done:n.includes(a.discoveryId)})),s=r.filter(a=>a.done).length,o=r.find(a=>!a.done)||{kind:"return",islandId:"harbor",islandName:Vr("harbor").name,name:"\u8FD4\u56DE\u6F6E\u97F3\u6E2F\u4EA4\u4ED8",done:!1};return{contractId:t.id,objectives:r,completedCount:s,total:r.length,readyToDeliver:s===r.length,alreadyDelivered:i.completed.includes(t.id),nextObjective:o}}function ui(i){let e=i.voyage.navigation;return i.mode!=="sailing"||!e||e.legIndex!==i.voyage.legIndex||!e.waypoints[e.index]?null:{...e,target:e.waypoints[e.index],remaining:e.waypoints.length-e.index}}function mp(i,e,t){return e.directions[t].options.map(n=>{let r=i.boat,s=0,o=0,a=0;for(let h of n.waypoints){let u=wt(r,h),d=Math.atan2(h.x-r.x,-(h.z-r.z)),f=-Math.PI/4+(i.seed-1)*.035,m=.52+.48*(Math.cos(d-f)+1)/2,v=ki((r.x+h.x)/2,(r.z+h.z)/2,i.time,i.seed),g=v.x*Math.sin(d)-v.z*Math.cos(d);s+=u,a+=g*u,o+=u/Math.max(.5,lr(i.rigId).speed*m+g),r=h}let l=s?a/s:0,c=Math.abs(l)<.04?"\u6B64\u6BB5\u6D41\u529B\u8F03\u5F31\uFF1B\u6BD4\u8F03\u8DDD\u96E2\u3001\u56FA\u5B9A\u98A8\u89D2\u8207\u96E2\u5CB8\u7A7A\u9593\u3002":`${l>0?"\u76EE\u524D\u5927\u81F4\u9806\u6D41":"\u76EE\u524D\u5927\u81F4\u9006\u6D41"}\uFF08\u6CBF\u822A\u8DEF\u7D04 ${Math.abs(l).toFixed(2)} m/s\uFF09\uFF1B\u6F6E\u76F8\u8B8A\u5316\u5F8C\u53D6\u6368\u6703\u6539\u8B8A\u3002`;return{...n,available:!0,condition:c,distanceMetres:Math.round(s),estimatedSeconds:Math.round(o),alongCurrent:l}})}function gp(i,e){for(let t of e){let n=t.x-i.x,r=t.z-i.z,s=n*n+r*r;for(let o of[...kt.map(a=>({...a,clearance:a.radius+7})),...Oi.map(a=>({...a,clearance:a.radius+1})),...or.map(a=>({...a,clearance:a.radius+1}))]){let a=s?Xt(((o.x-i.x)*n+(o.z-i.z)*r)/s,0,1):0;if(Math.hypot(o.x-i.x-a*n,o.z-i.z-a*r)<o.clearance-1e-6)return!1}i=t}return!0}var Qo=i=>i&&Number.isFinite(i.x)&&Number.isFinite(i.z)&&Number.isFinite(i.radius)&&i.radius>0,_c=i=>Array.isArray(i)&&i.length>=2&&i.every(e=>e&&typeof e.id=="string"&&Array.isArray(e.waypoints)&&e.waypoints.length&&e.waypoints.every(t=>t&&Number.isFinite(t.x)&&Number.isFinite(t.z)));function ea(i,e){let t=i.voyage.routeChoices?.at(-1);if(i.mode!=="sailing"||ui(i)&&t&&i.time-t.time<18)return null;let n={x:Math.sin(i.boat.heading),z:-Math.cos(i.boat.heading)};return Ns.flatMap(r=>Object.entries(r.directions).flatMap(([s,o])=>{let a=Object.hasOwn(Us,s)&&Us[s],l=Number.isFinite(o?.minForwardDot)&&o.minForwardDot>=0&&o.minForwardDot<=1?o.minForwardDot:.2;return!a||!o||!_c(o.options)||n.x*a.x+n.z*a.z<l?[]:[Qo(o.entry)?o.entry:r,...Array.isArray(o.entries)?o.entries.filter(Qo):[]].flatMap((h,u)=>{let d=typeof h.destinationIslandId=="string"?h.destinationIslandId:o.destinationIslandId,f=kt.find(T=>T.id===d);if(f&&Number.isFinite(h.maxDestinationDistance)&&h.maxDestinationDistance>0&&wt(i.boat,f.dock)>h.maxDestinationDistance)return[];let m=i.boat.x-h.x,v=i.boat.z-h.z,g=m*a.x+v*a.z,p=m*a.z-v*a.x,E=Number.isFinite(h.lateralRadius)&&h.lateralRadius>0?h.lateralRadius:h.radius,b=Math.hypot(g/h.radius,p/E)<=1,y=_c(h.options)?h.options:o.options;return[{...r,directions:{...r.directions,[s]:{...o,destinationIslandId:d,options:y}},x:h.x,z:h.z,radius:h.radius,direction:s,entryIndex:u,axis:a,withinEntry:b,distance:wt(i.boat,h)}]})})).filter(r=>(Number.isFinite(e)&&e>0?r.distance<=e:r.withinEntry)&&(i.boat.x-r.x)*r.axis.x+(i.boat.z-r.z)*r.axis.z<=2&&r.directions[r.direction].options.every(s=>gp(i.boat,s.waypoints))&&!(i.voyage.routeChoices||[]).some(s=>s.id===r.id&&s.legIndex===i.voyage.legIndex)).sort((r,s)=>r.distance-s.distance).map(r=>({...r,options:mp(i,r,r.direction)}))[0]||null}function pu(i,e){if(typeof e!="string"||!Object.hasOwn(Us,e)||!Object.hasOwn(i.directions,e))return[];let t=i.directions[e];return[Qo(t.entry)?t.entry:i,...Array.isArray(t.entries)?t.entries.filter(Qo):[]].map(n=>_c(n.options)?n.options:t.options)}function xp(i){if(!i)return!1;let e=Ns.find(r=>r.id===i.id);if(!e)return!1;let t=pu(e,i.direction),n=Object.hasOwn(i,"entryIndex")?i.entryIndex:0;return Number.isInteger(n)&&n>=0&&!!t[n]?.some(r=>r.id===i.optionId)}function _p(i,e){if(!i||!Number.isInteger(i.legIndex)||i.legIndex!==e.legIndex||!Number.isInteger(i.index)||i.index<0)return null;let t=Ns.find(c=>c.id===i.choiceId);if(!t)return null;let n=e.routeChoices.find(c=>c.id===t.id&&c.optionId===i.optionId&&c.legIndex===i.legIndex);if(!n)return null;let r=!Object.hasOwn(i,"direction")&&!Object.hasOwn(i,"entryIndex"),s=r?n.direction:i.direction;if(s!==n.direction)return null;let o=pu(t,s),a=i.entryIndex;if(r){let c=o.map((h,u)=>({option:h.find(d=>d.id===i.optionId),index:u})).filter(({option:h})=>h&&Array.isArray(i.waypoints)&&i.waypoints.length===h.waypoints.length&&i.waypoints.every((u,d)=>u&&Number.isFinite(u.x)&&Number.isFinite(u.z)&&u.x===h.waypoints[d].x&&u.z===h.waypoints[d].z));if(!c.length)return null;a=c[0].index}if(!Number.isInteger(a)||a<0||!r&&a!==n.entryIndex)return null;let l=o[a]?.find(c=>c.id===i.optionId);return!l||i.index>=l.waypoints.length?null:{choiceId:t.id,optionId:l.id,direction:s,entryIndex:a,label:l.label,waypoints:l.waypoints.map(c=>({x:c.x,z:c.z})),index:i.index,legIndex:i.legIndex}}function mu(i,e,t){let n=ea(i);if(!n||n.id!==e)return[Je("info","\u9760\u8FD1\u524D\u65B9\u5C0E\u822A\u9580\uFF0C\u518D\u6BD4\u8F03\u5169\u689D\u53EF\u884C\u652F\u8DEF\u3002")];let r=n.options.find(s=>s.id===t&&s.available);return r?(i.voyage.routeChoices||=[],i.voyage.routeChoices.push({id:n.id,choiceId:n.id,direction:n.direction,entryIndex:n.entryIndex??0,optionId:t,time:i.time,tideHeight:dn(i.time).height,cargoCount:i.cargo.length,legIndex:i.voyage.legIndex}),i.voyage.navigation={choiceId:n.id,optionId:t,direction:n.direction,entryIndex:n.entryIndex??0,label:r.label,waypoints:r.waypoints.map(s=>({...s})),index:0,legIndex:i.voyage.legIndex},[Je("route-choice",`\u5DF2\u9078${r.label}\u3002${r.condition} \u8ACB\u624B\u52D5\u99DB\u5411\u85CD\u8272\u822A\u8DEF\u9EDE\uFF1B\u96A8\u6642\u53EF\u53D6\u6D88\u5F15\u5C0E\u3002`,{choiceId:n.id,optionId:t})]):[Je("info","\u8ACB\u9078\u64C7\u9019\u500B\u5C0E\u822A\u9580\u63D0\u4F9B\u7684\u822A\u8DEF\u3002")]}function gu(i){return i.voyage.navigation=null,[Je("route-cancelled","\u5DF2\u53D6\u6D88\u8DEF\u9EDE\u5F15\u5C0E\uFF0C\u4FDD\u7559\u9019\u6B21\u9078\u8DEF\u7D00\u9304\uFF1B\u53EF\u624B\u52D5\u822A\u884C\u4E26\u5728\u4E0B\u4E00\u500B\u9580\u91CD\u65B0\u9078\u8DEF\u3002")]}function xu(i,e=45,{includeSkipped:t=!1}={}){return i.mode!=="sailing"?null:bn.map(n=>({...n,distance:wt(i.boat,n)})).filter(n=>n.distance<=e&&!i.voyage.harvested.includes(`observation:${n.id}`)&&(t||!i.voyage.skippedObservations?.includes(n.id))).sort((n,r)=>n.distance-r.distance)[0]||null}function _u(i,e){let t=bn.find(n=>n.id===e);return i.mode!=="sailing"||!t||wt(i.boat,t)>45||i.voyage.harvested.includes(`observation:${e}`)?[Je("info","\u9760\u8FD1\u5C1A\u672A\u53D6\u6A23\u7684\u89C0\u6E2C\u6D6E\u6A19\uFF0C\u624D\u80FD\u9078\u64C7\u7E7C\u7E8C\u76F4\u822A\u3002")]:(i.voyage.skippedObservations||=[],ar(i.voyage.skippedObservations,e),[Je("observation-skipped",`\u5DF2\u8A18\u9304\u76F4\u822A\u9078\u64C7\uFF1A\u7565\u904E${t.name}\uFF0C\u4FDD\u7559\u6642\u9593\u8207\u8CA8\u8259\u3002\u7A0D\u5F8C\u4ECD\u53EF\u8FD4\u56DE\u53D6\u6A23\u3002`,{observationId:e})])}function vc(i,e=xu(i,9,{includeSkipped:!0})?.id){let t=bn.find(r=>r.id===e);if(i.mode!=="sailing"||!t||wt(i.boat,t)>9)return[Je("info","\u9032\u5165\u89C0\u6E2C\u6D6E\u6A19 9 \u516C\u5C3A\u5167\u4E26\u6536\u5E06\uFF0C\u6309 E \u53D6\u6A23\u3002")];let n=`observation:${e}`;return i.voyage.harvested.includes(n)?[Je("info","\u9019\u5EA7\u6D6E\u6A19\u672C\u8D9F\u5DF2\u53D6\u6A23\uFF1B\u53EF\u7E7C\u7E8C\u76F4\u822A\u3002")]:i.boat.speed>1.4?[Je("info","\u53D6\u6A23\u9700\u8981\u4F4E\u822A\u901F\uFF1A\u5148\u6309\u7A7A\u767D\u9375\u6536\u5E06\uFF0C\u518D\u6309 E\u3002")]:i.cargo.length>=lr(i.rigId).capacity?[Je("info","\u8CA8\u8259\u5DF2\u6EFF\uFF0C\u9019\u5EA7\u6D6E\u6A19\u5C1A\u672A\u6D88\u8017\uFF1B\u8FD4\u6E2F\u4EA4\u4ED8\u5F8C\u518D\u4F86\uFF0C\u6216\u7E7C\u7E8C\u76F4\u822A\u3002")]:(i.cargo.push(n),i.voyage.harvested.push(n),[Je("observation",`\u5DF2\u53D6\u6A23${t.name}\u3002${t.note} \u666E\u901A\u8CA8\u7269 1 \u4EF6\uFF0C\u8FD4\u6E2F\u53EF\u5F97 3 \u822A\u6D77\u5370\u8A18\u3002`,{observationId:e})])}function yc(i,e=i.contractId,t=i.rigId){if(!["harbor","island","result"].includes(i.mode))return[Je("info","\u8ACB\u5148\u9760\u6E2F\uFF0C\u518D\u898F\u5283\u4E0B\u4E00\u6BB5\u822A\u7A0B\u3002")];i.currentIsland==="harbor"?(Nt.some(s=>s.id===e)&&(i.contractId=e),hi.some(s=>s.id===t)&&(i.rigId=t),i.boat.hull=100,i.lowHullWarned=!1,i.voyage={active:!0,startedAt:i.time,elapsed:0,damage:0,harvested:[],observed:[],skippedObservations:[],visited:["harbor"],rescued:!1,legIndex:0,routeChoices:[],navigation:null},i.elapsed=0):i.voyage.active||(i.voyage.active=!0),i.currentIsland!=="harbor"&&(i.voyage.legIndex=(i.voyage.legIndex??-1)+1),i.voyage.navigation=null;let n=Vr(i.currentIsland||i.lastSafeIsland);i.boat.x=n.dock.x,i.boat.z=n.dock.z,i.boat.heading=Math.atan2(n.dock.x-n.x,-(n.dock.z-n.z));let r=Math.max(0,n.radius+8-wt(n,n.dock));return r>0&&(i.boat.x+=Math.sin(i.boat.heading)*r,i.boat.z-=Math.cos(i.boat.heading)*r),i.boat.sail=0,i.boat.speed=0,i.mode="sailing",i.currentIsland=null,i.activeDive=null,i.result=null,i.contactCooldown=0,[Je("depart",`\u96E2\u958B${n.name}\u3002\u8239\u982D\u5DF2\u671D\u5916\u6D77\uFF0C\u5148\u6309 W \u76F4\u884C\u96E2\u5CB8\uFF0C\u518D\u8F49\u5411\u76EE\u7684\u5730\uFF1B\u9760\u6E2F\u524D\u6309\u7A7A\u767D\u9375\u6536\u5E06\u3002`)]}function bc(i,e){i.voyage.navigation=null,i.boat.x=e.dock.x,i.boat.z=e.dock.z,i.boat.speed=0,i.boat.sail=0,i.currentIsland=e.id,i.lastSafeIsland=e.id,i.activeDive=null,i.diver={...e.dock},i.oxygen=55}function hu(i){if(i.mode==="diving")return[Je("info","\u5148\u6309\u300C\u6D6E\u51FA\u56DE\u8239\u300D\uFF0C\u5C31\u80FD\u5B89\u5168\u9760\u6E2F\u3002")];let e=[...kt].sort((l,c)=>wt(i.boat,l.dock)-wt(i.boat,c.dock))[0];if(wt(i.boat,e.dock)>13)return[Je("info","\u9760\u8FD1\u91D1\u8272\u6CCA\u4F4D\u6A19\u8A18\uFF0C\u518D\u6309 E \u9760\u5CB8\u3002")];if(i.boat.speed>1.4)return[Je("info","\u822A\u901F\u592A\u5FEB\uFF1A\u6309\u7A7A\u767D\u9375\u5FEB\u901F\u6536\u5E06\uFF0C\u518D\u6309 E \u9760\u5CB8\u3002")];bc(i,e),i.boat.hull=100,i.lowHullWarned=!1,ar(i.voyage.visited,e.id),i.mode=e.id==="harbor"?"harbor":"island";let t=[Je("dock",`\u5DF2\u9760\u5CB8${e.name}\uFF0C\u8239\u9AD4\u514D\u8CBB\u4FEE\u5FA9\u3002${e.id==="harbor"?"\u53EF\u91CD\u65B0\u9078\u64C7\u59D4\u8A17\u3001\u5E06\u88DD\u8207\u6F6E\u6C50\u3002":"\u6309 E \u8ABF\u67E5\uFF1B\u53EF\u518D\u51FA\u767C\u6216\u5C55\u958B\u6DFA\u6C34\u63A2\u7D22\u3002"}`,{islandId:e.id})];if(e.id!=="harbor"||!i.voyage.active)return t;let n=Nt.find(l=>l.id===i.contractId),r=n&&zi(i).readyToDeliver&&!i.completed.includes(n.id);r&&(i.completed.push(n.id),i.credits+=n.reward,t.push(Je("delivery",`\u59D4\u8A17\u5B8C\u6210\uFF1A${n.name}\uFF0C\u7372\u5F97 ${n.reward} \u822A\u6D77\u5370\u8A18\u3002${cu}`,{contractId:n.id,reward:n.reward})));let s=i.cargo.length*3;if(i.credits+=s,i.cargo=[],i.voyage.visited.some(l=>l!=="harbor")&&(i.records.voyages+=1,i.voyage.rescued||(i.records.bestTime=i.records.bestTime===null?i.voyage.elapsed:Math.min(i.records.bestTime,i.voyage.elapsed),i.records.bestDamage=i.records.bestDamage===null?i.voyage.damage:Math.min(i.records.bestDamage,i.voyage.damage))),n&&zi(i).readyToDeliver&&!i.voyage.rescued){i.records.byContract||={};let l=i.records.byContract[n.id];i.records.byContract[n.id]={bestTime:l?Math.min(l.bestTime,i.voyage.elapsed):i.voyage.elapsed,bestDamage:l?Math.min(l.bestDamage,i.voyage.damage):i.voyage.damage,voyages:(l?.voyages||0)+1}}let a=i.lighthouseFixed&&!i.storyComplete;return a&&(i.storyComplete=!0,t.push(Je("ending","\u9060\u6F6E\u71C8\u5854\u91CD\u71C3\uFF0C\u6E2F\u53E3\u70BA\u4F60\u7684\u5B8C\u6574\u8FD4\u822A\u4EAE\u8D77\u6B61\u8FCE\u71C8\uFF01\u6545\u4E8B\u5B8C\u6210\uFF0C\u81EA\u7531\u822A\u7A0B\u5DF2\u958B\u653E\u3002"))),i.result={title:a?"\u71C8\u706B\u91CD\u9022\uFF0C\u6B61\u8FCE\u56DE\u5BB6":r?"\u59D4\u8A17\u5B8C\u6210":"\u5E73\u5B89\u8FD4\u822A",text:a?"\u4E09\u4EF6\u96F6\u4EF6\u91CD\u65B0\u9023\u8D77\u4E03\u5CF6\u3002\u7E7C\u7E8C\u81EA\u7531\u822A\u884C\uFF0C\u5B8C\u6210\u5168\u5716\u9451\u3001\u516D\u4EFD\u59D4\u8A17\uFF0C\u6311\u6230\u66F4\u5FEB\u4E14\u7121\u640D\u7684\u822A\u7DDA\u3002":r?`${n.name}\u5DF2\u4EA4\u4ED8\u3002\u4F60\u7684\u6D77\u5716\u4FDD\u5B58\u4E86\u9019\u6B21\u767C\u73FE\uFF1B\u53EF\u9078\u4E0B\u4E00\u4EFD\u59D4\u8A17\u6216\u91CD\u8D70\u822A\u7DDA\u6311\u6230\u7D00\u9304\u3002`:n&&!zi(i).readyToDeliver?"\u672C\u8D9F\u59D4\u8A17\u672A\u5B8C\u6210\uFF1B\u4E0B\u8D9F\u9700\u91CD\u65B0\u5B8C\u6210\u8ABF\u67E5\u6E05\u55AE\uFF0C\u5716\u9451\u8207\u96F6\u4EF6\u4FDD\u7559\u3002\u6240\u6709\u4FEE\u5FA9\u514D\u8CBB\u3002":"\u672C\u8D9F\u5B8C\u6574\u8ABF\u67E5\u5DF2\u5B8C\u6210\uFF0C\u59D4\u8A17\u734E\u52F5\u4E0D\u91CD\u767C\uFF1B\u53EF\u6BD4\u8F03\u672C\u59D4\u8A17\u7D00\u9304\u3002\u5716\u9451\u8207\u4E3B\u7DDA\u96F6\u4EF6\u5DF2\u4FDD\u5B58\u3002",elapsed:i.voyage.elapsed,damage:i.voyage.damage,reward:(r?n.reward:0)+s,creditsDescription:cu,discoveries:i.discoveries.length,parts:i.parts.length,rescued:i.voyage.rescued},i.mode="result",i.voyage.active=!1,t}function uu(i,e,t){let n=yn.find(s=>s.id===e);if(!n)return;i.voyage.observed||=[];let r=ar(i.voyage.observed,e);ar(i.discoveries,e)?t.push(Je("discovery",`\u5716\u9451\u65B0\u589E\uFF1A${n.name}\u3002${n.description}`,{discoveryId:e})):r&&t.push(Je("observation",`\u672C\u8D9F\u5DF2\u518D\u6B21\u8ABF\u67E5\uFF1A${n.name}\u3002${n.description}`,{discoveryId:e})),!i.voyage.harvested.includes(e)&&i.cargo.length<lr(i.rigId).capacity?(ar(i.cargo,e),ar(i.voyage.harvested,e)):r&&i.cargo.length>=lr(i.rigId).capacity&&t.push(Je("info","\u8ABF\u67E5\u8207\u59D4\u8A17\u9032\u5EA6\u5DF2\u8A18\u9304\uFF1B\u8CA8\u8259\u5DF2\u6EFF\uFF0C\u9019\u6B21\u4E0D\u589E\u52A0\u666E\u901A\u8CA8\u7269\u3002\u4E3B\u7DDA\u96F6\u4EF6\u4ECD\u53EF\u53D6\u5F97\u3002"))}function Mc(i){if(i.mode==="sailing"){if(kt.some(r=>wt(i.boat,r.dock)<=13))return hu(i);let n=xu(i,9,{includeSkipped:!0});return n?vc(i,n.id):hu(i)}if(i.mode==="diving"){let n=Gr(i.activeDive);if(!n)return ta(i);if(wt(i.diver,n.target)>4.5)return[Je("info","\u6CBF\u767C\u5149\u8DEF\u6A19\u6E38\u5411\u91D1\u8272\u76EE\u6A19\uFF0C\u9760\u8FD1\u5F8C\u6309 E\uFF1B\u6C23\u6CE1\u53EF\u88DC\u5145\u6C27\u6C23\u3002")];let r=[];return uu(i,n.discoveryId,r),ar(i.parts,n.partId)&&r.push(Je("part",`\u53D6\u5F97\u71C8\u5854\u96F6\u4EF6\uFF1A${n.partName}\uFF08${i.parts.length}/3\uFF09\u3002\u4E3B\u7DDA\u96F6\u4EF6\u5728\u6551\u63F4\u8207\u91CD\u8F09\u5F8C\u90FD\u6703\u4FDD\u7559\u3002`,{partId:n.partId})),i.diveCollected=!0,r.length||r.push(Je("info","\u9019\u7247\u6DFA\u7063\u5DF2\u5B8C\u6210\u8ABF\u67E5\u3002\u53EF\u56DE\u5230\u8239\u65C1\uFF0C\u6216\u6309\u300C\u6D6E\u51FA\u56DE\u8239\u300D\u3002")),r}if(i.mode==="harbor"||i.mode==="result"&&i.currentIsland==="harbor")return[Je("info","\u9078\u64C7\u59D4\u8A17\u8207\u5E06\u88DD\uFF0C\u518D\u6309\u300C\u63DA\u5E06\u51FA\u6E2F\u300D\u3002\u5148\u770B\u6D77\u5716\u8207\u672A\u4F86\u5169\u6BB5\u6F6E\u6C50\u3002")];if(i.mode!=="island")return[];let e=Vr(i.currentIsland),t=[];for(let n of e.discoveries)yn.find(r=>r.id===n)?.diveSiteId||uu(i,n,t);return e.id==="lighthouse"&&(i.parts.length===Kn.length&&!i.lighthouseFixed?(i.lighthouseFixed=!0,t.push(Je("lighthouse","\u4E09\u4EF6\u96F6\u4EF6\u5D4C\u5165\u71C8\u5854\uFF0C\u5149\u675F\u91CD\u8FD4\u6D77\u9762\uFF01\u6700\u5F8C\u4E00\u6B65\uFF1A\u99DB\u56DE\u6F6E\u97F3\u6E2F\u5B8C\u6210\u8FD4\u822A\u6176\u795D\u3002"))):i.lighthouseFixed||t.push(Je("info",`\u71C8\u5854\u9084\u9700\u8981 ${3-i.parts.length} \u4EF6\u96F6\u4EF6\u3002\u73CA\u745A\u7063\u3001\u661F\u76E4\u5CF6\u8207\u7409\u7483\u7901\u7684\u6DFA\u7063\u5404\u85CF\u6709\u4E00\u4EF6\u3002`))),t.length||t.push(Je("info",`${e.name}\u7684\u5CB8\u4E0A\u8ABF\u67E5\u5DF2\u5B8C\u6210\u3002${e.diveSiteId?"\u9019\u88E1\u9084\u6709\u6DFA\u6C34\u63A2\u7D22\u9EDE\u3002":"\u53EF\u4EE5\u524D\u5F80\u4E0B\u4E00\u5EA7\u5CF6\uFF0C\u6216\u56DE\u6BCD\u6E2F\u4EA4\u4ED8\u3002"}`)),t}function vu(i,e){let t=Gr(e);return i.mode!=="island"||!t||t.islandId!==i.currentIsland?[Je("info","\u8ACB\u5148\u9760\u5CB8\u5230\u8A72\u6DFA\u6C34\u9EDE\u6240\u5728\u5CF6\u5DBC\u3002")]:(i.activeDive=t.id,i.mode="diving",i.oxygen=t.oxygen,i.diver={...t.entry},i.diveCollected=i.parts.includes(t.partId),[Je("dive",`${t.name}\uFF1A\u65B9\u5411\u9375\uFF0FWASD \u6E38\u52D5\uFF0C\u9760\u8FD1\u91D1\u8272\u76EE\u6A19\u6309 E\uFF1B\u6C23\u6CE1\u88DC\u6C27\uFF0C\u96A8\u6642\u53EF\u6D6E\u51FA\u56DE\u8239\u3002`)])}function ta(i){if(i.mode!=="diving")return[];let e=Gr(i.activeDive);return i.mode="island",i.voyage.navigation=null,i.currentIsland=e?.islandId||i.lastSafeIsland,i.activeDive=null,i.oxygen=55,i.diver={x:i.boat.x,z:i.boat.z},[Je("surface","\u5DF2\u5B89\u5168\u56DE\u8239\u3002\u5716\u9451\u8207\u96F6\u4EF6\u5DF2\u4FDD\u5B58\uFF1B\u53EF\u91CD\u65B0\u6F5B\u6C34\u6216\u7E7C\u7E8C\u822A\u884C\u3002")]}function na(i,e="\u8239\u9AD4\u53D7\u640D"){let t=i.mode==="diving"?i.diver:i.boat,n=[...kt].sort((s,o)=>wt(t,s.dock)-wt(t,o.dock))[0],r=Math.ceil(i.cargo.length/2);return i.cargo=i.cargo.slice(r),bc(i,n),i.boat.hull=100,i.lowHullWarned=!1,i.voyage.rescued=!0,i.records.rescues+=1,i.mode=n.id==="harbor"?"harbor":"island",i.result=null,i.contactCooldown=2,[Je("rescue",`${e}\uFF0C\u6551\u63F4\u8239\u5DF2\u9001\u4F60\u56DE${n.name}\u3002\u666E\u901A\u8CA8\u7269\u640D\u5931 ${r} \u4EF6\uFF1B\u5716\u9451\u3001\u96F6\u4EF6\u8207\u5DF2\u4EA4\u4ED8\u734E\u52F5\u5168\u90E8\u4FDD\u7559\u3002\u8239\u5DF2\u514D\u8CBB\u4FEE\u5FA9\uFF0C\u53EF\u4EE5\u7ACB\u5373\u518D\u51FA\u767C\u3002`,{islandId:n.id,lost:r})]}function xc(i,e,t,n){if(i.contactCooldown>0)return;let r=Math.min(i.boat.hull,e);if(i.boat.hull-=r,i.voyage.damage+=r,i.contactCooldown=1.2,n.push(Je("damage",t)),i.boat.hull<=0)n.push(...na(i,"\u8239\u9AD4\u5931\u53BB\u6D6E\u529B"));else if(i.boat.hull<25&&!i.lowHullWarned){i.lowHullWarned=!0;let s=[...kt].sort((o,a)=>wt(i.boat,o.dock)-wt(i.boat,a.dock))[0];n.push(Je("warning",`\u8239\u9AD4\u4F4E\u65BC 25%\uFF01\u6700\u8FD1\u5B89\u5168\u6E2F\u662F${s.name}\uFF0C\u9760\u5CB8\u5373\u53EF\u514D\u8CBB\u4FEE\u5FA9\u3002`))}}function vp(){let i=null,e=null,t=null,n=!1,r=!1,s=0,o=0;function a(){e=null,t=null}function l(f,m,v){if(n||!m||i===null||e===null||t!==v||!Number.isFinite(f)||f<i){a();return}e=f}function c(f,m,v){let g=i,p=g===null?NaN:(f-g)/1e3;if(!Number.isFinite(f))return i=null,a(),{raw:NaN,dt:0};if(i=f,n||!m)return a(),{raw:p,dt:0};if(g===null||!Number.isFinite(p)||p<=0||p>.5||e===null||t!==v)return e=f,t=v,{raw:p,dt:0};if(f<e)return{raw:p,dt:0};let E=(f-e)/1e3;return e=f,t=v,{raw:p,dt:Number.isFinite(E)&&E>=0&&E<=p?Math.min(.4,E):0}}function h(){if(r)throw Error("clock-reentrant");r=!0,s=0,o=0}function u(f){if(r){if(!Number.isFinite(f)||f<0||f>.05||o>=8||s+f>.400000000000001)throw Error("clock-budget");s+=f,o++}}function d(){if(!r)throw Error("clock-collector");return r=!1,s}return Object.freeze({reset:a,input:l,frame:c,begin:h,consume:u,end:d,dispose(){n=!0,a()},isDisposed:()=>n})}var On=vp();function yu(i,e,t={}){let n=i.mode,r=[],s=Xt(Rt(e),0,30);if(s===0)return r;let o=Math.ceil(s/.05),a=s/o,l=dn(i.time).label,c=Math.floor((i.time+30)/(240/4));for(let h=0;h<o&&!(i.mode!==n||!["sailing","diving"].includes(i.mode));h+=1){if(On.consume(a),i.time+=a,i.contactCooldown=Math.max(0,i.contactCooldown-a),i.warningCooldown=Math.max(0,i.warningCooldown-a),i.voyage.active&&(i.voyage.elapsed+=a,i.elapsed=i.voyage.elapsed),i.mode==="diving"){let b=Gr(i.activeDive);if(!b){r.push(...ta(i));continue}let y=Xt(Rt(t.diveX),-1,1),T=Xt(Rt(t.diveZ),-1,1),A=Math.hypot(y,T);A>1&&(y/=A,T/=A),i.diver.x+=y*a*2,i.diver.z+=T*a*2;let C=wt(i.diver,b.entry);C>b.radius&&(i.diver.x=b.entry.x+(i.diver.x-b.entry.x)/C*b.radius,i.diver.z=b.entry.z+(i.diver.z-b.entry.z)/C*b.radius),i.oxygen-=a,b.bubbles.some(D=>wt(i.diver,D)<3.5)&&(i.oxygen=Math.min(b.oxygen,i.oxygen+a*7),i.warningCooldown===0&&(r.push(Je("bubble","\u6C23\u6CE1\u6B63\u5728\u88DC\u5145\u6C27\u6C23\u3002")),i.warningCooldown=5)),i.oxygen<12&&i.warningCooldown===0&&(r.push(Je("warning","\u6C27\u6C23\u4E0D\u8DB3\uFF1A\u9760\u8FD1\u6C23\u6CE1\u6216\u7ACB\u5373\u6309\u300C\u6D6E\u51FA\u56DE\u8239\u300D\u3002")),i.warningCooldown=8),i.oxygen<=0&&r.push(...na(i,"\u6F5B\u6C34\u6C27\u6C23\u8017\u76E1"));continue}if(i.mode!=="sailing")continue;let u=i.boat,d=lr(i.rigId);u.sail=t.brake?Math.max(0,u.sail-a*4):Xt(u.sail+Rt(t.sailDelta)*a*.65,0,1),u.heading+=Xt(Rt(t.turn),-1,1)*d.handling*a*(.45+.55*Math.min(1,u.speed/d.speed)),u.heading=Math.atan2(Math.sin(u.heading),Math.cos(u.heading));let f=-Math.PI/4+(i.seed-1)*.035,m=.52+.48*(Math.cos(u.heading-f)+1)/2,v=d.speed*u.sail*m;u.speed+=(v-u.speed)*Math.min(1,a*(t.brake?5:1.35));let g=ki(u.x,u.z,i.time,i.seed);u.x+=(Math.sin(u.heading)*u.speed+g.x)*a,u.z+=(-Math.cos(u.heading)*u.speed+g.z)*a;for(let b of kt){let y=wt(u,b),T=b.radius+7;if(y>=T)continue;let A=y>.001?(u.x-b.x)/y:0,C=y>.001?(u.z-b.z)/y:-1;if(u.x=b.x+A*T,u.z=b.z+C*T,u.speed*=.35,xc(i,8,`\u64E6\u78B0${b.name}\u5CB8\u7DDA\uFF0C\u8239\u9AD4\u53D7\u640D\u3002\u6CBF\u5CB8\u5916\u5074\u99DB\u5411\u91D1\u8272\u6CCA\u4F4D\u3002`,r),i.mode!=="sailing")break}if(i.mode!=="sailing")continue;let p=dn(i.time);for(let b of Oi)p.height>b.safeHeight||wt(u,b)>=b.radius+1||(u.speed*=Math.max(.5,1-a*2),xc(i,7,`${b.name}\u6C34\u4F4D\u4E0D\u8DB3\uFF0C\u64E6\u7901\u53D7\u640D\u3002\u7E5E\u958B\u7D05\u8272\u7901\u5708\u6216\u7B49\u5F85\u6F32\u6F6E\u3002`,r));for(let b of or)fu(b,i.time)&&wt(u,b)<b.radius*.45&&xc(i,5,`${b.name}\u6B63\u6D3B\u8E8D\uFF0C\u5411\u5916\u5708\u8F49\u8235\u812B\u96E2\u3002`,r);(Math.abs(u.x)>255||Math.abs(u.z)>255)&&(u.x=Xt(u.x,-255,255),u.z=Xt(u.z,-255,255),u.speed*=.8,i.warningCooldown===0&&(r.push(Je("warning","\u5DF2\u5230\u6D77\u5716\u908A\u754C\uFF0C\u8ACB\u8F49\u8235\u56DE\u5230\u4E03\u5CF6\u6D77\u57DF\u3002")),i.warningCooldown=5));let E=i.voyage.navigation;if(E&&E.legIndex===i.voyage.legIndex){for(;E.waypoints[E.index]&&wt(u,E.waypoints[E.index])<=8;)E.index+=1;E.index===E.waypoints.length&&(i.voyage.navigation=null,r.push(Je("route-arrival","\u5DF2\u901A\u904E\u6240\u9078\u652F\u8DEF\uFF1B\u53EF\u4EE5\u7E7C\u7E8C\u99DB\u5411\u76EE\u7684\u5CF6\uFF0C\u6216\u5728\u4E0B\u4E00\u500B\u5C0E\u822A\u9580\u6BD4\u8F03\u8DEF\u6CC1\u3002")))}}if(dn(i.time).label!==l&&r.push(Je("tide",`\u6F6E\u6C50\u8F49\u70BA${dn(i.time).label}\u3002\u6D77\u5716\u4E0A\u7684\u6F6E\u6D41\u3001\u6DFA\u7901\u8207\u65CB\u6D41\u5DF2\u540C\u6B65\u66F4\u65B0\u3002`)),Math.floor((i.time+30)/(240/4))>c){let h=dn(i.time);r.push(Je("tide-forecast",`\u6F6E\u6C50\u9810\u5831\uFF1A\u7D04 ${Math.ceil(h.secondsToChange)} \u79D2\u5F8C\u8F49\u70BA${h.nextLabel}\u3002${h.forecast[0].description}`,{startsIn:h.secondsToChange,nextLabel:h.nextLabel}))}return r}function bu(i){return!["harbor","result"].includes(i.mode)||i.currentIsland!=="harbor"?[Je("info","\u53EA\u6709\u6F6E\u97F3\u6E2F\u53EF\u4EE5\u5B89\u5168\u7B49\u5F85\u4E0B\u4E00\u6F6E\u3002")]:(i.time+=dn(i.time).secondsToChange+.001,[Je("tide",`\u5DF2\u4F11\u606F\u81F3${dn(i.time).label}\uFF0C\u8239\u9AD4\u8207\u6C27\u6C23\u4E0D\u53D7\u5F71\u97FF\u3002`)])}function Sc(i){return JSON.stringify({...i,schemaVersion:1,savedAtSafeIsland:i.lastSafeIsland})}var Bi=(i,e)=>[...new Set(Array.isArray(i)?i.filter(t=>e.includes(t)):[])];function Mu(i){let e=h=>({state:Os(),message:h});if(i==null||i==="")return e("\u65B0\u822A\u7A0B\u6E96\u5099\u597D\u4E86\u3002\u9078\u64C7\u7B2C\u4E00\u4EFD\u59D4\u8A17\uFF0C\u5F9E\u6F6E\u97F3\u6E2F\u958B\u59CB\u3002");let t;try{t=typeof i=="string"?JSON.parse(i):i}catch{return e("\u5B58\u6A94\u683C\u5F0F\u640D\u58DE\uFF0C\u5DF2\u5B89\u5168\u5EFA\u7ACB\u65B0\u822A\u7A0B\u3002")}if(!t||typeof t!="object"||Array.isArray(t)||t.schemaVersion!==1)return e("\u5B58\u6A94\u7248\u672C\u4E0D\u76F8\u5BB9\uFF0C\u5DF2\u5B89\u5168\u5EFA\u7ACB\u65B0\u822A\u7A0B\u3002");if(!Number.isFinite(t.time)||!Number.isFinite(t.seed)||t.time<0)return e("\u5B58\u6A94\u6642\u9593\u6216\u6D77\u6D41\u7A2E\u5B50\u7121\u6548\uFF0C\u5DF2\u5B89\u5168\u5EFA\u7ACB\u65B0\u822A\u7A0B\u3002");let n=Os(t.seed);n.time=t.time,n.discoveries=Bi(t.discoveries,yn.map(h=>h.id)),n.parts=Bi(t.parts,Kn.map(h=>h.partId)),n.completed=Bi(t.completed,Nt.map(h=>h.id)),n.rigId=lr(t.rigId).id,n.contractId=Nt.some(h=>h.id===t.contractId)?t.contractId:Nt[0].id;let r=[...yn.map(h=>h.id),...bn.map(h=>`observation:${h.id}`)];n.cargo=Bi(t.cargo,r).slice(0,lr(n.rigId).capacity),n.lighthouseFixed=t.lighthouseFixed===!0&&n.parts.length===3,n.storyComplete=t.storyComplete===!0&&n.lighthouseFixed,n.credits=Xt(Rt(t.credits),0,1e9);for(let h of["bestTime","bestDamage"])n.records[h]=Number.isFinite(t.records?.[h])&&t.records[h]>=0?t.records[h]:null;for(let h of["voyages","rescues"])n.records[h]=Math.floor(Xt(Rt(t.records?.[h]),0,1e6));n.records.byContract={};for(let h of Nt){let u=t.records?.byContract?.[h.id];u&&Number.isFinite(u.bestTime)&&u.bestTime>=0&&Number.isFinite(u.bestDamage)&&u.bestDamage>=0&&(n.records.byContract[h.id]={bestTime:u.bestTime,bestDamage:u.bestDamage,voyages:Math.floor(Xt(Rt(u.voyages),0,1e6))})}let s=t.voyage||{};n.voyage={active:s.active===!0,startedAt:Math.max(0,Rt(s.startedAt)),elapsed:Math.max(0,Rt(s.elapsed)),damage:Math.max(0,Rt(s.damage)),harvested:Bi(s.harvested,r),observed:Bi(s.observed??s.harvested,yn.map(h=>h.id)),skippedObservations:Bi(s.skippedObservations,bn.map(h=>h.id)),legIndex:Math.floor(Math.max(0,Rt(s.legIndex))),routeChoices:(Array.isArray(s.routeChoices)?s.routeChoices:[]).filter(xp).slice(-100).map(h=>({id:h.id,choiceId:h.id,direction:h.direction,entryIndex:h.entryIndex??0,optionId:h.optionId,time:Math.max(0,Rt(h.time)),tideHeight:Xt(Rt(h.tideHeight),-1,1),cargoCount:Math.floor(Xt(Rt(h.cargoCount),0,14)),legIndex:Math.floor(Math.max(0,Rt(h.legIndex)))})),navigation:null,visited:Bi(s.visited,kt.map(h=>h.id)),rescued:s.rescued===!0};let o=_p(s.navigation,n.voyage);if(o&&!Object.hasOwn(s.navigation,"direction")&&!Object.hasOwn(s.navigation,"entryIndex")){let h=n.voyage.routeChoices.find(u=>u.id===o.choiceId&&u.direction===o.direction&&u.optionId===o.optionId&&u.legIndex===o.legIndex);h.entryIndex=o.entryIndex}n.elapsed=n.voyage.elapsed;let a=Vr(t.lastSafeIsland);bc(n,a),n.mode=a.id==="harbor"?"harbor":"island";let l=h=>h&&Number.isFinite(h.x)&&Number.isFinite(h.z)&&Math.abs(h.x)<=260&&Math.abs(h.z)<=260,c=t.mode==="sailing"||t.mode==="diving";if(c&&l(t.boat)&&Number.isFinite(t.boat.heading)&&Number.isFinite(t.boat.hull)&&t.boat.hull>0&&kt.every(h=>wt(t.boat,h)>=h.radius+6)){if(n.boat={x:t.boat.x,z:t.boat.z,heading:t.boat.heading%(Math.PI*2),sail:Xt(Rt(t.boat.sail),0,1),hull:Xt(t.boat.hull,1,100),speed:Xt(Rt(t.boat.speed),0,10)},n.mode="sailing",n.currentIsland=null,t.mode==="diving"){let h=Gr(t.activeDive);h&&h.islandId===a.id&&l(t.diver)&&wt(t.diver,h.entry)<=h.radius&&Rt(t.oxygen)>0&&(n.mode="diving",n.currentIsland=a.id,n.activeDive=h.id,n.diver={x:t.diver.x,z:t.diver.z},n.oxygen=Xt(t.oxygen,.1,55),n.diveCollected=t.diveCollected===!0)}return n.mode==="sailing"&&(n.voyage.navigation=o),{state:n,message:"\u5DF2\u6062\u5FA9\u822A\u7A0B\u3002\u8239\u4F4D\u3001\u8ABF\u67E5\u8207\u8CA8\u7269\u5B8C\u6574\u4FDD\u7559\uFF1B\u96E2\u7DDA\u4E0D\u6D88\u8017\u6F6E\u6C50\u6216\u6C27\u6C23\u3002"}}if(t.mode==="diving"){let h=Gr(t.activeDive);if(h&&h.islandId===a.id&&l(t.diver)&&wt(t.diver,h.entry)<=h.radius&&Rt(t.oxygen)>0)return n.mode="diving",n.activeDive=h.id,n.diver={x:t.diver.x,z:t.diver.z},n.oxygen=Xt(t.oxygen,.1,55),n.diveCollected=t.diveCollected===!0,{state:n,message:"\u5DF2\u6062\u5FA9\u6DFA\u6C34\u63A2\u7D22\uFF0C\u96E2\u7DDA\u4E0D\u6263\u6C27\u6C23\u3002"}}return c?{state:n,message:`\u5DF2\u5B89\u5168\u56DE\u5230${a.name}\u3002\u7121\u6548\u8239\u4F4D\u5DF2\u4FEE\u5FA9\uFF0C\u8CA8\u7269\u8207\u4E3B\u7DDA\u9032\u5EA6\u4FDD\u7559\u3002`}:{state:n,message:`\u5DF2\u6062\u5FA9${a.name}\u7684\u9760\u6E2F\u7D00\u9304\u3002\u6F6E\u6C50\u3001\u5716\u9451\u3001\u96F6\u4EF6\u8207\u734E\u52F5\u4FDD\u6301\u4E0D\u8B8A\uFF1B\u8239\u5DF2\u514D\u8CBB\u4FEE\u5FA9\u3002`}}var id=0,ah=1,rd=2;var lh=1,Qa=2,xi=3,zn=0,cn=1,Vn=2,Di=0,xr=1,ch=2,hh=3,uh=4,sd=5,Zi=100,od=101,ad=102,ld=103,cd=104,hd=200,ud=201,dd=202,fd=203,Aa=204,Ra=205,pd=206,md=207,gd=208,xd=209,_d=210,vd=211,yd=212,bd=213,Md=214,el=0,tl=1,nl=2,_r=3,il=4,rl=5,sl=6,ol=7,al=0,Sd=1,Ed=2,si=0,wd=1,Td=2,Ad=3,No=4,Rd=5,Cd=6,Id=7,jc="attached",Pd="detached",dh=300,Cr=301,Ir=302,ll=303,cl=304,Fo=306,Ca=1e3,Yi=1001,Ia=1002,fn=1003,Dd=1004;var Oo=1005;var ni=1006,hl=1007;var ji=1008;var oi=1009,fh=1010,ph=1011,_s=1012,ul=1013,Qi=1014,Gn=1015,vs=1016,dl=1017,fl=1018,ys=1020,mh=35902,gh=35899,xh=1021,_h=1022,Tn=1023,ss=1026,bs=1027,pl=1028,ml=1029,vh=1030,gl=1031;var xl=1033,Bo=33776,zo=33777,ko=33778,Ho=33779,_l=35840,vl=35841,yl=35842,bl=35843,Ml=36196,Sl=37492,El=37496,wl=37808,Tl=37809,Al=37810,Rl=37811,Cl=37812,Il=37813,Pl=37814,Dl=37815,Ll=37816,Ul=37817,Nl=37818,Fl=37819,Ol=37820,Bl=37821,zl=36492,kl=36494,Hl=36495,Vl=36283,Gl=36284,Wl=36285,Xl=36286,Ld=2200,Ud=2201,Nd=2202,Js=2300,Pa=2301,Ta=2302,pr=2400,mr=2401,Ks=2402,$l=2500,Fd=2501;var Od=3200,Bd=3201;var ql=0,zd=1,Li="",ln="srgb",vr="srgb-linear",js="linear",bt="srgb";var fr=7680;var Qc=519,kd=512,Hd=513,Vd=514,yh=515,Gd=516,Wd=517,Xd=518,$d=519,eh=35044,bh=35048;var Mh="300 es",ti=2e3,Qs=2001;var fi=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){let n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){let n=this._listeners;if(n===void 0)return;let r=n[e];if(r!==void 0){let s=r.indexOf(t);s!==-1&&r.splice(s,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let n=t[e.type];if(n!==void 0){e.target=this;let r=n.slice(0);for(let s=0,o=r.length;s<o;s++)r[s].call(this,e);e.target=null}}},en=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Su=1234567,$s=Math.PI/180,os=180/Math.PI;function Ui(){let i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(en[i&255]+en[i>>8&255]+en[i>>16&255]+en[i>>24&255]+"-"+en[e&255]+en[e>>8&255]+"-"+en[e>>16&15|64]+en[e>>24&255]+"-"+en[t&63|128]+en[t>>8&255]+"-"+en[t>>16&255]+en[t>>24&255]+en[n&255]+en[n>>8&255]+en[n>>16&255]+en[n>>24&255]).toLowerCase()}function rt(i,e,t){return Math.max(e,Math.min(t,i))}function Sh(i,e){return(i%e+e)%e}function yp(i,e,t,n,r){return n+(i-e)*(r-n)/(t-e)}function bp(i,e,t){return i!==e?(t-i)/(e-i):0}function qs(i,e,t){return(1-t)*i+t*e}function Mp(i,e,t,n){return qs(i,e,1-Math.exp(-t*n))}function Sp(i,e=1){return e-Math.abs(Sh(i,e*2)-e)}function Ep(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*(3-2*i))}function wp(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*i*(i*(i*6-15)+10))}function Tp(i,e){return i+Math.floor(Math.random()*(e-i+1))}function Ap(i,e){return i+Math.random()*(e-i)}function Rp(i){return i*(.5-Math.random())}function Cp(i){i!==void 0&&(Su=i);let e=Su+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function Ip(i){return i*$s}function Pp(i){return i*os}function Dp(i){return(i&i-1)===0&&i!==0}function Lp(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function Up(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function Np(i,e,t,n,r){let s=Math.cos,o=Math.sin,a=s(t/2),l=o(t/2),c=s((e+n)/2),h=o((e+n)/2),u=s((e-n)/2),d=o((e-n)/2),f=s((n-e)/2),m=o((n-e)/2);switch(r){case"XYX":i.set(a*h,l*u,l*d,a*c);break;case"YZY":i.set(l*d,a*h,l*u,a*c);break;case"ZXZ":i.set(l*u,l*d,a*h,a*c);break;case"XZX":i.set(a*h,l*m,l*f,a*c);break;case"YXY":i.set(l*f,a*h,l*m,a*c);break;case"ZYZ":i.set(l*m,l*f,a*h,a*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+r)}}function is(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function an(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}var Eh={DEG2RAD:$s,RAD2DEG:os,generateUUID:Ui,clamp:rt,euclideanModulo:Sh,mapLinear:yp,inverseLerp:bp,lerp:qs,damp:Mp,pingpong:Sp,smoothstep:Ep,smootherstep:wp,randInt:Tp,randFloat:Ap,randFloatSpread:Rp,seededRandom:Cp,degToRad:Ip,radToDeg:Pp,isPowerOfTwo:Dp,ceilPowerOfTwo:Lp,floorPowerOfTwo:Up,setQuaternionFromProperEuler:Np,normalize:an,denormalize:is},ye=class i{constructor(e=0,t=0){i.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6],this.y=r[1]*t+r[4]*n+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=rt(this.x,e.x,t.x),this.y=rt(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=rt(this.x,e,t),this.y=rt(this.y,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(rt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(rt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),r=Math.sin(t),s=this.x-e.x,o=this.y-e.y;return this.x=s*n-o*r+e.x,this.y=s*r+o*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},nn=class{constructor(e=0,t=0,n=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=r}static slerpFlat(e,t,n,r,s,o,a){let l=n[r+0],c=n[r+1],h=n[r+2],u=n[r+3],d=s[o+0],f=s[o+1],m=s[o+2],v=s[o+3];if(a===0){e[t+0]=l,e[t+1]=c,e[t+2]=h,e[t+3]=u;return}if(a===1){e[t+0]=d,e[t+1]=f,e[t+2]=m,e[t+3]=v;return}if(u!==v||l!==d||c!==f||h!==m){let g=1-a,p=l*d+c*f+h*m+u*v,E=p>=0?1:-1,b=1-p*p;if(b>Number.EPSILON){let T=Math.sqrt(b),A=Math.atan2(T,p*E);g=Math.sin(g*A)/T,a=Math.sin(a*A)/T}let y=a*E;if(l=l*g+d*y,c=c*g+f*y,h=h*g+m*y,u=u*g+v*y,g===1-a){let T=1/Math.sqrt(l*l+c*c+h*h+u*u);l*=T,c*=T,h*=T,u*=T}}e[t]=l,e[t+1]=c,e[t+2]=h,e[t+3]=u}static multiplyQuaternionsFlat(e,t,n,r,s,o){let a=n[r],l=n[r+1],c=n[r+2],h=n[r+3],u=s[o],d=s[o+1],f=s[o+2],m=s[o+3];return e[t]=a*m+h*u+l*f-c*d,e[t+1]=l*m+h*d+c*u-a*f,e[t+2]=c*m+h*f+a*d-l*u,e[t+3]=h*m-a*u-l*d-c*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,r){return this._x=e,this._y=t,this._z=n,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,r=e._y,s=e._z,o=e._order,a=Math.cos,l=Math.sin,c=a(n/2),h=a(r/2),u=a(s/2),d=l(n/2),f=l(r/2),m=l(s/2);switch(o){case"XYZ":this._x=d*h*u+c*f*m,this._y=c*f*u-d*h*m,this._z=c*h*m+d*f*u,this._w=c*h*u-d*f*m;break;case"YXZ":this._x=d*h*u+c*f*m,this._y=c*f*u-d*h*m,this._z=c*h*m-d*f*u,this._w=c*h*u+d*f*m;break;case"ZXY":this._x=d*h*u-c*f*m,this._y=c*f*u+d*h*m,this._z=c*h*m+d*f*u,this._w=c*h*u-d*f*m;break;case"ZYX":this._x=d*h*u-c*f*m,this._y=c*f*u+d*h*m,this._z=c*h*m-d*f*u,this._w=c*h*u+d*f*m;break;case"YZX":this._x=d*h*u+c*f*m,this._y=c*f*u+d*h*m,this._z=c*h*m-d*f*u,this._w=c*h*u-d*f*m;break;case"XZY":this._x=d*h*u-c*f*m,this._y=c*f*u-d*h*m,this._z=c*h*m+d*f*u,this._w=c*h*u+d*f*m;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,r=Math.sin(n);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],r=t[4],s=t[8],o=t[1],a=t[5],l=t[9],c=t[2],h=t[6],u=t[10],d=n+a+u;if(d>0){let f=.5/Math.sqrt(d+1);this._w=.25/f,this._x=(h-l)*f,this._y=(s-c)*f,this._z=(o-r)*f}else if(n>a&&n>u){let f=2*Math.sqrt(1+n-a-u);this._w=(h-l)/f,this._x=.25*f,this._y=(r+o)/f,this._z=(s+c)/f}else if(a>u){let f=2*Math.sqrt(1+a-n-u);this._w=(s-c)/f,this._x=(r+o)/f,this._y=.25*f,this._z=(l+h)/f}else{let f=2*Math.sqrt(1+u-n-a);this._w=(o-r)/f,this._x=(s+c)/f,this._y=(l+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(rt(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let r=Math.min(1,t/n);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,r=e._y,s=e._z,o=e._w,a=t._x,l=t._y,c=t._z,h=t._w;return this._x=n*h+o*a+r*c-s*l,this._y=r*h+o*l+s*a-n*c,this._z=s*h+o*c+n*l-r*a,this._w=o*h-n*a-r*l-s*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);let n=this._x,r=this._y,s=this._z,o=this._w,a=o*e._w+n*e._x+r*e._y+s*e._z;if(a<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,a=-a):this.copy(e),a>=1)return this._w=o,this._x=n,this._y=r,this._z=s,this;let l=1-a*a;if(l<=Number.EPSILON){let f=1-t;return this._w=f*o+t*this._w,this._x=f*n+t*this._x,this._y=f*r+t*this._y,this._z=f*s+t*this._z,this.normalize(),this}let c=Math.sqrt(l),h=Math.atan2(c,a),u=Math.sin((1-t)*h)/c,d=Math.sin(t*h)/c;return this._w=o*u+this._w*d,this._x=n*u+this._x*d,this._y=r*u+this._y*d,this._z=s*u+this._z*d,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),r=Math.sqrt(1-n),s=Math.sqrt(n);return this.set(r*Math.sin(e),r*Math.cos(e),s*Math.sin(t),s*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},R=class i{constructor(e=0,t=0,n=0){i.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Eu.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Eu.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6]*r,this.y=s[1]*t+s[4]*n+s[7]*r,this.z=s[2]*t+s[5]*n+s[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,r=this.z,s=e.elements,o=1/(s[3]*t+s[7]*n+s[11]*r+s[15]);return this.x=(s[0]*t+s[4]*n+s[8]*r+s[12])*o,this.y=(s[1]*t+s[5]*n+s[9]*r+s[13])*o,this.z=(s[2]*t+s[6]*n+s[10]*r+s[14])*o,this}applyQuaternion(e){let t=this.x,n=this.y,r=this.z,s=e.x,o=e.y,a=e.z,l=e.w,c=2*(o*r-a*n),h=2*(a*t-s*r),u=2*(s*n-o*t);return this.x=t+l*c+o*u-a*h,this.y=n+l*h+a*c-s*u,this.z=r+l*u+s*h-o*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[4]*n+s[8]*r,this.y=s[1]*t+s[5]*n+s[9]*r,this.z=s[2]*t+s[6]*n+s[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=rt(this.x,e.x,t.x),this.y=rt(this.y,e.y,t.y),this.z=rt(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=rt(this.x,e,t),this.y=rt(this.y,e,t),this.z=rt(this.z,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(rt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,r=e.y,s=e.z,o=t.x,a=t.y,l=t.z;return this.x=r*l-s*a,this.y=s*o-n*l,this.z=n*a-r*o,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return Ec.copy(this).projectOnVector(e),this.sub(Ec)}reflect(e){return this.sub(Ec.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(rt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,r=this.z-e.z;return t*t+n*n+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let r=Math.sin(t)*e;return this.x=r*Math.sin(n),this.y=Math.cos(t)*e,this.z=r*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},Ec=new R,Eu=new nn,Ke=class i{constructor(e,t,n,r,s,o,a,l,c){i.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,r,s,o,a,l,c)}set(e,t,n,r,s,o,a,l,c){let h=this.elements;return h[0]=e,h[1]=r,h[2]=a,h[3]=t,h[4]=s,h[5]=l,h[6]=n,h[7]=o,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,r=t.elements,s=this.elements,o=n[0],a=n[3],l=n[6],c=n[1],h=n[4],u=n[7],d=n[2],f=n[5],m=n[8],v=r[0],g=r[3],p=r[6],E=r[1],b=r[4],y=r[7],T=r[2],A=r[5],C=r[8];return s[0]=o*v+a*E+l*T,s[3]=o*g+a*b+l*A,s[6]=o*p+a*y+l*C,s[1]=c*v+h*E+u*T,s[4]=c*g+h*b+u*A,s[7]=c*p+h*y+u*C,s[2]=d*v+f*E+m*T,s[5]=d*g+f*b+m*A,s[8]=d*p+f*y+m*C,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],r=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],h=e[8];return t*o*h-t*a*c-n*s*h+n*a*l+r*s*c-r*o*l}invert(){let e=this.elements,t=e[0],n=e[1],r=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],h=e[8],u=h*o-a*c,d=a*l-h*s,f=c*s-o*l,m=t*u+n*d+r*f;if(m===0)return this.set(0,0,0,0,0,0,0,0,0);let v=1/m;return e[0]=u*v,e[1]=(r*c-h*n)*v,e[2]=(a*n-r*o)*v,e[3]=d*v,e[4]=(h*t-r*l)*v,e[5]=(r*s-a*t)*v,e[6]=f*v,e[7]=(n*l-c*t)*v,e[8]=(o*t-n*s)*v,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,r,s,o,a){let l=Math.cos(s),c=Math.sin(s);return this.set(n*l,n*c,-n*(l*o+c*a)+o+e,-r*c,r*l,-r*(-c*o+l*a)+a+t,0,0,1),this}scale(e,t){return this.premultiply(wc.makeScale(e,t)),this}rotate(e){return this.premultiply(wc.makeRotation(-e)),this}translate(e,t){return this.premultiply(wc.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let r=0;r<9;r++)if(t[r]!==n[r])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}},wc=new Ke;function wh(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function eo(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function qd(){let i=eo("canvas");return i.style.display="block",i}var wu={};function as(i){i in wu||(wu[i]=!0,console.warn(i))}function Yd(i,e,t){return new Promise(function(n,r){function s(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:r();break;case i.TIMEOUT_EXPIRED:setTimeout(s,t);break;default:n()}}setTimeout(s,t)})}var Tu=new Ke().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Au=new Ke().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Fp(){let i={enabled:!0,workingColorSpace:vr,spaces:{},convert:function(r,s,o){return this.enabled===!1||s===o||!s||!o||(this.spaces[s].transfer===bt&&(r.r=Ti(r.r),r.g=Ti(r.g),r.b=Ti(r.b)),this.spaces[s].primaries!==this.spaces[o].primaries&&(r.applyMatrix3(this.spaces[s].toXYZ),r.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===bt&&(r.r=rs(r.r),r.g=rs(r.g),r.b=rs(r.b))),r},workingToColorSpace:function(r,s){return this.convert(r,this.workingColorSpace,s)},colorSpaceToWorking:function(r,s){return this.convert(r,s,this.workingColorSpace)},getPrimaries:function(r){return this.spaces[r].primaries},getTransfer:function(r){return r===Li?js:this.spaces[r].transfer},getToneMappingMode:function(r){return this.spaces[r].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(r,s=this.workingColorSpace){return r.fromArray(this.spaces[s].luminanceCoefficients)},define:function(r){Object.assign(this.spaces,r)},_getMatrix:function(r,s,o){return r.copy(this.spaces[s].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(r){return this.spaces[r].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(r=this.workingColorSpace){return this.spaces[r].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(r,s){return as("THREE.ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(r,s)},toWorkingColorSpace:function(r,s){return as("THREE.ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(r,s)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[vr]:{primaries:e,whitePoint:n,transfer:js,toXYZ:Tu,fromXYZ:Au,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:ln},outputColorSpaceConfig:{drawingBufferColorSpace:ln}},[ln]:{primaries:e,whitePoint:n,transfer:bt,toXYZ:Tu,fromXYZ:Au,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:ln}}}),i}var dt=Fp();function Ti(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function rs(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}var Wr,Da=class{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{Wr===void 0&&(Wr=eo("canvas")),Wr.width=e.width,Wr.height=e.height;let r=Wr.getContext("2d");e instanceof ImageData?r.putImageData(e,0,0):r.drawImage(e,0,0,e.width,e.height),n=Wr}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){let t=eo("canvas");t.width=e.width,t.height=e.height;let n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);let r=n.getImageData(0,0,e.width,e.height),s=r.data;for(let o=0;o<s.length;o++)s[o]=Ti(s[o]/255)*255;return n.putImageData(r,0,0),t}else if(e.data){let t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(Ti(t[n]/255)*255):t[n]=Ti(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}},Op=0,ls=class{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Op++}),this.uuid=Ui(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):t instanceof VideoFrame?e.set(t.displayHeight,t.displayWidth,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let o=0,a=r.length;o<a;o++)r[o].isDataTexture?s.push(Tc(r[o].image)):s.push(Tc(r[o]))}else s=Tc(r);n.url=s}return t||(e.images[this.uuid]=n),n}};function Tc(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?Da.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}var Bp=0,Ac=new R,pn=class i extends fi{constructor(e=i.DEFAULT_IMAGE,t=i.DEFAULT_MAPPING,n=Yi,r=Yi,s=ni,o=ji,a=Tn,l=oi,c=i.DEFAULT_ANISOTROPY,h=Li){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Bp++}),this.uuid=Ui(),this.name="",this.source=new ls(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=r,this.magFilter=s,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new ye(0,0),this.repeat=new ye(1,1),this.center=new ye(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ke,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(Ac).x}get height(){return this.source.getSize(Ac).y}get depth(){return this.source.getSize(Ac).z}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(let t in e){let n=e[t];if(n===void 0){console.warn(`THREE.Texture.setValues(): parameter '${t}' has value of undefined.`);continue}let r=this[t];if(r===void 0){console.warn(`THREE.Texture.setValues(): property '${t}' does not exist.`);continue}r&&n&&r.isVector2&&n.isVector2||r&&n&&r.isVector3&&n.isVector3||r&&n&&r.isMatrix3&&n.isMatrix3?r.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==dh)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Ca:e.x=e.x-Math.floor(e.x);break;case Yi:e.x=e.x<0?0:1;break;case Ia:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Ca:e.y=e.y-Math.floor(e.y);break;case Yi:e.y=e.y<0?0:1;break;case Ia:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};pn.DEFAULT_IMAGE=null;pn.DEFAULT_MAPPING=dh;pn.DEFAULT_ANISOTROPY=1;var mt=class i{constructor(e=0,t=0,n=0,r=1){i.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,r){return this.x=e,this.y=t,this.z=n,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,r=this.z,s=this.w,o=e.elements;return this.x=o[0]*t+o[4]*n+o[8]*r+o[12]*s,this.y=o[1]*t+o[5]*n+o[9]*r+o[13]*s,this.z=o[2]*t+o[6]*n+o[10]*r+o[14]*s,this.w=o[3]*t+o[7]*n+o[11]*r+o[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,r,s,l=e.elements,c=l[0],h=l[4],u=l[8],d=l[1],f=l[5],m=l[9],v=l[2],g=l[6],p=l[10];if(Math.abs(h-d)<.01&&Math.abs(u-v)<.01&&Math.abs(m-g)<.01){if(Math.abs(h+d)<.1&&Math.abs(u+v)<.1&&Math.abs(m+g)<.1&&Math.abs(c+f+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;let b=(c+1)/2,y=(f+1)/2,T=(p+1)/2,A=(h+d)/4,C=(u+v)/4,D=(m+g)/4;return b>y&&b>T?b<.01?(n=0,r=.707106781,s=.707106781):(n=Math.sqrt(b),r=A/n,s=C/n):y>T?y<.01?(n=.707106781,r=0,s=.707106781):(r=Math.sqrt(y),n=A/r,s=D/r):T<.01?(n=.707106781,r=.707106781,s=0):(s=Math.sqrt(T),n=C/s,r=D/s),this.set(n,r,s,t),this}let E=Math.sqrt((g-m)*(g-m)+(u-v)*(u-v)+(d-h)*(d-h));return Math.abs(E)<.001&&(E=1),this.x=(g-m)/E,this.y=(u-v)/E,this.z=(d-h)/E,this.w=Math.acos((c+f+p-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=rt(this.x,e.x,t.x),this.y=rt(this.y,e.y,t.y),this.z=rt(this.z,e.z,t.z),this.w=rt(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=rt(this.x,e,t),this.y=rt(this.y,e,t),this.z=rt(this.z,e,t),this.w=rt(this.w,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(rt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},La=class extends fi{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:ni,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new mt(0,0,e,t),this.scissorTest=!1,this.viewport=new mt(0,0,e,t);let r={width:e,height:t,depth:n.depth},s=new pn(r);this.textures=[];let o=n.count;for(let a=0;a<o;a++)this.textures[a]=s.clone(),this.textures[a].isRenderTargetTexture=!0,this.textures[a].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview}_setTextureOptions(e={}){let t={minFilter:ni,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let r=0,s=this.textures.length;r<s;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=n,this.textures[r].isArrayTexture=this.textures[r].image.depth>1;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let r=Object.assign({},e.textures[t].image);this.textures[t].source=new ls(r)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}},pi=class extends La{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}},to=class extends pn{constructor(e=null,t=1,n=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=fn,this.minFilter=fn,this.wrapR=Yi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}};var Ua=class extends pn{constructor(e=null,t=1,n=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=fn,this.minFilter=fn,this.wrapR=Yi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var En=class{constructor(e=new R(1/0,1/0,1/0),t=new R(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(jn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(jn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=jn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let s=n.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=s.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,jn):jn.fromBufferAttribute(s,o),jn.applyMatrix4(e.matrixWorld),this.expandByPoint(jn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),ia.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),ia.copy(n.boundingBox)),ia.applyMatrix4(e.matrixWorld),this.union(ia)}let r=e.children;for(let s=0,o=r.length;s<o;s++)this.expandByObject(r[s],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,jn),jn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Bs),ra.subVectors(this.max,Bs),Xr.subVectors(e.a,Bs),$r.subVectors(e.b,Bs),qr.subVectors(e.c,Bs),Hi.subVectors($r,Xr),Vi.subVectors(qr,$r),cr.subVectors(Xr,qr);let t=[0,-Hi.z,Hi.y,0,-Vi.z,Vi.y,0,-cr.z,cr.y,Hi.z,0,-Hi.x,Vi.z,0,-Vi.x,cr.z,0,-cr.x,-Hi.y,Hi.x,0,-Vi.y,Vi.x,0,-cr.y,cr.x,0];return!Rc(t,Xr,$r,qr,ra)||(t=[1,0,0,0,1,0,0,0,1],!Rc(t,Xr,$r,qr,ra))?!1:(sa.crossVectors(Hi,Vi),t=[sa.x,sa.y,sa.z],Rc(t,Xr,$r,qr,ra))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,jn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(jn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(bi[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),bi[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),bi[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),bi[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),bi[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),bi[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),bi[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),bi[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(bi),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},bi=[new R,new R,new R,new R,new R,new R,new R,new R],jn=new R,ia=new En,Xr=new R,$r=new R,qr=new R,Hi=new R,Vi=new R,cr=new R,Bs=new R,ra=new R,sa=new R,hr=new R;function Rc(i,e,t,n,r){for(let s=0,o=i.length-3;s<=o;s+=3){hr.fromArray(i,s);let a=r.x*Math.abs(hr.x)+r.y*Math.abs(hr.y)+r.z*Math.abs(hr.z),l=e.dot(hr),c=t.dot(hr),h=n.dot(hr);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>a)return!1}return!0}var zp=new En,zs=new R,Cc=new R,mi=class{constructor(e=new R,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t!==void 0?n.copy(t):zp.setFromPoints(e).getCenter(n);let r=0;for(let s=0,o=e.length;s<o;s++)r=Math.max(r,n.distanceToSquared(e[s]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;zs.subVectors(e,this.center);let t=zs.lengthSq();if(t>this.radius*this.radius){let n=Math.sqrt(t),r=(n-this.radius)*.5;this.center.addScaledVector(zs,r/n),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Cc.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(zs.copy(e.center).add(Cc)),this.expandByPoint(zs.copy(e.center).sub(Cc))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},Mi=new R,Ic=new R,oa=new R,Gi=new R,Pc=new R,aa=new R,Dc=new R,no=class{constructor(e=new R,t=new R(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Mi)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=Mi.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Mi.copy(this.origin).addScaledVector(this.direction,t),Mi.distanceToSquared(e))}distanceSqToSegment(e,t,n,r){Ic.copy(e).add(t).multiplyScalar(.5),oa.copy(t).sub(e).normalize(),Gi.copy(this.origin).sub(Ic);let s=e.distanceTo(t)*.5,o=-this.direction.dot(oa),a=Gi.dot(this.direction),l=-Gi.dot(oa),c=Gi.lengthSq(),h=Math.abs(1-o*o),u,d,f,m;if(h>0)if(u=o*l-a,d=o*a-l,m=s*h,u>=0)if(d>=-m)if(d<=m){let v=1/h;u*=v,d*=v,f=u*(u+o*d+2*a)+d*(o*u+d+2*l)+c}else d=s,u=Math.max(0,-(o*d+a)),f=-u*u+d*(d+2*l)+c;else d=-s,u=Math.max(0,-(o*d+a)),f=-u*u+d*(d+2*l)+c;else d<=-m?(u=Math.max(0,-(-o*s+a)),d=u>0?-s:Math.min(Math.max(-s,-l),s),f=-u*u+d*(d+2*l)+c):d<=m?(u=0,d=Math.min(Math.max(-s,-l),s),f=d*(d+2*l)+c):(u=Math.max(0,-(o*s+a)),d=u>0?s:Math.min(Math.max(-s,-l),s),f=-u*u+d*(d+2*l)+c);else d=o>0?-s:s,u=Math.max(0,-(o*d+a)),f=-u*u+d*(d+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,u),r&&r.copy(Ic).addScaledVector(oa,d),f}intersectSphere(e,t){Mi.subVectors(e.center,this.origin);let n=Mi.dot(this.direction),r=Mi.dot(Mi)-n*n,s=e.radius*e.radius;if(r>s)return null;let o=Math.sqrt(s-r),a=n-o,l=n+o;return l<0?null:a<0?this.at(l,t):this.at(a,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,r,s,o,a,l,c=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,d=this.origin;return c>=0?(n=(e.min.x-d.x)*c,r=(e.max.x-d.x)*c):(n=(e.max.x-d.x)*c,r=(e.min.x-d.x)*c),h>=0?(s=(e.min.y-d.y)*h,o=(e.max.y-d.y)*h):(s=(e.max.y-d.y)*h,o=(e.min.y-d.y)*h),n>o||s>r||((s>n||isNaN(n))&&(n=s),(o<r||isNaN(r))&&(r=o),u>=0?(a=(e.min.z-d.z)*u,l=(e.max.z-d.z)*u):(a=(e.max.z-d.z)*u,l=(e.min.z-d.z)*u),n>l||a>r)||((a>n||n!==n)&&(n=a),(l<r||r!==r)&&(r=l),r<0)?null:this.at(n>=0?n:r,t)}intersectsBox(e){return this.intersectBox(e,Mi)!==null}intersectTriangle(e,t,n,r,s){Pc.subVectors(t,e),aa.subVectors(n,e),Dc.crossVectors(Pc,aa);let o=this.direction.dot(Dc),a;if(o>0){if(r)return null;a=1}else if(o<0)a=-1,o=-o;else return null;Gi.subVectors(this.origin,e);let l=a*this.direction.dot(aa.crossVectors(Gi,aa));if(l<0)return null;let c=a*this.direction.dot(Pc.cross(Gi));if(c<0||l+c>o)return null;let h=-a*Gi.dot(Dc);return h<0?null:this.at(h/o,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},ot=class i{constructor(e,t,n,r,s,o,a,l,c,h,u,d,f,m,v,g){i.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,r,s,o,a,l,c,h,u,d,f,m,v,g)}set(e,t,n,r,s,o,a,l,c,h,u,d,f,m,v,g){let p=this.elements;return p[0]=e,p[4]=t,p[8]=n,p[12]=r,p[1]=s,p[5]=o,p[9]=a,p[13]=l,p[2]=c,p[6]=h,p[10]=u,p[14]=d,p[3]=f,p[7]=m,p[11]=v,p[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new i().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){let t=this.elements,n=e.elements,r=1/Yr.setFromMatrixColumn(e,0).length(),s=1/Yr.setFromMatrixColumn(e,1).length(),o=1/Yr.setFromMatrixColumn(e,2).length();return t[0]=n[0]*r,t[1]=n[1]*r,t[2]=n[2]*r,t[3]=0,t[4]=n[4]*s,t[5]=n[5]*s,t[6]=n[6]*s,t[7]=0,t[8]=n[8]*o,t[9]=n[9]*o,t[10]=n[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,r=e.y,s=e.z,o=Math.cos(n),a=Math.sin(n),l=Math.cos(r),c=Math.sin(r),h=Math.cos(s),u=Math.sin(s);if(e.order==="XYZ"){let d=o*h,f=o*u,m=a*h,v=a*u;t[0]=l*h,t[4]=-l*u,t[8]=c,t[1]=f+m*c,t[5]=d-v*c,t[9]=-a*l,t[2]=v-d*c,t[6]=m+f*c,t[10]=o*l}else if(e.order==="YXZ"){let d=l*h,f=l*u,m=c*h,v=c*u;t[0]=d+v*a,t[4]=m*a-f,t[8]=o*c,t[1]=o*u,t[5]=o*h,t[9]=-a,t[2]=f*a-m,t[6]=v+d*a,t[10]=o*l}else if(e.order==="ZXY"){let d=l*h,f=l*u,m=c*h,v=c*u;t[0]=d-v*a,t[4]=-o*u,t[8]=m+f*a,t[1]=f+m*a,t[5]=o*h,t[9]=v-d*a,t[2]=-o*c,t[6]=a,t[10]=o*l}else if(e.order==="ZYX"){let d=o*h,f=o*u,m=a*h,v=a*u;t[0]=l*h,t[4]=m*c-f,t[8]=d*c+v,t[1]=l*u,t[5]=v*c+d,t[9]=f*c-m,t[2]=-c,t[6]=a*l,t[10]=o*l}else if(e.order==="YZX"){let d=o*l,f=o*c,m=a*l,v=a*c;t[0]=l*h,t[4]=v-d*u,t[8]=m*u+f,t[1]=u,t[5]=o*h,t[9]=-a*h,t[2]=-c*h,t[6]=f*u+m,t[10]=d-v*u}else if(e.order==="XZY"){let d=o*l,f=o*c,m=a*l,v=a*c;t[0]=l*h,t[4]=-u,t[8]=c*h,t[1]=d*u+v,t[5]=o*h,t[9]=f*u-m,t[2]=m*u-f,t[6]=a*h,t[10]=v*u+d}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(kp,e,Hp)}lookAt(e,t,n){let r=this.elements;return Mn.subVectors(e,t),Mn.lengthSq()===0&&(Mn.z=1),Mn.normalize(),Wi.crossVectors(n,Mn),Wi.lengthSq()===0&&(Math.abs(n.z)===1?Mn.x+=1e-4:Mn.z+=1e-4,Mn.normalize(),Wi.crossVectors(n,Mn)),Wi.normalize(),la.crossVectors(Mn,Wi),r[0]=Wi.x,r[4]=la.x,r[8]=Mn.x,r[1]=Wi.y,r[5]=la.y,r[9]=Mn.y,r[2]=Wi.z,r[6]=la.z,r[10]=Mn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,r=t.elements,s=this.elements,o=n[0],a=n[4],l=n[8],c=n[12],h=n[1],u=n[5],d=n[9],f=n[13],m=n[2],v=n[6],g=n[10],p=n[14],E=n[3],b=n[7],y=n[11],T=n[15],A=r[0],C=r[4],D=r[8],S=r[12],M=r[1],P=r[5],z=r[9],G=r[13],$=r[2],X=r[6],Z=r[10],de=r[14],q=r[3],ge=r[7],Te=r[11],De=r[15];return s[0]=o*A+a*M+l*$+c*q,s[4]=o*C+a*P+l*X+c*ge,s[8]=o*D+a*z+l*Z+c*Te,s[12]=o*S+a*G+l*de+c*De,s[1]=h*A+u*M+d*$+f*q,s[5]=h*C+u*P+d*X+f*ge,s[9]=h*D+u*z+d*Z+f*Te,s[13]=h*S+u*G+d*de+f*De,s[2]=m*A+v*M+g*$+p*q,s[6]=m*C+v*P+g*X+p*ge,s[10]=m*D+v*z+g*Z+p*Te,s[14]=m*S+v*G+g*de+p*De,s[3]=E*A+b*M+y*$+T*q,s[7]=E*C+b*P+y*X+T*ge,s[11]=E*D+b*z+y*Z+T*Te,s[15]=E*S+b*G+y*de+T*De,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],r=e[8],s=e[12],o=e[1],a=e[5],l=e[9],c=e[13],h=e[2],u=e[6],d=e[10],f=e[14],m=e[3],v=e[7],g=e[11],p=e[15];return m*(+s*l*u-r*c*u-s*a*d+n*c*d+r*a*f-n*l*f)+v*(+t*l*f-t*c*d+s*o*d-r*o*f+r*c*h-s*l*h)+g*(+t*c*u-t*a*f-s*o*u+n*o*f+s*a*h-n*c*h)+p*(-r*a*h-t*l*u+t*a*d+r*o*u-n*o*d+n*l*h)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],r=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],h=e[8],u=e[9],d=e[10],f=e[11],m=e[12],v=e[13],g=e[14],p=e[15],E=u*g*c-v*d*c+v*l*f-a*g*f-u*l*p+a*d*p,b=m*d*c-h*g*c-m*l*f+o*g*f+h*l*p-o*d*p,y=h*v*c-m*u*c+m*a*f-o*v*f-h*a*p+o*u*p,T=m*u*l-h*v*l-m*a*d+o*v*d+h*a*g-o*u*g,A=t*E+n*b+r*y+s*T;if(A===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let C=1/A;return e[0]=E*C,e[1]=(v*d*s-u*g*s-v*r*f+n*g*f+u*r*p-n*d*p)*C,e[2]=(a*g*s-v*l*s+v*r*c-n*g*c-a*r*p+n*l*p)*C,e[3]=(u*l*s-a*d*s-u*r*c+n*d*c+a*r*f-n*l*f)*C,e[4]=b*C,e[5]=(h*g*s-m*d*s+m*r*f-t*g*f-h*r*p+t*d*p)*C,e[6]=(m*l*s-o*g*s-m*r*c+t*g*c+o*r*p-t*l*p)*C,e[7]=(o*d*s-h*l*s+h*r*c-t*d*c-o*r*f+t*l*f)*C,e[8]=y*C,e[9]=(m*u*s-h*v*s-m*n*f+t*v*f+h*n*p-t*u*p)*C,e[10]=(o*v*s-m*a*s+m*n*c-t*v*c-o*n*p+t*a*p)*C,e[11]=(h*a*s-o*u*s-h*n*c+t*u*c+o*n*f-t*a*f)*C,e[12]=T*C,e[13]=(h*v*r-m*u*r+m*n*d-t*v*d-h*n*g+t*u*g)*C,e[14]=(m*a*r-o*v*r-m*n*l+t*v*l+o*n*g-t*a*g)*C,e[15]=(o*u*r-h*a*r+h*n*l-t*u*l-o*n*d+t*a*d)*C,this}scale(e){let t=this.elements,n=e.x,r=e.y,s=e.z;return t[0]*=n,t[4]*=r,t[8]*=s,t[1]*=n,t[5]*=r,t[9]*=s,t[2]*=n,t[6]*=r,t[10]*=s,t[3]*=n,t[7]*=r,t[11]*=s,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,r))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),r=Math.sin(t),s=1-n,o=e.x,a=e.y,l=e.z,c=s*o,h=s*a;return this.set(c*o+n,c*a-r*l,c*l+r*a,0,c*a+r*l,h*a+n,h*l-r*o,0,c*l-r*a,h*l+r*o,s*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,r,s,o){return this.set(1,n,s,0,e,1,o,0,t,r,1,0,0,0,0,1),this}compose(e,t,n){let r=this.elements,s=t._x,o=t._y,a=t._z,l=t._w,c=s+s,h=o+o,u=a+a,d=s*c,f=s*h,m=s*u,v=o*h,g=o*u,p=a*u,E=l*c,b=l*h,y=l*u,T=n.x,A=n.y,C=n.z;return r[0]=(1-(v+p))*T,r[1]=(f+y)*T,r[2]=(m-b)*T,r[3]=0,r[4]=(f-y)*A,r[5]=(1-(d+p))*A,r[6]=(g+E)*A,r[7]=0,r[8]=(m+b)*C,r[9]=(g-E)*C,r[10]=(1-(d+v))*C,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,n){let r=this.elements,s=Yr.set(r[0],r[1],r[2]).length(),o=Yr.set(r[4],r[5],r[6]).length(),a=Yr.set(r[8],r[9],r[10]).length();this.determinant()<0&&(s=-s),e.x=r[12],e.y=r[13],e.z=r[14],Qn.copy(this);let c=1/s,h=1/o,u=1/a;return Qn.elements[0]*=c,Qn.elements[1]*=c,Qn.elements[2]*=c,Qn.elements[4]*=h,Qn.elements[5]*=h,Qn.elements[6]*=h,Qn.elements[8]*=u,Qn.elements[9]*=u,Qn.elements[10]*=u,t.setFromRotationMatrix(Qn),n.x=s,n.y=o,n.z=a,this}makePerspective(e,t,n,r,s,o,a=ti,l=!1){let c=this.elements,h=2*s/(t-e),u=2*s/(n-r),d=(t+e)/(t-e),f=(n+r)/(n-r),m,v;if(l)m=s/(o-s),v=o*s/(o-s);else if(a===ti)m=-(o+s)/(o-s),v=-2*o*s/(o-s);else if(a===Qs)m=-o/(o-s),v=-o*s/(o-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return c[0]=h,c[4]=0,c[8]=d,c[12]=0,c[1]=0,c[5]=u,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=m,c[14]=v,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,r,s,o,a=ti,l=!1){let c=this.elements,h=2/(t-e),u=2/(n-r),d=-(t+e)/(t-e),f=-(n+r)/(n-r),m,v;if(l)m=1/(o-s),v=o/(o-s);else if(a===ti)m=-2/(o-s),v=-(o+s)/(o-s);else if(a===Qs)m=-1/(o-s),v=-s/(o-s);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return c[0]=h,c[4]=0,c[8]=0,c[12]=d,c[1]=0,c[5]=u,c[9]=0,c[13]=f,c[2]=0,c[6]=0,c[10]=m,c[14]=v,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let r=0;r<16;r++)if(t[r]!==n[r])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}},Yr=new R,Qn=new ot,kp=new R(0,0,0),Hp=new R(1,1,1),Wi=new R,la=new R,Mn=new R,Ru=new ot,Cu=new nn,kn=class i{constructor(e=0,t=0,n=0,r=i.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,r=this._order){return this._x=e,this._y=t,this._z=n,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let r=e.elements,s=r[0],o=r[4],a=r[8],l=r[1],c=r[5],h=r[9],u=r[2],d=r[6],f=r[10];switch(t){case"XYZ":this._y=Math.asin(rt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-o,s)):(this._x=Math.atan2(d,c),this._z=0);break;case"YXZ":this._x=Math.asin(-rt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-u,s),this._z=0);break;case"ZXY":this._x=Math.asin(rt(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,f),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-rt(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(rt(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-u,s)):(this._x=0,this._y=Math.atan2(a,f));break;case"XZY":this._z=Math.asin(-rt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(a,s)):(this._x=Math.atan2(-h,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return Ru.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Ru,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Cu.setFromEuler(this),this.setFromQuaternion(Cu,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};kn.DEFAULT_ORDER="XYZ";var io=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}},Vp=0,Iu=new R,Zr=new nn,Si=new ot,ca=new R,ks=new R,Gp=new R,Wp=new nn,Pu=new R(1,0,0),Du=new R(0,1,0),Lu=new R(0,0,1),Uu={type:"added"},Xp={type:"removed"},Jr={type:"childadded",child:null},Lc={type:"childremoved",child:null},Ht=class i extends fi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Vp++}),this.uuid=Ui(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=i.DEFAULT_UP.clone();let e=new R,t=new kn,n=new nn,r=new R(1,1,1);function s(){n.setFromEuler(t,!1)}function o(){t.setFromQuaternion(n,void 0,!1)}t._onChange(s),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new ot},normalMatrix:{value:new Ke}}),this.matrix=new ot,this.matrixWorld=new ot,this.matrixAutoUpdate=i.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=i.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new io,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Zr.setFromAxisAngle(e,t),this.quaternion.multiply(Zr),this}rotateOnWorldAxis(e,t){return Zr.setFromAxisAngle(e,t),this.quaternion.premultiply(Zr),this}rotateX(e){return this.rotateOnAxis(Pu,e)}rotateY(e){return this.rotateOnAxis(Du,e)}rotateZ(e){return this.rotateOnAxis(Lu,e)}translateOnAxis(e,t){return Iu.copy(e).applyQuaternion(this.quaternion),this.position.add(Iu.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Pu,e)}translateY(e){return this.translateOnAxis(Du,e)}translateZ(e){return this.translateOnAxis(Lu,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Si.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?ca.copy(e):ca.set(e,t,n);let r=this.parent;this.updateWorldMatrix(!0,!1),ks.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Si.lookAt(ks,ca,this.up):Si.lookAt(ca,ks,this.up),this.quaternion.setFromRotationMatrix(Si),r&&(Si.extractRotation(r.matrixWorld),Zr.setFromRotationMatrix(Si),this.quaternion.premultiply(Zr.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Uu),Jr.child=e,this.dispatchEvent(Jr),Jr.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Xp),Lc.child=e,this.dispatchEvent(Lc),Lc.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Si.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Si.multiply(e.parent.matrixWorld)),e.applyMatrix4(Si),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Uu),Jr.child=e,this.dispatchEvent(Jr),Jr.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,r=this.children.length;n<r;n++){let o=this.children[n].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let r=this.children;for(let s=0,o=r.length;s<o;s++)r[s].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ks,e,Gp),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ks,Wp,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){let n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){let r=this.children;for(let s=0,o=r.length;s<o;s++)r[s].updateWorldMatrix(!1,!0)}}toJSON(e){let t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(a=>({...a,boundingBox:a.boundingBox?a.boundingBox.toJSON():void 0,boundingSphere:a.boundingSphere?a.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(a=>({...a})),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(e),r.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(r.boundingBox=this.boundingBox.toJSON()));function s(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(e.geometries,this.geometry);let a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){let l=a.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){let u=l[c];s(e.shapes,u)}else s(e.shapes,l)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(s(e.materials,this.material[l]));r.material=a}else r.material=s(e.materials,this.material);if(this.children.length>0){r.children=[];for(let a=0;a<this.children.length;a++)r.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let a=0;a<this.animations.length;a++){let l=this.animations[a];r.animations.push(s(e.animations,l))}}if(t){let a=o(e.geometries),l=o(e.materials),c=o(e.textures),h=o(e.images),u=o(e.shapes),d=o(e.skeletons),f=o(e.animations),m=o(e.nodes);a.length>0&&(n.geometries=a),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),d.length>0&&(n.skeletons=d),f.length>0&&(n.animations=f),m.length>0&&(n.nodes=m)}return n.object=r,n;function o(a){let l=[];for(let c in a){let h=a[c];delete h.metadata,l.push(h)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){let r=e.children[n];this.add(r.clone())}return this}};Ht.DEFAULT_UP=new R(0,1,0);Ht.DEFAULT_MATRIX_AUTO_UPDATE=!0;Ht.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var ei=new R,Ei=new R,Uc=new R,wi=new R,Kr=new R,jr=new R,Nu=new R,Nc=new R,Fc=new R,Oc=new R,Bc=new mt,zc=new mt,kc=new mt,qi=class i{constructor(e=new R,t=new R,n=new R){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,r){r.subVectors(n,t),ei.subVectors(e,t),r.cross(ei);let s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(e,t,n,r,s){ei.subVectors(r,t),Ei.subVectors(n,t),Uc.subVectors(e,t);let o=ei.dot(ei),a=ei.dot(Ei),l=ei.dot(Uc),c=Ei.dot(Ei),h=Ei.dot(Uc),u=o*c-a*a;if(u===0)return s.set(0,0,0),null;let d=1/u,f=(c*l-a*h)*d,m=(o*h-a*l)*d;return s.set(1-f-m,m,f)}static containsPoint(e,t,n,r){return this.getBarycoord(e,t,n,r,wi)===null?!1:wi.x>=0&&wi.y>=0&&wi.x+wi.y<=1}static getInterpolation(e,t,n,r,s,o,a,l){return this.getBarycoord(e,t,n,r,wi)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,wi.x),l.addScaledVector(o,wi.y),l.addScaledVector(a,wi.z),l)}static getInterpolatedAttribute(e,t,n,r,s,o){return Bc.setScalar(0),zc.setScalar(0),kc.setScalar(0),Bc.fromBufferAttribute(e,t),zc.fromBufferAttribute(e,n),kc.fromBufferAttribute(e,r),o.setScalar(0),o.addScaledVector(Bc,s.x),o.addScaledVector(zc,s.y),o.addScaledVector(kc,s.z),o}static isFrontFacing(e,t,n,r){return ei.subVectors(n,t),Ei.subVectors(e,t),ei.cross(Ei).dot(r)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,r){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,n,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return ei.subVectors(this.c,this.b),Ei.subVectors(this.a,this.b),ei.cross(Ei).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return i.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return i.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,r,s){return i.getInterpolation(e,this.a,this.b,this.c,t,n,r,s)}containsPoint(e){return i.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return i.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,r=this.b,s=this.c,o,a;Kr.subVectors(r,n),jr.subVectors(s,n),Nc.subVectors(e,n);let l=Kr.dot(Nc),c=jr.dot(Nc);if(l<=0&&c<=0)return t.copy(n);Fc.subVectors(e,r);let h=Kr.dot(Fc),u=jr.dot(Fc);if(h>=0&&u<=h)return t.copy(r);let d=l*u-h*c;if(d<=0&&l>=0&&h<=0)return o=l/(l-h),t.copy(n).addScaledVector(Kr,o);Oc.subVectors(e,s);let f=Kr.dot(Oc),m=jr.dot(Oc);if(m>=0&&f<=m)return t.copy(s);let v=f*c-l*m;if(v<=0&&c>=0&&m<=0)return a=c/(c-m),t.copy(n).addScaledVector(jr,a);let g=h*m-f*u;if(g<=0&&u-h>=0&&f-m>=0)return Nu.subVectors(s,r),a=(u-h)/(u-h+(f-m)),t.copy(r).addScaledVector(Nu,a);let p=1/(g+v+d);return o=v*p,a=d*p,t.copy(n).addScaledVector(Kr,o).addScaledVector(jr,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},Zd={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Xi={h:0,s:0,l:0},ha={h:0,s:0,l:0};function Hc(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}var je=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=ln){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,dt.colorSpaceToWorking(this,t),this}setRGB(e,t,n,r=dt.workingColorSpace){return this.r=e,this.g=t,this.b=n,dt.colorSpaceToWorking(this,r),this}setHSL(e,t,n,r=dt.workingColorSpace){if(e=Sh(e,1),t=rt(t,0,1),n=rt(n,0,1),t===0)this.r=this.g=this.b=n;else{let s=n<=.5?n*(1+t):n+t-n*t,o=2*n-s;this.r=Hc(o,s,e+1/3),this.g=Hc(o,s,e),this.b=Hc(o,s,e-1/3)}return dt.colorSpaceToWorking(this,r),this}setStyle(e,t=ln){function n(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let s,o=r[1],a=r[2];switch(o){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){let s=r[1],o=s.length;if(o===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(s,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=ln){let n=Zd[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Ti(e.r),this.g=Ti(e.g),this.b=Ti(e.b),this}copyLinearToSRGB(e){return this.r=rs(e.r),this.g=rs(e.g),this.b=rs(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=ln){return dt.workingToColorSpace(tn.copy(this),e),Math.round(rt(tn.r*255,0,255))*65536+Math.round(rt(tn.g*255,0,255))*256+Math.round(rt(tn.b*255,0,255))}getHexString(e=ln){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=dt.workingColorSpace){dt.workingToColorSpace(tn.copy(this),t);let n=tn.r,r=tn.g,s=tn.b,o=Math.max(n,r,s),a=Math.min(n,r,s),l,c,h=(a+o)/2;if(a===o)l=0,c=0;else{let u=o-a;switch(c=h<=.5?u/(o+a):u/(2-o-a),o){case n:l=(r-s)/u+(r<s?6:0);break;case r:l=(s-n)/u+2;break;case s:l=(n-r)/u+4;break}l/=6}return e.h=l,e.s=c,e.l=h,e}getRGB(e,t=dt.workingColorSpace){return dt.workingToColorSpace(tn.copy(this),t),e.r=tn.r,e.g=tn.g,e.b=tn.b,e}getStyle(e=ln){dt.workingToColorSpace(tn.copy(this),e);let t=tn.r,n=tn.g,r=tn.b;return e!==ln?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(r*255)})`}offsetHSL(e,t,n){return this.getHSL(Xi),this.setHSL(Xi.h+e,Xi.s+t,Xi.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Xi),e.getHSL(ha);let n=qs(Xi.h,ha.h,t),r=qs(Xi.s,ha.s,t),s=qs(Xi.l,ha.l,t);return this.setHSL(n,r,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,r=this.b,s=e.elements;return this.r=s[0]*t+s[3]*n+s[6]*r,this.g=s[1]*t+s[4]*n+s[7]*r,this.b=s[2]*t+s[5]*n+s[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},tn=new je;je.NAMES=Zd;var $p=0,Ai=class extends fi{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:$p++}),this.uuid=Ui(),this.name="",this.type="Material",this.blending=xr,this.side=zn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Aa,this.blendDst=Ra,this.blendEquation=Zi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new je(0,0,0),this.blendAlpha=0,this.depthFunc=_r,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Qc,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=fr,this.stencilZFail=fr,this.stencilZPass=fr,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}let r=this[t];if(r===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(n):r&&r.isVector3&&n&&n.isVector3?r.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});let n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==xr&&(n.blending=this.blending),this.side!==zn&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Aa&&(n.blendSrc=this.blendSrc),this.blendDst!==Ra&&(n.blendDst=this.blendDst),this.blendEquation!==Zi&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==_r&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Qc&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==fr&&(n.stencilFail=this.stencilFail),this.stencilZFail!==fr&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==fr&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function r(s){let o=[];for(let a in s){let l=s[a];delete l.metadata,o.push(l)}return o}if(t){let s=r(e.textures),o=r(e.images);s.length>0&&(n.textures=s),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let r=t.length;n=new Array(r);for(let s=0;s!==r;++s)n[s]=t[s].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}},ro=class extends Ai{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new je(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new kn,this.combine=al,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}};var Ft=new R,ua=new ye,qp=0,Ot=class{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:qp++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=eh,this.updateRanges=[],this.gpuType=Gn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[e+r]=t.array[n+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)ua.fromBufferAttribute(this,t),ua.applyMatrix3(e),this.setXY(t,ua.x,ua.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)Ft.fromBufferAttribute(this,t),Ft.applyMatrix3(e),this.setXYZ(t,Ft.x,Ft.y,Ft.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)Ft.fromBufferAttribute(this,t),Ft.applyMatrix4(e),this.setXYZ(t,Ft.x,Ft.y,Ft.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Ft.fromBufferAttribute(this,t),Ft.applyNormalMatrix(e),this.setXYZ(t,Ft.x,Ft.y,Ft.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Ft.fromBufferAttribute(this,t),Ft.transformDirection(e),this.setXYZ(t,Ft.x,Ft.y,Ft.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=is(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=an(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=is(t,this.array)),t}setX(e,t){return this.normalized&&(t=an(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=is(t,this.array)),t}setY(e,t){return this.normalized&&(t=an(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=is(t,this.array)),t}setZ(e,t){return this.normalized&&(t=an(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=is(t,this.array)),t}setW(e,t){return this.normalized&&(t=an(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=an(t,this.array),n=an(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,r){return e*=this.itemSize,this.normalized&&(t=an(t,this.array),n=an(n,this.array),r=an(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this}setXYZW(e,t,n,r,s){return e*=this.itemSize,this.normalized&&(t=an(t,this.array),n=an(n,this.array),r=an(r,this.array),s=an(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==eh&&(e.usage=this.usage),e}};var yr=class extends Ot{constructor(e,t,n){super(new Uint16Array(e),t,n)}};var so=class extends Ot{constructor(e,t,n){super(new Uint32Array(e),t,n)}};var ft=class extends Ot{constructor(e,t,n){super(new Float32Array(e),t,n)}},Yp=0,Bn=new ot,Vc=new Ht,Qr=new R,Sn=new En,Hs=new En,$t=new R,qt=class i extends fi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Yp++}),this.uuid=Ui(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(wh(e)?so:yr)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let s=new Ke().getNormalMatrix(e);n.applyNormalMatrix(s),n.needsUpdate=!0}let r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Bn.makeRotationFromQuaternion(e),this.applyMatrix4(Bn),this}rotateX(e){return Bn.makeRotationX(e),this.applyMatrix4(Bn),this}rotateY(e){return Bn.makeRotationY(e),this.applyMatrix4(Bn),this}rotateZ(e){return Bn.makeRotationZ(e),this.applyMatrix4(Bn),this}translate(e,t,n){return Bn.makeTranslation(e,t,n),this.applyMatrix4(Bn),this}scale(e,t,n){return Bn.makeScale(e,t,n),this.applyMatrix4(Bn),this}lookAt(e){return Vc.lookAt(e),Vc.updateMatrix(),this.applyMatrix4(Vc.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Qr).negate(),this.translate(Qr.x,Qr.y,Qr.z),this}setFromPoints(e){let t=this.getAttribute("position");if(t===void 0){let n=[];for(let r=0,s=e.length;r<s;r++){let o=e[r];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new ft(n,3))}else{let n=Math.min(e.length,t.count);for(let r=0;r<n;r++){let s=e[r];t.setXYZ(r,s.x,s.y,s.z||0)}e.length>t.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new En);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new R(-1/0,-1/0,-1/0),new R(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,r=t.length;n<r;n++){let s=t[n];Sn.setFromBufferAttribute(s),this.morphTargetsRelative?($t.addVectors(this.boundingBox.min,Sn.min),this.boundingBox.expandByPoint($t),$t.addVectors(this.boundingBox.max,Sn.max),this.boundingBox.expandByPoint($t)):(this.boundingBox.expandByPoint(Sn.min),this.boundingBox.expandByPoint(Sn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new mi);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new R,1/0);return}if(e){let n=this.boundingSphere.center;if(Sn.setFromBufferAttribute(e),t)for(let s=0,o=t.length;s<o;s++){let a=t[s];Hs.setFromBufferAttribute(a),this.morphTargetsRelative?($t.addVectors(Sn.min,Hs.min),Sn.expandByPoint($t),$t.addVectors(Sn.max,Hs.max),Sn.expandByPoint($t)):(Sn.expandByPoint(Hs.min),Sn.expandByPoint(Hs.max))}Sn.getCenter(n);let r=0;for(let s=0,o=e.count;s<o;s++)$t.fromBufferAttribute(e,s),r=Math.max(r,n.distanceToSquared($t));if(t)for(let s=0,o=t.length;s<o;s++){let a=t[s],l=this.morphTargetsRelative;for(let c=0,h=a.count;c<h;c++)$t.fromBufferAttribute(a,c),l&&(Qr.fromBufferAttribute(e,c),$t.add(Qr)),r=Math.max(r,n.distanceToSquared($t))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=t.position,r=t.normal,s=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Ot(new Float32Array(4*n.count),4));let o=this.getAttribute("tangent"),a=[],l=[];for(let D=0;D<n.count;D++)a[D]=new R,l[D]=new R;let c=new R,h=new R,u=new R,d=new ye,f=new ye,m=new ye,v=new R,g=new R;function p(D,S,M){c.fromBufferAttribute(n,D),h.fromBufferAttribute(n,S),u.fromBufferAttribute(n,M),d.fromBufferAttribute(s,D),f.fromBufferAttribute(s,S),m.fromBufferAttribute(s,M),h.sub(c),u.sub(c),f.sub(d),m.sub(d);let P=1/(f.x*m.y-m.x*f.y);isFinite(P)&&(v.copy(h).multiplyScalar(m.y).addScaledVector(u,-f.y).multiplyScalar(P),g.copy(u).multiplyScalar(f.x).addScaledVector(h,-m.x).multiplyScalar(P),a[D].add(v),a[S].add(v),a[M].add(v),l[D].add(g),l[S].add(g),l[M].add(g))}let E=this.groups;E.length===0&&(E=[{start:0,count:e.count}]);for(let D=0,S=E.length;D<S;++D){let M=E[D],P=M.start,z=M.count;for(let G=P,$=P+z;G<$;G+=3)p(e.getX(G+0),e.getX(G+1),e.getX(G+2))}let b=new R,y=new R,T=new R,A=new R;function C(D){T.fromBufferAttribute(r,D),A.copy(T);let S=a[D];b.copy(S),b.sub(T.multiplyScalar(T.dot(S))).normalize(),y.crossVectors(A,S);let P=y.dot(l[D])<0?-1:1;o.setXYZW(D,b.x,b.y,b.z,P)}for(let D=0,S=E.length;D<S;++D){let M=E[D],P=M.start,z=M.count;for(let G=P,$=P+z;G<$;G+=3)C(e.getX(G+0)),C(e.getX(G+1)),C(e.getX(G+2))}}computeVertexNormals(){let e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Ot(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let d=0,f=n.count;d<f;d++)n.setXYZ(d,0,0,0);let r=new R,s=new R,o=new R,a=new R,l=new R,c=new R,h=new R,u=new R;if(e)for(let d=0,f=e.count;d<f;d+=3){let m=e.getX(d+0),v=e.getX(d+1),g=e.getX(d+2);r.fromBufferAttribute(t,m),s.fromBufferAttribute(t,v),o.fromBufferAttribute(t,g),h.subVectors(o,s),u.subVectors(r,s),h.cross(u),a.fromBufferAttribute(n,m),l.fromBufferAttribute(n,v),c.fromBufferAttribute(n,g),a.add(h),l.add(h),c.add(h),n.setXYZ(m,a.x,a.y,a.z),n.setXYZ(v,l.x,l.y,l.z),n.setXYZ(g,c.x,c.y,c.z)}else for(let d=0,f=t.count;d<f;d+=3)r.fromBufferAttribute(t,d+0),s.fromBufferAttribute(t,d+1),o.fromBufferAttribute(t,d+2),h.subVectors(o,s),u.subVectors(r,s),h.cross(u),n.setXYZ(d+0,h.x,h.y,h.z),n.setXYZ(d+1,h.x,h.y,h.z),n.setXYZ(d+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)$t.fromBufferAttribute(e,t),$t.normalize(),e.setXYZ(t,$t.x,$t.y,$t.z)}toNonIndexed(){function e(a,l){let c=a.array,h=a.itemSize,u=a.normalized,d=new c.constructor(l.length*h),f=0,m=0;for(let v=0,g=l.length;v<g;v++){a.isInterleavedBufferAttribute?f=l[v]*a.data.stride+a.offset:f=l[v]*h;for(let p=0;p<h;p++)d[m++]=c[f++]}return new Ot(d,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let t=new i,n=this.index.array,r=this.attributes;for(let a in r){let l=r[a],c=e(l,n);t.setAttribute(a,c)}let s=this.morphAttributes;for(let a in s){let l=[],c=s[a];for(let h=0,u=c.length;h<u;h++){let d=c[h],f=e(d,n);l.push(f)}t.morphAttributes[a]=l}t.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let a=0,l=o.length;a<l;a++){let c=o[a];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){let e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){let l=this.parameters;for(let c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let l in n){let c=n[l];e.data.attributes[l]=c.toJSON(e.data)}let r={},s=!1;for(let l in this.morphAttributes){let c=this.morphAttributes[l],h=[];for(let u=0,d=c.length;u<d;u++){let f=c[u];h.push(f.toJSON(e.data))}h.length>0&&(r[l]=h,s=!0)}s&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);let o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));let a=this.boundingSphere;return a!==null&&(e.data.boundingSphere=a.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone());let r=e.attributes;for(let c in r){let h=r[c];this.setAttribute(c,h.clone(t))}let s=e.morphAttributes;for(let c in s){let h=[],u=s[c];for(let d=0,f=u.length;d<f;d++)h.push(u[d].clone(t));this.morphAttributes[c]=h}this.morphTargetsRelative=e.morphTargetsRelative;let o=e.groups;for(let c=0,h=o.length;c<h;c++){let u=o[c];this.addGroup(u.start,u.count,u.materialIndex)}let a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());let l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}},Fu=new ot,ur=new no,da=new mi,Ou=new R,fa=new R,pa=new R,ma=new R,Gc=new R,ga=new R,Bu=new R,xa=new R,Ct=class extends Ht{constructor(e=new qt,t=new ro){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let r=t[n[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){let a=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}getVertexPosition(e,t){let n=this.geometry,r=n.attributes.position,s=n.morphAttributes.position,o=n.morphTargetsRelative;t.fromBufferAttribute(r,e);let a=this.morphTargetInfluences;if(s&&a){ga.set(0,0,0);for(let l=0,c=s.length;l<c;l++){let h=a[l],u=s[l];h!==0&&(Gc.fromBufferAttribute(u,e),o?ga.addScaledVector(Gc,h):ga.addScaledVector(Gc.sub(t),h))}t.add(ga)}return t}raycast(e,t){let n=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),da.copy(n.boundingSphere),da.applyMatrix4(s),ur.copy(e.ray).recast(e.near),!(da.containsPoint(ur.origin)===!1&&(ur.intersectSphere(da,Ou)===null||ur.origin.distanceToSquared(Ou)>(e.far-e.near)**2))&&(Fu.copy(s).invert(),ur.copy(e.ray).applyMatrix4(Fu),!(n.boundingBox!==null&&ur.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,ur)))}_computeIntersections(e,t,n){let r,s=this.geometry,o=this.material,a=s.index,l=s.attributes.position,c=s.attributes.uv,h=s.attributes.uv1,u=s.attributes.normal,d=s.groups,f=s.drawRange;if(a!==null)if(Array.isArray(o))for(let m=0,v=d.length;m<v;m++){let g=d[m],p=o[g.materialIndex],E=Math.max(g.start,f.start),b=Math.min(a.count,Math.min(g.start+g.count,f.start+f.count));for(let y=E,T=b;y<T;y+=3){let A=a.getX(y),C=a.getX(y+1),D=a.getX(y+2);r=_a(this,p,e,n,c,h,u,A,C,D),r&&(r.faceIndex=Math.floor(y/3),r.face.materialIndex=g.materialIndex,t.push(r))}}else{let m=Math.max(0,f.start),v=Math.min(a.count,f.start+f.count);for(let g=m,p=v;g<p;g+=3){let E=a.getX(g),b=a.getX(g+1),y=a.getX(g+2);r=_a(this,o,e,n,c,h,u,E,b,y),r&&(r.faceIndex=Math.floor(g/3),t.push(r))}}else if(l!==void 0)if(Array.isArray(o))for(let m=0,v=d.length;m<v;m++){let g=d[m],p=o[g.materialIndex],E=Math.max(g.start,f.start),b=Math.min(l.count,Math.min(g.start+g.count,f.start+f.count));for(let y=E,T=b;y<T;y+=3){let A=y,C=y+1,D=y+2;r=_a(this,p,e,n,c,h,u,A,C,D),r&&(r.faceIndex=Math.floor(y/3),r.face.materialIndex=g.materialIndex,t.push(r))}}else{let m=Math.max(0,f.start),v=Math.min(l.count,f.start+f.count);for(let g=m,p=v;g<p;g+=3){let E=g,b=g+1,y=g+2;r=_a(this,o,e,n,c,h,u,E,b,y),r&&(r.faceIndex=Math.floor(g/3),t.push(r))}}}};function Zp(i,e,t,n,r,s,o,a){let l;if(e.side===cn?l=n.intersectTriangle(o,s,r,!0,a):l=n.intersectTriangle(r,s,o,e.side===zn,a),l===null)return null;xa.copy(a),xa.applyMatrix4(i.matrixWorld);let c=t.ray.origin.distanceTo(xa);return c<t.near||c>t.far?null:{distance:c,point:xa.clone(),object:i}}function _a(i,e,t,n,r,s,o,a,l,c){i.getVertexPosition(a,fa),i.getVertexPosition(l,pa),i.getVertexPosition(c,ma);let h=Zp(i,e,t,n,fa,pa,ma,Bu);if(h){let u=new R;qi.getBarycoord(Bu,fa,pa,ma,u),r&&(h.uv=qi.getInterpolatedAttribute(r,a,l,c,u,new ye)),s&&(h.uv1=qi.getInterpolatedAttribute(s,a,l,c,u,new ye)),o&&(h.normal=qi.getInterpolatedAttribute(o,a,l,c,u,new R),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));let d={a,b:l,c,normal:new R,materialIndex:0};qi.getNormal(fa,pa,ma,d.normal),h.face=d,h.barycoord=u}return h}var ii=class i extends qt{constructor(e=1,t=1,n=1,r=1,s=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:r,heightSegments:s,depthSegments:o};let a=this;r=Math.floor(r),s=Math.floor(s),o=Math.floor(o);let l=[],c=[],h=[],u=[],d=0,f=0;m("z","y","x",-1,-1,n,t,e,o,s,0),m("z","y","x",1,-1,n,t,-e,o,s,1),m("x","z","y",1,1,e,n,t,r,o,2),m("x","z","y",1,-1,e,n,-t,r,o,3),m("x","y","z",1,-1,e,t,n,r,s,4),m("x","y","z",-1,-1,e,t,-n,r,s,5),this.setIndex(l),this.setAttribute("position",new ft(c,3)),this.setAttribute("normal",new ft(h,3)),this.setAttribute("uv",new ft(u,2));function m(v,g,p,E,b,y,T,A,C,D,S){let M=y/C,P=T/D,z=y/2,G=T/2,$=A/2,X=C+1,Z=D+1,de=0,q=0,ge=new R;for(let Te=0;Te<Z;Te++){let De=Te*P-G;for(let Ze=0;Ze<X;Ze++){let at=Ze*M-z;ge[v]=at*E,ge[g]=De*b,ge[p]=$,c.push(ge.x,ge.y,ge.z),ge[v]=0,ge[g]=0,ge[p]=A>0?1:-1,h.push(ge.x,ge.y,ge.z),u.push(Ze/C),u.push(1-Te/D),de+=1}}for(let Te=0;Te<D;Te++)for(let De=0;De<C;De++){let Ze=d+De+X*Te,at=d+De+X*(Te+1),st=d+(De+1)+X*(Te+1),ct=d+(De+1)+X*Te;l.push(Ze,at,ct),l.push(at,st,ct),q+=6}a.addGroup(f,q,S),f+=q,d+=de}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}};function Pr(i){let e={};for(let t in i){e[t]={};for(let n in i[t]){let r=i[t][n];r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)?r.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=r.clone():Array.isArray(r)?e[t][n]=r.slice():e[t][n]=r}}return e}function rn(i){let e={};for(let t=0;t<i.length;t++){let n=Pr(i[t]);for(let r in n)e[r]=n[r]}return e}function Jp(i){let e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function Th(i){let e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:dt.workingColorSpace}var Jd={clone:Pr,merge:rn},Kp=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,jp=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,mn=class extends Ai{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Kp,this.fragmentShader=jp,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Pr(e.uniforms),this.uniformsGroups=Jp(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let r in this.uniforms){let o=this.uniforms[r].value;o&&o.isTexture?t.uniforms[r]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[r]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[r]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[r]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[r]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[r]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[r]={type:"m4",value:o.toArray()}:t.uniforms[r]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let n={};for(let r in this.extensions)this.extensions[r]===!0&&(n[r]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}},oo=class extends Ht{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ot,this.projectionMatrix=new ot,this.projectionMatrixInverse=new ot,this.coordinateSystem=ti,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}},$i=new R,zu=new ye,ku=new ye,jt=class extends oo{constructor(e=50,t=1,n=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=os*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan($s*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return os*2*Math.atan(Math.tan($s*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){$i.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set($i.x,$i.y).multiplyScalar(-e/$i.z),$i.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set($i.x,$i.y).multiplyScalar(-e/$i.z)}getViewSize(e,t){return this.getViewBounds(e,zu,ku),t.subVectors(ku,zu)}setViewOffset(e,t,n,r,s,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan($s*.5*this.fov)/this.zoom,n=2*t,r=this.aspect*n,s=-.5*r,o=this.view;if(this.view!==null&&this.view.enabled){let l=o.fullWidth,c=o.fullHeight;s+=o.offsetX*r/l,t-=o.offsetY*n/c,r*=o.width/l,n*=o.height/c}let a=this.filmOffset;a!==0&&(s+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}},es=-90,ts=1,Na=class extends Ht{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let r=new jt(es,ts,e,t);r.layers=this.layers,this.add(r);let s=new jt(es,ts,e,t);s.layers=this.layers,this.add(s);let o=new jt(es,ts,e,t);o.layers=this.layers,this.add(o);let a=new jt(es,ts,e,t);a.layers=this.layers,this.add(a);let l=new jt(es,ts,e,t);l.layers=this.layers,this.add(l);let c=new jt(es,ts,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[n,r,s,o,a,l]=t;for(let c of t)this.remove(c);if(e===ti)n.up.set(0,1,0),n.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===Qs)n.up.set(0,-1,0),n.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(let c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[s,o,a,l,c,h]=this.children,u=e.getRenderTarget(),d=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),m=e.xr.enabled;e.xr.enabled=!1;let v=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,r),e.render(t,s),e.setRenderTarget(n,1,r),e.render(t,o),e.setRenderTarget(n,2,r),e.render(t,a),e.setRenderTarget(n,3,r),e.render(t,l),e.setRenderTarget(n,4,r),e.render(t,c),n.texture.generateMipmaps=v,e.setRenderTarget(n,5,r),e.render(t,h),e.setRenderTarget(u,d,f),e.xr.enabled=m,n.texture.needsPMREMUpdate=!0}},ao=class extends pn{constructor(e=[],t=Cr,n,r,s,o,a,l,c,h){super(e,t,n,r,s,o,a,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},Fa=class extends pi{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},r=[n,n,n,n,n,n];this.texture=new ao(r),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},r=new ii(5,5,5),s=new mn({name:"CubemapFromEquirect",uniforms:Pr(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:cn,blending:Di});s.uniforms.tEquirect.value=t;let o=new Ct(r,s),a=t.minFilter;return t.minFilter===ji&&(t.minFilter=ni),new Na(1,10,this).update(e,o),t.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,t=!0,n=!0,r=!0){let s=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,n,r);e.setRenderTarget(s)}},Qt=class extends Ht{constructor(){super(),this.isGroup=!0,this.type="Group"}},Qp={type:"move"},cs=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Qt,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Qt,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new R,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new R),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Qt,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new R,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new R),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let r=null,s=null,o=null,a=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){o=!0;for(let v of e.hand.values()){let g=t.getJointPose(v,n),p=this._getHandJoint(c,v);g!==null&&(p.matrix.fromArray(g.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=g.radius),p.visible=g!==null}let h=c.joints["index-finger-tip"],u=c.joints["thumb-tip"],d=h.position.distanceTo(u.position),f=.02,m=.005;c.inputState.pinching&&d>f+m?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&d<=f-m&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,n),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(r=t.getPose(e.targetRaySpace,n),r===null&&s!==null&&(r=s),r!==null&&(a.matrix.fromArray(r.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,r.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(r.linearVelocity)):a.hasLinearVelocity=!1,r.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(r.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(Qp)))}return a!==null&&(a.visible=r!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let n=new Qt;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}};var lo=class i{constructor(e,t=1,n=1e3){this.isFog=!0,this.name="",this.color=new je(e),this.near=t,this.far=n}clone(){return new i(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}},co=class extends Ht{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new kn,this.environmentIntensity=1,this.environmentRotation=new kn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}};var Hu=new R,Vu=new mt,Gu=new mt,em=new R,Wu=new ot,va=new R,Wc=new mi,Xu=new ot,Xc=new no,ho=class extends Ct{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=jc,this.bindMatrix=new ot,this.bindMatrixInverse=new ot,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){let e=this.geometry;this.boundingBox===null&&(this.boundingBox=new En),this.boundingBox.makeEmpty();let t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,va),this.boundingBox.expandByPoint(va)}computeBoundingSphere(){let e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new mi),this.boundingSphere.makeEmpty();let t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,va),this.boundingSphere.expandByPoint(va)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,t){let n=this.material,r=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Wc.copy(this.boundingSphere),Wc.applyMatrix4(r),e.ray.intersectsSphere(Wc)!==!1&&(Xu.copy(r).invert(),Xc.copy(e.ray).applyMatrix4(Xu),!(this.boundingBox!==null&&Xc.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(e,t,Xc)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){let e=new mt,t=this.geometry.attributes.skinWeight;for(let n=0,r=t.count;n<r;n++){e.fromBufferAttribute(t,n);let s=1/e.manhattanLength();s!==1/0?e.multiplyScalar(s):e.set(1,0,0,0),t.setXYZW(n,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===jc?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===Pd?this.bindMatrixInverse.copy(this.bindMatrix).invert():console.warn("THREE.SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){let n=this.skeleton,r=this.geometry;Vu.fromBufferAttribute(r.attributes.skinIndex,e),Gu.fromBufferAttribute(r.attributes.skinWeight,e),Hu.copy(t).applyMatrix4(this.bindMatrix),t.set(0,0,0);for(let s=0;s<4;s++){let o=Gu.getComponent(s);if(o!==0){let a=Vu.getComponent(s);Wu.multiplyMatrices(n.bones[a].matrixWorld,n.boneInverses[a]),t.addScaledVector(em.copy(Hu).applyMatrix4(Wu),o)}}return t.applyMatrix4(this.bindMatrixInverse)}},hs=class extends Ht{constructor(){super(),this.isBone=!0,this.type="Bone"}},uo=class extends pn{constructor(e=null,t=1,n=1,r,s,o,a,l,c=fn,h=fn,u,d){super(null,o,a,l,c,h,r,s,u,d),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},$u=new ot,tm=new ot,fo=class i{constructor(e=[],t=[]){this.uuid=Ui(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){let e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){console.warn("THREE.Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,r=this.bones.length;n<r;n++)this.boneInverses.push(new ot)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){let n=new ot;this.bones[e]&&n.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){let n=this.bones[e];n&&n.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){let n=this.bones[e];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){let e=this.bones,t=this.boneInverses,n=this.boneMatrices,r=this.boneTexture;for(let s=0,o=e.length;s<o;s++){let a=e[s]?e[s].matrixWorld:tm;$u.multiplyMatrices(a,t[s]),$u.toArray(n,s*16)}r!==null&&(r.needsUpdate=!0)}clone(){return new i(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);let t=new Float32Array(e*e*4);t.set(this.boneMatrices);let n=new uo(t,e,e,Tn,Gn);return n.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=n,this}getBoneByName(e){for(let t=0,n=this.bones.length;t<n;t++){let r=this.bones[t];if(r.name===e)return r}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let n=0,r=e.bones.length;n<r;n++){let s=e.bones[n],o=t[s];o===void 0&&(console.warn("THREE.Skeleton: No bone found with UUID:",s),o=new hs),this.bones.push(o),this.boneInverses.push(new ot().fromArray(e.boneInverses[n]))}return this.init(),this}toJSON(){let e={metadata:{version:4.7,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;let t=this.bones,n=this.boneInverses;for(let r=0,s=t.length;r<s;r++){let o=t[r];e.bones.push(o.uuid);let a=n[r];e.boneInverses.push(a.toArray())}return e}},us=class extends Ot{constructor(e,t,n,r=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=r}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){let e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}},ns=new ot,qu=new ot,ya=[],Yu=new En,nm=new ot,Vs=new Ct,Gs=new mi,ds=class extends Ct{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new us(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let r=0;r<n;r++)this.setMatrixAt(r,nm)}computeBoundingBox(){let e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new En),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,ns),Yu.copy(e.boundingBox).applyMatrix4(ns),this.boundingBox.union(Yu)}computeBoundingSphere(){let e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new mi),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,ns),Gs.copy(e.boundingSphere).applyMatrix4(ns),this.boundingSphere.union(Gs)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){let n=t.morphTargetInfluences,r=this.morphTexture.source.data.data,s=n.length+1,o=e*s+1;for(let a=0;a<n.length;a++)n[a]=r[o+a]}raycast(e,t){let n=this.matrixWorld,r=this.count;if(Vs.geometry=this.geometry,Vs.material=this.material,Vs.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Gs.copy(this.boundingSphere),Gs.applyMatrix4(n),e.ray.intersectsSphere(Gs)!==!1))for(let s=0;s<r;s++){this.getMatrixAt(s,ns),qu.multiplyMatrices(n,ns),Vs.matrixWorld=qu,Vs.raycast(e,ya);for(let o=0,a=ya.length;o<a;o++){let l=ya[o];l.instanceId=s,l.object=this,t.push(l)}ya.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new us(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}setMorphAt(e,t){let n=t.morphTargetInfluences,r=n.length+1;this.morphTexture===null&&(this.morphTexture=new uo(new Float32Array(r*this.count),r,this.count,pl,Gn));let s=this.morphTexture.source.data.data,o=0;for(let c=0;c<n.length;c++)o+=n[c];let a=this.geometry.morphTargetsRelative?1:1-o,l=r*e;s[l]=a,s.set(n,l+1)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}},$c=new R,im=new R,rm=new Ke,di=class{constructor(e=new R(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,r){return this.normal.set(e,t,n),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let r=$c.subVectors(n,t).cross(im.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){let n=e.delta($c),r=this.normal.dot(n);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let s=-(e.start.dot(this.normal)+this.constant)/r;return s<0||s>1?null:t.copy(e.start).addScaledVector(n,s)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||rm.getNormalMatrix(e),r=this.coplanarPoint($c).applyMatrix4(e),s=this.normal.applyMatrix3(n).normalize();return this.constant=-r.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}},dr=new mi,sm=new ye(.5,.5),ba=new R,fs=class{constructor(e=new di,t=new di,n=new di,r=new di,s=new di,o=new di){this.planes=[e,t,n,r,s,o]}set(e,t,n,r,s,o){let a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(n),a[3].copy(r),a[4].copy(s),a[5].copy(o),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=ti,n=!1){let r=this.planes,s=e.elements,o=s[0],a=s[1],l=s[2],c=s[3],h=s[4],u=s[5],d=s[6],f=s[7],m=s[8],v=s[9],g=s[10],p=s[11],E=s[12],b=s[13],y=s[14],T=s[15];if(r[0].setComponents(c-o,f-h,p-m,T-E).normalize(),r[1].setComponents(c+o,f+h,p+m,T+E).normalize(),r[2].setComponents(c+a,f+u,p+v,T+b).normalize(),r[3].setComponents(c-a,f-u,p-v,T-b).normalize(),n)r[4].setComponents(l,d,g,y).normalize(),r[5].setComponents(c-l,f-d,p-g,T-y).normalize();else if(r[4].setComponents(c-l,f-d,p-g,T-y).normalize(),t===ti)r[5].setComponents(c+l,f+d,p+g,T+y).normalize();else if(t===Qs)r[5].setComponents(l,d,g,y).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),dr.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),dr.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(dr)}intersectsSprite(e){dr.center.set(0,0,0);let t=sm.distanceTo(e.center);return dr.radius=.7071067811865476+t,dr.applyMatrix4(e.matrixWorld),this.intersectsSphere(dr)}intersectsSphere(e){let t=this.planes,n=e.center,r=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(n)<r)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let r=t[n];if(ba.x=r.normal.x>0?e.max.x:e.min.x,ba.y=r.normal.y>0?e.max.y:e.min.y,ba.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(ba)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};var po=class extends pn{constructor(e,t,n=Qi,r,s,o,a=fn,l=fn,c,h=ss,u=1){if(h!==ss&&h!==bs)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let d={width:e,height:t,depth:u};super(d,r,s,o,a,l,h,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new ls(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}},mo=class extends pn{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}};var Hn=class i extends qt{constructor(e=1,t=1,n=1,r=32,s=1,o=!1,a=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:r,heightSegments:s,openEnded:o,thetaStart:a,thetaLength:l};let c=this;r=Math.floor(r),s=Math.floor(s);let h=[],u=[],d=[],f=[],m=0,v=[],g=n/2,p=0;E(),o===!1&&(e>0&&b(!0),t>0&&b(!1)),this.setIndex(h),this.setAttribute("position",new ft(u,3)),this.setAttribute("normal",new ft(d,3)),this.setAttribute("uv",new ft(f,2));function E(){let y=new R,T=new R,A=0,C=(t-e)/n;for(let D=0;D<=s;D++){let S=[],M=D/s,P=M*(t-e)+e;for(let z=0;z<=r;z++){let G=z/r,$=G*l+a,X=Math.sin($),Z=Math.cos($);T.x=P*X,T.y=-M*n+g,T.z=P*Z,u.push(T.x,T.y,T.z),y.set(X,C,Z).normalize(),d.push(y.x,y.y,y.z),f.push(G,1-M),S.push(m++)}v.push(S)}for(let D=0;D<r;D++)for(let S=0;S<s;S++){let M=v[S][D],P=v[S+1][D],z=v[S+1][D+1],G=v[S][D+1];(e>0||S!==0)&&(h.push(M,P,G),A+=3),(t>0||S!==s-1)&&(h.push(P,z,G),A+=3)}c.addGroup(p,A,0),p+=A}function b(y){let T=m,A=new ye,C=new R,D=0,S=y===!0?e:t,M=y===!0?1:-1;for(let z=1;z<=r;z++)u.push(0,g*M,0),d.push(0,M,0),f.push(.5,.5),m++;let P=m;for(let z=0;z<=r;z++){let $=z/r*l+a,X=Math.cos($),Z=Math.sin($);C.x=S*Z,C.y=g*M,C.z=S*X,u.push(C.x,C.y,C.z),d.push(0,M,0),A.x=X*.5+.5,A.y=Z*.5*M+.5,f.push(A.x,A.y),m++}for(let z=0;z<r;z++){let G=T+z,$=P+z;y===!0?h.push($,$+1,G):h.push($+1,$,G),D+=3}c.addGroup(p,D,y===!0?1:2),p+=D}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}},br=class i extends Hn{constructor(e=1,t=1,n=32,r=1,s=!1,o=0,a=Math.PI*2){super(0,e,t,n,r,s,o,a),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:n,heightSegments:r,openEnded:s,thetaStart:o,thetaLength:a}}static fromJSON(e){return new i(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}},go=class i extends qt{constructor(e=[],t=[],n=1,r=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:n,detail:r};let s=[],o=[];a(r),c(n),h(),this.setAttribute("position",new ft(s,3)),this.setAttribute("normal",new ft(s.slice(),3)),this.setAttribute("uv",new ft(o,2)),r===0?this.computeVertexNormals():this.normalizeNormals();function a(E){let b=new R,y=new R,T=new R;for(let A=0;A<t.length;A+=3)f(t[A+0],b),f(t[A+1],y),f(t[A+2],T),l(b,y,T,E)}function l(E,b,y,T){let A=T+1,C=[];for(let D=0;D<=A;D++){C[D]=[];let S=E.clone().lerp(y,D/A),M=b.clone().lerp(y,D/A),P=A-D;for(let z=0;z<=P;z++)z===0&&D===A?C[D][z]=S:C[D][z]=S.clone().lerp(M,z/P)}for(let D=0;D<A;D++)for(let S=0;S<2*(A-D)-1;S++){let M=Math.floor(S/2);S%2===0?(d(C[D][M+1]),d(C[D+1][M]),d(C[D][M])):(d(C[D][M+1]),d(C[D+1][M+1]),d(C[D+1][M]))}}function c(E){let b=new R;for(let y=0;y<s.length;y+=3)b.x=s[y+0],b.y=s[y+1],b.z=s[y+2],b.normalize().multiplyScalar(E),s[y+0]=b.x,s[y+1]=b.y,s[y+2]=b.z}function h(){let E=new R;for(let b=0;b<s.length;b+=3){E.x=s[b+0],E.y=s[b+1],E.z=s[b+2];let y=g(E)/2/Math.PI+.5,T=p(E)/Math.PI+.5;o.push(y,1-T)}m(),u()}function u(){for(let E=0;E<o.length;E+=6){let b=o[E+0],y=o[E+2],T=o[E+4],A=Math.max(b,y,T),C=Math.min(b,y,T);A>.9&&C<.1&&(b<.2&&(o[E+0]+=1),y<.2&&(o[E+2]+=1),T<.2&&(o[E+4]+=1))}}function d(E){s.push(E.x,E.y,E.z)}function f(E,b){let y=E*3;b.x=e[y+0],b.y=e[y+1],b.z=e[y+2]}function m(){let E=new R,b=new R,y=new R,T=new R,A=new ye,C=new ye,D=new ye;for(let S=0,M=0;S<s.length;S+=9,M+=6){E.set(s[S+0],s[S+1],s[S+2]),b.set(s[S+3],s[S+4],s[S+5]),y.set(s[S+6],s[S+7],s[S+8]),A.set(o[M+0],o[M+1]),C.set(o[M+2],o[M+3]),D.set(o[M+4],o[M+5]),T.copy(E).add(b).add(y).divideScalar(3);let P=g(T);v(A,M+0,E,P),v(C,M+2,b,P),v(D,M+4,y,P)}}function v(E,b,y,T){T<0&&E.x===1&&(o[b]=E.x-1),y.x===0&&y.z===0&&(o[b]=T/2/Math.PI+.5)}function g(E){return Math.atan2(E.z,-E.x)}function p(E){return Math.atan2(-E.y,Math.sqrt(E.x*E.x+E.z*E.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.vertices,e.indices,e.radius,e.details)}};var wn=class{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){console.warn("THREE.Curve: .getPoint() not implemented.")}getPointAt(e,t){let n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){let e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let t=[],n,r=this.getPoint(0),s=0;t.push(0);for(let o=1;o<=e;o++)n=this.getPoint(o/e),s+=n.distanceTo(r),t.push(s),r=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){let n=this.getLengths(),r=0,s=n.length,o;t?o=t:o=e*n[s-1];let a=0,l=s-1,c;for(;a<=l;)if(r=Math.floor(a+(l-a)/2),c=n[r]-o,c<0)a=r+1;else if(c>0)l=r-1;else{l=r;break}if(r=l,n[r]===o)return r/(s-1);let h=n[r],d=n[r+1]-h,f=(o-h)/d;return(r+f)/(s-1)}getTangent(e,t){let r=e-1e-4,s=e+1e-4;r<0&&(r=0),s>1&&(s=1);let o=this.getPoint(r),a=this.getPoint(s),l=t||(o.isVector2?new ye:new R);return l.copy(a).sub(o).normalize(),l}getTangentAt(e,t){let n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t=!1){let n=new R,r=[],s=[],o=[],a=new R,l=new ot;for(let f=0;f<=e;f++){let m=f/e;r[f]=this.getTangentAt(m,new R)}s[0]=new R,o[0]=new R;let c=Number.MAX_VALUE,h=Math.abs(r[0].x),u=Math.abs(r[0].y),d=Math.abs(r[0].z);h<=c&&(c=h,n.set(1,0,0)),u<=c&&(c=u,n.set(0,1,0)),d<=c&&n.set(0,0,1),a.crossVectors(r[0],n).normalize(),s[0].crossVectors(r[0],a),o[0].crossVectors(r[0],s[0]);for(let f=1;f<=e;f++){if(s[f]=s[f-1].clone(),o[f]=o[f-1].clone(),a.crossVectors(r[f-1],r[f]),a.length()>Number.EPSILON){a.normalize();let m=Math.acos(rt(r[f-1].dot(r[f]),-1,1));s[f].applyMatrix4(l.makeRotationAxis(a,m))}o[f].crossVectors(r[f],s[f])}if(t===!0){let f=Math.acos(rt(s[0].dot(s[e]),-1,1));f/=e,r[0].dot(a.crossVectors(s[0],s[e]))>0&&(f=-f);for(let m=1;m<=e;m++)s[m].applyMatrix4(l.makeRotationAxis(r[m],f*m)),o[m].crossVectors(r[m],s[m])}return{tangents:r,normals:s,binormals:o}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){let e={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}},ps=class extends wn{constructor(e=0,t=0,n=1,r=1,s=0,o=Math.PI*2,a=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=r,this.aStartAngle=s,this.aEndAngle=o,this.aClockwise=a,this.aRotation=l}getPoint(e,t=new ye){let n=t,r=Math.PI*2,s=this.aEndAngle-this.aStartAngle,o=Math.abs(s)<Number.EPSILON;for(;s<0;)s+=r;for(;s>r;)s-=r;s<Number.EPSILON&&(o?s=0:s=r),this.aClockwise===!0&&!o&&(s===r?s=-r:s=s-r);let a=this.aStartAngle+e*s,l=this.aX+this.xRadius*Math.cos(a),c=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){let h=Math.cos(this.aRotation),u=Math.sin(this.aRotation),d=l-this.aX,f=c-this.aY;l=d*h-f*u+this.aX,c=d*u+f*h+this.aY}return n.set(l,c)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){let e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}},Oa=class extends ps{constructor(e,t,n,r,s,o){super(e,t,n,n,r,s,o),this.isArcCurve=!0,this.type="ArcCurve"}};function Ah(){let i=0,e=0,t=0,n=0;function r(s,o,a,l){i=s,e=a,t=-3*s+3*o-2*a-l,n=2*s-2*o+a+l}return{initCatmullRom:function(s,o,a,l,c){r(o,a,c*(a-s),c*(l-o))},initNonuniformCatmullRom:function(s,o,a,l,c,h,u){let d=(o-s)/c-(a-s)/(c+h)+(a-o)/h,f=(a-o)/h-(l-o)/(h+u)+(l-a)/u;d*=h,f*=h,r(o,a,d,f)},calc:function(s){let o=s*s,a=o*s;return i+e*s+t*o+n*a}}}var Ma=new R,qc=new Ah,Yc=new Ah,Zc=new Ah,ms=class extends wn{constructor(e=[],t=!1,n="centripetal",r=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=n,this.tension=r}getPoint(e,t=new R){let n=t,r=this.points,s=r.length,o=(s-(this.closed?0:1))*e,a=Math.floor(o),l=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/s)+1)*s:l===0&&a===s-1&&(a=s-2,l=1);let c,h;this.closed||a>0?c=r[(a-1)%s]:(Ma.subVectors(r[0],r[1]).add(r[0]),c=Ma);let u=r[a%s],d=r[(a+1)%s];if(this.closed||a+2<s?h=r[(a+2)%s]:(Ma.subVectors(r[s-1],r[s-2]).add(r[s-1]),h=Ma),this.curveType==="centripetal"||this.curveType==="chordal"){let f=this.curveType==="chordal"?.5:.25,m=Math.pow(c.distanceToSquared(u),f),v=Math.pow(u.distanceToSquared(d),f),g=Math.pow(d.distanceToSquared(h),f);v<1e-4&&(v=1),m<1e-4&&(m=v),g<1e-4&&(g=v),qc.initNonuniformCatmullRom(c.x,u.x,d.x,h.x,m,v,g),Yc.initNonuniformCatmullRom(c.y,u.y,d.y,h.y,m,v,g),Zc.initNonuniformCatmullRom(c.z,u.z,d.z,h.z,m,v,g)}else this.curveType==="catmullrom"&&(qc.initCatmullRom(c.x,u.x,d.x,h.x,this.tension),Yc.initCatmullRom(c.y,u.y,d.y,h.y,this.tension),Zc.initCatmullRom(c.z,u.z,d.z,h.z,this.tension));return n.set(qc.calc(l),Yc.calc(l),Zc.calc(l)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let r=e.points[t];this.points.push(r.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let r=this.points[t];e.points.push(r.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let r=e.points[t];this.points.push(new R().fromArray(r))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}};function Zu(i,e,t,n,r){let s=(n-e)*.5,o=(r-t)*.5,a=i*i,l=i*a;return(2*t-2*n+s+o)*l+(-3*t+3*n-2*s-o)*a+s*i+t}function om(i,e){let t=1-i;return t*t*e}function am(i,e){return 2*(1-i)*i*e}function lm(i,e){return i*i*e}function Ys(i,e,t,n){return om(i,e)+am(i,t)+lm(i,n)}function cm(i,e){let t=1-i;return t*t*t*e}function hm(i,e){let t=1-i;return 3*t*t*i*e}function um(i,e){return 3*(1-i)*i*i*e}function dm(i,e){return i*i*i*e}function Zs(i,e,t,n,r){return cm(i,e)+hm(i,t)+um(i,n)+dm(i,r)}var xo=class extends wn{constructor(e=new ye,t=new ye,n=new ye,r=new ye){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=n,this.v3=r}getPoint(e,t=new ye){let n=t,r=this.v0,s=this.v1,o=this.v2,a=this.v3;return n.set(Zs(e,r.x,s.x,o.x,a.x),Zs(e,r.y,s.y,o.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},Ba=class extends wn{constructor(e=new R,t=new R,n=new R,r=new R){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=n,this.v3=r}getPoint(e,t=new R){let n=t,r=this.v0,s=this.v1,o=this.v2,a=this.v3;return n.set(Zs(e,r.x,s.x,o.x,a.x),Zs(e,r.y,s.y,o.y,a.y),Zs(e,r.z,s.z,o.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},_o=class extends wn{constructor(e=new ye,t=new ye){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new ye){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new ye){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},za=class extends wn{constructor(e=new R,t=new R){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new R){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new R){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},vo=class extends wn{constructor(e=new ye,t=new ye,n=new ye){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new ye){let n=t,r=this.v0,s=this.v1,o=this.v2;return n.set(Ys(e,r.x,s.x,o.x),Ys(e,r.y,s.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},yo=class extends wn{constructor(e=new R,t=new R,n=new R){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new R){let n=t,r=this.v0,s=this.v1,o=this.v2;return n.set(Ys(e,r.x,s.x,o.x),Ys(e,r.y,s.y,o.y),Ys(e,r.z,s.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},bo=class extends wn{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new ye){let n=t,r=this.points,s=(r.length-1)*e,o=Math.floor(s),a=s-o,l=r[o===0?o:o-1],c=r[o],h=r[o>r.length-2?r.length-1:o+1],u=r[o>r.length-3?r.length-1:o+2];return n.set(Zu(a,l.x,c.x,h.x,u.x),Zu(a,l.y,c.y,h.y,u.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let r=e.points[t];this.points.push(r.clone())}return this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let r=this.points[t];e.points.push(r.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let r=e.points[t];this.points.push(new ye().fromArray(r))}return this}},ka=Object.freeze({__proto__:null,ArcCurve:Oa,CatmullRomCurve3:ms,CubicBezierCurve:xo,CubicBezierCurve3:Ba,EllipseCurve:ps,LineCurve:_o,LineCurve3:za,QuadraticBezierCurve:vo,QuadraticBezierCurve3:yo,SplineCurve:bo}),Ha=class extends wn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){let e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){let n=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new ka[n](t,e))}return this}getPoint(e,t){let n=e*this.getLength(),r=this.getCurveLengths(),s=0;for(;s<r.length;){if(r[s]>=n){let o=r[s]-n,a=this.curves[s],l=a.getLength(),c=l===0?0:1-o/l;return a.getPointAt(c,t)}s++}return null}getLength(){let e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let e=[],t=0;for(let n=0,r=this.curves.length;n<r;n++)t+=this.curves[n].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){let t=[],n;for(let r=0,s=this.curves;r<s.length;r++){let o=s[r],a=o.isEllipseCurve?e*2:o.isLineCurve||o.isLineCurve3?1:o.isSplineCurve?e*o.points.length:e,l=o.getPoints(a);for(let c=0;c<l.length;c++){let h=l[c];n&&n.equals(h)||(t.push(h),n=h)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let r=e.curves[t];this.curves.push(r.clone())}return this.autoClose=e.autoClose,this}toJSON(){let e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,n=this.curves.length;t<n;t++){let r=this.curves[t];e.curves.push(r.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let r=e.curves[t];this.curves.push(new ka[r.type]().fromJSON(r))}return this}},Mo=class extends Ha{constructor(e){super(),this.type="Path",this.currentPoint=new ye,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,n=e.length;t<n;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){let n=new _o(this.currentPoint.clone(),new ye(e,t));return this.curves.push(n),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,n,r){let s=new vo(this.currentPoint.clone(),new ye(e,t),new ye(n,r));return this.curves.push(s),this.currentPoint.set(n,r),this}bezierCurveTo(e,t,n,r,s,o){let a=new xo(this.currentPoint.clone(),new ye(e,t),new ye(n,r),new ye(s,o));return this.curves.push(a),this.currentPoint.set(s,o),this}splineThru(e){let t=[this.currentPoint.clone()].concat(e),n=new bo(t);return this.curves.push(n),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,n,r,s,o){let a=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(e+a,t+l,n,r,s,o),this}absarc(e,t,n,r,s,o){return this.absellipse(e,t,n,n,r,s,o),this}ellipse(e,t,n,r,s,o,a,l){let c=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(e+c,t+h,n,r,s,o,a,l),this}absellipse(e,t,n,r,s,o,a,l){let c=new ps(e,t,n,r,s,o,a,l);if(this.curves.length>0){let u=c.getPoint(0);u.equals(this.currentPoint)||this.lineTo(u.x,u.y)}this.curves.push(c);let h=c.getPoint(1);return this.currentPoint.copy(h),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){let e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}},Ji=class extends Mo{constructor(e){super(e),this.uuid=Ui(),this.type="Shape",this.holes=[]}getPointsHoles(e){let t=[];for(let n=0,r=this.holes.length;n<r;n++)t[n]=this.holes[n].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){let r=e.holes[t];this.holes.push(r.clone())}return this}toJSON(){let e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,n=this.holes.length;t<n;t++){let r=this.holes[t];e.holes.push(r.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){let r=e.holes[t];this.holes.push(new Mo().fromJSON(r))}return this}};function fm(i,e,t=2){let n=e&&e.length,r=n?e[0]*t:i.length,s=Kd(i,0,r,t,!0),o=[];if(!s||s.next===s.prev)return o;let a,l,c;if(n&&(s=_m(i,e,s,t)),i.length>80*t){a=1/0,l=1/0;let h=-1/0,u=-1/0;for(let d=t;d<r;d+=t){let f=i[d],m=i[d+1];f<a&&(a=f),m<l&&(l=m),f>h&&(h=f),m>u&&(u=m)}c=Math.max(h-a,u-l),c=c!==0?32767/c:0}return So(s,o,t,a,l,c,0),o}function Kd(i,e,t,n,r){let s;if(r===Cm(i,e,t,n)>0)for(let o=e;o<t;o+=n)s=Ju(o/n|0,i[o],i[o+1],s);else for(let o=t-n;o>=e;o-=n)s=Ju(o/n|0,i[o],i[o+1],s);return s&&gs(s,s.next)&&(wo(s),s=s.next),s}function Mr(i,e){if(!i)return i;e||(e=i);let t=i,n;do if(n=!1,!t.steiner&&(gs(t,t.next)||At(t.prev,t,t.next)===0)){if(wo(t),t=e=t.prev,t===t.next)break;n=!0}else t=t.next;while(n||t!==e);return e}function So(i,e,t,n,r,s,o){if(!i)return;!o&&s&&Sm(i,n,r,s);let a=i;for(;i.prev!==i.next;){let l=i.prev,c=i.next;if(s?mm(i,n,r,s):pm(i)){e.push(l.i,i.i,c.i),wo(i),i=c.next,a=c.next;continue}if(i=c,i===a){o?o===1?(i=gm(Mr(i),e),So(i,e,t,n,r,s,2)):o===2&&xm(i,e,t,n,r,s):So(Mr(i),e,t,n,r,s,1);break}}}function pm(i){let e=i.prev,t=i,n=i.next;if(At(e,t,n)>=0)return!1;let r=e.x,s=t.x,o=n.x,a=e.y,l=t.y,c=n.y,h=Math.min(r,s,o),u=Math.min(a,l,c),d=Math.max(r,s,o),f=Math.max(a,l,c),m=n.next;for(;m!==e;){if(m.x>=h&&m.x<=d&&m.y>=u&&m.y<=f&&Xs(r,a,s,l,o,c,m.x,m.y)&&At(m.prev,m,m.next)>=0)return!1;m=m.next}return!0}function mm(i,e,t,n){let r=i.prev,s=i,o=i.next;if(At(r,s,o)>=0)return!1;let a=r.x,l=s.x,c=o.x,h=r.y,u=s.y,d=o.y,f=Math.min(a,l,c),m=Math.min(h,u,d),v=Math.max(a,l,c),g=Math.max(h,u,d),p=th(f,m,e,t,n),E=th(v,g,e,t,n),b=i.prevZ,y=i.nextZ;for(;b&&b.z>=p&&y&&y.z<=E;){if(b.x>=f&&b.x<=v&&b.y>=m&&b.y<=g&&b!==r&&b!==o&&Xs(a,h,l,u,c,d,b.x,b.y)&&At(b.prev,b,b.next)>=0||(b=b.prevZ,y.x>=f&&y.x<=v&&y.y>=m&&y.y<=g&&y!==r&&y!==o&&Xs(a,h,l,u,c,d,y.x,y.y)&&At(y.prev,y,y.next)>=0))return!1;y=y.nextZ}for(;b&&b.z>=p;){if(b.x>=f&&b.x<=v&&b.y>=m&&b.y<=g&&b!==r&&b!==o&&Xs(a,h,l,u,c,d,b.x,b.y)&&At(b.prev,b,b.next)>=0)return!1;b=b.prevZ}for(;y&&y.z<=E;){if(y.x>=f&&y.x<=v&&y.y>=m&&y.y<=g&&y!==r&&y!==o&&Xs(a,h,l,u,c,d,y.x,y.y)&&At(y.prev,y,y.next)>=0)return!1;y=y.nextZ}return!0}function gm(i,e){let t=i;do{let n=t.prev,r=t.next.next;!gs(n,r)&&Qd(n,t,t.next,r)&&Eo(n,r)&&Eo(r,n)&&(e.push(n.i,t.i,r.i),wo(t),wo(t.next),t=i=r),t=t.next}while(t!==i);return Mr(t)}function xm(i,e,t,n,r,s){let o=i;do{let a=o.next.next;for(;a!==o.prev;){if(o.i!==a.i&&Tm(o,a)){let l=ef(o,a);o=Mr(o,o.next),l=Mr(l,l.next),So(o,e,t,n,r,s,0),So(l,e,t,n,r,s,0);return}a=a.next}o=o.next}while(o!==i)}function _m(i,e,t,n){let r=[];for(let s=0,o=e.length;s<o;s++){let a=e[s]*n,l=s<o-1?e[s+1]*n:i.length,c=Kd(i,a,l,n,!1);c===c.next&&(c.steiner=!0),r.push(wm(c))}r.sort(vm);for(let s=0;s<r.length;s++)t=ym(r[s],t);return t}function vm(i,e){let t=i.x-e.x;if(t===0&&(t=i.y-e.y,t===0)){let n=(i.next.y-i.y)/(i.next.x-i.x),r=(e.next.y-e.y)/(e.next.x-e.x);t=n-r}return t}function ym(i,e){let t=bm(i,e);if(!t)return e;let n=ef(t,i);return Mr(n,n.next),Mr(t,t.next)}function bm(i,e){let t=e,n=i.x,r=i.y,s=-1/0,o;if(gs(i,t))return t;do{if(gs(i,t.next))return t.next;if(r<=t.y&&r>=t.next.y&&t.next.y!==t.y){let u=t.x+(r-t.y)*(t.next.x-t.x)/(t.next.y-t.y);if(u<=n&&u>s&&(s=u,o=t.x<t.next.x?t:t.next,u===n))return o}t=t.next}while(t!==e);if(!o)return null;let a=o,l=o.x,c=o.y,h=1/0;t=o;do{if(n>=t.x&&t.x>=l&&n!==t.x&&jd(r<c?n:s,r,l,c,r<c?s:n,r,t.x,t.y)){let u=Math.abs(r-t.y)/(n-t.x);Eo(t,i)&&(u<h||u===h&&(t.x>o.x||t.x===o.x&&Mm(o,t)))&&(o=t,h=u)}t=t.next}while(t!==a);return o}function Mm(i,e){return At(i.prev,i,e.prev)<0&&At(e.next,i,i.next)<0}function Sm(i,e,t,n){let r=i;do r.z===0&&(r.z=th(r.x,r.y,e,t,n)),r.prevZ=r.prev,r.nextZ=r.next,r=r.next;while(r!==i);r.prevZ.nextZ=null,r.prevZ=null,Em(r)}function Em(i){let e,t=1;do{let n=i,r;i=null;let s=null;for(e=0;n;){e++;let o=n,a=0;for(let c=0;c<t&&(a++,o=o.nextZ,!!o);c++);let l=t;for(;a>0||l>0&&o;)a!==0&&(l===0||!o||n.z<=o.z)?(r=n,n=n.nextZ,a--):(r=o,o=o.nextZ,l--),s?s.nextZ=r:i=r,r.prevZ=s,s=r;n=o}s.nextZ=null,t*=2}while(e>1);return i}function th(i,e,t,n,r){return i=(i-t)*r|0,e=(e-n)*r|0,i=(i|i<<8)&16711935,i=(i|i<<4)&252645135,i=(i|i<<2)&858993459,i=(i|i<<1)&1431655765,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,i|e<<1}function wm(i){let e=i,t=i;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==i);return t}function jd(i,e,t,n,r,s,o,a){return(r-o)*(e-a)>=(i-o)*(s-a)&&(i-o)*(n-a)>=(t-o)*(e-a)&&(t-o)*(s-a)>=(r-o)*(n-a)}function Xs(i,e,t,n,r,s,o,a){return!(i===o&&e===a)&&jd(i,e,t,n,r,s,o,a)}function Tm(i,e){return i.next.i!==e.i&&i.prev.i!==e.i&&!Am(i,e)&&(Eo(i,e)&&Eo(e,i)&&Rm(i,e)&&(At(i.prev,i,e.prev)||At(i,e.prev,e))||gs(i,e)&&At(i.prev,i,i.next)>0&&At(e.prev,e,e.next)>0)}function At(i,e,t){return(e.y-i.y)*(t.x-e.x)-(e.x-i.x)*(t.y-e.y)}function gs(i,e){return i.x===e.x&&i.y===e.y}function Qd(i,e,t,n){let r=Ea(At(i,e,t)),s=Ea(At(i,e,n)),o=Ea(At(t,n,i)),a=Ea(At(t,n,e));return!!(r!==s&&o!==a||r===0&&Sa(i,t,e)||s===0&&Sa(i,n,e)||o===0&&Sa(t,i,n)||a===0&&Sa(t,e,n))}function Sa(i,e,t){return e.x<=Math.max(i.x,t.x)&&e.x>=Math.min(i.x,t.x)&&e.y<=Math.max(i.y,t.y)&&e.y>=Math.min(i.y,t.y)}function Ea(i){return i>0?1:i<0?-1:0}function Am(i,e){let t=i;do{if(t.i!==i.i&&t.next.i!==i.i&&t.i!==e.i&&t.next.i!==e.i&&Qd(t,t.next,i,e))return!0;t=t.next}while(t!==i);return!1}function Eo(i,e){return At(i.prev,i,i.next)<0?At(i,e,i.next)>=0&&At(i,i.prev,e)>=0:At(i,e,i.prev)<0||At(i,i.next,e)<0}function Rm(i,e){let t=i,n=!1,r=(i.x+e.x)/2,s=(i.y+e.y)/2;do t.y>s!=t.next.y>s&&t.next.y!==t.y&&r<(t.next.x-t.x)*(s-t.y)/(t.next.y-t.y)+t.x&&(n=!n),t=t.next;while(t!==i);return n}function ef(i,e){let t=nh(i.i,i.x,i.y),n=nh(e.i,e.x,e.y),r=i.next,s=e.prev;return i.next=e,e.prev=i,t.next=r,r.prev=t,n.next=t,t.prev=n,s.next=n,n.prev=s,n}function Ju(i,e,t,n){let r=nh(i,e,t);return n?(r.next=n.next,r.prev=n,n.next.prev=r,n.next=r):(r.prev=r,r.next=r),r}function wo(i){i.next.prev=i.prev,i.prev.next=i.next,i.prevZ&&(i.prevZ.nextZ=i.nextZ),i.nextZ&&(i.nextZ.prevZ=i.prevZ)}function nh(i,e,t){return{i,x:e,y:t,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function Cm(i,e,t,n){let r=0;for(let s=e,o=t-n;s<t;s+=n)r+=(i[o]-i[s])*(i[s+1]+i[o+1]),o=s;return r}var ih=class{static triangulate(e,t,n=2){return fm(e,t,n)}},gr=class i{static area(e){let t=e.length,n=0;for(let r=t-1,s=0;s<t;r=s++)n+=e[r].x*e[s].y-e[s].x*e[r].y;return n*.5}static isClockWise(e){return i.area(e)<0}static triangulateShape(e,t){let n=[],r=[],s=[];Ku(e),ju(n,e);let o=e.length;t.forEach(Ku);for(let l=0;l<t.length;l++)r.push(o),o+=t[l].length,ju(n,t[l]);let a=ih.triangulate(n,r);for(let l=0;l<a.length;l+=3)s.push(a.slice(l,l+3));return s}};function Ku(i){let e=i.length;e>2&&i[e-1].equals(i[0])&&i.pop()}function ju(i,e){for(let t=0;t<e.length;t++)i.push(e[t].x),i.push(e[t].y)}var Sr=class i extends qt{constructor(e=new Ji([new ye(.5,.5),new ye(-.5,.5),new ye(-.5,-.5),new ye(.5,-.5)]),t={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:e,options:t},e=Array.isArray(e)?e:[e];let n=this,r=[],s=[];for(let a=0,l=e.length;a<l;a++){let c=e[a];o(c)}this.setAttribute("position",new ft(r,3)),this.setAttribute("uv",new ft(s,2)),this.computeVertexNormals();function o(a){let l=[],c=t.curveSegments!==void 0?t.curveSegments:12,h=t.steps!==void 0?t.steps:1,u=t.depth!==void 0?t.depth:1,d=t.bevelEnabled!==void 0?t.bevelEnabled:!0,f=t.bevelThickness!==void 0?t.bevelThickness:.2,m=t.bevelSize!==void 0?t.bevelSize:f-.1,v=t.bevelOffset!==void 0?t.bevelOffset:0,g=t.bevelSegments!==void 0?t.bevelSegments:3,p=t.extrudePath,E=t.UVGenerator!==void 0?t.UVGenerator:Im,b,y=!1,T,A,C,D;p&&(b=p.getSpacedPoints(h),y=!0,d=!1,T=p.computeFrenetFrames(h,!1),A=new R,C=new R,D=new R),d||(g=0,f=0,m=0,v=0);let S=a.extractPoints(c),M=S.shape,P=S.holes;if(!gr.isClockWise(M)){M=M.reverse();for(let oe=0,te=P.length;oe<te;oe++){let Q=P[oe];gr.isClockWise(Q)&&(P[oe]=Q.reverse())}}function G(oe){let Q=10000000000000001e-36,j=oe[0];for(let _e=1;_e<=oe.length;_e++){let le=_e%oe.length,ve=oe[le],qe=ve.x-j.x,We=ve.y-j.y,w=qe*qe+We*We,_=Math.max(Math.abs(ve.x),Math.abs(ve.y),Math.abs(j.x),Math.abs(j.y)),B=Q*_*_;if(w<=B){oe.splice(le,1),_e--;continue}j=ve}}G(M),P.forEach(G);let $=P.length,X=M;for(let oe=0;oe<$;oe++){let te=P[oe];M=M.concat(te)}function Z(oe,te,Q){return te||console.error("THREE.ExtrudeGeometry: vec does not exist"),oe.clone().addScaledVector(te,Q)}let de=M.length;function q(oe,te,Q){let j,_e,le,ve=oe.x-te.x,qe=oe.y-te.y,We=Q.x-oe.x,w=Q.y-oe.y,_=ve*ve+qe*qe,B=ve*w-qe*We;if(Math.abs(B)>Number.EPSILON){let W=Math.sqrt(_),ne=Math.sqrt(We*We+w*w),Y=te.x-qe/W,Le=te.y+ve/W,ce=Q.x-w/ne,Ue=Q.y+We/ne,Fe=((ce-Y)*w-(Ue-Le)*We)/(ve*w-qe*We);j=Y+ve*Fe-oe.x,_e=Le+qe*Fe-oe.y;let he=j*j+_e*_e;if(he<=2)return new ye(j,_e);le=Math.sqrt(he/2)}else{let W=!1;ve>Number.EPSILON?We>Number.EPSILON&&(W=!0):ve<-Number.EPSILON?We<-Number.EPSILON&&(W=!0):Math.sign(qe)===Math.sign(w)&&(W=!0),W?(j=-qe,_e=ve,le=Math.sqrt(_)):(j=ve,_e=qe,le=Math.sqrt(_/2))}return new ye(j/le,_e/le)}let ge=[];for(let oe=0,te=X.length,Q=te-1,j=oe+1;oe<te;oe++,Q++,j++)Q===te&&(Q=0),j===te&&(j=0),ge[oe]=q(X[oe],X[Q],X[j]);let Te=[],De,Ze=ge.concat();for(let oe=0,te=$;oe<te;oe++){let Q=P[oe];De=[];for(let j=0,_e=Q.length,le=_e-1,ve=j+1;j<_e;j++,le++,ve++)le===_e&&(le=0),ve===_e&&(ve=0),De[j]=q(Q[j],Q[le],Q[ve]);Te.push(De),Ze=Ze.concat(De)}let at;if(g===0)at=gr.triangulateShape(X,P);else{let oe=[],te=[];for(let Q=0;Q<g;Q++){let j=Q/g,_e=f*Math.cos(j*Math.PI/2),le=m*Math.sin(j*Math.PI/2)+v;for(let ve=0,qe=X.length;ve<qe;ve++){let We=Z(X[ve],ge[ve],le);ze(We.x,We.y,-_e),j===0&&oe.push(We)}for(let ve=0,qe=$;ve<qe;ve++){let We=P[ve];De=Te[ve];let w=[];for(let _=0,B=We.length;_<B;_++){let W=Z(We[_],De[_],le);ze(W.x,W.y,-_e),j===0&&w.push(W)}j===0&&te.push(w)}}at=gr.triangulateShape(oe,te)}let st=at.length,ct=m+v;for(let oe=0;oe<de;oe++){let te=d?Z(M[oe],Ze[oe],ct):M[oe];y?(C.copy(T.normals[0]).multiplyScalar(te.x),A.copy(T.binormals[0]).multiplyScalar(te.y),D.copy(b[0]).add(C).add(A),ze(D.x,D.y,D.z)):ze(te.x,te.y,0)}for(let oe=1;oe<=h;oe++)for(let te=0;te<de;te++){let Q=d?Z(M[te],Ze[te],ct):M[te];y?(C.copy(T.normals[oe]).multiplyScalar(Q.x),A.copy(T.binormals[oe]).multiplyScalar(Q.y),D.copy(b[oe]).add(C).add(A),ze(D.x,D.y,D.z)):ze(Q.x,Q.y,u/h*oe)}for(let oe=g-1;oe>=0;oe--){let te=oe/g,Q=f*Math.cos(te*Math.PI/2),j=m*Math.sin(te*Math.PI/2)+v;for(let _e=0,le=X.length;_e<le;_e++){let ve=Z(X[_e],ge[_e],j);ze(ve.x,ve.y,u+Q)}for(let _e=0,le=P.length;_e<le;_e++){let ve=P[_e];De=Te[_e];for(let qe=0,We=ve.length;qe<We;qe++){let w=Z(ve[qe],De[qe],j);y?ze(w.x,w.y+b[h-1].y,b[h-1].x+Q):ze(w.x,w.y,u+Q)}}}K(),se();function K(){let oe=r.length/3;if(d){let te=0,Q=de*te;for(let j=0;j<st;j++){let _e=at[j];Ne(_e[2]+Q,_e[1]+Q,_e[0]+Q)}te=h+g*2,Q=de*te;for(let j=0;j<st;j++){let _e=at[j];Ne(_e[0]+Q,_e[1]+Q,_e[2]+Q)}}else{for(let te=0;te<st;te++){let Q=at[te];Ne(Q[2],Q[1],Q[0])}for(let te=0;te<st;te++){let Q=at[te];Ne(Q[0]+de*h,Q[1]+de*h,Q[2]+de*h)}}n.addGroup(oe,r.length/3-oe,0)}function se(){let oe=r.length/3,te=0;Ce(X,te),te+=X.length;for(let Q=0,j=P.length;Q<j;Q++){let _e=P[Q];Ce(_e,te),te+=_e.length}n.addGroup(oe,r.length/3-oe,1)}function Ce(oe,te){let Q=oe.length;for(;--Q>=0;){let j=Q,_e=Q-1;_e<0&&(_e=oe.length-1);for(let le=0,ve=h+g*2;le<ve;le++){let qe=de*le,We=de*(le+1),w=te+j+qe,_=te+_e+qe,B=te+_e+We,W=te+j+We;et(w,_,B,W)}}}function ze(oe,te,Q){l.push(oe),l.push(te),l.push(Q)}function Ne(oe,te,Q){tt(oe),tt(te),tt(Q);let j=r.length/3,_e=E.generateTopUV(n,r,j-3,j-2,j-1);I(_e[0]),I(_e[1]),I(_e[2])}function et(oe,te,Q,j){tt(oe),tt(te),tt(j),tt(te),tt(Q),tt(j);let _e=r.length/3,le=E.generateSideWallUV(n,r,_e-6,_e-3,_e-2,_e-1);I(le[0]),I(le[1]),I(le[3]),I(le[1]),I(le[2]),I(le[3])}function tt(oe){r.push(l[oe*3+0]),r.push(l[oe*3+1]),r.push(l[oe*3+2])}function I(oe){s.push(oe.x),s.push(oe.y)}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON(),t=this.parameters.shapes,n=this.parameters.options;return Pm(t,n,e)}static fromJSON(e,t){let n=[];for(let s=0,o=e.shapes.length;s<o;s++){let a=t[e.shapes[s]];n.push(a)}let r=e.options.extrudePath;return r!==void 0&&(e.options.extrudePath=new ka[r.type]().fromJSON(r)),new i(n,e.options)}},Im={generateTopUV:function(i,e,t,n,r){let s=e[t*3],o=e[t*3+1],a=e[n*3],l=e[n*3+1],c=e[r*3],h=e[r*3+1];return[new ye(s,o),new ye(a,l),new ye(c,h)]},generateSideWallUV:function(i,e,t,n,r,s){let o=e[t*3],a=e[t*3+1],l=e[t*3+2],c=e[n*3],h=e[n*3+1],u=e[n*3+2],d=e[r*3],f=e[r*3+1],m=e[r*3+2],v=e[s*3],g=e[s*3+1],p=e[s*3+2];return Math.abs(a-h)<Math.abs(o-c)?[new ye(o,1-l),new ye(c,1-u),new ye(d,1-m),new ye(v,1-p)]:[new ye(a,1-l),new ye(h,1-u),new ye(f,1-m),new ye(g,1-p)]}};function Pm(i,e,t){if(t.shapes=[],Array.isArray(i))for(let n=0,r=i.length;n<r;n++){let s=i[n];t.shapes.push(s.uuid)}else t.shapes.push(i.uuid);return t.options=Object.assign({},e),e.extrudePath!==void 0&&(t.options.extrudePath=e.extrudePath.toJSON()),t}var gi=class i extends go{constructor(e=1,t=0){let n=(1+Math.sqrt(5))/2,r=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],s=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(r,s,e,t),this.type="IcosahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new i(e.radius,e.detail)}};var To=class i extends go{constructor(e=1,t=0){let n=[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],r=[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2];super(n,r,e,t),this.type="OctahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new i(e.radius,e.detail)}},Ki=class i extends qt{constructor(e=1,t=1,n=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:r};let s=e/2,o=t/2,a=Math.floor(n),l=Math.floor(r),c=a+1,h=l+1,u=e/a,d=t/l,f=[],m=[],v=[],g=[];for(let p=0;p<h;p++){let E=p*d-o;for(let b=0;b<c;b++){let y=b*u-s;m.push(y,-E,0),v.push(0,0,1),g.push(b/a),g.push(1-p/l)}}for(let p=0;p<l;p++)for(let E=0;E<a;E++){let b=E+c*p,y=E+c*(p+1),T=E+1+c*(p+1),A=E+1+c*p;f.push(b,y,A),f.push(y,T,A)}this.setIndex(f),this.setAttribute("position",new ft(m,3)),this.setAttribute("normal",new ft(v,3)),this.setAttribute("uv",new ft(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.width,e.height,e.widthSegments,e.heightSegments)}};var ri=class i extends qt{constructor(e=1,t=.4,n=12,r=48,s=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:r,arc:s},n=Math.floor(n),r=Math.floor(r);let o=[],a=[],l=[],c=[],h=new R,u=new R,d=new R;for(let f=0;f<=n;f++)for(let m=0;m<=r;m++){let v=m/r*s,g=f/n*Math.PI*2;u.x=(e+t*Math.cos(g))*Math.cos(v),u.y=(e+t*Math.cos(g))*Math.sin(v),u.z=t*Math.sin(g),a.push(u.x,u.y,u.z),h.x=e*Math.cos(v),h.y=e*Math.sin(v),d.subVectors(u,h).normalize(),l.push(d.x,d.y,d.z),c.push(m/r),c.push(f/n)}for(let f=1;f<=n;f++)for(let m=1;m<=r;m++){let v=(r+1)*f+m-1,g=(r+1)*(f-1)+m-1,p=(r+1)*(f-1)+m,E=(r+1)*f+m;o.push(v,g,E),o.push(g,p,E)}this.setIndex(o),this.setAttribute("position",new ft(a,3)),this.setAttribute("normal",new ft(l,3)),this.setAttribute("uv",new ft(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}};var Ao=class i extends qt{constructor(e=new yo(new R(-1,-1,0),new R(-1,1,0),new R(1,1,0)),t=64,n=1,r=8,s=!1){super(),this.type="TubeGeometry",this.parameters={path:e,tubularSegments:t,radius:n,radialSegments:r,closed:s};let o=e.computeFrenetFrames(t,s);this.tangents=o.tangents,this.normals=o.normals,this.binormals=o.binormals;let a=new R,l=new R,c=new ye,h=new R,u=[],d=[],f=[],m=[];v(),this.setIndex(m),this.setAttribute("position",new ft(u,3)),this.setAttribute("normal",new ft(d,3)),this.setAttribute("uv",new ft(f,2));function v(){for(let b=0;b<t;b++)g(b);g(s===!1?t:0),E(),p()}function g(b){h=e.getPointAt(b/t,h);let y=o.normals[b],T=o.binormals[b];for(let A=0;A<=r;A++){let C=A/r*Math.PI*2,D=Math.sin(C),S=-Math.cos(C);l.x=S*y.x+D*T.x,l.y=S*y.y+D*T.y,l.z=S*y.z+D*T.z,l.normalize(),d.push(l.x,l.y,l.z),a.x=h.x+n*l.x,a.y=h.y+n*l.y,a.z=h.z+n*l.z,u.push(a.x,a.y,a.z)}}function p(){for(let b=1;b<=t;b++)for(let y=1;y<=r;y++){let T=(r+1)*(b-1)+(y-1),A=(r+1)*b+(y-1),C=(r+1)*b+y,D=(r+1)*(b-1)+y;m.push(T,A,D),m.push(A,C,D)}}function E(){for(let b=0;b<=t;b++)for(let y=0;y<=r;y++)c.x=b/t,c.y=y/r,f.push(c.x,c.y)}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON();return e.path=this.parameters.path.toJSON(),e}static fromJSON(e){return new i(new ka[e.path.type]().fromJSON(e.path),e.tubularSegments,e.radius,e.radialSegments,e.closed)}};var Er=class extends Ai{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new je(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new je(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=ql,this.normalScale=new ye(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new kn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}};var Ro=class extends Ai{constructor(e){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new je(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new je(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=ql,this.normalScale=new ye(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new kn,this.combine=al,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},Va=class extends Ai{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Od,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},Ga=class extends Ai{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}};function wa(i,e){return!i||i.constructor===e?i:typeof e.BYTES_PER_ELEMENT=="number"?new e(i):Array.prototype.slice.call(i)}function Dm(i){return ArrayBuffer.isView(i)&&!(i instanceof DataView)}function Lm(i){function e(r,s){return i[r]-i[s]}let t=i.length,n=new Array(t);for(let r=0;r!==t;++r)n[r]=r;return n.sort(e),n}function Qu(i,e,t){let n=i.length,r=new i.constructor(n);for(let s=0,o=0;o!==n;++s){let a=t[s]*e;for(let l=0;l!==e;++l)r[o++]=i[a+l]}return r}function tf(i,e,t,n){let r=1,s=i[0];for(;s!==void 0&&s[n]===void 0;)s=i[r++];if(s===void 0)return;let o=s[n];if(o!==void 0)if(Array.isArray(o))do o=s[n],o!==void 0&&(e.push(s.time),t.push(...o)),s=i[r++];while(s!==void 0);else if(o.toArray!==void 0)do o=s[n],o!==void 0&&(e.push(s.time),o.toArray(t,t.length)),s=i[r++];while(s!==void 0);else do o=s[n],o!==void 0&&(e.push(s.time),t.push(o)),s=i[r++];while(s!==void 0)}var wr=class{constructor(e,t,n,r){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=r!==void 0?r:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,r=t[n],s=t[n-1];e:{t:{let o;n:{i:if(!(e<r)){for(let a=n+2;;){if(r===void 0){if(e<s)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(s=r,r=t[++n],e<r)break t}o=t.length;break n}if(!(e>=s)){let a=t[1];e<a&&(n=2,s=a);for(let l=n-2;;){if(s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===l)break;if(r=s,s=t[--n-1],e>=s)break t}o=n,n=0;break n}break e}for(;n<o;){let a=n+o>>>1;e<t[a]?o=a:n=a+1}if(r=t[n],s=t[n-1],s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(r===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,s,r)}return this.interpolate_(n,s,e,r)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,r=this.valueSize,s=e*r;for(let o=0;o!==r;++o)t[o]=n[s+o];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}},Wa=class extends wr{constructor(e,t,n,r){super(e,t,n,r),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:pr,endingEnd:pr}}intervalChanged_(e,t,n){let r=this.parameterPositions,s=e-2,o=e+1,a=r[s],l=r[o];if(a===void 0)switch(this.getSettings_().endingStart){case mr:s=e,a=2*t-n;break;case Ks:s=r.length-2,a=t+r[s]-r[s+1];break;default:s=e,a=n}if(l===void 0)switch(this.getSettings_().endingEnd){case mr:o=e,l=2*n-t;break;case Ks:o=1,l=n+r[1]-r[0];break;default:o=e-1,l=t}let c=(n-t)*.5,h=this.valueSize;this._weightPrev=c/(t-a),this._weightNext=c/(l-n),this._offsetPrev=s*h,this._offsetNext=o*h}interpolate_(e,t,n,r){let s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=e*a,c=l-a,h=this._offsetPrev,u=this._offsetNext,d=this._weightPrev,f=this._weightNext,m=(n-t)/(r-t),v=m*m,g=v*m,p=-d*g+2*d*v-d*m,E=(1+d)*g+(-1.5-2*d)*v+(-.5+d)*m+1,b=(-1-f)*g+(1.5+f)*v+.5*m,y=f*g-f*v;for(let T=0;T!==a;++T)s[T]=p*o[h+T]+E*o[c+T]+b*o[l+T]+y*o[u+T];return s}},Co=class extends wr{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e,t,n,r){let s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=e*a,c=l-a,h=(n-t)/(r-t),u=1-h;for(let d=0;d!==a;++d)s[d]=o[c+d]*u+o[l+d]*h;return s}},Xa=class extends wr{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e){return this.copySampleValue_(e-1)}},gn=class{constructor(e,t,n,r){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=wa(t,this.TimeBufferType),this.values=wa(n,this.ValueBufferType),this.setInterpolation(r||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:wa(e.times,Array),values:wa(e.values,Array)};let r=e.getInterpolation();r!==e.DefaultInterpolation&&(n.interpolation=r)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new Xa(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new Co(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new Wa(this.times,this.values,this.getValueSize(),e)}setInterpolation(e){let t;switch(e){case Js:t=this.InterpolantFactoryMethodDiscrete;break;case Pa:t=this.InterpolantFactoryMethodLinear;break;case Ta:t=this.InterpolantFactoryMethodSmooth;break}if(t===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Js;case this.InterpolantFactoryMethodLinear:return Pa;case this.InterpolantFactoryMethodSmooth:return Ta}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,r=t.length;n!==r;++n)t[n]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,r=t.length;n!==r;++n)t[n]*=e}return this}trim(e,t){let n=this.times,r=n.length,s=0,o=r-1;for(;s!==r&&n[s]<e;)++s;for(;o!==-1&&n[o]>t;)--o;if(++o,s!==0||o!==r){s>=o&&(o=Math.max(o,1),s=o-1);let a=this.getValueSize();this.times=n.slice(s,o),this.values=this.values.slice(s*a,o*a)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),e=!1);let n=this.times,r=this.values,s=n.length;s===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),e=!1);let o=null;for(let a=0;a!==s;a++){let l=n[a];if(typeof l=="number"&&isNaN(l)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,a,l),e=!1;break}if(o!==null&&o>l){console.error("THREE.KeyframeTrack: Out of order keys.",this,a,l,o),e=!1;break}o=l}if(r!==void 0&&Dm(r))for(let a=0,l=r.length;a!==l;++a){let c=r[a];if(isNaN(c)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,a,c),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),r=this.getInterpolation()===Ta,s=e.length-1,o=1;for(let a=1;a<s;++a){let l=!1,c=e[a],h=e[a+1];if(c!==h&&(a!==1||c!==e[0]))if(r)l=!0;else{let u=a*n,d=u-n,f=u+n;for(let m=0;m!==n;++m){let v=t[u+m];if(v!==t[d+m]||v!==t[f+m]){l=!0;break}}}if(l){if(a!==o){e[o]=e[a];let u=a*n,d=o*n;for(let f=0;f!==n;++f)t[d+f]=t[u+f]}++o}}if(s>0){e[o]=e[s];for(let a=s*n,l=o*n,c=0;c!==n;++c)t[l+c]=t[a+c];++o}return o!==e.length?(this.times=e.slice(0,o),this.values=t.slice(0,o*n)):(this.times=e,this.values=t),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=this.constructor,r=new n(this.name,e,t);return r.createInterpolant=this.createInterpolant,r}};gn.prototype.ValueTypeName="";gn.prototype.TimeBufferType=Float32Array;gn.prototype.ValueBufferType=Float32Array;gn.prototype.DefaultInterpolation=Pa;var Ri=class extends gn{constructor(e,t,n){super(e,t,n)}};Ri.prototype.ValueTypeName="bool";Ri.prototype.ValueBufferType=Array;Ri.prototype.DefaultInterpolation=Js;Ri.prototype.InterpolantFactoryMethodLinear=void 0;Ri.prototype.InterpolantFactoryMethodSmooth=void 0;var Io=class extends gn{constructor(e,t,n,r){super(e,t,n,r)}};Io.prototype.ValueTypeName="color";var Tr=class extends gn{constructor(e,t,n,r){super(e,t,n,r)}};Tr.prototype.ValueTypeName="number";var $a=class extends wr{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e,t,n,r){let s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=(n-t)/(r-t),c=e*a;for(let h=c+a;c!==h;c+=4)nn.slerpFlat(s,0,o,c-a,o,c,l);return s}},Ci=class extends gn{constructor(e,t,n,r){super(e,t,n,r)}InterpolantFactoryMethodLinear(e){return new $a(this.times,this.values,this.getValueSize(),e)}};Ci.prototype.ValueTypeName="quaternion";Ci.prototype.InterpolantFactoryMethodSmooth=void 0;var Ii=class extends gn{constructor(e,t,n){super(e,t,n)}};Ii.prototype.ValueTypeName="string";Ii.prototype.ValueBufferType=Array;Ii.prototype.DefaultInterpolation=Js;Ii.prototype.InterpolantFactoryMethodLinear=void 0;Ii.prototype.InterpolantFactoryMethodSmooth=void 0;var Ar=class extends gn{constructor(e,t,n,r){super(e,t,n,r)}};Ar.prototype.ValueTypeName="vector";var Pi=class{constructor(e="",t=-1,n=[],r=$l){this.name=e,this.tracks=n,this.duration=t,this.blendMode=r,this.uuid=Ui(),this.userData={},this.duration<0&&this.resetDuration()}static parse(e){let t=[],n=e.tracks,r=1/(e.fps||1);for(let o=0,a=n.length;o!==a;++o)t.push(Nm(n[o]).scale(r));let s=new this(e.name,e.duration,t,e.blendMode);return s.uuid=e.uuid,s.userData=JSON.parse(e.userData||"{}"),s}static toJSON(e){let t=[],n=e.tracks,r={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode,userData:JSON.stringify(e.userData)};for(let s=0,o=n.length;s!==o;++s)t.push(gn.toJSON(n[s]));return r}static CreateFromMorphTargetSequence(e,t,n,r){let s=t.length,o=[];for(let a=0;a<s;a++){let l=[],c=[];l.push((a+s-1)%s,a,(a+1)%s),c.push(0,1,0);let h=Lm(l);l=Qu(l,1,h),c=Qu(c,1,h),!r&&l[0]===0&&(l.push(s),c.push(c[0])),o.push(new Tr(".morphTargetInfluences["+t[a].name+"]",l,c).scale(1/n))}return new this(e,-1,o)}static findByName(e,t){let n=e;if(!Array.isArray(e)){let r=e;n=r.geometry&&r.geometry.animations||r.animations}for(let r=0;r<n.length;r++)if(n[r].name===t)return n[r];return null}static CreateClipsFromMorphTargetSequences(e,t,n){let r={},s=/^([\w-]*?)([\d]+)$/;for(let a=0,l=e.length;a<l;a++){let c=e[a],h=c.name.match(s);if(h&&h.length>1){let u=h[1],d=r[u];d||(r[u]=d=[]),d.push(c)}}let o=[];for(let a in r)o.push(this.CreateFromMorphTargetSequence(a,r[a],t,n));return o}static parseAnimation(e,t){if(console.warn("THREE.AnimationClip: parseAnimation() is deprecated and will be removed with r185"),!e)return console.error("THREE.AnimationClip: No animation in JSONLoader data."),null;let n=function(u,d,f,m,v){if(f.length!==0){let g=[],p=[];tf(f,g,p,m),g.length!==0&&v.push(new u(d,g,p))}},r=[],s=e.name||"default",o=e.fps||30,a=e.blendMode,l=e.length||-1,c=e.hierarchy||[];for(let u=0;u<c.length;u++){let d=c[u].keys;if(!(!d||d.length===0))if(d[0].morphTargets){let f={},m;for(m=0;m<d.length;m++)if(d[m].morphTargets)for(let v=0;v<d[m].morphTargets.length;v++)f[d[m].morphTargets[v]]=-1;for(let v in f){let g=[],p=[];for(let E=0;E!==d[m].morphTargets.length;++E){let b=d[m];g.push(b.time),p.push(b.morphTarget===v?1:0)}r.push(new Tr(".morphTargetInfluence["+v+"]",g,p))}l=f.length*o}else{let f=".bones["+t[u].name+"]";n(Ar,f+".position",d,"pos",r),n(Ci,f+".quaternion",d,"rot",r),n(Ar,f+".scale",d,"scl",r)}}return r.length===0?null:new this(s,l,r,a)}resetDuration(){let e=this.tracks,t=0;for(let n=0,r=e.length;n!==r;++n){let s=this.tracks[n];t=Math.max(t,s.times[s.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){let e=[];for(let n=0;n<this.tracks.length;n++)e.push(this.tracks[n].clone());let t=new this.constructor(this.name,this.duration,e,this.blendMode);return t.userData=JSON.parse(JSON.stringify(this.userData)),t}toJSON(){return this.constructor.toJSON(this)}};function Um(i){switch(i.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return Tr;case"vector":case"vector2":case"vector3":case"vector4":return Ar;case"color":return Io;case"quaternion":return Ci;case"bool":case"boolean":return Ri;case"string":return Ii}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+i)}function Nm(i){if(i.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");let e=Um(i.type);if(i.times===void 0){let t=[],n=[];tf(i.keys,t,n,"value"),i.times=t,i.values=n}return e.parse!==void 0?e.parse(i):new e(i.name,i.times,i.values,i.interpolation)}var qa=class{constructor(e,t,n){let r=this,s=!1,o=0,a=0,l,c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this.abortController=new AbortController,this.itemStart=function(h){a++,s===!1&&r.onStart!==void 0&&r.onStart(h,o,a),s=!0},this.itemEnd=function(h){o++,r.onProgress!==void 0&&r.onProgress(h,o,a),o===a&&(s=!1,r.onLoad!==void 0&&r.onLoad())},this.itemError=function(h){r.onError!==void 0&&r.onError(h)},this.resolveURL=function(h){return l?l(h):h},this.setURLModifier=function(h){return l=h,this},this.addHandler=function(h,u){return c.push(h,u),this},this.removeHandler=function(h){let u=c.indexOf(h);return u!==-1&&c.splice(u,2),this},this.getHandler=function(h){for(let u=0,d=c.length;u<d;u+=2){let f=c[u],m=c[u+1];if(f.global&&(f.lastIndex=0),f.test(h))return m}return null},this.abort=function(){return this.abortController.abort(),this.abortController=new AbortController,this}}},nf=new qa,Ya=class{constructor(e){this.manager=e!==void 0?e:nf,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){let n=this;return new Promise(function(r,s){n.load(e,r,t,s)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}};Ya.DEFAULT_MATERIAL_NAME="__DEFAULT";var xs=class extends Ht{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new je(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}},Po=class extends xs{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Ht.DEFAULT_UP),this.updateMatrix(),this.groundColor=new je(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}},Jc=new ot,ed=new R,td=new R,Za=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new ye(512,512),this.mapType=oi,this.map=null,this.mapPass=null,this.matrix=new ot,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new fs,this._frameExtents=new ye(1,1),this._viewportCount=1,this._viewports=[new mt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera,n=this.matrix;ed.setFromMatrixPosition(e.matrixWorld),t.position.copy(ed),td.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(td),t.updateMatrixWorld(),Jc.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Jc,t.coordinateSystem,t.reversedDepth),t.reversedDepth?n.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Jc)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}};var nd=new ot,Ws=new R,Kc=new R,rh=class extends Za{constructor(){super(new jt(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new ye(4,2),this._viewportCount=6,this._viewports=[new mt(2,1,1,1),new mt(0,1,1,1),new mt(3,1,1,1),new mt(1,1,1,1),new mt(3,0,1,1),new mt(1,0,1,1)],this._cubeDirections=[new R(1,0,0),new R(-1,0,0),new R(0,0,1),new R(0,0,-1),new R(0,1,0),new R(0,-1,0)],this._cubeUps=[new R(0,1,0),new R(0,1,0),new R(0,1,0),new R(0,1,0),new R(0,0,1),new R(0,0,-1)]}updateMatrices(e,t=0){let n=this.camera,r=this.matrix,s=e.distance||n.far;s!==n.far&&(n.far=s,n.updateProjectionMatrix()),Ws.setFromMatrixPosition(e.matrixWorld),n.position.copy(Ws),Kc.copy(n.position),Kc.add(this._cubeDirections[t]),n.up.copy(this._cubeUps[t]),n.lookAt(Kc),n.updateMatrixWorld(),r.makeTranslation(-Ws.x,-Ws.y,-Ws.z),nd.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(nd,n.coordinateSystem,n.reversedDepth)}},Do=class extends xs{constructor(e,t,n=0,r=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=r,this.shadow=new rh}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}},Lo=class extends oo{constructor(e=-1,t=1,n=1,r=-1,s=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=r,this.near=s,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,r,s,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,r=(this.top+this.bottom)/2,s=n-e,o=n+e,a=r+t,l=r-t;if(this.view!==null&&this.view.enabled){let c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,o=s+c*this.view.width,a-=h*this.view.offsetY,l=a-h*this.view.height}this.projectionMatrix.makeOrthographic(s,o,a,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},sh=class extends Za{constructor(){super(new Lo(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},Uo=class extends xs{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Ht.DEFAULT_UP),this.updateMatrix(),this.target=new Ht,this.shadow=new sh}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}};var Ja=class extends jt{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}};var Ka=class{constructor(e,t,n){this.binding=e,this.valueSize=n;let r,s,o;switch(t){case"quaternion":r=this._slerp,s=this._slerpAdditive,o=this._setAdditiveIdentityQuaternion,this.buffer=new Float64Array(n*6),this._workIndex=5;break;case"string":case"bool":r=this._select,s=this._select,o=this._setAdditiveIdentityOther,this.buffer=new Array(n*5);break;default:r=this._lerp,s=this._lerpAdditive,o=this._setAdditiveIdentityNumeric,this.buffer=new Float64Array(n*5)}this._mixBufferRegion=r,this._mixBufferRegionAdditive=s,this._setIdentity=o,this._origIndex=3,this._addIndex=4,this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,this.useCount=0,this.referenceCount=0}accumulate(e,t){let n=this.buffer,r=this.valueSize,s=e*r+r,o=this.cumulativeWeight;if(o===0){for(let a=0;a!==r;++a)n[s+a]=n[a];o=t}else{o+=t;let a=t/o;this._mixBufferRegion(n,s,0,a,r)}this.cumulativeWeight=o}accumulateAdditive(e){let t=this.buffer,n=this.valueSize,r=n*this._addIndex;this.cumulativeWeightAdditive===0&&this._setIdentity(),this._mixBufferRegionAdditive(t,r,0,e,n),this.cumulativeWeightAdditive+=e}apply(e){let t=this.valueSize,n=this.buffer,r=e*t+t,s=this.cumulativeWeight,o=this.cumulativeWeightAdditive,a=this.binding;if(this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,s<1){let l=t*this._origIndex;this._mixBufferRegion(n,r,l,1-s,t)}o>0&&this._mixBufferRegionAdditive(n,r,this._addIndex*t,1,t);for(let l=t,c=t+t;l!==c;++l)if(n[l]!==n[l+t]){a.setValue(n,r);break}}saveOriginalState(){let e=this.binding,t=this.buffer,n=this.valueSize,r=n*this._origIndex;e.getValue(t,r);for(let s=n,o=r;s!==o;++s)t[s]=t[r+s%n];this._setIdentity(),this.cumulativeWeight=0,this.cumulativeWeightAdditive=0}restoreOriginalState(){let e=this.valueSize*3;this.binding.setValue(this.buffer,e)}_setAdditiveIdentityNumeric(){let e=this._addIndex*this.valueSize,t=e+this.valueSize;for(let n=e;n<t;n++)this.buffer[n]=0}_setAdditiveIdentityQuaternion(){this._setAdditiveIdentityNumeric(),this.buffer[this._addIndex*this.valueSize+3]=1}_setAdditiveIdentityOther(){let e=this._origIndex*this.valueSize,t=this._addIndex*this.valueSize;for(let n=0;n<this.valueSize;n++)this.buffer[t+n]=this.buffer[e+n]}_select(e,t,n,r,s){if(r>=.5)for(let o=0;o!==s;++o)e[t+o]=e[n+o]}_slerp(e,t,n,r){nn.slerpFlat(e,t,e,t,e,n,r)}_slerpAdditive(e,t,n,r,s){let o=this._workIndex*s;nn.multiplyQuaternionsFlat(e,o,e,t,e,n),nn.slerpFlat(e,t,e,t,e,o,r)}_lerp(e,t,n,r,s){let o=1-r;for(let a=0;a!==s;++a){let l=t+a;e[l]=e[l]*o+e[n+a]*r}}_lerpAdditive(e,t,n,r,s){for(let o=0;o!==s;++o){let a=t+o;e[a]=e[a]+e[n+o]*r}}},Rh="\\[\\]\\.:\\/",Fm=new RegExp("["+Rh+"]","g"),Ch="[^"+Rh+"]",Om="[^"+Rh.replace("\\.","")+"]",Bm=/((?:WC+[\/:])*)/.source.replace("WC",Ch),zm=/(WCOD+)?/.source.replace("WCOD",Om),km=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Ch),Hm=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Ch),Vm=new RegExp("^"+Bm+zm+km+Hm+"$"),Gm=["material","materials","bones","map"],oh=class{constructor(e,t,n){let r=n||St.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,r)}getValue(e,t){this.bind();let n=this._targetGroup.nCachedObjects_,r=this._bindings[n];r!==void 0&&r.getValue(e,t)}setValue(e,t){let n=this._bindings;for(let r=this._targetGroup.nCachedObjects_,s=n.length;r!==s;++r)n[r].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}},St=class i{constructor(e,t,n){this.path=t,this.parsedPath=n||i.parseTrackName(t),this.node=i.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new i.Composite(e,t,n):new i(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(Fm,"")}static parseTrackName(e){let t=Vm.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},r=n.nodeName&&n.nodeName.lastIndexOf(".");if(r!==void 0&&r!==-1){let s=n.nodeName.substring(r+1);Gm.indexOf(s)!==-1&&(n.nodeName=n.nodeName.substring(0,r),n.objectName=s)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(s){for(let o=0;o<s.length;o++){let a=s[o];if(a.name===t||a.uuid===t)return a;let l=n(a.children);if(l)return l}return null},r=n(e.children);if(r)return r}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let r=0,s=n.length;r!==s;++r)e[t++]=n[r]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let r=0,s=n.length;r!==s;++r)n[r]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let r=0,s=n.length;r!==s;++r)n[r]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let r=0,s=n.length;r!==s;++r)n[r]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node,t=this.parsedPath,n=t.objectName,r=t.propertyName,s=t.propertyIndex;if(e||(e=i.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let c=t.objectIndex;switch(n){case"materials":if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let h=0;h<e.length;h++)if(e[h].name===c){c=h;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(c!==void 0){if(e[c]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[c]}}let o=e[r];if(o===void 0){let c=t.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+c+"."+r+" but it wasn't found.",e);return}let a=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?a=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(s!==void 0){if(r==="morphTargetInfluences"){if(!e.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[s]!==void 0&&(s=e.morphTargetDictionary[s])}l=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=s}else o.fromArray!==void 0&&o.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(l=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=r;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};St.Composite=oh;St.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};St.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};St.prototype.GetterByBindingType=[St.prototype._getValue_direct,St.prototype._getValue_array,St.prototype._getValue_arrayElement,St.prototype._getValue_toArray];St.prototype.SetterByBindingTypeAndVersioning=[[St.prototype._setValue_direct,St.prototype._setValue_direct_setNeedsUpdate,St.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[St.prototype._setValue_array,St.prototype._setValue_array_setNeedsUpdate,St.prototype._setValue_array_setMatrixWorldNeedsUpdate],[St.prototype._setValue_arrayElement,St.prototype._setValue_arrayElement_setNeedsUpdate,St.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[St.prototype._setValue_fromArray,St.prototype._setValue_fromArray_setNeedsUpdate,St.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var ja=class{constructor(e,t,n=null,r=t.blendMode){this._mixer=e,this._clip=t,this._localRoot=n,this.blendMode=r;let s=t.tracks,o=s.length,a=new Array(o),l={endingStart:pr,endingEnd:pr};for(let c=0;c!==o;++c){let h=s[c].createInterpolant(null);a[c]=h,h.settings=l}this._interpolantSettings=l,this._interpolants=a,this._propertyBindings=new Array(o),this._cacheIndex=null,this._byClipCacheIndex=null,this._timeScaleInterpolant=null,this._weightInterpolant=null,this.loop=Ud,this._loopCount=-1,this._startTime=null,this.time=0,this.timeScale=1,this._effectiveTimeScale=1,this.weight=1,this._effectiveWeight=1,this.repetitions=1/0,this.paused=!1,this.enabled=!0,this.clampWhenFinished=!1,this.zeroSlopeAtStart=!0,this.zeroSlopeAtEnd=!0}play(){return this._mixer._activateAction(this),this}stop(){return this._mixer._deactivateAction(this),this.reset()}reset(){return this.paused=!1,this.enabled=!0,this.time=0,this._loopCount=-1,this._startTime=null,this.stopFading().stopWarping()}isRunning(){return this.enabled&&!this.paused&&this.timeScale!==0&&this._startTime===null&&this._mixer._isActiveAction(this)}isScheduled(){return this._mixer._isActiveAction(this)}startAt(e){return this._startTime=e,this}setLoop(e,t){return this.loop=e,this.repetitions=t,this}setEffectiveWeight(e){return this.weight=e,this._effectiveWeight=this.enabled?e:0,this.stopFading()}getEffectiveWeight(){return this._effectiveWeight}fadeIn(e){return this._scheduleFading(e,0,1)}fadeOut(e){return this._scheduleFading(e,1,0)}crossFadeFrom(e,t,n=!1){if(e.fadeOut(t),this.fadeIn(t),n===!0){let r=this._clip.duration,s=e._clip.duration,o=s/r,a=r/s;e.warp(1,o,t),this.warp(a,1,t)}return this}crossFadeTo(e,t,n=!1){return e.crossFadeFrom(this,t,n)}stopFading(){let e=this._weightInterpolant;return e!==null&&(this._weightInterpolant=null,this._mixer._takeBackControlInterpolant(e)),this}setEffectiveTimeScale(e){return this.timeScale=e,this._effectiveTimeScale=this.paused?0:e,this.stopWarping()}getEffectiveTimeScale(){return this._effectiveTimeScale}setDuration(e){return this.timeScale=this._clip.duration/e,this.stopWarping()}syncWith(e){return this.time=e.time,this.timeScale=e.timeScale,this.stopWarping()}halt(e){return this.warp(this._effectiveTimeScale,0,e)}warp(e,t,n){let r=this._mixer,s=r.time,o=this.timeScale,a=this._timeScaleInterpolant;a===null&&(a=r._lendControlInterpolant(),this._timeScaleInterpolant=a);let l=a.parameterPositions,c=a.sampleValues;return l[0]=s,l[1]=s+n,c[0]=e/o,c[1]=t/o,this}stopWarping(){let e=this._timeScaleInterpolant;return e!==null&&(this._timeScaleInterpolant=null,this._mixer._takeBackControlInterpolant(e)),this}getMixer(){return this._mixer}getClip(){return this._clip}getRoot(){return this._localRoot||this._mixer._root}_update(e,t,n,r){if(!this.enabled){this._updateWeight(e);return}let s=this._startTime;if(s!==null){let l=(e-s)*n;l<0||n===0?t=0:(this._startTime=null,t=n*l)}t*=this._updateTimeScale(e);let o=this._updateTime(t),a=this._updateWeight(e);if(a>0){let l=this._interpolants,c=this._propertyBindings;switch(this.blendMode){case Fd:for(let h=0,u=l.length;h!==u;++h)l[h].evaluate(o),c[h].accumulateAdditive(a);break;case $l:default:for(let h=0,u=l.length;h!==u;++h)l[h].evaluate(o),c[h].accumulate(r,a)}}}_updateWeight(e){let t=0;if(this.enabled){t=this.weight;let n=this._weightInterpolant;if(n!==null){let r=n.evaluate(e)[0];t*=r,e>n.parameterPositions[1]&&(this.stopFading(),r===0&&(this.enabled=!1))}}return this._effectiveWeight=t,t}_updateTimeScale(e){let t=0;if(!this.paused){t=this.timeScale;let n=this._timeScaleInterpolant;if(n!==null){let r=n.evaluate(e)[0];t*=r,e>n.parameterPositions[1]&&(this.stopWarping(),t===0?this.paused=!0:this.timeScale=t)}}return this._effectiveTimeScale=t,t}_updateTime(e){let t=this._clip.duration,n=this.loop,r=this.time+e,s=this._loopCount,o=n===Nd;if(e===0)return s===-1?r:o&&(s&1)===1?t-r:r;if(n===Ld){s===-1&&(this._loopCount=0,this._setEndings(!0,!0,!1));e:{if(r>=t)r=t;else if(r<0)r=0;else{this.time=r;break e}this.clampWhenFinished?this.paused=!0:this.enabled=!1,this.time=r,this._mixer.dispatchEvent({type:"finished",action:this,direction:e<0?-1:1})}}else{if(s===-1&&(e>=0?(s=0,this._setEndings(!0,this.repetitions===0,o)):this._setEndings(this.repetitions===0,!0,o)),r>=t||r<0){let a=Math.floor(r/t);r-=t*a,s+=Math.abs(a);let l=this.repetitions-s;if(l<=0)this.clampWhenFinished?this.paused=!0:this.enabled=!1,r=e>0?t:0,this.time=r,this._mixer.dispatchEvent({type:"finished",action:this,direction:e>0?1:-1});else{if(l===1){let c=e<0;this._setEndings(c,!c,o)}else this._setEndings(!1,!1,o);this._loopCount=s,this.time=r,this._mixer.dispatchEvent({type:"loop",action:this,loopDelta:a})}}else this.time=r;if(o&&(s&1)===1)return t-r}return r}_setEndings(e,t,n){let r=this._interpolantSettings;n?(r.endingStart=mr,r.endingEnd=mr):(e?r.endingStart=this.zeroSlopeAtStart?mr:pr:r.endingStart=Ks,t?r.endingEnd=this.zeroSlopeAtEnd?mr:pr:r.endingEnd=Ks)}_scheduleFading(e,t,n){let r=this._mixer,s=r.time,o=this._weightInterpolant;o===null&&(o=r._lendControlInterpolant(),this._weightInterpolant=o);let a=o.parameterPositions,l=o.sampleValues;return a[0]=s,l[0]=t,a[1]=s+e,l[1]=n,this}},Wm=new Float32Array(1),Rr=class extends fi{constructor(e){super(),this._root=e,this._initMemoryManager(),this._accuIndex=0,this.time=0,this.timeScale=1}_bindAction(e,t){let n=e._localRoot||this._root,r=e._clip.tracks,s=r.length,o=e._propertyBindings,a=e._interpolants,l=n.uuid,c=this._bindingsByRootAndName,h=c[l];h===void 0&&(h={},c[l]=h);for(let u=0;u!==s;++u){let d=r[u],f=d.name,m=h[f];if(m!==void 0)++m.referenceCount,o[u]=m;else{if(m=o[u],m!==void 0){m._cacheIndex===null&&(++m.referenceCount,this._addInactiveBinding(m,l,f));continue}let v=t&&t._propertyBindings[u].binding.parsedPath;m=new Ka(St.create(n,f,v),d.ValueTypeName,d.getValueSize()),++m.referenceCount,this._addInactiveBinding(m,l,f),o[u]=m}a[u].resultBuffer=m.buffer}}_activateAction(e){if(!this._isActiveAction(e)){if(e._cacheIndex===null){let n=(e._localRoot||this._root).uuid,r=e._clip.uuid,s=this._actionsByClip[r];this._bindAction(e,s&&s.knownActions[0]),this._addInactiveAction(e,r,n)}let t=e._propertyBindings;for(let n=0,r=t.length;n!==r;++n){let s=t[n];s.useCount++===0&&(this._lendBinding(s),s.saveOriginalState())}this._lendAction(e)}}_deactivateAction(e){if(this._isActiveAction(e)){let t=e._propertyBindings;for(let n=0,r=t.length;n!==r;++n){let s=t[n];--s.useCount===0&&(s.restoreOriginalState(),this._takeBackBinding(s))}this._takeBackAction(e)}}_initMemoryManager(){this._actions=[],this._nActiveActions=0,this._actionsByClip={},this._bindings=[],this._nActiveBindings=0,this._bindingsByRootAndName={},this._controlInterpolants=[],this._nActiveControlInterpolants=0;let e=this;this.stats={actions:{get total(){return e._actions.length},get inUse(){return e._nActiveActions}},bindings:{get total(){return e._bindings.length},get inUse(){return e._nActiveBindings}},controlInterpolants:{get total(){return e._controlInterpolants.length},get inUse(){return e._nActiveControlInterpolants}}}}_isActiveAction(e){let t=e._cacheIndex;return t!==null&&t<this._nActiveActions}_addInactiveAction(e,t,n){let r=this._actions,s=this._actionsByClip,o=s[t];if(o===void 0)o={knownActions:[e],actionByRoot:{}},e._byClipCacheIndex=0,s[t]=o;else{let a=o.knownActions;e._byClipCacheIndex=a.length,a.push(e)}e._cacheIndex=r.length,r.push(e),o.actionByRoot[n]=e}_removeInactiveAction(e){let t=this._actions,n=t[t.length-1],r=e._cacheIndex;n._cacheIndex=r,t[r]=n,t.pop(),e._cacheIndex=null;let s=e._clip.uuid,o=this._actionsByClip,a=o[s],l=a.knownActions,c=l[l.length-1],h=e._byClipCacheIndex;c._byClipCacheIndex=h,l[h]=c,l.pop(),e._byClipCacheIndex=null;let u=a.actionByRoot,d=(e._localRoot||this._root).uuid;delete u[d],l.length===0&&delete o[s],this._removeInactiveBindingsForAction(e)}_removeInactiveBindingsForAction(e){let t=e._propertyBindings;for(let n=0,r=t.length;n!==r;++n){let s=t[n];--s.referenceCount===0&&this._removeInactiveBinding(s)}}_lendAction(e){let t=this._actions,n=e._cacheIndex,r=this._nActiveActions++,s=t[r];e._cacheIndex=r,t[r]=e,s._cacheIndex=n,t[n]=s}_takeBackAction(e){let t=this._actions,n=e._cacheIndex,r=--this._nActiveActions,s=t[r];e._cacheIndex=r,t[r]=e,s._cacheIndex=n,t[n]=s}_addInactiveBinding(e,t,n){let r=this._bindingsByRootAndName,s=this._bindings,o=r[t];o===void 0&&(o={},r[t]=o),o[n]=e,e._cacheIndex=s.length,s.push(e)}_removeInactiveBinding(e){let t=this._bindings,n=e.binding,r=n.rootNode.uuid,s=n.path,o=this._bindingsByRootAndName,a=o[r],l=t[t.length-1],c=e._cacheIndex;l._cacheIndex=c,t[c]=l,t.pop(),delete a[s],Object.keys(a).length===0&&delete o[r]}_lendBinding(e){let t=this._bindings,n=e._cacheIndex,r=this._nActiveBindings++,s=t[r];e._cacheIndex=r,t[r]=e,s._cacheIndex=n,t[n]=s}_takeBackBinding(e){let t=this._bindings,n=e._cacheIndex,r=--this._nActiveBindings,s=t[r];e._cacheIndex=r,t[r]=e,s._cacheIndex=n,t[n]=s}_lendControlInterpolant(){let e=this._controlInterpolants,t=this._nActiveControlInterpolants++,n=e[t];return n===void 0&&(n=new Co(new Float32Array(2),new Float32Array(2),1,Wm),n.__cacheIndex=t,e[t]=n),n}_takeBackControlInterpolant(e){let t=this._controlInterpolants,n=e.__cacheIndex,r=--this._nActiveControlInterpolants,s=t[r];e.__cacheIndex=r,t[r]=e,s.__cacheIndex=n,t[n]=s}clipAction(e,t,n){let r=t||this._root,s=r.uuid,o=typeof e=="string"?Pi.findByName(r,e):e,a=o!==null?o.uuid:e,l=this._actionsByClip[a],c=null;if(n===void 0&&(o!==null?n=o.blendMode:n=$l),l!==void 0){let u=l.actionByRoot[s];if(u!==void 0&&u.blendMode===n)return u;c=l.knownActions[0],o===null&&(o=c._clip)}if(o===null)return null;let h=new ja(this,o,t,n);return this._bindAction(h,c),this._addInactiveAction(h,a,s),h}existingAction(e,t){let n=t||this._root,r=n.uuid,s=typeof e=="string"?Pi.findByName(n,e):e,o=s?s.uuid:e,a=this._actionsByClip[o];return a!==void 0&&a.actionByRoot[r]||null}stopAllAction(){let e=this._actions,t=this._nActiveActions;for(let n=t-1;n>=0;--n)e[n].stop();return this}update(e){e*=this.timeScale;let t=this._actions,n=this._nActiveActions,r=this.time+=e,s=Math.sign(e),o=this._accuIndex^=1;for(let c=0;c!==n;++c)t[c]._update(r,e,s,o);let a=this._bindings,l=this._nActiveBindings;for(let c=0;c!==l;++c)a[c].apply(o);return this}setTime(e){this.time=0;for(let t=0;t<this._actions.length;t++)this._actions[t].time=0;return this.update(e)}getRoot(){return this._root}uncacheClip(e){let t=this._actions,n=e.uuid,r=this._actionsByClip,s=r[n];if(s!==void 0){let o=s.knownActions;for(let a=0,l=o.length;a!==l;++a){let c=o[a];this._deactivateAction(c);let h=c._cacheIndex,u=t[t.length-1];c._cacheIndex=null,c._byClipCacheIndex=null,u._cacheIndex=h,t[h]=u,t.pop(),this._removeInactiveBindingsForAction(c)}delete r[n]}}uncacheRoot(e){let t=e.uuid,n=this._actionsByClip;for(let o in n){let a=n[o].actionByRoot,l=a[t];l!==void 0&&(this._deactivateAction(l),this._removeInactiveAction(l))}let r=this._bindingsByRootAndName,s=r[t];if(s!==void 0)for(let o in s){let a=s[o];a.restoreOriginalState(),this._removeInactiveBinding(a)}}uncacheAction(e,t){let n=this.existingAction(e,t);n!==null&&(this._deactivateAction(n),this._removeInactiveAction(n))}};function Ih(i,e,t,n){let r=Xm(n);switch(t){case xh:return i*e;case pl:return i*e/r.components*r.byteLength;case ml:return i*e/r.components*r.byteLength;case vh:return i*e*2/r.components*r.byteLength;case gl:return i*e*2/r.components*r.byteLength;case _h:return i*e*3/r.components*r.byteLength;case Tn:return i*e*4/r.components*r.byteLength;case xl:return i*e*4/r.components*r.byteLength;case Bo:case zo:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case ko:case Ho:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case vl:case bl:return Math.max(i,16)*Math.max(e,8)/4;case _l:case yl:return Math.max(i,8)*Math.max(e,8)/2;case Ml:case Sl:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case El:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case wl:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Tl:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case Al:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case Rl:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case Cl:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case Il:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case Pl:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case Dl:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case Ll:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case Ul:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case Nl:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case Fl:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case Ol:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case Bl:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case zl:case kl:case Hl:return Math.ceil(i/4)*Math.ceil(e/4)*16;case Vl:case Gl:return Math.ceil(i/4)*Math.ceil(e/4)*8;case Wl:case Xl:return Math.ceil(i/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function Xm(i){switch(i){case oi:case fh:return{byteLength:1,components:1};case _s:case ph:case vs:return{byteLength:2,components:1};case dl:case fl:return{byteLength:2,components:4};case Qi:case ul:case Gn:return{byteLength:4,components:1};case mh:case gh:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"180"}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="180");function Af(){let i=null,e=!1,t=null,n=null;function r(s,o){t(s,o),n=i.requestAnimationFrame(r)}return{start:function(){e!==!0&&t!==null&&(n=i.requestAnimationFrame(r),e=!0)},stop:function(){i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){i=s}}}function Km(i){let e=new WeakMap;function t(a,l){let c=a.array,h=a.usage,u=c.byteLength,d=i.createBuffer();i.bindBuffer(l,d),i.bufferData(l,c,h),a.onUploadCallback();let f;if(c instanceof Float32Array)f=i.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)f=i.HALF_FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?f=i.HALF_FLOAT:f=i.UNSIGNED_SHORT;else if(c instanceof Int16Array)f=i.SHORT;else if(c instanceof Uint32Array)f=i.UNSIGNED_INT;else if(c instanceof Int32Array)f=i.INT;else if(c instanceof Int8Array)f=i.BYTE;else if(c instanceof Uint8Array)f=i.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)f=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:d,type:f,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:u}}function n(a,l,c){let h=l.array,u=l.updateRanges;if(i.bindBuffer(c,a),u.length===0)i.bufferSubData(c,0,h);else{u.sort((f,m)=>f.start-m.start);let d=0;for(let f=1;f<u.length;f++){let m=u[d],v=u[f];v.start<=m.start+m.count+1?m.count=Math.max(m.count,v.start+v.count-m.start):(++d,u[d]=v)}u.length=d+1;for(let f=0,m=u.length;f<m;f++){let v=u[f];i.bufferSubData(c,v.start*h.BYTES_PER_ELEMENT,h,v.start,v.count)}l.clearUpdateRanges()}l.onUploadCallback()}function r(a){return a.isInterleavedBufferAttribute&&(a=a.data),e.get(a)}function s(a){a.isInterleavedBufferAttribute&&(a=a.data);let l=e.get(a);l&&(i.deleteBuffer(l.buffer),e.delete(a))}function o(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){let h=e.get(a);(!h||h.version<a.version)&&e.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}let c=e.get(a);if(c===void 0)e.set(a,t(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,a,l),c.version=a.version}}return{get:r,remove:s,update:o}}var jm=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Qm=`#ifdef USE_ALPHAHASH
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
#endif`,eg=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,tg=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,ng=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,ig=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,rg=`#ifdef USE_AOMAP
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
#endif`,sg=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,og=`#ifdef USE_BATCHING
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
#endif`,ag=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,lg=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,cg=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,hg=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,ug=`#ifdef USE_IRIDESCENCE
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
#endif`,dg=`#ifdef USE_BUMPMAP
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
#endif`,fg=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,pg=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,mg=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,gg=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,xg=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,_g=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,vg=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,yg=`#if defined( USE_COLOR_ALPHA )
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
#endif`,bg=`#define PI 3.141592653589793
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
} // validated`,Mg=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,Sg=`vec3 transformedNormal = objectNormal;
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
#endif`,Eg=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,wg=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Tg=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Ag=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Rg="gl_FragColor = linearToOutputTexel( gl_FragColor );",Cg=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Ig=`#ifdef USE_ENVMAP
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
#endif`,Pg=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Dg=`#ifdef USE_ENVMAP
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
#endif`,Lg=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Ug=`#ifdef USE_ENVMAP
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
#endif`,Ng=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Fg=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Og=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Bg=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,zg=`#ifdef USE_GRADIENTMAP
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
}`,kg=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Hg=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Vg=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Gg=`uniform bool receiveShadow;
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
#endif`,Wg=`#ifdef USE_ENVMAP
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
#endif`,Xg=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,$g=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,qg=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Yg=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Zg=`PhysicalMaterial material;
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
#endif`,Jg=`struct PhysicalMaterial {
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
}`,Kg=`
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
#endif`,jg=`#if defined( RE_IndirectDiffuse )
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
#endif`,Qg=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,e0=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,t0=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,n0=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,i0=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,r0=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,s0=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,o0=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,a0=`#if defined( USE_POINTS_UV )
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
#endif`,l0=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,c0=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,h0=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,u0=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,d0=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,f0=`#ifdef USE_MORPHTARGETS
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
#endif`,p0=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,m0=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,g0=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,x0=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,_0=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,v0=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,y0=`#ifdef USE_NORMALMAP
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
#endif`,b0=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,M0=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,S0=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,E0=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,w0=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,T0=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,A0=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,R0=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,C0=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,I0=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,P0=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,D0=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,L0=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,U0=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,N0=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,F0=`float getShadowMask() {
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
}`,O0=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,B0=`#ifdef USE_SKINNING
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
#endif`,z0=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,k0=`#ifdef USE_SKINNING
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
#endif`,H0=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,V0=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,G0=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,W0=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,X0=`#ifdef USE_TRANSMISSION
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
#endif`,$0=`#ifdef USE_TRANSMISSION
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
#endif`,q0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Y0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Z0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,J0=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,K0=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,j0=`uniform sampler2D t2D;
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
}`,Q0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,ex=`#ifdef ENVMAP_TYPE_CUBE
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
}`,tx=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,nx=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,ix=`#include <common>
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
}`,rx=`#if DEPTH_PACKING == 3200
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
}`,sx=`#define DISTANCE
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
}`,ox=`#define DISTANCE
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
}`,ax=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,lx=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,cx=`uniform float scale;
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
}`,hx=`uniform vec3 diffuse;
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
}`,ux=`#include <common>
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
}`,dx=`uniform vec3 diffuse;
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
}`,fx=`#define LAMBERT
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
}`,px=`#define LAMBERT
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
}`,mx=`#define MATCAP
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
}`,gx=`#define MATCAP
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
}`,xx=`#define NORMAL
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
}`,_x=`#define NORMAL
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
}`,vx=`#define PHONG
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
}`,yx=`#define PHONG
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
}`,bx=`#define STANDARD
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
}`,Mx=`#define STANDARD
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
}`,Sx=`#define TOON
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
}`,Ex=`#define TOON
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
}`,wx=`uniform float size;
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
}`,Tx=`uniform vec3 diffuse;
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
}`,Ax=`#include <common>
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
}`,Rx=`uniform vec3 color;
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
}`,Cx=`uniform float rotation;
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
}`,Ix=`uniform vec3 diffuse;
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
}`,Qe={alphahash_fragment:jm,alphahash_pars_fragment:Qm,alphamap_fragment:eg,alphamap_pars_fragment:tg,alphatest_fragment:ng,alphatest_pars_fragment:ig,aomap_fragment:rg,aomap_pars_fragment:sg,batching_pars_vertex:og,batching_vertex:ag,begin_vertex:lg,beginnormal_vertex:cg,bsdfs:hg,iridescence_fragment:ug,bumpmap_pars_fragment:dg,clipping_planes_fragment:fg,clipping_planes_pars_fragment:pg,clipping_planes_pars_vertex:mg,clipping_planes_vertex:gg,color_fragment:xg,color_pars_fragment:_g,color_pars_vertex:vg,color_vertex:yg,common:bg,cube_uv_reflection_fragment:Mg,defaultnormal_vertex:Sg,displacementmap_pars_vertex:Eg,displacementmap_vertex:wg,emissivemap_fragment:Tg,emissivemap_pars_fragment:Ag,colorspace_fragment:Rg,colorspace_pars_fragment:Cg,envmap_fragment:Ig,envmap_common_pars_fragment:Pg,envmap_pars_fragment:Dg,envmap_pars_vertex:Lg,envmap_physical_pars_fragment:Wg,envmap_vertex:Ug,fog_vertex:Ng,fog_pars_vertex:Fg,fog_fragment:Og,fog_pars_fragment:Bg,gradientmap_pars_fragment:zg,lightmap_pars_fragment:kg,lights_lambert_fragment:Hg,lights_lambert_pars_fragment:Vg,lights_pars_begin:Gg,lights_toon_fragment:Xg,lights_toon_pars_fragment:$g,lights_phong_fragment:qg,lights_phong_pars_fragment:Yg,lights_physical_fragment:Zg,lights_physical_pars_fragment:Jg,lights_fragment_begin:Kg,lights_fragment_maps:jg,lights_fragment_end:Qg,logdepthbuf_fragment:e0,logdepthbuf_pars_fragment:t0,logdepthbuf_pars_vertex:n0,logdepthbuf_vertex:i0,map_fragment:r0,map_pars_fragment:s0,map_particle_fragment:o0,map_particle_pars_fragment:a0,metalnessmap_fragment:l0,metalnessmap_pars_fragment:c0,morphinstance_vertex:h0,morphcolor_vertex:u0,morphnormal_vertex:d0,morphtarget_pars_vertex:f0,morphtarget_vertex:p0,normal_fragment_begin:m0,normal_fragment_maps:g0,normal_pars_fragment:x0,normal_pars_vertex:_0,normal_vertex:v0,normalmap_pars_fragment:y0,clearcoat_normal_fragment_begin:b0,clearcoat_normal_fragment_maps:M0,clearcoat_pars_fragment:S0,iridescence_pars_fragment:E0,opaque_fragment:w0,packing:T0,premultiplied_alpha_fragment:A0,project_vertex:R0,dithering_fragment:C0,dithering_pars_fragment:I0,roughnessmap_fragment:P0,roughnessmap_pars_fragment:D0,shadowmap_pars_fragment:L0,shadowmap_pars_vertex:U0,shadowmap_vertex:N0,shadowmask_pars_fragment:F0,skinbase_vertex:O0,skinning_pars_vertex:B0,skinning_vertex:z0,skinnormal_vertex:k0,specularmap_fragment:H0,specularmap_pars_fragment:V0,tonemapping_fragment:G0,tonemapping_pars_fragment:W0,transmission_fragment:X0,transmission_pars_fragment:$0,uv_pars_fragment:q0,uv_pars_vertex:Y0,uv_vertex:Z0,worldpos_vertex:J0,background_vert:K0,background_frag:j0,backgroundCube_vert:Q0,backgroundCube_frag:ex,cube_vert:tx,cube_frag:nx,depth_vert:ix,depth_frag:rx,distanceRGBA_vert:sx,distanceRGBA_frag:ox,equirect_vert:ax,equirect_frag:lx,linedashed_vert:cx,linedashed_frag:hx,meshbasic_vert:ux,meshbasic_frag:dx,meshlambert_vert:fx,meshlambert_frag:px,meshmatcap_vert:mx,meshmatcap_frag:gx,meshnormal_vert:xx,meshnormal_frag:_x,meshphong_vert:vx,meshphong_frag:yx,meshphysical_vert:bx,meshphysical_frag:Mx,meshtoon_vert:Sx,meshtoon_frag:Ex,points_vert:wx,points_frag:Tx,shadow_vert:Ax,shadow_frag:Rx,sprite_vert:Cx,sprite_frag:Ix},Ae={common:{diffuse:{value:new je(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ke},alphaMap:{value:null},alphaMapTransform:{value:new Ke},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ke}},envmap:{envMap:{value:null},envMapRotation:{value:new Ke},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ke}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ke}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ke},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ke},normalScale:{value:new ye(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ke},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ke}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ke}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ke}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new je(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new je(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ke},alphaTest:{value:0},uvTransform:{value:new Ke}},sprite:{diffuse:{value:new je(16777215)},opacity:{value:1},center:{value:new ye(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ke},alphaMap:{value:null},alphaMapTransform:{value:new Ke},alphaTest:{value:0}}},_i={basic:{uniforms:rn([Ae.common,Ae.specularmap,Ae.envmap,Ae.aomap,Ae.lightmap,Ae.fog]),vertexShader:Qe.meshbasic_vert,fragmentShader:Qe.meshbasic_frag},lambert:{uniforms:rn([Ae.common,Ae.specularmap,Ae.envmap,Ae.aomap,Ae.lightmap,Ae.emissivemap,Ae.bumpmap,Ae.normalmap,Ae.displacementmap,Ae.fog,Ae.lights,{emissive:{value:new je(0)}}]),vertexShader:Qe.meshlambert_vert,fragmentShader:Qe.meshlambert_frag},phong:{uniforms:rn([Ae.common,Ae.specularmap,Ae.envmap,Ae.aomap,Ae.lightmap,Ae.emissivemap,Ae.bumpmap,Ae.normalmap,Ae.displacementmap,Ae.fog,Ae.lights,{emissive:{value:new je(0)},specular:{value:new je(1118481)},shininess:{value:30}}]),vertexShader:Qe.meshphong_vert,fragmentShader:Qe.meshphong_frag},standard:{uniforms:rn([Ae.common,Ae.envmap,Ae.aomap,Ae.lightmap,Ae.emissivemap,Ae.bumpmap,Ae.normalmap,Ae.displacementmap,Ae.roughnessmap,Ae.metalnessmap,Ae.fog,Ae.lights,{emissive:{value:new je(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Qe.meshphysical_vert,fragmentShader:Qe.meshphysical_frag},toon:{uniforms:rn([Ae.common,Ae.aomap,Ae.lightmap,Ae.emissivemap,Ae.bumpmap,Ae.normalmap,Ae.displacementmap,Ae.gradientmap,Ae.fog,Ae.lights,{emissive:{value:new je(0)}}]),vertexShader:Qe.meshtoon_vert,fragmentShader:Qe.meshtoon_frag},matcap:{uniforms:rn([Ae.common,Ae.bumpmap,Ae.normalmap,Ae.displacementmap,Ae.fog,{matcap:{value:null}}]),vertexShader:Qe.meshmatcap_vert,fragmentShader:Qe.meshmatcap_frag},points:{uniforms:rn([Ae.points,Ae.fog]),vertexShader:Qe.points_vert,fragmentShader:Qe.points_frag},dashed:{uniforms:rn([Ae.common,Ae.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Qe.linedashed_vert,fragmentShader:Qe.linedashed_frag},depth:{uniforms:rn([Ae.common,Ae.displacementmap]),vertexShader:Qe.depth_vert,fragmentShader:Qe.depth_frag},normal:{uniforms:rn([Ae.common,Ae.bumpmap,Ae.normalmap,Ae.displacementmap,{opacity:{value:1}}]),vertexShader:Qe.meshnormal_vert,fragmentShader:Qe.meshnormal_frag},sprite:{uniforms:rn([Ae.sprite,Ae.fog]),vertexShader:Qe.sprite_vert,fragmentShader:Qe.sprite_frag},background:{uniforms:{uvTransform:{value:new Ke},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Qe.background_vert,fragmentShader:Qe.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ke}},vertexShader:Qe.backgroundCube_vert,fragmentShader:Qe.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Qe.cube_vert,fragmentShader:Qe.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Qe.equirect_vert,fragmentShader:Qe.equirect_frag},distanceRGBA:{uniforms:rn([Ae.common,Ae.displacementmap,{referencePosition:{value:new R},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Qe.distanceRGBA_vert,fragmentShader:Qe.distanceRGBA_frag},shadow:{uniforms:rn([Ae.lights,Ae.fog,{color:{value:new je(0)},opacity:{value:1}}]),vertexShader:Qe.shadow_vert,fragmentShader:Qe.shadow_frag}};_i.physical={uniforms:rn([_i.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ke},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ke},clearcoatNormalScale:{value:new ye(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ke},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ke},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ke},sheen:{value:0},sheenColor:{value:new je(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ke},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ke},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ke},transmissionSamplerSize:{value:new ye},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ke},attenuationDistance:{value:0},attenuationColor:{value:new je(0)},specularColor:{value:new je(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ke},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ke},anisotropyVector:{value:new ye},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ke}}]),vertexShader:Qe.meshphysical_vert,fragmentShader:Qe.meshphysical_frag};var Yl={r:0,b:0,g:0},Dr=new kn,Px=new ot;function Dx(i,e,t,n,r,s,o){let a=new je(0),l=s===!0?0:1,c,h,u=null,d=0,f=null;function m(b){let y=b.isScene===!0?b.background:null;return y&&y.isTexture&&(y=(b.backgroundBlurriness>0?t:e).get(y)),y}function v(b){let y=!1,T=m(b);T===null?p(a,l):T&&T.isColor&&(p(T,1),y=!0);let A=i.xr.getEnvironmentBlendMode();A==="additive"?n.buffers.color.setClear(0,0,0,1,o):A==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(i.autoClear||y)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function g(b,y){let T=m(y);T&&(T.isCubeTexture||T.mapping===Fo)?(h===void 0&&(h=new Ct(new ii(1,1,1),new mn({name:"BackgroundCubeMaterial",uniforms:Pr(_i.backgroundCube.uniforms),vertexShader:_i.backgroundCube.vertexShader,fragmentShader:_i.backgroundCube.fragmentShader,side:cn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(A,C,D){this.matrixWorld.copyPosition(D.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(h)),Dr.copy(y.backgroundRotation),Dr.x*=-1,Dr.y*=-1,Dr.z*=-1,T.isCubeTexture&&T.isRenderTargetTexture===!1&&(Dr.y*=-1,Dr.z*=-1),h.material.uniforms.envMap.value=T,h.material.uniforms.flipEnvMap.value=T.isCubeTexture&&T.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=y.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(Px.makeRotationFromEuler(Dr)),h.material.toneMapped=dt.getTransfer(T.colorSpace)!==bt,(u!==T||d!==T.version||f!==i.toneMapping)&&(h.material.needsUpdate=!0,u=T,d=T.version,f=i.toneMapping),h.layers.enableAll(),b.unshift(h,h.geometry,h.material,0,0,null)):T&&T.isTexture&&(c===void 0&&(c=new Ct(new Ki(2,2),new mn({name:"BackgroundMaterial",uniforms:Pr(_i.background.uniforms),vertexShader:_i.background.vertexShader,fragmentShader:_i.background.fragmentShader,side:zn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(c)),c.material.uniforms.t2D.value=T,c.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,c.material.toneMapped=dt.getTransfer(T.colorSpace)!==bt,T.matrixAutoUpdate===!0&&T.updateMatrix(),c.material.uniforms.uvTransform.value.copy(T.matrix),(u!==T||d!==T.version||f!==i.toneMapping)&&(c.material.needsUpdate=!0,u=T,d=T.version,f=i.toneMapping),c.layers.enableAll(),b.unshift(c,c.geometry,c.material,0,0,null))}function p(b,y){b.getRGB(Yl,Th(i)),n.buffers.color.setClear(Yl.r,Yl.g,Yl.b,y,o)}function E(){h!==void 0&&(h.geometry.dispose(),h.material.dispose(),h=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return a},setClearColor:function(b,y=1){a.set(b),l=y,p(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(b){l=b,p(a,l)},render:v,addToRenderList:g,dispose:E}}function Lx(i,e){let t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},r=d(null),s=r,o=!1;function a(M,P,z,G,$){let X=!1,Z=u(G,z,P);s!==Z&&(s=Z,c(s.object)),X=f(M,G,z,$),X&&m(M,G,z,$),$!==null&&e.update($,i.ELEMENT_ARRAY_BUFFER),(X||o)&&(o=!1,y(M,P,z,G),$!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get($).buffer))}function l(){return i.createVertexArray()}function c(M){return i.bindVertexArray(M)}function h(M){return i.deleteVertexArray(M)}function u(M,P,z){let G=z.wireframe===!0,$=n[M.id];$===void 0&&($={},n[M.id]=$);let X=$[P.id];X===void 0&&(X={},$[P.id]=X);let Z=X[G];return Z===void 0&&(Z=d(l()),X[G]=Z),Z}function d(M){let P=[],z=[],G=[];for(let $=0;$<t;$++)P[$]=0,z[$]=0,G[$]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:P,enabledAttributes:z,attributeDivisors:G,object:M,attributes:{},index:null}}function f(M,P,z,G){let $=s.attributes,X=P.attributes,Z=0,de=z.getAttributes();for(let q in de)if(de[q].location>=0){let Te=$[q],De=X[q];if(De===void 0&&(q==="instanceMatrix"&&M.instanceMatrix&&(De=M.instanceMatrix),q==="instanceColor"&&M.instanceColor&&(De=M.instanceColor)),Te===void 0||Te.attribute!==De||De&&Te.data!==De.data)return!0;Z++}return s.attributesNum!==Z||s.index!==G}function m(M,P,z,G){let $={},X=P.attributes,Z=0,de=z.getAttributes();for(let q in de)if(de[q].location>=0){let Te=X[q];Te===void 0&&(q==="instanceMatrix"&&M.instanceMatrix&&(Te=M.instanceMatrix),q==="instanceColor"&&M.instanceColor&&(Te=M.instanceColor));let De={};De.attribute=Te,Te&&Te.data&&(De.data=Te.data),$[q]=De,Z++}s.attributes=$,s.attributesNum=Z,s.index=G}function v(){let M=s.newAttributes;for(let P=0,z=M.length;P<z;P++)M[P]=0}function g(M){p(M,0)}function p(M,P){let z=s.newAttributes,G=s.enabledAttributes,$=s.attributeDivisors;z[M]=1,G[M]===0&&(i.enableVertexAttribArray(M),G[M]=1),$[M]!==P&&(i.vertexAttribDivisor(M,P),$[M]=P)}function E(){let M=s.newAttributes,P=s.enabledAttributes;for(let z=0,G=P.length;z<G;z++)P[z]!==M[z]&&(i.disableVertexAttribArray(z),P[z]=0)}function b(M,P,z,G,$,X,Z){Z===!0?i.vertexAttribIPointer(M,P,z,$,X):i.vertexAttribPointer(M,P,z,G,$,X)}function y(M,P,z,G){v();let $=G.attributes,X=z.getAttributes(),Z=P.defaultAttributeValues;for(let de in X){let q=X[de];if(q.location>=0){let ge=$[de];if(ge===void 0&&(de==="instanceMatrix"&&M.instanceMatrix&&(ge=M.instanceMatrix),de==="instanceColor"&&M.instanceColor&&(ge=M.instanceColor)),ge!==void 0){let Te=ge.normalized,De=ge.itemSize,Ze=e.get(ge);if(Ze===void 0)continue;let at=Ze.buffer,st=Ze.type,ct=Ze.bytesPerElement,K=st===i.INT||st===i.UNSIGNED_INT||ge.gpuType===ul;if(ge.isInterleavedBufferAttribute){let se=ge.data,Ce=se.stride,ze=ge.offset;if(se.isInstancedInterleavedBuffer){for(let Ne=0;Ne<q.locationSize;Ne++)p(q.location+Ne,se.meshPerAttribute);M.isInstancedMesh!==!0&&G._maxInstanceCount===void 0&&(G._maxInstanceCount=se.meshPerAttribute*se.count)}else for(let Ne=0;Ne<q.locationSize;Ne++)g(q.location+Ne);i.bindBuffer(i.ARRAY_BUFFER,at);for(let Ne=0;Ne<q.locationSize;Ne++)b(q.location+Ne,De/q.locationSize,st,Te,Ce*ct,(ze+De/q.locationSize*Ne)*ct,K)}else{if(ge.isInstancedBufferAttribute){for(let se=0;se<q.locationSize;se++)p(q.location+se,ge.meshPerAttribute);M.isInstancedMesh!==!0&&G._maxInstanceCount===void 0&&(G._maxInstanceCount=ge.meshPerAttribute*ge.count)}else for(let se=0;se<q.locationSize;se++)g(q.location+se);i.bindBuffer(i.ARRAY_BUFFER,at);for(let se=0;se<q.locationSize;se++)b(q.location+se,De/q.locationSize,st,Te,De*ct,De/q.locationSize*se*ct,K)}}else if(Z!==void 0){let Te=Z[de];if(Te!==void 0)switch(Te.length){case 2:i.vertexAttrib2fv(q.location,Te);break;case 3:i.vertexAttrib3fv(q.location,Te);break;case 4:i.vertexAttrib4fv(q.location,Te);break;default:i.vertexAttrib1fv(q.location,Te)}}}}E()}function T(){D();for(let M in n){let P=n[M];for(let z in P){let G=P[z];for(let $ in G)h(G[$].object),delete G[$];delete P[z]}delete n[M]}}function A(M){if(n[M.id]===void 0)return;let P=n[M.id];for(let z in P){let G=P[z];for(let $ in G)h(G[$].object),delete G[$];delete P[z]}delete n[M.id]}function C(M){for(let P in n){let z=n[P];if(z[M.id]===void 0)continue;let G=z[M.id];for(let $ in G)h(G[$].object),delete G[$];delete z[M.id]}}function D(){S(),o=!0,s!==r&&(s=r,c(s.object))}function S(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:a,reset:D,resetDefaultState:S,dispose:T,releaseStatesOfGeometry:A,releaseStatesOfProgram:C,initAttributes:v,enableAttribute:g,disableUnusedAttributes:E}}function Ux(i,e,t){let n;function r(c){n=c}function s(c,h){i.drawArrays(n,c,h),t.update(h,n,1)}function o(c,h,u){u!==0&&(i.drawArraysInstanced(n,c,h,u),t.update(h,n,u))}function a(c,h,u){if(u===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,h,0,u);let f=0;for(let m=0;m<u;m++)f+=h[m];t.update(f,n,1)}function l(c,h,u,d){if(u===0)return;let f=e.get("WEBGL_multi_draw");if(f===null)for(let m=0;m<c.length;m++)o(c[m],h[m],d[m]);else{f.multiDrawArraysInstancedWEBGL(n,c,0,h,0,d,0,u);let m=0;for(let v=0;v<u;v++)m+=h[v]*d[v];t.update(m,n,1)}}this.setMode=r,this.render=s,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=l}function Nx(i,e,t,n){let r;function s(){if(r!==void 0)return r;if(e.has("EXT_texture_filter_anisotropic")===!0){let C=e.get("EXT_texture_filter_anisotropic");r=i.getParameter(C.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function o(C){return!(C!==Tn&&n.convert(C)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(C){let D=C===vs&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(C!==oi&&n.convert(C)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&C!==Gn&&!D)}function l(C){if(C==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";C="mediump"}return C==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp",h=l(c);h!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);let u=t.logarithmicDepthBuffer===!0,d=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control"),f=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),m=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),v=i.getParameter(i.MAX_TEXTURE_SIZE),g=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),p=i.getParameter(i.MAX_VERTEX_ATTRIBS),E=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),b=i.getParameter(i.MAX_VARYING_VECTORS),y=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),T=m>0,A=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:u,reversedDepthBuffer:d,maxTextures:f,maxVertexTextures:m,maxTextureSize:v,maxCubemapSize:g,maxAttributes:p,maxVertexUniforms:E,maxVaryings:b,maxFragmentUniforms:y,vertexTextures:T,maxSamples:A}}function Fx(i){let e=this,t=null,n=0,r=!1,s=!1,o=new di,a=new Ke,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(u,d){let f=u.length!==0||d||n!==0||r;return r=d,n=u.length,f},this.beginShadows=function(){s=!0,h(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(u,d){t=h(u,d,0)},this.setState=function(u,d,f){let m=u.clippingPlanes,v=u.clipIntersection,g=u.clipShadows,p=i.get(u);if(!r||m===null||m.length===0||s&&!g)s?h(null):c();else{let E=s?0:n,b=E*4,y=p.clippingState||null;l.value=y,y=h(m,d,b,f);for(let T=0;T!==b;++T)y[T]=t[T];p.clippingState=y,this.numIntersection=v?this.numPlanes:0,this.numPlanes+=E}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function h(u,d,f,m){let v=u!==null?u.length:0,g=null;if(v!==0){if(g=l.value,m!==!0||g===null){let p=f+v*4,E=d.matrixWorldInverse;a.getNormalMatrix(E),(g===null||g.length<p)&&(g=new Float32Array(p));for(let b=0,y=f;b!==v;++b,y+=4)o.copy(u[b]).applyMatrix4(E,a),o.normal.toArray(g,y),g[y+3]=o.constant}l.value=g,l.needsUpdate=!0}return e.numPlanes=v,e.numIntersection=0,g}}function Ox(i){let e=new WeakMap;function t(o,a){return a===ll?o.mapping=Cr:a===cl&&(o.mapping=Ir),o}function n(o){if(o&&o.isTexture){let a=o.mapping;if(a===ll||a===cl)if(e.has(o)){let l=e.get(o).texture;return t(l,o.mapping)}else{let l=o.image;if(l&&l.height>0){let c=new Fa(l.height);return c.fromEquirectangularTexture(i,o),e.set(o,c),o.addEventListener("dispose",r),t(c.texture,o.mapping)}else return null}}return o}function r(o){let a=o.target;a.removeEventListener("dispose",r);let l=e.get(a);l!==void 0&&(e.delete(a),l.dispose())}function s(){e=new WeakMap}return{get:n,dispose:s}}var Ss=4,rf=[.125,.215,.35,.446,.526,.582],Nr=20,Ph=new Lo,sf=new je,Dh=null,Lh=0,Uh=0,Nh=!1,Ur=(1+Math.sqrt(5))/2,Ms=1/Ur,of=[new R(-Ur,Ms,0),new R(Ur,Ms,0),new R(-Ms,0,Ur),new R(Ms,0,Ur),new R(0,Ur,-Ms),new R(0,Ur,Ms),new R(-1,1,-1),new R(1,1,-1),new R(-1,1,1),new R(1,1,1)],Bx=new R,Kl=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,r=100,s={}){let{size:o=256,position:a=Bx}=s;Dh=this._renderer.getRenderTarget(),Lh=this._renderer.getActiveCubeFace(),Uh=this._renderer.getActiveMipmapLevel(),Nh=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(o);let l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,n,r,l,a),t>0&&this._blur(l,0,0,t),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=cf(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=lf(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(Dh,Lh,Uh),this._renderer.xr.enabled=Nh,e.scissorTest=!1,Zl(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Cr||e.mapping===Ir?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Dh=this._renderer.getRenderTarget(),Lh=this._renderer.getActiveCubeFace(),Uh=this._renderer.getActiveMipmapLevel(),Nh=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:ni,minFilter:ni,generateMipmaps:!1,type:vs,format:Tn,colorSpace:vr,depthBuffer:!1},r=af(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=af(e,t,n);let{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=zx(s)),this._blurMaterial=kx(s,e,t)}return r}_compileMaterial(e){let t=new Ct(this._lodPlanes[0],e);this._renderer.compile(t,Ph)}_sceneToCubeUV(e,t,n,r,s){let l=new jt(90,1,t,n),c=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],u=this._renderer,d=u.autoClear,f=u.toneMapping;u.getClearColor(sf),u.toneMapping=si,u.autoClear=!1,u.state.buffers.depth.getReversed()&&(u.setRenderTarget(r),u.clearDepth(),u.setRenderTarget(null));let v=new ro({name:"PMREM.Background",side:cn,depthWrite:!1,depthTest:!1}),g=new Ct(new ii,v),p=!1,E=e.background;E?E.isColor&&(v.color.copy(E),e.background=null,p=!0):(v.color.copy(sf),p=!0);for(let b=0;b<6;b++){let y=b%3;y===0?(l.up.set(0,c[b],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x+h[b],s.y,s.z)):y===1?(l.up.set(0,0,c[b]),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y+h[b],s.z)):(l.up.set(0,c[b],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y,s.z+h[b]));let T=this._cubeSize;Zl(r,y*T,b>2?T:0,T,T),u.setRenderTarget(r),p&&u.render(g,l),u.render(e,l)}g.geometry.dispose(),g.material.dispose(),u.toneMapping=f,u.autoClear=d,e.background=E}_textureToCubeUV(e,t){let n=this._renderer,r=e.mapping===Cr||e.mapping===Ir;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=cf()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=lf());let s=r?this._cubemapMaterial:this._equirectMaterial,o=new Ct(this._lodPlanes[0],s),a=s.uniforms;a.envMap.value=e;let l=this._cubeSize;Zl(t,0,0,3*l,2*l),n.setRenderTarget(t),n.render(o,Ph)}_applyPMREM(e){let t=this._renderer,n=t.autoClear;t.autoClear=!1;let r=this._lodPlanes.length;for(let s=1;s<r;s++){let o=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),a=of[(r-s-1)%of.length];this._blur(e,s-1,s,o,a)}t.autoClear=n}_blur(e,t,n,r,s){let o=this._pingPongRenderTarget;this._halfBlur(e,o,t,n,r,"latitudinal",s),this._halfBlur(o,e,n,n,r,"longitudinal",s)}_halfBlur(e,t,n,r,s,o,a){let l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");let h=3,u=new Ct(this._lodPlanes[r],c),d=c.uniforms,f=this._sizeLods[n]-1,m=isFinite(s)?Math.PI/(2*f):2*Math.PI/(2*Nr-1),v=s/m,g=isFinite(s)?1+Math.floor(h*v):Nr;g>Nr&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${g} samples when the maximum is set to ${Nr}`);let p=[],E=0;for(let C=0;C<Nr;++C){let D=C/v,S=Math.exp(-D*D/2);p.push(S),C===0?E+=S:C<g&&(E+=2*S)}for(let C=0;C<p.length;C++)p[C]=p[C]/E;d.envMap.value=e.texture,d.samples.value=g,d.weights.value=p,d.latitudinal.value=o==="latitudinal",a&&(d.poleAxis.value=a);let{_lodMax:b}=this;d.dTheta.value=m,d.mipInt.value=b-n;let y=this._sizeLods[r],T=3*y*(r>b-Ss?r-b+Ss:0),A=4*(this._cubeSize-y);Zl(t,T,A,3*y,2*y),l.setRenderTarget(t),l.render(u,Ph)}};function zx(i){let e=[],t=[],n=[],r=i,s=i-Ss+1+rf.length;for(let o=0;o<s;o++){let a=Math.pow(2,r);t.push(a);let l=1/a;o>i-Ss?l=rf[o-i+Ss-1]:o===0&&(l=0),n.push(l);let c=1/(a-2),h=-c,u=1+c,d=[h,h,u,h,u,u,h,h,u,u,h,u],f=6,m=6,v=3,g=2,p=1,E=new Float32Array(v*m*f),b=new Float32Array(g*m*f),y=new Float32Array(p*m*f);for(let A=0;A<f;A++){let C=A%3*2/3-1,D=A>2?0:-1,S=[C,D,0,C+2/3,D,0,C+2/3,D+1,0,C,D,0,C+2/3,D+1,0,C,D+1,0];E.set(S,v*m*A),b.set(d,g*m*A);let M=[A,A,A,A,A,A];y.set(M,p*m*A)}let T=new qt;T.setAttribute("position",new Ot(E,v)),T.setAttribute("uv",new Ot(b,g)),T.setAttribute("faceIndex",new Ot(y,p)),e.push(T),r>Ss&&r--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function af(i,e,t){let n=new pi(i,e,t);return n.texture.mapping=Fo,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Zl(i,e,t,n,r){i.viewport.set(e,t,n,r),i.scissor.set(e,t,n,r)}function kx(i,e,t){let n=new Float32Array(Nr),r=new R(0,1,0);return new mn({name:"SphericalGaussianBlur",defines:{n:Nr,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:$h(),fragmentShader:`

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
		`,blending:Di,depthTest:!1,depthWrite:!1})}function lf(){return new mn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:$h(),fragmentShader:`

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
		`,blending:Di,depthTest:!1,depthWrite:!1})}function cf(){return new mn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:$h(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Di,depthTest:!1,depthWrite:!1})}function $h(){return`

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
	`}function Hx(i){let e=new WeakMap,t=null;function n(a){if(a&&a.isTexture){let l=a.mapping,c=l===ll||l===cl,h=l===Cr||l===Ir;if(c||h){let u=e.get(a),d=u!==void 0?u.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==d)return t===null&&(t=new Kl(i)),u=c?t.fromEquirectangular(a,u):t.fromCubemap(a,u),u.texture.pmremVersion=a.pmremVersion,e.set(a,u),u.texture;if(u!==void 0)return u.texture;{let f=a.image;return c&&f&&f.height>0||h&&f&&r(f)?(t===null&&(t=new Kl(i)),u=c?t.fromEquirectangular(a):t.fromCubemap(a),u.texture.pmremVersion=a.pmremVersion,e.set(a,u),a.addEventListener("dispose",s),u.texture):null}}}return a}function r(a){let l=0,c=6;for(let h=0;h<c;h++)a[h]!==void 0&&l++;return l===c}function s(a){let l=a.target;l.removeEventListener("dispose",s);let c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function o(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:o}}function Vx(i){let e={};function t(n){if(e[n]!==void 0)return e[n];let r;switch(n){case"WEBGL_depth_texture":r=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":r=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":r=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":r=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:r=i.getExtension(n)}return e[n]=r,r}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){let r=t(n);return r===null&&as("THREE.WebGLRenderer: "+n+" extension not supported."),r}}}function Gx(i,e,t,n){let r={},s=new WeakMap;function o(u){let d=u.target;d.index!==null&&e.remove(d.index);for(let m in d.attributes)e.remove(d.attributes[m]);d.removeEventListener("dispose",o),delete r[d.id];let f=s.get(d);f&&(e.remove(f),s.delete(d)),n.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,t.memory.geometries--}function a(u,d){return r[d.id]===!0||(d.addEventListener("dispose",o),r[d.id]=!0,t.memory.geometries++),d}function l(u){let d=u.attributes;for(let f in d)e.update(d[f],i.ARRAY_BUFFER)}function c(u){let d=[],f=u.index,m=u.attributes.position,v=0;if(f!==null){let E=f.array;v=f.version;for(let b=0,y=E.length;b<y;b+=3){let T=E[b+0],A=E[b+1],C=E[b+2];d.push(T,A,A,C,C,T)}}else if(m!==void 0){let E=m.array;v=m.version;for(let b=0,y=E.length/3-1;b<y;b+=3){let T=b+0,A=b+1,C=b+2;d.push(T,A,A,C,C,T)}}else return;let g=new(wh(d)?so:yr)(d,1);g.version=v;let p=s.get(u);p&&e.remove(p),s.set(u,g)}function h(u){let d=s.get(u);if(d){let f=u.index;f!==null&&d.version<f.version&&c(u)}else c(u);return s.get(u)}return{get:a,update:l,getWireframeAttribute:h}}function Wx(i,e,t){let n;function r(d){n=d}let s,o;function a(d){s=d.type,o=d.bytesPerElement}function l(d,f){i.drawElements(n,f,s,d*o),t.update(f,n,1)}function c(d,f,m){m!==0&&(i.drawElementsInstanced(n,f,s,d*o,m),t.update(f,n,m))}function h(d,f,m){if(m===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,f,0,s,d,0,m);let g=0;for(let p=0;p<m;p++)g+=f[p];t.update(g,n,1)}function u(d,f,m,v){if(m===0)return;let g=e.get("WEBGL_multi_draw");if(g===null)for(let p=0;p<d.length;p++)c(d[p]/o,f[p],v[p]);else{g.multiDrawElementsInstancedWEBGL(n,f,0,s,d,0,v,0,m);let p=0;for(let E=0;E<m;E++)p+=f[E]*v[E];t.update(p,n,1)}}this.setMode=r,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=h,this.renderMultiDrawInstances=u}function Xx(i){let e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(s,o,a){switch(t.calls++,o){case i.TRIANGLES:t.triangles+=a*(s/3);break;case i.LINES:t.lines+=a*(s/2);break;case i.LINE_STRIP:t.lines+=a*(s-1);break;case i.LINE_LOOP:t.lines+=a*s;break;case i.POINTS:t.points+=a*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function r(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:r,update:n}}function $x(i,e,t){let n=new WeakMap,r=new mt;function s(o,a,l){let c=o.morphTargetInfluences,h=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,u=h!==void 0?h.length:0,d=n.get(a);if(d===void 0||d.count!==u){let S=function(){C.dispose(),n.delete(a),a.removeEventListener("dispose",S)};d!==void 0&&d.texture.dispose();let f=a.morphAttributes.position!==void 0,m=a.morphAttributes.normal!==void 0,v=a.morphAttributes.color!==void 0,g=a.morphAttributes.position||[],p=a.morphAttributes.normal||[],E=a.morphAttributes.color||[],b=0;f===!0&&(b=1),m===!0&&(b=2),v===!0&&(b=3);let y=a.attributes.position.count*b,T=1;y>e.maxTextureSize&&(T=Math.ceil(y/e.maxTextureSize),y=e.maxTextureSize);let A=new Float32Array(y*T*4*u),C=new to(A,y,T,u);C.type=Gn,C.needsUpdate=!0;let D=b*4;for(let M=0;M<u;M++){let P=g[M],z=p[M],G=E[M],$=y*T*4*M;for(let X=0;X<P.count;X++){let Z=X*D;f===!0&&(r.fromBufferAttribute(P,X),A[$+Z+0]=r.x,A[$+Z+1]=r.y,A[$+Z+2]=r.z,A[$+Z+3]=0),m===!0&&(r.fromBufferAttribute(z,X),A[$+Z+4]=r.x,A[$+Z+5]=r.y,A[$+Z+6]=r.z,A[$+Z+7]=0),v===!0&&(r.fromBufferAttribute(G,X),A[$+Z+8]=r.x,A[$+Z+9]=r.y,A[$+Z+10]=r.z,A[$+Z+11]=G.itemSize===4?r.w:1)}}d={count:u,texture:C,size:new ye(y,T)},n.set(a,d),a.addEventListener("dispose",S)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(i,"morphTexture",o.morphTexture,t);else{let f=0;for(let v=0;v<c.length;v++)f+=c[v];let m=a.morphTargetsRelative?1:1-f;l.getUniforms().setValue(i,"morphTargetBaseInfluence",m),l.getUniforms().setValue(i,"morphTargetInfluences",c)}l.getUniforms().setValue(i,"morphTargetsTexture",d.texture,t),l.getUniforms().setValue(i,"morphTargetsTextureSize",d.size)}return{update:s}}function qx(i,e,t,n){let r=new WeakMap;function s(l){let c=n.render.frame,h=l.geometry,u=e.get(l,h);if(r.get(u)!==c&&(e.update(u),r.set(u,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),r.get(l)!==c&&(t.update(l.instanceMatrix,i.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,i.ARRAY_BUFFER),r.set(l,c))),l.isSkinnedMesh){let d=l.skeleton;r.get(d)!==c&&(d.update(),r.set(d,c))}return u}function o(){r=new WeakMap}function a(l){let c=l.target;c.removeEventListener("dispose",a),t.remove(c.instanceMatrix),c.instanceColor!==null&&t.remove(c.instanceColor)}return{update:s,dispose:o}}var Rf=new pn,hf=new po(1,1),Cf=new to,If=new Ua,Pf=new ao,uf=[],df=[],ff=new Float32Array(16),pf=new Float32Array(9),mf=new Float32Array(4);function ws(i,e,t){let n=i[0];if(n<=0||n>0)return i;let r=e*t,s=uf[r];if(s===void 0&&(s=new Float32Array(r),uf[r]=s),e!==0){n.toArray(s,0);for(let o=1,a=0;o!==e;++o)a+=t,i[o].toArray(s,a)}return s}function Vt(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function Gt(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function Ql(i,e){let t=df[e];t===void 0&&(t=new Int32Array(e),df[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function Yx(i,e){let t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function Zx(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Vt(t,e))return;i.uniform2fv(this.addr,e),Gt(t,e)}}function Jx(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Vt(t,e))return;i.uniform3fv(this.addr,e),Gt(t,e)}}function Kx(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Vt(t,e))return;i.uniform4fv(this.addr,e),Gt(t,e)}}function jx(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(Vt(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),Gt(t,e)}else{if(Vt(t,n))return;mf.set(n),i.uniformMatrix2fv(this.addr,!1,mf),Gt(t,n)}}function Qx(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(Vt(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),Gt(t,e)}else{if(Vt(t,n))return;pf.set(n),i.uniformMatrix3fv(this.addr,!1,pf),Gt(t,n)}}function e_(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(Vt(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),Gt(t,e)}else{if(Vt(t,n))return;ff.set(n),i.uniformMatrix4fv(this.addr,!1,ff),Gt(t,n)}}function t_(i,e){let t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function n_(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Vt(t,e))return;i.uniform2iv(this.addr,e),Gt(t,e)}}function i_(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Vt(t,e))return;i.uniform3iv(this.addr,e),Gt(t,e)}}function r_(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Vt(t,e))return;i.uniform4iv(this.addr,e),Gt(t,e)}}function s_(i,e){let t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function o_(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Vt(t,e))return;i.uniform2uiv(this.addr,e),Gt(t,e)}}function a_(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Vt(t,e))return;i.uniform3uiv(this.addr,e),Gt(t,e)}}function l_(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Vt(t,e))return;i.uniform4uiv(this.addr,e),Gt(t,e)}}function c_(i,e,t){let n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r);let s;this.type===i.SAMPLER_2D_SHADOW?(hf.compareFunction=yh,s=hf):s=Rf,t.setTexture2D(e||s,r)}function h_(i,e,t){let n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTexture3D(e||If,r)}function u_(i,e,t){let n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTextureCube(e||Pf,r)}function d_(i,e,t){let n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTexture2DArray(e||Cf,r)}function f_(i){switch(i){case 5126:return Yx;case 35664:return Zx;case 35665:return Jx;case 35666:return Kx;case 35674:return jx;case 35675:return Qx;case 35676:return e_;case 5124:case 35670:return t_;case 35667:case 35671:return n_;case 35668:case 35672:return i_;case 35669:case 35673:return r_;case 5125:return s_;case 36294:return o_;case 36295:return a_;case 36296:return l_;case 35678:case 36198:case 36298:case 36306:case 35682:return c_;case 35679:case 36299:case 36307:return h_;case 35680:case 36300:case 36308:case 36293:return u_;case 36289:case 36303:case 36311:case 36292:return d_}}function p_(i,e){i.uniform1fv(this.addr,e)}function m_(i,e){let t=ws(e,this.size,2);i.uniform2fv(this.addr,t)}function g_(i,e){let t=ws(e,this.size,3);i.uniform3fv(this.addr,t)}function x_(i,e){let t=ws(e,this.size,4);i.uniform4fv(this.addr,t)}function __(i,e){let t=ws(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function v_(i,e){let t=ws(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function y_(i,e){let t=ws(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function b_(i,e){i.uniform1iv(this.addr,e)}function M_(i,e){i.uniform2iv(this.addr,e)}function S_(i,e){i.uniform3iv(this.addr,e)}function E_(i,e){i.uniform4iv(this.addr,e)}function w_(i,e){i.uniform1uiv(this.addr,e)}function T_(i,e){i.uniform2uiv(this.addr,e)}function A_(i,e){i.uniform3uiv(this.addr,e)}function R_(i,e){i.uniform4uiv(this.addr,e)}function C_(i,e,t){let n=this.cache,r=e.length,s=Ql(t,r);Vt(n,s)||(i.uniform1iv(this.addr,s),Gt(n,s));for(let o=0;o!==r;++o)t.setTexture2D(e[o]||Rf,s[o])}function I_(i,e,t){let n=this.cache,r=e.length,s=Ql(t,r);Vt(n,s)||(i.uniform1iv(this.addr,s),Gt(n,s));for(let o=0;o!==r;++o)t.setTexture3D(e[o]||If,s[o])}function P_(i,e,t){let n=this.cache,r=e.length,s=Ql(t,r);Vt(n,s)||(i.uniform1iv(this.addr,s),Gt(n,s));for(let o=0;o!==r;++o)t.setTextureCube(e[o]||Pf,s[o])}function D_(i,e,t){let n=this.cache,r=e.length,s=Ql(t,r);Vt(n,s)||(i.uniform1iv(this.addr,s),Gt(n,s));for(let o=0;o!==r;++o)t.setTexture2DArray(e[o]||Cf,s[o])}function L_(i){switch(i){case 5126:return p_;case 35664:return m_;case 35665:return g_;case 35666:return x_;case 35674:return __;case 35675:return v_;case 35676:return y_;case 5124:case 35670:return b_;case 35667:case 35671:return M_;case 35668:case 35672:return S_;case 35669:case 35673:return E_;case 5125:return w_;case 36294:return T_;case 36295:return A_;case 36296:return R_;case 35678:case 36198:case 36298:case 36306:case 35682:return C_;case 35679:case 36299:case 36307:return I_;case 35680:case 36300:case 36308:case 36293:return P_;case 36289:case 36303:case 36311:case 36292:return D_}}var Oh=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=f_(t.type)}},Bh=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=L_(t.type)}},zh=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let r=this.seq;for(let s=0,o=r.length;s!==o;++s){let a=r[s];a.setValue(e,t[a.id],n)}}},Fh=/(\w+)(\])?(\[|\.)?/g;function gf(i,e){i.seq.push(e),i.map[e.id]=e}function U_(i,e,t){let n=i.name,r=n.length;for(Fh.lastIndex=0;;){let s=Fh.exec(n),o=Fh.lastIndex,a=s[1],l=s[2]==="]",c=s[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===r){gf(t,c===void 0?new Oh(a,i,e):new Bh(a,i,e));break}else{let u=t.map[a];u===void 0&&(u=new zh(a),gf(t,u)),t=u}}}var Es=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let r=0;r<n;++r){let s=e.getActiveUniform(t,r),o=e.getUniformLocation(t,s.name);U_(s,o,this)}}setValue(e,t,n,r){let s=this.map[t];s!==void 0&&s.setValue(e,n,r)}setOptional(e,t,n){let r=t[n];r!==void 0&&this.setValue(e,n,r)}static upload(e,t,n,r){for(let s=0,o=t.length;s!==o;++s){let a=t[s],l=n[a.id];l.needsUpdate!==!1&&a.setValue(e,l.value,r)}}static seqWithValue(e,t){let n=[];for(let r=0,s=e.length;r!==s;++r){let o=e[r];o.id in t&&n.push(o)}return n}};function xf(i,e,t){let n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}var N_=37297,F_=0;function O_(i,e){let t=i.split(`
`),n=[],r=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let o=r;o<s;o++){let a=o+1;n.push(`${a===e?">":" "} ${a}: ${t[o]}`)}return n.join(`
`)}var _f=new Ke;function B_(i){dt._getMatrix(_f,dt.workingColorSpace,i);let e=`mat3( ${_f.elements.map(t=>t.toFixed(4))} )`;switch(dt.getTransfer(i)){case js:return[e,"LinearTransferOETF"];case bt:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",i),[e,"LinearTransferOETF"]}}function vf(i,e,t){let n=i.getShaderParameter(e,i.COMPILE_STATUS),s=(i.getShaderInfoLog(e)||"").trim();if(n&&s==="")return"";let o=/ERROR: 0:(\d+)/.exec(s);if(o){let a=parseInt(o[1]);return t.toUpperCase()+`

`+s+`

`+O_(i.getShaderSource(e),a)}else return s}function z_(i,e){let t=B_(e);return[`vec4 ${i}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function k_(i,e){let t;switch(e){case wd:t="Linear";break;case Td:t="Reinhard";break;case Ad:t="Cineon";break;case No:t="ACESFilmic";break;case Cd:t="AgX";break;case Id:t="Neutral";break;case Rd:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}var Jl=new R;function H_(){dt.getLuminanceCoefficients(Jl);let i=Jl.x.toFixed(4),e=Jl.y.toFixed(4),t=Jl.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function V_(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Vo).join(`
`)}function G_(i){let e=[];for(let t in i){let n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function W_(i,e){let t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let r=0;r<n;r++){let s=i.getActiveAttrib(e,r),o=s.name,a=1;s.type===i.FLOAT_MAT2&&(a=2),s.type===i.FLOAT_MAT3&&(a=3),s.type===i.FLOAT_MAT4&&(a=4),t[o]={type:s.type,location:i.getAttribLocation(e,o),locationSize:a}}return t}function Vo(i){return i!==""}function yf(i,e){let t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function bf(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}var X_=/^[ \t]*#include +<([\w\d./]+)>/gm;function kh(i){return i.replace(X_,q_)}var $_=new Map;function q_(i,e){let t=Qe[e];if(t===void 0){let n=$_.get(e);if(n!==void 0)t=Qe[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return kh(t)}var Y_=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Mf(i){return i.replace(Y_,Z_)}function Z_(i,e,t,n){let r="";for(let s=parseInt(e);s<parseInt(t);s++)r+=n.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function Sf(i){let e=`precision ${i.precision} float;
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
#define LOW_PRECISION`),e}function J_(i){let e="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===lh?e="SHADOWMAP_TYPE_PCF":i.shadowMapType===Qa?e="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===xi&&(e="SHADOWMAP_TYPE_VSM"),e}function K_(i){let e="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case Cr:case Ir:e="ENVMAP_TYPE_CUBE";break;case Fo:e="ENVMAP_TYPE_CUBE_UV";break}return e}function j_(i){let e="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case Ir:e="ENVMAP_MODE_REFRACTION";break}return e}function Q_(i){let e="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case al:e="ENVMAP_BLENDING_MULTIPLY";break;case Sd:e="ENVMAP_BLENDING_MIX";break;case Ed:e="ENVMAP_BLENDING_ADD";break}return e}function ev(i){let e=i.envMapCubeUVHeight;if(e===null)return null;let t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:n,maxMip:t}}function tv(i,e,t,n){let r=i.getContext(),s=t.defines,o=t.vertexShader,a=t.fragmentShader,l=J_(t),c=K_(t),h=j_(t),u=Q_(t),d=ev(t),f=V_(t),m=G_(s),v=r.createProgram(),g,p,E=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(g=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m].filter(Vo).join(`
`),g.length>0&&(g+=`
`),p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m].filter(Vo).join(`
`),p.length>0&&(p+=`
`)):(g=[Sf(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Vo).join(`
`),p=[Sf(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+h:"",t.envMap?"#define "+u:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==si?"#define TONE_MAPPING":"",t.toneMapping!==si?Qe.tonemapping_pars_fragment:"",t.toneMapping!==si?k_("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Qe.colorspace_pars_fragment,z_("linearToOutputTexel",t.outputColorSpace),H_(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Vo).join(`
`)),o=kh(o),o=yf(o,t),o=bf(o,t),a=kh(a),a=yf(a,t),a=bf(a,t),o=Mf(o),a=Mf(a),t.isRawShaderMaterial!==!0&&(E=`#version 300 es
`,g=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,p=["#define varying in",t.glslVersion===Mh?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Mh?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);let b=E+g+o,y=E+p+a,T=xf(r,r.VERTEX_SHADER,b),A=xf(r,r.FRAGMENT_SHADER,y);r.attachShader(v,T),r.attachShader(v,A),t.index0AttributeName!==void 0?r.bindAttribLocation(v,0,t.index0AttributeName):t.morphTargets===!0&&r.bindAttribLocation(v,0,"position"),r.linkProgram(v);function C(P){if(i.debug.checkShaderErrors){let z=r.getProgramInfoLog(v)||"",G=r.getShaderInfoLog(T)||"",$=r.getShaderInfoLog(A)||"",X=z.trim(),Z=G.trim(),de=$.trim(),q=!0,ge=!0;if(r.getProgramParameter(v,r.LINK_STATUS)===!1)if(q=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(r,v,T,A);else{let Te=vf(r,T,"vertex"),De=vf(r,A,"fragment");console.error("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(v,r.VALIDATE_STATUS)+`

Material Name: `+P.name+`
Material Type: `+P.type+`

Program Info Log: `+X+`
`+Te+`
`+De)}else X!==""?console.warn("THREE.WebGLProgram: Program Info Log:",X):(Z===""||de==="")&&(ge=!1);ge&&(P.diagnostics={runnable:q,programLog:X,vertexShader:{log:Z,prefix:g},fragmentShader:{log:de,prefix:p}})}r.deleteShader(T),r.deleteShader(A),D=new Es(r,v),S=W_(r,v)}let D;this.getUniforms=function(){return D===void 0&&C(this),D};let S;this.getAttributes=function(){return S===void 0&&C(this),S};let M=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return M===!1&&(M=r.getProgramParameter(v,N_)),M},this.destroy=function(){n.releaseStatesOfProgram(this),r.deleteProgram(v),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=F_++,this.cacheKey=e,this.usedTimes=1,this.program=v,this.vertexShader=T,this.fragmentShader=A,this}var nv=0,Hh=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){let t=e.vertexShader,n=e.fragmentShader,r=this._getShaderStage(t),s=this._getShaderStage(n),o=this._getShaderCacheForMaterial(e);return o.has(r)===!1&&(o.add(r),r.usedTimes++),o.has(s)===!1&&(o.add(s),s.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new Vh(e),t.set(e,n)),n}},Vh=class{constructor(e){this.id=nv++,this.code=e,this.usedTimes=0}};function iv(i,e,t,n,r,s,o){let a=new io,l=new Hh,c=new Set,h=[],u=r.logarithmicDepthBuffer,d=r.vertexTextures,f=r.precision,m={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function v(S){return c.add(S),S===0?"uv":`uv${S}`}function g(S,M,P,z,G){let $=z.fog,X=G.geometry,Z=S.isMeshStandardMaterial?z.environment:null,de=(S.isMeshStandardMaterial?t:e).get(S.envMap||Z),q=de&&de.mapping===Fo?de.image.height:null,ge=m[S.type];S.precision!==null&&(f=r.getMaxPrecision(S.precision),f!==S.precision&&console.warn("THREE.WebGLProgram.getParameters:",S.precision,"not supported, using",f,"instead."));let Te=X.morphAttributes.position||X.morphAttributes.normal||X.morphAttributes.color,De=Te!==void 0?Te.length:0,Ze=0;X.morphAttributes.position!==void 0&&(Ze=1),X.morphAttributes.normal!==void 0&&(Ze=2),X.morphAttributes.color!==void 0&&(Ze=3);let at,st,ct,K;if(ge){let ht=_i[ge];at=ht.vertexShader,st=ht.fragmentShader}else at=S.vertexShader,st=S.fragmentShader,l.update(S),ct=l.getVertexShaderID(S),K=l.getFragmentShaderID(S);let se=i.getRenderTarget(),Ce=i.state.buffers.depth.getReversed(),ze=G.isInstancedMesh===!0,Ne=G.isBatchedMesh===!0,et=!!S.map,tt=!!S.matcap,I=!!de,oe=!!S.aoMap,te=!!S.lightMap,Q=!!S.bumpMap,j=!!S.normalMap,_e=!!S.displacementMap,le=!!S.emissiveMap,ve=!!S.metalnessMap,qe=!!S.roughnessMap,We=S.anisotropy>0,w=S.clearcoat>0,_=S.dispersion>0,B=S.iridescence>0,W=S.sheen>0,ne=S.transmission>0,Y=We&&!!S.anisotropyMap,Le=w&&!!S.clearcoatMap,ce=w&&!!S.clearcoatNormalMap,Ue=w&&!!S.clearcoatRoughnessMap,Fe=B&&!!S.iridescenceMap,he=B&&!!S.iridescenceThicknessMap,Ee=W&&!!S.sheenColorMap,He=W&&!!S.sheenRoughnessMap,Be=!!S.specularMap,Me=!!S.specularColorMap,Ye=!!S.specularIntensityMap,U=ne&&!!S.transmissionMap,fe=ne&&!!S.thicknessMap,pe=!!S.gradientMap,xe=!!S.alphaMap,ae=S.alphaTest>0,ee=!!S.alphaHash,Oe=!!S.extensions,Xe=si;S.toneMapped&&(se===null||se.isXRRenderTarget===!0)&&(Xe=i.toneMapping);let xt={shaderID:ge,shaderType:S.type,shaderName:S.name,vertexShader:at,fragmentShader:st,defines:S.defines,customVertexShaderID:ct,customFragmentShaderID:K,isRawShaderMaterial:S.isRawShaderMaterial===!0,glslVersion:S.glslVersion,precision:f,batching:Ne,batchingColor:Ne&&G._colorsTexture!==null,instancing:ze,instancingColor:ze&&G.instanceColor!==null,instancingMorph:ze&&G.morphTexture!==null,supportsVertexTextures:d,outputColorSpace:se===null?i.outputColorSpace:se.isXRRenderTarget===!0?se.texture.colorSpace:vr,alphaToCoverage:!!S.alphaToCoverage,map:et,matcap:tt,envMap:I,envMapMode:I&&de.mapping,envMapCubeUVHeight:q,aoMap:oe,lightMap:te,bumpMap:Q,normalMap:j,displacementMap:d&&_e,emissiveMap:le,normalMapObjectSpace:j&&S.normalMapType===zd,normalMapTangentSpace:j&&S.normalMapType===ql,metalnessMap:ve,roughnessMap:qe,anisotropy:We,anisotropyMap:Y,clearcoat:w,clearcoatMap:Le,clearcoatNormalMap:ce,clearcoatRoughnessMap:Ue,dispersion:_,iridescence:B,iridescenceMap:Fe,iridescenceThicknessMap:he,sheen:W,sheenColorMap:Ee,sheenRoughnessMap:He,specularMap:Be,specularColorMap:Me,specularIntensityMap:Ye,transmission:ne,transmissionMap:U,thicknessMap:fe,gradientMap:pe,opaque:S.transparent===!1&&S.blending===xr&&S.alphaToCoverage===!1,alphaMap:xe,alphaTest:ae,alphaHash:ee,combine:S.combine,mapUv:et&&v(S.map.channel),aoMapUv:oe&&v(S.aoMap.channel),lightMapUv:te&&v(S.lightMap.channel),bumpMapUv:Q&&v(S.bumpMap.channel),normalMapUv:j&&v(S.normalMap.channel),displacementMapUv:_e&&v(S.displacementMap.channel),emissiveMapUv:le&&v(S.emissiveMap.channel),metalnessMapUv:ve&&v(S.metalnessMap.channel),roughnessMapUv:qe&&v(S.roughnessMap.channel),anisotropyMapUv:Y&&v(S.anisotropyMap.channel),clearcoatMapUv:Le&&v(S.clearcoatMap.channel),clearcoatNormalMapUv:ce&&v(S.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Ue&&v(S.clearcoatRoughnessMap.channel),iridescenceMapUv:Fe&&v(S.iridescenceMap.channel),iridescenceThicknessMapUv:he&&v(S.iridescenceThicknessMap.channel),sheenColorMapUv:Ee&&v(S.sheenColorMap.channel),sheenRoughnessMapUv:He&&v(S.sheenRoughnessMap.channel),specularMapUv:Be&&v(S.specularMap.channel),specularColorMapUv:Me&&v(S.specularColorMap.channel),specularIntensityMapUv:Ye&&v(S.specularIntensityMap.channel),transmissionMapUv:U&&v(S.transmissionMap.channel),thicknessMapUv:fe&&v(S.thicknessMap.channel),alphaMapUv:xe&&v(S.alphaMap.channel),vertexTangents:!!X.attributes.tangent&&(j||We),vertexColors:S.vertexColors,vertexAlphas:S.vertexColors===!0&&!!X.attributes.color&&X.attributes.color.itemSize===4,pointsUvs:G.isPoints===!0&&!!X.attributes.uv&&(et||xe),fog:!!$,useFog:S.fog===!0,fogExp2:!!$&&$.isFogExp2,flatShading:S.flatShading===!0&&S.wireframe===!1,sizeAttenuation:S.sizeAttenuation===!0,logarithmicDepthBuffer:u,reversedDepthBuffer:Ce,skinning:G.isSkinnedMesh===!0,morphTargets:X.morphAttributes.position!==void 0,morphNormals:X.morphAttributes.normal!==void 0,morphColors:X.morphAttributes.color!==void 0,morphTargetsCount:De,morphTextureStride:Ze,numDirLights:M.directional.length,numPointLights:M.point.length,numSpotLights:M.spot.length,numSpotLightMaps:M.spotLightMap.length,numRectAreaLights:M.rectArea.length,numHemiLights:M.hemi.length,numDirLightShadows:M.directionalShadowMap.length,numPointLightShadows:M.pointShadowMap.length,numSpotLightShadows:M.spotShadowMap.length,numSpotLightShadowsWithMaps:M.numSpotLightShadowsWithMaps,numLightProbes:M.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:S.dithering,shadowMapEnabled:i.shadowMap.enabled&&P.length>0,shadowMapType:i.shadowMap.type,toneMapping:Xe,decodeVideoTexture:et&&S.map.isVideoTexture===!0&&dt.getTransfer(S.map.colorSpace)===bt,decodeVideoTextureEmissive:le&&S.emissiveMap.isVideoTexture===!0&&dt.getTransfer(S.emissiveMap.colorSpace)===bt,premultipliedAlpha:S.premultipliedAlpha,doubleSided:S.side===Vn,flipSided:S.side===cn,useDepthPacking:S.depthPacking>=0,depthPacking:S.depthPacking||0,index0AttributeName:S.index0AttributeName,extensionClipCullDistance:Oe&&S.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Oe&&S.extensions.multiDraw===!0||Ne)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:S.customProgramCacheKey()};return xt.vertexUv1s=c.has(1),xt.vertexUv2s=c.has(2),xt.vertexUv3s=c.has(3),c.clear(),xt}function p(S){let M=[];if(S.shaderID?M.push(S.shaderID):(M.push(S.customVertexShaderID),M.push(S.customFragmentShaderID)),S.defines!==void 0)for(let P in S.defines)M.push(P),M.push(S.defines[P]);return S.isRawShaderMaterial===!1&&(E(M,S),b(M,S),M.push(i.outputColorSpace)),M.push(S.customProgramCacheKey),M.join()}function E(S,M){S.push(M.precision),S.push(M.outputColorSpace),S.push(M.envMapMode),S.push(M.envMapCubeUVHeight),S.push(M.mapUv),S.push(M.alphaMapUv),S.push(M.lightMapUv),S.push(M.aoMapUv),S.push(M.bumpMapUv),S.push(M.normalMapUv),S.push(M.displacementMapUv),S.push(M.emissiveMapUv),S.push(M.metalnessMapUv),S.push(M.roughnessMapUv),S.push(M.anisotropyMapUv),S.push(M.clearcoatMapUv),S.push(M.clearcoatNormalMapUv),S.push(M.clearcoatRoughnessMapUv),S.push(M.iridescenceMapUv),S.push(M.iridescenceThicknessMapUv),S.push(M.sheenColorMapUv),S.push(M.sheenRoughnessMapUv),S.push(M.specularMapUv),S.push(M.specularColorMapUv),S.push(M.specularIntensityMapUv),S.push(M.transmissionMapUv),S.push(M.thicknessMapUv),S.push(M.combine),S.push(M.fogExp2),S.push(M.sizeAttenuation),S.push(M.morphTargetsCount),S.push(M.morphAttributeCount),S.push(M.numDirLights),S.push(M.numPointLights),S.push(M.numSpotLights),S.push(M.numSpotLightMaps),S.push(M.numHemiLights),S.push(M.numRectAreaLights),S.push(M.numDirLightShadows),S.push(M.numPointLightShadows),S.push(M.numSpotLightShadows),S.push(M.numSpotLightShadowsWithMaps),S.push(M.numLightProbes),S.push(M.shadowMapType),S.push(M.toneMapping),S.push(M.numClippingPlanes),S.push(M.numClipIntersection),S.push(M.depthPacking)}function b(S,M){a.disableAll(),M.supportsVertexTextures&&a.enable(0),M.instancing&&a.enable(1),M.instancingColor&&a.enable(2),M.instancingMorph&&a.enable(3),M.matcap&&a.enable(4),M.envMap&&a.enable(5),M.normalMapObjectSpace&&a.enable(6),M.normalMapTangentSpace&&a.enable(7),M.clearcoat&&a.enable(8),M.iridescence&&a.enable(9),M.alphaTest&&a.enable(10),M.vertexColors&&a.enable(11),M.vertexAlphas&&a.enable(12),M.vertexUv1s&&a.enable(13),M.vertexUv2s&&a.enable(14),M.vertexUv3s&&a.enable(15),M.vertexTangents&&a.enable(16),M.anisotropy&&a.enable(17),M.alphaHash&&a.enable(18),M.batching&&a.enable(19),M.dispersion&&a.enable(20),M.batchingColor&&a.enable(21),M.gradientMap&&a.enable(22),S.push(a.mask),a.disableAll(),M.fog&&a.enable(0),M.useFog&&a.enable(1),M.flatShading&&a.enable(2),M.logarithmicDepthBuffer&&a.enable(3),M.reversedDepthBuffer&&a.enable(4),M.skinning&&a.enable(5),M.morphTargets&&a.enable(6),M.morphNormals&&a.enable(7),M.morphColors&&a.enable(8),M.premultipliedAlpha&&a.enable(9),M.shadowMapEnabled&&a.enable(10),M.doubleSided&&a.enable(11),M.flipSided&&a.enable(12),M.useDepthPacking&&a.enable(13),M.dithering&&a.enable(14),M.transmission&&a.enable(15),M.sheen&&a.enable(16),M.opaque&&a.enable(17),M.pointsUvs&&a.enable(18),M.decodeVideoTexture&&a.enable(19),M.decodeVideoTextureEmissive&&a.enable(20),M.alphaToCoverage&&a.enable(21),S.push(a.mask)}function y(S){let M=m[S.type],P;if(M){let z=_i[M];P=Jd.clone(z.uniforms)}else P=S.uniforms;return P}function T(S,M){let P;for(let z=0,G=h.length;z<G;z++){let $=h[z];if($.cacheKey===M){P=$,++P.usedTimes;break}}return P===void 0&&(P=new tv(i,M,S,s),h.push(P)),P}function A(S){if(--S.usedTimes===0){let M=h.indexOf(S);h[M]=h[h.length-1],h.pop(),S.destroy()}}function C(S){l.remove(S)}function D(){l.dispose()}return{getParameters:g,getProgramCacheKey:p,getUniforms:y,acquireProgram:T,releaseProgram:A,releaseShaderCache:C,programs:h,dispose:D}}function rv(){let i=new WeakMap;function e(o){return i.has(o)}function t(o){let a=i.get(o);return a===void 0&&(a={},i.set(o,a)),a}function n(o){i.delete(o)}function r(o,a,l){i.get(o)[a]=l}function s(){i=new WeakMap}return{has:e,get:t,remove:n,update:r,dispose:s}}function sv(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.z!==e.z?i.z-e.z:i.id-e.id}function Ef(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function wf(){let i=[],e=0,t=[],n=[],r=[];function s(){e=0,t.length=0,n.length=0,r.length=0}function o(u,d,f,m,v,g){let p=i[e];return p===void 0?(p={id:u.id,object:u,geometry:d,material:f,groupOrder:m,renderOrder:u.renderOrder,z:v,group:g},i[e]=p):(p.id=u.id,p.object=u,p.geometry=d,p.material=f,p.groupOrder=m,p.renderOrder=u.renderOrder,p.z=v,p.group=g),e++,p}function a(u,d,f,m,v,g){let p=o(u,d,f,m,v,g);f.transmission>0?n.push(p):f.transparent===!0?r.push(p):t.push(p)}function l(u,d,f,m,v,g){let p=o(u,d,f,m,v,g);f.transmission>0?n.unshift(p):f.transparent===!0?r.unshift(p):t.unshift(p)}function c(u,d){t.length>1&&t.sort(u||sv),n.length>1&&n.sort(d||Ef),r.length>1&&r.sort(d||Ef)}function h(){for(let u=e,d=i.length;u<d;u++){let f=i[u];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:t,transmissive:n,transparent:r,init:s,push:a,unshift:l,finish:h,sort:c}}function ov(){let i=new WeakMap;function e(n,r){let s=i.get(n),o;return s===void 0?(o=new wf,i.set(n,[o])):r>=s.length?(o=new wf,s.push(o)):o=s[r],o}function t(){i=new WeakMap}return{get:e,dispose:t}}function av(){let i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new R,color:new je};break;case"SpotLight":t={position:new R,direction:new R,color:new je,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new R,color:new je,distance:0,decay:0};break;case"HemisphereLight":t={direction:new R,skyColor:new je,groundColor:new je};break;case"RectAreaLight":t={color:new je,position:new R,halfWidth:new R,halfHeight:new R};break}return i[e.id]=t,t}}}function lv(){let i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ye};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ye};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ye,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}var cv=0;function hv(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function uv(i){let e=new av,t=lv(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new R);let r=new R,s=new ot,o=new ot;function a(c){let h=0,u=0,d=0;for(let S=0;S<9;S++)n.probe[S].set(0,0,0);let f=0,m=0,v=0,g=0,p=0,E=0,b=0,y=0,T=0,A=0,C=0;c.sort(hv);for(let S=0,M=c.length;S<M;S++){let P=c[S],z=P.color,G=P.intensity,$=P.distance,X=P.shadow&&P.shadow.map?P.shadow.map.texture:null;if(P.isAmbientLight)h+=z.r*G,u+=z.g*G,d+=z.b*G;else if(P.isLightProbe){for(let Z=0;Z<9;Z++)n.probe[Z].addScaledVector(P.sh.coefficients[Z],G);C++}else if(P.isDirectionalLight){let Z=e.get(P);if(Z.color.copy(P.color).multiplyScalar(P.intensity),P.castShadow){let de=P.shadow,q=t.get(P);q.shadowIntensity=de.intensity,q.shadowBias=de.bias,q.shadowNormalBias=de.normalBias,q.shadowRadius=de.radius,q.shadowMapSize=de.mapSize,n.directionalShadow[f]=q,n.directionalShadowMap[f]=X,n.directionalShadowMatrix[f]=P.shadow.matrix,E++}n.directional[f]=Z,f++}else if(P.isSpotLight){let Z=e.get(P);Z.position.setFromMatrixPosition(P.matrixWorld),Z.color.copy(z).multiplyScalar(G),Z.distance=$,Z.coneCos=Math.cos(P.angle),Z.penumbraCos=Math.cos(P.angle*(1-P.penumbra)),Z.decay=P.decay,n.spot[v]=Z;let de=P.shadow;if(P.map&&(n.spotLightMap[T]=P.map,T++,de.updateMatrices(P),P.castShadow&&A++),n.spotLightMatrix[v]=de.matrix,P.castShadow){let q=t.get(P);q.shadowIntensity=de.intensity,q.shadowBias=de.bias,q.shadowNormalBias=de.normalBias,q.shadowRadius=de.radius,q.shadowMapSize=de.mapSize,n.spotShadow[v]=q,n.spotShadowMap[v]=X,y++}v++}else if(P.isRectAreaLight){let Z=e.get(P);Z.color.copy(z).multiplyScalar(G),Z.halfWidth.set(P.width*.5,0,0),Z.halfHeight.set(0,P.height*.5,0),n.rectArea[g]=Z,g++}else if(P.isPointLight){let Z=e.get(P);if(Z.color.copy(P.color).multiplyScalar(P.intensity),Z.distance=P.distance,Z.decay=P.decay,P.castShadow){let de=P.shadow,q=t.get(P);q.shadowIntensity=de.intensity,q.shadowBias=de.bias,q.shadowNormalBias=de.normalBias,q.shadowRadius=de.radius,q.shadowMapSize=de.mapSize,q.shadowCameraNear=de.camera.near,q.shadowCameraFar=de.camera.far,n.pointShadow[m]=q,n.pointShadowMap[m]=X,n.pointShadowMatrix[m]=P.shadow.matrix,b++}n.point[m]=Z,m++}else if(P.isHemisphereLight){let Z=e.get(P);Z.skyColor.copy(P.color).multiplyScalar(G),Z.groundColor.copy(P.groundColor).multiplyScalar(G),n.hemi[p]=Z,p++}}g>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=Ae.LTC_FLOAT_1,n.rectAreaLTC2=Ae.LTC_FLOAT_2):(n.rectAreaLTC1=Ae.LTC_HALF_1,n.rectAreaLTC2=Ae.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=u,n.ambient[2]=d;let D=n.hash;(D.directionalLength!==f||D.pointLength!==m||D.spotLength!==v||D.rectAreaLength!==g||D.hemiLength!==p||D.numDirectionalShadows!==E||D.numPointShadows!==b||D.numSpotShadows!==y||D.numSpotMaps!==T||D.numLightProbes!==C)&&(n.directional.length=f,n.spot.length=v,n.rectArea.length=g,n.point.length=m,n.hemi.length=p,n.directionalShadow.length=E,n.directionalShadowMap.length=E,n.pointShadow.length=b,n.pointShadowMap.length=b,n.spotShadow.length=y,n.spotShadowMap.length=y,n.directionalShadowMatrix.length=E,n.pointShadowMatrix.length=b,n.spotLightMatrix.length=y+T-A,n.spotLightMap.length=T,n.numSpotLightShadowsWithMaps=A,n.numLightProbes=C,D.directionalLength=f,D.pointLength=m,D.spotLength=v,D.rectAreaLength=g,D.hemiLength=p,D.numDirectionalShadows=E,D.numPointShadows=b,D.numSpotShadows=y,D.numSpotMaps=T,D.numLightProbes=C,n.version=cv++)}function l(c,h){let u=0,d=0,f=0,m=0,v=0,g=h.matrixWorldInverse;for(let p=0,E=c.length;p<E;p++){let b=c[p];if(b.isDirectionalLight){let y=n.directional[u];y.direction.setFromMatrixPosition(b.matrixWorld),r.setFromMatrixPosition(b.target.matrixWorld),y.direction.sub(r),y.direction.transformDirection(g),u++}else if(b.isSpotLight){let y=n.spot[f];y.position.setFromMatrixPosition(b.matrixWorld),y.position.applyMatrix4(g),y.direction.setFromMatrixPosition(b.matrixWorld),r.setFromMatrixPosition(b.target.matrixWorld),y.direction.sub(r),y.direction.transformDirection(g),f++}else if(b.isRectAreaLight){let y=n.rectArea[m];y.position.setFromMatrixPosition(b.matrixWorld),y.position.applyMatrix4(g),o.identity(),s.copy(b.matrixWorld),s.premultiply(g),o.extractRotation(s),y.halfWidth.set(b.width*.5,0,0),y.halfHeight.set(0,b.height*.5,0),y.halfWidth.applyMatrix4(o),y.halfHeight.applyMatrix4(o),m++}else if(b.isPointLight){let y=n.point[d];y.position.setFromMatrixPosition(b.matrixWorld),y.position.applyMatrix4(g),d++}else if(b.isHemisphereLight){let y=n.hemi[v];y.direction.setFromMatrixPosition(b.matrixWorld),y.direction.transformDirection(g),v++}}}return{setup:a,setupView:l,state:n}}function Tf(i){let e=new uv(i),t=[],n=[];function r(h){c.camera=h,t.length=0,n.length=0}function s(h){t.push(h)}function o(h){n.push(h)}function a(){e.setup(t)}function l(h){e.setupView(t,h)}let c={lightsArray:t,shadowsArray:n,camera:null,lights:e,transmissionRenderTarget:{}};return{init:r,state:c,setupLights:a,setupLightsView:l,pushLight:s,pushShadow:o}}function dv(i){let e=new WeakMap;function t(r,s=0){let o=e.get(r),a;return o===void 0?(a=new Tf(i),e.set(r,[a])):s>=o.length?(a=new Tf(i),o.push(a)):a=o[s],a}function n(){e=new WeakMap}return{get:t,dispose:n}}var fv=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,pv=`uniform sampler2D shadow_pass;
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
}`;function mv(i,e,t){let n=new fs,r=new ye,s=new ye,o=new mt,a=new Va({depthPacking:Bd}),l=new Ga,c={},h=t.maxTextureSize,u={[zn]:cn,[cn]:zn,[Vn]:Vn},d=new mn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ye},radius:{value:4}},vertexShader:fv,fragmentShader:pv}),f=d.clone();f.defines.HORIZONTAL_PASS=1;let m=new qt;m.setAttribute("position",new Ot(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let v=new Ct(m,d),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=lh;let p=this.type;this.render=function(A,C,D){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||A.length===0)return;let S=i.getRenderTarget(),M=i.getActiveCubeFace(),P=i.getActiveMipmapLevel(),z=i.state;z.setBlending(Di),z.buffers.depth.getReversed()===!0?z.buffers.color.setClear(0,0,0,0):z.buffers.color.setClear(1,1,1,1),z.buffers.depth.setTest(!0),z.setScissorTest(!1);let G=p!==xi&&this.type===xi,$=p===xi&&this.type!==xi;for(let X=0,Z=A.length;X<Z;X++){let de=A[X],q=de.shadow;if(q===void 0){console.warn("THREE.WebGLShadowMap:",de,"has no shadow.");continue}if(q.autoUpdate===!1&&q.needsUpdate===!1)continue;r.copy(q.mapSize);let ge=q.getFrameExtents();if(r.multiply(ge),s.copy(q.mapSize),(r.x>h||r.y>h)&&(r.x>h&&(s.x=Math.floor(h/ge.x),r.x=s.x*ge.x,q.mapSize.x=s.x),r.y>h&&(s.y=Math.floor(h/ge.y),r.y=s.y*ge.y,q.mapSize.y=s.y)),q.map===null||G===!0||$===!0){let De=this.type!==xi?{minFilter:fn,magFilter:fn}:{};q.map!==null&&q.map.dispose(),q.map=new pi(r.x,r.y,De),q.map.texture.name=de.name+".shadowMap",q.camera.updateProjectionMatrix()}i.setRenderTarget(q.map),i.clear();let Te=q.getViewportCount();for(let De=0;De<Te;De++){let Ze=q.getViewport(De);o.set(s.x*Ze.x,s.y*Ze.y,s.x*Ze.z,s.y*Ze.w),z.viewport(o),q.updateMatrices(de,De),n=q.getFrustum(),y(C,D,q.camera,de,this.type)}q.isPointLightShadow!==!0&&this.type===xi&&E(q,D),q.needsUpdate=!1}p=this.type,g.needsUpdate=!1,i.setRenderTarget(S,M,P)};function E(A,C){let D=e.update(v);d.defines.VSM_SAMPLES!==A.blurSamples&&(d.defines.VSM_SAMPLES=A.blurSamples,f.defines.VSM_SAMPLES=A.blurSamples,d.needsUpdate=!0,f.needsUpdate=!0),A.mapPass===null&&(A.mapPass=new pi(r.x,r.y)),d.uniforms.shadow_pass.value=A.map.texture,d.uniforms.resolution.value=A.mapSize,d.uniforms.radius.value=A.radius,i.setRenderTarget(A.mapPass),i.clear(),i.renderBufferDirect(C,null,D,d,v,null),f.uniforms.shadow_pass.value=A.mapPass.texture,f.uniforms.resolution.value=A.mapSize,f.uniforms.radius.value=A.radius,i.setRenderTarget(A.map),i.clear(),i.renderBufferDirect(C,null,D,f,v,null)}function b(A,C,D,S){let M=null,P=D.isPointLight===!0?A.customDistanceMaterial:A.customDepthMaterial;if(P!==void 0)M=P;else if(M=D.isPointLight===!0?l:a,i.localClippingEnabled&&C.clipShadows===!0&&Array.isArray(C.clippingPlanes)&&C.clippingPlanes.length!==0||C.displacementMap&&C.displacementScale!==0||C.alphaMap&&C.alphaTest>0||C.map&&C.alphaTest>0||C.alphaToCoverage===!0){let z=M.uuid,G=C.uuid,$=c[z];$===void 0&&($={},c[z]=$);let X=$[G];X===void 0&&(X=M.clone(),$[G]=X,C.addEventListener("dispose",T)),M=X}if(M.visible=C.visible,M.wireframe=C.wireframe,S===xi?M.side=C.shadowSide!==null?C.shadowSide:C.side:M.side=C.shadowSide!==null?C.shadowSide:u[C.side],M.alphaMap=C.alphaMap,M.alphaTest=C.alphaToCoverage===!0?.5:C.alphaTest,M.map=C.map,M.clipShadows=C.clipShadows,M.clippingPlanes=C.clippingPlanes,M.clipIntersection=C.clipIntersection,M.displacementMap=C.displacementMap,M.displacementScale=C.displacementScale,M.displacementBias=C.displacementBias,M.wireframeLinewidth=C.wireframeLinewidth,M.linewidth=C.linewidth,D.isPointLight===!0&&M.isMeshDistanceMaterial===!0){let z=i.properties.get(M);z.light=D}return M}function y(A,C,D,S,M){if(A.visible===!1)return;if(A.layers.test(C.layers)&&(A.isMesh||A.isLine||A.isPoints)&&(A.castShadow||A.receiveShadow&&M===xi)&&(!A.frustumCulled||n.intersectsObject(A))){A.modelViewMatrix.multiplyMatrices(D.matrixWorldInverse,A.matrixWorld);let G=e.update(A),$=A.material;if(Array.isArray($)){let X=G.groups;for(let Z=0,de=X.length;Z<de;Z++){let q=X[Z],ge=$[q.materialIndex];if(ge&&ge.visible){let Te=b(A,ge,S,M);A.onBeforeShadow(i,A,C,D,G,Te,q),i.renderBufferDirect(D,null,G,Te,A,q),A.onAfterShadow(i,A,C,D,G,Te,q)}}}else if($.visible){let X=b(A,$,S,M);A.onBeforeShadow(i,A,C,D,G,X,null),i.renderBufferDirect(D,null,G,X,A,null),A.onAfterShadow(i,A,C,D,G,X,null)}}let z=A.children;for(let G=0,$=z.length;G<$;G++)y(z[G],C,D,S,M)}function T(A){A.target.removeEventListener("dispose",T);for(let D in c){let S=c[D],M=A.target.uuid;M in S&&(S[M].dispose(),delete S[M])}}}var gv={[el]:tl,[nl]:sl,[il]:ol,[_r]:rl,[tl]:el,[sl]:nl,[ol]:il,[rl]:_r};function xv(i,e){function t(){let U=!1,fe=new mt,pe=null,xe=new mt(0,0,0,0);return{setMask:function(ae){pe!==ae&&!U&&(i.colorMask(ae,ae,ae,ae),pe=ae)},setLocked:function(ae){U=ae},setClear:function(ae,ee,Oe,Xe,xt){xt===!0&&(ae*=Xe,ee*=Xe,Oe*=Xe),fe.set(ae,ee,Oe,Xe),xe.equals(fe)===!1&&(i.clearColor(ae,ee,Oe,Xe),xe.copy(fe))},reset:function(){U=!1,pe=null,xe.set(-1,0,0,0)}}}function n(){let U=!1,fe=!1,pe=null,xe=null,ae=null;return{setReversed:function(ee){if(fe!==ee){let Oe=e.get("EXT_clip_control");ee?Oe.clipControlEXT(Oe.LOWER_LEFT_EXT,Oe.ZERO_TO_ONE_EXT):Oe.clipControlEXT(Oe.LOWER_LEFT_EXT,Oe.NEGATIVE_ONE_TO_ONE_EXT),fe=ee;let Xe=ae;ae=null,this.setClear(Xe)}},getReversed:function(){return fe},setTest:function(ee){ee?se(i.DEPTH_TEST):Ce(i.DEPTH_TEST)},setMask:function(ee){pe!==ee&&!U&&(i.depthMask(ee),pe=ee)},setFunc:function(ee){if(fe&&(ee=gv[ee]),xe!==ee){switch(ee){case el:i.depthFunc(i.NEVER);break;case tl:i.depthFunc(i.ALWAYS);break;case nl:i.depthFunc(i.LESS);break;case _r:i.depthFunc(i.LEQUAL);break;case il:i.depthFunc(i.EQUAL);break;case rl:i.depthFunc(i.GEQUAL);break;case sl:i.depthFunc(i.GREATER);break;case ol:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}xe=ee}},setLocked:function(ee){U=ee},setClear:function(ee){ae!==ee&&(fe&&(ee=1-ee),i.clearDepth(ee),ae=ee)},reset:function(){U=!1,pe=null,xe=null,ae=null,fe=!1}}}function r(){let U=!1,fe=null,pe=null,xe=null,ae=null,ee=null,Oe=null,Xe=null,xt=null;return{setTest:function(ht){U||(ht?se(i.STENCIL_TEST):Ce(i.STENCIL_TEST))},setMask:function(ht){fe!==ht&&!U&&(i.stencilMask(ht),fe=ht)},setFunc:function(ht,Yn,Dn){(pe!==ht||xe!==Yn||ae!==Dn)&&(i.stencilFunc(ht,Yn,Dn),pe=ht,xe=Yn,ae=Dn)},setOp:function(ht,Yn,Dn){(ee!==ht||Oe!==Yn||Xe!==Dn)&&(i.stencilOp(ht,Yn,Dn),ee=ht,Oe=Yn,Xe=Dn)},setLocked:function(ht){U=ht},setClear:function(ht){xt!==ht&&(i.clearStencil(ht),xt=ht)},reset:function(){U=!1,fe=null,pe=null,xe=null,ae=null,ee=null,Oe=null,Xe=null,xt=null}}}let s=new t,o=new n,a=new r,l=new WeakMap,c=new WeakMap,h={},u={},d=new WeakMap,f=[],m=null,v=!1,g=null,p=null,E=null,b=null,y=null,T=null,A=null,C=new je(0,0,0),D=0,S=!1,M=null,P=null,z=null,G=null,$=null,X=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS),Z=!1,de=0,q=i.getParameter(i.VERSION);q.indexOf("WebGL")!==-1?(de=parseFloat(/^WebGL (\d)/.exec(q)[1]),Z=de>=1):q.indexOf("OpenGL ES")!==-1&&(de=parseFloat(/^OpenGL ES (\d)/.exec(q)[1]),Z=de>=2);let ge=null,Te={},De=i.getParameter(i.SCISSOR_BOX),Ze=i.getParameter(i.VIEWPORT),at=new mt().fromArray(De),st=new mt().fromArray(Ze);function ct(U,fe,pe,xe){let ae=new Uint8Array(4),ee=i.createTexture();i.bindTexture(U,ee),i.texParameteri(U,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(U,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Oe=0;Oe<pe;Oe++)U===i.TEXTURE_3D||U===i.TEXTURE_2D_ARRAY?i.texImage3D(fe,0,i.RGBA,1,1,xe,0,i.RGBA,i.UNSIGNED_BYTE,ae):i.texImage2D(fe+Oe,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,ae);return ee}let K={};K[i.TEXTURE_2D]=ct(i.TEXTURE_2D,i.TEXTURE_2D,1),K[i.TEXTURE_CUBE_MAP]=ct(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),K[i.TEXTURE_2D_ARRAY]=ct(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),K[i.TEXTURE_3D]=ct(i.TEXTURE_3D,i.TEXTURE_3D,1,1),s.setClear(0,0,0,1),o.setClear(1),a.setClear(0),se(i.DEPTH_TEST),o.setFunc(_r),Q(!1),j(ah),se(i.CULL_FACE),oe(Di);function se(U){h[U]!==!0&&(i.enable(U),h[U]=!0)}function Ce(U){h[U]!==!1&&(i.disable(U),h[U]=!1)}function ze(U,fe){return u[U]!==fe?(i.bindFramebuffer(U,fe),u[U]=fe,U===i.DRAW_FRAMEBUFFER&&(u[i.FRAMEBUFFER]=fe),U===i.FRAMEBUFFER&&(u[i.DRAW_FRAMEBUFFER]=fe),!0):!1}function Ne(U,fe){let pe=f,xe=!1;if(U){pe=d.get(fe),pe===void 0&&(pe=[],d.set(fe,pe));let ae=U.textures;if(pe.length!==ae.length||pe[0]!==i.COLOR_ATTACHMENT0){for(let ee=0,Oe=ae.length;ee<Oe;ee++)pe[ee]=i.COLOR_ATTACHMENT0+ee;pe.length=ae.length,xe=!0}}else pe[0]!==i.BACK&&(pe[0]=i.BACK,xe=!0);xe&&i.drawBuffers(pe)}function et(U){return m!==U?(i.useProgram(U),m=U,!0):!1}let tt={[Zi]:i.FUNC_ADD,[od]:i.FUNC_SUBTRACT,[ad]:i.FUNC_REVERSE_SUBTRACT};tt[ld]=i.MIN,tt[cd]=i.MAX;let I={[hd]:i.ZERO,[ud]:i.ONE,[dd]:i.SRC_COLOR,[Aa]:i.SRC_ALPHA,[_d]:i.SRC_ALPHA_SATURATE,[gd]:i.DST_COLOR,[pd]:i.DST_ALPHA,[fd]:i.ONE_MINUS_SRC_COLOR,[Ra]:i.ONE_MINUS_SRC_ALPHA,[xd]:i.ONE_MINUS_DST_COLOR,[md]:i.ONE_MINUS_DST_ALPHA,[vd]:i.CONSTANT_COLOR,[yd]:i.ONE_MINUS_CONSTANT_COLOR,[bd]:i.CONSTANT_ALPHA,[Md]:i.ONE_MINUS_CONSTANT_ALPHA};function oe(U,fe,pe,xe,ae,ee,Oe,Xe,xt,ht){if(U===Di){v===!0&&(Ce(i.BLEND),v=!1);return}if(v===!1&&(se(i.BLEND),v=!0),U!==sd){if(U!==g||ht!==S){if((p!==Zi||y!==Zi)&&(i.blendEquation(i.FUNC_ADD),p=Zi,y=Zi),ht)switch(U){case xr:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case ch:i.blendFunc(i.ONE,i.ONE);break;case hh:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case uh:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:console.error("THREE.WebGLState: Invalid blending: ",U);break}else switch(U){case xr:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case ch:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case hh:console.error("THREE.WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case uh:console.error("THREE.WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:console.error("THREE.WebGLState: Invalid blending: ",U);break}E=null,b=null,T=null,A=null,C.set(0,0,0),D=0,g=U,S=ht}return}ae=ae||fe,ee=ee||pe,Oe=Oe||xe,(fe!==p||ae!==y)&&(i.blendEquationSeparate(tt[fe],tt[ae]),p=fe,y=ae),(pe!==E||xe!==b||ee!==T||Oe!==A)&&(i.blendFuncSeparate(I[pe],I[xe],I[ee],I[Oe]),E=pe,b=xe,T=ee,A=Oe),(Xe.equals(C)===!1||xt!==D)&&(i.blendColor(Xe.r,Xe.g,Xe.b,xt),C.copy(Xe),D=xt),g=U,S=!1}function te(U,fe){U.side===Vn?Ce(i.CULL_FACE):se(i.CULL_FACE);let pe=U.side===cn;fe&&(pe=!pe),Q(pe),U.blending===xr&&U.transparent===!1?oe(Di):oe(U.blending,U.blendEquation,U.blendSrc,U.blendDst,U.blendEquationAlpha,U.blendSrcAlpha,U.blendDstAlpha,U.blendColor,U.blendAlpha,U.premultipliedAlpha),o.setFunc(U.depthFunc),o.setTest(U.depthTest),o.setMask(U.depthWrite),s.setMask(U.colorWrite);let xe=U.stencilWrite;a.setTest(xe),xe&&(a.setMask(U.stencilWriteMask),a.setFunc(U.stencilFunc,U.stencilRef,U.stencilFuncMask),a.setOp(U.stencilFail,U.stencilZFail,U.stencilZPass)),le(U.polygonOffset,U.polygonOffsetFactor,U.polygonOffsetUnits),U.alphaToCoverage===!0?se(i.SAMPLE_ALPHA_TO_COVERAGE):Ce(i.SAMPLE_ALPHA_TO_COVERAGE)}function Q(U){M!==U&&(U?i.frontFace(i.CW):i.frontFace(i.CCW),M=U)}function j(U){U!==id?(se(i.CULL_FACE),U!==P&&(U===ah?i.cullFace(i.BACK):U===rd?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):Ce(i.CULL_FACE),P=U}function _e(U){U!==z&&(Z&&i.lineWidth(U),z=U)}function le(U,fe,pe){U?(se(i.POLYGON_OFFSET_FILL),(G!==fe||$!==pe)&&(i.polygonOffset(fe,pe),G=fe,$=pe)):Ce(i.POLYGON_OFFSET_FILL)}function ve(U){U?se(i.SCISSOR_TEST):Ce(i.SCISSOR_TEST)}function qe(U){U===void 0&&(U=i.TEXTURE0+X-1),ge!==U&&(i.activeTexture(U),ge=U)}function We(U,fe,pe){pe===void 0&&(ge===null?pe=i.TEXTURE0+X-1:pe=ge);let xe=Te[pe];xe===void 0&&(xe={type:void 0,texture:void 0},Te[pe]=xe),(xe.type!==U||xe.texture!==fe)&&(ge!==pe&&(i.activeTexture(pe),ge=pe),i.bindTexture(U,fe||K[U]),xe.type=U,xe.texture=fe)}function w(){let U=Te[ge];U!==void 0&&U.type!==void 0&&(i.bindTexture(U.type,null),U.type=void 0,U.texture=void 0)}function _(){try{i.compressedTexImage2D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function B(){try{i.compressedTexImage3D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function W(){try{i.texSubImage2D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function ne(){try{i.texSubImage3D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Y(){try{i.compressedTexSubImage2D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Le(){try{i.compressedTexSubImage3D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function ce(){try{i.texStorage2D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Ue(){try{i.texStorage3D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Fe(){try{i.texImage2D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function he(){try{i.texImage3D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Ee(U){at.equals(U)===!1&&(i.scissor(U.x,U.y,U.z,U.w),at.copy(U))}function He(U){st.equals(U)===!1&&(i.viewport(U.x,U.y,U.z,U.w),st.copy(U))}function Be(U,fe){let pe=c.get(fe);pe===void 0&&(pe=new WeakMap,c.set(fe,pe));let xe=pe.get(U);xe===void 0&&(xe=i.getUniformBlockIndex(fe,U.name),pe.set(U,xe))}function Me(U,fe){let xe=c.get(fe).get(U);l.get(fe)!==xe&&(i.uniformBlockBinding(fe,xe,U.__bindingPointIndex),l.set(fe,xe))}function Ye(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),o.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),h={},ge=null,Te={},u={},d=new WeakMap,f=[],m=null,v=!1,g=null,p=null,E=null,b=null,y=null,T=null,A=null,C=new je(0,0,0),D=0,S=!1,M=null,P=null,z=null,G=null,$=null,at.set(0,0,i.canvas.width,i.canvas.height),st.set(0,0,i.canvas.width,i.canvas.height),s.reset(),o.reset(),a.reset()}return{buffers:{color:s,depth:o,stencil:a},enable:se,disable:Ce,bindFramebuffer:ze,drawBuffers:Ne,useProgram:et,setBlending:oe,setMaterial:te,setFlipSided:Q,setCullFace:j,setLineWidth:_e,setPolygonOffset:le,setScissorTest:ve,activeTexture:qe,bindTexture:We,unbindTexture:w,compressedTexImage2D:_,compressedTexImage3D:B,texImage2D:Fe,texImage3D:he,updateUBOMapping:Be,uniformBlockBinding:Me,texStorage2D:ce,texStorage3D:Ue,texSubImage2D:W,texSubImage3D:ne,compressedTexSubImage2D:Y,compressedTexSubImage3D:Le,scissor:Ee,viewport:He,reset:Ye}}function _v(i,e,t,n,r,s,o){let a=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new ye,h=new WeakMap,u,d=new WeakMap,f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function m(w,_){return f?new OffscreenCanvas(w,_):eo("canvas")}function v(w,_,B){let W=1,ne=We(w);if((ne.width>B||ne.height>B)&&(W=B/Math.max(ne.width,ne.height)),W<1)if(typeof HTMLImageElement<"u"&&w instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&w instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&w instanceof ImageBitmap||typeof VideoFrame<"u"&&w instanceof VideoFrame){let Y=Math.floor(W*ne.width),Le=Math.floor(W*ne.height);u===void 0&&(u=m(Y,Le));let ce=_?m(Y,Le):u;return ce.width=Y,ce.height=Le,ce.getContext("2d").drawImage(w,0,0,Y,Le),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+ne.width+"x"+ne.height+") to ("+Y+"x"+Le+")."),ce}else return"data"in w&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+ne.width+"x"+ne.height+")."),w;return w}function g(w){return w.generateMipmaps}function p(w){i.generateMipmap(w)}function E(w){return w.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:w.isWebGL3DRenderTarget?i.TEXTURE_3D:w.isWebGLArrayRenderTarget||w.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function b(w,_,B,W,ne=!1){if(w!==null){if(i[w]!==void 0)return i[w];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+w+"'")}let Y=_;if(_===i.RED&&(B===i.FLOAT&&(Y=i.R32F),B===i.HALF_FLOAT&&(Y=i.R16F),B===i.UNSIGNED_BYTE&&(Y=i.R8)),_===i.RED_INTEGER&&(B===i.UNSIGNED_BYTE&&(Y=i.R8UI),B===i.UNSIGNED_SHORT&&(Y=i.R16UI),B===i.UNSIGNED_INT&&(Y=i.R32UI),B===i.BYTE&&(Y=i.R8I),B===i.SHORT&&(Y=i.R16I),B===i.INT&&(Y=i.R32I)),_===i.RG&&(B===i.FLOAT&&(Y=i.RG32F),B===i.HALF_FLOAT&&(Y=i.RG16F),B===i.UNSIGNED_BYTE&&(Y=i.RG8)),_===i.RG_INTEGER&&(B===i.UNSIGNED_BYTE&&(Y=i.RG8UI),B===i.UNSIGNED_SHORT&&(Y=i.RG16UI),B===i.UNSIGNED_INT&&(Y=i.RG32UI),B===i.BYTE&&(Y=i.RG8I),B===i.SHORT&&(Y=i.RG16I),B===i.INT&&(Y=i.RG32I)),_===i.RGB_INTEGER&&(B===i.UNSIGNED_BYTE&&(Y=i.RGB8UI),B===i.UNSIGNED_SHORT&&(Y=i.RGB16UI),B===i.UNSIGNED_INT&&(Y=i.RGB32UI),B===i.BYTE&&(Y=i.RGB8I),B===i.SHORT&&(Y=i.RGB16I),B===i.INT&&(Y=i.RGB32I)),_===i.RGBA_INTEGER&&(B===i.UNSIGNED_BYTE&&(Y=i.RGBA8UI),B===i.UNSIGNED_SHORT&&(Y=i.RGBA16UI),B===i.UNSIGNED_INT&&(Y=i.RGBA32UI),B===i.BYTE&&(Y=i.RGBA8I),B===i.SHORT&&(Y=i.RGBA16I),B===i.INT&&(Y=i.RGBA32I)),_===i.RGB&&(B===i.UNSIGNED_INT_5_9_9_9_REV&&(Y=i.RGB9_E5),B===i.UNSIGNED_INT_10F_11F_11F_REV&&(Y=i.R11F_G11F_B10F)),_===i.RGBA){let Le=ne?js:dt.getTransfer(W);B===i.FLOAT&&(Y=i.RGBA32F),B===i.HALF_FLOAT&&(Y=i.RGBA16F),B===i.UNSIGNED_BYTE&&(Y=Le===bt?i.SRGB8_ALPHA8:i.RGBA8),B===i.UNSIGNED_SHORT_4_4_4_4&&(Y=i.RGBA4),B===i.UNSIGNED_SHORT_5_5_5_1&&(Y=i.RGB5_A1)}return(Y===i.R16F||Y===i.R32F||Y===i.RG16F||Y===i.RG32F||Y===i.RGBA16F||Y===i.RGBA32F)&&e.get("EXT_color_buffer_float"),Y}function y(w,_){let B;return w?_===null||_===Qi||_===ys?B=i.DEPTH24_STENCIL8:_===Gn?B=i.DEPTH32F_STENCIL8:_===_s&&(B=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):_===null||_===Qi||_===ys?B=i.DEPTH_COMPONENT24:_===Gn?B=i.DEPTH_COMPONENT32F:_===_s&&(B=i.DEPTH_COMPONENT16),B}function T(w,_){return g(w)===!0||w.isFramebufferTexture&&w.minFilter!==fn&&w.minFilter!==ni?Math.log2(Math.max(_.width,_.height))+1:w.mipmaps!==void 0&&w.mipmaps.length>0?w.mipmaps.length:w.isCompressedTexture&&Array.isArray(w.image)?_.mipmaps.length:1}function A(w){let _=w.target;_.removeEventListener("dispose",A),D(_),_.isVideoTexture&&h.delete(_)}function C(w){let _=w.target;_.removeEventListener("dispose",C),M(_)}function D(w){let _=n.get(w);if(_.__webglInit===void 0)return;let B=w.source,W=d.get(B);if(W){let ne=W[_.__cacheKey];ne.usedTimes--,ne.usedTimes===0&&S(w),Object.keys(W).length===0&&d.delete(B)}n.remove(w)}function S(w){let _=n.get(w);i.deleteTexture(_.__webglTexture);let B=w.source,W=d.get(B);delete W[_.__cacheKey],o.memory.textures--}function M(w){let _=n.get(w);if(w.depthTexture&&(w.depthTexture.dispose(),n.remove(w.depthTexture)),w.isWebGLCubeRenderTarget)for(let W=0;W<6;W++){if(Array.isArray(_.__webglFramebuffer[W]))for(let ne=0;ne<_.__webglFramebuffer[W].length;ne++)i.deleteFramebuffer(_.__webglFramebuffer[W][ne]);else i.deleteFramebuffer(_.__webglFramebuffer[W]);_.__webglDepthbuffer&&i.deleteRenderbuffer(_.__webglDepthbuffer[W])}else{if(Array.isArray(_.__webglFramebuffer))for(let W=0;W<_.__webglFramebuffer.length;W++)i.deleteFramebuffer(_.__webglFramebuffer[W]);else i.deleteFramebuffer(_.__webglFramebuffer);if(_.__webglDepthbuffer&&i.deleteRenderbuffer(_.__webglDepthbuffer),_.__webglMultisampledFramebuffer&&i.deleteFramebuffer(_.__webglMultisampledFramebuffer),_.__webglColorRenderbuffer)for(let W=0;W<_.__webglColorRenderbuffer.length;W++)_.__webglColorRenderbuffer[W]&&i.deleteRenderbuffer(_.__webglColorRenderbuffer[W]);_.__webglDepthRenderbuffer&&i.deleteRenderbuffer(_.__webglDepthRenderbuffer)}let B=w.textures;for(let W=0,ne=B.length;W<ne;W++){let Y=n.get(B[W]);Y.__webglTexture&&(i.deleteTexture(Y.__webglTexture),o.memory.textures--),n.remove(B[W])}n.remove(w)}let P=0;function z(){P=0}function G(){let w=P;return w>=r.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+w+" texture units while this GPU supports only "+r.maxTextures),P+=1,w}function $(w){let _=[];return _.push(w.wrapS),_.push(w.wrapT),_.push(w.wrapR||0),_.push(w.magFilter),_.push(w.minFilter),_.push(w.anisotropy),_.push(w.internalFormat),_.push(w.format),_.push(w.type),_.push(w.generateMipmaps),_.push(w.premultiplyAlpha),_.push(w.flipY),_.push(w.unpackAlignment),_.push(w.colorSpace),_.join()}function X(w,_){let B=n.get(w);if(w.isVideoTexture&&ve(w),w.isRenderTargetTexture===!1&&w.isExternalTexture!==!0&&w.version>0&&B.__version!==w.version){let W=w.image;if(W===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(W.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{K(B,w,_);return}}else w.isExternalTexture&&(B.__webglTexture=w.sourceTexture?w.sourceTexture:null);t.bindTexture(i.TEXTURE_2D,B.__webglTexture,i.TEXTURE0+_)}function Z(w,_){let B=n.get(w);if(w.isRenderTargetTexture===!1&&w.version>0&&B.__version!==w.version){K(B,w,_);return}t.bindTexture(i.TEXTURE_2D_ARRAY,B.__webglTexture,i.TEXTURE0+_)}function de(w,_){let B=n.get(w);if(w.isRenderTargetTexture===!1&&w.version>0&&B.__version!==w.version){K(B,w,_);return}t.bindTexture(i.TEXTURE_3D,B.__webglTexture,i.TEXTURE0+_)}function q(w,_){let B=n.get(w);if(w.version>0&&B.__version!==w.version){se(B,w,_);return}t.bindTexture(i.TEXTURE_CUBE_MAP,B.__webglTexture,i.TEXTURE0+_)}let ge={[Ca]:i.REPEAT,[Yi]:i.CLAMP_TO_EDGE,[Ia]:i.MIRRORED_REPEAT},Te={[fn]:i.NEAREST,[Dd]:i.NEAREST_MIPMAP_NEAREST,[Oo]:i.NEAREST_MIPMAP_LINEAR,[ni]:i.LINEAR,[hl]:i.LINEAR_MIPMAP_NEAREST,[ji]:i.LINEAR_MIPMAP_LINEAR},De={[kd]:i.NEVER,[$d]:i.ALWAYS,[Hd]:i.LESS,[yh]:i.LEQUAL,[Vd]:i.EQUAL,[Xd]:i.GEQUAL,[Gd]:i.GREATER,[Wd]:i.NOTEQUAL};function Ze(w,_){if(_.type===Gn&&e.has("OES_texture_float_linear")===!1&&(_.magFilter===ni||_.magFilter===hl||_.magFilter===Oo||_.magFilter===ji||_.minFilter===ni||_.minFilter===hl||_.minFilter===Oo||_.minFilter===ji)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(w,i.TEXTURE_WRAP_S,ge[_.wrapS]),i.texParameteri(w,i.TEXTURE_WRAP_T,ge[_.wrapT]),(w===i.TEXTURE_3D||w===i.TEXTURE_2D_ARRAY)&&i.texParameteri(w,i.TEXTURE_WRAP_R,ge[_.wrapR]),i.texParameteri(w,i.TEXTURE_MAG_FILTER,Te[_.magFilter]),i.texParameteri(w,i.TEXTURE_MIN_FILTER,Te[_.minFilter]),_.compareFunction&&(i.texParameteri(w,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(w,i.TEXTURE_COMPARE_FUNC,De[_.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(_.magFilter===fn||_.minFilter!==Oo&&_.minFilter!==ji||_.type===Gn&&e.has("OES_texture_float_linear")===!1)return;if(_.anisotropy>1||n.get(_).__currentAnisotropy){let B=e.get("EXT_texture_filter_anisotropic");i.texParameterf(w,B.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(_.anisotropy,r.getMaxAnisotropy())),n.get(_).__currentAnisotropy=_.anisotropy}}}function at(w,_){let B=!1;w.__webglInit===void 0&&(w.__webglInit=!0,_.addEventListener("dispose",A));let W=_.source,ne=d.get(W);ne===void 0&&(ne={},d.set(W,ne));let Y=$(_);if(Y!==w.__cacheKey){ne[Y]===void 0&&(ne[Y]={texture:i.createTexture(),usedTimes:0},o.memory.textures++,B=!0),ne[Y].usedTimes++;let Le=ne[w.__cacheKey];Le!==void 0&&(ne[w.__cacheKey].usedTimes--,Le.usedTimes===0&&S(_)),w.__cacheKey=Y,w.__webglTexture=ne[Y].texture}return B}function st(w,_,B){return Math.floor(Math.floor(w/B)/_)}function ct(w,_,B,W){let Y=w.updateRanges;if(Y.length===0)t.texSubImage2D(i.TEXTURE_2D,0,0,0,_.width,_.height,B,W,_.data);else{Y.sort((he,Ee)=>he.start-Ee.start);let Le=0;for(let he=1;he<Y.length;he++){let Ee=Y[Le],He=Y[he],Be=Ee.start+Ee.count,Me=st(He.start,_.width,4),Ye=st(Ee.start,_.width,4);He.start<=Be+1&&Me===Ye&&st(He.start+He.count-1,_.width,4)===Me?Ee.count=Math.max(Ee.count,He.start+He.count-Ee.start):(++Le,Y[Le]=He)}Y.length=Le+1;let ce=i.getParameter(i.UNPACK_ROW_LENGTH),Ue=i.getParameter(i.UNPACK_SKIP_PIXELS),Fe=i.getParameter(i.UNPACK_SKIP_ROWS);i.pixelStorei(i.UNPACK_ROW_LENGTH,_.width);for(let he=0,Ee=Y.length;he<Ee;he++){let He=Y[he],Be=Math.floor(He.start/4),Me=Math.ceil(He.count/4),Ye=Be%_.width,U=Math.floor(Be/_.width),fe=Me,pe=1;i.pixelStorei(i.UNPACK_SKIP_PIXELS,Ye),i.pixelStorei(i.UNPACK_SKIP_ROWS,U),t.texSubImage2D(i.TEXTURE_2D,0,Ye,U,fe,pe,B,W,_.data)}w.clearUpdateRanges(),i.pixelStorei(i.UNPACK_ROW_LENGTH,ce),i.pixelStorei(i.UNPACK_SKIP_PIXELS,Ue),i.pixelStorei(i.UNPACK_SKIP_ROWS,Fe)}}function K(w,_,B){let W=i.TEXTURE_2D;(_.isDataArrayTexture||_.isCompressedArrayTexture)&&(W=i.TEXTURE_2D_ARRAY),_.isData3DTexture&&(W=i.TEXTURE_3D);let ne=at(w,_),Y=_.source;t.bindTexture(W,w.__webglTexture,i.TEXTURE0+B);let Le=n.get(Y);if(Y.version!==Le.__version||ne===!0){t.activeTexture(i.TEXTURE0+B);let ce=dt.getPrimaries(dt.workingColorSpace),Ue=_.colorSpace===Li?null:dt.getPrimaries(_.colorSpace),Fe=_.colorSpace===Li||ce===Ue?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,_.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,_.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Fe);let he=v(_.image,!1,r.maxTextureSize);he=qe(_,he);let Ee=s.convert(_.format,_.colorSpace),He=s.convert(_.type),Be=b(_.internalFormat,Ee,He,_.colorSpace,_.isVideoTexture);Ze(W,_);let Me,Ye=_.mipmaps,U=_.isVideoTexture!==!0,fe=Le.__version===void 0||ne===!0,pe=Y.dataReady,xe=T(_,he);if(_.isDepthTexture)Be=y(_.format===bs,_.type),fe&&(U?t.texStorage2D(i.TEXTURE_2D,1,Be,he.width,he.height):t.texImage2D(i.TEXTURE_2D,0,Be,he.width,he.height,0,Ee,He,null));else if(_.isDataTexture)if(Ye.length>0){U&&fe&&t.texStorage2D(i.TEXTURE_2D,xe,Be,Ye[0].width,Ye[0].height);for(let ae=0,ee=Ye.length;ae<ee;ae++)Me=Ye[ae],U?pe&&t.texSubImage2D(i.TEXTURE_2D,ae,0,0,Me.width,Me.height,Ee,He,Me.data):t.texImage2D(i.TEXTURE_2D,ae,Be,Me.width,Me.height,0,Ee,He,Me.data);_.generateMipmaps=!1}else U?(fe&&t.texStorage2D(i.TEXTURE_2D,xe,Be,he.width,he.height),pe&&ct(_,he,Ee,He)):t.texImage2D(i.TEXTURE_2D,0,Be,he.width,he.height,0,Ee,He,he.data);else if(_.isCompressedTexture)if(_.isCompressedArrayTexture){U&&fe&&t.texStorage3D(i.TEXTURE_2D_ARRAY,xe,Be,Ye[0].width,Ye[0].height,he.depth);for(let ae=0,ee=Ye.length;ae<ee;ae++)if(Me=Ye[ae],_.format!==Tn)if(Ee!==null)if(U){if(pe)if(_.layerUpdates.size>0){let Oe=Ih(Me.width,Me.height,_.format,_.type);for(let Xe of _.layerUpdates){let xt=Me.data.subarray(Xe*Oe/Me.data.BYTES_PER_ELEMENT,(Xe+1)*Oe/Me.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,ae,0,0,Xe,Me.width,Me.height,1,Ee,xt)}_.clearLayerUpdates()}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,ae,0,0,0,Me.width,Me.height,he.depth,Ee,Me.data)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,ae,Be,Me.width,Me.height,he.depth,0,Me.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else U?pe&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,ae,0,0,0,Me.width,Me.height,he.depth,Ee,He,Me.data):t.texImage3D(i.TEXTURE_2D_ARRAY,ae,Be,Me.width,Me.height,he.depth,0,Ee,He,Me.data)}else{U&&fe&&t.texStorage2D(i.TEXTURE_2D,xe,Be,Ye[0].width,Ye[0].height);for(let ae=0,ee=Ye.length;ae<ee;ae++)Me=Ye[ae],_.format!==Tn?Ee!==null?U?pe&&t.compressedTexSubImage2D(i.TEXTURE_2D,ae,0,0,Me.width,Me.height,Ee,Me.data):t.compressedTexImage2D(i.TEXTURE_2D,ae,Be,Me.width,Me.height,0,Me.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):U?pe&&t.texSubImage2D(i.TEXTURE_2D,ae,0,0,Me.width,Me.height,Ee,He,Me.data):t.texImage2D(i.TEXTURE_2D,ae,Be,Me.width,Me.height,0,Ee,He,Me.data)}else if(_.isDataArrayTexture)if(U){if(fe&&t.texStorage3D(i.TEXTURE_2D_ARRAY,xe,Be,he.width,he.height,he.depth),pe)if(_.layerUpdates.size>0){let ae=Ih(he.width,he.height,_.format,_.type);for(let ee of _.layerUpdates){let Oe=he.data.subarray(ee*ae/he.data.BYTES_PER_ELEMENT,(ee+1)*ae/he.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,ee,he.width,he.height,1,Ee,He,Oe)}_.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,he.width,he.height,he.depth,Ee,He,he.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,Be,he.width,he.height,he.depth,0,Ee,He,he.data);else if(_.isData3DTexture)U?(fe&&t.texStorage3D(i.TEXTURE_3D,xe,Be,he.width,he.height,he.depth),pe&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,he.width,he.height,he.depth,Ee,He,he.data)):t.texImage3D(i.TEXTURE_3D,0,Be,he.width,he.height,he.depth,0,Ee,He,he.data);else if(_.isFramebufferTexture){if(fe)if(U)t.texStorage2D(i.TEXTURE_2D,xe,Be,he.width,he.height);else{let ae=he.width,ee=he.height;for(let Oe=0;Oe<xe;Oe++)t.texImage2D(i.TEXTURE_2D,Oe,Be,ae,ee,0,Ee,He,null),ae>>=1,ee>>=1}}else if(Ye.length>0){if(U&&fe){let ae=We(Ye[0]);t.texStorage2D(i.TEXTURE_2D,xe,Be,ae.width,ae.height)}for(let ae=0,ee=Ye.length;ae<ee;ae++)Me=Ye[ae],U?pe&&t.texSubImage2D(i.TEXTURE_2D,ae,0,0,Ee,He,Me):t.texImage2D(i.TEXTURE_2D,ae,Be,Ee,He,Me);_.generateMipmaps=!1}else if(U){if(fe){let ae=We(he);t.texStorage2D(i.TEXTURE_2D,xe,Be,ae.width,ae.height)}pe&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,Ee,He,he)}else t.texImage2D(i.TEXTURE_2D,0,Be,Ee,He,he);g(_)&&p(W),Le.__version=Y.version,_.onUpdate&&_.onUpdate(_)}w.__version=_.version}function se(w,_,B){if(_.image.length!==6)return;let W=at(w,_),ne=_.source;t.bindTexture(i.TEXTURE_CUBE_MAP,w.__webglTexture,i.TEXTURE0+B);let Y=n.get(ne);if(ne.version!==Y.__version||W===!0){t.activeTexture(i.TEXTURE0+B);let Le=dt.getPrimaries(dt.workingColorSpace),ce=_.colorSpace===Li?null:dt.getPrimaries(_.colorSpace),Ue=_.colorSpace===Li||Le===ce?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,_.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,_.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ue);let Fe=_.isCompressedTexture||_.image[0].isCompressedTexture,he=_.image[0]&&_.image[0].isDataTexture,Ee=[];for(let ee=0;ee<6;ee++)!Fe&&!he?Ee[ee]=v(_.image[ee],!0,r.maxCubemapSize):Ee[ee]=he?_.image[ee].image:_.image[ee],Ee[ee]=qe(_,Ee[ee]);let He=Ee[0],Be=s.convert(_.format,_.colorSpace),Me=s.convert(_.type),Ye=b(_.internalFormat,Be,Me,_.colorSpace),U=_.isVideoTexture!==!0,fe=Y.__version===void 0||W===!0,pe=ne.dataReady,xe=T(_,He);Ze(i.TEXTURE_CUBE_MAP,_);let ae;if(Fe){U&&fe&&t.texStorage2D(i.TEXTURE_CUBE_MAP,xe,Ye,He.width,He.height);for(let ee=0;ee<6;ee++){ae=Ee[ee].mipmaps;for(let Oe=0;Oe<ae.length;Oe++){let Xe=ae[Oe];_.format!==Tn?Be!==null?U?pe&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ee,Oe,0,0,Xe.width,Xe.height,Be,Xe.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ee,Oe,Ye,Xe.width,Xe.height,0,Xe.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):U?pe&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ee,Oe,0,0,Xe.width,Xe.height,Be,Me,Xe.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ee,Oe,Ye,Xe.width,Xe.height,0,Be,Me,Xe.data)}}}else{if(ae=_.mipmaps,U&&fe){ae.length>0&&xe++;let ee=We(Ee[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,xe,Ye,ee.width,ee.height)}for(let ee=0;ee<6;ee++)if(he){U?pe&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ee,0,0,0,Ee[ee].width,Ee[ee].height,Be,Me,Ee[ee].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ee,0,Ye,Ee[ee].width,Ee[ee].height,0,Be,Me,Ee[ee].data);for(let Oe=0;Oe<ae.length;Oe++){let xt=ae[Oe].image[ee].image;U?pe&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ee,Oe+1,0,0,xt.width,xt.height,Be,Me,xt.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ee,Oe+1,Ye,xt.width,xt.height,0,Be,Me,xt.data)}}else{U?pe&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ee,0,0,0,Be,Me,Ee[ee]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ee,0,Ye,Be,Me,Ee[ee]);for(let Oe=0;Oe<ae.length;Oe++){let Xe=ae[Oe];U?pe&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ee,Oe+1,0,0,Be,Me,Xe.image[ee]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ee,Oe+1,Ye,Be,Me,Xe.image[ee])}}}g(_)&&p(i.TEXTURE_CUBE_MAP),Y.__version=ne.version,_.onUpdate&&_.onUpdate(_)}w.__version=_.version}function Ce(w,_,B,W,ne,Y){let Le=s.convert(B.format,B.colorSpace),ce=s.convert(B.type),Ue=b(B.internalFormat,Le,ce,B.colorSpace),Fe=n.get(_),he=n.get(B);if(he.__renderTarget=_,!Fe.__hasExternalTextures){let Ee=Math.max(1,_.width>>Y),He=Math.max(1,_.height>>Y);ne===i.TEXTURE_3D||ne===i.TEXTURE_2D_ARRAY?t.texImage3D(ne,Y,Ue,Ee,He,_.depth,0,Le,ce,null):t.texImage2D(ne,Y,Ue,Ee,He,0,Le,ce,null)}t.bindFramebuffer(i.FRAMEBUFFER,w),le(_)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,W,ne,he.__webglTexture,0,_e(_)):(ne===i.TEXTURE_2D||ne>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&ne<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,W,ne,he.__webglTexture,Y),t.bindFramebuffer(i.FRAMEBUFFER,null)}function ze(w,_,B){if(i.bindRenderbuffer(i.RENDERBUFFER,w),_.depthBuffer){let W=_.depthTexture,ne=W&&W.isDepthTexture?W.type:null,Y=y(_.stencilBuffer,ne),Le=_.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ce=_e(_);le(_)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,ce,Y,_.width,_.height):B?i.renderbufferStorageMultisample(i.RENDERBUFFER,ce,Y,_.width,_.height):i.renderbufferStorage(i.RENDERBUFFER,Y,_.width,_.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,Le,i.RENDERBUFFER,w)}else{let W=_.textures;for(let ne=0;ne<W.length;ne++){let Y=W[ne],Le=s.convert(Y.format,Y.colorSpace),ce=s.convert(Y.type),Ue=b(Y.internalFormat,Le,ce,Y.colorSpace),Fe=_e(_);B&&le(_)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,Fe,Ue,_.width,_.height):le(_)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Fe,Ue,_.width,_.height):i.renderbufferStorage(i.RENDERBUFFER,Ue,_.width,_.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function Ne(w,_){if(_&&_.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(i.FRAMEBUFFER,w),!(_.depthTexture&&_.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");let W=n.get(_.depthTexture);W.__renderTarget=_,(!W.__webglTexture||_.depthTexture.image.width!==_.width||_.depthTexture.image.height!==_.height)&&(_.depthTexture.image.width=_.width,_.depthTexture.image.height=_.height,_.depthTexture.needsUpdate=!0),X(_.depthTexture,0);let ne=W.__webglTexture,Y=_e(_);if(_.depthTexture.format===ss)le(_)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,ne,0,Y):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,ne,0);else if(_.depthTexture.format===bs)le(_)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,ne,0,Y):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,ne,0);else throw new Error("Unknown depthTexture format")}function et(w){let _=n.get(w),B=w.isWebGLCubeRenderTarget===!0;if(_.__boundDepthTexture!==w.depthTexture){let W=w.depthTexture;if(_.__depthDisposeCallback&&_.__depthDisposeCallback(),W){let ne=()=>{delete _.__boundDepthTexture,delete _.__depthDisposeCallback,W.removeEventListener("dispose",ne)};W.addEventListener("dispose",ne),_.__depthDisposeCallback=ne}_.__boundDepthTexture=W}if(w.depthTexture&&!_.__autoAllocateDepthBuffer){if(B)throw new Error("target.depthTexture not supported in Cube render targets");let W=w.texture.mipmaps;W&&W.length>0?Ne(_.__webglFramebuffer[0],w):Ne(_.__webglFramebuffer,w)}else if(B){_.__webglDepthbuffer=[];for(let W=0;W<6;W++)if(t.bindFramebuffer(i.FRAMEBUFFER,_.__webglFramebuffer[W]),_.__webglDepthbuffer[W]===void 0)_.__webglDepthbuffer[W]=i.createRenderbuffer(),ze(_.__webglDepthbuffer[W],w,!1);else{let ne=w.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Y=_.__webglDepthbuffer[W];i.bindRenderbuffer(i.RENDERBUFFER,Y),i.framebufferRenderbuffer(i.FRAMEBUFFER,ne,i.RENDERBUFFER,Y)}}else{let W=w.texture.mipmaps;if(W&&W.length>0?t.bindFramebuffer(i.FRAMEBUFFER,_.__webglFramebuffer[0]):t.bindFramebuffer(i.FRAMEBUFFER,_.__webglFramebuffer),_.__webglDepthbuffer===void 0)_.__webglDepthbuffer=i.createRenderbuffer(),ze(_.__webglDepthbuffer,w,!1);else{let ne=w.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Y=_.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,Y),i.framebufferRenderbuffer(i.FRAMEBUFFER,ne,i.RENDERBUFFER,Y)}}t.bindFramebuffer(i.FRAMEBUFFER,null)}function tt(w,_,B){let W=n.get(w);_!==void 0&&Ce(W.__webglFramebuffer,w,w.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),B!==void 0&&et(w)}function I(w){let _=w.texture,B=n.get(w),W=n.get(_);w.addEventListener("dispose",C);let ne=w.textures,Y=w.isWebGLCubeRenderTarget===!0,Le=ne.length>1;if(Le||(W.__webglTexture===void 0&&(W.__webglTexture=i.createTexture()),W.__version=_.version,o.memory.textures++),Y){B.__webglFramebuffer=[];for(let ce=0;ce<6;ce++)if(_.mipmaps&&_.mipmaps.length>0){B.__webglFramebuffer[ce]=[];for(let Ue=0;Ue<_.mipmaps.length;Ue++)B.__webglFramebuffer[ce][Ue]=i.createFramebuffer()}else B.__webglFramebuffer[ce]=i.createFramebuffer()}else{if(_.mipmaps&&_.mipmaps.length>0){B.__webglFramebuffer=[];for(let ce=0;ce<_.mipmaps.length;ce++)B.__webglFramebuffer[ce]=i.createFramebuffer()}else B.__webglFramebuffer=i.createFramebuffer();if(Le)for(let ce=0,Ue=ne.length;ce<Ue;ce++){let Fe=n.get(ne[ce]);Fe.__webglTexture===void 0&&(Fe.__webglTexture=i.createTexture(),o.memory.textures++)}if(w.samples>0&&le(w)===!1){B.__webglMultisampledFramebuffer=i.createFramebuffer(),B.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,B.__webglMultisampledFramebuffer);for(let ce=0;ce<ne.length;ce++){let Ue=ne[ce];B.__webglColorRenderbuffer[ce]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,B.__webglColorRenderbuffer[ce]);let Fe=s.convert(Ue.format,Ue.colorSpace),he=s.convert(Ue.type),Ee=b(Ue.internalFormat,Fe,he,Ue.colorSpace,w.isXRRenderTarget===!0),He=_e(w);i.renderbufferStorageMultisample(i.RENDERBUFFER,He,Ee,w.width,w.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ce,i.RENDERBUFFER,B.__webglColorRenderbuffer[ce])}i.bindRenderbuffer(i.RENDERBUFFER,null),w.depthBuffer&&(B.__webglDepthRenderbuffer=i.createRenderbuffer(),ze(B.__webglDepthRenderbuffer,w,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(Y){t.bindTexture(i.TEXTURE_CUBE_MAP,W.__webglTexture),Ze(i.TEXTURE_CUBE_MAP,_);for(let ce=0;ce<6;ce++)if(_.mipmaps&&_.mipmaps.length>0)for(let Ue=0;Ue<_.mipmaps.length;Ue++)Ce(B.__webglFramebuffer[ce][Ue],w,_,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+ce,Ue);else Ce(B.__webglFramebuffer[ce],w,_,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+ce,0);g(_)&&p(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(Le){for(let ce=0,Ue=ne.length;ce<Ue;ce++){let Fe=ne[ce],he=n.get(Fe),Ee=i.TEXTURE_2D;(w.isWebGL3DRenderTarget||w.isWebGLArrayRenderTarget)&&(Ee=w.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(Ee,he.__webglTexture),Ze(Ee,Fe),Ce(B.__webglFramebuffer,w,Fe,i.COLOR_ATTACHMENT0+ce,Ee,0),g(Fe)&&p(Ee)}t.unbindTexture()}else{let ce=i.TEXTURE_2D;if((w.isWebGL3DRenderTarget||w.isWebGLArrayRenderTarget)&&(ce=w.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(ce,W.__webglTexture),Ze(ce,_),_.mipmaps&&_.mipmaps.length>0)for(let Ue=0;Ue<_.mipmaps.length;Ue++)Ce(B.__webglFramebuffer[Ue],w,_,i.COLOR_ATTACHMENT0,ce,Ue);else Ce(B.__webglFramebuffer,w,_,i.COLOR_ATTACHMENT0,ce,0);g(_)&&p(ce),t.unbindTexture()}w.depthBuffer&&et(w)}function oe(w){let _=w.textures;for(let B=0,W=_.length;B<W;B++){let ne=_[B];if(g(ne)){let Y=E(w),Le=n.get(ne).__webglTexture;t.bindTexture(Y,Le),p(Y),t.unbindTexture()}}}let te=[],Q=[];function j(w){if(w.samples>0){if(le(w)===!1){let _=w.textures,B=w.width,W=w.height,ne=i.COLOR_BUFFER_BIT,Y=w.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Le=n.get(w),ce=_.length>1;if(ce)for(let Fe=0;Fe<_.length;Fe++)t.bindFramebuffer(i.FRAMEBUFFER,Le.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Fe,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,Le.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Fe,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,Le.__webglMultisampledFramebuffer);let Ue=w.texture.mipmaps;Ue&&Ue.length>0?t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Le.__webglFramebuffer[0]):t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Le.__webglFramebuffer);for(let Fe=0;Fe<_.length;Fe++){if(w.resolveDepthBuffer&&(w.depthBuffer&&(ne|=i.DEPTH_BUFFER_BIT),w.stencilBuffer&&w.resolveStencilBuffer&&(ne|=i.STENCIL_BUFFER_BIT)),ce){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,Le.__webglColorRenderbuffer[Fe]);let he=n.get(_[Fe]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,he,0)}i.blitFramebuffer(0,0,B,W,0,0,B,W,ne,i.NEAREST),l===!0&&(te.length=0,Q.length=0,te.push(i.COLOR_ATTACHMENT0+Fe),w.depthBuffer&&w.resolveDepthBuffer===!1&&(te.push(Y),Q.push(Y),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,Q)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,te))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),ce)for(let Fe=0;Fe<_.length;Fe++){t.bindFramebuffer(i.FRAMEBUFFER,Le.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Fe,i.RENDERBUFFER,Le.__webglColorRenderbuffer[Fe]);let he=n.get(_[Fe]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,Le.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Fe,i.TEXTURE_2D,he,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Le.__webglMultisampledFramebuffer)}else if(w.depthBuffer&&w.resolveDepthBuffer===!1&&l){let _=w.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[_])}}}function _e(w){return Math.min(r.maxSamples,w.samples)}function le(w){let _=n.get(w);return w.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&_.__useRenderToTexture!==!1}function ve(w){let _=o.render.frame;h.get(w)!==_&&(h.set(w,_),w.update())}function qe(w,_){let B=w.colorSpace,W=w.format,ne=w.type;return w.isCompressedTexture===!0||w.isVideoTexture===!0||B!==vr&&B!==Li&&(dt.getTransfer(B)===bt?(W!==Tn||ne!==oi)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",B)),_}function We(w){return typeof HTMLImageElement<"u"&&w instanceof HTMLImageElement?(c.width=w.naturalWidth||w.width,c.height=w.naturalHeight||w.height):typeof VideoFrame<"u"&&w instanceof VideoFrame?(c.width=w.displayWidth,c.height=w.displayHeight):(c.width=w.width,c.height=w.height),c}this.allocateTextureUnit=G,this.resetTextureUnits=z,this.setTexture2D=X,this.setTexture2DArray=Z,this.setTexture3D=de,this.setTextureCube=q,this.rebindTextures=tt,this.setupRenderTarget=I,this.updateRenderTargetMipmap=oe,this.updateMultisampleRenderTarget=j,this.setupDepthRenderbuffer=et,this.setupFrameBufferTexture=Ce,this.useMultisampledRTT=le}function vv(i,e){function t(n,r=Li){let s,o=dt.getTransfer(r);if(n===oi)return i.UNSIGNED_BYTE;if(n===dl)return i.UNSIGNED_SHORT_4_4_4_4;if(n===fl)return i.UNSIGNED_SHORT_5_5_5_1;if(n===mh)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===gh)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===fh)return i.BYTE;if(n===ph)return i.SHORT;if(n===_s)return i.UNSIGNED_SHORT;if(n===ul)return i.INT;if(n===Qi)return i.UNSIGNED_INT;if(n===Gn)return i.FLOAT;if(n===vs)return i.HALF_FLOAT;if(n===xh)return i.ALPHA;if(n===_h)return i.RGB;if(n===Tn)return i.RGBA;if(n===ss)return i.DEPTH_COMPONENT;if(n===bs)return i.DEPTH_STENCIL;if(n===pl)return i.RED;if(n===ml)return i.RED_INTEGER;if(n===vh)return i.RG;if(n===gl)return i.RG_INTEGER;if(n===xl)return i.RGBA_INTEGER;if(n===Bo||n===zo||n===ko||n===Ho)if(o===bt)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(n===Bo)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===zo)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===ko)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Ho)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(n===Bo)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===zo)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===ko)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Ho)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===_l||n===vl||n===yl||n===bl)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(n===_l)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===vl)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===yl)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===bl)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Ml||n===Sl||n===El)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(n===Ml||n===Sl)return o===bt?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(n===El)return o===bt?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===wl||n===Tl||n===Al||n===Rl||n===Cl||n===Il||n===Pl||n===Dl||n===Ll||n===Ul||n===Nl||n===Fl||n===Ol||n===Bl)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(n===wl)return o===bt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Tl)return o===bt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Al)return o===bt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Rl)return o===bt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Cl)return o===bt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Il)return o===bt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Pl)return o===bt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Dl)return o===bt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Ll)return o===bt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Ul)return o===bt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Nl)return o===bt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Fl)return o===bt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Ol)return o===bt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Bl)return o===bt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===zl||n===kl||n===Hl)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(n===zl)return o===bt?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===kl)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Hl)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Vl||n===Gl||n===Wl||n===Xl)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(n===Vl)return s.COMPRESSED_RED_RGTC1_EXT;if(n===Gl)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Wl)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Xl)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===ys?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:t}}var yv=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,bv=`
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

}`,Gh=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let n=new mo(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,n=new mn({vertexShader:yv,fragmentShader:bv,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Ct(new Ki(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},Wh=class extends fi{constructor(e,t){super();let n=this,r=null,s=1,o=null,a="local-floor",l=1,c=null,h=null,u=null,d=null,f=null,m=null,v=typeof XRWebGLBinding<"u",g=new Gh,p={},E=t.getContextAttributes(),b=null,y=null,T=[],A=[],C=new ye,D=null,S=new jt;S.viewport=new mt;let M=new jt;M.viewport=new mt;let P=[S,M],z=new Ja,G=null,$=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(K){let se=T[K];return se===void 0&&(se=new cs,T[K]=se),se.getTargetRaySpace()},this.getControllerGrip=function(K){let se=T[K];return se===void 0&&(se=new cs,T[K]=se),se.getGripSpace()},this.getHand=function(K){let se=T[K];return se===void 0&&(se=new cs,T[K]=se),se.getHandSpace()};function X(K){let se=A.indexOf(K.inputSource);if(se===-1)return;let Ce=T[se];Ce!==void 0&&(Ce.update(K.inputSource,K.frame,c||o),Ce.dispatchEvent({type:K.type,data:K.inputSource}))}function Z(){r.removeEventListener("select",X),r.removeEventListener("selectstart",X),r.removeEventListener("selectend",X),r.removeEventListener("squeeze",X),r.removeEventListener("squeezestart",X),r.removeEventListener("squeezeend",X),r.removeEventListener("end",Z),r.removeEventListener("inputsourceschange",de);for(let K=0;K<T.length;K++){let se=A[K];se!==null&&(A[K]=null,T[K].disconnect(se))}G=null,$=null,g.reset();for(let K in p)delete p[K];e.setRenderTarget(b),f=null,d=null,u=null,r=null,y=null,ct.stop(),n.isPresenting=!1,e.setPixelRatio(D),e.setSize(C.width,C.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(K){s=K,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(K){a=K,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(K){c=K},this.getBaseLayer=function(){return d!==null?d:f},this.getBinding=function(){return u===null&&v&&(u=new XRWebGLBinding(r,t)),u},this.getFrame=function(){return m},this.getSession=function(){return r},this.setSession=async function(K){if(r=K,r!==null){if(b=e.getRenderTarget(),r.addEventListener("select",X),r.addEventListener("selectstart",X),r.addEventListener("selectend",X),r.addEventListener("squeeze",X),r.addEventListener("squeezestart",X),r.addEventListener("squeezeend",X),r.addEventListener("end",Z),r.addEventListener("inputsourceschange",de),E.xrCompatible!==!0&&await t.makeXRCompatible(),D=e.getPixelRatio(),e.getSize(C),v&&"createProjectionLayer"in XRWebGLBinding.prototype){let Ce=null,ze=null,Ne=null;E.depth&&(Ne=E.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,Ce=E.stencil?bs:ss,ze=E.stencil?ys:Qi);let et={colorFormat:t.RGBA8,depthFormat:Ne,scaleFactor:s};u=this.getBinding(),d=u.createProjectionLayer(et),r.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),y=new pi(d.textureWidth,d.textureHeight,{format:Tn,type:oi,depthTexture:new po(d.textureWidth,d.textureHeight,ze,void 0,void 0,void 0,void 0,void 0,void 0,Ce),stencilBuffer:E.stencil,colorSpace:e.outputColorSpace,samples:E.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1})}else{let Ce={antialias:E.antialias,alpha:!0,depth:E.depth,stencil:E.stencil,framebufferScaleFactor:s};f=new XRWebGLLayer(r,t,Ce),r.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),y=new pi(f.framebufferWidth,f.framebufferHeight,{format:Tn,type:oi,colorSpace:e.outputColorSpace,stencilBuffer:E.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}y.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await r.requestReferenceSpace(a),ct.setContext(r),ct.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return g.getDepthTexture()};function de(K){for(let se=0;se<K.removed.length;se++){let Ce=K.removed[se],ze=A.indexOf(Ce);ze>=0&&(A[ze]=null,T[ze].disconnect(Ce))}for(let se=0;se<K.added.length;se++){let Ce=K.added[se],ze=A.indexOf(Ce);if(ze===-1){for(let et=0;et<T.length;et++)if(et>=A.length){A.push(Ce),ze=et;break}else if(A[et]===null){A[et]=Ce,ze=et;break}if(ze===-1)break}let Ne=T[ze];Ne&&Ne.connect(Ce)}}let q=new R,ge=new R;function Te(K,se,Ce){q.setFromMatrixPosition(se.matrixWorld),ge.setFromMatrixPosition(Ce.matrixWorld);let ze=q.distanceTo(ge),Ne=se.projectionMatrix.elements,et=Ce.projectionMatrix.elements,tt=Ne[14]/(Ne[10]-1),I=Ne[14]/(Ne[10]+1),oe=(Ne[9]+1)/Ne[5],te=(Ne[9]-1)/Ne[5],Q=(Ne[8]-1)/Ne[0],j=(et[8]+1)/et[0],_e=tt*Q,le=tt*j,ve=ze/(-Q+j),qe=ve*-Q;if(se.matrixWorld.decompose(K.position,K.quaternion,K.scale),K.translateX(qe),K.translateZ(ve),K.matrixWorld.compose(K.position,K.quaternion,K.scale),K.matrixWorldInverse.copy(K.matrixWorld).invert(),Ne[10]===-1)K.projectionMatrix.copy(se.projectionMatrix),K.projectionMatrixInverse.copy(se.projectionMatrixInverse);else{let We=tt+ve,w=I+ve,_=_e-qe,B=le+(ze-qe),W=oe*I/w*We,ne=te*I/w*We;K.projectionMatrix.makePerspective(_,B,W,ne,We,w),K.projectionMatrixInverse.copy(K.projectionMatrix).invert()}}function De(K,se){se===null?K.matrixWorld.copy(K.matrix):K.matrixWorld.multiplyMatrices(se.matrixWorld,K.matrix),K.matrixWorldInverse.copy(K.matrixWorld).invert()}this.updateCamera=function(K){if(r===null)return;let se=K.near,Ce=K.far;g.texture!==null&&(g.depthNear>0&&(se=g.depthNear),g.depthFar>0&&(Ce=g.depthFar)),z.near=M.near=S.near=se,z.far=M.far=S.far=Ce,(G!==z.near||$!==z.far)&&(r.updateRenderState({depthNear:z.near,depthFar:z.far}),G=z.near,$=z.far),z.layers.mask=K.layers.mask|6,S.layers.mask=z.layers.mask&3,M.layers.mask=z.layers.mask&5;let ze=K.parent,Ne=z.cameras;De(z,ze);for(let et=0;et<Ne.length;et++)De(Ne[et],ze);Ne.length===2?Te(z,S,M):z.projectionMatrix.copy(S.projectionMatrix),Ze(K,z,ze)};function Ze(K,se,Ce){Ce===null?K.matrix.copy(se.matrixWorld):(K.matrix.copy(Ce.matrixWorld),K.matrix.invert(),K.matrix.multiply(se.matrixWorld)),K.matrix.decompose(K.position,K.quaternion,K.scale),K.updateMatrixWorld(!0),K.projectionMatrix.copy(se.projectionMatrix),K.projectionMatrixInverse.copy(se.projectionMatrixInverse),K.isPerspectiveCamera&&(K.fov=os*2*Math.atan(1/K.projectionMatrix.elements[5]),K.zoom=1)}this.getCamera=function(){return z},this.getFoveation=function(){if(!(d===null&&f===null))return l},this.setFoveation=function(K){l=K,d!==null&&(d.fixedFoveation=K),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=K)},this.hasDepthSensing=function(){return g.texture!==null},this.getDepthSensingMesh=function(){return g.getMesh(z)},this.getCameraTexture=function(K){return p[K]};let at=null;function st(K,se){if(h=se.getViewerPose(c||o),m=se,h!==null){let Ce=h.views;f!==null&&(e.setRenderTargetFramebuffer(y,f.framebuffer),e.setRenderTarget(y));let ze=!1;Ce.length!==z.cameras.length&&(z.cameras.length=0,ze=!0);for(let I=0;I<Ce.length;I++){let oe=Ce[I],te=null;if(f!==null)te=f.getViewport(oe);else{let j=u.getViewSubImage(d,oe);te=j.viewport,I===0&&(e.setRenderTargetTextures(y,j.colorTexture,j.depthStencilTexture),e.setRenderTarget(y))}let Q=P[I];Q===void 0&&(Q=new jt,Q.layers.enable(I),Q.viewport=new mt,P[I]=Q),Q.matrix.fromArray(oe.transform.matrix),Q.matrix.decompose(Q.position,Q.quaternion,Q.scale),Q.projectionMatrix.fromArray(oe.projectionMatrix),Q.projectionMatrixInverse.copy(Q.projectionMatrix).invert(),Q.viewport.set(te.x,te.y,te.width,te.height),I===0&&(z.matrix.copy(Q.matrix),z.matrix.decompose(z.position,z.quaternion,z.scale)),ze===!0&&z.cameras.push(Q)}let Ne=r.enabledFeatures;if(Ne&&Ne.includes("depth-sensing")&&r.depthUsage=="gpu-optimized"&&v){u=n.getBinding();let I=u.getDepthInformation(Ce[0]);I&&I.isValid&&I.texture&&g.init(I,r.renderState)}if(Ne&&Ne.includes("camera-access")&&v){e.state.unbindTexture(),u=n.getBinding();for(let I=0;I<Ce.length;I++){let oe=Ce[I].camera;if(oe){let te=p[oe];te||(te=new mo,p[oe]=te);let Q=u.getCameraImage(oe);te.sourceTexture=Q}}}}for(let Ce=0;Ce<T.length;Ce++){let ze=A[Ce],Ne=T[Ce];ze!==null&&Ne!==void 0&&Ne.update(ze,se,c||o)}at&&at(K,se),se.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:se}),m=null}let ct=new Af;ct.setAnimationLoop(st),this.setAnimationLoop=function(K){at=K},this.dispose=function(){}}},Lr=new kn,Mv=new ot;function Sv(i,e){function t(g,p){g.matrixAutoUpdate===!0&&g.updateMatrix(),p.value.copy(g.matrix)}function n(g,p){p.color.getRGB(g.fogColor.value,Th(i)),p.isFog?(g.fogNear.value=p.near,g.fogFar.value=p.far):p.isFogExp2&&(g.fogDensity.value=p.density)}function r(g,p,E,b,y){p.isMeshBasicMaterial||p.isMeshLambertMaterial?s(g,p):p.isMeshToonMaterial?(s(g,p),u(g,p)):p.isMeshPhongMaterial?(s(g,p),h(g,p)):p.isMeshStandardMaterial?(s(g,p),d(g,p),p.isMeshPhysicalMaterial&&f(g,p,y)):p.isMeshMatcapMaterial?(s(g,p),m(g,p)):p.isMeshDepthMaterial?s(g,p):p.isMeshDistanceMaterial?(s(g,p),v(g,p)):p.isMeshNormalMaterial?s(g,p):p.isLineBasicMaterial?(o(g,p),p.isLineDashedMaterial&&a(g,p)):p.isPointsMaterial?l(g,p,E,b):p.isSpriteMaterial?c(g,p):p.isShadowMaterial?(g.color.value.copy(p.color),g.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function s(g,p){g.opacity.value=p.opacity,p.color&&g.diffuse.value.copy(p.color),p.emissive&&g.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(g.map.value=p.map,t(p.map,g.mapTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,t(p.alphaMap,g.alphaMapTransform)),p.bumpMap&&(g.bumpMap.value=p.bumpMap,t(p.bumpMap,g.bumpMapTransform),g.bumpScale.value=p.bumpScale,p.side===cn&&(g.bumpScale.value*=-1)),p.normalMap&&(g.normalMap.value=p.normalMap,t(p.normalMap,g.normalMapTransform),g.normalScale.value.copy(p.normalScale),p.side===cn&&g.normalScale.value.negate()),p.displacementMap&&(g.displacementMap.value=p.displacementMap,t(p.displacementMap,g.displacementMapTransform),g.displacementScale.value=p.displacementScale,g.displacementBias.value=p.displacementBias),p.emissiveMap&&(g.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,g.emissiveMapTransform)),p.specularMap&&(g.specularMap.value=p.specularMap,t(p.specularMap,g.specularMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest);let E=e.get(p),b=E.envMap,y=E.envMapRotation;b&&(g.envMap.value=b,Lr.copy(y),Lr.x*=-1,Lr.y*=-1,Lr.z*=-1,b.isCubeTexture&&b.isRenderTargetTexture===!1&&(Lr.y*=-1,Lr.z*=-1),g.envMapRotation.value.setFromMatrix4(Mv.makeRotationFromEuler(Lr)),g.flipEnvMap.value=b.isCubeTexture&&b.isRenderTargetTexture===!1?-1:1,g.reflectivity.value=p.reflectivity,g.ior.value=p.ior,g.refractionRatio.value=p.refractionRatio),p.lightMap&&(g.lightMap.value=p.lightMap,g.lightMapIntensity.value=p.lightMapIntensity,t(p.lightMap,g.lightMapTransform)),p.aoMap&&(g.aoMap.value=p.aoMap,g.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,g.aoMapTransform))}function o(g,p){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,p.map&&(g.map.value=p.map,t(p.map,g.mapTransform))}function a(g,p){g.dashSize.value=p.dashSize,g.totalSize.value=p.dashSize+p.gapSize,g.scale.value=p.scale}function l(g,p,E,b){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,g.size.value=p.size*E,g.scale.value=b*.5,p.map&&(g.map.value=p.map,t(p.map,g.uvTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,t(p.alphaMap,g.alphaMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest)}function c(g,p){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,g.rotation.value=p.rotation,p.map&&(g.map.value=p.map,t(p.map,g.mapTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,t(p.alphaMap,g.alphaMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest)}function h(g,p){g.specular.value.copy(p.specular),g.shininess.value=Math.max(p.shininess,1e-4)}function u(g,p){p.gradientMap&&(g.gradientMap.value=p.gradientMap)}function d(g,p){g.metalness.value=p.metalness,p.metalnessMap&&(g.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,g.metalnessMapTransform)),g.roughness.value=p.roughness,p.roughnessMap&&(g.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,g.roughnessMapTransform)),p.envMap&&(g.envMapIntensity.value=p.envMapIntensity)}function f(g,p,E){g.ior.value=p.ior,p.sheen>0&&(g.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),g.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(g.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,g.sheenColorMapTransform)),p.sheenRoughnessMap&&(g.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,g.sheenRoughnessMapTransform))),p.clearcoat>0&&(g.clearcoat.value=p.clearcoat,g.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(g.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,g.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(g.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===cn&&g.clearcoatNormalScale.value.negate())),p.dispersion>0&&(g.dispersion.value=p.dispersion),p.iridescence>0&&(g.iridescence.value=p.iridescence,g.iridescenceIOR.value=p.iridescenceIOR,g.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(g.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,g.iridescenceMapTransform)),p.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),p.transmission>0&&(g.transmission.value=p.transmission,g.transmissionSamplerMap.value=E.texture,g.transmissionSamplerSize.value.set(E.width,E.height),p.transmissionMap&&(g.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,g.transmissionMapTransform)),g.thickness.value=p.thickness,p.thicknessMap&&(g.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=p.attenuationDistance,g.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(g.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(g.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=p.specularIntensity,g.specularColor.value.copy(p.specularColor),p.specularColorMap&&(g.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,g.specularColorMapTransform)),p.specularIntensityMap&&(g.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,g.specularIntensityMapTransform))}function m(g,p){p.matcap&&(g.matcap.value=p.matcap)}function v(g,p){let E=e.get(p).light;g.referencePosition.value.setFromMatrixPosition(E.matrixWorld),g.nearDistance.value=E.shadow.camera.near,g.farDistance.value=E.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:r}}function Ev(i,e,t,n){let r={},s={},o=[],a=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function l(E,b){let y=b.program;n.uniformBlockBinding(E,y)}function c(E,b){let y=r[E.id];y===void 0&&(m(E),y=h(E),r[E.id]=y,E.addEventListener("dispose",g));let T=b.program;n.updateUBOMapping(E,T);let A=e.render.frame;s[E.id]!==A&&(d(E),s[E.id]=A)}function h(E){let b=u();E.__bindingPointIndex=b;let y=i.createBuffer(),T=E.__size,A=E.usage;return i.bindBuffer(i.UNIFORM_BUFFER,y),i.bufferData(i.UNIFORM_BUFFER,T,A),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,b,y),y}function u(){for(let E=0;E<a;E++)if(o.indexOf(E)===-1)return o.push(E),E;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(E){let b=r[E.id],y=E.uniforms,T=E.__cache;i.bindBuffer(i.UNIFORM_BUFFER,b);for(let A=0,C=y.length;A<C;A++){let D=Array.isArray(y[A])?y[A]:[y[A]];for(let S=0,M=D.length;S<M;S++){let P=D[S];if(f(P,A,S,T)===!0){let z=P.__offset,G=Array.isArray(P.value)?P.value:[P.value],$=0;for(let X=0;X<G.length;X++){let Z=G[X],de=v(Z);typeof Z=="number"||typeof Z=="boolean"?(P.__data[0]=Z,i.bufferSubData(i.UNIFORM_BUFFER,z+$,P.__data)):Z.isMatrix3?(P.__data[0]=Z.elements[0],P.__data[1]=Z.elements[1],P.__data[2]=Z.elements[2],P.__data[3]=0,P.__data[4]=Z.elements[3],P.__data[5]=Z.elements[4],P.__data[6]=Z.elements[5],P.__data[7]=0,P.__data[8]=Z.elements[6],P.__data[9]=Z.elements[7],P.__data[10]=Z.elements[8],P.__data[11]=0):(Z.toArray(P.__data,$),$+=de.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,z,P.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function f(E,b,y,T){let A=E.value,C=b+"_"+y;if(T[C]===void 0)return typeof A=="number"||typeof A=="boolean"?T[C]=A:T[C]=A.clone(),!0;{let D=T[C];if(typeof A=="number"||typeof A=="boolean"){if(D!==A)return T[C]=A,!0}else if(D.equals(A)===!1)return D.copy(A),!0}return!1}function m(E){let b=E.uniforms,y=0,T=16;for(let C=0,D=b.length;C<D;C++){let S=Array.isArray(b[C])?b[C]:[b[C]];for(let M=0,P=S.length;M<P;M++){let z=S[M],G=Array.isArray(z.value)?z.value:[z.value];for(let $=0,X=G.length;$<X;$++){let Z=G[$],de=v(Z),q=y%T,ge=q%de.boundary,Te=q+ge;y+=ge,Te!==0&&T-Te<de.storage&&(y+=T-Te),z.__data=new Float32Array(de.storage/Float32Array.BYTES_PER_ELEMENT),z.__offset=y,y+=de.storage}}}let A=y%T;return A>0&&(y+=T-A),E.__size=y,E.__cache={},this}function v(E){let b={boundary:0,storage:0};return typeof E=="number"||typeof E=="boolean"?(b.boundary=4,b.storage=4):E.isVector2?(b.boundary=8,b.storage=8):E.isVector3||E.isColor?(b.boundary=16,b.storage=12):E.isVector4?(b.boundary=16,b.storage=16):E.isMatrix3?(b.boundary=48,b.storage=48):E.isMatrix4?(b.boundary=64,b.storage=64):E.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",E),b}function g(E){let b=E.target;b.removeEventListener("dispose",g);let y=o.indexOf(b.__bindingPointIndex);o.splice(y,1),i.deleteBuffer(r[b.id]),delete r[b.id],delete s[b.id]}function p(){for(let E in r)i.deleteBuffer(r[E]);o=[],r={},s={}}return{bind:l,update:c,dispose:p}}var jl=class{constructor(e={}){let{canvas:t=qd(),context:n=null,depth:r=!0,stencil:s=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reversedDepthBuffer:d=!1}=e;this.isWebGLRenderer=!0;let f;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");f=n.getContextAttributes().alpha}else f=o;let m=new Uint32Array(4),v=new Int32Array(4),g=null,p=null,E=[],b=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=si,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let y=this,T=!1;this._outputColorSpace=ln;let A=0,C=0,D=null,S=-1,M=null,P=new mt,z=new mt,G=null,$=new je(0),X=0,Z=t.width,de=t.height,q=1,ge=null,Te=null,De=new mt(0,0,Z,de),Ze=new mt(0,0,Z,de),at=!1,st=new fs,ct=!1,K=!1,se=new ot,Ce=new R,ze=new mt,Ne={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},et=!1;function tt(){return D===null?q:1}let I=n;function oe(x,N){return t.getContext(x,N)}try{let x={alpha:!0,depth:r,stencil:s,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${"180"}`),t.addEventListener("webglcontextlost",pe,!1),t.addEventListener("webglcontextrestored",xe,!1),t.addEventListener("webglcontextcreationerror",ae,!1),I===null){let N="webgl2";if(I=oe(N,x),I===null)throw oe(N)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(x){throw console.error("THREE.WebGLRenderer: "+x.message),x}let te,Q,j,_e,le,ve,qe,We,w,_,B,W,ne,Y,Le,ce,Ue,Fe,he,Ee,He,Be,Me,Ye;function U(){te=new Vx(I),te.init(),Be=new vv(I,te),Q=new Nx(I,te,e,Be),j=new xv(I,te),Q.reversedDepthBuffer&&d&&j.buffers.depth.setReversed(!0),_e=new Xx(I),le=new rv,ve=new _v(I,te,j,le,Q,Be,_e),qe=new Ox(y),We=new Hx(y),w=new Km(I),Me=new Lx(I,w),_=new Gx(I,w,_e,Me),B=new qx(I,_,w,_e),he=new $x(I,Q,ve),ce=new Fx(le),W=new iv(y,qe,We,te,Q,Me,ce),ne=new Sv(y,le),Y=new ov,Le=new dv(te),Fe=new Dx(y,qe,We,j,B,f,l),Ue=new mv(y,B,Q),Ye=new Ev(I,_e,Q,j),Ee=new Ux(I,te,_e),He=new Wx(I,te,_e),_e.programs=W.programs,y.capabilities=Q,y.extensions=te,y.properties=le,y.renderLists=Y,y.shadowMap=Ue,y.state=j,y.info=_e}U();let fe=new Wh(y,I);this.xr=fe,this.getContext=function(){return I},this.getContextAttributes=function(){return I.getContextAttributes()},this.forceContextLoss=function(){let x=te.get("WEBGL_lose_context");x&&x.loseContext()},this.forceContextRestore=function(){let x=te.get("WEBGL_lose_context");x&&x.restoreContext()},this.getPixelRatio=function(){return q},this.setPixelRatio=function(x){x!==void 0&&(q=x,this.setSize(Z,de,!1))},this.getSize=function(x){return x.set(Z,de)},this.setSize=function(x,N,k=!0){if(fe.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}Z=x,de=N,t.width=Math.floor(x*q),t.height=Math.floor(N*q),k===!0&&(t.style.width=x+"px",t.style.height=N+"px"),this.setViewport(0,0,x,N)},this.getDrawingBufferSize=function(x){return x.set(Z*q,de*q).floor()},this.setDrawingBufferSize=function(x,N,k){Z=x,de=N,q=k,t.width=Math.floor(x*k),t.height=Math.floor(N*k),this.setViewport(0,0,x,N)},this.getCurrentViewport=function(x){return x.copy(P)},this.getViewport=function(x){return x.copy(De)},this.setViewport=function(x,N,k,V){x.isVector4?De.set(x.x,x.y,x.z,x.w):De.set(x,N,k,V),j.viewport(P.copy(De).multiplyScalar(q).round())},this.getScissor=function(x){return x.copy(Ze)},this.setScissor=function(x,N,k,V){x.isVector4?Ze.set(x.x,x.y,x.z,x.w):Ze.set(x,N,k,V),j.scissor(z.copy(Ze).multiplyScalar(q).round())},this.getScissorTest=function(){return at},this.setScissorTest=function(x){j.setScissorTest(at=x)},this.setOpaqueSort=function(x){ge=x},this.setTransparentSort=function(x){Te=x},this.getClearColor=function(x){return x.copy(Fe.getClearColor())},this.setClearColor=function(){Fe.setClearColor(...arguments)},this.getClearAlpha=function(){return Fe.getClearAlpha()},this.setClearAlpha=function(){Fe.setClearAlpha(...arguments)},this.clear=function(x=!0,N=!0,k=!0){let V=0;if(x){let F=!1;if(D!==null){let ue=D.texture.format;F=ue===xl||ue===gl||ue===ml}if(F){let ue=D.texture.type,be=ue===oi||ue===Qi||ue===_s||ue===ys||ue===dl||ue===fl,Pe=Fe.getClearColor(),Ie=Fe.getClearAlpha(),Ge=Pe.r,$e=Pe.g,Ve=Pe.b;be?(m[0]=Ge,m[1]=$e,m[2]=Ve,m[3]=Ie,I.clearBufferuiv(I.COLOR,0,m)):(v[0]=Ge,v[1]=$e,v[2]=Ve,v[3]=Ie,I.clearBufferiv(I.COLOR,0,v))}else V|=I.COLOR_BUFFER_BIT}N&&(V|=I.DEPTH_BUFFER_BIT),k&&(V|=I.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),I.clear(V)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",pe,!1),t.removeEventListener("webglcontextrestored",xe,!1),t.removeEventListener("webglcontextcreationerror",ae,!1),Fe.dispose(),Y.dispose(),Le.dispose(),le.dispose(),qe.dispose(),We.dispose(),B.dispose(),Me.dispose(),Ye.dispose(),W.dispose(),fe.dispose(),fe.removeEventListener("sessionstart",Dn),fe.removeEventListener("sessionend",Ko),yi.stop()};function pe(x){x.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),T=!0}function xe(){console.log("THREE.WebGLRenderer: Context Restored."),T=!1;let x=_e.autoReset,N=Ue.enabled,k=Ue.autoUpdate,V=Ue.needsUpdate,F=Ue.type;U(),_e.autoReset=x,Ue.enabled=N,Ue.autoUpdate=k,Ue.needsUpdate=V,Ue.type=F}function ae(x){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",x.statusMessage)}function ee(x){let N=x.target;N.removeEventListener("dispose",ee),Oe(N)}function Oe(x){Xe(x),le.remove(x)}function Xe(x){let N=le.get(x).programs;N!==void 0&&(N.forEach(function(k){W.releaseProgram(k)}),x.isShaderMaterial&&W.releaseShaderCache(x))}this.renderBufferDirect=function(x,N,k,V,F,ue){N===null&&(N=Ne);let be=F.isMesh&&F.matrixWorld.determinant()<0,Pe=_n(x,N,k,V,F);j.setMaterial(V,be);let Ie=k.index,Ge=1;if(V.wireframe===!0){if(Ie=_.getWireframeAttribute(k),Ie===void 0)return;Ge=2}let $e=k.drawRange,Ve=k.attributes.position,nt=$e.start*Ge,vt=($e.start+$e.count)*Ge;ue!==null&&(nt=Math.max(nt,ue.start*Ge),vt=Math.min(vt,(ue.start+ue.count)*Ge)),Ie!==null?(nt=Math.max(nt,0),vt=Math.min(vt,Ie.count)):Ve!=null&&(nt=Math.max(nt,0),vt=Math.min(vt,Ve.count));let Et=vt-nt;if(Et<0||Et===1/0)return;Me.setup(F,V,Pe,k,Ie);let H,me=Ee;if(Ie!==null&&(H=w.get(Ie),me=He,me.setIndex(H)),F.isMesh)V.wireframe===!0?(j.setLineWidth(V.wireframeLinewidth*tt()),me.setMode(I.LINES)):me.setMode(I.TRIANGLES);else if(F.isLine){let Se=V.linewidth;Se===void 0&&(Se=1),j.setLineWidth(Se*tt()),F.isLineSegments?me.setMode(I.LINES):F.isLineLoop?me.setMode(I.LINE_LOOP):me.setMode(I.LINE_STRIP)}else F.isPoints?me.setMode(I.POINTS):F.isSprite&&me.setMode(I.TRIANGLES);if(F.isBatchedMesh)if(F._multiDrawInstances!==null)as("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),me.renderMultiDrawInstances(F._multiDrawStarts,F._multiDrawCounts,F._multiDrawCount,F._multiDrawInstances);else if(te.get("WEBGL_multi_draw"))me.renderMultiDraw(F._multiDrawStarts,F._multiDrawCounts,F._multiDrawCount);else{let Se=F._multiDrawStarts,pt=F._multiDrawCounts,lt=F._multiDrawCount,sn=Ie?w.get(Ie).bytesPerElement:1,kr=le.get(V).currentProgram.getUniforms();for(let vn=0;vn<lt;vn++)kr.setValue(I,"_gl_DrawID",vn),me.render(Se[vn]/sn,pt[vn])}else if(F.isInstancedMesh)me.renderInstances(nt,Et,F.count);else if(k.isInstancedBufferGeometry){let Se=k._maxInstanceCount!==void 0?k._maxInstanceCount:1/0,pt=Math.min(k.instanceCount,Se);me.renderInstances(nt,Et,pt)}else me.render(nt,Et)};function xt(x,N,k){x.transparent===!0&&x.side===Vn&&x.forceSinglePass===!1?(x.side=cn,x.needsUpdate=!0,we(x,N,k),x.side=zn,x.needsUpdate=!0,we(x,N,k),x.side=Vn):we(x,N,k)}this.compile=function(x,N,k=null){k===null&&(k=x),p=Le.get(k),p.init(N),b.push(p),k.traverseVisible(function(F){F.isLight&&F.layers.test(N.layers)&&(p.pushLight(F),F.castShadow&&p.pushShadow(F))}),x!==k&&x.traverseVisible(function(F){F.isLight&&F.layers.test(N.layers)&&(p.pushLight(F),F.castShadow&&p.pushShadow(F))}),p.setupLights();let V=new Set;return x.traverse(function(F){if(!(F.isMesh||F.isPoints||F.isLine||F.isSprite))return;let ue=F.material;if(ue)if(Array.isArray(ue))for(let be=0;be<ue.length;be++){let Pe=ue[be];xt(Pe,k,F),V.add(Pe)}else xt(ue,k,F),V.add(ue)}),p=b.pop(),V},this.compileAsync=function(x,N,k=null){let V=this.compile(x,N,k);return new Promise(F=>{function ue(){if(V.forEach(function(be){le.get(be).currentProgram.isReady()&&V.delete(be)}),V.size===0){F(x);return}setTimeout(ue,10)}te.get("KHR_parallel_shader_compile")!==null?ue():setTimeout(ue,10)})};let ht=null;function Yn(x){ht&&ht(x)}function Dn(){yi.stop()}function Ko(){yi.start()}let yi=new Af;yi.setAnimationLoop(Yn),typeof self<"u"&&yi.setContext(self),this.setAnimationLoop=function(x){ht=x,fe.setAnimationLoop(x),x===null?yi.stop():yi.start()},fe.addEventListener("sessionstart",Dn),fe.addEventListener("sessionend",Ko),this.render=function(x,N){if(N!==void 0&&N.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(T===!0)return;if(x.matrixWorldAutoUpdate===!0&&x.updateMatrixWorld(),N.parent===null&&N.matrixWorldAutoUpdate===!0&&N.updateMatrixWorld(),fe.enabled===!0&&fe.isPresenting===!0&&(fe.cameraAutoUpdate===!0&&fe.updateCamera(N),N=fe.getCamera()),x.isScene===!0&&x.onBeforeRender(y,x,N,D),p=Le.get(x,b.length),p.init(N),b.push(p),se.multiplyMatrices(N.projectionMatrix,N.matrixWorldInverse),st.setFromProjectionMatrix(se,ti,N.reversedDepth),K=this.localClippingEnabled,ct=ce.init(this.clippingPlanes,K),g=Y.get(x,E.length),g.init(),E.push(g),fe.enabled===!0&&fe.isPresenting===!0){let ue=y.xr.getDepthSensingMesh();ue!==null&&Ps(ue,N,-1/0,y.sortObjects)}Ps(x,N,0,y.sortObjects),g.finish(),y.sortObjects===!0&&g.sort(ge,Te),et=fe.enabled===!1||fe.isPresenting===!1||fe.hasDepthSensing()===!1,et&&Fe.addToRenderList(g,x),this.info.render.frame++,ct===!0&&ce.beginShadows();let k=p.state.shadowsArray;Ue.render(k,x,N),ct===!0&&ce.endShadows(),this.info.autoReset===!0&&this.info.reset();let V=g.opaque,F=g.transmissive;if(p.setupLights(),N.isArrayCamera){let ue=N.cameras;if(F.length>0)for(let be=0,Pe=ue.length;be<Pe;be++){let Ie=ue[be];Ds(V,F,x,Ie)}et&&Fe.render(x);for(let be=0,Pe=ue.length;be<Pe;be++){let Ie=ue[be];jo(g,x,Ie,Ie.viewport)}}else F.length>0&&Ds(V,F,x,N),et&&Fe.render(x),jo(g,x,N);D!==null&&C===0&&(ve.updateMultisampleRenderTarget(D),ve.updateRenderTargetMipmap(D)),x.isScene===!0&&x.onAfterRender(y,x,N),Me.resetDefaultState(),S=-1,M=null,b.pop(),b.length>0?(p=b[b.length-1],ct===!0&&ce.setGlobalState(y.clippingPlanes,p.state.camera)):p=null,E.pop(),E.length>0?g=E[E.length-1]:g=null};function Ps(x,N,k,V){if(x.visible===!1)return;if(x.layers.test(N.layers)){if(x.isGroup)k=x.renderOrder;else if(x.isLOD)x.autoUpdate===!0&&x.update(N);else if(x.isLight)p.pushLight(x),x.castShadow&&p.pushShadow(x);else if(x.isSprite){if(!x.frustumCulled||st.intersectsSprite(x)){V&&ze.setFromMatrixPosition(x.matrixWorld).applyMatrix4(se);let be=B.update(x),Pe=x.material;Pe.visible&&g.push(x,be,Pe,k,ze.z,null)}}else if((x.isMesh||x.isLine||x.isPoints)&&(!x.frustumCulled||st.intersectsObject(x))){let be=B.update(x),Pe=x.material;if(V&&(x.boundingSphere!==void 0?(x.boundingSphere===null&&x.computeBoundingSphere(),ze.copy(x.boundingSphere.center)):(be.boundingSphere===null&&be.computeBoundingSphere(),ze.copy(be.boundingSphere.center)),ze.applyMatrix4(x.matrixWorld).applyMatrix4(se)),Array.isArray(Pe)){let Ie=be.groups;for(let Ge=0,$e=Ie.length;Ge<$e;Ge++){let Ve=Ie[Ge],nt=Pe[Ve.materialIndex];nt&&nt.visible&&g.push(x,be,nt,k,ze.z,Ve)}}else Pe.visible&&g.push(x,be,Pe,k,ze.z,null)}}let ue=x.children;for(let be=0,Pe=ue.length;be<Pe;be++)Ps(ue[be],N,k,V)}function jo(x,N,k,V){let F=x.opaque,ue=x.transmissive,be=x.transparent;p.setupLightsView(k),ct===!0&&ce.setGlobalState(y.clippingPlanes,k),V&&j.viewport(P.copy(V)),F.length>0&&O(F,N,k),ue.length>0&&O(ue,N,k),be.length>0&&O(be,N,k),j.buffers.depth.setTest(!0),j.buffers.depth.setMask(!0),j.buffers.color.setMask(!0),j.setPolygonOffset(!1)}function Ds(x,N,k,V){if((k.isScene===!0?k.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[V.id]===void 0&&(p.state.transmissionRenderTarget[V.id]=new pi(1,1,{generateMipmaps:!0,type:te.has("EXT_color_buffer_half_float")||te.has("EXT_color_buffer_float")?vs:oi,minFilter:ji,samples:4,stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:dt.workingColorSpace}));let ue=p.state.transmissionRenderTarget[V.id],be=V.viewport||P;ue.setSize(be.z*y.transmissionResolutionScale,be.w*y.transmissionResolutionScale);let Pe=y.getRenderTarget(),Ie=y.getActiveCubeFace(),Ge=y.getActiveMipmapLevel();y.setRenderTarget(ue),y.getClearColor($),X=y.getClearAlpha(),X<1&&y.setClearColor(16777215,.5),y.clear(),et&&Fe.render(k);let $e=y.toneMapping;y.toneMapping=si;let Ve=V.viewport;if(V.viewport!==void 0&&(V.viewport=void 0),p.setupLightsView(V),ct===!0&&ce.setGlobalState(y.clippingPlanes,V),O(x,k,V),ve.updateMultisampleRenderTarget(ue),ve.updateRenderTargetMipmap(ue),te.has("WEBGL_multisampled_render_to_texture")===!1){let nt=!1;for(let vt=0,Et=N.length;vt<Et;vt++){let H=N[vt],me=H.object,Se=H.geometry,pt=H.material,lt=H.group;if(pt.side===Vn&&me.layers.test(V.layers)){let sn=pt.side;pt.side=cn,pt.needsUpdate=!0,ie(me,k,V,Se,pt,lt),pt.side=sn,pt.needsUpdate=!0,nt=!0}}nt===!0&&(ve.updateMultisampleRenderTarget(ue),ve.updateRenderTargetMipmap(ue))}y.setRenderTarget(Pe,Ie,Ge),y.setClearColor($,X),Ve!==void 0&&(V.viewport=Ve),y.toneMapping=$e}function O(x,N,k){let V=N.isScene===!0?N.overrideMaterial:null;for(let F=0,ue=x.length;F<ue;F++){let be=x[F],Pe=be.object,Ie=be.geometry,Ge=be.group,$e=be.material;$e.allowOverride===!0&&V!==null&&($e=V),Pe.layers.test(k.layers)&&ie(Pe,N,k,Ie,$e,Ge)}}function ie(x,N,k,V,F,ue){x.onBeforeRender(y,N,k,V,F,ue),x.modelViewMatrix.multiplyMatrices(k.matrixWorldInverse,x.matrixWorld),x.normalMatrix.getNormalMatrix(x.modelViewMatrix),F.onBeforeRender(y,N,k,V,x,ue),F.transparent===!0&&F.side===Vn&&F.forceSinglePass===!1?(F.side=cn,F.needsUpdate=!0,y.renderBufferDirect(k,N,V,F,x,ue),F.side=zn,F.needsUpdate=!0,y.renderBufferDirect(k,N,V,F,x,ue),F.side=Vn):y.renderBufferDirect(k,N,V,F,x,ue),x.onAfterRender(y,N,k,V,F,ue)}function we(x,N,k){N.isScene!==!0&&(N=Ne);let V=le.get(x),F=p.state.lights,ue=p.state.shadowsArray,be=F.state.version,Pe=W.getParameters(x,F.state,ue,N,k),Ie=W.getProgramCacheKey(Pe),Ge=V.programs;V.environment=x.isMeshStandardMaterial?N.environment:null,V.fog=N.fog,V.envMap=(x.isMeshStandardMaterial?We:qe).get(x.envMap||V.environment),V.envMapRotation=V.environment!==null&&x.envMap===null?N.environmentRotation:x.envMapRotation,Ge===void 0&&(x.addEventListener("dispose",ee),Ge=new Map,V.programs=Ge);let $e=Ge.get(Ie);if($e!==void 0){if(V.currentProgram===$e&&V.lightsStateVersion===be)return Jt(x,Pe),$e}else Pe.uniforms=W.getUniforms(x),x.onBeforeCompile(Pe,y),$e=W.acquireProgram(Pe,Ie),Ge.set(Ie,$e),V.uniforms=Pe.uniforms;let Ve=V.uniforms;return(!x.isShaderMaterial&&!x.isRawShaderMaterial||x.clipping===!0)&&(Ve.clippingPlanes=ce.uniform),Jt(x,Pe),V.needsLights=Zn(x),V.lightsStateVersion=be,V.needsLights&&(Ve.ambientLightColor.value=F.state.ambient,Ve.lightProbe.value=F.state.probe,Ve.directionalLights.value=F.state.directional,Ve.directionalLightShadows.value=F.state.directionalShadow,Ve.spotLights.value=F.state.spot,Ve.spotLightShadows.value=F.state.spotShadow,Ve.rectAreaLights.value=F.state.rectArea,Ve.ltc_1.value=F.state.rectAreaLTC1,Ve.ltc_2.value=F.state.rectAreaLTC2,Ve.pointLights.value=F.state.point,Ve.pointLightShadows.value=F.state.pointShadow,Ve.hemisphereLights.value=F.state.hemi,Ve.directionalShadowMap.value=F.state.directionalShadowMap,Ve.directionalShadowMatrix.value=F.state.directionalShadowMatrix,Ve.spotShadowMap.value=F.state.spotShadowMap,Ve.spotLightMatrix.value=F.state.spotLightMatrix,Ve.spotLightMap.value=F.state.spotLightMap,Ve.pointShadowMap.value=F.state.pointShadowMap,Ve.pointShadowMatrix.value=F.state.pointShadowMatrix),V.currentProgram=$e,V.uniformsList=null,$e}function _t(x){if(x.uniformsList===null){let N=x.currentProgram.getUniforms();x.uniformsList=Es.seqWithValue(N.seq,x.uniforms)}return x.uniformsList}function Jt(x,N){let k=le.get(x);k.outputColorSpace=N.outputColorSpace,k.batching=N.batching,k.batchingColor=N.batchingColor,k.instancing=N.instancing,k.instancingColor=N.instancingColor,k.instancingMorph=N.instancingMorph,k.skinning=N.skinning,k.morphTargets=N.morphTargets,k.morphNormals=N.morphNormals,k.morphColors=N.morphColors,k.morphTargetsCount=N.morphTargetsCount,k.numClippingPlanes=N.numClippingPlanes,k.numIntersection=N.numClipIntersection,k.vertexAlphas=N.vertexAlphas,k.vertexTangents=N.vertexTangents,k.toneMapping=N.toneMapping}function _n(x,N,k,V,F){N.isScene!==!0&&(N=Ne),ve.resetTextureUnits();let ue=N.fog,be=V.isMeshStandardMaterial?N.environment:null,Pe=D===null?y.outputColorSpace:D.isXRRenderTarget===!0?D.texture.colorSpace:vr,Ie=(V.isMeshStandardMaterial?We:qe).get(V.envMap||be),Ge=V.vertexColors===!0&&!!k.attributes.color&&k.attributes.color.itemSize===4,$e=!!k.attributes.tangent&&(!!V.normalMap||V.anisotropy>0),Ve=!!k.morphAttributes.position,nt=!!k.morphAttributes.normal,vt=!!k.morphAttributes.color,Et=si;V.toneMapped&&(D===null||D.isXRRenderTarget===!0)&&(Et=y.toneMapping);let H=k.morphAttributes.position||k.morphAttributes.normal||k.morphAttributes.color,me=H!==void 0?H.length:0,Se=le.get(V),pt=p.state.lights;if(ct===!0&&(K===!0||x!==M)){let on=x===M&&V.id===S;ce.setState(V,x,on)}let lt=!1;V.version===Se.__version?(Se.needsLights&&Se.lightsStateVersion!==pt.state.version||Se.outputColorSpace!==Pe||F.isBatchedMesh&&Se.batching===!1||!F.isBatchedMesh&&Se.batching===!0||F.isBatchedMesh&&Se.batchingColor===!0&&F.colorTexture===null||F.isBatchedMesh&&Se.batchingColor===!1&&F.colorTexture!==null||F.isInstancedMesh&&Se.instancing===!1||!F.isInstancedMesh&&Se.instancing===!0||F.isSkinnedMesh&&Se.skinning===!1||!F.isSkinnedMesh&&Se.skinning===!0||F.isInstancedMesh&&Se.instancingColor===!0&&F.instanceColor===null||F.isInstancedMesh&&Se.instancingColor===!1&&F.instanceColor!==null||F.isInstancedMesh&&Se.instancingMorph===!0&&F.morphTexture===null||F.isInstancedMesh&&Se.instancingMorph===!1&&F.morphTexture!==null||Se.envMap!==Ie||V.fog===!0&&Se.fog!==ue||Se.numClippingPlanes!==void 0&&(Se.numClippingPlanes!==ce.numPlanes||Se.numIntersection!==ce.numIntersection)||Se.vertexAlphas!==Ge||Se.vertexTangents!==$e||Se.morphTargets!==Ve||Se.morphNormals!==nt||Se.morphColors!==vt||Se.toneMapping!==Et||Se.morphTargetsCount!==me)&&(lt=!0):(lt=!0,Se.__version=V.version);let sn=Se.currentProgram;lt===!0&&(sn=we(V,N,F));let kr=!1,vn=!1,Ls=!1,Tt=sn.getUniforms(),Ln=Se.uniforms;if(j.useProgram(sn.program)&&(kr=!0,vn=!0,Ls=!0),V.id!==S&&(S=V.id,vn=!0),kr||M!==x){j.buffers.depth.getReversed()&&x.reversedDepth!==!0&&(x._reversedDepth=!0,x.updateProjectionMatrix()),Tt.setValue(I,"projectionMatrix",x.projectionMatrix),Tt.setValue(I,"viewMatrix",x.matrixWorldInverse);let un=Tt.map.cameraPosition;un!==void 0&&un.setValue(I,Ce.setFromMatrixPosition(x.matrixWorld)),Q.logarithmicDepthBuffer&&Tt.setValue(I,"logDepthBufFC",2/(Math.log(x.far+1)/Math.LN2)),(V.isMeshPhongMaterial||V.isMeshToonMaterial||V.isMeshLambertMaterial||V.isMeshBasicMaterial||V.isMeshStandardMaterial||V.isShaderMaterial)&&Tt.setValue(I,"isOrthographic",x.isOrthographicCamera===!0),M!==x&&(M=x,vn=!0,Ls=!0)}if(F.isSkinnedMesh){Tt.setOptional(I,F,"bindMatrix"),Tt.setOptional(I,F,"bindMatrixInverse");let on=F.skeleton;on&&(on.boneTexture===null&&on.computeBoneTexture(),Tt.setValue(I,"boneTexture",on.boneTexture,ve))}F.isBatchedMesh&&(Tt.setOptional(I,F,"batchingTexture"),Tt.setValue(I,"batchingTexture",F._matricesTexture,ve),Tt.setOptional(I,F,"batchingIdTexture"),Tt.setValue(I,"batchingIdTexture",F._indirectTexture,ve),Tt.setOptional(I,F,"batchingColorTexture"),F._colorsTexture!==null&&Tt.setValue(I,"batchingColorTexture",F._colorsTexture,ve));let Un=k.morphAttributes;if((Un.position!==void 0||Un.normal!==void 0||Un.color!==void 0)&&he.update(F,k,sn),(vn||Se.receiveShadow!==F.receiveShadow)&&(Se.receiveShadow=F.receiveShadow,Tt.setValue(I,"receiveShadow",F.receiveShadow)),V.isMeshGouraudMaterial&&V.envMap!==null&&(Ln.envMap.value=Ie,Ln.flipEnvMap.value=Ie.isCubeTexture&&Ie.isRenderTargetTexture===!1?-1:1),V.isMeshStandardMaterial&&V.envMap===null&&N.environment!==null&&(Ln.envMapIntensity.value=N.environmentIntensity),vn&&(Tt.setValue(I,"toneMappingExposure",y.toneMappingExposure),Se.needsLights&&it(Ln,Ls),ue&&V.fog===!0&&ne.refreshFogUniforms(Ln,ue),ne.refreshMaterialUniforms(Ln,V,q,de,p.state.transmissionRenderTarget[x.id]),Es.upload(I,_t(Se),Ln,ve)),V.isShaderMaterial&&V.uniformsNeedUpdate===!0&&(Es.upload(I,_t(Se),Ln,ve),V.uniformsNeedUpdate=!1),V.isSpriteMaterial&&Tt.setValue(I,"center",F.center),Tt.setValue(I,"modelViewMatrix",F.modelViewMatrix),Tt.setValue(I,"normalMatrix",F.normalMatrix),Tt.setValue(I,"modelMatrix",F.matrixWorld),V.isShaderMaterial||V.isRawShaderMaterial){let on=V.uniformsGroups;for(let un=0,pc=on.length;un<pc;un++){let sr=on[un];Ye.update(sr,sn),Ye.bind(sr,sn)}}return sn}function it(x,N){x.ambientLightColor.needsUpdate=N,x.lightProbe.needsUpdate=N,x.directionalLights.needsUpdate=N,x.directionalLightShadows.needsUpdate=N,x.pointLights.needsUpdate=N,x.pointLightShadows.needsUpdate=N,x.spotLights.needsUpdate=N,x.spotLightShadows.needsUpdate=N,x.rectAreaLights.needsUpdate=N,x.hemisphereLights.needsUpdate=N}function Zn(x){return x.isMeshLambertMaterial||x.isMeshToonMaterial||x.isMeshPhongMaterial||x.isMeshStandardMaterial||x.isShadowMaterial||x.isShaderMaterial&&x.lights===!0}this.getActiveCubeFace=function(){return A},this.getActiveMipmapLevel=function(){return C},this.getRenderTarget=function(){return D},this.setRenderTargetTextures=function(x,N,k){let V=le.get(x);V.__autoAllocateDepthBuffer=x.resolveDepthBuffer===!1,V.__autoAllocateDepthBuffer===!1&&(V.__useRenderToTexture=!1),le.get(x.texture).__webglTexture=N,le.get(x.depthTexture).__webglTexture=V.__autoAllocateDepthBuffer?void 0:k,V.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(x,N){let k=le.get(x);k.__webglFramebuffer=N,k.__useDefaultFramebuffer=N===void 0};let Dt=I.createFramebuffer();this.setRenderTarget=function(x,N=0,k=0){D=x,A=N,C=k;let V=!0,F=null,ue=!1,be=!1;if(x){let Ie=le.get(x);if(Ie.__useDefaultFramebuffer!==void 0)j.bindFramebuffer(I.FRAMEBUFFER,null),V=!1;else if(Ie.__webglFramebuffer===void 0)ve.setupRenderTarget(x);else if(Ie.__hasExternalTextures)ve.rebindTextures(x,le.get(x.texture).__webglTexture,le.get(x.depthTexture).__webglTexture);else if(x.depthBuffer){let Ve=x.depthTexture;if(Ie.__boundDepthTexture!==Ve){if(Ve!==null&&le.has(Ve)&&(x.width!==Ve.image.width||x.height!==Ve.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");ve.setupDepthRenderbuffer(x)}}let Ge=x.texture;(Ge.isData3DTexture||Ge.isDataArrayTexture||Ge.isCompressedArrayTexture)&&(be=!0);let $e=le.get(x).__webglFramebuffer;x.isWebGLCubeRenderTarget?(Array.isArray($e[N])?F=$e[N][k]:F=$e[N],ue=!0):x.samples>0&&ve.useMultisampledRTT(x)===!1?F=le.get(x).__webglMultisampledFramebuffer:Array.isArray($e)?F=$e[k]:F=$e,P.copy(x.viewport),z.copy(x.scissor),G=x.scissorTest}else P.copy(De).multiplyScalar(q).floor(),z.copy(Ze).multiplyScalar(q).floor(),G=at;if(k!==0&&(F=Dt),j.bindFramebuffer(I.FRAMEBUFFER,F)&&V&&j.drawBuffers(x,F),j.viewport(P),j.scissor(z),j.setScissorTest(G),ue){let Ie=le.get(x.texture);I.framebufferTexture2D(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_CUBE_MAP_POSITIVE_X+N,Ie.__webglTexture,k)}else if(be){let Ie=N;for(let Ge=0;Ge<x.textures.length;Ge++){let $e=le.get(x.textures[Ge]);I.framebufferTextureLayer(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0+Ge,$e.__webglTexture,k,Ie)}}else if(x!==null&&k!==0){let Ie=le.get(x.texture);I.framebufferTexture2D(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_2D,Ie.__webglTexture,k)}S=-1},this.readRenderTargetPixels=function(x,N,k,V,F,ue,be,Pe=0){if(!(x&&x.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ie=le.get(x).__webglFramebuffer;if(x.isWebGLCubeRenderTarget&&be!==void 0&&(Ie=Ie[be]),Ie){j.bindFramebuffer(I.FRAMEBUFFER,Ie);try{let Ge=x.textures[Pe],$e=Ge.format,Ve=Ge.type;if(!Q.textureFormatReadable($e)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Q.textureTypeReadable(Ve)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}N>=0&&N<=x.width-V&&k>=0&&k<=x.height-F&&(x.textures.length>1&&I.readBuffer(I.COLOR_ATTACHMENT0+Pe),I.readPixels(N,k,V,F,Be.convert($e),Be.convert(Ve),ue))}finally{let Ge=D!==null?le.get(D).__webglFramebuffer:null;j.bindFramebuffer(I.FRAMEBUFFER,Ge)}}},this.readRenderTargetPixelsAsync=async function(x,N,k,V,F,ue,be,Pe=0){if(!(x&&x.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Ie=le.get(x).__webglFramebuffer;if(x.isWebGLCubeRenderTarget&&be!==void 0&&(Ie=Ie[be]),Ie)if(N>=0&&N<=x.width-V&&k>=0&&k<=x.height-F){j.bindFramebuffer(I.FRAMEBUFFER,Ie);let Ge=x.textures[Pe],$e=Ge.format,Ve=Ge.type;if(!Q.textureFormatReadable($e))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Q.textureTypeReadable(Ve))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let nt=I.createBuffer();I.bindBuffer(I.PIXEL_PACK_BUFFER,nt),I.bufferData(I.PIXEL_PACK_BUFFER,ue.byteLength,I.STREAM_READ),x.textures.length>1&&I.readBuffer(I.COLOR_ATTACHMENT0+Pe),I.readPixels(N,k,V,F,Be.convert($e),Be.convert(Ve),0);let vt=D!==null?le.get(D).__webglFramebuffer:null;j.bindFramebuffer(I.FRAMEBUFFER,vt);let Et=I.fenceSync(I.SYNC_GPU_COMMANDS_COMPLETE,0);return I.flush(),await Yd(I,Et,4),I.bindBuffer(I.PIXEL_PACK_BUFFER,nt),I.getBufferSubData(I.PIXEL_PACK_BUFFER,0,ue),I.deleteBuffer(nt),I.deleteSync(Et),ue}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(x,N=null,k=0){let V=Math.pow(2,-k),F=Math.floor(x.image.width*V),ue=Math.floor(x.image.height*V),be=N!==null?N.x:0,Pe=N!==null?N.y:0;ve.setTexture2D(x,0),I.copyTexSubImage2D(I.TEXTURE_2D,k,0,0,be,Pe,F,ue),j.unbindTexture()};let Kt=I.createFramebuffer(),ke=I.createFramebuffer();this.copyTextureToTexture=function(x,N,k=null,V=null,F=0,ue=null){ue===null&&(F!==0?(as("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),ue=F,F=0):ue=0);let be,Pe,Ie,Ge,$e,Ve,nt,vt,Et,H=x.isCompressedTexture?x.mipmaps[ue]:x.image;if(k!==null)be=k.max.x-k.min.x,Pe=k.max.y-k.min.y,Ie=k.isBox3?k.max.z-k.min.z:1,Ge=k.min.x,$e=k.min.y,Ve=k.isBox3?k.min.z:0;else{let Un=Math.pow(2,-F);be=Math.floor(H.width*Un),Pe=Math.floor(H.height*Un),x.isDataArrayTexture?Ie=H.depth:x.isData3DTexture?Ie=Math.floor(H.depth*Un):Ie=1,Ge=0,$e=0,Ve=0}V!==null?(nt=V.x,vt=V.y,Et=V.z):(nt=0,vt=0,Et=0);let me=Be.convert(N.format),Se=Be.convert(N.type),pt;N.isData3DTexture?(ve.setTexture3D(N,0),pt=I.TEXTURE_3D):N.isDataArrayTexture||N.isCompressedArrayTexture?(ve.setTexture2DArray(N,0),pt=I.TEXTURE_2D_ARRAY):(ve.setTexture2D(N,0),pt=I.TEXTURE_2D),I.pixelStorei(I.UNPACK_FLIP_Y_WEBGL,N.flipY),I.pixelStorei(I.UNPACK_PREMULTIPLY_ALPHA_WEBGL,N.premultiplyAlpha),I.pixelStorei(I.UNPACK_ALIGNMENT,N.unpackAlignment);let lt=I.getParameter(I.UNPACK_ROW_LENGTH),sn=I.getParameter(I.UNPACK_IMAGE_HEIGHT),kr=I.getParameter(I.UNPACK_SKIP_PIXELS),vn=I.getParameter(I.UNPACK_SKIP_ROWS),Ls=I.getParameter(I.UNPACK_SKIP_IMAGES);I.pixelStorei(I.UNPACK_ROW_LENGTH,H.width),I.pixelStorei(I.UNPACK_IMAGE_HEIGHT,H.height),I.pixelStorei(I.UNPACK_SKIP_PIXELS,Ge),I.pixelStorei(I.UNPACK_SKIP_ROWS,$e),I.pixelStorei(I.UNPACK_SKIP_IMAGES,Ve);let Tt=x.isDataArrayTexture||x.isData3DTexture,Ln=N.isDataArrayTexture||N.isData3DTexture;if(x.isDepthTexture){let Un=le.get(x),on=le.get(N),un=le.get(Un.__renderTarget),pc=le.get(on.__renderTarget);j.bindFramebuffer(I.READ_FRAMEBUFFER,un.__webglFramebuffer),j.bindFramebuffer(I.DRAW_FRAMEBUFFER,pc.__webglFramebuffer);for(let sr=0;sr<Ie;sr++)Tt&&(I.framebufferTextureLayer(I.READ_FRAMEBUFFER,I.COLOR_ATTACHMENT0,le.get(x).__webglTexture,F,Ve+sr),I.framebufferTextureLayer(I.DRAW_FRAMEBUFFER,I.COLOR_ATTACHMENT0,le.get(N).__webglTexture,ue,Et+sr)),I.blitFramebuffer(Ge,$e,be,Pe,nt,vt,be,Pe,I.DEPTH_BUFFER_BIT,I.NEAREST);j.bindFramebuffer(I.READ_FRAMEBUFFER,null),j.bindFramebuffer(I.DRAW_FRAMEBUFFER,null)}else if(F!==0||x.isRenderTargetTexture||le.has(x)){let Un=le.get(x),on=le.get(N);j.bindFramebuffer(I.READ_FRAMEBUFFER,Kt),j.bindFramebuffer(I.DRAW_FRAMEBUFFER,ke);for(let un=0;un<Ie;un++)Tt?I.framebufferTextureLayer(I.READ_FRAMEBUFFER,I.COLOR_ATTACHMENT0,Un.__webglTexture,F,Ve+un):I.framebufferTexture2D(I.READ_FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_2D,Un.__webglTexture,F),Ln?I.framebufferTextureLayer(I.DRAW_FRAMEBUFFER,I.COLOR_ATTACHMENT0,on.__webglTexture,ue,Et+un):I.framebufferTexture2D(I.DRAW_FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_2D,on.__webglTexture,ue),F!==0?I.blitFramebuffer(Ge,$e,be,Pe,nt,vt,be,Pe,I.COLOR_BUFFER_BIT,I.NEAREST):Ln?I.copyTexSubImage3D(pt,ue,nt,vt,Et+un,Ge,$e,be,Pe):I.copyTexSubImage2D(pt,ue,nt,vt,Ge,$e,be,Pe);j.bindFramebuffer(I.READ_FRAMEBUFFER,null),j.bindFramebuffer(I.DRAW_FRAMEBUFFER,null)}else Ln?x.isDataTexture||x.isData3DTexture?I.texSubImage3D(pt,ue,nt,vt,Et,be,Pe,Ie,me,Se,H.data):N.isCompressedArrayTexture?I.compressedTexSubImage3D(pt,ue,nt,vt,Et,be,Pe,Ie,me,H.data):I.texSubImage3D(pt,ue,nt,vt,Et,be,Pe,Ie,me,Se,H):x.isDataTexture?I.texSubImage2D(I.TEXTURE_2D,ue,nt,vt,be,Pe,me,Se,H.data):x.isCompressedTexture?I.compressedTexSubImage2D(I.TEXTURE_2D,ue,nt,vt,H.width,H.height,me,H.data):I.texSubImage2D(I.TEXTURE_2D,ue,nt,vt,be,Pe,me,Se,H);I.pixelStorei(I.UNPACK_ROW_LENGTH,lt),I.pixelStorei(I.UNPACK_IMAGE_HEIGHT,sn),I.pixelStorei(I.UNPACK_SKIP_PIXELS,kr),I.pixelStorei(I.UNPACK_SKIP_ROWS,vn),I.pixelStorei(I.UNPACK_SKIP_IMAGES,Ls),ue===0&&N.generateMipmaps&&I.generateMipmap(pt),j.unbindTexture()},this.initRenderTarget=function(x){le.get(x).__webglFramebuffer===void 0&&ve.setupRenderTarget(x)},this.initTexture=function(x){x.isCubeTexture?ve.setTextureCube(x,0):x.isData3DTexture?ve.setTexture3D(x,0):x.isDataArrayTexture||x.isCompressedArrayTexture?ve.setTexture2DArray(x,0):ve.setTexture2D(x,0),j.unbindTexture()},this.resetState=function(){A=0,C=0,D=null,j.reset(),Me.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return ti}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=dt._getDrawingBufferColorSpace(e),t.unpackColorSpace=dt._getUnpackColorSpace()}};function qh(i,e=!1){let t=i[0].index!==null,n=new Set(Object.keys(i[0].attributes)),r=new Set(Object.keys(i[0].morphAttributes)),s={},o={},a=i[0].morphTargetsRelative,l=new qt,c=0;for(let h=0;h<i.length;++h){let u=i[h],d=0;if(t!==(u.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(let f in u.attributes){if(!n.has(f))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+'. All geometries must have compatible attributes; make sure "'+f+'" attribute exists among all geometries, or in none of them.'),null;s[f]===void 0&&(s[f]=[]),s[f].push(u.attributes[f]),d++}if(d!==n.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". Make sure all geometries have the same number of attributes."),null;if(a!==u.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(let f in u.morphAttributes){if(!r.has(f))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+".  .morphAttributes must be consistent throughout all geometries."),null;o[f]===void 0&&(o[f]=[]),o[f].push(u.morphAttributes[f])}if(e){let f;if(t)f=u.index.count;else if(u.attributes.position!==void 0)f=u.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". The geometry must have either an index or a position attribute"),null;l.addGroup(c,f,h),c+=f}}if(t){let h=0,u=[];for(let d=0;d<i.length;++d){let f=i[d].index;for(let m=0;m<f.count;++m)u.push(f.getX(m)+h);h+=i[d].attributes.position.count}l.setIndex(u)}for(let h in s){let u=Lf(s[h]);if(!u)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" attribute."),null;l.setAttribute(h,u)}for(let h in o){let u=o[h][0].length;if(u===0)break;l.morphAttributes=l.morphAttributes||{},l.morphAttributes[h]=[];for(let d=0;d<u;++d){let f=[];for(let v=0;v<o[h].length;++v)f.push(o[h][v][d]);let m=Lf(f);if(!m)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" morphAttribute."),null;l.morphAttributes[h].push(m)}}return l}function Lf(i){let e,t,n,r=-1,s=0;for(let c=0;c<i.length;++c){let h=i[c];if(e===void 0&&(e=h.array.constructor),e!==h.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(t===void 0&&(t=h.itemSize),t!==h.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(n===void 0&&(n=h.normalized),n!==h.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(r===-1&&(r=h.gpuType),r!==h.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;s+=h.count*t}let o=new e(s),a=new Ot(o,t,n),l=0;for(let c=0;c<i.length;++c){let h=i[c];if(h.isInterleavedBufferAttribute){let u=l/t;for(let d=0,f=h.count;d<f;d++)for(let m=0;m<t;m++){let v=h.getComponent(d,m);a.setComponent(d+u,m,v)}}else o.set(h.array,l);l+=h.count*t}return r!==void 0&&(a.gpuType=r),a}var ut={water:1605517,deep:1334128,foam:13234911,cream:16773326,sand:15124888,coral:15695981,dark:2445145,wood:9989198,leaf:4099191,leafLight:7846289,brass:15120733,stone:10991790};function yt(i,e,t=.78,n={}){let r=new Er({color:e,roughness:t,metalness:0,...n});return r.name=i,r}var re={cream:yt("warm-linen",ut.cream),sand:yt("warm-sand",ut.sand),coral:yt("coral-enamel",ut.coral),dark:yt("deep-teal-enamel",ut.dark),wood:yt("oiled-timber",ut.wood),leaf:yt("mangrove-leaf",ut.leaf),leafLight:yt("palm-leaf-tip",ut.leafLight),brass:yt("aged-brass",ut.brass,.4,{metalness:.45}),stone:yt("chalk-stone",ut.stone),rock:yt("submerged-basalt",6653318),glass:yt("sea-glass",8773329,.25,{metalness:.1})};function Mt(i,e,t=0,n=0,r=0,s="mesh"){let o=new Ct(i,e);return o.position.set(t,n,r),o.name=s,o.castShadow=!0,o.receiveShadow=!0,o}var gt=(i,e,t,n,r=0,s=0,o=0,a="timber")=>Mt(new ii(i,e,t),n,r,s,o,a),It=(i,e,t,n,r=0,s=0,o=0,a=8,l="column")=>Mt(new Hn(i,e,t,a),n,r,s,o,l),Yt=(i,e,t=0,n=0,r=0,s=0,o="stone")=>Mt(new gi(i,s),e,t,n,r,o),An=i=>{let e=new Qt;return e.name=i,e};function er(i,e,t,n=re.wood,r="branch"){let s=new R().subVectors(e,i),o=It(t*.8,t,s.length(),n,0,0,0,6,r);return o.position.copy(i).add(e).multiplyScalar(.5),o.quaternion.setFromUnitVectors(new R(0,1,0),s.normalize()),o}function wv(){let i=[[0,-6.8],[1.9,-4.3],[2.65,-1],[2.5,3.6],[1.85,5.1],[-1.85,5.1],[-2.5,3.6],[-2.65,-1],[-1.9,-4.3]],e=[],t=[],n=[];[{scale:.55,y:-1.45},{scale:.92,y:-.25},{scale:1,y:.85}].forEach(o=>i.forEach(([a,l],c)=>{e.push(a*o.scale,o.y,l*o.scale),n.push(c/(i.length-1),(o.y+1.45)/2.3)}));for(let o=0;o<2;o++)for(let a=0;a<i.length;a++){let l=o*i.length+a,c=o*i.length+(a+1)%i.length,h=l+i.length,u=c+i.length;t.push(l,h,c,c,h,u)}let s=new qt;return s.setAttribute("position",new ft(e,3)),s.setAttribute("uv",new ft(n,2)),s.setIndex(t),s.computeVertexNormals(),s}function ec(i,e,t,n){let r=new Ji;return r.moveTo(0,0),r.lineTo(i,1),r.quadraticCurveTo(i*.48,e*.48,0,e),r.closePath(),Mt(new Sr(r,{depth:.095,bevelEnabled:!0,bevelSegments:1,steps:1,bevelSize:.04,bevelThickness:.025,curveSegments:5}),t,0,0,0,n)}function Uf(i="steady"){let e=An(`tidebound-vessel-${i}`);e.add(Mt(wv(),re.dark,0,0,0,"lapstrake-hull"));let t=new Ji;t.moveTo(0,6.5),t.lineTo(1.8,4.2),t.lineTo(2.45,1),t.lineTo(2.3,-3.5),t.lineTo(1.7,-4.9),t.lineTo(-1.7,-4.9),t.lineTo(-2.3,-3.5),t.lineTo(-2.45,1),t.lineTo(-1.8,4.2),t.closePath();let n=Mt(new Sr(t,{depth:.22,bevelEnabled:!1}),re.cream,0,.72,0,"laid-deck");n.rotation.x=-Math.PI/2,e.add(n);for(let a of[-1,1]){let l=gt(.14,.35,7.4,re.coral,a*2.45,.51,.1,"painted-waterline");l.rotation.y=a*.04,e.add(l),e.add(gt(.12,.15,7.4,re.wood,a*2.39,1.35,.2,"gunwale"));for(let c=-2.8;c<4;c+=2.1)e.add(It(.07,.07,.7,re.wood,a*2.38,1.05,c,5,"railing-post"))}e.add(gt(2.4,.9,2.4,re.wood,0,1.25,2.3,"cabin")),e.add(gt(2.6,.18,2.6,re.cream,0,1.8,2.3,"cabin-roof")),e.add(gt(1.1,.65,.06,re.dark,0,1.35,1.07,"cabin-window")),e.add(It(.14,.21,11.6,re.wood,0,6.1,-.55,8,"main-mast")),e.add(gt(.22,.3,2,re.wood,0,1.2,4.5,"rudder-tiller"));let r=An("sail-rig");if(r.position.set(0,2.1,-.55),i==="cargo"){let a=gt(7.4,6.4,.1,re.cream,0,4.5,0,"cargo-square-sail");r.add(a),r.add(gt(7.6,.15,.17,re.wood,0,7.75,0,"cargo-yard")),r.add(gt(7.4,.65,.16,re.coral,0,1.8,-.05,"sail-reef-band"));for(let l of[-2.4,0,2.4])r.add(gt(.05,6.2,.12,re.sand,l,4.5,-.08,"cloth-seam"))}else{r.add(ec(i==="swift"?6:4.9,9,re.cream,"mainsail"));let a=ec(i==="swift"?-4.4:-2.7,i==="swift"?7.7:6.5,i==="swift"?re.coral:re.sand,"jib");a.position.z=-.12,r.add(a),r.add(er(new R(0,.15,.1),new R(i==="swift"?6:4.9,1,.1),.09,re.wood,"sail-boom"));let l=Yt(.64,re.coral,1.1,4.5,-.14,0,"sail-star");l.scale.set(1,1,.15),r.add(l)}e.add(r),e.add(er(new R(0,11.8,-.55),new R(0,1,-6.1),.025,re.cream,"forestay")),e.add(er(new R(0,11.8,-.55),new R(0,1,4.9),.025,re.cream,"backstay"));let s=ec(1.8,.85,re.coral,"mast-pennant");s.position.set(0,11.3,-.55),e.add(s);let o=Mt(new ri(.6,.15,6,12),re.coral,-2.5,.85,2.4,"life-ring");o.rotation.y=Math.PI/2,e.add(o);for(let a=0;a<(i==="cargo"?3:1);a++)e.add(gt(.9,.8,.9,re.sand,(a-1)*1.1,1.2,-3.5,"supply-crate"));return e.userData={assetId:`tidebound.vessel.${i}`,forward:"-Z",rig:i,colliders:[{type:"capsule",radius:2.5,length:8,axis:"z",center:[0,0,-.7]}]},e}function Yh(i=0,e=!1){let t=An(e?"mangrove-tree":"coastal-palm"),n=7+i%3,r=(i%2?1:-1)*1.1;if(t.add(er(new R(0,0,0),new R(r,n,0),e?.55:.32,re.wood,"trunk")),e){for(let o=0;o<5;o++){let a=o*Math.PI*2/5;t.add(er(new R(r*.2,2.4,0),new R(Math.cos(a)*2.2,-.3,Math.sin(a)*2.2),.18,re.wood,"exposed-root"))}let s=Yt(3.5,re.leaf,r,n,0,1,"mangrove-crown");s.scale.y=.65,t.add(s)}else{for(let s=0;s<7;s++){let o=s*Math.PI*2/7,a=new Ji;a.moveTo(0,0),a.quadraticCurveTo(.7,1.3,0,4.7),a.quadraticCurveTo(-.7,1.3,0,0);let l=Mt(new Sr(a,{depth:.13,bevelEnabled:!1,curveSegments:4}),s%2?re.leaf:re.leafLight,r,n,0,`palm-frond-${s}`);l.rotation.set(-.95,o,0,"YXZ"),t.add(l)}for(let s=0;s<3;s++)t.add(Yt(.36,re.wood,r+Math.sin(s*2)*.4,n-.4,Math.cos(s*2)*.4,0,"coconut"))}return t.userData={assetId:`tidebound.flora.${e?"mangrove":"palm"}`,colliders:[{type:"cylinder",radius:.6,height:n,center:[r*.5,n*.5,0]}]},t}function Ts(i,e,t,n,r=0){let s=new Hn(i*.9,i,e,12,1,!1),o=s.attributes.position;for(let l=0;l<o.count;l++){let c=o.getX(l),h=o.getZ(l),u=Math.atan2(h,c),d=(1+.09*Math.sin(u*3+t)+.04*Math.cos(u*5+t))/1.13;o.setXYZ(l,c*d,o.getY(l),h*d)}return s.computeVertexNormals(),Mt(s,n,0,r,0,"terraced-shore")}function Nf(i={id:"island",radius:24,color:"#ead9ad",type:"explore"}){let e=An(`island-${i.id}`),t=i.radius||24,n=String(i.id).split("").reduce((s,o)=>s+o.charCodeAt(0),0);e.add(Ts(t,4,n,re.sand,-1.9)),e.add(Ts(t*.99,3.6,n,re.sand,1));let r=yt(`${i.id}-earth`,i.type==="reef"?6790804:8366474);if(e.add(Ts(t*.79,5.1,n,re.rock,3)),e.add(Ts(t*.8,.8,n,r,5.5)),i.id==="gull"||i.id==="lighthouse"){let s=i.id==="gull"?.74:.53;e.add(Ts(t*s,5,n+4,re.stone,7.5)),e.add(Ts(t*(s+.01),.7,n+4,r,10))}if(i.id==="ruin"){for(let s=0;s<5;s++){let o=s*1.25;e.add(It(1.1,1.3,7.3,re.cream,Math.sin(o)*10,9.4,Math.cos(o)*9,6,"ruin-colonnade")),e.add(gt(3,.6,2.5,re.stone,Math.sin(o)*10,13.1,Math.cos(o)*9,"ruin-capital"))}e.add(It(7,7,1,re.stone,0,6.2,0,12,"star-court"))}if(i.id==="reef"){for(let s=0;s<9;s++){let o=Yt(3.1,s%2?re.glass:re.coral,Math.cos(s*2.4)*8,5.4,Math.sin(s*2.4)*8,0,"glassy-reef-spire");o.scale.set(.65,1.7,.65),e.add(o)}e.add(gt(5.2,2.2,3,re.sand,-7,1.1,10.2,"reef-jetty-landing"))}return e.userData={assetId:`tidebound.island.${i.id}`,groundHeight:i.id==="gull"||i.id==="lighthouse"?10.4:5.9,colliders:[{type:"cylinder",radius:t,height:10,center:[0,2.5,0]}]},e}function Ff(){let i=An("harbor-kit");for(let t=0;t<3;t++){let n=(t-1)*8,r=t%2?2:-2;i.add(gt(6.4,5.2,6.4,re.cream,n,8.6,r,"port-house"));let s=It(0,5.3,2.9,t===1?re.dark:re.coral,n,12.4,r,4,"hipped-tile-roof");s.rotation.y=Math.PI/4,i.add(s);for(let o of[-1,1])i.add(gt(1.1,1.7,.13,re.dark,n+o*1.6,8.8,r-3.24,"shutter-window"));i.add(gt(1.4,2.6,.13,re.wood,n,7.4,r-3.24,"port-door"))}i.add(It(.2,.25,11,re.wood,10,10,-9,8,"harbor-flagpole"));let e=ec(4,2,re.coral,"harbor-pennant");e.position.set(10,13,-9),i.add(e);for(let t=0;t<5;t++)i.add(gt(1.8,1.8,1.8,t%2?re.sand:re.wood,-11.7+t*2.1,6.8,-9,"cargo-stack"));return i.userData.colliders=[{type:"box",size:[25,9,15],center:[0,9,0]}],i}function Of(i=13){let e=An("timber-jetty");for(let t=0;t<i;t+=1.3)e.add(gt(5,.28,1.12,re.wood,0,2.15,t,"jetty-plank"));for(let t=1;t<i;t+=4)for(let n of[-2.2,2.2])e.add(It(.18,.23,5.8,re.wood,n,.8,t,6,"jetty-pile"));for(let t of[-2.3,2.3]){e.add(It(.35,.35,1.1,re.dark,t,2.9,.5,8,"mooring-bollard"));let n=Mt(new ri(.5,.11,5,12),re.sand,t,2.8,.5,"mooring-rope");n.rotation.x=Math.PI/2,e.add(n)}return e}function Bf(i=!1){let e=An("far-tide-lighthouse");e.add(It(4.8,6,1.7,re.stone,0,.85,0,12,"tower-foundation")),e.add(It(2.8,4.3,22,re.cream,0,12,0,12,"lighthouse-tower"));for(let n of[5.5,12,18])e.add(It(n>15?3:3.8,n>15?3.2:4,1.8,re.coral,0,n,0,12,"tower-band"));e.add(It(4.1,4.1,.8,re.dark,0,23,0,12,"lantern-balcony"));for(let n=0;n<8;n++){let r=n*Math.PI/4;e.add(It(.09,.09,3.8,re.dark,Math.sin(r)*2.7,25,Math.cos(r)*2.7,5,"lantern-frame"))}e.add(It(0,4.1,3.2,re.dark,0,28,0,12,"lantern-roof"));let t=Yt(1.7,i?yt("beacon-light",16771238,.25,{emissive:16764521,emissiveIntensity:2}):re.glass,0,25,0,1,"keeper-lens");return e.add(t),e.add(gt(1.6,3,.2,re.dark,0,2,-4.25,"lighthouse-door")),e.userData={assetId:"tidebound.structure.lighthouse",colliders:[{type:"cylinder",radius:5,height:30,center:[0,15,0]}]},e}function zf(i=6){let e=An("tidal-rock-cluster");for(let t=0;t<7;t++){let n=t*2.4,r=i*(.24+.1*(t%4)),s=Yt(i*(.25+.06*(t%3)),t%3?re.rock:re.sand,Math.cos(n)*r,-.8+Math.sin(t)*.3,Math.sin(n)*r,0,"tidal-reef");s.scale.y=.75,e.add(s)}return e}function Go(i){let e=An(`discovery-${i}`);if(i==="foxfish"){let t=Yt(1.15,re.coral,0,0,0,1,"fox-fish-body");t.scale.set(.45,.8,1.7),e.add(t);let n=It(0,.9,1.6,re.brass,0,0,2,3,"fish-tail");n.rotation.x=Math.PI/2,e.add(n);for(let r of[-1,1])e.add(Yt(.18,re.dark,r*.42,.25,-1,1,"fish-eye"));for(let r of[-.3,.4])e.add(gt(.95,1.35,.13,re.cream,0,0,r,"fish-stripe"))}else if(i==="tern"){let t=Yt(1,re.cream,0,0,0,1,"tern-body");t.scale.set(.6,.6,1.3),e.add(t);for(let r of[-1,1]){let s=Yt(1,re.cream,r*1.4,.2,.15,0,"tern-wing");s.scale.set(2,.15,.7),s.rotation.z=r*.2,e.add(s)}let n=It(0,.25,1,re.coral,0,.15,-1.25,5,"tern-beak");n.rotation.x=-Math.PI/2,e.add(n)}else if(i==="turtle"){let t=Yt(1.8,re.leaf,0,.3,0,1,"turtle-shell");t.scale.set(1,.5,1.15),e.add(t),e.add(Yt(.65,re.leafLight,0,.15,-2,1,"turtle-head"));for(let n of[-1,1])for(let r of[-1,1]){let s=Yt(.9,re.leafLight,n*1.5,0,r,0,"turtle-flipper");s.scale.set(1.1,.2,.5),s.rotation.y=n*r*.45,e.add(s)}}else if(i==="nautilus"){for(let t=0;t<10;t++){let n=t*.65,r=.15+t*.15;e.add(Yt(.25+t*.075,t%2?re.sand:re.cream,Math.cos(n)*r,Math.sin(n)*r,0,0,"nautilus-shell-ridge"))}for(let t=0;t<5;t++)e.add(er(new R(-1,-.5,0),new R(-2.1,-1+t*.3,(t-2)*.18),.07,re.coral,"nautilus-tentacle"))}else if(i==="fan-coral")for(let t=0;t<8;t++){let n=(t/7-.5)*2.4,r=new R(Math.sin(n)*3.5,Math.cos(n)*3.5+.6,Math.sin(t)*.25);e.add(er(new R(0,0,0),r,.15,re.coral,"coral-fan-branch"));for(let s=1;s<4;s++){let o=r.clone().multiplyScalar(s/4);e.add(er(o,o.clone().add(new R(.55,1,.18)),.09,re.coral,"coral-fan-filament"))}}else if(i==="mangrove-root")e.add(Yh(1,!0));else if(i==="seagrass")for(let t=0;t<12;t++){let n=It(.02,.14,2.5+t%3,re.leafLight,Math.sin(t*2.4)*1.4,1.4,Math.cos(t*2.4)*1.4,3,"ribbon-seagrass");n.rotation.z=Math.sin(t)*.3,e.add(n)}else if(i==="glass-coral")for(let t=0;t<7;t++){let n=Yt(1.1,re.glass,Math.sin(t*2.4)*1.8,1+t%3*.45,Math.cos(t*2.4)*1.8,0,"glass-branch");n.scale.set(.45,2.4,.55),e.add(n)}else if(i==="star-tablet"){e.add(gt(3.2,4.5,.75,re.stone,0,2.2,0,"star-tablet"));for(let t=0;t<7;t++){let n=t*Math.PI*2/7;e.add(Yt(.17,re.brass,Math.sin(n)*1.05,2.4+Math.cos(n)*1.25,-.45,0,"seven-star-inlay"))}e.add(gt(3.6,.5,1.4,re.cream,0,.25,0,"tablet-plinth"))}else if(i==="tide-clock"){let t=Mt(new ri(2,.35,6,16),re.brass,0,2,0,"tide-clock-rim");e.add(t),e.add(It(1.9,1.9,.4,re.dark,0,2,0,12,"clock-face")),e.children[1].rotation.x=Math.PI/2,e.add(gt(.15,1.6,.2,re.cream,.15,2.5,-.4,"clock-hand"));for(let n=0;n<8;n++){let r=n*Math.PI/4;e.add(gt(.35,.35,.6,re.brass,Math.sin(r)*2.1,2+Math.cos(r)*2.1,0,"clock-gear"))}}else if(i==="beacon-lens"){e.add(It(1.5,1.9,.7,re.stone,0,.35,0,8,"lens-plinth"));let t=Yt(2,re.glass,0,2.5,0,1,"refractor-lens");t.scale.set(1,1,.4),e.add(t);let n=Mt(new ri(2.1,.18,6,16),re.brass,0,2.5,0,"lens-frame");e.add(n)}else{e.add(gt(3.8,1.5,2.4,re.wood,0,.75,0,"keepers-archive")),e.add(gt(4,.3,2.5,re.coral,0,1.6,0,"archive-lid")),e.add(gt(.5,.7,.15,re.brass,0,1,-1.25,"archive-lock"));let t=gt(1.3,.3,1.7,re.cream,.4,1.95,0,"keepers-journal");t.rotation.y=-.2,e.add(t)}return e.userData={assetId:`tidebound.discovery.${i}`,colliders:[{type:"sphere",radius:2.5,center:[0,1,0]}]},e}function tc(){let i=An("tide-voyager"),e=[],t=(b,y,T,A,C)=>{let D=new hs;return D.name=b,D.position.set(T,A,C),y?.add(D),e.push(D),D},n=t("Hips",null,0,1.1,0),r=t("Spine",n,0,.5,0),s=t("Head",r,0,.62,0);t("LeftArm",r,-.52,.22,0),t("RightArm",r,.52,.22,0),t("LeftLeg",n,-.24,-.2,0),t("RightLeg",n,.24,-.2,0),i.add(n),i.updateMatrixWorld(!0);let o=[],a=[],l=[],c=[],h=[],u=[],d=[],f=(b,y,T,A)=>{let C=new ii(...y),D=new R,S=new je(A),M=o.length/3;for(let P=0;P<C.attributes.position.count;P++)D.fromBufferAttribute(C.attributes.position,P).add(new R(...T)),e[b].localToWorld(D),o.push(D.x,D.y,D.z),a.push(C.attributes.normal.getX(P),C.attributes.normal.getY(P),C.attributes.normal.getZ(P)),l.push(C.attributes.uv.getX(P),C.attributes.uv.getY(P)),c.push(b,0,0,0),h.push(1,0,0,0),u.push(S.r,S.g,S.b);for(let P=0;P<C.index.count;P++)d.push(M+C.index.getX(P));C.dispose()};f(0,[.7,.4,.48],[0,0,0],ut.dark),f(1,[.86,.78,.5],[0,0,0],ut.coral),f(2,[.61,.6,.58],[0,.04,0],15318161),f(2,[.8,.13,.78],[0,.4,0],ut.cream),f(2,[.58,.28,.56],[0,.52,0],ut.cream),f(2,[.46,.16,.1],[0,.12,-.32],ut.dark);for(let b of[3,4])f(b,[.24,.72,.28],[0,-.3,0],ut.coral),f(b,[.23,.24,.25],[0,-.75,0],15318161);for(let b of[5,6])f(b,[.3,.8,.34],[0,-.35,0],ut.dark),f(b,[.35,.22,.58],[0,-.82,-.12],ut.cream);let m=new qt;m.setAttribute("position",new ft(o,3)),m.setAttribute("normal",new ft(a,3)),m.setAttribute("uv",new ft(l,2)),m.setAttribute("color",new ft(u,3)),m.setAttribute("skinIndex",new yr(c,4)),m.setAttribute("skinWeight",new ft(h,4)),m.setIndex(d);let v=new ho(m,yt("voyager-woven-uniform",16777215,.85,{vertexColors:!0}));v.name="VoyagerSkin",v.castShadow=!0,i.add(v),v.bind(new fo(e));let g=(b,y,T,A)=>{let C=T.flatMap(D=>new nn().setFromAxisAngle(y,D).toArray());return new Ci(`${b}.quaternion`,A,C)},p=new R(1,0,0),E=new R(0,0,1);return i.animations=[new Pi("DockIdle",3,[g("LeftArm",E,[.08,.14,.08],[0,1.5,3]),g("RightArm",E,[-.08,-.14,-.08],[0,1.5,3]),g("Head",p,[0,.07,0],[0,1.5,3])]),new Pi("Swim",1.6,[g("LeftArm",p,[-1.8,.6,-1.8],[0,.8,1.6]),g("RightArm",p,[.6,-1.8,.6],[0,.8,1.6]),g("LeftLeg",p,[-.4,.4,-.4],[0,.8,1.6]),g("RightLeg",p,[.4,-.4,.4],[0,.8,1.6])]),new Pi("DockWave",1.8,[g("RightArm",E,[-2.5,-2.1,-2.5,-2.1,-2.5],[0,.45,.9,1.35,1.8])])],i.userData={assetId:"tidebound.character.voyager",rootMotion:!1,colliders:[{type:"capsule",radius:.48,height:2.7,center:[0,1.35,0]}]},i}function kf(){let i=An("three-dimensional-current-marker"),e=gt(.45,.15,3.7,re.glass,0,0,.3,"current-shaft");i.add(e);for(let t of[-1,1]){let n=gt(.45,.16,1.9,re.glass,t*.62,0,-1.1,"current-chevron");n.rotation.y=-t*.75,i.add(n)}return i}function Hf(){let i=An("sea-survey-buoy");return i.add(It(1.6,1.3,.7,re.coral,0,.25,0,12,"buoy-float")),i.add(It(.13,.19,3.5,re.dark,0,2,0,6,"buoy-mast")),i.add(Yt(.85,re.brass,0,4,0,0,"survey-signal")),i.add(gt(1.6,.65,.2,re.cream,0,2.6,0,"research-plate")),i.add(gt(.7,.42,.8,re.glass,.8,.9,0,"sample-container")),i.userData={assetId:"tidebound.navigation.survey-buoy",colliders:[{type:"sphere",radius:9,center:[0,0,0],trigger:!0,purpose:"optional low-speed observation; no rigid collision"}]},i}function Vf(i=15){let e=An("tidal-whirlpool");for(let t=0;t<4;t++){let n=Mt(new ri(i*(.3+t*.2),.14+t*.04,5,36,Math.PI*1.6),t%2?re.glass:re.cream,0,-t*.045,0,"spiral-current");n.rotation.x=-Math.PI/2,n.rotation.z=t*.8,e.add(n)}return e}var Zh=Math.PI*2,Gf=`
uniform float uTime;uniform float uTide;uniform float uMotion;
varying vec3 vWorld;varying vec3 vNormal;varying float vWave;
void main(){vec3 p=position;float a=p.x*.075+uTime*.9;float b=-p.y*.11-uTime*.65;float c=(p.x-p.y)*.041+uTime*.55;
float h=(sin(a)*.34+sin(b)*.22+sin(c)*.18)*uMotion;p.z+=h+uTide;
vec4 world=modelMatrix*vec4(p,1.);vWorld=world.xyz;vWave=h;vNormal=normalize(vec3(-cos(a)*.0255*uMotion-cos(c)*.00738*uMotion,1.,-cos(b)*.0242*uMotion-cos(c)*.00738*uMotion));
gl_Position=projectionMatrix*viewMatrix*world;}`,Tv=`
uniform float uTime;uniform vec3 uCamera;uniform float uDive;uniform float uEconomy;
varying vec3 vWorld;varying vec3 vNormal;varying float vWave;
void main(){vec3 deep=vec3(.055,.34,.40),shallow=vec3(.10,.53,.55);float l=.52+vWave*.55;vec3 col=mix(deep,shallow,l);
if(uEconomy>.5){float ripple=sin(vWorld.x*.13+vWorld.z*.17+uTime*.4);col+=smoothstep(.94,1.,ripple)*.025;float fog=smoothstep(240.,650.,length(uCamera-vWorld));gl_FragColor=vec4(mix(col,vec3(.69,.82,.79),fog),1.);return;}
vec3 light=normalize(vec3(-.5,1.,-.35));vec3 viewDir=normalize(uCamera-vWorld);float spec=pow(max(dot(reflect(-light,vNormal),viewDir),0.),180.);
float ripple=sin(vWorld.x*.22+sin(vWorld.z*.13)*1.3+uTime*.4)*sin(vWorld.z*.27+sin(vWorld.x*.14));float glint=smoothstep(.94,.999,ripple)*.085;
col+=vec3(.82,.88,.70)*spec*.45+glint;float fog=smoothstep(240.,650.,distance(uCamera,vWorld));col=mix(col,vec3(.69,.82,.79),fog);
gl_FragColor=vec4(col,1.-uDive*.43);}`,Av=`
uniform vec3 uCamera;varying vec3 vWorld;varying float vWave;
void main(){vec3 col=mix(vec3(.055,.34,.40),vec3(.10,.53,.55),.52+vWave*.55);
col+=smoothstep(.21,.34,vWave)*.025;float fog=smoothstep(240.,650.,length(uCamera-vWorld));
gl_FragColor=vec4(mix(col,vec3(.69,.82,.79),fog),1.);}`;function Wf(i){return new Set(Array.isArray(i)?i.map(e=>typeof e=="string"?e:e.id):Object.keys(i||{}))}function Ni(i,e){let t=Mt(new ri(i,.22,5,40),yt("navigation-ring",e,.6,{emissive:e,emissiveIntensity:.12}));return t.rotation.x=-Math.PI/2,t.castShadow=!1,t}function Xf(i,e,t=!1,n=!1){if(!e.length)return[];let r=(n?$f:Wn)(Yh(1,t));r.updateMatrixWorld(!0);let s=[];return r.traverse(o=>{if(!o.isMesh)return;let a=new ds(o.geometry,o.material,e.length);a.name=t?"instanced-mangroves":"instanced-palms",a.castShadow=!0,a.receiveShadow=!0;let l=new ot,c=new nn,h=new R;e.forEach((u,d)=>{c.setFromAxisAngle(new R(0,1,0),u.a),h.setScalar(u.scale),l.compose(new R(u.x,u.y,u.z),c,h).multiply(o.matrixWorld),a.setMatrixAt(d,l)}),a.computeBoundingSphere(),i.add(a),s.push(a)}),s}function Wn(i){i.updateMatrixWorld(!0);let e=new Map;for(let t of[...i.children])if(t.isMesh&&!t.isSkinnedMesh&&!Array.isArray(t.material)){let n=t.material.uuid;e.has(n)||e.set(n,[]),e.get(n).push(t)}for(let t of e.values()){if(t.length<2)continue;let n=t.map(o=>{let a=o.geometry.index?o.geometry.toNonIndexed():o.geometry.clone();for(let l of Object.keys(a.attributes))["position","normal","uv"].includes(l)||a.deleteAttribute(l);return a.attributes.uv||a.setAttribute("uv",new Ot(new Float32Array(a.attributes.position.count*2),2)),a.applyMatrix4(o.matrix)}),r=qh(n);if(n.forEach(o=>o.dispose()),!r)continue;let s=new Ct(r,t[0].material);s.castShadow=t.some(o=>o.castShadow),s.receiveShadow=!0,s.name="batched-"+i.name,t.forEach(o=>i.remove(o)),i.add(s)}return i}function $f(i){i.updateMatrixWorld(!0);let e=[...i.children].filter(s=>s.isMesh&&!s.isSkinnedMesh&&!Array.isArray(s.material)&&!s.material.transparent&&s.material.emissive?.getHex()===0);if(e.length<2)return Wn(i);let t=e.map(s=>{let o=s.geometry.index?s.geometry.toNonIndexed():s.geometry.clone();for(let h of Object.keys(o.attributes))["position","normal","uv","color"].includes(h)||o.deleteAttribute(h);o.attributes.uv||o.setAttribute("uv",new Ot(new Float32Array(o.attributes.position.count*2),2));let a=new Float32Array(o.attributes.position.count*3),l=o.attributes.color,c=s.material.color;for(let h=0;h<o.attributes.position.count;h++)a[h*3]=c.r*(l?l.getX(h):1),a[h*3+1]=c.g*(l?l.getY(h):1),a[h*3+2]=c.b*(l?l.getZ(h):1);return o.setAttribute("color",new Ot(a,3)),o.applyMatrix4(s.matrix)}),n=qh(t);if(t.forEach(s=>s.dispose()),!n)return i;let r=new Ct(n,new Er({name:"baked-static-colours",color:16777215,vertexColors:!0,roughness:.78}));return r.name="colour-batched-"+i.name,r.castShadow=e.some(s=>s.castShadow),r.receiveShadow=!0,e.forEach(s=>i.remove(s)),i.add(r),i}function qf(i,e){let{ISLANDS:t=[],DISCOVERIES:n=[],REEFS:r=[],CURRENTS:s=[],WHIRLS:o=[],DIVE_SITES:a=[],OBSERVATIONS:l=[]}=e,c=new jl({canvas:i,antialias:!1,alpha:!1,powerPreference:"high-performance"});c.setClearColor(11653834),c.outputColorSpace=ln,c.toneMapping=No,c.toneMappingExposure=1.22,c.shadowMap.enabled=!0,c.shadowMap.type=Qa,c.shadowMap.autoUpdate=!1;let h=c.getContext(),u=h.getExtension("WEBGL_debug_renderer_info"),d=!!u&&/swiftshader|llvmpipe|software/i.test(h.getParameter(u.UNMASKED_RENDERER_WEBGL)),f=d?$f:Wn,m=new co;m.background=new je(11653834),m.fog=new lo(11653834,230,620);let v=new jt(43,1,.35,1e3);v.position.set(0,73,229);let g=new Po(15267555,3766390,2.3);m.add(g);let p=new Uo(16772305,3);p.position.set(-130,220,-100),p.castShadow=!0,p.shadow.mapSize.set(768,768),p.shadow.camera.left=-95,p.shadow.camera.right=95,p.shadow.camera.top=95,p.shadow.camera.bottom=-95,p.shadow.camera.near=5,p.shadow.camera.far=480,p.shadow.bias=-5e-4,p.shadow.normalBias=.18,m.add(p),m.add(p.target);let E=new mn({uniforms:{uTime:{value:0},uTide:{value:0},uMotion:{value:1},uCamera:{value:v.position},uDive:{value:0},uEconomy:{value:0}},vertexShader:Gf,fragmentShader:Tv,side:zn,transparent:!1,depthWrite:!0}),b=new mn({uniforms:E.uniforms,vertexShader:Gf,fragmentShader:Av,side:zn}),y=64,T=new Ct(new Ki(1500,1500,y,y),E);T.rotation.x=-Math.PI/2,T.name="displaced-ocean-surface",T.frustumCulled=!1,T.renderOrder=0,m.add(T);let A=[],C=[],D=[],S=[],M=[],P=[],z=[],G,$,X;for(let O of t){let ie=f(Nf(O));ie.position.set(O.x,0,O.z),m.add(ie);let we=new Qt;we.name=`island-detail-${O.id}`,we.position.set(O.x,0,O.z),m.add(we);let _t=ie.userData.groundHeight;if(O.id==="harbor"&&we.add(f(Ff())),O.id==="lighthouse"){G=Bf(!1),G.position.y=_t,we.add(G);let ke=G.getObjectByName("keeper-lens");ke.material=ke.material.clone(),ke.material.name="keeper-lens-active",G.remove(ke),Wn(G),G.add(ke),$=new Do(16768138,0,80,2),$.position.set(O.x,_t+25,O.z),m.add($),X=Mt(new br(17,110,24,1,!0),yt("restored-beacon-ray",16770464,.6,{transparent:!0,opacity:.075,depthWrite:!1,side:Vn,emissive:16769698,emissiveIntensity:.8}),0,0,0,"restored-lighthouse-beam"),X.geometry.translate(0,-55,0),X.rotation.z=Math.PI/2;let x=new Qt;x.name="beacon-rotation",x.position.set(O.x,_t+25,O.z),x.add(X),m.add(x),X.userData.rotor=x,x.visible=!1}let Jt=new R(O.x-O.dock.x,0,O.z-O.dock.z),_n=Math.max(8,Jt.length()-O.radius*.63),it=f(Of(_n));it.rotation.y=Math.atan2(Jt.x,Jt.z),it.position.set(O.dock.x+Math.cos(it.rotation.y)*7,0,O.dock.z-Math.sin(it.rotation.y)*7),m.add(it),A.push({object:it,x:O.dock.x,z:O.dock.z});let Zn=Ni(5.9,16767117);Zn.position.set(O.dock.x,.85,O.dock.z),m.add(Zn);let Dt=Mt(new Hn(.7,.9,4.5,8),yt("dock-marker",ut.coral),O.dock.x+Math.cos(it.rotation.y)*4,2.8,O.dock.z-Math.sin(it.rotation.y)*4,"safe-mooring-marker");m.add(Dt);let Kt=Mt(new gi(.9,0),yt("port-lantern",ut.cream,.4,{emissive:16767366,emissiveIntensity:.5}),0,2.9,0,"dock-lantern");if(Dt.add(Kt),A.push({object:Dt,x:O.dock.x,z:O.dock.z}),O.id!=="reef"&&O.id!=="ruin"&&O.id!=="lighthouse")for(let ke=0;ke<(O.id==="mangrove"?7:4);ke++){let x=ke*2.399+O.x*.01,N=O.radius*(.3+.1*(ke%3));(O.id==="mangrove"?z:P).push({x:O.x+Math.cos(x)*N,y:_t,z:O.z+Math.sin(x)*N,a:x,scale:.75+ke%3*.14})}if(O.id==="harbor"||O.id==="gull"){let ke=tc();ke.scale.setScalar(1.3),ke.position.set(-3,_t,-O.radius*.55),we.add(ke);let x=new Rr(ke);x.clipAction(ke.animations[O.id==="harbor"?2:0]).play(),S.push({mixer:x,person:ke,islandId:O.id})}for(let[ke,x]of n.filter(N=>N.islandId===O.id&&!N.diveSiteId).entries()){let N=Wn(Go(x.id)),k=-Math.PI*.7+ke*1.3;N.position.set(Math.sin(k)*O.radius*.37,_t+.3,Math.cos(k)*O.radius*.37),x.id==="tern"&&(N.position.y+=4.5),we.add(N);let V=Ni(3,ut.brass);V.position.copy(N.position),V.position.y=_t+.15,we.add(V),D.push({id:x.id,model:N,ring:V,baseY:N.position.y,animal:x.kind==="animal"})}C.push({land:ie,detail:we,ring:Zn,data:O})}let Z=[...Xf(m,P,!1,d),...Xf(m,z,!0,d)],de=Wn(Hf()),q=l.map(O=>{let ie=de.clone(!0);ie.name=`survey-${O.id}`,m.add(ie);let we=Ni(3.6,ut.brass);return m.add(we),{data:O,model:ie,ring:we}}),ge=Ni(4,5541867);m.add(ge);let Te=Mt(new br(.7,2.2,6),yt("navigation-guide",5541867,.5,{emissive:2710714,emissiveIntensity:.25}),0,0,0,"selected-route-waypoint");m.add(Te);let De=r.map(O=>{let ie=Wn(zf(O.radius));ie.scale.y=.42;let we=new En().setFromObject(ie);ie.position.set(O.x,O.safeHeight*1.7-we.max.y,O.z),m.add(ie);let _t=Ni(O.radius+.5,15571827);return _t.position.set(O.x,0,O.z),m.add(_t),{data:O,model:ie,ring:_t}}),Ze=s.map((O,ie)=>{let we=[];for(let _t=0;_t<7;_t++){let Jt=Wn(kf());Jt.position.set(O.x+(ie?8:-8)*Math.sin(_t),.3,O.z+(_t-3)*15),m.add(Jt),we.push(Jt)}return{data:O,arrows:we}}),at=o.map(O=>{let ie=Wn(Vf(O.radius));ie.position.set(O.x,0,O.z),m.add(ie);let we=Ni(O.radius,ut.coral);return we.position.copy(ie.position),m.add(we),{data:O,model:ie,rim:we}});for(let O of a){let ie=new Qt;ie.name=`underwater-${O.id}`;let we=Mt(new Hn(O.radius,O.radius*1.1,2,16),yt("underwater-sand",10798765),O.entry.x,-9.5,O.entry.z,"shallow-seabed");ie.add(we);let _t=new Qt;_t.name="dive-garden",ie.add(_t);for(let k=0;k<14;k++){let V=k*2.4,F=8+k%4*4,ue=Go(O.id==="ruin-dive"?k%3?"glass-coral":"star-tablet":k%2?"fan-coral":"seagrass");ue.scale.setScalar(.45+k%3*.2),ue.position.set(O.entry.x+Math.sin(V)*F,-8.6,O.entry.z+Math.cos(V)*F),ue.updateMatrixWorld(!0),ue.traverse(be=>{if(!be.isMesh)return;let Pe=new Ct(be.geometry,be.material);Pe.applyMatrix4(be.matrixWorld),_t.add(Pe)})}Wn(_t);let Jt=Wn(Go(O.discoveryId));Jt.position.set(O.target.x,-6.8,O.target.z),Jt.scale.setScalar(1.35),ie.add(Jt),D.push({id:O.discoveryId,model:Jt,ring:null,baseY:-6.8,animal:O.discoveryId!=="tide-clock",underwater:!0});let _n=Mt(new To(1.2),yt(`lighthouse-part-${O.partId}`,ut.brass,.28,{metalness:.45,emissive:16764007,emissiveIntensity:.3}),O.target.x+2,-6.1,O.target.z,"recoverable-lighthouse-part");ie.add(_n);let it=Ni(4,ut.brass);it.position.set(O.target.x,-8.4,O.target.z),ie.add(it);let Zn=[],Dt=new gi(1,0),Kt=yt("oxygen-bubble",14221298,.2,{transparent:!0,opacity:.6}),ke=new ds(Dt,Kt,O.bubbles.length*8);ke.instanceMatrix.setUsage(bh),ke.frustumCulled=!1,ie.add(ke);for(let k of O.bubbles){let V=Mt(new gi(.9,0),yt("oxygen-spring",12188656,.2,{emissive:7527621,emissiveIntensity:.6}),k.x,-8.1,k.z,"oxygen-spring");ie.add(V);for(let F=0;F<8;F++)Zn.push({x:k.x,z:k.z,phase:F*.8,scale:.16+F%3*.07})}let x=Ni(4,8974041);x.position.set(O.entry.x,-8.1,O.entry.z),ie.add(x);let N=Mt(new Hn(.045,.045,8,5),yt("dive-return-rope",ut.cream),O.entry.x,-3.3,O.entry.z,"return-to-vessel-rope");ie.add(N),m.add(ie),M.push({site:O,group:ie,part:_n,partRing:it,bubbles:Zn,bubbleMesh:ke,treasure:Jt})}let st=new Qt;st.name="player-buoyant-vessel",m.add(st);let ct=["steady","swift","cargo"].map(O=>{let ie=Uf(O);return f(ie.getObjectByName("sail-rig")),f(ie),ie.visible=O==="steady",st.add(ie),ie}),K=tc();K.scale.setScalar(.83),K.position.set(-.9,1.1,3.5),st.add(K);let se=new Rr(K);se.clipAction(K.animations[0]).play();let Ce=tc();Ce.scale.setScalar(1.2),m.add(Ce);let ze=new Rr(Ce);ze.clipAction(Ce.animations[1]).play(),Ce.visible=!1;let Ne=[];for(let O=0;O<10;O++){let ie=Ni(1.6+O*.18,12774103);ie.material.transparent=!0,ie.material.opacity=.3,m.add(ie),Ne.push(ie)}let et=[];for(let O=0;O<4;O++){let ie=Go("tern");ie.scale.setScalar(.6),m.add(ie),et.push(ie)}let tt=new Qt;tt.name="harbor-story-celebration";let I=t.find(O=>O.id==="harbor");tt.position.set(I?.x||0,0,I?.z||190),tt.visible=!1,m.add(tt);let oe=[yt("festival-coral",ut.coral),yt("festival-linen",ut.cream),yt("festival-brass",ut.brass)],te=[];for(let O of[-1,1]){let ie=O*12;tt.add(Mt(new Hn(.16,.21,10,6),yt("festival-timber",ut.wood),ie,10.5,-14,"festival-mast"));let we=Mt(new gi(.65,1),yt("warm-welcome-lantern",16768916,.3,{emissive:16763230,emissiveIntensity:1.2}),ie,16.2,-14,"welcome-lantern");tt.add(we),te.push(we)}let Q=new br(.8,1.65,3);Q.scale(1,1,.22);let j=[];for(let O=0;O<13;O++){let ie=-12+O*2,we=14.4+Math.pow(ie/12,2)*1.1;if(j.push(new R(ie,we,-14)),O>0&&O<12){let _t=Mt(Q,oe[O%3],ie,we-.7,-14,"welcome-pennant");_t.rotation.z=Math.PI,tt.add(_t)}}let _e=Mt(new Ao(new ms(j),24,.045,4,!1),yt("festival-cord",ut.cream),0,0,0,"festival-bunting-cord");tt.add(_e);let le=new Qt;le.name="one-shot-return-confetti",tt.add(le);let ve=new ii(.24,.06,.42),qe=[];for(let O=0;O<30;O++){let ie=Mt(ve,oe[O%3],0,0,0,"volumetric-confetti");ie.castShadow=!1,le.add(ie),qe.push({mesh:ie,phase:O/30*Zh,x:(O%10-4.5)*1.6,z:-18-Math.floor(O/10)*2,delay:O%5*.14})}Wn(tt);let We=!1,w=0,_=d?.85:1,B=0,W=0,ne={update:{total:0,max:0,count:0},render:{total:0,max:0,count:0}},Y="follow",Le=0,ce="high",Ue=!1,Fe=0,he=0,Ee=null,He=!1,Be=!1,Me=new Ht,Ye=new R,U=!1,fe=1280,pe=720,xe=new R,ae=new R,ee=new R(0,0,157),Oe=new R;function Xe(){if(Ue)return;let O=i.getBoundingClientRect(),ie=Math.max(1,O.width||i.clientWidth||1280),we=Math.max(1,O.height||i.clientHeight||720);fe=ie,pe=we,c.setSize(ie,we,!1),c.setPixelRatio(Math.min(globalThis.devicePixelRatio||1,ce==="low"?1:1.5)*_),v.aspect=ie/we,v.updateProjectionMatrix()}let xt=new Map,ht=new Map;m.traverse(O=>{if(O.isMesh&&O.material?.isMeshStandardMaterial){let ie=O.material;if(ht.set(O,ie),!xt.has(ie)){let we=new Ro({name:ie.name,color:ie.color,emissive:ie.emissive,emissiveIntensity:ie.emissiveIntensity,transparent:ie.transparent,opacity:ie.opacity,side:ie.side,depthWrite:ie.depthWrite,vertexColors:ie.vertexColors});xt.set(ie,we)}}});function Yn(O){if(ce!==O){ce=O,T.material=ce==="low"?b:E,c.toneMapping=ce==="low"?si:No;for(let[ie,we]of ht)ie.material=ce==="low"?xt.get(we):we;E.uniforms.uEconomy.value=ce==="low"?1:0,c.shadowMap.enabled=ce==="high",y=ce==="high"?64:32,T.geometry.dispose(),T.geometry=new Ki(1500,1500,y,y),Z.forEach(ie=>ie.castShadow=ce==="high"),Xe()}}function Dn(O,ie=0,we={}){if(Ue)return;let _t=performance.now();Ee=O,ie>.036?(B++,W=0):ie>0&&ie<.024&&(W++,B=Math.max(0,B-1)),B>45&&_>.6?(_=Math.max(.6,_-.15),B=0,Xe()):W>600&&_<1&&(_=Math.min(1,_+.1),W=0,Xe());let _n=!!we.paused?0:Math.min(ie,.1);Fe+=_n,he++,Yn(we.quality==="auto"?d?"low":"high":we.quality||"high");let it=Number(O.time)||0,Zn=dn(it),Dt=Zn.height*1.7;U=!!we.reducedMotion;let Kt=we.reducedMotion?.18:1,ke=O.mode==="diving";E.uniforms.uTime.value=it,E.uniforms.uTide.value=Dt,E.uniforms.uMotion.value=Kt,E.uniforms.uDive.value=ke?1:0;let x=O.boat||{x:0,z:157,heading:0,speed:0,sail:0},N=(H,me)=>Math.sin(H*.075+it*.9)*.34+Math.sin(me*.11-it*.65)*.22+Math.sin((H+me)*.041+it*.55)*.18;st.position.set(x.x,Dt+.14+N(x.x,x.z)*Kt,x.z),st.rotation.set((N(x.x,x.z-3)-N(x.x,x.z+3))*.075*Kt,-(x.heading||0),(N(x.x-2,x.z)-N(x.x+2,x.z))*.11*Kt,"YXZ");let k=O.rigId||x.rig||"steady";ct.forEach(H=>{H.visible=H.userData.rig===k;let me=H.getObjectByName("sail-rig"),Se=typeof x.sail=="number"?x.sail:1;me.scale.y=.15+Math.max(0,Math.min(1,Se))*.85,me.rotation.y=Math.sin(it*.6)*.025*Kt}),ke||se.update(_n),S.forEach(H=>{let me=t.find(Se=>Se.id===H.islandId);!ke&&Math.hypot(x.x-me.x,x.z-me.z)<150&&!we.reducedMotion&&H.mixer.update(_n)}),ke&&ze.update(_n);let V=!!O.storyComplete&&O.currentIsland==="harbor";tt.visible=!!O.storyComplete&&!ke,O.storyComplete?V&&!We&&(We=!0,w=0):(We=!1,w=0),We&&(w=Math.min(6,w+_n)),le.visible=V&&We&&w<5&&!we.reducedMotion;for(let H of qe){let me=Math.max(0,w-H.delay);H.mesh.visible=me>0&&me<4.3,H.mesh.position.set(H.x+Math.sin(me*1.6+H.phase)*1.5,8+me*5-me*me*1.4,H.z+me*.6),H.mesh.rotation.set(me*2+H.phase,me*1.4,me*2.6)}te.forEach((H,me)=>{H.material.emissiveIntensity=we.reducedMotion?1.2:1.2+Math.sin(Fe*1.2+me)*.12});let F=ui(O);ge.visible=Te.visible=!!F&&!ke&&O.mode==="sailing",F&&(ge.position.set(F.target.x,Dt+.18,F.target.z),Te.position.set(F.target.x,Dt+2.2,F.target.z),Te.rotation.z=Math.PI);for(let H of q){let me=Math.hypot(x.x-H.data.x,x.z-H.data.z),Se=O.voyage?.harvested?.includes(`observation:${H.data.id}`);H.model.position.set(H.data.x,Dt+N(H.data.x,H.data.z)*Kt,H.data.z),H.model.rotation.z=Math.sin(it*.9+H.data.x)*.045*Kt,H.model.visible=!ke&&me<180,H.ring.position.set(H.data.x,Dt+.12,H.data.z),H.ring.visible=!ke&&!Se&&me<55}let ue=Wf(O.discoveries);for(let H of D)H.ring&&(H.ring.material.color.setHex(ue.has(H.id)?8702371:ut.brass),H.ring.visible=!0),H.animal&&(H.model.position.y=H.baseY+Math.sin(it*1.7+H.baseY)*.25*Kt,H.model.rotation.y=Math.sin(it*.3)*.25);for(let H of De){let me=Zn.height<=H.data.safeHeight;H.ring.position.y=Dt+.15;let Se=!ke&&Math.hypot(x.x-H.data.x,x.z-H.data.z)<200;H.ring.visible=me&&Se,H.model.visible=Se}for(let H of Ze){let me=ki(H.data.x,H.data.z,it,O.seed||1),Se=Math.atan2(-me.x,-me.z);H.arrows.forEach((pt,lt)=>{pt.visible=!ke&&Math.hypot(x.x-pt.position.x,x.z-pt.position.z)<140,pt.position.y=Dt+.18+Math.sin(it+lt)*.025,pt.rotation.y=Number.isFinite(Se)?Se:0})}for(let H of at){let me=Math.sin(it/240*Zh+H.data.phase)>.25;H.model.position.y=Dt+.19,H.model.rotation.y=we.reducedMotion?0:it*(me?.55:.12),H.model.scale.setScalar(me?1:.75),H.rim.position.y=Dt+.13,H.rim.material.color.setHex(me?ut.coral:ut.brass),H.rim.visible=H.model.visible=!ke&&Math.hypot(x.x-H.data.x,x.z-H.data.z)<180}let be=Wf(O.parts);for(let H of M)H.group.visible=ke&&O.activeDive===H.site.id,H.part.visible=!be.has(H.site.partId),H.part.position.y=-6.1+Math.sin(it*1.3)*.18*Kt,H.part.rotation.y=it*.6,H.group.visible&&(H.bubbles.forEach((me,Se)=>{Me.position.set(me.x+Math.sin(it+Se)*.3,-8+(it*.8+me.phase)%8,me.z+Math.cos(it+Se)*.3),Me.scale.setScalar(me.scale),Me.updateMatrix(),H.bubbleMesh.setMatrixAt(Se,Me.matrix)}),H.bubbleMesh.instanceMatrix.needsUpdate=!0);if(Ce.visible=ke,ke){let H=O.diver||x;Ce.position.set(H.x,-5.9+Math.sin(it*2)*.12*Kt,H.z),Ce.rotation.set(-Math.PI*.34,-(H.heading||0),0,"YXZ")}if(G&&!!O.lighthouseFixed!==He){He=!!O.lighthouseFixed;let H=G.getObjectByName("keeper-lens");H.material.color.setHex(He?16768928:8773329),H.material.emissive.setHex(He?16762971:0),H.material.emissiveIntensity=He?2:0,$.intensity=He?50:0,X.userData.rotor.visible=He}X&&(X.userData.rotor.rotation.y=we.reducedMotion?0:it*.16);let Pe=Math.abs(x.speed||0);Ne.forEach((H,me)=>{H.visible=!ke&&Pe>1;let Se=6+me*1.25+it*3%1.25;H.position.set(x.x-Math.sin(x.heading||0)*Se,Dt+.12,x.z+Math.cos(x.heading||0)*Se),H.scale.set(1+me*.12,.6+me*.08,1),H.material.opacity=(1-me/10)*.25*Math.min(Pe/6,1)}),et.forEach((H,me)=>{let Se=it*.04+me*Zh/4;H.position.set(119+Math.sin(Se)*40,24+me*3,57+Math.cos(Se)*30),H.rotation.y=-Se,H.rotation.z=Math.sin(it*2+me)*.06*Kt,H.visible=!ke&&ce==="high"}),xe.set(ke?O.diver?.x??x.x:x.x,ke?-5.4:Dt+1,ke?O.diver?.z??x.z:x.z);let Ie=-(x.heading||0)+Le,Ge=!1;if(ke){let H=a.find(me=>me.id===O.activeDive);xe.set((H.entry.x+H.target.x)/2,-7,(H.entry.z+H.target.z)/2),xe.lerp(Oe.set(O.diver.x,-7,O.diver.z),.2),ae.set(xe.x+20,xe.y+34,xe.z+26),v.fov=50,m.fog.color.setHex(3768202),m.fog.near=38,m.fog.far=120,m.background.setHex(3768202),T.visible=!1}else{T.visible=!0,v.fov=43,m.fog.color.setHex(11653834),m.fog.near=230,m.fog.far=620,m.background.setHex(11653834);let H=Y==="overhead",me=t.find(sn=>sn.id==="lighthouse");Ge=!!me&&Math.hypot(x.x-me.x,x.z-me.z)<78;let Se=H||Ge,pt=Se?42:66,lt=Se?108:61;ae.set(xe.x+Math.sin(Ie)*pt,xe.y+lt,xe.z+Math.cos(Ie)*pt)}if(["island","harbor","result"].includes(O.mode)){let H=t.find(me=>me.id===O.currentIsland)||t[0];xe.set(H.x*.72+H.dock.x*.28,H.id==="lighthouse"?12:3,H.z*.72+H.dock.z*.28),ae.set(xe.x+20,xe.y+(H.id==="lighthouse"?105:85),xe.z+85),v.setViewOffset(fe,pe,Math.min(210,fe*.16),0,fe,pe)}else v.clearViewOffset();if((Be!==ke||Ge&&he===1)&&(v.position.copy(ae),ee.copy(xe),Be=ke),!ke)for(let H of t)Math.hypot(ae.x-H.x,ae.z-H.z)<H.radius+8&&(ae.y=Math.max(ae.y,H.id==="lighthouse"?80:60));let Ve=we.reducedMotion?1:1-Math.exp(-Math.max(_n,.016)*4.2);v.position.lerp(ae,Ve),ee.lerp(xe,Ve),v.lookAt(ee),v.updateProjectionMatrix(),(he%4===0||he===1)&&(p.position.copy(xe).add(Oe.set(-100,180,-80)),p.target.position.copy(xe),p.target.updateMatrixWorld(),c.shadowMap.needsUpdate=!0),C.forEach(H=>{H.detail.visible=!ke&&Math.hypot(xe.x-H.data.x,xe.z-H.data.z)<(ce==="low"?230:420),H.land.visible=!ke,H.ring.position.y=Dt+.14,H.ring.visible=!ke}),Z.forEach(H=>H.visible=!ke),st.visible=!ke,ke?(g.intensity=2.8,p.intensity=1.8):(g.intensity=2.3,p.intensity=3);for(let H of A)H.object.visible=!ke&&Math.hypot(x.x-H.x,x.z-H.z)<180;X&&(X.userData.rotor.visible=He&&!ke);let nt=performance.now(),vt=nt-_t;ne.update.total+=vt,ne.update.count++,ne.update.max=Math.max(ne.update.max,vt),c.render(m,v);let Et=performance.now()-nt;ne.render.total+=Et,ne.render.count++,ne.render.max=Math.max(ne.render.max,Et)}function Ko(O){return Y=O==="overhead"||O==="overview"?"overhead":"follow",Le=0,Y}function yi(O){Le=Eh.clamp(Le+(Number(O)||0),-Math.PI*.8,Math.PI*.8)}function Ps(){return{renderer:"Three.js WebGLRenderer",cpu:Object.fromEntries(Object.entries(ne).map(([O,ie])=>[O,{average:ie.total/(ie.count||1),max:ie.max,count:ie.count}])),revision:"180",camera:Y,orbitOffset:Le,projections:Ee?.mode==="diving"?Object.fromEntries(["entry","target"].map(O=>{let ie=a.find(we=>we.id===Ee.activeDive);return[O,Ds(ie[O].x,-6.8,ie[O].z)]})):null,reducedMotion:U,motionScale:U?.18:1,cameraPosition:v.position.toArray(),cameraTarget:ee.toArray(),drawCalls:c.info.render.calls,triangles:c.info.render.triangles,geometries:c.info.memory.geometries,textures:c.info.memory.textures,frames:he,quality:ce,software:d,renderScale:_,waterVertices:T.geometry.attributes.position.count,rig:Ee?.rigId||"steady",sceneMeshes:m.children.length,actualSkeletons:S.length+2,transparentEffects:Ne.length+1,shadowMaps:c.shadowMap.enabled?1:0,celebration:{visible:tt.visible,confetti:le.visible,elapsed:w}}}function jo(){if(Ue)return;Ue=!0,se.stopAllAction(),ze.stopAllAction(),S.forEach(we=>we.mixer.stopAllAction());let O=new Set,ie=new Set;m.traverse(we=>{we.geometry&&O.add(we.geometry),we.material&&(Array.isArray(we.material)?we.material:[we.material]).forEach(_t=>ie.add(_t))}),O.forEach(we=>we.dispose());for(let we of ht.values())ie.add(we);for(let we of xt.values())ie.add(we);ie.add(E),ie.add(b),ie.forEach(we=>we.dispose()),c.dispose(),c.forceContextLoss()}function Ds(O,ie,we){return Ye.set(O,ie,we).project(v),{x:(Ye.x+1)*fe/2,y:(1-Ye.y)*pe/2,z:Ye.z}}return Xe(),{update:Dn,resize:Xe,dispose:jo,setCamera:Ko,orbit:yi,stats:Ps,project:Ds}}var nc=class{constructor(){this.ctx=null,this.buffers={},this.voices=new Set,this.loops=[],this.last=new Map,this.prefs={music:.35,sfx:.65},this.active=!1,this.ambient=!1,this.disposed=!1,this.resumePending=null}async unlock(){if(!this.disposed){if(!this.ctx){let e=window.AudioContext||window.webkitAudioContext;if(!e)throw new Error("Web Audio unavailable");this.ctx=new e,this.master=this.ctx.createGain(),this.master.gain.value=.75,this.master.connect(this.ctx.destination),this.music=this.ctx.createGain(),this.effects=this.ctx.createGain(),this.music.connect(this.master),this.effects.connect(this.master),this.ctx.onstatechange=()=>{this.active&&this.ctx.state==="suspended"&&this.resume()}}this.pending||(this.pending=Promise.all(["waves","music","sail","dock","discovery","danger","gull"].map(async e=>{if(this.buffers[e])return;let t=await fetch(new URL(`./assets/audio/${e}.wav`,location.href));if(!t.ok)throw new Error("\u97F3\u8A0A\u8F09\u5165\u5931\u6557");let n=await this.ctx.decodeAudioData(await t.arrayBuffer());this.disposed||(this.buffers[e]=n)})).catch(e=>{throw this.pending=null,e})),await this.ctx.resume(),await this.pending,!this.disposed&&(this.setPrefs(this.prefs),this.setActive(this.active,this.ambient))}}resume(){!this.ctx||this.ctx.state==="closed"||this.ctx.state==="running"||this.resumePending||(this.resumePending=this.ctx.resume().catch(()=>{}).finally(()=>{this.resumePending=null}))}setPrefs(e){this.prefs={music:Math.max(0,Math.min(1,Number(e.music)||0)),sfx:Math.max(0,Math.min(1,Number(e.sfx)||0))},this.ctx&&(this.music.gain.setTargetAtTime(this.prefs.music*.32,this.ctx.currentTime,.03),this.effects.gain.setTargetAtTime(this.prefs.sfx*.42,this.ctx.currentTime,.03))}setActive(e,t=e){if(this.active=e,this.ambient=t,!(!this.ctx||this.disposed)){e&&this.resume();for(let n of["waves","music"]){let r=e&&(n==="music"||t)&&this.buffers[n],s=this.loops.find(o=>o.sound===n);if(r&&!s){let o=this.ctx.createBufferSource();o.sound=n,o.buffer=this.buffers[n],o.loop=!0,o.connect(n==="music"?this.music:this.effects),o.start(),this.loops.push(o)}if(!r&&s){try{s.stop()}catch{}s.disconnect(),this.loops=this.loops.filter(o=>o!==s)}}if(!e){for(let n of this.voices){try{n.stop()}catch{}n.disconnect()}this.voices.clear()}}}play(e){if(!this.ctx||!this.active||!this.buffers[e]||this.voices.size>=8||this.disposed)return;this.resume();let t=this.ctx.currentTime;if(t-(this.last.get(e)??-10)<.15)return;this.last.set(e,t);let n=this.ctx.createBufferSource();n.buffer=this.buffers[e],n.connect(this.effects),this.voices.add(n),n.onended=()=>{this.voices.delete(n),n.disconnect()},n.start()}dispose(){this.setActive(!1),this.disposed=!0,this.ctx&&(this.ctx.onstatechange=null),this.music?.disconnect(),this.effects?.disconnect(),this.master?.disconnect(),this.ctx?.close().catch(()=>{})}stats(){return{context:this.ctx?.state??"locked",loops:this.loops.length,voices:this.voices.size,loaded:Object.keys(this.buffers).length,music:this.prefs.music,sfx:this.prefs.sfx}}};function Kf(){return!Pt&&!zt&&Bt==="running"&&["sailing","diving"].includes(L.mode)}function Fr(){On.input(performance.now(),Kf(),L.mode)}var Kh="tidebound-r2-20261110",jf="stteak.tidebound.save.v1",Qf="stteak.tidebound.preferences.v1",J=i=>document.querySelector(i),Or=i=>kt.find(e=>e.id===i),hn=i=>String(i??"").replace(/[&<>"']/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[e]),li=new nc,Lt={music:.35,sfx:.65,reducedMotion:matchMedia("(prefers-reduced-motion: reduce)").matches,quality:"auto",camera:matchMedia("(pointer:coarse)").matches?"follow":"overhead"},L=Os(1),Is=!0,Cs="";try{let i=localStorage.getItem(jf);if(i){let e=Mu(i);L=e.state,Cs=e.message}}catch{Cs="\u4FDD\u5B58\u8CC7\u6599\u7121\u6CD5\u8B80\u53D6\uFF0C\u5DF2\u5B89\u5168\u5EFA\u7ACB\u65B0\u822A\u6D77\u65E5\u8A8C\u3002",Is=!1}try{let i=localStorage.getItem(Qf),e={};try{e=JSON.parse(i||"{}")}catch{}(!e||typeof e!="object"||Array.isArray(e))&&(e={});for(let t of["music","sfx"])Number.isFinite(e[t])&&(Lt[t]=Math.max(0,Math.min(1,e[t])));typeof e.reducedMotion=="boolean"&&(Lt.reducedMotion=e.reducedMotion),["auto","low","high"].includes(e.quality)&&(Lt.quality=e.quality),["overhead","follow"].includes(e.camera)&&(Lt.camera=e.camera)}catch{Is=!1}var $n,Bt="ready",oc=window.parent===window,Pt=!1,zt=null,jh="",ep=0,Yf=0,Zf=0,Qh=0,tr=L.contractId||Nt[0].id,ic=L.rigId||hi[0].id,sc=L.seed||1,qo=!1,tp=!1,eu=null,Rn=new Set,ac=new Map,Wo=[],Cn={x:0,y:0},nr=null,Fi=null,Rs=new Map,qn=null,Yo=null,tu=null,lc=new URLSearchParams(location.search).get("session");function cc(i,e={}){lc&&window.parent!==window&&window.parent.postMessage({protocol:"stteak-game",version:1,sessionId:lc,type:i,payload:e},location.origin)}function rr(){On.reset(),Rn.clear();let i=Fi;if(Fi=null,i){let r=J("#sea");try{r.hasPointerCapture(i.id)&&r.releasePointerCapture(i.id)}catch{}}let e=[...Rs];Rs.clear(),ac.clear();for(let[r,s]of e)try{s.hasPointerCapture(r)&&s.releasePointerCapture(r)}catch{}Cn={x:0,y:0};let t=nr;nr=null;let n=J("#helm");if(J("#helm-knob")?.style.setProperty("transform","translate(0px,0px)"),n?.setAttribute("aria-valuenow","0"),t!==null)try{n?.hasPointerCapture?.(t)&&n.releasePointerCapture(t)}catch{}}function Pn(i,e=4500){i&&(J("#toast").textContent=i,J("#toast").classList.add("visible"),ep=performance.now()+e)}function ou(){Is=!1,J("#storage-warning").hidden=!1,J("#storage-warning").textContent="\u672C\u6A5F\u5132\u5B58\u4E0D\u53EF\u7528\uFF1A\u6B64\u822A\u7A0B\u4ECD\u53EF\u73A9\uFF0C\u95DC\u9589\u9801\u9762\u5F8C\u9032\u5EA6\u53EF\u80FD\u6D88\u5931\u3002"}function In(){try{return localStorage.setItem(jf,Sc(L)),Is=!0,J("#storage-warning").hidden=!0,!0}catch{return ou(),!1}}function Xo(){try{localStorage.setItem(Qf,JSON.stringify(Lt))}catch{ou()}li.setPrefs(Lt),document.body.classList.toggle("reduced",Lt.reducedMotion)}async function vi(){tp=!0;try{await li.unlock(),Jo()}catch{Pn("\u97F3\u8A0A\u5C1A\u672A\u8F09\u5165\uFF1B\u4ECD\u53EF\u4F7F\u7528\u756B\u9762\u63D0\u793A\u904A\u73A9\u3002")}}function Jo(){li.setPrefs(Lt),li.setActive(Bt==="running"&&!Pt&&!zt,["sailing","diving"].includes(L.mode))}function Zo(i){On.reset(),Bt=i,cc("game:state",{state:i})}function zr(){jh="",fc()}function au(i){for(let e of Array.isArray(i)?i:i?[i]:[])e.type==="depart"&&(dc=L.boat.sail,uc=-1/0),e.text&&Pn(e.text),/damage|collision|rescue|warning|oxygen/.test(e.type)?li.play("danger"):/discover|part|complete|lighthouse|ending|^observation$/.test(e.type)?li.play("discovery"):/dock|deliver|result/.test(e.type)?li.play("dock"):/depart|dive|surface/.test(e.type)&&li.play("sail"),/dock|deliver|rescue|discover|part|complete|lighthouse|observation/.test(e.type)&&In();Jo()}function ai(i){try{Bt==="ready"&&hc();let e=L.mode,t=i();L.mode!==e&&On.reset(),au(t),(L.mode!==e||["harbor","island","result"].includes(L.mode))&&In(),zr()}catch(e){Pn("\u9019\u500B\u52D5\u4F5C\u672A\u5B8C\u6210\uFF0C\u8ACB\u518D\u8A66\u4E00\u6B21\u3002"),console.error(e)}}function ir(i=!0){qo&&(Pt=i,rr(),i?(Zo("paused"),xn("pause"),In()):(Br(!1),Zo("running")),Jo(),zr())}function hc(){oc&&(dc=L.boat.sail,uc=-1/0,Zo("running"),Pt=!1,Br(!1),zr(),Cs&&(Pn(Cs,6500),Cs=""))}function np(){if(!qo)return;rr(),au(na(L,"restart")),L.mode="harbor",L.currentIsland="harbor",L.lastSafeIsland="harbor";let i=Or("harbor");L.boat.x=i.dock.x,L.boat.z=i.dock.z,L.boat.sail=0,L.boat.speed=0,L.boat.hull=100,L.result=null,In(),Pt=!1,Br(!1),Zo("running"),zr(),Pn("\u5DF2\u514D\u8CBB\u4FEE\u5FA9\u4E26\u8FD4\u56DE\u6BCD\u6E2F\u3002\u5716\u9451\u3001\u96F6\u4EF6\u8207\u4EA4\u4ED8\u7D00\u9304\u4FDD\u7559\u3002")}function Br(i=!0){zt=null,ip(!1),J("#modal").hidden=!0,J("#modal-content").innerHTML="",rr(),i&&Pt&&(Pt=!1,Zo("running")),eu?.isConnected?eu.focus():J("#pause-button").focus(),Jo()}function As(i,e="\u822A\u6D77\u624B\u518A"){return`<div class="modal-top"><div><span class="eyebrow">${e}</span><h2 id="modal-title">${i}</h2></div><button class="close" data-close aria-label="\u95DC\u9589">\xD7</button></div>`}function ip(i){for(let e of document.body.children)!["modal","toast","storage-warning","loading"].includes(e.id)&&e.tagName!=="SCRIPT"&&(e.inert=i)}function xn(i){zt||(eu=document.activeElement),ip(!0),zt=i,rr(),J("#modal").hidden=!1;let e=J("#modal-content");if(i==="map")e.innerHTML=As("\u4E03\u5CF6\u6D77\u5716","YOUR CHART \xB7 \u5317\u65B9\u5728\u4E0A")+'<div class="map-layout"><div class="map-wrap" id="map-wrap"><svg id="chart" viewBox="-290 -290 580 580" role="img" aria-label="\u4E03\u5CF6\u6D77\u5716\uFF0C\u6A59\u8272\u865B\u7DDA\u70BA\u9078\u5B9A\u822A\u7DDA"><defs><pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M40 0H0V40" fill="none" stroke="#a3c3b7" stroke-width=".6"/></pattern></defs><rect x="-500" y="-500" width="1000" height="1000" fill="url(#grid)"/><g id="map-world"></g></svg><div class="map-actions"><button data-zoom="1.2" aria-label="\u653E\u5927\u6D77\u5716">\uFF0B</button><button data-zoom="0.8" aria-label="\u7E2E\u5C0F\u6D77\u5716">\u2212</button><button id="map-reset">\u5FA9\u4F4D</button></div></div><div class="map-copy"><span class="eyebrow">\u822A\u524D\u8B80\u6D77</span><h3>\u9806\u6D41\uFF0C\u4E5F\u8981\u770B\u6F6E\u3002</h3><p id="map-forecast"></p><label class="field">\u672C\u8D9F\u822A\u7DDA<select id="route-choice"><option value="0">\u5B89\u5168\u5916\u6D77\u8DEF</option><option value="1">\u6F6E\u7A97\u6377\u5F91</option></select></label><p id="route-description"></p><div id="map-branch-options"></div><div id="map-mission"></div><ul><li>\u25B3 \u4F60\u7684\u8239\uFF0C\u671D\u5C16\u7AEF\u524D\u9032</li><li>\u25CB \u6E2F\u53E3\u5916\u5074\u53EF\u9760\u6CCA</li><li>\u25B0 \u7901\u77F3\uFF1A\u6F32\u6F6E\u53EF\u8D8A\u3001\u9000\u6F6E\u7E5E\u884C</li><li>\u219D \u6D77\u6D41\uFF1A\u7BAD\u982D\u70BA\u6D41\u5411</li><li>\u25CE \u65CB\u6D41\uFF1A\u53EF\u7531\u5916\u5074\u7E5E\u958B</li><li>\u25C7 \u6DFA\u6C34\u6F5B\u9EDE\uFF1A\u9760\u5CB8\u5F8C\u4E0B\u6F5B</li><li>\u25CF \u89C0\u6E2C\u6D6E\u6A19\uFF1A\u53EF\u7565\u904E\uFF1B\u53D6\u6A23\u4F54\u8CA8\u8259\uFF0C\u8FD4\u6E2F +3 \u5370\u8A18</li></ul><p class="note">\u958B\u555F\u6D77\u5716\u6642\u66AB\u505C\u6F6E\u6C50\u8207\u6C27\u6C23\u3002\u53EF\u55AE\u6307\u62D6\u66F3\u3001\u96D9\u6307\u7E2E\u653E\uFF0C\u6216\u4F7F\u7528 \uFF0B\uFF0F\u2212\u3002</p></div></div>',J("#route-choice").value=Qh,J("#route-choice").onchange=t=>{Qh=+t.target.value,nu()},Cv(),nu();else if(i==="journal")e.innerHTML=As("\u628A\u767C\u73FE\u756B\u9032\u6D77\u5716\u3002","FIELD JOURNAL")+`<p>\u5DF2\u767B\u9304 ${L.discoveries.length}/${yn.length} \xB7 \u71C8\u5854\u96F6\u4EF6 ${L.parts.length}/3 \xB7 \u59D4\u8A17 ${L.completed.length}/${Nt.length}\u3002${L.storyComplete?"\u71C8\u5854\u5DF2\u9EDE\u4EAE\uFF1B\u81EA\u7531\u822A\u7A0B\u958B\u653E\u3002":"\u628A\u4E09\u500B\u6DFA\u6C34\u9EDE\u7684\u96F6\u4EF6\u5E36\u5F80\u5317\u65B9\u71C8\u5854\uFF0C\u518D\u56DE\u6BCD\u6E2F\u3002"}</p><div class="journal-grid">${yn.map(t=>`<article class="journal-entry ${L.discoveries.includes(t.id)?"":"locked"}"><span class="eyebrow">${hn(t.kind)} \xB7 ${hn(Or(t.islandId)?.name)}</span><h3>${L.discoveries.includes(t.id)?hn(t.name):"\u5C1A\u672A\u8A18\u9304"}</h3><p>${L.discoveries.includes(t.id)?hn(t.description):"\u5728\u5C0D\u61C9\u5CF6\u5DBC\u8ABF\u67E5\u6216\u5B8C\u6210\u6DFA\u6C34\u63A2\u7D22\u3002"}</p></article>`).join("")}</div><div class="rule"></div><h3>\u81EA\u5DF1\u7684\u822A\u7A0B\u7D00\u9304</h3><p>${rp()}</p><button id="export-journal">\u532F\u51FA\u822A\u6D77\u8A8C JSON</button>`,J("#export-journal").onclick=()=>{let t=In();Rv("tidebound-journal.json",{buildId:Kh,state:JSON.parse(Sc(L)),savedLocally:t})};else if(i==="help")e.innerHTML=As("\u7B2C\u4E00\u6B21\u51FA\u6D77\u3002","HOW TO SAIL")+'<p>\u5148\u9078\u4E00\u4EFD\u59D4\u8A17\u8207\u5E06\u88DD\uFF0C\u5347\u5E06\u51FA\u6E2F\u3002\u6CBF\u6D77\u5716\u5230\u9054\u76EE\u6A19\u5CF6\u5916\u7684\u78BC\u982D\uFF0C\u6536\u5E06\u6E1B\u901F\uFF0C\u6309 E \u9760\u5CB8\u8207\u8ABF\u67E5\u3002\u5728\u540C\u4E00\u8D9F\u822A\u7A0B\u5B8C\u6210\u6E05\u55AE\u7684\u6BCF\u9805\u8ABF\u67E5\uFF0C\u518D\u56DE\u6BCD\u6E2F\u4EA4\u4ED8\uFF1B\u4E2D\u9014\u8FD4\u6BCD\u6E2F\u6703\u7D50\u675F\u672C\u8D9F\uFF0C\u4E0B\u8D9F\u9700\u91CD\u65B0\u8ABF\u67E5\uFF0C\u6C38\u4E45\u5716\u9451\u8207\u96F6\u4EF6\u4ECD\u4FDD\u7559\u3002\u7B2C\u4E00\u4EFD\u8981\u6BD4\u8F03\u73CA\u745A\u7063\u3001\u9752\u6839\u5CF6\u3001\u7409\u7483\u7901\u8207\u767D\u7FBD\u5CF6\uFF0C\u5169\u6B21\u6DFA\u6F5B\u540C\u6642\u53D6\u5F97\u71C8\u5854\u96F6\u4EF6\u3002</p><p>\u6D77\u4E0A\u91D1\u8272\u6D6E\u6A19\u662F\u53EF\u9078\u89C0\u6E2C\u3002\u53D6\u6A23\u9700\u8DDD\u96E2 9 \u516C\u5C3A\u5167\u3001\u901F\u5EA6\u4E0D\u8D85\u904E 1.4 m/s\uFF0C\u4F54 1 \u683C\u666E\u901A\u8CA8\u8259\uFF0C\u56DE\u6E2F\u53EF\u63DB 3 \u5370\u8A18\uFF1B\u4E5F\u53EF\u7E7C\u7E8C\u76F4\u822A\u6311\u6230\u6700\u5FEB\u7D00\u9304\u3002\u6D6E\u6A19\u4E0D\u6703\u649E\u50B7\u8239\u3002</p><table class="controls-table"><tr><td>A / D\u3001\u2190 / \u2192</td><td>\u8F49\u8235\uFF0C\u8239\u9996\u6C7A\u5B9A\u524D\u9032\u65B9\u5411</td></tr><tr><td>W / S\u3001\u2191 / \u2193</td><td>\u589E\u52A0 / \u6E1B\u5C11\u5E06\u529B\uFF1B\u4E0D\u662F\u524D\u9032 / \u5F8C\u9000</td></tr><tr><td>Space</td><td>\u5FEB\u901F\u6536\u5E06\uFF0C\u964D\u4F4E\u6163\u6027</td></tr><tr><td>E</td><td>\u9760\u5CB8 / \u8ABF\u67E5 / \u6F5B\u6C34\u53D6\u5F97\u7269\u4EF6</td></tr><tr><td>M / C / Esc</td><td>\u6D77\u5716 / \u93E1\u982D / \u66AB\u505C</td></tr><tr><td>\u6F5B\u6C34 WASD</td><td>\u5728\u6DFA\u6C34\u5340\u79FB\u52D5\uFF1B\u9760\u8FD1\u767C\u5149\u76EE\u6A19\u6309 E\uFF0C\u6D6E\u51FA\u9375\u96A8\u6642\u8FD4\u8239</td></tr></table><p>\u89F8\u63A7\u4F7F\u7528\u5DE6\u5074\u8F49\u8235\u9375\u53CA\u53F3\u5074\u5E06\u529B\u4E09\u6A94\uFF1B\u6F5B\u6C34\u6703\u589E\u52A0\u4E0A\u4E0B\u9375\u3002\u62D6\u66F3\u6D77\u9762\u53F3\u534A\u90E8\u6216\u6ED1\u9F20\u53F3\u9375\u62D6\u66F3\u53EF\u7E5E\u8239\u770B\u666F\u3002</p><p>\u25B0 \u9000\u6F6E\u9732\u7901\uFF0C\u9806\u6D41\u52A0\u901F\uFF0C\u25CE \u65CB\u6D41\u6709\u9031\u671F\u3002\u6E2F\u53E3\u300C\u7B49\u4E0B\u4E00\u6F6E\u300D\u53EF\u76F4\u63A5\u63A8\u9032\u6642\u9593\u3002\u6240\u6709\u5371\u96AA\u90FD\u6709\u5916\u6D77\u5B89\u5168\u8DEF\u3002\u8239\u9AD4\u4F4E\u65BC 25% \u6642\u8ACB\u8FD4\u6700\u8FD1\u6E2F\uFF1B\u8239\u6C89\u6216\u6C27\u6C23\u8017\u76E1\u6703\u6551\u63F4\uFF0C\u666E\u901A\u8CA8\u7269\u6E1B\u534A\uFF0C\u4E3B\u7DDA\u96F6\u4EF6\u8207\u5716\u9451\u4FDD\u7559\u3002</p><p>\u96E2\u7DDA\u4E0D\u6263\u8CC7\u6E90\u3002\u6BCF 15 \u79D2\u3001\u66AB\u505C\u3001\u9760\u6E2F\u8207\u767C\u73FE\u5F8C\u81EA\u52D5\u4FDD\u5B58\uFF1B\u91CD\u8F09\u5F8C\u6309\u300C\u7E7C\u7E8C\u822A\u7A0B\u300D\u6062\u5FA9\u8239\u4F4D\u8207\u6C27\u6C23\u3002\u57FA\u790E\u4FEE\u5FA9\u514D\u8CBB\u3002</p><button class="primary" data-close>\u660E\u767D\u4E86\uFF0C\u53BB\u770B\u6D77</button>';else if(i==="restart")e.innerHTML=As("\u7D50\u675F\u9019\u8D9F\u822A\u7A0B\uFF1F","RETURN TO HARBOR")+'<p>\u8FD4\u56DE\u6BCD\u6E2F\u4E26\u514D\u8CBB\u4FEE\u8239\u3002\u672A\u4EA4\u4ED8\u666E\u901A\u8CA8\u7269\u6E1B\u534A\uFF0C\u4E3B\u7DDA\u96F6\u4EF6\u3001\u5716\u9451\u548C\u5B8C\u6210\u7D00\u9304\u4FDD\u7559\u3002</p><div class="actions"><button data-close>\u7E7C\u7E8C\u822A\u884C</button><button id="confirm-restart" class="primary">\u78BA\u8A8D\u8FD4\u6E2F</button></div>',J("#confirm-restart").onclick=np;else if(i==="reset")e.innerHTML=As("\u6E05\u9664\u6574\u672C\u822A\u6D77\u8A8C\uFF1F","ERASE LOCAL PROGRESS")+'<p>\u6B64\u64CD\u4F5C\u6703\u6E05\u9664\u672C\u6A5F\u7684\u96F6\u4EF6\u3001\u5716\u9451\u3001\u59D4\u8A17\u8207\u6700\u4F73\u7D00\u9304\u3002\u53EF\u5148\u5F9E\u822A\u6D77\u8A8C\u532F\u51FA\u5099\u4EFD\u3002</p><div class="actions"><button data-close>\u4FDD\u7559\u9032\u5EA6</button><button id="confirm-reset">\u6E05\u9664\u4E26\u91CD\u65B0\u958B\u59CB</button></div>',J("#confirm-reset").onclick=()=>{L=Os(1),In(),Br(),zr(),Pn("\u5DF2\u5EFA\u7ACB\u5168\u65B0\u822A\u6D77\u8A8C\u3002")};else{e.innerHTML=As(Pt?"\u628A\u6642\u9593\u7559\u7D66\u6D77\u3002":"\u8072\u97F3\u8207\u756B\u9762","PAUSED \xB7 \u5DF2\u66AB\u505C")+`<p>\u6F6E\u6C50\u3001\u8239\u9AD4\u8207\u6C27\u6C23\u5747\u5DF2\u505C\u6B62\u3002\u95DC\u9589\u6B64\u8996\u7A97\u5373\u53EF\u7E7C\u7E8C\u3002</p><div class="settings-grid"><label>\u97F3\u6A02 <input id="music" type="range" min="0" max="1" step="0.05" value="${Lt.music}"></label><label>\u97F3\u6548 <input id="sfx" type="range" min="0" max="1" step="0.05" value="${Lt.sfx}"></label><label><input id="reduced" type="checkbox" ${Lt.reducedMotion?"checked":""}> \u6E1B\u5C11\u6D6A\u9AD8\u8207\u93E1\u982D\u52D5\u614B</label><label>\u756B\u8CEA <select id="quality"><option value="auto">\u81EA\u52D5 \xB7 \u9069\u5408\u6B64\u88DD\u7F6E</option><option value="high">\u6A19\u6E96 \xB7 \u9670\u5F71</option><option value="low">\u7BC0\u80FD \xB7 \u4F4E DPR</option></select></label></div><div class="actions"><button class="primary" data-close>\u7E7C\u7E8C</button><button id="show-help">\u64CD\u4F5C\u8AAA\u660E</button><button id="save-voyage">\u5132\u5B58\u822A\u7A0B</button><button id="restart-button">\u91CD\u65B0\u6E96\u5099\u51FA\u6D77</button></div><div class="rule"></div><p class="note">${Kh} \xB7 \u4FDD\u5B58 schema 1 \xB7 \u9032\u5EA6\u53EA\u5B58\u6B64\u700F\u89BD\u5668\uFF0C\u7121\u96F2\u7AEF\u540C\u6B65\u3002</p><button id="reset-button">\u6E05\u9664\u672C\u6A5F\u9032\u5EA6\u2026</button>`,J("#quality").value=Lt.quality;for(let t of["music","sfx"])J("#"+t).oninput=n=>{Lt[t]=+n.target.value,Xo()};J("#reduced").onchange=t=>{Lt.reducedMotion=t.target.checked,Xo()},J("#quality").onchange=t=>{Lt.quality=t.target.value,Xo()},J("#save-voyage").onclick=()=>Pn(In()?"\u822A\u7A0B\u5DF2\u5132\u5B58\u3002\u4E0B\u6B21\u53EF\u5F9E\u6B64\u523B\u7E7C\u7E8C\u3002":"\u822A\u7A0B\u672A\u80FD\u5132\u5B58\u3002\u8ACB\u4FDD\u7559\u6B64\u9801\uFF0C\u6216\u5148\u532F\u51FA\u822A\u6D77\u8A8C\u5099\u4EFD\u3002",6500),J("#show-help").onclick=()=>xn("help"),J("#restart-button").onclick=()=>xn("restart"),J("#reset-button").onclick=()=>xn("reset")}e.querySelectorAll("[data-close]").forEach(t=>t.onclick=()=>Br()),e.querySelector("button")?.focus(),Jo()}function rp(){let i=L.records||{},e=L.contractId,t=i.byContract?.[e],n=Nt.find(s=>s.id===e)?.name||"\u672C\u59D4\u8A17",r=Number.isFinite(t?.bestTime)?`${Math.floor(Math.round(t.bestTime)/60)} \u5206 ${Math.round(t.bestTime)%60} \u79D2`:"\u5C1A\u7121";return`${n}\uFF1A\u5B8C\u6574\u822A\u7A0B\u6700\u4F73 ${r} \xB7 \u6700\u5C11\u640D\u50B7 ${Number.isFinite(t?.bestDamage)?Math.round(t.bestDamage)+"%":"\u5C1A\u7121"}\u3002\u50C5\u6BD4\u8F03\u672C\u59D4\u8A17\u5B8C\u6210\u4E14\u7121\u6551\u63F4\u7684\u822A\u7A0B\uFF1B\u4E0D\u540C\u5E06\u88DD\u53EF\u6311\u6230\u3002\u6B77\u4F86\u8FD4\u822A ${i.voyages||0} \u6B21 \xB7 \u6551\u63F4 ${i.rescues||0} \u6B21\u3002\u822A\u6D77\u5370\u8A18 ${L.credits||0} \u679A\uFF08\u50C5\u4F9B\u6536\u85CF\uFF0C\u5E06\u88DD\u8207\u4FEE\u5FA9\u514D\u8CBB\uFF09\u3002`}function Rv(i,e){let t=URL.createObjectURL(new Blob([JSON.stringify(e,null,2)],{type:"application/json"})),n=document.createElement("a");n.href=t,n.download=i,n.click(),setTimeout(()=>URL.revokeObjectURL(t),1e3)}var Wt={x:-290,z:-290,size:580};function Cv(){Wt={x:-290,z:-290,size:580};let i=J("#chart"),e=J("#map-wrap"),t=new Map,n=0,r=s=>{let o=Wt.size;Wt.size=Math.max(180,Math.min(800,o/s)),Wt.x+=(o-Wt.size)/2,Wt.z+=(o-Wt.size)/2,i.setAttribute("viewBox",`${Wt.x} ${Wt.z} ${Wt.size} ${Wt.size}`)};e.onpointerdown=s=>{s.target.closest("button")||(t.set(s.pointerId,{x:s.clientX,y:s.clientY}),e.setPointerCapture(s.pointerId))},e.onpointermove=s=>{let o=t.get(s.pointerId);if(!o)return;let a=s.clientX-o.x,l=s.clientY-o.y;if(t.set(s.pointerId,{x:s.clientX,y:s.clientY}),t.size===1){let c=Wt.size/e.clientWidth;Wt.x-=a*c,Wt.z-=l*c,i.setAttribute("viewBox",`${Wt.x} ${Wt.z} ${Wt.size} ${Wt.size}`)}else{let[c,h]=[...t.values()],u=Math.hypot(c.x-h.x,c.y-h.y);n&&r(u/n),n=u}},e.onpointerup=e.onpointercancel=s=>{t.delete(s.pointerId),n=0},e.querySelectorAll("[data-zoom]").forEach(s=>s.onclick=()=>r(+s.dataset.zoom)),J("#map-reset").onclick=()=>{Wt={x:-290,z:-290,size:580},r(1)}}function nu(){if(zt!=="map")return;let i=["harbor","result"].includes(L.mode),e=Nt.find(a=>a.id===(i?tr:L.contractId)),t=e?.routes?.[Qh],n=dn(L.time),r="";for(let a of Oi)r+=`<ellipse cx="${a.x}" cy="${a.z}" rx="${a.radius||a.r||15}" ry="${a.radius||a.r||15}" fill="#e6c997" opacity=".6"/><text x="${a.x-5}" y="${a.z+4}" style="font-size:14px">\u25B0</text>`;for(let a of or)r+=`<text x="${a.x-6}" y="${a.z+5}" style="font-size:20px">\u25CE</text>`;for(let a of Fs){let l=ki(a.x,a.z,L.time,i?sc:L.seed),c=Math.atan2(l.z,l.x)*180/Math.PI;r+=`<text x="0" y="5" text-anchor="middle" transform="translate(${a.x},${a.z}) rotate(${c})" style="font-size:19px">${l.strength>.02?"\u219D":"\xB7"}</text>`}if(t?.waypoints&&(r+=`<polyline class="route" points="${t.waypoints.map(a=>`${a.x},${a.z}`).join(" ")}"/>`),!i&&t?.legs){let a=zi(L).nextObjective,l=t.legs.find(c=>c.toIslandId===(a?.islandId||"harbor"));l&&(r+=`<polyline class="active-leg" points="${l.waypoints.map(c=>`${c.x},${c.z}`).join(" ")}"/>`)}for(let a of kt)r+=`<circle cx="${a.x}" cy="${a.z}" r="${a.radius}" fill="${typeof a.color=="string"?a.color:"#8cae88"}" stroke="#ede4bc" stroke-width="6"/><circle cx="${a.dock.x}" cy="${a.dock.z}" r="4" fill="#fff9dc" stroke="#285d60"/><text x="${a.x}" y="${a.z-a.radius-9}" text-anchor="middle">${hn(a.name)}</text>`;for(let a of bn)r+=`<g class="map-survey" data-observation="${a.id}"><title>${hn(a.name)}</title><circle cx="${a.x}" cy="${a.z}" r="3" fill="#b58030"/></g>`;for(let a of Kn){let l=a.target||Or(a.islandId).dock;r+=`<text x="${l.x}" y="${l.z+4}" style="font-size:14px">\u25C7</text>`}r+=`<path id="map-boat" d="M0 -9L6 7L0 4L-6 7Z" transform="translate(${L.boat.x} ${L.boat.z}) rotate(${L.boat.heading*180/Math.PI})"/>`;let s=L.mode==="sailing"?ea(L):null,o=ui(L);if(s)for(let a of s.options)r+=`<polyline class="branch-${a.kind}" points="${[L.boat,...a.waypoints].map(l=>`${l.x},${l.z}`).join(" ")}"/>`;o&&(r+=`<polyline class="branch-selected" points="${[L.boat,...o.waypoints.slice(o.index)].map(a=>`${a.x},${a.z}`).join(" ")}"/>`),ru(J("#map-branch-options"),s,!0),J("#map-world").innerHTML=r,J("#map-forecast").textContent=`\u73FE\u5728 ${n.label} \xB7 ${Math.ceil(n.secondsToChange)} \u79D2\u5F8C ${n.nextLabel}\u3002\u63A5\u8457 ${(n.forecast||[]).map(a=>`${a.label}\uFF08${Math.ceil(a.startsIn??a.secondsUntil)}\u79D2\u5F8C\uFF09`).join(" \u2192 ")}`,J("#route-description").textContent=t?.description||"\u9078\u64C7\u59D4\u8A17\u5F8C\u986F\u793A\u822A\u7DDA\u3002\u5B89\u5168\u8DEF\u6C38\u9060\u958B\u653E\u3002",J("#map-mission").innerHTML=iu(e?.id,i)}function Iv(){let i=`${L.mode}|${Bt}|${L.currentIsland}|${L.discoveries.length}|${L.parts.length}|${L.completed.length}|${L.voyage.observed?.join(",")}|${L.lighthouseFixed}|${L.storyComplete}|${Pt}`;if(jh===i)return;jh=i;let e=J("#panel"),t=["harbor","island","result"].includes(L.mode)||Bt==="ready";if(e.hidden=!t,document.body.classList.toggle("in-menu",t),!t)return;if(Bt==="ready"&&["sailing","diving"].includes(L.mode)){e.innerHTML=`<span class="eyebrow">WELCOME BACK \xB7 \u822A\u7A0B\u5DF2\u4FDD\u5B58</span><h2>\u6D77\u98A8\uFF0C\u7B49\u4F60\u56DE\u4F86\u3002</h2><p>\u5DF2\u6062\u5FA9\u8239\u4F4D\u3001\u822A\u6D77\u8A8C\u8207\u672C\u8D9F\u8ABF\u67E5\u3002\u96E2\u7DDA\u671F\u9593\u6F6E\u6C50\u8207\u6C27\u6C23\u5747\u5DF2\u505C\u6B62\u3002</p><div class="progress-line"><span>\u8239\u9AD4 ${Math.ceil(L.boat.hull)}%</span><span>\u96F6\u4EF6 ${L.parts.length}/3</span></div><button id="continue-voyage" class="primary">\u7E7C\u7E8C\u822A\u7A0B \u2197</button><button id="continue-map" class="secondary">\u5148\u770B\u6D77\u5716</button>`,J("#continue-voyage").onclick=()=>{vi(),hc()},J("#continue-map").onclick=()=>xn("map");return}if(L.mode==="result"&&Bt!=="ready"){e.innerHTML=`<span class="eyebrow">VOYAGE COMPLETE</span><h2>${hn(L.result?.title||"\u53C8\u4E00\u6BB5\u822A\u7A0B\uFF0C\u5BEB\u9032\u6D77\u5716\u3002")}</h2><p>${hn(L.result?.text||"\u5DF2\u5B89\u5168\u8FD4\u822A\uFF0C\u9032\u5EA6\u8207\u6700\u4F73\u7D00\u9304\u4FDD\u5B58\u5728\u6B64\u88DD\u7F6E\u3002")}</p><div class="progress-line"><span>\u5716\u9451 ${L.discoveries.length}/${yn.length}</span><span>\u96F6\u4EF6 ${L.parts.length}/3</span><span>\u59D4\u8A17 ${L.completed.length}/${Nt.length}</span></div><p class="note">${rp()}</p><button class="primary" id="next-voyage">${L.storyComplete?"\u5C55\u958B\u81EA\u7531\u822A\u7A0B":"\u6E96\u5099\u4E0B\u4E00\u8D9F\u822A\u7A0B"} \u2197</button><button class="secondary" id="result-journal">\u7FFB\u95B1\u822A\u6D77\u8A8C</button>`,J("#next-voyage").onclick=()=>{L.mode="harbor",L.result=null,zr()},J("#result-journal").onclick=()=>xn("journal");return}if(L.mode==="island"){let r=Or(L.currentIsland),s=Kn.find(o=>o.islandId===r.id);e.innerHTML=`<span class="eyebrow">ASHORE \xB7 \u5DF2\u5B89\u5168\u9760\u6CCA</span><h2>${hn(r.name)}</h2><p>${r.id==="lighthouse"?"\u4E09\u4EFD\u6DF1\u6D77\u8A18\u61B6\uFF0C\u80FD\u8B93\u9019\u5EA7\u71C8\u5854\u518D\u6B21\u767C\u5149\u3002\u4FEE\u5FA9\u5F8C\u8FD4\u56DE\u6BCD\u6E2F\uFF0C\u5B8C\u6210\u6545\u4E8B\u3002":"\u6536\u8D77\u5E06\uFF0C\u807D\u4E00\u807D\u5CF6\u7684\u8072\u97F3\u3002\u8ABF\u67E5\u5CB8\u908A\u7684\u7269\u7A2E\u8207\u907A\u8DE1\uFF0C\u628A\u767C\u73FE\u5BEB\u5165\u822A\u6D77\u8A8C\u3002"}</p>${iu()}<div class="progress-line"><span>\u8239\u9AD4 ${Math.round(L.boat.hull)}%</span><span>\u96F6\u4EF6 ${L.parts.length}/3</span></div><button class="primary" id="investigate">${r.id==="lighthouse"?"\u8ABF\u67E5 / \u4FEE\u5FA9\u71C8\u5854":"\u8ABF\u67E5\u6B64\u5CF6"} <kbd>E</kbd></button>${s?`<button class="primary" id="dive">\u6DFA\u6C34\u63A2\u7D22 \xB7 ${hn(s.name)}</button><p class="note">55 \u79D2\u6C27\u6C23\u3002\u627E\u767C\u5149\u76EE\u6A19\uFF0C\u9760\u8FD1\u5F8C\u6309 E\uFF1B\u6C23\u6CE1\u53EF\u88DC\u6C23\uFF0C\u96A8\u6642\u53EF\u6D6E\u51FA\u8FD4\u8239\u3002</p>`:""}<div class="actions"><button id="leave-island">\u56DE\u8239\uFF0C\u7E7C\u7E8C\u822A\u884C \u2197</button><button id="island-map">\u67E5\u770B\u6D77\u5716</button></div><p class="note">\u5DF2\u5728\u6B64\u5B89\u5168\u6E2F\u4FDD\u5B58\uFF1B\u91CD\u8F09\u56DE\u5230\u9019\u88E1\u3002</p>`,J("#investigate").onclick=()=>ai(()=>Mc(L)),J("#dive")?.addEventListener("click",()=>{vi(),ai(()=>vu(L,s.id))}),J("#leave-island").onclick=()=>{vi(),ai(()=>yc(L,L.contractId||tr,L.rigId||ic))},J("#island-map").onclick=()=>xn("map");return}e.innerHTML=`<span class="eyebrow">CHAPTER 01 \xB7 THE LIGHT WE BRING HOME</span><h2>${L.storyComplete?"\u6D77\uFF0C\u4ECD\u6709\u65B0\u6545\u4E8B\u3002":"\u7D66\u6D77\u4E00\u76DE\u71C8\u3002"}</h2><p>${Bt==="ready"?"\u4F60\u662F\u4E03\u5CF6\u7684\u65B0\u4EFB\u822A\u6D77\u54E1\u3002\u9078\u4E00\u4EFD\u59D4\u8A17\uFF0C\u6CBF\u6D77\u6D41\u5C0B\u627E\u5CF6\u5DBC\uFF0C\u8B93\u5317\u65B9\u71C8\u5854\u91CD\u65B0\u767C\u5149\u3002":"\u6BCD\u6E2F\u70BA\u4F60\u514D\u8CBB\u4FEE\u8239\u3002\u9078\u64C7\u76EE\u7684\u5730\u3001\u5E06\u88DD\u8207\u822A\u7DDA\uFF0C\u518D\u628A\u4E0B\u4E00\u500B\u767C\u73FE\u5E36\u56DE\u4F86\u3002"}</p><button class="primary" id="depart">\u51FA\u6E2F \xB7 \u958B\u59CB\u822A\u7A0B \u2197</button><p class="note">W \u5347\u5E06 \xB7 A D \u8F49\u8235 \xB7 \u7A7A\u767D\u9375\u6536\u5E06 \xB7 E \u9760\u5CB8<br>\u4E5F\u53EF\u5728\u4E0B\u65B9\u8ABF\u6574\u59D4\u8A17\u3001\u5E06\u88DD\u8207\u6D77\u6D41\u3002</p><label class="field">01 / \u9019\u8D9F\u60F3\u5E36\u56DE\u4EC0\u9EBC<select id="contract">${Nt.map((r,s)=>`<option value="${r.id}">${L.completed.includes(r.id)?"\u2713 ":""}${String(s+1).padStart(2,"0")} ${hn(r.name)}</option>`).join("")}</select></label><p class="note" id="contract-note"></p><div id="contract-objectives"></div><label class="field">02 / \u9078\u4E00\u5F35\u5E06<select id="rig">${hi.map(r=>`<option value="${r.id}">${hn(r.name)} \xB7 ${hn(r.description)}</option>`).join("")}</select></label><label class="field">03 / \u6D77\u6D41\u5716\u8B5C<select id="seed"><option value="1">01 \xB7 \u4FE1\u98A8\u6668\u822A</option><option value="2">02 \xB7 \u5CF6\u9593\u5B63\u6D41</option><option value="3">03 \xB7 \u56DE\u8072\u822A\u7DDA</option></select></label><div class="actions"><button id="wait-tide">\u7B49\u4E0B\u4E00\u6F6E</button><button id="plan-route">\u898F\u5283\u822A\u7DDA</button><button id="help">\u64CD\u4F5C\u8AAA\u660E</button></div><div class="rule"></div><div class="progress-line"><span>\u5716\u9451 ${L.discoveries.length}/${yn.length}</span><span>\u96F6\u4EF6 ${L.parts.length}/3</span><span>\u59D4\u8A17 ${L.completed.length}/${Nt.length}</span></div><p class="note">7 \u5CF6\u624B\u5DE5\u6D77\u57DF \xB7 \u55AE\u4EBA\u672C\u6A5F\u4FDD\u5B58<br>${hn(Cs||"\u78B0\u7901\u53EF\u4FEE\u5FA9\uFF0C\u5931\u6557\u53EF\u6551\u63F4\u3002\u653E\u5FC3\u51FA\u767C\u3002")}</p>`,J("#contract").value=tr,J("#rig").value=ic,J("#seed").value=sc;let n=()=>{J("#contract-note").textContent=Nt.find(r=>r.id===tr)?.description||"",J("#contract-objectives").innerHTML=iu(tr,!0)};n(),J("#contract").onchange=r=>{tr=r.target.value,n()},J("#rig").onchange=r=>ic=r.target.value,J("#seed").onchange=r=>sc=+r.target.value,J("#depart").onclick=()=>{vi(),hc(),L.seed=sc,qn=null,ai(()=>yc(L,tr,ic)),Pn("\u5148\u6309 W \u5347\u5E06\uFF0CA / D \u8F49\u8235\u3002\u6309 M \u770B\u6D77\u5716\uFF1B\u5230\u5CF6\u5916\u91D1\u8272\u6CCA\u4F4D\u6536\u5E06\u6309 E\u3002",6500)},J("#wait-tide").onclick=()=>{ai(()=>bu(L)),In()},J("#plan-route").onclick=()=>xn("map"),J("#help").onclick=()=>xn("help")}function iu(i=L.contractId,e=!1){let t=zi(L,i);return t?.objectives?`<ol class="contract-checklist" aria-label="${e?"\u59D4\u8A17\u8981\u6C42":"\u672C\u8D9F\u8ABF\u67E5\u9032\u5EA6"}">${t.objectives.map(n=>`<li class="${!e&&n.done?"done":""}">${!e&&n.done?"\u2713 ":""}${hn(n.name)}${n.kind==="dive"?" \xB7 \u6DFA\u6F5B":""}</li>`).join("")}</ol>${!e&&t.readyToDeliver?'<p class="note">\u672C\u8D9F\u8ABF\u67E5\u9F4A\u5099\uFF0C\u8FD4\u56DE\u6F6E\u97F3\u6E2F\u4EA4\u4ED8\u3002</p>':""}`:""}function Pv(i){let e=ki(i.x,i.z,L.time,L.seed);if(e.strength>.12){let n=e.z<0?"\u5317":"\u5357",r=e.x<0?"\u897F":"\u6771";return`\u6B64\u8655\u6B63\u5411${Math.abs(e.z)>Math.abs(e.x)*2?n:Math.abs(e.x)>Math.abs(e.z)*2?r:n+r}\u6D41 ${e.strength.toFixed(1)} m/s\uFF1B\u9760\u8FD1\u6642\u6536\u5E06\u4ECD\u6703\u6F02\u79FB\u3002\u53EF\u7559\u5728\u6D41\u9053\u501F\u529B\uFF0C\u6216\u5411\u5916\u7DE3\u8D70\u7A69\u5B9A\u6C34\u8DEF\u3002`}let t=Oi.find(n=>Math.hypot(n.x-i.x,n.z-i.z)<65);return t?`${t.name}${dn(L.time).height>t.safeHeight?"\u76EE\u524D\u6C34\u4F4D\u53EF\u901A\u884C\uFF1B\u4ECD\u8981\u770B\u4E0B\u4E00\u6F6E\u9810\u5831":"\u76EE\u524D\u9732\u7901\uFF1B\u6CBF\u6D77\u5716\u5916\u5074\u6DF1\u6C34\u8DEF\u7E5E\u884C"}\u3002`:i.note}function Dv(i,e){qn=null,ai(()=>mu(L,i.id,e)),In(),ui(L)&&J("#route-cancel").focus({preventScroll:!0})}function ru(i,e,t=!1){let n=e?`${e.id}:${e.direction}:${e.entryIndex??0}:${e.options.map(r=>`${r.id}:${r.available}`).join(",")}`:"";if(i.dataset.choice!==n){i.dataset.choice=n,i.replaceChildren();for(let r of e?.options||[]){let s=document.createElement("button");s.type="button",s.disabled=r.available===!1;let o=document.createElement("span");o.textContent=r.label;let a=document.createElement("em"),l=document.createElement("small");s.append(o,a,l),s.dataset.option=r.id,s.onclick=()=>{t&&Br(),Dv(e,r.id),s.blur()},i.append(s)}}for(let r of e?.options||[]){let s=i.querySelector(`[data-option="${r.id}"]`);s&&(s.querySelector("small").textContent=`${r.reason} ${r.condition||""}`,s.querySelector("em").textContent=`\u8DEF\u9EDE ${r.distanceMetres} m \xB7 \u7D04 ${r.estimatedSeconds} s`)}if(t&&e&&!i.querySelector(".route-estimate-note")){let r=document.createElement("p");r.className="route-estimate-note note",r.textContent="\u79D2\u6578\u6309\u6EFF\u5E06\u8207\u76EE\u524D\u6D41\u6CC1\u4F30\u7B97\u5230\u5404\u81EA\u8DEF\u9EDE\uFF0C\u4E0D\u542B\u8F49\u8235\u3001\u505C\u8239\u8207\u5F8C\u7E8C\u822A\u7A0B\u3002",i.append(r)}}function Lv(){let i=J("#route-choice-card");if(tu=null,L.mode!=="sailing"||Bt!=="running"||Pt||zt){i.hidden=!0;return}if(L.cargo.length<hi.find(r=>r.id===L.rigId).capacity&&bn.some(r=>Math.hypot(r.x-L.boat.x,r.z-L.boat.z)<=20&&(r.id===qn||L.boat.speed<=1.4)&&!L.voyage.harvested.includes(`observation:${r.id}`)&&!L.voyage.skippedObservations?.includes(r.id))&&!ui(L)){i.hidden=!0;return}let t=ui(L),n=ea(L);if(i.hidden=!n&&!t,J("#route-cancel").hidden=!t,t&&!n){J("#route-choice-title").textContent=t.label,J("#route-choice-context").textContent="\u4F9D\u85CD\u8272\u8DEF\u9EDE\u624B\u52D5\u638C\u8235\uFF1B\u53D6\u6D88\u5F15\u5C0E\u53EF\u6062\u5FA9\u539F\u672C\u4EFB\u52D9\u76EE\u6A19\u3002",ru(J("#route-options"),null);return}n&&(tu=n,J("#route-choice-title").textContent=n.name,J("#route-choice-context").textContent=t?`\u76EE\u524D\u6CBF\u300C${t.label}\u300D\u3002\u53EF\u6BD4\u8F03\u524D\u65B9\u6D77\u6CC1\u8207\u9032\u6E2F\u89D2\u5EA6\uFF0C\u6539\u9078\u4E0B\u4E00\u6BB5\u85CD\u8272\u5F15\u5C0E\uFF1B\u4ECD\u9700\u624B\u52D5\u638C\u8235\u3002`:"\u9078\u64C7\u5F8C\u4F9D\u5DE6\u4E0A\u65B9\u4F4D\u624B\u52D5\u638C\u8235\uFF1B\u85CD\u8272\u8DEF\u9EDE\u53EA\u63D0\u4F9B\u5F15\u5C0E\uFF0C\u4E0D\u6703\u81EA\u52D5\u64CD\u8239\u3002",ru(J("#route-options"),n))}J("#route-branch-map").onclick=()=>xn("map");J("#route-cancel").onclick=()=>{ai(()=>gu(L)),In()};function Uv(){let i=J("#survey-choice");if(Yo=null,L.mode!=="sailing"||Bt!=="running"||Pt||zt||tu||ui(L)){i.hidden=!0;return}let t=bn.filter(o=>!L.voyage.harvested.includes(`observation:${o.id}`)&&!L.voyage.skippedObservations?.includes(o.id)).map(o=>({...o,distance:Math.hypot(o.x-L.boat.x,o.z-L.boat.z)})).filter(o=>o.distance<=45).sort((o,a)=>o.id===qn?-1:a.id===qn?1:o.distance-a.distance)[0];if(i.hidden=!t,!t)return;Yo=t;let n=hi.find(o=>o.id===L.rigId).capacity,r=L.cargo.length>=n;J("#survey-title").textContent=`${t.name} \xB7 ${Math.round(t.distance)} m`,J("#survey-detail").textContent=Pv(t),J("#survey-tradeoff").textContent=`\u53D6\u6A23\u4F54 1 \u683C\u8CA8\u8259\uFF0C\u8FD4\u6E2F +3 \u5370\u8A18\uFF1B\u76F4\u822A\u53EF\u7701\u505C\u8239\u6642\u9593\u3002\u8CA8\u8259 ${L.cargo.length}/${n}\u3002`;let s=J("#survey-sample");s.disabled=r,s.textContent=r?"\u8CA8\u8259\u5DF2\u6EFF":t.distance>9?qn===t.id?"\u5DF2\u6A19\u8A18 \xB7 \u4F9D\u65B9\u4F4D\u524D\u9032":"\u6A19\u8A18\u53D6\u6A23\u9EDE":L.boat.speed>1.4?"\u6536\u5E06\u6E1B\u901F":"\u53D6\u5F97\u53D6\u6A23 E"}J("#survey-sample").onclick=()=>{let i=Yo;i&&(vi(),i.distance>9?(qn=i.id,Pn("\u53D6\u6A23\u9EDE\u5DF2\u6A19\u8A18\u3002\u4F9D\u5DE6\u4E0A\u65B9\u4F4D\u822A\u884C\uFF0C\u63A5\u8FD1\u6D6E\u6A19\u5F8C\u6536\u5E06\u6E1B\u901F\u3002")):L.boat.speed>1.4?(rr(),L.boat.sail=0,Pn("\u5DF2\u6536\u5E06\u3002\u822A\u901F\u964D\u5230 1.4 m/s \u5F8C\u6309 E \u53D6\u6A23\u3002")):ai(()=>vc(L,i.id)),J("#survey-sample").blur(),fc())};J("#survey-pass").onclick=()=>{if(!Yo)return;let i=Yo.id;qn===i&&(qn=null),ai(()=>_u(L,i)),J("#survey-pass").blur()};function Nv(){if(L.mode==="diving"){let t=Kn.find(n=>n.id===L.activeDive)||Kn.find(n=>n.islandId===L.currentIsland);return{title:"\u6D77\u4E0B\uFF0C\u4E5F\u6709\u661F\u5149\u3002",text:`${t?.name||"\u6DFA\u6C34\u63A2\u7D22"} \xB7 ${L.diveCollected?"\u5DF2\u5B8C\u6210\u8ABF\u67E5\uFF0C\u53EF\u6D6E\u51FA\u56DE\u8239\u3002":`\u76EE\u6A19\u7D04 ${Math.round(Math.hypot((t?.target.x||0)-L.diver.x,(t?.target.z||0)-L.diver.z))} m\uFF1B\u9760\u8FD1\u91D1\u8272\u7269\u4EF6\u6309 E\u3002`} \u6C23\u6CE1\u88DC\u6C27\u3002`}}let i=ui(L);if(L.mode==="sailing"&&i){let t=i.target,n=Math.hypot(t.x-L.boat.x,t.z-L.boat.z),r=(Math.atan2(t.x-L.boat.x,-(t.z-L.boat.z))*180/Math.PI+360)%360;return{title:i.label,text:`\u8DEF\u9EDE ${i.index+1}/${i.waypoints.length} \xB7 \u7D04 ${Math.round(n)} \u516C\u5C3A \xB7 \u65B9\u4F4D ${Math.round(r)}\xB0\u3002\u4F9D\u85CD\u8272\u8DEF\u9EDE\u638C\u8235\uFF0C\u5B8C\u6210\u5F8C\u7E7C\u7E8C\u59D4\u8A17\u3002`}}if(L.lighthouseFixed&&!L.storyComplete)return{title:"\u5E36\u8457\u5149\uFF0C\u56DE\u5BB6\u3002",text:"\u71C8\u5854\u5DF2\u4FEE\u5FA9\u3002\u8FD4\u56DE\u5357\u65B9\u6BCD\u6E2F\uFF0C\u5B8C\u6210\u6545\u4E8B\u3002"};if(L.mode==="sailing"&&qn){let t=bn.find(n=>n.id===qn);if(t&&!L.voyage.harvested.includes(`observation:${t.id}`)){let n=Math.hypot(t.x-L.boat.x,t.z-L.boat.z),r=(Math.atan2(t.x-L.boat.x,-(t.z-L.boat.z))*180/Math.PI+360)%360;return{title:`\u53D6\u6A23 \xB7 ${t.name}`,text:`\u7D04 ${Math.round(n)} \u516C\u5C3A \xB7 \u65B9\u4F4D ${Math.round(r)}\xB0\u3002\u91D1\u8272\u6D6E\u6A19 9 \u516C\u5C3A\u5167\u6536\u5E06\uFF0C\u4F4E\u901F\u6309 E\uFF1B\u53EF\u96A8\u6642\u7565\u904E\u3002`}}qn=null}if(L.parts.length===3&&!L.lighthouseFixed)return{title:"\u9EDE\u4EAE\u5317\u65B9\u71C8\u5854\u3002",text:"\u4E09\u500B\u96F6\u4EF6\u5DF2\u9F4A\u5099\u3002\u524D\u5F80\u5317\u65B9\u71C8\u5854\u9760\u6CCA\uFF0C\u8ABF\u67E5\u4FEE\u5FA9\u3002"};if(L.mode==="harbor"){let t=Nt.find(n=>n.id===tr);return{title:t?.name||"\u6E96\u5099\u51FA\u6D77\u3002",text:`\u6E96\u5099\u524D\u5F80${Or(t?.islandId)?.name||"\u4E03\u5CF6"}\u3002\u5148\u770B\u822A\u7DDA\u8207\u6F6E\u6C50\uFF0C\u518D\u6309 W \u5347\u5E06\u3002`}}let e=Nt.find(t=>t.id===L.contractId);if(e&&L.mode==="sailing"){let t=zi(L),n=t.readyToDeliver,r=t.nextObjective,s=Or(n?"harbor":r?.islandId||e.islandId),o=Math.hypot(L.boat.x-s.dock.x,L.boat.z-s.dock.z);return{title:n?"\u628A\u767C\u73FE\u5E36\u56DE\u6BCD\u6E2F\u3002":e.name,text:`${s.name} \xB7 ${Math.round((Math.atan2(s.dock.x-L.boat.x,-(s.dock.z-L.boat.z))*180/Math.PI+360)%360)}\xB0 \xB7 ${Math.round(o)} m \xB7 ${n?"\u9760\u6CCA\u4EA4\u4ED8\u5F8C\u7D50\u7B97":`\u8ABF\u67E5 ${t.completedCount}/${t.total} \xB7 ${r?.kind==="dive"?"\u9760\u5CB8\u5F8C\u4E0B\u6F5B":"\u5230\u91D1\u8272\u6CCA\u4F4D\u6536\u5E06\uFF0C\u6309 E \u9760\u5CB8"}`}`}}return{title:L.storyComplete?"\u4E03\u5CF6\uFF0C\u7E7C\u7E8C\u63A2\u7D22\u3002":"\u7D66\u6D77\u4E00\u76DE\u71C8\u3002",text:L.storyComplete?"\u81EA\u7531\u822A\u7A0B\u5DF2\u958B\u653E\u3002\u88DC\u9F4A\u5716\u9451\uFF0C\u6216\u63DB\u5E06\u88DD\u8207\u822A\u7DDA\u6311\u6230\u7D00\u9304\u3002":"\u5C0B\u627E\u4E09\u500B\u6DFA\u6C34\u96F6\u4EF6\uFF0C\u4FEE\u5FA9\u71C8\u5854\u4E26\u5B89\u5168\u8FD4\u822A\u3002"}}function rc(i,e){let t=J(i);t.textContent!==String(e)&&(t.textContent=e)}function fc(){let i=L.mode==="diving"?"W A S D / \u65B9\u5411\u9375 \u6E38\u52D5 \xB7 E \u53D6\u5F97\u7269\u4EF6 \xB7 \u6D6E\u51FA\u56DE\u8239 \u8FD4\u56DE\u8239\u4E0A \xB7 M \u6D77\u5716 \xB7 Esc \u66AB\u505C":"A D \u8F49\u8235 \xB7 W S \u5E06\u529B \xB7 SPACE \u6536\u5E06 \xB7 E \u9760\u5CB8 \xB7 M \u6D77\u5716 \xB7 C \u8996\u89D2";J("#keyboard-hint").textContent!==i&&(J("#keyboard-hint").textContent=i),Iv(),Lv(),Uv();let e=dn(L.time),t=Nv();rc("#objective",t.title),rc("#objective-detail",t.text),rc("#hull-label",`${Math.ceil(L.boat.hull)}%`),J("#hull-meter").value=L.boat.hull;let n=L.mode==="diving";document.body.classList.toggle("diving",n),J("#oxygen-row").hidden=!n,rc("#oxygen-label",`${Math.ceil(L.oxygen||0)} \u79D2`),J("#oxygen-meter").max=55,J("#oxygen-meter").value=L.oxygen||0,J("#surface-button").hidden=!n,J("#sail-label").textContent=n?"\u6F5B\u6C34 \xB7 WASD \u65B9\u5411\u79FB\u52D5":`\u5E06\u529B ${Math.round(L.boat.sail*100)}% \xB7 ${Math.abs(L.boat.speed||0).toFixed(1)} m/s`,J("#tide-label").textContent=`${e.label} \xB7 ${Math.ceil(e.secondsToChange)}s`,J("#forecast").textContent=`\u63A5\u8457 ${e.nextLabel} \u2192 ${e.forecast?.[1]?.label||""}`,J("#voyage-time").textContent=`${String(Math.floor((L.elapsed||0)/60)).padStart(2,"0")}:${String(Math.floor((L.elapsed||0)%60)).padStart(2,"0")}`,J("#compass-arrow").style.transform=`rotate(${L.boat.heading*180/Math.PI}deg)`,J("#bearing-label").textContent=`${(Math.round(L.boat.heading*180/Math.PI)%360+360)%360}\xB0`;let r=ki(L.boat.x,L.boat.z,L.time,L.seed);J("#flow-arrow").style.display="inline-block",J("#flow-arrow").style.transform=`rotate(${Math.atan2(r.z||0,r.x||0)*180/Math.PI}deg)`,J("#safety-warning").textContent=L.boat.hull<25?"\u26A0 \u8239\u9AD4\u4F4E\u65BC 25%\uFF0C\u8ACB\u9760\u6700\u8FD1\u6E2F\u53E3\u514D\u8CBB\u4FEE\u5FA9\u3002":"";let s=L.mode==="sailing"&&bn.some(c=>!L.voyage.harvested.includes(`observation:${c.id}`)&&Math.hypot(c.x-L.boat.x,c.z-L.boat.z)<=9),o=kt.some(c=>Math.hypot(c.dock.x-L.boat.x,c.dock.z-L.boat.z)<=13),a=n?"\u53D6\u5F97\u7269\u4EF6 <kbd>E</kbd>":s&&!o?"\u89C0\u6E2C\u53D6\u6A23 <kbd>E</kbd>":"\u9760\u5CB8 / \u8ABF\u67E5 <kbd>E</kbd>",l=J("#interact-button");l.dataset.action!==a&&(l.dataset.action=a,l.innerHTML=a),document.querySelectorAll("[data-sail]").forEach(c=>c.classList.toggle("selected",Math.abs(L.boat.sail-+c.dataset.sail)<.08)),document.querySelectorAll(".dive-control").forEach(c=>c.hidden=!n),zt==="map"&&nu()}function sp(){Pt||zt||Bt!=="running"||ai(()=>Mc(L))}function op(){Lt.camera=Lt.camera==="overhead"?"follow":"overhead",$n?.setCamera(Lt.camera),Xo(),Pn(Lt.camera==="overhead"?"\u659C\u4FEF\u77B0\u93E1\u982D":"\u8FFD\u8239\u93E1\u982D")}document.addEventListener("keydown",i=>{if(i.ctrlKey||i.altKey||i.metaKey)return;let e=i.key.toLowerCase();if(zt){if((e==="escape"||e==="m"&&zt==="map")&&(i.preventDefault(),Br()),e==="tab"){let t=[...J("#modal-content").querySelectorAll("button,input,select")].filter(n=>!n.disabled&&n.getClientRects().length);i.shiftKey&&document.activeElement===t[0]?(i.preventDefault(),t.at(-1)?.focus()):!i.shiftKey&&document.activeElement===t.at(-1)&&(i.preventDefault(),t[0]?.focus())}return}["input","select","textarea"].includes(i.target.tagName.toLowerCase())&&e!=="escape"||i.target.tagName==="BUTTON"&&e===" "&&!["sailing","diving"].includes(L.mode)||(["w","a","s","d","arrowup","arrowdown","arrowleft","arrowright"," ","e","m","c","escape"].includes(e)&&(i.preventDefault(),tp||vi()),i.repeat||(e==="escape"&&ir(!Pt),e==="m"&&xn("map"),e==="c"&&op(),e==="e"&&sp()),Rn.has(e)||(Rn.add(e),Fr()))});document.addEventListener("keyup",i=>{Rn.delete(i.key.toLowerCase())&&Fr()});var ap=J(".steering");for(let[i,e]of[["forward","\u2191"],["back","\u2193"]]){let t=document.createElement("button");t.dataset.hold=i,t.textContent=e,t.className="dive-control",t.setAttribute("aria-label",i==="forward"?"\u5411\u524D\u6F5B\u6E38":"\u5411\u5F8C\u6F5B\u6E38"),t.hidden=!0,ap.append(t)}var Zt=document.createElement("div");Zt.id="helm";Zt.setAttribute("role","slider");Zt.tabIndex=0;Zt.setAttribute("aria-label","\u8F49\u8235\u6416\u687F\uFF0C\u6F5B\u6C34\u6642\u53EF\u5411\u56DB\u65B9\u6E38\u52D5");Zt.setAttribute("aria-valuemin","-100");Zt.setAttribute("aria-valuemax","100");Zt.setAttribute("aria-valuenow","0");Zt.innerHTML='<span id="helm-knob">\u2726</span>';ap.prepend(Zt);function lp(i){if(i.pointerId!==nr||Pt||zt)return;let e=Zt.getBoundingClientRect(),t=i.clientX-e.left-e.width/2,n=i.clientY-e.top-e.height/2,r=e.width*.32,s=Math.max(r,Math.hypot(t,n));(Cn.x!==t/s||Cn.y!==n/s)&&(Cn={x:t/s,y:n/s},Fr()),J("#helm-knob").style.transform=`translate(${Cn.x*r}px,${Cn.y*r}px)`,Zt.setAttribute("aria-valuenow",String(Math.round(Cn.x*100)))}Zt.onpointerdown=i=>{if(!(Pt||zt||nr!==null)){i.preventDefault(),vi();try{Zt.setPointerCapture(i.pointerId)}catch{return}nr=i.pointerId,lp(i)}};Zt.onpointermove=i=>{i.pointerId===nr&&lp(i)};Zt.onpointerup=Zt.onpointercancel=Zt.onlostpointercapture=i=>{i.pointerId===nr&&(nr=null,(Cn.x!==0||Cn.y!==0)&&(Cn={x:0,y:0},Fr()),J("#helm-knob").style.transform="translate(0px,0px)",Zt.setAttribute("aria-valuenow","0"))};document.querySelectorAll("[data-hold]").forEach(i=>{i.onpointerdown=e=>{if(!(Pt||zt||Rs.has(e.pointerId))){e.preventDefault(),vi();try{i.setPointerCapture(e.pointerId)}catch{return}Rs.set(e.pointerId,i),ac.set(e.pointerId,i.dataset.hold),Fr()}},i.onpointerup=i.onpointercancel=i.onlostpointercapture=e=>{Rs.get(e.pointerId)===i&&(Rs.delete(e.pointerId),ac.delete(e.pointerId)&&Fr())}});document.querySelectorAll("[data-sail]").forEach(i=>i.onclick=()=>{if(Pt||zt)return;vi();let e=L.boat.sail;L.boat.sail!==+i.dataset.sail&&(L.boat.sail=+i.dataset.sail,Fr()),cp(e,L.boat.sail,!0,performance.now()),i.blur()});J("#interact-button").onclick=()=>{vi(),sp(),J("#interact-button").blur()};J("#surface-button").onclick=()=>ai(()=>ta(L));J("#mini-chart").onclick=()=>xn("map");J("#map-button").onclick=()=>xn("map");J("#journal-button").onclick=()=>xn("journal");J("#camera-button").onclick=op;J("#pause-button").onclick=()=>ir(!Pt);J("#sea").oncontextmenu=i=>i.preventDefault();J("#sea").onpointerdown=i=>{if(!(Pt||zt||Fi)&&(i.button===2||i.pointerType==="touch"&&i.clientX>innerWidth/2)){try{J("#sea").setPointerCapture(i.pointerId)}catch{return}Fi={id:i.pointerId,x:i.clientX}}};J("#sea").onpointermove=i=>{Fi?.id===i.pointerId&&($n?.orbit((i.clientX-Fi.x)*.006),Fi.x=i.clientX)};J("#sea").onpointerup=J("#sea").onpointercancel=J("#sea").onlostpointercapture=i=>{if(Fi?.id===i.pointerId){Fi=null;try{J("#sea").hasPointerCapture(i.pointerId)&&J("#sea").releasePointerCapture(i.pointerId)}catch{}}};window.addEventListener("blur",()=>{rr(),Bt==="running"&&ir()});document.addEventListener("visibilitychange",()=>{rr(),document.hidden&&Bt==="running"&&ir()});window.addEventListener("pagehide",i=>{rr(),In(),i.persisted||(On.dispose(),li.dispose(),$n?.dispose())});window.addEventListener("pageshow",i=>{i.persisted&&ir()});window.addEventListener("message",i=>{if(i.source!==window.parent||i.origin!==location.origin||!lc)return;let e=i.data;if(!(!e||e.protocol!=="stteak-game"||e.version!==1||e.sessionId!==lc||!e.payload||typeof e.payload!="object"||Array.isArray(e.payload))){if(e.type==="host:init"){if(e.payload.gameId!=="tidebound"||typeof e.payload.title!="string"||typeof e.payload.image!="string")return;oc=!0,qo&&cc("game:ready",{capabilities:["pause","resume","restart","keyboard","touch"]});return}!oc||!qo||(e.type==="host:start"&&Bt==="ready"&&hc(),e.type==="host:pause"&&ir(),e.type==="host:resume"&&ir(!1),e.type==="host:restart"&&np())}});function Fv(){let i=new Set(ac.values()),e=Rn.has("a")||Rn.has("arrowleft")||i.has("left"),t=Rn.has("d")||Rn.has("arrowright")||i.has("right"),n=Rn.has("w")||Rn.has("arrowup")||i.has("forward"),r=Rn.has("s")||Rn.has("arrowdown")||i.has("back");return{turn:Math.max(-1,Math.min(1,Number(t)-Number(e)+Cn.x)),sailDelta:Number(n)-Number(r),brake:Rn.has(" "),diveX:Math.max(-1,Math.min(1,Number(t)-Number(e)+Cn.x)),diveZ:Math.max(-1,Math.min(1,Number(r)-Number(n)+Cn.y))}}var uc=-1/0,dc=L.boat.sail;function cp(i,e,t,n){!t||i===e||(Math.abs(e-dc)>=.1||i>0&&e===0)&&n-uc>=500&&(li.play("sail"),uc=n,dc=e)}var hp={step:{count:0,total:0,max:0},scene:{count:0,total:0,max:0},hud:{count:0,total:0,max:0}};function Jh(i,e){let t=performance.now()-e,n=hp[i];n.count++,n.total+=t,n.max=Math.max(n.max,t)}var Jf=0,up=0,su=0,$o=!1;function dp(i){if(On.isDisposed())return;let e=Kf()&&!$o,t=L.mode,n=On.frame(i,e,L.mode),r=Number.isFinite(n.raw)&&n.raw>0?Math.min(.1,n.raw):0;if(e&&n.dt>0){On.begin();let s=Fv(),o=L.boat.sail,a=performance.now(),l=yu(L,n.dt,s);Jh("step",a),On.end(),cp(o,L.boat.sail,L.mode==="sailing"&&(s.sailDelta!==0||s.brake),i),au(l),L.mode!==t&&(On.reset(),In(),zr())}if(!$o){let s=performance.now();$n.update(L,r,{...Lt,paused:Pt||!!zt||Bt!=="running"}),Jh("scene",s),Bv()}if(Yf++%8===0||i-Zf>180){let s=performance.now();fc(),Ov(),Jh("hud",s),Zf=i}if(i>ep&&J("#toast").classList.remove("visible"),Bt==="running"&&i-Jf>15e3&&(In(),Jf=i),Yf>30&&Number.isFinite(n.raw)&&n.raw>0&&n.raw<1){let s=n.raw*1e3;Wo.push(s),Wo.length>3600&&Wo.shift(),up+=s,su++}requestAnimationFrame(dp)}function Ov(){let i=J("#mini-chart");if(i.hidden=!["sailing","diving"].includes(L.mode)||Bt!=="running",i.hidden)return;let e=zi(L),t=Or(L.parts.length===3&&!L.lighthouseFixed?"lighthouse":L.lighthouseFixed&&!L.storyComplete?"harbor":e.nextObjective?.islandId||"harbor"),n=L.mode==="diving"?L.diver:L.boat;i.dataset.built||(J("#mini-world").innerHTML=kt.map(s=>`<circle data-island="${s.id}" cx="${s.x}" cy="${s.z}" r="${s.radius}" fill="#8eaf99" stroke="#eff3d7" stroke-width="4"/>`).join("")+Oi.map(s=>`<circle cx="${s.x}" cy="${s.z}" r="${s.radius}" fill="#edab73" opacity=".6"/>`).join("")+'<line id="mini-line" stroke="#f9d295" stroke-width="3" stroke-dasharray="10 7"/><path id="mini-boat" d="M0 -12L8 10L0 6L-8 10Z" fill="#fff8df" stroke="#173e45" stroke-width="2"/>',i.dataset.built="true");let r=J("#mini-line");for(let[s,o]of Object.entries({x1:n.x,y1:n.z,x2:t.dock.x,y2:t.dock.z}))r.setAttribute(s,o);if(J("#mini-boat").setAttribute("transform",`translate(${n.x},${n.z}) rotate(${L.boat.heading*180/Math.PI})`),i.dataset.goal!==t.id){i.dataset.goal=t.id;for(let s of i.querySelectorAll("[data-island]"))s.setAttribute("fill",s.dataset.island===t.id?"#ffd595":"#8eaf99");J("#mini-goal").textContent=t.name}}var Xn=document.createElement("div");Xn.id="dive-direction";Xn.hidden=!0;Xn.innerHTML='<span aria-hidden="true">\u279C</span><small></small>';document.body.append(Xn);function Bv(){let i=L.mode==="diving";if(Xn.hidden=!i||L.diveCollected||Bt!=="running"||Pt||!!zt,Xn.hidden)return;let e=Kn.find(c=>c.id===L.activeDive),t=$n.project(e.target.x,-6.8,e.target.z),n=340,r=innerWidth-90,s=130,o=innerHeight-230,a=Math.max(n,Math.min(r,t.x)),l=Math.max(s,Math.min(o,t.y));Xn.hidden=t.z<1&&t.x>=n&&t.x<=r&&t.y>=s&&t.y<=o,!Xn.hidden&&(Xn.style.left=a+"px",Xn.style.top=l+"px",Xn.querySelector("span").style.transform=`rotate(${Math.atan2(t.y-l,t.x-a)}rad)`,Xn.querySelector("small").textContent=`\u76EE\u6A19 ${Math.round(Math.hypot(e.target.x-L.diver.x,e.target.z-L.diver.z))} m`)}try{$n=qf(J("#sea"),mc),$n.setCamera(Lt.camera),document.body.classList.toggle("software",$n.stats().software),J("#sea").addEventListener("webglcontextlost",i=>{i.preventDefault(),$o=!0,ir(),Pn("\u7E6A\u5716\u66AB\u505C\uFF0C\u6B63\u5728\u7B49\u5F85\u986F\u793A\u88DD\u7F6E\u6062\u5FA9\u3002",2e4)}),J("#sea").addEventListener("webglcontextrestored",()=>{$o=!1,$n.resize(),Pn("\u6D77\u57DF\u5DF2\u6062\u5FA9\u3002\u6309\u7E7C\u7E8C\u8FD4\u56DE\u822A\u7A0B\u3002")}),window.addEventListener("resize",()=>$n.resize()),$n.resize(),Xo(),J("#loading").hidden=!0,qo=!0,fc(),oc&&cc("game:ready",{capabilities:["pause","resume","restart","keyboard","touch"]}),Is||ou(),requestAnimationFrame(dp),window.tidebound=Object.freeze({buildId:Kh,snapshot:()=>structuredClone(L),metrics:()=>{let i=[...Wo].sort((e,t)=>e-t);return{frames:Wo.length,average:su?up/su:null,contextLost:$o,cpu:Object.fromEntries(Object.entries(hp).map(([e,t])=>[e,{average:t.total/(t.count||1),max:t.max,count:t.count}])),p50:i[Math.floor(i.length*.5)]||null,p95:i[Math.floor(i.length*.95)]||null,renderer:$n.stats(),audio:li.stats(),phase:Bt,paused:Pt,overlay:zt,storageAvailable:Is}}})}catch(i){console.error(i),J("#loading").innerHTML='<span>\u2248</span><h1>\u6D77\u57DF\u66AB\u6642\u7121\u6CD5\u958B\u555F\u3002</h1><p>\u6B64\u904A\u6232\u9700\u8981\u652F\u63F4 WebGL 2 \u7684\u700F\u89BD\u5668\u3002\u8ACB\u78BA\u8A8D\u786C\u9AD4\u52A0\u901F\u5DF2\u958B\u555F\u5F8C\u91CD\u8A66\u3002</p><button onclick="location.reload()">\u91CD\u65B0\u8F09\u5165</button>',cc("game:error",{message:"3D \u6D77\u57DF\u521D\u59CB\u5316\u5931\u6557\u3002\u8ACB\u4F7F\u7528\u652F\u63F4 WebGL 2 \u7684\u700F\u89BD\u5668\u4E26\u91CD\u8A66\u3002"})}
/*! Bundled license information:

three/build/three.core.js:
three/build/three.module.js:
  (**
   * @license
   * Copyright 2010-2025 Three.js Authors
   * SPDX-License-Identifier: MIT
   *)
*/
