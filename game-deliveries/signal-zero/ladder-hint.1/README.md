# Signal Zero — ladder hint correction r1

Current candidate: `signal-zero-ladder-hint-20261101-r1`. Read `CURRENT-MANIFEST.json` for this complete delivery. This is a new candidate, with no inherited quality scores or native acceptance.

## Baseline and current scope
Based on the preserved source package at KYStr/stteak-games commit `9486091560342cb34d519769c56fd097634ee70b`, `game-deliveries/signal-zero/source-recovery.1/`. Two product files change: `games/signal-zero/src/app.js` and its generated `public/games/signal-zero/app.js`. All other66 original files are retained byte-for-byte as historical baseline evidence. In particular the retained `MANIFEST.json`, `SOURCE-MAP.json`, `LIMITATIONS.md` and recovery documentation describe that baseline, not the current repaired candidate. Their original candidate IDs, hashes and old NOT_RUN statements must not be used as this version's manifest/status. Current scope and later self-checks are in this README, CURRENT-MANIFEST and AUTHOR-CHECK.

The normal “W／互動 ↑ 攀梯” instruction now requires the same first ladder range as the existing core: horizontal distance<0.75, bottom−0.12≤height≤top+0.12, height<top−0.01 and expired jump buffer. It invites pressing up, rather than requiring up already held. Terminal instructions retain priority. Physics, saves, controls, geometry, route, guard and acceptance rules do not change. This normal HUD affordance follows the existing refresh interval; it is not proof of a future input outcome or stable landing.

## Run/build and rollback
Use the retained DELIVERY-GUIDE for the supplied source/vendor copy build and original package lock. Retain supplied GLB/collider/audio assets; an empty-runtime asset reconstruction is not promised. Current source and public app.js match exactly after the original build. See AUTHOR-CHECK for the limited checks actually performed.

ROLLBACK.diff restores the two changed app.js files to the exact fixed baseline; apply only after checking the current hashes in CURRENT-MANIFEST. Other66 baseline files already match. Alternatively use the entire fixed baseline commit. Do not apply this patch to unrelated revisions.

## Still unverified
GUI, actual listening, native gameplay/campaign completion and all independent quality scores for this new candidate remain NOT_RUN/null. This hint repair is not proof of the cause of a historical native failure and does not repair a traversal observer or native harness. The existing wrapper must not be pointed at changed product bytes without its own matching identity/scope. Missing21 canonical references, unrecovered original85-file delivery and incomplete asset/test regeneration closure remain unchanged. Source preservation is not deployment or product acceptance. No private coordination or user data is included.
