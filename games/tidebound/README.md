# 逐潮之旅 · Tidebound

A complete single-player sailing and shallow-diving adventure across seven original islands. Compare safe offshore routes with tide windows, record twelve discoveries, recover three lighthouse parts, repair the northern beacon, and return home. Six commissions, three rigs and sixteen deterministic current seeds support repeat voyages. The continuous story takes about 8–12 minutes with efficient navigation; completing the journal and commissions takes longer.

## Run and verify

```sh
npm --prefix games/tidebound ci --no-audit --no-fund
npm --prefix games/tidebound run verify
```

`verify` rebuilds the bundled static runtime, runs all rule/asset/input/audio unit tests, then runs the real headless Chrome acceptance suite. It uses `/usr/bin/google-chrome`, the provided `/workspace/stteak8/tools/node_modules/playwright-core`, and port **8108** only. It starts and stops its own Python HTTP server if one is not already serving that port. One browser is used and always closed. Allow roughly 6 minutes for the entire suite.

The browser suite uses real keyboard inputs to complete the Whitewing commission: sail, brake, dock, investigate, return, deliver and restart. Controlled local save fixtures separately exercise diving collection and the final story return; these are clearly named in its output. It also checks initial audio gating, suspend/resume, mute, modal focus, blur/map pause, exact save/reload, corrupt storage, WebGL context loss/recovery, both target viewport sizes, and a three-minute resource/performance soak. The default artifact folder is `games/tidebound/test-results/`; set `TIDEBOUND_ARTIFACTS` to put screenshots and `acceptance.json` elsewhere. `TIDEBOUND_SOAK_MS` may shorten local debugging runs; full acceptance uses 180000 ms.

Serve manually:

```sh
python3 -m http.server 8108 --bind 127.0.0.1 --directory public
```

Open `http://127.0.0.1:8108/games/tidebound/`. Dependencies, models and sound are bundled/local; no service, account or network connection is required after downloading the game.

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

Edit `src/`, then run `npm --prefix games/tidebound run build`; runtime files are in `public/games/tidebound/`. `models.js` and `generate-audio.mjs` retain the original procedural asset sources. Existing asset manifests, hashes, licenses and Three.js notices remain intact. The runtime batches static mesh pieces by material, uses instanced trees and bounded sound voices, and automatically chooses economical rendering on software GPUs. `window.tidebound` exposes read-only snapshots and bounded diagnostic metrics for verification.
