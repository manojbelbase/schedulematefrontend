import type { Metadata } from "next";

import "./globals.css";

import { GeistSans } from "geist/font/sans";

import { SITE } from "~/constants/content";
import Provider from "~/provider";

export const metadata: Metadata = {
  title: {
    default: `${SITE.name} — ${SITE.tagline}`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${GeistSans.variable} scroll-smooth`}
    >
      <body className="antialiased">
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
