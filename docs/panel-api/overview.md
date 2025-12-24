---
sidebar_position: 1
title: Panel API Overview
description: Overview of the Panel API for panel applications
---

# Panel API

The Panel API (`/panel_api.php`) provides comprehensive data for panel applications, returning all content in a single response.

## Base URL

```
GET /panel_api.php
```

## Authentication

Username and password authentication.

```bash
curl "http://server:25461/panel_api.php?username=demo&password=test123"
```

## Available Actions

| Action | Description |
|--------|-------------|
| *(default)* | Get full user data, categories, and available channels |
| `get_epg` | Get EPG data for a specific stream |

## Key Differences from Player API

| Feature | Player API | Panel API |
|---------|------------|-----------|
| Response size | Smaller, per-action | Larger, comprehensive |
| Use case | Mobile apps, players | Panel/dashboard apps |
| Data included | Per-request | All data in one call |

## When to Use Panel API

- Building IPTV panel applications
- Need all data in a single request
- Dashboard/management interfaces
- Initial app data loading
