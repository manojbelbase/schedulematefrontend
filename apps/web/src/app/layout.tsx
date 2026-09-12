import type { Metadata } from "next";

import "./globals.css";

import { GeistSans } from "geist/font/sans";

import Provider from "@/provider";

export const metadata: Metadata = {
  title: "ScheduleMate AI",
  description: "A platform to book and manage your schedules.",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={GeistSans.variable}>
      <body className="antialiased">
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
