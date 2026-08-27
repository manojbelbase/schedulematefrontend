"use client";

import {
  createContext,
  use,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import CardsSection, {
  type TCardsSectionProps,
} from "@ui/components/cards-section";
import Filters, { type TFiltersProps } from "@ui/components/data-table/filters";
import Functions, {
  type TFunctionsProps,
} from "@ui/components/data-table/functions";
import PageHeader, {
  type TPageHeaderProps,
} from "@ui/components/layout/page-header";
import TabLinks, { type TTabLinksProps } from "@ui/components/layout/tab-links";
import type { Any, TLayoutProps } from "@ui/types/globals";

type TContext = {
  filters: ReactNode | undefined;
  setFilters: (filters: ReactNode) => void;
  filtersProps: TFiltersProps;
  setFiltersProps: (filtersProps: TFiltersProps) => void;
  functions: ReactNode | undefined;
  setFunctions: (functions: ReactNode) => void;
  header: ReactNode | undefined;
  setHeader: (header: ReactNode) => void;
  tabs: ReactNode | undefined;
  setTabs: (tabs: ReactNode) => void;
  cards: ReactNode | undefined;
  setCards: (cards: ReactNode) => void;
  hasEditPermission?: boolean;
};

const DataTableContext = createContext<TContext | null>(null);

export function DataTableProvider({ children }: TLayoutProps) {
  const [header, setHeader] = useState<ReactNode | undefined>(undefined);
  const [tabs, setTabs] = useState<ReactNode | undefined>(undefined);
  const [filters, setFilters] = useState<ReactNode | undefined>(undefined);
  const [filtersProps, setFiltersProps] = useState<object>({});
  const [functions, setFunctions] = useState<ReactNode | undefined>(undefined);
  const [statistics, setStatistics] = useState<ReactNode | undefined>(
    undefined,
  );

  const memoized = useMemo<TContext>(
    () => ({
      header,
      setHeader,
      tabs,
      setTabs,
      functions,
      setFunctions,
      filters,
      setFilters,
      filtersProps,
      setFiltersProps,
      cards: statistics,
      setCards: setStatistics,
    }),
    [
      header,
      setHeader,
      tabs,
      setTabs,
      functions,
      setFunctions,
      filters,
      setFilters,
      filtersProps,
      setFiltersProps,
      statistics,
      setStatistics,
    ],
  );

  return <DataTableContext value={memoized}>{children}</DataTableContext>;
}

type TSlot<T> = {
  hide?: boolean;
  props?: T;
};

export function DataTablePageHeader({ hide, props }: TSlot<TPageHeaderProps>) {
  const { header, setHeader } = useDataTableContext();

  const Component = useMemo(() => <PageHeader {...props} />, [props]);

  useEffect(() => {
    if (props && hide) setHeader(Component);
  }, [Component, props, hide, setHeader]);

  if (hide) return null;

  return props ? Component : header;
}

export function DataTableTabLinks({
  hide,
  props = { id: "tab-links", tabs: [] },
}: TSlot<TTabLinksProps>) {
  const { setTabs, tabs } = useDataTableContext();

  const Component = useMemo(() => <TabLinks {...props} />, [props]);

  useEffect(() => {
    if (props && hide) setTabs(Component);
  }, [Component, props, hide, setTabs]);

  if (hide) return null;

  return props ? Component : tabs;
}

export function DataTableFunctions({
  hide,
  props,
}: TSlot<TFunctionsProps<Any>>) {
  const { setFunctions, functions } = useDataTableContext();

  const Component = useMemo(() => <Functions {...props} />, [props]);

  useEffect(() => {
    if (props && hide) setFunctions(Component);
  }, [Component, props, hide, setFunctions]);

  if (hide) return null;

  return props ? Component : functions;
}

export function DataTableFilters({ hide, props }: TSlot<TFiltersProps>) {
  const { setFilters, filters, setFiltersProps } = useDataTableContext();

  const Component = useMemo(() => <Filters {...props} />, [props]);

  useEffect(() => {
    if (props && hide) setFilters(Component);
    if (props) setFiltersProps(props);
  }, [Component, props, hide, setFilters, setFiltersProps]);

  if (hide) return null;

  return props ? Component : filters;
}

export function DataTableCards({
  hide,
  props,
}: TSlot<TCardsSectionProps<Any>>) {
  const { setCards, cards } = useDataTableContext();

  const Component = useMemo(
    () => (props ? <CardsSection {...props} /> : null),
    [props],
  );

  useEffect(() => {
    if (props && hide) setCards(Component);
  }, [Component, props, hide, setCards]);

  if (hide) return null;

  return props ? Component : cards;
}

export function useDataTableContext() {
  const context = use(DataTableContext);

  if (!context) {
    throw new Error(
      "useDataTableContext must be used within a DataTableProvider",
    );
  }

  return context;
}
