"use client";

import { Gauge } from "lucide-react";

import { cn } from "@ui/lib/utils";

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

  const label = expanded ? (
    <div className="space-y-1.5 border border-sidebar-border rounded-sm bg-sidebar/50 p-2">
      <div className="flex items-center justify-between text-xs">
        <span className="font-medium text-foreground">Request limits</span>
        <span className="text-muted-foreground">
          {used} / {limit} used
        </span>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-sidebar-border">
        <div
          className="h-full rounded-full bg-primary transition-all"
          style={{ width: `${percent}%` }}
        />
      </div>
      <p className="text-xs text-muted-foreground">
        {remaining} request{remaining === 1 ? "" : "s"} remaining
      </p>
    </div>
  ) : (
    <span title={`${used} / ${limit} requests used · ${remaining} remaining`}>
      <Gauge className="size-4 text-muted-foreground" />
    </span>
  );

  return (
    <div className={cn("shrink-0", !expanded && "flex justify-center")}>
      {label}
    </div>
  );
}
