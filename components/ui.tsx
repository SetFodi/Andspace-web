import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export { Button };

/* ---- Keyboard key ---- */
export function Kbd({ children }: { children: ReactNode }) {
  return (
    <kbd className="inline-flex min-w-[1.55rem] items-center justify-center rounded-[7px] border border-white/12 bg-gradient-to-b from-white/[0.07] to-white/[0.02] px-1.5 py-0.5 font-mono text-[11px] font-medium text-fg-muted shadow-[0_1px_0_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.06)]">
      {children}
    </kbd>
  );
}

/* ---- Pill / badge ---- */
export function Pill({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-violet/25 bg-violet/[0.08] px-3.5 py-1.5 text-[12.5px] font-medium text-violet-400 backdrop-blur-sm",
        className
      )}
    >
      {children}
    </span>
  );
}

/* ---- Eyebrow / section label ---- */
export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <div className="mb-3 inline-flex items-center gap-2.5 text-[12px] font-semibold uppercase tracking-[0.18em] text-violet-400">
      <span className="h-px w-7 bg-gradient-to-r from-violet/0 to-violet/70" />
      {children}
    </div>
  );
}

/* ---- Gradient-hairline card (shadcn-ish surface) ---- */
export function GradientCard({
  children,
  className,
  innerClassName,
  hover = false,
}: {
  children: ReactNode;
  className?: string;
  innerClassName?: string;
  hover?: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl bg-gradient-to-b from-white/[0.1] to-white/[0.02] p-px",
        hover &&
          "transition-all duration-300 hover:from-violet/40 hover:to-white/[0.04]",
        className
      )}
    >
      <div
        className={cn(
          "h-full rounded-[15px] bg-gradient-to-b from-ink-800 to-ink-850",
          innerClassName
        )}
      >
        {children}
      </div>
    </div>
  );
}

/* ---- Section shell with consistent rhythm ---- */
export function Section({
  id,
  children,
  className,
}: {
  id?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={cn("mx-auto w-full max-w-page scroll-mt-24 px-6 lg:px-8", className)}>
      {children}
    </section>
  );
}

/* ---- back-compat aliases used by older sections ---- */
export function PrimaryButton({
  children,
  href,
  className,
}: {
  children: ReactNode;
  href: string;
  className?: string;
}) {
  return (
    <Button href={href} variant="primary" className={className}>
      {children}
    </Button>
  );
}

export function GhostButton({
  children,
  href,
  className,
}: {
  children: ReactNode;
  href: string;
  className?: string;
}) {
  return (
    <Button href={href} variant="ghost" className={className}>
      {children}
    </Button>
  );
}
