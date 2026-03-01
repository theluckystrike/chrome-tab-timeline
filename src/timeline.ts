/**
 * Tab Timeline — Track tab activity events
 */
export interface TimelineEvent { type: 'created' | 'updated' | 'activated' | 'removed'; tabId: number; url?: string; title?: string; timestamp: number; }

export class TabTimeline {
    private events: TimelineEvent[] = [];
    private maxEvents: number;

    constructor(maxEvents: number = 5000) { this.maxEvents = maxEvents; }

    /** Start recording tab events */
    start(): this {
        chrome.tabs.onCreated.addListener((tab) => this.record({ type: 'created', tabId: tab.id!, url: tab.url, title: tab.title, timestamp: Date.now() }));
        chrome.tabs.onUpdated.addListener((tabId, info, tab) => {
            if (info.url || info.title) this.record({ type: 'updated', tabId, url: tab.url, title: tab.title, timestamp: Date.now() });
        });
        chrome.tabs.onActivated.addListener(async (info) => {
            const tab = await chrome.tabs.get(info.tabId).catch(() => null);
            this.record({ type: 'activated', tabId: info.tabId, url: tab?.url, title: tab?.title, timestamp: Date.now() });
        });
        chrome.tabs.onRemoved.addListener((tabId) => this.record({ type: 'removed', tabId, timestamp: Date.now() }));
        return this;
    }

    private record(event: TimelineEvent): void {
        this.events.push(event);
        if (this.events.length > this.maxEvents) this.events.shift();
    }

    /** Get all events */
    getEvents(): TimelineEvent[] { return [...this.events]; }

    /** Get events by type */
    getByType(type: TimelineEvent['type']): TimelineEvent[] { return this.events.filter((e) => e.type === type); }

    /** Get events for a specific tab */
    getForTab(tabId: number): TimelineEvent[] { return this.events.filter((e) => e.tabId === tabId); }

    /** Get events in time range */
    getInRange(startMs: number, endMs: number = Date.now()): TimelineEvent[] {
        return this.events.filter((e) => e.timestamp >= startMs && e.timestamp <= endMs);
    }

    /** Get most visited domains */
    getTopDomains(count: number = 10): Array<{ domain: string; visits: number }> {
        const domains: Record<string, number> = {};
        this.events.filter((e) => e.url).forEach((e) => {
            try { const d = new URL(e.url!).hostname; domains[d] = (domains[d] || 0) + 1; } catch { }
        });
        return Object.entries(domains).sort(([, a], [, b]) => b - a).slice(0, count).map(([domain, visits]) => ({ domain, visits }));
    }

    /** Get session summary */
    getSummary(): { totalEvents: number; tabsCreated: number; tabsClosed: number; uniqueUrls: number; duration: number } {
        const urls = new Set(this.events.filter((e) => e.url).map((e) => e.url));
        const firstTs = this.events[0]?.timestamp || Date.now();
        return {
            totalEvents: this.events.length, tabsCreated: this.getByType('created').length, tabsClosed: this.getByType('removed').length,
            uniqueUrls: urls.size, duration: Date.now() - firstTs
        };
    }

    /** Save timeline to storage */
    async save(): Promise<void> { await chrome.storage.local.set({ __tab_timeline__: this.events.slice(-2000) }); }

    /** Load timeline from storage */
    async load(): Promise<void> {
        const result = await chrome.storage.local.get('__tab_timeline__');
        if (result.__tab_timeline__) this.events = result.__tab_timeline__;
    }

    /** Clear all events */
    clear(): void { this.events = []; }
}
