---
sidebar_position: 5
title: STB Management
description: MAG device management
---

# STB/MAG Device Management

Manage MAG set-top box registrations.

## Get STB Info

```
GET /api.php?action=stb&sub=info&mag_id={id}
GET /api.php?action=stb&sub=info&mac={mac_address}
```

## Create STB

```bash
curl -X POST "http://server:25461/api.php" \
  -d "action=stb" \
  -d "sub=create" \
  -d "mac=00:1A:79:XX:XX:XX" \
  -d "user_id=100"
```

## Edit STB

```bash
curl -X POST "http://server:25461/api.php" \
  -d "action=stb" \
  -d "sub=edit" \
  -d "mag_id=50" \
  -d "user_id=101"
```
