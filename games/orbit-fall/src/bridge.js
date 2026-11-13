export function createBridge(handlers) {
  const sessionId=new URLSearchParams(location.search).get('session');
  const embedded=parent!==window;
  let initialized=false,ready=false;
  const send=(type,payload={})=>{if(embedded&&initialized)parent.postMessage({protocol:'stteak-game',version:1,sessionId,type,payload},location.origin)};
  const listener=e=>{
    if(!embedded||!sessionId||e.source!==parent||e.origin!==location.origin)return;
    const d=e.data;
    if(!d||Array.isArray(d)||d.protocol!=='stteak-game'||d.version!==1||d.sessionId!==sessionId||!d.payload||typeof d.payload!=='object'||Array.isArray(d.payload))return;
    if(d.type==='host:init'){
      if(d.payload.gameId!=='orbit-fall'||typeof d.payload.title!=='string')return;
      initialized=true;if(ready)send('game:ready',{capabilities:['pause','resume','restart']});return;
    }
    if(!initialized||Object.keys(d.payload).length)return;
    const action={'host:start':'start','host:pause':'pause','host:resume':'resume','host:restart':'restart'}[d.type];
    if(action)handlers[action]?.();
  };
  addEventListener('message',listener);
  return {ready(){ready=true;send('game:ready',{capabilities:['pause','resume','restart']})},state(state){send('game:state',{state})},error(message){send('game:error',{message:message.slice(0,300)})},dispose(){removeEventListener('message',listener)}};
}
