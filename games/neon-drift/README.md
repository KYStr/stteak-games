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
- Midnight Tour: the primary action links Harbor time/drift, Skyway time/drift and Oldtown time/drift into a six-stage run of about 12 minutes. Read each stage hint and select Continue; failed stages offer Retry or Abandon. Tour stage boundaries and active races survive reload. A uint32 seed (0–4294967295; blank generates a fresh seed) assigns mirrored/original courses by its low three bits, one bit per district. Seeds 1 and 2 change playable geometry; the same seed repeats the layout. Tour records are separate from Free Drive, and final bests use the three-layout signature.
- Drift: bank at least the displayed bronze target within 120 seconds to win (Harbor 600, Skyway 120, Oldtown 650). Build speed above 40 km/h, turn with the handbrake, sustain the slide and release/countersteer to bank points. Walls reduce the pending score. Low-speed spins and reverse driving cannot farm points.
- Driving school: follow five tasks in the separate wide practice circuit. The help dialog gives a timed keyboard example. Once all five tasks are complete, the Finish School button saves completion immediately; remaining practice time is optional.

Settings include independent sound/music volume (zero mutes), per-car sensitivity, ghost toggle, quality, reduced motion and speed FOV. System reduced-motion changes apply immediately during driving, combined with the app override. Dialogs use native focus containment and Escape. Menus scroll at short heights; HUD text remains native resolution even when the 3D buffer is scaled.

## Save and lifecycle

Settings, tutorial completion and legal best results are stored in `stteak:neon-drift:save`, with an independent recovery backup. Missing or corrupt primary data recovers a readable backup; incompatible ghosts are discarded while medals and records remain. A blocked/quota-limited store produces a visible notice. JSON export is available in Settings.

In-progress races use a separate versioned `stteak:neon-drift:race` snapshot every five seconds and on pause/page hide. Reload opens the garage with **繼續上次比賽**; continuing restores a paused race for review before resuming. Returning to the garage from a paused race or starting another race abandons the pending session. Snapshots never award medals or replace records. Corrupt/incompatible sessions are ignored. Blur and hidden documents pause audio and input; pointer capture is released. A scheduling gap over two seconds also pauses rather than fast-forwarding. WebGL context loss freezes play and saves progress; context restoration rebuilds the scene, and reload remains available.

## Automated acceptance

From the repository root, with port **8105 free**:

```sh
NEON_PORT=8105 NEON_ARTIFACT_DIR=/tmp/neon-drift-acceptance npm --prefix games/neon-drift run acceptance
```

The port is configurable with `NEON_PORT` (integer 1024–65535); the builder uses only 8105 or 8115. The command builds the runtime, runs the Node unit suite, then launches one headless Chrome with SwiftShader, with the required autoplay-policy flag (the game still creates no AudioContext before a gesture). The browser and owned HTTP server close in `finally`. Requirements: `/usr/bin/google-chrome` and `/workspace/stteak8/tools/node_modules/playwright-core`. Allow 30–50 minutes on a shared software renderer. `acceptance.json`, failure screenshots, matched district screenshots and `profile-on.json` are written under `NEON_ARTIFACT_DIR`. `passed:false` or `complete:false` is a failed/incomplete run; artifacts alone do not imply success.

Coverage includes gesture-only audio creation, audible signal and settled mute, suspended-context recovery, blur/visibility pause, exact reload/Continue, repeated Escape versus fresh presses, complete reset of all three storage keys and live audio defaults, partial storage deletion failure, keyboard selector/swatch focus, dialog traversal at 720p/1080p, the documented school key sequence and early Finish persistence, idle 90-second failure and Retry, reduced-motion event expiry, legal time-trial and drift results, mobile countdown, WebGL loss/recovery, and gamepad Start while static rendering is frozen. An acceptance-only analog gamepad driver supplies legal inputs; it never writes race positions, timers, checkpoints or scores and is absent from shipped code.

The suite regenerates original assets and rebuilds twice into temporary directories, comparing every runtime/model/audio/license file against the shipped build. Unit tests cover physics, legal checkpoints, all cars/tracks, scoring exploits, save corruption/quota recovery, deterministic resume, repeated Escape and partial reset failures.

Performance evidence uses a ten-second warmup for each district/viewport, full laps on every district, and at least 180 active seconds after baseline at **each** 1280×720 and 1920×1080 viewport. Pauses/countdowns do not count. SwiftShader frame means/p95 are reference observations only. Gates enforce calls ≤250, triangles ≤1.5M, texture storage ≤256 MiB, DPR ≤2, full non-render update p95 ≤6 ms, and post-GC heap growth <10% with equal resources in matching scenes. Maxima, >100 ms counts, scheduling interruptions, sample timestamps/phases, GC-normalized heap/listeners, game-only pending RAF and renderer resources remain in the report. The test pilot has its own extra RAF, excluded from the game counter. The bounded numeric update ring includes gamepad polling, physics, audio, HUD and camera/scene/particle updates, excluding renderer submission. Auto quality evaluates cost windows with two-window fallback and five-window recovery hysteresis; manual quality remains explicit. Shared-host SwiftShader wall times are reported as observations, not isolated renderer cost.

Normal play retains bounded frame history and lightweight update totals. Append `?profile=1` to enable detailed CPU rows, browser PerformanceObservers and sparse GPU queries; diagnostic exports explicitly mark omitted samples otherwise. Profiling-on measurements are recorded separately. Software Auto and Medium initially render at up to 960×540 with one FXAA edge pass; Low explicitly selects 540×304, High 1080×607. HUD remains native resolution. Static scenery uses baked directional vertex colors, colored unlit neon and instanced district landmarks. Paused/result/garage scenes stop rendering after transitions settle, while one RAF continues polling gamepad Start. Selection, resize, asset load, context recovery and resume invalidate the image.

Original models/audio provenance and Three.js notices remain in `assets/games/neon-drift/` and the public runtime. Subjective listening and broad real-device testing remain separate review work.

Round 3 adds drift failure/retry, random-input comparison, live system motion changes, seeded layouts and a complete six-stage mirrored Tour to the one-command browser suite. Source-only calibration is available via `NEON_CALIBRATION_OUT=/tmp/neon-calibration.json node tests/neon-drift/calibration.mjs`: three perturbed input seeds per car × target speeds 20/23/26 × original/mirrored layouts, with Wilson confidence intervals. These controller simulations do not estimate human failure rates.

The final acceptance step runs a separate 200-active-second matched-scene allocation probe with sequential browser/server ownership. It writes `performance.json`, `allocations.json` and `gc-events.json`; sampled generated locations are mapped back using an exactly matching in-memory source map. It gates repeated fixed-tick allocations separately from retained heap. CDP allocation sampling is statistical evidence, not a proof that V8/Three.js never allocate.

After calibration, `NEON_CALIBRATION_OUT=/tmp/neon-calibration.json node tests/neon-drift/baselines.mjs` adds idle and reproducibly random source-simulation baselines for every stage in both layouts. Development-only browser subsets use `NEON_CASES=core|tour|matrix node tests/neon-drift/acceptance.mjs`; the documented acceptance command runs all subsets and the allocation probe.
