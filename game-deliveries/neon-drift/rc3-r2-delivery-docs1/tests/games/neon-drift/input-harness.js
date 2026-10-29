import fs from 'node:fs';
import vm from 'node:vm';
export function inputCode(file) {
  let code = fs.readFileSync(file, 'utf8');
  if (file.endsWith('game.js')) {
    // 只擷取已鎖定 bundle 中獨立的 Input 函式；不執行 WebGL 或主遊戲。
    const mark = code.indexOf('(pointer:coarse)');
    const start = code.lastIndexOf('function ', mark);
    if (start < 0) throw new Error('Input extraction failed');
    const body = code.indexOf('{', code.indexOf(')', start));
    let depth = 0, quote = null, escape = false, end = -1;
    for (let i = body; i < code.length; i++) {
      const ch = code[i];
      if (quote) { if (escape) escape = false; else if (ch === '\\') escape = true; else if (ch === quote) quote = null; continue; }
      if (ch === '"' || ch === "'") { quote = ch; continue; }
      if (ch === '{') depth++;
      if (ch === '}' && --depth === 0) { end = i + 1; break; }
    }
    if (end < 0) throw new Error('Input extraction failed');
    code = code.slice(start, end).replace(/^function \w+/, 'function createInput');
  } else code = code.replace('export function createInput', 'function createInput');
  return code;
}
export function makeHarness(file, { coarse = false } = {}) {
  class Target {
    listeners = new Map();
    addEventListener(type, fn) { if (!this.listeners.has(type)) this.listeners.set(type, new Set()); this.listeners.get(type).add(fn); }
    removeEventListener(type, fn) { this.listeners.get(type)?.delete(fn); }
    dispatch(type, props = {}) {
      const event = { type, target: this, repeat: false, defaultPrevented: false, preventDefault() { this.defaultPrevented = true; }, ...props };
      for (const fn of [...(this.listeners.get(type) || [])]) if (this.listeners.get(type).has(fn)) fn(event);
      return event;
    }
    closest() { return null; }
    count() { return [...this.listeners.values()].reduce((n, entries) => n + entries.size, 0); }
  }
  const classes = () => { const set = new Set(); return { add: name => set.add(name), remove: name => set.delete(name), contains: name => set.has(name), toggle(name, force) { if (force) set.add(name); else set.delete(name); } }; };
  class Button extends Target {
    constructor(control) { super(); this.dataset = { control }; this.classList = classes(); this.captures = new Set(); }
    setPointerCapture(id) { this.captures.add(id); }
    hasPointerCapture(id) { return this.captures.has(id); }
    releasePointerCapture(id) { this.captures.delete(id); this.dispatch('lostpointercapture', { pointerId: id }); }
  }
  const controls = ['left', 'right', 'throttle', 'brake', 'handbrake'];
  const buttons = Object.fromEntries(controls.map(control => [control, new Button(control)]));
  const win = new Target();
  const document = { body: { classList: classes() }, modal: false, controls: Object.values(buttons), querySelectorAll() { return this.controls; }, querySelector(selector) { if (selector === 'dialog[open]') return this.modal ? {} : null; if (selector === '#touch-throttle') return buttons.throttle; throw new Error(`Unknown selector ${selector}`); } };
  const context = { document, matchMedia: () => ({ matches: coarse }), addEventListener: win.addEventListener.bind(win), removeEventListener: win.removeEventListener.bind(win) };
  const createInput = vm.runInNewContext(`${inputCode(file)};createInput`, context, { filename: file });
  const instances = [];
  function create() {
    const calls = { gesture: 0, pause: 0, reset: 0 };
    const input = createInput({ onPause() { calls.pause++; }, onReset() { calls.reset++; }, onGesture() { calls.gesture++; } });
    input.setOptions({ autoThrottle: false, touch: false });
    const item = { input, calls }; instances.push(item); return item;
  }
  return { buttons, win, document, create, instances, countButtons: () => Object.values(buttons).reduce((n, b) => n + b.count(), 0), sample: input => JSON.parse(JSON.stringify(input.sample())) };
}
