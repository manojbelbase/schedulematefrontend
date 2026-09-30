"use client";

import { PolarAngleAxis, RadialBar, RadialBarChart } from "recharts";

import { Badge, type TBadgeVariantProps } from "@ui/components/ui/badge";
import { ChartCard } from "@ui/components/ui/chart-card";
import { ChartContainer, type ChartConfig } from "@ui/components/ui/charts";

import type { UsersDashboardData } from "@repo/services/backoffice";

function getStatus(percent: number): {
  label: string;
  variant: NonNullable<TBadgeVariantProps["variant"]>;
} {
  if (percent >= 90) return { label: "Critical", variant: "red" };
  if (percent >= 70) return { label: "Elevated", variant: "orange" };
  return { label: "Healthy", variant: "green" };
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-0.5 rounded-sm bg-muted/50 px-3 py-2">
      <span className="text-xs font-medium tracking-wide text-subtle">
        {label}
      </span>
      <span className="text-sm font-semibold tabular-nums text-heading">
        {value}
      </span>
    </div>
  );
}

export function ApiUsageCard({
  stats,
  className,
}: {
  stats?: UsersDashboardData;
  className?: string;
}) {
  const used = stats?.totalApiRequestsUsed ?? 0;
  const limit = stats?.totalApiRequestLimit ?? 0;
  const percent = limit > 0 ? Math.min((used / limit) * 100, 100) : 0;
  const remaining = Math.max(limit - used, 0);
  const totalUsers = stats
    ? Object.values(stats.countByRole).reduce((sum, count) => sum + count, 0)
    : 0;
  const avgPerUser = totalUsers > 0 ? used / totalUsers : 0;
  const status = getStatus(percent);
  const hasData = limit > 0;

  const chartConfig = {
    value: { label: "Used", color: "var(--color-chart-1)" },
  } satisfies ChartConfig;

  const chartData = [{ name: "value", value: percent }];

  return (
    <ChartCard
      title="API Requests"
      description="Share of the API request limit consumed"
      className={className}
      action={
        <Badge variant={status.variant} size="sm">
          {status.label}
        </Badge>
      }
    >
      {!hasData ? (
        <div className="flex min-h-[180px] items-center justify-center text-sm text-subtle">
          No data in the selected period
        </div>
      ) : (
        <div className="flex h-full flex-col items-center justify-center gap-6">
          <div className="relative aspect-square w-full max-w-[190px]">
            <ChartContainer
              config={chartConfig}
              className="mx-auto aspect-square h-full w-full"
            >
              <RadialBarChart
                data={chartData}
                startAngle={90}
                endAngle={-270}
                innerRadius="72%"
                outerRadius="100%"
              >
                <PolarAngleAxis
                  type="number"
                  domain={[0, 100]}
                  angleAxisId={0}
                  tick={false}
                />
                <RadialBar
                  dataKey="value"
                  angleAxisId={0}
                  background
                  cornerRadius={999}
                  fill="var(--color-value)"
                />
              </RadialBarChart>
            </ChartContainer>
            <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-2xl font-semibold tabular-nums tracking-tight">
                {percent.toFixed(0)}%
              </span>
              <span className="text-xs text-subtle">used</span>
            </div>
          </div>
          <div className="grid w-full grid-cols-2 gap-3">
            <Metric label="Used" value={used.toLocaleString()} />
            <Metric label="Limit" value={limit.toLocaleString()} />
            <Metric label="Remaining" value={remaining.toLocaleString()} />
            <Metric
              label="Avg / user"
              value={totalUsers > 0 ? avgPerUser.toFixed(1) : "—"}
            />
          </div>
        </div>
      )}
    </ChartCard>
  );
}
