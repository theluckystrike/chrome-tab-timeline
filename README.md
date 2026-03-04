# chrome-tab-timeline

[![npm version](https://img.shields.io/npm/v/chrome-tab-timeline)](https://npmjs.com/package/chrome-tab-timeline)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg)](https://www.typescriptlang.org/)
[![Discord](https://img.shields.io/badge/Discord-Zovo-blueviolet.svg?logo=discord)](https://discord.gg/zovo)
[![Website](https://img.shields.io/badge/Website-zovo.one-blue)](https://zovo.one)

> Tab activity timeline for Chrome extensions — track creation, navigation, focus, close events, and session replay for MV3.

Part of the [Zovo](https://zovo.one) developer tools family.

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

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## See Also

### Related Zovo Repositories

- [webext-tabs-overview](https://github.com/theluckystrike/webext-tabs-overview) - Tab dashboard and stats
- [chrome-tab-discard](https://github.com/theluckystrike/chrome-tab-discard) - Tab memory management
- [chrome-extension-starter-mv3](https://github.com/theluckystrike/chrome-extension-starter-mv3) - Production-ready Chrome extension starter

### Zovo Chrome Extensions

- [Zovo Tab Manager](https://chrome.google.com/webstore/detail/zovo-tab-manager) - Manage tabs efficiently
- [Zovo Focus](https://chrome.google.com/webstore/detail/zovo-focus) - Block distractions

Visit [zovo.one](https://zovo.one) for more information.
