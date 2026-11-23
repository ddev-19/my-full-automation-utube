"""Write work/issue.md: the daily review note (links + fact-check table) that the workflow posts as a GitHub issue.
Usage: python3 pipeline/report.py [run_url]"""
import json, os, re, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
W = lambda *p: os.path.join(ROOT, *p)
fest = json.load(open(W('work', 'festival.json'), encoding='utf-8'))
meta = json.load(open(W('work', 'meta.json'), encoding='utf-8')) if os.path.exists(W('work', 'meta.json')) else {}
up = json.load(open(W('work', 'upload.json'))) if os.path.exists(W('work', 'upload.json')) else {}
script = open(W('work', 'script.md'), encoding='utf-8').read() if os.path.exists(W('work', 'script.md')) else ''
m = re.search(r'(##[^\n]*[Ff]act[^\n]*\n.*?)(\n## |\Z)', script, re.S)
facts = m.group(1) if m else '(fact-check table not found in script.md)'
run = sys.argv[1] if len(sys.argv) > 1 else ''
lines = [f"# {fest['id']:02d} · {fest['festival']} ({fest['hindi']})", '']
if up.get('video_id'):
    lines += [f"**Video (private):** {up['url']}", f"**Edit / publish in Studio:** {up['studio']}", '']
else:
    lines += ['**Not uploaded** — download the video from the workflow run artifacts.', '']
lines += [f"**Title:** {meta.get('title', '')}", '', '## Your review checklist (≈15 min)',
          '- [ ] Watch the video once (voice, pronunciation of Sanskrit lines, scene timing)',
          '- [ ] Read the fact-check table below; fix the description in Studio if needed',
          '- [ ] Check the thumbnail and title',
          '- [ ] In Studio: set Visibility → Public or Schedule', '']
for n in up.get('notes', []):
    lines.append(f'> ⚠️ {n}')
lines += ['', facts.strip(), '', f'Run: {run}', f"Files: `episodes/{fest['slug']}/`"]
open(W('work', 'issue.md'), 'w', encoding='utf-8').write('\n'.join(lines) + '\n')
print('\n'.join(lines[:6]))
