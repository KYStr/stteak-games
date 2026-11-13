# Hollow Crown — rebuild evidence, updated in round 2

The default journey is now **two acts, twelve different ordinary arenas, and both crowns** (`long-watch-extended`). The original `long-watch` remains six plus two; short oaths remain four plus one, including existing saved routes. New encounters use distinct pillar/wall arrangements and mixed melee/ranged/explosive reinforcement waves. Wave arrivals have a one-second cue with movement still enabled. Stories occur at the first room, act boundary and final ordinary room. Reward/replacement cards compare numeric build changes; the fourteen-node journey fits two rows with an act label.

Round-1 progression softlocks are fixed: restored reward and route phases require usable offers, including the heal option and a valid next destination. Empty lists discard only the checkpoint, preserve settings/unlocks and show a notice. Genuine heal-only, single-boss and between-crowns checkpoints remain valid. Explicit reduced-motion choices override OS defaults, including explicit false; fresh profiles follow OS changes. Mute hotkeys and buttons now update text/ARIA without rebuilding the dialog or losing focus. Tutorial copy derives the journey concept without stale room counts.

Software rendering now batches static scenery into baked vertex-color geometry, preserves transparent water, and streams all bone-animated actors through one populated-prefix geometry. Sparks share one instanced batch. Floor, fallback materials and shadows use the software path consistently. The adaptive floor is **768×432** at 16:9, with 120-frame hysteresis windows; measured adapted buffers were 960×540 at both desktop sizes. MSAA is disabled after a controlled same-scene comparison: average/p95 **45.9/83.4ms enabled → 27.6/50.0ms disabled**, at 768×432 and 960×540 respectively. Neither collision shapes nor warning damage bounds were enlarged.

## Verification

```sh
npm --prefix games/hollow-crown run build
HOLLOW_TEST_PORT=8103 HOLLOW_ARTIFACT_DIR=/tmp/hollow-crown-check npm --prefix games/hollow-crown run check
HOLLOW_TEST_PORT=8103 HOLLOW_ARTIFACT_DIR=/tmp/hollow-crown-pacing npm --prefix games/hollow-crown run test:pacing
```

The aggregate command runs units, settings/corruption regressions, functional acceptance and visual checks sequentially with one browser. Ports/output paths are configurable. It refuses occupied ports and cleans up on success, failure or interruption. Audio unlock uses real gestures without an autoplay bypass. Failure JSON is retained, and a development soak shorter than 180 active seconds cannot pass. Work gates enforce ≤45 draws, ≤35,000 triangles, ≤12ms p95 simulation update, bounded heap/listeners and one RAF after ten restarts. SwiftShader frame intervals remain audited reference data under the current QA rubric.

Initial round-2 full check passed: all fourteen encounters won through keyboard/menu input, **103 kills / 8 hits / 254.3 simulation seconds**. The 272.7-second live measurement recorded independent RAF **29.3ms average / 50.1ms p95**, peak sampled **38 draws / 19,990 triangles / 4.5ms p95 simulation update**, and GC heap **+917,228 bytes**, listeners **77→81**, one document. The optimal functional controller sees exact threat geometry; these numbers do not establish human pacing. All twelve room identities, both crowns, 30-second adapted desktop views, portrait journey and reward comparisons were captured. No console, uncaught or HTTP errors occurred in that check. Final verification also passed all 83 units and browser suites: 256.4 simulation seconds, 103 kills, 6 hits; a 479.5-second soak retained 38 draws / 19,962 triangles / 5.9ms update p95, heap +1,423,664 bytes and one RAF after ten restarts. Independent RAF was 78.6ms average / 116.7ms p95 on that shared-CPU run, missing the historical absolute frame reference while passing the current rubric’s work/resource gates. Final console/page/request errors were all zero; the warning callback and overlapping cone/line/ring screenshots passed. Output is retained in `final-check-2`.

Two successive canonical builds produce identical asset hashes; runtime kit equals `sources/kit.mjs`, and the pinned Three.js MIT notice remains intact. Runtime modules are the source of truth; build generates vendors/assets rather than overwriting application logic.

## Pacing and limits

The separate pacing pilot samples visible positions/actions every 200ms, never reads enemy attack timers or precise warning shapes, and uses normal key/menu input. Live mobility, counter and burn runs on seed 72 all cleared twelve ordinary rooms and died at the first crown, at **275, 293 and 261 simulation seconds** respectively. This establishes later-content progression and repeated build decisions, but **does not establish a satisfying ten-minute session**. A twelve-case development matrix covers two seeds and both difficulties; bounded, incomplete cases are reported as incomplete and cannot pass the pacing gate. Results are retained honestly in the external round-2 artifacts.

No human enjoyment/difficulty study is available. Automated pacing cannot alone award a gameplay pass. JSON import, gamepad support and remapping are not exposed; keyboard, mouse and touch controls are documented. Independent QA should assess every dimension again; this document does not claim an all-dimension pass.

Evidence root: `/workspace/stteak8/work/hollow-crown/rounds/r2/` (`baseline`, `merged`, `antialias`, `check`, `pacing`, `pacing-matrix`, `evidence`, and final-check outputs). The baseline/intermediate Chrome traces and raw RAF arrays are retained for audit.
