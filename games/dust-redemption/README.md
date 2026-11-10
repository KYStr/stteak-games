# Dust & Redemption / 荒塵之旅

A complete, local-first 3D frontier campaign in Traditional Chinese. Six sequential contracts combine cover combat, evidence, negotiation, physical machinery, delivery and escort work. Decisions change residents' trust and the ending. Completed contracts can be replayed without duplicating story rewards.

## Build and play

Requires Node 22+, Python 3 and a WebGL2-capable browser. All runtime dependencies and assets are local; no accounts, external CDN or service is used.

```sh
npm --prefix games/dust-redemption ci
npm --prefix games/dust-redemption run build
python3 -m http.server 8102 --bind 127.0.0.1 --directory public
```

Open `http://127.0.0.1:8102/games/dust-redemption/`.
The authored project is `games/dust-redemption/`, including HTML, CSS, every module, and the complete original asset snapshot. `build.mjs` copies it into `public/games/dust-redemption/` and bundles pinned Three.js 0.180.0 plus its local loaders. Edit source and rebuild. Existing asset attribution is retained in `assets/games/dust-redemption/` and runtime audio manifests; Three.js retains its MIT notice in `vendor/THREE-LICENSE.txt`.

## Controls and lifecycle

- WASD or arrows: move relative to screen; mouse: aim; left button: shoot; right button: aim/peek.
- E: inspect, negotiate, take cover, operate or extract. R: reload. Space: vault low cover. F: use the one carried supply.
- Q/C or HUD arrows: rotate the camera. Escape: close an interaction or pause; Escape again resumes. Tab/Shift+Tab navigate menus.
- Touch: landscape layout with separate movement and aiming pads, fire and action buttons. Each input is released on pause or blur.
- The north-facing map shows the player, unread evidence, unfinished work and evacuation. Menus include a short guide and optional detailed chapter reference.
- Settings persist music/SFX volume (zero mutes), aim assistance, slow aim, reduced motion and low graphics. OS reduced-motion preference is respected by default.
- Save points are departure and successful return. Reload restores an unfinished contract at its safe entrance, with story choices and permanent supplies intact; partial fieldwork restarts. A damaged save is preserved before a new save replaces it. Save failures have a visible retry action.
- Blur/hidden pages pause, including fieldwork and dialogue. Resuming requires player input. Context loss freezes the simulation; after restoration the existing mission resumes through the pause menu.
- Software renderers automatically use a smaller render buffer, diffuse lighting and inexpensive contact shadows, and disable dynamic shadow maps. Hardware keeps the directional shadows; low graphics remains available.

## One-command acceptance

```sh
npm --prefix games/dust-redemption run acceptance
```

The suite builds, checks source/runtime equality, runs unit tests, starts its own HTTP server on port 8102 if needed, and launches one headless Chrome using SwiftShader. It closes its browser and its own server even on failure. Chrome is expected at `/usr/bin/google-chrome`; Playwright is imported from `/workspace/stteak8/tools/node_modules/playwright-core/index.mjs`.

Acceptance uses real keyboard, mouse and menu actions plus read-only `window.dustDiagnostics()` observations. It checks the first contract's peaceful delivery and extraction, combat/death/retry, reload recovery, settings, focus, blur, audio decode/resume, WebGL context loss and a 3-minute performance/resource run. Evidence defaults to `/tmp/dust-redemption-acceptance`; set `DUST_EVIDENCE_DIR` to choose another directory. The read-only diagnostics include render resources, audio status, positions, objective events and current profile; they do not expose teleportation or completion cheats.
