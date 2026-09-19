"use client";

import { cn } from "@ui/lib/utils";

export type DataLegendItem = {
  id: string;
  label: string;
  color: string;
  count: number;
  percent?: string;
};

type DataLegendProps = {
  items: DataLegendItem[];
  selectedIds?: Set<string>;
  onToggle?: (id: string) => void;
  direction?: "horizontal" | "vertical";
  className?: string;
};

export function DataLegend({
  items,
  selectedIds,
  onToggle,
  direction = "horizontal",
  className,
}: DataLegendProps) {
  const isToggleable = !!onToggle;

  return (
    <div
      className={cn(
        "flex gap-x-4 gap-y-1.5",
        direction === "horizontal" && "flex-wrap items-center",
        direction === "vertical" && "flex-col",
        className,
      )}
    >
      {items.map((item, index) => {
        const isSelected = selectedIds ? selectedIds.has(item.id) : true;
        return (
          <button
            key={item.id + index}
            type="button"
            onClick={() => onToggle?.(item.id)}
            className={cn(
              "flex items-center gap-1.5 rounded-sm text-xs transition-colors",
              isToggleable && "-mx-1 px-1 py-0.5 hover:bg-accent/60",
              !isToggleable && "cursor-default",
              isToggleable && !isSelected && "opacity-40",
            )}
          >
            <span
              className="size-2.5 shrink-0 rounded-sm"
              style={{ backgroundColor: item.color }}
            />
            <span className="font-medium text-subtle">{item.label}</span>
            <span
              className={cn(
                "font-semibold tabular-nums",
                isSelected ? "text-heading" : "text-subtle",
              )}
            >
              {item.count.toLocaleString()}
            </span>
            {item.percent ? (
              <span className="text-subtle">({item.percent}%)</span>
            ) : null}
          </button>
        );
      })}
    </div>
  );
}
