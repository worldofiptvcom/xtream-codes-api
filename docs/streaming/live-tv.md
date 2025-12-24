---
sidebar_position: 2
title: Live TV Streaming
description: Stream live TV channels
---

# Live TV Streaming

Access live TV streams with support for multiple protocols and formats.

## Stream URL Formats

### Standard Format

```
GET /{username}/{password}/{stream_id}.{ext}
GET /live/{username}/{password}/{stream_id}.{ext}
```

### Token-Based Format

```
GET /play/{token}/{stream_id}/{ext}
```

## Code Examples

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="curl" label="cURL">

```bash
# Stream to file
curl "http://server:25461/user/pass/12345.ts" -o stream.ts

# Stream with VLC
vlc "http://server:25461/user/pass/12345.m3u8"

# HLS stream
curl "http://server:25461/user/pass/12345.m3u8"
```

</TabItem>
<TabItem value="python" label="Python">

```python
import requests

# Build stream URL
stream_url = f"http://server:25461/user/pass/12345.ts"

# Stream to file
with requests.get(stream_url, stream=True) as r:
    r.raise_for_status()
    with open('stream.ts', 'wb') as f:
        for chunk in r.iter_content(chunk_size=8192):
            f.write(chunk)

# Or get HLS playlist
hls_url = f"http://server:25461/user/pass/12345.m3u8"
playlist = requests.get(hls_url).text
```

</TabItem>
<TabItem value="php" label="PHP">

```php
<?php
// Build stream URL
$streamUrl = "http://server:25461/user/pass/12345.ts";

// Redirect to stream (for web players)
header("Location: $streamUrl");
exit;

// Or get HLS playlist
$hlsUrl = "http://server:25461/user/pass/12345.m3u8";
$playlist = file_get_contents($hlsUrl);
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
// HLS.js player example
import Hls from 'hls.js';

const video = document.getElementById('video');
const streamUrl = 'http://server:25461/user/pass/12345.m3u8';

if (Hls.isSupported()) {
  const hls = new Hls();
  hls.loadSource(streamUrl);
  hls.attachMedia(video);
  hls.on(Hls.Events.MANIFEST_PARSED, () => {
    video.play();
  });
}
```

</TabItem>
</Tabs>

## HLS Chunking

When using `.m3u8` extension, the server returns an HLS playlist with segment URLs:

```m3u8
#EXTM3U
#EXT-X-VERSION:3
#EXT-X-TARGETDURATION:10
#EXT-X-MEDIA-SEQUENCE:0
#EXTINF:10.0,
http://server:25461/hls/user/pass/12345/seg-0.ts
#EXTINF:10.0,
http://server:25461/hls/user/pass/12345/seg-1.ts
```

## Response Headers

| Header | Value |
|--------|-------|
| `Content-Type` | `video/mp2t` or `application/vnd.apple.mpegurl` |
| `Transfer-Encoding` | `chunked` |
| `Connection` | `keep-alive` |
