---
sidebar_position: 2
title: Get User Info
description: Get authenticated user information and server details
---

# Get User Info

Returns user account information and server details. This is the default action when no `action` parameter is provided.

## Endpoint

```
GET /player_api.php
```

## Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `username` | string | Yes | User's login username |
| `password` | string | Yes | User's login password |

## Response

### Success Response

```json
{
  "user_info": {
    "username": "demo",
    "password": "test123",
    "message": "Welcome to our service!",
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
  }
}
```

### Response Fields

#### user_info

| Field | Type | Description |
|-------|------|-------------|
| `username` | string | User's username |
| `password` | string | User's password |
| `message` | string | Welcome message from provider |
| `auth` | integer | 1 = authenticated, 0 = failed |
| `status` | string | Account status (Active, Expired, Banned, Disabled) |
| `exp_date` | string | Expiration timestamp (null = never expires) |
| `is_trial` | string | "1" = trial account, "0" = paid |
| `active_cons` | string | Current active connections |
| `created_at` | string | Account creation timestamp |
| `max_connections` | string | Maximum allowed connections |
| `allowed_output_formats` | array | Allowed stream formats |

#### server_info

| Field | Type | Description |
|-------|------|-------------|
| `url` | string | Server base URL |
| `port` | string | HTTP port |
| `https_port` | string | HTTPS port |
| `server_protocol` | string | Protocol (http/https) |
| `rtmp_port` | string | RTMP streaming port |
| `timezone` | string | Server timezone |
| `timestamp_now` | integer | Current Unix timestamp |
| `time_now` | string | Current formatted time |

## Code Examples

### cURL

```bash
curl -X GET "http://server:25461/player_api.php?username=demo&password=test123"
```

### Python

```python
import requests

def get_user_info(server, username, password):
    """Get user information and server details."""
    response = requests.get(f"{server}/player_api.php", params={
        "username": username,
        "password": password
    })
    return response.json()

# Usage
server = "http://server:25461"
data = get_user_info(server, "demo", "test123")

if data["user_info"]["auth"] == 1:
    print(f"Status: {data['user_info']['status']}")
    print(f"Expires: {data['user_info']['exp_date']}")
    print(f"Max Connections: {data['user_info']['max_connections']}")
else:
    print(f"Auth failed: {data['user_info']['status']}")
```

### PHP

```php
<?php
function getUserInfo($server, $username, $password) {
    $url = "{$server}/player_api.php?" . http_build_query([
        'username' => $username,
        'password' => $password
    ]);

    $response = file_get_contents($url);
    return json_decode($response, true);
}

// Usage
$server = "http://server:25461";
$data = getUserInfo($server, "demo", "test123");

if ($data['user_info']['auth'] == 1) {
    echo "Status: " . $data['user_info']['status'] . "\n";
    echo "Expires: " . $data['user_info']['exp_date'] . "\n";
    echo "Max Connections: " . $data['user_info']['max_connections'] . "\n";
} else {
    echo "Auth failed: " . $data['user_info']['status'] . "\n";
}
?>
```

### JavaScript

```javascript
async function getUserInfo(server, username, password) {
    const url = new URL(`${server}/player_api.php`);
    url.searchParams.set('username', username);
    url.searchParams.set('password', password);

    const response = await fetch(url);
    return await response.json();
}

// Usage
const server = "http://server:25461";
const data = await getUserInfo(server, "demo", "test123");

if (data.user_info.auth === 1) {
    console.log(`Status: ${data.user_info.status}`);
    console.log(`Expires: ${data.user_info.exp_date}`);
    console.log(`Max Connections: ${data.user_info.max_connections}`);
} else {
    console.log(`Auth failed: ${data.user_info.status}`);
}
```

## Error Responses

### Invalid Credentials

```json
{
  "user_info": {
    "auth": 0,
    "status": "Invalid",
    "message": "Invalid username or password"
  }
}
```

### Expired Account

```json
{
  "user_info": {
    "username": "demo",
    "auth": 0,
    "status": "Expired",
    "exp_date": "1609459200",
    "message": "Your subscription has expired"
  }
}
```

## Notes

- The `exp_date` field is `null` for accounts that never expire
- The `allowed_output_formats` indicates which stream formats the user can access
- Active connections (`active_cons`) updates in real-time
