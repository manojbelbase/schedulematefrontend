"use client";

import { Monitor, Smartphone, Tablet } from "lucide-react";

import { AnimatedSection } from "~/components/ui/animated-section";
import { APP_DOWNLOAD } from "~/constants/content";

const deviceIcons = [
  { icon: Monitor, label: "Desktop" },
  { icon: Tablet, label: "Tablet" },
  { icon: Smartphone, label: "Mobile" },
];

export function AppDownload() {
  return (
    <section className="border-t border-black/5 px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <AnimatedSection>
            <p className="text-xs font-semibold uppercase tracking-widest text-[#7c3aed]">
              Access anywhere
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-zinc-950 sm:text-4xl lg:text-[2.75rem]">
              {APP_DOWNLOAD.title}
            </h2>
            <p className="mt-4 max-w-md text-base text-zinc-600">
              {APP_DOWNLOAD.subtitle}
            </p>
            <ul className="mt-6 space-y-3">
              {APP_DOWNLOAD.features.map((f) => (
                <li
                  key={f}
                  className="flex items-center gap-2.5 text-sm text-zinc-600"
                >
                  <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-[#7c3aed]/10">
                    <svg
                      className="size-3 text-[#7c3aed]"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2.5}
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </span>
                  {f}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex items-center gap-4 text-zinc-500">
              {deviceIcons.map(({ icon: DeviceIcon, label }) => (
                <span
                  key={label}
                  className="inline-flex items-center gap-1.5 text-xs font-medium"
                >
                  <DeviceIcon className="size-4" />
                  {label}
                </span>
              ))}
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <div className="overflow-hidden rounded-2xl border border-black/5 bg-white shadow-[0_16px_40px_rgba(124,58,237,0.08)]">
              <div className="flex items-center gap-2 border-b border-black/5 bg-zinc-50 px-4 py-3">
                <span className="size-3 rounded-full bg-zinc-200" />
                <span className="size-3 rounded-full bg-zinc-200" />
                <span className="size-3 rounded-full bg-zinc-200" />
                <span className="ml-2 rounded-md border border-black/5 bg-white px-3 py-1 text-xs text-zinc-400">
                  app.schedulemate.app
                </span>
              </div>
              <div className="space-y-3 p-5">
                <div className="flex items-center gap-2">
                  <div className="flex size-6 items-center justify-center rounded-full bg-[#7c3aed]/15 text-[10px] font-semibold text-[#7c3aed]">
                    You
                  </div>
                  <div className="rounded-xl rounded-tl-sm bg-zinc-100 px-3 py-2 text-xs text-zinc-700">
                    Find me a free 45-min slot tomorrow for a client call
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <div className="flex size-6 items-center justify-center rounded-full bg-[#7c3aed] text-[10px] font-semibold text-white">
                    AI
                  </div>
                  <div className="max-w-[85%] space-y-2">
                    <div className="rounded-xl rounded-tl-sm bg-zinc-100 px-3 py-2 text-xs text-zinc-700">
                      You&apos;re free between 2:00 PM and 5:00 PM. Shall I book
                      it for 2:00 PM?
                    </div>
                    <div className="flex gap-2">
                      <span className="rounded-full bg-[#7c3aed] px-3 py-1 text-xs font-medium text-white">
                        Yes, book it
                      </span>
                      <span className="rounded-full border border-black/5 px-3 py-1 text-xs text-zinc-500">
                        Pick another time
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
