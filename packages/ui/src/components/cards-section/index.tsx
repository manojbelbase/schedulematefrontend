"use client";

import type { ReactNode } from "react";
import type { OnChangeFn, VisibilityState } from "@tanstack/react-table";

import { OverviewCard } from "@ui/components/ui/overview-card";

export type TCardItem<TData = object> = {
  id: string;
  label: string;
  value: string | number | ((data: TData[]) => string | number);
  icon?: ReactNode;
  info?: string;
  className?: string;
  accentClassName?: string;
  subtitle?: string;
  stats?: { label: string; value: string | number; className?: string }[];
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

  if (visibleItems.length === 0) return null;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      {visibleItems.map((item) => {
        const value = resolveValue(item, data);
        return (
          <OverviewCard
            key={item.id}
            title={item.label}
            value={value}
            icon={item.icon}
            info={item.info}
            subtitle={item.subtitle}
            stats={item.stats}
            iconContainerClassName={item.accentClassName}
            wrapperContainerClassname="max-w-full"
            className={item.className}
          />
        );
      })}
    </div>
  );
}
