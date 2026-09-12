"use client";

import {
  Calendar,
  Clock,
  MessageCircle,
  MessageSquare,
  RefreshCw,
  Users,
} from "lucide-react";

import {
  AnimatedSection,
  StaggerContainer,
  StaggerItem,
} from "~/components/ui/animated-section";
import { FEATURES } from "~/constants/content";

const iconMap = {
  MessageSquare,
  Calendar,
  Clock,
  Users,
  RefreshCw,
  MessageCircle,
} as const;

export function Features() {
  return (
    <section
      id="features"
      className="scroll-mt-20 border-t border-zinc-100 px-4 py-24 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-6xl">
        <AnimatedSection className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500">
            Key features
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-zinc-950 sm:text-4xl">
            A scheduling assistant, not another calendar
          </h2>
          <p className="mt-4 text-base leading-relaxed text-zinc-600">
            Everything lives in one chat. Tell it what you need, and it reads
            and writes your Google Calendar for you.
          </p>
        </AnimatedSection>

        <StaggerContainer className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature) => {
            const Icon = iconMap[feature.icon as keyof typeof iconMap];
            return (
              <StaggerItem key={feature.title}>
                <div className="h-full rounded-xl border border-zinc-200 bg-white p-6 transition-colors hover:border-zinc-300">
                  <div className="mb-4 flex size-9 items-center justify-center rounded-lg border border-zinc-200 bg-zinc-50">
                    <Icon className="size-4 text-zinc-700" />
                  </div>
                  <h3 className="text-[15px] font-semibold text-zinc-950">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-600">
                    {feature.description}
                  </p>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}
