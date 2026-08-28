"use client";

import { Fragment, useEffect, useMemo, useRef } from "react";
import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import { restrictToHorizontalAxis } from "@dnd-kit/modifiers";
import {
  arrayMove,
  horizontalListSortingStrategy,
  SortableContext,
} from "@dnd-kit/sortable";
import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import type { TCardsSectionProps } from "@ui/components/cards-section";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@ui/components/ui/table";
import { TABLE_CONSTANTS } from "@ui/config/constants";
import {
  DataTableCards,
  DataTableFilters,
  DataTableFunctions,
  DataTablePageHeader,
  DataTableTabLinks,
} from "@ui/context/data-table-context";
import DataTableQueryContextProvider from "@ui/context/data-table-query-context";
import { useQueryParamsFilter } from "@ui/hooks/useQueryParamsFilter";
import {
  DEFAULT_PAGINATION_FILTER,
  type PaginationDTO,
} from "@ui/lib/pagination";
import { getColumnIds } from "@ui/lib/table";
import { cn } from "@ui/lib/utils";
import type { _ColumnDef } from "@ui/types/globals";
import { useTableConfig } from "@ui/zustand/table/store";

import { TablePermissionProvider } from "../../hooks/table-permission";
import type { TPageHeaderProps } from "../layout/page-header";
import { type TTabLinksProps } from "../layout/tab-links";
import { DefaultPagination } from "./default-pagination";
import type { TFiltersProps } from "./filters";
import type { TFunctionsProps } from "./functions";
import { DataTablePagination } from "./pagination";
import TBodyComponent, { MemoizedTBodyComponent } from "./tbody";
import THeadComponent from "./thead";

export type TDataTableProps<TData, TValue, TStatistics> = {
  columns: _ColumnDef<TData, TValue>[];
  data: TData[];
  instanceId: string;
  header?: TPageHeaderProps;
  tabs?: TTabLinksProps;
  functions?: TFunctionsProps<TData>;
  filters?: Pick<TFiltersProps, "items">;
  autoHeaderRowSpan?: boolean;
  onlyLocalState?: boolean;
  hide?: ("HEADER" | "TABS" | "FUNCTIONS" | "FILTERS" | "CARDS")[];
  cards?: TCardsSectionProps<TStatistics>;
  className?: string;
  pageSize?: number;
  pagination?: PaginationDTO;
  hasEditPermission?: boolean;
  loading?: {
    isLoading: boolean;
    Loader: React.ReactNode;
  };
};

function ReactTable<TData, TValue, TStatistics>({
  columns,
  data,
  instanceId,
  header,
  tabs,
  functions,
  filters,
  autoHeaderRowSpan,
  hide,
  cards,
  className,
  pageSize,
  pagination,
  onlyLocalState = false,
  hasEditPermission,
  loading = {
    isLoading: false,
    Loader: null,
  },
}: TDataTableProps<TData, TValue, TStatistics>) {
  const ref = useRef<HTMLTableElement>(null);
  const tableContainerRef = useRef<HTMLDivElement>(null);
  const filter = useQueryParamsFilter(onlyLocalState);

  const columnOrder = useMemo(() => {
    return Array.from(getColumnIds(columns));
  }, [columns]);

  const { handlers, state } = useTableConfig(instanceId, {
    columnOrder,
  });

  const sensors = useSensors(
    useSensor(MouseSensor, {}),
    useSensor(TouchSensor, {}),
    useSensor(KeyboardSensor, {}),
  );

  const _pageSize = useMemo(() => {
    return !Number.isNaN(Number(filter.state?.take)) &&
      Number(filter.state?.take) >= 1
      ? Number(filter.state?.take)
      : DEFAULT_PAGINATION_FILTER.take;
  }, [filter.state?.take]);

  const _pageIndex = useMemo(() => {
    return !Number.isNaN(Number(filter.state?.page)) &&
      Number(filter.state?.page) >= 0
      ? Number(filter.state?.page)
      : DEFAULT_PAGINATION_FILTER.page;
  }, [filter.state?.page]);

  const initialPinning = useMemo(() => {
    const snId = TABLE_CONSTANTS.SN_HEADER;
    const actionId = TABLE_CONSTANTS.ACTIONS_HEADER;

    const leftPinned: string[] = [];
    const rightPinned: string[] = [];

    for (const col of columns) {
      const pin = col.meta?.pin;
      if (pin === "left") leftPinned.push(col.id!);
      if (pin === "right") rightPinned.push(col.id!);
    }

    const left = leftPinned
      .filter((id) => id !== snId)
      .reduce<string[]>((acc, id) => {
        acc.push(id);
        return acc;
      }, []);

    const right = rightPinned
      .filter((id) => id !== actionId)
      .reduce<string[]>((acc, id) => {
        acc.push(id);
        return acc;
      }, []);

    return {
      left: [snId, ...left],
      right: [...right],
    };
  }, [columns]);

  // Initialize pinning state once if empty
  useEffect(() => {
    const current = state.columnPinning;
    const isEmpty =
      (!current?.left || current.left.length === 0) &&
      (!current?.right || current.right.length === 0);

    if (isEmpty) {
      handlers.onColumnPinningChange(() => initialPinning);
    }
  }, [initialPinning, state.columnPinning, handlers]);

  const table = useReactTable({
    data,
    columns,
    initialState: {
      pagination: {
        pageSize: pageSize ?? DEFAULT_PAGINATION_FILTER.take ?? 25,
        pageIndex: DEFAULT_PAGINATION_FILTER.page ?? 0,
      },
      columnPinning: initialPinning,
    },
    onColumnOrderChange: handlers.onColumnOrderChange,
    onColumnPinningChange: handlers.onColumnPinningChange,
    onSortingChange: handlers.onSortingChange,
    onColumnFiltersChange: handlers.onColumnFiltersChange,
    onColumnVisibilityChange: handlers.onColumnVisibilityChange,
    onGroupingChange: handlers.onGroupingChange,
    onRowSelectionChange: handlers.onRowSelectionChange,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting: state.sorting,
      columnFilters: state.columnFilters,
      columnVisibility: state.columnVisibility,
      grouping: state.grouping,
      columnPinning: state.columnPinning,
      columnOrder: state.columnOrder,
      rowSelection: state.rowSelection,
    },
    meta: {
      cardVisibility: state.cardVisibility,
      onCardVisibilityChange: handlers.onCardVisibilityChange,
      showFilters: state.showFilters,
      setShowFilters: handlers.onShowFilterChange,
      onRowClick: functions?.onRowClick,
      onRightClick: functions?.onRightClick,
      page: _pageIndex,
      take: _pageSize,
      hasEditPermission: hasEditPermission !== false,
      stickyHeader: state.stickyHeader,
      setStickyHeader: handlers.onStickyHeaderChange,
    },
  });
  // const sizes = useMemo(() => {
  //   const headers = table.getFlatHeaders();

  //   const colSizes: { [key: string]: number } = {};

  //   for (let i = 0; i < headers.length; i++) {
  //     const header = headers[i]!;
  //     colSizes[`--header-${header.id}-size`] = header.getSize();
  //     colSizes[`--col-${header.column.id}-size`] = header.column.getSize();
  //   }

  //   return colSizes;
  // }, [table.getState().columnSizingInfo, table.getState().columnSizing]);

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (active && over && active.id !== over.id) {
      handlers.onColumnOrderChange((columnOrder) => {
        const oldIndex = columnOrder.indexOf(active.id as string);
        const newIndex = columnOrder.indexOf(over.id as string);
        return arrayMove(columnOrder, oldIndex, newIndex);
      });
    }
  }

  const shouldNotRenderHeaderContainer = useMemo(() => {
    return (
      (header &&
        hide?.includes("HEADER") &&
        tabs &&
        hide?.includes("TABS") &&
        functions &&
        hide?.includes("FUNCTIONS")) ||
      (!header && !tabs && !functions)
    );
  }, [header, hide, tabs, functions]);

  return (
    <div
      className={cn(
        "flex flex-col gap-1",
        state.stickyHeader && "h-[calc(100vh_-3rem)] overflow-hidden",
      )}
    >
      <div
        className={cn(
          "flex items-end justify-between",
          shouldNotRenderHeaderContainer && "hidden",
        )}
      >
        {header && (
          <DataTablePageHeader props={header} hide={hide?.includes("HEADER")} />
        )}
        {tabs && (
          <DataTableTabLinks props={tabs} hide={hide?.includes("TABS")} />
        )}
        {functions && (
          <DataTableFunctions
            props={{
              ...functions,
              table,
              hasEditPermission,
              cardItems: cards?.items,
              headerTitle: header?.title,
            }}
            hide={hide?.includes("FUNCTIONS")}
          />
        )}
      </div>
      {filters && (
        <div
          className={cn(
            (state.showFilters || !functions?.filterToggle) && "mt-1",
          )}
        >
          <DataTableFilters
            props={{
              ...filters,
              show: state.showFilters || !functions?.filterToggle,
            }}
            hide={hide?.includes("FILTERS")}
          />
        </div>
      )}
      {cards && (
        <DataTableCards
          props={{
            ...cards,
            visibility: state.cardVisibility,
            onVisibilityChange: handlers.onCardVisibilityChange,
          }}
          hide={hide?.includes("CARDS")}
        />
      )}
      {loading?.isLoading ? (
        <div className="mt-3 overflow-hidden  border border-gray-200 dark:border-gray rounded-md">
          {loading.Loader}
        </div>
      ) : (
        <>
          <DndContext
            id={`${instanceId}-dnd-context`}
            collisionDetection={closestCenter}
            modifiers={[restrictToHorizontalAxis]}
            onDragEnd={handleDragEnd}
            sensors={sensors}
          >
            <div
              className={cn(
                "grid rounded-sm mt-3 border border-gray-200 dark:border-border",
                state.stickyHeader
                  ? "flex-1 min-h-0 overflow-auto custom-scrollbar-thin"
                  : "overflow-hidden",
                className,
              )}
              ref={tableContainerRef}
            >
              <Table
                ref={ref}
                containerClassName={
                  state.stickyHeader ? "overflow-visible" : undefined
                }
                style={{
                  // ...sizes,
                  direction: table.options.columnResizeDirection,
                }}
              >
                <TableHeader
                  className={cn(
                    "bg-secondary! dark:bg-secondary!",
                    state.stickyHeader && "sticky top-0 z-50",
                  )}
                >
                  {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id}>
                      <SortableContext
                        items={state.columnOrder}
                        strategy={horizontalListSortingStrategy}
                      >
                        {headerGroup.headers
                          .filter(
                            (f) => f.column.columnDef.meta?.exportOnly !== true,
                          )
                          .map((header) => {
                            return (
                              <THeadComponent
                                key={header.id}
                                table={table}
                                header={header}
                                autoHeaderRowSpan={autoHeaderRowSpan}
                              />
                            );
                          })}
                      </SortableContext>
                    </TableRow>
                  ))}
                </TableHeader>
                {table.getRowModel().rows.length > 0 ? (
                  <Fragment>
                    {table.getState().columnSizingInfo.isResizingColumn ? (
                      <MemoizedTBodyComponent table={table} />
                    ) : (
                      <TBodyComponent table={table} />
                    )}
                  </Fragment>
                ) : (
                  <TableBody>
                    <TableRow>
                      <TableCell
                        colSpan={Number.MAX_SAFE_INTEGER}
                        className="h-24 text-center"
                      >
                        No results.
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </div>
          </DndContext>
          {pagination && !onlyLocalState && (
            <DataTablePagination
              table={table}
              pagination={pagination}
              filter={filter}
              onPageChange={(newPage: number) => {
                filter.setFilter("page", newPage.toString());
              }}
            />
          )}
          {onlyLocalState &&
            data.length > (pageSize || DEFAULT_PAGINATION_FILTER.page) && (
              <DefaultPagination table={table} pageSize={pageSize} />
            )}
        </>
      )}
    </div>
  );
}

export default function DataTable<TData, TValue, TStatistics>(
  props: TDataTableProps<TData, TValue, TStatistics>,
) {
  return (
    <TablePermissionProvider hasEditPermission={props.hasEditPermission}>
      <DataTableQueryContextProvider
        filters={props.filters}
        onlyLocalState={props.onlyLocalState}
      >
        <ReactTable {...props} />
      </DataTableQueryContextProvider>
    </TablePermissionProvider>
  );
}
