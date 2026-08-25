"use client";

import { createContext, use, useEffect, useMemo, useState } from "react";

import type { TDataTableProps } from "@ui/components/data-table";
import type {
  TFilterItem,
  TFilterKeyByType,
  TFilterType,
} from "@ui/components/data-table/filters";
import {
  DEFAULT_DATE_RANGE_SELECTOR_PRESET,
  getFromToByPreset,
} from "@ui/components/input/date-picker";
import { useControllableState } from "@ui/hooks/use-controllable-state";
import useDataTableState from "@ui/hooks/use-data-table-state";
import type { Any, TLayoutProps } from "@ui/types/globals";

import { useDataTableContext } from "./data-table-context";

type TContext = {
  state: Record<string, Any>;
  setState: (newState: Record<string, Any>) => void;
  hasValueChanged: boolean;
  clearState: <Type extends TFilterType>(
    type: Type,
    keys: TFilterKeyByType<Type>,
  ) => void;
  clearStates: () => void;
};

const DataTableQueryContext = createContext<TContext>({
  state: {},
  setState: () => {
    throw new Error(
      "setState function is not implemented in DataTableQueryContextProvider",
    );
  },
  hasValueChanged: false,
  clearState: () => {
    throw new Error(
      "clearState function is not implemented in DataTableQueryContextProvider",
    );
  },
  clearStates: () => {
    throw new Error(
      "clearStates function is not implemented in DataTableQueryContextProvider",
    );
  },
});

export default function DataTableQueryContextProvider({
  children,
  filters: _filters,
  onlyLocalState,
}: TLayoutProps &
  Pick<
    TDataTableProps<unknown, unknown, unknown>,
    "filters" | "onlyLocalState"
  >) {
  const { filtersProps } = useDataTableContext();

  const now = useMemo(() => new Date(), []);
  const filters = useMemo(
    () => _filters || filtersProps || {},
    [_filters, filtersProps],
  );

  const [queryState, setQueryState] = useDataTableState(filters, now);
  const [localState, setLocalState] = useState<Record<string, Any>>(queryState);

  const [state, setState] = useControllableState({
    prop: localState,
    defaultProp: queryState,
    onChange: (updated) => {
      setLocalState(updated);
      if (!onlyLocalState) setQueryState(updated);
    },
  });

  const hasValueChanged = useMemo(() => {
    return Object.entries(state).some(([key, value]) => {
      const filter = Object.values(filters.items || {}).find((f) => {
        if (f.type === "select" || f.type === "custom") {
          return f.key === key;
        }

        if (f.type === "date") {
          return (
            f.key.dateFrom === key ||
            f.key.dateTo === key ||
            f.key.preset === key
          );
        }
        if (f.type === "asyncSelect") {
          return f.key.value === key || f.key.label === key;
        }
        return false;
      });

      if (!filter) return false;

      if (filter.type === "select" || filter.type === "custom") {
        return value !== "";
      }
      if (filter.type === "asyncSelect") {
        if (key === filter.key.value) {
          return value !== "";
        }
        if (key === filter.key.label) {
          return value !== "";
        }
      }

      if (filter.type === "date") {
        const defaultPreset =
          filter.props.preset || DEFAULT_DATE_RANGE_SELECTOR_PRESET;
        const defaultValue = getFromToByPreset(defaultPreset, now);

        if (key === filter.key.dateFrom) {
          return value.getTime() !== defaultValue?.from?.getTime();
        }
        if (key === filter.key.dateTo) {
          return value.getTime() !== defaultValue?.to?.getTime();
        }
        if (key === filter.key.preset) {
          return value !== defaultPreset;
        }
      }

      return false;
    });
  }, [state, filters, now]);

  const clearStates = () => {
    const newState: Record<string, Any> = {};

    Object.entries(filters.items || {}).forEach(([_, filter]) => {
      if (filter.type === "select" || filter.type === "custom") {
        newState[filter.key] = "";
      }
      if (filter.type === "asyncSelect") {
        newState[filter.key.value] = "";
        newState[filter.key.label] = "";
      }
      if (filter.type === "date") {
        const defaultPreset =
          filter.props.preset || DEFAULT_DATE_RANGE_SELECTOR_PRESET;
        const defaultValue = getFromToByPreset(defaultPreset, now);
        newState[filter.key.dateFrom] = defaultValue?.from || new Date(0);
        newState[filter.key.dateTo] = defaultValue?.to || new Date(0);
        newState[filter.key.preset] = defaultPreset;
      }
    });

    setState(newState);
  };

  const clearState = <Type extends TFilterType>(
    type: Type,
    keys: TFilterKeyByType<Type>,
  ) => {
    const newState: Record<string, Any> = {};
    const filtersList = Object.values(filters.items || {}) as TFilterItem[];

    const matches = (filter: TFilterItem) => {
      if (type === "date" && filter.type === "date") {
        const dateKeys = keys as TFilterKeyByType<"date">;
        return (
          dateKeys.dateFrom === filter.key.dateFrom &&
          dateKeys.dateTo === filter.key.dateTo &&
          dateKeys.preset === filter.key.preset
        );
      }

      if (type === "asyncSelect" && filter.type === "asyncSelect") {
        const asyncKeys = keys as TFilterKeyByType<"asyncSelect">;
        return (
          asyncKeys.label === filter.key.label &&
          asyncKeys.value === filter.key.value
        );
      }
      if (type === "select" && filter.type === "select") {
        const selectKeys = keys as TFilterKeyByType<"select">;
        return selectKeys === filter.key;
      }

      if (type === "custom" && filter.type === "custom") {
        const customKeys = keys as TFilterKeyByType<"custom">;
        return customKeys === filter.key;
      }

      if (filter.type === type) {
        const simpleKeys = keys as string;
        return simpleKeys === filter.key;
      }

      return false;
    };

    filtersList.forEach((filter) => {
      if (!matches(filter)) return;

      if (filter.type === "select" || filter.type === "custom") {
        newState[filter.key] = "";
      }

      if (filter.type === "date") {
        const defaultPreset =
          filter.props.preset || DEFAULT_DATE_RANGE_SELECTOR_PRESET;
        const defaultValue = getFromToByPreset(defaultPreset, now);
        newState[filter.key.dateFrom] = defaultValue?.from || new Date(0);
        newState[filter.key.dateTo] = defaultValue?.to || new Date(0);
        newState[filter.key.preset] = defaultPreset;
      }

      if (filter.type === "asyncSelect") {
        newState[filter.key.value] = "";
        newState[filter.key.label] = "";
      }
    });

    setState({ ...state, ...newState });
  };

  useEffect(() => {
    setLocalState(queryState);
  }, [JSON.stringify(queryState)]);

  return (
    <DataTableQueryContext
      value={{ state, setState, hasValueChanged, clearStates, clearState }}
    >
      {children}
    </DataTableQueryContext>
  );
}

export function useDataTableQueryContext() {
  const context = use(DataTableQueryContext);

  if (!context) {
    throw new Error(
      "useDataTableQueryContext must be used within a DataTableQueryContextProvider",
    );
  }

  return context;
}
