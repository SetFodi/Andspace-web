import Link from "next/link";
import { Wordmark } from "./Nav";
import { GithubIcon } from "./icons";

const COLUMNS: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "/#features" },
      { label: "Command Guard", href: "/#command-guard" },
      { label: "AI Handoff", href: "/#ai-handoff" },
      { label: "Download", href: "/#download" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Release", href: "https://github.com/SetFodi/Andspace/releases/tag/v0.1.0-alpha.8" },
      { label: "Changelog", href: "https://github.com/SetFodi/Andspace/releases" },
      { label: "Documentation", href: "https://github.com/SetFodi/Andspace#readme" },
      { label: "Feedback", href: "https://github.com/SetFodi/Andspace/issues" },
      { label: "Keyboard shortcuts", href: "/#keyboard" },
      { label: "GitHub", href: "https://github.com/SetFodi/Andspace" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/#features" },
      { label: "Privacy", href: "/privacy" },
      { label: "Security", href: "/security" },
      { label: "Report issue", href: "https://github.com/SetFodi/Andspace/issues" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-line-soft bg-ink-900">
      <div className="mx-auto w-full max-w-page px-6 py-14 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div className="max-w-xs">
            <Wordmark />
            <p className="mt-4 text-[13.5px] leading-relaxed text-fg-muted">
              The terminal built around your workflow. Project-aware, AI-ready,
              and delightfully fast.
            </p>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h4 className="mb-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-fg-faint">
                {col.title}
              </h4>
              <ul className="space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="text-[13.5px] text-fg-muted transition-colors hover:text-fg"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-line-soft pt-7 sm:flex-row">
          <p className="text-[12.5px] text-fg-faint">
            © {new Date().getFullYear()} AndSpace. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-[12.5px] text-fg-faint">
            <span>Made for macOS</span>
            <Link href="/privacy" className="transition-colors hover:text-fg-muted">
              Privacy
            </Link>
            <Link href="/security" className="transition-colors hover:text-fg-muted">
              Security
            </Link>
            <Link
              href="https://github.com/SetFodi/Andspace/issues"
              className="transition-colors hover:text-fg-muted"
            >
              Feedback
            </Link>
            <Link
              href="https://github.com/SetFodi/Andspace"
              className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-fg-muted transition-colors hover:bg-white/[0.05] hover:text-fg"
              aria-label="GitHub"
            >
              <GithubIcon className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
