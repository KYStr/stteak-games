// Development-only targeted route and resource check using labelled earned snapshots.
import { chromium } from "/workspace/stteak8/tools/node_modules/playwright-core/index.mjs";
import { spawn } from "node:child_process";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { url, port, mode, action, snapshot } from "./driver.mjs";
import { completeLedger, completeNight, completePact } from "./campaign.mjs";
import { alternateRoutes } from "./alternatives.mjs";
import { regressions } from "./regressions.mjs";
const evidence = process.env.DUST_EVIDENCE_DIR || "/tmp/dust-r3-first";
await mkdir(evidence, { recursive: true });
let server, browser;
const errors = [];
try {
  try {
    await fetch(url);
  } catch {
    server = spawn(
      "python3",
      [
        "-m",
        "http.server",
        String(port),
        "--bind",
        "127.0.0.1",
        "--directory",
        "public",
      ],
      { stdio: "ignore" },
    );
    await new Promise((r) => setTimeout(r, 500));
  }
  browser = await chromium.launch({
    executablePath: "/usr/bin/google-chrome",
    args: ["--use-angle=swiftshader", "--enable-unsafe-swiftshader"],
  });
  const p = await browser.newPage({ viewport: { width: 1280, height: 720 } });
  p.setDefaultTimeout(60000);
  p.on("pageerror", (e) => {
    errors.push(e.message);
    console.error(e);
  });
  p.on("console", (m) => {
    if (m.type() === "error") {
      errors.push(m.text());
      console.error(m.text());
    }
  });
  if (!process.env.DUST_TARGET_CHAPTER) await regressions(p, console.log);
  await p.goto(url + "?touch=1");
  await mode(p, "title");
  const earned = JSON.parse(
    await readFile(`${evidence}/dawn-pact-earned.json`, "utf8"),
  );
  await p.evaluate(
    (d) =>
      localStorage.setItem(
        "stteak:dust-redemption:profile:v2",
        JSON.stringify(d),
      ),
    earned,
  );
  await p.reload();
  await mode(p, "title");
  await action(p, "hub");
  if (process.env.DUST_TARGET_CHAPTER) {
    const chapter = process.env.DUST_TARGET_CHAPTER,
      options = {
        "black-ledger": ["last-signal", completeLedger, "notice-copy"],
        "long-night": ["black-ledger", completeNight, "east-ridge"],
        "dawn-pact": ["long-night", completePact, "assault-siding"],
      };
    const [prior, fn, route] = options[chapter],
      fixture = JSON.parse(
        await readFile(`${evidence}/${prior}-earned.json`, "utf8"),
      );
    await p.evaluate(
      (d) =>
        localStorage.setItem(
          "stteak:dust-redemption:profile:v2",
          JSON.stringify(d),
        ),
      fixture,
    );
    await p.reload();
    await mode(p, "title");
    await action(p, "hub");
    await action(p, "brief", `[data-id="${chapter}"]`);
    if (chapter === "dawn-pact") await p.selectOption("#loadout-item", "smoke");
    await action(p, "deploy");
    await mode(p, "playing");
    await fn(p, route);
    console.log("TARGET CHAPTER PASS", chapter);
  } else await alternateRoutes(p, evidence, console.log);
  console.log("TARGETED DONE", JSON.stringify(errors));
} catch (e) {
  console.error(e);
  process.exitCode = 1;
  const p = browser?.contexts()[0]?.pages()[0];
  if (p) {
    await p.screenshot({ path: `${evidence}/targeted-failure.png` });
    await writeFile(
      `${evidence}/targeted-failure.json`,
      JSON.stringify(await snapshot(p), null, 2),
    );
  }
} finally {
  await browser?.close();
  if (server) {
    const exited = new Promise((r) => server.once("exit", r));
    server.kill();
    await exited;
  }
}
