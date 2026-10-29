// Native modal dialogs make their body siblings inert. Keep modal notices in
// the dialog, outside the content replaced when customization is redrawn.
export function createNotifications({dialog,modalNotice,toast,setTimer=setTimeout,clearTimer=clearTimeout}){
  let timer=null,kind='';
  function clearModal(){modalNotice.textContent='';modalNotice.hidden=true;}
  function clearToast(){clearTimer(timer);timer=null;toast.hidden=true;toast.textContent='';}
  return {
    show(message){
      clearToast();
      if(dialog.open){modalNotice.textContent=message;modalNotice.hidden=false;return;}
      toast.textContent=message;toast.hidden=false;timer=setTimer(()=>{toast.hidden=true;timer=null;},5000);
    },
    open(nextKind){clearToast();if(!dialog.open||kind!==nextKind)clearModal();kind=nextKind;},
    close(){clearModal();kind='';},
    clearModal,
  };
}
