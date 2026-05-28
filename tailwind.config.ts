import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Mirrors the AndSpace app palette (src/styles.css).
        ink: {
          950: "#08080a",
          900: "#0a0a0c",
          850: "#0b0c10",
          800: "#0d0e12",
          750: "#111218",
          700: "#16181f",
        },
        line: {
          DEFAULT: "rgba(255,255,255,0.08)",
          soft: "rgba(255,255,255,0.05)",
          strong: "rgba(255,255,255,0.12)",
        },
        violet: {
          DEFAULT: "#a78bfa",
          400: "#a78bfa",
          500: "#8b5cf6",
          600: "#7c3aed",
        },
        fg: {
          DEFAULT: "#e6e6ea",
          muted: "#a1a1ad",
          faint: "#6b6b77",
        },
        ok: "#4ade80",
      },
      fontFamily: {
        sans: [
          "var(--font-geist-sans)",
          "-apple-system",
          "BlinkMacSystemFont",
          "SF Pro Text",
          "Inter",
          "Segoe UI",
          "system-ui",
          "sans-serif",
        ],
        mono: [
          "var(--font-geist-mono)",
          "JetBrains Mono",
          "ui-monospace",
          "SFMono-Regular",
          "SF Mono",
          "Menlo",
          "Monaco",
          "monospace",
        ],
      },
      borderRadius: {
        xl: "14px",
        "2xl": "18px",
      },
      maxWidth: {
        page: "1440px",
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(167,139,250,0.18), 0 24px 80px -24px rgba(124,58,237,0.45)",
        panel:
          "0 1px 0 0 rgba(255,255,255,0.04) inset, 0 40px 120px -40px rgba(0,0,0,0.9)",
        card: "0 1px 0 0 rgba(255,255,255,0.03) inset, 0 20px 60px -30px rgba(0,0,0,0.8)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "soft-pulse": {
          "0%, 100%": { opacity: "0.55" },
          "50%": { opacity: "1" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s cubic-bezier(0.16,1,0.3,1) both",
        "soft-pulse": "soft-pulse 3.2s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
