# chrome-tab-timeline

[![npm version](https://img.shields.io/npm/v/chrome-tab-timeline)](https://npmjs.com/package/chrome-tab-timeline)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg)](https://www.typescriptlang.org/)
[![Chrome Web Extension](https://img.shields.io/badge/Chrome-Web%20Extension-orange.svg)](https://developer.chrome.com/docs/extensions/)
[![CI Status](https://github.com/theluckystrike/chrome-tab-timeline/actions/workflows/ci.yml/badge.svg)](https://github.com/theluckystrike/chrome-tab-timeline/actions)
[![Discord](https://img.shields.io/badge/Discord-Zovo-blueviolet.svg?logo=discord)](https://discord.gg/zovo)
[![Website](https://img.shields.io/badge/Website-zovo.one-blue)](https://zovo.one)
[![GitHub Stars](https://img.shields.io/github/stars/theluckystrike/chrome-tab-timeline?style=social)](https://github.com/theluckystrike/chrome-tab-timeline)

> Track tab activity timeline in Chrome extensions.

**chrome-tab-timeline** provides utilities to track tab activity timeline. Part of the Zovo Chrome extension utilities.

Part of the [Zovo](https://zovo.one) developer tools family.

## Overview

chrome-tab-timeline provides utilities to track tab activity timeline.

## Features

- ✅ **Activity Tracking** - Track tab activations
- ✅ **Timeline History** - Get tab activity history
- ✅ **Statistics** - Calculate tab usage stats
- ✅ **TypeScript Support** - Full type definitions included

## Installation

```bash
npm install chrome-tab-timeline
```

## Usage

```javascript
import { TabTimeline } from 'chrome-tab-timeline';

// Get tab timeline
const timeline = await TabTimeline.get(tabId);

// Get all tabs activity
const allActivity = await TabTimeline.getAll();

// Get statistics
const stats = await TabTimeline.getStats(tabId);
```

## API

### Methods

| Method | Description |
|--------|-------------|
| `TabTimeline.get(tabId)` | Get tab timeline |
| `TabTimeline.getAll()` | Get all tabs timeline |
| `TabTimeline.getStats(tabId)` | Get usage statistics |

## License

MIT — [Zovo](https://zovo.one)

## Contributing

Contributions are welcome! Please follow these steps:

1. **Fork** the repository
2. **Create** a feature branch: `git checkout -b feature/timeline-feature`
3. **Make** your changes
4. **Test** your changes: `npm test`
5. **Commit** your changes: `git commit -m 'Add new feature'`
6. **Push** to the branch: `git push origin feature/timeline-feature`
7. **Submit** a Pull Request

## See Also

### Related Zovo Repositories

- [webext-tabs-overview](https://github.com/theluckystrike/webext-tabs-overview) - Tab dashboard
- [chrome-tab-discard](https://github.com/theluckystrike/chrome-tab-discard) - Tab discarding
- [chrome-tab-search](https://github.com/theluckystrike/chrome-tab-search) - Tab search

### Zovo Chrome Extensions

- [Zovo Tab Manager](https://chrome.google.com/webstore/detail/zovo-tab-manager) - Manage tabs efficiently
- [Zovo Focus](https://chrome.google.com/webstore/detail/zovo-focus) - Block distractions

Visit [zovo.one](https://zovo.one) for more information.
