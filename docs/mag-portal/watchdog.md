---
sidebar_position: 7
title: Watchdog
description: Keep-alive and event handling
---

# Watchdog

Keep-alive mechanism and event handling for MAG devices.

## Get Events

Polls for pending events (messages, commands).

```
GET /portal.php?type=watchdog&action=get_events
```

### Response

```json
{
  "js": {
    "data": {
      "msgs": 1,
      "id": 123,
      "event": "send_msg",
      "msg": "Welcome message",
      "need_confirm": 1,
      "auto_hide_timeout": 0
    }
  }
}
```

### Event Types

| Event | Description |
|-------|-------------|
| `send_msg` | Display message |
| `reboot` | Reboot device |
| `reload_portal` | Reload portal |
| `play_channel` | Auto-tune to channel |
| `cut_off` | Disconnect device |

## Confirm Event

```
GET /portal.php?type=watchdog&action=confirm_event&event_active_id=123
```
