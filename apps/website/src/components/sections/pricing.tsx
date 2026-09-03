"use client";

import { CheckCircle2 } from "lucide-react";

import { Button } from "@ui/components/ui/button";

import {
  AnimatedSection,
  StaggerContainer,
  StaggerItem,
} from "~/components/ui/animated-section";
import { PRICING } from "~/constants/content";

export function Pricing() {
  return (
    <section
      id="pricing"
      className="scroll-mt-20 relative overflow-hidden border-y border-black/5 bg-zinc-50 px-4 py-24 sm:px-6 lg:px-8"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(124,58,237,0.08),transparent_55%)]" />

      <div className="relative mx-auto max-w-6xl">
        <AnimatedSection className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#7c3aed]">
            {PRICING.kicker}
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-zinc-950 sm:text-4xl lg:text-[2.75rem]">
            Simple plans with{" "}
            <span className="text-[#7c3aed]">room to grow</span>
          </h2>
          <p className="mt-4 text-base text-zinc-600 sm:text-lg">
            {PRICING.subtitle}
          </p>
        </AnimatedSection>

        <StaggerContainer className="mx-auto mt-14 grid max-w-4xl gap-5 sm:grid-cols-2">
          {PRICING.plans.map((plan) => (
            <StaggerItem key={plan.name} className="flex">
              <div
                className={`flex w-full flex-col rounded-2xl p-8 ${
                  plan.featured
                    ? "border-2 border-[#7c3aed] bg-white shadow-[0_8px_30px_rgba(124,58,237,0.1)]"
                    : "border border-black/5 bg-white"
                }`}
              >
                {plan.featured && (
                  <span className="mb-4 inline-flex self-start rounded-full bg-[#7c3aed]/10 px-3 py-1 text-xs font-medium text-[#7c3aed]">
                    Recommended
                  </span>
                )}
                <h3 className="text-lg font-semibold text-zinc-950">
                  {plan.name}
                </h3>
                <div className="mt-2 flex items-baseline gap-1">
                  <span className="text-4xl font-bold tracking-tight text-zinc-950">
                    {plan.price}
                  </span>
                  {plan.period && (
                    <span className="text-sm text-zinc-400">
                      / {plan.period}
                    </span>
                  )}
                </div>
                <p className="mt-3 text-sm text-zinc-500">{plan.description}</p>
                <ul className="mt-6 flex-1 space-y-3">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-2.5 text-sm text-zinc-600"
                    >
                      <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-[#7c3aed]" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <div className="mt-8">
                  {plan.cta.href.startsWith("http") ? (
                    <Button
                      asChild
                      className={`h-11 w-full rounded-full text-sm font-medium ${
                        plan.featured
                          ? "bg-[#7c3aed] text-white hover:bg-[#7c3aed]/90"
                          : "bg-zinc-950 text-white hover:bg-zinc-800"
                      }`}
                    >
                      <a
                        href={plan.cta.href}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {plan.cta.label}
                      </a>
                    </Button>
                  ) : (
                    <Button
                      asChild
                      className={`h-11 w-full rounded-full text-sm font-medium ${
                        plan.featured
                          ? "bg-[#7c3aed] text-white hover:bg-[#7c3aed]/90"
                          : "bg-zinc-950 text-white hover:bg-zinc-800"
                      }`}
                    >
                      <a href={plan.cta.href}>{plan.cta.label}</a>
                    </Button>
                  )}
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
