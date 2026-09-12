import type { Metadata } from "next";

import { Footer } from "~/components/footer";
import { Navbar } from "~/components/navbar";
import { SITE, TERMS } from "~/constants/content";

export const metadata: Metadata = {
  title: "Terms and Conditions",
  description: `Terms and Conditions for ${SITE.name}`,
};

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-2xl px-4 py-14 sm:py-20 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-950">
          {TERMS.title}
        </h1>
        <p className="mt-1.5 text-sm text-zinc-400">
          Last updated: {TERMS.lastUpdated}
        </p>
        <div className="mt-8 space-y-8">
          {TERMS.content.map((section) => (
            <div key={section.heading}>
              <h2 className="text-base font-medium text-zinc-950">
                {section.heading}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-zinc-500">
                {section.text}
              </p>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
