---
sidebar_position: 1
title: MAG Portal Overview
description: Stalker/MAG middleware portal API
---

# MAG Portal API

The MAG Portal API (`/portal.php`) provides Stalker middleware compatibility for MAG set-top boxes.

## Base URL

```
GET /portal.php
```

## Authentication

MAC address + token-based authentication.

## Request Structure

```
GET /portal.php?type={type}&action={action}&{parameters}
```

## Available Types

| Type | Description |
|------|-------------|
| `stb` | Device/STB operations |
| `itv` | Live TV operations |
| `vod` | Video on Demand |
| `series` | TV Series |
| `watchdog` | Keep-alive and events |

## Required Headers

```
Authorization: Bearer {token}
Cookie: mac={mac_address}; timezone={timezone}
```
