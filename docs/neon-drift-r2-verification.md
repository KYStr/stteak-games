# Neon Drift round 2 verification

The round 1 independent fix plan (F01–F07) is implemented in source and rebuilt runtime. This is builder evidence, not an independent QA score.

- Escape repeats are consumed before editable-target/dialog guards; fresh presses retain native dialog behavior.
- Clear-all verifies deletion of session, primary save and backup, resets live audio/settings immediately, and retains a usable failure dialog if any read/removal fails.
- Track/car selection and customization redraws preserve focus; dialog replacement preserves its opener; Tab boundaries remain inside the dialog.
- Normal play omits detailed profiler allocation/observers/WebGL timer queries. `?profile=1` explicitly enables them. Diagnostics disclose omitted measurements.
- Software scenery uses baked directional vertex colors and unlit colored neon. Instanced crane, elevated gantry and awning/vertical-sign families use two extra batches per district and conservative road/shortcut clearance.
- Auto/Medium desktop drawing buffers are 960×540, with a bounded seven-tap approximate antialias pass and correct output color conversion. Low is an explicit 540-wide option. Static screens invalidate on changes and stop rendering after settling; the gamepad RAF remains active.
- Cross-race feedback is cleared and expires after 2.5 seconds independently of CSS motion preferences, including pause/resume. Restoring a race does not replay its old notice.
- Scheduling gaps over two seconds pause during countdowns as well as active driving, before any physics advances.
- Audio guards against a pending gesture resume completing after a newer pause.

Run from the repository root:

```sh
NEON_PORT=8105 NEON_ARTIFACT_DIR=/workspace/stteak8/work/neon-drift/rounds/r2/acceptance npm --prefix games/neon-drift run acceptance
```

The browser uses one headless Chrome with SwiftShader, no autoplay override, and an acceptance-only analog controller. It never changes physics state. The controller requests lightweight read-only snapshots; its separate RAF is excluded from the game RAF counter. The suite compares independently rebuilt runtime/asset/license hashes twice and writes complete or explicitly failed/incomplete evidence to `acceptance.json`.

Timing gates are engineering targets (mean ≤33.4 ms, p95 ≤40 ms), not a quote from the shared rubric. The suite retains ordinary slow gameplay samples and records >2-second scheduler interruptions separately. It requires at least 180 active seconds after warmup per viewport; pauses and countdowns do not count. Shared-host software-rendering times do not isolate GPU cost. Detailed profiling runs are separate from normal-play timing.

## Final measured results

72/72 unit tests passed. All browser functionality/resource checks completed; acceptance exit status is 1 because the explicit frame-budget gates failed. Runtime/asset/license reproducibility: 17 files matched twice. Browser errors / failed requests / CSP violations: 0 / 0 / 0.

| Viewport | District | Active s | Frames | Mean ms | p95 ms | Max ms | >100 ms | Draw calls | Triangles | Landmarks |
|---|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| 1280×720 | harbor | 95.7 | 1478 | 64.96 | 149.90 | 233.50 | 201 | 46 | 12830 | 153 |
| 1280×720 | skyway | 56.2 | 439 | 129.37 | 266.70 | 466.70 | 266 | 48 | 16764 | 102 |
| 1280×720 | oldtown | 52.4 | 355 | 149.57 | 316.70 | 533.40 | 234 | 46 | 15536 | 119 |
| 1920×1080 | harbor | 95.2 | 889 | 107.81 | 200.10 | 400.10 | 402 | 65 | 13362 | 153 |
| 1920×1080 | skyway | 56.2 | 650 | 86.94 | 183.30 | 500.00 | 165 | 48 | 16764 | 102 |
| 1920×1080 | oldtown | 51.9 | 694 | 75.46 | 150.00 | 850.00 | 114 | 46 | 15788 | 119 |

1280px: 204.26 active seconds after warmup; GC heap 8559004 → 8526640 bytes; listeners 77 → 77; pending game RAF 1, maximum 1. Garage geometry counts after district runs: 51, 49, 50.

1920px: 203.21 active seconds after warmup; GC heap 8800196 → 8750316 bytes; listeners 77 → 77; pending game RAF 1, maximum 1. Garage geometry counts after district runs: 51, 49, 50.

Time trial: 135.94 seconds; drift: 898 banked points. Separate profiling-on run: 165 frames, mean 182.22 ms / p95 366.60 ms. Scheduling gaps recorded: 5. These profiling/host observations do not isolate GPU cost.

The final artifacts are under `/workspace/stteak8/work/neon-drift/rounds/r2/acceptance/`. The performance result remains unresolved for independent QA; no scores or release approval are inferred from functional passes.
