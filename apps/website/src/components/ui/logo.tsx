import Image from "next/image";

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
          "text-[15px] font-semibold tracking-tight",
          dark ? "text-white" : "text-zinc-900",
        )}
      >
        ScheduleMate<span className="text-[#7c3aed]">&nbsp;AI</span>
      </span>
    </span>
  );
}
