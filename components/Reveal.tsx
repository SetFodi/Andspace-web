"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

const EFFECTS = {
  default: {
    duration: "duration-700",
    hidden: "translate-y-6 opacity-0",
    shown: "translate-y-0 opacity-100",
  },
  screenshot: {
    duration: "duration-[1100ms]",
    hidden: "translate-y-8 scale-[0.98] opacity-0",
    shown: "translate-y-0 scale-100 opacity-100",
  },
} as const;

export function Reveal({
  children,
  className,
  delay = 0,
  effect = "default",
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  effect?: keyof typeof EFFECTS;
  as?: "div" | "li" | "section";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduce) {
      setShown(true);
      return;
    }

    const obs = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setShown(true);
            obs.disconnect();
          }
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const variant = EFFECTS[effect];

  return (
    <Tag
      // @ts-expect-error – ref type narrows across the small tag union
      ref={ref}
      style={{ transitionDelay: shown ? `${delay}ms` : "0ms" }}
      className={cn(
        "transition-[transform,opacity] ease-[cubic-bezier(0.16,1,0.3,1)]",
        variant.duration,
        shown ? variant.shown : variant.hidden,
        className
      )}
    >
      {children}
    </Tag>
  );
}
