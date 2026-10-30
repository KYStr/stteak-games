// Bundled bridge v1. Only the same-origin parent, exact session and known payloads are accepted.
const isPlainRecord = (value) => {
  if (value === null || typeof value !== "object") return false;
  const prototype = Object.getPrototypeOf(value);
  return prototype === Object.prototype || prototype === null;
};

export class HostBridge {
  constructor(handlers) {
    this.handlers = handlers;
    this.ready = false;
    this.currentState = "ready";
    this.session = new URLSearchParams(location.search).get("session");
    this.embedded = window.parent !== window && Boolean(this.session);
    this.listener = (e) => this.receive(e);
    window.addEventListener("message", this.listener);
  }
  send(type, payload = {}) {
    if (this.embedded)
      window.parent.postMessage(
        {
          protocol: "stteak-game",
          version: 1,
          sessionId: this.session,
          type,
          payload,
        },
        location.origin,
      );
  }
  setReady() {
    this.ready = true;
    this.send("game:ready", {
      capabilities: [
        "pause",
        "resume",
        "restart",
        "keyboard",
        "touch",
        "local-save",
      ],
    });
    this.state(this.currentState);
  }
  state(state) {
    this.currentState = state;
    this.send("game:state", { state });
  }
  receive(event) {
    const d = event.data;
    if (
      !this.embedded ||
      event.source !== window.parent ||
      event.origin !== location.origin ||
      !isPlainRecord(d) ||
      d.protocol !== "stteak-game" ||
      d.version !== 1 ||
      d.sessionId !== this.session ||
      !isPlainRecord(d.payload)
    )
      return;
    if (d.type === "host:init") {
      if (
        d.payload.gameId === "aetherwake" &&
        typeof d.payload.title === "string" &&
        this.ready
      )
        this.setReady();
      return;
    }
    if (
      !["host:start", "host:pause", "host:resume", "host:restart"].includes(
        d.type,
      ) ||
      Object.keys(d.payload).length
    )
      return;
    if (this.ready) this.handlers[d.type]?.();
  }
  dispose() {
    window.removeEventListener("message", this.listener);
  }
}
