// Same-origin bundled bridge v1. No query-controlled origins or wildcard messages.
export class GameBridge {
  constructor(onCommand) {
    this.session = new URLSearchParams(location.search).get('session'); this.initialized = false; this.ready = false;
    this.onCommand = typeof onCommand === 'function' ? onCommand : null; this.disposed = false; this.failure = null;
    this.listener = e => {
      const d = e.data;
      if (this.disposed || window.parent === window || !this.session || e.source !== window.parent || e.origin !== location.origin || !d || typeof d !== 'object' || Array.isArray(d) || d.protocol !== 'stteak-game' || d.version !== 1 || d.sessionId !== this.session || !d.payload || typeof d.payload !== 'object' || Array.isArray(d.payload)) return;
      if (d.type === 'host:init') {
        if (d.payload.gameId !== 'hollow-crown' || typeof d.payload.title !== 'string') return;
        if (Object.keys(d.payload).some(key => !['gameId','title','image','accent'].includes(key)) || ['image','accent'].some(key => key in d.payload && typeof d.payload[key] !== 'string')) return;
        this.initialized = true;
        if (this.failure) this.send('game:error', { message: this.failure });
        else if (this.ready) this.send('game:ready', { capabilities: ['pause', 'resume', 'restart'] });
      } else if (this.initialized && this.ready && this.onCommand && ['host:start','host:pause','host:resume','host:restart'].includes(d.type) && Object.keys(d.payload).length === 0) this.onCommand(d.type);
    };
    addEventListener('message', this.listener);
  }
  bind(onCommand) { if (!this.disposed && typeof onCommand === 'function') this.onCommand = onCommand; return this; }
  send(type, payload) { if (!this.disposed && this.initialized && this.session) window.parent.postMessage({protocol:'stteak-game',version:1,sessionId:this.session,type,payload}, location.origin); }
  loaded() { if (this.disposed || this.failure || !this.onCommand) return; this.ready = true; this.send('game:ready', { capabilities:['pause','resume','restart'] }); }
  state(state) { if (this.ready) this.send('game:state',{state}); }
  error(message) { if (this.disposed) return; this.failure = String(message).slice(0,300); this.ready = false; this.send('game:error',{message:this.failure}); }
  dispose() { if (this.disposed) return; this.disposed = true; this.ready = false; this.onCommand = null; removeEventListener('message',this.listener); }
}

// boot.js establishes this listener before its dynamic import can delay main.js.
// main.js binds the same instance; early commands are discarded, never queued.
let activeBridge = null;
export function getGameBridge(onCommand) {
  if (!activeBridge || activeBridge.disposed) activeBridge = new GameBridge();
  return activeBridge.bind(onCommand);
}
