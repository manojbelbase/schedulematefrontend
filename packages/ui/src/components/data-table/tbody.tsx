import { Fragment, memo } from "react";
import {
  horizontalListSortingStrategy,
  SortableContext,
} from "@dnd-kit/sortable";
import type { Table } from "@tanstack/react-table";

import Trigger, {
  type TTriggerProps,
} from "@ui/components/deployables/trigger";
import { cn } from "@ui/lib/utils";

import { TableBody, TableRow } from "../ui/table";
import TCellComponent from "./tcell";

export default function TBodyComponent<TData>({
  table,
}: {
  table: Table<TData>;
}) {
  const columnOrder = table.getState().columnOrder;
  const { onRowClick } = table.options.meta || {};

  const isModalTriggerProps = typeof onRowClick === "object";

  const triggerProps = (isModalTriggerProps ? onRowClick : {}) as TTriggerProps;
  const TriggerComponent = isModalTriggerProps ? Trigger : Fragment;

  return (
    <TableBody>
      {table.getRowModel().rows.map((row, rowIndex) => {
        const rowTriggerProps = isModalTriggerProps
          ? ({
              ...triggerProps,
              data: { ...row.original, "custom-data": triggerProps.data },
            } as unknown as TTriggerProps)
          : triggerProps;

        return (
          <TriggerComponent key={row.id} {...rowTriggerProps}>
            <TableRow
              className={cn(
                "even:bg-muted/40 dark:even:bg-muted/40",
                row.getIsPinned() && "bg-[#f4f5f7]! dark:bg-secondary!",
                onRowClick && "cursor-pointer",
              )}
              data-state={row.getIsSelected() && "selected"}
              onClick={() => {
                const selection =
                  typeof window !== "undefined" ? window.getSelection() : null;
                // If user has selected text, do nothing
                if (selection && selection.toString().length > 0) {
                  return;
                }
                if (!isModalTriggerProps) {
                  onRowClick?.(row.original);
                }
              }}
            >
              {row
                .getVisibleCells()
                .filter(
                  (cell) => cell.column.columnDef.meta?.exportOnly !== true,
                )
                .map((cell) => {
                  const pinned = cell.column.getIsPinned();
                  const pinnedStripe =
                    pinned &&
                    (rowIndex % 2 === 1
                      ? "bg-muted/40! group-hover/trow:bg-muted/50! group-data-[state=selected]/trow:bg-accent/10! dark:bg-transparent!"
                      : "bg-background! group-hover/trow:bg-muted/50! group-data-[state=selected]/trow:bg-accent/10! dark:bg-transparent!");
                  return (
                    <SortableContext
                      key={cell.id}
                      items={columnOrder}
                      strategy={horizontalListSortingStrategy}
                    >
                      <TCellComponent
                        key={cell.id}
                        cell={cell}
                        table={table}
                        row={row}
                        className={cn(pinned && pinnedStripe)}
                      />
                    </SortableContext>
                  );
                })}
            </TableRow>
          </TriggerComponent>
        );
      })}
    </TableBody>
  );
}

export const MemoizedTBodyComponent = memo(
  TBodyComponent,
  (prev, next) => prev.table.options.data === next.table.options.data,
) as typeof TBodyComponent;
