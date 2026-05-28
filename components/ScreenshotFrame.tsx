import Image from "next/image";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

const GLOW = {
  sm: "glow-violet-frame-md h-40 w-2/3 opacity-60",
  md: "glow-violet-frame-md h-56 w-4/5 opacity-70",
  lg: "glow-violet-frame-lg h-72 w-[110%] opacity-80",
} as const;

export function ScreenshotFrame({
  src,
  alt,
  width,
  height,
  priority = false,
  glow = "md",
  scrim = false,
  className,
  children,
  sizes = "(max-width: 1280px) 100vw, 1280px",
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  priority?: boolean;
  glow?: "sm" | "md" | "lg";
  scrim?: boolean;
  className?: string;
  children?: ReactNode;
  sizes?: string;
}) {
  return (
    <div className={cn("relative", className)}>
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute left-1/2 top-0 -z-10 -translate-x-1/2",
          GLOW[glow]
        )}
      />

      <div className="rounded-2xl bg-gradient-to-b from-white/[0.14] via-white/[0.05] to-white/[0.02] p-px shadow-[0_40px_120px_-40px_rgba(0,0,0,0.95)]">
        <div className="relative overflow-hidden rounded-[15px] bg-ink-900">
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            priority={priority}
            sizes={sizes}
            quality={92}
            className="h-auto w-full select-none"
          />

          {scrim ? (
            <div
              aria-hidden
              className="absolute inset-0 bg-ink-950/55 backdrop-blur-[2px]"
            />
          ) : null}

          {children}

          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent"
          />
        </div>
      </div>

      <div
        aria-hidden
        className="glow-floor pointer-events-none absolute inset-x-8 -bottom-6 -z-10 h-12"
      />
    </div>
  );
}
