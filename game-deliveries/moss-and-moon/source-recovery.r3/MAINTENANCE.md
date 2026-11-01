# Moss maintenance contract — recovery r3

This is a new maintenance delivery, not the missing original docs.1. Product runtime and historical recipes remain exact r2 bytes. The five test files are exact Git blobs from [canonical source](https://github.com/KYStr/stteak-games/tree/833c5214d33c0f89776c81d86df118d714760c6e/tests/games/moss-and-moon), not newly invented historical evidence. SOURCE-MAP records each digest. Changes must be made in a disposable copy, not this sealed package or an existing player's save.

## Working test entry

Prerequisites: Python 3 for package integrity and Node.js with built-in node:test/mock APIs; author checked Node v24.22.1. No npm install, Playwright, Three or browser is needed for these tests.

From package root:

```sh
python3 verify_delivery.py
(cd games/moss-and-moon && npm test)
```

The historical package command resolves ../../tests/games/moss-and-moon/*.test.js. Restored files cover rules/content transitions, synthetic bridge messages and session rejection, in-memory save corruption/transaction failures, and mocked WebAudio lifecycle. The author executed this restored entry once: 70 passed, 0 failed. That proves the repaired entry is usable against this runtime, not actual browser inputs, visible rendering, audible mixing, native lifecycle or a quality score. Tests use synthetic state and never read real saves. Do not substitute them for native acceptance.

## Minimal content extension: one recipe using existing assets

Stable IDs are cross-references. The narrow example adds one recipe and reuses the existing `stones` item/model, avoiding a new renderer branch or new asset. In a disposable copy, edit only public/games/moss-and-moon/content.js, in RECIPES:

```js
{ id: 'make-stones-example', name: '溪石小徑（練習）', cost: { stone: 2 }, result: { stones: 1 } },
```

Contract: unique recipe ID; nonempty display name; cost and result keys must be existing item IDs (PLANTS/DECORATIONS/RESOURCE_NAMES, or existing `seed:` plant IDs); amounts are positive safe integers. This example changes balance only in the disposable extension. Do not rename an existing stable ID: inventory, quests, recipes and serialized saves refer to it. New plant/decor IDs are outside this minimal example because they also require model/export/save compatibility work. Do not change schema or migrate/delete real saves.

rules.js resolves RECIPES on craft; main.js builds the craft panel from RECIPES and item names. A new recipe is therefore data-driven, but UI accessibility/layout and actual browser behavior still require separate native validation. No new assets are claimed by this recipe. The baseline content-count test expects eight recipes: an intentional extension must explicitly update that expected count in its own new candidate, with documented rationale, not weaken unrelated checks or edit this baseline's original tests.

## Verification and restoration

Before editing record content.js SHA-256 and keep an exact untouched copy. In the disposable extension, use the supplied `tests/maintenance/recipe-extension.mjs` to validate a single extra recipe: it imports real copied content/rules, checks unique IDs and references, verifies insufficient materials fail without changing input, exact materials craft one existing item and consume once, and rejects a second craft after exhaustion. It creates only a new temporary directory and leaves it for inspection, never edits the sealed candidate or real save data.

```sh
node tests/maintenance/recipe-extension.mjs
```

This is an executable example and author regression aid, not a substitute for an independent assessor making their own edit. For an assessor's manual addition use the same contract and assertions against that copy; retain baseline source and changed-file diff. Restore by replacing only the changed content.js with the untouched original; verify its SHA-256 equals the initial digest and all baseline package files again match PACKAGE-MANIFEST. Do not force/reset a repository, delete user data or overwrite another worker. Any intentional permanent extension is a distinct candidate with new hashes, not this runtime.

## Asset source and rights contract

ASSET-PROVENANCE.json and runtime assets/data/{asset-manifest,audio-manifest}.json fix IDs, paths, hashes and original project-authored rights declarations. SOURCE-MAP ties model-kit.mjs/audio-kit.mjs and recipes to fixed Git sources. Keep LICENSE and vendor/THREE-LICENSE.txt; rights declarations are not a new legal certification. The example reuses existing stones and introduces no media. Adding media requires source/license/hash/manifest/export agreement and separate scope, not an arbitrary URL.

SOURCE-REBUILD.md pins the already observed nine-maintained-plus-92-generated reconstruction. Do not rerun generators over this sealed candidate. Dependency installation, new origin, native sessions and publication remain separately bounded. Full historical docs.1, original production-only lock and source-side historical WAV copies are still not represented as recovered. Recovered tests and this guide do not close missing native or quality evidence.
