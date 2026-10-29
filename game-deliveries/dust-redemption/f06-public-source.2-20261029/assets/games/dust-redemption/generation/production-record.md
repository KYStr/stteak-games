# Frontier kit production record

Created 2026-10-25 by the Dust & Redemption asset maker. All geometry, palettes, animation curves and small base-color textures are original procedural work for this project. No external models, image generation, photographs, scanned textures, font files or commercial character references are included.

The editable source is `sources/palette.json` plus `recipes/build-frontier-kit.mjs`. Rebuild from the worktree root with `node assets/games/dust-redemption/recipes/build-frontier-kit.mjs` after installing the game-local locked dependencies. This generates GLB, colliders, rig metadata, PNG sources and manifest hashes. The Three.js 0.180.0 exporter is MIT licensed; the game package owns its lockfile and dependency license.

Style: ochre, smoked wood, worn turquoise, restrained cream, crisp volumetric silhouettes. Characters are rigid-weight skinned low-poly meshes with continuous skeleton-driven poses. Their cloth, skin/leather and metal each use one material and one skinned draw call. Every primitive has UVs and vertex color. The hero poncho, flanker scarf, guard badge, sniper hood, and heavy bandolier provide readable silhouette differences in addition to color. No flat sprites replace models.

Base-color textures are 128 × 128 original neutral tileable grain patterns in RGBA8/sRGB. Wood uses periodic grain, cloth uses a repeating weave, stone uses deterministic small-scale variation. They are embedded in the GLB and retained separately as editable recipe outputs. They contain no baked lighting or text. Texture hues remain in vertex colors, so reuse does not require repainting images.

Collider data is deliberately separate from render geometry. Character capsules are movement proxies; gameplay should use its agreed hit volumes and the opaque cover colliders. The canopy, mine entrance and water tower have compound colliders that leave traversable openings. Asset low/high cover types and vaultability are recorded in the data.

All template nodes face +Z, use meters and +Y up, and have a base-center origin. Weapon local +Z is the bore direction; their default origin is also at base center, so the game should apply a small grip offset when attaching to `weaponSocket`. Clone characters with `SkeletonUtils.clone`; create an `AnimationMixer` on the clone and select its name-prefixed clips. No root motion is used. `reload-visual` is a visual timing marker, not authorization to change ammunition. Game rules remain authoritative.

Nine character templates × nine clips are included. Model-only fallback / no animation is not required. Low quality should disable distant props, lower shadow budget/DPR, and instance repeated static templates without replacing 3D bodies with images. Runtime performance and real device suitability remain the game reviewer's measured responsibility; this record does not claim those tests passed.
