import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMemo } from "react";

import action from "@ui/components/server/revalidate";
import { EMPTY_FILTER_VALUE } from "@ui/config/constants";
import { objectToQueryString } from "@ui/lib/utils";

import { useControllableState } from "./use-controllable-state";

export function useQueryParamsFilter(onlyLocalState: boolean = false) {
  const params = useSearchParams();

  const searchParams = useMemo(() => {
    const obj: Record<string, string | string[]> = {};
    params.forEach((value, key) => {
      if (obj[key]) {
        const existing = obj[key];
        obj[key] = Array.isArray(existing)
          ? [...existing, value]
          : [existing, value];
      } else {
        obj[key] = value;
      }
    });
    return obj;
  }, [params]);

  const [state, setState] = useControllableState({
    prop: searchParams,
    defaultProp: {},
    onChange: (updated) => {
      if (onlyLocalState) return;
      replace(objectToQueryString(updated), {
        scroll: false,
      });
    },
  });

  const { replace } = useRouter();
  const path = usePathname();

  const setFilter = (key: string, value: string | string[] | undefined) => {
    if (value === EMPTY_FILTER_VALUE) value = undefined;

    setState((prev) => {
      const updatedState = { ...prev, [key]: value };
      if (value === undefined) delete updatedState[key];
      const filteredState: Record<string, string | string[]> = {};
      Object.keys(updatedState).forEach((k) => {
        const v = updatedState[k];
        if (v !== undefined) {
          filteredState[k] = v;
        }
      });
      return filteredState;
    });
  };

  const setRawFilter = (value: string) => {
    setFilter("raw", value);
  };

  const removeFilter = (key: string) => {
    setState((prev) => {
      const newState = { ...prev };
      delete newState[key];
      return newState;
    });
  };

  const clearFilters = async () => {
    const ignoredFilters = ["page", "take"];

    setState((prev) => {
      const newState = { ...prev };
      Object.keys(newState).forEach((key) => {
        if (!ignoredFilters.includes(key)) {
          delete newState[key];
        }
      });
      return newState;
    });

    await action(path);
  };

  return {
    state,
    setFilter,
    setRawFilter,
    removeFilter,
    clearFilters,
  };
}
