// Weak targets avoid making the observer itself retain abandoned DOM/audio nodes.
export function installListenerAudit() {
  const add = EventTarget.prototype.addEventListener,
    remove = EventTarget.prototype.removeEventListener;
  const records = new WeakMap(),
    counts = {};
  const stable = (t) =>
    t === window
      ? "window"
      : t === document
        ? "document"
        : t?.id === "world"
          ? "canvas"
          : null;
  EventTarget.prototype.addEventListener = function (type, fn, options) {
    const name = stable(this),
      capture =
        typeof options === "boolean" ? options : Boolean(options?.capture);
    if (name && fn) {
      let list = records.get(this);
      if (!list) records.set(this, (list = []));
      if (
        !list.some(
          (r) => r.type === type && r.fn === fn && r.capture === capture,
        )
      ) {
        list.push({ type, fn, capture });
        counts[`${name}:${type}:${capture}`] =
          (counts[`${name}:${type}:${capture}`] || 0) + 1;
      }
    }
    return add.call(this, type, fn, options);
  };
  EventTarget.prototype.removeEventListener = function (type, fn, options) {
    const name = stable(this),
      capture =
        typeof options === "boolean" ? options : Boolean(options?.capture),
      list = records.get(this);
    if (name && list) {
      const i = list.findIndex(
        (r) => r.type === type && r.fn === fn && r.capture === capture,
      );
      if (i >= 0) {
        list.splice(i, 1);
        counts[`${name}:${type}:${capture}`]--;
      }
    }
    return remove.call(this, type, fn, options);
  };
  window.__listenerAudit = () => ({ ...counts });
}
