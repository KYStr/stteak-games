# Hollow Crown — round 1 build evidence

The game now offers a default six-arena / two-boss Twin Crown expedition, with the original four-room route and optional oaths retained. The longer journey saves at every entrance and choice, handles both crown encounters, and exposes progress, waves and charge readiness in the HUD. Route controls are disabled when both routes are part of the expedition.

Keyboard navigation now focuses dialogs synchronously, traps Tab, and returns with Escape. Confirmations focus the safe return action. Camp content fits at 1280×720; 1920×1080 and portrait screenshots are included. Boss notices no longer cover the boss HUD, and boss encounters no longer display a zero-wave counter. Guard cancels a held charge. Mute preserves independent music/effect volumes. Restore validates run identity as well as combat state.

Automatic graphics select simpler stone geometry, vertex lighting and contact shadows on software renderers. Rigid prop pieces merge by material, with bounded shared geometry caches. Canvas resolution adapts independently of native-resolution HUD text. Slow frames use the rules module's substeps instead of limiting all simulation progress to 50ms.

## Reproduce

```sh
npm --prefix games/hollow-crown ci --registry=https://registry.npmjs.org
npm --prefix games/hollow-crown run build
npm --prefix games/hollow-crown run check
```

The final command runs 73 unit tests, the functional browser suite, and targeted layout checks. Chrome and the static HTTP server are sequential, use port 8103, and close in finally blocks. The suite requires the configured Chrome and Playwright paths in the game README.

## Observed results

- All 73 unit tests passed, including both route simulations, the Twin Crown win, every long-expedition save boundary, geometry batching, and render budgeting.
- The browser pilot completed the tutorial and all eight expedition encounters using keyboard/menu input: 49 kills, 0 hits, 135.8 simulation seconds. The pilot sees exact threat geometry and is not human pacing evidence.
- Win/lose/restart, reload/Continue, settings/mute, blur/audio suspend/resume, backup recovery, malformed profile recovery, reduced motion, focus, responsive dialogs, and context-loss reload passed.
- No uncaught errors, console errors, or failed HTTP requests were observed in the functional suite.
- Three-minute live measurement: 189.5s wall time; GC heap +1.08 MiB; listener count 76 → 77. Caches and sample windows are bounded.
- Measured SwiftShader frame average **127.3ms**, p95 **283.3ms**; CPU render-submit p95 5.5ms. These timings **do not meet the performance target**. Resolution reached 432×243; the HUD remains native resolution.
- A repeated build produced identical asset/manifest hashes; runtime kit and editable model source compare byte-for-byte equal. Engine and asset notices remain intact.

## Remaining limitations

SwiftShader frame pacing is the main unresolved quality gap, despite simpler geometry, batching and resolution adaptation. Independent QA must assess performance and visual quality on its own run. No human test establishing a ten-minute session or difficulty/pacing score has been performed. Save import is not exposed; export and automatic restore/backup recovery are available.

Machine-readable evidence: `tests/hollow-crown/artifacts/acceptance.json`, `polish.json`, `unit-tests.txt`, and `build-check.txt`. Screenshots in that directory show camp at 1280/1920/mobile, tutorial completion, boss combat, victory, pause, settings, and graphics recovery. The functional pass flag is not an assertion that every QA rubric dimension is at least 90; `performanceBudget.met` is false.
