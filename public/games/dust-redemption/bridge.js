const sessionId = new URLSearchParams(location.search).get("session");
const origin = location.origin;
export function createBridge(actions) {
  let initialized = false,
    ready = false;
  function send(type, payload) {
    if (window.parent !== window && sessionId && initialized)
      window.parent.postMessage(
        { protocol: "stteak-game", version: 1, sessionId, type, payload },
        origin,
      );
  }
  function listener(event) {
    const m = event.data;
    if (
      event.source !== window.parent ||
      event.origin !== origin ||
      !sessionId ||
      !m ||
      m.protocol !== "stteak-game" ||
      m.version !== 1 ||
      m.sessionId !== sessionId ||
      !m.payload ||
      typeof m.payload !== "object" ||
      Array.isArray(m.payload)
    )
      return;
    if (m.type === "host:init") {
      if (
        m.payload.gameId !== "dust-redemption" ||
        typeof m.payload.title !== "string"
      )
        return;
      initialized = true;
      if (ready)
        send("game:ready", { capabilities: ["pause", "resume", "restart"] });
      return;
    }
    if (!initialized || !ready || Object.keys(m.payload).length) return;
    const action = {
      "host:start": "start",
      "host:pause": "pause",
      "host:resume": "resume",
      "host:restart": "restart",
    }[m.type];
    if (action) actions[action]();
  }
  window.addEventListener("message", listener);
  return {
    ready() {
      ready = true;
      send("game:ready", { capabilities: ["pause", "resume", "restart"] });
    },
    state(state) {
      send("game:state", { state });
    },
    error(message) {
      send("game:error", { message: String(message).slice(0, 300) });
    },
    dispose() {
      window.removeEventListener("message", listener);
    },
  };
}
