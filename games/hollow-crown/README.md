# Hollow Crown · 餘燼之冠

A local-save, static Three.js combat game in Traditional Chinese. No service, account, network API, external font, or CDN is needed. Serve `public/` over HTTP and open `/games/hollow-crown/`.

## Play

The default **Twin Crown expedition** crosses all six arenas and then both two-phase bosses. Shorter oaths cross four branching rooms and one chosen boss. Clear every wave, choose a talent or healing, and choose the next arena. Talents can be combined across three schools, with four slots and explicit replacement. First-time players can take the five-step practical tutorial; it includes a real timed parry and cannot permanently kill the player. Difficulty, starting talent, route, seeded challenge, and appearance are chosen in camp. Completing rooms, parries, flawless rooms, or a run unlocks starting choices without permanently increasing stats.

- **WASD / arrows:** move; **mouse:** aim when auto-aim is disabled.
- **J / left mouse:** light thrust on press; hold at least 0.65s, then release for a charged thrust. The action meter says when it is ready. A light thrust costs no energy.
- **K / right mouse:** hold guard; a fresh frontal guard just before impact counters. Holding guard early reduces damage. Circles and outer rings must be avoided.
- **Space / L:** dodge with brief invulnerability; costs energy. Side-step line attacks, flank shields or use a charged thrust.
- **Escape:** pause/resume, close a secondary menu, or return from results; **M:** mute/unmute without losing volume preferences.
- On touch screens, use the movement stick, optional aim stick and three action buttons. Auto-aim is enabled initially. Canceled pointers and backgrounding release input.

## Saves and lifecycle

Settings save immediately. Active combat saves the **room entrance**, including seed, equipment, health, and enemy waves. Reload returns to camp; Continue restores that entrance. Rewards and route choices save exactly without rerolling or duplicate settlement. A validated backup recovers a corrupt/missing primary. Corrupt/unsupported data safely rebuilds camp with a visible notice; unavailable storage remains playable with an export option. Export is a JSON backup; importing is not currently exposed.

Blur and hidden tabs pause combat and audio; the player explicitly resumes. Dialogs contain keyboard focus. Reduced-motion follows the system preference or setting. WebGL context loss freezes the game and offers a reload to the saved entrance. There is no invisible simulation recovery behind that screen.

## Build and validation

Runtime modules in `public/games/hollow-crown/` are the editable source of truth. The parametric model source is `assets/games/hollow-crown/sources/kit.mjs`. Rebuild vendors, reusable GLBs, matching runtime kit, textures, audio and manifests:

```sh
npm --prefix games/hollow-crown ci --registry=https://registry.npmjs.org
npm --prefix games/hollow-crown run build
npm --prefix games/hollow-crown run check
```

`check` runs all Node unit tests, the headless Chrome acceptance suite, and targeted layout assertions. It owns **127.0.0.1:8103**, so stop any previous server on that port first. It imports Playwright from `/workspace/stteak8/tools/node_modules/playwright-core/index.mjs` (override with `PLAYWRIGHT_PATH`) and uses `/usr/bin/google-chrome` with SwiftShader. It always closes Chrome and its HTTP server. Screenshots and `acceptance.json` are written to `tests/hollow-crown/artifacts/`.

The suite verifies gesture audio, practical tutorial, actual movement/combat, focus, settings, mute, blur/audio pause, reload/Continue, an entire Twin Crown win through keyboard/menu input, death/restart, a minimum three-minute live run with GC heap/listener measurements, responsive dialogs, corrupt-save recovery, reduced motion, and context-loss recovery. It records console errors and failed requests. The controller reads copied telemetry and exact threat geometry; it is automation evidence, not a human usability study. The standalone unit command is `npm --prefix games/hollow-crown test`. Use `HOLLOW_SOAK_MS` only to extend the default 180000ms soak or for a shorter development run.

Automatic graphics detect software rendering, use simpler stone geometry, vertex lighting and contact shadows there, and adapt canvas resolution to measured frame times. Hardware retains PBR materials and directional shadows. High and Low settings select the shadow/geometry tier; resolution still adapts, while DOM text stays at native resolution. Read-only `window.hollowCrownDiagnostics` reports copied state, frame timing, drawing buffer, bounded actor/resources, audio and storage status.

All geometry, stone textures, and audio are original procedural assets. Engine and asset notices remain in place; Three.js is pinned to 0.180.0 and MIT licensed.

Round 1 measurements and limitations are recorded in `docs/hollow-crown-r1.md`; the acceptance JSON contains measured frame timings without imposing a misleading performance pass threshold.
