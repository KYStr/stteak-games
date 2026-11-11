import { spawnSync } from "node:child_process";
import { readdirSync } from "node:fs";
const root = new URL("../../", import.meta.url);
const units = readdirSync(new URL("../games/moss-and-moon/", import.meta.url))
  .filter((f) => f.endsWith(".test.js"))
  .map((f) => new URL("../games/moss-and-moon/" + f, import.meta.url).pathname);
const unit = spawnSync(process.execPath, ["--test", ...units, new URL("./server.test.mjs", import.meta.url).pathname], {
  cwd: root,
  stdio: "inherit",
});
if (unit.status !== 0) process.exit(unit.status || 1);
await import("./acceptance.mjs");

if (!process.exitCode) await import("./regressions.mjs");
if (!process.exitCode) await import("./campaign-bots.mjs");
