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

Standard difficulty has a visible active-play trace deadline (7:00–8:15 across
the six chapters). Every new alarm subtracts four seconds; detection warning time
ramps from 0.95 to 0.70 seconds and patrol speed rises gradually. Jumping over a
guard avoids their ground grapple. Relaxed difficulty removes the trace deadline;
its records are stored separately. Settings changes apply on the next deployment.
The briefing accepts an unsigned 32-bit frequency code. Equal codes reproduce
patrol starts, directions and camera/laser phases; new frequency creates a variant.
Checkpoint saves retain seed, phase and remaining trace. Standard medals aggregate
across frequencies; speed records also keep chapter/difficulty/seed keys.

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

From the repository root:

```sh
SIGNAL_ZERO_PORT=8107 SIGNAL_ZERO_ARTIFACTS=/tmp/signal-zero-release npm test --prefix games/signal-zero
SIGNAL_ZERO_PORT=8107 SIGNAL_ZERO_ARTIFACTS=/tmp/signal-zero-campaign npm run test:campaign --prefix games/signal-zero
SIGNAL_ZERO_PORT=8107 SIGNAL_ZERO_ARTIFACTS=/tmp/signal-zero-performance npm run test:performance --prefix games/signal-zero
```

Each browser command owns one headless Chrome and a temporary Python HTTP server,
closing both in `finally`. Run commands sequentially. They require Python 3,
`/usr/bin/google-chrome` and Playwright from `/workspace/stteak8/tools/node_modules/`.
`SIGNAL_ZERO_PORT` defaults to 8107; `SIGNAL_ZERO_ARTIFACTS` sets report/PNG output.

`npm test` rebuilds, runs physics/save/input/build-parity tests and the browser
acceptance suite. Unit evidence includes 90 input-only strategy/arrival-phase
trials (three approaches × six chapters × five offsets), 72 finite-tool seeded
routes (twelve seeds × six chapters), idle deadline defeats, and checkpoint layout
migration. The browser suite tests actual opening movement, jumping, climbing,
selection by Q/mouse, tool failure, hacking milestones, checkpoint save/reload,
blur/audio recovery, settings/focus, both endings, context loss and corrupt saves.
Music must wait for a gesture and produce nonzero analyser samples. Event voice
spies check action envelopes with music disabled, plus mute/SFX-zero regressions.
Late defeat/victory UI checks use explicitly labeled checkpoint fixtures; the
additional first chapter traversal uses keyboard input from a fresh entrance.

Release gates are hardware independent: <=250 draw calls, <=1.5 million triangles,
<=256 MiB texture/render-target memory, combined active update p95 <=6 ms, <10%
post-GC heap growth, equal listeners/geometries/textures, and one pending game RAF.
Combined logic starts before input read and stops before rendering/GPU query work.
Typed numeric histories hold 3,600 samples; diagnostics serialize only on request.
Four scene windows report mean/p95/minimum-window frame pacing, wall time,
simulation time, and actual frame count. A window needs >=10 simulation seconds
and >=100 frames; insufficient coverage is labeled separately and retried once
with a longer window (up to three minutes), then fails if still insufficient.
Shared SwiftShader RAF timing is reference information. `SIGNAL_ZERO_STRICT_RAF=1`
adds calibrated-machine pacing gates (mean <=33.4 ms, p95 <=50.1 ms, >=20 window FPS).
No console, request, memory, gameplay or resource failures are optional.

`test:campaign` drives six complete chapters, ending, reload and replay with real
keyboard/equipment input and the live renderer. Playwright's virtual clock advances
RAF timestamps in 100 ms ticks; bounded 120 Hz physics substeps still run normally.
This accelerates campaign coverage and is not wall-clock performance evidence.
No player/objective/tool/victory state is assigned by the controller. It records
terminal/exit traces, active duration, seed, finite inventory, introduction times
and screenshots, plus real idle defeat and random/competent comparisons.
`SIGNAL_ZERO_SEEDS` accepts comma-separated uint32 seeds for extended campaign runs.

`test:performance` uses real wall time: a three-minute active soak with restart,
stationary/moving allocation profiles including collected objects, intermediate
heap samples, forced-GC counts, resource maxima and a conservative WebGL texture
ledger. Audio nodes created for discrete cues/music are reported separately from
steady game logic. The acceptance suite also warms shaders/JIT to a stable post-GC baseline, then runs a real three-minute soak and
same-chapter reconstructions; `SIGNAL_ZERO_SOAK_MS=1000` is a development shortcut,
not release evidence.

Static scenery batches within 32 m cells. Per-sector canal bridges/pipes, archive
frames and radial core towers have different silhouettes. The normal runner has
light armor trim and a separate stencil-tested occlusion silhouette. Auto/high
use pinned Three.js FXAA with a byte-color/stencil target; DOM text stays native.
Software auto has a 0.75 visual floor, high caps DPR at 1.5, and low uses 0.65.
Adaptive resolution uses a reusable 120-sample window with hysteresis. Context
loss stops the game loop and offers checkpoint reload. Three.js 0.180.0 modules,
FXAAShader/Pass and the MIT notice ship locally.

Original procedural art and score are in `src/models.js` and `src/audio.js`.
Existing exported assets, notices and Three.js MIT license remain intact.

Round 4 verification controls: `SIGNAL_ZERO_ACTION_TIMEOUT_MS` defaults to 120000
and accepts an integer from 1000 to 600000. This controls action and capture
budgets; it does not relax simulation coverage, resource gates or JS feedback
latency. World captures use direct CDP pixels to avoid font/layout synchronization
on paused WebGL scenes; one longer retry is allowed. Both attempts and the
current screen/RAF/resources are recorded. A failed required capture still makes
the release command fail. Independent scene, lifecycle, soak, output-audio and
input-only scenario groups continue collecting evidence after another group fails.
Only servers spawned by the command are terminated and awaited.

The result-audio matrix disables music and checks both outcomes with positive
SFX, master mute and SFX zero. It asserts oscillator creation and real nonzero
analyser output, <=100 ms cue scheduling, stopped music transport, idle context
suspension, and retry recovery. Fake-context units delay resume promises to check
restart/blur/disposal cancellation and stale cue-tail suspension. The matrix uses
labeled saves and keyboard traversal; the six-chapter campaign remains entirely
input driven. Input-read-to-cue/effect JS timings are asserted separately from raw
DOM-event-to-RAF queue delay (which includes shared software-render scheduling).

HUD regression observes objective/key-hint mutations: unchanged values cause zero
writes; movement, remapping, terminal/tool events, restart and restored checkpoints
update persistent nodes. Performance profiles aggregate each application source
location across all stacks and separate application, engine, discrete event/audio
and explicit telemetry allocations. No full diagnostic/control export occurs
inside either 20-second sample. Requested forced collections and traced natural
GC events are reported separately. The real soak still spans >=180 seconds and
includes restart; no shortened run qualifies as release evidence.

The allocation report preserves residual V8 numeric boxing rather than labeling
all sampled bytes as object creation. A separate ten-second allocation timeline
records exact per-function allocation counts/bytes and retained node types after
the timed soak. Steady input/physics/view helpers must allocate only scalar-sized
values and retain no object/array/closure/string containers. Unchanged HUD and
shader-key helpers additionally require zero sampled bytes. Browser RAF wrappers,
JIT code, original audio envelopes, engine internals and changed display text are
reported separately. This is not a claim of literally zero V8 number allocations.
A failed initial software-WebGL context creation is recorded and retried once in
a fresh browser, after closing the previous browser. Other errors remain failures.
Recovery screens include their diagnostic message in the read-only control state.
State waits use external polling, so virtual-clock fixtures cannot freeze their
own readiness timers. Failed scenario groups retain their exact recovery message.
The late-checkpoint victory fixture uses deterministic virtual-clock input stepping
after all real-time scene/soak measurements finish. Its RAF probe is reattached to
the installed scheduler, including after fixture reloads; context loss must still
leave zero pending callbacks. Feedback probes use Playwright's preserved native
performance clock when simulation time is virtual, so scheduling latency is not
artificially reported as zero. The fresh six-chapter campaign remains input-only.
