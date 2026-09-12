import type { Metadata } from "next";
import { NuqsAdapter } from "nuqs/adapters/next/app";

import "./globals.css";

import { GeistSans } from "geist/font/sans";

import Provider from "@/provider";

export const metadata: Metadata = {
  title: "ScheduleMate AI Backoffice",
  description: "Admin panel for the ScheduleMate AI platform.",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={GeistSans.variable}>
      <body className="antialiased">
        <NuqsAdapter>
          <Provider>{children}</Provider>
        </NuqsAdapter>
      </body>
    </html>
  );
}
