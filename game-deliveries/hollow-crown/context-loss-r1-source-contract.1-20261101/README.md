# Hollow Crown r1 — source asset-contract correction

Delivery ID: hollow-crown-context-loss-r1-source-contract.1-20261101.
Runtime candidate ID and BUILD stay hollow-crown-context-loss-20261101-r1. This is a two-file source metadata overlay, not a new runtime, deployment or quality approval.

## Exact composition
Repository: KYStr/stteak-games.
1. Restore source root from commit 1493581e6667f4cb2dd7d25029b4943f8e4a4bd6, directory game-deliveries/hollow-crown/input3-delivery-docs1-public-source.1-20261029/.
2. Replace public/games/hollow-crown/ with the complete 55-file runtime/ from commit 0d4fe974f750a7dd87d2ad1e8298efa08879d799, directory game-deliveries/hollow-crown/context-loss-r1-20261101/. Respect its MANIFEST.json. Runtime main.js is 33824 bytes, SHA256 fbd5732666e32edb5bb489bba2576cf27351c6b5c9b467dfe0f96f8b508a0936; the other 54 files stay unchanged.
3. Overlay this directory's assets/ into that source root. Only assets/games/hollow-crown/manifest.json and assets/games/hollow-crown/recipes/export-assets.mjs change. This delivery's MANIFEST.json pins both files and this README.

These three fixed components, together, define the corrected source delivery. The historical source directory is preserved and must not be used alone as the corrected contract. No runtime assets, game formulas, input, save format, dependencies or build commands change.

## Correction and evidence limits
Nine static props have no skeleton or weapon mount. Their manifest rig and weaponMount fields are null, not unconditional humanoid declarations. The exporter obtains bone/mount facts from the actual object hierarchy. All 22 asset entries retain the same runtime paths and hashes; all other manifest JSON values are identical to the source baseline. The exporter change affects describe() metadata after GLB export/write, not geometry or audio generation.

The two files restore the previously reviewed source-contract artifact identified as 0563cee19aa21894c84bf426ea540b321c08f4c7. That historical commit is an artifact provenance reference, not a promise that it is reachable in this repository. The full corrected files are included here, so composition does not require that historical remote commit. Exact file identities are in MANIFEST.json.

Prior clean-build evidence is bounded to unchanged build/dependency inputs and generated assets; no new build is claimed. Current r1 necessary portable author checks passed separately, with one disclosed VM fixture binding for the context-loss latch; test counts do not establish product quality. This metadata repair was checked by source/data comparison only. New build, native GUI, physical audio and full quality acceptance remain NOT_RUN or unestablished. Independent quality review is separate.

## Rollback and reproducibility
To undo only this source overlay in a disposable composition, restore the two assets/ paths from the fixed 1493581e source prefix above. This restores the old inaccurate metadata; it does not fix it. Do not overwrite newer edits. The 55-file r1 runtime is untouched in either direction. Preserve this delivery and historical source records.

The original game build entry is npm run build from games/hollow-crown/, with the original locked Three.js 0.180.0 dependency. It copies vendor files and regenerates model/texture/audio assets; it is not needed merely to read this correction. No install, build, asset regeneration or browser execution was performed for this delivery. Any future execution must use its own authorized scope and retain exact outputs and logs.
