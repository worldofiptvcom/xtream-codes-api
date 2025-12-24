---
sidebar_position: 10
title: Get Series Info
description: Get detailed series information with seasons and episodes
---

# Get Series Info

Returns detailed information about a TV series including all seasons and episodes.

## Endpoint

```
GET /player_api.php?action=get_series_info
```

## Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `username` | string | Yes | User's login username |
| `password` | string | Yes | User's login password |
| `action` | string | Yes | Must be `get_series_info` |
| `series_id` | integer | Yes | Series ID |

## Response

```json
{
  "seasons": [
    {
      "air_date": "2008-01-20",
      "episode_count": 7,
      "id": 1,
      "name": "Season 1",
      "overview": "High school chemistry teacher Walter White...",
      "season_number": 1,
      "cover": "http://example.com/seasons/bb_s1.jpg",
      "cover_big": "http://example.com/seasons/bb_s1_big.jpg"
    },
    {
      "air_date": "2009-03-08",
      "episode_count": 13,
      "id": 2,
      "name": "Season 2",
      "overview": "Walt and Jesse realize how dire their situation is...",
      "season_number": 2,
      "cover": "http://example.com/seasons/bb_s2.jpg",
      "cover_big": "http://example.com/seasons/bb_s2_big.jpg"
    }
  ],
  "info": {
    "name": "Breaking Bad",
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
  },
  "episodes": {
    "1": [
      {
        "id": "1001",
        "episode_num": 1,
        "title": "Pilot",
        "container_extension": "mkv",
        "info": {
          "movie_image": "http://example.com/episodes/bb_s1e1.jpg",
          "plot": "Walter White, a struggling high school chemistry teacher...",
          "releasedate": "2008-01-20",
          "rating": "9.0",
          "duration_secs": 3480,
          "duration": "00:58:00"
        },
        "custom_sid": "",
        "added": "1609459200",
        "season": 1,
        "direct_source": ""
      },
      {
        "id": "1002",
        "episode_num": 2,
        "title": "Cat's in the Bag...",
        "container_extension": "mkv",
        "info": {
          "movie_image": "http://example.com/episodes/bb_s1e2.jpg",
          "plot": "Walt and Jesse attempt to deal with the bodies...",
          "releasedate": "2008-01-27",
          "rating": "8.8",
          "duration_secs": 2880,
          "duration": "00:48:00"
        },
        "custom_sid": "",
        "added": "1609459200",
        "season": 1,
        "direct_source": ""
      }
    ]
  }
}
```

### Response Fields

#### seasons Array

| Field | Type | Description |
|-------|------|-------------|
| `air_date` | string | Season premiere date |
| `episode_count` | integer | Number of episodes |
| `id` | integer | Season ID |
| `name` | string | Season name |
| `overview` | string | Season description |
| `season_number` | integer | Season number |
| `cover` | string | Season cover image URL |
| `cover_big` | string | Large season cover URL |

#### episodes Object

Episodes are organized by season number as keys. Each episode contains:

| Field | Type | Description |
|-------|------|-------------|
| `id` | string | Episode stream ID |
| `episode_num` | integer | Episode number |
| `title` | string | Episode title |
| `container_extension` | string | File format |
| `info` | object | Episode metadata |
| `added` | string | Timestamp when added |
| `season` | integer | Season number |

## Episode Stream URL

To play an episode, construct the URL:

```
http://server:25461/series/{username}/{password}/{episode_id}.{container_extension}
```

## Code Examples

### cURL

```bash
curl -X GET "http://server:25461/player_api.php?username=demo&password=test123&action=get_series_info&series_id=789"
```

### Python

```python
import requests

def get_series_info(server, username, password, series_id):
    """Get detailed series information with episodes."""
    response = requests.get(f"{server}/player_api.php", params={
        "username": username,
        "password": password,
        "action": "get_series_info",
        "series_id": series_id
    })
    return response.json()

def get_episode_url(server, username, password, episode_id, extension):
    """Generate episode stream URL."""
    return f"{server}/series/{username}/{password}/{episode_id}.{extension}"

# Usage
server = "http://server:25461"
series = get_series_info(server, "demo", "test123", 789)

print(f"Series: {series['info']['name']}")
print(f"Rating: {series['info']['rating']}/10")
print(f"Seasons: {len(series['seasons'])}")

# List all episodes
for season_num, episodes in series['episodes'].items():
    print(f"\n--- Season {season_num} ---")
    for ep in episodes:
        url = get_episode_url(server, "demo", "test123",
                              ep['id'], ep['container_extension'])
        print(f"  E{ep['episode_num']}: {ep['title']}")
        print(f"    Duration: {ep['info']['duration']}")
        print(f"    URL: {url}")
```

### PHP

```php
<?php
function getSeriesInfo($server, $username, $password, $seriesId) {
    $url = "{$server}/player_api.php?" . http_build_query([
        'username' => $username,
        'password' => $password,
        'action' => 'get_series_info',
        'series_id' => $seriesId
    ]);

    $response = file_get_contents($url);
    return json_decode($response, true);
}

function getEpisodeUrl($server, $username, $password, $episodeId, $extension) {
    return "{$server}/series/{$username}/{$password}/{$episodeId}.{$extension}";
}

// Usage
$server = "http://server:25461";
$series = getSeriesInfo($server, "demo", "test123", 789);

echo "Series: {$series['info']['name']}\n";
echo "Rating: {$series['info']['rating']}/10\n";
echo "Seasons: " . count($series['seasons']) . "\n";

foreach ($series['episodes'] as $seasonNum => $episodes) {
    echo "\n--- Season {$seasonNum} ---\n";
    foreach ($episodes as $ep) {
        $url = getEpisodeUrl($server, "demo", "test123",
                             $ep['id'], $ep['container_extension']);
        echo "  E{$ep['episode_num']}: {$ep['title']}\n";
        echo "    Duration: {$ep['info']['duration']}\n";
        echo "    URL: {$url}\n";
    }
}
?>
```

### JavaScript

```javascript
async function getSeriesInfo(server, username, password, seriesId) {
    const url = new URL(`${server}/player_api.php`);
    url.searchParams.set('username', username);
    url.searchParams.set('password', password);
    url.searchParams.set('action', 'get_series_info');
    url.searchParams.set('series_id', seriesId);

    const response = await fetch(url);
    return await response.json();
}

function getEpisodeUrl(server, username, password, episodeId, extension) {
    return `${server}/series/${username}/${password}/${episodeId}.${extension}`;
}

// Usage
const server = "http://server:25461";
const series = await getSeriesInfo(server, "demo", "test123", 789);

console.log(`Series: ${series.info.name}`);
console.log(`Rating: ${series.info.rating}/10`);
console.log(`Seasons: ${series.seasons.length}`);

for (const [seasonNum, episodes] of Object.entries(series.episodes)) {
    console.log(`\n--- Season ${seasonNum} ---`);
    for (const ep of episodes) {
        const url = getEpisodeUrl(server, "demo", "test123",
                                  ep.id, ep.container_extension);
        console.log(`  E${ep.episode_num}: ${ep.title}`);
        console.log(`    Duration: ${ep.info.duration}`);
        console.log(`    URL: ${url}`);
    }
}
```
