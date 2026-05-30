import type { Metadata } from "next";
import { InstallGuide } from "@/components/InstallGuide";

export const metadata: Metadata = {
  title: "Thanks for downloading — AndSpace",
  description:
    "Your AndSpace download is starting. Here's how to open it on macOS the first time.",
  robots: { index: false, follow: false },
};

export default function ThanksPage() {
  return <InstallGuide />;
}
