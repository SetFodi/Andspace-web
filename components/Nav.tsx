"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { AppleIcon, GithubIcon } from "./icons";

const LINKS = [
  { label: "Features", href: "#features", id: "features" },
  { label: "Command Guard", href: "#command-guard", id: "command-guard" },
  { label: "AI Handoff", href: "#ai-handoff", id: "ai-handoff" },
  { label: "Sidebar", href: "#sidebar", id: "sidebar" },
] as const;

const RELEASES_URL = "https://github.com/SetFodi/Andspace/releases";

export function Wordmark() {
  return (
    <Link href="/" className="flex items-center gap-2.5" aria-label="AndSpace home">
      <Image
        src="/logo.png"
        alt="AndSpace"
        width={28}
        height={28}
        className="h-7 w-7 rounded-[8px]"
        priority
      />
      <span className="text-[15px] font-semibold tracking-tight text-fg">
        And<span className="text-fg-muted">Space</span>
      </span>
    </Link>
  );
}

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);

  // Solidify the bar once the page leaves the very top so it floats cleanly
  // over the hero mesh, then frosts as soon as content scrolls beneath it.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll-spy: highlight the nav link for whichever section is currently
  // sitting just below the bar. The band (-20% top, -70% bottom) keeps a
  // single section active through most of its scroll travel.
  useEffect(() => {
    const sections = LINKS.map((l) => document.getElementById(l.id)).filter(
      (el): el is HTMLElement => el !== null
    );
    if (sections.length === 0) return;

    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort(
            (a, b) => a.boundingClientRect.top - b.boundingClientRect.top
          );
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-20% 0px -70% 0px", threshold: 0 }
    );

    sections.forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={cn(
          "transition-[background-color,border-color,box-shadow,backdrop-filter] duration-300",
          scrolled
            ? "border-b border-line-strong bg-ink-950/80 shadow-[0_14px_36px_-24px_rgba(0,0,0,0.95)] backdrop-blur-xl"
            : "border-b border-transparent bg-transparent"
        )}
      >
        <nav className="mx-auto flex h-16 w-full max-w-page items-center justify-between px-6 lg:px-8">
          <div className="flex items-center gap-8">
            <Wordmark />
            <ul className="hidden items-center gap-1 lg:flex">
              {LINKS.map((l) => {
                const active = activeId === l.id;
                return (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      aria-current={active ? "true" : undefined}
                      className={cn(
                        "relative rounded-lg px-3 py-1.5 text-[13.5px] font-medium transition-colors",
                        active ? "text-fg" : "text-fg-muted hover:text-fg"
                      )}
                    >
                      {l.label}
                      <span
                        aria-hidden
                        className={cn(
                          "absolute inset-x-3 -bottom-0.5 h-px origin-center bg-gradient-to-r from-transparent via-violet-400 to-transparent transition-transform duration-300",
                          active ? "scale-x-100" : "scale-x-0"
                        )}
                      />
                    </Link>
                  </li>
                );
              })}
              <li>
                <Link
                  href={RELEASES_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-lg px-3 py-1.5 text-[13.5px] font-medium text-fg-muted transition-colors hover:text-fg"
                >
                  Changelog
                </Link>
              </li>
            </ul>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="https://github.com/SetFodi/Andspace"
              className="hidden h-9 w-9 items-center justify-center rounded-lg text-fg-muted transition-colors hover:bg-white/[0.05] hover:text-fg sm:flex"
              aria-label="GitHub"
            >
              <GithubIcon />
            </Link>
            <Link
              href="https://github.com/SetFodi/Andspace/releases/tag/v0.1.0-alpha.5"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-b from-violet-400 to-violet-600 px-3.5 py-2 text-[13px] font-semibold text-white shadow-[0_8px_24px_-12px_rgba(124,58,237,0.9),inset_0_1px_0_rgba(255,255,255,0.25)] transition-all hover:from-violet-400 hover:to-violet-500"
            >
              <AppleIcon className="h-4 w-4" />
              Download for macOS
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
