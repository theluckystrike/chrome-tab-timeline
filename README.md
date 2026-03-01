# chrome-tab-timeline — Tab Activity Tracking
> **Built by [Zovo](https://zovo.one)** | `npm i chrome-tab-timeline`

Track tab creation, navigation, focus, and close events with time range queries, top domains, and session summaries.

```typescript
import { TabTimeline } from 'chrome-tab-timeline';
const timeline = new TabTimeline();
timeline.start();
const topDomains = timeline.getTopDomains(5);
const summary = timeline.getSummary();
```
MIT License
