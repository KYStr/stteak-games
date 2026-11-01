# Moss & Moon — source reconstruction supplement

This supplement records a later source-regeneration check for `moss-and-moon-0022-recovery-delivery-20261101-r2`. The original recovery snapshot remains unchanged:

https://github.com/KYStr/stteak-games/tree/72bf68e58bdf7f45403ac923306f961dc24b5082/game-deliveries/moss-and-moon/source-recovery.1

It does not recover the lost original docs.1 archive or transfer its scores. The package's original NOT_RUN statements describe its assembly time; the later check below adds evidence without silently rewriting that history.

## Observed result — 2026-11-01

Node v24.22.1. The unchanged `build.mjs`, `export-assets.mjs` and `export-audio.mjs` each ran once in an isolated disposable copy and exited0. The reconstructed served tree contained exactly101files/11,001,296bytes; all paths and SHA256 values matched the fixed snapshot. The source and recipes stayed byte-identical.

Only nine directly-maintained runtime files were seeded: `storage.js`, `audio.js`, `content.js`, `index.html`, `world.js`, `rules.js`, `bridge.js`, `style.css`, `main.js`. No prebuilt `models.js`, `vendor/` or `assets/` directory was used in the output tree. The recipes regenerated92files:77GLB,7WAV,4dataJSON,models.js and3vendor files. Source-side WAV copies were also regenerated; these are newly produced from the original deterministic source, not recovered historical copies.

## Prerequisites and safety

Use a new working directory, never the fixed recovery snapshot or an existing player's storage directory. Retain the historical repo-relative layout. Keep `games/moss-and-moon/` and `assets/games/moss-and-moon/` from the fixed snapshot. The nine runtime files above belong under `public/games/moss-and-moon/`.

The production dependency is the **complete** `three@0.180.0` package at `games/moss-and-moon/node_modules/three/`, including GLTFExporter and its imports, build files and LICENSE. Merely copying the runtime's two vendor bundles is insufficient for asset export. In this check an existing lock-installed package was copied, with all1117files byte-identical to that installation. Its package-lock entry exactly matched the Moss lock:

- URL: `https://registry.npmjs.org/three/-/three-0.180.0.tgz`
- Integrity: `sha512-o+qycAMZrh+TsE01GqWUxUIKR1AL0S8pq7zDkYOQw8GqfX8b8VoCKYUoHbhiX5j+7hr8XsuHDVU6+gkQJQKg9w==`

This check did not perform a fresh installation, download a browser or run npm lifecycle scripts. If this dependency is unavailable, resolve that dependency through the normal authorized installation process; this document does not grant installation, network or native-session permission. The historical lock remains historical and is not claimed to be the missing production-only lock. Playwright is not needed for these three generators.

## Reproduction commands

After preparing the isolated layout and the verified dependency:

```sh
cd games/moss-and-moon
node build.mjs
node export-assets.mjs
node export-audio.mjs
```

Stop and preserve logs on any nonzero result. Do not retry blindly or publish changed output. All three recipes write files: build copies vendor; model export writes models, colliders, model-index and asset manifests; audio export writes runtime audio, source-side WAV copies and audio manifests. Never run them over the sealed package.

Compare the complete reconstructed `public/games/moss-and-moon/` pathset, byte lengths and SHA256 against the corresponding entries in the fixed `PACKAGE-MANIFEST.json`; require no missing/extra/different files. Comparing only counts is insufficient. The whole-package `verify_delivery.py` is not a build-workspace checker: additional node_modules and source-side generated files are expected in a work directory and must not be mistaken for part of the original117-file delivery. Do not copy those extras into the old package merely to make its checker pass.

## What this result does not prove

It establishes exact source-to-served-runtime reconstruction for these bytes in the recorded Node environment. It does not establish native GUI, real listening, performance, save/recovery matrices, absent historical tests, full original platform reconstruction or an independent quality score. It does not change runtime gameplay or resolve any original unknown bytes. No existing quality verdict should be inferred from generator assertions or this successful rebuild.
