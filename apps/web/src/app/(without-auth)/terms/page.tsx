import type { Metadata } from "next";

import { TermsView } from "@/components/pages/terms/terms-view";

export const metadata: Metadata = {
  title: "Terms of Service — ScheduleMate AI",
};

export default function TermsPage() {
  return <TermsView />;
}
