# Signal Zero — source-recovery.1

Candidate: `signal-zero-cloud-campaign-20261028-02+source-recovery.1`.
This is a new, partial source-recovery delivery, not the missing `delivery-docs.1` archive. Original product authorship and ownership are unchanged. The recovery assembler claims only the new provenance and guide. No prior quality score, native acceptance, completion, or original archive identity transfers to this candidate.

## Layout and exact starting point

- `public/games/signal-zero/`: 32 byte-preserved published runtime members plus `.gitattributes`. Their source is the fixed served32 capsule; see SOURCE-MAP.json.
- `games/signal-zero/src/`: 13 editable modules copied byte-for-byte from that runtime. Ten match the historical canonical source; app.js, build.js and save.js intentionally use the later served runtime instead. Do not overwrite them with older canonical versions.
- `games/signal-zero/{package.json,package-lock.json,build.mjs}`: preserved canonical build inputs. Dependencies are pinned to Three 0.180.0 and Playwright 1.56.1. Installed dependencies and browser binaries are not included.
- `assets/games/signal-zero/`: retained historical recipes, source records and manifest, NOT newly generated validation. Their provenance and limitations are explicit in ASSET-PROVENANCE.md.

## Opening and future build procedure

Keep this entire directory layout. Serve its `public/` directory with a trusted static HTTP server in an authorized cloud environment; the entry is `/games/signal-zero/`. Direct file:// opening is not an accepted test. No launcher, deployment, hosting or native run is performed by this delivery.

Before any build, copy the candidate to a new disposable working directory and verify every MANIFEST.json entry. Never build over the sealed candidate. In that copy, an authorized operator can run `npm ci` from `games/signal-zero`, then `npm run build`. Installation requires registry access and is NOT performed or certified here. The preserved build uses paths relative to build.mjs and writes `public/games/signal-zero/`; it normalizes src CRLF to LF and copies Three vendor files. It does not generate or copy the GLB/collider assets. Keep the supplied assets intact unless deliberately producing a separately identified candidate. Exact full rebuild equivalence remains NOT_RUN; stop on any unexpected byte difference.

The package's `npm test` refers to repository tests not included in this partial candidate. Do not advertise that command as a working standalone acceptance suite. Canonical test references are listed separately for later authorized retrieval.

## Editing and extension

Use src/core.js for simulation rules, levels.js for authored level data, input.js for input ownership, app.js for integration, save.js for persistence, view.js/static-stage.js/models.js for presentation, and audio.js for synthesis. Read existing imports and ownership contracts before changes. A source edit creates a new candidate, not a repair to this immutable delivery. Changed persistence requires compatibility review; changed visual/audio assets need independent native GUI/listening evidence. None of these product changes is authorized by source recovery itself.

## Rollback and acceptance

Restore the verified candidate bytes into a separate workspace rather than deleting user data or changing saved-game state. Do not run asset export recipes as a rollback: they write runtime, sources, manifests and generated validation. Preserve LICENSE, LICENSE-SCOPE and vendor notices. MANIFEST.json covers all other candidate files, excluding itself to avoid a circular hash. Verify path set as well as hashes, reject links or extra files, and obtain a different maker's source/package review before publication. Product quality remains unscored. See LIMITATIONS.md for missing evidence and next gates.
