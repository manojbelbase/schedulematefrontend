import { type ReactNode } from "react";
import type { SearchParams } from "nuqs";

export type TLayoutProps = Readonly<{
  children: ReactNode;
}>;

export type _LayoutProps = {
  children: React.ReactNode;
};

export type TLinkPath = {
  [key: string]: string;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Any = any;

export enum ModalType {
  SHEET = "SHEET",
  MODAL = "MODAL",
}

export type TSheetProps = {
  component: React.FC<Any>;
  variant: "form" | "warning" | "default";
  className?: string;
  side?: "top" | "right" | "bottom" | "left";
};

export type TModalProps = {
  component: React.FC<Any>;
  variant: "form" | "warning" | "default";
  className?: string;
  title?: string;
  description?: string;
};

// Utility Types
export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export type TSearchParams = {
  [key: string]: string;
};

export type TQueryParams = Readonly<{
  searchParams: Promise<SearchParams>;
  params: Promise<{
    [key: string]: string;
  }>;
}>;