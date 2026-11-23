"""Forced alignment without network: synthesize the known Hindi text with eSpeak-NG,
DTW-align its MFCCs to the real voice, map phrase boundaries, snap to real pauses.
Writes caps.json + channel_intro.srt. Usage: python3 tools/align.py"""
import ctypes, re, json, subprocess, math, numpy as np, librosa, espeakng_loader as E

import sys
TXT = sys.argv[1] if len(sys.argv) > 1 else 'work/voiceover.txt'
VOICE = sys.argv[2] if len(sys.argv) > 2 else 'video/public/voice.mp3'
OUT_CAPS = sys.argv[3] if len(sys.argv) > 3 else 'work/caps.json'
OUT_SRT = sys.argv[4] if len(sys.argv) > 4 else 'work/captions.srt'

# ---------- phrases (exact script words) ----------
txt = re.sub(r'\s+', ' ', open(TXT, encoding='utf-8').read().replace('\n', ' ')).strip()
parts = re.split(r'(?<=[।?!…])\s+|\s+(?=—)', txt)
phr = []
for p in parts:
    p = p.strip()
    if p.startswith('— '): p = p[2:]
    p = p.rstrip(' …').strip()
    if p.endswith('…'): p = p[:-1].strip()
    for q in re.split(r'(?<=,)\s+', p):
        q = q.strip()
        if q: phr.append(q)

# ---------- eSpeak synthesis via ctypes ----------
lib = ctypes.cdll.LoadLibrary(E.get_library_path())
SR = lib.espeak_Initialize(2, 0, E.get_data_path().encode(), 0)  # AUDIO_OUTPUT_SYNCHRONOUS
buf = []
CB = ctypes.CFUNCTYPE(ctypes.c_int, ctypes.POINTER(ctypes.c_short), ctypes.c_int, ctypes.c_void_p)
@CB
def cb(wav, n, ev):
    if n > 0: buf.extend(wav[:n])
    return 0
lib.espeak_SetSynthCallback(cb)
lib.espeak_SetVoiceByName(b'hi')
lib.espeak_SetParameter(1, 150, 0)  # rate wpm
def synth(s):
    buf.clear()
    b = s.encode('utf-8')
    lib.espeak_Synth(b, len(b) + 1, 0, 0, 0, 0x01, None, None)  # espeakCHARS_UTF8
    lib.espeak_Synchronize()
    return np.array(buf, dtype=np.float32) / 32768.0

segs, bounds, t = [], [], 0.0
gap = np.zeros(int(SR * 0.25), dtype=np.float32)
for p in phr:
    a = synth(p)
    bounds.append((t, t + len(a) / SR))
    segs += [a, gap]; t += (len(a) + len(gap)) / SR
syn = np.concatenate(segs)

# ---------- features ----------
real, sr = librosa.load(VOICE, sr=16000, mono=True)
syn16 = librosa.resample(syn, orig_sr=SR, target_sr=16000)
HOP = 640  # 40 ms
def feat(y):
    m = librosa.feature.mfcc(y=y, sr=16000, n_mfcc=13, hop_length=HOP, n_fft=1024)[1:]
    m = (m - m.mean(1, keepdims=True)) / (m.std(1, keepdims=True) + 1e-6)
    return m.astype(np.float32)
X, Y = feat(syn16), feat(real)
D, wp = librosa.sequence.dtw(X=X, Y=Y, metric='cosine', global_constraints=True, band_rad=0.12)
wp = wp[::-1]
fs = 16000 / HOP
s_idx, r_idx = wp[:, 0], wp[:, 1]
def map_t(ts):
    i = int(round(ts * fs)); k = np.searchsorted(s_idx, i)
    k = min(k, len(r_idx) - 1); return r_idx[k] / fs

# ---------- real pauses ----------
out = subprocess.run(['ffmpeg', '-hide_banner', '-i', VOICE, '-af', 'silencedetect=noise=-35dB:d=0.12', '-f', 'null', '-'], capture_output=True, text=True).stderr
ss = [float(x) for x in re.findall(r'silence_start: ([\d.]+)', out)]
se = [float(x) for x in re.findall(r'silence_end: ([\d.]+)', out)]
dur = len(real) / 16000
pauses = list(zip(ss, se + [dur] * (len(ss) - len(se))))
speech_start = pauses[0][1] if pauses[0][0] < 0.05 else 0.0
speech_end = pauses[-1][0] if pauses[-1][1] >= dur - 0.05 else dur
inner = [p for p in pauses if p[0] > speech_start + 0.05 and p[1] < speech_end - 0.05]

# boundary between phrase i and i+1 -> mapped time, snapped to nearest pause (unique, increasing)
raw_b = [map_t((bounds[i][1] + bounds[i + 1][0]) / 2) for i in range(len(phr) - 1)]
used = set(); snapped = []; prev = speech_start
for i, rb in enumerate(raw_b):
    cand = [(abs((a + b) / 2 - rb), j) for j, (a, b) in enumerate(inner) if j not in used and a > prev + 0.2 and abs((a + b) / 2 - rb) < 1.0]
    if cand:
        _, j = min(cand); used.add(j); snapped.append(inner[j]); prev = inner[j][1]
    else:
        x = max(rb, prev + 0.3); snapped.append((x, x)); prev = x
caps = []; s0 = speech_start
for i, p in enumerate(phr):
    e0 = snapped[i][0] if i < len(phr) - 1 else speech_end
    caps.append([round(s0, 2), round(e0, 2), p])
    if i < len(phr) - 1: s0 = snapped[i][1]
# group short phrases
g = []
for c in caps:
    if g and len(g[-1][2]) + 1 + len(c[2]) <= 52 and c[0] - g[-1][1] < 0.45 and not g[-1][2].endswith('।'):
        g[-1] = [g[-1][0], c[1], g[-1][2] + ' ' + c[2]]
    else: g.append(list(c))
caps = g
def ts(x):
    m, s = divmod(x, 60); h, m = divmod(m, 60)
    return f'{int(h):02d}:{int(m):02d}:{int(s):02d},{int(round((s - int(s)) * 1000)) % 1000:03d}'
with open(OUT_SRT, 'w', encoding='utf-8') as f:
    for i, (a, b, t_) in enumerate(caps, 1): f.write(f'{i}\n{ts(a)} --> {ts(b)}\n{t_}\n\n')
caps = [[float(a), float(b), t_] for a, b, t_ in caps]
json.dump(caps, open(OUT_CAPS, 'w'), ensure_ascii=False)
unsnapped = sum(1 for a, b in snapped if a == b)
rates = [ (c[1]-c[0]) / len(c[2]) for c in caps]
print(len(phr), 'phrases ->', len(caps), 'captions; unsnapped boundaries:', unsnapped, '; synth len', round(len(syn)/SR,1), 'real', round(dur,1))
print('sec/char median', round(float(np.median(rates)),3), 'min', round(min(rates),3), 'max', round(max(rates),3))
bad = [c for c in caps if (c[1]-c[0])/len(c[2]) < 0.035 or (c[1]-c[0])/len(c[2]) > 0.16]
print('suspicious:', len(bad)); [print(b) for b in bad[:10]]
