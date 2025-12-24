---
sidebar_position: 5
title: Timeshift & Catchup
description: Watch past broadcasts and recordings
---

# Timeshift & Catchup

Access past broadcasts using timeshift and catchup TV functionality.

## URL Formats

### Timeshift by Duration

```
GET /timeshift/{username}/{password}/{duration}/{start}/{stream_id}.{ext}
```

### Streaming by Timestamp

```
GET /streaming/timeshift.php?username={user}&password={pass}&stream={id}&start={timestamp}&duration={seconds}
```

## Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `username` | string | Account username |
| `password` | string | Account password |
| `stream_id` | integer | Live stream ID |
| `start` | string | Start time (YYYY-MM-DD:HH-MM) |
| `duration` | integer | Duration in minutes |
| `timestamp` | integer | Unix timestamp |

## Code Examples

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="curl" label="cURL">

```bash
# Timeshift - watch from 2 hours ago for 60 minutes
curl "http://server:25461/timeshift/user/pass/60/2024-01-15:14-00/12345.ts"

# Using timestamp
curl "http://server:25461/streaming/timeshift.php?username=user&password=pass&stream=12345&start=1705327200&duration=3600"

# Catchup archive
curl "http://server:25461/streaming/timeshift.php?username=user&password=pass&stream=12345&start=1705240800"
```

</TabItem>
<TabItem value="python" label="Python">

```python
import requests
from datetime import datetime, timedelta

# Calculate start time (2 hours ago)
start_time = datetime.now() - timedelta(hours=2)
start_formatted = start_time.strftime("%Y-%m-%d:%H-%M")

# Timeshift URL
timeshift_url = f"http://server:25461/timeshift/user/pass/60/{start_formatted}/12345.ts"

# Or using timestamp
timestamp = int(start_time.timestamp())
timeshift_url_ts = (
    f"http://server:25461/streaming/timeshift.php"
    f"?username=user&password=pass&stream=12345&start={timestamp}&duration=3600"
)

# Stream content
with requests.get(timeshift_url, stream=True) as r:
    r.raise_for_status()
    for chunk in r.iter_content(chunk_size=8192):
        # Process stream chunk
        pass
```

</TabItem>
<TabItem value="php" label="PHP">

```php
<?php
// Calculate start time (2 hours ago)
$startTime = strtotime('-2 hours');
$startFormatted = date('Y-m-d:H-i', $startTime);

// Timeshift URL
$timeshiftUrl = "http://server:25461/timeshift/user/pass/60/$startFormatted/12345.ts";

// Or using timestamp
$timeshiftUrlTs = "http://server:25461/streaming/timeshift.php?" . http_build_query([
    'username' => 'user',
    'password' => 'pass',
    'stream' => 12345,
    'start' => $startTime,
    'duration' => 3600
]);

// Redirect to timeshift stream
header("Location: $timeshiftUrl");
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
// Calculate start time (2 hours ago)
const startTime = new Date(Date.now() - 2 * 60 * 60 * 1000);
const startFormatted = startTime.toISOString()
  .replace('T', ':')
  .replace(/:\d{2}\.\d{3}Z$/, '')
  .replace(/-/g, '-')
  .replace(':', '-', 2);

// Timeshift URL
const timeshiftUrl = `http://server:25461/timeshift/user/pass/60/${startFormatted}/12345.ts`;

// Or using timestamp
const timestamp = Math.floor(startTime.getTime() / 1000);
const params = new URLSearchParams({
  username: 'user',
  password: 'pass',
  stream: '12345',
  start: timestamp.toString(),
  duration: '3600'
});
const timeshiftUrlTs = `http://server:25461/streaming/timeshift.php?${params}`;
```

</TabItem>
</Tabs>

## Checking Timeshift Availability

Not all channels support timeshift. Check the `tv_archive` field in stream info:

```json
{
  "stream_id": 12345,
  "name": "Channel Name",
  "tv_archive": 1,
  "tv_archive_duration": 7
}
```

| Field | Description |
|-------|-------------|
| `tv_archive` | 1 = enabled, 0 = disabled |
| `tv_archive_duration` | Days of archive available |

## EPG-Based Catchup

Use EPG data to get program start times:

```python
# Get EPG for channel
epg_response = requests.get(
    "http://server:25461/player_api.php",
    params={
        "username": "user",
        "password": "pass",
        "action": "get_simple_data_table",
        "stream_id": 12345
    }
)
epg_data = epg_response.json()

# Build catchup URL from program start time
for program in epg_data.get("epg_listings", []):
    start_timestamp = program["start_timestamp"]
    end_timestamp = program["stop_timestamp"]
    duration = end_timestamp - start_timestamp

    catchup_url = f"http://server:25461/streaming/timeshift.php?username=user&password=pass&stream=12345&start={start_timestamp}&duration={duration}"
```
