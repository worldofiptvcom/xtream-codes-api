---
sidebar_position: 1
title: XMLTV EPG
description: Electronic Program Guide in XMLTV format
---

# XMLTV EPG

The XMLTV API (`/xmltv.php`) provides Electronic Program Guide data in XMLTV format.

## Endpoint

```
GET /xmltv.php?username={username}&password={password}
```

## Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `username` | string | Yes | Account username |
| `password` | string | Yes | Account password |

## Code Examples

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="curl" label="cURL">

```bash
# Download full EPG
curl "http://server:25461/xmltv.php?username=user&password=pass" -o epg.xml

# Download and decompress (if gzipped)
curl "http://server:25461/xmltv.php?username=user&password=pass" | gunzip > epg.xml
```

</TabItem>
<TabItem value="python" label="Python">

```python
import requests
import xml.etree.ElementTree as ET

# Download EPG
response = requests.get(
    "http://server:25461/xmltv.php",
    params={
        "username": "user",
        "password": "pass"
    }
)

# Parse XML
root = ET.fromstring(response.content)

# Get channels
for channel in root.findall('channel'):
    channel_id = channel.get('id')
    name = channel.find('display-name').text
    print(f"Channel: {name} (ID: {channel_id})")

# Get programs
for programme in root.findall('programme'):
    channel = programme.get('channel')
    start = programme.get('start')
    stop = programme.get('stop')
    title = programme.find('title').text
    print(f"[{channel}] {start}-{stop}: {title}")
```

</TabItem>
<TabItem value="php" label="PHP">

```php
<?php
// Download EPG
$params = http_build_query([
    'username' => 'user',
    'password' => 'pass'
]);
$xmlContent = file_get_contents("http://server:25461/xmltv.php?$params");

// Parse XML
$xml = simplexml_load_string($xmlContent);

// Get channels
foreach ($xml->channel as $channel) {
    $id = (string)$channel['id'];
    $name = (string)$channel->{'display-name'};
    echo "Channel: $name (ID: $id)\n";
}

// Get programs
foreach ($xml->programme as $programme) {
    $channel = (string)$programme['channel'];
    $start = (string)$programme['start'];
    $title = (string)$programme->title;
    echo "[$channel] $start: $title\n";
}
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
// Download and parse EPG
const params = new URLSearchParams({
  username: 'user',
  password: 'pass'
});

const response = await fetch(`http://server:25461/xmltv.php?${params}`);
const xmlText = await response.text();

// Parse XML
const parser = new DOMParser();
const xmlDoc = parser.parseFromString(xmlText, 'text/xml');

// Get channels
const channels = xmlDoc.querySelectorAll('channel');
channels.forEach(channel => {
  const id = channel.getAttribute('id');
  const name = channel.querySelector('display-name')?.textContent;
  console.log(`Channel: ${name} (ID: ${id})`);
});

// Get programs
const programmes = xmlDoc.querySelectorAll('programme');
programmes.forEach(prog => {
  const channel = prog.getAttribute('channel');
  const start = prog.getAttribute('start');
  const title = prog.querySelector('title')?.textContent;
  console.log(`[${channel}] ${start}: ${title}`);
});
```

</TabItem>
</Tabs>

## Response Format

```xml
<?xml version="1.0" encoding="UTF-8"?>
<tv generator-info-name="Xtream Codes">
  <channel id="12345">
    <display-name>Channel Name</display-name>
    <icon src="http://server/logo.png"/>
  </channel>
  <programme start="20240115140000 +0000" stop="20240115150000 +0000" channel="12345">
    <title>Program Title</title>
    <desc>Program description</desc>
    <category>Category</category>
  </programme>
</tv>
```

## XMLTV Date Format

Dates use the format: `YYYYMMDDHHmmss +ZZZZ`

- `YYYY` - Year (4 digits)
- `MM` - Month (2 digits)
- `DD` - Day (2 digits)
- `HH` - Hour (2 digits, 24h format)
- `mm` - Minutes (2 digits)
- `ss` - Seconds (2 digits)
- `+ZZZZ` - Timezone offset
