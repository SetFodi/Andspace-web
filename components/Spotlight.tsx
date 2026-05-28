import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Section, Eyebrow } from "./ui";
import { Reveal } from "./Reveal";
import { CheckIcon } from "./icons";

export function Spotlight({
  id,
  eyebrow,
  title,
  children,
  bullets,
  visual,
  flip = false,
  banded = false,
}: {
  id?: string;
  eyebrow: string;
  title: ReactNode;
  children: ReactNode;
  bullets?: string[];
  visual: ReactNode;
  flip?: boolean;
  banded?: boolean;
}) {
  const body = (
    <Section id={id} className="py-20 sm:py-28">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <Reveal className={cn(flip ? "lg:order-2" : "lg:order-1")}>
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 className="text-balance text-[clamp(1.8rem,3.6vw,2.7rem)] font-semibold leading-[1.1] tracking-[-0.02em] text-fg">
            {title}
          </h2>
          <div className="mt-5 max-w-[34rem] space-y-4 text-[15px] leading-relaxed text-fg-muted">
            {children}
          </div>
          {bullets ? (
            <ul className="mt-7 space-y-3">
              {bullets.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-[14px] text-fg-muted"
                >
                  <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-md border border-violet/25 bg-violet/[0.08] text-violet-400">
                    <CheckIcon className="h-3 w-3" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          ) : null}
        </Reveal>

        <Reveal
          delay={120}
          className={cn(flip ? "lg:order-1" : "lg:order-2")}
        >
          {visual}
        </Reveal>
      </div>
    </Section>
  );

  if (banded) {
    return (
      <div className="border-y border-line-soft bg-ink-850/40">{body}</div>
    );
  }
  return body;
}
