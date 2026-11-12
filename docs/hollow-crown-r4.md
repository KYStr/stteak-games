Round 4 repairs the tutorial HUD, warning validator, result labels and environmental damage names, and adds explicit resource ownership evidence. Runtime modules in `public/games/hollow-crown/` remain authoritative; the deterministic asset build still reproduces all 42 generated assets/vendor files without vendor modifications.

Outgoing wave actors return to their original pools before replacements borrow them. Dead authoritative enemies retain their death animation. Startup uploads the shared bolt and health-plane geometry and activates each declared animation binding on the existing finite rig pool. Returning to camp releases the expedition navigation LRU. Warning fill and instanced ticks use distinct synchronized materials, eliminating the measured shader-parameter rebuild allocations. Cue generations, projection records, traversal storage, collision lists and HUD values reuse owned storage; invalidation releases queued scene references.

The real tutorial warning strip is tested after charging, menu/resume, resizing and restart. Fixed owned roots and mutation references preserve conservative rejection of unknown/substituted roots, illegal meter widths and overlays. Tutorial feedback has separate positions at 1280×720, 1920×1080, 390×844 and 800×450; the portrait position leaves space below the room label. The 720p camp fits its controls and primary actions without scrolling. Tutorial results display `5 / 5 試煉完成`; expedition results retain `12 / 12 普通房完成`. Damage IDs remain compatible with old saves and telemetry while UI text displays `場地交火`. Mute cancels automation and immediately reaches zero gain.

The 18-case rules matrix passed. All seven live cases completed: accessible mobility/counter/burn wins at 790/794/735 active seconds, a standard burn win at 741 seconds, and idle/random losses with zero rooms cleared. The counter run recorded 26 parries and 1,045 counter damage; the mobility run recorded no parries and more dodges. These are scripted visible-cue results, not a human enjoyment claim.

Reproduce from the repository root:

```sh
HOLLOW_TEST_PORT=8103 HOLLOW_ARTIFACT_DIR=/tmp/hollow-r4-release npm --prefix games/hollow-crown run check:release
HOLLOW_ARTIFACT_DIR=/tmp/hollow-r4-repro node tests/hollow-crown/repro.mjs
```

The release runner records every independent result and exits nonzero if any gate fails. Acceptance retains all 14 encounters, at least 180 seconds active play, ten restarts, both GC boundaries in the same camp before/after the expedition, and all original resource assertions. Diagnostic-only scene inventories and CDP heap snapshots identify owners; peak resources are reported separately. Retention assertions run after independent lifecycle assertions so a memory failure does not hide save/context/death coverage. No quick pacing or timeout-as-win mode is used.

Known remaining release failures: the strict zero-recurring-application-allocation gate still finds named JavaScript hot paths; retained total V8 heap still exceeds the 10% bar. Actor pools/template caches, same-camp geometries/textures, listeners and RAF are stable. Snapshot growth is dominated by V8 instruction/code metadata rather than additional actor rigs; this is finite retained growth evidence, not proof of an unbounded leak. Allocation reports separately attribute library leaf allocators and application ancestors. The latest four-window trace has zero `getParameters` bytes in every window, but this does not establish allocation-free execution. Raw failed evidence and unchanged thresholds remain available under the round 4 work directory.
