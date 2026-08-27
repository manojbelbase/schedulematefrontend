"use client";

import { type Table } from "@tanstack/react-table";
import { BarChart2 } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../animate-ui/components/radix/dropdown-menu";
import { Button } from "../ui/button";

type TProps<TData> = {
  table: Table<TData>;
};

export default function ColumnVisibility<TData>({ table }: TProps<TData>) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="w-full justify-start font-normal">
          <BarChart2 className="size-4" />
          Columns
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" side="right">
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
