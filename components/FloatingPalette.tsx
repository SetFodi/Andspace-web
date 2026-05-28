"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type Row = { label: string; tag: "TERMINAL" | "PROJECT" };

const ALL_ROWS: Row[] = [
  { label: "New Tab", tag: "TERMINAL" },
  { label: "Split Right", tag: "TERMINAL" },
  { label: "Split Down", tag: "TERMINAL" },
  { label: "Close Pane", tag: "TERMINAL" },
  { label: "Toggle Sidebar", tag: "PROJECT" },
  { label: "Focus Files", tag: "PROJECT" },
  { label: "Run Script", tag: "PROJECT" },
  { label: "Create ANDSPACE.md", tag: "PROJECT" },
];

const QUERIES = ["split", "sidebar", "andspace", "run"];

function filterRows(query: string): Row[] {
  if (!query) return ALL_ROWS;
  const q = query.toLowerCase();
  return ALL_ROWS.filter((r) => r.label.toLowerCase().includes(q));
}

export function FloatingPalette({ className }: { className?: string }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [text, setText] = useState("");
  const [animate, setAnimate] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0, rootMargin: "120px 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduce || !visible) return;

    setAnimate(true);

    let cancelled = false;
    const timers: ReturnType<typeof setTimeout>[] = [];
    const wait = (ms: number) =>
      new Promise<void>((resolve) => {
        timers.push(setTimeout(resolve, ms));
      });

    async function run() {
      await wait(900);
      let i = 0;
      while (!cancelled) {
        const q = QUERIES[i % QUERIES.length];
        for (let c = 1; c <= q.length && !cancelled; c++) {
          setText(q.slice(0, c));
          await wait(82);
        }
        await wait(1250);
        for (let c = q.length - 1; c >= 0 && !cancelled; c--) {
          setText(q.slice(0, c));
          await wait(42);
        }
        await wait(480);
        i++;
      }
    }

    run();
    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
    };
  }, [visible]);

  const filtered = filterRows(text);
  const activeLabel = text ? filtered[0]?.label : "New Tab";

  return (
    <div
      ref={rootRef}
      className={cn(
        "isolate w-[min(440px,86%)] overflow-hidden rounded-2xl border border-white/10 bg-ink-800/92 shadow-[0_0_0_1px_rgba(167,139,250,0.16),0_50px_140px_-30px_rgba(0,0,0,0.95),0_0_80px_-16px_rgba(124,58,237,0.55)] [contain:layout_paint_style] will-change-transform",
        className
      )}
    >
      <div className="flex items-center justify-between border-b border-white/[0.06] px-4 pb-2.5 pt-3">
        <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-fg-faint">
          Command Palette
        </span>
        <span className="rounded-md border border-white/10 bg-white/[0.03] px-1.5 py-0.5 font-mono text-[9.5px] text-fg-faint">
          ⌘K
        </span>
      </div>

      <div className="px-4 pt-3">
        <div className="mb-2 text-[15px] font-semibold tracking-tight text-fg">
          Run a workflow action
        </div>
        <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-ink-900/70 px-3 py-2">
          <span className="text-[13px] text-violet-400">›</span>
          <span className="flex min-w-0 items-center font-mono text-[12.5px]">
            {text ? (
              <span className="truncate text-fg">{text}</span>
            ) : animate ? null : (
              <span className="text-fg-faint">Type a command…</span>
            )}
            {animate && visible ? (
              <span
                aria-hidden
                className="ml-px inline-block h-[14px] w-[1.5px] translate-y-[2px] animate-caret bg-violet-400"
              />
            ) : null}
          </span>
          <span className="ml-auto whitespace-nowrap font-mono text-[10px] text-fg-faint">
            {filtered.length} action{filtered.length === 1 ? "" : "s"}
          </span>
        </div>
      </div>

      <div className="relative h-[206px] overflow-hidden px-2 py-2">
        {filtered.map((row) => (
          <div
            key={row.label}
            className={cn(
              "flex items-center justify-between rounded-lg px-3 py-[7px] text-[12.5px] transition-colors duration-200",
              row.label === activeLabel
                ? "bg-violet/[0.14] text-fg shadow-[inset_0_0_0_1px_rgba(167,139,250,0.3)]"
                : "text-fg-muted"
            )}
          >
            <span>{row.label}</span>
            <span
              className={cn(
                "font-mono text-[9px] uppercase tracking-wider",
                row.tag === "TERMINAL"
                  ? "text-violet-400/70"
                  : "text-fg-faint/70"
              )}
            >
              {row.tag}
            </span>
          </div>
        ))}
        {/* visual fade gradient overlay instead of mask-image for high-performance typing rendering */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-b from-transparent to-ink-800/95"
        />
      </div>

      <div className="flex items-center gap-3 border-t border-white/[0.06] px-4 py-2 font-mono text-[9.5px] text-fg-faint">
        <span>↑↓ Navigate</span>
        <span>↵ Run</span>
        <span>esc Close</span>
      </div>
    </div>
  );
}
