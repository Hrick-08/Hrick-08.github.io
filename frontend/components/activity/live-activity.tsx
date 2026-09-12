"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeader } from "@/components/ui/section-header";
import { AnimatedSection } from "@/components/ui/animated-section";
import { siteConfig } from "@/data/site";

interface ActivityEvent {
  event_type: string;
  repository: string;
  repository_url?: string;
  branch: string | null;
  commit_sha: string | null;
  commit_message: string | null;
  author: string | null;
  timestamp: string;
  url?: string;
}

interface ContributionDay {
  date: string;
  contributionCount: number;
  color: string;
}

interface ContributionWeek {
  contributionDays: ContributionDay[];
}

const contributionColors = [
  "bg-orange-950/20",
  "bg-orange-300",
  "bg-orange-400",
  "bg-orange-500",
  "bg-orange-600",
];

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date
    .toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    })
    .toUpperCase();
}

function ActivityItem({ event }: { event: ActivityEvent }) {
  const shortSha = event.commit_sha?.slice(0, 7) || "";

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="py-5 border-t border-border first:border-t-0"
    >
      <p className="font-technical text-[10px] text-muted/60 tracking-wider mb-2">
        {formatDate(event.timestamp)}
      </p>
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium text-foreground mb-1 truncate">
            {event.repository}
          </p>
          <p className="text-sm text-muted leading-relaxed line-clamp-2">
            {event.commit_message || `${event.event_type} event`}
          </p>
        </div>
        {event.url ? (
          <a
            href={event.url}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0"
          >
            <p className="font-technical text-xs text-muted/50 hover:text-accent transition-colors">
              {event.branch} · {shortSha}
            </p>
          </a>
        ) : (
          <p className="font-technical text-xs text-muted/50 shrink-0">
            {event.branch} · {shortSha}
          </p>
        )}
      </div>
    </motion.div>
  );
}

function ContributionHeatmap({ weeks }: { weeks: ContributionWeek[] }) {
  const days = weeks.flatMap((week) => week.contributionDays);
  const maxContributions = Math.max(...days.map((day) => day.contributionCount), 1);
  const heatmapScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");
    if (!mediaQuery.matches || !heatmapScrollRef.current) return;

    const frame = window.requestAnimationFrame(() => {
      const scroller = heatmapScrollRef.current;
      if (scroller) scroller.scrollLeft = scroller.scrollWidth;
    });

    return () => window.cancelAnimationFrame(frame);
  }, [weeks]);

  return (
    <div className="border-t border-border pt-5">
      <div className="flex items-baseline justify-between gap-4 mb-4">
        <p className="font-technical text-[10px] text-muted/60 uppercase tracking-widest">
          GitHub contributions
        </p>
        <a
          href="https://github.com/Hrick-08"
          target="_blank"
          rel="noopener noreferrer"
          className="font-technical text-[10px] text-muted/60 hover:text-accent transition-colors"
        >
          @Hrick-08
        </a>
      </div>
      <div
        ref={heatmapScrollRef}
        className="overflow-x-auto pb-2"
        role="img"
        aria-label="GitHub contribution activity over the past year"
      >
        <div className="flex gap-1 min-w-max">
          {weeks.map((week, weekIndex) => (
            <div key={`week-${weekIndex}`} className="flex flex-col gap-1">
              {week.contributionDays.map((day) => {
                const intensity = day.contributionCount / maxContributions;
                const level = day.contributionCount === 0 ? 0 : Math.ceil(intensity * 4);

                return (
                  <span
                    key={day.date}
                    title={`${day.contributionCount} contribution${day.contributionCount === 1 ? "" : "s"} on ${day.date}`}
                    aria-label={`${day.contributionCount} contribution${day.contributionCount === 1 ? "" : "s"} on ${day.date}`}
                    className={`block size-3 rounded-xs ${contributionColors[level]}`}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-center justify-end gap-2 mt-3">
        <span className="font-technical text-[9px] text-muted/50">Less</span>
        {[0, 1, 2, 3, 4].map((level) => (
          <span
            key={level}
            className={`block size-3 rounded-xs ${contributionColors[level]}`}
          />
        ))}
        <span className="font-technical text-[9px] text-muted/50">More</span>
      </div>
    </div>
  );
}

export function LiveActivity() {
  const [activities, setActivities] = useState<ActivityEvent[]>([]);
  const [connected, setConnected] = useState(false);
  const [loading, setLoading] = useState(true);
  const [contributionWeeks, setContributionWeeks] = useState<ContributionWeek[]>([]);
  const wsRef = useRef<WebSocket | null>(null);
  const reconnectRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const shouldReconnectRef = useRef(true);
  const connectWebSocketRef = useRef<() => void>(() => undefined);

  // Fetch initial activities
  useEffect(() => {
    async function fetchActivities() {
      try {
        const res = await fetch("/api/activity?limit=10", { cache: "no-store" });
        if (res.ok) {
          const data = await res.json();
          setActivities(data.items || []);
        }
      } catch {
        // API not available — graceful degradation
      } finally {
        setLoading(false);
      }
    }
    fetchActivities();
  }, []);

  useEffect(() => {
    async function fetchContributions() {
      try {
        const res = await fetch("/api/github-contributions", { cache: "no-store" });
        if (res.ok) {
          const data = await res.json();
          setContributionWeeks(data.weeks || []);
        }
      } catch {
        // GitHub API unavailable — keep the activity feed usable
      }
    }
    fetchContributions();
  }, []);

  // WebSocket connection with reconnect
  const connectWebSocket = useCallback(() => {
    if (!shouldReconnectRef.current) return;

    const wsProtocol = siteConfig.apiUrl.startsWith("https") ? "wss" : "ws";
    const wsHost = siteConfig.apiUrl.replace(/^https?:\/\//, "");
    const wsUrl = `${wsProtocol}://${wsHost}/ws/activity`;

    try {
      const ws = new WebSocket(wsUrl);
      wsRef.current = ws;

      ws.onopen = () => setConnected(true);
      ws.onclose = () => {
        setConnected(false);
        if (shouldReconnectRef.current) {
          reconnectRef.current = setTimeout(() => connectWebSocketRef.current(), 5000);
        }
      };
      ws.onerror = () => undefined;
      ws.onmessage = (event) => {
        try {
          const payload = JSON.parse(event.data);
          const data = payload.data || payload;
          setActivities((prev) => {
            // Deduplicate by sha
            if (data.commit_sha && prev.some((a) => a.commit_sha === data.commit_sha)) {
              return prev;
            }
            return [data, ...prev].slice(0, 20);
          });
        } catch {
          // Invalid message — ignore
        }
      };
    } catch {
      reconnectRef.current = setTimeout(() => connectWebSocketRef.current(), 5000);
    }
  }, []);

  useEffect(() => {
    shouldReconnectRef.current = true;
    connectWebSocketRef.current = connectWebSocket;
    connectWebSocket();
    return () => {
      shouldReconnectRef.current = false;
      if (reconnectRef.current) clearTimeout(reconnectRef.current);

      const ws = wsRef.current;
      wsRef.current = null;
      if (!ws) return;

      if (ws.readyState === WebSocket.CONNECTING) {
        ws.onopen = () => ws.close();
        ws.onclose = null;
        ws.onerror = null;
      } else {
        ws.close();
      }
    };
  }, [connectWebSocket]);

  return (
    <section className="section-padding section-gap max-w-[1440px] mx-auto">
      <AnimatedSection>
        <div className="flex items-center justify-between mb-8 md:mb-12">
          <SectionHeader title="Recent Activity" className="mb-0" />
          {connected && (
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 live-dot" />
              <span className="font-technical text-[10px] text-muted/60 uppercase tracking-widest">
                Live
              </span>
            </div>
          )}
        </div>
      </AnimatedSection>

      <AnimatedSection delay={0.1}>
        {contributionWeeks.length > 0 && (
          <AnimatedSection delay={0.2}>
            <ContributionHeatmap weeks={contributionWeeks} />
          </AnimatedSection>
        )}
        {loading ? (
          <div className="py-12 text-center">
            <p className="font-technical text-xs text-muted/50">Loading activity...</p>
          </div>
        ) : activities.length === 0 ? (
          <div className="py-12 border-t border-border">
            <p className="text-sm text-muted text-center">
              No activity recorded yet. New GitHub webhook events will appear
              here in real-time once the webhook is connected.
            </p>
          </div>
        ) : (
          <div>
            <AnimatePresence mode="popLayout">
              {activities.map((event) => (
                <ActivityItem key={`${event.commit_sha}-${event.timestamp}`} event={event} />
              ))}
            </AnimatePresence>
          </div>
        )}
      </AnimatedSection>

    </section>
  );
}
