import type { Metadata } from "next";
import { TrustPage } from "@/components/TrustPage";

export const metadata: Metadata = {
  title: "Security Notes — AndSpace",
  description:
    "Security notes for AndSpace alpha: unsigned install context, checksum verification, Command Guard limits, and read-only Git behavior.",
};

export default function SecurityPage() {
  return (
    <TrustPage
      eyebrow="Security"
      title="Clear limits for an early macOS alpha."
      intro="AndSpace is designed to make local terminal work safer and more understandable, but it is not a sandbox. These notes explain the current alpha security posture and how to verify downloads."
      updated="May 29, 2026"
      asideTitle="Current status"
      asideItems={[
        "Current alpha builds are unsigned.",
        "Verify ZIP and DMG checksums before sharing.",
        "Git UI is read-only in this version.",
        "Command Guard is a safety rail, not a sandbox.",
      ]}
      sections={[
        {
          title: "Unsigned alpha install warning",
          body: [
            "The current AndSpace public alpha is unsigned prerelease software. macOS may warn that the app cannot be opened normally after download.",
            "This warning is expected for the current prerelease alpha. You may need to right-click the app and choose Open, or allow it from System Settings -> Privacy & Security after the first blocked launch attempt.",
          ],
        },
        {
          title: "Download verification",
          body: [
            "For v0.1.0-alpha.8, verify the ZIP with: shasum -a 256 AndSpace-v0.1.0-alpha.8-macos.zip. Expected checksum: c0845b48cb6239120d7f42905c4b4f371ed7eba8f8c1c86c704b39b27682d0d5.",
            "Verify the DMG with: shasum -a 256 AndSpace_0.1.0-alpha.8_aarch64.dmg. Expected checksum: 650914ed22cb5cfad5ac27287b7f7273cd3438e2cdd96f977c287c85dd7db475.",
          ],
        },
        {
          title: "Command Guard",
          body: [
            "Command Guard can warn about protected or dangerous commands and can read project guidance from ANDSPACE.md.",
            "Command Guard does not make arbitrary shell commands safe, does not sandbox processes, does not understand every program's side effects, and does not replace user judgment.",
          ],
        },
        {
          title: "Git behavior",
          body: [
            "AndSpace Git features are read-only in this version. The UI can load status and show visual diff previews.",
            "There are no Git write actions in the UI: no staging, commit, push, pull, checkout, reset, stash, merge, or rebase buttons.",
          ],
        },
        {
          title: "Shell execution",
          body: [
            "AndSpace does not run hidden shell commands beyond user-triggered app behavior such as starting terminal shells, running selected package scripts, opening external editors, loading read-only Git status/diffs, and launching local AI CLIs when requested.",
            "The app has no auto-update mechanism yet. Future signing and update work should be reviewed separately before public rollout.",
          ],
        },
        {
          title: "Reporting issues",
          body: [
            "For non-sensitive issues, report problems through GitHub issues. Include the app version, macOS version, install method, and any relevant local diagnostics that you are comfortable sharing.",
            "For sensitive security concerns, do not post secrets or working exploit details publicly. Open a minimal issue asking for a private report path, or use GitHub private vulnerability reporting if it is available on the repository.",
          ],
        },
      ]}
    />
  );
}
