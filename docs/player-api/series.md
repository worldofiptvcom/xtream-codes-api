---
sidebar_position: 9
title: Get Series
description: Get list of TV series
---

# Get Series

Returns a list of TV series available to the user.

## Endpoint

```
GET /player_api.php?action=get_series
```

## Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `username` | string | Yes | User's login username |
| `password` | string | Yes | User's login password |
| `action` | string | Yes | Must be `get_series` |
| `category_id` | string | No | Filter by category ID |

## Response

```json
[
  {
    "num": 1,
    "name": "Breaking Bad",
    "series_id": 789,
    "cover": "http://example.com/covers/breaking_bad.jpg",
    "plot": "A high school chemistry teacher diagnosed with cancer...",
    "cast": "Bryan Cranston, Aaron Paul, Anna Gunn",
    "director": "Vince Gilligan",
    "genre": "Crime, Drama, Thriller",
    "releaseDate": "2008-01-20",
    "last_modified": "1609459200",
    "rating": "9.5",
    "rating_5based": 4.75,
    "backdrop_path": ["http://example.com/backdrops/bb1.jpg"],
    "youtube_trailer": "HhesaQXLuRY",
    "episode_run_time": "47",
    "category_id": "20"
  }
]
```

### Response Fields

| Field | Type | Description |
|-------|------|-------------|
| `num` | integer | Item number/order |
| `name` | string | Series title |
| `series_id` | integer | Unique series identifier |
| `cover` | string | URL to series cover image |
| `plot` | string | Series description |
| `cast` | string | Main cast members |
| `director` | string | Director(s)/Creator(s) |
| `genre` | string | Series genres |
| `releaseDate` | string | First air date |
| `last_modified` | string | Last update timestamp |
| `rating` | string | Rating out of 10 |
| `rating_5based` | float | Rating on 5-star scale |
| `backdrop_path` | array | URLs to backdrop images |
| `youtube_trailer` | string | YouTube trailer video ID |
| `episode_run_time` | string | Episode length in minutes |
| `category_id` | string | Category ID |

## Code Examples

### cURL

```bash
# Get all series
curl -X GET "http://server:25461/player_api.php?username=demo&password=test123&action=get_series"

# Get series by category
curl -X GET "http://server:25461/player_api.php?username=demo&password=test123&action=get_series&category_id=20"
```

### Python

```python
import requests

def get_series(server, username, password, category_id=None):
    """Get TV series list."""
    params = {
        "username": username,
        "password": password,
        "action": "get_series"
    }
    if category_id:
        params["category_id"] = category_id

    response = requests.get(f"{server}/player_api.php", params=params)
    return response.json()

# Usage
server = "http://server:25461"
series_list = get_series(server, "demo", "test123")

for series in series_list[:5]:
    print(f"{series['name']} ({series['rating']}/10) - {series['genre']}")
```

### PHP

```php
<?php
function getSeries($server, $username, $password, $categoryId = null) {
    $params = [
        'username' => $username,
        'password' => $password,
        'action' => 'get_series'
    ];
    if ($categoryId) {
        $params['category_id'] = $categoryId;
    }

    $url = "{$server}/player_api.php?" . http_build_query($params);
    $response = file_get_contents($url);
    return json_decode($response, true);
}

// Usage
$seriesList = getSeries("http://server:25461", "demo", "test123");

foreach (array_slice($seriesList, 0, 5) as $series) {
    echo "{$series['name']} ({$series['rating']}/10) - {$series['genre']}\n";
}
?>
```

### JavaScript

```javascript
async function getSeries(server, username, password, categoryId = null) {
    const url = new URL(`${server}/player_api.php`);
    url.searchParams.set('username', username);
    url.searchParams.set('password', password);
    url.searchParams.set('action', 'get_series');
    if (categoryId) {
        url.searchParams.set('category_id', categoryId);
    }

    const response = await fetch(url);
    return await response.json();
}

// Usage
const seriesList = await getSeries("http://server:25461", "demo", "test123");
seriesList.slice(0, 5).forEach(series => {
    console.log(`${series.name} (${series.rating}/10) - ${series.genre}`);
});
```
