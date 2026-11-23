"""ONE-TIME, run on your own computer (not on GitHub).
1. In Google Cloud Console create an OAuth client of type "Desktop app" and download it as client_secret.json
   into this folder.
2. pip install google-auth-oauthlib
3. python3 get_youtube_token.py
A browser opens: sign in with the Google account that owns the Pauranik Kathaye channel and allow access.
(If Google shows "Google hasn't verified this app", click Advanced → Go to … (unsafe) — it's your own app.)
The script prints three values. Save them as GitHub repository secrets:
  YT_CLIENT_ID, YT_CLIENT_SECRET, YT_REFRESH_TOKEN
Never paste them into a chat or commit them to the repo."""
import json
from google_auth_oauthlib.flow import InstalledAppFlow

SCOPES = ['https://www.googleapis.com/auth/youtube.upload', 'https://www.googleapis.com/auth/youtube.force-ssl']
flow = InstalledAppFlow.from_client_secrets_file('client_secret.json', SCOPES)
creds = flow.run_local_server(port=0, prompt='consent', access_type='offline')
cfg = json.load(open('client_secret.json'))
c = cfg.get('installed') or cfg.get('web')
print('\nSave these as GitHub secrets (Settings → Secrets and variables → Actions → New repository secret):\n')
print('YT_CLIENT_ID     =', c['client_id'])
print('YT_CLIENT_SECRET =', c['client_secret'])
print('YT_REFRESH_TOKEN =', creds.refresh_token)
