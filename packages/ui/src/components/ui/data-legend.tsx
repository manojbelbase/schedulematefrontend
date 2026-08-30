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
        "flex gap-x-4 gap-y-1",
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
              "flex items-center gap-1.5 text-xs transition-opacity",
              isToggleable && "cursor-pointer hover:opacity-80",
              isToggleable && !isSelected && "opacity-40",
            )}
          >
            <div className="flex items-center gap-1.5">
              <p
                className="size-2.5 rounded-sm flex-shrink-0"
                style={{ backgroundColor: item.color }}
              />
              <span className="font-medium text-sm text-muted-foreground">
                {item.label}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <span
                className={cn(
                  "font-semibold tabular-nums",
                  isSelected ? "text-foreground" : "text-muted-foreground",
                )}
              >
                {item.count.toLocaleString()}
              </span>
              {item.percent && (
                <span className="text-black font-normal">
                  ({item.percent}%)
                </span>
              )}
            </div>
          </button>
        );
      })}
    </div>
  );
}
