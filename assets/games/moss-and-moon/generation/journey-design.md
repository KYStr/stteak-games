# Original Festival Journey additions, round 3

The beacons, shade, encounter rules, task layouts and UI text were authored for Moss & Moon in this round. No external art, recordings, textures or fonts were added. Existing notices and original asset provenance are unchanged.

Authoritative editable source: `public/games/moss-and-moon/world.js` (four pooled torus/octahedron beacons, seven pooled five-sided cone shades, confirmed-action flashes), `campaign-content.js` (four-stage content, walkable candidate sockets) and `campaign.js` (xorshift32 layouts, tasks, hazards and score). These primitives are generated at runtime from Three.js geometry constructors and share materials/geometry; no missing binary model source is required. Existing original PCM effects provide confirmation sounds.

Design: four 160-second active chapters, one new mechanic per chapter, live 20-second task patterns, bounded deterministic encounters. Untimed legacy gardens remain Free Garden. Candidate sockets occupy the southern walking lane, away from cottage, residents and editable garden cells. Pools, seeds, active-time and score records are bounded and serializable. Standard and Gentle are explicit options.
