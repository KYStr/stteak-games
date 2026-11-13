import assert from "node:assert/strict";
import { cp, mkdtemp, readdir, readFile, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
const root = fileURLToPath(new URL("../../", import.meta.url));
const directory = await mkdtemp(join(tmpdir(), "dust-r5-build-"));
const project = join(directory, "games/dust-redemption");
await cp(join(root, "games/dust-redemption"), project, {
  recursive: true,
  filter: (path) =>
    !path.split("/").some((part) => part === "node_modules" || part === ".git"),
});
execFileSync(
  "npm",
  ["ci", "--prefix", project, "--ignore-scripts", "--no-audit", "--no-fund"],
  { stdio: "inherit" },
);
execFileSync("node", [join(project, "build.mjs")], { stdio: "inherit" });
async function files(path) {
  const result = [];
  for (const entry of await readdir(path, { withFileTypes: true })) {
    if (entry.name.startsWith(".git")) continue;
    const target = join(path, entry.name);
    if (entry.isDirectory()) result.push(...(await files(target)));
    else result.push(target);
  }
  return result;
}
const original = join(root, "public/games/dust-redemption"),
  rebuilt = join(directory, "public/games/dust-redemption");
const paths = (await files(original)).map((p) => relative(original, p)).sort();
assert.deepEqual(
  (await files(rebuilt)).map((p) => relative(rebuilt, p)).sort(),
  paths,
);
const rows = [];
for (const path of paths) {
  const a = await readFile(join(original, path)),
    b = await readFile(join(rebuilt, path));
  assert.deepEqual(a, b, `isolated runtime mismatch: ${path}`);
  rows.push({
    path,
    bytes: a.byteLength,
    sha256: createHash("sha256").update(a).digest("hex"),
  });
}
const report = {
  status: "passed",
  isolatedProject: project,
  comparedFiles: rows.length,
  files: rows,
};
if (process.argv[2])
  await writeFile(process.argv[2], JSON.stringify(report, null, 2));
console.log(
  `PASS isolated npm ci/build; ${rows.length} identical runtime modules, assets and vendor files`,
);
