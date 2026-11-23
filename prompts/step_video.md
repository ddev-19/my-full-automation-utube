You are animating today's episode for "पौराणिक कथाएँ". The voice is already recorded and aligned.

1. Read `CLAUDE.md` ("Video rules"), `work/script.md` (its [दृश्य / SCENE] lines are your storyboard), `work/timeline.txt` (exact line timings) and `work/meta.json`.
2. Study `video/examples/gita_jayanti_scenes.tsx` (story scenes) and `video/examples/channel_intro_scenes.tsx` (icons, minimal text), and the helpers exported by `video/src/mb3.ts` and `video/src/mb2.ts`.
3. Write `video/src/scenes.tsx` for this episode (same structure as the examples: `mk(...)` scene functions and a `LIST` of [start, end, Scene] covering 0 → TOTAL). Optionally write `work/sfx.json` and re-run `python3 pipeline/make_data.py`.
4. Update `video/src/episode.ts` from `work/meta.json`.
5. Verify, as CLAUDE.md says: `npx tsc --noEmit`, stills of every scene, look at the contact sheets, fix problems, re-check. Then render and look at the thumbnail.
6. Do NOT render the full video — the workflow does that after you finish.
