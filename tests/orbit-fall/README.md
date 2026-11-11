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
