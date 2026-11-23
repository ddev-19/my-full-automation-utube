"""Turn the aligned captions into the video's data file.
- video/src/data.ts : TOTAL length, no on-screen captions, optional sound effects from work/sfx.json
- work/captions.srt : final SRT for YouTube CC (long lines split, words unchanged)
- work/timeline.txt : numbered line list with times, for writing scenes
Usage: python3 pipeline/make_data.py"""
import json, os, subprocess

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
W = lambda *p: os.path.join(ROOT, *p)
caps = json.load(open(W('work', 'caps.json'), encoding='utf-8'))

out = []
for s, e, t in caps:
    if len(t) <= 72:
        out.append([s, e, t]); continue
    words = t.split(' '); n = -(-len(t) // 64); target = len(t) / n; parts = []; cur = ''
    for w in words:
        if cur and len(cur) + 1 + len(w) > target + 6 and len(parts) < n - 1:
            parts.append(cur); cur = w
        else:
            cur = (cur + ' ' + w).strip()
    parts.append(cur)
    tot = sum(len(p) for p in parts); t0 = s
    for i, p in enumerate(parts):
        t1 = e if i == len(parts) - 1 else round(t0 + (e - s) * len(p) / tot, 2)
        out.append([round(t0, 2), t1, p]); t0 = t1

dur = float(subprocess.run(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', W('video', 'public', 'voice.mp3')], capture_output=True, text=True).stdout.strip())
TOTAL = round(dur + 1.6, 1)
sfx = json.load(open(W('work', 'sfx.json'))) if os.path.exists(W('work', 'sfx.json')) else []

src = f"""import rms from './rms.json';
export const RMS: number[] = rms as number[];
export const TOTAL = {TOTAL};
export type Cap = {{ s: number; e: number; t: string; who?: string }};
export const CAPS: Cap[] = []; // no on-screen captions; the SRT goes to YouTube CC
export const SPEAK: Record<string, [number, number][]> = {{}};
export const SCENE_TAGS: {{ s: number; e: number; tag: string }}[] = [];
export const SFX: [string, number, number][] = {json.dumps(sfx)};
"""
open(W('video', 'src', 'data.ts'), 'w', encoding='utf-8').write(src)

def ts(x):
    m, s = divmod(x, 60); h, m = divmod(m, 60)
    return f'{int(h):02d}:{int(m):02d}:{int(s):02d},{int(round((s - int(s)) * 1000)) % 1000:03d}'
with open(W('work', 'captions.srt'), 'w', encoding='utf-8') as f:
    for i, (s, e, t) in enumerate(out, 1):
        f.write(f'{i}\n{ts(s)} --> {ts(e)}\n{t}\n\n')
with open(W('work', 'timeline.txt'), 'w', encoding='utf-8') as f:
    f.write(f'TOTAL video length: {TOTAL} s (voice {dur:.2f} s)\n')
    for i, (s, e, t) in enumerate(out):
        f.write(f'{i:3d}  {s:7.2f} - {e:7.2f}  {t}\n')
print('TOTAL', TOTAL, 'lines', len(out), 'sfx', len(sfx))
