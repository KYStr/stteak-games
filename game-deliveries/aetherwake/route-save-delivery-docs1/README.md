# Aether route-save.1 / delivery-docs.1 — Aether-only source delivery

Use `npm ci --prefix games/aetherwake --ignore-scripts --no-audit --no-fund`, then `npm --prefix games/aetherwake test`, `node games/aetherwake/scripts/build.mjs`, and `node games/aetherwake/scripts/release.mjs`. Root package is retained only for original metadata/ESM scope; root all-game/Vite commands are not supported in this subset.

This package contains production Aether sources, exact lock, official scripts, original asset sources/recipes/rights manifest, Aether tests and all 60 runtime files. It excludes old GUI evidence, other seven games, repository history, and installed dependencies. The legacy asset verifier requires two old Windows environment logs deliberately not included. The actual current read-only entry point is now delivered **inside this source package**: `node scripts/aether-delivery/verify-assets.mjs`. It checks current asset hashes, formats, CPU geometry and source snapshots, but explicitly does not verify the historical Windows environment. Never fabricate those logs or overwrite the historical `asset-verification.json`. GUI, real devices, real audio and new-candidate scores remain untested.

Start with [the minimal content, verification and rollback guide](docs/aether-delivery-maintenance.md). It gives exact prerequisite checks, isolated-copy commands, a one-item data-only extension, normal-input/SaveStore validation, official build and byte-exact restoration. The example stays out of this candidate. `DELIVERY.json` identifies the new documentation delivery separately from the unchanged route.1 runtime. The original route.1 delivery did **not** contain these instructions/tools; its old outer-wrapper reference was invalid.

Continuity regression checks (CPU VM, not browser): `node --experimental-vm-modules --test tests/games/aetherwake/main-continuity.test.js tests/games/aetherwake/main-recovery.test.js tests/games/aetherwake/storage-pending.test.js`. The whole main fixture uses real source main/simulation/storage and exact bundled input, with DOM/Scene/audio/bridge transport/timer/storage doubles. New lifecycle tests need the VM flag; use it when running the entire test glob.

The game package test command now includes `--experimental-vm-modules` for its new whole-main fixture; dependency versions/lock and build recipe are unchanged.

Result persistence status: `node --experimental-vm-modules --test tests/games/aetherwake/result-status.test.js` (five new CPU whole-journey cases, not browser quota injection).

## Route clock correction

Build `aetherwake-route-save-20261028-01` adds optional schema-3 `segmentStart`. Fresh expeditions start at zero; known clocks survive save/reload. Missing/invalid clocks, including invalid raw elapsed, are unknown (`null`), so that route does not update a PB. An actual next station starts a new known clock. Existing PBs, including historical zero values, are preserved; lost historical records are not reconstructed. Source gameplay changes: `simulation.js`, `storage.js`, and candidate identity `version.js` only.

Affected CPU checks: `node --experimental-vm-modules --test tests/games/aetherwake/route-clock.test.js tests/games/aetherwake/rules.test.js tests/games/aetherwake/save-v3.test.js tests/games/aetherwake/storage-pending.test.js tests/games/aetherwake/main-continuity.test.js tests/games/aetherwake/main-recovery.test.js tests/games/aetherwake/result-status.test.js`. These are CPU fixtures, not WebGL/native gameplay acceptance. This package does not authorize installation, publication, CI, or environment changes.
