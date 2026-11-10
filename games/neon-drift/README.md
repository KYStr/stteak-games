# Neon Drift — 霓虹疾行

An original, local single-player Three.js racing game. Three closed 3D districts, three cars with distinct handling, two-lap time trials, 120-second drift challenges, a separate driving school, personal lap ghosts, medals and unlockable paint/decal combinations. Six challenge cards provide over ten minutes of driving before retries and medal improvement.

## Build and play

```sh
npm --prefix games/neon-drift ci
npm --prefix games/neon-drift run build
python3 -m http.server 8105 --bind 127.0.0.1 --directory public
```

Open `http://127.0.0.1:8105/games/neon-drift/`. All modules, models and original audio are local; no accounts, remote APIs or CDN are required. Source is `src/`; `tools/build.mjs` bundles Three.js 0.170.0 into the public runtime. Asset generation uses a fixed random seed, producing identical assets on repeat builds. Third-party Three.js license is shipped as `THREE-LICENSE.txt`; original asset provenance remains in `assets/games/neon-drift/`.

## Controls and goals

- Keyboard: W / ↑ throttle, S / ↓ brake then reverse, A/D / ←/→ steering, Space handbrake, R recover to the last legal checkpoint (+2 seconds), Escape pause/resume.
- Standard gamepad: left stick steering, RT throttle, LT brake/reverse, A handbrake, Y recover, Start pause/resume. Menus support keyboard and pointer; press Enter/Space to activate a focused button.
- Touch: left steering buttons, right brake/handbrake; automatic throttle by default. Settings can show touch controls and enable a manual throttle pedal.
- Time trial: cross eight checkpoints in order on each of two laps. The run ends after five minutes if incomplete. Use the minimap, curve signs and upcoming-turn cue; brake before tight bends.
- Drift: build speed above 40 km/h, turn with the handbrake, sustain the slide and release/countersteer to bank points. Walls reduce the pending score. Low-speed spins and reverse driving cannot farm points.
- Driving school: follow five tasks in the separate wide practice circuit. The help dialog gives a timed keyboard example. Once all five tasks are complete, the Finish School button saves completion immediately; remaining practice time is optional.

Settings include independent sound/music volume (zero mutes), per-car sensitivity, ghost toggle, quality, reduced motion and speed FOV. System reduced-motion preference is honored. Dialogs use native focus containment and Escape. Menus scroll at short heights; HUD text remains native resolution even when the 3D buffer is scaled.

## Save and lifecycle

Settings, tutorial completion and legal best results are stored in `stteak:neon-drift:save`, with an independent recovery backup. Missing or corrupt primary data recovers a readable backup; incompatible ghosts are discarded while medals and records remain. A blocked/quota-limited store produces a visible notice. JSON export is available in Settings.

In-progress races use a separate versioned `stteak:neon-drift:race` snapshot every five seconds and on pause/page hide. Reload opens the garage with **繼續上次比賽**; continuing restores a paused race for review before resuming. Returning to the garage from a paused race or starting another race abandons the pending session. Snapshots never award medals or replace records. Corrupt/incompatible sessions are ignored. Blur and hidden documents pause audio and input; pointer capture is released. A scheduling gap over two seconds also pauses rather than fast-forwarding. WebGL context loss freezes play and saves progress; context restoration rebuilds the scene, and reload remains available.

## Automated acceptance

From the repository root, with port **8105 free**:

```sh
npm --prefix games/neon-drift run acceptance
```

This builds source/runtime, runs the Node unit suite, then launches one headless Chrome with SwiftShader. The suite owns and stops its HTTP server and closes Chrome even on failure. It requires `/usr/bin/google-chrome` and `/workspace/stteak8/tools/node_modules/playwright-core`. It takes roughly 4–7 minutes depending on host load. Optional `NEON_ARTIFACT_DIR=/absolute/path` selects the screenshots and JSON evidence directory (default `/tmp/neon-drift-acceptance`).

The browser suite checks zero console/page errors, failed HTTP requests and CSP violations; gesture-only audio creation/unlock and suspended-context recovery; blur pause; exact reload/continue; a legal two-lap finish and drift result through an acceptance-only analog gamepad driver; result persistence; 720p/1080p/mobile layouts; and WebGL context loss/restoration. It records frame mean/p95, a three-minute heap/listener comparison, and screenshots. The driver lives only in `tests/`, never in shipped code, and writes controller input rather than positions, checkpoints, timers or scores. Unit tests cover every car/course, scoring exploits, checkpoint legality, fixed-step determinism, save corruption/quota recovery and deterministic resumed results.

The renderer uses instanced scenery, distance culling, batched vehicle body meshes and a bounded diagnostics history. SwiftShader automatically uses simpler lighting/materials and a smaller drawing buffer; explicit Low/Medium/High settings select different resolutions; actual frame times depend on CPU contention. Audio output is programmatically verified; subjective listening and broad real-device testing remain separate review work.
