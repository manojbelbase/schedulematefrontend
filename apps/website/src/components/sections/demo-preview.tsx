"use client";

import { AnimatedSection } from "~/components/ui/animated-section";

export function DemoPreview() {
  return (
    <section className="relative overflow-hidden bg-zinc-950 px-4 py-24 sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(124,58,237,0.15),transparent_60%)]" />

      <div className="relative mx-auto max-w-5xl">
        <AnimatedSection className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#7c3aed]">
            See it in action
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-[2.75rem]">
            From a chat message to a booked meeting
          </h2>
          <p className="mt-4 text-base text-zinc-400 sm:text-lg">
            Watch how ScheduleGPT turns a simple chat message into a calendar
            event.
          </p>
        </AnimatedSection>

        <AnimatedSection delay={0.1} className="mt-12">
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5">
            <div className="aspect-video flex items-center justify-center">
              <div className="text-center px-8">
                <div className="mx-auto mb-6 flex size-16 items-center justify-center rounded-full bg-white/10">
                  <svg
                    className="size-7 text-white/60"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z"
                    />
                  </svg>
                </div>
                <p className="text-sm text-white/40">
                  Product demo coming soon
                </p>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
