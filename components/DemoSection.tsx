import { ScreenshotFrame } from "./ScreenshotFrame";
import { Reveal } from "./Reveal";
import { Section, Eyebrow, Kbd, Button } from "./ui";
import { PlayIcon, ArrowRightIcon, AppleIcon } from "./icons";

const DEMO_STEPS = [
  "Restore a split workspace",
  "Run a dev server",
  "Open the command palette",
  "Catch a risky command",
  "Send context to a local AI CLI",
  "Inspect a read-only Git diff",
];

export function DemoSection() {
  return (
    <Section id="demo" className="py-20 sm:py-28">
      <div className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        <Reveal>
          <Eyebrow>Demo flow</Eyebrow>
          <h2 className="text-balance text-[clamp(1.9rem,3.8vw,2.8rem)] font-semibold leading-[1.08] tracking-[-0.02em] text-fg">
            A 45-second pass through the real app.
          </h2>
          <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-fg-muted">
            The alpha demo is intentionally direct: open a project, run a local
            server, use keyboard-first workflow actions, and inspect changes
            without leaving the terminal.
          </p>

          <div className="mt-7 space-y-2.5">
            {DEMO_STEPS.map((step, index) => (
              <div
                key={step}
                className="flex items-center gap-3 rounded-xl border border-white/[0.08] bg-white/[0.025] px-3.5 py-3 text-sm text-fg-muted"
              >
                <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-violet/25 bg-violet/[0.1] font-mono text-[11px] text-violet-300">
                  {index + 1}
                </span>
                <span>{step}</span>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button href="https://github.com/SetFodi/Andspace/releases/tag/v0.1.0-alpha.5">
              <AppleIcon className="h-4 w-4" />
              Download alpha
            </Button>
            <span className="inline-flex items-center gap-2 text-[13px] text-fg-faint">
              <Kbd>⌘</Kbd>
              <Kbd>K</Kbd>
              <ArrowRightIcon className="h-3.5 w-3.5 text-violet-400" />
              start anywhere
            </span>
          </div>
        </Reveal>

        <Reveal delay={100} effect="screenshot">
          <ScreenshotFrame
            src="/app-hero.png"
            alt="AndSpace demo flow screenshot showing a restored workspace with sidebar and split terminal panes"
            width={3164}
            height={2070}
            glow="md"
            sizes="(max-width: 1024px) 100vw, 680px"
          >
            <div className="absolute inset-0 grid place-items-center bg-ink-950/45">
              <div className="inline-flex items-center gap-3 rounded-full border border-white/15 bg-ink-900/80 px-5 py-3 text-sm font-semibold text-fg shadow-[0_20px_80px_-24px_rgba(0,0,0,0.9)] backdrop-blur">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-violet text-white shadow-[0_0_24px_rgba(139,92,246,0.5)]">
                  <PlayIcon className="ml-0.5 h-4 w-4" />
                </span>
                Demo video flow
              </div>
            </div>
          </ScreenshotFrame>
        </Reveal>
      </div>
    </Section>
  );
}
