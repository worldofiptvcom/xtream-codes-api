---
sidebar_position: 2
title: Live TV Bouquets
description: Generate Enigma2 bouquets for live TV
---

# Live TV Bouquets

Generate bouquet files for live TV channels on Enigma2 receivers.

## Get Live Categories

Returns available live TV categories for bouquet organization.

### Endpoint

```
GET /enigma2.php?username={username}&password={password}&type=get_live_categories
```

### Code Examples

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="curl" label="cURL">

```bash
curl "http://server:25461/enigma2.php?username=user&password=pass&type=get_live_categories"
```

</TabItem>
<TabItem value="python" label="Python">

```python
import requests

response = requests.get(
    "http://server:25461/enigma2.php",
    params={
        "username": "user",
        "password": "pass",
        "type": "get_live_categories"
    }
)
categories = response.json()
```

</TabItem>
<TabItem value="php" label="PHP">

```php
<?php
$params = http_build_query([
    'username' => 'user',
    'password' => 'pass',
    'type' => 'get_live_categories'
]);

$response = file_get_contents("http://server:25461/enigma2.php?$params");
$categories = json_decode($response, true);
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
const params = new URLSearchParams({
  username: 'user',
  password: 'pass',
  type: 'get_live_categories'
});

const response = await fetch(`http://server:25461/enigma2.php?${params}`);
const categories = await response.json();
```

</TabItem>
</Tabs>

## Get Live Streams

Returns live TV channels formatted for Enigma2.

### Endpoint

```
GET /enigma2.php?username={username}&password={password}&type=get_live_streams
```

### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `category_id` | integer | No | Filter by category |
| `output` | string | No | Output format (ts, m3u_plus) |

### Example with Category Filter

```bash
curl "http://server:25461/enigma2.php?username=user&password=pass&type=get_live_streams&category_id=1"
```

### Response Format

The response is formatted as an Enigma2-compatible bouquet file that can be imported directly into the receiver.
