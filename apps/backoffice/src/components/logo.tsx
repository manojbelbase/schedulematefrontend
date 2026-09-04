import { cn } from "@ui/lib/utils";

export default function Logo({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center", className)}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/scheduleGPT.svg" alt="ScheduleGPT" className="size-12" />
    </div>
  );
}
