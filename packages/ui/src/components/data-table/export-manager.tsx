"use client";

import type { Column, Table } from "@tanstack/react-table";
import ExcelJS from "exceljs";
import { UploadIcon } from "lucide-react";

import { TABLE_CONSTANTS } from "@ui/config/constants";
import type { _ColumnDef, Any } from "@ui/types/globals";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../animate-ui/components/radix/tooltip";
import { Button } from "../ui/button";

export type TExportManager<TData> = {
  data: TData[];
  columns: Column<TData, unknown>[];
  title?: string;
  table: Table<TData>;
};

export default function ExportManager<TData>({
  data,
  columns,
  title,
}: TExportManager<TData>) {
  async function handleExport<TData>(
    data: TData[],
    columns: Column<TData, unknown>[],
  ) {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Exported Data");
    // Helper function to recursively process columns
    const processColumns = (
      columns: Column<TData, unknown>[] | undefined,
      rowIndex = 1,
      colIndex = 1,
    ): number => {
      if (!columns || columns.length === 0) {
        return colIndex;
      }

      let currentColIndex = colIndex;

      columns.forEach((column) => {
        if (column.id === TABLE_CONSTANTS.ACTIONS_HEADER) {
          return;
        }
        const header =
          column.id === TABLE_CONSTANTS.SN_HEADER
            ? TABLE_CONSTANTS.SN_HEADER
            : "exportHeader" in column.columnDef &&
                typeof column.columnDef.exportHeader === "string"
              ? column.columnDef.exportHeader
              : typeof column.columnDef.header === "string"
                ? column.columnDef.header
                : "";

        const subColumns = (column as Any).columns;
        if (subColumns && subColumns.length > 0) {
          const mergeStart = currentColIndex;
          const mergeEnd = currentColIndex + subColumns.length - 1;

          worksheet.mergeCells(rowIndex, mergeStart, rowIndex, mergeEnd);
          worksheet.getCell(rowIndex, mergeStart).value = header;

          currentColIndex = processColumns(
            subColumns,
            rowIndex + 1,
            mergeStart,
          );
        } else {
          worksheet.getCell(rowIndex, currentColIndex).value = header;
          currentColIndex++;
        }
      });

      return currentColIndex;
    };

    // Process headers
    processColumns(columns);

    // Add data rows
    data.forEach((rowData, idx) => {
      const rowValues =
        columns && columns.length > 0
          ? columns.map((column) => {
              const accessor =
                (column as Any).accessorKey || (column as Any).accessorFn;
              let value;
              if (column.id === TABLE_CONSTANTS.SN_HEADER) {
                value = idx + 1;
              } else if (typeof accessor === "function") {
                value = accessor(rowData);
              } else if (accessor) {
                value = rowData[accessor as keyof TData];
              } else {
                value = "";
              }
              return value;
            })
          : [];
      worksheet.addRow(rowValues);
    });

    // Generate Excel file and trigger download
    const buffer = await workbook.xlsx.writeBuffer();
    const url = URL.createObjectURL(
      new Blob([buffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      }),
    );
    const link = document.createElement("a");
    link.href = url;
    link.download = title ? `${title}.xlsx` : "exported_data.xlsx";
    link.click();
    URL.revokeObjectURL(url);
  }

  return (
    <TooltipProvider>
      <Tooltip delayDuration={0}>
        <TooltipTrigger asChild>
          <Button
            size="icon-sm"
            onClick={() => handleExport(data, columns)}
            variant="outline"
          >
            <UploadIcon />
          </Button>
        </TooltipTrigger>{" "}
        <TooltipContent
          className="text-xs bg-secondary text-foreground"
          side="bottom"
          arrowClassName="bg-secondary fill-secondary"
        >
          <span>Export</span>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
