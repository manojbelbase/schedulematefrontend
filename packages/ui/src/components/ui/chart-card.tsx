"use client";

import type { ReactNode } from "react";
import { Info, type LucideIcon } from "lucide-react";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@ui/components/animate-ui/components/radix/tooltip";
import { Skeleton } from "@ui/components/ui/skeleton";
import { cn } from "@ui/lib/utils";

export function ChartCardSkeleton() {
  return (
    <div className="flex h-full min-h-[220px] w-full flex-col justify-end gap-3">
      <Skeleton className="mx-auto size-[180px] rounded-full" />
      <div className="mx-auto flex flex-col items-center gap-2">
        <Skeleton className="h-3 w-24" />
        <Skeleton className="h-3 w-16" />
      </div>
    </div>
  );
}

export function ChartCard({
  icon: Icon,
  title,
  description,
  action,
  isLoading,
  children,
  className,
}: {
  icon?: LucideIcon;
  title: string;
  description?: string;
  action?: ReactNode;
  isLoading?: boolean;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn("flex flex-col rounded-sm border bg-background", className)}
    >
      <div className="flex items-start justify-between gap-3 px-4 py-3">
        <div className="flex min-w-0 items-center gap-2">
          {Icon ? (
            <Icon className="size-4 shrink-0 text-muted-foreground" />
          ) : null}
          <h3 className="truncate text-sm font-semibold text-foreground">
            {title}
          </h3>
          {description ? (
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  type="button"
                  className="inline-flex shrink-0 items-center justify-center text-muted-foreground transition-colors hover:text-foreground"
                  aria-label={title}
                >
                  <Info className="size-3" />
                </button>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <p>{description}</p>
              </TooltipContent>
            </Tooltip>
          ) : null}
        </div>
        {action ? <div className="shrink-0">{action}</div> : null}
      </div>
      <div className="flex w-full flex-1 flex-col p-4">
        {isLoading ? <ChartCardSkeleton /> : children}
      </div>
    </div>
  );
}
