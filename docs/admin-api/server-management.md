---
sidebar_position: 2
title: Server Management
description: Server listing and management endpoints
---

# Server Management

Endpoints for managing streaming servers.

## List Servers

Returns a list of all registered streaming servers.

### Endpoint

```
GET /api.php?action=server&sub=list
```

### Response

```json
{
  "servers": [
    {
      "id": 1,
      "server_name": "Main Server",
      "server_ip": "192.168.1.1",
      "vpn_ip": null,
      "http_broadcast_port": "25461",
      "total_clients": 100,
      "status": "online"
    },
    {
      "id": 2,
      "server_name": "Backup Server",
      "server_ip": "192.168.1.2",
      "vpn_ip": null,
      "http_broadcast_port": "25461",
      "total_clients": 50,
      "status": "online"
    }
  ]
}
```

### Response Fields

| Field | Type | Description |
|-------|------|-------------|
| `id` | integer | Server ID |
| `server_name` | string | Server display name |
| `server_ip` | string | Server IP address |
| `vpn_ip` | string | VPN IP (if configured) |
| `http_broadcast_port` | string | HTTP streaming port |
| `total_clients` | integer | Current connected clients |
| `status` | string | Server status (online/offline) |

### Code Example

```bash
curl "http://server:25461/api.php?action=server&sub=list"
```
