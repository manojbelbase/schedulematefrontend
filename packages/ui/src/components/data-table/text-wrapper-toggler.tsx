"use client";

import { Menu, UnfoldVertical } from "lucide-react";

import { cn } from "@ui/lib/utils";
import { useTableUiConfigStore } from "@ui/zustand/table/expandable-textarea";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../animate-ui/components/radix/tooltip";
import { Button } from "../ui/button";

const TextWrapperToggler = () => {
  const { textWrapped, setTextWrapped } = useTableUiConfigStore();

  return (
    <TooltipProvider>
      <Tooltip delayDuration={0}>
        <TooltipTrigger asChild>
          <Button
            size={"icon-sm"}
            onClick={() => setTextWrapped(!textWrapped)}
            className=" border rounded-sm px-3 py-2 transition-colors flex items-center justify-center"
            aria-label="Toggle text wrap"
          >
            <div className="relative w-5 h-5 flex items-center justify-center">
              <Menu
                className={cn(
                  "w-5 h-5 absolute inset-0 transition-all duration-300 absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2",
                  !textWrapped
                    ? "opacity-100 rotate-0 scale-100"
                    : "opacity-0 -rotate-90 scale-75",
                )}
              />
              <UnfoldVertical
                className={cn(
                  "w-5 h-5 absolute inset-0 transition-all duration-300 absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2",

                  textWrapped
                    ? "opacity-100 rotate-0 scale-100"
                    : "opacity-0 rotate-90 scale-75",
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
          <span>Toggle Text Wrap</span>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default TextWrapperToggler;
