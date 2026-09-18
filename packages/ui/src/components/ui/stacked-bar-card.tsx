"use client";

import type { LucideIcon } from "lucide-react";

import { ChartCard } from "@ui/components/ui/chart-card";
import { DataLegend } from "@ui/components/ui/data-legend";

export type StackedBarItem = {
  id: string;
  label: string;
  color: string;
  value: number;
};

type Props = {
  icon?: LucideIcon;
  title: string;
  description?: string;
  items: StackedBarItem[];
  headlineValue?: number;
  headlineLabel?: string;
  isLoading?: boolean;
  className?: string;
};

export function StackedBarCard({
  icon,
  title,
  description,
  items,
  headlineValue,
  headlineLabel,
  isLoading,
  className,
}: Props) {
  const total = items.reduce((sum, item) => sum + item.value, 0);
  const hasData = total > 0;

  return (
    <ChartCard
      icon={icon}
      title={title}
      description={description}
      isLoading={isLoading}
      className={className}
    >
      {!hasData ? (
        <div className="flex min-h-[180px] items-center justify-center text-sm text-muted-foreground">
          No data in the selected period
        </div>
      ) : (
        <div className="flex h-full min-h-[180px] flex-col justify-center gap-4">
          {headlineValue !== undefined ? (
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-semibold tabular-nums tracking-tight">
                {headlineValue.toLocaleString()}
              </span>
              {headlineLabel ? (
                <span className="text-xs text-foreground/70">
                  {headlineLabel}
                </span>
              ) : null}
            </div>
          ) : null}
          <div
            role="img"
            aria-label={items
              .map((item) => `${item.label}: ${item.value}`)
              .join(", ")}
            className="flex h-2.5 w-full overflow-hidden rounded-sm"
          >
            {items.map((item) => (
              <div
                key={item.id}
                className="h-full transition-[width] duration-300"
                style={{
                  width: `${(item.value / total) * 100}%`,
                  backgroundColor: item.color,
                }}
                title={`${item.label}: ${item.value.toLocaleString()}`}
              />
            ))}
          </div>
          <DataLegend
            direction="vertical"
            className="gap-2"
            items={items.map((item) => ({
              id: item.id,
              label: item.label,
              color: item.color,
              count: item.value,
              percent: ((item.value / total) * 100).toFixed(1),
            }))}
          />
        </div>
      )}
    </ChartCard>
  );
}
