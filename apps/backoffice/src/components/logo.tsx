import { cn } from "@ui/lib/utils";

export default function Logo({ className }: { className?: string }) {
  return (
    <div className={cn("flex flex-col items-center gap-3", className)}>
      <div className="flex items-center gap-1">
        <span className="font-display text-3xl font-bold tracking-tight text-foreground">
          Schedule
          <span className="bg-gradient-to-r from-violet-600 to-indigo-500 bg-clip-text text-transparent">
            Mate
          </span>
        </span>
        <span className="flex items-center gap-1 rounded-full bg-gradient-to-r from-violet-600 to-indigo-500 px-2 py-0.5 text-[10px] font-semibold tracking-widest text-white uppercase">
          Backoffice
        </span>
      </div>
    </div>
  );
}
