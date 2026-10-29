export function createBridge(actions){
  const params=new URLSearchParams(location.search),session=params.get('session');
  const embedded=parent!==window;let initialized=!embedded;let ready=false;
  const origin=location.origin;
  function send(type,payload){if(embedded&&initialized&&session)parent.postMessage({protocol:'stteak-game',version:1,sessionId:session,type,payload},origin);}
  function validInit(p){return p&&p.gameId==='neon-drift'&&typeof p.title==='string'&&p.title.length<=200&&typeof p.image==='string'&&p.image.length<=2048&&typeof p.accent==='string'&&p.accent.length<=64;}
  function onMessage(e){const m=e.data;if(!embedded||e.source!==parent||e.origin!==origin||!session||!m||m.protocol!=='stteak-game'||m.version!==1||m.sessionId!==session||!m.payload||typeof m.payload!=='object'||Array.isArray(m.payload))return;
    if(m.type==='host:init'){if(!validInit(m.payload))return;initialized=true;if(ready)send('game:ready',{capabilities:['pause','resume','restart']});return;}
    if(!initialized||!ready||Object.keys(m.payload).length!==0)return;
    const map={'host:start':'start','host:pause':'pause','host:resume':'resume','host:restart':'restart'};if(map[m.type])actions[map[m.type]]?.();
  }
  addEventListener('message',onMessage);
  return {ready(){ready=true;send('game:ready',{capabilities:['pause','resume','restart']});},state(state){send('game:state',{state});},error(message){send('game:error',{message:String(message).slice(0,300)});},dispose(){removeEventListener('message',onMessage);},embedded};
}
