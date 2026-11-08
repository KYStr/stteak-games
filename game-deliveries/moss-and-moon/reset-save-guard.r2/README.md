# Moss reset-save-guard r2 candidate overlay

Candidate: moss-and-moon-reset-save-guard-20261108-r2. Private preparation only; publication requires separate approval. This is not the approved slot-save-guard r1 package.

## Exact assembly
Use game-deliveries/moss-and-moon/source-recovery.r3 at KYStr/stteak-games commit 6d1016c3d007da0e8dc8a8667a6ac149223ccb4e as the immutable baseline. Copy its complete public/games/moss-and-moon runtime and replace only main.js with overlay/public/games/moss-and-moon/main.js from this package. The manifest enumerates the resulting 101 runtime files: 100 unchanged baseline files plus one r2 replacement. Do not mix any other main.js or use historical r3 manifests as current r2 hashes. Preserve source assets, licensing and provenance from the baseline.

r2 derives from r1 at commit 68746a2eb6c7d6c302cde39e9d360a2af7afe18c under game-deliveries/moss-and-moon/slot-save-guard.r1. r2 includes the r1 slot persistence guard and additionally fixes resetConfirm: persist accepts a candidate; save the fresh garden successfully before replacing current state. Failed save preserves current progress/selection/panel and does not announce success. CHANGE.diff is r1 to r2, not baseline r3 to r2. rollback/main.js restores r1, including its known reset failure defect; do not interpret rollback as a recommended release.

## Affected review and existing tests
TEST-RESULTS.json records the original reset-only run: r1 0 pass/3 fail; r2 3 pass, syntax PASS. It uses exact production branches, real rules/storage, and synthetic storage/UI doubles. Both slots, pending/backup/current write failures, success ordering, other-slot preservation and retry after failure are covered. To inspect or reproduce when separately authorized, assemble the full r2 source tree as working/ beside reset-save-guard.test.mjs, retaining package.json/module metadata from the baseline. The test imports working/public/games/moss-and-moon/{rules,storage}.js and reads working main.js. No tests were rerun for this preparation.

## Limits
No native GUI, audio, GPU or complete browser lifecycle evidence; no independent quality score or complete self-check claim. Historical slot tests, 70 tests, extension and build were not rerun. r1 test results do not prove r2 quality. This is a fixed source/runtime composition, not a deployed game. No workflow/deployment, credentials, private chat, actor records or policy data are included. All ten quality aspects remain unassessed for this new candidate.
