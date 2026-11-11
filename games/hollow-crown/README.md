# Hollow Crown · 餘燼之冠

A static, local-save Three.js game in Traditional Chinese. Serve `public/` over HTTP and open `/games/hollow-crown/`. All models, textures, music and effects are original procedural assets. Pinned Three.js 0.180.0 retains its MIT notice.

The default **餘燼巡禮** (`crown-pilgrimage`) visits twelve arenas in three four-room chapters, then two crowns. Fight small staggered squads, secure two beacons by standing nearby after clearing their guards, break seals with ordinary thrusts to open routes and trigger reinforcements, and cross visible lane/circle/ring hazards. The latter teach the boss responses before the throne. Objectives and counters remain on screen; menus pause all combat/objective clocks. The accessible 行旅 difficulty is the fresh default; 守誓 remains available. Four equipment slots and twelve talents support mobility, counter and burn builds. An unequipped starting-school talent is guaranteed among new pilgrimage rewards. Rest is always available.

Old challenge IDs retain their lengths and checkpoint semantics: `long-watch-extended` is the previous twelve-room/two-crown expedition, `long-watch` six rooms/two crowns, and the four-room oaths remain selectable. Seeded choices, safe/risk routes, six starting unlocks, endings, best successful time/seed and an earned armor appearance give reasons to replay. Starting unlocks add choices without permanent stat growth.

- **WASD / arrows:** move. **Mouse:** aim; automatic nearest-visible targeting is enabled by default.
- **J / left mouse:** thrust. Hold at least 0.65s and release for charge; readiness has a visual/sound cue. Light thrust costs no energy. The same thrust breaks square seals.
- **K / right mouse:** guard. Raise just before a frontal impact to counter; held guard reduces damage. Guard has a distinct, single armor-raise cue.
- **Space / L:** dodge. Flank shields or charge through their guard. Move sideways from lines, outside circles, and into the hollow center of rings.
- **Escape:** pause/resume/back. **M:** reversible mute; typing in form controls does not trigger it.
- **Touch:** movement/aim sticks and three action buttons. Cancellation/backgrounding releases held input. Keyboard/mouse are documented; gamepad/remapping are not exposed.

Settings persist immediately, including independent music/effects volume, mute, quality, auto-aim, flash, shake, practice-parry window, and explicit reduced motion. Fresh motion settings follow the OS. Modal focus is contained, menus scroll on small screens, and DOM text remains at native resolution.

Combat saves the **room entrance**, including seed, health, equipment and objective entrance state. Continue restarts that room; reward and route checkpoints preserve exact settled offers. Corrupt checkpoints are discarded with a notice while retaining settings/unlocks, and a validated backup can repair a damaged primary. Blocked storage remains playable; JSON export is available. Blur/visibility pause sound/input/simulation and require explicit resume. WebGL loss stops the game and offers reload/Continue, including after an actual context restore.

Runtime modules in `public/games/hollow-crown/` are authoritative; the asset build regenerates pinned vendors, original GLBs, textures, audio and manifests. No accounts/CDNs/services are required.

```sh
npm --prefix games/hollow-crown run build
HOLLOW_TEST_PORT=8123 HOLLOW_ARTIFACT_DIR=/tmp/hollow-r3-release npm --prefix games/hollow-crown run check:release
```

`check` aliases the full release command. `check:dev` runs only units/lifecycle regressions and makes no release claim. The release command sequentially runs build, units, lifecycle, action-feedback timing, two no-controller 30s allocation/GC windows after warmup, an 18-case fixed-step rules matrix (three fixed seeds × three schools × both difficulties), live visible-cue play, functional acceptance/retention and visual layouts. Only one headless Chrome runs at a time; each harness closes its owned browser/server on success/failure/interruption. An occupied port fails without killing its owner. Playwright is imported from `/workspace/stteak8/tools/node_modules/playwright-core/index.mjs`; Chrome uses SwiftShader. Port/artifact paths are environment configurable.

The live visible controller decides every 200ms using actor position, current animation state, visible projectiles/warning shapes and room obstacles. It caches its own path for 400ms; it never reads enemy countdowns, future moves or RNG and never mutates game state. It preserves the school’s starting talent during replacements and uses ordinary keyboard events/DOM menu clicks. Three accessible build wins, idle loss, menu-capable random underperformance, a progressing first successful default run ≥600 active seconds, and introduced mechanics are release gates. The full rules matrix retains every outcome and per-stage conditional failure denominators, requiring no consecutive jump >40 percentage points and a standard win. Small scripted samples do not establish human enjoyment or population win rates. `HOLLOW_PACING_QUICK=1` is explicitly incomplete and exits nonzero; timeouts are never wins.

The separate `functionalPilot` reads exact threat geometry/countdowns, takes healing and verifies completion/lifecycle; it gives no build/depth credit. Hardware-independent release budgets are ≤250 draws, ≤1.5M triangles, ≤256MiB textures, ≤6ms update p95, <10% GC-retained heap growth, identical listeners/RAF and same-scene geometries/textures after an expedition and ten restarts. SwiftShader frame time is reference only. Finite prop/actor templates are warmed before interactive startup; their bytes are resident at the baseline and transfer accounting includes all startup requests. Numeric timing rings, reused inputs/substeps, indexed navigation, in-place compaction, frame stamps and reusable upload ranges remove recurring record allocations. Allocation traces retain sampled stacks and GC windows for inspection; a stable GC rate alone does not prove that every library allocation is absent.

Acceptance also verifies actual input, tutorial, save/reload/continue, blur/audio suspend/resume, loss/restart, corruption/backup recovery, settings, focus, context loss/reload and responsive layouts. Visual tests label offline scene fixtures separately from live victories. Read-only `window.hollowCrownDiagnostics` returns copies only when explicitly queried; these copies are controller/diagnostic overhead and are excluded from the no-controller trace.
