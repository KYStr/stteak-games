import { mkdir, copyFile, readFile, writeFile } from "node:fs/promises";
const root = new URL("../../", import.meta.url);
const out = new URL("public/games/dust-redemption/vendor/", root);
await mkdir(out, { recursive: true });
for (const file of ["three.module.js", "three.core.js"])
  await copyFile(
    new URL(`node_modules/three/build/${file}`, import.meta.url),
    new URL(file, out),
  );
await copyFile(
  new URL("node_modules/three/LICENSE", import.meta.url),
  new URL("THREE-LICENSE.txt", out),
);
for (const [source, target] of [
  ["loaders/GLTFLoader.js", "GLTFLoader.js"],
  ["utils/BufferGeometryUtils.js", "BufferGeometryUtils.js"],
  ["utils/SkeletonUtils.js", "SkeletonUtils.js"],
]) {
  const { readFile, writeFile } = await import("node:fs/promises");
  let code = await readFile(
    new URL(`node_modules/three/examples/jsm/${source}`, import.meta.url),
    "utf8",
  );
  code = code
    .replaceAll("from 'three'", "from './three.module.js'")
    .replaceAll(
      "'../utils/BufferGeometryUtils.js'",
      "'./BufferGeometryUtils.js'",
    );
  await writeFile(new URL(target, out), code);
}
console.log("Bundled pinned Three.js 0.180.0 runtime and loaders.");
for (const file of [
  "expansion-content.js",
  "field-props.js",
  "field-system.js",
  "render-batches.js",
  "mission-flow.js",
  "mission-flow-v1.js",
  "mission-props.js",
  "departure-guidance.js",
  "mission-system.js",
  "water-flow.js",
  "water-props.js",
  "water-system.js",
  "signal-flow.js",
  "signal-props.js",
  "signal-system.js",
  "ledger-flow.js",
  "ledger-props.js",
  "ledger-system.js",
  "night-flow.js",
  "night-props.js",
  "night-system.js",
  "pact-flow.js",
  "pact-props.js",
  "pact-system.js",
  "cargo-tether.js",
  "enemy-tactics.js",
  "game.js",
]) {
  const source = await readFile(new URL(file, import.meta.url), "utf8");
  await writeFile(
    new URL(`public/games/dust-redemption/${file}`, root),
    source.replace(/\r\n?/g, "\n"),
  );
}
console.log(
  "Copied authored fieldwork sources into the fingerprinted runtime.",
);
