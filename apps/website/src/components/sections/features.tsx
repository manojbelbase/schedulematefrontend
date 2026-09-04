"use client";

import {
  Calendar,
  Clock,
  MessageCircle,
  MessageSquare,
  RefreshCw,
  Send,
  Users,
} from "lucide-react";

import { AnimatedSection } from "~/components/ui/animated-section";
import { FEATURES } from "~/constants/content";

const iconMap = {
  MessageSquare,
  Calendar,
  Clock,
  Users,
  RefreshCw,
  MessageCircle,
} as const;

function FeatureCard({
  feature,
  className,
  accent = false,
}: {
  feature: (typeof FEATURES)[number];
  className?: string;
  accent?: boolean;
}) {
  const Icon = iconMap[feature.icon as keyof typeof iconMap];
  return (
    <div
      className={`flex flex-col rounded-2xl p-7 ${
        accent ? "bg-zinc-950 text-white" : "border border-black/5 bg-white"
      } ${className ?? ""}`}
    >
      <div
        className={`mb-4 flex size-10 items-center justify-center rounded-xl ${
          accent ? "bg-white/10" : "bg-[#7c3aed]/10"
        }`}
      >
        <Icon
          className={`size-5 ${accent ? "text-white" : "text-[#7c3aed]"}`}
        />
      </div>
      <h3
        className={`text-base font-semibold ${
          accent ? "text-white" : "text-zinc-950"
        }`}
      >
        {feature.title}
      </h3>
      <p
        className={`mt-2 text-sm leading-relaxed ${
          accent ? "text-zinc-400" : "text-zinc-500"
        }`}
      >
        {feature.description}
      </p>
    </div>
  );
}

export function Features() {
  const [chat, sync, slots, multi, reschedule, history] = FEATURES;

  return (
    <section id="features" className="scroll-mt-20 px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <AnimatedSection className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#7c3aed]">
            Features
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-zinc-950 sm:text-4xl lg:text-[2.75rem]">
            A scheduling assistant that{" "}
            <span className="text-[#7c3aed]">just gets it</span>
          </h2>
          <p className="mt-4 text-base text-zinc-600 sm:text-lg">
            Everything lives in one chat. Tell it what you need, and it reads
            and writes your Google Calendar for you.
          </p>
        </AnimatedSection>

        <div className="mt-14 grid gap-4 lg:grid-cols-6">
          <AnimatedSection delay={0.05} className="lg:col-span-4">
            <div className="flex h-full flex-col justify-between rounded-2xl bg-[#7c3aed] p-7 text-white sm:p-8">
              <div className="max-w-lg">
                <div className="mb-4 flex size-10 items-center justify-center rounded-xl bg-white/15">
                  <MessageSquare className="size-5 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white">
                  {chat.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-white/80">
                  {chat.description}
                </p>
              </div>

              <div className="mt-8 rounded-xl bg-white p-4 shadow-xl">
                <div className="flex flex-col gap-2.5">
                  <div className="self-end rounded-lg bg-[#7c3aed]/10 px-3 py-2 text-xs text-zinc-700">
                    Schedule a meeting with Sarah Thursday at 3 PM
                  </div>
                  <div className="flex max-w-[85%] items-start gap-2 self-start">
                    <div className="flex size-6 shrink-0 items-center justify-center rounded-full bg-zinc-100 text-[9px] font-bold text-[#7c3aed]">
                      AI
                    </div>
                    <div className="rounded-lg border border-zinc-100 px-3 py-2 text-xs text-zinc-600">
                      Done. Added to your calendar for Thu at 3:00 PM and
                      emailed Sarah an invite.
                    </div>
                  </div>
                  <div className="flex items-center gap-2 rounded-lg border border-zinc-100 px-3 py-2 text-xs text-zinc-400">
                    Ask me anything about your schedule...
                    <Send className="ml-auto size-3.5 text-[#7c3aed]" />
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.1} className="lg:col-span-2">
            <div className="flex h-full flex-col rounded-2xl bg-zinc-50 p-7">
              <div className="mb-4 flex size-10 items-center justify-center rounded-xl bg-white shadow-sm">
                <Calendar className="size-5 text-[#7c3aed]" />
              </div>
              <h3 className="text-base font-semibold text-zinc-950">
                {sync.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-500">
                {sync.description}
              </p>
              <div className="mt-auto pt-6">
                <div className="flex items-center justify-between rounded-lg border border-zinc-100 bg-white px-3 py-2 text-xs">
                  <span className="font-medium text-zinc-700">
                    Thu, 3:00 PM
                  </span>
                  <span className="rounded-full bg-green-100 px-2 py-0.5 text-[10px] font-medium text-green-700">
                    Synced
                  </span>
                </div>
              </div>
            </div>
          </AnimatedSection>

          <FeatureCard feature={slots} className="lg:col-span-2" />
          <FeatureCard feature={multi} className="bg-[#f3eefe] lg:col-span-2" />
          <FeatureCard feature={reschedule} className="lg:col-span-2" />
          <div className="lg:col-span-6">
            <FeatureCard feature={history} accent />
          </div>
        </div>
      </div>
    </section>
  );
}
