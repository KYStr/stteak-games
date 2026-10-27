# Moss & Moon original model kit

Created 2026-10-25 by the Moss & Moon Maker asset assistant. No external reference images, fonts, model libraries, game characters, or generated image assets were used.

The design follows the production brief: tangible miniature garden pieces in moss green, cream and moon blue. Rounded faceted forms, restrained warm wood accents, simple cloth aprons and full three-dimensional foliage make the four camera directions consistent. Every main visual is closed geometry with normals and UVs, shaded with MeshStandardMaterial. The source is deterministic JavaScript; no random seed or proprietary editor is required.

Eight plant silhouettes are distinct: cushioned moss with spore stalks, cream radial moonflowers, segmented fern fronds, hanging bluebells, lobed gold pumpkins, blue mushroom caps, tall lavender clusters, and pink layered lotus petals. Stage 0 is planted seed with tiny leaves; stages 1–3 add actual geometry and height or volume, rather than changing a flat image.

Version 1.1.0 adds twelve original natural-discovery specimens based on the game's own content descriptions. Forest: dew-covered moss, striped snail, twin-wing seed and fern impression. Brook: spiral shell, long-legged water strider, rounded stream stone and feathery reeds. Ridge: layered mica, crescent-marked moth, hexagonal quartz cluster and gold-edged lichen. Organisms have full bodies and volume; shell grooves, wing markings, leaf veins and crystal facets use geometry. Nothing is a billboard or a reused generic plant masquerading as an animal. The ID `waterbeetle` intentionally resolves to a water strider, matching the Chinese content definition 銀足水黽.

The gardener and six residents share an eight-bone skeleton with rigid skin weights. Each weighted vertex is attached to its named bone. Idle, walk, plant, water, harvest and celebrate motions are keyframed; residents include idle and interact clips. The main character also includes interact for dialogue. All clips are in place: game movement and economic events are controlled by rules, never by animation completion.

Palette is recorded in the manifest. Source code is the editable modelling and animation project. Export recipe produces GLB, the equivalent runtime factory, separated collider data, a model index and hashes. Repeated assets share geometry/materials; optional plant InstancedMesh batching is part of the API. GLB files are retained as portable equivalents and do not increase the initial download because the actual game creates geometry from the runtime factory.

Rights: original project-authored procedural model work. Three.js is used under its MIT license and must retain its separate runtime license notice. No claim of public-domain status is made.
