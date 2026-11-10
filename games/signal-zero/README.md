# 零號訊號 / Signal Zero

An original single-player 3D stealth platformer. Six chapters cross a rain-soaked
city, canals, archives, switching yards, the core and a dawn broadcast tower.
Each chapter has eight sectors with ground and rooftop routes, four terminals,
a hidden data packet and four checkpoints. The campaign takes roughly 25–40
minutes; three independent medals per chapter reward speed, stealth and discovery.
Two saved endings are available after the final mission.

## Build and play

```sh
npm ci --prefix games/signal-zero
npm run build --prefix games/signal-zero
python3 -m http.server 8107 --bind 127.0.0.1 --directory public
```

Open `http://127.0.0.1:8107/games/signal-zero/` in a WebGL 2 browser.
All dependencies, models and audio are local. No network service or login is used.
The build pins Three.js 0.180.0 and rewrites module imports to local relative URLs.
Edit `src/`, then build; `public/games/signal-zero/` is generated runtime output.

## Controls

- A/D or left/right arrows: move. Space: variable-height jump / mantle low cargo.
- W or up arrow: climb ladders, or hold at a terminal to hack.
- S or down arrow: crouch behind cargo.
- Q: select the next tool. E: use the selected tool. Equipment can also be clicked.
- Escape: pause/back. M: mute, unless M has been assigned to a gameplay action.
- Touch controls can be enabled in settings. Landscape orientation is required.

Gameplay keys can be remapped in settings. Escape is reserved. Duplicate bindings
swap, and Back, blur, and screen transitions cancel pending key capture.
Music and effects have separate sliders and a persistent master mute.
Menus support Tab/Shift+Tab, Enter/Space and Escape. Reduced motion follows the
system preference on a new save and can be overridden in settings.
The game uses visual spatial reasoning and does not offer full screen-reader play.

## Mission and save rules

Observe the visible sight cones before crossing. Suspicion builds before pursuit.
Break line of sight, leave the last seen location and wait for the search to end.
Pulse disables a nearby electronic device for 8 seconds, decoys draw guards away
for 7 seconds, and rewiring permanently disables one camera or laser. Invalid
targets never consume tools. Every chapter can be completed without tools.

Hack all four mission nodes, then reach the exit. Upper-route packets are optional.
A checkpoint saves automatically after the first objective while not being tracked
or searched. The first is shortly after the opening terminal; later checkpoints
reduce repeat travel. Reload restores the checkpoint, patrol state and tool counts.
Tools used after a checkpoint are persisted so reload does not replenish them.
Mission starts, settings, medals, bests, unlocks and endings are also saved locally.
A validated backup handles corrupt or missing primary saves. Unusable saves show
a warning. Older checkpoint layouts resume at the saved chapter entrance while
preserving scores/settings. Blur, hidden tabs and back/forward cache suspend play;
resuming always requires an explicit action. Context loss offers a reload action.

Auto graphics mode uses GPU timing to adapt resolution. Software renderers omit
shadows; high mode enables them. City windows are spatially grouped so distant
blocks are culled. Paused scenes render only when changed. Audio has one procedural
transport, at most 12 voices, and explicit suspend/resume. Diagnostics in settings
download frame times, GPU timings, render counts and game state to the local device.

## Automated acceptance

From the repository root, one command rebuilds and runs all checks:

```sh
npm test --prefix games/signal-zero
```

The suite requires `/usr/bin/google-chrome`, Python 3 and the provided Playwright
at `/workspace/stteak8/tools/node_modules/playwright-core/index.mjs`. It starts a
static server on port 8107 if none is running, uses one headless Chrome with
SwiftShader, and closes its browser/server on success or failure. Stop any other
Signal Zero browser before running it. Logs and PNGs default to
`/tmp/signal-zero-acceptance/` (`SIGNAL_ZERO_ARTIFACTS` overrides this).

Unit tests cover physics, occlusion, tools, saves, full input-only campaign routes
at 30/60 FPS, zero-alarm routes, resource culling, input ownership and build parity.
The browser suite drives actual keyboard play through the opening hack/checkpoint,
save/reload, blur/resume, audio unlock and recovery, mute/volume, key capture,
focus, 720p/1080p layouts, defeat/retry, victory/replay, context loss and corrupt saves.
Late-game UI checks use an explicitly constructed valid checkpoint fixture;
whole-campaign traversal is independently exercised by the unit tests.
The default stability soak lasts three minutes and reports measured average/p95
frame time, heap, listeners, geometry counts and voice bounds. For quick iteration
only, `SIGNAL_ZERO_SOAK_MS=1000 npm run test:browser --prefix games/signal-zero`
skips the full soak; it is not a substitute for release acceptance.

Original procedural art and score are in `src/models.js` and `src/audio.js`.
Existing exported assets, notices and Three.js MIT license remain intact.
