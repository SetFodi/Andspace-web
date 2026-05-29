import { Section, Button } from "./ui";
import { Reveal } from "./Reveal";
import { AppleIcon, GithubIcon, LockIcon } from "./icons";

export function FinalCTA() {
  return (
    <Section id="download" className="py-24 sm:py-32">
      <Reveal>
        <div className="relative overflow-hidden rounded-[28px] border border-violet/20 bg-gradient-to-b from-ink-750 to-ink-900 px-6 py-16 text-center shadow-glow sm:px-12">
          <div
            className="glow-cta pointer-events-none absolute -top-24 left-1/2 h-64 w-[36rem] -translate-x-1/2"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.04] [background-image:radial-gradient(white_1px,transparent_1px)] [background-size:22px_22px]"
            aria-hidden
          />
          <div className="relative">
            <h2 className="mx-auto max-w-2xl text-balance text-[clamp(2rem,4.2vw,3.1rem)] font-semibold leading-[1.06] tracking-[-0.02em] text-fg">
              Give your terminal a sense of{" "}
              <span className="text-gradient-violet">place.</span>
            </h2>
            <p className="mx-auto mt-5 max-w-lg text-[15.5px] leading-relaxed text-fg-muted">
              AndSpace is a free alpha for Apple Silicon. Native, offline-first,
              and quietly fast. No account required.
            </p>

            <div className="mt-9">
              <div className="flex flex-wrap items-center justify-center gap-3">
                <Button href="https://github.com/SetFodi/Andspace/releases/tag/v0.1.0-alpha.3" size="lg">
                  <AppleIcon className="h-4 w-4" />
                  Download for macOS
                </Button>
                <Button href="https://github.com/SetFodi/Andspace" variant="ghost" size="lg">
                  <GithubIcon className="h-4 w-4" />
                  View on GitHub
                </Button>
              </div>
              <p className="mt-3 text-[12.5px] font-medium text-violet-400">
                AndSpace v0.1.0-alpha.3 is now available for macOS.
              </p>
            </div>

            <div className="mt-7 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[12.5px] text-fg-faint">
              <span className="inline-flex items-center gap-1.5">
                <LockIcon className="h-3.5 w-3.5" /> Runs entirely on your machine
              </span>
              <span>macOS 13+ · Apple Silicon</span>
              <span>v0.1.0-alpha.3</span>
            </div>

            {/* Spec limits, installation guardrails, and Checksum accordion */}
            <details className="mx-auto mt-8 max-w-lg rounded-xl border border-white/10 bg-white/[0.02] p-4 text-left font-sans text-[13px] transition-all duration-300 open:border-violet/30 [&_summary]:cursor-pointer">
              <summary className="font-semibold text-fg-muted hover:text-fg select-none outline-none">
                Release specifications & limitations
              </summary>
              <div className="mt-3 space-y-2.5 text-fg-faint leading-relaxed border-t border-white/[0.06] pt-3">
                <div>
                  <strong className="text-fg-muted">Platform Focus:</strong> Early alpha build. macOS first (Apple Silicon), optimized for zsh.
                </div>
                <div>
                  <strong className="text-fg-muted">Notarization Note:</strong> Prerelease alpha is not notarized yet — you may need to right-click to open or allow it in macOS Privacy & Security after launching.
                </div>
                <div>
                  <strong className="text-fg-muted">Security & Costs:</strong> Zero provider API integrations or hidden telemetry. Uses only your own local AI CLIs (Claude, Codex, Cursor CLIs). No account required and no API billing.
                </div>
                <div>
                  <strong className="text-fg-muted">Scope of Control:</strong> Read-only Git changes and visual diff previews. To guarantee safety, AndSpace has no Git write actions, no built-in editor (code editing remains in your local IDE), and no embedded browser previews.
                </div>
                <div className="pt-2.5 border-t border-white/[0.04] font-mono text-[11px] break-all">
                  <strong className="font-sans text-[12px] text-fg-muted">SHA-256 Checksums:</strong>
                  <br />
                  ZIP: 2b12be781dbc85dbc80527ffba2110d9f2c804588c782158acc95e631a896e3a
                  <br />
                  DMG: c95fa512a686b68961ad04594ad44bd8c7743f7117967cc60843c73a26c4d43d
                </div>
              </div>
            </details>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
