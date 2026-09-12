import Image from "next/image";

import { Badge } from "@ui/components/ui/badge";
import { cn } from "@ui/lib/utils";

import schedulemateLogo from "~/assets/schedulemate-logo.png";

export default function Logo({
  className,
  dark = false,
}: {
  className?: string;
  dark?: boolean;
}) {
  return (
    <section className={cn("inline-flex items-center ", className)}>
      <Image
        src={schedulemateLogo}
        alt="ScheduleMate AI"
        width={32}
        height={32}
        className="size-8 shrink-0 rounded-md"
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
    </section>
  );
}
