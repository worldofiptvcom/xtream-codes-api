---
sidebar_position: 4
title: User Management
description: User CRUD operations
---

# User Management

Create, read, update user accounts.

## Get User Info

```
GET /api.php?action=user&sub=info&user_id={id}
GET /api.php?action=user&sub=info&username={username}
```

### Response

```json
{
  "user_info": {
    "user_id": 100,
    "username": "demo",
    "password": "test123",
    "exp_date": 1735689600,
    "max_connections": 2,
    "is_restreamer": 0,
    "is_trial": 0,
    "created_at": 1609459200,
    "admin_enabled": 1,
    "enabled": 1,
    "bouquet": [1, 2, 3]
  }
}
```

## Create User

```bash
curl -X POST "http://server:25461/api.php" \
  -d "action=user" \
  -d "sub=create" \
  -d "username=newuser" \
  -d "password=password123" \
  -d "max_connections=2" \
  -d "exp_date=1767225600" \
  -d "bouquet=[1,2,3]"
```

### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `username` | string | Yes | Username |
| `password` | string | Yes | Password |
| `max_connections` | integer | No | Max connections |
| `exp_date` | integer | No | Expiration timestamp |
| `bouquet` | array | No | Bouquet IDs |
| `is_trial` | integer | No | 0=paid, 1=trial |

## Edit User

```bash
curl -X POST "http://server:25461/api.php" \
  -d "action=user" \
  -d "sub=edit" \
  -d "user_id=100" \
  -d "max_connections=3"
```
