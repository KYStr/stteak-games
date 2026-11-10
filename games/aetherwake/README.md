# Aetherwake · 風起之境

An original Three.js flight exploration game, served entirely from static files.
Follow the gold survey rings, read cyan wind corridors to recharge and climb,
deliver observations at three island observatories, then return to camp.
Three mutually exclusive glider modules and safe/shortcut routes change each run.
Beyond the campaign are twelve lore fragments and six skill expeditions with
23 independently saved stages (nine gates and a landing per stage).

## Build and play

From the repository root:

```sh
npm --prefix games/aetherwake ci --no-audit --no-fund
npm --prefix games/aetherwake run build
python3 -m http.server 8101 --bind 127.0.0.1 --directory public
```

Open `http://127.0.0.1:8101/games/aetherwake/`. All runtime dependencies are bundled;
there are no CDN, account or network-service requirements. Build edits in `src/`
and include the resulting `public/games/aetherwake/` files.

WASD/arrows steer relative to the camera; Space jumps or toggles the sail;
hold Shift to descend and brake; land near an island centre and press E to deliver.
Right-drag rotates, wheel zooms, C recentres, V changes view, H opens the journal,
and Escape pauses or returns one menu level. Touch uses the left joystick and
right sail/brake buttons. Do not hold Space: the sail is a toggle.
The journal explains wind shapes, gate conditions, collectibles and expeditions.

## Acceptance, one command

```sh
AETHERWAKE_EVIDENCE=/tmp/aetherwake-acceptance npm --prefix games/aetherwake run verify
```

Requires Node 22+, Python 3, `/usr/bin/google-chrome` and the provided
`/workspace/stteak8/tools/node_modules/playwright-core`. Defaults to port 8101 (`AETHERWAKE_PORT` overrides it for an assigned QA port);
starts and stops its own server if one is not already serving the game.
One headless browser is used at a time and always closed. Allow roughly 10 minutes.
The suite checks exact source/runtime build bytes, 107 unit/rule regressions,
gesture audio, mute, external audio suspension, blur/pause/input release,
modal focus, save/reload/migration/corruption, real WebGL loss/restoration,
1280×720 and 1920×1080 layouts, a complete keyboard-driven campaign and restart,
completed-results settings navigation, tracked/active expedition cancellation,
blocked browser storage, reduced-motion preference, reading-dialog focus,
and two fresh-context three-minute real-time frame/heap/geometry/voice stability runs.
`unit.tap`, screenshots, raw frame intervals, 15-second phase/CDP/DOM/RAF samples,
`stability-1.json`, `stability-2.json` and `acceptance.json` are written to the evidence directory.

The browser campaign accelerates RAF timestamps sixfold but uses ordinary
keyboard input through the shipped controls; it never changes simulation state.
Its duration is simulation time, not a measured first-time human playtime.
The stability phase uses a separate context and unmodified real-time RAF.
The deterministic unit pilot also traverses all optional content and every module.
For a short local iteration only, `AETHERWAKE_SOAK_MS=15000 AETHERWAKE_SOAK_RUNS=1` reduces the soak;
the default acceptance runs two full 180000 ms samples.
The QA pacing targets are mean ≤33.5 ms and p95 ≤50.1 ms per sample. A missed
target fails after writing both samples and a structured failure; shared-host
SwiftShader delay is reported separately from measured JS/update/render CPU work.
CPU render-call duration is not GPU timing. Normal Chrome autoplay policy is used;
an analyser checks actual master output and settled mute without a second
audible destination connection.

For an assigned QA server port, for example:

```sh
AETHERWAKE_PORT=8121 AETHERWAKE_EVIDENCE=/tmp/aetherwake-qa npm --prefix games/aetherwake run verify
```

## Saves, rendering and audio

Progress stays in `localStorage` (`aetherwake-save`, schema v3). Survey samples,
relics, delivered expedition stages, records and preferences persist. Continue
returns to the last safe island with full energy. An undelivered expedition stage
restarts; v1/v2 records migrate into separate historical records. Corrupt data,
blocked storage and quota failure display an explicit warning and remain playable.
Pause/blur saves and clears held keys and pointer captures. WebGL loss freezes
flight and audio, saves progress and presents recovery; successful restoration
requires an explicit resume. A reload option remains available if recovery fails.

On the automatic low profile, decorative wind matrices update at 20 Hz and
conservative full-corridor bounds cull groups outside the view. The nearest useful
corridor, local thermals and all navigation markers remain visible; wind physics stays at 60 Hz and the complete map remains active.
Automatic quality reduces rendering resolution and shadows when frame times are
high; SwiftShader starts with a lighter profile. HUD text remains at native
resolution. High quality keeps full detail and live shadows. Settings also offer
reduced motion and independent music/SFX levels (zero mutes); audio starts only
after a gesture and suspends with gameplay. No audible hardware listening or
physical touch-device testing is claimed by the automated suite.

Original models, icons, audio recipes and asset rights are documented in
`assets/games/aetherwake/README.md`. Three.js is MIT; its notice is retained at
`public/games/aetherwake/THREE-LICENSE.txt`.
