"use client";

import { useMemo } from "react";

import { ChartCard } from "@ui/components/ui/chart-card";

import type { UsersDashboardData } from "@repo/services/backoffice";

const PROVIDER_COLORS = [
  "#385AD0",
  "#5398FF",
  "#826FED",
  "#7C81F8",
  "#10b981",
  "#f97316",
  "#94A3B8",
];

export function ProviderBreakdownCard({
  stats,
  className,
}: {
  stats?: UsersDashboardData;
  className?: string;
}) {
  const entries = useMemo(
    () =>
      Object.entries(stats?.countByProvider ?? {}).sort(
        ([, a], [, b]) => b - a,
      ),
    [stats?.countByProvider],
  );

  const total = entries.reduce((sum, [, count]) => sum + count, 0);

  return (
    <ChartCard
      title="LLM Providers"
      description="Configurations grouped by provider"
      className={className}
    >
      {entries.length === 0 ? (
        <div className="flex min-h-[120px] items-center justify-center text-sm text-subtle">
          No data in the selected period
        </div>
      ) : (
        <div className="flex flex-col gap-3.5">
          {entries.map(([provider, count], index) => {
            const percent = total > 0 ? (count / total) * 100 : 0;
            const color =
              PROVIDER_COLORS[index % PROVIDER_COLORS.length] ?? "#94A3B8";

            return (
              <div key={provider} className="flex items-center gap-3">
                <span className="flex w-28 shrink-0 items-center gap-2 sm:w-40">
                  <span
                    className="size-2.5 shrink-0 rounded-sm"
                    style={{ backgroundColor: color }}
                  />
                  <span className="truncate text-sm font-medium text-heading">
                    {provider}
                  </span>
                </span>
                <div className="h-2 min-w-0 flex-1 overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full transition-[width] duration-500 motion-reduce:transition-none"
                    style={{ width: `${percent}%`, backgroundColor: color }}
                  />
                </div>
                <span className="w-16 shrink-0 text-right text-sm tabular-nums sm:w-24">
                  <span className="font-semibold text-heading">
                    {count.toLocaleString()}
                  </span>
                  <span className="ml-1 hidden text-xs text-subtle sm:inline">
                    ({percent.toFixed(1)}%)
                  </span>
                </span>
              </div>
            );
          })}
        </div>
      )}
    </ChartCard>
  );
}
