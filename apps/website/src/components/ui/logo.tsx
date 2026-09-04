import { cn } from "@ui/lib/utils";

export default function Logo({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="flex size-8 items-center justify-center rounded-lg bg-[#7c3aed]">
        <svg
          className="size-4 text-white"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10z" />
        </svg>
      </div>
      <span className="text-base font-semibold text-zinc-900">scheduleGPT</span>
    </div>
  );
}
