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
`/workspace/stteak8/tools/node_modules/playwright-core`. Uses only port 8101;
starts and stops its own server if one is not already serving the game.
One headless browser is used at a time and always closed. Allow roughly 6 minutes.
The suite checks exact source/runtime build bytes, 104 unit/rule regressions,
gesture audio, mute, external audio suspension, blur/pause/input release,
modal focus, save/reload/migration/corruption, real WebGL loss/restoration,
1280×720 and 1920×1080 layouts, a complete keyboard-driven campaign and restart,
and a three-minute real-time frame/heap/geometry/voice stability run.
`unit.tap`, screenshots and `acceptance.json` are written to the evidence directory.

The browser campaign accelerates RAF timestamps sixfold but uses ordinary
keyboard input through the shipped controls; it never changes simulation state.
Its duration is simulation time, not a measured first-time human playtime.
The stability phase uses a separate context and unmodified real-time RAF.
The deterministic unit pilot also traverses all optional content and every module.
For a short local iteration only, `AETHERWAKE_SOAK_MS=15000` reduces the soak;
the default acceptance always runs 180000 ms.

## Saves, rendering and audio

Progress stays in `localStorage` (`aetherwake-save`, schema v3). Survey samples,
relics, delivered expedition stages, records and preferences persist. Continue
returns to the last safe island with full energy. An undelivered expedition stage
restarts; v1/v2 records migrate into separate historical records. Corrupt data,
blocked storage and quota failure display an explicit warning and remain playable.
Pause/blur saves and clears held keys and pointer captures. WebGL loss freezes
flight and audio, saves progress and presents recovery; successful restoration
requires an explicit resume. A reload option remains available if recovery fails.

Distant wind arrows stop animating and uploading instance matrices outside the
local flight view; wind physics and the complete map remain active.
Automatic quality reduces rendering resolution and shadows when frame times are
high; SwiftShader starts with a lighter profile. HUD text remains at native
resolution. High quality keeps full detail and live shadows. Settings also offer
reduced motion and independent music/SFX levels (zero mutes); audio starts only
after a gesture and suspends with gameplay. No audible hardware listening or
physical touch-device testing is claimed by the automated suite.

Original models, icons, audio recipes and asset rights are documented in
`assets/games/aetherwake/README.md`. Three.js is MIT; its notice is retained at
`public/games/aetherwake/THREE-LICENSE.txt`.
