---
sidebar_position: 2
title: Get Full Data
description: Get complete user data, categories, and channels
---

# Get Full Data

Returns comprehensive data including user info, server info, all categories, and available channels in a single request.

## Endpoint

```
GET /panel_api.php
```

## Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `username` | string | Yes | User's login username |
| `password` | string | Yes | User's login password |

## Response

```json
{
  "user_info": {
    "username": "demo",
    "password": "test123",
    "message": "",
    "auth": 1,
    "status": "Active",
    "exp_date": "1735689600",
    "is_trial": "0",
    "active_cons": "1",
    "created_at": "1609459200",
    "max_connections": "2",
    "allowed_output_formats": ["ts", "m3u8"]
  },
  "server_info": {
    "url": "http://server.example.com",
    "port": "25461",
    "https_port": "25463",
    "server_protocol": "http",
    "rtmp_port": "25462",
    "timezone": "Europe/London",
    "timestamp_now": 1735084800,
    "time_now": "2025-12-24 12:00:00"
  },
  "categories": {
    "live": [
      {"category_id": "1", "category_name": "Sports", "parent_id": 0},
      {"category_id": "2", "category_name": "News", "parent_id": 0}
    ],
    "movie": [
      {"category_id": "10", "category_name": "Action", "parent_id": 0},
      {"category_id": "11", "category_name": "Comedy", "parent_id": 0}
    ],
    "series": [
      {"category_id": "20", "category_name": "Drama", "parent_id": 0}
    ]
  },
  "available_channels": [
    {
      "num": 1,
      "name": "BBC One HD",
      "stream_type": "live",
      "stream_id": 123,
      "stream_icon": "http://example.com/icons/bbc1.png",
      "epg_channel_id": "bbc.one.uk",
      "added": "1609459200",
      "category_id": "1",
      "tv_archive": 1,
      "tv_archive_duration": 7
    }
  ]
}
```

## Code Examples

### cURL

```bash
curl -X GET "http://server:25461/panel_api.php?username=demo&password=test123"
```

### Python

```python
import requests

def get_panel_data(server, username, password):
    """Get full panel data."""
    response = requests.get(f"{server}/panel_api.php", params={
        "username": username,
        "password": password
    })
    return response.json()

# Usage
server = "http://server:25461"
data = get_panel_data(server, "demo", "test123")

print(f"User: {data['user_info']['username']}")
print(f"Status: {data['user_info']['status']}")
print(f"Live Categories: {len(data['categories']['live'])}")
print(f"VOD Categories: {len(data['categories']['movie'])}")
print(f"Available Channels: {len(data['available_channels'])}")
```

### PHP

```php
<?php
function getPanelData($server, $username, $password) {
    $url = "{$server}/panel_api.php?" . http_build_query([
        'username' => $username,
        'password' => $password
    ]);

    $response = file_get_contents($url);
    return json_decode($response, true);
}

// Usage
$data = getPanelData("http://server:25461", "demo", "test123");

echo "User: {$data['user_info']['username']}\n";
echo "Status: {$data['user_info']['status']}\n";
echo "Live Categories: " . count($data['categories']['live']) . "\n";
echo "VOD Categories: " . count($data['categories']['movie']) . "\n";
echo "Available Channels: " . count($data['available_channels']) . "\n";
?>
```

### JavaScript

```javascript
async function getPanelData(server, username, password) {
    const url = new URL(`${server}/panel_api.php`);
    url.searchParams.set('username', username);
    url.searchParams.set('password', password);

    const response = await fetch(url);
    return await response.json();
}

// Usage
const data = await getPanelData("http://server:25461", "demo", "test123");

console.log(`User: ${data.user_info.username}`);
console.log(`Status: ${data.user_info.status}`);
console.log(`Live Categories: ${data.categories.live.length}`);
console.log(`VOD Categories: ${data.categories.movie.length}`);
console.log(`Available Channels: ${data.available_channels.length}`);
```
