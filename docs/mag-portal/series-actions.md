---
sidebar_position: 6
title: Series Actions
description: TV Series for MAG
---

# Series Actions

TV Series operations for MAG devices.

## Get Categories

```
GET /portal.php?type=series&action=get_categories
```

## Get Series List

```
GET /portal.php?type=series&action=get_ordered_list
GET /portal.php?type=series&action=get_ordered_list&category=20
```

## Favorites

```
GET /portal.php?type=series&action=set_fav&video_id=789
GET /portal.php?type=series&action=del_fav&video_id=789
```
