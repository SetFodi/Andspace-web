import Link from "next/link";
import Image from "next/image";
import { AppleIcon, GithubIcon } from "./icons";

const LINKS = [
  { label: "Features", href: "#features" },
  { label: "Command Guard", href: "#command-guard" },
  { label: "AI Handoff", href: "#ai-handoff" },
  { label: "Sidebar", href: "#sidebar" },
  { label: "Changelog", href: "#changelog" },
];

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
  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="border-b border-line-soft bg-ink-900/70 backdrop-blur-xl">
        <nav className="mx-auto flex h-16 w-full max-w-page items-center justify-between px-6 lg:px-8">
          <div className="flex items-center gap-8">
            <Wordmark />
            <ul className="hidden items-center gap-1 lg:flex">
              {LINKS.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="rounded-lg px-3 py-1.5 text-[13.5px] font-medium text-fg-muted transition-colors hover:text-fg"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
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
              href="https://github.com/SetFodi/Andspace/releases/tag/v0.1.0-alpha.2"
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
