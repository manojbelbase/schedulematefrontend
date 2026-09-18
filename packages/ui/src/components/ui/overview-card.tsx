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
            "max-w-[270px] w-full group relative rounded-sm bg-background border border-border cursor-pointer transition-colors hover:bg-accent/40",
            wrapperContainerClassname,
          )}
          onClick={onClick}
        >
          <div
            className={cn(
              "overflow-hidden group relative transition-all ease-in-out rounded-sm p-3 flex flex-col gap-3 h-full",
              className,
            )}
          >
            <div className="flex items-center justify-between gap-1">
              <div className="flex items-center gap-2">
                <span
                  className={cn(
                    "inline-flex size-5 3xl:size-7 [&_svg]:size-3 3xl:[&_svg]:size-4 items-center justify-center rounded-sm bg-muted text-foreground/80 ring-1 ring-black/5",
                    iconContainerClassName,
                  )}
                >
                  {icon}
                </span>
                <h6 className="font-medium text-foreground/80 dark:text-white flex-shrink-0 truncate text-xs 3xl:text-base">
                  {title}
                </h6>
              </div>
            </div>
            <div className="flex justify-between">
              <div className="flex justify-between truncate">
                <h1
                  className="text-lg font-semibold truncate line-clamp-1"
                  title={typeof value === "string" ? value : undefined}
                >
                  {value}
                </h1>
              </div>
              {info && (
                <div className="items-center flex group-hover:hidden transition-all ease-in-out duration-300">
                  <Info size={12} className="text-blue-400" />
                </div>
              )}
            </div>
            {description ? (
              <p className="text-xs text-muted-foreground">{description}</p>
            ) : null}
          </div>
        </div>
      </TooltipTrigger>
      {info && (
        <TooltipContent
          className="max-w-xs bg-background text-foreground border p-3"
          side="bottom"
          arrowClassName="hidden"
        >
          <p className="text-sm">{info}</p>
        </TooltipContent>
      )}
    </Tooltip>
  );
}
