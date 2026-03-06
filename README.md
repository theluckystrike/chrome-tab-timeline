# chrome-tab-timeline

Tab activity timeline for Chrome extensions. Records creation, navigation, focus, and close events across all tabs with automatic eviction, persistence via chrome.storage.local, and session analytics. Built for Manifest V3 service workers.

INSTALL

```
npm install chrome-tab-timeline
```

QUICK START

```js
import { TabTimeline } from 'chrome-tab-timeline';

const timeline = new TabTimeline(5000).start();

const events = timeline.getEvents();
const navigations = timeline.getByType('updated');
const tabHistory = timeline.getForTab(42);
const lastHour = timeline.getInRange(Date.now() - 3600000);

const topDomains = timeline.getTopDomains(5);
// [{ domain: 'github.com', visits: 23 }, ...]

const summary = timeline.getSummary();
// { totalEvents, tabsCreated, tabsClosed, uniqueUrls, duration }

await timeline.save();
await timeline.load();
timeline.clear();
```

TIMELINE EVENT

Every recorded event conforms to this shape.

```ts
interface TimelineEvent {
  type: 'created' | 'updated' | 'activated' | 'removed'
  tabId: number
  url?: string
  title?: string
  timestamp: number
}
```

The type field maps directly to the Chrome tabs API events that produced it.

- created fires on chrome.tabs.onCreated
- updated fires on chrome.tabs.onUpdated when url or title changes
- activated fires on chrome.tabs.onActivated and resolves the tab to capture url and title
- removed fires on chrome.tabs.onRemoved with only tabId and timestamp

API

new TabTimeline(maxEvents?)

Creates a timeline instance. maxEvents controls how many events are kept in memory before the oldest are evicted. Defaults to 5000.

timeline.start()

Registers listeners on chrome.tabs.onCreated, onUpdated, onActivated, and onRemoved. Returns this so you can chain it with the constructor.

timeline.getEvents()

Returns a shallow copy of all recorded events.

timeline.getByType(type)

Filters events by type. Accepts 'created', 'updated', 'activated', or 'removed'.

timeline.getForTab(tabId)

Returns every event associated with a given tab ID.

timeline.getInRange(startMs, endMs?)

Returns events whose timestamp falls between startMs and endMs inclusive. endMs defaults to Date.now().

timeline.getTopDomains(count?)

Parses the url field of every event, aggregates by hostname, and returns the top count domains sorted by visit count. Defaults to 10. Silently skips events with missing or invalid URLs.

timeline.getSummary()

Returns a session summary object with these fields.

- totalEvents is the current event count
- tabsCreated is the number of 'created' events
- tabsClosed is the number of 'removed' events
- uniqueUrls is the count of distinct URLs seen
- duration is the elapsed time in milliseconds since the first event

timeline.save()

Persists the most recent 2000 events to chrome.storage.local under the key __tab_timeline__. Returns a Promise.

timeline.load()

Restores events from chrome.storage.local. Replaces the in-memory event array entirely. Returns a Promise.

timeline.clear()

Removes all events from memory.

PERMISSIONS

Your manifest.json needs the tabs permission and storage if you use save/load.

```json
{
  "permissions": ["tabs", "storage"]
}
```

LICENSE

MIT. See LICENSE file.

---

Built at zovo.one
github.com/theluckystrike
