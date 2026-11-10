# Signal Zero round 1 verification

Build: `signal-zero-rebuild-20261110-r1` / 1.1.0.

The final command was:

```sh
SIGNAL_ZERO_ARTIFACTS=/tmp/signal-zero-r1-release npm test --prefix games/signal-zero
```

Result: **70 unit checks and 16 browser acceptance scenarios passed**. The command
rebuilds the runtime, verifies source/runtime parity, runs unit checks, then uses
one headless Chrome with SwiftShader over static HTTP on port 8107. All browser
instances and the local server were closed after verification. No commit was made.

The unit tests include physics, real 3D visibility/occlusion, finite tools,
validated storage/backups/layout migration, physical input ownership and release,
native touch pointer capture release, static/guard culling, and complete input-only
ground and upper routes across all six missions at both 30 and 60 FPS. Zero-alarm
routes with finite supplies are also demonstrated. These are deterministic gameplay
checks, not a human assessment of game feel.

The browser suite uses actual keyboard movement, jumping, a tool and a held hack
to earn and save the first checkpoint. It reloads and restores that checkpoint,
checks browser Back, blur/pause/resume, capture cancellation on Back/blur, modal
focus containment, audio gesture unlock/suspend/resume, volume and persistent mute,
720p/1080p layouts, defeat/retry, victory/replay, both endings, WebGL context loss,
corrupt saves and system reduced-motion defaults. Late-mission result/ending checks
use explicitly constructed valid save fixtures; full campaign traversal is covered
separately by the input-only unit routes. Test deadlines use monotonic time.

## Final three-minute SwiftShader sample

| Measurement | Result |
| --- | --- |
| Duration | 180 seconds |
| Frame samples | 3447 |
| Average / p95 interval | 55.7 / 100.0 ms |
| Steady average / p95 interval | 55.4 / 100.0 ms |
| Heap before / after forced GC | 20,920,683 / 21,516,916 bytes |
| DOM nodes before / after | 151 / 151 |
| Event listeners before / after | 76 / 76 |
| Geometry count before / after | 41 / 41 |
| Final draw calls / triangles | 48 / 9,972 |
| Final software resolution | 576 × 324 |
| Browser errors / failed requests | 0 / 0 |

The test asserts bounded heap growth, unchanged geometry/listener counts and at most
12 audio voices. The measured heap increase is 0.57 MiB and the diagnostic
frame history is bounded. This does not establish leak freedom beyond the tested run.

Performance remains a QA concern: the measured frame intervals are below the desired
smoothness target, and software auto mode reached its 45% resolution floor. An
earlier short isolated sample averaged about 25 ms after window culling, so host
conditions vary; the final three-minute measurements above are the release evidence.
No claim is made that every rubric dimension scores 90. Real hardware/mobile play,
full screen-reader gameplay and gamepad support have not been established.

Evidence is in `/tmp/signal-zero-r1-release/report.json`, with screenshots
`play-1280.png`, `play-1920.png`, `settings-1920.png`, `caught.png`, `complete.png`,
`ending-0.png`, and `ending-1.png`. Full command output is
`/tmp/signal-r1-release.log`. See `games/signal-zero/README.md` for controls,
build instructions, save semantics and the acceptance command.
