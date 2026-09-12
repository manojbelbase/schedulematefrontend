"use client";

import { Button } from "@ui/components/ui/button";

import scheduleShot from "~/assets/hero-schedule-chat.png";
import { AnimatedSection } from "~/components/ui/animated-section";
import { ProductShot } from "~/components/ui/product-shot";
import { HERO } from "~/constants/content";

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-zinc-200/70 bg-[#f6f3fc] px-4 pb-16 pt-20 sm:px-6 lg:px-8">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(124,58,237,0.07)_1px,transparent_1px),linear-gradient(to_bottom,rgba(124,58,237,0.07)_1px,transparent_1px)] bg-[size:44px_44px] [mask-image:radial-gradient(70%_65%_at_50%_0%,black,transparent_75%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-80 bg-[radial-gradient(60%_100%_at_50%_0%,rgba(124,58,237,0.12),transparent_70%)]"
      />
      <div className="relative mx-auto max-w-6xl">
        <AnimatedSection className="mx-auto max-w-3xl text-center">
          <h1 className="text-balance whitespace-pre-line text-4xl font-semibold tracking-tight text-zinc-950 sm:text-5xl lg:text-[3.75rem] lg:leading-[1.05]">
            {HERO.title}
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-zinc-600">
            {HERO.subtitle}
          </p>

          <div className="mt-8 flex items-center justify-center">
            <Button
              size="lg"
              asChild
              className="h-12 rounded-sm border-0 bg-zinc-900 px-7 text-sm font-medium text-white hover:bg-zinc-800"
            >
              <a
                href={HERO.primaryCta.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {HERO.primaryCta.label}
              </a>
            </Button>
          </div>
        </AnimatedSection>

        <AnimatedSection
          delay={0.12}
          className="relative mx-auto mt-12 max-w-6xl"
        >
          <div
            aria-hidden
            className="absolute -top-10 left-[5%] -z-10 size-40 rounded-full bg-primary/15 blur-3xl"
          />
          <div
            aria-hidden
            className="absolute -right-8 top-1/3 -z-10 size-56 rounded-full bg-[radial-gradient(circle_at_center,rgba(124,58,237,0.18),transparent_65%)] blur-2xl"
          />
          <ProductShot
            src={scheduleShot}
            alt="ScheduleMate AI booking a meeting in chat"
            priority
          />
        </AnimatedSection>
      </div>
    </section>
  );
}
