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
    <section
      id="pricing"
      className="relative scroll-mt-20 overflow-hidden border-t border-zinc-100 bg-zinc-50/60 px-4 py-16 sm:px-6 sm:py-24 lg:px-8"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(124,58,237,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(124,58,237,0.06)_1px,transparent_1px)] bg-[size:44px_44px] [mask-image:radial-gradient(70%_65%_at_50%_0%,black,transparent_75%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-96 bg-[radial-gradient(60%_100%_at_50%_0%,rgba(124,58,237,0.1),transparent_70%)]"
      />
      <div className="relative mx-auto max-w-6xl">
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

        <StaggerContainer className="mt-10 grid max-w-6xl gap-5 sm:mt-14 sm:grid-cols-2 lg:grid-cols-3">
          {PRICING.plans.map((plan) => (
            <StaggerItem key={plan.name} className="flex">
              <div
                className={`flex w-full flex-col rounded-sm border bg-white p-6 sm:p-7 `}
              >
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-base font-semibold text-zinc-950">
                    {plan.name}
                  </h3>
                  {plan.featured && (
                    <span className="rounded-full px-2.5 py-0.5 text-xs text-primary font-medium border border-primary">
                      Recommended
                    </span>
                  )}
                </div>

                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-2xl sm:text-4xl font-semibold tracking-tight text-zinc-950">
                    {plan.price}
                  </span>
                  {plan.period && (
                    <span className="text-sm text-zinc-400">
                      / {plan.period}
                    </span>
                  )}
                </div>
                {plan.tagline && (
                  <p className="mt-1.5 text-xs font-medium uppercase tracking-wider text-primary">
                    {plan.tagline}
                  </p>
                )}
                <p className="mt-3 text-sm leading-relaxed text-zinc-500">
                  {plan.description}
                </p>

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
