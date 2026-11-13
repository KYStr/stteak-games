import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { mkdir, readFile, writeFile, open } from "node:fs/promises";
import { port } from "./driver.mjs";
const dir = process.env.DUST_EVIDENCE_DIR || "/tmp/dust-interruption";
await mkdir(dir, { recursive: true });
const log = await open(`${dir}/process.log`, "w");
const child = spawn(
  process.execPath,
  ["tests/dust-redemption/acceptance.mjs"],
  {
    env: {
      ...process.env,
      DUST_PHASE: "campaign",
      DUST_SKIP_BUILD: "1",
      DUST_EVIDENCE_DIR: `${dir}/phase`,
    },
    stdio: ["ignore", log.fd, log.fd],
  },
);
const exited = new Promise((resolve) =>
  child.once("exit", (code, signal) => resolve({ code, signal })),
);
let ready = false;
try {
  const start = Date.now();
  while (Date.now() - start < 90000) {
    try {
      const report = JSON.parse(
        await readFile(`${dir}/phase/acceptance.json`, "utf8"),
      );
      if (report.current?.mission && report.status === "running") {
        ready = true;
        break;
      }
    } catch {}
    if (child.exitCode !== null)
      throw Error("diagnostic exited before interruption");
    await new Promise((r) => setTimeout(r, 500));
  }
  assert.ok(ready, "native gameplay reached before intentional SIGTERM");
  child.kill("SIGTERM");
  const exit = await exited;
  const report = JSON.parse(
    await readFile(`${dir}/phase/acceptance.json`, "utf8"),
  );
  assert.equal(report.status, "interrupted");
  assert.equal(report.signal, "SIGTERM");
  assert.equal(report.cleanup.browserClosed, true);
  assert.equal(report.cleanup.ownedServer, true);
  assert.equal(report.cleanup.serverExited, true);
  let listening = false;
  try {
    await fetch(`http://127.0.0.1:${port}/`, {
      signal: AbortSignal.timeout(1500),
    });
    listening = true;
  } catch {}
  assert.equal(listening, false, "owned server closed");
  await writeFile(
    `${dir}/cleanup-check.json`,
    JSON.stringify(
      {
        status: "passed",
        diagnosticStatus: "interrupted",
        exit,
        serverClosed: true,
        browserClosed: true,
      },
      null,
      2,
    ),
  );
  console.log(
    "PASS SIGTERM: interrupted report, awaited browser close, owned server exited",
  );
} finally {
  if (child.exitCode === null) {
    child.kill("SIGTERM");
    await exited;
  }
  await log.close();
}
