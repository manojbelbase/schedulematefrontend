"use client";

import { CheckCircle2 } from "lucide-react";

import { Button } from "@ui/components/ui/button";
import { GoogleCalendarIcon } from "@ui/components/ui/google-calendar-icon";
import { Typewriter } from "@ui/components/ui/typewriter";

import scheduleShot from "~/assets/hero-schedule-chat.png";
import { AnimatedSection } from "~/components/ui/animated-section";
import { ProductShot } from "~/components/ui/product-shot";
import { HERO } from "~/constants/content";

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-zinc-200/70 bg-[#f6f3fc] px-4 pb-16 pt-16 sm:px-6 sm:pt-24 lg:px-8">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(124,58,237,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(124,58,237,0.05)_1px,transparent_1px)] bg-[size:56px_56px] [mask-image:radial-gradient(75%_65%_at_50%_0%,black,transparent_80%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-[radial-gradient(50%_100%_at_50%_0%,rgba(124,58,237,0.1),transparent_70%)]"
      />
      <div className="relative mx-auto max-w-6xl">
        <AnimatedSection className="relative mx-auto max-w-3xl text-center">
          <h1 className="text-balance text-4xl font-semibold tracking-tight text-zinc-950 sm:text-5xl sm:leading-[1.08] lg:text-[3.5rem] lg:leading-[1.05]">
            <span className="block">
              Your{" "}
              <Typewriter
                words={["meetings,", "events,", "plans,"]}
                className="text-primary"
              />
            </span>
            <span className="block">simplified with AI</span>
          </h1>

          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-zinc-600 sm:text-lg">
            {HERO.subtitleIntro}
            <em className="italic text-zinc-700">{`'${HERO.subtitleQuote}'`}</em>
            {HERO.subtitleOutro}
          </p>

          <div className="mt-4 sm:mt-8 flex  items-center justify-center gap-3 flex-row ">
            <Button
              size="lg"
              asChild
              className="h-11 w-fit  rounded-sm bg-primary px-6 text-sm font-medium text-white shadow-[0_12px_30px_-12px_rgba(124,58,237,0.6)] hover:bg-primary/90 sm:w-auto"
            >
              <a
                href={HERO.primaryCta.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {HERO.primaryCta.label}
              </a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="h-11 w-fit rounded-sm border-zinc-300 bg-white px-6 text-sm font-medium text-zinc-900 hover:bg-zinc-50 sm:w-auto"
            >
              <a href={HERO.secondaryCta.href}>{HERO.secondaryCta.label}</a>
            </Button>
          </div>
        </AnimatedSection>

        <AnimatedSection
          delay={0.12}
          className="relative mx-auto mt-10 max-w-6xl sm:mt-16 lg:mt-20"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute -top-16 left-1/2 -z-10 h-56 w-[560px] max-w-full -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(124,58,237,0.16),transparent_70%)] blur-2xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -top-10 left-1/2 -z-10 h-72 w-[520px] max-w-full -translate-x-1/2 rounded-sm border border-primary/15 [mask-image:linear-gradient(to_bottom,black,transparent_85%)]"
          />

          <div className="relative flex flex-col items-center gap-2 sm:block">
            <ProductShot
              src={scheduleShot}
              alt="ScheduleMate AI booking a meeting in chat"
              priority
            />

            <div className="flex w-full max-w-sm items-center gap-2.5 rounded-sm border border-zinc-200 bg-white/90 p-2.5 pr-4 shadow-sm backdrop-blur sm:absolute sm:-bottom-5 sm:left-1/2 sm:mt-0 sm:w-auto sm:-translate-x-1/2">
              <span className="flex size-8 shrink-0 items-center justify-center rounded-sm bg-primary/10">
                <GoogleCalendarIcon className="size-5" />
              </span>
              <div className="text-left">
                <p className="text-xs font-semibold text-zinc-900">
                  Google Calendar synced
                </p>
                <p className="text-[11px] leading-tight text-zinc-500">
                  Reading your availability
                </p>
              </div>
            </div>

            <div className="flex w-full max-w-sm items-center gap-2 rounded-sm border border-zinc-200 bg-white/90 px-3.5 py-2.5 shadow-sm backdrop-blur sm:absolute sm:-right-3 sm:-top-6 sm:mt-0 sm:w-auto lg:-right-8">
              <CheckCircle2 className="size-4 text-primary" />
              <p className="text-xs font-semibold text-zinc-900">
                Meeting confirmed for{" "}
                <span className="text-primary">Thu 3:00 PM</span>
              </p>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
