"use client";

import Image from "next/image";

import { Button } from "@ui/components/ui/button";

import schedulemateLogo from "~/assets/schedulemate-logo.png";
import { AnimatedSection } from "~/components/ui/animated-section";
import { ProductShot } from "~/components/ui/product-shot";
import { HERO } from "~/constants/content";

function ShotPlaceholder() {
  return (
    <div className="flex aspect-[1280/860] w-full flex-col overflow-hidden bg-zinc-50">
      <div className="relative flex h-9 shrink-0 items-center gap-2 border-b border-zinc-200 bg-white px-4">
        <span className="size-2.5 rounded-full bg-zinc-200" />
        <span className="size-2.5 rounded-full bg-zinc-200" />
        <span className="size-2.5 rounded-full bg-zinc-200" />
        <span className="mx-auto h-4 w-40 rounded bg-zinc-100" />
      </div>
      <div className="flex flex-1 items-center justify-center">
        <div className="space-y-4 p-10 text-center">
          <div className="mx-auto flex size-12 items-center justify-center rounded-xl border border-zinc-200 bg-white shadow-sm">
            <Image
              src={schedulemateLogo}
              alt="ScheduleMate"
              width={24}
              height={24}
              className="size-6 rounded-sm"
            />
          </div>
          <p className="text-sm font-medium text-zinc-500">
            Live app screenshot
          </p>
          <p className="mx-auto max-w-xs text-xs text-zinc-400">
            Drop a screenshot of the app at{" "}
            <code className="rounded bg-zinc-100 px-1">
              /screenshots/chat.png
            </code>{" "}
            and it replaces this placeholder.
          </p>
        </div>
      </div>
    </div>
  );
}

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

        <AnimatedSection delay={0.12} className="mx-auto mt-12 max-w-6xl">
          <ProductShot
            src="/screenshots/chat.png"
            alt="ScheduleMate AI booking a meeting in chat"
            fallback={<ShotPlaceholder />}
            priority
          />
        </AnimatedSection>
      </div>
    </section>
  );
}
