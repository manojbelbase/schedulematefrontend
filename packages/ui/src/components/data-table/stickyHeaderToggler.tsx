"use client";

import { type Table } from "@tanstack/react-table";
import { Pin, PinOff } from "lucide-react";

import { cn } from "@ui/lib/utils";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../animate-ui/components/radix/tooltip";
import { Button } from "../ui/button";

export type TTableStickyHeader<TData> = {
  table: Table<TData>;
};

const TableStickyHeaderToggler = <TData,>({
  table,
}: {
  table: Table<TData>;
}) => {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={0}>
        <TooltipTrigger asChild>
          <Button
            size={"icon-sm"}
            onClick={() => {
              if (table && table.options.meta)
                table.options.meta?.setStickyHeader?.((p) => !p);
            }}
            variant={"outline"}
            className=" border rounded-lg px-3 py-2 transition-colors flex items-center justify-center"
            aria-label="Toggle sticky header"
          >
            <div className="relative w-5 h-5 flex items-center justify-center">
              <Pin
                className={cn(
                  "w-5 h-5 absolute inset-0 transition-all duration-300 absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2",
                  !table.options.meta?.stickyHeader
                    ? "opacity-100"
                    : "opacity-0",
                )}
              />
              <PinOff
                className={cn(
                  "w-5 h-5 absolute inset-0 transition-all duration-300 absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2",
                  table.options.meta?.stickyHeader
                    ? "opacity-100"
                    : "opacity-0",
                )}
              />
            </div>
          </Button>
        </TooltipTrigger>
        <TooltipContent
          className="text-xs bg-secondary text-foreground"
          side="bottom"
          arrowClassName="bg-secondary fill-secondary"
        >
          <span>Toggle Sticky Header</span>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default TableStickyHeaderToggler;
