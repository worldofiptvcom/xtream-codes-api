---
sidebar_position: 6
title: Reseller Management
description: Reseller account management
---

# Reseller Management

Manage reseller accounts and credits.

## List Resellers

```
GET /api.php?action=reg_user&sub=list
```

### Response

```json
{
  "resellers": [
    {
      "id": 5,
      "username": "reseller1",
      "credits": 100,
      "created_users": 45
    }
  ]
}
```

## Get Reseller Credits

```
GET /api.php?action=reg_user&sub=credits&reg_user_id=5
```

### Response

```json
{
  "credits": 100,
  "used_credits": 50,
  "available_credits": 50
}
```
