---
sidebar_position: 3
title: STB Actions
description: Device settings and configuration
---

# STB Actions

Device configuration and settings endpoints.

## Get Profile

```
GET /portal.php?type=stb&action=get_profile
```

## Get Modules

```
GET /portal.php?type=stb&action=get_modules
```

Returns available modules (tv, vod, series, etc.)

## Set Volume

```
GET /portal.php?type=stb&action=set_volume&vol=70
```

## Set Locale

```
GET /portal.php?type=stb&action=set_locale&locale=en_GB.utf8
```

## Set Parent Password

```
GET /portal.php?type=stb&action=set_parent_password&pass=1234&repeat_pass=1234
```

## Get Settings Profile

```
GET /portal.php?type=stb&action=get_settings_profile
```
