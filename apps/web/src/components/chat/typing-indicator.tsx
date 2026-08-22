"use client";

export function TypingIndicator() {
  return (
    <div className="flex w-full items-start">
      <div className="w-fit rounded-2xl rounded-tl-sm border border-border bg-card px-4 py-3 shadow-sm">
        <span className="flex items-center gap-1.5">
          <span className="size-1.5 animate-pulse rounded-full bg-foreground/40" />
          <span
            className="size-1.5 animate-pulse rounded-full bg-foreground/40"
            style={{ animationDelay: "150ms" }}
          />
          <span
            className="size-1.5 animate-pulse rounded-full bg-foreground/40"
            style={{ animationDelay: "300ms" }}
          />
        </span>
      </div>
    </div>
  );
}
