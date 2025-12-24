---
sidebar_position: 2
title: MAG Authentication
description: Handshake and token authentication
---

# MAG Authentication

## Handshake

Initial device authentication to obtain a session token.

### Endpoint

```
GET /portal.php?type=stb&action=handshake&mac={mac_address}
```

### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `mac` | string | Yes | Device MAC address |
| `sn` | string | No | Serial number |
| `stb_type` | string | No | Device model |

### Response

```json
{
  "js": {
    "token": "A1B2C3D4E5F6789012345678"
  }
}
```

## Using the Token

Include in all subsequent requests:

```bash
curl "http://server:25461/portal.php?type=stb&action=get_profile" \
  -H "Authorization: Bearer A1B2C3D4E5F6789012345678" \
  -H "Cookie: mac=00:1A:79:XX:XX:XX"
```

## Get Profile

```
GET /portal.php?type=stb&action=get_profile
```

Returns device profile and settings.
