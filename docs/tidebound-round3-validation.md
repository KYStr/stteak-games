# Tidebound round 3 validation

Round 2 repair scope: toggle repetition, immediate bounded feedback, ordinary-update allocation/audio churn, substantive staged progression and supplies, encounter variants and comparable ranks, rubric-aligned performance gates, and complete acceptance diagnostics. Source changes are under Tidebound only; the static runtime is rebuilt with esbuild. No commits or pushes were made by the builder.

## Reproduction

```sh
TIDEBOUND_PORT=8128 TIDEBOUND_ARTIFACTS=/workspace/stteak8/work/tidebound/rounds/r3/full-1 npm --prefix games/tidebound run verify
TIDEBOUND_ARTIFACTS=/workspace/stteak8/work/tidebound/rounds/r3/models node tests/tidebound/model-evidence.mjs
```

`check` omits the build and is read-only on game code. Every browser run uses one Chrome instance, HTTP and SwiftShader. Artifacts identify partial scopes and record errors, server ownership, cleanup and runtime hashes. The full run is recorded separately from exploratory regressions.

## Completed model and partial checks

- 113 unit tests passed, including exact source/runtime equality, malformed saves/navigation, input ownership, held toggle keys, nine sound assets, stages, supplies, variants and non-regressing records.
- `rounds/r3/regressions-2`: all browser regressions passed with zero console/page/HTTP/request errors; owned browser/server closed. Includes 1280×720/1920×1080 views, all dive poses, chart clearance, audio lifecycle, failed storage writes and back navigation.
- `models/model-evidence.json`: 45/45 continuous stage pilots succeeded (five starts × three stages × three variants), zero stage rescues. Coral 62.8–75.7 seconds, reef 106.15–116.45, ruin 98.7–125.9. Minimum oxygen respectively 29.5 / 18.9 / 2.4 seconds. These are rules integration measurements, not browser or human trials.
- Full model story, seeds 1/2/3: swift 674.7/668.0/678.8 seconds; steady 788.3/781.8/800.9; cargo 901.8/897.4/897.3. All completed with zero hull damage. Cargo trades time for capacity; the fastest measured story exceeds ten active minutes.
- Standard idle rescued at 900.05 active seconds. A deterministic 150-second random policy earned zero discoveries/reward; competent Whitewing navigation delivered in 98 seconds without damage. The random policy resumes after result/rescue instead of counting stopped menus as active play.
- Three resolved charts change safe buoy positions/subsets, station order and hazard phase. Coastline and authored safe routes remain stable. Legacy aggregate records coexist with separate contract/rig/chart records and run ranks.

## Measurement methods and limits

Physics and renderer updates reuse scalar scratch/output objects; ordinary scene loops avoid callback/Set creation. HUD construction remains bounded to its cadence, actual events allocate only when occurring, and audio preferences/automation change only when needed. Bounded typed arrays expose physics, scene and HUD CPU p95. Renderer submission is excluded. Controls update during DOM input dispatch; their processing p95 is reported as `inputResponse`. The separately labeled `physicsInputQueue` measures scheduling to the next physics step, subtracting intervening renderer CPU. Immediate visual/audio intent onset is measured at real DOM events.

Renderer counters reset before the whole render with `autoReset=false`, including shadow and main work. Texture reporting is a conservative upper bound for the fixed 768² shadow map and bone textures. Frame intervals under software rendering are reference measurements, not release gates. Full performance acceptance requires two actual 180-second soaks, restart, context restoration, normalized heap growth <10%, stable listeners/resources/RAF and the rubric budgets. Allocation samples and V8 GC traces are written separately from per-frame snapshots.

First cold audio decode can exceed warm action latency; at most one cue is retained for 500 ms and discarded on pause or expiry. The ruin's shortest measured oxygen margin is 2.4 seconds on a straight-line pilot; a visible safe route outside the sweep is available. Shared CPU scheduling can lengthen wall time; story completion and content length are based on active simulation time. Full browser acceptance results follow below when complete.
