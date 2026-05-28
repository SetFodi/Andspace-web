import { Spotlight } from "./Spotlight";
import { ScreenshotFrame } from "./ScreenshotFrame";
import { Kbd } from "./ui";

export function SidebarSection() {
  return (
    <Spotlight
      id="sidebar"
      eyebrow="Project Sidebar"
      flip
      title={
        <>
          Your project, one
          <br className="hidden sm:block" /> keystroke away.
        </>
      }
      bullets={[
        "Files, scripts, and live servers for the folder you're in",
        "Open any file in Cursor, VS Code, or a Neovim split",
        "Read-only Git changes & visual diff previews directly in the sidebar",
      ]}
      visual={
        <ScreenshotFrame
          src="/file-actions.png"
          alt="AndSpace file actions menu: open package.json in Cursor, VS Code, a Neovim split, copy path, or reveal in Finder"
          width={2047}
          height={1283}
          glow="md"
          sizes="(max-width: 1280px) 100vw, 640px"
        />
      }
    >
      <p>
        Toggle the sidebar with <Kbd>⌘B</Kbd> to see the folder you&apos;re
        actually working in — its files, every script in{" "}
        <span className="font-mono text-violet-400">package.json</span>, currently running dev servers, and your project&apos;s read-only Git changes.
      </p>
      <p>
        Press a file for instant actions: open it in your editor of choice, copy
        its path, or inspect visual diff previews in a split pane — without ever leaving home row.
      </p>
    </Spotlight>
  );
}
