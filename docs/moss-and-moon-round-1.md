# Moss & Moon — round 1 evidence

The editable runtime source is `public/games/moss-and-moon/`; the build vendors pinned Three.js modules. No independent QA score is claimed.

- `npm --prefix games/moss-and-moon run build`: passed; vendor hashes match `three@0.180.0`.
- `npm --prefix games/moss-and-moon test`: passed 71 unit tests and the browser campaign acceptance suite.
- `MOSS_ARTIFACTS=/workspace/stteak8/work/moss-and-moon/rounds/r1 npm --prefix games/moss-and-moon run test:soak`: passed a 180.385-second run after warmup, importing the garden earned by the campaign test.
- Chrome used the specified SwiftShader flags, with one browser at a time. Browsers and owned HTTP servers were closed.

The acceptance suite uses visible controls for planting, care, sleeping, harvesting, eight quest deliveries, twelve discoveries, three puzzles, shopping, crafting, placement and festival completion. It also exercises both slots, export/import, reset, exact reload, blur and input release, audio unlock/external suspend/resume/volume, actual WebGL context loss and startup save corruption. No inventory or winning-state injection is used.

| Final stability observation | Result |
| --- | --- |
| Recent average / p95 frame interval | 64.22 / 116.70 ms |
| Draw calls / triangles | 37 / 22,028 |
| Post-GC JS heap | 6,795,644 → 7,052,100 bytes |
| JS listeners / DOM nodes | 67 / 429, unchanged |
| Pending RAF / geometries / textures | 1 / 31 / 8, unchanged |
| Music and ambient sources | 2, unchanged |
| Console errors / failed requests | 0 / 0 |

Software rendering remains the main limitation: frame time is above a polished shipping target, and adaptive resolution can soften the 3D view. The HTML UI remains at native resolution. Keyboard/text plot access is provided, but full spatial screen-reader navigation is not implemented. Audio playback/lifecycle was measured; subjective listening was not assessed in this CLI-only run.

Fresh evidence lives in `/workspace/stteak8/work/moss-and-moon/rounds/r1`: `tests.log`, `acceptance.json`, `stability.log`, `stability.json`, `welcome-1280.png`, `garden-1280.png`, `garden-1920.png`, `festival-1280.png`, and `stability-final.png`. Earlier unsuccessful test attempts are retained in `attempts/`.
