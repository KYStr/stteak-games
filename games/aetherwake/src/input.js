export class FlightInput {
  constructor(canvas, actions) {
    this.keys = new Set();
    this.axes = { x: 0, z: 0 };
    this.glide = false;
    this.touchBrake = false;
    this.brakePointer = null;
    this.enabled = false;
    this.actions = actions;
    this.listeners = [];
    this.disposed = false;
    this.pointerCaptures = new Map();
    this.cameraPointer = null;
    this.cameraMousePointer = null;
    this.joyPointer = null;
    const on = (el, type, fn, opts) => {
      el.addEventListener(type, fn, opts);
      this.listeners.push(() => el.removeEventListener(type, fn, opts));
    };
    on(window, "keydown", (e) => {
      if (e.defaultPrevented) return;
      // Escape remains available while a slider or other form control owns
      // focus. It dismisses the current modal before changing game pause state.
      if (e.code === "Escape") {
        e.preventDefault();
        if (!e.repeat) actions.pause();
        return;
      }
      if (/INPUT|SELECT|TEXTAREA/.test(e.target.tagName)) return;
      if (
        [
          "Space",
          "ArrowUp",
          "ArrowDown",
          "ArrowLeft",
          "ArrowRight",
          "KeyW",
          "KeyA",
          "KeyS",
          "KeyD",
          "ShiftLeft",
          "ShiftRight",
          "KeyE",
          "KeyC",
          "KeyV",
          "KeyH",
        ].includes(e.code)
      ) {
        if (e.code === "Space" && e.target.tagName === "BUTTON") return;
        e.preventDefault();
        if (!e.repeat) {
          if (e.code === "KeyH") actions.help();
          if (e.code === "KeyV") actions.view();
          if (e.code === "KeyC") actions.recenter();
          if (e.code === "KeyE" && this.enabled) actions.interact();
          if (e.code === "Space" && this.enabled) this.glide = true;
        }
        if (this.enabled) this.keys.add(e.code);
      }
    });
    on(window, "keyup", (e) => this.keys.delete(e.code));
    on(window, "blur", () => {
      this.clear();
      actions.blur();
    });
    on(document, "visibilitychange", () => {
      if (document.hidden) {
        this.clear();
        actions.blur();
      }
    });
    on(canvas, "contextmenu", (e) => e.preventDefault());
    const hasButtons = (e) => Number.isInteger(e.buttons) && e.buttons >= 0;
    const endCamera = (e) => {
      if (
        this.cameraMousePointer !== e.pointerId &&
        this.cameraPointer?.id !== e.pointerId
      ) return;
      // Forget both the active drag and its mouse session before capture loss.
      this.cameraPointer = null;
      this.cameraMousePointer = null;
      this.releasePointer(canvas, e.pointerId);
    };
    on(canvas, "pointerdown", (e) => {
      if (this.cameraPointer !== null || this.cameraMousePointer !== null) return;
      if (e.pointerType === "mouse" && hasButtons(e)) {
        if (!e.buttons || !this.capturePointer(canvas, e.pointerId)) return;
        // Intermediate mouse presses/releases arrive as buttons changes on
        // pointermove. Remember only sessions that actually began here.
        this.cameraMousePointer = e.pointerId;
        if (e.buttons & 2)
          this.cameraPointer = { id: e.pointerId, x: e.clientX, y: e.clientY };
        return;
      }
      if (e.button === 2 || e.pointerType === "touch") {
        if (!this.capturePointer(canvas, e.pointerId)) return;
        this.cameraPointer = { id: e.pointerId, x: e.clientX, y: e.clientY };
      }
    });
    on(canvas, "pointermove", (e) => {
      if (this.cameraMousePointer === e.pointerId) {
        if (!hasButtons(e) || e.pointerType === "touch") return;
        if (!e.buttons) return endCamera(e);
        if (!(e.buttons & 2)) {
          this.cameraPointer = null;
          return;
        }
        if (!this.cameraPointer) {
          // A newly added/re-added right button starts at this position, not
          // at an old left-button position, so acquisition cannot jump.
          this.cameraPointer = { id: e.pointerId, x: e.clientX, y: e.clientY };
          return;
        }
      }
      const p = this.cameraPointer;
      if (!p || p.id !== e.pointerId) return;
      actions.rotate((e.clientX - p.x) * 0.005, (e.clientY - p.y) * 0.004);
      p.x = e.clientX;
      p.y = e.clientY;
    });
    on(canvas, "pointerup", endCamera);
    on(canvas, "pointercancel", endCamera);
    on(canvas, "lostpointercapture", endCamera);
    on(
      canvas,
      "wheel",
      (e) => {
        e.preventDefault();
        actions.zoom(e.deltaY * 0.02);
      },
      { passive: false },
    );
    const joy = document.querySelector("#joystick"),
      stick = document.querySelector("#stick");
    const move = (e) => {
      if (this.joyPointer !== e.pointerId || !this.enabled) return;
      const r = joy.getBoundingClientRect(),
        x = e.clientX - r.left - r.width / 2,
        y = e.clientY - r.top - r.height / 2,
        n = Math.hypot(x, y),
        m = Math.min(n, r.width * 0.32),
        dx = n ? (x / n) * m : 0,
        dy = n ? (y / n) * m : 0;
      this.axes = { x: dx / (r.width * 0.32), z: dy / (r.height * 0.32) };
      stick.style.transform = `translate(${dx}px,${dy}px)`;
    };
    on(joy, "pointerdown", (e) => {
      e.preventDefault();
      if (this.joyPointer !== null) return;
      if (!this.capturePointer(joy, e.pointerId)) return;
      this.joyPointer = e.pointerId;
      move(e);
    });
    on(joy, "pointermove", move);
    const endJoy = (e) => {
      if (this.joyPointer !== e.pointerId) return;
      this.joyPointer = null;
      this.axes = { x: 0, z: 0 };
      stick.style.transform = "";
      this.releasePointer(joy, e.pointerId);
    };
    on(joy, "pointerup", endJoy);
    on(joy, "pointercancel", endJoy);
    on(joy, "lostpointercapture", endJoy);
    const glide = document.querySelector("#touch-glide");
    on(glide, "pointerdown", (e) => {
      e.preventDefault();
      if (this.enabled) this.glide = true;
    });
    const brake = document.querySelector("#touch-brake");
    on(brake, "pointerdown", (e) => {
      e.preventDefault();
      if (this.enabled && this.brakePointer === null) {
        if (!this.capturePointer(brake, e.pointerId)) return;
        this.brakePointer = e.pointerId;
        this.touchBrake = true;
      }
    });
    const endBrake = (e) => {
      if (this.brakePointer !== e.pointerId) return;
      this.brakePointer = null;
      this.touchBrake = false;
      this.releasePointer(brake, e.pointerId);
    };
    for (const t of ["pointerup", "pointercancel", "lostpointercapture"])
      on(brake, t, endBrake);
    on(document.querySelector("#touch-reset"), "click", actions.recenter);
  }
  capturePointer(element, pointerId) {
    try {
      element.setPointerCapture(pointerId);
      this.pointerCaptures.set(element, pointerId);
      return true;
    } catch {
      // A vanished pointer must not leave a phantom control owner.
      return false;
    }
  }
  releasePointer(element, pointerId) {
    if (this.pointerCaptures.get(element) === pointerId)
      this.pointerCaptures.delete(element);
    try {
      if (element.hasPointerCapture(pointerId))
        element.releasePointerCapture(pointerId);
    } catch {
      // Teardown remains neutral if the browser already invalidated capture.
    }
  }
  read(yaw = 0) {
    if (!this.enabled) return { x: 0, z: 0, brake: false, glide: false };
    const x =
      (this.keys.has("KeyD") || this.keys.has("ArrowRight") ? 1 : 0) -
      (this.keys.has("KeyA") || this.keys.has("ArrowLeft") ? 1 : 0) +
      this.axes.x;
    const z =
      (this.keys.has("KeyS") || this.keys.has("ArrowDown") ? 1 : 0) -
      (this.keys.has("KeyW") || this.keys.has("ArrowUp") ? 1 : 0) +
      this.axes.z;
    const n = Math.max(1, Math.hypot(x, z)),
      result = {
        x: (x * Math.cos(yaw) + z * Math.sin(yaw)) / n,
        z: (z * Math.cos(yaw) - x * Math.sin(yaw)) / n,
        brake:
          this.touchBrake ||
          this.keys.has("ShiftLeft") ||
          this.keys.has("ShiftRight"),
        glide: this.glide,
      };
    this.glide = false;
    return result;
  }
  clear() {
    const captures = [...this.pointerCaptures];
    this.pointerCaptures.clear();
    this.keys.clear();
    this.glide = false;
    this.axes = { x: 0, z: 0 };
    this.touchBrake = false;
    this.brakePointer = null;
    this.joyPointer = null;
    this.cameraPointer = null;
    this.cameraMousePointer = null;
    document.querySelector("#stick").style.transform = "";
    // Neutralize every owner before release can synchronously dispatch loss.
    for (const [element, pointerId] of captures)
      this.releasePointer(element, pointerId);
  }
  setEnabled(value) {
    this.enabled = value;
    if (!value) this.clear();
  }
  dispose() {
    if (this.disposed) return;
    this.disposed = true;
    this.listeners.forEach((fn) => fn());
    this.listeners.length = 0;
    this.clear();
  }
}
