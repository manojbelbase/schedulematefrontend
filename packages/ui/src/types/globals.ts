import { type ReactNode } from "react";
import { type FieldValues, type FormState } from "react-hook-form";
import type { ColumnDef, DeepKeys } from "@tanstack/react-table";
import type { SearchParams } from "nuqs";

import { type TModalContext } from "@ui/context/modal-context";
import type { PaginatedResponseDTO } from "@ui/lib/pagination";

export type TLayoutProps = Readonly<{
  children: ReactNode;
}>;

export type _LayoutProps = {
  children: React.ReactNode;
};

export type _PageProps<P = object, Q = object> = {
  params: Promise<P>;
  searchParams: Promise<Q>;
};

export type TModalVariant = "form" | "warning" | "default" | "no-exit";

export type TLinkPath = {
  [key: string]: string;
};

export type _ColumnDef<TData, TValue = unknown> = ColumnDef<TData, TValue> & {
  id: string;
  accessorKey?: DeepKeys<TData>;
  exportHeader?: string;
};

export type TStoredForm = {
  reset: () => void;
  formState: Pick<FormState<FieldValues>, "isDirty" | "isSubmitting">;
};

export type _TModalProps<TData extends object = object> = {
  close: VoidFunction;
  setForm: (form: TStoredForm) => void;
  data: TData;
} & Pick<TModalContext, "open">;

export enum ModalType {
  SHEET = "SHEET",
  MODAL = "MODAL",
}

export type TSheetProps = {
  component: React.ComponentType<Record<string, unknown>>;
  variant: "form" | "warning" | "default";
  className?: string;
  side?: "top" | "right" | "bottom" | "left";
};

export type TModalProps = {
  component: React.ComponentType<Record<string, unknown>>;
  variant: "form" | "warning" | "default";
  className?: string;
  title?: string;
  description?: string;
};

// Utility Types
export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export type ExtractItem<T> =
  T extends PaginatedResponseDTO<infer I> ? I & { id?: string } : never;

export type TSearchParams = {
  [key: string]: string;
};

export type TQueryParams = Readonly<{
  searchParams: Promise<SearchParams>;
  params: Promise<{
    [key: string]: string;
  }>;
}>;
