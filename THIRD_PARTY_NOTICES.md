# Third-party notices

The first-party MIT grant does not relicense the following components.

## Three.js — MIT

Neon Drift pins `three@0.170.0`; the other seven games pin `three@0.180.0`. Original Three license texts remain beside each bundled/runtime engine and the retained Orbit helper sources. Generated bundle legal comments must remain intact. Some loader/helper imports are rewritten to local paths by the retained build recipes.

Upstream: https://github.com/mrdoob/three.js — pinned license reference: https://github.com/mrdoob/three.js/blob/r180/LICENSE

## Rapier3D compat 0.19.0 — Apache-2.0

Orbit / Fall uses `@dimforge/rapier3d-compat@0.19.0`. Preserve:

- `assets/games/orbit-fall/vendor-sources/rapier-0.19.0.mjs` and `.wasm`: retained upstream input.
- `assets/games/orbit-fall/vendor-sources/rapier-LICENSE.txt` and the runtime/build copies: original Apache-2.0 license text.
- `games/orbit-fall/rapier-init-patch.mjs`: exact, hash-guarded `compat-0.19.0-init-object-1` patch.
- `assets/games/orbit-fall/vendor-sources/manifest.json`: input, WASM, unannotated patched-payload and public-distribution identities.

**Modified-file disclosure:** the pre-existing project patch wraps the same internal WASM initialization `ArrayBuffer` in the existing `module_or_path` object. Public `init()` and original WASM remain unchanged. For this public distribution, a prominent notice header is added to `public/games/orbit-fall/vendor/rapier.mjs`, and its build recipe reproduces that header. The raw patch payload still has its original guarded SHA256; the complete annotated distribution has a separate SHA256. No claim is made that the modified JavaScript is untouched upstream code.

Upstream: https://github.com/dimforge/rapier.js

## Developer dependencies

The eight game lockfiles retain their declared dependency versions and license metadata. esbuild, Prettier and Three are MIT; Playwright packages are Apache-2.0. Tool installations, browser binaries and `node_modules` are not included in this source distribution. Preserve applicable licenses if redistributing those dependencies separately.

## Fonts

This public launcher uses system fonts and contains no Google Fonts request or redistributed font binary. The previous, excluded platform UI referenced Barlow Condensed and DM Sans, which remain under SIL OFL 1.1, not the project MIT grant. If adding either font later, preserve its applicable original copyright and OFL text:

- https://github.com/google/fonts/blob/main/ofl/barlowcondensed/OFL.txt
- https://github.com/google/fonts/blob/main/ofl/dmsans/OFL.txt

## Media

Existing asset-specific grants and provenance remain unchanged. Dust Redemption's synthesized audio has an existing CC0-1.0 declaration; see `ASSET-LICENSES.md`.
