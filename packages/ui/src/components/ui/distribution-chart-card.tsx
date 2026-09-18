"use client";

import { useId, useMemo, useState } from "react";
import {
  AreaChart as AreaChartIcon,
  BarChart3,
  BarChartHorizontal,
  LineChart as LineChartIcon,
  type LucideIcon,
} from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  LabelList,
  Line,
  LineChart,
  XAxis,
  YAxis,
} from "recharts";

import { ChartCard } from "@ui/components/ui/chart-card";
import { ChartTypeToggle } from "@ui/components/ui/chart-type-toggle";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@ui/components/ui/charts";
import { DataLegend } from "@ui/components/ui/data-legend";

export type DistributionChartItem = {
  id: string;
  label: string;
  color: string;
  count: number;
};

export type TChartType = "bar-horizontal" | "bar-vertical" | "line" | "area";

type Props = {
  icon?: LucideIcon;
  title: string;
  description?: string;
  items: DistributionChartItem[];
  height?: number;
  defaultChartType?: TChartType;
  isLoading?: boolean;
  className?: string;
};

const chartConfig = {
  count: { label: "Count" },
} satisfies ChartConfig;

export function DistributionChartCard({
  icon,
  title,
  description,
  items,
  height = 260,
  defaultChartType = "bar-horizontal",
  isLoading,
  className,
}: Props) {
  const gradientId = `fill-count-${useId().replace(/:/g, "")}`;
  const [chartType, setChartType] = useState<TChartType>(defaultChartType);
  const [selectedIds, setSelectedIds] = useState<Set<string>>();

  const allIds = useMemo(() => items.map((i) => i.id), [items]);

  const toggleItem = (id: string) => {
    setSelectedIds((prev) => {
      const base = prev ?? new Set(allIds);
      const next = new Set(base);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const filteredItems = useMemo(() => {
    if (!selectedIds) return items;
    return items.filter((i) => selectedIds.has(i.id));
  }, [items, selectedIds]);

  const hasData = items.length > 0;

  const renderChart = () => {
    if (chartType === "bar-horizontal") {
      return (
        <BarChart
          data={filteredItems}
          layout="vertical"
          margin={{ top: 0, right: 40, left: 8, bottom: 0 }}
          barCategoryGap="20%"
        >
          <CartesianGrid horizontal={false} strokeDasharray="3 3" />
          <XAxis type="number" hide />
          <YAxis
            type="category"
            dataKey="label"
            tickLine={false}
            axisLine={false}
            width={90}
            tick={(props) => (
              <text
                x={props.x}
                y={props.y}
                dy={4}
                textAnchor="end"
                className="fill-foreground"
                fontSize={13}
                fontWeight={500}
              >
                {props.payload.value}
              </text>
            )}
          />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel />}
          />
          <Bar dataKey="count" radius={[0, 3, 3, 0]} barSize={22}>
            {filteredItems.map((entry) => (
              <Cell key={entry.id} fill={entry.color} />
            ))}
            <LabelList
              dataKey="count"
              position="right"
              dx={8}
              className="fill-muted-foreground font-semibold text-xs"
            />
          </Bar>
        </BarChart>
      );
    }
    if (chartType === "bar-vertical") {
      return (
        <BarChart
          data={filteredItems}
          margin={{ left: 10, right: 10, bottom: 8 }}
          barCategoryGap="20%"
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis
            dataKey="label"
            tickLine={false}
            axisLine={false}
            tick={{ fontSize: 12 }}
            dy={8}
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            tick={{ fontSize: 12 }}
            width={40}
          />
          <ChartTooltip
            cursor={{ fill: "var(--color-muted)" }}
            content={<ChartTooltipContent />}
          />
          <Bar dataKey="count" radius={[3, 3, 0, 0]} barSize={28}>
            {filteredItems.map((entry) => (
              <Cell key={entry.id} fill={entry.color} />
            ))}
            <LabelList
              dataKey="count"
              position="top"
              dy={-4}
              className="fill-muted-foreground font-semibold text-xs"
            />
          </Bar>
        </BarChart>
      );
    }
    if (chartType === "area") {
      return (
        <AreaChart
          data={filteredItems}
          margin={{ top: 8, right: 40, left: 8, bottom: 8 }}
        >
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="5%"
                stopColor="var(--color-chart-1)"
                stopOpacity={0.35}
              />
              <stop
                offset="95%"
                stopColor="var(--color-chart-1)"
                stopOpacity={0.02}
              />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis
            dataKey="label"
            tickLine={false}
            axisLine={false}
            tick={{ fontSize: 12 }}
            dy={8}
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            tick={{ fontSize: 12 }}
            width={40}
          />
          <ChartTooltip
            cursor={{ stroke: "var(--color-border)" }}
            content={<ChartTooltipContent />}
          />
          <Area
            type="monotone"
            dataKey="count"
            stroke="var(--color-chart-1)"
            strokeWidth={2}
            fill={`url(#${gradientId})`}
            dot={{ r: 3, strokeWidth: 0, fill: "var(--color-chart-1)" }}
            activeDot={{ r: 5 }}
          />
        </AreaChart>
      );
    }
    return (
      <LineChart
        data={filteredItems}
        margin={{ top: 8, right: 40, left: 8, bottom: 8 }}
      >
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis
          dataKey="label"
          tickLine={false}
          axisLine={false}
          tick={{ fontSize: 12 }}
          dy={8}
        />
        <YAxis
          tickLine={false}
          axisLine={false}
          tick={{ fontSize: 12 }}
          width={40}
        />
        <ChartTooltip
          cursor={{ stroke: "var(--color-border)" }}
          content={<ChartTooltipContent />}
        />
        <Line
          type="monotone"
          dataKey="count"
          stroke="var(--color-chart-1)"
          strokeWidth={2}
          dot={{ r: 3, strokeWidth: 0, fill: "var(--color-chart-1)" }}
          activeDot={{ r: 5 }}
        />
      </LineChart>
    );
  };

  return (
    <ChartCard
      icon={icon}
      title={title}
      description={description}
      isLoading={isLoading}
      className={className}
      action={
        <ChartTypeToggle<TChartType>
          value={chartType}
          onChange={setChartType}
          options={[
            {
              value: "bar-horizontal",
              icon: BarChartHorizontal,
              label: "Horizontal bar",
            },
            {
              value: "bar-vertical",
              icon: BarChart3,
              label: "Vertical bar",
            },
            {
              value: "line",
              icon: LineChartIcon,
              label: "Line chart",
            },
            {
              value: "area",
              icon: AreaChartIcon,
              label: "Area chart",
            },
          ]}
        />
      }
    >
      <DataLegend
        items={items.map((i) => ({
          id: i.id,
          label: i.label,
          color: i.color,
          count: i.count,
        }))}
        selectedIds={selectedIds}
        onToggle={toggleItem}
        className="mb-3"
      />
      {!hasData ? (
        <div
          className="flex items-center justify-center text-sm text-muted-foreground"
          style={{ height }}
        >
          No data in the selected period
        </div>
      ) : (
        <ChartContainer
          config={chartConfig}
          className="w-full aspect-auto"
          style={{ height }}
        >
          {renderChart()}
        </ChartContainer>
      )}
    </ChartCard>
  );
}
