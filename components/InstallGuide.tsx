"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { RELEASE } from "@/lib/release";
import { Wordmark } from "./Nav";
import { Reveal } from "./Reveal";
import { Button } from "./ui";
import {
  CheckIcon,
  LockIcon,
  GithubIcon,
  DownloadIcon,
  GearIcon,
  CopyIcon,
  ArrowRightIcon,
  FolderIcon,
  TerminalIcon,
} from "./icons";

const QUARANTINE_CMD = "xattr -dr com.apple.quarantine /Applications/AndSpace.app";

/* ---------- macOS dialog recreations (teaching mocks, not pixel-perfect) ---------- */

function DmgMock() {
  return (
    <div className="mx-auto w-full max-w-[260px] overflow-hidden rounded-xl border border-white/10 bg-ink-800/90 shadow-[0_24px_70px_-34px_rgba(0,0,0,0.95)]">
      <div className="flex items-center gap-1.5 border-b border-line-soft bg-ink-800 px-3 py-2">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-1.5 text-[10px] font-medium text-fg-faint">AndSpace</span>
      </div>
      <div className="flex items-center justify-between gap-2 px-5 py-5">
        <div className="flex flex-col items-center gap-1.5">
          <Image src="/logo.png" alt="" width={48} height={48} className="h-12 w-12 rounded-[12px]" />
          <span className="text-[10px] text-fg-muted">AndSpace</span>
        </div>
        <ArrowRightIcon className="h-4 w-4 shrink-0 text-violet-300" />
        <div className="flex flex-col items-center gap-1.5">
          <span className="grid h-12 w-12 place-items-center rounded-[12px] border border-white/10 bg-white/[0.04] text-fg-faint">
            <FolderIcon className="h-6 w-6" />
          </span>
          <span className="text-[10px] text-fg-muted">Applications</span>
        </div>
      </div>
    </div>
  );
}

function GatekeeperMock() {
  return (
    <div className="mx-auto w-[230px] overflow-hidden rounded-2xl border border-white/10 bg-ink-800/92 p-4 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.95)] backdrop-blur">
      <div className="flex flex-col items-center text-center">
        <div className="relative mb-2.5">
          <Image src="/logo.png" alt="" width={46} height={46} className="h-[46px] w-[46px] rounded-[11px]" />
          <span className="absolute -bottom-1 -right-1 grid h-5 w-5 place-items-center rounded-full border-2 border-ink-800 bg-amber-400 text-[11px] font-bold leading-none text-ink-950">
            !
          </span>
        </div>
        <div className="text-[12px] font-semibold text-fg">&ldquo;AndSpace&rdquo; Not Opened</div>
        <p className="mt-1 text-[10px] leading-snug text-fg-faint">
          Apple could not verify &ldquo;AndSpace&rdquo; is free of malware.
        </p>
      </div>
      <div className="mt-3.5 space-y-1.5">
        <div className="relative rounded-lg bg-white/[0.05] py-1.5 text-center text-[11px] font-medium text-fg-faint">
          <span className="line-through decoration-rose-400/80">Move to Trash</span>
          <span className="absolute -right-1.5 -top-2 rounded-full bg-rose-500/90 px-1.5 py-[1px] text-[8px] font-semibold uppercase tracking-wide text-white">
            not this
          </span>
        </div>
        <div className="relative rounded-lg bg-gradient-to-b from-violet-400 to-violet-600 py-1.5 text-center text-[11px] font-semibold text-white shadow-[0_0_0_2px_rgba(167,139,250,0.55),inset_0_1px_0_rgba(255,255,255,0.25)]">
          Done
          <span className="absolute -right-1.5 -top-2 rounded-full bg-violet-500 px-1.5 py-[1px] text-[8px] font-semibold uppercase tracking-wide text-white">
            click this
          </span>
        </div>
      </div>
    </div>
  );
}

function PrivacyMock() {
  return (
    <div className="mx-auto w-full max-w-[260px] overflow-hidden rounded-xl border border-white/10 bg-ink-800/92 shadow-[0_24px_70px_-34px_rgba(0,0,0,0.95)]">
      <div className="flex items-center gap-2 border-b border-line-soft bg-ink-800 px-3 py-2">
        <GearIcon className="h-3.5 w-3.5 text-fg-faint" />
        <span className="text-[10.5px] font-semibold text-fg-muted">Privacy &amp; Security</span>
      </div>
      <div className="flex items-center gap-3 p-3.5">
        <p className="min-w-0 flex-1 text-[10.5px] leading-snug text-fg-muted">
          &ldquo;AndSpace&rdquo; was blocked to protect your Mac.
        </p>
        <span className="relative shrink-0 rounded-md bg-gradient-to-b from-violet-400 to-violet-600 px-2.5 py-1 text-[10.5px] font-semibold text-white shadow-[0_0_0_2px_rgba(167,139,250,0.55),inset_0_1px_0_rgba(255,255,255,0.25)]">
          Open Anyway
        </span>
      </div>
    </div>
  );
}

/* ---------- copy-to-clipboard button ---------- */

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(text);
          setCopied(true);
          window.setTimeout(() => setCopied(false), 1600);
        } catch {
          /* clipboard unavailable */
        }
      }}
      className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-line-strong bg-white/[0.03] px-2.5 py-1.5 text-[11.5px] font-medium text-fg-muted transition-colors hover:bg-white/[0.06] hover:text-fg"
      aria-label="Copy command"
    >
      {copied ? <CheckIcon className="h-3.5 w-3.5 text-ok" /> : <CopyIcon className="h-3.5 w-3.5" />}
      {copied ? "Copied" : "Copy"}
    </button>
  );
}

/* ---------- steps ---------- */

const STEPS: { title: string; body: ReactNode; visual: ReactNode }[] = [
  {
    title: "Drag AndSpace to Applications",
    body: (
      <>
        Open the downloaded <code className="rounded bg-white/[0.06] px-1 font-mono text-[12.5px]">.dmg</code>{" "}
        and drop the AndSpace icon into your <strong className="font-semibold text-fg">Applications</strong>{" "}
        folder.
      </>
    ),
    visual: <DmgMock />,
  },
  {
    title: "Click “Done” on the first warning",
    body: (
      <>
        Double-click AndSpace. macOS will say it couldn&rsquo;t verify the app &mdash; expected for a
        notarization-pending alpha. Click <strong className="font-semibold text-fg">Done</strong>.{" "}
        <span className="font-medium text-rose-300">Don&rsquo;t click &ldquo;Move to Trash.&rdquo;</span>
      </>
    ),
    visual: <GatekeeperMock />,
  },
  {
    title: "Allow it in Privacy & Security",
    body: (
      <>
        Open <strong className="font-semibold text-fg">System Settings &rarr; Privacy &amp; Security</strong>,
        scroll to <em>Security</em>, and click <strong className="font-semibold text-fg">Open Anyway</strong>.
        Confirm with Touch ID, then click <strong className="font-semibold text-fg">Open Anyway</strong> once
        more. That&rsquo;s it &mdash; AndSpace launches.
      </>
    ),
    visual: <PrivacyMock />,
  },
];

/* ---------- page ---------- */

export function InstallGuide() {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [started, setStarted] = useState(false);

  const startDownload = useCallback(() => {
    const f = iframeRef.current;
    if (!f) return;
    // Reset first so repeated clicks always re-trigger the download.
    f.src = "about:blank";
    window.setTimeout(() => {
      if (iframeRef.current) iframeRef.current.src = RELEASE.dmgUrl;
    }, 40);
    setStarted(true);
  }, []);

  useEffect(() => {
    const t = window.setTimeout(startDownload, 700);
    return () => window.clearTimeout(t);
  }, [startDownload]);

  return (
    <>
      {/* hidden sink that performs the actual file download without leaving the page */}
      <iframe ref={iframeRef} title="AndSpace download" className="hidden" aria-hidden tabIndex={-1} />

      <header className="sticky top-0 z-50 border-b border-line-soft bg-ink-950/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 w-full max-w-page items-center justify-between px-6 lg:px-8">
          <Wordmark />
          <div className="flex items-center gap-2">
            <Link
              href={RELEASE.repoUrl}
              aria-label="GitHub"
              className="hidden h-9 w-9 items-center justify-center rounded-lg text-fg-muted transition-colors hover:bg-white/[0.05] hover:text-fg sm:flex"
            >
              <GithubIcon />
            </Link>
            <Link
              href="/"
              className="rounded-lg px-3 py-1.5 text-[13.5px] font-medium text-fg-muted transition-colors hover:text-fg"
            >
              Back to home
            </Link>
          </div>
        </div>
      </header>

      <main className="relative mx-auto w-full max-w-3xl px-6 pb-28 pt-16 lg:px-8">
        <div
          aria-hidden
          className="glow-cta pointer-events-none absolute left-1/2 top-0 -z-10 h-72 w-[42rem] -translate-x-1/2"
        />

        {/* hero */}
        <Reveal className="text-center">
          <div className="relative mx-auto mb-6 grid h-16 w-16 place-items-center">
            <span className="absolute inset-0 -z-10 rounded-2xl bg-violet-500/20 blur-xl animate-soft-pulse" />
            <span className="grid h-16 w-16 place-items-center rounded-2xl border border-violet/30 bg-gradient-to-b from-violet/[0.16] to-violet/[0.04] text-violet-200 shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]">
              <CheckIcon className="h-8 w-8" />
            </span>
          </div>
          <h1 className="text-balance text-[clamp(2rem,5vw,3rem)] font-semibold leading-[1.05] tracking-[-0.02em] text-fg">
            Thanks for downloading{" "}
            <span className="text-gradient-violet">AndSpace.</span>
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-[15.5px] leading-relaxed text-fg-muted">
            Your download is starting now. Because this alpha isn&rsquo;t notarized by Apple yet, macOS asks
            for your OK the first time you open it &mdash; about 20 seconds. Here&rsquo;s exactly how.
          </p>
        </Reveal>

        {/* download status card */}
        <Reveal delay={80} className="mt-9">
          <div className="rounded-2xl bg-gradient-to-b from-white/[0.1] to-white/[0.02] p-px shadow-[0_30px_90px_-50px_rgba(0,0,0,0.9)]">
            <div className="rounded-[15px] bg-gradient-to-b from-ink-800 to-ink-850 p-5">
              <div className="flex items-center gap-4">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-violet/25 bg-gradient-to-b from-violet/[0.16] to-violet/[0.04] text-violet-300">
                  <DownloadIcon className="h-5 w-5" />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="text-[14px] font-semibold text-fg">AndSpace {RELEASE.version}</div>
                  <div className="font-mono text-[12px] text-fg-faint">Apple Silicon &middot; .dmg</div>
                </div>
                <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-ok/25 bg-ok/[0.08] px-2.5 py-1 text-[11.5px] font-medium text-ok">
                  <CheckIcon className="h-3.5 w-3.5" />
                  {started ? "Download started" : "Starting…"}
                </span>
              </div>
              <div className="relative mt-4 h-1 overflow-hidden rounded-full bg-white/10">
                <div className="absolute inset-y-0 left-0 w-1/3 rounded-full bg-gradient-to-r from-violet-500 to-violet-400 animate-dl-shimmer" />
              </div>
              <p className="mt-3 text-[12.5px] text-fg-faint">
                Didn&rsquo;t start?{" "}
                <button
                  type="button"
                  onClick={startDownload}
                  className="font-medium text-violet-300 underline-offset-2 hover:underline"
                >
                  Download again
                </button>{" "}
                or grab it{" "}
                <Link
                  href={RELEASE.releasesUrl}
                  className="font-medium text-violet-300 underline-offset-2 hover:underline"
                >
                  from GitHub
                </Link>
                .
              </p>
            </div>
          </div>
        </Reveal>

        {/* steps */}
        <div className="mt-16">
          <Reveal className="text-center">
            <h2 className="text-[clamp(1.4rem,3vw,1.9rem)] font-semibold tracking-[-0.02em] text-fg">
              Open it for the first time
            </h2>
            <p className="mt-2 text-[14px] text-fg-muted">Three quick steps &mdash; you only do this once.</p>
          </Reveal>

          <ol className="mt-9 space-y-4">
            {STEPS.map((s, i) => (
              <Reveal as="li" key={s.title} delay={i * 90}>
                <div className="rounded-2xl border border-line bg-ink-900/60 p-5 transition-colors hover:border-line-strong sm:p-6">
                  <div className="grid items-center gap-6 sm:grid-cols-[1fr_auto]">
                    <div>
                      <div className="flex items-center gap-3">
                        <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-gradient-to-b from-violet-400 to-violet-600 text-[12.5px] font-bold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.25)]">
                          {i + 1}
                        </span>
                        <h3 className="text-[16px] font-semibold tracking-tight text-fg">{s.title}</h3>
                      </div>
                      <p className="mt-3 max-w-md text-[13.5px] leading-relaxed text-fg-muted">{s.body}</p>
                    </div>
                    <div className="sm:w-[270px]">{s.visual}</div>
                  </div>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>

        {/* terminal alternative */}
        <Reveal delay={40} className="mt-6">
          <details className="group rounded-2xl border border-line bg-ink-900/60 p-5 transition-colors open:border-violet/30 [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex cursor-pointer select-none list-none items-center gap-2.5 text-[14px] font-semibold text-fg-muted outline-none hover:text-fg">
              <TerminalIcon className="h-4 w-4 text-violet-300" />
              Prefer the terminal? One command instead.
              <ArrowRightIcon className="ml-auto h-4 w-4 text-fg-faint transition-transform group-open:rotate-90" />
            </summary>
            <p className="mt-3.5 text-[13px] leading-relaxed text-fg-muted">
              Drag AndSpace to Applications, then run this to clear the quarantine flag and open it directly:
            </p>
            <div className="mt-3 flex items-center gap-2 rounded-xl border border-line bg-ink-950/70 px-3 py-2.5">
              <code className="min-w-0 flex-1 overflow-x-auto whitespace-nowrap font-mono text-[12.5px] text-fg">
                {QUARANTINE_CMD}
              </code>
              <CopyButton text={QUARANTINE_CMD} />
            </div>
          </details>
        </Reveal>

        {/* reassurance */}
        <Reveal delay={60} className="mt-6">
          <div className="flex items-start gap-3 rounded-2xl border border-line bg-ink-900/40 p-5 text-[13px] leading-relaxed text-fg-muted">
            <LockIcon className="mt-0.5 h-4 w-4 shrink-0 text-violet-300" />
            <p>
              <strong className="font-semibold text-fg">Why the warning?</strong> AndSpace is an open-source
              alpha that isn&rsquo;t notarized by Apple yet. The full source is on{" "}
              <Link href={RELEASE.repoUrl} className="text-violet-300 underline-offset-2 hover:underline">
                GitHub
              </Link>
              , it runs entirely on your machine, and it ships no telemetry. You only have to allow it once.
            </p>
          </div>
        </Reveal>

        {/* footer */}
        <div className="mt-12 flex flex-col items-center gap-3 text-center">
          <Button href="/" variant="ghost">
            Back to home
          </Button>
          <p className="text-[12px] text-fg-faint">
            Stuck? Open an issue on{" "}
            <Link href={RELEASE.issuesUrl} className="text-violet-300 underline-offset-2 hover:underline">
              GitHub
            </Link>
            .
          </p>
        </div>
      </main>
    </>
  );
}
