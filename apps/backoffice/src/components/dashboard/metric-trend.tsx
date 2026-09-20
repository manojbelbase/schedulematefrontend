"use client";

import { Minus, TrendingDown, TrendingUp } from "lucide-react";

import { cn } from "@ui/lib/utils";

import type { UsersDashboardData } from "@repo/services/backoffice";

export function sumRoles(stats?: UsersDashboardData) {
  return stats
    ? Object.values(stats.countByRole).reduce((sum, count) => sum + count, 0)
    : 0;
}

export function computeChange(current: number, previous: number) {
  if (previous <= 0) return undefined;
  return ((current - previous) / previous) * 100;
}

export function MetricTrend({ change }: { change?: number }) {
  if (change === undefined || Math.abs(change) < 0.05) {
    return (
      <span className="inline-flex items-center gap-1.5 text-xs font-medium text-subtle">
        <Minus className="size-3.5" />
        No changes!
      </span>
    );
  }

  const isUp = change > 0;
  const Icon = isUp ? TrendingUp : TrendingDown;

  return (
    <span className="inline-flex shrink-0 items-center gap-1 text-xs">
      <Icon
        className={cn(
          "size-3.5",
          isUp ? "text-status-success" : "text-status-error",
        )}
      />
      <span
        className={cn(
          "font-medium tabular-nums",
          isUp ? "text-status-success" : "text-status-error",
        )}
      >
        {Math.abs(change).toFixed(1)}%
      </span>
    </span>
  );
}
