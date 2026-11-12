# Tidebound round 5 validation

The final candidate passes **134 unit tests and 51 browser checks** in the default full suite, with zero console/page/HTTP/failed-request errors, an exact in-memory source/runtime comparison, and confirmed browser/server closure. Source and runtime SHA-256: `3d05f9a3a9aa1e6d176956ceac3c225ef90662aaefd9a772c7d350af5c97f5e8`. No gameplay, art, audio, reward-balance, layout or save-schema redesign was needed beyond the progression-feedback repairs.

## Repairs

Dive completion now derives from the current voyage's validated underwater observation, independently of permanent part ownership. Starting a new dive and both restoration branches repair the old stale flag. Earned stations remain unlocked; repeat dives name the discovery and retain the connecting guide and gold target ring while the owned physical part stays hidden. Only the final interaction records the observation, without duplicating parts, rewards or supply refills.

Entry events, shore guidance, HUD objectives and interaction labels reflect pending stations, pending first collection, pending repeat investigation, and current-voyage completion. The final checklist row now displays a completion checkmark and return instruction after collection and reload. The surface action remains immediately available.

The three-site rules matrix covers first completion, same-voyage re-entry, new voyages, both save-restoration branches, stale flags, repeat commission progress and idempotence. Browser regressions cover all checklist states and six repeat dives at 1280×720/1920×1080 using real WASD/E after save fixtures. They verify guide/ring visibility, hidden owned parts, checklist/oxygen bounds, completed save/reload, and an actual repeat Reef return and settlement that increments the contract record without paying the 65-mark commission reward again. Fixtures use pending sessionStorage so pagehide cannot overwrite them.

## Reproduce

Port 8108 follows the builder brief. Commands were run from the builder worktree:

```sh
npm --prefix games/tidebound run build
TIDEBOUND_SCENARIO=regressions TIDEBOUND_PORT=8108 TIDEBOUND_ARTIFACTS=/workspace/stteak8/work/tidebound/rounds/r5/regressions-2 npm --prefix games/tidebound run check
TIDEBOUND_SCENARIO=performance TIDEBOUND_PORT=8108 TIDEBOUND_ARTIFACTS=/workspace/stteak8/work/tidebound/rounds/r5/performance-3 npm --prefix games/tidebound run check
TIDEBOUND_PORT=8108 TIDEBOUND_ARTIFACTS=/workspace/stteak8/work/tidebound/rounds/r5/full-2 npm --prefix games/tidebound run check
TIDEBOUND_ARTIFACTS=/workspace/stteak8/work/tidebound/rounds/r5/models node tests/tidebound/model-evidence.mjs
```

The standalone regression run passed 133 then-current unit tests and 28 browser checks. The final strengthened performance scenario and default full suite each passed all 134 current unit tests. The full suite includes the final gate and every regression. No shortened soaks or passing skips were used. Every attempt has a separate artifact directory.

## Browser gameplay evidence

The fresh-storage story in `full-2` passed in **789.17 active seconds (13.15 minutes)** and **805.77 wall seconds**, with 12 discoveries, 3 parts, 151 marks, 0 rescues, lighthouse repair, homecoming and another departure. It used read-only snapshots and actual keyboard/mouse input, without fixtures, teleports or time acceleration. Dive durations were 60.54 / 105.19 / 126.12 active seconds.

Competent swift/steady/cargo bots completed the short commission in 76.44 / 98.17 / 119.51 active seconds, each earning 41 marks and retaining its record after reload. The fixed-seed random bot earned zero marks in 150.59 active seconds. Idle first-dive oxygen loss rescued the player and permitted retry. Input response, audio, save/reload, focus, blur/visibility, pointer release, quota failure, back navigation, context recovery and both viewports passed.

Separately labeled rules pilots passed **45 stage trials and nine full stories**, across all rigs/charts, taking 668.0–901.8 active seconds. These model results are not substituted for browser play.

## Performance evidence

Limits remain **6 ms update p95, 250 calls, 1.5M triangles, 256 MiB textures, 30 MiB transfer, and <10% retained heap growth**. Cold metrics and complete candidate metrics are written before assertions. Scoring requires at least 180 additional scene updates and 20 additional HUD updates in the intended scene within an independent 120-second wall deadline. Physics telemetry must be empty in an inactive scene or contain at least 180 samples; active scenes require 180. Homecoming first gathers real sailing updates before docking, retains initial samples and a CPU profile, then gathers the separate homecoming population. No telemetry arrays are cleared. Unit tests reject insufficient active/inactive populations, a populated 6.01 ms overrun, and injected draw/CPU overruns.

| Standard branch scene | New scene / HUD samples | Cumulative physics samples | Update p95 ms | Peak calls | Peak triangles |
|---|---:|---:|---:|---:|---:|
| standard-harbor | 182 / 94 | 0 | 0.60 | 149 | 31,534 |
| standard-celebration | 182 / 76 | 183 | 0.70 | 194 | 32,426 |
| post-soak-high-coral-dive | 181 / 84 | 180 | 0.70 | 30 | 8,884 |
| post-soak-high-ruin-dive | 183 / 89 | 182 | 0.70 | 34 | 5,552 |
| post-soak-high-reef-dive | 181 / 86 | 180 | 0.60 | 32 | 9,800 |

Both full-run **180-second** windows passed, including a UI restart and WebGL loss/restoration. Retained heap growth was **8.84% / 0.81%**, listeners remained 97, GPU resources stayed bounded, and one game RAF remained active. Normalized GC frequency decreased **0.03003 → 0.02382 per frame**; the hot-container audit passed. Additional 1920, dive and high-quality homecoming resource checks passed. Allocation profiles distinguish application, engine and telemetry; no claim of zero V8 allocation bytes is made.

SwiftShader mean/p95 frame intervals were 62.39/100.10 ms and 58.28/100.00 ms, reported only as reference. The normal-renderer description override exercises standard shadows on actual SwiftShader and does not claim GPU hardware. Update timings exclude rendering. Existing DPR/adaptive-quality/context-loss handling and all licenses remain intact.

Reports retain cold/scored component metrics, cumulative and per-scene counts, scene state, CPU profiles, GC/allocation traces, fixture/last telemetry before each reload, request/response/failure and DOM/module timestamps, loading/resource diagnostics, and owned-server stdout/stderr. Phase, failure and cleanup-start status are persisted before diagnostics or closure; a killed attempt remains explicitly incomplete. `passed` becomes true only after successful checks and owned-resource closure.

## Retained failed attempts

- `regressions-1`: the initial new return pilot hit its 600-second wall allowance after only 44 active sailing seconds. It was not a passing run; the pilot now uses the existing story's one-hour shared-host navigation allowance.
- `performance-1`: soaks and post-soak reloads passed, but the final Reef sample hit the 120-second deadline with only 72 scene / 65 physics updates and 8.94 active seconds. It was not a complete performance pass.
- `full-1`: the fresh story, regressions, bots and both soaks passed, but homecoming failed at 7.10 ms: one physics entry sample at 6.50 ms plus 0.30 scene and 0.30 HUD. That exposed a remaining population gap in the test. The final gate rejects such a nonempty one-sample physics population, retains all initial data, profiles actual sailing before docking, and still rejects populated CPU overruns. `full-1` remains failed; `performance-3` and `full-2` are clean complete runs under the stronger gate.

Every failed attempt retains diagnostics and confirmed browser/server closure. No known gameplay defect remains in completed checks; validation is headless Chrome/SwiftShader.
