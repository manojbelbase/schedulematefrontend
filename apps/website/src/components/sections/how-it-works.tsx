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
      className="scroll-mt-20 border-t border-zinc-100 bg-zinc-50/70 px-4 py-24 sm:px-6 lg:px-8"
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

        <StaggerContainer className="mt-16 grid gap-12 sm:grid-cols-3 sm:gap-8">
          {HOW_IT_WORKS.steps.map((step, i) => (
            <StaggerItem key={step.number}>
              <div className="text-center sm:text-left">
                <p className="text-sm font-medium tabular-nums text-zinc-400">
                  0{i + 1}
                </p>
                <h3 className="mt-3 text-[15px] font-semibold text-zinc-950">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-600">
                  {step.description}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
