# Moss & Moon — recovery delivery r1

Candidate: `moss-and-moon-0022-recovery-delivery-20261101-r2`. This is a **new recovery delivery**, not the lost `delivery-docs.1`. No old quality score carries forward. The game owner and the historical candidate remain unchanged.

## What is preserved
101 served runtime files, 11,001,296 bytes, unchanged from the fixed public capsule at `6268b406efe9df3f11e1df7d99ad19e0057d91b9/qa-runtime/moss0022-served101.tar.gz` (SHA256 `18b33e63a95257bed3f8c378ca9bde5462ff62e28c83e367dde2c10a7113ca5a`). These include ten editable HTML/CSS/JavaScript top-level files, two Three.js bundles with its MIT notice, 77 GLB models, seven WAVs and four data manifests. New packaging is not new gameplay.

Nine historical source/recipe files plus the repository MIT license are preserved from commit `833c5214d33c0f89776c81d86df118d714760c6e`. Each exact path, size, Git blob and SHA256 is in SOURCE-MAP.json. They are not represented as the missing original docs.1 package.

## Inspect and verify
Run `python3 verify_delivery.py` from this directory. It checks the exact packaged file set and hashes, runtime count/bytes, original asset hash declarations, and the pinned source-to-runtime model import transform. It does not run a game, browser, generator or CI. The manifest intentionally excludes itself; the external handoff supplies its digest.

## Preview instructions (not executed for this delivery)
After verification, serve this directory with `python3 -m http.server 8000 --bind 127.0.0.1`, then open `http://127.0.0.1:8000/public/games/moss-and-moon/` in an authorized browser with WebGL support. File URLs are not a supported module-loading path. This guide grants no native session or network publication permission. Stop the server when finished. Save data remains browser/origin-local; switching port/origin may select a different storage area. Do not erase existing saves for a check.

## Editable and generated boundaries
Edit game modules under `public/games/moss-and-moon/` only in a new candidate; preserve this snapshot. The asset manifests describe authored procedural assets, not external sample/model imports. The model-kit source matches the original manifest hash and maps byte-for-byte to models.js after the pinned recipe's one import replacement. The audio-kit hash matches its original manifest. We did not re-export GLB/WAV or claim regeneration equivalence.

Historical `games/moss-and-moon/build.mjs` copies Three from node_modules; export scripts write runtime/assets and require the historical repo layout. Dependencies are not installed here. `npm test` in the historical package references tests not included in this recovery. Do **not** run these scripts over the fixed candidate or assume this is a full offline authoring toolchain. Future regeneration requires an isolated copy, pinned dependencies, authorized execution and a newly reviewed candidate.

## Licenses and constraints
Keep LICENSE and vendor/THREE-LICENSE.txt. ASSET-PROVENANCE.json preserves original project-authored rights declarations, not a newly invented legal certification. MISSING-AND-LIMITS.json explicitly records missing original bytes, upstream source and unrun native/quality checks. No claim of 1151 sources, 23 mappings, old maintainability90, full original ZIP recovery or release readiness is made.

## 歷史音訊文件與實際收錄範圍

保留的 audio-notes 為固定來源歷史文件，其 sources/audio/ 原始 WAV 路徑敘述不是本新恢復包已收錄全部檔案的聲明。本包未納入 sources/audio/ 的 WAV 副本；public/games/moss-and-moon/ 下原 7 個 runtime WAV 仍逐 byte 保留。需要來源 WAV 副本時應另取可追溯固定版本，不能把歷史敘述當作已交付證據。
