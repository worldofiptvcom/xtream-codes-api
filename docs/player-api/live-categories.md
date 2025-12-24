---
sidebar_position: 3
title: Get Live Categories
description: Get list of live TV categories
---

# Get Live Categories

Returns a list of all live TV categories available to the user.

## Endpoint

```
GET /player_api.php?action=get_live_categories
```

## Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `username` | string | Yes | User's login username |
| `password` | string | Yes | User's login password |
| `action` | string | Yes | Must be `get_live_categories` |

## Response

```json
[
  {
    "category_id": "1",
    "category_name": "Sports",
    "parent_id": 0
  },
  {
    "category_id": "2",
    "category_name": "News",
    "parent_id": 0
  },
  {
    "category_id": "3",
    "category_name": "Entertainment",
    "parent_id": 0
  },
  {
    "category_id": "4",
    "category_name": "Kids",
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
curl -X GET "http://server:25461/player_api.php?username=demo&password=test123&action=get_live_categories"
```

### Python

```python
import requests

def get_live_categories(server, username, password):
    """Get all live TV categories."""
    response = requests.get(f"{server}/player_api.php", params={
        "username": username,
        "password": password,
        "action": "get_live_categories"
    })
    return response.json()

# Usage
server = "http://server:25461"
categories = get_live_categories(server, "demo", "test123")

for category in categories:
    print(f"[{category['category_id']}] {category['category_name']}")
```

### PHP

```php
<?php
function getLiveCategories($server, $username, $password) {
    $url = "{$server}/player_api.php?" . http_build_query([
        'username' => $username,
        'password' => $password,
        'action' => 'get_live_categories'
    ]);

    $response = file_get_contents($url);
    return json_decode($response, true);
}

// Usage
$server = "http://server:25461";
$categories = getLiveCategories($server, "demo", "test123");

foreach ($categories as $category) {
    echo "[{$category['category_id']}] {$category['category_name']}\n";
}
?>
```

### JavaScript

```javascript
async function getLiveCategories(server, username, password) {
    const url = new URL(`${server}/player_api.php`);
    url.searchParams.set('username', username);
    url.searchParams.set('password', password);
    url.searchParams.set('action', 'get_live_categories');

    const response = await fetch(url);
    return await response.json();
}

// Usage
const server = "http://server:25461";
const categories = await getLiveCategories(server, "demo", "test123");

categories.forEach(category => {
    console.log(`[${category.category_id}] ${category.category_name}`);
});
```

## Notes

- Categories are filtered based on user's bouquet assignments
- Only categories containing channels the user can access are returned
- The `parent_id` can be used to build hierarchical category structures
