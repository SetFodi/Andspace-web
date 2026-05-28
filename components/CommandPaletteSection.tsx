import { Spotlight } from "./Spotlight";
import { ShowcaseShot } from "./ShowcaseShot";
import { Kbd } from "./ui";

export function CommandPaletteSection() {
  return (
    <Spotlight
      id="command-palette"
      eyebrow="Command Palette"
      banded
      title={
        <>
          Every action, one
          <br className="hidden sm:block" /> fuzzy search away.
        </>
      }
      bullets={[
        "New tab, split right/down, focus navigation, close pane — all keyboard-first",
        "Focus files or scripts, run package scripts, restore layout on startup",
        "Actions are scoped by context so the right one is always on top",
      ]}
      visual={
        <ShowcaseShot
          src="/d3879092-96e8-422f-a1d0-87e3b7499c60.png"
          alt="AndSpace command palette open over a split-pane terminal, listing workflow actions like New Tab, Split Right, Toggle Sidebar, and Run Script"
          width={1672}
          height={941}
          priority
          glow="md"
          sizes="(max-width: 1280px) 100vw, 640px"
        />
      }
    >
      <p>
        Hit <Kbd>⌘K</Kbd> and run any workflow action without reaching for the
        mouse. The palette knows the shape of your project — terminal actions and
        project actions live side by side, each tagged by scope.
      </p>
      <p>
        It&apos;s the fastest path to a new split, a running script, or a fresh{" "}
        <span className="font-mono text-violet-400">ANDSPACE.md</span> context
        file.
      </p>
    </Spotlight>
  );
}
