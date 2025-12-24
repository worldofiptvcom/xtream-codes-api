---
sidebar_position: 1
slug: /
title: Introduction
description: Complete API Documentation for Xtream Codes IPTV Panel v2.9.2
---

# Xtream Codes API Documentation

Welcome to the comprehensive API documentation for **Xtream Codes IPTV Panel v2.9.2**. This documentation covers all available API endpoints, authentication methods, and integration patterns.

## Overview

Xtream Codes is a complete IPTV panel management system that provides APIs for:

- **Live TV Streaming** - Real-time broadcast channels
- **Video on Demand (VOD)** - Movies and video content
- **TV Series** - Episodic content with seasons
- **Electronic Program Guide (EPG)** - TV schedule data
- **MAG/Stalker Portal** - Set-top box support
- **Enigma2 Support** - Satellite receiver integration
- **Multi-server Load Balancing** - Distributed streaming

## Available APIs

| API | Endpoint | Purpose |
|-----|----------|---------|
| [Player API](/category/player-api) | `/player_api.php` | Client applications & media players |
| [Panel API](/category/panel-api) | `/panel_api.php` | Panel applications |
| [Admin API](/category/admin-api) | `/api.php` | Server & user management |
| [MAG Portal](/category/mag-portal) | `/portal.php` | MAG STB devices |
| [Enigma2 API](/category/enigma2-api) | `/enigma2.php` | Enigma2 receivers |
| [Streaming](/category/streaming) | `/live/`, `/movie/`, `/series/` | Media streaming |
| [Utilities](/category/utilities) | `/xmltv.php`, `/get.php` | EPG & playlists |

## Base URL

```
http://{server_ip}:{port}/
https://{server_ip}:{port}/
```

### Default Ports

| Service | Port |
|---------|------|
| HTTP | 25461 |
| HTTPS | 25463 |

## Quick Start

### 1. Authenticate

```bash
curl "http://server:25461/player_api.php?username=USER&password=PASS"
```

### 2. Get Live Channels

```bash
curl "http://server:25461/player_api.php?username=USER&password=PASS&action=get_live_streams"
```

### 3. Play a Stream

```bash
# Using VLC, ffplay, or any media player
ffplay "http://server:25461/live/USER/PASS/123.ts"
```

## Response Format

All API responses are in **JSON format** (except Enigma2 which uses XML).

### Success Response

```json
{
  "user_info": {
    "username": "demo",
    "status": "Active",
    "auth": 1
  },
  "server_info": {
    "url": "http://server.example.com",
    "port": "25461"
  }
}
```

### Error Response

```json
{
  "user_info": {
    "auth": 0,
    "status": "Expired",
    "message": "Account has expired"
  }
}
```

## Rate Limiting

- **20 requests per second** per IP address
- Flood protection on failed authentication attempts

## Need Help?

- Check the [Authentication](/authentication) guide for setup
- Review [Error Codes](/error-codes) for troubleshooting
- See the [OpenAPI Specification](/openapi) for machine-readable docs
