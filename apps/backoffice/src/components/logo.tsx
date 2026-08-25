import { cn } from "@ui/lib/utils";

export default function Logo({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-1.5", className)}>
      <span className="text-lg font-bold tracking-tight text-foreground">
        Schedule
        <span className="bg-gradient-to-r from-violet-600 to-indigo-500 bg-clip-text text-transparent">
          Mate
        </span>
      </span>
      <span className="rounded-md bg-gradient-to-r from-violet-600 to-indigo-500 px-1.5 py-0.5 text-[10px] font-semibold tracking-wider text-white uppercase">
        BO
      </span>
    </div>
  );
}
