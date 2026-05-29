import type { ReactNode } from "react";
import { Section, Eyebrow, Kbd } from "./ui";
import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";
import {
  ShieldIcon,
  SparkIcon,
  SidebarIcon,
  ServerIcon,
  CommandIcon,
  BoltIcon,
  ArrowRightIcon,
} from "./icons";

/* ---- shared bento shell ---- */
function Bento({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={cn(
        "group relative rounded-[20px] bg-gradient-to-b from-white/[0.09] to-white/[0.015] p-px transition-[transform,background,box-shadow] duration-300 hover:-translate-y-0.5 hover:from-violet/40 hover:to-white/[0.05] hover:shadow-[0_24px_60px_-30px_rgba(124,58,237,0.5)]",
        className
      )}
    >
      <div className="relative flex h-full flex-col overflow-hidden rounded-[19px] bg-gradient-to-b from-ink-800 to-ink-850">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-[radial-gradient(circle,rgba(167,139,250,0.16)_0%,transparent_72%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        />
        {children}
      </div>
    </div>
  );
}

function Head({
  icon,
  title,
  children,
}: {
  icon: ReactNode;
  title: string;
  children: ReactNode;
}) {
  return (
    <div>
      <div className="mb-3.5 inline-flex h-10 w-10 items-center justify-center rounded-xl border border-violet/25 bg-gradient-to-b from-violet/[0.16] to-violet/[0.04] text-violet-400 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]">
        {icon}
      </div>
      <h3 className="text-[15.5px] font-semibold tracking-tight text-fg">
        {title}
      </h3>
      <p className="mt-1.5 text-[13.5px] leading-relaxed text-fg-muted">
        {children}
      </p>
    </div>
  );
}

/* tiny mono panel used inside several visuals */
function Panel({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={cn(
        "rounded-xl border border-line bg-ink-900/70 font-mono text-[11.5px] leading-relaxed",
        className
      )}
    >
      {children}
    </div>
  );
}

function AiPill({ children }: { children: ReactNode }) {
  return (
    <span className="rounded-md border border-white/10 bg-white/[0.03] px-2 py-0.5 text-[10.5px] text-fg-muted">
      {children}
    </span>
  );
}

export function Features() {
  return (
    <Section id="features" className="py-20 sm:py-28">
      <Reveal className="mx-auto max-w-2xl text-center">
        <div className="flex justify-center">
          <Eyebrow>What makes it different</Eyebrow>
        </div>
        <h2 className="text-balance text-[clamp(1.9rem,3.8vw,2.9rem)] font-semibold leading-[1.08] tracking-[-0.02em] text-fg">
          A terminal that understands the project,
          <br className="hidden sm:block" /> not just the prompt.
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-fg-muted">
          Six things AndSpace does that your default terminal doesn&apos;t — each
          built to keep you in flow and out of trouble.
        </p>
      </Reveal>

      <div className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-6">
        {/* AI handoff — large */}
        <Reveal className="lg:col-span-3" delay={0}>
          <Bento className="h-full">
            <div className="flex h-full flex-col p-6">
              <Head icon={<SparkIcon />} title="AI handoff with ⌘E">
                Send the live command, its output, and your project context to a
                local Claude, Codex, or Cursor CLI — secrets stripped first.
              </Head>
              <div className="mt-auto space-y-2 pt-6">
                <div className="flex items-center gap-2 font-mono text-[11.5px] text-fg-muted">
                  <span className="flex gap-1">
                    <Kbd>⌘</Kbd>
                    <Kbd>E</Kbd>
                  </span>
                  <ArrowRightIcon className="h-3.5 w-3.5 text-violet-400" />
                  <span className="text-fg-faint">bundle &amp; hand off</span>
                </div>
                <Panel className="p-2.5 text-fg-muted">
                  <div>
                    <span className="text-fg-faint">$</span> bun run build
                  </div>
                  <div className="text-rose-300/80">exit code: 1</div>
                  <div className="text-fg-faint">
                    API_KEY=
                    <span className="ml-0.5 rounded bg-white/[0.06] px-1 text-fg-faint">
                      •••• redacted
                    </span>
                  </div>
                </Panel>
                <div className="flex items-center gap-1.5 pt-0.5">
                  <span className="text-[10.5px] text-fg-faint">→</span>
                  <AiPill>Claude</AiPill>
                  <AiPill>Codex</AiPill>
                  <AiPill>Cursor</AiPill>
                </div>
              </div>
            </div>
          </Bento>
        </Reveal>

        {/* Command Guard — large */}
        <Reveal className="lg:col-span-3" delay={80}>
          <Bento className="h-full">
            <div className="flex h-full flex-col p-6">
              <Head icon={<ShieldIcon />} title="Command Guard">
                Risky commands — <span className="font-mono">rm -rf</span>, force
                pushes, prod migrations — pause for one clear confirmation before
                they ever touch your machine.
              </Head>
              <div className="mt-auto pt-6 font-mono text-[11.5px]">
                <div className="text-fg-faint">
                  $ <span className="text-fg-muted">rm -rf ./dist ./node_modules</span>
                </div>
                <Panel className="mt-2 border-rose-500/30 bg-rose-500/[0.06] p-2.5">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-rose-300/90">
                      <ShieldIcon className="h-3 w-3" /> Command Guard
                    </span>
                    <span className="rounded border border-rose-500/40 px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-rose-300/90">
                      Destructive
                    </span>
                  </div>
                  <p className="mt-1.5 text-[11px] text-fg-muted">
                    Recursively deletes two folders and can&apos;t be undone.
                  </p>
                </Panel>
              </div>
            </div>
          </Bento>
        </Reveal>

        {/* Project sidebar — medium */}
        <Reveal className="lg:col-span-2" delay={0}>
          <Bento className="h-full">
            <div className="flex h-full flex-col p-6">
              <Head icon={<SidebarIcon />} title="Project sidebar">
                Files, scripts, and live servers for the folder you&apos;re in —
                one keystroke away, never in your way.
              </Head>
              <Panel className="mt-auto p-3 text-fg-muted">
                <div className="text-[9.5px] font-semibold uppercase tracking-wider text-fg-faint">
                  Files
                </div>
                <div className="mt-1 space-y-0.5 pl-1">
                  <div>app</div>
                  <div>components</div>
                  <div className="text-fg-faint">package.json</div>
                </div>
                <div className="mt-2.5 text-[9.5px] font-semibold uppercase tracking-wider text-fg-faint">
                  Servers
                </div>
                <div className="mt-1 flex items-center gap-2 pl-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-ok shadow-[0_0_6px_1px] shadow-ok/50" />
                  :3000 <span className="text-fg-faint">Next.js</span>
                </div>
              </Panel>
            </div>
          </Bento>
        </Reveal>

        {/* Command palette — medium */}
        <Reveal className="lg:col-span-2" delay={80}>
          <Bento className="h-full">
            <div className="flex h-full flex-col p-6">
              <Head icon={<CommandIcon />} title="Command palette">
                Tabs, splits, scripts, sidebar focus — every action in one{" "}
                <span className="font-mono">⌘K</span> palette that knows your
                project.
              </Head>
              <Panel className="mt-auto p-2.5">
                <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-ink-950/60 px-2 py-1.5">
                  <span className="text-violet-400">›</span>
                  <span className="text-fg-faint">type a command…</span>
                  <span className="ml-auto flex gap-1">
                    <Kbd>⌘</Kbd>
                    <Kbd>K</Kbd>
                  </span>
                </div>
                <div className="mt-1.5 space-y-1 px-1">
                  <div className="flex justify-between">
                    <span className="text-fg-muted">New Tab</span>
                    <span className="text-[9px] uppercase tracking-wider text-violet-400/70">
                      Terminal
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-fg-muted">Toggle Sidebar</span>
                    <span className="text-[9px] uppercase tracking-wider text-fg-faint">
                      Project
                    </span>
                  </div>
                </div>
              </Panel>
            </div>
          </Bento>
        </Reveal>

        {/* Live server detection — medium */}
        <Reveal className="lg:col-span-2" delay={160}>
          <Bento className="h-full">
            <div className="flex h-full flex-col p-6">
              <Head icon={<ServerIcon />} title="Live server detection">
                AndSpace reads localhost URLs straight from your output — no port
                scanning, no polling. Open or copy instantly.
              </Head>
              <div className="mt-auto space-y-2 font-mono text-[11.5px]">
                {[
                  { url: "localhost:3000", label: "Next.js" },
                  { url: "localhost:5173", label: "Vite" },
                ].map((s) => (
                  <div
                    key={s.url}
                    className="flex items-center gap-2 rounded-lg border border-line bg-ink-900/70 px-2.5 py-1.5"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-ok shadow-[0_0_6px_1px] shadow-ok/50" />
                    <span className="text-fg-muted">{s.url}</span>
                    <span className="text-fg-faint">{s.label}</span>
                    <span className="ml-auto inline-flex items-center gap-1 text-violet-400">
                      Open <ArrowRightIcon className="h-3 w-3" />
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </Bento>
        </Reveal>

        {/* WebGL-fast — wide banner */}
        <Reveal className="md:col-span-2 lg:col-span-6" delay={0}>
          <Bento>
            <div className="flex flex-col gap-7 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-7">
              <div className="max-w-md">
                <Head icon={<BoltIcon />} title="WebGL-fast">
                  A GPU-accelerated renderer with idle-aware repaints. Near-zero
                  CPU while you read, full speed when output floods in.
                </Head>
              </div>
              <div className="flex shrink-0 gap-3">
                {[
                  { stat: "≈0%", label: "idle CPU" },
                  { stat: "120", label: "fps repaint" },
                  { stat: "GPU", label: "pipeline" },
                ].map((m) => (
                  <div
                    key={m.label}
                    className="rounded-xl border border-line bg-ink-900/60 px-4 py-3 text-center"
                  >
                    <div className="text-[22px] font-semibold tabular-nums text-fg">
                      {m.stat}
                    </div>
                    <div className="mt-0.5 text-[10px] uppercase tracking-wider text-fg-faint">
                      {m.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Bento>
        </Reveal>
      </div>
    </Section>
  );
}
