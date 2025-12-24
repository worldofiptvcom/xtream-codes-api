---
sidebar_position: 3
title: Error Codes
description: HTTP status codes and error messages for Xtream Codes API
---

# Error Codes

This page documents all HTTP status codes and error messages returned by the Xtream Codes API.

## HTTP Status Codes

| Code | Status | Description |
|------|--------|-------------|
| `200` | OK | Request completed successfully |
| `206` | Partial Content | Range request for VOD streaming |
| `400` | Bad Request | Missing or invalid parameters |
| `401` | Unauthorized | Authentication failed, user expired or banned |
| `403` | Forbidden | Access denied (IP/token mismatch) |
| `404` | Not Found | Resource or file not found |
| `405` | Method Not Allowed | Output format not allowed for user |
| `406` | Not Acceptable | Stream not in user's bouquet |
| `416` | Range Not Satisfiable | Invalid range request for VOD |

## Client Log Codes

These codes are logged server-side for debugging and are sometimes included in responses.

### Authentication Errors

| Code | Description | Solution |
|------|-------------|----------|
| `AUTH_FAILED` | Invalid username or password | Verify credentials |
| `USER_EXPIRED` | User subscription has expired | Renew subscription |
| `USER_BAN` | User account banned by admin | Contact provider |
| `USER_DISABLED` | User account disabled | Contact provider |

### Connection Errors

| Code | Description | Solution |
|------|-------------|----------|
| `USER_ALREADY_CONNECTED` | Maximum connections reached | Close other sessions |
| `IP_BAN` | IP not in allowed list | Use whitelisted IP |
| `COUNTRY_DISALLOW` | Country not allowed | Use allowed country/VPN |
| `USER_AGENT_BAN` | User agent blocked | Use allowed player |
| `EMPTY_UA` | Empty user agent blocked | Set user agent header |

### Stream Errors

| Code | Description | Solution |
|------|-------------|----------|
| `NOT_IN_BOUQUET` | Stream not in user's package | Upgrade subscription |
| `USER_DISALLOW_EXT` | Output format not allowed | Use allowed format (ts/m3u8) |

### Security Errors

| Code | Description | Solution |
|------|-------------|----------|
| `ISP_LOCK_FAILED` | ISP changed from registered | Use original ISP |
| `CON_SVP` | Connection from VPN/server detected | Disable VPN |
| `CRACKED` | Known cracked IP detected | Contact provider |

### MAG/Stalker Errors

| Code | Description | Solution |
|------|-------------|----------|
| `MAG_TOKEN_INVALID` | Invalid or expired MAG token | Perform new handshake |
| `STALKER_KEY_EXPIRED` | Stalker key has expired | Refresh session |
| `STALKER_IP_MISMATCH` | IP changed during session | Reconnect from same IP |
| `STALKER_CHANNEL_MISMATCH` | Channel ID mismatch | Request new stream URL |
| `STALKER_DECRYPT_FAILED` | Failed to decrypt stalker key | Contact provider |

## Response Examples

### Successful Authentication

```json
{
  "user_info": {
    "username": "demo",
    "password": "test123",
    "auth": 1,
    "status": "Active",
    "exp_date": "1735689600",
    "is_trial": "0",
    "active_cons": "1",
    "created_at": "1609459200",
    "max_connections": "2"
  }
}
```

### Failed Authentication

```json
{
  "user_info": {
    "auth": 0,
    "status": "Expired",
    "message": "Account has expired"
  }
}
```

### Expired Account Response

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

### Banned Account Response

```json
{
  "user_info": {
    "username": "demo",
    "auth": 0,
    "status": "Banned",
    "message": "Your account has been suspended"
  }
}
```

## Handling Errors

### Python Example

```python
import requests

def make_api_request(url, params):
    response = requests.get(url, params=params)

    # Check HTTP status
    if response.status_code == 401:
        raise Exception("Authentication failed")
    elif response.status_code == 403:
        raise Exception("Access forbidden")
    elif response.status_code == 406:
        raise Exception("Stream not in bouquet")

    data = response.json()

    # Check auth status in response
    if data.get("user_info", {}).get("auth") == 0:
        status = data["user_info"].get("status", "Unknown")
        message = data["user_info"].get("message", "Authentication failed")
        raise Exception(f"{status}: {message}")

    return data
```

### JavaScript Example

```javascript
async function makeApiRequest(url, params) {
    const searchParams = new URLSearchParams(params);
    const response = await fetch(`${url}?${searchParams}`);

    // Check HTTP status
    if (response.status === 401) {
        throw new Error("Authentication failed");
    } else if (response.status === 403) {
        throw new Error("Access forbidden");
    } else if (response.status === 406) {
        throw new Error("Stream not in bouquet");
    }

    const data = await response.json();

    // Check auth status in response
    if (data.user_info?.auth === 0) {
        const status = data.user_info.status || "Unknown";
        const message = data.user_info.message || "Authentication failed";
        throw new Error(`${status}: ${message}`);
    }

    return data;
}
```

### PHP Example

```php
<?php
function makeApiRequest($url, $params) {
    $fullUrl = $url . '?' . http_build_query($params);
    $context = stream_context_create([
        'http' => ['ignore_errors' => true]
    ]);

    $response = file_get_contents($fullUrl, false, $context);
    $statusCode = (int) explode(' ', $http_response_header[0])[1];

    // Check HTTP status
    if ($statusCode === 401) {
        throw new Exception("Authentication failed");
    } elseif ($statusCode === 403) {
        throw new Exception("Access forbidden");
    } elseif ($statusCode === 406) {
        throw new Exception("Stream not in bouquet");
    }

    $data = json_decode($response, true);

    // Check auth status in response
    if (($data['user_info']['auth'] ?? 1) === 0) {
        $status = $data['user_info']['status'] ?? 'Unknown';
        $message = $data['user_info']['message'] ?? 'Authentication failed';
        throw new Exception("{$status}: {$message}");
    }

    return $data;
}
?>
```

## Flood Protection

After multiple failed authentication attempts, the IP may be temporarily blocked.

| Threshold | Action |
|-----------|--------|
| 5 failures | Warning logged |
| 10 failures | Temporary block (5 minutes) |
| 20 failures | Extended block (1 hour) |

:::tip
To avoid being blocked, implement proper error handling and don't retry failed requests immediately.
:::
