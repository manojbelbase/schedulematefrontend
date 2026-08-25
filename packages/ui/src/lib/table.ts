import type { CSSProperties } from "react";
import type { CellContext, Column, Table } from "@tanstack/react-table";

import { TABLE_CONSTANTS } from "@ui/config/constants";
import type { _ColumnDef, Any } from "@ui/types/globals";

import { DEFAULT_PAGINATION_FILTER } from "./pagination";

export function* getColumnIds<T, V>(
  columns: _ColumnDef<T, V>[],
): Generator<string> {
  for (const col of columns) {
    if (col.id) {
      yield col.id;
    }

    if ("columns" in col && col.columns) {
      yield* getColumnIds(col.columns as _ColumnDef<T, V>[]);
    }
  }
}

export function getSN<T>({ table, row }: CellContext<T, unknown>) {
  const pageIndex = table.options.meta?.page || DEFAULT_PAGINATION_FILTER.page;
  const pageSize = table.options.meta?.take || DEFAULT_PAGINATION_FILTER.take;

  const currentPageRows = table.getRowModel().rows;
  const rowPositionInPage = currentPageRows.findIndex(
    (tableRow) => tableRow.id === row.id,
  );

  return pageIndex * pageSize + rowPositionInPage + 1;
}

export function getCommonPinningStyles<TData>(
  column: Column<TData>,
): CSSProperties {
  const isPinned = column.getIsPinned();

  return {
    left: isPinned === "left" ? `${column.getStart("left")}px` : undefined,
    right: isPinned === "right" ? `${column.getAfter("right")}px` : undefined,
    position: isPinned ? "sticky" : "relative",
    ...(isPinned && {
      width:
        column.id === TABLE_CONSTANTS.SN_HEADER
          ? TABLE_CONSTANTS.SN_WIDTH
          : column.id === TABLE_CONSTANTS.ACTIONS_HEADER
            ? TABLE_CONSTANTS.ACTIONS_WIDTH
            : `calc(var(--col-${column.id}-size) * 1px)`,
    }),
    zIndex: isPinned ? 1 : 0,
  };
}

export function columnSizingHandler(
  thElem: HTMLElement | null,
  table: Table<Any>,
  column: Column<Any>,
) {
  if (!thElem) return;
  // If you don't do that, there will be an infinite loop. We update the value in state only if the value has actually changed.
  if (
    table.getState().columnSizing[column.id] ===
    thElem.getBoundingClientRect().width
  )
    return;

  table.setColumnSizing((prevSizes) => ({
    ...prevSizes,
    // 100% accurate float-point width, even if table content is loaded async
    [column.id]: thElem.getBoundingClientRect().width,
  }));
}
