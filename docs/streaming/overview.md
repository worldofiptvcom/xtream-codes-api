---
sidebar_position: 1
title: Streaming Overview
description: Stream URL formats and protocols
---

# Streaming API

Direct streaming URLs for live TV, VOD, and series content.

## Stream URL Patterns

### Live TV

```
http://server:port/username/password/stream_id.ext
http://server:port/live/username/password/stream_id.ext
```

### VOD (Movies)

```
http://server:port/movie/username/password/stream_id.ext
```

### Series Episodes

```
http://server:port/series/username/password/stream_id.ext
```

## Supported Extensions

| Extension | Protocol | Description |
|-----------|----------|-------------|
| `.ts` | MPEG-TS | Transport Stream |
| `.m3u8` | HLS | HTTP Live Streaming |
| `.mkv` | MKV | Matroska container |
| `.mp4` | MP4 | MPEG-4 container |
| `.avi` | AVI | AVI container |

## Authentication

All stream URLs require valid username and password in the URL path.

## Example URLs

```bash
# Live TV - MPEG-TS
http://server:25461/user/pass/12345.ts

# Live TV - HLS
http://server:25461/user/pass/12345.m3u8

# VOD Movie
http://server:25461/movie/user/pass/67890.mkv

# Series Episode
http://server:25461/series/user/pass/11111.mp4
```
