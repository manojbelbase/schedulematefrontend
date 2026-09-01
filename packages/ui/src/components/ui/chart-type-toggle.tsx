"use client";

import type { LucideIcon } from "lucide-react";

import { cn } from "@ui/lib/utils";

export type ChartTypeOption<T extends string = string> = {
  value: T;
  icon: LucideIcon;
  label?: string;
};

type ChartTypeToggleProps<T extends string = string> = {
  value: T;
  onChange: (value: T) => void;
  options: ChartTypeOption<T>[];
  className?: string;
};

export function ChartTypeToggle<T extends string = string>({
  value,
  onChange,
  options,
  className,
}: ChartTypeToggleProps<T>) {
  return (
    <div
      className={cn(
        "border bg-background text-muted-foreground dark:border-input h-9 rounded-sm flex items-center",
        className,
      )}
    >
      {options.flatMap((opt, i) => {
        const items: React.ReactNode[] = [];
        if (i > 0) {
          items.push(<div key={`sep-${i}`} className="w-px h-5 bg-border" />);
        }
        items.push(
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(opt.value)}
            className={cn(
              "h-full px-2 transition-colors",
              i === 0 && "rounded-l-sm",
              i === options.length - 1 && "rounded-r-sm",
              value === opt.value
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground",
            )}
            title={opt.label}
          >
            <opt.icon size={16} />
          </button>,
        );
        return items;
      })}
    </div>
  );
}
