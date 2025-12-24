---
sidebar_position: 7
title: Get VOD Info
description: Get detailed information about a movie
---

# Get VOD Info

Returns detailed information about a specific movie, including metadata, cast, and plot.

## Endpoint

```
GET /player_api.php?action=get_vod_info
```

## Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `username` | string | Yes | User's login username |
| `password` | string | Yes | User's login password |
| `action` | string | Yes | Must be `get_vod_info` |
| `vod_id` | integer | Yes | Movie/VOD stream ID |

## Response

```json
{
  "info": {
    "movie_image": "http://example.com/posters/matrix.jpg",
    "tmdb_id": "603",
    "backdrop_path": [
      "http://example.com/backdrops/matrix1.jpg",
      "http://example.com/backdrops/matrix2.jpg"
    ],
    "youtube_trailer": "vKQi3bBA1y8",
    "genre": "Action, Sci-Fi",
    "plot": "A computer hacker learns about the true nature of reality...",
    "cast": "Keanu Reeves, Laurence Fishburne, Carrie-Anne Moss",
    "rating": "8.7",
    "director": "Lana Wachowski, Lilly Wachowski",
    "releasedate": "1999-03-31",
    "duration_secs": 8160,
    "duration": "02:16:00",
    "video": {
      "codec_name": "h264",
      "width": 1920,
      "height": 1080
    },
    "audio": {
      "codec_name": "aac",
      "channels": 6
    },
    "bitrate": 5000
  },
  "movie_data": {
    "stream_id": 456,
    "name": "The Matrix",
    "added": "1609459200",
    "category_id": "10",
    "container_extension": "mkv",
    "custom_sid": "",
    "direct_source": ""
  }
}
```

### Response Fields

#### info Object

| Field | Type | Description |
|-------|------|-------------|
| `movie_image` | string | URL to movie poster |
| `tmdb_id` | string | TheMovieDB identifier |
| `backdrop_path` | array | URLs to backdrop images |
| `youtube_trailer` | string | YouTube video ID for trailer |
| `genre` | string | Movie genres |
| `plot` | string | Movie description/synopsis |
| `cast` | string | Cast members |
| `rating` | string | Rating out of 10 |
| `director` | string | Director(s) |
| `releasedate` | string | Release date |
| `duration_secs` | integer | Duration in seconds |
| `duration` | string | Formatted duration (HH:MM:SS) |
| `video` | object | Video codec information |
| `audio` | object | Audio codec information |
| `bitrate` | integer | Video bitrate in kbps |

#### movie_data Object

| Field | Type | Description |
|-------|------|-------------|
| `stream_id` | integer | Unique stream identifier |
| `name` | string | Movie title |
| `added` | string | Timestamp when added |
| `category_id` | string | Category ID |
| `container_extension` | string | File format |
| `custom_sid` | string | Custom service ID |
| `direct_source` | string | Direct source URL |

## Code Examples

### cURL

```bash
curl -X GET "http://server:25461/player_api.php?username=demo&password=test123&action=get_vod_info&vod_id=456"
```

### Python

```python
import requests

def get_vod_info(server, username, password, vod_id):
    """Get detailed movie information."""
    response = requests.get(f"{server}/player_api.php", params={
        "username": username,
        "password": password,
        "action": "get_vod_info",
        "vod_id": vod_id
    })
    return response.json()

# Usage
server = "http://server:25461"
movie = get_vod_info(server, "demo", "test123", 456)

info = movie['info']
data = movie['movie_data']

print(f"Title: {data['name']}")
print(f"Rating: {info['rating']}/10")
print(f"Duration: {info['duration']}")
print(f"Genre: {info['genre']}")
print(f"Director: {info['director']}")
print(f"Cast: {info['cast']}")
print(f"\nPlot: {info['plot']}")

# Generate play URL
play_url = f"{server}/movie/demo/test123/{data['stream_id']}.{data['container_extension']}"
print(f"\nPlay URL: {play_url}")

# Trailer URL
if info.get('youtube_trailer'):
    print(f"Trailer: https://www.youtube.com/watch?v={info['youtube_trailer']}")
```

### PHP

```php
<?php
function getVodInfo($server, $username, $password, $vodId) {
    $url = "{$server}/player_api.php?" . http_build_query([
        'username' => $username,
        'password' => $password,
        'action' => 'get_vod_info',
        'vod_id' => $vodId
    ]);

    $response = file_get_contents($url);
    return json_decode($response, true);
}

// Usage
$server = "http://server:25461";
$movie = getVodInfo($server, "demo", "test123", 456);

$info = $movie['info'];
$data = $movie['movie_data'];

echo "Title: {$data['name']}\n";
echo "Rating: {$info['rating']}/10\n";
echo "Duration: {$info['duration']}\n";
echo "Genre: {$info['genre']}\n";
echo "Director: {$info['director']}\n";
echo "Cast: {$info['cast']}\n";
echo "\nPlot: {$info['plot']}\n";

// Generate play URL
$playUrl = "{$server}/movie/demo/test123/{$data['stream_id']}.{$data['container_extension']}";
echo "\nPlay URL: {$playUrl}\n";
?>
```

### JavaScript

```javascript
async function getVodInfo(server, username, password, vodId) {
    const url = new URL(`${server}/player_api.php`);
    url.searchParams.set('username', username);
    url.searchParams.set('password', password);
    url.searchParams.set('action', 'get_vod_info');
    url.searchParams.set('vod_id', vodId);

    const response = await fetch(url);
    return await response.json();
}

// Usage
const server = "http://server:25461";
const movie = await getVodInfo(server, "demo", "test123", 456);

const { info, movie_data: data } = movie;

console.log(`Title: ${data.name}`);
console.log(`Rating: ${info.rating}/10`);
console.log(`Duration: ${info.duration}`);
console.log(`Genre: ${info.genre}`);
console.log(`Director: ${info.director}`);
console.log(`Cast: ${info.cast}`);
console.log(`\nPlot: ${info.plot}`);

// Generate play URL
const playUrl = `${server}/movie/demo/test123/${data.stream_id}.${data.container_extension}`;
console.log(`\nPlay URL: ${playUrl}`);

// Trailer URL
if (info.youtube_trailer) {
    console.log(`Trailer: https://www.youtube.com/watch?v=${info.youtube_trailer}`);
}
```

## Notes

- The `tmdb_id` can be used to fetch additional data from TheMovieDB API
- Video/audio codec information is useful for player compatibility checks
- The `backdrop_path` array contains multiple backdrop images for UI purposes
