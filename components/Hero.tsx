import { ScreenshotFrame } from "./ScreenshotFrame";
import { FloatingPalette } from "./FloatingPalette";
import { HeroMesh } from "./HeroMesh";
import { Reveal } from "./Reveal";
import { Button, Pill } from "./ui";
import {
  AppleIcon,
  PlayIcon,
  TerminalIcon,
  CommandIcon,
  WifiOffIcon,
  ShieldIcon,
} from "./icons";

const CHIPS = [
  { icon: <TerminalIcon className="h-3.5 w-3.5" />, label: "Native macOS" },
  { icon: <CommandIcon className="h-3.5 w-3.5" />, label: "Local CLIs" },
  { icon: <WifiOffIcon className="h-3.5 w-3.5" />, label: "Offline-first" },
  { icon: <ShieldIcon className="h-3.5 w-3.5" />, label: "Command Guard" },
];

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden pb-20 pt-14 sm:pt-20">
      {/* mesh-gradient shader band (Paper / shaders.com) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -top-16 -z-10 h-[1104px]"
      >
        <div className="absolute inset-0">
          <HeroMesh className="h-full w-full opacity-90" />
        </div>
        {/* readability vignette so the headline reads cleanly over the flow */}
        <div className="absolute inset-0 bg-[radial-gradient(58%_46%_at_50%_30%,transparent,rgba(10,10,12,0.55))]" />
        <div className="absolute inset-x-0 bottom-0 h-96 bg-gradient-to-b from-transparent via-ink-900/80 to-ink-900" />
      </div>

      {/* copy */}
      <div className="mx-auto max-w-4xl px-6 text-center lg:px-8">
        <Reveal>
          <Pill className="shadow-[0_0_30px_-8px_rgba(124,58,237,0.6)]">
            <span className="h-1.5 w-1.5 rounded-full bg-violet-400 shadow-[0_0_8px_rgba(167,139,250,0.9)]" />
            v0.1.0-alpha.4 — now for Apple Silicon
          </Pill>
        </Reveal>

        <Reveal delay={60}>
          <h1 className="mt-6 text-balance text-[clamp(2.7rem,6vw,4.6rem)] font-semibold leading-[1.02] tracking-[-0.03em] text-fg">
            The terminal built around
            <br className="hidden sm:block" /> your{" "}
            <span className="text-gradient-violet-sheen">workflow.</span>
          </h1>
        </Reveal>

        <Reveal delay={120}>
          <p className="mx-auto mt-6 max-w-[42rem] text-[clamp(1.05rem,1.6vw,1.3rem)] leading-relaxed text-fg-muted">
            <span className="font-semibold text-fg">
              Project-aware. AI-ready. Delightfully fast.
            </span>
            <br className="hidden sm:block" />
            A macOS terminal that brings commands, files, scripts, local servers, Git changes, and AI CLIs into one focused workspace.
          </p>
        </Reveal>

        <Reveal delay={180}>
          <div>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
              <Button href="https://github.com/SetFodi/Andspace/releases/tag/v0.1.0-alpha.4" size="lg">
                <AppleIcon className="h-4 w-4" />
                Download for macOS
              </Button>
              <Button href="#demo" variant="ghost" size="lg">
                <PlayIcon className="h-3.5 w-3.5" />
                Watch Demo
              </Button>
            </div>
            <p className="mt-3 text-[12.5px] font-medium text-violet-400">
              AndSpace v0.1.0-alpha.4 is now available for macOS.
            </p>
          </div>
        </Reveal>

        <Reveal delay={240}>
          <ul className="mt-8 flex flex-wrap items-center justify-center gap-2.5">
            {CHIPS.map((chip) => (
              <li
                key={chip.label}
                className="inline-flex items-center gap-2 rounded-full border border-line bg-white/[0.02] px-3 py-1.5 text-[12.5px] font-medium text-fg-muted backdrop-blur-sm"
              >
                <span className="text-violet-400/80">{chip.icon}</span>
                {chip.label}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>

      {/* big product shot with floating palette */}
      <div className="mx-auto mt-16 max-w-[1280px] px-6 lg:px-8">
        <Reveal delay={150} effect="screenshot">
          <ScreenshotFrame
            src="/app-hero.png"
            alt="AndSpace terminal with project sidebar, split panes running bun dev, and a command palette open"
            width={3164}
            height={2070}
            priority
            glow="lg"
            sizes="(max-width: 1280px) 100vw, 1280px"
          >
            {/* Overlay only where the frame is tall enough to hold the palette.
                On phones the clean app screenshot stands on its own. */}
            <div className="absolute inset-0 z-10 hidden md:block">
              <div
                aria-hidden
                className="absolute inset-0 bg-ink-950/60"
              />
              <div className="absolute inset-0 grid place-items-center p-6">
                <FloatingPalette />
              </div>
            </div>
          </ScreenshotFrame>
        </Reveal>
      </div>
    </section>
  );
}
