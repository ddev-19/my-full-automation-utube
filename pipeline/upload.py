"""Upload the finished video to YouTube (private), set the thumbnail and Hindi captions.
Reads: out/video.mp4, out/thumb.png, work/captions.srt, work/meta.json
Writes: work/upload.json  {video_id, url}
Env: YT_CLIENT_ID, YT_CLIENT_SECRET, YT_REFRESH_TOKEN (required)
     YT_PRIVACY (default private), YT_PUBLISH_AT (optional ISO time; only works on audited projects),
     YT_PLAYLIST_ID (optional), YT_CATEGORY (default 27 = Education), YT_SYNTHETIC (default false)"""
import json, os, sys
from google.oauth2.credentials import Credentials
from googleapiclient.discovery import build
from googleapiclient.http import MediaFileUpload

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
W = lambda *p: os.path.join(ROOT, *p)
env = os.environ
for k in ('YT_CLIENT_ID', 'YT_CLIENT_SECRET', 'YT_REFRESH_TOKEN'):
    if not env.get(k):
        sys.exit(f'{k} is not set')
creds = Credentials(None, refresh_token=env['YT_REFRESH_TOKEN'], token_uri='https://oauth2.googleapis.com/token',
                    client_id=env['YT_CLIENT_ID'], client_secret=env['YT_CLIENT_SECRET'],
                    scopes=['https://www.googleapis.com/auth/youtube.upload', 'https://www.googleapis.com/auth/youtube.force-ssl'])
yt = build('youtube', 'v3', credentials=creds, cache_discovery=False)
meta = json.load(open(W('work', 'meta.json'), encoding='utf-8'))

status = {'privacyStatus': env.get('YT_PRIVACY', 'private'), 'selfDeclaredMadeForKids': False,
          'containsSyntheticMedia': env.get('YT_SYNTHETIC', 'false').lower() == 'true'}
if env.get('YT_PUBLISH_AT'):
    status['privacyStatus'] = 'private'; status['publishAt'] = env['YT_PUBLISH_AT']
body = {
    'snippet': {'title': meta['title'][:100], 'description': meta['description'][:4900], 'tags': meta.get('tags', [])[:30],
                'categoryId': env.get('YT_CATEGORY', '27'), 'defaultLanguage': 'hi', 'defaultAudioLanguage': 'hi'},
    'status': status,
}
req = yt.videos().insert(part='snippet,status', body=body,
                         media_body=MediaFileUpload(W('out', 'video.mp4'), chunksize=8 * 1024 * 1024, resumable=True, mimetype='video/mp4'))
resp = None
while resp is None:
    st, resp = req.next_chunk()
    if st: print(f'upload {int(st.progress() * 100)}%')
vid = resp['id']
print('uploaded', vid)

notes = []
try:
    yt.thumbnails().set(videoId=vid, media_body=MediaFileUpload(W('out', 'thumb.png'), mimetype='image/png')).execute()
    print('thumbnail set')
except Exception as e:
    notes.append(f'Thumbnail not set (is the channel phone-verified?): {e}')
try:
    yt.captions().insert(part='snippet', body={'snippet': {'videoId': vid, 'language': 'hi', 'name': 'हिंदी', 'isDraft': False}},
                         media_body=MediaFileUpload(W('work', 'captions.srt'), mimetype='application/octet-stream')).execute()
    print('captions added')
except Exception as e:
    notes.append(f'Captions not added: {e}')
if env.get('YT_PLAYLIST_ID'):
    try:
        yt.playlistItems().insert(part='snippet', body={'snippet': {'playlistId': env['YT_PLAYLIST_ID'], 'resourceId': {'kind': 'youtube#video', 'videoId': vid}}}).execute()
        print('added to playlist')
    except Exception as e:
        notes.append(f'Not added to playlist: {e}')

json.dump({'video_id': vid, 'url': f'https://youtu.be/{vid}', 'studio': f'https://studio.youtube.com/video/{vid}/edit', 'notes': notes},
          open(W('work', 'upload.json'), 'w'), indent=2)
for n in notes: print('NOTE:', n)
