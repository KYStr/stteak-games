# Tidebound round 4 validation

Source repairs cover every round 3 finding: aggregated real `discovery` feedback and persistent shore lessons; saved guardian entry grace; predecoded gesture-gated audio; coalesced physics responses between visual frames; and immutable route/obstacle data with scalar survey selection.

The response scheduler uses a persistent coalesced microtask wake and one MessageChannel fallback, one game RAF, a monotonic admission clock, and generation invalidation on input clearing. A positive admitted physics step records event-to-step time minus only actual renderer duration. Handler time remains a separate metric. Coalesced control changes retain the oldest outstanding event timestamp. Unit tests cover equal timestamps, pause, stale tasks, mode changes, reload and disposal.

The default acceptance command is:

```sh
TIDEBOUND_PORT=8108 TIDEBOUND_ARTIFACTS=/workspace/stteak8/work/tidebound/rounds/r4/full npm --prefix games/tidebound run verify
```

It includes three uncached normal-autoplay contexts, real island discovery batches at both viewports, guardian entry at both overlap phases, actual control response checks, all three competent rigs, a fixed-seed random bot and idle first-dive rescue. Fixtures are labeled separately from the fresh-storage full story. Only UNMASKED_RENDERER_WEBGL is overridden for the standard shadow/batching branch; actual rendering remains SwiftShader.

Performance evidence includes two equal 180-second windows, normalized collection rates, exact-bundle source-mapped allocation stacks, engine/test/telemetry separation, and an Acorn inspection of ordinary frame/physics/scene code rejecting recurring arrays, objects, constructors, callbacks and container pipelines. Event payloads, seed changes, omitted caller scratch fallbacks, HUD strings and V8 scalar boxing are reported separately; heap sampling cannot identify allocation types from a function call frame alone. The audit has a test that reinstates the original frame array and requires rejection. Existing retained-memory, listener/RAF/resource, CPU, draw/triangle/texture/transfer and context-recovery gates remain mandatory. GC comparison permits one collection or 10% sampling variation; doubling its normalized rate fails.

Validation results and failed attempts are retained under `/workspace/stteak8/work/tidebound/rounds/r4/`. Consult each acceptance.json scope/passed/closure fields; a partial or shortened debugging scenario is not a full pass.

## Recorded results

- `rounds/r4/full/acceptance.json`: **scope all, passed true, 48 checks**, zero console/uncaught/network/request errors; browser and owned server closed. The preceding test run passed **130/130** including exact source/runtime reproduction.
- Fresh browser story: **789.064 active seconds**, all 12 discoveries, all three parts, 151 marks, zero hull damage/rescues, then replay. Wall time was 3382.5 seconds and is recorded separately.
- Real competent commission bots: swift **76.1 s**, steady **98.0 s**, cargo **119.6 s**. Each earned 41 marks and preserved its record on reload. The fixed-seed random bot earned zero marks in **150.2 active seconds**; idle first-dive rescue and retry passed. Their respective physics-response p95 values were **0.8 / 0.2 / 0.2 / 0.2 ms**, using actual positive physics steps and subtracting only renderer time.
- Two default **180-second** sampling windows: **2602 / 2623 rendered frames**, retained heap **+7.66% / +0.79%**, stable listeners/resources and one game RAF. GC events per frame fell **0.03036 → 0.02402**. The ordinary frame/physics/scene source audit found zero recurring container sites. Sampled application allocation estimates remained **22.13 / 12.26 MB**; function-level heap sampling does not establish exact object types or prove zero allocation bytes.
- Across all covered scenes and the standard rendering branch: maximum **137 calls**, **33,350 triangles**, **12.25 MiB** texture bound; conservative update p95 maximum **0.9 ms**. SwiftShader frame intervals remain reference data only.
- Additional rules evidence: all **9** rig/chart stories completed in **668–901.8 active seconds**, and all **45** staged dive trials succeeded. These are model runs, separate from the fresh browser story.

The full run's original Mangrove browser fixture used repeated cargo IDs, which restore correctly deduplicated. The fixture was subsequently corrected to eight distinct valid IDs, with an explicit post-restore length assertion; final supplemental browser regressions cover that corrected full hold on the same runtime. The real producer/consumer unit test also uses distinct cargo IDs. Failed repair iterations remain separately named under the round directory.

Final supplemental result: `rounds/r4/final-regressions/acceptance.json` reports **26 checks passed**, zero errors/failed requests, exact same runtime SHA-256 as the full run, and both owners closed; its preceding **130 tests passed**. The corrected Mangrove fixture retains eight distinct cargo IDs after restore at both viewports.
