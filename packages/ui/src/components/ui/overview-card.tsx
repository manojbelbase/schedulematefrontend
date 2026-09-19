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
  footer?: ReactNode;
  gradientClassName?: string;
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
  footer,
  gradientClassName,
}: OverviewCardProps) {
  return (
    <Tooltip delayDuration={300}>
      <TooltipTrigger asChild>
        <div
          className={cn(
            "group relative w-full max-w-[270px] overflow-hidden rounded-md border border-border bg-gradient-to-br",
            gradientClassName ?? "from-primary/10 via-background to-background",
            onClick && "cursor-pointer",
            wrapperContainerClassname,
          )}
          onClick={onClick}
        >
          <div
            className={cn(
              "flex h-full flex-col gap-2 overflow-hidden p-3 transition-all ease-in-out",
              className,
            )}
          >
            <div className="flex items-center justify-between gap-1">
              <div className="flex min-w-0 items-center gap-1.5">
                <span
                  className={cn(
                    "inline-flex size-5 shrink-0 items-center justify-center rounded-md bg-muted text-subtle [&_svg]:size-3",
                    iconContainerClassName,
                  )}
                >
                  {icon}
                </span>
                <h6 className="truncate text-sm font-medium text-heading">
                  {title}
                </h6>
              </div>
              {info || description ? (
                <Info className="size-3.5 shrink-0 text-subtle" />
              ) : null}
            </div>
            <div className="mt-auto flex items-end justify-between gap-2">
              <h1 className="truncate text-2xl leading-none font-semibold tracking-tight text-heading tabular-nums">
                {value}
              </h1>
              {footer}
            </div>
          </div>
        </div>
      </TooltipTrigger>
      {info || description ? (
        <TooltipContent
          className="max-w-xs bg-background text-foreground p-3 mt-1 "
          side="bottom"
          arrow={false}
        >
          <div className="flex flex-col gap-1 text-xs">
            {description ? (
              <p className="font-medium text-heading">{description}</p>
            ) : null}
            {info ? <p className="text-subtle">{info}</p> : null}
          </div>
        </TooltipContent>
      ) : null}
    </Tooltip>
  );
}
