/* eslint-disable @typescript-eslint/consistent-type-definitions */
/* eslint-disable @typescript-eslint/no-unused-vars */

import type {
  OnChangeFn,
  RowData,
  VisibilityState,
} from "@tanstack/react-table";

import type { TEnvSchema } from "@/config/env";

declare global {
  type SocketNamespace = "" | "/user" | "/workspace";
  namespace NodeJS {
    interface ProcessEnv extends TEnvSchema {
      TZ?: string;
    }
  }
}

declare module "@tanstack/react-table" {
  interface ColumnMeta<TData extends RowData, TValue> {
    exportOnly?: boolean;
    exportable?: {
      header: string;
      headerStyle?: React.CSSProperties;
      dataTransformer: (item: TData) => string | number | undefined;
      cellStyle?: React.CSSProperties;
    };
    stopRowClickPropagation?: boolean;
    pin?: "left" | "right";
    cellClassName?: string;
  }

  interface TableMeta<TData extends RowData> {
    showFilters?: boolean;
    setShowFilters?: OnChangeFn<boolean>;
    onRowClick?: (row: TData) => void;
    onRightClick?: (row: TData) => void;
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