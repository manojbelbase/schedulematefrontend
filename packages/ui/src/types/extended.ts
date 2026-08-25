import { type ReactNode } from "react";
import type { UseFormReturn } from "react-hook-form";

import type { TModalContext } from "@ui/context/modal";

import type { Any, TModalVariant } from "./globals";

export type TSetDirtyFn = (
  form: UseFormReturn<Any, unknown, undefined> | boolean,
  ignoredFields?: string[],
) => void;

export type _FormModalProps<T = object> = {
  setDirty: TSetDirtyFn;
  close: () => void;
  open: TModalContext["open"];
  initiatorName?: string;
  data?: T;
  queryKeys?: string[][];
};

export type TDeleteItemModalData<T extends object = object> = {
  /** Resource being deleted, e.g. "conversation" or "support-ticket". */
  id: string;
  /** Human readable name shown in the confirm dialog, e.g. `Ticket #123`. */
  name?: string;
  itemIds?: string[];
  item?: T;
  message?: string;
  description?: ReactNode;
  callback?: () => void;
  deleteButtonText?: string;
  initiatorName?: string;
  queryKeys?: string[][];
};

export type _SheetModalProps<T = object> = _FormModalProps<T>;

export type _TModal<
  T extends _FormModalProps<object> = _FormModalProps<object>,
> = {
  component: React.ComponentType<T>;
  title?: string;
  description?: string;
  variant: TModalVariant;
  dirty?: boolean;
  className?: string;
};
