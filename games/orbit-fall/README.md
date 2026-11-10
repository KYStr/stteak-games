# Orbit / Fall — 失落軌道

A local, single-player zero-gravity station adventure. Three decks, twelve rooms,
six physical repairs, six crew recordings, two endings, and three timed challenges.
Designed for a first journey of roughly 15–25 minutes. All models, narrative and
sound are original; Three.js (MIT) and Rapier (Apache-2.0) notices remain included.

## Build and play

```sh
npm ci --prefix games/orbit-fall
npm --prefix games/orbit-fall run build
python3 -m http.server 8106 --bind 127.0.0.1 --directory public
```

Open `http://127.0.0.1:8106/games/orbit-fall/`. No network services or account needed.
The complete recovered application lives in `src/`; `build.mjs` copies it and the
pinned dependencies to `public/games/orbit-fall/`. `optics.js` and `hazards.js` retain
their original source locations next to the builder. Original procedural asset
recipes and provenance are retained in `assets/games/orbit-fall/`; models and audio
are already included in the runtime. Do not edit generated runtime modules.

## Controls

- WASD / arrows: accelerate horizontally relative to the camera; release to coast.
- Q / E: ascend / descend. Space: hold to brake. Shift: toggle magnetic boots near a wall/floor.
- T or the tether button: connect a battery within 4.2 m. Move it near the outlined socket, brake for 1.5 seconds.
- F or click a nearby device: interact. C: switch camera; drag background in follow view to orbit.
- M: station map. Travel from a safe room or near the marked exit. Escape: pause / close a menu.
- Touch devices have a joystick, elevation and brake buttons. Keyboard/mouse are the verified desktop controls.

Collect boots/tether from the first room's equipment rack. Repair two devices to
open the next deck. Safe rooms refill oxygen and health. All six repairs open the
energy terminal in C4; completing an ending opens the timed challenges.

The title and pause menus expose music/SFX volume, reduced motion, height assist
and low graphics. Software renderers automatically use a bounded drawing buffer
and disable expensive shadows; DOM text stays at native resolution. Menus trap
keyboard focus and pause oxygen, hazards and timers. Blur/hidden tabs pause and
clear held controls. WebGL loss preserves progress and waits for recovery.

Autosaves run every 20 seconds, on room changes, interactions and pause. Continue
restores position, battery locations, partial dials/sequences and permanent progress;
velocities and tether connections reset safely. Stories and challenges have separate
slots. Export/import a story backup through the title or pause menu. Import is only
available at the title, with a preview and explicit overwrite confirmation. Backups
are local downloads, never uploaded. Corrupt saves recover a validated backup when
available; future schemas are preserved. Save failure remains visibly reported.

## Acceptance tests — one command

```sh
npm --prefix games/orbit-fall test
```

Requires `/usr/bin/google-chrome`, Python 3, and the shared Playwright installation
at `/workspace/stteak8/tools/node_modules/playwright-core`. Port 8106 must be free.
The command rebuilds, runs 67 unit/integration tests and launches exactly one
headless SwiftShader browser. The browser flies through every repair using real
keyboard input, reads every recording, reaches both endings and completes a timed
challenge. It also checks partial-state reload, save/import/export, corruption and
future schema protection, failure/recovery, blur/visibility, focus, mute and audio
resume, real WebGL context loss/restoration, both desktop viewport sizes, and a
three-minute performance/memory soak. Artifacts are in `tests/orbit-fall/evidence/`.
The browser and test server close in `finally`.

For an already running server, set `ORBIT_TEST_URL` to its game URL. For a quick
development smoke, set `ORBIT_SOAK_SECONDS=5`; final acceptance uses 180 seconds.
`window.__orbitDiagnostics` is read-only telemetry, with no progression shortcuts.

Physical mobile-device and physical GPU validation are outside this headless round.

Round-one measurement under concurrent shared-host CPU load (~54): the 180-second
SwiftShader soak measured 79.5 ms average / 150 ms p95 at the adaptive 540×303
drawing buffer. Retained heap grew 0.48 MB; DOM nodes (232) and listeners (74)
remained unchanged, with zero console errors or failed requests. Software rendering
under heavy parallel load remains a performance limitation; this is not a claim
of a 90+ performance score. Round evidence is retained in the work handoff directory.
