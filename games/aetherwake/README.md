# Aetherwake · 風起之境

An original Three.js flight exploration game, served entirely from static files.
Follow the gold survey rings, read cyan wind corridors to recharge and climb,
deliver observations at three island observatories, complete their nine mandatory
cross-island survey legs, then follow six return beacons to camp.
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
One headless browser is used at a time and always closed. Allow 30–60 minutes on a busy shared SwiftShader host.
Temporary writable XDG directories isolate Chrome/SwiftShader caches when the
host home directory is read-only; they are removed after the browser closes.
The suite checks exact source/runtime build bytes, unit/rule regressions including
all six islands' shared terrain depth priorities,
gesture audio, mute, external audio suspension, blur/pause/input release,
modal focus, save/reload/migration/corruption, real WebGL loss/restoration,
1280×720 and 1920×1080 layouts, two complete keyboard-driven campaigns and restart,
completed-results settings navigation, tracked/active expedition cancellation,
blocked browser storage, reduced-motion preference, reading-dialog focus,
390×844 and 360×740 touch HUD clearance/hit areas, route switching and flight,
and two fresh-context three-minute real-time frame/heap/geometry/voice stability runs.
`unit.tap`, screenshots, raw frame intervals, 15-second phase/CDP/DOM/RAF samples,
`stability-1.json`, `stability-2.json` and `acceptance.json` are written to the evidence directory.

The browser campaigns use a 640×360 canvas for logic traversal; full desktop UI
and terrain checks separately exercise 1280×720 and 1920×1080. They accelerate
RAF timestamps sixfold but use ordinary
keyboard input through the shipped controls; it never changes simulation state.
Its duration is simulation time, not a measured first-time human playtime.
The stability phase uses a separate context and unmodified real-time RAF.
The deterministic unit pilot also traverses all optional content and every module.
For a short local iteration only, `AETHERWAKE_SOAK_MS=15000 AETHERWAKE_SOAK_RUNS=1` reduces the soak;
the default acceptance runs two full 180000 ms samples.
To isolate course-cancellation timing and touch layout, run
`AETHERWAKE_REGRESSION_ONLY=1 node tests/aetherwake/acceptance.mjs` from the root.
It repeats cancellation in three fresh contexts and checks both touch sizes;
it does not replace the full acceptance run.
Normal acceptance gates hardware-independent resource and lifecycle evidence.
Shared-host SwiftShader mean/p95 frame intervals remain informational in
`pacingReference`; `pacingMode` is `reference-only` by default. On a dedicated
benchmark host, explicitly set `AETHERWAKE_STRICT_PACING=1` to also enforce
mean ≤33.5 ms and p95 ≤50.1 ms after application-error checks.
`resourceSummary` retains draw calls, triangles, geometry/texture counts, resolution,
CPU phases, heap growth, listener counts and pending RAF callbacks from each window.
CDP's raw listener count includes one ended callback per live audio voice. The
report retains raw/live-voice/persistent counts and gates bounded total listeners
plus no persistent listener growth; finished audio nodes clear their handlers.
`sceneUpdateMs` and `simulationMs` exclude `renderer.render()`; `renderCpuMs`
measures synchronous render submission/CPU work and is not a GPU timer.
Normal Chrome autoplay policy is used;
an analyser checks actual master output and settled mute without a second
audible destination connection.

For an assigned QA server port, for example:

```sh
AETHERWAKE_PORT=8121 AETHERWAKE_EVIDENCE=/tmp/aetherwake-qa npm --prefix games/aetherwake run verify
```

Full terrain screenshot review (also included in verify) (six checkpoint fixtures × Auto/High ×
both desktop sizes, three orbit angles, zoom and successive-frame captures):

```sh
AETHERWAKE_EVIDENCE=/tmp/aetherwake-visual node tests/aetherwake/visual.mjs
```

This starts/stops its server and browser, checks contact/resource bounds and
records screenshots for visual inspection. Fixtures do not count as traversal.
For smaller batches, set `AETHERWAKE_VISUAL_WIDTH=1280` (or `1920`) and
`AETHERWAKE_VISUAL_QUALITY=auto` (or `high`) with separate evidence directories.

## Saves, rendering and audio

Progress stays in `localStorage` (`aetherwake-save`, schema v4). Survey samples,
relics, delivered expedition stages, records and preferences persist. Continue
returns to the last safe island with full energy. An undelivered expedition stage
restarts; v1/v2/v3 records migrate into separate historical records. Corrupt data,
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

## Round 4 campaign and verification

The ranked expedition has a visible 45-minute active weather window, including
grounded play. Pauses, dialogs, hidden pages and context loss freeze it; stall
penalties affect the score clock only. Timeout offers restart or a permanent
switch to unranked, untimed exploration. Preparation also offers untimed mode.
Three main station deliveries now each require three authored nine-gate circuit
legs (energy budgeting, crosswind compensation, fog navigation), with grounded E
delivery on every leg. Six ordered return beacons guide the final corridor.
Current-leg partial gates reset on safe continue; delivered legs remain.
v3 campaign/route PBs are archived under versioned keys; discoveries, settings
and delivered optional stages remain, while the expanded campaign starts anew.

Run all build, unit, 42 source campaign/bot cases, browser acceptance, 48 sail
feedback probes, browser idle loss, two 180-second resource soaks (the second
with sustained flight and midpoint restart), and 24 visual fixtures with:

```sh
VK_ICD_FILENAMES=/opt/google/chrome/vk_swiftshader_icd.json AETHERWAKE_PORT=8101 AETHERWAKE_EVIDENCE=/tmp/aetherwake-r4 npm --prefix games/aetherwake run verify
```

The Vulkan ICD variable is a runner fallback if a minimal WebGL canvas fails on
the QA host. It does not change game rendering or suppress errors. Campaign and
weather browser contexts accelerate RAF timestamps with the fixed-step clamp
unchanged; only the separate real-time soaks measure performance. Allocation
sampling includes collected objects and omits inspection calls during each
profile window. Render submission delay is reported separately from synchronous
HUD/audio acknowledgement. Browsers and owned servers close in finally blocks.

The source allocation gate reports residual sampled allocations explicitly; it
does not claim zero total V8 allocation. Packed wind buffers remove the former
per-step object/array weather pipeline, and cached scene views avoid rebuilding
unchanged courses. Rich inspection APIs intentionally allocate only on request.

The visual runner uses a fresh context per checkpoint and renews its browser and
cache after each six-island batch, limiting browser process churn on this shared
host. WebGL initialization errors are retained and fail the run.
