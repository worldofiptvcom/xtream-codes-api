---
sidebar_position: 3
title: Get EPG
description: Get EPG data via Panel API
---

# Get EPG

Returns EPG data for a specific stream via the Panel API.

## Endpoint

```
GET /panel_api.php?action=get_epg
```

## Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `username` | string | Yes | User's login username |
| `password` | string | Yes | User's login password |
| `action` | string | Yes | Must be `get_epg` |
| `stream_id` | integer | Yes | Live stream ID |

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
      "description": "The latest news and updates.",
      "channel_id": "bbc.one.uk"
    }
  ]
}
```

## Code Examples

### cURL

```bash
curl -X GET "http://server:25461/panel_api.php?username=demo&password=test123&action=get_epg&stream_id=123"
```

### Python

```python
import requests

def get_epg(server, username, password, stream_id):
    response = requests.get(f"{server}/panel_api.php", params={
        "username": username,
        "password": password,
        "action": "get_epg",
        "stream_id": stream_id
    })
    return response.json()

# Usage
epg = get_epg("http://server:25461", "demo", "test123", 123)
for program in epg.get('epg_listings', []):
    print(f"{program['start']} - {program['title']}")
```
