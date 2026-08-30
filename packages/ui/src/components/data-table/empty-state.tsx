"use client";

import { Inbox, type LucideIcon } from "lucide-react";

import { cn } from "@ui/lib/utils";

import AddButton, { type TAddButtonProps } from "./add-button";

export type TEmptyStateProps = {
  name?: string;
  title?: string;
  description?: string;
  icon?: LucideIcon;
  add?: TAddButtonProps;
  hasEditPermission?: boolean;
  className?: string;
};

export default function EmptyState({
  name = "items",
  title,
  description,
  icon: Icon = Inbox,
  add,
  hasEditPermission,
  className,
}: TEmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center py-16 px-4 space-y-5 text-center",
        className,
      )}
    >
      <div className="flex size-18 items-center justify-center rounded-full bg-secondary/60 border border-border text-muted-foreground">
        <Icon className="size-6" strokeWidth={1.5} />
      </div>
      <div className="space-y-1.5">
        <h3 className="text-lg font-bold">{title || `No ${name} found`}</h3>
        {description && (
          <p className="text-xs text-muted-foreground max-w-72">
            {description}
          </p>
        )}
      </div>
      {add && hasEditPermission !== false && (
        <AddButton {...add} withoutShortcut />
      )}
    </div>
  );
}
