"use client";

import { Fragment, type ReactNode } from "react";
import type { OnChangeFn, VisibilityState } from "@tanstack/react-table";

import { cn } from "@ui/lib/utils";

export type TCardItem<TData = object> = {
  id: string;
  label: string;
  value: string | number | ((data: TData[]) => string | number);
  icon?: ReactNode;
  className?: string;
  accentClassName?: string;
};

export type TCardsSectionProps<TData = object> = {
  items: TCardItem<TData>[];
  data?: TData[];
  visibility?: VisibilityState;
  onVisibilityChange?: OnChangeFn<VisibilityState>;
};

function resolveValue<TData = object>(
  item: TCardItem<TData>,
  data: TData[],
): string | number {
  return typeof item.value === "function" ? item.value(data) : item.value;
}

export default function CardsSection<TData = object>({
  items,
  data = [],
  visibility = {},
}: TCardsSectionProps<TData>) {
  const visibleItems = items.filter((item) => visibility[item.id] !== false);

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {visibleItems.map((item) => {
        const value = resolveValue(item, data);
        return (
          <div
            key={item.id}
            className="flex items-center justify-between gap-4 rounded-sm border border-border bg-card p-3"
          >
            <div className="min-w-0 space-y-1">
              <p className="text-sm text-muted-foreground">{item.label}</p>
              <p className="text-2xl font-semibold text-foreground">{value}</p>
            </div>
            {item.icon && (
              <div
                className={cn(
                  "flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary",
                  item.accentClassName,
                )}
              >
                {item.icon}
              </div>
            )}
          </div>
        );
      })}
      {visibleItems.length === 0 && <Fragment />}
    </div>
  );
}
