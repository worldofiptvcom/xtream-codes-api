---
sidebar_position: 4
title: Get Live Streams
description: Get list of live TV channels
---

# Get Live Streams

Returns a list of live TV channels/streams available to the user.

## Endpoint

```
GET /player_api.php?action=get_live_streams
```

## Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `username` | string | Yes | User's login username |
| `password` | string | Yes | User's login password |
| `action` | string | Yes | Must be `get_live_streams` |
| `category_id` | string | No | Filter by category ID |

## Response

```json
[
  {
    "num": 1,
    "name": "BBC One HD",
    "stream_type": "live",
    "stream_id": 123,
    "stream_icon": "http://example.com/icons/bbc1.png",
    "epg_channel_id": "bbc.one.uk",
    "added": "1609459200",
    "category_id": "1",
    "custom_sid": "",
    "tv_archive": 1,
    "direct_source": "",
    "tv_archive_duration": 7
  },
  {
    "num": 2,
    "name": "CNN International",
    "stream_type": "live",
    "stream_id": 124,
    "stream_icon": "http://example.com/icons/cnn.png",
    "epg_channel_id": "cnn.international",
    "added": "1609459200",
    "category_id": "2",
    "custom_sid": "",
    "tv_archive": 0,
    "direct_source": "",
    "tv_archive_duration": 0
  }
]
```

### Response Fields

| Field | Type | Description |
|-------|------|-------------|
| `num` | integer | Channel number/order |
| `name` | string | Channel display name |
| `stream_type` | string | Always "live" for live streams |
| `stream_id` | integer | Unique stream identifier |
| `stream_icon` | string | URL to channel logo |
| `epg_channel_id` | string | EPG mapping ID |
| `added` | string | Timestamp when added |
| `category_id` | string | Category this channel belongs to |
| `custom_sid` | string | Custom service ID |
| `tv_archive` | integer | 1 = catchup available, 0 = no |
| `direct_source` | string | Direct source URL (if enabled) |
| `tv_archive_duration` | integer | Days of catchup available |

## Stream URL Format

To play a live stream, construct the URL:

```
http://server:25461/live/{username}/{password}/{stream_id}.{extension}
```

### Supported Extensions

| Extension | Description |
|-----------|-------------|
| `.ts` | MPEG Transport Stream |
| `.m3u8` | HLS Adaptive Streaming |

## Code Examples

### cURL

```bash
# Get all live streams
curl -X GET "http://server:25461/player_api.php?username=demo&password=test123&action=get_live_streams"

# Get streams by category
curl -X GET "http://server:25461/player_api.php?username=demo&password=test123&action=get_live_streams&category_id=1"
```

### Python

```python
import requests

def get_live_streams(server, username, password, category_id=None):
    """Get live TV channels."""
    params = {
        "username": username,
        "password": password,
        "action": "get_live_streams"
    }
    if category_id:
        params["category_id"] = category_id

    response = requests.get(f"{server}/player_api.php", params=params)
    return response.json()

def get_stream_url(server, username, password, stream_id, extension="ts"):
    """Generate stream URL."""
    return f"{server}/live/{username}/{password}/{stream_id}.{extension}"

# Usage
server = "http://server:25461"
streams = get_live_streams(server, "demo", "test123")

for stream in streams[:5]:  # First 5 channels
    url = get_stream_url(server, "demo", "test123", stream['stream_id'])
    print(f"{stream['name']}: {url}")
```

### PHP

```php
<?php
function getLiveStreams($server, $username, $password, $categoryId = null) {
    $params = [
        'username' => $username,
        'password' => $password,
        'action' => 'get_live_streams'
    ];
    if ($categoryId) {
        $params['category_id'] = $categoryId;
    }

    $url = "{$server}/player_api.php?" . http_build_query($params);
    $response = file_get_contents($url);
    return json_decode($response, true);
}

function getStreamUrl($server, $username, $password, $streamId, $extension = "ts") {
    return "{$server}/live/{$username}/{$password}/{$streamId}.{$extension}";
}

// Usage
$server = "http://server:25461";
$streams = getLiveStreams($server, "demo", "test123");

foreach (array_slice($streams, 0, 5) as $stream) {
    $url = getStreamUrl($server, "demo", "test123", $stream['stream_id']);
    echo "{$stream['name']}: {$url}\n";
}
?>
```

### JavaScript

```javascript
async function getLiveStreams(server, username, password, categoryId = null) {
    const url = new URL(`${server}/player_api.php`);
    url.searchParams.set('username', username);
    url.searchParams.set('password', password);
    url.searchParams.set('action', 'get_live_streams');
    if (categoryId) {
        url.searchParams.set('category_id', categoryId);
    }

    const response = await fetch(url);
    return await response.json();
}

function getStreamUrl(server, username, password, streamId, extension = "ts") {
    return `${server}/live/${username}/${password}/${streamId}.${extension}`;
}

// Usage
const server = "http://server:25461";
const streams = await getLiveStreams(server, "demo", "test123");

streams.slice(0, 5).forEach(stream => {
    const url = getStreamUrl(server, "demo", "test123", stream.stream_id);
    console.log(`${stream.name}: ${url}`);
});
```

## Playing Streams

### VLC Media Player

```bash
vlc "http://server:25461/live/demo/test123/123.ts"
```

### FFplay

```bash
ffplay "http://server:25461/live/demo/test123/123.ts"
```

### HTML5 with HLS.js

```html
<script src="https://cdn.jsdelivr.net/npm/hls.js@latest"></script>
<video id="video" controls></video>
<script>
    const video = document.getElementById('video');
    const src = 'http://server:25461/live/demo/test123/123.m3u8';

    if (Hls.isSupported()) {
        const hls = new Hls();
        hls.loadSource(src);
        hls.attachMedia(video);
    }
</script>
```

## Notes

- Results are filtered based on user's bouquet assignments
- The `tv_archive` field indicates if catchup/timeshift is available
- Use `epg_channel_id` to match with XMLTV EPG data
