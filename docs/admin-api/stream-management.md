---
sidebar_position: 3
title: Stream Management
description: Live stream control endpoints
---

# Stream Management

Control live streams - start, stop, and monitor.

## Start Stream

```
GET /api.php?action=stream&sub=start&stream_id={id}
```

## Stop Stream

```
GET /api.php?action=stream&sub=stop&stream_id={id}
```

## List All Streams

```
GET /api.php?action=stream&sub=list
```

## Get Online Streams

```
GET /api.php?action=stream&sub=online
```

## Get Offline Streams

```
GET /api.php?action=stream&sub=offline
```

## Response Example

```json
{
  "result": true,
  "streams": [
    {
      "id": 123,
      "name": "BBC One",
      "status": "online",
      "current_viewers": 45
    }
  ]
}
```
