"use client";

import { Mail, MessageSquare } from "lucide-react";

import { GoogleCalendarIcon } from "@ui/components/ui/google-calendar-icon";

import {
  AnimatedSection,
  StaggerContainer,
  StaggerItem,
} from "~/components/ui/animated-section";
import { HOW_IT_WORKS } from "~/constants/content";

const STEP_ICONS = [Mail, GoogleCalendarIcon, MessageSquare] as const;

export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="scroll-mt-20 border-t border-zinc-100 bg-zinc-50/70 px-4 py-16 sm:px-6 sm:py-24 lg:px-8"
    >
      <div className="mx-auto max-w-6xl">
        <AnimatedSection className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500">
            How it works
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-zinc-950 sm:text-4xl">
            {HOW_IT_WORKS.title}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-zinc-600">
            {HOW_IT_WORKS.subtitle}
          </p>
        </AnimatedSection>

        <StaggerContainer className="relative mt-12 grid gap-10 sm:mt-16 sm:grid-cols-3 sm:gap-0">
          <div
            aria-hidden
            className="absolute left-[calc(16.67%+1rem)] right-[calc(16.67%+1rem)] top-6 hidden h-px bg-zinc-200 sm:block"
          />
          {HOW_IT_WORKS.steps.map((step, i) => {
            const Icon = STEP_ICONS[i] ?? Mail;
            return (
              <StaggerItem key={step.number}>
                <div className="relative flex flex-col items-center text-center sm:px-8">
                  <div className="relative z-10 flex size-14 items-center justify-center rounded-sm border border-zinc-200 bg-white shadow-xs">
                    <Icon className="size-5 text-zinc-700" strokeWidth={1.5} />
                    <span className="absolute -right-1.5 -top-1.5 flex size-5 items-center justify-center rounded-full bg-[#7c3aed] text-[10px] font-semibold text-white">
                      {step.number}
                    </span>
                  </div>
                  <h3 className="mt-5 text-[15px] font-semibold text-zinc-950">
                    {step.title}
                  </h3>
                  <p className="mt-2 max-w-xs text-sm leading-relaxed text-zinc-600">
                    {step.description}
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
