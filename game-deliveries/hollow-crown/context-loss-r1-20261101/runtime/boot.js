// Keep an actionable screen even when a dependency fails before main.js can initialize.
import { getGameBridge } from './bridge.js';

// Module evaluation finishes before iframe load; the heavier dynamic import may not.
const bridge=getGameBridge();
import('./main.js').catch(error=>{
  const overlay=document.getElementById('overlay');overlay.className='';overlay.replaceChildren();
  const panel=document.createElement('section');panel.className='panel';
  const title=document.createElement('h2');title.textContent='旅途載入中斷';
  const message=document.createElement('p');message.className='lead';message.textContent='必要的遊戲檔案未能載入。請確認連線後重試；本機存檔仍會保留。';
  const retry=document.createElement('button');retry.className='primary';retry.textContent='重新載入';retry.onclick=()=>location.reload();
  panel.append(title,message,retry);overlay.append(panel);retry.focus();
  bridge.error('必要遊戲檔案載入失敗；請重新連線。');
  console.error('Hollow Crown startup failed',error);
});
