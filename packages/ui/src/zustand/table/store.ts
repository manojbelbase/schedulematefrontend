import { useMemo } from "react";
import type {
  ColumnFiltersState,
  ColumnOrderState,
  ColumnPinningState,
  GroupingState,
  RowSelectionState,
  SortingState,
  VisibilityState,
} from "@tanstack/react-table";
import { create } from "zustand";

type TTableState = {
  sorting: SortingState;
  columnFilters: ColumnFiltersState;
  columnVisibility: VisibilityState;
  cardVisibility: VisibilityState;
  grouping: GroupingState;
  columnPinning: ColumnPinningState;
  columnOrder: ColumnOrderState;
  rowSelection: RowSelectionState;
  showFilters: boolean;
  stickyHeader: boolean;
};

type TTableConfigStore = {
  tables: {
    [instanceId: string]: TTableState;
  };
};

type TTableConfigActions = {
  updateTableState: <K extends keyof TTableState>(
    instanceId: string,
    key: K,
    value: TTableState[K],
  ) => void;
  getTableState: (
    instanceId: string,
    defaultState?: Partial<TTableState>,
  ) => TTableState;
};

const DEFAULT_STATE: TTableState = {
  sorting: [],
  columnFilters: [],
  columnVisibility: {},
  cardVisibility: {},
  grouping: [],
  columnPinning: {},
  columnOrder: [],
  rowSelection: {},
  showFilters: false,
  stickyHeader: true,
};

const useTableConfigStore = create<TTableConfigStore & TTableConfigActions>()(
  (set, get) => ({
    tables: {},

    updateTableState: (instanceId, key, value) => {
      set((state) => ({
        tables: {
          ...state.tables,
          [instanceId]: {
            ...DEFAULT_STATE,
            ...state.tables[instanceId],
            [key]: value,
          },
        },
      }));
    },

    getTableState: (
      instanceId: string,
      defaultState?: Partial<TTableState>,
    ) => {
      const state = get().tables[instanceId];

      if (!state) {
        // Do this at a later time
        setTimeout(() => {
          set({
            tables: {
              ...get().tables,
              [instanceId]: { ...DEFAULT_STATE, ...defaultState },
            },
          });
        }, 0);
        return { ...DEFAULT_STATE, ...defaultState };
      }

      return { ...DEFAULT_STATE, ...defaultState, ...state };
    },
  }),
);

export default useTableConfigStore;

export const useTableConfig = (
  instanceId: string,
  defaultState?: Partial<TTableState>,
) => {
  const { getTableState, updateTableState } = useTableConfigStore();
  const state = getTableState(instanceId, defaultState);

  const handlers = useMemo(() => {
    const createHandler =
      <T>(key: keyof TTableState) =>
      (updaterOrValue: T | ((old: T) => T)) => {
        const currentState =
          (state[key] as T) ||
          ((key === "columnVisibility" ||
          key === "columnPinning" ||
          key === "rowSelection"
            ? {}
            : key === "showFilters" || key === "stickyHeader"
              ? false
              : []) as T);

        const newValue =
          typeof updaterOrValue === "function"
            ? (updaterOrValue as (old: T) => T)(currentState)
            : updaterOrValue;

        updateTableState(
          instanceId,
          key,
          newValue as TTableState[keyof TTableState],
        );
      };

    return {
      onSortingChange: createHandler<SortingState>("sorting"),
      onColumnFiltersChange: createHandler<ColumnFiltersState>("columnFilters"),
      onColumnVisibilityChange:
        createHandler<VisibilityState>("columnVisibility"),
      onGroupingChange: createHandler<GroupingState>("grouping"),
      onColumnPinningChange: createHandler<ColumnPinningState>("columnPinning"),
      onColumnOrderChange: createHandler<ColumnOrderState>("columnOrder"),
      onRowSelectionChange: createHandler<RowSelectionState>("rowSelection"),
      onShowFilterChange: createHandler<boolean>("showFilters"),
      onCardVisibilityChange: createHandler<VisibilityState>("cardVisibility"),
      onStickyHeaderChange: createHandler<boolean>("stickyHeader"),
    };
  }, [instanceId, state, updateTableState]);

  return {
    state,
    handlers,
  };
};
