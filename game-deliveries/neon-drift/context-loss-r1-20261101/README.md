# neon-drift: context-loss r1 candidate

Candidate `neon-drift-context-loss-20261101-r1`. This is a source/runtime delivery, not deployment or product acceptance. No old quality score or release metadata is inherited.

## Source and scope
Baseline: [fixed source](https://github.com/KYStr/stteak-games/tree/086b53ddb01fc130e2a8108fa1aa512a4480f7eb/game-deliveries/neon-drift/rc3-r2-delivery-docs1). `PROVENANCE.json` binds the new source and exact baseline. After WebGL context loss, the game stays stopped and offers reload; normal resume/start cannot bypass the error. This intentionally does not implement automatic graphics restoration. Reload may lose unsaved progress; only previously persisted state can return. Physics formulas, save formats and assets remain unchanged.

`runtime/` is the complete static runtime. Its entry is `runtime/index.html`. Retain relative paths and included third-party license. Native graphics availability and behavior remain unverified. Do not substitute source inspection or pure Node fixture results for graphics, controls, sound, usability or independent quality evidence.

## Build and checks
The full source is reconstructed from the fixed baseline directory, then overlay source/ onto that root. The unchanged existing generated assets are required. Use original lock esbuild and @esbuild/linux-x64 0.25.0 plus Three0.170.0; do not substitute versions or run asset generators. Original command from reconstructed root: `node games/neon-drift/tools/build.mjs`. One bounded60-second build with Node heap256MiB completed exit0. Complete runtime18 files included; only game.js differs from baseline. Seven prior affected pure Node checks and module syntax passed; these were not repeated for packaging. Do not copy historical release.json: it identifies an older build.

## Rollback
Only restore after verifying every current delivery file against this candidate's MANIFEST.json and preserving newer edits. Restore `source/games/neon-drift/src/main.js` from `rollback/main.js` and `runtime/game.js` from `rollback/game.js`. Do not replace `runtime/main.js`: this Neon runtime has no such file. The other 17 runtime files and unchanged source remain at the pinned baseline. These are file-copy instructions only; they do not automatically modify any deployment or save data. The restored older version retains the context-loss resume defect.

## Limits and external gates
CHECKS.json states actual executed versus NOT_RUN work. No browser/native gameplay, real GPU-context-loss event or audio listening was performed for this candidate. All independent quality scores remain unknown. A published GitHub source directory does not create a playable HTTPS deployment. Same-candidate graphics access, approved normal/native execution, and independent rubric-based QC remain separate gates. No workflow or deployment configuration is added. MANIFEST.json lists all delivery files except itself; its digest is supplied outside the delivery to avoid self-reference.
