"use client";

import { type Table } from "@tanstack/react-table";
import { ColumnsSettingsIcon } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../animate-ui/components/radix/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../animate-ui/components/radix/tooltip";
import { Button } from "../ui/button";

type TProps<TData> = {
  table: Table<TData>;
};

export default function ColumnVisibility<TData>({ table }: TProps<TData>) {
  return (
    <DropdownMenu modal={false}>
      <TooltipProvider>
        <Tooltip delayDuration={0}>
          <TooltipTrigger asChild>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon-sm">
                <ColumnsSettingsIcon />
              </Button>
            </DropdownMenuTrigger>
          </TooltipTrigger>
          <TooltipContent
            className="text-xs bg-secondary text-foreground"
            side="bottom"
            arrowClassName="bg-secondary fill-secondary"
          >
            <span>Toggle Columns</span>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <DropdownMenuContent align="end">
        {table
          .getAllColumns()
          .filter(
            (column) =>
              column.getCanHide() && !column.columnDef.meta?.exportOnly,
          )
          .map((column) => {
            return (
              <DropdownMenuCheckboxItem
                key={column.id}
                className="capitalize"
                checked={column.getIsVisible()}
                onCheckedChange={(value) => column.toggleVisibility(!!value)}
                onSelect={(e) => e.preventDefault()}
              >
                {"exportHeader" in column.columnDef &&
                typeof column.columnDef.exportHeader === "string"
                  ? column.columnDef.exportHeader
                  : column.id}
              </DropdownMenuCheckboxItem>
            );
          })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
