import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "group relative inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-ink-900 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "bg-gradient-to-b from-violet-400 to-violet-600 text-white shadow-[0_8px_30px_-10px_rgba(124,58,237,0.8),inset_0_1px_0_rgba(255,255,255,0.25)] hover:from-violet-400 hover:to-violet-500 hover:shadow-[0_14px_44px_-10px_rgba(124,58,237,0.95),inset_0_1px_0_rgba(255,255,255,0.3)] hover:-translate-y-[1px]",
        ghost:
          "border border-line-strong bg-white/[0.02] text-fg backdrop-blur-sm hover:border-white/20 hover:bg-white/[0.05] hover:-translate-y-[1px]",
        subtle:
          "bg-white/[0.04] text-fg-muted hover:bg-white/[0.07] hover:text-fg",
      },
      size: {
        sm: "px-3.5 py-2 text-[13px]",
        md: "px-5 py-2.5 text-[14px]",
        lg: "px-6 py-3 text-[15px]",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

type ButtonProps = {
  href: string;
  className?: string;
  children: React.ReactNode;
} & VariantProps<typeof buttonVariants>;

export function Button({
  href,
  className,
  variant,
  size,
  children,
}: ButtonProps) {
  return (
    <Link
      href={href}
      className={cn(buttonVariants({ variant, size }), className)}
    >
      {children}
    </Link>
  );
}

export { buttonVariants };
