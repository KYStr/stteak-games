# Moss & Moon · 苔蘚與月光

An original Three.js 3D garden in Traditional Chinese, with two modes. **Festival Journey** is the default: protect four moonlight beacons through four 160-second active chapters (garden, forest, brook, ridge), then bring the festival home. Complete each chapter's task quota while preserving moonlight integrity. Zero integrity, or an unmet quota at the deadline, loses the chapter. Actual active play to win is **640 seconds (10 minutes 40 seconds)**; menus, travel, blur and pause do not count. Live tasks refresh every 20 seconds and shades continue approaching after the quota is met.

The first chapter introduces watering and shelters; the second adds light-seed pickup/delivery to the next numbered beacon; the third introduces three rotating bluebell→lotus path segments; the fourth combines the mechanics across four beacons. Standard is the default scored difficulty. Gentle uses 1.35× spawn intervals and 0.65× damage. Strategies include patrol/watering, earning and deploying moss shelters, and keeping cultivated plants for emergency purification. Extra tasks and preserved integrity improve the score. No combat assets are used.

**Free Garden** preserves the untimed gardening game: eight crops, moon-phase and neighbour bonuses, six residents/twelve wishes, twelve discoveries, three puzzles, eight recipes and twelve furnishings. Its festival requires eight wishes, three festival furnishings and garden level two; the UI-earned regression route takes about two minutes, with optional gardening afterwards. Plants never die, and days advance only by sleeping. Legacy schema-1 gardens migrate to this mode with their gameplay fields preserved.

## Run and verify

From the repository root:

```sh
npm --prefix games/moss-and-moon ci
npm --prefix games/moss-and-moon run build
MOSS_PORT=8124 MOSS_ARTIFACTS=/tmp/moss-and-moon-qa npm --prefix games/moss-and-moon test
MOSS_PORT=8124 MOSS_ARTIFACTS=/tmp/moss-and-moon-qa npm --prefix games/moss-and-moon run test:soak
MOSS_PORT=8124 MOSS_ARTIFACTS=/tmp/moss-and-moon-qa npm --prefix games/moss-and-moon run test:profile
# Fast pure-rule/storage/audio checks:
npm --prefix games/moss-and-moon run test:unit
```

Serve manually with `python3 -m http.server 8104 --bind 127.0.0.1 --directory public`, then open `http://127.0.0.1:8104/games/moss-and-moon/`. Tests require Python 3, `/usr/bin/google-chrome`, and the shared Playwright at `/workspace/stteak8/tools/node_modules/playwright-core`. Browsers run serially under normal Chrome autoplay policy. Each test closes its browser and only its owned server in `finally`. An existing service is verified before reuse. `MOSS_PORT` defaults to 8104 and can be set explicitly; round 5 verification uses 8124, as specifically requested by the independent fix plan.

The **single acceptance command** runs unit/server checks, the complete Free Garden route and lifecycle regressions, held-Escape/confirmed-audio/travel checks, and a full real-time Festival Journey through Playwright walking and task buttons. It also runs idle-loss and deterministic random-input bots in independent browser contexts before the competent run; any failing case retains its evidence and the suite reports every case’s exit status. Long-interruption pauses are resumed only from an atomic playing/settings snapshot, after checking outcomes. Allow about 20–30 minutes on a shared host; the Journey case allows 24 minutes, with a 30-minute outer browser watchdog. It never injects a win, inventory, resources, a clock, or player position. Raw decisions, stage milestones, active time, seed/layout/event hashes, score and viewport screenshots are written under `MOSS_ARTIFACTS`. `test:journey` runs the journey portion alone. Pure policy tests cover 20 fixed seeds across three strategies and assert the per-stage failure curve.

`test:soak` uses the UI-earned garden backup from acceptance, tracks Three r180 geometry registrations by identity, runs three reset/import warm cycles through all regions, rendered camera cutaways and resident animation, then measures at least 180000 monotonic milliseconds including reset/import. The authored `moon-cottage` cutaway needs explicit region re-entry at camera turn 2: rotating an already baked cottage did not exercise that variant. Identity traces established that the previous 20→21 delta was this bounded shared geometry. The post-warm no-growth assertions remain strict. It compares equivalent warmed states using post-GC heap (<10% growth), listeners, pending RAF, geometries and textures. `MOSS_SOAK_MS` may lengthen this run, but values below 180000 are rejected.

`test:profile` uses QA's dense garden **only as a performance fixture** (`MOSS_FIXTURE` may point to another valid exported fixture). It retains source hashes, complete allocation samples/stacks, V8 traces, actual frame counts and elapsed times for two 30-second quiet movement intervals. Collection and named gates are separate: an allocation failure still collects all auto/high camera budgets and transfers, writes `profile.json`, then exits nonzero. The original fixed-512-byte comparison and the observed-weight temporal comparison both remain in separate JSON files. Neither is used to claim zero allocations.

The allocation gate compares each interval with the recorded unchanged full-path A/B/A controls, including measured between-interval variation and actual sample-weight uncertainty (same multiplier 3). Source identity prevents silently applying that classification to changed runtime code; new runtime source needs fresh attribution. Supplemental storage/closure checks, unknown application-stack rejection, and a separate allocation-tracked snapshot without a debugger breakpoint check surviving direct-frame types. The minimal persistent Three.js/RAF control also has nonzero bytes. Snapshots cannot identify already-collected object types; residual bytes are reported, and are not all asserted to be numbers or RAF records. See [round 5 evidence](../../docs/moss-and-moon-round5.md) for the experiment and limitations.

The bounded negative control replaces entries in a fixed 64-object ring each frame. Its heap plateaus, but sampled recurring allocation must fail a named allocation gate. It is routed test code, never shipped gameplay. Run it separately; **exit 1 is expected**, with eight camera views and transfer results still written:

```sh
MOSS_PORT=8124 MOSS_ALLOCATION_CONTROL=negative MOSS_ARTIFACTS=/tmp/moss-negative npm --prefix games/moss-and-moon run test:profile
# Diagnostic subsystem omissions and restored baseline (never acceptance results):
MOSS_PORT=8124 MOSS_ARTIFACTS=/tmp/moss-attribution npm --prefix games/moss-and-moon run test:attribution
MOSS_PORT=8124 MOSS_ARTIFACTS=/tmp/moss-types npm --prefix games/moss-and-moon run test:allocation-types
```

The original resource gates remain update-only p95 ≤6 ms, ≤250 draws, ≤1.5M triangles, ≤256 MiB textures, DPR ≤2, ≤30 MiB transferred, <10% retained-heap growth and unchanged warmed residency. Auto framebuffer adaptation must not rebuild static geometry. SwiftShader RAF/completion intervals remain reference data, never FPS gates. The conservative 16 MiB texture bound covers procedural shadow/depth surfaces, bone textures and fallback texels. Vertex buffers are counted separately.

Runtime ES modules in `public/games/moss-and-moon/` are authoritative. The build copies pinned Three.js 0.180.0 and its MIT notice; no separate bundled gameplay copy exists. `window.mossDiagnostics()` exposes read-only snapshots, including bounded frame samples, complete non-render update time, static rebuild/capacity counters, GPU residency, audio, stage/seed/active time/hazards/tasks, event hash and best record. `mossDiagnostics({summary:true})` skips timing-array sorting/copying and best-record parsing, and exposes enabled/input/path/panel counters for polling. `mossDiagnostics({since:0})` returns bounded ring samples; collectors retain full raw data outside the game.

## Controls and saves

- WASD/arrows move; E uses the selected tool near a beacon/plot. Mouse selects plots or destinations; Q/R rotate and +/− zoom. 1–4 select planting/water/harvest/decorate. On-screen controls support touch.
- Journey's nonmodal task list stays live: **Walk** follows the bounded pathfinder, then **Care** performs the local action. **Repel** waters nearby shade; **⌂** spends earned moss on 20 seconds of shelter. Tool 3 consumes an earned cultivated plant to purify attached shade. Actions require being within 1.7 m. Carry light-seeds to the next numbered beacon; use Care to rotate a light path to its stated target and again to connect it.
- Escape closes a panel or pauses/resumes once per physical press. Tab/Enter operate menus. All blocking menus stop the journey clock. Blur/hidden tabs release input and pause audio; resume is explicit. Reduced motion removes decorative motion while retaining static task/hazard markers.
- Free Garden's goal card offers guidance. Its text plot picker supports arrows/Home/End; water/harvest offer batch care. Full spatial screen-reader navigation is not claimed.
- New Journey offers numeric seed, random seed and difficulty. Same seed/input yields identical events. Results show the seed, score formula and rank; Retry Stage preserves completed chapters; Retry Same Seed starts a fresh run, New Seed replaces the current garden after an explicit confirmation, and Free Garden continues without a timer.
- Score = tasks×100 + rounded integrity×5 + completed chapters×250 − mistakes×10 (minimum zero); S≥7000, A≥6000, B≥5000, C otherwise. Best overall/per difficulty and at most 20 seed records live separately from slots and survive reset/import.
- Settings provide music/ambience/SFX sliders (zero mutes), reduced motion, quality, dialogue speed, two save slots and backup export/import. Schema/envelope 2 preserves campaign RNG, elapsed active time, task state and outcomes. Schema/envelope 1 migrates safely. Unsupported future or corrupt snapshots recover from the previous valid backup when available. Corrupt records never prevent garden loading. Storage failures show a warning and retain export access.

All successful actions save atomically with a checksum and previous valid snapshot. Journey also saves every five active seconds and on pagehide; reload performs no offline progression. Context loss offers focused recovery; reload retains the saved garden.

## Original assets and notices

Procedural models and PCM music/SFX are original. Editable kits/manifests/provenance remain in `assets/games/moss-and-moon/`. Journey's original procedural beacons/shade use pooled torus/octahedron/cone geometry authored in `world.js`; encounter source is `campaign-content.js`/`campaign.js`. No external assets were added. Three.js's MIT notice remains in `public/games/moss-and-moon/vendor/THREE-LICENSE.txt`. Historical handoff screenshots are not claimed as current verification evidence.
