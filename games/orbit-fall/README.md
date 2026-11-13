# Orbit / Fall — 失落軌道

A local zero-gravity station adventure with three decks, 24 rooms, 18 repairs,
independent physical work cycles, six crew recordings and two endings. Authored
seed templates change freight layouts, actual optical geometry and interlocks.
Existing schema-1/2 journeys retain the original twelve-room campaign.

Build and serve from the repository root:

```sh
npm ci --prefix games/orbit-fall
npm --prefix games/orbit-fall run build
python3 -m http.server 8106 --bind 127.0.0.1 --directory public
```

Open `http://127.0.0.1:8106/games/orbit-fall/`. No account or service is required.
`src/` is authoritative; `optics.js` and `hazards.js` remain beside `build.mjs`.
The build copies source, pinned Three 0.180.0 and the audited Rapier 0.19.0 patch.
Original assets and licenses are retained. Never edit only generated runtime.

- WASD/arrows: camera-relative thrust; Q/E: ascend/descend; Space: hold brake.
- Shift: magnetic boots; T: tether the current cell within 4.2m. One tether at a time.
- F/click nearby device: interact. Cargo docks only at low speed for 1.5 seconds.
- M: map. Travel from a safe room or the marked exit. Escape: pause/return.
- H: paused conceptual hint, with deliberate full-step reveal; ?: manual.
- C: fixed/follow camera. Drag the background to orbit in follow view.

Collect boots/tether at A1. Complete six repairs on each deck to open the next.
Every new repair has at least three physical cycles (mixed relays have four or five), saved after
each cycle. Cargo uses separate cells/sockets; optics uses independent geometric
circuits; pressure uses remote isolation, venting, inspection and interlocked doors.
Safe rooms refill oxygen/health. All required repairs open the final terminal;
recordings are optional. Reset clears the current repair while retaining permanent
progress. Continue restores the current phase/positions with zero velocities.

Engineering/core freight offers a fast exposed crossing, slower magnetic rail
transfer (F at each grip; rail oxygen reduces base consumption to 10%), and an upper isolation bypass that removes
hazard exposure for the current delivery. Shift releases a rail. These are physical
routes with independent saved switch/grip states. Standard difficulty uses more
oxygen; story mode gives more exploration time. Timed challenges unlock after an
ending and have a visible replay seed and difficulty selector. Records separate
challenge/difficulty/variant/seed; old records remain in their legacy bucket.

Music/SFX sliders, reduced motion, height assist, optional direct answers and low
quality are in title/pause settings. Dialogs pause hazards, oxygen and timers, trap
focus and restore it on exit. Blur/hidden tabs release input and pause. Context loss
preserves the journey and offers resume after recovery. Normal software quality
retains a 960x540 clarity floor; low quality is explicitly softer.

Autosaves occur every 20 seconds and on actions/room changes/pause. Story/challenge
slots are separate. Export/import through the visible backup UI. Imports preview
and explicitly confirm overwrite, preserve recovery data and reject unknown future
schemas. Schema 3 stores campaign/seed/variant identity and partial work state.

Run all acceptance checks with:

```sh
npm --prefix games/orbit-fall test
```

See [test options](../../tests/orbit-fall/README.md) for an existing server,
`ORBIT_TEST_EVIDENCE=/absolute/path`, `ORBIT_TEST_SKIP_BUILD=1`, and development
short runs. Final cost evidence uses a 180-second soak including restart. Draw
calls, triangles, texture bytes, complete update time, allocation profiles and
<10% retained-heap growth are measured. SwiftShader frame times are reference
numbers, never pass/fail FPS gates. Fresh gameplay is distinguished from labelled
lifecycle fixtures in the JSON evidence. A failed/interrupted attempt stays failed.
Desktop keyboard/mouse and headless software WebGL are the verified targets;
physical mobile devices and GPU hardware are outside this workflow.

Expanded maps use A1–A8, B1–B8 and C1–C8; the final terminal is C8.
Original twelve-room saves retain their C4 terminal and original room IDs.
Challenge best labels refresh with seed/difficulty and show time, oxygen and thrust.
Space/Enter activates a focused native button; the focused brake button continues
to own held braking. Final acceptance includes independent groups and raw active-time
GC/allocation evidence; see the test README for development-only subsets.

The freight rail starts at the marked low control and automatically lifts the
load to the upper transfer line before crossing. This keeps waiting cells clear
of the route and trades travel time for lower oxygen and thrust use. A towed cell
cannot push a braking suit through their mutual contact; releasing restores normal
contact, and cargo still collides with the station and other cargo.

New expanded journeys use layout variant 2. C4 and the final relay introduce optical
power isolation: F at the power station to switch off, adjust the mirrors, then
return to restore power and light the receiver. Powered mirrors are locked; a
correct unpowered trace cannot complete a phase. Power and angles survive reload.
C6 retains four chambers with closer consoles. Saved expanded variant-1 journeys
retain their geometry and work phases. A rejected obsolete pressure prefix alone
is safely reset and explained; permanent progress remains. Unknown future layout
versions receive the same write protection as future schemas.

Round 5 uses optional guarded Rapier vector-copy adapters, owned native velocity
and gravity vectors, typed hot counters, fixed Float64 Three uniform caches, stable in-place renderer sorting.
The public Rapier getters and original embedded WASM remain unchanged. Recipes
verify exact upstream/output SHA-256, retain upstream originals and fail closed.
See `rapier-vector-patch.mjs`, `three-uniform-patch.mjs`, `three-hot-patch.mjs` and the original init patch.
The acceptance suite reproduces all generated application/vendor/license files in
an isolated directory and compares them byte-for-byte. No external services are used.
