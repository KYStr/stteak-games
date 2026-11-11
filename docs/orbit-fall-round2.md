# Orbit / Fall round 2 evidence notes

Round 1 evidence remains in `/workspace/stteak8/work/orbit-fall/rounds/r1/`.
Every new acceptance invocation creates a fresh timestamped directory under
`tests/orbit-fall/evidence/`. Development runs using `ORBIT_SOAK_SECONDS=5` are
explicitly marked short runs; they cannot establish the 180-second budget.

The fresh campaign uses real keyboard flight and held controls for all six
repairs, all six recordings, both endings and all three challenges. The separately
labelled regression context uses schema-valid fixtures to reach imminent failure,
all room designs, quota errors and old schema migration. Expected aborted audio
requests are recorded in that context and excluded from the clean campaign claim.

The performance report preserves raw active frame intervals, wall, active browser,
simulation and render counts, visibility/modal observations, CPU throttle rate,
update time, renderer buffer/calls, and GC-backed memory/DOM/RAF snapshots. A
foreground gap over a second produces an explicit recovery panel. The controller
can use its visible Resume button, recording the interruption. Such a run is never
called an uninterrupted performance pass; a full measurement is retried once.

The gallery is fixture-assisted visual inspection, not evidence that a human
completed the puzzles unaided. The builder already knows the authored solutions;
a first-time human play session and a >=10-minute enjoyment claim have not been
established by automated navigation. Hints-off discovery, optional full steps and
persisted tutorials improve the experience without adding artificial waits. The
six repairs, six recordings, two endings and three challenges remain intact.

Controller deadlines use `performance.now()` and retain wall-clock deltas
separately. One retained invocation saw 888,620 ms on the system wall clock while
only 18 frames / 1.27 simulation seconds advanced. An external SIGTERM also ended
a later attempt; neither is represented as a completed campaign. The existing
120-second flight and 12-second docking limits were preserved. Functional flight
uses the documented low-quality option; the gallery and soak use normal quality.

Final verification: 71/71 unit/integration tests passed, including byte equality.
The fresh real-input run completed 6 repairs, 6 recordings, both endings and all
3 challenges, plus the lifecycle tail, with zero unexpected errors or requests.
It exited 1 on the performance listener assertion (a decrease of one). Finished
audio callbacks are now explicitly released; the final two 180-second targeted
soaks both held listeners 84→84 and RAF 1→1, with 43 draw calls at 960×540,
per-frame JS update p95 0.4–0.5 ms and at most 0.56 MB retained heap growth.
Both were interrupted (maximum intervals 8.8 s and 14.6 s), and all-frame averages
were 92.2 / 85.8 ms, p95 183.3 / 183.4 ms. These miss the requested reference
budget; no uninterrupted performance or full-suite PASS is claimed. The independent
round-one lifecycle reproduction passed after changing only its port to 8106.
Final evidence is copied to `/workspace/stteak8/work/orbit-fall/rounds/r2/qa-evidence/`.
All launched browsers closed; port 8106 was verified closed. No commit or push.
