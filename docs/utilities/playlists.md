---
sidebar_position: 2
title: M3U Playlists
description: Generate M3U/M3U8 playlists
---

# M3U Playlists

The playlist API (`/get.php`) generates M3U/M3U8 playlists for IPTV players.

## Endpoint

```
GET /get.php?username={username}&password={password}&type={type}&output={output}
```

## Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `username` | string | Yes | Account username |
| `password` | string | Yes | Account password |
| `type` | string | Yes | Content type |
| `output` | string | No | Output format |

### Content Types

| Type | Description |
|------|-------------|
| `m3u_plus` | Full M3U playlist with metadata |
| `m3u` | Simple M3U playlist |

### Output Formats

| Output | Description |
|--------|-------------|
| `ts` | MPEG-TS format |
| `m3u8` | HLS format |
| `rtmp` | RTMP format |

## Code Examples

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="curl" label="cURL">

```bash
# Full M3U Plus playlist (HLS)
curl "http://server:25461/get.php?username=user&password=pass&type=m3u_plus&output=m3u8" -o playlist.m3u

# Simple M3U (MPEG-TS)
curl "http://server:25461/get.php?username=user&password=pass&type=m3u&output=ts" -o playlist.m3u

# Download to specific location
curl -o ~/playlists/iptv.m3u "http://server:25461/get.php?username=user&password=pass&type=m3u_plus"
```

</TabItem>
<TabItem value="python" label="Python">

```python
import requests
import re

# Download playlist
response = requests.get(
    "http://server:25461/get.php",
    params={
        "username": "user",
        "password": "pass",
        "type": "m3u_plus",
        "output": "m3u8"
    }
)
playlist_content = response.text

# Parse M3U
channels = []
lines = playlist_content.split('\n')
for i, line in enumerate(lines):
    if line.startswith('#EXTINF:'):
        # Extract channel info
        match = re.search(r'tvg-id="([^"]*)".*tvg-name="([^"]*)".*group-title="([^"]*)"', line)
        if match:
            channel = {
                'id': match.group(1),
                'name': match.group(2),
                'group': match.group(3),
                'url': lines[i + 1] if i + 1 < len(lines) else None
            }
            channels.append(channel)

# Save to file
with open('playlist.m3u', 'w') as f:
    f.write(playlist_content)
```

</TabItem>
<TabItem value="php" label="PHP">

```php
<?php
// Download playlist
$params = http_build_query([
    'username' => 'user',
    'password' => 'pass',
    'type' => 'm3u_plus',
    'output' => 'm3u8'
]);
$playlist = file_get_contents("http://server:25461/get.php?$params");

// Save to file
file_put_contents('playlist.m3u', $playlist);

// Or serve directly
header('Content-Type: audio/x-mpegurl');
header('Content-Disposition: attachment; filename="playlist.m3u"');
echo $playlist;
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
// Download playlist
const params = new URLSearchParams({
  username: 'user',
  password: 'pass',
  type: 'm3u_plus',
  output: 'm3u8'
});

const response = await fetch(`http://server:25461/get.php?${params}`);
const playlist = await response.text();

// Parse M3U channels
const channels = [];
const lines = playlist.split('\n');
for (let i = 0; i < lines.length; i++) {
  if (lines[i].startsWith('#EXTINF:')) {
    const match = lines[i].match(/tvg-id="([^"]*)".*tvg-name="([^"]*)".*group-title="([^"]*)"/);
    if (match) {
      channels.push({
        id: match[1],
        name: match[2],
        group: match[3],
        url: lines[i + 1]
      });
    }
  }
}

// Download as file
const blob = new Blob([playlist], { type: 'audio/x-mpegurl' });
const url = URL.createObjectURL(blob);
const a = document.createElement('a');
a.href = url;
a.download = 'playlist.m3u';
a.click();
```

</TabItem>
</Tabs>

## M3U Plus Format

The extended M3U format includes channel metadata:

```m3u
#EXTM3U
#EXTINF:-1 tvg-id="channel1" tvg-name="Channel 1" tvg-logo="http://logo.png" group-title="Sports",Channel 1
http://server:25461/user/pass/12345.m3u8
#EXTINF:-1 tvg-id="channel2" tvg-name="Channel 2" tvg-logo="http://logo2.png" group-title="News",Channel 2
http://server:25461/user/pass/12346.m3u8
```

### M3U Tags

| Tag | Description |
|-----|-------------|
| `tvg-id` | EPG channel ID |
| `tvg-name` | Display name |
| `tvg-logo` | Channel logo URL |
| `group-title` | Category/group name |
| `tvg-chno` | Channel number |

## Alternative Playlist URL

You can also use the simplified format:

```
http://server:25461/get.php?username=user&password=pass&type=m3u_plus
```

Or the direct playlist link:

```
http://server:25461/user/pass/playlist.m3u
```
