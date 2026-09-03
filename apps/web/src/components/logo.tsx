import Image from "next/image";

import { cn } from "@ui/lib/utils";

export default function Logo({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center", className)}>
      <Image
        src="/scheduleGPT.svg"
        alt="ScheduleGPT"
        className="size-16"
        height={300}
        width={300}
      />
      <p className="ml-2 text-4xl font-semibold flex">
        Schedule <span className="text-primary">GPT</span>
      </p>
    </div>
  );
}
