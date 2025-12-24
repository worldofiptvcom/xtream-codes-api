---
sidebar_position: 1
title: Admin API Overview
description: Overview of the Admin/Management API
---

# Admin API

The Admin API (`/api.php`) provides server management, stream control, and user administration capabilities.

## Base URL

```
GET /api.php
```

## Authentication

:::warning IP-Based Authentication
The Admin API is **IP-restricted**. Only requests from authorized streaming server IPs are accepted. This API cannot be accessed from arbitrary client IPs.
:::

## Available Actions

| Action | Sub-action | Description |
|--------|------------|-------------|
| `server` | `list` | List all servers |
| `stream` | `start`, `stop`, `list`, `online`, `offline` | Stream management |
| `vod` | `start`, `stop` | VOD encoding control |
| `user` | `info`, `create`, `edit` | User management |
| `stb` | `info`, `create`, `edit` | MAG device management |
| `reg_user` | `list`, `credits` | Reseller management |

## Request Format

```
GET /api.php?action={action}&sub={sub_action}&{parameters}
```

## Example

```bash
# List all servers (from authorized server IP)
curl "http://server:25461/api.php?action=server&sub=list"
```

## Response Format

All responses are in JSON format.

```json
{
  "result": true,
  "data": { ... }
}
```
