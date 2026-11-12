# Dust & Redemption / 荒塵之旅

A complete, local-first 3D frontier campaign in Traditional Chinese. Six sequential contracts combine cover combat, evidence, negotiation, physical machinery, delivery and escort work. Decisions change residents' trust and the ending. Completed contracts can be replayed without duplicating story rewards.

## Build and play

Requires Node 22+, Python 3 and a WebGL2-capable browser. All runtime dependencies and assets are local; no accounts, external CDN or service is used.

```sh
npm --prefix games/dust-redemption ci
npm --prefix games/dust-redemption run build
python3 -m http.server 8102 --bind 127.0.0.1 --directory public
```

Open `http://127.0.0.1:8102/games/dust-redemption/`.
The authored project is `games/dust-redemption/`, including HTML, CSS, every module, and the complete original asset snapshot. `build.mjs` copies it into `public/games/dust-redemption/` and bundles pinned Three.js 0.180.0 plus its local loaders. Edit source and rebuild. Existing asset attribution is retained in `assets/games/dust-redemption/` and runtime audio manifests; Three.js retains its MIT notice in `vendor/THREE-LICENSE.txt`.

## Controls and lifecycle

- WASD or arrows: move relative to screen; mouse: aim; left button: shoot; right button: aim/peek.
- E: inspect, negotiate, take cover, operate or extract. R: reload. Space: vault low cover. F: use the one carried supply.
- Q/C or HUD arrows: rotate the camera. Escape: close an interaction or pause; Escape again resumes. Tab/Shift+Tab navigate menus.
- Touch: landscape layout with separate movement and aiming pads, fire and action buttons. Each input is released on pause or blur.
- The north-facing map shows the player, unread evidence, unfinished work and evacuation. Menus include a short guide and optional detailed chapter reference.
- Settings persist music/SFX volume (zero mutes), aim assistance, slow aim, reduced motion and low graphics. OS reduced-motion preference is respected by default.
- Save points are departure and successful return. Reload restores an unfinished contract at its safe entrance, with story choices and permanent supplies intact; partial fieldwork restarts. A damaged save is preserved before a new save replaces it. Save failures have a visible retry action.
- Blur/hidden pages pause, including fieldwork and dialogue. Resuming requires player input. Context loss freezes the simulation; after restoration the existing mission resumes through the pause menu.
- Software renderers use diffuse lighting, cached contact shadows and no dynamic shadow maps. Overview buffers are capped at 1120 pixels (960 with low graphics); sustained slow frames automatically reduce overview width to 1024 without reducing label text size; mechanism inspection uses up to 1600 pixels in either setting. Hardware overview is capped at 1440 pixels with directional shadows. Unchanged modal scenes retain their last frame; simulation and audio scheduling remain independent.

## One-command acceptance

```sh
npm --prefix games/dust-redemption run acceptance
```

The suite builds, checks every authored module and original asset against the runtime, runs unit tests, starts its own HTTP server if necessary, and launches one headless Chrome using SwiftShader, with normal browser gesture/autoplay policy. It closes its browser and owned server in `finally` and on SIGTERM/SIGINT. Reports are persisted after every completed check and earned chapter with `running`, `passed`, `failed`, or `interrupted` status. An interrupted phase is never a passing campaign. Chrome is expected at `/usr/bin/google-chrome`; Playwright is imported from `/workspace/stteak8/tools/node_modules/playwright-core/index.mjs`.

Optional environment variables:

| Variable              | Default                           | Purpose                                                                                                                                               |
| --------------------- | --------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| `DUST_PORT`           | `8102`                            | Assigned HTTP port; this workspace uses 8102 (8112 only for a second server). An existing server is accepted only if its game.js equals this runtime. |
| `DUST_PHASE`          | `all`                             | `campaign`, `alternatives`, `variants`, `performance`, `lifecycle`, or `rebuilds` (heap snapshots) for diagnosis; omitted runs every check serially.                               |
| `DUST_CHECKPOINT_DIR` | evidence directory                | Named diagnostic phases read actually earned chapter JSONs here and label the access fixture.                                                         |
| `DUST_SKIP_BUILD`     | unset                             | Set to `1` for read-only testing of a prebuilt runtime; equality checks still run.                                                                    |
| `DUST_EVIDENCE_DIR`   | `/tmp/dust-redemption-acceptance` | JSON reports, raw measurements, earned profiles, CPU profiles and screenshots.                                                                        |

For example, independent QA can assign its own port without copying the suite:

```sh
DUST_PORT=8102 DUST_SKIP_BUILD=1 DUST_EVIDENCE_DIR=/tmp/dust-review \
  npm --prefix games/dust-redemption run acceptance
```

The primary campaign uses a new profile, actual keyboard/mouse/menu input, and read-only `window.dustDiagnostics()` observations. It earns all six physical receipts, extracts, reloads after every chapter, reaches the choice-derived ending, and completes a replay with different equipment while checking unchanged story and wallet. It does not teleport, forge completion saves, invoke internal completion functions or alter simulation speed. There are separate labelled funded-storage and migrated/corrupt-save fixtures; they are not earned-campaign evidence. Browser-captured event fixtures under `tests/dust-redemption/fixtures/` protect canonical successful streams, ordering and duplicate-ID rejection; event replay alone does not prove browser movement.

Regression coverage includes native Space/arrows/Escape, live briefing values, nested Help/Pause/Settings and focus, truthful atomic purchases under quota/security denial, double-click protection, suspended audio after settings, real gesture unlock of all 11 WAVs, externally suspended context recovery, a continuously processing mute analyser, WebGL restoration, and released touch capture. Mechanisms retain their canonical IDs internally and display Chinese/glyph descriptions to players.

Each chapter now has four required work items: the original three mechanisms and one ordered, physical onward assignment. These add R-01/R-02 relief deliveries and the same porter; three isolated pressure/sample stations conserving five water units; three distinct relay pin assignments and a signed return chain; three matching wage records and L-01/L-02 witness copies; two further rendezvous with the same three family members and a crossing inspection while they wait; and D-A-14/D-B-10 authorizations reconciled against the original 24-round cart. An accepted nonlethal passage remains in force during the onward assignment; extraction still requires every onward receipt. Every chapter's next target remains on the HUD/map. The second-phase event stream (proof schema 5, retaining completed schema-2/3/4 receipts) is validated at extraction and saved with the result. Legacy `fieldwork-authoring-1` completed stories keep their original rewards and receipts; new deployments use `fieldwork-onward-2`. Unfinished work restarts at the safe entrance, with no invented receipts.

The performance gate retains every interval after font/audio readiness, five seconds for initial assets, and ten native rendered rebuilds to warm scene-construction and receipt-validation compilation: two adjacent 180-second windows at 1280×720, then 180 seconds at 1920×1080. It also measures ten rendered rebuilds, a 180-second movement/restart window, two adjacent 60-second real-input carrying windows, two equivalent escort windows, and 45 seconds of continuously living final-scene combat using a rifle, medkit and real cover. Failed combat attempts are retained separately and restarted in full. Each carrying/escort window requires at least 120 updates and zero new return-record identities after warm-up. Raw allocation profiles, GC events, route recalculations and update histograms are retained. The initial ten rebuilds are retained separately in `warmup-resource-cycles.json`; no interval from a measured window is discarded. Cold heap snapshots distinguish compiled constructor/validator code from unchanged scene-object counts, and a thirty-rebuild diagnostic verifies the plateau. The observer control records GC→heap→diagnostics→heap→GC→heap; all endpoints use native Pause outside the fixed gameplay window to release transient audio handlers, then collect diagnostics before GC and heap sampling. The measured windows run fully resumed. Peak live voices remain separately bounded. Stable window/document/canvas listener registrations are counted separately from bounded transient audio voices and Chrome's raw aggregate.

Gates use draw calls ≤250, triangles ≤1.5M, texture memory ≤256 MiB, update-only p95 ≤6 ms, retained post-GC growth <10%, stable application listeners, one app RAF, and equivalent-state geometry/texture counts. SwiftShader frame intervals are reference data. Four camera views, static-panel caching, observable quality fallback and context restoration remain covered. Read-only diagnostics are copied only when requested; steady field results, escort workspaces, feed polling and HUD measurement records are reused.

Route waits use simulation budgets (distance / 2.4 m/s plus margin), with explicit death/member/modal checks. They poll at 500 ms rather than every RAF. A stationary route fails after ten simulated seconds without progress; a wall watchdog says `infrastructure-or-render-progress timeout`. It never changes game movement, collision, damage, deadlines or clock rate. Use `DUST_PHASE=campaign DUST_CAMPAIGN_RESUME=/path/to/an-earned-profile.json` only for a labelled earned-checkpoint continuation, never as an uninterrupted new-profile campaign.

For repeatable 15-second stationary/moving CDP CPU profiles in the first and final chapters, serve the runtime and run:

```sh
DUST_PROFILE_PHASE=after DUST_EVIDENCE_DIR=/tmp/dust-profile \
  node tests/dust-redemption/profile.mjs
```

This profiling tool uses explicitly labelled chapter-access fixtures. CPU profiles and raw intervals are written separately for both scenes and movement conditions. Close other game browsers first. The diagnostic campaign runner can resume from an **earned** JSON profile using `DUST_CAMPAIGN_RESUME`; that shortened development run is not continuous-campaign evidence.

## Difficulty and replay encounters

The briefing defaults to Standard. Its six contract budgets are 10, 11, 12, 13, 14 and 15 minutes of **processed simulation**; Hard allows 80%. Story has no deadline. The persistent objective shows remaining time, with a warning at one quarter and one minute. Time runs only during visible, foreground gameplay. Reading, operating a mechanism sheet, Help, Pause and context loss freeze it. Slow aim changes combat speed without stretching the clock. Renderer stalls do not spend unsimulated time. Results distinguish action time from the existing duration including reading/operation; diagnostics also expose actual foreground action wall time. Recovery/retry starts the clock at the safe entrance. Old active saves migrate to untimed Story with fixed seed 17.

First-story encounters use seed 17. Completed-contract briefings expose an unsigned 32-bit seed and “換一組挑戰”; the profile's mechanical difference is previewed before departure. Patient Watch keeps original cadence; Rapid Relief has 10% shorter recovery and 15% longer warnings; Scarce Ammunition has 70% reserves and 10% shorter recovery. No warning is shorter than the original. The final cart retains its canonical 24-round supply conservation. Retry/reload keeps the selected seed. Best action time, damage and accuracy are stored separately by content version, seed/profile, difficulty, aim assist and slow aim; preserved older short-contract records cannot become an unreachable best for the expanded campaign. The briefing shows these groups and their bests; replay never duplicates story rewards.

The acceptance command includes localized results at both desktop sizes, two chosen seeds with actual-input encounter samples/completions and saved comparable records, both south-relay front approaches, physical paper/lamp invalidation, and a unit scene proving unrelated cover still blocks the knife.

For longer, real-input challenge calibration (one earned six-chapter campaign, three competent samples per chapter, a seeded-random sample and a full unmodified Standard idle timeout), run:

```sh
DUST_PORT=8102 DUST_EVIDENCE_DIR=/tmp/dust-rubric-bots \
  node tests/dust-redemption/rubric-bots.mjs
```

The bot report separates simulation action time, action wall time and total wall time. Repeated chapter-access fixtures are explicitly labelled. An idle timeout uses the release 600-second simulation budget; it can take much longer on a shared software renderer. No completion state, positions, deadline or simulation speed are forged. `round3-check.mjs` is an optional targeted development check that consumes previously earned profiles in `DUST_EVIDENCE_DIR`; it does not replace the complete acceptance run.

Set `DUST_BOT_EARNED_DIR` to a successful acceptance evidence directory to reuse that real earned campaign as the first competent sample. The calibration still performs two additional physical replays per chapter, using the two other encounter profiles, before its random and idle runs.
