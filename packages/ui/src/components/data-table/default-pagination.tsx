"use client";

import { useEffect, useMemo, useState } from "react";
import type { Table } from "@tanstack/react-table";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

import { DEFAULT_PAGINATION_FILTER } from "@ui/lib/pagination";

import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

type DefaultPaginationProps<TData> = {
  table: Table<TData>;
  pageSize?: number;
};

export function DefaultPagination<TData>({
  table,
  pageSize,
}: DefaultPaginationProps<TData>) {
  const [size, setSize] = useState<number>(
    pageSize ?? DEFAULT_PAGINATION_FILTER.take,
  );
  const [currentPage, setCurrentPage] = useState<number>(0);

  const totalCount = table.getFilteredRowModel().rows.length;

  const totalPages = useMemo(
    () => Math.ceil(totalCount / size) - 1,
    [totalCount, size],
  );

  useEffect(() => {
    table.setPageSize(size);
  }, [table, size]);

  useEffect(() => {
    table.setPageIndex(currentPage);
  }, [table, currentPage]);

  const goToPage = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="flex items-center justify-between px-2 mt-2">
      <div className="text-muted-foreground flex-1 text-sm">
        {table.getFilteredSelectedRowModel().rows.length} of {totalCount} row(s)
        selected.
      </div>

      <div className="flex items-center space-x-6 lg:space-x-8">
        {/* Rows per page */}
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium">Rows per page</p>
          <Select
            value={size.toString()}
            onValueChange={(value) => {
              setSize(Number(value));
            }}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={size} />
            </SelectTrigger>
            <SelectContent side="top">
              {[10, 20, 25, 30, 40, 50].map((size) => (
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
