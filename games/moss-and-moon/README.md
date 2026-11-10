# Moss & Moon · 苔蘚與月光

An original, untimed 3D gardening game in Traditional Chinese. Grow eight plants, plan moon-phase and neighbour bonuses, help six residents with twelve wishes, explore three trails and their twelve discoveries, craft eight recipes, and prepare a moonlight festival. The festival is the campaign ending; gardening and the remaining stories continue afterwards. A first visit normally takes 15–30 minutes. There is no real-time waiting, energy meter, plant death, or time limit.

## Run and verify

From the repository root:

```sh
npm --prefix games/moss-and-moon ci
npm --prefix games/moss-and-moon run build
npm --prefix games/moss-and-moon test
```

The single test command runs the Node unit suite and a headless Chrome acceptance route. It starts a temporary HTTP server on **8104** if one is not already running and closes its browser and its own server afterwards. Requires Python 3, `/usr/bin/google-chrome`, and the shared Playwright installation at `/workspace/stteak8/tools/node_modules/playwright-core`. No external network requests are made by the game.

```sh
# Three-minute stability run, with screenshots and measured frame/heap/resource data:
MOSS_ARTIFACTS=/tmp/moss-and-moon-qa npm --prefix games/moss-and-moon test
MOSS_ARTIFACTS=/tmp/moss-and-moon-qa npm --prefix games/moss-and-moon run test:soak
# Fast logic checks only:
npm --prefix games/moss-and-moon run test:unit
# Manual HTTP session (stop with Ctrl-C):
python3 -m http.server 8104 --bind 127.0.0.1 --directory public
```

Open `http://127.0.0.1:8104/games/moss-and-moon/`. Runtime ES modules in `public/games/moss-and-moon/` are the authoritative editable source. The build copies the pinned Three.js 0.180.0 modules and its license into `vendor/`; there is no separate bundled copy to reconcile.

The separate stability command imports the backup produced by the campaign test and measures a further three minutes after warmup, including post-GC heap, listeners, DOM, pending animation frames, geometry, textures, audio sources and frame intervals. Both commands close their browser.

The browser suite performs actual UI actions from a new garden through the festival: planting, daily care, harvesting, eight quest deliveries, all discoveries and puzzles, buying, crafting, decoration, export/import, both slots, resetting, reload restoration, blur/input release, audio unlock/suspend/resume/volume, viewport screenshots, context-loss recovery, and corrupt-save recovery. It never injects inventory, coins, quests, or a winning state. The unit suite also verifies a complete twelve-quest/eight-recipe route and transaction/storage/audio edge cases.

## Controls and saving

- WASD / arrows move; E interacts; mouse click uses the selected tool on a plot or interacts with a resident/landmark.
- 1–4 select plant/water/harvest/decorate; Q/R rotate the camera; the visible +/− buttons zoom.
- Escape closes a panel or pauses/resumes. Tab/Enter operate menus. In the text plot picker, arrows select adjacent plots and Home/End select the first/last plot.
- On-screen movement and action controls support touch. Every plot also has a text/keyboard alternative in the journal. A full spatial screen-reader mode is not provided.
- The goal card opens the next useful step. Water and harvest tools offer batch care. Sleep advances exactly one day; watered plants then grow.
- Settings contain three independent audio sliders (zero mutes), reduced motion, quality, dialogue speed, two independent save slots, export/import and a confirmed reset.

Every successful action saves locally with a checksum and previous valid snapshot. Reload restores the selected slot without advancing time. Blur/hidden tabs pause movement and sound; resuming is explicit. Context loss offers a focused recovery screen; reload keeps the saved garden. Backups exported from settings can be imported into either slot. Old/incompatible or corrupt data is rejected, with the previous valid snapshot recovered when available. Browser storage restrictions are surfaced in the UI; play can continue and progress can be exported.

The renderer instances repeated scenery and garden plants, caches static shadows, stops GPU drawing behind inactive panels, and adapts internal resolution to frame time. The HTML interface stays at native resolution. Diagnostics are read-only at `window.mossDiagnostics()` (recent average/p50/p95 frame interval, GPU resources, audio state and save revision).

## Original assets and notices

Procedural models and PCM music/SFX are original Moss & Moon assets; editable kits, manifests and provenance remain in `assets/games/moss-and-moon/`. Three.js is MIT licensed; `public/games/moss-and-moon/vendor/THREE-LICENSE.txt` is preserved. No historical handoff screenshots are claimed as new acceptance evidence; the suite writes fresh captures and a JSON report on every run.
