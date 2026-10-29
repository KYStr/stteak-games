import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';
import {createNotifications} from '../../../games/neon-drift/src/notifications.js';

const main=readFileSync(new URL('../../../games/neon-drift/src/main.js',import.meta.url),'utf8');
function fixture(){
  const dialog={open:false},modalNotice={textContent:'',hidden:true},toast={textContent:'',hidden:true},timers=new Map();let next=0;
  const notifications=createNotifications({dialog,modalNotice,toast,setTimer:(callback,ms)=>{const id=++next;timers.set(id,{callback,ms});return id;},clearTimer:id=>timers.delete(id)});
  return {dialog,modalNotice,toast,timers,notifications};
}

test('gameplay toast still expires after 5000 ms and replacement cancels old expiry',()=>{
  const f=fixture();f.notifications.show('回正');const old=[...f.timers.keys()][0];
  assert.equal(f.toast.textContent,'回正');assert.equal(f.toast.hidden,false);assert.equal(f.modalNotice.hidden,true);
  f.notifications.show('新提示');assert.equal(f.timers.has(old),false);assert.equal(f.timers.size,1);
  const timer=[...f.timers.values()][0];assert.equal(timer.ms,5000);timer.callback();assert.equal(f.toast.hidden,true);
});

test('modal notices persist without timers, survive same-kind redraw and clear on navigation/close',()=>{
  const f=fixture();f.notifications.show('outside');f.notifications.open('customize');f.dialog.open=true;f.notifications.show('保存失敗');
  assert.equal(f.toast.hidden,true);assert.equal(f.timers.size,0);assert.equal(f.modalNotice.hidden,false);assert.equal(f.modalNotice.textContent,'保存失敗');
  f.notifications.open('customize');assert.equal(f.modalNotice.textContent,'保存失敗');
  f.notifications.open('settings');assert.equal(f.modalNotice.hidden,true);assert.equal(f.modalNotice.textContent,'');
  f.notifications.show('無法匯出');f.notifications.close();f.dialog.open=false;
  assert.equal(f.modalNotice.hidden,true);assert.equal(f.modalNotice.textContent,'');
  f.notifications.open('settings');f.dialog.open=true;assert.equal(f.modalNotice.hidden,true);
});

test('actual settings/modal wiring clears recovered failures without notice focus changes',()=>{
  const f=fixture(),opener={isConnected:true,focus(){focused=this;}},control={isConnected:true,focus(){focused=this;}};let focused=opener,ok=false,applyCount=0;
  const nodes={'#modal':f.dialog,'#modal-title':{},'#modal-content':{},'#close-modal':{}};
  f.dialog.showModal=()=>{f.dialog.open=true;focused=control;};f.dialog.close=()=>{f.dialog.open=false;};
  const context=vm.createContext({notifications:f.notifications,$:s=>nodes[s],document:{get activeElement(){return focused;}},save:{settings:{}},settings:{},modalKind:'',previousFocus:null,saveSettings:(save,patch)=>({ok,save:{settings:{...save.settings,...patch}},notice:'寫入失敗'}),applySettings:()=>applyCount++});
  for(const name of ['toast','commitSettings','openModal','closeModal'])vm.runInContext(main.split('\n').find(line=>line.startsWith(`function ${name}(`)),context);
  vm.runInContext("openModal('設定','controls','settings');commitSettings({volume:.2});",context);
  assert.equal(f.modalNotice.textContent,'寫入失敗');assert.equal(focused,control);assert.equal(applyCount,1);
  ok=true;vm.runInContext('commitSettings({volume:.3});',context);assert.equal(f.modalNotice.hidden,true);assert.equal(context.settings.volume,.3);
  ok=false;vm.runInContext("commitSettings({colorId:'mint'});openModal('塗裝','redrawn','settings');",context);
  assert.equal(f.modalNotice.hidden,false);assert.equal(f.modalNotice.textContent,'寫入失敗');
  vm.runInContext("openModal('說明','help','help');",context);assert.equal(f.modalNotice.hidden,true);
  vm.runInContext('closeModal();',context);assert.equal(f.modalNotice.hidden,true);
});

test('live status is inside native dialog but outside replaceable content, with no focus target',()=>{
  const html=readFileSync(new URL('../../../games/neon-drift/src/index.html',import.meta.url),'utf8');
  const dialog=html.match(/<dialog\b[^>]*>([\s\S]*?)<\/dialog>/)[1];
  assert.match(dialog,/<p id="modal-notice" role="status" aria-atomic="true" hidden><\/p><div id="modal-content">/);
  assert.doesNotMatch(dialog.match(/<p id="modal-notice"[^>]*>/)[0],/tabindex|autofocus/);
  assert.match(main,/else notifications\.clearModal\(\);applySettings\(\)/);
  assert.match(main,/addEventListener\('cancel',e=>\{e\.preventDefault\(\)/);
});

test('actual customization click handler retains failed writes across redraw and clears recovered writes',()=>{
  const handler=main.slice(main.indexOf("$('#modal-content').addEventListener('click',e=>{"),main.indexOf("addEventListener('blur'"));
  for(const kind of ['color','decal'])for(const ok of [false,true]){
    const f=fixture();f.notifications.open('customize');f.dialog.open=true;f.notifications.show('previous failure');
    let click,redraws=0,previewCount=0,patch;
    const context=vm.createContext({
      $:selector=>selector==='#modal-content'?{addEventListener:(event,callback)=>{click=callback;}}:null,
      audio:{unlock(){},click(){}},commitSettings:value=>{patch=value;if(ok)f.notifications.clearModal();else f.notifications.show('write failure');},
      showPreview:()=>previewCount++,customize:()=>{redraws++;f.notifications.open('customize');},
    });
    // The callback is production code; no rendering or WebGL is needed here.
    vm.runInContext(handler,context);click({target:{closest:()=>({dataset:{[kind]:'mint'}})}});
    assert.equal(patch[kind==='color'?'colorId':'decalId'],'mint');assert.equal(previewCount,1);assert.equal(redraws,1);
    assert.equal(f.modalNotice.hidden,ok);assert.equal(f.modalNotice.textContent,ok?'':'write failure');
  }
});
