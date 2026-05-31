import type { Metadata } from "next";
import { TrustPage } from "@/components/TrustPage";

export const metadata: Metadata = {
  title: "Security Notes — AndSpace",
  description:
    "Security notes for AndSpace beta: unsigned install context, checksum verification, Command Guard limits, and read-only Git behavior.",
};

export default function SecurityPage() {
  return (
    <TrustPage
      eyebrow="Security"
      title="Clear limits for an early macOS beta."
      intro="AndSpace is designed to make local terminal work safer and more understandable, but it is not a sandbox. These notes explain the current beta security posture and how to verify downloads."
      updated="May 31, 2026"
      asideTitle="Current status"
      asideItems={[
        "Current beta builds are unsigned.",
        "Verify ZIP and DMG checksums before sharing.",
        "Git UI is read-only in this version.",
        "Command Guard is a safety rail, not a sandbox.",
      ]}
      sections={[
        {
          title: "Unsigned beta install warning",
          body: [
            "The current AndSpace public beta is unsigned prerelease software. macOS may warn that the app cannot be opened normally after download.",
            "This warning is expected for the current prerelease beta. Allow it from System Settings -> Privacy & Security -> Open Anyway after the first blocked launch attempt.",
          ],
        },
        {
          title: "Download verification",
          body: [
            "Every AndSpace release on GitHub publishes the SHA-256 checksums for its ZIP and DMG. Always download from the official releases page: https://github.com/SetFodi/Andspace/releases.",
            "After downloading, verify your file with shasum -a 256 <downloaded-file>, then compare the result against the checksums listed on that release's page.",
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
