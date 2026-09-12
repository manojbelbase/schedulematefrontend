import { cn } from "@ui/lib/utils";

const DAYS = ["M", "T", "W", "T", "F"];

export function WeekStrip({ className }: { className?: string }) {
  return (
    <div aria-hidden className={cn("flex items-center gap-1.5", className)}>
      {DAYS.map((day, i) => (
        <span
          key={`${day}-${i}`}
          className={cn(
            "flex size-7 items-center justify-center rounded-md border text-[11px] font-medium",
            i === 2
              ? "border-[#7c3aed]/30 bg-[#7c3aed]/10 text-[#6d28d9]"
              : "border-zinc-200 bg-white text-zinc-500",
          )}
        >
          {day}
        </span>
      ))}
    </div>
  );
}
