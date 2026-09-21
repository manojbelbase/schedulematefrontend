import type { Metadata } from "next";

import { PrivacyView } from "@/components/pages/privacy/privacy-view";

export const metadata: Metadata = {
  title: "Privacy Policy — ScheduleMate AI",
};

export default function PrivacyPage() {
  return <PrivacyView />;
}
