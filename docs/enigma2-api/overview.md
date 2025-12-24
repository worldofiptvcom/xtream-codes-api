---
sidebar_position: 1
title: Enigma2 API Overview
description: Bouquet and channel list API for Enigma2 receivers
---

# Enigma2 API

The Enigma2 API (`/enigma2.php`) generates bouquet files and channel lists compatible with Enigma2-based satellite receivers (Dreambox, VU+, etc.).

## Base URL

```
GET /enigma2.php
```

## Authentication

Username and password via query parameters.

## Output Formats

| Format | Description |
|--------|-------------|
| `m3u_plus` | Extended M3U playlist |
| `ts` | MPEG-TS format |
| `m3u8` | HLS playlist |
| `rtmp` | RTMP stream |

## Common Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `username` | string | Yes | Account username |
| `password` | string | Yes | Account password |
| `type` | string | Yes | Content type (see below) |
| `output` | string | No | Output format |

## Content Types

| Type | Description |
|------|-------------|
| `get_live_categories` | Live TV categories |
| `get_live_streams` | Live TV channels |
| `get_vod_categories` | VOD categories |
| `get_vod_streams` | VOD movies |
| `get_series_categories` | Series categories |
| `get_series` | TV series list |
