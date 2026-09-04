"use client";

import {
  AnimatedSection,
  StaggerContainer,
  StaggerItem,
} from "~/components/ui/animated-section";
import { HOW_IT_WORKS } from "~/constants/content";

export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="scroll-mt-20 px-4 py-24 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-6xl">
        <AnimatedSection className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#7c3aed]">
            How it works
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-zinc-950 sm:text-4xl lg:text-[2.75rem]">
            {HOW_IT_WORKS.title}
          </h2>
          <p className="mt-4 text-base text-zinc-600 sm:text-lg">
            {HOW_IT_WORKS.subtitle}
          </p>
        </AnimatedSection>

        <div className="relative mt-16">
          <div className="absolute left-0 right-0 top-6 hidden h-px bg-zinc-200 lg:block" />
          <StaggerContainer className="grid gap-10 sm:grid-cols-3">
            {HOW_IT_WORKS.steps.map((step, i) => (
              <StaggerItem key={step.number}>
                <div className="relative lg:px-2">
                  <div className="relative z-10 mb-5 flex size-12 items-center justify-center rounded-2xl border border-black/5 bg-white shadow-sm">
                    <span className="text-base font-semibold text-[#7c3aed]">
                      {i + 1}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-zinc-950">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-500">
                    {step.description}
                  </p>
                  <p className="mt-4 inline-flex rounded-full bg-[#7c3aed]/10 px-3 py-1 text-xs font-medium text-[#7c3aed]">
                    {step.highlight}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </div>
    </section>
  );
}
