"""Pick the next pending festival from festivals.csv and write work/festival.json.
Exit code 3 when nothing is left. Usage: python3 pipeline/next_festival.py [--id N]"""
import csv, json, os, re, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
rows = list(csv.DictReader(open(os.path.join(ROOT, 'festivals.csv'), encoding='utf-8')))
want = None
if '--id' in sys.argv:
    want = int(sys.argv[sys.argv.index('--id') + 1])
rows.sort(key=lambda r: int(r['id']))
pick = None
for i, r in enumerate(rows):
    if (want is not None and int(r['id']) == want) or (want is None and r['status'] == 'pending'):
        pick = (i, r)
        break
if not pick:
    print('No pending festival left.')
    sys.exit(3)
i, r = pick
nxt = rows[i + 1] if i + 1 < len(rows) else None
slug = re.sub(r'[^a-z0-9]+', '_', r['festival'].lower()).strip('_')[:40]
info = {
    'id': int(r['id']), 'festival': r['festival'], 'hindi': r['hindi'], 'date': r['date'], 'region': r['region'],
    'size': r['size'], 'core_story': r['core_story'], 'date_note': r['date_note'], 'slug': f"{int(r['id']):02d}_{slug}",
    'next': {'festival': nxt['festival'], 'hindi': nxt['hindi'], 'core_story': nxt['core_story']} if nxt else None,
}
os.makedirs(os.path.join(ROOT, 'work'), exist_ok=True)
json.dump(info, open(os.path.join(ROOT, 'work', 'festival.json'), 'w', encoding='utf-8'), ensure_ascii=False, indent=2)
print(json.dumps(info, ensure_ascii=False))
gh = os.environ.get('GITHUB_OUTPUT')
if gh:
    with open(gh, 'a') as f:
        f.write(f"id={info['id']}\nslug={info['slug']}\nfestival={info['festival']}\n")
