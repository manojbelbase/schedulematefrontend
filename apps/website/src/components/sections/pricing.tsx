"use client";

import { Check } from "lucide-react";

import { Button } from "@ui/components/ui/button";

import {
  AnimatedSection,
  StaggerContainer,
  StaggerItem,
} from "~/components/ui/animated-section";
import { PRICING } from "~/constants/content";

export function Pricing() {
  return (
    <section id="pricing" className="scroll-mt-20 px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <AnimatedSection className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500">
            {PRICING.kicker}
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-zinc-950 sm:text-4xl">
            {PRICING.title}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-zinc-600">
            {PRICING.subtitle}
          </p>
        </AnimatedSection>

        <StaggerContainer className="mx-auto mt-14 grid max-w-4xl gap-5 sm:grid-cols-2">
          {PRICING.plans.map((plan) => (
            <StaggerItem key={plan.name} className="flex">
              <div
                className={`flex w-full flex-col rounded-xl border bg-white p-7 ${
                  plan.featured
                    ? "border-zinc-900 shadow-sm"
                    : "border-zinc-200"
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-base font-semibold text-zinc-950">
                    {plan.name}
                  </h3>
                  {plan.featured && (
                    <span className="rounded-full bg-zinc-900 px-2.5 py-0.5 text-[11px] font-medium text-white">
                      Recommended
                    </span>
                  )}
                </div>

                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-4xl font-semibold tracking-tight text-zinc-950">
                    {plan.price}
                  </span>
                  {plan.period && (
                    <span className="text-sm text-zinc-400">
                      / {plan.period}
                    </span>
                  )}
                </div>
                <p className="mt-2 text-sm text-zinc-500">{plan.description}</p>

                <ul className="mt-6 flex-1 space-y-2.5">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-2.5 text-sm text-zinc-600"
                    >
                      <Check className="mt-0.5 size-4 shrink-0 text-zinc-700" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <div className="mt-8">
                  {plan.featured ? (
                    <Button
                      asChild
                      className="h-10 w-full rounded-sm border-0 bg-zinc-900 text-sm font-medium text-white hover:bg-zinc-800"
                    >
                      <a href={plan.cta.href}>{plan.cta.label}</a>
                    </Button>
                  ) : (
                    <Button
                      variant="outline"
                      asChild
                      className="h-10 w-full rounded-sm border-zinc-300 text-sm font-medium text-zinc-900 hover:bg-zinc-50"
                    >
                      <a
                        href={plan.cta.href}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {plan.cta.label}
                      </a>
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
