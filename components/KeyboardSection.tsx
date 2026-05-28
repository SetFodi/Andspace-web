import { Section, Eyebrow, Kbd } from "./ui";
import { Reveal } from "./Reveal";
import { ShowcaseShot } from "./ShowcaseShot";

const HIGHLIGHTS: { keys: string[]; label: string }[] = [
  { keys: ["⌘", "K"], label: "Command palette" },
  { keys: ["⌘", "E"], label: "AI handoff" },
  { keys: ["⌘", "B"], label: "Toggle sidebar" },
  { keys: ["⌘", "O"], label: "Split right" },
  { keys: ["⌘", "/"], label: "Cheatsheet" },
];

export function KeyboardSection() {
  return (
    <Section id="keyboard" className="py-20 sm:py-28">
      <Reveal className="mx-auto max-w-2xl text-center">
        <div className="flex justify-center">
          <Eyebrow>Keyboard-first</Eyebrow>
        </div>
        <h2 className="text-balance text-[clamp(1.9rem,3.8vw,2.9rem)] font-semibold leading-[1.08] tracking-[-0.02em] text-fg">
          Built for hands that never
          <br className="hidden sm:block" /> leave the keyboard.
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-fg-muted">
          Every action has a binding, and a Neovim-style cheatsheet (<Kbd>⌘</Kbd>{" "}
          <Kbd>/</Kbd>) is always a keystroke away when you forget one.
        </p>
      </Reveal>

      <Reveal delay={120} className="mt-9 flex flex-wrap justify-center gap-2.5">
        {HIGHLIGHTS.map((h) => (
          <span
            key={h.label}
            className="inline-flex items-center gap-2 rounded-full border border-line bg-white/[0.02] px-3 py-1.5 text-[12.5px] font-medium text-fg-muted"
          >
            <span className="flex items-center gap-1">
              {h.keys.map((k) => (
                <Kbd key={k}>{k}</Kbd>
              ))}
            </span>
            {h.label}
          </span>
        ))}
      </Reveal>

      <Reveal delay={160} className="mx-auto mt-12 max-w-5xl">
        <ShowcaseShot
          src="/58d6436a-6ea9-474b-84f1-4113ad10737b.png"
          alt="AndSpace keyboard shortcut cheatsheet grouped into Tabs & Panes, Sidebar & Files, AI & Workflows, and General"
          width={1672}
          height={941}
          glow="lg"
          sizes="(max-width: 1280px) 100vw, 1280px"
        />
      </Reveal>
    </Section>
  );
}
