"""Hindi voice-over with the Gemini API (same voices as AI Studio's Generate Speech).
Reads work/voiceover.txt, writes work/voice.wav (24 kHz mono).
Env: GEMINI_API_KEY (required), TTS_VOICE (default Charon), TTS_MODEL (default gemini-2.5-flash-preview-tts),
     TTS_STYLE (optional delivery instruction)."""
import base64, json, os, sys, time, urllib.request, urllib.error, wave

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
KEY = os.environ.get('GEMINI_API_KEY') or sys.exit('GEMINI_API_KEY is not set')
VOICE = os.environ.get('TTS_VOICE', 'Charon')
MODELS = [m for m in [os.environ.get('TTS_MODEL'), 'gemini-2.5-flash-preview-tts', 'gemini-2.5-pro-preview-tts'] if m]
STYLE = os.environ.get('TTS_STYLE', 'Read the following Hindi text aloud in a warm, calm storytelling voice, like a grandparent telling a story to a child. Speak clearly at a gentle pace and pause briefly at "…". Read only the text after the colon:')
SR = 24000

text = open(os.path.join(ROOT, 'work', 'voiceover.txt'), encoding='utf-8').read().strip()
paras = [p.strip() for p in text.split('\n\n') if p.strip()]
# group paragraphs into chunks of <= ~1100 characters (long requests can get cut short)
chunks, cur = [], ''
for p in paras:
    if cur and len(cur) + len(p) + 2 > 1100:
        chunks.append(cur); cur = p
    else:
        cur = (cur + '\n\n' + p).strip()
if cur: chunks.append(cur)

def call(model, chunk):
    body = {
        'contents': [{'parts': [{'text': f'{STYLE}\n\n{chunk}'}]}],
        'generationConfig': {'responseModalities': ['AUDIO'], 'speechConfig': {'voiceConfig': {'prebuiltVoiceConfig': {'voiceName': VOICE}}}},
    }
    req = urllib.request.Request(f'https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent',
                                 data=json.dumps(body).encode(), headers={'Content-Type': 'application/json', 'x-goog-api-key': KEY})
    with urllib.request.urlopen(req, timeout=300) as r:
        res = json.load(r)
    part = res['candidates'][0]['content']['parts'][0]
    return base64.b64decode(part['inlineData']['data'])

pcm_all = b''
gap = b'\x00\x00' * int(SR * 0.45)
for n, ch in enumerate(chunks, 1):
    ok = False
    for model in MODELS:
        for attempt in range(3):
            try:
                pcm = call(model, ch)
                secs = len(pcm) / 2 / SR
                rate = secs / max(1, len(ch))
                if rate < 0.035:  # suspiciously short: the model probably skipped text
                    raise ValueError(f'audio too short ({secs:.1f}s for {len(ch)} chars)')
                print(f'chunk {n}/{len(chunks)}: {len(ch)} chars -> {secs:.1f}s ({model})')
                pcm_all += pcm + gap
                ok = True
                break
            except (urllib.error.HTTPError, urllib.error.URLError, KeyError, ValueError, TimeoutError) as e:
                msg = e.read().decode()[:300] if isinstance(e, urllib.error.HTTPError) else str(e)
                print(f'chunk {n} {model} attempt {attempt + 1} failed: {msg}')
                time.sleep(10 * (attempt + 1))
        if ok: break
    if not ok:
        sys.exit(f'TTS failed for chunk {n}')

out = os.path.join(ROOT, 'work', 'voice.wav')
with wave.open(out, 'wb') as w:
    w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR); w.writeframes(pcm_all)
print('wrote', out, f'{len(pcm_all) / 2 / SR:.1f}s')
