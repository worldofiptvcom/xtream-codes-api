---
sidebar_position: 3
title: VOD Streaming
description: Stream movies and video on demand
---

# VOD Streaming

Access Video on Demand content (movies) via direct streaming URLs.

## Stream URL Format

```
GET /movie/{username}/{password}/{stream_id}.{ext}
```

## Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `username` | string | Account username |
| `password` | string | Account password |
| `stream_id` | integer | VOD stream ID |
| `ext` | string | File extension (mkv, mp4, avi) |

## Code Examples

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="curl" label="cURL">

```bash
# Download movie
curl "http://server:25461/movie/user/pass/67890.mkv" -o movie.mkv

# Stream with range request (resume support)
curl -H "Range: bytes=0-1000000" "http://server:25461/movie/user/pass/67890.mkv"

# Get movie info first
curl "http://server:25461/player_api.php?username=user&password=pass&action=get_vod_info&vod_id=67890"
```

</TabItem>
<TabItem value="python" label="Python">

```python
import requests

# Get VOD info first
info_response = requests.get(
    "http://server:25461/player_api.php",
    params={
        "username": "user",
        "password": "pass",
        "action": "get_vod_info",
        "vod_id": 67890
    }
)
vod_info = info_response.json()
extension = vod_info.get("movie_data", {}).get("container_extension", "mkv")

# Build stream URL
stream_url = f"http://server:25461/movie/user/pass/67890.{extension}"

# Download with progress
with requests.get(stream_url, stream=True) as r:
    r.raise_for_status()
    total_size = int(r.headers.get('content-length', 0))
    with open('movie.mkv', 'wb') as f:
        downloaded = 0
        for chunk in r.iter_content(chunk_size=8192):
            f.write(chunk)
            downloaded += len(chunk)
            print(f"Downloaded: {downloaded}/{total_size} bytes")
```

</TabItem>
<TabItem value="php" label="PHP">

```php
<?php
// Get VOD info
$params = http_build_query([
    'username' => 'user',
    'password' => 'pass',
    'action' => 'get_vod_info',
    'vod_id' => 67890
]);
$info = json_decode(file_get_contents("http://server:25461/player_api.php?$params"), true);
$extension = $info['movie_data']['container_extension'] ?? 'mkv';

// Build stream URL
$streamUrl = "http://server:25461/movie/user/pass/67890.$extension";

// Redirect for direct playback
header("Location: $streamUrl");
exit;
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
// Get VOD info first
const infoParams = new URLSearchParams({
  username: 'user',
  password: 'pass',
  action: 'get_vod_info',
  vod_id: '67890'
});

const infoResponse = await fetch(`http://server:25461/player_api.php?${infoParams}`);
const vodInfo = await infoResponse.json();
const extension = vodInfo.movie_data?.container_extension || 'mkv';

// Build stream URL for video player
const streamUrl = `http://server:25461/movie/user/pass/67890.${extension}`;

// Use in HTML5 video element
const video = document.getElementById('video');
video.src = streamUrl;
video.play();
```

</TabItem>
</Tabs>

## Seeking Support

VOD streams support HTTP Range requests for seeking:

```bash
# Request specific byte range
curl -H "Range: bytes=1000000-2000000" "http://server:25461/movie/user/pass/67890.mkv"
```

### Response Headers

```
HTTP/1.1 206 Partial Content
Content-Range: bytes 1000000-2000000/50000000
Content-Length: 1000001
Accept-Ranges: bytes
```
