"use client";

import type { LucideIcon } from "lucide-react";
import { PolarAngleAxis, RadialBar, RadialBarChart } from "recharts";

import { ChartCard } from "@ui/components/ui/chart-card";
import { ChartContainer, type ChartConfig } from "@ui/components/ui/charts";

type Props = {
  icon?: LucideIcon;
  title: string;
  description?: string;
  value: number;
  max: number;
  centerLabel?: string;
  color?: string;
  isLoading?: boolean;
  className?: string;
};

export function RadialChartCard({
  icon,
  title,
  description,
  value,
  max,
  centerLabel,
  color = "var(--color-chart-1)",
  isLoading,
  className,
}: Props) {
  const safeMax = max > 0 ? max : 0;
  const percent = safeMax === 0 ? 0 : Math.min((value / safeMax) * 100, 100);
  const hasData = safeMax > 0;

  const chartConfig = {
    value: { label: centerLabel ?? "Used", color },
  } satisfies ChartConfig;

  const chartData = [{ name: "value", value: percent }];

  return (
    <ChartCard
      icon={icon}
      title={title}
      description={description}
      isLoading={isLoading}
      className={className}
    >
      {!hasData ? (
        <div className="flex aspect-square max-h-[220px] items-center justify-center text-sm text-muted-foreground">
          No data in the selected period
        </div>
      ) : (
        <div className="relative mx-auto aspect-square w-full max-w-[220px]">
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
            {centerLabel ? (
              <span className="text-xs text-muted-foreground">
                {centerLabel}
              </span>
            ) : null}
          </div>
        </div>
      )}
    </ChartCard>
  );
}
