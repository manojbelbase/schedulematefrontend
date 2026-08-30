"use client";

import { Fragment, useMemo, type ReactNode } from "react";
import { type Table } from "@tanstack/react-table";
import { FunnelIcon, FunnelXIcon } from "lucide-react";
import { motion } from "motion/react";

import Icon from "@ui/assets/icons";
import { type TTriggerProps } from "@ui/components/deployables/trigger";
import { cn } from "@ui/lib/utils";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../animate-ui/components/radix/popover";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../animate-ui/components/radix/tooltip";
import type { TCardItem } from "../cards-section";
import { Button } from "../ui/button";
import AddButton, { type TAddButtonProps } from "./add-button";
import CardVisibility from "./card-visibility";
import ColumnVisibility from "./column-visibility";
import ExportManager, { type TExportManager } from "./export-manager";
import DataTableSearch, { type TDataTableSearchProps } from "./search";
import TableStickyHeaderToggler from "./stickyHeaderToggler";
import TextWrapperToggler from "./text-wrapper-toggler";

type TNode = {
  el: ReactNode;
  position: "start" | "end";
};

export type TFunctionsProps<TData> = {
  ref?: React.RefObject<HTMLTableElement | null>;
  table?: Table<TData>;
  columnToggle?: boolean;
  headerTitle?: string;
  cardToggle?: boolean;
  cardItems?: TCardItem<TData>[];
  filterToggle?: boolean;
  add?: TAddButtonProps;
  exportable?: boolean | TExportManager<TData>;
  search?: TDataTableSearchProps;
  onRowClick?: Omit<TTriggerProps, "children"> | ((item: TData) => void);
  onRightClick?: (item: TData) => {
    component: React.ComponentType<{
      id: string;
      row: TData;
      fromRightClick: boolean;
      children: React.ReactNode;
    }>;
    idforRowMenu: string;
  };
  textWrapToggle?: boolean;
  nodes?: TNode[];
  stickyHeaderToggle?: boolean;
  hasEditPermission?: boolean;
};

export default function Functions<TData>({
  ref: _ref,
  search,
  table,
  add,
  columnToggle,
  headerTitle,
  cardToggle,
  cardItems,
  filterToggle,
  exportable,
  nodes,
  textWrapToggle,
  stickyHeaderToggle = true,
  hasEditPermission,
}: TFunctionsProps<TData>) {
  const data = useMemo(() => {
    if (typeof exportable === "object") {
      return exportable.data;
    }

    if (!table) return [];
    return table.getFilteredRowModel().rows.map((row) => row.original);
  }, [
    typeof exportable === "object" ? exportable.data : exportable,
    table?.getFilteredRowModel()?.rows.map((row) => row.original),
    exportable,
    table,
  ]);

  const { start, end } = useMemo(() => {
    if (!nodes) return { start: [], end: [] };

    const start = nodes.filter((node) => node.position === "start");
    const end = nodes.filter((node) => node.position === "end");

    return { start, end };
  }, [nodes]);

  const hasActionsMenu =
    (exportable && data.length > 0) ||
    columnToggle ||
    (cardToggle && cardItems);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex items-center gap-2"
    >
      {search && <DataTableSearch {...search} />}
      {start.map((item, i) => (
        <Fragment key={i}>{item.el}</Fragment>
      ))}
      {add && hasEditPermission !== false && (
        <AddButton
          {...add}
          className={cn("permission-all_permissions:flex", add.className)}
        />
      )}
      {textWrapToggle && table && <TextWrapperToggler />}
      {filterToggle && table && (
        <TooltipProvider>
          <Tooltip delayDuration={50}>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon-sm"
                onClick={() => {
                  if (table && table.options.meta)
                    table.options.meta?.setShowFilters?.((p) => !p);
                }}
              >
                {table.options.meta?.setShowFilters ? (
                  <FunnelXIcon />
                ) : (
                  <FunnelIcon />
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent
              className="text-xs bg-secondary text-foreground"
              side="bottom"
              arrowClassName="bg-secondary fill-secondary"
            >
              <span>Filters</span>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
      {stickyHeaderToggle && table && (
        <TableStickyHeaderToggler table={table} />
      )}

      {hasActionsMenu && table && (
        <Popover>
          <TooltipProvider>
            <Tooltip delayDuration={50}>
              <TooltipTrigger asChild>
                <PopoverTrigger asChild>
                  <Button variant="outline" size="icon-sm">
                    <Icon
                      name="more-actions"
                      className="size-4! dark:text-foreground"
                    />
                  </Button>
                </PopoverTrigger>
              </TooltipTrigger>
              <TooltipContent
                className="text-xs bg-secondary text-foreground"
                side="bottom"
                arrowClassName="bg-secondary fill-secondary"
              >
                <span>Table Actions</span>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <PopoverContent className="w-52 p-1 " align="end">
            <div className="flex flex-col space-y-0.5">
              {exportable && data.length > 0 && (
                <ExportManager
                  columns={table.getAllColumns()}
                  data={data || []}
                  title={headerTitle}
                  table={table}
                />
              )}
              {columnToggle && <ColumnVisibility table={table} />}
              {cardToggle && cardItems && (
                <CardVisibility table={table} items={cardItems} />
              )}
            </div>
          </PopoverContent>
        </Popover>
      )}

      {end.map((item, i) => (
        <Fragment key={i}>{item.el}</Fragment>
      ))}
    </motion.div>
  );
}
