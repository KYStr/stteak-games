# 逐潮之旅 · Tidebound

Sail seven original islands, investigate twelve discoveries, recover three lighthouse parts, repair the northern beacon and return home. The first complete story takes about 11–15 active minutes depending on rig and route. Six commissions, three rigs, three deterministic encounter charts, optional samples and separate records support replay.

## Run and verify

```sh
npm --prefix games/tidebound ci --no-audit --no-fund
TIDEBOUND_PORT=8108 TIDEBOUND_ARTIFACTS=/workspace/stteak8/work/tidebound/rounds/r4/full npm --prefix games/tidebound run verify
```

`verify` builds, then runs `check`: all unit/asset/input/audio/navigation/stage tests, an exact in-memory source/runtime comparison and headless Chrome acceptance. `npm --prefix games/tidebound run check` is read-only on game code. Chrome uses `/usr/bin/google-chrome`, SwiftShader, and Playwright from `/workspace/stteak8/tools/node_modules/playwright-core`. Only one browser and owned server are active at a time; major sections use fresh contexts, `finally` and signal handlers close them. The report records ownership, closure and runtime hashes. Review port defaults to **8108**, as specified by the current brief. Initialization allows 120 seconds on the shared CPU host and retains diagnostics on failure.

The default `scope: all` suite includes a real keyboard short commission, fresh-storage full story and replay, staged swimming and interactions, save fixtures for lifecycle/recovery, held Escape/M, three uncached normal-autoplay launches, real discovery reward/lesson checks, guardian entry grace, warm cues, real input-to-physics latency, pointer release, storage errors, back navigation, context loss, chart clearance and both desktop viewports. The story pilot only reads snapshots and sends real keyboard/mouse inputs; it never teleports or advances the clock. Active-time and wall-time measurements are separate. Three competent rig bots, a fixed-seed random bot and an idle first-dive loss also run. Allow extended time under shared CPU contention. A timeout remains a failure.

Fresh and restored-context sailing each receive a 180-second soak, with a real UI restart during the first. Additional 1920, dive and high-quality homecoming samples check shadow and main draw work, CPU update p95, GC-normalized heap, listeners, resources and one game RAF. Exact-bundle source-mapped allocations distinguish application, engine and telemetry stacks. An Acorn gate rejects recurring frame/physics/scene containers; equal-window normalized GC rates must remain stable within one collection or 10% sampling variation. Profiles and GC traces are retained. Gates follow the rubric: ≤250 calls, ≤1.5M triangles, ≤256 MiB texture storage, update p95 ≤6 ms, <10% heap growth, stable listeners/RAF/GPU resources, DPR ≤2 and ≤30 MiB initial transfer. Frame mean/p95 under SwiftShader are reported for reference. Shadow work is included by resetting renderer counters before the complete render and disabling Three's internal main-pass reset. A conservative texture bound covers the 768² shadow map and bounded bone textures. Unit tests inject over-budget calls/CPU to verify the gates.

`TIDEBOUND_SCENARIO=smoke|regressions|story|performance` runs an explicitly partial scenario. `TIDEBOUND_SOAK_MS` shortens debugging soaks; omit it for full acceptance. Set `TIDEBOUND_ARTIFACTS` to a new directory for each attempt. A passing partial scenario is not a full pass.

Continuous rules pilots provide additional reproducible pacing, stage, seed and bot evidence:

```sh
TIDEBOUND_ARTIFACTS=/tmp/tidebound-model node tests/tidebound/model-evidence.mjs
```

These model runs are labeled separately from browser acceptance. They include five starts per stage/variant, all rigs, standard idle loss, random input, competent navigation, and deterministic encounter signatures.

Serve manually with `python3 -m http.server 8108 --bind 127.0.0.1 --directory public`, then open `http://127.0.0.1:8108/games/tidebound/`. All models, modules and audio are local.

## Play

- **W / S** or **↑ / ↓** raise/lower sail; **A / D** or **← / →** steer. **Space** furls and brakes.
- Approach a gold mooring, slow below 1.4 m/s, then **E** to dock. **E** investigates ashore.
- Underwater, **WASD / arrows** swim. Follow the line and teal station marker, come within 4.5 m, then **E**. Each completed station refills oxygen; complete the checklist before collecting the gold part. Emergency surface is always available.
- **Coral:** three habitat observations, 55 seconds oxygen. **Reef:** four valves opening for half of each six-second cycle, 50 seconds oxygen, a gentle visible current band. **Ruin:** four stations and an outlined guardian-current sweep; amber warns two seconds ahead, contact costs at most four oxygen with a two-second cooldown, 45 seconds oxygen. Each new guardian entry grants two saved seconds to move clear. Swim outside its ring to avoid it.
- Main-part order is coral → reef → ruin. Every island remains explorable. Existing parts automatically complete the corresponding new task lists.
- Standard expedition supplies last fifteen active minutes, refill at home and once per newly recovered part, and warn at 120/60/15 seconds. Depletion rescues you home without erasing permanent progress. Relaxed mode disables supply pressure; underwater oxygen remains.
- **M** opens the chart and pauses; **C** switches camera; **Escape** pauses/resumes. Holding a toggle key cannot dismiss its own overlay. Mouse presets/helm, touch controls and keyboard menus are supported.

Three encounter charts change safe survey positions/subsets, task order or hazard phase while preserving the coastline and safe routes. An active voyage retains its resolved chart across reload; selecting another chart at home affects the next departure. Optional buoys consume cargo and award collectible marks. All rigs and repairs are free. Replay targets are fastest swift voyage, clean steady gold rank, and maximum-sample cargo expedition. Records are separated by contract, rig and chart; earlier combined records remain explicitly labeled. Gold means complete/no rescue/no damage, silver complete/no rescue, bronze complete with rescue. Best time, damage, samples and rank never regress.

## Lifecycle and source

Autosaves occur every fifteen seconds, on pause/page exit and important actions, including station activation. Continue restores position, oxygen, tasks, supplies, discoveries, cargo and guidance without consuming offline resources. Corrupt saves recover visibly; schema-one saves migrate with defaults. Rescue halves ordinary cargo, preserves parts/discoveries and repairs the boat. Menus, blur, hidden tabs and WebGL loss freeze simulation and release inputs. Restoration leaves the game paused. Settings include music/effects volume (zero mutes), reduced motion and adaptive graphics. Journal export reports whether local saving succeeded.

Edit `src/` and rebuild `public/games/tidebound/`. Original procedural sources are retained in `models.js` and `generate-audio.mjs`; nine local PCM sounds include sail, steering and oxygen cues. All nine sounds prepare through offline decoding before departure becomes available; output remains locked until a real gesture. Cold and warm intent cues are immediate and voices are bounded to eight. All asset hashes, provenance, licenses and Three notices are retained. `window.tidebound` provides read-only snapshots and bounded diagnostics. See [round 4 validation](../../docs/tidebound-round4-validation.md) for actual results and limitations.
