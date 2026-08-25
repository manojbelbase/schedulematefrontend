import { useSortable } from "@dnd-kit/sortable";
import type { Column, Table } from "@tanstack/react-table";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  ChevronsUpDownIcon,
  EyeOffIcon,
  GripVerticalIcon,
} from "lucide-react";

import { cn } from "@ui/lib/utils";

import { Checkbox } from "../animate-ui/components/radix/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../animate-ui/components/radix/dropdown-menu";
import { Button } from "../ui/button";

type DataTableColumnHeaderProps<TData, TValue> = {
  column: Column<TData, TValue>;
  table: Table<TData>;
  title: string;
  allowCellDrag?: boolean;
  variant?: "sn" | "default";
} & React.HTMLAttributes<HTMLDivElement>;

export function DataTableColumnHeader<TData, TValue>({
  table,
  column,
  title,
  allowCellDrag = false,
  className,
  variant = "default",
}: DataTableColumnHeaderProps<TData, TValue>) {
  const { attributes, listeners, setNodeRef } = useSortable({
    id: column.id,
    disabled: !!column.getIsPinned(),
  });

  if (variant === "sn") {
    return (
      <span className="relative flex items-center justify-start pr-2.5">
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          className={cn(
            "absolute opacity-0 -z-10 top-1/2 -translate-y-1/2 left-2.5 -translate-x-1/2 group-hover/thead:z-10 group-hover/thead:opacity-100",
            (table.getIsSomePageRowsSelected() ||
              table.getIsAllPageRowsSelected()) &&
              "opacity-100 z-10",
          )}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
        <span
          className={cn(
            "group-hover/thead:opacity-0",
            (table.getIsSomePageRowsSelected() ||
              table.getIsAllPageRowsSelected()) &&
              "opacity-0",
          )}
        >
          {title}
        </span>
      </span>
    );
  }

  if (!column.getCanSort()) {
    return <div className={cn(className, "font-semibold")}>{title}</div>;
  }

  return (
    <div
      className={cn(
        "flex items-center gap-2 justify-between group max-w-fit!",
        className,
      )}
    >
      <div className="flex items-center gap-1">
        {allowCellDrag && (
          <Button
            size="icon-sm"
            variant="ghost"
            className={cn(
              "w-5 group-hover:flex hidden",
              !column.getIsPinned() && "cursor-move",
            )}
            ref={setNodeRef}
            {...attributes}
            {...listeners}
          >
            <GripVerticalIcon />
          </Button>
        )}
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="data-[state=open]:bg-none h-8 px-0! font-semibold focus-visible:ring-0! focus-visible:border-none! hover:bg-transparent"
              >
                <span>{title}</span>
                {column.getIsSorted() === "desc" ? (
                  <ArrowDownIcon />
                ) : column.getIsSorted() === "asc" ? (
                  <ArrowUpIcon />
                ) : (
                  <ChevronsUpDownIcon />
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuItem onClick={() => column.toggleSorting(false)}>
                <ArrowUpIcon />
                Asc
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => column.toggleSorting(true)}>
                <ArrowDownIcon />
                Desc
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => column.toggleVisibility(false)}>
                <EyeOffIcon />
                Hide
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}
