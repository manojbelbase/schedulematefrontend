"use client";

import { useEffect, useMemo, useState } from "react";
import type { Table } from "@tanstack/react-table";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

import { type useQueryParamsFilter } from "@ui/hooks/useQueryParamsFilter";
import {
  DEFAULT_PAGINATION_FILTER,
  type PaginationDTO,
} from "@ui/lib/pagination";
import { unique } from "@ui/lib/utils";

import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

type DataTablePaginationProps<TData> = {
  table: Table<TData>;
  pagination: PaginationDTO;
  filter: ReturnType<typeof useQueryParamsFilter>;
  onPageChange: (page: number) => void;
};

export function DataTablePagination<TData>({
  table,
  pagination,
  filter,
  onPageChange: goToPage,
}: DataTablePaginationProps<TData>) {
  const { setFilter, state } = filter;

  const { total: totalCount } = pagination;

  const pageSize = Number.isNaN(Number(state?.take))
    ? DEFAULT_PAGINATION_FILTER.take
    : Number(state?.take);

  const [size, setSize] = useState<number>(
    pageSize >= 0 ? pageSize : DEFAULT_PAGINATION_FILTER.take,
  );

  const totalPages = useMemo(
    () => Math.ceil(totalCount / size) - 1,
    [totalCount, size],
  );
  const currentPage = filter.state?.page
    ? Number(filter.state.page) >= 0
      ? Number(filter.state.page)
      : 0
    : 0;

  useEffect(() => {
    if (table) {
      setSize(pageSize > 0 ? pageSize : DEFAULT_PAGINATION_FILTER.take);
    }
  }, [state?.take, table]);

  useEffect(() => {
    if (table) {
      table.setPageSize(size);
    }
  }, [table, size]);

  return (
    <div className="flex items-center justify-between px-2 mt-2">
      <div className="text-muted-foreground flex-1 text-sm">
        {table.getFilteredSelectedRowModel().rows.length} of{" "}
        {table.getFilteredRowModel().rows.length} row(s) selected.
      </div>

      <div className="flex items-center space-x-6 lg:space-x-8">
        {/* Rows per page */}
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium">Rows per page</p>
          <Select
            value={size.toString()}
            onValueChange={(value) => {
              setFilter("take", value);
            }}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={size} />
            </SelectTrigger>
            <SelectContent side="top">
              {unique([10, 20, 25, 30, 40, 50, size]).map((size) => (
                <SelectItem key={size} value={`${size}`}>
                  {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Page Info */}
        <div className="flex w-[100px] items-center justify-center text-sm font-medium">
          Page {currentPage + 1} of {totalPages + 1}
        </div>

        {/* Pagination Controls */}
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="icon-sm"
            className="hidden size-8 lg:flex"
            onClick={() => goToPage(0)}
            disabled={currentPage === 0}
          >
            <span className="sr-only">Go to first page</span>
            <ChevronsLeft />
          </Button>

          <Button
            variant="outline"
            size="icon-sm"
            className="size-8"
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 0}
          >
            <span className="sr-only">Go to previous page</span>
            <ChevronLeft />
          </Button>

          <Button
            variant="outline"
            size="icon-sm"
            className="size-8"
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage >= totalPages}
          >
            <span className="sr-only">Go to next page</span>
            <ChevronRight />
          </Button>

          <Button
            variant="outline"
            size="icon-sm"
            className="hidden size-8 lg:flex"
            onClick={() => goToPage(totalPages)}
            disabled={currentPage >= totalPages}
          >
            <span className="sr-only">Go to last page</span>
            <ChevronsRight />
          </Button>
        </div>
      </div>
    </div>
  );
}
