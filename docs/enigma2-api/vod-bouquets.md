---
sidebar_position: 3
title: VOD Bouquets
description: Generate Enigma2 bouquets for VOD content
---

# VOD Bouquets

Generate bouquet files for Video on Demand content on Enigma2 receivers.

## Get VOD Categories

### Endpoint

```
GET /enigma2.php?username={username}&password={password}&type=get_vod_categories
```

### Code Examples

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="curl" label="cURL">

```bash
curl "http://server:25461/enigma2.php?username=user&password=pass&type=get_vod_categories"
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
        "type": "get_vod_categories"
    }
)
categories = response.json()
```

</TabItem>
</Tabs>

## Get VOD Streams

### Endpoint

```
GET /enigma2.php?username={username}&password={password}&type=get_vod_streams
```

### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `category_id` | integer | No | Filter by category |

### Example

```bash
curl "http://server:25461/enigma2.php?username=user&password=pass&type=get_vod_streams&category_id=5"
```

## Get Series

### Endpoint

```
GET /enigma2.php?username={username}&password={password}&type=get_series
```

### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `category_id` | integer | No | Filter by category |

### Example

```bash
curl "http://server:25461/enigma2.php?username=user&password=pass&type=get_series&category_id=10"
```
