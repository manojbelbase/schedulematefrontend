import type { Metadata } from "next";

import "./globals.css";

import { Poppins } from "next/font/google";

import Provider from "@/provider";

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
});

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
    <html lang="en" suppressHydrationWarning className={poppins.variable}>
      <body className="antialiased">
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
