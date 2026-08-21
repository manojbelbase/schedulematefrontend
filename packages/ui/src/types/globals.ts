import { type ReactNode } from "react";
import type { SearchParams } from "nuqs";

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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Any = any;

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
