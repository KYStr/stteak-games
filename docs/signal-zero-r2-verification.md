# Signal Zero round 2 — builder verification

Build `1.2.0`, `signal-zero-rebuild-20261110-r2`. Scope: game source/runtime, game-specific tests and documentation. No commits or changes to other games, launcher, root package, assets/licenses, or release metadata.

## Implementation

- Static opaque scenery merges in cells with merged bounds <=32m; oversized meshes stay separate. Materials compare complete serialized appearance/render flags. Original collision/vision solids remain authoritative. Windows retain every instance with front-facing panes (2 triangles rather than 12).
- Owned geometry, materials, variants and skeletons are deduplicated on chapter release. Temporary transformed geometry is disposed after merging. Existing static/guard culling remains; dynamic actors, terminal animation, particles, transparent surfaces and warning cones stay separate.
- Software auto/low cache Lambert variants of opaque static standard materials. High restores source materials. Lighting and the runner stencil/silhouette remain. Device lookup and cone/camera vectors are reused.
- Auto starts at .75 on software renderers and never falls below .75; low is an explicit .65 choice. A bounded 120-frame RAF policy has resume/level warm-up, two slow-window downscaling and five fast-second upscaling. GPU queries only provide asynchronous diagnostics. Step, HUD, view update, render submission and query costs are reported separately.
- One byte-color render target and one full-screen edge pass preserve the scene's display color and stencil. Software uses seven samples; hardware uses the pinned FXAA shader. DOM text stays native resolution. Vendor modules/import rewrites and MIT license parity are unit-tested.
- Physics emits one landing event on a real airborne downward impact. Core tests cover jumping at 30/60 FPS, stationary silence and a ledge drop. Browser tests wrap the real Sound methods to prove physics events, audible landing voices, mute/SFX-zero suppression and the 12-voice bound.

## Reproduction and evidence

```sh
SIGNAL_ZERO_PORT=8127 SIGNAL_ZERO_ARTIFACTS=/tmp/signal-zero-r2-complete npm test --prefix games/signal-zero
```

Chrome: `/usr/bin/google-chrome`, Playwright from `/workspace/stteak8/tools/node_modules/playwright-core/index.mjs`, flags `--use-angle=swiftshader --enable-unsafe-swiftshader`. Default browser gesture policy; no autoplay bypass. Static HTTP on 127.0.0.1:8127. One browser at a time. The runner closes its browser and owned server in `finally`.

The suite installs fixtures after the old document's pagehide, checks chapter/checkpoint/position/settings, warms up, and times a fresh 30-second slice at x=35, 387.5, 937.5 (1280x720), plus x=35 (1920x1080). It records simulation and wall time separately. Limits remain mean <=33.4ms, p95 <=50.1ms and no one-second window below 20 FPS. Failing scenes are retained and fail final acceptance after lifecycle coverage finishes.

Screenshots include .75 auto resolution, chapter 3/6 entrances at both sizes, standing/running/airborne/occluded poses, high/low/auto, native settings, defeat/victory and both endings. These are reproducible fixture-assisted views. Complete browser campaign traversal is unverified; all six ground and upper input routes at 30/60 FPS are covered by core simulation. Browser-earned progress covers the first real objective and checkpoint; late defeat/victory UI uses a declared checkpoint fixture.

Round-1 independent measurements are under `work/signal-zero/rounds/r1/evidence/probes/report.json`. A pre-optimization instrumented capture is retained in round 2 `before/report.json`; x=35 had 100 calls, 18,912 triangles, mean 19.38ms / p95 33.4ms on that run. Round-1 same-scene RAF mean was 48.12ms. This variability predates optimization; before/after RAF values are not a controlled hardware benchmark. Calls, triangles, phase timings and bounded resources are reported alongside them.

## Final measured results

81/81 unit tests pass. 23 browser checks completed. Errors: []; failed requests/HTTP errors: []. The command returns nonzero if any scene gate fails; this is not a release pass.

| Scene | Internal pixels | Calls | Triangles | RAF mean / p95 / max ms | Wall ms / simulation s | Gate |
|---|---:|---:|---:|---:|---:|---|
| checkpoint-0-1280 (x=35) | 960×540 | 75 | 14489 | 106.06 / 216.60 / 316.60 | 43984.3 / 22.082 | FAIL |
| checkpoint-1-1280 (x=387.5) | 960×540 | 53 | 6963 | 66.15 / 116.70 / 216.70 | 30098.6 / 28.615 | FAIL |
| checkpoint-3-1280 (x=937.5) | 960×540 | 41 | 6749 | 58.33 / 116.60 / 183.30 | 30091.3 / 29.015 | FAIL |
| checkpoint-0-1920 (x=35) | 1440×810 | 75 | 14489 | 103.92 / 199.90 / 250.10 | 30065.1 / 24.231 | FAIL |

Bounded rolling CPU phases (mean / p95 ms, excluding render from simulation/view phases):

| Scene | Step | HUD | View update | Render submission | GPU query polling |
|---|---:|---:|---:|---:|---:|
| checkpoint-0-1280 | 0.144 / 0.200 | 0.128 / 0.300 | 0.320 / 0.400 | 0.969 / 1.100 | 0.006 / 0.100 |
| checkpoint-1-1280 | 0.126 / 0.200 | 0.120 / 0.300 | 0.283 / 0.400 | 0.702 / 1.200 | 0.007 / 0.100 |
| checkpoint-3-1280 | 0.082 / 0.200 | 0.087 / 0.300 | 0.212 / 0.400 | 0.646 / 1.100 | 0.004 / 0.000 |
| checkpoint-0-1920 | 0.150 / 0.200 | 0.160 / 0.300 | 0.315 / 0.400 | 1.072 / 1.400 | 0.008 / 0.100 |

Full soak: 180000 ms requested; 180826.6 ms wall / 178.493 simulation seconds. Post-GC heap 21,149,755 → 21,593,664 bytes (+443,909); listener counts 76 → 76; geometries stable at 27; pending/max game RAF {'pending': 1, 'max': 1}. Soak RAF mean/p95 27.72/66.60 ms.

Six same-chapter reconstructions: post-GC heap 21,978,251 bytes; geometries 27, textures 3, listeners 78 → 75; RAF {'pending': 1, 'max': 1}.

Landing evidence: [{"mode": "audible", "events": ["jump", "land"], "voices": [true], "audio": {"context": "running", "voices": 2, "transport": true}}, {"mode": "mute", "events": ["jump", "land"], "voices": [false], "audio": {"context": "running", "voices": 0, "transport": true}}, {"mode": "zero-sfx", "events": ["jump", "land"], "voices": [], "audio": {"context": "running", "voices": 2, "transport": true}}]

Final evidence: `/workspace/stteak8/work/signal-zero/rounds/r2/evidence/` contains the log, structured report/failure records and PNGs. `build-parity.json` records normalized source/runtime byte parity, pinned vendor/notice parity, and runtime SHA-256 hashes.

Remaining: the strict steady-scene RAF gates are not met in these SwiftShader measurements. Shared-host contention is visible in large RAF stalls, while phase times and scene complexity are retained independently; no causal claim attributes every stall to the host. Further profiling/optimization is required before claiming release acceptance. Full keyboard browser campaign completion remains unverified; simulated 30/60 FPS routes and fixture-assisted late UI checks are explicitly distinct.
