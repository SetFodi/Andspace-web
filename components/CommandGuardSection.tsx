import { Spotlight } from "./Spotlight";
import { Kbd } from "./ui";
import { ShieldIcon, CheckIcon } from "./icons";

function GuardDialogMock() {
  return (
    <div className="relative">
      <div
        className="glow-panel-tr pointer-events-none absolute -inset-6 -z-10 rounded-[28px]"
        aria-hidden
      />
      <div className="overflow-hidden rounded-2xl border border-line-strong bg-ink-900 shadow-panel">
        <div className="flex items-center gap-2 border-b border-line-soft bg-ink-800 px-4 py-2.5">
          <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
          <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
          <span className="h-3 w-3 rounded-full bg-[#28c840]" />
          <span className="ml-2 font-mono text-[10.5px] text-fg-faint">
            zsh — ~/dev/acme
          </span>
        </div>
        <div className="relative p-5">
          <div className="select-none font-mono text-[11.5px] leading-relaxed text-fg-faint/60 blur-[0.5px]">
            <div>$ git push --force origin main</div>
            <div>$ rm -rf ./dist ./node_modules</div>
          </div>

          <div className="mt-3 overflow-hidden rounded-xl border border-[#ef4444]/30 bg-ink-800 shadow-[0_0_0_1px_rgba(239,68,68,0.15),0_30px_80px_-30px_rgba(0,0,0,0.9)]">
            <div className="flex items-center gap-2.5 border-b border-line-soft bg-[#ef4444]/[0.08] px-4 py-2.5">
              <span className="grid h-6 w-6 place-items-center rounded-md bg-[#ef4444]/15 text-[#f87171]">
                <ShieldIcon className="h-3.5 w-3.5" />
              </span>
              <span className="text-[12.5px] font-semibold text-fg">
                Command Guard
              </span>
              <span className="ml-auto rounded-md border border-[#ef4444]/30 bg-[#ef4444]/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-[#f87171]">
                Destructive
              </span>
            </div>
            <div className="px-4 py-3.5">
              <code className="block rounded-lg border border-line bg-ink-900 px-3 py-2 font-mono text-[12px] text-fg">
                rm -rf ./dist ./node_modules
              </code>
              <p className="mt-3 text-[12.5px] leading-relaxed text-fg-muted">
                This recursively deletes two directories and can&apos;t be undone.
                Run it anyway?
              </p>
              <div className="mt-4 flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-b from-violet-400 to-violet-600 px-3.5 py-1.5 text-[12.5px] font-semibold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]">
                  <CheckIcon className="h-3.5 w-3.5" />
                  Run command
                </span>
                <span className="rounded-lg border border-line-strong bg-white/[0.02] px-3.5 py-1.5 text-[12.5px] font-semibold text-fg-muted">
                  Cancel
                </span>
                <span className="ml-auto flex items-center gap-1 text-[11px] text-fg-faint">
                  <Kbd>↵</Kbd> confirm · <Kbd>esc</Kbd> cancel
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function CommandGuardSection() {
  return (
    <Spotlight
      id="command-guard"
      eyebrow="Command Guard"
      title={
        <>
          Catch the dangerous commands
          <br className="hidden sm:block" /> before they run.
        </>
      }
      bullets={[
        "Plain-English explanation of what's about to happen",
        "Always the highest-priority prompt — nothing dismisses it for you",
        "Tuned for real footguns, quiet on everything safe",
      ]}
      visual={<GuardDialogMock />}
    >
      <p>
        AndSpace recognizes destructive patterns — recursive deletes, force
        pushes, dropping a database, piping curl into a shell — and pauses for
        one clear confirmation. It explains what the command does in plain
        language, so a tired late-night paste never becomes a disaster.
      </p>
    </Spotlight>
  );
}
