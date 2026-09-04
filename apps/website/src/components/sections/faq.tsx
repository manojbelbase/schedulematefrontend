"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

import { cn } from "@ui/lib/utils";

import { AnimatedSection } from "~/components/ui/animated-section";
import { FAQ, WHATSAPP_URL } from "~/constants/content";

function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-zinc-200/90">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between py-5 text-left text-base font-medium text-zinc-900 transition-colors hover:text-[#7c3aed]"
      >
        {question}
        <ChevronDown
          className={cn(
            "size-5 shrink-0 text-zinc-400 transition-transform duration-200",
            isOpen && "rotate-180",
          )}
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-sm leading-relaxed text-zinc-500">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Faq() {
  return (
    <section id="faq" className="scroll-mt-20 px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.3fr]">
          <AnimatedSection>
            <p className="text-xs font-semibold uppercase tracking-widest text-[#7c3aed]">
              FAQ
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-zinc-950 sm:text-4xl lg:text-[2.75rem]">
              Frequently asked questions
            </h2>
            <p className="mt-4 max-w-md text-base text-zinc-600">
              Everything you need to know about ScheduleGPT. Still have
              questions?
            </p>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex h-11 items-center justify-center rounded-full bg-[#7c3aed] px-6 text-sm font-medium text-white transition-colors hover:bg-[#7c3aed]/90"
            >
              Contact us on WhatsApp
            </a>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <div className="rounded-2xl border border-zinc-200/90 bg-white p-6">
              {FAQ.map((item) => (
                <FaqItem key={item.question} {...item} />
              ))}
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
