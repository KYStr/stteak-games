import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

// CPU-only DOM event/capture bookkeeping, not a browser or native dispatch model.
class Element {
  constructor(tagName = 'DIV') { this.tagName = tagName; this.listeners = new Map(); this.style = {}; this.captures = new Set(); this.captureCalls = []; this.failCapture = false; }
  addEventListener(type, fn) { const list = this.listeners.get(type) ?? []; list.push(fn); this.listeners.set(type, list); }
  removeEventListener(type, fn) { this.listeners.set(type, (this.listeners.get(type) ?? []).filter(f => f !== fn)); }
  dispatch(type, init = {}) {
    const e = { target: this, pointerId: 1, pointerType: 'touch', button: 0, clientX: 50, clientY: 50, defaultPrevented: false, repeat: false, preventDefault() { this.defaultPrevented = true; }, ...init };
    // Native loss means the capture is already gone. Terminal up/cancel also
    // implicitly releases capture after delivery, then dispatches loss.
    if (type === 'lostpointercapture') this.captures.delete(e.pointerId);
    for (const fn of [...(this.listeners.get(type) ?? [])]) fn(e);
    if (['pointerup', 'pointercancel'].includes(type) && this.captures.delete(e.pointerId))
      this.dispatch('lostpointercapture', { pointerId: e.pointerId });
    return e;
  }
  setPointerCapture(id) { this.captureCalls.push(id); if (this.failCapture) throw new Error('synthetic capture failure'); this.captures.add(id); }
  hasPointerCapture(id) { return this.captures.has(id); }
  releasePointerCapture(id) { if (this.captures.delete(id)) this.dispatch('lostpointercapture', { pointerId: id }); }
  getBoundingClientRect() { return { left: 0, top: 0, width: 100, height: 100 }; }
  listenerCount() { return [...this.listeners.values()].reduce((n, a) => n + a.length, 0); }
}
export function createHarness() {
  const script = readFileSync(new URL('../../../games/aetherwake/src/input.js', import.meta.url), 'utf8').replace(/^export class FlightInput/, 'class FlightInput') + '\nFlightInput';
  const win = new Element('WINDOW'), doc = new Element('DOCUMENT'); doc.hidden = false;
  const canvas = new Element('CANVAS'), joy = new Element(), stick = new Element(), brake = new Element('BUTTON'), glide = new Element('BUTTON'), reset = new Element('BUTTON');
  const nodes = { '#joystick': joy, '#stick': stick, '#touch-brake': brake, '#touch-glide': glide, '#touch-reset': reset };
  doc.querySelector = id => { if (!nodes[id]) throw new Error(`Missing fixture element ${id}`); return nodes[id]; };
  const calls = { rotate: [], zoom: [], pause: 0, help: 0, view: 0, recenter: 0, interact: 0, blur: 0 };
  const actions = Object.fromEntries(Object.keys(calls).map(key => [key, (...args) => { if (Array.isArray(calls[key])) calls[key].push(args); else calls[key]++; }]));
  const FlightInput = vm.runInNewContext(script, { window: win, document: doc, Math, Set }, { filename: 'production-source-input.js' });
  const input = new FlightInput(canvas, actions); input.setEnabled(true);
  return { FlightInput, actions, input, canvas, joy, stick, brake, glide, reset, win, doc, calls, elements: [win, doc, canvas, joy, stick, brake, glide, reset] };
}
