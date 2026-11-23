"""After a successful upload: mark the festival as uploaded in festivals.csv and save the episode files.
Usage: python3 pipeline/mark_done.py"""
import csv, datetime, json, os, shutil

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
W = lambda *p: os.path.join(ROOT, *p)
fest = json.load(open(W('work', 'festival.json'), encoding='utf-8'))
up = json.load(open(W('work', 'upload.json'))) if os.path.exists(W('work', 'upload.json')) else {}
path = W('festivals.csv')
rows = list(csv.DictReader(open(path, encoding='utf-8')))
for r in rows:
    if int(r['id']) == fest['id']:
        r['status'] = 'uploaded' if up.get('video_id') else 'rendered'
        r['youtube_id'] = up.get('video_id', '')
        r['processed_on'] = datetime.date.today().isoformat()
w = csv.DictWriter(open(path, 'w', encoding='utf-8', newline=''), fieldnames=list(rows[0].keys()))
w.writeheader(); w.writerows(rows)

ep = W('episodes', fest['slug'])
os.makedirs(ep, exist_ok=True)
for src, dst in [('work/script.md', 'script.md'), ('work/voiceover.txt', 'voiceover.txt'), ('work/meta.json', 'meta.json'),
                 ('work/captions.srt', 'captions.srt'), ('work/timeline.txt', 'timeline.txt'), ('work/upload.json', 'upload.json'),
                 ('video/src/scenes.tsx', 'scenes.tsx'), ('video/src/episode.ts', 'episode.ts')]:
    if os.path.exists(W(src)):
        shutil.copy(W(src), os.path.join(ep, dst))
print('marked', fest['festival'], rows and 'ok')
