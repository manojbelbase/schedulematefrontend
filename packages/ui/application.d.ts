/* eslint-disable @typescript-eslint/consistent-type-definitions */
/* eslint-disable @typescript-eslint/no-unused-vars */

import type {
  OnChangeFn,
  RowData,
  VisibilityState,
} from "@tanstack/react-table";

declare module "@tanstack/react-table" {
  interface ColumnMeta<TData extends RowData, TValue> {
    exportOnly?: boolean;
    exportable?: {
      header: string;
      headerStyle?: React.CSSProperties;
      dataTransformer: (item: TData) => string | number | undefined;
      cellStyle?: React.CSSProperties;
    };
    pin?: "left" | "right";
    cellClassName?: string;
    stopRowClickPropagation?: boolean;
  }

  interface TableMeta<TData extends RowData> {
    showFilters?: boolean;
    setShowFilters?: OnChangeFn<boolean>;
    cardVisibility?: VisibilityState;
    onCardVisibilityChange?: OnChangeFn<VisibilityState>;
    page?: number;
    take?: number;
    hasEditPermission?: boolean;
    stickyHeader?: boolean;
    setStickyHeader?: OnChangeFn<boolean>;
  }
}

export {};