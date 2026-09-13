import { CheckCircle2 } from "lucide-react";

import { cn } from "@ui/lib/utils";

export function BookingChatCard({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "w-full max-w-sm rounded-2xl border border-zinc-200 bg-white p-4 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.2)]",
        className,
      )}
    >
      <div className="flex items-center justify-between border-b border-zinc-100 pb-3 text-xs">
        <span className="font-medium text-zinc-900">ScheduleMate AI</span>
        <span className="inline-flex items-center gap-1.5 font-medium text-zinc-500">
          <span className="size-1.5 animate-pulse rounded-full bg-emerald-500" />
          Online
        </span>
      </div>
      <div className="space-y-3 pt-4">
        <div className="ml-auto w-fit max-w-[90%] rounded-xl rounded-br-sm bg-zinc-900 px-3.5 py-2 text-left text-sm leading-relaxed text-zinc-50">
          Book a 30-min call with Sarah on Thursday at 3 PM.
        </div>
        <div className="w-fit max-w-[90%] rounded-xl rounded-bl-sm border border-zinc-200 bg-white px-3.5 py-2.5 text-left">
          <div className="flex items-center gap-2 text-sm font-medium text-zinc-900">
            <CheckCircle2 className="size-4 shrink-0 text-primary" />
            Done — booked Thu 3:00–3:30 PM
          </div>
        </div>
      </div>
    </div>
  );
}
