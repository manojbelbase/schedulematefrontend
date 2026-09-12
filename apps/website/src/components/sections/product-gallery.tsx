"use client";

import {
  CalendarDays,
  CheckCircle2,
  MessageSquareText,
  Zap,
} from "lucide-react";

import { AnimatedSection } from "~/components/ui/animated-section";
import { BookingChatCard } from "~/components/ui/booking-chat-card";
import { ProductShot } from "~/components/ui/product-shot";
import { PRODUCT } from "~/constants/content";

function BookingFallback() {
  return (
    <div className="flex aspect-[1280/860] w-full items-center justify-center bg-zinc-50 p-6 sm:p-10">
      <BookingChatCard className="max-w-xs" />
    </div>
  );
}

function CalendarFallback() {
  return (
    <div className="flex aspect-[1280/860] w-full items-center justify-center bg-zinc-50 p-6 sm:p-10">
      <div className="w-full max-w-sm rounded-xl border border-zinc-200 bg-white p-5 shadow-sm">
        <div className="flex items-center gap-2.5 border-b border-zinc-100 pb-3">
          <div className="flex size-7 items-center justify-center rounded-md border border-zinc-200 bg-zinc-50">
            <CalendarDays className="size-4 text-zinc-700" />
          </div>
          <div>
            <p className="text-xs font-semibold text-zinc-900">
              Google Calendar
            </p>
            <p className="text-[11px] text-zinc-500">Not connected yet</p>
          </div>
        </div>
        <div className="space-y-3 pt-4">
          <div className="flex items-center justify-between rounded-lg border border-zinc-200 px-3.5 py-2.5">
            <span className="text-xs text-zinc-600">
              Sync events automatically
            </span>
          </div>
          <div className="rounded-lg border border-zinc-200 bg-zinc-50 px-3.5 py-2.5 text-xs text-zinc-500">
            Connect to let ScheduleMate read and write your calendar for you.
          </div>
          <div className="rounded-lg bg-zinc-900 px-3.5 py-2.5 text-center text-xs font-medium text-white">
            Connect to sync events
          </div>
        </div>
      </div>
    </div>
  );
}

export function ProductGallery() {
  return (
    <section
      id="product"
      className="scroll-mt-20 px-4 py-16 sm:px-6 sm:py-24 lg:px-8"
    >
      <div className="mx-auto max-w-6xl">
        <AnimatedSection className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500">
            {PRODUCT.kicker}
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-zinc-950 sm:text-4xl">
            {PRODUCT.title}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-zinc-600">
            {PRODUCT.subtitle}
          </p>
        </AnimatedSection>

        <div className="mt-12 space-y-16 sm:mt-16 sm:space-y-20">
          <AnimatedSection>
            <div className="grid items-center gap-10 lg:grid-cols-2">
              <div>
                <div className="mb-4 flex size-10 items-center justify-center rounded-lg border border-zinc-200 bg-zinc-50">
                  <MessageSquareText className="size-5 text-zinc-700" />
                </div>
                <h3 className="text-2xl font-semibold tracking-tight text-zinc-950">
                  Book a meeting from a chat message
                </h3>
                <p className="mt-3 max-w-md text-base leading-relaxed text-zinc-600">
                  Ask for a call in plain language. ScheduleMate checks your
                  availability, picks a slot, sends the invite, and confirms it
                  back in the conversation.
                </p>
                <ul className="mt-6 space-y-3">
                  {[
                    "Natural-language booking — no form needed",
                    "Invite sent to the attendee automatically",
                    "Confirmed back in the chat instantly",
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2.5 text-sm text-zinc-600"
                    >
                      <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="lg:ml-auto lg:max-w-xl">
                <ProductShot
                  src="/screenshots/booking.png"
                  alt="Booking a meeting from the chat"
                  fallback={<BookingFallback />}
                />
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection>
            <div className="grid items-center gap-10 lg:grid-cols-2">
              <div className="lg:order-2">
                <div className="mb-4 flex size-10 items-center justify-center rounded-lg border border-zinc-200 bg-zinc-50">
                  <CalendarDays className="size-5 text-zinc-700" />
                </div>
                <h3 className="text-2xl font-semibold tracking-tight text-zinc-950">
                  Connected to your Google Calendar
                </h3>
                <p className="mt-3 max-w-md text-base leading-relaxed text-zinc-600">
                  Connect once from the sidebar. ScheduleMate can then read your
                  availability and write new events straight into your Google
                  Calendar.
                </p>
                <ul className="mt-6 space-y-3">
                  {[
                    "One-click Google sign-in, OAuth-secured",
                    "Reads your real availability before booking",
                    "Disconnect anytime from the sidebar",
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2.5 text-sm text-zinc-600"
                    >
                      <Zap className="mt-0.5 size-4 shrink-0 text-zinc-700" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="lg:order-1 lg:mr-auto lg:max-w-xl">
                <ProductShot
                  src="/screenshots/calendar.png"
                  alt="Google Calendar connection in the sidebar"
                  fallback={<CalendarFallback />}
                />
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
