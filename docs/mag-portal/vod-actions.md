---
sidebar_position: 5
title: VOD Actions
description: Video on Demand for MAG
---

# VOD Actions

Video on Demand operations for MAG devices.

## Get Categories

```
GET /portal.php?type=vod&action=get_categories
```

## Get Movies

```
GET /portal.php?type=vod&action=get_ordered_list
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `category` | integer | Category ID |
| `sortby` | string | added, name, rating, year |
| `search` | string | Search query |
| `abc` | string | Filter by letter |
| `genre` | string | Filter by genre |
| `years` | string | Filter by year |
| `fav` | integer | Favorites only |

## Create Stream Link

```
GET /portal.php?type=vod&action=create_link&cmd={base64_encoded}
```

## Favorites

```
GET /portal.php?type=vod&action=set_fav&video_id=456
GET /portal.php?type=vod&action=del_fav&video_id=456
```
