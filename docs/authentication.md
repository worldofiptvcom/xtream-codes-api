---
sidebar_position: 2
title: Authentication
description: Authentication methods for Xtream Codes API
---

# Authentication

Xtream Codes supports multiple authentication methods depending on the API endpoint.

## Authentication Methods

### 1. Username/Password Authentication

**Used by:** Player API, Panel API, Streaming Endpoints, Enigma2 API, XMLTV

The most common method. Credentials are passed as query parameters.

```bash
curl "http://server:25461/player_api.php?username=demo&password=test123"
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `username` | string | Yes | User's login username |
| `password` | string | Yes | User's login password |

:::tip
Credentials are case-sensitive by default. This can be configured in panel settings.
:::

### 2. IP-Based Authentication

**Used by:** Admin API (`api.php`), System API (`system_api.php`)

The Admin API restricts access based on server IP addresses. Only requests from authorized streaming server IPs are accepted.

```php
// Server validates request IP
if (!in_array($request_ip, $authorized_server_ips)) {
    die(); // Access denied
}
```

:::warning
The Admin API cannot be accessed from arbitrary IPs. You must call it from a registered streaming server.
:::

### 3. MAC Address + Token Authentication

**Used by:** MAG Portal API (`portal.php`)

MAG devices authenticate using their MAC address and a session token.

#### Step 1: Handshake

```bash
curl "http://server:25461/portal.php?type=stb&action=handshake&mac=00:1A:79:XX:XX:XX"
```

**Response:**
```json
{
  "js": {
    "token": "A1B2C3D4E5F6789012345678"
  }
}
```

#### Step 2: Use Token in Subsequent Requests

```bash
curl "http://server:25461/portal.php?type=stb&action=get_profile" \
  -H "Authorization: Bearer A1B2C3D4E5F6789012345678" \
  -H "Cookie: mac=00:1A:79:XX:XX:XX"
```

### 4. Play Token Authentication

**Used by:** Secure HLS Streaming

For MAG devices and secure streaming, a play token validates stream access.

```bash
# Token included in stream URL
curl "http://server:25461/live/user/pass/123.ts?play_token=xyz789"
```

**Token Structure:**
```
{random_string}:{expire_timestamp}:{stream_id}
```

## Authentication Flow

```mermaid
sequenceDiagram
    participant Client
    participant Server
    participant Database

    Client->>Server: Request with username/password
    Server->>Database: Validate credentials
    Database-->>Server: User data
    Server->>Server: Check expiration
    Server->>Server: Check enabled status
    Server->>Server: Check IP restrictions
    Server->>Server: Check country restrictions
    Server-->>Client: Response (success/error)
```

## Security Checks

When authenticating, the server performs these checks in order:

| Order | Check | Error Code |
|-------|-------|------------|
| 1 | Username/password valid | `AUTH_FAILED` |
| 2 | Account not expired | `USER_EXPIRED` |
| 3 | Admin enabled | `USER_BAN` |
| 4 | User enabled | `USER_DISABLED` |
| 5 | IP in whitelist (if configured) | `IP_BAN` |
| 6 | Country allowed | `COUNTRY_DISALLOW` |
| 7 | User agent allowed | `USER_AGENT_BAN` |
| 8 | ISP allowed | `ISP_LOCK_FAILED` |
| 9 | Max connections not exceeded | `USER_ALREADY_CONNECTED` |
| 10 | Stream in user's bouquet | `NOT_IN_BOUQUET` |

## Code Examples

### cURL

```bash
# Basic authentication
curl "http://server:25461/player_api.php?username=demo&password=test123"

# With headers
curl "http://server:25461/player_api.php" \
  -G \
  -d "username=demo" \
  -d "password=test123" \
  -d "action=get_live_streams"
```

### Python

```python
import requests

def authenticate(server, username, password):
    response = requests.get(f"{server}/player_api.php", params={
        "username": username,
        "password": password
    })
    data = response.json()

    if data.get("user_info", {}).get("auth") == 1:
        return data
    else:
        raise Exception("Authentication failed")

# Usage
user_data = authenticate("http://server:25461", "demo", "test123")
print(f"Status: {user_data['user_info']['status']}")
```

### PHP

```php
<?php
function authenticate($server, $username, $password) {
    $url = "{$server}/player_api.php?" . http_build_query([
        'username' => $username,
        'password' => $password
    ]);

    $response = file_get_contents($url);
    $data = json_decode($response, true);

    if ($data['user_info']['auth'] == 1) {
        return $data;
    }
    throw new Exception("Authentication failed");
}

// Usage
$userData = authenticate("http://server:25461", "demo", "test123");
echo "Status: " . $userData['user_info']['status'];
?>
```

### JavaScript

```javascript
async function authenticate(server, username, password) {
    const url = new URL(`${server}/player_api.php`);
    url.searchParams.set('username', username);
    url.searchParams.set('password', password);

    const response = await fetch(url);
    const data = await response.json();

    if (data.user_info?.auth === 1) {
        return data;
    }
    throw new Error("Authentication failed");
}

// Usage
const userData = await authenticate("http://server:25461", "demo", "test123");
console.log(`Status: ${userData.user_info.status}`);
```

## User Status Values

| Status | Description |
|--------|-------------|
| `Active` | Account is active and valid |
| `Expired` | Account subscription has expired |
| `Disabled` | Account disabled by user |
| `Banned` | Account banned by admin |

## Best Practices

1. **Store credentials securely** - Never hardcode in client apps
2. **Use HTTPS** - Always use port 25463 for production
3. **Handle expiration** - Check `exp_date` and notify users
4. **Respect rate limits** - Max 20 requests/second per IP
5. **Cache responses** - Don't re-authenticate for every request
