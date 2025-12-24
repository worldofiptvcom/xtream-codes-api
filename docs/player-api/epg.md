---
sidebar_position: 11
title: Get EPG
description: Get Electronic Program Guide data for channels
---

# Get EPG (Short EPG)

Returns Electronic Program Guide (EPG) data for a specific channel.

## Endpoint

```
GET /player_api.php?action=get_short_epg
```

## Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `username` | string | Yes | User's login username |
| `password` | string | Yes | User's login password |
| `action` | string | Yes | Must be `get_short_epg` |
| `stream_id` | integer | Yes | Live stream ID |
| `limit` | integer | No | Number of EPG entries (default: 4) |

## Response

```json
{
  "epg_listings": [
    {
      "id": "12345",
      "epg_id": "67",
      "title": "Morning News",
      "lang": "en",
      "start": "2025-12-24 06:00:00",
      "end": "2025-12-24 09:00:00",
      "description": "The latest news, weather, and sports updates.",
      "channel_id": "bbc.one.uk",
      "start_timestamp": 1735020000,
      "stop_timestamp": 1735030800,
      "now_playing": 0,
      "has_archive": 1
    },
    {
      "id": "12346",
      "epg_id": "67",
      "title": "Breakfast Show",
      "lang": "en",
      "start": "2025-12-24 09:00:00",
      "end": "2025-12-24 12:00:00",
      "description": "Start your day with the best entertainment.",
      "channel_id": "bbc.one.uk",
      "start_timestamp": 1735030800,
      "stop_timestamp": 1735041600,
      "now_playing": 1,
      "has_archive": 1
    }
  ]
}
```

### Response Fields

| Field | Type | Description |
|-------|------|-------------|
| `id` | string | EPG entry ID |
| `epg_id` | string | EPG channel ID |
| `title` | string | Program title |
| `lang` | string | Language code |
| `start` | string | Start time (YYYY-MM-DD HH:MM:SS) |
| `end` | string | End time (YYYY-MM-DD HH:MM:SS) |
| `description` | string | Program description |
| `channel_id` | string | Channel identifier |
| `start_timestamp` | integer | Start Unix timestamp |
| `stop_timestamp` | integer | End Unix timestamp |
| `now_playing` | integer | 1 = currently playing, 0 = not |
| `has_archive` | integer | 1 = catchup available, 0 = no |

## Alternative: Simple Data Table

For a table-formatted EPG response:

```
GET /player_api.php?action=get_simple_data_table&stream_id={stream_id}
```

## Code Examples

### cURL

```bash
# Get next 4 programs
curl -X GET "http://server:25461/player_api.php?username=demo&password=test123&action=get_short_epg&stream_id=123"

# Get next 10 programs
curl -X GET "http://server:25461/player_api.php?username=demo&password=test123&action=get_short_epg&stream_id=123&limit=10"
```

### Python

```python
import requests
from datetime import datetime

def get_short_epg(server, username, password, stream_id, limit=4):
    """Get EPG data for a channel."""
    response = requests.get(f"{server}/player_api.php", params={
        "username": username,
        "password": password,
        "action": "get_short_epg",
        "stream_id": stream_id,
        "limit": limit
    })
    return response.json()

# Usage
server = "http://server:25461"
epg = get_short_epg(server, "demo", "test123", 123, limit=6)

print("EPG Listings:")
for program in epg.get('epg_listings', []):
    start = datetime.fromtimestamp(program['start_timestamp'])
    end = datetime.fromtimestamp(program['stop_timestamp'])
    status = "[NOW]" if program['now_playing'] == 1 else ""

    print(f"{start.strftime('%H:%M')} - {end.strftime('%H:%M')} {status}")
    print(f"  {program['title']}")
    if program['description']:
        print(f"  {program['description'][:60]}...")
    print()
```

### PHP

```php
<?php
function getShortEpg($server, $username, $password, $streamId, $limit = 4) {
    $url = "{$server}/player_api.php?" . http_build_query([
        'username' => $username,
        'password' => $password,
        'action' => 'get_short_epg',
        'stream_id' => $streamId,
        'limit' => $limit
    ]);

    $response = file_get_contents($url);
    return json_decode($response, true);
}

// Usage
$server = "http://server:25461";
$epg = getShortEpg($server, "demo", "test123", 123, 6);

echo "EPG Listings:\n";
foreach ($epg['epg_listings'] ?? [] as $program) {
    $start = date('H:i', $program['start_timestamp']);
    $end = date('H:i', $program['stop_timestamp']);
    $status = $program['now_playing'] == 1 ? "[NOW]" : "";

    echo "{$start} - {$end} {$status}\n";
    echo "  {$program['title']}\n";
    if ($program['description']) {
        echo "  " . substr($program['description'], 0, 60) . "...\n";
    }
    echo "\n";
}
?>
```

### JavaScript

```javascript
async function getShortEpg(server, username, password, streamId, limit = 4) {
    const url = new URL(`${server}/player_api.php`);
    url.searchParams.set('username', username);
    url.searchParams.set('password', password);
    url.searchParams.set('action', 'get_short_epg');
    url.searchParams.set('stream_id', streamId);
    url.searchParams.set('limit', limit);

    const response = await fetch(url);
    return await response.json();
}

// Usage
const server = "http://server:25461";
const epg = await getShortEpg(server, "demo", "test123", 123, 6);

console.log("EPG Listings:");
for (const program of epg.epg_listings || []) {
    const start = new Date(program.start_timestamp * 1000);
    const end = new Date(program.stop_timestamp * 1000);
    const status = program.now_playing === 1 ? "[NOW]" : "";

    const formatTime = (d) => d.toTimeString().slice(0, 5);

    console.log(`${formatTime(start)} - ${formatTime(end)} ${status}`);
    console.log(`  ${program.title}`);
    if (program.description) {
        console.log(`  ${program.description.slice(0, 60)}...`);
    }
    console.log();
}
```

## Catchup/Archive Playback

If `has_archive` is 1, you can play past programs using the timeshift endpoint:

```
http://server:25461/timeshift/{username}/{password}/{duration}/{start}/{stream_id}
```

Where:
- `duration` = program length in minutes
- `start` = program start time (format: YYYY-MM-DD:HH-MM)
