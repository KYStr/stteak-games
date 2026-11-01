// stteak iframe bridge v1. Only the embedding same-origin parent and this session are trusted.
export function bridge(handlers){
 const sessionId=new URLSearchParams(location.search).get('session'),embedded=window.parent!==window,origin=location.origin;let ready=false,initialized=!embedded;
 const send=(type,payload)=>{if(embedded&&sessionId&&initialized)window.parent.postMessage({protocol:'stteak-game',version:1,sessionId,type,payload},origin);};
 function receive(event){const m=event.data;if(!embedded||!sessionId||event.source!==window.parent||event.origin!==origin||!m||typeof m!=='object'||m.protocol!=='stteak-game'||m.version!==1||m.sessionId!==sessionId||!m.payload||typeof m.payload!=='object'||Array.isArray(m.payload))return; // 嵌入模式必須有非空session，與既有send閘門一致；不限制合法字串格式。
  if(m.type==='host:init'){if(m.payload.gameId!=='moss-and-moon'||typeof m.payload.title!=='string')return;initialized=true;if(ready)send('game:ready',{capabilities:['pause','resume','restart']});return;}
  if(!initialized||!ready||Object.keys(m.payload).length!==0)return;
  if(m.type==='host:start')handlers.start();else if(m.type==='host:pause')handlers.pause();else if(m.type==='host:resume')handlers.resume();else if(m.type==='host:restart')handlers.restart();
 }
 addEventListener('message',receive);
 return {ready(){ready=true;send('game:ready',{capabilities:['pause','resume','restart']});},state(state){send('game:state',{state});},error(message){send('game:error',{message:String(message).slice(0,300)});},dispose(){removeEventListener('message',receive);}};
}
