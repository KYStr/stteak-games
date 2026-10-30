# Public source docfix subset

Candidate: `aetherwake-public-source-docfix.1-20261029`. Based on the 132-file public subset `aetherwake-route-save-20261028-01-delivery-docs.1` at commit `086b53ddb01fc130e2a8108fa1aa512a4480f7eb`. New destination: `game-deliveries/aetherwake/route-save-delivery-docfix1`; the old namespace is retained.

AW-PUBLIC-DOC-001 corrects the false implication that the historical assets/games/aetherwake/recipes/verify-assets.mjs is included. It and the historical environment logs remain excluded. Use the included scripts/aether-delivery/verify-assets.mjs; historical environment checks remain NOT_RUN.

Runtime 60 files, gameplay, assets, locks, licenses and helpers retain exact bytes. DELIVERY identity, README, this scope and the maintenance document differ. PUBLICATION-MANIFEST.json describes every other file and excludes only itself to avoid self-hash recursion; it is not a quality score. ORIGINAL-SOURCE-MANIFEST.json remains historical provenance, not this subset inventory.

Original third-party and asset license boundaries remain; no new media license is granted. This is not the full private archive and transfers no private review or quality acceptance. No product tests/build/browser/native listening or publication were performed during this packaging. Internal receipts are excluded. Scores and candidate URL remain null pending appropriate independent evidence.
