import type { Metadata } from "next";
import { TrustPage } from "@/components/TrustPage";

export const metadata: Metadata = {
  title: "Privacy Policy — AndSpace",
  description:
    "Privacy notes for AndSpace beta: local terminal behavior, local AI CLI handoff, local workspace state, and website logs.",
};

export default function PrivacyPage() {
  return (
    <TrustPage
      eyebrow="Privacy"
      title="AndSpace is built around local control."
      intro="This is practical privacy information for an early open-source beta. It explains what the app does locally, what it does not send to AndSpace, and where provider CLIs may have their own behavior."
      updated="May 31, 2026"
      asideTitle="Privacy summary"
      asideItems={[
        "No AndSpace account is required.",
        "The app does not send terminal content or workspace data to AndSpace servers.",
        "AI handoff uses local installed CLIs only.",
        "Diagnostics and workspace restore data are local.",
      ]}
      sections={[
        {
          title: "Account and server behavior",
          body: [
            "AndSpace does not require an account. The app does not include an AndSpace-hosted login, hosted AI backend, or provider API integration.",
            "The AndSpace app does not send terminal content, local files, typed commands, AI prompts, Git diffs, workspace state, shell history, secrets, or project data to AndSpace servers.",
          ],
        },
        {
          title: "AI CLI handoff",
          body: [
            "AndSpace can hand context to locally installed AI command line tools such as Claude Code, Codex, and Cursor CLI when you explicitly use the handoff action.",
            "Any data sent after that point is controlled by the local CLI you run and by that provider's own product behavior, authentication, settings, and terms. AndSpace does not proxy those requests and does not create hidden provider API billing.",
          ],
        },
        {
          title: "Local storage",
          body: [
            "AndSpace stores lightweight workspace state locally so it can restore tabs, split layout, pane working directories, sidebar state, and window shape between launches.",
            "AndSpace does not store terminal scrollback, command output, AI prompt contents, secrets, shell history, or detected server records as part of workspace restore.",
          ],
        },
        {
          title: "Diagnostics",
          body: [
            "AndSpace may create local diagnostic log files to help understand launch, shell integration, renderer, packaging, and app behavior during beta testing.",
            "Diagnostics are local files on the user's machine. They are not uploaded automatically by AndSpace.",
          ],
        },
        {
          title: "Website logs",
          body: [
            "The AndSpace website is static. AndSpace does not add product analytics or telemetry to the app as part of this beta trust work.",
            "The website host or CDN may keep normal request logs, such as IP address, user agent, requested URL, timestamp, and error information, as part of ordinary hosting operations.",
          ],
        },
        {
          title: "Sale of personal data",
          body: [
            "AndSpace does not sell personal data.",
            "For privacy questions, use the public GitHub issue tracker unless the question contains private information.",
          ],
        },
      ]}
    />
  );
}
