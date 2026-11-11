# Tidebound round 2 validation

Final runtime SHA-256: `d31b8e6dd3c42a1d4bdf9093994276d9106d199d31186ba1d8a2dde6db371b86`.
All original asset manifests and license notices are preserved. Source rebuilds reproduce the shipped bundle, HTML, CSS and Three.js notice exactly.

## Repairs

| QA item | Implementation and evidence |
| --- | --- |
| 1, 9: acceptance | Validated configurable port (default 8128), normal autoplay policy, real gesture/SFX instrumentation, pending game RAF Set, strict assertions, independent sampler, finite navigation deadlines and failure diagnostics. Partial runs identify their scope; reports include CPU availability and runtime hash. |
| 2: navigation | Canonical direction/entry/option reconstruction; validated leg/index/history; legacy coordinate matching; history upgraded with inferred entries so a second legacy reload also works. Tests include alternate entries, partial multi-waypoint progress, malformed metadata and safe-port/dive fallback. |
| 3: storage | Save returns a real result. Failed manual saves never claim success; journal export reports actual persistence. Browser assertions cover unchanged in-memory state, failed export metadata, later recovery and reload. |
| 4: input | Exact canvas and held-button ownership; ownership cleared before releasing capture; single orbit owner; non-owner events ignored. Real blur/capture test and high-ID 31/257 unit coverage. |
| 5: HUD | Desktop chart left below objective, clear of route/sample/tide cards; mode-specific dive hint. Rectangle intersection, clipping, center hit testing and chart click assertions at both resolutions. |
| 6: composition | Full-site dive camera, clean underwater surface visibility, stable projected target direction cue; separate island-focused ashore camera. All three dive entries/targets/boundaries and both shore scenes captured at 1280 and 1920. |
| 7: audio | Shared bounded keyboard/mouse sail feedback, held-input throttling, furl feedback, existing gain/pause/voice bounds retained. |
| 8: rendering | Persistent mini-chart nodes, cached key HUD strings, instanced bubbles/trees, site-wide plant batches, software-only static vertex-colour batches, economical water shader, distance culling and bounded CPU diagnostics. No authored geometry/scenes removed. Frame-time target remains unmet. |

## Final-build commands and results

```sh
TIDEBOUND_SCENARIO=regressions TIDEBOUND_PORT=8128 TIDEBOUND_ARTIFACTS=/workspace/stteak8/work/tidebound/rounds/r2/final-regressions taskset -c 0,1 npm --prefix games/tidebound run verify
TIDEBOUND_SCENARIO=performance TIDEBOUND_PORT=8128 TIDEBOUND_ARTIFACTS=/workspace/stteak8/work/tidebound/rounds/r2/release-performance taskset -c 0,1 node tests/tidebound/acceptance.mjs
```

The first command passed: **99/99 unit checks**, exact runtime reproduction, **17/17 browser checks**, zero console/exception/request errors. Evidence: `final-regressions.log` and `final-regressions/acceptance.json` in the round directory.
CPU affinity was limited to two cores after unrestricted Chrome launches encountered `BindToCurrentSequence failed` while creating WebGL contexts. Required Chrome executable, SwiftShader flags, normal autoplay rules and numerical gates were retained.

The second command measured both full 180-second soaks plus 15-second supplementary samples and correctly exited nonzero on its unchanged mean ≤33.3 ms / p95 ≤50 ms gate:

| Stationary sample | Mean ms | p95 ms | Draws / triangles | GC-normalized heap delta |
| --- | ---: | ---: | ---: | ---: |
| Fresh sailing, 1280 | 48.387 | 66.7 | 32 / 12,512 | +532,108 B |
| Restored sailing, 1280 | 41.193 | 50.1 | 32 / 12,512 | +87,268 B |
| Sailing, 1920 | 64.684 | 100 | 32 / 12,512 | −38,264 B |
| Coral dive, 1280 | 33.672 | 50 | 14 / 7,894 | +270,092 B |

DOM nodes/listeners/GPU geometries remained stable within each sample; exactly one game RAF remained. Step averages were 0.03–0.043 ms, scene update plus submission 0.70–1.21 ms, HUD 0.29–0.44 ms. Raw measurements, CPU maxima and screenshots remain in `release-performance/acceptance.json`; no slow frames were filtered.

## Story evidence and remaining limitation

A genuine fresh-storage keyboard story completed all eight sailing legs, three dives, lighthouse repair, homecoming and replay: **602.731 wall seconds / 519.525 simulation seconds**, zero damage/rescues/errors, all dive exits above 52 seconds oxygen. Evidence: `story-retry/story.json` and screenshots. This completed run preceded the final static rendering batches; gameplay rules were unchanged by those batches. Later combined attempts hit wall-clock waypoint deadlines with normal sailing snapshots, intact hull and no browser errors; those failures are retained and are not counted as completed story runs.

**Full acceptance is not green:** the final numerical frame-time gates remain unmet. No claim of all-dimension QA ≥90 or final-build full-story completion is made. All browsers and the owned HTTP server were closed. No commits or pushes were made.
