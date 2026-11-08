# Moss & Moon: slot save guard r1

Candidate: `moss-and-moon-slot-save-guard-20261108-r1`, build version `1.0.17-rebuild.5`.

## Fixed source and assembly
Baseline repository: KYStr/stteak-games, commit `6d1016c3d007da0e8dc8a8667a6ac149223ccb4e`, path `game-deliveries/moss-and-moon/source-recovery.r3/`.
Baseline candidate: `moss-and-moon-0022-maintenance-recovery-20261101-r3`.
Use a new disposable copy of that exact baseline. Preserve its existing licenses and assets. Replace only `public/games/moss-and-moon/main.js` with the file under `overlay/`. The result has 101 runtime files: 100 unchanged baseline runtime files and this one replacement. MANIFEST.json supplies every assembled runtime hash. Do not apply this to an unidentified Site build or overwrite an existing working tree/player save.

The baseline has no separate maintained main.js source: the editable served module is the source and runtime for this repair. No bundler, dependency installation, asset regeneration or new media is needed. Baseline root metadata, including PACKAGE-MANIFEST.json, remains historical and must not be presented as verifying the modified candidate. Use this overlay's manifest for the derived runtime. This is not a reconstruction of lost Site v3/docs.1.

## Change
When persistence fails, switching gardens previously replaced the only unsaved in-memory state anyway, including a same-garden click. persist() now returns its success value; the slot click path exits before changing state, loading another garden, closing the panel or rendering if persistence fails. Successful persistence retains the prior switch sequence. BUILD/VERSION distinguish this derived candidate.

## Focused verification
Run `node --test slot-save-guard.test.mjs` from this overlay directory. The test evaluates the exact production persist function and slot branch with synthetic dependencies; no browser, renderer, audio, server or real player storage is used. To reproduce the original failure use `MOSS_MAIN=./rollback/public/games/moss-and-moon/main.js node --test slot-save-guard.test.mjs` (expected exit 1, two failing cases). Results are in TEST-RESULTS.json. These are application-control-flow regression tests, not actual browser or quality evidence. Historical 70 tests, extension example and full rebuild were not rerun. Native GUI, sound, WebGL2, performance and full quality scoring remain NOT_RUN.

## Rollback and limits
Replace only the modified main.js with rollback/public/games/moss-and-moon/main.js and verify its recorded hash. No save schema or user data changes are included. Source publication is distinct from deployment, independent acceptance or release readiness. This packet carries no new permission to run restricted operations or publish/deploy. Existing baseline LICENSE and vendor/THREE-LICENSE.txt continue to apply.
