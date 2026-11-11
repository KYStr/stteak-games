# Hollow Crown · 餘燼之冠

A static, local-save Three.js combat game in Traditional Chinese. Serve `public/` over HTTP and open `/games/hollow-crown/`. No accounts, external fonts, CDNs, or service APIs are required.

## Play

The default **餘燼長征** has two acts: six original arenas, six new arenas, then both two-phase crowns. Second-act encounters mix melee, ranged and explosive reinforcements. Each room has a different obstacle layout and themed perimeter silhouettes. Clear waves, compare a talent with your current build or heal, then choose a destination and risk. Four equipment slots support three interacting schools; replacement cards show exact modifier changes. Stories occur after rooms 1, 6 and 12, and the final choice changes the ending.

The six-room / two-crown **雙冠遠征** and four-room / one-crown oaths remain available. Stable challenge IDs preserve the original length and seeded routes of old checkpoints: `long-watch` is still six plus two; the expanded default uses `long-watch-extended`. Difficulty defaults to 守誓; 行旅 reduces damage and widens parry timing. A practical five-step tutorial cannot permanently kill the player. Unlocks add starting choices and an appearance, without permanent stat growth.

- **WASD / arrows:** move. **Mouse:** aim, with automatic targeting available in settings.
- **J / left mouse:** press to thrust; hold at least 0.65s and release for a charged thrust. The action meter indicates readiness. Light thrusts cost no energy.
- **K / right mouse:** guard. A fresh frontal guard just before impact counters; early held guard reduces damage. Dodge circles and rings.
- **Space / L:** dodge. Flank shields or break them with a charged thrust. Move sideways out of line warnings; approach the safe center of an outer ring.
- **Escape:** pause/resume or close a secondary panel. **M:** mute without changing music/effects levels. Typing in form controls does not trigger M.
- **Touch:** movement/aim sticks and three action buttons. Auto-aim starts enabled. Pointer cancellation/backgrounding releases held input. Gamepad and control remapping are not exposed.

## Saves and lifecycle

Settings save immediately. Combat saves the **room entrance**, including seed, health, equipment and waves. Reload opens camp; Continue restores that entrance. Reward and route offers recover exactly without rerolls or duplicate settlement. Semantically unusable checkpoints are discarded with a visible notice, preserving settings and unlocks. A validated backup can recover a damaged primary. Blocked storage remains playable; JSON export is available, importing is not exposed.

Blur/hidden tabs pause simulation and audio; resume is explicit. Dialogs contain focus. Reduced motion follows the OS until the checkbox is explicitly changed; either explicit value survives reload and OS changes. Context loss freezes graphics, sound and input, then offers reload/Continue.

## Build and validation

Runtime modules in `public/games/hollow-crown/` are authoritative. The parametric asset source is `assets/games/hollow-crown/sources/kit.mjs`. Rebuild pinned vendors, GLBs, matching runtime kit, textures, audio and manifests:

```sh
npm --prefix games/hollow-crown ci --registry=https://registry.npmjs.org
npm --prefix games/hollow-crown run build
HOLLOW_TEST_PORT=8103 HOLLOW_ARTIFACT_DIR=/tmp/hollow-crown-check npm --prefix games/hollow-crown run check
```

`check` sequentially runs units, targeted lifecycle regressions, acceptance and layout checks. Default port is 8103; default artifacts are `tests/hollow-crown/artifacts/`. `HOLLOW_TEST_PORT` and `HOLLOW_ARTIFACT_DIR` permit independent QA configuration. An occupied port fails without killing its owner. Chrome/server cleanup is idempotent and handles interruption. Playwright defaults to `/workspace/stteak8/tools/node_modules/playwright-core/index.mjs` (override `PLAYWRIGHT_PATH`); Chrome is `/usr/bin/google-chrome` with the required SwiftShader flags. Audio uses real gestures, without an autoplay bypass.

Acceptance completes tutorial and all fourteen expedition encounters through ordinary keyboard/menu input, validates win/loss/restart, save/reload, settings, blur/audio resume, malformed saves, focus and context recovery. It requires **180 seconds of active play**, GC heap growth below 16 MiB, bounded listeners, and one RAF after ten restarts. `HOLLOW_SOAK_MS` below 180000 labels a development run incomplete and exits nonzero. Failure JSON is timestamped and retained.

Per the current QA rubric, absolute SwiftShader timings are reference data. Release work budgets enforce at most **45 draws / 35,000 triangles / 12ms p95 simulation update** in the sampled default expedition. Raw active RAF samples, independently sampled intervals, one-second work/resource windows and drawing-buffer dimensions are retained. The old 33.3/66.7ms frame targets remain audited reference fields. Layout tests verify the ≥768×432 desktop software floor after 30 seconds at both required sizes and save every room, both crowns, rewards, pause and portrait layouts.

Additional probes:

```sh
HOLLOW_ARTIFACT_DIR=/tmp/hollow-crown-probe npm --prefix games/hollow-crown run test:performance
HOLLOW_ARTIFACT_DIR=/tmp/hollow-crown-pacing npm --prefix games/hollow-crown run test:pacing
```

The pacing controller samples visible positions/actions at 200ms intervals, never reads enemy attack timers or exact warning geometry, and sends ordinary input. It tests mobility/counter/burn across two seeds and both difficulties, recording simulation/wall/menu time, rooms, builds, hits and deaths. `HOLLOW_PACING_CASE_MS` bounds development cases; incomplete cases cannot pass. Automated pacing is not evidence of human enjoyment. The optimal acceptance pilot does inspect exact threat geometry and serves a separate functional purpose.

Software rendering uses baked room colors, one dynamic rigid-bone actor stream, shared sparks, cheap textured floor, contact shadows and no multisampling. Hardware retains the PBR/shadow path. Adaptive resolution has 120-frame hysteresis windows and a readable .8 software scale floor. DOM text stays at native resolution. Read-only `window.hollowCrownDiagnostics` exposes copied state and bounded metrics.

All models, textures and sounds are original procedural assets. Pinned Three.js 0.180.0 retains its MIT notice. Round evidence and limitations are recorded in `docs/hollow-crown-r1.md` and the external round-2 artifacts.
