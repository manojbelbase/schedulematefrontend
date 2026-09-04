"use client";

import { Button } from "@ui/components/ui/button";

import { HERO } from "~/constants/content";

export function Hero() {
  return (
    <section className="relative overflow-hidden px-4 pt-24 pb-20 sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(124,58,237,0.12),transparent_55%)]" />

      <div className="relative mx-auto max-w-6xl">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-violet-200 bg-violet-50 px-4 py-1.5 text-sm text-violet-700">
              <span className="size-2 rounded-full bg-green-500" />
              {HERO.badge}
            </div>

            <h1 className="text-4xl font-bold tracking-tight text-zinc-950 sm:text-5xl lg:text-[3.5rem] whitespace-pre-line leading-[1.1] text-balance">
              {HERO.title}
            </h1>

            <p className="mt-6 max-w-lg text-lg text-zinc-600 leading-relaxed">
              {HERO.subtitle}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Button
                size="lg"
                asChild
                className="bg-[#7c3aed] text-white hover:bg-[#7c3aed]/90 border-0 px-8 py-3 text-sm font-medium h-11 rounded-full"
              >
                <a href={HERO.primaryCta.href}>{HERO.primaryCta.label}</a>
              </Button>
              <Button
                size="lg"
                variant="ghost"
                asChild
                className="text-zinc-600 hover:text-zinc-900 px-6 py-3 text-sm h-11"
              >
                <a href={HERO.secondaryCta.href}>{HERO.secondaryCta.label}</a>
              </Button>
            </div>
          </div>

          <div className="relative flex justify-center lg:justify-end">
            <div className="relative w-72">
              <div className="rounded-[2rem] border-4 border-zinc-900 bg-zinc-900 p-2 shadow-2xl">
                <div className="rounded-[1.5rem] bg-white overflow-hidden">
                  <div className="bg-[#7c3aed] px-4 py-3">
                    <p className="text-xs font-medium text-white/80">
                      scheduleGPT
                    </p>
                  </div>
                  <div className="p-4 space-y-3">
                    <div className="rounded-xl bg-zinc-50 p-3">
                      <p className="text-xs font-medium text-zinc-900">
                        Today&apos;s schedule
                      </p>
                      <p className="text-2xl font-bold text-zinc-900 mt-1">
                        6 meetings
                      </p>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 rounded-lg border border-zinc-100 p-2.5">
                        <div className="size-2 rounded-full bg-[#7c3aed]" />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-medium text-zinc-900 truncate">
                            Team standup
                          </p>
                          <p className="text-[10px] text-zinc-400">9:00 AM</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 rounded-lg border border-zinc-100 p-2.5">
                        <div className="size-2 rounded-full bg-purple-400" />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-medium text-zinc-900 truncate">
                            Client call
                          </p>
                          <p className="text-[10px] text-zinc-400">3:00 PM</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 rounded-lg border border-zinc-100 p-2.5">
                        <div className="size-2 rounded-full bg-violet-300" />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-medium text-zinc-900 truncate">
                            1:1 with manager
                          </p>
                          <p className="text-[10px] text-zinc-400">4:30 PM</p>
                        </div>
                      </div>
                    </div>
                    <div className="rounded-xl bg-[#7c3aed]/10 p-3">
                      <div className="flex gap-2">
                        <div className="size-6 shrink-0 rounded-full bg-[#7c3aed]/20 flex items-center justify-center text-[8px] text-[#7c3aed] font-bold">
                          AI
                        </div>
                        <p className="text-[10px] text-zinc-600 leading-relaxed">
                          &ldquo;Book a meeting with Sarah Thursday&rdquo;
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-4 -left-8 rounded-xl border border-black/5 bg-white p-3 shadow-[0_12px_40px_rgba(0,0,0,0.08)]">
                <p className="text-[10px] text-zinc-400">This week</p>
                <p className="text-lg font-bold text-zinc-900">12 meetings</p>
              </div>
              <div className="absolute -top-2 -right-6 rounded-xl border border-black/5 bg-white p-3 shadow-[0_12px_40px_rgba(0,0,0,0.08)]">
                <p className="text-[10px] text-zinc-400">Focus time</p>
                <p className="text-lg font-bold text-zinc-900">4.2h</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
