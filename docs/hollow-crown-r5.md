Round 5 ships version 1.5.0 (`stteak8-hollow-crown-r5`). All fourteen encounters, both difficulties, controls and legacy saves/reward amounts remain supported. The strict recurring-allocation gate is still failing, so this is not an all-green release or a claim of meeting every 90-point rubric bar.

Runtime modules in `public/games/hollow-crown/` are authoritative. The asset build reproduces all 42 generated assets/vendor files without modifying Three.js. From the repository root:

```sh
HOLLOW_TEST_PORT=8103 HOLLOW_ARTIFACT_DIR=/tmp/hollow-r5-release npm --prefix games/hollow-crown run check:release
HOLLOW_ARTIFACT_DIR=/tmp/hollow-r5-repro node tests/hollow-crown/repro.mjs
```

`check:release` remains the single complete entry point: build, units, regressions, feedback, allocation, matrix, live pacing, acceptance and polish. It collects independent failures and exits nonzero if any gate fails. `check:dev` is a development subset. Every browser harness owns and closes its browser/server; the build environment uses only port 8103 and one headless Chrome at a time. The QA plan's round-4 example port 8123 was superseded by the brief's assigned builder port.

P1 changes include numeric projectile/effect keys; conditional Set clearing; cached integer HUD percentages; insertion-sorted quality samples; scalar segment/circle/rounded-rectangle collision with strict tangency and revision-aware bounded LOS caching; fixed numeric scratch; and conservative invalidated warning-root bounds. Collision tests cover thin rectangles, corner near-misses, zero-length rays, tangency and seal removal. Warning identity, style, animation, overlay and current-frame receipt checks remain enforced. Further scene changes reuse actual-attack warning geometry and separate per-record materials/instance buffers, skip unchanged poses and clear all warning templates/pools at camp. No artificial startup allocations were added to inflate the memory baseline.

P2 changes release discarded runs only after successful replacement validation, clean up navigation ownership, split infrequent scene/seal work out of large hot functions, and fully stop test controllers. The same factory is installed and stopped at both heap boundaries. Heap diagnostics now attribute compiled code, script/function owners and backing arrays through strong edges, in separate reports; no engine bytes are subtracted from the limit.

P3 changes collect independent acceptance gates even after another gate fails, bound natural-death waits by active progress and wall time, and distinguish stalls from losses. All pacing screenshots include difficulty/build/mode/seed. P5 filters every disabled/hidden/inert/negative-tabindex/non-rendered focus target and tests fresh camp in both route states plus confirmation dialogs. P6 reserves portrait space only when touch controls are visible and tests actual mobile tap/drag/end/cancel at 390×844 and 800×450. Portrait tutorial-to-aim clearance is 13 CSS px; screenshots were visually inspected.

P4 retains the fixed standard burn seeds 72, 4837 and 271828, the three accessible schools, idle and both random cases. All nine finished without retries or substituted outcomes. Accessible mobility/counter/burn won at 787.04/750.50/727.61 active seconds. Standard seed 72 lost at 751.05 seconds after twelve rooms; seeds 4837/271828 won at 779.19/769.87 seconds. Idle lost at 16.02 seconds with no rooms; random seeds 72/4837 lost at 170.32/284.92 seconds with one room each. Standard stage 13 had 3 entrants and 1 loss; stage 14 had 2 entrants and 0 losses. The largest conditional increase was 33.33 points, within the unchanged 40-point limit. Therefore the plan's conditional full-heal reward change was not applied. Historical seed-72 failures remain preserved.

The builds behave differently: mobility recorded 439 dodges and zero parries; counter recorded 34 parries and 1,213.45 counter damage; burn recorded 1,297.25 burn damage and 2,303.06 charged damage. First successful active play exceeded ten minutes, with beacons, lines, rings, circles, seals and bosses introduced progressively. The visible controller and its 200ms policy/reward decisions were unchanged. These small scripted samples support the stated gates, not population balance or human enjoyment estimates.

Evidence root: `/workspace/stteak8/work/hollow-crown/rounds/r5/`.

| Final verification | Result / evidence |
| --- | --- |
| Units | 125 pass; `units-scalar.log` |
| Fixed-step matrix | 18 cases pass, accessible 9/9 wins and standard 6/9; `matrix-final/` |
| Live nine-case cohort | All pacing gates pass; `release-1/pacing.json`, nine unique result images and loss histories |
| Regressions / feedback / polish | Pass; `final/regressions.json`, `final/feedback.json`, `final/polish.json` |
| Acceptance | Pass, full fourteen-encounter victory, ≥180 active-wall seconds, ten restarts, natural death, save/backup/context/audio/motion recovery; `final/acceptance.json` |
| Resource retention | 9,329,936 → 10,259,644 total V8 bytes (+9.964784%); listeners 79→79, geometries 22→22, textures 1→1, one game RAF, warning templates/pools zero at camp |
| Hardware-independent budget | 38 draws, 16,172 triangles, update-only p95 0.200000018ms; texture budget met; zero console/page errors or failed requests |
| Build reproduction | 42 files match across two isolated builds; `final/repro.json` |
| Allocation | FAIL; original and inclusive reports plus all four traces retained in `final/` |

The first full release invocation is retained in `release-1/release-checks.json`. It collected the complete cohort and exposed allocation, heap and a newly added touch-test selector failure. The selector was fixed; final regression/feedback/allocation/acceptance/polish/reproduction outcomes are in `final/checks.json`. The final 18-case matrix has complete case records identical to the live-cohort candidate (`matrix-final/equivalence.json`), including timings, stats and histories. Live evidence ran the frozen earlier round-5 implementation; it was not rerun after subsequent implementation optimizations. Its 15 served modules were recovered from the actual browser snapshot and SHA256-verified against the pre-cohort manifest in `cohort-source/manifest.json`; final runtime hashes are retained separately. Do not represent the live cohort as a second run of the final rendering implementation.

The unchanged original allocation sampler reports hot-loop bytes of 717,928 / 279,576 / 1,702,852 / 573,684 across 908/930/800/502 frames. The additional gate counts extracted hot helpers too, adding 81,948 / 163,896 / 196,680 / 65,556 bytes. Both gates fail. Chrome was 156.0.8078.47, GC remained stable and all four shader-parameter rebuild samples were zero. Those facts do not satisfy zero recurring allocation. Remaining sampled sites and full stacks are in `final/allocation.json`, `final/allocation-inclusive.json` and `final/allocation-trace-*.json`; P1's acceptance criterion remains unresolved.

The final heap pass is close to the strict 10% boundary and does not establish broad robustness. Earlier unchanged-limit comparisons remain visible: first round-5 acceptance +12.08798%, intermediate +10.16635%, and the supplemental independent cold-start comparison +27.27521% on the first candidate. The latter has a different initialization baseline and is not the final same-camp acceptance measurement; its focus/touch probes passed. Raw snapshots and owner reports are retained, with no discarded failures or threshold changes. Shared-CPU SwiftShader wall/frame times are reference measurements; they were not used to weaken resource, latency or update budgets.
