# Pauranik Kathaye (पौराणिक कथाएँ) — daily video pipeline

YouTube channel: https://www.youtube.com/@PauranikKathayeBharat
One video per run: the next `pending` festival in `festivals.csv` → Hindi script → Gemini voice → Madhubani animated 16:9 video → thumbnail → private upload. A human (Dev) reviews every video in YouTube Studio before it goes public.

## Repo map
- `festivals.csv` — the series order. `status`: pending / rendered / uploaded / done.
- `prompts/script_writer.md` — the script template and rules. `prompts/example_script_gita_jayanti.md` — a finished example.
- `pipeline/` — Python steps (next_festival, tts, align, make_data, upload, mark_done).
- `video/` — Remotion project. `src/mb.ts` (Madhubani figure + bow), `src/mb2.ts` and `src/mb3.ts` (cast, props, landscape backgrounds), `src/scenes.tsx` (rewritten every episode), `src/episode.ts` (thumbnail text + cast), `src/thumb.tsx` (thumbnail).
- `video/examples/*.tsx` — finished scene files to copy patterns from (Gita Jayanti = full story, channel intro = icons, no text).
- `episodes/<slug>/` — saved script, metadata, scenes and captions for each finished episode.
- `work/` — scratch for the current run (not committed).

## Script rules (step "script")
Follow `prompts/script_writer.md` exactly. Also:
- Spoken Hindi (Hindustani), Devanagari, short sentences, numbers as words, `॥` for long pauses (the voice file uses "…").
- 950–1,150 spoken words (≈ 6–7 minutes).
- Mark folk tales as "लोक कथा" and beliefs as "माना जाता है". Where versions differ, present both neutrally.
- Check dates and current events (festival date this year, big celebrations) with a web search; never invent dates or statistics.
- End with a teaser for the next festival from `work/festival.json` → `next`, then one comment question, then a greeting that suits the deity (जय श्री कृष्ण / जय सिया राम / हर हर महादेव / जय माता दी …).
- Outputs: `work/script.md` (full doc incl. fact-check table), `work/voiceover.txt` (only spoken text: one paragraph per section separated by a blank line, `॥` replaced by `…`, no scene lines, no headings), `work/meta.json` = {"title", "description", "tags", "thumb_title", "thumb_hook", "thumb_cast", "thumb_bg"}.
- Title ≤ 90 characters, curiosity-led, Hindi. Description: 2 strong lines, a short summary, "#पौराणिककथाएँ #<festival>" and a line "अगली कहानी: <next festival>". Tags: 12–20, Hindi + English.

## Video rules (step "video")
- Read `work/timeline.txt` (numbered lines with start/end seconds). Scenes must cover 0 → TOTAL with no gaps; cut on line boundaries; 25–45 scenes for 6 minutes, each 4–14 s.
- Landscape design space 960×540 (`W, H, FL=420` from `mb3`). Characters stand on `FL`. Keep important things above y≈455.
- **No subtitles, no captions, no sentence text on screen.** At most one short label per scene (a name like "भीष्म पितामह" or a 1–3 word chip), and only when it helps. Tell the story with characters, actions, props and symbols.
- Use the shared Madhubani cast (RAM, SITA, KRISH, ARJ, JANAK, VISH, MUNI, KING2/KING3, QUEEN, WOMAN, MAN, …). New characters = existing figure options (`crown`, `bun`, `beard`, `female`, colours, `feather`, `handItem`). Keep a character's look identical across the episode.
- Deities are drawn respectfully, Madhubani style, never comic or violent beyond the story. No real people, no copied artwork, no brand logos.
- Each scene animates something (walking, gestures, glow, pop-in props, camera push). Time key actions to the line where the narration says them.
- Optional sound effects: write `work/sfx.json` = [["pop"|"whoosh"|"stamp"|"tick", seconds, volume 0.2–0.6], …], then run `python3 pipeline/make_data.py` again.
- Update `video/src/episode.ts` from meta.json (title, hook, up to 3 cast keys, bg).
- **Check your work before finishing:** `cd video && npx tsc --noEmit`, then render stills at ~70% of every scene with `node tools/stills.mjs - <seconds…>` (writes `video/out/st_*.png`), tile them (`montage`) and look at them. Fix overlaps, figures cut off by the frame, labels covering faces, and empty scenes. Render the thumbnail `npx remotion still src/index.ts Thumbnail out/thumb.png` and look at it too.
- Do not edit `mb.ts`, `chrome.tsx`, `Video.tsx`, `Root.tsx`, `data.ts` or the pipeline scripts during a daily run.
