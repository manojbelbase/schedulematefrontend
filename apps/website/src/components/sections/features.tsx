"use client";

import {
  ArrowRight,
  CheckCircle2,
  Clock,
  MessageCircle,
  MessageSquare,
  RefreshCw,
  Users,
} from "lucide-react";

import { cn } from "@ui/lib/utils";

import {
  AnimatedSection,
  StaggerContainer,
  StaggerItem,
} from "~/components/ui/animated-section";
import { GoogleCalendarIcon } from "~/components/ui/google-calendar-icon";
import { WeekStrip } from "~/components/ui/week-strip";
import { FEATURES } from "~/constants/content";

const iconMap = {
  MessageSquare,
  Calendar: GoogleCalendarIcon,
  Clock,
  Users,
  RefreshCw,
  MessageCircle,
} as const;

function ChatPreview() {
  return (
    <div className="w-full max-w-[240px] rounded-sm border border-zinc-200 bg-white p-3 shadow-xs">
      <div className="mb-2 flex items-center gap-1.5 text-[10px] font-medium text-zinc-400">
        <span className="size-1.5 rounded-full bg-emerald-500" />
        ScheduleMate AI
      </div>
      <div className="space-y-1.5">
        <div className="ml-auto w-fit max-w-[85%] rounded-sm rounded-br-sm bg-zinc-900 px-2.5 py-1.5 text-xs leading-snug text-zinc-50">
          Book a meeting tomorrow at 10 AM
        </div>
        <div className="flex w-fit max-w-[85%] items-start gap-1.5 rounded-sm rounded-bl-sm border border-zinc-200 bg-white px-2.5 py-1.5 text-[11px] font-medium text-zinc-800">
          <CheckCircle2 className="mt-px size-3 shrink-0 text-primary" />
          Done — added to your calendar
        </div>
      </div>
    </div>
  );
}

function CalendarPreview() {
  return (
    <div className="w-full max-w-[240px] rounded-sm border border-zinc-200 bg-white p-3 shadow-xs">
      <div className="mb-2 flex items-center justify-between gap-2">
        <WeekStrip />
      </div>
      <div className="space-y-1.5">
        <div className="flex items-center gap-2 rounded-sm border border-zinc-200 px-2 py-1.5 text-[11px] text-zinc-700">
          <CheckCircle2 className="size-3 shrink-0 text-primary" />
          9:00 AM — Team standup
        </div>
        <div className="flex items-center gap-2 rounded-sm border border-zinc-200 px-2 py-1.5 text-[11px] text-zinc-700">
          <CheckCircle2 className="size-3 shrink-0 text-primary" />
          2:30 PM — Design review
        </div>
      </div>
    </div>
  );
}

function SlotsPreview() {
  const slots = ["9:00", "10:00", "11:00", "12:00", "1:00", "2:00"];
  return (
    <div className="w-full max-w-[240px] rounded-sm border border-zinc-200 bg-white p-3 shadow-xs">
      <div className="grid grid-cols-3 gap-1.5">
        {slots.map((slot, i) => (
          <span
            key={slot}
            className={cn(
              "rounded-sm border px-1.5 py-1 text-center text-[10px] font-medium",
              i === 3
                ? "border-primary/30 bg-primary/10 text-primary"
                : "border-zinc-200 bg-zinc-50 text-zinc-500",
            )}
          >
            {slot}
          </span>
        ))}
      </div>
      <p className="mt-2 flex items-center gap-1 text-[10px] text-zinc-400">
        <Clock className="size-3 text-primary" />
        Free after 11:00 AM tomorrow
      </p>
    </div>
  );
}

function PeoplePreview() {
  const people = [
    { initials: "AK", bg: "bg-zinc-800" },
    { initials: "MJ", bg: "bg-zinc-500" },
    { initials: "SR", bg: "bg-primary" },
  ];
  return (
    <div className="w-full max-w-[240px] rounded-sm border border-zinc-200 bg-white p-3 shadow-xs">
      <div className="flex items-center gap-2.5">
        <div className="flex -space-x-1.5">
          {people.map((person) => (
            <span
              key={person.initials}
              className={cn(
                "flex size-6 items-center justify-center rounded-full border-2 border-white text-[9px] font-semibold text-white",
                person.bg,
              )}
            >
              {person.initials}
            </span>
          ))}
        </div>
        <div className="min-w-0 text-left">
          <p className="truncate text-[11px] font-medium text-zinc-800">
            All 3 attendees free
          </p>
          <p className="text-[10px] text-zinc-400">
            Thu 3:00 PM — no conflicts
          </p>
        </div>
      </div>
    </div>
  );
}

function ReschedulePreview() {
  return (
    <div className="w-full max-w-[240px] rounded-sm border border-zinc-200 bg-white p-3">
      <div className="flex items-center gap-2">
        <span className="rounded-sm border border-zinc-200 bg-zinc-50 px-2.5 py-1.5 text-xs text-zinc-400 line-through">
          Thu 3:00 PM
        </span>
        <ArrowRight className="size-3.5 shrink-0 text-primary" />
        <span className="rounded-sm border border-primary/30 bg-primary/10 px-2.5 py-1.5 text-xs font-medium text-primary">
          Fri 5:00 PM
        </span>
      </div>
      <div className="mt-2 rounded-sm border border-zinc-200 bg-zinc-50 px-2.5 py-1.5 text-xs text-zinc-500">
        “Move my 3 PM to Friday”
      </div>
    </div>
  );
}

function HistoryPreview() {
  const items = ["Tue, 9:00 AM — Team standup", "Mon, 2:30 PM — Design sync"];
  return (
    <div className="w-full max-w-[240px] rounded-sm border border-border bg-white p-3">
      <div className="space-y-1.5">
        {items.map((item) => (
          <div
            key={item}
            className="flex items-center gap-2 rounded-sm border border-border px-2.5 py-1.5 text-xs text-zinc-700"
          >
            <MessageCircle className="size-3 shrink-0 text-zinc-400" />
            {item}
          </div>
        ))}
      </div>
      <p className="mt-2 text-[10px] text-zinc-400">12 past conversations</p>
    </div>
  );
}

const previews = {
  MessageSquare: ChatPreview,
  Calendar: CalendarPreview,
  Clock: SlotsPreview,
  Users: PeoplePreview,
  RefreshCw: ReschedulePreview,
  MessageCircle: HistoryPreview,
} as const;

export function Features() {
  return (
    <section
      id="features"
      className="relative scroll-mt-20 overflow-hidden border-t border-zinc-100 bg-zinc-50/60 px-4 py-16 sm:px-6 sm:py-24 lg:px-8"
    >
      <div className="relative mx-auto max-w-6xl">
        <AnimatedSection className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500">
            Key features
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-zinc-950 sm:text-4xl">
            A scheduling assistant, not another calendar
          </h2>
          <p className="mt-4 text-base leading-relaxed text-zinc-600">
            Everything lives in one chat. Tell it what you need, and it reads
            and writes your Google Calendar for you.
          </p>
        </AnimatedSection>

        <StaggerContainer className="mt-10 grid gap-5 sm:mt-14 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature) => {
            const Icon = iconMap[feature.icon as keyof typeof iconMap];
            const Preview = previews[feature.icon as keyof typeof previews];
            return (
              <StaggerItem key={feature.title}>
                <div className="group relative h-full rounded-sm bg-gradient-to-br p-px from-zinc-200 to-zinc-200 transition-all duration-300 ">
                  <div className="relative flex h-full flex-col overflow-hidden rounded-sm bg-white">
                    <div className="relative flex min-h-[168px] items-center justify-center border-b border-border bg-zinc-50/60 p-4">
                      <Preview />
                    </div>
                    <div className="relative flex flex-1 flex-col p-5">
                      <div className="flex items-center gap-2.5">
                        <span className="flex size-7 shrink-0 items-center justify-center rounded-sm bg-primary/10">
                          <Icon className="size-4 text-primary" />
                        </span>
                        <h3 className="text-[15px] font-semibold text-zinc-950">
                          {feature.title}
                        </h3>
                      </div>
                      <p className="mt-2 text-sm leading-relaxed text-zinc-600">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}
