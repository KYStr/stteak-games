# Original Neon Drift vehicle and city kit

Generated 2026-10-25 by the Maker 3D asset assistant from original JavaScript geometry, using Three.js 0.170.0. No external imagery, commercial vehicle model, badge, logo or texture was used.

Design brief: rain-wet midnight harbor, cyan road edge lights, magenta neon accents, physical street furniture, restrained wet PBR material. COMET is a stable short sports coupe; STINGER is an upright compact hatch with a roof-level wing; PHANTOM is a long, low fastback with a broad rear wing. Vehicle body, glazing, trim, wheels, lamps and three geometric decal patterns are separate editable objects.

Rebuild with `node games/neon-drift/tools/generate-assets.mjs` from the repository. The source is `sources/models.js`; generated glTF files embed their buffers and contain named wheel mounting groups and quaternion animation clips. Runtime `renderer.js` initially reconstructs the same source and loads the exported glTF model before replacing the fallback. Per-car collider envelopes are exported separately; collision logic uses the track-space vehicle envelope rather than a triangle collider.

All measurements are metres, +Y up, +Z forward. Cars have an origin at the centre of their road contact patch, zero applied scale, wheel radius 0.35 m. No skin skeleton is needed for rigid vehicles. Wheel mounting groups are the reusable animation hierarchy; wheel-spin loops, steer-left does not. Runtime continuously evaluates wheel angle and steering rather than starting discrete steering clips.

Original project assets are distributed with this project. Three.js remains under its MIT license, recorded by the root build. This record does not claim public-domain status.

Environment exports are reusable district modules. Runtime derives instanced dimensions and palette variants from the same module contract to reduce draw calls. Ground, road, ramp supports, rail posts, lane paint, alternating kerbs, physical chevrons, finish checker geometry and puddles are rebuilt procedurally by renderer.js from the authored track data. No core scene geometry is replaced by a billboard.
