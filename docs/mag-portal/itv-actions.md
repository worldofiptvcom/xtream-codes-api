---
sidebar_position: 4
title: ITV Actions
description: Live TV endpoints for MAG
---

# ITV (Live TV) Actions

Live television operations for MAG devices.

## Get Genres (Categories)

```
GET /portal.php?type=itv&action=get_genres
```

## Get Channel List

```
GET /portal.php?type=itv&action=get_ordered_list
GET /portal.php?type=itv&action=get_ordered_list&genre=1&sortby=number
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `genre` | integer | Category ID |
| `sortby` | string | Sort order (number, name) |
| `fav` | integer | Show favorites only (1) |

## Get All Channels

```
GET /portal.php?type=itv&action=get_all_channels
```

## Create Stream Link

```
GET /portal.php?type=itv&action=create_link&cmd=http://localhost/ch/123
```

### Response

```json
{
  "js": {
    "id": 123,
    "cmd": "ffmpeg http://server/live/user/pass/123.ts"
  }
}
```

## Get EPG

```
GET /portal.php?type=itv&action=get_short_epg&ch_id=123
GET /portal.php?type=itv&action=get_epg_info&period=3
```

## Set Favorites

```
GET /portal.php?type=itv&action=set_fav&fav_ch=123,456,789
GET /portal.php?type=itv&action=get_fav_ids
```
