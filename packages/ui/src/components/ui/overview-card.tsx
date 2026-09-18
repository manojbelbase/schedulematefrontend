"use client";

import type { ReactNode } from "react";
import { Info } from "lucide-react";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@ui/components/animate-ui/components/radix/tooltip";
import { cn } from "@ui/lib/utils";

type OverviewCardProps = {
  title: string;
  value: ReactNode;
  icon?: ReactNode;
  iconContainerClassName?: string;
  description?: string;
  info?: string;
  className?: string;
  wrapperContainerClassname?: string;
  onClick?: () => void;
};

export function OverviewCard({
  title,
  value,
  icon,
  iconContainerClassName,
  description,
  info,
  className,
  wrapperContainerClassname,
  onClick,
}: OverviewCardProps) {
  return (
    <Tooltip delayDuration={300}>
      <TooltipTrigger asChild>
        <div
          className={cn(
            "group relative w-full max-w-[270px] rounded-sm border border-border bg-background transition-colors hover:bg-accent/40",
            onClick && "cursor-pointer",
            wrapperContainerClassname,
          )}
          onClick={onClick}
        >
          <div
            className={cn(
              "flex h-full flex-col gap-3 overflow-hidden rounded-sm p-3 transition-all ease-in-out",
              className,
            )}
          >
            <div className="flex items-center justify-between gap-1">
              <div className="flex items-center gap-2">
                <span
                  className={cn(
                    "inline-flex size-5 items-center justify-center rounded-sm bg-muted text-foreground/80 ring-1 ring-black/5 3xl:size-7 [&_svg]:size-3 3xl:[&_svg]:size-4",
                    iconContainerClassName,
                  )}
                >
                  {icon}
                </span>
                <h6 className="flex-shrink-0 truncate text-xs font-medium text-foreground/80 3xl:text-base">
                  {title}
                </h6>
              </div>
              {info ? (
                <Info className="size-3 shrink-0 text-muted-foreground" />
              ) : null}
            </div>
            <div className="flex justify-between">
              <h1 className="truncate text-lg font-semibold tabular-nums">
                {value}
              </h1>
            </div>
            {description ? (
              <p className="text-xs text-muted-foreground">{description}</p>
            ) : null}
          </div>
        </div>
      </TooltipTrigger>
      {info ? (
        <TooltipContent
          className="mt-1 max-w-xs border bg-background p-3 text-foreground"
          side="bottom"
          arrow={false}
        >
          <p className="text-sm">{info}</p>
        </TooltipContent>
      ) : null}
    </Tooltip>
  );
}
