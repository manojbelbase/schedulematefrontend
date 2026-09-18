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
        "flex h-8 items-center rounded-sm border bg-background text-muted-foreground",
        className,
      )}
    >
      {options.flatMap((opt, i) => {
        const items: React.ReactNode[] = [];
        if (i > 0) {
          items.push(<div key={`sep-${i}`} className="h-4 w-px bg-border" />);
        }
        items.push(
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(opt.value)}
            title={opt.label}
            aria-label={opt.label}
            className={cn(
              "flex h-full items-center px-1.5 transition-colors",
              i === 0 && "rounded-l-sm",
              i === options.length - 1 && "rounded-r-sm",
              value === opt.value
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            <opt.icon size={15} />
          </button>,
        );
        return items;
      })}
    </div>
  );
}
