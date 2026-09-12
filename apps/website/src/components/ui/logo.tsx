import Image from "next/image";

import { Badge } from "@ui/components/ui/badge";
import { cn } from "@ui/lib/utils";

export default function Logo({
  className,
  dark = false,
}: {
  className?: string;
  dark?: boolean;
}) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <Image
        src="/schedulemate.svg"
        alt="ScheduleMate AI"
        width={32}
        height={32}
        className="size-8 shrink-0"
      />
      <span
        className={cn(
          "flex items-center text-[15px] font-semibold tracking-tight",
          dark ? "text-white" : "text-zinc-900",
        )}
      >
        Schedule
        <span className="font-extrabold text-primary">Mate</span>
        <Badge
          variant="outline"
          size="xs"
          className={cn(
            "ml-1.5 rounded-full px-1.5 py-0 text-[10px] font-medium",
            dark
              ? "border-white/25 bg-transparent text-white"
              : "border-zinc-300 bg-transparent text-zinc-600",
          )}
        >
          AI
        </Badge>
      </span>
    </span>
  );
}
