import { Reveal } from "./Reveal";
import { Section, Eyebrow, Kbd, Button } from "./ui";
import { VideoPlayer } from "./VideoPlayer";
import { ArrowRightIcon, AppleIcon, PlayIcon } from "./icons";

const DEMO_STEPS = [
  "Restore a split workspace",
  "Run a dev server",
  "Preview localhost in AndSpace",
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
            Watch AndSpace in motion.
          </h2>
          <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-fg-muted">
            A short alpha walkthrough: restored workspace, local server
            detection, Local Preview, command palette, Command Guard, AI
            handoff, and read-only Git diff preview.
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
            <Button href="/andspace.mp4">
              <PlayIcon className="h-4 w-4" />
              Open video
            </Button>
            <Button
              href="https://github.com/SetFodi/Andspace/releases/download/v0.1.0-alpha.8/AndSpace_0.1.0-alpha.8_aarch64.dmg"
              variant="ghost"
            >
              <AppleIcon className="h-4 w-4" />
              Download for macOS
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
          <div className="relative">
            <div
              aria-hidden
              className="glow-violet-frame-md pointer-events-none absolute left-1/2 top-0 -z-10 h-56 w-4/5 -translate-x-1/2 opacity-70"
            />
            <div className="rounded-2xl bg-gradient-to-b from-white/[0.14] via-white/[0.05] to-white/[0.02] p-px shadow-[0_40px_120px_-40px_rgba(0,0,0,0.95)]">
              <VideoPlayer
                src="/andspace.mp4"
                poster="/app-hero.png"
                label="AndSpace alpha demo video"
              />
            </div>
            <div
              aria-hidden
              className="glow-floor pointer-events-none absolute inset-x-8 -bottom-6 -z-10 h-12"
            />
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
