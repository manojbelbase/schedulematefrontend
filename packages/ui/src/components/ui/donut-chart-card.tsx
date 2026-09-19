"use client";

import { useMemo, useState } from "react";
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
  isLoading?: boolean;
  className?: string;
};

export function DonutChartCard({
  icon,
  title,
  description,
  items,
  centerLabel,
  centerValue,
  isLoading,
  className,
}: Props) {
  const [selectedIds, setSelectedIds] = useState<Set<string>>();

  const allIds = useMemo(() => items.map((i) => i.id), [items]);
  const allTotal = useMemo(
    () => items.reduce((sum, i) => sum + i.value, 0),
    [items],
  );

  const toggleItem = (id: string) => {
    setSelectedIds((prev) => {
      const base = prev ?? new Set(allIds);
      const next = new Set(base);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const visibleItems = useMemo(() => {
    if (!selectedIds) return items;
    return items.filter((i) => selectedIds.has(i.id));
  }, [items, selectedIds]);

  const total = visibleItems.reduce((sum, i) => sum + i.value, 0);

  const chartConfig = items.reduce<ChartConfig>((acc, item) => {
    acc[item.id] = { label: item.label, color: item.color };
    return acc;
  }, {});

  const chartData = visibleItems.map((item) => ({
    name: item.id,
    value: item.value,
    fill: `var(--color-${item.id})`,
    percentage: total === 0 ? 0 : (item.value / total) * 100,
  }));

  const hasData = visibleItems.length > 0 && total > 0;
  const centerNumber =
    centerValue !== undefined && !selectedIds ? centerValue : total;

  return (
    <ChartCard
      icon={icon}
      title={title}
      description={description}
      isLoading={isLoading}
      className={className}
    >
      {!hasData ? (
        <div className="flex flex-1 items-center justify-center text-sm text-subtle">
          No data in the selected period
        </div>
      ) : (
        <div className="flex flex-1 flex-col">
          <ChartContainer
            config={chartConfig}
            className="mx-auto min-h-[160px] w-full flex-1"
          >
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={
                  <ChartTooltipContent
                    nameKey="name"
                    hideLabel
                    formatter={(value, _name, item) => [
                      `${Number(value).toLocaleString()} (${(item?.payload?.percentage ?? 0).toFixed(1)}%)`,
                      item?.payload?.name,
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
                          className="fill-foreground text-2xl font-semibold tabular-nums"
                        >
                          {centerNumber.toLocaleString()}
                        </tspan>
                        <tspan
                          x={box.cx}
                          y={(box.cy ?? 0) + 22}
                          className="fill-muted-foreground text-xs"
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
            selectedIds={selectedIds}
            onToggle={toggleItem}
            items={items.map((item) => ({
              id: item.id,
              label: item.label,
              color: item.color,
              count: item.value,
              percent:
                allTotal === 0
                  ? "0"
                  : ((item.value / allTotal) * 100).toFixed(1),
            }))}
          />
        </div>
      )}
    </ChartCard>
  );
}
