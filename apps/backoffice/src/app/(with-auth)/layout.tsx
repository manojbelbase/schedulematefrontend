import type { Metadata } from "next";

import MainContent from "@/components/layout/main-content";
import Sidebar from "@/components/layout/sidebar";

export const metadata: Metadata = {
  title: {
    template: "%s | ScheduleMate AI Backoffice",
    default: "ScheduleMate AI Backoffice",
  },
};

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar />
      <MainContent>{children}</MainContent>
    </div>
  );
}
