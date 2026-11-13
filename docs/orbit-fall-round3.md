# Orbit / Fall — round 3 implementation

Authoritative application: `games/orbit-fall/src/`. Build:
`npm --prefix games/orbit-fall run build`. Generated application and pinned vendor
remain under `public/games/orbit-fall/`; original licenses/vendor audit are retained.

The new campaign is version 2: 24 rooms, eighteen required repairs, three decks,
independent freight cells, multiple real optical circuits and pressure interlocks.
Work phases save their identity, object positions, dials/sequences and route state.
Mixed relays retain cargo between mechanic families. Core tasks add longer relay
combinations and chamber transfer controls. Campaign version 1 retains the original
12 rooms and six objectives. Schema 3 explicitly migrates older saves to version 1;
completed legacy stations remain unlocked. Player backups accept old schema-2
exports and preserve their campaign identity.

`run-variants.js` provides unsigned seed identity, xorshift32, stable room hashing
and bounded authored templates. Physics, scene, interactions and hints receive the
same resolved phase. Geometric optical solutions are tested across seed templates.
Challenge UI supports seed/difficulty entry. Records separate challenge, mode,
variant version and seed, with legacy records retained in their original bucket.

Engineering freight supports direct hazard crossings, player-operated magnetic
rail grips with a supply-line oxygen benefit, and an upper isolation bypass. Route
and switch progress persist; restored velocities/tether are safely reset. Hazard
warning and contact use the same clock/stage parameters.

The simulation reuses input vectors, physics options/scratch velocities and tick
flags. Optical traces change only with dial revision. Beam positions write into a
fixed buffer. Marker projections/layout use reusable workspaces and typed CSS
transforms; label caches reset when DOM nodes are recreated. Application update
measurement includes simulation, view, markers, HUD and bookkeeping before render.
Timing rings and room/phase caches are bounded; the cache disposes evicted rooms.
Rapier binding allocations remain upstream behavior and are not hidden by patches.

Acceptance: `npm --prefix games/orbit-fall test`. Optional existing server:
`ORBIT_TEST_URL=http://127.0.0.1:8106/games/orbit-fall/`. Independent QA can set
`ORBIT_TEST_SKIP_BUILD=1 ORBIT_TEST_EVIDENCE=/absolute/path`. A short development
soak is explicitly labelled; final cost measurement requires 180 seconds/restart.
SwiftShader average/p95 are reference observations, never FPS gates. Cost checks
use full-update p95, actual draw/triangle counts, independent WebGL upload/storage
accounting, <10% GC-backed retained growth, listener/RAF/renderer stability and DPR.
Raw unforced heap observations and separate optics/cargo allocation profiles are
retained. Failed attempts remain failures in their own evidence directories.

The real-input campaign controller uses collision-aware approaches, without
progression mutation, teleportation, accelerated clocks or mandatory reading waits.
It records phases, simulation/browser/controller times and partial-phase reloads.
The bot matrix covers three freight approaches, ten seeds per stage and natural
idle/random timeouts. Functional compatibility/lifecycle fixtures are labelled
separately from the fresh campaign. Final results are recorded in the round summary.
