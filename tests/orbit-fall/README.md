Run `npm --prefix games/orbit-fall test` from the repository root. This builds the
source, runs unit tests, and runs one Chrome at a time for fresh gameplay and
fixture-labelled lifecycle/cost cases. Browsers, contexts and owned servers close
in finally blocks. A failed check remains in the JSON and returns nonzero.

- `ORBIT_TEST_URL=http://127.0.0.1:8106/games/orbit-fall/` uses an existing server.
- `ORBIT_TEST_EVIDENCE=/absolute/path` selects the artifact directory.
- `ORBIT_TEST_SKIP_BUILD=1` avoids writes to the candidate during independent QA.
- `ORBIT_SOAK_SECONDS=5` selects a development-only short soak. Final evidence
  requires at least 180 seconds, a warmed restart path and an actual restart.

The campaign controller uses observed positions and real keyboard input. It does
not teleport, change progression, accelerate the clock or impose reading delays.
`node tests/orbit-fall/campaign-bots.mjs` runs it separately against the same URL.
Fresh first-ending gates require both active-browser and simulation time >=600s.
Seed/route trials use the visible challenge seed field; lifecycle fixtures are
explicitly labelled. Raw event logs retain phase timing and host interruptions.

The performance gates are hardware-independent: <=250 calls, <=1.5M triangles,
<=256MiB textures, full update p95 <=6ms excluding rendering, <10% retained heap,
stable listeners/RAF/geometry/textures, bounded DPR and context restoration.
SwiftShader intervals/average/p95 and CPU throttle are reference evidence only.
Unforced heap observations and sampled allocation flame trees are distinct from
the two forced-GC retained-heap endpoints.

Round 4 coverage adds seed/difficulty best-record refresh (including zero values,
invalid input and legacy records), A1–C8 navigation, version-aware ending help,
and native Space/Enter activation of Tab-focused buttons. The flight controller
uses only real input and read-only target telemetry. It checks the nearest eligible
object before each interaction, brakes to <0.1 m/s, and replans after bounded
physical stalls. A final failure retains the physical goal, colliders, nearest
object, snapshot and screenshot; regression timeouts also retain a Playwright trace.

Required groups run independently in fresh contexts: round4, regressions, legacy,
performance, campaign, bots. Any required failure returns nonzero and is retained
with its original exception/category. Challenge bots still run if campaign fails,
using a clearly labelled story-unlock-only fixture with zero challenge progress.
The final matrix retains ten seeds per tier; shortened `ORBIT_MATRIX_SEEDS` runs
remain failures of that final gate. The exact <=180s mechanic-cadence assertion is
retained; reload events without mechanic features are excluded.

For development only, `ORBIT_TEST_GROUPS=round4,regressions,performance` selects a
subset and marks `fullAcceptance:false`. Omit it for the one-command final gate.
Soaks count active-browser time, log/resume interruptions and fail as inconclusive
at `ORBIT_SOAK_WALL_SECONDS` (default max(900, requested active seconds * 5)).
Forced GC is limited to retained-heap endpoints. `gc-trace.json` retains V8 GC
events grouped into equal 60-active-second windows; non-growing GC rates,
listeners, pending RAFs and renderer resources are required. Separate allocation
profiles cover steady optics, restart construction and moving cargo. Public Rapier getters retain their original semantics; the hot path uses optional
guarded copy-into adapters and owned native velocity/gravity vectors. A deterministic
600-step audit requires zero wrapper creation or FinalizationRegistry registration. Sampling attribution separates application, Three,
Rapier and Playwright/setup. SwiftShader frame times never affect the pass gate.

To reproduce stack attribution from retained raw samples without opening a browser:
`node tests/orbit-fall/allocation-analysis.mjs /absolute/path/to/evidence`.
This writes `allocation-attribution.json`, separating diagnostic/evaluator
serialization, save/setup boundaries, authored updates, Rapier and Three stacks.
A zero shader-setup sample does not claim zero allocations across the application.

Round 5 adds an independently runnable `round5` group for semantic B6 controls,
compatible/incompatible prefix reload, optical-isolation interruption/reload,
diagnostics report/download and 48 settled expanded-room marker layouts plus the
unsolved variant-1 B5 reproduction. `campaign` runs three zero-progress campaigns:
a fresh random journey and labelled seed 3095359210/1853268288 saved-state setups. Each
requires all repairs, both endings, >=600 active/simulation seconds and <=180s
mechanic gaps including the final introduction-to-ending interval. The required
original six groups remain intact. `build-reproduction.json` hashes every generated
code/vendor/license file from a clean isolated build.

The competent controller selects control approaches outside live arc volumes and
low debris-corridor stops, and visits the normal supply room when suit integrity
is low. Cargo route comparisons retain their direct/rail/bypass behavior. Campaign
seeds run independently so one failed trial cannot conceal the remaining trials.

Campaign/bot contexts install a test-only controller heartbeat. After a missing
1.5-second heartbeat, the page clicks the normal Pause button, releases captured
input through the game's own lifecycle flow, and logs a controller-delay event.
The controller resumes through the visible Resume button. Neither run state nor
clocks are assigned. This prevents host scheduling gaps from leaving thrust held
unattended. Paused time contributes no active/simulation time; all >=600s and
<=180s assertions remain unchanged. The normal performance group has no watchdog.
