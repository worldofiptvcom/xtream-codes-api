---
sidebar_position: 1
title: Player API Overview
description: Overview of the Player API endpoints
---

# Player API

The Player API (`/player_api.php`) is the primary interface for client applications, media players, and IPTV apps.

## Base URL

```
GET /player_api.php
```

## Authentication

All requests require username and password parameters.

```bash
curl "http://server:25461/player_api.php?username=demo&password=test123"
```

## Available Actions

| Action | Description |
|--------|-------------|
| *(default)* | Get user info and server info |
| `get_live_categories` | List live TV categories |
| `get_live_streams` | List live TV channels |
| `get_vod_categories` | List VOD/movie categories |
| `get_vod_streams` | List movies |
| `get_vod_info` | Get movie details |
| `get_series_categories` | List series categories |
| `get_series` | List TV series |
| `get_series_info` | Get series details with episodes |
| `get_short_epg` | Get EPG for a channel |
| `get_simple_data_table` | Get EPG in table format |

## Response Format

All responses are in JSON format.

### Success Response Structure

```json
{
  "user_info": { ... },
  "server_info": { ... },
  "data": [ ... ]
}
```

### User Info Object

```json
{
  "username": "demo",
  "password": "test123",
  "message": "",
  "auth": 1,
  "status": "Active",
  "exp_date": "1735689600",
  "is_trial": "0",
  "active_cons": "1",
  "created_at": "1609459200",
  "max_connections": "2",
  "allowed_output_formats": ["ts", "m3u8"]
}
```

### Server Info Object

```json
{
  "url": "http://server.example.com",
  "port": "25461",
  "https_port": "25463",
  "server_protocol": "http",
  "rtmp_port": "25462",
  "timezone": "Europe/London",
  "timestamp_now": 1735084800,
  "time_now": "2025-12-24 12:00:00"
}
```

## Quick Examples

### Get User Info

```bash
curl "http://server:25461/player_api.php?username=demo&password=test123"
```

### Get Live Channels

```bash
curl "http://server:25461/player_api.php?username=demo&password=test123&action=get_live_streams"
```

### Get Movies by Category

```bash
curl "http://server:25461/player_api.php?username=demo&password=test123&action=get_vod_streams&category_id=10"
```

### Get Series Info

```bash
curl "http://server:25461/player_api.php?username=demo&password=test123&action=get_series_info&series_id=123"
```
