import type { Metadata } from "next";

import "./globals.css";

import Provider from "@/provider";

export const metadata: Metadata = {
  title: "ScheduledMate",
  description: "A platform to book and manage your schedules.",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}