import Image from "next/image";
import { cn } from "@/lib/utils";

const GLOW = {
  sm: "glow-violet-sm h-40 w-2/3 opacity-60",
  md: "glow-violet-md h-56 w-4/5 opacity-70",
  lg: "glow-violet-lg h-72 w-[115%] opacity-80",
} as const;

export function ShowcaseShot({
  src,
  alt,
  width,
  height,
  priority = false,
  glow = "md",
  className,
  sizes = "(max-width: 1280px) 100vw, 1280px",
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  priority?: boolean;
  glow?: "sm" | "md" | "lg";
  className?: string;
  sizes?: string;
}) {
  return (
    <div className={cn("relative", className)}>
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute left-1/2 top-1/4 -z-10 -translate-x-1/2",
          GLOW[glow]
        )}
      />

      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        sizes={sizes}
        quality={95}
        className="h-auto w-full select-none rounded-2xl"
      />

      <div
        aria-hidden
        className="glow-floor pointer-events-none absolute inset-x-10 -bottom-4 -z-10 h-12"
      />
    </div>
  );
}
