import Image from "next/image";

import { cn } from "@ui/lib/utils";

export default function Logo({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center justify-center", className)}>
      <Image
        src="/schedulemate.svg"
        alt="ScheduleMate AI"
        className="size-14"
        height={300}
        width={300}
      />
      <p className="text-4xl font-semibold flex mt-1">
        Schedule<span className="text-primary font-extrabold">Mate</span>{" "}
        <span className="text-primary font-extrabold">AI</span>
      </p>
    </div>
  );
}
