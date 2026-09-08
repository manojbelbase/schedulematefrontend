import type { Metadata } from "next";

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
      <main className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-7xl px-6 py-4">{children}</div>
      </main>
    </div>
  );
}
