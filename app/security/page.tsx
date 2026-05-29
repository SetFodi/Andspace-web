import type { Metadata } from "next";
import { TrustPage } from "@/components/TrustPage";

export const metadata: Metadata = {
  title: "Security Notes — AndSpace",
  description:
    "Security notes for AndSpace alpha: notarization status, checksum verification, Command Guard limits, and read-only Git behavior.",
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
        "Alpha builds are not notarized yet.",
        "Verify ZIP and DMG checksums before sharing.",
        "Git UI is read-only in this version.",
        "Command Guard is a safety rail, not a sandbox.",
      ]}
      sections={[
        {
          title: "Unsigned alpha install warning",
          body: [
            "The current AndSpace public alpha is not signed with a Developer ID certificate and is not notarized by Apple yet. macOS may warn that the app cannot be opened normally after download.",
            "This warning is expected for the current prerelease alpha. You may need to right-click the app and choose Open, or allow it from System Settings -> Privacy & Security after the first blocked launch attempt.",
          ],
        },
        {
          title: "Download verification",
          body: [
            "For v0.1.0-alpha.6, verify the ZIP with: shasum -a 256 AndSpace-v0.1.0-alpha.6-macos.zip. Expected checksum: 317afd38c3c19ce1c6cd7ba74e74f8677f16564c5c250ebaa06786e9bd3a7d9f.",
            "Verify the DMG with: shasum -a 256 AndSpace_0.1.0-alpha.6_aarch64.dmg. Expected checksum: f6dc8458b81a73d6aa759bec24af9ded231a81b1f84c09b28750892d8d020f5c.",
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
            "The app has no auto-update mechanism yet. Future signing, notarization, and update work should be reviewed separately before public rollout.",
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
