---
sidebar_position: 4
title: Series Streaming
description: Stream TV series episodes
---

# Series Streaming

Access TV series episodes via direct streaming URLs.

## Stream URL Format

```
GET /series/{username}/{password}/{episode_id}.{ext}
```

## Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `username` | string | Account username |
| `password` | string | Account password |
| `episode_id` | integer | Episode stream ID |
| `ext` | string | File extension (mkv, mp4, avi) |

## Code Examples

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="curl" label="cURL">

```bash
# Get series info first
curl "http://server:25461/player_api.php?username=user&password=pass&action=get_series_info&series_id=100"

# Stream episode
curl "http://server:25461/series/user/pass/12345.mkv" -o episode.mkv
```

</TabItem>
<TabItem value="python" label="Python">

```python
import requests

# Get series info with episodes
response = requests.get(
    "http://server:25461/player_api.php",
    params={
        "username": "user",
        "password": "pass",
        "action": "get_series_info",
        "series_id": 100
    }
)
series_info = response.json()

# Get episodes from season 1
episodes = series_info.get("episodes", {}).get("1", [])

for episode in episodes:
    episode_id = episode["id"]
    extension = episode.get("container_extension", "mkv")
    title = episode["title"]

    stream_url = f"http://server:25461/series/user/pass/{episode_id}.{extension}"
    print(f"Episode: {title} - {stream_url}")
```

</TabItem>
<TabItem value="php" label="PHP">

```php
<?php
// Get series info
$params = http_build_query([
    'username' => 'user',
    'password' => 'pass',
    'action' => 'get_series_info',
    'series_id' => 100
]);
$series = json_decode(file_get_contents("http://server:25461/player_api.php?$params"), true);

// List all episodes
foreach ($series['episodes'] as $season => $episodes) {
    echo "Season $season:\n";
    foreach ($episodes as $episode) {
        $episodeId = $episode['id'];
        $extension = $episode['container_extension'] ?? 'mkv';
        $streamUrl = "http://server:25461/series/user/pass/$episodeId.$extension";
        echo "  {$episode['title']}: $streamUrl\n";
    }
}
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
// Get series info
const params = new URLSearchParams({
  username: 'user',
  password: 'pass',
  action: 'get_series_info',
  series_id: '100'
});

const response = await fetch(`http://server:25461/player_api.php?${params}`);
const seriesInfo = await response.json();

// Build episode URLs
const episodes = seriesInfo.episodes || {};
for (const [season, seasonEpisodes] of Object.entries(episodes)) {
  console.log(`Season ${season}:`);
  for (const episode of seasonEpisodes) {
    const ext = episode.container_extension || 'mkv';
    const url = `http://server:25461/series/user/pass/${episode.id}.${ext}`;
    console.log(`  ${episode.title}: ${url}`);
  }
}
```

</TabItem>
</Tabs>

## Episode Data Structure

When you call `get_series_info`, episodes are organized by season:

```json
{
  "episodes": {
    "1": [
      {
        "id": "12345",
        "episode_num": 1,
        "title": "Pilot",
        "container_extension": "mkv",
        "info": {
          "duration_secs": 2700,
          "duration": "00:45:00"
        }
      }
    ],
    "2": [...]
  }
}
```
