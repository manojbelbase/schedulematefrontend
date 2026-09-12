"use client";

import { Button } from "@ui/components/ui/button";

import { AnimatedSection } from "~/components/ui/animated-section";
import { CTA } from "~/constants/content";

export function CtaBanner() {
  return (
    <section className="border-t border-zinc-100 px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <AnimatedSection className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-zinc-950 sm:text-4xl">
            {CTA.title}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-zinc-600">
            {CTA.subtitle}
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button
              size="lg"
              asChild
              className="h-11 rounded-sm border-0 bg-zinc-900 px-6 text-sm font-medium text-white hover:bg-zinc-800"
            >
              <a
                href={CTA.primaryCta.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {CTA.primaryCta.label}
              </a>
            </Button>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
