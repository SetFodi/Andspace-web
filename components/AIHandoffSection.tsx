import { Spotlight } from "./Spotlight";
import { Kbd } from "./ui";
import { SparkIcon } from "./icons";

function HandoffMock() {
  return (
    <div className="relative">
      <div
        className="glow-panel-bl pointer-events-none absolute -inset-6 -z-10 rounded-[28px]"
        aria-hidden
      />
      <div className="overflow-hidden rounded-2xl border border-line-strong bg-ink-900 shadow-panel">
        <div className="flex items-center gap-2.5 border-b border-line-soft bg-ink-800 px-4 py-3">
          <span className="grid h-6 w-6 place-items-center rounded-md border border-violet/25 bg-violet/[0.1] text-violet-400">
            <SparkIcon className="h-3.5 w-3.5" />
          </span>
          <span className="text-[12.5px] font-semibold text-fg">Send context</span>
          <span className="ml-auto flex items-center gap-1 text-[11px] text-fg-faint">
            <Kbd>⌘E</Kbd>
          </span>
        </div>

        <div className="px-4 pt-4">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-fg-faint">
              Prompt preview
            </span>
            <span className="rounded-md border border-ok/25 bg-ok/[0.08] px-2 py-0.5 text-[10px] font-semibold text-ok">
              2 secrets redacted
            </span>
          </div>
          <div className="space-y-1 rounded-xl border border-line bg-ink-850 p-3.5 font-mono text-[11px] leading-relaxed">
            <div className="text-fg-faint"># cwd: ~/dev/acme</div>
            <div className="text-fg-muted">
              $ <span className="text-fg">bun run build</span>
            </div>
            <div className="text-[#f87171]">exit code: 1</div>
            <div className="text-fg-muted">
              error: Cannot find module &apos;@/lib/auth&apos;
            </div>
            <div className="text-fg-faint">
              API_KEY=
              <span className="rounded bg-white/[0.06] px-1">
                ••••••••redacted
              </span>
            </div>
            <div className="text-fg-faint">
              Authorization: Bearer{" "}
              <span className="rounded bg-white/[0.06] px-1">••••redacted</span>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 px-4 py-4">
          <span className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-b from-violet-400 to-violet-600 px-3 py-1.5 text-[12px] font-semibold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]">
            Send to Claude
          </span>
          <span className="rounded-lg border border-line-strong bg-white/[0.02] px-3 py-1.5 text-[12px] font-semibold text-fg-muted">
            Send to Codex
          </span>
          <span className="rounded-lg border border-line-strong bg-white/[0.02] px-3 py-1.5 text-[12px] font-semibold text-fg-muted">
            Send to Cursor
          </span>
          <span className="ml-auto rounded-lg px-2.5 py-1.5 text-[12px] font-medium text-fg-faint">
            Copy prompt
          </span>
        </div>
      </div>
    </div>
  );
}

export function AIHandoffSection() {
  return (
    <Spotlight
      id="ai-handoff"
      eyebrow="AI Handoff"
      title={
        <>
          One key sends the whole
          <br className="hidden sm:block" /> situation to your AI.
        </>
      }
      flip
      banded
      bullets={[
        "Local CLIs only — nothing calls a provider API for you",
        "API keys and bearer tokens redacted before anything leaves",
        "The prompt never lands in your shell history",
      ]}
      visual={<HandoffMock />}
    >
      <p>
        Press <span className="font-mono text-violet-400">⌘E</span> and AndSpace
        packages the command you ran, its exit code, the recent output, any
        selected text, and your{" "}
        <span className="font-mono text-violet-400">ANDSPACE.md</span> context
        into a clean prompt — then hands it to your local Claude, Codex, or
        Cursor CLI in a split pane.
      </p>
      <p>
        It runs entirely on your machine. You can preview the exact prompt before
        it&apos;s sent, every time.
      </p>
    </Spotlight>
  );
}
