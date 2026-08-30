"use client";

import type { LucideIcon } from "lucide-react";
import { Label, Pie, PieChart } from "recharts";

import { ChartCard } from "@ui/components/ui/chart-card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@ui/components/ui/charts";
import { DataLegend } from "@ui/components/ui/data-legend";

export type DonutChartItem = {
  id: string;
  label: string;
  color: string;
  value: number;
};

type Props = {
  icon?: LucideIcon;
  title: string;
  description?: string;
  items: DonutChartItem[];
  centerLabel?: string;
  centerValue?: number;
};

export function DonutChartCard({
  icon,
  title,
  description,
  items,
  centerLabel,
  centerValue,
}: Props) {
  const total = items.reduce((sum, i) => sum + i.value, 0);

  const chartConfig = items.reduce<ChartConfig>((acc, item) => {
    acc[item.id] = { label: item.label, color: item.color };
    return acc;
  }, {});

  const chartData = items.map((item) => ({
    name: item.id,
    value: item.value,
    fill: `var(--color-${item.id})`,
    percentage: total === 0 ? 0 : (item.value / total) * 100,
  }));

  const hasData = total > 0;

  return (
    <ChartCard icon={icon} title={title} description={description}>
      {!hasData ? (
        <div className="flex aspect-square max-h-[220px] items-center justify-center text-sm text-muted-foreground">
          No data in the selected period
        </div>
      ) : (
        <>
          <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square max-h-[220px]"
          >
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={
                  <ChartTooltipContent
                    nameKey="name"
                    hideLabel
                    formatter={(value, _name, item) => [
                      `${Number(value).toLocaleString()} (${item?.payload.percentage.toFixed(1)}%)`,
                      item?.payload.name,
                    ]}
                  />
                }
              />
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                innerRadius={55}
                strokeWidth={5}
              >
                <Label
                  content={({ viewBox }) => {
                    const box = viewBox as
                      { cx?: number; cy?: number } | undefined;
                    if (!box || box.cx === undefined || box.cy === undefined) {
                      return null;
                    }
                    return (
                      <text
                        x={box.cx}
                        y={box.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={box.cx}
                          y={box.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {centerValue !== undefined
                            ? centerValue.toLocaleString()
                            : total.toLocaleString()}
                        </tspan>
                        <tspan
                          x={box.cx}
                          y={(box.cy ?? 0) + 24}
                          className="fill-muted-foreground"
                        >
                          {centerLabel ?? "total"}
                        </tspan>
                      </text>
                    );
                  }}
                />
              </Pie>
            </PieChart>
          </ChartContainer>
          <DataLegend
            direction="vertical"
            className="mt-4 gap-2"
            items={items.map((item) => ({
              id: item.id,
              label: item.label,
              color: item.color,
              count: item.value,
              percent:
                total === 0 ? "0" : ((item.value / total) * 100).toFixed(1),
            }))}
          />
        </>
      )}
    </ChartCard>
  );
}
