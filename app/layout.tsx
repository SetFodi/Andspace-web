import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://andspace.app"),
  title: "AndSpace — The terminal built around your workflow",
  description:
    "A native macOS terminal that's project-aware, AI-ready, and delightfully fast. Command Guard, ⌘E AI handoff, a project sidebar, and a keyboard-first command palette.",
  keywords: [
    "terminal",
    "macOS terminal",
    "developer tools",
    "AI terminal",
    "Command Guard",
    "AndSpace",
  ],
  authors: [{ name: "AndSpace" }],
  openGraph: {
    title: "AndSpace — The terminal built around your workflow",
    description:
      "Project-aware. AI-ready. Delightfully fast. A native macOS terminal with Command Guard, AI handoff, and a keyboard-first command palette.",
    url: "https://andspace.app",
    siteName: "AndSpace",
    type: "website",
    images: [{ url: "/app-hero.png", width: 2047, height: 1283 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "AndSpace — The terminal built around your workflow",
    description:
      "Project-aware. AI-ready. Delightfully fast. A native macOS terminal.",
    images: ["/app-hero.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0c",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable}`}
    >
      <body className="font-sans antialiased">
        <div className="page-backdrop" aria-hidden />
        {children}
      </body>
    </html>
  );
}
