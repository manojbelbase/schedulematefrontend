"use client";

import { Gauge } from "lucide-react";

import { useAuth } from "@/hooks/use-auth";

export default function RequestLimitIndicator({
  expanded,
}: {
  expanded: boolean;
}) {
  const { user } = useAuth();

  const used = user?.apiRequestsUsed ?? 0;
  const limit = user?.apiRequestLimit ?? 0;

  if (!user || limit <= 0) return null;

  const remaining = Math.max(limit - used, 0);
  const ratio = Math.min(Math.max(used / limit, 0), 1);
  const percent = Math.round(ratio * 100);

  if (!expanded) {
    return (
      <div className="flex justify-center py-1.5">
        <span
          title={`${used} / ${limit} requests used · ${remaining} remaining`}
          className="text-muted-foreground"
        >
          <Gauge className="size-4" />
        </span>
      </div>
    );
  }

  return (
    <div className="mb-1 rounded-sm border border-border/40 bg-sidebar-accent/40 px-3 py-2.5">
      <div className="flex items-center justify-between text-xs">
        <span className="font-medium text-foreground/80">Requests</span>
        <span className="tabular-nums text-muted-foreground">
          {used}/{limit}
        </span>
      </div>
      <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-border/50">
        <div
          className="h-full rounded-full bg-primary/70 transition-all duration-300"
          style={{ width: `${percent}%` }}
        />
      </div>
      <p className="mt-1.5 text-[11px] text-muted-foreground">
        {remaining} remaining
      </p>
    </div>
  );
}
