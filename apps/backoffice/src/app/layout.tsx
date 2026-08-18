import type { Metadata } from "next";

import "./globals.css";

import Provider from "^/provider";

export const metadata: Metadata = {
  title: "ScheduledMate Backoffice",
  description: "Admin panel for the ScheduledMate platform.",
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