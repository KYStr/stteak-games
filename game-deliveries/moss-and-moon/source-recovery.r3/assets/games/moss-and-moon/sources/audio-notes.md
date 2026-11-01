# Moss & Moon original audio project

Version 1.0.0 · created 2026-10-25 by the Moss & Moon Maker asset assistant.

`audio-kit.mjs` is the editable audio project: original deterministic synthesis, score, envelopes, filters, crossfades, mixer balance and PCM encoder. No external recording, sample, melody, instrument library, AI audio service or copyrighted song reference was used. This is original project-authored work; no public-domain claim is made.

## Files and budget

| Runtime filename | Length | Mono PCM rate | Bytes including WAV header |
| --- | ---: | ---: | ---: |
| `music-loop.wav` | 16 s | 22,050 Hz / 16 bit | 705,644 |
| `ambient-leaves.wav` | 4 s | 16,000 Hz / 16 bit | 128,044 |
| `sfx-plant.wav` | 0.28 s | 16,000 Hz / 16 bit | 9,004 |
| `sfx-water.wav` | 0.65 s | 16,000 Hz / 16 bit | 20,844 |
| `sfx-harvest.wav` | 0.45 s | 16,000 Hz / 16 bit | 14,444 |
| `sfx-ui.wav` | 0.10 s | 16,000 Hz / 16 bit | 3,244 |
| `sfx-success.wav` | 1.20 s | 16,000 Hz / 16 bit | 38,444 |
| **Total** | | | **919,668** |

These sizes follow the exact sample counts and standard 44-byte PCM WAV header; the exporter verifies actual values before writing. WAV is the original lossless render. The retained `.mjs` project regenerates it directly, so there is no absent DAW session or undisclosed source recording. The original lossless WAV renders are retained under `assets/games/moss-and-moon/sources/audio/`; byte-identical runtime copies are under `public/games/moss-and-moon/assets/audio/` after an authorized export.

## Synthesis and loops

The default seed is `0x4d4f5353` (MOSS); each asset derives a fixed unsigned seed with xorshift32. Music is a sparse original four-bar melody using C D E G A, backed by quiet suspended chords and two restrained delay taps. Plucks use sine partials with smooth attacks and releases. Pads and tails are accumulated around a 16-second ring, so the final bar's decays continue through the loop boundary.

Leaf/wind ambience uses filtered seeded noise and slow gust envelopes. A continuous extra tail is rendered for the overlap. A raised-cosine overlap joins that tail to the opening without shortening the intended loop. Weights sum to one, avoiding an equal-power gain bump for correlated signals. Crossfades are 120 ms for music and 150 ms for ambience. Both have loop start 0; loop ends are exactly 16 and 4 seconds. Event sounds have smooth start and end fades. All output is DC-corrected and normalized below clipping; the manifest records actual peak, RMS and boundary-step values, rather than asserting subjective quality from those measurements.

## API and integration

`getAudioPlan()` returns filenames and exact planned sizes without rendering or writing files. `renderAudioAssets({ seed })` returns seven descriptors with `samples: Float32Array`, sample rate, channel count, bit depth, loop endpoints, per-asset seed, cooldown, voice limits, recommended gain and measured PCM statistics. `encodeWav(samples, sampleRate)` returns a `Uint8Array` containing an original lossless WAV. No function in the source module changes the filesystem.

`node games/moss-and-moon/export-audio.mjs` renders and writes the seven original WAVs and their runtime copies, `assets/games/moss-and-moon/audio-manifest.json`, and an identical runtime manifest at `public/games/moss-and-moon/assets/data/audio-manifest.json`. The exporter refuses runtime totals above 1,000,000 bytes and records real source/runtime SHA-256 hashes. Run only while the Maker has authorized runtime changes, outside an active review freeze.

Decode each WAV once and reuse AudioBuffers. Music and environment should use separate gain buses and independent settings. Start loops once following a user gesture; pause/suspend both buses when the iframe is paused or hidden. Avoid restarting music on each action. Use 20–40 ms gain ramps on pause/resume and volume changes, and do not start another copy of a currently playing loop.

Suggested limits are one music voice, one ambient voice, and at most eight concurrent event voices. Per-event maxima/cooldowns are metadata the runtime must enforce: plant 3 / 80 ms; water 4 / 120 ms; harvest 3 / 90 ms; UI 2 / 45 ms; success 1 / 1,000 ms. Repeated water effects should replace or quietly fade an older water voice when the cap is reached. Music, environment and event gain values in the manifest are initial mix suggestions, not measured loudness across devices.

## Validation boundary

Generator checks can establish determinism, exact duration, finite PCM, byte counts, peaks below clipping, smooth transient endpoints and plausible loop boundary steps. Browser scheduling, device volume, perceived texture, fatigue, speakers/headphones, real-device output and subjective listening remain independent runtime/listening checks. No actual-listening approval or Reviewer score is claimed by this source project.
