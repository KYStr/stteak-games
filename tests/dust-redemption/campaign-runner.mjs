import { chromium } from "/workspace/stteak8/tools/node_modules/playwright-core/index.mjs";
import { writeFile, mkdir, readFile } from "node:fs/promises";
import { campaignFunctions } from "./campaign.mjs";
import { url, action, mode, snapshot } from "./driver.mjs";
import { MISSIONS } from "../../games/dust-redemption/content.js";
const dir = process.env.DUST_EVIDENCE_DIR || "/tmp/dust-campaign";
await mkdir(dir, { recursive: true });
const b = await chromium.launch({
  executablePath: "/usr/bin/google-chrome",
  args: ["--use-angle=swiftshader", "--enable-unsafe-swiftshader"],
});
const p = await b.newPage({ viewport: { width: 1280, height: 720 } });
p.setDefaultTimeout(120000);
process.once("SIGINT", async () => {
  await b.close();
  process.exit(130);
});
p.on("pageerror", console.error);
p.on("console", (m) => {
  if (m.type() === "error") console.error(m.text());
});
try {
  await p.goto(url + "?touch=1");
  await mode(p, "title");
  if (process.env.DUST_CAMPAIGN_RESUME) {
    const profile = JSON.parse(
      await readFile(process.env.DUST_CAMPAIGN_RESUME, "utf8"),
    );
    await p.evaluate(
      (profile) =>
        localStorage.setItem(
          "stteak:dust-redemption:profile:v2",
          JSON.stringify(profile),
        ),
      profile,
    );
    await p.reload();
    await mode(p, "title");
  }
  await action(p, "hub");
  let d = await snapshot(p);
  for (let i = d.profile.completed.length; i < 6; i++) {
    const id = MISSIONS[i].id;
    await action(p, "brief", `[data-id="${id}"]`);
    if (id === "dawn-pact") await p.selectOption("#loadout-item", "smoke");
    await action(p, "deploy");
    await mode(p, "playing");
    console.log("START", id);
    await campaignFunctions[i](p);
    d = await snapshot(p);
    await p.screenshot({ path: `${dir}/${id}-result.png` });
    await writeFile(
      `${dir}/${id}-earned.json`,
      JSON.stringify(d.profile, null, 2),
    );
    console.log("COMPLETE", id, "history", d.profile.history.length);
    await action(p, "hub");
  }
} catch (e) {
  console.error(e);
  await p.screenshot({ path: `${dir}/campaign-failure.png` });
  await writeFile(
    `${dir}/campaign-failure.json`,
    JSON.stringify(await snapshot(p), null, 2),
  );
  await writeFile(
    `${dir}/campaign-failure.txt`,
    await p.locator("#overlay").innerText(),
  );
  process.exitCode = 1;
} finally {
  await b.close();
}
