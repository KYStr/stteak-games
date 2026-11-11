import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { createHash } from "node:crypto";
test("music project and manifests reproduce the runtime composition and unchanged WAV hashes", async () => {
  const src = await readFile(
    new URL("../../games/dust-redemption/audio.js", import.meta.url),
    "utf8",
  );
  const notes = JSON.parse(src.match(/const NOTES = (\[[\s\S]*?\]);/)[1]);
  const docs = [
    "../../games/dust-redemption/assets/audio/manifest.json",
    "../../assets/games/dust-redemption/audio/manifest.json",
    "../../assets/games/dust-redemption/audio/sound-project.json",
  ].map((p) => new URL(p, import.meta.url));
  let motif;
  for (const file of docs) {
    const d = JSON.parse(await readFile(file, "utf8"));
    assert.deepEqual(d.music.notesHz, notes);
    assert.equal(notes.length, 16);
    assert.equal(
      d.music.beatSeconds,
      Number(src.match(/this.nextBeat = time \+ ([\d.]+);/)[1]),
    );
    assert.equal(d.music.noteNames.length, notes.length);
    assert.equal(
      d.music.noteNames.filter((n) => n === "rest").length,
      notes.filter((n) => !n).length,
    );
    for (const voice of d.music.voices)
      assert.ok(
        src.includes(
          `this.tone(f * ${voice.multiplier}, ${voice.durationSeconds}, ${voice.volume}, "${voice.wave}", ${voice.pitchSlide}, "music")`,
        ),
      );
    for (const layer of d.music.layers) {
      assert.ok(src.includes(`beat % ${layer.everyBeats} === 0`));
      assert.ok(
        src.includes(
          `this.tone(beat % 16 < 8 ? ${layer.frequenciesHz[0]} : ${layer.frequenciesHz[1]}, ${layer.durationSeconds}, ${layer.volume}, "${layer.wave}", ${layer.pitchSlide}, "music")`,
        ),
      );
    }
    if (motif) assert.deepEqual(d.music, motif);
    motif = d.music;
    for (const effect of d.effects)
      if (effect.sha256) {
        const wav = await readFile(
          new URL(
            `../../games/dust-redemption/assets/audio/${effect.file}`,
            import.meta.url,
          ),
        );
        assert.equal(
          createHash("sha256").update(wav).digest("hex"),
          effect.sha256,
        );
      }
  }
});
