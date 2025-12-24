---
sidebar_position: 8
title: Get Series Categories
description: Get list of TV series categories
---

# Get Series Categories

Returns a list of all TV series categories available to the user.

## Endpoint

```
GET /player_api.php?action=get_series_categories
```

## Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `username` | string | Yes | User's login username |
| `password` | string | Yes | User's login password |
| `action` | string | Yes | Must be `get_series_categories` |

## Response

```json
[
  {
    "category_id": "20",
    "category_name": "Drama",
    "parent_id": 0
  },
  {
    "category_id": "21",
    "category_name": "Comedy",
    "parent_id": 0
  },
  {
    "category_id": "22",
    "category_name": "Sci-Fi",
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
curl -X GET "http://server:25461/player_api.php?username=demo&password=test123&action=get_series_categories"
```

### Python

```python
import requests

def get_series_categories(server, username, password):
    """Get all series categories."""
    response = requests.get(f"{server}/player_api.php", params={
        "username": username,
        "password": password,
        "action": "get_series_categories"
    })
    return response.json()

# Usage
server = "http://server:25461"
categories = get_series_categories(server, "demo", "test123")

for category in categories:
    print(f"[{category['category_id']}] {category['category_name']}")
```

### PHP

```php
<?php
function getSeriesCategories($server, $username, $password) {
    $url = "{$server}/player_api.php?" . http_build_query([
        'username' => $username,
        'password' => $password,
        'action' => 'get_series_categories'
    ]);

    $response = file_get_contents($url);
    return json_decode($response, true);
}

// Usage
$categories = getSeriesCategories("http://server:25461", "demo", "test123");

foreach ($categories as $category) {
    echo "[{$category['category_id']}] {$category['category_name']}\n";
}
?>
```

### JavaScript

```javascript
async function getSeriesCategories(server, username, password) {
    const url = new URL(`${server}/player_api.php`);
    url.searchParams.set('username', username);
    url.searchParams.set('password', password);
    url.searchParams.set('action', 'get_series_categories');

    const response = await fetch(url);
    return await response.json();
}

// Usage
const categories = await getSeriesCategories("http://server:25461", "demo", "test123");
categories.forEach(cat => console.log(`[${cat.category_id}] ${cat.category_name}`));
```
