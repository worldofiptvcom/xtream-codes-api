---
sidebar_position: 5
title: Get VOD Categories
description: Get list of VOD/movie categories
---

# Get VOD Categories

Returns a list of all VOD (Video on Demand) / movie categories available to the user.

## Endpoint

```
GET /player_api.php?action=get_vod_categories
```

## Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `username` | string | Yes | User's login username |
| `password` | string | Yes | User's login password |
| `action` | string | Yes | Must be `get_vod_categories` |

## Response

```json
[
  {
    "category_id": "10",
    "category_name": "Action",
    "parent_id": 0
  },
  {
    "category_id": "11",
    "category_name": "Comedy",
    "parent_id": 0
  },
  {
    "category_id": "12",
    "category_name": "Drama",
    "parent_id": 0
  },
  {
    "category_id": "13",
    "category_name": "Horror",
    "parent_id": 0
  }
]
```

### Response Fields

| Field | Type | Description |
|-------|------|-------------|
| `category_id` | string | Unique category identifier |
| `category_name` | string | Display name of the category |
| `parent_id` | integer | Parent category ID (0 = top level) |

## Code Examples

### cURL

```bash
curl -X GET "http://server:25461/player_api.php?username=demo&password=test123&action=get_vod_categories"
```

### Python

```python
import requests

def get_vod_categories(server, username, password):
    """Get all VOD categories."""
    response = requests.get(f"{server}/player_api.php", params={
        "username": username,
        "password": password,
        "action": "get_vod_categories"
    })
    return response.json()

# Usage
server = "http://server:25461"
categories = get_vod_categories(server, "demo", "test123")

for category in categories:
    print(f"[{category['category_id']}] {category['category_name']}")
```

### PHP

```php
<?php
function getVodCategories($server, $username, $password) {
    $url = "{$server}/player_api.php?" . http_build_query([
        'username' => $username,
        'password' => $password,
        'action' => 'get_vod_categories'
    ]);

    $response = file_get_contents($url);
    return json_decode($response, true);
}

// Usage
$server = "http://server:25461";
$categories = getVodCategories($server, "demo", "test123");

foreach ($categories as $category) {
    echo "[{$category['category_id']}] {$category['category_name']}\n";
}
?>
```

### JavaScript

```javascript
async function getVodCategories(server, username, password) {
    const url = new URL(`${server}/player_api.php`);
    url.searchParams.set('username', username);
    url.searchParams.set('password', password);
    url.searchParams.set('action', 'get_vod_categories');

    const response = await fetch(url);
    return await response.json();
}

// Usage
const server = "http://server:25461";
const categories = await getVodCategories(server, "demo", "test123");

categories.forEach(category => {
    console.log(`[${category.category_id}] ${category.category_name}`);
});
```
