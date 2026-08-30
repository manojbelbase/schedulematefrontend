"use client";

import type { ReactNode } from "react";
import { Info, type LucideIcon } from "lucide-react";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@ui/components/animate-ui/components/radix/tooltip";
import { cn } from "@ui/lib/utils";

export function ChartCard({
  icon: Icon,
  title,
  description,
  children,
  className,
}: {
  icon?: LucideIcon;
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-sm border bg-background shadow-none flex flex-col",
        className,
      )}
    >
      <div className="flex items-center gap-2 px-3 py-2.5 border-b">
        {Icon ? <Icon className="size-4" /> : null}
        <h3 className="text-sm font-semibold text-foreground">{title}</h3>
        {description ? (
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                type="button"
                className="inline-flex items-center justify-center"
                aria-label={title}
              >
                <Info size={12} className="text-muted-foreground" />
              </button>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <p>{description}</p>
            </TooltipContent>
          </Tooltip>
        ) : null}
      </div>
      <div className="w-full px-4 py-3">{children}</div>
    </div>
  );
}
