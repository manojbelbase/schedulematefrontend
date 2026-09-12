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
    <div className="border-b border-zinc-200">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between gap-6 py-5 text-left text-[15px] font-medium text-zinc-900"
      >
        {question}
        <ChevronDown
          className={cn(
            "size-4 shrink-0 text-zinc-400 transition-transform duration-200",
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
            <p className="pb-5 text-sm leading-relaxed text-zinc-600">
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
      <div className="mx-auto max-w-2xl">
        <AnimatedSection className="text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500">
            FAQ
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-zinc-950 sm:text-4xl">
            Frequently asked questions
          </h2>
        </AnimatedSection>

        <AnimatedSection delay={0.1} className="mt-12 border-t border-zinc-200">
          {FAQ.map((item) => (
            <FaqItem key={item.question} {...item} />
          ))}
        </AnimatedSection>

        <AnimatedSection delay={0.15} className="mt-12 text-center">
          <p className="text-sm text-zinc-600">Still have questions?</p>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-flex h-10 items-center rounded-sm border border-zinc-300 px-4 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-50"
          >
            Contact us on WhatsApp
          </a>
        </AnimatedSection>
      </div>
    </section>
  );
}
