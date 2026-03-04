# chrome-tab-timeline

> Tab activity timeline for Chrome extensions — track creation, navigation, focus, close events, and session replay for MV3.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

## Install

```bash
npm install chrome-tab-timeline
```

## Usage

```js
import { TabTimeline } from 'chrome-tab-timeline';

// Create a timeline and start recording (chainable)
const timeline = new TabTimeline(5000).start();

// Get all recorded events
const events = timeline.getEvents();

// Filter events by type
const navigations = timeline.getByType('updated');
const closures = timeline.getByType('removed');

// Get activity for a specific tab
const tabEvents = timeline.getForTab(42);

// Query events within a time range
const lastHour = timeline.getInRange(Date.now() - 3600000);

// Get the most visited domains
const topDomains = timeline.getTopDomains(5);
// => [{ domain: 'github.com', visits: 23 }, ...]

// Get a session summary
const summary = timeline.getSummary();
// => { totalEvents, tabsCreated, tabsClosed, uniqueUrls, duration }

// Persist timeline to chrome.storage.local
await timeline.save();

// Restore timeline from storage
await timeline.load();

// Clear all events
timeline.clear();
```

## API

### `TimelineEvent`

```ts
interface TimelineEvent {
  type: 'created' | 'updated' | 'activated' | 'removed';
  tabId: number;
  url?: string;
  title?: string;
  timestamp: number;
}
```

### `TabTimeline`

#### `new TabTimeline(maxEvents?: number)`

Creates a new timeline instance. `maxEvents` sets the maximum number of events retained in memory (default `5000`). Oldest events are evicted when the limit is reached.

#### `timeline.start(): this`

Registers listeners on `chrome.tabs.onCreated`, `chrome.tabs.onUpdated`, `chrome.tabs.onActivated`, and `chrome.tabs.onRemoved` to begin recording events. Returns `this` for chaining.

#### `timeline.getEvents(): TimelineEvent[]`

Returns a copy of all recorded events.

#### `timeline.getByType(type: 'created' | 'updated' | 'activated' | 'removed'): TimelineEvent[]`

Returns events matching the specified type.

#### `timeline.getForTab(tabId: number): TimelineEvent[]`

Returns all events associated with a given tab ID.

#### `timeline.getInRange(startMs: number, endMs?: number): TimelineEvent[]`

Returns events whose timestamp falls within the range `[startMs, endMs]`. Defaults `endMs` to `Date.now()`.

#### `timeline.getTopDomains(count?: number): Array<{ domain: string; visits: number }>`

Aggregates events by hostname and returns the top `count` domains sorted by visit count (default `10`).

#### `timeline.getSummary(): { totalEvents: number; tabsCreated: number; tabsClosed: number; uniqueUrls: number; duration: number }`

Returns a summary of the current session including total events, tabs created, tabs closed, unique URLs visited, and session duration in milliseconds.

#### `timeline.save(): Promise<void>`

Persists the most recent 2000 events to `chrome.storage.local` under the key `__tab_timeline__`.

#### `timeline.load(): Promise<void>`

Restores events from `chrome.storage.local`.

#### `timeline.clear(): void`

Removes all events from memory.

## License

MIT
