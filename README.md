# पौराणिक कथाएँ — automatic daily episodes

Every morning (06:00 IST) GitHub Actions makes one episode for the next festival in `festivals.csv`:

1. **Claude** researches the festival and writes the Hindi script + fact-check table, title, description and tags.
2. **Gemini TTS** records the voice-over (the same voices as AI Studio → Generate speech).
3. The voice is aligned to the text (for the SRT and scene timing).
4. **Claude** animates Madhubani scenes for the story, checks every scene as an image, and designs the thumbnail.
5. The video (1920×1080, no burnt-in captions) and thumbnail are rendered.
6. The video is uploaded to YouTube as **Private**, with thumbnail and Hindi CC.
7. You get a GitHub issue (= email) with the links and the fact-check table. You review it in ~15 minutes and publish it from YouTube Studio.

Manual run any time: **Actions → Daily episode → Run workflow** (you can pick a festival id, or turn off the upload).

---

## One-time setup (≈ 1–1.5 h)

### 1. Claude (your subscription — no API key needed)
- Install Claude Code on your computer (`npm install -g @anthropic-ai/claude-code`), then run `claude setup-token` and sign in with your Claude account. It prints a long-lived token (`sk-ant-oat01-…`).
- GitHub repo → Settings → Secrets and variables → Actions → **New repository secret**: name `CLAUDE_CODE_OAUTH_TOKEN`, value = that token.
- Daily runs use your plan's usage limits. If you'd rather pay per use, create an API key at console.anthropic.com, save it as `ANTHROPIC_API_KEY`, and change `claude_code_oauth_token` back to `anthropic_api_key` in the workflow.

### 2. Gemini API key (voice)
- https://aistudio.google.com → **Get API key** → Create API key.
- In AI Studio → Generate speech, try voices on a paragraph of a script and note the one you like (e.g. `Charon`, `Kore`, `Puck`, `Orus`).
- Secret: `GEMINI_API_KEY`. Variable (Variables tab): `TTS_VOICE` = your voice name.

### 3. YouTube upload access
1. https://console.cloud.google.com → create a project, e.g. `pauranik-kathaye`.
2. APIs & Services → Library → **YouTube Data API v3** → Enable.
3. APIs & Services → **OAuth consent screen** → External → app name "Pauranik Kathaye uploader", your email → add scopes `youtube.upload` and `youtube.force-ssl` → save. Then click **Publish app** (status "In production"). In "Testing" the login expires after about a week.
4. APIs & Services → Credentials → Create credentials → **OAuth client ID** → type **Desktop app** → Download JSON → rename it `client_secret.json`.
5. On your computer, in a folder with `client_secret.json` and `pipeline/get_youtube_token.py`:
   ```
   pip install google-auth-oauthlib
   python3 get_youtube_token.py
   ```
   Sign in with the account that owns the channel. Google warns "app not verified" → Advanced → Continue (it's your own app).
6. Save the three printed values as secrets: `YT_CLIENT_ID`, `YT_CLIENT_SECRET`, `YT_REFRESH_TOKEN`.

### 4. YouTube channel settings
- Verify the channel with your phone (https://www.youtube.com/verify) — needed for custom thumbnails.
- Optional: create a playlist "हिंदू त्योहारों की कथाएँ" and save its id (the part after `list=` in its URL) as variable `YT_PLAYLIST_ID`.

### 5. Test run
Actions → **Daily episode** → Run workflow → upload: off. Download the video from the run's artifacts and watch it. If it looks good, the daily schedule takes over.

---

## Good to know
- **Videos arrive as Private.** YouTube keeps uploads from un-audited API projects private. That's also your review step. To let the pipeline publish/schedule directly, apply for the YouTube API audit (YouTube API Services – Audit and Quota Extension form) and then set the variable `YT_PUBLISH_AT` logic as needed.
- **Optional variables:** `CLAUDE_MODEL` (default `claude-sonnet-5-5`; use `claude-opus-5-5` for richer scenes), `TTS_MODEL`, `YT_SYNTHETIC` (`true` to tick YouTube's altered/synthetic content label).
- **Skip or reorder festivals:** edit `festivals.csv` (`status` = `pending` / `done`).
- **Pause:** Actions → Daily episode → ⋯ → Disable workflow.
- Each finished episode's script, metadata, scenes and captions are saved in `episodes/`.
