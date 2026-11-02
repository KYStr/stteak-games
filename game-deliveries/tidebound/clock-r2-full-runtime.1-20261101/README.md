# Tidebound clock r2 — complete static runtime assembly

Candidate `tidebound-clock-r2-full-assembly-20261101`. This directory now includes all 78 served runtime files, not only the seven-file source overlay. Runtime entry: `runtime/index.html`; preserve relative paths. This is an isolated file assembly, not a new build, gameplay execution, deployment or quality acceptance.

## Reproducible source mapping
`RUNTIME-MANIFEST.json` gives every runtime path, byte count, SHA256 and fixed GitHub source. Exactly `game.js` comes from commit `8b2cdfc72c03b1d450460ccbfc5e973491037230`, path `game-deliveries/tidebound/clock-r2-source.1-20261101/runtime/game.js`; its 700073 bytes/SHA256 `9b4fbae404aad2136937c21059b001011582eb9bfb093ba1566a4fd0e58ba57f` are unchanged. The other77 files remain byte-identical to the C1 capsule and C2 manifest. Preserve existing author history and third-party license; no new license is granted.

`BASELINE-SOURCE-MANIFEST.json` is the exact historical C2 manifest from `fab368a0d99808d26a9b747d2a1797e46b5f8e5a`. Baseline capsule at `99b83ef5e6fc7b4943bf028321984bf90fbffde5`, `qa-runtime/tide-time-ledger-served78-diag1.tar.gz` (1424273 bytes, SHA256 `87668e558b03137ea9bb2ecb1c633237314d5169e84459da105e84f6fcd5cad8`). Its own game.js is C1, not r2. Do not label the old capsule as containing this new runtime.

To reproduce the runtime into a NEW, nonexistent directory after acquiring those exact inputs:
`python assemble.py BASELINE_CAPSULE.tar.gz EXACT_R2_GAME.js NEW_OUTPUT_DIRECTORY`
This copies verified bytes and produces the runtime manifest/rollback only. It does not execute product code or generate audio/models. The remaining documentation/evidence in this package describes the result, rather than being generated product code.

## QA entry — do not launch without applicable execution authorization
For an authorized future GUI session, serve only `runtime/` on a loopback HTTP origin and navigate to its `/index.html`; file:// is not an adequate module/asset QA origin. One conventional command is `python -m http.server 8765 --bind 127.0.0.1 --directory runtime`. This command/server/browser was NOT started for assembly. WebGL graphics, audio and storage must be verified in that actual authorized session. No public URL or new deployment exists for this isolated directory.
`QA-GATE.json` explicitly keeps executionReady/nativeAuthorized false. The original diagnostic source-contract also remains unchanged and disabled; no runner/workflow is included or enabled here. Any new diagnostic/native run still needs the exact source/capsule identity and applicable approval; do not bypass that using this document.

## Historical metadata and limitations
`runtime/release.json` is deliberately retained unchanged among the77 baseline files. Its bundle hash, source hash, build/PASS and publication fields refer to an OLDER product, not r2; it is not authoritative identity or acceptance for this assembly. Use RUNTIME-MANIFEST.json and QA-GATE.json instead. The original UI build label is likewise historical. No old numeric quality score is inherited.
AUTHOR-CHECK.md and evidence/offline-result.json describe the already completed bounded offline checks, not new executions. Raw historical10/10 labels are explained there; actual budget is11/11 used. No twelfth test, new build, browser, audio listening, GPU measurement or native gameplay occurred. Clock/input changes can cause slow motion, jumps or frequent-input starvation; natural focus/BFCache behavior and full three-P observation are not verified. All ten quality dimensions remain unscored for this candidate.

## Rollback
Preserve this directory. Only in a separate working copy whose current game hash matches this r2, replace runtime/game.js with rollback/game.js: fixed C1 `715d424b272e6602f6650db4dd58cfca4d47094b`, SHA256 `41dcb538ebbce62f7c9abc9fb4f5837933097d51947b613c0192ff3ec146e9e1`. The other77 files do not change. The new RUNTIME-MANIFEST will no longer describe that rollback copy; verify against BASELINE-SOURCE-MANIFEST instead. No rollback of deployed data or save-format migration is performed. Physics formulas and save format were not changed by assembly.
