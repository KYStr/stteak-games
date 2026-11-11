# 逐潮之旅 · Tidebound

A complete single-player sailing and shallow-diving adventure across seven original islands. Compare safe offshore routes with tide windows, record twelve discoveries, recover three lighthouse parts, repair the northern beacon, and return home. Six commissions, three rigs and sixteen deterministic current seeds support repeat voyages. The continuous story takes about 8–12 minutes with efficient navigation; completing the journal and commissions takes longer.

## Run and verify

```sh
npm --prefix games/tidebound ci --no-audit --no-fund
TIDEBOUND_PORT=8128 TIDEBOUND_ARTIFACTS=/workspace/stteak8/work/tidebound/rounds/r2/final npm --prefix games/tidebound run verify
```

`verify` rebuilds the bundled static runtime, runs the rule/asset/input/audio/navigation tests and an exact source/runtime comparison, then runs real headless Chrome acceptance. It uses `/usr/bin/google-chrome`, `/workspace/stteak8/tools/node_modules/playwright-core`, and normal browser autoplay rules. `TIDEBOUND_PORT` defaults to **8128** (the round 2 repair plan's review port); it must be an integer from 1024 to 65535. An existing server is reused only if its entry document identifies Tidebound; only a server created by the runner is stopped. The browser always closes in `finally`.

The default suite includes a keyboard-only short commission and a separate **fresh-storage full story**: the first six-objective commission, all three dives, lighthouse repair, homecoming and replay. The pilot reads snapshots only to steer; it never teleports, changes live state or accelerates time. Each waypoint has a finite deadline, a simulation-progress watchdog, and diagnostics for held keys, distance, heading, pause state and renderer progress. Expect **20–35 minutes** including unit checks, navigation, screenshots and two full three-minute soaks; shared CPU contention can lengthen navigation. A watchdog/deadline failure is retained as an incomplete run, with diagnostic state, rather than being counted as story completion.

Clearly labeled save fixtures additionally check route restoration/completion (including legacy schema-one saves), corrupt/old storage, invalid-position recovery, rescue/retry, exact dive oxygen, failed writes and honest journal-export metadata. Real mouse capture is tested while held across blur. At 1280×720 and 1920×1080, all dive entries/targets/boundaries and shore views are captured; chart/HUD rectangles and actual chart hit targets are asserted. Audio checks require a real gesture and test keyboard/mouse sail cues, suspend/resume, mute, bounded voices and loops. Lifecycle checks count pending game RAFs separately from the performance sampler.

`acceptance.json` records raw frame mean/p95, step/scene/HUD CPU timings, renderer update/submission timings, draw/triangle/resource counts, GC-normalized heap, DOM nodes and listeners. Fresh and restored-context stationary sailing each receive a **180000 ms** soak after warmup; additional 1920 and dive samples are labeled separately. The acceptance gate requires mean ≤33.3 ms and p95 ≤50 ms; a failed gate exits nonzero even if gameplay checks pass. Software-renderer intervals depend on shared machine load; the hardware-independent counts and CPU timings are retained alongside them.

`TIDEBOUND_ARTIFACTS` selects an output directory (default `games/tidebound/test-results/`). For explicit partial debugging, `TIDEBOUND_SCENARIO=smoke|regressions|story|performance` runs only that scenario and labels its scope in the report; omit it for full acceptance. `TIDEBOUND_SOAK_MS` can shorten local performance debugging; full verification uses the default 180000 ms. A partial/debug result is not a full acceptance pass.


Round 2 final validation: **99/99 unit checks and 17/17 browser regression checks passed**, including exact source/runtime equality. The recorded fresh story completed in 602.7 wall seconds before the final static rendering batches. Final three-minute fresh/restored soaks retained stable resources and one game RAF, but averaged **48.4 / 41.2 ms** (p95 **66.7 / 50.1 ms**), so the strict performance gate still fails. These final runs used `taskset -c 0,1` to constrain worker creation on the shared box after unrestricted Chrome context-creation failures. The report records available CPU count; affinity does not change assertions. See [round 2 evidence](../../docs/tidebound-round2-validation.md) for commands, all four performance samples and remaining verification limits. Omit `TIDEBOUND_SCENARIO` for the full default suite; no full acceptance pass is claimed.

Serve manually:

```sh
python3 -m http.server 8128 --bind 127.0.0.1 --directory public
```

Open `http://127.0.0.1:8128/games/tidebound/`. Dependencies, models and sound are bundled/local; no service, account or network connection is required after downloading the game.

## Play

- **W / S** or **↑ / ↓** adjust sail power. The boat travels toward its bow; these are not forward/reverse controls.
- **A / D** or **← / →** steer. **Space** quickly furls the sail and brakes.
- Approach a golden mooring ring, slow below 1.4 m/s, then press **E** to dock. **E** investigates when ashore.
- Underwater, **WASD / arrows** swim. Approach the golden discovery and press **E**. Bubble springs replenish oxygen; **浮出回船** returns safely at any time.
- **M** opens the chart and pauses time; **C** switches the camera. Right-drag or drag the right half of the sea on touch to orbit.
- **Escape** pauses/resumes. Settings provide music/effects volume (zero mutes), reduced motion and automatic/standard/economy graphics.
- Buttons support mouse and touch; coarse-pointer devices receive an analog helm and dive movement controls. All menus support keyboard focus.

The first commission compares four habitats in one voyage. Shore research and dive research are separate checklist entries; return to the home harbour after the whole list is complete. Other commissions provide shorter expeditions. Research is independent of cargo capacity. Optional survey buoys occupy cargo space and award collectible marks; all rigs and repairs are free.

## Progress and lifecycle

Autosaves occur every fifteen seconds, when pausing or leaving the page, and after important actions. Reloading restores a valid live boat/dive position, hull, cargo, oxygen and research; press **繼續航程** to resume. Offline time consumes nothing. Invalid live positions fall back to the last safe harbour without erasing discoveries. Corrupt or incompatible saves start a clean journal with a visible recovery message. The journal can be exported as JSON; settings contain an explicit confirmation before clearing progress.

Sinking and running out of oxygen trigger rescue at a nearby harbour, lose half of ordinary cargo, preserve story parts/discoveries, and repair the boat. Restart returns home with permanent progress intact. Blur, hidden tabs, modal overlays and WebGL context loss freeze simulation and release held input. Graphics restoration leaves the game paused until continued.

## Source and licenses

Edit `src/`, then run `npm --prefix games/tidebound run build`; runtime files are in `public/games/tidebound/`. `models.js` and `generate-audio.mjs` retain the original procedural asset sources. Existing asset manifests, hashes, licenses and Three.js notices remain intact. The runtime batches static mesh pieces by material, uses instanced trees/bubbles, site-wide underwater material batches, economical software lighting and bounded sound voices, and automatically chooses economical rendering on software GPUs. `window.tidebound` exposes read-only snapshots and bounded diagnostic metrics for verification.
