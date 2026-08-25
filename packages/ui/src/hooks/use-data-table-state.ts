import { useMemo } from "react";
import {
  parseAsIsoDateTime,
  parseAsString,
  parseAsStringLiteral,
  useQueryStates,
} from "nuqs";

import type { TFiltersProps } from "@ui/components/data-table/filters";
import {
  DEFAULT_DATE_RANGE_SELECTOR_PRESET,
  getFromToByPreset,
  SUPPORTED_PRESET_VALUES,
} from "@ui/components/input/date-picker";
import type { Any } from "@ui/types/globals";

export default function useDataTableState(filters: TFiltersProps, now: Date) {
  const stateables = useMemo(
    () =>
      Object.entries(filters.items || {}).reduce<Record<string, Any>>(
        (acc, [_, filter]) => {
          if (filter.type === "select") {
            acc[filter.key] = parseAsString.withDefault("");
          }
          if (filter.type === "asyncSelect") {
            acc[filter.key.value] = parseAsString.withDefault("");
            acc[filter.key.label] = parseAsString.withDefault("");
          }
          if (filter.type === "date") {
            const defaultPreset =
              filter.props.preset || DEFAULT_DATE_RANGE_SELECTOR_PRESET;
            const defaultValue = getFromToByPreset(defaultPreset, now);

            acc[filter.key.dateFrom] = parseAsIsoDateTime.withDefault(
              defaultValue?.from || new Date(0),
            );
            acc[filter.key.dateTo] = parseAsIsoDateTime.withDefault(
              defaultValue?.to || new Date(0),
            );

            acc[filter.key.preset] = parseAsStringLiteral(
              SUPPORTED_PRESET_VALUES,
            ).withDefault(defaultPreset);
          }
          if (filter.type === "custom") {
            acc[filter.key] = parseAsString.withDefault("");
          }
          return acc;
        },
        {},
      ),
    [filters, now],
  );

  return useQueryStates(stateables, {
    history: "replace",
    shallow: false,
  });
}
