import Image from "next/image";

import { Badge } from "@ui/components/ui/badge";
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
        <Badge
          variant="outline"
          size={"xs"}
          className="text-xl px-2.5 ml-1 rounded-sm"
        >
          AI
        </Badge>
      </p>
    </div>
  );
}
