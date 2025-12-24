---
sidebar_position: 6
title: Get VOD Streams
description: Get list of movies/VOD content
---

# Get VOD Streams

Returns a list of movies/VOD content available to the user.

## Endpoint

```
GET /player_api.php?action=get_vod_streams
```

## Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `username` | string | Yes | User's login username |
| `password` | string | Yes | User's login password |
| `action` | string | Yes | Must be `get_vod_streams` |
| `category_id` | string | No | Filter by category ID |

## Response

```json
[
  {
    "num": 1,
    "name": "The Matrix",
    "stream_type": "movie",
    "stream_id": 456,
    "stream_icon": "http://example.com/posters/matrix.jpg",
    "rating": "8.7",
    "rating_5based": 4.35,
    "added": "1609459200",
    "category_id": "10",
    "container_extension": "mkv",
    "custom_sid": "",
    "direct_source": ""
  },
  {
    "num": 2,
    "name": "Inception",
    "stream_type": "movie",
    "stream_id": 457,
    "stream_icon": "http://example.com/posters/inception.jpg",
    "rating": "8.8",
    "rating_5based": 4.4,
    "added": "1609459200",
    "category_id": "10",
    "container_extension": "mp4",
    "custom_sid": "",
    "direct_source": ""
  }
]
```

### Response Fields

| Field | Type | Description |
|-------|------|-------------|
| `num` | integer | Item number/order |
| `name` | string | Movie title |
| `stream_type` | string | Always "movie" for VOD |
| `stream_id` | integer | Unique stream identifier |
| `stream_icon` | string | URL to movie poster |
| `rating` | string | Rating out of 10 |
| `rating_5based` | float | Rating converted to 5-star scale |
| `added` | string | Timestamp when added |
| `category_id` | string | Category this movie belongs to |
| `container_extension` | string | File format (mp4, mkv, avi, etc.) |
| `custom_sid` | string | Custom service ID |
| `direct_source` | string | Direct source URL (if enabled) |

## Stream URL Format

To play a movie, construct the URL:

```
http://server:25461/movie/{username}/{password}/{stream_id}.{container_extension}
```

## Code Examples

### cURL

```bash
# Get all movies
curl -X GET "http://server:25461/player_api.php?username=demo&password=test123&action=get_vod_streams"

# Get movies by category
curl -X GET "http://server:25461/player_api.php?username=demo&password=test123&action=get_vod_streams&category_id=10"
```

### Python

```python
import requests

def get_vod_streams(server, username, password, category_id=None):
    """Get VOD/movie list."""
    params = {
        "username": username,
        "password": password,
        "action": "get_vod_streams"
    }
    if category_id:
        params["category_id"] = category_id

    response = requests.get(f"{server}/player_api.php", params=params)
    return response.json()

def get_movie_url(server, username, password, stream_id, extension):
    """Generate movie URL."""
    return f"{server}/movie/{username}/{password}/{stream_id}.{extension}"

# Usage
server = "http://server:25461"
movies = get_vod_streams(server, "demo", "test123", category_id="10")

for movie in movies[:5]:
    url = get_movie_url(server, "demo", "test123",
                        movie['stream_id'], movie['container_extension'])
    print(f"{movie['name']} ({movie['rating']}/10): {url}")
```

### PHP

```php
<?php
function getVodStreams($server, $username, $password, $categoryId = null) {
    $params = [
        'username' => $username,
        'password' => $password,
        'action' => 'get_vod_streams'
    ];
    if ($categoryId) {
        $params['category_id'] = $categoryId;
    }

    $url = "{$server}/player_api.php?" . http_build_query($params);
    $response = file_get_contents($url);
    return json_decode($response, true);
}

function getMovieUrl($server, $username, $password, $streamId, $extension) {
    return "{$server}/movie/{$username}/{$password}/{$streamId}.{$extension}";
}

// Usage
$server = "http://server:25461";
$movies = getVodStreams($server, "demo", "test123", "10");

foreach (array_slice($movies, 0, 5) as $movie) {
    $url = getMovieUrl($server, "demo", "test123",
                       $movie['stream_id'], $movie['container_extension']);
    echo "{$movie['name']} ({$movie['rating']}/10): {$url}\n";
}
?>
```

### JavaScript

```javascript
async function getVodStreams(server, username, password, categoryId = null) {
    const url = new URL(`${server}/player_api.php`);
    url.searchParams.set('username', username);
    url.searchParams.set('password', password);
    url.searchParams.set('action', 'get_vod_streams');
    if (categoryId) {
        url.searchParams.set('category_id', categoryId);
    }

    const response = await fetch(url);
    return await response.json();
}

function getMovieUrl(server, username, password, streamId, extension) {
    return `${server}/movie/${username}/${password}/${streamId}.${extension}`;
}

// Usage
const server = "http://server:25461";
const movies = await getVodStreams(server, "demo", "test123", "10");

movies.slice(0, 5).forEach(movie => {
    const url = getMovieUrl(server, "demo", "test123",
                            movie.stream_id, movie.container_extension);
    console.log(`${movie.name} (${movie.rating}/10): ${url}`);
});
```
