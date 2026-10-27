# Editable 3D sources

`kit.mjs` is the canonical editable asset project. It exports a factory taking a Three.js namespace and returning `makeActor(id, {skin})`, `makeProp(id, low)` and `dispose()`. This keeps engine imports within the game's fingerprinted runtime.

Rebuild from the repository root:

```powershell
node assets/games/hollow-crown/recipes/export-assets.mjs
```

The locked dependency must already exist at `games/hollow-crown/node_modules/three`. The script produces reusable binary glTF files, separate collision metadata, the exact runtime kit copy and a hash/size manifest. Changing the source requires rerunning the recipe before computing the runtime build hash.

`scene.js` owns camera, lighting, batching, fades and warning visuals. Rules supply room obstacle coordinates and read-only character states. Geometry and materials do not change gameplay. All GLB files are reusable exports of the same procedural assets used at runtime, rather than separate preview-only models.

Rigid Bone contract: no root motion; +Y up, +Z forward; one metre units; local origin at the character's feet. A weapon attaches to `weapon-mount`. Optional `textureBaseUrl` loads the three local procedural stone maps; GLB exports embed the same maps. To add a character, provide its stable ID, collider and parametric appearance; retain the shared bone names to reuse the eleven clips. To add a room, provide rule data with an ID, theme and obstacle list; the renderer creates the corresponding modular structures. Supported themes are ash, ivory, tutorial, ember, blue and crown. Texture pixels are fully editable through `recipes/stone-surfaces.mjs` and rebuilt by the same export command.
