import type { Metadata } from "next";

import "./globals.css";

import { Poppins } from "next/font/google";
import { AuthProvider } from "@descope/nextjs-sdk";

import { DESCOPE_COOKIE_CONFIG } from "@/config/constants";
import { env } from "@/config/env";
import Provider from "@/provider";

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
});

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
    <html lang="en" suppressHydrationWarning className={poppins.variable}>
      <body className="antialiased">
        <AuthProvider
          projectId={env.NEXT_PUBLIC_DESCOPE_PROJECT_ID ?? ""}
          sessionTokenViaCookie={DESCOPE_COOKIE_CONFIG}
          refreshTokenViaCookie={DESCOPE_COOKIE_CONFIG}
        >
          <Provider>{children}</Provider>
        </AuthProvider>
      </body>
    </html>
  );
}
