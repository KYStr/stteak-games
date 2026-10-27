import { build } from "esbuild";
import { mkdir, copyFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";
const root = fileURLToPath(new URL("../", import.meta.url));
const out = path.resolve(root, "../../public/games/aetherwake");
await mkdir(out, { recursive: true });
await build({
  entryPoints: [path.join(root, "src/main.js")],
  outfile: path.join(out, "game.js"),
  bundle: true,
  minify: true,
  format: "esm",
  target: "es2022",
  legalComments: "eof",
});
for (const name of ["index.html", "style.css"])
  await copyFile(path.join(root, "src", name), path.join(out, name));
await copyFile(
  path.join(root, "node_modules/three/LICENSE"),
  path.join(out, "THREE-LICENSE.txt"),
);
console.log(
  "Aetherwake runtime built with all dependencies in public/games/aetherwake.",
);
