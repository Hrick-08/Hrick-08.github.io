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

export function LiveActivity() {
  const [activities, setActivities] = useState<ActivityEvent[]>([]);
  const [connected, setConnected] = useState(false);
  const [loading, setLoading] = useState(true);
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
        <div className="flex items-center justify-between mb-12 md:mb-16">
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
